# GitHub 开源仓库发布规范调研报告

> **用途**：本报告是「产品团队模式」（DSH agent preset + 插件）AI 工作流中 **06-release 技能**的发布检查清单依据。委托人：非技术背景个人开发者，通过 GitHub 公开分发 DeepSeek Harness（DSH）插件/预设产品。
>
> **使用方法**：发布流程执行时，AI 工作流按下文「一、总检查清单」逐项核验，有缺即补；「二～十」各节给出每个文件的规范内容与可执行示例，可直接照抄生成文件。优先级定义：**Must（必须）**＝达不到则项目"不算规范发布"，专业度受损或法律/安全风险；**Should（推荐）**＝达到则显著提升专业度与可维护性；**Could（可选）**＝锦上添花，按精力取舍。
>
> **权威来源**：GitHub 官方文档（docs.github.com）、opensource.guide、semver.org、conventionalcommits.org、keepachangelog.com、choosealicense.com、shields.io、Contributor Covenant 等（各节末尾标注）。

---

## 一、GitHub 发布规范总检查清单

### Must（必须）

| # | 检查项 | 对应文件/设置 | 完成标准 |
|---|--------|--------------|----------|
| M1 | 开源许可证 | 仓库根目录 `LICENSE` | 文件存在且 GitHub 自动识别（仓库页显示许可证徽章）；README 中许可证说明与之一致 |
| M2 | README | `README.md` | 包含：项目一句话简介、安装、使用、示例、文档链接、许可证、贡献指南链接 |
| M3 | 仓库可见性与元信息 | Settings → General | 仓库公开；description 用一句话说明"是什么+解决什么问题"；homepage 指向文档或项目页 |
| M4 | Topics 标签 | Settings → General → Topics | 至少 3–5 个标签（语言、技术栈、用途、平台），是搜索与 awesome 列表收录的入口 |
| M5 | 默认分支命名 | Settings → Branches | 默认分支为 `main`（非 master） |
| M6 | 版本号规范 | 全部版本输出 | 遵循 semver `MAJOR.MINOR.PATCH`；首版 `v1.0.0` 起，禁止跳号 |
| M7 | Git tag 与 Release 对应 | Git tag + Releases | 每次发版打一个 annotated tag（如 `v1.0.0`），并基于该 tag 创建 Release，tag/release 一一对应 |
| M8 | .gitignore | 仓库根目录 `.gitignore` | 排除依赖目录（node_modules 等）、密钥、本地数据、日志 |
| M9 | 零密钥零个人路径 | 全仓库扫描 | 无 API Key、token、本机绝对路径（如 /Users/xxx）入库；docs 中不含内部代号 |
| M10 | CHANGELOG | `CHANGELOG.md` | 每个版本一条记录，说明新增/修复/破坏性变更 |
| M11 | CI 构建测试 | `.github/workflows/ci.yml` | 至少一个 workflow：push/PR 时自动跑构建+测试；状态徽章放 README |
| M12 | Release notes | Releases 页面 | 每次发版填写说明：变更内容、破坏性变更、安装方式、资产 |

### Should（推荐）

| # | 检查项 | 对应文件/设置 | 完成标准 |
|---|--------|--------------|----------|
| S1 | 贡献指南 | `CONTRIBUTING.md` | 说明如何报 bug、如何提 PR、开发环境、提交信息规范 |
| S2 | 行为准则 | `CODE_OF_CONDUCT.md` | 采用 Contributor Covenant 2.1（可一键生成） |
| S3 | 安全策略 | `SECURITY.md` | 说明漏洞报告渠道（含 GitHub 私有漏洞报告），并开启 Private vulnerability reporting |
| S4 | 支持说明 | `SUPPORT.md` | 说明用户可用的支持渠道与 FAQ 入口 |
| S5 | 依赖安全 | `.github/dependabot.yml` + Settings | 开启 Dependabot version updates 与 security updates |
| S6 | 代码扫描 | CodeQL 或第三方 | 公开仓库免费开启 Code scanning（CodeQL），扫描结果进入 Security tab |
| S7 | Issue 模板 | `.github/ISSUE_TEMPLATE/` | bug 报告模板 + feature 请求模板 + 空 issue 控制 |
| S8 | PR 模板 | `.github/pull_request_template.md` | 说明改动内容、测试情况、关联 issue |
| S9 | 分支保护 | Settings → Branches | main 分支：要求 PR 合入、要求状态检查通过、禁止直接推送（单人项目也建议） |
| S10 | 提交信息规范 | 团队约定（可加 commitlint） | 采用 Conventional Commits 格式 |
| S11 | README 徽章 | README 顶部 | 许可证/版本/CI 状态徽章（shields.io） |
| S12 | 换行与文件规范 | `.gitattributes` + `.editorconfig` | 统一 LF 换行、文本编码 UTF-8、通用编辑器配置 |
| S13 | 讨论区 | Settings → General → Discussions | 开启 Discussions 作为问答/社区空间 |
| S14 | 标签体系 | Labels | 使用/补充 bug、enhancement、documentation、good first issue、help wanted 等 |

