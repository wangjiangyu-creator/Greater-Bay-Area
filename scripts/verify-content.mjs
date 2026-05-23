import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fg from "fast-glob";
import matter from "gray-matter";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const files = await fg("src/content/**/*.md", { cwd: root });
const failures = [];

function requireField(file, data, field) {
  if (data[field] === undefined || data[field] === "" || (Array.isArray(data[field]) && data[field].length === 0)) {
    failures.push(`${file}: missing ${field}`);
  }
}

for (const file of files) {
  const fullPath = path.join(root, file);
  const { data } = matter(fs.readFileSync(fullPath, "utf8"));

  requireField(file, data, "title");
  requireField(file, data, "status");
  requireField(file, data, "visibility");
  requireField(file, data, "updated");

  if (file.includes("/sources/")) {
    requireField(file, data, "originalUrl");
    requireField(file, data, "citation");
  }

  if (file.includes("/cases/")) {
    requireField(file, data, "sourceUrl");
    requireField(file, data, "legalBasis");
    requireField(file, data, "paperAngles");
  }

  if (file.includes("/topics/")) {
    requireField(file, data, "summary");
    requireField(file, data, "mechanisms");
  }

  if (file.includes("/comparisons/")) {
    requireField(file, data, "keyQuestions");
    requireField(file, data, "relatedSources");
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Content verification passed for ${files.length} files.`);
