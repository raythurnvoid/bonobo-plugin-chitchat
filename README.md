# Bonobo Plugin Chitchat

Team chat for a workspace, built entirely on the generic plugin surfaces: channels, messages, one-level threads, an 8-token reaction palette, and attachments that reference workspace files. Everything lives in the plugin's own document store. The page reads through its own authenticated Convex client as the viewing member and writes `channels` and `cursors` directly; message, reply, and reaction writes go through the plugin's reviewed backend (see "Backend" below), which also renders each channel into a read-only Markdown transcript file in the workspace.

## Data model

All documents live in the plugin document store, one installation per workspace:

- `channels` — created with a client-generated key (UUID); value `{ name, archivedAt }`. Public channels use `put`. A private channel creates its scope, invitees, and first shared channel document in one atomic call. Rename/archive/unarchive go through `put`.
- `messages` — appended under `<channelKey>:`; value `{ text, attachments: [{ fileNodeId, name }], editedAt, deletedAt, mentions? }`. Deleting a message writes a `deletedAt` tombstone (the key is never reused); the page renders "Message deleted". `mentions` is the list of user ids the author picked with `@Name` in `text`. Only ids whose `@Name` is still in the text at send time are stored, so deleting the name from the composer deletes the mention. A rename does not retarget old messages: the log highlights `@Name` only where it still matches the member's current display name.
- `replies` — appended under `<rootMessageKey>:`; same value shape. Threads are one level deep: the UI offers a thread only on root messages.
- `reactions` — `putOwned` with caller key `<messageKey>:<token>`; the server appends `:<userId>`. A live reaction is `{}`. A removal writes `{ removed: true }` on the same key (the document slot stays occupied; adding the same reaction again reuses it). The palette is fixed to 8 tokens: thumbs_up, heart, laugh, wow, sad, party, rocket, eyes.

Server-appended message and reply keys end with `<invertedPaddedMs>:<rand4>`, so ascending key order is newest first. Channel keys are client-generated; the sidebar sorts channels by name.

Private channels put all four collections behind one scope whose id and key prefix are the channel key. The scope, every invite, and the first channel document are one transaction and one page-write rate charge, so a refusal leaves no partial private channel. If an uncertain exact retry conflicts, Chitchat reads that exact channel through the authenticated HTTP door, then reads its exact principals. A valid current channel proves success only when that principal list includes this member, even if the channel was renamed. A null channel, exact `{ _yay: null }` principal result, or exact principal list without this member stops automatic checking while the exact key and fields stay locked for Retry or Cancel. Retry always uses the same key. Failed or malformed channel reads and `{ _nay: { name: "unavailable" } }` or malformed principal results retry with bounded backoff. `watchMine` also reports a durable append sequence and time for each collection. Chitchat compares the `messages` and `replies` sequences with the two values in the private read cursor. It ignores channel, reaction, and unknown collection activity. A higher sequence is unread even when its time equals the cursor time or its latest creator is this member. This safe own-send false positive cannot hide another member's same-millisecond append. Opening the channel advances both sequence values through the observed scope activity. The trusted activity or message time advances the separate New-divider value; the browser clock never does.

The page watches at most eight private scopes. It reserves one of those slots for the selected private channel, so an earlier scope arriving cannot unmount the open composer or lose its draft and focus. Activity-only `watchMine` deliveries do not replace these ranged reads: their identity uses only the scope id, key prefix, and collections. A real departure comes only from the full live scope list. A ranged read ending by itself does not mean the member left. While the full scope-list watch stays live, an unavailable ranged read, or a denied read during a fast remove/re-add while `watchMine` still includes the scope, keeps its cached channel and cursor rows and restarts with bounded backoff. If the selected scope's membership revision changes, its open message window and change feeds also restart in place while cached rows and the composer stay mounted. The companion HTTP scans restart from the channel prefix under a generation token, so late old results cannot change current coverage. A real departure cancels these retries when the full scope list drops the scope. If the full scope-list watch itself dies because the connection is unavailable, the page keeps its last list and restarts that watch too. Other death reasons stay with the host page.

