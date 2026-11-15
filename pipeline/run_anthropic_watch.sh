#!/bin/bash
# launchd 入口:补 PATH、加载 DeepSeek 密钥(与播客站共用 .env),跑 Anthropic 自动收录。
# 2026-11-15:brew 升级 yt-dlp 时把默认 python3 换成了 3.15,流水线依赖(bs4/PIL/onnxruntime…)都装在 3.14 → 锁定 3.14
export PATH="$HOME/.local/py314bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$HOME/.npm-global/bin"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT" || exit 1
ENVF="$HOME/CascadeProjects/aipodcast/pipeline/.env"
[ -f "$ENVF" ] && { set -a; . "$ENVF"; set +a; }
# 播客站自动保鲜(09:17)还在跑就等它:DeepSeek 同 key 双进程并发会大面积空响应(paper-ingest 硬规则 #2)
for i in $(seq 1 60); do pgrep -f "aipodcast/pipeline/auto_refresh.py|pipeline/auto_refresh.py" >/dev/null || break; sleep 60; done
echo "===== $(date) anthropic_watch start =====" >> pipeline/anthropic_watch.log
python3 -c "import bs4,PIL" || { echo "✗ python3 缺依赖($(command -v python3))" >> pipeline/anthropic_watch.log; exit 1; }
python3 pipeline/anthropic_watch.py "$@" >> pipeline/anthropic_watch.log 2>&1
echo "===== $(date) exit $? =====" >> pipeline/anthropic_watch.log
