import { invoke } from "@tauri-apps/api/core";
import { defaultSettings, type UserSettings } from "../types/settings";

const STORAGE_KEY = "live-score-widget-settings";
const isTauriRuntime = () => typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

export async function getSettings(): Promise<UserSettings> {
  if (!isTauriRuntime()) {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
  }
  return invoke<UserSettings>("get_settings");
}

export async function saveSettings(settings: UserSettings): Promise<void> {
  if (!isTauriRuntime()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    return;
  }
  return invoke<void>("save_settings", { settings });
}
