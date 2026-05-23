import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = path.join(root, "src", "content");
const force = process.argv.includes("--force");
let written = 0;
let skipped = 0;

function yamlValue(value) {
  if (Array.isArray(value)) {
    return `\n${value.map((item) => `  - ${JSON.stringify(item)}`).join("\n")}`;
  }

  return ` ${JSON.stringify(value)}`;
}

function toFrontmatter(data) {
  return `${Object.entries(data)
    .map(([key, value]) => `${key}:${yamlValue(value)}`)
    .join("\n")}\n`;
}

function writeEntry(collection, slug, data, body) {
  const directory = path.join(contentRoot, collection);
  fs.mkdirSync(directory, { recursive: true });
  const file = path.join(directory, `${slug}.md`);
  const markdown = `---\n${toFrontmatter(data)}---\n\n${body.trim()}\n`;
  if (fs.existsSync(file) && !force) {
    skipped += 1;
    return;
  }

  fs.writeFileSync(file, markdown, "utf8");
  written += 1;
}

const updated = "2026-05-23";

const topics = [
  {
    slug: "cross-border-dispute-resolution",
    data: {
      title: "跨境商事争议解决",
      summary: "研究粤港澳商事调解、仲裁、司法协助、域外法查明和裁判承认执行中的规则衔接。",
      priority: "第一期",
      regions: ["广东", "香港", "澳门", "前海", "横琴"],
      mechanisms: ["争议解决协同", "司法协助", "特别立法"],
      status: "已摘要",
      visibility: "评审",
      updated,
      lead: "课题组",
      tags: ["商事争议", "调解", "仲裁", "域外法查明"]
    },
    body: "## 研究问题\n\n跨境商事争议解决是规则衔接最集中的领域之一。第一期重点比较三地调解规则、仲裁接口、域外法查明机制和合作区特别规则。\n\n## 论文线索\n\n- 大湾区跨境商事调解规则统一的制度边界\n- 前海跨境商事法律规则衔接的可复制性\n- 域外法查明平台对涉港澳审判的支撑作用"
  },
  {
    slug: "gba-lawyers-practice",
    data: {
      title: "港澳律师在大湾区内地九市执业",
      summary: "研究港澳律师取得大湾区律师执业证书后的执业范围、监管协同、职业责任和法律服务市场开放。",
      priority: "第一期",
      regions: ["广东", "香港", "澳门"],
      mechanisms: ["授权试点", "互认", "跨境通办"],
      status: "已摘要",
      visibility: "评审",
      updated,
      lead: "课题组",
      tags: ["律师制度", "法律服务", "专业资格"]
    },
    body: "## 研究问题\n\n港澳律师便利执业既涉及资格准入，也涉及执业监管、业务边界和责任承担。该专题可作为专业服务开放的代表性样本。\n\n## 论文线索\n\n- 大湾区律师执业试点的法域接口设计\n- 港澳律师参与内地民商事法律事务的监管协同"
  },
  {
    slug: "data-cross-border",
    data: {
      title: "数据跨境流动与数据交易",
      summary: "研究数据跨境交易、数据接口、白名单和科研数据跨境使用的制度条件。",
      priority: "第一期",
      regions: ["广东", "香港", "澳门", "河套"],
      mechanisms: ["白名单", "数据接口", "监管沙盒"],
      status: "需专家确认",
      visibility: "内部",
      updated,
      lead: "课题组",
      tags: ["数据", "河套", "科研"]
    },
    body: "## 研究问题\n\n数据跨境流动直接触及三地数据治理、国家安全、个人信息保护和科技创新需求之间的平衡。第一期先从河套数据跨境交易案例入手。\n\n## 论文线索\n\n- 河套数据跨境交易试点的制度功能\n- 数据跨境白名单在大湾区的适用条件"
  },
  {
    slug: "finance-connect",
    data: {
      title: "金融互联互通与跨境理财",
      summary: "研究跨境理财通、绿色债券、地方政府债券和跨境支付结算中的规则连接。",
      priority: "第一期",
      regions: ["广东", "香港", "澳门", "深圳"],
      mechanisms: ["跨境支付与结算", "等效认可", "监管沙盒"],
      status: "已入库",
      visibility: "评审",
      updated,
      lead: "课题组",
      tags: ["金融", "债券", "理财通"]
    },
    body: "## 研究问题\n\n金融互联互通体现了市场开放、监管等效、风险隔离和投资者保护之间的制度协调。第一期先建立案例和法源索引。"
  },
  {
    slug: "medical-products-connect",
    data: {
      title: "港澳药械通与医疗规则衔接",
      summary: "研究港澳已上市药品和医疗器械在大湾区内地指定医疗机构使用的授权试点与监管协作。",
      priority: "第一期",
      regions: ["广东", "香港", "澳门"],
      mechanisms: ["授权试点", "监管沙盒", "备案"],
      status: "已摘要",
      visibility: "评审",
      updated,
      lead: "课题组",
      tags: ["医疗", "药品", "医疗器械"]
    },
    body: "## 研究问题\n\n港澳药械通以临床急需为入口，在审批准入、使用监管、风险控制和患者权益之间建立试点机制。\n\n## 论文线索\n\n- 港澳药械通的授权试点结构\n- 医疗规则衔接中的风险分配与监管合作"
  },
  {
    slug: "professional-qualification",
    data: {
      title: "专业资格互认",
      summary: "研究工程师、医疗、法律、建设等专业资格互认的制度路径和可复制边界。",
      priority: "第一期",
      regions: ["广东", "香港", "澳门", "珠海", "前海"],
      mechanisms: ["互认", "等效认可", "标准共建"],
      status: "已入库",
      visibility: "评审",
      updated,
      lead: "课题组",
      tags: ["专业资格", "人才", "互认"]
    },
    body: "## 研究问题\n\n专业资格互认是人员和服务要素跨境流动的关键条件。第一期重点比较资格评价标准、执业许可和持续监管机制。"
  }
];

