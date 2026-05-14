# Live Score Widget

A lightweight Tauri 2 + React + TypeScript desktop widget for live soccer scores. Version 1 uses normalized mock data through Rust Tauri commands so the frontend never talks directly to a football API or bundles provider credentials.

## Development

```bash
npm install
npm run build
npm run tauri dev
```

## Security notes

- React calls Tauri commands for football data and settings.
- API keys are intentionally absent from frontend code.
- The initial provider is mock-only; real providers should be added behind `src-tauri/src/football_provider.rs` and read credentials from environment variables, OS credentials, or a backend proxy.
- Tauri capabilities are kept minimal and avoid shell/filesystem permissions beyond app-owned settings persistence in Rust. Window permissions are limited to the controls the widget actually uses: always-on-top, decorations, position, size, and drag handling.
