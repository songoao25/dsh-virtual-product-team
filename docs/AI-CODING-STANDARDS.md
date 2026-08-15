# 开发者通用编码规范、开发潜规则与基础知识调研报告

**调研主题**：AI 驱动开发场景下，AI 扮演工程师/QA/架构师等职务时应遵守的全部"工程默认规范"
**调研方式**：网络调研，权威来源为主（Google Style Guides、Airbnb JavaScript Style Guide、PEP 8、Clean Code、12-Factor App、Conventional Commits、SemVer、SOLID、OWASP Top 10、Martin Fowler Refactoring 等）
**适用对象**：虚拟产品团队模式的 AI 工作流（agent preset + 各阶段 skill）

---

## 一、AI 编码默认规范铁律清单（15 条）

> 以下 15 条是 AI 写代码时的默认基线，逐条执行，无需用户提醒。来源与展开见后文各章节。

1. **命名有意义**：变量/函数/类名表达意图，禁止 `data`、`temp`、`foo`、拼音缩写；布尔变量用 `is/has/can` 开头，函数用动词开头，集合用复数。
2. **函数单一职责**：一个函数只做一件事；超过约 20 行或出现 3 层以上嵌套即拆分；函数参数不超过 3 个。
3. **注释只解释"为什么"**：不写"这段代码是做什么"的废话注释（代码应自文档化）；只写设计决策、权衡、坑、非显然的业务规则。
4. **不硬编码**：密钥、URL、端口、业务常数（如折扣率、超时时间）一律进配置/常量；**密钥绝不进代码和仓库**。
5. **错误必须显式处理**：不吞异常（`except: pass` / 空 `catch`）、不裸 `catch (e) {}`；错误信息带上下文，可诊断。
6. **生成物不入库**：`node_modules/`、`build/`、`dist/`、`__pycache__/`、`.env`、编辑器临时文件进 `.gitignore`，提交前自查。
7. **提交信息规范**：用 Conventional Commits 格式（`feat/fix/docs/refactor/...`），描述"**为什么**改"而非"改了什么"。
8. **小步提交、小 PR**：一次提交只做一件事；PR 小而可评审（一个功能/一个修复），不做巨型改动。
9. **不破坏向后兼容**：改公共 API/接口/行为时考虑现有调用方；破坏性变更必须走语义化版本号的 `major` 版本，并给出迁移说明。
10. **安全默认**：SQL 一律参数化、输出一律转义（防 XSS）、所有外部输入先验证；依赖用 `npm audit`/`dependabot` 定期审计。
11. **可读性优先于聪明**：清晰代码 > 炫技代码；消灭魔法数字、深嵌套、复制粘贴的重复代码。
12. **有测试才交付**：核心逻辑必须有单元测试；修 bug 先写能复现该 bug 的回归测试；测试命名描述"行为/期望"而非"实现细节"。
13. **模块化与单一职责**：一个文件/模块只做一类事，遵循语言惯用目录结构（`src/`、`tests/`、`docs/` 等）。
14. **配置环境化**：环境差异（开发/生产、不同 URL）用环境变量（12-Factor 第 3 条）；提交 `.env.example`，不提交真实 `.env`。
15. **不提前优化**：先正确、可读、可测，再优化；只优化被测量证明的热点；但避免明显低效（循环内查库、无谓的 O(n²)）。

---

## 二、编码规范（重点）

### 2.1 命名规范全表

命名是代码可读性的第一来源。各语言官方/社区风格指南高度一致，核心差异是**大小写风格**。

