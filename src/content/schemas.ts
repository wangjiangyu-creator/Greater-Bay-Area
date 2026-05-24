import { z } from "astro/zod";
import {
  MATERIAL_TYPES,
  SOURCE_CATEGORIES,
  MECHANISMS,
  REGIONS,
  STATUS_VALUES,
  VISIBILITY_VALUES
} from "../lib/taxonomy";

const regionSchema = z.enum(REGIONS);
const mechanismSchema = z.enum(MECHANISMS);
const materialTypeSchema = z.enum(MATERIAL_TYPES);
const sourceCategorySchema = z.enum(SOURCE_CATEGORIES);
const statusSchema = z.enum(STATUS_VALUES);
const visibilitySchema = z.enum(VISIBILITY_VALUES);

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const requiredSlugList = z.array(slugSchema).min(1);
const optionalStringList = z.array(z.string().min(1)).default([]);
const requiredStringList = z.array(z.string().min(1)).min(1);
const updatedDate = z.coerce.date();
const localPathSchema = z.string().regex(/^\/[^\\s]+$/);
const absoluteOrLocalUrl = z.union([z.string().url(), localPathSchema]);

export const topicSchema = z.object({
  title: z.string().min(2),
  summary: z.string().min(10),
  priority: z.enum(["第一期", "第二期"]),
  regions: z.array(regionSchema).min(1),
  mechanisms: z.array(mechanismSchema).min(1),
  status: statusSchema,
  visibility: visibilitySchema,
  updated: updatedDate,
  lead: z.string().min(2),
  tags: optionalStringList
});

export const sourceSchema = z.object({
  title: z.string().min(2),
  issuer: z.string().min(2),
  date: updatedDate,
  effectiveDate: updatedDate.optional(),
  level: z.string().min(2),
  regions: z.array(regionSchema).min(1),
  topics: requiredSlugList,
  materialType: materialTypeSchema,
  sourceCategory: sourceCategorySchema,
  tags: optionalStringList,
  summary: z.string().min(10),
  relationToRules: z.string().min(6),
  relationToMechanisms: z.string().min(6),
  originalUrl: z.string().url(),
  attachmentUrl: absoluteOrLocalUrl.optional(),
  englishUrls: z.array(z.string().url()).optional(),
  citation: z.string().min(4),
  status: statusSchema,
  visibility: visibilitySchema,
  updated: updatedDate
});

export const caseSchema = z.object({
  title: z.string().min(2),
  batch: z.string().min(2),
  sourceUrl: z.string().url(),
  regions: z.array(regionSchema).min(1),
  topics: requiredSlugList,
  mechanisms: z.array(mechanismSchema).min(1),
  legalBasis: z.string().min(4),
  innovation: z.string().min(8),
  effect: z.string().min(8),
  reproducibility: z.string().min(8),
  risks: z.string().min(8),
  paperAngles: requiredStringList,
  relatedSources: requiredSlugList,
  status: statusSchema,
  visibility: visibilitySchema,
  updated: updatedDate
});

export const comparisonSchema = z.object({
  title: z.string().min(2),
  topics: requiredSlugList,
  regions: z.array(regionSchema).min(2),
  mechanisms: z.array(mechanismSchema).min(1),
  keyQuestions: requiredStringList,
  relatedSources: requiredSlugList,
  status: statusSchema,
  visibility: visibilitySchema,
  updated: updatedDate
});

export const outputSchema = z.object({
  title: z.string().min(2),
  outputType: z.enum([
    "智库报告",
    "深度研究总报告",
    "专著",
    "书章",
    "期刊文章",
    "专题论文",
    "工作论文",
    "政策简报",
    "会议纪要",
    "访谈摘要",
    "文献综述",
    "专题书目",
    "媒体评论",
    "博客评论"
  ]),
  authors: requiredStringList,
  summary: z.string().min(8),
  keywords: optionalStringList,
  language: z.enum(["中文", "英文"]).optional(),
  publisher: z.string().default("待补充（待核验）"),
  publicationYear: z.string().default("待补充（待核验）"),
  topics: requiredSlugList,
  relatedCases: requiredSlugList,
  relatedSources: requiredSlugList,
  status: z.enum(["选题中", "资料收集中", "提纲中", "初稿中", "修改中", "已定稿", "已发表或已提交"]),
  visibility: visibilitySchema,
  version: z.string().min(1),
  originalLinks: z.array(z.object({
    label: z.string().min(2),
    url: z.string().url()
  })).default([]),
  downloadUrl: z.string().url(),
  updated: updatedDate
});
