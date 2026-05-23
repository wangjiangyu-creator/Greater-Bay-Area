# GBA Legal Integration Portal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first usable version of a Yue-Hong Kong-Macao Greater Bay Area legal integration research portal with structured topics, legal sources, cases, comparison pages, outputs, and content quality checks.

**Architecture:** Use a static, content-driven Astro site. Structured Markdown entries live under `src/content/*`, Astro content collections validate the fields, and pages render those collections into a quiet research dashboard, database listings, and detail pages. Google Drive remains the original-file store and Git/GitHub manages code plus metadata versions after repository initialization.

**Tech Stack:** Astro 6, TypeScript, Markdown content collections, Zod schemas, Vitest, gray-matter, fast-glob, plain CSS.

---

## Scope Check

This plan implements the first site version only. It does not build Google Drive synchronization, public submissions, AI search, bilingual pages, complex permissions, or a database admin backend. Those are separate projects after the content model is stable.

## File Structure

- `package.json`: npm scripts, Astro dependencies, testing dependencies.
- `astro.config.mjs`: Astro site configuration.
- `tsconfig.json`: strict TypeScript configuration.
- `vitest.config.ts`: unit test configuration.
- `.gitignore`: local build and dependency exclusions.
- `README.md`: local run and content editing notes.
- `src/content.config.ts`: Astro content collection loaders.
- `src/content/schemas.ts`: Zod schemas for topics, sources, cases, comparisons, and outputs.
- `src/content/topics/*.md`: research topic records.
- `src/content/sources/*.md`: policy and legal source records.
- `src/content/cases/*.md`: structured typical-case cards.
- `src/content/comparisons/*.md`: three-jurisdiction comparison pages.
- `src/content/outputs/*.md`: report, paper, brief, meeting-note, and bibliography records.
- `src/lib/taxonomy.ts`: canonical region, mechanism, material type, visibility, and status values.
- `src/lib/content.ts`: small helpers for sorting, grouping, counts, and display dates.
- `src/layouts/BaseLayout.astro`: common document shell.
- `src/components/*.astro`: small display components.
- `src/pages/*.astro`: dashboard, listings, detail routes, and search page.
- `src/styles/global.css`: restrained research portal styling.
- `scripts/seed-content.mjs`: starter content generator.
- `scripts/verify-content.mjs`: metadata quality gate.
- `tests/*.test.ts`: Vitest tests for taxonomy, schemas, and content helpers.

## Task 1: Project Shell And Tooling

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `.gitignore`
- Create: `README.md`

- [ ] **Step 1: Initialize repository**

Run:

```bash
git init
```

Expected: `Initialized empty Git repository` or `Reinitialized existing Git repository`.

- [ ] **Step 2: Create `package.json`**

Write:

```json
{
  "name": "gba-legal-integration-portal",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev --host 127.0.0.1",
    "build": "astro check && astro build",
    "preview": "astro preview --host 127.0.0.1",
    "test": "vitest run",
    "test:watch": "vitest",
    "content:seed": "node scripts/seed-content.mjs",
    "content:verify": "node scripts/verify-content.mjs",
    "check": "npm run content:verify && npm test && npm run build"
  },
  "dependencies": {
    "@astrojs/check": "latest",
    "astro": "^6.0.0",
    "typescript": "latest",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "fast-glob": "^3.3.3",
    "gray-matter": "^4.0.3",
    "vitest": "^3.2.4"
  }
}
```

- [ ] **Step 3: Create Astro and TypeScript config files**

Create `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://example.org",
  output: "static"
});
```

Create `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@lib/*": ["src/lib/*"]
    }
  }
}
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"]
  }
});
```

- [ ] **Step 4: Create repository support files**

Create `.gitignore`:

```gitignore
node_modules
dist
.astro
.DS_Store
npm-debug.log*
.env
.env.local
```

Create `README.md`:

```md
# 粤港澳大湾区法制一体化研究门户

本项目是“规则衔接、机制对接”研究门户和资料库的第一期静态网站。

## 本地运行

```bash
npm install
npm run content:seed
npm run dev
```

## 检查

```bash
npm run check
```

## 内容目录

- `src/content/topics`: 专题研究
- `src/content/sources`: 政策与法源
- `src/content/cases`: 典型案例
- `src/content/comparisons`: 三法域规则对照
- `src/content/outputs`: 研究成果
```

- [ ] **Step 5: Install dependencies**

Run:

```bash
npm install
```

Expected: dependencies install and `package-lock.json` is created.

- [ ] **Step 6: Commit tooling**

Run:

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts .gitignore README.md
git commit -m "chore: initialize research portal project"
```

Expected: one commit containing the project shell.

## Task 2: Taxonomy Constants

**Files:**
- Create: `src/lib/taxonomy.ts`
- Test: `tests/taxonomy.test.ts`

- [ ] **Step 1: Write the failing taxonomy tests**

Create `tests/taxonomy.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/taxonomy.test.ts
```

Expected: FAIL because `src/lib/taxonomy.ts` does not exist.

- [ ] **Step 3: Implement taxonomy constants**

Create `src/lib/taxonomy.ts`:

```ts
export const REGIONS = [
  "中央",
  "广东",
  "香港",
  "澳门",
  "广州",
  "深圳",
  "珠海",
  "佛山",
  "惠州",
  "东莞",
  "中山",
  "江门",
  "肇庆",
  "前海",
  "横琴",
  "南沙",
  "河套"
] as const;

export const MECHANISMS = [
  "互认",
  "等效认可",
  "备案",
  "白名单",
  "负面清单",
  "授权试点",
  "特别立法",
  "跨境通办",
  "标准共建",
  "司法协助",
  "监管沙盒",
  "数据接口",
  "联合执法",
  "跨境支付与结算",
  "争议解决协同"
] as const;

export const MATERIAL_TYPES = [
  "法律",
  "行政法规",
  "地方性法规",
  "规章",
  "规范性文件",
  "政策规划",
  "司法文件",
  "监管规则",
  "合作协议",
  "行业标准",
  "官方案例",
  "学术文献",
  "实务报告"
] as const;

export const STATUS_VALUES = [
  "未处理",
  "已入库",
  "已摘要",
  "已核验",
  "已关联专题",
  "已用于报告",
  "已用于论文",
  "需补充来源",
  "需专家确认"
] as const;

export const VISIBILITY_VALUES = ["公开", "评审", "内部"] as const;

export type Region = (typeof REGIONS)[number];
export type Mechanism = (typeof MECHANISMS)[number];
export type MaterialType = (typeof MATERIAL_TYPES)[number];
export type ResearchStatus = (typeof STATUS_VALUES)[number];
export type Visibility = (typeof VISIBILITY_VALUES)[number];

export function uniqueValues<T extends readonly string[]>(values: T): string[] {
  return Array.from(new Set(values));
}

