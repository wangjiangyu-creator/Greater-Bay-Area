type ComparativeLawBaseEntry = {
  title: string;
  meta: string;
  note: string;
};

type ComparativeLawEntrySource = {
  sourceLabel: string;
  sourceHref: string;
};

type ComparativeLawEntry = ComparativeLawBaseEntry & ComparativeLawEntrySource;

type ComparativeLawWebSource = {
  type: "文献" | "规则" | "机构" | "案例";
  title: string;
  href: string;
  note: string;
};

type ComparativeLawBaseModule = {
  id: string;
  title: string;
  section: "基础理论" | "域外经验";
  badge: string;
  summary: string;
  keyQuestions: string[];
  literature: ComparativeLawBaseEntry[];
  rules: ComparativeLawBaseEntry[];
  institutions: ComparativeLawBaseEntry[];
  cases: ComparativeLawBaseEntry[];
  webSources: ComparativeLawWebSource[];
  researchTracks: string[];
  relevance: string;
};

type ComparativeLawLinkedModuleBase = Omit<
  ComparativeLawBaseModule,
  "literature" | "rules" | "institutions" | "cases"
> & {
  literature: ComparativeLawEntry[];
  rules: ComparativeLawEntry[];
  institutions: ComparativeLawEntry[];
  cases: ComparativeLawEntry[];
};

type ComparativeLawModule = ComparativeLawLinkedModuleBase & {
  methodTags: string[];
  takeaways: string[];
};

type ComparativeLawEntryGroup = "literature" | "rules" | "institutions" | "cases";

type ComparativeLawEntrySourceMap = Record<
  string,
  Record<ComparativeLawEntryGroup, Record<string, ComparativeLawEntrySource>>
>;

type ComparativeLawToolMatrixRow = {
  tool: string;
  whatItDoes: string;
  examples: string[];
  gbaUse: string;
};

const COMPARATIVE_LAW_METHODS: Record<
  string,
  Pick<ComparativeLawModule, "methodTags" | "takeaways">
> = {
  "market-integration": {
    methodTags: ["统一市场", "互认", "例外审查", "跨政府协调"],
    takeaways: [
      "先把市场流动拆成货物、服务、人员、资本、数据五类，再分别判断需要统一、互认还是协作。",
      "互认不是放弃监管，而是要求各法域先承认对方制度的基本等效性，再保留必要公共政策例外。",
      "一体化市场需要日常执行机构和争议解决接口，否则条文统一也会被地方执行差异消解。",
      "可把大湾区规则衔接设计成“共同目标+例外清单+定期评估”的动态制度。"
    ]
  },
  "legal-harmonisation-theory": {
    methodTags: ["统一法", "协调法", "法律移植", "软法原则"],
    takeaways: [
      "写作时先界定融合深度：unification、harmonisation、mutual recognition、legal transplant处理的是不同问题。",
      "移植规则文本之前，应同时比较法院解释、职业共同体、监管资源和交易习惯。",
      "共同原则和示范法适合作为低政治成本的第一步，先塑造共同语言，再观察是否需要硬法化。",
      "大湾区可优先发展示范条款、共同术语表和案例摘要，作为正式规则衔接前的知识基础设施。"
    ]
  },
  "eu-integration": {
    methodTags: ["条例", "指令", "初步裁决", "侵权程序", "监管网络"],
    takeaways: [
      "欧盟经验应拆成条约授权、统一立法、成员国转化、司法解释、专业监管五层来用。",
      "条例适合高统一需求领域，指令适合保留地方制度空间但要求结果趋同的领域。",
      "初步裁决和侵权程序说明：统一规则要有统一解释渠道和违约纠偏机制。",
      "大湾区未必复制欧盟强法院模式，但可以借鉴专题工作组、共同指引和解释协调机制。"
    ]
  },
  "us-state-harmonisation": {
    methodTags: ["统一法委员会", "Restatement", "州采纳", "商业条款"],
    takeaways: [
      "美国路径展示了分权体制下的柔性统一：专业机构先起草高质量文本，再由各州选择采纳。",
      "官方评注、教材和法院引用是维持统一解释的关键，不应只关注统一法文本。",
      "Restatement说明学术共同体和职业共同体可以在没有强制立法中心时形成事实上的共同法。",
      "大湾区可借鉴“示范规则+官方说明+案例汇编+自愿采纳”的渐进路径。"
    ]
  },
  uncitral: {
    methodTags: ["公约", "示范法", "工作组", "CLOUT案例库"],
    takeaways: [
      "UNCITRAL最可借鉴的是工作组生成规则、解释资料维护规则、案例库统一理解的完整链条。",
      "示范法适合处理法系差异较大但交易需求明确的领域，如仲裁、电子商务、跨境破产和调解。",
      "案例摘要和解释指南能降低统一文本落地后的解释分裂。",
      "大湾区可先围绕跨境争议解决、电子签名、数据流动和破产协助建立示范规则与案例摘要。"
    ]
  },
  "other-organisations": {
    methodTags: ["软法原则", "司法协作公约", "同行评审", "监管指标"],
    takeaways: [
      "UNIDROIT、HCCH和OECD分别代表私法原则、司法协作和监管治理三条不同融合路径。",
      "软法的力量来自合同选择、仲裁援引、立法参照和专业共同体重复使用。",
      "同行评审和指标体系可以在没有强制立法权时推动监管方法趋同。",
      "大湾区可以用年度评估、共同手册和跨境司法协作指引补足正式规则衔接的空白。"
    ]
  },
  "other-foreign-experiences": {
    methodTags: ["互认安排", "行业MRA", "部长理事会", "例外清单"],
    takeaways: [
      "澳大利亚、加拿大、北欧和东盟说明弱强制或分权场景下也能通过清单、会议和行业接口推进融合。",
      "行业MRA适合从专业资格、检测认证、工程服务、医疗服务等边界清晰领域先行。",
      "例外清单和定期审查机制能让地方保留必要政策空间，同时防止例外无限扩张。",
      "大湾区可优先选择高频民生、专业服务和市场准入事项试点互认，再逐步沉淀共同规则。"
    ]
  }
};

export const COMPARATIVE_LAW_TOOL_MATRIX: ComparativeLawToolMatrixRow[] = [
  {
    tool: "统一法 / 国际公约",
    whatItDoes: "用同一套实体规则直接降低跨境交易中的法律差异。",
    examples: ["CISG", "OHADA Uniform Acts", "Hague Choice of Court Convention"],
    gbaUse: "适合合同、电子交易、判决流通等交易成本高且规则可标准化的领域。"
  },
  {
    tool: "示范法 / 统一示范文本",
    whatItDoes: "提供可被不同法域本地化采纳的共同文本。",
    examples: ["UNCITRAL Model Laws", "Uniform Commercial Code", "Model Business Corporation Act"],
    gbaUse: "适合作为大湾区示范规则、示范条款和共同指引的文本基础。"
  },
  {
    tool: "最低协调 / 结果趋同",
    whatItDoes: "不完全统一制度细节，但要求各法域达到共同监管结果。",
    examples: ["EU Directives", "OECD Recommendations", "ASEAN Blueprints"],
    gbaUse: "适合数据治理、消费者保护、专业服务监管等需要保留本地制度空间的议题。"
  },
  {
    tool: "互认 / 等效承认",
    whatItDoes: "承认对方法域的许可、资格、标准或监管结果，以减少重复审批。",
    examples: ["Cassis de Dijon", "Australian Mutual Recognition", "Trans-Tasman Mutual Recognition"],
    gbaUse: "适合专业资格、检测认证、政务服务、电子签名和市场准入试点。"
  },
  {
    tool: "工作组 / 监管网络",
    whatItDoes: "通过常设或专题机构持续生产规则、解释和执行接口。",
    examples: ["UNCITRAL Working Groups", "European Commission Networks", "Nordic Council of Ministers"],
    gbaUse: "适合建立跨部门、跨法域的常态化规则衔接平台。"
  },
  {
    tool: "案例库 / 解释共同体",
    whatItDoes: "用案例摘要、官方评注和共同培训减少同一规则的解释分裂。",
    examples: ["CLOUT", "CJEU Preliminary Rulings", "UCC Official Comments"],
    gbaUse: "适合建设大湾区跨境案例摘要、裁判规则索引和联合培训材料。"
  },
  {
    tool: "同行评审 / 指标评估",
    whatItDoes: "通过公开评估、年度报告和同侪压力推动监管质量趋同。",
    examples: ["OECD Regulatory Policy Outlook", "Canadian Free Trade Agreement Reports", "BEPS Minimum Standards"],
    gbaUse: "适合把规则衔接进度转化为可跟踪的年度指标和任务清单。"
  }
];

