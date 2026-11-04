#!/usr/bin/env python3
"""verify_site.py — 推送前的用户可见校验。

本地静态服务打开 /p/<id>/,用 Playwright 无头 Chrome 模拟会执行 JS 的链接预览
(飞书 / Lark 那种:UA 里没有 bot/headless/preview,所以会走分享页的原地接管),
再加一次不执行 JS 的原始 HTML 抓取。失败非零退出。

同时调用仓库里已有的只读门禁,不另写一套规则:
  node pipeline/gate_fast.js          语法 / app.js 版本号 / 静态页埋点
  node pipeline/audit_paper.js        条目质检
  python3 pipeline/audit_filing.py    长文结构

用法:
  python3 pipeline/verify_site.py
  python3 pipeline/verify_site.py --ids a,b
  python3 pipeline/verify_site.py --all-sample 3
  python3 pipeline/verify_site.py --live --ids a
  SKIP_VERIFY=1 只对 git pre-push 钩子生效,脚本本身不会因此跳过。
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
import threading
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://aipaper.jasonlin.tech"
HOME_TITLE = "AI Paper · 双语论文阅读站"
HOME_DESC_PREFIX = "著名 AI 学者与他们的代表论文"
# 分享页用这段正则决定要不要原地接管。命中则只留下静态摘要,详情视图不会出现,
# 也就测不到飞书跟跳转那个坑。Playwright 默认 UA 含 HeadlessChrome,必须换掉。
LARK_UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/131.0.0.0 Safari/537.36 LarkUrl/1.0"
)
ID_RE = re.compile(r"^[A-Za-z0-9._-]+$")
SKIP_DATA = {"index.json", "summaries.json", "related.json", "people.json"}
SHELL_FILES = {"app.js", "index.html", "pipeline/build_share_pages.js"}
SHELL_SAMPLE = 3

META_JS = r"""
const fs = require("fs");
const path = require("path");
const root = process.cwd();
const h = fs.readFileSync(path.join(root, "app.js"), "utf8");
const PAPERS = JSON.parse(h.match(/const PAPERS = ([\s\S]*?);\s*\n\/\* PAPERS_END \*\//)[1]);
const PEOPLE = eval("(" + h.match(/const PEOPLE=(\{[\s\S]*?\n\});/)[1] + ")");
const want = new Set(process.argv.slice(1).filter(a => /^[A-Za-z0-9._-]+$/.test(a)));
const out = {};
for (const p of PAPERS) {
  if (!want.has(p.id)) continue;
  const pe = PEOPLE[p.pid] || {};
  let d = {};
  try { d = JSON.parse(fs.readFileSync(path.join(root, "data", p.id + ".json"), "utf8")); } catch (e) {}
  const contrib = (d.insights && d.insights.contrib) || [];
  const kp = contrib[0] && contrib[0].zh ? "｜核心贡献：" + contrib[0].zh : "";
  const title = (p.tZh || p.tEn) + " · " + (pe.zh || pe.en || "") + " — AI Paper";
  const desc = (p.sZh || p.sEn || "") + kp;
  const og = fs.existsSync(path.join(root, "og", "p", p.id + ".jpg"))
    ? "https://aipaper.jasonlin.tech/og/p/" + p.id + ".jpg"
    : "https://aipaper.jasonlin.tech/assets/og.png";
  out[p.id] = {title, desc, og, tEn: p.tEn || "", tZh: p.tZh || ""};
}
const missing = [...want].filter(id => !out[id]);
if (missing.length) {
  console.error("PAPERS 里没有: " + missing.join(", "));
  process.exit(2);
}
process.stdout.write(JSON.stringify(out));
"""

# 在已经打开的详情页里跑。对齐 app.js 的 renderItem / mdHtml / isTblPara。
DOM_JS = r"""
async (arg) => {
  const id = arg.id;
  const fails = [];
  const notes = [];
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const esc = (s) => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const cleanZh = (t) => {
    if (!t) return t || "";
    return String(t).replace(/([一-鿿])\s+(?=[一-鿿])/g, "$1")
      .replace(/([一-鿿])\s+([，。、；：？！）】」』])/g, "$1$2")
      .replace(/([（【「『])\s+([一-鿿])/g, "$1$2")
      .replace(/ {2,}/g, " ");
  };
  const expectedLists = (raw) => {
    if (!raw) return [];
    let t = cleanZh(String(raw)).replace(/\r/g, "");
    t = t.replace(/\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)/g, " ");
    let s = esc(t);
    s = s.replace(/```[a-zA-Z]*\n?([\s\S]*?)```/g, " ");
    s = s.replace(/`([^`\n]+)`/g, " ");
    const lists = [];
    let cur = null;
    const close = () => { if (cur) { lists.push(cur); cur = null; } };
    for (const line of s.split("\n")) {
      const m = line.match(/^\s*(\d+)[.)]\s+(.*)$/);
      if (m) {
        if (!cur) cur = {start: +m[1], count: 0};
        cur.count++;
      } else close();
    }
    close();
    return lists;
  };
  const isTbl = (t) => {
    if (!t || String(t).indexOf(" · ") < 0) return false;
    const ls = String(t).split("\n");
    return ls.length > 1 || ls[0].split(" · ").length >= 3;
  };

  const path = location.pathname;
  const wantPath = "/p/" + id + "/";
  if (path !== wantPath && path !== "/p/" + id + "/index.html") {
    fails.push("地址没有停在 " + wantPath + " ,现在是 " + path + location.hash + " (分享链接被带去了别的页)");
  }
  const hash = (location.hash || "").split("?")[0];
  if (hash !== "#/paper/" + id) {
    fails.push("hash 不是 #/paper/" + id + " ,现在是 " + (location.hash || "(空)"));
  }
  if (!document.body || document.body.dataset.route !== "paper") {
    fails.push("没有渲染详情视图(data-route=" + (document.body && document.body.dataset.route || "无") + ")");
  }
  const h1 = document.querySelector("h1");
  const h1t = h1 ? h1.textContent.replace(/\s+/g, " ").trim() : "";
  if (!h1t || h1t.indexOf(String(arg.tEn).replace(/\s+/g, " ").trim()) < 0) {
    fails.push("详情标题不是这篇的英文题: " + (h1t || "(没有 h1)").slice(0, 120));
  }
  const reader = document.querySelector(".reader");
  if (reader && /全文加载失败/.test(reader.textContent || "")) fails.push("全文加载失败");

  let data = null;
  try {
    const r = await fetch("data/" + id + ".json", {credentials: "same-origin"});
    if (!r.ok) throw new Error(String(r.status));
    data = await r.json();
  } catch (e) {
    fails.push("拉不到 data/" + id + ".json (" + e + ")");
  }

  if (data) {
    const secs = (data.full || []).filter(s => !/^abstract$/i.test(s.sec));
    const items = [];
    for (const s of secs) {
      const arr = s.items ? s.items : (s.paras || []).map(pa => ({t: "para", en: pa.en, zh: pa.zh}));
      for (const it of arr) items.push(it || {});
    }
    const figs = items.filter(it => it.t === "fig");
    const paras = items.filter(it => it.t !== "fig" && it.t !== "eq");
    const domParas = [...document.querySelectorAll(".reader .para")];
    const bodyText = domParas.map(p => p.innerText || "").join("").replace(/\s+/g, " ").trim();
    if (!domParas.length || bodyText.length < 40) fails.push("正文段落没有渲染出来");
    else notes.push("正文 " + domParas.length + " 段");
    if (domParas.length !== paras.length) {
      fails.push("正文段落数对不上: 页面 " + domParas.length + " 段, data " + paras.length + " 段");
    } else {
      let tbl = 0, ols = 0;
      domParas.forEach((dom, i) => {
        const it = paras[i];
        if (isTbl(it.en)) {
          tbl++;
          for (const col of [".en", ".zh"]) {
            const table = dom.querySelector(":scope > " + col + " table.ftbl");
            if (!table) fails.push("第 " + (i + 1) + " 段应是表格, " + col + " 里没有 <table class=ftbl>");
            else if (!table.querySelector("tr")) fails.push("第 " + (i + 1) + " 段表格没有行");
          }
          return;
        }
        for (const col of ["en", "zh"]) {
          const exp = expectedLists(it[col] || "");
          const found = [...dom.querySelectorAll(":scope > ." + col + " > ol.cml")];
          if (exp.length !== found.length) {
            const snip = String(it[col] || "").replace(/\s+/g, " ").trim().slice(0, 72);
            fails.push("." + col + " 第 " + (i + 1) + " 段有序列表数量不对: 页面 " + found.length + " 个, 原文 " + exp.length + " 个 (" + snip + ")");
            continue;
          }
          exp.forEach((list, li) => {
            ols++;
            const ol = found[li];
            // ol.start 是序号的 IDL:没写 start 属性时为 1。li.value 在这项没写 value 属性时恒为 0,不能拿来当显示序号。
            const start = ol.start || 1;
            const itemsLi = [...ol.querySelectorAll(":scope > li")];
            const shown = Array.from({length: itemsLi.length}, (_, k) => start + k);
            const want = Array.from({length: list.count}, (_, k) => list.start + k);
            itemsLi.forEach((node, k) => {
              if (node.hasAttribute("value")) shown[k] = parseInt(node.getAttribute("value"), 10);
            });
            if (shown.join(",") !== want.join(",")) {
              fails.push("有序列表序号断了: 页面会从 " + (shown.join(",") || "(空)") + " 起显示,原文应从 " + want.join(",") + " (每段各自从 1 重来就是这个症状)");
            }
            const lst = getComputedStyle(ol).listStyleType;
            if (lst === "none") fails.push("有序列表 list-style 是 none,序号看不见");
          });
        }
      });
      if (tbl) notes.push("表格 " + tbl + " 个");
      if (ols) notes.push("有序列表 " + ols + " 处");
    }

    const figImgs = [...document.querySelectorAll("figure.pfig img")];
    if (figImgs.length !== figs.length) {
      fails.push("图的数量对不上: 页面 " + figImgs.length + " 张, data " + figs.length + " 张");
    }
    const imgs = [...document.querySelectorAll("img")].filter(img => !img.closest(".lbx") && !(img.getAttribute("src") || "").startsWith("data:"));
    const overall = Date.now() + 45000;
    const broken = [];
    for (const img of imgs) {
      if (img.complete && img.naturalWidth > 0) continue;
      const left = overall - Date.now();
      if (left <= 0) { broken.push((img.currentSrc || img.src || "(无 src)") + " (检查超时)"); continue; }
      try { img.scrollIntoView({block: "center", inline: "nearest"}); } catch (e) {}
      const deadline = Date.now() + Math.min(8000, left);
      let stable = 0;
      while (Date.now() < deadline) {
        if (img.complete && img.naturalWidth > 0) { stable = -1; break; }
        if (img.complete) { if (++stable >= 4) break; }
        else stable = 0;
        await sleep(50);
      }
      const fig = img.closest("figure");
      const hidden = !!(fig && getComputedStyle(fig).display === "none");
      if (stable === -1) continue;
      const src = img.currentSrc || img.src || "(无 src)";
      broken.push(src + (hidden ? " (加载失败后被藏起来了)" : " (裂图)"));
    }
    if (broken.length) {
      fails.push("有 " + broken.length + " 张图没加载成功,例如 " + broken.slice(0, 3).join(" | "));
    } else if (figs.length) notes.push("图 " + figs.length + " 张已加载");

    if (!figs.length) notes.push("本篇无图,跳过灯箱");
    else {
      const img = figImgs.find(i => i.naturalWidth > 0 && getComputedStyle(i.closest("figure") || i).display !== "none");
      if (!img) fails.push("有图但没有一张能点开灯箱");
      else {
        try { img.scrollIntoView({block: "center"}); } catch (e) {}
        img.click();
        const box = document.querySelector(".lbx");
        const limg = box && box.querySelector("img");
        const t = Date.now();
        while (limg && !limg.complete && Date.now() - t < 8000) await sleep(50);
        if (!box) fails.push("点击正文图片没有打开灯箱");
        else if (!limg || limg.naturalWidth === 0) fails.push("灯箱打开了,但里面的图是裂的");
        else notes.push("灯箱可打开");
      }
    }
  }

  const og = (sel) => {
    const n = document.querySelector(sel);
    return n ? (n.getAttribute("content") || "") : "";
  };
  return {
    fails, notes,
    title: document.title || "",
    ogTitle: og('meta[property="og:title"]'),
    ogDesc: og('meta[property="og:description"]'),
    ogImage: og('meta[property="og:image"]'),
    url: location.href,
  };
}
"""


class MetaParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.in_title = False
        self.title_parts: list[str] = []
        self.attrs: list[dict] = []

    def handle_starttag(self, tag, attrs):
        bag = {k: v for k, v in attrs}
        if tag == "meta":
            self.attrs.append(bag)
        elif tag == "title":
            self.in_title = True

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title_parts.append(data)

    def meta(self, **want):
        for bag in self.attrs:
            if all(bag.get(k) == v for k, v in want.items()):
                return bag.get("content") or ""
        return ""


class QuietHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, fmt, *args):
        return

    def log_error(self, fmt, *args):
        return


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", s or "").strip()


def run(cmd: list[str]) -> int:
    print("$ " + " ".join(cmd), flush=True)
    return subprocess.run(cmd, cwd=ROOT).returncode


def git_ok(args: list[str]) -> subprocess.CompletedProcess:
    return subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True)


def resolve_base(explicit: str | None) -> str:
    if explicit:
        if git_ok(["rev-parse", "--verify", "--quiet", explicit]).returncode != 0:
            sys.exit(f"找不到基线 {explicit}")
        return explicit
    for cand in ("origin/main", "origin/master", "main", "master"):
        if git_ok(["rev-parse", "--verify", "--quiet", cand]).returncode == 0:
            return cand
    sys.exit("找不到 origin/main 或 origin/master,用 --base 指定")


def git_names(*args: str) -> list[str]:
    r = git_ok(["diff", "--name-only", *args])
    if r.returncode != 0:
        sys.exit(r.stderr.strip() or "git diff 失败")
    return [ln.strip() for ln in r.stdout.splitlines() if ln.strip()]


def ids_from_paths(paths: list[str]) -> tuple[list[str], bool]:
    found: list[str] = []
    shell = False
    for raw in paths:
        p = raw.strip().replace("\\", "/")
        if p in SHELL_FILES:
            shell = True
        m = re.match(r"^data/([^/]+)\.json$", p)
        if m and m.group(1) + ".json" not in SKIP_DATA:
            found.append(m.group(1))
            continue
        m = re.match(r"^(?:p|og/p|assets/paperfigs)/([^/]+)", p)
        if m and (p.startswith("p/") or p.startswith("og/p/") or p.startswith("assets/paperfigs/")):
            # og/p/<id>.jpg 的第二段带扩展名,paperfigs 的第二段是目录名
            piece = m.group(1)
            if p.startswith("og/p/"):
                piece = re.sub(r"\.jpg$", "", piece)
            found.append(piece)
    out: list[str] = []
    seen: set[str] = set()
    for i in found:
        if i in seen or not ID_RE.fullmatch(i):
            continue
        seen.add(i)
        if not ((ROOT / "data" / f"{i}.json").exists() or (ROOT / "p" / i / "index.html").exists()):
            print(f"  · 跳过已删除的 {i}", flush=True)
            continue
        out.append(i)
    return out, shell


def paper_features():
    rows = []
    for path in sorted((ROOT / "data").glob("*.json")):
        if path.name in SKIP_DATA:
            continue
        pid = path.stem
        if not ID_RE.fullmatch(pid) or not (ROOT / "p" / pid / "index.html").exists():
            continue
        try:
            d = json.loads(path.read_text())
        except json.JSONDecodeError:
            continue
        figs = tables = ol_cont = 0
        for sec in d.get("full") or []:
            for it in (sec.get("items") or sec.get("paras") or []):
                if not isinstance(it, dict):
                    continue
                kind = it.get("t") or "para"
                if kind == "fig":
                    figs += 1
                    continue
                if kind == "eq":
                    continue
                en = it.get("en") or ""
                if " · " in en:
                    ls = en.split("\n")
                    if len(ls) > 1 or len(ls[0].split(" · ")) >= 3:
                        tables += 1
                for col in (en, it.get("zh") or ""):
                    for ln in str(col).split("\n"):
                        m = re.match(r"\s*(\d+)[.)]\s+\S", ln)
                        if m and int(m.group(1)) >= 2:
                            ol_cont += 1
        rows.append((path.stat().st_size, figs, tables, ol_cont, pid))
    rows.sort()
    return rows


def diverse_sample(n: int) -> list[str]:
    if n < 1:
        sys.exit("--all-sample 至少为 1")
    rows = paper_features()
    if not rows:
        sys.exit("data/ 里没有可抽查的论文")
    picks: list[str] = []

    def take(pred):
        for size, figs, tables, ol_cont, pid in rows:
            if pid in picks:
                continue
            if pred(figs, tables, ol_cont):
                picks.append(pid)
                return

    take(lambda figs, tables, ol_cont: figs >= 1)
    if n >= 2:
        take(lambda figs, tables, ol_cont: tables >= 1)
    if n >= 3:
        take(lambda figs, tables, ol_cont: ol_cont >= 1)
    for *_, pid in rows:
        if len(picks) >= n:
            break
        if pid not in picks:
            picks.append(pid)
    return picks[:n]


def load_meta(ids: list[str]) -> dict:
    r = subprocess.run(["node", "-e", META_JS, *ids], cwd=ROOT, capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit(r.stderr.strip() or "读取论文标题失败")
    return json.loads(r.stdout)


def working_tree_files(base: str) -> list[str]:
    names = []
    names += git_names(f"{base}...HEAD")
    names += git_names()
    names += git_names("--cached")
    r = git_ok(["ls-files", "--others", "--exclude-standard"])
    if r.returncode == 0:
        names += [ln.strip() for ln in r.stdout.splitlines() if ln.strip()]
    return names


def pre_push_files(payload: str, base: str) -> list[str]:
    zero = "0" * 40
    names: list[str] = []
    lines = [ln.strip() for ln in payload.splitlines() if ln.strip()]
    if not lines:
        print("pre-push 没有收到引用,只跑快速门禁", flush=True)
        return []
    for ln in lines:
        parts = ln.split()
        if len(parts) < 4:
            continue
        _local_ref, local_sha, _remote_ref, remote_sha = parts[:4]
        if local_sha == zero:
            continue
        if remote_sha == zero:
            mb = None
            for cand in (base, "origin/main", "origin/master"):
                r = git_ok(["merge-base", cand, local_sha])
                if r.returncode == 0 and r.stdout.strip():
                    mb = r.stdout.strip()
                    break
            names += git_names(mb or base, local_sha) if mb else git_names(base, local_sha)
        else:
            names += git_names(remote_sha, local_sha)
    return names


def meta_mismatch(label: str, kind: str, got: str, exp: str) -> str | None:
    g, e = norm(got), norm(exp)
    if kind in ("title", "og:title") and g == HOME_TITLE and e != HOME_TITLE:
        return f"{label} {kind} 落到了站点首页「{HOME_TITLE}」(链接预览跟跳转时就是这样)\n期望: {e[:220]}"
    if kind == "description" and g.startswith(HOME_DESC_PREFIX) and not e.startswith(HOME_DESC_PREFIX):
        return f"{label} description 是首页简介,不是这篇的\n实际: {g[:180]}\n期望: {e[:180]}"
    if g != e:
        return f"{label} {kind} 不是这篇的\n实际: {g[:220]}\n期望: {e[:220]}"
    return None


def fetch_static(url: str) -> tuple[str, str]:
    req = urllib.request.Request(url, headers={"User-Agent": "aipaper-verify-site/no-js"})
    with urllib.request.urlopen(req, timeout=40) as resp:
        final = resp.geturl()
        body = resp.read().decode("utf-8", "replace")
        return final, body


def check_nojs(base: str, pid: str, meta: dict) -> list[str]:
    url = f"{base}/p/{pid}/"
    fails = []
    try:
        final, body = fetch_static(url)
    except Exception as e:
        return [f"无 JS 抓取 {url} 失败: {e}"]
    final_path = urllib.request.urlparse(final).path
    if final_path not in (f"/p/{pid}/", f"/p/{pid}/index.html"):
        fails.append(f"无 JS 请求被重定向离开分享页: {final}")
    # 第一个 <script> 里有匹配 <title> 的正则字面量,HTMLParser 会把它当成第二个 title。
    cut = body.find("<script")
    parser = MetaParser()
    parser.feed(body[:cut] if cut > 0 else body)
    title = "".join(parser.title_parts)
    for kind, got, exp in (
        ("title", title, meta["title"]),
        ("og:title", parser.meta(property="og:title"), meta["title"]),
        ("og:description", parser.meta(property="og:description"), meta["desc"]),
        ("og:image", parser.meta(property="og:image"), meta["og"]),
    ):
        msg = meta_mismatch("无 JS", kind, got, exp)
        if msg:
            fails.append(msg)
    if 'http-equiv="refresh"' in body.lower() and re.search(r"url\s*=\s*/(?:#|\s*[\"'])", body, re.I):
        fails.append("静态页含跳回首页的 meta refresh")
    return fails


def console_bad(text: str) -> bool:
    # document.write 接管时,被换掉的文档会留下 ERR_ABORTED,不是页面脚本错误。
    if "net::ERR_ABORTED" in text or "net::ERR_BLOCKED_BY_CLIENT" in text:
        return False
    if "favicon.ico" in text:
        return False
    return True


def check_browser(browser, base: str, pid: str, meta: dict, shot_dir: Path) -> tuple[list[str], list[Path]]:
    fails: list[str] = []
    shots: list[Path] = []
    context = browser.new_context(
        viewport={"width": 1280, "height": 800},
        user_agent=LARK_UA,
        locale="zh-CN",
        service_workers="block",
        color_scheme="light",
    )

    def _route(route):
        u = route.request.url
        if any(h in u for h in ("stats.jasonlin.tech", "sync.jasonlin.tech", "aipodcast-sync.992978142.workers.dev")):
            route.fulfill(status=204, body=b"")
            return
        route.continue_()

    context.route("**/*", _route)
    page = context.new_page()
    page.set_default_timeout(45000)
    errors: list[str] = []

    def on_console(msg):
        if msg.type == "error" and console_bad(msg.text):
            errors.append(msg.text)

    def on_pageerror(exc):
        errors.append("pageerror: " + str(exc))

    page.on("console", on_console)
    page.on("pageerror", on_pageerror)
    url = f"{base}/p/{pid}/"
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=45000)
        try:
            page.wait_for_function(
                """() => {
                  const path = location.pathname;
                  if (document.querySelector('.reader .para')) return true;
                  const home = path === '/' || path === '/index.html';
                  return home && document.body && document.body.dataset.route === 'home';
                }""",
                timeout=25000,
            )
        except Exception as e:
            fails.append(f"详情 25s 内没有渲染 ({e.__class__.__name__}); 停在 {page.url} 标题「{page.title()}」")
        else:
            report = page.evaluate(DOM_JS, {"id": pid, "tEn": meta["tEn"]})
            fails.extend(report["fails"])
            for kind, got in (
                ("title", report["title"]),
                ("og:title", report["ogTitle"]),
                ("og:description", report["ogDesc"]),
                ("og:image", report["ogImage"]),
            ):
                exp = meta["title"] if kind in ("title", "og:title") else meta["desc"] if kind == "og:description" else meta["og"]
                msg = meta_mismatch("执行 JS 后", kind, got, exp)
                if msg:
                    fails.append(msg)
            if report["notes"]:
                print("    " + " · ".join(report["notes"]), flush=True)
            print(f"    url {report['url']}", flush=True)
        for err in errors:
            fails.append("控制台错误: " + err[:300])
        try:
            page.evaluate("() => { const b=document.querySelector('.lbx'); if(b)b.remove(); window.scrollTo(0,0); }")
            desk = shot_dir / f"{pid}-desktop.png"
            page.screenshot(path=str(desk))
            shots.append(desk)
            page.set_viewport_size({"width": 390, "height": 844})
            page.wait_for_timeout(250)
            page.evaluate("() => window.scrollTo(0,0)")
            mob = shot_dir / f"{pid}-mobile.png"
            page.screenshot(path=str(mob))
            shots.append(mob)
        except Exception as e:
            fails.append(f"截图失败: {e}")
    except Exception as e:
        fails.append(f"浏览器检查中断: {e}")
    finally:
        context.close()
    return fails, shots


def serve() -> tuple[ThreadingHTTPServer, str]:
    httpd = ThreadingHTTPServer(("127.0.0.1", 0), QuietHandler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    port = httpd.server_address[1]
    return httpd, f"http://127.0.0.1:{port}"


def main() -> int:
    ap = argparse.ArgumentParser(description="推送前检查分享页和详情页(复用 pipeline 里已有门禁)")
    src = ap.add_mutually_exclusive_group()
    src.add_argument("--ids", help="逗号分隔的论文 id")
    src.add_argument("--all-sample", type=int, metavar="N", help="抽 N 篇(含图 / 表 / 续编号列表)")
    src.add_argument("--pre-push", action="store_true", help="从 stdin 读 git pre-push 的引用行")
    ap.add_argument("--base", help="对比的 git 基线,默认 origin/main,没有则 origin/master")
    ap.add_argument("--live", action="store_true", help=f"浏览器对着 {SITE} 而不是本地静态服务")
    ap.add_argument("--shots", default="verify-shots", help="截图目录(相对仓库根,默认 verify-shots)")
    args = ap.parse_args()

    base_ref = resolve_base(args.base) if (args.base or not args.ids and args.all_sample is None) else None
    shell = False
    if args.ids:
        ids = []
        for part in args.ids.replace(" ", ",").split(","):
            part = part.strip()
            if not part:
                continue
            if not ID_RE.fullmatch(part):
                sys.exit(f"非法 id: {part}")
            ids.append(part)
        if not ids:
            sys.exit("--ids 是空的")
    elif args.all_sample is not None:
        ids = diverse_sample(args.all_sample)
        print("抽查 " + ", ".join(ids), flush=True)
    elif args.pre_push:
        if sys.stdin.isatty():
            sys.exit("--pre-push 由 git 钩子调用,不要在终端里直接跑")
        if base_ref is None:
            base_ref = resolve_base(None)
        ids, shell = ids_from_paths(pre_push_files(sys.stdin.read(), base_ref))
    else:
        assert base_ref
        print(f"对比基线 {base_ref}", flush=True)
        ids, shell = ids_from_paths(working_tree_files(base_ref))

    if shell and args.ids is None and args.all_sample is None:
        extra = [i for i in diverse_sample(SHELL_SAMPLE) if i not in ids]
        if extra:
            print("app.js / index.html / build_share_pages.js 有改动,额外抽查 " + ", ".join(extra), flush=True)
            ids = extra + ids

    fails: list[str] = []
    print("── 快速门禁(gate_fast + audit_paper + audit_filing)", flush=True)
    if run(["node", "pipeline/gate_fast.js", *ids]) != 0:
        fails.append("gate_fast 未通过")
    if ids:
        if run(["node", "pipeline/audit_paper.js", *ids]) != 0:
            fails.append("audit_paper 未通过")
        if run(["python3", "pipeline/audit_filing.py", *ids]) != 0:
            fails.append("audit_filing 未通过")
    else:
        print("  没有论文 id,跳过 audit_paper / audit_filing", flush=True)

    shots: list[Path] = []
    if not ids:
        print("没有需要打开的论文,跳过浏览器", flush=True)
    else:
        try:
            from playwright.sync_api import sync_playwright
        except ImportError:
            print("缺少 Playwright。安装: pip install playwright", file=sys.stderr)
            print("脚本会用本机 Google Chrome;没有的话再执行 python3 -m playwright install chromium", file=sys.stderr)
            return 1
        meta = load_meta(ids)
        httpd = None
        if args.live:
            origin = SITE
            print(f"── 浏览器(线上 {origin})", flush=True)
        else:
            httpd, origin = serve()
            print(f"── 浏览器(本地 {origin})", flush=True)
        shot_dir = (ROOT / args.shots).resolve()
        shot_dir.mkdir(parents=True, exist_ok=True)
        try:
            with sync_playwright() as p:
                launch = dict(headless=True, args=["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"])
                try:
                    browser = p.chromium.launch(channel="chrome", **launch)
                except Exception as chrome_err:
                    try:
                        browser = p.chromium.launch(**launch)
                    except Exception as bundled_err:
                        print("启动不了 Chrome / Chromium。", file=sys.stderr)
                        print("本机 Chrome: " + str(chrome_err).splitlines()[0], file=sys.stderr)
                        print("内置 Chromium: " + str(bundled_err).splitlines()[0], file=sys.stderr)
                        print("安装: python3 -m playwright install chromium", file=sys.stderr)
                        fails.append("浏览器没启动")
                        browser = None
                if browser is not None:
                    try:
                        for pid in ids:
                            print(f"▶ {pid}", flush=True)
                            paper_fails = check_nojs(origin, pid, meta[pid])
                            more, made = check_browser(browser, origin, pid, meta[pid], shot_dir)
                            paper_fails.extend(more)
                            shots.extend(made)
                            if paper_fails:
                                print(f"  ✗ FAIL  {pid}", flush=True)
                                for msg in paper_fails:
                                    for i, line in enumerate(msg.splitlines()):
                                        print(("        ✗ " if i == 0 else "          ") + line, flush=True)
                                fails.append(pid)
                            else:
                                print(f"  ✓ PASS  {pid}", flush=True)
                    finally:
                        browser.close()
        finally:
            if httpd is not None:
                httpd.shutdown()

    if shots:
        print("截图:", flush=True)
        for path in shots:
            print(f"  {path}", flush=True)
    print(flush=True)
    if fails:
        print(f"✗ verify_site 未通过: {', '.join(fails)}", flush=True)
        return 1
    print("✓ verify_site 通过", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