### Could（可选）

| # | 检查项 | 对应文件/设置 | 说明 |
|---|--------|--------------|------|
| C1 | 赞助按钮 | `.github/FUNDING.yml` | 配置 GitHub Sponsors / 其他平台，仓库页显示 Sponsor 按钮 |
| C2 | 引用文件 | `CITATION.cff` | 学术引用（"用了请引用"），GitHub 自动识别 |
| C3 | AGENTS.md | `AGENTS.md` | 给 AI 编程助手/Agent 的仓库级说明（2025 起 GitHub 原生支持，DSH 生态尤其契合） |
| C4 | 文档站 | GitHub Pages | README 之外可建文档站（docs/ 或独立站点） |
| C5 | Wiki / Projects | 仓库功能 | 长篇文档放 Wiki，路线图放 Projects |
| C6 | 自动发布工具 | semantic-release / release-please | 依据 Conventional Commits 自动升版本、写 CHANGELOG、打 tag、发 Release |
| C7 | 自动 Release notes | `.github/release.yml` | 用标签自动归类 release notes |
| C8 | 资产签名/校验和 | Release 资产 | 二进制包附 SHA256 checksum 与签名（sigstore/cosign） |
| C9 | 漏洞赏金 | Security → 漏洞赏金 | 面向安全研究者的激励（通常项目成熟后再开） |

---

## 二、仓库元信息设置

### 该做什么
仓库建好后，第一件事不是写代码，而是把"仓库名片"设置正确。GitHub 的搜索、Explore 推荐、awesome 列表收录、外部工具抓取，全部依赖这套元信息。

### 具体设置项
1. **可见性（Visibility）**：Settings → General → Danger Zone → Change visibility。分发产品必须 **Public**。注意：私有转公开后，历史提交中的任何密钥都会暴露，转公开前必须扫描历史。
2. **Description（描述）**：Settings → General。≤ 350 字符，一句话讲清"这是什么 + 解决什么问题 + 给谁用"。**禁止写内部代号/轮次号**（本项目铁律：只写用户视角语义描述，如 "An AI product-team workflow that turns your idea into a released product, powered by DeepSeek Harness"）。description 会出现在：仓库列表、搜索摘要、awesome 列表评审、SEO。
3. **Homepage / Website（主页）**：Settings → General。指向项目文档站（GitHub Pages）或发行页。没有独立站点可留空，README 已足够。
4. **Topics（标签）**：Settings → General → Topics，最多 20 个。规范点：
   - 第一个标签 = 主语言（`javascript` / `markdown`）；
   - 第二类 = 技术栈/平台（`deepseek-harness`、`dsh-plugin`、`dsh`、`agent-preset`、`ai-agents`、`workflow`）；
   - 第三类 = 用途（`product-management`、`dev-tools`）；
   - 标签会直接影响 GitHub 搜索排序与 Explore 收录。
5. **默认分支（Default branch）**：Settings → Branches。规范为 `main`。创建仓库时选择 `main`；旧仓库可在 Branches 设置中切换并删除 master。分支重命名后 GitHub 会自动重定向旧链接。
6. **归档（Archive）**：项目停止维护时，Settings → Danger Zone → Archive this repository。归档后仓库只读、不再接受 issue/PR，这是对用户的负责任交代（比悄悄消失专业）。个人项目多仓库时，归档是常见且体面的做法。
7. **仓库命名**：全小写短横线（kebab-case，如 `bottom-info-bar`、`virtual-product-team`），便于 URL 分享与包管理器解析。

### 为什么重要
- description/topics 是"被发现"的唯二入口，缺失 = 项目在 GitHub 生态里隐形，awesome 列表直接拒绝收录（评审标准明确要求 description）。
- 默认分支 main 是行业事实标准，几乎所有工具链（Actions、Pages、CI 模板）默认 main，保持一致避免踩坑。
- 公开仓库是分发前提；密钥清理是法律与安全底线。

### 规范要点
- 对外表述只用语义化版本号，不用内部代号（本产品已有此铁律，需固化进工作流）。
- 设置项允许一个仓库内由 AI 通过 `gh repo edit` 完成：`gh repo edit <owner/repo> --description "..." --homepage "..." --add-topic a --add-topic b`。

---

## 三、标准文件清单

GitHub 社区健康文件（Community health files）的官方支持清单：`README`、`LICENSE`、`CONTRIBUTING`、`CODE_OF_CONDUCT`、`SECURITY`、`SUPPORT`、issue/PR 模板。GitHub 的 **Community profile 页面（Insights → Community）** 会自动核验这些文件是否存在并给出完成度百分比，这是官方版的"规范检查工具"，发布前应把该项刷到接近 100%。

