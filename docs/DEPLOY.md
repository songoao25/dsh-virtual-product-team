# 部署记录：产品团队模式 v1.1.0

> 日期：2026-08-16

## 部署方式

产品为 DSH 对话模式（agent preset），部署 = 安装到 DSH 用户级预设目录：

```bash
cd /Users/songsong/Code/virtual-product-team
./install.sh
# 或全新安装：git clone <仓库> && ./install.sh
```

已执行（T4）：install.sh 实测通过 → `~/.dsh/.agent-presets/virtual-product-team/` 更新完成。

## 冒烟测试结果

| 检查项 | 结果 |
|---|---|
| 安装脚本执行（检测已安装 → 覆盖更新） | ✅ 通过 |
| 仓库版与已装版一致性（diff -r） | ✅ 完全一致 |
| 运行时技能挂载（会话技能目录出现 cordis-plugin-development / editing-cordis-compositions） | ✅ 已生效 |
| 8 阶段技能 + 2 工艺技能共 10 个技能目录 | ✅ 齐全 |
| GitHub Release v1.1.0 可访问 | ✅ 已上线 |

## 回滚方案

- **卸载**：`./uninstall.sh`——删除预设目录，恢复默认模式，无残留、不影响其他模式；
- **回滚到 v1.0.0**：`git checkout v1.0.0 -- preset && ./install.sh`（或重新 clone 后 checkout v1.0.0 再安装）；
- 发布历史：v1.0.0（基础版 8 阶段）→ v1.1.0（+自我改造能力），任一出问题可退到前一版。

## 上线检查清单

- [x] 安装完成（install.sh 实测）
- [x] 安装副本与仓库一致（diff 通过）
- [x] 运行时生效（技能目录可见）
- [x] 对外发布完成（GitHub Release v1.1.0）
- [x] 回滚方案明确（uninstall / checkout v1.0.0）