| 风格 | 形态 | 典型用途 | 语言惯例 |
|---|---|---|---|
| **camelCase**（小驼峰） | `userName`, `getTotal()` | 变量、函数、方法 | JavaScript/TypeScript、Java、Go（非导出）、Kotlin、Swift |
| **PascalCase**（大驼峰） | `UserProfile`, `HttpClient` | 类、类型、接口、枚举、组件 | 几乎全部语言；JS 组件、Java/TS 类、Python 类、Go 导出标识符 |
| **snake_case** | `user_name`, `get_total()` | 变量、函数、模块文件 | Python（PEP 8）、Ruby、Rust；JS/TS 中仅用于常量（见下） |
| **kebab-case** | `my-component`, `style-guide.md` | 文件名、URL、CSS 类名、HTML 属性 | Web 前端文件、CSS、HTML；Go/Rust 文件名 |
| **UPPER_SNAKE_CASE** | `MAX_RETRY`, `API_BASE_URL` | 常量（编译期不变的真常量） | 各语言通用；JS 中仅对真正的常量，日常配置变量仍用 camelCase |

**各语言细则**（依据 PEP 8、Airbnb JS、Google Style Guides）：

- **Python（PEP 8）**：变量/函数 `snake_case`；类 `PascalCase`；模块文件 `snake_case.py`；常量 `UPPER_SNAKE_CASE`；私有成员前缀 `_`；特殊方法双下划线。
- **JavaScript/TypeScript（Airbnb/Google）**：变量/函数 `camelCase`；类/组件 `PascalCase`；真常量 `UPPER_SNAKE_CASE`；文件推荐 `kebab-case`（React 组件文件可用 `PascalCase.tsx`，团队统一即可）。
- **Java（Google Java Style）**：变量/方法 `camelCase`；类/接口 `PascalCase`；常量 `UPPER_SNAKE_CASE`；**文件名必须等于公共类名**（`UserController.java`）。
- **Go**：导出标识符大写开头（即 `PascalCase`），未导出 `camelCase`；包名小写单词；文件 `snake_case.go`。
- **Rust**：变量/函数 `snake_case`；类型 `PascalCase`；常量 `UPPER_SNAKE_CASE`。

**命名质量规则**（Clean Code）：
- 名字要**能读出声、能表达意图**：`elapsedTimeInDays` > `d`；`totalPrice` > `price`。
- 布尔变量：`isValid`、`hasPermission`、`canRetry`。
- 函数名以动词开头：`getUser`、`validateInput`、`fetchOrders`、`sendEmail`。
- 集合用复数或明确后缀：`users`、`orderList`。
- 避免误导：`userList` 里装的不是 list 就别叫 list；避免 `accountData` 这类"是什么都行"的名字。
- **不缩写、不拼音**：`usrNm`、`yonghu` 都是反模式；宁可长一点。

### 2.2 代码风格（缩进、行宽、引号、分号）

风格之争没有赢家，**统一 + 自动化**才是重点。主流默认配置（Prettier/ESLint/PEP 8）如下：

| 项目 | Python（PEP 8） | JavaScript/TS（Airbnb） | Prettier 默认 | Google Java |
|---|---|---|---|---|
| 缩进 | 4 空格 | 2 空格 | 2 空格 | 2 空格 |
| 行宽 | 79（可选 99） | 100 | 80 | 100 |
| 引号 | 单引号为主 | 单引号 | 双引号 | 双引号 |
| 分号 | 无（语言不需要） | 必须 | 有 | 有 |

**落地建议（AI 必须执行）**：
- 新建项目**第一件事**配置格式化工具：JS/TS 用 `Prettier + ESLint`（`.prettierrc`、`.eslintrc`），Python 用 `black + ruff` 或 `flake8`，并提交 `.editorconfig` 统一编辑器行为。
- 风格细节（引号单双、分号有无）**交给工具**，不要手写、不要争论。
- CI 中跑 lint/格式检查，不通过不合并（`lint-staged + husky` 可在提交时自动格式化）。
- AI 生成代码后**必须运行格式化器**再交付，保证与项目风格一致。

### 2.3 注释规范

Clean Code 的核心观点：**注释是弥补代码表达力不足的补救措施**，好代码本身就是最好的文档。

