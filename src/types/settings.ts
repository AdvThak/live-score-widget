export interface UserSettings {
  selectedMatchId?: string;
  windowPosition?: { x: number; y: number };
  windowSize?: { width: number; height: number };
  alwaysOnTop: boolean;
  opacity: number;
  theme: "dark" | "light" | "system";
}

export const defaultSettings: UserSettings = {
  alwaysOnTop: true,
  opacity: 0.95,
  theme: "dark",
  windowSize: { width: 260, height: 120 },
};