const sources = [
  {
    slug: "development-plan",
    data: {
      title: "粤港澳大湾区发展规划纲要",
      issuer: "中共中央 国务院",
      date: "2019-02-18",
      level: "政策规划",
      regions: ["中央", "广东", "香港", "澳门"],
      topics: ["cross-border-dispute-resolution", "finance-connect", "professional-qualification"],
      materialType: "政策规划",
      tags: ["顶层规划", "一国两制", "大湾区"],
      summary: "大湾区建设的顶层规划文件，提出规则衔接、机制对接、市场一体化和国际科技创新中心等方向。",
      relationToRules: "为三地规则衔接提供总体目标和政策语境。",
      relationToMechanisms: "为跨境通办、专业资格互认、金融互联互通和平台建设提供政策基础。",
      originalUrl: "https://www.gov.cn/gongbao/content/2019/content_5370836.htm",
      citation: "《粤港澳大湾区发展规划纲要》，2019年2月18日。",
      status: "已核验",
      visibility: "公开",
      updated
    },
    body: "## 研究价值\n\n该文件是总报告的政策起点，应作为所有专题页的基础引用。"
  },
  {
    slug: "cases-batch-1",
    data: {
      title: "广东省推进粤港澳大湾区规则衔接机制对接典型案例（第一批）",
      issuer: "广东省大湾区办",
      date: "2023-04-06",
      level: "官方案例",
      regions: ["广东", "香港", "澳门"],
      topics: ["gba-lawyers-practice", "medical-products-connect", "professional-qualification", "cross-border-dispute-resolution"],
      materialType: "官方案例",
      tags: ["第一批", "20个案例"],
      summary: "第一批20个典型案例覆盖要素跨境流动、营商环境、民生融合、平台建设等领域。",
      relationToRules: "提供三地规则差异如何被标准、试点、授权和平台机制连接的实例。",
      relationToMechanisms: "集中体现互认、授权试点、跨境通办、司法协同等机制类型。",
      originalUrl: "https://www.cnbayarea.org.cn/policy/policyrelease/policies/content/post_1048576.html",
      attachmentUrl: "https://www.cnbayarea.org.cn/attachment/0/11/11245/1048608.pdf",
      citation: "广东省大湾区办：《广东省推进粤港澳大湾区规则衔接机制对接典型案例（第一批）》，2023年4月6日。",
      status: "已摘要",
      visibility: "公开",
      updated
    },
    body: "## 研究价值\n\n第一批案例适合作为网站案例库的基础样本，并支撑首批专题论文选题。"
  },
  {
    slug: "cases-batch-2",
    data: {
      title: "广东省推进粤港澳大湾区规则衔接机制对接典型案例（第二批）",
      issuer: "广东省大湾区办",
      date: "2024-05-13",
      level: "官方案例",
      regions: ["广东", "香港", "澳门"],
      topics: ["data-cross-border", "professional-qualification", "cross-border-dispute-resolution"],
      materialType: "官方案例",
      tags: ["第二批", "16个案例"],
      summary: "第二批16个典型案例覆盖要素跨境流动、民生融合、营商环境和重大平台建设。",
      relationToRules: "展示湾区认证、商事纠纷司法规则指引、河套数据跨境交易等规则衔接场景。",
      relationToMechanisms: "体现标准共建、司法协同、监管沙盒和平台试点。",
      originalUrl: "https://drc.gd.gov.cn/ywtz/content/post_4418565.html",
      attachmentUrl: "https://drc.gd.gov.cn/attachment/0/549/549298/4418565.pdf",
      citation: "广东省大湾区办：《广东省推进粤港澳大湾区规则衔接机制对接典型案例（第二批）》，2024年5月13日。",
      status: "已摘要",
      visibility: "公开",
      updated
    },
    body: "## 研究价值\n\n第二批案例应重点服务数据、认证、商事纠纷、平台建设等专题。"
  },
  {
    slug: "cases-batch-3",
    data: {
      title: "广东省推进粤港澳大湾区规则衔接机制对接典型案例（第三批）",
      issuer: "广东省大湾区办",
      date: "2025-01-23",
      level: "官方案例",
      regions: ["广东", "香港", "澳门"],
      topics: ["cross-border-dispute-resolution", "professional-qualification", "data-cross-border"],
      materialType: "官方案例",
      tags: ["第三批", "16个案例"],
      summary: "第三批16个典型案例扩展至商事调解、碳标签互认、公共交通、文体交流、公共服务和科研管理等场景。",
      relationToRules: "展示新领域的规则接口如何形成可操作安排。",
      relationToMechanisms: "体现统一规则、互认、标准共建、分线管理和科研管理衔接。",
      originalUrl: "https://drc.gd.gov.cn/ywtz/content/post_4655137.html",
      attachmentUrl: "https://drc.gd.gov.cn/attachment/0/570/570514/4655137.pdf",
      citation: "广东省大湾区办：《广东省推进粤港澳大湾区规则衔接机制对接典型案例（第三批）》，2025年1月23日。",
      status: "已摘要",
      visibility: "公开",
      updated
    },
    body: "## 研究价值\n\n第三批案例适合补充民生、产业、生态和重大平台建设的规则衔接材料。"
  }
];

