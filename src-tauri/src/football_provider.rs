use crate::models::{
    normalize_status, GoalScorer, GoalType, LiveMatchDetails, LiveMatchSummary, MatchEvent,
    MatchEventType, MatchStats, TeamInfo,
};

fn now_iso() -> String {
    // Good enough for normalized mock payloads; real providers should use their server timestamp.
    "2026-05-14T12:00:00.000Z".to_string()
}

fn team(id: &str, name: &str, short_name: &str) -> TeamInfo {
    TeamInfo {
        id: id.to_string(),
        name: name.to_string(),
        short_name: Some(short_name.to_string()),
        logo_url: None,
    }
}

pub async fn get_live_matches() -> Result<Vec<LiveMatchSummary>, String> {
    Ok(vec![
        LiveMatchSummary {
            id: "mock-mun-che".to_string(),
            competition_name: Some("Premier League".to_string()),
            home_team: team("mun", "Manchester United", "Man United"),
            away_team: team("che", "Chelsea", "Chelsea"),
            home_score: Some(2),
            away_score: Some(1),
            status: normalize_status("LIVE"),
            elapsed_minute: Some(64),
            added_time: None,
            last_updated: now_iso(),
        },
        LiveMatchSummary {
            id: "mock-bar-atm".to_string(),
            competition_name: Some("LaLiga".to_string()),
            home_team: team("bar", "Barcelona", "Barcelona"),
            away_team: team("atm", "Atlético Madrid", "Atlético"),
            home_score: Some(1),
            away_score: Some(1),
            status: normalize_status("HT"),
            elapsed_minute: Some(45),
            added_time: None,
            last_updated: now_iso(),
        },
        LiveMatchSummary {
            id: "mock-psg-lyo".to_string(),
            competition_name: Some("Ligue 1".to_string()),
            home_team: team("psg", "Paris Saint-Germain", "PSG"),
            away_team: team("lyo", "Lyon", "Lyon"),
            home_score: Some(3),
            away_score: Some(2),
            status: normalize_status("FT"),
            elapsed_minute: Some(90),
            added_time: None,
            last_updated: now_iso(),
        },
    ])
}

