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

3. **提交与发布（默认直接执行，不让老板动手）**：
   - **优先直接执行**：本机如有 KUN（`command -v kun` 存在），通过 `kun exec bash` 通道直接执行 git 操作（绕开模型凭据问题，无需老板复制提示词）：
     - `git init -b main && git add -A`（如未初始化）
     - `git commit -m "feat: <产品名> v1.0.0——<一句话>"`（Conventional Commits）
     - `git tag v1.0.0`
     - 建仓推送：`gh repo create <github用户名>/<仓库名> --public --source . --push`（若 gh 已登录；或经 KUN exec 执行 `gh auth status` 确认）
     - 推 tag：`git push origin v1.0.0`
     - 创建 Release：把用户视角说明写入临时文件，`gh release create v1.0.0 --title "<产品名> v1.0.0" --notes-file <文件>`
   - **每次 git 操作都通过 KUN exec 执行**（`kun exec --data-dir ~/.kun --workspace <项目路径> bash --args '{"command":"..."}'`），不直接用本机 shell 操作 git——保持"DSH 经 KUN 驱动"的统一通道。
   - **验证**：用 GitHub API（`api.github.com/repos/<owner>/<repo>`、`/tags`、`/releases`）独立确认仓库/分支/tag/Release 存在。
4. **KUN 不可用时的备选**（`command -v kun` 不存在或 exec 失败）：
   - **主动告知老板**：当前环境无法直接提交 GitHub（读不到令牌或配置麻烦），需要借助本地其他 AI 助手。
   - **探测本机 Agent**（`ls /Applications`、`command -v gh` 等）并**出选择题**问老板用哪个（ask_user_question，选项含「暂不提交」）。
   - 老板选定后，生成标注"给所选 Agent"的交接材料（`docs/RELEASE-HANDOFF.md` + 对话内提示词），供老板复制到该 Agent 执行。
5. **汇报 + 请求确认**：向老板汇报"已发布到 GitHub：仓库 <owner>/<repo>（公开，main 分支 + tag v1.0.0 + Release 已建），链接：<url>"，**老板确认即完成全流程**。

## 验收标准
- [ ] 分发清单全绿
- [ ] README 只写用户视角功能，无开发流水账
- [ ] 版本号 semver 规范，tag 对应
- [ ] 宣传材料含一句话部署提示词
- [ ] 已发布到 GitHub：仓库公开、main 分支 + tag + Release 已建（经 KUN exec 直接执行；KUN 不可用时才出选择题借其他 Agent）
- [ ] 零密钥、零个人路径
