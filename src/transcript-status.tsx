import type { BonoboClient } from "bonobo-plugin-sdk/frontend";
import { useAction, useMutation, useQuery } from "convex/react";
import { useId, useRef, useState } from "react";
import { api } from "../convex/_generated/api";
import type { Id } from "../convex/_generated/dataModel";
import { Dialog } from "./dialog";
import { use_chat_session } from "./session";

export function TranscriptStatus(props: { client: BonoboClient; channelId: Id<"channels"> }) {
	const session = use_chat_session();
	const status = useQuery(api.transcripts.status, session.ready ? { channelId: props.channelId } : "skip");
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
		if (busy || !session.can_request_now()) return;
		connectRequest.current ??= crypto.randomUUID();
		setBusy(true);
		setError(null);
		try {
			const pluginToken = await props.client.getToken();
			if (!session.can_request_now()) return;
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
		if (busy || !session.can_request_now()) return;
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
		if (busy || !replaceEdits || !status?.canReconcile || !session.canSend || !session.can_request_now()) return;
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
	const copy = !status
		? "Checking transcript access…"
		: status.status === "ready"
			? status.indexStatus === "blocked"
				? "Chat is saved. The channel index needs attention."
				: status.indexStatus === "ready"
					? "Saved in Files"
					: "Channel saved. Updating the channel index…"
			: status.status === "not_connected"
				? "Chat is saved. Connect Files to keep Markdown copies."
				: status.status === "blocked"
					? "Chat is saved. Transcript sync needs attention."
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
				{(status?.status === "blocked" || status?.indexStatus === "blocked") && status.canConnect ? (
					<button
						type="button"
						className="button"
						disabled={busy || !session.connected}
						onClick={() => void retry_sync()}
					>
						Retry sync
					</button>
				) : null}
				{status ? (
					<details>
						<summary>Transcript details</summary>
						{status.folderPath ? (
							<p>
								{status.folderNodeId ? "Folder in Press Files" : "Planned folder in Press Files"}:{" "}
								<code>{status.folderPath}</code>
							</p>
						) : null}
						{status.readerMode === "manual" ? <p>Files sharing is managed in Press.</p> : null}
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
						{status.status === "blocked" && status.folderPath ? (
							<p>
								{status.folderNodeId
									? "If folder access is missing, open this folder in Press Files. Give the Chitchat service account Can manage, then reconnect."
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
