import { describe, expect, it } from "vitest";
import {
  MATERIAL_TYPES,
  MECHANISMS,
  REGIONS,
  STATUS_VALUES,
  VISIBILITY_VALUES,
  hasKnownValue,
  uniqueValues
} from "../src/lib/taxonomy";

describe("taxonomy constants", () => {
  it("contains the core Greater Bay Area regions and platforms", () => {
    expect(REGIONS).toContain("中央");
    expect(REGIONS).toContain("香港");
    expect(REGIONS).toContain("澳门");
    expect(REGIONS).toContain("前海");
    expect(REGIONS).toContain("横琴");
    expect(REGIONS).toContain("南沙");
    expect(REGIONS).toContain("河套");
  });

  it("contains the mechanism types needed for rule connection analysis", () => {
    expect(MECHANISMS).toContain("互认");
    expect(MECHANISMS).toContain("特别立法");
    expect(MECHANISMS).toContain("司法协助");
    expect(MECHANISMS).toContain("监管沙盒");
  });

  it("keeps values unique", () => {
    expect(uniqueValues(REGIONS)).toHaveLength(REGIONS.length);
    expect(uniqueValues(MECHANISMS)).toHaveLength(MECHANISMS.length);
    expect(uniqueValues(MATERIAL_TYPES)).toHaveLength(MATERIAL_TYPES.length);
    expect(uniqueValues(STATUS_VALUES)).toHaveLength(STATUS_VALUES.length);
    expect(uniqueValues(VISIBILITY_VALUES)).toHaveLength(VISIBILITY_VALUES.length);
  });

  it("checks whether a value belongs to a taxonomy list", () => {
    expect(hasKnownValue(REGIONS, "广东")).toBe(true);
    expect(hasKnownValue(REGIONS, "火星")).toBe(false);
  });
});
