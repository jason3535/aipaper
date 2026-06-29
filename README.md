# AI Paper · 双语论文阅读站

著名 AI 学者 × 里程碑论文 —— **逐段中英对照全文** + 图 / 公式 / 附录 + 核心贡献 + 被引数 + 论文问答。
与 [AI Podcast](https://github.com/jason3535/aipodcast) 同一套阅读框架(skill `bilingual-reader-site`),把「人物 → 条目 → 双语全文 + Ask」复用到论文域。

🌐 **在线**：[aipaper.jasonlin.tech](https://aipaper.jasonlin.tech) · **153 位学者 / 205 篇论文**(710+ 图 / 625+ 公式)

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
| `build_index.js` | 重建 Ask / 检索目录 `data/index.json` |

```bash
# 单篇
DEEPSEEK_API_KEY=sk-... python3 pipeline/add_paper.py --arxiv 1706.03762 --pid shazeer --fields nlp
# 批量(JSON: [{pid,arxiv,fields,org}...])
DEEPSEEK_API_KEY=sk-... python3 pipeline/bulk_ingest.py papers.json 5
```

> `--pid` 须先在 `index.html` 的 PEOPLE 中;问答需部署 `chat-worker` 并把 workers.dev 地址填入 `index.html` 的 `CHAT_PROXY`。

## 版权与使用

论文正文 / 摘要版权归原作者与 arXiv,按其许可(多为 CC-BY / arXiv 非独占)展示;译文 AI 生成、仅供参考,以原文为准。仅作学习研究用途,**应权利人要求即下架**(linzheng3535@gmail.com)。