The App tracks every message and reply append, edit, and delete, including retries, by channel. While a request is in flight, channel, view, and thread controls that would unmount its state are disabled. Their handlers also refuse a stale or scripted click and announce why. Leave and Delete refuse before any scope change. An `unavailable` append result is uncertain because the write may have committed. The queue stays in flight and replays the exact client request id and payload with bounded backoff until the store gives a definite result. An uncertain edit or delete keeps its exact value, timestamp, and revision locked for Retry or Cancel until a newer watch value settles it. A definite failure unlocks navigation but keeps the draft or failed append visible, so the member can retry or choose to navigate away. The durable scope activity is the unread source after a stored append, even when the sender reloads or leaves before receiving the result.

Every principal can use **Leave**. A manager also gets **Delete for everyone**. Both actions wait for an in-flight send in that channel to settle, then change the scope directly. They do not write the channel document. The confirmation reads and freezes the current principal count. Exact `{ _yay: null }` uses the honest unknown-count copy and may continue without a count. An unavailable or malformed count shows Retry and keeps the destructive action disabled. When a count is known, the write sends it back so a membership change cannot turn the confirmed result into a different result. A successful non-delete Leave waits until `watchMine` omits that scope. If a manager already added the member back, a greater `membershipRevision` than the definite Leave result keeps the live channel. After an `unavailable` or thrown result, Chitchat reads that exact private channel through the authenticated HTTP door. A valid null proves this member has no current read. A valid channel is followed by an exact principal Result because the organization owner can still read it without a scope grant. If an exact list includes this member, Retry unlocks. If it excludes this member or is exact `{ _yay: null }`, Leave settles as left. Delete still says it could not be confirmed because caller absence does not prove global deletion. Failed, malformed, or wrong-channel reads and unavailable or malformed principal Results retry with bounded backoff. Cached or higher-revision scope rows cannot settle this check because another principal's change can raise the revision. After exact departure, the scope stays hidden until a fresh exact channel and exact principal list includes this member; exact null stops that re-add proof, while unavailable or malformed Results retry with bounded backoff. Cancel or unmount stops the check. The people dialog keeps exact null separate from a failed read and offers Retry after an unavailable or malformed result. It reloads the current principals after an unavailable membership change. Leaving as the last principal deletes the scope. Both delete paths release access and archive the channel's transcript files, but the plugin documents stay stored until uninstall.

### Seam contract (how the page stitches reads)

