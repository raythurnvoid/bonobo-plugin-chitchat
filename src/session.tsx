import type { BonoboClient } from "bonobo-plugin-sdk/frontend";
import { ConvexProvider, ConvexReactClient, useConvexConnectionState, useQuery } from "convex/react";
import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { z } from "zod";
import { api } from "../convex/_generated/api";

const SYNCING_MESSAGE = "Getting the member list ready… Chitchat will open by itself.";

function create_chat_connection(host: BonoboClient) {
	const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL, { authRefreshTokenLeewaySeconds: 15 });
	let snapshot: {
		phase: "connecting" | "ready" | "syncing" | "unavailable" | "denied";
		message: string | null;
		deadline: number;
		refreshing: boolean;
	} = {
		phase: "connecting",
		message: null,
		deadline: 0,
		refreshing: false,
	};
	const listeners = new Set<() => void>();
	let cached: string | null = null;
	let pending: Promise<string | null> | null = null;
	let request: AbortController | null = null;
	let expiryTimer: ReturnType<typeof setTimeout> | null = null;
	let retryTimer: ReturnType<typeof setTimeout> | null = null;
	let failures = 0;
	let closed = false;
	let confirmed = false;
	// When the lease route first answered "syncing" in this run of answers. Null after any other answer.
	let syncingSince: number | null = null;

	function update(next: Partial<typeof snapshot>) {
		if (closed) return;
		snapshot = { ...snapshot, ...next };
		for (const listener of listeners) listener();
	}

	function on_auth(authenticated: boolean) {
		confirmed = authenticated;
		if (authenticated && performance.now() < snapshot.deadline) update({ phase: "ready", message: null });
		else if (!pending && snapshot.phase !== "denied" && snapshot.phase !== "syncing")
			update({ phase: "unavailable", message: "Chitchat is reconnecting. Your draft is kept." });
	}

	function retry() {
		if (closed || pending) return;
		cached = null;
		if (retryTimer) clearTimeout(retryTimer);
		retryTimer = null;
		// Keep the syncing pause on screen while it asks again, so it does not flicker.
		if (snapshot.phase !== "syncing") update({ phase: "connecting", message: null });
		convex.setAuth(fetch_token, on_auth);
	}

	function fetch_token(args: { forceRefreshToken: boolean }): Promise<string | null> {
		if (!args.forceRefreshToken && cached && performance.now() < snapshot.deadline) return Promise.resolve(cached);
		if (pending) return pending;
		update({ refreshing: true });
		pending = (async () => {
			const startedAt = performance.now();
			request = new AbortController();
			const timeout = setTimeout(() => request?.abort(), 25_000);
			let syncingRetryMs: number | null = null;
			try {
				const pressToken = await host.getToken();
				const url = `${import.meta.env.VITE_CONVEX_SITE_URL}/auth/lease`;
				const options = {
					method: "POST",
					redirect: "error",
					headers: { "Content-Type": "application/json" },
					signal: request.signal,
				} satisfies RequestInit;
				let response = await fetch(url, { ...options, body: JSON.stringify({ pressToken }) });
				if (response.status === 401) {
					// The host may have rebound the plugin account while the SDK still cached its old bearer.
					const refreshedToken = await host.refreshToken();
					response = await fetch(url, { ...options, body: JSON.stringify({ pressToken: refreshedToken }) });
				}
				const raw: unknown = await response.json();
				const lease = z
					.object({ jwt: z.string(), expiresAt: z.number(), validForMs: z.number().min(0).max(30_000) })
					.safeParse(raw);
				const syncing = z
					.object({ code: z.literal("syncing"), phase: z.enum(["members", "events"]), retryAfterMs: z.number() })
					.safeParse(raw);
				syncingSince = response.status === 503 && syncing.success ? (syncingSince ?? performance.now()) : null;
				// Chitchat is still reading workspace access. Show a status and ask again by itself.
				// After about 2 minutes, show a real error with Reconnect instead.
				if (syncing.success && syncingSince !== null && performance.now() - syncingSince < 120_000) {
					syncingRetryMs = Math.min(30_000, Math.max(1_000, syncing.data.retryAfterMs));
					update({ phase: "syncing", message: SYNCING_MESSAGE });
					throw new Error("Chitchat access is syncing");
				}
				if (!response.ok || !lease.success) {
					const denied = response.status === 401 || response.status === 403;
					update({
						phase: denied ? "denied" : "unavailable",
						message: denied
							? "Bonobo Senate no longer allows this Chitchat session."
							: "Chitchat is reconnecting. Your draft is kept.",
					});
					throw new Error("Chitchat lease was refused");
				}
				// Start the browser deadline before the request. Network delay can only shorten it.
				const deadline = startedAt + lease.data.validForMs;
				if (deadline <= performance.now()) throw new Error("Chitchat lease expired in transit");
				cached = lease.data.jwt;
				failures = 0;
				if (expiryTimer) clearTimeout(expiryTimer);
				expiryTimer = setTimeout(
					() => {
						cached = null;
						update({ phase: "unavailable", message: "Chitchat is reconnecting. Your draft is kept." });
						if (!pending) {
							confirmed = false;
							convex.clearAuth();
							retry();
						}
					},
					Math.max(0, deadline - performance.now()),
				);
				update({ phase: confirmed ? "ready" : "connecting", deadline, message: null });
				return cached;
			} catch {
				cached = null;
				if (syncingRetryMs !== null) {
					// Each lease request runs its own sync, and many frames may wait for the same one.
					// So double the wait after each syncing answer, up to 30 s.
					retryTimer = setTimeout(retry, Math.min(30_000, syncingRetryMs * 2 ** Math.min(failures, 4)));
					failures += 1;
					return null;
				}
				if (snapshot.phase !== "denied")
					update({ phase: "unavailable", message: "Chitchat is reconnecting. Your draft is kept." });
				if (!closed && snapshot.phase !== "denied") {
					failures += 1;
					retryTimer = setTimeout(retry, Math.min(30_000, 2_000 * 2 ** Math.min(failures, 4)));
				}
				return null;
			} finally {
				clearTimeout(timeout);
				request = null;
				pending = null;
				update({ refreshing: false });
			}
		})();
		return pending;
	}

	return {
		convex,
		start: () => convex.setAuth(fetch_token, on_auth),
		// A person who chooses Reconnect starts a new 2-minute wait for a syncing answer.
		retry: () => {
			syncingSince = null;
			retry();
		},
		getSnapshot: () => snapshot,
		subscribe: (listener: () => void) => {
			listeners.add(listener);
			return () => {
				listeners.delete(listener);
			};
		},
		can_request_now: () =>
			snapshot.phase === "ready" &&
			!snapshot.refreshing &&
			performance.now() < snapshot.deadline &&
			convex.connectionState().isWebSocketConnected,
		close: () => {
			closed = true;
			request?.abort();
			if (expiryTimer) clearTimeout(expiryTimer);
			if (retryTimer) clearTimeout(retryTimer);
			listeners.clear();
			void convex.close();
		},
	};
}

