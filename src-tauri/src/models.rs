use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum MatchStatus {
    Ns,
    Live,
    Ht,
    Ft,
    Et,
    Pen,
    Postponed,
    Suspended,
    Unknown,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TeamInfo {
    pub id: String,
    pub name: String,
    pub short_name: Option<String>,
    pub logo_url: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LiveMatchSummary {
    pub id: String,
    pub competition_name: Option<String>,
    pub home_team: TeamInfo,
    pub away_team: TeamInfo,
    pub home_score: Option<i32>,
    pub away_score: Option<i32>,
    pub status: MatchStatus,
    pub elapsed_minute: Option<i32>,
    pub added_time: Option<i32>,
    pub last_updated: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum MatchEventType {
    Goal,
    OwnGoal,
    PenaltyGoal,
    MissedPenalty,
    YellowCard,
    RedCard,
    Substitution,
    Var,
    HalfTime,
    FullTime,
    Other,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MatchEvent {
    pub id: String,
    pub minute: Option<i32>,
    pub added_time: Option<i32>,
    pub team_id: Option<String>,
    pub player_name: Option<String>,
    pub assist_name: Option<String>,
    #[serde(rename = "type")]
    pub event_type: MatchEventType,
    pub description: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct MatchStats {
    pub possession_home: Option<i32>,
    pub possession_away: Option<i32>,
    pub shots_home: Option<i32>,
    pub shots_away: Option<i32>,
    pub shots_on_target_home: Option<i32>,
    pub shots_on_target_away: Option<i32>,
    pub corners_home: Option<i32>,
    pub corners_away: Option<i32>,
    pub yellow_cards_home: Option<i32>,
    pub yellow_cards_away: Option<i32>,
    pub red_cards_home: Option<i32>,
    pub red_cards_away: Option<i32>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum GoalType {
    OpenPlay,
    Penalty,
    OwnGoal,
    Unknown,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GoalScorer {
    pub team_id: String,
    pub player_name: String,
    pub minute: Option<i32>,
    pub added_time: Option<i32>,
    pub goal_type: Option<GoalType>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LiveMatchDetails {
    #[serde(flatten)]
    pub summary: LiveMatchSummary,
    pub venue: Option<String>,
    pub referee: Option<String>,
    pub stats: Option<MatchStats>,
    pub events: Vec<MatchEvent>,
    pub goal_scorers: Vec<GoalScorer>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct WindowPosition {
    pub x: i32,
    pub y: i32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct WindowSize {
    pub width: i32,
    pub height: i32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum ThemePreference {
    Dark,
    Light,
    System,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UserSettings {
    pub selected_match_id: Option<String>,
    pub window_position: Option<WindowPosition>,
    pub window_size: Option<WindowSize>,
    pub always_on_top: bool,
    pub opacity: f64,
    pub theme: ThemePreference,
}

impl Default for UserSettings {
    fn default() -> Self {
        Self {
            selected_match_id: None,
            window_position: None,
            window_size: Some(WindowSize {
                width: 260,
                height: 120,
            }),
            always_on_top: true,
            opacity: 0.95,
            theme: ThemePreference::Dark,
        }
    }
}

pub fn normalize_status(api_status: &str) -> MatchStatus {
    match api_status {
        "1H" | "2H" | "LIVE" => MatchStatus::Live,
        "HT" => MatchStatus::Ht,
        "FT" | "AET" => MatchStatus::Ft,
        "ET" => MatchStatus::Et,
        "PEN" => MatchStatus::Pen,
        "PST" => MatchStatus::Postponed,
        "SUSP" | "INT" => MatchStatus::Suspended,
        "NS" => MatchStatus::Ns,
        _ => MatchStatus::Unknown,
    }
}
