#!/usr/bin/env python3
"""Anthropic 文章自动收录(2026-11-15 Jason:「anthropic 的文章记得定时更新上,他们的水平很不错」)。

发现:抓 anthropic.com/engineering 与 /research 两个列表页,页面里内嵌的文章数据带
     title / slug / publishedOn / category —— 比 sitemap 可靠(sitemap 的 lastmod 被整站批量刷成同一天,
     且 Engineering 文章根本不在 sitemap 里)。Engineering 文章已迁到 /research/<slug>(旧地址 308 跳转),
     所以一律按 slug 去重、按 /research/<slug> 收。
收录范围:Engineering 页里 category=Engineering 的 + Research 页里真正链到 /research/<slug> 的;
     不收 /news(产品/融资公告)。
门禁:add_article → postingest.sh → verify_site.js,全绿才推 master;任一步挂 → 本轮成果提交到
     fix/anthropic-<日期> 分支、切回 master、弹通知,线上不受影响。
状态:pipeline/anthropic_watch_state.json 记每个 slug 的尝试次数,失败 3 次不再自动重试(看日志人工处理)。

  python3 pipeline/anthropic_watch.py                 # 日常:近 21 天发布、站内没有的
  python3 pipeline/anthropic_watch.py --since 2026-09-01   # 补收某日之后的
  python3 pipeline/anthropic_watch.py --dry-run       # 只列候选
需要 DEEPSEEK_API_KEY(run_anthropic_watch.sh 从 aipodcast 的 pipeline/.env 加载)。
"""
import argparse, json, os, re, socket, subprocess, sys, time
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOG = ROOT / "pipeline" / "anthropic_watch.log"
STATE = ROOT / "pipeline" / "anthropic_watch_state.json"
CLASH = "http://127.0.0.1:7890"
EMAIL = "jason3535@users.noreply.github.com"   # 公开仓库只许 noreply(仓库本地配置曾是 gmail,别依赖它)
MAX_PER_RUN = 4                                  # 一轮最多收几篇,DeepSeek 单进程串行,别把一轮拖太久
FIELD_BY_CAT = {"Engineering": ["nlp"], "Alignment": ["safety"], "Interpretability": ["safety"],
                "Safeguards": ["safety"], "Frontier Red Team": ["safety"], "Policy": ["safety"],
                "Societal Impacts": ["safety"], "Science": ["deep-learning"], "Economics": ["nlp"]}


def log(msg):
    line = f"[{datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%MZ')}] {msg}"
    if sys.stdout.isatty(): print(line, flush=True)   # cron 下 stdout 已重定向进同一个日志,别写两遍
    with open(LOG, "a", encoding="utf-8") as f: f.write(line + "\n")


def clash_up():
    try:
        with socket.create_connection(("127.0.0.1", 7890), timeout=1): return True
    except OSError: return False


def run(cmd, timeout=3600, env=None):
    p = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, timeout=timeout, env=env)
    return p.returncode, (p.stdout or "") + (p.stderr or "")


def git(args, net=False):
    pre = ["git", "-c", f"user.email={EMAIL}", "-c", "user.name=jason3535"]
    if net and clash_up(): pre += ["-c", f"http.proxy={CLASH}"]
    for i in range(3 if net else 1):
        rc, out = run(pre + args, timeout=300)
        if rc == 0 or not net or not re.search(r"unable to access|timed out|Could not resolve|Connection|SSL", out): return rc, out
        time.sleep((20, 60, 0)[i])
    return rc, out


def notify(title, msg):
    try: subprocess.run(["osascript", "-e", f'display notification "{msg[:180]}" with title "{title}"'], timeout=10)
    except Exception: pass


def fetch(url):
    cmd = ["curl", "-sL", "--max-time", "60", "-A", "Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/130 Safari/537.36", url]
    if clash_up(): cmd[1:1] = ["-x", CLASH]
    return subprocess.run(cmd, capture_output=True, text=True, timeout=90).stdout or ""


ITEM = re.compile(r'"title":"((?:[^"\\]|\\.)+)","slug":\{"current":"([a-z0-9-]+)"\}.{0,300}?'
                  r'"publishedOn":"(\d{4}-\d\d-\d\d)"(?:,"category":"([^"]*)")?', re.S)


def discover():
    found = {}
    for sec in ("engineering", "research"):
        html = fetch(f"https://www.anthropic.com/{sec}").replace('\\"', '"')
        if len(html) < 50000: raise RuntimeError(f"/{sec} 列表页抓取异常(长度 {len(html)})")
        linked = set(re.findall(r'href="/research/([a-z0-9-]+)"', html))
        n = 0
        for t, slug, d, cat in ITEM.findall(html):
            cat = cat or ""
            if (sec == "engineering" and cat == "Engineering") or (sec == "research" and slug in linked):
                found.setdefault(slug, {"slug": slug, "title": t, "date": d, "cat": cat}); n += 1
        if n == 0: raise RuntimeError(f"/{sec} 解析出 0 篇,页面结构可能变了")
    return found


