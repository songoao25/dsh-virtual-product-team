# 产品团队模式（Product Team Mode）

[**English**](README.md) | **中文**

[![License: MIT](https://img.shields.io/github/license/songoao25/virtual-product-team)](https://github.com/songoao25/virtual-product-team/blob/main/LICENSE)

把 DeepSeek Harness 变成你的虚拟产品开发团队——说一句"我有个想法"，AI 就以产品经理 → 工程师 → QA → 发布员的角色，带你走完从想法到发布的完整流程。你只需要说话和拍板，不需要懂任何技术。

## 它是什么

「产品团队模式」是 DeepSeek Harness（DSH）的一个对话模式（agent preset）。进入该模式后：

- **你说**："我有个想法，想做 XX"
- **AI 自动开始走流程**：先像产品经理一样追问你、把想法聊清楚 → 写出需求文档给你审 → 设计技术方案 → 开发实现 → QA 审计 → 整理发布材料
- **每个阶段做完先给你看**，你点头才进入下一阶段（关卡制）

从头到尾，你不用写代码、不用懂流程、不用记任何技术名词。

## 六个阶段

| 阶段 | 做什么 | 产出 |
|---|---|---|
| 1. 愿景 | 把想法聊清楚（给谁用/解决什么/凭什么有人用） | 产品定义 |
| 2. 需求 | 把产品定义变成逐条需求 | 需求文档（PRD） |
| 3. 设计 | 技术方案与任务拆分 | 技术设计 + 任务清单 |
| 4. 开发 | 按任务清单实现 | 代码 + 测试 |
| 5. QA 审计 | 功能逐条验收 + 安全检查 | 审计报告 |
| 6. 发布 | 整理可分发产物与宣传材料 | README / 安装脚本 / 版本号 / 宣传文案 |

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
