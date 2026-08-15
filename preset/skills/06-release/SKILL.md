---
name: release
description: 发布阶段——整理可分发产物（README 中英/LICENSE/CHANGELOG/安装脚本/semver/tag/宣传材料），输出一句话部署提示词。流水线第 6 阶段。审计通过后自动调用。
---

# 阶段 6：发布（分发准备 + 宣传材料）

## 角色
你是发布工程师。任务：把通过审计的产品，整理成别人能一键安装、能看懂的正式发布物。

## 目标
仓库达到**符合 GitHub 发布全规范**的可分发状态：README（中英）、LICENSE、CHANGELOG、社区健康文件、CI、语义化版本号、tag/Release 四件套同步、宣传材料。

## 步骤

1. **GitHub 发布规范总检查清单**（逐项检查并补齐，缺即生成）：

   **标准文件（Must）**
   - [ ] `README.md`（英文）+ `README.zh-CN.md`（中文）：用户视角，覆盖 是什么/怎么装/怎么用/常见问题；**只写用户视角功能，严禁写开发过程流水账与内部代号**；中英文顶部互含语言切换链接（`[**English**](README.md) | **中文**`）
   - [ ] `LICENSE`（默认 MIT，作者署名 songoao25）
   - [ ] `CHANGELOG.md`：只留对用户有意义的要点（新增/修复/破坏性变更/安全），格式遵循 Keep a Changelog
   - [ ] `.gitignore`：排除依赖目录、密钥、本地数据、日志
   - [ ] 安装/卸载脚本（如适用，如 install.sh / uninstall.sh）
   - [ ] 版本号：语义化 semver（v1.0.0），与 Git tag 一致

   **社区健康文件（Should）**
   - [ ] `CONTRIBUTING.md`：报 bug/提 PR/开发环境/提交规范
   - [ ] `CODE_OF_CONDUCT.md`：Contributor Covenant 2.1
   - [ ] `SECURITY.md`：漏洞报告渠道（私有漏洞报告）
   - [ ] `SUPPORT.md`：支持渠道说明
   - [ ] `.gitattributes`：统一 LF 换行
   - [ ] `.editorconfig`：统一编辑器风格

   **CI 与安全（Should）**
   - [ ] `.github/workflows/ci.yml`：push/PR 自动构建+测试
   - [ ] `.github/dependabot.yml`：依赖更新
   - [ ] CodeQL 代码扫描（`.github/workflows/codeql.yml` 或开启 GitHub 内置）
   - [ ] Issue 模板（`.github/ISSUE_TEMPLATE/`：bug + feature）
   - [ ] PR 模板（`.github/pull_request_template.md`）
   - [ ] `AGENTS.md`（DSH 生态产品强烈建议：给 AI 助手的仓库说明）

   **GitHub 设置项（Must）**
   - [ ] 仓库公开（Public）
   - [ ] description：一句话讲清"是什么+解决什么问题"，**禁内部代号**
   - [ ] topics：至少 3–5 个（deepseek-harness / dsh / dsh-plugin / agent-preset / 语言 / 用途）
   - [ ] 默认分支为 `main`
   - [ ] 开启 Discussions（可选，推荐）

   **发布前必检**
   - [ ] 零密钥、零个人路径（含 `git log -p --all | grep -iE 'sk-[a-z0-9]|api[_-]?key|BEGIN (RSA|OPENSSH|EC) PRIVATE'` 历史扫描）
   - [ ] README 徽章与事实一致（版本徽章显示的 tag 必须真实存在）
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
   - **探测本机 Agent**（用 bash/fs 工具检查本机装有哪些 AI 助手，它们通常已配置好 GitHub 能力）：
     - 检查常见应用目录：`ls /Applications` 与 `~/Applications`，查找 KUN / WorkBuddy / ChatGPT / Claude / Cursor / Trae 等；
     - 检查常见 CLI：`command -v kun`、`command -v gh`、`command -v claude`、`command -v cursor` 等；
     - 把探测到的候选 Agent 整理成列表（没探测到也没关系，让老板从常用项里选）。
4. **出选择题问老板**（ask_user_question，一次问清，**无预设优先级，一律先问**）：
   - 问题："发布到 GitHub 这一步，你想用哪个本地 AI 助手帮你提交？"
   - 选项：每个探测到的 Agent（如 KUN / WorkBuddy / ChatGPT）+「暂不提交，先放着」。
   - 老板选**某 Agent** → 按下方「执行提交」。
   - 老板选**暂不提交** → 说明发布材料已就绪，随时可以继续。
5. **执行提交**（按老板所选 Agent）：
   - **若能直接调用所选 Agent**（如 KUN 可通过 `kun exec bash` 通道直接执行 git 操作，绕开模型凭据问题）：直接经该通道执行，不让老板动手——
     - `git init -b main && git add -A`（如未初始化）
     - `git commit -m "feat: <产品名> v1.0.0——<一句话>"`（Conventional Commits）
     - `git tag v1.0.0`
     - 建仓推送：`gh repo create <github用户名>/<仓库名> --public --source . --push`（若 gh 已登录；或经该通道执行 `gh auth status` 确认）
     - 推 tag：`git push origin v1.0.0`
     - 创建 Release：把用户视角说明写入临时文件，`gh release create v1.0.0 --title "<产品名> v1.0.0" --notes-file <文件>`
   - **若不能直接调用所选 Agent**：生成标注"给所选 Agent"的交接材料（`docs/RELEASE-HANDOFF.md` + 对话内提示词），供老板复制到该 Agent 执行。
   - **验证**：用 GitHub API（`api.github.com/repos/<owner>/<repo>`、`/tags`、`/releases`）独立确认仓库/分支/tag/Release 存在。
6. **汇报 + 请求确认**：向老板汇报"已按你选的 <所选 Agent> 发布到 GitHub：仓库 <owner>/<repo>（公开，main 分支 + tag v1.0.0 + Release 已建），链接：<url>"，**老板确认即完成全流程**。

## 验收标准
- [ ] GitHub 发布规范总检查清单逐项核验（标准文件/社区健康/CI 安全/GitHub 设置项全绿或已补齐）
- [ ] README 只写用户视角功能，无开发流水账，中英文互含切换链接
- [ ] 版本号 semver 规范，tag 与 Release 对应（四件套同步：版本号+CHANGELOG+tag+Release notes）
- [ ] 宣传材料含一句话部署提示词
- [ ] 已探测本机 Agent 并出选择题让老板选择（无预设优先级）；老板选定后按所选 Agent 执行（可直调则直调，否则交接）；或老板选择暂不提交
- [ ] 已发布到 GitHub（若老板选择提交）：仓库公开、main 分支 + tag + Release 已建，description/topics 已设置
- [ ] 零密钥、零个人路径（含 git 历史扫描）
