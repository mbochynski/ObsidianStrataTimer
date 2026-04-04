# Strata Time Tracker — Feature Summary

Strata Time Tracker is an Obsidian plugin that embeds interactive time trackers directly inside markdown notes. Each tracker is inserted as a code block and its data is stored as JSON within that block, so it persists across app restarts and syncs with the file.

## Core Tracking

- **Start/Stop timer** for a named segment — the user types a segment name and clicks Start; clicking Stop records the elapsed time.
- **Multiple segments per tracker** — each tracker holds an unlimited list of named time entries.
- **Sub-entries (Continue)** — any entry can be split into hierarchical sub-entries using a "Continue" button, useful for resuming interrupted work without losing the segment name.
- **Collapse/expand** rows that have sub-entries.
- **Real-time display** — the active entry shows a live running clock, updated every second.

## Editing

- Inline editing of entry names and timestamps directly in the table.
- Keyboard shortcuts: Ctrl/Cmd+Enter to confirm, Escape to cancel.
- Delete entries (with confirmation modal).

## Duration Display

- Configurable duration format: coarse (`1h 15m`) or fine-grained (days/months/years).
- Optional HH:MM:SS timestamp-style durations.
- Optional "today" column showing how much time was logged on the current day per entry.
- Optional monospaced font for timer values.

## Export

- **Copy as Markdown table** — formatted table of all entries with durations.
- **Copy as CSV** — configurable delimiter (default `,`).

## Settings

- Timestamp display format and editing format (moment.js tokens).
- CSV delimiter.
- Toggle fine-grained durations, reverse segment order, today column, monospaced font.

## Public API

Exposes functions (`loadAllTrackers`, `getTotalDuration`, `formatDuration`, `formatTimestamp`, `isRunning`, `getRunningEntry`) so users can query and aggregate time data across the entire vault using DataviewJS code blocks.
