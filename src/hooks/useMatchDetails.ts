import { useQuery } from "@tanstack/react-query";
import { getMatchDetails } from "../services/footballApiClient";
import type { MatchStatus } from "../types/football";

export function getPollingInterval(status?: MatchStatus, expanded?: boolean) {
  if (!status) return false;
  if (status === "FT") return false;
  if (status === "HT") return 60_000;
  if (status === "LIVE") return expanded ? 30_000 : 15_000;
  return 60_000;
}

export function useMatchDetails(selectedMatchId?: string, isExpanded = false) {
  return useQuery({
    queryKey: ["match-details", selectedMatchId],
    queryFn: () => getMatchDetails(selectedMatchId!),
    enabled: Boolean(selectedMatchId),
    refetchInterval: (query) => getPollingInterval(query.state.data?.status, isExpanded),
    retry: 3,
    staleTime: 5_000,
  });
}
