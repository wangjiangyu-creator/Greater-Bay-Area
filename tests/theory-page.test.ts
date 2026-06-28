import { describe, expect, it } from "vitest";
import { NAV_ITEMS } from "../src/lib/navigation";
import { THEORY_FIELD_COUNTS, THEORY_FRAMEWORKS, THEORY_REQUIRED_FRAMEWORKS } from "../src/lib/theory";

describe("theory page", () => {
  it("is reachable from the top navigation", () => {
    expect(NAV_ITEMS).toContainEqual({ href: "/theory/", label: "理论" });
  });

  it("covers economic integration, legal integration, and cross-domain governance", () => {
    expect(THEORY_FIELD_COUNTS["经济一体化"]).toBeGreaterThanOrEqual(3);
    expect(THEORY_FIELD_COUNTS["法律一体化"]).toBeGreaterThanOrEqual(3);
    expect(THEORY_FIELD_COUNTS["跨域治理"]).toBeGreaterThanOrEqual(1);
  });

  it("contains the required theory frameworks", () => {
    const expected = [
      "经济一体化阶段论与关税同盟理论",
      "区域一体化政治经济学",
      "新制度经济学与交易成本框架",
      "多层级治理与实验主义治理",
      "法律统一、协调与示范法路径",
      "相互承认、等效认可与监管竞争",
      "法律移植、法律文化与法律多元主义",
      "跨国法律过程、司法对话与法治化整合"
    ];

    expected.forEach((title) => {
      expect(THEORY_REQUIRED_FRAMEWORKS).toContain(title);
    });
  });

  it("provides representative literature and research questions for every framework", () => {
    THEORY_FRAMEWORKS.forEach((framework) => {
      expect(framework.framework.length).toBeGreaterThanOrEqual(3);
      expect(framework.representativeLiterature.length).toBeGreaterThanOrEqual(3);
      expect(framework.researchQuestions.length).toBeGreaterThanOrEqual(3);
      expect(framework.gbaUse).toBeTruthy();
      expect(framework.caution).toBeTruthy();

      framework.representativeLiterature.forEach((entry) => {
        expect(entry.title).toBeTruthy();
        expect(entry.authors).toBeTruthy();
        expect(entry.year).toBeTruthy();
        expect(entry.sourceHref.startsWith("http")).toBe(true);
      });
    });
  });
});
