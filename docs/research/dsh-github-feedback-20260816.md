# DSH 官方 GitHub 反馈调研（2026-08-16）

> 调研目的：确认"tool-cordis 同进程互斥"缺陷是否被官方收到、是否有更新/修复。
> 调研通道：KUN exec → gh api（用户指示所有 GitHub 操作走 KUN）。

## 核心结论

1. **缺陷已被真实用户报告**（8-14，Windows/Linux 双平台），与我们的发现完全一致。
2. **官方自 8-13 发布后零更新**：最后一次推送 2026-08-13T13:00:21Z，npm 最新仍为 0.1.0-rc.6，至今未修复。
3. **官方关闭 Issues、仅开 Discussions**，用户反馈集中在讨论区（1100+ 条）。

## 直接相关的用户报告

| 编号 | 标题 | 日期 | 平台 | 要点 |
|---|---|---|---|---|
| #818 | 新对话开不了 | 8-14 | Windows | 报错 `Host Cordis inspect provider "Service" is already registered`；评论区有精准诊断（引用 dsh-tool-cordis apply 注册 4 个 Host Inspect Provider + cordisInspect 进程级单例 + providers.has 即 throw），与我们 8-15 实测结论一致 |
| #1079 | [BUG] Editing a preset composition breaks new sessions permanently | 8-14 | Linux | 根因：AgentPresets.ensureStanding 组合变更后旧 scope 未 dispose（源码 TODO 承认缺失 reclaim）；复现=先开 cordis 会话→touch 组合文件→再开 cordis 会话→持久失败；建议=refcounted reclaim 或允许重复注册 |
| #963 | [Design/BUG] 动态插件把工具注册进全局作用域 | 8-14 | Windows | 动态插件工具进全局层，一个会话的增删连累所有会话提示词缓存（烧 token）；社区缓解插件 dsh-progressive-tools |

其他相关：#870（创造模式插件会话级、重启丢失）、#285（创造模式"没玩明白"）、#886（创造模式正面反馈）、#29（web 无法热切模式）。

## 仓库概况（2026-08-16 查询）

- 全名 deepseek-ai/deepseek-harness，MIT，public，默认分支 master
- 建仓 2026-08-13T11:56:32Z；最后推送 2026-08-13T13:00:21Z（**之后零推送**）
- Stars 108,835 / Forks 10,471 / Watchers 435
- has_issues=false（关闭 Issue 功能），has_discussions=true（反馈集中地）
- 核心贡献者：tianyicui(5235) / LegGasai(1361) / imccyu(1168) 等，社区无代码提交入口
- 版本历史：rc.1(8-10) → rc.2/rc.3(8-13) → rc.6(8-13) 即 npm 最新

## 待跟踪

- DSH 官方发布 ≥0.1.0-rc.7 / 1.0.0 时，验证 #818/#1079 所述缺陷是否修复（cordisInspect.register 幂等或 scope reclaim）
- 修复后更新 MEMORY.md 中的"同进程互斥"条目与 vpt 已知问题清单
