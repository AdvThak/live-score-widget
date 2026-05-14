use tauri::AppHandle;

use crate::{
    football_provider,
    models::{LiveMatchDetails, LiveMatchSummary, UserSettings},
    settings,
};

#[tauri::command]
pub async fn get_live_matches() -> Result<Vec<LiveMatchSummary>, String> {
    football_provider::get_live_matches().await
}

#[tauri::command]
pub async fn get_match_details(match_id: String) -> Result<LiveMatchDetails, String> {
    football_provider::get_match_details(&match_id).await
}

#[tauri::command]
pub async fn get_settings(app: AppHandle) -> Result<UserSettings, String> {
    settings::load_settings(&app)
}

#[tauri::command]
pub async fn save_settings(app: AppHandle, settings: UserSettings) -> Result<(), String> {
    settings::store_settings(&app, &settings)
}
