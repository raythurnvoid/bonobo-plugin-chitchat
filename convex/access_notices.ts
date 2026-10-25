import { v } from "convex/values";
import { internalMutation, internalQuery, type ActionCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import { press_get_signing_key } from "./press";
import { transcripts_decrypt, transcripts_encrypt } from "./transcripts_secrets";

export const get_key = internalQuery({
	args: {},
	returns: v.union(v.string(), v.null()),
	// The table holds at most one doc.
	handler: async (ctx) => (await ctx.db.query("signing_keys").first())?.key ?? null,
});

export const claim_key_fetch = internalMutation({
	args: {},
	returns: v.union(v.id("signing_keys"), v.null()),
	handler: async (ctx) => {
		const keyDoc = await ctx.db.query("signing_keys").first();
		if (keyDoc && Date.now() - keyDoc.fetchedAt < 60_000) return null;
		if (!keyDoc) return await ctx.db.insert("signing_keys", { key: null, fetchedAt: Date.now() });
		await ctx.db.patch(keyDoc._id, { fetchedAt: Date.now() });
		return keyDoc._id;
	},
});

export const save_key = internalMutation({
	args: { keyId: v.id("signing_keys"), key: v.string() },
	returns: v.null(),
	handler: async (ctx, args) => {
		await ctx.db.patch(args.keyId, { key: args.key });
		return null;
	},
});

// Return null for text that is not valid base64.
function from_base64(text: string) {
	try {
		return Uint8Array.from(atob(text), (character) => character.charCodeAt(0));
	} catch {
		return null;
	}
}

// Standard Webhooks: the signature list holds `v1,<base64 HMAC-SHA256>` entries split by spaces.
// Any entry may match. crypto.subtle.verify compares in constant time.
async function check_signature(key: string, signed: Uint8Array<ArrayBuffer>, signatures: string) {
	const secret = from_base64(key.slice("whsec_".length));
	if (!secret) return false;
	const hmac = await crypto.subtle.importKey("raw", secret, { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
	for (const entry of signatures.split(" ")) {
		const [version, signature] = entry.split(",");
		// Bad base64 makes only this entry wrong. A later entry may still match.
		const bytes = version === "v1" && signature ? from_base64(signature) : null;
		if (bytes && (await crypto.subtle.verify("HMAC", hmac, bytes, signed))) return true;
	}
	return false;
}

// Check that Bonobo Senate signed this access notice in the last 5 minutes. `body` is the exact request bytes.
export async function access_notices_verify(ctx: ActionCtx, headers: Headers, body: Uint8Array<ArrayBuffer>) {
	const id = headers.get("webhook-id");
	const timestamp = headers.get("webhook-timestamp");
	const signatures = headers.get("webhook-signature");
	if (!id || !timestamp || !signatures || !/^\d+$/.test(timestamp)) return false;

	// Refuse old and future notices. A new key cannot fix the time, so do not fetch one.
	if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;

	const prefix = new TextEncoder().encode(`${id}.${timestamp}.`);
	const signed = new Uint8Array(prefix.length + body.length);
	signed.set(prefix);
	signed.set(body, prefix.length);
	const saved = await ctx.runQuery(internal.access_notices.get_key, {});
	// A saved key that cannot be decrypted, for example after CHITCHAT_GRANT_ENCRYPTION_KEY changed,
	// counts as no key. Then the fetch below replaces it.
	const savedKey = saved === null ? null : await transcripts_decrypt(saved).catch(() => null);
	if (savedKey !== null && (await check_signature(savedKey, signed, signatures))) return true;

	// Bonobo Senate replaces the key when the service secret rotates, so a mismatch may mean an old key.
	// Fetch the key at most once a minute. Then forged notices cannot make Chitchat flood Bonobo Senate.
	const keyId = await ctx.runMutation(internal.access_notices.claim_key_fetch, {});
	if (keyId === null) return false;
	const key = await press_get_signing_key(5_000);
	if (key === null) return false;
	await ctx.runMutation(internal.access_notices.save_key, { keyId, key: await transcripts_encrypt(key) });
	return await check_signature(key, signed, signatures);
}