### 3.1 README.md —— Must
**内容规范**（GitHub 官方"关于 README" + 社区惯例，自上而下）：
1. 项目名 + 一句话定位（第一屏）
2. 徽章行（许可证 / 最新版本 / CI 状态 / 平台兼容）——可选但强烈推荐
3. 项目简介：解决什么问题、核心特性（3–5 条，配截图/GIF 最佳——对非技术用户，截图胜过千字）
4. 安装（Installation）：**从零开始、可复制粘贴**的步骤
5. 使用（Usage）：最小可用示例 + 常见操作
6. 文档链接（文档站 / docs 目录 / 更多示例）
7. 配置项说明（如有）
8. 贡献指南链接（CONTRIBUTING.md）
9. 许可证说明（LICENSE 链接）
10. 致谢/相关项目（可选）

**为什么重要**：README 是仓库的"首页"，是用户决定是否安装的第一信息源；GitHub 会自动渲染根目录 README 到仓库首页。对非技术用户，README 同时是说明书。

**规范要点**：中英双语可选（本项目已做 README + README.zh-CN.md）；安装命令必须实测可跑；README 中所有链接必须真实有效；禁止在 README 写开发过程记录（轮次/流水账）。

### 3.2 LICENSE —— Must（法律底线）
- **无 LICENSE = 默认"保留所有权利"**，任何人都无权合法使用/修改/分发你的代码。这是开源项目第一大坑。
- 选型（choosealicense.com 三问：是否允许商用？改代码是否必须开源？是否要专利授权？）：
  - **MIT**：最宽松，允许一切，仅要求保留版权声明。**个人开发者默认推荐**。
  - **Apache-2.0**：宽松 + 明确专利授权条款，适合会被嵌入商业产品的项目。
  - **GPL-3.0**：copyleft，衍生品必须开源，适合"防止被闭源"的诉求（但会劝退商业用户）。
- **规范要点**：文件命名 `LICENSE`（或 `LICENSE.md`/`LICENSE.txt`），放仓库根目录；内容从 choosealicense.com / GitHub 官方模板**原样复制完整文本**（含版权行 `Copyright (c) 2026 songoao25`）；GitHub 自动识别后在仓库页右上角显示许可证徽章；README 底部写明许可。改 LICENSE 需谨慎（改动只对新版本生效，老版本保持原许可），一次定对。

### 3.3 CHANGELOG.md —— Must（发版即需）
采用 **Keep a Changelog** 格式（keepachangelog.com/en/1.0.0/）：
- 结构：`# Changelog` → 每个版本一个小节 `## [1.0.0] - 2026-08-16` → 分类子列表。
- 分类：`### Added`（新增）/ `### Changed`（变更）/ `### Deprecated`（弃用）/ `### Removed`（移除）/ `### Fixed`（修复）/ `### Security`（安全）。
- 原则：**"给人类看的变化记录"**，只写用户有意义的内容（新增功能、行为变更、破坏性变更、修复），不写开发流水账；版本号与 semver 对应；最上面一节是"Unreleased"占位可选。
- 为什么重要：用户判断"该不该升级"的直接依据；也是 Release notes 的素材来源；能自动生成（semantic-release/keep-a-changelog 工具）。

### 3.4 CONTRIBUTING.md —— Should
内容：如何报告 bug（附 issue 模板链接）、如何提 PR（分支/提交信息规范/测试要求）、本地开发环境搭建、代码风格、测试命令。为什么重要：GitHub Community profile 检查项之一；让潜在贡献者"知道怎么下手"；本产品是 AI 工作流生成内容，写明"PR 需附测试结果"可约束质量。

### 3.5 CODE_OF_CONDUCT.md —— Should
用 **Contributor Covenant v2.1**（contributor-covenant.org，GitHub 仓库创建时可直接勾选生成）。为什么重要：社区健康信号，GitHub Community profile 检查项（未提供会显示警告）；对陌生人协作项目是必要的"社区规则"。

### 3.6 SECURITY.md —— Should
内容（GitHub 官方推荐结构）：
1. 支持的版本（Supported Versions 表格：哪些版本受安全支持）
2. 报告漏洞的渠道（Reporting a Vulnerability）——**首选 GitHub 私有漏洞报告（Private vulnerability reporting）**：`https://github.com/<owner>/<repo>/security/advisories/new`，其次 security@ 邮箱
3. 响应时间承诺（如"48 小时内确认，7 天内评估"）
4. 期望披露流程（协调披露，不公开裸漏洞）

为什么重要：安全研究人员第一眼看这里；有 SECURITY.md + 开启私有漏洞报告，GitHub 仓库页 Security 区会出现"Report a vulnerability"按钮，这是专业度硬信号。私有报告是免费功能，必须开启（Settings → Code security → Private vulnerability reporting）。

### 3.7 SUPPORT.md —— Should
内容：支持渠道（GitHub Discussions 优先、Issue 仅限 bug）、常见问题 FAQ 入口、不承诺支持的范围。为什么重要：减少无效 issue，管理用户预期。

### 3.8 .gitignore —— Must
- 内容（按技术栈）：`node_modules/`、`dist/`、`*.log`、`.DS_Store`、`*.local`、密钥/凭据文件（`.env`、`*.pem`）、本地数据目录（本项目：`~/.dsh/bottom-info-bar/` 下的运行数据、usage 记录等）。
- 模板来源：github/gitignore 仓库按语言提供官方模板。
- 为什么重要：防止依赖目录和密钥被提交；本产品场景中尤其要防**本机绝对路径、真实 API Key、运行时记录**入库（分发纪律：零密钥零个人路径）。

