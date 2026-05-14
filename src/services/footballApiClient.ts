import { invoke } from "@tauri-apps/api/core";
import type { LiveMatchDetails, LiveMatchSummary } from "../types/football";
import { mockDetails, mockLiveMatches } from "./mockData";

const isTauriRuntime = () => typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

export async function getLiveMatches(): Promise<LiveMatchSummary[]> {
  if (!isTauriRuntime()) return mockLiveMatches.map((match) => ({ ...match, lastUpdated: new Date().toISOString() }));
  return invoke<LiveMatchSummary[]>("get_live_matches");
}

export async function getMatchDetails(matchId: string): Promise<LiveMatchDetails> {
  if (!isTauriRuntime()) {
    const match = mockDetails.find((details) => details.id === matchId);
    if (!match) throw new Error("This match is no longer available. Choose another live game.");
    return { ...match, lastUpdated: new Date().toISOString() };
  }
  return invoke<LiveMatchDetails>("get_match_details", { matchId });
}
