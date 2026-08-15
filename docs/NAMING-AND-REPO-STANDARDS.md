# GitHub 项目命名规范 + 仓库设计规范（调研定稿）

> 2026-08-16 子 Agent 调研定稿（基于 GitHub 官方文档、npm 官方校验器、Conventional Commits、SemVer、Keep a Changelog、BC Gov/Fermi Lab 命名指南），已融入产品团队模式 05-release-deploy 技能「专业默认规范」。

## 0. 开发者默认规范速查清单

### 命名（10 条）
1. 仓库名 **全小写 + 连字符分隔**（kebab-case）：`my-awesome-app`
2. 只允许 ASCII 字母、数字、`-`、`_`、`.`，最长 **100 字符**；**不要空格**（GitHub 自动转 `-`，导致"看到的名字 ≠ 实际 URL"）
3. 用**名词/名词短语**表达"这是什么产品"，核心功能词放主体或开头：`todo-cli` 优于 `cli-tool`
4. **简洁唯一**：2~3 个词、短、易记、全网搜不到重名；避免 `util`/`demo`/`test`/`my-project` 泛名
5. npm 包名规则（硬性）：**全小写、可含连字符、不能以 `.`/`_` 开头、不能有空格、≤214 字符、不能与 Node 核心模块重名**
6. **包名尽量 = 仓库名**，避免分发时两套名字
7. 避免：版本号、年份、个人/组织名（除非品牌）、依赖名、酷炫生造词
8. 同功能多语言版才加语言后缀（`openai-python`），否则**别把技术栈塞进名字**
9. 中文项目：优先英文功能词命名（`ant-design`、`element-plus` 模式）；拼音只用于专有品牌名
10. 不用下划线代替连字符（JS 生态主流是连字符）；不用大写（URL 大小写敏感易死链）

### 仓库设计（8 条）
1. 默认分支 `main`
2. 标准目录：`src/`、`tests/`、`docs/`、`.github/`、`examples/`、`scripts/`
3. 根目录必备：README.md、LICENSE、CHANGELOG.md、.gitignore；分发项目加 CONTRIBUTING/CODE_OF_CONDUCT/SECURITY/SUPPORT
4. **没有 LICENSE = 法律上"保留所有权利"**；个人开源项目默认 MIT
5. 分支命名 `<type>/<描述>`：`feature/add-login`、`fix/header-bug`、`release/v1.2.0`、`hotfix/security-patch`、`chore/update-deps`；全小写连字符
6. 文件命名：项目文件 kebab-case、Python 模块 snake_case、React 组件/类 PascalCase、常量 SCREAMING_SNAKE_CASE
7. CI 放 `.github/workflows/*.yml`；Issue 模板 `.github/ISSUE_TEMPLATE/`、PR 模板 `.github/PULL_REQUEST_TEMPLATE.md`
8. 仓库 About 填描述 + Topics（最多 20 个）提升可发现性

### 提交（9 条）
1. **Conventional Commits**：`<type>(<scope>): <subject>`
2. type 全集：feat/fix/docs/style/refactor/perf/test/build/ci/chore/revert
3. subject 用祈使句（add/update/fix）、小写开头、不加句号、≤72 字符
4. 破坏性变更：footer `BREAKING CHANGE:` 或类型后 `!`（`feat!: ...`）
5. 一次提交一个逻辑变更，方便单独 revert
6. PR 标题遵循同一规范；描述：动机、改动、测试、截图、关联 Issue（`Fixes #12`）
7. PR 要小、CI 全绿再请求 review、merge 后删分支
8. Issue：先搜后开、一个 Issue 一件事、复现步骤/期望/实际/环境/截图
9. 单人/AI 项目推荐 **Squash merge**，main 历史整洁

### 版本（7 条）
1. **SemVer**：MAJOR.MINOR.PATCH；破坏→MAJOR、新功能→MINOR、修 bug→PATCH
2. `0.x` = 不稳定期；`1.0.0` 才代表首个稳定公开 API
3. git tag 加 `v` 前缀：`v1.0.0`
4. 预发布：`-alpha.1` → `-beta.2` → `-rc.1`
5. **已发布版本号不可复用/覆盖**
6. Release notes 按 Keep a Changelog 分类：Added/Changed/Deprecated/Removed/Fixed/Security
7. CHANGELOG 顶部常驻 `## [Unreleased]`，可由 conventional commits 自动生成

### 代码（5 条）
1. 变量/函数 camelCase（JS/TS）、snake_case（Python）；类/组件 PascalCase；常量 SCREAMING_SNAKE_CASE
2. 函数名用动词（getUser、validateInput），类名用名词（UserService）
3. 注释解释"为什么"而非"是什么"
4. 格式化：JS/TS 用 Prettier + ESLint；Python 用 Black；Go 用 gofmt
5. 统一 .editorconfig：UTF-8、LF、删行尾空格、文件尾空行

## 1. 项目/仓库命名规范

