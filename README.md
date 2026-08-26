# Bonobo Plugin Chitchat

Team chat for a workspace, built entirely on the generic plugin surfaces: channels, messages, one-level threads, an 8-token reaction palette, and attachments that reference workspace files. Everything lives in the plugin's own document store; the page reads through reactive bridge watches and writes through the host as the viewing member.

## Data model

All documents live in the plugin document store, one installation per workspace:

- `channels` — created through `put` with a client-generated key (UUID); value `{ name, archivedAt }`. Rename/archive/unarchive go through `put` too.
- `messages` — appended under `<channelKey>:`; value `{ text, attachments: [{ fileNodeId, name }], editedAt, deletedAt, mentions? }`. Deleting a message writes a `deletedAt` tombstone (the key is never reused); the page renders "Message deleted". `mentions` is the list of user ids the author picked with `@Name` in `text`. Only ids whose `@Name` is still in the text at send time are stored, so deleting the name from the composer deletes the mention. A rename does not retarget old messages: the log highlights `@Name` only where it still matches the member's current display name.
- `replies` — appended under `<rootMessageKey>:`; same value shape. Threads are one level deep: the UI offers a thread only on root messages.
- `reactions` — `putOwned` with caller key `<messageKey>:<token>`; the server appends `:<userId>`. A live reaction is `{}`. A removal writes `{ removed: true }` on the same key (the document slot stays occupied; adding the same reaction again reuses it). The palette is fixed to 8 tokens: thumbs_up, heart, laugh, wow, sad, party, rocket, eyes.

Server-appended message and reply keys end with `<invertedPaddedMs>:<rand4>`, so ascending key order is newest first. Channel keys are client-generated; the sidebar sorts channels by name.

### Seam contract (how the page stitches reads)

- Messages **accumulate by key** forever: every window, feed, or HTTP page merges into one map keyed by document key, so a message pushed out of the newest page stays visible. Chitchat grows its history with the window's own `loadOlder()` while the window can still grow. Once the window reports `atCapacity` the same button switches to the HTTP `list` door, paging with `keyStartExclusive` set to the oldest key already held and no cursor, and merges those pages into the same map. `isDone` is what ends it; a short page is not the end.
- Frozen rows are not frozen any more. After the first messages-window delivery the page opens three `watchChanges` feeds (messages, replies, reactions) whose `updatedSince` is the newest `updatedAt` among those loaded documents — not the wall clock. The fence is inclusive: a change whose `updatedAt` equals that value is still delivered, and the revision-forward merge drops duplicates. An edit, a delete, a reply, or a reaction (including a removal marker) of a row outside the live window arrives on that feed and merges by revision. The cursor then advances when the newest delivered `updatedAt` is strictly later, so a same-millisecond re-delivery does not re-subscribe. If a truncated page is entirely tied to that fence millisecond, the cursor steps to `newest + 1` so a later edit is not stuck behind those 100 rows. There is no timer.
- Reactions **accumulate** like messages. A removed marker keeps the document and the slot; grouping and chips treat it as absent.
- Replies **accumulate** in one channel-wide store. Companion HTTP `list` (omit `installationId`) loads the first pages; the replies feed keeps them current. An open thread HTTP-lists that root's prefix into the same store. It does not open its own watch. A failed companion list retries with exponential backoff plus jitter (start about 1 s, double, cap about 30 s), stops for good on success, and never retries on feed death. Feed delivery and tab-visible are early wake-ups of that same attempt, with one list in flight at a time. This is failure recovery, not a periodic refresh.
- A companion list says whether it still covers a row. Known groups and counts still render even when the HTTP frontier has not reached that row. Empty + uncovered still reads as unknown rather than as "nobody reacted" or a wrong zero. On such a row the member can still **add** a reaction — `putOwned` writes their own key — but **removing** one is refused with a reason.
- Every document read from a watch, a feed, or an HTTP page is runtime-validated (Zod) before use; invalid or foreign documents are dropped.
- Slot spend with a channel open is still 8 + N (N ≤ 8 private scopes): page rails 4 + N, one messages window, three change feeds. The feeds replace the old reactions window, replies window, and thread watch, so the page stays inside 16 slots. Server subscriptions at that worst case stay under the 100-subscription backstop (16 × 6 = 96 is the honest max).

## Known limits (accepted for the MVP)