**该写注释的场景（解释"为什么"）**：
- 设计决策与权衡："这里用缓存是因为上游 API 限流，缓存 60 秒"。
- 非显然的业务规则："折扣只对首次购买用户生效（业务规定，勿改）"。
- 坑与陷阱："`offset` 从 0 开始，前端传 1 需减 1"；"不要用 `==`，此处会隐式转换"。
- 复杂算法的意图："用二分查找是因为数据已排序且量级百万"。
- `TODO/FIXME` 标注遗留事项（带责任人/日期更好）。

**不该写注释的场景**：
- 重复代码的废话：`// 设置用户名称` 放在 `setUserName(name)` 上面——这是坏味道。
- 注释掉的死代码：**直接删除**，git 历史里有，留着只会误导。
- 可执行代码能表达的信息。

**公共 API 必须写文档**：Python 用 docstring、JS/TS 用 JSDoc（`@param`/`@returns`），说明输入输出与边界，AI 生成的库/接口代码默认带齐。

### 2.4 代码组织（函数长度、模块划分、DRY、SRP）

- **函数要多短**：Clean Code 主张函数应"小到不能再小"（理想 10–20 行内、单一缩进层级）；实用基准：**超过 30 行或超过 3 层嵌套就该拆分**。一个函数 = 一个抽象层级（不要在细节中混入另一个抽象层级的操作）。
- **单一职责原则（SRP）**：一个类/模块/函数**只有一个改变的理由**。例如"订单服务"不要既管订单又管发送邮件又管生成报表。
- **DRY（Don't Repeat Yourself）**：同一逻辑出现 **3 次（Rule of Three）** 就该抽取复用；2 次先观察，避免过早抽象。抽取时注意：复制代码的变体（只差一个参数）比直接粘贴更该提取。
- **模块划分**：按**业务职责/领域**分目录（`src/orders/`、`src/users/`），不是按类型堆砌（`utils/`、`helpers/` 是"垃圾桶"，少用）；依赖方向清晰（高层不依赖底层细节）；文件职责单一。
- **函数参数**：不超过 3 个；参数多时打包成对象（`sendEmail({to, subject, body, retries})`）。
- **命名空间/包名**：简短、小写、有领域含义，避免 `misc`、`common`、`utils` 塞满杂项。

---

## 三、工程最佳实践

### 3.1 错误处理规范

- **fail fast（快速失败）**：参数非法、前置条件不满足时尽早抛错，不要让错误状态悄悄往下流。
- **不吞异常**：空 `except: pass` / 空 `catch {}` 是重罪——错误被吞掉后故障无法诊断，宁可让程序崩溃也不要静默。
- **错误信息可诊断**：包含"什么操作、哪个输入、什么环境"，如 `Failed to connect to DB (host=localhost:5432): timeout after 5s`。
- **区分业务错误与系统错误**：用户输入错误返回友好提示（4xx），系统故障抛异常/记录（5xx）。
- **外部依赖（网络/DB/API）必须超时 + 重试**：设置超时上限，重试用指数退避（1s→2s→4s…），避免雪崩。
- **失败路径与成功路径同等重要**：AI 写代码时最容易漏的恰恰是错误分支——**每个错误分支都要有明确行为**（返回默认值/抛错/记录日志，三选一并说明理由）。

### 3.2 日志规范

- **结构化日志**：JSON 格式（`{"level":"error","event":"db.timeout","db":"orders","duration_ms":5200}`），便于机器检索，不要只有人读的散文。
- **级别语义**：`debug`（细节排查）、`info`（正常事件：启动/完成）、`warn`（可疑但不致命）、`error`（故障）。
- **记录上下文，不记录机密**：日志带 request id、用户 id、操作名；**绝不记录密码、token、密钥、完整个人信息**（OWASP A09：日志与监控失败）。
- **12-Factor 第 11 条：日志是事件流**——应用把日志写到 stdout，由运行环境收集；应用自己不要管理日志文件/轮转。
- 关键入口（请求开始/结束、支付、删除操作）必有日志，方便审计与排障。

