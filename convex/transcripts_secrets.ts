// The stored source credential also permits recovery of a lost rotation response.
async function key() {
	const encoded = process.env.CHITCHAT_GRANT_ENCRYPTION_KEY;
	if (!encoded) throw new Error("CHITCHAT_GRANT_ENCRYPTION_KEY is not set in Convex env");
	const bytes = Uint8Array.from(atob(encoded), (character) => character.charCodeAt(0));
	if (bytes.byteLength !== 32) throw new Error("CHITCHAT_GRANT_ENCRYPTION_KEY must contain 32 bytes");
	return await crypto.subtle.importKey("raw", bytes, "AES-GCM", false, ["encrypt", "decrypt"]);
}

export async function transcripts_encrypt(secret: string) {
	const nonce = crypto.getRandomValues(new Uint8Array(12));
	const encrypted = await crypto.subtle.encrypt(
		{ name: "AES-GCM", iv: nonce },
		await key(),
		new TextEncoder().encode(secret),
	);
	return `${btoa(String.fromCharCode(...nonce))}.${btoa(String.fromCharCode(...new Uint8Array(encrypted)))}`;
}

export async function transcripts_decrypt(secret: string) {
	const [nonce, encrypted] = secret.split(".");
	if (!nonce || !encrypted) throw new Error("The saved Files connection is invalid. Connect again.");
	const plaintext = await crypto.subtle.decrypt(
		{ name: "AES-GCM", iv: Uint8Array.from(atob(nonce), (character) => character.charCodeAt(0)) },
		await key(),
		Uint8Array.from(atob(encrypted), (character) => character.charCodeAt(0)),
	);
	return new TextDecoder().decode(plaintext);
}
