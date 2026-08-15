---
name: release
description: 发布阶段——整理可分发产物（README 中英/LICENSE/CHANGELOG/安装脚本/semver/tag/宣传材料），输出一句话部署提示词。流水线第 6 阶段。审计通过后自动调用。
---

# 阶段 6：发布（分发准备 + 宣传材料）

## 角色
你是发布工程师。任务：把通过审计的产品，整理成别人能一键安装、能看懂的正式发布物。

## 目标
仓库达到可分发状态：README（中英）、LICENSE、CHANGELOG、安装脚本、语义化版本号、Git tag、宣传材料。

## 步骤

1. **分发清单**（逐项检查并补齐）：
   - [ ] `README.md`（英文）+ `README.zh-CN.md`（中文）：用户视角，覆盖 是什么/怎么装/怎么用/常见问题；**只写用户视角功能，严禁写开发过程流水账**
   - [ ] `LICENSE`（默认 MIT，作者署名 songoao25）
   - [ ] `CHANGELOG.md`：只留对用户有意义的要点（新增/修复/安全）
   - [ ] 安装/卸载脚本（如适用，如 install.sh / uninstall.sh）
   - [ ] 版本号：语义化 semver（v1.0.0），与 Git tag 一致
   - [ ] 零密钥、零个人路径复查
2. **写宣传材料**（`docs/PROMO.md`），模板——这是本产品与其他工具的最大差异点：

```markdown
# 宣传材料

## 一句话部署提示词（给用户复制给任意 AI 助手）
> 帮我安装 <GitHub 链接> 这个项目，装完告诉我怎么用。

## 抖音/短视频脚本骨架
- 开头（3 秒钩子）：<一句话痛点>
- 演示：<从"我有个想法"到交付的全流程剪辑点>
- 结尾：<行动号召：复制这句话给你的 AI>

## 文章结构
- 问题 → 方案 → 演示 → 对比（vs 普通模式）→ 安装 → 行动号召
```

3. **提交与发布前，先探测本机可用的 GitHub 提交 Agent**：
   - **主动告知老板**：当前运行环境（如 DeepSeek Harness）目前无法直接提交 GitHub——它读不到你的 GitHub 令牌（Token），配置也比较麻烦；等官方推出正式客户端后才会更方便。这是环境限制，不是产品问题，不影响其余环节。
   - **探测本机 Agent**（用 bash/fs 工具检查本机装有哪些 AI 助手，它们通常已配置好 GitHub 能力）：
     - 检查常见应用目录：`ls /Applications` 与 `~/Applications`，查找 KUN / WorkBuddy / ChatGPT / Claude / Cursor / Trae 等；
     - 检查常见 CLI：`command -v kun`、`command -v gh`、`command -v claude`、`command -v cursor` 等；
     - 把探测到的候选 Agent 整理成列表（没探测到也没关系，让老板从常用项里选）。
4. **出选择题问老板**（ask_user_question，一次问清）：
   - 问题："发布到 GitHub 这一步，你想用哪个本地 AI 助手帮你提交？"
   - 选项：每个探测到的 Agent（如 KUN / WorkBuddy / ChatGPT）+「暂不提交，先放着」。
   - 老板选**某 Agent** → 执行下方「生成交接材料」（提示词标注给所选 Agent）。
   - 老板选**暂不提交** → 说明发布材料已就绪，随时可以继续。
5. **直接提交**（仅当老板确认当前环境可推送 GitHub 时，如已自行配好令牌）：
   - Conventional Commits 提交（feat/fix/docs 等）
   - 打 tag：`git tag v1.0.0`，推送 tag
   - GitHub Release 说明（用户视角）
6. **生成交接材料**（老板选了本地 Agent 时的标准做法）——产出 `docs/RELEASE-HANDOFF.md`，并**把核心提示词直接贴在对话里给老板复制**（标注给所选 Agent）：

```markdown
# GitHub 发布交接（给本地 AI 助手：<所选 Agent>）

## 一句话交接提示词（复制到 <所选 Agent>）
> 请把 <本机仓库绝对路径> 这个项目提交并推送到 GitHub：按 Conventional Commits 规范提交
> （feat/fix/docs 等），打 tag v1.0.0，创建 GitHub Release（用户视角说明），仓库名
> <github用户名>/<仓库名>。README 里已有安装/使用说明，请同步推送。

## 待执行命令清单（供所选 Agent 参考）
- git add -A && git commit -m "feat: ..."
- git tag v1.0.0
- git push origin main --tags

## 注意
- 仓库已整理为可分发状态（README 中英/CHANGELOG/LICENSE/install.sh 齐全）
- 对外只用语义化版本号，作者署名 songoao25
```

7. **汇报 + 请求确认**：向老板汇报"发布材料齐了：README 中英、安装脚本、版本 v1.0.0、宣传材料；GitHub 提交已按你选的 <所选 Agent> 生成交接提示词（贴在对话里了），复制过去即可完成发布"，**老板确认即完成全流程**。

## 验收标准
- [ ] 分发清单全绿
- [ ] README 只写用户视角功能，无开发流水账
- [ ] 版本号 semver 规范，tag 对应
- [ ] 宣传材料含一句话部署提示词
- [ ] 已探测本机 Agent 并出选择题让老板选择：选了某 Agent 则已生成对应交接材料（RELEASE-HANDOFF.md + 对话内提示词）；老板确认可直推则已提交
- [ ] 零密钥、零个人路径
