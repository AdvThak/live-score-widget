import { formatMatchClock } from "../lib/formatMatchClock";
import { safeScore } from "../lib/safeNumber";
import type { LiveMatchDetails } from "../types/football";
import { MatchEventTimeline } from "./MatchEventTimeline";
import { MatchStatsGrid } from "./MatchStatsGrid";
import { TeamBadge } from "./TeamBadge";

interface ExpandedMatchPanelProps {
  match: LiveMatchDetails;
  isFetching: boolean;
  onCollapse: () => void;
  onChooseMatch: () => void;
  alwaysOnTop: boolean;
  onToggleAlwaysOnTop: () => void;
}

export function ExpandedMatchPanel({ match, isFetching, onCollapse, onChooseMatch, alwaysOnTop, onToggleAlwaysOnTop }: ExpandedMatchPanelProps) {
  const clock = formatMatchClock(match.status, match.elapsedMinute, match.addedTime);

  return (
    <section className="max-h-[640px] w-full overflow-hidden rounded-[1.6rem] border border-white/10 bg-slate-950/90 p-4 text-white shadow-widget backdrop-blur-xl">
      <header className="mb-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-200">{clock} | {match.competitionName ?? "Live"}</span>
          <div className="flex items-center gap-2">
            <button className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/20" onClick={onToggleAlwaysOnTop} type="button">
              {alwaysOnTop ? "On top" : "Normal"}
            </button>
            <button className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/20" onClick={onCollapse} type="button">
              Collapse
            </button>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl bg-white/[0.04] p-3">
          <TeamBadge team={match.homeTeam} />
          <div className="text-center text-3xl font-black tabular-nums">{safeScore(match.homeScore)} - {safeScore(match.awayScore)}</div>
          <TeamBadge team={match.awayTeam} align="right" />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
          {match.venue ? <span>{match.venue}</span> : null}
          {match.referee ? <span>Referee: {match.referee}</span> : null}
          <span>{isFetching ? "Refreshing…" : `Updated ${new Date(match.lastUpdated).toLocaleTimeString()}`}</span>
        </div>
      </header>

      <div className="max-h-[490px] space-y-4 overflow-y-auto pr-1">
        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-300">Goals</h2>
            {match.status === "FT" ? <button className="text-xs font-semibold text-emerald-200 hover:text-emerald-100" onClick={onChooseMatch} type="button">Choose another live game</button> : null}
          </div>
          {match.goalScorers.length === 0 ? (
            <p className="rounded-2xl bg-white/[0.04] p-3 text-sm text-slate-400">No goals reported.</p>
          ) : (
            <div className="space-y-2">
              {match.goalScorers.map((goal) => (
                <div className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2 text-sm" key={`${goal.teamId}-${goal.playerName}-${goal.minute}`}>
                  <span>{goal.playerName}</span>
                  <span className="font-semibold text-emerald-200">{goal.minute ? `${goal.minute}'` : "—"}</span>
                </div>
              ))}
            </div>
          )}
        </section>
        <section>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-slate-300">Stats</h2>
          <MatchStatsGrid stats={match.stats} />
        </section>
        <section>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-slate-300">Events</h2>
          <MatchEventTimeline events={match.events} />
        </section>
      </div>
    </section>
  );
}
