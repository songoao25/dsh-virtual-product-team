# GitHub 命名与仓库设计规范（调研定稿）

> 2026-08-16 子 Agent 调研定稿，已融入产品团队模式 05-release-deploy 技能「专业默认规范」。
> 来源：GitHub 官方文档（Quickstart、GitHub Flow、github-limits）、npm validate-npm-package-name、Conventional Commits 1.0.0、semver.org、Keep a Changelog、BC Gov/Fermi Lab 组织级命名指南、rOpenSci。

## 一、命名速查清单（39 条默认做法精选）

### 项目/仓库命名
1. **kebab-case 全小写 + 小横杠分隔**（`bottom-info-bar`、`virtual-product-team`）——不用下划线、不用大写、不用空格
2. GitHub 硬性约束：≤100 字符、仅 ASCII 字母数字 + `-` `_` `.`；空格自动转连字符
3. npm 包名：全小写、≤214 字符、禁核心模块名冲突（`npm validate-npm-package-name` 校验）
4. 以核心功能关键词开头；可体现技术栈/类型（如 `-plugin`、`-preset`）
5. 保持简洁唯一（避免过于通用、占用常用词、与流行项目冲突）
6. 中文项目用英文命名（GitHub 生态、搜索、awesome 收录均需英文名）

### 分支命名
7. `<type>/<描述>`：`feature/xxx`、`fix/xxx`、`docs/xxx`、`release/v1.0.0`

### 文件/目录命名
8. 文件 kebab-case（`my-component.ts`）；类/组件 PascalCase；变量/函数 camelCase（JS/TS）或 snake_case（Python）；常量 UPPER_SNAKE_CASE
9. 标准目录：`src/`、`docs/`、`tests/`、`.github/`
10. README/LICENSE/CHANGELOG 放根目录（GitHub"魔法识别"自动展示）

## 二、仓库设计规范

- 根目录文件：README（是什么/怎么装/怎么用）、LICENSE（缺 = 法律上不能开源）、CHANGELOG、CONTRIBUTING、.gitignore（第一件事就建）
- .gitignore 必备：node_modules/build/dist/.env/*.log/.DS_Store
- .editorconfig + .gitattributes（LF 换行）+ 格式化工具（Prettier/ESLint 等）
- 分支保护：main 要求 PR + CI + enforce_admins=false（单人项目管理员可直推）

## 三、提交与 PR 规范

- Conventional Commits：`<type>(<scope>): <subject>`；type=feat/fix/docs/style/refactor/perf/test/build/ci/chore/revert；破坏性 `feat!:` 或 `BREAKING CHANGE:`
- 50/72 规则：标题 ≤50 字符，正文每行 ≤72 字符
- 提交描述"为什么"而非"做了什么"
- PR 小而可评审（一个功能/修复，<300-400 行）；描述含 动机/改动/测试/截图/Fixes #12
- Code Review：四眼原则、对事不对人、评审看逻辑/边界/可读/安全/带测试
- Issue：复现步骤/期望实际/环境

## 四、版本规范

- semver 决策表：major=不兼容、minor=新功能、patch=缺陷修复；1.0.0 前用 0.x
- tag 加 v 前缀（`v1.0.0`），tag 与 Release 一一对应
- CHANGELOG 用 Keep a Changelog（Added/Changed/Deprecated/Removed/Fixed/Security）
- 四件套同步：semver → CHANGELOG → commit → tag → Release 一次完成

## 五、最易踩的 12 个坑

1. 没 LICENSE = 法律上不能开源（第一大坑）
2. 密钥一旦推送 git 历史即泄露（不可逆）
3. 命名不规范（下划线/大写/空格）——搜索与收录受影响
4. 提交信息裸写 "update"/"fix bug"
5. 生成物入库（node_modules/build）
6. 静态徽章冒充版本号
7. CI 徽章写错 workflow 文件名
8. 无 tag 就放 release 徽章
9. 分支直接推 main 无保护
10. 没有 .gitignore
11. README 无安装使用说明
12. topics/description 为空（搜索与 awesome 不收录）

## 六、落地位置

- 已融入产品团队模式 05-release-deploy 技能「专业默认规范」小节（仓库命名/仓库设计/版本发布/PR/Issue 规范）
- 与 docs/GITHUB-RELEASE-STANDARDS.md（Must 12/Should 14/Could 9）配套
- 项目初期设计（02-product-prd）与命名环节均引用此规范
