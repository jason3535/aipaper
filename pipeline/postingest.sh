#!/bin/zsh
# postingest.sh — 收录/改动后的唯一收尾入口:全部重建 + 全部门禁,一步到位。
# 用法: pipeline/postingest.sh [新收id ...]
#   传 id → 先对新收条目跑 audit_paper 质检门禁(FAIL 即中止,不进入重建)
#   任何一步非零退出即中止;全部通过才可 git commit。
# 背景:这条链以前靠人手敲(README 一行 &&),会话间反复漏项——漏 build_related 推荐用旧数据、
# 漏 build_people MCP 学者层过期、漏 webp 头像流量翻倍、漏 gen_feed RSS 停更。固化于此。
set -e
cd "$(dirname "$0")/.."

ids=("$@")
if (( ${#ids} )); then
  echo "── 0/8 新收条目质检(audit_paper)"
  node pipeline/audit_paper.js "${ids[@]}"
fi

echo "── 1/8 首屏瘦身(slim_index)"
python3 pipeline/slim_index.py | tail -1
echo "── 2/8 分享页 + sitemap + llms.txt(build_share_pages)"
node pipeline/build_share_pages.js | tail -1
echo "── 3/8 Ask/检索/MCP 目录(build_index,带非空率门禁)"
node pipeline/build_index.js | tail -1
echo "── 4/8 MCP 学者层(build_people,带门禁)"
node pipeline/build_people.js | tail -1
echo "── 5/8 「接着读」相关度(build_related,带门禁)"
node pipeline/build_related.js | tail -1
echo "── 6/8 RSS(gen_feed)"
python3 pipeline/gen_feed.py | tail -1
echo "── 7/8 头像 WebP(webp_avatars)"
python3 pipeline/webp_avatars.py | tail -1
echo "── 7.5/8 站群互链闭环(build_crosslinks,工具在 aipodcast 仓库)"
python3 /Users/jason/CascadeProjects/aipodcast/pipeline/build_crosslinks.py --apply | tail -3
echo "── 7.6/8 更新提醒(push-latest.json + 浏览器推送)"
# 只在传了新收 id 时才真发;失败不阻断提交
python3 /Users/jason/CascadeProjects/aipodcast/pipeline/push_notify.py --site aipaper --ids "${ids[@]}" || echo "  ⚠ 推送环节失败(不阻断)"
echo "── 7.7/8 主动推给搜索引擎(IndexNow,工具在 aipodcast 仓库)"
python3 /Users/jason/CascadeProjects/aipodcast/pipeline/indexnow.py --site aipaper || echo "  ⚠ IndexNow 推送失败(不阻断)"
echo "── 8/8 app.js 语法门禁"
node -e 'new Function(require("fs").readFileSync("app.js","utf8")); console.log("app.js 语法 OK")'

echo "\n✅ postingest 全部通过,可以 git add -A && git commit && git push"