const COMPARATIVE_LAW_MODULE_BASE: ComparativeLawBaseModule[] = [
  {
    id: "market-integration",
    title: "市场一体化的制度要求",
    section: "基础理论",
    badge: "基础理论",
    summary:
      "市场一体化并不等于单纯的贸易自由化。真正稳定的一体化市场通常同时要求市场准入规则、监管协调机制、司法救济、标准兼容和争议解决网络协同运作，从而把跨境交易成本压到足够低。",
    keyQuestions: [
      "什么领域必须统一规则，什么领域可以通过互认、等效承认或程序协作解决？",
      "一体化市场中的执法与救济应由中央机构主导，还是保留地方执行并辅以冲突协调？",
      "市场效率、地方自治、公共政策差异和基本权利保障如何同时被纳入制度设计？"
    ],
    literature: [
      {
        title: "Bela Balassa, The Theory of Economic Integration",
        meta: "英文专著 | 1961",
        note: "经典起点，区分自由贸易区、关税同盟、共同市场、经济联盟等层次，适合为“市场一体化深度”提供基础框架。"
      },
      {
        title: "Stephen Weatherill, The Internal Market as a Legal Concept",
        meta: "英文论文 | 2017",
        note: "从欧盟法角度解释内部市场并非单一政策口号，而是一组可司法化、可执行的法律原则。"
      },
      {
        title: "Joseph H. H. Weiler, The Constitution of Europe",
        meta: "英文专著 | 1999",
        note: "适合把市场一体化与超国家治理、成员国主权让渡和制度正当性联系起来阅读。"
      },
      {
        title: "赵俊豪、赖锐标、杨思睿：《规则衔接：粤港澳大湾区经济一体化指数构建》",
        meta: "中文期刊 | 2024",
        note: "可作为本页与大湾区项目相接的中文材料，说明规则衔接如何被纳入经济一体化量化观察。"
      }
    ],
    rules: [
      {
        title: "Treaty on the Functioning of the European Union, Arts. 26, 34-36, 45, 56",
        meta: "欧盟条约条文",
        note: "分别对应内部市场、货物自由流动、劳动者自由流动和服务自由流动，是观察共同市场法律骨架的核心文本。"
      },
      {
        title: "Single European Act 1986",
        meta: "欧盟制度性里程碑",
        note: "把“1992内部市场计划”法制化，展示政治承诺如何被转化为统一立法和时间表治理。"
      },
      {
        title: "Australian Mutual Recognition Act 1992",
        meta: "澳大利亚联邦立法",
        note: "展示在不完全统一实体规则的前提下，如何通过相互承认降低州际市场壁垒。"
      },
      {
        title: "Canadian Free Trade Agreement 2017",
        meta: "加拿大联邦-省际协议",
        note: "用协定和争端解决程序管理省际贸易限制，是分权国家内部市场建设的典型制度文本。"
      }
    ],
    institutions: [
      {
        title: "European Commission",
        meta: "欧盟执行与立法倡议机构",
        note: "负责提出内部市场立法、监督成员国转化和发起侵权程序，是一体化市场的日常推进器。"
      },
      {
        title: "Court of Justice of the European Union",
        meta: "欧盟司法机构",
        note: "通过初步裁决和直接效力、优先适用等判例，把市场一体化从政策目标变成司法可执行规范。"
      },
      {
        title: "Internal Trade Secretariat of Canada",
        meta: "加拿大协定执行支持机构",
        note: "负责省际内部贸易协定的程序协调、会议支持与实施跟踪，适合作为轻量协调机构样本。"
      },
      {
        title: "National Cabinet / Intergovernmental Ministerial Councils (Australia)",
        meta: "澳大利亚跨政府协调平台",
        note: "体现分权体制中通过部长级与政府间协商推进规则兼容的做法。"
      }
    ],
    cases: [
      {
        title: "Rewe-Zentral AG v Bundesmonopolverwaltung fur Branntwein (Cassis de Dijon)",
        meta: "CJEU | 1979",
        note: "互认原则的代表性判例，说明市场一体化不必以先统一全部实体规则为前提。"
      },
      {
        title: "Procureur du Roi v Dassonville",
        meta: "CJEU | 1974",
        note: "把“具有同等效果的措施”解释得很宽，为清理成员国贸易障碍奠定基础。"
      },
      {
        title: "R v Comeau",
        meta: "Supreme Court of Canada | 2018",
        note: "围绕省际贸易自由和酒类流通限制，体现加拿大内部市场建设的宪法边界。"
      },
      {
        title: "Cole v Whitfield",
        meta: "High Court of Australia | 1988",
        note: "重释澳大利亚宪法中的州际贸易自由条款，说明司法解释如何重塑一体化市场边界。"
      }
    ],
    webSources: [
      {
        type: "文献",
        title: "Bela Balassa, The Theory of Economic Integration (Google Books)",
        href: "https://books.google.com/books/about/The_Theory_of_Economic_Integration_Routl.html?id=mUmRLOFDW5EC",
        note: "市场一体化分层理论的经典入口，可直接查看书目信息与版本情况。"
      },
      {
        type: "规则",
        title: "TFEU Article 26 (EUR-Lex)",
        href: "https://eur-lex.europa.eu/eli/treaty/tfeu_2012/art_26/oj/eng",
        note: "欧盟内部市场定义条款，是观察一体化市场制度要求的基础法源。"
      },
      {
        type: "机构",
        title: "European Commission: Internal Market",
        href: "https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/economy-works-people/internal-market_en",
        note: "欧盟委员会关于内部市场的官方专题页，可继续追踪政策工具与执行动态。"
      },
      {
        type: "案例",
        title: "Cassis de Dijon (Case 120/78, CURIA)",
        href: "https://curia.europa.eu/juris/showPdf.jsf?docid=90055&doclang=EN",
        note: "互认原则代表判例，适合直接引用英文判决文本。"
      }
    ],
    researchTracks: [
      "把“统一规则”“互认”“等效承认”“程序联网”分层，避免把所有市场整合手段都写成同一种制度。",
      "优先比较准入、标准、执法、司法救济四个环节，识别哪些环节必须同步推进。",
      "关注一体化市场中的执行机构，而不只看规则文本本身。",
      "把制度要求与大湾区的人员、货物、资金、数据流动专题逐一对应。"
    ],
    relevance:
      "这一模块可作为全页方法论入口，帮助大湾区研究避免把“市场一体化”简单写成政策目标，而转化为可拆解的制度清单。"
  },
  {
    id: "legal-harmonisation-theory",
    title: "法律融合的基本理论",
    section: "基础理论",
    badge: "基础理论",
    summary:
      "harmonisation、unification、legal transplant、mutual recognition、model law、restatement并不是可以互换的同义词。它们代表不同深度、不同约束力和不同组织方式的规则趋同路径。",
    keyQuestions: [
      "在何种情形下应追求统一法，何种情形下只需要协调最低标准或互认？",
      "法律移植的成败是由文本本身决定，还是取决于司法、职业共同体与制度语境？",
      "软法和示范法如何通过法院、仲裁、行业协会和合同实践获得事实上的规范力量？"
    ],
    literature: [
      {
        title: "Alan Watson, Legal Transplants: An Approach to Comparative Law",
        meta: "英文专著 | 1974",
        note: "法律移植理论的代表作，适合解释规则为何会跨法域传播。"
      },
      {
        title: "Pierre Legrand, The Impossibility of Legal Transplants",
        meta: "英文论文 | 1997",
        note: "对Watson命题的经典挑战，提醒我们移植的不只是条文，还涉及解释共同体与法律文化。"
      },
      {
        title: "薛宇：《粤港澳大湾区规则衔接的基本原理》",
        meta: "中文期刊 | 2024",
        note: "可直接用于中文写作，帮助区分规则衔接、规则统一、规则趋同与规则适用。"
      },
      {
        title: "Hao Jiang (ed.), Towards a Model Sales Law in the Greater Bay Area",
        meta: "英文编著 | 2024",
        note: "把比较法理论落到大湾区私法协调问题上，是本页与课题核心问题结合最紧的英文材料之一。"
      }
    ],
    rules: [
      {
        title: "United Nations Convention on Contracts for the International Sale of Goods (CISG)",
        meta: "统一法样本",
        note: "典型的unification文本，通过国际公约直接提供统一实体规则。"
      },
      {
        title: "UNIDROIT Principles of International Commercial Contracts",
        meta: "软法 / 示范性原则",
        note: "典型的harmonisation工具，可通过合同选择、仲裁援引和立法参照发挥作用。"
      },
      {
        title: "Principles of European Contract Law / Draft Common Frame of Reference",
        meta: "学术共同原则",
        note: "代表学术共同体推动规则趋同的路径，适合观察“非正式统一”的知识生产机制。"
      },
      {
        title: "Uniform Commercial Code",
        meta: "国内统一法样本",
        note: "展示分权国家内部如何通过统一文本、官方评注和州际采纳实现广泛趋同。"
      }
    ],
    institutions: [
      {
        title: "UNCITRAL",
        meta: "联合国法律协调机构",
        note: "适合观察公约、示范法和立法指南的多路径输出。"
      },
      {
        title: "UNIDROIT",
        meta: "国际统一私法机构",
        note: "更偏私法统一和原则制定，是“软法推动硬法趋同”的重要样本。"
      },
      {
        title: "Uniform Law Commission and American Law Institute",
        meta: "美国双机构结构",
        note: "展示示范法、统一法和Restatement如何在职业共同体与州立法之间流动。"
      },
      {
        title: "European Law Institute",
        meta: "欧洲法学共同体机构",
        note: "体现研究共同体、专家网络和政策文本之间的中介作用。"
      }
    ],
    cases: [
      {
        title: "CISG as an Opt-Out Uniform Law",
        meta: "统一法样本",
        note: "当事人原则上适用统一销售法，展示“统一法+当事人自治”的组合。"
      },
      {
        title: "OHADA Uniform Acts",
        meta: "区域统一法样本",
        note: "在多国、混合法系和发展中经济体背景下推进统一商法，适合与大湾区比较制度深度。"
      },
      {
        title: "Japan Civil Code Contract Reform 2017",
        meta: "法律移植与本土化样本",
        note: "展示比较法借鉴、司法传统和本地法技术如何共同塑造修法结果。"
      },
      {
        title: "GBA Model Sales Law Discussion",
        meta: "大湾区示范规则样本",
        note: "可把大湾区是否需要“示范销售法”“共同原则”“示范条款”直接纳入研究议程。"
      }
    ],
    webSources: [
      {
        type: "文献",
        title: "Alan Watson, Legal Transplants (Google Books)",
        href: "https://books.google.com/books/about/Legal_Transplants.html?hl=en&id=NIagicAS0RYC",
        note: "法律移植理论代表著作，可作为 harmonisation、unification 之外的比较法入口。"
      },
      {
        type: "规则",
        title: "UNIDROIT Principles of International Commercial Contracts 2016",
        href: "https://www.unidroit.org/instruments/commercial-contracts/unidroit-principles-2016/",
        note: "观察软法、共同原则和合同自治如何推动规则趋同的官方入口。"
      },
      {
        type: "机构",
        title: "UNIDROIT Overview",
        href: "https://www.unidroit.org/about-unidroit/overview/",
        note: "适合把国际统一私法机构的组织逻辑和项目生成机制一起纳入比较。"
      },
      {
        type: "案例",
        title: "OHADA Uniform Acts",
        href: "https://www.ohada.org/en/uniform-acts/",
        note: "区域统一商法样本，适合比较统一文本、共同机构和多国适用的组合。"
      }
    ],
    researchTracks: [
      "每写到“融合”时，都先判断究竟是统一法、最低协调、互认还是法律移植。",
      "区分条文借鉴和制度借鉴，避免只复制规则文字而忽略执行环境。",
      "把示范法、共同原则、行业规则和司法解释都纳入“规则形成机制”观察范围。",
      "为大湾区各专题单独判断最合适的融合深度，而不是预设所有领域都需要统一。"
    ],
    relevance:
      "这一模块给整页提供概念工具箱，后续无论比较欧盟、美国还是国际组织，都可以回到这里判断其法律融合方式究竟属于哪一种。"
  },
  {
    id: "eu-integration",
    title: "欧盟法律和规则一体化的经验",
    section: "域外经验",
    badge: "欧盟经验",
    summary:
      "欧盟的价值不只在于“规则多”，而在于它把条约授权、统一立法、成员国转化、司法解释、机构执法和技术标准组织成了一个真正的多层级法律秩序。",
    keyQuestions: [
      "条例与指令在一体化深度上分别解决什么问题？",
      "欧洲法院如何把市场一体化从政治承诺变成成员国法院必须执行的法律规范？",
      "共同标准、专业监管机构和网络化执法如何减少成员国之间的执行落差？"
    ],
    literature: [
      {
        title: "Paul Craig and Grainne de Burca, EU Law: Text, Cases, and Materials",
        meta: "英文教材",
        note: "最适合总览欧盟法律秩序、机构结构和核心判例。"
      },
      {
        title: "Catherine Barnard, The Substantive Law of the EU: The Four Freedoms",
        meta: "英文专著",
        note: "专门处理四大自由，是观察共同市场运行逻辑的核心参考书。"
      },
      {
        title: "Miguel Poiares Maduro, We the Court",
        meta: "英文专著",
        note: "从法院角色解释欧盟一体化如何通过司法对话和判例法推进。"
      },
      {
        title: "Stephen Weatherill, Law and Integration in the European Union",
        meta: "英文专著",
        note: "适合把市场整合、监管选择和宪法结构放在一起理解。"
      }
    ],
    rules: [
      {
        title: "TEU / TFEU Internal Market Framework",
        meta: "欧盟条约基础",
        note: "决定欧盟有权在哪些领域立法，以及四大自由和竞争规则如何运行。"
      },
      {
        title: "Regulations and Directives",
        meta: "两类核心立法工具",
        note: "条例直接适用，指令要求成员国转化；二者展示了不同深度的一体化技术。"
      },
      {
        title: "Services Directive 2006/123/EC",
        meta: "服务市场整合规则",
        note: "说明欧盟如何在服务自由流动与成员国监管自治之间寻找平衡。"
      },
      {
        title: "Digital Markets Act / Digital Services Act",
        meta: "数字单一市场新规则",
        note: "展示欧盟如何在新兴领域用统一规则包取代成员国碎片化监管。"
      }
    ],
    institutions: [
      {
        title: "European Commission",
        meta: "立法倡议与执法监督",
        note: "通过侵权程序、指南、执行决定和统一监管推动成员国收敛。"
      },
      {
        title: "European Parliament and Council",
        meta: "联合立法机构",
        note: "体现欧盟一体化中的政治协商和成员国参与机制。"
      },
      {
        title: "Court of Justice of the European Union",
        meta: "司法解释中枢",
        note: "通过直接效力、优先适用和初步裁决制度形成统一解释。"
      },
      {
        title: "European Supervisory and Standardisation Networks",
        meta: "技术监管与标准体系",
        note: "如ESMA、EBA和欧洲标准化组织，说明一体化常依赖专业机构网络而非单一大法。"
      }
    ],
    cases: [
      {
        title: "Van Gend en Loos",
        meta: "CJEU | 1963",
        note: "确立直接效力，使欧盟法可以被私人主体直接援引。"
      },
      {
        title: "Costa v ENEL",
        meta: "CJEU | 1964",
        note: "确立欧盟法优先地位，是一体化法律秩序可运行的关键。"
      },
      {
        title: "Cassis de Dijon",
        meta: "CJEU | 1979",
        note: "互认和强制性要求理论的里程碑。"
      },
      {
        title: "Keck and Mithouard",
        meta: "CJEU | 1993",
        note: "重新划定市场进入审查边界，说明一体化并不总是线性扩张。"
      }
    ],
    webSources: [
      {
        type: "文献",
        title: "Paul Craig and Grainne de Burca, EU Law: Text, Cases, and Materials",
        href: "https://academic.oup.com/oxford-law-pro/book/59951",
        note: "欧盟法总览型权威教材的出版社页面，可作为后续扩展欧盟制度材料的书目起点。"
      },
      {
        type: "规则",
        title: "Services Directive 2006/123/EC (EUR-Lex)",
        href: "https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32006L0123",
        note: "服务市场一体化的代表性规则，可直接查看正式法文本与修订关系。"
      },
      {
        type: "机构",
        title: "European Commission: Internal Market",
        href: "https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/economy-works-people/internal-market_en",
        note: "欧盟委员会内部市场页面，便于继续顺藤摸瓜找执法、评估和政策资料。"
      },
      {
        type: "案例",
        title: "Van Gend en Loos (Case 26/62, InfoCuria)",
        href: "https://infocuria.curia.europa.eu/tabs/redirect/juris/liste.jsf?num=C-26%2F62",
        note: "直接效力里程碑案件，可作为欧盟一体化法律秩序形成的判例入口。"
      }
    ],
    researchTracks: [
      "把欧盟经验拆成条约、立法、法院、技术标准四层，避免只写成“欧盟模式”。",
      "比较条例、指令、建议、标准在不同领域的适用场景。",
      "单独研究初步裁决、侵权程序和成员国转化义务等执行机制。",
      "关注数字、金融、专业服务等新领域中“单一规则手册”的立法技术。"
    ],
    relevance:
      "欧盟最值得借鉴的不是单纯“统一”，而是用不同强度的法律工具和机构网络把共同市场持续运转起来。"
  },
  {
    id: "us-state-harmonisation",
    title: "美国各州法律harmonization和unification方面的经验",
    section: "域外经验",
    badge: "美国经验",
    summary:
      "美国没有一个覆盖所有私法和商法的中央统一法典，但它通过统一法、示范法、Restatement、联邦宪法边界和司法职业共同体，在高度分权的条件下实现了大量规则趋同。",
    keyQuestions: [
      "州法统一依赖强制性联邦规则，还是依赖统一文本和职业共同体传播？",
      "州际市场一体化和州法自治之间的平衡是如何维持的？",
      "示范法经州议会采纳后出现局部修改时，统一性如何被维护？"
    ],
    literature: [
      {
        title: "James J. White and Robert S. Summers, Uniform Commercial Code",
        meta: "英文专著",
        note: "研究美国州法统一最常用的UCC权威教材。"
      },
      {
        title: "Karl N. Llewellyn, Why a Commercial Code?",
        meta: "英文论文",
        note: "理解UCC背后法现实主义方法和统一商法动机的重要文本。"
      },
      {
        title: "American Law Institute, Restatement of the Law",
        meta: "英文权威汇编",
        note: "虽然不直接立法，但对法院和立法者都有强影响力，是柔性统一的重要工具。"
      },
      {
        title: "Grant Gilmore, The Ages of American Law",
        meta: "英文专著",
        note: "有助于理解美国法如何在判例、法典化和学术整合之间演化。"
      }
    ],
    rules: [
      {
        title: "Uniform Commercial Code",
        meta: "统一法典",
        note: "美国最成功的州际统一法样本，覆盖销售、票据、担保交易等核心商法领域。"
      },
      {
        title: "Uniform Electronic Transactions Act",
        meta: "统一示范法",
        note: "电子签名和电子记录领域的统一规则，为各州数字交易兼容提供基础。"
      },
      {
        title: "Model Business Corporation Act",
        meta: "示范公司法",
        note: "体现“不是所有文本都必须完全统一，但可以形成高相似度”这一美国路径。"
      },
      {
        title: "Revised Uniform Partnership Act / Uniform Arbitration Act",
        meta: "统一法系列",
        note: "说明统一法不是一次性工程，而是可在不同部门法反复滚动推进。"
      }
    ],
    institutions: [
      {
        title: "Uniform Law Commission",
        meta: "统一法律委员会",
        note: "负责起草统一法和示范法，是美国州法趋同的核心制度平台。"
      },
      {
        title: "American Law Institute",
        meta: "美国法律学会",
        note: "通过Restatement、Principles和Model Codes在法官、律师、学者之间塑造共同语言。"
      },
      {
        title: "State Legislatures",
        meta: "州议会体系",
        note: "统一法最终仍需各州采纳，体现柔性统一的政治环节。"
      },
      {
        title: "Supreme Court of the United States",
        meta: "联邦宪法边界守门人",
        note: "通过Commerce Clause和Dormant Commerce Clause维持州际市场开放的底线。"
      }
    ],
    cases: [
      {
        title: "Gibbons v Ogden",
        meta: "U.S. Supreme Court | 1824",
        note: "州际商业权力的早期里程碑，确立联邦对跨州商业的核心权限。"
      },
      {
        title: "Erie Railroad Co. v Tompkins",
        meta: "U.S. Supreme Court | 1938",
        note: "虽然强化州法地位，但也说明统一性不能简单依赖联邦普通法。"
      },
      {
        title: "Pike v Bruce Church",
        meta: "U.S. Supreme Court | 1970",
        note: "Dormant Commerce Clause平衡测试的代表判例。"
      },
      {
        title: "Granholm v Heald",
        meta: "U.S. Supreme Court | 2005",
        note: "对州际酒类流通中的差别待遇进行审查，是市场一体化与地方监管冲突的现代样本。"
      }
    ],
    webSources: [
      {
        type: "文献",
        title: "White and Summers, Uniform Commercial Code (Google Books)",
        href: "https://books.google.com/books/about/Uniform_Commercial_Code.html?id=WhIrAQAAMAAJ",
        note: "美国州法统一研究的经典书目入口，便于继续扩展 UCC 体系文献。"
      },
      {
        type: "规则",
        title: "Uniform Commercial Code (Uniform Law Commission)",
        href: "https://www.uniformlaws.org/ucc",
        note: "统一商法文本与修订信息的官方入口。"
      },
      {
        type: "机构",
        title: "Uniform Law Commission Overview",
        href: "https://www.uniformlaws.org/aboutulc/overview",
        note: "观察美国州法统一如何通过起草、推广和州议会采纳来推进。"
      },
      {
        type: "案例",
        title: "Gibbons v. Ogden (Oyez)",
        href: "https://www.oyez.org/cases/1789-1850/22us1",
        note: "州际商业条款代表案件，适合把统一法经验放回联邦宪法框架里理解。"
      }
    ],
    researchTracks: [
      "研究统一法文本之外的官方评注、教材和执业共同体如何维持统一解释。",
      "把UCC、UETA、示范公司法等拆开，比较何种领域更适合示范法路径。",
      "比较州法自愿采纳机制与欧盟强制转化机制的差异。",
      "关注联邦宪法底线规则与州际统一法之间的功能分工。"
    ],
    relevance:
      "美国经验提示我们，分权法域内部的规则趋同可以更多依赖统一文本、专业共同体和司法边界，而不必预设单一立法中心。"
  },
  {
    id: "uncitral",
    title: "联合国国际贸易法委员会",
    section: "域外经验",
    badge: "UNCITRAL",
    summary:
      "UNCITRAL的核心贡献在于提供可被不同法系、不同发展阶段法域采纳的高质量商法文本，并用工作组、解释资料、案例数据库和培训网络维持这些文本的生命力。",
    keyQuestions: [
      "国际公约、示范法和立法指南分别适合解决什么类型的跨境法律问题？",
      "UNCITRAL如何在文本起草阶段兼顾普通法、大陆法和发展中国家需要？",
      "统一文本在各国实施后，如何通过案例数据库和解释材料减少适用分歧？"
    ],
    literature: [
      {
        title: "Ingeborg Schwenzer (ed.), Schlechtriem & Schwenzer: Commentary on the CISG",
        meta: "英文评注",
        note: "研究CISG最常用的体系化评注之一。"
      },
      {
        title: "UNCITRAL Digest of Case Law on the Model Law on International Commercial Arbitration",
        meta: "官方案例摘要",
        note: "适合把示范法文本和司法适用放在一起观察。"
      },
      {
        title: "UNCITRAL Guide to Enactment and Interpretation",
        meta: "官方解释资料",
        note: "用于理解示范法如何被设计为各国可本地化采纳。"
      },
      {
        title: "Franco Ferrari, CISG and Its Impact on National Legal Systems",
        meta: "英文论文集",
        note: "适合理解统一法落地到各国司法和商业实践后的真实效果。"
      }
    ],
    rules: [
      {
        title: "United Nations Convention on Contracts for the International Sale of Goods",
        meta: "国际统一法公约",
        note: "最成功的国际商事统一法文本之一。"
      },
      {
        title: "UNCITRAL Model Law on International Commercial Arbitration",
        meta: "示范法",
        note: "展示仲裁领域如何通过可本地转化的统一框架实现全球趋同。"
      },
      {
        title: "UNCITRAL Model Law on Electronic Commerce",
        meta: "示范法",
        note: "电子交易法制兼容的早期国际样本。"
      },
      {
        title: "UNCITRAL Model Law on Cross-Border Insolvency",
        meta: "示范法",
        note: "围绕主程序、承认和协助建立跨境破产合作底层规则。"
      },
      {
        title: "United Nations Convention on International Settlement Agreements Resulting from Mediation",
        meta: "新加坡调解公约",
        note: "把跨境调解协议执行推向公约层面，适合与大湾区调解合作议题联动。"
      }
    ],
    institutions: [
      {
        title: "UNCITRAL Commission",
        meta: "委员会本体",
        note: "决定项目议程、通过文本、协调成员国协商。"
      },
      {
        title: "UNCITRAL Working Groups",
        meta: "工作组机制",
        note: "通过专业分工持续推进中小企业、仲裁、争端解决、电子商务、破产等议题。"
      },
      {
        title: "UNCITRAL Secretariat",
        meta: "秘书处",
        note: "负责技术支持、文件汇编、培训和案例资料维护，是文本持续运作的重要基础设施。"
      },
      {
        title: "CLOUT and Case Law Digests",
        meta: "案例传播机制",
        note: "通过统一摘要和跨法域案例传播减少解释分裂。"
      }
    ],
    cases: [
      {
        title: "Delchi Carrier SpA v Rotorex Corp.",
        meta: "U.S. Court of Appeals | 1995 | CISG",
        note: "早期CISG代表判例，常被用于说明统一销售法中的损害赔偿问题。"
      },
      {
        title: "MCC-Marble Ceramic Center, Inc. v Ceramica Nuova d'Agostino, S.p.A.",
        meta: "U.S. Court of Appeals | 1998 | CISG",
        note: "体现国际统一法解释不应简单回退到国内合同法思维。"
      },
      {
        title: "Re Zetta Jet Pte Ltd",
        meta: "Singapore High Court | 2018 | Model Law",
        note: "跨境破产示范法在亚洲司法实践中的重要样本。"
      },
      {
        title: "Early Singapore Convention Ratification Practice",
        meta: "国际调解执行样本",
        note: "可跟踪各国如何把调解执行从软法推进到可执行国际承诺。"
      }
    ],
    webSources: [
      {
        type: "文献",
        title: "UNCITRAL Digest of Case Law on the CISG",
        href: "https://uncitral.un.org/sites/uncitral.un.org/files/media-documents/uncitral/en/cisg-digest-2012-e.pdf",
        note: "官方案例摘要资料，适合直接进入统一销售法的解释实践。"
      },
      {
        type: "规则",
        title: "UNCITRAL Model Law on International Commercial Arbitration",
        href: "https://uncitral.un.org/en/texts/arbitration/modellaw/commercial_arbitration",
        note: "仲裁领域最具影响力的示范法之一，是研究法律融合机制的核心样本。"
      },
      {
        type: "机构",
        title: "UNCITRAL Working Groups",
        href: "https://uncitral.un.org/en/content/working-groups",
        note: "直接展示 UNCITRAL 如何通过工作组持续生成规则文本与配套资料。"
      },
      {
        type: "案例",
        title: "Case Law on UNCITRAL Texts (CLOUT)",
        href: "https://uncitral.un.org/en/case_law",
        note: "统一文本落地后的案例数据库入口，可继续追踪各国法院和仲裁实践。"
      }
    ],
    researchTracks: [
      "优先选择最贴近大湾区商事议题的UNCITRAL文本，如电子商务、仲裁、跨境破产和调解。",
      "同步观察“通过文本”与“解释文本”的双重机制，不只看条文本身。",
      "用CLOUT和各国判例比较统一文本落地后的解释分歧。",
      "考虑大湾区是否适合先做示范规则、工作指引和立法指南，再逐步推进更强约束力安排。"
    ],
    relevance:
      "UNCITRAL经验特别适合大湾区，因为它展示了在法系差异显著的情况下，仍可通过高质量文本和解释网络逐步推进规则兼容。"
  },
  {
    id: "other-organisations",
    title: "其他国际组织",
    section: "域外经验",
    badge: "UNIDROIT / OECD / HCCH",
    summary:
      "除UNCITRAL外，UNIDROIT、OECD、海牙国际私法会议等机构也持续通过原则、示范文本、公约、指标和同行审议影响各国法律与监管实践。",
    keyQuestions: [
      "软法原则、国际公约、监管指标和同行审议分别如何影响国内法改革？",
      "私法统一机构与公共政策协调机构在工作方式上有何不同？",
      "国际组织的规则输出何时会转化为法院、仲裁机构和监管机关的实际操作标准？"
    ],
    literature: [
      {
        title: "Michael Joachim Bonell, An International Restatement of Contract Law",
        meta: "英文专著",
        note: "UNIDROIT Principles的经典解释框架。"
      },
      {
        title: "OECD Regulatory Policy Outlook",
        meta: "英文政策报告",
        note: "适合把法律趋同放进监管质量、事前评估和事后审查框架中考察。"
      },
      {
        title: "HCCH Practical Handbooks",
        meta: "英文实务手册",
        note: "说明海牙体系如何通过手册、解释报告和联络机制提升公约适用一致性。"
      },
      {
        title: "Sara Migliorini and Celia Matias, New Frontiers of Legal Integration",
        meta: "英文期刊 | 2024",
        note: "可把GBA问题与国际组织推动法律整合的更广视野连接起来。"
      }
    ],
    rules: [
      {
        title: "UNIDROIT Principles of International Commercial Contracts",
        meta: "共同原则 / 软法",
        note: "对立法、合同起草和仲裁裁决都有现实影响。"
      },
      {
        title: "Cape Town Convention and Aircraft Protocol",
        meta: "UNIDROIT牵头的统一私法文本",
        note: "展示高度专业化资产融资领域如何通过统一规则降低跨境交易成本。"
      },
      {
        title: "Hague Choice of Court Convention 2005",
        meta: "海牙公约",
        note: "围绕专属管辖协议与判决承认执行形成跨境商事诉讼规则。"
      },
      {
        title: "Hague Judgments Convention 2019",
        meta: "海牙公约",
        note: "为跨境民商事判决流通建立更一般性的承认执行框架。"
      },
      {
        title: "OECD Recommendation on Regulatory Policy and Governance",
        meta: "监管治理建议",
        note: "体现并非所有规则趋同都通过“法典”完成，也可以通过监管质量标准推进。"
      }
    ],
    institutions: [
      {
        title: "UNIDROIT Governing Council and Secretariat",
        meta: "国际统一私法机构",
        note: "以专家驱动和功能性私法统一见长。"
      },
      {
        title: "Hague Conference on Private International Law",
        meta: "海牙国际私法会议",
        note: "以跨境诉讼、送达、取证、判决流通为重点，是司法协作制度化的重要平台。"
      },
      {
        title: "OECD Regulatory Policy Committee",
        meta: "监管政策网络",
        note: "以指标、评估、同行审议推动成员与伙伴经济体监管方法趋同。"
      },
      {
        title: "WTO TBT and SPS Committees",
        meta: "技术性规则协调平台",
        note: "适合观察贸易法之外，技术标准和监管透明度如何影响市场一体化。"
      }
    ],
    cases: [
      {
        title: "Cape Town Convention in Aircraft Finance Practice",
        meta: "统一担保规则样本",
        note: "体现高价值动产融资如何依赖统一登记与优先顺位规则。"
      },
      {
        title: "Implementation of the Hague Choice of Court Convention in Singapore and the United Kingdom",
        meta: "跨境判决流通样本",
        note: "适合研究国际公约如何进入本地法院日常适用。"
      },
      {
        title: "OECD BEPS Minimum Standards Rollout",
        meta: "税收监管趋同样本",
        note: "展示非传统私法组织如何用软约束和同行审议形成强烈收敛效果。"
      },
      {
        title: "UNIDROIT Principles in Arbitral Awards",
        meta: "软法落地样本",
        note: "说明共同原则并非只有象征意义，而会被仲裁庭实质引用。"
      }
    ],
    webSources: [
      {
        type: "文献",
        title: "OECD Regulatory Policy Outlook 2025",
        href: "https://www.oecd.org/en/publications/oecd-regulatory-policy-outlook-2025_56b60e39-en/full-report.html",
        note: "官方完整报告，可把法律融合问题放进监管治理与规则质量框架中观察。"
      },
      {
        type: "规则",
        title: "Hague Choice of Court Convention 2005 (Full Text)",
        href: "https://www.hcch.net/en/instruments/conventions/full-text/?cid=98",
        note: "海牙体系下跨境商事争议流通的关键公约文本。"
      },
      {
        type: "机构",
        title: "HCCH About Page",
        href: "https://www.hcch.net/index_en.php?act=text.display&tid=4",
        note: "了解海牙国际私法会议机构架构、成员范围与工作方式的官方入口。"
      },
      {
        type: "案例",
        title: "Perspectives in Practice of the UNIDROIT Principles 2016",
        href: "https://www.unidroit.org/iba-publishes-perspectives-in-practice-of-unidroit-principles-2016/",
        note: "通过案例摘要观察 UNIDROIT Principles 如何进入仲裁和商业实践。"
      }
    ],
    researchTracks: [
      "把UNIDROIT、HCCH、OECD分开研究，分别对应私法统一、司法协作和监管治理三条路径。",
      "比较公约型文本和软法型文本在落地速度、解释统一和政治可行性上的差异。",
      "优先筛选与合同、担保、跨境判决、税收治理和监管质量直接相关的输出。",
      "研究国际组织文本在法院、仲裁、监管评估和行业实践中的具体引用方式。"
    ],
    relevance:
      "这组经验能帮助大湾区研究摆脱“只有统一立法才算融合”的单一路径想象，把软法、监管网络和司法协作都纳入制度工具箱。"
  },
  {
    id: "other-foreign-experiences",
    title: "其他值得借鉴的外国经验",
    section: "域外经验",
    badge: "开放样本",
    summary:
      "除欧盟和美国外，澳大利亚、加拿大、北欧、新加坡与东盟等都提供了不同强度的规则兼容经验：有的依赖联邦宪法与互认，有的依赖部长理事会与共同草案，有的则以框架协议和行业MRAs逐步推进。",
    keyQuestions: [
      "哪些经验适合高度制度差异环境，哪些更适合相近法文化环境？",
      "互认、部长理事会、共同草案和行业MRA哪一种更接近大湾区现实？",
      "当区域组织缺乏强制法院时，如何通过协商和软法维持长期趋同？"
    ],
    literature: [
      {
        title: "Productivity Commission, Mutual Recognition Schemes",
        meta: "英文官方报告 | 澳大利亚",
        note: "适合研究互认制度的运行效果和调整难点。"
      },
      {
        title: "Canadian Free Trade Agreement Annual Reports",
        meta: "英文年度报告 | 加拿大",
        note: "可持续跟踪省际壁垒清理的制度化进展。"
      },
      {
        title: "Nordic Council of Ministers, Legislative Cooperation Materials",
        meta: "英文/北欧语资料",
        note: "展示相近法文化环境中的长期法制合作。"
      },
      {
        title: "ASEAN Economic Community Blueprint 2025",
        meta: "英文政策蓝图",
        note: "适合观察弱强制区域组织如何通过路线图和互认安排推进规则兼容。"
      }
    ],
    rules: [
      {
        title: "Australian Mutual Recognition Act 1992",
        meta: "澳大利亚联邦法",
        note: "州际互认的代表性制度。"
      },
      {
        title: "Trans-Tasman Mutual Recognition Arrangement / Act",
        meta: "澳新跨境互认安排",
        note: "把互认从国内州际扩展到相邻国家，是极具比较价值的跨境样本。"
      },
      {
        title: "Canadian Free Trade Agreement 2017",
        meta: "加拿大内部市场协定",
        note: "依靠协定、委员会和争端解决程序推进省际规则兼容。"
      },
      {
        title: "Helsinki Treaty and Nordic Legislative Cooperation",
        meta: "北欧合作框架",
        note: "体现长期委员会和共同草案在相近法文化中的效果。"
      },
      {
        title: "ASEAN Mutual Recognition Arrangements",
        meta: "行业互认安排",
        note: "在工程、建筑、护理等专业服务中逐步推进资格流动。"
      }
    ],
    institutions: [
      {
        title: "Australian and New Zealand Intergovernmental Forums",
        meta: "部长级协调平台",
        note: "展示互认和标准协调如何依赖持续性的政府间会议机制。"
      },
      {
        title: "Canadian Committee on Internal Trade / Secretariat",
        meta: "加拿大内部贸易机构",
        note: "通过会议、例外清单和争端程序维护协定运行。"
      },
      {
        title: "Nordic Council and Nordic Council of Ministers",
        meta: "北欧长期合作机构",
        note: "体现文化相近地区如何通过长期政治与技术合作推进法律兼容。"
      },
      {
        title: "ASEAN Secretariat and Sectoral MRAs Bodies",
        meta: "东盟协调网络",
        note: "说明在弱强制框架下，秘书处和专业机构仍能推动逐步趋同。"
      }
    ],
    cases: [
      {
        title: "Cole v Whitfield",
        meta: "High Court of Australia | 1988",
        note: "澳大利亚内部市场宪法边界的关键判例。"
      },
      {
        title: "Castlemaine Tooheys Ltd v South Australia",
        meta: "High Court of Australia | 1990",
        note: "说明地方监管措施如何可能构成对州际市场的实质障碍。"
      },
      {
        title: "R v Comeau",
        meta: "Supreme Court of Canada | 2018",
        note: "省际贸易自由与地方规制冲突的现代样本。"
      },
      {
        title: "ASEAN Professional Services MRAs Implementation",
        meta: "专业资格流动样本",
        note: "展示弱强制区域框架下，先从职业资格和行业规则入手的渐进式做法。"
      }
    ],
    webSources: [
      {
        type: "文献",
        title: "ASEAN Economic Community Blueprint 2025",
        href: "https://asean.org/wp-content/uploads/2021/08/AEC-Blueprint-2025.pdf",
        note: "东盟经济共同体的官方路线图文件，适合观察弱强制区域组织的推进逻辑。"
      },
      {
        type: "规则",
        title: "Trans-Tasman Mutual Recognition Act 1997",
        href: "https://www.legislation.govt.nz/act/public/1997/60/en/2014-01-01/",
        note: "澳新跨境互认的官方法律文本，是区域互认制度的代表样本。"
      },
      {
        type: "机构",
        title: "Nordic Co-operation: Freedom of Movement",
        href: "https://www.norden.org/en/freedom-movement",
        note: "北欧合作框架下处理人员和市场流动障碍的机构化入口。"
      },
      {
        type: "案例",
        title: "R. v. Comeau, 2018 SCC 15",
        href: "https://scc-csc.lexum.com/scc-csc/scc-csc/en/item/17035/index.do",
        note: "加拿大省际贸易自由的官方判决页面，适合比较宪法文本与内部市场实践。"
      }
    ],
    researchTracks: [
      "把这些开放样本按照“联邦国家”“区域组织”“相近法文化合作”分组比较。",
      "优先关注互认、共同草案、部长级协调和行业MRA四种技术。",
      "跟踪失败或推进缓慢的样本，它们往往比成功经验更能揭示制度成本。",
      "用这些经验去反推大湾区哪些领域适合先做试点、清单和行业接口，而非全面统一。"
    ],
    relevance:
      "开放样本区最有价值的地方在于它提醒我们：并不存在唯一的“标准答案”，真正可借鉴的是不同制度条件下可复制的技术组合。"
  }
];

