#!/bin/bash
# launchd 入口:补 PATH、加载 DeepSeek 密钥(与播客站共用 .env),跑 Anthropic 自动收录。
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$HOME/.npm-global/bin"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT" || exit 1
ENVF="$HOME/CascadeProjects/aipodcast/pipeline/.env"
[ -f "$ENVF" ] && { set -a; . "$ENVF"; set +a; }
# 播客站自动保鲜(09:17)还在跑就等它:DeepSeek 同 key 双进程并发会大面积空响应(paper-ingest 硬规则 #2)
for i in $(seq 1 60); do pgrep -f "aipodcast/pipeline/auto_refresh.py|pipeline/auto_refresh.py" >/dev/null || break; sleep 60; done
echo "===== $(date) anthropic_watch start =====" >> pipeline/anthropic_watch.log
python3 pipeline/anthropic_watch.py "$@" >> pipeline/anthropic_watch.log 2>&1
echo "===== $(date) exit $? =====" >> pipeline/anthropic_watch.log
