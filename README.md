# Bonobo Plugin Chitchat

Team chat for a workspace, built entirely on the generic plugin surfaces: channels, messages, one-level threads, an 8-token reaction palette, and attachments that reference workspace files. Everything lives in the plugin's own document store. The page reads through the SDK's Convex client (`client.convex`, wrapped in a `ConvexProvider` in `main.tsx`) with the `convex/react` hooks and the typed doors under `client.api.plugins_data`, as the viewing member. It writes `channels` and `cursors` through `user_put_owned_document`; message, reply, and reaction writes go through the plugin's reviewed backend (see "Backend" below), which also renders each channel into a read-only Markdown transcript file in the workspace.

## Data model

All documents live in the plugin document store, one installation per workspace:

- `channels` — created with a client-generated key (UUID); value `{ name, archivedAt }`. Public channels use `put`. A private channel creates its scope, invitees, and first shared channel document in one atomic call. Rename/archive/unarchive go through `put`.
- `messages` — appended under `<channelKey>:`; value `{ text, attachments: [{ fileNodeId, name }], editedAt, deletedAt, mentions? }`. Deleting a message writes a `deletedAt` tombstone (the key is never reused); the page renders "Message deleted". `mentions` is the list of user ids the author picked with `@Name` in `text`. Only ids whose `@Name` is still in the text at send time are stored, so deleting the name from the composer deletes the mention. A rename does not retarget old messages: the log highlights `@Name` only where it still matches the member's current display name.
- `replies` — appended under `<rootMessageKey>:`; same value shape. Threads are one level deep: the UI offers a thread only on root messages.
- `reactions` — `putOwned` with caller key `<messageKey>:<token>`; the server appends `:<userId>`. A live reaction is `{}`. A removal writes `{ removed: true }` on the same key (the document slot stays occupied; adding the same reaction again reuses it). The palette is fixed to 8 tokens: thumbs_up, heart, laugh, wow, sad, party, rocket, eyes.

Server-appended message and reply keys end with `<invertedPaddedMs>:<rand4>`, so ascending key order is newest first. Channel keys are client-generated; the sidebar sorts channels by name.

Private channels put all four collections behind one scope whose id and key prefix are the channel key. The scope, every invite, and the first channel document are one `user_manage_scope` call with `kind: "create_with_document"`, one transaction and one page-write rate charge, so a refusal leaves no partial private channel. If an uncertain exact retry conflicts, Chitchat reads that exact channel through the authenticated HTTP door, then reads its exact principals through `watch_scope_principals`. A valid current channel proves success only when that principal list includes this member, even if the channel was renamed. A null channel, a null principal answer, or an exact principal list without this member stops automatic checking while the exact key and fields stay locked for Retry or Cancel. Retry always uses the same key. Failed or malformed channel reads and rejected or malformed principal reads retry with bounded backoff. `watch_my_scopes` also reports a durable append sequence and time for each collection. Chitchat compares the `messages` and `replies` sequences with the two values in the private read cursor. It ignores channel, reaction, and unknown collection activity. A higher sequence is unread even when its time equals the cursor time or its latest creator is this member. This safe own-send false positive cannot hide another member's same-millisecond append. Opening the channel advances both sequence values through the observed scope activity. The trusted activity or message time advances the separate New-divider value; the browser clock never does.

The page reads at most eight private scopes at a time through one `useQueries` set of ranged `watch_documents` reads. It reserves one of those places for the selected private channel, so an earlier scope arriving cannot unmount the open composer or lose its draft and focus. Activity-only scope deliveries do not replace these ranged reads: their identity uses only the scope id, key prefix, and collections. A real departure comes only from the full live scope list. A ranged read answering null does not mean the member left: the page keeps its cached channel and cursor rows until the full scope list drops the scope, and Convex re-runs the read by itself when access changes. If the scope list itself answers null (a lapsed session, or lost access), the page keeps its last list; the query stays open and delivers again when the server allows it. A read that throws (no plugin identity at all) reaches `ChatErrorBoundary`, which shows the session-expired copy when `client.session.expiresAt()` has passed and the connection copy otherwise.

The App tracks every message and reply append, edit, and delete, including retries, by channel. While a request is in flight, channel, view, and thread controls that would unmount its state are disabled. Their handlers also refuse a stale or scripted click and announce why. Leave and Delete refuse before any scope change. An `unavailable` append result is uncertain because the write may have committed. The queue stays in flight and replays the exact client request id and payload with bounded backoff until the store gives a definite result. An uncertain edit or delete keeps its exact value, timestamp, and revision locked for Retry or Cancel until a newer watch value settles it. A definite failure unlocks navigation but keeps the draft or failed append visible, so the member can retry or choose to navigate away. The durable scope activity is the unread source after a stored append, even when the sender reloads or leaves before receiving the result.