### 3.3 配置管理（环境变量 vs 硬编码）

- **12-Factor 第 3 条**：配置（URL、凭据、开关）与代码分离，通过**环境变量**注入；同一份代码可以部署到开发/测试/生产。
- **绝不硬编码**：`db_password = "123456"` 写在代码里 = 安全事故 + 无法环境化。密钥进代码仓库即泄露（git 历史永久保留）。
- **本地开发**：`.env` 文件（已 gitignore）+ 提交 `.env.example`（带示例值，不含真实密钥）。
- **生产密钥**：用部署平台 secrets 或密钥管理服务；CI 用 CI secrets。
- 配置提供**默认值**（开发环境友好）并在 README 文档化；启动时对缺失的必填配置**快速失败**。

### 3.4 测试规范

- **测试金字塔**（Mike Cohn / Martin Fowler）：底层大量**单元测试**（快、多、隔离），中层少量**集成测试**（验证模块协作/数据库），顶层极少量**端到端测试**（验证用户关键路径）。AI 项目默认：核心逻辑全部有单元测试，外部依赖留集成测试，关键用户旅程 1–2 条 E2E。
- **单元测试写法**：一个测试验证一个行为；命名描述"前置 + 行为 + 期望"，如 `test_折扣_首次购买_返回9折`、`it('returns 400 when input is empty')`。
- **边界条件必测**：空输入、0、负数、最大值、超长字符串、未登录、并发。边界 bug 占真实故障的大头。
- **回归测试**：**修 bug 前先写一个会失败的测试复现它**，修复后测试转绿——这是防止"修了 A 又坏 B"的核心手段。
- **覆盖率是手段不是目标**：核心路径 100% 覆盖 > 全项目刷数字；不要为了覆盖率写"只为了执行而执行"的假测试。
- **测试要快、确定、可并行**：不依赖真实网络/当前时间/随机数（用 mock 与固定种子）；测试失败要能指出哪个行为坏了。
- 测试代码本身也要可读：好的测试 = 活的文档，读测试能懂业务规则。

### 3.5 安全默认（OWASP Top 10 2021 要点）

| 风险 | AI 编码默认动作 |
|---|---|
| A03 注入（SQL/命令） | **一律参数化查询/预编译**，永不字符串拼接 SQL；命令执行用白名单参数 |
| A03 跨站脚本 XSS | 输出一律转义/编码；富文本用白名单 sanitizer；`innerHTML` 慎用 |
| A01 访问控制失效 | 每个受保护接口都要鉴权校验，不只隐藏按钮/入口 |
| A02 加密失败 | 密码用 bcrypt/argon2 哈希（加盐），传输用 HTTPS，敏感字段加密存储 |
| A07 身份认证失效 | 会话过期、登录限流防爆破、验证码/多因素按需 |
| A06 易受攻击组件 | 依赖锁定版本（lockfile），定期 `npm audit`/`pip-audit`/`dependabot` 更新 |
| A05 安全配置错误 | 关闭调试模式、默认密码必须改、报错页面不泄露堆栈 |

**核心原则**：**永远不信任外部输入**（用户提交、请求参数、响应数据、配置文件都算）；最小权限（应用只用它需要的权限）；**密钥管理**见 3.3。AI 生成的代码要默认带上：输入验证（类型/长度/范围/白名单）、参数化查询、输出转义、依赖审计四件套。

### 3.6 性能默认观念

- **Knuth**："过早优化是万恶之源"（*premature optimization is the root of all evil*，约 97% 的小优化不值得做）。先写**正确、可读、可测**的代码。
- 但**避免明显低效**（这些不算"过早优化"）：循环内查数据库/发请求（应批量或提到循环外）、无谓重复计算（提公共变量）、明显 O(n²) 的嵌套循环（n 大时）、在渲染路径里做重计算。
- **优化必须基于测量**：先 profiler/基准定位热点，再优化；优化后跑测试确认行为不变、跑基准确认真的变快。
- 复杂度意识：数据量预期是 100 还是 100 万，决定了该不该优化算法。
- 性能与可读性冲突时，优先可读 + 注释说明热点；不要用"性能"当乱写代码的借口。