### 3.9 .gitattributes —— Should
统一仓库文本文件的换行符/编码，避免跨平台（Windows/macOS/Linux）diff 灾难。核心内容示例：
```
* text=auto
*.js text eol=lf
*.md text eol=lf
*.yml text eol=lf
*.png binary
*.jpg binary
```
配合 `.gitattributes` 让 GitHub 渲染差异更友好（如 `*.ipynb linguist-language=Python` 等可选项）。

### 3.10 .editorconfig —— Should/Could
editorconfig.org 标准，统一缩进/字符集/换行，主流编辑器自动读取。示例：
```
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
```

### 3.11 AUTHORS / CREDITS —— Could
贡献者名单（AUTHORS.md）或致谢（CREDITS.md），也可依赖 GitHub 的 Contributors 自动统计，非必需。

### 3.12 AGENTS.md —— Could（DSH 生态强烈建议）
2025 年起 GitHub 原生支持 `AGENTS.md`：仓库级给 AI 编程助手/Agent 的说明（项目结构、构建命令、约定、禁止事项）。对"产品团队模式"这种 AI 工作流产品，在仓库里放 AGENTS.md 既是示范（吃自己的狗粮），又能让任何 Agent 克隆后立刻懂怎么构建/测试/发布。规范要点：放在根目录或 docs/；内容 = 构建命令、测试命令、目录结构、发布流程摘要、禁止事项。

### 3.13 默认社区健康文件（组织级）—— 进阶
若未来建组织（organization），可在组织级 `.github` 仓库放一份健康文件，作为所有仓库的默认值（仓库内没有时自动生效）。单人项目可跳过。

---

## 四、版本管理规范

### 4.1 语义化版本 SemVer（semver.org）
格式 `MAJOR.MINOR.PATCH`：
- **MAJOR**：不兼容的 API 变更（破坏性变更）时 +1，并重置 MINOR/PATCH 为 0。**1.0.0 之前（0.x）任何小版本都可能含破坏性变更**，但产品化后应尽快进入 1.x 并严格遵守。
- **MINOR**：向后兼容的新功能时 +1，重置 PATCH 为 0。
- **PATCH**：向后兼容的 bug 修复时 +1。
- 预发布版本：`1.0.0-beta.1`、`1.0.0-rc.1`（按字典序排序，beta < rc < 正式）。
- 构建元数据：`1.0.0+build.123`（不参与优先级比较）。

**对 AI 工作流的要求**：发布前判定本次变更类型 → 计算新版本号 → 同步更新 README（若写了版本）、CHANGELOG、tag、Release。版本号一旦发布不可改写（改了就是破坏 semver 信任）。

### 4.2 Conventional Commits（conventionalcommits.org）
提交信息格式：
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```
- 类型：`feat`（新功能→MINOR）、`fix`（修复→PATCH）、`docs`、`style`、`refactor`、`perf`、`test`、`build`、`ci`、`chore`、`revert`。
- 破坏性变更：`feat!: ...` 或 footer 中写 `BREAKING CHANGE: <说明>` → MAJOR。
- 示例：`feat(release): 发布 v1.0.0 检查清单`、`fix: 修复安装脚本中文引号问题`、`docs(readme): 补充安装说明`。

**为什么重要**：① 人类可读的历史；② 机器可解析 → semantic-release / release-please 能自动算版本号、自动生成 CHANGELOG 与 Release notes；③ 本产品由 AI 提交，AI 天然擅长写规范提交，应把格式写进工作流约束。单人项目也建议遵守（成本≈0，收益=自动发布流水线）。

### 4.3 Git tag 规范
- 打 **annotated tag**（`git tag -a v1.0.0 -m "v1.0.0: 首次正式发布"`）而非 lightweight tag（`git tag v1.0.0`）：annotated 带打签人、时间、说明，是"发布事件"的正规记录。
- 命名惯例：`v` + semver，如 `v1.0.0`（行业事实标准，GitHub Release 页自动显示 "v1.0.0"）。
- tag 必须打在**发布对应的那个提交**上（发布提交 = CHANGELOG 更新 + 版本号更新已合入的那个 commit）。
- 一个 tag 一个 Release；tag 推送后再打补丁版本（v1.0.1），不要原地改 v1.0.0 的 tag（除非是发布事故回滚）。
- 命令：`git push origin v1.0.0`（单独推送 tag）；`gh release create v1.0.0 --generate-notes` 一步完成 tag+Release。

### 4.4 Release 创建规范（GitHub Releases）
Release = tag + 发布说明 + 资产，是用户下载与自动更新的入口。创建规范：
1. **从 tag 创建**（或创建 tag 时同步建 Release）；区分 **Latest release**（最新正式版）与 **Pre-release**（预发布，标记后不会自动推荐给用户）。
2. **Release notes 内容**（GitHub 官方建议）：
   - 标题：版本号 + 简短主题（如 `v1.0.0 — 首个正式发布`）
   - 一句话摘要（本次发布解决什么）
   - **What's Changed / 变更列表**：新增、修复、破坏性变更（Breaking changes 单独醒目列出，并给出迁移说明）
   - 安装/升级方法（一行命令）
   - 资产清单（源码包自动生成 zip/tar.gz；另有二进制/安装脚本则附上）
   - 贡献者致谢（"首次贡献者"列表，GitHub 自动生成）
3. 可用 `--generate-notes` 自动生成，再用 `.github/release.yml` 配置分类（见 4.5）。
4. 规范要点：**Release notes 与 CHANGELOG 保持一致**；破坏性变更必须写清"升级会破坏什么、怎么迁移"。

### 4.5 自动化（可选但强烈推荐）
- **GitHub 自动生成 Release notes**：`gh release create v1.0.0 --generate-notes`，配合 `.github/release.yml` 按标签归类（示例）：
```yaml
changelog:
  categories:
    - title: "🚀 新功能"
      labels: ["enhancement", "feat"]
    - title: "🐛 修复"
      labels: ["bug", "fix"]
    - title: "📝 文档"
      labels: ["documentation"]
    - title: "其他变更"
      labels: ["*"]
