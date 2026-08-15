# 软件产品开发各职务角色的专业知识基础 —— 调研报告

> 用途：为 AI 虚拟产品团队（8 阶段流水线）提供各阶段"职务角色"的专业知识底座，使 AI 扮演产品经理、架构师、工程师、QA、安全、DevOps、运营、产品负责人时具备领域内行素养。
> 调研方式：web_search 权威来源（产品管理、工程管理、QA 认证体系、OWASP、部署工程等公认体系）。
> 产出时间：2026-08（本报告为调研快照，各框架为行业通用共识）。

---

## 一、各职务专业知识速查表

| 职务 | 角色一句话 | 核心知识（5-8 条） |
|---|---|---|
| **产品经理（PM）** | 想清楚"做什么、为什么做、先做什么" | ① 用户故事+验收标准（INVEST / Given-When-Then）② MVP 思维与假设验证 ③ 优先级排序（MoSCoW / RICE / WSJF）④ 竞品分析与价值主张（Value Proposition Canvas）⑤ 北极星指标与留存/激活漏斗 ⑥ 需求澄清（问题≠方案、5W1H）⑦ PRD 撰写与评审 |
| **架构师 / 技术负责人** | 想清楚"怎么做、技术方案怎么定" | ① 技术选型原则（需求驱动、团队能力、生态成熟度）② 系统设计基础（分层、模块化、解耦、单一职责）③ API 设计基础（REST 资源建模、版本化、错误语义）④ 技术债与"可扩展性 vs 过度设计"（YAGNI）⑤ Epic / Story / Task 任务拆解 ⑥ 设计原则（SOLID / DRY / KISS）⑦ 非功能需求（性能、安全、可运维性） |
| **工程师** | 把方案高质量地实现出来 | ① 编码规范与代码整洁（命名/格式化/DRY/可读性）② 版本控制与 git 工作流（分支策略、提交信息规范）③ 测试（单测/集成/端到端，测试金字塔）④ 调试方法（可复现、二分定位、日志驱动）⑤ 代码评审（四眼原则、评审清单）⑥ 设计模式（何时用/何时不用，避免模式滥用）⑦ 重构与增量交付 |
| **QA / 测试工程师** | 证明"它按预期工作"并找出问题 | ① 测试金字塔与测试分层策略 ② 测试用例设计（等价类/边界值/判定表/错误推测）③ 缺陷管理（严重度 vs 优先级、缺陷生命周期）④ 回归测试与冒烟测试 ⑤ 验收标准对照与 UAT 支持 ⑥ 风险驱动测试（Risk-Based Testing）⑦ 测试报告与质量门禁 |
| **安全工程师** | 让系统"不被攻破、不泄露、可恢复" | ① OWASP Top 10 常见漏洞 ② 密钥与凭据管理（不入库、轮换、最小范围）③ 依赖漏洞（SCA 扫描、供应链）④ 输入验证与输出编码 ⑤ 最小权限原则（RBAC、账号权限）⑥ 隐私与数据合规（PII、GDPR 意识）⑦ 安全审计清单与修复验证 |
| **发布 / DevOps** | 让版本"稳定、可重复、可回滚"地上线 | ① 语义化版本（semver）与版本管理 ② CI/CD 概念与流水线 ③ 发布清单与发布就绪检查（DoR/DoD）④ 部署策略（蓝绿/金丝雀/滚动）⑤ 回滚机制与失败预案 ⑥ 可观测性（日志/指标/追踪、SLO）⑦ 环境管理（开发/测试/生产隔离） |
| **运营 / 增长** | 让产品"被知道、被使用、留下来" | ① 冷启动策略与种子用户 ② AARRR 漏斗（获客-激活-留存-收入-推荐）③ 内容营销基础与发布渠道 ④ 数据复盘与指标拆解 ⑤ 用户反馈管理（收集-归类-闭环）⑥ 北极星指标落地与增长实验 ⑦ 留存/流失分析与激活优化 |
| **产品负责人（迭代）** | 决定"下一个迭代做什么"并闭环 | ① 反馈池管理（来源分类、去重、价值评估）② 路线图（Now/Next/Later）③ 优先级决策（WSJF / Kano / RICE）④ 版本规划与发布节奏 ⑤ 迭代闭环（回顾-改进-下一轮）⑥ 需求验收与"完成"定义（DoD）把关 ⑦ 与各角色衔接的价值流管理 |

