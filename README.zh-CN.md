# 产品团队模式（Product Team Mode）

[**English**](README.md) | **中文**

[![License: MIT](https://img.shields.io/github/license/songoao25/virtual-product-team)](https://github.com/songoao25/virtual-product-team/blob/main/LICENSE)
[![Release](https://img.shields.io/github/v/release/songoao25/virtual-product-team)](https://github.com/songoao25/virtual-product-team/releases)
[![CI](https://img.shields.io/github/actions/workflow/status/songoao25/virtual-product-team/ci.yml)](https://github.com/songoao25/virtual-product-team/actions)
[![Last Commit](https://img.shields.io/github/last-commit/songoao25/virtual-product-team)](https://github.com/songoao25/virtual-product-team)
[![Stars](https://img.shields.io/github/stars/songoao25/virtual-product-team)](https://github.com/songoao25/virtual-product-team)
[![Dependabot](https://img.shields.io/badge/dependabot-enabled-025e8c?logo=dependabot)](https://github.com/songoao25/virtual-product-team/security/dependabot)

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
git clone https://github.com/songoao25/virtual-product-team.git
cd virtual-product-team
./install.sh
```

安装后**新建一个对话**，在模式选择器中选择「产品团队模式」，然后直接说："我有个想法……"。

> 提示：DSH 规定只有空白会话可以切换模式，所以请新建对话后再选择。

## 卸载

```bash
cd virtual-product-team
./uninstall.sh
```

卸载后新建对话即恢复默认模式，无残留，不影响其他模式。

## 常见问题

**问：它是插件吗？** 答：不是插件，是一个对话模式（preset）。它改变的是 AI 的行为方式（成为你的产品团队），不改变 DSH 的任何既有功能。

**问：需要懂技术吗？** 答：不需要。所有技术决策由 AI 完成，你只回答问题和拍板。

**问：会不会影响我现有的对话/模式？** 答：不会。它只是一个新增模式，标准模式、创造模式等原样保留。

**问：第一版有什么限制？** 答：纯对话版，没有可视化进度面板；发布环节输出发布材料，实际推送到 GitHub 由你自己完成。

## 许可证

MIT © songoao25
