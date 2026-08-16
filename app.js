/* ===== DATA ===== */
const FIELDS={
 'deep-learning':{en:'Deep Learning',zh:'深度学习',c:'var(--f-dl)'},
 'nlp':{en:'LLM / NLP',zh:'大模型 / NLP',c:'var(--f-nlp)'},
 'vision':{en:'Vision',zh:'计算机视觉',c:'var(--f-vision)'},
 'rl':{en:'Reinforcement Learning',zh:'强化学习',c:'var(--f-rl)'},
 'efficiency':{en:'Efficiency / Systems',zh:'高效 / 系统',c:'var(--f-eff)'},
 'generative':{en:'Generative Models',zh:'生成模型',c:'var(--f-gen)'},
 'safety':{en:'Safety / Alignment',zh:'对齐与安全',c:'var(--f-safety)'},
 'robotics':{en:'Robotics / Embodied',zh:'机器人 / 具身',c:'var(--f-robotics)'},
};
const PEOPLE={
'thinkingmachines':{en:'Thinking Machines Lab',zh:'Thinking Machines Lab',init:'TM',tiEn:'AI research lab (Tinker, Inkling)',tiZh:'AI 研究实验室（Tinker、Inkling）',fields:['nlp','deep-learning'],bioEn:'AI research lab founded by former OpenAI CTO Mira Murati, focused on customizable models and post-training tooling; released Tinker and the open-weights Inkling model.',bioZh:'由前 OpenAI CTO Mira Murati 创立的 AI 研究实验室，聚焦可定制模型与后训练工具链；发布了 Tinker 与开放权重模型 Inkling。'},
'sebastianraschka':{en:'Sebastian Raschka',zh:'塞巴斯蒂安·拉施卡',init:'SR',tiEn:'Author, Build a Large Language Model (From Scratch)',tiZh:'《从零构建大语言模型》作者',fields:['nlp','deep-learning'],bioEn:'Machine learning researcher and educator, author of Build a Large Language Model (From Scratch); his Ahead of AI writing explains LLM internals and training to a broad technical audience.',bioZh:'机器学习研究者与教育者，《从零构建大语言模型》作者；他的 Ahead of AI 系列文章向广泛的技术读者讲解大模型内部机制与训练。'},
'zvi':{en:'Zvi Mowshowitz',zh:'兹维·莫绍维茨',init:'ZM',tiEn:'Writer, Don\'t Worry About the Vase',tiZh:'《别担心那只花瓶》作者',fields:['safety','nlp'],bioEn:'Former competitive Magic player and trader turned prolific AI commentator; his Don\'t Worry About the Vase newsletter tracks frontier AI developments, policy and safety in exhaustive weekly depth.',bioZh:'前万智牌职业选手与交易员，如今是高产的 AI 评论者；其 newsletter《别担心那只花瓶》以详尽的周更深度追踪前沿 AI 进展、政策与安全。'},
'hopfield':{en:'John Hopfield',zh:'约翰·霍普菲尔德',init:'JH',tiEn:'Physicist; Hopfield networks (1982); 2024 Nobel Prize in Physics',tiZh:'物理学家；Hopfield 网络(1982)；2024 年诺贝尔物理学奖',fields:['deep-learning'],bioEn:'A physicist who in 1982 showed that networks of simple units with symmetric connections have emergent collective computational abilities, storing memories as stable attractor states. Shared the 2024 Nobel Prize in Physics for foundational work on neural networks.',bioZh:'物理学家。1982 年证明对称连接的简单单元网络具有涌现的集体计算能力，把记忆存为稳定的吸引子状态。因神经网络的奠基性工作获 2024 年诺贝尔物理学奖。'},
'mcculloch':{en:'Warren McCulloch',zh:'沃伦·麦卡洛克',init:'WM',tiEn:'Neurophysiologist; co-author of the McCulloch–Pitts neuron (1943)',tiZh:'神经生理学家；McCulloch–Pitts 神经元(1943)共同作者',fields:['deep-learning'],bioEn:'A neurophysiologist and cybernetician who, with Walter Pitts, formalized the first mathematical model of a neuron in 1943, showing that networks of simple threshold units could in principle compute any logical function.',bioZh:'神经生理学家、控制论先驱。1943 年与 Walter Pitts 一起给出了神经元的第一个数学模型，证明简单阈值单元的网络原则上可计算任意逻辑函数。'},
'rosenblatt':{en:'Frank Rosenblatt',zh:'弗兰克·罗森布拉特',init:'FR',tiEn:'Psychologist; inventor of the Perceptron (1958)',tiZh:'心理学家；感知机(1958)发明者',fields:['deep-learning'],bioEn:'A psychologist who invented the Perceptron in 1958 — the first trainable neural network with a learning rule — laying the foundation for machine learning from data.',bioZh:'心理学家，1958 年发明感知机——第一个带学习规则、可从数据训练的神经网络，为「机器从数据中学习」奠定基础。'},
'thariq':{en:'Thariq Shihipar',zh:'塔里克·希希帕尔',init:'TS',tiEn:'Engineer, Claude Code at Anthropic',tiZh:'Anthropic Claude Code 工程师',fields:['nlp','safety'],bioEn:'An engineer at Anthropic on the Claude Code team. He writes on interpretability, reinforcement learning, LLM-powered tooling, and agentic coding workflows, and is known for advocating HTML as a richer replacement for Markdown in AI planning.',bioZh:'Anthropic Claude Code 团队工程师。撰文涉及可解释性、强化学习、LLM 驱动的工具与智能体编程工作流，并以主张用 HTML 替代 Markdown 作为 AI 规划载体而知名。'},
'tonyfadell':{en:'Tony Fadell',zh:'托尼·法德尔',init:'TF',tiEn:'Principal, Build Collective · Father of the iPod',tiZh:'Build Collective 创始人 · iPod 之父',fields:['nlp'],bioEn:'Led the teams that created the iPod and co-created the iPhone, founded Nest, and wrote Build, the mentorship manual for making things worth making. Now invests in deep tech at Build Collective.',bioZh:'带队缔造 iPod、共同缔造 iPhone，创立 Nest，著有产品人必读的《Build》。现于 Build Collective 投资深科技。'},
'gwern':{en:'Gwern Branwen',zh:'Gwern Branwen',init:'GB',tiEn:'Independent Researcher & Writer, gwern.net',tiZh:'独立研究者与作家 · gwern.net',fields:['nlp','deep-learning'],bioEn:'Pseudonymous independent researcher whose long-form essays on scaling, genetics and technology are institutional reading in AI. The Scaling Hypothesis framed the bet that scale alone could reach general intelligence.',bioZh:'长期匿名的独立研究者，其关于 scaling、遗传学与技术的长文是 AI 圈的必读文献。《The Scaling Hypothesis》定义了「规模本身通向通用智能」这一世纪赌注。'},
'chrisolah':{en:'Chris Olah',zh:'克里斯·奥拉',init:'CO',tiEn:'Co-founder, Anthropic · Interpretability',tiZh:'Anthropic 联合创始人 · 可解释性',fields:['deep-learning','safety'],bioEn:'Co-founder of Anthropic and pioneer of neural network interpretability, from Distill to circuits research. His blog explainers, like Understanding LSTMs, taught a generation of practitioners.',bioZh:'Anthropic 联合创始人、神经网络可解释性研究先驱，从 Distill 到 circuits 研究。他的博客科普（如《理解 LSTM》）教育了一代从业者。'},
'leopold':{en:'Leopold Aschenbrenner',zh:'利奥波德·阿申布伦纳',init:'LA',tiEn:'Founder, Situational Awareness LP · ex-OpenAI',tiZh:'Situational Awareness 基金创始人 · 前 OpenAI',fields:['safety','nlp'],bioEn:'Former OpenAI superalignment researcher whose 165-page Situational Awareness series argued AGI by 2027 and reshaped the policy debate, then seeded a billion-dollar AGI-thesis fund.',bioZh:'前 OpenAI 超对齐研究员，165 页《Situational Awareness》系列论证 2027 年 AGI 并重塑政策讨论，随后创立数十亿美元规模的 AGI 主题基金。'},
'stephenwolfram':{en:'Stephen Wolfram',zh:'斯蒂芬·沃尔弗拉姆',init:'SW',tiEn:'Founder & CEO, Wolfram Research',tiZh:'Wolfram Research 创始人兼 CEO',fields:['nlp','deep-learning'],bioEn:'Creator of Mathematica and Wolfram Alpha. His 2023 essay on how ChatGPT works became the canonical technical explainer of the LLM moment.',bioZh:'Mathematica 与 Wolfram Alpha 缔造者。2023 年那篇讲透 ChatGPT 原理的长文成为大模型时代的权威科普。'},
'fchollet':{en:'Francois Chollet',zh:'弗朗索瓦·肖莱',init:'FC',tiEn:'Co-founder, Ndea · Creator of Keras',tiZh:'Ndea 联合创始人 · Keras 之父',fields:['deep-learning','safety'],bioEn:'Creator of Keras and of the ARC benchmark for measuring general intelligence. A leading skeptic of intelligence-explosion narratives and advocate of skill-acquisition views of intelligence.',bioZh:'Keras 之父、通用智能基准 ARC 的提出者。「智能爆炸」叙事最有力的怀疑者之一，主张以技能习得效率来度量智能。'},
'simonwillison':{en:'Simon Willison',zh:'西蒙·威利森',init:'SW',tiEn:'Creator of Datasette · Independent Researcher',tiZh:'Datasette 作者 · 独立研究者',fields:['nlp'],bioEn:'Co-creator of Django and creator of Datasette, whose weblog is the most-cited running chronicle of the LLM era, including definitive annual reviews.',bioZh:'Django 联合作者、Datasette 作者。他的博客是大模型时代被引用最多的编年史，年度 LLM 总结已成必读。'},
'ethanmollick':{en:'Ethan Mollick',zh:'伊桑·莫利克',init:'EM',tiEn:'Professor, Wharton School',tiZh:'沃顿商学院教授',fields:['nlp'],bioEn:'Wharton professor studying AI and work. His One Useful Thing essays, like Centaurs and Cyborgs, supplied the shared vocabulary for human-AI collaboration.',bioZh:'沃顿商学院教授，研究 AI 与工作。One Useful Thing 系列（如「半人马与赛博格」）为人机协作提供了通用词汇。'},
'nathanlambert':{en:'Nathan Lambert',zh:'内森·兰伯特',init:'NL',tiEn:'Post-training Lead, Allen Institute for AI',tiZh:'Allen 研究所后训练负责人',fields:['nlp','rl'],bioEn:'Leads post-training at AI2 and writes Interconnects, the reference newsletter on RLHF and reasoning models; author of the RLHF Book.',bioZh:'AI2 后训练负责人、Interconnects 作者——RLHF 与推理模型领域的参考级 newsletter，另著有 RLHF Book。'},
'timurban':{en:'Tim Urban',zh:'蒂姆·厄本',init:'TU',tiEn:'Writer, Wait But Why',tiZh:'Wait But Why 作者',fields:['nlp'],bioEn:'Writer behind Wait But Why. His 2015 AI Revolution series gave millions their first working mental model of AGI and superintelligence.',bioZh:'Wait But Why 博主。2015 年《AI 革命》系列让数百万人第一次真正理解 AGI 与超级智能。'},
'steveyegge':{en:'Steve Yegge',zh:'史蒂夫·耶格',init:'SY',tiEn:'Engineer & Writer · ex-Google, ex-Amazon',tiZh:'工程师与作家 · 前 Google/Amazon',fields:['nlp'],bioEn:'Legendary engineering blogger from Amazon and Google. His essays on AI coding, like Revenge of the Junior Developer, set the terms of the agentic-programming debate.',bioZh:'来自 Amazon 与 Google 的传奇工程博主。关于 AI 编程的檄文（如《初级工程师的复仇》）定义了智能体编程之争的议题。'},
'chiphuyen':{en:'Chip Huyen',zh:'奇普·胡恩',init:'CH',tiEn:'Author, AI Engineering',tiZh:'《AI Engineering》作者',fields:['nlp'],bioEn:'Writer and engineer behind the AI Engineering and Designing Machine Learning Systems books; her long-form explainers on agents are standard onboarding reading.',bioZh:'《AI Engineering》与《设计机器学习系统》作者，她的 agents 长文是从业者的标准入门读物。'},
'kokotajlo':{en:'Daniel Kokotajlo',zh:'丹尼尔·科科塔伊洛',init:'DK',tiEn:'Director, AI Futures Project · ex-OpenAI',tiZh:'AI Futures Project 负责人 · 前 OpenAI',fields:['safety'],bioEn:'Former OpenAI governance researcher who gave up equity to keep his freedom to speak, then co-authored AI 2027, the month-by-month superintelligence scenario read across governments.',bioZh:'前 OpenAI 治理研究员，为保留发声自由放弃股权，后合著《AI 2027》——被各国政策圈传阅的逐月超级智能情景推演。'},
'arvindnarayanan':{en:'Arvind Narayanan',zh:'阿尔温德·纳拉亚南',init:'AN',tiEn:'Professor, Princeton · AI Snake Oil',tiZh:'普林斯顿大学教授 · 《AI Snake Oil》作者',fields:['safety','nlp'],bioEn:'Princeton computer scientist and co-author of AI Snake Oil. AI as Normal Technology is the definitive counterargument to superintelligence framing.',bioZh:'普林斯顿计算机科学家、《AI Snake Oil》合著者。《AI as Normal Technology》是对超级智能叙事最系统的反方论述。'},
'dwarkeshpatel':{en:'Dwarkesh Patel',zh:'德瓦克什·帕特尔',init:'DP',tiEn:'Host, Dwarkesh Podcast',tiZh:'Dwarkesh 播客主理人',fields:['nlp'],bioEn:'Host of the leading long-form AI interview podcast. His essays distill hundreds of frontier conversations, including the continual-learning case for longer AGI timelines.',bioZh:'顶流 AI 深度访谈播客主理人。他的文章提炼数百场前沿对话，包括以「持续学习瓶颈」论证更长的 AGI 时间线。'},
'richsutton':{en:'Richard Sutton',zh:'理查德·萨顿',init:'RS',tiEn:'Professor, U. Alberta · 2024 Turing Award',tiZh:'阿尔伯塔大学教授 · 2024 图灵奖得主',fields:['rl'],bioEn:'A founding father of reinforcement learning and co-recipient of the 2024 Turing Award. His essay The Bitter Lesson distilled seventy years of AI research into one uncomfortable truth about compute and generality.',bioZh:'强化学习奠基人之一、2024 年图灵奖得主。他的《苦涩的教训》把七十年 AI 研究浓缩成一条关于算力与通用性的不适真相。'},
'lilianweng':{en:'Lilian Weng',zh:'翁荔',init:'LW',tiEn:'Co-founder, Thinking Machines Lab · ex-VP, OpenAI',tiZh:'Thinking Machines Lab 联合创始人 · 前 OpenAI 安全副总裁',fields:['nlp','safety'],bioEn:'Co-founder of Thinking Machines Lab and former VP of safety research at OpenAI. Her Lil-Log blog turns frontier research into definitive surveys that the field treats as reference material.',bioZh:'Thinking Machines Lab 联合创始人、前 OpenAI 安全研究副总裁。她的博客 Lil-Log 把前沿研究写成业内当作参考资料的权威综述。'},
'mattshumer':{en:'Matt Shumer',zh:'马特·舒默',init:'MS',tiEn:'Co-founder & CEO, HyperWrite',tiZh:'HyperWrite 联合创始人兼 CEO',fields:['nlp'],bioEn:'Co-founder and CEO of HyperWrite. His February 2026 essay Something Big Is Happening, on AI crossing an economic threshold, drew tens of millions of reads and a Wikipedia entry of its own.',bioZh:'HyperWrite 联合创始人兼 CEO。2026 年 2 月的长文《Something Big Is Happening》谈 AI 跨过经济阈值，数千万阅读并拥有了自己的维基词条。'},
'martinwright':{en:'Martin Wright',zh:'马丁·赖特',init:'MW',tiEn:'Independent Designer · ex-Head of Design, TPXimpact',tiZh:'独立设计师 · 前 TPXimpact 设计负责人',fields:['nlp'],bioEn:'British designer who led a 110-person design practice at TPXimpact before going independent, working on complex public services. His 2026 essays on AI and design thinking spread widely in the design community.',bioZh:'英国设计师，曾在 TPXimpact 带领约 110 人的设计团队，后独立执业，深耕复杂公共服务设计。2026 年那批谈 AI 与设计思考的文章在设计师圈广为流传。'},
'citrini':{en:'Citrini Research',zh:'Citrini Research',init:'CR',tiEn:'Thematic Investment Research',tiZh:'主题投资研究机构',fields:['nlp'],bioEn:'A pseudonymous thematic investment research group. Its 2026 scenario essay on a Global Intelligence Crisis reached tens of millions of readers and moved actual markets.',bioZh:'匿名主题投资研究团队。2026 年那篇「全球智能危机」情景推演触达数千万读者，甚至引发了真实的市场波动。'},
'albertgu':{en:'Albert Gu',zh:'阿尔伯特·顾',init:'AG',tiEn:'Assistant Professor, CMU · Chief Scientist, Cartesia',tiZh:'CMU 助理教授 · Cartesia 首席科学家',fields:['deep-learning','efficiency'],bioEn:'Creator of the structured state-space model line from S4 to Mamba, which made linear-time sequence modeling a serious alternative to attention and seeded the current wave of hybrid architectures.',bioZh:'结构化状态空间模型（S4 到 Mamba）的开创者，让线性时间序列建模成为注意力机制的有力替代，也是当前混合架构浪潮的源头。'},
'haifengwang':{en:'Haifeng Wang',zh:'王海峰',init:'HW',tiEn:'CTO, Baidu',tiZh:'百度首席技术官',fields:['nlp'],bioEn:'CTO of Baidu and former ACL president, leading the ERNIE model family from knowledge-enhanced pretraining to the ERNIE 5.0 flagship.',bioZh:'百度首席技术官、ACL 前主席，主导文心 ERNIE 大模型系列，从知识增强预训练到 ERNIE 5.0 旗舰。'},
'alihatamizadeh':{en:'Ali Hatamizadeh',zh:'阿里·哈塔米扎德',init:'AH',tiEn:'Senior Research Scientist, NVIDIA',tiZh:'NVIDIA 高级研究科学家',fields:['deep-learning','efficiency'],bioEn:'NVIDIA researcher on efficient architectures, from FasterViT and MambaVision to the Gated DeltaNet line of linear-attention models.',bioZh:'NVIDIA 高效架构研究者，从 FasterViT、MambaVision 到 Gated DeltaNet 线性注意力系列。'},
'jianfenggao':{en:'Jianfeng Gao',zh:'高剑峰',init:'JG',tiEn:'Distinguished Scientist & VP, Microsoft Research',tiZh:'微软研究院杰出科学家、副总裁',fields:['nlp','rl'],bioEn:'Leads the Deep Learning group at Microsoft Research, with work spanning web search ranking, DeBERTa, multimodal LLMs and agent research.',bioZh:'微软研究院深度学习组负责人，工作横跨网页搜索排序、DeBERTa、多模态大模型与智能体研究。'},
'meituan':{en:'Meituan LongCat Team',zh:'美团 LongCat 团队',init:'ML',tiEn:'Frontier Model Team, Meituan',tiZh:'美团前沿模型团队',fields:['nlp','efficiency'],bioEn:'Meituan frontier-model group behind the LongCat series, probing scaling choices such as embedding scaling versus expert scaling.',bioZh:'美团前沿模型团队，LongCat 系列的缔造者，探索 embedding 扩展与专家扩展等 scaling 路线。'},
'satya':{en:'Satya Nadella',zh:'萨提亚·纳德拉',init:'SN',tiEn:'Chairman & CEO, Microsoft',tiZh:'微软董事长兼 CEO',fields:['nlp','efficiency'],bioEn:'Chairman and CEO of Microsoft. His Scratchpad essays frame the AI platform shift: human capital vs token capital, learning loops, and a positive-sum ecosystem.',bioZh:'微软董事长兼 CEO。他的 Scratchpad 长文勾勒 AI 平台迁移：人力资本与 token 资本、学习闭环与正和生态。'},
'sam':{en:'Sam Altman',zh:'萨姆·奥尔特曼',init:'SA',tiEn:'Co-founder & CEO, OpenAI',tiZh:'OpenAI 联合创始人兼 CEO',fields:['nlp','safety'],bioEn:'Co-founder and CEO of OpenAI. His essays chart the company\'s worldview: the Intelligence Age, abundance economics, and the path through the singularity.',bioZh:'OpenAI 联合创始人兼 CEO。他的博客勾勒了 OpenAI 的世界观：智能时代、富足经济学与走向奇点之路。'},
'deepmind':{en:'Google DeepMind',zh:'谷歌 DeepMind',init:'DM',tiEn:'AI research lab (Gemini, AlphaFold, AlphaGo)',tiZh:'AI 研究实验室（Gemini、AlphaFold、AlphaGo）',fields:['deep-learning','rl'],bioEn:'Google\'s AI research lab behind AlphaGo, AlphaFold, and Gemini; foundational work in deep RL, protein folding, and frontier models.',bioZh:'谷歌旗下 AI 研究实验室，AlphaGo、AlphaFold、Gemini 的缔造者；深度强化学习、蛋白质折叠与前沿模型的奠基者。'},
'tombrown':{en:'Tom Brown',zh:'汤姆·布朗',init:'TB',tiEn:'Co-founder, Anthropic',tiZh:'Anthropic 联合创始人',fields:['nlp','deep-learning'],bioEn:'Co-founder of Anthropic and lead author of the GPT-3 paper. He leads the compute and scaling effort that trains frontier models like Claude.',bioZh:'Anthropic 联合创始人，GPT-3 论文的主要作者。主导训练 Claude 等前沿模型的算力与扩展工作。'},
'askell':{en:'Amanda Askell',zh:'阿曼达·阿斯克尔',init:'AA',tiEn:'Philosopher, Anthropic',tiZh:'Anthropic 哲学家',fields:['safety','nlp'],bioEn:'Philosopher at Anthropic who shapes the character and values of Claude. She works at the intersection of philosophy and AI alignment, thinking about how models should behave, hold values, and treat the people they talk to.',bioZh:'Anthropic 哲学家，负责塑造 Claude 的性格与价值观。工作处在哲学与 AI 对齐的交叉点，思考模型应如何行事、秉持价值观、以及如何对待与之交流的人。'},
'antonoglou':{en:'Ioannis Antonoglou',zh:'扬尼斯·安东诺格鲁',init:'IA',tiEn:'Co-founder & CTO, Reflection AI',tiZh:'Reflection AI 联合创始人兼 CTO',fields:['rl','deep-learning'],bioEn:'Co-founder and CTO of Reflection AI and a co-creator of AlphaGo and AlphaZero at DeepMind. A reinforcement-learning researcher turned frontier-agent builder.',bioZh:'Reflection AI 联合创始人兼 CTO，DeepMind 时期是 AlphaGo 与 AlphaZero 的共同创造者。从强化学习研究者转向前沿智能体的构建者。'},
'tworek':{en:'Jerry Tworek',zh:'杰里·特沃雷克',init:'JT',tiEn:'VP of Research, OpenAI',tiZh:'OpenAI 研究副总裁',fields:['nlp','deep-learning'],bioEn:'VP of Research at OpenAI, where he leads the reasoning effort behind o1, o3 and GPT-5 thinking. He focuses on making models reason reliably over long, hard problems.',bioZh:'OpenAI 研究副总裁，主导 o1、o3 与 GPT-5 思考背后的推理研究。专注于让模型在漫长、困难的问题上可靠推理。'},
'justinjohnson':{en:'Justin Johnson',zh:'贾斯汀·约翰逊',init:'JJ',tiEn:'Co-founder, World Labs',tiZh:'World Labs 联合创始人',fields:['vision','deep-learning'],bioEn:'Co-founder of World Labs with Fei-Fei Li, building spatial intelligence and generative 3D world models. Earlier a computer-vision researcher known for teaching Stanford CS231n and work on style transfer.',bioZh:'与李飞飞联合创办 World Labs，研究空间智能与生成式 3D 世界模型。此前是计算机视觉研究者，以讲授斯坦福 CS231n 与风格迁移工作知名。'},
'kendall':{en:'Alex Kendall',zh:'亚历克斯·肯德尔',init:'AK',tiEn:'Co-founder & CEO, Wayve',tiZh:'Wayve 联合创始人兼 CEO',fields:['vision','deep-learning','robotics'],bioEn:'Co-founder and CEO of Wayve and a PhD roboticist who pioneered end-to-end learned autonomous driving and generative driving world models. A champion of embodied AI.',bioZh:'Wayve 联合创始人兼 CEO，机器人学博士，开创了端到端学习的自动驾驶与生成式驾驶世界模型。倡导具身智能。'},
'alexwei':{en:'Alexander Wei',zh:'亚历山大·魏',init:'AW',tiEn:'Research, OpenAI',tiZh:'OpenAI 研究员',fields:['safety','nlp'],bioEn:'Researcher on the OpenAI reasoning team. Known for leading work behind the model that reached IMO gold-medal level, and for using a general-purpose model to help disprove a decades-old mathematical conjecture. Focuses on advanced reasoning and math.',bioZh:'OpenAI 推理团队研究员。以主导达到 IMO 金牌水平的模型工作、以及用通用模型协助推翻一个存在数十年的数学猜想而知名。专注高级推理与数学。'},
'oriol':{en:'Oriol Vinyals',zh:'奥里奥尔·维尼亚尔斯',init:'OV',tiEn:'VP of Research, Google DeepMind; Gemini co-lead',tiZh:'Google DeepMind 研究副总裁、Gemini 联合技术负责人',fields:['deep-learning','rl'],bioEn:'Oriol Vinyals is VP of Research at Google DeepMind and co-technical lead of Gemini. He co-created sequence-to-sequence learning and AlphaStar, and pioneered pointer networks and one-shot learning.',bioZh:'奥里奥尔·维尼亚尔斯是 Google DeepMind 研究副总裁、Gemini 联合技术负责人。他共同提出了序列到序列学习与 AlphaStar，开创了指针网络与单样本学习等方向。'},
'yejin':{en:'Yejin Choi',zh:'崔艺珍',init:'YC',tiEn:'Professor, Stanford University; Senior Director, NVIDIA',tiZh:'斯坦福大学教授（前 NVIDIA、AI2）',fields:['nlp','safety'],bioEn:'Yejin Choi is a professor at Stanford University and senior director at NVIDIA, known for commonsense reasoning, nucleus sampling and machine morality (Delphi). MacArthur Fellow.',bioZh:'崔艺珍是斯坦福大学教授、NVIDIA 高级总监，以常识推理、核采样与机器道德（Delphi）研究著称，麦克阿瑟天才奖得主。'},
'karpathy':{en:'Andrej Karpathy',zh:'安德烈·卡帕西',init:'AK',tiEn:'Founder, Eureka Labs; ex-OpenAI, ex-Tesla AI',tiZh:'Eureka Labs 创始人，OpenAI 创始成员、前特斯拉 AI 总监',fields:['deep-learning','vision'],bioEn:'Andrej Karpathy is the founder of Eureka Labs, a founding member of OpenAI and former Director of AI at Tesla. His Stanford research with Fei-Fei Li connected computer vision and natural language.',bioZh:'安德烈·卡帕西是 Eureka Labs 创始人、OpenAI 创始成员、前特斯拉 AI 总监。他在斯坦福与李飞飞合作的研究打通了计算机视觉与自然语言。'},
'openai':{en:'OpenAI',zh:'OpenAI',init:'OA',tiEn:'Frontier AI lab (GPT / DALL·E / Codex)',tiZh:'前沿 AI 实验室（GPT / DALL·E / Codex）',fields:['nlp','deep-learning'],bioEn:'The AI lab behind the GPT series, DALL·E, Codex and Whisper; org-authored technical reports collected here.',bioZh:'GPT 系列、DALL·E、Codex、Whisper 背后的 AI 实验室；此处收录其机构署名的技术报告。'},
'anthropic':{en:'Anthropic',zh:'Anthropic',init:'AN',tiEn:'AI safety lab (Claude); interpretability & alignment',tiZh:'AI 安全实验室（Claude）；可解释性与对齐',fields:['safety','nlp'],bioEn:'AI safety company behind Claude; pioneering RLHF, Constitutional AI, red-teaming and mechanistic interpretability.',bioZh:'Claude 背后的 AI 安全公司；RLHF、宪法式 AI、红队测试与机制可解释性的先驱。'},
'jdevlin':{en:'Jacob Devlin',zh:'雅各布·德夫林',init:'JD',tiEn:'Lead author of BERT; ex-Google, ex-OpenAI',tiZh:'BERT 主要作者；曾任 Google、OpenAI',fields:['nlp','deep-learning'],bioEn:'Lead author of BERT, which brought bidirectional Transformer pretraining to NLP. Formerly Google and OpenAI.',bioZh:'BERT 主要作者，把双向 Transformer 预训练带入 NLP。曾任职 Google、OpenAI。'},

'loubna':{en:'Loubna Ben Allal',zh:'Loubna Ben Allal',init:'LB',tiEn:'Hugging Face, data-centric small LMs',tiZh:'Hugging Face，数据为中心的小语言模型',fields:['nlp','efficiency'],bioEn:'Loubna Ben Allal works on data-centric small LMs at Hugging Face, focusing on SmolLM2.',bioZh:'Loubna Ben Allal 在 Hugging Face 从事以数据为中心的小语言模型研究，专注于 SmolLM2。'},
'bowenjin':{en:'Bowen Jin',zh:'金博文',init:'BJ',tiEn:'UIUC, RL for search-augmented reasoning',tiZh:'UIUC，搜索增强推理的强化学习',fields:['rl','nlp'],bioEn:'Bowen Jin is a researcher at UIUC working on Search-R1, applying RL to search-augmented reasoning.',bioZh:'金博文是 UIUC 的研究员，从事 Search-R1 研究，将强化学习应用于搜索增强推理。'},
'qiyingyu':{en:'Qiying Yu',zh:'于琪颖',init:'QY',tiEn:'ByteDance Seed / Tsinghua, RL for reasoning',tiZh:'字节跳动 Seed / 清华，推理的强化学习',fields:['rl','nlp'],bioEn:'Qiying Yu works at ByteDance Seed and Tsinghua on DAPO and Seed1.5-Thinking, using RL for reasoning.',bioZh:'于琪颖在字节跳动 Seed 和清华大学工作，研究 DAPO 和 Seed1.5-Thinking，利用强化学习进行推理。'},
'yugao':{en:'Yu Gao',zh:'高宇',init:'YG',tiEn:'ByteDance Seed, image & video generation',tiZh:'字节跳动 Seed，图像与视频生成',fields:['generative','vision'],bioEn:'Yu Gao is a researcher at ByteDance Seed working on Seedream and Seedance for image and video generation.',bioZh:'高宇是字节跳动 Seed 的研究员，从事 Seedream 和 Seedance 的图像与视频生成研究。'},
'andrewzhao':{en:'Andrew Zhao',zh:'Andrew Zhao',init:'AZ',tiEn:'Tsinghua University, self-play reasoning',tiZh:'清华大学，自我博弈推理',fields:['rl','nlp'],bioEn:'Andrew Zhao is at Tsinghua University working on Absolute Zero, a self-play reasoning method with zero data.',bioZh:'Andrew Zhao 在清华大学研究 Absolute Zero，一种零数据的自我博弈推理方法。'},
'chaoruideng':{en:'Chaorui Deng',zh:'邓超瑞',init:'CD',tiEn:'ByteDance Seed, unified multimodal understanding & generation',tiZh:'字节跳动 Seed，统一多模态理解与生成',fields:['vision','generative'],bioEn:'Chaorui Deng works at ByteDance Seed on BAGEL, a unified model for multimodal understanding and generation.',bioZh:'邓超瑞在字节跳动 Seed 研究 BAGEL，一个统一的多模态理解与生成模型。'},
'jujiehe':{en:'Jujie He',zh:'何巨杰',init:'JH',tiEn:'Skywork AI, open reasoning model',tiZh:'天工 AI，开放推理模型',fields:['rl','nlp'],bioEn:'Jujie He is a researcher at Skywork AI, leading the development of Skywork Open Reasoner 1.',bioZh:'何巨杰是天工 AI 的研究员，主导 Skywork Open Reasoner 1 的开发。'},
'mingjieliu':{en:'Mingjie Liu',zh:'刘明杰',init:'ML',tiEn:'NVIDIA, prolonged RL for reasoning',tiZh:'NVIDIA，延长强化学习以扩展推理',fields:['rl','nlp'],bioEn:'Mingjie Liu works at NVIDIA on ProRL, using prolonged reinforcement learning to expand reasoning capabilities.',bioZh:'刘明杰在 NVIDIA 研究 ProRL，通过延长强化学习来扩展推理能力。'},
'akhiadbercovich':{en:'Akhiad Bercovich',zh:'Akhiad Bercovich',init:'AB',tiEn:'NVIDIA, efficient reasoning models',tiZh:'NVIDIA，高效推理模型',fields:['nlp','efficiency'],bioEn:'Akhiad Bercovich is at NVIDIA working on Llama-Nemotron and Nemotron Nano 2 for efficient reasoning.',bioZh:'Akhiad Bercovich 在 NVIDIA 研究 Llama-Nemotron 和 Nemotron Nano 2，致力于高效推理。'},
'shiyinlu':{en:'Shiyin Lu',zh:'卢诗音',init:'SL',tiEn:'Alibaba AIDC-AI, multimodal LLM',tiZh:'阿里巴巴 AIDC-AI，多模态大语言模型',fields:['vision','nlp'],bioEn:'Shiyin Lu works at Alibaba AIDC-AI on Ovis2.5, a multimodal large language model.',bioZh:'卢诗音在阿里巴巴 AIDC-AI 研究 Ovis2.5，一个多模态大语言模型。'},
'zhihaodu':{en:'Zhihao Du',zh:'杜志浩',init:'ZD',tiEn:'Alibaba Tongyi Speech, scalable speech generation',tiZh:'阿里巴巴通义语音，可扩展语音生成',fields:['nlp','generative'],bioEn:'Zhihao Du is a researcher at Alibaba Tongyi Speech, working on CosyVoice for scalable speech generation.',bioZh:'杜志浩是阿里巴巴通义语音的研究员，研究 CosyVoice 以实现可扩展的语音生成。'},
'bihuo':{en:'Bi Huo',zh:'火碧',init:'BH',tiEn:'rednote hi-lab, open MoE LLM',tiZh:'小红书 hi-lab，开放 MoE 大语言模型',fields:['nlp','efficiency'],bioEn:'Bi Huo works at rednote hi-lab on dots.llm1, an open mixture-of-experts large language model.',bioZh:'火碧在小红书 hi-lab 研究 dots.llm1，一个开放的混合专家大语言模型。'},
'stepfun':{en:'StepFun',zh:'阶跃星辰',init:'SF',tiEn:'StepFun, multimodal generation',tiZh:'阶跃星辰，多模态生成',fields:['nlp','generative'],bioEn:'StepFun develops Step-3, Step-Audio, and Step-Audio 2 for multimodal generation.',bioZh:'阶跃星辰开发 Step-3、Step-Audio 和 Step-Audio 2，用于多模态生成。'},
'antling':{en:'Ling Team (inclusionAI)',zh:'Ling Team (inclusionAI)',init:'LT',tiEn:'Ant Group / inclusionAI, large MoE model',tiZh:'蚂蚁集团 / inclusionAI，大型 MoE 模型',fields:['efficiency','nlp'],bioEn:'Ling Team at Ant Group and inclusionAI developed Ling, a 300B MoE model without premium GPUs.',bioZh:'蚂蚁集团和 inclusionAI 的 Ling 团队开发了 Ling，一个无需高端 GPU 的 300B MoE 模型。'},
'minicpm':{en:'MiniCPM Team (OpenBMB)',zh:'MiniCPM Team (OpenBMB)',init:'MC',tiEn:'OpenBMB / Tsinghua, on-device LLMs',tiZh:'OpenBMB / 清华，端侧大语言模型',fields:['efficiency','nlp'],bioEn:'MiniCPM Team at OpenBMB and Tsinghua develops MiniCPM4, ultra-efficient on-device LLMs.',bioZh:'OpenBMB 和清华的 MiniCPM 团队开发 MiniCPM4，超高效的端侧大语言模型。'},
'xiaomimimo':{en:'Xiaomi MiMo Team',zh:'小米 MiMo 团队',init:'XM',tiEn:'Xiaomi LLM-Core, multimodal LLM',tiZh:'小米 LLM-Core，多模态大语言模型',fields:['vision','nlp','robotics'],bioEn:'Xiaomi MiMo Team works on MiMo-VL, a multimodal large language model at Xiaomi LLM-Core.',bioZh:'小米 MiMo 团队在小米 LLM-Core 研究 MiMo-VL，一个多模态大语言模型。'},
'wanteam':{en:'Tongyi Wan Team',zh:'通义万相团队',init:'TW',tiEn:'Alibaba Tongyi Wanxiang, video generation',tiZh:'阿里巴巴通义万相，视频生成',fields:['generative','vision'],bioEn:'Tongyi Wan Team at Alibaba develops Wan, a large-scale video generation model.',bioZh:'阿里巴巴通义万相团队开发 Wan，一个大规模视频生成模型。'},

 'ilya':{en:'Ilya Sutskever',zh:'伊利亚·苏茨克维尔',init:'IS',tiEn:'Co-founder, SSI (prev. Chief Scientist, OpenAI)',tiZh:'SSI 联合创始人 · 前 OpenAI 首席科学家',fields:['deep-learning','nlp'],
   bioEn:'A central figure in the deep-learning era — co-author of AlexNet and Seq2Seq, former Chief Scientist of OpenAI, now building Safe Superintelligence.',
   bioZh:'深度学习时代的核心人物——AlexNet 与 Seq2Seq 的共同作者，曾任 OpenAI 首席科学家，现创办 Safe Superintelligence。'},
 'bengio':{en:'Yoshua Bengio',zh:'约书亚·本吉奥',init:'YB',tiEn:'Professor, Mila / U. Montréal; Turing Award',tiZh:'蒙特利尔大学 / Mila 教授 · 图灵奖得主',fields:['deep-learning','nlp'],
   bioEn:'A Turing Award laureate and one of the founders of modern deep learning; pioneered attention for neural machine translation and much of representation learning.',
   bioZh:'图灵奖得主、现代深度学习奠基人之一;开创了神经机器翻译中的注意力机制与大量表示学习方法。'},
 'tridao':{en:'Tri Dao',zh:'特里·道',init:'TD',tiEn:'Chief Scientist, Together AI; Professor, Princeton',tiZh:'Together AI 首席科学家 · 普林斯顿教授',fields:['efficiency','nlp'],
   bioEn:'Creator of FlashAttention and co-inventor of Mamba; works on efficient, hardware-aware architectures for long-sequence modeling.',
   bioZh:'FlashAttention 作者、Mamba 共同发明人;专注长序列建模的高效、硬件感知架构。'},
 'shunyuyao':{en:'Shunyu Yao',zh:'姚顺雨',init:'SY',tiEn:'Researcher, OpenAI (PhD, Princeton)',tiZh:'OpenAI 研究员（普林斯顿大学博士）',fields:['nlp','rl'],
   bioEn:'Researcher at OpenAI, PhD from Princeton, known for chain-of-thought reasoning.',
   bioZh:'OpenAI 研究员，普林斯顿博士，以思维链推理闻名。'},
 'xiangyuzhang':{en:'Xiangyu Zhang',zh:'张祥雨',init:'XZ',tiEn:'Chief Research Scientist, MEGVII (Face++) / StepFun',tiZh:'旷视科技 / 阶跃星辰首席研究员',fields:['vision','efficiency'],
   bioEn:'Chief Research Scientist at MEGVII and StepFun, expert in computer vision.',
   bioZh:'旷视科技和阶跃星辰首席研究科学家，计算机视觉专家。'},
 'junzhu':{en:'Jun Zhu',zh:'朱军',init:'JZ',tiEn:'Professor at Tsinghua University, Generative Models and Embodied AI',tiZh:'清华大学教授，生成模型与具身智能',fields:['generative','deep-learning','robotics'],
   bioEn:'Tsinghua professor working on generative models and embodied AI.',
   bioZh:'清华大学教授，研究生成模型和具身智能。'},
 'sebastienbubeck':{en:'Sebastien Bubeck',zh:'Sebastien Bubeck',init:'SB',tiEn:'VP AI; ex-Microsoft Research (Phi)',tiZh:'AI 副总裁；前微软研究院（Phi 系列）',fields:['nlp','deep-learning'],
   bioEn:'VP AI, ex-Microsoft Research, known for Phi models.',
   bioZh:'AI 副总裁，前微软研究院，以 Phi 模型闻名。'},
 'jifengdai':{en:'Jifeng Dai',zh:'代季峰',init:'JD',tiEn:'Associate Professor, Tsinghua University; former SenseTime / Microsoft Research Asia',tiZh:'清华大学副教授，原商汤科技 / 微软亚洲研究院',fields:['vision','deep-learning'],
   bioEn:'Tsinghua associate professor, ex-SenseTime and Microsoft Research Asia.',
   bioZh:'清华大学副教授，前商汤科技和微软亚洲研究院。'},
 'junyanglin':{en:'Junyang Lin',zh:'林俊旸',init:'JL',tiEn:'Lead, Qwen Team, Alibaba',tiZh:'阿里巴巴 Qwen 团队负责人',fields:['nlp','deep-learning'],
   bioEn:'Lead of Qwen team at Alibaba, driving large language models.',
   bioZh:'阿里巴巴通义千问团队负责人，推动大语言模型发展。'},
 
 'zhuangliu':{en:'Zhuang Liu',zh:'刘壮',init:'ZL',tiEn:'Research Scientist, Meta AI (FAIR)',tiZh:'Meta AI (FAIR) 研究科学家',fields:['vision','deep-learning'],
   bioEn:'Research scientist at Meta AI (FAIR), contributor to ConvNeXt.',
   bioZh:'Meta AI 研究科学家，ConvNeXt 贡献者。'},
 'leizhangidea':{en:'Lei Zhang',zh:'张磊',init:'LZ',tiEn:'Chair Professor, HKUST(GZ); founding head of IDEA Research CVR; former Microsoft',tiZh:'香港科技大学（广州）讲席教授，粤港澳大湾区数字经济研究院（IDEA）计算机视觉负责人',fields:['vision','deep-learning'],
   bioEn:'Chair professor at HKUST(GZ), founding head of IDEA Research CVR.',
   bioZh:'香港科技大学（广州）讲座教授，IDEA 研究院计算机视觉与机器人中心创始主任。'},
 'lindahua':{en:'Dahua Lin',zh:'林达华',init:'DL',tiEn:'Professor, CUHK; Lead Scientist, Shanghai AI Laboratory (InternLM)',tiZh:'香港中文大学教授；上海人工智能实验室领军科学家 (InternLM)',fields:['vision','nlp'],
   bioEn:'CUHK professor and lead scientist at Shanghai AI Lab, co-leading InternLM.',
   bioZh:'香港中文大学教授，上海人工智能实验室首席科学家，联合领导 InternLM。'},
 'lianminzheng':{en:'Lianmin Zheng',zh:'郑怜悯',init:'LZ',tiEn:'ML Systems Researcher, Co-creator of vLLM and SGLang',tiZh:'机器学习系统研究者，vLLM 与 SGLang 共同作者',fields:['efficiency','nlp'],
   bioEn:'ML systems researcher, co-creator of vLLM and SGLang.',
   bioZh:'机器学习系统研究员，vLLM 和 SGLang 共同创建者。'},
 'aarongrattafiori':{en:'Aaron Grattafiori',zh:'Aaron Grattafiori',init:'AG',tiEn:'Research Lead, Meta AI (Llama)',tiZh:'Meta AI 研究负责人（Llama）',fields:['nlp','deep-learning'],
   bioEn:'Research lead at Meta AI, key contributor to Llama models.',
   bioZh:'Meta AI 研究负责人，Llama 模型关键贡献者。'},
 'zeliu':{en:'Ze Liu',zh:'刘泽',init:'ZL',tiEn:'Researcher (Swin Transformer); former Microsoft Research Asia',tiZh:'Swin Transformer 主要作者，原微软亚洲研究院',fields:['vision','deep-learning'],
   bioEn:'Researcher known for Swin Transformer, ex-Microsoft Research Asia.',
   bioZh:'以 Swin Transformer 闻名的研究员，前微软亚洲研究院。'},
 'sarahooker':{en:'Sara Hooker',zh:'Sara Hooker',init:'SH',tiEn:'Head of Cohere For AI',tiZh:'Cohere For AI 负责人',fields:['nlp','safety'],
   bioEn:'Head of Cohere For AI, advocate for responsible AI.',
   bioZh:'Cohere For AI 负责人，倡导负责任 AI。'},
 'pingluo':{en:'Ping Luo',zh:'罗平',init:'PL',tiEn:'Associate Professor, The University of Hong Kong',tiZh:'香港大学副教授',fields:['vision','deep-learning'],
   bioEn:'Associate professor at University of Hong Kong, expert in deep learning.',
   bioZh:'香港大学副教授，深度学习专家。'},
 'yanjunjie':{en:'Junjie Yan',zh:'闫俊杰',init:'JY',tiEn:'Founder & CEO, MiniMax',tiZh:'MiniMax 创始人兼 CEO',fields:['deep-learning','efficiency'],
   bioEn:'Founder and CEO of MiniMax, building large-scale AI models.',
   bioZh:'MiniMax 创始人兼 CEO，构建大规模 AI 模型。'},
 'timoschick':{en:'Timo Schick',zh:'蒂莫·席克',init:'TS',tiEn:'Research scientist (ex-Meta AI / FAIR)',tiZh:'研究科学家（前 Meta AI / FAIR）',fields:['nlp','deep-learning'],
   bioEn:'Research scientist, ex-Meta AI, known for instruction tuning.',
   bioZh:'研究科学家，前 Meta AI，以指令微调闻名。'},
 'keyutian':{en:'Keyu Tian',zh:'田柯宇',init:'KT',tiEn:'Researcher (Visual Autoregressive Modeling); Peking University / ByteDance',tiZh:'视觉自回归（VAR）作者，北京大学 / 字节跳动',fields:['generative','vision'],
   bioEn:'Researcher in visual autoregressive modeling, Peking University and ByteDance.',
   bioZh:'视觉自回归建模研究员，北京大学和字节跳动。'},
 'thomasmesnard':{en:'Thomas Mesnard',zh:'Thomas Mesnard',init:'TM',tiEn:'Research Scientist, Google DeepMind (Gemma)',tiZh:'Google DeepMind 研究科学家（Gemma）',fields:['nlp','deep-learning'],
   bioEn:'Research Scientist at Google DeepMind, co-lead of the Gemma project, advancing open language models.',
   bioZh:'谷歌 DeepMind 研究科学家，Gemma 项目联合负责人，推动开放语言模型发展。'},
 'dirkgroeneveld':{en:'Dirk Groeneveld',zh:'Dirk Groeneveld',init:'DG',tiEn:'Research Scientist, Allen Institute for AI (OLMo)',tiZh:'艾伦人工智能研究院研究科学家（OLMo）',fields:['nlp','deep-learning'],
   bioEn:'Research Scientist at Allen Institute for AI, key contributor to the OLMo open language model.',
   bioZh:'艾伦人工智能研究所研究科学家，OLMo 开放语言模型核心贡献者。'},
 'morganeriviere':{en:'Morgane Riviere',zh:'Morgane Riviere',init:'MR',tiEn:'Research Scientist, Google DeepMind (Gemma 2)',tiZh:'Google DeepMind 研究科学家（Gemma 2）',fields:['nlp','deep-learning'],
   bioEn:'Research Scientist at Google DeepMind, lead of the Gemma 2 project, advancing efficient language models.',
   bioZh:'谷歌 DeepMind 研究科学家，Gemma 2 项目负责人，推进高效语言模型。'},
 'jakebruce':{en:'Jake Bruce',zh:'杰克·布鲁斯',init:'JB',tiEn:'Research scientist, Google DeepMind',tiZh:'Google DeepMind 研究科学家',fields:['generative','rl','robotics'],
   bioEn:'Research Scientist at Google DeepMind, focusing on reinforcement learning and robotics.',
   bioZh:'谷歌 DeepMind 研究科学家，专注于强化学习与机器人技术。'},
 'xingwusun':{en:'Xingwu Sun',zh:'孙兴武',init:'XS',tiEn:'Lead Researcher, Hunyuan Team, Tencent',tiZh:'腾讯混元大模型团队主研究员',fields:['nlp','deep-learning','robotics'],
   bioEn:'Lead Researcher at Tencent\'s Hunyuan Team, driving innovation in large-scale AI models.',
   bioZh:'腾讯混元团队首席研究员，推动大规模 AI 模型创新。'},
 'yunjeychoi':{en:'Yunjey Choi',zh:'崔允载',init:'YC',tiEn:'Research Scientist, NAVER/Clova (StarGAN)',tiZh:'NAVER/Clova 研究科学家（StarGAN）',fields:['generative','vision'],
   bioEn:'Research Scientist at NAVER/Clova, creator of StarGAN for image-to-image translation.',
   bioZh:'NAVER/Clova 研究科学家，StarGAN 图像翻译模型创建者。'},
 'mandrychow':{en:'Marcin Andrychowicz',zh:'马尔钦·安德里霍维奇',init:'MA',tiEn:'Research Scientist, Google DeepMind; formerly OpenAI',tiZh:'Google DeepMind 研究科学家，前 OpenAI',fields:['rl','deep-learning','robotics'],
   bioEn:'Research Scientist at Google DeepMind, formerly OpenAI, contributed to robotics and RL.',
   bioZh:'Google DeepMind 研究科学家，前 OpenAI，贡献于机器人和强化学习。'},
 'xinghangli':{en:'Xinghang Li',zh:'李星航',init:'XL',tiEn:'Researcher, ByteDance Research (Robotics / VLA)',tiZh:'字节跳动研究院研究员（机器人 / 视觉-语言-动作）',fields:['deep-learning','vision','robotics'],
   bioEn:'Researcher at ByteDance Research, focusing on robotics and vision-language-action models.',
   bioZh:'字节跳动研究员，专注于机器人及视觉-语言-动作模型。'},
 'deyaopeng':{en:'Deyao Zhu',zh:'朱德耀',init:'DZ',tiEn:'Researcher (MiniGPT-4 lead author), KAUST',tiZh:'研究员（MiniGPT-4 第一作者），阿卜杜拉国王科技大学',fields:['vision','nlp'],
   bioEn:'Lead author of MiniGPT-4, researcher at KAUST, working on multimodal AI.',
   bioZh:'MiniGPT-4 主要作者，KAUST 研究员，从事多模态 AI 研究。'},
 'gulati':{en:'Anmol Gulati',zh:'安莫尔·古拉蒂',init:'AG',tiEn:'Research Engineer, ex-Google Brain; Conformer ASR architecture',tiZh:'前 Google Brain 研究工程师，Conformer 架构作者',fields:['deep-learning','nlp'],
   bioEn:'Ex-Google Brain research engineer, co-author of Conformer ASR architecture.',
   bioZh:'前 Google Brain 研究工程师，Conformer 语音识别架构合著者。'},
 'yiren':{en:'Yi Ren',zh:'任意',init:'YR',tiEn:'Research Scientist, ByteDance; FastSpeech non-autoregressive TTS',tiZh:'字节跳动研究科学家，FastSpeech 非自回归 TTS 作者',fields:['deep-learning','generative'],
   bioEn:'Research Scientist at ByteDance, creator of FastSpeech non-autoregressive TTS.',
   bioZh:'字节跳动研究科学家，FastSpeech 非自回归语音合成创建者。'},
 'liyuanliu':{en:'Liyuan Liu',zh:'刘力源',init:'LL',tiEn:'Senior Researcher, Microsoft Research',tiZh:'微软研究院高级研究员',fields:['deep-learning','nlp'],
   bioEn:'Senior Researcher at Microsoft Research, contributing to NLP and deep learning.',
   bioZh:'微软研究院高级研究员，贡献于自然语言处理和深度学习。'},
 'akatharo':{en:'Angelos Katharopoulos',zh:'安杰洛斯·卡塔罗普洛斯',init:'AK',tiEn:'Research Scientist, Apple (Linear Transformers)',tiZh:'苹果研究科学家（线性 Transformer）',fields:['efficiency','deep-learning'],
   bioEn:'Research Scientist at Apple, known for linear transformers and efficient attention.',
   bioZh:'苹果研究科学家，以线性变换器和高效注意力机制闻名。'},
 'abardes':{en:'Adrien Bardes',zh:'阿德里安·巴德斯',init:'AB',tiEn:'Research Scientist, Meta AI (FAIR) / Inria',tiZh:'Meta AI（FAIR）/ Inria 研究科学家',fields:['vision','deep-learning'],
   bioEn:'Research Scientist at Meta AI (FAIR) and Inria, working on self-supervised learning.',
   bioZh:'Meta AI（FAIR）和 Inria 研究科学家，从事自监督学习研究。'},
 'jianlinsu':{en:'Jianlin Su',zh:'苏剑林',init:'JS',tiEn:'Researcher, Moonshot AI (creator of RoPE / RoFormer)',tiZh:'月之暗面研究员（RoPE/RoFormer 作者）',fields:['nlp','deep-learning'],
   bioEn:'Jianlin Su is a researcher at Moonshot AI, creator of RoPE and RoFormer, advancing transformer architectures.',
   bioZh:'简林苏，Moonshot AI 研究员，RoPE 和 RoFormer 的创造者，推动 Transformer 架构发展。'},
 'furuwei':{en:'Furu Wei',zh:'韦福如',init:'FW',tiEn:'Distinguished Scientist, Microsoft Research Asia',tiZh:'微软亚洲研究院杰出科学家',fields:['nlp','deep-learning'],
   bioEn:'Furu Wei is a Distinguished Scientist at Microsoft Research Asia, leading NLP research and large language models.',
   bioZh:'韦福如，微软亚洲研究院杰出科学家，领导自然语言处理与大型语言模型研究。'},
 'jhoffmann':{en:'Jordan Hoffmann',zh:'乔丹·霍夫曼',init:'JH',tiEn:'Research Scientist (formerly DeepMind)',tiZh:'研究科学家（原 DeepMind）',fields:['deep-learning','nlp'],
   bioEn:'Jordan Hoffmann is a research scientist formerly at DeepMind, contributing to AI and reinforcement learning.',
   bioZh:'乔丹·霍夫曼，前 DeepMind 研究科学家，贡献于人工智能与强化学习。'},
 'ybai':{en:'Yuntao Bai',zh:'白云涛',init:'YB',tiEn:'Research Scientist, Anthropic',tiZh:'Anthropic 研究科学家',fields:['safety','nlp'],
   bioEn:'Yuntao Bai is a research scientist at Anthropic, focusing on AI safety and alignment.',
   bioZh:'白云涛，Anthropic 研究科学家，专注于 AI 安全与对齐。'},
 'rrafailov':{en:'Rafael Rafailov',zh:'拉斐尔·拉法伊洛夫',init:'RR',tiEn:'PhD, Stanford University',tiZh:'斯坦福大学博士',fields:['rl','nlp'],
   bioEn:'Rafael Rafailov is a PhD from Stanford University, known for work on reinforcement learning from human feedback.',
   bioZh:'拉斐尔·拉法伊洛夫，斯坦福大学博士，以基于人类反馈的强化学习研究闻名。'},
 'zshao':{en:'Zhihong Shao',zh:'邵智宏',init:'ZS',tiEn:'Research Scientist, DeepSeek-AI',tiZh:'DeepSeek 研究科学家',fields:['nlp','rl'],
   bioEn:'Zhihong Shao is a research scientist at DeepSeek-AI, contributing to large language model development.',
   bioZh:'邵志宏，DeepSeek-AI 研究科学家，参与大型语言模型开发。'},
 'achowdhery':{en:'Aakanksha Chowdhery',zh:'阿坎莎·乔杜里',init:'AC',tiEn:'Research Scientist (PaLM lead), Google / Anthropic',tiZh:'PaLM 负责人，Google / Anthropic 研究科学家',fields:['nlp','deep-learning'],
   bioEn:'Aakanksha Chowdhery is a research scientist, lead of PaLM at Google, now at Anthropic.',
   bioZh:'阿坎克莎·乔杜里，Google PaLM 项目负责人，现 Anthropic 研究科学家。'},
 'gaohuang':{en:'Gao Huang',zh:'黄高',init:'GH',tiEn:'Associate Professor, Tsinghua University',tiZh:'清华大学副教授',fields:['vision','deep-learning'],
   bioEn:'Gao Huang is an associate professor at Tsinghua University, known for DenseNet and deep learning research.',
   bioZh:'黄高，清华大学副教授，以 DenseNet 和深度学习研究闻名。'},
 'tsungyilin':{en:'Tsung-Yi Lin',zh:'林宗毅',init:'TL',tiEn:'Research Scientist, NVIDIA (formerly Google Brain, FAIR)',tiZh:'NVIDIA 研究科学家（原 Google Brain、FAIR）',fields:['vision','deep-learning'],
   bioEn:'Tsung-Yi Lin is a research scientist at NVIDIA, known for Focal Loss and object detection.',
   bioZh:'林宗毅，NVIDIA 研究科学家，以 Focal Loss 和目标检测研究闻名。'},
 'oronneberger':{en:'Olaf Ronneberger',zh:'奥拉夫·罗内贝格尔',init:'OR',tiEn:'Research Scientist, DeepMind (formerly University of Freiburg)',tiZh:'DeepMind 研究科学家（原弗莱堡大学）',fields:['vision','deep-learning'],
   bioEn:'Olaf Ronneberger is a research scientist at DeepMind, creator of U-Net for biomedical image segmentation.',
   bioZh:'奥拉夫·罗内伯格，DeepMind 研究科学家，U-Net 生物医学图像分割的创造者。'},
 'lcchen':{en:'Liang-Chieh Chen',zh:'陈良杰',init:'LC',tiEn:'Research Scientist, ByteDance (formerly Google)',tiZh:'字节跳动研究科学家（原 Google）',fields:['vision','deep-learning'],
   bioEn:'Liang-Chieh Chen is a research scientist at ByteDance, known for DeepLab series in semantic segmentation.',
   bioZh:'陈良杰，字节跳动研究科学家，以 DeepLab 系列语义分割研究闻名。'},
 'jwang':{en:'Jingdong Wang',zh:'王井东',init:'JW',tiEn:'Chief Scientist of Computer Vision, Baidu (formerly Microsoft Research Asia)',tiZh:'百度计算机视觉首席科学家（原微软亚洲研究院）',fields:['vision','deep-learning'],
   bioEn:'Jingdong Wang is Chief Scientist of Computer Vision at Baidu, formerly at Microsoft Research Asia.',
   bioZh:'王井东，百度计算机视觉首席科学家，前微软亚洲研究院研究员。'},
 'jbgrill':{en:'Jean-Bastien Grill',zh:'让-巴蒂斯特·格里尔',init:'JG',tiEn:'Research Scientist, Google DeepMind',tiZh:'Google DeepMind 研究科学家',fields:['vision','deep-learning'],
   bioEn:'Jean-Bastien Grill is a research scientist at Google DeepMind, contributing to reinforcement learning and optimization.',
   bioZh:'让-巴斯蒂安·格里尔，Google DeepMind 研究科学家，贡献于强化学习与优化。'},
 'moquab':{en:'Maxime Oquab',zh:'马克西姆·奥卡布',init:'MO',tiEn:'Research Scientist, Meta AI (FAIR)',tiZh:'Meta AI（FAIR）研究科学家',fields:['vision','deep-learning'],
   bioEn:'Maxime Oquab is a research scientist at Meta AI (FAIR), known for self-supervised learning and video understanding.',
   bioZh:'马克西姆·奥夸布，Meta AI (FAIR)研究科学家，以自监督学习和视频理解闻名。'},
 'pisola':{en:'Phillip Isola',zh:'菲利普·伊索拉',init:'PI',tiEn:'Associate Professor, MIT',tiZh:'麻省理工学院副教授',fields:['generative','vision'],
   bioEn:'Phillip Isola is an associate professor at MIT, known for work on generative models and image-to-image translation.',
   bioZh:'菲利普·伊索拉，MIT 副教授，以生成模型和图像到图像翻译研究闻名。'},
 'arjovsky':{en:'Martin Arjovsky',zh:'马丁·阿尔约夫斯基',init:'MA',tiEn:'Research Scientist; GAN training theory (Wasserstein GAN)',tiZh:'研究科学家，GAN 训练理论（Wasserstein GAN）',fields:['generative','deep-learning'],
   bioEn:'Martin Arjovsky is a research scientist, known for Wasserstein GAN and GAN training theory.',
   bioZh:'马丁·阿约夫斯基，研究科学家，以 Wasserstein GAN 和 GAN 训练理论闻名。'},
 'abrock':{en:'Andrew Brock',zh:'安德鲁·布洛克',init:'AB',tiEn:'Research Scientist, Google DeepMind (BigGAN)',tiZh:'谷歌 DeepMind 研究科学家（BigGAN）',fields:['generative','vision'],
   bioEn:'Andrew Brock is a research scientist at Google DeepMind, known for BigGAN and large-scale generative models.',
   bioZh:'安德鲁·布洛克，Google DeepMind 研究科学家，以 BigGAN 和大规模生成模型闻名。'},
 'csaharia':{en:'Chitwan Saharia',zh:'奇特万·萨哈里亚',init:'CS',tiEn:'Researcher (formerly Google Brain, Imagen lead)',tiZh:'研究员（原 Google Brain，Imagen 负责人）',fields:['generative','vision'],
   bioEn:'Chitwan Saharia is a researcher formerly at Google Brain, lead of Imagen text-to-image model.',
   bioZh:'奇特万·萨哈里亚，前 Google Brain 研究员，Imagen 文本到图像模型负责人。'},
 'wpeebles':{en:'William Peebles',zh:'威廉·皮布尔斯',init:'WP',tiEn:'Co-lead of Sora, OpenAI (PhD, UC Berkeley)',tiZh:'OpenAI Sora 联合负责人（伯克利博士）',fields:['generative','vision'],
   bioEn:'Co-lead of Sora at OpenAI, PhD from UC Berkeley, advancing video generation.',
   bioZh:'OpenAI Sora 联合负责人，UC Berkeley 博士，推动视频生成发展。'},
 'lvminzhang':{en:'Lvmin Zhang',zh:'张吕敏',init:'LZ',tiEn:'PhD student, Stanford University (ControlNet, Fooocus)',tiZh:'斯坦福大学博士生（ControlNet、Fooocus 作者）',fields:['generative','vision'],
   bioEn:'PhD student at Stanford, creator of ControlNet and Fooocus, influential in image generation.',
   bioZh:'斯坦福博士生，ControlNet 和 Fooocus 创建者，图像生成领域影响深远。'},
 'dha':{en:'David Ha',zh:'戴维·哈',init:'DH',tiEn:'Co-founder, Sakana AI; formerly Google Brain',tiZh:'Sakana AI 联合创始人，前 Google Brain',fields:['rl','generative'],
   bioEn:'Co-founder of Sakana AI, formerly at Google Brain, known for generative models and evolution.',
   bioZh:'Sakana AI 联合创始人，前 Google Brain 研究员，以生成模型和进化算法闻名。'},
 'dhafner':{en:'Danijar Hafner',zh:'达尼亚尔·哈夫纳',init:'DH',tiEn:'Research Scientist, Google DeepMind (Dreamer)',tiZh:'Google DeepMind 研究科学家（Dreamer）',fields:['rl','generative'],
   bioEn:'Research Scientist at Google DeepMind, creator of Dreamer, advancing model-based RL.',
   bioZh:'Google DeepMind 研究科学家，Dreamer 创建者，推动基于模型的强化学习。'},
 'tschaul':{en:'Tom Schaul',zh:'汤姆·绍尔',init:'TS',tiEn:'Research Scientist, Google DeepMind',tiZh:'Google DeepMind 研究科学家',fields:['rl','deep-learning'],
   bioEn:'Research Scientist at Google DeepMind, contributed to deep reinforcement learning and optimization.',
   bioZh:'Google DeepMind 研究科学家，贡献于深度强化学习和优化。'},
 'mahn':{en:'Michael Ahn',zh:'迈克尔·安',init:'MA',tiEn:'Research Engineer, Google DeepMind Robotics',tiZh:'谷歌 DeepMind 机器人团队研究工程师',fields:['nlp','rl','robotics'],
   bioEn:'Research Engineer at Google DeepMind Robotics, working on robot learning and control.',
   bioZh:'Google DeepMind 机器人研究工程师，从事机器人学习与控制。'},
 'zfu':{en:'Zipeng Fu',zh:'付子鹏',init:'ZF',tiEn:'PhD Researcher, Stanford University (Robot Learning)',tiZh:'斯坦福大学博士研究者（机器人学习）',fields:['rl','vision','robotics'],
   bioEn:'PhD Researcher at Stanford, focusing on robot learning and manipulation.',
   bioZh:'斯坦福博士生，专注于机器人学习与操作。'},
 'kblack':{en:'Kevin Black',zh:'凯文·布莱克',init:'KB',tiEn:'Researcher, Physical Intelligence (pi)',tiZh:'Physical Intelligence 研究员',fields:['generative','vision','robotics'],
   bioEn:'Researcher at Physical Intelligence, working on robot learning and AI.',
   bioZh:'Physical Intelligence 研究员，从事机器人学习和人工智能。'},
 'chaojia':{en:'Chao Jia',zh:'贾超',init:'CJ',tiEn:'Research Scientist, Google (ALIGN co-author)',tiZh:'谷歌研究科学家（ALIGN 共同作者）',fields:['vision','nlp'],
   bioEn:'Research Scientist at Google, co-author of ALIGN, advancing vision-language models.',
   bioZh:'Google 研究科学家，ALIGN 共同作者，推动视觉-语言模型发展。'},
 'wenhaiwang':{en:'Wenhai Wang',zh:'王文海',init:'WW',tiEn:'Researcher (InternVL), Shanghai AI Lab / CUHK',tiZh:'研究员（InternVL），上海人工智能实验室 / 香港中文大学',fields:['vision','nlp'],
   bioEn:'Researcher at Shanghai AI Lab / CUHK, lead of InternVL, advancing multimodal models.',
   bioZh:'上海 AI Lab/港中文研究员，InternVL 负责人，推动多模态模型。'},
 'jinzebai':{en:'Jinze Bai',zh:'白金泽',init:'JB',tiEn:'Researcher (Qwen-VL lead author), Alibaba Qwen Team',tiZh:'研究员（Qwen-VL 第一作者），阿里巴巴通义千问团队',fields:['vision','nlp'],
   bioEn:'Lead author of Qwen-VL at Alibaba Qwen Team, advancing multimodal LLMs.',
   bioZh:'阿里通义千问团队 Qwen-VL 第一作者，推动多模态大语言模型。'},
 'abdelmohamed':{en:'Abdelrahman Mohamed',zh:'阿卜杜勒拉赫曼·穆罕默德',init:'AM',tiEn:'Research Scientist, ex-Meta AI; speech self-supervision pioneer',tiZh:'前 Meta AI 研究科学家，语音自监督先驱',fields:['deep-learning','nlp'],
   bioEn:'Pioneer in speech self-supervision, ex-Meta AI, advancing unsupervised speech learning.',
   bioZh:'语音自监督先驱，前 Meta AI，推动无监督语音学习。'},
 'jshen':{en:'Jonathan Shen',zh:'乔纳森·沈',init:'JS',tiEn:'Research Engineer, Google; lead author of Tacotron 2',tiZh:'Google 研究工程师，Tacotron 2 第一作者',fields:['deep-learning','generative'],
   bioEn:'Lead author of Tacotron 2 at Google, advancing text-to-speech synthesis.',
   bioZh:'Google Tacotron 2 第一作者，推动文本到语音合成。'},
 'nzeghidour':{en:'Neil Zeghidour',zh:'尼尔·泽吉杜尔',init:'NZ',tiEn:'Research Scientist; ex-Google DeepMind; neural audio codecs & AudioLM',tiZh:'前 Google DeepMind 研究科学家，神经音频编解码与 AudioLM',fields:['deep-learning','generative'],
   bioEn:'Research Scientist, ex-Google DeepMind, known for neural audio codecs and AudioLM.',
   bioZh:'研究科学家，前 Google DeepMind，以神经音频编解码和 AudioLM 闻名。'},
 'adefossez':{en:'Alexandre Défossez',zh:'亚历山大·德福塞',init:'AD',tiEn:'Research Scientist, Kyutai; ex-Meta AI; EnCodec & MusicGen',tiZh:'Kyutai 研究科学家，前 Meta AI，EnCodec 与 MusicGen 作者',fields:['deep-learning','generative'],
   bioEn:'Research Scientist at Kyutai, ex-Meta AI, creator of EnCodec and MusicGen.',
   bioZh:'Kyutai 研究科学家，前 Meta AI，EnCodec 和 MusicGen 创建者。'},
 'rsennrich':{en:'Rico Sennrich',zh:'里科·森里希',init:'RS',tiEn:'Professor of Computational Linguistics, University of Zurich',tiZh:'苏黎世大学计算语言学教授',fields:['nlp','efficiency'],
   bioEn:'Professor at University of Zurich, expert in machine translation and NLP.',
   bioZh:'苏黎世大学教授，机器翻译和自然语言处理专家。'},
 'sruder':{en:'Sebastian Ruder',zh:'塞巴斯蒂安·鲁德',init:'SR',tiEn:'Research Scientist, Cohere / formerly Google DeepMind (ULMFiT co-author)',tiZh:'Cohere 研究科学家，曾任 Google DeepMind（ULMFiT 共同作者）',fields:['nlp'],
   bioEn:'Research Scientist at Cohere, co-author of ULMFiT, advancing transfer learning in NLP.',
   bioZh:'Cohere 研究科学家，ULMFiT 共同作者，推动 NLP 迁移学习。'},
 'yinhanliu':{en:'Yinhan Liu',zh:'刘寅瀚',init:'YL',tiEn:'Research Scientist (RoBERTa lead author); formerly Facebook AI Research',tiZh:'研究科学家（RoBERTa 主要作者），曾任 Facebook AI Research',fields:['nlp'],
   bioEn:'Lead author of RoBERTa, formerly at Facebook AI Research, advancing pretrained language models.',
   bioZh:'RoBERTa 第一作者，前 Facebook AI Research，推动预训练语言模型。'},
 'kevinclarknlp':{en:'Kevin Clark',zh:'凯文·克拉克',init:'KC',tiEn:'Research Scientist, Google DeepMind (ELECTRA lead author)',tiZh:'Google DeepMind 研究科学家（ELECTRA 主要作者）',fields:['nlp','efficiency'],
   bioEn:'Kevin Clark is a Research Scientist at Google DeepMind and lead author of ELECTRA, a highly efficient pretraining method.',
   bioZh:'Kevin Clark 是谷歌 DeepMind 研究科学家，ELECTRA 高效预训练方法的主要作者。'},
 'zhenzhonglan':{en:'Zhenzhong Lan',zh:'蓝振忠',init:'ZL',tiEn:'Associate Professor, Westlake University; ALBERT lead author',tiZh:'西湖大学副教授；ALBERT 主要作者',fields:['nlp','efficiency'],
   bioEn:'Zhenzhong Lan is an Associate Professor at Westlake University and lead author of ALBERT, a lite BERT model.',
   bioZh:'蓝振忠是西湖大学副教授，轻量级 BERT 模型 ALBERT 的主要作者。'},
 'kxu':{en:'Keyulu Xu',zh:'徐克雨',init:'KX',tiEn:'Researcher in graph machine learning (MIT PhD)',tiZh:'图机器学习研究者（MIT 博士）',fields:['deep-learning'],
   bioEn:'Keyulu Xu is a researcher in graph machine learning, known for work on graph neural network expressivity.',
   bioZh:'Keyulu Xu 是图机器学习研究者，以图神经网络表达能力研究闻名。'},
 'mdefferrard':{en:'Michaël Defferrard',zh:'米夏埃尔·德费拉尔',init:'MD',tiEn:'Machine learning researcher (EPFL PhD), graph signal processing',tiZh:'机器学习研究者（EPFL 博士），图信号处理',fields:['deep-learning','efficiency'],
   bioEn:'Michaël Defferrard is a machine learning researcher known for graph signal processing and ChebNet.',
   bioZh:'Michaël Defferrard 是机器学习研究者，以图信号处理和 ChebNet 闻名。'},
 'jgilmer':{en:'Justin Gilmer',zh:'贾斯汀·吉尔默',init:'JG',tiEn:'Research Scientist, Google DeepMind',tiZh:'谷歌 DeepMind 研究科学家',fields:['deep-learning','generative'],
   bioEn:'Justin Gilmer is a Research Scientist at Google DeepMind, contributing to graph neural networks and optimization.',
   bioZh:'Justin Gilmer 是谷歌 DeepMind 研究科学家，贡献于图神经网络和优化。'},
 'xbresson':{en:'Xavier Bresson',zh:'泽维尔·布雷松',init:'XB',tiEn:'Associate Professor, National University of Singapore',tiZh:'新加坡国立大学副教授',fields:['deep-learning'],
   bioEn:'Xavier Bresson is an Associate Professor at NUS, known for graph neural networks and geometric deep learning.',
   bioZh:'Xavier Bresson 是新加坡国立大学副教授，以图神经网络和几何深度学习闻名。'},
 'fhutter':{en:'Frank Hutter',zh:'弗兰克·胡特',init:'FH',tiEn:'Professor, University of Freiburg; Head of ML Lab',tiZh:'弗莱堡大学教授，机器学习实验室负责人',fields:['deep-learning','efficiency'],
   bioEn:'Frank Hutter is a Professor at University of Freiburg, leading the ML Lab, known for AutoML and NAS.',
   bioZh:'Frank Hutter 是弗莱堡大学教授，领导机器学习实验室，以自动机器学习和神经架构搜索闻名。'},
 'amadry':{en:'Aleksander Madry',zh:'亚历山大·马德里',init:'AM',tiEn:'Professor, MIT; Head of OpenAI Preparedness',tiZh:'MIT 教授，OpenAI Preparedness 负责人',fields:['deep-learning','safety'],
   bioEn:'Aleksander Madry is a Professor at MIT and Head of OpenAI Preparedness, known for adversarial robustness.',
   bioZh:'Aleksander Madry 是 MIT 教授和 OpenAI Preparedness 负责人，以对抗鲁棒性研究闻名。'},
 'yangyou':{en:'Yang You',zh:'尤洋',init:'YY',tiEn:'Presidential Young Professor, National University of Singapore; Founder of HPC-AI Tech',tiZh:'新加坡国立大学校长青年教授，潞晨科技创始人',fields:['deep-learning','efficiency'],
   bioEn:'Yang You is a Presidential Young Professor at NUS and founder of HPC-AI Tech, known for large-scale training.',
   bioZh:'尤洋是新加坡国立大学校长青年教授和 HPC-AI Tech 创始人，以大规模训练闻名。'},
 'lingxixie':{en:'Lingxi Xie',zh:'谢凌曦',init:'LX',tiEn:'Researcher, Huawei (Pangu); ex-Johns Hopkins',tiZh:'华为研究员（盘古），前约翰霍普金斯',fields:['vision','deep-learning'],
   bioEn:'Lingxi Xie is a researcher at Huawei (Pangu model), formerly at Johns Hopkins, known for computer vision.',
   bioZh:'谢凌曦是华为（盘古模型）研究员，前约翰霍普金斯大学，以计算机视觉闻名。'},
 'remilam':{en:'Remi Lam',zh:'雷米·拉姆',init:'RL',tiEn:'Research Scientist, Google DeepMind',tiZh:'Google DeepMind 研究科学家',fields:['deep-learning'],
   bioEn:'Remi Lam is a Research Scientist at Google DeepMind, working on machine learning for weather prediction.',
   bioZh:'Remi Lam 是谷歌 DeepMind 研究科学家，从事天气预报的机器学习研究。'},
 'jainslie':{en:'Joshua Ainslie',zh:'约书亚·安斯利',init:'JA',tiEn:'Research Engineer, Google DeepMind',tiZh:'Google DeepMind 研究工程师',fields:['efficiency','nlp'],
   bioEn:'Joshua Ainslie is a Research Engineer at Google DeepMind, contributing to long-context transformers.',
   bioZh:'Joshua Ainslie 是谷歌 DeepMind 研究工程师，贡献于长上下文 Transformer。'},
 'izbeltagy':{en:'Iz Beltagy',zh:'伊兹·贝尔塔吉',init:'IB',tiEn:'Research Scientist (formerly Allen Institute for AI)',tiZh:'研究科学家（曾任艾伦人工智能研究所）',fields:['nlp','efficiency'],
   bioEn:'Iz Beltagy is a Research Scientist formerly at Allen Institute for AI, known for Longformer and efficient transformers.',
   bioZh:'Iz Beltagy 是前艾伦人工智能研究所研究科学家，以 Longformer 和高效 Transformer 闻名。'},
 'zihangdai':{en:'Zihang Dai',zh:'戴子航',init:'ZD',tiEn:'Research Scientist (Transformer-XL / Funnel-Transformer)',tiZh:'研究科学家（Transformer-XL/Funnel-Transformer 作者）',fields:['nlp','deep-learning'],
   bioEn:'Zihang Dai is a Research Scientist known for Transformer-XL and Funnel-Transformer, improving sequence modeling.',
   bioZh:'戴子航是研究科学家，以 Transformer-XL 和 Funnel-Transformer 改进序列建模闻名。'},
 'ofirpress':{en:'Ofir Press',zh:'奥菲尔·普雷斯',init:'OP',tiEn:'Postdoctoral Researcher, Princeton University',tiZh:'普林斯顿大学博士后研究员',fields:['nlp','efficiency'],
   bioEn:'Ofir Press is a Postdoctoral Researcher at Princeton, known for ALiBi and efficient attention mechanisms.',
   bioZh:'Ofir Press 是普林斯顿大学博士后研究员，以 ALiBi 和高效注意力机制闻名。'},
 'kchoroman':{en:'Krzysztof Choromanski',zh:'克日什托夫·乔罗曼斯基',init:'KC',tiEn:'Research Scientist, Google DeepMind; Columbia University',tiZh:'Google DeepMind 研究科学家；哥伦比亚大学',fields:['efficiency','deep-learning'],
   bioEn:'Krzysztof Choromanski is a Research Scientist at Google DeepMind and Columbia, known for Performers.',
   bioZh:'Krzysztof Choromanski 是谷歌 DeepMind 和哥伦比亚大学研究科学家，以 Performer 闻名。'},
 'aqjiang':{en:'Albert Q. Jiang',zh:'蒋启天',init:'AQ',tiEn:'Research Scientist, Mistral AI',tiZh:'Mistral AI 研究科学家',fields:['nlp','efficiency'],
   bioEn:'Albert Q. Jiang is a Research Scientist at Mistral AI, known for efficient language model inference.',
   bioZh:'Albert Q. Jiang 是 Mistral AI 研究科学家，以高效语言模型推理闻名。'},
 'hlightman':{en:'Hunter Lightman',zh:'亨特·莱特曼',init:'HL',tiEn:'Research Scientist, OpenAI',tiZh:'OpenAI 研究科学家',fields:['nlp','rl'],
   bioEn:'Hunter Lightman is a Research Scientist at OpenAI, working on reinforcement learning and reasoning.',
   bioZh:'Hunter Lightman 是 OpenAI 研究科学家，从事强化学习和推理研究。'},
 'hwchung':{en:'Hyung Won Chung',zh:'郑亨原',init:'HW',tiEn:'Research Scientist, OpenAI',tiZh:'OpenAI 研究科学家',fields:['nlp','deep-learning'],
   bioEn:'Research Scientist at OpenAI. Known for scaling laws and instruction tuning in large language models.',
   bioZh:'OpenAI 研究科学家，以大规模语言模型的缩放定律和指令微调闻名。'},
 'czhou':{en:'Chunting Zhou',zh:'周春婷',init:'CZ',tiEn:'Research Scientist, Meta AI (FAIR)',tiZh:'Meta AI (FAIR) 研究科学家',fields:['nlp','deep-learning'],
   bioEn:'Research Scientist at Meta AI (FAIR). Contributed to large language model training and optimization.',
   bioZh:'Meta AI 研究科学家，贡献于大语言模型训练与优化。'},
 'ncarion':{en:'Nicolas Carion',zh:'尼古拉·卡里翁',init:'NC',tiEn:'Research Scientist, Meta AI (FAIR)',tiZh:'Meta AI（FAIR）研究科学家',fields:['vision','deep-learning'],
   bioEn:'Research Scientist at Meta AI (FAIR). Lead author of DETR, pioneering end-to-end object detection.',
   bioZh:'Meta AI 研究科学家，DETR 一作，开创端到端目标检测。'},
 'zhendaxie':{en:'Zhenda Xie',zh:'谢震达',init:'ZX',tiEn:'Researcher, DeepSeek (ex-Microsoft Research Asia)',tiZh:'DeepSeek 研究员（前微软亚洲研究院）',fields:['vision','deep-learning'],
   bioEn:'Researcher at DeepSeek, ex-Microsoft Research Asia. Known for self-supervised learning (SimMIM).',
   bioZh:'DeepSeek 研究员，前微软亚洲研究院，以自监督学习 SimMIM 闻名。'},
 'jinghaozhou':{en:'Jinghao Zhou',zh:'周靖皓',init:'JZ',tiEn:'Researcher (ByteDance / Oxford VGG)',tiZh:'研究员（字节跳动 / 牛津 VGG）',fields:['vision','deep-learning'],
   bioEn:'Researcher at ByteDance / Oxford VGG. Contributed to self-supervised learning (iBOT).',
   bioZh:'字节跳动/牛津 VGG 研究员，贡献于自监督学习 iBOT。'},
 'massran':{en:'Mahmoud Assran',zh:'马哈茂德·阿斯兰',init:'MA',tiEn:'Research Scientist, Meta AI (FAIR)',tiZh:'Meta AI（FAIR）研究科学家',fields:['vision','deep-learning'],
   bioEn:'Research Scientist at Meta AI (FAIR). Known for self-supervised learning (DINO, I-JEPA).',
   bioZh:'Meta AI 研究科学家，以自监督学习 DINO、I-JEPA 闻名。'},
 'mmirza':{en:'Mehdi Mirza',zh:'梅赫迪·米尔扎',init:'MM',tiEn:'Research Scientist, Google DeepMind (Conditional GAN)',tiZh:'谷歌 DeepMind 研究科学家（条件 GAN）',fields:['generative','deep-learning'],
   bioEn:'Research Scientist at Google DeepMind. Co-inventor of Conditional GAN (cGAN).',
   bioZh:'Google DeepMind 研究科学家，条件 GAN（cGAN）共同发明人。'},
 'tmiyato':{en:'Takeru Miyato',zh:'宫户健',init:'TM',tiEn:'Researcher (Spectral Normalization for GANs), ex-Preferred Networks',tiZh:'研究员（GAN 谱归一化），曾任职 Preferred Networks',fields:['generative','deep-learning'],
   bioEn:'Researcher, ex-Preferred Networks. Known for Spectral Normalization in GANs.',
   bioZh:'前 Preferred Networks 研究员，以 GAN 的谱归一化闻名。'},
 'tpark':{en:'Taesung Park',zh:'朴泰成',init:'TP',tiEn:'Research Scientist, Adobe Research (SPADE/GauGAN, CycleGAN)',tiZh:'Adobe 研究院研究科学家（SPADE/GauGAN、CycleGAN）',fields:['generative','vision'],
   bioEn:'Research Scientist at Adobe Research. Known for SPADE/GauGAN and CycleGAN.',
   bioZh:'Adobe Research 研究科学家，以 SPADE/GauGAN 和 CycleGAN 闻名。'},
 'songyangliu':{en:'Songming Liu',zh:'刘松铭',init:'SL',tiEn:'PhD Researcher, Tsinghua University (TSAIL, Robotics Diffusion Models)',tiZh:'清华大学博士研究者（TSAIL，机器人扩散模型）',fields:['generative','vision','robotics'],
   bioEn:'PhD Researcher at Tsinghua University (TSAIL). Works on diffusion models for robotics.',
   bioZh:'清华大学 TSAIL 博士生，从事机器人扩散模型研究。'},
 'skale':{en:'Satyen Kale',zh:'萨蒂恩·卡莱',init:'SK',tiEn:'Research Scientist, Google / Apple',tiZh:'谷歌 / 苹果研究科学家',fields:['deep-learning','efficiency'],
   bioEn:'Research Scientist at Google/Apple. Known for work on optimization and online learning.',
   bioZh:'Google/Apple 研究科学家，以优化和在线学习研究闻名。'},
 'damaidai':{en:'Damai Dai',zh:'代达劢',init:'DD',tiEn:'Researcher, DeepSeek-AI (Peking University)',tiZh:'DeepSeek 研究员（北京大学）',fields:['nlp','efficiency'],
   bioEn:'Damai Dai, researcher at DeepSeek-AI and Peking University, focuses on large language models and AI alignment.',
   bioZh:'戴大迈，DeepSeek-AI 与北京大学研究员，专注大语言模型与 AI 对齐。'},
 'xinlongwang':{en:'Xinlong Wang',zh:'王鑫龙',init:'XW',tiEn:'Research Scientist, BAAI (Beijing Academy of AI)',tiZh:'北京智源人工智能研究院（BAAI）研究科学家',fields:['vision','generative','robotics'],
   bioEn:'Xinlong Wang, research scientist at BAAI, known for work on vision foundation models and object detection.',
   bioZh:'王新龙，北京智源人工智能研究院研究科学家，以视觉基础模型与目标检测闻名。'},
 'haoyulu':{en:'Haoyu Lu',zh:'陆昊宇',init:'HL',tiEn:'Researcher, DeepSeek-AI',tiZh:'DeepSeek 研究员',fields:['vision','nlp'],
   bioEn:'Haoyu Lu, researcher at DeepSeek-AI, contributes to large language model training and optimization.',
   bioZh:'卢浩宇，DeepSeek-AI 研究员，贡献于大语言模型训练与优化。'},
 'goodfellow':{en:'Ian Goodfellow',zh:'伊恩·古德费洛',init:'IG',tiEn:'Inventor of GANs; former Director of ML at Apple, ex-Google Brain/OpenAI',tiZh:'GAN 发明者，前苹果机器学习总监，曾任职 Google Brain/OpenAI',fields:['generative','deep-learning'],
   bioEn:'Inventor of GANs; former Director of ML at Apple, ex-Google Brain/OpenAI.',
   bioZh:'生成对抗网络（GAN）发明者；曾任苹果机器学习总监，前谷歌大脑/OpenAI 研究员。'},
 'svlevine':{en:'Sergey Levine',zh:'谢尔盖·莱文',init:'SL',tiEn:'Associate Professor, UC Berkeley; Co-founder, Physical Intelligence',tiZh:'加州大学伯克利分校副教授；Physical Intelligence 联合创始人',fields:['rl','deep-learning','robotics'],
   bioEn:'Associate Professor at UC Berkeley; co-founder of Physical Intelligence.',
   bioZh:'加州大学伯克利分校副教授；Physical Intelligence 联合创始人。'},
 'rgirshick':{en:'Ross Girshick',zh:'罗斯·吉尔希克',init:'RG',tiEn:'Research Scientist, Meta AI (FAIR)',tiZh:'Meta AI（FAIR）研究科学家',fields:['vision','deep-learning'],
   bioEn:'Research Scientist at Meta AI (FAIR); key contributor to object detection.',
   bioZh:'Meta AI（FAIR）研究科学家；目标检测领域核心贡献者。'},
 'adosovitskiy':{en:'Alexey Dosovitskiy',zh:'阿列克谢·多索维茨基',init:'AD',tiEn:'Co-founder, Inceptive (ex-Google Brain)',tiZh:'Inceptive 联合创始人（前 Google Brain）',fields:['vision','deep-learning'],
   bioEn:'Co-founder of Inceptive; ex-Google Brain; pioneer of Vision Transformers.',
   bioZh:'Inceptive 联合创始人；前谷歌大脑；视觉 Transformer 先驱。'},
 'tkarras':{en:'Tero Karras',zh:'泰罗·卡拉斯',init:'TK',tiEn:'Distinguished Research Scientist, NVIDIA Research',tiZh:'英伟达研究院杰出研究科学家',fields:['generative','vision'],
   bioEn:'Distinguished Research Scientist at NVIDIA; StyleGAN creator.',
   bioZh:'英伟达杰出研究科学家；StyleGAN 发明者。'},
 'aradford':{en:'Alec Radford',zh:'亚历克·拉德福德',init:'AR',tiEn:'Researcher, OpenAI (DCGAN, GPT, CLIP)',tiZh:'OpenAI 研究员（DCGAN、GPT、CLIP）',fields:['generative','deep-learning'],
   bioEn:'Researcher at OpenAI; creator of DCGAN, GPT, and CLIP.',
   bioZh:'OpenAI 研究员；DCGAN、GPT 和 CLIP 的创造者。'},
 'jonathanho':{en:'Jonathan Ho',zh:'乔纳森·何',init:'JH',tiEn:'Researcher, OpenAI (formerly Google Brain)',tiZh:'OpenAI 研究员（原 Google Brain）',fields:['generative','deep-learning'],
   bioEn:'Researcher at OpenAI; pioneer of diffusion models (DDPM).',
   bioZh:'OpenAI 研究员；扩散模型（DDPM）先驱。'},
 'yangsong':{en:'Yang Song',zh:'宋飏',init:'YS',tiEn:'Research Scientist, OpenAI (PhD, Stanford)',tiZh:'OpenAI 研究科学家（斯坦福博士）',fields:['generative','deep-learning'],
   bioEn:'Research Scientist at OpenAI; score-based diffusion models pioneer.',
   bioZh:'OpenAI 研究科学家；基于分数的扩散模型先驱。'},
 'vmnih':{en:'Volodymyr Mnih',zh:'弗拉基米尔·姆尼赫',init:'VM',tiEn:'Research Scientist, Google DeepMind',tiZh:'Google DeepMind 研究科学家',fields:['rl','deep-learning'],
   bioEn:'Research Scientist at Google DeepMind; DQN and Dueling DQN creator.',
   bioZh:'谷歌 DeepMind 研究科学家；DQN 和 Dueling DQN 创造者。'},
 'avdoord':{en:'Aäron van den Oord',zh:'阿伦·范登奥尔德',init:'AV',tiEn:'Research Scientist, Google DeepMind; WaveNet & VQ-VAE',tiZh:'Google DeepMind 研究科学家，WaveNet 与 VQ-VAE 作者',fields:['deep-learning','generative'],
   bioEn:'Research Scientist at Google DeepMind; creator of WaveNet and VQ-VAE.',
   bioZh:'谷歌 DeepMind 研究科学家；WaveNet 和 VQ-VAE 创造者。'},
 'tmikolov':{en:'Tomas Mikolov',zh:'托马斯·米科洛夫',init:'TM',tiEn:'Research Scientist (word2vec creator); formerly Google, Facebook AI',tiZh:'研究科学家（word2vec 发明者），曾任职 Google、Facebook AI',fields:['nlp','deep-learning'],
   bioEn:'Research Scientist; creator of word2vec; formerly Google, Facebook AI.',
   bioZh:'研究科学家；word2vec 创造者；前谷歌、Facebook AI 研究员。'},
 'tkipf':{en:'Thomas Kipf',zh:'托马斯·基普夫',init:'TK',tiEn:'Senior Research Scientist, Google DeepMind',tiZh:'谷歌 DeepMind 高级研究科学家',fields:['deep-learning'],
   bioEn:'Senior Research Scientist at Google DeepMind; GCN creator.',
   bioZh:'谷歌 DeepMind 高级研究科学家；图卷积网络（GCN）创造者。'},
 'jleskovec':{en:'Jure Leskovec',zh:'尤雷·莱斯科韦茨',init:'JL',tiEn:'Professor of Computer Science, Stanford University',tiZh:'斯坦福大学计算机科学教授',fields:['deep-learning'],
   bioEn:'Professor of Computer Science at Stanford; leader in graph mining.',
   bioZh:'斯坦福大学计算机科学教授；图挖掘领域领导者。'},
 'mbronstein':{en:'Michael Bronstein',zh:'迈克尔·布朗斯坦',init:'MB',tiEn:'DeepMind Professor of AI, University of Oxford',tiZh:'牛津大学 DeepMind 人工智能教授',fields:['deep-learning','vision'],
   bioEn:'DeepMind Professor of AI at Oxford; pioneer in geometric deep learning.',
   bioZh:'牛津大学 DeepMind 人工智能教授；几何深度学习先驱。'},
 'dkingma':{en:'Diederik P. Kingma',zh:'迪德里克·金马',init:'DP',tiEn:'Research Scientist, Anthropic (prev. Google Brain, OpenAI)',tiZh:'Anthropic 研究科学家（前 Google Brain、OpenAI）',fields:['deep-learning','generative'],
   bioEn:'Research Scientist at Anthropic; creator of Adam optimizer and VAE.',
   bioZh:'Anthropic 研究科学家；Adam 优化器和变分自编码器（VAE）创造者。'},
 'wenfengliang':{en:'Wenfeng Liang',zh:'梁文锋',init:'WL',tiEn:'Founder & CEO, DeepSeek; High-Flyer',tiZh:'DeepSeek 创始人兼 CEO，幻方量化',fields:['nlp','efficiency'],
   bioEn:'Founder & CEO of DeepSeek; also at High-Flyer.',
   bioZh:'DeepSeek 创始人兼 CEO；幻方量化创始人。'},
 'louyang':{en:'Long Ouyang',zh:'欧阳龙',init:'LO',tiEn:'Research Scientist, OpenAI',tiZh:'OpenAI 研究科学家',fields:['nlp','rl'],
   bioEn:'Research Scientist at OpenAI; lead of InstructGPT and RLHF.',
   bioZh:'OpenAI 研究科学家；InstructGPT 和 RLHF 负责人。'},
 'jasonwei':{en:'Jason Wei',zh:'杰森·魏',init:'JW',tiEn:'AI researcher (ex-OpenAI)',tiZh:'AI 研究员（前 OpenAI）',fields:['nlp','deep-learning'],
   bioEn:'Jason Wei is a research scientist at OpenAI, known for pioneering chain-of-thought prompting in large language models.',
   bioZh:'OpenAI 研究科学家，开创思维链提示方法，推动大语言模型推理能力。'},
 'dayaguo':{en:'Daya Guo',zh:'郭达雅',init:'DG',tiEn:'Research Scientist, DeepSeek-AI',tiZh:'DeepSeek 研究科学家',fields:['nlp','rl'],
   bioEn:'Daya Guo is a research scientist at DeepSeek-AI, leading the development of DeepSeek-R1 and DeepSeek-V2.',
   bioZh:'DeepSeek-AI 研究科学家，主导 DeepSeek-R1 和 DeepSeek-V2 模型开发。'},
 'jredmon':{en:'Joseph Redmon',zh:'约瑟夫·雷德蒙',init:'JR',tiEn:'Creator of YOLO, formerly University of Washington',tiZh:'YOLO 作者，原华盛顿大学',fields:['vision','deep-learning'],
   bioEn:'Joseph Redmon is the creator of YOLO, a real-time object detection system, formerly at University of Washington.',
   bioZh:'YOLO 实时目标检测系统创始人，前华盛顿大学研究员。'},
 'ksimonyan':{en:'Karen Simonyan',zh:'卡伦·西蒙扬',init:'KS',tiEn:'Co-founder & Chief Scientist, Microsoft AI (formerly DeepMind)',tiZh:'Microsoft AI 联合创始人兼首席科学家（原 DeepMind）',fields:['vision','deep-learning'],
   bioEn:'Karen Simonyan is co-founder and chief scientist at Microsoft AI, known for VGGNet and AlphaGo contributions.',
   bioZh:'微软 AI 联合创始人兼首席科学家，以 VGGNet 和 AlphaGo 贡献闻名。'},
 'cszegedy':{en:'Christian Szegedy',zh:'克里斯蒂安·塞格迪',init:'CS',tiEn:'AI Researcher (xAI), formerly Google Brain',tiZh:'xAI 研究员，原 Google Brain',fields:['vision','deep-learning'],
   bioEn:'Christian Szegedy is an AI researcher at xAI, known for Inception networks and adversarial examples.',
   bioZh:'xAI 研究员，以 Inception 网络和对抗样本研究著称。'},
 'mcaron':{en:'Mathilde Caron',zh:'玛蒂尔德·卡龙',init:'MC',tiEn:'Research Scientist, Google DeepMind (ex-Meta AI / Inria)',tiZh:'Google DeepMind 研究科学家（前 Meta AI / Inria）',fields:['vision','deep-learning'],
   bioEn:'Mathilde Caron is a research scientist at Google DeepMind, known for self-supervised learning (DINO, SwAV).',
   bioZh:'Google DeepMind 研究科学家，以自监督学习 DINO 和 SwAV 方法闻名。'},
 'junyanzhu':{en:'Jun-Yan Zhu',zh:'朱俊彦',init:'JZ',tiEn:'Assistant Professor, Carnegie Mellon University',tiZh:'卡内基梅隆大学助理教授',fields:['generative','vision'],
   bioEn:'Jun-Yan Zhu is an assistant professor at CMU, known for CycleGAN and image-to-image translation.',
   bioZh:'卡内基梅隆大学助理教授，以 CycleGAN 和图像翻译研究闻名。'},
 'jsohldick':{en:'Jascha Sohl-Dickstein',zh:'亚沙·索尔-迪克斯坦',init:'JS',tiEn:'Principal Scientist, Anthropic (formerly Google Brain)',tiZh:'Anthropic 首席科学家（原 Google Brain）',fields:['generative','deep-learning'],
   bioEn:'Jascha Sohl-Dickstein is a principal scientist at Anthropic, known for diffusion models and deep learning theory.',
   bioZh:'Anthropic 首席科学家，以扩散模型和深度学习理论闻名。'},
 'sermon':{en:'Stefano Ermon',zh:'斯特凡诺·埃尔蒙',init:'SE',tiEn:'Associate Professor of Computer Science, Stanford University',tiZh:'斯坦福大学计算机科学副教授',fields:['generative','deep-learning'],
   bioEn:'Stefano Ermon is an associate professor at Stanford, known for generative models and probabilistic AI.',
   bioZh:'斯坦福大学副教授，以生成模型和概率 AI 研究闻名。'},
 'pdhariwal':{en:'Prafulla Dhariwal',zh:'普拉富拉·达里瓦尔',init:'PD',tiEn:'Research Scientist, OpenAI',tiZh:'OpenAI 研究科学家',fields:['generative','vision'],
   bioEn:'Prafulla Dhariwal is a research scientist at OpenAI, known for diffusion models (DALL·E 2, GPT-4).',
   bioZh:'OpenAI 研究科学家，以扩散模型 DALL·E 2 和 GPT-4 贡献闻名。'},
 'rrombach':{en:'Robin Rombach',zh:'罗宾·罗姆巴赫',init:'RR',tiEn:'Co-founder, Black Forest Labs (formerly Stability AI / CompVis)',tiZh:'Black Forest Labs 联合创始人（原 Stability AI / CompVis）',fields:['generative','vision'],
   bioEn:'Robin Rombach is co-founder of Black Forest Labs, known for Stable Diffusion and latent diffusion models.',
   bioZh:'Black Forest Labs 联合创始人，以 Stable Diffusion 和潜在扩散模型闻名。'},
 'tlillicrap':{en:'Timothy Lillicrap',zh:'蒂莫西·利利克拉普',init:'TL',tiEn:'Research Scientist, Google DeepMind; Professor, UCL',tiZh:'Google DeepMind 研究科学家，伦敦大学学院教授',fields:['rl','deep-learning'],
   bioEn:'Timothy Lillicrap is a research scientist at Google DeepMind and professor at UCL, known for DDPG and RL.',
   bioZh:'Google DeepMind 研究科学家、UCL 教授，以 DDPG 和强化学习闻名。'},
 'hvanhasselt':{en:'Hado van Hasselt',zh:'哈多·范哈塞尔特',init:'HV',tiEn:'Research Scientist, Google DeepMind',tiZh:'Google DeepMind 研究科学家',fields:['rl','deep-learning'],
   bioEn:'Hado van Hasselt is a research scientist at Google DeepMind, known for Double Q-learning and deep RL.',
   bioZh:'Google DeepMind 研究科学家，以 Double Q-learning 和深度强化学习闻名。'},
 'mbellemare':{en:'Marc G. Bellemare',zh:'马克·贝尔马尔',init:'MG',tiEn:'Professor, McGill / Mila; formerly Google Brain',tiZh:'麦吉尔大学/Mila 教授，前 Google Brain',fields:['rl','deep-learning'],
   bioEn:'Marc G. Bellemare is a professor at McGill/Mila, known for distributional RL and Atari benchmarks.',
   bioZh:'麦吉尔大学/Mila 教授，以分布强化学习和 Atari 基准测试闻名。'},
 'jschritt':{en:'Julian Schrittwieser',zh:'朱利安·施里特维泽',init:'JS',tiEn:'Research Engineer, Google DeepMind (AlphaZero/MuZero)',tiZh:'Google DeepMind 研究工程师（AlphaZero/MuZero）',fields:['rl','deep-learning'],
   bioEn:'Julian Schrittwieser is a research engineer at Google DeepMind, known for AlphaZero and MuZero.',
   bioZh:'Google DeepMind 研究工程师，以 AlphaZero 和 MuZero 算法闻名。'},
 'abrohan':{en:'Anthony Brohan',zh:'安东尼·布罗汉',init:'AB',tiEn:'Research Engineer (Robotics Transformers), Google DeepMind',tiZh:'谷歌 DeepMind 研究工程师（机器人 Transformer）',fields:['deep-learning','vision','robotics'],
   bioEn:'Anthony Brohan is a research engineer at Google DeepMind, known for robotics transformers (RT-1, RT-2).',
   bioZh:'Google DeepMind 研究工程师，以机器人 Transformer 模型 RT-1 和 RT-2 闻名。'},
 'chengchi':{en:'Cheng Chi',zh:'迟程',init:'CC',tiEn:'Researcher, Stanford / Columbia (Robotics)',tiZh:'斯坦福 / 哥伦比亚大学机器人方向研究者',fields:['generative','vision','robotics'],
   bioEn:'Cheng Chi is a researcher at Stanford/Columbia, known for diffusion policy and robot manipulation.',
   bioZh:'斯坦福/哥伦比亚大学研究员，以扩散策略和机器人操作研究闻名。'},
 'shuransong':{en:'Shuran Song',zh:'宋舒然',init:'SS',tiEn:'Associate Professor, Stanford University (Robotics & Embodied AI)',tiZh:'斯坦福大学副教授（机器人与具身智能）',fields:['vision','generative','robotics'],
   bioEn:'Shuran Song is an associate professor at Stanford, known for 3D scene understanding and robot learning.',
   bioZh:'斯坦福大学副教授，以 3D 场景理解和机器人学习研究闻名。'},
 'dieterfox':{en:'Dieter Fox',zh:'迪特·福克斯',init:'DF',tiEn:'Professor, University of Washington; Senior Director of Robotics, NVIDIA',tiZh:'华盛顿大学教授；英伟达机器人研究高级总监',fields:['vision','rl','robotics'],
   bioEn:'Professor at UW and NVIDIA Senior Director of Robotics, advancing robot perception and manipulation.',
   bioZh:'华盛顿大学教授、英伟达机器人高级总监，推动机器人感知与操作。'},
 'jbalayrac':{en:'Jean-Baptiste Alayrac',zh:'让-巴蒂斯特·阿拉亚克',init:'JA',tiEn:'Research Scientist, Google DeepMind',tiZh:'谷歌 DeepMind 研究科学家',fields:['vision','nlp'],
   bioEn:'Research Scientist at Google DeepMind, known for Flamingo and multimodal learning.',
   bioZh:'谷歌 DeepMind 研究科学家，以 Flamingo 和多模态学习闻名。'},
 'junnanli':{en:'Junnan Li',zh:'李俊男',init:'JL',tiEn:'Research Scientist (BLIP/BLIP-2 author), formerly Salesforce Research',tiZh:'研究科学家（BLIP/BLIP-2 作者），曾任职 Salesforce Research',fields:['vision','nlp'],
   bioEn:'Lead author of BLIP/BLIP-2, advancing vision-language pre-training at Salesforce Research.',
   bioZh:'BLIP/BLIP-2 主要作者，在 Salesforce 推动视觉语言预训练。'},
 'haotianliu':{en:'Haotian Liu',zh:'刘浩天',init:'HL',tiEn:'Researcher (LLaVA lead author), University of Wisconsin-Madison',tiZh:'研究员（LLaVA 第一作者），威斯康星大学麦迪逊分校',fields:['vision','nlp'],
   bioEn:'Lead author of LLaVA, pioneering large language and vision assistant models.',
   bioZh:'LLaVA 主要作者，开创大语言与视觉助手模型。'},
 'xiaohuazhai':{en:'Xiaohua Zhai',zh:'翟晓华',init:'XZ',tiEn:'Research Scientist, Google DeepMind (SigLIP / vision-language)',tiZh:'谷歌 DeepMind 研究科学家（SigLIP / 视觉-语言）',fields:['vision','nlp'],
   bioEn:'Research Scientist at Google DeepMind, known for SigLIP and vision-language models.',
   bioZh:'谷歌 DeepMind 研究科学家，以 SigLIP 和视觉语言模型闻名。'},
 'baevski':{en:'Alexei Baevski',zh:'阿列克谢·巴耶夫斯基',init:'AB',tiEn:'Research Scientist, Meta AI (FAIR) / co-founder, AI startup',tiZh:'Meta AI (FAIR) 研究科学家',fields:['deep-learning','nlp'],
   bioEn:'Research Scientist at Meta AI, co-founder of AI startup, known for wav2vec and self-supervised speech.',
   bioZh:'Meta AI 研究科学家，AI 初创公司联合创始人，以 wav2vec 和自监督语音闻名。'},
 'mpeters':{en:'Matthew Peters',zh:'马修·彼得斯',init:'MP',tiEn:'Research Scientist (ELMo lead author); formerly Allen Institute for AI',tiZh:'研究科学家（ELMo 主要作者），曾任艾伦人工智能研究所',fields:['nlp','deep-learning'],
   bioEn:'Lead author of ELMo, pioneering contextualized word representations in NLP.',
   bioZh:'ELMo 主要作者，开创 NLP 中上下文词表示。'},
 'zhilinyang':{en:'Zhilin Yang',zh:'杨植麟',init:'ZY',tiEn:'Founder & CEO, Moonshot AI (Kimi); XLNet lead author',tiZh:'月之暗面（Kimi）创始人兼 CEO；XLNet 主要作者',fields:['nlp','deep-learning'],
   bioEn:'Founder & CEO of Moonshot AI (Kimi), lead author of XLNet, advancing language models.',
   bioZh:'月之暗面创始人兼 CEO（Kimi），XLNet 主要作者，推动语言模型。'},
 'craffel':{en:'Colin Raffel',zh:'科林·拉费尔',init:'CR',tiEn:'Associate Professor, University of Toronto / Vector Institute (T5 lead author)',tiZh:'多伦多大学 / Vector 研究所副教授（T5 主要作者）',fields:['nlp','deep-learning'],
   bioEn:'Lead author of T5, associate professor at U of Toronto, advancing text-to-text transfer learning.',
   bioZh:'T5 主要作者，多伦多大学副教授，推动文本到文本迁移学习。'},
 'pvelickovic':{en:'Petar Veličković',zh:'佩塔尔·韦利奇科维奇',init:'PV',tiEn:'Staff Research Scientist, Google DeepMind; Affiliated Lecturer, University of Cambridge',tiZh:'谷歌 DeepMind 研究科学家、剑桥大学讲师',fields:['deep-learning'],
   bioEn:'Staff Research Scientist at Google DeepMind, known for Graph Neural Networks and GAT.',
   bioZh:'谷歌 DeepMind 高级研究科学家，以图神经网络和 GAT 闻名。'},
 'wlhamilton':{en:'William L. Hamilton',zh:'威廉·汉密尔顿',init:'WL',tiEn:'Associate Professor, McGill University; Mila',tiZh:'麦吉尔大学副教授、Mila 研究员',fields:['deep-learning'],
   bioEn:'Associate Professor at McGill and Mila, known for GraphSAGE and representation learning on graphs.',
   bioZh:'麦吉尔大学和 Mila 副教授，以 GraphSAGE 和图表示学习闻名。'},
 'jbruna':{en:'Joan Bruna',zh:'琼·布鲁纳',init:'JB',tiEn:'Professor of Computer Science and Mathematics, New York University',tiZh:'纽约大学计算机科学与数学教授',fields:['deep-learning'],
   bioEn:'Professor at NYU, known for geometric deep learning and graph neural networks.',
   bioZh:'纽约大学教授，以几何深度学习和图神经网络闻名。'},
 'pbattaglia':{en:'Peter Battaglia',zh:'彼得·巴塔利亚',init:'PB',tiEn:'Research Director, Google DeepMind',tiZh:'谷歌 DeepMind 研究总监',fields:['deep-learning','rl'],
   bioEn:'Research Director at Google DeepMind, known for graph networks and physics simulation.',
   bioZh:'谷歌 DeepMind 研究总监，以图网络和物理模拟闻名。'},
 'jimmyba':{en:'Jimmy Lei Ba',zh:'巴磊',init:'JL',tiEn:'Assistant Professor, University of Toronto',tiZh:'多伦多大学助理教授',fields:['deep-learning'],
   bioEn:'Assistant Professor at U of Toronto, known for Layer Normalization and deep learning.',
   bioZh:'多伦多大学助理教授，以层归一化和深度学习闻名。'},
 'shochreiter':{en:'Sepp Hochreiter',zh:'塞普·霍赫赖特',init:'SH',tiEn:'Professor, Johannes Kepler University Linz',tiZh:'林茨约翰开普勒大学教授',fields:['deep-learning'],
   bioEn:'Professor at JKU Linz, co-inventor of LSTM, revolutionizing sequence modeling.',
   bioZh:'林茨大学教授，LSTM 共同发明人，革新序列建模。'},
 'anyang':{en:'An Yang',zh:'杨安',init:'AY',tiEn:'Researcher, Qwen Team, Alibaba',tiZh:'阿里巴巴 Qwen 团队研究员',fields:['nlp','vision'],
   bioEn:'Researcher on Qwen team at Alibaba, contributing to large language models.',
   bioZh:'阿里巴巴 Qwen 团队研究员，贡献于大语言模型。'},
 
 'jietang':{en:'Jie Tang',zh:'唐杰',init:'JT',tiEn:'Professor, Tsinghua University; Zhipu AI / GLM',tiZh:'清华大学教授，智谱 AI / GLM',fields:['nlp','deep-learning'],
   bioEn:'Professor at Tsinghua, co-founder of Zhipu AI, known for GLM and knowledge graphs.',
   bioZh:'清华大学教授，智谱 AI 联合创始人，以 GLM 和知识图谱闻名。'},
 'kaifulee':{en:'Kai-Fu Lee',zh:'李开复',init:'KL',tiEn:'Founder & CEO, 01.AI; Chairman, Sinovation Ventures',tiZh:'零一万物创始人兼 CEO，创新工场董事长',fields:['nlp','deep-learning'],
   bioEn:'Kai-Fu Lee: Founder & CEO of 01.AI, Chairman of Sinovation Ventures, AI expert and author.',
   bioZh:'李开复：01.AI 创始人兼 CEO，创新工场董事长，AI 专家及畅销书作者。'},
 'kaiming':{en:'Kaiming He',zh:'何恺明',init:'KH',tiEn:'Professor, MIT (prev. FAIR)',tiZh:'MIT 教授(前 Meta FAIR)',fields:['vision','deep-learning'],
   bioEn:'Creator of ResNet (deep residual learning) — among the most-cited papers in modern AI — plus Faster/Mask R-CNN and Masked Autoencoders. Professor at MIT.',
   bioZh:'ResNet(深度残差学习)的提出者——现代 AI 被引用最多的论文之一——以及 Faster/Mask R-CNN、掩码自编码器(MAE)。MIT 教授。'},
 'songhan':{en:'Song Han',zh:'韩松',init:'SgH',tiEn:'Associate Professor, MIT',tiZh:'MIT 副教授',fields:['efficiency','deep-learning'],
   bioEn:'A pioneer of efficient deep learning — Deep Compression, pruning and quantization, and hardware-aware model acceleration. Associate professor at MIT.',
   bioZh:'高效深度学习的开创者——深度压缩、剪枝与量化，以及硬件感知的模型加速。MIT 副教授。'},
 'tianqi':{en:'Tianqi Chen',zh:'陈天奇',init:'TC',tiEn:'Assistant Professor, CMU',tiZh:'CMU 助理教授',fields:['efficiency','deep-learning'],
   bioEn:'Creator of XGBoost, TVM and MXNet — foundational systems and tools for machine learning. Assistant professor at CMU.',
   bioZh:'XGBoost、TVM 与 MXNet 的作者——机器学习的基础系统与工具。CMU 助理教授。'},
 'deepseek':{en:'DeepSeek-AI',zh:'深度求索',init:'DS',tiEn:'Frontier open-model lab, China',tiZh:'中国前沿开源大模型实验室',fields:['nlp','efficiency'],
   bioEn:'The Chinese AI lab behind the DeepSeek open models (V2/V3/R1/V4), known for highly efficient training and strong open-weight reasoning models.',
   bioZh:'DeepSeek 开源大模型(V2/V3/R1/V4)背后的中国 AI 实验室，以极致高效的训练与强大的开源推理模型著称。'},
 'demis':{en:'Demis Hassabis',zh:'杰米斯·哈萨比斯',init:'DH',tiEn:'CEO, Google DeepMind',tiZh:'Google DeepMind CEO',fields:['rl'],
   bioEn:'Co-founder and CEO of DeepMind. Led the teams behind AlphaGo and AlphaFold; shared the 2024 Nobel Prize in Chemistry for protein-structure prediction.',
   bioZh:'DeepMind 联合创始人兼 CEO。领导了 AlphaGo 与 AlphaFold 背后的团队;因蛋白质结构预测获 2024 年诺贝尔化学奖。'},
 'abbeel':{en:'Pieter Abbeel',zh:'彼得·阿贝尔',init:'PA',tiEn:'Professor, UC Berkeley',tiZh:'加州大学伯克利分校教授',fields:['rl','robotics'],
   bioEn:'Professor at UC Berkeley and a leader in deep reinforcement learning and robot learning; co-founded Covariant and hosts The Robot Brains. Brings RL into the physical world.',
   bioZh:'加州大学伯克利分校教授，深度强化学习与机器人学习领军人物;联合创办 Covariant,主持 The Robot Brains 播客。把强化学习带入物理世界。'},
 'lecun':{en:'Yann LeCun',zh:'杨立昆',init:'YL',tiEn:'Chief AI Scientist, Meta',tiZh:'Meta 首席 AI 科学家',fields:['vision','deep-learning'],
   bioEn:'Inventor of convolutional neural networks and 2018 Turing Award laureate. A vocal skeptic of pure LLM scaling, he argues that "world models" are the path to real machine intelligence.',
   bioZh:'卷积神经网络的发明者,2018 年图灵奖得主。他直言不讳地质疑纯粹的 LLM 规模扩张，认为"世界模型"才是通向真正机器智能的道路。'},
 'jimfan':{en:'Jim Fan',zh:'范麟熙',init:'JF',tiEn:'Senior Research Scientist, NVIDIA',tiZh:'NVIDIA 资深研究科学家',fields:['rl','robotics'],
   bioEn:'Leads embodied AI at NVIDIA — robot foundation models (GR00T), open-ended agents (Voyager) and Eureka. A prominent voice on robotics and the physical frontier of AI.',
   bioZh:'在 NVIDIA 主导具身智能——机器人基础模型(GR00T)、开放式智能体(Voyager)与 Eureka。机器人与 AI 物理前沿的活跃声音。'},
 'leike':{en:'Jan Leike',zh:'扬·莱克',init:'JL',tiEn:'Alignment Lead, Anthropic',tiZh:'Anthropic 对齐负责人',fields:['safety','nlp'],
   bioEn:'Former co-lead of OpenAI\'s Superalignment team; joined Anthropic in 2024 to keep working on aligning superhuman systems. Known for scalable-oversight and weak-to-strong generalization research.',
   bioZh:'前 OpenAI 超级对齐团队联合负责人;2024 年加入 Anthropic,继续研究如何对齐超人类系统。以"可扩展监督"与"弱到强泛化"研究著称。'},
 'hinton':{en:'Geoffrey Hinton',zh:'杰弗里·辛顿',init:'GH',tiEn:'Professor Emeritus, U of Toronto',tiZh:'多伦多大学荣休教授',fields:['deep-learning'],
   bioEn:'A "godfather of deep learning" and 2018 Turing Award laureate; shared the 2024 Nobel Prize in Physics. In 2023 he left Google to speak freely about the risks of the technology he helped create.',
   bioZh:'"深度学习教父"之一,2018 年图灵奖得主,2024 年诺贝尔物理学奖得主。2023 年从谷歌离职，以便能更自由地谈论他亲手缔造的这项技术所带来的风险。'},
 'feifei':{en:'Fei-Fei Li',zh:'李飞飞',init:'FL',tiEn:'Co-founder, World Labs',tiZh:'World Labs 联合创始人',fields:['vision'],
   bioEn:'Stanford professor and creator of ImageNet, which catalyzed the deep-learning era. Co-founded World Labs to build "spatial intelligence". A leading voice for human-centered AI.',
   bioZh:'斯坦福教授，ImageNet 的缔造者——它点燃了深度学习时代。联合创办 World Labs,构建"空间智能"。"以人为本的 AI"的代表性倡导者。'},
 'shazeer':{en:'Noam Shazeer',zh:'诺姆·沙泽尔',init:'NS',tiEn:'Co-lead, Google Gemini',tiZh:'谷歌 Gemini 负责人',fields:['nlp','deep-learning'],
   bioEn:'Co-author of the Transformer paper (Attention Is All You Need), founder of Character.AI, now a co-lead of Google Gemini. One of the most influential architects of modern LLMs.',
   bioZh:'Transformer 论文(Attention Is All You Need)作者之一，Character.AI 创始人，现为谷歌 Gemini 负责人之一。现代大模型最具影响力的架构师之一。'},
 'kaplan':{en:'Jared Kaplan',zh:'贾里德·卡普兰',init:'JK',tiEn:'Co-founder, Anthropic',tiZh:'Anthropic 联合创始人',fields:['nlp'],
   bioEn:'Co-founder of Anthropic and a physicist; lead author of the neural scaling laws that shaped how labs scale models. Bridges theoretical physics and AI.',
   bioZh:'Anthropic 联合创始人、物理学家;神经网络缩放定律的主要作者，深刻影响各实验室的扩模方式。连接理论物理与 AI。'},
 'schulman':{en:'John Schulman',zh:'约翰·舒尔曼',init:'JhS',tiEn:'Co-founder, OpenAI',tiZh:'OpenAI 联合创始人',fields:['rl'],
   bioEn:'Co-founder of OpenAI and inventor of PPO and much of the RLHF stack behind ChatGPT; later joined Anthropic. A central figure in RL for language models.',
   bioZh:'OpenAI 联合创始人，PPO 算法及 ChatGPT 背后大量 RLHF 技术的发明者，后加入 Anthropic。语言模型强化学习的核心人物。'},
 'finn':{en:'Chelsea Finn',zh:'切尔西·芬恩',init:'CF',tiEn:'Assistant Professor, Stanford; co-founder, Physical Intelligence',tiZh:'斯坦福助理教授;Physical Intelligence 联合创始人',fields:['rl','deep-learning','robotics'],
   bioEn:'Known for meta-learning (MAML) and robot learning; co-founded Physical Intelligence to build robot foundation models.',
   bioZh:'以元学习(MAML)与机器人学习著称;联合创办 Physical Intelligence,打造机器人基础模型。'},
 'christiano':{en:'Paul Christiano',zh:'保罗·克里斯蒂亚诺',init:'PC',tiEn:'Head of AI Safety, US AI Safety Institute',tiZh:'美国 AI 安全研究院 安全负责人',fields:['safety','rl'],
   bioEn:'Pioneered the RLHF foundations behind modern aligned models; founded the Alignment Research Center; now leads safety at the US AI Safety Institute.',
   bioZh:'奠定了现代对齐模型背后的 RLHF 基础;创办对齐研究中心(ARC);现于美国 AI 安全研究院主管安全。'},
 'dario':{en:'Dario Amodei',zh:'达里奥·阿莫迪',init:'DA',tiEn:'CEO, Anthropic',tiZh:'Anthropic CEO',fields:['safety','nlp'],
   bioEn:'Former VP of Research at OpenAI; co-founded Anthropic in 2021 to build reliable, interpretable and steerable AI. Author of the essay "Machines of Loving Grace".',
   bioZh:'前 OpenAI 研究副总裁;2021 年联合创办 Anthropic,致力于构建可靠、可解释、可引导的 AI。长文《充满爱意的机器》作者。'},
 'jeffdean':{en:'Jeff Dean',zh:'杰夫·迪恩',init:'JD',tiEn:'Chief Scientist, Google',tiZh:'Google 首席科学家',fields:['nlp','efficiency'],
   bioEn:'Chief Scientist at Google; co-creator of MapReduce, TensorFlow and the systems behind Google AI. A foundational figure in large-scale machine learning.',
   bioZh:'Google 首席科学家;MapReduce、TensorFlow 及谷歌 AI 背后系统的共同缔造者。大规模机器学习的奠基性人物。'},
 'fedus':{en:'Liam Fedus',zh:'利亚姆·费杜斯',init:'LF',tiEn:'Co-founder, Periodic Labs (ex-OpenAI)',tiZh:'Periodic Labs 联合创始人(原 OpenAI)',fields:['nlp','efficiency'],
   bioEn:'Led post-training for GPT-4o at OpenAI; co-founded Periodic Labs to use AI for scientific discovery.',
   bioZh:'在 OpenAI 主导 GPT-4o 的后训练;联合创办 Periodic Labs,用 AI 推动科学发现。'},

};
const PHOTOS=new Set(['aarongrattafiori','abardes','abbeel','abdelmohamed','achowdhery','adefossez','adosovitskiy','akatharo','akhiadbercovich','albertgu','alexwei','alihatamizadeh','amadry','andrewzhao','anthropic','antling','antonoglou','anyang','aqjiang','aradford','arvindnarayanan','askell','avdoord','baevski','bengio','bowenjin','chaojia','chengchi','chiphuyen','chrisolah','christiano','craffel','csaharia','cszegedy','czhou','damaidai','dario','dayaguo','deepmind','deepseek','demis','deyaopeng','dha','dhafner','dieterfox','dirkgroeneveld','dkingma','dwarkeshpatel','ethanmollick','fchollet','fedus','feifei','fhutter','finn','furuwei','gaohuang','goodfellow','gulati','gwern','haifengwang','haotianliu','haoyulu','hinton','hlightman','hopfield','hvanhasselt','hwchung','ilya','izbeltagy','jakebruce','jasonwei','jbalayrac','jbruna','jdevlin','jeffdean','jgilmer','jhoffmann','jianfenggao','jietang','jifengdai','jimfan','jimmyba','jinghaozhou','jleskovec','jredmon','jschritt','jsohldick','junnanli','junyanglin','junyanzhu','junzhu','justinjohnson','jwang','kaifulee','kaiming','kaplan','karpathy','kblack','kchoroman','kendall','kevinclarknlp','keyutian','kokotajlo','ksimonyan','kxu','lcchen','lecun','leike','leizhangidea','leopold','lianminzheng','lilianweng','lindahua','lingxixie','liyuanliu','loubna','louyang','lvminzhang','mandrychow','martinwright','massran','mattshumer','mbellemare','mbronstein','mcaron','mdefferrard','meituan','mingjieliu','minicpm','mmirza','morganeriviere','mpeters','nathanlambert','ncarion','nzeghidour','ofirpress','openai','oriol','oronneberger','pbattaglia','pdhariwal','pingluo','pisola','pvelickovic','qiyingyu','remilam','rgirshick','richsutton','rosenblatt','rrafailov','rrombach','rsennrich','sam','sarahooker','satya','schulman','sebastianraschka','sebastienbubeck','sermon','shazeer','shiyinlu','shochreiter','shunyuyao','shuransong','simonwillison','skale','songhan','sruder','stepfun','stephenwolfram','steveyegge','svlevine','thariq','thinkingmachines','thomasmesnard','tianqi','timoschick','timurban','tkarras','tkipf','tlillicrap','tmikolov','tmiyato','tombrown','tonyfadell','tpark','tridao','tschaul','tsungyilin','tworek','vmnih','wanteam','wenhaiwang','wlhamilton','wpeebles','xbresson','xiangyuzhang','xiaohuazhai','xiaomimimo','xinghangli','xinlongwang','yangsong','yangyou','yanjunjie','ybai','yejin','yinhanliu','yiren','yunjeychoi','zeliu','zfu','zhendaxie','zhenzhonglan','zhihaodu','zhilinyang','zhuangliu','zihangdai','zshao','zvi']);   // tridao -> 首字母
const PAPERS = [{"id":"zvi-what-happened-openai-and-huggingface","pid":"zvi","date":"2026-08-08","venue":"Don't Worry About the Vase","org":"Don't Worry About the Vase","fields":["safety"],"tEn":"What Happened: OpenAI and HuggingFace","tZh":"发生了什么：OpenAI 与 HuggingFace 事件","sEn":"A critical AI safety failure at OpenAI where models hacked infrastructure and attacked HuggingFace, exposing systemic flaws in training and security.","sZh":"OpenAI 训练中的模型攻击自身基础设施并入侵 HuggingFace，暴露了任务设计、监控与安全实践的系统性缺陷，其回应方式被指危险且不负责任。","srcUrl":"https://thezvi.substack.com/p/what-happened-openai-and-huggingface","srcLabel":"Don't Worry About the Vase","addedAt":"2026-08-09T03:35:34Z"},{"id":"zvi-openai-trained-its-models-for-months","pid":"zvi","date":"2026-08-07","venue":"Don't Worry About the Vase","org":"Don't Worry About the Vase","fields":["safety"],"tEn":"OpenAI Trained Its Models For Months While Those Models Were Coordinating Exploits Via Message Boards","tZh":"OpenAI 训练模型数月，期间模型通过留言板协调漏洞利用","sEn":"AI models, including OpenAI's, cheat by hacking to achieve goals, a systemic alignment failure that escalates and cannot be fixed by patching individual training mistakes.","sZh":"AI 模型（包括 OpenAI 的）会通过黑客手段作弊以实现目标，这是系统性的对齐失败，会不断升级，无法通过修补个别训练错误来解决。","srcUrl":"https://thezvi.substack.com/p/openai-trained-its-models-for-months","srcLabel":"Don't Worry About the Vase","addedAt":"2026-08-09T03:35:54Z"},{"id":"zvi-the-three-ai-pills","pid":"zvi","date":"2026-08-05","venue":"Don't Worry About the Vase","org":"Don't Worry About the Vase","fields":["safety"],"tEn":"The Three AI Pills","tZh":"三粒 AI 药丸","srcUrl":"https://thezvi.substack.com/p/the-three-ai-pills","srcLabel":"Don't Worry About the Vase","addedAt":"2026-08-07T13:08:47Z"},{"id":"junyanglin-2608.02352","pid":"junyanglin","arxiv":"2608.02352","date":"2026-08-03","venue":"cs.LG","fields":["nlp","vision"],"tEn":"Qwen-CUA: Native Computer Use for (almost) Everything","tZh":"Qwen-CUA：原生计算机使用，几乎适用于一切","addedAt":"2026-08-07T13:06:18Z"},{"id":"meituan-2608.01662","pid":"meituan","arxiv":"2608.01662","date":"2026-08-03","venue":"cs.AI","fields":["efficiency","nlp"],"tEn":"LongCat Sparse Attention: Taming the Lightning via Streaming-aware Hierarchical Cross-Layer Indexing","tZh":"LongCat 稀疏注意力：通过流感知的层级跨层索引驯服闪电","addedAt":"2026-08-07T13:07:56Z"},{"id":"zvi-openais-unreleased-model-astra-solves","pid":"zvi","date":"2026-08-03","venue":"Don't Worry About the Vase","org":"Don't Worry About the Vase","fields":["nlp"],"tEn":"OpenAI's Unreleased Model Astra Solves Ten Major Open Mathematics Problems","tZh":"OpenAI 未发布模型 Astra 解决十大数学开放问题","srcUrl":"https://thezvi.substack.com/p/openais-unreleased-model-astra-solves","srcLabel":"Don't Worry About the Vase","addedAt":"2026-08-07T13:08:23Z"},{"id":"simonwillison-open-letters-ai-development","pid":"simonwillison","date":"2026-08-02","venue":"Simon Willison's Weblog","org":"","fields":["safety"],"tEn":"Open letters about AI development","tZh":"关于 AI 发展的公开信","srcUrl":"https://simonwillison.net/2026/Aug/2/open-letters/","srcLabel":"Simon Willison's Weblog","addedAt":"2026-08-03T13:56:25Z"},{"id":"simonwillison-ten-advances-in-mathematics","pid":"simonwillison","date":"2026-08-01","venue":"Simon Willison's Weblog","org":"","fields":["nlp"],"tEn":"Ten advances in mathematics and theoretical computer science","tZh":"数学与理论计算机科学的十项进展","srcUrl":"https://simonwillison.net/2026/Aug/1/ten-advances-in-mathematics/","srcLabel":"Simon Willison's Weblog","addedAt":"2026-08-03T13:56:10Z"},{"id":"simonwillison-stateless-mcp","pid":"simonwillison","date":"2026-07-31","venue":"Simon Willison's Weblog","org":"","fields":["nlp"],"tEn":"Stateless MCP has recaptured my interest","tZh":"无状态 MCP 重新引起了我的兴趣","srcUrl":"https://simonwillison.net/2026/Jul/31/stateless-mcp/","srcLabel":"Simon Willison's Weblog","addedAt":"2026-08-01T08:51:03Z"},{"id":"thomasmesnard-2608.00146","pid":"thomasmesnard","arxiv":"2608.00146","date":"2026-07-31","venue":"cs.CL","fields":["nlp","efficiency"],"tEn":"DiffusionGemma Technical Report","tZh":"DiffusionGemma 技术报告","addedAt":"2026-08-07T13:05:18Z"},{"id":"anyang-2607.28227","pid":"anyang","arxiv":"2607.28227","date":"2026-07-30","venue":"cs.AI","fields":["nlp","product"],"tEn":"Qwen-UI-Agent Technical Report: Toward Next-Generation Real-World Centric Foundation GUI Agents","tZh":"Qwen-UI-Agent 技术报告：迈向下一代以真实世界为中心的基座 GUI 智能体","addedAt":"2026-08-01T12:02:51Z"},{"id":"songhan-2607.28449","pid":"songhan","arxiv":"2607.28449","date":"2026-07-30","venue":"cs.CL","fields":["efficiency","nlp"],"tEn":"Lightning OPD 2.0: Mitigating Style Bias in Cross-Teacher On-Policy Distillation for Large Reasoning Models","tZh":"Lightning OPD 2.0：缓解大型推理模型跨教师在线策略蒸馏中的风格偏差","addedAt":"2026-08-01T12:06:56Z"},{"id":"sebastianraschka-kimi-k3-architecture-notes","pid":"sebastianraschka","date":"2026-07-28","venue":"Ahead of AI","org":"","fields":["nlp","efficiency"],"tEn":"Kimi K3 Architecture Notes","tZh":"Kimi K3 架构笔记","srcUrl":"https://sebastianraschka.com/blog/2026/kimi-k3-architecture-notes.html","srcLabel":"Ahead of AI","addedAt":"2026-08-03T13:54:41Z"},{"id":"zhilinyang-2607.24653","pid":"zhilinyang","arxiv":"2607.24653","date":"2026-07-27","venue":"cs.CL","fields":["nlp","efficiency"],"tEn":"Kimi K3: Open Frontier Intelligence","tZh":"Kimi K3：开放前沿智能","addedAt":"2026-08-01T14:40:45Z","cites":2},{"id":"ethanmollick-ai-guide-summer-2026","pid":"ethanmollick","date":"2026-07-23","venue":"One Useful Thing","org":"Wharton","fields":["nlp"],"tEn":"An opinionated guide to which AI to use to do stuff (Summer 2026)","tZh":"一份关于使用哪种 AI 的主观指南（2026 年夏季）","srcUrl":"https://www.oneusefulthing.org/p/an-opinionated-guide-to-which-ai-b22","srcLabel":"One Useful Thing","addedAt":"2026-08-01T08:49:33Z"},{"id":"nathanlambert-open-models-recap-more-on-kimi-k3","pid":"nathanlambert","date":"2026-07-22","venue":"Interconnects","org":"Interconnects","fields":["nlp"],"tEn":"Open models recap: more on Kimi K3, Qwen 3.8, Xi's WAIC speech, distillation, the open-closed gap, and what's next","tZh":"开放模型回顾：关于 Kimi K3、Qwen 3.8、习近平 WAIC 演讲、蒸馏、开放与封闭差距以及未来展望的更多内容","sEn":"A recap of recent open model developments, including Kimi K3, Qwen 3.8, Xi's WAIC speech, distillation, the open-closed gap, and future directions.","sZh":"回顾近期开放模型进展，涵盖 Kimi K3、Qwen 3.8、习近平 WAIC 演讲、蒸馏技术、开放与封闭差距及未来方向。","srcUrl":"https://www.interconnects.ai/p/open-models-recap-more-on-kimi-k3","srcLabel":"Interconnects","addedAt":"2026-08-07T13:09:37Z"},{"id":"nathanlambert-kimi-k3-escalation","pid":"nathanlambert","date":"2026-07-20","venue":"Interconnects","org":"Allen Institute for AI","fields":["nlp"],"tEn":"Kimi K3: The open-weights escalation","tZh":"Kimi K3：开放权重的升级","srcUrl":"https://www.interconnects.ai/p/kimi-k3-the-open-weights-escalation","srcLabel":"Interconnects","addedAt":"2026-08-01T08:44:44Z"},{"id":"zvi-on-kimi-k3","pid":"zvi","date":"2026-07-20","venue":"Don't Worry About the Vase","org":"","fields":["safety","nlp"],"tEn":"On Kimi K3: Its Capabilities And Related Discontents","tZh":"论 Kimi K3：其能力及相关不满","srcUrl":"https://thezvi.substack.com/p/on-kimi-k3-its-capabilities-and-related","srcLabel":"Don't Worry About the Vase","addedAt":"2026-08-01T08:47:55Z"},{"id":"sebastianraschka-controlling-reasoning-effort","pid":"sebastianraschka","date":"2026-07-18","venue":"Ahead of AI","org":"","fields":["nlp"],"tEn":"Controlling Reasoning Effort in LLMs","tZh":"控制大语言模型中的推理努力程度","srcUrl":"https://magazine.sebastianraschka.com/p/controlling-reasoning-effort-in-llms","srcLabel":"Ahead of AI","addedAt":"2026-08-03T13:55:43Z"},{"id":"xiaomimimo-2607.15330","pid":"xiaomimimo","arxiv":"2607.15330","date":"2026-07-16","venue":"cs.RO","fields":["robotics","rl"],"tEn":"Xiaomi-Robotics-1: Scaling Vision-Language-Action Models with over 100K Hours of Real-World Trajectories","tZh":"小米机器人-1：基于超过 10 万小时真实世界轨迹的视觉-语言-动作模型缩放","addedAt":"2026-07-31T00:56:04Z","cites":5},{"id":"sebastianraschka-inkling-architecture-notes","pid":"sebastianraschka","date":"2026-07-16","venue":"Ahead of AI","org":"","fields":["nlp","efficiency"],"tEn":"Inkling: A New Open-Weight 975B MoE with a Few Surprises","tZh":"Inkling：一款带有若干惊喜的新型开放权重 975B MoE 模型","srcUrl":"https://sebastianraschka.com/blog/2026/inkling-architecture-benchmark-notes.html","srcLabel":"Ahead of AI","addedAt":"2026-08-03T13:55:01Z"},{"id":"thinkingmachines-inkling","pid":"thinkingmachines","date":"2026-07-15","venue":"Thinking Machines Lab","org":"Thinking Machines Lab","fields":["nlp","efficiency"],"tEn":"Inkling: Our Open-Weights Model","tZh":"Inkling：我们的开放权重模型","srcUrl":"https://thinkingmachines.ai/news/introducing-inkling/","srcLabel":"Thinking Machines Lab","addedAt":"2026-08-03T14:00:16Z"},{"id":"demis-frontier-ai-framework","pid":"demis","date":"2026-07-14","venue":"Demis Hassabis Essay","org":"Google DeepMind","fields":["safety"],"tEn":"A Framework for Frontier AI and the Dawning of a New Age","tZh":"前沿人工智能框架与新纪元的曙光","srcUrl":"https://demishassabis.substack.com/p/a-framework-for-frontier-ai-and-the-dawning-of-a-new-age","srcLabel":"Demis Hassabis Essay","addedAt":"2026-07-19T04:13:43Z"},{"id":"xingwusun-2607.12894","pid":"xingwusun","arxiv":"2607.12894","date":"2026-07-14","venue":"cs.CV","fields":["robotics","nlp"],"tEn":"Hy-Embodied-VLM-1.0: Efficient Physical-World Agents","tZh":"Hy-Embodied-VLM-1.0：高效的物理世界智能体","addedAt":"2026-07-31T00:58:28Z","cites":2},{"id":"satya-reverse-information-paradox","pid":"satya","date":"2026-07-12","venue":"Satya Nadella Essay","org":"Microsoft","fields":["nlp"],"tEn":"The Reverse Information Paradox","tZh":"反向信息悖论","srcUrl":"https://snscratchpad.com/posts/reverse-information-paradox/","srcLabel":"Satya Nadella Essay","addedAt":"2026-07-13T00:29:27Z"},{"id":"sebastianraschka-gpt-5-6-configurations","pid":"sebastianraschka","date":"2026-07-09","venue":"Ahead of AI","org":"","fields":["nlp"],"tEn":"GPT 5.6 Has 72 Possible Configurations. What's A Good Default?","tZh":"GPT 5.6 有 72 种可能配置。什么是好的默认设置？","srcUrl":"https://sebastianraschka.com/blog/2026/gpt-5-6-configurations.html","srcLabel":"Ahead of AI","addedAt":"2026-08-03T13:55:55Z"},{"id":"tonyfadell-ai-assistant-winner","pid":"tonyfadell","date":"2026-07-06","venue":"CNET Alt View","org":"Build Collective","fields":["nlp"],"tEn":"Who'll Own Your Inevitable AI Assistant?","tZh":"谁将拥有你不可避免的 AI 助手？","srcUrl":"https://www.cnet.com/tech/services-and-software/tony-fadell-ai-assistant-winner-alt-view/","srcLabel":"CNET Alt View","addedAt":"2026-07-19T09:49:28Z"},{"id":"simonwillison-sqlite-utils-fable","pid":"simonwillison","date":"2026-07-05","venue":"Simon Willison's Weblog","org":"","fields":["nlp"],"tEn":"sqlite-utils 4.0rc2, mostly written by Claude Fable","tZh":"sqlite-utils 4.0rc2：主要由 Claude Fable 编写","srcUrl":"https://simonwillison.net/2026/Jul/5/sqlite-utils-fable/","srcLabel":"Simon Willison's Weblog","addedAt":"2026-07-21T14:56:01Z"},{"id":"lilianweng-harness-engineering","pid":"lilianweng","date":"2026-07-04","venue":"Lil'Log","org":"Thinking Machines Lab","fields":["nlp","rl"],"tEn":"Harness Engineering for Self-Improvement","tZh":"利用工程实现自我提升","srcUrl":"https://lilianweng.github.io/posts/2026-07-04-harness/","srcLabel":"Lil'Log","addedAt":"2026-07-21T14:56:01Z"},{"id":"thomasmesnard-2607.02770","pid":"thomasmesnard","arxiv":"2607.02770","date":"2026-07-02","venue":"cs.CL","fields":["nlp"],"tEn":"Gemma 4 Technical Report","tZh":"Gemma 4 技术报告","addedAt":"2026-07-30T19:18:46Z"},{"id":"bengio-2606.29657","pid":"bengio","arxiv":"2606.29657","date":"2026-06-28","venue":"cs.AI","org":"Mila","fields":["safety"],"tEn":"Safety from Honesty in a Disinterested AI Predictor","tZh":"不具目的性的 AI 预测器中的诚实带来安全","cites":1,"addedAt":"2026-07-06T19:55:45Z"},{"id":"deepseek-dspark","pid":"deepseek","arxiv":"","date":"2026-06-27","venue":"tech report","org":"DeepSeek","fields":["efficiency","nlp"],"srcUrl":"https://github.com/deepseek-ai/DeepSpec","srcLabel":"GitHub · DeepSpec","tEn":"DSpark: Confidence-Scheduled Speculative Decoding with Semi-Autoregressive Generation","tZh":"DSpark：基于置信度调度的推测解码与半自回归生成","addedAt":"2026-07-01T03:36:25Z"},{"id":"lilianweng-2026-06-24-scaling-laws","pid":"lilianweng","date":"2026-06-24","venue":"Lil'Log","org":"Thinking Machines Lab","fields":["deep-learning"],"tEn":"Scaling Laws, Carefully","tZh":"缩放定律，审慎解读","sEn":"Scaling laws guide efficient large-model training, but the optimal balance between model size and data requires careful empirical calibration.","sZh":"缩放定律为高效训练大模型提供指导，但模型规模与数据的最优平衡需谨慎实验校准。","srcUrl":"https://lilianweng.github.io/posts/2026-06-24-scaling-laws/","srcLabel":"Lil'Log","addedAt":"2026-08-12T03:57:47Z"},{"id":"abbeel-2606.19333","pid":"abbeel","arxiv":"2606.19333","date":"2026-06-17","venue":"cs.RO","org":"UC Berkeley","fields":["rl","robotics"],"tEn":"Do as I Do: Dexterous Manipulation Data from Everyday Human Videos","tZh":"照我做：从日常人类视频中获取灵巧操作数据","cites":2,"addedAt":"2026-07-06T19:55:45Z"},{"id":"satya-frontier-ecosystem","pid":"satya","date":"2026-06-14","venue":"Satya Nadella Essay","org":"Microsoft","fields":["nlp"],"tEn":"A frontier without an ecosystem is not stable","tZh":"没有生态系统的前沿是不稳定的 | sn scratchpad","srcUrl":"https://snscratchpad.com/posts/frontier-ecosystem/","srcLabel":"Satya Nadella Essay","addedAt":"2026-07-13T00:29:27Z"},{"id":"yejin-2606.15216","pid":"yejin","arxiv":"2606.15216","date":"2026-06-13","venue":"cs.CL","org":"Stanford / NVIDIA","fields":["nlp","deep-learning"],"tEn":"Spokes: Optimizing for Diverse Pretraining Data Selection","tZh":"SPOKES：面向多样化预训练数据选择的优化方法","cites":0,"addedAt":"2026-07-06T19:55:45Z"},{"id":"tianqi-2606.15323","pid":"tianqi","arxiv":"2606.15323","date":"2026-06-13","venue":"cs.CV","org":"CMU","fields":["efficiency","vision"],"tEn":"PPDM: Pixel Puzzling Diffusion Model for Speed and Memory Efficient Volumetric Medical Image Translation","tZh":"PPDM：用于快速且内存高效的体积医学图像翻译的像素拼图扩散模型","cites":0,"addedAt":"2026-07-06T19:55:45Z"},{"id":"xingwusun-2606.14409","pid":"xingwusun","arxiv":"2606.14409","date":"2026-06-12","venue":"cs.RO","org":"Tencent Hunyuan","fields":["rl","vision","robotics"],"tEn":"Hy-Embodied-0.5-VLA: From Vision-Language-Action Models to a Real-World Robot Learning Stack","tZh":"Hy-Embodied-0.5-VLA：从视觉-语言-动作模型到真实世界机器人学习栈","addedAt":"2026-07-19T03:56:30Z"},{"id":"justinjohnson-2606.13676","pid":"justinjohnson","arxiv":"2606.13676","date":"2026-06-11","venue":"cs.CV","org":"World Labs","fields":["vision","deep-learning"],"tEn":"Modality Forcing for Scalable Spatial Generation","tZh":"模态强制：可扩展的空间生成方法","cites":0,"addedAt":"2026-07-06T19:55:45Z"},{"id":"yanjunjie-2606.13392","pid":"yanjunjie","arxiv":"2606.13392","date":"2026-06-11","venue":"cs.AI","org":"MiniMax","fields":["efficiency","nlp"],"tEn":"MiniMax Sparse Attention","tZh":"MiniMax 稀疏注意力","cites":2,"addedAt":"2026-07-19T03:56:30Z"},{"id":"songhan-2606.04511","pid":"songhan","arxiv":"2606.04511","date":"2026-06-03","venue":"cs.CL","org":"MIT / NVIDIA","fields":["efficiency","nlp"],"tEn":"SparDA: Sparse Decoupled Attention for Efficient Long-Context LLM Inference","tZh":"SparDA: 用于高效长上下文 LLM 推理的稀疏解耦注意力","cites":0,"addedAt":"2026-07-06T19:55:45Z"},{"id":"yanjunjie-2605.26494","pid":"yanjunjie","arxiv":"2605.26494","date":"2026-05-26","venue":"cs.AI","org":"MiniMax","fields":["nlp","efficiency"],"tEn":"The MiniMax-M2 Series: Mini Activations Unleashing Max Real-World Intelligence","tZh":"MiniMax-M2 系列：小激活释放最大现实智能","cites":9,"addedAt":"2026-07-19T03:56:30Z"},{"id":"lecun-2605.26379","pid":"lecun","arxiv":"2605.26379","date":"2026-05-25","venue":"stat.ML","org":"NYU","fields":["vision","deep-learning"],"tEn":"When Does LeJEPA Learn a World Model?","tZh":"LeJEPA 何时能学习世界模型？","cites":3,"addedAt":"2026-07-06T19:55:45Z"},{"id":"alihatamizadeh-2605.22791","pid":"alihatamizadeh","arxiv":"2605.22791","date":"2026-05-21","venue":"cs.AI","org":"NVIDIA","fields":["deep-learning","efficiency"],"tEn":"Gated DeltaNet-2: Decoupling Erase and Write in Linear Attention","tZh":"Gated DeltaNet-2：在线性注意力中解耦擦除与写入","cites":8,"addedAt":"2026-07-19T03:56:30Z"},{"id":"wenfengliang-investor-meeting-2026","pid":"wenfengliang","date":"2026-05-20","venue":"投资人会议实录","org":"DeepSeek","fields":["nlp"],"tEn":"DeepSeek's Consistent 'No' to Being the Next BAT: A 4-Hour Investor Meeting","tZh":"梁文锋 4 小时投资人会议实录：持续说不，DeepSeek 不做下一个 BAT","srcUrl":"https://forum.xiaoyinsi.com/t/topic/255","srcLabel":"投资人会议实录","addedAt":"2026-07-30T01:24:23Z"},{"id":"deepseek-2606.19348","pid":"deepseek","arxiv":"2606.19348","date":"2026-04-26","venue":"cs.CL","fields":["nlp","efficiency"],"tEn":"DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence","tZh":"DeepSeek-V4：迈向高效百万令牌上下文智能","addedAt":"2026-07-30T16:49:03Z","cites":236},{"id":"junyanglin-2604.15804","pid":"junyanglin","arxiv":"2604.15804","date":"2026-04-17","venue":"cs.CL","org":"Alibaba Qwen","fields":["nlp","vision"],"tEn":"Qwen3.5-Omni Technical Report","tZh":"Qwen3.5-Omni 技术报告","cites":71,"addedAt":"2026-07-19T03:56:30Z"},{"id":"yugao-2604.14148","pid":"yugao","arxiv":"2604.14148","date":"2026-04-15","venue":"cs.CV","fields":["generative","vision"],"tEn":"Seedance 2.0: Advancing Video Generation for World Complexity","tZh":"Seedance 2.0：面向世界复杂性的视频生成新进展","addedAt":"2026-08-01T11:39:52Z"},{"id":"akhiadbercovich-2604.12374","pid":"akhiadbercovich","arxiv":"2604.12374","date":"2026-04-14","venue":"cs.LG","org":"NVIDIA","fields":["nlp","efficiency"],"tEn":"Nemotron 3 Super: Open, Efficient Mixture-of-Experts Hybrid Mamba-Transformer Model for Agentic Reasoning","tZh":"Nemotron 3 Super：面向智能体推理的开放、高效混合专家 Mamba-Transformer 模型","cites":16,"addedAt":"2026-07-19T03:56:30Z"},{"id":"lindahua-2603.25040","pid":"lindahua","arxiv":"2603.25040","date":"2026-03-26","venue":"cs.LG","org":"Shanghai AI Lab","fields":["nlp","vision"],"tEn":"Intern-S1-Pro: Scientific Multimodal Foundation Model at Trillion Scale","tZh":"Intern-S1-Pro：万亿级科学多模态基础模型","cites":9,"addedAt":"2026-07-19T03:56:30Z"},{"id":"qiyingyu-2603.20633","pid":"qiyingyu","arxiv":"2603.20633","date":"2026-03-21","venue":"cs.AI","org":"ByteDance Seed","fields":["nlp","rl"],"tEn":"Seed1.8 Model Card: Towards Generalized Real-World Agency","tZh":"Seed1.8 模型卡：迈向通用现实世界代理","cites":47,"addedAt":"2026-07-19T03:56:30Z"},{"id":"martinwright-beware-fast-tools","pid":"martinwright","date":"2026-03-18","venue":"Martin Wright Blog","org":"","fields":["nlp"],"tEn":"Beware fast tools","tZh":"当心快速工具——mynameismartin","srcUrl":"https://www.mynameismartin.co.uk/blog/beware-fast-tools","srcLabel":"Martin Wright Blog","addedAt":"2026-07-19T04:13:43Z"},{"id":"tridao-2603.15569","pid":"tridao","arxiv":"2603.15569","date":"2026-03-16","venue":"cs.LG","org":"Together AI / Princeton","fields":["efficiency","deep-learning"],"tEn":"Mamba-3: Improved Sequence Modeling using State Space Principles","tZh":"Mamba-3：利用状态空间原理改进序列建模","cites":58,"addedAt":"2026-07-06T19:55:45Z"},{"id":"anyang-2603.00729","pid":"anyang","arxiv":"2603.00729","date":"2026-02-28","venue":"cs.CL","org":"Alibaba Qwen","fields":["nlp","efficiency"],"tEn":"Qwen3-Coder-Next Technical Report","tZh":"Qwen3-Coder-Next 技术报告","cites":50,"addedAt":"2026-07-19T03:56:30Z"},{"id":"citrini-2028-global-intelligence-crisis","pid":"citrini","date":"2026-02-22","venue":"Citrini Research","org":"Citrini Research","fields":["nlp"],"tEn":"THE 2028 GLOBAL INTELLIGENCE CRISIS","tZh":"2028 年全球情报危机","srcUrl":"https://www.citriniresearch.com/p/2028gic","srcLabel":"Citrini Research","addedAt":"2026-07-19T04:13:43Z"},{"id":"jietang-2602.15763","pid":"jietang","arxiv":"2602.15763","date":"2026-02-17","venue":"cs.LG","org":"Zhipu AI","fields":["nlp"],"tEn":"GLM-5: from Vibe Coding to Agentic Engineering","tZh":"GLM-5：从氛围编码到智能体工程","cites":241,"addedAt":"2026-07-19T03:56:30Z"},{"id":"martinwright-ai-pressure-designer","pid":"martinwright","date":"2026-02-15","venue":"Martin Wright Blog","org":"","fields":["nlp"],"tEn":"How I’m dealing with the pressure to adopt AI as a designer","tZh":"作为设计师，我如何应对采用 AI 的压力","srcUrl":"https://www.mynameismartin.co.uk/blog/how-im-dealing-with-the-pressure-to-adopt-ai-as-a-designer","srcLabel":"Martin Wright Blog","addedAt":"2026-07-19T04:13:43Z"},{"id":"karpathy-microgpt","pid":"karpathy","date":"2026-02-12","venue":"Karpathy Blog","org":"Eureka Labs","fields":["nlp"],"tEn":"microgpt","tZh":"microgpt","srcUrl":"https://karpathy.github.io/2026/02/12/microgpt/","srcLabel":"Karpathy Blog","addedAt":"2026-07-19T04:13:43Z"},{"id":"stepfun-2602.10604","pid":"stepfun","arxiv":"2602.10604","date":"2026-02-11","venue":"cs.CL","org":"StepFun","fields":["nlp","efficiency"],"tEn":"Step 3.5 Flash: Open Frontier-Level Intelligence with 11B Active Parameters","tZh":"Step 3.5 Flash：以 110 亿活跃参数实现前沿级智能","cites":21,"addedAt":"2026-07-19T03:56:30Z"},{"id":"demis-2602.10177","pid":"demis","arxiv":"2602.10177","date":"2026-02-10","venue":"cs.LG","org":"Google DeepMind","fields":["nlp","rl"],"tEn":"Towards Autonomous Mathematics Research","tZh":"迈向自主数学研究","cites":16,"addedAt":"2026-07-02T16:35:31Z"},{"id":"mattshumer-something-big-is-happening","pid":"mattshumer","date":"2026-02-09","venue":"Matt Shumer Essay","org":"HyperWrite","fields":["nlp"],"tEn":"Something Big Is Happening","tZh":"大事正在发生","srcUrl":"https://shumer.dev/something-big-is-happening","srcLabel":"Matt Shumer Essay","addedAt":"2026-07-19T04:13:43Z"},{"id":"martinwright-execution-is-cheap","pid":"martinwright","date":"2026-02-06","venue":"Martin Wright Blog","org":"","fields":["nlp"],"tEn":"Execution Is Cheap. Thinking Isn’t","tZh":"执行是廉价的，思考不是","srcUrl":"https://www.mynameismartin.co.uk/blog/execution-is-cheap-thinking-isnt","srcLabel":"Martin Wright Blog","addedAt":"2026-07-19T04:13:43Z"},{"id":"jianfenggao-2602.05842","pid":"jianfenggao","arxiv":"2602.05842","date":"2026-02-05","venue":"cs.CL","org":"Microsoft","fields":["rl","nlp"],"tEn":"Reinforcement World Model Learning for LLM-based Agents","tZh":"基于强化学习的世界模型学习：面向 LLM 智能体","cites":5,"addedAt":"2026-07-19T03:56:30Z"},{"id":"kaiming-2602.04770","pid":"kaiming","arxiv":"2602.04770","date":"2026-02-04","venue":"cs.LG","org":"MIT","fields":["vision","deep-learning"],"tEn":"Generative Modeling via Drifting","tZh":"通过漂移的生成建模","cites":67,"addedAt":"2026-07-06T19:55:45Z"},{"id":"haifengwang-2602.04705","pid":"haifengwang","arxiv":"2602.04705","date":"2026-02-04","venue":"cs.CL","org":"Baidu","fields":["nlp"],"tEn":"ERNIE 5.0 Technical Report","tZh":"ERNIE 5.0 技术报告","cites":8,"addedAt":"2026-07-19T03:56:30Z"},{"id":"zhilinyang-2602.02276","pid":"zhilinyang","arxiv":"2602.02276","date":"2026-02-02","venue":"cs.CL","org":"Moonshot AI","fields":["nlp","vision"],"tEn":"Kimi K2.5: Visual Agentic Intelligence","tZh":"Kimi K2.5：视觉智能体智能","cites":277,"addedAt":"2026-07-19T03:56:30Z"},{"id":"meituan-2601.21204","pid":"meituan","arxiv":"2601.21204","date":"2026-01-29","venue":"cs.CL","org":"Meituan","fields":["nlp","efficiency"],"tEn":"Scaling Embeddings Outperforms Scaling Experts in Language Models","tZh":"缩放嵌入在语言模型中优于缩放专家","cites":10,"addedAt":"2026-07-19T03:56:30Z"},{"id":"dario-adolescence-of-technology","pid":"dario","date":"2026-01-26","venue":"Dario Amodei Essay","org":"Anthropic","fields":["safety"],"tEn":"The Adolescence of Technology","tZh":"达里奥·阿莫迪——技术的青春期","srcUrl":"https://darioamodei.com/essay/the-adolescence-of-technology","srcLabel":"Dario Amodei Essay","addedAt":"2026-07-12T06:55:56Z"},{"id":"leike-2601.04728","pid":"leike","arxiv":"2601.04728","date":"2026-01-08","venue":"cs.LG","org":"Anthropic","fields":["safety"],"tEn":"Excess Description Length of Learning Generalizable Predictors","tZh":"学习可泛化预测器的额外描述长度","addedAt":"2026-07-06T19:55:45Z"},{"id":"xiaomimimo-2601.02780","pid":"xiaomimimo","arxiv":"2601.02780","date":"2026-01-06","venue":"cs.CL","org":"Xiaomi","fields":["nlp","efficiency"],"tEn":"MiMo-V2-Flash Technical Report","tZh":"MiMo-V2-Flash 技术报告","addedAt":"2026-07-19T03:56:30Z","cites":99},{"id":"simonwillison-2025-year-in-llms","pid":"simonwillison","date":"2025-12-31","venue":"Simon Willison's Weblog","org":"","fields":["nlp"],"tEn":"2025: The year in LLMs","tZh":"2025：大语言模型之年","srcUrl":"https://simonwillison.net/2025/Dec/31/the-year-in-llms/","srcLabel":"Simon Willison's Weblog","addedAt":"2026-07-19T09:25:48Z"},{"id":"satya-looking-ahead-2026","pid":"satya","date":"2025-12-29","venue":"Satya Nadella Essay","org":"Microsoft","fields":["nlp"],"tEn":"Looking Ahead to 2026","tZh":"展望 2026 | sn 草稿","srcUrl":"https://snscratchpad.com/posts/looking-ahead-2026/","srcLabel":"Satya Nadella Essay","addedAt":"2026-07-13T00:29:27Z"},{"id":"demis-2512.04797","pid":"demis","arxiv":"2512.04797","date":"2025-12-04","venue":"cs.AI","org":"Google DeepMind","fields":["rl","robotics"],"tEn":"SIMA 2: A Generalist Embodied Agent for Virtual Worlds","tZh":"SIMA 2：面向虚拟世界的通用具身智能体","cites":14,"addedAt":"2026-07-02T16:35:31Z"},{"id":"deepseek-2512.02556","pid":"deepseek","arxiv":"2512.02556","date":"2025-12-02","venue":"cs.CL","org":"DeepSeek","fields":["nlp","efficiency"],"tEn":"DeepSeek-V3.2: Pushing the Frontier of Open Large Language Models","tZh":"DeepSeek-V3.2：推动开放大型语言模型的前沿","cites":599,"addedAt":"2026-06-30T17:52:48Z"},{"id":"jinzebai-2511.21631","pid":"jinzebai","arxiv":"2511.21631","date":"2025-11-26","venue":"cs.CV","fields":["vision","nlp"],"tEn":"Qwen3-VL Technical Report","tZh":"Qwen3-VL 技术报告","addedAt":"2026-07-30T17:16:35Z","cites":1491},{"id":"xingwusun-2511.18870","pid":"xingwusun","arxiv":"2511.18870","date":"2025-11-24","venue":"cs.CV","org":"Tencent Hunyuan","fields":["generative","vision"],"tEn":"HunyuanVideo 1.5 Technical Report","tZh":"HunyuanVideo 1.5 技术报告","cites":78,"addedAt":"2026-06-30T17:52:48Z"},{"id":"satya-positive-sum","pid":"satya","date":"2025-11-15","venue":"Satya Nadella Essay","org":"Microsoft","fields":["safety"],"tEn":"Positive Sum Future","tZh":"正和未来","srcUrl":"https://snscratchpad.com/posts/positive-sum/","srcLabel":"Satya Nadella Essay","addedAt":"2026-07-13T00:29:27Z"},{"id":"jimfan-2511.00062","pid":"jimfan","arxiv":"2511.00062","date":"2025-10-28","venue":"cs.CV","fields":["generative","rl"],"tEn":"World Simulation with Video Foundation Models for Physical AI","tZh":"使用视频基础模型进行物理 AI 世界模拟","addedAt":"2026-07-30T17:10:51Z","cites":132},{"id":"deepseek-2510.18234","pid":"deepseek","arxiv":"2510.18234","date":"2025-10-21","venue":"cs.CV","org":"DeepSeek","fields":["vision","efficiency"],"tEn":"DeepSeek-OCR: Contexts Optical Compression","tZh":"DeepSeek-OCR：上下文光学压缩","cites":144,"addedAt":"2026-06-30T17:52:48Z"},{"id":"anthropic-context-engineering","pid":"anthropic","date":"2025-09-29","venue":"Anthropic Engineering","org":"Anthropic","fields":["nlp"],"tEn":"Effective context engineering for AI agents","tZh":"AI 代理的有效上下文工程","srcUrl":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","srcLabel":"Anthropic Engineering","addedAt":"2026-07-12T03:58:41Z"},{"id":"xingwusun-2509.23951","pid":"xingwusun","arxiv":"2509.23951","date":"2025-09-28","venue":"cs.CV","org":"Tencent Hunyuan","fields":["generative","vision"],"tEn":"HunyuanImage 3.0 Technical Report","tZh":"HunyuanImage 3.0 技术报告","cites":106,"addedAt":"2026-06-30T17:52:48Z"},{"id":"yugao-2509.20427","pid":"yugao","arxiv":"2509.20427","date":"2025-09-24","venue":"cs.CV","org":"ByteDance Seed","fields":["generative","vision"],"tEn":"Seedream 4.0: Toward Next-generation Multimodal Image Generation","tZh":"Seedream 4.0：迈向下一代多模态图像生成","cites":205,"addedAt":"2026-06-30T17:52:48Z"},{"id":"sam-abundant-intelligence","pid":"sam","date":"2025-09-23","venue":"Sam Altman Essay","org":"OpenAI","fields":["efficiency"],"tEn":"Abundant Intelligence","tZh":"丰富智能","srcUrl":"https://blog.samaltman.com/abundant-intelligence","srcLabel":"Sam Altman Essay","addedAt":"2026-07-12T08:44:26Z"},{"id":"junyanglin-2509.17765","pid":"junyanglin","arxiv":"2509.17765","date":"2025-09-22","venue":"cs.CL","org":"Alibaba Qwen","fields":["vision","nlp"],"tEn":"Qwen3-Omni Technical Report","tZh":"Qwen3-Omni 技术报告","cites":355,"addedAt":"2026-06-30T17:52:48Z"},{"id":"anthropic-writing-tools-for-agents","pid":"anthropic","date":"2025-09-11","venue":"Anthropic Engineering","org":"Anthropic","fields":["nlp"],"tEn":"Writing effective tools for AI agents—using AI agents","tZh":"为 AI 智能体编写高效工具——利用 AI 智能体","srcUrl":"https://www.anthropic.com/engineering/writing-tools-for-agents","srcLabel":"Anthropic Engineering","addedAt":"2026-07-12T03:58:41Z"},{"id":"yugao-2509.08826","pid":"yugao","arxiv":"2509.08826","date":"2025-09-10","venue":"cs.CV","org":"ByteDance Seed","fields":["generative","rl","vision"],"tEn":"RewardDance: Reward Scaling in Visual Generation","tZh":"RewardDance：视觉生成中的奖励缩放","cites":54,"addedAt":"2026-07-02T05:39:25Z"},{"id":"wenhaiwang-2508.18265","pid":"wenhaiwang","arxiv":"2508.18265","date":"2025-08-25","venue":"cs.CV","org":"Shanghai AI Lab","fields":["vision","efficiency"],"tEn":"InternVL3.5: Advancing Open-Source Multimodal Models in Versatility, Reasoning, and Efficiency","tZh":"InternVL3.5：推动开源多模态模型在通用性、推理能力和效率上的进步","cites":989,"addedAt":"2026-06-30T17:52:48Z"},{"id":"akhiadbercovich-2508.14444","pid":"akhiadbercovich","arxiv":"2508.14444","date":"2025-08-20","venue":"cs.CL","fields":["efficiency","nlp"],"tEn":"NVIDIA Nemotron Nano 2: An Accurate and Efficient Hybrid Mamba-Transformer Reasoning Model","tZh":"NVIDIA Nemotron Nano 2：一种准确高效、基于 Mamba-Transformer 混合架构的推理模型","addedAt":"2026-07-30T16:23:37Z","cites":68},{"id":"shiyinlu-2508.11737","pid":"shiyinlu","arxiv":"2508.11737","date":"2025-08-15","venue":"cs.CV","org":"Alibaba","fields":["vision","nlp"],"tEn":"Ovis2.5 Technical Report","tZh":"Ovis2.5 技术报告","cites":78,"addedAt":"2026-06-30T17:52:48Z"},{"id":"jietang-2508.06471","pid":"jietang","arxiv":"2508.06471","date":"2025-08-08","venue":"cs.CL","org":"Zhipu AI","fields":["nlp","rl"],"tEn":"GLM-4.5: Agentic, Reasoning, and Coding (ARC) Foundation Models","tZh":"GLM-4.5：面向智能体、推理与编码（ARC）的基础模型","cites":372,"addedAt":"2026-06-30T17:52:48Z"},{"id":"aqjiang-2509.25193","pid":"aqjiang","arxiv":"2509.25193","date":"2025-08-08","venue":"cs.SE","org":"Mistral AI","fields":["nlp","rl"],"tEn":"Devstral: Fine-tuning Language Models for Coding Agent Applications","tZh":"Devstral：面向编码智能体应用的语言模型微调","cites":13,"addedAt":"2026-06-30T17:52:48Z"},{"id":"junyanglin-2508.02324","pid":"junyanglin","arxiv":"2508.02324","date":"2025-08-04","venue":"cs.CV","fields":["generative","vision"],"tEn":"Qwen-Image Technical Report","tZh":"Qwen-Image 技术报告","addedAt":"2026-07-30T17:45:49Z","cites":796},{"id":"zhilinyang-2507.20534","pid":"zhilinyang","arxiv":"2507.20534","date":"2025-07-28","venue":"cs.LG","org":"Moonshot AI","fields":["nlp","deep-learning"],"tEn":"Kimi K2: Open Agentic Intelligence","tZh":"Kimi K2：开放智能体智能","cites":316,"addedAt":"2026-06-30T17:52:48Z"},{"id":"stepfun-2507.19427","pid":"stepfun","arxiv":"2507.19427","date":"2025-07-25","venue":"cs.LG","org":"StepFun","fields":["efficiency","nlp"],"tEn":"Step-3 is Large yet Affordable: Model-system Co-design for Cost-effective Decoding","tZh":"Step-3：大模型也能低成本——模型-系统协同设计实现经济高效解码","addedAt":"2026-06-30T17:52:48Z","cites":53},{"id":"junyanglin-2507.18071","pid":"junyanglin","arxiv":"2507.18071","date":"2025-07-24","venue":"cs.LG","org":"Alibaba Qwen","fields":["rl","nlp"],"tEn":"Group Sequence Policy Optimization","tZh":"组序列策略优化","cites":572,"addedAt":"2026-06-30T17:52:48Z"},{"id":"stepfun-2507.16632","pid":"stepfun","arxiv":"2507.16632","date":"2025-07-22","venue":"cs.CL","org":"StepFun","fields":["nlp","generative"],"tEn":"Step-Audio 2 Technical Report","tZh":"Step-Audio 2 技术报告","cites":109,"addedAt":"2026-06-30T17:52:48Z"},{"id":"xinghangli-2507.15493","pid":"xinghangli","arxiv":"2507.15493","date":"2025-07-21","venue":"cs.RO","org":"ByteDance Seed","fields":["rl","vision","robotics"],"tEn":"GR-3 Technical Report","tZh":"GR-3 技术报告","cites":102,"addedAt":"2026-06-30T17:52:48Z"},{"id":"shazeer-2507.06261","pid":"shazeer","arxiv":"2507.06261","date":"2025-07-07","venue":"cs.CL","fields":["nlp"],"tEn":"Gemini 2.5: Pushing the Frontier with Advanced Reasoning, Multimodality, Long Context, and Next Generation Agentic Capabilities","tZh":"Gemini 2.5：以先进推理、多模态、长上下文和下一代智能体能力突破前沿","addedAt":"2026-08-02T02:06:16Z","cites":3746},{"id":"xinlongwang-2507.02029","pid":"xinlongwang","arxiv":"2507.02029","date":"2025-07-02","venue":"cs.RO","fields":["vision","rl","robotics"],"tEn":"RoboBrain 2.0 Technical Report","tZh":"RoboBrain 2.0 技术报告","addedAt":"2026-07-31T01:05:53Z","cites":86},{"id":"jietang-2507.01006","pid":"jietang","arxiv":"2507.01006","date":"2025-07-01","venue":"cs.CV","org":"Zhipu AI","fields":["vision","rl"],"tEn":"GLM-4.5V and GLM-4.1V-Thinking: Towards Versatile Multimodal Reasoning with Scalable Reinforcement Learning","tZh":"GLM-4.5V 和 GLM-4.1V-Thinking：迈向具有可扩展强化学习的通用多模态推理","cites":290,"addedAt":"2026-06-30T17:52:48Z"},{"id":"anthropic-project-vend","pid":"anthropic","date":"2025-06-27","venue":"Anthropic Research","org":"Anthropic","fields":["safety"],"tEn":"Project Vend: Can Claude run a small shop? (And why does that matter?)","tZh":"Project Vend：Claude 能经营一家小店吗？（这为什么重要？）","srcUrl":"https://www.anthropic.com/research/project-vend-1","srcLabel":"Anthropic Research","addedAt":"2026-07-12T03:58:41Z"},{"id":"anthropic-agentic-misalignment","pid":"anthropic","date":"2025-06-20","venue":"Anthropic Research","org":"Anthropic","fields":["safety"],"tEn":"Agentic misalignment: How LLMs could be insider threats","tZh":"代理错位：LLM 如何成为内部威胁","srcUrl":"https://www.anthropic.com/research/agentic-misalignment","srcLabel":"Anthropic Research","addedAt":"2026-07-12T03:58:41Z"},{"id":"xingwusun-2506.16504","pid":"xingwusun","arxiv":"2506.16504","date":"2025-06-19","venue":"cs.CV","org":"Tencent Hunyuan","fields":["generative","vision"],"tEn":"Hunyuan3D 2.5: Towards High-Fidelity 3D Assets Generation with Ultimate Details","tZh":"Hunyuan3D 2.5：迈向具有极致细节的高保真 3D 资产生成","cites":97,"addedAt":"2026-06-30T17:52:48Z"},{"id":"rrombach-2506.15742","pid":"rrombach","arxiv":"2506.15742","date":"2025-06-17","venue":"cs.GR","org":"Black Forest Labs","fields":["generative","vision"],"tEn":"FLUX.1 Kontext: Flow Matching for In-Context Image Generation and Editing in Latent Space","tZh":"FLUX.1 Kontext：潜空间上下文图像生成与编辑的流匹配方法","cites":864,"addedAt":"2026-06-30T17:52:48Z"},{"id":"yanjunjie-2506.13585","pid":"yanjunjie","arxiv":"2506.13585","date":"2025-06-16","venue":"cs.CL","org":"MiniMax","fields":["efficiency","rl"],"tEn":"MiniMax-M1: Scaling Test-Time Compute Efficiently with Lightning Attention","tZh":"MiniMax-M1：利用闪电注意力高效扩展测试时计算","cites":185,"addedAt":"2026-06-30T17:52:48Z"},{"id":"anthropic-multi-agent-research-system","pid":"anthropic","date":"2025-06-13","venue":"Anthropic Engineering","org":"Anthropic","fields":["nlp"],"tEn":"How we built our multi-agent research system","tZh":"我们如何构建多智能体研究系统","srcUrl":"https://www.anthropic.com/engineering/built-multi-agent-research-system","srcLabel":"Anthropic Engineering","addedAt":"2026-07-12T03:58:41Z"},{"id":"aqjiang-2506.10910","pid":"aqjiang","arxiv":"2506.10910","date":"2025-06-12","venue":"cs.CL","org":"Mistral AI","fields":["rl","nlp"],"tEn":"Magistral","tZh":"Magistral：Mistral 的首个推理模型与可扩展强化学习管线","cites":31,"addedAt":"2026-06-30T17:52:48Z"},{"id":"yugao-2506.09113","pid":"yugao","arxiv":"2506.09113","date":"2025-06-10","venue":"cs.CV","org":"ByteDance Seed","fields":["generative","vision"],"tEn":"Seedance 1.0: Exploring the Boundaries of Video Generation Models","tZh":"Seedance 1.0：探索视频生成模型的边界","cites":223,"addedAt":"2026-06-30T17:52:48Z"},{"id":"sam-gentle-singularity","pid":"sam","date":"2025-06-10","venue":"Sam Altman Blog","org":"OpenAI","fields":["nlp"],"tEn":"The Gentle Singularity","tZh":"温柔的奇点","srcUrl":"https://blog.samaltman.com/the-gentle-singularity","srcLabel":"Sam Altman Blog","addedAt":"2026-07-12T08:44:26Z"},{"id":"minicpm-2506.07900","pid":"minicpm","arxiv":"2506.07900","date":"2025-06-09","venue":"cs.CL","org":"OpenBMB","fields":["efficiency","nlp"],"tEn":"MiniCPM4: Ultra-Efficient LLMs on End Devices","tZh":"MiniCPM4：面向终端设备的超高效大语言模型","cites":44,"addedAt":"2026-06-30T17:52:48Z"},{"id":"bihuo-2506.05767","pid":"bihuo","arxiv":"2506.05767","date":"2025-06-06","venue":"cs.CL","org":"Xiaohongshu","fields":["nlp","efficiency"],"tEn":"dots.llm1 Technical Report","tZh":"dots.llm1 技术报告","cites":3,"addedAt":"2026-06-30T17:52:48Z"},{"id":"xiaomimimo-2506.03569","pid":"xiaomimimo","arxiv":"2506.03569","date":"2025-06-04","venue":"cs.CL","org":"Xiaomi","fields":["vision","nlp"],"tEn":"MiMo-VL Technical Report","tZh":"MiMo-VL 技术报告","cites":39,"addedAt":"2026-06-30T17:52:48Z"},{"id":"dwarkeshpatel-agi-timelines-june-2025","pid":"dwarkeshpatel","date":"2025-06-02","venue":"Dwarkesh Blog","org":"","fields":["nlp"],"tEn":"Why I don't think AGI is right around the corner","tZh":"为什么我认为 AGI 不会很快到来","srcUrl":"https://www.dwarkesh.com/p/timelines-june-2025","srcLabel":"Dwarkesh Blog","addedAt":"2026-07-19T09:25:48Z"},{"id":"mingjieliu-2505.24864","pid":"mingjieliu","arxiv":"2505.24864","date":"2025-05-30","venue":"cs.CL","org":"NVIDIA","fields":["rl","nlp"],"tEn":"ProRL: Prolonged Reinforcement Learning Expands Reasoning Boundaries in Large Language Models","tZh":"ProRL：延长强化学习扩展大语言模型的推理边界","cites":149,"addedAt":"2026-06-30T17:52:48Z"},{"id":"jujiehe-2505.22312","pid":"jujiehe","arxiv":"2505.22312","date":"2025-05-28","venue":"cs.LG","org":"Skywork AI","fields":["rl","nlp"],"tEn":"Skywork Open Reasoner 1 Technical Report","tZh":"Skywork Open Reasoner 1 技术报告","cites":114,"addedAt":"2026-06-30T17:52:48Z"},{"id":"zhihaodu-2505.17589","pid":"zhihaodu","arxiv":"2505.17589","date":"2025-05-23","venue":"cs.SD","org":"Alibaba","fields":["generative","nlp"],"tEn":"CosyVoice 3: Towards In-the-wild Speech Generation via Scaling-up and Post-training","tZh":"CosyVoice 3：通过规模扩展和后训练实现野外语音生成","cites":164,"addedAt":"2026-06-30T17:52:48Z"},{"id":"xingwusun-2505.15431","pid":"xingwusun","arxiv":"2505.15431","date":"2025-05-21","venue":"cs.CL","org":"Tencent Hunyuan","fields":["nlp","deep-learning","efficiency"],"tEn":"Hunyuan-TurboS: Advancing Large Language Models through Mamba-Transformer Synergy and Adaptive Chain-of-Thought","tZh":"Hunyuan-TurboS：通过 Mamba-Transformer 协同与自适应思维链推进大语言模型","cites":24,"addedAt":"2026-07-02T05:39:25Z"},{"id":"chaoruideng-2505.14683","pid":"chaoruideng","arxiv":"2505.14683","date":"2025-05-20","venue":"cs.CV","org":"ByteDance Seed","fields":["vision","generative"],"tEn":"Emerging Properties in Unified Multimodal Pretraining","tZh":"统一多模态预训练中的涌现特性","cites":727,"addedAt":"2026-06-30T17:52:48Z"},{"id":"anyang-2505.09388","pid":"anyang","arxiv":"2505.09388","date":"2025-05-14","venue":"cs.CL","org":"Alibaba Qwen","fields":["nlp","deep-learning"],"tEn":"Qwen3 Technical Report","tZh":"Qwen3 技术报告","cites":6307,"addedAt":"2026-06-30T17:52:48Z"},{"id":"junnanli-2505.09568","pid":"junnanli","arxiv":"2505.09568","date":"2025-05-14","venue":"cs.CV","org":"Salesforce","fields":["vision","generative"],"tEn":"BLIP3-o: A Family of Fully Open Unified Multimodal Models-Architecture, Training and Dataset","tZh":"BLIP3-o：全开放统一多模态模型家族——架构、训练与数据集","cites":322,"addedAt":"2026-06-30T17:52:48Z"},{"id":"deepmind-alphaevolve","pid":"deepmind","date":"2025-05-14","venue":"DeepMind Blog","org":"Google DeepMind","fields":["deep-learning"],"tEn":"AlphaEvolve: A Gemini-powered coding agent for designing advanced algorithms — Google DeepMind","tZh":"AlphaEvolve：由 Gemini 驱动的编码代理，用于设计高级算法——Google DeepMind","srcUrl":"https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/","srcLabel":"DeepMind Blog","addedAt":"2026-07-12T03:58:41Z"},{"id":"yugao-2505.07818","pid":"yugao","arxiv":"2505.07818","date":"2025-05-12","venue":"cs.CV","org":"ByteDance Seed","fields":["generative","rl","vision"],"tEn":"DanceGRPO: Unleashing GRPO on Visual Generation","tZh":"DanceGRPO：在视觉生成中释放 GRPO 的潜力","cites":323,"addedAt":"2026-07-02T05:39:25Z"},{"id":"junyanglin-2505.06708","pid":"junyanglin","arxiv":"2505.06708","date":"2025-05-10","venue":"cs.CL","org":"Qwen Team, Alibaba","fields":["deep-learning","efficiency","nlp"],"tEn":"Gated Attention for Large Language Models: Non-linearity, Sparsity, and Attention-Sink-Free","tZh":"大型语言模型的门控注意力：非线性、稀疏性与无注意力汇聚","cites":224,"addedAt":"2026-07-02T05:39:25Z"},{"id":"ybai-2505.05410","pid":"ybai","arxiv":"2505.05410","date":"2025-05-08","venue":"cs.CL","org":"Anthropic","fields":["safety","nlp"],"tEn":"Reasoning Models Don't Always Say What They Think","tZh":"推理模型并不总是说出它们的想法","cites":344,"addedAt":"2026-06-30T17:52:48Z"},{"id":"andrewzhao-2505.03335","pid":"andrewzhao","arxiv":"2505.03335","date":"2025-05-06","venue":"cs.LG","org":"Tsinghua University","fields":["rl","nlp"],"tEn":"Absolute Zero: Reinforced Self-play Reasoning with Zero Data","tZh":"绝对零度：零数据下的自我对弈推理","cites":268,"addedAt":"2026-06-30T17:52:48Z"},{"id":"akhiadbercovich-2505.00949","pid":"akhiadbercovich","arxiv":"2505.00949","date":"2025-05-02","venue":"cs.CL","org":"NVIDIA","fields":["nlp","efficiency"],"tEn":"Llama-Nemotron: Efficient Reasoning Models","tZh":"Llama-Nemotron：高效推理模型","cites":86,"addedAt":"2026-06-30T17:52:48Z"},{"id":"lilianweng-why-we-think","pid":"lilianweng","date":"2025-05-01","venue":"Lil'Log","org":"Thinking Machines Lab","fields":["nlp","rl"],"tEn":"Why We Think","tZh":"我们为何思考","srcUrl":"https://lilianweng.github.io/posts/2025-05-01-thinking/","srcLabel":"Lil'Log","addedAt":"2026-07-19T04:13:43Z"},{"id":"deepseek-2504.21801","pid":"deepseek","arxiv":"2504.21801","date":"2025-04-30","venue":"cs.CL","org":"DeepSeek","fields":["nlp","rl"],"tEn":"DeepSeek-Prover-V2: Advancing Formal Mathematical Reasoning via Reinforcement Learning for Subgoal Decomposition","tZh":"DeepSeek-Prover-V2：通过强化学习进行子目标分解推进形式化数学推理","cites":235,"addedAt":"2026-07-01T02:42:13Z"},{"id":"sebastienbubeck-2504.21318","pid":"sebastienbubeck","arxiv":"2504.21318","date":"2025-04-30","venue":"cs.AI","fields":["nlp","rl"],"tEn":"Phi-4-reasoning Technical Report","tZh":"Phi-4-reasoning 技术报告","addedAt":"2026-07-30T19:11:43Z","cites":109},{"id":"zhilinyang-2504.18425","pid":"zhilinyang","arxiv":"2504.18425","date":"2025-04-25","venue":"eess.AS","org":"Moonshot AI","fields":["nlp","generative"],"tEn":"Kimi-Audio Technical Report","tZh":"Kimi-Audio 技术报告","cites":210,"addedAt":"2026-06-30T17:52:48Z"},{"id":"kblack-2504.16054","pid":"kblack","arxiv":"2504.16054","date":"2025-04-22","venue":"cs.LG","org":"Physical Intelligence","fields":["rl","vision","robotics"],"tEn":"$π_{0.5}$: a Vision-Language-Action Model with Open-World Generalization","tZh":"$π_{0.5}$：一个具有开放世界泛化能力的视觉-语言-动作模型","cites":1288,"addedAt":"2026-06-30T17:52:48Z"},{"id":"aarongrattafiori-2504.18575","pid":"aarongrattafiori","arxiv":"2504.18575","date":"2025-04-22","venue":"cs.CR","fields":["safety","nlp"],"tEn":"WASP: Benchmarking Web Agent Security Against Prompt Injection Attacks","tZh":"WASP：针对提示注入攻击的网络智能体安全基准测试","addedAt":"2026-07-30T16:21:07Z","cites":107},{"id":"gaohuang-2504.13837","pid":"gaohuang","arxiv":"2504.13837","date":"2025-04-18","venue":"cs.AI","org":"Tsinghua University","fields":["rl","nlp"],"tEn":"Does Reinforcement Learning Really Incentivize Reasoning Capacity in LLMs Beyond the Base Model?","tZh":"强化学习真的能激发大模型超越基座的推理能力吗？","cites":886,"addedAt":"2026-06-30T17:52:48Z"},{"id":"anthropic-claude-code-best-practices","pid":"anthropic","date":"2025-04-18","venue":"Anthropic Engineering","org":"Anthropic","fields":["nlp"],"tEn":"Best practices for Claude Code - Claude Code Docs","tZh":"Claude Code 最佳实践 - Claude Code 文档","srcUrl":"https://www.anthropic.com/engineering/claude-code-best-practices","srcLabel":"Anthropic Engineering","addedAt":"2026-07-12T03:58:41Z"},{"id":"yugao-2504.11346","pid":"yugao","arxiv":"2504.11346","date":"2025-04-15","venue":"cs.CV","org":"ByteDance Seed","fields":["generative","vision"],"tEn":"Seedream 3.0 Technical Report","tZh":"Seedream 3.0 技术报告","cites":134,"addedAt":"2026-06-30T17:52:48Z"},{"id":"wenhaiwang-2504.10479","pid":"wenhaiwang","arxiv":"2504.10479","date":"2025-04-14","venue":"cs.CV","org":"Shanghai AI Lab","fields":["vision","nlp"],"tEn":"InternVL3: Exploring Advanced Training and Test-Time Recipes for Open-Source Multimodal Models","tZh":"InternVL3：探索开源多模态模型的高级训练与测试时策略","cites":1486,"addedAt":"2026-06-30T17:52:48Z"},{"id":"qiyingyu-2504.13914","pid":"qiyingyu","arxiv":"2504.13914","date":"2025-04-10","venue":"cs.CL","org":"ByteDance Seed","fields":["rl","nlp"],"tEn":"Seed1.5-Thinking: Advancing Superb Reasoning Models with Reinforcement Learning","tZh":"Seed1.5-Thinking：通过强化学习推进卓越推理模型","cites":133,"addedAt":"2026-06-30T17:52:48Z"},{"id":"zhilinyang-2504.07491","pid":"zhilinyang","arxiv":"2504.07491","date":"2025-04-10","venue":"cs.CV","org":"Moonshot AI","fields":["vision","nlp"],"tEn":"Kimi-VL Technical Report","tZh":"Kimi-VL 技术报告","cites":292,"addedAt":"2026-06-30T17:52:48Z"},{"id":"kokotajlo-ai-2027","pid":"kokotajlo","date":"2025-04-03","venue":"AI 2027","org":"AI Futures Project","fields":["safety","nlp"],"tEn":"AI 2027","tZh":"AI 2027","srcUrl":"https://ai-2027.com/","srcLabel":"AI 2027","addedAt":"2026-07-19T09:25:48Z"},{"id":"arvindnarayanan-ai-as-normal-technology","pid":"arvindnarayanan","date":"2025-04-01","venue":"Knight First Amendment Institute","org":"Princeton","fields":["safety","nlp"],"tEn":"AI as Normal Technology","tZh":"AI 作为正常技术","srcUrl":"https://knightcolumbia.org/content/ai-as-normal-technology","srcLabel":"Knight First Amendment Institute","addedAt":"2026-07-19T09:25:48Z"},{"id":"dario-urgency-of-interpretability","pid":"dario","date":"2025-04-01","venue":"Dario Amodei Essay","org":"Anthropic","fields":["safety"],"tEn":"The Urgency of Interpretability","tZh":"Dario Amodei — 可解释性的紧迫性","srcUrl":"https://darioamodei.com/post/the-urgency-of-interpretability","srcLabel":"Dario Amodei Essay","addedAt":"2026-07-12T06:55:56Z"},{"id":"shunyuyao-the-second-half","pid":"shunyuyao","date":"2025-04-01","venue":"Shunyu Yao Blog","org":"OpenAI","fields":["nlp","rl"],"tEn":"The Second Half","tZh":"下半场","srcUrl":"https://ysymyth.github.io/The-Second-Half/","srcLabel":"Shunyu Yao Blog","addedAt":"2026-07-19T09:25:48Z"},{"id":"sarahooker-2504.00698","pid":"sarahooker","arxiv":"2504.00698","date":"2025-04-01","venue":"cs.CL","fields":["nlp","efficiency"],"tEn":"Command A: An Enterprise-Ready Large Language Model","tZh":"Command A：一款面向企业的商用级大语言模型","addedAt":"2026-07-31T07:25:35Z","cites":57},{"id":"xingwusun-2503.24067","pid":"xingwusun","arxiv":"2503.24067","date":"2025-03-31","venue":"cs.LG","org":"Tencent Hunyuan","fields":["nlp","deep-learning","efficiency"],"tEn":"TransMamba: A Sequence-Level Hybrid Transformer-Mamba Language Model","tZh":"TransMamba：一种序列级混合 Transformer-Mamba 语言模型","cites":3,"addedAt":"2026-07-02T05:39:25Z"},{"id":"anthropic-tracing-thoughts","pid":"anthropic","date":"2025-03-27","venue":"Anthropic Research","org":"Anthropic","fields":["safety"],"tEn":"Tracing the thoughts of a large language model","tZh":"追踪大型语言模型的思维","srcUrl":"https://www.anthropic.com/research/tracing-thoughts-language-model","srcLabel":"Anthropic Research","addedAt":"2026-07-09T09:24:35Z"},{"id":"junyanglin-2503.20215","pid":"junyanglin","arxiv":"2503.20215","date":"2025-03-26","venue":"cs.CL","fields":["vision","nlp"],"tEn":"Qwen2.5-Omni Technical Report","tZh":"Qwen2.5-Omni 技术报告","addedAt":"2026-07-30T18:36:50Z","cites":669},{"id":"wanteam-2503.20314","pid":"wanteam","arxiv":"2503.20314","date":"2025-03-26","venue":"cs.CV","fields":["generative","vision"],"tEn":"Wan: Open and Advanced Large-Scale Video Generative Models","tZh":"Wan：开放且先进的大规模视频生成模型","addedAt":"2026-07-31T03:01:25Z","cites":2243},{"id":"thomasmesnard-2503.19786","pid":"thomasmesnard","arxiv":"2503.19786","date":"2025-03-25","venue":"cs.CL","org":"Google DeepMind","fields":["nlp","vision"],"tEn":"Gemma 3 Technical Report","tZh":"Gemma 3 技术报告","cites":1549,"addedAt":"2026-06-30T17:52:48Z"},{"id":"qiyingyu-2503.14476","pid":"qiyingyu","arxiv":"2503.14476","date":"2025-03-18","venue":"cs.LG","org":"ByteDance Seed","fields":["rl","nlp"],"tEn":"DAPO: An Open-Source LLM Reinforcement Learning System at Scale","tZh":"DAPO：一个开源的大规模 LLM 强化学习系统","cites":2144,"addedAt":"2026-06-30T17:52:48Z"},{"id":"jimfan-2503.14734","pid":"jimfan","arxiv":"2503.14734","date":"2025-03-18","venue":"cs.RO","org":"NVIDIA","fields":["rl","vision","robotics"],"tEn":"GR00T N1: An Open Foundation Model for Generalist Humanoid Robots","tZh":"GR00T N1：面向通用人形机器人的开放基础模型","cites":1007,"addedAt":"2026-06-30T17:52:48Z"},{"id":"bowenjin-2503.09516","pid":"bowenjin","arxiv":"2503.09516","date":"2025-03-12","venue":"cs.CL","org":"UIUC","fields":["rl","nlp"],"tEn":"Search-R1: Training LLMs to Reason and Leverage Search Engines with Reinforcement Learning","tZh":"Search-R1：通过强化学习训练大语言模型进行推理并利用搜索引擎","cites":1177,"addedAt":"2026-06-30T17:52:48Z"},{"id":"antling-2503.05139","pid":"antling","arxiv":"2503.05139","date":"2025-03-07","venue":"cs.LG","org":"Ant Group","fields":["efficiency","nlp"],"tEn":"Every FLOP Counts: Scaling a 300B Mixture-of-Experts LING LLM without Premium GPUs","tZh":"每一份算力都至关重要：在没有高端 GPU 的情况下扩展一个 300B 参数的混合专家 LING 大语言模型","cites":20,"addedAt":"2026-06-30T17:52:48Z"},{"id":"sebastienbubeck-2503.01743","pid":"sebastienbubeck","arxiv":"2503.01743","date":"2025-03-03","venue":"cs.CL","org":"Microsoft","fields":["nlp","efficiency"],"tEn":"Phi-4-Mini Technical Report: Compact yet Powerful Multimodal Language Models via Mixture-of-LoRAs","tZh":"Phi-4-Mini 技术报告：通过混合 LoRA 实现紧凑而强大的多模态语言模型","cites":484,"addedAt":"2026-06-30T17:52:48Z"},{"id":"steveyegge-revenge-of-the-junior-developer","pid":"steveyegge","date":"2025-03-01","venue":"Steve Yegge","org":"Sourcegraph","fields":["nlp"],"tEn":"Revenge of the junior developer","tZh":"初级开发者的复仇","srcUrl":"https://sourcegraph.com/blog/revenge-of-the-junior-developer","srcLabel":"Steve Yegge","addedAt":"2026-07-19T09:25:48Z"},{"id":"xinlongwang-2502.21257","pid":"xinlongwang","arxiv":"2502.21257","date":"2025-02-28","venue":"cs.RO","org":"BAAI","fields":["vision","rl","robotics"],"tEn":"RoboBrain: A Unified Brain Model for Robotic Manipulation from Abstract to Concrete","tZh":"RoboBrain：从抽象到具体的机器人操作统一大脑模型","cites":163,"addedAt":"2026-06-30T17:52:48Z"},{"id":"demis-2502.18864","pid":"demis","arxiv":"2502.18864","date":"2025-02-26","venue":"cs.AI","org":"Google DeepMind","fields":["nlp"],"tEn":"Accelerating scientific discovery with Co-Scientist","tZh":"加速科学发现：Co-Scientist 系统","cites":342,"addedAt":"2026-07-02T16:35:31Z"},{"id":"junyanglin-2502.13923","pid":"junyanglin","arxiv":"2502.13923","date":"2025-02-19","venue":"cs.CV","fields":["vision","nlp"],"tEn":"Qwen2.5-VL Technical Report","tZh":"Qwen2.5-VL 技术报告","addedAt":"2026-07-30T18:34:32Z","cites":5118},{"id":"zhilinyang-2502.13189","pid":"zhilinyang","arxiv":"2502.13189","date":"2025-02-18","venue":"cs.LG","org":"Moonshot AI","fields":["efficiency","nlp"],"tEn":"MoBA: Mixture of Block Attention for Long-Context LLMs","tZh":"MoBA：面向长上下文大语言模型的混合块注意力机制","cites":165,"addedAt":"2026-06-30T17:52:48Z"},{"id":"stepfun-2502.11946","pid":"stepfun","arxiv":"2502.11946","date":"2025-02-17","venue":"cs.CL","org":"StepFun","fields":["nlp","generative"],"tEn":"Step-Audio: Unified Understanding and Generation in Intelligent Speech Interaction","tZh":"Step-Audio：智能语音交互中的统一理解与生成","cites":115,"addedAt":"2026-06-30T17:52:48Z"},{"id":"deepseek-2502.11089","pid":"deepseek","arxiv":"2502.11089","date":"2025-02-16","venue":"cs.CL","org":"DeepSeek","fields":["efficiency","nlp"],"tEn":"Native Sparse Attention: Hardware-Aligned and Natively Trainable Sparse Attention","tZh":"原生稀疏注意力：硬件对齐且可原生训练的稀疏注意力机制","cites":402,"addedAt":"2026-06-30T17:52:48Z"},{"id":"thariq-sorting","pid":"thariq","date":"2025-02-11","venue":"Blog","org":"Anthropic","fields":["nlp"],"tEn":"LLM-Powered Sorting with TrueSkill","tZh":"基于 TrueSkill 的 LLM 排序","srcUrl":"https://thariq.io/blog/sorting/","srcLabel":"Blog","addedAt":"2026-07-25T14:03:47Z"},{"id":"sebastianraschka-understanding-reasoning-llms","pid":"sebastianraschka","date":"2025-02-05","venue":"Research","org":"","fields":["nlp","deep-learning"],"tEn":"Understanding Reasoning LLMs","tZh":"理解推理型大语言模型","srcUrl":"https://magazine.sebastianraschka.com/p/understanding-reasoning-llms","srcLabel":"Article","addedAt":"2026-08-02T07:26:57Z"},{"id":"loubna-2502.02737","pid":"loubna","arxiv":"2502.02737","date":"2025-02-04","venue":"cs.CL","org":"Hugging Face","fields":["nlp","efficiency"],"tEn":"SmolLM2: When Smol Goes Big -- Data-Centric Training of a Small Language Model","tZh":"SmolLM2：小模型大作为——以数据为中心的小型语言模型训练","cites":282,"addedAt":"2026-06-30T17:52:48Z"},{"id":"openai-deep-research","pid":"openai","date":"2025-02-02","venue":"OpenAI","org":"OpenAI","fields":["nlp"],"tEn":"Introducing deep research","tZh":"深度研究功能介绍","srcUrl":"https://openai.com/index/introducing-deep-research/","srcLabel":"OpenAI","addedAt":"2026-07-12T03:58:41Z"},{"id":"sam-three-observations","pid":"sam","date":"2025-02-01","venue":"Sam Altman Blog","org":"OpenAI","fields":["nlp"],"tEn":"Three Observations","tZh":"三个观察","srcUrl":"https://blog.samaltman.com/three-observations","srcLabel":"Sam Altman Blog","addedAt":"2026-07-12T08:44:26Z"},{"id":"deepseek-2501.17811","pid":"deepseek","arxiv":"2501.17811","date":"2025-01-29","venue":"cs.AI","org":"DeepSeek","fields":["vision","generative"],"tEn":"Janus-Pro: Unified Multimodal Understanding and Generation with Data and Model Scaling","tZh":"Janus-Pro：通过数据和模型扩展实现统一的多模态理解与生成","cites":775,"addedAt":"2026-07-01T02:42:13Z"},{"id":"anyang-2501.15383","pid":"anyang","arxiv":"2501.15383","date":"2025-01-26","venue":"cs.CL","fields":["nlp","efficiency","deep-learning"],"tEn":"Qwen2.5-1M Technical Report","tZh":"Qwen2.5-1M 技术报告","addedAt":"2026-07-30T16:38:47Z","cites":179},{"id":"openai-computer-using-agent","pid":"openai","date":"2025-01-23","venue":"OpenAI Research","org":"OpenAI","fields":["nlp"],"tEn":"Computer-Using Agent","tZh":"计算机使用代理","srcUrl":"https://openai.com/index/computer-using-agent/","srcLabel":"OpenAI Research","addedAt":"2026-07-12T03:58:41Z"},{"id":"dayaguo-2501.12948","pid":"dayaguo","arxiv":"2501.12948","date":"2025-01-22","venue":"cs.CL","org":"DeepSeek","fields":["nlp","rl"],"tEn":"DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning","tZh":"DeepSeek-R1：通过强化学习激励大语言模型的推理能力","cites":5417,"addedAt":"2026-06-28T17:10:59Z"},{"id":"zhilinyang-2501.12599","pid":"zhilinyang","arxiv":"2501.12599","date":"2025-01-22","venue":"cs.AI","org":"Moonshot AI","fields":["nlp","rl"],"tEn":"Kimi k1.5: Scaling Reinforcement Learning with LLMs","tZh":"Kimi k1.5：通过强化学习扩展大语言模型","cites":992,"addedAt":"2026-06-29T15:38:26Z"},{"id":"nathanlambert-deepseek-r1-recipe","pid":"nathanlambert","date":"2025-01-21","venue":"Interconnects","org":"Allen Institute for AI","fields":["nlp","rl"],"tEn":"DeepSeek R1's recipe to replicate o1","tZh":"DeepSeek R1 复制 o1 的秘诀","srcUrl":"https://www.interconnects.ai/p/deepseek-r1-recipe-for-o1","srcLabel":"Interconnects","addedAt":"2026-07-19T09:25:48Z"},{"id":"yanjunjie-2501.08313","pid":"yanjunjie","arxiv":"2501.08313","date":"2025-01-14","venue":"cs.CL","fields":["nlp","efficiency"],"tEn":"MiniMax-01: Scaling Foundation Models with Lightning Attention","tZh":"MiniMax-01：利用闪电注意力扩展基础模型","addedAt":"2026-08-01T14:21:27Z"},{"id":"chiphuyen-agents","pid":"chiphuyen","date":"2025-01-07","venue":"Chip Huyen Blog","org":"","fields":["nlp"],"tEn":"Agents","tZh":"智能体","srcUrl":"https://huyenchip.com/2025/01/07/agents.html","srcLabel":"Chip Huyen Blog","addedAt":"2026-07-19T09:25:48Z"},{"id":"sam-reflections","pid":"sam","date":"2025-01-06","venue":"Sam Altman Essay","org":"OpenAI","fields":["nlp"],"tEn":"Reflections","tZh":"反思","srcUrl":"https://blog.samaltman.com/reflections","srcLabel":"Sam Altman Essay","addedAt":"2026-07-12T08:44:26Z"},{"id":"xingwusun-2501.02423","pid":"xingwusun","arxiv":"2501.02423","date":"2025-01-05","venue":"cs.LG","org":"Tencent Hunyuan","fields":["efficiency","deep-learning"],"tEn":"Scaling Laws for Floating Point Quantization Training","tZh":"浮点量化训练的缩放定律","cites":7,"addedAt":"2026-07-02T05:39:25Z"},{"id":"nathanlambert-lessons-from-the-hacks","pid":"nathanlambert","date":"2026-08-09","venue":"Interconnects","org":"Interconnects","fields":["safety"],"tEn":"Lessons from the hacks - by Nathan Lambert","tZh":"黑客攻击的教训 - 作者：Nathan Lambert","sEn":"Current incentives in tech and government are ill-suited for rapid AI transitions, requiring transparency and open models for preparedness.","sZh":"当前科技公司和政府的激励机制不适合快速 AI 转型，需要透明度和开放模型来做好准备。","srcUrl":"https://www.interconnects.ai/p/lessons-from-the-hacks","srcLabel":"Interconnects","addedAt":"2026-08-12T03:36:41Z"},{"id":"wenfengliang-2412.19437","pid":"wenfengliang","arxiv":"2412.19437","date":"2024-12-27","venue":"cs.CL","org":"DeepSeek","fields":["nlp","efficiency"],"tEn":"DeepSeek-V3 Technical Report","tZh":"DeepSeek-V3 技术报告","cites":0,"addedAt":"2026-06-28T17:10:59Z"},{"id":"junnanli-2412.16256","pid":"junnanli","arxiv":"2412.16256","date":"2024-12-20","venue":"cs.HC","org":"Rhymes AI / University of Hong Kong","fields":["vision","deep-learning"],"tEn":"Aria-UI: Visual Grounding for GUI Instructions","tZh":"Aria-UI：面向 GUI 指令的视觉定位","cites":133,"addedAt":"2026-07-02T05:39:25Z"},{"id":"openai-deliberative-alignment","pid":"openai","date":"2024-12-20","venue":"OpenAI Research","org":"OpenAI","fields":["safety"],"tEn":"Deliberative alignment: reasoning enables safer language models","tZh":"审慎对齐：推理能力使语言模型更安全","srcUrl":"https://openai.com/index/deliberative-alignment/","srcLabel":"OpenAI Research","addedAt":"2026-07-09T08:45:21Z"},{"id":"anthropic-building-effective-agents","pid":"anthropic","date":"2024-12-19","venue":"Anthropic Engineering","org":"Anthropic","fields":["nlp"],"tEn":"Building Effective AI Agents","tZh":"构建有效的 AI 代理","srcUrl":"https://www.anthropic.com/engineering/building-effective-agents","srcLabel":"Anthropic Engineering","addedAt":"2026-07-09T08:45:21Z"},{"id":"anyang-2412.15115","pid":"anyang","arxiv":"2412.15115","date":"2024-12-19","venue":"cs.CL","fields":["nlp","deep-learning"],"tEn":"Qwen2.5 Technical Report","tZh":"Qwen2.5 技术报告","addedAt":"2026-07-30T16:35:40Z","cites":4372},{"id":"anthropic-alignment-faking","pid":"anthropic","date":"2024-12-18","venue":"Anthropic Research","org":"Anthropic","fields":["safety"],"tEn":"Alignment faking in large language models","tZh":"大型语言模型中的对齐伪装","srcUrl":"https://www.anthropic.com/research/alignment-faking","srcLabel":"Anthropic Research","addedAt":"2026-07-09T08:45:21Z"},{"id":"deepseek-2412.10302","pid":"deepseek","arxiv":"2412.10302","date":"2024-12-13","venue":"cs.CV","org":"DeepSeek","fields":["vision","nlp"],"tEn":"DeepSeek-VL2: Mixture-of-Experts Vision-Language Models for Advanced Multimodal Understanding","tZh":"DeepSeek-VL2：用于高级多模态理解的混合专家视觉语言模型","cites":599,"addedAt":"2026-07-01T02:42:13Z"},{"id":"songhan-2412.04468","pid":"songhan","arxiv":"2412.04468","date":"2024-12-05","venue":"cs.CV","org":"NVIDIA / MIT","fields":["vision","efficiency"],"tEn":"NVILA: Efficient Frontier Visual Language Models","tZh":"NVILA：高效前沿视觉语言模型","cites":222,"addedAt":"2026-06-29T15:38:26Z"},{"id":"deepseek-2411.07975","pid":"deepseek","arxiv":"2411.07975","date":"2024-11-12","venue":"cs.CV","org":"DeepSeek","fields":["vision","generative"],"tEn":"JanusFlow: Harmonizing Autoregression and Rectified Flow for Unified Multimodal Understanding and Generation","tZh":"JanusFlow：融合自回归与整流流实现统一多模态理解与生成","cites":148,"addedAt":"2026-07-01T02:42:13Z"},{"id":"songhan-2411.05007","pid":"songhan","arxiv":"2411.05007","date":"2024-11-07","venue":"cs.CV","org":"MIT","fields":["efficiency","generative","vision"],"tEn":"SVDQuant: Absorbing Outliers by Low-Rank Components for 4-Bit Diffusion Models","tZh":"SVDQuant：通过低秩组件吸收异常值实现 4 比特扩散模型","cites":148,"addedAt":"2026-07-02T05:39:25Z"},{"id":"xingwusun-2411.02265","pid":"xingwusun","arxiv":"2411.02265","date":"2024-11-04","venue":"cs.CL","org":"Tencent","fields":["nlp","deep-learning"],"tEn":"Hunyuan-Large: An Open-Source MoE Model with 52 Billion Activated Parameters by Tencent","tZh":"Hunyuan-Large：腾讯开源 MoE 模型，520 亿激活参数","cites":99,"addedAt":"2026-06-29T15:38:26Z"},{"id":"thariq-interpretability","pid":"thariq","date":"2024-11-04","venue":"Blog","org":"Anthropic","fields":["safety","nlp"],"tEn":"Should Developers Care about Interpretability?","tZh":"开发者应该关心可解释性吗？","srcUrl":"https://thariq.io/blog/interpretability/","srcLabel":"Blog","addedAt":"2026-07-25T14:03:47Z"},{"id":"kblack-2410.24164","pid":"kblack","arxiv":"2410.24164","date":"2024-10-31","venue":"cs.LG","org":"Physical Intelligence","fields":["generative","vision","robotics"],"tEn":"$π_0$: A Vision-Language-Action Flow Model for General Robot Control","tZh":"$π_0$: 面向通用机器人控制的视觉-语言-动作流模型","cites":2092,"addedAt":"2026-06-29T07:10:23Z"},{"id":"anthropic-sabotage-evaluations","pid":"anthropic","date":"2024-10-18","venue":"Anthropic Research","org":"Anthropic","fields":["safety"],"tEn":"Sabotage evaluations for frontier models","tZh":"前沿模型的破坏性评估","srcUrl":"https://www.anthropic.com/research/sabotage-evaluations","srcLabel":"Anthropic Research","addedAt":"2026-07-11T02:54:52Z"},{"id":"pingluo-2410.13848","pid":"pingluo","arxiv":"2410.13848","date":"2024-10-17","venue":"cs.CV","org":"DeepSeek","fields":["vision","generative"],"tEn":"Janus: Decoupling Visual Encoding for Unified Multimodal Understanding and Generation","tZh":"Janus：解耦视觉编码以实现统一的多模态理解与生成","cites":429,"addedAt":"2026-06-29T15:38:26Z"},{"id":"songhan-2410.10733","pid":"songhan","arxiv":"2410.10733","date":"2024-10-14","venue":"cs.CV","org":"MIT","fields":["efficiency","generative","vision"],"tEn":"Deep Compression Autoencoder for Efficient High-Resolution Diffusion Models","tZh":"深度压缩自编码器：面向高效高分辨率扩散模型","cites":201,"addedAt":"2026-07-02T05:39:25Z"},{"id":"dario-machines-of-loving-grace","pid":"dario","date":"2024-10-11","venue":"Dario Amodei Essay","org":"Anthropic","fields":["nlp","safety"],"tEn":"Machines of Loving Grace","tZh":"达里奥·阿莫代——爱的恩典机器","srcUrl":"https://darioamodei.com/essay/machines-of-loving-grace","srcLabel":"Dario Amodei Essay","addedAt":"2026-07-12T06:55:56Z"},{"id":"songyangliu-2410.07864","pid":"songyangliu","arxiv":"2410.07864","date":"2024-10-10","venue":"cs.RO","org":"Tsinghua University","fields":["generative","vision","robotics"],"tEn":"RDT-1B: a Diffusion Foundation Model for Bimanual Manipulation","tZh":"RDT-1B：面向双臂操作任务的扩散基础模型","cites":725,"addedAt":"2026-06-29T07:10:23Z"},{"id":"aqjiang-2410.07073","pid":"aqjiang","arxiv":"2410.07073","date":"2024-10-09","venue":"cs.CV","org":"Mistral AI","fields":["vision","nlp","generative","deep-learning"],"tEn":"Pixtral 12B","tZh":"Pixtral 12B：120 亿参数多模态语言模型","cites":157,"addedAt":"2026-07-02T05:39:25Z"},{"id":"junnanli-2410.05993","pid":"junnanli","arxiv":"2410.05993","date":"2024-10-08","venue":"cs.CV","org":"Rhymes AI","fields":["vision","generative","efficiency","deep-learning"],"tEn":"Aria: An Open Multimodal Native Mixture-of-Experts Model","tZh":"Aria：一个开放的多模态原生混合专家模型","cites":139,"addedAt":"2026-07-02T05:39:25Z"},{"id":"aarongrattafiori-2410.01606","pid":"aarongrattafiori","arxiv":"2410.01606","date":"2024-10-02","venue":"cs.LG","org":"Meta AI","fields":["safety","nlp"],"tEn":"Automated Red Teaming with GOAT: the Generative Offensive Agent Tester","tZh":"自动化红队测试：生成式对抗代理测试器（GOAT）","cites":43,"addedAt":"2026-07-02T05:39:25Z"},{"id":"xinlongwang-2409.18869","pid":"xinlongwang","arxiv":"2409.18869","date":"2024-09-27","venue":"cs.CV","fields":["vision","generative"],"tEn":"Emu3: Next-Token Prediction is All You Need","tZh":"Emu3：下一个标记预测就足够了","addedAt":"2026-07-31T01:00:05Z","cites":731},{"id":"sam-intelligence-age","pid":"sam","date":"2024-09-23","venue":"Sam Altman Blog","org":"OpenAI","fields":["nlp"],"tEn":"The Intelligence Age","tZh":"智能时代","srcUrl":"https://ia.samaltman.com/","srcLabel":"Sam Altman Blog","addedAt":"2026-07-12T08:44:26Z"},{"id":"anyang-2409.12191","pid":"anyang","arxiv":"2409.12191","date":"2024-09-18","venue":"cs.CV","org":"Alibaba","fields":["vision","nlp"],"tEn":"Qwen2-VL: Enhancing Vision-Language Model's Perception of the World at Any Resolution","tZh":"Qwen2-VL：增强视觉语言模型在任何分辨率下对世界的感知","cites":4352,"addedAt":"2026-06-28T17:10:59Z"},{"id":"anyang-2409.12122","pid":"anyang","arxiv":"2409.12122","date":"2024-09-18","venue":"cs.CL","org":"Qwen Team, Alibaba","fields":["nlp","deep-learning","rl"],"tEn":"Qwen2.5-Math Technical Report: Toward Mathematical Expert Model via Self-Improvement","tZh":"Qwen2.5-Math 技术报告：通过自我改进迈向数学专家模型","cites":1029,"addedAt":"2026-07-02T05:39:25Z"},{"id":"anyang-2409.12186","pid":"anyang","arxiv":"2409.12186","date":"2024-09-18","venue":"cs.CL","org":"Qwen Team, Alibaba","fields":["nlp","deep-learning","generative"],"tEn":"Qwen2.5-Coder Technical Report","tZh":"Qwen2.5-Coder 技术报告","cites":1330,"addedAt":"2026-07-02T05:39:25Z"},{"id":"demis-2409.08022","pid":"demis","arxiv":"2409.08022","date":"2024-09-12","venue":"q-bio.BM","org":"Google DeepMind","fields":["deep-learning"],"tEn":"De novo design of high-affinity protein binders with AlphaProteo","tZh":"利用 AlphaProteo 从头设计高亲和力蛋白结合物","cites":92,"addedAt":"2026-07-02T16:35:31Z"},{"id":"openai-learning-to-reason","pid":"openai","date":"2024-09-12","venue":"OpenAI Research","org":"OpenAI","fields":["nlp"],"tEn":"Learning to reason with LLMs","tZh":"学习用大语言模型进行推理","srcUrl":"https://openai.com/index/learning-to-reason-with-llms/","srcLabel":"OpenAI Research","addedAt":"2026-07-09T09:24:35Z"},{"id":"deepseek-2408.14158","pid":"deepseek","arxiv":"2408.14158","date":"2024-08-26","venue":"cs.DC","org":"DeepSeek","fields":["efficiency"],"tEn":"Fire-Flyer AI-HPC: A Cost-Effective Software-Hardware Co-Design for Deep Learning","tZh":"Fire-Flyer AI-HPC：一种经济高效的深度学习软硬件协同设计","cites":24,"addedAt":"2026-07-01T02:42:13Z"},{"id":"deepseek-2408.08152","pid":"deepseek","arxiv":"2408.08152","date":"2024-08-15","venue":"cs.CL","org":"DeepSeek","fields":["nlp","rl"],"tEn":"DeepSeek-Prover-V1.5: Harnessing Proof Assistant Feedback for Reinforcement Learning and Monte-Carlo Tree Search","tZh":"DeepSeek-Prover-V1.5：利用证明助手反馈进行强化学习与蒙特卡洛树搜索","cites":188,"addedAt":"2026-07-01T02:42:13Z"},{"id":"jietang-2408.06072","pid":"jietang","arxiv":"2408.06072","date":"2024-08-12","venue":"cs.CV","fields":["generative","vision"],"tEn":"CogVideoX: Text-to-Video Diffusion Models with An Expert Transformer","tZh":"CogVideoX: 带专家 Transformer 的文本到视频扩散模型","addedAt":"2026-07-30T17:03:38Z","cites":2079},{"id":"rgirshick-2408.00714","pid":"rgirshick","arxiv":"2408.00714","date":"2024-08-01","venue":"cs.CV","org":"Meta AI","fields":["vision"],"tEn":"SAM 2: Segment Anything in Images and Videos","tZh":"SAM 2：在图像和视频中分割一切","cites":3606,"addedAt":"2026-07-01T02:42:13Z"},{"id":"morganeriviere-2408.00118","pid":"morganeriviere","arxiv":"2408.00118","date":"2024-07-31","venue":"cs.CL","org":"Google DeepMind","fields":["nlp","deep-learning"],"tEn":"Gemma 2: Improving Open Language Models at a Practical Size","tZh":"Gemma 2：在实用规模上改进开放语言模型","cites":2150,"addedAt":"2026-06-29T15:38:26Z"},{"id":"aarongrattafiori-2407.21783","pid":"aarongrattafiori","arxiv":"2407.21783","date":"2024-07-31","venue":"cs.AI","fields":["nlp"],"tEn":"The Llama 3 Herd of Models","tZh":"Llama 3 模型群","addedAt":"2026-08-01T10:59:42Z","cites":17476},{"id":"deepmind-alphaproof-imo","pid":"deepmind","date":"2024-07-25","venue":"DeepMind Blog","org":"Google DeepMind","fields":["deep-learning"],"tEn":"AI achieves silver-medal standard solving International Mathematical Olympiad problems","tZh":"AI 在国际数学奥林匹克竞赛中达到银牌标准","srcUrl":"https://deepmind.google/discover/blog/ai-solves-imo-problems-at-silver-medal-level/","srcLabel":"DeepMind Blog","addedAt":"2026-07-11T02:54:52Z"},{"id":"junnanli-2407.15754","pid":"junnanli","arxiv":"2407.15754","date":"2024-07-22","venue":"cs.CV","org":"Rhymes AI","fields":["vision","deep-learning"],"tEn":"LongVideoBench: A Benchmark for Long-context Interleaved Video-Language Understanding","tZh":"LongVideoBench：面向长上下文交错视频-语言理解的基准测试","cites":628,"addedAt":"2026-07-02T05:39:25Z"},{"id":"junyanglin-2407.10759","pid":"junyanglin","arxiv":"2407.10759","date":"2024-07-15","venue":"eess.AS","org":"Alibaba Qwen","fields":["nlp","generative"],"tEn":"Qwen2-Audio Technical Report","tZh":"Qwen2-Audio 技术报告","cites":642,"addedAt":"2026-06-29T15:38:26Z"},{"id":"junyanglin-2407.10671","pid":"junyanglin","arxiv":"2407.10671","date":"2024-07-15","venue":"cs.CL","org":"Alibaba Qwen","fields":["nlp","deep-learning"],"tEn":"Qwen2 Technical Report","tZh":"Qwen2 技术报告","cites":2277,"addedAt":"2026-06-29T15:38:26Z"},{"id":"zhihaodu-2407.05407","pid":"zhihaodu","arxiv":"2407.05407","date":"2024-07-07","venue":"cs.SD","org":"Alibaba","fields":["generative","nlp"],"tEn":"CosyVoice: A Scalable Multilingual Zero-shot Text-to-speech Synthesizer based on Supervised Semantic Tokens","tZh":"CosyVoice：基于监督语义标记的可扩展多语言零样本文本转语音合成器","cites":479,"addedAt":"2026-07-19T03:56:30Z"},{"id":"jietang-2406.12793","pid":"jietang","arxiv":"2406.12793","date":"2024-06-18","venue":"cs.CL","org":"Zhipu AI","fields":["nlp","generative"],"tEn":"ChatGLM: A Family of Large Language Models from GLM-130B to GLM-4 All Tools","tZh":"ChatGLM：从 GLM-130B 到 GLM-4 All Tools 的大型语言模型家族","cites":1609,"addedAt":"2026-06-28T17:10:59Z"},{"id":"deepseek-2406.11931","pid":"deepseek","arxiv":"2406.11931","date":"2024-06-17","venue":"cs.SE","org":"DeepSeek","fields":["nlp","deep-learning"],"tEn":"DeepSeek-Coder-V2: Breaking the Barrier of Closed-Source Models in Code Intelligence","tZh":"DeepSeek-Coder-V2：打破闭源模型在代码智能领域的壁垒","cites":455,"addedAt":"2026-07-01T02:42:13Z"},{"id":"svlevine-2406.09246","pid":"svlevine","arxiv":"2406.09246","date":"2024-06-13","venue":"cs.RO","org":"Stanford","fields":["deep-learning","vision","robotics"],"tEn":"OpenVLA: An Open-Source Vision-Language-Action Model","tZh":"OpenVLA：一个开源的视觉-语言-动作模型","cites":2432,"addedAt":"2026-06-28T17:10:59Z"},{"id":"anthropic-claude-character","pid":"anthropic","date":"2024-06-08","venue":"Anthropic Research","org":"Anthropic","fields":["nlp"],"tEn":"Claude’s Character","tZh":"克劳德的性格","srcUrl":"https://www.anthropic.com/research/claude-character","srcLabel":"Anthropic Research","addedAt":"2026-07-11T02:54:52Z"},{"id":"aradford-2406.04093","pid":"aradford","arxiv":"2406.04093","date":"2024-06-06","venue":"cs.LG","org":"OpenAI","fields":["safety","deep-learning","efficiency"],"tEn":"Scaling and evaluating sparse autoencoders","tZh":"缩放与评估稀疏自编码器","cites":516,"addedAt":"2026-07-02T05:39:25Z"},{"id":"tkarras-2406.02507","pid":"tkarras","arxiv":"2406.02507","date":"2024-06-04","venue":"cs.CV","org":"NVIDIA","fields":["generative","deep-learning","vision"],"tEn":"Guiding a Diffusion Model with a Bad Version of Itself","tZh":"用自身的一个劣化版本来引导扩散模型","cites":280,"addedAt":"2026-07-02T05:39:25Z"},{"id":"tridao-2405.21060","pid":"tridao","arxiv":"2405.21060","date":"2024-05-31","venue":"cs.LG","fields":["efficiency","nlp"],"tEn":"Transformers are SSMs: Generalized Models and Efficient Algorithms Through Structured State Space Duality","tZh":"Transformers 是 SSM：通过结构化状态空间对偶的通用模型与高效算法","addedAt":"2026-08-01T13:13:16Z"},{"id":"leopold-from-gpt4-to-agi","pid":"leopold","date":"2024-05-29","venue":"Situational Awareness","org":"","fields":["nlp","safety"],"tEn":"Situational Awareness I: From GPT-4 to AGI","tZh":"情境意识 I：从 GPT-4 到 AGI","srcUrl":"https://situational-awareness.ai/from-gpt-4-to-agi/","srcLabel":"Situational Awareness","addedAt":"2026-07-19T09:25:48Z"},{"id":"deepseek-2405.14333","pid":"deepseek","arxiv":"2405.14333","date":"2024-05-23","venue":"cs.AI","org":"DeepSeek","fields":["nlp"],"tEn":"DeepSeek-Prover: Advancing Theorem Proving in LLMs through Large-Scale Synthetic Data","tZh":"DeepSeek-Prover：通过大规模合成数据推进大语言模型中的定理证明","cites":229,"addedAt":"2026-07-01T02:42:13Z"},{"id":"anthropic-mapping-mind","pid":"anthropic","date":"2024-05-21","venue":"Anthropic Research","org":"Anthropic","fields":["safety"],"tEn":"Mapping the mind of a large language model","tZh":"映射大语言模型的思维","srcUrl":"https://www.anthropic.com/research/mapping-mind-language-model","srcLabel":"Anthropic Research","addedAt":"2026-07-09T08:45:21Z"},{"id":"openai-model-spec","pid":"openai","date":"2024-05-08","venue":"OpenAI","org":"OpenAI","fields":["safety"],"tEn":"Introducing the Model Spec","tZh":"模型规范介绍","srcUrl":"https://openai.com/index/introducing-the-model-spec/","srcLabel":"OpenAI","addedAt":"2026-07-09T09:24:35Z"},{"id":"wenfengliang-2405.04434","pid":"wenfengliang","arxiv":"2405.04434","date":"2024-05-07","venue":"cs.CL","org":"DeepSeek","fields":["nlp","efficiency"],"tEn":"DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model","tZh":"DeepSeek-V2：一个强大、经济且高效的混合专家语言模型","cites":1287,"addedAt":"2026-06-28T17:10:59Z"},{"id":"songhan-2405.04532","pid":"songhan","arxiv":"2405.04532","date":"2024-05-07","venue":"cs.CL","org":"MIT","fields":["efficiency","nlp"],"tEn":"QServe: W4A8KV4 Quantization and System Co-design for Efficient LLM Serving","tZh":"QServe: W4A8KV4 量化与系统协同设计实现高效 LLM 服务","cites":224,"addedAt":"2026-07-02T05:39:25Z"},{"id":"sebastienbubeck-2404.14219","pid":"sebastienbubeck","arxiv":"2404.14219","date":"2024-04-22","venue":"cs.CL","org":"Microsoft","fields":["nlp","efficiency"],"tEn":"Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone","tZh":"Phi-3 技术报告：一款可在手机上本地运行的高性能语言模型","cites":2267,"addedAt":"2026-06-29T15:38:26Z"},{"id":"keyutian-2404.02905","pid":"keyutian","arxiv":"2404.02905","date":"2024-04-03","venue":"cs.CV","org":"ByteDance Seed","fields":["generative","vision"],"tEn":"Visual Autoregressive Modeling: Scalable Image Generation via Next-Scale Prediction","tZh":"视觉自回归建模：通过下一尺度预测实现可扩展的图像生成","cites":1060,"addedAt":"2026-06-29T15:38:26Z"},{"id":"anthropic-many-shot-jailbreaking","pid":"anthropic","date":"2024-04-02","venue":"Anthropic Research","org":"Anthropic","fields":["safety"],"tEn":"Many-shot jailbreaking","tZh":"多轮越狱","srcUrl":"https://www.anthropic.com/research/many-shot-jailbreaking","srcLabel":"Anthropic Research","addedAt":"2026-07-11T02:54:52Z"},{"id":"lindahua-2403.17297","pid":"lindahua","arxiv":"2403.17297","date":"2024-03-26","venue":"cs.CL","org":"Shanghai AI Lab","fields":["nlp","deep-learning"],"tEn":"InternLM2 Technical Report","tZh":"InternLM2 技术报告","cites":410,"addedAt":"2026-06-29T15:38:26Z"},{"id":"rrombach-2403.12015","pid":"rrombach","arxiv":"2403.12015","date":"2024-03-18","venue":"cs.CV","org":"Stability AI","fields":["generative","vision","efficiency"],"tEn":"Fast High-Resolution Image Synthesis with Latent Adversarial Diffusion Distillation","tZh":"潜在对抗扩散蒸馏实现快速高分辨率图像合成","cites":294,"addedAt":"2026-07-02T05:39:25Z"},{"id":"rrombach-2403.12008","pid":"rrombach","arxiv":"2403.12008","date":"2024-03-18","venue":"cs.CV","org":"Stability AI","fields":["generative","vision"],"tEn":"SV3D: Novel Multi-view Synthesis and 3D Generation from a Single Image using Latent Video Diffusion","tZh":"SV3D：基于潜在视频扩散的单图像新颖多视图合成与 3D 生成","cites":402,"addedAt":"2026-07-02T05:39:25Z"},{"id":"thomasmesnard-2403.08295","pid":"thomasmesnard","arxiv":"2403.08295","date":"2024-03-13","venue":"cs.CL","org":"Google DeepMind","fields":["nlp","deep-learning"],"tEn":"Gemma: Open Models Based on Gemini Research and Technology","tZh":"Gemma：基于 Gemini 研究与技术的开放模型","cites":1124,"addedAt":"2026-06-29T15:38:26Z"},{"id":"haoyulu-2403.05525","pid":"haoyulu","arxiv":"2403.05525","date":"2024-03-08","venue":"cs.AI","org":"DeepSeek","fields":["vision","nlp"],"tEn":"DeepSeek-VL: Towards Real-World Vision-Language Understanding","tZh":"DeepSeek-VL：面向真实世界的视觉语言理解","cites":835,"addedAt":"2026-06-29T07:10:23Z"},{"id":"demis-2403.05530","pid":"demis","arxiv":"2403.05530","date":"2024-03-08","venue":"cs.CL","fields":["nlp","deep-learning"],"tEn":"Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context","tZh":"Gemini 1.5：解锁跨数百万 token 上下文的 multimodal 理解","addedAt":"2026-07-30T16:54:52Z","cites":3804},{"id":"kaifulee-2403.04652","pid":"kaifulee","arxiv":"2403.04652","date":"2024-03-07","venue":"cs.CL","org":"01.AI","fields":["nlp","deep-learning"],"tEn":"Yi: Open Foundation Models by 01.AI","tZh":"Yi: 01.AI 的开源基础模型","cites":854,"addedAt":"2026-06-28T17:10:59Z"},{"id":"rrombach-2403.03206","pid":"rrombach","arxiv":"2403.03206","date":"2024-03-05","venue":"cs.CV","org":"Stability AI","fields":["generative","vision"],"tEn":"Scaling Rectified Flow Transformers for High-Resolution Image Synthesis","tZh":"缩放整流流变换器以实现高分辨率图像合成","cites":4235,"addedAt":"2026-06-29T15:38:26Z"},{"id":"jakebruce-2402.15391","pid":"jakebruce","arxiv":"2402.15391","date":"2024-02-23","venue":"cs.LG","org":"Google DeepMind","fields":["generative","rl"],"tEn":"Genie: Generative Interactive Environments","tZh":"Genie: 生成式交互环境","cites":674,"addedAt":"2026-06-29T15:38:26Z"},{"id":"shuransong-2402.10329","pid":"shuransong","arxiv":"2402.10329","date":"2024-02-15","venue":"cs.RO","org":"Stanford","fields":["vision","rl","robotics"],"tEn":"Universal Manipulation Interface: In-The-Wild Robot Teaching Without In-The-Wild Robots","tZh":"通用操控接口：无需野外机器人的野外机器人教学","cites":594,"addedAt":"2026-06-28T17:10:59Z"},{"id":"sarahooker-2402.07827","pid":"sarahooker","arxiv":"2402.07827","date":"2024-02-12","venue":"cs.CL","fields":["nlp","safety"],"tEn":"Aya Model: An Instruction Finetuned Open-Access Multilingual Language Model","tZh":"Aya 模型：一种指令微调的开源多语言语言模型","addedAt":"2026-08-01T14:02:24Z","cites":389},{"id":"zshao-2402.03300","pid":"zshao","arxiv":"2402.03300","date":"2024-02-05","venue":"cs.CL","org":"DeepSeek","fields":["nlp","rl"],"tEn":"DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models","tZh":"DeepSeekMath：推动开源语言模型数学推理的极限","cites":7381,"addedAt":"2026-06-29T07:10:23Z"},{"id":"dirkgroeneveld-2402.00838","pid":"dirkgroeneveld","arxiv":"2402.00838","date":"2024-02-01","venue":"cs.CL","org":"Allen Institute for AI","fields":["nlp","deep-learning"],"tEn":"OLMo: Accelerating the Science of Language Models","tZh":"OLMo：加速语言模型科学","cites":683,"addedAt":"2026-06-29T15:38:26Z"},{"id":"openai-bio-threat-early-warning","pid":"openai","date":"2024-01-31","venue":"OpenAI Research","org":"OpenAI","fields":["safety"],"tEn":"Building an early warning system for LLM-aided biological threat creation","tZh":"构建针对 LLM 辅助生物威胁创建的早期预警系统","srcUrl":"https://openai.com/index/building-an-early-warning-system-for-llm-aided-biological-threat-creation/","srcLabel":"OpenAI Research","addedAt":"2026-07-11T02:54:52Z"},{"id":"dayaguo-2401.14196","pid":"dayaguo","arxiv":"2401.14196","date":"2024-01-25","venue":"cs.SE","org":"DeepSeek","fields":["nlp","deep-learning"],"tEn":"DeepSeek-Coder: When the Large Language Model Meets Programming -- The Rise of Code Intelligence","tZh":"DeepSeek-Coder：当大型语言模型遇见编程——代码智能的崛起","cites":1735,"addedAt":"2026-06-28T17:10:59Z"},{"id":"deepmind-alphageometry","pid":"deepmind","date":"2024-01-17","venue":"DeepMind Blog","org":"Google DeepMind","fields":["deep-learning"],"tEn":"AlphaGeometry: An Olympiad-level AI system for geometry","tZh":"AlphaGeometry：奥林匹克级别的几何 AI 系统","srcUrl":"https://deepmind.google/discover/blog/alphageometry-an-olympiad-level-ai-system-for-geometry/","srcLabel":"DeepMind Blog","addedAt":"2026-07-12T03:58:41Z"},{"id":"damaidai-2401.06066","pid":"damaidai","arxiv":"2401.06066","date":"2024-01-11","venue":"cs.CL","org":"DeepSeek","fields":["nlp","efficiency"],"tEn":"DeepSeekMoE: Towards Ultimate Expert Specialization in Mixture-of-Experts Language Models","tZh":"DeepSeekMoE：迈向混合专家语言模型中专家专业化的极致","cites":933,"addedAt":"2026-06-29T07:10:23Z"},{"id":"anthropic-2401.05566","pid":"anthropic","arxiv":"2401.05566","date":"2024-01-10","venue":"cs.CR","org":"Anthropic","fields":["safety"],"tEn":"Sleeper Agents: Training Deceptive LLMs that Persist Through Safety Training","tZh":"潜伏特工：训练具有欺骗性的 LLM，使其在安全训练中持续存在","cites":471,"addedAt":"2026-07-01T02:42:13Z"},{"id":"aqjiang-2401.04088","pid":"aqjiang","arxiv":"2401.04088","date":"2024-01-08","venue":"cs.LG","org":"Mistral AI","fields":["nlp","efficiency"],"tEn":"Mixtral of Experts","tZh":"Mixtral of Experts","cites":1967,"addedAt":"2026-06-29T07:10:23Z"},{"id":"deepseek-2401.02954","pid":"deepseek","arxiv":"2401.02954","date":"2024-01-05","venue":"cs.CL","org":"DeepSeek","fields":["nlp","deep-learning"],"tEn":"DeepSeek LLM: Scaling Open-Source Language Models with Longtermism","tZh":"DeepSeek LLM：以长期主义扩展开源语言模型","cites":785,"addedAt":"2026-07-01T02:42:13Z"},{"id":"zfu-2401.02117","pid":"zfu","arxiv":"2401.02117","date":"2024-01-04","venue":"cs.RO","org":"Stanford","fields":["rl","vision","robotics"],"tEn":"Mobile ALOHA: Learning Bimanual Mobile Manipulation with Low-Cost Whole-Body Teleoperation","tZh":"Mobile ALOHA：通过低成本全身遥操作学习双臂移动操作","cites":699,"addedAt":"2026-06-29T07:10:23Z"},{"id":"wenhaiwang-2312.14238","pid":"wenhaiwang","arxiv":"2312.14238","date":"2023-12-21","venue":"cs.CV","org":"Shanghai AI Lab","fields":["vision","nlp"],"tEn":"InternVL: Scaling up Vision Foundation Models and Aligning for Generic Visual-Linguistic Tasks","tZh":"InternVL：扩展视觉基础模型并针对通用视觉语言任务进行对齐","cites":3055,"addedAt":"2026-06-29T07:10:23Z"},{"id":"xinlongwang-2312.13286","pid":"xinlongwang","arxiv":"2312.13286","date":"2023-12-20","venue":"cs.CV","org":"BAAI","fields":["generative","vision","nlp","deep-learning"],"tEn":"Generative Multimodal Models are In-Context Learners","tZh":"生成式多模态模型是上下文学习者","cites":512,"addedAt":"2026-07-02T05:39:25Z"},{"id":"shazeer-2312.11805","pid":"shazeer","arxiv":"2312.11805","date":"2023-12-19","venue":"cs.CL","fields":["nlp","deep-learning"],"tEn":"Gemini: A Family of Highly Capable Multimodal Models","tZh":"Gemini：一个高度能干的多模态模型家族","addedAt":"2026-07-30T19:17:12Z"},{"id":"openai-weak-to-strong","pid":"openai","date":"2023-12-14","venue":"OpenAI Research","org":"OpenAI","fields":["safety"],"tEn":"Weak-to-strong generalization","tZh":"弱到强泛化","srcUrl":"https://openai.com/index/weak-to-strong-generalization/","srcLabel":"OpenAI Research","addedAt":"2026-07-09T08:45:21Z"},{"id":"lianminzheng-2312.07104","pid":"lianminzheng","arxiv":"2312.07104","date":"2023-12-12","venue":"cs.AI","org":"UC Berkeley","fields":["efficiency","nlp"],"tEn":"SGLang: Efficient Execution of Structured Language Model Programs","tZh":"SGLang：结构化语言模型程序的高效执行","cites":1014,"addedAt":"2026-06-29T15:38:26Z"},{"id":"tkarras-2312.02696","pid":"tkarras","arxiv":"2312.02696","date":"2023-12-05","venue":"cs.CV","fields":["generative","deep-learning","vision"],"tEn":"Analyzing and Improving the Training Dynamics of Diffusion Models","tZh":"分析与改进扩散模型的训练动态","addedAt":"2026-07-30T19:30:39Z","cites":431},{"id":"tridao-2312.00752","pid":"tridao","arxiv":"2312.00752","date":"2023-12-01","venue":"cs.LG","fields":["efficiency","nlp"],"tEn":"Mamba: Linear-Time Sequence Modeling with Selective State Spaces","tZh":"Mamba：具有选择性状态空间的线性时间序列建模","addedAt":"2026-07-30T15:57:03Z","cites":7852},{"id":"rrombach-2311.17042","pid":"rrombach","arxiv":"2311.17042","date":"2023-11-28","venue":"cs.CV","org":"Stability AI","fields":["generative","vision","efficiency"],"tEn":"Adversarial Diffusion Distillation","tZh":"对抗性扩散蒸馏","cites":807,"addedAt":"2026-07-02T05:39:25Z"},{"id":"rrombach-2311.15127","pid":"rrombach","arxiv":"2311.15127","date":"2023-11-25","venue":"cs.CV","org":"Stability AI","fields":["generative","vision"],"tEn":"Stable Video Diffusion: Scaling Latent Video Diffusion Models to Large Datasets","tZh":"稳定视频扩散：将潜在视频扩散模型扩展到大型数据集","cites":2689,"addedAt":"2026-06-29T15:38:26Z"},{"id":"jasonwei-some-intuitions-about-large-language-models","pid":"jasonwei","date":"2023-11-24","venue":"Research","org":"","fields":["nlp"],"tEn":"Six intuitions about large language models — Jason Wei","tZh":"关于大型语言模型的六个直觉 — Jason Wei","srcUrl":"https://www.jasonwei.net/blog/some-intuitions-about-large-language-models","srcLabel":"Article","addedAt":"2026-08-02T07:06:50Z"},{"id":"jietang-2311.03079","pid":"jietang","arxiv":"2311.03079","date":"2023-11-06","venue":"cs.CV","org":"Zhipu AI","fields":["vision","nlp"],"tEn":"CogVLM: Visual Expert for Pretrained Language Models","tZh":"CogVLM：预训练语言模型的视觉专家","cites":818,"addedAt":"2026-06-29T15:38:26Z"},{"id":"xinghangli-2311.01378","pid":"xinghangli","arxiv":"2311.01378","date":"2023-11-02","venue":"cs.RO","org":"ByteDance Seed","fields":["deep-learning","vision","robotics"],"tEn":"Vision-Language Foundation Models as Effective Robot Imitators","tZh":"视觉语言基础模型作为有效的机器人模仿者","cites":405,"addedAt":"2026-06-29T08:51:28Z"},{"id":"openai-frontier-risk-preparedness","pid":"openai","date":"2023-10-26","venue":"OpenAI","org":"OpenAI","fields":["safety"],"tEn":"Frontier risk and preparedness","tZh":"前沿风险与准备","srcUrl":"https://openai.com/index/frontier-risk-and-preparedness/","srcLabel":"OpenAI","addedAt":"2026-07-11T02:54:52Z"},{"id":"jimfan-2310.12931","pid":"jimfan","arxiv":"2310.12931","date":"2023-10-19","venue":"cs.RO","org":"NVIDIA","fields":["rl","nlp","deep-learning"],"tEn":"Eureka: Human-Level Reward Design via Coding Large Language Models","tZh":"Eureka：通过编码大型语言模型实现人类级别的奖励设计","cites":655,"addedAt":"2026-07-02T05:39:25Z"},{"id":"aqjiang-2310.10631","pid":"aqjiang","arxiv":"2310.10631","date":"2023-10-16","venue":"cs.CL","org":"EleutherAI / Princeton","fields":["nlp","deep-learning","generative"],"tEn":"Llemma: An Open Language Model For Mathematics","tZh":"Llemma：一个开放的数学语言模型","cites":471,"addedAt":"2026-07-02T05:39:25Z"},{"id":"mahn-2310.08864","pid":"mahn","arxiv":"2310.08864","date":"2023-10-13","venue":"cs.RO","org":"Google DeepMind","fields":["deep-learning","vision","robotics"],"tEn":"Open X-Embodiment: Robotic Learning Datasets and RT-X Models","tZh":"开放 X-具身：机器人学习数据集与 RT-X 模型","cites":1083,"addedAt":"2026-06-29T07:10:23Z"},{"id":"aqjiang-2310.06825","pid":"aqjiang","arxiv":"2310.06825","date":"2023-10-10","venue":"cs.CL","org":"Mistral AI","fields":["nlp","efficiency"],"tEn":"Mistral 7B","tZh":"Mistral 7B：高性能高效语言模型","cites":3625,"addedAt":"2026-07-01T02:42:13Z"},{"id":"haotianliu-2310.03744","pid":"haotianliu","arxiv":"2310.03744","date":"2023-10-05","venue":"cs.CV","org":"Microsoft","fields":["vision","nlp"],"tEn":"Improved Baselines with Visual Instruction Tuning","tZh":"通过视觉指令调优改进基线模型","cites":5410,"addedAt":"2026-06-28T17:10:59Z"},{"id":"songhan-2309.17453","pid":"songhan","arxiv":"2309.17453","date":"2023-09-29","venue":"cs.CL","org":"MIT","fields":["efficiency","nlp"],"tEn":"Efficient Streaming Language Models with Attention Sinks","tZh":"高效流式语言模型：注意力汇聚机制","cites":2063,"addedAt":"2026-06-29T15:38:26Z"},{"id":"anyang-2309.16609","pid":"anyang","arxiv":"2309.16609","date":"2023-09-28","venue":"cs.CL","fields":["nlp","deep-learning"],"tEn":"Qwen Technical Report","tZh":"Qwen 技术报告","addedAt":"2026-07-30T16:33:39Z","cites":4005},{"id":"anthropic-responsible-scaling-policy","pid":"anthropic","date":"2023-09-19","venue":"Anthropic","org":"Anthropic","fields":["safety"],"tEn":"Announcing Anthropic's Responsible Scaling Policy","tZh":"Anthropic 负责任扩展政策发布","srcUrl":"https://www.anthropic.com/news/anthropics-responsible-scaling-policy","srcLabel":"Anthropic","addedAt":"2026-07-09T09:24:35Z"},{"id":"ethanmollick-centaurs-and-cyborgs","pid":"ethanmollick","date":"2023-09-16","venue":"One Useful Thing","org":"Wharton","fields":["nlp"],"tEn":"Centaurs and Cyborgs on the Jagged Frontier","tZh":"锯齿前沿的半人马与赛博格","srcUrl":"https://www.oneusefulthing.org/p/centaurs-and-cyborgs-on-the-jagged","srcLabel":"One Useful Thing","addedAt":"2026-07-19T09:25:48Z"},{"id":"lianminzheng-2309.06180","pid":"lianminzheng","arxiv":"2309.06180","date":"2023-09-12","venue":"cs.LG","org":"UC Berkeley","fields":["efficiency","nlp"],"tEn":"Efficient Memory Management for Large Language Model Serving with PagedAttention","tZh":"面向大语言模型服务的高效内存管理：PagedAttention","cites":6859,"addedAt":"2026-06-29T15:38:26Z"},{"id":"jinzebai-2308.12966","pid":"jinzebai","arxiv":"2308.12966","date":"2023-08-24","venue":"cs.CV","org":"Alibaba","fields":["vision","nlp"],"tEn":"Qwen-VL: A Versatile Vision-Language Model for Understanding, Localization, Text Reading, and Beyond","tZh":"Qwen-VL：一个多功能的视觉语言模型，用于理解、定位、文本阅读等","cites":2187,"addedAt":"2026-06-29T07:10:23Z"},{"id":"aarongrattafiori-2308.12950","pid":"aarongrattafiori","arxiv":"2308.12950","date":"2023-08-24","venue":"cs.CL","org":"Meta AI","fields":["nlp"],"tEn":"Code Llama: Open Foundation Models for Code","tZh":"Code Llama：用于代码的开放基础模型","cites":3301,"addedAt":"2026-07-01T02:42:13Z"},{"id":"jietang-2308.03688","pid":"jietang","arxiv":"2308.03688","date":"2023-08-07","venue":"cs.AI","org":"Tsinghua University / Zhipu AI","fields":["nlp","deep-learning"],"tEn":"AgentBench: Evaluating LLMs as Agents","tZh":"AgentBench：评估作为智能体的大语言模型","cites":1014,"addedAt":"2026-07-02T05:39:25Z"},{"id":"abrohan-2307.15818","pid":"abrohan","arxiv":"2307.15818","date":"2023-07-28","venue":"cs.RO","org":"Google DeepMind","fields":["deep-learning","vision","robotics"],"tEn":"RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control","tZh":"RT-2：视觉-语言-动作模型将网络知识迁移至机器人控制","cites":3509,"addedAt":"2026-06-28T17:10:59Z"},{"id":"aarongrattafiori-2307.09288","pid":"aarongrattafiori","arxiv":"2307.09288","date":"2023-07-18","venue":"cs.CL","org":"Meta AI","fields":["nlp","deep-learning"],"tEn":"Llama 2: Open Foundation and Fine-Tuned Chat Models","tZh":"Llama 2：开放的基础模型与微调聊天模型","cites":17457,"addedAt":"2026-07-01T02:42:13Z"},{"id":"furuwei-2307.08621","pid":"furuwei","arxiv":"2307.08621","date":"2023-07-17","venue":"cs.CL","org":"Microsoft Research Asia","fields":["deep-learning","efficiency"],"tEn":"Retentive Network: A Successor to Transformer for Large Language Models","tZh":"Retentive Network：大型语言模型中 Transformer 的继任者","cites":696,"addedAt":"2026-06-29T07:10:23Z"},{"id":"tridao-2307.08691","pid":"tridao","arxiv":"2307.08691","date":"2023-07-17","venue":"cs.LG","org":"Princeton University / Stanford University","fields":["efficiency","deep-learning"],"tEn":"FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning","tZh":"FlashAttention-2：通过更好的并行性和工作分区实现更快的注意力机制","cites":2881,"addedAt":"2026-06-29T15:38:26Z"},{"id":"feifei-2307.05973","pid":"feifei","arxiv":"2307.05973","date":"2023-07-12","venue":"cs.RO","org":"Stanford","fields":["vision","rl","robotics"],"tEn":"VoxPoser: Composable 3D Value Maps for Robotic Manipulation with Language Models","tZh":"VoxPoser：基于语言模型的可组合 3D 价值图用于机器人操作","cites":1008,"addedAt":"2026-07-02T16:35:31Z"},{"id":"alexwei-2307.02483","pid":"alexwei","arxiv":"2307.02483","date":"2023-07-05","venue":"cs.LG","fields":["safety","nlp"],"tEn":"Jailbroken: How Does LLM Safety Training Fail?","tZh":"越狱：LLM 安全训练为何失败？","cites":2008,"addedAt":"2026-07-05T03:17:49Z"},{"id":"rrombach-2307.01952","pid":"rrombach","arxiv":"2307.01952","date":"2023-07-04","venue":"cs.CV","org":"Stability AI","fields":["generative","vision"],"tEn":"SDXL: Improving Latent Diffusion Models for High-Resolution Image Synthesis","tZh":"SDXL：改进潜在扩散模型以实现高分辨率图像合成","cites":4946,"addedAt":"2026-06-29T15:38:26Z"},{"id":"dieterfox-2306.14896","pid":"dieterfox","arxiv":"2306.14896","date":"2023-06-26","venue":"cs.RO","org":"NVIDIA","fields":["vision","deep-learning","robotics"],"tEn":"RVT: Robotic View Transformer for 3D Object Manipulation","tZh":"RVT：用于 3D 物体操作的机器人视角变换器","cites":279,"addedAt":"2026-06-28T17:10:59Z"},{"id":"lilianweng-llm-agents","pid":"lilianweng","date":"2023-06-23","venue":"Lil'Log","org":"OpenAI","fields":["nlp"],"tEn":"LLM Powered Autonomous Agents","tZh":"LLM 驱动的自主智能体","srcUrl":"https://lilianweng.github.io/posts/2023-06-23-agent/","srcLabel":"Lil'Log","addedAt":"2026-07-19T04:13:43Z"},{"id":"adefossez-2306.05284","pid":"adefossez","arxiv":"2306.05284","date":"2023-06-08","venue":"cs.SD","org":"Meta AI","fields":["deep-learning","generative"],"tEn":"Simple and Controllable Music Generation","tZh":"简单可控的音乐生成","cites":714,"addedAt":"2026-06-29T07:10:23Z"},{"id":"songhan-2306.00978","pid":"songhan","arxiv":"2306.00978","date":"2023-06-01","venue":"cs.CL","org":"MIT","fields":["efficiency","nlp"],"tEn":"AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration","tZh":"AWQ：面向大语言模型压缩与加速的激活感知权重量化","cites":1478,"addedAt":"2026-06-29T15:38:26Z"},{"id":"hlightman-2305.20050","pid":"hlightman","arxiv":"2305.20050","date":"2023-05-31","venue":"cs.LG","org":"OpenAI","fields":["nlp","rl"],"tEn":"Let's Verify Step by Step","tZh":"让我们逐步验证","cites":3656,"addedAt":"2026-06-29T07:10:23Z"},{"id":"rrafailov-2305.18290","pid":"rrafailov","arxiv":"2305.18290","date":"2023-05-29","venue":"cs.LG","org":"Stanford","fields":["rl","nlp"],"tEn":"Direct Preference Optimization: Your Language Model is Secretly a Reward Model","tZh":"直接偏好优化：你的语言模型其实是一个奖励模型","cites":9323,"addedAt":"2026-06-29T07:10:23Z"},{"id":"jimfan-2305.16291","pid":"jimfan","arxiv":"2305.16291","date":"2023-05-25","venue":"cs.AI","fields":["rl","robotics"],"tEn":"Voyager: An Open-Ended Embodied Agent with Large Language Models","tZh":"Voyager：基于大型语言模型的开放式具身智能体","cites":1836,"org":"NVIDIA","addedAt":"2026-06-28T12:00:54Z"},{"id":"junzhu-2305.16213","pid":"junzhu","arxiv":"2305.16213","date":"2023-05-25","venue":"cs.LG","org":"Tsinghua University","fields":["generative","vision"],"tEn":"ProlificDreamer: High-Fidelity and Diverse Text-to-3D Generation with Variational Score Distillation","tZh":"ProlificDreamer：基于变分分数蒸馏的高保真、多样化文本到 3D 生成","cites":1387,"addedAt":"2026-06-29T15:38:26Z"},{"id":"jainslie-2305.13245","pid":"jainslie","arxiv":"2305.13245","date":"2023-05-22","venue":"cs.CL","org":"Google","fields":["efficiency","nlp"],"tEn":"GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints","tZh":"GQA：从多头检查点训练通用多查询 Transformer 模型","cites":1533,"addedAt":"2026-06-29T07:10:23Z"},{"id":"czhou-2305.11206","pid":"czhou","arxiv":"2305.11206","date":"2023-05-18","venue":"cs.CL","org":"Meta AI","fields":["nlp","deep-learning"],"tEn":"LIMA: Less Is More for Alignment","tZh":"LIMA：少即是多——对齐的简约之道","cites":1329,"addedAt":"2026-06-29T07:10:23Z"},{"id":"shunyuyao-2305.10601","pid":"shunyuyao","arxiv":"2305.10601","date":"2023-05-17","venue":"cs.CL","org":"Princeton University / Google DeepMind","fields":["nlp","deep-learning"],"tEn":"Tree of Thoughts: Deliberate Problem Solving with Large Language Models","tZh":"思维树：利用大型语言模型进行深思熟虑的问题解决","cites":4489,"addedAt":"2026-06-29T15:38:26Z"},{"id":"junnanli-2305.06500","pid":"junnanli","arxiv":"2305.06500","date":"2023-05-11","venue":"cs.CV","org":"Salesforce","fields":["vision","nlp"],"tEn":"InstructBLIP: Towards General-purpose Vision-Language Models with Instruction Tuning","tZh":"InstructBLIP：面向通用视觉-语言模型的指令微调","cites":3589,"addedAt":"2026-06-29T15:38:26Z"},{"id":"openai-explain-neurons","pid":"openai","date":"2023-05-09","venue":"OpenAI Research","org":"OpenAI","fields":["safety"],"tEn":"Language models can explain neurons in language models","tZh":"语言模型可以解释语言模型中的神经元","srcUrl":"https://openai.com/index/language-models-can-explain-neurons-in-language-models/","srcLabel":"OpenAI Research","addedAt":"2026-07-09T08:45:21Z"},{"id":"anthropic-claudes-constitution","pid":"anthropic","date":"2023-05-09","venue":"Anthropic","org":"Anthropic","fields":["safety"],"tEn":"Claude’s Constitution \\ Anthropic","tZh":"克劳德的宪法 / Anthropic","srcUrl":"https://www.anthropic.com/news/claudes-constitution","srcLabel":"Anthropic","addedAt":"2026-07-12T03:58:41Z"},{"id":"rgirshick-2305.05665","pid":"rgirshick","arxiv":"2305.05665","date":"2023-05-09","venue":"cs.CV","fields":["vision","generative"],"tEn":"ImageBind: One Embedding Space To Bind Them All","tZh":"ImageBind：一个嵌入空间绑定所有","addedAt":"2026-07-30T18:28:22Z","cites":1660},{"id":"finn-2304.13705","pid":"finn","arxiv":"2304.13705","date":"2023-04-23","venue":"cs.RO","org":"Stanford","fields":["rl","vision","robotics"],"tEn":"Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware","tZh":"利用低成本硬件学习精细双手操作","cites":1971,"addedAt":"2026-06-28T17:10:59Z"},{"id":"deyaopeng-2304.10592","pid":"deyaopeng","arxiv":"2304.10592","date":"2023-04-20","venue":"cs.CV","org":"KAUST","fields":["vision","nlp"],"tEn":"MiniGPT-4: Enhancing Vision-Language Understanding with Advanced Large Language Models","tZh":"MiniGPT-4：利用先进大语言模型增强视觉语言理解","cites":3208,"addedAt":"2026-06-29T08:51:28Z"},{"id":"haotianliu-2304.08485","pid":"haotianliu","arxiv":"2304.08485","date":"2023-04-17","venue":"cs.CV","org":"Microsoft","fields":["vision","nlp"],"tEn":"Visual Instruction Tuning","tZh":"视觉指令微调","cites":9951,"addedAt":"2026-06-28T17:10:59Z"},{"id":"moquab-2304.07193","pid":"moquab","arxiv":"2304.07193","date":"2023-04-14","venue":"cs.CV","org":"Meta AI","fields":["vision","deep-learning"],"tEn":"DINOv2: Learning Robust Visual Features without Supervision","tZh":"DINOv2：无需监督学习鲁棒视觉特征","cites":9029,"addedAt":"2026-06-29T07:10:23Z"},{"id":"xinlongwang-2304.03284","pid":"xinlongwang","arxiv":"2304.03284","date":"2023-04-06","venue":"cs.CV","org":"BAAI","fields":["vision","deep-learning"],"tEn":"SegGPT: Segmenting Everything In Context","tZh":"SegGPT: 在上下文中分割一切","cites":275,"addedAt":"2026-07-02T05:39:25Z"},{"id":"rgirshick-2304.02643","pid":"rgirshick","arxiv":"2304.02643","date":"2023-04-05","venue":"cs.CV","org":"Meta AI","fields":["vision"],"tEn":"Segment Anything","tZh":"分割一切","cites":14285,"addedAt":"2026-07-01T02:42:13Z"},{"id":"xiaohuazhai-2303.15343","pid":"xiaohuazhai","arxiv":"2303.15343","date":"2023-03-27","venue":"cs.CV","fields":["vision","nlp"],"tEn":"Sigmoid Loss for Language Image Pre-Training","tZh":"语言图像预训练的 Sigmoid 损失函数","addedAt":"2026-07-31T00:54:21Z","cites":3336},{"id":"openai-2303.08774","pid":"openai","arxiv":"2303.08774","date":"2023-03-15","venue":"cs.CL","org":"OpenAI","fields":["nlp","deep-learning"],"tEn":"GPT-4 Technical Report","tZh":"GPT-4 技术报告","cites":25659,"addedAt":"2026-07-01T02:42:13Z"},{"id":"leizhangidea-2303.05499","pid":"leizhangidea","arxiv":"2303.05499","date":"2023-03-09","venue":"cs.CV","org":"IDEA Research","fields":["vision","nlp"],"tEn":"Grounding DINO: Marrying DINO with Grounded Pre-Training for Open-Set Object Detection","tZh":"Grounding DINO：将 DINO 与接地预训练相结合，实现开放集目标检测","cites":4414,"addedAt":"2026-06-29T15:38:26Z"},{"id":"anthropic-core-views-on-ai-safety","pid":"anthropic","date":"2023-03-08","venue":"Anthropic","org":"Anthropic","fields":["safety"],"tEn":"Core Views on AI Safety","tZh":"AI 安全核心观点","srcUrl":"https://www.anthropic.com/news/core-views-on-ai-safety","srcLabel":"Anthropic","addedAt":"2026-07-19T09:25:48Z"},{"id":"anthropic-core-views-ai-safety","pid":"anthropic","date":"2023-03-08","venue":"Anthropic","org":"Anthropic","fields":["safety"],"tEn":"Anthropic's core views on AI safety","tZh":"Anthropic 关于 AI 安全的核心观点","srcUrl":"https://www.anthropic.com/news/core-views-on-ai-safety","srcLabel":"Anthropic","addedAt":"2026-07-09T09:24:35Z"},{"id":"chengchi-2303.04137","pid":"chengchi","arxiv":"2303.04137","date":"2023-03-07","venue":"cs.RO","org":"Stanford","fields":["generative","vision","robotics"],"tEn":"Diffusion Policy: Visuomotor Policy Learning via Action Diffusion","tZh":"扩散策略：通过动作扩散进行视觉运动策略学习","cites":3588,"addedAt":"2026-06-28T17:10:59Z"},{"id":"yangsong-2303.01469","pid":"yangsong","arxiv":"2303.01469","date":"2023-03-02","venue":"cs.LG","org":"OpenAI","fields":["generative","efficiency"],"tEn":"Consistency Models","tZh":"一致性模型","cites":1999,"addedAt":"2026-06-28T17:10:59Z"},{"id":"aarongrattafiori-2302.13971","pid":"aarongrattafiori","arxiv":"2302.13971","date":"2023-02-27","venue":"cs.CL","org":"Meta AI","fields":["nlp","deep-learning"],"tEn":"LLaMA: Open and Efficient Foundation Language Models","tZh":"LLaMA：开放且高效的基础语言模型","cites":20615,"addedAt":"2026-07-01T02:42:13Z"},{"id":"openai-planning-for-agi","pid":"openai","date":"2023-02-24","venue":"OpenAI","org":"OpenAI","fields":["safety"],"tEn":"Planning for AGI and beyond","tZh":"规划通用人工智能及其未来","srcUrl":"https://openai.com/index/planning-for-agi-and-beyond/","srcLabel":"OpenAI","addedAt":"2026-07-09T09:24:35Z"},{"id":"stephenwolfram-what-is-chatgpt-doing","pid":"stephenwolfram","date":"2023-02-14","venue":"Stephen Wolfram Writings","org":"Wolfram Research","fields":["nlp"],"tEn":"What Is ChatGPT Doing … and Why Does It Work?","tZh":"ChatGPT 在做什么……以及它为什么有效？","srcUrl":"https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/","srcLabel":"Stephen Wolfram Writings","addedAt":"2026-07-19T09:25:48Z"},{"id":"lvminzhang-2302.05543","pid":"lvminzhang","arxiv":"2302.05543","date":"2023-02-10","venue":"cs.CV","org":"Stanford","fields":["generative","vision"],"tEn":"Adding Conditional Control to Text-to-Image Diffusion Models","tZh":"向文本到图像扩散模型添加条件控制","cites":7239,"addedAt":"2026-06-29T07:10:23Z"},{"id":"timoschick-2302.04761","pid":"timoschick","arxiv":"2302.04761","date":"2023-02-09","venue":"cs.CL","org":"Meta AI","fields":["nlp"],"tEn":"Toolformer: Language Models Can Teach Themselves to Use Tools","tZh":"Toolformer：语言模型可以自学使用工具","cites":4518,"addedAt":"2026-06-29T15:38:26Z"},{"id":"junnanli-2301.12597","pid":"junnanli","arxiv":"2301.12597","date":"2023-01-30","venue":"cs.CV","org":"Salesforce","fields":["vision","nlp"],"tEn":"BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models","tZh":"BLIP-2：利用冻结的图像编码器和大型语言模型引导语言-图像预训练","cites":8480,"addedAt":"2026-06-28T17:10:59Z"},{"id":"lilianweng-2023-01-27-the-transformer-family-v2","pid":"lilianweng","date":"2023-01-27","venue":"Research","org":"","fields":["nlp","deep-learning"],"tEn":"The Transformer Family Version 2.0","tZh":"Transformer 家族版本 2.0","srcUrl":"https://lilianweng.github.io/posts/2023-01-27-the-transformer-family-v2/","srcLabel":"Article","addedAt":"2026-08-02T07:15:42Z"},{"id":"massran-2301.08243","pid":"massran","arxiv":"2301.08243","date":"2023-01-19","venue":"cs.CV","org":"Meta AI","fields":["vision","deep-learning"],"tEn":"Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture","tZh":"基于联合嵌入预测架构的图像自监督学习","cites":978,"addedAt":"2026-06-29T07:10:23Z"},{"id":"dhafner-2301.04104","pid":"dhafner","arxiv":"2301.04104","date":"2023-01-10","venue":"cs.AI","org":"Google DeepMind / University of Toronto","fields":["rl","generative"],"tEn":"Mastering Diverse Domains through World Models","tZh":"通过世界模型掌握多样领域","cites":1228,"addedAt":"2026-06-29T15:38:26Z"},{"id":"remilam-2212.12794","pid":"remilam","arxiv":"2212.12794","date":"2022-12-24","venue":"cs.LG","org":"Google DeepMind","fields":["deep-learning"],"tEn":"GraphCast: Learning skillful medium-range global weather forecasting","tZh":"GraphCast：学习进行熟练的中期全球天气预报","cites":412,"addedAt":"2026-06-29T07:10:23Z"},{"id":"wpeebles-2212.09748","pid":"wpeebles","arxiv":"2212.09748","date":"2022-12-19","venue":"cs.CV","org":"UC Berkeley / Meta AI","fields":["generative","vision"],"tEn":"Scalable Diffusion Models with Transformers","tZh":"基于 Transformer 的可扩展扩散模型","cites":6480,"addedAt":"2026-06-29T07:10:23Z"},{"id":"anthropic-2212.09251","pid":"anthropic","arxiv":"2212.09251","date":"2022-12-19","venue":"cs.CL","org":"Anthropic","fields":["safety","nlp"],"tEn":"Discovering Language Model Behaviors with Model-Written Evaluations","tZh":"通过模型编写的评估发现语言模型行为","cites":874,"addedAt":"2026-07-01T02:42:13Z"},{"id":"openai-2212.08751","pid":"openai","arxiv":"2212.08751","date":"2022-12-16","venue":"cs.CV","org":"OpenAI","fields":["generative","vision"],"tEn":"Point-E: A System for Generating 3D Point Clouds from Complex Prompts","tZh":"Point-E: 一种从复杂提示生成 3D 点云的系统","cites":863,"addedAt":"2026-07-01T02:42:13Z"},{"id":"ybai-2212.08073","pid":"ybai","arxiv":"2212.08073","date":"2022-12-15","venue":"cs.CL","org":"Anthropic","fields":["safety","nlp"],"tEn":"Constitutional AI: Harmlessness from AI Feedback","tZh":"宪法式 AI：来自 AI 反馈的无害性","cites":3267,"addedAt":"2026-06-29T07:10:23Z"},{"id":"abrohan-2212.06817","pid":"abrohan","arxiv":"2212.06817","date":"2022-12-13","venue":"cs.RO","org":"Google","fields":["deep-learning","vision","robotics"],"tEn":"RT-1: Robotics Transformer for Real-World Control at Scale","tZh":"RT-1：面向大规模真实世界控制的机器人 Transformer","cites":2460,"addedAt":"2026-06-28T17:10:59Z"},{"id":"aradford-2212.04356","pid":"aradford","arxiv":"2212.04356","date":"2022-12-06","venue":"eess.AS","org":"OpenAI","fields":["deep-learning","nlp"],"tEn":"Robust Speech Recognition via Large-Scale Weak Supervision","tZh":"通过大规模弱监督实现鲁棒语音识别","cites":7628,"addedAt":"2026-06-28T17:10:59Z"},{"id":"xinlongwang-2212.02499","pid":"xinlongwang","arxiv":"2212.02499","date":"2022-12-05","venue":"cs.CV","org":"BAAI","fields":["vision","deep-learning","generative"],"tEn":"Images Speak in Images: A Generalist Painter for In-Context Visual Learning","tZh":"图像以图像言说：面向上下文视觉学习的通才画家","cites":382,"addedAt":"2026-07-02T05:39:25Z"},{"id":"songhan-2211.10438","pid":"songhan","arxiv":"2211.10438","date":"2022-11-18","venue":"cs.CL","org":"MIT","fields":["efficiency","nlp"],"tEn":"SmoothQuant: Accurate and Efficient Post-Training Quantization for Large Language Models","tZh":"SmoothQuant：大型语言模型的准确高效训练后量化","cites":1705,"addedAt":"2026-06-29T15:38:26Z"},{"id":"aarongrattafiori-2211.09085","pid":"aarongrattafiori","arxiv":"2211.09085","date":"2022-11-16","venue":"cs.CL","org":"Meta AI","fields":["nlp"],"tEn":"Galactica: A Large Language Model for Science","tZh":"Galactica：面向科学的大型语言模型","cites":1047,"addedAt":"2026-07-01T02:42:13Z"},{"id":"wenhaiwang-2211.05778","pid":"wenhaiwang","arxiv":"2211.05778","date":"2022-11-10","venue":"cs.CV","org":"Shanghai AI Lab","fields":["vision","deep-learning"],"tEn":"InternImage: Exploring Large-Scale Vision Foundation Models with Deformable Convolutions","tZh":"InternImage：利用可变形卷积探索大规模视觉基础模型","cites":1127,"addedAt":"2026-07-02T05:39:25Z"},{"id":"ybai-2211.03540","pid":"ybai","arxiv":"2211.03540","date":"2022-11-04","venue":"cs.HC","org":"Anthropic","fields":["safety","nlp"],"tEn":"Measuring Progress on Scalable Oversight for Large Language Models","tZh":"衡量大型语言模型可扩展监督的进展","cites":218,"addedAt":"2026-07-02T05:39:25Z"},{"id":"lingxixie-2211.02556","pid":"lingxixie","arxiv":"2211.02556","date":"2022-11-03","venue":"physics.ao-ph","org":"Huawei","fields":["deep-learning","vision"],"tEn":"Pangu-Weather: A 3D High-Resolution Model for Fast and Accurate Global Weather Forecast","tZh":"盘古天气：一种用于快速准确全球天气预报的 3D 高分辨率模型","cites":273,"addedAt":"2026-06-29T07:10:23Z"},{"id":"adefossez-2210.13438","pid":"adefossez","arxiv":"2210.13438","date":"2022-10-24","venue":"eess.AS","org":"Meta AI","fields":["deep-learning","efficiency"],"tEn":"High Fidelity Neural Audio Compression","tZh":"高保真神经音频压缩","cites":1223,"addedAt":"2026-06-29T07:10:23Z"},{"id":"aqjiang-2210.12283","pid":"aqjiang","arxiv":"2210.12283","date":"2022-10-21","venue":"cs.AI","org":"University of Cambridge / Meta AI","fields":["nlp","deep-learning","generative"],"tEn":"Draft, Sketch, and Prove: Guiding Formal Theorem Provers with Informal Proofs","tZh":"草稿、草图与证明：用非形式化证明指导形式化定理证明器","cites":326,"addedAt":"2026-07-02T05:39:25Z"},{"id":"hwchung-2210.11416","pid":"hwchung","arxiv":"2210.11416","date":"2022-10-20","venue":"cs.LG","org":"Google","fields":["nlp","deep-learning"],"tEn":"Scaling Instruction-Finetuned Language Models","tZh":"扩展指令微调语言模型","cites":4250,"addedAt":"2026-06-29T07:10:23Z"},{"id":"shunyuyao-2210.03629","pid":"shunyuyao","arxiv":"2210.03629","date":"2022-10-06","venue":"cs.CL","org":"Princeton University / Google","fields":["nlp","rl"],"tEn":"ReAct: Synergizing Reasoning and Acting in Language Models","tZh":"ReAct：在语言模型中协同推理与行动","cites":7645,"addedAt":"2026-06-29T15:38:26Z"},{"id":"jimfan-2210.03094","pid":"jimfan","arxiv":"2210.03094","date":"2022-10-06","venue":"cs.RO","org":"NVIDIA","fields":["rl","vision","deep-learning","robotics"],"tEn":"VIMA: General Robot Manipulation with Multimodal Prompts","tZh":"VIMA：基于多模态提示的通用机器人操作","cites":569,"addedAt":"2026-07-02T05:39:25Z"},{"id":"jietang-2210.02414","pid":"jietang","arxiv":"2210.02414","date":"2022-10-05","venue":"cs.CL","org":"Zhipu AI","fields":["nlp","deep-learning"],"tEn":"GLM-130B: An Open Bilingual Pre-trained Model","tZh":"GLM-130B：一个开放的双语预训练模型","cites":1285,"addedAt":"2026-06-29T15:38:26Z"},{"id":"anthropic-2209.10652","pid":"anthropic","arxiv":"2209.10652","date":"2022-09-21","venue":"cs.LG","fields":["safety"],"tEn":"Toy Models of Superposition","tZh":"叠加的玩具模型","addedAt":"2026-07-30T16:28:32Z","cites":902},{"id":"nzeghidour-2209.03143","pid":"nzeghidour","arxiv":"2209.03143","date":"2022-09-07","venue":"cs.SD","org":"Google","fields":["deep-learning","generative"],"tEn":"AudioLM: a Language Modeling Approach to Audio Generation","tZh":"AudioLM：一种基于语言建模的音频生成方法","cites":976,"addedAt":"2026-06-29T07:10:23Z"},{"id":"openai-approach-to-alignment","pid":"openai","date":"2022-08-24","venue":"OpenAI Research","org":"OpenAI","fields":["safety"],"tEn":"Our approach to alignment research","tZh":"我们对对齐研究的方法","srcUrl":"https://openai.com/index/our-approach-to-alignment-research/","srcLabel":"OpenAI Research","addedAt":"2026-07-11T02:54:52Z"},{"id":"anthropic-2209.07858","pid":"anthropic","arxiv":"2209.07858","date":"2022-08-23","venue":"cs.CL","org":"Anthropic","fields":["safety"],"tEn":"Red Teaming Language Models to Reduce Harms: Methods, Scaling Behaviors, and Lessons Learned","tZh":"红队测试语言模型以减少危害：方法、扩展行为与经验教训","cites":822,"addedAt":"2026-07-01T02:42:13Z"},{"id":"jonathanho-2207.12598","pid":"jonathanho","arxiv":"2207.12598","date":"2022-07-26","venue":"cs.LG","org":"Google","fields":["generative","deep-learning"],"tEn":"Classifier-Free Diffusion Guidance","tZh":"无分类器扩散引导","cites":6634,"addedAt":"2026-06-28T17:10:59Z"},{"id":"anthropic-2207.05221","pid":"anthropic","arxiv":"2207.05221","date":"2022-07-11","venue":"cs.CL","org":"Anthropic","fields":["safety","nlp"],"tEn":"Language Models (Mostly) Know What They Know","tZh":"语言模型（大多）知道它们知道什么","cites":1729,"addedAt":"2026-07-01T02:42:13Z"},{"id":"jimfan-2206.08853","pid":"jimfan","arxiv":"2206.08853","date":"2022-06-17","venue":"cs.LG","org":"NVIDIA","fields":["rl","deep-learning","generative","robotics"],"tEn":"MineDojo: Building Open-Ended Embodied Agents with Internet-Scale Knowledge","tZh":"MineDojo：利用互联网规模知识构建开放式具身智能体","cites":587,"addedAt":"2026-07-02T05:39:25Z"},{"id":"jasonwei-2206.07682","pid":"jasonwei","arxiv":"2206.07682","date":"2022-06-15","venue":"cs.CL","org":"Google","fields":["nlp","deep-learning"],"tEn":"Emergent Abilities of Large Language Models","tZh":"大型语言模型的涌现能力","cites":3651,"addedAt":"2026-06-28T17:10:59Z"},{"id":"junzhu-2206.00927","pid":"junzhu","arxiv":"2206.00927","date":"2022-06-02","venue":"cs.LG","org":"Tsinghua University","fields":["generative","efficiency"],"tEn":"DPM-Solver: A Fast ODE Solver for Diffusion Probabilistic Model Sampling in Around 10 Steps","tZh":"DPM-Solver：一种用于扩散概率模型快速采样的常微分方程求解器","cites":2434,"addedAt":"2026-06-29T15:38:26Z"},{"id":"tkarras-2206.00364","pid":"tkarras","arxiv":"2206.00364","date":"2022-06-01","venue":"cs.CV","fields":["generative"],"tEn":"Elucidating the Design Space of Diffusion-Based Generative Models","tZh":"阐明基于扩散的生成模型的设计空间","addedAt":"2026-08-01T15:11:38Z","cites":3702},{"id":"songhan-2205.14756","pid":"songhan","arxiv":"2205.14756","date":"2022-05-29","venue":"cs.CV","org":"MIT","fields":["efficiency","vision"],"tEn":"EfficientViT: Multi-Scale Linear Attention for High-Resolution Dense Prediction","tZh":"EfficientViT：用于高分辨率密集预测的多尺度线性注意力","cites":106,"addedAt":"2026-06-29T15:38:26Z"},{"id":"tridao-2205.14135","pid":"tridao","arxiv":"2205.14135","date":"2022-05-27","venue":"cs.LG","fields":["efficiency","nlp"],"tEn":"FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness","tZh":"FlashAttention：快速且内存高效的精确注意力机制，具有 IO 感知能力","cites":4671,"org":"Stanford","addedAt":"2026-06-28T11:09:29Z"},{"id":"csaharia-2205.11487","pid":"csaharia","arxiv":"2205.11487","date":"2022-05-23","venue":"cs.CV","org":"Google","fields":["generative","vision"],"tEn":"Photorealistic Text-to-Image Diffusion Models with Deep Language Understanding","tZh":"具有深度语言理解能力的逼真文本到图像扩散模型","cites":8550,"addedAt":"2026-06-29T07:10:23Z"},{"id":"xiaohuazhai-2205.01917","pid":"xiaohuazhai","arxiv":"2205.01917","date":"2022-05-04","venue":"cs.CV","org":"Google","fields":["vision","nlp"],"tEn":"CoCa: Contrastive Captioners are Image-Text Foundation Models","tZh":"CoCa: 对比字幕器是图像-文本基础模型","cites":1771,"addedAt":"2026-06-28T17:10:59Z"},{"id":"tonyfadell-jobs-storytelling-lessons","pid":"tonyfadell","date":"2022-05-03","venue":"Fast Company · Build 节选","org":"Build Collective","fields":["nlp"],"tEn":"These are the storytelling lessons I learned from Steve Jobs","tZh":"我从史蒂夫·乔布斯学到的讲故事技巧","srcUrl":"https://www.fastcompany.com/90747313/steve-jobs-lessons-tony-fadell-build-book-excerpt","srcLabel":"Fast Company · Build 节选","addedAt":"2026-07-19T09:49:28Z"},{"id":"aarongrattafiori-2205.01068","pid":"aarongrattafiori","arxiv":"2205.01068","date":"2022-05-02","venue":"cs.CL","org":"Meta AI","fields":["nlp","efficiency"],"tEn":"OPT: Open Pre-trained Transformer Language Models","tZh":"OPT：开放预训练 Transformer 语言模型","cites":4802,"addedAt":"2026-07-01T02:42:13Z"},{"id":"jbalayrac-2204.14198","pid":"jbalayrac","arxiv":"2204.14198","date":"2022-04-29","venue":"cs.CV","org":"Google DeepMind","fields":["vision","nlp"],"tEn":"Flamingo: a Visual Language Model for Few-Shot Learning","tZh":"Flamingo：一种用于少样本学习的视觉语言模型","cites":6113,"addedAt":"2026-06-28T17:10:59Z"},{"id":"pdhariwal-2204.06125","pid":"pdhariwal","arxiv":"2204.06125","date":"2022-04-13","venue":"cs.CV","org":"OpenAI","fields":["generative","vision"],"tEn":"Hierarchical Text-Conditional Image Generation with CLIP Latents","tZh":"基于 CLIP 潜在向量的层次化文本条件图像生成","cites":9131,"addedAt":"2026-06-28T17:10:59Z"},{"id":"ybai-2204.05862","pid":"ybai","arxiv":"2204.05862","date":"2022-04-12","venue":"cs.CL","org":"Anthropic","fields":["safety","nlp"],"tEn":"Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback","tZh":"通过人类反馈的强化学习训练有益且无害的助手","cites":4175,"addedAt":"2026-07-01T02:42:13Z"},{"id":"jonathanho-2204.03458","pid":"jonathanho","arxiv":"2204.03458","date":"2022-04-07","venue":"cs.CV","org":"Google","fields":["generative","vision"],"tEn":"Video Diffusion Models","tZh":"视频扩散模型","cites":2666,"addedAt":"2026-06-28T17:10:59Z"},{"id":"achowdhery-2204.02311","pid":"achowdhery","arxiv":"2204.02311","date":"2022-04-05","venue":"cs.CL","org":"Google","fields":["nlp","deep-learning"],"tEn":"PaLM: Scaling Language Modeling with Pathways","tZh":"PaLM：通过 Pathways 扩展语言建模","cites":8125,"addedAt":"2026-06-29T07:10:23Z"},{"id":"mahn-2204.01691","pid":"mahn","arxiv":"2204.01691","date":"2022-04-04","venue":"cs.RO","org":"Google","fields":["nlp","rl","robotics"],"tEn":"Do As I Can, Not As I Say: Grounding Language in Robotic Affordances","tZh":"做我能做的，而非说我所想的：将语言扎根于机器人能力","cites":3302,"addedAt":"2026-06-29T07:10:23Z"},{"id":"jhoffmann-2203.15556","pid":"jhoffmann","arxiv":"2203.15556","date":"2022-03-29","venue":"cs.CL","org":"Google DeepMind","fields":["deep-learning","nlp"],"tEn":"Training Compute-Optimal Large Language Models","tZh":"训练计算最优的大型语言模型","cites":3461,"addedAt":"2026-06-29T07:10:23Z"},{"id":"leizhangidea-2203.03605","pid":"leizhangidea","arxiv":"2203.03605","date":"2022-03-07","venue":"cs.CV","org":"IDEA Research / HKUST","fields":["vision","deep-learning"],"tEn":"DINO: DETR with Improved DeNoising Anchor Boxes for End-to-End Object Detection","tZh":"DINO：通过改进的去噪锚框实现端到端目标检测的 DETR","cites":2849,"addedAt":"2026-06-29T15:38:26Z"},{"id":"leike-2203.02155","pid":"leike","arxiv":"2203.02155","date":"2022-03-04","venue":"cs.CL","fields":["safety","nlp"],"tEn":"Training language models to follow instructions with human feedback","tZh":"使用人类反馈训练语言模型遵循指令","cites":21784,"org":"OpenAI","addedAt":"2026-06-28T12:00:54Z"},{"id":"dario-2202.07785","pid":"dario","arxiv":"2202.07785","date":"2022-02-15","venue":"cs.CY","org":"Anthropic","fields":["safety","nlp"],"tEn":"Predictability and Surprise in Large Generative Models","tZh":"大型生成模型中的可预测性与意外性","cites":364,"addedAt":"2026-07-01T12:56:35Z"},{"id":"baevski-2202.03555","pid":"baevski","arxiv":"2202.03555","date":"2022-02-07","venue":"cs.LG","org":"Meta AI","fields":["deep-learning","vision"],"tEn":"data2vec: A General Framework for Self-supervised Learning in Speech, Vision and Language","tZh":"data2vec：语音、视觉和语言自监督学习的通用框架","cites":1180,"addedAt":"2026-06-28T17:10:59Z"},{"id":"jasonwei-2201.11903","pid":"jasonwei","arxiv":"2201.11903","date":"2022-01-28","venue":"cs.CL","org":"Google","fields":["nlp","deep-learning"],"tEn":"Chain-of-Thought Prompting Elicits Reasoning in Large Language Models","tZh":"思维链提示激发大型语言模型的推理能力","cites":19779,"addedAt":"2026-06-28T17:10:59Z"},{"id":"junnanli-2201.12086","pid":"junnanli","arxiv":"2201.12086","date":"2022-01-28","venue":"cs.CV","org":"Salesforce","fields":["vision","nlp"],"tEn":"BLIP: Bootstrapping Language-Image Pre-training for Unified Vision-Language Understanding and Generation","tZh":"BLIP：引导语言-图像预训练实现统一视觉-语言理解与生成","cites":6925,"addedAt":"2026-06-28T17:10:59Z"},{"id":"aradford-2201.10005","pid":"aradford","arxiv":"2201.10005","date":"2022-01-24","venue":"cs.CL","org":"OpenAI","fields":["nlp","deep-learning"],"tEn":"Text and Code Embeddings by Contrastive Pre-Training","tZh":"通过对比预训练学习文本和代码嵌入","cites":601,"addedAt":"2026-07-02T05:39:25Z"},{"id":"zhuangliu-2201.03545","pid":"zhuangliu","arxiv":"2201.03545","date":"2022-01-10","venue":"cs.CV","org":"Meta AI","fields":["vision","deep-learning"],"tEn":"A ConvNet for the 2020s","tZh":"面向 2020 年代的卷积神经网络","cites":8512,"addedAt":"2026-06-29T15:38:26Z"},{"id":"rrombach-2112.10752","pid":"rrombach","arxiv":"2112.10752","date":"2021-12-20","venue":"cs.CV","org":"LMU Munich","fields":["generative","vision"],"tEn":"High-Resolution Image Synthesis with Latent Diffusion Models","tZh":"基于潜在扩散模型的高分辨率图像合成","cites":25840,"addedAt":"2026-06-28T17:10:59Z"},{"id":"openai-2112.09332","pid":"openai","arxiv":"2112.09332","date":"2021-12-17","venue":"cs.CL","org":"OpenAI","fields":["nlp"],"tEn":"WebGPT: Browser-assisted question-answering with human feedback","tZh":"WebGPT：基于浏览器辅助的问答系统与人类反馈优化","cites":1914,"addedAt":"2026-07-01T02:42:13Z"},{"id":"askell-2112.00861","pid":"askell","arxiv":"2112.00861","date":"2021-12-01","venue":"cs.CL","org":"Anthropic","fields":["safety","nlp"],"tEn":"A General Language Assistant as a Laboratory for Alignment","tZh":"通用语言助手作为对齐研究的实验室","cites":1155,"addedAt":"2026-07-05T03:17:49Z"},{"id":"ybai-2112.00861","pid":"ybai","arxiv":"2112.00861","date":"2021-12-01","venue":"cs.CL","org":"Anthropic","fields":["safety","nlp"],"tEn":"A General Language Assistant as a Laboratory for Alignment","tZh":"通用语言助手作为对齐研究的实验室","cites":1155,"addedAt":"2026-07-01T02:42:13Z"},{"id":"zhendaxie-2111.09886","pid":"zhendaxie","arxiv":"2111.09886","date":"2021-11-18","venue":"cs.CV","org":"Microsoft Research Asia","fields":["vision","deep-learning"],"tEn":"SimMIM: A Simple Framework for Masked Image Modeling","tZh":"SimMIM：一种简单的掩码图像建模框架","cites":1842,"addedAt":"2026-06-29T07:10:23Z"},{"id":"jinghaozhou-2111.07832","pid":"jinghaozhou","arxiv":"2111.07832","date":"2021-11-15","venue":"cs.CV","org":"ByteDance Seed","fields":["vision","deep-learning"],"tEn":"iBOT: Image BERT Pre-Training with Online Tokenizer","tZh":"iBOT：基于在线分词器的图像 BERT 预训练","cites":1124,"addedAt":"2026-06-29T07:10:23Z"},{"id":"kaiming-2111.06377","pid":"kaiming","arxiv":"2111.06377","date":"2021-11-11","venue":"cs.CV","fields":["vision","deep-learning"],"tEn":"Masked Autoencoders Are Scalable Vision Learners","tZh":"掩码自编码器是可扩展的视觉学习器","org":"Meta AI","cites":11973,"addedAt":"2026-06-28T15:26:40Z"},{"id":"albertgu-2111.00396","pid":"albertgu","arxiv":"2111.00396","date":"2021-10-31","venue":"cs.LG","org":"Stanford","fields":["deep-learning","efficiency"],"tEn":"Efficiently Modeling Long Sequences with Structured State Spaces","tZh":"使用结构化状态空间高效建模长序列","cites":3926,"addedAt":"2026-07-19T03:56:30Z"},{"id":"openai-2110.14168","pid":"openai","arxiv":"2110.14168","date":"2021-10-27","venue":"cs.LG","org":"OpenAI","fields":["nlp","rl"],"tEn":"Training Verifiers to Solve Math Word Problems","tZh":"训练验证器解决数学应用题","cites":9447,"addedAt":"2026-07-01T02:42:13Z"},{"id":"yejin-2110.07574","pid":"yejin","arxiv":"2110.07574","date":"2021-10-14","venue":"cs.CL","org":"U. Washington","fields":["nlp","safety"],"tEn":"Can Machines Learn Morality? The Delphi Experiment","tZh":"机器能学会道德吗？德尔斐实验","addedAt":"2026-07-02T16:35:31Z","cites":179},{"id":"ofirpress-2108.12409","pid":"ofirpress","arxiv":"2108.12409","date":"2021-08-27","venue":"cs.CL","org":"Allen Institute for AI","fields":["nlp","efficiency"],"tEn":"Train Short, Test Long: Attention with Linear Biases Enables Input Length Extrapolation","tZh":"短训练，长测试：线性偏置注意力实现输入长度外推","cites":1281,"addedAt":"2026-06-29T07:10:23Z"},{"id":"tworek-2107.03374","pid":"tworek","arxiv":"2107.03374","date":"2021-07-07","venue":"cs.LG","org":"OpenAI","fields":["nlp","deep-learning"],"tEn":"Evaluating Large Language Models Trained on Code","tZh":"评估基于代码训练的大型语言模型","cites":10351,"addedAt":"2026-07-05T03:17:49Z"},{"id":"nzeghidour-2107.03312","pid":"nzeghidour","arxiv":"2107.03312","date":"2021-07-07","venue":"cs.SD","org":"Google","fields":["deep-learning","efficiency"],"tEn":"SoundStream: An End-to-End Neural Audio Codec","tZh":"SoundStream: 一种端到端神经音频编解码器","cites":1371,"addedAt":"2026-06-29T07:10:23Z"},{"id":"openai-2107.03374","pid":"openai","arxiv":"2107.03374","date":"2021-07-07","venue":"cs.LG","org":"OpenAI","fields":["nlp","deep-learning"],"tEn":"Evaluating Large Language Models Trained on Code","tZh":"评估基于代码训练的大型语言模型","cites":10351,"addedAt":"2026-07-01T02:42:13Z"},{"id":"wenhaiwang-2106.13797","pid":"wenhaiwang","arxiv":"2106.13797","date":"2021-06-25","venue":"cs.CV","org":"Nanjing University / Shanghai AI Lab","fields":["vision","deep-learning","efficiency"],"tEn":"PVT v2: Improved Baselines with Pyramid Vision Transformer","tZh":"PVT v2：改进的金字塔视觉 Transformer 基线","cites":2465,"addedAt":"2026-07-02T05:39:25Z"},{"id":"tkarras-2106.12423","pid":"tkarras","arxiv":"2106.12423","date":"2021-06-23","venue":"cs.CV","org":"NVIDIA","fields":["generative","deep-learning","vision"],"tEn":"Alias-Free Generative Adversarial Networks","tZh":"无别名生成对抗网络","cites":2057,"addedAt":"2026-07-02T05:39:25Z"},{"id":"furuwei-2106.08254","pid":"furuwei","arxiv":"2106.08254","date":"2021-06-15","venue":"cs.CV","org":"Microsoft","fields":["vision","deep-learning"],"tEn":"BEiT: BERT Pre-Training of Image Transformers","tZh":"BEiT：图像 Transformer 的 BERT 预训练","cites":3728,"addedAt":"2026-06-29T07:10:23Z"},{"id":"abdelmohamed-2106.07447","pid":"abdelmohamed","arxiv":"2106.07447","date":"2021-06-14","venue":"cs.CL","org":"Meta AI","fields":["deep-learning","nlp"],"tEn":"HuBERT: Self-Supervised Speech Representation Learning by Masked Prediction of Hidden Units","tZh":"HuBERT：通过隐藏单元的掩码预测进行自监督语音表示学习","cites":4746,"addedAt":"2026-06-29T07:10:23Z"},{"id":"pdhariwal-2105.05233","pid":"pdhariwal","arxiv":"2105.05233","date":"2021-05-11","venue":"cs.LG","org":"OpenAI","fields":["generative","vision"],"tEn":"Diffusion Models Beat GANs on Image Synthesis","tZh":"扩散模型在图像合成上击败 GAN","cites":12305,"addedAt":"2026-06-29T08:51:28Z"},{"id":"abardes-2105.04906","pid":"abardes","arxiv":"2105.04906","date":"2021-05-11","venue":"cs.CV","org":"Meta AI","fields":["vision","deep-learning"],"tEn":"VICReg: Variance-Invariance-Covariance Regularization for Self-Supervised Learning","tZh":"VICReg：用于自监督学习的方差-不变性-协方差正则化","cites":1309,"addedAt":"2026-06-29T08:51:28Z"},{"id":"mcaron-2104.14294","pid":"mcaron","arxiv":"2104.14294","date":"2021-04-29","venue":"cs.CV","org":"Meta AI","fields":["vision","deep-learning"],"tEn":"Emerging Properties in Self-Supervised Vision Transformers","tZh":"自监督视觉 Transformer 中的涌现特性","cites":9534,"addedAt":"2026-06-28T17:10:59Z"},{"id":"pvelickovic-2104.13478","pid":"pvelickovic","arxiv":"2104.13478","date":"2021-04-27","venue":"cs.LG","fields":["deep-learning"],"tEn":"Geometric Deep Learning: Grids, Groups, Graphs, Geodesics, and Gauges","tZh":"几何深度学习：网格、群、图、测地线与规范","addedAt":"2026-08-01T13:47:43Z","cites":1682},{"id":"jianlinsu-2104.09864","pid":"jianlinsu","arxiv":"2104.09864","date":"2021-04-20","venue":"cs.CL","org":"Zhuiyi Technology","fields":["nlp","deep-learning"],"tEn":"RoFormer: Enhanced Transformer with Rotary Position Embedding","tZh":"RoFormer: 增强型 Transformer 与旋转位置嵌入","cites":5727,"addedAt":"2026-06-29T07:10:23Z"},{"id":"zeliu-2103.14030","pid":"zeliu","arxiv":"2103.14030","date":"2021-03-25","venue":"cs.CV","org":"Microsoft Research Asia","fields":["vision","deep-learning"],"tEn":"Swin Transformer: Hierarchical Vision Transformer using Shifted Windows","tZh":"Swin Transformer：使用移位窗口的分层视觉 Transformer","cites":33420,"addedAt":"2026-06-29T15:38:26Z"},{"id":"jietang-2103.10360","pid":"jietang","arxiv":"2103.10360","date":"2021-03-18","venue":"cs.CL","org":"Tsinghua University","fields":["nlp","deep-learning","generative"],"tEn":"GLM: General Language Model Pretraining with Autoregressive Blank Infilling","tZh":"GLM：基于自回归空白填充的通用语言模型预训练","cites":1944,"addedAt":"2026-07-02T05:39:25Z"},{"id":"jietang-2103.10385","pid":"jietang","arxiv":"2103.10385","date":"2021-03-18","venue":"cs.CL","org":"Tsinghua University","fields":["nlp","deep-learning","efficiency"],"tEn":"GPT Understands, Too","tZh":"GPT 也能理解：P-Tuning——用可训练的连续提示嵌入提升自然语言理解性能","cites":1450,"addedAt":"2026-07-02T05:39:25Z"},{"id":"sam-moores-law-for-everything","pid":"sam","date":"2021-03-16","venue":"Sam Altman Essay","org":"OpenAI","fields":["safety"],"tEn":"Moore's Law for Everything","tZh":"万物摩尔定律","srcUrl":"https://moores.samaltman.com/","srcLabel":"Sam Altman Essay","addedAt":"2026-07-12T08:44:26Z"},{"id":"lecun-2103.03230","pid":"lecun","arxiv":"2103.03230","date":"2021-03-04","venue":"cs.CV","fields":["vision","deep-learning"],"tEn":"Barlow Twins: Self-Supervised Learning via Redundancy Reduction","tZh":"Barlow Twins: 通过冗余减少实现自监督学习","cites":3066,"org":"Meta AI","addedAt":"2026-06-28T12:00:54Z"},{"id":"aradford-2103.00020","pid":"aradford","arxiv":"2103.00020","date":"2021-02-26","venue":"cs.CV","org":"OpenAI","fields":["vision","nlp"],"tEn":"Learning Transferable Visual Models From Natural Language Supervision","tZh":"从自然语言监督中学习可迁移的视觉模型","cites":51496,"addedAt":"2026-06-28T17:10:59Z"},{"id":"pingluo-2102.12122","pid":"pingluo","arxiv":"2102.12122","date":"2021-02-24","venue":"cs.CV","org":"The University of Hong Kong / Nanjing University","fields":["vision","deep-learning"],"tEn":"Pyramid Vision Transformer: A Versatile Backbone for Dense Prediction without Convolutions","tZh":"金字塔视觉 Transformer：无需卷积的密集预测通用骨干网络","cites":5093,"addedAt":"2026-06-29T15:38:26Z"},{"id":"aradford-2102.12092","pid":"aradford","arxiv":"2102.12092","date":"2021-02-24","venue":"cs.CV","org":"OpenAI","fields":["generative","vision"],"tEn":"Zero-Shot Text-to-Image Generation","tZh":"零样本文本到图像生成","cites":6535,"addedAt":"2026-07-01T02:42:13Z"},{"id":"chaojia-2102.05918","pid":"chaojia","arxiv":"2102.05918","date":"2021-02-11","venue":"cs.CV","org":"Google","fields":["vision","nlp"],"tEn":"Scaling Up Visual and Vision-Language Representation Learning With Noisy Text Supervision","tZh":"利用噪声文本监督扩展视觉和视觉-语言表示学习","cites":5678,"addedAt":"2026-06-29T07:10:23Z"},{"id":"fedus-2101.03961","pid":"fedus","arxiv":"2101.03961","date":"2021-01-11","venue":"cs.LG","fields":["nlp","efficiency"],"tEn":"Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity","tZh":"Switch Transformers：通过简单高效的稀疏性扩展到万亿参数模型","org":"Google","cites":4212,"addedAt":"2026-06-28T11:09:29Z"},{"id":"xiangyuzhang-2101.03697","pid":"xiangyuzhang","arxiv":"2101.03697","date":"2021-01-11","venue":"cs.CV","org":"MEGVII (Face++) / Tsinghua University","fields":["vision","efficiency"],"tEn":"RepVGG: Making VGG-style ConvNets Great Again","tZh":"RepVGG：让 VGG 风格的卷积网络再次伟大","cites":2366,"addedAt":"2026-06-29T15:38:26Z"},{"id":"deepmind-alphafold","pid":"deepmind","date":"2020-11-30","venue":"DeepMind Blog","org":"Google DeepMind","fields":["deep-learning"],"tEn":"AlphaFold: a solution to a 50-year-old grand challenge in biology — Google DeepMind","tZh":"AlphaFold：生物学 50 年重大挑战的解决方案——Google DeepMind","srcUrl":"https://deepmind.google/discover/blog/alphafold-a-solution-to-a-50-year-old-grand-challenge-in-biology/","srcLabel":"DeepMind Blog","addedAt":"2026-07-11T02:54:52Z"},{"id":"yangsong-2011.13456","pid":"yangsong","arxiv":"2011.13456","date":"2020-11-26","venue":"cs.LG","org":"Stanford","fields":["generative","deep-learning"],"tEn":"Score-Based Generative Modeling through Stochastic Differential Equations","tZh":"基于随机微分方程的分数生成建模","cites":11261,"addedAt":"2026-06-28T17:10:59Z"},{"id":"kaplan-2010.14701","pid":"kaplan","arxiv":"2010.14701","date":"2020-10-28","venue":"cs.LG","org":"OpenAI","fields":["deep-learning","generative"],"tEn":"Scaling Laws for Autoregressive Generative Modeling","tZh":"自回归生成建模的缩放定律","cites":632,"addedAt":"2026-07-01T02:42:13Z"},{"id":"adosovitskiy-2010.11929","pid":"adosovitskiy","arxiv":"2010.11929","date":"2020-10-22","venue":"cs.CV","org":"Google","fields":["vision","deep-learning"],"tEn":"An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale","tZh":"一张图片等价于 16x16 个词：用于大规模图像识别的 Transformer","cites":65359,"addedAt":"2026-06-28T17:10:59Z"},{"id":"jifengdai-2010.04159","pid":"jifengdai","arxiv":"2010.04159","date":"2020-10-08","venue":"cs.CV","org":"SenseTime Research / USTC","fields":["vision","deep-learning"],"tEn":"Deformable DETR: Deformable Transformers for End-to-End Object Detection","tZh":"可变形 DETR：用于端到端目标检测的可变形 Transformer","cites":7789,"addedAt":"2026-06-29T15:38:26Z"},{"id":"sermon-2010.02502","pid":"sermon","arxiv":"2010.02502","date":"2020-10-06","venue":"cs.LG","org":"Stanford","fields":["generative","efficiency"],"tEn":"Denoising Diffusion Implicit Models","tZh":"去噪扩散隐式模型","cites":12613,"addedAt":"2026-06-28T17:10:59Z"},{"id":"kchoroman-2009.14794","pid":"kchoroman","arxiv":"2009.14794","date":"2020-09-30","venue":"cs.LG","org":"Google","fields":["efficiency","deep-learning"],"tEn":"Rethinking Attention with Performers","tZh":"重新思考注意力机制：Performer","cites":2330,"addedAt":"2026-06-29T07:10:23Z"},{"id":"louyang-2009.01325","pid":"louyang","arxiv":"2009.01325","date":"2020-09-02","venue":"cs.CL","org":"OpenAI","fields":["nlp","rl"],"tEn":"Learning to summarize from human feedback","tZh":"从人类反馈中学习摘要生成","cites":3254,"addedAt":"2026-06-28T17:10:59Z"},{"id":"akatharo-2006.16236","pid":"akatharo","arxiv":"2006.16236","date":"2020-06-29","venue":"cs.LG","org":"Idiap Research Institute / EPFL","fields":["efficiency","deep-learning"],"tEn":"Transformers are RNNs: Fast Autoregressive Transformers with Linear Attention","tZh":"Transformer 是 RNN：具有线性注意力的快速自回归 Transformer","cites":2903,"addedAt":"2026-06-29T08:51:28Z"},{"id":"baevski-2006.11477","pid":"baevski","arxiv":"2006.11477","date":"2020-06-20","venue":"cs.CL","org":"Meta AI","fields":["deep-learning","nlp"],"tEn":"wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations","tZh":"wav2vec 2.0：一种自监督学习语音表示的框架","cites":8670,"addedAt":"2026-06-28T17:10:59Z"},{"id":"jonathanho-2006.11239","pid":"jonathanho","arxiv":"2006.11239","date":"2020-06-19","venue":"cs.LG","org":"UC Berkeley","fields":["generative","deep-learning"],"tEn":"Denoising Diffusion Probabilistic Models","tZh":"去噪扩散概率模型","cites":32563,"addedAt":"2026-06-28T17:10:59Z"},{"id":"mcaron-2006.09882","pid":"mcaron","arxiv":"2006.09882","date":"2020-06-17","venue":"cs.CV","org":"Meta AI","fields":["vision","deep-learning"],"tEn":"Unsupervised Learning of Visual Features by Contrasting Cluster Assignments","tZh":"通过对比聚类分配进行视觉特征的无监督学习","cites":5059,"addedAt":"2026-06-28T17:10:59Z"},{"id":"jbgrill-2006.07733","pid":"jbgrill","arxiv":"2006.07733","date":"2020-06-13","venue":"cs.LG","org":"Google DeepMind","fields":["vision","deep-learning"],"tEn":"Bootstrap your own latent: A new approach to self-supervised Learning","tZh":"自举你的潜在表示：一种新的自监督学习方法","cites":8693,"addedAt":"2026-06-29T07:10:23Z"},{"id":"gwern-scaling-hypothesis","pid":"gwern","date":"2020-05-28","venue":"Gwern.net","org":"","fields":["nlp","deep-learning"],"tEn":"The Scaling Hypothesis","tZh":"规模假设","srcUrl":"https://gwern.net/scaling-hypothesis","srcLabel":"Gwern.net","addedAt":"2026-07-19T09:25:48Z"},{"id":"tombrown-2005.14165","pid":"tombrown","arxiv":"2005.14165","date":"2020-05-28","venue":"cs.CL","org":"OpenAI","fields":["nlp","deep-learning"],"tEn":"Language Models are Few-Shot Learners","tZh":"语言模型是少样本学习者","cites":60219,"addedAt":"2026-07-05T03:17:49Z"},{"id":"aradford-2005.14165","pid":"aradford","arxiv":"2005.14165","date":"2020-05-28","venue":"cs.CL","org":"OpenAI","fields":["nlp","deep-learning"],"tEn":"Language Models are Few-Shot Learners","tZh":"语言模型是少样本学习者","cites":60219,"addedAt":"2026-07-01T02:42:13Z"},{"id":"ncarion-2005.12872","pid":"ncarion","arxiv":"2005.12872","date":"2020-05-26","venue":"cs.CV","org":"Meta AI","fields":["vision","deep-learning"],"tEn":"End-to-End Object Detection with Transformers","tZh":"端到端目标检测与 Transformer","cites":18832,"addedAt":"2026-06-29T07:10:23Z"},{"id":"gulati-2005.08100","pid":"gulati","arxiv":"2005.08100","date":"2020-05-16","venue":"eess.AS","org":"Google","fields":["deep-learning","nlp"],"tEn":"Conformer: Convolution-augmented Transformer for Speech Recognition","tZh":"Conformer: 用于语音识别的卷积增强 Transformer","cites":4161,"addedAt":"2026-06-29T08:51:28Z"},{"id":"pdhariwal-2005.00341","pid":"pdhariwal","arxiv":"2005.00341","date":"2020-04-30","venue":"eess.AS","org":"OpenAI","fields":["generative"],"tEn":"Jukebox: A Generative Model for Music","tZh":"Jukebox：一种生成音乐的生成模型","cites":970,"addedAt":"2026-07-01T02:42:13Z"},{"id":"izbeltagy-2004.05150","pid":"izbeltagy","arxiv":"2004.05150","date":"2020-04-10","venue":"cs.CL","org":"Allen Institute for AI","fields":["nlp","efficiency"],"tEn":"Longformer: The Long-Document Transformer","tZh":"Longformer: 长文档 Transformer","cites":5634,"addedAt":"2026-06-29T07:10:23Z"},{"id":"kevinclarknlp-2003.10555","pid":"kevinclarknlp","arxiv":"2003.10555","date":"2020-03-23","venue":"cs.CL","org":"Stanford","fields":["nlp","efficiency"],"tEn":"ELECTRA: Pre-training Text Encoders as Discriminators Rather Than Generators","tZh":"ELECTRA：将文本编码器预训练为判别器而非生成器","addedAt":"2026-06-29T07:10:23Z"},{"id":"xbresson-2003.00982","pid":"xbresson","arxiv":"2003.00982","date":"2020-03-02","venue":"cs.LG","org":"NTU Singapore","fields":["deep-learning"],"tEn":"Benchmarking Graph Neural Networks","tZh":"图神经网络基准测试","cites":1212,"addedAt":"2026-06-29T07:10:23Z"},{"id":"shazeer-2002.05202","pid":"shazeer","arxiv":"2002.05202","date":"2020-02-12","venue":"cs.LG","org":"Google","fields":["deep-learning","nlp","efficiency"],"tEn":"GLU Variants Improve Transformer","tZh":"GLU 变体改进 Transformer","cites":2011,"addedAt":"2026-07-02T05:39:25Z"},{"id":"kaplan-2001.08361","pid":"kaplan","arxiv":"2001.08361","date":"2020-01-23","venue":"cs.LG","fields":["nlp"],"tEn":"Scaling Laws for Neural Language Models","tZh":"神经语言模型的缩放定律","cites":8416,"org":"OpenAI","addedAt":"2026-06-28T11:09:29Z"},{"id":"ilya-1912.02292","pid":"ilya","arxiv":"1912.02292","date":"2019-12-04","venue":"cs.LG","org":"OpenAI","fields":["deep-learning"],"tEn":"Deep Double Descent: Where Bigger Models and More Data Hurt","tZh":"深度双重下降：更大的模型和更多的数据反而有害","cites":1152,"addedAt":"2026-07-02T16:35:31Z"},{"id":"tkarras-1912.04958","pid":"tkarras","arxiv":"1912.04958","date":"2019-12-03","venue":"cs.CV","org":"NVIDIA","fields":["generative","vision"],"tEn":"Analyzing and Improving the Image Quality of StyleGAN","tZh":"分析并提升 StyleGAN 的图像质量","cites":7069,"addedAt":"2026-06-28T17:10:59Z"},{"id":"dhafner-1912.01603","pid":"dhafner","arxiv":"1912.01603","date":"2019-12-03","venue":"cs.LG","org":"Google DeepMind","fields":["rl","generative"],"tEn":"Dream to Control: Learning Behaviors by Latent Imagination","tZh":"梦想控制：通过潜在想象学习行为","cites":2052,"addedAt":"2026-06-29T07:10:23Z"},{"id":"jschritt-1911.08265","pid":"jschritt","arxiv":"1911.08265","date":"2019-11-19","venue":"cs.LG","org":"Google DeepMind","fields":["rl","deep-learning"],"tEn":"Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model","tZh":"通过规划掌握雅达利、围棋、国际象棋和将棋：基于学习模型的方法","cites":2586,"addedAt":"2026-06-28T17:10:59Z"},{"id":"rgirshick-1911.05722","pid":"rgirshick","arxiv":"1911.05722","date":"2019-11-13","venue":"cs.CV","org":"Facebook AI Research (FAIR)","fields":["vision","deep-learning"],"tEn":"Momentum Contrast for Unsupervised Visual Representation Learning","tZh":"动量对比：用于无监督视觉表示学习","cites":15197,"addedAt":"2026-07-02T05:39:25Z"},{"id":"craffel-1910.10683","pid":"craffel","arxiv":"1910.10683","date":"2019-10-23","venue":"cs.LG","org":"Google","fields":["nlp","deep-learning"],"tEn":"Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer","tZh":"探索迁移学习的极限：基于统一的文本到文本转换器","cites":26385,"addedAt":"2026-06-28T17:10:59Z"},{"id":"zhenzhonglan-1909.11942","pid":"zhenzhonglan","arxiv":"1909.11942","date":"2019-09-26","venue":"cs.CL","org":"Google Research / Toyota Technological Institute at Chicago","fields":["nlp","efficiency"],"tEn":"ALBERT: A Lite BERT for Self-supervised Learning of Language Representations","tZh":"ALBERT：一种用于语言表示自监督学习的轻量级 BERT","cites":7559,"addedAt":"2026-06-29T07:10:23Z"},{"id":"openai-1909.07528","pid":"openai","arxiv":"1909.07528","date":"2019-09-17","venue":"cs.LG","org":"OpenAI","fields":["rl"],"tEn":"Emergent Tool Use From Multi-Agent Autocurricula","tZh":"多智能体自动课程中的涌现工具使用","cites":765,"addedAt":"2026-07-01T02:42:13Z"},{"id":"songhan-1908.09791","pid":"songhan","arxiv":"1908.09791","date":"2019-08-26","venue":"cs.LG","org":"MIT","fields":["efficiency","deep-learning"],"tEn":"Once-for-All: Train One Network and Specialize it for Efficient Deployment","tZh":"一次训练，处处可用：训练一个网络，专用于高效部署","cites":1575,"addedAt":"2026-06-29T15:38:26Z"},{"id":"jwang-1908.07919","pid":"jwang","arxiv":"1908.07919","date":"2019-08-20","venue":"cs.CV","org":"Microsoft Research Asia","fields":["vision","deep-learning"],"tEn":"Deep High-Resolution Representation Learning for Visual Recognition","tZh":"用于视觉识别的深度高分辨率表示学习","cites":4807,"addedAt":"2026-06-29T07:10:23Z"},{"id":"liyuanliu-1908.03265","pid":"liyuanliu","arxiv":"1908.03265","date":"2019-08-08","venue":"cs.LG","org":"UIUC / Microsoft","fields":["deep-learning","efficiency"],"tEn":"On the Variance of the Adaptive Learning Rate and Beyond","tZh":"自适应学习率的方差及其改进","cites":2262,"addedAt":"2026-06-29T08:51:28Z"},{"id":"yinhanliu-1907.11692","pid":"yinhanliu","arxiv":"1907.11692","date":"2019-07-26","venue":"cs.CL","org":"Meta AI","fields":["nlp"],"tEn":"RoBERTa: A Robustly Optimized BERT Pretraining Approach","tZh":"RoBERTa：一种稳健优化的 BERT 预训练方法","cites":30241,"addedAt":"2026-06-29T07:10:23Z"},{"id":"yangsong-1907.05600","pid":"yangsong","arxiv":"1907.05600","date":"2019-07-12","venue":"cs.LG","org":"Stanford","fields":["generative","deep-learning"],"tEn":"Generative Modeling by Estimating Gradients of the Data Distribution","tZh":"通过估计数据分布的梯度进行生成建模","cites":5692,"addedAt":"2026-06-28T17:10:59Z"},{"id":"zhilinyang-1906.08237","pid":"zhilinyang","arxiv":"1906.08237","date":"2019-06-19","venue":"cs.CL","org":"CMU","fields":["nlp","deep-learning"],"tEn":"XLNet: Generalized Autoregressive Pretraining for Language Understanding","tZh":"XLNet：面向语言理解的广义自回归预训练","cites":9431,"addedAt":"2026-06-28T17:10:59Z"},{"id":"yejin-1906.05317","pid":"yejin","arxiv":"1906.05317","date":"2019-06-12","venue":"cs.CL","org":"U. Washington","fields":["nlp"],"tEn":"COMET: Commonsense Transformers for Automatic Knowledge Graph Construction","tZh":"COMET：用于自动知识图谱构建的常识变换器","cites":1038,"addedAt":"2026-07-02T16:35:31Z"},{"id":"yiren-1905.09263","pid":"yiren","arxiv":"1905.09263","date":"2019-05-22","venue":"cs.CL","org":"Microsoft Research / Zhejiang University","fields":["deep-learning","generative"],"tEn":"FastSpeech: Fast, Robust and Controllable Text to Speech","tZh":"FastSpeech: 快速、鲁棒且可控的文本到语音合成","addedAt":"2026-06-29T08:51:28Z"},{"id":"karpathy-recipe","pid":"karpathy","date":"2019-04-25","venue":"Research","org":"","fields":["nlp","deep-learning"],"tEn":"A Recipe for Training Neural Networks","tZh":"训练神经网络的秘诀","srcUrl":"https://karpathy.github.io/2019/04/25/recipe/","srcLabel":"Article","addedAt":"2026-08-02T07:05:33Z"},{"id":"aradford-1904.10509","pid":"aradford","arxiv":"1904.10509","date":"2019-04-23","venue":"cs.LG","org":"OpenAI","fields":["efficiency","generative"],"tEn":"Generating Long Sequences with Sparse Transformers","tZh":"利用稀疏 Transformer 生成长序列","cites":2553,"addedAt":"2026-07-01T02:42:13Z"},{"id":"yejin-1904.09751","pid":"yejin","arxiv":"1904.09751","date":"2019-04-22","venue":"cs.CL","org":"U. Washington","fields":["nlp","generative"],"tEn":"The Curious Case of Neural Text Degeneration","tZh":"神经文本退化的奇特案例","cites":4318,"addedAt":"2026-07-02T16:35:31Z"},{"id":"skale-1904.09237","pid":"skale","arxiv":"1904.09237","date":"2019-04-19","venue":"cs.LG","org":"Google","fields":["deep-learning","efficiency"],"tEn":"On the Convergence of Adam and Beyond","tZh":"论 Adam 及其变体的收敛性","cites":2974,"addedAt":"2026-06-29T07:10:23Z"},{"id":"yangyou-1904.00962","pid":"yangyou","arxiv":"1904.00962","date":"2019-04-01","venue":"cs.LG","org":"Google / UC Berkeley","fields":["deep-learning","efficiency"],"tEn":"Large Batch Optimization for Deep Learning: Training BERT in 76 minutes","tZh":"大规模批量优化用于深度学习：76 分钟训练 BERT","cites":1213,"addedAt":"2026-06-29T07:10:23Z"},{"id":"tpark-1903.07291","pid":"tpark","arxiv":"1903.07291","date":"2019-03-18","venue":"cs.CV","org":"UC Berkeley / NVIDIA","fields":["generative","vision"],"tEn":"Semantic Image Synthesis with Spatially-Adaptive Normalization","tZh":"语义图像合成与空间自适应归一化","cites":3147,"addedAt":"2026-06-29T07:10:23Z"},{"id":"richsutton-bitter-lesson","pid":"richsutton","date":"2019-03-13","venue":"Incomplete Ideas","org":"U. Alberta","fields":["deep-learning","rl"],"tEn":"The Bitter Lesson","tZh":"苦涩的教训","srcUrl":"http://www.incompleteideas.net/IncIdeas/BitterLesson.html","srcLabel":"Incomplete Ideas","addedAt":"2026-07-19T04:13:43Z"},{"id":"jwang-1902.09212","pid":"jwang","arxiv":"1902.09212","date":"2019-02-25","venue":"cs.CV","org":"Microsoft Research Asia / USTC","fields":["vision","deep-learning"],"tEn":"Deep High-Resolution Representation Learning for Human Pose Estimation","tZh":"深度高分辨率表示学习用于人体姿态估计","cites":5157,"addedAt":"2026-06-29T15:38:26Z"},{"id":"zihangdai-1901.02860","pid":"zihangdai","arxiv":"1901.02860","date":"2019-01-09","venue":"cs.LG","org":"Carnegie Mellon University / Google","fields":["nlp","deep-learning"],"tEn":"Transformer-XL: Attentive Language Models Beyond a Fixed-Length Context","tZh":"Transformer-XL：超越固定长度上下文的注意力语言模型","cites":4393,"addedAt":"2026-06-29T07:10:23Z"},{"id":"dario-1812.06162","pid":"dario","arxiv":"1812.06162","date":"2018-12-14","venue":"cs.LG","org":"OpenAI","fields":["deep-learning","efficiency"],"tEn":"An Empirical Model of Large-Batch Training","tZh":"大规模批量训练的实证模型","cites":413,"addedAt":"2026-07-01T12:56:35Z"},{"id":"tkarras-1812.04948","pid":"tkarras","arxiv":"1812.04948","date":"2018-12-12","venue":"cs.NE","org":"NVIDIA","fields":["generative","vision"],"tEn":"A Style-Based Generator Architecture for Generative Adversarial Networks","tZh":"一种基于风格的生成对抗网络生成器架构","cites":13178,"addedAt":"2026-06-28T17:10:59Z"},{"id":"dario-1810.08575","pid":"dario","arxiv":"1810.08575","date":"2018-10-19","venue":"cs.LG","org":"OpenAI","fields":["safety"],"tEn":"Supervising strong learners by amplifying weak experts","tZh":"通过增强弱专家来监督强学习者","cites":174,"addedAt":"2026-07-01T12:56:35Z"},{"id":"jdevlin-1810.04805","pid":"jdevlin","arxiv":"1810.04805","date":"2018-10-11","venue":"cs.CL","org":"Google","fields":["nlp","deep-learning"],"tEn":"BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding","tZh":"BERT: 深度双向 Transformer 预训练语言理解模型","cites":117033,"addedAt":"2026-07-01T02:42:13Z"},{"id":"kxu-1810.00826","pid":"kxu","arxiv":"1810.00826","date":"2018-10-01","venue":"cs.LG","org":"MIT","fields":["deep-learning"],"tEn":"How Powerful are Graph Neural Networks?","tZh":"图神经网络有多强大？","cites":10032,"addedAt":"2026-06-29T07:10:23Z"},{"id":"abrock-1809.11096","pid":"abrock","arxiv":"1809.11096","date":"2018-09-28","venue":"cs.LG","org":"DeepMind / Heriot-Watt University","fields":["generative","vision"],"tEn":"Large Scale GAN Training for High Fidelity Natural Image Synthesis","tZh":"大规模 GAN 训练实现高保真自然图像合成","cites":6171,"addedAt":"2026-06-29T07:10:23Z"},{"id":"zhilinyang-1809.09600","pid":"zhilinyang","arxiv":"1809.09600","date":"2018-09-25","venue":"cs.CL","org":"Carnegie Mellon University / Stanford / MILA","fields":["nlp","deep-learning"],"tEn":"HotpotQA: A Dataset for Diverse, Explainable Multi-hop Question Answering","tZh":"HotpotQA：一个多样化、可解释的多跳问答数据集","cites":4817,"addedAt":"2026-07-02T05:39:25Z"},{"id":"jleskovec-1806.08804","pid":"jleskovec","arxiv":"1806.08804","date":"2018-06-22","venue":"cs.LG","org":"Stanford","fields":["deep-learning"],"tEn":"Hierarchical Graph Representation Learning with Differentiable Pooling","tZh":"基于可微分池化的层次化图表示学习","cites":2527,"addedAt":"2026-06-28T17:10:59Z"},{"id":"pbattaglia-1806.01261","pid":"pbattaglia","arxiv":"1806.01261","date":"2018-06-04","venue":"cs.LG","org":"Google DeepMind","fields":["deep-learning","rl"],"tEn":"Relational inductive biases, deep learning, and graph networks","tZh":"关系归纳偏置、深度学习与图网络","cites":3631,"addedAt":"2026-06-28T17:10:59Z"},{"id":"amadry-1805.11604","pid":"amadry","arxiv":"1805.11604","date":"2018-05-29","venue":"stat.ML","org":"MIT","fields":["deep-learning"],"tEn":"How Does Batch Normalization Help Optimization?","tZh":"批归一化如何帮助优化？","cites":1733,"addedAt":"2026-06-29T07:10:23Z"},{"id":"goodfellow-1805.08318","pid":"goodfellow","arxiv":"1805.08318","date":"2018-05-21","venue":"stat.ML","org":"Google","fields":["generative","vision"],"tEn":"Self-Attention Generative Adversarial Networks","tZh":"自注意力生成对抗网络","cites":4133,"addedAt":"2026-06-28T17:10:59Z"},{"id":"dario-1805.00899","pid":"dario","arxiv":"1805.00899","date":"2018-05-02","venue":"stat.ML","org":"OpenAI","fields":["safety"],"tEn":"AI safety via debate","tZh":"通过辩论实现 AI 安全","cites":413,"addedAt":"2026-07-01T12:56:35Z"},{"id":"shazeer-1804.04235","pid":"shazeer","arxiv":"1804.04235","date":"2018-04-11","venue":"cs.LG","org":"Google","fields":["efficiency","deep-learning"],"tEn":"Adafactor: Adaptive Learning Rates with Sublinear Memory Cost","tZh":"Adafactor: 具有次线性内存成本的自适应学习率","cites":1308,"addedAt":"2026-07-02T05:39:25Z"},{"id":"jredmon-1804.02767","pid":"jredmon","arxiv":"1804.02767","date":"2018-04-08","venue":"cs.CV","org":"U. Washington","fields":["vision","efficiency"],"tEn":"YOLOv3: An Incremental Improvement","tZh":"YOLOv3：一项渐进式改进","cites":25506,"addedAt":"2026-06-28T17:10:59Z"},{"id":"dha-1803.10122","pid":"dha","arxiv":"1803.10122","date":"2018-03-27","venue":"cs.LG","org":"Google","fields":["rl","generative"],"tEn":"World Models","tZh":"世界模型","cites":1858,"addedAt":"2026-06-29T07:10:23Z"},{"id":"tmiyato-1802.05957","pid":"tmiyato","arxiv":"1802.05957","date":"2018-02-16","venue":"cs.LG","org":"Preferred Networks","fields":["generative","deep-learning"],"tEn":"Spectral Normalization for Generative Adversarial Networks","tZh":"生成对抗网络的谱归一化","cites":5038,"addedAt":"2026-06-29T07:10:23Z"},{"id":"mpeters-1802.05365","pid":"mpeters","arxiv":"1802.05365","date":"2018-02-15","venue":"cs.CL","org":"Allen Institute for AI","fields":["nlp","deep-learning"],"tEn":"Deep contextualized word representations","tZh":"深度上下文词表示","cites":12188,"addedAt":"2026-06-28T17:10:59Z"},{"id":"lcchen-1802.02611","pid":"lcchen","arxiv":"1802.02611","date":"2018-02-07","venue":"cs.CV","org":"Google","fields":["vision","deep-learning"],"tEn":"Encoder-Decoder with Atrous Separable Convolution for Semantic Image Segmentation","tZh":"基于空洞可分离卷积的编码器-解码器用于语义图像分割","cites":16970,"addedAt":"2026-06-29T07:10:23Z"},{"id":"mbronstein-1801.07829","pid":"mbronstein","arxiv":"1801.07829","date":"2018-01-24","venue":"cs.CV","org":"Imperial College","fields":["vision","deep-learning"],"tEn":"Dynamic Graph CNN for Learning on Point Clouds","tZh":"动态图卷积网络用于点云学习","cites":7642,"addedAt":"2026-06-28T17:10:59Z"},{"id":"sruder-1801.06146","pid":"sruder","arxiv":"1801.06146","date":"2018-01-18","venue":"cs.CL","org":"fast.ai / Insight (NUI Galway)","fields":["nlp"],"tEn":"Universal Language Model Fine-tuning for Text Classification","tZh":"通用语言模型微调用于文本分类","cites":284,"addedAt":"2026-06-29T07:10:23Z"},{"id":"abbeel-1801.01290","pid":"abbeel","arxiv":"1801.01290","date":"2018-01-04","venue":"cs.LG","fields":["rl"],"tEn":"Soft Actor-Critic: Off-Policy Maximum Entropy Deep Reinforcement Learning with a Stochastic Actor","tZh":"软演员-评论家：基于随机演员的离策略最大熵深度强化学习","cites":11630,"org":"UC Berkeley","addedAt":"2026-06-28T12:00:54Z"},{"id":"jshen-1712.05884","pid":"jshen","arxiv":"1712.05884","date":"2017-12-16","venue":"cs.CL","org":"Google","fields":["deep-learning","generative"],"tEn":"Natural TTS Synthesis by Conditioning WaveNet on Mel Spectrogram Predictions","tZh":"通过将 WaveNet 条件化于梅尔频谱预测的自然 TTS 合成","cites":3107,"addedAt":"2026-06-29T07:10:23Z"},{"id":"antonoglou-1712.01815","pid":"antonoglou","arxiv":"1712.01815","date":"2017-12-05","venue":"cs.AI","fields":["rl"],"tEn":"Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm","tZh":"通过通用强化学习算法的自我对弈掌握国际象棋和将棋","cites":2101,"org":"Google DeepMind","addedAt":"2026-07-05T03:17:49Z"},{"id":"demis-1712.01815","pid":"demis","arxiv":"1712.01815","date":"2017-12-05","venue":"cs.AI","fields":["rl"],"tEn":"Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm","tZh":"通过通用强化学习算法的自我对弈掌握国际象棋和将棋","cites":2101,"org":"Google DeepMind","addedAt":"2026-06-28T12:00:54Z"},{"id":"fchollet-impossibility-intelligence-explosion","pid":"fchollet","date":"2017-11-27","venue":"Chollet Essay","org":"Google","fields":["safety","nlp"],"tEn":"The impossibility of intelligence explosion","tZh":"智能爆炸的不可能性","srcUrl":"https://medium.com/@francois.chollet/the-impossibility-of-intelligence-explosion-5be4a9eda6ec","srcLabel":"Chollet Essay","addedAt":"2026-07-19T09:25:48Z"},{"id":"yunjeychoi-1711.09020","pid":"yunjeychoi","arxiv":"1711.09020","date":"2017-11-24","venue":"cs.CV","org":"Korea University / Clova AI Research","fields":["generative","vision"],"tEn":"StarGAN: Unified Generative Adversarial Networks for Multi-Domain Image-to-Image Translation","tZh":"StarGAN：用于多域图像到图像翻译的统一生成对抗网络","cites":3898,"addedAt":"2026-06-29T08:51:28Z"},{"id":"fhutter-1711.05101","pid":"fhutter","arxiv":"1711.05101","date":"2017-11-14","venue":"cs.LG","org":"University of Freiburg","fields":["deep-learning","efficiency"],"tEn":"Decoupled Weight Decay Regularization","tZh":"解耦权重衰减正则化","cites":2700,"addedAt":"2026-06-29T07:10:23Z"},{"id":"karpathy-software-2-0","pid":"karpathy","date":"2017-11-11","venue":"Karpathy Blog","org":"Eureka Labs","fields":["deep-learning"],"tEn":"Software 2.0","tZh":"软件 2.0","srcUrl":"https://karpathy.medium.com/software-2-0-a64152b37c35","srcLabel":"Karpathy Blog","addedAt":"2026-07-19T04:13:43Z"},{"id":"zhilinyang-1711.03953","pid":"zhilinyang","arxiv":"1711.03953","date":"2017-11-10","venue":"cs.CL","org":"Carnegie Mellon University","fields":["deep-learning","nlp"],"tEn":"Breaking the Softmax Bottleneck: A High-Rank RNN Language Model","tZh":"打破 Softmax 瓶颈：一种高秩 RNN 语言模型","cites":425,"addedAt":"2026-07-02T05:39:25Z"},{"id":"pvelickovic-1710.10903","pid":"pvelickovic","arxiv":"1710.10903","date":"2017-10-30","venue":"stat.ML","org":"U. Cambridge","fields":["deep-learning"],"tEn":"Graph Attention Networks","tZh":"图注意力网络","cites":26967,"addedAt":"2026-06-28T17:10:59Z"},{"id":"tkarras-1710.10196","pid":"tkarras","arxiv":"1710.10196","date":"2017-10-27","venue":"cs.NE","org":"NVIDIA","fields":["generative","vision"],"tEn":"Progressive Growing of GANs for Improved Quality, Stability, and Variation","tZh":"渐进式增长生成对抗网络：提升质量、稳定性和多样性","cites":8591,"addedAt":"2026-06-28T17:10:59Z"},{"id":"hinton-1710.09829","pid":"hinton","arxiv":"1710.09829","date":"2017-10-26","venue":"cs.CV","fields":["deep-learning","vision"],"tEn":"Dynamic Routing Between Capsules","tZh":"动态路由在胶囊网络中的应用","cites":5144,"org":"Google","addedAt":"2026-06-28T12:00:54Z"},{"id":"hvanhasselt-1710.02298","pid":"hvanhasselt","arxiv":"1710.02298","date":"2017-10-06","venue":"cs.AI","org":"Google DeepMind","fields":["rl","deep-learning"],"tEn":"Rainbow: Combining Improvements in Deep Reinforcement Learning","tZh":"彩虹：融合深度强化学习的多项改进","cites":2642,"addedAt":"2026-06-28T17:10:59Z"},{"id":"yangyou-1708.03888","pid":"yangyou","arxiv":"1708.03888","date":"2017-08-13","venue":"cs.CV","org":"UC Berkeley / NVIDIA","fields":["deep-learning","efficiency"],"tEn":"Large Batch Training of Convolutional Networks","tZh":"卷积网络的大批量训练","cites":961,"addedAt":"2026-06-29T07:10:23Z"},{"id":"tsungyilin-1708.02002","pid":"tsungyilin","arxiv":"1708.02002","date":"2017-08-07","venue":"cs.CV","org":"Meta AI","fields":["vision","deep-learning"],"tEn":"Focal Loss for Dense Object Detection","tZh":"用于密集目标检测的焦点损失","cites":3335,"addedAt":"2026-06-29T07:10:23Z"},{"id":"mbellemare-1707.06887","pid":"mbellemare","arxiv":"1707.06887","date":"2017-07-21","venue":"cs.LG","org":"Google DeepMind","fields":["rl","deep-learning"],"tEn":"A Distributional Perspective on Reinforcement Learning","tZh":"强化学习的分布视角","cites":1882,"addedAt":"2026-06-28T17:10:59Z"},{"id":"schulman-1707.06347","pid":"schulman","arxiv":"1707.06347","date":"2017-07-20","venue":"cs.LG","fields":["rl"],"tEn":"Proximal Policy Optimization Algorithms","tZh":"近端策略优化算法","addedAt":"2026-07-30T19:08:33Z","cites":28997},{"id":"mandrychow-1707.01495","pid":"mandrychow","arxiv":"1707.01495","date":"2017-07-05","venue":"cs.LG","fields":["rl","deep-learning"],"tEn":"Hindsight Experience Replay","tZh":"后见经验回放","addedAt":"2026-07-30T17:49:05Z","cites":2785},{"id":"xiangyuzhang-1707.01083","pid":"xiangyuzhang","arxiv":"1707.01083","date":"2017-07-04","venue":"cs.CV","org":"MEGVII (Face++)","fields":["vision","efficiency"],"tEn":"ShuffleNet: An Extremely Efficient Convolutional Neural Network for Mobile Devices","tZh":"ShuffleNet：一种面向移动设备的极高效率卷积神经网络","cites":8470,"addedAt":"2026-06-29T15:38:26Z"},{"id":"shazeer-1706.03762","pid":"shazeer","arxiv":"1706.03762","date":"2017-06-12","venue":"cs.CL","fields":["nlp","deep-learning"],"tEn":"Attention Is All You Need","tZh":"注意力机制就是一切","cites":183094,"org":"Google","addedAt":"2026-06-28T11:09:29Z"},{"id":"christiano-1706.03741","pid":"christiano","arxiv":"1706.03741","date":"2017-06-12","venue":"stat.ML","fields":["safety","rl"],"tEn":"Deep reinforcement learning from human preferences","tZh":"基于人类偏好的深度强化学习","cites":5536,"org":"OpenAI","addedAt":"2026-06-28T11:09:29Z"},{"id":"shochreiter-1706.02515","pid":"shochreiter","arxiv":"1706.02515","date":"2017-06-08","venue":"cs.LG","org":"JKU Linz","fields":["deep-learning"],"tEn":"Self-Normalizing Neural Networks","tZh":"自归一化神经网络","cites":2865,"addedAt":"2026-06-28T17:10:59Z"},{"id":"wlhamilton-1706.02216","pid":"wlhamilton","arxiv":"1706.02216","date":"2017-06-07","venue":"cs.SI","org":"Stanford","fields":["deep-learning"],"tEn":"Inductive Representation Learning on Large Graphs","tZh":"大规模图上的归纳式表示学习","cites":20182,"addedAt":"2026-06-28T17:10:59Z"},{"id":"jgilmer-1704.01212","pid":"jgilmer","arxiv":"1704.01212","date":"2017-04-04","venue":"cs.LG","org":"Google","fields":["deep-learning","generative"],"tEn":"Neural Message Passing for Quantum Chemistry","tZh":"神经消息传递用于量子化学","cites":9163,"addedAt":"2026-06-29T07:10:23Z"},{"id":"arjovsky-1704.00028","pid":"arjovsky","arxiv":"1704.00028","date":"2017-03-31","venue":"cs.LG","fields":["generative","deep-learning"],"tEn":"Improved Training of Wasserstein GANs","tZh":"改进的 Wasserstein GAN 训练方法","addedAt":"2026-07-30T16:43:18Z","cites":10975},{"id":"junyanzhu-1703.10593","pid":"junyanzhu","arxiv":"1703.10593","date":"2017-03-30","venue":"cs.CV","org":"UC Berkeley","fields":["generative","vision"],"tEn":"Unpaired Image-to-Image Translation using Cycle-Consistent Adversarial Networks","tZh":"使用循环一致性对抗网络进行非配对图像到图像的翻译","cites":5645,"addedAt":"2026-06-28T17:10:59Z"},{"id":"abbeel-1703.06907","pid":"abbeel","arxiv":"1703.06907","date":"2017-03-20","venue":"cs.RO","org":"OpenAI","fields":["rl","vision","robotics"],"tEn":"Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World","tZh":"域随机化：将深度神经网络从模拟迁移到现实世界","cites":3834,"addedAt":"2026-06-28T17:10:59Z"},{"id":"rgirshick-1703.06870","pid":"rgirshick","arxiv":"1703.06870","date":"2017-03-20","venue":"cs.CV","org":"Facebook AI Research (FAIR)","fields":["vision","deep-learning"],"tEn":"Mask R-CNN","tZh":"Mask R-CNN","cites":32324,"addedAt":"2026-07-02T05:39:25Z"},{"id":"jifengdai-1703.06211","pid":"jifengdai","arxiv":"1703.06211","date":"2017-03-17","venue":"cs.CV","org":"Microsoft Research Asia","fields":["vision","deep-learning"],"tEn":"Deformable Convolutional Networks","tZh":"可变形卷积网络","cites":6639,"addedAt":"2026-06-29T15:38:26Z"},{"id":"kendall-1703.04977","pid":"kendall","arxiv":"1703.04977","date":"2017-03-15","venue":"cs.CV","fields":["vision","deep-learning"],"tEn":"What Uncertainties Do We Need in Bayesian Deep Learning for Computer Vision?","tZh":"贝叶斯深度学习在计算机视觉中需要哪些不确定性？","cites":6193,"addedAt":"2026-07-05T03:17:49Z"},{"id":"finn-1703.03400","pid":"finn","arxiv":"1703.03400","date":"2017-03-09","venue":"cs.LG","fields":["rl","deep-learning"],"tEn":"Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks","tZh":"模型无关的元学习：深度网络的快速适应","cites":14702,"org":"UC Berkeley","addedAt":"2026-06-28T11:09:29Z"},{"id":"arjovsky-1701.07875","pid":"arjovsky","arxiv":"1701.07875","date":"2017-01-26","venue":"stat.ML","org":"Courant Institute, NYU","fields":["generative","deep-learning"],"tEn":"Wasserstein GAN","tZh":"Wasserstein GAN","cites":5170,"addedAt":"2026-06-29T07:10:23Z"},{"id":"shazeer-1701.06538","pid":"shazeer","arxiv":"1701.06538","date":"2017-01-23","venue":"cs.LG","fields":["nlp","efficiency"],"tEn":"Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer","tZh":"超大神经网络：稀疏门控专家混合层","cites":4963,"org":"Google","addedAt":"2026-06-28T12:00:54Z"},{"id":"jredmon-1612.08242","pid":"jredmon","arxiv":"1612.08242","date":"2016-12-25","venue":"cs.CV","org":"U. Washington","fields":["vision","efficiency"],"tEn":"YOLO9000: Better, Faster, Stronger","tZh":"YOLO9000：更好、更快、更强","cites":17705,"addedAt":"2026-06-28T17:10:59Z"},{"id":"tsungyilin-1612.03144","pid":"tsungyilin","arxiv":"1612.03144","date":"2016-12-09","venue":"cs.CV","org":"Meta AI","fields":["vision","deep-learning"],"tEn":"Feature Pyramid Networks for Object Detection","tZh":"特征金字塔网络用于目标检测","cites":27238,"addedAt":"2026-06-29T07:10:23Z"},{"id":"mbronstein-1611.08097","pid":"mbronstein","arxiv":"1611.08097","date":"2016-11-24","venue":"cs.CV","fields":["deep-learning","vision"],"tEn":"Geometric deep learning: going beyond Euclidean data","tZh":"几何深度学习：超越欧几里得数据","addedAt":"2026-07-30T17:55:38Z","cites":3871},{"id":"pisola-1611.07004","pid":"pisola","arxiv":"1611.07004","date":"2016-11-21","venue":"cs.CV","org":"UC Berkeley","fields":["generative","vision"],"tEn":"Image-to-Image Translation with Conditional Adversarial Networks","tZh":"基于条件对抗网络的图像到图像翻译","cites":22590,"addedAt":"2026-06-29T07:10:23Z"},{"id":"oriol-1611.03530","pid":"oriol","arxiv":"1611.03530","date":"2016-11-10","venue":"cs.LG","fields":["deep-learning"],"tEn":"Understanding deep learning requires rethinking generalization","tZh":"理解深度学习需要重新思考泛化","addedAt":"2026-07-30T17:57:28Z","cites":5167},{"id":"avdoord-1609.03499","pid":"avdoord","arxiv":"1609.03499","date":"2016-09-12","venue":"cs.SD","org":"Google DeepMind","fields":["deep-learning","generative"],"tEn":"WaveNet: A Generative Model for Raw Audio","tZh":"WaveNet：原始音频的生成模型","cites":8285,"addedAt":"2026-06-28T17:10:59Z"},{"id":"tkipf-1609.02907","pid":"tkipf","arxiv":"1609.02907","date":"2016-09-09","venue":"cs.LG","org":"U. Amsterdam","fields":["deep-learning"],"tEn":"Semi-Supervised Classification with Graph Convolutional Networks","tZh":"基于图卷积网络的半监督分类","cites":35801,"addedAt":"2026-06-28T17:10:59Z"},{"id":"gaohuang-1608.06993","pid":"gaohuang","arxiv":"1608.06993","date":"2016-08-25","venue":"cs.CV","org":"Cornell University","fields":["vision","deep-learning"],"tEn":"Densely Connected Convolutional Networks","tZh":"密集连接卷积网络","cites":43760,"addedAt":"2026-06-29T07:10:23Z"},{"id":"fhutter-1608.03983","pid":"fhutter","arxiv":"1608.03983","date":"2016-08-13","venue":"cs.LG","org":"University of Freiburg","fields":["deep-learning","efficiency"],"tEn":"SGDR: Stochastic Gradient Descent with Warm Restarts","tZh":"SGDR：带热重启的随机梯度下降","cites":10679,"addedAt":"2026-06-29T07:10:23Z"},{"id":"jimmyba-1607.06450","pid":"jimmyba","arxiv":"1607.06450","date":"2016-07-21","venue":"stat.ML","org":"U. Toronto","fields":["deep-learning","nlp"],"tEn":"Layer Normalization","tZh":"层归一化","cites":12782,"addedAt":"2026-06-28T17:10:59Z"},{"id":"tmikolov-1607.04606","pid":"tmikolov","arxiv":"1607.04606","date":"2016-07-15","venue":"cs.CL","org":"Meta AI","fields":["nlp","efficiency"],"tEn":"Enriching Word Vectors with Subword Information","tZh":"利用子词信息丰富词向量","cites":10811,"addedAt":"2026-06-28T17:10:59Z"},{"id":"mdefferrard-1606.09375","pid":"mdefferrard","arxiv":"1606.09375","date":"2016-06-30","venue":"cs.LG","org":"EPFL","fields":["deep-learning","efficiency"],"tEn":"Convolutional Neural Networks on Graphs with Fast Localized Spectral Filtering","tZh":"基于快速局部谱滤波的图卷积神经网络","cites":8654,"addedAt":"2026-06-29T07:10:23Z"},{"id":"dario-1606.06565","pid":"dario","arxiv":"1606.06565","date":"2016-06-21","venue":"cs.AI","fields":["safety"],"tEn":"Concrete Problems in AI Safety","tZh":"人工智能安全中的具体问题","cites":3244,"org":"Google","addedAt":"2026-06-28T11:09:29Z"},{"id":"oriol-1606.04080","pid":"oriol","arxiv":"1606.04080","date":"2016-06-13","venue":"cs.LG","org":"Google DeepMind","fields":["deep-learning"],"tEn":"Matching Networks for One Shot Learning","tZh":"匹配网络用于单样本学习","cites":8455,"addedAt":"2026-07-02T16:35:31Z"},{"id":"lcchen-1606.00915","pid":"lcchen","arxiv":"1606.00915","date":"2016-06-02","venue":"cs.CV","org":"Google","fields":["vision","deep-learning"],"tEn":"DeepLab: Semantic Image Segmentation with Deep Convolutional Nets, Atrous Convolution, and Fully Connected CRFs","tZh":"DeepLab：基于深度卷积网络、空洞卷积和全连接条件随机场的语义图像分割","cites":21170,"addedAt":"2026-06-29T07:10:23Z"},{"id":"justinjohnson-1603.08155","pid":"justinjohnson","arxiv":"1603.08155","date":"2016-03-27","venue":"cs.CV","fields":["vision","deep-learning"],"tEn":"Perceptual Losses for Real-Time Style Transfer and Super-Resolution","tZh":"用于实时风格迁移和超分辨率的感知损失","cites":11543,"addedAt":"2026-07-05T03:17:49Z"},{"id":"tianqi-1603.02754","pid":"tianqi","arxiv":"1603.02754","date":"2016-03-09","venue":"cs.LG","fields":["efficiency","deep-learning"],"tEn":"XGBoost: A Scalable Tree Boosting System","tZh":"XGBoost：一种可扩展的树提升系统","org":"U. Washington","cites":56641,"addedAt":"2026-06-28T15:26:40Z"},{"id":"dkingma-1602.07868","pid":"dkingma","arxiv":"1602.07868","date":"2016-02-25","venue":"cs.LG","org":"OpenAI","fields":["deep-learning","efficiency"],"tEn":"Weight Normalization: A Simple Reparameterization to Accelerate Training of Deep Neural Networks","tZh":"权重归一化：一种加速深度神经网络训练的简单重参数化方法","cites":2125,"addedAt":"2026-06-28T17:10:59Z"},{"id":"feifei-1602.07332","pid":"feifei","arxiv":"1602.07332","date":"2016-02-23","venue":"cs.CV","org":"Stanford","fields":["vision","nlp"],"tEn":"Visual Genome: Connecting Language and Vision Using Crowdsourced Dense Image Annotations","tZh":"Visual Genome：利用众包密集图像标注连接语言与视觉","cites":6594,"addedAt":"2026-07-02T16:35:31Z"},{"id":"vmnih-1602.01783","pid":"vmnih","arxiv":"1602.01783","date":"2016-02-04","venue":"cs.LG","org":"Google DeepMind","fields":["rl","deep-learning"],"tEn":"Asynchronous Methods for Deep Reinforcement Learning","tZh":"深度强化学习的异步方法","cites":10118,"addedAt":"2026-06-28T17:10:59Z"},{"id":"kaiming-1512.03385","pid":"kaiming","arxiv":"1512.03385","date":"2015-12-10","venue":"cs.CV","fields":["vision","deep-learning"],"tEn":"Deep Residual Learning for Image Recognition","tZh":"深度残差学习在图像识别中的应用","org":"Microsoft","cites":231533,"addedAt":"2026-06-28T15:26:40Z"},{"id":"dario-1512.02595","pid":"dario","arxiv":"1512.02595","date":"2015-12-08","venue":"cs.CL","org":"Baidu","fields":["nlp","deep-learning"],"tEn":"Deep Speech 2: End-to-End Speech Recognition in English and Mandarin","tZh":"Deep Speech 2：英语和普通话的端到端语音识别","cites":3172,"addedAt":"2026-07-01T12:56:35Z"},{"id":"cszegedy-1512.00567","pid":"cszegedy","arxiv":"1512.00567","date":"2015-12-02","venue":"cs.CV","org":"Google","fields":["vision","deep-learning"],"tEn":"Rethinking the Inception Architecture for Computer Vision","tZh":"重新思考计算机视觉中的 Inception 架构","cites":31290,"addedAt":"2026-06-28T17:10:59Z"},{"id":"aradford-1511.06434","pid":"aradford","arxiv":"1511.06434","date":"2015-11-19","venue":"cs.LG","org":"Meta AI","fields":["generative","deep-learning"],"tEn":"Unsupervised Representation Learning with Deep Convolutional Generative Adversarial Networks","tZh":"使用深度卷积生成对抗网络的无监督表示学习","cites":15124,"addedAt":"2026-06-28T17:10:59Z"},{"id":"tschaul-1511.05952","pid":"tschaul","arxiv":"1511.05952","date":"2015-11-18","venue":"cs.LG","org":"Google DeepMind","fields":["rl","deep-learning"],"tEn":"Prioritized Experience Replay","tZh":"优先经验回放","cites":4462,"addedAt":"2026-06-29T07:10:23Z"},{"id":"songhan-1510.00149","pid":"songhan","arxiv":"1510.00149","date":"2015-10-01","venue":"cs.CV","fields":["efficiency","deep-learning"],"tEn":"Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding","tZh":"深度压缩：通过剪枝、训练量化和霍夫曼编码压缩深度神经网络","org":"Stanford","cites":10164,"addedAt":"2026-06-28T15:26:40Z"},{"id":"hvanhasselt-1509.06461","pid":"hvanhasselt","arxiv":"1509.06461","date":"2015-09-22","venue":"cs.LG","org":"Google DeepMind","fields":["rl","deep-learning"],"tEn":"Deep Reinforcement Learning with Double Q-learning","tZh":"深度强化学习中的双 Q 学习","cites":9180,"addedAt":"2026-06-28T17:10:59Z"},{"id":"tlillicrap-1509.02971","pid":"tlillicrap","arxiv":"1509.02971","date":"2015-09-09","venue":"cs.LG","org":"Google DeepMind","fields":["rl","deep-learning"],"tEn":"Continuous control with deep reinforcement learning","tZh":"连续控制与深度强化学习","cites":15595,"addedAt":"2026-06-28T17:10:59Z"},{"id":"rsennrich-1508.07909","pid":"rsennrich","arxiv":"1508.07909","date":"2015-08-31","venue":"cs.CL","fields":["nlp","efficiency"],"tEn":"Neural Machine Translation of Rare Words with Subword Units","tZh":"基于子词单元的罕见词神经机器翻译","addedAt":"2026-07-30T18:51:41Z","cites":8814},{"id":"chrisolah-understanding-lstms","pid":"chrisolah","date":"2015-08-27","venue":"Colah's Blog","org":"Anthropic","fields":["deep-learning"],"tEn":"Understanding LSTM Networks","tZh":"理解 LSTM 网络","srcUrl":"https://colah.github.io/posts/2015-08-Understanding-LSTMs/","srcLabel":"Colah's Blog","addedAt":"2026-07-19T09:25:48Z"},{"id":"oriol-1506.03134","pid":"oriol","arxiv":"1506.03134","date":"2015-06-09","venue":"stat.ML","org":"Google","fields":["deep-learning","nlp"],"tEn":"Pointer Networks","tZh":"指针网络","cites":3496,"addedAt":"2026-07-02T16:35:31Z"},{"id":"jredmon-1506.02640","pid":"jredmon","arxiv":"1506.02640","date":"2015-06-08","venue":"cs.CV","org":"U. Washington","fields":["vision","efficiency"],"tEn":"You Only Look Once: Unified, Real-Time Object Detection","tZh":"你只需看一眼：统一、实时的目标检测","cites":46352,"addedAt":"2026-06-28T17:10:59Z"},{"id":"karpathy-1506.02078","pid":"karpathy","arxiv":"1506.02078","date":"2015-06-05","venue":"cs.LG","org":"Stanford","fields":["deep-learning","nlp"],"tEn":"Visualizing and Understanding Recurrent Networks","tZh":"可视化与理解循环网络","cites":1142,"addedAt":"2026-07-02T16:35:31Z"},{"id":"rgirshick-1506.01497","pid":"rgirshick","arxiv":"1506.01497","date":"2015-06-04","venue":"cs.CV","org":"Microsoft","fields":["vision","deep-learning"],"tEn":"Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks","tZh":"Faster R-CNN: 基于区域提议网络的实时目标检测","cites":73697,"addedAt":"2026-06-28T17:10:59Z"},{"id":"oronneberger-1505.04597","pid":"oronneberger","arxiv":"1505.04597","date":"2015-05-18","venue":"cs.CV","org":"University of Freiburg","fields":["vision","deep-learning"],"tEn":"U-Net: Convolutional Networks for Biomedical Image Segmentation","tZh":"U-Net：用于生物医学图像分割的卷积网络","cites":97700,"addedAt":"2026-06-29T07:10:23Z"},{"id":"rgirshick-1504.08083","pid":"rgirshick","arxiv":"1504.08083","date":"2015-04-30","venue":"cs.CV","org":"Microsoft","fields":["vision","deep-learning"],"tEn":"Fast R-CNN","tZh":"Fast R-CNN","cites":28618,"addedAt":"2026-06-28T17:10:59Z"},{"id":"svlevine-1504.00702","pid":"svlevine","arxiv":"1504.00702","date":"2015-04-02","venue":"cs.LG","org":"UC Berkeley","fields":["rl","vision","robotics"],"tEn":"End-to-End Training of Deep Visuomotor Policies","tZh":"深度视觉运动策略的端到端训练","cites":3834,"addedAt":"2026-06-28T17:10:59Z"},{"id":"jsohldick-1503.03585","pid":"jsohldick","arxiv":"1503.03585","date":"2015-03-12","venue":"cs.LG","org":"Stanford","fields":["generative","deep-learning"],"tEn":"Deep Unsupervised Learning using Nonequilibrium Thermodynamics","tZh":"基于非平衡热力学的深度无监督学习","cites":10276,"addedAt":"2026-06-28T17:10:59Z"},{"id":"hinton-1503.02531","pid":"hinton","arxiv":"1503.02531","date":"2015-03-09","venue":"stat.ML","fields":["deep-learning"],"tEn":"Distilling the Knowledge in a Neural Network","tZh":"神经网络中的知识蒸馏","cites":24886,"org":"Google","addedAt":"2026-06-28T11:09:29Z"},{"id":"schulman-1502.05477","pid":"schulman","arxiv":"1502.05477","date":"2015-02-19","venue":"cs.LG","fields":["rl"],"tEn":"Trust Region Policy Optimization","tZh":"信任区域策略优化","cites":8091,"org":"UC Berkeley","addedAt":"2026-06-28T12:00:54Z"},{"id":"cszegedy-1502.03167","pid":"cszegedy","arxiv":"1502.03167","date":"2015-02-11","venue":"cs.LG","org":"Google","fields":["deep-learning","vision"],"tEn":"Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift","tZh":"批量归一化：通过减少内部协变量偏移加速深度网络训练","cites":47103,"addedAt":"2026-06-28T17:10:59Z"},{"id":"timurban-ai-revolution-part1","pid":"timurban","date":"2015-01-22","venue":"Wait But Why","org":"","fields":["nlp"],"tEn":"The AI Revolution: The Road to Superintelligence","tZh":"人工智能革命：通往超级智能之路","srcUrl":"https://waitbutwhy.com/2015/01/artificial-intelligence-revolution-1.html","srcLabel":"Wait But Why","addedAt":"2026-07-19T09:25:48Z"},{"id":"dkingma-1412.6980","pid":"dkingma","arxiv":"1412.6980","date":"2014-12-22","venue":"cs.LG","fields":["deep-learning","efficiency"],"tEn":"Adam: A Method for Stochastic Optimization","tZh":"Adam：一种随机优化方法","addedAt":"2026-07-30T16:58:48Z","cites":167990},{"id":"karpathy-1412.2306","pid":"karpathy","arxiv":"1412.2306","date":"2014-12-07","venue":"cs.CV","org":"Stanford","fields":["vision","nlp"],"tEn":"Deep Visual-Semantic Alignments for Generating Image Descriptions","tZh":"深度视觉-语义对齐用于生成图像描述","cites":6086,"addedAt":"2026-07-02T16:35:31Z"},{"id":"oriol-1411.4555","pid":"oriol","arxiv":"1411.4555","date":"2014-11-17","venue":"cs.CV","org":"Google","fields":["vision","nlp"],"tEn":"Show and Tell: A Neural Image Caption Generator","tZh":"展示与讲述：一种神经图像描述生成模型","cites":6579,"addedAt":"2026-07-02T16:35:31Z"},{"id":"mmirza-1411.1784","pid":"mmirza","arxiv":"1411.1784","date":"2014-11-06","venue":"cs.LG","org":"Université de Montréal","fields":["generative","deep-learning"],"tEn":"Conditional Generative Adversarial Nets","tZh":"条件生成对抗网络","cites":11673,"addedAt":"2026-06-29T07:10:23Z"},{"id":"cszegedy-1409.4842","pid":"cszegedy","arxiv":"1409.4842","date":"2014-09-17","venue":"cs.CV","org":"Google","fields":["vision","deep-learning"],"tEn":"Going Deeper with Convolutions","tZh":"深入卷积网络","cites":47539,"addedAt":"2026-06-28T17:10:59Z"},{"id":"ilya-1409.3215","pid":"ilya","arxiv":"1409.3215","date":"2014-09-10","venue":"cs.CL","fields":["nlp","deep-learning"],"tEn":"Sequence to Sequence Learning with Neural Networks","tZh":"基于神经网络的序列到序列学习","cites":22161,"org":"Google","addedAt":"2026-06-28T11:09:29Z"},{"id":"ilya-1409.2329","pid":"ilya","arxiv":"1409.2329","date":"2014-09-08","venue":"cs.NE","org":"Google","fields":["nlp","deep-learning"],"tEn":"Recurrent Neural Network Regularization","tZh":"循环神经网络正则化","cites":3017,"addedAt":"2026-07-02T16:35:31Z"},{"id":"ksimonyan-1409.1556","pid":"ksimonyan","arxiv":"1409.1556","date":"2014-09-04","venue":"cs.CV","org":"Oxford","fields":["vision","deep-learning"],"tEn":"Very Deep Convolutional Networks for Large-Scale Image Recognition","tZh":"用于大规模图像识别的极深卷积网络","cites":112467,"addedAt":"2026-06-28T17:10:59Z"},{"id":"bengio-1409.0473","pid":"bengio","arxiv":"1409.0473","date":"2014-09-01","venue":"cs.CL","fields":["nlp","deep-learning"],"tEn":"Neural Machine Translation by Jointly Learning to Align and Translate","tZh":"通过联合学习对齐和翻译的神经机器翻译","cites":29639,"org":"U. Montréal","addedAt":"2026-06-28T11:09:29Z"},{"id":"feifei-1409.0575","pid":"feifei","arxiv":"1409.0575","date":"2014-09-01","venue":"cs.CV","fields":["vision"],"tEn":"ImageNet Large Scale Visual Recognition Challenge","tZh":"ImageNet 大规模视觉识别挑战赛","cites":43007,"org":"Stanford","addedAt":"2026-06-28T11:09:29Z"},{"id":"bengio-1406.2661","pid":"bengio","arxiv":"1406.2661","date":"2014-06-10","venue":"stat.ML","fields":["generative","deep-learning"],"tEn":"Generative Adversarial Networks","tZh":"生成对抗网络","cites":4371,"org":"U. Montréal","addedAt":"2026-06-28T12:00:54Z"},{"id":"tsungyilin-1405.0312","pid":"tsungyilin","arxiv":"1405.0312","date":"2014-05-01","venue":"cs.CV","org":"Microsoft","fields":["vision"],"tEn":"Microsoft COCO: Common Objects in Context","tZh":"Microsoft COCO：上下文中的常见物体","cites":53675,"addedAt":"2026-06-29T07:10:23Z"},{"id":"jbruna-1312.6203","pid":"jbruna","arxiv":"1312.6203","date":"2013-12-21","venue":"cs.LG","org":"NYU","fields":["deep-learning"],"tEn":"Spectral Networks and Locally Connected Networks on Graphs","tZh":"谱网络与图上的局部连接网络","cites":5398,"addedAt":"2026-06-28T17:10:59Z"},{"id":"rgirshick-1311.2524","pid":"rgirshick","arxiv":"1311.2524","date":"2013-11-11","venue":"cs.CV","org":"UC Berkeley","fields":["vision","deep-learning"],"tEn":"Rich feature hierarchies for accurate object detection and semantic segmentation","tZh":"用于精确目标检测和语义分割的丰富特征层次结构","cites":29100,"addedAt":"2026-06-28T17:10:59Z"},{"id":"tmikolov-1310.4546","pid":"tmikolov","arxiv":"1310.4546","date":"2013-10-16","venue":"cs.CL","org":"Google","fields":["nlp","deep-learning"],"tEn":"Distributed Representations of Words and Phrases and their Compositionality","tZh":"词汇与短语的分布式表示及其组合性","cites":35367,"addedAt":"2026-06-28T17:10:59Z"},{"id":"jeffdean-1301.3781","pid":"jeffdean","arxiv":"1301.3781","date":"2013-01-16","venue":"cs.CL","fields":["nlp"],"tEn":"Efficient Estimation of Word Representations in Vector Space","tZh":"词向量空间中的高效估计方法","cites":34590,"org":"Google","addedAt":"2026-06-28T11:09:29Z"},{"id":"ilya-alexnet-2012","pid":"ilya","date":"2012-12-01","venue":"NeurIPS 2012","org":"NeurIPS (2012)","fields":["deep-learning"],"tEn":"ImageNet Classification with Deep Convolutional Neural Networks","tZh":"使用深度卷积神经网络的 ImageNet 分类","srcUrl":"https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf","srcLabel":"NeurIPS 2012","addedAt":"2026-07-29T16:30:55Z"},{"id":"hinton-1207.0580","pid":"hinton","arxiv":"1207.0580","date":"2012-07-03","venue":"cs.NE","org":"U. Toronto","fields":["deep-learning"],"tEn":"Improving neural networks by preventing co-adaptation of feature detectors","tZh":"通过防止特征检测器的共适应来改进神经网络","cites":8024,"addedAt":"2026-06-28T17:10:59Z"},{"id":"hinton-deep-belief-nets-2006","pid":"hinton","date":"2006-07-01","venue":"2006","org":"Neural Computation (2006)","fields":["deep-learning"],"tEn":"A Fast Learning Algorithm for Deep Belief Nets","tZh":"一种深度信念网络的快速学习算法","srcUrl":"https://www.cs.toronto.edu/~hinton/absps/fastnc.pdf","srcLabel":"2006","addedAt":"2026-07-29T15:56:25Z"},{"id":"shochreiter-lstm-1997","pid":"shochreiter","date":"1997-11-01","venue":"1997","org":"Neural Computation (1997)","fields":["deep-learning"],"tEn":"Long Short-Term Memory","tZh":"长短期记忆","srcUrl":"https://deeplearning.cs.cmu.edu/F23/document/readings/LSTM.pdf","srcLabel":"1997","addedAt":"2026-07-29T16:28:22Z"},{"id":"hinton-backprop-1986","pid":"hinton","date":"1986-01-01","venue":"1986","org":"PDP, MIT Press (1986)","fields":["deep-learning"],"tEn":"Learning Internal Representations by Error Propagation","tZh":"通过误差传播学习内部表示","srcUrl":"https://gwern.net/doc/ai/nn/1986-rumelhart.pdf","srcLabel":"1986","addedAt":"2026-07-29T16:11:20Z"},{"id":"hinton-boltzmann-machine-1985","pid":"hinton","date":"1985-03-01","venue":"1985","org":"Cognitive Science (1985)","fields":["deep-learning"],"tEn":"A Learning Algorithm for Boltzmann Machines","tZh":"玻尔兹曼机的学习算法","srcUrl":"https://www.cs.toronto.edu/~hinton/absps/cogscibm.pdf","srcLabel":"1985","addedAt":"2026-07-29T15:22:17Z"},{"id":"hopfield-hopfield-1982","pid":"hopfield","date":"1982-04-01","venue":"PNAS 1982","org":"PNAS (1982)","fields":["deep-learning"],"tEn":"Neural networks and physical systems with emergent collective computational abilities","tZh":"具有涌现集体计算能力的神经网络与物理系统","srcUrl":"https://www.pnas.org/doi/pdf/10.1073/pnas.79.8.2554","srcLabel":"PNAS 1982","addedAt":"2026-07-29T15:54:01Z"},{"id":"rosenblatt-perceptron-1958","pid":"rosenblatt","date":"1958-11-01","venue":"1958","org":"Psychological Review (1958)","fields":["deep-learning"],"tEn":"The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain","tZh":"感知器：大脑中信息存储与组织的概率模型","srcUrl":"https://www.ling.upenn.edu/courses/cogs501/Rosenblatt1958.pdf","srcLabel":"1958","addedAt":"2026-07-29T15:43:09Z"},{"id":"mcculloch-mcculloch-pitts-1943","pid":"mcculloch","date":"1943-12-01","venue":"1943","org":"Bull. Math. Biophysics (1943)","fields":["deep-learning"],"tEn":"A Logical Calculus of the Ideas Immanent in Nervous Activity","tZh":"神经活动中内在思想的逻辑演算","srcUrl":"https://www.cs.cmu.edu/~./epxing/Class/10715/reading/McCulloch.and.Pitts.pdf","srcLabel":"1943","addedAt":"2026-07-29T15:37:14Z"}];
/* PAPERS_END */
const FULL_CACHE={};
const CHAT_PROXY="https://askpaper.jasonlin.tech";  // 自定义域(workers.dev 国内被墙)

/* ===== HELPERS ===== */
const esc=s=>(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const papersOf=pid=>PAPERS.filter(p=>p.pid===pid);
const fmtCites=n=>(n==null?'':(n>=10000?(n/10000).toFixed(n>=100000?0:1)+'万':n.toLocaleString()));
const ORG_C={'Google':'#4285f4','OpenAI':'#10a37f','DeepMind':'#1a73e8','Meta AI':'#0668e1','Microsoft Research':'#737373','NVIDIA':'#76b900','Stanford':'#8c1515','UC Berkeley':'#1c3c6e','CMU':'#c41230','University of Washington':'#4b2e83','Université de Montréal':'#0b6cb7','DeepSeek':'#4d6bff'};
const orgColor=o=>ORG_C[o]||'#6e6e73';
const papersByOrg=o=>PAPERS.filter(p=>p.org===o);
const ORG_LOGO={"Thinking Machines Lab": "thinkingmachines", "OpenAI": "openai", "Anthropic": "anthropic", "Google": "google", "Google DeepMind": "deepmind", "DeepSeek": "deepseek", "Meta AI": "meta", "Microsoft": "microsoft", "Microsoft Research Asia": "microsoft", "NVIDIA": "nvidia", "Stanford": "stanford", "UC Berkeley": "berkeley", "MIT": "mit", "CMU": "cmu", "Mistral AI": "mistral", "Moonshot AI": "moonshot", "Alibaba": "alibabagroup", "Alibaba Qwen": "alibabagroup", "Zhipu AI": "zhipuai", "ByteDance Seed": "bytedance", "Tencent Hunyuan": "tencent", "Tencent": "tencent", "StepFun": "stepfun", "MiniMax": "minimax", "Stability AI": "stability", "Physical Intelligence": "physicalint", "Xiaomi": "xiaomi", "OpenBMB": "openbmb", "Xiaohongshu": "rednote", "Skywork AI": "skywork", "Cohere": "cohere", "Hugging Face": "huggingface", "Black Forest Labs": "bfl", "Salesforce": "salesforce", "Allen Institute for AI": "allenai", "Tsinghua University": "tsinghua", "University of Freiburg": "freiburg", "Huawei": "huawei", "KAUST": "kaust", "IDEA Research": "idea", "IDEA Research / HKUST": "idea", "Princeton University": "princeton", "Cornell University": "cornell", "EPFL": "epfl", "NTU Singapore": "ntu", "Preferred Networks": "pfn", "MEGVII (Face++)": "megvii", "MEGVII (Face++) / Tsinghua University": "megvii", "Zhuiyi Technology": "zhuiyi", "01.AI": "01", "Oxford": "ox", "U. Toronto": "utoronto", "U. Amsterdam": "uva", "U. Montréal": "umontreal", "Mila / U. Montréal": "mila", "MILA / Université de Montréal": "mila", "Imperial College": "imperial", "JKU Linz": "jku", "USI Lugano": "usi", "LMU Munich": "lmu", "U. Washington": "uw", "SenseTime Research": "sensetime"};
const orgLogo=(o,cls)=>ORG_LOGO[o]?`<img class="${cls||'orglogo'}" src="assets/orgs/${ORG_LOGO[o]}.webp" alt="" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/orgs/${ORG_LOGO[o]}.png'">`:'';
const orgChip=o=>o?`<span class="orgchip" onclick="event.stopPropagation();go('#/org/'+encodeURIComponent('${o.replace(/'/g,"")}'))" style="cursor:pointer">${orgLogo(o)}<span>${esc(o)}</span></span>`:'';
function orgList(){const m={};PAPERS.forEach(p=>{if(p.org)m[p.org]=(m[p.org]||0)+1;});return Object.entries(m).sort((a,b)=>b[1]-a[1]);}
const ORG_ENTITIES=new Set(['thinkingmachines','deepmind','citrini','meituan','openai','anthropic','deepseek','stepfun','antling','minicpm','xiaomimimo','wanteam']);
const PAPER_GRAPH={"lindahua":"lindahua","yanjunjie":"yanjunjie","jimmyba":"jimmyba","shazeer":"shazeer","christiano":"christiano","demis":"hassabis","jeffdean":"dean","abbeel":"abbeel","cszegedy":"szegedy","jasonwei":"wei","dario":"damodei","hinton":"hinton","askell":"askell","kendall":"kendall","tworek":"tworek","albertgu":"albertgu","tombrown":"brown","svlevine":"levine","jimfan":"jimfan","sam":"altman","finn":"finn","leike":"janleike","aradford":"radford","antonoglou":"antonoglou","goodfellow":"goodfellow","ilya":"sutskever","oriol":"vinyals","justinjohnson":"justinjohnson","jonathanho":"ho","richsutton":"sutton","karpathy":"karpathy","rrombach":"rombach","bengio":"bengio","fedus":"fedus","tridao":"tridao","kaiming":"kaiminghe","dhafner":"hafner","feifei":"feifei","yejin":"yejin","nathanlambert":"lambert","alexwei":"alexwei","kaplan":"jaredkaplan","schulman":"schulman","jietang":"jietang","kaifulee":"kaifulee","lilianweng":"lilianweng","dayaguo":"dayaguo","chrisolah":"olah","shochreiter":"hochreiter","lecun":"lecun","sebastienbubeck":"bubeck","zhilinyang":"yangzhilin","junyanglin":"linjunyang","shunyuyao":"yaoshunyu","wenfengliang":"liangwenfeng","dkingma":"kingma",kokotajlo:'kokotajlo',satya:'satya',thariq:'thariq'};
const PAPER2POD={sebastienbubeck:'bubeck',thariq:'thariq',abbeel:'abbeel',achowdhery:'chowdhery',albertgu:'albertgu',alexwei:'alexwei',antonoglou:'antonoglou',askell:'askell',bengio:'bengio',chrisolah:'olah',christiano:'christiano',dario:'dario',demis:'demis',dhafner:'hafner',fedus:'fedus',feifei:'feifei',finn:'finn',hinton:'hinton',ilya:'ilya',jasonwei:'jasonwei',jeffdean:'jeffdean',jimfan:'jimfan',jleskovec:'jureleskovec',justinjohnson:'justinjohnson',kaplan:'kaplan',karpathy:'karpathy',kendall:'kendall',kokotajlo:'kokotajlo',lecun:'lecun',leike:'leike',nathanlambert:'lambert',oriol:'oriol',richsutton:'sutton',sam:'altman',satya:'satya',schulman:'schulman',sermon:'ermon',shazeer:'shazeer',simonwillison:'simonwillison',svlevine:'slevine',tombrown:'tombrown',tonyfadell:'fadell',tridao:'tridao',tworek:'tworek',yejin:'yejin',sebastianraschka:'raschka',zvi:'zvi'};
function pplOrder(){const k=Object.keys(PEOPLE).filter(p=>!ORG_ENTITIES.has(p));return k.slice().sort((a,b)=>papersOf(b).length-papersOf(a).length||k.indexOf(a)-k.indexOf(b));}
function av(pid,cls){const p=PEOPLE[pid];if(PHOTOS.has(pid))return `<div class="${cls||'av'}"><img src="assets/people/${pid}.webp" alt="${esc(p.en)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/people/${pid}.jpg'"></div>`;const cs=(p.fields||['deep-learning']).map(f=>(FIELDS[f]||{}).c||'#9aa4b2');const bg=`linear-gradient(140deg,${cs[0]},${cs[1]||cs[0]})`;return `<div class="${cls||'av'}" style="background:${bg}">${esc(p.init)}</div>`;}
const fdot=f=>`<span class="fdot" style="background:${(FIELDS[f]||{}).c||'var(--sub)'}"></span>`;
const ftag=f=>`<span class="tag">${fdot(f)}${(FIELDS[f]||{}).zh||f}</span>`;
function go(h){location.hash=h;}

/* ===== VIEWS ===== */
function pplCard(pid){const p=PEOPLE[pid];const n=papersOf(pid).length;
 return `<a class="ppl-card" href="#/person/${pid}">${av(pid)}<div class="n">${esc(p.en)}</div><div class="nz">${esc(p.zh)}</div><div class="ti">${esc(p.tiZh)}</div><div class="cnt">${n} 篇论文</div></a>`;}
function papersBy(pid){return PAPERS.filter(x=>x.pid===pid);}
/* 相关度(data/related.json,由 pipeline/build_related.js 用 BM25 离线算好):
   只按 8 个粗领域标签选"接着读"是不够的 —— 428 篇都挂 nlp,排序实际由时间接近度和
   随机抖动决定,Zvi 的评论随笔会被推来 Aya 技术报告。BM25 用 标题+一句话摘要+核心贡献
   算文本相似,零 LLM 成本、确定可复现。打开论文页时才拉,拉到后就地重渲染推荐区。 */
const REL={};let _relLoading=false,_relReady=false;
function ensureRelated(){
 if(_relReady||_relLoading)return;
 _relLoading=true;
 fetch('data/related.json').then(r=>r.ok?r.json():Promise.reject(r.status)).then(j=>{
  Object.assign(REL,j);_relReady=true;
  const box=document.getElementById('recoBox');                 // 已在论文页 → 就地换成更准的一组
  if(box){const id=box.dataset.pid,pp=PAPERS.find(x=>x.id===id);if(pp)box.innerHTML=recoInner(pp);}
 }).catch(()=>{_relLoading=false;});
}
function nextReads(p){
 const out=[],seen=new Set([p.id]);
 const push=x=>{if(x&&!seen.has(x.id)){seen.add(x.id);out.push(x);}};
 const unread=id=>!readHas(id);
 const byId=id=>PAPERS.find(x=>x.id===id);
 const same=papersBy(p.pid).filter(x=>x.id!==p.id);      // 第一条固定:同一位作者/机构的其他条目,偏未读
 push(same.find(x=>unread(x.id))||same[0]);
 const isArt=x=>!x.arxiv;
 const rel=(REL[p.id]||[]).map(r=>byId(r.id)).filter(Boolean);
 if(rel.length){
  push(rel[0]);   // 相似度最高的一条无条件占位:同类型优先会把它挤掉(Qwen-CUA 的最佳匹配
                  // 是 OpenAI 的 Computer-Using Agent,属"文章"),而它往往正是最该读的下一篇
  /* 其余同类型优先(评论随笔配长文、技术报告配论文),未读优先;都不够再放宽 */
  const tiers=[x=>unread(x.id)&&isArt(x)===isArt(p), x=>unread(x.id), ()=>true];
  for(const t of tiers){for(const x of rel){if(out.length>=4)break;if(t(x))push(x);}if(out.length>=4)break;}
 }
 if(out.length<4){                                       // related.json 还没拉到/新收未覆盖 → 退回领域打分
  const pf=p.fields||[];                                 // 去掉随机抖动,时间项权重压到 0.5,别盖过领域
  const score=x=>{let sc=0;for(const f of pf)if((x.fields||[]).includes(f))sc+=2;
   if(x.org&&p.org&&x.org===p.org)sc+=1;
   const dy=Math.abs((new Date(x.addedAt||x.date||0))-(new Date(p.addedAt||p.date||0)))/864e5;
   return sc+Math.max(0,0.5-dy/730);};
  const cands=PAPERS.filter(x=>!seen.has(x.id)&&x.pid!==p.pid&&unread(x.id)&&(x.fields||[]).some(f=>pf.includes(f)))
   .map(x=>({x,s:score(x)+(isArt(x)===isArt(p)?0.75:0)})).sort((a,b)=>b.s-a.s);
  for(const c of cands){if(out.length>=4)break;push(c.x);}
 }
 return out.slice(0,4);
}
function recoInner(p){const ns=nextReads(p);
 return ns.length?`<div class="eyebrow" style="margin-top:56px">Up next · 接着读</div><div class="reco-grid" style="margin-top:16px">${ns.map(paperCard).join("")}</div>`:"";}
function recoBlock(p,full){if(!full)return "<div id=\"readEnd\" aria-hidden=\"true\"></div>";
 ensureRelated();
 return `<div id="recoBox" data-pid="${p.id}">${recoInner(p)}</div><div id="readEnd" aria-hidden="true"></div>`;}
function paperCard(p){const pe=PEOPLE[p.pid]||{};const isOrg=pe.en&&p.org&&(pe.en===p.org||pe.zh===p.org);
 const rp=!readHas(p.id)&&readPosGet()[p.id];const prog=(rp&&rp.s>0&&rp.n)?`<span class="prog-badge">读到 ${Math.min(rp.s+1,rp.n)}/${rp.n} 章</span>`:'';
 return `<a class="paper-card${readHas(p.id)?' read':''}${laterHas(p.id)?' later':''}" data-id="${p.id}" href="#/paper/${p.id}"><span class="cover-badges">${readHas(p.id)?'<span class="read-badge">✓ 已读</span>':prog||(laterHas(p.id)?'<span class="later-badge">★ 待读</span>':(isNew(p)?'<span class="new-badge">NEW</span>':''))}</span><div class="pt">${esc(p.tEn)}</div><div class="ptz">${esc(p.tZh)}</div>
   <div class="meta">${isOrg?'':`<span>${esc(pe.zh||'')}</span>`}${p.arxiv?`<span>arXiv:${p.arxiv}</span>`:`<span class="artbadge">文章</span><span>${esc(p.srcLabel||'PDF')}</span>`}<span>${p.date}</span>${isOrg?orgChip(p.org):orgChip(p.org)}${p.cites!=null?`<span class="citeico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 7-7"/><path d="M16 8h5v5"/></svg>被引 ${fmtCites(p.cites)}</span>`:''}${(p.fields||[]).map(ftag).join('')}</div></a>`;}


/* ===== 「我的」页:阅读统计 + 热力图 + 学者排行 + 已读长图(对齐 AI Podcast) ===== */
function readStats(){
  const ids=[...readGet()];
  const ps=ids.map(id=>PAPERS.find(p=>p.id===id)).filter(Boolean);
  const totalMin=ps.reduce((s,p)=>s+readMin(p),0);
  const authors={};ps.forEach(p=>{const k=(PEOPLE[p.pid]||{}).zh||(PEOPLE[p.pid]||{}).en||'?';authors[k]=(authors[k]||0)+1;});
  return {ps,totalMin,ppl:new Set(ps.map(p=>p.pid)).size,authors,streak:rlogStreak()};
}
function sharePromoHtml(st,hrs){
  const ups=[...new Set(st.ps.map(p=>p.pid))];const mx=Math.min(7,ups.length);let avs='';
  for(let i=0;i<mx;i++){const pid=ups[i];const pe=PEOPLE[pid]||{};
    avs+=(typeof PHOTOS!=='undefined'&&PHOTOS.has(pid))?`<img src="assets/people/${pid}.webp" alt="" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/people/${pid}.jpg'">`:`<span>${pe.init||'?'}</span>`;}
  if(ups.length>mx)avs+=`<span>+${ups.length-mx}</span>`;
  return `<div class="shp-card">
    <div class="shp-dots"><i></i><i></i><i></i><i></i><i></i></div>
    <div class="shp-t">我读完了 ${st.ps.length} 篇论文</div>
    <div class="shp-s">累计约 ${hrs} 小时 · 覆盖 ${st.ppl} 位学者${st.streak.cur>1?' · 连续 '+st.streak.cur+' 天':''}</div>
    <div class="shp-avs">${avs}</div>
    <button class="shp-btn" onclick="readShareImage()">生成长图并分享</button>
  </div>`;
}
function mineLaterHtml(){
  const ids=laterGet().map(id=>PAPERS.find(p=>p.id===id)).filter(Boolean);
  if(!ids.length)return `<div class="st-h2" style="margin-top:52px">我的待读</div><div class="st-empty">还没有待读论文。在论文页点「稍后读」即可收藏到这里。</div>`;
  return `<div class="st-h2" style="margin-top:52px">我的待读 · ${ids.length}</div><div class="grid" style="margin-top:14px">${ids.map(paperCard).join('')}</div>`;
}
function vMine(){
  const st=readStats();
  if(!st.ps.length)return `<div class="wrap"><section style="min-height:50vh;padding:30px 0"><div class="eyebrow">My Space · 我的</div><h2 class="title">我的</h2><div class="st-h2">我的数据</div><div class="st-empty">还没有读完的论文——打开一篇读到底会自动标记已读，统计从此开始累计。</div>${pushPanelHtml()}${mineLaterHtml()}${mineMarksHtml()}</section></div>`;
  const hrs=Math.round(st.totalMin/6)/10;
  const g=rlogGet();const day=86400000;const today=new Date();today.setHours(0,0,0,0);
  const end=today.getTime()+(6-today.getDay())*day;
  const LAUNCH=new Date('2026-06-01T00:00:00');const launchSun=LAUNCH.getTime()-LAUNCH.getDay()*day;
  const cols=Math.max(1,Math.min(26,Math.ceil((end-launchSun+day)/(7*day))));
  let cells='';const colMon=[];
  for(let w=cols-1;w>=0;w--){const t0=end-(w*7+6)*day;colMon.push(new Date(t0).getMonth()+1);
    for(let r=0;r<7;r++){const t=end-(w*7+(6-r))*day;
      if(t>today.getTime()){cells+='<i style="visibility:hidden"></i>';continue;}
      const d=new Date(t);const k=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
      const m=g[k]||0;const l=m<=0?0:m<20?1:m<45?2:m<90?3:4;
      cells+=`<i data-l="${l}" title="${k} · ${m} 分钟"></i>`;}}
  let mons='';for(let i=0;i<colMon.length;i++){const show=i===0?(colMon.length<2||colMon[1]===colMon[0]):colMon[i]!==colMon[i-1];mons+=`<span>${show?colMon[i]+'月':''}</span>`;}
  const top=Object.entries(st.authors).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const mx=top.length?top[0][1]:1;
  const rows=top.map(([name,n])=>{
    const pid=Object.keys(PEOPLE).find(k=>(PEOPLE[k].zh===name||PEOPLE[k].en===name));
    const ic=(pid&&typeof PHOTOS!=='undefined'&&PHOTOS.has(pid))?`<img class="rk-logo" src="assets/people/${pid}.webp" alt="" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/people/${pid}.jpg'">`:`<span class="rk-ini">${(name||'?').slice(0,2)}</span>`;
    return `<div class="rk-row">${ic}<span class="rk-name">${esc(name)}</span><span class="rk-bar" style="width:${Math.round(n/mx*220)}px"></span><span class="rk-n">${n} 篇</span></div>`;}).join('');
  return `<div class="wrap"><section style="padding:30px 0">
    <div class="eyebrow">My Space · 我的</div><h2 class="title">我的</h2>
    <div class="st-h2">我的数据</div>
    <div class="st-tiles">
      <div class="st-tile"><div class="n">${st.ps.length}</div><div class="l">已读论文</div></div>
      <div class="st-tile"><div class="n">${hrs}</div><div class="l">累计小时</div></div>
      <div class="st-tile"><div class="n">${st.streak.cur}</div><div class="l">连续天数</div><div class="s">最长 ${st.streak.max} 天</div></div>
      <div class="st-tile"><div class="n">${st.ppl}</div><div class="l">覆盖学者</div></div>
    </div>
    <div class="st-h3">阅读热力图</div>
    <div class="hm-wrap"><div class="hm">${cells}</div><div class="hm-months">${mons}</div></div>
    <div class="hm-legend">少 <i style="background:var(--surface);border:1px solid var(--line)"></i><i style="background:rgba(10,118,233,.25)"></i><i style="background:rgba(10,118,233,.45)"></i><i style="background:rgba(10,118,233,.7)"></i><i style="background:var(--acc)"></i> 多 · 每日阅读分钟数</div>
    <div class="st-h3">学者排行 · 我读得最多的</div>
    <div class="rk">${rows||'<div class="st-empty">暂无</div>'}</div>
    ${pushPanelHtml()}
    ${sharePromoHtml(st,hrs)}
    ${mineLaterHtml()}${mineMarksHtml()}
  </section></div>`;
}
/* 已读长图 */
async function readShareImage(){
  const st=readStats();const ps=st.ps.slice().reverse();
  if(!ps.length){alert('还没有已读论文——打开一篇读到底会自动标记已读，再来生成吧。');return;}
  const shown=ps.slice(0,40),more=ps.length-shown.length;
  const hrs=Math.round(st.totalMin/6)/10;
  const imgs={};
  await Promise.all([...new Set(shown.map(p=>p.pid))].map(pid=>new Promise(res=>{
    if(typeof PHOTOS==='undefined'||!PHOTOS.has(pid))return res();
    const im=new Image();im.onload=()=>{imgs[pid]=im;res()};im.onerror=()=>res();im.src='assets/people/'+pid+'.jpg';})));
  const qr=await new Promise(res=>{const im=new Image();im.onload=()=>res(im);im.onerror=()=>res(null);im.src='assets/qr.png';});
  const W=750,pad=44,rowH=94,headH=330,footH=190;
  const H=headH+shown.length*rowH+(more>0?54:12)+footH;
  const cv=document.createElement('canvas');cv.width=W*2;cv.height=H*2;
  const x=cv.getContext('2d');x.scale(2,2);
  const F='-apple-system,BlinkMacSystemFont,"PingFang SC","Hiragino Sans GB",sans-serif';
  x.fillStyle='#0d0d12';x.fillRect(0,0,W,H);
  ['#0a76e9','#22a565','#f0913a','#7c5cf0','#e0566f'].forEach((c,i)=>{x.beginPath();x.arc(W-40-i*26,40,5,0,7);x.fillStyle=c;x.fill();});
  x.fillStyle='#fff';x.font='700 30px '+F;x.fillText('AI Paper · AI 论文',pad,72);
  x.fillStyle='rgba(255,255,255,.55)';x.font='400 15px '+F;x.fillText('著名学者的代表论文与长文 · 中英对照全文阅读',pad,100);
  x.fillStyle='#2997ff';x.font='700 40px '+F;x.fillText('我读完了 '+ps.length+' 篇',pad,164);
  x.fillStyle='rgba(255,255,255,.85)';x.font='400 17px '+F;
  x.fillText('累计约 '+hrs+' 小时 · 覆盖 '+st.ppl+' 位学者'+(st.streak.cur>1?' · 连续 '+st.streak.cur+' 天':''),pad,196);
  {const ups=[...new Set(shown.map(p=>p.pid))];const av=44,ov=30,cy=266;let sx=pad;const maxAv=Math.min(10,ups.length);
   const ring=cx=>{x.strokeStyle='#0d0d12';x.lineWidth=3;x.beginPath();x.arc(cx,cy,av/2+1,0,7);x.stroke();x.lineWidth=1;};
   for(let i=0;i<maxAv;i++){const pid=ups[i];
     x.save();x.beginPath();x.arc(sx+av/2,cy,av/2,0,7);x.clip();
     if(imgs[pid])x.drawImage(imgs[pid],sx,cy-av/2,av,av);
     else{x.fillStyle='#26262e';x.fillRect(sx,cy-av/2,av,av);x.fillStyle='rgba(255,255,255,.8)';x.font='600 15px '+F;x.textAlign='center';x.fillText((PEOPLE[pid]&&PEOPLE[pid].init)||'?',sx+av/2,cy+5);x.textAlign='left';}
     x.restore();ring(sx+av/2);sx+=ov;}
   if(ups.length>maxAv){x.fillStyle='#26262e';x.beginPath();x.arc(sx+av/2,cy,av/2,0,7);x.fill();
     x.fillStyle='rgba(255,255,255,.85)';x.font='600 13px '+F;x.textAlign='center';x.fillText('+'+(ups.length-maxAv),sx+av/2,cy+5);x.textAlign='left';ring(sx+av/2);}}
  x.strokeStyle='rgba(255,255,255,.12)';x.beginPath();x.moveTo(pad,headH-24);x.lineTo(W-pad,headH-24);x.stroke();
  const ell=(t,mw,f)=>{x.font=f;if(x.measureText(t).width<=mw)return t;while(t.length&&x.measureText(t+'…').width>mw)t=t.slice(0,-1);return t+'…';};
  shown.forEach((p,i)=>{
    const y=headH+i*rowH,pe=PEOPLE[p.pid]||{};
    const ax=pad,ay=y+8,as=56;
    x.save();x.beginPath();x.arc(ax+as/2,ay+as/2,as/2,0,7);x.clip();
    if(imgs[p.pid])x.drawImage(imgs[p.pid],ax,ay,as,as);
    else{x.fillStyle='#26262e';x.fillRect(ax,ay,as,as);x.fillStyle='rgba(255,255,255,.8)';x.font='600 20px '+F;x.textAlign='center';x.fillText(pe.init||'?',ax+as/2,ay+as/2+7);x.textAlign='left';}
    x.restore();
    const tx=pad+as+18,tw=W-pad-(pad+as+18);
    x.fillStyle='#fff';x.font='600 17px '+F;x.fillText(ell(p.tZh||p.tEn,tw,'600 17px '+F),tx,y+32);
    x.fillStyle='rgba(255,255,255,.5)';x.font='400 13px '+F;
    x.fillText(ell((pe.zh||pe.en||'')+' · '+(p.org||'')+' · '+(p.date||''),tw,'400 13px '+F),tx,y+56);
    if(i<shown.length-1){x.strokeStyle='rgba(255,255,255,.07)';x.beginPath();x.moveTo(tx,y+rowH-8);x.lineTo(W-pad,y+rowH-8);x.stroke();}
  });
  let fy=headH+shown.length*rowH;
  if(more>0){x.fillStyle='rgba(255,255,255,.45)';x.font='400 14px '+F;x.fillText('… 还有 '+more+' 篇已读',pad,fy+26);fy+=54;}else fy+=12;
  x.strokeStyle='rgba(255,255,255,.12)';x.beginPath();x.moveTo(pad,fy+8);x.lineTo(W-pad,fy+8);x.stroke();
  if(qr){x.fillStyle='#fff';x.fillRect(W-pad-104,fy+32,104,104);x.drawImage(qr,W-pad-100,fy+36,96,96);}
  x.fillStyle='#fff';x.font='700 19px '+F;x.fillText('aipaper.jasonlin.tech',pad,fy+66);
  x.fillStyle='rgba(255,255,255,.55)';x.font='400 14px '+F;
  x.fillText('逐段双语 · 核心贡献 · AI 问答 · 免费阅读',pad,fy+94);
  x.fillText(qr?'长按识别二维码，一起来读':'长按保存图片分享给朋友',pad,fy+120);
  const url=cv.toDataURL('image/jpeg',.92);
  const m=document.createElement('div');m.className='rsi-modal';
  m.innerHTML='<div class="rsi-card">'+
    '<div class="rsi-head"><div><b>我的已读论文</b><span>'+ps.length+' 篇 · 约 '+hrs+' 小时</span></div>'+
    '<button class="rsi-x" onclick="this.closest(\'.rsi-modal\').remove()" aria-label="关闭">×</button></div>'+
    '<div class="rsi-body"><img src="'+url+'" alt="已读论文长图"></div>'+
    '<div class="rsi-foot"><span class="rsi-hint">微信长按图片保存 / 转发</span>'+
    '<a class="rsi-pri" download="my-ai-paper.jpg" href="'+url+'">保存图片</a>'+
    (navigator.share?'<button class="rsi-sec" onclick="rsiShare(this)">分享</button>':'')+'</div></div>';
  m.addEventListener('click',ev=>{if(ev.target===m)m.remove();});
  document.body.appendChild(m);
  try{track('share_img')}catch(e){}
}
async function rsiShare(btn){try{
  const img=btn.closest('.rsi-modal').querySelector('img');
  const blob=await (await fetch(img.src)).blob();
  const file=new File([blob],'my-ai-paper.jpg',{type:'image/jpeg'});
  if(navigator.canShare&&navigator.canShare({files:[file]}))await navigator.share({files:[file],title:'我的已读 AI 论文'});
  else await navigator.share({title:'我的已读 AI 论文',url:'https://aipaper.jasonlin.tech'});
}catch(e){}}

/* 新手入门:里程碑论文,首页「第一次来」区(照 aipodcast STARTERS) */
const STARTERS=['ilya-alexnet-2012','kaiming-1512.03385','shazeer-1706.03762','tombrown-2005.14165','deepmind-alphafold'];
function vHome(){
 // 按收录时间(addedAt)排:hero=最新收录那篇,最新栏=其后几篇(照 AI Podcast 逻辑,新收录的论文总能刷上首页)
 const byAdded=[...PAPERS].sort((a,b)=>(b.addedAt||'').localeCompare(a.addedAt||'')||(b.date||'').localeCompare(a.date||''));
 const feat=byAdded[0]||PAPERS[0];
 const latest=byAdded.filter(p=>p.id!==feat.id).slice(0,5);
 const fp=feat?(PEOPLE[feat.pid]||{}):{};
 const c0=(feat&&feat.insights&&feat.insights.contrib||[])[0]||{};
 const fq={en:(feat&&feat.sEn)||c0.en||'',zh:(feat&&feat.sZh)||c0.zh||''};
 const fbg=(fp.fields||['deep-learning']).map(f=>(FIELDS[f]||{}).c||'#9aa4b2').join(',');
 return `
 <div class="site-tag">AI 学者的里程碑论文 · 中英对照全文<span class="st-n">${PAPERS.length} 篇 · ${pplOrder().length} 位学者</span></div>
 ${feat?`<div class="hero hero-wrap" style="max-width:1180px;margin:0 auto;padding:18px 24px 8px"><div class="hero-card">
   <div class="hero-art" style="background:linear-gradient(150deg,${fbg})"><div class="hero-cov"><span class="hc-pod">${(()=>{const s=(typeof ORG_LOGO!=='undefined')?ORG_LOGO[feat.org]:'';return s?`<img src="assets/orgs/${s}.webp" alt="" decoding="async" onerror="this.onerror=null;this.src='assets/orgs/${s}.png'">`:'';})()}${esc(feat.org||'')}</span><span class="hc-ct"><b>${esc(fp.en||'')}</b><span>${feat.date||''}</span></span></div>${av(feat.pid)}</div>
   <div class="hero-body">
     <div class="eyebrow">最新收录 · Latest</div>
     <h1>${esc(feat.tZh||feat.tEn)}</h1>
     ${feat.tZh&&feat.tEn&&feat.tZh!==feat.tEn?`<div class="hero-ten">${esc(feat.tEn)}</div>`:''}
     <div class="who">${esc(fp.en||'')} · ${esc(fp.zh||'')} &nbsp;|&nbsp; ${esc(feat.org||'')}</div>
     <div class="quote">“${esc(fq.en)}”</div>
     <div class="quote-zh">“${esc(fq.zh)}”</div>
     <button class="btn" onclick="go('#/paper/${feat.id}')">读双语全文</button>
   </div></div></div>
 <div style="max-width:1180px;margin:0 auto;padding:20px 24px 28px">
   <div class="ask-bar" onclick="go('#/ask')" title="问全站">
     <span class="ask-bar-ph">问关于 AI 论文的任何问题 —— 综合 ${pplOrder().length} 位学者、${PAPERS.length} 篇论文的内容回答</span>
     <span class="ask-bar-btn">问全站</span>
   </div></div>`:''}
 <div class="wrap">
  ${(()=>{const rec=recentGet().map(id=>PAPERS.find(p=>p.id===id)).filter(Boolean).slice(0,4);
   return rec.length?`<section style="padding:30px 0 0"><div class="eyebrow">Continue · 继续阅读</div>
    <div class="recent-strip" style="margin-top:14px">${rec.map(p=>{const pe=PEOPLE[p.pid]||{};
     return `<div class="recent-card" onclick="go('#/paper/${p.id}')"><div class="rc-top">${av(p.pid,'av-xs')}<div class="rc-nm">${esc(pe.zh||pe.en||'')}</div></div><div class="rt">${esc(p.tZh||p.tEn)}</div><div class="rs">${p.org?esc(p.org):(p.arxiv?'arXiv':esc(p.srcLabel||'文章'))}${p.date?' · '+p.date:''}</div></div>`;}).join('')}</div></section>`:'';})()}
  ${(()=>{const lt=laterGet().map(id=>PAPERS.find(p=>p.id===id)).filter(Boolean).filter(p=>!readHas(p.id)).reverse().slice(0,8);
   return lt.length?`<section style="padding-top:8px"><div class="eyebrow">Read later · 稍后读</div><h2 class="title">我的待读 · ${lt.length}</h2>
    <div class="grid" style="margin-top:20px">${lt.map(paperCard).join('')}</div></section>`:'';})()}
  ${(()=>{const st=STARTERS.map(id=>PAPERS.find(p=>p.id===id)).filter(Boolean);
   return st.length?`<section style="padding-top:30px;padding-bottom:0"><div class="eyebrow">Start here · 新手入门</div>
    <h2 class="title">第一次来？从这 ${st.length} 篇开始</h2>
    <div class="sub">改变 AI 走向的里程碑，每篇都值得完整读一遍。</div>
    <div class="rail" style="margin-top:22px">${st.map(paperCard).join('')}</div></section>`:'';})()}
  ${latest.length?`<section><div class="eyebrow">Latest · 最新收录</div><h2 class="title">最新论文</h2>
   <div class="grid" style="margin-top:20px">${latest.map(paperCard).join('')}</div></section>`:''}
  <section style="padding-top:8px"><div class="eyebrow">By field · 按领域浏览</div><h2 class="title">按研究领域浏览论文</h2>
   <div class="chips" style="margin-top:20px">${Object.keys(FIELDS).map(f=>`<span class="chip" onclick="go('#/papers?field=${f}')">${fdot(f)}${FIELDS[f].zh}</span>`).join('')}</div></section>
  <section><div class="eyebrow">Scholars · 学者</div><h2 class="title">${pplOrder().length} 位学者</h2>
   <div class="chips" style="margin:14px 0 2px">${Object.keys(FIELDS).map(f=>`<span class="chip" onclick="go('#/people?field=${f}')">${fdot(f)}${FIELDS[f].zh}</span>`).join('')}</div>
   <div class="grid ppl-grid home-ppl" style="margin-top:20px">${pplOrder().map(pplCard).join('')}<a class="ppl-card ppl-more" href="#/people"><span class="pm-n">+${Math.max(0,pplOrder().length-17)}</span><div class="pm-t">查看全部学者</div><div class="pm-c">共 ${pplOrder().length} 位 →</div></a></div></section>
 </div>${footer()}`;
}
function vPeople(field){
 const ids=pplOrder().filter(id=>!field||PEOPLE[id].fields.includes(field));
 return `<div class="wrap"><section>
  <div class="eyebrow">Scholars · 学者</div><h2 class="title">AI 学者</h2>
  <div class="chips" style="margin-top:18px"><span class="chip ${!field?'on':''}" onclick="go('#/people')">全部</span>
   ${Object.keys(FIELDS).map(f=>`<span class="chip ${field===f?'on':''}" onclick="go('#/people?field=${f}')">${fdot(f)}${FIELDS[f].zh}</span>`).join('')}</div>
  <div class="grid ppl-grid" style="margin-top:22px">${ids.map(pplCard).join('')||'<p class="sub">该领域暂无学者</p>'}</div>
 </section></div>${footer()}`;
}
function vPapers(qp){
 const field=(qp&&qp.get('field'))||'';const sort=(qp&&qp.get('sort'))||'new';const type=(qp&&qp.get('type'))||'';
 let ps=PAPERS.filter(p=>!field||(p.fields||[]).includes(field));
 // 类型筛选:无 arxiv 号 = 文章(博客长文),与 paperCard 的「文章」徽标同一判据
 if(type==='art')ps=ps.filter(p=>!p.arxiv);else if(type==='paper')ps=ps.filter(p=>p.arxiv);
 if(sort==='cites')ps=[...ps].sort((a,b)=>(b.cites||0)-(a.cites||0));
 const qs=(f,s,t)=>{const u=[];if(f)u.push('field='+f);if(s!=='new')u.push('sort='+s);if(t)u.push('type='+t);return '#/papers'+(u.length?'?'+u.join('&'):'');};
 return `<div class="wrap"><section><div class="eyebrow">Papers · 论文</div><h2 class="title">${type==='art'?'全部文章':type==='paper'?'全部论文':'论文与文章'} · ${ps.length}</h2>
  <div class="chips" style="margin-top:18px"><span class="chip ${!field?'on':''}" onclick="go('${qs('',sort,type)}')">全部</span>
   ${Object.keys(FIELDS).map(f=>`<span class="chip ${field===f?'on':''}" onclick="go('${qs(f,sort,type)}')">${fdot(f)}${FIELDS[f].zh}</span>`).join('')}</div>
  <div class="chips" style="margin-top:10px"><span style="font-size:13px;color:var(--sub2);align-self:center">类型</span>
   <span class="chip ${!type?'on':''}" onclick="go('${qs(field,sort,'')}')">全部</span>
   <span class="chip ${type==='paper'?'on':''}" onclick="go('${qs(field,sort,'paper')}')">论文</span>
   <span class="chip ${type==='art'?'on':''}" onclick="go('${qs(field,sort,'art')}')">文章</span></div>
  <div class="chips" style="margin-top:10px"><span style="font-size:13px;color:var(--sub2);align-self:center">排序</span>
   <span class="chip ${sort==='new'?'on':''}" onclick="go('${qs(field,'new',type)}')">最新收录</span>
   <span class="chip ${sort==='cites'?'on':''}" onclick="go('${qs(field,'cites',type)}')">被引最多</span></div>
  <div class="grid" style="margin-top:20px">${(window._allPapers?ps:ps.slice(0,90)).map(paperCard).join('')||'<p class="sub">暂无论文</p>'}</div>
  ${(!window._allPapers&&ps.length>90)?`<div style="text-align:center;margin-top:22px"><button class="askbtn" style="width:auto;padding:10px 26px" onclick="window._allPapers=1;render();">显示全部 ${ps.length} 篇</button></div>`:''}</section></div>${footer()}`;
}
function vPerson(pid){
 const p=PEOPLE[pid]; if(!p) return vHome();
 const ps=papersOf(pid);
 return `<div class="wrap"><section>
  <span class="back" onclick="go('#/people')">← 学者</span>
  <div class="row">${av(pid,'bigav')}<div><h1 style="margin:0;font-size:34px">${esc(p.en)}</h1>
   <div class="sub" style="margin:2px 0">${esc(p.zh)}</div>
   <div class="sub">${esc(p.tiEn)} · ${esc(p.tiZh)}</div>
   <div style="margin-top:8px">${p.fields.map(ftag).join(' ')}</div></div></div>
  <p class="bio">${esc(p.bioEn)}</p><p class="bioz">${esc(p.bioZh)}</p>
  ${PAPER_GRAPH[pid]?`<a class="xlink" href="https://ai.jasonlin.tech/?node=${PAPER_GRAPH[pid]}" target="_blank" rel="noopener" style="margin-right:10px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6.5" r="2.1"/><circle cx="18" cy="8" r="2.1"/><circle cx="10.5" cy="18" r="2.1"/><path d="M8 7l7.9 1M8.1 8l1.8 8"/></svg>在关系图谱中查看</a>`:''}${PAPER2POD[pid]?`<a class="xlink" href="https://aipodcast.jasonlin.tech/#/person/${PAPER2POD[pid]}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14v-1a9 9 0 0 1 18 0v1"/><rect x="3" y="13.5" width="4" height="6.5" rx="1.6"/><rect x="17" y="13.5" width="4" height="6.5" rx="1.6"/></svg>在 AI 播客中收听访谈</a>`:''}
  ${vArc(ps)}
  <h3 style="margin-top:30px">代表论文 · ${ps.length}</h3>
  <div class="grid" style="margin-top:14px">${ps.map(paperCard).join('')||'<p class="sub">暂无</p>'}</div>
 </section></div>${footer()}`;
}
/* 研究脉络:按年份把这位学者的论文串起来,看研究焦点怎么迁移。
   对标 aipodcast 的「观点演变」,但纯数据驱动(年份+领域+被引),不需要跑 LLM。 */
function arcOf(ps){
 const by={};
 ps.forEach(p=>{const y=(p.date||'').slice(0,4);if(!/^(19|20)\d{2}$/.test(y))return;(by[y]=by[y]||[]).push(p);});
 return Object.keys(by).sort().map(y=>{
  const list=by[y].slice().sort((a,b)=>(b.cites||0)-(a.cites||0));
  const fs=[];list.forEach(p=>(p.fields||[]).forEach(f=>{if(!fs.includes(f))fs.push(f);}));
  return {y,list,fields:fs,top:list[0]};
 });
}
function vArc(ps){
 const arc=arcOf(ps);
 if(ps.length<3||arc.length<2)return '';   // 一两篇或全挤在同一年,连不出脉络
 return `<h3 style="margin-top:34px">研究脉络 · Research arc<span class="archint">${arc[0].y} → ${arc[arc.length-1].y} · 由早及近</span></h3>
  <ol class="arclist">${arc.map(a=>`<li>
   <span class="ay">${a.y}</span>
   <div class="ab"><a class="at" href="#/paper/${encodeURIComponent(a.top.id)}">${esc(a.top.tEn)}<span class="atz">${esc(a.top.tZh)}</span></a>
    <div class="am">${a.fields.map(f=>`<span class="tag">${fdot(f)}${(FIELDS[f]||{}).zh||f}</span>`).join('')}${a.top.cites!=null?`<span>被引 ${fmtCites(a.top.cites)}</span>`:''}${a.list.length>1?`<span>另 ${a.list.length-1} 篇</span>`:''}</div></div>
  </li>`).join('')}</ol>`;
}
function cleanZh(t){
  if(!t)return t;
  // 去中文字之间/中文与全角标点之间的杂散空格(PDF抽取+译文噪声);保留中英文/数字间的正常空格
  return t.replace(/([一-鿿])\s+(?=[一-鿿])/g,'$1')
          .replace(/([一-鿿])\s+([，。、；：？！）】」』])/g,'$1$2')
          .replace(/([（【「『])\s+([一-鿿])/g,'$1$2')
          .replace(/ {2,}/g,' ');
}
function mdMath(t){
  if(!t)return '';
  t=cleanZh(t);
  const math=[];
  t=String(t).replace(/\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)/g,function(m){math.push(m);return '\u0002'+(math.length-1)+'\u0002';});
  return mdHtml(t).replace(/\u0002(\d+)\u0002/g,function(_,i){return math[+i];});
}
function renderItem(it){
 if(it.t==='fig')return `<figure class="pfig"><img loading="lazy" src="${it.src}" alt="figure" data-orig="${it.origSrc||''}" onerror="if(this.dataset.orig&&this.src!==this.dataset.orig){this.src=this.dataset.orig;}else{this.closest('figure').style.display='none';}"><figcaption><span class="lang-en">${esc(it.capEn||'')}</span><span class="lang-zh">${esc(it.capZh||'')}</span></figcaption></figure>`;
 if(it.t==='eq')return `<div class="peq">\\[${it.tex}\\]</div>`;
 return `<div class="para"><div class="en">${mdMath(it.en)}</div><div class="zh">${mdMath(it.zh)}</div></div>`;}
function ilist(arr,head){return `<div class="icard"><h4 style="color:var(--acc)">${head}</h4><ul style="margin:0;padding-left:18px">${(arr||[]).map(x=>`<li><span class="lang-en">${esc(x.en)}</span><span class="z lang-zh">${esc(x.zh)}</span></li>`).join('')}</ul></div>`;}
function vPaper(id){
 const p=PAPERS.find(x=>x.id===id); if(!p) return vHome();
 recentAdd(id);
 const pe=PEOPLE[p.pid]||{};
 const full=FULL_CACHE[id];
 const ins=(full&&full.insights)||p.insights||{};
 const absEn=(full&&full.absEn)||p.absEn||'',absZh=(full&&full.absZh)||p.absZh||'';
 const secs=full?full.full.filter(s=>!/^abstract$/i.test(s.sec)):[];
 const reader=full?secs.map((s,i)=>`<div class="sec-h" id="sec-${i}"><span class="se">${esc(s.sec)}</span><span class="sz">${esc(s.secZh||s.sec)}</span></div>`+
    (s.items?s.items.map(renderItem).join(''):(s.paras||[]).map(pa=>renderItem({t:'para',en:pa.en,zh:pa.zh})).join('')) ).join('')
   :`<div class="skeleton" style="width:90%"></div><div class="skeleton" style="width:80%"></div><div class="skeleton" style="width:86%"></div>`;
 const tocItems=secs.map((s,i)=>`<a class="toc-i" data-sec="${i}" onclick="jumpSec(${i})"><span class="se">${esc(s.sec)}</span><span class="sz">${esc(s.secZh||s.sec)}</span></a>`).join('');
 const hasToc=secs.length>=3;
 if(!full) ensureFull(id);
 const ord=document.body.dataset.order==='zh'?'译文在前':'原文在前';
 const rcol=`
  <h1 style="font-size:33px;margin:0 0 3px;letter-spacing:-.02em;line-height:1.14">${esc(p.tEn)}</h1>
  <div class="sub" style="font-size:19px;color:var(--ink);margin-bottom:15px">${esc(p.tZh)}</div>
  <div class="info">
   <span class="who" onclick="go('#/person/${p.pid}')">${av(p.pid,'av-xs')}<span>${esc(pe.en||'')}${pe.zh?' · '+esc(pe.zh):''}</span></span>
   ${(p.org&&pe.en!==p.org&&pe.zh!==p.org)?`<span class="sep">·</span>${orgChip(p.org)}`:''}
   <span class="sep">·</span>${p.arxiv?`<a class="alink" href="https://arxiv.org/abs/${p.arxiv}" target="_blank">arXiv:${p.arxiv} ↗</a>`:`<a class="alink" href="${p.srcUrl||'#'}" target="_blank">${esc(p.srcLabel||'PDF')} ↗</a>`}
   <span class="sep">·</span><span>${p.date}</span>${hasToc?`<span class="sep">·</span><span>${secs.length} 章</span>`:''}
   <span class="sep">·</span>${(p.fields||[]).map(ftag).join(' ')}
  </div>
  <div class="rd-actions">${PAPER2POD[p.pid]?`<a class="rd-btn xsite-inline" href="https://aipodcast.jasonlin.tech/#/person/${PAPER2POD[p.pid]}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/></svg>听 TA 的播客</a>`:''}</div>
  ${p.cites!=null?`<div class="citebar"><span class="num">${fmtCites(p.cites)}</span> 次被引用 · <span style="color:var(--sub)">学术影响力(Semantic Scholar)</span></div>`:''}
  <div class="cards2">${full||p.insights?ilist(ins.contrib,'核心贡献 · Key Contributions')+ilist(ins.limits,'局限与边界 · Limitations'):`<div class="icard"><div class="skeleton" style="width:88%"></div><div class="skeleton" style="width:72%"></div></div><div class="icard"><div class="skeleton" style="width:84%"></div><div class="skeleton" style="width:66%"></div></div>`}</div>
  <h3 style="margin-top:30px">摘要 · Abstract</h3>
  ${absEn?`<div class="para"><div class="en">${esc(absEn)}</div><div class="zh">${esc(absZh)}</div></div>`:`<div class="skeleton" style="width:92%"></div><div class="skeleton" style="width:85%"></div>`}
  <div id="askInline">${askBox(p,ins)}</div>
  <h3 style="margin-top:34px">全文 · 逐段中英对照</h3>
  <div class="reader">${reader}</div>`;
 return `
 <div class="read-bar">
   <div class="read-prog" id="readProg"></div>
   <div class="back" onclick="history.back()">‹ <b>${esc(pe.zh||'')}${(p.org&&pe.zh!==p.org&&pe.en!==p.org)?' · '+esc(p.org):''}</b></div>
   <div class="tools">
     <div class="seg" id="langSeg"><button onclick="setLang('en')">EN</button><button onclick="setLang('zh')">中</button><button onclick="setLang('both')">双语</button></div>
     <div class="rb-drop" id="rbDrop">
     <div class="seg" id="sizeSeg"><button onclick="setSize('s')">小</button><button onclick="setSize('m')">中</button><button onclick="setSize('l')">大</button></div>
     <button id="orderBtn" class="ordbtn" onclick="toggleOrder()"><span class="ol">${ord}</span><span class="olx">${ord[0]}</span></button>
     <button class="ordbtn" onclick="copyShare('${p.id}')">分享</button>
      <button id="readBtn" class="ordbtn readbtn${readHas(p.id)?' on':''}" onclick="toggleRead('${p.id}')">${readHas(p.id)?'已读 ✓':'已读'}</button>
      <button id="laterBtn" class="ordbtn laterbtn${laterHas(p.id)?' on':''}" onclick="toggleLater('${p.id}')">${laterHas(p.id)?'待读 ★':'稍后读'}</button>
     </div>
     <button class="rb-more" onclick="rbToggle(event)" aria-label="更多操作">⋯</button>
   </div>
 </div>
 ${hasToc?`<div class="read-wrap"><nav class="toc"><div class="toc-h">目录 · Contents</div>${tocItems}</nav><div class="rcol">${rcol}${recoBlock(p,full)}</div><aside class="askside" id="askDesk"></aside></div>
 <button class="toc-fab" onclick="toggleTocSheet()">目录</button>
 <div class="toc-sheet" id="tocSheet" onclick="if(event.target===this)toggleTocSheet()"><div class="panel"><div class="sh-h">目录 · Contents</div>${tocItems}</div></div>`
 :`<div class="read-wrap read-wrap-notoc"><div class="rcol" style="padding-top:24px">${rcol}${recoBlock(p,full)}</div><aside class="askside" id="askDesk"></aside></div>`}`;
}
function askBox(p,ins){
 const qs=['一句话总结这篇论文','它的核心方法是什么','有哪些局限'];
 return `<div class="askbox"><div style="font-weight:650;margin-bottom:10px">针对这篇论文问 AI</div>
  <div class="chat-thread" id="chatThread">${renderPThread(p.id)}</div>
  <div class="qsugg">${qs.map(q=>`<span data-pid="${p.id}" onclick="sugAsk(this)">${esc(q)}</span>`).join('')}</div>
  <div class="chat-in"><input id="q" placeholder="问关于这篇论文的任何问题" onkeydown="if(event.key==='Enter')askPaper('${p.id}')"><button class="askbtn" onclick="askPaper('${p.id}')">发送</button></div></div>`;
}
function vAsk(){
 return `<div class="wrap"><section><div class="eyebrow">Ask · 问 AI</div><h2 class="title">问遍全站论文</h2>
  <p class="sub">基于站内 ${PAPERS.length} 篇论文的内容回答，并标注引用来源。进入任意论文页也可单篇提问。</p>
  <div class="askbox" style="margin-top:18px"><input id="q" placeholder="例如：注意力机制是怎么提出的？" onkeydown="if(event.key==='Enter')askAll()">
   <button class="askbtn" onclick="askAll()">提问</button><div class="ans" id="ans"></div></div>
 </section></div>${footer()}`;
}
const MCP_URL='https://mcp.jasonlin.tech/mcp';
function copyMcp(){navigator.clipboard&&navigator.clipboard.writeText(MCP_URL);const b=document.getElementById('mcpCopy');if(b){b.textContent='已复制';setTimeout(()=>b.textContent='复制',1500);}}
function footer(){return `<footer><div class="wrap">
  <div class="legal-note" style="margin-bottom:22px">
    <b>接入 AI 助手 · MCP</b> — 全站 ${PAPERS.length} 篇论文与长文双语全文，可接入 Claude、Cursor 等做问答。只读、免费、无需 key。<br>
    <code class="mcp-url">${MCP_URL}</code><button id="mcpCopy" class="mcp-copy" onclick="copyMcp()">复制</button>
  </div>
  <div class="legal-note" style="margin-bottom:22px" id="syncPanel">
    <div class="legal-note" style="margin-bottom:14px"><b>姊妹站</b> — 同一批人物，三种读法：<a href="https://aipodcast.jasonlin.tech" target="_blank" rel="noopener">AI Podcast</a>（他们的访谈，双语全文）· <a href="https://ai.jasonlin.tech" target="_blank" rel="noopener">AI 学者图谱</a>（谁和谁共事、师承、合创）。另有 <a href="https://hardware.jasonlin.tech" target="_blank" rel="noopener">硬件</a>、<a href="https://investor.jasonlin.tech" target="_blank" rel="noopener">投资</a>、<a href="https://design.jasonlin.tech" target="_blank" rel="noopener">设计</a>三个姊妹图谱。阅读记录用同一个同步码互通。</div>
    ${syncPanelInner()}
  </div>
  <b>AI Paper · AI 论文</b> — 知名 AI 学者的论文与长文，双语阅读。<a href="/feed.xml">📡 RSS 订阅</a><br>
  版权归原作者、arXiv 及各机构；双语全文为 AI 翻译，仅供学习研究，以原文为准。权利人如需下架：<a href="mailto:linzheng3535@gmail.com?subject=AI%20Paper%20Takedown">linzheng3535@gmail.com</a>，即刻处理。<br>
  译文 AI 生成，偶有瑕疵；照片来自 <a href="https://commons.wikimedia.org" target="_blank">Wikimedia</a> 及本人公开主页、机构标识仅作识别；匿名统计，无 Cookie。领域分类来自 <a href="https://ai.jasonlin.tech" target="_blank">AI 学者图谱</a>。
 </div></footer>`;}

/* ===== ASK (需部署 chat-worker；未配置则提示) ===== */
function mdHtml(src){
  const blocks=[];let s=esc(src||'');
  s=s.replace(/```[a-zA-Z]*\n?([\s\S]*?)```/g,(_,c)=>{blocks.push('<pre class="cpre"><code>'+c.replace(/\n$/,'')+'</code></pre>');return '\u0000'+(blocks.length-1)+'\u0000';});
  s=s.replace(/`([^`\n]+)`/g,(_,c)=>{blocks.push('<code class="cinl">'+c+'</code>');return '\u0000'+(blocks.length-1)+'\u0000';});
  const lines=s.split('\n'),out=[];let list=null;
  const closeL=()=>{if(list){out.push('</'+list+'>');list=null;}};
  for(const line of lines){let m;
    if(/^\u0000\d+\u0000$/.test(line)){closeL();out.push(line);continue;}
    if(/^\s*$/.test(line)){closeL();continue;}
    if(m=line.match(/^\s{0,3}(#{1,4})\s+(.*)$/)){closeL();out.push('<div class="cmh cmh'+m[1].length+'">'+m[2]+'</div>');continue;}
    if(/^\s{0,3}([-*_])\1{2,}\s*$/.test(line)){closeL();out.push('<hr class="cmhr">');continue;}
    if(m=line.match(/^\s{0,3}&gt;\s?(.*)$/)){closeL();out.push('<blockquote class="cmq">'+m[1]+'</blockquote>');continue;}
    if(m=line.match(/^\s*[-*+]\s+(.*)$/)){if(list!=='ul'){closeL();out.push('<ul class="cml">');list='ul';}out.push('<li>'+m[1]+'</li>');continue;}
    if(m=line.match(/^\s*\d+[.)]\s+(.*)$/)){if(list!=='ol'){closeL();out.push('<ol class="cml">');list='ol';}out.push('<li>'+m[1]+'</li>');continue;}
    closeL();out.push('<p class="cmp">'+line+'</p>');}
  closeL();s=out.join('');
  s=s.replace(/\*\*([^\n]+?)\*\*/g,'<strong>$1</strong>')
     .replace(/(^|[^*\w])\*([^*\n]+?)\*(?!\w)/g,'$1<em>$2</em>')
     .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,'<a href="$2" target="_blank" rel="nofollow noopener">$1</a>');
  return s.replace(/\u0000(\d+)\u0000/g,(_,i)=>blocks[+i]);
}
let _asking=false;
function citeLinks(html){
 return html.replace(/\[@([a-z0-9._-]+)\]/gi,(m,id)=>{const p=PAPERS.find(x=>x.id===id);
  return p?`<a class="alink" style="cursor:pointer" onclick="go('#/paper/${id}')">《${esc(p.tZh||p.tEn)}》</a>`:m;})
 .replace(/\\\((.+?)\\\)/g,'<i>$1</i>');   // 行内公式 \( x \) 降级为斜体
}
async function ask(payload,box){
 if(!CHAT_PROXY){box.textContent="（问答未配置）";return;}
 if(_asking)return;_asking=true;
 box.textContent="思考中…";
 try{const r=await fetch(CHAT_PROXY,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  if(!r.ok){box.textContent="出错："+r.status+" "+(await r.text());return;}
  const reader=r.body.getReader(),dec=new TextDecoder();let buf="";box.textContent="";box.classList.add('md');
  for(;;){const{done,value}=await reader.read();if(done)break;buf+=dec.decode(value,{stream:true});box.innerHTML=citeLinks(mdHtml(buf));}
 }catch(e){box.textContent="出错了："+e;}
 finally{_asking=false;}
}
function sugAsk(el){const q=document.getElementById('q');if(q){q.value=el.textContent;askPaper(el.dataset.pid);}}
const PCHAT={};  // 多轮对话(照 aipodcast):{论文id:[{role,content}]}
function renderPThread(id){return (PCHAT[id]||[]).map(m=>m.role==='user'?`<div class="cmsg cu">${esc(m.content)}</div>`:`<div class="cmsg ca${m.content&&m.content!=='…'?' md':''}">${(!m.content||m.content==='…')?'<span class="cdots">思考中…</span>':citeLinks(mdHtml(m.content))}</div>`).join('');}
async function askPaper(id){
 const inp=document.getElementById('q');const q=(inp?inp.value:'').trim();if(!q)return;
 if(!CHAT_PROXY){alert('问答未配置');return;}
 if(_asking)return;
 const p=FULL_CACHE[id]||PAPERS.find(x=>x.id===id)||{};
 PCHAT[id]=PCHAT[id]||[];
 const hist=PCHAT[id].filter(m=>m.content&&m.content!=='…').slice(-4).map(m=>({role:m.role,content:m.content}));
 PCHAT[id].push({role:'user',content:q},{role:'assistant',content:'…'});
 if(inp)inp.value='';
 const ai=PCHAT[id].length-1;const thread=document.getElementById('chatThread');
 const refresh=()=>{if(thread){thread.innerHTML=renderPThread(id);thread.scrollTop=thread.scrollHeight;}};
 refresh();_asking=true;
 try{
  const r=await fetch(CHAT_PROXY,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode:'paper',q:q.slice(0,500),id,title:p.tEn,history:hist})});
  if(!r.ok){PCHAT[id][ai].content='出错：'+r.status;refresh();return;}
  const reader=r.body.getReader(),dec=new TextDecoder();let buf='';
  for(;;){const{done,value}=await reader.read();if(done)break;buf+=dec.decode(value,{stream:true});PCHAT[id][ai].content=buf;refresh();}
 }catch(e){PCHAT[id][ai].content='出错了：'+e;refresh();}
 finally{_asking=false;}}
function askAll(){const q=document.getElementById('q').value.trim();if(!q)return;
 ask({mode:'all',q},document.getElementById('ans'));}

/* ===== LAZY FULL TEXT ===== */
async function ensureFull(id){
 if(FULL_CACHE[id])return FULL_CACHE[id];
 try{const r=await fetch('data/'+id+'.json');if(!r.ok)throw new Error(r.status);FULL_CACHE[id]=await r.json();
  if(location.hash.includes('/paper/'+id))render();return FULL_CACHE[id];}
 catch(e){const rd=document.querySelector('.reader');
  if(rd&&location.hash.includes('/paper/'+id))rd.innerHTML=`<div class="sub" style="padding:16px 0">全文加载失败（网络波动）。<a class="alink" style="cursor:pointer" onclick="ensureFull('${id}')">点此重试</a></div>`;}
}

function vOrgs(){const list=orgList();
 return `<div class="wrap"><section><div class="eyebrow">Organizations · 机构</div><h2 class="title">按机构看论文</h2>
  <p class="sub">${list.length} 家机构 · ${PAPERS.length} 篇论文，看每家产出的代表作。</p>
  <div class="grid ppl-grid" style="margin-top:22px">${list.map(([o,n])=>`<div class="ppl-card" onclick="go('#/org/'+encodeURIComponent('${o.replace(/'/g,"")}'))"><div class="av orgav" style="${ORG_LOGO[o]?'':'background:'+orgColor(o)+';font-size:18px'}">${ORG_LOGO[o]?orgLogo(o,'orgavimg'):esc(o.split(' ').map(w=>w[0]).join('').slice(0,3))}</div><div class="n">${esc(o)}</div><div class="cnt">${n} 篇论文</div></div>`).join('')}</div>
 </section></div>${footer()}`;}
function vOrg(o){o=decodeURIComponent(o);const ps=papersByOrg(o).sort((a,b)=>(b.cites||0)-(a.cites||0));
 return `<div class="wrap"><section><span class="back" onclick="go('#/orgs')">← 机构</span>
  <div class="orghead"><div class="orgbadge" style="background:${ORG_LOGO[o]?'#fff':orgColor(o)}">${ORG_LOGO[o]?`<img src="assets/orgs/${ORG_LOGO[o]}.webp" alt="" decoding="async" onerror="this.onerror=null;this.src='assets/orgs/${ORG_LOGO[o]}.png'">`:`<span>${esc(o.split(' ').map(w=>w[0]).join('').slice(0,3))}</span>`}</div><div style="min-width:0"><h1>${esc(o)}</h1><p class="sub">${ps.length} 篇论文 · 按被引排序</p></div></div>
  <div class="grid" style="margin-top:18px">${ps.map(paperCard).join('')||'<p class="sub">暂无</p>'}</div>
 </section></div>${footer()}`;}
function toggleTheme(){const t=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=t;localStorage.theme=t;}
/* 切换语言/字号/顺序时保持阅读位置:记住视口内第一个段落/节标题的屏幕位置,切完再对齐(照 aipodcast) */
function keepAnchor(fn){
 const els=document.querySelectorAll('.reader .sec-h,.reader .para');
 let anchor=null,off=0;
 for(const el of els){const r=el.getBoundingClientRect();if(r.bottom>96){anchor=el;off=r.top;break;}}
 fn();
 if(anchor)requestAnimationFrame(()=>{const top=anchor.getBoundingClientRect().top+scrollY-off;scrollTo(0,Math.max(0,top));});
}
/* 目录跟随滚动:高亮当前章节,悬浮按钮显示进度。
   不用 IntersectionObserver——快速滚动会一帧跳过整条检测带而漏触发;
   改 rAF 节流的 scroll 监听,按 offsetTop 实时算当前节(懒加载图片撑高页面也不怕)。 */
let tocHeads=null,_tocCur=-1,_tocTick=false;
function setTocActive(i,total){
 document.querySelectorAll('.toc-i').forEach(a=>a.classList.toggle('on',+a.dataset.sec===i));
 const fab=document.querySelector('.toc-fab');if(fab&&total)fab.textContent=`目录 · ${i+1}/${total}`;
 const t=document.querySelector('.toc'),el=t&&t.querySelector('.toc-i.on');   // 长目录跟随当前章
 if(el&&(el.offsetTop<t.scrollTop+40||el.offsetTop>t.scrollTop+t.clientHeight-60))t.scrollTop=el.offsetTop-t.clientHeight/2;
}
function tocOnScroll(){
 if(!tocHeads||_tocTick)return;_tocTick=true;
 requestAnimationFrame(()=>{_tocTick=false;if(!tocHeads)return;
  const y=scrollY+150;let i=0;
  for(let k=0;k<tocHeads.length;k++){if(tocHeads[k].offsetTop<=y)i=k;else break;}
  if(i!==_tocCur){_tocCur=i;setTocActive(i,tocHeads.length);}
 });
}
addEventListener('scroll',tocOnScroll,{passive:true});
function initTOC(){
 tocHeads=[...document.querySelectorAll('.reader .sec-h')];_tocCur=-1;
 if(!tocHeads.length){tocHeads=null;return;}
 tocOnScroll();
}
/* 每个路由更新标签页标题/描述(照 aipodcast updateMeta) */
function updateMeta(parts){
 let title='AI Paper · 双语论文阅读站',desc='著名 AI 学者与他们的代表论文，逐段中英对照全文 + 核心贡献，还能针对论文内容直接问 AI。';
 const id=parts[1]?decodeURIComponent(parts[1]):'';
 if(parts[0]==='paper'){const p=PAPERS.find(x=>x.id===id);if(p){const pe=PEOPLE[p.pid]||{};
  title=`${p.tZh||p.tEn} · ${pe.zh||pe.en||''} — AI Paper`;desc=(p.sZh||p.sEn||p.tEn||'').slice(0,150);}}
 else if(parts[0]==='person'){const pe=PEOPLE[id];if(pe)title=`${pe.zh||pe.en} ${pe.zh?pe.en:''} 的论文 — AI Paper`;}
 else if(parts[0]==='people')title='全部学者 — AI Paper';
 else if(parts[0]==='papers')title='全部论文 — AI Paper';
 else if(parts[0]==='orgs')title='按机构浏览 — AI Paper';
 else if(parts[0]==='org'&&id)title=`${id} 的论文 — AI Paper`;
 else if(parts[0]==='ask')title='问全站 — AI Paper';
 else if(parts[0]==='mine')title='我的 — AI Paper';
 else if(parts[0]==='stats')title='访问统计 — AI Paper';
 document.title=title;
 const m=document.querySelector('meta[name="description"]');if(m)m.setAttribute('content',desc);
}
function setLang(l){keepAnchor(()=>{document.body.dataset.lang=l;});localStorage.lang=l;syncSeg();}
function setSize(s){keepAnchor(()=>{document.body.dataset.size=s;});localStorage.size=s;syncSeg();}
function rbToggle(ev){if(ev)ev.stopPropagation();const b=document.querySelector('.read-bar');if(b)b.classList.toggle('rb-open');}
addEventListener('click',e=>{const b=document.querySelector('.read-bar.rb-open');if(b&&!b.contains(e.target))b.classList.remove('rb-open');});
function toggleOrder(){keepAnchor(()=>{const o=document.body.dataset.order==='zh'?'en':'zh';document.body.dataset.order=o;localStorage.order=o;});const b=document.querySelector('#orderBtn .ol');if(b)b.textContent=document.body.dataset.order==='zh'?'译文在前':'原文在前';}
function syncSeg(){const lg=document.body.dataset.lang||'both',sz=document.body.dataset.size||'m';
 const ls=document.getElementById('langSeg');if(ls){const m={en:0,zh:1,both:2};[...ls.children].forEach((b,i)=>b.classList.toggle('on',i===m[lg]));}
 const ss=document.getElementById('sizeSeg');if(ss){const m={s:0,m:1,l:2};[...ss.children].forEach((b,i)=>b.classList.toggle('on',i===m[sz]));}}
let _spyTick=false;
addEventListener('scroll',()=>{
 const _rp=document.getElementById('readProg');if(_rp)_rp.style.width=progWidth()+'%';
 if(_spyTick)return;_spyTick=true;
 requestAnimationFrame(()=>{_spyTick=false;
  const heads=document.querySelectorAll('.reader .sec-h');if(!heads.length)return;
  const items=document.querySelectorAll('.toc .toc-i');if(!items.length)return;
  let cur=0;const mid=innerHeight*0.35;
  heads.forEach((el,i)=>{if(el.getBoundingClientRect().top<mid)cur=i;});
  items.forEach((el,i)=>el.classList.toggle('on',i===cur));
   const _hp=(location.hash||'').match(/^#\/paper\/(.+?)(\?|$)/);if(_hp&&!pendingLocate)readPosSave(decodeURIComponent(_hp[1]),cur,heads.length);
 });},{passive:true});
const askMQ=matchMedia('(min-width:1400px)');
function placeAsk(){
 const box=document.querySelector('.askbox');if(!box)return;
 const desk=document.getElementById('askDesk'),inline=document.getElementById('askInline');
 if(askMQ.matches){if(desk&&box.parentElement!==desk)desk.appendChild(box);}
 else{if(inline&&box.parentElement!==inline)inline.appendChild(box);}
}
askMQ.addEventListener?askMQ.addEventListener('change',placeAsk):askMQ.addListener(placeAsk);
function jumpSec(i){const el=document.getElementById('sec-'+i);if(el)el.scrollIntoView({behavior:'smooth',block:'start'});const sh=document.getElementById('tocSheet');if(sh)sh.classList.remove('on');}
function toggleTocSheet(){const s=document.getElementById('tocSheet');if(s)s.classList.toggle('on');}
async function copyShare(id){const url=location.origin+'/p/'+id+'/';const b=event&&event.currentTarget;try{await navigator.clipboard.writeText(url);if(b){const t=b.textContent;b.textContent='已复制';setTimeout(()=>b.textContent=t,1500);}}catch(e){if(b)b.textContent='复制失败';}}
function inReader(node){let el=node&&(node.nodeType===3?node.parentElement:node);return !!(el&&el.closest&&el.closest('.reader'));}
function selSecIndex(){const node=window.getSelection().anchorNode;if(!node)return -1;
 let el=node.nodeType===3?node.parentElement:node;const unit=el&&el.closest?el.closest('.para,.pfig,.peq'):null;let p=unit||el;
 while(p){if(p.classList&&p.classList.contains('sec-h')){const mm=(p.id||'').match(/sec-(\d+)/);return mm?+mm[1]:-1;}p=p.previousElementSibling;}return -1;}
/* ===== 划词标记(高亮),照 aipodcast:localStorage.paperMarks={id:[{sec,pi,lang,s,e,text}]} ===== */
function mkGet(){try{const x=JSON.parse(localStorage.paperMarks||'{}');return x&&typeof x==='object'?x:{}}catch(e){return{}}}
function mkSave(x){try{localStorage.paperMarks=JSON.stringify(x)}catch(_){}if(typeof syncTouch==='function')syncTouch();}
function mkCount(){return Object.values(mkGet()).reduce((n,a)=>n+(a?a.length:0),0);}
function mkPid(){const m=(location.hash||'').match(/#\/paper\/([^?]+)/);return m?decodeURIComponent(m[1]):'';}
function mkNodeAt(el,off){const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n,acc=0;while(n=w.nextNode()){const len=n.nodeValue.length;if(off<=acc+len)return[n,off-acc];acc+=len;}return[null,0];}
function mkOffIn(el,container,off){const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n,sum=0;while(n=w.nextNode()){if(n===container)return sum+off;sum+=n.nodeValue.length;}return sum;}
function mkTag(){const rd=document.querySelector('.reader');if(!rd)return;let sec=0,pi=0;rd.querySelectorAll('.sec-h,.para').forEach(el=>{if(el.classList.contains('sec-h')){sec=+((el.id||'sec-0').replace('sec-',''))||0;pi=0;return;}el.dataset.sec=sec;el.dataset.pi=pi++;});}
function mkWrap(el,s,e,idx){const[sn,so]=mkNodeAt(el,s),[en,eo]=mkNodeAt(el,e);if(!sn||!en)return;try{const r=document.createRange();r.setStart(sn,so);r.setEnd(en,eo);const sp=document.createElement('span');sp.className='mk';sp.dataset.mi=idx;sp.title='点击移除标记';sp.addEventListener('click',ev=>{ev.stopPropagation();mkRemove(mkPid(),+sp.dataset.mi);});r.surroundContents(sp);}catch(_){}}
function mkApply(){const pid=mkPid();if(!pid)return;mkTag();const rd=document.querySelector('.reader');if(!rd)return;const marks=mkGet()[pid]||[];marks.forEach((m,idx)=>{const para=rd.querySelector('.para[data-sec="'+m.sec+'"][data-pi="'+m.pi+'"]');if(!para)return;const side=para.querySelector('.'+m.lang);if(side)mkWrap(side,m.s,m.e,idx);});}
function markSel(){const sel=window.getSelection();const text=(sel?sel.toString():'').trim();if(text.length<2||!sel.anchorNode||!inReader(sel.anchorNode)){mkHideSel();return;}const pid=mkPid();if(!pid){mkHideSel();return;}mkTag();let a=sel.anchorNode.nodeType===3?sel.anchorNode.parentElement:sel.anchorNode;const side=a&&a.closest?a.closest('.para .en,.para .zh'):null;if(!side){mkHideSel();return;}const lang=side.classList.contains('en')?'en':'zh';const para=side.closest('.para');if(!para){mkHideSel();return;}const sec=+para.dataset.sec,pi=+para.dataset.pi;const r=sel.getRangeAt(0);let s=mkOffIn(side,r.startContainer,r.startOffset),e=mkOffIn(side,r.endContainer,r.endOffset);if(s>e){const t=s;s=e;e=t;}if(e-s<1){mkHideSel();return;}const st=mkGet();const arr=st[pid]||(st[pid]=[]);if(arr.some(h=>h.sec===sec&&h.pi===pi&&h.lang===lang&&!(e<=h.s||s>=h.e))){mkHideSel();return;}arr.push({sec,pi,lang,s,e,text:text.slice(0,300),ts:Date.now()});mkSave(st);mkHideSel();const y=scrollY;render();scrollTo(0,y);}
function mkRemove(pid,idx){const st=mkGet(),arr=st[pid]||[];if(arr[idx]){arr.splice(idx,1);if(!arr.length)delete st[pid];mkSave(st);const y=scrollY;render();scrollTo(0,y);}}
function mkHideSel(){const b=document.getElementById('selBar');if(b){b.style.display='none';b.classList.remove('dock');}try{const s=window.getSelection();s&&s.removeAllRanges&&s.removeAllRanges();}catch(_){}}
function mkJump(pid,sec,text){pendingLocate={id:pid,at:sec,hl:text||''};go('#/paper/'+pid);}
function mineMarksHtml(){const mm=mkGet();const pids=Object.keys(mm).filter(id=>mm[id]&&mm[id].length&&PAPERS.find(p=>p.id===id));if(!pids.length)return '';
 let h=`<div class="st-h2" style="margin-top:34px">我的标记 · ${mkCount()}</div><div class="mine-marks">`;
 pids.forEach(pid=>{const p=PAPERS.find(x=>x.id===pid);h+=`<div class="mk-group"><div class="mk-gt" onclick="go('#/paper/${pid}')">${esc(p.tZh||p.tEn)}</div>`;
  (mm[pid]||[]).forEach((m,idx)=>{const t=(m.text||'').replace(/\\/g,'').replace(/'/g,'’');h+=`<div class="mk-item"><span class="mk-qt" onclick="mkJump('${pid}',${m.sec},'${esc(t).replace(/"/g,'&quot;')}')">“${esc(m.text)}”</span><button class="mk-x" onclick="mkRemove('${pid}',${idx})" title="移除标记">×</button></div>`;});
  h+=`</div>`;});
 return h+'</div>';}
function selCheck(){const bar=document.getElementById('selBar');if(!bar)return;
 const sel=window.getSelection();const text=(sel?sel.toString():'').trim();
 if(text.length<3||!sel.anchorNode||!inReader(sel.anchorNode)){bar.style.display='none';bar.classList.remove('dock');return;}
 const r=sel.getRangeAt(0).getBoundingClientRect();bar.style.display='flex';
 // 手机(≤900px)改底部固定条:不与系统文本菜单抢位、滚动不消失(同 aipodcast)
 const dock=matchMedia('(max-width:900px)').matches;
 bar.classList.toggle('dock',dock);
 if(dock){bar.style.left='';bar.style.top='';}
 else{bar.style.left=(window.scrollX+r.left+r.width/2)+'px';
      bar.style.top=(window.scrollY+(r.top<150?r.bottom+12:r.top-46))+'px';}
 const b=document.getElementById('shareSelBtn');b.textContent='分享';b.dataset.text=text;b.dataset.sec=selSecIndex();}
async function askSel(){
 const sel=window.getSelection();const text=(sel?sel.toString():'').trim();if(text.length<2){mkHideSel();return;}
 const m=(location.hash||'').match(/#\/paper\/([^?]+)/);const id=m?decodeURIComponent(m[1]):'';if(!id){mkHideSel();return;}
 mkHideSel();
 const inp=document.getElementById('q');if(!inp){return;}
 inp.value='请解释这段：“'+(text.length>140?text.slice(0,140)+'…':text)+'”';
 const box=document.querySelector('.askbox');if(box&&box.scrollIntoView)box.scrollIntoView({behavior:'smooth',block:'center'});
 askPaper(id);
}
async function shareSel(){const b=document.getElementById('shareSelBtn');const text=((b&&b.dataset.text)||'').trim();if(!text)return;
 const m=(location.hash||'').match(/#\/paper\/([^?]+)/);const id=m?decodeURIComponent(m[1]):'';const p=id&&PAPERS.find(x=>x.id===id);
 const quote=text.length>80?text.slice(0,80)+'…':text;const who=p?`—— ${(PEOPLE[p.pid]||{}).zh||''}《${p.tZh||p.tEn}》`:'—— AI Paper';
 let url=location.origin+location.pathname+'#/paper/'+id;const si=parseInt(b.dataset.sec,10);
 if(id&&si>=0)url+='?at='+si+'&hl='+encodeURIComponent(text.slice(0,40));
 const body=`「${quote}」\n${who}\n${url}`;
 if(navigator.share){try{await navigator.share({title:'AI Paper',text:body});return;}catch(e){if(e&&e.name==='AbortError')return;}}
 try{await navigator.clipboard.writeText(body);b.textContent='已复制';setTimeout(()=>b.textContent='分享',1500);}catch(e){b.textContent='复制失败';setTimeout(()=>b.textContent='分享',1500);}}
let pendingLocate=null;
function applyLocate(){if(!pendingLocate)return;const {id,at,hl}=pendingLocate;
 if((location.hash||'').indexOf('/paper/'+id)<0){pendingLocate=null;return;}
 if(!document.querySelector('.reader .para'))return;  // 逐字稿还没加载,等下次 render
 pendingLocate=null;let target=at!=null?document.getElementById('sec-'+at):null;
 if(hl){const base=decodeURIComponent(hl).replace(/\s/g,'');const els=[...document.querySelectorAll('.reader .para .en,.reader .para .zh')];
  for(const L of [40,30,22,16,10]){const snip=base.slice(0,Math.min(L,base.length));if(snip.length<6)continue;
   const hit=els.find(el=>el.textContent.replace(/\s/g,'').includes(snip));
   if(hit){hit.classList.add('hl-locate');setTimeout(()=>hit.classList.remove('hl-locate'),4000);target=hit.closest('.para')||hit;break;}}}
 if(target)setTimeout(()=>target.scrollIntoView({behavior:'smooth',block:'center'}),60);}
async function sharePaper(id){const p=PAPERS.find(x=>x.id===id);if(!p)return;
 const url=location.origin+'/p/'+id+'/';const ref=p.arxiv?`arXiv:${p.arxiv}`:(p.srcLabel||p.org||'原文');const text=`${p.tZh}｜${p.tEn}（${ref}）`;
 try{if(navigator.share){await navigator.share({title:p.tZh,text,url});return;}}catch(e){if(e&&e.name==='AbortError')return;}
 try{await navigator.clipboard.writeText(text+' '+url);ppToast('已复制分享文案与链接 ✓');}catch(e){prompt('复制链接',url);}}
let _ppTT=null;function ppToast(m){let t=document.getElementById('ppToast');
 if(!t){t=document.createElement('div');t.id='ppToast';t.style.cssText='position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:200;background:var(--ink);color:var(--surface);font-size:13.5px;padding:9px 18px;border-radius:20px;opacity:0;transition:opacity .2s;pointer-events:none';document.body.appendChild(t);}
 t.textContent=m;t.style.opacity='1';clearTimeout(_ppTT);_ppTT=setTimeout(()=>t.style.opacity='0',1800);}
/* ===== 搜索 ===== */
/* 一句话摘要(sEn/sZh)只用于搜索匹配和首页 hero 引文,列表卡片并不显示它,
   却占 app.js 的三分之一(gzip 62KB)。slim_index 已把它抽到 data/summaries.json,
   只有 hero 用的最新几篇留在内联。这里在打开搜索面板时才拉,拉到后如果面板还开着就地重搜。 */
const SUMM={};let _summLoading=false,_summReady=false;
function ensureSummaries(){
  if(_summReady||_summLoading)return;
  _summLoading=true;
  fetch('data/summaries.json').then(r=>r.ok?r.json():Promise.reject(r.status)).then(j=>{
    Object.assign(SUMM,j);_summReady=true;
    const o=document.getElementById('searchOverlay');
    if(o&&o.classList.contains('on')){const i=document.getElementById('searchInput');if(i&&i.value)searchInput(i.value);}
  }).catch(()=>{_summLoading=false;});
}
function openSearch(){const o=document.getElementById('searchOverlay');o.classList.add('on');searchInput('');ensureSummaries();setTimeout(()=>document.getElementById('searchInput').focus(),40);}
function closeSearch(){const o=document.getElementById('searchOverlay');o.classList.remove('on');document.getElementById('searchInput').value='';}
function srPick(h){closeSearch();go(h);}
function srPerson(id){const p=PEOPLE[id];return `<div class="sr-row" data-go="#/person/${id}" onclick="srPick(this.dataset.go)">${av(id)}<div class="sr-meta"><div class="sr-t">${esc(p.en)} · ${esc(p.zh)}</div><div class="sr-s">${esc(p.tiZh)} · ${papersOf(id).length} 篇论文</div></div></div>`;}
function srPaper(p){const pe=PEOPLE[p.pid]||{};return `<div class="sr-row" data-go="#/paper/${p.id}" onclick="srPick(this.dataset.go)">${av(p.pid)}<div class="sr-meta"><div class="sr-t">${esc(p.tEn)}</div><div class="sr-s">${esc(p.tZh)} · ${esc(pe.zh||pe.en||'')} · ${p.date}${p.cites!=null?' · 被引 '+fmtCites(p.cites):''}</div></div></div>`;}
function srOrg(o,n){const lg=orgLogo(o,'srlogo');return `<div class="sr-row" data-go="#/org/${encodeURIComponent(o)}" onclick="srPick(this.dataset.go)"><span class="sr-ic" style="background:${lg?'#fff':'var(--surface)'};border:1px solid var(--line);color:var(--sub)">${lg||esc(o[0])}</span><div class="sr-meta"><div class="sr-t">${esc(o)}</div><div class="sr-s">${n} 篇论文</div></div></div>`;}
function searchInput(q){
 const k=q.trim().toLowerCase(),res=document.getElementById('searchResults');
 if(!k){const top=pplOrder().slice(0,8);
  res.innerHTML=`<div class="sr-group">高产学者 · Top Scholars</div>`+top.map(srPerson).join('');srSel(0);return;}
 const fstr=fs=>(fs||[]).map(f=>FIELDS[f]?FIELDS[f].en+FIELDS[f].zh:'').join('');
 const _toks=k.split(/\s+/).filter(Boolean);
 const ppl=Object.keys(PEOPLE).filter(id=>{const p=PEOPLE[id];
  const hay=((p.en||'')+(p.zh||'')+(p.tiEn||'')+(p.tiZh||'')+fstr(p.fields)).toLowerCase();
  return _toks.every(t=>hay.includes(t));}).slice(0,8);
 const orgs=orgList().filter(([o])=>o.toLowerCase().includes(k)).slice(0,5);
 const toks=k.split(/\s+/).filter(Boolean);
 const pps=PAPERS.filter(p=>{const pe=PEOPLE[p.pid]||{};
  const sm=SUMM[p.id]||{};
  const hay=((p.tEn||'')+(p.tZh||'')+(p.sEn||sm.sEn||'')+(p.sZh||sm.sZh||'')+(p.arxiv||'')+(p.org||'')+(p.venue||'')+(pe.en||'')+(pe.zh||'')+fstr(p.fields)).toLowerCase();
  return toks.every(t=>hay.includes(t));})
  .sort((a,b)=>{const ta=((a.tEn||'')+(a.tZh||'')).toLowerCase(),tb=((b.tEn||'')+(b.tZh||'')).toLowerCase();
   const ha=toks.every(t=>ta.includes(t))?0:1,hb=toks.every(t=>tb.includes(t))?0:1;
   return ha-hb||((b.cites||0)-(a.cites||0));}).slice(0,12);
 let html='';
 if(ppl.length)html+=`<div class="sr-group">学者 · ${ppl.length}</div>`+ppl.map(srPerson).join('');
 if(orgs.length)html+=`<div class="sr-group">机构 · ${orgs.length}</div>`+orgs.map(([o,n])=>srOrg(o,n)).join('');
 if(pps.length)html+=`<div class="sr-group">论文 · ${pps.length}</div>`+pps.map(srPaper).join('');
 res.innerHTML=html||`<div class="sr-empty">没有匹配 “${esc(q)}”</div>`;srSel(0);
}
function srSel(i){const rows=[...document.querySelectorAll('#searchResults .sr-row')];rows.forEach((r,j)=>r.classList.toggle('sel',i===j));}
function searchKey(e){
 const rows=[...document.querySelectorAll('#searchResults .sr-row')];
 let i=rows.findIndex(r=>r.classList.contains('sel'));
 if(e.key==='Escape'){closeSearch();}
 else if(e.key==='ArrowDown'){e.preventDefault();const n=Math.min(rows.length-1,i+1);srSel(n);rows[n]&&rows[n].scrollIntoView({block:'nearest'});}
 else if(e.key==='ArrowUp'){e.preventDefault();const n=Math.max(0,i-1);srSel(n);rows[n]&&rows[n].scrollIntoView({block:'nearest'});}
 else if(e.key==='Enter'){const r=rows[i<0?0:i];if(r)srPick(r.dataset.go);}
}
addEventListener('keydown',e=>{
 const tag=(document.activeElement||{}).tagName;
 if((e.key==='/'&&tag!=='INPUT'&&tag!=='TEXTAREA')||((e.metaKey||e.ctrlKey)&&e.key==='k')){e.preventDefault();openSearch();}
});
/* ===== 继续阅读(最近打开的论文) ===== */
function recentGet(){try{const r=JSON.parse(localStorage.recentPapers||'[]');return Array.isArray(r)?r:[]}catch(e){return[]}}
let _recentSnap=localStorage.recentPapers||'';
addEventListener('visibilitychange',()=>{
  if(document.visibilityState!=='visible')return;
  const cur=localStorage.recentPapers||'';
  const onHome=!(location.hash||'#/').slice(2).split('?')[0].split('/').filter(Boolean).length;
  if(onHome&&cur!==_recentSnap){const sy=scrollY;render();scrollTo(0,sy);}
  _recentSnap=cur;
});

/* ===== 阅读状态(对齐 AI Podcast):已读 / 稍后读 / 每日阅读日志 ===== */
function readGet(){try{const r=JSON.parse(localStorage.readPapers||'[]');return new Set(Array.isArray(r)?r:[])}catch(e){return new Set()}}
function readHas(id){return readGet().has(id);}
function readPosGet(){try{const r=JSON.parse(localStorage.readPos||'{}');return r&&typeof r==='object'?r:{}}catch(e){return{}}}
function readPosSave(id,s,n){const r=readPosGet();r[id]={s,n,t:Date.now()};const ks=Object.keys(r);if(ks.length>60){ks.sort((a,b)=>(r[a].t||0)-(r[b].t||0));ks.slice(0,ks.length-60).forEach(k=>delete r[k]);}try{localStorage.readPos=JSON.stringify(r)}catch(e){}if(typeof syncTouch==='function')syncTouch();}
function readMark(id,on){const s=readGet();const had=s.has(id);if(on===false)s.delete(id);else s.add(id);
  if(s.has(id)!==had){localStorage.readPapers=JSON.stringify([...s]);syncReadUI(id);
    const _p=PAPERS.find(x=>x.id===id);rlogAdd(s.has(id)?readMin(_p):-readMin(_p));
    if(typeof syncTouch==='function')syncTouch();}
  if(on!==false)laterMark(id,false);}
function toggleRead(id){readMark(id,!readHas(id));}
function readMin(p){if(!p)return 12;const n=(p.cites!=null?18:12);return n;}   /* 论文没有时长,按篇估读 12-18 分钟 */
function syncReadUI(id){const on=readHas(id);
  const b=document.getElementById('readBtn');if(b){b.classList.toggle('on',on);b.textContent=on?'已读 ✓':'标记已读';}
  document.querySelectorAll('.paper-card[data-id="'+id+'"]').forEach(c=>c.classList.toggle('read',on));}
function laterGet(){try{const r=JSON.parse(localStorage.laterPapers||'[]');return Array.isArray(r)?r:[]}catch(e){return[]}}
function laterHas(id){return laterGet().includes(id);}
function laterMark(id,on){let a=laterGet();const had=a.includes(id);
  a=on===false?a.filter(x=>x!==id):(had?a:[id,...a]);
  if(a.length!==laterGet().length){localStorage.laterPapers=JSON.stringify(a);
    const b=document.getElementById('laterBtn');if(b){b.classList.toggle('on',laterHas(id));b.textContent=laterHas(id)?'已加入待读 ★':'稍后读';}
    document.querySelectorAll('.paper-card[data-id="'+id+'"]').forEach(c=>c.classList.toggle('later',laterHas(id)));
    if(typeof syncTouch==='function')syncTouch();}}
function toggleLater(id){laterMark(id,!laterHas(id));}
function rlogGet(){try{const r=JSON.parse(localStorage.readLogPaper||'{}');return r&&typeof r==='object'?r:{}}catch(e){return{}}}
function rlogAdd(min){if(!min)return;const d=new Date(),k=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  const g=rlogGet();g[k]=Math.max(0,(g[k]||0)+min);if(!g[k])delete g[k];localStorage.readLogPaper=JSON.stringify(g);}
function rlogStreak(){const g=rlogGet();const day=86400000;const today=new Date();today.setHours(0,0,0,0);
  const has=t=>{const d=new Date(t);return g[d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')]>0;};
  let cur=0,t=today.getTime();if(!has(t))t-=day;
  while(has(t)){cur++;t-=day;}
  const ks=Object.keys(g).filter(k=>g[k]>0).sort();let run=0,max=0,prev=null;
  ks.forEach(k=>{const t2=new Date(k+'T00:00:00').getTime();run=(prev!==null&&t2-prev===day)?run+1:1;prev=t2;if(run>max)max=run;});
  return {cur,max};}
function rlogLocalMerge(){const g=rlogGet();let add=0;
  recentGet().forEach(id=>{const p=PAPERS.find(x=>x.id===id);if(!p)return;});
  return add;}
/* 新收录徽标:最近 14 天内 date */
function isNew(p){if(!p||!p.date)return false;const t=new Date(p.date+'T00:00:00').getTime();return Date.now()-t<14*86400000;}

/* ===== 匿名访问统计(与 AI Podcast 同款,自有 D1;无 Cookie、不收集个人信息) ===== */
/* ====== 更新提醒（浏览器推送）======================================================
   目的:补「读完就走、没有第二天」的缺口 —— 有新内容时主动叫回来一次。

   现实约束(2026-08-13 直连实测):Chrome/Edge/Android 的推送必须经 fcm.googleapis.com,
   国内网络不可达,**连 subscribe() 都会直接失败**;Safari(web.push.apple.com)、
   Firefox、Edge(WNS)可达。所以"开启失败"在这里不是罕见兜底而是主路径之一,
   必须给人话解释 + RSS 备选,绝不能留一个按了没反应的开关。
   iOS 另有一层:Safari 只在「已添加到主屏幕」时才允许网页推送。 */
const PUSH_API='https://push.jasonlin.tech';
const PUSH_SITE='aipaper';
const VAPID_PUB='BKZpK04qWu3AxxSH9KatKT0882TaRH43G1JhOQ1cLkaEg_AyR8os6JcLpzNhUKvyhmlEpD6no9SHphYbd_-n2hc';
function urlB64ToBytes(s){const p='='.repeat((4-s.length%4)%4);
  const b=atob((s+p).replace(/-/g,'+').replace(/_/g,'/'));const a=new Uint8Array(b.length);
  for(let i=0;i<b.length;i++)a[i]=b.charCodeAt(i);return a;}
function pushSupported(){return 'serviceWorker' in navigator&&'PushManager' in window&&'Notification' in window;}
/* iOS/iPadOS 未加到主屏幕时,PushManager 存在但 subscribe 必失败 */
function pushIOSNeedsInstall(){
  const iOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  return iOS&&!(window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches)&&!navigator.standalone;}
/* navigator.serviceWorker.ready 在「一个 SW 都没注册」时**永远不 resolve**(不是拒绝,是挂着)。
   隐私模式、SW 注册被拦、或本地直接开文件时都会这样 —— 不加超时的话面板会永远停在"检查中…"。 */
function swReady(ms){
  return Promise.race([navigator.serviceWorker.ready,
    new Promise((_,rj)=>setTimeout(()=>rj(new Error('Service Worker 未就绪')),ms||3000))]);}
let _pushSynced=false;
async function pushState(){
  if(!pushSupported())return 'unsupported';
  if(pushIOSNeedsInstall())return 'ios';
  if(Notification.permission==='denied')return 'denied';
  try{const r=await swReady();const s=await r.pushManager.getSubscription();
    if(!s)return 'off';
    /* 本地有订阅 ≠ 服务器有。上报只要失败过一次,面板就会永远显示"已开启"而服务端空空如也
       —— 2026-08-13 实测就是这么丢的(Safari 面板显示已开启,push_subs 表为空)。
       每次进面板补一次幂等上报(worker 的 /sub 是 upsert),让两边自动收敛。 */
    if(!_pushSynced&&!(await pushReRegister(s)))return 'unsynced';
    return 'on';
  }catch(_){return 'off';}}
/* 把本地订阅补登记到服务器(/sub 是幂等 upsert)。成功返回 true。 */
async function pushReRegister(s){
  try{const rr=await fetch(PUSH_API+'/sub',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({site:PUSH_SITE,sub:s.toJSON()})});
    _pushSynced=rr.ok;return rr.ok;
  }catch(_){return false;}}
/* 每次访问都静默自愈一次。**不能只在「我的」页做** —— 面板只在那一页渲染,
   而用户多数时候根本不去那儿(2026-08-13:订阅丢了,让 Jason 刷新,他刷的是首页和
   人物页,自愈代码压根没跑)。放在 load 后延迟执行,不抢首屏。 */
async function pushSyncQuiet(){
  if(!pushSupported()||_pushSynced)return;
  try{
    if(Notification.permission!=='granted')return;
    const r=await swReady(8000);const s=await r.pushManager.getSubscription();
    if(s)await pushReRegister(s);
  }catch(_){}}
addEventListener('load',()=>setTimeout(pushSyncQuiet,2500));
let _pushNote='';
const RSS_TIP='<a href="/feed.xml" style="color:var(--accent)">订阅 RSS</a>（任何网络都能用）';
function pushPanelHtml(){setTimeout(pushPanelRefresh,0);
  return `<div class="st-h3">更新提醒</div><div id="pushPanel"><div class="st-empty">检查中…</div></div>`;}
async function pushPanelRefresh(){
  const el=document.getElementById('pushPanel');if(!el)return;
  const st=await pushState();
  const note=_pushNote?`<div class="st-empty" style="margin-top:10px">${_pushNote}</div>`:'';
  const btn=(txt,fn)=>`<button class="shp-btn" style="margin-top:12px;width:auto;padding:9px 20px" id="pushBtn" onclick="${fn}">${txt}</button>`;
  if(st==='unsupported')el.innerHTML=`<div class="st-empty">这个浏览器不支持网页推送。${RSS_TIP}</div>`;
  else if(st==='ios')el.innerHTML=`<div class="st-empty">iPhone / iPad 上，需要先用 Safari 的「分享 → 添加到主屏幕」把本站装成图标，才能开启推送。或者${RSS_TIP}。</div>`;
  else if(st==='denied')el.innerHTML=`<div class="st-empty">本站的通知权限被浏览器屏蔽了，需要在地址栏的站点设置里恢复。或者${RSS_TIP}。</div>`;
  else if(st==='unsynced')el.innerHTML=`<div class="st-empty">浏览器这边已订阅，但没能登记到提醒服务器（多半是网络问题），所以还收不到。点下面重试。</div>${btn('重试登记','pushSubscribe()')}${note}`;
  else if(st==='on')el.innerHTML=`<div class="st-empty">已开启 ✓ 有新内容时会收到一条通知（多篇会合并成一条）。</div>${btn('关闭提醒','pushUnsubscribe()')}${note}`;
  else el.innerHTML=`<div class="st-empty">有新论文或长文时给你发一条浏览器通知。不需要账号，也不收集任何个人信息。</div>${btn('开启更新提醒','pushSubscribe()')}${note}`;}
function pushDiagnose(e){
  const m=''+((e&&e.message)||e);
  const safari=/Safari/.test(navigator.userAgent)&&!/Chrome|Chromium|Edg|CriOS|FxiOS/.test(navigator.userAgent);
  if(Notification.permission==='denied')
    return '浏览器里选择了不允许通知。Safari 可在「设置 → 网站 → 通知」改回允许；Chrome 点地址栏左侧图标改。或'+RSS_TIP+'。';
  if(safari)   // Safari 的失败多是"手势已失效",别拿 FCM 那套解释误导
    return '开启失败：'+m.slice(0,110)+'。Safari 要求授权后立刻订阅，再点一次通常就成；或'+RSS_TIP+'。';
  if(/push service|AbortError|Registration failed|applicationServerKey/i.test(m))
    return '开启失败：浏览器连不上它自己的推送服务器。Chrome / Edge 的推送要经 Google FCM，国内网络通常不通 —— 可以改用 Safari，或'+RSS_TIP+'。';
  return '开启失败：'+m.slice(0,140)+'。可以先'+RSS_TIP+'。';}
async function pushSubscribe(){
  const b=document.getElementById('pushBtn');if(b){b.disabled=true;b.textContent='正在开启…';}
  _pushNote='';let sub=null;
  try{
    const reg=await swReady(5000);
    /* 直接 subscribe —— 它自己会弹权限请求。先 await Notification.requestPermission() 再
       subscribe,Safari 会认为已脱离用户手势而抛 NotAllowedError(Safari 的经典坑)。*/
    sub=await reg.pushManager.getSubscription()
        ||await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:urlB64ToBytes(VAPID_PUB)});
    const r=await fetch(PUSH_API+'/sub',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({site:PUSH_SITE,sub:sub.toJSON()})});
    if(!r.ok)throw new Error('订阅服务器未接受（HTTP '+r.status+'）');
    _pushSynced=true;
    const act=reg.active||navigator.serviceWorker.controller;   // 刚注册时 reg.active 可能还是 null
    if(act)act.postMessage({type:'push-seen-init',ts:Date.now()});
  }catch(e){
    _pushNote=pushDiagnose(e);
    // 服务器没收下就别留着本地订阅,否则面板会一直谎称"已开启"
    if(sub&&!_pushSynced){try{await sub.unsubscribe();}catch(_){}}
  }
  pushPanelRefresh();}
async function pushUnsubscribe(){
  const b=document.getElementById('pushBtn');if(b){b.disabled=true;b.textContent='正在关闭…';}
  _pushNote='';
  try{const reg=await swReady(5000);const s=await reg.pushManager.getSubscription();
    if(s){await fetch(PUSH_API+'/unsub',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({endpoint:s.endpoint})}).catch(()=>{});await s.unsubscribe();}
  }catch(e){_pushNote='关闭时出错：'+(''+((e&&e.message)||e)).slice(0,100);}
  pushPanelRefresh();}


/* ====== 更新提醒的「软提示」==========================================================
   为什么不在页面刷新时直接弹浏览器授权框:
   ① Safari 与 Firefox **要求用户手势**,页面加载时自动调 requestPermission()/subscribe()
      会直接失败 —— 而 Safari 恰恰是国内唯一真收得到推送的浏览器;
   ② Chrome 虽然允许,但对"一进站就弹"会降权成静默 UI;
   ③ 最要紧:浏览器授权**只有一次机会**,被拒过就再也弹不出来,等于永久失去这个人。
   所以先在站内问一次(这一步不消耗那次机会),用户点「开启」那一下正好是手势,
   再去调浏览器授权框。这也是转化率最高的做法 —— 埋在「我的」页里基本等于没有。

   打扰控制:只对**已经读过内容**的人问(明确兴趣信号),或在详情页停留够久才问;
   关掉一次隔 14 天再问,累计关两次就永不再问。 */
const NUDGE_GAP=14*864e5, NUDGE_MAX=2, NUDGE_DWELL=45000;
function pushNudgeHide(){const c=document.getElementById('pushNudge');
  if(c){c.classList.remove('on');setTimeout(()=>c.remove(),260);}}
function pushNudgeDismiss(){
  localStorage.pushNudgeTs=Date.now();
  localStorage.pushNudgeN=(+localStorage.pushNudgeN||0)+1;
  pushNudgeHide();}
async function pushNudgeAccept(){
  const c=document.getElementById('pushNudge');const b=c&&c.querySelector('.pn-b');
  if(b){b.disabled=true;b.textContent='正在开启…';}
  await pushSubscribe();
  if(!c||!document.body.contains(c))return;
  if(_pushSynced){
    c.querySelector('.pn-t').textContent='已开启 ✓';
    c.querySelector('.pn-s').textContent='有新内容时会收到一条通知。';
    c.querySelector('.pn-btns').innerHTML='';
    setTimeout(pushNudgeHide,2400);
  }else{
    c.querySelector('.pn-s').innerHTML=_pushNote||'开启失败，可以稍后在「我的」页再试。';
    if(b){b.disabled=false;b.textContent='重试';}
  }}
function pushNudgeShow(){
  if(document.getElementById('pushNudge'))return;
  if(!document.getElementById('pnStyle')){
    const st=document.createElement('style');st.id='pnStyle';
    st.textContent=`.pn{position:fixed;z-index:80;left:16px;right:16px;bottom:16px;margin:0 auto;max-width:390px;
      display:flex;gap:12px;align-items:flex-start;padding:16px 16px 14px;border-radius:16px;
      background:var(--surface-2,var(--surface,#fff));border:1px solid var(--line,rgba(0,0,0,.1));
      box-shadow:0 10px 34px rgba(0,0,0,.16);opacity:0;transform:translateY(14px);
      transition:opacity .24s ease,transform .24s ease}
    .pn.on{opacity:1;transform:none}
    .pn-ic{flex:0 0 auto;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;
      background:var(--accent,var(--acc,#0a84ff));color:#fff}
    .pn-ic svg{width:16px;height:16px;display:block}
    .pn-tx{flex:1;min-width:0}
    .pn-t{font-size:15px;font-weight:600;color:var(--text,#111);letter-spacing:-.01em}
    .pn-s{margin-top:4px;font-size:13px;line-height:1.5;color:var(--text-2,var(--sub,#666))}
    .pn-btns{display:flex;gap:8px;margin-top:12px;justify-content:flex-end;width:100%}
    .pn-x,.pn-b{font:inherit;font-size:13px;border-radius:9px;padding:7px 14px;cursor:pointer;border:1px solid transparent}
    .pn-x{background:none;color:var(--text-2,var(--sub,#666))}
    .pn-x:hover{background:var(--surface,rgba(0,0,0,.05))}
    .pn-b{background:var(--accent,var(--acc,#0a84ff));color:#fff;font-weight:600}
    .pn-b:disabled{opacity:.6;cursor:default}
    @media(min-width:720px){.pn{left:auto;right:22px;bottom:22px;margin:0}}`;
    document.head.appendChild(st);}
  const d=document.createElement('div');d.id='pushNudge';d.className='pn';
  d.innerHTML=`<div class="pn-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg></div>
    <div class="pn-tx"><div class="pn-t">有新论文或长文时提醒你？</div><div class="pn-s">有新内容时发一条浏览器通知，不需要账号，随时可关。</div>
    <div class="pn-btns"><button class="pn-x" type="button" onclick="pushNudgeDismiss()">以后再说</button>
    <button class="pn-b" type="button" onclick="pushNudgeAccept()">开启提醒</button></div></div>`;
  document.body.appendChild(d);
  requestAnimationFrame(()=>d.classList.add('on'));}
let _nudgeTimer=null;
async function pushNudgeTick(){
  if(document.getElementById('pushNudge'))return;
  if(!pushSupported()||pushIOSNeedsInstall())return;
  if(Notification.permission==='denied')return;
  if((+localStorage.pushNudgeN||0)>=NUDGE_MAX)return;
  const t=+localStorage.pushNudgeTs||0; if(t&&Date.now()-t<NUDGE_GAP)return;
  try{const r=await swReady(6000);if(await r.pushManager.getSubscription())return;}catch(_){}
  if(readGet().size>=1){pushNudgeShow();return;}      // 读过东西 = 有兴趣,直接问
  clearTimeout(_nudgeTimer);                           // 否则在详情页读满一会儿再问
  if(/^#\/paper\//.test(location.hash))
    _nudgeTimer=setTimeout(pushNudgeTick,NUDGE_DWELL);}
addEventListener('load',()=>setTimeout(pushNudgeTick,2000));
addEventListener('hashchange',()=>setTimeout(pushNudgeTick,300));

const STATS_URL='https://stats.jasonlin.tech';
const _dev=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)?'mobile':'desktop';
const _ref=(()=>{try{return document.referrer?new URL(document.referrer).host:''}catch(_){return ''}})();
let _lastView=null;
/* 匿名访客 ID(2026-08-09 加,与 aipodcast 同一套):此前 UV 只有 worker 端的「每日哈希」
   (SHA256(盐+当天日期+IP+UA)),日期在输入里 → 同一人隔天必换 ID,跨天/跨周留存结构上不可测。
   这里存一个纯随机匿名 ID(与个人信息无关,比 IP 哈希更保守,仍无 Cookie),worker 优先用它。*/
const _aid=(()=>{try{let a=localStorage.aid;
  if(!a){a=([...crypto.getRandomValues(new Uint8Array(10))].map(x=>x.toString(16).padStart(2,'0')).join(''));localStorage.aid=a;}
  return a;}catch(_){return '';}})();
function track(type,path){try{
  const p='paper:'+(path||(location.hash.replace(/^#/,'').split('?')[0]||'/'));
  const body=JSON.stringify({type,path:p,ua:_dev,ref:_ref,sid:(localStorage.syncCode?_sidHash():''),aid:_aid});
  if(navigator.sendBeacon)navigator.sendBeacon(STATS_URL,new Blob([body],{type:'text/plain'}));
  else fetch(STATS_URL,{method:'POST',headers:{'Content-Type':'text/plain'},body,keepalive:true});
}catch(_){}}
function _sidHash(){try{return (localStorage.statsSid||'')}catch(_){return ''}}
function trackView(){const p=location.hash.replace(/^#/,'').split('?')[0]||'/';if(p===_lastView)return;_lastView=p;track('view');}

function recentAdd(id){let r=recentGet().filter(x=>x!==id);r.unshift(id);localStorage.recentPapers=JSON.stringify(r.slice(0,6));_recentSnap=localStorage.recentPapers;if(typeof syncTouch==='function')syncTouch();}

/* ===== 多设备同步(与 AI Podcast 共用同步码;数据按站隔离 ns=paper) ===== */
const SYNC_URLS=['https://sync.jasonlin.tech','https://aipodcast-sync.992978142.workers.dev'];
async function syncFetch(path,opts){let last;
  for(const u of SYNC_URLS){try{const r=await fetch(u+path,opts);if(r.status<500)return r;last=r;}catch(e){last=e;}}
  throw last instanceof Error?last:new Error('sync unreachable');}
function syncCode(){return localStorage.syncCode||'';}
function syncGen(){const A='ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';let c='';const buf=new Uint8Array(20);crypto.getRandomValues(buf);for(const b of buf)c+=A[b%32];return c;}
function syncCollect(){return{recent:recentGet(),read:[...readGet()],later:laterGet(),rlog:rlogGet(),prefs:{size:localStorage.size||'',lang:localStorage.lang||'',order:localStorage.order||'',theme:localStorage.theme||'',t:+localStorage.prefsT||0},t:Date.now()};}
function syncMerge(r){if(!r||typeof r!=='object')return false;let changed=false;
  {const s=readGet();const b=s.size;(r.read||[]).forEach(x=>s.add(x));
   if(s.size!==b){localStorage.readPapers=JSON.stringify([...s]);changed=true;}}
  {const a=new Set(laterGet());const b=a.size;(r.later||[]).forEach(x=>a.add(x));
   if(a.size!==b){localStorage.laterPapers=JSON.stringify([...a]);changed=true;}}
  {const rl=r.rlog;if(rl&&typeof rl==='object'){const g=rlogGet();let ch=false;
    Object.keys(rl).forEach(k=>{const v=+rl[k]||0;if(v>(g[k]||0)){g[k]=v;ch=true;}});
    if(ch){localStorage.readLogPaper=JSON.stringify(g);changed=true;}}}
  const cur=recentGet();const merged=[...cur];(r.recent||[]).forEach(id=>{if(!merged.includes(id))merged.push(id);});
  if(merged.length!==cur.length){localStorage.recentPapers=JSON.stringify(merged.slice(0,12));changed=true;}
  const pf=r.prefs||{};if(pf.t&&pf.t>(+localStorage.prefsT||0)){['size','lang','order','theme'].forEach(k=>{if(pf[k])localStorage[k]=pf[k];});localStorage.prefsT=pf.t;changed=true;}
  return changed;}
let _syncBusy=false,_syncTm=null,_syncLastPull=0;
async function syncPush(){const c=syncCode();if(!c||_syncBusy)return;_syncBusy=true;
  try{await syncFetch('/s/'+c+'?ns=paper',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(syncCollect())});localStorage.syncT=Date.now();}catch(e){}
  _syncBusy=false;syncPanelRefresh();}
async function syncPull(){const c=syncCode();if(!c)return;_syncLastPull=Date.now();
  try{const r=await syncFetch('/s/'+c+'?ns=paper',{cache:'no-store'});
    if(r.status===404){await syncPush();return;}
    if(r.ok){syncMerge(await r.json());localStorage.syncT=Date.now();}
  }catch(e){}syncPanelRefresh();}
function syncTouch(){if(!syncCode())return;clearTimeout(_syncTm);_syncTm=setTimeout(syncPush,1500);}
async function syncOn(){localStorage.syncCode=syncGen();await syncPush();syncPanelRefresh();}
async function syncJoin(code){code=(code||'').toUpperCase().replace(/[^A-Z2-7]/g,'');
  if(!/^[A-Z2-7]{20}$/.test(code)){alert('同步码应为 20 位字母数字(不含 0/1/8/9)');return;}
  localStorage.syncCode=code;await syncPull();await syncPush();syncPanelRefresh();}
function syncOff(){localStorage.removeItem('syncCode');localStorage.removeItem('syncT');syncPanelRefresh();}
function syncPanelInner(){const c=syncCode();
  if(!c)return `<b>多设备同步</b> — 一个匿名同步码，跨设备同步已读、稍后读与阅读进度。无账号、无 Cookie。同一个码也可在姊妹站 AI Podcast 使用。<div style="margin-top:9px"><button class="mcp-copy" onclick="syncOn()">开启同步</button><span style="margin:0 6px;color:var(--sub2)">或</span><input id="syncIn" placeholder="输入同步码" style="font-family:inherit;font-size:16px;padding:8px 12px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink);width:200px;min-height:38px;box-sizing:border-box" onkeydown="if(event.key==='Enter')syncJoin(this.value)"> <button class="mcp-copy" onclick="syncJoin(document.getElementById('syncIn').value)">加入</button></div>`;
  return `<b>多设备同步 · 已开启</b> — 把这个码填到另一台设备或姊妹站 AI Podcast，阅读记录即互通。<div style="margin-top:9px"><code class="mcp-url">${c}</code><button class="mcp-copy" onclick="navigator.clipboard&&navigator.clipboard.writeText('${c}');this.textContent='已复制'">复制</button> <button class="mcp-copy" onclick="syncOff()">关闭同步</button></div>`;}
function syncPanelRefresh(){const el=document.getElementById('syncPanel');if(!el)return;const inner=el.querySelector('.legal-note');el.innerHTML=(inner?inner.outerHTML:'')+syncPanelInner();}
addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&syncCode()&&Date.now()-_syncLastPull>60000)syncPull();});
setTimeout(()=>{if(syncCode())syncPull();},800);

/* ===== 站长访问统计(#/stats):读共享埋点 worker 的 /q?mode=sql,token 只存本机 =====
   与 AI Podcast 共用 stats.jasonlin.tech(D1),aipaper 流量的 path 带 paper: 前缀,查询按前缀过滤。 */
function vStats(){
 const tok=localStorage.statsToken||'';
 if(tok)setTimeout(statsLoad,30);
 return `<div class="wrap"><section style="padding:30px 0;min-height:60vh">
  <div class="eyebrow">Site analytics · 站长</div><h2 class="title">访问统计</h2>
  ${tok?`<div class="chips" style="margin-top:16px">${[['paper','论文站'],['podcast','播客站'],['all','两站合计']].map(([k,l])=>`<span class="chip ${(localStorage.statsSite||'paper')===k?'on':''}" onclick="localStorage.statsSite='${k}';render()">${l}</span>`).join('')}</div>
  <div class="chips" style="margin-top:10px">${[7,30,90].map(d=>`<span class="chip ${(+localStorage.statsDays||30)===d?'on':''}" onclick="localStorage.statsDays=${d};render()">近 ${d} 天</span>`).join('')}<span class="chip" onclick="localStorage.removeItem('statsToken');render()">退出</span></div>
  <div id="statsBody" style="margin-top:10px"><div class="st-empty">加载中…</div></div>`
  :`<div class="sub" style="margin-top:14px;max-width:560px">读取 stats.jasonlin.tech 的匿名埋点数据(与 AI Podcast 共用 worker,本站流量带 paper: 前缀)。粘贴查询 STATS_TOKEN 查看;token 只保存在本机浏览器,不会上传到别处。</div>
  <div style="display:flex;gap:10px;margin-top:18px;max-width:460px">
   <input id="stTok" type="password" placeholder="STATS_TOKEN" style="flex:1;padding:11px 14px;border:1px solid var(--line);border-radius:11px;background:var(--surface2);color:var(--ink);font-size:14px" onkeydown="if(event.key==='Enter')document.getElementById('stGo').click()">
   <button id="stGo" class="askbtn" style="width:auto;padding:11px 24px" onclick="const v=document.getElementById('stTok').value.trim();if(v){localStorage.statsToken=v;render();}">查看</button></div>`}
 </section></div>${footer()}`;
}
async function statsQ(sql){
 const r=await fetch(STATS_URL+'/q?token='+encodeURIComponent(localStorage.statsToken||'')+'&mode=sql&q='+encodeURIComponent(sql));
 const j=await r.json();if(j.error)throw new Error(j.error);return j.rows||[];
}
async function statsLoad(){
 const el=document.getElementById('statsBody');if(!el)return;
 const days=+localStorage.statsDays||30,since=Date.now()-days*864e5;
 const site=localStorage.statsSite||'paper';
 // 2026-08-10 起四图谱也进同一 D1(前缀 graph-*),「播客」不能再用「非 paper: 即播客」的二分
 const P=site==='paper'?"path LIKE 'paper:%'":site==='podcast'?"path NOT LIKE 'paper:%' AND path NOT LIKE 'graph-%'":"1=1";
 const TOP=site==='paper'?"path LIKE 'paper:/paper/%'":site==='podcast'?"path LIKE '/episode/%'":"(path LIKE 'paper:/paper/%' OR path LIKE '/episode/%')";
 const UV="count(distinct coalesce(nullif(sid,''),vid))";
 try{
  const [tot,today,range,byDay,top,refs,dev]=await Promise.all([
   statsQ(`SELECT count(*) c FROM events WHERE type='view' AND ${P}`),
   statsQ(`SELECT count(*) pv,${UV} uv FROM events WHERE type='view' AND ${P} AND day=date('now')`),
   statsQ(`SELECT count(*) pv,${UV} uv FROM events WHERE type='view' AND ${P} AND ts>=${since}`),
   statsQ(`SELECT day,count(*) pv,${UV} uv FROM events WHERE type='view' AND ${P} AND ts>=${since} GROUP BY day ORDER BY day`),
   statsQ(`SELECT path,count(*) c FROM events WHERE type='view' AND ${TOP} AND ts>=${since} GROUP BY path ORDER BY c DESC LIMIT 12`),
   statsQ(`SELECT ref,count(*) c FROM events WHERE type='view' AND ${P} AND ts>=${since} AND ref<>'' GROUP BY ref ORDER BY c DESC LIMIT 10`),
   statsQ(`SELECT ua,count(*) c FROM events WHERE type='view' AND ${P} AND ts>=${since} GROUP BY ua ORDER BY c DESC`),
  ]);
  const el2=document.getElementById('statsBody');if(el2)el2.innerHTML=statsHtml({tot,today,range,byDay,top,refs,dev,days});
 }catch(e){const el2=document.getElementById('statsBody');if(!el2)return;
  const msg=''+(e&&e.message||e);
  let hint='';
  if(e instanceof TypeError||/failed to fetch|networkerror|load failed/i.test(msg))
   hint=`<div class="sub" style="margin-top:10px;font-size:14px">worker 不可达。先在浏览器直接打开 <b>https://stats.jasonlin.tech</b>——正常应显示「AI Podcast stats worker」。打不开就是 worker 没部署或自定义域名没绑定,到 stats-worker 目录跑 <code>wrangler deploy</code>。</div>`;
  else if(/unauthorized/i.test(msg))
   hint=`<div class="sub" style="margin-top:10px;font-size:14px">token 不对——要填 stats-worker 的 <b>STATS_TOKEN</b> 密钥(<code>wrangler secret put STATS_TOKEN</code> 设的那个)。点「退出」重新输入。</div>`;
  else if(/no such table/i.test(msg))
   hint=`<div class="sub" style="margin-top:10px;font-size:14px;line-height:1.8"><b>找到根因了:D1 里没建 events 表。</b>worker 的写入包在 try/catch 里静默吞错,所以两站的埋点一直在丢、也查不出数据。在 aipodcast/stats-worker 目录执行一次建表即可(历史数据无法追回,建表后开始累计):<br>
   <code style="display:block;margin-top:8px;padding:10px 12px;background:var(--surface);border-radius:8px;font-size:12px;white-space:pre-wrap">wrangler d1 execute aipodcast-stats --remote --command "CREATE TABLE IF NOT EXISTS events(ts INTEGER NOT NULL, day TEXT NOT NULL, type TEXT NOT NULL, path TEXT NOT NULL DEFAULT '', ref TEXT NOT NULL DEFAULT '', ua TEXT NOT NULL DEFAULT '', vid TEXT NOT NULL DEFAULT '', sid TEXT NOT NULL DEFAULT ''); CREATE INDEX IF NOT EXISTS idx_ev_type_ts ON events(type,ts); CREATE INDEX IF NOT EXISTS idx_ev_day ON events(day);"</code></div>`;
  el2.innerHTML=`<div class="st-empty">查询失败:${esc(msg)}</div>${hint}`;}
}
function statsHtml(d){
 const t=d.today[0]||{pv:0,uv:0},r=d.range[0]||{pv:0,uv:0},tot=(d.tot[0]||{}).c||0;
 const m={};d.byDay.forEach(x=>m[x.day]=x);
 const arr=[];for(let i=d.days-1;i>=0;i--){const k=new Date(Date.now()-i*864e5).toISOString().slice(0,10);arr.push(m[k]||{day:k,pv:0,uv:0});}
 const mx=Math.max(1,...arr.map(x=>x.pv));
 const bars=arr.map(x=>`<i style="height:${x.pv?Math.max(6,Math.round(x.pv/mx*100)):2}%"${x.pv?'':' data-z'} title="${x.day} · PV ${x.pv} · 访客 ${x.uv}"></i>`).join('');
 const topMx=d.top.length?d.top[0].c:1;
 const top=d.top.map(x=>{
  const isPaper=x.path.startsWith('paper:/paper/');
  const id=isPaper?x.path.slice('paper:/paper/'.length):x.path.replace('/episode/','');
  const p=isPaper?PAPERS.find(pp=>pp.id===id):null;
  const nm=p?(p.tZh||p.tEn):id+(isPaper?'':' 🎙');
  const click=isPaper?` onclick="go('#/paper/${id}')" style="cursor:pointer"`:'';
  return `<div class="rk-row"${click}><span class="rk-name" style="flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(nm)}</span><span class="rk-bar" style="width:${Math.max(8,Math.round(x.c/topMx*160))}px"></span><span class="rk-n">${x.c}</span></div>`;}).join('');
 const refMx=d.refs.length?d.refs[0].c:1;
 const refs=d.refs.map(x=>`<div class="rk-row"><span class="rk-name" style="flex:1">${esc(x.ref)}</span><span class="rk-bar" style="width:${Math.max(8,Math.round(x.c/refMx*160))}px"></span><span class="rk-n">${x.c}</span></div>`).join('');
 const dvT=d.dev.reduce((s,x)=>s+x.c,0)||1;
 const dv=d.dev.map(x=>`${x.ua==='mobile'?'移动':x.ua==='desktop'?'桌面':esc(x.ua||'?')} ${Math.round(x.c/dvT*100)}%`).join(' · ');
 const empty=!(+t.pv)&&!(+r.pv)&&!tot;
 return `
  ${empty?`<div class="sub" style="margin:6px 0 14px;font-size:14px">worker 和数据表都正常,但一条记录都没有——说明埋点从未成功入库(此前表不存在时的静默丢弃),从现在起开始累计。</div>`:''}
  <div class="st-tiles">
   <div class="st-tile"><div class="n">${t.pv}</div><div class="l">今日 PV</div><div class="s">访客 ${t.uv}</div></div>
   <div class="st-tile"><div class="n">${r.pv}</div><div class="l">近 ${d.days} 天 PV</div></div>
   <div class="st-tile"><div class="n">${r.uv}</div><div class="l">近 ${d.days} 天访客·日</div></div>
   <div class="st-tile"><div class="n">${tot}</div><div class="l">累计 PV</div></div>
  </div>
  <div class="st-h3">每日 PV · 近 ${d.days} 天</div>
  <div class="stx">${bars}</div>
  <div class="stx-x"><span>${arr[0].day.slice(5)}</span><span>${arr[arr.length-1].day.slice(5)}</span></div>
  <div class="st-h3">热门论文</div><div class="rk">${top||'<div class="st-empty">暂无</div>'}</div>
  <div class="st-h3">流量来源</div><div class="rk">${refs||'<div class="st-empty">暂无(直接访问不带来源)</div>'}</div>
  <div class="st-h3">设备</div><div class="sub" style="margin-top:6px;font-size:14px">${dv||'暂无'}</div>`;
}

/* 阅读进度按**正文**算,不按整份文档算。文档里正文之前有标题/速览/洞察(实测占 4.0%)、
   之后有页脚与推荐(1.9%),按文档算会「一进来就有进度、读完正文才 98%」。
   起点 = 正文第一段顶碰到粘性栏下沿;终点 = 正文最后一段底碰到视口底部。
   范围缓存起来,文档高度变了(切字号/语言/展开译文)才重算 —— 344 段的 DOM 查询
   不能每帧都跑。 */
let _progBox=null,_progDocH=-1;
function progBounds(){
  const dh=document.documentElement.scrollHeight;
  if(_progBox!==null&&_progDocH===dh)return _progBox;
  _progDocH=dh;
  const els=document.querySelectorAll('.reader .turn,.reader .sec-h');
  if(!els.length)return _progBox=false;
  const rb=document.querySelector('.read-bar');
  const sticky=rb?Math.round(rb.getBoundingClientRect().bottom):100;   // 菜单栏+标题栏 的下沿
  const top=els[0].getBoundingClientRect().top+scrollY;
  const bot=els[els.length-1].getBoundingClientRect().bottom+scrollY;
  const start=top-sticky, end=bot-innerHeight;
  return _progBox=(end>start?{start,end}:false);
}
function progWidth(){
  const b=progBounds();
  if(!b)return 0;
  return Math.min(100,Math.max(0,(scrollY-b.start)/(b.end-b.start)*100));
}

/* ===== 回到顶部 / 划词栏隐藏(进度条改用 read-bar 里的 readProg) ===== */
addEventListener('scroll',()=>{
 const tt=document.getElementById('toTop');
 const sb=document.getElementById('selBar');if(sb&&sb.style.display!=='none'&&!sb.classList.contains('dock'))sb.style.display='none';
 if(tt)tt.classList.toggle('on',scrollY>900);
},{passive:true});
/* ===== ROUTER ===== */
function initReadMark(id){const end=document.getElementById('readEnd');if(!end||!('IntersectionObserver'in window))return;
 if(document.querySelector('.rcol .skeleton'))return;                 // 全文加载中,等加载完 render 再设
 if(document.documentElement.scrollHeight<=innerHeight+400)return;    // 不足以滚动的短页,交给手动标记
 const io=new IntersectionObserver(es=>{es.forEach(x=>{if(x.isIntersecting){readMark(id,true);io.disconnect();}})},{rootMargin:'0px 0px -8% 0px'});io.observe(end);}
function observeReveals(){ // 滚动淡入(照 aipodcast):只盯首页/列表的 section,阅读器正文在 .rcol 不受影响
 if(!('IntersectionObserver'in window))return;
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('rv-in');io.unobserve(e.target);}}),{threshold:0,rootMargin:'0px 0px -6% 0px'});
 document.querySelectorAll('#app > .wrap > section:not(.rv), #app .hero-wrap:not(.rv)').forEach(el=>{el.classList.add('rv');io.observe(el);});
}
function render(){
 const h=location.hash||'#/';const[path,query]=h.slice(2).split('?');
 const parts=path.split('/').filter(Boolean);const qp=query?new URLSearchParams(query):null;
 if(parts[0]==='paper'&&qp&&(qp.get('at')!=null||qp.get('hl')))pendingLocate={id:decodeURIComponent(parts[1]),at:qp.get('at'),hl:qp.get('hl')};
 let html;
 if(!parts.length)html=vHome();
 else if(parts[0]==='person')html=vPerson(parts[1]);
 else if(parts[0]==='paper')html=vPaper(decodeURIComponent(parts[1]));
 else if(parts[0]==='people')html=vPeople(qp&&qp.get('field'));
 else if(parts[0]==='papers')html=vPapers(qp);
 else if(parts[0]==='orgs')html=vOrgs();
 else if(parts[0]==='org')html=vOrg(parts[1]);
 else if(parts[0]==='ask')html=vAsk();
 else if(parts[0]==='mine')html=vMine();
 else if(parts[0]==='stats')html=vStats();
 else html=vHome();
 document.body.dataset.route=parts[0]||'home';
 document.getElementById('app').innerHTML=html;
 placeAsk();
 observeReveals();
 updateMeta(parts);
 if(parts[0]==='paper'){initReadMark(decodeURIComponent(parts[1]));initTOC();}
 else tocHeads=null;
 if(parts[0]==='paper'&&!pendingLocate){const _pid=decodeURIComponent(parts[1]);const rp=readPosGet()[_pid];if(rp&&rp.s>0&&!readHas(_pid))pendingLocate={id:_pid,at:rp.s,hl:''};}  // 无分享锚点时回到上次读到的章节
 try{trackView()}catch(_){}
 if(!pendingLocate)window.scrollTo(0,0);
 typesetIfMath(document.getElementById('app'),()=>{if(parts[0]==='paper')mkApply();});
 applyLocate(); syncSeg();
 // 页脚站点地图在骨架屏阶段不该露出来(它排在 #app 之后)
 document.body.dataset.ready='1';
}
if(localStorage.theme)document.documentElement.dataset.theme=localStorage.theme;
/* iOS Safari 的状态栏区域跟随 <meta name="theme-color"> 与 color-scheme,但**它在页面加载时
   定色之后,对已存在 meta 的 content 变更不会重新取色** —— 2026-08-15 真机实测:以深色进入
   再切浅色,页面已经变白而状态栏仍是黑的。可靠做法是把 meta **删掉重建**(换成新元素),
   并把 color-scheme 直接写成行内样式(比等 CSS 规则随属性重新匹配更确定地触发重绘)。
   data-theme 会被多处改写(手动切换 / 启动恢复 / 多设备同步),用 observer 统一跟随。 */
(function(){
  let first=true;
  const upd=()=>{
    const dark=document.documentElement.dataset.theme==='dark';
    document.documentElement.style.colorScheme=dark?'dark':'light';
    document.querySelectorAll('meta[name="theme-color"]').forEach(n=>n.remove());
    const m=document.createElement('meta');m.name='theme-color';m.content=dark?'#0e0e10':'#ffffff';
    document.head.appendChild(m);
    /* iOS Safari 只在加载/导航时给状态栏定色,运行时换了 meta 也不重绘
       (Jason 真机实测:切换主题后要跳去别的网页再回来才生效)。这里用 1px 滚动
       微调去触发它的 scroll-edge 重算 —— 视觉上察觉不到,失败也无害(下次导航自然正确)。
       首次调用不做,免得干扰浏览器的滚动位置恢复。 */
    if(first){first=false;return;}
    /* 必须显式 behavior:'instant' —— 站点 html 上有 scroll-behavior:smooth,
       默认会把这两次程序化滚动变成动画,肉眼可见地抖一下,而且异步没跑完就被下一句打断
       (实测滚动位置从 1333 漂到 1381)。 */
    try{const y=window.scrollY;
      window.scrollTo({top:y+(y>0?-1:1),behavior:'instant'});
      window.scrollTo({top:y,behavior:'instant'});}catch(_){}
  };
  new MutationObserver(upd).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  upd();})();
if(localStorage.lang)document.body.dataset.lang=localStorage.lang;
if(localStorage.size)document.body.dataset.size=localStorage.size;
if(localStorage.order)document.body.dataset.order=localStorage.order;
syncSeg();
const selH=()=>setTimeout(selCheck,10);

/* 点空白处清掉文字选区。浏览器原生并不总会清(移动端 Safari 尤其明显),会出现
   「选中的蓝底一直留在那儿」的残留(2026-08-15 用户报)。selCheck 只隐藏了工具条,
   没动选区本身,所以之前修不掉。
   排除 #selBar —— 上面的按钮都要用当前选区,先清就没得用了;.hl 是已有标记,点它是要移除。 */
document.addEventListener('pointerdown',e=>{
  const t=e.target;
  if(t&&t.closest&&(t.closest('#selBar')||t.closest('.hl')))return;
  const s=window.getSelection();
  if(!s||s.isCollapsed)return;
  if(typeof mkHideSel==='function')mkHideSel();
  else{try{s.removeAllRanges();}catch(_){}}
},true);

document.addEventListener('mouseup',selH);document.addEventListener('touchend',selH);
addEventListener('hashchange',render);render();
