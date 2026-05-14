import type { LiveMatchDetails, LiveMatchSummary } from "../types/football";

const now = () => new Date().toISOString();

export const mockLiveMatches: LiveMatchSummary[] = [
  {
    id: "mock-mun-che",
    competitionName: "Premier League",
    homeTeam: { id: "mun", name: "Manchester United", shortName: "Man United" },
    awayTeam: { id: "che", name: "Chelsea", shortName: "Chelsea" },
    homeScore: 2,
    awayScore: 1,
    status: "LIVE",
    elapsedMinute: 64,
    lastUpdated: now(),
  },
  {
    id: "mock-bar-atm",
    competitionName: "LaLiga",
    homeTeam: { id: "bar", name: "Barcelona", shortName: "Barcelona" },
    awayTeam: { id: "atm", name: "Atlético Madrid", shortName: "Atlético" },
    homeScore: 1,
    awayScore: 1,
    status: "HT",
    elapsedMinute: 45,
    lastUpdated: now(),
  },
  {
    id: "mock-psg-lyo",
    competitionName: "Ligue 1",
    homeTeam: { id: "psg", name: "Paris Saint-Germain", shortName: "PSG" },
    awayTeam: { id: "lyo", name: "Lyon", shortName: "Lyon" },
    homeScore: 3,
    awayScore: 2,
    status: "FT",
    elapsedMinute: 90,
    lastUpdated: now(),
  },
];

export const mockDetails: LiveMatchDetails[] = [
  {
    ...mockLiveMatches[0],
    venue: "Old Trafford",
    referee: "M. Oliver",
    stats: {
      possessionHome: 54,
      possessionAway: 46,
      shotsHome: 11,
      shotsAway: 7,
      shotsOnTargetHome: 5,
      shotsOnTargetAway: 3,
      cornersHome: 4,
      cornersAway: 2,
      yellowCardsHome: 1,
      yellowCardsAway: 2,
      redCardsHome: 0,
      redCardsAway: 0,
    },
    goalScorers: [
      { teamId: "mun", playerName: "Bruno Fernandes", minute: 12, goalType: "OPEN_PLAY" },
      { teamId: "che", playerName: "Cole Palmer", minute: 39, goalType: "OPEN_PLAY" },
      { teamId: "mun", playerName: "Rasmus Højlund", minute: 58, goalType: "OPEN_PLAY" },
    ],
    events: [
      { id: "e5", minute: 58, teamId: "mun", playerName: "Rasmus Højlund", type: "GOAL", description: "Goal - Rasmus Højlund" },
      { id: "e4", minute: 52, teamId: "che", playerName: "Moisés Caicedo", type: "YELLOW_CARD", description: "Yellow card - Moisés Caicedo" },
      { id: "e3", minute: 46, teamId: "che", type: "SUBSTITUTION", description: "Chelsea substitution" },
      { id: "e2", minute: 39, teamId: "che", playerName: "Cole Palmer", type: "GOAL", description: "Goal - Cole Palmer" },
      { id: "e1", minute: 12, teamId: "mun", playerName: "Bruno Fernandes", type: "GOAL", description: "Goal - Bruno Fernandes" },
    ],
  },
  {
    ...mockLiveMatches[1],
    venue: "Estadi Olímpic Lluís Companys",
    stats: { possessionHome: 61, possessionAway: 39, shotsHome: 8, shotsAway: 5, shotsOnTargetHome: 3, shotsOnTargetAway: 2, cornersHome: 5, cornersAway: 1 },
    goalScorers: [
      { teamId: "bar", playerName: "Robert Lewandowski", minute: 21 },
      { teamId: "atm", playerName: "Antoine Griezmann", minute: 44, goalType: "PENALTY" },
    ],
    events: [
      { id: "b3", minute: 45, type: "HALF_TIME", description: "Half time" },
      { id: "b2", minute: 44, teamId: "atm", playerName: "Antoine Griezmann", type: "PENALTY_GOAL", description: "Penalty goal - Antoine Griezmann" },
      { id: "b1", minute: 21, teamId: "bar", playerName: "Robert Lewandowski", type: "GOAL", description: "Goal - Robert Lewandowski" },
    ],
  },
  {
    ...mockLiveMatches[2],
    goalScorers: [],
    events: [{ id: "p1", minute: 90, type: "FULL_TIME", description: "Full time" }],
  },
];
