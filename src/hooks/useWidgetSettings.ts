import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings, saveSettings } from "../services/settingsClient";
import { defaultSettings, type UserSettings } from "../types/settings";

export function useWidgetSettings() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    staleTime: Number.POSITIVE_INFINITY,
  });

  const mutation = useMutation({
    mutationFn: saveSettings,
    onMutate: async (settings: UserSettings) => {
      await queryClient.cancelQueries({ queryKey: ["settings"] });
      const previous = queryClient.getQueryData<UserSettings>(["settings"]);
      queryClient.setQueryData(["settings"], settings);
      return { previous };
    },
    onError: (_error, _settings, context) => {
      if (context?.previous) queryClient.setQueryData(["settings"], context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["settings"] }),
  });

  return {
    settings: query.data ?? defaultSettings,
    isLoading: query.isLoading,
    error: query.error,
    updateSettings: mutation.mutateAsync,
    isSaving: mutation.isPending,
  };
}
