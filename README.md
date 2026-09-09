# Chitchat

Chitchat is team chat inside Bonobo Senate Press. It uses React 19 and its own Convex backend and database. People use their existing Press account. There is no separate signup.

The plugin stays in its own Git repository, mounted in Press at `plugins/bonobo-plugin-chitchat`. Its frontend, native backend, schema, tests, and built UI assets belong here. Press owns login, workspace membership, plugin installation, and Files. The SDK stays a separate package.

## Chat and UI

- Public channels, private channels, and direct messages (private channels with two people).
- Channel names and topics, archive and unarchive, private member access, leave and delete.
- Messages, one-level threads, author-only edits and deletes, eight reactions, and workspace-file attachments.
- Unread and mention badges, a New divider, and Unreads, Threads, and Activity views.
- A channel sidebar, message pane, and resizable thread pane. Small screens use a channel drawer and a separate thread view.
- Keyboard controls, accessible names, focus return, and composition-aware Enter handling.

The organization owner can read private channels. The plugin lists only private channels the person joined. Files copies have their own sharing settings. File managers can share them with other people, including later updates.

Internet access is required. New sends are blocked without a valid lease and live socket. Drafts stay in the open frame. Already-submitted uncertain requests keep their original ID and payload. No offline send queue is created. A Chitchat outage does not stop the rest of Press.

## Native data and queries

`convex/schema.ts` defines channels, channel members, messages, thread summaries, reactions, read states, request receipts, access mirrors, sessions, and transcript work. Native IDs link chat docs. Press user, membership, workspace, installation, and account IDs remain source identifiers.

Root messages have a stable per-channel sequence. Replies have both a per-thread sequence and a per-channel reply sequence. Timestamps display time; they do not decide pagination or unread order. Mutations save the message, summaries, request receipt, and transcript job in one transaction.

An exact successful request can be checked again without writing twice. Reusing an ID with changed input is refused. Current read access is checked before returning a receipt. New writes also check current write permission, expected revision, channel state, and attachment proofs.

Queries use indexes and bounded pages. The live message head has at most 50 messages. History keeps at most five root pages and two reply pages. Each pane has a 3 MiB retained-message limit. Dropped pages remain reachable through older/newer controls. New arrivals while reading older history offer a return to the latest messages.

One open edit per pane stays mounted when its message leaves the loaded window. The draft keeps the revision and mentions from when Edit opened. If another client saves first, Save returns a conflict and keeps the draft. A real access loss clears protected content.

The main log marks only visible roots read. A narrow thread covers that log and stops its read updates. Replies have separate per-thread read positions. The channel reply position advances only through replies covered by those thread positions, in bounded steps. Reading one thread cannot clear another thread's unread replies. Existing read positions remain the baseline; the app does not guess what people saw before this fix.

Channel and overview pages request at most 50 entries; the member picker requests at most 100. Empty filtered pages keep their continuation cursor. The name cache holds at most 1,000 entries for five minutes. Partial unread totals show a plus sign.

## Press login and access

Press is the only identity authority for this release. `src/session.tsx` owns a separate Convex client for Chitchat. The SDK client still points to Press for the host bridge, theme, and Files.

1. The frame sends its current Press plugin bearer to Chitchat's `/auth/lease`.
2. Chitchat calls `/api/v1/plugins/identity/exchange` with its server-held service proof.
3. Press checks the current user, membership, installation, version, capabilities, service account, and plugin session.
4. Press signs a short ES256 JWT with audience `bonobo-plugin:chitchat`, issuer `<PRESS_HTTP_URL>/plugins-services`, and the exact exchange and membership lifetime.
5. Chitchat catches up its versioned access mirror before admitting that lease.

The target lease is 30 seconds. Membership and permission changes can reach Chitchat sooner through durable access events. If catch-up or renewal fails, access closes when the current lease expires. This is an explicit brief revocation window. Scheduled expiry writes also invalidate idle subscriptions. The browser checks a conservative monotonic deadline before submitting.

Removal and reinvitation start a new membership lifetime. Old private grants do not become valid again. Uninstall, account changes, and version changes retire their old authority. Member pages use `/api/v1/plugins/members/list`; ordered events use `/api/v1/plugins/access/changes`. The 30-second cron schedules at most 50 installations per transaction and continues later pages. It owns background retries; failed requests never start another retry chain. Saved progress resumes on the next tick. Lease expiry remains independent of polling.

