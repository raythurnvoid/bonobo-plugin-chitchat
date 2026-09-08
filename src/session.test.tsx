import type { BonoboClient } from "bonobo-plugin-sdk/frontend";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useState, type ReactNode } from "react";
import { getFunctionName, type FunctionReference } from "convex/server";
import { ChatSessionProvider, use_chat_session } from "./session";

const connection = vi.hoisted(() => ({
	fetchToken: null as null | ((args: { forceRefreshToken: boolean }) => Promise<string | null>),
	member: {
		hostUserId: "member",
		displayName: "Member",
		installationId: "installation",
		generation: "fresh",
		membershipLifetime: 1,
		canWrite: true,
		isOwner: false,
		expiresAt: 9999999999999,
	},
	connected: true,
}));
vi.mock("convex/react", () => ({
	ConvexReactClient: class {
		setAuth(
			fetchToken: (args: { forceRefreshToken: boolean }) => Promise<string | null>,
			onChange: (ready: boolean) => void,
		) {
			connection.fetchToken = fetchToken;
			void fetchToken({ forceRefreshToken: false }).then((token) => onChange(token !== null));
		}
		connectionState() {
			return { isWebSocketConnected: connection.connected };
		}
		clearAuth() {}
		async close() {}
	},
	ConvexProvider: ({ children }: { children: ReactNode }) => children,
	useConvexConnectionState: () => ({ isWebSocketConnected: connection.connected }),
	useQuery: (query: FunctionReference<"query">, args: object | "skip") =>
		args === "skip" ? undefined : getFunctionName(query) === "sessions:current" ? connection.member : "ready",
}));

function Probe() {
	const session = use_chat_session();
	const [sent, setSent] = useState("");
	return (
		<>
			<button type="button" onClick={() => setSent(session.can_request_now() ? "Submitted" : "Blocked")}>
				{session.ready ? "Ready" : "Waiting"}
			</button>
			<p>{sent}</p>
			<p>{session.message}</p>
		</>
	);
}

beforeEach(() => {
	connection.connected = true;
	connection.fetchToken = null;
	vi.stubEnv("VITE_CONVEX_URL", "https://chat.test");
	vi.stubEnv("VITE_CONVEX_SITE_URL", "https://chat.test");
});
afterEach(() => {
	cleanup();
	vi.unstubAllGlobals();
	vi.unstubAllEnvs();
	vi.restoreAllMocks();
});

describe("ChatSessionProvider", () => {
	test("refreshes a rejected Press bearer once before reconnecting", async () => {
		const getToken = vi.fn().mockResolvedValue("plu_old");
		const refreshToken = vi.fn().mockResolvedValue("plu_new");
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce(Response.json({ message: "Unauthorized" }, { status: 401 }))
			.mockResolvedValueOnce(
				Response.json({ jwt: "signed-token", expiresAt: Date.now() + 30_000, validForMs: 30_000 }),
			);
		vi.stubGlobal("fetch", fetchMock);
		render(
			<ChatSessionProvider client={{ getToken, refreshToken } as unknown as BonoboClient}>
				<Probe />
			</ChatSessionProvider>,
		);
		await screen.findByRole("button", { name: "Ready" });
		expect(refreshToken).toHaveBeenCalledTimes(1);
		expect(fetchMock).toHaveBeenCalledTimes(2);
		expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toEqual({ pressToken: "plu_new" });
	});

	test("does not rotate the Press bearer for routine native renewal", async () => {
		const getToken = vi.fn().mockResolvedValue("plu_current");
		const refreshToken = vi.fn();
		vi.stubGlobal(
			"fetch",
			vi
				.fn()
				.mockImplementation(async () =>
					Response.json({ jwt: "signed-token", expiresAt: Date.now() + 30_000, validForMs: 30_000 }),
				),
		);
		render(
			<ChatSessionProvider client={{ getToken, refreshToken } as unknown as BonoboClient}>
				<Probe />
			</ChatSessionProvider>,
		);
		await screen.findByRole("button", { name: "Ready" });
		await act(async () => {
			await connection.fetchToken?.({ forceRefreshToken: true });
		});
		expect(getToken).toHaveBeenCalledTimes(2);
		expect(refreshToken).not.toHaveBeenCalled();
	});

	test("checks the live socket at submission time", async () => {
		vi.stubGlobal(
			"fetch",
			vi
				.fn()
				.mockResolvedValue(Response.json({ jwt: "signed-token", expiresAt: Date.now() + 30_000, validForMs: 30_000 })),
		);
		render(
			<ChatSessionProvider client={{ getToken: async () => "plu_current" } as unknown as BonoboClient}>
				<Probe />
			</ChatSessionProvider>,
		);
		const button = await screen.findByRole("button", { name: "Ready" });
		connection.connected = false;
		fireEvent.click(button);
		expect(screen.getByText("Blocked")).toBeTruthy();
		expect(screen.getByText("Chitchat is disconnected. Your draft is kept.")).toBeTruthy();
	});

	test("checks the monotonic deadline before timers get a chance to run", async () => {
		let now = 0;
		vi.spyOn(performance, "now").mockImplementation(() => now);
		vi.stubGlobal(
			"fetch",
			vi
				.fn()
				.mockResolvedValue(Response.json({ jwt: "signed-token", expiresAt: Date.now() + 30_000, validForMs: 30_000 })),
		);
		render(
			<ChatSessionProvider client={{ getToken: async () => "plu_current" } as unknown as BonoboClient}>
				<Probe />
			</ChatSessionProvider>,
		);
		const button = await screen.findByRole("button", { name: "Ready" });
		now = 30_001;
		fireEvent.click(button);
		expect(screen.getByText("Blocked")).toBeTruthy();
	});
});