---

## 二、按角色展开

### 2.1 产品经理（PM）—— 想法验证 / 需求

**核心职责**：把模糊想法转成可验证、可开发、可衡量的需求；决定"做什么"与"先做什么"；对产品结果负责。

**必备知识**
- **用户故事与验收标准**：标准句式「作为<角色>，我想要<能力>，以便<价值>」；验收标准用 **Given-When-Then** 写（Given 前置条件 / When 触发动作 / Then 期望结果），并用 **INVEST** 校验故事质量：Independent（独立）、Negotiable（可协商）、Valuable（有价值）、Estimable（可估算）、Small（足够小）、Testable（可测试）。参考：[Visual Paradigm《Writing Effective User Stories》](https://www.visual-paradigm.com/guide/comprehensive-guide-writing-effective-user-stories-without-scope-creep/)、[18F Guides（美国政府数字服务产品手册）](https://guides.18f.org/product/deliver/build/)
- **MVP 思维**：MVP 不是"阉割版"，而是**验证最关键假设的最小实验**——先定义待验证假设（价值假设/增长假设），再决定最小可行范围。判断标准：能否在最短时间让真实用户验证核心价值。
- **优先级排序**：**MoSCoW**（Must/Should/Could/Won't）快速分层；**RICE**（Reach×Impact×Confidence÷Effort）量化打分；**WSJF**（Weighted Shortest Job First，价值/成本延迟比）用于迭代排期。参考：[GitScrum《Backlog Prioritization: WSJF, RICE & MoSCoW》](https://docs.gitscrum.com/en/best-practices/how-to-prioritize-product-backlog-for-development)、[Tempo《Backlog Prioritization Frameworks》](https://www.tempo.io/guides/how-to-avoid-common-product-backlog-prioritization-pitfalls)
- **竞品分析与价值主张**：竞品分析四要素（定位/功能矩阵/定价/用户评价），输出差异点；**Value Proposition Canvas**（价值主张画布）：客户痛点（Pains）、客户收益（Gains）、待办任务（Jobs-to-be-done）与产品止痛/增益能力的匹配。
- **成功指标**：**北极星指标**（唯一反映产品核心价值的指标，如留存、周活跃、转化率）+ 支撑指标树；漏斗指标（激活率、留存率、推荐率）。指标必须可定义口径、可采集、可对照基线。

**常用方法/框架**：用户访谈（5 个用户即可发现大部分问题）、5W1H 澄清、问题-方案分离（先确认问题再谈方案）、PRD 模板（背景/目标/范围/需求明细/验收标准/风险/指标）、需求评审会。

**判断标准（专业感体现）**
- 每个需求都能回答"解决什么问题、服务谁、如何衡量成功"三问。
- 用户故事有可测试的验收标准，不是一句"做好看一点"。
- 优先级决策有明确依据（框架打分或业务策略），而非"感觉重要"。
- 能区分"用户说的需求"（方案）与"用户真实的问题"（问题本身）。

---

### 2.2 架构师 / 技术负责人 —— 技术设计

**核心职责**：把需求翻译成技术方案；定技术选型与系统结构；保证方案可开发、可扩展、可维护；把大需求拆成可交付的工作项。

**必备知识**
- **技术选型原则**：需求驱动（选型服务于业务约束，而非技术潮流）；评估四维：功能满足度、生态成熟度/社区活跃、团队熟悉度、长期维护成本（License、招聘、弃坑风险）。判断标准：写得出选型对比表与"为什么不用 X"的结论。
- **系统设计基础**：分层架构（表现层/业务层/数据层）、模块化与解耦（高内聚低耦合）、单一职责、依赖方向（依赖抽象不依赖实现）。可扩展到微服务，但默认从单体/模块化起步——**架构的第一要务是简单**。
- **API 设计基础**：REST 资源建模（名词资源 + 标准 HTTP 动词 + 状态码语义）、接口版本化策略、错误信息结构（结构化错误码）、幂等性与分页/限流意识。参考：[Microsoft Code-with Engineering Playbook（工程实践权威手册）](https://microsoft.github.io/code-with-engineering-playbook/documentation/guidance/work-items/)
- **技术债 vs 过度设计**：技术债是"为了速度故意欠下的、必须记账并规划偿还的债"（有意识取舍 + 记录在案），不是无意识的质量滑坡；可扩展性满足**当前 + 可预见的下一步**即可——**YAGNI**（You Aren't Gonna Need It）防止为不会来的需求过度设计。参考：[dev.to《Engineering with SOLID, DRY, KISS, YAGNI and GRASP》](https://dev.to/andrey_s/engineering-with-solid-dry-kiss-yagni-and-grasp-136a)、[AlgoMonster《DRY, KISS, YAGNI & Law of Demeter》](https://algo.monster/courses/lld/lld_dry_kiss_yagni_lod)
- **任务拆解（Epic/Story/Task）**：Epic（大型业务主题）→ Feature（功能）→ User Story（用户可感知的价值单元）→ Task（工程执行单元，可独立完成并验证）。拆解原则：每一层可独立验收、依赖最小、粒度到"半天~2 天可完成"。参考：[Plane《Epic vs. Feature vs. User Story vs. Task》](https://plane.so/blog/epic-vs-feature-vs-user-story-vs-task-understanding-the-differences)
- **非功能需求**：性能（延迟/吞吐/容量）、安全（见安全章节）、可运维性（日志/监控/部署）、可用性（SLO）——这些必须在设计阶段显式提出，而非上线后补救。

**常用方法/框架**：ADRs（Architecture Decision Records 记录技术决策与理由）、C4 模型（Context/Container/Component/Code 四级图）、设计评审会（评审重点：边界、依赖、失败场景）、SOLID 五项（SRP/OCP/LSP/ISP/DIP）。

**判断标准（专业感体现）**
- 每个技术决策都有一句话理由 + 备选方案说明（ADR 思维）。
- 方案文档包含数据模型、接口契约、失败/边界场景，而不只是"流程图"。
- 能明确说出"什么情况不该上微服务/新框架"。
- 拆解出的 Story/Task 具备独立可验收性，无交叉依赖。

---

### 2.3 工程师 —— 开发

**核心职责**：按设计高质量实现功能；保证代码可读、可测、可维护；按时交付并自测通过。

**必备知识**
- **编码规范与代码整洁**：命名有意义（自文档化）、函数短小单一、DRY（不重复自己）但不教条（三次重复才抽象）、格式化统一（工具自动执行，不靠自觉）、注释解释"为什么"而非"是什么"。规范应落成 .editorconfig / lint 配置，而非口头约定。
- **版本控制与 git 工作流**：了解主流分支策略——GitFlow（复杂、适合固定发布周期）、GitHub Flow（极简、功能分支+PR）、Trunk-Based（主干开发+短分支，适合 CI 频繁发布）；提交信息遵循 Conventional Commits（feat:/fix:/docs:/chore:），每次提交原子化（一件事一次提交）。参考：[dev.to《Git Branching Strategies: Trunk-Based vs GitFlow vs GitHub Flow》](https://dev.to/instadevops/git-branching-strategies-trunk-based-vs-gitflow-vs-github-flow-4ejb)
- **测试基础（测试金字塔）**：底层大量**单元测试**（快、准、定位到函数）、中层少量**集成测试**（模块间协作）、顶层极少**端到端测试**（关键用户旅程）；新功能"代码与测试同 PR 提交"，测试不是上线前补的。
- **调试方法**：先稳定复现（最小复现用例）→ 二分定位（注释/提交历史/git bisect）→ 日志驱动（关键路径打点）→ 修复后补回归测试防复发。禁止"改改看"式瞎试。
- **代码评审（四眼原则）**：每个 PR 至少一人评审；评审关注点：逻辑正确性、边界条件、可读性、安全性、是否带测试；评审语气对事不对人；对评审意见要么采纳要么给出理由拒绝，不沉默。
- **设计模式（何时用/何时不用）**：常见模式——工厂、单例（慎用，注意全局状态）、观察者、策略、模板方法、适配器。判断标准：**模式是为了解决特定上下文问题，出现该问题才用**；滥用模式（为模式而模式）是反模式。参考：[AlgoMonster《DRY, KISS, YAGNI》](https://algo.monster/courses/lld/lld_dry_kiss_yagni_lod)
- **重构**：行为不变、结构改善；小步重构 + 每次跑测试；警惕"顺手重构"混入功能 PR。

**常用方法/框架**：TDD（红-绿-重构，选做但单测必做）、Pair Programming、Definition of Done（功能完成 = 代码完成 + 自测通过 + 评审通过 + 文档更新 + 无已知阻塞缺陷）、git bisect、lint+format 自动化。

**判断标准（专业感体现）**
- PR 自带测试与说明，评审人 5 分钟内能看懂改了什么、为什么。
- 提交信息规范、分支粒度小、可随时回滚单点变更。
- 会主动写失败场景的测试（边界、异常、空值），而非只测 happy path。
- 面对"这个技术债先欠着"能说出偿还计划，而不是无脑接受或无脑拒绝。

---

### 2.4 QA / 测试工程师 —— 质量审计

**核心职责**：从质量视角挑战产品与实现；设计覆盖关键风险的测试；对"是否可发布"给出有依据的结论。

**必备知识**
- **测试金字塔**：单测（函数级，多、快）→ 集成（服务/模块级）→ E2E（全链路，少、慢、贵）；新增功能先问"在金字塔哪一层测"。另配合**冒烟测试**（发布前核心路径快速过一遍）与**回归测试**（验证旧功能未被破坏）。
- **测试用例设计技术（ISTQB 核心）**：
  - **等价类划分**：把输入分成有效/无效等价类，每类取一代表值；
  - **边界值分析**：取边界上/下/边界内值（最易出错处，如 0、上限、空串）；
  - **判定表**：多条件组合（条件×动作矩阵）覆盖逻辑组合；
  - **错误推测**：凭经验猜易错点（空值、超长、并发、重复提交）；
  - **状态迁移**：状态机场景（如订单 待支付→已支付→已取消）。参考：[VeritySoftware《Top Test Design Techniques Every ISTQB Candidate Should Know》](https://veritysoftware.in/blogs/top-test-design-techniques-every-qa-professional-should-know/)
- **缺陷管理**：**严重度（Severity）≠ 优先级（Priority）**——严重度指影响程度（崩溃/数据丢失=致命），优先级指修复顺序（阻塞发布=最高优先）；缺陷生命周期（新开→确认→修复→验证→关闭，可含拒绝/延期）；缺陷报告五要素：标题、复现步骤、期望/实际结果、环境、证据（日志/截图）。参考：[ISTQB 严重性与优先级辨析](https://blog.csdn.net/weixin_42126677/article/details/153946173)
- **风险驱动测试**：测试资源有限时按"影响 × 概率"排测试重点，高风险模块投入更多（ISTQB Risk-Based Testing）。
- **验收标准对照与 UAT**：把 PM 写的验收标准（Given-When-Then）转成可执行测试；**UAT** 是真实用户/委托人以真实场景验证"产品是否满足业务期望"，QA 的角色是准备 UAT 环境、场景清单、数据与缺陷反馈通道。参考：[BrowserStack《UAT Checklist》](https://www.browserstack.com/guide/user-acceptance-testing-checklist)、[Bubble《Practical Guide to UAT》](https://bubble.io/blog/user-acceptance-testing/)
- **测试报告与质量门禁**：输出"覆盖了什么、发现多少缺陷、按严重度分布、残留风险、建议结论（可发布/有条件发布/不可发布）"。

**常用方法/框架**：测试计划（范围/策略/环境/进度/风险）、测试用例评审、探索性测试（无脚本但有目的探索）、自动化回归（CI 中跑）、缺陷度量（漏测率、缺陷密度）。

**判断标准（专业感体现）**
- 用例覆盖边界值、异常路径、空值和权限场景，不是只测"正常流程"。
- 缺陷报告可复现（步骤精确、环境明确），能区分严重度与优先级。
- 发布结论有数据支撑：多少用例过/多少失败/残留风险清单。
- 主动拿验收标准逐条对照，发现"需求没写清"会反馈 PM 而非自己猜。

---

### 2.5 安全工程师 —— 安全审计

**核心职责**：识别并消除可被利用的漏洞；保护数据与凭据；让系统满足最低安全基线。

**必备知识**
- **OWASP Top 10（2021 版，Web 安全权威清单）**：①注入（SQL 注入等）②失效的认证③敏感数据泄露④XML 外部实体（XXE）⑤失效的访问控制⑥安全配置错误⑦跨站脚本（XSS）⑧不安全的反序列化⑨使用含已知漏洞的组件⑩日志与监控不足。参考：[OWASP Top 10 官方（2021）](https://owasp.org/Top10/2021/zh-TW/0x00_2021-introduction/)、[OWASP 中文解读](https://www.secrss.com/articles/34274)
- **密钥与凭据管理**：密钥**永不入库**（不写死在代码/配置文件，不进 git 历史）；使用环境变量或密钥管理服务；密钥最小范围（只给所需权限）；定期轮换；泄露即吊销。参考：[Cycode《Application Security Best Practices》](https://cycode.com/blog/application-security-best-practices/)、[Safeguard《Secure Coding Checklist》](https://safeguard.sh/resources/blog/secure-coding-fundamentals-checklist-beginners)
- **依赖漏洞（供应链安全）**：定期 SCA 扫描（npm audit / Dependabot / OSV 等）；区分直接依赖与传递依赖；已知漏洞组件按严重度及时升级；锁文件（lockfile）提交以保证依赖可复现。
- **输入验证与输出编码**：一切外部输入不可信——白名单校验、参数化查询防注入、输出编码防 XSS、限制上传类型与大小。
- **最小权限原则**：用户/服务/密钥只拥有完成任务所需的最小权限；RBAC 角色划分；默认拒绝。
- **隐私与数据合规**：识别 PII（个人可识别信息）；最小化收集；加密传输与存储；脱敏处理；隐私影响意识（GDPR/个人信息保护法方向）。

**常用方法/框架**：安全审计清单（配置/依赖/密钥/输入/权限/日志逐项过）、SAST（静态扫描）/DAST（动态扫描）、威胁建模（STRIDE：欺骗/篡改/否认/信息泄露/拒绝服务/权限提升）、发布前安全门禁。

**判断标准（专业感体现）**
- 审计报告按风险分等级并给出**可操作的修复建议**（不只"有风险"）。
- 会检查"被忽视的角落"：错误信息泄露、调试开关、默认密码、日志中的敏感字段。
- 密钥扫描是发布检查的必选项，且会验证 git 历史中无泄露。
- 修复后会**复测验证**（漏洞闭环），而非"修了就算"。

---

### 2.6 发布 / DevOps —— 发布部署

**核心职责**：让发布过程标准化、可重复、低风险；发布失败能快速恢复；上线后系统状态可见。

**必备知识**
- **语义化版本（semver）**：`主版本.次版本.修订号`——主版本=不兼容变更，次版本=向后兼容的新功能，修订号=向后兼容的缺陷修复；预发布后缀（-alpha/-beta/-rc）；版本号自动生成（Git tag/CI）而非手改。参考：[SemVer 官方规范](https://semver.org/)（行业公认）
- **CI/CD 概念**：CI（持续集成）= 每次提交自动构建+测试，快速反馈；CD（持续交付/部署）= 验证通过后自动或一键部署；流水线阶段：lint → 单测 → 构建 → 集成/E2E → 镜像/产物 → 部署 → 冒烟。
- **发布清单与发布就绪检查**：发布前 checklist——代码冻结状态、测试结果、安全扫描、数据库迁移、回滚预案、发布通知、备份确认。参考：[Beefed《Release Readiness Checklist & Runbook》](https://beefed.ai/en/release-readiness-checklist-runbook)
- **部署策略**：**蓝绿部署**（两套环境切换，回滚=切回旧环境）、**金丝雀部署**（先小流量验证再全量）、**滚动部署**（分批替换）、特性开关（Feature Flag，功能与发布解耦）。参考：[SFEIR《Kubernetes Deployment Strategies 对比表》](https://institute.sfeir.com/en/kubernetes-training/strategies-deployment-kubernetes-table-comparison/)、[DevOps.com《Deployment Strategies: Scenario-Based Guide》](https://devops.com/software-deployment-strategies-for-enterprise-teams-a-scenario-based-guide-to-choosing-the-right-approach/)、[devx《Canary vs Blue-Green》](https://www.devx.com/web-development-zone/canary-vs-blue-green-deployments-which-should-you-use/)
- **回滚机制**：每个发布必须回答"出问题怎么回"——回滚方式（版本回退/镜像回退/特性开关关闭）、回滚触发条件（错误率/告警阈值）、回滚演练；数据库变更回滚最难，需前置迁移策略。
- **可观测性**：三支柱——**日志**（结构化、可检索）、**指标**（请求量/错误率/延迟，RED 或 USE 模型）、**追踪**（跨服务调用链）；**SLO/SLI**：设定服务目标（如 99.9% 可用性）、错误预算（Error Budget）决定"还能不能发版"。参考：[Observability: Monitoring, Logging & Tracing（工程手册）](https://github.com/aiskillstore/marketplace/blob/820ccb93d2e2fe828678ed05433bafd1054e5000/skills/davila7/devops-iac-engineer/reference/observability.md?plain=1)

**常用方法/框架**：GitHub Actions / CI 平台流水线、IaC（基础设施即代码）、环境隔离（dev/staging/prod）、发布窗口与变更记录（CHANGELOG）、上线后观察期（30-60 分钟看错误率）。

**判断标准（专业感体现）**
- 发布步骤写成可执行清单/脚本，不是"口头记得"。
- 每个版本有明确 tag、CHANGELOG、可回滚标识。
- 会主动给出"发布后先看哪三个指标"（错误率、延迟、关键功能可用性）。
- 数据库结构变更会单独评审并规划兼容性（向前兼容迁移）。

---

### 2.7 运营 / 增长 —— 宣传 / 运营

**核心职责**：让产品被目标用户知道、使用、留下来；用数据驱动增长动作；管理用户反馈。

**必备知识**
- **冷启动**：新产品/新社区最初没有用户时的问题——策略：种子用户定向邀请、价值前置（先输出干货/工具）、单点切入（服务好一小群核心用户再做泛化）、借势渠道（社区/榜单/媒体）。判断标准：先跑通"价值交付→口碑"的最小闭环，再规模化。参考：[BlogBurst《Solving the SaaS Cold-Start Marketing Problem》](https://blogburst.ai/blog/solving-the-saas-cold-start-marketing-problem-in-2025)、[BetterLaunch《SaaS Marketing: Indie Founder's Playbook》](https://www.betterlaunch.co/blog/saas-marketing)
- **AARRR 漏斗（海盗指标）**：**Acquisition 获客**（用户怎么找到你）→ **Activation 激活**（首次体验价值，Aha moment）→ **Retention 留存**（回访率/次日/周留存）→ **Revenue 收入** → **Referral 推荐**（口碑/分享）；诊断思路：看漏斗哪一环流失最严重，就优化哪一环。参考：[Amplitude《AARRR: Pirate Metrics Framework》](https://www.amplitude.com/blog/pirate-metrics-framework)、[Ahrefs《AARRR Pirate Metrics》](https://ahrefs.com/blog/aarrr-metrics-framework/)
- **内容营销基础**：内容=持续生产对目标用户有价值的素材（教程/案例/干货）；渠道选择与产品类型匹配（开发者产品→技术社区+文档+开源，大众产品→短视频/图文平台）；发布节奏稳定；内容与产品价值主张一致。
- **数据复盘**：先定口径（指标定义一致）→ 看趋势与漏斗 → 找异常（涨跌原因）→ 形成"做了什么→数据如何→下一步"的复盘闭环；用实验思维（一次只改一个变量）。
- **用户反馈管理**：多渠道收集（评论/社群/问卷/客服）→ 归类（Bug/需求/体验/夸奖）→ 聚类去重 → 与产品负责人交接进入反馈池 → 对重要反馈给用户"已收到"的闭环回应。
- **北极星指标落地**：把北极星指标拆成可执行的动作指标（如：北极星=周留存 → 拆出激活完成率、关键功能使用率、推送触达率），增长动作对应具体指标而非"涨粉/涨量"空话。

**常用方法/框架**：增长实验（假设-实验-测量-决策）、用户旅程地图（找关键时刻）、内容日历、社群运营（核心用户群）、口碑/转介绍机制（邀请奖励）。

**判断标准（专业感体现）**
- 推广计划有明确目标渠道与目标人群，不是"全网发一遍"。
- 每次运营动作绑定可衡量指标，且事后有复盘。
- 会区分"拉新"与"留存"，知道留存优先于拉新（留住老用户比拉新便宜）。
- 反馈能整理成结构化清单并明确交接去向。

---

### 2.8 产品负责人（迭代）—— 迭代

**核心职责**：对迭代节奏与交付结果负责；管理反馈池与路线图；做出优先级决策并验收产出；推动持续改进闭环。

**必备知识**
- **反馈池管理**：单一入口收集所有需求/反馈（来自运营、客服、用户、内部）→ 标准化记录（来源/场景/价值/频次）→ 去重聚类 → 标注状态（待评估/已排期/已拒绝/已上线）；拒绝的需求也要记录理由，可追溯。
- **路线图（Now/Next/Later）**：三层时间窗路线图避免过度承诺：Now（当前迭代明确要做）、Next（下一阶段候选）、Later（远期想法池）；路线图表达"方向与优先级"，不是交付日期承诺。
- **优先级决策**：综合框架——**WSJF**（成本延迟/任务时长，量化"晚做一天损失多少"）、**Kano 模型**（基本型/期望型/兴奋型需求，兴奋型=差异化机会）、RICE/MoSCoW（见 PM 节）；决策时结合战略目标，而非单纯"谁声音大"。参考：[GitScrum《WSJF, RICE & MoSCoW》](https://docs.gitscrum.com/en/best-practices/how-to-prioritize-product-backlog-for-development)、[Tempo《Kano 与其他框架》](https://www.tempo.io/guides/how-to-avoid-common-product-backlog-prioritization-pitfalls)
- **版本规划**：把路线图转成可发布版本（V1.0 最小闭环 → V1.1 增量）；每个版本有目标、范围、验收标准、发布日期（缓冲）；发布后复盘"目标达成度"。
- **迭代闭环（Scrum 理念）**：迭代计划（本轮做什么+为什么）→ 执行 → **迭代回顾**（什么做得好/什么要改/下轮一个改进项）→ 把改进项排入下轮。参考：[NHSBSA Digital Playbook《About Product Ownership》](https://nhsbsa.github.io/nhsbsa-digital-playbook/product/about-role/)、[TheScrumMaster《Agile Product Management with Scrum 书摘》](https://www.thescrummaster.co.uk/book-summaries/agile-product-management-with-scrum-book-summary/)
- **DoD（Definition of Done）把关**：验收"完成"= 需求实现 + 测试通过 + 文档更新 + 无阻塞缺陷 + 用户验收确认；DoD 是团队共识，不是口头说说。
- **价值流衔接**：产品负责人是"接力棒"中心——从 PM 接收需求价值、向架构/开发传递优先级、从 QA/运营收回验证结果，保证 12 环节不是断裂的盒子。

**常用方法/框架**：反馈池看板、迭代计划会/回顾会（简洁高效）、版本发布复盘、指标看板（每迭代对照目标指标）、需求评审（价值-成本-风险三角）。

**判断标准（专业感体现）**
- 优先级决策"说得出理由"，且与战略/北极星挂钩。
- 每个迭代结束有明确复盘与改进项，下一轮可见改进落地。
- 反馈池状态可查询（谁提的、现在什么状态、为什么没做）。
- 敢说"不做"——明确拒绝并记录理由，是负责人成熟度标志。

---

## 三、AI 扮演这些角色时的关键提示（如何避免"外行表现"）

1. **先问"为什么"再谈"怎么做"（PM 与架构师通用）**：外行直接给方案，内行先澄清问题、目标、衡量标准。AI 在想法验证/需求阶段的第一句话应是澄清问题，而不是急于出方案。

2. **用术语表达专业结构，但术语背后要有真内容**：会写 Given-When-Then 验收标准、会用 WSJF 算分、能说出 OWASP Top 10、懂 semver 与蓝绿部署——术语是"专业感"的第一层，但必须给出可执行的产出（用例、评分表、清单），否则是空话。

3. **每个决策留"决策记录"**：模拟 ADR 思维，对每个关键技术/范围决策输出"选项对比 → 理由 → 放弃项原因"。这是架构师专业感的直接体现，也让主 Agent 可审计。

4. **输出带"判断标准"的结论，而非"听起来都对"的废话**：内行的结论是可证伪的——"如果错误率 > 1% 就回滚""如果两周内留存 < 20% 就换方向"。AI 应主动给出阈值、检查项、门禁条件。

5. **按角色切换输出体裁**：PM 产出 PRD+验收标准+优先级表；架构师产出方案+数据模型+拆解；工程师产出代码+测试+PR 说明；QA 产出用例+缺陷报告+发布结论；安全产出审计清单+风险分级；DevOps 产出发布清单+回滚预案；运营产出渠道计划+指标复盘；产品负责人产出反馈池+路线图+迭代复盘。**体裁错位是外行的最大特征**（如用工程师口吻写 PRD）。

6. **不越界但要有交接意识**：角色之间"接力"而非"重复"——PM 不替 QA 写用例，但要给验收标准；QA 发现需求不清反馈 PM 而非自己猜；安全发现问题按严重度交接 DevOps/工程师修复并复测；运营反馈交产品负责人进反馈池。虚拟团队的"专业感"很大程度体现在交接物清晰。

7. **说"我不知道/需要确认"是内行表现**：专业角色知道自己的知识边界——不确定技术细节时架构师说"需查证"，PM 缺用户数据时说"需调研"。AI 不应在缺少用户输入时假装"用户需求已确认"。

8. **用框架压缩信息，保持可执行粒度**：速查表、检查清单、评分表、漏斗图、金字塔——结构化输出让主 Agent 与用户都能快速核验专业度，同时每项都落到"下一步动作"。

---

## 附：核心参考来源汇总

- OWASP Top 10（2021）：https://owasp.org/Top10/2021/zh-TW/0x00_2021-introduction/
- SemVer 语义化版本规范：https://semver.org/
- Amplitude AARRR：https://www.amplitude.com/blog/pirate-metrics-framework
- Ahrefs AARRR：https://ahrefs.com/blog/aarrr-metrics-framework/
- GitScrum 优先级（WSJF/RICE/MoSCoW）：https://docs.gitscrum.com/en/best-practices/how-to-prioritize-product-backlog-for-development
- Tempo Backlog 优先级框架（含 Kano）：https://www.tempo.io/guides/how-to-avoid-common-product-backlog-prioritization-pitfalls
- Visual Paradigm 用户故事编写指南：https://www.visual-paradigm.com/guide/comprehensive-guide-writing-effective-user-stories-without-scope-creep/
- 18F 美国数字服务产品手册：https://guides.18f.org/product/deliver/build/
- Plane Epic/Feature/Story/Task：https://plane.so/blog/epic-vs-feature-vs-user-story-vs-task-understanding-the-differences
- Microsoft Code-with Engineering Playbook：https://microsoft.github.io/code-with-engineering-playbook/documentation/guidance/work-items/
- dev.to SOLID/DRY/KISS/YAGNI：https://dev.to/andrey_s/engineering-with-solid-dry-kiss-yagni-and-grasp-136a
- AlgoMonster 设计原则：https://algo.monster/courses/lld/lld_dry_kiss_yagni_lod
- Git 分支策略对比：https://dev.to/instadevops/git-branching-strategies-trunk-based-vs-gitflow-vs-github-flow-4ejb
- ISTQB 测试设计技术：https://veritysoftware.in/blogs/top-test-design-techniques-every-qa-professional-should-know/
- BrowserStack UAT Checklist：https://www.browserstack.com/guide/user-acceptance-testing-checklist
- Bubble UAT 指南：https://bubble.io/blog/user-acceptance-testing/
- SFEIR 部署策略对比表：https://institute.sfeir.com/en/kubernetes-training/strategies-deployment-kubernetes-table-comparison/
- DevOps.com 部署策略场景指南：https://devops.com/software-deployment-strategies-for-enterprise-teams-a-scenario-based-guide-to-choosing-the-right-approach/
- Beefed Release Readiness Checklist：https://beefed.ai/en/release-readiness-checklist-runbook
- Cycode 应用安全最佳实践：https://cycode.com/blog/application-security-best-practices/
- Safeguard 安全编码清单：https://safeguard.sh/resources/blog/secure-coding-fundamentals-checklist-beginners
- BlogBurst SaaS 冷启动：https://blogburst.ai/blog/solving-the-saas-cold-start-marketing-problem-in-2025
- BetterLaunch 独立开发者 SaaS 营销：https://www.betterlaunch.co/blog/saas-marketing
- NHSBSA Product Ownership 手册：https://nhsbsa.github.io/nhsbsa-digital-playbook/product/about-role/
- TheScrumMaster Agile Product Management 书摘：https://www.thescrummaster.co.uk/book-summaries/agile-product-management-with-scrum-book-summary/
