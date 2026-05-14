export type MatchStatus =
  | "NS"
  | "LIVE"
  | "HT"
  | "FT"
  | "ET"
  | "PEN"
  | "POSTPONED"
  | "SUSPENDED"
  | "UNKNOWN";

export interface TeamInfo {
  id: string;
  name: string;
  shortName?: string;
  logoUrl?: string;
}

export interface LiveMatchSummary {
  id: string;
  competitionName?: string;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  homeScore: number | null;
  awayScore: number | null;
  status: MatchStatus;
  elapsedMinute?: number;
  addedTime?: number;
  lastUpdated: string;
}

export type MatchEventType =
  | "GOAL"
  | "OWN_GOAL"
  | "PENALTY_GOAL"
  | "MISSED_PENALTY"
  | "YELLOW_CARD"
  | "RED_CARD"
  | "SUBSTITUTION"
  | "VAR"
  | "HALF_TIME"
  | "FULL_TIME"
  | "OTHER";

export interface MatchEvent {
  id: string;
  minute?: number;
  addedTime?: number;
  teamId?: string;
  playerName?: string;
  assistName?: string;
  type: MatchEventType;
  description: string;
}

export interface MatchStats {
  possessionHome?: number;
  possessionAway?: number;
  shotsHome?: number;
  shotsAway?: number;
  shotsOnTargetHome?: number;
  shotsOnTargetAway?: number;
  cornersHome?: number;
  cornersAway?: number;
  yellowCardsHome?: number;
  yellowCardsAway?: number;
  redCardsHome?: number;
  redCardsAway?: number;
}

export interface GoalScorer {
  teamId: string;
  playerName: string;
  minute?: number;
  addedTime?: number;
  goalType?: "OPEN_PLAY" | "PENALTY" | "OWN_GOAL" | "UNKNOWN";
}

export interface LiveMatchDetails extends LiveMatchSummary {
  venue?: string;
  referee?: string;
  stats?: MatchStats;
  events: MatchEvent[];
  goalScorers: GoalScorer[];
}