```
- **semantic-release / release-please**：依据 Conventional Commits 自动计算版本、写 CHANGELOG、打 tag、发 Release、发布 npm。对"产品团队模式"这类 AI 工作流，发布环节交给 AI 直接执行 `gh release create` 已足够，工具化可作为二期。

---

## 五、CI/CD（GitHub Actions）

### 5.1 最小必须：一条 CI 流水线
文件：`.github/workflows/ci.yml`。对 DSH 插件/预设类 JS 项目，标准内容：
```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - run: npm test
      - run: npm run lint   # 如有
```
**规范要点**：触发时机 = 对 main 的 push + 所有 PR（PR 检查是分支保护的前提）；`npm ci`（不是 install）保证可复现；缓存依赖加速；构建→测试→lint 三段齐全。

### 5.2 进阶
- **多平台矩阵**：`runs-on: [ubuntu-latest, macos-latest, windows-latest]` 矩阵测试（本项目 install.sh 面向 macOS/Windows，值得做）。
- **发布流水线**：`on: push: tags: ['v*']` 触发 → 构建 → 创建 Release（`softprops/action-gh-release@v2` 或 `gh release create`），可加 `permissions: contents: write` 最小权限。
- **CI 徽章**：README 顶部放 workflow 状态徽章，URL 格式 `https://github.com/<owner>/<repo>/actions/workflows/ci.yml/badge.svg`。

### 5.3 Actions 安全最佳实践（GitHub 官方"安全加固"文档）
1. **固定 action 版本**：用 tag（`actions/checkout@v4`）起步；对第三方 action 最好 **pin 到 commit SHA**（防供应链投毒），有自动化工具（Dependabot 可自动升 SHA）。
2. **最小权限**：workflow `permissions:` 只给需要的（默认 `contents: read`），发布任务才给 `write`。
3. **不要泄露 secrets**：密钥放 Settings → Secrets（Actions secrets），引用 `${{ secrets.X }}`；严禁硬编码进 yml 或 echo 到日志；使用 secret 时用 `env:` 传入。
4. **第三方 action 审查**：只用知名/官方 action；来源不明的 `.github/workflows` 模板不要盲复制。
5. **防止 PR 提权**：pull_request 事件中不要运行带 secrets 的步骤（用 `pull_request_target` 需格外小心——非技术用户场景建议直接不用它）。

---

## 六、安全

### 6.1 Dependabot（依赖安全，Should/Must 有依赖即开）
- **Version updates**：`.github/dependabot.yml` 开启自动升版本（示例）：
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```
- **Security updates**：Dependabot alerts 免费（公开仓库），检测到有漏洞的依赖自动开 PR 修复。开启位置：Settings → Code security → Dependabot。
- **规范要点**：npm 生态与 github-actions 两个 ecosystem 都配；merge 前让 CI 跑一遍（Dependabot PR 会触发 CI）。

### 6.2 Code scanning（SAST，公开仓库免费）
- **CodeQL**：Settings → Code security → Code scanning，选择 CodeQL 默认配置（或加 `.github/workflows/codeql.yml`）。扫描结果在 Security tab，进入分支保护的状态检查可选。
- 为什么重要：公开代码会被所有人审计，主动扫描能发现并修复明显问题；对 JS 项目 CodeQL 的常见漏洞检测（XSS、注入、表达式注入）很有效。

### 6.3 Secret scanning（密钥扫描）
- 公开仓库免费启用（Settings → Code security → Secret scanning）；GitHub 自动检测已知服务商密钥格式（含 OpenAI/DeepSeek 等 API Key 模式）。
- **规范要点**：一旦告警=立即轮换密钥（删提交不够，密钥已暴露）；发布前自检历史（`git log -p` 搜 `sk-`、`api_key`、`BEGIN PRIVATE KEY`）。

### 6.4 安全策略与披露
- `SECURITY.md`（见 3.6）+ 开启 **Private vulnerability reporting**（Settings → Code security）。这是协调披露的标准通道，比"让用户发 issue 裸报漏洞"专业得多。
- 进阶：Security advisories（发布漏洞公告，CVE 流程）；漏洞赏金（一般大项目才开）。

### 6.5 供应链（Could）
- 发布资产签名（sigstore/cosign）、SBOM 生成、release 资产校验和（SHA256）。个人项目可从"assets 附 checksum"做起。

---

## 七、社区健康

### 7.1 Issue 模板（Should）
目录 `.github/ISSUE_TEMPLATE/`，用 YAML form 格式（GitHub 推荐）：
- `bug_report.yml`：标题、复现步骤、期望行为、实际行为、环境（OS/版本）、日志
- `feature_request.yml`：需求描述、使用场景、替代方案
- `config.yml`（放同目录）：
```yaml
blank_issues_enabled: false
contact_links:
  - name: 使用问题
    url: https://github.com/<owner>/<repo>/discussions
    about: 提问请先到 Discussions