Every principal can use **Leave**. A manager also gets **Delete for everyone**. Both actions wait for an in-flight send in that channel to settle, then change the scope directly through `user_manage_scope`. They do not write the channel document. The confirmation reads and freezes the current principal count. A null principal answer uses the honest unknown-count copy and may continue without a count. A rejected or malformed count shows Retry and keeps the destructive action disabled. When a count is known, the write sends it back so a membership change cannot turn the confirmed result into a different result. A successful non-delete Leave waits until `watch_my_scopes` omits that scope. If a manager already added the member back, a greater `membershipRevision` than the definite Leave result keeps the live channel. A rejected mutation is uncertain: the write may have committed. Chitchat then reads that exact private channel through the authenticated HTTP door. A valid null proves this member has no current read. A valid channel is followed by an exact principal read because the organization owner can still read it without a scope grant. If an exact list includes this member, Retry unlocks. If it excludes this member or is null, Leave settles as left. Delete still says it could not be confirmed because caller absence does not prove global deletion. Failed, malformed, or wrong-channel reads and rejected or malformed principal reads retry with bounded backoff. Cached or higher-revision scope rows cannot settle this check because another principal's change can raise the revision. After exact departure, the scope stays hidden until a fresh exact channel and exact principal list includes this member; null stops that re-add proof, while rejected or malformed reads retry with bounded backoff. Cancel or unmount stops the check. The people dialog keeps a null answer separate from a failed read and offers Retry after a rejected or malformed one. It reloads the current principals after a rejected membership change. Leaving as the last principal deletes the scope. Both delete paths release access and archive the channel's transcript files, but the plugin documents stay stored until uninstall.

### Seam contract (how the page stitches reads)

- Messages **accumulate by key** forever: every timeline delivery, feed, or HTTP page merges into one map keyed by document key, so a message pushed out of the newest page stays visible. The timeline is `usePaginatedQuery` on `watch_documents_page` (100 rows a page). Every loaded page stays live for edits and deletions, and the first page grows with new arrivals. "Load older" calls `loadMore(100)`; the longer list arrives as a normal delivery and the button hides once the hook reports nothing older. Rows that delivery adds below the old frontier are marked as history before arrival announcements; a concurrent newer row above that frontier is still announced. A refused read answers an empty final page, so a channel this member may not read looks empty rather than broken. There is no HTTP history path any more.
- Frozen rows are not frozen any more. After the first timeline delivery the page opens three `watch_changes` reads (messages, replies, reactions) with `useQuery`, whose `updatedSince` is the newest `updatedAt` among the raw valid public-document envelopes — not the wall clock and not only values this Chitchat version knows. A first page made only of foreign values therefore still starts every feed. The fence is inclusive: a change whose `updatedAt` equals that value is still delivered, and the revision-forward merge drops duplicates. An edit, a delete, a reply, or a reaction (including a removal marker) of a row outside the loaded pages arrives on that feed and merges by revision. The cursor then advances when the newest delivered `updatedAt` is strictly later, so a same-millisecond re-delivery does not re-subscribe. If a truncated page is entirely tied to that fence millisecond, the cursor steps to `newest + 1` so a later edit is not stuck behind those 100 rows. There is no timer. A feed that answers null is dead until it answers again: its rows freeze and the channel says so.
- Public cursors keep one newest observed message time per channel. Private cursors store `{ at, activity: { messages, replies } }`: `activity` drives unread state and `at` only places the New divider. Old `{ at }` private cursors map to zero sequences and upgrade through the next compare-and-set, so rollout may show extra unread state but cannot hide an append. Pending, stored, watched, and exact-read cursor values merge by maximum for `at` and for each sequence. Old `lastMessageAt` channel fields are opaque and ignored. After a private cursor conflict, the page reads the exact stored `<channelKey>:read:<userId>` document through the authenticated HTTP door, checks that it is this member's owned cursor, and retries against the newer revision. Failed or stale reads use bounded backoff, while a live ranged watch may supply the winner first. This works when navigation moved the channel outside the eight live private reads. Retry timers stop when the app unmounts or the private scope exits.
- Reactions **accumulate** like messages. A removed marker keeps the document and the slot; grouping and chips treat it as absent.
- Replies **accumulate** in one channel-wide store. Companion HTTP `list` (omit `installationId`) loads the first pages; the replies feed keeps them current. Paging advances from the last valid public-document envelope, even when Chitchat drops every value in that page, so foreign values cannot hide older valid replies or reactions. A page with no usable envelope and `isDone: false` is incomplete and retries. An open thread HTTP-lists that root's prefix into the same store. It does not open its own read. A failed companion list retries with exponential backoff plus jitter (start about 1 s, double, cap about 30 s), stops for good on success, and never retries on feed death. Feed delivery and tab-visible are early wake-ups of that same attempt, with one list in flight at a time. This is failure recovery, not a periodic refresh.
- A companion list says whether it still covers a row. Known groups and counts still render even when the HTTP frontier has not reached that row. A healthy reaction read that is pending or has not reached the row stays neutral instead of saying unavailable or "nobody reacted". A failed or dead read still says reactions are unavailable. On an uncovered row the member can still **add** a reaction — the backend writes their own key — but **removing** one stays hidden with its chip.
- Every document read from a live query, a feed, or an HTTP page is runtime-validated (Zod) before use; invalid or foreign documents are dropped.
- Live reads with a channel open: the public channels read, the recent-messages read, the scope list, this member's cursor map, one ranged channels read per watched private scope (at most eight), the paginated timeline, and three change feeds. Convex holds one server subscription per distinct query, so the count is the honest number of live queries; there is no SDK slot budget any more.

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
  reconcile heals the file. Over the page caps it degrades to a truncated tail rebuild — a
  deviation from the plan's unbounded resumable rebuild, sized to dev-scale data.

