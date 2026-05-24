import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { relative } from "node:path";
import fg from "fast-glob";
import { rewriteStaticPreviewHtml } from "../src/lib/static-preview-paths.js";

const distDir = new URL("../dist/", import.meta.url);
const distDirPath = fileURLToPath(distDir);
const htmlFiles = await fg("**/*.html", { cwd: distDirPath, absolute: true });

await Promise.all(
  htmlFiles.map(async (filePath) => {
    const distRelativePath = relative(distDirPath, filePath).replace(/\\/g, "/");
    const original = await readFile(filePath, "utf8");
    const rewritten = rewriteStaticPreviewHtml(original, distRelativePath);

    if (rewritten !== original) {
      await writeFile(filePath, rewritten, "utf8");
    }
  })
);

console.log(`Rewrote static preview paths for ${htmlFiles.length} HTML files.`);
