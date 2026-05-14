import { useQuery } from "@tanstack/react-query";
import { getLiveMatches } from "../services/footballApiClient";

export function useLiveMatches(enabled = true) {
  return useQuery({
    queryKey: ["live-matches"],
    queryFn: getLiveMatches,
    enabled,
    staleTime: 10_000,
    refetchInterval: enabled ? 30_000 : false,
    retry: 2,
  });
}
