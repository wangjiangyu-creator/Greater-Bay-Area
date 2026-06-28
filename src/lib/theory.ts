type TheoryLiterature = {
  title: string;
  authors: string;
  year: string;
  sourceLabel: string;
  sourceHref: string;
  note: string;
};

type TheoryFramework = {
  id: string;
  title: string;
  field: "经济一体化" | "法律一体化" | "跨域治理";
  school: string;
  coreClaim: string;
  framework: string[];
  representativeLiterature: TheoryLiterature[];
  gbaUse: string;
  caution: string;
  researchQuestions: string[];
};

export const THEORY_FRAMEWORKS: TheoryFramework[] = [
  {
    id: "stages-customs-union",
    title: "经济一体化阶段论与关税同盟理论",
    field: "经济一体化",
    school: "阶段论 / 关税同盟理论 / 市场整合理论",
    coreClaim:
      "经济一体化可以从贸易便利化逐级推进到共同市场、经济联盟乃至制度联盟；每一阶段需要处理不同的市场壁垒和公共政策协调成本。",
    framework: [
      "从自由贸易区、关税同盟、共同市场、经济联盟到完全经济一体化，观察规则衔接深度。",
      "用贸易创造、贸易转移和规模经济解释一体化收益与分配后果。",
      "区分边境措施、境内监管壁垒、要素流动壁垒和宏观政策协调。"
    ],
    representativeLiterature: [
      {
        title: "The Theory of Economic Integration",
        authors: "Bela Balassa",
        year: "1961",
        sourceLabel: "Google Books",
        sourceHref:
          "https://books.google.com/books/about/The_Theory_of_Economic_Integration_Routl.html?id=mUmRLOFDW5EC",
        note: "提出经济一体化层级分析，是解释大湾区从便利化走向共同市场规则衔接的经典入口。"
      },
      {
        title: "The Customs Union Issue",
        authors: "Jacob Viner",
        year: "1950",
        sourceLabel: "Internet Archive",
        sourceHref: "https://archive.org/details/customsunionissu0000vine",
        note: "以贸易创造和贸易转移分析关税同盟效果，适合提醒研究者关注规则融合的分配影响。"
      },
      {
        title: "International Economic Integration",
        authors: "Jan Tinbergen",
        year: "1954",
        sourceLabel: "WorldCat",
        sourceHref: "https://search.worldcat.org/title/224920",
        note: "可作为负向整合与正向整合区分的早期理论背景。"
      }
    ],
    gbaUse:
      "可把大湾区政策拆成货物、服务、人员、资本、数据和公共服务六类要素流动，再判断各领域处于便利化、互认、标准共建还是更深层制度协调阶段。",
    caution:
      "阶段论容易暗示单一路径，但大湾区并非主权国家联盟，制度推进常常是专题式、平台式和授权试点式的非线性过程。",
    researchQuestions: [
      "哪些领域只需要程序便利化，哪些领域必须发展共同标准或监管互认？",
      "规则衔接产生的收益和成本在三地、城市和行业之间如何分配？",
      "大湾区是否存在类似共同市场的最低制度条件？"
    ]
  },
  {
    id: "regional-integration-politics",
    title: "区域一体化政治经济学",
    field: "经济一体化",
    school: "新功能主义 / 政府间主义 / 区域制度供给",
    coreClaim:
      "区域一体化不是单纯技术问题，也取决于利益集团、政府偏好、跨境外溢、制度企业家和危机应对能力。",
    framework: [
      "新功能主义强调功能外溢、制度外溢和政治外溢。",
      "自由政府间主义强调国内偏好形成、政府间谈判和制度选择。",
      "区域制度供给理论强调市场需求和政治供给同时存在时，一体化机构才更稳定。"
    ],
    representativeLiterature: [
      {
        title: "The Uniting of Europe",
        authors: "Ernst B. Haas",
        year: "1958",
        sourceLabel: "University of Notre Dame Press",
        sourceHref: "https://undpress.nd.edu/9780268043476/uniting-of-europe/",
        note: "新功能主义经典文本，适合解释低政治敏感领域如何外溢到更深制度合作。"
      },
      {
        title: "Preferences and Power in the European Community",
        authors: "Andrew Moravcsik",
        year: "1993",
        sourceLabel: "DOI",
        sourceHref: "https://doi.org/10.1111/j.1468-5965.1993.tb00477.x",
        note: "自由政府间主义代表论文，强调国家偏好和谈判权力。"
      },
      {
        title: "The Logic of Regional Integration",
        authors: "Walter Mattli",
        year: "1999",
        sourceLabel: "Cambridge University Press",
        sourceHref:
          "https://www.cambridge.org/core/books/logic-of-regional-integration/1001F7BE284C55D67F3B3F34E7D6F1F1",
        note: "把市场需求与制度供给结合起来解释区域一体化成败。"
      }
    ],
    gbaUse:
      "适合分析规则衔接为何常从口岸、专业资格、标准认证、数据平台等高频需求领域启动，再向争议解决、公共治理和绿色标准扩展。",
    caution:
      "欧盟理论不能直接搬到大湾区；大湾区更需要解释中央授权、地方试点、港澳制度差异和城市平台之间的复合关系。",
    researchQuestions: [
      "哪些跨境需求会产生制度外溢，推动新规则制定？",
      "规则融合是由市场主体推动、政府规划推动，还是危机和民生需求推动？",
      "前海、横琴、南沙、河套等平台在制度供给中分别扮演什么角色？"
    ]
  },
  {
    id: "institutional-economics",
    title: "新制度经济学与交易成本框架",
    field: "经济一体化",
    school: "制度经济学 / 交易成本 / 产权与合约治理",
    coreClaim:
      "市场一体化的关键不只是降低关税或通关时间，而是降低跨境交易中的信息成本、合规成本、执行成本和不确定性。",
    framework: [
      "把法律制度视为降低交易成本、稳定预期和保护产权的基础设施。",
      "区分正式规则、非正式约束和执行机制。",
      "用合约治理、监管可信度和司法执行解释企业是否实际使用规则。"
    ],
    representativeLiterature: [
      {
        title: "Institutions, Institutional Change and Economic Performance",
        authors: "Douglass C. North",
        year: "1990",
        sourceLabel: "Cambridge University Press",
        sourceHref:
          "https://www.cambridge.org/core/books/institutions-institutional-change-and-economic-performance/AAE1E27DF8996E24C5DD07EB79BBA7EE",
        note: "解释制度如何塑造经济绩效，是把规则衔接写成制度成本问题的基础文献。"
      },
      {
        title: "The Economic Institutions of Capitalism",
        authors: "Oliver E. Williamson",
        year: "1985",
        sourceLabel: "Google Books",
        sourceHref:
          "https://books.google.com/books/about/The_Economic_Institutions_of_Capitalism.html?id=YDIoAQAAMAAJ",
        note: "以交易成本和治理结构解释制度安排选择。"
      },
      {
        title: "The Nature of the Firm",
        authors: "R. H. Coase",
        year: "1937",
        sourceLabel: "Economica DOI",
        sourceHref: "https://doi.org/10.1111/j.1468-0335.1937.tb00002.x",
        note: "交易成本理论源头之一，可用于解释跨境经营组织形式和制度边界。"
      }
    ],
    gbaUse:
      "可把港车北上、数据出境负面清单、港资港仲裁、专业资格备案等机制转化为可比较的成本降低工具。",
    caution:
      "交易成本语言容易忽略基本权利、公共安全和法治正当性；高效率规则并不当然等于好规则。",
    researchQuestions: [
      "某项机制实际降低了哪一类成本：搜索、审批、合规、执行还是救济成本？",
      "企业是否因为规则明确而改变合同设计、仲裁地选择或数据流动安排？",
      "规则衔接中的成本是否转嫁给消费者、专业人士或监管机构？"
    ]
  },
  {
    id: "multi-level-experimentalist-governance",
    title: "多层级治理与实验主义治理",
    field: "跨域治理",
    school: "多层级治理 / 实验主义治理 / 网络监管",
    coreClaim:
      "复杂一体化通常由中央、地方、专业机构、行业组织和法院共同推进；规则不是一次性完成，而是在试点、评估、反馈和扩散中逐步成形。",
    framework: [
      "多层级治理关注中央、地方、跨境平台和非政府主体之间的权力分配。",
      "实验主义治理强调框架目标、地方试验、同行评估和周期性修订。",
      "网络监管关注监管者、法院、行业协会和专业共同体之间的信息共享。"
    ],
    representativeLiterature: [
      {
        title: "Multi-Level Governance and European Integration",
        authors: "Liesbet Hooghe and Gary Marks",
        year: "2001",
        sourceLabel: "Rowman & Littlefield",
        sourceHref:
          "https://rowman.com/ISBN/9780742510203/Multi-Level-Governance-and-European-Integration",
        note: "多层级治理代表著作，适合分析中央、地方和跨境平台之间的制度分工。"
      },
      {
        title: "The Joint-Decision Trap",
        authors: "Fritz W. Scharpf",
        year: "1988",
        sourceLabel: "DOI",
        sourceHref: "https://doi.org/10.1111/j.1467-9299.1988.tb00694.x",
        note: "说明多层级共同决策可能带来僵局，适合分析规则衔接的协调成本。"
      },
      {
        title: "Learning from Difference",
        authors: "Charles F. Sabel and Jonathan Zeitlin",
        year: "2008",
        sourceLabel: "Columbia Law Scholarship",
        sourceHref: "https://scholarship.law.columbia.edu/faculty_scholarship/1526/",
        note: "实验主义治理代表论文，强调从差异中学习和持续修正规则。"
      }
    ],
    gbaUse:
      "适合解释前海、横琴、南沙、河套为何以试点平台形式承接不同规则融合任务，并通过案例批次、指引、清单和年度评估扩散。",
    caution:
      "试点扩散需要可验证指标和纠错机制，否则容易停留在经验展示而非制度沉淀。",
    researchQuestions: [
      "哪些试点已经从个案便利化升级为可复制规则？",
      "三地监管机构之间是否形成稳定的数据、会议和解释接口？",
      "典型案例批次能否转化为规则修订、标准制定或司法实践？"
    ]
  },
  {
    id: "legal-harmonisation-unification",
    title: "法律统一、协调与示范法路径",
    field: "法律一体化",
    school: "统一法 / 法律协调 / 示范法 / 软法原则",
    coreClaim:
      "法律一体化可以通过统一法、最低协调、示范法、共同原则和非强制性指引等不同强度工具实现，不必把所有领域都推向同一规则文本。",
    framework: [
      "统一法追求同一实体规则，适合交易高度标准化领域。",
      "法律协调追求结果趋同，保留本地制度表达空间。",
      "示范法和共同原则通过自愿采纳、合同选择、仲裁援引和立法参照发挥作用。"
    ],
    representativeLiterature: [
      {
        title: "Towards a European Civil Code",
        authors: "Arthur Hartkamp et al. (eds.)",
        year: "2011",
        sourceLabel: "LGDJ",
        sourceHref: "https://www.lgdj.fr/towards-a-european-civil-code-9789041133571.html",
        note: "欧洲私法协调讨论的代表性文集，可用于比较大湾区私法示范规则的可能性。"
      },
      {
        title: "An International Restatement of Contract Law",
        authors: "Michael Joachim Bonell",
        year: "2005",
        sourceLabel: "Google Books",
        sourceHref:
          "https://books.google.com/books/about/An_International_Restatement_of_Contract.html?id=OKrT4xyu6_cC",
        note: "以UNIDROIT原则为中心讨论国际合同法协调。"
      },
      {
        title: "Towards a Model Sales Law in the Greater Bay Area",
        authors: "Hao Jiang (ed.)",
        year: "2024",
        sourceLabel: "Edward Elgar",
        sourceHref:
          "https://www.e-elgar.com/shop/usd/towards-a-model-sales-law-in-the-greater-bay-area-9781035317417.html",
        note: "直接把示范法和比较私法问题放入大湾区语境。"
      }
    ],
    gbaUse:
      "适合评估大湾区合同、电子交易、标准认证、跨境调解和数据规则是否应采用示范文本、共同原则或最低协调。",
    caution:
      "统一文本不能自动带来统一适用；法院解释、监管执行、专业共同体和案例库同样重要。",
    researchQuestions: [
      "哪些领域适合示范法，哪些领域只适合共同指引或操作手册？",
      "共同规则是否需要官方评注、案例摘要和跨境培训支持？",
      "法律协调应以实体规则、程序接口还是证据和执行机制为优先？"
    ]
  },
  {
    id: "mutual-recognition-regulatory-competition",
    title: "相互承认、等效认可与监管竞争",
    field: "法律一体化",
    school: "互认理论 / 等效监管 / 监管竞争",
    coreClaim:
      "在制度差异难以完全消除时，可通过相互承认、等效认可和监管采信降低重复审批，同时保留公共政策例外和监管底线。",
    framework: [
      "互认要求一方法域承认另一法域的许可、资格、标准或监管结果。",
      "等效认可强调监管目标和保护水平相当，而不是规则文本完全相同。",
      "监管竞争关注主体是否利用不同制度选择更有利的法域或规则。"
    ],
    representativeLiterature: [
      {
        title: "Cassis de Dijon, Case 120/78",
        authors: "Court of Justice of the European Union",
        year: "1979",
        sourceLabel: "CURIA",
        sourceHref: "https://curia.europa.eu/juris/liste.jsf?num=120/78",
        note: "互认原则经典判例，是理解市场一体化中监管差异处理方式的核心材料。"
      },
      {
        title: "The Principle of Mutual Recognition in the European Integration Process",
        authors: "Kalypso Nicolaidis and Gregory Shaffer",
        year: "2005",
        sourceLabel: "DOI",
        sourceHref: "https://doi.org/10.1111/j.1468-0386.2005.00254.x",
        note: "系统讨论互认的治理逻辑、民主风险和监管后果。"
      },
      {
        title: "Regulatory Competition in the Internal Market",
        authors: "Catherine Barnard and Simon Deakin",
        year: "2002",
        sourceLabel: "DOI",
        sourceHref: "https://doi.org/10.1111/1467-9930.00129",
        note: "适合分析规则选择、市场竞争和社会保护之间的张力。"
      }
    ],
    gbaUse:
      "可用于分析专业资格备案、湾区认证、一试多证、食品检验检疫采信、港车北上保险等机制的制度逻辑。",
    caution:
      "互认不是免监管；如果缺少最低标准、信息共享和责任追溯，互认可能变成监管套利。",
    researchQuestions: [
      "某项互认安排承认的是资格、许可、检测结果、监管程序还是责任保险？",
      "公共安全、消费者保护和个人信息保护例外如何设置？",
      "互认后发生争议时，由哪个法域或机构承担最终责任？"
    ]
  },
  {
    id: "legal-transplants-pluralism",
    title: "法律移植、法律文化与法律多元主义",
    field: "法律一体化",
    school: "法律移植 / 法律文化 / 法律多元主义",
    coreClaim:
      "法律规则跨法域流动时，移植的不只是条文；解释共同体、职业伦理、法院实践、行政资源和社会预期都会影响规则是否真正生效。",
    framework: [
      "法律移植理论强调规则可跨制度移动。",
      "法律文化批判提醒研究者关注文本背后的解释语境和制度嵌入。",
      "法律多元主义把多个法域、软法、行业规则和私人治理同时纳入分析。"
    ],
    representativeLiterature: [
      {
        title: "Legal Transplants: An Approach to Comparative Law",
        authors: "Alan Watson",
        year: "1974",
        sourceLabel: "Google Books",
        sourceHref: "https://books.google.com/books/about/Legal_Transplants.html?id=1JYtAQAAIAAJ",
        note: "法律移植理论代表作。"
      },
      {
        title: "The Impossibility of Legal Transplants",
        authors: "Pierre Legrand",
        year: "1997",
        sourceLabel: "DOI",
        sourceHref: "https://doi.org/10.1177/1023263X9700400202",
        note: "法律移植批判的代表文本，强调法律意义依附于文化和解释语境。"
      },
      {
        title: "Global Bukowina: Legal Pluralism in the World Society",
        authors: "Gunther Teubner",
        year: "1997",
        sourceLabel: "European University Institute",
        sourceHref: "https://cadmus.eui.eu/handle/1814/234",
        note: "全球法律多元主义代表材料，适合分析国家法、软法和行业规则共存。"
      }
    ],
    gbaUse:
      "适合解释香港法律、澳门规则、内地监管和行业标准进入同一交易或公共服务场景时，为什么需要解释接口、术语表和案例库。",
    caution:
      "过度强调法律文化差异可能低估制度学习和技术性规则协调的可能性。",
    researchQuestions: [
      "某项规则从香港或澳门经验进入内地试点时，哪些语义和执行条件发生变化？",
      "专业共同体是否形成跨法域共享的术语、案例和伦理标准？",
      "软法、行业标准和政府规范性文件如何共同塑造实际行为？"
    ]
  },
  {
    id: "transnational-legal-process",
    title: "跨国法律过程、司法对话与法治化整合",
    field: "法律一体化",
    school: "跨国法律过程 / 司法对话 / 法治化路径",
    coreClaim:
      "法律一体化不仅发生在立法层面，也通过解释、互动、内化、司法协助、仲裁执行、调解名册和专业网络逐步形成稳定预期。",
    framework: [
      "跨国法律过程强调规则通过互动、解释和内化进入国内制度。",
      "司法对话关注法院、仲裁机构和法律服务专业人士如何形成共同理解。",
      "法治化整合强调透明程序、可复核标准、权利保障和救济渠道。"
    ],
    representativeLiterature: [
      {
        title: "Transnational Legal Process",
        authors: "Harold Hongju Koh",
        year: "1996",
        sourceLabel: "Nebraska Law Review",
        sourceHref: "https://digitalcommons.unl.edu/nlr/vol75/iss1/4/",
        note: "跨国法律过程理论代表论文，适合分析规则如何通过互动和内化生效。"
      },
      {
        title: "A New World Order",
        authors: "Anne-Marie Slaughter",
        year: "2004",
        sourceLabel: "Princeton University Press",
        sourceHref: "https://press.princeton.edu/books/paperback/9780691123974/a-new-world-order",
        note: "以政府网络和司法网络解释跨境治理。"
      },
      {
        title: "The Constitution of Europe",
        authors: "Joseph H. H. Weiler",
        year: "1999",
        sourceLabel: "Google Books",
        sourceHref: "https://books.google.com/books/about/The_Constitution_of_Europe.html?id=jqvLqYTLWjQC",
        note: "从法治、司法和政治共同体角度理解欧洲法律整合。"
      }
    ],
    gbaUse:
      "可用于分析内地与香港判决承认执行、仲裁保全、香港国际商事法庭、调解员/仲裁员名册和港资港仲裁机制。",
    caution:
      "强调法律互动时，仍需追问普通企业和个人是否能实际获得可负担、可预期的救济。",
    researchQuestions: [
      "跨境司法协助是否已经形成稳定、可预期的使用路径？",
      "法院、仲裁机构和调解组织之间如何共享解释标准？",
      "规则衔接如何同时保障效率、程序正义和权利救济？"
    ]
  }
];

export const THEORY_REQUIRED_FRAMEWORKS = THEORY_FRAMEWORKS.map((framework) => framework.title);

export const THEORY_FIELD_COUNTS = THEORY_FRAMEWORKS.reduce(
  (counts, framework) => {
    counts[framework.field] = (counts[framework.field] || 0) + 1;
    return counts;
  },
  {} as Record<TheoryFramework["field"], number>
);
