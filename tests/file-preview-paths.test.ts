import { describe, expect, it } from "vitest";
import { getStaticPreviewPrefix, rewriteStaticPreviewHtml } from "../src/lib/static-preview-paths.js";

describe("static preview path rewriting", () => {
  it("computes the relative prefix for nested pages", () => {
    expect(getStaticPreviewPrefix("index.html")).toBe("./");
    expect(getStaticPreviewPrefix("comparative-law/index.html")).toBe("../");
    expect(getStaticPreviewPrefix("cases/foo/index.html")).toBe("../../");
  });

  it("rewrites root-relative asset and navigation urls for file previews", () => {
    const html = [
      '<link rel="stylesheet" href="/_astro/app.css">',
      '<a href="/comparative-law/">比较法</a>',
      '<a href="/">首页</a>',
      '<img src="/images/example.png" alt="example">'
    ].join("");

    const rewritten = rewriteStaticPreviewHtml(html, "comparative-law/index.html");

    expect(rewritten).toContain('href="../_astro/app.css"');
    expect(rewritten).toContain('href="../comparative-law/"');
    expect(rewritten).toContain('href="../"');
    expect(rewritten).toContain('src="../images/example.png"');
    expect(rewritten).not.toContain('href="/_astro/app.css"');
  });
});