---

## 四、开发潜规则 / 不成文规矩

> 这些不在任何教科书里，但专业团队默认遵守，外行 AI 最容易在这些地方露馅。

1. **不提交生成物**：`node_modules/`、`build/`、`dist/`、`__pycache__/`、`.next/`、`.venv/`、`.env`、`*.log`、`.DS_Store` 全部进 `.gitignore`（新建项目第一条命令就建 .gitignore）。仓库只存**源码与必要的配置文件**；提交前自查 `git status`。
2. **提交信息描述"为什么"而非"做了什么"**：代码本身能看出改了什么，历史里看不出**为什么这么改**。好提交：`fix: retry DB connection on startup to survive brief network blips`；差提交：`update code`。
   - 格式遵守 **Conventional Commits**：`<type>(<scope>): <subject>`，type 为 `feat/fix/docs/style/refactor/perf/test/build/ci/chore/revert`；破坏性变更加 `!` 或 `BREAKING CHANGE:` 说明。
   - 遵守 **50/72 规则**：标题 ≤50 字符，正文每行 ≤72 字符换行。
3. **PR 要小、要可评审**：一个 PR = 一个功能/一个修复/一次重构，通常 <300–400 行改动。大 PR 评审者根本看不过来，bug 就溜进去了。小 PR 合并快、回滚容易、评审意见具体。
4. **不破坏别人的代码（向后兼容）**：改公共 API/函数签名/数据结构前，先想"谁在调用"；非破坏性方式（加可选参数、新增接口、弃用标注）优先；确需破坏 → 走 `major` 版本 + 迁移文档 + 弃用周期。
5. **复制粘贴代码的坑**：粘贴的代码带着原场景的假设（变量名、边界、错误处理），复制的 bug 会被复制 N 份；粘贴第 2 次就该想抽取。粘贴外部代码必须保留来源与许可（LICENSE 合规）。
6. **魔法数字**：`if (x > 86400)` 没人知道 86400 是什么；写成 `const SECONDS_PER_DAY = 86400`。所有非显然的裸数字/字符串都要命名。
7. **深嵌套是坏味道**：3 层以上嵌套要么拆函数，要么用**卫语句提前返回**（guard clause：`if (!user) return;` 而不是包一层 `if (user) { ... }`）。
8. **童子军规则**（Boy Scout Rule）：离开代码时让它比来时更干净一点——顺手重命名一个烂变量、删一段死代码，但要克制：**不混入无关改动**（顺手的事单独提交）。
9. **"能用就行" vs "专业质量"**：差距不在功能跑不跑得通，而在——
   - 错误路径有没有处理（外行：只有 happy path）；
   - 别人/三个月后的自己能不能看懂（命名、注释为什么、结构）；
   - 敢不敢改（有没有测试兜底）；
   - 换了环境还能不能跑（配置环境化、无硬编码）；
   - 会不会炸出安全问题（密钥、注入、依赖）。
10. **评审是质量门禁不是走过场**：专业流程里代码合并前必须过评审；AI 团队中由 QA/架构师角色执行评审，主 Agent 收口。

---

## 五、技术选型基础知识（小型个人产品）

给小型个人产品（如委托人这种非技术个人开发者的产品）选技术栈的原则：

