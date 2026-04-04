# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Watch mode — builds src/ to main.js, copies to test-vault for live testing
npm run build    # Type-check + production build
npm run version  # Bump version in manifest.json and versions.json
```

No automated test framework exists. Testing is manual: run `npm run dev`, open Obsidian with `test-vault/` as the vault, and exercise the plugin interactively.

## Architecture

This is an Obsidian plugin that renders time-tracking UIs inside markdown code blocks tagged `` ```simple-time-tracker ```. Tracker state is serialized as JSON within those code blocks and saved back to the vault file on every change.

**Entry point:** `src/main.ts` — registers the code block processor, the "Insert Time Tracker" command, file-rename handling, and exposes a public `plugin.api` object for DataviewJS/other plugins.

**Core module:** `src/tracker.ts` — contains everything:
- `Tracker` / `Entry` data interfaces (entries are hierarchical: an `Entry` can have `subEntries`)
- `loadTracker` / `saveTracker` — JSON ↔ vault serialization
- `loadAllTrackers` — scans a markdown file and returns all trackers (used by the public API)
- `displayTracker` — builds the entire UI (table rows, edit fields, start/stop button, export buttons) using the Obsidian `MarkdownRenderer` and DOM APIs
- Duration helpers: `getDuration`, `getDurationToday`, `getTotalDuration`, `formatDuration`, `formatTimestamp`
- `getRunningEntry` — recursive search through sub-entries for the active entry
- `updateLegacyInfo` — backward-compat migration run on load

**Settings:** `src/settings.ts` defines the `SimpleTimeTrackerSettings` interface and defaults. `src/settings-tab.ts` renders the settings UI.

**Confirmation modal:** `src/confirm-modal.ts` — simple Ok/Cancel modal used before destructive actions.

## Data Model

```typescript
interface Tracker { entries: Entry[] }
interface Entry {
    name: string;
    startTime: string;    // ISO 8601
    endTime?: string;     // absent if currently running
    subEntries?: Entry[]; // created via "Continue" button
    collapsed?: boolean;
}
```

The "Continue" button appends a sub-entry instead of a new top-level entry. Removing the last sub-entry merges back to a plain entry. All timestamps are ISO 8601 strings; legacy Unix-ms timestamps are migrated on load.

## Build Output

`esbuild` bundles `src/main.ts` → `main.js` (single file). External packages (obsidian, electron, CodeMirror) are not bundled. In dev mode, esbuild-plugin-copy also copies `main.js`, `manifest.json`, and `styles.css` into `test-vault/.obsidian/plugins/simple-time-tracker/`.

## Naming Note

The plugin ID is `strata-time-tracker` (in `manifest.json`) but the code block language tag is `simple-time-tracker`. The test-vault plugin folder is also `simple-time-tracker`. These differ intentionally — the plugin was forked/renamed.

## Public API

Exposed as `app.plugins.plugins["strata-time-tracker"].api`:
- **Pass-through** (same signature as `tracker.ts`): `loadTracker`, `getDuration`, `getTotalDuration`, `getDurationToday`, `getTotalDurationToday`, `getRunningEntry`, `isRunning`
- **Curried** (settings/app pre-applied): `loadAllTrackers(fileName)`, `formatTimestamp(timestamp)`, `formatDuration(totalTime)`, `orderedEntries(entries)`

These are used by users in DataviewJS code blocks to query and aggregate time data across the vault.