```
为什么重要：把无效 issue 挡在门外，bug 报告信息完整可复现；Community profile 检查项。

### 7.2 PR 模板（Should）
`.github/pull_request_template.md`：改动摘要、变更类型（feat/fix/docs…）、测试情况、关联 issue（`Closes #N`）、截图（UI 改动）。

### 7.3 Discussion / Wiki / Projects（Should/Could）
- **Discussions**（Settings → General 开启）：问答、想法、公告的社区空间；可设为默认"提问入口"，减轻 issue 噪音。
- **Wiki**：长篇教程/FAQ 放 Wiki（不占代码仓库）。
- **Projects**：路线图/看板管理（单人可用；"产品团队模式"的发布流程可映射成 Project 看板，加分项）。

### 7.4 分支保护（Should，尤其有协作者或开启自动发布后）
Settings → Branches → 对 `main` 添加规则，建议组合：
- ☑ Require a pull request before merging（要求 PR 合入）+ 至少 1 个 reviewer（单人可降为 0）
- ☑ Require status checks to pass（勾选 CI workflow 检查）
- ☑ Do not allow bypassing the above settings
- ☑ Require linear history（可选，历史整洁）
- ☑ Block force pushes（防强推覆盖）
- 对单人项目：最轻量也建议"禁止直接 push main + 状态检查通过"，配合 PR 模板形成最小团队流程——这也正好是本产品"虚拟团队"理念的落地（AI 提 PR、AI 审核）。

### 7.5 CODEOWNERS（Should/多人，Could/单人）
`.github/CODEOWNERS`：指定路径的代码责任人，PR 自动请求其 review。示例：
```
# 默认所有文件归仓库所有者
* @songoao25
# docs 目录归属
/docs/ @songoao25
```
单人项目意义有限；有协作者或保护规则要求 review 时必备。语法：`路径 + 空格 + @owner`，`*` 为默认规则。

### 7.6 标签体系（Should）
GitHub 默认提供约 10 个标签（bug、enhancement、documentation、good first issue、help wanted、question 等），建议补齐/规范：
- `bug` / `enhancement` / `documentation`：issue 分类
- `good first issue`：新人入口（GitHub 首页"for you"推荐依据）
- `help wanted`：求协作
- 本产品可加 `release`、`plugin`、`preset` 等业务标签，配合 release.yml 自动归类 release notes。
- 规范要点：用 `gh label list/create` 批量管理，标签名全小写短横线。

---

## 八、分发与收录

### 8.1 Releases 资产
- **源码包自动生成**：每个 tag 的 Release 自动附带 `Source code (zip)` / `Source code (tar.gz)`，无需手动处理。
- **业务资产**：本项目应附 `install.sh` / `uninstall.sh`（源码仓库内已有）与使用说明；若做打包发布（npm 包、bundle），Release 附对应压缩包。
- **校验与签名（Should 进阶）**：附 `SHA256SUMS`（生成：`shasum -a 256 <file> > SHA256SUMS`）；对安装脚本类资产尤其值得，防篡改。
- 规范要点：发布说明里写清"下载哪个文件、怎么安装"，非技术用户看不懂 tarball 术语时给出直接命令。

### 8.2 被搜索与 awesome 列表收录
- **搜索收录**：靠 description + topics（见第二节）。描述模板："<一句话是什么>。<技术栈>。<适用平台>。" 关键词自然分布。
- **awesome 列表收录**（如 awesome-deepseek、awesome-dsh-plugin）：一般评审要求（以 sindresorhus/awesome 贡献规范为参考）：
  - 明确的 description + 主页
  - 开源许可证（MIT 类）✅
  - README 完整、有徽章
  - 活跃维护（近期有提交/Release）
  - 与列表主题契合、无重复
  - 通常要求"先提 issue 再 PR"或按列表的 CONTRIBUTING 提交
- **生态收录**：本项目已打 DSH 生态标签（deepseek-harness、dsh-plugin 等），持续向 awesome-dsh 类列表提交，是对外曝光的主要渠道。