const link = (sourceLabel: string, sourceHref: string): ComparativeLawEntrySource => ({
  sourceLabel,
  sourceHref
});

const COMPARATIVE_LAW_ENTRY_SOURCE_LINKS: ComparativeLawEntrySourceMap = {
  "market-integration": {
    literature: {
      "Bela Balassa, The Theory of Economic Integration": link(
        "书目信息",
        "https://books.google.com/books/about/The_Theory_of_Economic_Integration_Routl.html?id=mUmRLOFDW5EC"
      ),
      "Stephen Weatherill, The Internal Market as a Legal Concept": link(
        "出版社页",
        "https://academic.oup.com/book/6354"
      ),
      "Joseph H. H. Weiler, The Constitution of Europe": link(
        "书目信息",
        "https://books.google.com/books/about/The_Constitution_of_Europe.html?id=iNhNnwEACAAJ"
      ),
      "赵俊豪、赖锐标、杨思睿：《规则衔接：粤港澳大湾区经济一体化指数构建》": link(
        "原文PDF",
        "https://gzsk.org.cn/uploadfile/2024/1230/20241230114508309.pdf"
      )
    },
    rules: {
      "Treaty on the Functioning of the European Union, Arts. 26, 34-36, 45, 56": link(
        "官方文本",
        "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:12012E/TXT"
      ),
      "Single European Act 1986": link(
        "官方文本",
        "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:11986U"
      ),
      "Australian Mutual Recognition Act 1992": link(
        "官方文本",
        "https://www.legislation.gov.au/C2004A04489/latest"
      ),
      "Canadian Free Trade Agreement 2017": link(
        "官方PDF",
        "https://www.cfta-alec.ca/wp-content/uploads/2017/06/CFTA-Consolidated-Text-Final-Print-Text-English.pdf"
      )
    },
    institutions: {
      "European Commission": link(
        "机构官网",
        "https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/economy-works-people/internal-market_en"
      ),
      "Court of Justice of the European Union": link(
        "机构官网",
        "https://curia.europa.eu/jcms/jcms/Jo2_7024/en/"
      ),
      "Internal Trade Secretariat of Canada": link(
        "机构官网",
        "https://www.cfta-alec.ca/contact-us/internal-trade-secretariat"
      ),
      "National Cabinet / Intergovernmental Ministerial Councils (Australia)": link(
        "官方说明",
        "https://federation.gov.au/australias-federal-relations-architecture"
      )
    },
    cases: {
      "Rewe-Zentral AG v Bundesmonopolverwaltung fur Branntwein (Cassis de Dijon)": link(
        "判决文本",
        "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:61978CJ0120"
      ),
      "Procureur du Roi v Dassonville": link(
        "判决文本",
        "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:61974CJ0008"
      ),
      "R v Comeau": link(
        "判决文本",
        "https://scc-csc.lexum.com/scc-csc/scc-csc/en/item/17035/index.do"
      ),
      "Cole v Whitfield": link(
        "判决文本",
        "https://www.austlii.edu.au/cgi-bin/viewdoc/au/cases/cth/HCA/1988/18.html"
      )
    }
  },
  "legal-harmonisation-theory": {
    literature: {
      "Alan Watson, Legal Transplants: An Approach to Comparative Law": link(
        "书目信息",
        "https://books.google.com/books/about/Legal_Transplants.html?hl=en&id=NIagicAS0RYC"
      ),
      "Pierre Legrand, The Impossibility of Legal Transplants": link(
        "原文PDF",
        "https://journals.sagepub.com/doi/pdf/10.1177/1023263X9700400202"
      ),
      "薛宇：《粤港澳大湾区规则衔接的基本原理》": link(
        "原文",
        "https://www.dutenews.com/n/ctmedia/537077"
      ),
      "Hao Jiang (ed.), Towards a Model Sales Law in the Greater Bay Area": link(
        "出版社页",
        "https://www.e-elgar.com/shop/usd/towards-a-model-sales-law-in-the-greater-bay-area-9781035317417.html"
      )
    },
    rules: {
      "United Nations Convention on Contracts for the International Sale of Goods (CISG)": link(
        "官方文本",
        "https://uncitral.un.org/en/texts/salegoods/conventions/sale_of_goods/cisg"
      ),
      "UNIDROIT Principles of International Commercial Contracts": link(
        "官方下载",
        "https://www.unidroit.org/instruments/commercial-contracts/unidroit-principles-2016/"
      ),
      "Principles of European Contract Law / Draft Common Frame of Reference": link(
        "文本入口",
        "https://www.law.kuleuven.be/personal/mstorme/PECL2enfull.html"
      ),
      "Uniform Commercial Code": link(
        "官方入口",
        "https://www.uniformlaws.org/ucc"
      )
    },
    institutions: {
      "UNCITRAL": link("机构官网", "https://uncitral.un.org/"),
      "UNIDROIT": link("机构官网", "https://www.unidroit.org/about-unidroit/overview/"),
      "Uniform Law Commission and American Law Institute": link(
        "机构官网",
        "https://www.uniformlaws.org/aboutulc/overview"
      ),
      "European Law Institute": link("机构官网", "https://www.europeanlawinstitute.eu/")
    },
    cases: {
      "CISG as an Opt-Out Uniform Law": link(
        "官方文本",
        "https://uncitral.un.org/en/texts/salegoods/conventions/sale_of_goods/cisg"
      ),
      "OHADA Uniform Acts": link("官方文本", "https://www.ohada.org/en/uniform-acts/"),
      "Japan Civil Code Contract Reform 2017": link(
        "官方译文",
        "https://www.japaneselawtranslation.go.jp/en/laws/view/3494/en"
      ),
      "GBA Model Sales Law Discussion": link(
        "出版社页",
        "https://www.e-elgar.com/shop/usd/towards-a-model-sales-law-in-the-greater-bay-area-9781035317417.html"
      )
    }
  },
  "eu-integration": {
    literature: {
      "Paul Craig and Grainne de Burca, EU Law: Text, Cases, and Materials": link(
        "出版社页",
        "https://academic.oup.com/oxford-law-pro/book/59951"
      ),
      "Catherine Barnard, The Substantive Law of the EU: The Four Freedoms": link(
        "出版社页",
        "https://global.oup.com/academic/product/the-substantive-law-of-the-eu-9780192857880"
      ),
      "Miguel Poiares Maduro, We the Court": link(
        "出版社页",
        "https://www.bloomsbury.com/uk/we-the-court-9781901362251/"
      ),
      "Stephen Weatherill, Law and Integration in the European Union": link(
        "书目信息",
        "https://lawcat.berkeley.edu/record/156807"
      )
    },
    rules: {
      "TEU / TFEU Internal Market Framework": link(
        "官方文本",
        "https://eur-lex.europa.eu/collection/eu-law/treaties/treaties-force.html?locale=en"
      ),
      "Regulations and Directives": link(
        "官方条文",
        "https://eur-lex.europa.eu/eli/treaty/tfeu_2012/art_288/oj/eng"
      ),
      "Services Directive 2006/123/EC": link(
        "官方文本",
        "https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32006L0123"
      ),
      "Digital Markets Act / Digital Services Act": link(
        "官方专题",
        "https://digital-strategy.ec.europa.eu/en/policies/digital-services-act-package"
      )
    },
    institutions: {
      "European Commission": link(
        "机构官网",
        "https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/economy-works-people/internal-market_en"
      ),
      "European Parliament and Council": link(
        "机构索引",
        "https://european-union.europa.eu/institutions-law-budget/institutions-and-bodies_en"
      ),
      "Court of Justice of the European Union": link(
        "机构官网",
        "https://curia.europa.eu/jcms/jcms/Jo2_7024/en/"
      ),
      "European Supervisory and Standardisation Networks": link(
        "官方说明",
        "https://finance.ec.europa.eu/regulation-and-supervision/european-system-financial-supervision_en"
      )
    },
    cases: {
      "Van Gend en Loos": link(
        "判决文本",
        "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:61962CJ0026"
      ),
      "Costa v ENEL": link(
        "判决文本",
        "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:61964CJ0006"
      ),
      "Cassis de Dijon": link(
        "判决文本",
        "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:61978CJ0120"
      ),
      "Keck and Mithouard": link(
        "判决文本",
        "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:61991CJ0267"
      )
    }
  },
  "us-state-harmonisation": {
    literature: {
      "James J. White and Robert S. Summers, Uniform Commercial Code": link(
        "书目信息",
        "https://books.google.com/books/about/Uniform_Commercial_Code.html?id=WhIrAQAAMAAJ"
      ),
      "Karl N. Llewellyn, Why a Commercial Code?": link(
        "下载页",
        "https://chicagounbound.uchicago.edu/journal_articles/9450/"
      ),
      "American Law Institute, Restatement of the Law": link(
        "官方入口",
        "https://www.ali.org/publications/"
      ),
      "Grant Gilmore, The Ages of American Law": link(
        "出版社页",
        "https://yalebooks.yale.edu/9780300189919/the-ages-of-american-law/"
      )
    },
    rules: {
      "Uniform Commercial Code": link("官方入口", "https://www.uniformlaws.org/ucc"),
      "Uniform Electronic Transactions Act": link(
        "官方入口",
        "https://www.uniformlaws.org/committees/community-home?CommunityKey=2c04b76c-2b7d-4399-977e-d5876ba7e034"
      ),
      "Model Business Corporation Act": link(
        "官方文本",
        "https://www.americanbar.org/groups/business_law/resources/model-business-corporation-act/"
      ),
      "Revised Uniform Partnership Act / Uniform Arbitration Act": link(
        "官方入口",
        "https://www.uniformlaws.org/acts/catalog/current/p"
      )
    },
    institutions: {
      "Uniform Law Commission": link("机构官网", "https://www.uniformlaws.org/aboutulc/overview"),
      "American Law Institute": link("机构官网", "https://www.ali.org/"),
      "State Legislatures": link("机构索引", "https://www.ncsl.org/about-state-legislatures"),
      "Supreme Court of the United States": link("机构官网", "https://www.supremecourt.gov/")
    },
    cases: {
      "Gibbons v Ogden": link("判决资料", "https://www.oyez.org/cases/1789-1850/22us1"),
      "Erie Railroad Co. v Tompkins": link(
        "判决资料",
        "https://www.oyez.org/cases/1900-1940/304us64"
      ),
      "Pike v Bruce Church": link(
        "判决文本",
        "https://supreme.justia.com/cases/federal/us/397/137/"
      ),
      "Granholm v Heald": link("判决资料", "https://www.oyez.org/cases/2004/03-1116")
    }
  },
  uncitral: {
    literature: {
      "Ingeborg Schwenzer (ed.), Schlechtriem & Schwenzer: Commentary on the CISG": link(
        "出版社页",
        "https://global.oup.com/academic/product/schlechtriem-schwenzer-commentary-on-the-un-convention-on-the-international-sale-of-goods-cisg-9780198723264"
      ),
      "UNCITRAL Digest of Case Law on the Model Law on International Commercial Arbitration": link(
        "官方PDF",
        "https://uncitral.un.org/sites/uncitral.un.org/files/media-documents/uncitral/en/mal-digest-2012-e.pdf"
      ),
      "UNCITRAL Guide to Enactment and Interpretation": link(
        "官方文本",
        "https://uncitral.un.org/en/texts/arbitration/modellaw/commercial_arbitration"
      ),
      "Franco Ferrari, CISG and Its Impact on National Legal Systems": link(
        "出版社页",
        "https://sellier.de/en/books/private-international-law/147/cisg-and-its-impact-on-national-legal-systems"
      )
    },
    rules: {
      "United Nations Convention on Contracts for the International Sale of Goods": link(
        "官方文本",
        "https://uncitral.un.org/en/texts/salegoods/conventions/sale_of_goods/cisg"
      ),
      "UNCITRAL Model Law on International Commercial Arbitration": link(
        "官方文本",
        "https://uncitral.un.org/en/texts/arbitration/modellaw/commercial_arbitration"
      ),
      "UNCITRAL Model Law on Electronic Commerce": link(
        "官方文本",
        "https://uncitral.un.org/en/texts/ecommerce/modellaw/electronic_commerce"
      ),
      "UNCITRAL Model Law on Cross-Border Insolvency": link(
        "官方文本",
        "https://uncitral.un.org/en/texts/insolvency/modellaw/cross-border_insolvency"
      ),
      "United Nations Convention on International Settlement Agreements Resulting from Mediation": link(
        "官方文本",
        "https://uncitral.un.org/en/texts/mediation/conventions/international_settlement_agreements"
      )
    },
    institutions: {
      "UNCITRAL Commission": link("官方说明", "https://uncitral.un.org/en/commission"),
      "UNCITRAL Working Groups": link("官方说明", "https://uncitral.un.org/en/content/working-groups"),
      "UNCITRAL Secretariat": link("官方说明", "https://uncitral.un.org/en/about/secretariat"),
      "CLOUT and Case Law Digests": link("案例库", "https://uncitral.un.org/en/case_law")
    },
    cases: {
      "Delchi Carrier SpA v Rotorex Corp.": link(
        "判决PDF",
        "https://cisg-online.org/files/cases/6092/fullTextFile/113_65627736.pdf"
      ),
      "MCC-Marble Ceramic Center, Inc. v Ceramica Nuova d'Agostino, S.p.A.": link(
        "CLOUT摘要",
        "https://www.uncitral.org/clout/clout/data/usa/clout_case_222_leg-1445.html"
      ),
      "Re Zetta Jet Pte Ltd": link(
        "判决资料",
        "https://www.elitigation.sg/gd/s/2018_SGHC_16"
      ),
      "Early Singapore Convention Ratification Practice": link(
        "状态表",
        "https://uncitral.un.org/en/texts/mediation/conventions/international_settlement_agreements/status"
      )
    }
  },
  "other-organisations": {
    literature: {
      "Michael Joachim Bonell, An International Restatement of Contract Law": link(
        "出版社页",
        "https://brill.com/display/title/17857?language=en"
      ),
      "OECD Regulatory Policy Outlook": link(
        "官方报告",
        "https://www.oecd.org/en/publications/oecd-regulatory-policy-outlook-2025_56b60e39-en"
      ),
      "HCCH Practical Handbooks": link(
        "官方入口",
        "https://www.hcch.net/en/publications-and-studies/publications2/practical-handbooks/"
      ),
      "Sara Migliorini and Celia Matias, New Frontiers of Legal Integration": link(
        "原文",
        "https://academic.oup.com/cjcl/article/doi/10.1093/cjcl/cxae019/7928200"
      )
    },
    rules: {
      "UNIDROIT Principles of International Commercial Contracts": link(
        "官方下载",
        "https://www.unidroit.org/instruments/commercial-contracts/unidroit-principles-2016/"
      ),
      "Cape Town Convention and Aircraft Protocol": link(
        "官方文本",
        "https://www.icao.int/cape-town-convention-and-protocol"
      ),
      "Hague Choice of Court Convention 2005": link(
        "官方文本",
        "https://www.hcch.net/en/instruments/conventions/full-text/?cid=98"
      ),
      "Hague Judgments Convention 2019": link(
        "官方文本",
        "https://www.hcch.net/en/instruments/conventions/full-text/?cid=137"
      ),
      "OECD Recommendation on Regulatory Policy and Governance": link(
        "官方文本",
        "https://www.oecd.org/gov/regulatory-policy/recommendation-of-the-council-on-regulatory-policy-and-governance-9789264209022-en.htm"
      )
    },
    institutions: {
      "UNIDROIT Governing Council and Secretariat": link(
        "机构说明",
        "https://www.unidroit.org/about-unidroit/overview/"
      ),
      "Hague Conference on Private International Law": link(
        "机构官网",
        "https://www.hcch.net/index_en.php?act=text.display&tid=4"
      ),
      "OECD Regulatory Policy Committee": link(
        "机构说明",
        "https://www.oecd.org/gov/regulatory-policy/regulatory-policy-committee.htm"
      ),
      "WTO TBT and SPS Committees": link("官方专题", "https://www.wto.org/tbt")
    },
    cases: {
      "Cape Town Convention in Aircraft Finance Practice": link(
        "官方说明",
        "https://www.icao.int/cape-town-convention-and-protocol"
      ),
      "Implementation of the Hague Choice of Court Convention in Singapore and the United Kingdom": link(
        "公约状态",
        "https://www.hcch.net/en/instruments/conventions/status-table/?cid=98"
      ),
      "OECD BEPS Minimum Standards Rollout": link(
        "官方专题",
        "https://www.oecd.org/tax/beps/beps-actions/"
      ),
      "UNIDROIT Principles in Arbitral Awards": link(
        "案例库",
        "https://www.unilex.info/principles/cases"
      )
    }
  },
  "other-foreign-experiences": {
    literature: {
      "Productivity Commission, Mutual Recognition Schemes": link(
        "官方报告",
        "https://www.pc.gov.au/inquiries/completed/mutual-recognition-schemes/report"
      ),
      "Canadian Free Trade Agreement Annual Reports": link(
        "官方报告",
        "https://www.cfta-alec.ca/report-category/annual-report"
      ),
      "Nordic Council of Ministers, Legislative Cooperation Materials": link(
        "官方说明",
        "https://www.norden.org/en/information/about-nordic-council-ministers"
      ),
      "ASEAN Economic Community Blueprint 2025": link(
        "官方PDF",
        "https://asean.org/wp-content/uploads/2021/08/AEC-Blueprint-2025.pdf"
      )
    },
    rules: {
      "Australian Mutual Recognition Act 1992": link(
        "官方文本",
        "https://www.legislation.gov.au/C2004A04489/latest"
      ),
      "Trans-Tasman Mutual Recognition Arrangement / Act": link(
        "官方文本",
        "https://www.legislation.govt.nz/act/public/1997/0060/latest/DLM411282.html"
      ),
      "Canadian Free Trade Agreement 2017": link(
        "官方PDF",
        "https://www.cfta-alec.ca/wp-content/uploads/2017/06/CFTA-Consolidated-Text-Final-Print-Text-English.pdf"
      ),
      "Helsinki Treaty and Nordic Legislative Cooperation": link(
        "官方文本",
        "https://www.norden.org/sv/node/59563"
      ),
      "ASEAN Mutual Recognition Arrangements": link(
        "官方PDF",
        "https://asean.org/wp-content/uploads/2023/06/20150119180933.pdf"
      )
    },
    institutions: {
      "Australian and New Zealand Intergovernmental Forums": link(
        "官方说明",
        "https://federation.gov.au/australias-federal-relations-architecture"
      ),
      "Canadian Committee on Internal Trade / Secretariat": link(
        "官方说明",
        "https://www.cfta-alec.ca/committee-on-internal-trade-ministers-take-action-to-make-significant-progress-on-reducing-internal-trade-barriers"
      ),
      "Nordic Council and Nordic Council of Ministers": link(
        "机构官网",
        "https://www.norden.org/en/nordic-council"
      ),
      "ASEAN Secretariat and Sectoral MRAs Bodies": link(
        "机构官网",
        "https://asean.org/asean-secretariat/"
      )
    },
    cases: {
      "Cole v Whitfield": link(
        "判决文本",
        "https://www.austlii.edu.au/cgi-bin/viewdoc/au/cases/cth/HCA/1988/18.html"
      ),
      "Castlemaine Tooheys Ltd v South Australia": link(
        "判决文本",
        "https://www.austlii.edu.au/cgi-bin/viewdoc/au/cases/cth/HCA/1990/1.html"
      ),
      "R v Comeau": link(
        "判决文本",
        "https://scc-csc.lexum.com/scc-csc/scc-csc/en/item/17035/index.do"
      ),
      "ASEAN Professional Services MRAs Implementation": link(
        "官方资料",
        "https://asean.org/wp-content/uploads/2021/08/Handbook-on-liberalisation-of-proffesional-services-through-mutual-recognition-in-asean_Accountancy-services.pdf"
      )
    }
  }
};