- Messages **accumulate by key** forever: every window, feed, or HTTP page merges into one map keyed by document key, so a message pushed out of the newest page stays visible. Chitchat grows its history with the window's own `loadOlder()` while the window can still grow. Rows the next window delivery adds below its old frontier are marked as history before arrival announcements; a concurrent newer row above that frontier is still announced. Once the window reports `atCapacity` the same button switches to the HTTP `list` door, paging with `keyStartExclusive` set to the oldest valid public-document envelope already returned and no cursor, and merges collection-valid messages into the same map. A full page of foreign message values still advances that fence, so it cannot hide older valid history. `isDone` is what ends it; a short page is not the end. An empty page with `isDone: false` is incomplete and shows Retry instead of requesting the same range in a loop.
- Frozen rows are not frozen any more. After the first messages-window delivery the page opens three `watchChanges` feeds (messages, replies, reactions) whose `updatedSince` is the newest `updatedAt` among the raw valid public-document envelopes — not the wall clock and not only values this Chitchat version knows. A live window made only of foreign values therefore still starts every feed. The fence is inclusive: a change whose `updatedAt` equals that value is still delivered, and the revision-forward merge drops duplicates. An edit, a delete, a reply, or a reaction (including a removal marker) of a row outside the live window arrives on that feed and merges by revision. The cursor then advances when the newest delivered `updatedAt` is strictly later, so a same-millisecond re-delivery does not re-subscribe. If a truncated page is entirely tied to that fence millisecond, the cursor steps to `newest + 1` so a later edit is not stuck behind those 100 rows. There is no timer.
- Public cursors keep one newest observed message time per channel. Private cursors store `{ at, activity: { messages, replies } }`: `activity` drives unread state and `at` only places the New divider. Old `{ at }` private cursors map to zero sequences and upgrade through the next compare-and-set, so rollout may show extra unread state but cannot hide an append. Pending, stored, watched, and exact-read cursor values merge by maximum for `at` and for each sequence. Old `lastMessageAt` channel fields are opaque and ignored. After a private cursor conflict, the page reads the exact stored `<channelKey>:read:<userId>` document through the authenticated HTTP door, checks that it is this member's owned cursor, and retries against the newer revision. Failed or stale reads use bounded backoff, while a live ranged watch may supply the winner first. This works when navigation moved the channel outside the eight live private reads. Retry timers stop when the app unmounts or the private scope exits.
- Reactions **accumulate** like messages. A removed marker keeps the document and the slot; grouping and chips treat it as absent.
- Replies **accumulate** in one channel-wide store. Companion HTTP `list` (omit `installationId`) loads the first pages; the replies feed keeps them current. Paging advances from the last valid public-document envelope, even when Chitchat drops every value in that page, so foreign values cannot hide older valid replies or reactions. A page with no usable envelope and `isDone: false` is incomplete and retries. An open thread HTTP-lists that root's prefix into the same store. It does not open its own watch. A private membership generation restarts that exact list in place, so the thread keeps its node, draft, and focus while stale callbacks are ignored. A failed companion list retries with exponential backoff plus jitter (start about 1 s, double, cap about 30 s), stops for good on success, and never retries on feed death. Feed delivery and tab-visible are early wake-ups of that same attempt, with one list in flight at a time. This is failure recovery, not a periodic refresh.
- A companion list says whether it still covers a row. Known groups and counts still render even when the HTTP frontier has not reached that row. A healthy reaction read that is pending or has not reached the row stays neutral instead of saying unavailable or "nobody reacted". A failed or dead read still says reactions are unavailable. On an uncovered row the member can still **add** a reaction — `putOwned` writes their own key — but **removing** one stays hidden with its chip.
- Every document read from a watch, a feed, or an HTTP page is runtime-validated (Zod) before use; invalid or foreign documents are dropped.
- Slot spend with a channel open is still 8 + N (N ≤ 8 watched private scopes): page rails 4 + N, one messages window, three change feeds. The feeds replace the old reactions window, replies window, and thread watch, so the page stays inside 16 slots. Server subscriptions at that worst case stay under the 100-subscription backstop (16 × 6 = 96 is the honest max).

## Backend (invoke endpoints and transcript files)

Since 0.6.0 the plugin ships a reviewed backend (`dist/backend/worker.js`, source `src/backend/`:
`worker.ts` routes, `markdown.ts` rendering, `state.ts` per-channel state docs, `host.ts` door
calls). The manifest declares seven endpoints, all `serialization: "installation"` so at most one
run mutates the installation's transcripts at a time:

- `message-send` (`/messages/send`), `reply-send` (`/replies/send`) — commit the store append, then
  append the block to the channel transcript in the same run.
- `message-edit` (`/messages/edit`), `message-delete` (`/messages/delete`) — CAS the store document,
  then rewrite its block (`(edited)` / `(message deleted)`).
- `reaction-toggle` (`/reactions/toggle`) — write the owned reaction marker, then update the block's
  `reactions:` line.
- `channel-manage` (`/channels/manage`) — create, ensure, and update (rename/topic/archive); archive archives
  the channel's transcript folder or file through `plugin-archive`.
- `reconcile` (`/reconcile`) — rebuild a channel transcript from the store. The store and the file
  system commit separately, so a run can crash between them; the store is the source of truth and
  reconcile heals the file. Over the page caps it degrades to a truncated tail rebuild.

