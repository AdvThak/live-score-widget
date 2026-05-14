mod commands;
mod football_provider;
mod models;
mod settings;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::get_live_matches,
            commands::get_match_details,
            commands::get_settings,
            commands::save_settings
        ])
        .run(tauri::generate_context!())
        .expect("error while running live score widget");
}