function attachEntrySourceLinks(
  module: ComparativeLawBaseModule
): ComparativeLawLinkedModuleBase {
  const sourceLinks = COMPARATIVE_LAW_ENTRY_SOURCE_LINKS[module.id];

  if (!sourceLinks) {
    throw new Error(`Missing comparative law source links for ${module.id}`);
  }

  const withSourceLinks = (
    group: ComparativeLawEntryGroup,
    entries: ComparativeLawBaseEntry[]
  ): ComparativeLawEntry[] =>
    entries.map((entry) => {
      const sourceLink = sourceLinks[group][entry.title];

      if (!sourceLink) {
        throw new Error(`Missing comparative law source link for ${module.id}/${group}/${entry.title}`);
      }

      return {
        ...entry,
        ...sourceLink
      };
    });

  return {
    ...module,
    literature: withSourceLinks("literature", module.literature),
    rules: withSourceLinks("rules", module.rules),
    institutions: withSourceLinks("institutions", module.institutions),
    cases: withSourceLinks("cases", module.cases)
  };
}

function attachComparativeMethods(module: ComparativeLawBaseModule): ComparativeLawModule {
  const methods = COMPARATIVE_LAW_METHODS[module.id];

  if (!methods) {
    throw new Error(`Missing comparative law methods for ${module.id}`);
  }

  return {
    ...attachEntrySourceLinks(module),
    ...methods
  };
}

export const COMPARATIVE_LAW_MODULES: ComparativeLawModule[] =
  COMPARATIVE_LAW_MODULE_BASE.map(attachComparativeMethods);

export const COMPARATIVE_LAW_THEORY_BLOCKS = COMPARATIVE_LAW_MODULES.filter(
  (module) => module.section === "基础理论"
);

export const COMPARATIVE_LAW_EXPERIENCE_BLOCKS = COMPARATIVE_LAW_MODULES.filter(
  (module) => module.section === "域外经验"
);

export const COMPARATIVE_LAW_REQUIRED_TOPICS = COMPARATIVE_LAW_MODULES.map((module) => module.title);
