import { useWidgetSettings } from "./useWidgetSettings";

export function useSelectedMatch() {
  const settingsState = useWidgetSettings();
  const { settings, updateSettings } = settingsState;

  return {
    ...settingsState,
    selectedMatchId: settings.selectedMatchId,
    selectMatch: (selectedMatchId: string) => updateSettings({ ...settings, selectedMatchId }),
    clearMatch: () => updateSettings({ ...settings, selectedMatchId: undefined }),
  };
}
