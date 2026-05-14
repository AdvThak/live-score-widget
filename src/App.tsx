import { useState } from "react";
import { AddLiveGameModal } from "./components/AddLiveGameModal";
import { CompactScoreCard } from "./components/CompactScoreCard";
import { ErrorState } from "./components/ErrorState";
import { ExpandedMatchPanel } from "./components/ExpandedMatchPanel";
import { LoadingState } from "./components/LoadingState";
import { WidgetShell } from "./components/WidgetShell";
import { useMatchDetails } from "./hooks/useMatchDetails";
import { useSelectedMatch } from "./hooks/useSelectedMatch";

export function App() {
  const [expanded, setExpanded] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const { settings, updateSettings, selectedMatchId, selectMatch, clearMatch, isLoading: settingsLoading } = useSelectedMatch();
  const matchQuery = useMatchDetails(selectedMatchId, expanded);

  const chooseMatch = async (matchId: string) => {
    await selectMatch(matchId);
    setExpanded(false);
    setPickerOpen(false);
  };

  return (
    <WidgetShell expanded={expanded} onSettingsChange={(nextSettings) => void updateSettings(nextSettings)} settings={settings}>
      {settingsLoading ? <LoadingState message="Loading widget settings…" /> : null}
      {!settingsLoading && !selectedMatchId ? (
        <section className="rounded-[1.35rem] border border-white/10 bg-slate-950/85 p-4 shadow-widget backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-200">Live scores</span>
            <span className="text-xs text-slate-500">Mock v1</span>
          </div>
          <h1 className="text-lg font-black text-white">Track a live match</h1>
          <p className="mt-1 text-xs text-slate-400">No game selected. Add a live game to start polling safely.</p>
          <button className="mt-4 w-full rounded-2xl bg-emerald-300 px-4 py-2 text-sm font-black text-slate-950 hover:bg-emerald-200" onClick={() => setPickerOpen(true)} type="button">
            Add live game
          </button>
        </section>
      ) : null}

      {selectedMatchId && matchQuery.isLoading ? <LoadingState /> : null}
      {selectedMatchId && matchQuery.error ? (
        <ErrorState
          message={matchQuery.error instanceof Error ? matchQuery.error.message : "This match is no longer available. Choose another live game."}
          actionLabel="Choose another live game"
          onAction={() => {
            void clearMatch();
            setPickerOpen(true);
          }}
        />
      ) : null}
      {matchQuery.data && !expanded ? <CompactScoreCard match={matchQuery.data} onChooseMatch={() => setPickerOpen(true)} onExpand={() => setExpanded(true)} /> : null}
      {matchQuery.data && expanded ? (
        <ExpandedMatchPanel
          isFetching={matchQuery.isFetching}
          alwaysOnTop={settings.alwaysOnTop}
          match={matchQuery.data}
          onChooseMatch={() => setPickerOpen(true)}
          onCollapse={() => setExpanded(false)}
          onToggleAlwaysOnTop={() => void updateSettings({ ...settings, alwaysOnTop: !settings.alwaysOnTop })}
        />
      ) : null}

      <AddLiveGameModal
        onClose={() => setPickerOpen(false)}
        onSelect={(match) => void chooseMatch(match.id)}
        open={pickerOpen}
      />
    </WidgetShell>
  );
}
