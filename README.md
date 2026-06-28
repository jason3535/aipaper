# AI Paper — 双语论文阅读站

著名 AI 学者 × 里程碑论文，逐段中英对照全文 + 核心贡献/局限 + 论文问答。
基于 skill `bilingual-reader-site`（同 AI Podcast 站架构）。域名：**aipaper.jasonlin.tech**

## 结构
- `index.html` — 单文件 SPA（PEOPLE/PAPERS 内联元数据 + 懒加载 `data/<id>.json` 全文）
- `pipeline/add_paper.py` — arXiv(元数据) + ar5iv(正文) → DeepSeek 逐段双语 + 贡献/局限 → 写库
- `data/<id>.json` — 每篇论文的逐段中英全文（权威源、懒加载）
- `assets/people/<pid>.jpg` — 学者头像（复用自 AI Podcast 站）

## 加一篇论文
```
DEEPSEEK_API_KEY=... python3 pipeline/add_paper.py --arxiv 1706.03762 --pid <pid> --fields nlp
```
（先确保 `--pid` 已在 index.html 的 PEOPLE 中。）

## 部署到 aipaper.jasonlin.tech
1. 新建 GitHub 仓库，推送本目录，开启 GitHub Pages（master 分支根目录）。
2. `CNAME` 已含 `aipaper.jasonlin.tech`。
3. 阿里云 DNS 加一条 CNAME：`aipaper` → `<user>.github.io`。
4. 问答（Ask）：部署 `chat-worker`（架构同 AI Podcast），把 workers.dev 地址填进 index.html 的 `CHAT_PROXY`。

## 当前样本
3 位学者 / 3 篇论文：FlashAttention(Tri Dao)、Seq2Seq(Ilya)、Attention-NMT(Bengio)。