1. **简单可靠优先（KISS）**：能用单文件/单体解决的问题不引入微服务、消息队列、Kubernetes。"过重的框架"是小型项目最常见的死亡原因——配置复杂度超过产品复杂度。
2. **生态成熟**：选有大量第三方包、遇到问题能搜到答案的技术。坑早就被人踩平了。
3. **维护活跃**：看 GitHub 仓库最近提交/发版、issues 响应、社区活跃度；拒绝已停止维护的项目（如被弃用的框架）。
4. **文档齐全**：官方文档、教程、示例齐全是 AI 开发的前提——AI 写代码时参考文档越多，代码越对。
5. **"无聊技术"（Boring Technology）**：成熟稳定、十年不变的技术是资产；最新最炫的技术是负债。选型不是比酷，是比谁更不容易翻车。
6. **选 AI 擅长的**：流行语言/框架（Python、JavaScript/TypeScript、主流框架）训练数据多，AI 写出来质量高、踩坑少——对 AI 驱动的虚拟团队这本身就是一条硬指标。
7. **部署简单**：个人产品优先"一条命令部署"（静态托管/Vercel/Railway/云函数等），自己维护服务器是额外负担。
8. **记录选型决策（ADR）**：写一行"为什么选 A 不选 B"存进 `docs/`，防止三个月后 AI/自己又纠结一遍。

**典型参考组合**（示例，非推荐绑架）：Python + FastAPI + SQLite/PostgreSQL + 一个前端框架；或 JS 全栈（Next.js/React + SQLite/Postgres）；数据库/部署都选托管版优先。

---

## 六、各职务专属基础（简要）

### 架构师
- **模块化与边界**：系统按领域切模块，模块间接口清晰，依赖单向（不循环依赖）。
- **可扩展性**：为"会变的点"留扩展位（配置/插件/抽象），但遵守 YAGNI——不为想象中的需求过度设计。
- **技术债意识**：技术债不可避免，重点是**记账**：记录在案（README/ADR）、定期偿还、不悄悄欠新债；重大取舍写决策记录。
- 做架构决策时考虑成本/收益/风险，输出书面决策供评审（对应虚拟团队的"架构评审"环节）。

### 工程师
- **可读性**：代码是写给"下一个读它的人"（含 3 个月后的自己）看的，可读 > 炫技。
- **可维护性**：命名规范、小函数、DRY、模块化——让改动成本最低。
- **重构**（Martin Fowler）：重构 = **在不改变外部行为的前提下改善内部结构**，靠测试兜底；小步进行，每步都跑测试。重构与加功能分开提交。

### QA
- **测试金字塔**：单元测试为主，E2E 只覆盖关键路径（见 3.4）。
- **边界条件**：空值/0/负数/极限/超长/异常编码/并发——专业 QA 的测试清单里边界占一半。
- **回归测试**：每个已修 bug 都要变成永久回归用例；发版前跑全量回归。
- 验收标准前置：写功能前先定义"什么算做完"（对应虚拟团队 Stage-Gate 的质量关卡）。

### 运维
- **可部署性**：构建/部署一条命令（12-Factor）；依赖锁定（lockfile）、版本可复现。
- **可观测性**：日志（结构化）、指标（错误率/延迟/流量）、健康检查端点三件套；故障时能回答"哪里坏了、坏多久了"。
- **回滚能力**：发版可回滚（保留上一个版本镜像/产物、数据库迁移可逆——迁移文件向下兼容）；发布=构建产物 + 配置，回滚=切回旧版本。

---

## 七、给 AI 工作流的落地建议

除第一节 15 条铁律外，针对"AI 写代码"场景补充工作流规则：

1. **先读项目再动手**：生成代码前先读 `.editorconfig`/`.prettierrc`/`.eslintrc`/README/现有代码风格，**模仿项目既有风格**，不按自己默认值另起一套。
2. **生成后必跑工具链**：写完代码立即运行格式化 + lint + 测试（`npm run lint && npm test`），不通过不交付。
3. **新建项目默认骨架**：`.gitignore` + README + LICENSE + 测试框架 + lint/格式化 + CI（或至少本地检查脚本）一次配齐，不裸奔。
4. **提交信息自动合规**：AI 每次提交默认用 Conventional Commits 格式，正文写"为什么"。
5. **依赖变更要说明**：引入新依赖必须说明用途与替代方案；优先小、维护活跃的库；不引入只为了"少写几行"的大依赖。
6. **删掉 AI 样板残留**：生成代码后清理无用的 import、注释掉的代码、空 catch、示例占位——AI 最典型的外行痕迹。
7. **公共接口变更先问用户**：涉及对外 API、数据结构、破坏性变更的决策，先汇报再动手（与虚拟团队"方向决策铁律"一致）。
8. **每次交付附带测试**：AI 交付"功能"时必须同时交付/更新测试，否则视为未完成。
9. **小步多提交**：AI 一次会话做多个无关改动时，按功能拆成多个提交，而不是一个大杂烩提交。
10. **安全自查清单**：交付前过一遍 3.5 表格（注入/XSS/密钥/依赖审计）。

