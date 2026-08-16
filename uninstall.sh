#!/usr/bin/env bash
# 产品团队模式（dsh-virtual-product-team）— 一键卸载脚本
# 用法：./uninstall.sh
# 作用：移除已安装的预设。卸载后新建对话即恢复默认模式，无残留、不影响其他模式。
set -euo pipefail

TARGET="$HOME/.dsh/.agent-presets/dsh-virtual-product-team"

if [ ! -d "$TARGET" ]; then
  echo "未检测到已安装的产品团队模式，无需卸载。"
  exit 0
fi

rm -rf "$TARGET"
echo "✔ 已卸载。新建对话后即恢复默认模式（无残留，不影响其他模式）。"