### 8.3 版本间的升级路径
正式发布后，破坏性变更必须在 CHANGELOG 与 Release notes 中给出"从 v1.0.0 升级到 v1.1.0 怎么做"；对预设/插件类产品，升级说明尤其重要（用户可能已经用旧版跑过数据）。

---

## 九、其他细节

### 9.1 README 徽章（Should）
放在 README 第一屏标题下方，3–5 个即可（太多显廉价）。常用（shields.io 动态徽章）：
```markdown
[![License](https://img.shields.io/github/license/songoao25/virtual-product-team)](LICENSE)
[![Release](https://img.shields.io/github/v/release/songoao25/virtual-product-team)](https://github.com/songoao25/virtual-product-team/releases)
[![CI](https://github.com/songoao25/virtual-product-team/actions/workflows/ci.yml/badge.svg)](https://github.com/songoao25/virtual-product-team/actions)
[![Stars](https://img.shields.io/github/stars/songoao25/virtual-product-team)](https://github.com/songoao25/virtual-product-team)
```
- 推荐组合：License + Release（版本）+ CI 状态 + Stars/Downloads。
- 2025 年起 GitHub 提供**官方仓库徽章**（Settings → General → Badges：stars/forks/license/PR 等，可复制 Markdown），无需第三方也可，风格统一。
- 规范要点：徽章指向必须与仓库真实状态一致（版本徽章显示 v1.0.0 时 tag 必须真实存在）——"徽章与事实不符"是常见专业度减分项。

### 9.2 GitHub Pages（Could）
- `docs/` 目录或 gh-pages 分支放静态文档站；Settings → Pages 选择来源即可上线 `https://<owner>.github.io/<repo>/`。
- 本产品适合：README 快速上手 + Pages 详版文档（安装/配置/FAQ）。
- 注意：Pages 内容也属于公开分发，同样遵守零密钥零个人路径。

### 9.3 FUNDING.yml（Could）
`.github/FUNDING.yml` 配置后仓库页自动显示 Sponsor 按钮。示例：
```yaml
github: songoao25
# custom: ["https://afdian.com/..."]  # 其他平台
```
规范要点：没开通 GitHub Sponsors 时可留空或配其他平台（爱发电/Buy Me a Coffee）；没有就打 `#` 注释掉，不要放无效链接。

### 9.4 CITATION.cff（Could）
让"用了请引用"可被 GitHub 自动识别（仓库页 About 区显示 "Cite this repository"）。示例：
```yaml
cff-version: 1.2.0
message: "如果您使用了本项目，请按如下方式引用。"
authors:
  - family-names: "songoao25"
title: "Virtual Product Team"
version: "1.0.0"
date-released: "2026-08-16"
url: "https://github.com/songoao25/virtual-product-team"
```
每次发版需同步 version/date-released（可在发布流水线里自动更新）。

### 9.5 .github 目录结构总结
```
.github/
├── workflows/
│   ├── ci.yml              # 构建/测试/lint
│   └── codeql.yml          # 代码扫描（可选）
├── ISSUE_TEMPLATE/
│   ├── bug_report.yml
│   ├── feature_request.yml
│   └── config.yml
├── pull_request_template.md
├── dependabot.yml
├── CODEOWNERS              # 可选
├── FUNDING.yml             # 可选
└── release.yml             # 自动 release notes 分类（可选）
```
GitHub 约定：`.github` 目录里的社区文件优先级最高（组织级 .github 仓库兜底）。

### 9.6 仓库级 AI 说明（AGENTS.md，Could，见 3.12）
与 .github 并列放根目录 `AGENTS.md`，内容：项目结构、构建/测试命令、发布流程（引用本清单）、禁止事项（不改出厂安装、不删功能、不写内部代号）。**对 AI 工作流产品，这是把"规范发布"内化成仓库自身能力的闭环**。

---

## 十、个人开发者最容易忽略、但影响专业度的规范项（Top 8）

1. **LICENSE 缺失（第一大坑）**：无 LICENSE = 法律上"保留所有权利"，用户不敢用、awesome 列表不收。发布前第一件事放 MIT LICENSE 并确认 GitHub 识别。本项目已做，但需固化到工作流首步检查。

2. **README 有介绍、无"从零安装/使用"**：写了"这是什么"却没写"怎么跑起来"。非技术用户的判断标准就是"照 README 能否 5 分钟内装上用起来"。每一条安装命令必须实测过（本项目安装脚本已实测，README 与 install.sh 必须同步更新）。

3. **description 为空或写内部代号**：仓库列表/搜索摘要一片空白或出现 V23/第十六轮 这类外人看不懂的代号——专业度直接归零，且 awesome 列表拒绝收录。对外只允许语义化描述 + 语义化版本号（本项目铁律）。

4. **未设置 topics**：语言、平台、用途标签缺失，搜索与 Explore 不收录。至少 3–5 个（deepseek-harness、dsh-plugin、agent-preset、ai-agents…）。

