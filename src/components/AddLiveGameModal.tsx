import { useMemo, useState } from "react";
import { formatMatchClock } from "../lib/formatMatchClock";
import { safeScore } from "../lib/safeNumber";
import { useLiveMatches } from "../hooks/useLiveMatches";
import type { LiveMatchSummary } from "../types/football";
import { ErrorState } from "./ErrorState";
import { LoadingState } from "./LoadingState";

interface AddLiveGameModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (match: LiveMatchSummary) => void;
}

export function AddLiveGameModal({ open, onClose, onSelect }: AddLiveGameModalProps) {
  const [search, setSearch] = useState("");
  const { data, isLoading, error, refetch } = useLiveMatches(open);

  const filteredMatches = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return data ?? [];
    return (data ?? []).filter((match) =>
      [match.homeTeam.name, match.awayTeam.name, match.competitionName].filter(Boolean).some((value) => value!.toLowerCase().includes(query)),
    );
  }, [data, search]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-20 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
      <section className="w-full max-w-md rounded-[1.5rem] border border-white/10 bg-slate-950 p-4 text-white shadow-widget">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black">Add live game</h2>
            <p className="text-xs text-slate-400">Search current live fixtures from the secure backend.</p>
          </div>
          <button className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20" onClick={onClose} type="button">Close</button>
        </header>
        <input
          className="mb-3 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm outline-none ring-emerald-300/0 transition placeholder:text-slate-500 focus:border-emerald-300/40 focus:ring-2"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search team or competition"
          value={search}
        />
        {isLoading ? <LoadingState message="Finding live matches…" /> : null}
        {error ? <ErrorState message={error instanceof Error ? error.message : "Unable to load live matches."} actionLabel="Retry" onAction={() => void refetch()} /> : null}
        {!isLoading && !error && filteredMatches.length === 0 ? (
          <div className="rounded-2xl bg-white/[0.04] p-4 text-sm text-slate-400">No live matches found right now. Try again later.</div>
        ) : null}
        <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
          {filteredMatches.map((match) => (
            <button
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-left transition hover:border-emerald-300/30 hover:bg-white/[0.08]"
              key={match.id}
              onClick={() => onSelect(match)}
              type="button"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{match.competitionName ?? "Live match"}</span>
                <span>{formatMatchClock(match.status, match.elapsedMinute, match.addedTime)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3 text-sm font-semibold text-white">
                <span className="truncate">{match.homeTeam.shortName ?? match.homeTeam.name}</span>
                <span className="shrink-0 text-base font-black tabular-nums">{safeScore(match.homeScore)} - {safeScore(match.awayScore)}</span>
                <span className="truncate text-right">{match.awayTeam.shortName ?? match.awayTeam.name}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