### 1.1 GitHub 硬性约束
- 允许字符：ASCII 字母、数字、`-`、`_`、`.`；最大 100 字符
- 禁止：空格（自动替换为 `-`）、`@`、`:`、`/`、`\`、中文等非 ASCII
- 不能以 `.git` 结尾、不能以 `.` 开头
- 唯一性不区分大小写（不能同时有 `Foo` 和 `foo`）
- 来源：[GitHub Quickstart](https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories)、[github-limits](https://github.com/dead-claudia/github-limits)

### 1.2 推荐 kebab-case 全小写
- `核心功能词` +（可选）`-修饰词`：`bottom-info-bar`、`todo-cli`
- 连字符 vs 下划线：JS 生态主流用连字符（URL/终端/搜索友好）；全小写避免 URL 大小写死链
- 命名前必查：GitHub 搜索重名 / `npm view <name>` 占用

### 1.3 命名习惯
- 库/产品/应用：名词；CLI：名词为主；组件/模块：名词+类型词；多语言版：主名+`-语言`
- 避免：通用名（util/demo/my-project）、流行项目名（react/vue/node）、版本年份、组织名、依赖名、全缩略词

### 1.4 npm 包名规范（官方校验器）
- 1~214 字符、全小写、可含连字符、不能以 `.`/`_` 开头、不能含空格、不能与 Node 核心模块重名（http/stream/node_modules 等）
- 作用域包 `@用户名/包名`；建议包名 = 仓库名

### 1.5 中文项目命名
- 用英文功能词（ant-design/element-plus/vue/vite 模式）；拼音只用于品牌专名（tuya/xiaomi）
- README 中英双语（英文名 + 中文介绍）是最佳组合

### 1.6 命名公式
```
<产品功能核心词>(-<修饰词>) → 全小写 kebab-case，2~3 个词
规则优先级：功能可懂 > 独特唯一 > 短 > 好念 > 可品牌化
```

## 2. 仓库设计与目录结构

- 标准目录：`src/`、`tests/`、`docs/`、`examples/`、`scripts/`、`.github/`、`dist/`（gitignore）
- 根目录文件规范位置：README（必备）、LICENSE（必备，缺=不能开源）、CHANGELOG（必备）、CONTRIBUTING/CODE_OF_CONDUCT/SECURITY/SUPPORT（分发必备）、AGENTS.md（给 AI 的新趋势）
- 文件名是约定俗成的大写精确名（README.md 不是 readme.md），GitHub 有"魔法识别"
- 分支：main 默认；`<type>/<描述>`；禁止连续连字符/尾连字符/空格/特殊字符
- 目录命名统一小写+连字符

## 3. 提交与 PR/Issue/Review 规范

- Conventional Commits 格式 `<type>[scope]: <description>`；11 个 type；BREAKING CHANGE 两种写法
- PR：标题遵循 CC；描述=动机/改动/测试/截图/Fixes #12；小而可评审；draft PR 用于早期反馈
- 合并策略：单人默认 Squash merge
- Issue：标题 ≤256 字符、动词开头、模板化、先搜后开、一件事一 Issue
- Code Review：标准=正确性→安全→可维护→性能→风格；及时回应；suggested change；nit: 小问题不阻塞；三档结论（Approve/Request changes/Comment）

## 4. 版本与发布

- SemVer 决策表：首个稳定=1.0.0；破坏→MAJOR；新功能→MINOR；修 bug→PATCH；预发布 alpha<beta<rc
- 已发布版本不可改不可覆盖
- tag 加 v 前缀；标注 tag 用于 Release
- Release notes 必填；Keep a Changelog 分类
- 自动化：release-please / semantic-release

## 5. 代码基础规范

- 注释解释"为什么"；禁止死代码；TODO 带责任人和日期
- 命名：变量名词表意、布尔 is/has/can、函数动词、类名词
- 格式化工具默认配置表：JS/TS Prettier（2 空格/单引号/分号/宽80）+ ESLint；Python Black（4 空格/宽88）；Go gofmt；Rust rustfmt
- Prettier 是 opinionated：接受默认，全项目一致比"最优"重要

## 6. 其他默认知识

- .gitignore 必配（github/gitignore 官方模板）；**密钥是红线**（推送即泄露，历史不可逆）
- .editorconfig 统一跨编辑器
- git 单人工作流：clone → branch → 改 → add 相关文件（不 add .）→ commit → push → PR → squash merge → 删分支
- 开源礼仪：先搜后问、读 CONTRIBUTING、对他人仓库 fork+PR、尊重维护者时间、用代码前读 LICENSE

## 7. 最容易踩的坑（12 条）

1. 仓库名带大写/下划线/空格 → URL 与实际名称不一致、死链
2. 没有 LICENSE → 法律上"保留所有权利"
3. 提交信息写 "update"/"fix bug" → 无法生成 CHANGELOG、无法追溯
4. 把 node_modules/.env/密钥/dist 提交进仓库 → 臃肿；密钥推送即泄露（必须轮换）
5. 直接 push main、没有分支/PR → 无审查、无法回滚
6. 版本号乱标 → 依赖方无法判断升级安全性
7. 项目名过于通用（util/demo/test）→ 搜索淹没、撞名
8. 中文项目用拼音命名 → 国际社区无法发音记忆
9. 没有 CHANGELOG / Release notes 空着 → 用户不敢升级
10. README 是占位符 → 仓库看起来"未完成/不可信"
11. 提交个人路径/账号名/IDE 配置 → 隐私红线（AI 分发项目 CI 应加零密钥零路径检查）
12. README 徽章用静态版本/死链 → 用动态 github/v/release、发布前实测 200

## 附：关键来源

GitHub Quickstart/GitHub Flow/Review 文档、github-limits、BC Gov/Fermi Lab 命名指南、npm validate-npm-package-name、Conventional Commits、SemVer、Keep a Changelog、freeCodeCamp case 对比、Prettier、oss-spec、PRG 仓库指南、rOpenSci Topics 指南