pub async fn get_match_details(match_id: &str) -> Result<LiveMatchDetails, String> {
    let summary = get_live_matches()
        .await?
        .into_iter()
        .find(|match_summary| match_summary.id == match_id)
        .ok_or_else(|| {
            "This match is no longer available. Choose another live game.".to_string()
        })?;

    let details = match match_id {
        "mock-mun-che" => LiveMatchDetails {
            summary,
            venue: Some("Old Trafford".to_string()),
            referee: Some("M. Oliver".to_string()),
            stats: Some(MatchStats {
                possession_home: Some(54),
                possession_away: Some(46),
                shots_home: Some(11),
                shots_away: Some(7),
                shots_on_target_home: Some(5),
                shots_on_target_away: Some(3),
                corners_home: Some(4),
                corners_away: Some(2),
                yellow_cards_home: Some(1),
                yellow_cards_away: Some(2),
                red_cards_home: Some(0),
                red_cards_away: Some(0),
            }),
            goal_scorers: vec![
                GoalScorer {
                    team_id: "mun".to_string(),
                    player_name: "Bruno Fernandes".to_string(),
                    minute: Some(12),
                    added_time: None,
                    goal_type: Some(GoalType::OpenPlay),
                },
                GoalScorer {
                    team_id: "che".to_string(),
                    player_name: "Cole Palmer".to_string(),
                    minute: Some(39),
                    added_time: None,
                    goal_type: Some(GoalType::OpenPlay),
                },
                GoalScorer {
                    team_id: "mun".to_string(),
                    player_name: "Rasmus Højlund".to_string(),
                    minute: Some(58),
                    added_time: None,
                    goal_type: Some(GoalType::OpenPlay),
                },
            ],
            events: vec![
                MatchEvent {
                    id: "e5".to_string(),
                    minute: Some(58),
                    added_time: None,
                    team_id: Some("mun".to_string()),
                    player_name: Some("Rasmus Højlund".to_string()),
                    assist_name: None,
                    event_type: MatchEventType::Goal,
                    description: "Goal - Rasmus Højlund".to_string(),
                },
                MatchEvent {
                    id: "e4".to_string(),
                    minute: Some(52),
                    added_time: None,
                    team_id: Some("che".to_string()),
                    player_name: Some("Moisés Caicedo".to_string()),
                    assist_name: None,
                    event_type: MatchEventType::YellowCard,
                    description: "Yellow card - Moisés Caicedo".to_string(),
                },
                MatchEvent {
                    id: "e3".to_string(),
                    minute: Some(46),
                    added_time: None,
                    team_id: Some("che".to_string()),
                    player_name: None,
                    assist_name: None,
                    event_type: MatchEventType::Substitution,
                    description: "Chelsea substitution".to_string(),
                },
                MatchEvent {
                    id: "e2".to_string(),
                    minute: Some(39),
                    added_time: None,
                    team_id: Some("che".to_string()),
                    player_name: Some("Cole Palmer".to_string()),
                    assist_name: None,
                    event_type: MatchEventType::Goal,
                    description: "Goal - Cole Palmer".to_string(),
                },
                MatchEvent {
                    id: "e1".to_string(),
                    minute: Some(12),
                    added_time: None,
                    team_id: Some("mun".to_string()),
                    player_name: Some("Bruno Fernandes".to_string()),
                    assist_name: None,
                    event_type: MatchEventType::Goal,
                    description: "Goal - Bruno Fernandes".to_string(),
                },
            ],
        },
        "mock-bar-atm" => LiveMatchDetails {
            summary,
            venue: Some("Estadi Olímpic Lluís Companys".to_string()),
            referee: None,
            stats: Some(MatchStats {
                possession_home: Some(61),
                possession_away: Some(39),
                shots_home: Some(8),
                shots_away: Some(5),
                shots_on_target_home: Some(3),
                shots_on_target_away: Some(2),
                corners_home: Some(5),
                corners_away: Some(1),
                ..Default::default()
            }),
            goal_scorers: vec![
                GoalScorer {
                    team_id: "bar".to_string(),
                    player_name: "Robert Lewandowski".to_string(),
                    minute: Some(21),
                    added_time: None,
                    goal_type: Some(GoalType::OpenPlay),
                },
                GoalScorer {
                    team_id: "atm".to_string(),
                    player_name: "Antoine Griezmann".to_string(),
                    minute: Some(44),
                    added_time: None,
                    goal_type: Some(GoalType::Penalty),
                },
            ],
            events: vec![
                MatchEvent {
                    id: "b3".to_string(),
                    minute: Some(45),
                    added_time: None,
                    team_id: None,
                    player_name: None,
                    assist_name: None,
                    event_type: MatchEventType::HalfTime,
                    description: "Half time".to_string(),
                },
                MatchEvent {
                    id: "b2".to_string(),
                    minute: Some(44),
                    added_time: None,
                    team_id: Some("atm".to_string()),
                    player_name: Some("Antoine Griezmann".to_string()),
                    assist_name: None,
                    event_type: MatchEventType::PenaltyGoal,
                    description: "Penalty goal - Antoine Griezmann".to_string(),
                },
                MatchEvent {
                    id: "b1".to_string(),
                    minute: Some(21),
                    added_time: None,
                    team_id: Some("bar".to_string()),
                    player_name: Some("Robert Lewandowski".to_string()),
                    assist_name: None,
                    event_type: MatchEventType::Goal,
                    description: "Goal - Robert Lewandowski".to_string(),
                },
            ],
        },
        _ => LiveMatchDetails {
            summary,
            venue: None,
            referee: None,
            stats: None,
            goal_scorers: Vec::new(),
            events: vec![MatchEvent {
                id: "p1".to_string(),
                minute: Some(90),
                added_time: None,
                team_id: None,
                player_name: None,
                assist_name: None,
                event_type: MatchEventType::FullTime,
                description: "Full time".to_string(),
            }],
        },
    };

    Ok(details)
}
