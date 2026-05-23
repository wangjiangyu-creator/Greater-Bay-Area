export const REGIONS = [
  "中央",
  "广东",
  "香港",
  "澳门",
  "广州",
  "深圳",
  "珠海",
  "佛山",
  "惠州",
  "东莞",
  "中山",
  "江门",
  "肇庆",
  "前海",
  "横琴",
  "南沙",
  "河套"
] as const;

export const MECHANISMS = [
  "互认",
  "等效认可",
  "备案",
  "白名单",
  "负面清单",
  "授权试点",
  "特别立法",
  "跨境通办",
  "标准共建",
  "司法协助",
  "监管沙盒",
  "数据接口",
  "联合执法",
  "跨境支付与结算",
  "争议解决协同"
] as const;

export const MATERIAL_TYPES = [
  "法律",
  "行政法规",
  "地方性法规",
  "规章",
  "规范性文件",
  "政策规划",
  "司法文件",
  "监管规则",
  "合作协议",
  "行业标准",
  "官方案例",
  "学术文献",
  "实务报告"
] as const;

export const STATUS_VALUES = [
  "未处理",
  "已入库",
  "已摘要",
  "已核验",
  "已关联专题",
  "已用于报告",
  "已用于论文",
  "需补充来源",
  "需专家确认"
] as const;

export const VISIBILITY_VALUES = ["公开", "评审", "内部"] as const;

export type Region = (typeof REGIONS)[number];
export type Mechanism = (typeof MECHANISMS)[number];
export type MaterialType = (typeof MATERIAL_TYPES)[number];
export type ResearchStatus = (typeof STATUS_VALUES)[number];
export type Visibility = (typeof VISIBILITY_VALUES)[number];

export function uniqueValues<T extends readonly string[]>(values: T): string[] {
  return Array.from(new Set(values));
}

export function hasKnownValue<T extends readonly string[]>(values: T, value: string): value is T[number] {
  return values.includes(value as T[number]);
}