const cases = [
  {
    slug: "gba-lawyers-practice-case",
    data: {
      title: "港澳律师实现在大湾区内地九市便利执业",
      batch: "第一批",
      sourceUrl: "https://www.cnbayarea.org.cn/attachment/0/11/11245/1048608.pdf",
      regions: ["广东", "香港", "澳门"],
      topics: ["gba-lawyers-practice"],
      mechanisms: ["授权试点", "互认"],
      legalBasis: "港澳律师在粤港澳大湾区内地九市执业试点相关规则。",
      innovation: "突破港澳律师不能办理内地法律事务的限制，允许取得大湾区律师执业证书的港澳律师从事一定范围内地法律实务。",
      effect: "促进港澳法律服务专业人士跨境便利执业，提升大湾区法律服务能级。",
      reproducibility: "可作为专业服务开放和资格衔接的样本。",
      risks: "执业范围、监管责任、职业保险和跨境纪律惩戒需要持续核验。",
      paperAngles: ["大湾区律师执业试点的法域接口", "港澳专业服务进入内地市场的监管协同"],
      relatedSources: ["cases-batch-1"],
      status: "已摘要",
      visibility: "评审",
      updated
    },
    body: "## 分析提示\n\n该案例适合放入法律服务专题，并与专业资格互认专题交叉引用。"
  },
  {
    slug: "medical-products-connect-case",
    data: {
      title: "港澳药械通助力健康湾区建设",
      batch: "第一批",
      sourceUrl: "https://www.cnbayarea.org.cn/attachment/0/11/11245/1048608.pdf",
      regions: ["广东", "香港", "澳门"],
      topics: ["medical-products-connect"],
      mechanisms: ["授权试点", "监管沙盒", "备案"],
      legalBasis: "国务院授权和广东省指定医疗机构使用临床急需进口药械的相关安排。",
      innovation: "允许符合条件医疗机构使用港澳已上市临床急需药品和医疗器械。",
      effect: "提升患者用药用械可及性，并推动医疗服务质量一体化。",
      reproducibility: "可作为医疗监管协作和授权试点制度研究样本。",
      risks: "审批边界、临床责任、进口品种监管和患者权益保护需要重点分析。",
      paperAngles: ["港澳药械通的授权试点结构", "跨境医疗监管协作的风险分配"],
      relatedSources: ["cases-batch-1"],
      status: "已摘要",
      visibility: "评审",
      updated
    },
    body: "## 分析提示\n\n该案例应与医疗药械规则、指定医疗机构制度和进口药械监管机制关联。"
  },
  {
    slug: "qianhai-commercial-legal-rules",
    data: {
      title: "前海创新跨境商事法律规则衔接机制对接",
      batch: "第一批",
      sourceUrl: "https://www.cnbayarea.org.cn/attachment/0/11/11245/1048608.pdf",
      regions: ["广东", "香港", "前海"],
      topics: ["cross-border-dispute-resolution"],
      mechanisms: ["特别立法", "争议解决协同", "司法协助"],
      legalBasis: "前海合作区跨境商事法律规则创新相关制度。",
      innovation: "围绕跨境商事法律服务和争议解决建立平台化、规则化衔接机制。",
      effect: "增强前海在涉港商事法律服务中的制度供给能力。",
      reproducibility: "适合比较横琴、南沙、河套等平台法治创新路径。",
      risks: "特别规则的适用边界、管辖接口和可复制性需要专家确认。",
      paperAngles: ["前海跨境商事法律规则衔接的制度模型", "合作区法治创新的授权边界"],
      relatedSources: ["cases-batch-1"],
      status: "需专家确认",
      visibility: "内部",
      updated
    },
    body: "## 分析提示\n\n该案例是跨境商事争议专题的核心平台案例。"
  },
  {
    slug: "bay-area-certification",
    data: {
      title: "湾区认证推动三地质量认证规则衔接",
      batch: "第二批",
      sourceUrl: "https://drc.gd.gov.cn/attachment/0/549/549298/4418565.pdf",
      regions: ["广东", "香港", "澳门"],
      topics: ["professional-qualification"],
      mechanisms: ["标准共建", "互认", "等效认可"],
      legalBasis: "粤港澳三地认证机构共同制定和执行湾区认证规则。",
      innovation: "在湾区标准基础上形成一次认证、三地通用的自愿性认证机制。",
      effect: "推动质量认证从标准共建走向认证结果互信。",
      reproducibility: "适合扩展至食品、医疗、消费品和专业服务认证。",
      risks: "认证责任、市场准入效力和三地监管承认程度需要持续跟踪。",
      paperAngles: ["湾区认证的规则共建机制", "标准共建到结果互认的制度路径"],
      relatedSources: ["cases-batch-2"],
      status: "已摘要",
      visibility: "评审",
      updated
    },
    body: "## 分析提示\n\n该案例可服务标准认证专题，也可支撑专业资格互认的一般机制研究。"
  },
  {
    slug: "hetao-data-cross-border-trading",
    data: {
      title: "河套率先试点数据跨境交易",
      batch: "第二批",
      sourceUrl: "https://drc.gd.gov.cn/attachment/0/549/549298/4418565.pdf",
      regions: ["广东", "香港", "河套"],
      topics: ["data-cross-border"],
      mechanisms: ["数据接口", "监管沙盒", "白名单"],
      legalBasis: "河套深港科技创新合作区数据跨境流动和交易试点安排。",
      innovation: "以合作区为场景探索数据跨境交易机制。",
      effect: "服务科研创新和数字经济要素跨境配置。",
      reproducibility: "可作为数据跨境白名单、科研数据流动和监管沙盒研究样本。",
      risks: "数据安全、个人信息保护、重要数据识别和跨境合规责任需要专家确认。",
      paperAngles: ["河套数据跨境交易的制度功能", "大湾区数据跨境白名单机制的边界"],
      relatedSources: ["cases-batch-2"],
      status: "需专家确认",
      visibility: "内部",
      updated
    },
    body: "## 分析提示\n\n该案例需要后续补充国家数据跨境流动规则、香港数据治理规则和河套专项政策。"
  },
  {
    slug: "commercial-mediation-unification",
    data: {
      title: "大湾区商事调解规则机制实现三统一一保障",
      batch: "第三批",
      sourceUrl: "https://drc.gd.gov.cn/attachment/0/570/570514/4655137.pdf",
      regions: ["广东", "香港", "澳门"],
      topics: ["cross-border-dispute-resolution"],
      mechanisms: ["争议解决协同", "标准共建", "特别立法"],
      legalBasis: "粤港澳大湾区跨境争议调解示范规则、调解员资格资历评审标准和相关地方立法安排。",
      innovation: "统一调解示范规则、统一调解员资格资历、统一合作平台，并通过地方立法强化保障。",
      effect: "推动跨境商事调解专业化和平台化。",
      reproducibility: "可作为非诉争议解决机制对接的代表性案例。",
      risks: "调解协议效力、调解员监管和三地平台协同需要进一步核验。",
      paperAngles: ["跨境商事调解规则统一的制度边界", "大湾区调解员资格互认与职业伦理"],
      relatedSources: ["cases-batch-3"],
      status: "已摘要",
      visibility: "评审",
      updated
    },
    body: "## 分析提示\n\n该案例应与跨境商事争议解决专题和三法域规则对照表直接关联。"
  }
];