5. **tag 与 Release 不对应 / 版本号乱跳**：打了 tag 不发 Release，或 Release 指向旧提交，或 MAJOR/MINOR/PATCH 语义混乱（1.0.0 → 1.2 → 2.0.1 无规则）。用户与自动更新工具都依赖 tag/Release 的一致性，发布流水线必须保证"版本号→CHANGELOG→tag→Release"四者同步。

6. **提交信息随意**：`update`、`fix something`、`提交` 这类信息让历史不可读，也毁掉自动 changelog/release notes 的可能。改用 Conventional Commits 后，发布工具链自动可用（成本≈0）。

7. **密钥/个人路径入库**：`.env`、真实 API Key、`/Users/songsong/...` 绝对路径、运行时数据入库。即使仓库私有也不该有；转公开前必须全历史扫描。本项目分发纪律已要求零密钥零个人路径，发布环节应加一次 `git log -p | grep` 自检。

8. **没有 SECURITY.md / 未开私有漏洞报告**：安全研究人员找不到披露入口。补一个 SECURITY.md + 开启 Private vulnerability reporting（免费、一键），仓库页出现 "Report a vulnerability" 按钮，是低成本高信号的专业度动作。

> 补充观察（本产品特化）：AI 工作流生成的仓库最容易犯 #2/#3/#6——因为它"知道太多内部过程"，而用户只需要用户视角的文档。发布检查清单的第一条原则就是：**所有对外内容只写用户能理解的东西**。

---

## 附：给 AI 工作流的落地建议（06-release 技能集成要点）

1. **发布前置检查**（对现有仓库）：对照第一节 Must 表逐项核验，输出"已满足/缺失"表格，缺失项自动补齐（生成文件 → 本地测试 → 提交）。
2. **版本决策**：收集本迭代 Conventional Commits 提交 → 判定 major/minor/patch → 生成新版本号。
3. **四件套同步更新**：版本号 + CHANGELOG + tag + Release notes 在同一次发布提交内完成（用 `gh release create vX.Y.Z --generate-notes` 兜底）。
4. **发布后自检**：`gh repo view` 确认 description/topics/LICENSE 识别；`gh release view` 确认资产与 notes；README 徽章指向新版本。
5. **安全自检命令**：`git log -p --all | grep -iE 'sk-[a-z0-9]|api[_-]?key|BEGIN (RSA|OPENSSH|EC) PRIVATE'` 确认无密钥历史。
6. **可一键执行的命令速查**：`gh repo edit`（元信息）、`gh label create`（标签）、`gh release create`（发布）、`gh workflow run`（CI）。

---

## 参考来源

- GitHub Docs — About READMEs: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes
- GitHub Docs — Community health files: https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file
- GitHub Docs — Viewing community profile: https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/viewing-your-community-profile
- GitHub Docs — About releases: https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases
- GitHub Docs — Managing releases: https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository
- GitHub Docs — Automatically generated release notes: https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes
- GitHub Docs — Classifying your repository with topics: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics
- GitHub Docs — About branches（默认分支）: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches
- GitHub Docs — About protected branches: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
- GitHub Docs — About issue and PR templates: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates
- GitHub Docs — About CODEOWNERS: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
- GitHub Docs — Privately reporting a security vulnerability: https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability
- GitHub Docs — Configuring Dependabot version updates: https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/configuring-dependabot-version-updates
- GitHub Docs — About the dependabot.yml file: https://docs.github.com/en/code-security/concepts/supply-chain-security/about-the-dependabot-yml-file
- GitHub Docs — Security hardening for GitHub Actions: https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions
- GitHub Docs — Ignoring files: https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files
- GitHub Docs — Displaying a sponsor button: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/displaying-a-sponsor-button-in-your-repository
- GitHub Docs — About citation files: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-citation-files
- GitHub Docs — GitHub Pages quickstart: https://docs.github.com/en/pages/quickstart
- GitHub Docs — About archiving repositories: https://docs.github.com/en/repositories/archiving-a-github-repository/about-archiving-repositories
- GitHub Docs — Copilot 自定义说明（含 AGENTS.md）: https://docs.github.com/en/copilot/reference/customization-cheat-sheet
- GitHub 官方开源指南 opensource.guide: https://opensource.guide
- Semantic Versioning: https://semver.org
- Conventional Commits: https://www.conventionalcommits.org/en/v1.0.0/
- Keep a Changelog: https://keepachangelog.com/en/1.0.0/
- Choose a License: https://choosealicense.com ；GitHub Blog 选型文: https://github.blog/open-source/choosing-an-open-source-license/
- Contributor Covenant: https://www.contributor-covenant.org
- Shields.io 徽章: https://shields.io
- EditorConfig: https://editorconfig.org ；gitattributes 文档: https://git-scm.com/docs/gitattributes ；git 打标签: https://git-scm.com/book/en/v2/Git-Basics-Tagging
- github/gitignore 官方模板: https://github.com/github/gitignore
- awesome 列表贡献规范（sindresorhus/awesome）: https://github.com/sindresorhus/awesome
