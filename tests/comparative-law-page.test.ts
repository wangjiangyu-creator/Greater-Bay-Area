import { describe, expect, it } from "vitest";
import {
  COMPARATIVE_LAW_EXPERIENCE_BLOCKS,
  COMPARATIVE_LAW_REQUIRED_TOPICS,
  COMPARATIVE_LAW_TOOL_MATRIX,
  COMPARATIVE_LAW_THEORY_BLOCKS
} from "../src/lib/comparative-law";
import { NAV_ITEMS } from "../src/lib/navigation";

describe("comparative law page", () => {
  it("is reachable from the top navigation", () => {
    expect(NAV_ITEMS).toContainEqual({ href: "/comparative-law/", label: "比较法" });
  });

  it("covers the expected comparative law research blocks", () => {
    const headings = [
      ...COMPARATIVE_LAW_THEORY_BLOCKS.map((block) => block.title),
      ...COMPARATIVE_LAW_EXPERIENCE_BLOCKS.map((block) => block.title)
    ];

    COMPARATIVE_LAW_REQUIRED_TOPICS.forEach((heading) => {
      expect(headings).toContain(heading);
    });
  });

  it("gives every module literature, rules, institutions, and cases", () => {
    const modules = [...COMPARATIVE_LAW_THEORY_BLOCKS, ...COMPARATIVE_LAW_EXPERIENCE_BLOCKS];

    modules.forEach((module) => {
      expect(Array.isArray(module.literature)).toBe(true);
      expect(module.literature.length).toBeGreaterThan(0);
      expect(Array.isArray(module.rules)).toBe(true);
      expect(module.rules.length).toBeGreaterThan(0);
      expect(Array.isArray(module.institutions)).toBe(true);
      expect(module.institutions.length).toBeGreaterThan(0);
      expect(Array.isArray(module.cases)).toBe(true);
      expect(module.cases.length).toBeGreaterThan(0);
    });
  });

  it("includes linked web sources for every module", () => {
    const modules = [...COMPARATIVE_LAW_THEORY_BLOCKS, ...COMPARATIVE_LAW_EXPERIENCE_BLOCKS];

    modules.forEach((module) => {
      expect(Array.isArray(module.webSources)).toBe(true);
      expect(module.webSources.length).toBeGreaterThanOrEqual(4);
      expect(new Set(module.webSources.map((entry) => entry.type))).toEqual(
        new Set(["文献", "规则", "机构", "案例"])
      );
      module.webSources.forEach((entry) => {
        expect(typeof entry.href).toBe("string");
        expect(entry.href.startsWith("http")).toBe(true);
      });
    });
  });

  it("turns the materials into reusable comparative methods", () => {
    const modules = [...COMPARATIVE_LAW_THEORY_BLOCKS, ...COMPARATIVE_LAW_EXPERIENCE_BLOCKS];

    modules.forEach((module) => {
      expect(module.methodTags.length).toBeGreaterThanOrEqual(3);
      expect(module.takeaways.length).toBeGreaterThanOrEqual(3);
    });

    expect(COMPARATIVE_LAW_TOOL_MATRIX.length).toBeGreaterThanOrEqual(6);
    COMPARATIVE_LAW_TOOL_MATRIX.forEach((tool) => {
      expect(tool.tool).toBeTruthy();
      expect(tool.examples.length).toBeGreaterThanOrEqual(2);
      expect(tool.gbaUse).toBeTruthy();
    });
  });

  it("adds original, download, or official links to every listed entry where possible", () => {
    const modules = [...COMPARATIVE_LAW_THEORY_BLOCKS, ...COMPARATIVE_LAW_EXPERIENCE_BLOCKS];
    const groups = ["literature", "rules", "institutions", "cases"] as const;

    modules.forEach((module) => {
      groups.forEach((group) => {
        module[group].forEach((entry) => {
          expect(entry.sourceHref, `${module.title} / ${group} / ${entry.title}`).toBeTruthy();
          expect(entry.sourceLabel, `${module.title} / ${group} / ${entry.title}`).toBeTruthy();
          expect(entry.sourceHref.startsWith("http") || entry.sourceHref.startsWith("/")).toBe(true);
        });
      });
    });
  });
});