const comparisons = [
  {
    slug: "gba-lawyers-practice",
    data: {
      title: "港澳律师执业规则对照",
      topics: ["gba-lawyers-practice"],
      regions: ["广东", "香港", "澳门"],
      mechanisms: ["授权试点", "互认"],
      keyQuestions: ["执业范围如何划定", "监管责任如何分配", "职业保险如何衔接"],
      relatedSources: ["cases-batch-1"],
      status: "需专家确认",
      visibility: "内部",
      updated
    },
    body: "| 事项 | 内地规则 | 香港规则 | 澳门规则 | 主要差异 | 已有机制 | 待核验问题 |\n| --- | --- | --- | --- | --- | --- | --- |\n| 执业准入 | 通过试点考试和培训后申领大湾区律师执业证 | 以香港律师专业资格和本地执业监管为基础 | 以澳门律师专业资格和本地执业监管为基础 | 法域、资格体系和监管机关不同 | 授权试点 | 执业范围和纪律处分衔接 |\n| 业务范围 | 限定办理一定范围内地法律事务 | 主要适用香港法律服务市场规则 | 主要适用澳门法律服务市场规则 | 可办理事项边界不同 | 执业证书制度 | 跨境责任保险安排 |"
  },
  {
    slug: "commercial-dispute-resolution",
    data: {
      title: "跨境商事争议解决规则对照",
      topics: ["cross-border-dispute-resolution"],
      regions: ["广东", "香港", "澳门", "前海", "横琴"],
      mechanisms: ["争议解决协同", "司法协助", "特别立法"],
      keyQuestions: ["调解规则能否统一", "仲裁与司法如何衔接", "域外法查明如何标准化"],
      relatedSources: ["cases-batch-1", "cases-batch-3"],
      status: "需专家确认",
      visibility: "内部",
      updated
    },
    body: "| 事项 | 内地规则 | 香港规则 | 澳门规则 | 主要差异 | 已有机制 | 待核验问题 |\n| --- | --- | --- | --- | --- | --- | --- |\n| 商事调解 | 以人民调解、商事调解和地方立法探索为基础 | 以普通法背景下的调解实践和机构规则为基础 | 以澳门本地法律与机构规则为基础 | 调解员资质、程序和协议效力存在差异 | 跨境争议调解示范规则 | 调解协议执行接口 |\n| 域外法查明 | 法院可通过平台和专家机制查明域外法 | 香港法需作为域外法查明进入内地审判 | 澳门法需作为域外法查明进入内地审判 | 查明责任和证明标准不同 | 域外法查明平台 | 证据标准和专家意见采信 |"
  },
  {
    slug: "data-cross-border",
    data: {
      title: "数据跨境流动规则对照",
      topics: ["data-cross-border"],
      regions: ["广东", "香港", "澳门", "河套"],
      mechanisms: ["白名单", "数据接口", "监管沙盒"],
      keyQuestions: ["科研数据如何跨境", "重要数据如何识别", "白名单是否可复制"],
      relatedSources: ["cases-batch-2"],
      status: "需专家确认",
      visibility: "内部",
      updated
    },
    body: "| 事项 | 内地规则 | 香港规则 | 澳门规则 | 主要差异 | 已有机制 | 待核验问题 |\n| --- | --- | --- | --- | --- | --- | --- |\n| 数据出境 | 受数据安全、个人信息保护和出境评估规则约束 | 以个人资料私隐保护和行业规则为基础 | 以澳门个人资料保护制度为基础 | 合规路径和监管重点不同 | 河套试点 | 试点适用数据类型 |\n| 科研数据 | 可在特定平台探索便利流动 | 科研机构具有国际合作需求 | 科研机构具有跨境合作需求 | 数据类型、主体资格和用途控制不同 | 监管沙盒 | 安全评估和责任分配 |"
  },
  {
    slug: "medical-products-connect",
    data: {
      title: "港澳药械通规则对照",
      topics: ["medical-products-connect"],
      regions: ["广东", "香港", "澳门"],
      mechanisms: ["授权试点", "监管沙盒", "备案"],
      keyQuestions: ["临床急需如何认定", "使用责任如何分配", "监管信息如何共享"],
      relatedSources: ["cases-batch-1"],
      status: "需专家确认",
      visibility: "内部",
      updated
    },
    body: "| 事项 | 内地规则 | 香港规则 | 澳门规则 | 主要差异 | 已有机制 | 待核验问题 |\n| --- | --- | --- | --- | --- | --- | --- |\n| 药械准入 | 内地药品和医疗器械注册审批为基础 | 已上市药品和公立医院采购使用器械可成为试点来源 | 已上市药品和采购使用器械可成为试点来源 | 上市审批和临床使用条件不同 | 港澳药械通 | 临床急需标准 |\n| 使用监管 | 指定医疗机构和全过程监管 | 来源地上市和使用信息支撑 | 来源地上市和使用信息支撑 | 监管链条跨法域 | 授权试点 | 不良反应信息共享 |"
  }
];

