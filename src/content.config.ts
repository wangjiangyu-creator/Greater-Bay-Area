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
