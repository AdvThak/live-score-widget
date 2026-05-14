import type { MatchStatus } from "../types/football";

export function normalizeStatus(status?: string): MatchStatus {
  switch (status?.toUpperCase()) {
    case "1H":
    case "2H":
    case "LIVE":
      return "LIVE";
    case "HT":
      return "HT";
    case "FT":
    case "AET":
      return "FT";
    case "ET":
      return "ET";
    case "PEN":
      return "PEN";
    case "PST":
    case "POSTPONED":
      return "POSTPONED";
    case "SUSP":
    case "INT":
      return "SUSPENDED";
    case "NS":
      return "NS";
    default:
      return "UNKNOWN";
  }
}