const ChatConnection = createContext<ReturnType<typeof create_chat_connection> | null>(null);

export function ChatSessionProvider(props: { client: BonoboClient; children: ReactNode }) {
	const [connection] = useState(() => create_chat_connection(props.client));
	useEffect(() => {
		connection.start();
		const reconnect = () => {
			// A syncing pause already asks again by itself.
			const phase = connection.getSnapshot().phase;
			if (phase !== "ready" && phase !== "syncing") connection.retry();
		};
		window.addEventListener("online", reconnect);
		window.addEventListener("focus", reconnect);
		return () => {
			window.removeEventListener("online", reconnect);
			window.removeEventListener("focus", reconnect);
			connection.close();
		};
	}, [connection]);
	return (
		<ChatConnection.Provider value={connection}>
			<ConvexProvider client={connection.convex}>{props.children}</ConvexProvider>
		</ChatConnection.Provider>
	);
}

export function use_chat_session() {
	const connection = useContext(ChatConnection);
	if (!connection) throw new Error("Chitchat needs its session provider");
	const snapshot = useSyncExternalStore(connection.subscribe, connection.getSnapshot);
	const socket = useConvexConnectionState();
	const enabled = snapshot.phase === "ready" && performance.now() < snapshot.deadline;
	const current = useQuery(api.sessions.current, enabled ? {} : "skip");
	const status = useQuery(api.sessions.status, enabled ? {} : "skip");
	const [previous, setPrevious] = useState(current);
	if (current && previous !== current) setPrevious(current);
	if ((status === "denied" || snapshot.phase === "denied") && previous !== undefined) setPrevious(undefined);
	const refreshing = enabled && status === "refresh_required";
	const member = refreshing ? previous : current;
	const ready = enabled && status === "ready" && current !== null && current !== undefined;
	return {
		member,
		ready,
		// Lets Playwriter and the UI read the connection state from one value.
		connection:
			snapshot.phase === "denied" || status === "denied"
				? "denied"
				: snapshot.phase === "syncing"
					? "syncing"
					: ready
						? "ready"
						: "reconnecting",
		connected: enabled && status === "ready" && socket.isWebSocketConnected,
		refreshing,
		canSend:
			enabled && status === "ready" && !!current?.canWrite && !snapshot.refreshing && socket.isWebSocketConnected,
		can_request_now: connection.can_request_now,
		message:
			snapshot.message ??
			(status === "denied"
				? "Your Chitchat access changed. Reconnect to continue."
				: enabled && !socket.isWebSocketConnected
					? "Chitchat is disconnected. Your draft is kept."
					: null),
		retry: connection.retry,
	};
}
