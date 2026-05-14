import { formatMatchClock } from "../lib/formatMatchClock";
import { safeScore } from "../lib/safeNumber";
import type { LiveMatchDetails } from "../types/football";
import { TeamBadge } from "./TeamBadge";

interface CompactScoreCardProps {
  match: LiveMatchDetails;
  onExpand: () => void;
  onChooseMatch: () => void;
}

export function CompactScoreCard({ match, onExpand, onChooseMatch }: CompactScoreCardProps) {
  const clock = formatMatchClock(match.status, match.elapsedMinute, match.addedTime);

  return (
    <button
      className="group w-full rounded-[1.35rem] border border-white/10 bg-slate-950/85 p-3 text-left shadow-widget outline-none backdrop-blur-xl transition hover:border-emerald-300/30 hover:bg-slate-900/90 focus-visible:ring-2 focus-visible:ring-emerald-300"
      onClick={onExpand}
      type="button"
    >
      <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em] text-slate-300">
        <span className="flex items-center gap-1.5 text-emerald-300"><span className="size-2 rounded-full bg-emerald-400" />LIVE</span>
        <span>{clock}</span>
      </div>
      <div className="space-y-1.5">
        <div className="grid grid-cols-[1fr_auto] items-center gap-3">
          <TeamBadge team={match.homeTeam} />
          <span className="text-2xl font-black tabular-nums text-white">{safeScore(match.homeScore)}</span>
        </div>
        <div className="grid grid-cols-[1fr_auto] items-center gap-3">
          <TeamBadge team={match.awayTeam} />
          <span className="text-2xl font-black tabular-nums text-white">{safeScore(match.awayScore)}</span>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-slate-400">
        <span className="truncate">{match.competitionName ?? "Live match"}</span>
        {match.status === "FT" ? (
          <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold text-slate-200" onClick={(event) => { event.stopPropagation(); onChooseMatch(); }}>
            Change
          </span>
        ) : (
          <span>Updated {new Date(match.lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        )}
      </div>
    </button>
  );
}
