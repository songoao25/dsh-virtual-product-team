# AGENTS.md — 给 AI 编码助手/Agent 的仓库说明

本文件帮助 AI 编码助手（如 DeepSeek Harness、Cursor、Claude Code 等）快速理解本仓库。

## 这是什么

「产品团队模式」——DeepSeek Harness（DSH）的一个对话模式（agent preset）。用户说"我有个想法"，AI 就以虚拟产品团队（产品经理→工程师→QA→发布员）身份带用户走完从想法到发布的完整流程。用户是非技术背景，只说话和拍板。

## 仓库结构

- `preset/` — 预设本体
  - `preset.yml` — 预设元数据（name/description/order）
  - `agent.cordis.yml` — 预设组合（persona 人设 + 工具 + 技能挂载 + v1.1.0 自我改造工具）
  - `skills/<编号>-<名>/SKILL.md` — 8 个阶段技能（idea-validation/product-prd/design/dev-qa/release-deploy/promotion/operations/iteration，12 环节全覆盖）
  - `skills/cordis-plugin-development`、`skills/editing-cordis-compositions` — 官方工艺技能（v1.1.0，开发 DSH 模式/插件时用，来自官方创造模式同款）
- `install.sh` / `uninstall.sh` — 一键安装/卸载（拷 preset 到 `~/.dsh/.agent-presets/`）
- `docs/` — PRD、技术设计、审计报告、宣传材料
- `.github/` — CI、CodeQL、Issue/PR 模板、Dependabot

## 关键约定

- 修改 `preset/` 后需同步安装副本：`~/.dsh/.agent-presets/dsh-virtual-product-team/`
- 对外文档（README/CHANGELOG）只写用户视角功能，严禁开发过程流水账与内部代号
- 提交遵循 Conventional Commits（feat/fix/docs/test/chore）
- 分发铁律：零密钥、零个人路径、作者署名 songoao25、只用语义化版本号
- 05-release-deploy 技能负责 GitHub 发布：先探测本机 Agent → 出选择题问用户用哪个 → 按所选执行（可直调如 KUN exec 则直调）

## 常用命令

- 安装：`./install.sh`；卸载：`./uninstall.sh`
- 验证 preset 文件：`.github/workflows/ci.yml` 中的检查项
