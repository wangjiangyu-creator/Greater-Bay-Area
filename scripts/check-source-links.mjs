import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import fg from "fast-glob";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const files = await fg("src/content/sources/*.md", { cwd: root });
const checkLocalAttachment = process.argv.includes("--all");

const localPathPattern = /^\/policy-library\/.+$/;

const results = [];
const summary = {
  totalUrls: 0,
  checked: 0,
  ok: 0,
  fail: 0,
  skipped: 0
};

const timeout = 12000;

async function checkRemote(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeout);

  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow", signal: ctrl.signal });
    if (!res.ok) {
      if (res.status === 405 || res.status === 403) {
        const getRes = await fetch(url, { method: "GET", redirect: "follow", signal: ctrl.signal });
        summary.checked += 1;
        summary.totalUrls += 1;
        if (getRes.ok) {
          summary.ok += 1;
          return { status: "ok", code: getRes.status, ok: true };
        }
        summary.fail += 1;
        return { status: "fail", code: getRes.status, ok: false };
      }
      summary.checked += 1;
      summary.totalUrls += 1;
      summary.fail += 1;
      return { status: "fail", code: res.status, ok: false };
    }
    summary.checked += 1;
    summary.totalUrls += 1;
    summary.ok += 1;
    return { status: "ok", code: res.status, ok: true };
  } catch (error) {
    try {
      const getRes = await fetch(url, { method: "GET", redirect: "follow", signal: ctrl.signal });
      summary.checked += 1;
      summary.totalUrls += 1;
      if (getRes.ok) {
        summary.ok += 1;
        return { status: "ok", code: getRes.status, ok: true };
      }
      summary.fail += 1;
      return { status: "fail", code: getRes.status, ok: false };
    } catch (fallbackError) {
      summary.checked += 1;
      summary.totalUrls += 1;
      summary.fail += 1;
      return { status: "fail", code: null, ok: false, error: `${error.message}; ${fallbackError.message}` };
    }
  } finally {
    clearTimeout(timer);
  }
}

async function checkSources() {
  for (const file of files) {
    const fullPath = path.join(root, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);
    const urls = [];

    if (data.originalUrl) {
      urls.push({ key: "originalUrl", url: data.originalUrl, file });
    }

    if (typeof data.attachmentUrl === "string" && data.attachmentUrl) {
      urls.push({ key: "attachmentUrl", url: data.attachmentUrl, file });
    } else if (Array.isArray(data.attachmentUrl)) {
      data.attachmentUrl.forEach((u) => urls.push({ key: "attachmentUrl", url: u, file }));
    }

    if (Array.isArray(data.englishUrls)) {
      data.englishUrls.forEach((u) => urls.push({ key: "englishUrls", url: u, file }));
    }

    for (const { key, url, file: sourceFile } of urls) {
      if (typeof url !== "string" || !url.trim()) {
        continue;
      }

      const trimmed = url.trim();
      if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        const result = await checkRemote(trimmed);
        if (!result.ok) {
          results.push({
            source: sourceFile,
            key,
            url: trimmed,
            detail: result
          });
        }
        continue;
      }

      if (localPathPattern.test(trimmed) && checkLocalAttachment) {
        const localPath = path.join(root, "public", trimmed);
        if (fs.existsSync(localPath)) {
          summary.ok += 1;
        } else {
          summary.fail += 1;
          results.push({ source: sourceFile, key, url: trimmed, detail: { status: "missing local attachment" } });
        }
        summary.totalUrls += 1;
        summary.checked += 1;
      } else {
        summary.skipped += 1;
      }
    }
  }
}

await checkSources();

if (results.length > 0) {
  console.log(`Checked URLs: ${summary.totalUrls}`);
  console.log(`Checked: ${summary.checked}, success: ${summary.ok}, failed: ${summary.fail}, skipped: ${summary.skipped}`);
  console.log("Need follow-up:");
  for (const item of results) {
    const detail = item.detail.code ? `status ${item.detail.code}` : item.detail.error || item.detail.status;
    console.log(`- ${item.source} / ${item.key}: ${item.url} (${detail})`);
  }
  process.exit(1);
}

console.log(`Checked URLs: ${summary.totalUrls}`);
console.log(`Checked: ${summary.checked}, success: ${summary.ok}, failed: ${summary.fail}, skipped: ${summary.skipped}`);
console.log("All source links are reachable.");
