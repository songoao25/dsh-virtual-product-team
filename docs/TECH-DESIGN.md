# 技术设计：产品团队模式（dsh-virtual-product-team）v1.0.0

> 状态：草稿待用户审核（第 4 步交付物）
> 日期：2026-08-16
> 依据：PRD（第 3 步交付物，docs/PRD.md）

## 1. 设计目标

在 DSH 中新增一个可分发、可卸载的 agent preset「产品团队模式」：纯对话版（无 UI 面板），用户主导式体验，8 个阶段技能，Stage-Gate 关卡制。自举验收：用它开发出它自己并发布 GitHub v1.0.0。

## 2. 总体架构

```
GitHub 仓库：songoao25/dsh-virtual-product-team
├── preset/                          ← 预设内容（分发时整目录拷贝）
│   ├── preset.yml                   ← 展示名「产品团队模式」+ 描述 + order
│   ├── agent.cordis.yml             ← 预设组合：persona + 工具 + skills 挂载
│   └── skills/                      ← 8 个阶段技能（SKILL.md）
│       ├── 01-vision/SKILL.md
│       ├── 02-requirements/SKILL.md
│       ├── 03-design/SKILL.md
│       ├── 04-development/SKILL.md
│       ├── 05-qa/SKILL.md
│       └── 06-release/SKILL.md
├── install.sh                       ← 一键安装（拷 preset → ~/.dsh/.agent-presets/）
├── uninstall.sh                     ← 一键卸载（删除该目录，原样恢复）
├── README.md / README.zh-CN.md      ← 分发文档（用户视角）
├── CHANGELOG.md
├── LICENSE                          ← MIT, songoao25
└── docs/
    ├── PRD.md                       ← 已写
    └── TECH-DESIGN.md               ← 本文档
```

**安装原理**（已核实 DSH 机制）：preset 目录放进 `~/.dsh/.agent-presets/<id>/` 即被自动发现（`includeUserRoot: true`），新建会话时出现在预设选择器；`agent.cordis.yml` 在会话创建时组合生效。卸载 = 删除目录，无残留、不碰 DSH 出厂安装。

## 3. agent.cordis.yml 设计（核心文件）

**底子**：以出厂 `standard/agent.cordis.yml` 为模板（保留全部官方工具行：bash/fs/skills/goals/plan-mode/compaction/delegation/ask-user/todo/web），保证功能完整。

**改动点**（相对 standard）：

1. **persona 替换**（第 24-28 行）——这是"用户主导式体验"的灵魂：
   - 声明：用户是**非技术背景的用户**，不要求也不期待他说任何技术词（skill/agent/preset/插件等一律不提）
   - 声明：AI 扮演**虚拟产品团队**（产品经理→工程师→QA→发布员），全程主动引导
   - 声明：固定流水线 = 8 阶段（想法验证→产品定义与需求→技术设计→开发与质量→发布与部署→宣传→运营→迭代回环），每阶段产出文档、向用户汇报、**获确认才进下一阶段**（Stage-Gate）
   - 声明：用 `ask_user_question` 收口决策，用户只需回答问题和确认

2. **skill-filesystem 挂载**（第 83-87 行附近）：加 `customSkillDirs` 指向 preset 自己的 `skills/` 目录（与出厂 cordis 预设同款机制，`baseUrl` 相对解析，随目录分发）

3. **persona 尾部追加"阶段门禁总则"**：12 环节归纳为 8 阶段技能映射表；每个 SKILL.md 定义本阶段的追问清单/产出物模板/验收标准

## 4. preset.yml 设计

```yaml
name: 产品团队模式
description: 用户主导式对话——说"我有个想法"，AI 以虚拟产品团队带你走完 想法→需求→设计→开发→QA审计→发布 全流程，你只说话和拍板。
order: 2
```

（order=2：排在标准模式后、创造模式前，位置醒目但不抢默认位）

## 5. 六个 SKILL.md 设计

统一格式（与 DSH/Anthropic SKILL.md 同构）：frontmatter（`name` kebab-case + `description`）+ 正文。每个技能包含：**角色**（谁在干）、**目标**、**对用户的追问清单**、**产出物模板**、**验收标准**、**向用户汇报的句式**。

