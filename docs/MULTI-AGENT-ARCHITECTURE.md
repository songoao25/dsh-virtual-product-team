# 多 Agent 协同软件开发团队：架构调研报告
### —— 为 DeepSeek Harness「产品团队模式 v2」（agent preset）提供 Agent 协同架构设计

> 调研日期：2026-08（基于公开资料与论文，含 MetaGPT / ChatDev / CrewAI / AutoGen(Microsoft Agent Framework) / OpenHands / dsh-agent-teams 及两篇多智能体软件工程综述）
> 委托人背景：DSH「产品团队模式」agent preset，当前为"单 Agent 依次扮演多角色 + 6 技能"，目标升级为"更真实的团队协同：开发/审计阶段子 Agent 扇出"。

---

## 〇、推荐 Agent 协同架构总表（先给结论）

**核心架构一句话**：**"1 个常驻主 Agent（主 Agent 兼 PM 兼技术负责人，负责对话、门禁、收口）+ N 个按需派生的子 Agent（干活的：工程师/QA/审计/调研/运营）"**，采用 **"orchestrator 调度 + 阶段门禁（Stage-Gate）+ 结构化产物传递"** 模式——这是 MetaGPT（SOP 流水线）、CrewAI（hierarchical process）、dsh-agent-teams（队长式委派）共同验证的形态，也是唯一适合"用户主导式对话"（用户非技术、只下指令、只做确认）的形态。

| 阶段 | 主 Agent 动作（常驻，收口决策） | 子 Agent 动作（按需派生） | 主要工具 | 门禁（Gate，主 Agent 汇总后向用户确认） |
|---|---|---|---|---|
| 0. 启动 | 加载 preset，用愿景/需求 skill 澄清目标，翻译成用户能懂的决策点 | — | skill：愿景 | Gate 0：与用户对齐"做什么、给谁用、成功标准" |
| 1. 想法验证 | 用调研 skill 定调研维度（市场/竞品/技术可行性），派发调研任务 | 2–3 个**调研子 Agent**并行（workflow 扇出，JSON schema 收结构化结果） | skill：调研；workflow（parallel）+ subagent | Gate 1：向用户汇报"值不值得做"要点，确认继续/调整 |
| 2. 产品定义 / PRD | 主 Agent 起草 PRD 骨架（用 skill），把用户原话转成需求条目 | 1 个**产品子 Agent** 起草完整 PRD（含用户故事/验收标准） | skill：需求；subagent（continuable） | Gate 2：PRD 评审——主 Agent 摘要 + 用户逐条确认 |
| 3. 技术设计 | 主 Agent 扮演架构师（方案选型、技术栈决策，向用户解释"技术黑话"） | 1 个**架构评审子 Agent** 交叉审查方案（挑毛病模式，MetaGPT Code Review 思路） | skill：设计；subagent | Gate 3：架构方案确认（主 Agent 用大白话解释取舍） |
| 4. 任务分解 | **主 Agent 亲自做**（拆任务包、定依赖、分配给工程师）——这是收口职责，不让子 Agent 代劳 | — | skill：设计/开发 | Gate 4：任务计划展示给用户（做什么、顺序、预计轮次） |
| 5. 开发实现 | 主 Agent 派发任务包，收集子 Agent 结果、串并行、汇总代码状态 | **多个工程师子 Agent** 并行实现独立模块（workflow pipeline/parallel，每包一个子 Agent） | skill：开发；workflow（parallel）+ subagent（continuable，跨轮次修 bug） | Gate 5：代码完成汇总（改了什么、怎么验证），用户过目 |
| 6. QA 测试 | 主 Agent 汇总测试报告，决定放行/打回（打回则指派工程师修） | **QA 子 Agent** 执行测试（写测试→跑→报缺陷，MetaGPT QA 迭代思路）；也可 workflow 并行多类测试 | skill：QA；subagent（continuable，问题清单跨轮次跟踪） | Gate 6：测试报告 + 缺陷清单，用户确认质量达标 |
| 7. 安全审计 | 主 Agent 汇总审计结论，风险决策 | **审计子 Agent** 独立审计（依赖/密钥/权限/注入），与开发**分离**（职责分离） | skill：QA/安全；subagent | Gate 7：审计通过/风险清单，用户知情决策 |
| 8. 发布准备 | 主 Agent 用发布 skill 走检查清单（版本号/README/CI/Release 规范） | 1 个**发布子 Agent** 预检清单（可选，或主 Agent 直接做） | skill：发布；subagent（可选） | Gate 8：发布就绪确认（对外版本号、内容物） |
| 9. 部署上线 | 主 Agent 主导执行（git tag、Release、部署命令），失败回环 | —（部署涉及凭据，由主 Agent/用户侧执行更稳） | skill：发布；bash/git 工具 | Gate 9：上线成功确认（链接可用、无回滚） |
| 10. 宣传推广 | 主 Agent 定宣传角度与渠道，产出大纲 | 1–2 个**运营子 Agent** 产文案/视频脚本/图文（并行） | skill：宣传；workflow 或 subagent | Gate 10：宣传物料用户审阅（这是用户本人要用的） |
| 11. 运营迭代 | 主 Agent 汇总反馈、排迭代 | **运营/分析子 Agent** 产运营计划与数据复盘（可选） | skill：运营；subagent | Gate 11：复盘 + 下一步迭代方向确认 |
| 12. 迭代 | 回到阶段 1，复用 continuable 子 Agent 的长期记忆 | 同前各阶段 | goal 工具跨阶段跟踪 | 循环门禁同上 |

