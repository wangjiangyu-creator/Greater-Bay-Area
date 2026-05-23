import { describe, expect, it } from "vitest";
import {
  caseSchema,
  comparisonSchema,
  outputSchema,
  sourceSchema,
  topicSchema
} from "../src/content/schemas";

describe("content schemas", () => {
  it("accepts a valid topic", () => {
    const parsed = topicSchema.parse({
      title: "跨境商事争议解决",
      summary: "围绕商事调解、仲裁、司法协助和域外法查明的规则衔接。",
      priority: "第一期",
      regions: ["广东", "香港", "澳门"],
      mechanisms: ["争议解决协同", "司法协助"],
      status: "已摘要",
      visibility: "评审",
      updated: "2026-05-23",
      lead: "课题组",
      tags: ["商事争议", "调解"]
    });

    expect(parsed.updated).toBeInstanceOf(Date);
  });

  it("rejects an invalid source status", () => {
    expect(() =>
      sourceSchema.parse({
        title: "测试资料",
        issuer: "测试机关",
        date: "2026-05-23",
        level: "政策规划",
        regions: ["广东"],
        topics: ["cross-border-dispute-resolution"],
        materialType: "政策规划",
        tags: ["测试"],
        summary: "测试摘要",
        relationToRules: "测试规则衔接关系",
        relationToMechanisms: "测试机制对接关系",
        originalUrl: "https://example.org",
        citation: "测试引用",
        status: "完成",
        visibility: "评审",
        updated: "2026-05-23"
      })
    ).toThrow();
  });

  it("accepts valid case, comparison, and output records", () => {
    expect(
      caseSchema.parse({
        title: "港澳律师实现在大湾区内地九市便利执业",
        batch: "第一批",
        sourceUrl: "https://example.org/case.pdf",
        regions: ["广东", "香港", "澳门"],
        topics: ["gba-lawyers-practice"],
        mechanisms: ["授权试点"],
        legalBasis: "大湾区律师执业试点相关规则",
        innovation: "允许符合条件的港澳律师办理一定范围内地法律事务。",
        effect: "促进法律服务要素流动。",
        reproducibility: "适合扩展至其他专业服务领域。",
        risks: "执业范围、责任承担和监管协同需要持续核验。",
        paperAngles: ["港澳律师执业试点的制度逻辑"],
        relatedSources: ["cases-batch-1"],
        status: "已摘要",
        visibility: "评审",
        updated: "2026-05-23"
      }).title
    ).toBe("港澳律师实现在大湾区内地九市便利执业");

    expect(
      comparisonSchema.parse({
        title: "港澳律师执业规则对照",
        topics: ["gba-lawyers-practice"],
        regions: ["广东", "香港", "澳门"],
        mechanisms: ["授权试点", "互认"],
        keyQuestions: ["执业范围如何界定"],
        relatedSources: ["cases-batch-1"],
        status: "需专家确认",
        visibility: "内部",
        updated: "2026-05-23"
      }).keyQuestions
    ).toHaveLength(1);

    expect(
      outputSchema.parse({
        title: "总报告目录",
        outputType: "深度研究总报告",
        authors: ["课题组"],
        summary: "总报告结构草案。",
        keywords: ["规则衔接", "机制对接"],
        topics: ["cross-border-dispute-resolution"],
        relatedCases: ["gba-lawyers-practice-case"],
        relatedSources: ["development-plan"],
        status: "提纲中",
        visibility: "内部",
        version: "0.1",
        updated: "2026-05-23"
      }).version
    ).toBe("0.1");
  });
});