---

## 八、外行代码 vs 专业代码对比

**功能**：读取订单金额，若用户是首次购买则打 9 折，满 100 元免运费，计算应付总额并打印收据。

### ❌ 外行写法（AI 反面教材特征集）

```python
def f(data):
    # 计算价格
    t = 0
    for i in data['items']:
        t = t + i['price'] * i['qty']
    if data['user']['first']:
        t = t * 0.9
    if t > 100:
        t = t  # 免运费
    else:
        t = t + 8.5
    print("total: " + str(t))
    return t
```

**外行特征逐条对照**：
- 函数名 `f`、变量 `t`/`i`/`data`：无意义命名 ❌（铁律 1）
- 一个 15 行大函数混了"计算小计、折扣、运费、打印"四件事 ❌（铁律 2）
- `0.9`、`100`、`8.5` 魔法数字，无人知道含义 ❌（铁律 4）
- `t = t  # 免运费` 注释解释"是什么"还说了谎（没做任何事）❌（铁律 3）
- 无错误处理：`data` 缺字段、`price` 为负、`qty` 为 0 全崩/全错 ❌（铁律 5）
- 无测试 ❌（铁律 12）
- 打印到 stdout 而不是结构化返回，无法测试、无法复用 ❌（铁律 12/13）

### ✅ 专业写法（同功能）

```python
FIRST_PURCHASE_DISCOUNT = 0.9          # 首次购买 9 折（业务规定，见需求文档 §2.3）
FREE_SHIPPING_THRESHOLD = 100.0        # 满 100 免运费
STANDARD_SHIPPING_FEE = 8.5
CURRENCY = "¥"

def calculate_subtotal(items: list[dict]) -> float:
    """按单价×数量求和。items: [{price: float, qty: int}]"""
    if not items:
        raise ValueError("购物车为空")
    return sum(_line_total(item) for item in items)

def _line_total(item: dict) -> float:
    price, qty = item["price"], item["qty"]
    if price < 0 or qty < 0:
        raise ValueError(f"价格/数量不能为负: {item}")
    return price * qty

def apply_discount(subtotal: float, is_first_purchase: bool) -> float:
    # 折扣只对首次购买生效——该规则在需求文档 §2.3，勿按直觉修改
    return subtotal * FIRST_PURCHASE_DISCOUNT if is_first_purchase else subtotal

def calculate_shipping(subtotal_after_discount: float) -> float:
    return 0.0 if subtotal_after_discount >= FREE_SHIPPING_THRESHOLD else STANDARD_SHIPPING_FEE

def checkout(data: dict) -> dict:
    """结算入口：返回结构化收据，供调用方打印/展示/测试"""
    subtotal = calculate_subtotal(data["items"])
    discounted = apply_discount(subtotal, data["user"]["is_first_purchase"])
    shipping = calculate_shipping(discounted)
    return {
        "subtotal": subtotal,
        "discount": subtotal - discounted,
        "shipping": shipping,
        "total": discounted + shipping,
        "currency": CURRENCY,
    }
```

```python
# tests/test_checkout.py —— 与实现同目录，覆盖主路径与边界
def test_首次购买_打折且满百免运费():
    receipt = checkout({"items": [{"price": 100, "qty": 2}],
                        "user": {"is_first_purchase": True}})
    assert receipt["total"] == 180.0
    assert receipt["shipping"] == 0.0

def test_负数价格_抛错():
    with pytest.raises(ValueError):
        checkout({"items": [{"price": -1, "qty": 1}], "user": {}})
```

