import { statPair } from "../lib/safeNumber";
import type { MatchStats } from "../types/football";

const statRows = (stats: MatchStats) => [
  ["Possession", statPair(stats.possessionHome, stats.possessionAway, "%")],
  ["Shots", statPair(stats.shotsHome, stats.shotsAway)],
  ["On target", statPair(stats.shotsOnTargetHome, stats.shotsOnTargetAway)],
  ["Corners", statPair(stats.cornersHome, stats.cornersAway)],
  ["Yellow cards", statPair(stats.yellowCardsHome, stats.yellowCardsAway)],
  ["Red cards", statPair(stats.redCardsHome, stats.redCardsAway)],
];

export function MatchStatsGrid({ stats }: { stats?: MatchStats }) {
  if (!stats) {
    return <p className="rounded-2xl bg-white/[0.04] p-4 text-sm text-slate-400">Detailed stats are not available for this match yet.</p>;
  }

  return (
    <div className="grid gap-2">
      {statRows(stats).map(([label, value]) => (
        <div className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2 text-sm" key={label}>
          <span className="text-slate-400">{label}</span>
          <span className="font-semibold tabular-nums text-white">{value}</span>
        </div>
      ))}
    </div>
  );
}