## Markdown transcripts

The native database is the source of chat. Transcript failure never rolls back a saved message. The UI shows connection, pending, running, blocked, and saved states separately from message delivery.

Each new dataset creates a fresh `/chitchat-<generation>` root. Existing datasets retain their exact root, folder, and file IDs. The public API cutover keeps native chats, saved requests, Markdown bytes, metadata, permissions, and locks. Old plugin-store data is not read into native chat.

Inside the dataset root, the layout and format remain:

- `README.md` lists public channels.
- Public transcripts use `<slug>.md` and numbered `<slug>.001.md` rollovers.
- Private transcripts use `private/<slug>-<digest8>/<slug>-<digest8>.md`.
- Each file stays within 100,000 UTF-8 bytes. The current rollover scheme is retained.
- Message markers, UTC dates, saved author names, two-space reply indentation, edit/delete flags, attachment names, and reaction lines keep their existing format. Signed download URLs are never stored.

Connect Files from the channel's transcript status. The server uses `/api/v1/plugins/service-grants/*` to exchange and seal a Files-only grant for the exact root. Grants are encrypted before storage.

Files writes use the public plugin folder, access, and archive APIs plus `/api/v1/files/write`.
Writer inspection, generation advance, and reader undo are general public Files capabilities.
`JSON.stringify([generation, channelPublicId])` is the opaque writer resource key; `__root` identifies
the README writer inside Chitchat only. Press never parses this value. Chitchat sends the original
saved operation ID, sequence, target and revision checks on every retry. Its 100,000-byte Markdown
limit remains local even though the public API supports other editable text and larger bounds.

A workspace admin must make the first connection. Both the connecting person and the exact Chitchat service account need **Can manage** on the workspace to create the initial locked root. Creating later locked folders needs **Can manage** on their parent folder or workspace. **Can write** alone cannot set their locks.

After the root and `private` container exist, reduce the account's broad access where possible. Keep the workspace **Can write** permission needed for ordinary file writes, and **Can manage** on the exact generated root and `private` container. Normal folder grants do not pass to other folders or files. When creating a private channel folder, the public API grants **Can manage** on that new folder to the exact bound service account. The connecting person must be allowed to manage that account and grant access on the parent. This lets Chitchat update the transcript and its readers. Later setup calls keep existing grants unchanged and never restore a removed grant. The connecting person must also keep the Files permissions needed for each operation.

Transcript jobs are ordered per channel. Work claims, immutable source input, staged output, target IDs, write revisions, operation IDs, and checkpoints survive retries. A host transaction rechecks current access, labels, parent identity, file revision, and writer generation when publishing. A lost response can be checked without publishing twice.

Ordinary updates preserve unrelated manual text. An ambiguous edited block stops sync. Explicit **Rebuild copies** asks before replacing manual edits with saved chat. Rebuilds use a fixed source boundary and retire earlier writers. Their request ID remains valid after completion.

The README index runs independently from channel jobs. It stays within the same 100,000-byte limit and does not split into extra files. If it grows too large, archive channels or shorten their names, then retry the index. Its own status and retry control do not claim that channel transcripts failed.

A successful **Connect Files** also selects that connection for the shared README index. This repairs an expired index grant even when its first channel is no longer available. Failed setup keeps the previous choice. Background renewal does not choose another sponsor. A pending index write keeps its exact saved request while the new connection retries it.

New output starts with Chitchat labels and a plugin lock. Removing its label, moving or replacing a pinned folder, removing account access, or applying a human lock can block sync. Repeated setup never repairs those choices. A manual sharing change detaches automatic reader updates. The Files UI then owns that sharing.

Removing workspace chat read permission does not revoke a separate Files grant while workspace and channel membership remain active. Removing the workspace membership invalidates attached transcript grants from that membership lifetime.

Once Files setup has started, private reader changes wait for its acknowledgement before chat opens under the new access. Before any Files connection exists, they may complete locally. If authority changes during a Files step, the saved reader operation must be rolled back safely or cancelled under its original operation ID before a delayed apply can arrive. Current file locks still apply. A missing proof or newer file state keeps sync blocked. Manual sharing is acknowledged without changing it.

