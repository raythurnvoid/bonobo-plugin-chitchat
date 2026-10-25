import type { BonoboClient } from "bonobo-plugin-sdk/frontend";
import { useAction, useMutation } from "convex/react";
import { useId, useRef, useState } from "react";
import { api } from "../convex/_generated/api";
import type { Id } from "../convex/_generated/dataModel";
import { Dialog } from "./dialog";
import { use_chat_session } from "./session";
import { use_chat_query } from "./chat-query";

export function TranscriptStatus(props: { client: BonoboClient; channelId: Id<"channels"> }) {
	const session = use_chat_session();
	const status = use_chat_query(session, api.transcripts.status, { channelId: props.channelId });
	const connect = useAction(api.transcripts.connect);
	const retry = useMutation(api.transcripts.retry);
	const reconcile = useMutation(api.transcripts.reconcile);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [confirmRebuild, setConfirmRebuild] = useState(false);
	const [replaceEdits, setReplaceEdits] = useState(false);
	const connectRequest = useRef<string | null>(null);
	const rebuildRequest = useRef<string | null>(null);
	const titleId = useId();
	const replaceId = useId();
	const connect_files = async () => {
		if (busy) return;
		if (!session.can_request_now()) {
			setError("Chitchat is reconnecting. Try again shortly.");
			return;
		}
		connectRequest.current ??= crypto.randomUUID();
		setBusy(true);
		setError(null);
		try {
			const pluginToken = await props.client.getToken();
			if (!session.can_request_now()) {
				setError("Chitchat is reconnecting. Try again shortly.");
				return;
			}
			const result = await connect({
				channelId: props.channelId,
				pluginToken,
				clientRequestId: connectRequest.current,
			});
			if (result._nay) setError(result._nay.message);
			else connectRequest.current = null;
		} catch {
			setError("Could not confirm the Files connection. Retry to check it.");
		} finally {
			setBusy(false);
		}
	};
	const retry_sync = async () => {
		if (busy) return;
		if (!session.can_request_now()) {
			setError("Chitchat is reconnecting. Try again shortly.");
			return;
		}
		setBusy(true);
		setError(null);
		try {
			const result = await retry({ channelId: props.channelId });
			if (result._nay) setError(result._nay.message);
		} catch {
			setError("Could not restart transcript sync. Try again.");
		} finally {
			setBusy(false);
		}
	};
	const rebuild = async () => {
		if (busy || !replaceEdits || !status?.canReconcile) return;
		if (!session.can_request_now()) {
			setError("Chitchat is reconnecting. Try again shortly.");
			return;
		}
		if (!session.canSend) return;
		rebuildRequest.current ??= crypto.randomUUID();
		setBusy(true);
		setError(null);
		try {
			const result = await reconcile({ channelId: props.channelId, clientRequestId: rebuildRequest.current });
			if (result._nay) setError(result._nay.message);
			else {
				rebuildRequest.current = null;
				setConfirmRebuild(false);
				setReplaceEdits(false);
			}
		} catch {
			setError("Could not confirm the rebuild request. Retry to check it.");
		} finally {
			setBusy(false);
		}
	};
	// The error code of the block that the status line shows: the channel first, then the channel index.
	const blockedErrorCode =
		status?.status === "blocked" ? status.errorCode : status?.indexStatus === "blocked" ? status.indexErrorCode : null;
	// Only Reconnect fixes an expired connection or a sponsor who left, so Retry would fail again.
	const needsReconnect = blockedErrorCode === "auth_expired" || blockedErrorCode === "sponsor_gone";
	// The first 5 minutes of temporary failures look like normal work. After that, say when the next try runs.
	const delayed =
		!!status &&
		status.status !== "blocked" &&
		status.retryingSince !== null &&
		Date.now() - status.retryingSince >= 5 * 60_000;
	const name = status ? `#${status.channelName}` : "";
	const copy = !status
		? "Checking transcript access…"
		: status.deletionPhase
			? status.status === "blocked"
				? status.errorCode === "auth_expired"
					? `${name} was deleted. Archiving its Files copies is paused because the connection expired. ${status.canConnect ? "Reconnect Files to finish." : "Ask a channel manager to reconnect Files to finish."}`
					: "Channel deleted. Its Files copies need attention."
				: status.deletionPhase === "copy"
					? "Channel deleted. Saving its last messages in Files…"
					: "Channel deleted. Archiving its Files copies…"
			: status.status === "ready"
				? status.indexStatus === "blocked"
					? status.indexErrorCode === "auth_expired"
						? "Chat is saved. The channel list file (README.md) is paused because its Files connection expired. Reconnect Files from any channel."
						: "Chat is saved. The channel index needs attention."
					: status.indexStatus === "ready"
						? "Saved in Files"
						: "Channel saved. Updating the channel index…"
				: status.status === "not_connected"
					? "Chat is saved. Connect Files to keep Markdown copies."
					: status.status === "blocked"
						? status.errorCode === "auth_expired"
							? `Chat is saved. Saving ${name} to Files is paused because the Files connection expired.${status.canConnect ? " Reconnect Files to continue. New messages will be copied after you reconnect." : " Ask a channel manager to reconnect Files."}`
							: status.errorCode === "permission"
								? `Chat is saved. Saving ${name} to Files is paused. Chitchat can no longer write to ${status.folderPath ?? "its folder"}.${status.canConnect ? " Give the Chitchat service account Can manage on that folder, then choose Retry sync." : " Ask a channel manager to fix the folder access."}`
								: status.errorCode === "sponsor_gone"
									? `Chat is saved. The person who connected Files no longer has access.${status.canConnect ? " Reconnect Files to use your own connection." : " Ask a channel manager to reconnect Files."}`
									: `Chat is saved. Transcript sync needs attention.${status.canConnect ? "" : " Ask a channel manager to check it."}`
						: delayed
							? status.nextAttemptAt === null
								? "Chat is saved. Saving to Files is delayed. Chitchat keeps trying."
								: `Chat is saved. Saving to Files is delayed. Next try at ${new Date(status.nextAttemptAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.`
							: "Chat is saved. Updating Files…";
	return (
		<>
			<div className="transcript-status">
				<span role="status">{copy}</span>
				{status?.canConnect ? (
					<button
						type="button"
						className="button"
						disabled={busy || !session.connected}
						onClick={() => void connect_files()}
					>
						{busy ? "Connecting…" : status.status === "not_connected" ? "Connect Files" : "Reconnect Files"}
					</button>
				) : null}
				{(status?.status === "blocked" || status?.indexStatus === "blocked" || delayed) &&
				status.canConnect &&
				!needsReconnect ? (
					<button
						type="button"
						className="button"
						disabled={busy || !session.connected}
						onClick={() => void retry_sync()}
					>
						{delayed ? "Retry now" : "Retry sync"}
					</button>
				) : null}
				{status ? (
					<details>
						<summary>Transcript details</summary>
						{status.folderPath ? (
							<p>
								{status.folderNodeId ? "Folder in Bonobo Senate Files" : "Planned folder in Bonobo Senate Files"}:{" "}
								<code>{status.folderPath}</code>
							</p>
						) : null}
						{status.readerMode === "manual" ? <p>Files sharing is managed in Bonobo Senate.</p> : null}
						{status.error ? <p role="alert">{status.error}</p> : null}
						<p>
							Channel index:{" "}
							{status.indexStatus === "ready"
								? "saved"
								: status.indexStatus === "blocked"
									? "needs attention"
									: "updating"}
							.
						</p>
						{status.indexError ? <p role="alert">{status.indexError}</p> : null}
						{/* An expired connection or a conflict is not a folder access problem. */}
						{status.status === "blocked" &&
						status.folderPath &&
						(status.errorCode === null || status.errorCode === "permission") ? (
							<p>
								{status.folderNodeId
									? "If folder access is missing, open this folder in Bonobo Senate Files. Give the Chitchat service account Can manage, then reconnect."
									: "If permissions blocked setup, ask a workspace admin to connect. Both the person connecting and the Chitchat service account need Can manage on the parent folder or workspace to create the locked folder."}
							</p>
						) : null}
						{status.canReconcile ? (
							<button
								type="button"
								className="button"
								disabled={busy || !session.connected}
								onClick={() => {
									setConfirmRebuild(true);
									setError(null);
								}}
							>
								Rebuild copies
							</button>
						) : null}
					</details>
				) : null}
				{error && !confirmRebuild ? <span role="alert">{error}</span> : null}
			</div>
			{confirmRebuild ? (
				<Dialog
					labelledBy={titleId}
					accessUnavailable={!session.refreshing && (!session.ready || status === null)}
					onReconnect={session.retry}
					onClose={() => {
						if (!busy) setConfirmRebuild(false);
					}}
				>
					<h2 id={titleId} className="dialog-title">
						Rebuild transcript copies?
					</h2>
					<p>
						This replaces the generated Markdown copies from saved chat. Edits made directly to those copies will be
						replaced. File sharing and write permissions still apply.
					</p>
					<label htmlFor={replaceId}>
						<input
							id={replaceId}
							type="checkbox"
							checked={replaceEdits}
							disabled={busy}
							onChange={(event) => setReplaceEdits(event.currentTarget.checked)}
						/>
						Replace edits in the generated transcripts
					</label>
					{error ? (
						<p className="form-error" role="alert">
							{error}
						</p>
					) : null}
					<div className="dialog-actions">
						<button
							type="button"
							className="button"
							data-dialog-initial
							disabled={busy}
							onClick={() => setConfirmRebuild(false)}
						>
							Cancel
						</button>
						<button
							type="button"
							className="button button-danger"
							disabled={busy || !replaceEdits || !session.connected}
							onClick={() => void rebuild()}
						>
							{busy ? "Starting…" : "Rebuild copies"}
						</button>
					</div>
				</Dialog>
			) : null}
		</>
	);
}