The page calls these through `client.backend.invoke`, wrapped in `src/chat-invoke.ts`: it waits out
`busy` answers (serialization lock and invoke rate bucket, both with `retryAfterMs`), maps the
relayed JSON into the `_yay`/`_nay` shape the write machinery speaks, and keeps `unavailable` as a
replay-with-same-client-request-id case exactly like the old append door. Because of this,
`userWritableCollections` narrows the user-write door to `channels` + `cursors`; the store refuses a
page write to `messages`, `replies`, or `reactions`. `channels` stays user-writable because private
create writes the channel document from the page via `scopes.createWithDocument` — a known gap.

Transcript layout, all files plugin-owned and read-only: public channels at `/chitchat/<slug>.md`
plus a `README.md` index; each private channel under `/chitchat/private/<slug>-<digest8>/` where
the digest is the first 8 hex chars of SHA-256 of the channel key — two same-named private channels
get separate folders, and a guessed name cannot be confirmed by probing. The private folder is
bound to the channel's data scope (`access.readScopeId`), so exactly the channel's members (and the
organization owner) can read it. If `/chitchat` is taken by a member folder, the root falls back to
a workspace-digest suffix.

## Known limits (accepted for the MVP)

- The document store caps an installation at **10,000 document slots** total. Chat history counts against it; archiving a channel does not delete its messages — uninstalling the plugin is the cleanup path.
- Each member also has their own share of that installation (1.6 MiB, 3,000 slots, 8 collections), counted only for writes made through the frame. Hitting either ceiling refuses with the same `storage_full` name, so Chitchat reads the message rather than the name: it announces one channel-level state and stops the composer instead of marking single messages failed. A member who has spent their **slot** share can no longer patch any shared document either, which means channel rename and archive stop working for them too.
- **Reply counts are claimed only for covered roots**: the channel-wide replies list catches up towards the oldest rendered message, and a root it has not reached shows no count unless the feed already delivered replies for it. Counts that are claimed cap the display at "99+". An open thread HTTP-lists its newest 100 replies and cannot reach past that; when it is cut, the panel says so.
- **Reaction coverage is the same in the main log and thread panel**. Known groups from a healthy feed still render while the HTTP list catches up. Healthy pending or uncovered rows stay neutral. A failed list or dead feed hides stale chips and says reactions are unavailable.
- A removed reaction **keeps its document slot**. Re-adding the same reaction reuses that document. The installation's 10,000-slot cap therefore does not get those slots back on a toggle-off.
- Public channel documents are shared. Private channel documents are visible only through their scope. A member who can read a channel and has content write access can rename or archive it. Channel and message writes are compare-and-set on the stored revision, so a concurrent edit answers a conflict instead of overwriting silently.
- Attachment links are resolved through `/api/v1/files/download-urls` at click time and never stored, so file permissions are rechecked per member and per click.
- The `@-menu` and the private-channel people picker need `workspace.members.read`. Until an admin accepts that capability, `members.list` answers `not_consented`. The composer stays usable: the menu shows a short explanation instead of an empty list, and sending still works as plain text with no `mentions` field.
- The roster is loaded on the first `@` and paged through the cursor. Only a complete successful roster is cached for the page session. If any page fails, the partial roster is not cached, so a later composer retries. Paging stops after 1,000 names. Members with no profile name appear as "Someone with no name yet", the same label the people picker uses. A sent mention still stores their id, but the log can only highlight `@Name` where `members.resolve` currently has a display name, so an anonymous insert will not light up.

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

| Build                              | Bytes   |
| ---------------------------------- | ------- |
| React, no minification             | 947,309 |
| Identifier names preserved         | 908,086 |
| Full esbuild minify, then prettier | 806,033 |

So the readable build does not fit and identifier names have to go. `vite.config.ts` minifies the
JavaScript, and the build script then reformats it with prettier, which puts it back on 28,315 lines
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