export function hasKnownValue<T extends readonly string[]>(values: T, value: string): value is T[number] {
  return values.includes(value as T[number]);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
npm test -- tests/taxonomy.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit taxonomy**

Run:

```bash
git add src/lib/taxonomy.ts tests/taxonomy.test.ts
git commit -m "feat: add research taxonomy constants"
```

Expected: one commit containing taxonomy values and tests.

## Task 3: Content Schemas And Collections

**Files:**
- Create: `src/content/schemas.ts`
- Create: `src/content.config.ts`
- Test: `tests/content-schemas.test.ts`

- [ ] **Step 1: Write schema tests**

Create `tests/content-schemas.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  caseSchema,
  comparisonSchema,
  outputSchema,
  sourceSchema,
  topicSchema
} from "../src/content/schemas";

describe("content schemas", () => {
  it("accepts a valid topic", () => {
    const parsed = topicSchema.parse({
      title: "跨境商事争议解决",
      summary: "围绕商事调解、仲裁、司法协助和域外法查明的规则衔接。",
      priority: "第一期",
      regions: ["广东", "香港", "澳门"],
      mechanisms: ["争议解决协同", "司法协助"],
      status: "已摘要",
      visibility: "评审",
      updated: "2026-05-23",
      lead: "课题组",
      tags: ["商事争议", "调解"]
    });

    expect(parsed.updated).toBeInstanceOf(Date);
  });

  it("rejects an invalid source status", () => {
    expect(() =>
      sourceSchema.parse({
        title: "测试资料",
        issuer: "测试机关",
        date: "2026-05-23",
        level: "政策规划",
        regions: ["广东"],
        topics: ["cross-border-dispute-resolution"],
        materialType: "政策规划",
        tags: ["测试"],
        summary: "测试摘要",
        relationToRules: "测试规则衔接关系",
        relationToMechanisms: "测试机制对接关系",
        originalUrl: "https://example.org",
        citation: "测试引用",
        status: "完成",
        visibility: "评审",
        updated: "2026-05-23"
      })
    ).toThrow();
  });

  it("accepts valid case, comparison, and output records", () => {
    expect(
      caseSchema.parse({
        title: "港澳律师实现在大湾区内地九市便利执业",
        batch: "第一批",
        sourceUrl: "https://example.org/case.pdf",
        regions: ["广东", "香港", "澳门"],
        topics: ["gba-lawyers-practice"],
        mechanisms: ["授权试点"],
        legalBasis: "大湾区律师执业试点相关规则",
        innovation: "允许符合条件的港澳律师办理一定范围内地法律事务。",
        effect: "促进法律服务要素流动。",
        reproducibility: "适合扩展至其他专业服务领域。",
        risks: "执业范围、责任承担和监管协同需要持续核验。",
        paperAngles: ["港澳律师执业试点的制度逻辑"],
        relatedSources: ["cases-batch-1"],
        status: "已摘要",
        visibility: "评审",
        updated: "2026-05-23"
      }).title
    ).toBe("港澳律师实现在大湾区内地九市便利执业");

    expect(
      comparisonSchema.parse({
        title: "港澳律师执业规则对照",
        topics: ["gba-lawyers-practice"],
        regions: ["广东", "香港", "澳门"],
        mechanisms: ["授权试点", "互认"],
        keyQuestions: ["执业范围如何界定"],
        relatedSources: ["cases-batch-1"],
        status: "需专家确认",
        visibility: "内部",
        updated: "2026-05-23"
      }).keyQuestions
    ).toHaveLength(1);

    expect(
      outputSchema.parse({
        title: "总报告目录",
        outputType: "深度研究总报告",
        authors: ["课题组"],
        summary: "总报告结构草案。",
        keywords: ["规则衔接", "机制对接"],
        topics: ["cross-border-dispute-resolution"],
        relatedCases: ["gba-lawyers-practice-case"],
        relatedSources: ["development-plan"],
        status: "提纲中",
        visibility: "内部",
        version: "0.1",
        updated: "2026-05-23"
      }).version
    ).toBe("0.1");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/content-schemas.test.ts
```

Expected: FAIL because schema files do not exist.

- [ ] **Step 3: Implement schemas**

Create `src/content/schemas.ts`:

```ts
import { z } from "zod";
import {
  MATERIAL_TYPES,
  MECHANISMS,
  REGIONS,
  STATUS_VALUES,
  VISIBILITY_VALUES
} from "../lib/taxonomy";

const regionSchema = z.enum(REGIONS);
const mechanismSchema = z.enum(MECHANISMS);
const materialTypeSchema = z.enum(MATERIAL_TYPES);
const statusSchema = z.enum(STATUS_VALUES);
const visibilitySchema = z.enum(VISIBILITY_VALUES);

const slugList = z.array(z.string().min(2)).default([]);
const stringList = z.array(z.string().min(1)).default([]);
const updatedDate = z.coerce.date();

export const topicSchema = z.object({
  title: z.string().min(2),
  summary: z.string().min(10),
  priority: z.enum(["第一期", "第二期"]),
  regions: z.array(regionSchema).min(1),
  mechanisms: z.array(mechanismSchema).min(1),
  status: statusSchema,
  visibility: visibilitySchema,
  updated: updatedDate,
  lead: z.string().min(2),
  tags: stringList
});

export const sourceSchema = z.object({
  title: z.string().min(2),
  issuer: z.string().min(2),
  date: updatedDate,
  effectiveDate: updatedDate.optional(),
  level: z.string().min(2),
  regions: z.array(regionSchema).min(1),
  topics: slugList,
  materialType: materialTypeSchema,
  tags: stringList,
  summary: z.string().min(10),
  relationToRules: z.string().min(6),
  relationToMechanisms: z.string().min(6),
  originalUrl: z.string().url(),
  attachmentUrl: z.string().url().optional(),
  citation: z.string().min(4),
  status: statusSchema,
  visibility: visibilitySchema,
  updated: updatedDate
});

export const caseSchema = z.object({
  title: z.string().min(2),
  batch: z.string().min(2),
  sourceUrl: z.string().url(),
  regions: z.array(regionSchema).min(1),
  topics: slugList,
  mechanisms: z.array(mechanismSchema).min(1),
  legalBasis: z.string().min(4),
  innovation: z.string().min(8),
  effect: z.string().min(8),
  reproducibility: z.string().min(8),
  risks: z.string().min(8),
  paperAngles: stringList,
  relatedSources: slugList,
  status: statusSchema,
  visibility: visibilitySchema,
  updated: updatedDate
});

export const comparisonSchema = z.object({
  title: z.string().min(2),
  topics: slugList,
  regions: z.array(regionSchema).min(2),
  mechanisms: z.array(mechanismSchema).min(1),
  keyQuestions: stringList,
  relatedSources: slugList,
  status: statusSchema,
  visibility: visibilitySchema,
  updated: updatedDate
});

export const outputSchema = z.object({
  title: z.string().min(2),
  outputType: z.enum([
    "深度研究总报告",
    "专题论文",
    "工作论文",
    "政策简报",
    "会议纪要",
    "访谈摘要",
    "文献综述",
    "专题书目"
  ]),
  authors: stringList,
  summary: z.string().min(8),
  keywords: stringList,
  topics: slugList,
  relatedCases: slugList,
  relatedSources: slugList,
  status: z.enum(["选题中", "资料收集中", "提纲中", "初稿中", "修改中", "已定稿", "已发表或已提交"]),
  visibility: visibilitySchema,
  version: z.string().min(1),
  downloadUrl: z.string().url().optional(),
  updated: updatedDate
});
```

- [ ] **Step 4: Configure Astro collections**

Create `src/content.config.ts`:

```ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import {
  caseSchema,
  comparisonSchema,
  outputSchema,
  sourceSchema,
  topicSchema
} from "./content/schemas";

const topics = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/topics" }),
  schema: topicSchema
});

const sources = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/sources" }),
  schema: sourceSchema
});

const cases = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/cases" }),
  schema: caseSchema
});

const comparisons = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/comparisons" }),
  schema: comparisonSchema
});

const outputs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/outputs" }),
  schema: outputSchema
});

export const collections = {
  topics,
  sources,
  cases,
  comparisons,
  outputs
};
```

- [ ] **Step 5: Run tests and Astro sync**

Run:

```bash
npm test -- tests/content-schemas.test.ts
npx astro sync
```

Expected: schema tests pass and Astro type generation completes.

- [ ] **Step 6: Commit schemas**

Run:

```bash
git add src/content/schemas.ts src/content.config.ts tests/content-schemas.test.ts
git commit -m "feat: define research content schemas"
```

Expected: one commit containing content schemas and collection config.

## Task 4: Starter Research Content

**Files:**
- Create: `scripts/seed-content.mjs`
- Generate: `src/content/topics/*.md`
- Generate: `src/content/sources/*.md`
- Generate: `src/content/cases/*.md`
- Generate: `src/content/comparisons/*.md`
- Generate: `src/content/outputs/*.md`

- [ ] **Step 1: Create content seed script**

Create `scripts/seed-content.mjs`:

```js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = path.join(root, "src", "content");

function yamlValue(value) {
  if (Array.isArray(value)) {
    return `\n${value.map((item) => `  - ${JSON.stringify(item)}`).join("\n")}`;
  }

  return ` ${JSON.stringify(value)}`;
}

function toFrontmatter(data) {
  return `${Object.entries(data)
    .map(([key, value]) => `${key}:${yamlValue(value)}`)
    .join("\n")}\n`;
}

function writeEntry(collection, slug, data, body) {
  const directory = path.join(contentRoot, collection);
  fs.mkdirSync(directory, { recursive: true });
  const file = path.join(directory, `${slug}.md`);
  const markdown = `---\n${toFrontmatter(data)}---\n\n${body.trim()}\n`;
  fs.writeFileSync(file, markdown, "utf8");
}

const updated = "2026-05-23";

const topics = [
  {
    slug: "cross-border-dispute-resolution",
    data: {
      title: "跨境商事争议解决",
      summary: "研究粤港澳商事调解、仲裁、司法协助、域外法查明和裁判承认执行中的规则衔接。",
      priority: "第一期",
      regions: ["广东", "香港", "澳门", "前海", "横琴"],
      mechanisms: ["争议解决协同", "司法协助", "特别立法"],
      status: "已摘要",
      visibility: "评审",
      updated,
      lead: "课题组",
      tags: ["商事争议", "调解", "仲裁", "域外法查明"]
    },
    body: "## 研究问题\n\n跨境商事争议解决是规则衔接最集中的领域之一。第一期重点比较三地调解规则、仲裁接口、域外法查明机制和合作区特别规则。\n\n## 论文线索\n\n- 大湾区跨境商事调解规则统一的制度边界\n- 前海跨境商事法律规则衔接的可复制性\n- 域外法查明平台对涉港澳审判的支撑作用"
  },
  {
    slug: "gba-lawyers-practice",
    data: {
      title: "港澳律师在大湾区内地九市执业",
      summary: "研究港澳律师取得大湾区律师执业证书后的执业范围、监管协同、职业责任和法律服务市场开放。",
      priority: "第一期",
      regions: ["广东", "香港", "澳门"],
      mechanisms: ["授权试点", "互认", "跨境通办"],
      status: "已摘要",
      visibility: "评审",
      updated,
      lead: "课题组",
      tags: ["律师制度", "法律服务", "专业资格"]
    },
    body: "## 研究问题\n\n港澳律师便利执业既涉及资格准入，也涉及执业监管、业务边界和责任承担。该专题可作为专业服务开放的代表性样本。\n\n## 论文线索\n\n- 大湾区律师执业试点的法域接口设计\n- 港澳律师参与内地民商事法律事务的监管协同"
  },
  {
    slug: "data-cross-border",
    data: {
      title: "数据跨境流动与数据交易",
      summary: "研究数据跨境交易、数据接口、白名单和科研数据跨境使用的制度条件。",
      priority: "第一期",
      regions: ["广东", "香港", "澳门", "河套"],
      mechanisms: ["白名单", "数据接口", "监管沙盒"],
      status: "需专家确认",
      visibility: "内部",
      updated,
      lead: "课题组",
      tags: ["数据", "河套", "科研"]
    },
    body: "## 研究问题\n\n数据跨境流动直接触及三地数据治理、国家安全、个人信息保护和科技创新需求之间的平衡。第一期先从河套数据跨境交易案例入手。\n\n## 论文线索\n\n- 河套数据跨境交易试点的制度功能\n- 数据跨境白名单在大湾区的适用条件"
  },
  {
    slug: "finance-connect",
    data: {
      title: "金融互联互通与跨境理财",
      summary: "研究跨境理财通、绿色债券、地方政府债券和跨境支付结算中的规则连接。",
      priority: "第一期",
      regions: ["广东", "香港", "澳门", "深圳"],
      mechanisms: ["跨境支付与结算", "等效认可", "监管沙盒"],
      status: "已入库",
      visibility: "评审",
      updated,
      lead: "课题组",
      tags: ["金融", "债券", "理财通"]
    },
    body: "## 研究问题\n\n金融互联互通体现了市场开放、监管等效、风险隔离和投资者保护之间的制度协调。第一期先建立案例和法源索引。"
  },
  {
    slug: "medical-products-connect",
    data: {
      title: "港澳药械通与医疗规则衔接",
      summary: "研究港澳已上市药品和医疗器械在大湾区内地指定医疗机构使用的授权试点与监管协作。",
      priority: "第一期",
      regions: ["广东", "香港", "澳门"],
      mechanisms: ["授权试点", "监管沙盒", "备案"],
      status: "已摘要",
      visibility: "评审",
      updated,
      lead: "课题组",
      tags: ["医疗", "药品", "医疗器械"]
    },
    body: "## 研究问题\n\n港澳药械通以临床急需为入口，在审批准入、使用监管、风险控制和患者权益之间建立试点机制。\n\n## 论文线索\n\n- 港澳药械通的授权试点结构\n- 医疗规则衔接中的风险分配与监管合作"
  },
  {
    slug: "professional-qualification",
    data: {
      title: "专业资格互认",
      summary: "研究工程师、医疗、法律、建设等专业资格互认的制度路径和可复制边界。",
      priority: "第一期",
      regions: ["广东", "香港", "澳门", "珠海", "前海"],
      mechanisms: ["互认", "等效认可", "标准共建"],
      status: "已入库",
      visibility: "评审",
      updated,
      lead: "课题组",
      tags: ["专业资格", "人才", "互认"]
    },
    body: "## 研究问题\n\n专业资格互认是人员和服务要素跨境流动的关键条件。第一期重点比较资格评价标准、执业许可和持续监管机制。"
  }
];

const sources = [
  {
    slug: "development-plan",
    data: {
      title: "粤港澳大湾区发展规划纲要",
      issuer: "中共中央 国务院",
      date: "2019-02-18",
      level: "政策规划",
      regions: ["中央", "广东", "香港", "澳门"],
      topics: ["cross-border-dispute-resolution", "finance-connect", "professional-qualification"],
      materialType: "政策规划",
      tags: ["顶层规划", "一国两制", "大湾区"],
      summary: "大湾区建设的顶层规划文件，提出规则衔接、机制对接、市场一体化和国际科技创新中心等方向。",
      relationToRules: "为三地规则衔接提供总体目标和政策语境。",
      relationToMechanisms: "为跨境通办、专业资格互认、金融互联互通和平台建设提供政策基础。",
      originalUrl: "https://www.gov.cn/gongbao/content/2019/content_5370836.htm",
      citation: "《粤港澳大湾区发展规划纲要》，2019年2月18日。",
      status: "已核验",
      visibility: "公开",
      updated
    },
    body: "## 研究价值\n\n该文件是总报告的政策起点，应作为所有专题页的基础引用。"
  },
  {
    slug: "cases-batch-1",
    data: {
      title: "广东省推进粤港澳大湾区规则衔接机制对接典型案例（第一批）",
      issuer: "广东省大湾区办",
      date: "2023-04-06",
      level: "官方案例",
      regions: ["广东", "香港", "澳门"],
      topics: ["gba-lawyers-practice", "medical-products-connect", "professional-qualification", "cross-border-dispute-resolution"],
      materialType: "官方案例",
      tags: ["第一批", "20个案例"],
      summary: "第一批20个典型案例覆盖要素跨境流动、营商环境、民生融合、平台建设等领域。",
      relationToRules: "提供三地规则差异如何被标准、试点、授权和平台机制连接的实例。",
      relationToMechanisms: "集中体现互认、授权试点、跨境通办、司法协同等机制类型。",
      originalUrl: "https://www.cnbayarea.org.cn/policy/policyrelease/policies/content/post_1048576.html",
      attachmentUrl: "https://www.cnbayarea.org.cn/attachment/0/11/11245/1048608.pdf",
      citation: "广东省大湾区办：《广东省推进粤港澳大湾区规则衔接机制对接典型案例（第一批）》，2023年4月6日。",
      status: "已摘要",
      visibility: "公开",
      updated
    },
    body: "## 研究价值\n\n第一批案例适合作为网站案例库的基础样本，并支撑首批专题论文选题。"
  },
  {
    slug: "cases-batch-2",
    data: {
      title: "广东省推进粤港澳大湾区规则衔接机制对接典型案例（第二批）",
      issuer: "广东省大湾区办",
      date: "2024-05-13",
      level: "官方案例",
      regions: ["广东", "香港", "澳门"],
      topics: ["data-cross-border", "professional-qualification", "cross-border-dispute-resolution"],
      materialType: "官方案例",
      tags: ["第二批", "16个案例"],
      summary: "第二批16个典型案例覆盖要素跨境流动、民生融合、营商环境和重大平台建设。",
      relationToRules: "展示湾区认证、商事纠纷司法规则指引、河套数据跨境交易等规则衔接场景。",
      relationToMechanisms: "体现标准共建、司法协同、监管沙盒和平台试点。",
      originalUrl: "https://drc.gd.gov.cn/ywtz/content/post_4418565.html",
      attachmentUrl: "https://drc.gd.gov.cn/attachment/0/549/549298/4418565.pdf",
      citation: "广东省大湾区办：《广东省推进粤港澳大湾区规则衔接机制对接典型案例（第二批）》，2024年5月13日。",
      status: "已摘要",
      visibility: "公开",
      updated
    },
    body: "## 研究价值\n\n第二批案例应重点服务数据、认证、商事纠纷、平台建设等专题。"
  },
  {
    slug: "cases-batch-3",
    data: {
      title: "广东省推进粤港澳大湾区规则衔接机制对接典型案例（第三批）",
      issuer: "广东省大湾区办",
      date: "2025-01-23",
      level: "官方案例",
      regions: ["广东", "香港", "澳门"],
      topics: ["cross-border-dispute-resolution", "professional-qualification", "data-cross-border"],
      materialType: "官方案例",
      tags: ["第三批", "16个案例"],
      summary: "第三批16个典型案例扩展至商事调解、碳标签互认、公共交通、文体交流、公共服务和科研管理等场景。",
      relationToRules: "展示新领域的规则接口如何形成可操作安排。",
      relationToMechanisms: "体现统一规则、互认、标准共建、分线管理和科研管理衔接。",
      originalUrl: "https://drc.gd.gov.cn/ywtz/content/post_4655137.html",
      attachmentUrl: "https://drc.gd.gov.cn/attachment/0/570/570514/4655137.pdf",
      citation: "广东省大湾区办：《广东省推进粤港澳大湾区规则衔接机制对接典型案例（第三批）》，2025年1月23日。",
      status: "已摘要",
      visibility: "公开",
      updated
    },
    body: "## 研究价值\n\n第三批案例适合补充民生、产业、生态和重大平台建设的规则衔接材料。"
  }
];

const cases = [
  {
    slug: "gba-lawyers-practice-case",
    data: {
      title: "港澳律师实现在大湾区内地九市便利执业",
      batch: "第一批",
      sourceUrl: "https://www.cnbayarea.org.cn/attachment/0/11/11245/1048608.pdf",
      regions: ["广东", "香港", "澳门"],
      topics: ["gba-lawyers-practice"],
      mechanisms: ["授权试点", "互认"],
      legalBasis: "港澳律师在粤港澳大湾区内地九市执业试点相关规则。",
      innovation: "突破港澳律师不能办理内地法律事务的限制，允许取得大湾区律师执业证书的港澳律师从事一定范围内地法律实务。",
      effect: "促进港澳法律服务专业人士跨境便利执业，提升大湾区法律服务能级。",
      reproducibility: "可作为专业服务开放和资格衔接的样本。",
      risks: "执业范围、监管责任、职业保险和跨境纪律惩戒需要持续核验。",
      paperAngles: ["大湾区律师执业试点的法域接口", "港澳专业服务进入内地市场的监管协同"],
      relatedSources: ["cases-batch-1"],
      status: "已摘要",
      visibility: "评审",
      updated
    },
    body: "## 分析提示\n\n该案例适合放入法律服务专题，并与专业资格互认专题交叉引用。"
  },
  {
    slug: "medical-products-connect-case",
    data: {
      title: "港澳药械通助力健康湾区建设",
      batch: "第一批",
      sourceUrl: "https://www.cnbayarea.org.cn/attachment/0/11/11245/1048608.pdf",
      regions: ["广东", "香港", "澳门"],
      topics: ["medical-products-connect"],
      mechanisms: ["授权试点", "监管沙盒", "备案"],
      legalBasis: "国务院授权和广东省指定医疗机构使用临床急需进口药械的相关安排。",
      innovation: "允许符合条件医疗机构使用港澳已上市临床急需药品和医疗器械。",
      effect: "提升患者用药用械可及性，并推动医疗服务质量一体化。",
      reproducibility: "可作为医疗监管协作和授权试点制度研究样本。",
      risks: "审批边界、临床责任、进口品种监管和患者权益保护需要重点分析。",
      paperAngles: ["港澳药械通的授权试点结构", "跨境医疗监管协作的风险分配"],
      relatedSources: ["cases-batch-1"],
      status: "已摘要",
      visibility: "评审",
      updated
    },
    body: "## 分析提示\n\n该案例应与医疗药械规则、指定医疗机构制度和进口药械监管机制关联。"
  },
  {
    slug: "qianhai-commercial-legal-rules",
    data: {
      title: "前海创新跨境商事法律规则衔接机制对接",
      batch: "第一批",
      sourceUrl: "https://www.cnbayarea.org.cn/attachment/0/11/11245/1048608.pdf",
      regions: ["广东", "香港", "前海"],
      topics: ["cross-border-dispute-resolution"],
      mechanisms: ["特别立法", "争议解决协同", "司法协助"],
      legalBasis: "前海合作区跨境商事法律规则创新相关制度。",
      innovation: "围绕跨境商事法律服务和争议解决建立平台化、规则化衔接机制。",
      effect: "增强前海在涉港商事法律服务中的制度供给能力。",
      reproducibility: "适合比较横琴、南沙、河套等平台法治创新路径。",
      risks: "特别规则的适用边界、管辖接口和可复制性需要专家确认。",
      paperAngles: ["前海跨境商事法律规则衔接的制度模型", "合作区法治创新的授权边界"],
      relatedSources: ["cases-batch-1"],
      status: "需专家确认",
      visibility: "内部",
      updated
    },
    body: "## 分析提示\n\n该案例是跨境商事争议专题的核心平台案例。"
  },
  {
    slug: "bay-area-certification",
    data: {
      title: "湾区认证推动三地质量认证规则衔接",
      batch: "第二批",
      sourceUrl: "https://drc.gd.gov.cn/attachment/0/549/549298/4418565.pdf",
      regions: ["广东", "香港", "澳门"],
      topics: ["professional-qualification"],
      mechanisms: ["标准共建", "互认", "等效认可"],
      legalBasis: "粤港澳三地认证机构共同制定和执行湾区认证规则。",
      innovation: "在湾区标准基础上形成一次认证、三地通用的自愿性认证机制。",
      effect: "推动质量认证从标准共建走向认证结果互信。",
      reproducibility: "适合扩展至食品、医疗、消费品和专业服务认证。",
      risks: "认证责任、市场准入效力和三地监管承认程度需要持续跟踪。",
      paperAngles: ["湾区认证的规则共建机制", "标准共建到结果互认的制度路径"],
      relatedSources: ["cases-batch-2"],
      status: "已摘要",
      visibility: "评审",
      updated
    },
    body: "## 分析提示\n\n该案例可服务标准认证专题，也可支撑专业资格互认的一般机制研究。"
  },
  {
    slug: "hetao-data-cross-border-trading",
    data: {
      title: "河套率先试点数据跨境交易",
      batch: "第二批",
      sourceUrl: "https://drc.gd.gov.cn/attachment/0/549/549298/4418565.pdf",
      regions: ["广东", "香港", "河套"],
      topics: ["data-cross-border"],
      mechanisms: ["数据接口", "监管沙盒", "白名单"],
      legalBasis: "河套深港科技创新合作区数据跨境流动和交易试点安排。",
      innovation: "以合作区为场景探索数据跨境交易机制。",
      effect: "服务科研创新和数字经济要素跨境配置。",
      reproducibility: "可作为数据跨境白名单、科研数据流动和监管沙盒研究样本。",
      risks: "数据安全、个人信息保护、重要数据识别和跨境合规责任需要专家确认。",
      paperAngles: ["河套数据跨境交易的制度功能", "大湾区数据跨境白名单机制的边界"],
      relatedSources: ["cases-batch-2"],
      status: "需专家确认",
      visibility: "内部",
      updated
    },
    body: "## 分析提示\n\n该案例需要后续补充国家数据跨境流动规则、香港数据治理规则和河套专项政策。"
  },
  {
    slug: "commercial-mediation-unification",
    data: {
      title: "大湾区商事调解规则机制实现三统一一保障",
      batch: "第三批",
      sourceUrl: "https://drc.gd.gov.cn/attachment/0/570/570514/4655137.pdf",
      regions: ["广东", "香港", "澳门"],
      topics: ["cross-border-dispute-resolution"],
      mechanisms: ["争议解决协同", "标准共建", "特别立法"],
      legalBasis: "粤港澳大湾区跨境争议调解示范规则、调解员资格资历评审标准和相关地方立法安排。",
      innovation: "统一调解示范规则、统一调解员资格资历、统一合作平台，并通过地方立法强化保障。",
      effect: "推动跨境商事调解专业化和平台化。",
      reproducibility: "可作为非诉争议解决机制对接的代表性案例。",
      risks: "调解协议效力、调解员监管和三地平台协同需要进一步核验。",
      paperAngles: ["跨境商事调解规则统一的制度边界", "大湾区调解员资格互认与职业伦理"],
      relatedSources: ["cases-batch-3"],
      status: "已摘要",
      visibility: "评审",
      updated
    },
    body: "## 分析提示\n\n该案例应与跨境商事争议解决专题和三法域规则对照表直接关联。"
  }
];

const comparisons = [
  {
    slug: "gba-lawyers-practice",
    data: {
      title: "港澳律师执业规则对照",
      topics: ["gba-lawyers-practice"],
      regions: ["广东", "香港", "澳门"],
      mechanisms: ["授权试点", "互认"],
      keyQuestions: ["执业范围如何划定", "监管责任如何分配", "职业保险如何衔接"],
      relatedSources: ["cases-batch-1"],
      status: "需专家确认",
      visibility: "内部",
      updated
    },
    body: "| 事项 | 内地规则 | 香港规则 | 澳门规则 | 主要差异 | 已有机制 | 待核验问题 |\n| --- | --- | --- | --- | --- | --- | --- |\n| 执业准入 | 通过试点考试和培训后申领大湾区律师执业证 | 以香港律师专业资格和本地执业监管为基础 | 以澳门律师专业资格和本地执业监管为基础 | 法域、资格体系和监管机关不同 | 授权试点 | 执业范围和纪律处分衔接 |\n| 业务范围 | 限定办理一定范围内地法律事务 | 主要适用香港法律服务市场规则 | 主要适用澳门法律服务市场规则 | 可办理事项边界不同 | 执业证书制度 | 跨境责任保险安排 |"
  },
  {
    slug: "commercial-dispute-resolution",
    data: {
      title: "跨境商事争议解决规则对照",
      topics: ["cross-border-dispute-resolution"],
      regions: ["广东", "香港", "澳门", "前海", "横琴"],
      mechanisms: ["争议解决协同", "司法协助", "特别立法"],
      keyQuestions: ["调解规则能否统一", "仲裁与司法如何衔接", "域外法查明如何标准化"],
      relatedSources: ["cases-batch-1", "cases-batch-3"],
      status: "需专家确认",
      visibility: "内部",
      updated
    },
    body: "| 事项 | 内地规则 | 香港规则 | 澳门规则 | 主要差异 | 已有机制 | 待核验问题 |\n| --- | --- | --- | --- | --- | --- | --- |\n| 商事调解 | 以人民调解、商事调解和地方立法探索为基础 | 以普通法背景下的调解实践和机构规则为基础 | 以澳门本地法律与机构规则为基础 | 调解员资质、程序和协议效力存在差异 | 跨境争议调解示范规则 | 调解协议执行接口 |\n| 域外法查明 | 法院可通过平台和专家机制查明域外法 | 香港法需作为域外法查明进入内地审判 | 澳门法需作为域外法查明进入内地审判 | 查明责任和证明标准不同 | 域外法查明平台 | 证据标准和专家意见采信 |"
  },
  {
    slug: "data-cross-border",
    data: {
      title: "数据跨境流动规则对照",
      topics: ["data-cross-border"],
      regions: ["广东", "香港", "澳门", "河套"],
      mechanisms: ["白名单", "数据接口", "监管沙盒"],
      keyQuestions: ["科研数据如何跨境", "重要数据如何识别", "白名单是否可复制"],
      relatedSources: ["cases-batch-2"],
      status: "需专家确认",
      visibility: "内部",
      updated
    },
    body: "| 事项 | 内地规则 | 香港规则 | 澳门规则 | 主要差异 | 已有机制 | 待核验问题 |\n| --- | --- | --- | --- | --- | --- | --- |\n| 数据出境 | 受数据安全、个人信息保护和出境评估规则约束 | 以个人资料私隐保护和行业规则为基础 | 以澳门个人资料保护制度为基础 | 合规路径和监管重点不同 | 河套试点 | 试点适用数据类型 |\n| 科研数据 | 可在特定平台探索便利流动 | 科研机构具有国际合作需求 | 科研机构具有跨境合作需求 | 数据类型、主体资格和用途控制不同 | 监管沙盒 | 安全评估和责任分配 |"
  },
  {
    slug: "medical-products-connect",
    data: {
      title: "港澳药械通规则对照",
      topics: ["medical-products-connect"],
      regions: ["广东", "香港", "澳门"],
      mechanisms: ["授权试点", "监管沙盒", "备案"],
      keyQuestions: ["临床急需如何认定", "使用责任如何分配", "监管信息如何共享"],
      relatedSources: ["cases-batch-1"],
      status: "需专家确认",
      visibility: "内部",
      updated
    },
    body: "| 事项 | 内地规则 | 香港规则 | 澳门规则 | 主要差异 | 已有机制 | 待核验问题 |\n| --- | --- | --- | --- | --- | --- | --- |\n| 药械准入 | 内地药品和医疗器械注册审批为基础 | 已上市药品和公立医院采购使用器械可成为试点来源 | 已上市药品和采购使用器械可成为试点来源 | 上市审批和临床使用条件不同 | 港澳药械通 | 临床急需标准 |\n| 使用监管 | 指定医疗机构和全过程监管 | 来源地上市和使用信息支撑 | 来源地上市和使用信息支撑 | 监管链条跨法域 | 授权试点 | 不良反应信息共享 |"
  }
];

const outputs = [
  {
    slug: "general-report-outline",
    data: {
      title: "深度研究总报告目录草案",
      outputType: "深度研究总报告",
      authors: ["课题组"],
      summary: "围绕政策基础、规则差异、机制类型、专题场景、典型案例和制度建议展开。",
      keywords: ["规则衔接", "机制对接", "法制一体化"],
      topics: ["cross-border-dispute-resolution", "gba-lawyers-practice", "data-cross-border", "finance-connect"],
      relatedCases: ["commercial-mediation-unification", "gba-lawyers-practice-case", "hetao-data-cross-border-trading"],
      relatedSources: ["development-plan", "cases-batch-1", "cases-batch-2", "cases-batch-3"],
      status: "提纲中",
      visibility: "内部",
      version: "0.1",
      updated
    },
    body: "## 目录草案\n\n1. 大湾区法制一体化的问题意识\n2. 规则衔接与机制对接的制度类型\n3. 三法域规则差异和接口\n4. 重点专题分析\n5. 典型案例评估\n6. 制度建议"
  },
  {
    slug: "paper-topic-list",
    data: {
      title: "专题论文选题清单",
      outputType: "专题书目",
      authors: ["课题组"],
      summary: "将案例库和专题页转化为可写作的论文题目。",
      keywords: ["论文选题", "专题研究", "案例分析"],
      topics: ["cross-border-dispute-resolution", "gba-lawyers-practice", "medical-products-connect", "data-cross-border"],
      relatedCases: ["commercial-mediation-unification", "medical-products-connect-case", "qianhai-commercial-legal-rules"],
      relatedSources: ["cases-batch-1", "cases-batch-2", "cases-batch-3"],
      status: "选题中",
      visibility: "评审",
      version: "0.1",
      updated
    },
    body: "## 第一批论文选题\n\n- 大湾区跨境商事调解规则统一的制度边界\n- 港澳律师在内地九市执业的监管协同\n- 港澳药械通授权试点的风险治理\n- 河套数据跨境交易试点的制度功能"
  }
];

for (const entry of topics) writeEntry("topics", entry.slug, entry.data, entry.body);
for (const entry of sources) writeEntry("sources", entry.slug, entry.data, entry.body);
for (const entry of cases) writeEntry("cases", entry.slug, entry.data, entry.body);
for (const entry of comparisons) writeEntry("comparisons", entry.slug, entry.data, entry.body);
for (const entry of outputs) writeEntry("outputs", entry.slug, entry.data, entry.body);

console.log("Seeded research portal content.");
```

- [ ] **Step 2: Run seed script**

Run:

```bash
npm run content:seed
```

Expected: `Seeded research portal content.`

- [ ] **Step 3: Validate generated content with Astro**

Run:

```bash
npx astro sync
```

Expected: content schemas validate and `.astro` types are generated.

- [ ] **Step 4: Commit starter content**

Run:

```bash
git add scripts/seed-content.mjs src/content
git commit -m "feat: seed initial research content"
```

Expected: one commit containing starter content and generator script.

## Task 5: Content Helpers

**Files:**
- Create: `src/lib/content.ts`
- Test: `tests/content-helpers.test.ts`

- [ ] **Step 1: Write helper tests**

Create `tests/content-helpers.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/content-helpers.test.ts
```

Expected: FAIL because `src/lib/content.ts` does not exist.

- [ ] **Step 3: Implement helpers**

Create `src/lib/content.ts`:

```ts
type EntryWithUpdated = {
  id: string;
  data: {
    updated: Date;
  };
};

type EntryWithStatus = {
  data: {
    status: string;
  };
};

type EntryWithTopics = {
  data: {
    topics?: string[];
  };
};

export function byUpdatedDesc<T extends EntryWithUpdated>(a: T, b: T): number {
  return b.data.updated.getTime() - a.data.updated.getTime();
}

export function countByStatus<T extends EntryWithStatus>(entries: T[]): Record<string, number> {
  return entries.reduce<Record<string, number>>((counts, entry) => {
    counts[entry.data.status] = (counts[entry.data.status] ?? 0) + 1;
    return counts;
  }, {});
}

export function entriesForTopic<T extends EntryWithTopics>(entries: T[], topicSlug: string): T[] {
  return entries.filter((entry) => entry.data.topics?.includes(topicSlug));
}

export function relatedByIds<T extends { id: string }>(entries: T[], ids: string[] = []): T[] {
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  return ids.map((id) => byId.get(id)).filter((entry): entry is T => Boolean(entry));
}

export function displayDate(input: Date | string): string {
  const date = input instanceof Date ? input : new Date(input);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));
}
```

- [ ] **Step 4: Run helper tests**

Run:

```bash
npm test -- tests/content-helpers.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit helpers**

Run:

```bash
git add src/lib/content.ts tests/content-helpers.test.ts
git commit -m "feat: add content helper utilities"
```

Expected: one commit containing helper functions and tests.

## Task 6: Layout, Components, And Styling

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/StatusPill.astro`
- Create: `src/components/MetaList.astro`
- Create: `src/components/EntryCard.astro`
- Create: `src/components/MetricCard.astro`
- Create: `src/styles/global.css`

- [ ] **Step 1: Create global styles**

Create `src/styles/global.css`:

```css
:root {
  color-scheme: light;
  --bg: #f7f7f4;
  --surface: #ffffff;
  --surface-muted: #f0f3f2;
  --text: #1b1d1e;
  --muted: #5f686c;
  --line: #d9dfdc;
  --accent: #1f6f78;
  --accent-strong: #164f58;
  --red: #9f3f37;
  --gold: #a66f1f;
  --green: #3f7652;
  --shadow: 0 1px 2px rgba(20, 30, 32, 0.08);
}

* {
  box-sizing: border-box;
}

html {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: var(--bg);
  color: var(--text);
}

body {
  margin: 0;
  min-width: 320px;
}

a {
  color: var(--accent-strong);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.site-shell {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.topbar {
  border-bottom: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.92);
}

.topbar-inner,
.page,
.footer-inner {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
}

.topbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: 68px;
}

.brand {
  display: grid;
  gap: 3px;
}

.brand strong {
  font-size: 18px;
  letter-spacing: 0;
}

.brand span {
  color: var(--muted);
  font-size: 13px;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-end;
}

.nav a {
  border-radius: 6px;
  color: var(--text);
  font-size: 14px;
  padding: 8px 10px;
}

.nav a:hover {
  background: var(--surface-muted);
  text-decoration: none;
}

.page {
  padding: 30px 0 48px;
}

.page-header {
  display: grid;
  gap: 10px;
  margin-bottom: 22px;
}

.eyebrow {
  color: var(--red);
  font-size: 13px;
  font-weight: 700;
}

h1,
h2,
h3 {
  line-height: 1.25;
  letter-spacing: 0;
  margin: 0;
}

h1 {
  font-size: clamp(30px, 5vw, 52px);
  max-width: 920px;
}

h2 {
  font-size: 22px;
}

h3 {
  font-size: 17px;
}

p {
  line-height: 1.75;
}

.lede {
  color: var(--muted);
  font-size: 17px;
  max-width: 900px;
}

.grid {
  display: grid;
  gap: 14px;
}

.grid.cards {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.panel {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: 18px;
}

.entry-card {
  display: grid;
  gap: 10px;
  min-height: 190px;
}

.entry-card p {
  color: var(--muted);
  margin: 0;
}

.meta {
  color: var(--muted);
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.meta li,
.pill {
  background: var(--surface-muted);
  border-radius: 999px;
  font-size: 13px;
  line-height: 1;
  padding: 7px 9px;
}

.pill {
  color: var(--accent-strong);
  display: inline-flex;
  font-weight: 700;
}

.pill.needs-review {
  color: var(--gold);
}

.pill.private {
  color: var(--red);
}

.metric {
  display: grid;
  gap: 6px;
}

.metric strong {
  font-size: 30px;
}

.metric span {
  color: var(--muted);
  font-size: 14px;
}

.content-body {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: 24px;
}

.content-body table {
  border-collapse: collapse;
  display: block;
  max-width: 100%;
  overflow-x: auto;
}

.content-body th,
.content-body td {
  border: 1px solid var(--line);
  padding: 10px;
  text-align: left;
  vertical-align: top;
}

.content-body th {
  background: var(--surface-muted);
}

.section {
  margin-top: 28px;
}

.split {
  display: grid;
  gap: 16px;
  grid-template-columns: minmax(0, 2fr) minmax(260px, 1fr);
}

.search-tools {
  display: grid;
  gap: 10px;
  grid-template-columns: minmax(180px, 1fr) 180px;
  margin-bottom: 18px;
}

input,
select {
  border: 1px solid var(--line);
  border-radius: 6px;
  font: inherit;
  padding: 10px 12px;
}

footer {
  border-top: 1px solid var(--line);
  color: var(--muted);
  padding: 24px 0;
}

@media (max-width: 760px) {
  .topbar-inner {
    align-items: flex-start;
    flex-direction: column;
    padding: 14px 0;
  }

  .nav {
    justify-content: flex-start;
  }

  .split,
  .search-tools {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Create base layout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import "../styles/global.css";

interface Props {
  title: string;
  description?: string;
}

const { title, description = "粤港澳大湾区法制一体化研究门户" } = Astro.props;
const pageTitle = `${title} | 粤港澳大湾区法制一体化研究门户`;
---

<!doctype html>
<html lang="zh-Hans">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <title>{pageTitle}</title>
  </head>
  <body>
    <div class="site-shell">
      <header class="topbar">
        <div class="topbar-inner">
          <a class="brand" href="/">
            <strong>大湾区法制一体化研究</strong>
            <span>规则衔接 · 机制对接</span>
          </a>
          <nav class="nav" aria-label="主导航">
            <a href="/topics/">专题</a>
            <a href="/sources/">法源</a>
            <a href="/cases/">案例</a>
            <a href="/comparisons/">对照</a>
            <a href="/outputs/">成果</a>
            <a href="/search/">检索</a>
          </nav>
        </div>
      </header>
      <main class="page">
        <slot />
      </main>
      <footer>
        <div class="footer-inner">粤港澳大湾区法制一体化研究门户 · 内部研究与评审展示版本</div>
      </footer>
    </div>
  </body>
</html>
```

- [ ] **Step 3: Create display components**

Create `src/components/StatusPill.astro`:

```astro
---
interface Props {
  value: string;
}

const { value } = Astro.props;
const className = value.includes("需") ? "pill needs-review" : value.includes("内部") ? "pill private" : "pill";
---

<span class={className}>{value}</span>
```

Create `src/components/MetaList.astro`:

```astro
---
interface Props {
  items: string[];
}

const { items } = Astro.props;
---

<ul class="meta">
  {items.filter(Boolean).map((item) => <li>{item}</li>)}
</ul>
```

Create `src/components/EntryCard.astro`:

```astro
---
import MetaList from "./MetaList.astro";
import StatusPill from "./StatusPill.astro";

interface Props {
  href: string;
  title: string;
  summary: string;
  meta?: string[];
  status?: string;
}

const { href, title, summary, meta = [], status } = Astro.props;
---

<article class="panel entry-card">
  <div>
    <h3><a href={href}>{title}</a></h3>
    <p>{summary}</p>
  </div>
  {meta.length > 0 && <MetaList items={meta} />}
  {status && <StatusPill value={status} />}
</article>
```

Create `src/components/MetricCard.astro`:

```astro
---
interface Props {
  label: string;
  value: number | string;
}

const { label, value } = Astro.props;
---

<div class="panel metric">
  <strong>{value}</strong>
  <span>{label}</span>
</div>
```

- [ ] **Step 4: Commit layout and components**

Run:

```bash
git add src/layouts src/components src/styles
git commit -m "feat: add portal layout and display components"
```

Expected: one commit containing layout, components, and CSS.

## Task 7: Dashboard And Listing Pages

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/topics/index.astro`
- Create: `src/pages/sources/index.astro`
- Create: `src/pages/cases/index.astro`
- Create: `src/pages/comparisons/index.astro`
- Create: `src/pages/outputs/index.astro`

- [ ] **Step 1: Create homepage dashboard**

Create `src/pages/index.astro`:

```astro
---
import { getCollection } from "astro:content";
import EntryCard from "../components/EntryCard.astro";
import MetricCard from "../components/MetricCard.astro";
import BaseLayout from "../layouts/BaseLayout.astro";
import { byUpdatedDesc } from "../lib/content";

const topics = (await getCollection("topics")).sort(byUpdatedDesc);
const sources = (await getCollection("sources")).sort(byUpdatedDesc);
const cases = (await getCollection("cases")).sort(byUpdatedDesc);
const comparisons = (await getCollection("comparisons")).sort(byUpdatedDesc);
const outputs = (await getCollection("outputs")).sort(byUpdatedDesc);
---

<BaseLayout title="研究总览">
  <section class="page-header">
    <span class="eyebrow">研究总览</span>
    <h1>粤港澳大湾区法制一体化研究操作台</h1>
    <p class="lede">围绕规则衔接、机制对接、三法域比较、典型案例和专题论文生成建立统一资料底座。</p>
  </section>

  <section class="grid cards" aria-label="内容统计">
    <MetricCard label="专题研究" value={topics.length} />
    <MetricCard label="政策与法源" value={sources.length} />
    <MetricCard label="典型案例" value={cases.length} />
    <MetricCard label="三法域对照" value={comparisons.length} />
    <MetricCard label="研究成果" value={outputs.length} />
  </section>

  <section class="section split">
    <div>
      <h2>第一期专题</h2>
      <div class="grid cards">
        {topics.slice(0, 6).map((entry) => (
          <EntryCard
            href={`/topics/${entry.id}/`}
            title={entry.data.title}
            summary={entry.data.summary}
            meta={[entry.data.priority].concat(entry.data.mechanisms.slice(0, 2))}
            status={entry.data.status}
          />
        ))}
      </div>
    </div>
    <aside class="panel">
      <h2>近期资料</h2>
      <ul>
        {sources.slice(0, 5).map((entry) => (
          <li><a href={`/sources/${entry.id}/`}>{entry.data.title}</a></li>
        ))}
      </ul>
    </aside>
  </section>

  <section class="section">
    <h2>案例与成果</h2>
    <div class="grid cards">
      {cases.slice(0, 3).map((entry) => (
        <EntryCard
          href={`/cases/${entry.id}/`}
          title={entry.data.title}
          summary={entry.data.innovation}
          meta={[entry.data.batch].concat(entry.data.mechanisms.slice(0, 2))}
          status={entry.data.status}
        />
      ))}
      {outputs.slice(0, 2).map((entry) => (
        <EntryCard
          href={`/outputs/${entry.id}/`}
          title={entry.data.title}
          summary={entry.data.summary}
          meta={[entry.data.outputType, entry.data.version]}
          status={entry.data.status}
        />
      ))}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Create listing page factory pattern by writing each listing page**

Create `src/pages/topics/index.astro`:

```astro
---
import { getCollection } from "astro:content";
import EntryCard from "../../components/EntryCard.astro";
import BaseLayout from "../../layouts/BaseLayout.astro";
import { byUpdatedDesc } from "../../lib/content";

const entries = (await getCollection("topics")).sort(byUpdatedDesc);
---

<BaseLayout title="专题研究">
  <section class="page-header">
    <span class="eyebrow">专题研究</span>
    <h1>专题研究</h1>
    <p class="lede">每个专题都是总报告分章和论文写作的材料池。</p>
  </section>
  <div class="grid cards">
    {entries.map((entry) => (
      <EntryCard href={`/topics/${entry.id}/`} title={entry.data.title} summary={entry.data.summary} meta={[entry.data.priority].concat(entry.data.regions.slice(0, 3))} status={entry.data.status} />
    ))}
  </div>
</BaseLayout>
```

Create `src/pages/sources/index.astro`:

```astro
---
import { getCollection } from "astro:content";
import EntryCard from "../../components/EntryCard.astro";
import BaseLayout from "../../layouts/BaseLayout.astro";
import { byUpdatedDesc, displayDate } from "../../lib/content";

const entries = (await getCollection("sources")).sort(byUpdatedDesc);
---

<BaseLayout title="政策与法源库">
  <section class="page-header">
    <span class="eyebrow">资料库</span>
    <h1>政策与法源库</h1>
    <p class="lede">沉淀政策文件、规范文本、司法文件、监管规则、合作协议和官方案例来源。</p>
  </section>
  <div class="grid cards">
    {entries.map((entry) => (
      <EntryCard href={`/sources/${entry.id}/`} title={entry.data.title} summary={entry.data.summary} meta={[entry.data.materialType, entry.data.issuer, displayDate(entry.data.date)]} status={entry.data.status} />
    ))}
  </div>
</BaseLayout>
```

Create `src/pages/cases/index.astro`:

```astro
---
import { getCollection } from "astro:content";
import EntryCard from "../../components/EntryCard.astro";
import BaseLayout from "../../layouts/BaseLayout.astro";
import { byUpdatedDesc } from "../../lib/content";

const entries = (await getCollection("cases")).sort(byUpdatedDesc);
---

<BaseLayout title="典型案例库">
  <section class="page-header">
    <span class="eyebrow">案例库</span>
    <h1>典型案例库</h1>
    <p class="lede">把官方典型案例整理为可分析、可引用、可关联专题和论文的研究卡片。</p>
  </section>
  <div class="grid cards">
    {entries.map((entry) => (
      <EntryCard href={`/cases/${entry.id}/`} title={entry.data.title} summary={entry.data.innovation} meta={[entry.data.batch].concat(entry.data.mechanisms.slice(0, 2))} status={entry.data.status} />
    ))}
  </div>
</BaseLayout>
```

Create `src/pages/comparisons/index.astro`:

```astro
---
import { getCollection } from "astro:content";
import EntryCard from "../../components/EntryCard.astro";
import BaseLayout from "../../layouts/BaseLayout.astro";
import { byUpdatedDesc } from "../../lib/content";

const entries = (await getCollection("comparisons")).sort(byUpdatedDesc);
---

<BaseLayout title="三法域规则对照">
  <section class="page-header">
    <span class="eyebrow">规则对照</span>
    <h1>三法域规则对照</h1>
    <p class="lede">按专题比较内地、香港、澳门规则差异、现有机制和待核验问题。</p>
  </section>
  <div class="grid cards">
    {entries.map((entry) => (
      <EntryCard href={`/comparisons/${entry.id}/`} title={entry.data.title} summary={entry.data.keyQuestions.join("；")} meta={entry.data.mechanisms.slice(0, 3)} status={entry.data.status} />
    ))}
  </div>
</BaseLayout>
```

Create `src/pages/outputs/index.astro`:

```astro
---
import { getCollection } from "astro:content";
import EntryCard from "../../components/EntryCard.astro";
import BaseLayout from "../../layouts/BaseLayout.astro";
import { byUpdatedDesc } from "../../lib/content";

const entries = (await getCollection("outputs")).sort(byUpdatedDesc);
---

<BaseLayout title="研究成果">
  <section class="page-header">
    <span class="eyebrow">成果</span>
    <h1>研究成果</h1>
    <p class="lede">集中管理总报告、专题论文、政策简报、会议纪要、访谈摘要、文献综述和书目。</p>
  </section>
  <div class="grid cards">
    {entries.map((entry) => (
      <EntryCard href={`/outputs/${entry.id}/`} title={entry.data.title} summary={entry.data.summary} meta={[entry.data.outputType, `版本 ${entry.data.version}`]} status={entry.data.status} />
    ))}
  </div>
</BaseLayout>
```

- [ ] **Step 3: Run build to catch route issues**

Run:

```bash
npm run build
```

Expected: Astro builds the homepage and listing pages.

- [ ] **Step 4: Commit dashboard and listing pages**

Run:

```bash
git add src/pages
git commit -m "feat: add dashboard and listing pages"
```

Expected: one commit containing homepage and listing pages.

## Task 8: Detail Routes And Search

**Files:**
- Create: `src/pages/topics/[slug].astro`
- Create: `src/pages/sources/[slug].astro`
- Create: `src/pages/cases/[slug].astro`
- Create: `src/pages/comparisons/[slug].astro`
- Create: `src/pages/outputs/[slug].astro`
- Create: `src/pages/search.astro`

- [ ] **Step 1: Create topic detail route**

Create `src/pages/topics/[slug].astro`:

```astro
---
import { getCollection, render } from "astro:content";
import MetaList from "../../components/MetaList.astro";
import StatusPill from "../../components/StatusPill.astro";
import BaseLayout from "../../layouts/BaseLayout.astro";
import { displayDate } from "../../lib/content";

export async function getStaticPaths() {
  const entries = await getCollection("topics");
  return entries.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
---

<BaseLayout title={entry.data.title} description={entry.data.summary}>
  <section class="page-header">
    <span class="eyebrow">专题研究</span>
    <h1>{entry.data.title}</h1>
    <p class="lede">{entry.data.summary}</p>
    <MetaList items={[entry.data.priority, entry.data.lead, displayDate(entry.data.updated)].concat(entry.data.regions)} />
    <StatusPill value={entry.data.status} />
  </section>
  <article class="content-body">
    <Content />
  </article>
</BaseLayout>
```

- [ ] **Step 2: Create source detail route**

Create `src/pages/sources/[slug].astro`:

```astro
---
import { getCollection, render } from "astro:content";
import MetaList from "../../components/MetaList.astro";
import StatusPill from "../../components/StatusPill.astro";
import BaseLayout from "../../layouts/BaseLayout.astro";
import { displayDate } from "../../lib/content";

export async function getStaticPaths() {
  const entries = await getCollection("sources");
  return entries.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
---

<BaseLayout title={entry.data.title} description={entry.data.summary}>
  <section class="page-header">
    <span class="eyebrow">政策与法源</span>
    <h1>{entry.data.title}</h1>
    <p class="lede">{entry.data.summary}</p>
    <MetaList items={[entry.data.issuer, entry.data.materialType, displayDate(entry.data.date)].concat(entry.data.regions)} />
    <StatusPill value={entry.data.status} />
  </section>
  <section class="content-body">
    <h2>规则衔接关系</h2>
    <p>{entry.data.relationToRules}</p>
    <h2>机制对接关系</h2>
    <p>{entry.data.relationToMechanisms}</p>
    <h2>引用</h2>
    <p>{entry.data.citation}</p>
    <p><a href={entry.data.originalUrl}>原文链接</a>{entry.data.attachmentUrl && <> · <a href={entry.data.attachmentUrl}>附件</a></>}</p>
    <Content />
  </section>
</BaseLayout>
```

- [ ] **Step 3: Create case detail route**

Create `src/pages/cases/[slug].astro`:

```astro
---
import { getCollection, render } from "astro:content";
import MetaList from "../../components/MetaList.astro";
import StatusPill from "../../components/StatusPill.astro";
import BaseLayout from "../../layouts/BaseLayout.astro";
import { displayDate } from "../../lib/content";

export async function getStaticPaths() {
  const entries = await getCollection("cases");
  return entries.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
---

<BaseLayout title={entry.data.title} description={entry.data.innovation}>
  <section class="page-header">
    <span class="eyebrow">典型案例</span>
    <h1>{entry.data.title}</h1>
    <p class="lede">{entry.data.innovation}</p>
    <MetaList items={[entry.data.batch, displayDate(entry.data.updated)].concat(entry.data.mechanisms)} />
    <StatusPill value={entry.data.status} />
  </section>
  <section class="content-body">
    <h2>法律与政策依据</h2>
    <p>{entry.data.legalBasis}</p>
    <h2>实施效果</h2>
    <p>{entry.data.effect}</p>
    <h2>可复制性评价</h2>
    <p>{entry.data.reproducibility}</p>
    <h2>风险与争议</h2>
    <p>{entry.data.risks}</p>
    <h2>论文线索</h2>
    <ul>
      {entry.data.paperAngles.map((angle) => <li>{angle}</li>)}
    </ul>
    <p><a href={entry.data.sourceUrl}>案例来源</a></p>
    <Content />
  </section>
</BaseLayout>
```

- [ ] **Step 4: Create comparison and output detail routes**

Create `src/pages/comparisons/[slug].astro`:

```astro
---
import { getCollection, render } from "astro:content";
import MetaList from "../../components/MetaList.astro";
import StatusPill from "../../components/StatusPill.astro";
import BaseLayout from "../../layouts/BaseLayout.astro";
import { displayDate } from "../../lib/content";

export async function getStaticPaths() {
  const entries = await getCollection("comparisons");
  return entries.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
---

<BaseLayout title={entry.data.title}>
  <section class="page-header">
    <span class="eyebrow">三法域规则对照</span>
    <h1>{entry.data.title}</h1>
    <p class="lede">{entry.data.keyQuestions.join("；")}</p>
    <MetaList items={[displayDate(entry.data.updated)].concat(entry.data.regions)} />
    <StatusPill value={entry.data.status} />
  </section>
  <article class="content-body">
    <Content />
  </article>
</BaseLayout>
```

Create `src/pages/outputs/[slug].astro`:

```astro
---
import { getCollection, render } from "astro:content";
import MetaList from "../../components/MetaList.astro";
import StatusPill from "../../components/StatusPill.astro";
import BaseLayout from "../../layouts/BaseLayout.astro";
import { displayDate } from "../../lib/content";

export async function getStaticPaths() {
  const entries = await getCollection("outputs");
  return entries.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
---

<BaseLayout title={entry.data.title} description={entry.data.summary}>
  <section class="page-header">
    <span class="eyebrow">研究成果</span>
    <h1>{entry.data.title}</h1>
    <p class="lede">{entry.data.summary}</p>
    <MetaList items={[entry.data.outputType, `版本 ${entry.data.version}`, displayDate(entry.data.updated)]} />
    <StatusPill value={entry.data.status} />
  </section>
  <article class="content-body">
    <Content />
  </article>
</BaseLayout>
```

- [ ] **Step 5: Create client-side search page**

Create `src/pages/search.astro`:

```astro
---
import { getCollection } from "astro:content";
import BaseLayout from "../layouts/BaseLayout.astro";

const topics = await getCollection("topics");
const sources = await getCollection("sources");
const cases = await getCollection("cases");
const comparisons = await getCollection("comparisons");
const outputs = await getCollection("outputs");

const searchItems = topics
  .map((entry) => ({ type: "专题", title: entry.data.title, summary: entry.data.summary, href: `/topics/${entry.id}/`, tags: entry.data.tags }))
  .concat(sources.map((entry) => ({ type: "法源", title: entry.data.title, summary: entry.data.summary, href: `/sources/${entry.id}/`, tags: entry.data.tags })))
  .concat(cases.map((entry) => ({ type: "案例", title: entry.data.title, summary: entry.data.innovation, href: `/cases/${entry.id}/`, tags: entry.data.mechanisms })))
  .concat(comparisons.map((entry) => ({ type: "对照", title: entry.data.title, summary: entry.data.keyQuestions.join("；"), href: `/comparisons/${entry.id}/`, tags: entry.data.mechanisms })))
  .concat(outputs.map((entry) => ({ type: "成果", title: entry.data.title, summary: entry.data.summary, href: `/outputs/${entry.id}/`, tags: entry.data.keywords })));
---

<BaseLayout title="检索">
  <section class="page-header">
    <span class="eyebrow">检索</span>
    <h1>资料检索</h1>
    <p class="lede">按标题、摘要、标签和内容类型检索专题、法源、案例、规则对照和研究成果。</p>
  </section>

  <section class="panel">
    <div class="search-tools">
      <input id="q" type="search" placeholder="输入关键词" />
      <select id="type">
        <option value="">全部类型</option>
        <option value="专题">专题</option>
        <option value="法源">法源</option>
        <option value="案例">案例</option>
        <option value="对照">对照</option>
        <option value="成果">成果</option>
      </select>
    </div>
    <div id="results" class="grid cards"></div>
  </section>

  <script type="application/json" id="search-data" set:html={JSON.stringify(searchItems)} />
  <script>
    const input = document.querySelector("#q");
    const select = document.querySelector("#type");
    const results = document.querySelector("#results");
    const dataElement = document.querySelector("#search-data");
    const data = JSON.parse(dataElement.textContent || "[]");

    function render() {
      const query = input.value.trim().toLowerCase();
      const type = select.value;
      const filtered = data.filter((item) => {
        const haystack = [item.type, item.title, item.summary].concat(item.tags || []).join(" ").toLowerCase();
        return (!type || item.type === type) && (!query || haystack.includes(query));
      });

      results.innerHTML = filtered
        .map(
          (item) => `<article class="panel entry-card"><div><h3><a href="${item.href}">${item.title}</a></h3><p>${item.summary}</p></div><ul class="meta"><li>${item.type}</li></ul></article>`
        )
        .join("");
    }

    input.addEventListener("input", render);
    select.addEventListener("change", render);
    render();
  </script>
</BaseLayout>
```

- [ ] **Step 6: Build and commit detail routes**

Run:

```bash
npm run build
git add src/pages
git commit -m "feat: add detail routes and search"
```

Expected: build passes and one commit contains detail routes plus search.

## Task 9: Content Quality Gate

**Files:**
- Create: `scripts/verify-content.mjs`

- [ ] **Step 1: Create verification script**

Create `scripts/verify-content.mjs`:

```js
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
```

- [ ] **Step 2: Run content verification**

Run:

```bash
npm run content:verify
```

Expected: `Content verification passed for 22 files.`

- [ ] **Step 3: Run complete check**

Run:

```bash
npm run check
```

Expected: content verification, tests, Astro check, and Astro build all pass.

- [ ] **Step 4: Commit quality gate**

Run:

```bash
git add scripts/verify-content.mjs package.json package-lock.json
git commit -m "feat: add content verification gate"
```

Expected: one commit containing content verification script and any lockfile changes.

## Task 10: Local Browser Verification

**Files:**
- Modify only if visual verification reveals layout defects.

- [ ] **Step 1: Start local server**

Run:

```bash
npm run dev
```

Expected: local Astro dev server starts, usually at `http://127.0.0.1:4321/`.

- [ ] **Step 2: Open pages in the in-app browser**

Open:

```text
http://127.0.0.1:4321/
http://127.0.0.1:4321/topics/
http://127.0.0.1:4321/sources/
http://127.0.0.1:4321/cases/
http://127.0.0.1:4321/comparisons/
http://127.0.0.1:4321/search/
```

Expected:

- Header navigation is visible.
- Cards do not overlap.
- Search returns entries when typing `律师`, `数据`, and `药械`.
- Tables on comparison pages scroll horizontally on narrow screens.
- Mobile viewport keeps text inside cards and buttons.

- [ ] **Step 3: Fix any visual issue with focused CSS changes**

If card text overflows, modify the relevant rule in `src/styles/global.css`:

```css
.entry-card {
  overflow-wrap: anywhere;
}
```

Run:

```bash
npm run build
```

Expected: build still passes.

- [ ] **Step 4: Commit visual verification changes**

Run:

```bash
git add src/styles/global.css
git commit -m "fix: polish responsive portal layout"
```

Expected: commit is created only if CSS changed. If no CSS changed, skip this commit and record that browser verification passed.

## Task 11: Final Verification And Handoff

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update README with verified commands**

Append to `README.md`:

```md

## 已验证命令

```bash
npm run content:verify
npm test
npm run build
```

## 第一版访问入口

本地开发服务器启动后访问：

- `http://127.0.0.1:4321/`
- `http://127.0.0.1:4321/search/`
```

- [ ] **Step 2: Run final check**

Run:

```bash
npm run check
```

Expected: all checks pass.

- [ ] **Step 3: Confirm git status**

Run:

```bash
git status --short
```

Expected: either clean working tree or only intentionally uncommitted files.

- [ ] **Step 4: Commit README handoff**

Run:

```bash
git add README.md
git commit -m "docs: add local verification notes"
```

Expected: one commit containing handoff notes.

## Self-Review

- Spec coverage: The plan implements research overview, topic pages, policy and legal source pages, case pages, three-jurisdiction comparison pages, outputs, tags, statuses, visibility, content verification, and local browser verification.
- Excluded scope: Google Drive synchronization, GitHub remote publishing, public submissions, AI question answering, bilingual pages, and database admin screens are explicitly outside this first site build.
- Type consistency: Collection names are `topics`, `sources`, `cases`, `comparisons`, and `outputs` across schemas, loaders, pages, seed script, and helpers.
- Verification: The plan includes unit tests, schema validation, content verification, Astro build, and in-app browser checks.
