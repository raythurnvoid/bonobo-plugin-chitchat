import { bonobo_ui_connect } from "bonobo-plugin-sdk/frontend";
import { ConvexProvider } from "convex/react";
import { createRoot } from "react-dom/client";
import { App, ChatErrorBoundary } from "./app";
import "./chitchat.css";

function BootScreen(props: { message: string; isError?: boolean }) {
	return (
		<div
			className={props.isError ? "boot-screen is-error" : "boot-screen"}
			role={props.isError ? "alert" : "status"}
			aria-live={props.isError ? undefined : "polite"}
		>
			{props.message}
		</div>
	);
}

const container = document.getElementById("root");
if (!container) {
	// Unreachable: index.html always ships the #root element.
	throw new Error("index.html is missing the #root element");
}
const root = createRoot(container);
root.render(<BootScreen message="Connecting…" />);

bonobo_ui_connect().then(
	(client) => {
		// The context is a union; Chitchat is only embedded as a page.
		if (client.context.kind === "page") {
			document.title = client.context.pageTitle;
		}
		// The SDK owns the frame's Convex client; the provider hands it to the `convex/react` hooks.
		// A live read that throws (a caller with no identity any more) lands in the boundary.
		root.render(
			<ConvexProvider client={client.convex}>
				<ChatErrorBoundary client={client}>
					<App client={client} />
				</ChatErrorBoundary>
			</ConvexProvider>,
		);
	},
	(error: unknown) => {
		root.render(<BootScreen message={error instanceof Error ? error.message : String(error)} isError />);
	},
);
