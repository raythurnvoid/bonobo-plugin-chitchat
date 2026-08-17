# Bonobo Plugin Chitchat

Team chat for a workspace, built entirely on the generic plugin surfaces: channels, messages, one-level threads, an 8-token reaction palette, and attachments that reference workspace files. Everything lives in the plugin's own document store; the page reads through reactive bridge watches and writes through the host as the viewing member.

## Data model

All documents live in the plugin document store, one installation per workspace:

- `channels` — created through `put` with a client-generated key (UUID); value `{ name, archivedAt }`. Rename/archive/unarchive go through `put` too.
- `messages` — appended under `<channelKey>:`; value `{ text, attachments: [{ fileNodeId, name }], editedAt, deletedAt }`. Deleting a message writes a `deletedAt` tombstone (the key is never reused); the page renders "Message deleted".
- `replies` — appended under `<rootMessageKey>:`; same value shape. Threads are one level deep: the UI offers a thread only on root messages.
- `reactions` — `putOwned`/`removeOwned` with caller key `<messageKey>:<token>`; the server appends `:<userId>`. The palette is fixed to 8 tokens: thumbs_up, heart, laugh, wow, sad, party, rocket, eyes.

Server-appended message and reply keys end with `<invertedPaddedMs>:<rand4>`, so ascending key order is newest first. Channel keys are client-generated; the sidebar sorts channels by name.

### Seam contract (how the page stitches reads)

- Messages and replies **accumulate by key** forever: watch windows and HTTP "load older" pages merge into one map keyed by document key. A message that fell out of the newest-100 watch window stays visible.
- Reactions **replace from window** only: every watch update replaces the whole reaction set, because removed reactions are physically deleted.
- Every document read from a watch or an HTTP page is runtime-validated (Zod) before use; invalid or foreign documents are dropped and counted.

## Known limits (accepted for the MVP)

- The document store caps an installation at **10,000 document slots** total. Chat history counts against it; archiving a channel does not delete its messages — uninstalling the plugin is the cleanup path.
- **Reply counts are approximate** beyond the bounded channel-wide replies watch (newest 100 replies per channel); the display caps at "99+". Counts are exact inside an open thread up to its own window.
- **Reaction counts are approximate** beyond the newest-100 reactions window per channel. Reactions render from the newest-100 reaction docs per channel (the replace-from-window seam), so reactions on older paged-in messages beyond that window do not display.
- Channel documents are shared: any member with content write access can rename or archive a channel, and concurrent edits are last-write-wins.
- Attachment links are resolved through `/api/v1/files/download-urls` at click time and never stored, so file permissions are rechecked per member and per click.

## Development

```
pnpm install --ignore-workspace
pnpm test:once
pnpm typecheck
pnpm build
```

`pnpm build` writes `dist/frontend/` and syncs `bonobo.plugin.json` file hashes plus the `dist/bonobo.plugin.json` copy the app fetches at publish time. Commit `dist/` — the publisher reads it from the repository.