| 技能 | 对应环节（12→6 归纳） | 核心内容 |
|---|---|---|
| 01-vision | 想法验证+产品定义 | 追问：给谁用/解决什么/凭什么有人用/最核心功能；产出：产品定义（问题/用户/竞品/MVP 范围/成功标准） |
| 02-requirements | 需求设计 | 追问逐条确认；产出：PRD（背景/目标/用户故事/功能与非功能/验收标准/非目标）——即本项目 docs/PRD.md 的模板 |
| 03-design | 技术设计+任务拆分 | 产出：技术设计文档 + 任务清单（每任务带验收标准，≈1 PR 粒度）；可 subagent 扇出 |
| 04-development | 开发实现 | 按任务清单编码；todo 跟踪；单元测试；Conventional Commits；每任务完成即汇报 |
| 05-qa | 质量测试+安全审计 | 功能对照 PRD 验收；测试报告；安全清单（密钥扫描/依赖漏洞/OWASP/零个人路径）；审计报告 |
| 06-release | 发布准备+部署+宣传材料 | README 中英/LICENSE/CHANGELOG/install.sh/semver/tag；一句话部署提示词；宣传文案骨架 |

## 6. 安装/卸载设计

- **install.sh**：`cp -r preset/ ~/.dsh/.agent-presets/dsh-virtual-product-team/`（可选 `--profile` 参数预留；幂等，重复执行覆盖更新）
- **uninstall.sh**：`rm -rf ~/.dsh/.agent-presets/dsh-virtual-product-team/`，提示"新建会话后标准模式自动恢复"
- 验证：安装后新建会话 → 预设选择器可见「产品团队模式」；`--dump-config` 无残留概念（preset 不写 patch 层，天然无残留）

## 7. 验收方式

1. **安装验收**：目录就位 → 新会话可见 → 选模式 → 说"我有个想法" → 自动进入阶段 1
2. **流程验收**：8 阶段逐一产出文档 + 门禁确认，无跳过
3. **自举验收（主指标）**：用本模式开发出本模式 v1.0.0 并发布 GitHub
4. **对比实验（副指标）**：同一想法，普通模式 vs 产品团队模式——后者产出完整可发布仓库

## 8. 风险与对策

| 风险 | 对策 |
|---|---|
| DSH rc 阶段破坏性变更 | 只用稳定机制（preset 目录+SKILL.md+customSkillDirs，均已核实）；锁定文档记录版本 |
| persona 写太长稀释注意力 | 阶段细节放 SKILL.md（按需加载），persona 只放"角色+流程+门禁"总则 |
| 模型不遵循门禁（抢跑） | persona 明文"未获确认不得推进"；每个 SKILL.md 尾部重申；自举验收时实测 |
| 用户目录名冲突 | 固定 id `dsh-virtual-product-team`，卸载脚本校验后再删 |

## 9. 任务拆分清单（开发阶段用）

| # | 任务 | 验收标准 |
|---|---|---|
| T1 | 建 preset 目录骨架（preset.yml + agent.cordis.yml + skills/） | 目录结构与设计一致 |
| T2 | 写 persona（用户视角人设 + 阶段门禁总则） | 覆盖 §3 全部要点 |
| T3 | agent.cordis.yml 挂载 customSkillDirs → skills/ | 参照 cordis 预设同款写法，路径随目录解析 |
| T4 | 写 01-vision SKILL.md | 含追问清单+产品定义模板+验收 |
| T5 | 写 02-requirements SKILL.md | 含 PRD 模板（引用本项目 PRD 为范本） |
| T6 | 写 03-design SKILL.md | 含技术设计+任务清单模板 |
| T7 | 写 04-development SKILL.md | 含开发规范（todo/测试/commits） |
| T8 | 写 05-qa SKILL.md | 含功能验收+安全清单 |
| T9 | 写 06-release SKILL.md | 含发布清单+宣传骨架 |
| T10 | 装到 ~/.dsh/.agent-presets/ 并验证出现 | 新会话可见「产品团队模式」 |
| T11 | 自举试跑：新对话用本模式开发一个小东西 | 8 阶段走通、门禁生效 |
| T12 | install.sh + uninstall.sh + README 中英 + CHANGELOG + LICENSE | 分发齐全 |
| T13 | 自举验收 + 对比实验 + 发布 GitHub v1.0.0 | 主/副指标达成 |

> 注：T1–T9 为开发实现阶段（第 5 步）；T10–T11 为 QA 阶段（第 6 步）；T12–T13 为发布阶段（第 7-8 步）。