def site_slugs():
    s = (ROOT / "app.js").read_text(encoding="utf-8")
    return set(re.findall(r"anthropic\.com/(?:engineering|research|news)/([a-z0-9-]+)", s))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--since", default=""); ap.add_argument("--days", type=int, default=21)
    ap.add_argument("--dry-run", action="store_true"); ap.add_argument("--max", type=int, default=MAX_PER_RUN)
    a = ap.parse_args()
    since = a.since or (datetime.now() - timedelta(days=a.days)).strftime("%Y-%m-%d")
    log(f"=== anthropic_watch 启动 since={since} dry={a.dry_run} ===")

    if not a.dry_run:
        rc, out = git(["status", "--porcelain"])
        if out.strip():
            log("工作区有未提交改动,本轮跳过(先人工处理):\n" + out[:400]); notify("AI Paper · Anthropic", "工作区不干净,本轮跳过"); return
        rc, out = git(["pull", "-q", "--ff-only", "origin", "master"], net=True)
        if rc: log("pull 失败,跳过:" + out[-200:]); return

    try: items = discover()
    except Exception as e:
        log(f"✗ 发现失败:{e}"); notify("AI Paper · Anthropic", f"发现失败:{e}"); return
    have, st = site_slugs(), (json.loads(STATE.read_text()) if STATE.exists() else {})
    cands = sorted([x for x in items.values() if x["date"] >= since and x["slug"] not in have
                    and st.get(x["slug"], {}).get("tries", 0) < 3], key=lambda x: x["date"])
    log(f"列表 {len(items)} 篇,站内已有 {sum(s in have for s in items)},候选 {len(cands)}:"
        + ", ".join(f"{x['date']} {x['slug']}" for x in cands))
    if a.dry_run or not cands: log("=== 完成(无新收) ==="); return

    env = dict(os.environ)
    if clash_up(): env.update(HTTPS_PROXY=CLASH, HTTP_PROXY=CLASH)
    new_ids = []
    for x in cands[:a.max]:
        url = f"https://www.anthropic.com/research/{x['slug']}"
        label = "Anthropic Engineering" if x["cat"] == "Engineering" else "Anthropic Research"
        fields = ",".join(FIELD_BY_CAT.get(x["cat"], ["nlp"]))
        log(f"  收录 {x['date']} [{x['cat'] or '-'}] {x['title'][:60]}")
        rc, out = run(["python3", "pipeline/add_article.py", "--url", url, "--pid", "anthropic", "--org", "Anthropic",
                       "--label", label, "--fields", fields, "--date", x["date"]], timeout=3600, env=env)
        st.setdefault(x["slug"], {"tries": 0})["tries"] += 1
        pid = f"anthropic-{x['slug'][:48]}"
        if rc == 0 and (ROOT / "data" / f"{pid}.json").exists():
            new_ids.append(pid); st[x["slug"]]["ok"] = pid; log(f"    ✓ {pid}")
        else:
            log(f"    ✗ add_article rc={rc}:{out.strip()[-300:]}")
    STATE.write_text(json.dumps(st, ensure_ascii=False, indent=1))
    if not new_ids:
        git(["checkout", "--", "."]); git(["clean", "-fdq", "--", "data", "p", "pp"])
        log("=== 完成(全部失败,已还原工作区) ==="); notify("AI Paper · Anthropic", "本轮收录全部失败,见日志"); return

    bad = ""
    rc, out = run(["bash", "pipeline/postingest.sh"] + new_ids, timeout=3600, env=env)
    if rc: bad = "postingest:\n" + out[-800:]
    else:
        rc, out = run(["node", "pipeline/verify_site.js", "--quiet"] + new_ids, timeout=1800, env=env)
        if rc: bad = "verify_site:\n" + out[-800:]
    msg = f"content: Anthropic 自动收录 +{len(new_ids)} 篇（{', '.join(new_ids)}）"
    if bad:
        br = "fix/anthropic-" + datetime.now().strftime("%Y%m%d")
        git(["checkout", "-q", "-B", br]); git(["add", "-A"])
        git(["commit", "-q", "-m", msg + "(门禁未通过,待人工修)", "-m", bad[-1500:]])
        git(["checkout", "-q", "master"])
        log(f"✗ 门禁未通过,成果在分支 {br}:\n{bad}"); notify("AI Paper · Anthropic", f"{len(new_ids)} 篇已收但门禁没过,见分支 {br}"); return
    # 配图写在图床仓库(add_article.host_fig),它不会自己提交 —— 不先推,线上文章的图全是 404(2026-11-15 首轮漏过)
    figs = Path.home() / "CascadeProjects" / "aipaper-figs"
    pre = ["git", "-C", str(figs), "-c", f"user.email={EMAIL}", "-c", "user.name=jason3535"]
    if run(pre + ["status", "--porcelain"])[1].strip():
        run(pre + ["add", "-A"]); run(pre + ["commit", "-q", "-m", f"figs: Anthropic 自动收录 {len(new_ids)} 篇配图"])
        rc, out = run(pre + (["-c", f"http.proxy={CLASH}"] if clash_up() else []) + ["push", "-q", "origin", "HEAD"], timeout=600)
        if rc:
            log("✗ 图床 push 失败,文章先不上线(本地已提交,下次运行前需人工推):" + out[-200:])
            notify("AI Paper · Anthropic", "图床 push 失败,文章未上线"); return
        log("  ✓ 图床已推送")
    git(["add", "-A"])
    git(["commit", "-q", "-m", msg, "-m", "由 pipeline/anthropic_watch.py 自动收录"])
    rc, out = git(["push", "-q", "origin", "master"], net=True)
    log(("✓ 已推送上线:" if rc == 0 else "✗ push 失败(本地已提交,下次运行前需人工推):") + " ".join(new_ids) + ("" if rc == 0 else out[-200:]))
    notify("AI Paper · Anthropic", (f"已上线 {len(new_ids)} 篇" if rc == 0 else "已收录但 push 失败"))
    log("=== 完成 ===")


if __name__ == "__main__":
    main()