After a plugin upgrade or account rebind, Reconnect can settle the saved reader operation with a new sealed grant for the same installation and exact root. The current person and account must have Files write and sharing-management access. Old credentials cannot authorize new changes. Recovery still checks locks, labels, exact writer and reader revisions, and membership lifetimes.

Private deletion removes chat access first. It then finishes all transcript copies through the saved deletion sequence. Only after those copies finish does it archive each saved transcript file, one file per worker step. Each archive request is saved before sending, so a lost reply can be retried exactly. The folder and unrelated files remain in Files. Archiving keeps the current text, including manual edits; it does not replace content. A current lock or missing permission blocks the next step. Manual sharing stops automatic archive.

## Configuration

The current development projects are separate:

| Project  | Convex deployment            |
| -------- | ---------------------------- |
| Press    | `grand-finch-267`            |
| Chitchat | `exuberant-hippopotamus-790` |

Local frontend variables live in ignored `.env.local`; see `.env.example`. Build-time URLs must match the exact HTTPS and WSS origins declared in `bonobo.plugin.json`.

Set these secrets on the Chitchat deployment:

- `PRESS_HTTP_URL`: configured Press HTTP origin.
- `PRESS_CHITCHAT_SERVICE_SECRET`: Press-issued Chitchat service proof.
- `CHITCHAT_GRANT_ENCRYPTION_KEY`: base64 of 32 random bytes for AES-GCM.

Press needs no Chitchat URL, callback secret, or product-specific environment value. The publisher
registers Chitchat through the normal service controls. Never put server secrets in Vite variables,
source, logs, or built assets.

## Development and release

Use the pinned Node version through Vite Plus:

```powershell
vp env exec pnpm --ignore-workspace install
vp env exec pnpm run typecheck
vp env exec pnpm run build
vp env exec pnpm run test:once
```

Run these from this repository, one command at a time. The manifest tests read `dist`, which the build replaces. Never run that test suite in parallel with a build. Deploy the configured Chitchat development backend with `vp env exec pnpm exec convex dev --once`. Check the deployment name first. Press integration changes deploy from the Press repository.

Backend tests use `convex-test`. Frontend tests feed native query snapshots to the real React components. They do not replace live embedded checks. Verify real login renewal, two members, private access loss, Files sharing and locks, transcript readback, large history, keyboard use, and small screens with Press's Playwriter harness.

The build writes the three frontend assets and both manifest copies. It checks per-file and total size limits, review line lengths, and hashes. Build twice and confirm stable bytes. Commit built assets because Press fetches them from GitHub. No generic backend worker ships.

The SDK is pinned to a real mirror commit. Review the host and SDK changes first, mirror the SDK, pin it here, then publish the exact reviewed plugin commit. Update the installation and accept its declared origins and capabilities. Finally verify the served version and bytes. Never point the parent gitlink past the published commit.

## Recovery

After native chat has accepted messages, keep its database and transcript queue. Fix and release the current app. Do not restore the old generic-store plugin or import old Markdown copies as chat; that would hide messages saved since the rebuild.

Use **Retry sync** after a temporary Files failure. Use **Reconnect Files** when its connection needs renewal, including after a plugin update. Both still check current permissions and locks. They never restore removed account grants or overwrite manual sharing. **Rebuild copies** requires explicit confirmation before replacing manual text.

Unfinished private deletion appears in **Files sync** for the current owner or the original delete actor with the same active membership lifetime. This view shows copy progress and recovery controls. It does not reopen deleted messages. Rebuild remains available while copies are pending and stops being available when file archiving starts. A scheduled sweep also resumes interrupted archive work.

When the last channel member leaves the workspace, cleanup saves owner recovery before trying to update Files readers. This lets a current owner reconnect if the old sponsor can no longer write. A channel that never started Files setup needs no recovery entry.

Verify access, pending jobs, and the served bundle after a repair. Uninstall is not a temporary pause: it retires the installation's authority. Never uninstall, reset the plugin registry, or wipe Press as a shortcut to recover this plugin.
