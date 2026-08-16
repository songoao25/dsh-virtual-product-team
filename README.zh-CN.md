# 产品团队模式

[**English**](README.md) | **中文**

[![License: MIT](https://img.shields.io/github/license/songoao25/dsh-virtual-product-team)](https://github.com/songoao25/dsh-virtual-product-team/blob/main/LICENSE)
[![Release](https://img.shields.io/github/v/release/songoao25/dsh-virtual-product-team)](https://github.com/songoao25/dsh-virtual-product-team/releases)
[![CI](https://img.shields.io/github/actions/workflow/status/songoao25/dsh-virtual-product-team/ci.yml)](https://github.com/songoao25/dsh-virtual-product-team/actions)
[![Last Commit](https://img.shields.io/github/last-commit/songoao25/dsh-virtual-product-team)](https://github.com/songoao25/dsh-virtual-product-team)
[![Stars](https://img.shields.io/github/stars/songoao25/dsh-virtual-product-team)](https://github.com/songoao25/dsh-virtual-product-team)
[![Dependabot](https://img.shields.io/badge/dependabot-enabled-025e8c?logo=dependabot)](https://github.com/songoao25/dsh-virtual-product-team/security/dependabot)

把 DeepSeek Harness 变成你的虚拟产品开发团队——说一句"我有个想法"，AI 就以产品经理 → 工程师 → QA → 发布员的角色，带你走完从想法到发布的完整流程。你只需要说话和拍板，不需要懂任何技术。

## 它是什么

「产品团队模式」是 DeepSeek Harness（DSH）的一个对话模式（agent preset）。进入该模式后：

- **你说**："我有个想法，想做 XX"
- **AI 自动开始走流程**：先像产品经理一样追问你、把想法聊清楚 → 写出需求文档给你审 → 设计技术方案 → 开发实现 → QA 审计 → 整理发布材料
- **每个阶段做完先给你看**，你点头才进入下一阶段（关卡制）

从头到尾，你不用写代码、不用懂流程、不用记任何技术名词。

## 八个阶段（12 环节全覆盖）

| 阶段 | 做什么 | 产出 |
|---|---|---|
| 1. 想法验证 | 调研市场/竞品/可行性，确认值不值得做 | 想法验证结论 |
| 2. 产品定义与需求 | 产品定位 + 逐条需求（带验收标准） | 产品定义 + PRD |
| 3. 技术设计 | 技术方案与任务拆分 | 技术设计 + 任务清单 |
| 4. 开发与质量 | 开发实现 + 测试 + 安全审计 | 代码 + 审计报告 |
| 5. 发布与部署 | 整理可分发产物（符合 GitHub 规范）+ 部署上线 | README / 版本 / Release / 部署验证 |
| 6. 宣传与冷启动 | 首发包（视频脚本/文章/渠道） | 宣传材料 |
| 7. 运营与增长 | 数据看板、反馈渠道、增长动作 | 运营方案 |
| 8. 迭代与维护 | 反馈池、路线图，完成后循环进入下一轮 | 迭代路线图 |

## 安装

前置条件：已安装 DeepSeek Harness（`dsh` 在 PATH 中）。

```bash
git clone https://github.com/songoao25/dsh-virtual-product-team.git
cd dsh-virtual-product-team
./install.sh
```

安装后**新建一个对话**，在模式选择器中选择「产品团队模式」，然后直接说："我有个想法……"。

> 提示：DSH 规定只有空白会话可以切换模式，所以请新建对话后再选择。

## 卸载

```bash
cd dsh-virtual-product-team
./uninstall.sh
```

卸载后新建对话即恢复默认模式，无残留，不影响其他模式。

## 作为技能包安装（可选）

从 v1.2.0 起，本仓库同时声明为 DSH bundle 插件，可以把它当作**技能包**装到某个 profile：

```bash
dsh plugin --profile <profile名> add dsh-virtual-product-team
```

装完后该 profile 的每个会话都能按需加载 8 个阶段技能（想法验证 → … → 迭代），无需安装整个预设。

技能有两种装法，按需任选其一：

| 装法 | 得到什么 | 命令 |
|---|---|---|
| **完整模式（推荐）** | 预设 + 人设 + 工具 + 10 个技能（8 阶段 + 2 工艺） | `./install.sh` |
| **仅技能包** | 只是 8 个阶段技能，profile 的任意会话可用 | `dsh plugin --profile <p> add dsh-virtual-product-team` |

两者技能内容相同，任选一种即可。推荐完整模式：一处安装就涵盖本模式全部能力。（bundle 安装只提供技能层——预设、人设、工具仍由 `./install.sh` 提供。）

## 常见问题

**问：它是插件吗？** 答：它首先是对话模式（preset）。从 v1.2.0 起它同时打包为 DSH bundle，可以把 8 个阶段技能作为技能包按 profile 安装；这是补充能力，完整模式仍用 `./install.sh` 安装。

**问：需要懂技术吗？** 答：不需要。所有技术决策由 AI 完成，你只回答问题和拍板。

**问：会不会影响我现有的对话/模式？** 答：不会。它只是一个新增模式，标准模式、创造模式等原样保留。

**问：第一版有什么限制？** 答：纯对话版，没有可视化进度面板；发布环节会询问你用哪个本地 AI 助手完成 GitHub 提交（提交/tag/Release 由所选助手执行）。

**问：它能开发 DSH 自身的模式/插件吗（像创造模式那样）？** 答：可以。从 v1.1.0 起，本模式内置了与创造模式同款的自我改造工具和两份官方工艺技能，虚拟团队同样能开发新的 DSH 模式/插件。注意：这套工具权限等级很高（等同系统权限），只在明确要求开发 DSH 类产品时才使用，日常开发普通产品完全不受影响。

## 许可证

MIT © songoao25
