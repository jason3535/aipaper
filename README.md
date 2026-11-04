# AI Paper · 双语论文阅读站

著名 AI 学者 × 里程碑论文 —— **逐段中英对照全文** + 图 / 公式 / 附录 + 核心贡献 + 被引数 + 论文问答。
与 [AI Podcast](https://github.com/jason3535/aipodcast) 同一套阅读框架(skill `bilingual-reader-site`),把「人物 → 条目 → 双语全文 + Ask」复用到论文域。

🌐 **在线**：[aipaper.jasonlin.tech](https://aipaper.jasonlin.tech) · **194 位学者 / 403 篇论文**(2900+ 图 / 1600+ 公式)

## 功能

- **学者**：按论文数排序,头像确认本人否则按研究领域配色首字母,按领域筛选。
- **双语论文**：逐段中英对照全文 + **图片**(懒加载,双语图注)+ **公式**(MathJax)+ **附录**;左侧目录、字号(小/中/大)、EN/中/双语切换、原文/译文在前。
- **核心贡献 / 局限**:每篇双语提炼。
- **被引数**：Semantic Scholar 合并计数(代表学术影响力;ResNet 23 万 / Transformer 18 万…)。
- **机构维度**：每篇标注机构,真实公司 logo,`#/orgs` 按机构浏览。
- **问答 Ask**：单篇(引用 `[#章节]`)/ 全站(引用 `[@id]`),流式。
- **深色模式**、**语言切换**、**选中文本分享 + 深链定位**(`?at&hl`)。

## 技术

- **单文件静态 SPA**：`index.html`(PEOPLE / PAPERS 内联元数据 + 懒加载 `data/<id>.json` 富内容),GitHub Pages。
- **DeepSeek**：逐段翻译、贡献/局限、元信息、问答。**arXiv API**(元数据)+ **ar5iv**(正文/图/公式/附录)+ **Semantic Scholar**(被引)。
- **Cloudflare Worker** `chat-worker`:论文问答(从 `raw.githubusercontent…/data` 取全文,不依赖自定义域名)。

## 目录结构

```
index.html              单文件 SPA
data/<id>.json          每篇论文富内容(逐段双语 + 图/公式/附录,权威源、懒加载)
data/index.json         Ask / 检索目录
assets/people/*.jpg     学者头像   assets/orgs/*.png  机构 logo
chat-worker/            Cloudflare 问答 Worker
pipeline/               内容管线(见下)
```

## 内容管线 `pipeline/`

| 脚本 | 作用 |
|---|---|
| `add_person.py` | 维基头像 + 生成 PEOPLE 条目 |
| `add_paper.py` | 单篇:arXiv 元数据 + ar5iv 正文 → DeepSeek 逐段双语 + 贡献/局限 |
| `enrich_paper.py` | 给已收录论文补图 / 公式 / 附录(复用已有译文) |
| `bulk_ingest.py` | 并行批量收录,直接产出富内容(图/公式/附录),最后一次性 merge |
| `add_citations.py` | Semantic Scholar 按 arXiv id 补被引数 |
| `build_index.js` | 重建 Ask / 检索目录 `data/index.json`。**字段一律从 `data/` 回落读**(内联块会被首屏瘦身剥空);**写入前有门禁**:sEn/contrib 非空率 <95%、limits <90%、或比上一版倒退 >2 个点就拒写并非零退出(真实变化用 `--force`) |
| `audit_paper.js` | **新收条目质检门禁**(Substack 残留/absEn 垃圾/⟐/中英覆盖/日期/目录挂钩),postingest 第 0 步 |
| `postingest.sh` | **收尾唯一入口**:audit → slim → 分享页 → index/people/related(各带门禁)→ feed → webp → 语法门禁 |
| `build_related.js` | 重建 `data/related.json`(文末「接着读」的 BM25 相关度,标题+摘要+核心贡献;门禁:<95% 的篇拿不到 ≥4 条相关就拒写) |
| `build_people.js` | 重建 `data/people.json`(MCP 的 list_scholars / get_scholar 用),同样有门禁:学者数比上版少 >2% 或双语简介完整率 <90% 拒写 |
| `slim_index.py` | **首屏瘦身**:把内联 PAPERS 的 absEn/absZh/insights 剥掉(详情页从 data/<id>.json 懒加载),幂等 |
| `build_share_pages.js` | 每篇论文生成静态分享页 `p/<id>/`(OG 卡片)+ `sitemap.xml` |
| `gen_og.py` | 重生成品牌 OG 图 `assets/og.png` |
| `gate_fast.js` | **只读快门禁**:app.js 语法、`app.js?v=` 版本号、静态页埋点。postingest 第 8 步和 `verify_site.py` 共用 |
| `verify_site.py` | **推送前用户可见校验**:本地静态服务 + Playwright,查分享页是否停在 `/p/<id>/`、OG 卡片、正文/图/表/有序列表/灯箱、控制台错误 |

```bash
# 单篇
DEEPSEEK_API_KEY=sk-... python3 pipeline/add_paper.py --arxiv 1706.03762 --pid shazeer --fields nlp
# 批量(JSON: [{pid,arxiv,fields,org}...])
DEEPSEEK_API_KEY=sk-... python3 pipeline/bulk_ingest.py papers.json 5
# 收录/更新后收尾(唯一入口,含新收条目质检门禁 + 8 步重建,任一步挂即中止):
pipeline/postingest.sh <新收id ...>
```

> `--pid` 须先在 `index.html` 的 PEOPLE 中;问答需部署 `chat-worker` 并把 workers.dev 地址填入 `index.html` 的 `CHAT_PROXY`。

### 招股书(SEC filing)
`pipeline/add_filing.py` + `filing_parse.py`:把 EDGAR 上 PDF 转出的版式 HTML 还原成章/节/段,英文原文一字不改、逐段补中文并核对数字;终稿(424B4)加 `--final`。版式自动判定(20pt 章标题式 / 通篇 10pt 的 Workiva 式 / Donnelley 流式 HTML→`filing_flow.py`)。已收 Anthropic S-1、SpaceX / Cerebras / CoreWeave 424B4。收后 `audit_filing.py` 做结构门禁(标点/断段/表格对齐),`fix_filing_tables.py` 逐行逐格重译错位表格;表格段前端渲染成真表格。

## 推送前校验

`pipeline/verify_site.py` 给改完准备推送的人(以及代跑的 agent)用。它在本地把仓库当静态站打开,用无头 Chrome 访问改动过的 `/p/<id>/`,失败就非零退出并写明哪一篇、哪一项。浏览器 UA 用的是会执行 JS 的 Lark 链接预览(不能带 `Headless` / `bot` / `preview`,否则分享页会跳过原地接管,飞书跟跳转那个问题就测不到)。另外发一次不执行 JS 的普通 GET,核对静态 HTML 里的卡片。

已有门禁直接调用,不另写规则:`gate_fast.js`(语法、版本号、埋点)、`audit_paper.js`、`audit_filing.py`。

```bash
pip install playwright    # 只需一次。脚本优先用本机 Google Chrome
# 没装 Chrome 时: python3 -m playwright install chromium

# 默认:相对 origin/main(没有这个远程分支就用 origin/master)有改动的论文,含未提交的工作区
python3 pipeline/verify_site.py
python3 pipeline/verify_site.py --ids satya-looking-ahead-2026,jainslie-2305.13245
python3 pipeline/verify_site.py --all-sample 3
python3 pipeline/verify_site.py --live --ids satya-looking-ahead-2026   # 对着 https://aipaper.jasonlin.tech
```

抽查会尽量带上有图、有表格、有「2. 3. …」续编号的短文,这样列表序号和灯箱不会因为样本里根本没有而放空。`app.js`、`index.html` 或 `pipeline/build_share_pages.js` 改了、但 diff 里没有具体论文时,再自动加抽 3 篇。

每一篇会查:

1. 停在 `/p/<id>/`(不会被带到 `/` 或 `/#/paper/<id>`)。无 JS 的原始 HTML,以及执行 JS 之后,`og:title` / `og:description` / `og:image` 和 `document.title` 都是这一篇,而不是首页「AI Paper · 双语论文阅读站」。
2. 详情正文有段落;图滚进视口(懒加载)后没有裂图;该是表格的段是 `<table class="ftbl">`;有序列表的序号连续(「2.」「3.」不会各自显示成 1.);点图打开灯箱。
3. 没有 JS 控制台 error,也没有未捕获异常。

桌面 1280×800 和手机 390×844 的截图写到 `verify-shots/`(已在 `.gitignore`),跑完打印绝对路径。几篇短文应在两分钟内跑完。

### git pre-push

钩子在 `scripts/git-hooks/pre-push`。装一次:

```bash
git config core.hooksPath scripts/git-hooks
```

之后每次 `git push` 先跑上面的快门禁,再对**这次推送的提交**里碰到的论文做浏览器检查,失败就拒绝推送。只在明确要绕过时:

```bash
SKIP_VERIFY=1 git push
```

钩子看的是即将推上去的提交,不含还没 commit 的工作区。想连工作区一起查,推之前直接跑 `python3 pipeline/verify_site.py`。`core.hooksPath` 会换成这一个目录,仓库里别的钩子不会跟默认的 `.git/hooks` 叠在一起跑。

## 版权与使用

论文正文 / 摘要版权归原作者与 arXiv,按其许可(多为 CC-BY / arXiv 非独占)展示;译文 AI 生成、仅供参考,以原文为准。仅作学习研究用途,**应权利人要求即下架**(linzheng3535@gmail.com)。
