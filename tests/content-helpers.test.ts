import { describe, expect, it } from "vitest";
import {
  byUpdatedDesc,
  countByStatus,
  displayDate,
  entriesForTopic,
  relatedByIds,
  uniqueSorted
} from "../src/lib/content";

const entries = [
  { id: "a", data: { title: "A", updated: new Date("2026-05-20"), status: "已摘要", topics: ["one"], tags: ["金融"] } },
  { id: "b", data: { title: "B", updated: new Date("2026-05-22"), status: "已核验", topics: ["two"], tags: ["法律"] } },
  { id: "c", data: { title: "C", updated: new Date("2026-05-21"), status: "已摘要", topics: ["one"], tags: ["金融", "数据"] } }
];

describe("content helpers", () => {
  it("sorts entries by updated date descending", () => {
    expect(entries.slice().sort(byUpdatedDesc).map((entry) => entry.id)).toEqual(["b", "c", "a"]);
  });

  it("counts entries by status", () => {
    expect(countByStatus(entries)).toEqual({ 已摘要: 2, 已核验: 1 });
  });

  it("filters entries for a topic slug", () => {
    expect(entriesForTopic(entries, "one").map((entry) => entry.id)).toEqual(["a", "c"]);
  });

  it("returns related entries in requested order", () => {
    expect(relatedByIds(entries, ["c", "a"]).map((entry) => entry.id)).toEqual(["c", "a"]);
  });

  it("formats dates in Chinese numeric style", () => {
    expect(displayDate(new Date("2026-05-23"))).toBe("2026-05-23");
  });

  it("sorts unique strings", () => {
    expect(uniqueSorted(["数据", "金融", "数据"])).toEqual(["数据", "金融"]);
  });
});
