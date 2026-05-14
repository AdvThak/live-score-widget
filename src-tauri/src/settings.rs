use std::{fs, path::PathBuf};

use tauri::{AppHandle, Manager};

use crate::models::UserSettings;

fn settings_path(app: &AppHandle) -> Result<PathBuf, String> {
    let dir = app
        .path()
        .app_config_dir()
        .map_err(|error| format!("Unable to resolve app config directory: {error}"))?;
    fs::create_dir_all(&dir)
        .map_err(|error| format!("Unable to create settings directory: {error}"))?;
    Ok(dir.join("settings.json"))
}

pub fn load_settings(app: &AppHandle) -> Result<UserSettings, String> {
    let path = settings_path(app)?;
    if !path.exists() {
        return Ok(UserSettings::default());
    }
    let contents =
        fs::read_to_string(path).map_err(|error| format!("Unable to read settings: {error}"))?;
    serde_json::from_str(&contents).map_err(|error| format!("Unable to parse settings: {error}"))
}

pub fn store_settings(app: &AppHandle, settings: &UserSettings) -> Result<(), String> {
    let path = settings_path(app)?;
    let contents = serde_json::to_string_pretty(settings)
        .map_err(|error| format!("Unable to serialize settings: {error}"))?;
    fs::write(path, contents).map_err(|error| format!("Unable to save settings: {error}"))
}
