#!/usr/bin/env node
/**
 * Figma 变量名 → CSS 变量名，并校验唯一性。
 *
 *   node check-names.mjs tokens.json
 *   node check-names.mjs names.txt
 *
 * 输入可以是 Tokens Studio 导出的 JSON（递归取路径），
 * 或每行一个 Figma 变量名的纯文本。
 *
 * 撞名时打印冲突并以退出码 1 结束，可直接挂进构建流程。
 */

import { readFileSync } from "node:fs";

// ── 配置：按项目调整 ─────────────────────────────────────
// 层级名：整段丢弃
const LAYER_SEGMENTS = new Set(["semantic", "sem"]);
// 原始层标识：本身丢弃，但其后的类别名要保留
const CORE_SEGMENTS = new Set(["core"]);
// 语义层中可以丢弃的类别名 —— 只有 color。
// 因为 bg / text / border / action 这些用途词本身就只可能是颜色；
// radius、spacing、type 没有对应的隐含词，丢了就看不出是什么。
const IMPLIED_IN_SEMANTIC = new Set(["color"]);
// ────────────────────────────────────────────────────────

export function toCssVar(figmaName) {
  const segments = figmaName.split("/").filter(Boolean);
  const isCore = segments.some((s) => CORE_SEGMENTS.has(s.toLowerCase()));

  const kept = segments.filter((raw) => {
    const s = raw.toLowerCase();
    if (LAYER_SEGMENTS.has(s)) return false;          // 层级名一律丢弃
    if (CORE_SEGMENTS.has(s)) return false;           // core 标识本身不进名字
    if (!isCore && IMPLIED_IN_SEMANTIC.has(s)) return false; // 语义层里 color 可省
    return true;                                       // 其余一律保留
  });

  if (kept.length === 0) {
    throw new Error(`丢弃后为空，规则过于激进：${figmaName}`);
  }
  return "--" + kept.join("-").toLowerCase();
}

function collectPaths(node, prefix = []) {
  // Tokens Studio 的叶子节点带 $value 或 value
  if (node && typeof node === "object" && !Array.isArray(node)) {
    const isLeaf = "$value" in node || "value" in node;
    if (isLeaf) return [prefix.join("/")];
    return Object.entries(node).flatMap(([k, v]) => collectPaths(v, [...prefix, k]));
  }
  return prefix.length ? [prefix.join("/")] : [];
}

function loadNames(path) {
  const raw = readFileSync(path, "utf8");
  if (path.endsWith(".json")) return collectPaths(JSON.parse(raw));
  return raw.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
}

function main() {
  const path = process.argv[2];
  if (!path) {
    console.error("用法：node check-names.mjs <tokens.json | names.txt>");
    process.exit(2);
  }

  const names = loadNames(path);
  const byCss = new Map();

  for (const figmaName of names) {
    const cssVar = toCssVar(figmaName);
    if (!byCss.has(cssVar)) byCss.set(cssVar, []);
    byCss.get(cssVar).push(figmaName);
  }

  const collisions = [...byCss.entries()].filter(([, sources]) => sources.length > 1);

  for (const [cssVar, sources] of byCss) {
    if (sources.length === 1) console.log(`${sources[0].padEnd(44)} → ${cssVar}`);
  }

  if (collisions.length === 0) {
    console.log(`\n✓ ${names.length} 个 token，无撞名`);
    process.exit(0);
  }

  console.error(`\n✗ 发现 ${collisions.length} 处撞名：\n`);
  for (const [cssVar, sources] of collisions) {
    console.error(`  ${cssVar}`);
    for (const s of sources) console.error(`    ← ${s}`);
    console.error("");
  }
  console.error("修复方式：把能区分它们的那一段加回去（例如 --ui-text-primary / --read-text-primary），");
  console.error("不要给其中一个临时改名。\n");
  process.exit(1);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
