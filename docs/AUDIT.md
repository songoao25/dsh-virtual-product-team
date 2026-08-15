# 审计报告：产品团队模式（virtual-product-team）

> 日期：2026-08-16
> 审计方式：对照 `docs/PRD.md` 逐条验收 + 安全清单检查 + 与 DSH 出厂机制源码核对 + 已安装实例比对

## 功能验收

| 需求 | 结果 | 说明 |
|---|---|---|
| FR-1 模式注册 | ✅ 通过 | 预设已安装到 `~/.dsh/.agent-presets/virtual-product-team/`（与仓库 `preset/` 逐文件 diff 完全一致）。DSH 源码核对：用户预设根目录 = `$DSH_HOME/.agent-presets`（`includeUserRoot` 默认 true），`preset.yml` 的 name/description/order 三字段均为受支持元数据，预设 id `virtual-product-team` 符合命名规则 `/^[a-z0-9][a-z0-9-]*$/`。 |
| FR-2 老板式启动 | ✅ 通过 | persona 明文声明：老板非技术背景、不要求也不期待技术词；说"我有个想法"立即自动进入阶段 1，不问"要不要开始"。 |
| FR-3 阶段门禁 | ✅ 通过 | persona「阶段门禁铁律」+ 6 个 SKILL.md 尾部均要求"汇报→请求确认→点头才进下一阶段"，明文"未获确认不得推进"。 |
| FR-4 六阶段技能 | ✅ 通过 | `preset/skills/01-vision ~ 06-release` 共 6 个 SKILL.md，frontmatter name 全部为合法 kebab-case，description 完整；技能可按需加载（本次审计即从已安装目录成功加载 05-qa 技能，机制实测可用）。 |
| FR-5 自举验收 | ⚠️ 部分 | 本模式流水线产物（PRD/技术设计/宣传材料）已产出、可分发状态已达成；"发布到 GitHub v1.0.0"按既定分工由老板另用其他 Agent 完成（见遗留问题 1）。 |
| FR-6 可安装/可卸载/可回滚 | ✅ 通过 | install.sh / uninstall.sh 存在且 `-rwxr-xr-x` 可执行，`bash -n` 语法检查通过；install 幂等（重复执行覆盖更新）、uninstall 仅删预设目录、不碰 DSH 出厂安装与其他模式；安装路径仅 `~/.dsh/.agent-presets/`，无残留。 |
| NFR-1 兼容性 | ✅ 通过 | 只用用户级目录，未改动 DSH 出厂安装（出厂目录只读未触碰）。 |
| NFR-2 安全 | ✅ 通过 | 无数据收集逻辑、无执行未授权命令的指令；密钥零进文档。 |
| NFR-3 分发纪律 | ✅ 通过 | 零个人路径、零密钥、分发文件零开发流水账；author=songoao25。 |
| NFR-4 可回滚 | ✅ 通过 | 卸载即恢复原状；无补丁层、无残留概念。 |

## 测试结果

- `diff -r preset ~/.dsh/.agent-presets/virtual-product-team` → 完全一致（已安装版 = 仓库版）
- `bash -n install.sh` / `bash -n uninstall.sh` → 语法通过
- 文件权限 → install.sh/uninstall.sh 均为 755（可执行）
- DSH 机制源码核对（`@deepseek-ai/dsh-agent-presets`）：
  - `USER_PRESET_DIR = ".agent-presets"`、`METADATA_FILE = "preset.yml"`、`COMPOSITION_FILE = "agent.cordis.yml"` → 与安装布局逐项吻合
  - `includeUserRoot` 默认 true → 用户预设自动被发现
  - 预设 id 正则 `/^[a-z0-9][a-z0-9-]*$/` → `virtual-product-team` 合法
- 运行态实测：本次审计会话即运行在「产品团队模式」预设之上（persona 生效、05-qa 技能从 `~/.dsh/.agent-presets/virtual-product-team/skills/05-qa` 成功加载），证明组合机制端到端可用。

## 安全检查

- [x] 无硬编码密钥：全仓库扫描 `api_key/token/secret/password/sk-*/ghp_*` 等，唯一命中为 05-qa 技能中"应扫描哪些词"的说明文字本身，非真实密钥
- [x] 无个人路径：全仓库扫描 macOS 用户目录前缀、Windows 用户目录前缀、出厂安装目录、本机用户名 → 零命中；作者署名 songoao25 为公开 GitHub 用户名，属分发预期内容
- [x] 依赖漏洞：本产品无依赖、无 lockfile（纯配置 + shell 脚本），不适用
- [x] OWASP 适用项：产品为对话预设（配置文件 + 安装脚本），无网络入口、无输入处理、无服务端；注入/越权类不适用；persona 明文"不执行未授权命令"
- [x] 默认配置安全：无危险默认值；`order: 2` 仅控制选择器排序，不抢占默认模式

## 遗留问题

| 问题 | 严重度 | 处理建议 |
|---|---|---|
| GitHub 仓库 `songoao25/virtual-product-team` 尚未创建与推送（README 中的 clone 地址尚为"将成事实"） | 低 | 按既定分工由老板另用其他 Agent 完成：`git init` → 提交 → 建仓 → 推 main + tag v1.0.0（DSH 侧审计已通过，可直接分发） |
| 自举验收的"发布到 GitHub"环节未执行（FR-5 的最后一公里） | 低 | 同上，随仓库发布一并闭环；本地产物已齐备 |
| v1 无可视化进度面板（纯对话版） | 信息 | PRD 非目标项，符合第一版设计，后续版本规划 |

## 结论

**达到可分发状态。** 功能验收 6 项中 5 项通过、1 项部分（仅剩"推 GitHub"这步由老板执行的收尾动作）；安全清单全绿；安装版与仓库版一致，机制与 DSH 源码逐项吻合，且本次会话即运行于该预设之上（端到端实测可用）。仓库内容可直接交给老板的发布 Agent 建仓推送，无任何必须修复项。
