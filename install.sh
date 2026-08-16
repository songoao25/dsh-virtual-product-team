#!/usr/bin/env bash
# 产品团队模式（dsh-virtual-product-team）— 一键安装脚本
# 用法：./install.sh
# 作用：把 preset 安装到 DSH 用户级预设目录（~/.dsh/.agent-presets/），
#       新建对话时即可选择「产品团队模式」。
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PRESET_DIR="$ROOT/preset"
TARGET="$HOME/.dsh/.agent-presets/dsh-virtual-product-team"

command -v dsh >/dev/null 2>&1 || { echo "错误：未找到 dsh CLI（请先安装 DeepSeek Harness）"; exit 1; }

mkdir -p "$HOME/.dsh/.agent-presets"

if [ -d "$TARGET" ]; then
  echo "==> 检测到已安装，更新中…"
  rm -rf "$TARGET"
fi

cp -R "$PRESET_DIR" "$TARGET"
find "$TARGET" -type d -exec chmod 755 {} \;
find "$TARGET" -type f -exec chmod 644 {} \;

echo
echo "✔ 安装完成。"
echo '  下一步：新建一个对话 → 模式选择器选「产品团队模式」→ 说"我有个想法……"'
echo "  卸载：./uninstall.sh"
