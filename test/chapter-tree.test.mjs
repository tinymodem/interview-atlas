import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("chapter tree stays client-safe and consumes precomputed href values", () => {
  const source = readFileSync(new URL("../src/components/ChapterTree.tsx", import.meta.url), "utf8");

  assert.equal(source.includes("@/lib/seo"), false);
  assert.equal(source.includes("question.href"), true);
  assert.equal(source.includes("/q/${question.id}"), false);
});
