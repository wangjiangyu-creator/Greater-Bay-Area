import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fg from "fast-glob";
import matter from "gray-matter";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const files = await fg("src/content/**/*.md", { cwd: root });
const failures = [];
const expectedCollections = ["topics", "sources", "cases", "comparisons", "outputs"];
const idsByCollection = new Map(expectedCollections.map((collection) => [collection, new Set()]));

function collectionFor(file) {
  return file.split("/")[2];
}

function requireField(file, data, field) {
  if (
    data[field] === undefined ||
    (typeof data[field] === "string" && data[field].trim() === "") ||
    (Array.isArray(data[field]) && data[field].length === 0)
  ) {
    failures.push(`${file}: missing ${field}`);
  }
}

function requireReferences(file, data, field, collection) {
  const references = data[field];
  if (!Array.isArray(references)) {
    return;
  }

  const knownIds = idsByCollection.get(collection);
  for (const reference of references) {
    if (!knownIds?.has(reference)) {
      failures.push(`${file}: unknown ${field} reference "${reference}" in ${collection}`);
    }
  }
}

if (files.length === 0) {
  failures.push("No content files found under src/content.");
}

for (const file of files) {
  const collection = collectionFor(file);
  const id = path.basename(file, ".md");
  idsByCollection.get(collection)?.add(id);
}

for (const collection of expectedCollections) {
  if ((idsByCollection.get(collection)?.size ?? 0) === 0) {
    failures.push(`No content files found for collection "${collection}".`);
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

  if (file.includes("/outputs/")) {
    requireField(file, data, "outputType");
    requireField(file, data, "authors");
    requireField(file, data, "summary");
    requireField(file, data, "topics");
    requireField(file, data, "relatedCases");
    requireField(file, data, "relatedSources");
    requireField(file, data, "version");
  }

  if (!file.includes("/topics/")) {
    requireReferences(file, data, "topics", "topics");
  }

  requireReferences(file, data, "relatedSources", "sources");
  requireReferences(file, data, "relatedCases", "cases");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Content verification passed for ${files.length} files.`);
