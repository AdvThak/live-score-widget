import { LogicalPosition, LogicalSize } from "@tauri-apps/api/dpi";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect, useRef } from "react";
import { defaultSettings, type UserSettings } from "../types/settings";

interface WidgetShellProps {
  children: React.ReactNode;
  expanded: boolean;
  settings?: UserSettings;
  onSettingsChange?: (settings: UserSettings) => void;
}

const isTauriRuntime = () => typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

export function WidgetShell({ children, expanded, settings = defaultSettings, onSettingsChange }: WidgetShellProps) {
  const saveTimer = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (!isTauriRuntime()) return;
    const appWindow = getCurrentWindow();
    void appWindow.setAlwaysOnTop(settings.alwaysOnTop);
    void appWindow.setDecorations(false);
    const nextSize = expanded ? new LogicalSize(440, 640) : new LogicalSize(270, 130);
    void appWindow.setSize(nextSize);
    if (settings.windowPosition) {
      void appWindow.setPosition(new LogicalPosition(settings.windowPosition.x, settings.windowPosition.y));
    }
  }, [expanded, settings.alwaysOnTop, settings.windowPosition]);

  useEffect(() => {
    if (!isTauriRuntime() || !onSettingsChange) return;
    const appWindow = getCurrentWindow();

    const scheduleSave = (nextSettings: UserSettings) => {
      window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => onSettingsChange(nextSettings), 500);
    };

    const moved = appWindow.onMoved(({ payload }) => {
      scheduleSave({
        ...settings,
        windowPosition: { x: Math.round(payload.x), y: Math.round(payload.y) },
      });
    });
    const resized = appWindow.onResized(({ payload }) => {
      scheduleSave({
        ...settings,
        windowSize: { width: Math.round(payload.width), height: Math.round(payload.height) },
      });
    });

    return () => {
      window.clearTimeout(saveTimer.current);
      void moved.then((unlisten) => unlisten());
      void resized.then((unlisten) => unlisten());
    };
  }, [onSettingsChange, settings]);

  return (
    <main
      className={`min-h-screen bg-transparent p-3 text-slate-100 ${expanded ? "w-[440px]" : "w-[270px]"}`}
      data-tauri-drag-region
      style={{ opacity: settings.opacity }}
    >
      {children}
    </main>
  );
}
