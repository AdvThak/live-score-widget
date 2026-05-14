export function safeScore(score: number | null | undefined) {
  return score ?? "-";
}

export function statPair(home?: number, away?: number, suffix = "") {
  if (home === undefined || away === undefined) return "—";
  return `${home}${suffix} - ${away}${suffix}`;
}