**专业特征逐条对照**：
- 命名即文档：`checkout`/`calculate_subtotal`/`is_first_purchase` 读代码即懂业务 ✅
- 每个函数单一职责、可单独测试 ✅
- 魔法数字变命名常量 + 注释解释"为什么是这个数" ✅
- 边界与错误显式处理（空车、负数）✅
- 返回结构化数据（可测、可复用），不把逻辑焊死在打印里 ✅
- 测试覆盖主路径 + 边界，命名描述行为 ✅

**同一功能的差距本质**：外行版"能跑"，专业版"能活、能改、能测、能交接"。AI 交付时以专业版为默认标准。

---

## 主要参考来源

- [Conventional Commits 规范（官方中文）](https://www.conventionalcommits.org/zh-hant/v1.0.0/)
- [PEP 8 – Python 官方风格指南](https://peps.python.org/pep-0008/)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Google Style Guides](https://google.github.io/styleguide/)
- [Clean Code 要点笔记（Robert C. Martin）](https://github.com/timkendall/clean-code)
- [Refactoring 要点（Martin Fowler）](https://github.com/ciembor/agent-rules-books/blob/main/refactoring/refactoring.md)
- [Hacker Laws（Knuth 过早优化、DRY、YAGNI 等定律集合）](https://raw.githubusercontent.com/dwmkerr/hacker-laws/master/README.md)
- [12-Factor App（官方）](https://12factor.net/) 与 [Real Python 术语表解读](https://realpython.com/ref/software-engineering-glossary/twelve-factor-app/)
- [12-Factor Rails 实践 RFC（gov.uk）](https://raw.githubusercontent.com/alphagov/govuk-rfcs/main/rfc-026-12-factor-rails-apps.md)
- [SemVer 语义化版本（官方）](https://semver.org/)
- [Git 提交信息指南（Sourcegraph 工程手册：描述 why）](https://raw.githubusercontent.com/sourcegraph/about/master/handbook/engineering/commit_messages.md)
- [50/72 提交信息规则白皮书](https://rdkcentral.github.io/rdk-halif-aidl/0.21.0/whitepapers/standardizing_git_commit_messages/)
- [.gitignore 是什么与怎么写（GitHub 社区讨论）](https://github.com/orgs/community/discussions/165862) 与 [Why use .gitignore（Stack Overflow）](https://stackoverflow.com/questions/28029016/why-use-gitignore-and-why-do-i-need-to-not-include-certain-files)
- [PR 评审指南（Backstage 工程手册：小 PR 可评审）](https://raw.githubusercontent.com/backstage/backstage/master/REVIEWING.md)
- [OWASP Top 10 与代码评审安全清单映射](https://github.com/daemon-blockint-tech/Agentic-Enteprises-Skill/blob/main/code-security/references/review_checklist_and_owasp_mapping.md)
- [安全优先编码技能（含注入/XSS/密钥清单）](https://github.com/j0KZ/mcp-agents/blob/main/docs/universal-skills/security-first/SKILL.md)
- [测试模式参考（测试金字塔/命名/覆盖率观念）](https://github.com/DevelopersGlobal/ai-agent-skills/blob/c3a0845ed37270f06567711b250c6814cb91857c/references/testing-patterns.md)
- [童子军规则：让营地比来时更干净](https://www.wovenware.com/blog/2018/10/cleaner-software-dev-2/)
- [技术选型决策指南（GovStack 实施手册）](https://specs.govstack.global/implementation-playbook/development/implementation/design-architecture/5-b-system-architecture/5-b.4-decide-technology-stack.md)
- [命名规范完整指南（camelCase/snake_case/PascalCase）](https://sluggenerator.app/blog/naming-conventions-programming)