Two paths keep a crashed run from leaving the transcript behind the store forever. Opening a
channel invokes `reconcile` in the background (`ChannelView`, no spinner and no error surface,
because the transcript is a side artifact and the next open tries again). And a replayed send
finishes the file half itself, without a full rebuild: it looks for the block's
`<!-- chitchat:msg:<key> -->` marker in the same bounded set of transcript files the edit paths
scan, and appends or nests the block only when the marker is absent. So replaying a send twice
never writes the block twice. A replayed channel create re-runs `ensure_channel` for the same
reason.

The page calls these with `client.fetchJson("/api/v1/plugin-backend/invoke", { endpoint, input })`,
wrapped in `src/chat-invoke.ts`: it waits out the held-back answers (409 is the serialization lock,
429 the invoke rate bucket, and both may carry `retryAfterMs`), maps the relayed JSON into the
`_yay`/`_nay` shape the write machinery speaks, and keeps `unavailable` as a
replay-with-same-client-request-id case exactly like the old append door. A thrown answer is what
becomes `unavailable` now: a 5xx, a body that is not JSON, a refused session refresh, or a network
failure. The run may have happened in all four cases. Because of this,
`userWritableCollections` narrows the user-write door to `channels` + `cursors`; the store refuses a
page write to `messages`, `replies`, or `reactions`. `channels` stays user-writable because private
create writes the channel document from the page via `user_manage_scope` (`create_with_document`) — a
known gap.

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
- The `@-menu` and the private-channel people picker need `workspace.members.read`. Until an admin accepts that capability, `list_members` answers `{ refusal: "not_consented" }` (`src/chat-doors.ts` turns that, a null answer, and a rejected call into the three refusals the menu shows). The composer stays usable: the menu shows a short explanation instead of an empty list, and sending still works as plain text with no `mentions` field.
- The roster is loaded on the first `@` and paged through the cursor. Only a complete successful roster is cached for the page session. If any page fails, the partial roster is not cached, so a later composer retries. Paging stops after 1,000 names. Members with no profile name appear as "Someone with no name yet", the same label the people picker uses. A sent mention still stores their id, but the log can only highlight `@Name` where `resolve_member_display` currently has a display name, so an anonymous insert will not light up.

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

A published plugin file may not exceed **900,000 bytes**. The shipped row below is the current build. The two rows above it were measured on 0.6.4 and are kept for the ratio between build settings, not as current byte counts:

| Build                              | Bytes   |
| ---------------------------------- | ------- |
| React, no minification             | 947,309 |
| Identifier names preserved         | 908,086 |
| Full esbuild minify, then prettier | 798,680 |

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

The tests replace `convex/react` with a fake (`vi.mock` at the top of `src/app.test.tsx`). The real
hooks need a `ConvexReactClient` with a WebSocket and a server behind it; the tests assert what the
page asks for and how it renders the answers, so every hook call becomes one fake subscription keyed
by door and arguments, which a test finds and feeds. One-shot doors (`client.convex.query` and
`client.convex.mutation`) are plain `vi.fn` answers under `h.raw.doors`.

`pnpm build` writes `dist/frontend/` and syncs `bonobo.plugin.json` file hashes plus the `dist/bonobo.plugin.json` copy the app fetches at publish time. Commit `dist/` — the publisher reads it from the repository.
