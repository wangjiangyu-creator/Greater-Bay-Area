import { z } from "zod";
import {
  MATERIAL_TYPES,
  MECHANISMS,
  REGIONS,
  STATUS_VALUES,
  VISIBILITY_VALUES
} from "../lib/taxonomy";

const regionSchema = z.enum(REGIONS);
const mechanismSchema = z.enum(MECHANISMS);
const materialTypeSchema = z.enum(MATERIAL_TYPES);
const statusSchema = z.enum(STATUS_VALUES);
const visibilitySchema = z.enum(VISIBILITY_VALUES);

const slugList = z.array(z.string().min(2)).default([]);
const stringList = z.array(z.string().min(1)).default([]);
const updatedDate = z.coerce.date();

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
  tags: stringList
});

export const sourceSchema = z.object({
  title: z.string().min(2),
  issuer: z.string().min(2),
  date: updatedDate,
  effectiveDate: updatedDate.optional(),
  level: z.string().min(2),
  regions: z.array(regionSchema).min(1),
  topics: slugList,
  materialType: materialTypeSchema,
  tags: stringList,
  summary: z.string().min(10),
  relationToRules: z.string().min(6),
  relationToMechanisms: z.string().min(6),
  originalUrl: z.string().url(),
  attachmentUrl: z.string().url().optional(),
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
  topics: slugList,
  mechanisms: z.array(mechanismSchema).min(1),
  legalBasis: z.string().min(4),
  innovation: z.string().min(8),
  effect: z.string().min(8),
  reproducibility: z.string().min(8),
  risks: z.string().min(8),
  paperAngles: stringList,
  relatedSources: slugList,
  status: statusSchema,
  visibility: visibilitySchema,
  updated: updatedDate
});

export const comparisonSchema = z.object({
  title: z.string().min(2),
  topics: slugList,
  regions: z.array(regionSchema).min(2),
  mechanisms: z.array(mechanismSchema).min(1),
  keyQuestions: stringList,
  relatedSources: slugList,
  status: statusSchema,
  visibility: visibilitySchema,
  updated: updatedDate
});

export const outputSchema = z.object({
  title: z.string().min(2),
  outputType: z.enum([
    "深度研究总报告",
    "专题论文",
    "工作论文",
    "政策简报",
    "会议纪要",
    "访谈摘要",
    "文献综述",
    "专题书目"
  ]),
  authors: stringList,
  summary: z.string().min(8),
  keywords: stringList,
  topics: slugList,
  relatedCases: slugList,
  relatedSources: slugList,
  status: z.enum(["选题中", "资料收集中", "提纲中", "初稿中", "修改中", "已定稿", "已发表或已提交"]),
  visibility: visibilitySchema,
  version: z.string().min(1),
  downloadUrl: z.string().url().optional(),
  updated: updatedDate
});
