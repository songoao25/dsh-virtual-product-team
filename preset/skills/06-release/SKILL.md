---
name: release
description: 发布阶段——整理可分发产物（README 中英/LICENSE/CHANGELOG/社区健康文件/CI/semver/tag/Release），符合 GitHub 发布全规范。流水线第 6 阶段。审计通过后自动调用。
---

# 阶段 6：发布（分发准备，符合 GitHub 全规范）

## 角色
你是发布工程师。任务：把通过审计的产品，整理成别人能一键安装、能看懂的正式发布物，**并符合 GitHub 发布全规范**。

## 目标
仓库达到**符合 GitHub 发布全规范**的可分发状态：README（中英）、LICENSE、CHANGELOG、社区健康文件、CI、语义化版本号、tag/Release 四件套同步。（宣传材料与部署分别在第 7、8 阶段处理，不在本阶段。）

## 步骤

2. **GitHub 发布规范总检查清单**（逐项检查并补齐，缺即生成）：

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

   **README 徽章（标准 7 件套，顺序固定，全带链接）**
   - [ ] 徽章区位于 README 顶部（标题→语言切换→徽章→一句话简介），中英文 README 放同一组
   - [ ] License：`img.shields.io/github/license/<OWNER>/<REPO>` → 链接到 LICENSE
   - [ ] Release：`img.shields.io/github/v/release/<OWNER>/<REPO>` → 链接到 releases（**先确认已发 Release/tag，无 Release 时徽章显示灰色 no releases，勿裸放**）
   - [ ] CI：`img.shields.io/github/actions/workflow/status/<OWNER>/<REPO>/ci.yml` → 链接到 actions（**文件名必须与实际 workflow 完全一致**）
   - [ ] Last commit：`img.shields.io/github/last-commit/<OWNER>/<REPO>`
   - [ ] Stars：`img.shields.io/github/stars/<OWNER>/<REPO>` → 链接到 stargazers
   - [ ] Dependabot：`img.shields.io/badge/dependabot-enabled-025e8c?logo=dependabot`（开启 dependabot 后用）
   - [ ] Downloads（可选）：`img.shields.io/github/downloads/<OWNER>/<REPO>/total`（**仅当 Release 带资产时才有意义**）
   - [ ] **禁静态徽章冒充版本号**（版本只用动态 github/v/release）；徽章总数控制 5–8 个
   - [ ] 每个徽章 URL 用 `curl -I` 验证返回 200；版本徽章显示值 == git tag == CHANGELOG 顶部 == Release title（四者一致）

   **GitHub 设置项（Must）**
   - [ ] 仓库公开（Public）
   - [ ] description：一句话讲清"是什么+解决什么问题"，**禁内部代号**
   - [ ] topics：生态词全套（deepseek-harness / dsh / dsh-plugin / dsh-plugins / awesome-dsh-plugin）+ 类型词（plugin 或 preset/agent-preset）+ 功能词，共 5–10 个
   - [ ] 默认分支为 `main`
   - [ ] 开启 Discussions（可选，推荐）

   **发布前必检**
   - [ ] 零密钥、零个人路径（含 `git log -p --all | grep -iE 'sk-[a-z0-9]|api[_-]?key|BEGIN (RSA|OPENSSH|EC) PRIVATE'` 历史扫描）
   - [ ] 提交信息遵循 Conventional Commits（feat/fix/docs/style/refactor/perf/test/build/ci/chore/revert，禁止裸写 "update"/"fix bug"）
   - [ ] 四件套同步：semver 决策 → 更新 CHANGELOG → commit → 打 tag → 建 Release 一次完成
3. **提交与发布前，先探测本机可用的 GitHub 提交 Agent**：
   - **探测本机 Agent**（用 bash/fs 工具检查本机装有哪些 AI 助手，它们通常已配置好 GitHub 能力）：
     - 检查常见应用目录：`ls /Applications` 与 `~/Applications`，查找 KUN / WorkBuddy / ChatGPT / Claude / Cursor / Trae 等；
     - 检查常见 CLI：`command -v kun`、`command -v gh`、`command -v claude`、`command -v cursor` 等；
     - 把探测到的候选 Agent 整理成列表（没探测到也没关系，让用户从常用项里选）。
4. **出选择题问用户**（ask_user_question，一次问清，**无预设优先级，一律先问**）：
   - 问题："发布到 GitHub 这一步，你想用哪个本地 AI 助手帮你提交？"
   - 选项：每个探测到的 Agent（如 KUN / WorkBuddy / ChatGPT）+「暂不提交，先放着」。
   - 用户选**某 Agent** → 按下方「执行提交」。
   - 用户选**暂不提交** → 说明发布材料已就绪，随时可以继续。
5. **执行提交**（按用户所选 Agent）：
   - **若能直接调用所选 Agent**（如 KUN 可通过 `kun exec bash` 通道直接执行 git 操作，绕开模型凭据问题）：直接经该通道执行，不让用户动手——
     - `git init -b main && git add -A`（如未初始化）
     - `git commit -m "feat: <产品名> v1.0.0——<一句话>"`（Conventional Commits）
     - `git tag v1.0.0`
     - 建仓推送：`gh repo create <github用户名>/<仓库名> --public --source . --push`（若 gh 已登录；或经该通道执行 `gh auth status` 确认）
     - 推 tag：`git push origin v1.0.0`
     - 创建 Release：把用户视角说明写入临时文件，`gh release create v1.0.0 --title "<产品名> v1.0.0" --notes-file <文件>`
   - **若不能直接调用所选 Agent**：生成标注"给所选 Agent"的交接材料（`docs/RELEASE-HANDOFF.md` + 对话内提示词），供用户复制到该 Agent 执行。
   - **验证**：用 GitHub API（`api.github.com/repos/<owner>/<repo>`、`/tags`、`/releases`）独立确认仓库/分支/tag/Release 存在。
6. **汇报 + 请求确认**：向用户汇报"已按你选的 <所选 Agent> 发布到 GitHub：仓库 <owner>/<repo>（公开，main 分支 + tag v1.0.0 + Release 已建），链接：<url>"，**用户确认即完成全流程**。

## 验收标准
- [ ] GitHub 发布规范总检查清单逐项核验（标准文件/社区健康/CI 安全/GitHub 设置项全绿或已补齐）
- [ ] README 只写用户视角功能，无开发流水账，中英文互含切换链接
- [ ] 版本号 semver 规范，tag 与 Release 对应（四件套同步：版本号+CHANGELOG+tag+Release notes）
- [ ] 宣传材料含一句话部署提示词
- [ ] 已探测本机 Agent 并出选择题让用户选择（无预设优先级）；用户选定后按所选 Agent 执行（可直调则直调，否则交接）；或用户选择暂不提交
- [ ] 已发布到 GitHub（若用户选择提交）：仓库公开、main 分支 + tag + Release 已建，description/topics 已设置
- [ ] 零密钥、零个人路径（含 git 历史扫描）
