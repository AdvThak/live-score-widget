import type { MatchEventType } from "../types/football";

export const eventIcons: Record<MatchEventType, string> = {
  GOAL: "⚽",
  OWN_GOAL: "🥅",
  PENALTY_GOAL: "⚽",
  MISSED_PENALTY: "❌",
  YELLOW_CARD: "🟨",
  RED_CARD: "🟥",
  SUBSTITUTION: "🔁",
  VAR: "📺",
  HALF_TIME: "⏸️",
  FULL_TIME: "🏁",
  OTHER: "•",
};
