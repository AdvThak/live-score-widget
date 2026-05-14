import type { MatchStatus } from "../types/football";

export function formatMatchClock(status?: MatchStatus, minute?: number, addedTime?: number) {
  if (!status) return "--";
  if (status === "LIVE" || status === "ET") {
    if (!minute) return status === "ET" ? "ET" : "LIVE";
    return addedTime ? `${minute}+${addedTime}'` : `${minute}'`;
  }
  if (status === "HT") return "HT";
  if (status === "FT") return "FT";
  if (status === "PEN") return "Pens";
  if (status === "NS") return "Not started";
  return status.toLowerCase().replace("_", " ");
}
