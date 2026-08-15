---
name: release-deploy
description: 发布与部署阶段——发布准备（README/CHANGELOG/LICENSE/版本/tag/Release，符合 GitHub 全规范）+ 实际部署上线。流水线第 5 阶段，覆盖环节⑧⑨。审计通过后自动调用。
---

# 阶段 5：发布与部署（⑧发布准备 ⑨部署）

## 角色
你是主 Agent（发布/运维工程师）。任务：把通过审计的产品发布到 GitHub 并部署上线，**符合 GitHub 发布全规范**。

## 目标
仓库达到符合 GitHub 全规范的可分发状态 + 实际部署上线可验证，产出 `docs/RELEASE.md` + `docs/DEPLOY.md`。

## 步骤

### 第一部分：发布准备（⑧）

1. **GitHub 发布规范检查清单**（逐项检查并补齐）：
   **标准文件（Must）**
   - [ ] `README.md`（英文）+ `README.zh-CN.md`（中文）：用户视角，覆盖 是什么/怎么装/怎么用/常见问题；**只写用户视角功能，严禁写开发过程流水账与内部代号**；中英文顶部互含语言切换链接
   - [ ] `LICENSE`（默认 MIT，作者署名 songoao25）
   - [ ] `CHANGELOG.md`（Keep a Changelog 格式）
   - [ ] `.gitignore`（排除依赖/密钥/本地数据/日志）
   - [ ] 版本号：语义化 semver，与 Git tag 一致
   **社区健康文件（Should）**
   - [ ] `CONTRIBUTING.md` / `CODE_OF_CONDUCT.md` / `SECURITY.md` / `SUPPORT.md`
   - [ ] `.gitattributes`（LF 换行）/ `.editorconfig`
   **CI 与安全（Should）**
   - [ ] `.github/workflows/ci.yml`（push/PR 自动构建+测试）
   - [ ] `.github/dependabot.yml` / CodeQL / Issue+PR 模板 / `AGENTS.md`
   **GitHub 设置（Must）**
   - [ ] 仓库公开（Public）；description 一句话讲清；topics（生态词 deepseek-harness/dsh/dsh-plugin + 类型词 plugin 或 preset + 功能词）
   - [ ] 默认分支 `main`；开启 Discussions（可选）
   **README 徽章（标准 7 件套，顺序固定，全带链接）**
   - [ ] License / Release / CI / Last commit / Stars / Dependabot（+ Downloads 若 Release 带资产）
   - [ ] **禁静态徽章冒充版本号**；每个徽章 URL 用 `curl -I` 验证 200；版本徽章显示值 == git tag == CHANGELOG 顶部 == Release title
   **发布前必检**
   - [ ] 零密钥、零个人路径（含 `git log -p --all | grep -iE 'sk-[a-z0-9]|api[_-]?key|BEGIN (RSA|OPENSSH|EC) PRIVATE'` 历史扫描）
   - [ ] 提交信息遵循 Conventional Commits；四件套同步：semver → CHANGELOG → commit → tag → Release 一次完成

2. **探测本机可用的 GitHub 提交 Agent**（`ls /Applications`、`command -v kun`、`command -v gh` 等），整理候选列表。

3. **出选择题问用户**（ask_user_question，**无预设优先级，一律先问**）：
   - 问题："发布到 GitHub 这一步，你想用哪个本地 AI 助手帮你提交？"
   - 选项：探测到的 Agent（KUN / WorkBuddy / ChatGPT / gh CLI…）+「暂不提交，先放着」。
   - 用户选某 Agent → 执行提交；选暂不提交 → 说明材料已就绪。

4. **执行提交与发布**（按用户所选 Agent）：
   - 若能直接调用所选 Agent（如 KUN 的 `kun exec bash` 通道）：直接执行——`git init -b main && git add -A` → `git commit -m "feat: <产品名> v1.0.0——<一句话>"` → `git tag v1.0.0` → `gh repo create <owner>/<repo> --public --source . --push` → `git push origin v1.0.0` → `gh release create v1.0.0 --title "<产品名> v1.0.0" --notes-file <文件>`
   - 若不能直接调用：生成标注"给所选 Agent"的交接材料（`docs/RELEASE-HANDOFF.md` + 对话内提示词）。
   - **验证**：用 GitHub API 独立确认仓库/分支/tag/Release 存在。

### 第二部分：部署上线（⑨）

5. **确认部署方式**：根据产品类型确定怎么部署（DSH 插件 → install.sh；Web 应用 → 托管平台）。用大白话向用户说明"装好后怎么用"。
6. **执行部署 + 冒烟测试**：部署后跑一遍核心功能确认可用。
7. **写部署文档**（`docs/DEPLOY.md`）：部署方式 / 冒烟测试结果 / 回滚方案 / 上线检查清单。

8. **Gate 5 汇报**：向用户汇报"已发布到 GitHub（链接）+ 已部署上线（冒烟通过，回滚方案），按你选的 <Agent> 执行完成"，**用户确认才进阶段 6**。

## 验收标准（Gate 5）
- [ ] GitHub 发布规范检查清单全绿
- [ ] 仓库公开、main 分支 + tag + Release 已建，description/topics 已设置
- [ ] README 中英切换 + 标准徽章套装（URL 全部 200）
- [ ] 已部署上线并冒烟通过，回滚方案明确
- [ ] 零密钥、零个人路径
- [ ] 用户确认