const outputs = [
  {
    slug: "general-report-outline",
    data: {
      title: "深度研究总报告目录草案",
      outputType: "深度研究总报告",
      authors: ["课题组"],
      summary: "围绕政策基础、规则差异、机制类型、专题场景、典型案例和制度建议展开。",
      keywords: ["规则衔接", "机制对接", "法制一体化"],
      topics: ["cross-border-dispute-resolution", "gba-lawyers-practice", "data-cross-border", "finance-connect"],
      relatedCases: ["commercial-mediation-unification", "gba-lawyers-practice-case", "hetao-data-cross-border-trading"],
      relatedSources: ["development-plan", "cases-batch-1", "cases-batch-2", "cases-batch-3"],
      status: "提纲中",
      visibility: "内部",
      version: "0.1",
      updated
    },
    body: "## 目录草案\n\n1. 大湾区法制一体化的问题意识\n2. 规则衔接与机制对接的制度类型\n3. 三法域规则差异和接口\n4. 重点专题分析\n5. 典型案例评估\n6. 制度建议"
  },
  {
    slug: "paper-topic-list",
    data: {
      title: "专题论文选题清单",
      outputType: "专题书目",
      authors: ["课题组"],
      summary: "将案例库和专题页转化为可写作的论文题目。",
      keywords: ["论文选题", "专题研究", "案例分析"],
      topics: ["cross-border-dispute-resolution", "gba-lawyers-practice", "medical-products-connect", "data-cross-border"],
      relatedCases: ["commercial-mediation-unification", "medical-products-connect-case", "qianhai-commercial-legal-rules"],
      relatedSources: ["cases-batch-1", "cases-batch-2", "cases-batch-3"],
      status: "选题中",
      visibility: "评审",
      version: "0.1",
      updated
    },
    body: "## 第一批论文选题\n\n- 大湾区跨境商事调解规则统一的制度边界\n- 港澳律师在内地九市执业的监管协同\n- 港澳药械通授权试点的风险治理\n- 河套数据跨境交易试点的制度功能"
  }
];

for (const entry of topics) writeEntry("topics", entry.slug, entry.data, entry.body);
for (const entry of sources) writeEntry("sources", entry.slug, entry.data, entry.body);
for (const entry of cases) writeEntry("cases", entry.slug, entry.data, entry.body);
for (const entry of comparisons) writeEntry("comparisons", entry.slug, entry.data, entry.body);
for (const entry of outputs) writeEntry("outputs", entry.slug, entry.data, entry.body);

console.log(`Seeded research portal content. Written: ${written}. Skipped existing: ${skipped}.`);