- The document store caps an installation at **10,000 document slots** total. Chat history counts against it; archiving a channel does not delete its messages — uninstalling the plugin is the cleanup path.
- Each member also has their own share of that installation (1.6 MiB, 3,000 slots, 8 collections), counted only for writes made through the frame. Hitting either ceiling refuses with the same `storage_full` name, so Chitchat reads the message rather than the name: it announces one channel-level state and stops the composer instead of marking single messages failed. A member who has spent their **slot** share can no longer patch any shared document either, which means channel rename and archive stop working for them too.
- **Reply counts are claimed only for covered roots**: the channel-wide replies list catches up towards the oldest rendered message, and a root it has not reached shows no count unless the feed already delivered replies for it. Counts that are claimed cap the display at "99+". An open thread HTTP-lists its newest 100 replies and cannot reach past that; when it is cut, the panel says so.
- **Reactions are shown only for covered rows**, with the same exception: a group the feed already delivered still renders. A list that has not reached a row, or a dead feed, says reactions are unavailable instead of showing none.
- A removed reaction **keeps its document slot**. Re-adding the same reaction reuses that document. The installation's 10,000-slot cap therefore does not get those slots back on a toggle-off.
- Channel documents are shared: any member with content write access can rename or archive a channel. Channel and message writes are compare-and-set on the stored revision, so a concurrent edit answers a conflict instead of overwriting silently.
- Attachment links are resolved through `/api/v1/files/download-urls` at click time and never stored, so file permissions are rechecked per member and per click.
- The `@-menu` and the private-channel people picker need `workspace.members.read`. Until an admin accepts that capability, `members.list` answers `not_consented`. The composer stays usable: the menu shows a short explanation instead of an empty list, and sending still works as plain text with no `mentions` field.
- The roster is loaded on the first `@`, paged through the cursor, and cached for the page session. Paging stops after 1,000 names. Members with no profile name appear as "Someone with no name yet", the same label the people picker uses. A sent mention still stores their id, but the log can only highlight `@Name` where `members.resolve` currently has a display name, so an anonymous insert will not light up.

## UI stack: real React and Ariakit, and why the bundle is minified

The page runs **React 19**, **Ariakit** (pinned to exact `0.4.20`) and **lucide-react**. It used to run
Preact through `preact/compat`, which is smaller. Two things forced the move:

- **Ariakit cannot run on Preact.** Ariakit's `useEvent` seeds its ref with a function that throws
  "Cannot call an event handler while rendering", then replaces it from `useInsertionEffect`. Preact
  maps `useInsertionEffect` onto `useLayoutEffect`, so on unmount the throwing initial value is the
  one that runs. Every test teardown threw and leaked its DOM into the next test.
- **Ariakit pulls a second React in.** It imports `use-sync-external-store/shim`, a CommonJS package
  that requires `react` itself. Aliasing `react` to `preact/compat` never reached it, so the page ran
  two Reacts and every hook call failed. The fix under Preact was a virtual-module shim; under real
  React the problem does not exist.

Pin Ariakit **exactly**. The `^0.4.19` range resolves to 0.4.38, which is a different lineage
(`@ariakit/react-components`) that ships raw `src/*.tsx`.

A published plugin file may not exceed **900,000 bytes**. Measured on this bundle:

| Build                              | Bytes     |
| ---------------------------------- | --------- |
| React, no minification             | 947,309   |
| Identifier names preserved         | 908,086   |
| Full esbuild minify, then prettier | 749,095  |

So the readable build does not fit and identifier names have to go. `vite.config.ts` minifies the
JavaScript, and the build script then reformats it with prettier, which puts it back on ~25,800 lines
averaging 28 characters. The CSS is not minified — it is 43 KB and there is room.

Of the publish gate's mechanical checks this trips only the single-character-identifier one, which is
**advisory** and blocks nothing; it exists for exactly this case, a bundled dependency the author
cannot rename. The three checks that actually reject a publish all pass: no `Function(`, no long
base64 literal, and an escape density of 0.00008 against a 0.01 limit.

## Development

```
pnpm install --ignore-workspace
pnpm test:once
pnpm typecheck
pnpm build
```

`pnpm build` writes `dist/frontend/` and syncs `bonobo.plugin.json` file hashes plus the `dist/bonobo.plugin.json` copy the app fetches at publish time. Commit `dist/` — the publisher reads it from the repository.