**工具选择铁律**：
- **subagent（continuable）** 用于"有身份的长期成员"——需要跨轮次被唤醒、有持续性上下文（如 QA 的问题清单、工程师的修 bug 会话、运营的物料迭代）。
- **workflow** 用于"一次性扇出"——同一阶段多个独立任务并行（多模块开发、多维度审计、多主题调研），脚本化协调、JSON schema 收结果。
- **skill 定义"怎么干"**（方法/SOP），**子 Agent 负责"去干"**（执行实例），**主 Agent 负责"干得对不对、要不要继续"**（门禁）。

---

## 一、主流多 Agent 开发团队架构模式调研

### 1.1 全景：两大流派

学术界与工业界对"AI 虚拟开发团队"的实践可归为两个流派（[LLM-MAS for SE 综述](https://dlnext.acm.org/doi/full/10.1145/3712003) 与 [设计模式综述](https://www.alphaxiv.org/overview/2511.08475) 统计了 94–124 篇论文）：

| 流派 | 代表 | 协同模式 | 优点 | 缺点 |
|---|---|---|---|---|
| **A. 编排式流水线（orchestrator / SOP 流水线）** | MetaGPT、CrewAI(hierarchical)、OpenHands(单 Agent 强执行)、dsh-agent-teams | 一个中心（管理器/队长/主 Agent）按**固定流程**把任务分发给角色 Agent，产物以**结构化文档**接力 | 流程可控、产物可审计、失败可定位、符合工程规范（能产出 PRD→设计→代码） | 灵活性略低；中心节点是瓶颈；角色间"直接对话"受限 |
| **B. 角色间自由对话（communicative）** | ChatDev、AutoGen Group Chat | 角色 Agent 之间**直接对话/辩论**达成共识，任务通过对话链推进 | 能产生"讨论感"、方案可迭代、适合头脑风暴 | 对话失控风险（话题漂移/死循环）、成本高、结果难复现 |

**统计证据**：综述显示最常用的设计模式是 **Role-Based Cooperation（角色分工）46.8%**、**Self-Reflection（自反思）36.2%**、Cross-Reflection（交叉评审）12.8%、Hierarchical Coordination（层级协调）3.2%、Debate/Voting 各约 4%；在 SE 任务中 Code Generation 占 47.9%，End-to-End Software Development 占 7.4% 且"几乎全部重度依赖角色分工"。结论：**"角色分工 + 阶段化流水线"是主流且被验证有效的做法；纯自由对话只在小范围辩论场景划算。**

### 1.2 MetaGPT：SOP 流水线 + 文档接力（"Code = SOP(Team)"）

- **角色**：ProductManager(Alice，写 PRD) → Architect(Bob，写系统设计) → ProjectManager(Eve，拆任务+依赖) → Engineer(Alex，写代码+自审) → QaEngineer(Edward，写测试→跑→修，最多 5 轮)（[DeepWiki: Standard Development Roles](https://deepwiki.com/FoundationAgents/MetaGPT/5.1-standard-development-roles)）。
- **协同机制**：固定 SOP 装配线，每个角色 `observe → think → act`，输出**结构化文档**（PRD 12 字段、设计 5 字段、任务 7 字段），通过**消息池发布-订阅**传给下游；`WriteCodeReview` 用 LGTM/LBTM 做工程师自审迭代；QA 循环直到测试通过或达上限。
- **可借鉴**：① 角色职责与产物一一对应（PRD/设计/任务清单是"接力棒"）；② 工程师**先自审再交付**（内部 Review 循环）；③ 团队状态可**序列化/恢复**（`recover_path`，中断后可续跑——与 DSH subagent continuable 同理念）。

### 1.3 ChatDev：ChatChain 双人对话链（"虚拟软件公司"）

- **角色**：CEO/CTO/CPO/程序员/测试员/审查员等；按**瀑布模型**拆成四个环节：设计 Designing → 编码 Coding → 测试 Testing → 文档 Documenting，再分解为原子任务组成的 **Chat Chain**（[ACL 2024 论文](https://aclanthology.org/2024.acl-long.810/)、[腾讯云解读](https://cloud.tencent.cn/developer/article/2486597)）。
- **协同机制**：每个子任务由**两个角色直接对话**（如 CEO↔CTO 讨论技术选型、Instructor↔Assistant 代码审查），靠"角色专业化 + 记忆流 + 自反思"驱动；**Role Flipping（角色翻转）**：审查员把"想让程序员改的精确片段"注入提示，缓解代码幻觉。
- **可借鉴**：① 双角色对话适合"审查/辩论"场景（如主 Agent 派一个挑刺子 Agent 审架构）；② 每个阶段有明确产出（文档/代码/测试/手册），与 Stage-Gate 天然契合。

### 1.4 CrewAI：Sequential vs Hierarchical 两种流程

- **Sequential**：任务按顺序执行，前一个 agent 输出喂给下一个（[CrewAI Processes 文档](https://docs.crewai.com/v1.15.5/en/concepts/processes)）。
- **Hierarchical**：一个 **manager agent（或 manager_llm）** 负责"委派任务、监控、审批"——`manager_agent` 是常驻协调者，worker 只干活。这正是 DSH"主 Agent 常驻 + 子 Agent 派生"的原型。
- **可借鉴**：manager 与 worker 的**分工边界**——manager 不做具体活，只拆任务、派活、验收、汇总。

### 1.5 AutoGen / Microsoft Agent Framework：对话模式工具箱

- 官方定义了四类对话模式（[Conversation Patterns](https://microsoft.github.io/autogen/0.2/docs/tutorial/conversation-patterns/)）：**Two-agent chat**（两人对话）、**Sequential chat**（链式对话，用 **carryover** 把上一轮摘要带进下一轮——正是"阶段产物接力"的机制）、**Group Chat**（多人共享上下文，GroupChatManager 用 round_robin/random/manual/auto 选下一发言人）、**Nested Chat**（把一段子流程封装成"一个可复用 Agent"——正是 DSH "workflow 结果回传主 Agent"的抽象）。
- 其演化（AutoGen 0.4 → Microsoft Agent Framework）强调：**"一个 agent 内部可以有 team"**（[迁移指南](https://learn.microsoft.com/agent-framework/migration-guide/from-autogen/)：participants=[coordinator, inner_team, reviewer]），即**嵌套团队**——外层 orchestrator 内部再套子团队。
- **可借鉴**：① 对话摘要 carryover = 主 Agent 每阶段"汇总产物"；② 嵌套团队 = 开发阶段内部可再分"工程师团队"；③ Group Chat 只用于需要真实讨论的小场景（避免开放失控）。

### 1.6 OpenHands：单 Agent 深度执行（对照组）

- OpenHands（原 OpenDevin）主打 **CodeAct Agent**：单 Agent + bash/编辑器等工具深度执行，SWE-bench 上表现强（[GitHub](https://github.com/OpenHands/OpenHands)、[MACS 多 Agent 提案](https://github.com/OpenHands/OpenHands/issues/3151)）。
- **启示**：**"执行深度"与"团队广度"是权衡**。单 Agent 在"一个仓库里持续干活"上效率高（上下文连续）；多 Agent 的优势在**并行、职责分离、独立审查**（防自我一致性偏见）。DSH 的折中：主 Agent 保持上下文，脏活/并行活/审查活派给子 Agent。

### 1.7 dsh-agent-teams：DSH 生态已有的"队长式团队协议"

- 这是 DSH 生态现成的角色无关团队插件（[GitHub](https://github.com/NanmiCoder/dsh-agent-teams)）：**当前会话=队长（orchestrator）**，创建**可续聊子 Agent 成员**（spawn 后端、continuable），把目标拆成**带依赖的任务**（依赖未完成不能领取），成员间**持久化邮箱直达消息**，状态落盘 `<workspace>/.agent-teams/` + Web 实时面板。
- **价值**：证明 DSH 上"主 Agent 派子 Agent 建团队"可行且已有实现；其"任务状态 + 依赖 + 邮箱"模型可直接用于产品团队模式 v2（或作为对照——我们更轻量：不需要邮箱直达，主 Agent 收口即可）。
- **可借鉴**：任务带状态与依赖、成员可持续唤醒（continuable）、状态持久化。

### 1.8 小结：哪种模式适合 DSH 产品团队模式？

| 决策点 | 结论 | 依据 |
|---|---|---|
| 编排方式 | **orchestrator 调度为主**，角色间"直接对话"仅限审查/辩论子场景 | MetaGPT/CrewAI/AgentTeams 均为管理器收口；ChatDev 自由对话成本高且难控 |
| 产物传递 | **结构化文档接力**（PRD→设计→任务→代码→测试报告），主 Agent 每阶段做摘要（carryover 思想） | MetaGPT 文档流水线、AutoGen carryover |
| 质量保证 | **独立审查角色 + 自反思**（先自审再交叉审） | MetaGPT LGTM/LBTM、ChatDev Role Flipping、综述 Self/Cross-Reflection 高频 |
| 团队规模 | **常驻 1 + 派生 3–8**（按阶段，不一次性全建） | AgentTeams maxMembers=8、成本与可控性权衡 |

---

## 二、角色划分：最小必要角色集与"常驻 vs 派生"原则

### 2.1 软件产品开发的最小必要角色集

参考 MetaGPT 6 角色、ChatDev 组织、CrewAI 常见 crew，**覆盖"想法→上线→宣传→运营"闭环的最小集合**（8 个）：

| 角色 | 核心职责 | 关键产物 |
|---|---|---|
| 1. PM（产品经理） | 需求澄清、范围、优先级、验收标准 | PRD、用户故事 |
| 2. 架构师/技术负责人 | 技术选型、系统设计、接口定义 | 架构设计文档 |
| 3. 任务分解者（可并入 PM/架构师） | 拆任务、排依赖、分派 | 任务清单（依赖图） |
| 4. 工程师 | 实现代码、自测、修 bug | 代码、commit |
| 5. QA | 写测试、执行、报缺陷、回归 | 测试报告、缺陷清单 |
| 6. 安全审计（可与 QA 分离） | 依赖/密钥/权限/注入审计 | 审计报告 |
| 7. 发布/运维 | 版本、打包、部署、Release | Release、部署记录 |
| 8. 运营/宣传 | 文案、物料、渠道、复盘 | 宣传物料、运营计划 |

### 2.2 划分原则：什么角色"常驻主 Agent"，什么角色"按需派生"

**判断标准（三条）**：
1. **需要与用户对话/收口决策？** → 常驻（主 Agent 兼任）。
2. **需要长期上下文与"成员身份"（跨轮次唤醒、跟踪状态）？** → 常驻或 continuable 子 Agent。
3. **是独立可并行的执行活？** → 按需派生（一次性或 continuable）。

据此：

| 角色 | 归属 | 理由 |
|---|---|---|
| **PM** | **常驻主 Agent 兼任** | 需求澄清/范围确认必须与用户对话；用户是非技术背景，主 Agent 要把技术翻译成"用户能拍板的话" |
| **架构师/技术负责人** | **常驻主 Agent 兼任** | 技术选型是收口决策（向用户解释取舍），且决策依赖全流程上下文；可派一个"架构评审子 Agent"交叉挑刺（防自我一致偏见） |
| **任务分解** | **常驻主 Agent 亲自做** | 分派即权力；拆任务依赖全流程上下文，且"谁派活谁负责验收" |
| **工程师** | **按需派生（workflow 并行 / subagent continuable）** | 执行活、可并行、可后台跑；一个任务包一个子 Agent 避免上下文污染 |
| **QA** | **按需派生（continuable 子 Agent）** | 独立于开发（职责分离）；缺陷清单需跨轮次跟踪→continuable |
| **安全审计** | **按需派生（独立子 Agent）** | 强职责分离（审的人不能是写的人）；一次性为主 |
| **发布/运维** | **主 Agent 主导 + 可选子 Agent 预检** | 涉及凭据与对外操作，由主 Agent/用户侧执行更稳；预检可派子 Agent |
| **运营/宣传** | **按需派生（可 continuable）** | 文案/脚本并行产出；后续按用户反馈迭代可 continuable |

**核心原则**：**"用户主导式对话"意味着用户只面对一个主 Agent**——所有门禁、所有技术翻译、所有汇总都发生在主 Agent；子 Agent 是"看不见的团队"，只在主 Agent 汇报时以"工程师说/QA 报"的形式出现。这既满足用户"不愿说技术词汇"的体验，也符合 CrewAI manager/worker 分工与 AgentTeams 队长模型。

---

## 三、DSH 场景下的最佳实践（preset / skill / subagent / workflow / goal 配合）

### 3.1 主 Agent 承担什么

- **对话与翻译**：唯一的用户接口；把子 Agent 的技术产物翻译成大白话决策点。
- **门禁（Stage-Gate）**：每个阶段结束，主 Agent 汇总产物→列"继续/调整/打回"选项→用户确认→才进入下一阶段（这是本 preset 的核心价值，也是与"一把梭"产品的差异化）。
- **收口决策**：任务分解、技术选型、缺陷放行/打回、发布与否——都由主 Agent 定，子 Agent 只提供材料。
- **上下文主人**：主 Agent 持有全流程上下文（产品目标、用户偏好、决策历史）；子 Agent 每次只拿"任务包 + 相关产物片段"，不背全流程。

### 3.2 哪些阶段扇出子 Agent、用什么工具

| 场景 | 工具选择 | 理由 |
|---|---|---|
| 多主题并行调研（市场/竞品/技术可行性） | **workflow**（parallel，JSON schema 收结构化结论） | 一次性、互相独立、需要规范化输出便于汇总 |
| 多模块并行开发 | **workflow**（pipeline：先统一契约再并行实现）或多次 subagent | 并行扇出；模块间有依赖则用 pipeline 分阶段 |
| 单模块开发 + 后续修 bug | **subagent（continuable）** | 需要"记住自己写的代码"跨轮次修 |
| QA 测试 + 缺陷跟踪 | **subagent（continuable）** | 缺陷清单是跨轮次状态；QA 与工程师来回多轮 |
| 安全审计（多维度） | **workflow**（parallel：依赖/密钥/权限/注入各一）或单 subagent | 维度独立可并行；结果 JSON 化便于主 Agent 汇总 |
| 架构交叉评审、PRD 起草 | **subagent**（一次性即可） | 单任务、有明确产出，不需要持续成员 |
| 宣传物料（文案/脚本/图文） | **workflow**（parallel）或 subagent | 渠道间独立；若需按用户反馈迭代→continuable |

**选型判据一句话**：**"这活是一次性还是长期？独立还是耦合？"** —— 一次性+独立 → workflow；长期+有状态 → subagent continuable；耦合有依赖 → workflow pipeline 或主 Agent 串行。

### 3.3 Stage-Gate 在 Agent 协同里的实现

每阶段的标准循环（对应总表的"门禁"列）：

```
[阶段开始] 主 Agent 加载对应 skill（怎么干）
   → 派发子 Agent 任务（subagent/workflow）
   → 子 Agent 执行并回传结构化结果
   → 主 Agent 汇总 + 对照验收标准自检
   → 向用户展示"结果摘要 + 继续/调整/打回"
   → 用户确认 → [进入下一阶段]；否则 → 指派返工/调整
```

关键点：
- **每个门禁都落一个"产物文件 + 验收标准"**（如 PRD.md、design.md、TEST-REPORT.md），子 Agent 的 JSON 结果落盘，主 Agent 的汇总也落盘——形成项目档案，天然可回滚、可审计（与 MetaGPT 序列化恢复、AgentTeams 状态落盘一致）。
- **goal 工具**跨阶段跟踪"最终目标"，主 Agent 每次门禁汇报时对照 goal 检查是否偏离。
- 门禁的"确认"要**轻**：默认给"继续"选项，用户一句话即可放行（用户主导体验）。

### 3.4 skill 与 subagent 的配合：定义 vs 执行

- **skill（SKILL.md）= 方法的静态定义**："这个阶段该按什么 SOP 做、产出什么格式、注意什么坑"——**主 Agent 加载**，用来指导自己拆任务、写子 Agent 提示词、验收结果。
- **subagent = 方法的动态执行**：主 Agent 把"skill 的要点 + 具体任务 + 相关产物片段"打包成**任务提示词**派给子 Agent；子 Agent 不需要加载整套 skill，只需要一份聚焦的指令（省 token、防漂移）。
- 范式：`子 Agent 提示词 = skill 提炼的检查清单 + 任务目标 + 输入产物 + 输出格式(JSON schema) + 回传要求`。
- 这样 skill 只维护一份（改流程改 skill），所有阶段共享；子 Agent 提示词由主 Agent 按阶段组装。

---

## 四、推荐架构：产品团队模式 v2（落地规格）

### 4.1 架构总览

```
                用户（只对话、只确认）
                        │ 自然语言
                        ▼
        ┌───────────────────────────────────────┐
        │  常驻主 Agent（preset persona）        │
        │  = 主 Agent + PM + 技术负责人 + 门禁官      │
        │  持全流程上下文 + goal 跟踪             │
        │  工具：skill(6-8个) + subagent +       │
        │       workflow + goal + 文件/git/bash  │
        └──┬──────┬──────┬──────┬──────┬────────┘
           │派发   │派发   │派发   │派发   │汇总/门禁
           ▼      ▼      ▼      ▼      ▼
     调研子Agent 工程师子A  QA子A(cont) 审计子A  运营子A
     (workflow) (workflow (continuable, (独立,      (workflow/
                并行)    缺陷清单)    一次性)     subagent)
           └────────── 产物落盘(PRD/design/code/report) ──────────┘
```

### 4.2 逐阶段规格（可执行）

以下每个阶段格式：**阶段 N：主 Agent 用 skill X 指导 → 派生子 Agent 做 Y → 结果回传主 Agent 汇总给用户确认（Gate N）**。

- **阶段 0 启动**：主 Agent 加载愿景 skill → 与用户对话澄清（给谁用、解决什么问题、成功标准）→ Gate 0 对齐目标。
- **阶段 1 想法验证**：主 Agent 加载调研 skill，定 3 个调研维度 → **workflow 并行派 3 个调研子 Agent**（市场/竞品/技术可行性，JSON schema 收结论）→ 主 Agent 汇总成"值得做吗"一页纸 → **Gate 1 用户确认继续/调整/放弃**。
- **阶段 2 产品定义/PRD**：主 Agent 加载需求 skill，起草 PRD 骨架 → **派 1 个产品子 Agent** 按 skill 模板补全（用户故事、验收标准、竞品对照）→ 主 Agent 评审 + 把需求翻译成用户语言 → **Gate 2 PRD 确认**。
- **阶段 3 技术设计**：主 Agent 加载设计 skill，兼任架构师出方案（技术栈、模块、接口）→ **派 1 个架构评审子 Agent 交叉挑刺**（要求输出"问题清单+替代方案"）→ 主 Agent 采纳/反驳并**用大白话向用户解释取舍** → **Gate 3 方案确认**。
- **阶段 4 任务分解**：主 Agent 亲自拆任务包（含依赖与顺序），写入任务清单文件 → **Gate 4 任务计划展示给用户**（做几件事、先后顺序）。
- **阶段 5 开发实现**：主 Agent 加载开发 skill，为每个任务包写提示词 → **workflow 并行派多个工程师子 Agent**（依赖链则用 pipeline 分波；单个子 Agent 用 continuable 以便后续修）→ 子 Agent 实现 + 自测 + 回传变更摘要 → 主 Agent 汇总代码状态（改了什么、怎么验证）→ **Gate 5 代码完成确认**。
- **阶段 6 QA 测试**：主 Agent 加载 QA skill → **派 QA 子 Agent（continuable）**：写测试→运行→报缺陷（缺陷清单落盘）；有缺陷 → 主 Agent 指派对应工程师子 Agent（可唤醒原 continuable 会话）修复 → QA 回归 → **Gate 6 测试报告 + 缺陷清零确认**。
- **阶段 7 安全审计**：主 Agent 派**独立审计子 Agent**（与开发分离）按检查清单审依赖/密钥/权限/注入 → 报告 JSON 落盘 → 主 Agent 决策风险项 → **Gate 7 审计结论确认**（高风险项必须修复后才放行）。
- **阶段 8 发布准备**：主 Agent 加载发布 skill，走发布检查清单（版本号、README、CI、Release 规范，参照已落实的 GitHub 发布标准）→ 可选派 1 个发布子 Agent 预检 → **Gate 8 发布就绪确认**。
- **阶段 9 部署上线**：主 Agent 主导执行（tag、Release、部署命令）；失败则回环修 → **Gate 9 上线成功确认**（链接可用）。
- **阶段 10 宣传推广**：主 Agent 加载宣传 skill，定角度/渠道 → **派 1–2 个运营子 Agent** 产文案/脚本/图文（并行）→ 主 Agent 汇总 → **Gate 10 物料审阅**（用户本人要用这些发抖音/文章，必须亲自确认）。
- **阶段 11 运营迭代**：派运营子 Agent 产运营计划/复盘（可选）→ 主 Agent 汇总反馈 → **Gate 11 复盘 + 迭代方向确认** → 回到阶段 1，continuable 子 Agent 的记忆被复用。
- **贯穿**：goal 工具保持"最终目标"跟踪；主 Agent 每阶段向 goal 汇报一次进展。

### 4.3 建议的 preset 资产清单（v2 相比 v1 的增量）

| 资产 | v1（现状） | v2（建议） | 说明 |
|---|---|---|---|
| persona | 单 Agent 多角色 | 主 Agent = PM+技术负责人+门禁官 | persona 明确"常驻收口、派生干活" |
| skill | 6 个（愿景/需求/设计/开发/QA/发布） | 6 个 + 调研 + 宣传 + 运营（或并入） | 每个 skill 增加"本阶段子 Agent 派发模板与验收标准"一节 |
| subagent | 未用 | 工程师/QA/审计/运营按需派生（QA 等用 continuable） | 子 Agent 提示词模板：任务+输入产物+JSON 输出 schema |
| workflow | 未用 | 阶段 1/5/6/7/10 扇出脚本 | 每个 workflow 配 JSON schema 收结果 |
| goal | 未用 | 跨阶段目标跟踪 | 门禁对照 |

### 4.4 落地建议（实现顺序）

1. **先做最小闭环**：主 Agent persona + 阶段门禁循环（0–3、5–6），只加"工程师子 Agent（workflow 并行）"和"QA 子 Agent（continuable）"两个派生点，其余阶段保持主 Agent 直做——验证扇出收益。
2. **再加审查/审计**：架构评审子 Agent、安全审计子 Agent（职责分离是质量提升最明显的一步）。
3. **最后加运营/宣传**：物料生成是用户要亲自用的，放最后且必须接 Gate 10 审阅。
4. **对照 dsh-agent-teams**：若需要"任务依赖状态可视化/成员邮箱"，可评估直接复用该插件；若只需主 Agent 收口，用内置 subagent/workflow 更轻。

---

## 五、明确推荐结论

1. **"1 常驻主 Agent + N 按需派生子 Agent"是唯一符合"用户主导式对话"的架构**：用户只面对一个主 Agent（对话、翻译、门禁），子 Agent 是不可见的执行层。这同时是 CrewAI hierarchical、MetaGPT SOP 流水线、dsh-agent-teams 队长模型交叉验证的形态。
2. **主 Agent 兼任 PM/架构师/任务分解，是刻意的职责设计而非妥协**：这些角色都需要"全流程上下文 + 与用户收口决策"，派给子 Agent 反而制造上下文断层。子 Agent 只承担**可并行、可隔离、需要独立视角**的活（实现、测试、审计、调研、物料）。
3. **编排以 orchestrator 调度为主，角色间直接对话仅用于"审查/挑刺"子场景**（架构评审、代码审查），避免 ChatDev/AutoGen Group Chat 式自由对话的成本与失控风险。
4. **质量靠"结构化的双保险"**：工程师子 Agent 先自审（LGTM/LBTM 思路）→ 独立的 QA/安全审计子 Agent 再审（职责分离）→ 主 Agent 门禁汇总给用户。这是综述统计中最有效的组合（Role-Based Cooperation + Self/Cross-Reflection）。
5. **工具分工一句话**：**subagent(continuable) 给"长期成员"，workflow 给"一次性扇出"，skill 定义"怎么干"，子 Agent 执行"去干"，主 Agent 裁决"对不对、继续不继续"**；每个门禁落盘产物文件，goal 贯穿跟踪。
6. **落地顺序**：先最小闭环（门禁 + 工程师扇出 + QA 扇出）验证，再补审计与宣传；必要时对照 dsh-agent-teams 增强任务可视化。

---

## 参考来源

- MetaGPT 论文《Meta Programming for a Multi-Agent Collaborative Framework》: https://arxiv.org/abs/2308.00352 ；DeepWiki 角色与工作流详解: https://deepwiki.com/FoundationAgents/MetaGPT/5.1-standard-development-roles
- ChatDev《Communicative Agents for Software Development》(ACL 2024): https://aclanthology.org/2024.acl-long.810/ ；机制解读: https://cloud.tencent.cn/developer/article/2486597
- CrewAI Processes 文档（Sequential/Hierarchical）: https://docs.crewai.com/v1.15.5/en/concepts/processes
- AutoGen Conversation Patterns（two-agent/sequential carryover/group chat/nested chat）: https://microsoft.github.io/autogen/0.2/docs/tutorial/conversation-patterns/ ；AutoGen→Agent Framework 迁移指南: https://learn.microsoft.com/agent-framework/migration-guide/from-autogen/
- OpenHands（CodeAct Agent、MACS 多 Agent 提案）: https://github.com/OpenHands/OpenHands
- dsh-agent-teams（DSH 队长式团队协议插件）: https://github.com/NanmiCoder/dsh-agent-teams
- 《LLM-Based Multi-Agent Systems for Software Engineering: Literature Review, Vision, and the Road Ahead》: https://dlnext.acm.org/doi/full/10.1145/3712003
- 《Designing LLM-based MAS for SE Tasks: Quality Attributes, Design Patterns and Rationale》: https://www.alphaxiv.org/overview/2511.08475
- 《Large Language Model-Based Agents for Software Engineering: A Survey》: https://arxiv.org/abs/2409.02977 ；论文清单: https://github.com/FudanSELab/Agent4SE-Paper-List
