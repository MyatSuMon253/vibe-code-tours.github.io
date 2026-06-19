// Single source of truth for chapter-level borders on builder cards.
// Imported by: src/components/BuilderCard.astro (render).
//
// Levels are NOT self-declared. They come from the cohort progression DB
// (Discord `ch-N-done` roles -> chapter_progress.passed_at) and are exported
// to src/data/levels.json by the bot (channels/scripts/export-levels.mjs),
// keyed by lowercased GitHub login. Students cannot forge their level.
//
// src/data/levels.json shape: { "<github-login-lowercased>": <0..8> }

import levelData from "../data/levels.json";

// level -> { label, color }. color drives the card border + glow.
// ch-0 = setup done (neutral) ... ch-8 = top (gold).
export const LEVELS = {
  0: { label: "Ch 0", color: "#94a3b8" }, // slate
  1: { label: "Ch 1", color: "#34d399" }, // emerald
  2: { label: "Ch 2", color: "#2dd4bf" }, // teal
  3: { label: "Ch 3", color: "#22d3ee" }, // cyan
  4: { label: "Ch 4", color: "#38bdf8" }, // sky
  5: { label: "Ch 5", color: "#818cf8" }, // indigo
  6: { label: "Ch 6", color: "#a78bfa" }, // violet
  7: { label: "Ch 7", color: "#e879f9" }, // fuchsia
  8: { label: "Ch 8", color: "#f59e0b" }, // amber / gold
};

export const MAX_LEVEL = 8;

// Highest passed chapter for a github handle, or null if none / not found.
export function levelOf(github) {
  if (!github) return null;
  const v = levelData[String(github).toLowerCase()];
  const n = Number(v);
  if (!Number.isInteger(n) || n < 0 || n > MAX_LEVEL) return null;
  return n;
}

// Render metadata for a level int, or null.
export function levelMeta(level) {
  if (level == null) return null;
  return LEVELS[level] ?? null;
}
