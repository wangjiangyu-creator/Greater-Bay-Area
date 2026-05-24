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
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const taxonomyFile = path.join(root, "src/lib/taxonomy.ts");
const taxonomySource = fs.readFileSync(taxonomyFile, "utf8");

function extractConstArray(name) {
  const match = taxonomySource.match(new RegExp(`export const ${name} = \\[(.*?)\\] as const;`, "s"));
  if (!match) {
    throw new Error(`Unable to locate taxonomy array "${name}" in src/lib/taxonomy.ts`);
  }

  return Array.from(match[1].matchAll(/"([^"]+)"/g), (item) => item[1]);
}

const REGIONS = new Set(extractConstArray("REGIONS"));
const MECHANISMS = new Set(extractConstArray("MECHANISMS"));
const MATERIAL_TYPES = new Set(extractConstArray("MATERIAL_TYPES"));
const SOURCE_CATEGORIES = new Set(extractConstArray("SOURCE_CATEGORIES"));
const STATUS_VALUES = new Set(extractConstArray("STATUS_VALUES"));
const VISIBILITY_VALUES = new Set(extractConstArray("VISIBILITY_VALUES"));
const OUTPUT_STATUS_VALUES = new Set([
  "选题中",
  "资料收集中",
  "提纲中",
  "初稿中",
  "修改中",
  "已定稿",
  "已发表或已提交"
]);

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

function requireStringArrayField(file, data, field) {
  const value = data[field];
  if (!Array.isArray(value) || value.length === 0) {
    failures.push(`${file}: missing ${field}`);
    return [];
  }

  const validValues = [];
  value.forEach((item, index) => {
    if (typeof item !== "string" || item.trim() === "") {
      failures.push(`${file}: ${field}[${index}] must be a non-empty string`);
      return;
    }

    validValues.push(item);
  });

  return validValues;
}

function requireEnumField(file, data, field, allowedValues) {
  const value = data[field];
  if (typeof value !== "string" || value.trim() === "") {
    failures.push(`${file}: missing ${field}`);
    return;
  }

  if (!allowedValues.has(value)) {
    failures.push(`${file}: invalid ${field} value "${value}"`);
  }
}

function requireEnumArrayField(file, data, field, allowedValues) {
  const values = requireStringArrayField(file, data, field);
  values.forEach((value) => {
    if (!allowedValues.has(value)) {
      failures.push(`${file}: invalid ${field} value "${value}"`);
    }
  });
}

function requireReferences(file, data, field, collection) {
  const references = requireStringArrayField(file, data, field);
  const knownIds = idsByCollection.get(collection);
  for (const reference of references) {
    if (!slugPattern.test(reference)) {
      failures.push(`${file}: invalid ${field} reference "${reference}"`);
      continue;
    }

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
  requireEnumField(file, data, "visibility", VISIBILITY_VALUES);

  if (file.includes("/sources/")) {
    requireEnumField(file, data, "status", STATUS_VALUES);
    requireField(file, data, "originalUrl");
    requireField(file, data, "citation");
    requireEnumArrayField(file, data, "regions", REGIONS);
    requireReferences(file, data, "topics", "topics");
    requireEnumField(file, data, "materialType", MATERIAL_TYPES);
    requireEnumField(file, data, "sourceCategory", SOURCE_CATEGORIES);
  }

  if (file.includes("/cases/")) {
    requireEnumField(file, data, "status", STATUS_VALUES);
    requireField(file, data, "sourceUrl");
    requireField(file, data, "legalBasis");
    requireStringArrayField(file, data, "paperAngles");
    requireEnumArrayField(file, data, "regions", REGIONS);
    requireReferences(file, data, "topics", "topics");
    requireReferences(file, data, "relatedSources", "sources");
    requireEnumArrayField(file, data, "mechanisms", MECHANISMS);
  }

  if (file.includes("/topics/")) {
    requireEnumField(file, data, "status", STATUS_VALUES);
    requireField(file, data, "summary");
    requireEnumArrayField(file, data, "regions", REGIONS);
    requireEnumArrayField(file, data, "mechanisms", MECHANISMS);
  }

  if (file.includes("/comparisons/")) {
    requireEnumField(file, data, "status", STATUS_VALUES);
    requireStringArrayField(file, data, "keyQuestions");
    requireEnumArrayField(file, data, "regions", REGIONS);
    requireReferences(file, data, "topics", "topics");
    requireReferences(file, data, "relatedSources", "sources");
    requireEnumArrayField(file, data, "mechanisms", MECHANISMS);
  }

  if (file.includes("/outputs/")) {
    requireEnumField(file, data, "status", OUTPUT_STATUS_VALUES);
    requireField(file, data, "outputType");
    requireStringArrayField(file, data, "authors");
    requireField(file, data, "summary");
    requireReferences(file, data, "topics", "topics");
    requireReferences(file, data, "relatedCases", "cases");
    requireReferences(file, data, "relatedSources", "sources");
    requireField(file, data, "version");
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Content verification passed for ${files.length} files.`);
