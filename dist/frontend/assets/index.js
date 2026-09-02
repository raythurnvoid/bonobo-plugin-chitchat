var k1 = Object.create,
	db = Object.defineProperty,
	M1 = Object.getOwnPropertyDescriptor,
	N1 = Object.getOwnPropertyNames,
	O1 = Object.getPrototypeOf,
	z1 = Object.prototype.hasOwnProperty,
	Ir = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), (e = null)), t.exports),
	D1 = (e, t, i, u) => {
		if ((t && typeof t == "object") || typeof t == "function")
			for (var s = N1(t), o = 0, f = s.length, h; o < f; o++)
				((h = s[o]),
					!z1.call(e, h) &&
						h !== i &&
						db(e, h, { get: ((m) => t[m]).bind(null, h), enumerable: !(u = M1(t, h)) || u.enumerable }));
		return e;
	},
	hb = (e, t, i) => (
		(i = e != null ? k1(O1(e)) : {}),
		D1(t || !e || !e.__esModule ? db(i, "default", { value: e, enumerable: !0 }) : i, e)
	);
(function () {
	const t = document.createElement("link").relList;
	if (t && t.supports && t.supports("modulepreload")) return;
	for (const s of document.querySelectorAll('link[rel="modulepreload"]')) u(s);
	new MutationObserver((s) => {
		for (const o of s)
			if (o.type === "childList")
				for (const f of o.addedNodes) f.tagName === "LINK" && f.rel === "modulepreload" && u(f);
	}).observe(document, { childList: !0, subtree: !0 });
	function i(s) {
		const o = {};
		return (
			s.integrity && (o.integrity = s.integrity),
			s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
			s.crossOrigin === "use-credentials"
				? (o.credentials = "include")
				: s.crossOrigin === "anonymous"
					? (o.credentials = "omit")
					: (o.credentials = "same-origin"),
			o
		);
	}
	function u(s) {
		if (s.ep) return;
		s.ep = !0;
		const o = i(s);
		fetch(s.href, o);
	}
})();
var vp = "1.44.0",
	ei = [],
	jr = [],
	j1 = Uint8Array,
	Jd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var qu = 0, I1 = Jd.length; qu < I1; ++qu) ((ei[qu] = Jd[qu]), (jr[Jd.charCodeAt(qu)] = qu));
jr[45] = 62;
jr[95] = 63;
function L1(e) {
	var t = e.length;
	if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
	var i = e.indexOf("=");
	i === -1 && (i = t);
	var u = i === t ? 0 : 4 - (i % 4);
	return [i, u];
}
function q1(e, t, i) {
	return ((t + i) * 3) / 4 - i;
}
function cs(e) {
	var t,
		i = L1(e),
		u = i[0],
		s = i[1],
		o = new j1(q1(e, u, s)),
		f = 0,
		h = s > 0 ? u - 4 : u,
		m;
	for (m = 0; m < h; m += 4)
		((t =
			(jr[e.charCodeAt(m)] << 18) |
			(jr[e.charCodeAt(m + 1)] << 12) |
			(jr[e.charCodeAt(m + 2)] << 6) |
			jr[e.charCodeAt(m + 3)]),
			(o[f++] = (t >> 16) & 255),
			(o[f++] = (t >> 8) & 255),
			(o[f++] = t & 255));
	return (
		s === 2 && ((t = (jr[e.charCodeAt(m)] << 2) | (jr[e.charCodeAt(m + 1)] >> 4)), (o[f++] = t & 255)),
		s === 1 &&
			((t = (jr[e.charCodeAt(m)] << 10) | (jr[e.charCodeAt(m + 1)] << 4) | (jr[e.charCodeAt(m + 2)] >> 2)),
			(o[f++] = (t >> 8) & 255),
			(o[f++] = t & 255)),
		o
	);
}
function U1(e) {
	return ei[(e >> 18) & 63] + ei[(e >> 12) & 63] + ei[(e >> 6) & 63] + ei[e & 63];
}
function $1(e, t, i) {
	for (var u, s = [], o = t; o < i; o += 3)
		((u = ((e[o] << 16) & 16711680) + ((e[o + 1] << 8) & 65280) + (e[o + 2] & 255)), s.push(U1(u)));
	return s.join("");
}
function fs(e) {
	for (var t, i = e.length, u = i % 3, s = [], o = 16383, f = 0, h = i - u; f < h; f += o)
		s.push($1(e, f, f + o > h ? h : f + o));
	return (
		u === 1
			? ((t = e[i - 1]), s.push(ei[t >> 2] + ei[(t << 4) & 63] + "=="))
			: u === 2 &&
				((t = (e[i - 2] << 8) + e[i - 1]), s.push(ei[t >> 10] + ei[(t >> 4) & 63] + ei[(t << 2) & 63] + "=")),
		s.join("")
	);
}
function fa(e) {
	if (e === void 0) return {};
	if (!vb(e)) throw new Error(`The arguments to a Convex function must be an object. Received: ${e}`);
	return e;
}
function mb(e) {
	if (typeof e > "u")
		throw new Error(
			"Client created with undefined deployment address. If you used an environment variable, check that it's set.",
		);
	if (typeof e != "string") throw new Error(`Invalid deployment address: found ${e}".`);
	if (!(e.startsWith("http:") || e.startsWith("https:")))
		throw new Error(`Invalid deployment address: Must start with "https://" or "http://". Found "${e}".`);
	try {
		new URL(e);
	} catch {
		throw new Error(
			`Invalid deployment address: "${e}" is not a valid URL. If you believe this URL is correct, use the \`skipConvexDeploymentUrlCheck\` option to bypass this.`,
		);
	}
	if (e.endsWith(".convex.site"))
		throw new Error(
			`Invalid deployment address: "${e}" ends with .convex.site, which is used for HTTP Actions. Convex deployment URLs typically end with .convex.cloud? If you believe this URL is correct, use the \`skipConvexDeploymentUrlCheck\` option to bypass this.`,
		);
}
function vb(e) {
	const t = typeof e == "object",
		i = Object.getPrototypeOf(e),
		u = i === null || i === Object.prototype || i?.constructor?.name === "Object";
	return t && u;
}
var gb = !0,
	Fu = BigInt("-9223372036854775808"),
	em = BigInt("9223372036854775807"),
	Ch = BigInt("0"),
	B1 = BigInt("8"),
	V1 = BigInt("256"),
	Wd =
		"This commit timestamp is unresolved: its value is assigned when the mutation commits. Read the document after the mutation completes to get its value.",
	yb = class {
		[Symbol.toPrimitive](e) {
			if (e === "string") return this.toString();
			throw new Error(Wd);
		}
		valueOf() {
			throw new Error(Wd);
		}
		toJSON() {
			throw new Error(Wd);
		}
		toString() {
			return "[unresolved commit timestamp]";
		}
	},
	H1 = new yb();
function pb(e) {
	return Number.isNaN(e) || !Number.isFinite(e) || Object.is(e, -0);
}
function Z1(e) {
	e < Ch && (e -= Fu + Fu);
	let t = e.toString(16);
	t.length % 2 === 1 && (t = "0" + t);
	const i = new Uint8Array(new ArrayBuffer(8));
	let u = 0;
	for (const s of t.match(/.{2}/g).reverse()) (i.set([parseInt(s, 16)], u++), (e >>= B1));
	return fs(i);
}
function P1(e) {
	const t = cs(e);
	if (t.byteLength !== 8) throw new Error(`Received ${t.byteLength} bytes, expected 8 for $integer`);
	let i = Ch,
		u = Ch;
	for (const s of t) ((i += BigInt(s) * V1 ** u), u++);
	return (i > em && (i += Fu + Fu), i);
}
function Q1(e) {
	if (e < Fu || em < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
	const t = new ArrayBuffer(8);
	return (new DataView(t).setBigInt64(0, e, !0), fs(new Uint8Array(t)));
}
function K1(e) {
	const t = cs(e);
	if (t.byteLength !== 8) throw new Error(`Received ${t.byteLength} bytes, expected 8 for $integer`);
	return new DataView(t.buffer).getBigInt64(0, !0);
}
var Y1 = DataView.prototype.setBigInt64 ? Q1 : Z1,
	G1 = DataView.prototype.getBigInt64 ? K1 : P1,
	gp = 1024;
function kh(e) {
	if (e.length > gp) throw new Error(`Field name ${e} exceeds maximum field name length ${gp}.`);
	if (e.startsWith("$")) throw new Error(`Field name ${e} starts with a '$', which is reserved.`);
	for (let t = 0; t < e.length; t += 1) {
		const i = e.charCodeAt(t);
		if (i < 32 || i >= 127)
			throw new Error(
				`Field name ${e} has invalid character '${e[t]}': Field names can only contain non-control ASCII characters`,
			);
	}
}
function Xu(e) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return e;
	if (Array.isArray(e)) return e.map((u) => Xu(u));
	if (typeof e != "object") throw new Error(`Unexpected type of ${e}`);
	const t = Object.entries(e);
	if (t.length === 1) {
		const u = t[0][0];
		if (u === "$bytes") {
			if (typeof e.$bytes != "string") throw new Error(`Malformed $bytes field on ${e}`);
			return cs(e.$bytes).buffer;
		}
		if (u === "$integer") {
			if (typeof e.$integer != "string") throw new Error(`Malformed $integer field on ${e}`);
			return G1(e.$integer);
		}
		if (u === "$float") {
			if (typeof e.$float != "string") throw new Error(`Malformed $float field on ${e}`);
			const s = cs(e.$float);
			if (s.byteLength !== 8) throw new Error(`Received ${s.byteLength} bytes, expected 8 for $float`);
			const o = new DataView(s.buffer).getFloat64(0, gb);
			if (!pb(o)) throw new Error(`Float ${o} should be encoded as a number`);
			return o;
		}
		if (u === "$commitTs") {
			if (e.$commitTs !== null) throw new Error(`Malformed $commitTs field on ${e}`);
			return H1;
		}
		if (u === "$set") throw new Error("Received a Set which is no longer supported as a Convex type.");
		if (u === "$map") throw new Error("Received a Map which is no longer supported as a Convex type.");
	}
	const i = {};
	for (const [u, s] of Object.entries(e)) (kh(u), (i[u] = Xu(s)));
	return i;
}
var yp = 16384;
function Qu(e) {
	const t = JSON.stringify(e, (i, u) => (u === void 0 ? "undefined" : typeof u == "bigint" ? `${u.toString()}n` : u));
	if (t.length > yp) {
		const i = "[...truncated]";
		let u = yp - 14;
		const s = t.codePointAt(u - 1);
		return (s !== void 0 && s > 65535 && (u -= 1), t.substring(0, u) + i);
	}
	return t;
}
function oc(e, t, i, u) {
	if (e === void 0) {
		const f = i && ` (present at path ${i} in original object ${Qu(t)})`;
		throw new Error(
			`undefined is not a valid Convex value${f}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`,
		);
	}
	if (e === null) return e;
	if (typeof e == "bigint") {
		if (e < Fu || em < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
		return { $integer: Y1(e) };
	}
	if (typeof e == "number")
		if (pb(e)) {
			const f = new ArrayBuffer(8);
			return (new DataView(f).setFloat64(0, e, gb), { $float: fs(new Uint8Array(f)) });
		} else return e;
	if (typeof e == "boolean" || typeof e == "string") return e;
	if (e instanceof ArrayBuffer) return { $bytes: fs(new Uint8Array(e)) };
	if (e instanceof yb) return { $commitTs: null };
	if (Array.isArray(e)) return e.map((f, h) => oc(f, t, i + `[${h}]`, !1));
	if (e instanceof Set) throw new Error(eh(i, "Set", [...e], t));
	if (e instanceof Map) throw new Error(eh(i, "Map", [...e], t));
	if (!vb(e)) {
		const f = e?.constructor?.name,
			h = f ? `${f} ` : "";
		throw new Error(eh(i, h, e, t));
	}
	const s = {},
		o = Object.entries(e);
	o.sort(([f, h], [m, v]) => (f === m ? 0 : f < m ? -1 : 1));
	for (const [f, h] of o)
		h !== void 0 ? (kh(f), (s[f] = oc(h, t, i + `.${f}`, !1))) : u && (kh(f), (s[f] = F1(h, t, i + `.${f}`)));
	return s;
}
function eh(e, t, i, u) {
	return e
		? `${t}${Qu(i)} is not a supported Convex type (present at path ${e} in original object ${Qu(u)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
		: `${t}${Qu(i)} is not a supported Convex type.`;
}
function F1(e, t, i) {
	if (e === void 0) return { $undefined: null };
	if (t === void 0) throw new Error(`Programming error. Current value is ${Qu(e)} but original value is undefined`);
	return oc(e, t, i, !1);
}
function Ga(e) {
	return oc(e, e, "", !1);
}
var X1 = Object.defineProperty,
	J1 = (e, t, i) => (t in e ? X1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	th = (e, t, i) => J1(e, typeof t != "symbol" ? t + "" : t, i),
	pp,
	bp,
	W1 = Symbol.for("ConvexError"),
	Mh = class extends ((bp = Error), (pp = W1), bp) {
		constructor(e) {
			(super(typeof e == "string" ? e : Qu(e)),
				th(this, "name", "ConvexError"),
				th(this, "data"),
				th(this, pp, !0),
				(this.data = e));
		}
	},
	eE = Object.defineProperty,
	tE = (e, t, i) => (t in e ? eE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	_p = (e, t, i) => tE(e, typeof t != "symbol" ? t + "" : t, i),
	nE = "color:rgb(0, 145, 255)";
function bb(e) {
	switch (e) {
		case "query":
			return "Q";
		case "mutation":
			return "M";
		case "action":
			return "A";
		case "any":
			return "?";
	}
}
var _b = class {
	constructor(e) {
		(_p(this, "_onLogLineFuncs"), _p(this, "_verbose"), (this._onLogLineFuncs = {}), (this._verbose = e.verbose));
	}
	addLogLineListener(e) {
		let t = Math.random().toString(36).substring(2, 15);
		for (let i = 0; i < 10 && this._onLogLineFuncs[t] !== void 0; i++) t = Math.random().toString(36).substring(2, 15);
		return (
			(this._onLogLineFuncs[t] = e),
			() => {
				delete this._onLogLineFuncs[t];
			}
		);
	}
	logVerbose(...e) {
		if (this._verbose)
			for (const t of Object.values(this._onLogLineFuncs)) t("debug", `${new Date().toISOString()}`, ...e);
	}
	log(...e) {
		for (const t of Object.values(this._onLogLineFuncs)) t("info", ...e);
	}
	warn(...e) {
		for (const t of Object.values(this._onLogLineFuncs)) t("warn", ...e);
	}
	error(...e) {
		for (const t of Object.values(this._onLogLineFuncs)) t("error", ...e);
	}
};
function rE(e) {
	const t = new _b(e);
	return (
		t.addLogLineListener((i, ...u) => {
			switch (i) {
				case "debug":
					console.debug(...u);
					break;
				case "info":
					console.log(...u);
					break;
				case "warn":
					console.warn(...u);
					break;
				case "error":
					console.error(...u);
					break;
				default:
					console.log(...u);
			}
		}),
		t
	);
}
function iE(e) {
	return new _b(e);
}
function cc(e, t, i, u, s) {
	const o = bb(i);
	if ((typeof s == "object" && (s = `ConvexError ${JSON.stringify(s.errorData, null, 2)}`), t === "info")) {
		const f = s.match(/^\[.*?\] /);
		if (f === null) {
			e.error(`[CONVEX ${o}(${u})] Could not parse console.log`);
			return;
		}
		const h = s.slice(1, f[0].length - 2),
			m = s.slice(f[0].length);
		e.log(`%c[CONVEX ${o}(${u})] [${h}]`, nE, m);
	} else e.error(`[CONVEX ${o}(${u})] ${s}`);
}
function aE(e, t) {
	const i = `[CONVEX FATAL ERROR] ${t}`;
	return (e.error(i), new Error(i));
}
function Vu(e, t, i) {
	return `[CONVEX ${bb(e)}(${t})] ${i.errorMessage}
  Called by client`;
}
function Nh(e, t) {
	return ((t.data = e.errorData), t);
}
function Fa(e) {
	const t = e.split(":");
	let i, u;
	return (
		t.length === 1 ? ((i = t[0]), (u = "default")) : ((i = t.slice(0, t.length - 1).join(":")), (u = t[t.length - 1])),
		i.endsWith(".js") && (i = i.slice(0, -3)),
		`${i}:${u}`
	);
}
function Ka(e, t) {
	return JSON.stringify({ udfPath: Fa(e), args: Ga(t) });
}
function Sp(e, t, i) {
	const { initialNumItems: u, id: s } = i;
	return JSON.stringify({ type: "paginated", udfPath: Fa(e), args: Ga(t), options: Ga({ initialNumItems: u, id: s }) });
}
function uE(e) {
	return JSON.parse(e).type === "paginated";
}
var lE = Object.defineProperty,
	sE = (e, t, i) => (t in e ? lE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	Wr = (e, t, i) => sE(e, typeof t != "symbol" ? t + "" : t, i),
	oE = class {
		constructor() {
			(Wr(this, "nextQueryId"),
				Wr(this, "querySetVersion"),
				Wr(this, "querySet"),
				Wr(this, "queryIdToToken"),
				Wr(this, "identityVersion"),
				Wr(this, "auth"),
				Wr(this, "outstandingQueriesOlderThanRestart"),
				Wr(this, "outstandingAuthOlderThanRestart"),
				Wr(this, "paused"),
				Wr(this, "pendingQuerySetModifications"),
				(this.nextQueryId = 0),
				(this.querySetVersion = 0),
				(this.identityVersion = 0),
				(this.querySet = new Map()),
				(this.queryIdToToken = new Map()),
				(this.outstandingQueriesOlderThanRestart = new Set()),
				(this.outstandingAuthOlderThanRestart = !1),
				(this.paused = !1),
				(this.pendingQuerySetModifications = new Map()));
		}
		hasSyncedPastLastReconnect() {
			return this.outstandingQueriesOlderThanRestart.size === 0 && !this.outstandingAuthOlderThanRestart;
		}
		markAuthCompletion() {
			this.outstandingAuthOlderThanRestart = !1;
		}
		subscribe(e, t, i, u) {
			const s = Fa(e),
				o = Ka(s, t),
				f = this.querySet.get(o);
			if (f !== void 0)
				return (
					(f.numSubscribers += 1),
					{ queryToken: o, modification: null, unsubscribe: () => this.removeSubscriber(o) }
				);
			{
				const h = this.nextQueryId++,
					m = { id: h, canonicalizedUdfPath: s, args: t, numSubscribers: 1, journal: i, componentPath: u };
				(this.querySet.set(o, m), this.queryIdToToken.set(h, o));
				const v = this.querySetVersion,
					g = this.querySetVersion + 1,
					S = { type: "Add", queryId: h, udfPath: s, args: [Ga(t)], journal: i, componentPath: u };
				return (
					this.paused ? this.pendingQuerySetModifications.set(h, S) : (this.querySetVersion = g),
					{
						queryToken: o,
						modification: { type: "ModifyQuerySet", baseVersion: v, newVersion: g, modifications: [S] },
						unsubscribe: () => this.removeSubscriber(o),
					}
				);
			}
		}
		transition(e) {
			for (const t of e.modifications)
				switch (t.type) {
					case "QueryUpdated":
					case "QueryFailed": {
						this.outstandingQueriesOlderThanRestart.delete(t.queryId);
						const i = t.journal;
						if (i !== void 0) {
							const u = this.queryIdToToken.get(t.queryId);
							u !== void 0 && (this.querySet.get(u).journal = i);
						}
						break;
					}
					case "QueryRemoved":
						this.outstandingQueriesOlderThanRestart.delete(t.queryId);
						break;
					default:
						throw new Error(`Invalid modification ${t.type}`);
				}
		}
		queryId(e, t) {
			const i = Ka(Fa(e), t),
				u = this.querySet.get(i);
			return u !== void 0 ? u.id : null;
		}
		isCurrentOrNewerAuthVersion(e) {
			return e >= this.identityVersion;
		}
		getAuth() {
			return this.auth;
		}
		setAuth(e) {
			this.auth = { tokenType: "User", value: e };
			const t = this.identityVersion;
			return (this.paused || (this.identityVersion = t + 1), { type: "Authenticate", baseVersion: t, ...this.auth });
		}
		setAdminAuth(e, t) {
			const i = { tokenType: "Admin", value: e, impersonating: t };
			this.auth = i;
			const u = this.identityVersion;
			return (this.paused || (this.identityVersion = u + 1), { type: "Authenticate", baseVersion: u, ...i });
		}
		clearAuth() {
			((this.auth = void 0), this.markAuthCompletion());
			const e = this.identityVersion;
			return (
				this.paused || (this.identityVersion = e + 1),
				{ type: "Authenticate", tokenType: "None", baseVersion: e }
			);
		}
		hasAuth() {
			return !!this.auth;
		}
		isNewAuth(e) {
			return this.auth?.value !== e;
		}
		queryPath(e) {
			const t = this.queryIdToToken.get(e);
			return t ? this.querySet.get(t).canonicalizedUdfPath : null;
		}
		queryArgs(e) {
			const t = this.queryIdToToken.get(e);
			return t ? this.querySet.get(t).args : null;
		}
		queryToken(e) {
			return this.queryIdToToken.get(e) ?? null;
		}
		queryJournal(e) {
			return this.querySet.get(e)?.journal;
		}
		restart() {
			(this.unpause(), this.outstandingQueriesOlderThanRestart.clear());
			const e = [];
			for (const u of this.querySet.values()) {
				const s = {
					type: "Add",
					queryId: u.id,
					udfPath: u.canonicalizedUdfPath,
					args: [Ga(u.args)],
					journal: u.journal,
					componentPath: u.componentPath,
				};
				(e.push(s), this.outstandingQueriesOlderThanRestart.add(u.id));
			}
			this.querySetVersion = 1;
			const t = { type: "ModifyQuerySet", baseVersion: 0, newVersion: 1, modifications: e };
			if (!this.auth) return ((this.identityVersion = 0), [t, void 0]);
			this.outstandingAuthOlderThanRestart = !0;
			const i = { type: "Authenticate", baseVersion: 0, ...this.auth };
			return ((this.identityVersion = 1), [t, i]);
		}
		pause() {
			this.paused = !0;
		}
		resume() {
			const e =
					this.pendingQuerySetModifications.size > 0
						? {
								type: "ModifyQuerySet",
								baseVersion: this.querySetVersion,
								newVersion: ++this.querySetVersion,
								modifications: Array.from(this.pendingQuerySetModifications.values()),
							}
						: void 0,
				t = this.auth !== void 0 ? { type: "Authenticate", baseVersion: this.identityVersion++, ...this.auth } : void 0;
			return (this.unpause(), [e, t]);
		}
		unpause() {
			((this.paused = !1), this.pendingQuerySetModifications.clear());
		}
		removeSubscriber(e) {
			const t = this.querySet.get(e);
			if (t.numSubscribers > 1) return ((t.numSubscribers -= 1), null);
			{
				(this.querySet.delete(e),
					this.queryIdToToken.delete(t.id),
					this.outstandingQueriesOlderThanRestart.delete(t.id));
				const i = this.querySetVersion,
					u = this.querySetVersion + 1,
					s = { type: "Remove", queryId: t.id };
				return (
					this.paused
						? this.pendingQuerySetModifications.has(t.id)
							? this.pendingQuerySetModifications.delete(t.id)
							: this.pendingQuerySetModifications.set(t.id, s)
						: (this.querySetVersion = u),
					{ type: "ModifyQuerySet", baseVersion: i, newVersion: u, modifications: [s] }
				);
			}
		}
	},
	cE = Object.defineProperty,
	fE = (e, t, i) => (t in e ? cE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	Vo = (e, t, i) => fE(e, typeof t != "symbol" ? t + "" : t, i),
	dE = class {
		constructor(e, t) {
			((this.logger = e),
				(this.markConnectionStateDirty = t),
				Vo(this, "inflightRequests"),
				Vo(this, "requestsOlderThanRestart"),
				Vo(this, "inflightMutationsCount", 0),
				Vo(this, "inflightActionsCount", 0),
				(this.inflightRequests = new Map()),
				(this.requestsOlderThanRestart = new Set()));
		}
		request(e, t) {
			const i = new Promise((u) => {
				const s = t ? "Requested" : "NotSent";
				(this.inflightRequests.set(e.requestId, {
					message: e,
					status: { status: s, requestedAt: new Date(), onResult: u },
				}),
					e.type === "Mutation" ? this.inflightMutationsCount++ : e.type === "Action" && this.inflightActionsCount++);
			});
			return (this.markConnectionStateDirty(), i);
		}
		onResponse(e) {
			const t = this.inflightRequests.get(e.requestId);
			if (t === void 0 || t.status.status === "Completed") return null;
			const i = t.message.type === "Mutation" ? "mutation" : "action",
				u = t.message.udfPath;
			for (const h of e.logLines) cc(this.logger, "info", i, u, h);
			const s = t.status;
			let o, f;
			if (e.success) ((o = { success: !0, logLines: e.logLines, value: Xu(e.result) }), (f = () => s.onResult(o)));
			else {
				const h = e.result,
					{ errorData: m } = e;
				(cc(this.logger, "error", i, u, h),
					(o = { success: !1, errorMessage: h, errorData: m !== void 0 ? Xu(m) : void 0, logLines: e.logLines }),
					(f = () => s.onResult(o)));
			}
			return e.type === "ActionResponse" || !e.success
				? (f(),
					this.inflightRequests.delete(e.requestId),
					this.requestsOlderThanRestart.delete(e.requestId),
					t.message.type === "Action"
						? this.inflightActionsCount--
						: t.message.type === "Mutation" && this.inflightMutationsCount--,
					this.markConnectionStateDirty(),
					{ requestId: e.requestId, result: o })
				: ((t.status = { status: "Completed", result: o, ts: e.ts, onResolve: f }), null);
		}
		removeCompleted(e) {
			const t = new Map();
			for (const [i, u] of this.inflightRequests.entries()) {
				const s = u.status;
				s.status === "Completed" &&
					s.ts.lessThanOrEqual(e) &&
					(s.onResolve(),
					t.set(i, s.result),
					u.message.type === "Mutation"
						? this.inflightMutationsCount--
						: u.message.type === "Action" && this.inflightActionsCount--,
					this.inflightRequests.delete(i),
					this.requestsOlderThanRestart.delete(i));
			}
			return (t.size > 0 && this.markConnectionStateDirty(), t);
		}
		restart() {
			this.requestsOlderThanRestart = new Set(this.inflightRequests.keys());
			const e = [];
			for (const [t, i] of this.inflightRequests) {
				if (i.status.status === "NotSent") {
					((i.status.status = "Requested"), e.push(i.message));
					continue;
				}
				if (i.message.type === "Mutation") e.push(i.message);
				else if (i.message.type === "Action") {
					if (
						(this.inflightRequests.delete(t),
						this.requestsOlderThanRestart.delete(t),
						this.inflightActionsCount--,
						i.status.status === "Completed")
					)
						throw new Error("Action should never be in 'Completed' state");
					i.status.onResult({ success: !1, errorMessage: "Connection lost while action was in flight", logLines: [] });
				}
			}
			return (this.markConnectionStateDirty(), e);
		}
		resume() {
			const e = [];
			for (const [, t] of this.inflightRequests)
				if (t.status.status === "NotSent") {
					((t.status.status = "Requested"), e.push(t.message));
					continue;
				}
			return e;
		}
		hasIncompleteRequests() {
			for (const e of this.inflightRequests.values()) if (e.status.status === "Requested") return !0;
			return !1;
		}
		hasInflightRequests() {
			return this.inflightRequests.size > 0;
		}
		hasSyncedPastLastReconnect() {
			return this.requestsOlderThanRestart.size === 0;
		}
		timeOfOldestInflightRequest() {
			if (this.inflightRequests.size === 0) return null;
			let e = Date.now();
			for (const t of this.inflightRequests.values())
				t.status.status !== "Completed" && t.status.requestedAt.getTime() < e && (e = t.status.requestedAt.getTime());
			return new Date(e);
		}
		inflightMutations() {
			return this.inflightMutationsCount;
		}
		inflightActions() {
			return this.inflightActionsCount;
		}
	},
	fc = Symbol.for("functionName"),
	hE = Symbol.for("toReferencePath");
function mE(e) {
	return e[hE] ?? null;
}
function vE(e) {
	return e.startsWith("function://");
}
function gE(e) {
	let t;
	if (typeof e == "string") vE(e) ? (t = { functionHandle: e }) : (t = { name: e });
	else if (e[fc]) t = { name: e[fc] };
	else {
		const i = mE(e);
		if (!i) throw new Error(`${e} is not a functionReference`);
		t = { reference: i };
	}
	return t;
}
function xi(e) {
	const t = gE(e);
	if (t.name === void 0)
		throw t.functionHandle !== void 0
			? new Error(
					`Expected function reference like "api.file.func" or "internal.file.func", but received function handle ${t.functionHandle}`,
				)
			: t.reference !== void 0
				? new Error(
						`Expected function reference in the current component like "api.file.func" or "internal.file.func", but received reference ${t.reference}`,
					)
				: new Error(
						`Expected function reference like "api.file.func" or "internal.file.func", but received ${JSON.stringify(t)}`,
					);
	if (typeof e == "string") return e;
	const i = e[fc];
	if (!i) throw new Error(`${e} is not a functionReference`);
	return i;
}
function Sb(e = []) {
	return new Proxy(
		{},
		{
			get(t, i) {
				if (typeof i == "string") return Sb([...e, i]);
				if (i === fc) {
					if (e.length < 2) {
						const o = ["api", ...e].join(".");
						throw new Error(`API path is expected to be of the form \`api.moduleName.functionName\`. Found: \`${o}\``);
					}
					const u = e.slice(0, -1).join("/"),
						s = e[e.length - 1];
					return s === "default" ? u : u + ":" + s;
				} else return i === Symbol.toStringTag ? "FunctionReference" : void 0;
			},
		},
	);
}
var yE = Sb(),
	pE = Object.defineProperty,
	bE = (e, t, i) => (t in e ? pE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	dc = (e, t, i) => bE(e, typeof t != "symbol" ? t + "" : t, i),
	wp = class Oh {
		constructor(t) {
			(dc(this, "queryResults"), dc(this, "modifiedQueries"), (this.queryResults = t), (this.modifiedQueries = []));
		}
		getQuery(t, ...i) {
			const u = fa(i[0]),
				s = xi(t),
				o = this.queryResults.get(Ka(s, u));
			if (o !== void 0) return Oh.queryValue(o.result);
		}
		getAllQueries(t) {
			const i = [],
				u = xi(t);
			for (const s of this.queryResults.values())
				s.udfPath === Fa(u) && i.push({ args: s.args, value: Oh.queryValue(s.result) });
			return i;
		}
		setQuery(t, i, u) {
			const s = fa(i),
				o = xi(t),
				f = Ka(o, s);
			let h;
			u === void 0 ? (h = void 0) : (h = { success: !0, value: u, logLines: [] });
			const m = { udfPath: o, args: s, result: h };
			(this.queryResults.set(f, m), this.modifiedQueries.push(f));
		}
		static queryValue(t) {
			if (t !== void 0) return t.success ? t.value : void 0;
		}
	},
	_E = class {
		constructor() {
			(dc(this, "queryResults"),
				dc(this, "optimisticUpdates"),
				(this.queryResults = new Map()),
				(this.optimisticUpdates = []));
		}
		ingestQueryResultsFromServer(e, t) {
			this.optimisticUpdates = this.optimisticUpdates.filter((o) => !t.has(o.mutationId));
			const i = this.queryResults;
			this.queryResults = new Map(e);
			const u = new wp(this.queryResults);
			for (const o of this.optimisticUpdates) o.update(u);
			const s = [];
			for (const [o, f] of this.queryResults) {
				const h = i.get(o);
				(h === void 0 || h.result !== f.result) && s.push(o);
			}
			return s;
		}
		applyOptimisticUpdate(e, t) {
			this.optimisticUpdates.push({ update: e, mutationId: t });
			const i = new wp(this.queryResults);
			return (e(i), i.modifiedQueries);
		}
		rawQueryResult(e) {
			const t = this.queryResults.get(e);
			if (t !== void 0) return t.result;
		}
		queryResult(e) {
			const t = this.queryResults.get(e);
			if (t === void 0) return;
			const i = t.result;
			if (i !== void 0) {
				if (i.success) return i.value;
				throw i.errorData !== void 0 ? Nh(i, new Mh(Vu("query", t.udfPath, i))) : new Error(Vu("query", t.udfPath, i));
			}
		}
		hasQueryResult(e) {
			return this.queryResults.get(e) !== void 0;
		}
		queryLogs(e) {
			return this.queryResults.get(e)?.result?.logLines;
		}
	},
	SE = Object.defineProperty,
	wE = (e, t, i) => (t in e ? SE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	nh = (e, t, i) => wE(e, typeof t != "symbol" ? t + "" : t, i),
	ys = class Ei {
		constructor(t, i) {
			(nh(this, "low"),
				nh(this, "high"),
				nh(this, "__isUnsignedLong__"),
				(this.low = t | 0),
				(this.high = i | 0),
				(this.__isUnsignedLong__ = !0));
		}
		static isLong(t) {
			return (t && t.__isUnsignedLong__) === !0;
		}
		static fromBytesLE(t) {
			return new Ei(t[0] | (t[1] << 8) | (t[2] << 16) | (t[3] << 24), t[4] | (t[5] << 8) | (t[6] << 16) | (t[7] << 24));
		}
		toBytesLE() {
			const t = this.high,
				i = this.low;
			return [
				i & 255,
				(i >>> 8) & 255,
				(i >>> 16) & 255,
				i >>> 24,
				t & 255,
				(t >>> 8) & 255,
				(t >>> 16) & 255,
				t >>> 24,
			];
		}
		static fromNumber(t) {
			return isNaN(t) || t < 0 ? Ep : t >= EE ? TE : new Ei((t % us) | 0, (t / us) | 0);
		}
		toString() {
			return (BigInt(this.high) * BigInt(us) + BigInt(this.low)).toString();
		}
		equals(t) {
			return (
				Ei.isLong(t) || (t = Ei.fromValue(t)),
				this.high >>> 31 === 1 && t.high >>> 31 === 1 ? !1 : this.high === t.high && this.low === t.low
			);
		}
		notEquals(t) {
			return !this.equals(t);
		}
		comp(t) {
			return (
				Ei.isLong(t) || (t = Ei.fromValue(t)),
				this.equals(t)
					? 0
					: t.high >>> 0 > this.high >>> 0 || (t.high === this.high && t.low >>> 0 > this.low >>> 0)
						? -1
						: 1
			);
		}
		lessThanOrEqual(t) {
			return this.comp(t) <= 0;
		}
		static fromValue(t) {
			return typeof t == "number" ? Ei.fromNumber(t) : new Ei(t.low, t.high);
		}
	},
	Ep = new ys(0, 0),
	Tp = 65536,
	us = Tp * Tp,
	EE = us * us,
	TE = new ys(-1, -1),
	xE = Object.defineProperty,
	AE = (e, t, i) => (t in e ? xE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	Ho = (e, t, i) => AE(e, typeof t != "symbol" ? t + "" : t, i),
	xp = class {
		constructor(e, t) {
			(Ho(this, "version"),
				Ho(this, "remoteQuerySet"),
				Ho(this, "queryPath"),
				Ho(this, "logger"),
				(this.version = { querySet: 0, ts: ys.fromNumber(0), identity: 0 }),
				(this.remoteQuerySet = new Map()),
				(this.queryPath = e),
				(this.logger = t));
		}
		transition(e) {
			const t = e.startVersion;
			if (
				this.version.querySet !== t.querySet ||
				this.version.ts.notEquals(t.ts) ||
				this.version.identity !== t.identity
			)
				throw new Error(
					`Invalid start version: ${t.ts.toString()}:${t.querySet}:${t.identity}, transitioning from ${this.version.ts.toString()}:${this.version.querySet}:${this.version.identity}`,
				);
			for (const i of e.modifications)
				switch (i.type) {
					case "QueryUpdated": {
						const u = this.queryPath(i.queryId);
						if (u) for (const o of i.logLines) cc(this.logger, "info", "query", u, o);
						const s = Xu(i.value ?? null);
						this.remoteQuerySet.set(i.queryId, { success: !0, value: s, logLines: i.logLines });
						break;
					}
					case "QueryFailed": {
						const u = this.queryPath(i.queryId);
						if (u) for (const o of i.logLines) cc(this.logger, "info", "query", u, o);
						const { errorData: s } = i;
						this.remoteQuerySet.set(i.queryId, {
							success: !1,
							errorMessage: i.errorMessage,
							errorData: s !== void 0 ? Xu(s) : void 0,
							logLines: i.logLines,
						});
						break;
					}
					case "QueryRemoved":
						this.remoteQuerySet.delete(i.queryId);
						break;
					default:
						throw new Error(`Invalid modification ${i.type}`);
				}
			this.version = e.endVersion;
		}
		remoteQueryResults() {
			return this.remoteQuerySet;
		}
		timestamp() {
			return this.version.ts;
		}
	};
function rh(e) {
	const t = cs(e);
	return ys.fromBytesLE(Array.from(t));
}
function RE(e) {
	const t = new Uint8Array(e.toBytesLE());
	return fs(t);
}
function Ap(e) {
	switch (e.type) {
		case "FatalError":
		case "AuthError":
		case "ActionResponse":
		case "TransitionChunk":
		case "Ping":
			return { ...e };
		case "MutationResponse":
			return e.success ? { ...e, ts: rh(e.ts) } : { ...e };
		case "Transition":
			return {
				...e,
				startVersion: { ...e.startVersion, ts: rh(e.startVersion.ts) },
				endVersion: { ...e.endVersion, ts: rh(e.endVersion.ts) },
			};
		default:
	}
}
function CE(e) {
	switch (e.type) {
		case "Authenticate":
		case "ModifyQuerySet":
		case "Mutation":
		case "Action":
		case "Event":
			return { ...e };
		case "Connect":
			return e.maxObservedTimestamp !== void 0
				? { ...e, maxObservedTimestamp: RE(e.maxObservedTimestamp) }
				: { ...e, maxObservedTimestamp: void 0 };
		default:
	}
}
var kE = Object.defineProperty,
	ME = (e, t, i) => (t in e ? kE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	cn = (e, t, i) => ME(e, typeof t != "symbol" ? t + "" : t, i),
	NE = 1e3,
	OE = 1001,
	zE = 1005,
	DE = 4040,
	ac;
function Bu() {
	return (
		ac === void 0 && (ac = Date.now()),
		typeof performance > "u" || !performance.now ? Date.now() : Math.round(ac + performance.now())
	);
}
function Rp() {
	return `t=${Math.round((Bu() - ac) / 100) / 10}s`;
}
var wb = {
	InternalServerError: { timeout: 1e3 },
	SubscriptionsWorkerFullError: { timeout: 3e3 },
	TooManyConcurrentRequests: { timeout: 3e3 },
	CommitterFullError: { timeout: 3e3 },
	AwsTooManyRequestsException: { timeout: 3e3 },
	ExecuteFullError: { timeout: 3e3 },
	SystemTimeoutError: { timeout: 3e3 },
	ExpiredInQueue: { timeout: 3e3 },
	VectorIndexesUnavailable: { timeout: 1e3 },
	SearchIndexesUnavailable: { timeout: 1e3 },
	TableSummariesUnavailable: { timeout: 1e3 },
	VectorIndexTooLarge: { timeout: 3e3 },
	SearchIndexTooLarge: { timeout: 3e3 },
	TooManyWritesInTimePeriod: { timeout: 3e3 },
};
function jE(e) {
	if (e === void 0) return "Unknown";
	for (const t of Object.keys(wb)) if (e.startsWith(t)) return t;
	return "Unknown";
}
var IE = class {
	constructor(e, t, i, u, s, o) {
		((this.markConnectionStateDirty = s),
			(this.debug = o),
			cn(this, "socket"),
			cn(this, "connectionCount"),
			cn(this, "_hasEverConnected", !1),
			cn(this, "lastCloseReason"),
			cn(this, "transitionChunkBuffer", null),
			cn(this, "defaultInitialBackoff"),
			cn(this, "maxBackoff"),
			cn(this, "retries"),
			cn(this, "serverInactivityThreshold"),
			cn(this, "reconnectDueToServerInactivityTimeout"),
			cn(this, "scheduledReconnect", null),
			cn(this, "networkOnlineHandler", null),
			cn(this, "pendingNetworkRecoveryInfo", null),
			cn(this, "uri"),
			cn(this, "onOpen"),
			cn(this, "onResume"),
			cn(this, "onMessage"),
			cn(this, "webSocketConstructor"),
			cn(this, "logger"),
			cn(this, "onServerDisconnectError"),
			(this.webSocketConstructor = i),
			(this.socket = { state: "disconnected" }),
			(this.connectionCount = 0),
			(this.lastCloseReason = "InitialConnect"),
			(this.defaultInitialBackoff = 1e3),
			(this.maxBackoff = 16e3),
			(this.retries = 0),
			(this.serverInactivityThreshold = 6e4),
			(this.reconnectDueToServerInactivityTimeout = null),
			(this.uri = e),
			(this.onOpen = t.onOpen),
			(this.onResume = t.onResume),
			(this.onMessage = t.onMessage),
			(this.onServerDisconnectError = t.onServerDisconnectError),
			(this.logger = u),
			this.setupNetworkListener(),
			this.connect());
	}
	setSocketState(e) {
		((this.socket = e),
			this._logVerbose(
				`socket state changed: ${this.socket.state}, paused: ${"paused" in this.socket ? this.socket.paused : void 0}`,
			),
			this.markConnectionStateDirty());
	}
	setupNetworkListener() {
		typeof window > "u" ||
			typeof window.addEventListener != "function" ||
			(this.networkOnlineHandler === null &&
				((this.networkOnlineHandler = () => {
					(this._logVerbose("network online event detected"), this.tryReconnectImmediately());
				}),
				window.addEventListener("online", this.networkOnlineHandler),
				this._logVerbose("network online event listener registered")));
	}
	cleanupNetworkListener() {
		this.networkOnlineHandler &&
			typeof window < "u" &&
			typeof window.removeEventListener == "function" &&
			(window.removeEventListener("online", this.networkOnlineHandler),
			(this.networkOnlineHandler = null),
			this._logVerbose("network online event listener removed"));
	}
	assembleTransition(e) {
		if (
			e.partNumber < 0 ||
			e.partNumber >= e.totalParts ||
			e.totalParts === 0 ||
			(this.transitionChunkBuffer &&
				(this.transitionChunkBuffer.totalParts !== e.totalParts ||
					this.transitionChunkBuffer.transitionId !== e.transitionId))
		)
			throw ((this.transitionChunkBuffer = null), new Error("Invalid TransitionChunk"));
		if (
			(this.transitionChunkBuffer === null &&
				(this.transitionChunkBuffer = { chunks: [], totalParts: e.totalParts, transitionId: e.transitionId }),
			e.partNumber !== this.transitionChunkBuffer.chunks.length)
		) {
			const t = this.transitionChunkBuffer.chunks.length;
			throw (
				(this.transitionChunkBuffer = null),
				new Error(`TransitionChunk received out of order: expected part ${t}, got ${e.partNumber}`)
			);
		}
		if ((this.transitionChunkBuffer.chunks.push(e.chunk), this.transitionChunkBuffer.chunks.length === e.totalParts)) {
			const t = this.transitionChunkBuffer.chunks.join("");
			this.transitionChunkBuffer = null;
			const i = Ap(JSON.parse(t));
			if (i.type !== "Transition") throw new Error(`Expected Transition, got ${i.type} after assembling chunks`);
			return i;
		}
		return null;
	}
	connect() {
		if (this.socket.state === "terminated") return;
		if (this.socket.state !== "disconnected" && this.socket.state !== "stopped")
			throw new Error("Didn't start connection from disconnected state: " + this.socket.state);
		const e = new this.webSocketConstructor(this.uri);
		(this._logVerbose("constructed WebSocket"),
			this.setSocketState({ state: "connecting", ws: e, paused: "no" }),
			this.resetServerInactivityTimeout(),
			(e.onopen = () => {
				if ((this.logger.logVerbose("begin ws.onopen"), this.socket.state !== "connecting"))
					throw new Error("onopen called with socket not in connecting state");
				if (
					(this.setSocketState({
						state: "ready",
						ws: e,
						paused: this.socket.paused === "yes" ? "uninitialized" : "no",
					}),
					this.resetServerInactivityTimeout(),
					this.socket.paused === "no" &&
						((this._hasEverConnected = !0),
						this.onOpen({
							connectionCount: this.connectionCount,
							lastCloseReason: this.lastCloseReason,
							clientTs: Bu(),
						})),
					this.lastCloseReason !== "InitialConnect" &&
						(this.lastCloseReason
							? this.logger.log("WebSocket reconnected at", Rp(), "after disconnect due to", this.lastCloseReason)
							: this.logger.log("WebSocket reconnected at", Rp())),
					(this.connectionCount += 1),
					(this.lastCloseReason = null),
					this.pendingNetworkRecoveryInfo !== null)
				) {
					const { timeSavedMs: t } = this.pendingNetworkRecoveryInfo;
					((this.pendingNetworkRecoveryInfo = null),
						this.sendMessage({ type: "Event", eventType: "NetworkRecoveryReconnect", event: { timeSavedMs: t } }),
						this.logger.log(`Network recovery reconnect saved ~${Math.round(t / 1e3)}s of waiting`));
				}
			}),
			(e.onerror = (t) => {
				this.transitionChunkBuffer = null;
				const i = t.message;
				i && this.logger.log(`WebSocket error message: ${i}`);
			}),
			(e.onmessage = (t) => {
				this.resetServerInactivityTimeout();
				const i = t.data.length;
				let u = Ap(JSON.parse(t.data));
				if ((this._logVerbose(`received ws message with type ${u.type}`), u.type !== "Ping")) {
					if (u.type === "TransitionChunk") {
						const s = this.assembleTransition(u);
						if (!s) return;
						((u = s), this._logVerbose(`assembled full ws message of type ${u.type}`));
					}
					(this.transitionChunkBuffer !== null &&
						((this.transitionChunkBuffer = null),
						this.logger.log(`Received unexpected ${u.type} while buffering TransitionChunks`)),
						u.type === "Transition" && this.reportLargeTransition({ messageLength: i, transition: u }),
						this.onMessage(u).hasSyncedPastLastReconnect && ((this.retries = 0), this.markConnectionStateDirty()));
				}
			}),
			(e.onclose = (t) => {
				if (
					(this._logVerbose("begin ws.onclose"),
					(this.transitionChunkBuffer = null),
					this.lastCloseReason === null && (this.lastCloseReason = t.reason || `closed with code ${t.code}`),
					t.code !== NE && t.code !== OE && t.code !== zE && t.code !== DE)
				) {
					let u = `WebSocket closed with code ${t.code}`;
					(t.reason && (u += `: ${t.reason}`),
						this.logger.log(u),
						this.onServerDisconnectError && t.reason && this.onServerDisconnectError(u));
				}
				const i = jE(t.reason);
				this.scheduleReconnect(i);
			}));
	}
	socketState() {
		return this.socket.state;
	}
	sendMessage(e) {
		const t = {
			type: e.type,
			...(e.type === "Authenticate" && e.tokenType === "User" ? { value: `...${e.value.slice(-7)}` } : {}),
		};
		if (this.socket.state === "ready" && this.socket.paused === "no") {
			const i = CE(e),
				u = JSON.stringify(i);
			let s = !1;
			try {
				(this.socket.ws.send(u), (s = !0));
			} catch (o) {
				(this.logger.log(`Failed to send message on WebSocket, reconnecting: ${o}`),
					this.closeAndReconnect("FailedToSendMessage"));
			}
			return (
				this._logVerbose(`${s ? "sent" : "failed to send"} message with type ${e.type}: ${JSON.stringify(t)}`),
				!0
			);
		}
		return (
			this._logVerbose(
				`message not sent (socket state: ${this.socket.state}, paused: ${"paused" in this.socket ? this.socket.paused : void 0}): ${JSON.stringify(t)}`,
			),
			!1
		);
	}
	resetServerInactivityTimeout() {
		this.socket.state !== "terminated" &&
			(this.reconnectDueToServerInactivityTimeout !== null &&
				(clearTimeout(this.reconnectDueToServerInactivityTimeout), (this.reconnectDueToServerInactivityTimeout = null)),
			(this.reconnectDueToServerInactivityTimeout = setTimeout(() => {
				this.closeAndReconnect("InactiveServer");
			}, this.serverInactivityThreshold)));
	}
	scheduleReconnect(e) {
		(this.scheduledReconnect && (clearTimeout(this.scheduledReconnect.timeout), (this.scheduledReconnect = null)),
			(this.socket = { state: "disconnected" }));
		const t = this.nextBackoff(e);
		(this.markConnectionStateDirty(), this.logger.log(`Attempting reconnect in ${Math.round(t)}ms`));
		const i = Bu(),
			u = setTimeout(() => {
				this.scheduledReconnect?.timeout === u && ((this.scheduledReconnect = null), this.connect());
			}, t);
		this.scheduledReconnect = { timeout: u, scheduledAt: i, backoffMs: t };
	}
	closeAndReconnect(e) {
		switch ((this._logVerbose(`begin closeAndReconnect with reason ${e}`), this.socket.state)) {
			case "disconnected":
			case "terminated":
			case "stopped":
				return;
			case "connecting":
			case "ready":
				((this.lastCloseReason = e), this.close(), this.scheduleReconnect("client"));
				return;
			default:
				this.socket;
		}
	}
	close() {
		switch (((this.transitionChunkBuffer = null), this.socket.state)) {
			case "disconnected":
			case "terminated":
			case "stopped":
				return Promise.resolve();
			case "connecting": {
				const e = this.socket.ws;
				return (
					(e.onmessage = (t) => {
						this._logVerbose("Ignoring message received after close");
					}),
					new Promise((t) => {
						((e.onclose = () => {
							(this._logVerbose("Closed after connecting"), t());
						}),
							(e.onopen = () => {
								(this._logVerbose("Opened after connecting"), e.close());
							}));
					})
				);
			}
			case "ready": {
				this._logVerbose("ws.close called");
				const e = this.socket.ws;
				e.onmessage = (i) => {
					this._logVerbose("Ignoring message received after close");
				};
				const t = new Promise((i) => {
					e.onclose = () => {
						i();
					};
				});
				return (e.close(), t);
			}
			default:
				return (this.socket, Promise.resolve());
		}
	}
	terminate() {
		switch (
			(this.reconnectDueToServerInactivityTimeout && clearTimeout(this.reconnectDueToServerInactivityTimeout),
			this.scheduledReconnect && (clearTimeout(this.scheduledReconnect.timeout), (this.scheduledReconnect = null)),
			this.cleanupNetworkListener(),
			this.socket.state)
		) {
			case "terminated":
			case "stopped":
			case "disconnected":
			case "connecting":
			case "ready": {
				const e = this.close();
				return (this.setSocketState({ state: "terminated" }), e);
			}
			default:
				throw (this.socket, new Error(`Invalid websocket state: ${this.socket.state}`));
		}
	}
	stop() {
		switch (this.socket.state) {
			case "terminated":
				return Promise.resolve();
			case "connecting":
			case "stopped":
			case "disconnected":
			case "ready": {
				this.cleanupNetworkListener();
				const e = this.close();
				return ((this.socket = { state: "stopped" }), e);
			}
			default:
				return (this.socket, Promise.resolve());
		}
	}
	tryRestart() {
		switch (this.socket.state) {
			case "stopped":
				break;
			case "terminated":
			case "connecting":
			case "ready":
			case "disconnected":
				this.logger.logVerbose("Restart called without stopping first");
				return;
			default:
				this.socket;
		}
		(this.setupNetworkListener(), this.connect());
	}
	pause() {
		switch (this.socket.state) {
			case "disconnected":
			case "stopped":
			case "terminated":
				return;
			case "connecting":
			case "ready":
				this.socket = { ...this.socket, paused: "yes" };
				return;
			default:
				this.socket;
				return;
		}
	}
	tryReconnectImmediately() {
		if ((this._logVerbose("tryReconnectImmediately called"), this.socket.state !== "disconnected")) {
			this._logVerbose(`tryReconnectImmediately called but socket state is ${this.socket.state}, no action taken`);
			return;
		}
		let e = null;
		if (this.scheduledReconnect) {
			const t = Bu() - this.scheduledReconnect.scheduledAt;
			((e = Math.max(0, this.scheduledReconnect.backoffMs - t)),
				this._logVerbose(
					`would have waited ${Math.round(e)}ms more (backoff was ${Math.round(this.scheduledReconnect.backoffMs)}ms, elapsed ${Math.round(t)}ms)`,
				),
				clearTimeout(this.scheduledReconnect.timeout),
				(this.scheduledReconnect = null),
				this._logVerbose("canceled scheduled reconnect"));
		}
		(this.logger.log("Network recovery detected, reconnecting immediately"),
			(this.pendingNetworkRecoveryInfo = e !== null ? { timeSavedMs: e } : null),
			this.connect());
	}
	resume() {
		switch (this.socket.state) {
			case "connecting":
				this.socket = { ...this.socket, paused: "no" };
				return;
			case "ready":
				this.socket.paused === "uninitialized"
					? ((this.socket = { ...this.socket, paused: "no" }),
						(this._hasEverConnected = !0),
						this.onOpen({
							connectionCount: this.connectionCount,
							lastCloseReason: this.lastCloseReason,
							clientTs: Bu(),
						}))
					: this.socket.paused === "yes" && ((this.socket = { ...this.socket, paused: "no" }), this.onResume());
				return;
			case "terminated":
			case "stopped":
			case "disconnected":
				return;
			default:
				this.socket;
		}
		this.connect();
	}
	connectionState() {
		return {
			isConnected: this.socket.state === "ready",
			hasEverConnected: this._hasEverConnected,
			connectionCount: this.connectionCount,
			connectionRetries: this.retries,
		};
	}
	_logVerbose(e) {
		this.logger.logVerbose(e);
	}
	nextBackoff(e) {
		const t =
			(e === "client" ? 100 : e === "Unknown" ? this.defaultInitialBackoff : wb[e].timeout) * Math.pow(2, this.retries);
		this.retries += 1;
		const i = Math.min(t, this.maxBackoff);
		return i + i * (Math.random() - 0.5);
	}
	reportLargeTransition({ transition: e, messageLength: t }) {
		if (e.clientClockSkew === void 0 || e.serverTs === void 0) return;
		const i = Bu() - e.clientClockSkew - e.serverTs / 1e6,
			u = `${Math.round(i)}ms`,
			s = `${Math.round(t / 1e4) / 100}MB`,
			o = t / (i / 1e3),
			f = `${Math.round(o / 1e4) / 100}MB per second`;
		(this._logVerbose(`received ${s} transition in ${u} at ${f}`),
			t > 2e7
				? this.logger.log(
						`received query results totaling more that 20MB (${s}) which will take a long time to download on slower connections`,
					)
				: i > 2e4 && this.logger.log(`received query results totaling ${s} which took more than 20s to arrive (${u})`),
			this.debug &&
				this.sendMessage({
					type: "Event",
					eventType: "ClientReceivedTransition",
					event: { transitionTransitTime: i, messageLength: t },
				}));
	}
};
function LE() {
	return qE();
}
function qE() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
		const t = (Math.random() * 16) | 0;
		return (e === "x" ? t : (t & 3) | 8).toString(16);
	});
}
var rs = class extends Error {};
rs.prototype.name = "InvalidTokenError";
function UE(e) {
	return decodeURIComponent(
		atob(e).replace(/(.)/g, (t, i) => {
			let u = i.charCodeAt(0).toString(16).toUpperCase();
			return (u.length < 2 && (u = "0" + u), "%" + u);
		}),
	);
}
function $E(e) {
	let t = e.replace(/-/g, "+").replace(/_/g, "/");
	switch (t.length % 4) {
		case 0:
			break;
		case 2:
			t += "==";
			break;
		case 3:
			t += "=";
			break;
		default:
			throw new Error("base64 string is not of the correct length");
	}
	try {
		return UE(t);
	} catch {
		return atob(t);
	}
}
function Eb(e, t) {
	if (typeof e != "string") throw new rs("Invalid token specified: must be a string");
	t || (t = {});
	const i = t.header === !0 ? 0 : 1,
		u = e.split(".")[i];
	if (typeof u != "string") throw new rs(`Invalid token specified: missing part #${i + 1}`);
	let s;
	try {
		s = $E(u);
	} catch (o) {
		throw new rs(`Invalid token specified: invalid base64 for part #${i + 1} (${o.message})`);
	}
	try {
		return JSON.parse(s);
	} catch (o) {
		throw new rs(`Invalid token specified: invalid json for part #${i + 1} (${o.message})`);
	}
}
var BE = Object.defineProperty,
	VE = (e, t, i) => (t in e ? BE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	tr = (e, t, i) => VE(e, typeof t != "symbol" ? t + "" : t, i),
	HE = 480 * 60 * 60 * 1e3,
	Cp = 2,
	ZE = class {
		constructor(e, t, i) {
			(tr(this, "authState", { state: "noAuth" }),
				tr(this, "configVersion", 0),
				tr(this, "syncState"),
				tr(this, "authenticate"),
				tr(this, "stopSocket"),
				tr(this, "tryRestartSocket"),
				tr(this, "pauseSocket"),
				tr(this, "resumeSocket"),
				tr(this, "clearAuth"),
				tr(this, "logger"),
				tr(this, "refreshTokenLeewaySeconds"),
				tr(this, "initialAuthTokenReuse"),
				tr(this, "lastRefreshChange"),
				tr(this, "tokenConfirmationAttempts", 0),
				(this.syncState = e),
				(this.authenticate = t.authenticate),
				(this.stopSocket = t.stopSocket),
				(this.tryRestartSocket = t.tryRestartSocket),
				(this.pauseSocket = t.pauseSocket),
				(this.resumeSocket = t.resumeSocket),
				(this.clearAuth = t.clearAuth),
				(this.logger = i.logger),
				(this.refreshTokenLeewaySeconds = i.refreshTokenLeewaySeconds),
				(this.initialAuthTokenReuse = i.initialAuthTokenReuse),
				(this.lastRefreshChange = !1));
		}
		notifyRefreshChange(e) {
			this.authState.state !== "noAuth" &&
				this.authState.state !== "initialRefetch" &&
				this.authState.config.onRefreshChange &&
				this.lastRefreshChange !== e &&
				((this.lastRefreshChange = e), this.authState.config.onRefreshChange(e));
		}
		async setConfig(e, t, i) {
			(this.resetAuthState(), this._logVerbose("pausing WS for auth token fetch"), this.pauseSocket());
			const u = await this.fetchTokenAndGuardAgainstRace(e, { forceRefreshToken: !1 });
			if (u.isFromOutdatedConfig) return;
			const s = { fetchToken: e, onAuthChange: t, onRefreshChange: i };
			(u.value
				? (this.setAuthState({ state: "waitingForServerConfirmationOfCachedToken", config: s, hasRetried: !1 }),
					this.authenticate(u.value))
				: (this.setAuthState({ state: "initialRefetch", config: s }), await this.refetchToken()),
				this._logVerbose("resuming WS after auth token fetch"),
				this.resumeSocket());
		}
		onTransition(e) {
			if (
				this.syncState.isCurrentOrNewerAuthVersion(e.endVersion.identity) &&
				!(e.endVersion.identity <= e.startVersion.identity)
			) {
				if (
					(this._logVerbose(`auth state is ${this.authState.state} when handling transition`),
					this.syncState.markAuthCompletion(),
					this.authState.state === "waitingForServerConfirmationOfCachedToken")
				) {
					this._logVerbose("server confirmed auth token is valid");
					const t = this.syncState.getAuth()?.value;
					(this.initialAuthTokenReuse && t ? this.scheduleTokenRefetch(t, e.clientClockSkew) : this.refetchToken(),
						this.authState.config.onAuthChange(!0));
					return;
				}
				this.authState.state === "waitingForServerConfirmationOfFreshToken" &&
					(this._logVerbose("server confirmed new auth token is valid"),
					this.notifyRefreshChange(!1),
					this.scheduleTokenRefetch(this.authState.token),
					(this.tokenConfirmationAttempts = 0),
					this.authState.hadAuth || this.authState.config.onAuthChange(!0));
			}
		}
		onAuthError(e) {
			if (
				e.authUpdateAttempted === !1 &&
				(this.authState.state === "waitingForServerConfirmationOfFreshToken" ||
					this.authState.state === "waitingForServerConfirmationOfCachedToken")
			) {
				this._logVerbose("ignoring non-auth token expired error");
				return;
			}
			const { baseVersion: t } = e;
			if (!this.syncState.isCurrentOrNewerAuthVersion(t + 1)) {
				this._logVerbose("ignoring auth error for previous auth attempt");
				return;
			}
			this.tryToReauthenticate(e);
		}
		async tryToReauthenticate(e) {
			if (
				(this._logVerbose(`attempting to reauthenticate: ${e.error}`),
				this.authState.state === "noAuth" ||
					(this.authState.state === "waitingForServerConfirmationOfFreshToken" && this.tokenConfirmationAttempts >= Cp))
			) {
				(this.logger.error(`Failed to authenticate: "${e.error}", check your server auth config`),
					this.syncState.hasAuth() && this.syncState.clearAuth(),
					this.authState.state !== "noAuth" && this.setAndReportAuthFailed(this.authState.config.onAuthChange));
				return;
			}
			if (
				(this.authState.state === "waitingForServerConfirmationOfFreshToken" &&
					(this.tokenConfirmationAttempts++,
					this._logVerbose(`retrying reauthentication, ${Cp - this.tokenConfirmationAttempts} attempts remaining`)),
				this.notifyRefreshChange(!0),
				await this.stopSocket(),
				this.authState.state === "noAuth")
			)
				return;
			const t = await this.fetchTokenAndGuardAgainstRace(this.authState.config.fetchToken, { forceRefreshToken: !0 });
			t.isFromOutdatedConfig ||
				(t.value && this.syncState.isNewAuth(t.value)
					? (this.authenticate(t.value),
						this.setAuthState({
							state: "waitingForServerConfirmationOfFreshToken",
							config: this.authState.config,
							token: t.value,
							hadAuth:
								this.authState.state === "notRefetching" || this.authState.state === "waitingForScheduledRefetch",
						}))
					: (this._logVerbose("reauthentication failed, could not fetch a new token"),
						this.syncState.hasAuth() && this.syncState.clearAuth(),
						this.setAndReportAuthFailed(this.authState.config.onAuthChange)),
				this.tryRestartSocket());
		}
		async refetchToken() {
			if (this.authState.state === "noAuth") return;
			this._logVerbose("refetching auth token");
			const e = await this.fetchTokenAndGuardAgainstRace(this.authState.config.fetchToken, { forceRefreshToken: !0 });
			e.isFromOutdatedConfig ||
				(e.value
					? this.syncState.isNewAuth(e.value)
						? (this.setAuthState({
								state: "waitingForServerConfirmationOfFreshToken",
								hadAuth: this.syncState.hasAuth(),
								token: e.value,
								config: this.authState.config,
							}),
							this.authenticate(e.value))
						: this.setAuthState({ state: "notRefetching", config: this.authState.config })
					: (this._logVerbose("refetching token failed"),
						this.syncState.hasAuth() && this.clearAuth(),
						this.setAndReportAuthFailed(this.authState.config.onAuthChange)),
				this._logVerbose("restarting WS after auth token fetch (if currently stopped)"),
				this.tryRestartSocket());
		}
		scheduleTokenRefetch(e, t) {
			if (this.authState.state === "noAuth") return;
			const i = this.decodeToken(e);
			if (!i) {
				this.logger.error("Auth token is not a valid JWT, cannot refetch the token");
				return;
			}
			const { iat: u, exp: s } = i;
			if (!u || !s) {
				this.logger.error("Auth token does not have required fields, cannot refetch the token");
				return;
			}
			const o = s - u;
			if (o <= 2) {
				this.logger.error("Auth token does not live long enough, cannot refetch the token");
				return;
			}
			let f;
			t !== void 0 ? ((f = s - (Date.now() - t) / 1e3), f <= 0 && (f = 0)) : (f = o);
			let h = Math.min(HE, (f - this.refreshTokenLeewaySeconds) * 1e3);
			h <= 0 &&
				(this.logger.warn(
					`Refetching auth token immediately, configured leeway ${this.refreshTokenLeewaySeconds}s is larger than the token's lifetime ${f}s`,
				),
				(h = 0));
			const m = setTimeout(() => {
				(this._logVerbose("running scheduled token refetch"), this.refetchToken());
			}, h);
			(this.setAuthState({
				state: "waitingForScheduledRefetch",
				refetchTokenTimeoutId: m,
				config: this.authState.config,
			}),
				this._logVerbose(`scheduled preemptive auth token refetching in ${h}ms`));
		}
		async fetchTokenAndGuardAgainstRace(e, t) {
			const i = ++this.configVersion;
			this._logVerbose(`fetching token with config version ${i}`);
			const u = await e(t);
			return this.configVersion !== i
				? (this._logVerbose(`stale config version, expected ${i}, got ${this.configVersion}`),
					{ isFromOutdatedConfig: !0 })
				: { isFromOutdatedConfig: !1, value: u };
		}
		stop() {
			(this.resetAuthState(), this.configVersion++, this._logVerbose(`config version bumped to ${this.configVersion}`));
		}
		setAndReportAuthFailed(e) {
			(e(!1), this.resetAuthState());
		}
		resetAuthState() {
			(this.notifyRefreshChange(!1), this.setAuthState({ state: "noAuth" }));
		}
		setAuthState(e) {
			const t =
				e.state === "waitingForServerConfirmationOfFreshToken"
					? { hadAuth: e.hadAuth, state: e.state, token: `...${e.token.slice(-7)}` }
					: { state: e.state };
			switch ((this._logVerbose(`setting auth state to ${JSON.stringify(t)}`), e.state)) {
				case "waitingForScheduledRefetch":
				case "notRefetching":
				case "noAuth":
					this.tokenConfirmationAttempts = 0;
					break;
				case "waitingForServerConfirmationOfFreshToken":
				case "waitingForServerConfirmationOfCachedToken":
				case "initialRefetch":
					break;
				default:
			}
			(this.authState.state === "waitingForScheduledRefetch" && clearTimeout(this.authState.refetchTokenTimeoutId),
				(this.authState = e));
		}
		decodeToken(e) {
			try {
				return Eb(e);
			} catch (t) {
				return (this._logVerbose(`Error decoding token: ${t instanceof Error ? t.message : "Unknown error"}`), null);
			}
		}
		_logVerbose(e) {
			this.logger.logVerbose(`${e} [v${this.configVersion}]`);
		}
	},
	PE = ["convexClientConstructed", "convexWebSocketOpen", "convexFirstMessageReceived"];
function QE(e, t) {
	const i = { sessionId: t };
	typeof performance > "u" || !performance.mark || performance.mark(e, { detail: i });
}
function KE(e) {
	let t = e.name.slice(6);
	return ((t = t.charAt(0).toLowerCase() + t.slice(1)), { name: t, startTime: e.startTime });
}
function YE(e) {
	if (typeof performance > "u" || !performance.getEntriesByName) return [];
	const t = [];
	for (const i of PE) {
		const u = performance
			.getEntriesByName(i)
			.filter((s) => s.entryType === "mark")
			.filter((s) => s.detail.sessionId === e);
		t.push(...u);
	}
	return t.map(KE);
}
var GE = Object.defineProperty,
	FE = (e, t, i) => (t in e ? GE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	fn = (e, t, i) => FE(e, typeof t != "symbol" ? t + "" : t, i),
	XE = class {
		constructor(e, t, i) {
			if (
				(fn(this, "address"),
				fn(this, "state"),
				fn(this, "requestManager"),
				fn(this, "webSocketManager"),
				fn(this, "authenticationManager"),
				fn(this, "remoteQuerySet"),
				fn(this, "optimisticQueryResults"),
				fn(this, "_transitionHandlerCounter", 0),
				fn(this, "_nextRequestId"),
				fn(this, "_onTransitionFns", new Map()),
				fn(this, "_sessionId"),
				fn(this, "firstMessageReceived", !1),
				fn(this, "debug"),
				fn(this, "logger"),
				fn(this, "maxObservedTimestamp"),
				fn(this, "connectionStateSubscribers", new Map()),
				fn(this, "nextConnectionStateSubscriberId", 0),
				fn(this, "_lastPublishedConnectionState"),
				fn(this, "markConnectionStateDirty", () => {
					Promise.resolve().then(() => {
						const b = this.connectionState();
						if (JSON.stringify(b) !== JSON.stringify(this._lastPublishedConnectionState)) {
							this._lastPublishedConnectionState = b;
							for (const p of this.connectionStateSubscribers.values()) p(b);
						}
					});
				}),
				fn(this, "mark", (b) => {
					this.debug && QE(b, this.sessionId);
				}),
				typeof e == "object")
			)
				throw new Error(
					"Passing a ClientConfig object is no longer supported. Pass the URL of the Convex deployment as a string directly.",
				);
			(i?.skipConvexDeploymentUrlCheck !== !0 && mb(e), (i = { ...i }));
			const u = i.authRefreshTokenLeewaySeconds ?? 10;
			let s = i.webSocketConstructor;
			if (!s && typeof WebSocket > "u")
				throw new Error(
					"No WebSocket global variable defined! To use Convex in an environment without WebSocket try the HTTP client: https://docs.convex.dev/api/classes/browser.ConvexHttpClient",
				);
			((s = s || WebSocket),
				(this.debug = i.reportDebugInfoToConvex ?? !1),
				(this.address = e),
				(this.logger =
					i.logger === !1
						? iE({ verbose: i.verbose ?? !1 })
						: i.logger !== !0 && i.logger
							? i.logger
							: rE({ verbose: i.verbose ?? !1 })));
			const o = e.search("://");
			if (o === -1) throw new Error("Provided address was not an absolute URL.");
			const f = e.substring(o + 3),
				h = e.substring(0, o);
			let m;
			if (h === "http") m = "ws";
			else if (h === "https") m = "wss";
			else throw new Error(`Unknown parent protocol ${h}`);
			const v = `${m}://${f}/api/${vp}/sync`;
			((this.state = new oE()),
				(this.remoteQuerySet = new xp((b) => this.state.queryPath(b), this.logger)),
				(this.requestManager = new dE(this.logger, this.markConnectionStateDirty)));
			const g = () => {
				(this.webSocketManager.pause(), this.state.pause());
			};
			((this.authenticationManager = new ZE(
				this.state,
				{
					authenticate: (b) => {
						const p = this.state.setAuth(b);
						return (this.webSocketManager.sendMessage(p), p.baseVersion);
					},
					stopSocket: () => this.webSocketManager.stop(),
					tryRestartSocket: () => this.webSocketManager.tryRestart(),
					pauseSocket: g,
					resumeSocket: () => this.webSocketManager.resume(),
					clearAuth: () => {
						this.clearAuth();
					},
				},
				{ logger: this.logger, refreshTokenLeewaySeconds: u, initialAuthTokenReuse: i.initialAuthTokenReuse ?? !1 },
			)),
				(this.optimisticQueryResults = new _E()),
				this.addOnTransitionHandler((b) => {
					t(b.queries.map((p) => p.token));
				}),
				(this._nextRequestId = 0),
				(this._sessionId = LE()));
			const { unsavedChangesWarning: S } = i;
			if (typeof window > "u" || typeof window.addEventListener > "u") {
				if (S === !0)
					throw new Error(
						"unsavedChangesWarning requested, but window.addEventListener not found! Remove {unsavedChangesWarning: true} from Convex client options.",
					);
			} else
				S !== !1 &&
					window.addEventListener("beforeunload", (b) => {
						if (this.requestManager.hasIncompleteRequests()) {
							b.preventDefault();
							const p = "Are you sure you want to leave? Your changes may not be saved.";
							return (((b || window.event).returnValue = p), p);
						}
					});
			((this.webSocketManager = new IE(
				v,
				{
					onOpen: (b) => {
						(this.mark("convexWebSocketOpen"),
							this.webSocketManager.sendMessage({
								...b,
								type: "Connect",
								sessionId: this._sessionId,
								maxObservedTimestamp: this.maxObservedTimestamp,
							}),
							(this.remoteQuerySet = new xp((A) => this.state.queryPath(A), this.logger)));
						const [p, T] = this.state.restart();
						(T && this.webSocketManager.sendMessage(T), this.webSocketManager.sendMessage(p));
						for (const A of this.requestManager.restart()) this.webSocketManager.sendMessage(A);
					},
					onResume: () => {
						const [b, p] = this.state.resume();
						(p && this.webSocketManager.sendMessage(p), b && this.webSocketManager.sendMessage(b));
						for (const T of this.requestManager.resume()) this.webSocketManager.sendMessage(T);
					},
					onMessage: (b) => {
						switch (
							(this.firstMessageReceived ||
								((this.firstMessageReceived = !0), this.mark("convexFirstMessageReceived"), this.reportMarks()),
							b.type)
						) {
							case "Transition": {
								(this.observedTimestamp(b.endVersion.ts),
									this.authenticationManager.onTransition(b),
									this.remoteQuerySet.transition(b),
									this.state.transition(b));
								const p = this.requestManager.removeCompleted(this.remoteQuerySet.timestamp());
								this.notifyOnQueryResultChanges(p);
								break;
							}
							case "MutationResponse": {
								b.success && this.observedTimestamp(b.ts);
								const p = this.requestManager.onResponse(b);
								p !== null && this.notifyOnQueryResultChanges(new Map([[p.requestId, p.result]]));
								break;
							}
							case "ActionResponse":
								this.requestManager.onResponse(b);
								break;
							case "AuthError":
								this.authenticationManager.onAuthError(b);
								break;
							case "FatalError": {
								const p = aE(this.logger, b.error);
								throw (this.webSocketManager.terminate(), p);
							}
							default:
						}
						return { hasSyncedPastLastReconnect: this.hasSyncedPastLastReconnect() };
					},
					onServerDisconnectError: i.onServerDisconnectError,
				},
				s,
				this.logger,
				this.markConnectionStateDirty,
				this.debug,
			)),
				this.mark("convexClientConstructed"),
				i.expectAuth && g());
		}
		hasSyncedPastLastReconnect() {
			return this.requestManager.hasSyncedPastLastReconnect() && this.state.hasSyncedPastLastReconnect();
		}
		observedTimestamp(e) {
			(this.maxObservedTimestamp === void 0 || this.maxObservedTimestamp.lessThanOrEqual(e)) &&
				(this.maxObservedTimestamp = e);
		}
		getMaxObservedTimestamp() {
			return this.maxObservedTimestamp;
		}
		notifyOnQueryResultChanges(e) {
			const t = this.remoteQuerySet.remoteQueryResults(),
				i = new Map();
			for (const [s, o] of t) {
				const f = this.state.queryToken(s);
				if (f !== null) {
					const h = { result: o, udfPath: this.state.queryPath(s), args: this.state.queryArgs(s) };
					i.set(f, h);
				}
			}
			const u = this.optimisticQueryResults.ingestQueryResultsFromServer(i, new Set(e.keys()));
			this.handleTransition({
				queries: u.map((s) => ({
					token: s,
					modification: { kind: "Updated", result: this.optimisticQueryResults.rawQueryResult(s) },
				})),
				reflectedMutations: Array.from(e).map(([s, o]) => ({ requestId: s, result: o })),
				timestamp: this.remoteQuerySet.timestamp(),
			});
		}
		handleTransition(e) {
			for (const t of this._onTransitionFns.values()) t(e);
		}
		addOnTransitionHandler(e) {
			const t = this._transitionHandlerCounter++;
			return (this._onTransitionFns.set(t, e), () => this._onTransitionFns.delete(t));
		}
		getCurrentAuthClaims() {
			const e = this.state.getAuth();
			let t = {};
			if (e && e.tokenType === "User")
				try {
					t = e ? Eb(e.value) : {};
				} catch {
					t = {};
				}
			else return;
			return { token: e.value, decoded: t };
		}
		setAuth(e, t, i) {
			this.authenticationManager.setConfig(e, t, i);
		}
		hasAuth() {
			return this.state.hasAuth();
		}
		setAdminAuth(e, t) {
			const i = this.state.setAdminAuth(e, t);
			this.webSocketManager.sendMessage(i);
		}
		clearAuth() {
			const e = this.state.clearAuth();
			this.webSocketManager.sendMessage(e);
		}
		subscribe(e, t, i) {
			const u = fa(t),
				{ modification: s, queryToken: o, unsubscribe: f } = this.state.subscribe(e, u, i?.journal, i?.componentPath);
			return (
				s !== null && this.webSocketManager.sendMessage(s),
				{
					queryToken: o,
					unsubscribe: () => {
						const h = f();
						h && this.webSocketManager.sendMessage(h);
					},
				}
			);
		}
		localQueryResult(e, t) {
			const i = Ka(e, fa(t));
			return this.optimisticQueryResults.queryResult(i);
		}
		localQueryResultByToken(e) {
			return this.optimisticQueryResults.queryResult(e);
		}
		hasLocalQueryResultByToken(e) {
			return this.optimisticQueryResults.hasQueryResult(e);
		}
		localQueryLogs(e, t) {
			const i = Ka(e, fa(t));
			return this.optimisticQueryResults.queryLogs(i);
		}
		queryJournal(e, t) {
			const i = Ka(e, fa(t));
			return this.state.queryJournal(i);
		}
		connectionState() {
			const e = this.webSocketManager.connectionState();
			return {
				hasInflightRequests: this.requestManager.hasInflightRequests(),
				isWebSocketConnected: e.isConnected,
				hasEverConnected: e.hasEverConnected,
				connectionCount: e.connectionCount,
				connectionRetries: e.connectionRetries,
				timeOfOldestInflightRequest: this.requestManager.timeOfOldestInflightRequest(),
				inflightMutations: this.requestManager.inflightMutations(),
				inflightActions: this.requestManager.inflightActions(),
			};
		}
		subscribeToConnectionState(e) {
			const t = this.nextConnectionStateSubscriberId++;
			return (
				this.connectionStateSubscribers.set(t, e),
				() => {
					this.connectionStateSubscribers.delete(t);
				}
			);
		}
		async mutation(e, t, i) {
			const u = await this.mutationInternal(e, t, i);
			if (!u.success)
				throw u.errorData !== void 0 ? Nh(u, new Mh(Vu("mutation", e, u))) : new Error(Vu("mutation", e, u));
			return u.value;
		}
		async mutationInternal(e, t, i, u) {
			const { mutationPromise: s } = this.enqueueMutation(e, t, i, u);
			return s;
		}
		enqueueMutation(e, t, i, u) {
			const s = fa(t);
			this.tryReportLongDisconnect();
			const o = this.nextRequestId;
			if ((this._nextRequestId++, i !== void 0)) {
				const m = i.optimisticUpdate;
				if (m !== void 0) {
					const v = (S) => {
							m(S, s) instanceof Promise &&
								this.logger.warn(
									"Optimistic update handler returned a Promise. Optimistic updates should be synchronous.",
								);
						},
						g = this.optimisticQueryResults.applyOptimisticUpdate(v, o).map((S) => {
							const b = this.localQueryResultByToken(S);
							return {
								token: S,
								modification: {
									kind: "Updated",
									result: b === void 0 ? void 0 : { success: !0, value: b, logLines: [] },
								},
							};
						});
					this.handleTransition({ queries: g, reflectedMutations: [], timestamp: this.remoteQuerySet.timestamp() });
				}
			}
			const f = { type: "Mutation", requestId: o, udfPath: e, componentPath: u, args: [Ga(s)] },
				h = this.webSocketManager.sendMessage(f);
			return { requestId: o, mutationPromise: this.requestManager.request(f, h) };
		}
		async action(e, t) {
			const i = await this.actionInternal(e, t);
			if (!i.success) throw i.errorData !== void 0 ? Nh(i, new Mh(Vu("action", e, i))) : new Error(Vu("action", e, i));
			return i.value;
		}
		async actionInternal(e, t, i) {
			const u = fa(t),
				s = this.nextRequestId;
			(this._nextRequestId++, this.tryReportLongDisconnect());
			const o = { type: "Action", requestId: s, udfPath: e, componentPath: i, args: [Ga(u)] },
				f = this.webSocketManager.sendMessage(o);
			return this.requestManager.request(o, f);
		}
		async close() {
			return (this.authenticationManager.stop(), this.webSocketManager.terminate());
		}
		get url() {
			return this.address;
		}
		get nextRequestId() {
			return this._nextRequestId;
		}
		get sessionId() {
			return this._sessionId;
		}
		reportMarks() {
			if (this.debug) {
				const e = YE(this.sessionId);
				this.webSocketManager.sendMessage({ type: "Event", eventType: "ClientConnect", event: e });
			}
		}
		tryReportLongDisconnect() {
			if (!this.debug) return;
			const e = this.connectionState().timeOfOldestInflightRequest;
			if (e === null || Date.now() - e.getTime() <= 60 * 1e3) return;
			const t = `${this.address}/api/debug_event`;
			fetch(t, {
				method: "POST",
				headers: { "Content-Type": "application/json", "Convex-Client": `npm-${vp}` },
				body: JSON.stringify({ event: "LongWebsocketDisconnect" }),
			})
				.then((i) => {
					i.ok || this.logger.warn("Analytics request failed with response:", i.body);
				})
				.catch((i) => {
					this.logger.warn("Analytics response failed with error:", i);
				});
		}
	};
function ih(e) {
	if (
		typeof e != "object" ||
		e === null ||
		!Array.isArray(e.page) ||
		typeof e.isDone != "boolean" ||
		typeof e.continueCursor != "string"
	)
		throw new Error(`Not a valid paginated query result: ${e?.toString()}`);
	return e;
}
var JE = Object.defineProperty,
	WE = (e, t, i) => (t in e ? JE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	kp = (e, t, i) => WE(e, typeof t != "symbol" ? t + "" : t, i),
	eT = class {
		constructor(e, t) {
			((this.client = e),
				(this.onTransition = t),
				kp(this, "paginatedQuerySet", new Map()),
				kp(this, "lastTransitionTs"),
				(this.lastTransitionTs = ys.fromNumber(0)),
				this.client.addOnTransitionHandler((i) => this.onBaseTransition(i)));
		}
		subscribe(e, t, i) {
			const u = Fa(e),
				s = Sp(u, t, i),
				o = () => this.removePaginatedQuerySubscriber(s),
				f = this.paginatedQuerySet.get(s);
			return f
				? ((f.numSubscribers += 1), { paginatedQueryToken: s, unsubscribe: o })
				: (this.paginatedQuerySet.set(s, {
						token: s,
						canonicalizedUdfPath: u,
						args: t,
						numSubscribers: 1,
						options: { initialNumItems: i.initialNumItems },
						nextPageKey: 0,
						pageKeys: [],
						pageKeyToQuery: new Map(),
						ongoingSplits: new Map(),
						skip: !1,
						id: i.id,
					}),
					this.addPageToPaginatedQuery(s, null, i.initialNumItems),
					{ paginatedQueryToken: s, unsubscribe: o });
		}
		localQueryResult(e, t, i) {
			const u = Sp(Fa(e), t, i);
			return this.localQueryResultByToken(u);
		}
		localQueryResultByToken(e) {
			const t = this.paginatedQuerySet.get(e);
			if (!t) return;
			const i = this.activePageQueryTokens(t);
			if (i.length === 0)
				return { results: [], status: "LoadingFirstPage", loadMore: (h) => this.loadMoreOfPaginatedQuery(e, h) };
			let u = [],
				s = !1,
				o = !1;
			for (const h of i) {
				const m = this.client.localQueryResultByToken(h);
				if (m === void 0) {
					((s = !0), (o = !1));
					continue;
				}
				const v = ih(m);
				((u = u.concat(v.page)), (o = !!v.isDone));
			}
			let f;
			return (
				s ? (f = u.length === 0 ? "LoadingFirstPage" : "LoadingMore") : o ? (f = "Exhausted") : (f = "CanLoadMore"),
				{ results: u, status: f, loadMore: (h) => this.loadMoreOfPaginatedQuery(e, h) }
			);
		}
		onBaseTransition(e) {
			const t = e.queries.map((o) => o.token),
				i = this.queriesContainingTokens(t);
			let u = [];
			i.length > 0 &&
				(this.processPaginatedQuerySplits(i, (o) => this.client.localQueryResultByToken(o)),
				(u = i.map((o) => ({ token: o, modification: { kind: "Updated", result: this.localQueryResultByToken(o) } }))));
			const s = { ...e, paginatedQueries: u };
			this.onTransition(s);
		}
		loadMoreOfPaginatedQuery(e, t) {
			this.mustGetPaginatedQuery(e);
			const i = this.queryTokenForLastPageOfPaginatedQuery(e),
				u = this.client.localQueryResultByToken(i);
			if (!u) return !1;
			const s = ih(u);
			if (s.isDone) return !1;
			this.addPageToPaginatedQuery(e, s.continueCursor, t);
			const o = {
				timestamp: this.lastTransitionTs,
				reflectedMutations: [],
				queries: [],
				paginatedQueries: [{ token: e, modification: { kind: "Updated", result: this.localQueryResultByToken(e) } }],
			};
			return (this.onTransition(o), !0);
		}
		queriesContainingTokens(e) {
			if (e.length === 0) return [];
			const t = [],
				i = new Set(e);
			for (const [u, s] of this.paginatedQuerySet)
				for (const o of this.allQueryTokens(s))
					if (i.has(o)) {
						t.push(u);
						break;
					}
			return t;
		}
		processPaginatedQuerySplits(e, t) {
			for (const i of e) {
				const u = this.mustGetPaginatedQuery(i),
					{ ongoingSplits: s, pageKeyToQuery: o, pageKeys: f } = u;
				for (const [h, [m, v]] of s)
					t(o.get(m).queryToken) !== void 0 &&
						t(o.get(v).queryToken) !== void 0 &&
						this.completePaginatedQuerySplit(u, h, m, v);
				for (const h of f) {
					if (s.has(h)) continue;
					const m = o.get(h);
					if (!m) throw new Error(`No page query for active pageKey ${h}`);
					const v = t(m.queryToken);
					if (!v) continue;
					const g = ih(v);
					g.splitCursor &&
						(g.pageStatus === "SplitRecommended" ||
							g.pageStatus === "SplitRequired" ||
							g.page.length > u.options.initialNumItems * 2) &&
						this.splitPaginatedQueryPage(u, h, m.cursor, g.splitCursor, g.continueCursor);
				}
			}
		}
		splitPaginatedQueryPage(e, t, i, u, s) {
			const o = e.nextPageKey++,
				f = e.nextPageKey++,
				h = { numItems: e.options.initialNumItems, id: e.id },
				m = this.client.subscribe(e.canonicalizedUdfPath, {
					...e.args,
					paginationOpts: { ...h, cursor: i, endCursor: u },
				});
			e.pageKeyToQuery.set(o, { ...m, cursor: i });
			const v = this.client.subscribe(e.canonicalizedUdfPath, {
				...e.args,
				paginationOpts: { ...h, cursor: u, endCursor: s },
			});
			(e.pageKeyToQuery.set(f, { ...v, cursor: u }), e.ongoingSplits.set(t, [o, f]));
		}
		addPageToPaginatedQuery(e, t, i) {
			const u = this.mustGetPaginatedQuery(e),
				s = u.nextPageKey++,
				o = { cursor: t, numItems: i, id: u.id },
				f = { ...u.args, paginationOpts: o },
				h = this.client.subscribe(u.canonicalizedUdfPath, f);
			return (u.pageKeys.push(s), u.pageKeyToQuery.set(s, { ...h, cursor: t }), h);
		}
		removePaginatedQuerySubscriber(e) {
			const t = this.paginatedQuerySet.get(e);
			if (t && ((t.numSubscribers -= 1), !(t.numSubscribers > 0))) {
				for (const i of t.pageKeyToQuery.values()) i.unsubscribe();
				this.paginatedQuerySet.delete(e);
			}
		}
		completePaginatedQuerySplit(e, t, i, u) {
			const s = e.pageKeyToQuery.get(t);
			e.pageKeyToQuery.delete(t);
			const o = e.pageKeys.indexOf(t);
			(e.pageKeys.splice(o, 1, i, u), e.ongoingSplits.delete(t), s.unsubscribe());
		}
		activePageQueryTokens(e) {
			return e.pageKeys.map((t) => e.pageKeyToQuery.get(t).queryToken);
		}
		allQueryTokens(e) {
			return Array.from(e.pageKeyToQuery.values()).map((t) => t.queryToken);
		}
		queryTokenForLastPageOfPaginatedQuery(e) {
			const t = this.mustGetPaginatedQuery(e),
				i = t.pageKeys[t.pageKeys.length - 1];
			if (i === void 0) throw new Error(`No pages for paginated query ${e}`);
			return t.pageKeyToQuery.get(i).queryToken;
		}
		mustGetPaginatedQuery(e) {
			const t = this.paginatedQuerySet.get(e);
			if (!t) throw new Error("paginated query no longer exists for token " + e);
			return t;
		}
	},
	tT = Object.defineProperty,
	nT = (e, t, i) => (t in e ? tT(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	Uu = (e, t, i) => nT(e, typeof t != "symbol" ? t + "" : t, i),
	Mp,
	rT = class {
		constructor(e, t = {}) {
			(Uu(this, "listeners"),
				Uu(this, "_client"),
				Uu(this, "_paginatedClient"),
				Uu(this, "callNewListenersWithCurrentValuesTimer"),
				Uu(this, "_closed"),
				Uu(this, "_disabled"),
				t.skipConvexDeploymentUrlCheck !== !0 && mb(e));
			const { disabled: i, ...u } = t;
			((this._closed = !1),
				(this._disabled = !!i),
				Mp && !("webSocketConstructor" in u) && typeof WebSocket > "u" && (u.webSocketConstructor = Mp),
				typeof window > "u" && !("unsavedChangesWarning" in u) && (u.unsavedChangesWarning = !1),
				this.disabled ||
					((this._client = new XE(e, () => {}, u)),
					(this._paginatedClient = new eT(this._client, (s) => this._transition(s)))),
				(this.listeners = new Set()));
		}
		get closed() {
			return this._closed;
		}
		get client() {
			if (this._client) return this._client;
			throw new Error("ConvexClient is disabled");
		}
		get paginatedClient() {
			if (this._paginatedClient) return this._paginatedClient;
			throw new Error("ConvexClient is disabled");
		}
		get disabled() {
			return this._disabled;
		}
		onUpdate(e, t, i, u) {
			if (this.disabled) return this.createDisabledUnsubscribe();
			const { queryToken: s, unsubscribe: o } = this.client.subscribe(xi(e), t),
				f = {
					queryToken: s,
					callback: i,
					onError: u,
					unsubscribe: o,
					hasEverRun: !1,
					query: e,
					args: t,
					paginationOptions: void 0,
				};
			(this.listeners.add(f),
				this.queryResultReady(s) &&
					this.callNewListenersWithCurrentValuesTimer === void 0 &&
					(this.callNewListenersWithCurrentValuesTimer = setTimeout(
						() => this.callNewListenersWithCurrentValues(),
						0,
					)));
			const h = {
					unsubscribe: () => {
						this.closed || (this.listeners.delete(f), o());
					},
					getCurrentValue: () => this.client.localQueryResultByToken(s),
					getQueryLogs: () => this.client.localQueryLogs(s),
				},
				m = h.unsubscribe;
			return (Object.assign(m, h), m);
		}
		onPaginatedUpdate_experimental(e, t, i, u, s) {
			if (this.disabled) return this.createDisabledUnsubscribe();
			const o = { initialNumItems: i.initialNumItems, id: -1 },
				{ paginatedQueryToken: f, unsubscribe: h } = this.paginatedClient.subscribe(xi(e), t, o),
				m = {
					queryToken: f,
					callback: u,
					onError: s,
					unsubscribe: h,
					hasEverRun: !1,
					query: e,
					args: t,
					paginationOptions: o,
				};
			(this.listeners.add(m),
				this.paginatedClient.localQueryResultByToken(f) &&
					this.callNewListenersWithCurrentValuesTimer === void 0 &&
					(this.callNewListenersWithCurrentValuesTimer = setTimeout(
						() => this.callNewListenersWithCurrentValues(),
						0,
					)));
			const v = {
					unsubscribe: () => {
						this.closed || (this.listeners.delete(m), h());
					},
					getCurrentValue: () => this.paginatedClient.localQueryResult(xi(e), t, o),
					getQueryLogs: () => [],
				},
				g = v.unsubscribe;
			return (Object.assign(g, v), g);
		}
		callNewListenersWithCurrentValues() {
			((this.callNewListenersWithCurrentValuesTimer = void 0),
				this._transition({ queries: [], paginatedQueries: [] }, !0));
		}
		queryResultReady(e) {
			return this.client.hasLocalQueryResultByToken(e);
		}
		createDisabledUnsubscribe() {
			const e = () => {};
			return (Object.assign(e, { unsubscribe: e, getCurrentValue: () => {}, getQueryLogs: () => {} }), e);
		}
		async close() {
			if (!this.disabled)
				return (
					this.listeners.clear(),
					(this._closed = !0),
					this._paginatedClient && (this._paginatedClient = void 0),
					this.client.close()
				);
		}
		getAuth() {
			if (!this.disabled) return this.client.getCurrentAuthClaims();
		}
		setAuth(e, t) {
			this.disabled || this.client.setAuth(e, t ?? (() => {}));
		}
		setAdminAuth(e, t) {
			if (this.closed) throw new Error("ConvexClient has already been closed.");
			this.disabled || this.client.setAdminAuth(e, t);
		}
		_transition({ queries: e, paginatedQueries: t }, i = !1) {
			const u = [...e.map((s) => s.token), ...t.map((s) => s.token)];
			for (const s of this.listeners) {
				const { callback: o, queryToken: f, onError: h, hasEverRun: m } = s,
					v = uE(f),
					g = v ? !!this.paginatedClient.localQueryResultByToken(f) : this.client.hasLocalQueryResultByToken(f);
				if (u.includes(f) || (i && !m && g)) {
					s.hasEverRun = !0;
					let S;
					try {
						v ? (S = this.paginatedClient.localQueryResultByToken(f)) : (S = this.client.localQueryResultByToken(f));
					} catch (b) {
						if (!(b instanceof Error)) throw b;
						h ? h(b, "Second argument to onUpdate onError is reserved for later use") : Promise.reject(b);
						continue;
					}
					o(S, "Second argument to onUpdate callback is reserved for later use");
				}
			}
		}
		async mutation(e, t, i) {
			if (this.disabled) throw new Error("ConvexClient is disabled");
			return await this.client.mutation(xi(e), t, i);
		}
		async action(e, t) {
			if (this.disabled) throw new Error("ConvexClient is disabled");
			return await this.client.action(xi(e), t);
		}
		async query(e, t) {
			if (this.disabled) throw new Error("ConvexClient is disabled");
			const i = this.client.localQueryResult(xi(e), t);
			return i !== void 0
				? Promise.resolve(i)
				: new Promise((u, s) => {
						const { unsubscribe: o } = this.onUpdate(
							e,
							t,
							(f) => {
								(o(), u(f));
							},
							(f) => {
								(o(), s(f));
							},
						);
					});
		}
		connectionState() {
			if (this.disabled) throw new Error("ConvexClient is disabled");
			return this.client.connectionState();
		}
		subscribeToConnectionState(e) {
			return this.disabled ? () => {} : this.client.subscribeToConnectionState(e);
		}
	},
	Tb = yE,
	Np = 6e4,
	iT = 500,
	aT = 1e4,
	uT = 1e3,
	lT = 3e4,
	sT = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
	Op = 128,
	zp = 109,
	Dp = 100,
	oT = /^[\x21-\x7e]+$/,
	jp = 100,
	Ip = 16,
	Zo = 6,
	Lp = 100;
function qp(e) {
	if (typeof e != "object" || e === null) return null;
	const t = e;
	if ((t.mode !== "light" && t.mode !== "dark") || typeof t.tokens != "object" || t.tokens === null) return null;
	const i = {};
	for (const [u, s] of Object.entries(t.tokens)) {
		if (typeof s != "string") return null;
		i[u] = s;
	}
	return { mode: t.mode, tokens: i };
}
function Up(e) {
	const t = document.documentElement;
	for (const [i, u] of Object.entries(e.tokens)) t.style.setProperty(i, u);
	(t.classList.toggle("light", e.mode === "light"), t.classList.toggle("dark", e.mode === "dark"));
}
var hc = { reason: "denied", message: "This plugin no longer has access to its data" },
	Qa = { reason: "session_expired", message: "This plugin session expired" },
	Ri = { reason: "unavailable", message: "The plugin data connection is unavailable" };
function cT(e) {
	if (e === null) return null;
	if (!Array.isArray(e)) return;
	const t = [];
	for (const i of e) {
		if (typeof i != "object" || i === null) return;
		const u = i;
		if (typeof u.userId != "string" || u.userId === "" || (u.level !== "member" && u.level !== "manage")) return;
		t.push({ userId: u.userId, level: u.level });
	}
	return t;
}
function $p() {
	return { _nay: { name: "unavailable", message: "Failed to read who can access this" } };
}
function fT(e) {
	if (typeof e != "object" || e === null) return;
	const t = e;
	if (
		!(
			typeof t.runId != "string" ||
			typeof t.pluginStatus != "number" ||
			typeof t.output != "string" ||
			typeof t.outputTruncated != "boolean"
		)
	)
		return { runId: t.runId, pluginStatus: t.pluginStatus, output: t.output, outputTruncated: t.outputTruncated };
}
function dT(e) {
	if (typeof e != "object" || e === null) return !1;
	const t = e;
	if (
		typeof t.pluginName != "string" ||
		typeof t.userId != "string" ||
		typeof t.organizationId != "string" ||
		typeof t.workspaceId != "string"
	)
		return !1;
	if (t.kind === "page") return typeof t.pageId == "string" && typeof t.pageTitle == "string";
	if (t.kind === "file_view") {
		if (
			typeof t.fileViewId != "string" ||
			typeof t.fileViewTitle != "string" ||
			typeof t.file != "object" ||
			t.file === null
		)
			return !1;
		const i = t.file;
		return (
			typeof i.fileNodeId == "string" &&
			typeof i.name == "string" &&
			typeof i.path == "string" &&
			typeof i.contentType == "string"
		);
	}
	return !1;
}
function hT() {
	const e = window.location.hash.slice(1);
	if (!e) throw new Error("Missing host bridge fragment — this plugin frame must be embedded by the Bonobo host app");
	const t = new URLSearchParams(e),
		i = t.getAll("parentOrigin"),
		u = t.getAll("nonce");
	if (t.size !== 2 || i.length !== 1 || u.length !== 1) throw new Error("Invalid host bridge fragment");
	const s = i[0],
		o = u[0];
	let f;
	try {
		f = new URL(s);
	} catch {
		throw new Error("Invalid host bridge parent origin");
	}
	if ((f.protocol !== "http:" && f.protocol !== "https:") || f.origin !== s)
		throw new Error("Invalid host bridge parent origin");
	if (!sT.test(o)) throw new Error("Invalid host bridge nonce");
	return { parentOrigin: s, nonce: o };
}
function Po(e) {
	return e.collection.length === 0 || e.collection.length > Op
		? `Collection names must be 1 to ${Op} characters`
		: e.keyPrefix !== void 0 && (e.keyPrefix.length > zp || !oT.test(e.keyPrefix))
			? `Key prefixes must be 1 to ${zp} printable ASCII characters`
			: !Number.isInteger(e.limit) || e.limit < 1 || e.limit > Dp
				? `Watch limits must be integers from 1 to ${Dp}`
				: null;
}
function mT(e) {
	const t = {
			intervals: [],
			pending: null,
			queuedLoadOlder: !1,
			bottomOpen: !1,
			loadingOlder: !1,
			awaitingTail: null,
			forceAtCapacity: !1,
			flushScheduled: !1,
			lastPayloadJson: null,
			dead: !1,
		},
		i = () => {
			t.dead = !0;
			for (const C of t.intervals) C.stop();
			for (const C of t.pending?.replacements ?? []) C.stop();
			t.pending = null;
		},
		u = (C) => {
			t.dead || (i(), e.on_dead(C));
		},
		s = (C) => {
			if (t.dead || !e.acquire_server_slot()) return !1;
			let k = !1;
			const L = e.start_watch(
				e.queryArgs,
				{
					...(C.start === null ? {} : { keyStartExclusive: C.start }),
					...(C.end === null ? {} : { keyEndInclusive: C.end }),
				},
				(Q) => {
					k || q(C, Q);
				},
			);
			return L
				? ((C.stop = () => {
						k || ((k = !0), L.dispose(), e.release_server_slot());
					}),
					!0)
				: (e.release_server_slot(), !1);
		},
		o = (C) => {
			if (C.docs === null || C.docs.length === 0) return null;
			const k = C.previousFirstKey ?? C.docs[C.docs.length - 1].key;
			return k === C.start || k === C.end || new Set(C.docs.map((L) => L.key)).size < 2 ? null : k;
		},
		f = () => t.intervals.length + (t.pending?.replacements.length ?? 0),
		h = () => t.intervals.length + (t.pending ? t.pending.replacements.length - t.pending.removeCount : 0),
		m = (C) => (C.truncated ? (C.previousDocs ?? C.docs) : C.docs),
		v = (C) => {
			if (!t.pending) return;
			const k = C - t.pending.from;
			if (!(k < 0 || k >= t.pending.removeCount)) return t.pending.suppressedDocs[k];
		},
		g = () => {
			const C = t.intervals.flatMap((L, Q) => {
					const K = v(Q);
					return (K === void 0 ? L.docs : K) ?? [];
				}),
				k = t.intervals[t.intervals.length - 1];
			return {
				docs: C,
				hasMore: t.bottomOpen && !(k !== void 0 && k.end === null && k.docs !== null && !k.truncated),
				atCapacity: t.forceAtCapacity || t.intervals.length >= Zo || e.page_at_ceiling(),
				incomplete: t.intervals.some((L, Q) =>
					L.end === null ||
					!L.truncated ||
					L.docs === null ||
					(t.pending && Q >= t.pending.from && Q < t.pending.from + t.pending.removeCount)
						? !1
						: o(L) === null || h() + 1 > Zo || e.page_at_ceiling(2),
				),
			};
		},
		S = () => {
			t.flushScheduled ||
				t.dead ||
				((t.flushScheduled = !0),
				queueMicrotask(() => {
					if (((t.flushScheduled = !1), t.dead)) return;
					const C = g();
					t.forceAtCapacity = !1;
					const k = JSON.stringify(C);
					k !== t.lastPayloadJson && ((t.lastPayloadJson = k), e.post_update(C));
				}));
		},
		b = () => {
			t.dead || ((t.forceAtCapacity = !0), S());
		},
		p = (C) => {
			const k = C.docs,
				L = k[k.length - 1].key;
			(C.stop(), (C.end = L), (C.truncated = !1), (t.bottomOpen = !0), s(C) || u(Ri));
		},
		T = () => {
			if (t.dead || t.loadingOlder || t.pending || !g().hasMore) return;
			const C = t.intervals[t.intervals.length - 1];
			if (!C || C.end === null) return;
			if (f() + 1 > Zo || e.page_at_ceiling()) {
				b();
				return;
			}
			const k = {
				start: C.end,
				end: null,
				docs: null,
				truncated: !1,
				previousFirstKey: void 0,
				previousDocs: null,
				stop: () => {},
			};
			if (!s(k)) {
				b();
				return;
			}
			(t.intervals.push(k), (t.loadingOlder = !0), (t.awaitingTail = k));
		},
		A = () => {
			if (t.dead) return;
			const C = t.intervals[t.intervals.length - 1];
			if (!(C && C.end === null && C.docs !== null && C.truncated && (p(C), t.dead)) && !t.pending) {
				t.queuedLoadOlder && ((t.queuedLoadOlder = !1), T());
				for (const [k, L] of t.intervals.entries()) {
					if (L.end === null || !L.truncated || L.docs === null) continue;
					const Q = o(L);
					if (Q === null) continue;
					if (f() + 1 > Zo) break;
					const K = {
							start: L.start,
							end: Q,
							docs: null,
							truncated: !1,
							previousFirstKey: void 0,
							previousDocs: null,
							stop: () => {},
						},
						O = {
							start: Q,
							end: L.end,
							docs: null,
							truncated: !1,
							previousFirstKey: void 0,
							previousDocs: null,
							stop: () => {},
						};
					if (!s(K)) break;
					if (!s(O)) {
						K.stop();
						break;
					}
					t.pending = { from: k, removeCount: 1, replacements: [K, O], suppressedDocs: [m(L)] };
					return;
				}
				for (let k = 0; k + 1 < t.intervals.length; k += 1) {
					const L = t.intervals[k],
						Q = t.intervals[k + 1];
					if (L.docs === null || Q.docs === null || L.docs.length + Q.docs.length >= e.queryArgs.limit) continue;
					const K = {
						start: L.start,
						end: Q.end,
						docs: null,
						truncated: !1,
						previousFirstKey: void 0,
						previousDocs: null,
						stop: () => {},
					};
					if (!s(K)) break;
					t.pending = { from: k, removeCount: 2, replacements: [K], suppressedDocs: [m(L), m(Q)] };
					return;
				}
			}
		},
		N = () => {
			const C = t.pending;
			t.pending = null;
			const k = t.intervals.splice(C.from, C.removeCount, ...C.replacements);
			for (const L of k) L.stop();
			(S(), A());
		},
		q = (C, k) => {
			if (!t.dead) {
				if ("queryError" in k) {
					const L = e.session_expired() ? Qa : Ri;
					(L === Ri && console.error("[bonobo-plugin-sdk] Plugin data window interval failed:", k.queryError), u(L));
					return;
				}
				if (k.value === null) {
					u(hc);
					return;
				}
				if (
					((C.previousFirstKey = C.docs?.[0]?.key),
					(C.previousDocs = C.docs),
					(C.docs = k.value.docs),
					(C.truncated = k.value.truncated),
					t.awaitingTail === C && ((t.awaitingTail = null), (t.loadingOlder = !1)),
					t.pending?.replacements.includes(C))
				) {
					t.pending.replacements.every((L) => L.docs !== null) && N();
					return;
				}
				(S(), A());
			}
		},
		I = {
			start: null,
			end: null,
			docs: null,
			truncated: !1,
			previousFirstKey: void 0,
			previousDocs: null,
			stop: () => {},
		};
	return s(I)
		? (t.intervals.push(I),
			{
				load_older: () => {
					if (!t.dead) {
						if (t.pending) {
							t.queuedLoadOlder = !0;
							return;
						}
						T();
					}
				},
				dispose: () => {
					t.dead || i();
				},
			})
		: null;
}
function vT(e) {
	const t = new Set();
	let i = 0;
	const u = () => (i >= Lp ? !1 : ((i += 1), !0)),
		s = () => {
			i -= 1;
		},
		o = (p = 1) => i + p > Lp,
		f = (p, T) => {
			setTimeout(() => {
				T ? p(null, T) : p(null);
			}, 0);
		},
		h = (p) => {
			(console.warn("[bonobo-plugin-sdk] Data watch refused, subscription cap reached"),
				f(p, { reason: "capacity", message: "Subscription limit reached for this plugin frame" }));
		},
		m = (p) => {
			if (t.size >= Ip || o()) return (h(p.onUpdate), () => {});
			if (!u()) return (h(p.onUpdate), () => {});
			const T = {};
			t.add(T);
			let A = null;
			const N = () => {
				t.delete(T) && (A?.dispose(), s());
			};
			return (
				(A = p.start((q) => {
					if (t.has(T)) {
						if ("queryError" in q) {
							const I = e.session_expired() ? Qa : Ri;
							(I === Ri && console.error(`[bonobo-plugin-sdk] Plugin ${p.failureLabel} failed:`, q.queryError),
								N(),
								p.onUpdate(null, I));
							return;
						}
						if (q.value === null) {
							(N(), p.onUpdate(null, hc));
							return;
						}
						p.onUpdate(p.deliver(q.value));
					}
				})),
				A
					? function () {
							N();
						}
					: (N(),
						console.error(`[bonobo-plugin-sdk] Plugin ${p.failureLabel} could not start`),
						f(p.onUpdate),
						() => {})
			);
		},
		v = {
			watch(p, T) {
				const A = Po({
					collection: p.collection,
					...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
					limit: p.limit,
				});
				return A
					? (f(T, { reason: "invalid", message: A }), () => {})
					: m({
							start: (N) =>
								e.start_watch(
									{
										collection: p.collection,
										...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
										limit: p.limit,
									},
									null,
									N,
								),
							onUpdate: T,
							deliver: (N) => ({ docs: N.docs, truncated: N.truncated }),
							failureLabel: "data watch",
						});
			},
			watchRecent(p, T) {
				const A = Po({ collection: p.collection, limit: p.limit });
				return A
					? (f(T, { reason: "invalid", message: A }), () => {})
					: m({
							start: (N) =>
								e.start_recent_watch(
									{
										collection: p.collection,
										limit: p.limit,
										...(p.order === void 0 ? {} : { order: p.order }),
										...(p.since === void 0 ? {} : { since: p.since }),
										...(p.before === void 0 ? {} : { before: p.before }),
										...(p.scopeId === void 0 ? {} : { scopeId: p.scopeId }),
									},
									N,
								),
							onUpdate: T,
							deliver: (N) => ({ docs: N.docs, truncated: N.truncated }),
							failureLabel: "recent watch",
						});
			},
			watchChanges(p, T) {
				const A = Po({ collection: p.collection, limit: p.limit });
				return A
					? (f(T, { reason: "invalid", message: A }), () => {})
					: m({
							start: (N) =>
								e.start_changes_watch(
									{
										collection: p.collection,
										limit: p.limit,
										...(p.updatedSince === void 0 ? {} : { updatedSince: p.updatedSince }),
										...(p.scopeId === void 0 ? {} : { scopeId: p.scopeId }),
									},
									N,
								),
							onUpdate: T,
							deliver: (N) => ({ docs: N.docs, truncated: N.truncated }),
							failureLabel: "changes watch",
						});
			},
			watchWindow(p, T) {
				const A = { loadOlder() {}, unsubscribe() {} },
					N = Po({
						collection: p.collection,
						...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
						limit: p.pageSize,
					});
				if (N) return (f(T, { reason: "invalid", message: N }), A);
				if (t.size >= Ip || o()) return (h(T), A);
				const q = {};
				t.add(q);
				const I = mT({
					queryArgs: {
						collection: p.collection,
						...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
						limit: p.pageSize,
					},
					start_watch: e.start_watch,
					acquire_server_slot: u,
					release_server_slot: s,
					page_at_ceiling: o,
					post_update: (C) => T(C),
					on_dead: (C) => {
						(t.delete(q), T(null, C));
					},
					session_expired: e.session_expired,
				});
				return I
					? {
							loadOlder() {
								t.has(q) && I.load_older();
							},
							unsubscribe() {
								t.delete(q) && I.dispose();
							},
						}
					: (t.delete(q), console.error("[bonobo-plugin-sdk] Plugin data window could not start"), f(T), A);
			},
			append(p) {
				return g("append", {
					collection: p.collection,
					...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
					value: p.value,
					clientRequestId: p.clientRequestId,
				});
			},
			put(p) {
				return g("put", {
					collection: p.collection,
					key: p.key,
					value: p.value,
					...(p.expectedRevision === void 0 ? {} : { expectedRevision: p.expectedRevision }),
				});
			},
			remove(p) {
				return g("remove", {
					collection: p.collection,
					key: p.key,
					...(p.expectedRevision === void 0 ? {} : { expectedRevision: p.expectedRevision }),
				});
			},
			putOwned(p) {
				return g("putOwned", {
					collection: p.collection,
					key: p.key,
					value: p.value,
					...(p.expectedRevision === void 0 ? {} : { expectedRevision: p.expectedRevision }),
				});
			},
			removeOwned(p) {
				return g("removeOwned", {
					collection: p.collection,
					key: p.key,
					...(p.expectedRevision === void 0 ? {} : { expectedRevision: p.expectedRevision }),
				});
			},
		};
	function g(p, T) {
		return Promise.resolve()
			.then(() => e.run_user_write(p, T))
			.catch(
				(A) => (
					console.error("[bonobo-plugin-sdk] Plugin data write failed:", A),
					{ _nay: { name: "unavailable", message: "Failed to write plugin data" } }
				),
			);
	}
	const S = {
		resolve(p) {
			return Promise.resolve()
				.then(() => e.resolve_member_display(p))
				.then((T) => (T === null ? {} : T.members))
				.catch((T) => (console.error("[bonobo-plugin-sdk] Failed to resolve plugin member names:", T), {}));
		},
		list(p) {
			return !Number.isInteger(p.limit) || p.limit < 1 || p.limit > jp
				? Promise.resolve({ _nay: { name: "invalid", message: `Member list limits must be integers from 1 to ${jp}` } })
				: Promise.resolve()
						.then(() => e.list_members(p.limit, p.cursor ?? null))
						.then((T) =>
							T === null
								? { _nay: { name: hc.reason, message: "This plugin no longer has access to this workspace" } }
								: "refusal" in T
									? {
											_nay: {
												name: "not_consented",
												message: "This workspace has not granted this plugin the member list",
											},
										}
									: { _yay: { members: T.members, cursor: T.cursor } },
						)
						.catch((T) => {
							const A = e.session_expired() ? Qa : Ri;
							return (
								A === Ri && console.error("[bonobo-plugin-sdk] Failed to list plugin workspace members:", T),
								{ _nay: { name: A.reason, message: A.message } }
							);
						});
		},
	};
	function b(p) {
		return Promise.resolve()
			.then(() => e.run_manage_scope(p))
			.then((T) => T)
			.catch(
				(T) => (
					console.error("[bonobo-plugin-sdk] Plugin scope change failed:", T),
					{ _nay: { name: "unavailable", message: "Failed to change who can read this" } }
				),
			);
	}
	return {
		data: v,
		members: S,
		scopes: {
			create(p) {
				return b({ kind: "create", scopeId: p.scopeId, collections: p.collections, keyPrefix: p.keyPrefix });
			},
			createWithDocument(p) {
				return b({
					kind: "create_with_document",
					scopeId: p.scopeId,
					collections: p.collections,
					keyPrefix: p.keyPrefix,
					principals: p.principals.map((T) => ({ userId: T.userId, level: T.level })),
					document: p.document,
				});
			},
			setPrincipal(p) {
				return b({ kind: "set_principal", scopeId: p.scopeId, userId: p.userId, level: p.level });
			},
			removePrincipal(p) {
				return b({
					kind: "remove_principal",
					scopeId: p.scopeId,
					userId: p.userId,
					...(p.expectedPrincipalCount === void 0 ? {} : { expectedPrincipalCount: p.expectedPrincipalCount }),
				});
			},
			delete(p) {
				return b({
					kind: "delete",
					scopeId: p.scopeId,
					...(p.expectedPrincipalCount === void 0 ? {} : { expectedPrincipalCount: p.expectedPrincipalCount }),
				});
			},
			listPrincipals(p) {
				return Promise.resolve()
					.then(() => e.list_scope_principals(p.scopeId))
					.then((T) => {
						const A = cT(T);
						return A === void 0
							? (console.error("[bonobo-plugin-sdk] Plugin scope principals response was invalid"), $p())
							: { _yay: A };
					})
					.catch((T) => (console.error("[bonobo-plugin-sdk] Failed to read plugin scope principals:", T), $p()));
			},
			watchMine(p) {
				return m({
					start: (T) => e.start_my_scopes_watch(T),
					onUpdate: p,
					deliver: (T) => T,
					failureLabel: "scope watch",
				});
			},
		},
	};
}
function gT(e) {
	const t = Tb.plugins_data,
		i = {
			append: t.user_append_document,
			put: t.user_put_document,
			remove: t.user_remove_document,
			putOwned: t.user_put_owned_document,
			removeOwned: t.user_remove_owned_document,
		};
	return {
		start_watch: (s, o, f) => {
			try {
				const h = e.onUpdate(
					t.watch_documents,
					{
						...s,
						...(o?.keyStartExclusive === void 0 ? {} : { keyStartExclusive: o.keyStartExclusive }),
						...(o?.keyEndInclusive === void 0 ? {} : { keyEndInclusive: o.keyEndInclusive }),
					},
					(m) => f({ value: m }),
					(m) => f({ queryError: m }),
				);
				return { dispose: () => void h() };
			} catch {
				return null;
			}
		},
		start_recent_watch: (s, o) => {
			try {
				const f = e.onUpdate(
					t.watch_recent,
					s,
					(h) => o({ value: h }),
					(h) => o({ queryError: h }),
				);
				return { dispose: () => void f() };
			} catch {
				return null;
			}
		},
		start_changes_watch: (s, o) => {
			try {
				const f = e.onUpdate(
					t.watch_changes,
					s,
					(h) => o({ value: h }),
					(h) => o({ queryError: h }),
				);
				return { dispose: () => void f() };
			} catch {
				return null;
			}
		},
		run_user_write: (s, o) => e.mutation(i[s], o),
		resolve_member_display: (s) => e.query(t.resolve_member_display, { userIds: s.map(yT) }),
		list_members: (s, o) => e.query(t.list_members, { limit: s, cursor: o }),
		run_manage_scope: (s) => e.mutation(t.user_manage_scope, { action: s }),
		list_scope_principals: (s) => e.query(t.watch_scope_principals, { scopeId: s }),
		start_my_scopes_watch: (s) => {
			try {
				const o = e.onUpdate(
					t.watch_my_scopes,
					{},
					(f) => s({ value: f }),
					(f) => s({ queryError: f }),
				);
				return { dispose: () => void o() };
			} catch {
				return null;
			}
		},
	};
}
function yT(e) {
	return e;
}
async function pT() {
	const { parentOrigin: e, nonce: t } = hT();
	let i = "",
		u = "",
		s = 0,
		o = "",
		f = 0,
		h = null;
	const m = new Set(),
		v = new Map();
	let g = null;
	async function S() {
		return Date.now() >= s - Np ? b() : u;
	}
	function b() {
		if (g) return g;
		const C = crypto.randomUUID();
		return (
			(g = new Promise((k, L) => {
				const Q = setTimeout(() => {
					(v.delete(C), L(new Error("Plugin frame token refresh timed out")));
				}, aT);
				v.set(C, { resolve: k, reject: L, timeout: Q });
				try {
					window.parent.postMessage({ type: "bonobo:token-refresh-request", nonce: t, requestId: C }, e);
				} catch (K) {
					(clearTimeout(Q), v.delete(C), L(K));
				}
			}).finally(() => {
				g = null;
			})),
			g
		);
	}
	const p = () => o !== "" && Date.now() < f - Np,
		T = (C) => {
			typeof C.jwt == "string" && typeof C.jwtExpiresAt == "number" && Number.isFinite(C.jwtExpiresAt)
				? ((o = C.jwt), (f = C.jwtExpiresAt))
				: ((o = ""), (f = 0));
		};
	async function A(C, k) {
		const L = k?.body !== void 0,
			Q = ($) => {
				const V = new Headers(k?.headers);
				return (
					V.set("Authorization", `Bearer ${$}`),
					L && V.set("Content-Type", "application/json"),
					fetch(i + C, {
						method: k?.method ?? (L ? "POST" : "GET"),
						headers: V,
						body: L ? JSON.stringify(k.body) : void 0,
					})
				);
			},
			K = await S();
		let O = await Q(K);
		if ((O.status === 401 && (O = await Q(u !== K ? u : await b())), !O.ok)) {
			const $ = await O.text();
			throw Object.assign(new Error(`${C} responded ${O.status}: ${$}`), { status: O.status, responseText: $ });
		}
		return O.json();
	}
	const N = {
			invoke(C) {
				return A("/api/v1/plugin-backend/invoke", {
					body: {
						endpoint: C.endpoint,
						...(C.input === void 0 ? {} : { input: C.input }),
						...(C.serializationKey === void 0 ? {} : { serializationKey: C.serializationKey }),
					},
				})
					.then((k) => {
						const L = fT(k);
						return L === void 0
							? (console.error("[bonobo-plugin-sdk] Plugin backend invoke response was invalid"),
								{ _nay: { name: Ri.reason, message: "Failed to run the plugin backend" } })
							: { _yay: L };
					})
					.catch((k) => {
						const L = typeof k == "object" && k !== null ? k : null,
							Q = typeof L?.status == "number" ? L.status : null;
						let K = null;
						if (typeof L?.responseText == "string")
							try {
								const $ = JSON.parse(L.responseText);
								K = typeof $ == "object" && $ !== null ? $ : null;
							} catch {
								K = null;
							}
						const O = typeof K?.message == "string" ? K.message : null;
						return Q === 409 || Q === 429
							? {
									_nay: {
										name: "busy",
										message: O ?? "The plugin backend is busy",
										...(typeof K?.retryAfterMs == "number" ? { retryAfterMs: K.retryAfterMs } : {}),
									},
								}
							: Q === 401 || Q === 403
								? Date.now() >= s
									? { _nay: { name: Qa.reason, message: Qa.message } }
									: { _nay: { name: hc.reason, message: O ?? "This plugin may not run its backend here" } }
								: Q !== null && Q < 500 && O !== null
									? { _nay: { name: "invalid", message: O } }
									: Date.now() >= s
										? { _nay: { name: Qa.reason, message: Qa.message } }
										: (console.error("[bonobo-plugin-sdk] Plugin backend invoke failed:", k),
											{ _nay: { name: Ri.reason, message: "Failed to run the plugin backend" } });
					});
			},
		},
		q = (C) =>
			fetch(i + "/plugins-ui/session-jwt", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token: C }),
			});
	async function I(C) {
		const k = C?.forceRefreshToken === !0;
		for (let L = 0; ; L += 1) {
			if (p() && !k) return o;
			let Q = null;
			try {
				if (o !== "" && (await b(), p())) return o;
				((Q = await q(await S())), Q.status === 401 && (Q = await q(await b())));
			} catch {
				Q = null;
			}
			if (Q?.ok) {
				const K = await Q.json().catch(() => null),
					O = K?._yay?.jwt,
					$ = K?._yay?.sessionExpiresAt;
				return typeof O != "string" || typeof $ != "number" ? null : ((s = $), (o = O), (f = $), O);
			}
			if (!(Q === null || Q.status === 429 || Q.status >= 500) || L >= 2) return null;
			await new Promise((K) => setTimeout(K, 1e3 * (L + 1)));
		}
	}
	return new Promise((C) => {
		let k = !1,
			L;
		const Q = () => {
				window.parent.postMessage({ type: "bonobo:ready", nonce: t }, e);
			},
			K = () => {
				clearInterval(L);
			},
			O = ($) => {
				if ($.source !== window.parent || $.origin !== e) return;
				const V = $.data;
				if (!(typeof V != "object" || V === null)) {
					if (
						V.type === "bonobo:init" &&
						!k &&
						V.nonce === t &&
						typeof V.apiOrigin == "string" &&
						typeof V.convexUrl == "string" &&
						typeof V.token == "string" &&
						typeof V.tokenExpiresAt == "number" &&
						Number.isFinite(V.tokenExpiresAt) &&
						dT(V.context)
					) {
						((k = !0),
							K(),
							window.removeEventListener("pagehide", K),
							(i = V.apiOrigin),
							(u = V.token),
							(s = V.tokenExpiresAt),
							T(V));
						const Y = new rT(V.convexUrl, { expectAuth: !0, unsavedChangesWarning: !1, initialAuthTokenReuse: !0 });
						let ae = Date.now();
						const se = setInterval(() => {
							const B = Date.now();
							(B - ae >= lT && Y.setAuth(I), (ae = B));
						}, uT);
						(Y.setAuth(I),
							window.addEventListener(
								"pagehide",
								() => {
									(clearInterval(se), Y.close());
								},
								{ once: !0 },
							),
							(h = qp(V.theme)),
							h && Up(h));
						const { data: te, members: fe, scopes: j } = vT({ ...gT(Y), session_expired: () => Date.now() >= s });
						C({
							context: V.context,
							apiOrigin: i,
							getToken: S,
							refreshToken: b,
							fetchJson: A,
							backend: N,
							data: te,
							members: fe,
							scopes: j,
							convex: Y,
							api: Tb,
							theme: {
								current: () => h,
								subscribe(B) {
									return (
										m.add(B),
										() => {
											m.delete(B);
										}
									);
								},
							},
						});
					} else if (
						k &&
						V.nonce === t &&
						V.type === "bonobo:token" &&
						typeof V.requestId == "string" &&
						typeof V.token == "string" &&
						typeof V.tokenExpiresAt == "number" &&
						Number.isFinite(V.tokenExpiresAt)
					) {
						const Y = v.get(V.requestId);
						Y &&
							(v.delete(V.requestId),
							clearTimeout(Y.timeout),
							(u = V.token),
							(s = V.tokenExpiresAt),
							T(V),
							Y.resolve(V.token));
					} else if (k && V.nonce === t && V.type === "bonobo:theme") {
						const Y = qp(V.theme);
						if (Y) {
							((h = Y), Up(Y));
							for (const ae of m) ae(Y);
						}
					} else if (
						k &&
						V.nonce === t &&
						V.type === "bonobo:token-error" &&
						typeof V.requestId == "string" &&
						typeof V.message == "string"
					) {
						const Y = v.get(V.requestId);
						Y && (v.delete(V.requestId), clearTimeout(Y.timeout), Y.reject(new Error(V.message)));
					}
				}
			};
		(window.addEventListener("message", O),
			window.addEventListener("pagehide", K, { once: !0 }),
			Q(),
			(L = setInterval(Q, iT)));
	});
}
var bT = Ir((e) => {
		function t(j, B) {
			var P = j.length;
			j.push(B);
			e: for (; 0 < P; ) {
				var ge = (P - 1) >>> 1,
					be = j[ge];
				if (0 < s(be, B)) ((j[ge] = B), (j[P] = be), (P = ge));
				else break e;
			}
		}
		function i(j) {
			return j.length === 0 ? null : j[0];
		}
		function u(j) {
			if (j.length === 0) return null;
			var B = j[0],
				P = j.pop();
			if (P !== B) {
				j[0] = P;
				e: for (var ge = 0, be = j.length, Pe = be >>> 1; ge < Pe; ) {
					var M = 2 * (ge + 1) - 1,
						D = j[M],
						le = M + 1,
						oe = j[le];
					if (0 > s(D, P))
						le < be && 0 > s(oe, D) ? ((j[ge] = oe), (j[le] = P), (ge = le)) : ((j[ge] = D), (j[M] = P), (ge = M));
					else if (le < be && 0 > s(oe, P)) ((j[ge] = oe), (j[le] = P), (ge = le));
					else break e;
				}
			}
			return B;
		}
		function s(j, B) {
			var P = j.sortIndex - B.sortIndex;
			return P !== 0 ? P : j.id - B.id;
		}
		if (((e.unstable_now = void 0), typeof performance == "object" && typeof performance.now == "function")) {
			var o = performance;
			e.unstable_now = function () {
				return o.now();
			};
		} else {
			var f = Date,
				h = f.now();
			e.unstable_now = function () {
				return f.now() - h;
			};
		}
		var m = [],
			v = [],
			g = 1,
			S = null,
			b = 3,
			p = !1,
			T = !1,
			A = !1,
			N = !1,
			q = typeof setTimeout == "function" ? setTimeout : null,
			I = typeof clearTimeout == "function" ? clearTimeout : null,
			C = typeof setImmediate < "u" ? setImmediate : null;
		function k(j) {
			for (var B = i(v); B !== null; ) {
				if (B.callback === null) u(v);
				else if (B.startTime <= j) (u(v), (B.sortIndex = B.expirationTime), t(m, B));
				else break;
				B = i(v);
			}
		}
		function L(j) {
			if (((A = !1), k(j), !T))
				if (i(m) !== null) ((T = !0), Q || ((Q = !0), ae()));
				else {
					var B = i(v);
					B !== null && fe(L, B.startTime - j);
				}
		}
		var Q = !1,
			K = -1,
			O = 5,
			$ = -1;
		function V() {
			return N ? !0 : !(e.unstable_now() - $ < O);
		}
		function Y() {
			if (((N = !1), Q)) {
				var j = e.unstable_now();
				$ = j;
				var B = !0;
				try {
					e: {
						((T = !1), A && ((A = !1), I(K), (K = -1)), (p = !0));
						var P = b;
						try {
							t: {
								for (k(j), S = i(m); S !== null && !(S.expirationTime > j && V()); ) {
									var ge = S.callback;
									if (typeof ge == "function") {
										((S.callback = null), (b = S.priorityLevel));
										var be = ge(S.expirationTime <= j);
										if (((j = e.unstable_now()), typeof be == "function")) {
											((S.callback = be), k(j), (B = !0));
											break t;
										}
										(S === i(m) && u(m), k(j));
									} else u(m);
									S = i(m);
								}
								if (S !== null) B = !0;
								else {
									var Pe = i(v);
									(Pe !== null && fe(L, Pe.startTime - j), (B = !1));
								}
							}
							break e;
						} finally {
							((S = null), (b = P), (p = !1));
						}
						B = void 0;
					}
				} finally {
					B ? ae() : (Q = !1);
				}
			}
		}
		var ae;
		if (typeof C == "function")
			ae = function () {
				C(Y);
			};
		else if (typeof MessageChannel < "u") {
			var se = new MessageChannel(),
				te = se.port2;
			((se.port1.onmessage = Y),
				(ae = function () {
					te.postMessage(null);
				}));
		} else
			ae = function () {
				q(Y, 0);
			};
		function fe(j, B) {
			K = q(function () {
				j(e.unstable_now());
			}, B);
		}
		((e.unstable_IdlePriority = 5),
			(e.unstable_ImmediatePriority = 1),
			(e.unstable_LowPriority = 4),
			(e.unstable_NormalPriority = 3),
			(e.unstable_Profiling = null),
			(e.unstable_UserBlockingPriority = 2),
			(e.unstable_cancelCallback = function (j) {
				j.callback = null;
			}),
			(e.unstable_forceFrameRate = function (j) {
				0 > j || 125 < j
					? console.error(
							"forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
						)
					: (O = 0 < j ? Math.floor(1e3 / j) : 5);
			}),
			(e.unstable_getCurrentPriorityLevel = function () {
				return b;
			}),
			(e.unstable_next = function (j) {
				switch (b) {
					case 1:
					case 2:
					case 3:
						var B = 3;
						break;
					default:
						B = b;
				}
				var P = b;
				b = B;
				try {
					return j();
				} finally {
					b = P;
				}
			}),
			(e.unstable_requestPaint = function () {
				N = !0;
			}),
			(e.unstable_runWithPriority = function (j, B) {
				switch (j) {
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						break;
					default:
						j = 3;
				}
				var P = b;
				b = j;
				try {
					return B();
				} finally {
					b = P;
				}
			}),
			(e.unstable_scheduleCallback = function (j, B, P) {
				var ge = e.unstable_now();
				switch (
					(typeof P == "object" && P !== null
						? ((P = P.delay), (P = typeof P == "number" && 0 < P ? ge + P : ge))
						: (P = ge),
					j)
				) {
					case 1:
						var be = -1;
						break;
					case 2:
						be = 250;
						break;
					case 5:
						be = 1073741823;
						break;
					case 4:
						be = 1e4;
						break;
					default:
						be = 5e3;
				}
				return (
					(be = P + be),
					(j = { id: g++, callback: B, priorityLevel: j, startTime: P, expirationTime: be, sortIndex: -1 }),
					P > ge
						? ((j.sortIndex = P),
							t(v, j),
							i(m) === null && j === i(v) && (A ? (I(K), (K = -1)) : (A = !0), fe(L, P - ge)))
						: ((j.sortIndex = be), t(m, j), T || p || ((T = !0), Q || ((Q = !0), ae()))),
					j
				);
			}),
			(e.unstable_shouldYield = V),
			(e.unstable_wrapCallback = function (j) {
				var B = b;
				return function () {
					var P = b;
					b = B;
					try {
						return j.apply(this, arguments);
					} finally {
						b = P;
					}
				};
			}));
	}),
	_T = Ir((e, t) => {
		t.exports = bT();
	}),
	ST = Ir((e) => {
		var t = Symbol.for("react.transitional.element"),
			i = Symbol.for("react.portal"),
			u = Symbol.for("react.fragment"),
			s = Symbol.for("react.strict_mode"),
			o = Symbol.for("react.profiler"),
			f = Symbol.for("react.consumer"),
			h = Symbol.for("react.context"),
			m = Symbol.for("react.forward_ref"),
			v = Symbol.for("react.suspense"),
			g = Symbol.for("react.memo"),
			S = Symbol.for("react.lazy"),
			b = Symbol.for("react.activity"),
			p = Symbol.iterator;
		function T(M) {
			return M === null || typeof M != "object"
				? null
				: ((M = (p && M[p]) || M["@@iterator"]), typeof M == "function" ? M : null);
		}
		var A = {
				isMounted: function () {
					return !1;
				},
				enqueueForceUpdate: function () {},
				enqueueReplaceState: function () {},
				enqueueSetState: function () {},
			},
			N = Object.assign,
			q = {};
		function I(M, D, le) {
			((this.props = M), (this.context = D), (this.refs = q), (this.updater = le || A));
		}
		((I.prototype.isReactComponent = {}),
			(I.prototype.setState = function (M, D) {
				if (typeof M != "object" && typeof M != "function" && M != null)
					throw Error(
						"takes an object of state variables to update or a function which returns an object of state variables.",
					);
				this.updater.enqueueSetState(this, M, D, "setState");
			}),
			(I.prototype.forceUpdate = function (M) {
				this.updater.enqueueForceUpdate(this, M, "forceUpdate");
			}));
		function C() {}
		C.prototype = I.prototype;
		function k(M, D, le) {
			((this.props = M), (this.context = D), (this.refs = q), (this.updater = le || A));
		}
		var L = (k.prototype = new C());
		((L.constructor = k), N(L, I.prototype), (L.isPureReactComponent = !0));
		var Q = Array.isArray;
		function K() {}
		var O = { H: null, A: null, T: null, S: null },
			$ = Object.prototype.hasOwnProperty;
		function V(M, D, le) {
			var oe = le.ref;
			return { $$typeof: t, type: M, key: D, ref: oe !== void 0 ? oe : null, props: le };
		}
		function Y(M, D) {
			return V(M.type, D, M.props);
		}
		function ae(M) {
			return typeof M == "object" && M !== null && M.$$typeof === t;
		}
		function se(M) {
			var D = { "=": "=0", ":": "=2" };
			return (
				"$" +
				M.replace(/[=:]/g, function (le) {
					return D[le];
				})
			);
		}
		var te = /\/+/g;
		function fe(M, D) {
			return typeof M == "object" && M !== null && M.key != null ? se("" + M.key) : D.toString(36);
		}
		function j(M) {
			switch (M.status) {
				case "fulfilled":
					return M.value;
				case "rejected":
					throw M.reason;
				default:
					switch (
						(typeof M.status == "string"
							? M.then(K, K)
							: ((M.status = "pending"),
								M.then(
									function (D) {
										M.status === "pending" && ((M.status = "fulfilled"), (M.value = D));
									},
									function (D) {
										M.status === "pending" && ((M.status = "rejected"), (M.reason = D));
									},
								)),
						M.status)
					) {
						case "fulfilled":
							return M.value;
						case "rejected":
							throw M.reason;
					}
			}
			throw M;
		}
		function B(M, D, le, oe, me) {
			var Se = typeof M;
			(Se === "undefined" || Se === "boolean") && (M = null);
			var Re = !1;
			if (M === null) Re = !0;
			else
				switch (Se) {
					case "bigint":
					case "string":
					case "number":
						Re = !0;
						break;
					case "object":
						switch (M.$$typeof) {
							case t:
							case i:
								Re = !0;
								break;
							case S:
								return ((Re = M._init), B(Re(M._payload), D, le, oe, me));
						}
				}
			if (Re)
				return (
					(me = me(M)),
					(Re = oe === "" ? "." + fe(M, 0) : oe),
					Q(me)
						? ((le = ""),
							Re != null && (le = Re.replace(te, "$&/") + "/"),
							B(me, D, le, "", function (pt) {
								return pt;
							}))
						: me != null &&
							(ae(me) &&
								(me = Y(
									me,
									le + (me.key == null || (M && M.key === me.key) ? "" : ("" + me.key).replace(te, "$&/") + "/") + Re,
								)),
							D.push(me)),
					1
				);
			Re = 0;
			var Le = oe === "" ? "." : oe + ":";
			if (Q(M))
				for (var Xe = 0; Xe < M.length; Xe++) ((oe = M[Xe]), (Se = Le + fe(oe, Xe)), (Re += B(oe, D, le, Se, me)));
			else if (((Xe = T(M)), typeof Xe == "function"))
				for (M = Xe.call(M), Xe = 0; !(oe = M.next()).done; )
					((oe = oe.value), (Se = Le + fe(oe, Xe++)), (Re += B(oe, D, le, Se, me)));
			else if (Se === "object") {
				if (typeof M.then == "function") return B(j(M), D, le, oe, me);
				throw (
					(D = String(M)),
					Error(
						"Objects are not valid as a React child (found: " +
							(D === "[object Object]" ? "object with keys {" + Object.keys(M).join(", ") + "}" : D) +
							"). If you meant to render a collection of children, use an array instead.",
					)
				);
			}
			return Re;
		}
		function P(M, D, le) {
			if (M == null) return M;
			var oe = [],
				me = 0;
			return (
				B(M, oe, "", "", function (Se) {
					return D.call(le, Se, me++);
				}),
				oe
			);
		}
		function ge(M) {
			if (M._status === -1) {
				var D = M._result;
				((D = D()),
					D.then(
						function (le) {
							(M._status === 0 || M._status === -1) && ((M._status = 1), (M._result = le));
						},
						function (le) {
							(M._status === 0 || M._status === -1) && ((M._status = 2), (M._result = le));
						},
					),
					M._status === -1 && ((M._status = 0), (M._result = D)));
			}
			if (M._status === 1) return M._result.default;
			throw M._result;
		}
		var be =
				typeof reportError == "function"
					? reportError
					: function (M) {
							if (typeof window == "object" && typeof window.ErrorEvent == "function") {
								var D = new window.ErrorEvent("error", {
									bubbles: !0,
									cancelable: !0,
									message:
										typeof M == "object" && M !== null && typeof M.message == "string" ? String(M.message) : String(M),
									error: M,
								});
								if (!window.dispatchEvent(D)) return;
							} else if (typeof process == "object" && typeof process.emit == "function") {
								process.emit("uncaughtException", M);
								return;
							}
							console.error(M);
						},
			Pe = {
				map: P,
				forEach: function (M, D, le) {
					P(
						M,
						function () {
							D.apply(this, arguments);
						},
						le,
					);
				},
				count: function (M) {
					var D = 0;
					return (
						P(M, function () {
							D++;
						}),
						D
					);
				},
				toArray: function (M) {
					return (
						P(M, function (D) {
							return D;
						}) || []
					);
				},
				only: function (M) {
					if (!ae(M)) throw Error("React.Children.only expected to receive a single React element child.");
					return M;
				},
			};
		((e.Activity = b),
			(e.Children = Pe),
			(e.Component = I),
			(e.Fragment = u),
			(e.Profiler = o),
			(e.PureComponent = k),
			(e.StrictMode = s),
			(e.Suspense = v),
			(e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = O),
			(e.__COMPILER_RUNTIME = {
				__proto__: null,
				c: function (M) {
					return O.H.useMemoCache(M);
				},
			}),
			(e.cache = function (M) {
				return function () {
					return M.apply(null, arguments);
				};
			}),
			(e.cacheSignal = function () {
				return null;
			}),
			(e.cloneElement = function (M, D, le) {
				if (M == null) throw Error("The argument must be a React element, but you passed " + M + ".");
				var oe = N({}, M.props),
					me = M.key;
				if (D != null)
					for (Se in (D.key !== void 0 && (me = "" + D.key), D))
						!$.call(D, Se) ||
							Se === "key" ||
							Se === "__self" ||
							Se === "__source" ||
							(Se === "ref" && D.ref === void 0) ||
							(oe[Se] = D[Se]);
				var Se = arguments.length - 2;
				if (Se === 1) oe.children = le;
				else if (1 < Se) {
					for (var Re = Array(Se), Le = 0; Le < Se; Le++) Re[Le] = arguments[Le + 2];
					oe.children = Re;
				}
				return V(M.type, me, oe);
			}),
			(e.createContext = function (M) {
				return (
					(M = { $$typeof: h, _currentValue: M, _currentValue2: M, _threadCount: 0, Provider: null, Consumer: null }),
					(M.Provider = M),
					(M.Consumer = { $$typeof: f, _context: M }),
					M
				);
			}),
			(e.createElement = function (M, D, le) {
				var oe,
					me = {},
					Se = null;
				if (D != null)
					for (oe in (D.key !== void 0 && (Se = "" + D.key), D))
						$.call(D, oe) && oe !== "key" && oe !== "__self" && oe !== "__source" && (me[oe] = D[oe]);
				var Re = arguments.length - 2;
				if (Re === 1) me.children = le;
				else if (1 < Re) {
					for (var Le = Array(Re), Xe = 0; Xe < Re; Xe++) Le[Xe] = arguments[Xe + 2];
					me.children = Le;
				}
				if (M && M.defaultProps) for (oe in ((Re = M.defaultProps), Re)) me[oe] === void 0 && (me[oe] = Re[oe]);
				return V(M, Se, me);
			}),
			(e.createRef = function () {
				return { current: null };
			}),
			(e.forwardRef = function (M) {
				return { $$typeof: m, render: M };
			}),
			(e.isValidElement = ae),
			(e.lazy = function (M) {
				return { $$typeof: S, _payload: { _status: -1, _result: M }, _init: ge };
			}),
			(e.memo = function (M, D) {
				return { $$typeof: g, type: M, compare: D === void 0 ? null : D };
			}),
			(e.startTransition = function (M) {
				var D = O.T,
					le = {};
				O.T = le;
				try {
					var oe = M(),
						me = O.S;
					(me !== null && me(le, oe),
						typeof oe == "object" && oe !== null && typeof oe.then == "function" && oe.then(K, be));
				} catch (Se) {
					be(Se);
				} finally {
					(D !== null && le.types !== null && (D.types = le.types), (O.T = D));
				}
			}),
			(e.unstable_useCacheRefresh = function () {
				return O.H.useCacheRefresh();
			}),
			(e.use = function (M) {
				return O.H.use(M);
			}),
			(e.useActionState = function (M, D, le) {
				return O.H.useActionState(M, D, le);
			}),
			(e.useCallback = function (M, D) {
				return O.H.useCallback(M, D);
			}),
			(e.useContext = function (M) {
				return O.H.useContext(M);
			}),
			(e.useDebugValue = function () {}),
			(e.useDeferredValue = function (M, D) {
				return O.H.useDeferredValue(M, D);
			}),
			(e.useEffect = function (M, D) {
				return O.H.useEffect(M, D);
			}),
			(e.useEffectEvent = function (M) {
				return O.H.useEffectEvent(M);
			}),
			(e.useId = function () {
				return O.H.useId();
			}),
			(e.useImperativeHandle = function (M, D, le) {
				return O.H.useImperativeHandle(M, D, le);
			}),
			(e.useInsertionEffect = function (M, D) {
				return O.H.useInsertionEffect(M, D);
			}),
			(e.useLayoutEffect = function (M, D) {
				return O.H.useLayoutEffect(M, D);
			}),
			(e.useMemo = function (M, D) {
				return O.H.useMemo(M, D);
			}),
			(e.useOptimistic = function (M, D) {
				return O.H.useOptimistic(M, D);
			}),
			(e.useReducer = function (M, D, le) {
				return O.H.useReducer(M, D, le);
			}),
			(e.useRef = function (M) {
				return O.H.useRef(M);
			}),
			(e.useState = function (M) {
				return O.H.useState(M);
			}),
			(e.useSyncExternalStore = function (M, D, le) {
				return O.H.useSyncExternalStore(M, D, le);
			}),
			(e.useTransition = function () {
				return O.H.useTransition();
			}),
			(e.version = "19.2.8"));
	}),
	Rc = Ir((e, t) => {
		t.exports = ST();
	}),
	wT = Ir((e) => {
		var t = Rc();
		function i(v) {
			var g = "https://react.dev/errors/" + v;
			if (1 < arguments.length) {
				g += "?args[]=" + encodeURIComponent(arguments[1]);
				for (var S = 2; S < arguments.length; S++) g += "&args[]=" + encodeURIComponent(arguments[S]);
			}
			return (
				"Minified React error #" +
				v +
				"; visit " +
				g +
				" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
			);
		}
		function u() {}
		var s = {
				d: {
					f: u,
					r: function () {
						throw Error(i(522));
					},
					D: u,
					C: u,
					L: u,
					m: u,
					X: u,
					S: u,
					M: u,
				},
				p: 0,
				findDOMNode: null,
			},
			o = Symbol.for("react.portal");
		function f(v, g, S) {
			var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
			return { $$typeof: o, key: b == null ? null : "" + b, children: v, containerInfo: g, implementation: S };
		}
		var h = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		function m(v, g) {
			if (v === "font") return "";
			if (typeof g == "string") return g === "use-credentials" ? g : "";
		}
		((e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
			(e.createPortal = function (v, g) {
				var S = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
				if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)) throw Error(i(299));
				return f(v, g, null, S);
			}),
			(e.flushSync = function (v) {
				var g = h.T,
					S = s.p;
				try {
					if (((h.T = null), (s.p = 2), v)) return v();
				} finally {
					((h.T = g), (s.p = S), s.d.f());
				}
			}),
			(e.preconnect = function (v, g) {
				typeof v == "string" &&
					(g
						? ((g = g.crossOrigin), (g = typeof g == "string" ? (g === "use-credentials" ? g : "") : void 0))
						: (g = null),
					s.d.C(v, g));
			}),
			(e.prefetchDNS = function (v) {
				typeof v == "string" && s.d.D(v);
			}),
			(e.preinit = function (v, g) {
				if (typeof v == "string" && g && typeof g.as == "string") {
					var S = g.as,
						b = m(S, g.crossOrigin),
						p = typeof g.integrity == "string" ? g.integrity : void 0,
						T = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
					S === "style"
						? s.d.S(v, typeof g.precedence == "string" ? g.precedence : void 0, {
								crossOrigin: b,
								integrity: p,
								fetchPriority: T,
							})
						: S === "script" &&
							s.d.X(v, {
								crossOrigin: b,
								integrity: p,
								fetchPriority: T,
								nonce: typeof g.nonce == "string" ? g.nonce : void 0,
							});
				}
			}),
			(e.preinitModule = function (v, g) {
				if (typeof v == "string")
					if (typeof g == "object" && g !== null) {
						if (g.as == null || g.as === "script") {
							var S = m(g.as, g.crossOrigin);
							s.d.M(v, {
								crossOrigin: S,
								integrity: typeof g.integrity == "string" ? g.integrity : void 0,
								nonce: typeof g.nonce == "string" ? g.nonce : void 0,
							});
						}
					} else g ?? s.d.M(v);
			}),
			(e.preload = function (v, g) {
				if (typeof v == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
					var S = g.as,
						b = m(S, g.crossOrigin);
					s.d.L(v, S, {
						crossOrigin: b,
						integrity: typeof g.integrity == "string" ? g.integrity : void 0,
						nonce: typeof g.nonce == "string" ? g.nonce : void 0,
						type: typeof g.type == "string" ? g.type : void 0,
						fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
						referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
						imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
						imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
						media: typeof g.media == "string" ? g.media : void 0,
					});
				}
			}),
			(e.preloadModule = function (v, g) {
				if (typeof v == "string")
					if (g) {
						var S = m(g.as, g.crossOrigin);
						s.d.m(v, {
							as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
							crossOrigin: S,
							integrity: typeof g.integrity == "string" ? g.integrity : void 0,
						});
					} else s.d.m(v);
			}),
			(e.requestFormReset = function (v) {
				s.d.r(v);
			}),
			(e.unstable_batchedUpdates = function (v, g) {
				return v(g);
			}),
			(e.useFormState = function (v, g, S) {
				return h.H.useFormState(v, g, S);
			}),
			(e.useFormStatus = function () {
				return h.H.useHostTransitionStatus();
			}),
			(e.version = "19.2.8"));
	}),
	xb = Ir((e, t) => {
		function i() {
			if (
				!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")
			)
				try {
					__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
				} catch (u) {
					console.error(u);
				}
		}
		(i(), (t.exports = wT()));
	}),
	ET = Ir((e) => {
		var t = _T(),
			i = Rc(),
			u = xb();
		function s(n) {
			var r = "https://react.dev/errors/" + n;
			if (1 < arguments.length) {
				r += "?args[]=" + encodeURIComponent(arguments[1]);
				for (var a = 2; a < arguments.length; a++) r += "&args[]=" + encodeURIComponent(arguments[a]);
			}
			return (
				"Minified React error #" +
				n +
				"; visit " +
				r +
				" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
			);
		}
		function o(n) {
			return !(!n || (n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11));
		}
		function f(n) {
			var r = n,
				a = n;
			if (n.alternate) for (; r.return; ) r = r.return;
			else {
				n = r;
				do ((r = n), (r.flags & 4098) !== 0 && (a = r.return), (n = r.return));
				while (n);
			}
			return r.tag === 3 ? a : null;
		}
		function h(n) {
			if (n.tag === 13) {
				var r = n.memoizedState;
				if ((r === null && ((n = n.alternate), n !== null && (r = n.memoizedState)), r !== null)) return r.dehydrated;
			}
			return null;
		}
		function m(n) {
			if (n.tag === 31) {
				var r = n.memoizedState;
				if ((r === null && ((n = n.alternate), n !== null && (r = n.memoizedState)), r !== null)) return r.dehydrated;
			}
			return null;
		}
		function v(n) {
			if (f(n) !== n) throw Error(s(188));
		}
		function g(n) {
			var r = n.alternate;
			if (!r) {
				if (((r = f(n)), r === null)) throw Error(s(188));
				return r !== n ? null : n;
			}
			for (var a = n, l = r; ; ) {
				var c = a.return;
				if (c === null) break;
				var d = c.alternate;
				if (d === null) {
					if (((l = c.return), l !== null)) {
						a = l;
						continue;
					}
					break;
				}
				if (c.child === d.child) {
					for (d = c.child; d; ) {
						if (d === a) return (v(c), n);
						if (d === l) return (v(c), r);
						d = d.sibling;
					}
					throw Error(s(188));
				}
				if (a.return !== l.return) ((a = c), (l = d));
				else {
					for (var y = !1, x = c.child; x; ) {
						if (x === a) {
							((y = !0), (a = c), (l = d));
							break;
						}
						if (x === l) {
							((y = !0), (l = c), (a = d));
							break;
						}
						x = x.sibling;
					}
					if (!y) {
						for (x = d.child; x; ) {
							if (x === a) {
								((y = !0), (a = d), (l = c));
								break;
							}
							if (x === l) {
								((y = !0), (l = d), (a = c));
								break;
							}
							x = x.sibling;
						}
						if (!y) throw Error(s(189));
					}
				}
				if (a.alternate !== l) throw Error(s(190));
			}
			if (a.tag !== 3) throw Error(s(188));
			return a.stateNode.current === a ? n : r;
		}
		function S(n) {
			var r = n.tag;
			if (r === 5 || r === 26 || r === 27 || r === 6) return n;
			for (n = n.child; n !== null; ) {
				if (((r = S(n)), r !== null)) return r;
				n = n.sibling;
			}
			return null;
		}
		var b = Object.assign,
			p = Symbol.for("react.element"),
			T = Symbol.for("react.transitional.element"),
			A = Symbol.for("react.portal"),
			N = Symbol.for("react.fragment"),
			q = Symbol.for("react.strict_mode"),
			I = Symbol.for("react.profiler"),
			C = Symbol.for("react.consumer"),
			k = Symbol.for("react.context"),
			L = Symbol.for("react.forward_ref"),
			Q = Symbol.for("react.suspense"),
			K = Symbol.for("react.suspense_list"),
			O = Symbol.for("react.memo"),
			$ = Symbol.for("react.lazy"),
			V = Symbol.for("react.activity"),
			Y = Symbol.for("react.memo_cache_sentinel"),
			ae = Symbol.iterator;
		function se(n) {
			return n === null || typeof n != "object"
				? null
				: ((n = (ae && n[ae]) || n["@@iterator"]), typeof n == "function" ? n : null);
		}
		var te = Symbol.for("react.client.reference");
		function fe(n) {
			if (n == null) return null;
			if (typeof n == "function") return n.$$typeof === te ? null : n.displayName || n.name || null;
			if (typeof n == "string") return n;
			switch (n) {
				case N:
					return "Fragment";
				case I:
					return "Profiler";
				case q:
					return "StrictMode";
				case Q:
					return "Suspense";
				case K:
					return "SuspenseList";
				case V:
					return "Activity";
			}
			if (typeof n == "object")
				switch (n.$$typeof) {
					case A:
						return "Portal";
					case k:
						return n.displayName || "Context";
					case C:
						return (n._context.displayName || "Context") + ".Consumer";
					case L:
						var r = n.render;
						return (
							(n = n.displayName),
							n || ((n = r.displayName || r.name || ""), (n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef")),
							n
						);
					case O:
						return ((r = n.displayName || null), r !== null ? r : fe(n.type) || "Memo");
					case $:
						((r = n._payload), (n = n._init));
						try {
							return fe(n(r));
						} catch {}
				}
			return null;
		}
		var j = Array.isArray,
			B = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			P = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			ge = { pending: !1, data: null, method: null, action: null },
			be = [],
			Pe = -1;
		function M(n) {
			return { current: n };
		}
		function D(n) {
			0 > Pe || ((n.current = be[Pe]), (be[Pe] = null), Pe--);
		}
		function le(n, r) {
			(Pe++, (be[Pe] = n.current), (n.current = r));
		}
		var oe = M(null),
			me = M(null),
			Se = M(null),
			Re = M(null);
		function Le(n, r) {
			switch ((le(Se, r), le(me, n), le(oe, null), r.nodeType)) {
				case 9:
				case 11:
					n = (n = r.documentElement) && (n = n.namespaceURI) ? By(n) : 0;
					break;
				default:
					if (((n = r.tagName), (r = r.namespaceURI))) ((r = By(r)), (n = Vy(r, n)));
					else
						switch (n) {
							case "svg":
								n = 1;
								break;
							case "math":
								n = 2;
								break;
							default:
								n = 0;
						}
			}
			(D(oe), le(oe, n));
		}
		function Xe() {
			(D(oe), D(me), D(Se));
		}
		function pt(n) {
			n.memoizedState !== null && le(Re, n);
			var r = oe.current,
				a = Vy(r, n.type);
			r !== a && (le(me, n), le(oe, a));
		}
		function At(n) {
			(me.current === n && (D(oe), D(me)), Re.current === n && (D(Re), (Jl._currentValue = ge)));
		}
		var vn, en;
		function Be(n) {
			if (vn === void 0)
				try {
					throw Error();
				} catch (a) {
					var r = a.stack.trim().match(/\n( *(at )?)/);
					((vn = (r && r[1]) || ""),
						(en =
							-1 <
							a.stack.indexOf(`
    at`)
								? " (<anonymous>)"
								: -1 < a.stack.indexOf("@")
									? "@unknown:0:0"
									: ""));
				}
			return (
				`
` +
				vn +
				n +
				en
			);
		}
		var ye = !1;
		function Ce(n, r) {
			if (!n || ye) return "";
			ye = !0;
			var a = Error.prepareStackTrace;
			Error.prepareStackTrace = void 0;
			try {
				var l = {
					DetermineComponentFrameRoot: function () {
						try {
							if (r) {
								var ue = function () {
									throw Error();
								};
								if (
									(Object.defineProperty(ue.prototype, "props", {
										set: function () {
											throw Error();
										},
									}),
									typeof Reflect == "object" && Reflect.construct)
								) {
									try {
										Reflect.construct(ue, []);
									} catch (ee) {
										var W = ee;
									}
									Reflect.construct(n, [], ue);
								} else {
									try {
										ue.call();
									} catch (ee) {
										W = ee;
									}
									n.call(ue.prototype);
								}
							} else {
								try {
									throw Error();
								} catch (ee) {
									W = ee;
								}
								(ue = n()) && typeof ue.catch == "function" && ue.catch(function () {});
							}
						} catch (ee) {
							if (ee && W && typeof ee.stack == "string") return [ee.stack, W.stack];
						}
						return [null, null];
					},
				};
				l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
				var c = Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot, "name");
				c &&
					c.configurable &&
					Object.defineProperty(l.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
				var d = l.DetermineComponentFrameRoot(),
					y = d[0],
					x = d[1];
				if (y && x) {
					var z = y.split(`
`),
						X = x.split(`
`);
					for (c = l = 0; l < z.length && !z[l].includes("DetermineComponentFrameRoot"); ) l++;
					for (; c < X.length && !X[c].includes("DetermineComponentFrameRoot"); ) c++;
					if (l === z.length || c === X.length)
						for (l = z.length - 1, c = X.length - 1; 1 <= l && 0 <= c && z[l] !== X[c]; ) c--;
					for (; 1 <= l && 0 <= c; l--, c--)
						if (z[l] !== X[c]) {
							if (l !== 1 || c !== 1)
								do
									if ((l--, c--, 0 > c || z[l] !== X[c])) {
										var ne =
											`
` + z[l].replace(" at new ", " at ");
										return (
											n.displayName && ne.includes("<anonymous>") && (ne = ne.replace("<anonymous>", n.displayName)),
											ne
										);
									}
								while (1 <= l && 0 <= c);
							break;
						}
				}
			} finally {
				((ye = !1), (Error.prepareStackTrace = a));
			}
			return (a = n ? n.displayName || n.name : "") ? Be(a) : "";
		}
		function nt(n, r) {
			switch (n.tag) {
				case 26:
				case 27:
				case 5:
					return Be(n.type);
				case 16:
					return Be("Lazy");
				case 13:
					return n.child !== r && r !== null ? Be("Suspense Fallback") : Be("Suspense");
				case 19:
					return Be("SuspenseList");
				case 0:
				case 15:
					return Ce(n.type, !1);
				case 11:
					return Ce(n.type.render, !1);
				case 1:
					return Ce(n.type, !0);
				case 31:
					return Be("Activity");
				default:
					return "";
			}
		}
		function Ve(n) {
			try {
				var r = "",
					a = null;
				do ((r += nt(n, a)), (a = n), (n = n.return));
				while (n);
				return r;
			} catch (l) {
				return (
					`
Error generating stack: ` +
					l.message +
					`
` +
					l.stack
				);
			}
		}
		var Bt = Object.prototype.hasOwnProperty,
			et = t.unstable_scheduleCallback,
			ce = t.unstable_cancelCallback,
			ze = t.unstable_shouldYield,
			rt = t.unstable_requestPaint,
			Ne = t.unstable_now,
			bt = t.unstable_getCurrentPriorityLevel,
			pn = t.unstable_ImmediatePriority,
			ut = t.unstable_UserBlockingPriority,
			Vt = t.unstable_NormalPriority,
			yr = t.unstable_LowPriority,
			Yr = t.unstable_IdlePriority,
			pr = t.log,
			Pn = t.unstable_setDisableYieldValue,
			kn = null,
			_t = null;
		function tn(n) {
			if ((typeof pr == "function" && Pn(n), _t && typeof _t.setStrictMode == "function"))
				try {
					_t.setStrictMode(kn, n);
				} catch {}
		}
		var ct = Math.clz32 ? Math.clz32 : _n,
			br = Math.log,
			ar = Math.LN2;
		function _n(n) {
			return ((n >>>= 0), n === 0 ? 32 : (31 - ((br(n) / ar) | 0)) | 0);
		}
		var Ht = 256,
			Zt = 262144,
			Qn = 4194304;
		function Mn(n) {
			var r = n & 42;
			if (r !== 0) return r;
			switch (n & -n) {
				case 1:
					return 1;
				case 2:
					return 2;
				case 4:
					return 4;
				case 8:
					return 8;
				case 16:
					return 16;
				case 32:
					return 32;
				case 64:
					return 64;
				case 128:
					return 128;
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
					return n & 261888;
				case 262144:
				case 524288:
				case 1048576:
				case 2097152:
					return n & 3932160;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432:
					return n & 62914560;
				case 67108864:
					return 67108864;
				case 134217728:
					return 134217728;
				case 268435456:
					return 268435456;
				case 536870912:
					return 536870912;
				case 1073741824:
					return 0;
				default:
					return n;
			}
		}
		function ur(n, r, a) {
			var l = n.pendingLanes;
			if (l === 0) return 0;
			var c = 0,
				d = n.suspendedLanes,
				y = n.pingedLanes;
			n = n.warmLanes;
			var x = l & 134217727;
			return (
				x !== 0
					? ((l = x & ~d),
						l !== 0 ? (c = Mn(l)) : ((y &= x), y !== 0 ? (c = Mn(y)) : a || ((a = x & ~n), a !== 0 && (c = Mn(a)))))
					: ((x = l & ~d), x !== 0 ? (c = Mn(x)) : y !== 0 ? (c = Mn(y)) : a || ((a = l & ~n), a !== 0 && (c = Mn(a)))),
				c === 0
					? 0
					: r !== 0 &&
						  r !== c &&
						  (r & d) === 0 &&
						  ((d = c & -c), (a = r & -r), d >= a || (d === 32 && (a & 4194048) !== 0))
						? r
						: c
			);
		}
		function Sn(n, r) {
			return (n.pendingLanes & ~(n.suspendedLanes & ~n.pingedLanes) & r) === 0;
		}
		function _r(n, r) {
			switch (n) {
				case 1:
				case 2:
				case 4:
				case 8:
				case 64:
					return r + 250;
				case 16:
				case 32:
				case 128:
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152:
					return r + 5e3;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432:
					return -1;
				case 67108864:
				case 134217728:
				case 268435456:
				case 536870912:
				case 1073741824:
					return -1;
				default:
					return -1;
			}
		}
		function lr() {
			var n = Qn;
			return ((Qn <<= 1), (Qn & 62914560) === 0 && (Qn = 4194304), n);
		}
		function Pt(n) {
			for (var r = [], a = 0; 31 > a; a++) r.push(n);
			return r;
		}
		function In(n, r) {
			((n.pendingLanes |= r), r !== 268435456 && ((n.suspendedLanes = 0), (n.pingedLanes = 0), (n.warmLanes = 0)));
		}
		function Sr(n, r, a, l, c, d) {
			var y = n.pendingLanes;
			((n.pendingLanes = a),
				(n.suspendedLanes = 0),
				(n.pingedLanes = 0),
				(n.warmLanes = 0),
				(n.expiredLanes &= a),
				(n.entangledLanes &= a),
				(n.errorRecoveryDisabledLanes &= a),
				(n.shellSuspendCounter = 0));
			var x = n.entanglements,
				z = n.expirationTimes,
				X = n.hiddenUpdates;
			for (a = y & ~a; 0 < a; ) {
				var ne = 31 - ct(a),
					ue = 1 << ne;
				((x[ne] = 0), (z[ne] = -1));
				var W = X[ne];
				if (W !== null)
					for (X[ne] = null, ne = 0; ne < W.length; ne++) {
						var ee = W[ne];
						ee !== null && (ee.lane &= -536870913);
					}
				a &= ~ue;
			}
			(l !== 0 && Lt(n, l, 0), d !== 0 && c === 0 && n.tag !== 0 && (n.suspendedLanes |= d & ~(y & ~r)));
		}
		function Lt(n, r, a) {
			((n.pendingLanes |= r), (n.suspendedLanes &= ~r));
			var l = 31 - ct(r);
			((n.entangledLanes |= r), (n.entanglements[l] = n.entanglements[l] | 1073741824 | (a & 261930)));
		}
		function Qt(n, r) {
			var a = (n.entangledLanes |= r);
			for (n = n.entanglements; a; ) {
				var l = 31 - ct(a),
					c = 1 << l;
				((c & r) | (n[l] & r) && (n[l] |= r), (a &= ~c));
			}
		}
		function Sa(n, r) {
			var a = r & -r;
			return ((a = (a & 42) !== 0 ? 1 : Ln(a)), (a & (n.suspendedLanes | r)) !== 0 ? 0 : a);
		}
		function Ln(n) {
			switch (n) {
				case 2:
					n = 1;
					break;
				case 8:
					n = 4;
					break;
				case 32:
					n = 16;
					break;
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152:
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432:
					n = 128;
					break;
				case 268435456:
					n = 134217728;
					break;
				default:
					n = 0;
			}
			return n;
		}
		function nn(n) {
			return ((n &= -n), 2 < n ? (8 < n ? ((n & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
		}
		function Li() {
			var n = P.p;
			return n !== 0 ? n : ((n = window.event), n === void 0 ? 32 : op(n.type));
		}
		function wa(n, r) {
			var a = P.p;
			try {
				return ((P.p = n), r());
			} finally {
				P.p = a;
			}
		}
		var qt = Math.random().toString(36).slice(2),
			Dt = "__reactFiber$" + qt,
			rn = "__reactProps$" + qt,
			wr = "__reactContainer$" + qt,
			qr = "__reactEvents$" + qt,
			Er = "__reactListeners$" + qt,
			ui = "__reactHandles$" + qt,
			qi = "__reactResources$" + qt,
			Kn = "__reactMarker$" + qt;
		function Ui(n) {
			(delete n[Dt], delete n[rn], delete n[qr], delete n[Er], delete n[ui]);
		}
		function Kt(n) {
			var r = n[Dt];
			if (r) return r;
			for (var a = n.parentNode; a; ) {
				if ((r = a[wr] || a[Dt])) {
					if (((a = r.alternate), r.child !== null || (a !== null && a.child !== null)))
						for (n = Gy(n); n !== null; ) {
							if ((a = n[Dt])) return a;
							n = Gy(n);
						}
					return r;
				}
				((n = a), (a = n.parentNode));
			}
			return null;
		}
		function Yn(n) {
			if ((n = n[Dt] || n[wr])) {
				var r = n.tag;
				if (r === 5 || r === 6 || r === 13 || r === 31 || r === 26 || r === 27 || r === 3) return n;
			}
			return null;
		}
		function Nn(n) {
			var r = n.tag;
			if (r === 5 || r === 26 || r === 27 || r === 6) return n.stateNode;
			throw Error(s(33));
		}
		function sr(n) {
			var r = n[qi];
			return (r || (r = n[qi] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), r);
		}
		function Rt(n) {
			n[Kn] = !0;
		}
		var Ea = new Set(),
			J = {};
		function ve(n, r) {
			(Te(n, r), Te(n + "Capture", r));
		}
		function Te(n, r) {
			for (J[n] = r, n = 0; n < r.length; n++) Ea.add(r[n]);
		}
		var je = RegExp(
				"^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
			),
			Qe = {},
			Ct = {};
		function St(n) {
			return Bt.call(Ct, n) ? !0 : Bt.call(Qe, n) ? !1 : je.test(n) ? (Ct[n] = !0) : ((Qe[n] = !0), !1);
		}
		function ht(n, r, a) {
			if (St(r))
				if (a === null) n.removeAttribute(r);
				else {
					switch (typeof a) {
						case "undefined":
						case "function":
						case "symbol":
							n.removeAttribute(r);
							return;
						case "boolean":
							var l = r.toLowerCase().slice(0, 5);
							if (l !== "data-" && l !== "aria-") {
								n.removeAttribute(r);
								return;
							}
					}
					n.setAttribute(r, "" + a);
				}
		}
		function Ur(n, r, a) {
			if (a === null) n.removeAttribute(r);
			else {
				switch (typeof a) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						n.removeAttribute(r);
						return;
				}
				n.setAttribute(r, "" + a);
			}
		}
		function Gn(n, r, a, l) {
			if (l === null) n.removeAttribute(a);
			else {
				switch (typeof l) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						n.removeAttribute(a);
						return;
				}
				n.setAttributeNS(r, a, "" + l);
			}
		}
		function Yt(n) {
			switch (typeof n) {
				case "bigint":
				case "boolean":
				case "number":
				case "string":
				case "undefined":
					return n;
				case "object":
					return n;
				default:
					return "";
			}
		}
		function $i(n) {
			var r = n.type;
			return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
		}
		function an(n, r, a) {
			var l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r);
			if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
				var c = l.get,
					d = l.set;
				return (
					Object.defineProperty(n, r, {
						configurable: !0,
						get: function () {
							return c.call(this);
						},
						set: function (y) {
							((a = "" + y), d.call(this, y));
						},
					}),
					Object.defineProperty(n, r, { enumerable: l.enumerable }),
					{
						getValue: function () {
							return a;
						},
						setValue: function (y) {
							a = "" + y;
						},
						stopTracking: function () {
							((n._valueTracker = null), delete n[r]);
						},
					}
				);
			}
		}
		function Tr(n) {
			if (!n._valueTracker) {
				var r = $i(n) ? "checked" : "value";
				n._valueTracker = an(n, r, "" + n[r]);
			}
		}
		function qn(n) {
			if (!n) return !1;
			var r = n._valueTracker;
			if (!r) return !0;
			var a = r.getValue(),
				l = "";
			return (n && (l = $i(n) ? (n.checked ? "true" : "false") : n.value), (n = l), n !== a ? (r.setValue(n), !0) : !1);
		}
		function Gr(n) {
			if (((n = n || (typeof document < "u" ? document : void 0)), typeof n > "u")) return null;
			try {
				return n.activeElement || n.body;
			} catch {
				return n.body;
			}
		}
		var sl = /[\n"\\]/g;
		function wn(n) {
			return n.replace(sl, function (r) {
				return "\\" + r.charCodeAt(0).toString(16) + " ";
			});
		}
		function ol(n, r, a, l, c, d, y, x) {
			((n.name = ""),
				y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean"
					? (n.type = y)
					: n.removeAttribute("type"),
				r != null
					? y === "number"
						? ((r === 0 && n.value === "") || n.value != r) && (n.value = "" + Yt(r))
						: n.value !== "" + Yt(r) && (n.value = "" + Yt(r))
					: (y !== "submit" && y !== "reset") || n.removeAttribute("value"),
				r != null ? cl(n, y, Yt(r)) : a != null ? cl(n, y, Yt(a)) : l != null && n.removeAttribute("value"),
				c == null && d != null && (n.defaultChecked = !!d),
				c != null && (n.checked = c && typeof c != "function" && typeof c != "symbol"),
				x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean"
					? (n.name = "" + Yt(x))
					: n.removeAttribute("name"));
		}
		function Ds(n, r, a, l, c, d, y, x) {
			if (
				(d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (n.type = d),
				r != null || a != null)
			) {
				if (!((d !== "submit" && d !== "reset") || r != null)) {
					Tr(n);
					return;
				}
				((a = a != null ? "" + Yt(a) : ""),
					(r = r != null ? "" + Yt(r) : a),
					x || r === n.value || (n.value = r),
					(n.defaultValue = r));
			}
			((l = l ?? c),
				(l = typeof l != "function" && typeof l != "symbol" && !!l),
				(n.checked = x ? n.checked : !!l),
				(n.defaultChecked = !!l),
				y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (n.name = y),
				Tr(n));
		}
		function cl(n, r, a) {
			(r === "number" && Gr(n.ownerDocument) === n) || n.defaultValue === "" + a || (n.defaultValue = "" + a);
		}
		function $r(n, r, a, l) {
			if (((n = n.options), r)) {
				r = {};
				for (var c = 0; c < a.length; c++) r["$" + a[c]] = !0;
				for (a = 0; a < n.length; a++)
					((c = r.hasOwnProperty("$" + n[a].value)),
						n[a].selected !== c && (n[a].selected = c),
						c && l && (n[a].defaultSelected = !0));
			} else {
				for (a = "" + Yt(a), r = null, c = 0; c < n.length; c++) {
					if (n[c].value === a) {
						((n[c].selected = !0), l && (n[c].defaultSelected = !0));
						return;
					}
					r !== null || n[c].disabled || (r = n[c]);
				}
				r !== null && (r.selected = !0);
			}
		}
		function Un(n, r, a) {
			if (r != null && ((r = "" + Yt(r)), r !== n.value && (n.value = r), a == null)) {
				n.defaultValue !== r && (n.defaultValue = r);
				return;
			}
			n.defaultValue = a != null ? "" + Yt(a) : "";
		}
		function fl(n, r, a, l) {
			if (r == null) {
				if (l != null) {
					if (a != null) throw Error(s(92));
					if (j(l)) {
						if (1 < l.length) throw Error(s(93));
						l = l[0];
					}
					a = l;
				}
				((a ??= ""), (r = a));
			}
			((a = Yt(r)),
				(n.defaultValue = a),
				(l = n.textContent),
				l === a && l !== "" && l !== null && (n.value = l),
				Tr(n));
		}
		function Br(n, r) {
			if (r) {
				var a = n.firstChild;
				if (a && a === n.lastChild && a.nodeType === 3) {
					a.nodeValue = r;
					return;
				}
			}
			n.textContent = r;
		}
		var js = new Set(
			"animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
				" ",
			),
		);
		function Is(n, r, a) {
			var l = r.indexOf("--") === 0;
			a == null || typeof a == "boolean" || a === ""
				? l
					? n.setProperty(r, "")
					: r === "float"
						? (n.cssFloat = "")
						: (n[r] = "")
				: l
					? n.setProperty(r, a)
					: typeof a != "number" || a === 0 || js.has(r)
						? r === "float"
							? (n.cssFloat = a)
							: (n[r] = ("" + a).trim())
						: (n[r] = a + "px");
		}
		function dl(n, r, a) {
			if (r != null && typeof r != "object") throw Error(s(62));
			if (((n = n.style), a != null)) {
				for (var l in a)
					!a.hasOwnProperty(l) ||
						(r != null && r.hasOwnProperty(l)) ||
						(l.indexOf("--") === 0 ? n.setProperty(l, "") : l === "float" ? (n.cssFloat = "") : (n[l] = ""));
				for (var c in r) ((l = r[c]), r.hasOwnProperty(c) && a[c] !== l && Is(n, c, l));
			} else for (var d in r) r.hasOwnProperty(d) && Is(n, d, r[d]);
		}
		function hl(n) {
			if (n.indexOf("-") === -1) return !1;
			switch (n) {
				case "annotation-xml":
				case "color-profile":
				case "font-face":
				case "font-face-src":
				case "font-face-uri":
				case "font-face-format":
				case "font-face-name":
				case "missing-glyph":
					return !1;
				default:
					return !0;
			}
		}
		var Ls = new Map([
				["acceptCharset", "accept-charset"],
				["htmlFor", "for"],
				["httpEquiv", "http-equiv"],
				["crossOrigin", "crossorigin"],
				["accentHeight", "accent-height"],
				["alignmentBaseline", "alignment-baseline"],
				["arabicForm", "arabic-form"],
				["baselineShift", "baseline-shift"],
				["capHeight", "cap-height"],
				["clipPath", "clip-path"],
				["clipRule", "clip-rule"],
				["colorInterpolation", "color-interpolation"],
				["colorInterpolationFilters", "color-interpolation-filters"],
				["colorProfile", "color-profile"],
				["colorRendering", "color-rendering"],
				["dominantBaseline", "dominant-baseline"],
				["enableBackground", "enable-background"],
				["fillOpacity", "fill-opacity"],
				["fillRule", "fill-rule"],
				["floodColor", "flood-color"],
				["floodOpacity", "flood-opacity"],
				["fontFamily", "font-family"],
				["fontSize", "font-size"],
				["fontSizeAdjust", "font-size-adjust"],
				["fontStretch", "font-stretch"],
				["fontStyle", "font-style"],
				["fontVariant", "font-variant"],
				["fontWeight", "font-weight"],
				["glyphName", "glyph-name"],
				["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
				["glyphOrientationVertical", "glyph-orientation-vertical"],
				["horizAdvX", "horiz-adv-x"],
				["horizOriginX", "horiz-origin-x"],
				["imageRendering", "image-rendering"],
				["letterSpacing", "letter-spacing"],
				["lightingColor", "lighting-color"],
				["markerEnd", "marker-end"],
				["markerMid", "marker-mid"],
				["markerStart", "marker-start"],
				["overlinePosition", "overline-position"],
				["overlineThickness", "overline-thickness"],
				["paintOrder", "paint-order"],
				["panose-1", "panose-1"],
				["pointerEvents", "pointer-events"],
				["renderingIntent", "rendering-intent"],
				["shapeRendering", "shape-rendering"],
				["stopColor", "stop-color"],
				["stopOpacity", "stop-opacity"],
				["strikethroughPosition", "strikethrough-position"],
				["strikethroughThickness", "strikethrough-thickness"],
				["strokeDasharray", "stroke-dasharray"],
				["strokeDashoffset", "stroke-dashoffset"],
				["strokeLinecap", "stroke-linecap"],
				["strokeLinejoin", "stroke-linejoin"],
				["strokeMiterlimit", "stroke-miterlimit"],
				["strokeOpacity", "stroke-opacity"],
				["strokeWidth", "stroke-width"],
				["textAnchor", "text-anchor"],
				["textDecoration", "text-decoration"],
				["textRendering", "text-rendering"],
				["transformOrigin", "transform-origin"],
				["underlinePosition", "underline-position"],
				["underlineThickness", "underline-thickness"],
				["unicodeBidi", "unicode-bidi"],
				["unicodeRange", "unicode-range"],
				["unitsPerEm", "units-per-em"],
				["vAlphabetic", "v-alphabetic"],
				["vHanging", "v-hanging"],
				["vIdeographic", "v-ideographic"],
				["vMathematical", "v-mathematical"],
				["vectorEffect", "vector-effect"],
				["vertAdvY", "vert-adv-y"],
				["vertOriginX", "vert-origin-x"],
				["vertOriginY", "vert-origin-y"],
				["wordSpacing", "word-spacing"],
				["writingMode", "writing-mode"],
				["xmlnsXlink", "xmlns:xlink"],
				["xHeight", "x-height"],
			]),
			ef =
				/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
		function Ta(n) {
			return ef.test("" + n)
				? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
				: n;
		}
		function On() {}
		var ml = null;
		function $n(n) {
			return (
				(n = n.target || n.srcElement || window),
				n.correspondingUseElement && (n = n.correspondingUseElement),
				n.nodeType === 3 ? n.parentNode : n
			);
		}
		var Bi = null,
			Vr = null;
		function vl(n) {
			var r = Yn(n);
			if (r && (n = r.stateNode)) {
				var a = n[rn] || null;
				e: switch (((n = r.stateNode), r.type)) {
					case "input":
						if (
							(ol(n, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name),
							(r = a.name),
							a.type === "radio" && r != null)
						) {
							for (a = n; a.parentNode; ) a = a.parentNode;
							for (a = a.querySelectorAll('input[name="' + wn("" + r) + '"][type="radio"]'), r = 0; r < a.length; r++) {
								var l = a[r];
								if (l !== n && l.form === n.form) {
									var c = l[rn] || null;
									if (!c) throw Error(s(90));
									ol(l, c.value, c.defaultValue, c.defaultValue, c.checked, c.defaultChecked, c.type, c.name);
								}
							}
							for (r = 0; r < a.length; r++) ((l = a[r]), l.form === n.form && qn(l));
						}
						break e;
					case "textarea":
						Un(n, a.value, a.defaultValue);
						break e;
					case "select":
						((r = a.value), r != null && $r(n, !!a.multiple, r, !1));
				}
			}
		}
		var xa = !1;
		function lu(n, r, a) {
			if (xa) return n(r, a);
			xa = !0;
			try {
				return n(r);
			} finally {
				if (((xa = !1), (Bi !== null || Vr !== null) && (So(), Bi && ((r = Bi), (n = Vr), (Vr = Bi = null), vl(r), n))))
					for (r = 0; r < n.length; r++) vl(n[r]);
			}
		}
		function Vi(n, r) {
			var a = n.stateNode;
			if (a === null) return null;
			var l = a[rn] || null;
			if (l === null) return null;
			a = l[r];
			e: switch (r) {
				case "onClick":
				case "onClickCapture":
				case "onDoubleClick":
				case "onDoubleClickCapture":
				case "onMouseDown":
				case "onMouseDownCapture":
				case "onMouseMove":
				case "onMouseMoveCapture":
				case "onMouseUp":
				case "onMouseUpCapture":
				case "onMouseEnter":
					((l = !l.disabled) ||
						((n = n.type), (l = !(n === "button" || n === "input" || n === "select" || n === "textarea"))),
						(n = !l));
					break e;
				default:
					n = !1;
			}
			if (n) return null;
			if (a && typeof a != "function") throw Error(s(231, r, typeof a));
			return a;
		}
		var E = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
			R = !1;
		if (E)
			try {
				var H = {};
				(Object.defineProperty(H, "passive", {
					get: function () {
						R = !0;
					},
				}),
					window.addEventListener("test", H, H),
					window.removeEventListener("test", H, H));
			} catch {
				R = !1;
			}
		var F = null,
			de = null,
			he = null;
		function pe() {
			if (he) return he;
			var n,
				r = de,
				a = r.length,
				l,
				c = "value" in F ? F.value : F.textContent,
				d = c.length;
			for (n = 0; n < a && r[n] === c[n]; n++);
			var y = a - n;
			for (l = 1; l <= y && r[a - l] === c[d - l]; l++);
			return (he = c.slice(n, 1 < l ? 1 - l : void 0));
		}
		function Me(n) {
			var r = n.keyCode;
			return (
				"charCode" in n ? ((n = n.charCode), n === 0 && r === 13 && (n = 13)) : (n = r),
				n === 10 && (n = 13),
				32 <= n || n === 13 ? n : 0
			);
		}
		function Ee() {
			return !0;
		}
		function $e() {
			return !1;
		}
		function Ke(n) {
			function r(a, l, c, d, y) {
				((this._reactName = a),
					(this._targetInst = c),
					(this.type = l),
					(this.nativeEvent = d),
					(this.target = y),
					(this.currentTarget = null));
				for (var x in n) n.hasOwnProperty(x) && ((a = n[x]), (this[x] = a ? a(d) : d[x]));
				return (
					(this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1)
						? Ee
						: $e),
					(this.isPropagationStopped = $e),
					this
				);
			}
			return (
				b(r.prototype, {
					preventDefault: function () {
						this.defaultPrevented = !0;
						var a = this.nativeEvent;
						a &&
							(a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1),
							(this.isDefaultPrevented = Ee));
					},
					stopPropagation: function () {
						var a = this.nativeEvent;
						a &&
							(a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
							(this.isPropagationStopped = Ee));
					},
					persist: function () {},
					isPersistent: Ee,
				}),
				r
			);
		}
		var Oe = {
				eventPhase: 0,
				bubbles: 0,
				cancelable: 0,
				timeStamp: function (n) {
					return n.timeStamp || Date.now();
				},
				defaultPrevented: 0,
				isTrusted: 0,
			},
			lt = Ke(Oe),
			Bn = b({}, Oe, { view: 0, detail: 0 }),
			gl = Ke(Bn),
			su,
			yl,
			pl,
			qs = b({}, Bn, {
				screenX: 0,
				screenY: 0,
				clientX: 0,
				clientY: 0,
				pageX: 0,
				pageY: 0,
				ctrlKey: 0,
				shiftKey: 0,
				altKey: 0,
				metaKey: 0,
				getModifierState: nf,
				button: 0,
				buttons: 0,
				relatedTarget: function (n) {
					return n.relatedTarget === void 0
						? n.fromElement === n.srcElement
							? n.toElement
							: n.fromElement
						: n.relatedTarget;
				},
				movementX: function (n) {
					return "movementX" in n
						? n.movementX
						: (n !== pl &&
								(pl && n.type === "mousemove"
									? ((su = n.screenX - pl.screenX), (yl = n.screenY - pl.screenY))
									: (yl = su = 0),
								(pl = n)),
							su);
				},
				movementY: function (n) {
					return "movementY" in n ? n.movementY : yl;
				},
			}),
			Qm = Ke(qs),
			jS = Ke(b({}, qs, { dataTransfer: 0 })),
			tf = Ke(b({}, Bn, { relatedTarget: 0 })),
			IS = Ke(b({}, Oe, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
			LS = Ke(
				b({}, Oe, {
					clipboardData: function (n) {
						return "clipboardData" in n ? n.clipboardData : window.clipboardData;
					},
				}),
			),
			Km = Ke(b({}, Oe, { data: 0 })),
			qS = {
				Esc: "Escape",
				Spacebar: " ",
				Left: "ArrowLeft",
				Up: "ArrowUp",
				Right: "ArrowRight",
				Down: "ArrowDown",
				Del: "Delete",
				Win: "OS",
				Menu: "ContextMenu",
				Apps: "ContextMenu",
				Scroll: "ScrollLock",
				MozPrintableKey: "Unidentified",
			},
			US = {
				8: "Backspace",
				9: "Tab",
				12: "Clear",
				13: "Enter",
				16: "Shift",
				17: "Control",
				18: "Alt",
				19: "Pause",
				20: "CapsLock",
				27: "Escape",
				32: " ",
				33: "PageUp",
				34: "PageDown",
				35: "End",
				36: "Home",
				37: "ArrowLeft",
				38: "ArrowUp",
				39: "ArrowRight",
				40: "ArrowDown",
				45: "Insert",
				46: "Delete",
				112: "F1",
				113: "F2",
				114: "F3",
				115: "F4",
				116: "F5",
				117: "F6",
				118: "F7",
				119: "F8",
				120: "F9",
				121: "F10",
				122: "F11",
				123: "F12",
				144: "NumLock",
				145: "ScrollLock",
				224: "Meta",
			},
			$S = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
		function BS(n) {
			var r = this.nativeEvent;
			return r.getModifierState ? r.getModifierState(n) : (n = $S[n]) ? !!r[n] : !1;
		}
		function nf() {
			return BS;
		}
		var VS = Ke(
				b({}, Bn, {
					key: function (n) {
						if (n.key) {
							var r = qS[n.key] || n.key;
							if (r !== "Unidentified") return r;
						}
						return n.type === "keypress"
							? ((n = Me(n)), n === 13 ? "Enter" : String.fromCharCode(n))
							: n.type === "keydown" || n.type === "keyup"
								? US[n.keyCode] || "Unidentified"
								: "";
					},
					code: 0,
					location: 0,
					ctrlKey: 0,
					shiftKey: 0,
					altKey: 0,
					metaKey: 0,
					repeat: 0,
					locale: 0,
					getModifierState: nf,
					charCode: function (n) {
						return n.type === "keypress" ? Me(n) : 0;
					},
					keyCode: function (n) {
						return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
					},
					which: function (n) {
						return n.type === "keypress" ? Me(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
					},
				}),
			),
			Ym = Ke(
				b({}, qs, {
					pointerId: 0,
					width: 0,
					height: 0,
					pressure: 0,
					tangentialPressure: 0,
					tiltX: 0,
					tiltY: 0,
					twist: 0,
					pointerType: 0,
					isPrimary: 0,
				}),
			),
			HS = Ke(
				b({}, Bn, {
					touches: 0,
					targetTouches: 0,
					changedTouches: 0,
					altKey: 0,
					metaKey: 0,
					ctrlKey: 0,
					shiftKey: 0,
					getModifierState: nf,
				}),
			),
			ZS = Ke(b({}, Oe, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
			PS = Ke(
				b({}, qs, {
					deltaX: function (n) {
						return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
					},
					deltaY: function (n) {
						return "deltaY" in n
							? n.deltaY
							: "wheelDeltaY" in n
								? -n.wheelDeltaY
								: "wheelDelta" in n
									? -n.wheelDelta
									: 0;
					},
					deltaZ: 0,
					deltaMode: 0,
				}),
			),
			QS = Ke(b({}, Oe, { newState: 0, oldState: 0 })),
			KS = [9, 13, 27, 32],
			rf = E && "CompositionEvent" in window,
			bl = null;
		E && "documentMode" in document && (bl = document.documentMode);
		var YS = E && "TextEvent" in window && !bl,
			Gm = E && (!rf || (bl && 8 < bl && 11 >= bl)),
			Fm = " ",
			Xm = !1;
		function Jm(n, r) {
			switch (n) {
				case "keyup":
					return KS.indexOf(r.keyCode) !== -1;
				case "keydown":
					return r.keyCode !== 229;
				case "keypress":
				case "mousedown":
				case "focusout":
					return !0;
				default:
					return !1;
			}
		}
		function Wm(n) {
			return ((n = n.detail), typeof n == "object" && "data" in n ? n.data : null);
		}
		var ou = !1;
		function GS(n, r) {
			switch (n) {
				case "compositionend":
					return Wm(r);
				case "keypress":
					return r.which !== 32 ? null : ((Xm = !0), Fm);
				case "textInput":
					return ((n = r.data), n === Fm && Xm ? null : n);
				default:
					return null;
			}
		}
		function FS(n, r) {
			if (ou)
				return n === "compositionend" || (!rf && Jm(n, r)) ? ((n = pe()), (he = de = F = null), (ou = !1), n) : null;
			switch (n) {
				case "paste":
					return null;
				case "keypress":
					if (!(r.ctrlKey || r.altKey || r.metaKey) || (r.ctrlKey && r.altKey)) {
						if (r.char && 1 < r.char.length) return r.char;
						if (r.which) return String.fromCharCode(r.which);
					}
					return null;
				case "compositionend":
					return Gm && r.locale !== "ko" ? null : r.data;
				default:
					return null;
			}
		}
		var XS = {
			color: !0,
			date: !0,
			datetime: !0,
			"datetime-local": !0,
			email: !0,
			month: !0,
			number: !0,
			password: !0,
			range: !0,
			search: !0,
			tel: !0,
			text: !0,
			time: !0,
			url: !0,
			week: !0,
		};
		function ev(n) {
			var r = n && n.nodeName && n.nodeName.toLowerCase();
			return r === "input" ? !!XS[n.type] : r === "textarea";
		}
		function tv(n, r, a, l) {
			(Bi ? (Vr ? Vr.push(l) : (Vr = [l])) : (Bi = l),
				(r = Co(r, "onChange")),
				0 < r.length && ((a = new lt("onChange", "change", null, a, l)), n.push({ event: a, listeners: r })));
		}
		var _l = null,
			Sl = null;
		function JS(n) {
			Dy(n, 0);
		}
		function Us(n) {
			if (qn(Nn(n))) return n;
		}
		function nv(n, r) {
			if (n === "change") return r;
		}
		var rv = !1;
		if (E) {
			var af;
			if (E) {
				var uf = "oninput" in document;
				if (!uf) {
					var iv = document.createElement("div");
					(iv.setAttribute("oninput", "return;"), (uf = typeof iv.oninput == "function"));
				}
				af = uf;
			} else af = !1;
			rv = af && (!document.documentMode || 9 < document.documentMode);
		}
		function av() {
			_l && (_l.detachEvent("onpropertychange", uv), (Sl = _l = null));
		}
		function uv(n) {
			if (n.propertyName === "value" && Us(Sl)) {
				var r = [];
				(tv(r, Sl, n, $n(n)), lu(JS, r));
			}
		}
		function WS(n, r, a) {
			n === "focusin" ? (av(), (_l = r), (Sl = a), _l.attachEvent("onpropertychange", uv)) : n === "focusout" && av();
		}
		function ew(n) {
			if (n === "selectionchange" || n === "keyup" || n === "keydown") return Us(Sl);
		}
		function tw(n, r) {
			if (n === "click") return Us(r);
		}
		function nw(n, r) {
			if (n === "input" || n === "change") return Us(r);
		}
		function rw(n, r) {
			return (n === r && (n !== 0 || 1 / n === 1 / r)) || (n !== n && r !== r);
		}
		var or = typeof Object.is == "function" ? Object.is : rw;
		function wl(n, r) {
			if (or(n, r)) return !0;
			if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
			var a = Object.keys(n),
				l = Object.keys(r);
			if (a.length !== l.length) return !1;
			for (l = 0; l < a.length; l++) {
				var c = a[l];
				if (!Bt.call(r, c) || !or(n[c], r[c])) return !1;
			}
			return !0;
		}
		function lv(n) {
			for (; n && n.firstChild; ) n = n.firstChild;
			return n;
		}
		function sv(n, r) {
			var a = lv(n);
			n = 0;
			for (var l; a; ) {
				if (a.nodeType === 3) {
					if (((l = n + a.textContent.length), n <= r && l >= r)) return { node: a, offset: r - n };
					n = l;
				}
				e: {
					for (; a; ) {
						if (a.nextSibling) {
							a = a.nextSibling;
							break e;
						}
						a = a.parentNode;
					}
					a = void 0;
				}
				a = lv(a);
			}
		}
		function ov(n, r) {
			return n && r
				? n === r
					? !0
					: n && n.nodeType === 3
						? !1
						: r && r.nodeType === 3
							? ov(n, r.parentNode)
							: "contains" in n
								? n.contains(r)
								: n.compareDocumentPosition
									? !!(n.compareDocumentPosition(r) & 16)
									: !1
				: !1;
		}
		function cv(n) {
			n =
				n != null && n.ownerDocument != null && n.ownerDocument.defaultView != null
					? n.ownerDocument.defaultView
					: window;
			for (var r = Gr(n.document); r instanceof n.HTMLIFrameElement; ) {
				try {
					var a = typeof r.contentWindow.location.href == "string";
				} catch {
					a = !1;
				}
				if (a) n = r.contentWindow;
				else break;
				r = Gr(n.document);
			}
			return r;
		}
		function lf(n) {
			var r = n && n.nodeName && n.nodeName.toLowerCase();
			return (
				r &&
				((r === "input" &&
					(n.type === "text" ||
						n.type === "search" ||
						n.type === "tel" ||
						n.type === "url" ||
						n.type === "password")) ||
					r === "textarea" ||
					n.contentEditable === "true")
			);
		}
		var iw = E && "documentMode" in document && 11 >= document.documentMode,
			cu = null,
			sf = null,
			El = null,
			of = !1;
		function fv(n, r, a) {
			var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
			of ||
				cu == null ||
				cu !== Gr(l) ||
				((l = cu),
				"selectionStart" in l && lf(l)
					? (l = { start: l.selectionStart, end: l.selectionEnd })
					: ((l = ((l.ownerDocument && l.ownerDocument.defaultView) || window).getSelection()),
						(l = {
							anchorNode: l.anchorNode,
							anchorOffset: l.anchorOffset,
							focusNode: l.focusNode,
							focusOffset: l.focusOffset,
						})),
				(El && wl(El, l)) ||
					((El = l),
					(l = Co(sf, "onSelect")),
					0 < l.length &&
						((r = new lt("onSelect", "select", null, r, a)), n.push({ event: r, listeners: l }), (r.target = cu))));
		}
		function Aa(n, r) {
			var a = {};
			return ((a[n.toLowerCase()] = r.toLowerCase()), (a["Webkit" + n] = "webkit" + r), (a["Moz" + n] = "moz" + r), a);
		}
		var fu = {
				animationend: Aa("Animation", "AnimationEnd"),
				animationiteration: Aa("Animation", "AnimationIteration"),
				animationstart: Aa("Animation", "AnimationStart"),
				transitionrun: Aa("Transition", "TransitionRun"),
				transitionstart: Aa("Transition", "TransitionStart"),
				transitioncancel: Aa("Transition", "TransitionCancel"),
				transitionend: Aa("Transition", "TransitionEnd"),
			},
			cf = {},
			dv = {};
		E &&
			((dv = document.createElement("div").style),
			"AnimationEvent" in window ||
				(delete fu.animationend.animation, delete fu.animationiteration.animation, delete fu.animationstart.animation),
			"TransitionEvent" in window || delete fu.transitionend.transition);
		function Ra(n) {
			if (cf[n]) return cf[n];
			if (!fu[n]) return n;
			var r = fu[n],
				a;
			for (a in r) if (r.hasOwnProperty(a) && a in dv) return (cf[n] = r[a]);
			return n;
		}
		var hv = Ra("animationend"),
			mv = Ra("animationiteration"),
			vv = Ra("animationstart"),
			aw = Ra("transitionrun"),
			uw = Ra("transitionstart"),
			lw = Ra("transitioncancel"),
			gv = Ra("transitionend"),
			yv = new Map(),
			ff =
				"abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
					" ",
				);
		ff.push("scrollEnd");
		function Hr(n, r) {
			(yv.set(n, r), ve(r, [n]));
		}
		var $s =
				typeof reportError == "function"
					? reportError
					: function (n) {
							if (typeof window == "object" && typeof window.ErrorEvent == "function") {
								var r = new window.ErrorEvent("error", {
									bubbles: !0,
									cancelable: !0,
									message:
										typeof n == "object" && n !== null && typeof n.message == "string" ? String(n.message) : String(n),
									error: n,
								});
								if (!window.dispatchEvent(r)) return;
							} else if (typeof process == "object" && typeof process.emit == "function") {
								process.emit("uncaughtException", n);
								return;
							}
							console.error(n);
						},
			xr = [],
			du = 0,
			df = 0;
		function Bs() {
			for (var n = du, r = (df = du = 0); r < n; ) {
				var a = xr[r];
				xr[r++] = null;
				var l = xr[r];
				xr[r++] = null;
				var c = xr[r];
				xr[r++] = null;
				var d = xr[r];
				if (((xr[r++] = null), l !== null && c !== null)) {
					var y = l.pending;
					(y === null ? (c.next = c) : ((c.next = y.next), (y.next = c)), (l.pending = c));
				}
				d !== 0 && pv(a, c, d);
			}
		}
		function Vs(n, r, a, l) {
			((xr[du++] = n),
				(xr[du++] = r),
				(xr[du++] = a),
				(xr[du++] = l),
				(df |= l),
				(n.lanes |= l),
				(n = n.alternate),
				n !== null && (n.lanes |= l));
		}
		function hf(n, r, a, l) {
			return (Vs(n, r, a, l), Hs(n));
		}
		function Ca(n, r) {
			return (Vs(n, null, null, r), Hs(n));
		}
		function pv(n, r, a) {
			n.lanes |= a;
			var l = n.alternate;
			l !== null && (l.lanes |= a);
			for (var c = !1, d = n.return; d !== null; )
				((d.childLanes |= a),
					(l = d.alternate),
					l !== null && (l.childLanes |= a),
					d.tag === 22 && ((n = d.stateNode), n === null || n._visibility & 1 || (c = !0)),
					(n = d),
					(d = d.return));
			return n.tag === 3
				? ((d = n.stateNode),
					c &&
						r !== null &&
						((c = 31 - ct(a)),
						(n = d.hiddenUpdates),
						(l = n[c]),
						l === null ? (n[c] = [r]) : l.push(r),
						(r.lane = a | 536870912)),
					d)
				: null;
		}
		function Hs(n) {
			if (50 < Pl) throw ((Pl = 0), (wd = null), Error(s(185)));
			for (var r = n.return; r !== null; ) ((n = r), (r = n.return));
			return n.tag === 3 ? n.stateNode : null;
		}
		var hu = {};
		function sw(n, r, a, l) {
			((this.tag = n),
				(this.key = a),
				(this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
				(this.index = 0),
				(this.refCleanup = this.ref = null),
				(this.pendingProps = r),
				(this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
				(this.mode = l),
				(this.subtreeFlags = this.flags = 0),
				(this.deletions = null),
				(this.childLanes = this.lanes = 0),
				(this.alternate = null));
		}
		function cr(n, r, a, l) {
			return new sw(n, r, a, l);
		}
		function mf(n) {
			return ((n = n.prototype), !(!n || !n.isReactComponent));
		}
		function li(n, r) {
			var a = n.alternate;
			return (
				a === null
					? ((a = cr(n.tag, r, n.key, n.mode)),
						(a.elementType = n.elementType),
						(a.type = n.type),
						(a.stateNode = n.stateNode),
						(a.alternate = n),
						(n.alternate = a))
					: ((a.pendingProps = r), (a.type = n.type), (a.flags = 0), (a.subtreeFlags = 0), (a.deletions = null)),
				(a.flags = n.flags & 65011712),
				(a.childLanes = n.childLanes),
				(a.lanes = n.lanes),
				(a.child = n.child),
				(a.memoizedProps = n.memoizedProps),
				(a.memoizedState = n.memoizedState),
				(a.updateQueue = n.updateQueue),
				(r = n.dependencies),
				(a.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }),
				(a.sibling = n.sibling),
				(a.index = n.index),
				(a.ref = n.ref),
				(a.refCleanup = n.refCleanup),
				a
			);
		}
		function bv(n, r) {
			n.flags &= 65011714;
			var a = n.alternate;
			return (
				a === null
					? ((n.childLanes = 0),
						(n.lanes = r),
						(n.child = null),
						(n.subtreeFlags = 0),
						(n.memoizedProps = null),
						(n.memoizedState = null),
						(n.updateQueue = null),
						(n.dependencies = null),
						(n.stateNode = null))
					: ((n.childLanes = a.childLanes),
						(n.lanes = a.lanes),
						(n.child = a.child),
						(n.subtreeFlags = 0),
						(n.deletions = null),
						(n.memoizedProps = a.memoizedProps),
						(n.memoizedState = a.memoizedState),
						(n.updateQueue = a.updateQueue),
						(n.type = a.type),
						(r = a.dependencies),
						(n.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext })),
				n
			);
		}
		function Zs(n, r, a, l, c, d) {
			var y = 0;
			if (((l = n), typeof n == "function")) mf(n) && (y = 1);
			else if (typeof n == "string")
				y = m1(n, a, oe.current) ? 26 : n === "html" || n === "head" || n === "body" ? 27 : 5;
			else
				e: switch (n) {
					case V:
						return ((n = cr(31, a, r, c)), (n.elementType = V), (n.lanes = d), n);
					case N:
						return ka(a.children, c, d, r);
					case q:
						((y = 8), (c |= 24));
						break;
					case I:
						return ((n = cr(12, a, r, c | 2)), (n.elementType = I), (n.lanes = d), n);
					case Q:
						return ((n = cr(13, a, r, c)), (n.elementType = Q), (n.lanes = d), n);
					case K:
						return ((n = cr(19, a, r, c)), (n.elementType = K), (n.lanes = d), n);
					default:
						if (typeof n == "object" && n !== null)
							switch (n.$$typeof) {
								case k:
									y = 10;
									break e;
								case C:
									y = 9;
									break e;
								case L:
									y = 11;
									break e;
								case O:
									y = 14;
									break e;
								case $:
									((y = 16), (l = null));
									break e;
							}
						((y = 29), (a = Error(s(130, n === null ? "null" : typeof n, ""))), (l = null));
				}
			return ((r = cr(y, a, r, c)), (r.elementType = n), (r.type = l), (r.lanes = d), r);
		}
		function ka(n, r, a, l) {
			return ((n = cr(7, n, l, r)), (n.lanes = a), n);
		}
		function vf(n, r, a) {
			return ((n = cr(6, n, null, r)), (n.lanes = a), n);
		}
		function _v(n) {
			var r = cr(18, null, null, 0);
			return ((r.stateNode = n), r);
		}
		function gf(n, r, a) {
			return (
				(r = cr(4, n.children !== null ? n.children : [], n.key, r)),
				(r.lanes = a),
				(r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }),
				r
			);
		}
		var Sv = new WeakMap();
		function Ar(n, r) {
			if (typeof n == "object" && n !== null) {
				var a = Sv.get(n);
				return a !== void 0 ? a : ((r = { value: n, source: r, stack: Ve(r) }), Sv.set(n, r), r);
			}
			return { value: n, source: r, stack: Ve(r) };
		}
		var mu = [],
			vu = 0,
			Ps = null,
			Tl = 0,
			Rr = [],
			Cr = 0,
			Hi = null,
			Fr = 1,
			Xr = "";
		function si(n, r) {
			((mu[vu++] = Tl), (mu[vu++] = Ps), (Ps = n), (Tl = r));
		}
		function wv(n, r, a) {
			((Rr[Cr++] = Fr), (Rr[Cr++] = Xr), (Rr[Cr++] = Hi), (Hi = n));
			var l = Fr;
			n = Xr;
			var c = 32 - ct(l) - 1;
			((l &= ~(1 << c)), (a += 1));
			var d = 32 - ct(r) + c;
			if (30 < d) {
				var y = c - (c % 5);
				((d = (l & ((1 << y) - 1)).toString(32)),
					(l >>= y),
					(c -= y),
					(Fr = (1 << (32 - ct(r) + c)) | (a << c) | l),
					(Xr = d + n));
			} else ((Fr = (1 << d) | (a << c) | l), (Xr = n));
		}
		function yf(n) {
			n.return !== null && (si(n, 1), wv(n, 1, 0));
		}
		function pf(n) {
			for (; n === Ps; ) ((Ps = mu[--vu]), (mu[vu] = null), (Tl = mu[--vu]), (mu[vu] = null));
			for (; n === Hi; )
				((Hi = Rr[--Cr]), (Rr[Cr] = null), (Xr = Rr[--Cr]), (Rr[Cr] = null), (Fr = Rr[--Cr]), (Rr[Cr] = null));
		}
		function Ev(n, r) {
			((Rr[Cr++] = Fr), (Rr[Cr++] = Xr), (Rr[Cr++] = Hi), (Fr = r.id), (Xr = r.overflow), (Hi = n));
		}
		var En = null,
			Et = null,
			Je = !1,
			Zi = null,
			kr = !1,
			bf = Error(s(519));
		function Pi(n) {
			throw (
				xl(Ar(Error(s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), n)),
				bf
			);
		}
		function Tv(n) {
			var r = n.stateNode,
				a = n.type,
				l = n.memoizedProps;
			switch (((r[Dt] = n), (r[rn] = l), a)) {
				case "dialog":
					(Ze("cancel", r), Ze("close", r));
					break;
				case "iframe":
				case "object":
				case "embed":
					Ze("load", r);
					break;
				case "video":
				case "audio":
					for (a = 0; a < Kl.length; a++) Ze(Kl[a], r);
					break;
				case "source":
					Ze("error", r);
					break;
				case "img":
				case "image":
				case "link":
					(Ze("error", r), Ze("load", r));
					break;
				case "details":
					Ze("toggle", r);
					break;
				case "input":
					(Ze("invalid", r), Ds(r, l.value, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name, !0));
					break;
				case "select":
					Ze("invalid", r);
					break;
				case "textarea":
					(Ze("invalid", r), fl(r, l.value, l.defaultValue, l.children));
			}
			((a = l.children),
				(typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
				r.textContent === "" + a ||
				l.suppressHydrationWarning === !0 ||
				Uy(r.textContent, a)
					? (l.popover != null && (Ze("beforetoggle", r), Ze("toggle", r)),
						l.onScroll != null && Ze("scroll", r),
						l.onScrollEnd != null && Ze("scrollend", r),
						l.onClick != null && (r.onclick = On),
						(r = !0))
					: (r = !1),
				r || Pi(n, !0));
		}
		function xv(n) {
			for (En = n.return; En; )
				switch (En.tag) {
					case 5:
					case 31:
					case 13:
						kr = !1;
						return;
					case 27:
					case 3:
						kr = !0;
						return;
					default:
						En = En.return;
				}
		}
		function gu(n) {
			if (n !== En) return !1;
			if (!Je) return (xv(n), (Je = !0), !1);
			var r = n.tag,
				a;
			if (
				((a = r !== 3 && r !== 27) &&
					((a = r === 5) && ((a = n.type), (a = !(a !== "form" && a !== "button") || Id(n.type, n.memoizedProps))),
					(a = !a)),
				a && Et && Pi(n),
				xv(n),
				r === 13)
			) {
				if (((n = n.memoizedState), (n = n !== null ? n.dehydrated : null), !n)) throw Error(s(317));
				Et = Yy(n);
			} else if (r === 31) {
				if (((n = n.memoizedState), (n = n !== null ? n.dehydrated : null), !n)) throw Error(s(317));
				Et = Yy(n);
			} else
				r === 27
					? ((r = Et), ra(n.type) ? ((n = Bd), (Bd = null), (Et = n)) : (Et = r))
					: (Et = En ? Or(n.stateNode.nextSibling) : null);
			return !0;
		}
		function Ma() {
			((Et = En = null), (Je = !1));
		}
		function _f() {
			var n = Zi;
			return (n !== null && (Wn === null ? (Wn = n) : Wn.push.apply(Wn, n), (Zi = null)), n);
		}
		function xl(n) {
			Zi === null ? (Zi = [n]) : Zi.push(n);
		}
		var Sf = M(null),
			Na = null,
			oi = null;
		function Qi(n, r, a) {
			(le(Sf, r._currentValue), (r._currentValue = a));
		}
		function ci(n) {
			((n._currentValue = Sf.current), D(Sf));
		}
		function wf(n, r, a) {
			for (; n !== null; ) {
				var l = n.alternate;
				if (
					((n.childLanes & r) !== r
						? ((n.childLanes |= r), l !== null && (l.childLanes |= r))
						: l !== null && (l.childLanes & r) !== r && (l.childLanes |= r),
					n === a)
				)
					break;
				n = n.return;
			}
		}
		function Ef(n, r, a, l) {
			var c = n.child;
			for (c !== null && (c.return = n); c !== null; ) {
				var d = c.dependencies;
				if (d !== null) {
					var y = c.child;
					d = d.firstContext;
					e: for (; d !== null; ) {
						var x = d;
						d = c;
						for (var z = 0; z < r.length; z++)
							if (x.context === r[z]) {
								((d.lanes |= a), (x = d.alternate), x !== null && (x.lanes |= a), wf(d.return, a, n), l || (y = null));
								break e;
							}
						d = x.next;
					}
				} else if (c.tag === 18) {
					if (((y = c.return), y === null)) throw Error(s(341));
					((y.lanes |= a), (d = y.alternate), d !== null && (d.lanes |= a), wf(y, a, n), (y = null));
				} else y = c.child;
				if (y !== null) y.return = c;
				else
					for (y = c; y !== null; ) {
						if (y === n) {
							y = null;
							break;
						}
						if (((c = y.sibling), c !== null)) {
							((c.return = y.return), (y = c));
							break;
						}
						y = y.return;
					}
				c = y;
			}
		}
		function yu(n, r, a, l) {
			n = null;
			for (var c = r, d = !1; c !== null; ) {
				if (!d) {
					if ((c.flags & 524288) !== 0) d = !0;
					else if ((c.flags & 262144) !== 0) break;
				}
				if (c.tag === 10) {
					var y = c.alternate;
					if (y === null) throw Error(s(387));
					if (((y = y.memoizedProps), y !== null)) {
						var x = c.type;
						or(c.pendingProps.value, y.value) || (n !== null ? n.push(x) : (n = [x]));
					}
				} else if (c === Re.current) {
					if (((y = c.alternate), y === null)) throw Error(s(387));
					y.memoizedState.memoizedState !== c.memoizedState.memoizedState && (n !== null ? n.push(Jl) : (n = [Jl]));
				}
				c = c.return;
			}
			(n !== null && Ef(r, n, a, l), (r.flags |= 262144));
		}
		function Qs(n) {
			for (n = n.firstContext; n !== null; ) {
				if (!or(n.context._currentValue, n.memoizedValue)) return !0;
				n = n.next;
			}
			return !1;
		}
		function Oa(n) {
			((Na = n), (oi = null), (n = n.dependencies), n !== null && (n.firstContext = null));
		}
		function Tn(n) {
			return Av(Na, n);
		}
		function Ks(n, r) {
			return (Na === null && Oa(n), Av(n, r));
		}
		function Av(n, r) {
			var a = r._currentValue;
			if (((r = { context: r, memoizedValue: a, next: null }), oi === null)) {
				if (n === null) throw Error(s(308));
				((oi = r), (n.dependencies = { lanes: 0, firstContext: r }), (n.flags |= 524288));
			} else oi = oi.next = r;
			return a;
		}
		var ow =
				typeof AbortController < "u"
					? AbortController
					: function () {
							var n = [],
								r = (this.signal = {
									aborted: !1,
									addEventListener: function (a, l) {
										n.push(l);
									},
								});
							this.abort = function () {
								((r.aborted = !0),
									n.forEach(function (a) {
										return a();
									}));
							};
						},
			cw = t.unstable_scheduleCallback,
			fw = t.unstable_NormalPriority,
			un = { $$typeof: k, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
		function Tf() {
			return { controller: new ow(), data: new Map(), refCount: 0 };
		}
		function Al(n) {
			(n.refCount--,
				n.refCount === 0 &&
					cw(fw, function () {
						n.controller.abort();
					}));
		}
		var Rl = null,
			xf = 0,
			pu = 0,
			bu = null;
		function dw(n, r) {
			if (Rl === null) {
				var a = (Rl = []);
				((xf = 0),
					(pu = Cd()),
					(bu = {
						status: "pending",
						value: void 0,
						then: function (l) {
							a.push(l);
						},
					}));
			}
			return (xf++, r.then(Rv, Rv), r);
		}
		function Rv() {
			if (--xf === 0 && Rl !== null) {
				bu !== null && (bu.status = "fulfilled");
				var n = Rl;
				((Rl = null), (pu = 0), (bu = null));
				for (var r = 0; r < n.length; r++) (0, n[r])();
			}
		}
		function hw(n, r) {
			var a = [],
				l = {
					status: "pending",
					value: null,
					reason: null,
					then: function (c) {
						a.push(c);
					},
				};
			return (
				n.then(
					function () {
						((l.status = "fulfilled"), (l.value = r));
						for (var c = 0; c < a.length; c++) (0, a[c])(r);
					},
					function (c) {
						for (l.status = "rejected", l.reason = c, c = 0; c < a.length; c++) (0, a[c])(void 0);
					},
				),
				l
			);
		}
		var Cv = B.S;
		B.S = function (n, r) {
			((sy = Ne()),
				typeof r == "object" && r !== null && typeof r.then == "function" && dw(n, r),
				Cv !== null && Cv(n, r));
		};
		var za = M(null);
		function Af() {
			var n = za.current;
			return n !== null ? n : wt.pooledCache;
		}
		function Ys(n, r) {
			r === null ? le(za, za.current) : le(za, r.pool);
		}
		function kv() {
			var n = Af();
			return n === null ? null : { parent: un._currentValue, pool: n };
		}
		var _u = Error(s(460)),
			Rf = Error(s(474)),
			Gs = Error(s(542)),
			Fs = { then: function () {} };
		function Mv(n) {
			return ((n = n.status), n === "fulfilled" || n === "rejected");
		}
		function Nv(n, r, a) {
			switch (((a = n[a]), a === void 0 ? n.push(r) : a !== r && (r.then(On, On), (r = a)), r.status)) {
				case "fulfilled":
					return r.value;
				case "rejected":
					throw ((n = r.reason), zv(n), n);
				default:
					if (typeof r.status == "string") r.then(On, On);
					else {
						if (((n = wt), n !== null && 100 < n.shellSuspendCounter)) throw Error(s(482));
						((n = r),
							(n.status = "pending"),
							n.then(
								function (l) {
									if (r.status === "pending") {
										var c = r;
										((c.status = "fulfilled"), (c.value = l));
									}
								},
								function (l) {
									if (r.status === "pending") {
										var c = r;
										((c.status = "rejected"), (c.reason = l));
									}
								},
							));
					}
					switch (r.status) {
						case "fulfilled":
							return r.value;
						case "rejected":
							throw ((n = r.reason), zv(n), n);
					}
					throw ((ja = r), _u);
			}
		}
		function Da(n) {
			try {
				var r = n._init;
				return r(n._payload);
			} catch (a) {
				throw a !== null && typeof a == "object" && typeof a.then == "function" ? ((ja = a), _u) : a;
			}
		}
		var ja = null;
		function Ov() {
			if (ja === null) throw Error(s(459));
			var n = ja;
			return ((ja = null), n);
		}
		function zv(n) {
			if (n === _u || n === Gs) throw Error(s(483));
		}
		var Su = null,
			Cl = 0;
		function Xs(n) {
			var r = Cl;
			return ((Cl += 1), Su === null && (Su = []), Nv(Su, n, r));
		}
		function kl(n, r) {
			((r = r.props.ref), (n.ref = r !== void 0 ? r : null));
		}
		function Js(n, r) {
			throw r.$$typeof === p
				? Error(s(525))
				: ((n = Object.prototype.toString.call(r)),
					Error(s(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n)));
		}
		function Dv(n) {
			function r(Z, U) {
				if (n) {
					var G = Z.deletions;
					G === null ? ((Z.deletions = [U]), (Z.flags |= 16)) : G.push(U);
				}
			}
			function a(Z, U) {
				if (!n) return null;
				for (; U !== null; ) (r(Z, U), (U = U.sibling));
				return null;
			}
			function l(Z) {
				for (var U = new Map(); Z !== null; ) (Z.key !== null ? U.set(Z.key, Z) : U.set(Z.index, Z), (Z = Z.sibling));
				return U;
			}
			function c(Z, U) {
				return ((Z = li(Z, U)), (Z.index = 0), (Z.sibling = null), Z);
			}
			function d(Z, U, G) {
				return (
					(Z.index = G),
					n
						? ((G = Z.alternate),
							G !== null ? ((G = G.index), G < U ? ((Z.flags |= 67108866), U) : G) : ((Z.flags |= 67108866), U))
						: ((Z.flags |= 1048576), U)
				);
			}
			function y(Z) {
				return (n && Z.alternate === null && (Z.flags |= 67108866), Z);
			}
			function x(Z, U, G, ie) {
				return U === null || U.tag !== 6
					? ((U = vf(G, Z.mode, ie)), (U.return = Z), U)
					: ((U = c(U, G)), (U.return = Z), U);
			}
			function z(Z, U, G, ie) {
				var Ae = G.type;
				return Ae === N
					? ne(Z, U, G.props.children, ie, G.key)
					: U !== null &&
						  (U.elementType === Ae || (typeof Ae == "object" && Ae !== null && Ae.$$typeof === $ && Da(Ae) === U.type))
						? ((U = c(U, G.props)), kl(U, G), (U.return = Z), U)
						: ((U = Zs(G.type, G.key, G.props, null, Z.mode, ie)), kl(U, G), (U.return = Z), U);
			}
			function X(Z, U, G, ie) {
				return U === null ||
					U.tag !== 4 ||
					U.stateNode.containerInfo !== G.containerInfo ||
					U.stateNode.implementation !== G.implementation
					? ((U = gf(G, Z.mode, ie)), (U.return = Z), U)
					: ((U = c(U, G.children || [])), (U.return = Z), U);
			}
			function ne(Z, U, G, ie, Ae) {
				return U === null || U.tag !== 7
					? ((U = ka(G, Z.mode, ie, Ae)), (U.return = Z), U)
					: ((U = c(U, G)), (U.return = Z), U);
			}
			function ue(Z, U, G) {
				if ((typeof U == "string" && U !== "") || typeof U == "number" || typeof U == "bigint")
					return ((U = vf("" + U, Z.mode, G)), (U.return = Z), U);
				if (typeof U == "object" && U !== null) {
					switch (U.$$typeof) {
						case T:
							return ((G = Zs(U.type, U.key, U.props, null, Z.mode, G)), kl(G, U), (G.return = Z), G);
						case A:
							return ((U = gf(U, Z.mode, G)), (U.return = Z), U);
						case $:
							return ((U = Da(U)), ue(Z, U, G));
					}
					if (j(U) || se(U)) return ((U = ka(U, Z.mode, G, null)), (U.return = Z), U);
					if (typeof U.then == "function") return ue(Z, Xs(U), G);
					if (U.$$typeof === k) return ue(Z, Ks(Z, U), G);
					Js(Z, U);
				}
				return null;
			}
			function W(Z, U, G, ie) {
				var Ae = U !== null ? U.key : null;
				if ((typeof G == "string" && G !== "") || typeof G == "number" || typeof G == "bigint")
					return Ae !== null ? null : x(Z, U, "" + G, ie);
				if (typeof G == "object" && G !== null) {
					switch (G.$$typeof) {
						case T:
							return G.key === Ae ? z(Z, U, G, ie) : null;
						case A:
							return G.key === Ae ? X(Z, U, G, ie) : null;
						case $:
							return ((G = Da(G)), W(Z, U, G, ie));
					}
					if (j(G) || se(G)) return Ae !== null ? null : ne(Z, U, G, ie, null);
					if (typeof G.then == "function") return W(Z, U, Xs(G), ie);
					if (G.$$typeof === k) return W(Z, U, Ks(Z, G), ie);
					Js(Z, G);
				}
				return null;
			}
			function ee(Z, U, G, ie, Ae) {
				if ((typeof ie == "string" && ie !== "") || typeof ie == "number" || typeof ie == "bigint")
					return ((Z = Z.get(G) || null), x(U, Z, "" + ie, Ae));
				if (typeof ie == "object" && ie !== null) {
					switch (ie.$$typeof) {
						case T:
							return ((Z = Z.get(ie.key === null ? G : ie.key) || null), z(U, Z, ie, Ae));
						case A:
							return ((Z = Z.get(ie.key === null ? G : ie.key) || null), X(U, Z, ie, Ae));
						case $:
							return ((ie = Da(ie)), ee(Z, U, G, ie, Ae));
					}
					if (j(ie) || se(ie)) return ((Z = Z.get(G) || null), ne(U, Z, ie, Ae, null));
					if (typeof ie.then == "function") return ee(Z, U, G, Xs(ie), Ae);
					if (ie.$$typeof === k) return ee(Z, U, G, Ks(U, ie), Ae);
					Js(U, ie);
				}
				return null;
			}
			function _e(Z, U, G, ie) {
				for (var Ae = null, it = null, we = U, Ue = (U = 0), Ge = null; we !== null && Ue < G.length; Ue++) {
					we.index > Ue ? ((Ge = we), (we = null)) : (Ge = we.sibling);
					var at = W(Z, we, G[Ue], ie);
					if (at === null) {
						we === null && (we = Ge);
						break;
					}
					(n && we && at.alternate === null && r(Z, we),
						(U = d(at, U, Ue)),
						it === null ? (Ae = at) : (it.sibling = at),
						(it = at),
						(we = Ge));
				}
				if (Ue === G.length) return (a(Z, we), Je && si(Z, Ue), Ae);
				if (we === null) {
					for (; Ue < G.length; Ue++)
						((we = ue(Z, G[Ue], ie)),
							we !== null && ((U = d(we, U, Ue)), it === null ? (Ae = we) : (it.sibling = we), (it = we)));
					return (Je && si(Z, Ue), Ae);
				}
				for (we = l(we); Ue < G.length; Ue++)
					((Ge = ee(we, Z, Ue, G[Ue], ie)),
						Ge !== null &&
							(n && Ge.alternate !== null && we.delete(Ge.key === null ? Ue : Ge.key),
							(U = d(Ge, U, Ue)),
							it === null ? (Ae = Ge) : (it.sibling = Ge),
							(it = Ge)));
				return (
					n &&
						we.forEach(function (sa) {
							return r(Z, sa);
						}),
					Je && si(Z, Ue),
					Ae
				);
			}
			function ke(Z, U, G, ie) {
				if (G == null) throw Error(s(151));
				for (
					var Ae = null, it = null, we = U, Ue = (U = 0), Ge = null, at = G.next();
					we !== null && !at.done;
					Ue++, at = G.next()
				) {
					we.index > Ue ? ((Ge = we), (we = null)) : (Ge = we.sibling);
					var sa = W(Z, we, at.value, ie);
					if (sa === null) {
						we === null && (we = Ge);
						break;
					}
					(n && we && sa.alternate === null && r(Z, we),
						(U = d(sa, U, Ue)),
						it === null ? (Ae = sa) : (it.sibling = sa),
						(it = sa),
						(we = Ge));
				}
				if (at.done) return (a(Z, we), Je && si(Z, Ue), Ae);
				if (we === null) {
					for (; !at.done; Ue++, at = G.next())
						((at = ue(Z, at.value, ie)),
							at !== null && ((U = d(at, U, Ue)), it === null ? (Ae = at) : (it.sibling = at), (it = at)));
					return (Je && si(Z, Ue), Ae);
				}
				for (we = l(we); !at.done; Ue++, at = G.next())
					((at = ee(we, Z, Ue, at.value, ie)),
						at !== null &&
							(n && at.alternate !== null && we.delete(at.key === null ? Ue : at.key),
							(U = d(at, U, Ue)),
							it === null ? (Ae = at) : (it.sibling = at),
							(it = at)));
				return (
					n &&
						we.forEach(function (C1) {
							return r(Z, C1);
						}),
					Je && si(Z, Ue),
					Ae
				);
			}
			function gt(Z, U, G, ie) {
				if (
					(typeof G == "object" && G !== null && G.type === N && G.key === null && (G = G.props.children),
					typeof G == "object" && G !== null)
				) {
					switch (G.$$typeof) {
						case T:
							e: {
								for (var Ae = G.key; U !== null; ) {
									if (U.key === Ae) {
										if (((Ae = G.type), Ae === N)) {
											if (U.tag === 7) {
												(a(Z, U.sibling), (ie = c(U, G.props.children)), (ie.return = Z), (Z = ie));
												break e;
											}
										} else if (
											U.elementType === Ae ||
											(typeof Ae == "object" && Ae !== null && Ae.$$typeof === $ && Da(Ae) === U.type)
										) {
											(a(Z, U.sibling), (ie = c(U, G.props)), kl(ie, G), (ie.return = Z), (Z = ie));
											break e;
										}
										a(Z, U);
										break;
									} else r(Z, U);
									U = U.sibling;
								}
								G.type === N
									? ((ie = ka(G.props.children, Z.mode, ie, G.key)), (ie.return = Z), (Z = ie))
									: ((ie = Zs(G.type, G.key, G.props, null, Z.mode, ie)), kl(ie, G), (ie.return = Z), (Z = ie));
							}
							return y(Z);
						case A:
							e: {
								for (Ae = G.key; U !== null; ) {
									if (U.key === Ae)
										if (
											U.tag === 4 &&
											U.stateNode.containerInfo === G.containerInfo &&
											U.stateNode.implementation === G.implementation
										) {
											(a(Z, U.sibling), (ie = c(U, G.children || [])), (ie.return = Z), (Z = ie));
											break e;
										} else {
											a(Z, U);
											break;
										}
									else r(Z, U);
									U = U.sibling;
								}
								((ie = gf(G, Z.mode, ie)), (ie.return = Z), (Z = ie));
							}
							return y(Z);
						case $:
							return ((G = Da(G)), gt(Z, U, G, ie));
					}
					if (j(G)) return _e(Z, U, G, ie);
					if (se(G)) {
						if (((Ae = se(G)), typeof Ae != "function")) throw Error(s(150));
						return ((G = Ae.call(G)), ke(Z, U, G, ie));
					}
					if (typeof G.then == "function") return gt(Z, U, Xs(G), ie);
					if (G.$$typeof === k) return gt(Z, U, Ks(Z, G), ie);
					Js(Z, G);
				}
				return (typeof G == "string" && G !== "") || typeof G == "number" || typeof G == "bigint"
					? ((G = "" + G),
						U !== null && U.tag === 6
							? (a(Z, U.sibling), (ie = c(U, G)), (ie.return = Z), (Z = ie))
							: (a(Z, U), (ie = vf(G, Z.mode, ie)), (ie.return = Z), (Z = ie)),
						y(Z))
					: a(Z, U);
			}
			return function (Z, U, G, ie) {
				try {
					Cl = 0;
					var Ae = gt(Z, U, G, ie);
					return ((Su = null), Ae);
				} catch (we) {
					if (we === _u || we === Gs) throw we;
					var it = cr(29, we, null, Z.mode);
					return ((it.lanes = ie), (it.return = Z), it);
				}
			};
		}
		var Ia = Dv(!0),
			jv = Dv(!1),
			Ki = !1;
		function Cf(n) {
			n.updateQueue = {
				baseState: n.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: { pending: null, lanes: 0, hiddenCallbacks: null },
				callbacks: null,
			};
		}
		function kf(n, r) {
			((n = n.updateQueue),
				r.updateQueue === n &&
					(r.updateQueue = {
						baseState: n.baseState,
						firstBaseUpdate: n.firstBaseUpdate,
						lastBaseUpdate: n.lastBaseUpdate,
						shared: n.shared,
						callbacks: null,
					}));
		}
		function La(n) {
			return { lane: n, tag: 0, payload: null, callback: null, next: null };
		}
		function qa(n, r, a) {
			var l = n.updateQueue;
			if (l === null) return null;
			if (((l = l.shared), (st & 2) !== 0)) {
				var c = l.pending;
				return (
					c === null ? (r.next = r) : ((r.next = c.next), (c.next = r)),
					(l.pending = r),
					(r = Hs(n)),
					pv(n, null, a),
					r
				);
			}
			return (Vs(n, l, r, a), Hs(n));
		}
		function Ml(n, r, a) {
			if (((r = r.updateQueue), r !== null && ((r = r.shared), (a & 4194048) !== 0))) {
				var l = r.lanes;
				((l &= n.pendingLanes), (a |= l), (r.lanes = a), Qt(n, a));
			}
		}
		function Mf(n, r) {
			var a = n.updateQueue,
				l = n.alternate;
			if (l !== null && ((l = l.updateQueue), a === l)) {
				var c = null,
					d = null;
				if (((a = a.firstBaseUpdate), a !== null)) {
					do {
						var y = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
						(d === null ? (c = d = y) : (d = d.next = y), (a = a.next));
					} while (a !== null);
					d === null ? (c = d = r) : (d = d.next = r);
				} else c = d = r;
				((a = {
					baseState: l.baseState,
					firstBaseUpdate: c,
					lastBaseUpdate: d,
					shared: l.shared,
					callbacks: l.callbacks,
				}),
					(n.updateQueue = a));
				return;
			}
			((n = a.lastBaseUpdate), n === null ? (a.firstBaseUpdate = r) : (n.next = r), (a.lastBaseUpdate = r));
		}
		var Nf = !1;
		function Nl() {
			if (Nf) {
				var n = bu;
				if (n !== null) throw n;
			}
		}
		function Ol(n, r, a, l) {
			Nf = !1;
			var c = n.updateQueue;
			Ki = !1;
			var d = c.firstBaseUpdate,
				y = c.lastBaseUpdate,
				x = c.shared.pending;
			if (x !== null) {
				c.shared.pending = null;
				var z = x,
					X = z.next;
				((z.next = null), y === null ? (d = X) : (y.next = X), (y = z));
				var ne = n.alternate;
				ne !== null &&
					((ne = ne.updateQueue),
					(x = ne.lastBaseUpdate),
					x !== y && (x === null ? (ne.firstBaseUpdate = X) : (x.next = X), (ne.lastBaseUpdate = z)));
			}
			if (d !== null) {
				var ue = c.baseState;
				((y = 0), (ne = X = z = null), (x = d));
				do {
					var W = x.lane & -536870913,
						ee = W !== x.lane;
					if (ee ? (Ye & W) === W : (l & W) === W) {
						(W !== 0 && W === pu && (Nf = !0),
							ne !== null && (ne = ne.next = { lane: 0, tag: x.tag, payload: x.payload, callback: null, next: null }));
						e: {
							var _e = n,
								ke = x;
							W = r;
							var gt = a;
							switch (ke.tag) {
								case 1:
									if (((_e = ke.payload), typeof _e == "function")) {
										ue = _e.call(gt, ue, W);
										break e;
									}
									ue = _e;
									break e;
								case 3:
									_e.flags = (_e.flags & -65537) | 128;
								case 0:
									if (((_e = ke.payload), (W = typeof _e == "function" ? _e.call(gt, ue, W) : _e), W == null)) break e;
									ue = b({}, ue, W);
									break e;
								case 2:
									Ki = !0;
							}
						}
						((W = x.callback),
							W !== null &&
								((n.flags |= 64),
								ee && (n.flags |= 8192),
								(ee = c.callbacks),
								ee === null ? (c.callbacks = [W]) : ee.push(W)));
					} else
						((ee = { lane: W, tag: x.tag, payload: x.payload, callback: x.callback, next: null }),
							ne === null ? ((X = ne = ee), (z = ue)) : (ne = ne.next = ee),
							(y |= W));
					if (((x = x.next), x === null)) {
						if (((x = c.shared.pending), x === null)) break;
						((ee = x), (x = ee.next), (ee.next = null), (c.lastBaseUpdate = ee), (c.shared.pending = null));
					}
				} while (!0);
				(ne === null && (z = ue),
					(c.baseState = z),
					(c.firstBaseUpdate = X),
					(c.lastBaseUpdate = ne),
					d === null && (c.shared.lanes = 0),
					(Ji |= y),
					(n.lanes = y),
					(n.memoizedState = ue));
			}
		}
		function Iv(n, r) {
			if (typeof n != "function") throw Error(s(191, n));
			n.call(r);
		}
		function Lv(n, r) {
			var a = n.callbacks;
			if (a !== null) for (n.callbacks = null, n = 0; n < a.length; n++) Iv(a[n], r);
		}
		var wu = M(null),
			Ws = M(0);
		function qv(n, r) {
			((n = bi), le(Ws, n), le(wu, r), (bi = n | r.baseLanes));
		}
		function Of() {
			(le(Ws, bi), le(wu, wu.current));
		}
		function zf() {
			((bi = Ws.current), D(wu), D(Ws));
		}
		var fr = M(null),
			Mr = null;
		function Yi(n) {
			var r = n.alternate;
			(le(Gt, Gt.current & 1),
				le(fr, n),
				Mr === null && (r === null || wu.current !== null || r.memoizedState !== null) && (Mr = n));
		}
		function Df(n) {
			(le(Gt, Gt.current), le(fr, n), Mr === null && (Mr = n));
		}
		function Uv(n) {
			n.tag === 22 ? (le(Gt, Gt.current), le(fr, n), Mr === null && (Mr = n)) : Gi(n);
		}
		function Gi() {
			(le(Gt, Gt.current), le(fr, fr.current));
		}
		function dr(n) {
			(D(fr), Mr === n && (Mr = null), D(Gt));
		}
		var Gt = M(0);
		function eo(n) {
			for (var r = n; r !== null; ) {
				if (r.tag === 13) {
					var a = r.memoizedState;
					if (a !== null && ((a = a.dehydrated), a === null || Ud(a) || $d(a))) return r;
				} else if (
					r.tag === 19 &&
					(r.memoizedProps.revealOrder === "forwards" ||
						r.memoizedProps.revealOrder === "backwards" ||
						r.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
						r.memoizedProps.revealOrder === "together")
				) {
					if ((r.flags & 128) !== 0) return r;
				} else if (r.child !== null) {
					((r.child.return = r), (r = r.child));
					continue;
				}
				if (r === n) break;
				for (; r.sibling === null; ) {
					if (r.return === null || r.return === n) return null;
					r = r.return;
				}
				((r.sibling.return = r.return), (r = r.sibling));
			}
			return null;
		}
		var fi = 0,
			qe = null,
			mt = null,
			ln = null,
			to = !1,
			Eu = !1,
			Ua = !1,
			no = 0,
			zl = 0,
			Tu = null,
			mw = 0;
		function Ut() {
			throw Error(s(321));
		}
		function jf(n, r) {
			if (r === null) return !1;
			for (var a = 0; a < r.length && a < n.length; a++) if (!or(n[a], r[a])) return !1;
			return !0;
		}
		function If(n, r, a, l, c, d) {
			return (
				(fi = d),
				(qe = r),
				(r.memoizedState = null),
				(r.updateQueue = null),
				(r.lanes = 0),
				(B.H = n === null || n.memoizedState === null ? wg : Xf),
				(Ua = !1),
				(d = a(l, c)),
				(Ua = !1),
				Eu && (d = Bv(r, a, l, c)),
				$v(n),
				d
			);
		}
		function $v(n) {
			B.H = Il;
			var r = mt !== null && mt.next !== null;
			if (((fi = 0), (ln = mt = qe = null), (to = !1), (zl = 0), (Tu = null), r)) throw Error(s(300));
			n === null || sn || ((n = n.dependencies), n !== null && Qs(n) && (sn = !0));
		}
		function Bv(n, r, a, l) {
			qe = n;
			var c = 0;
			do {
				if ((Eu && (Tu = null), (zl = 0), (Eu = !1), 25 <= c)) throw Error(s(301));
				if (((c += 1), (ln = mt = null), n.updateQueue != null)) {
					var d = n.updateQueue;
					((d.lastEffect = null), (d.events = null), (d.stores = null), d.memoCache != null && (d.memoCache.index = 0));
				}
				((B.H = Eg), (d = r(a, l)));
			} while (Eu);
			return d;
		}
		function vw() {
			var n = B.H,
				r = n.useState()[0];
			return (
				(r = typeof r.then == "function" ? Dl(r) : r),
				(n = n.useState()[0]),
				(mt !== null ? mt.memoizedState : null) !== n && (qe.flags |= 1024),
				r
			);
		}
		function Lf() {
			var n = no !== 0;
			return ((no = 0), n);
		}
		function qf(n, r, a) {
			((r.updateQueue = n.updateQueue), (r.flags &= -2053), (n.lanes &= ~a));
		}
		function Uf(n) {
			if (to) {
				for (n = n.memoizedState; n !== null; ) {
					var r = n.queue;
					(r !== null && (r.pending = null), (n = n.next));
				}
				to = !1;
			}
			((fi = 0), (ln = mt = qe = null), (Eu = !1), (zl = no = 0), (Tu = null));
		}
		function Vn() {
			var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
			return (ln === null ? (qe.memoizedState = ln = n) : (ln = ln.next = n), ln);
		}
		function Ft() {
			if (mt === null) {
				var n = qe.alternate;
				n = n !== null ? n.memoizedState : null;
			} else n = mt.next;
			var r = ln === null ? qe.memoizedState : ln.next;
			if (r !== null) ((ln = r), (mt = n));
			else {
				if (n === null) throw qe.alternate === null ? Error(s(467)) : Error(s(310));
				((mt = n),
					(n = {
						memoizedState: mt.memoizedState,
						baseState: mt.baseState,
						baseQueue: mt.baseQueue,
						queue: mt.queue,
						next: null,
					}),
					ln === null ? (qe.memoizedState = ln = n) : (ln = ln.next = n));
			}
			return ln;
		}
		function ro() {
			return { lastEffect: null, events: null, stores: null, memoCache: null };
		}
		function Dl(n) {
			var r = zl;
			return (
				(zl += 1),
				Tu === null && (Tu = []),
				(n = Nv(Tu, n, r)),
				(r = qe),
				(ln === null ? r.memoizedState : ln.next) === null &&
					((r = r.alternate), (B.H = r === null || r.memoizedState === null ? wg : Xf)),
				n
			);
		}
		function io(n) {
			if (n !== null && typeof n == "object") {
				if (typeof n.then == "function") return Dl(n);
				if (n.$$typeof === k) return Tn(n);
			}
			throw Error(s(438, String(n)));
		}
		function $f(n) {
			var r = null,
				a = qe.updateQueue;
			if ((a !== null && (r = a.memoCache), r == null)) {
				var l = qe.alternate;
				l !== null &&
					((l = l.updateQueue),
					l !== null &&
						((l = l.memoCache),
						l != null &&
							(r = {
								data: l.data.map(function (c) {
									return c.slice();
								}),
								index: 0,
							})));
			}
			if (
				((r ??= { data: [], index: 0 }),
				a === null && ((a = ro()), (qe.updateQueue = a)),
				(a.memoCache = r),
				(a = r.data[r.index]),
				a === void 0)
			)
				for (a = r.data[r.index] = Array(n), l = 0; l < n; l++) a[l] = Y;
			return (r.index++, a);
		}
		function di(n, r) {
			return typeof r == "function" ? r(n) : r;
		}
		function ao(n) {
			return Bf(Ft(), mt, n);
		}
		function Bf(n, r, a) {
			var l = n.queue;
			if (l === null) throw Error(s(311));
			l.lastRenderedReducer = a;
			var c = n.baseQueue,
				d = l.pending;
			if (d !== null) {
				if (c !== null) {
					var y = c.next;
					((c.next = d.next), (d.next = y));
				}
				((r.baseQueue = c = d), (l.pending = null));
			}
			if (((d = n.baseState), c === null)) n.memoizedState = d;
			else {
				r = c.next;
				var x = (y = null),
					z = null,
					X = r,
					ne = !1;
				do {
					var ue = X.lane & -536870913;
					if (ue !== X.lane ? (Ye & ue) === ue : (fi & ue) === ue) {
						var W = X.revertLane;
						if (W === 0)
							(z !== null &&
								(z = z.next =
									{
										lane: 0,
										revertLane: 0,
										gesture: null,
										action: X.action,
										hasEagerState: X.hasEagerState,
										eagerState: X.eagerState,
										next: null,
									}),
								ue === pu && (ne = !0));
						else if ((fi & W) === W) {
							((X = X.next), W === pu && (ne = !0));
							continue;
						} else
							((ue = {
								lane: 0,
								revertLane: X.revertLane,
								gesture: null,
								action: X.action,
								hasEagerState: X.hasEagerState,
								eagerState: X.eagerState,
								next: null,
							}),
								z === null ? ((x = z = ue), (y = d)) : (z = z.next = ue),
								(qe.lanes |= W),
								(Ji |= W));
						((ue = X.action), Ua && a(d, ue), (d = X.hasEagerState ? X.eagerState : a(d, ue)));
					} else
						((W = {
							lane: ue,
							revertLane: X.revertLane,
							gesture: X.gesture,
							action: X.action,
							hasEagerState: X.hasEagerState,
							eagerState: X.eagerState,
							next: null,
						}),
							z === null ? ((x = z = W), (y = d)) : (z = z.next = W),
							(qe.lanes |= ue),
							(Ji |= ue));
					X = X.next;
				} while (X !== null && X !== r);
				if ((z === null ? (y = d) : (z.next = x), !or(d, n.memoizedState) && ((sn = !0), ne && ((a = bu), a !== null))))
					throw a;
				((n.memoizedState = d), (n.baseState = y), (n.baseQueue = z), (l.lastRenderedState = d));
			}
			return (c === null && (l.lanes = 0), [n.memoizedState, l.dispatch]);
		}
		function Vf(n) {
			var r = Ft(),
				a = r.queue;
			if (a === null) throw Error(s(311));
			a.lastRenderedReducer = n;
			var l = a.dispatch,
				c = a.pending,
				d = r.memoizedState;
			if (c !== null) {
				a.pending = null;
				var y = (c = c.next);
				do ((d = n(d, y.action)), (y = y.next));
				while (y !== c);
				(or(d, r.memoizedState) || (sn = !0),
					(r.memoizedState = d),
					r.baseQueue === null && (r.baseState = d),
					(a.lastRenderedState = d));
			}
			return [d, l];
		}
		function Vv(n, r, a) {
			var l = qe,
				c = Ft(),
				d = Je;
			if (d) {
				if (a === void 0) throw Error(s(407));
				a = a();
			} else a = r();
			var y = !or((mt || c).memoizedState, a);
			if (
				(y && ((c.memoizedState = a), (sn = !0)),
				(c = c.queue),
				Pf(Pv.bind(null, l, c, n), [n]),
				c.getSnapshot !== r || y || (ln !== null && ln.memoizedState.tag & 1))
			) {
				if (((l.flags |= 2048), xu(9, { destroy: void 0 }, Zv.bind(null, l, c, a, r), null), wt === null))
					throw Error(s(349));
				d || (fi & 127) !== 0 || Hv(l, r, a);
			}
			return a;
		}
		function Hv(n, r, a) {
			((n.flags |= 16384),
				(n = { getSnapshot: r, value: a }),
				(r = qe.updateQueue),
				r === null
					? ((r = ro()), (qe.updateQueue = r), (r.stores = [n]))
					: ((a = r.stores), a === null ? (r.stores = [n]) : a.push(n)));
		}
		function Zv(n, r, a, l) {
			((r.value = a), (r.getSnapshot = l), Qv(r) && Kv(n));
		}
		function Pv(n, r, a) {
			return a(function () {
				Qv(r) && Kv(n);
			});
		}
		function Qv(n) {
			var r = n.getSnapshot;
			n = n.value;
			try {
				var a = r();
				return !or(n, a);
			} catch {
				return !0;
			}
		}
		function Kv(n) {
			var r = Ca(n, 2);
			r !== null && er(r, n, 2);
		}
		function Hf(n) {
			var r = Vn();
			if (typeof n == "function") {
				var a = n;
				if (((n = a()), Ua)) {
					tn(!0);
					try {
						a();
					} finally {
						tn(!1);
					}
				}
			}
			return (
				(r.memoizedState = r.baseState = n),
				(r.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: di, lastRenderedState: n }),
				r
			);
		}
		function Yv(n, r, a, l) {
			return ((n.baseState = a), Bf(n, mt, typeof l == "function" ? l : di));
		}
		function gw(n, r, a, l, c) {
			if (so(n)) throw Error(s(485));
			if (((n = r.action), n !== null)) {
				var d = {
					payload: c,
					action: n,
					next: null,
					isTransition: !0,
					status: "pending",
					value: null,
					reason: null,
					listeners: [],
					then: function (y) {
						d.listeners.push(y);
					},
				};
				(B.T !== null ? a(!0) : (d.isTransition = !1),
					l(d),
					(a = r.pending),
					a === null ? ((d.next = r.pending = d), Gv(r, d)) : ((d.next = a.next), (r.pending = a.next = d)));
			}
		}
		function Gv(n, r) {
			var a = r.action,
				l = r.payload,
				c = n.state;
			if (r.isTransition) {
				var d = B.T,
					y = {};
				B.T = y;
				try {
					var x = a(c, l),
						z = B.S;
					(z !== null && z(y, x), Fv(n, r, x));
				} catch (X) {
					Zf(n, r, X);
				} finally {
					(d !== null && y.types !== null && (d.types = y.types), (B.T = d));
				}
			} else
				try {
					((d = a(c, l)), Fv(n, r, d));
				} catch (X) {
					Zf(n, r, X);
				}
		}
		function Fv(n, r, a) {
			a !== null && typeof a == "object" && typeof a.then == "function"
				? a.then(
						function (l) {
							Xv(n, r, l);
						},
						function (l) {
							return Zf(n, r, l);
						},
					)
				: Xv(n, r, a);
		}
		function Xv(n, r, a) {
			((r.status = "fulfilled"),
				(r.value = a),
				Jv(r),
				(n.state = a),
				(r = n.pending),
				r !== null && ((a = r.next), a === r ? (n.pending = null) : ((a = a.next), (r.next = a), Gv(n, a))));
		}
		function Zf(n, r, a) {
			var l = n.pending;
			if (((n.pending = null), l !== null)) {
				l = l.next;
				do ((r.status = "rejected"), (r.reason = a), Jv(r), (r = r.next));
				while (r !== l);
			}
			n.action = null;
		}
		function Jv(n) {
			n = n.listeners;
			for (var r = 0; r < n.length; r++) (0, n[r])();
		}
		function Wv(n, r) {
			return r;
		}
		function eg(n, r) {
			if (Je) {
				var a = wt.formState;
				if (a !== null) {
					e: {
						var l = qe;
						if (Je) {
							if (Et) {
								t: {
									for (var c = Et, d = kr; c.nodeType !== 8; ) {
										if (!d) {
											c = null;
											break t;
										}
										if (((c = Or(c.nextSibling)), c === null)) {
											c = null;
											break t;
										}
									}
									((d = c.data), (c = d === "F!" || d === "F" ? c : null));
								}
								if (c) {
									((Et = Or(c.nextSibling)), (l = c.data === "F!"));
									break e;
								}
							}
							Pi(l);
						}
						l = !1;
					}
					l && (r = a[0]);
				}
			}
			return (
				(a = Vn()),
				(a.memoizedState = a.baseState = r),
				(l = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Wv, lastRenderedState: r }),
				(a.queue = l),
				(a = bg.bind(null, qe, l)),
				(l.dispatch = a),
				(l = Hf(!1)),
				(d = Ff.bind(null, qe, !1, l.queue)),
				(l = Vn()),
				(c = { state: r, dispatch: null, action: n, pending: null }),
				(l.queue = c),
				(a = gw.bind(null, qe, c, d, a)),
				(c.dispatch = a),
				(l.memoizedState = n),
				[r, a, !1]
			);
		}
		function tg(n) {
			return ng(Ft(), mt, n);
		}
		function ng(n, r, a) {
			if (((r = Bf(n, r, Wv)[0]), (n = ao(di)[0]), typeof r == "object" && r !== null && typeof r.then == "function"))
				try {
					var l = Dl(r);
				} catch (y) {
					throw y === _u ? Gs : y;
				}
			else l = r;
			r = Ft();
			var c = r.queue,
				d = c.dispatch;
			return (
				a !== r.memoizedState && ((qe.flags |= 2048), xu(9, { destroy: void 0 }, yw.bind(null, c, a), null)),
				[l, d, n]
			);
		}
		function yw(n, r) {
			n.action = r;
		}
		function rg(n) {
			var r = Ft(),
				a = mt;
			if (a !== null) return ng(r, a, n);
			(Ft(), (r = r.memoizedState), (a = Ft()));
			var l = a.queue.dispatch;
			return ((a.memoizedState = n), [r, l, !1]);
		}
		function xu(n, r, a, l) {
			return (
				(n = { tag: n, create: a, deps: l, inst: r, next: null }),
				(r = qe.updateQueue),
				r === null && ((r = ro()), (qe.updateQueue = r)),
				(a = r.lastEffect),
				a === null ? (r.lastEffect = n.next = n) : ((l = a.next), (a.next = n), (n.next = l), (r.lastEffect = n)),
				n
			);
		}
		function ig() {
			return Ft().memoizedState;
		}
		function uo(n, r, a, l) {
			var c = Vn();
			((qe.flags |= n), (c.memoizedState = xu(1 | r, { destroy: void 0 }, a, l === void 0 ? null : l)));
		}
		function lo(n, r, a, l) {
			var c = Ft();
			l = l === void 0 ? null : l;
			var d = c.memoizedState.inst;
			mt !== null && l !== null && jf(l, mt.memoizedState.deps)
				? (c.memoizedState = xu(r, d, a, l))
				: ((qe.flags |= n), (c.memoizedState = xu(1 | r, d, a, l)));
		}
		function ag(n, r) {
			uo(8390656, 8, n, r);
		}
		function Pf(n, r) {
			lo(2048, 8, n, r);
		}
		function pw(n) {
			qe.flags |= 4;
			var r = qe.updateQueue;
			if (r === null) ((r = ro()), (qe.updateQueue = r), (r.events = [n]));
			else {
				var a = r.events;
				a === null ? (r.events = [n]) : a.push(n);
			}
		}
		function ug(n) {
			var r = Ft().memoizedState;
			return (
				pw({ ref: r, nextImpl: n }),
				function () {
					if ((st & 2) !== 0) throw Error(s(440));
					return r.impl.apply(void 0, arguments);
				}
			);
		}
		function lg(n, r) {
			return lo(4, 2, n, r);
		}
		function sg(n, r) {
			return lo(4, 4, n, r);
		}
		function og(n, r) {
			if (typeof r == "function") {
				n = n();
				var a = r(n);
				return function () {
					typeof a == "function" ? a() : r(null);
				};
			}
			if (r != null)
				return (
					(n = n()),
					(r.current = n),
					function () {
						r.current = null;
					}
				);
		}
		function cg(n, r, a) {
			((a = a != null ? a.concat([n]) : null), lo(4, 4, og.bind(null, r, n), a));
		}
		function Qf() {}
		function fg(n, r) {
			var a = Ft();
			r = r === void 0 ? null : r;
			var l = a.memoizedState;
			return r !== null && jf(r, l[1]) ? l[0] : ((a.memoizedState = [n, r]), n);
		}
		function dg(n, r) {
			var a = Ft();
			r = r === void 0 ? null : r;
			var l = a.memoizedState;
			if (r !== null && jf(r, l[1])) return l[0];
			if (((l = n()), Ua)) {
				tn(!0);
				try {
					n();
				} finally {
					tn(!1);
				}
			}
			return ((a.memoizedState = [l, r]), l);
		}
		function Kf(n, r, a) {
			return a === void 0 || ((fi & 1073741824) !== 0 && (Ye & 261930) === 0)
				? (n.memoizedState = r)
				: ((n.memoizedState = a), (n = cy()), (qe.lanes |= n), (Ji |= n), a);
		}
		function hg(n, r, a, l) {
			return or(a, r)
				? a
				: wu.current !== null
					? ((n = Kf(n, a, l)), or(n, r) || (sn = !0), n)
					: (fi & 42) === 0 || ((fi & 1073741824) !== 0 && (Ye & 261930) === 0)
						? ((sn = !0), (n.memoizedState = a))
						: ((n = cy()), (qe.lanes |= n), (Ji |= n), r);
		}
		function mg(n, r, a, l, c) {
			var d = P.p;
			P.p = d !== 0 && 8 > d ? d : 8;
			var y = B.T,
				x = {};
			((B.T = x), Ff(n, !1, r, a));
			try {
				var z = c(),
					X = B.S;
				(X !== null && X(x, z),
					z !== null && typeof z == "object" && typeof z.then == "function"
						? jl(n, r, hw(z, l), Nr(n))
						: jl(n, r, l, Nr(n)));
			} catch (ne) {
				jl(n, r, { then: function () {}, status: "rejected", reason: ne }, Nr());
			} finally {
				((P.p = d), y !== null && x.types !== null && (y.types = x.types), (B.T = y));
			}
		}
		function bw() {}
		function Yf(n, r, a, l) {
			if (n.tag !== 5) throw Error(s(476));
			var c = vg(n).queue;
			mg(
				n,
				c,
				r,
				ge,
				a === null
					? bw
					: function () {
							return (gg(n), a(l));
						},
			);
		}
		function vg(n) {
			var r = n.memoizedState;
			if (r !== null) return r;
			r = {
				memoizedState: ge,
				baseState: ge,
				baseQueue: null,
				queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: di, lastRenderedState: ge },
				next: null,
			};
			var a = {};
			return (
				(r.next = {
					memoizedState: a,
					baseState: a,
					baseQueue: null,
					queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: di, lastRenderedState: a },
					next: null,
				}),
				(n.memoizedState = r),
				(n = n.alternate),
				n !== null && (n.memoizedState = r),
				r
			);
		}
		function gg(n) {
			var r = vg(n);
			(r.next === null && (r = n.alternate.memoizedState), jl(n, r.next.queue, {}, Nr()));
		}
		function Gf() {
			return Tn(Jl);
		}
		function yg() {
			return Ft().memoizedState;
		}
		function pg() {
			return Ft().memoizedState;
		}
		function _w(n) {
			for (var r = n.return; r !== null; ) {
				switch (r.tag) {
					case 24:
					case 3:
						var a = Nr();
						n = La(a);
						var l = qa(r, n, a);
						(l !== null && (er(l, r, a), Ml(l, r, a)), (r = { cache: Tf() }), (n.payload = r));
						return;
				}
				r = r.return;
			}
		}
		function Sw(n, r, a) {
			var l = Nr();
			((a = { lane: l, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null }),
				so(n) ? _g(r, a) : ((a = hf(n, r, a, l)), a !== null && (er(a, n, l), Sg(a, r, l))));
		}
		function bg(n, r, a) {
			jl(n, r, a, Nr());
		}
		function jl(n, r, a, l) {
			var c = { lane: l, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null };
			if (so(n)) _g(r, c);
			else {
				var d = n.alternate;
				if (n.lanes === 0 && (d === null || d.lanes === 0) && ((d = r.lastRenderedReducer), d !== null))
					try {
						var y = r.lastRenderedState,
							x = d(y, a);
						if (((c.hasEagerState = !0), (c.eagerState = x), or(x, y)))
							return (Vs(n, r, c, 0), wt === null && Bs(), !1);
					} catch {}
				if (((a = hf(n, r, c, l)), a !== null)) return (er(a, n, l), Sg(a, r, l), !0);
			}
			return !1;
		}
		function Ff(n, r, a, l) {
			if (
				((l = { lane: 2, revertLane: Cd(), gesture: null, action: l, hasEagerState: !1, eagerState: null, next: null }),
				so(n))
			) {
				if (r) throw Error(s(479));
			} else ((r = hf(n, a, l, 2)), r !== null && er(r, n, 2));
		}
		function so(n) {
			var r = n.alternate;
			return n === qe || (r !== null && r === qe);
		}
		function _g(n, r) {
			Eu = to = !0;
			var a = n.pending;
			(a === null ? (r.next = r) : ((r.next = a.next), (a.next = r)), (n.pending = r));
		}
		function Sg(n, r, a) {
			if ((a & 4194048) !== 0) {
				var l = r.lanes;
				((l &= n.pendingLanes), (a |= l), (r.lanes = a), Qt(n, a));
			}
		}
		var Il = {
			readContext: Tn,
			use: io,
			useCallback: Ut,
			useContext: Ut,
			useEffect: Ut,
			useImperativeHandle: Ut,
			useLayoutEffect: Ut,
			useInsertionEffect: Ut,
			useMemo: Ut,
			useReducer: Ut,
			useRef: Ut,
			useState: Ut,
			useDebugValue: Ut,
			useDeferredValue: Ut,
			useTransition: Ut,
			useSyncExternalStore: Ut,
			useId: Ut,
			useHostTransitionStatus: Ut,
			useFormState: Ut,
			useActionState: Ut,
			useOptimistic: Ut,
			useMemoCache: Ut,
			useCacheRefresh: Ut,
		};
		Il.useEffectEvent = Ut;
		var wg = {
				readContext: Tn,
				use: io,
				useCallback: function (n, r) {
					return ((Vn().memoizedState = [n, r === void 0 ? null : r]), n);
				},
				useContext: Tn,
				useEffect: ag,
				useImperativeHandle: function (n, r, a) {
					((a = a != null ? a.concat([n]) : null), uo(4194308, 4, og.bind(null, r, n), a));
				},
				useLayoutEffect: function (n, r) {
					return uo(4194308, 4, n, r);
				},
				useInsertionEffect: function (n, r) {
					uo(4, 2, n, r);
				},
				useMemo: function (n, r) {
					var a = Vn();
					r = r === void 0 ? null : r;
					var l = n();
					if (Ua) {
						tn(!0);
						try {
							n();
						} finally {
							tn(!1);
						}
					}
					return ((a.memoizedState = [l, r]), l);
				},
				useReducer: function (n, r, a) {
					var l = Vn();
					if (a !== void 0) {
						var c = a(r);
						if (Ua) {
							tn(!0);
							try {
								a(r);
							} finally {
								tn(!1);
							}
						}
					} else c = r;
					return (
						(l.memoizedState = l.baseState = c),
						(n = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: c }),
						(l.queue = n),
						(n = n.dispatch = Sw.bind(null, qe, n)),
						[l.memoizedState, n]
					);
				},
				useRef: function (n) {
					var r = Vn();
					return ((n = { current: n }), (r.memoizedState = n));
				},
				useState: function (n) {
					n = Hf(n);
					var r = n.queue,
						a = bg.bind(null, qe, r);
					return ((r.dispatch = a), [n.memoizedState, a]);
				},
				useDebugValue: Qf,
				useDeferredValue: function (n, r) {
					return Kf(Vn(), n, r);
				},
				useTransition: function () {
					var n = Hf(!1);
					return ((n = mg.bind(null, qe, n.queue, !0, !1)), (Vn().memoizedState = n), [!1, n]);
				},
				useSyncExternalStore: function (n, r, a) {
					var l = qe,
						c = Vn();
					if (Je) {
						if (a === void 0) throw Error(s(407));
						a = a();
					} else {
						if (((a = r()), wt === null)) throw Error(s(349));
						(Ye & 127) !== 0 || Hv(l, r, a);
					}
					c.memoizedState = a;
					var d = { value: a, getSnapshot: r };
					return (
						(c.queue = d),
						ag(Pv.bind(null, l, d, n), [n]),
						(l.flags |= 2048),
						xu(9, { destroy: void 0 }, Zv.bind(null, l, d, a, r), null),
						a
					);
				},
				useId: function () {
					var n = Vn(),
						r = wt.identifierPrefix;
					if (Je) {
						var a = Xr,
							l = Fr;
						((a = (l & ~(1 << (32 - ct(l) - 1))).toString(32) + a),
							(r = "_" + r + "R_" + a),
							(a = no++),
							0 < a && (r += "H" + a.toString(32)),
							(r += "_"));
					} else ((a = mw++), (r = "_" + r + "r_" + a.toString(32) + "_"));
					return (n.memoizedState = r);
				},
				useHostTransitionStatus: Gf,
				useFormState: eg,
				useActionState: eg,
				useOptimistic: function (n) {
					var r = Vn();
					r.memoizedState = r.baseState = n;
					var a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
					return ((r.queue = a), (r = Ff.bind(null, qe, !0, a)), (a.dispatch = r), [n, r]);
				},
				useMemoCache: $f,
				useCacheRefresh: function () {
					return (Vn().memoizedState = _w.bind(null, qe));
				},
				useEffectEvent: function (n) {
					var r = Vn(),
						a = { impl: n };
					return (
						(r.memoizedState = a),
						function () {
							if ((st & 2) !== 0) throw Error(s(440));
							return a.impl.apply(void 0, arguments);
						}
					);
				},
			},
			Xf = {
				readContext: Tn,
				use: io,
				useCallback: fg,
				useContext: Tn,
				useEffect: Pf,
				useImperativeHandle: cg,
				useInsertionEffect: lg,
				useLayoutEffect: sg,
				useMemo: dg,
				useReducer: ao,
				useRef: ig,
				useState: function () {
					return ao(di);
				},
				useDebugValue: Qf,
				useDeferredValue: function (n, r) {
					return hg(Ft(), mt.memoizedState, n, r);
				},
				useTransition: function () {
					var n = ao(di)[0],
						r = Ft().memoizedState;
					return [typeof n == "boolean" ? n : Dl(n), r];
				},
				useSyncExternalStore: Vv,
				useId: yg,
				useHostTransitionStatus: Gf,
				useFormState: tg,
				useActionState: tg,
				useOptimistic: function (n, r) {
					return Yv(Ft(), mt, n, r);
				},
				useMemoCache: $f,
				useCacheRefresh: pg,
			};
		Xf.useEffectEvent = ug;
		var Eg = {
			readContext: Tn,
			use: io,
			useCallback: fg,
			useContext: Tn,
			useEffect: Pf,
			useImperativeHandle: cg,
			useInsertionEffect: lg,
			useLayoutEffect: sg,
			useMemo: dg,
			useReducer: Vf,
			useRef: ig,
			useState: function () {
				return Vf(di);
			},
			useDebugValue: Qf,
			useDeferredValue: function (n, r) {
				var a = Ft();
				return mt === null ? Kf(a, n, r) : hg(a, mt.memoizedState, n, r);
			},
			useTransition: function () {
				var n = Vf(di)[0],
					r = Ft().memoizedState;
				return [typeof n == "boolean" ? n : Dl(n), r];
			},
			useSyncExternalStore: Vv,
			useId: yg,
			useHostTransitionStatus: Gf,
			useFormState: rg,
			useActionState: rg,
			useOptimistic: function (n, r) {
				var a = Ft();
				return mt !== null ? Yv(a, mt, n, r) : ((a.baseState = n), [n, a.queue.dispatch]);
			},
			useMemoCache: $f,
			useCacheRefresh: pg,
		};
		Eg.useEffectEvent = ug;
		function Jf(n, r, a, l) {
			((r = n.memoizedState),
				(a = a(l, r)),
				(a = a == null ? r : b({}, r, a)),
				(n.memoizedState = a),
				n.lanes === 0 && (n.updateQueue.baseState = a));
		}
		var Wf = {
			enqueueSetState: function (n, r, a) {
				n = n._reactInternals;
				var l = Nr(),
					c = La(l);
				((c.payload = r), a != null && (c.callback = a), (r = qa(n, c, l)), r !== null && (er(r, n, l), Ml(r, n, l)));
			},
			enqueueReplaceState: function (n, r, a) {
				n = n._reactInternals;
				var l = Nr(),
					c = La(l);
				((c.tag = 1),
					(c.payload = r),
					a != null && (c.callback = a),
					(r = qa(n, c, l)),
					r !== null && (er(r, n, l), Ml(r, n, l)));
			},
			enqueueForceUpdate: function (n, r) {
				n = n._reactInternals;
				var a = Nr(),
					l = La(a);
				((l.tag = 2), r != null && (l.callback = r), (r = qa(n, l, a)), r !== null && (er(r, n, a), Ml(r, n, a)));
			},
		};
		function Tg(n, r, a, l, c, d, y) {
			return (
				(n = n.stateNode),
				typeof n.shouldComponentUpdate == "function"
					? n.shouldComponentUpdate(l, d, y)
					: r.prototype && r.prototype.isPureReactComponent
						? !wl(a, l) || !wl(c, d)
						: !0
			);
		}
		function xg(n, r, a, l) {
			((n = r.state),
				typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(a, l),
				typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(a, l),
				r.state !== n && Wf.enqueueReplaceState(r, r.state, null));
		}
		function $a(n, r) {
			var a = r;
			if ("ref" in r) {
				a = {};
				for (var l in r) l !== "ref" && (a[l] = r[l]);
			}
			if ((n = n.defaultProps)) {
				a === r && (a = b({}, a));
				for (var c in n) a[c] === void 0 && (a[c] = n[c]);
			}
			return a;
		}
		function ww(n) {
			$s(n);
		}
		function Ew(n) {
			console.error(n);
		}
		function Tw(n) {
			$s(n);
		}
		function oo(n, r) {
			try {
				var a = n.onUncaughtError;
				a(r.value, { componentStack: r.stack });
			} catch (l) {
				setTimeout(function () {
					throw l;
				});
			}
		}
		function Ag(n, r, a) {
			try {
				var l = n.onCaughtError;
				l(a.value, { componentStack: a.stack, errorBoundary: r.tag === 1 ? r.stateNode : null });
			} catch (c) {
				setTimeout(function () {
					throw c;
				});
			}
		}
		function ed(n, r, a) {
			return (
				(a = La(a)),
				(a.tag = 3),
				(a.payload = { element: null }),
				(a.callback = function () {
					oo(n, r);
				}),
				a
			);
		}
		function Rg(n) {
			return ((n = La(n)), (n.tag = 3), n);
		}
		function Cg(n, r, a, l) {
			var c = a.type.getDerivedStateFromError;
			if (typeof c == "function") {
				var d = l.value;
				((n.payload = function () {
					return c(d);
				}),
					(n.callback = function () {
						Ag(r, a, l);
					}));
			}
			var y = a.stateNode;
			y !== null &&
				typeof y.componentDidCatch == "function" &&
				(n.callback = function () {
					(Ag(r, a, l), typeof c != "function" && (Wi === null ? (Wi = new Set([this])) : Wi.add(this)));
					var x = l.stack;
					this.componentDidCatch(l.value, { componentStack: x !== null ? x : "" });
				});
		}
		function xw(n, r, a, l, c) {
			if (((a.flags |= 32768), l !== null && typeof l == "object" && typeof l.then == "function")) {
				if (((r = a.alternate), r !== null && yu(r, a, c, !0), (a = fr.current), a !== null)) {
					switch (a.tag) {
						case 31:
						case 13:
							return (
								Mr === null ? wo() : a.alternate === null && $t === 0 && ($t = 3),
								(a.flags &= -257),
								(a.flags |= 65536),
								(a.lanes = c),
								l === Fs
									? (a.flags |= 16384)
									: ((r = a.updateQueue), r === null ? (a.updateQueue = new Set([l])) : r.add(l), xd(n, l, c)),
								!1
							);
						case 22:
							return (
								(a.flags |= 65536),
								l === Fs
									? (a.flags |= 16384)
									: ((r = a.updateQueue),
										r === null
											? ((r = { transitions: null, markerInstances: null, retryQueue: new Set([l]) }),
												(a.updateQueue = r))
											: ((a = r.retryQueue), a === null ? (r.retryQueue = new Set([l])) : a.add(l)),
										xd(n, l, c)),
								!1
							);
					}
					throw Error(s(435, a.tag));
				}
				return (xd(n, l, c), wo(), !1);
			}
			if (Je)
				return (
					(r = fr.current),
					r !== null
						? ((r.flags & 65536) === 0 && (r.flags |= 256),
							(r.flags |= 65536),
							(r.lanes = c),
							l !== bf && ((n = Error(s(422), { cause: l })), xl(Ar(n, a))))
						: (l !== bf && ((r = Error(s(423), { cause: l })), xl(Ar(r, a))),
							(n = n.current.alternate),
							(n.flags |= 65536),
							(c &= -c),
							(n.lanes |= c),
							(l = Ar(l, a)),
							(c = ed(n.stateNode, l, c)),
							Mf(n, c),
							$t !== 4 && ($t = 2)),
					!1
				);
			var d = Error(s(520), { cause: l });
			if (((d = Ar(d, a)), Zl === null ? (Zl = [d]) : Zl.push(d), $t !== 4 && ($t = 2), r === null)) return !0;
			((l = Ar(l, a)), (a = r));
			do {
				switch (a.tag) {
					case 3:
						return ((a.flags |= 65536), (n = c & -c), (a.lanes |= n), (n = ed(a.stateNode, l, n)), Mf(a, n), !1);
					case 1:
						if (
							((r = a.type),
							(d = a.stateNode),
							(a.flags & 128) === 0 &&
								(typeof r.getDerivedStateFromError == "function" ||
									(d !== null && typeof d.componentDidCatch == "function" && (Wi === null || !Wi.has(d)))))
						)
							return ((a.flags |= 65536), (c &= -c), (a.lanes |= c), (c = Rg(c)), Cg(c, n, a, l), Mf(a, c), !1);
				}
				a = a.return;
			} while (a !== null);
			return !1;
		}
		var td = Error(s(461)),
			sn = !1;
		function xn(n, r, a, l) {
			r.child = n === null ? jv(r, null, a, l) : Ia(r, n.child, a, l);
		}
		function kg(n, r, a, l, c) {
			a = a.render;
			var d = r.ref;
			if ("ref" in l) {
				var y = {};
				for (var x in l) x !== "ref" && (y[x] = l[x]);
			} else y = l;
			return (
				Oa(r),
				(l = If(n, r, a, y, d, c)),
				(x = Lf()),
				n !== null && !sn ? (qf(n, r, c), hi(n, r, c)) : (Je && x && yf(r), (r.flags |= 1), xn(n, r, l, c), r.child)
			);
		}
		function Mg(n, r, a, l, c) {
			if (n === null) {
				var d = a.type;
				return typeof d == "function" && !mf(d) && d.defaultProps === void 0 && a.compare === null
					? ((r.tag = 15), (r.type = d), Ng(n, r, d, l, c))
					: ((n = Zs(a.type, null, l, r, r.mode, c)), (n.ref = r.ref), (n.return = r), (r.child = n));
			}
			if (((d = n.child), !od(n, c))) {
				var y = d.memoizedProps;
				if (((a = a.compare), (a = a !== null ? a : wl), a(y, l) && n.ref === r.ref)) return hi(n, r, c);
			}
			return ((r.flags |= 1), (n = li(d, l)), (n.ref = r.ref), (n.return = r), (r.child = n));
		}
		function Ng(n, r, a, l, c) {
			if (n !== null) {
				var d = n.memoizedProps;
				if (wl(d, l) && n.ref === r.ref)
					if (((sn = !1), (r.pendingProps = l = d), od(n, c))) (n.flags & 131072) !== 0 && (sn = !0);
					else return ((r.lanes = n.lanes), hi(n, r, c));
			}
			return nd(n, r, a, l, c);
		}
		function Og(n, r, a, l) {
			var c = l.children,
				d = n !== null ? n.memoizedState : null;
			if (
				(n === null &&
					r.stateNode === null &&
					(r.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				l.mode === "hidden")
			) {
				if ((r.flags & 128) !== 0) {
					if (((d = d !== null ? d.baseLanes | a : a), n !== null)) {
						for (l = r.child = n.child, c = 0; l !== null; ) ((c = c | l.lanes | l.childLanes), (l = l.sibling));
						l = c & ~d;
					} else ((l = 0), (r.child = null));
					return zg(n, r, d, a, l);
				}
				if ((a & 536870912) !== 0)
					((r.memoizedState = { baseLanes: 0, cachePool: null }),
						n !== null && Ys(r, d !== null ? d.cachePool : null),
						d !== null ? qv(r, d) : Of(),
						Uv(r));
				else return ((l = r.lanes = 536870912), zg(n, r, d !== null ? d.baseLanes | a : a, a, l));
			} else
				d !== null
					? (Ys(r, d.cachePool), qv(r, d), Gi(r), (r.memoizedState = null))
					: (n !== null && Ys(r, null), Of(), Gi(r));
			return (xn(n, r, c, a), r.child);
		}
		function Ll(n, r) {
			return (
				(n !== null && n.tag === 22) ||
					r.stateNode !== null ||
					(r.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				r.sibling
			);
		}
		function zg(n, r, a, l, c) {
			var d = Af();
			return (
				(d = d === null ? null : { parent: un._currentValue, pool: d }),
				(r.memoizedState = { baseLanes: a, cachePool: d }),
				n !== null && Ys(r, null),
				Of(),
				Uv(r),
				n !== null && yu(n, r, l, !0),
				(r.childLanes = c),
				null
			);
		}
		function co(n, r) {
			return (
				(r = ho({ mode: r.mode, children: r.children }, n.mode)),
				(r.ref = n.ref),
				(n.child = r),
				(r.return = n),
				r
			);
		}
		function Dg(n, r, a) {
			return (Ia(r, n.child, null, a), (n = co(r, r.pendingProps)), (n.flags |= 2), dr(r), (r.memoizedState = null), n);
		}
		function Aw(n, r, a) {
			var l = r.pendingProps,
				c = (r.flags & 128) !== 0;
			if (((r.flags &= -129), n === null)) {
				if (Je) {
					if (l.mode === "hidden") return ((n = co(r, l)), (r.lanes = 536870912), Ll(null, n));
					if (
						(Df(r),
						(n = Et)
							? ((n = Ky(n, kr)),
								(n = n !== null && n.data === "&" ? n : null),
								n !== null &&
									((r.memoizedState = {
										dehydrated: n,
										treeContext: Hi !== null ? { id: Fr, overflow: Xr } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = _v(n)),
									(a.return = r),
									(r.child = a),
									(En = r),
									(Et = null)))
							: (n = null),
						n === null)
					)
						throw Pi(r);
					return ((r.lanes = 536870912), null);
				}
				return co(r, l);
			}
			var d = n.memoizedState;
			if (d !== null) {
				var y = d.dehydrated;
				if ((Df(r), c))
					if (r.flags & 256) ((r.flags &= -257), (r = Dg(n, r, a)));
					else if (r.memoizedState !== null) ((r.child = n.child), (r.flags |= 128), (r = null));
					else throw Error(s(558));
				else if ((sn || yu(n, r, a, !1), (c = (a & n.childLanes) !== 0), sn || c)) {
					if (((l = wt), l !== null && ((y = Sa(l, a)), y !== 0 && y !== d.retryLane)))
						throw ((d.retryLane = y), Ca(n, y), er(l, n, y), td);
					(wo(), (r = Dg(n, r, a)));
				} else
					((n = d.treeContext),
						(Et = Or(y.nextSibling)),
						(En = r),
						(Je = !0),
						(Zi = null),
						(kr = !1),
						n !== null && Ev(r, n),
						(r = co(r, l)),
						(r.flags |= 4096));
				return r;
			}
			return (
				(n = li(n.child, { mode: l.mode, children: l.children })),
				(n.ref = r.ref),
				(r.child = n),
				(n.return = r),
				n
			);
		}
		function fo(n, r) {
			var a = r.ref;
			if (a === null) n !== null && n.ref !== null && (r.flags |= 4194816);
			else {
				if (typeof a != "function" && typeof a != "object") throw Error(s(284));
				(n === null || n.ref !== a) && (r.flags |= 4194816);
			}
		}
		function nd(n, r, a, l, c) {
			return (
				Oa(r),
				(a = If(n, r, a, l, void 0, c)),
				(l = Lf()),
				n !== null && !sn ? (qf(n, r, c), hi(n, r, c)) : (Je && l && yf(r), (r.flags |= 1), xn(n, r, a, c), r.child)
			);
		}
		function jg(n, r, a, l, c, d) {
			return (
				Oa(r),
				(r.updateQueue = null),
				(a = Bv(r, l, a, c)),
				$v(n),
				(l = Lf()),
				n !== null && !sn ? (qf(n, r, d), hi(n, r, d)) : (Je && l && yf(r), (r.flags |= 1), xn(n, r, a, d), r.child)
			);
		}
		function Ig(n, r, a, l, c) {
			if ((Oa(r), r.stateNode === null)) {
				var d = hu,
					y = a.contextType;
				(typeof y == "object" && y !== null && (d = Tn(y)),
					(d = new a(l, d)),
					(r.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null),
					(d.updater = Wf),
					(r.stateNode = d),
					(d._reactInternals = r),
					(d = r.stateNode),
					(d.props = l),
					(d.state = r.memoizedState),
					(d.refs = {}),
					Cf(r),
					(y = a.contextType),
					(d.context = typeof y == "object" && y !== null ? Tn(y) : hu),
					(d.state = r.memoizedState),
					(y = a.getDerivedStateFromProps),
					typeof y == "function" && (Jf(r, a, y, l), (d.state = r.memoizedState)),
					typeof a.getDerivedStateFromProps == "function" ||
						typeof d.getSnapshotBeforeUpdate == "function" ||
						(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
						((y = d.state),
						typeof d.componentWillMount == "function" && d.componentWillMount(),
						typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(),
						y !== d.state && Wf.enqueueReplaceState(d, d.state, null),
						Ol(r, l, d, c),
						Nl(),
						(d.state = r.memoizedState)),
					typeof d.componentDidMount == "function" && (r.flags |= 4194308),
					(l = !0));
			} else if (n === null) {
				d = r.stateNode;
				var x = r.memoizedProps,
					z = $a(a, x);
				d.props = z;
				var X = d.context,
					ne = a.contextType;
				((y = hu), typeof ne == "object" && ne !== null && (y = Tn(ne)));
				var ue = a.getDerivedStateFromProps;
				((ne = typeof ue == "function" || typeof d.getSnapshotBeforeUpdate == "function"),
					(x = r.pendingProps !== x),
					ne ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((x || X !== y) && xg(r, d, l, y)),
					(Ki = !1));
				var W = r.memoizedState;
				((d.state = W),
					Ol(r, l, d, c),
					Nl(),
					(X = r.memoizedState),
					x || W !== X || Ki
						? (typeof ue == "function" && (Jf(r, a, ue, l), (X = r.memoizedState)),
							(z = Ki || Tg(r, a, z, l, W, X, y))
								? (ne ||
										(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
										(typeof d.componentWillMount == "function" && d.componentWillMount(),
										typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()),
									typeof d.componentDidMount == "function" && (r.flags |= 4194308))
								: (typeof d.componentDidMount == "function" && (r.flags |= 4194308),
									(r.memoizedProps = l),
									(r.memoizedState = X)),
							(d.props = l),
							(d.state = X),
							(d.context = y),
							(l = z))
						: (typeof d.componentDidMount == "function" && (r.flags |= 4194308), (l = !1)));
			} else {
				((d = r.stateNode),
					kf(n, r),
					(y = r.memoizedProps),
					(ne = $a(a, y)),
					(d.props = ne),
					(ue = r.pendingProps),
					(W = d.context),
					(X = a.contextType),
					(z = hu),
					typeof X == "object" && X !== null && (z = Tn(X)),
					(x = a.getDerivedStateFromProps),
					(X = typeof x == "function" || typeof d.getSnapshotBeforeUpdate == "function") ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((y !== ue || W !== z) && xg(r, d, l, z)),
					(Ki = !1),
					(W = r.memoizedState),
					(d.state = W),
					Ol(r, l, d, c),
					Nl());
				var ee = r.memoizedState;
				y !== ue || W !== ee || Ki || (n !== null && n.dependencies !== null && Qs(n.dependencies))
					? (typeof x == "function" && (Jf(r, a, x, l), (ee = r.memoizedState)),
						(ne = Ki || Tg(r, a, ne, l, W, ee, z) || (n !== null && n.dependencies !== null && Qs(n.dependencies)))
							? (X ||
									(typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function") ||
									(typeof d.componentWillUpdate == "function" && d.componentWillUpdate(l, ee, z),
									typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(l, ee, z)),
								typeof d.componentDidUpdate == "function" && (r.flags |= 4),
								typeof d.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024))
							: (typeof d.componentDidUpdate != "function" ||
									(y === n.memoizedProps && W === n.memoizedState) ||
									(r.flags |= 4),
								typeof d.getSnapshotBeforeUpdate != "function" ||
									(y === n.memoizedProps && W === n.memoizedState) ||
									(r.flags |= 1024),
								(r.memoizedProps = l),
								(r.memoizedState = ee)),
						(d.props = l),
						(d.state = ee),
						(d.context = z),
						(l = ne))
					: (typeof d.componentDidUpdate != "function" ||
							(y === n.memoizedProps && W === n.memoizedState) ||
							(r.flags |= 4),
						typeof d.getSnapshotBeforeUpdate != "function" ||
							(y === n.memoizedProps && W === n.memoizedState) ||
							(r.flags |= 1024),
						(l = !1));
			}
			return (
				(d = l),
				fo(n, r),
				(l = (r.flags & 128) !== 0),
				d || l
					? ((d = r.stateNode),
						(a = l && typeof a.getDerivedStateFromError != "function" ? null : d.render()),
						(r.flags |= 1),
						n !== null && l ? ((r.child = Ia(r, n.child, null, c)), (r.child = Ia(r, null, a, c))) : xn(n, r, a, c),
						(r.memoizedState = d.state),
						(n = r.child))
					: (n = hi(n, r, c)),
				n
			);
		}
		function Lg(n, r, a, l) {
			return (Ma(), (r.flags |= 256), xn(n, r, a, l), r.child);
		}
		var rd = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
		function id(n) {
			return { baseLanes: n, cachePool: kv() };
		}
		function ad(n, r, a) {
			return ((n = n !== null ? n.childLanes & ~a : 0), r && (n |= mr), n);
		}
		function qg(n, r, a) {
			var l = r.pendingProps,
				c = !1,
				d = (r.flags & 128) !== 0,
				y;
			if (
				((y = d) || (y = n !== null && n.memoizedState === null ? !1 : (Gt.current & 2) !== 0),
				y && ((c = !0), (r.flags &= -129)),
				(y = (r.flags & 32) !== 0),
				(r.flags &= -33),
				n === null)
			) {
				if (Je) {
					if (
						(c ? Yi(r) : Gi(r),
						(n = Et)
							? ((n = Ky(n, kr)),
								(n = n !== null && n.data !== "&" ? n : null),
								n !== null &&
									((r.memoizedState = {
										dehydrated: n,
										treeContext: Hi !== null ? { id: Fr, overflow: Xr } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = _v(n)),
									(a.return = r),
									(r.child = a),
									(En = r),
									(Et = null)))
							: (n = null),
						n === null)
					)
						throw Pi(r);
					return ($d(n) ? (r.lanes = 32) : (r.lanes = 536870912), null);
				}
				var x = l.children;
				return (
					(l = l.fallback),
					c
						? (Gi(r),
							(c = r.mode),
							(x = ho({ mode: "hidden", children: x }, c)),
							(l = ka(l, c, a, null)),
							(x.return = r),
							(l.return = r),
							(x.sibling = l),
							(r.child = x),
							(l = r.child),
							(l.memoizedState = id(a)),
							(l.childLanes = ad(n, y, a)),
							(r.memoizedState = rd),
							Ll(null, l))
						: (Yi(r), ud(r, x))
				);
			}
			var z = n.memoizedState;
			if (z !== null && ((x = z.dehydrated), x !== null)) {
				if (d)
					r.flags & 256
						? (Yi(r), (r.flags &= -257), (r = ld(n, r, a)))
						: r.memoizedState !== null
							? (Gi(r), (r.child = n.child), (r.flags |= 128), (r = null))
							: (Gi(r),
								(x = l.fallback),
								(c = r.mode),
								(l = ho({ mode: "visible", children: l.children }, c)),
								(x = ka(x, c, a, null)),
								(x.flags |= 2),
								(l.return = r),
								(x.return = r),
								(l.sibling = x),
								(r.child = l),
								Ia(r, n.child, null, a),
								(l = r.child),
								(l.memoizedState = id(a)),
								(l.childLanes = ad(n, y, a)),
								(r.memoizedState = rd),
								(r = Ll(null, l)));
				else if ((Yi(r), $d(x))) {
					if (((y = x.nextSibling && x.nextSibling.dataset), y)) var X = y.dgst;
					((y = X),
						(l = Error(s(419))),
						(l.stack = ""),
						(l.digest = y),
						xl({ value: l, source: null, stack: null }),
						(r = ld(n, r, a)));
				} else if ((sn || yu(n, r, a, !1), (y = (a & n.childLanes) !== 0), sn || y)) {
					if (((y = wt), y !== null && ((l = Sa(y, a)), l !== 0 && l !== z.retryLane)))
						throw ((z.retryLane = l), Ca(n, l), er(y, n, l), td);
					(Ud(x) || wo(), (r = ld(n, r, a)));
				} else
					Ud(x)
						? ((r.flags |= 192), (r.child = n.child), (r = null))
						: ((n = z.treeContext),
							(Et = Or(x.nextSibling)),
							(En = r),
							(Je = !0),
							(Zi = null),
							(kr = !1),
							n !== null && Ev(r, n),
							(r = ud(r, l.children)),
							(r.flags |= 4096));
				return r;
			}
			return c
				? (Gi(r),
					(x = l.fallback),
					(c = r.mode),
					(z = n.child),
					(X = z.sibling),
					(l = li(z, { mode: "hidden", children: l.children })),
					(l.subtreeFlags = z.subtreeFlags & 65011712),
					X !== null ? (x = li(X, x)) : ((x = ka(x, c, a, null)), (x.flags |= 2)),
					(x.return = r),
					(l.return = r),
					(l.sibling = x),
					(r.child = l),
					Ll(null, l),
					(l = r.child),
					(x = n.child.memoizedState),
					x === null
						? (x = id(a))
						: ((c = x.cachePool),
							c !== null ? ((z = un._currentValue), (c = c.parent !== z ? { parent: z, pool: z } : c)) : (c = kv()),
							(x = { baseLanes: x.baseLanes | a, cachePool: c })),
					(l.memoizedState = x),
					(l.childLanes = ad(n, y, a)),
					(r.memoizedState = rd),
					Ll(n.child, l))
				: (Yi(r),
					(a = n.child),
					(n = a.sibling),
					(a = li(a, { mode: "visible", children: l.children })),
					(a.return = r),
					(a.sibling = null),
					n !== null && ((y = r.deletions), y === null ? ((r.deletions = [n]), (r.flags |= 16)) : y.push(n)),
					(r.child = a),
					(r.memoizedState = null),
					a);
		}
		function ud(n, r) {
			return ((r = ho({ mode: "visible", children: r }, n.mode)), (r.return = n), (n.child = r));
		}
		function ho(n, r) {
			return ((n = cr(22, n, null, r)), (n.lanes = 0), n);
		}
		function ld(n, r, a) {
			return (
				Ia(r, n.child, null, a),
				(n = ud(r, r.pendingProps.children)),
				(n.flags |= 2),
				(r.memoizedState = null),
				n
			);
		}
		function Ug(n, r, a) {
			n.lanes |= r;
			var l = n.alternate;
			(l !== null && (l.lanes |= r), wf(n.return, r, a));
		}
		function sd(n, r, a, l, c, d) {
			var y = n.memoizedState;
			y === null
				? (n.memoizedState = {
						isBackwards: r,
						rendering: null,
						renderingStartTime: 0,
						last: l,
						tail: a,
						tailMode: c,
						treeForkCount: d,
					})
				: ((y.isBackwards = r),
					(y.rendering = null),
					(y.renderingStartTime = 0),
					(y.last = l),
					(y.tail = a),
					(y.tailMode = c),
					(y.treeForkCount = d));
		}
		function $g(n, r, a) {
			var l = r.pendingProps,
				c = l.revealOrder,
				d = l.tail;
			l = l.children;
			var y = Gt.current,
				x = (y & 2) !== 0;
			if (
				(x ? ((y = (y & 1) | 2), (r.flags |= 128)) : (y &= 1),
				le(Gt, y),
				xn(n, r, l, a),
				(l = Je ? Tl : 0),
				!x && n !== null && (n.flags & 128) !== 0)
			)
				e: for (n = r.child; n !== null; ) {
					if (n.tag === 13) n.memoizedState !== null && Ug(n, a, r);
					else if (n.tag === 19) Ug(n, a, r);
					else if (n.child !== null) {
						((n.child.return = n), (n = n.child));
						continue;
					}
					if (n === r) break e;
					for (; n.sibling === null; ) {
						if (n.return === null || n.return === r) break e;
						n = n.return;
					}
					((n.sibling.return = n.return), (n = n.sibling));
				}
			switch (c) {
				case "forwards":
					for (a = r.child, c = null; a !== null; )
						((n = a.alternate), n !== null && eo(n) === null && (c = a), (a = a.sibling));
					((a = c),
						a === null ? ((c = r.child), (r.child = null)) : ((c = a.sibling), (a.sibling = null)),
						sd(r, !1, c, a, d, l));
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (a = null, c = r.child, r.child = null; c !== null; ) {
						if (((n = c.alternate), n !== null && eo(n) === null)) {
							r.child = c;
							break;
						}
						((n = c.sibling), (c.sibling = a), (a = c), (c = n));
					}
					sd(r, !0, a, null, d, l);
					break;
				case "together":
					sd(r, !1, null, null, void 0, l);
					break;
				default:
					r.memoizedState = null;
			}
			return r.child;
		}
		function hi(n, r, a) {
			if ((n !== null && (r.dependencies = n.dependencies), (Ji |= r.lanes), (a & r.childLanes) === 0))
				if (n !== null) {
					if ((yu(n, r, a, !1), (a & r.childLanes) === 0)) return null;
				} else return null;
			if (n !== null && r.child !== n.child) throw Error(s(153));
			if (r.child !== null) {
				for (n = r.child, a = li(n, n.pendingProps), r.child = a, a.return = r; n.sibling !== null; )
					((n = n.sibling), (a = a.sibling = li(n, n.pendingProps)), (a.return = r));
				a.sibling = null;
			}
			return r.child;
		}
		function od(n, r) {
			return (n.lanes & r) !== 0 ? !0 : ((n = n.dependencies), !!(n !== null && Qs(n)));
		}
		function Rw(n, r, a) {
			switch (r.tag) {
				case 3:
					(Le(r, r.stateNode.containerInfo), Qi(r, un, n.memoizedState.cache), Ma());
					break;
				case 27:
				case 5:
					pt(r);
					break;
				case 4:
					Le(r, r.stateNode.containerInfo);
					break;
				case 10:
					Qi(r, r.type, r.memoizedProps.value);
					break;
				case 31:
					if (r.memoizedState !== null) return ((r.flags |= 128), Df(r), null);
					break;
				case 13:
					var l = r.memoizedState;
					if (l !== null)
						return l.dehydrated !== null
							? (Yi(r), (r.flags |= 128), null)
							: (a & r.child.childLanes) !== 0
								? qg(n, r, a)
								: (Yi(r), (n = hi(n, r, a)), n !== null ? n.sibling : null);
					Yi(r);
					break;
				case 19:
					var c = (n.flags & 128) !== 0;
					if (((l = (a & r.childLanes) !== 0), l || (yu(n, r, a, !1), (l = (a & r.childLanes) !== 0)), c)) {
						if (l) return $g(n, r, a);
						r.flags |= 128;
					}
					if (
						((c = r.memoizedState),
						c !== null && ((c.rendering = null), (c.tail = null), (c.lastEffect = null)),
						le(Gt, Gt.current),
						l)
					)
						break;
					return null;
				case 22:
					return ((r.lanes = 0), Og(n, r, a, r.pendingProps));
				case 24:
					Qi(r, un, n.memoizedState.cache);
			}
			return hi(n, r, a);
		}
		function Bg(n, r, a) {
			if (n !== null)
				if (n.memoizedProps !== r.pendingProps) sn = !0;
				else {
					if (!od(n, a) && (r.flags & 128) === 0) return ((sn = !1), Rw(n, r, a));
					sn = (n.flags & 131072) !== 0;
				}
			else ((sn = !1), Je && (r.flags & 1048576) !== 0 && wv(r, Tl, r.index));
			switch (((r.lanes = 0), r.tag)) {
				case 16:
					e: {
						var l = r.pendingProps;
						if (((n = Da(r.elementType)), (r.type = n), typeof n == "function"))
							mf(n)
								? ((l = $a(n, l)), (r.tag = 1), (r = Ig(null, r, n, l, a)))
								: ((r.tag = 0), (r = nd(null, r, n, l, a)));
						else {
							if (n != null) {
								var c = n.$$typeof;
								if (c === L) {
									((r.tag = 11), (r = kg(null, r, n, l, a)));
									break e;
								} else if (c === O) {
									((r.tag = 14), (r = Mg(null, r, n, l, a)));
									break e;
								}
							}
							throw ((r = fe(n) || n), Error(s(306, r, "")));
						}
					}
					return r;
				case 0:
					return nd(n, r, r.type, r.pendingProps, a);
				case 1:
					return ((l = r.type), (c = $a(l, r.pendingProps)), Ig(n, r, l, c, a));
				case 3:
					e: {
						if ((Le(r, r.stateNode.containerInfo), n === null)) throw Error(s(387));
						l = r.pendingProps;
						var d = r.memoizedState;
						((c = d.element), kf(n, r), Ol(r, l, null, a));
						var y = r.memoizedState;
						if (
							((l = y.cache), Qi(r, un, l), l !== d.cache && Ef(r, [un], a, !0), Nl(), (l = y.element), d.isDehydrated)
						)
							if (
								((d = { element: l, isDehydrated: !1, cache: y.cache }),
								(r.updateQueue.baseState = d),
								(r.memoizedState = d),
								r.flags & 256)
							) {
								r = Lg(n, r, l, a);
								break e;
							} else if (l !== c) {
								((c = Ar(Error(s(424)), r)), xl(c), (r = Lg(n, r, l, a)));
								break e;
							} else {
								switch (((n = r.stateNode.containerInfo), n.nodeType)) {
									case 9:
										n = n.body;
										break;
									default:
										n = n.nodeName === "HTML" ? n.ownerDocument.body : n;
								}
								for (
									Et = Or(n.firstChild), En = r, Je = !0, Zi = null, kr = !0, a = jv(r, null, l, a), r.child = a;
									a;
								)
									((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
							}
						else {
							if ((Ma(), l === c)) {
								r = hi(n, r, a);
								break e;
							}
							xn(n, r, l, a);
						}
						r = r.child;
					}
					return r;
				case 26:
					return (
						fo(n, r),
						n === null
							? (a = Wy(r.type, null, r.pendingProps, null))
								? (r.memoizedState = a)
								: Je ||
									((a = r.type),
									(n = r.pendingProps),
									(l = ko(Se.current).createElement(a)),
									(l[Dt] = r),
									(l[rn] = n),
									An(l, a, n),
									Rt(l),
									(r.stateNode = l))
							: (r.memoizedState = Wy(r.type, n.memoizedProps, r.pendingProps, n.memoizedState)),
						null
					);
				case 27:
					return (
						pt(r),
						n === null &&
							Je &&
							((l = r.stateNode = Fy(r.type, r.pendingProps, Se.current)),
							(En = r),
							(kr = !0),
							(c = Et),
							ra(r.type) ? ((Bd = c), (Et = Or(l.firstChild))) : (Et = c)),
						xn(n, r, r.pendingProps.children, a),
						fo(n, r),
						n === null && (r.flags |= 4194304),
						r.child
					);
				case 5:
					return (
						n === null &&
							Je &&
							((c = l = Et) &&
								((l = t1(l, r.type, r.pendingProps, kr)),
								l !== null ? ((r.stateNode = l), (En = r), (Et = Or(l.firstChild)), (kr = !1), (c = !0)) : (c = !1)),
							c || Pi(r)),
						pt(r),
						(c = r.type),
						(d = r.pendingProps),
						(y = n !== null ? n.memoizedProps : null),
						(l = d.children),
						Id(c, d) ? (l = null) : y !== null && Id(c, y) && (r.flags |= 32),
						r.memoizedState !== null && ((c = If(n, r, vw, null, null, a)), (Jl._currentValue = c)),
						fo(n, r),
						xn(n, r, l, a),
						r.child
					);
				case 6:
					return (
						n === null &&
							Je &&
							((n = a = Et) &&
								((a = n1(a, r.pendingProps, kr)),
								a !== null ? ((r.stateNode = a), (En = r), (Et = null), (n = !0)) : (n = !1)),
							n || Pi(r)),
						null
					);
				case 13:
					return qg(n, r, a);
				case 4:
					return (
						Le(r, r.stateNode.containerInfo),
						(l = r.pendingProps),
						n === null ? (r.child = Ia(r, null, l, a)) : xn(n, r, l, a),
						r.child
					);
				case 11:
					return kg(n, r, r.type, r.pendingProps, a);
				case 7:
					return (xn(n, r, r.pendingProps, a), r.child);
				case 8:
					return (xn(n, r, r.pendingProps.children, a), r.child);
				case 12:
					return (xn(n, r, r.pendingProps.children, a), r.child);
				case 10:
					return ((l = r.pendingProps), Qi(r, r.type, l.value), xn(n, r, l.children, a), r.child);
				case 9:
					return (
						(c = r.type._context),
						(l = r.pendingProps.children),
						Oa(r),
						(c = Tn(c)),
						(l = l(c)),
						(r.flags |= 1),
						xn(n, r, l, a),
						r.child
					);
				case 14:
					return Mg(n, r, r.type, r.pendingProps, a);
				case 15:
					return Ng(n, r, r.type, r.pendingProps, a);
				case 19:
					return $g(n, r, a);
				case 31:
					return Aw(n, r, a);
				case 22:
					return Og(n, r, a, r.pendingProps);
				case 24:
					return (
						Oa(r),
						(l = Tn(un)),
						n === null
							? ((c = Af()),
								c === null &&
									((c = wt),
									(d = Tf()),
									(c.pooledCache = d),
									d.refCount++,
									d !== null && (c.pooledCacheLanes |= a),
									(c = d)),
								(r.memoizedState = { parent: l, cache: c }),
								Cf(r),
								Qi(r, un, c))
							: ((n.lanes & a) !== 0 && (kf(n, r), Ol(r, null, null, a), Nl()),
								(c = n.memoizedState),
								(d = r.memoizedState),
								c.parent !== l
									? ((c = { parent: l, cache: l }),
										(r.memoizedState = c),
										r.lanes === 0 && (r.memoizedState = r.updateQueue.baseState = c),
										Qi(r, un, l))
									: ((l = d.cache), Qi(r, un, l), l !== c.cache && Ef(r, [un], a, !0))),
						xn(n, r, r.pendingProps.children, a),
						r.child
					);
				case 29:
					throw r.pendingProps;
			}
			throw Error(s(156, r.tag));
		}
		function mi(n) {
			n.flags |= 4;
		}
		function cd(n, r, a, l, c) {
			if (((r = (n.mode & 32) !== 0) && (r = !1), r)) {
				if (((n.flags |= 16777216), (c & 335544128) === c))
					if (n.stateNode.complete) n.flags |= 8192;
					else if (my()) n.flags |= 8192;
					else throw ((ja = Fs), Rf);
			} else n.flags &= -16777217;
		}
		function Vg(n, r) {
			if (r.type !== "stylesheet" || (r.state.loading & 4) !== 0) n.flags &= -16777217;
			else if (((n.flags |= 16777216), !ip(r)))
				if (my()) n.flags |= 8192;
				else throw ((ja = Fs), Rf);
		}
		function mo(n, r) {
			(r !== null && (n.flags |= 4),
				n.flags & 16384 && ((r = n.tag !== 22 ? lr() : 536870912), (n.lanes |= r), (ku |= r)));
		}
		function ql(n, r) {
			if (!Je)
				switch (n.tailMode) {
					case "hidden":
						r = n.tail;
						for (var a = null; r !== null; ) (r.alternate !== null && (a = r), (r = r.sibling));
						a === null ? (n.tail = null) : (a.sibling = null);
						break;
					case "collapsed":
						a = n.tail;
						for (var l = null; a !== null; ) (a.alternate !== null && (l = a), (a = a.sibling));
						l === null ? (r || n.tail === null ? (n.tail = null) : (n.tail.sibling = null)) : (l.sibling = null);
				}
		}
		function Tt(n) {
			var r = n.alternate !== null && n.alternate.child === n.child,
				a = 0,
				l = 0;
			if (r)
				for (var c = n.child; c !== null; )
					((a |= c.lanes | c.childLanes),
						(l |= c.subtreeFlags & 65011712),
						(l |= c.flags & 65011712),
						(c.return = n),
						(c = c.sibling));
			else
				for (c = n.child; c !== null; )
					((a |= c.lanes | c.childLanes), (l |= c.subtreeFlags), (l |= c.flags), (c.return = n), (c = c.sibling));
			return ((n.subtreeFlags |= l), (n.childLanes = a), r);
		}
		function Cw(n, r, a) {
			var l = r.pendingProps;
			switch ((pf(r), r.tag)) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14:
					return (Tt(r), null);
				case 1:
					return (Tt(r), null);
				case 3:
					return (
						(a = r.stateNode),
						(l = null),
						n !== null && (l = n.memoizedState.cache),
						r.memoizedState.cache !== l && (r.flags |= 2048),
						ci(un),
						Xe(),
						a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
						(n === null || n.child === null) &&
							(gu(r)
								? mi(r)
								: n === null || (n.memoizedState.isDehydrated && (r.flags & 256) === 0) || ((r.flags |= 1024), _f())),
						Tt(r),
						null
					);
				case 26:
					var c = r.type,
						d = r.memoizedState;
					return (
						n === null
							? (mi(r), d !== null ? (Tt(r), Vg(r, d)) : (Tt(r), cd(r, c, null, l, a)))
							: d
								? d !== n.memoizedState
									? (mi(r), Tt(r), Vg(r, d))
									: (Tt(r), (r.flags &= -16777217))
								: ((n = n.memoizedProps), n !== l && mi(r), Tt(r), cd(r, c, n, l, a)),
						null
					);
				case 27:
					if ((At(r), (a = Se.current), (c = r.type), n !== null && r.stateNode != null))
						n.memoizedProps !== l && mi(r);
					else {
						if (!l) {
							if (r.stateNode === null) throw Error(s(166));
							return (Tt(r), null);
						}
						((n = oe.current), gu(r) ? Tv(r, n) : ((n = Fy(c, l, a)), (r.stateNode = n), mi(r)));
					}
					return (Tt(r), null);
				case 5:
					if ((At(r), (c = r.type), n !== null && r.stateNode != null)) n.memoizedProps !== l && mi(r);
					else {
						if (!l) {
							if (r.stateNode === null) throw Error(s(166));
							return (Tt(r), null);
						}
						if (((d = oe.current), gu(r))) Tv(r, d);
						else {
							var y = ko(Se.current);
							switch (d) {
								case 1:
									d = y.createElementNS("http://www.w3.org/2000/svg", c);
									break;
								case 2:
									d = y.createElementNS("http://www.w3.org/1998/Math/MathML", c);
									break;
								default:
									switch (c) {
										case "svg":
											d = y.createElementNS("http://www.w3.org/2000/svg", c);
											break;
										case "math":
											d = y.createElementNS("http://www.w3.org/1998/Math/MathML", c);
											break;
										case "script":
											((d = y.createElement("div")),
												(d.innerHTML = "<script><\/script>"),
												(d = d.removeChild(d.firstChild)));
											break;
										case "select":
											((d =
												typeof l.is == "string" ? y.createElement("select", { is: l.is }) : y.createElement("select")),
												l.multiple ? (d.multiple = !0) : l.size && (d.size = l.size));
											break;
										default:
											d = typeof l.is == "string" ? y.createElement(c, { is: l.is }) : y.createElement(c);
									}
							}
							((d[Dt] = r), (d[rn] = l));
							e: for (y = r.child; y !== null; ) {
								if (y.tag === 5 || y.tag === 6) d.appendChild(y.stateNode);
								else if (y.tag !== 4 && y.tag !== 27 && y.child !== null) {
									((y.child.return = y), (y = y.child));
									continue;
								}
								if (y === r) break e;
								for (; y.sibling === null; ) {
									if (y.return === null || y.return === r) break e;
									y = y.return;
								}
								((y.sibling.return = y.return), (y = y.sibling));
							}
							r.stateNode = d;
							e: switch ((An(d, c, l), c)) {
								case "button":
								case "input":
								case "select":
								case "textarea":
									l = !!l.autoFocus;
									break e;
								case "img":
									l = !0;
									break e;
								default:
									l = !1;
							}
							l && mi(r);
						}
					}
					return (Tt(r), cd(r, r.type, n === null ? null : n.memoizedProps, r.pendingProps, a), null);
				case 6:
					if (n && r.stateNode != null) n.memoizedProps !== l && mi(r);
					else {
						if (typeof l != "string" && r.stateNode === null) throw Error(s(166));
						if (((n = Se.current), gu(r))) {
							if (((n = r.stateNode), (a = r.memoizedProps), (l = null), (c = En), c !== null))
								switch (c.tag) {
									case 27:
									case 5:
										l = c.memoizedProps;
								}
							((n[Dt] = r),
								(n = !!(n.nodeValue === a || (l !== null && l.suppressHydrationWarning === !0) || Uy(n.nodeValue, a))),
								n || Pi(r, !0));
						} else ((n = ko(n).createTextNode(l)), (n[Dt] = r), (r.stateNode = n));
					}
					return (Tt(r), null);
				case 31:
					if (((a = r.memoizedState), n === null || n.memoizedState !== null)) {
						if (((l = gu(r)), a !== null)) {
							if (n === null) {
								if (!l) throw Error(s(318));
								if (((n = r.memoizedState), (n = n !== null ? n.dehydrated : null), !n)) throw Error(s(557));
								n[Dt] = r;
							} else (Ma(), (r.flags & 128) === 0 && (r.memoizedState = null), (r.flags |= 4));
							(Tt(r), (n = !1));
						} else
							((a = _f()), n !== null && n.memoizedState !== null && (n.memoizedState.hydrationErrors = a), (n = !0));
						if (!n) return r.flags & 256 ? (dr(r), r) : (dr(r), null);
						if ((r.flags & 128) !== 0) throw Error(s(558));
					}
					return (Tt(r), null);
				case 13:
					if (
						((l = r.memoizedState), n === null || (n.memoizedState !== null && n.memoizedState.dehydrated !== null))
					) {
						if (((c = gu(r)), l !== null && l.dehydrated !== null)) {
							if (n === null) {
								if (!c) throw Error(s(318));
								if (((c = r.memoizedState), (c = c !== null ? c.dehydrated : null), !c)) throw Error(s(317));
								c[Dt] = r;
							} else (Ma(), (r.flags & 128) === 0 && (r.memoizedState = null), (r.flags |= 4));
							(Tt(r), (c = !1));
						} else
							((c = _f()), n !== null && n.memoizedState !== null && (n.memoizedState.hydrationErrors = c), (c = !0));
						if (!c) return r.flags & 256 ? (dr(r), r) : (dr(r), null);
					}
					return (
						dr(r),
						(r.flags & 128) !== 0
							? ((r.lanes = a), r)
							: ((a = l !== null),
								(n = n !== null && n.memoizedState !== null),
								a &&
									((l = r.child),
									(c = null),
									l.alternate !== null &&
										l.alternate.memoizedState !== null &&
										l.alternate.memoizedState.cachePool !== null &&
										(c = l.alternate.memoizedState.cachePool.pool),
									(d = null),
									l.memoizedState !== null &&
										l.memoizedState.cachePool !== null &&
										(d = l.memoizedState.cachePool.pool),
									d !== c && (l.flags |= 2048)),
								a !== n && a && (r.child.flags |= 8192),
								mo(r, r.updateQueue),
								Tt(r),
								null)
					);
				case 4:
					return (Xe(), n === null && jy(r.stateNode.containerInfo), Tt(r), null);
				case 10:
					return (ci(r.type), Tt(r), null);
				case 19:
					if ((D(Gt), (l = r.memoizedState), l === null)) return (Tt(r), null);
					if (((c = (r.flags & 128) !== 0), (d = l.rendering), d === null))
						if (c) ql(l, !1);
						else {
							if ($t !== 0 || (n !== null && (n.flags & 128) !== 0))
								for (n = r.child; n !== null; ) {
									if (((d = eo(n)), d !== null)) {
										for (
											r.flags |= 128,
												ql(l, !1),
												n = d.updateQueue,
												r.updateQueue = n,
												mo(r, n),
												r.subtreeFlags = 0,
												n = a,
												a = r.child;
											a !== null;
										)
											(bv(a, n), (a = a.sibling));
										return (le(Gt, (Gt.current & 1) | 2), Je && si(r, l.treeForkCount), r.child);
									}
									n = n.sibling;
								}
							l.tail !== null && Ne() > bo && ((r.flags |= 128), (c = !0), ql(l, !1), (r.lanes = 4194304));
						}
					else {
						if (!c)
							if (((n = eo(d)), n !== null)) {
								if (
									((r.flags |= 128),
									(c = !0),
									(n = n.updateQueue),
									(r.updateQueue = n),
									mo(r, n),
									ql(l, !0),
									l.tail === null && l.tailMode === "hidden" && !d.alternate && !Je)
								)
									return (Tt(r), null);
							} else
								2 * Ne() - l.renderingStartTime > bo &&
									a !== 536870912 &&
									((r.flags |= 128), (c = !0), ql(l, !1), (r.lanes = 4194304));
						l.isBackwards
							? ((d.sibling = r.child), (r.child = d))
							: ((n = l.last), n !== null ? (n.sibling = d) : (r.child = d), (l.last = d));
					}
					return l.tail !== null
						? ((n = l.tail),
							(l.rendering = n),
							(l.tail = n.sibling),
							(l.renderingStartTime = Ne()),
							(n.sibling = null),
							(a = Gt.current),
							le(Gt, c ? (a & 1) | 2 : a & 1),
							Je && si(r, l.treeForkCount),
							n)
						: (Tt(r), null);
				case 22:
				case 23:
					return (
						dr(r),
						zf(),
						(l = r.memoizedState !== null),
						n !== null ? (n.memoizedState !== null) !== l && (r.flags |= 8192) : l && (r.flags |= 8192),
						l
							? (a & 536870912) !== 0 && (r.flags & 128) === 0 && (Tt(r), r.subtreeFlags & 6 && (r.flags |= 8192))
							: Tt(r),
						(a = r.updateQueue),
						a !== null && mo(r, a.retryQueue),
						(a = null),
						n !== null &&
							n.memoizedState !== null &&
							n.memoizedState.cachePool !== null &&
							(a = n.memoizedState.cachePool.pool),
						(l = null),
						r.memoizedState !== null && r.memoizedState.cachePool !== null && (l = r.memoizedState.cachePool.pool),
						l !== a && (r.flags |= 2048),
						n !== null && D(za),
						null
					);
				case 24:
					return (
						(a = null),
						n !== null && (a = n.memoizedState.cache),
						r.memoizedState.cache !== a && (r.flags |= 2048),
						ci(un),
						Tt(r),
						null
					);
				case 25:
					return null;
				case 30:
					return null;
			}
			throw Error(s(156, r.tag));
		}
		function kw(n, r) {
			switch ((pf(r), r.tag)) {
				case 1:
					return ((n = r.flags), n & 65536 ? ((r.flags = (n & -65537) | 128), r) : null);
				case 3:
					return (
						ci(un),
						Xe(),
						(n = r.flags),
						(n & 65536) !== 0 && (n & 128) === 0 ? ((r.flags = (n & -65537) | 128), r) : null
					);
				case 26:
				case 27:
				case 5:
					return (At(r), null);
				case 31:
					if (r.memoizedState !== null) {
						if ((dr(r), r.alternate === null)) throw Error(s(340));
						Ma();
					}
					return ((n = r.flags), n & 65536 ? ((r.flags = (n & -65537) | 128), r) : null);
				case 13:
					if ((dr(r), (n = r.memoizedState), n !== null && n.dehydrated !== null)) {
						if (r.alternate === null) throw Error(s(340));
						Ma();
					}
					return ((n = r.flags), n & 65536 ? ((r.flags = (n & -65537) | 128), r) : null);
				case 19:
					return (D(Gt), null);
				case 4:
					return (Xe(), null);
				case 10:
					return (ci(r.type), null);
				case 22:
				case 23:
					return (
						dr(r),
						zf(),
						n !== null && D(za),
						(n = r.flags),
						n & 65536 ? ((r.flags = (n & -65537) | 128), r) : null
					);
				case 24:
					return (ci(un), null);
				case 25:
					return null;
				default:
					return null;
			}
		}
		function Hg(n, r) {
			switch ((pf(r), r.tag)) {
				case 3:
					(ci(un), Xe());
					break;
				case 26:
				case 27:
				case 5:
					At(r);
					break;
				case 4:
					Xe();
					break;
				case 31:
					r.memoizedState !== null && dr(r);
					break;
				case 13:
					dr(r);
					break;
				case 19:
					D(Gt);
					break;
				case 10:
					ci(r.type);
					break;
				case 22:
				case 23:
					(dr(r), zf(), n !== null && D(za));
					break;
				case 24:
					ci(un);
			}
		}
		function Ul(n, r) {
			try {
				var a = r.updateQueue,
					l = a !== null ? a.lastEffect : null;
				if (l !== null) {
					var c = l.next;
					a = c;
					do {
						if ((a.tag & n) === n) {
							l = void 0;
							var d = a.create,
								y = a.inst;
							((l = d()), (y.destroy = l));
						}
						a = a.next;
					} while (a !== c);
				}
			} catch (x) {
				dt(r, r.return, x);
			}
		}
		function Fi(n, r, a) {
			try {
				var l = r.updateQueue,
					c = l !== null ? l.lastEffect : null;
				if (c !== null) {
					var d = c.next;
					l = d;
					do {
						if ((l.tag & n) === n) {
							var y = l.inst,
								x = y.destroy;
							if (x !== void 0) {
								((y.destroy = void 0), (c = r));
								var z = a,
									X = x;
								try {
									X();
								} catch (ne) {
									dt(c, z, ne);
								}
							}
						}
						l = l.next;
					} while (l !== d);
				}
			} catch (ne) {
				dt(r, r.return, ne);
			}
		}
		function Zg(n) {
			var r = n.updateQueue;
			if (r !== null) {
				var a = n.stateNode;
				try {
					Lv(r, a);
				} catch (l) {
					dt(n, n.return, l);
				}
			}
		}
		function Pg(n, r, a) {
			((a.props = $a(n.type, n.memoizedProps)), (a.state = n.memoizedState));
			try {
				a.componentWillUnmount();
			} catch (l) {
				dt(n, r, l);
			}
		}
		function $l(n, r) {
			try {
				var a = n.ref;
				if (a !== null) {
					switch (n.tag) {
						case 26:
						case 27:
						case 5:
							var l = n.stateNode;
							break;
						case 30:
							l = n.stateNode;
							break;
						default:
							l = n.stateNode;
					}
					typeof a == "function" ? (n.refCleanup = a(l)) : (a.current = l);
				}
			} catch (c) {
				dt(n, r, c);
			}
		}
		function Jr(n, r) {
			var a = n.ref,
				l = n.refCleanup;
			if (a !== null)
				if (typeof l == "function")
					try {
						l();
					} catch (c) {
						dt(n, r, c);
					} finally {
						((n.refCleanup = null), (n = n.alternate), n != null && (n.refCleanup = null));
					}
				else if (typeof a == "function")
					try {
						a(null);
					} catch (c) {
						dt(n, r, c);
					}
				else a.current = null;
		}
		function Qg(n) {
			var r = n.type,
				a = n.memoizedProps,
				l = n.stateNode;
			try {
				e: switch (r) {
					case "button":
					case "input":
					case "select":
					case "textarea":
						a.autoFocus && l.focus();
						break e;
					case "img":
						a.src ? (l.src = a.src) : a.srcSet && (l.srcset = a.srcSet);
				}
			} catch (c) {
				dt(n, n.return, c);
			}
		}
		function fd(n, r, a) {
			try {
				var l = n.stateNode;
				(Gw(l, n.type, a, r), (l[rn] = r));
			} catch (c) {
				dt(n, n.return, c);
			}
		}
		function Kg(n) {
			return n.tag === 5 || n.tag === 3 || n.tag === 26 || (n.tag === 27 && ra(n.type)) || n.tag === 4;
		}
		function dd(n) {
			e: for (;;) {
				for (; n.sibling === null; ) {
					if (n.return === null || Kg(n.return)) return null;
					n = n.return;
				}
				for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
					if ((n.tag === 27 && ra(n.type)) || n.flags & 2 || n.child === null || n.tag === 4) continue e;
					((n.child.return = n), (n = n.child));
				}
				if (!(n.flags & 2)) return n.stateNode;
			}
		}
		function hd(n, r, a) {
			var l = n.tag;
			if (l === 5 || l === 6)
				((n = n.stateNode),
					r
						? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(n, r)
						: ((r = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a),
							r.appendChild(n),
							(a = a._reactRootContainer),
							a != null || r.onclick !== null || (r.onclick = On)));
			else if (l !== 4 && (l === 27 && ra(n.type) && ((a = n.stateNode), (r = null)), (n = n.child), n !== null))
				for (hd(n, r, a), n = n.sibling; n !== null; ) (hd(n, r, a), (n = n.sibling));
		}
		function vo(n, r, a) {
			var l = n.tag;
			if (l === 5 || l === 6) ((n = n.stateNode), r ? a.insertBefore(n, r) : a.appendChild(n));
			else if (l !== 4 && (l === 27 && ra(n.type) && (a = n.stateNode), (n = n.child), n !== null))
				for (vo(n, r, a), n = n.sibling; n !== null; ) (vo(n, r, a), (n = n.sibling));
		}
		function Yg(n) {
			var r = n.stateNode,
				a = n.memoizedProps;
			try {
				for (var l = n.type, c = r.attributes; c.length; ) r.removeAttributeNode(c[0]);
				(An(r, l, a), (r[Dt] = n), (r[rn] = a));
			} catch (d) {
				dt(n, n.return, d);
			}
		}
		var vi = !1,
			on = !1,
			md = !1,
			Gg = typeof WeakSet == "function" ? WeakSet : Set,
			bn = null;
		function Mw(n, r) {
			if (((n = n.containerInfo), (Dd = Io), (n = cv(n)), lf(n))) {
				if ("selectionStart" in n) var a = { start: n.selectionStart, end: n.selectionEnd };
				else
					e: {
						a = ((a = n.ownerDocument) && a.defaultView) || window;
						var l = a.getSelection && a.getSelection();
						if (l && l.rangeCount !== 0) {
							a = l.anchorNode;
							var c = l.anchorOffset,
								d = l.focusNode;
							l = l.focusOffset;
							try {
								(a.nodeType, d.nodeType);
							} catch {
								a = null;
								break e;
							}
							var y = 0,
								x = -1,
								z = -1,
								X = 0,
								ne = 0,
								ue = n,
								W = null;
							t: for (;;) {
								for (
									var ee;
									ue !== a || (c !== 0 && ue.nodeType !== 3) || (x = y + c),
										ue !== d || (l !== 0 && ue.nodeType !== 3) || (z = y + l),
										ue.nodeType === 3 && (y += ue.nodeValue.length),
										(ee = ue.firstChild) !== null;
								)
									((W = ue), (ue = ee));
								for (;;) {
									if (ue === n) break t;
									if (
										(W === a && ++X === c && (x = y), W === d && ++ne === l && (z = y), (ee = ue.nextSibling) !== null)
									)
										break;
									((ue = W), (W = ue.parentNode));
								}
								ue = ee;
							}
							a = x === -1 || z === -1 ? null : { start: x, end: z };
						} else a = null;
					}
				a = a || { start: 0, end: 0 };
			} else a = null;
			for (jd = { focusedElem: n, selectionRange: a }, Io = !1, bn = r; bn !== null; )
				if (((r = bn), (n = r.child), (r.subtreeFlags & 1028) !== 0 && n !== null)) ((n.return = r), (bn = n));
				else
					for (; bn !== null; ) {
						switch (((r = bn), (d = r.alternate), (n = r.flags), r.tag)) {
							case 0:
								if ((n & 4) !== 0 && ((n = r.updateQueue), (n = n !== null ? n.events : null), n !== null))
									for (a = 0; a < n.length; a++) ((c = n[a]), (c.ref.impl = c.nextImpl));
								break;
							case 11:
							case 15:
								break;
							case 1:
								if ((n & 1024) !== 0 && d !== null) {
									((n = void 0), (a = r), (c = d.memoizedProps), (d = d.memoizedState), (l = a.stateNode));
									try {
										var _e = $a(a.type, c);
										((n = l.getSnapshotBeforeUpdate(_e, d)), (l.__reactInternalSnapshotBeforeUpdate = n));
									} catch (ke) {
										dt(a, a.return, ke);
									}
								}
								break;
							case 3:
								if ((n & 1024) !== 0) {
									if (((n = r.stateNode.containerInfo), (a = n.nodeType), a === 9)) qd(n);
									else if (a === 1)
										switch (n.nodeName) {
											case "HEAD":
											case "HTML":
											case "BODY":
												qd(n);
												break;
											default:
												n.textContent = "";
										}
								}
								break;
							case 5:
							case 26:
							case 27:
							case 6:
							case 4:
							case 17:
								break;
							default:
								if ((n & 1024) !== 0) throw Error(s(163));
						}
						if (((n = r.sibling), n !== null)) {
							((n.return = r.return), (bn = n));
							break;
						}
						bn = r.return;
					}
		}
		function Fg(n, r, a) {
			var l = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					(yi(n, a), l & 4 && Ul(5, a));
					break;
				case 1:
					if ((yi(n, a), l & 4))
						if (((n = a.stateNode), r === null))
							try {
								n.componentDidMount();
							} catch (y) {
								dt(a, a.return, y);
							}
						else {
							var c = $a(a.type, r.memoizedProps);
							r = r.memoizedState;
							try {
								n.componentDidUpdate(c, r, n.__reactInternalSnapshotBeforeUpdate);
							} catch (y) {
								dt(a, a.return, y);
							}
						}
					(l & 64 && Zg(a), l & 512 && $l(a, a.return));
					break;
				case 3:
					if ((yi(n, a), l & 64 && ((n = a.updateQueue), n !== null))) {
						if (((r = null), a.child !== null))
							switch (a.child.tag) {
								case 27:
								case 5:
									r = a.child.stateNode;
									break;
								case 1:
									r = a.child.stateNode;
							}
						try {
							Lv(n, r);
						} catch (y) {
							dt(a, a.return, y);
						}
					}
					break;
				case 27:
					r === null && l & 4 && Yg(a);
				case 26:
				case 5:
					(yi(n, a), r === null && l & 4 && Qg(a), l & 512 && $l(a, a.return));
					break;
				case 12:
					yi(n, a);
					break;
				case 31:
					(yi(n, a), l & 4 && Wg(n, a));
					break;
				case 13:
					(yi(n, a),
						l & 4 && ey(n, a),
						l & 64 &&
							((n = a.memoizedState),
							n !== null && ((n = n.dehydrated), n !== null && ((a = Uw.bind(null, a)), r1(n, a)))));
					break;
				case 22:
					if (((l = a.memoizedState !== null || vi), !l)) {
						((r = (r !== null && r.memoizedState !== null) || on), (c = vi));
						var d = on;
						((vi = l), (on = r) && !d ? pi(n, a, (a.subtreeFlags & 8772) !== 0) : yi(n, a), (vi = c), (on = d));
					}
					break;
				case 30:
					break;
				default:
					yi(n, a);
			}
		}
		function Xg(n) {
			var r = n.alternate;
			(r !== null && ((n.alternate = null), Xg(r)),
				(n.child = null),
				(n.deletions = null),
				(n.sibling = null),
				n.tag === 5 && ((r = n.stateNode), r !== null && Ui(r)),
				(n.stateNode = null),
				(n.return = null),
				(n.dependencies = null),
				(n.memoizedProps = null),
				(n.memoizedState = null),
				(n.pendingProps = null),
				(n.stateNode = null),
				(n.updateQueue = null));
		}
		var kt = null,
			Fn = !1;
		function gi(n, r, a) {
			for (a = a.child; a !== null; ) (Jg(n, r, a), (a = a.sibling));
		}
		function Jg(n, r, a) {
			if (_t && typeof _t.onCommitFiberUnmount == "function")
				try {
					_t.onCommitFiberUnmount(kn, a);
				} catch {}
			switch (a.tag) {
				case 26:
					(on || Jr(a, r),
						gi(n, r, a),
						a.memoizedState
							? a.memoizedState.count--
							: a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
					break;
				case 27:
					on || Jr(a, r);
					var l = kt,
						c = Fn;
					(ra(a.type) && ((kt = a.stateNode), (Fn = !1)), gi(n, r, a), Gl(a.stateNode), (kt = l), (Fn = c));
					break;
				case 5:
					on || Jr(a, r);
				case 6:
					if (((l = kt), (c = Fn), (kt = null), gi(n, r, a), (kt = l), (Fn = c), kt !== null))
						if (Fn)
							try {
								(kt.nodeType === 9 ? kt.body : kt.nodeName === "HTML" ? kt.ownerDocument.body : kt).removeChild(
									a.stateNode,
								);
							} catch (d) {
								dt(a, r, d);
							}
						else
							try {
								kt.removeChild(a.stateNode);
							} catch (d) {
								dt(a, r, d);
							}
					break;
				case 18:
					kt !== null &&
						(Fn
							? ((n = kt),
								Py(n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, a.stateNode),
								Lu(n))
							: Py(kt, a.stateNode));
					break;
				case 4:
					((l = kt), (c = Fn), (kt = a.stateNode.containerInfo), (Fn = !0), gi(n, r, a), (kt = l), (Fn = c));
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					(Fi(2, a, r), on || Fi(4, a, r), gi(n, r, a));
					break;
				case 1:
					(on || (Jr(a, r), (l = a.stateNode), typeof l.componentWillUnmount == "function" && Pg(a, r, l)),
						gi(n, r, a));
					break;
				case 21:
					gi(n, r, a);
					break;
				case 22:
					((on = (l = on) || a.memoizedState !== null), gi(n, r, a), (on = l));
					break;
				default:
					gi(n, r, a);
			}
		}
		function Wg(n, r) {
			if (r.memoizedState === null && ((n = r.alternate), n !== null && ((n = n.memoizedState), n !== null))) {
				n = n.dehydrated;
				try {
					Lu(n);
				} catch (a) {
					dt(r, r.return, a);
				}
			}
		}
		function ey(n, r) {
			if (
				r.memoizedState === null &&
				((n = r.alternate), n !== null && ((n = n.memoizedState), n !== null && ((n = n.dehydrated), n !== null)))
			)
				try {
					Lu(n);
				} catch (a) {
					dt(r, r.return, a);
				}
		}
		function Nw(n) {
			switch (n.tag) {
				case 31:
				case 13:
				case 19:
					var r = n.stateNode;
					return (r === null && (r = n.stateNode = new Gg()), r);
				case 22:
					return ((n = n.stateNode), (r = n._retryCache), r === null && (r = n._retryCache = new Gg()), r);
				default:
					throw Error(s(435, n.tag));
			}
		}
		function go(n, r) {
			var a = Nw(n);
			r.forEach(function (l) {
				if (!a.has(l)) {
					a.add(l);
					var c = $w.bind(null, n, l);
					l.then(c, c);
				}
			});
		}
		function Xn(n, r) {
			var a = r.deletions;
			if (a !== null)
				for (var l = 0; l < a.length; l++) {
					var c = a[l],
						d = n,
						y = r,
						x = y;
					e: for (; x !== null; ) {
						switch (x.tag) {
							case 27:
								if (ra(x.type)) {
									((kt = x.stateNode), (Fn = !1));
									break e;
								}
								break;
							case 5:
								((kt = x.stateNode), (Fn = !1));
								break e;
							case 3:
							case 4:
								((kt = x.stateNode.containerInfo), (Fn = !0));
								break e;
						}
						x = x.return;
					}
					if (kt === null) throw Error(s(160));
					(Jg(d, y, c), (kt = null), (Fn = !1), (d = c.alternate), d !== null && (d.return = null), (c.return = null));
				}
			if (r.subtreeFlags & 13886) for (r = r.child; r !== null; ) (ty(r, n), (r = r.sibling));
		}
		var Zr = null;
		function ty(n, r) {
			var a = n.alternate,
				l = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					(Xn(r, n), Jn(n), l & 4 && (Fi(3, n, n.return), Ul(3, n), Fi(5, n, n.return)));
					break;
				case 1:
					(Xn(r, n),
						Jn(n),
						l & 512 && (on || a === null || Jr(a, a.return)),
						l & 64 &&
							vi &&
							((n = n.updateQueue),
							n !== null &&
								((l = n.callbacks),
								l !== null &&
									((a = n.shared.hiddenCallbacks), (n.shared.hiddenCallbacks = a === null ? l : a.concat(l))))));
					break;
				case 26:
					var c = Zr;
					if ((Xn(r, n), Jn(n), l & 512 && (on || a === null || Jr(a, a.return)), l & 4)) {
						var d = a !== null ? a.memoizedState : null;
						if (((l = n.memoizedState), a === null))
							if (l === null)
								if (n.stateNode === null) {
									e: {
										((l = n.type), (a = n.memoizedProps), (c = c.ownerDocument || c));
										t: switch (l) {
											case "title":
												((d = c.getElementsByTagName("title")[0]),
													(!d ||
														d[Kn] ||
														d[Dt] ||
														d.namespaceURI === "http://www.w3.org/2000/svg" ||
														d.hasAttribute("itemprop")) &&
														((d = c.createElement(l)), c.head.insertBefore(d, c.querySelector("head > title"))),
													An(d, l, a),
													(d[Dt] = n),
													Rt(d),
													(l = d));
												break e;
											case "link":
												var y = np("link", "href", c).get(l + (a.href || ""));
												if (y) {
													for (var x = 0; x < y.length; x++)
														if (
															((d = y[x]),
															d.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) &&
																d.getAttribute("rel") === (a.rel == null ? null : a.rel) &&
																d.getAttribute("title") === (a.title == null ? null : a.title) &&
																d.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin))
														) {
															y.splice(x, 1);
															break t;
														}
												}
												((d = c.createElement(l)), An(d, l, a), c.head.appendChild(d));
												break;
											case "meta":
												if ((y = np("meta", "content", c).get(l + (a.content || "")))) {
													for (x = 0; x < y.length; x++)
														if (
															((d = y[x]),
															d.getAttribute("content") === (a.content == null ? null : "" + a.content) &&
																d.getAttribute("name") === (a.name == null ? null : a.name) &&
																d.getAttribute("property") === (a.property == null ? null : a.property) &&
																d.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) &&
																d.getAttribute("charset") === (a.charSet == null ? null : a.charSet))
														) {
															y.splice(x, 1);
															break t;
														}
												}
												((d = c.createElement(l)), An(d, l, a), c.head.appendChild(d));
												break;
											default:
												throw Error(s(468, l));
										}
										((d[Dt] = n), Rt(d), (l = d));
									}
									n.stateNode = l;
								} else rp(c, n.type, n.stateNode);
							else n.stateNode = tp(c, l, n.memoizedProps);
						else
							d !== l
								? (d === null ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a)) : d.count--,
									l === null ? rp(c, n.type, n.stateNode) : tp(c, l, n.memoizedProps))
								: l === null && n.stateNode !== null && fd(n, n.memoizedProps, a.memoizedProps);
					}
					break;
				case 27:
					(Xn(r, n),
						Jn(n),
						l & 512 && (on || a === null || Jr(a, a.return)),
						a !== null && l & 4 && fd(n, n.memoizedProps, a.memoizedProps));
					break;
				case 5:
					if ((Xn(r, n), Jn(n), l & 512 && (on || a === null || Jr(a, a.return)), n.flags & 32)) {
						c = n.stateNode;
						try {
							Br(c, "");
						} catch (_e) {
							dt(n, n.return, _e);
						}
					}
					(l & 4 && n.stateNode != null && ((c = n.memoizedProps), fd(n, c, a !== null ? a.memoizedProps : c)),
						l & 1024 && (md = !0));
					break;
				case 6:
					if ((Xn(r, n), Jn(n), l & 4)) {
						if (n.stateNode === null) throw Error(s(162));
						((l = n.memoizedProps), (a = n.stateNode));
						try {
							a.nodeValue = l;
						} catch (_e) {
							dt(n, n.return, _e);
						}
					}
					break;
				case 3:
					if (
						((Oo = null),
						(c = Zr),
						(Zr = Mo(r.containerInfo)),
						Xn(r, n),
						(Zr = c),
						Jn(n),
						l & 4 && a !== null && a.memoizedState.isDehydrated)
					)
						try {
							Lu(r.containerInfo);
						} catch (_e) {
							dt(n, n.return, _e);
						}
					md && ((md = !1), ny(n));
					break;
				case 4:
					((l = Zr), (Zr = Mo(n.stateNode.containerInfo)), Xn(r, n), Jn(n), (Zr = l));
					break;
				case 12:
					(Xn(r, n), Jn(n));
					break;
				case 31:
					(Xn(r, n), Jn(n), l & 4 && ((l = n.updateQueue), l !== null && ((n.updateQueue = null), go(n, l))));
					break;
				case 13:
					(Xn(r, n),
						Jn(n),
						n.child.flags & 8192 &&
							(n.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
							(po = Ne()),
						l & 4 && ((l = n.updateQueue), l !== null && ((n.updateQueue = null), go(n, l))));
					break;
				case 22:
					c = n.memoizedState !== null;
					var z = a !== null && a.memoizedState !== null,
						X = vi,
						ne = on;
					if (((vi = X || c), (on = ne || z), Xn(r, n), (on = ne), (vi = X), Jn(n), l & 8192))
						e: for (
							r = n.stateNode,
								r._visibility = c ? r._visibility & -2 : r._visibility | 1,
								c && (a === null || z || vi || on || Ba(n)),
								a = null,
								r = n;
							;
						) {
							if (r.tag === 5 || r.tag === 26) {
								if (a === null) {
									z = a = r;
									try {
										if (((d = z.stateNode), c))
											((y = d.style),
												typeof y.setProperty == "function"
													? y.setProperty("display", "none", "important")
													: (y.display = "none"));
										else {
											x = z.stateNode;
											var ue = z.memoizedProps.style,
												W = ue != null && ue.hasOwnProperty("display") ? ue.display : null;
											x.style.display = W == null || typeof W == "boolean" ? "" : ("" + W).trim();
										}
									} catch (_e) {
										dt(z, z.return, _e);
									}
								}
							} else if (r.tag === 6) {
								if (a === null) {
									z = r;
									try {
										z.stateNode.nodeValue = c ? "" : z.memoizedProps;
									} catch (_e) {
										dt(z, z.return, _e);
									}
								}
							} else if (r.tag === 18) {
								if (a === null) {
									z = r;
									try {
										var ee = z.stateNode;
										c ? Qy(ee, !0) : Qy(z.stateNode, !1);
									} catch (_e) {
										dt(z, z.return, _e);
									}
								}
							} else if (((r.tag !== 22 && r.tag !== 23) || r.memoizedState === null || r === n) && r.child !== null) {
								((r.child.return = r), (r = r.child));
								continue;
							}
							if (r === n) break e;
							for (; r.sibling === null; ) {
								if (r.return === null || r.return === n) break e;
								(a === r && (a = null), (r = r.return));
							}
							(a === r && (a = null), (r.sibling.return = r.return), (r = r.sibling));
						}
					l & 4 &&
						((l = n.updateQueue), l !== null && ((a = l.retryQueue), a !== null && ((l.retryQueue = null), go(n, a))));
					break;
				case 19:
					(Xn(r, n), Jn(n), l & 4 && ((l = n.updateQueue), l !== null && ((n.updateQueue = null), go(n, l))));
					break;
				case 30:
					break;
				case 21:
					break;
				default:
					(Xn(r, n), Jn(n));
			}
		}
		function Jn(n) {
			var r = n.flags;
			if (r & 2) {
				try {
					for (var a, l = n.return; l !== null; ) {
						if (Kg(l)) {
							a = l;
							break;
						}
						l = l.return;
					}
					if (a == null) throw Error(s(160));
					switch (a.tag) {
						case 27:
							var c = a.stateNode;
							vo(n, dd(n), c);
							break;
						case 5:
							var d = a.stateNode;
							(a.flags & 32 && (Br(d, ""), (a.flags &= -33)), vo(n, dd(n), d));
							break;
						case 3:
						case 4:
							var y = a.stateNode.containerInfo;
							hd(n, dd(n), y);
							break;
						default:
							throw Error(s(161));
					}
				} catch (x) {
					dt(n, n.return, x);
				}
				n.flags &= -3;
			}
			r & 4096 && (n.flags &= -4097);
		}
		function ny(n) {
			if (n.subtreeFlags & 1024)
				for (n = n.child; n !== null; ) {
					var r = n;
					(ny(r), r.tag === 5 && r.flags & 1024 && r.stateNode.reset(), (n = n.sibling));
				}
		}
		function yi(n, r) {
			if (r.subtreeFlags & 8772) for (r = r.child; r !== null; ) (Fg(n, r.alternate, r), (r = r.sibling));
		}
		function Ba(n) {
			for (n = n.child; n !== null; ) {
				var r = n;
				switch (r.tag) {
					case 0:
					case 11:
					case 14:
					case 15:
						(Fi(4, r, r.return), Ba(r));
						break;
					case 1:
						Jr(r, r.return);
						var a = r.stateNode;
						(typeof a.componentWillUnmount == "function" && Pg(r, r.return, a), Ba(r));
						break;
					case 27:
						Gl(r.stateNode);
					case 26:
					case 5:
						(Jr(r, r.return), Ba(r));
						break;
					case 22:
						r.memoizedState === null && Ba(r);
						break;
					case 30:
						Ba(r);
						break;
					default:
						Ba(r);
				}
				n = n.sibling;
			}
		}
		function pi(n, r, a) {
			for (a = a && (r.subtreeFlags & 8772) !== 0, r = r.child; r !== null; ) {
				var l = r.alternate,
					c = n,
					d = r,
					y = d.flags;
				switch (d.tag) {
					case 0:
					case 11:
					case 15:
						(pi(c, d, a), Ul(4, d));
						break;
					case 1:
						if ((pi(c, d, a), (l = d), (c = l.stateNode), typeof c.componentDidMount == "function"))
							try {
								c.componentDidMount();
							} catch (X) {
								dt(l, l.return, X);
							}
						if (((l = d), (c = l.updateQueue), c !== null)) {
							var x = l.stateNode;
							try {
								var z = c.shared.hiddenCallbacks;
								if (z !== null) for (c.shared.hiddenCallbacks = null, c = 0; c < z.length; c++) Iv(z[c], x);
							} catch (X) {
								dt(l, l.return, X);
							}
						}
						(a && y & 64 && Zg(d), $l(d, d.return));
						break;
					case 27:
						Yg(d);
					case 26:
					case 5:
						(pi(c, d, a), a && l === null && y & 4 && Qg(d), $l(d, d.return));
						break;
					case 12:
						pi(c, d, a);
						break;
					case 31:
						(pi(c, d, a), a && y & 4 && Wg(c, d));
						break;
					case 13:
						(pi(c, d, a), a && y & 4 && ey(c, d));
						break;
					case 22:
						(d.memoizedState === null && pi(c, d, a), $l(d, d.return));
						break;
					case 30:
						break;
					default:
						pi(c, d, a);
				}
				r = r.sibling;
			}
		}
		function vd(n, r) {
			var a = null;
			(n !== null &&
				n.memoizedState !== null &&
				n.memoizedState.cachePool !== null &&
				(a = n.memoizedState.cachePool.pool),
				(n = null),
				r.memoizedState !== null && r.memoizedState.cachePool !== null && (n = r.memoizedState.cachePool.pool),
				n !== a && (n != null && n.refCount++, a != null && Al(a)));
		}
		function gd(n, r) {
			((n = null),
				r.alternate !== null && (n = r.alternate.memoizedState.cache),
				(r = r.memoizedState.cache),
				r !== n && (r.refCount++, n != null && Al(n)));
		}
		function Pr(n, r, a, l) {
			if (r.subtreeFlags & 10256) for (r = r.child; r !== null; ) (ry(n, r, a, l), (r = r.sibling));
		}
		function ry(n, r, a, l) {
			var c = r.flags;
			switch (r.tag) {
				case 0:
				case 11:
				case 15:
					(Pr(n, r, a, l), c & 2048 && Ul(9, r));
					break;
				case 1:
					Pr(n, r, a, l);
					break;
				case 3:
					(Pr(n, r, a, l),
						c & 2048 &&
							((n = null),
							r.alternate !== null && (n = r.alternate.memoizedState.cache),
							(r = r.memoizedState.cache),
							r !== n && (r.refCount++, n != null && Al(n))));
					break;
				case 12:
					if (c & 2048) {
						(Pr(n, r, a, l), (n = r.stateNode));
						try {
							var d = r.memoizedProps,
								y = d.id,
								x = d.onPostCommit;
							typeof x == "function" && x(y, r.alternate === null ? "mount" : "update", n.passiveEffectDuration, -0);
						} catch (z) {
							dt(r, r.return, z);
						}
					} else Pr(n, r, a, l);
					break;
				case 31:
					Pr(n, r, a, l);
					break;
				case 13:
					Pr(n, r, a, l);
					break;
				case 23:
					break;
				case 22:
					((d = r.stateNode),
						(y = r.alternate),
						r.memoizedState !== null
							? d._visibility & 2
								? Pr(n, r, a, l)
								: Bl(n, r)
							: d._visibility & 2
								? Pr(n, r, a, l)
								: ((d._visibility |= 2), Au(n, r, a, l, (r.subtreeFlags & 10256) !== 0 || !1)),
						c & 2048 && vd(y, r));
					break;
				case 24:
					(Pr(n, r, a, l), c & 2048 && gd(r.alternate, r));
					break;
				default:
					Pr(n, r, a, l);
			}
		}
		function Au(n, r, a, l, c) {
			for (c = c && ((r.subtreeFlags & 10256) !== 0 || !1), r = r.child; r !== null; ) {
				var d = n,
					y = r,
					x = a,
					z = l,
					X = y.flags;
				switch (y.tag) {
					case 0:
					case 11:
					case 15:
						(Au(d, y, x, z, c), Ul(8, y));
						break;
					case 23:
						break;
					case 22:
						var ne = y.stateNode;
						(y.memoizedState !== null
							? ne._visibility & 2
								? Au(d, y, x, z, c)
								: Bl(d, y)
							: ((ne._visibility |= 2), Au(d, y, x, z, c)),
							c && X & 2048 && vd(y.alternate, y));
						break;
					case 24:
						(Au(d, y, x, z, c), c && X & 2048 && gd(y.alternate, y));
						break;
					default:
						Au(d, y, x, z, c);
				}
				r = r.sibling;
			}
		}
		function Bl(n, r) {
			if (r.subtreeFlags & 10256)
				for (r = r.child; r !== null; ) {
					var a = n,
						l = r,
						c = l.flags;
					switch (l.tag) {
						case 22:
							(Bl(a, l), c & 2048 && vd(l.alternate, l));
							break;
						case 24:
							(Bl(a, l), c & 2048 && gd(l.alternate, l));
							break;
						default:
							Bl(a, l);
					}
					r = r.sibling;
				}
		}
		var Vl = 8192;
		function Ru(n, r, a) {
			if (n.subtreeFlags & Vl) for (n = n.child; n !== null; ) (iy(n, r, a), (n = n.sibling));
		}
		function iy(n, r, a) {
			switch (n.tag) {
				case 26:
					(Ru(n, r, a), n.flags & Vl && n.memoizedState !== null && v1(a, Zr, n.memoizedState, n.memoizedProps));
					break;
				case 5:
					Ru(n, r, a);
					break;
				case 3:
				case 4:
					var l = Zr;
					((Zr = Mo(n.stateNode.containerInfo)), Ru(n, r, a), (Zr = l));
					break;
				case 22:
					n.memoizedState === null &&
						((l = n.alternate),
						l !== null && l.memoizedState !== null ? ((l = Vl), (Vl = 16777216), Ru(n, r, a), (Vl = l)) : Ru(n, r, a));
					break;
				default:
					Ru(n, r, a);
			}
		}
		function ay(n) {
			var r = n.alternate;
			if (r !== null && ((n = r.child), n !== null)) {
				r.child = null;
				do ((r = n.sibling), (n.sibling = null), (n = r));
				while (n !== null);
			}
		}
		function Hl(n) {
			var r = n.deletions;
			if ((n.flags & 16) !== 0) {
				if (r !== null)
					for (var a = 0; a < r.length; a++) {
						var l = r[a];
						((bn = l), ly(l, n));
					}
				ay(n);
			}
			if (n.subtreeFlags & 10256) for (n = n.child; n !== null; ) (uy(n), (n = n.sibling));
		}
		function uy(n) {
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					(Hl(n), n.flags & 2048 && Fi(9, n, n.return));
					break;
				case 3:
					Hl(n);
					break;
				case 12:
					Hl(n);
					break;
				case 22:
					var r = n.stateNode;
					n.memoizedState !== null && r._visibility & 2 && (n.return === null || n.return.tag !== 13)
						? ((r._visibility &= -3), yo(n))
						: Hl(n);
					break;
				default:
					Hl(n);
			}
		}
		function yo(n) {
			var r = n.deletions;
			if ((n.flags & 16) !== 0) {
				if (r !== null)
					for (var a = 0; a < r.length; a++) {
						var l = r[a];
						((bn = l), ly(l, n));
					}
				ay(n);
			}
			for (n = n.child; n !== null; ) {
				switch (((r = n), r.tag)) {
					case 0:
					case 11:
					case 15:
						(Fi(8, r, r.return), yo(r));
						break;
					case 22:
						((a = r.stateNode), a._visibility & 2 && ((a._visibility &= -3), yo(r)));
						break;
					default:
						yo(r);
				}
				n = n.sibling;
			}
		}
		function ly(n, r) {
			for (; bn !== null; ) {
				var a = bn;
				switch (a.tag) {
					case 0:
					case 11:
					case 15:
						Fi(8, a, r);
						break;
					case 23:
					case 22:
						if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
							var l = a.memoizedState.cachePool.pool;
							l != null && l.refCount++;
						}
						break;
					case 24:
						Al(a.memoizedState.cache);
				}
				if (((l = a.child), l !== null)) ((l.return = a), (bn = l));
				else
					e: for (a = n; bn !== null; ) {
						l = bn;
						var c = l.sibling,
							d = l.return;
						if ((Xg(l), l === a)) {
							bn = null;
							break e;
						}
						if (c !== null) {
							((c.return = d), (bn = c));
							break e;
						}
						bn = d;
					}
			}
		}
		var Ow = {
				getCacheForType: function (n) {
					var r = Tn(un),
						a = r.data.get(n);
					return (a === void 0 && ((a = n()), r.data.set(n, a)), a);
				},
				cacheSignal: function () {
					return Tn(un).controller.signal;
				},
			},
			zw = typeof WeakMap == "function" ? WeakMap : Map,
			st = 0,
			wt = null,
			He = null,
			Ye = 0,
			ft = 0,
			hr = null,
			Xi = !1,
			Cu = !1,
			yd = !1,
			bi = 0,
			$t = 0,
			Ji = 0,
			Va = 0,
			pd = 0,
			mr = 0,
			ku = 0,
			Zl = null,
			Wn = null,
			bd = !1,
			po = 0,
			sy = 0,
			bo = 1 / 0,
			_o = null,
			Wi = null,
			gn = 0,
			ea = null,
			Mu = null,
			_i = 0,
			_d = 0,
			Sd = null,
			oy = null,
			Pl = 0,
			wd = null;
		function Nr() {
			return (st & 2) !== 0 && Ye !== 0 ? Ye & -Ye : B.T !== null ? Cd() : Li();
		}
		function cy() {
			if (mr === 0)
				if ((Ye & 536870912) === 0 || Je) {
					var n = Zt;
					((Zt <<= 1), (Zt & 3932160) === 0 && (Zt = 262144), (mr = n));
				} else mr = 536870912;
			return ((n = fr.current), n !== null && (n.flags |= 32), mr);
		}
		function er(n, r, a) {
			(((n === wt && (ft === 2 || ft === 9)) || n.cancelPendingCommit !== null) && (Nu(n, 0), ta(n, Ye, mr, !1)),
				In(n, a),
				((st & 2) === 0 || n !== wt) &&
					(n === wt && ((st & 2) === 0 && (Va |= a), $t === 4 && ta(n, Ye, mr, !1)), Si(n)));
		}
		function fy(n, r, a) {
			if ((st & 6) !== 0) throw Error(s(327));
			var l = (!a && (r & 127) === 0 && (r & n.expiredLanes) === 0) || Sn(n, r),
				c = l ? Iw(n, r) : Td(n, r, !0),
				d = l;
			do {
				if (c === 0) {
					Cu && !l && ta(n, r, 0, !1);
					break;
				} else {
					if (((a = n.current.alternate), d && !Dw(a))) {
						((c = Td(n, r, !1)), (d = !1));
						continue;
					}
					if (c === 2) {
						if (((d = r), n.errorRecoveryDisabledLanes & d)) var y = 0;
						else ((y = n.pendingLanes & -536870913), (y = y !== 0 ? y : y & 536870912 ? 536870912 : 0));
						if (y !== 0) {
							r = y;
							e: {
								var x = n;
								c = Zl;
								var z = x.current.memoizedState.isDehydrated;
								if ((z && (Nu(x, y).flags |= 256), (y = Td(x, y, !1)), y !== 2)) {
									if (yd && !z) {
										((x.errorRecoveryDisabledLanes |= d), (Va |= d), (c = 4));
										break e;
									}
									((d = Wn), (Wn = c), d !== null && (Wn === null ? (Wn = d) : Wn.push.apply(Wn, d)));
								}
								c = y;
							}
							if (((d = !1), c !== 2)) continue;
						}
					}
					if (c === 1) {
						(Nu(n, 0), ta(n, r, 0, !0));
						break;
					}
					e: {
						switch (((l = n), (d = c), d)) {
							case 0:
							case 1:
								throw Error(s(345));
							case 4:
								if ((r & 4194048) !== r) break;
							case 6:
								ta(l, r, mr, !Xi);
								break e;
							case 2:
								Wn = null;
								break;
							case 3:
							case 5:
								break;
							default:
								throw Error(s(329));
						}
						if ((r & 62914560) === r && ((c = po + 300 - Ne()), 10 < c)) {
							if ((ta(l, r, mr, !Xi), ur(l, 0, !0) !== 0)) break e;
							((_i = r),
								(l.timeoutHandle = Hy(dy.bind(null, l, a, Wn, _o, bd, r, mr, Va, ku, Xi, d, "Throttled", -0, 0), c)));
							break e;
						}
						dy(l, a, Wn, _o, bd, r, mr, Va, ku, Xi, d, null, -0, 0);
					}
				}
				break;
			} while (!0);
			Si(n);
		}
		function dy(n, r, a, l, c, d, y, x, z, X, ne, ue, W, ee) {
			if (((n.timeoutHandle = -1), (ue = r.subtreeFlags), ue & 8192 || (ue & 16785408) === 16785408)) {
				((ue = {
					stylesheets: null,
					count: 0,
					imgCount: 0,
					imgBytes: 0,
					suspenseyImages: [],
					waitingForImages: !0,
					waitingForViewTransition: !1,
					unsuspend: On,
				}),
					iy(r, d, ue));
				var _e = (d & 62914560) === d ? po - Ne() : (d & 4194048) === d ? sy - Ne() : 0;
				if (((_e = g1(ue, _e)), _e !== null)) {
					((_i = d),
						(n.cancelPendingCommit = _e(_y.bind(null, n, r, d, a, l, c, y, x, z, ne, ue, null, W, ee))),
						ta(n, d, y, !X));
					return;
				}
			}
			_y(n, r, d, a, l, c, y, x, z);
		}
		function Dw(n) {
			for (var r = n; ; ) {
				var a = r.tag;
				if (
					(a === 0 || a === 11 || a === 15) &&
					r.flags & 16384 &&
					((a = r.updateQueue), a !== null && ((a = a.stores), a !== null))
				)
					for (var l = 0; l < a.length; l++) {
						var c = a[l],
							d = c.getSnapshot;
						c = c.value;
						try {
							if (!or(d(), c)) return !1;
						} catch {
							return !1;
						}
					}
				if (((a = r.child), r.subtreeFlags & 16384 && a !== null)) ((a.return = r), (r = a));
				else {
					if (r === n) break;
					for (; r.sibling === null; ) {
						if (r.return === null || r.return === n) return !0;
						r = r.return;
					}
					((r.sibling.return = r.return), (r = r.sibling));
				}
			}
			return !0;
		}
		function ta(n, r, a, l) {
			((r &= ~pd),
				(r &= ~Va),
				(n.suspendedLanes |= r),
				(n.pingedLanes &= ~r),
				l && (n.warmLanes |= r),
				(l = n.expirationTimes));
			for (var c = r; 0 < c; ) {
				var d = 31 - ct(c),
					y = 1 << d;
				((l[d] = -1), (c &= ~y));
			}
			a !== 0 && Lt(n, a, r);
		}
		function So() {
			return (st & 6) === 0 ? (Ql(0, !1), !1) : !0;
		}
		function Ed() {
			if (He !== null) {
				if (ft === 0) var n = He.return;
				else ((n = He), (oi = Na = null), Uf(n), (Su = null), (Cl = 0), (n = He));
				for (; n !== null; ) (Hg(n.alternate, n), (n = n.return));
				He = null;
			}
		}
		function Nu(n, r) {
			var a = n.timeoutHandle;
			(a !== -1 && ((n.timeoutHandle = -1), Jw(a)),
				(a = n.cancelPendingCommit),
				a !== null && ((n.cancelPendingCommit = null), a()),
				(_i = 0),
				Ed(),
				(wt = n),
				(He = a = li(n.current, null)),
				(Ye = r),
				(ft = 0),
				(hr = null),
				(Xi = !1),
				(Cu = Sn(n, r)),
				(yd = !1),
				(ku = mr = pd = Va = Ji = $t = 0),
				(Wn = Zl = null),
				(bd = !1),
				(r & 8) !== 0 && (r |= r & 32));
			var l = n.entangledLanes;
			if (l !== 0)
				for (n = n.entanglements, l &= r; 0 < l; ) {
					var c = 31 - ct(l),
						d = 1 << c;
					((r |= n[c]), (l &= ~d));
				}
			return ((bi = r), Bs(), a);
		}
		function hy(n, r) {
			((qe = null),
				(B.H = Il),
				r === _u || r === Gs
					? ((r = Ov()), (ft = 3))
					: r === Rf
						? ((r = Ov()), (ft = 4))
						: (ft = r === td ? 8 : r !== null && typeof r == "object" && typeof r.then == "function" ? 6 : 1),
				(hr = r),
				He === null && (($t = 1), oo(n, Ar(r, n.current))));
		}
		function my() {
			var n = fr.current;
			return n === null
				? !0
				: (Ye & 4194048) === Ye
					? Mr === null
					: (Ye & 62914560) === Ye || (Ye & 536870912) !== 0
						? n === Mr
						: !1;
		}
		function vy() {
			var n = B.H;
			return ((B.H = Il), n === null ? Il : n);
		}
		function gy() {
			var n = B.A;
			return ((B.A = Ow), n);
		}
		function wo() {
			(($t = 4),
				Xi || ((Ye & 4194048) !== Ye && fr.current !== null) || (Cu = !0),
				((Ji & 134217727) === 0 && (Va & 134217727) === 0) || wt === null || ta(wt, Ye, mr, !1));
		}
		function Td(n, r, a) {
			var l = st;
			st |= 2;
			var c = vy(),
				d = gy();
			((wt !== n || Ye !== r) && ((_o = null), Nu(n, r)), (r = !1));
			var y = $t;
			e: do
				try {
					if (ft !== 0 && He !== null) {
						var x = He,
							z = hr;
						switch (ft) {
							case 8:
								(Ed(), (y = 6));
								break e;
							case 3:
							case 2:
							case 9:
							case 6:
								fr.current === null && (r = !0);
								var X = ft;
								if (((ft = 0), (hr = null), Ou(n, x, z, X), a && Cu)) {
									y = 0;
									break e;
								}
								break;
							default:
								((X = ft), (ft = 0), (hr = null), Ou(n, x, z, X));
						}
					}
					(jw(), (y = $t));
					break;
				} catch (ne) {
					hy(n, ne);
				}
			while (!0);
			return (
				r && n.shellSuspendCounter++,
				(oi = Na = null),
				(st = l),
				(B.H = c),
				(B.A = d),
				He === null && ((wt = null), (Ye = 0), Bs()),
				y
			);
		}
		function jw() {
			for (; He !== null; ) yy(He);
		}
		function Iw(n, r) {
			var a = st;
			st |= 2;
			var l = vy(),
				c = gy();
			wt !== n || Ye !== r ? ((_o = null), (bo = Ne() + 500), Nu(n, r)) : (Cu = Sn(n, r));
			e: do
				try {
					if (ft !== 0 && He !== null) {
						r = He;
						var d = hr;
						t: switch (ft) {
							case 1:
								((ft = 0), (hr = null), Ou(n, r, d, 1));
								break;
							case 2:
							case 9:
								if (Mv(d)) {
									((ft = 0), (hr = null), py(r));
									break;
								}
								((r = function () {
									((ft !== 2 && ft !== 9) || wt !== n || (ft = 7), Si(n));
								}),
									d.then(r, r));
								break e;
							case 3:
								ft = 7;
								break e;
							case 4:
								ft = 5;
								break e;
							case 7:
								Mv(d) ? ((ft = 0), (hr = null), py(r)) : ((ft = 0), (hr = null), Ou(n, r, d, 7));
								break;
							case 5:
								var y = null;
								switch (He.tag) {
									case 26:
										y = He.memoizedState;
									case 5:
									case 27:
										var x = He;
										if (y ? ip(y) : x.stateNode.complete) {
											((ft = 0), (hr = null));
											var z = x.sibling;
											if (z !== null) He = z;
											else {
												var X = x.return;
												X !== null ? ((He = X), Eo(X)) : (He = null);
											}
											break t;
										}
								}
								((ft = 0), (hr = null), Ou(n, r, d, 5));
								break;
							case 6:
								((ft = 0), (hr = null), Ou(n, r, d, 6));
								break;
							case 8:
								(Ed(), ($t = 6));
								break e;
							default:
								throw Error(s(462));
						}
					}
					Lw();
					break;
				} catch (ne) {
					hy(n, ne);
				}
			while (!0);
			return ((oi = Na = null), (B.H = l), (B.A = c), (st = a), He !== null ? 0 : ((wt = null), (Ye = 0), Bs(), $t));
		}
		function Lw() {
			for (; He !== null && !ze(); ) yy(He);
		}
		function yy(n) {
			var r = Bg(n.alternate, n, bi);
			((n.memoizedProps = n.pendingProps), r === null ? Eo(n) : (He = r));
		}
		function py(n) {
			var r = n,
				a = r.alternate;
			switch (r.tag) {
				case 15:
				case 0:
					r = jg(a, r, r.pendingProps, r.type, void 0, Ye);
					break;
				case 11:
					r = jg(a, r, r.pendingProps, r.type.render, r.ref, Ye);
					break;
				case 5:
					Uf(r);
				default:
					(Hg(a, r), (r = He = bv(r, bi)), (r = Bg(a, r, bi)));
			}
			((n.memoizedProps = n.pendingProps), r === null ? Eo(n) : (He = r));
		}
		function Ou(n, r, a, l) {
			((oi = Na = null), Uf(r), (Su = null), (Cl = 0));
			var c = r.return;
			try {
				if (xw(n, c, r, a, Ye)) {
					(($t = 1), oo(n, Ar(a, n.current)), (He = null));
					return;
				}
			} catch (d) {
				if (c !== null) throw ((He = c), d);
				(($t = 1), oo(n, Ar(a, n.current)), (He = null));
				return;
			}
			r.flags & 32768
				? (Je || l === 1
						? (n = !0)
						: Cu || (Ye & 536870912) !== 0
							? (n = !1)
							: ((Xi = n = !0),
								(l === 2 || l === 9 || l === 3 || l === 6) &&
									((l = fr.current), l !== null && l.tag === 13 && (l.flags |= 16384))),
					by(r, n))
				: Eo(r);
		}
		function Eo(n) {
			var r = n;
			do {
				if ((r.flags & 32768) !== 0) {
					by(r, Xi);
					return;
				}
				n = r.return;
				var a = Cw(r.alternate, r, bi);
				if (a !== null) {
					He = a;
					return;
				}
				if (((r = r.sibling), r !== null)) {
					He = r;
					return;
				}
				He = r = n;
			} while (r !== null);
			$t === 0 && ($t = 5);
		}
		function by(n, r) {
			do {
				var a = kw(n.alternate, n);
				if (a !== null) {
					((a.flags &= 32767), (He = a));
					return;
				}
				if (
					((a = n.return),
					a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
					!r && ((n = n.sibling), n !== null))
				) {
					He = n;
					return;
				}
				He = n = a;
			} while (n !== null);
			(($t = 6), (He = null));
		}
		function _y(n, r, a, l, c, d, y, x, z) {
			n.cancelPendingCommit = null;
			do To();
			while (gn !== 0);
			if ((st & 6) !== 0) throw Error(s(327));
			if (r !== null) {
				if (r === n.current) throw Error(s(177));
				if (
					((d = r.lanes | r.childLanes),
					(d |= df),
					Sr(n, a, d, y, x, z),
					n === wt && ((He = wt = null), (Ye = 0)),
					(Mu = r),
					(ea = n),
					(_i = a),
					(_d = d),
					(Sd = c),
					(oy = l),
					(r.subtreeFlags & 10256) !== 0 || (r.flags & 10256) !== 0
						? ((n.callbackNode = null),
							(n.callbackPriority = 0),
							Bw(Vt, function () {
								return (xy(), null);
							}))
						: ((n.callbackNode = null), (n.callbackPriority = 0)),
					(l = (r.flags & 13878) !== 0),
					(r.subtreeFlags & 13878) !== 0 || l)
				) {
					((l = B.T), (B.T = null), (c = P.p), (P.p = 2), (y = st), (st |= 4));
					try {
						Mw(n, r, a);
					} finally {
						((st = y), (P.p = c), (B.T = l));
					}
				}
				((gn = 1), Sy(), wy(), Ey());
			}
		}
		function Sy() {
			if (gn === 1) {
				gn = 0;
				var n = ea,
					r = Mu,
					a = (r.flags & 13878) !== 0;
				if ((r.subtreeFlags & 13878) !== 0 || a) {
					((a = B.T), (B.T = null));
					var l = P.p;
					P.p = 2;
					var c = st;
					st |= 4;
					try {
						ty(r, n);
						var d = jd,
							y = cv(n.containerInfo),
							x = d.focusedElem,
							z = d.selectionRange;
						if (y !== x && x && x.ownerDocument && ov(x.ownerDocument.documentElement, x)) {
							if (z !== null && lf(x)) {
								var X = z.start,
									ne = z.end;
								if ((ne === void 0 && (ne = X), "selectionStart" in x))
									((x.selectionStart = X), (x.selectionEnd = Math.min(ne, x.value.length)));
								else {
									var ue = x.ownerDocument || document,
										W = (ue && ue.defaultView) || window;
									if (W.getSelection) {
										var ee = W.getSelection(),
											_e = x.textContent.length,
											ke = Math.min(z.start, _e),
											gt = z.end === void 0 ? ke : Math.min(z.end, _e);
										!ee.extend && ke > gt && ((y = gt), (gt = ke), (ke = y));
										var Z = sv(x, ke),
											U = sv(x, gt);
										if (
											Z &&
											U &&
											(ee.rangeCount !== 1 ||
												ee.anchorNode !== Z.node ||
												ee.anchorOffset !== Z.offset ||
												ee.focusNode !== U.node ||
												ee.focusOffset !== U.offset)
										) {
											var G = ue.createRange();
											(G.setStart(Z.node, Z.offset),
												ee.removeAllRanges(),
												ke > gt
													? (ee.addRange(G), ee.extend(U.node, U.offset))
													: (G.setEnd(U.node, U.offset), ee.addRange(G)));
										}
									}
								}
							}
							for (ue = [], ee = x; (ee = ee.parentNode); )
								ee.nodeType === 1 && ue.push({ element: ee, left: ee.scrollLeft, top: ee.scrollTop });
							for (typeof x.focus == "function" && x.focus(), x = 0; x < ue.length; x++) {
								var ie = ue[x];
								((ie.element.scrollLeft = ie.left), (ie.element.scrollTop = ie.top));
							}
						}
						((Io = !!Dd), (jd = Dd = null));
					} finally {
						((st = c), (P.p = l), (B.T = a));
					}
				}
				((n.current = r), (gn = 2));
			}
		}
		function wy() {
			if (gn === 2) {
				gn = 0;
				var n = ea,
					r = Mu,
					a = (r.flags & 8772) !== 0;
				if ((r.subtreeFlags & 8772) !== 0 || a) {
					((a = B.T), (B.T = null));
					var l = P.p;
					P.p = 2;
					var c = st;
					st |= 4;
					try {
						Fg(n, r.alternate, r);
					} finally {
						((st = c), (P.p = l), (B.T = a));
					}
				}
				gn = 3;
			}
		}
		function Ey() {
			if (gn === 4 || gn === 3) {
				((gn = 0), rt());
				var n = ea,
					r = Mu,
					a = _i,
					l = oy;
				(r.subtreeFlags & 10256) !== 0 || (r.flags & 10256) !== 0
					? (gn = 5)
					: ((gn = 0), (Mu = ea = null), Ty(n, n.pendingLanes));
				var c = n.pendingLanes;
				if ((c === 0 && (Wi = null), nn(a), (r = r.stateNode), _t && typeof _t.onCommitFiberRoot == "function"))
					try {
						_t.onCommitFiberRoot(kn, r, void 0, (r.current.flags & 128) === 128);
					} catch {}
				if (l !== null) {
					((r = B.T), (c = P.p), (P.p = 2), (B.T = null));
					try {
						for (var d = n.onRecoverableError, y = 0; y < l.length; y++) {
							var x = l[y];
							d(x.value, { componentStack: x.stack });
						}
					} finally {
						((B.T = r), (P.p = c));
					}
				}
				((_i & 3) !== 0 && To(),
					Si(n),
					(c = n.pendingLanes),
					(a & 261930) !== 0 && (c & 42) !== 0 ? (n === wd ? Pl++ : ((Pl = 0), (wd = n))) : (Pl = 0),
					Ql(0, !1));
			}
		}
		function Ty(n, r) {
			(n.pooledCacheLanes &= r) === 0 && ((r = n.pooledCache), r != null && ((n.pooledCache = null), Al(r)));
		}
		function To() {
			return (Sy(), wy(), Ey(), xy());
		}
		function xy() {
			if (gn !== 5) return !1;
			var n = ea,
				r = _d;
			_d = 0;
			var a = nn(_i),
				l = B.T,
				c = P.p;
			try {
				((P.p = 32 > a ? 32 : a), (B.T = null), (a = Sd), (Sd = null));
				var d = ea,
					y = _i;
				if (((gn = 0), (Mu = ea = null), (_i = 0), (st & 6) !== 0)) throw Error(s(331));
				var x = st;
				if (
					((st |= 4),
					uy(d.current),
					ry(d, d.current, y, a),
					(st = x),
					Ql(0, !1),
					_t && typeof _t.onPostCommitFiberRoot == "function")
				)
					try {
						_t.onPostCommitFiberRoot(kn, d);
					} catch {}
				return !0;
			} finally {
				((P.p = c), (B.T = l), Ty(n, r));
			}
		}
		function Ay(n, r, a) {
			((r = Ar(a, r)), (r = ed(n.stateNode, r, 2)), (n = qa(n, r, 2)), n !== null && (In(n, 2), Si(n)));
		}
		function dt(n, r, a) {
			if (n.tag === 3) Ay(n, n, a);
			else
				for (; r !== null; ) {
					if (r.tag === 3) {
						Ay(r, n, a);
						break;
					} else if (r.tag === 1) {
						var l = r.stateNode;
						if (
							typeof r.type.getDerivedStateFromError == "function" ||
							(typeof l.componentDidCatch == "function" && (Wi === null || !Wi.has(l)))
						) {
							((n = Ar(a, n)), (a = Rg(2)), (l = qa(r, a, 2)), l !== null && (Cg(a, l, r, n), In(l, 2), Si(l)));
							break;
						}
					}
					r = r.return;
				}
		}
		function xd(n, r, a) {
			var l = n.pingCache;
			if (l === null) {
				l = n.pingCache = new zw();
				var c = new Set();
				l.set(r, c);
			} else ((c = l.get(r)), c === void 0 && ((c = new Set()), l.set(r, c)));
			c.has(a) || ((yd = !0), c.add(a), (n = qw.bind(null, n, r, a)), r.then(n, n));
		}
		function qw(n, r, a) {
			var l = n.pingCache;
			(l !== null && l.delete(r),
				(n.pingedLanes |= n.suspendedLanes & a),
				(n.warmLanes &= ~a),
				wt === n &&
					(Ye & a) === a &&
					($t === 4 || ($t === 3 && (Ye & 62914560) === Ye && 300 > Ne() - po) ? (st & 2) === 0 && Nu(n, 0) : (pd |= a),
					ku === Ye && (ku = 0)),
				Si(n));
		}
		function Ry(n, r) {
			(r === 0 && (r = lr()), (n = Ca(n, r)), n !== null && (In(n, r), Si(n)));
		}
		function Uw(n) {
			var r = n.memoizedState,
				a = 0;
			(r !== null && (a = r.retryLane), Ry(n, a));
		}
		function $w(n, r) {
			var a = 0;
			switch (n.tag) {
				case 31:
				case 13:
					var l = n.stateNode,
						c = n.memoizedState;
					c !== null && (a = c.retryLane);
					break;
				case 19:
					l = n.stateNode;
					break;
				case 22:
					l = n.stateNode._retryCache;
					break;
				default:
					throw Error(s(314));
			}
			(l !== null && l.delete(r), Ry(n, a));
		}
		function Bw(n, r) {
			return et(n, r);
		}
		var xo = null,
			zu = null,
			Ad = !1,
			Ao = !1,
			Rd = !1,
			na = 0;
		function Si(n) {
			(n !== zu && n.next === null && (zu === null ? (xo = zu = n) : (zu = zu.next = n)),
				(Ao = !0),
				Ad || ((Ad = !0), Hw()));
		}
		function Ql(n, r) {
			if (!Rd && Ao) {
				Rd = !0;
				do
					for (var a = !1, l = xo; l !== null; ) {
						if (!r)
							if (n !== 0) {
								var c = l.pendingLanes;
								if (c === 0) var d = 0;
								else {
									var y = l.suspendedLanes,
										x = l.pingedLanes;
									((d = (1 << (31 - ct(42 | n) + 1)) - 1),
										(d &= c & ~(y & ~x)),
										(d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0));
								}
								d !== 0 && ((a = !0), Ny(l, d));
							} else
								((d = Ye),
									(d = ur(l, l === wt ? d : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1)),
									(d & 3) === 0 || Sn(l, d) || ((a = !0), Ny(l, d)));
						l = l.next;
					}
				while (a);
				Rd = !1;
			}
		}
		function Vw() {
			Cy();
		}
		function Cy() {
			Ao = Ad = !1;
			var n = 0;
			na !== 0 && Xw() && (n = na);
			for (var r = Ne(), a = null, l = xo; l !== null; ) {
				var c = l.next,
					d = ky(l, r);
				(d === 0
					? ((l.next = null), a === null ? (xo = c) : (a.next = c), c === null && (zu = a))
					: ((a = l), (n !== 0 || (d & 3) !== 0) && (Ao = !0)),
					(l = c));
			}
			((gn !== 0 && gn !== 5) || Ql(n, !1), na !== 0 && (na = 0));
		}
		function ky(n, r) {
			for (
				var a = n.suspendedLanes, l = n.pingedLanes, c = n.expirationTimes, d = n.pendingLanes & -62914561;
				0 < d;
			) {
				var y = 31 - ct(d),
					x = 1 << y,
					z = c[y];
				(z === -1 ? ((x & a) === 0 || (x & l) !== 0) && (c[y] = _r(x, r)) : z <= r && (n.expiredLanes |= x), (d &= ~x));
			}
			if (
				((r = wt),
				(a = Ye),
				(a = ur(n, n === r ? a : 0, n.cancelPendingCommit !== null || n.timeoutHandle !== -1)),
				(l = n.callbackNode),
				a === 0 || (n === r && (ft === 2 || ft === 9)) || n.cancelPendingCommit !== null)
			)
				return (l !== null && l !== null && ce(l), (n.callbackNode = null), (n.callbackPriority = 0));
			if ((a & 3) === 0 || Sn(n, a)) {
				if (((r = a & -a), r === n.callbackPriority)) return r;
				switch ((l !== null && ce(l), nn(a))) {
					case 2:
					case 8:
						a = ut;
						break;
					case 32:
						a = Vt;
						break;
					case 268435456:
						a = Yr;
						break;
					default:
						a = Vt;
				}
				return ((l = My.bind(null, n)), (a = et(a, l)), (n.callbackPriority = r), (n.callbackNode = a), r);
			}
			return (l !== null && l !== null && ce(l), (n.callbackPriority = 2), (n.callbackNode = null), 2);
		}
		function My(n, r) {
			if (gn !== 0 && gn !== 5) return ((n.callbackNode = null), (n.callbackPriority = 0), null);
			var a = n.callbackNode;
			if (To() && n.callbackNode !== a) return null;
			var l = Ye;
			return (
				(l = ur(n, n === wt ? l : 0, n.cancelPendingCommit !== null || n.timeoutHandle !== -1)),
				l === 0
					? null
					: (fy(n, l, r), ky(n, Ne()), n.callbackNode != null && n.callbackNode === a ? My.bind(null, n) : null)
			);
		}
		function Ny(n, r) {
			if (To()) return null;
			fy(n, r, !0);
		}
		function Hw() {
			Ww(function () {
				(st & 6) !== 0 ? et(pn, Vw) : Cy();
			});
		}
		function Cd() {
			if (na === 0) {
				var n = pu;
				(n === 0 && ((n = Ht), (Ht <<= 1), (Ht & 261888) === 0 && (Ht = 256)), (na = n));
			}
			return na;
		}
		function Oy(n) {
			return n == null || typeof n == "symbol" || typeof n == "boolean"
				? null
				: typeof n == "function"
					? n
					: Ta("" + n);
		}
		function zy(n, r) {
			var a = r.ownerDocument.createElement("input");
			return (
				(a.name = r.name),
				(a.value = r.value),
				n.id && a.setAttribute("form", n.id),
				r.parentNode.insertBefore(a, r),
				(n = new FormData(n)),
				a.parentNode.removeChild(a),
				n
			);
		}
		function Zw(n, r, a, l, c) {
			if (r === "submit" && a && a.stateNode === c) {
				var d = Oy((c[rn] || null).action),
					y = l.submitter;
				y &&
					((r = (r = y[rn] || null) ? Oy(r.formAction) : y.getAttribute("formAction")),
					r !== null && ((d = r), (y = null)));
				var x = new lt("action", "action", null, l, c);
				n.push({
					event: x,
					listeners: [
						{
							instance: null,
							listener: function () {
								if (l.defaultPrevented) {
									if (na !== 0) {
										var z = y ? zy(c, y) : new FormData(c);
										Yf(a, { pending: !0, data: z, method: c.method, action: d }, null, z);
									}
								} else
									typeof d == "function" &&
										(x.preventDefault(),
										(z = y ? zy(c, y) : new FormData(c)),
										Yf(a, { pending: !0, data: z, method: c.method, action: d }, d, z));
							},
							currentTarget: c,
						},
					],
				});
			}
		}
		for (var kd = 0; kd < ff.length; kd++) {
			var Md = ff[kd];
			Hr(Md.toLowerCase(), "on" + (Md[0].toUpperCase() + Md.slice(1)));
		}
		(Hr(hv, "onAnimationEnd"),
			Hr(mv, "onAnimationIteration"),
			Hr(vv, "onAnimationStart"),
			Hr("dblclick", "onDoubleClick"),
			Hr("focusin", "onFocus"),
			Hr("focusout", "onBlur"),
			Hr(aw, "onTransitionRun"),
			Hr(uw, "onTransitionStart"),
			Hr(lw, "onTransitionCancel"),
			Hr(gv, "onTransitionEnd"),
			Te("onMouseEnter", ["mouseout", "mouseover"]),
			Te("onMouseLeave", ["mouseout", "mouseover"]),
			Te("onPointerEnter", ["pointerout", "pointerover"]),
			Te("onPointerLeave", ["pointerout", "pointerover"]),
			ve("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
			ve("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
			ve("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
			ve("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
			ve("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
			ve("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" ")));
		var Kl =
				"abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
					" ",
				),
			Pw = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Kl));
		function Dy(n, r) {
			r = (r & 4) !== 0;
			for (var a = 0; a < n.length; a++) {
				var l = n[a],
					c = l.event;
				l = l.listeners;
				e: {
					var d = void 0;
					if (r)
						for (var y = l.length - 1; 0 <= y; y--) {
							var x = l[y],
								z = x.instance,
								X = x.currentTarget;
							if (((x = x.listener), z !== d && c.isPropagationStopped())) break e;
							((d = x), (c.currentTarget = X));
							try {
								d(c);
							} catch (ne) {
								$s(ne);
							}
							((c.currentTarget = null), (d = z));
						}
					else
						for (y = 0; y < l.length; y++) {
							if (
								((x = l[y]),
								(z = x.instance),
								(X = x.currentTarget),
								(x = x.listener),
								z !== d && c.isPropagationStopped())
							)
								break e;
							((d = x), (c.currentTarget = X));
							try {
								d(c);
							} catch (ne) {
								$s(ne);
							}
							((c.currentTarget = null), (d = z));
						}
				}
			}
		}
		function Ze(n, r) {
			var a = r[qr];
			a === void 0 && (a = r[qr] = new Set());
			var l = n + "__bubble";
			a.has(l) || (Iy(r, n, 2, !1), a.add(l));
		}
		function Nd(n, r, a) {
			var l = 0;
			(r && (l |= 4), Iy(a, n, l, r));
		}
		var Ro = "_reactListening" + Math.random().toString(36).slice(2);
		function jy(n) {
			if (!n[Ro]) {
				((n[Ro] = !0),
					Ea.forEach(function (a) {
						a !== "selectionchange" && (Pw.has(a) || Nd(a, !1, n), Nd(a, !0, n));
					}));
				var r = n.nodeType === 9 ? n : n.ownerDocument;
				r === null || r[Ro] || ((r[Ro] = !0), Nd("selectionchange", !1, r));
			}
		}
		function Iy(n, r, a, l) {
			switch (op(r)) {
				case 2:
					var c = S1;
					break;
				case 8:
					c = w1;
					break;
				default:
					c = Qd;
			}
			((a = c.bind(null, r, a, n)),
				(c = void 0),
				!R || (r !== "touchstart" && r !== "touchmove" && r !== "wheel") || (c = !0),
				l
					? c !== void 0
						? n.addEventListener(r, a, { capture: !0, passive: c })
						: n.addEventListener(r, a, !0)
					: c !== void 0
						? n.addEventListener(r, a, { passive: c })
						: n.addEventListener(r, a, !1));
		}
		function Od(n, r, a, l, c) {
			var d = l;
			if ((r & 1) === 0 && (r & 2) === 0 && l !== null)
				e: for (;;) {
					if (l === null) return;
					var y = l.tag;
					if (y === 3 || y === 4) {
						var x = l.stateNode.containerInfo;
						if (x === c) break;
						if (y === 4)
							for (y = l.return; y !== null; ) {
								var z = y.tag;
								if ((z === 3 || z === 4) && y.stateNode.containerInfo === c) return;
								y = y.return;
							}
						for (; x !== null; ) {
							if (((y = Kt(x)), y === null)) return;
							if (((z = y.tag), z === 5 || z === 6 || z === 26 || z === 27)) {
								l = d = y;
								continue e;
							}
							x = x.parentNode;
						}
					}
					l = l.return;
				}
			lu(function () {
				var X = d,
					ne = $n(a),
					ue = [];
				e: {
					var W = yv.get(n);
					if (W !== void 0) {
						var ee = lt,
							_e = n;
						switch (n) {
							case "keypress":
								if (Me(a) === 0) break e;
							case "keydown":
							case "keyup":
								ee = VS;
								break;
							case "focusin":
								((_e = "focus"), (ee = tf));
								break;
							case "focusout":
								((_e = "blur"), (ee = tf));
								break;
							case "beforeblur":
							case "afterblur":
								ee = tf;
								break;
							case "click":
								if (a.button === 2) break e;
							case "auxclick":
							case "dblclick":
							case "mousedown":
							case "mousemove":
							case "mouseup":
							case "mouseout":
							case "mouseover":
							case "contextmenu":
								ee = Qm;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								ee = jS;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								ee = HS;
								break;
							case hv:
							case mv:
							case vv:
								ee = IS;
								break;
							case gv:
								ee = ZS;
								break;
							case "scroll":
							case "scrollend":
								ee = gl;
								break;
							case "wheel":
								ee = PS;
								break;
							case "copy":
							case "cut":
							case "paste":
								ee = LS;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								ee = Ym;
								break;
							case "toggle":
							case "beforetoggle":
								ee = QS;
						}
						var ke = (r & 4) !== 0,
							gt = !ke && (n === "scroll" || n === "scrollend"),
							Z = ke ? (W !== null ? W + "Capture" : null) : W;
						ke = [];
						for (var U = X, G; U !== null; ) {
							var ie = U;
							if (
								((G = ie.stateNode),
								(ie = ie.tag),
								(ie !== 5 && ie !== 26 && ie !== 27) ||
									G === null ||
									Z === null ||
									((ie = Vi(U, Z)), ie != null && ke.push(Yl(U, ie, G))),
								gt)
							)
								break;
							U = U.return;
						}
						0 < ke.length && ((W = new ee(W, _e, null, a, ne)), ue.push({ event: W, listeners: ke }));
					}
				}
				if ((r & 7) === 0) {
					e: {
						if (
							((W = n === "mouseover" || n === "pointerover"),
							(ee = n === "mouseout" || n === "pointerout"),
							W && a !== ml && (_e = a.relatedTarget || a.fromElement) && (Kt(_e) || _e[wr]))
						)
							break e;
						if (
							(ee || W) &&
							((W = ne.window === ne ? ne : (W = ne.ownerDocument) ? W.defaultView || W.parentWindow : window),
							ee
								? ((_e = a.relatedTarget || a.toElement),
									(ee = X),
									(_e = _e ? Kt(_e) : null),
									_e !== null &&
										((gt = f(_e)), (ke = _e.tag), _e !== gt || (ke !== 5 && ke !== 27 && ke !== 6)) &&
										(_e = null))
								: ((ee = null), (_e = X)),
							ee !== _e)
						) {
							if (
								((ke = Qm),
								(ie = "onMouseLeave"),
								(Z = "onMouseEnter"),
								(U = "mouse"),
								(n === "pointerout" || n === "pointerover") &&
									((ke = Ym), (ie = "onPointerLeave"), (Z = "onPointerEnter"), (U = "pointer")),
								(gt = ee == null ? W : Nn(ee)),
								(G = _e == null ? W : Nn(_e)),
								(W = new ke(ie, U + "leave", ee, a, ne)),
								(W.target = gt),
								(W.relatedTarget = G),
								(ie = null),
								Kt(ne) === X &&
									((ke = new ke(Z, U + "enter", _e, a, ne)), (ke.target = G), (ke.relatedTarget = gt), (ie = ke)),
								(gt = ie),
								ee && _e)
							)
								t: {
									for (ke = Qw, Z = ee, U = _e, G = 0, ie = Z; ie; ie = ke(ie)) G++;
									ie = 0;
									for (var Ae = U; Ae; Ae = ke(Ae)) ie++;
									for (; 0 < G - ie; ) ((Z = ke(Z)), G--);
									for (; 0 < ie - G; ) ((U = ke(U)), ie--);
									for (; G--; ) {
										if (Z === U || (U !== null && Z === U.alternate)) {
											ke = Z;
											break t;
										}
										((Z = ke(Z)), (U = ke(U)));
									}
									ke = null;
								}
							else ke = null;
							(ee !== null && Ly(ue, W, ee, ke, !1), _e !== null && gt !== null && Ly(ue, gt, _e, ke, !0));
						}
					}
					e: {
						if (
							((W = X ? Nn(X) : window),
							(ee = W.nodeName && W.nodeName.toLowerCase()),
							ee === "select" || (ee === "input" && W.type === "file"))
						)
							var it = nv;
						else if (ev(W))
							if (rv) it = nw;
							else {
								it = ew;
								var we = WS;
							}
						else
							((ee = W.nodeName),
								!ee || ee.toLowerCase() !== "input" || (W.type !== "checkbox" && W.type !== "radio")
									? X && hl(X.elementType) && (it = nv)
									: (it = tw));
						if (it && (it = it(n, X))) {
							tv(ue, it, a, ne);
							break e;
						}
						(we && we(n, W, X),
							n === "focusout" &&
								X &&
								W.type === "number" &&
								X.memoizedProps.value != null &&
								cl(W, "number", W.value));
					}
					switch (((we = X ? Nn(X) : window), n)) {
						case "focusin":
							(ev(we) || we.contentEditable === "true") && ((cu = we), (sf = X), (El = null));
							break;
						case "focusout":
							El = sf = cu = null;
							break;
						case "mousedown":
							of = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							((of = !1), fv(ue, a, ne));
							break;
						case "selectionchange":
							if (iw) break;
						case "keydown":
						case "keyup":
							fv(ue, a, ne);
					}
					var Ue;
					if (rf)
						e: {
							switch (n) {
								case "compositionstart":
									var Ge = "onCompositionStart";
									break e;
								case "compositionend":
									Ge = "onCompositionEnd";
									break e;
								case "compositionupdate":
									Ge = "onCompositionUpdate";
									break e;
							}
							Ge = void 0;
						}
					else
						ou
							? Jm(n, a) && (Ge = "onCompositionEnd")
							: n === "keydown" && a.keyCode === 229 && (Ge = "onCompositionStart");
					(Ge &&
						(Gm &&
							a.locale !== "ko" &&
							(ou || Ge !== "onCompositionStart"
								? Ge === "onCompositionEnd" && ou && (Ue = pe())
								: ((F = ne), (de = "value" in F ? F.value : F.textContent), (ou = !0))),
						(we = Co(X, Ge)),
						0 < we.length &&
							((Ge = new Km(Ge, n, null, a, ne)),
							ue.push({ event: Ge, listeners: we }),
							Ue ? (Ge.data = Ue) : ((Ue = Wm(a)), Ue !== null && (Ge.data = Ue)))),
						(Ue = YS ? GS(n, a) : FS(n, a)) &&
							((Ge = Co(X, "onBeforeInput")),
							0 < Ge.length &&
								((we = new Km("onBeforeInput", "beforeinput", null, a, ne)),
								ue.push({ event: we, listeners: Ge }),
								(we.data = Ue))),
						Zw(ue, n, X, a, ne));
				}
				Dy(ue, r);
			});
		}
		function Yl(n, r, a) {
			return { instance: n, listener: r, currentTarget: a };
		}
		function Co(n, r) {
			for (var a = r + "Capture", l = []; n !== null; ) {
				var c = n,
					d = c.stateNode;
				if (
					((c = c.tag),
					(c !== 5 && c !== 26 && c !== 27) ||
						d === null ||
						((c = Vi(n, a)), c != null && l.unshift(Yl(n, c, d)), (c = Vi(n, r)), c != null && l.push(Yl(n, c, d))),
					n.tag === 3)
				)
					return l;
				n = n.return;
			}
			return [];
		}
		function Qw(n) {
			if (n === null) return null;
			do n = n.return;
			while (n && n.tag !== 5 && n.tag !== 27);
			return n || null;
		}
		function Ly(n, r, a, l, c) {
			for (var d = r._reactName, y = []; a !== null && a !== l; ) {
				var x = a,
					z = x.alternate,
					X = x.stateNode;
				if (((x = x.tag), z !== null && z === l)) break;
				((x !== 5 && x !== 26 && x !== 27) ||
					X === null ||
					((z = X),
					c
						? ((X = Vi(a, d)), X != null && y.unshift(Yl(a, X, z)))
						: c || ((X = Vi(a, d)), X != null && y.push(Yl(a, X, z)))),
					(a = a.return));
			}
			y.length !== 0 && n.push({ event: r, listeners: y });
		}
		var Kw = /\r\n?/g,
			Yw = /\u0000|\uFFFD/g;
		function qy(n) {
			return (typeof n == "string" ? n : "" + n)
				.replace(
					Kw,
					`
`,
				)
				.replace(Yw, "");
		}
		function Uy(n, r) {
			return ((r = qy(r)), qy(n) === r);
		}
		function vt(n, r, a, l, c, d) {
			switch (a) {
				case "children":
					typeof l == "string"
						? r === "body" || (r === "textarea" && l === "") || Br(n, l)
						: (typeof l == "number" || typeof l == "bigint") && r !== "body" && Br(n, "" + l);
					break;
				case "className":
					Ur(n, "class", l);
					break;
				case "tabIndex":
					Ur(n, "tabindex", l);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					Ur(n, a, l);
					break;
				case "style":
					dl(n, l, d);
					break;
				case "data":
					if (r !== "object") {
						Ur(n, "data", l);
						break;
					}
				case "src":
				case "href":
					if (l === "" && (r !== "a" || a !== "href")) {
						n.removeAttribute(a);
						break;
					}
					if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
						n.removeAttribute(a);
						break;
					}
					((l = Ta("" + l)), n.setAttribute(a, l));
					break;
				case "action":
				case "formAction":
					if (typeof l == "function") {
						n.setAttribute(
							a,
							"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
						);
						break;
					} else
						typeof d == "function" &&
							(a === "formAction"
								? (r !== "input" && vt(n, r, "name", c.name, c, null),
									vt(n, r, "formEncType", c.formEncType, c, null),
									vt(n, r, "formMethod", c.formMethod, c, null),
									vt(n, r, "formTarget", c.formTarget, c, null))
								: (vt(n, r, "encType", c.encType, c, null),
									vt(n, r, "method", c.method, c, null),
									vt(n, r, "target", c.target, c, null)));
					if (l == null || typeof l == "symbol" || typeof l == "boolean") {
						n.removeAttribute(a);
						break;
					}
					((l = Ta("" + l)), n.setAttribute(a, l));
					break;
				case "onClick":
					l != null && (n.onclick = On);
					break;
				case "onScroll":
					l != null && Ze("scroll", n);
					break;
				case "onScrollEnd":
					l != null && Ze("scrollend", n);
					break;
				case "dangerouslySetInnerHTML":
					if (l != null) {
						if (typeof l != "object" || !("__html" in l)) throw Error(s(61));
						if (((a = l.__html), a != null)) {
							if (c.children != null) throw Error(s(60));
							n.innerHTML = a;
						}
					}
					break;
				case "multiple":
					n.multiple = l && typeof l != "function" && typeof l != "symbol";
					break;
				case "muted":
					n.muted = l && typeof l != "function" && typeof l != "symbol";
					break;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "defaultValue":
				case "defaultChecked":
				case "innerHTML":
				case "ref":
					break;
				case "autoFocus":
					break;
				case "xlinkHref":
					if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
						n.removeAttribute("xlink:href");
						break;
					}
					((a = Ta("" + l)), n.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a));
					break;
				case "contentEditable":
				case "spellCheck":
				case "draggable":
				case "value":
				case "autoReverse":
				case "externalResourcesRequired":
				case "focusable":
				case "preserveAlpha":
					l != null && typeof l != "function" && typeof l != "symbol"
						? n.setAttribute(a, "" + l)
						: n.removeAttribute(a);
					break;
				case "inert":
				case "allowFullScreen":
				case "async":
				case "autoPlay":
				case "controls":
				case "default":
				case "defer":
				case "disabled":
				case "disablePictureInPicture":
				case "disableRemotePlayback":
				case "formNoValidate":
				case "hidden":
				case "loop":
				case "noModule":
				case "noValidate":
				case "open":
				case "playsInline":
				case "readOnly":
				case "required":
				case "reversed":
				case "scoped":
				case "seamless":
				case "itemScope":
					l && typeof l != "function" && typeof l != "symbol" ? n.setAttribute(a, "") : n.removeAttribute(a);
					break;
				case "capture":
				case "download":
					l === !0
						? n.setAttribute(a, "")
						: l !== !1 && l != null && typeof l != "function" && typeof l != "symbol"
							? n.setAttribute(a, l)
							: n.removeAttribute(a);
					break;
				case "cols":
				case "rows":
				case "size":
				case "span":
					l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l
						? n.setAttribute(a, l)
						: n.removeAttribute(a);
					break;
				case "rowSpan":
				case "start":
					l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l)
						? n.removeAttribute(a)
						: n.setAttribute(a, l);
					break;
				case "popover":
					(Ze("beforetoggle", n), Ze("toggle", n), ht(n, "popover", l));
					break;
				case "xlinkActuate":
					Gn(n, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
					break;
				case "xlinkArcrole":
					Gn(n, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
					break;
				case "xlinkRole":
					Gn(n, "http://www.w3.org/1999/xlink", "xlink:role", l);
					break;
				case "xlinkShow":
					Gn(n, "http://www.w3.org/1999/xlink", "xlink:show", l);
					break;
				case "xlinkTitle":
					Gn(n, "http://www.w3.org/1999/xlink", "xlink:title", l);
					break;
				case "xlinkType":
					Gn(n, "http://www.w3.org/1999/xlink", "xlink:type", l);
					break;
				case "xmlBase":
					Gn(n, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
					break;
				case "xmlLang":
					Gn(n, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
					break;
				case "xmlSpace":
					Gn(n, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
					break;
				case "is":
					ht(n, "is", l);
					break;
				case "innerText":
				case "textContent":
					break;
				default:
					(!(2 < a.length) || (a[0] !== "o" && a[0] !== "O") || (a[1] !== "n" && a[1] !== "N")) &&
						((a = Ls.get(a) || a), ht(n, a, l));
			}
		}
		function zd(n, r, a, l, c, d) {
			switch (a) {
				case "style":
					dl(n, l, d);
					break;
				case "dangerouslySetInnerHTML":
					if (l != null) {
						if (typeof l != "object" || !("__html" in l)) throw Error(s(61));
						if (((a = l.__html), a != null)) {
							if (c.children != null) throw Error(s(60));
							n.innerHTML = a;
						}
					}
					break;
				case "children":
					typeof l == "string" ? Br(n, l) : (typeof l == "number" || typeof l == "bigint") && Br(n, "" + l);
					break;
				case "onScroll":
					l != null && Ze("scroll", n);
					break;
				case "onScrollEnd":
					l != null && Ze("scrollend", n);
					break;
				case "onClick":
					l != null && (n.onclick = On);
					break;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "innerHTML":
				case "ref":
					break;
				case "innerText":
				case "textContent":
					break;
				default:
					if (!J.hasOwnProperty(a))
						e: {
							if (
								a[0] === "o" &&
								a[1] === "n" &&
								((c = a.endsWith("Capture")),
								(r = a.slice(2, c ? a.length - 7 : void 0)),
								(d = n[rn] || null),
								(d = d != null ? d[a] : null),
								typeof d == "function" && n.removeEventListener(r, d, c),
								typeof l == "function")
							) {
								(typeof d != "function" &&
									d !== null &&
									(a in n ? (n[a] = null) : n.hasAttribute(a) && n.removeAttribute(a)),
									n.addEventListener(r, l, c));
								break e;
							}
							a in n ? (n[a] = l) : l === !0 ? n.setAttribute(a, "") : ht(n, a, l);
						}
			}
		}
		function An(n, r, a) {
			switch (r) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li":
					break;
				case "img":
					(Ze("error", n), Ze("load", n));
					var l = !1,
						c = !1,
						d;
					for (d in a)
						if (a.hasOwnProperty(d)) {
							var y = a[d];
							if (y != null)
								switch (d) {
									case "src":
										l = !0;
										break;
									case "srcSet":
										c = !0;
										break;
									case "children":
									case "dangerouslySetInnerHTML":
										throw Error(s(137, r));
									default:
										vt(n, r, d, y, a, null);
								}
						}
					(c && vt(n, r, "srcSet", a.srcSet, a, null), l && vt(n, r, "src", a.src, a, null));
					return;
				case "input":
					Ze("invalid", n);
					var x = (d = y = c = null),
						z = null,
						X = null;
					for (l in a)
						if (a.hasOwnProperty(l)) {
							var ne = a[l];
							if (ne != null)
								switch (l) {
									case "name":
										c = ne;
										break;
									case "type":
										y = ne;
										break;
									case "checked":
										z = ne;
										break;
									case "defaultChecked":
										X = ne;
										break;
									case "value":
										d = ne;
										break;
									case "defaultValue":
										x = ne;
										break;
									case "children":
									case "dangerouslySetInnerHTML":
										if (ne != null) throw Error(s(137, r));
										break;
									default:
										vt(n, r, l, ne, a, null);
								}
						}
					Ds(n, d, x, z, X, y, c, !1);
					return;
				case "select":
					(Ze("invalid", n), (l = y = d = null));
					for (c in a)
						if (a.hasOwnProperty(c) && ((x = a[c]), x != null))
							switch (c) {
								case "value":
									d = x;
									break;
								case "defaultValue":
									y = x;
									break;
								case "multiple":
									l = x;
								default:
									vt(n, r, c, x, a, null);
							}
					((r = d), (a = y), (n.multiple = !!l), r != null ? $r(n, !!l, r, !1) : a != null && $r(n, !!l, a, !0));
					return;
				case "textarea":
					(Ze("invalid", n), (d = c = l = null));
					for (y in a)
						if (a.hasOwnProperty(y) && ((x = a[y]), x != null))
							switch (y) {
								case "value":
									l = x;
									break;
								case "defaultValue":
									c = x;
									break;
								case "children":
									d = x;
									break;
								case "dangerouslySetInnerHTML":
									if (x != null) throw Error(s(91));
									break;
								default:
									vt(n, r, y, x, a, null);
							}
					fl(n, l, c, d);
					return;
				case "option":
					for (z in a)
						if (a.hasOwnProperty(z) && ((l = a[z]), l != null))
							switch (z) {
								case "selected":
									n.selected = l && typeof l != "function" && typeof l != "symbol";
									break;
								default:
									vt(n, r, z, l, a, null);
							}
					return;
				case "dialog":
					(Ze("beforetoggle", n), Ze("toggle", n), Ze("cancel", n), Ze("close", n));
					break;
				case "iframe":
				case "object":
					Ze("load", n);
					break;
				case "video":
				case "audio":
					for (l = 0; l < Kl.length; l++) Ze(Kl[l], n);
					break;
				case "image":
					(Ze("error", n), Ze("load", n));
					break;
				case "details":
					Ze("toggle", n);
					break;
				case "embed":
				case "source":
				case "link":
					(Ze("error", n), Ze("load", n));
				case "area":
				case "base":
				case "br":
				case "col":
				case "hr":
				case "keygen":
				case "meta":
				case "param":
				case "track":
				case "wbr":
				case "menuitem":
					for (X in a)
						if (a.hasOwnProperty(X) && ((l = a[X]), l != null))
							switch (X) {
								case "children":
								case "dangerouslySetInnerHTML":
									throw Error(s(137, r));
								default:
									vt(n, r, X, l, a, null);
							}
					return;
				default:
					if (hl(r)) {
						for (ne in a) a.hasOwnProperty(ne) && ((l = a[ne]), l !== void 0 && zd(n, r, ne, l, a, void 0));
						return;
					}
			}
			for (x in a) a.hasOwnProperty(x) && ((l = a[x]), l != null && vt(n, r, x, l, a, null));
		}
		function Gw(n, r, a, l) {
			switch (r) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li":
					break;
				case "input":
					var c = null,
						d = null,
						y = null,
						x = null,
						z = null,
						X = null,
						ne = null;
					for (ee in a) {
						var ue = a[ee];
						if (a.hasOwnProperty(ee) && ue != null)
							switch (ee) {
								case "checked":
									break;
								case "value":
									break;
								case "defaultValue":
									z = ue;
								default:
									l.hasOwnProperty(ee) || vt(n, r, ee, null, l, ue);
							}
					}
					for (var W in l) {
						var ee = l[W];
						if (((ue = a[W]), l.hasOwnProperty(W) && (ee != null || ue != null)))
							switch (W) {
								case "type":
									d = ee;
									break;
								case "name":
									c = ee;
									break;
								case "checked":
									X = ee;
									break;
								case "defaultChecked":
									ne = ee;
									break;
								case "value":
									y = ee;
									break;
								case "defaultValue":
									x = ee;
									break;
								case "children":
								case "dangerouslySetInnerHTML":
									if (ee != null) throw Error(s(137, r));
									break;
								default:
									ee !== ue && vt(n, r, W, ee, l, ue);
							}
					}
					ol(n, y, x, z, X, ne, d, c);
					return;
				case "select":
					ee = y = x = W = null;
					for (d in a)
						if (((z = a[d]), a.hasOwnProperty(d) && z != null))
							switch (d) {
								case "value":
									break;
								case "multiple":
									ee = z;
								default:
									l.hasOwnProperty(d) || vt(n, r, d, null, l, z);
							}
					for (c in l)
						if (((d = l[c]), (z = a[c]), l.hasOwnProperty(c) && (d != null || z != null)))
							switch (c) {
								case "value":
									W = d;
									break;
								case "defaultValue":
									x = d;
									break;
								case "multiple":
									y = d;
								default:
									d !== z && vt(n, r, c, d, l, z);
							}
					((r = x),
						(a = y),
						(l = ee),
						W != null
							? $r(n, !!a, W, !1)
							: !!l != !!a && (r != null ? $r(n, !!a, r, !0) : $r(n, !!a, a ? [] : "", !1)));
					return;
				case "textarea":
					ee = W = null;
					for (x in a)
						if (((c = a[x]), a.hasOwnProperty(x) && c != null && !l.hasOwnProperty(x)))
							switch (x) {
								case "value":
									break;
								case "children":
									break;
								default:
									vt(n, r, x, null, l, c);
							}
					for (y in l)
						if (((c = l[y]), (d = a[y]), l.hasOwnProperty(y) && (c != null || d != null)))
							switch (y) {
								case "value":
									W = c;
									break;
								case "defaultValue":
									ee = c;
									break;
								case "children":
									break;
								case "dangerouslySetInnerHTML":
									if (c != null) throw Error(s(91));
									break;
								default:
									c !== d && vt(n, r, y, c, l, d);
							}
					Un(n, W, ee);
					return;
				case "option":
					for (var _e in a)
						if (((W = a[_e]), a.hasOwnProperty(_e) && W != null && !l.hasOwnProperty(_e)))
							switch (_e) {
								case "selected":
									n.selected = !1;
									break;
								default:
									vt(n, r, _e, null, l, W);
							}
					for (z in l)
						if (((W = l[z]), (ee = a[z]), l.hasOwnProperty(z) && W !== ee && (W != null || ee != null)))
							switch (z) {
								case "selected":
									n.selected = W && typeof W != "function" && typeof W != "symbol";
									break;
								default:
									vt(n, r, z, W, l, ee);
							}
					return;
				case "img":
				case "link":
				case "area":
				case "base":
				case "br":
				case "col":
				case "embed":
				case "hr":
				case "keygen":
				case "meta":
				case "param":
				case "source":
				case "track":
				case "wbr":
				case "menuitem":
					for (var ke in a)
						((W = a[ke]), a.hasOwnProperty(ke) && W != null && !l.hasOwnProperty(ke) && vt(n, r, ke, null, l, W));
					for (X in l)
						if (((W = l[X]), (ee = a[X]), l.hasOwnProperty(X) && W !== ee && (W != null || ee != null)))
							switch (X) {
								case "children":
								case "dangerouslySetInnerHTML":
									if (W != null) throw Error(s(137, r));
									break;
								default:
									vt(n, r, X, W, l, ee);
							}
					return;
				default:
					if (hl(r)) {
						for (var gt in a)
							((W = a[gt]),
								a.hasOwnProperty(gt) && W !== void 0 && !l.hasOwnProperty(gt) && zd(n, r, gt, void 0, l, W));
						for (ne in l)
							((W = l[ne]),
								(ee = a[ne]),
								!l.hasOwnProperty(ne) || W === ee || (W === void 0 && ee === void 0) || zd(n, r, ne, W, l, ee));
						return;
					}
			}
			for (var Z in a)
				((W = a[Z]), a.hasOwnProperty(Z) && W != null && !l.hasOwnProperty(Z) && vt(n, r, Z, null, l, W));
			for (ue in l)
				((W = l[ue]),
					(ee = a[ue]),
					!l.hasOwnProperty(ue) || W === ee || (W == null && ee == null) || vt(n, r, ue, W, l, ee));
		}
		function $y(n) {
			switch (n) {
				case "css":
				case "script":
				case "font":
				case "img":
				case "image":
				case "input":
				case "link":
					return !0;
				default:
					return !1;
			}
		}
		function Fw() {
			if (typeof performance.getEntriesByType == "function") {
				for (var n = 0, r = 0, a = performance.getEntriesByType("resource"), l = 0; l < a.length; l++) {
					var c = a[l],
						d = c.transferSize,
						y = c.initiatorType,
						x = c.duration;
					if (d && x && $y(y)) {
						for (y = 0, x = c.responseEnd, l += 1; l < a.length; l++) {
							var z = a[l],
								X = z.startTime;
							if (X > x) break;
							var ne = z.transferSize,
								ue = z.initiatorType;
							ne && $y(ue) && ((z = z.responseEnd), (y += ne * (z < x ? 1 : (x - X) / (z - X))));
						}
						if ((--l, (r += (8 * (d + y)) / (c.duration / 1e3)), n++, 10 < n)) break;
					}
				}
				if (0 < n) return r / n / 1e6;
			}
			return navigator.connection && ((n = navigator.connection.downlink), typeof n == "number") ? n : 5;
		}
		var Dd = null,
			jd = null;
		function ko(n) {
			return n.nodeType === 9 ? n : n.ownerDocument;
		}
		function By(n) {
			switch (n) {
				case "http://www.w3.org/2000/svg":
					return 1;
				case "http://www.w3.org/1998/Math/MathML":
					return 2;
				default:
					return 0;
			}
		}
		function Vy(n, r) {
			if (n === 0)
				switch (r) {
					case "svg":
						return 1;
					case "math":
						return 2;
					default:
						return 0;
				}
			return n === 1 && r === "foreignObject" ? 0 : n;
		}
		function Id(n, r) {
			return (
				n === "textarea" ||
				n === "noscript" ||
				typeof r.children == "string" ||
				typeof r.children == "number" ||
				typeof r.children == "bigint" ||
				(typeof r.dangerouslySetInnerHTML == "object" &&
					r.dangerouslySetInnerHTML !== null &&
					r.dangerouslySetInnerHTML.__html != null)
			);
		}
		var Ld = null;
		function Xw() {
			var n = window.event;
			return n && n.type === "popstate" ? (n === Ld ? !1 : ((Ld = n), !0)) : ((Ld = null), !1);
		}
		var Hy = typeof setTimeout == "function" ? setTimeout : void 0,
			Jw = typeof clearTimeout == "function" ? clearTimeout : void 0,
			Zy = typeof Promise == "function" ? Promise : void 0,
			Ww =
				typeof queueMicrotask == "function"
					? queueMicrotask
					: typeof Zy < "u"
						? function (n) {
								return Zy.resolve(null).then(n).catch(e1);
							}
						: Hy;
		function e1(n) {
			setTimeout(function () {
				throw n;
			});
		}
		function ra(n) {
			return n === "head";
		}
		function Py(n, r) {
			var a = r,
				l = 0;
			do {
				var c = a.nextSibling;
				if ((n.removeChild(a), c && c.nodeType === 8))
					if (((a = c.data), a === "/$" || a === "/&")) {
						if (l === 0) {
							(n.removeChild(c), Lu(r));
							return;
						}
						l--;
					} else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&") l++;
					else if (a === "html") Gl(n.ownerDocument.documentElement);
					else if (a === "head") {
						((a = n.ownerDocument.head), Gl(a));
						for (var d = a.firstChild; d; ) {
							var y = d.nextSibling,
								x = d.nodeName;
							(d[Kn] ||
								x === "SCRIPT" ||
								x === "STYLE" ||
								(x === "LINK" && d.rel.toLowerCase() === "stylesheet") ||
								a.removeChild(d),
								(d = y));
						}
					} else a === "body" && Gl(n.ownerDocument.body);
				a = c;
			} while (a);
			Lu(r);
		}
		function Qy(n, r) {
			var a = n;
			n = 0;
			do {
				var l = a.nextSibling;
				if (
					(a.nodeType === 1
						? r
							? ((a._stashedDisplay = a.style.display), (a.style.display = "none"))
							: ((a.style.display = a._stashedDisplay || ""),
								a.getAttribute("style") === "" && a.removeAttribute("style"))
						: a.nodeType === 3 &&
							(r ? ((a._stashedText = a.nodeValue), (a.nodeValue = "")) : (a.nodeValue = a._stashedText || "")),
					l && l.nodeType === 8)
				)
					if (((a = l.data), a === "/$")) {
						if (n === 0) break;
						n--;
					} else (a !== "$" && a !== "$?" && a !== "$~" && a !== "$!") || n++;
				a = l;
			} while (a);
		}
		function qd(n) {
			var r = n.firstChild;
			for (r && r.nodeType === 10 && (r = r.nextSibling); r; ) {
				var a = r;
				switch (((r = r.nextSibling), a.nodeName)) {
					case "HTML":
					case "HEAD":
					case "BODY":
						(qd(a), Ui(a));
						continue;
					case "SCRIPT":
					case "STYLE":
						continue;
					case "LINK":
						if (a.rel.toLowerCase() === "stylesheet") continue;
				}
				n.removeChild(a);
			}
		}
		function t1(n, r, a, l) {
			for (; n.nodeType === 1; ) {
				var c = a;
				if (n.nodeName.toLowerCase() !== r.toLowerCase()) {
					if (!l && (n.nodeName !== "INPUT" || n.type !== "hidden")) break;
				} else if (l) {
					if (!n[Kn])
						switch (r) {
							case "meta":
								if (!n.hasAttribute("itemprop")) break;
								return n;
							case "link":
								if (((d = n.getAttribute("rel")), d === "stylesheet" && n.hasAttribute("data-precedence"))) break;
								if (
									d !== c.rel ||
									n.getAttribute("href") !== (c.href == null || c.href === "" ? null : c.href) ||
									n.getAttribute("crossorigin") !== (c.crossOrigin == null ? null : c.crossOrigin) ||
									n.getAttribute("title") !== (c.title == null ? null : c.title)
								)
									break;
								return n;
							case "style":
								if (n.hasAttribute("data-precedence")) break;
								return n;
							case "script":
								if (
									((d = n.getAttribute("src")),
									(d !== (c.src == null ? null : c.src) ||
										n.getAttribute("type") !== (c.type == null ? null : c.type) ||
										n.getAttribute("crossorigin") !== (c.crossOrigin == null ? null : c.crossOrigin)) &&
										d &&
										n.hasAttribute("async") &&
										!n.hasAttribute("itemprop"))
								)
									break;
								return n;
							default:
								return n;
						}
				} else if (r === "input" && n.type === "hidden") {
					var d = c.name == null ? null : "" + c.name;
					if (c.type === "hidden" && n.getAttribute("name") === d) return n;
				} else return n;
				if (((n = Or(n.nextSibling)), n === null)) break;
			}
			return null;
		}
		function n1(n, r, a) {
			if (r === "") return null;
			for (; n.nodeType !== 3; )
				if (
					((n.nodeType !== 1 || n.nodeName !== "INPUT" || n.type !== "hidden") && !a) ||
					((n = Or(n.nextSibling)), n === null)
				)
					return null;
			return n;
		}
		function Ky(n, r) {
			for (; n.nodeType !== 8; )
				if (
					((n.nodeType !== 1 || n.nodeName !== "INPUT" || n.type !== "hidden") && !r) ||
					((n = Or(n.nextSibling)), n === null)
				)
					return null;
			return n;
		}
		function Ud(n) {
			return n.data === "$?" || n.data === "$~";
		}
		function $d(n) {
			return n.data === "$!" || (n.data === "$?" && n.ownerDocument.readyState !== "loading");
		}
		function r1(n, r) {
			var a = n.ownerDocument;
			if (n.data === "$~") n._reactRetry = r;
			else if (n.data !== "$?" || a.readyState !== "loading") r();
			else {
				var l = function () {
					(r(), a.removeEventListener("DOMContentLoaded", l));
				};
				(a.addEventListener("DOMContentLoaded", l), (n._reactRetry = l));
			}
		}
		function Or(n) {
			for (; n != null; n = n.nextSibling) {
				var r = n.nodeType;
				if (r === 1 || r === 3) break;
				if (r === 8) {
					if (
						((r = n.data), r === "$" || r === "$!" || r === "$?" || r === "$~" || r === "&" || r === "F!" || r === "F")
					)
						break;
					if (r === "/$" || r === "/&") return null;
				}
			}
			return n;
		}
		var Bd = null;
		function Yy(n) {
			n = n.nextSibling;
			for (var r = 0; n; ) {
				if (n.nodeType === 8) {
					var a = n.data;
					if (a === "/$" || a === "/&") {
						if (r === 0) return Or(n.nextSibling);
						r--;
					} else (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") || r++;
				}
				n = n.nextSibling;
			}
			return null;
		}
		function Gy(n) {
			n = n.previousSibling;
			for (var r = 0; n; ) {
				if (n.nodeType === 8) {
					var a = n.data;
					if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
						if (r === 0) return n;
						r--;
					} else (a !== "/$" && a !== "/&") || r++;
				}
				n = n.previousSibling;
			}
			return null;
		}
		function Fy(n, r, a) {
			switch (((r = ko(a)), n)) {
				case "html":
					if (((n = r.documentElement), !n)) throw Error(s(452));
					return n;
				case "head":
					if (((n = r.head), !n)) throw Error(s(453));
					return n;
				case "body":
					if (((n = r.body), !n)) throw Error(s(454));
					return n;
				default:
					throw Error(s(451));
			}
		}
		function Gl(n) {
			for (var r = n.attributes; r.length; ) n.removeAttributeNode(r[0]);
			Ui(n);
		}
		var zr = new Map(),
			Xy = new Set();
		function Mo(n) {
			return typeof n.getRootNode == "function" ? n.getRootNode() : n.nodeType === 9 ? n : n.ownerDocument;
		}
		var wi = P.d;
		P.d = { f: i1, r: a1, D: u1, C: l1, L: s1, m: o1, X: f1, S: c1, M: d1 };
		function i1() {
			var n = wi.f(),
				r = So();
			return n || r;
		}
		function a1(n) {
			var r = Yn(n);
			r !== null && r.tag === 5 && r.type === "form" ? gg(r) : wi.r(n);
		}
		var Du = typeof document > "u" ? null : document;
		function Jy(n, r, a) {
			var l = Du;
			if (l && typeof r == "string" && r) {
				var c = wn(r);
				((c = 'link[rel="' + n + '"][href="' + c + '"]'),
					typeof a == "string" && (c += '[crossorigin="' + a + '"]'),
					Xy.has(c) ||
						(Xy.add(c),
						(n = { rel: n, crossOrigin: a, href: r }),
						l.querySelector(c) === null &&
							((r = l.createElement("link")), An(r, "link", n), Rt(r), l.head.appendChild(r))));
			}
		}
		function u1(n) {
			(wi.D(n), Jy("dns-prefetch", n, null));
		}
		function l1(n, r) {
			(wi.C(n, r), Jy("preconnect", n, r));
		}
		function s1(n, r, a) {
			wi.L(n, r, a);
			var l = Du;
			if (l && n && r) {
				var c = 'link[rel="preload"][as="' + wn(r) + '"]';
				r === "image" && a && a.imageSrcSet
					? ((c += '[imagesrcset="' + wn(a.imageSrcSet) + '"]'),
						typeof a.imageSizes == "string" && (c += '[imagesizes="' + wn(a.imageSizes) + '"]'))
					: (c += '[href="' + wn(n) + '"]');
				var d = c;
				switch (r) {
					case "style":
						d = ju(n);
						break;
					case "script":
						d = Iu(n);
				}
				zr.has(d) ||
					((n = b({ rel: "preload", href: r === "image" && a && a.imageSrcSet ? void 0 : n, as: r }, a)),
					zr.set(d, n),
					l.querySelector(c) !== null ||
						(r === "style" && l.querySelector(Fl(d))) ||
						(r === "script" && l.querySelector(Xl(d))) ||
						((r = l.createElement("link")), An(r, "link", n), Rt(r), l.head.appendChild(r)));
			}
		}
		function o1(n, r) {
			wi.m(n, r);
			var a = Du;
			if (a && n) {
				var l = r && typeof r.as == "string" ? r.as : "script",
					c = 'link[rel="modulepreload"][as="' + wn(l) + '"][href="' + wn(n) + '"]',
					d = c;
				switch (l) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script":
						d = Iu(n);
				}
				if (!zr.has(d) && ((n = b({ rel: "modulepreload", href: n }, r)), zr.set(d, n), a.querySelector(c) === null)) {
					switch (l) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script":
							if (a.querySelector(Xl(d))) return;
					}
					((l = a.createElement("link")), An(l, "link", n), Rt(l), a.head.appendChild(l));
				}
			}
		}
		function c1(n, r, a) {
			wi.S(n, r, a);
			var l = Du;
			if (l && n) {
				var c = sr(l).hoistableStyles,
					d = ju(n);
				r = r || "default";
				var y = c.get(d);
				if (!y) {
					var x = { loading: 0, preload: null };
					if ((y = l.querySelector(Fl(d)))) x.loading = 5;
					else {
						((n = b({ rel: "stylesheet", href: n, "data-precedence": r }, a)), (a = zr.get(d)) && Vd(n, a));
						var z = (y = l.createElement("link"));
						(Rt(z),
							An(z, "link", n),
							(z._p = new Promise(function (X, ne) {
								((z.onload = X), (z.onerror = ne));
							})),
							z.addEventListener("load", function () {
								x.loading |= 1;
							}),
							z.addEventListener("error", function () {
								x.loading |= 2;
							}),
							(x.loading |= 4),
							No(y, r, l));
					}
					((y = { type: "stylesheet", instance: y, count: 1, state: x }), c.set(d, y));
				}
			}
		}
		function f1(n, r) {
			wi.X(n, r);
			var a = Du;
			if (a && n) {
				var l = sr(a).hoistableScripts,
					c = Iu(n),
					d = l.get(c);
				d ||
					((d = a.querySelector(Xl(c))),
					d ||
						((n = b({ src: n, async: !0 }, r)),
						(r = zr.get(c)) && Hd(n, r),
						(d = a.createElement("script")),
						Rt(d),
						An(d, "link", n),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					l.set(c, d));
			}
		}
		function d1(n, r) {
			wi.M(n, r);
			var a = Du;
			if (a && n) {
				var l = sr(a).hoistableScripts,
					c = Iu(n),
					d = l.get(c);
				d ||
					((d = a.querySelector(Xl(c))),
					d ||
						((n = b({ src: n, async: !0, type: "module" }, r)),
						(r = zr.get(c)) && Hd(n, r),
						(d = a.createElement("script")),
						Rt(d),
						An(d, "link", n),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					l.set(c, d));
			}
		}
		function Wy(n, r, a, l) {
			var c = (c = Se.current) ? Mo(c) : null;
			if (!c) throw Error(s(446));
			switch (n) {
				case "meta":
				case "title":
					return null;
				case "style":
					return typeof a.precedence == "string" && typeof a.href == "string"
						? ((r = ju(a.href)),
							(a = sr(c).hoistableStyles),
							(l = a.get(r)),
							l || ((l = { type: "style", instance: null, count: 0, state: null }), a.set(r, l)),
							l)
						: { type: "void", instance: null, count: 0, state: null };
				case "link":
					if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
						n = ju(a.href);
						var d = sr(c).hoistableStyles,
							y = d.get(n);
						if (
							(y ||
								((c = c.ownerDocument || c),
								(y = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }),
								d.set(n, y),
								(d = c.querySelector(Fl(n))) && !d._p && ((y.instance = d), (y.state.loading = 5)),
								zr.has(n) ||
									((a = {
										rel: "preload",
										as: "style",
										href: a.href,
										crossOrigin: a.crossOrigin,
										integrity: a.integrity,
										media: a.media,
										hrefLang: a.hrefLang,
										referrerPolicy: a.referrerPolicy,
									}),
									zr.set(n, a),
									d || h1(c, n, a, y.state))),
							r && l === null)
						)
							throw Error(s(528, ""));
						return y;
					}
					if (r && l !== null) throw Error(s(529, ""));
					return null;
				case "script":
					return (
						(r = a.async),
						(a = a.src),
						typeof a == "string" && r && typeof r != "function" && typeof r != "symbol"
							? ((r = Iu(a)),
								(a = sr(c).hoistableScripts),
								(l = a.get(r)),
								l || ((l = { type: "script", instance: null, count: 0, state: null }), a.set(r, l)),
								l)
							: { type: "void", instance: null, count: 0, state: null }
					);
				default:
					throw Error(s(444, n));
			}
		}
		function ju(n) {
			return 'href="' + wn(n) + '"';
		}
		function Fl(n) {
			return 'link[rel="stylesheet"][' + n + "]";
		}
		function ep(n) {
			return b({}, n, { "data-precedence": n.precedence, precedence: null });
		}
		function h1(n, r, a, l) {
			n.querySelector('link[rel="preload"][as="style"][' + r + "]")
				? (l.loading = 1)
				: ((r = n.createElement("link")),
					(l.preload = r),
					r.addEventListener("load", function () {
						return (l.loading |= 1);
					}),
					r.addEventListener("error", function () {
						return (l.loading |= 2);
					}),
					An(r, "link", a),
					Rt(r),
					n.head.appendChild(r));
		}
		function Iu(n) {
			return '[src="' + wn(n) + '"]';
		}
		function Xl(n) {
			return "script[async]" + n;
		}
		function tp(n, r, a) {
			if ((r.count++, r.instance === null))
				switch (r.type) {
					case "style":
						var l = n.querySelector('style[data-href~="' + wn(a.href) + '"]');
						if (l) return ((r.instance = l), Rt(l), l);
						var c = b({}, a, { "data-href": a.href, "data-precedence": a.precedence, href: null, precedence: null });
						return (
							(l = (n.ownerDocument || n).createElement("style")),
							Rt(l),
							An(l, "style", c),
							No(l, a.precedence, n),
							(r.instance = l)
						);
					case "stylesheet":
						c = ju(a.href);
						var d = n.querySelector(Fl(c));
						if (d) return ((r.state.loading |= 4), (r.instance = d), Rt(d), d);
						((l = ep(a)), (c = zr.get(c)) && Vd(l, c), (d = (n.ownerDocument || n).createElement("link")), Rt(d));
						var y = d;
						return (
							(y._p = new Promise(function (x, z) {
								((y.onload = x), (y.onerror = z));
							})),
							An(d, "link", l),
							(r.state.loading |= 4),
							No(d, a.precedence, n),
							(r.instance = d)
						);
					case "script":
						return (
							(d = Iu(a.src)),
							(c = n.querySelector(Xl(d)))
								? ((r.instance = c), Rt(c), c)
								: ((l = a),
									(c = zr.get(d)) && ((l = b({}, a)), Hd(l, c)),
									(n = n.ownerDocument || n),
									(c = n.createElement("script")),
									Rt(c),
									An(c, "link", l),
									n.head.appendChild(c),
									(r.instance = c))
						);
					case "void":
						return null;
					default:
						throw Error(s(443, r.type));
				}
			else
				r.type === "stylesheet" &&
					(r.state.loading & 4) === 0 &&
					((l = r.instance), (r.state.loading |= 4), No(l, a.precedence, n));
			return r.instance;
		}
		function No(n, r, a) {
			for (
				var l = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
					c = l.length ? l[l.length - 1] : null,
					d = c,
					y = 0;
				y < l.length;
				y++
			) {
				var x = l[y];
				if (x.dataset.precedence === r) d = x;
				else if (d !== c) break;
			}
			d
				? d.parentNode.insertBefore(n, d.nextSibling)
				: ((r = a.nodeType === 9 ? a.head : a), r.insertBefore(n, r.firstChild));
		}
		function Vd(n, r) {
			((n.crossOrigin ??= r.crossOrigin), (n.referrerPolicy ??= r.referrerPolicy), (n.title ??= r.title));
		}
		function Hd(n, r) {
			((n.crossOrigin ??= r.crossOrigin), (n.referrerPolicy ??= r.referrerPolicy), (n.integrity ??= r.integrity));
		}
		var Oo = null;
		function np(n, r, a) {
			if (Oo === null) {
				var l = new Map(),
					c = (Oo = new Map());
				c.set(a, l);
			} else ((c = Oo), (l = c.get(a)), l || ((l = new Map()), c.set(a, l)));
			if (l.has(n)) return l;
			for (l.set(n, null), a = a.getElementsByTagName(n), c = 0; c < a.length; c++) {
				var d = a[c];
				if (
					!(d[Kn] || d[Dt] || (n === "link" && d.getAttribute("rel") === "stylesheet")) &&
					d.namespaceURI !== "http://www.w3.org/2000/svg"
				) {
					var y = d.getAttribute(r) || "";
					y = n + y;
					var x = l.get(y);
					x ? x.push(d) : l.set(y, [d]);
				}
			}
			return l;
		}
		function rp(n, r, a) {
			((n = n.ownerDocument || n), n.head.insertBefore(a, r === "title" ? n.querySelector("head > title") : null));
		}
		function m1(n, r, a) {
			if (a === 1 || r.itemProp != null) return !1;
			switch (n) {
				case "meta":
				case "title":
					return !0;
				case "style":
					if (typeof r.precedence != "string" || typeof r.href != "string" || r.href === "") break;
					return !0;
				case "link":
					if (typeof r.rel != "string" || typeof r.href != "string" || r.href === "" || r.onLoad || r.onError) break;
					switch (r.rel) {
						case "stylesheet":
							return ((n = r.disabled), typeof r.precedence == "string" && n == null);
						default:
							return !0;
					}
				case "script":
					if (
						r.async &&
						typeof r.async != "function" &&
						typeof r.async != "symbol" &&
						!r.onLoad &&
						!r.onError &&
						r.src &&
						typeof r.src == "string"
					)
						return !0;
			}
			return !1;
		}
		function ip(n) {
			return !(n.type === "stylesheet" && (n.state.loading & 3) === 0);
		}
		function v1(n, r, a, l) {
			if (
				a.type === "stylesheet" &&
				(typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
				(a.state.loading & 4) === 0
			) {
				if (a.instance === null) {
					var c = ju(l.href),
						d = r.querySelector(Fl(c));
					if (d) {
						((r = d._p),
							r !== null &&
								typeof r == "object" &&
								typeof r.then == "function" &&
								(n.count++, (n = zo.bind(n)), r.then(n, n)),
							(a.state.loading |= 4),
							(a.instance = d),
							Rt(d));
						return;
					}
					((d = r.ownerDocument || r), (l = ep(l)), (c = zr.get(c)) && Vd(l, c), (d = d.createElement("link")), Rt(d));
					var y = d;
					((y._p = new Promise(function (x, z) {
						((y.onload = x), (y.onerror = z));
					})),
						An(d, "link", l),
						(a.instance = d));
				}
				(n.stylesheets === null && (n.stylesheets = new Map()),
					n.stylesheets.set(a, r),
					(r = a.state.preload) &&
						(a.state.loading & 3) === 0 &&
						(n.count++, (a = zo.bind(n)), r.addEventListener("load", a), r.addEventListener("error", a)));
			}
		}
		var Zd = 0;
		function g1(n, r) {
			return (
				n.stylesheets && n.count === 0 && jo(n, n.stylesheets),
				0 < n.count || 0 < n.imgCount
					? function (a) {
							var l = setTimeout(function () {
								if ((n.stylesheets && jo(n, n.stylesheets), n.unsuspend)) {
									var d = n.unsuspend;
									((n.unsuspend = null), d());
								}
							}, 6e4 + r);
							0 < n.imgBytes && Zd === 0 && (Zd = 62500 * Fw());
							var c = setTimeout(
								function () {
									if (
										((n.waitingForImages = !1), n.count === 0 && (n.stylesheets && jo(n, n.stylesheets), n.unsuspend))
									) {
										var d = n.unsuspend;
										((n.unsuspend = null), d());
									}
								},
								(n.imgBytes > Zd ? 50 : 800) + r,
							);
							return (
								(n.unsuspend = a),
								function () {
									((n.unsuspend = null), clearTimeout(l), clearTimeout(c));
								}
							);
						}
					: null
			);
		}
		function zo() {
			if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
				if (this.stylesheets) jo(this, this.stylesheets);
				else if (this.unsuspend) {
					var n = this.unsuspend;
					((this.unsuspend = null), n());
				}
			}
		}
		var Do = null;
		function jo(n, r) {
			((n.stylesheets = null),
				n.unsuspend !== null && (n.count++, (Do = new Map()), r.forEach(y1, n), (Do = null), zo.call(n)));
		}
		function y1(n, r) {
			if (!(r.state.loading & 4)) {
				var a = Do.get(n);
				if (a) var l = a.get(null);
				else {
					((a = new Map()), Do.set(n, a));
					for (var c = n.querySelectorAll("link[data-precedence],style[data-precedence]"), d = 0; d < c.length; d++) {
						var y = c[d];
						(y.nodeName === "LINK" || y.getAttribute("media") !== "not all") &&
							(a.set(y.dataset.precedence, y), (l = y));
					}
					l && a.set(null, l);
				}
				((c = r.instance),
					(y = c.getAttribute("data-precedence")),
					(d = a.get(y) || l),
					d === l && a.set(null, c),
					a.set(y, c),
					this.count++,
					(l = zo.bind(this)),
					c.addEventListener("load", l),
					c.addEventListener("error", l),
					d
						? d.parentNode.insertBefore(c, d.nextSibling)
						: ((n = n.nodeType === 9 ? n.head : n), n.insertBefore(c, n.firstChild)),
					(r.state.loading |= 4));
			}
		}
		var Jl = { $$typeof: k, Provider: null, Consumer: null, _currentValue: ge, _currentValue2: ge, _threadCount: 0 };
		function p1(n, r, a, l, c, d, y, x, z) {
			((this.tag = 1),
				(this.containerInfo = n),
				(this.pingCache = this.current = this.pendingChildren = null),
				(this.timeoutHandle = -1),
				(this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null),
				(this.callbackPriority = 0),
				(this.expirationTimes = Pt(-1)),
				(this.entangledLanes =
					this.shellSuspendCounter =
					this.errorRecoveryDisabledLanes =
					this.expiredLanes =
					this.warmLanes =
					this.pingedLanes =
					this.suspendedLanes =
					this.pendingLanes =
						0),
				(this.entanglements = Pt(0)),
				(this.hiddenUpdates = Pt(null)),
				(this.identifierPrefix = l),
				(this.onUncaughtError = c),
				(this.onCaughtError = d),
				(this.onRecoverableError = y),
				(this.pooledCache = null),
				(this.pooledCacheLanes = 0),
				(this.formState = z),
				(this.incompleteTransitions = new Map()));
		}
		function b1(n, r, a, l, c, d, y, x, z, X, ne, ue) {
			return (
				(n = new p1(n, r, a, y, z, X, ne, ue, x)),
				(r = 1),
				d === !0 && (r |= 24),
				(d = cr(3, null, null, r)),
				(n.current = d),
				(d.stateNode = n),
				(r = Tf()),
				r.refCount++,
				(n.pooledCache = r),
				r.refCount++,
				(d.memoizedState = { element: l, isDehydrated: a, cache: r }),
				Cf(d),
				n
			);
		}
		function _1(n) {
			return n ? ((n = hu), n) : hu;
		}
		function ap(n, r, a, l, c, d) {
			((c = _1(c)),
				l.context === null ? (l.context = c) : (l.pendingContext = c),
				(l = La(r)),
				(l.payload = { element: a }),
				(d = d === void 0 ? null : d),
				d !== null && (l.callback = d),
				(a = qa(n, l, r)),
				a !== null && (er(a, n, r), Ml(a, n, r)));
		}
		function up(n, r) {
			if (((n = n.memoizedState), n !== null && n.dehydrated !== null)) {
				var a = n.retryLane;
				n.retryLane = a !== 0 && a < r ? a : r;
			}
		}
		function Pd(n, r) {
			(up(n, r), (n = n.alternate) && up(n, r));
		}
		function lp(n) {
			if (n.tag === 13 || n.tag === 31) {
				var r = Ca(n, 67108864);
				(r !== null && er(r, n, 67108864), Pd(n, 67108864));
			}
		}
		function sp(n) {
			if (n.tag === 13 || n.tag === 31) {
				var r = Nr();
				r = Ln(r);
				var a = Ca(n, r);
				(a !== null && er(a, n, r), Pd(n, r));
			}
		}
		var Io = !0;
		function S1(n, r, a, l) {
			var c = B.T;
			B.T = null;
			var d = P.p;
			try {
				((P.p = 2), Qd(n, r, a, l));
			} finally {
				((P.p = d), (B.T = c));
			}
		}
		function w1(n, r, a, l) {
			var c = B.T;
			B.T = null;
			var d = P.p;
			try {
				((P.p = 8), Qd(n, r, a, l));
			} finally {
				((P.p = d), (B.T = c));
			}
		}
		function Qd(n, r, a, l) {
			if (Io) {
				var c = Kd(l);
				if (c === null) (Od(n, r, l, Lo, a), cp(n, l));
				else if (T1(c, n, r, a, l)) l.stopPropagation();
				else if ((cp(n, l), r & 4 && -1 < E1.indexOf(n))) {
					for (; c !== null; ) {
						var d = Yn(c);
						if (d !== null)
							switch (d.tag) {
								case 3:
									if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
										var y = Mn(d.pendingLanes);
										if (y !== 0) {
											var x = d;
											for (x.pendingLanes |= 2, x.entangledLanes |= 2; y; ) {
												var z = 1 << (31 - ct(y));
												((x.entanglements[1] |= z), (y &= ~z));
											}
											(Si(d), (st & 6) === 0 && ((bo = Ne() + 500), Ql(0, !1)));
										}
									}
									break;
								case 31:
								case 13:
									((x = Ca(d, 2)), x !== null && er(x, d, 2), So(), Pd(d, 2));
							}
						if (((d = Kd(l)), d === null && Od(n, r, l, Lo, a), d === c)) break;
						c = d;
					}
					c !== null && l.stopPropagation();
				} else Od(n, r, l, null, a);
			}
		}
		function Kd(n) {
			return ((n = $n(n)), Yd(n));
		}
		var Lo = null;
		function Yd(n) {
			if (((Lo = null), (n = Kt(n)), n !== null)) {
				var r = f(n);
				if (r === null) n = null;
				else {
					var a = r.tag;
					if (a === 13) {
						if (((n = h(r)), n !== null)) return n;
						n = null;
					} else if (a === 31) {
						if (((n = m(r)), n !== null)) return n;
						n = null;
					} else if (a === 3) {
						if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
						n = null;
					} else r !== n && (n = null);
				}
			}
			return ((Lo = n), null);
		}
		function op(n) {
			switch (n) {
				case "beforetoggle":
				case "cancel":
				case "click":
				case "close":
				case "contextmenu":
				case "copy":
				case "cut":
				case "auxclick":
				case "dblclick":
				case "dragend":
				case "dragstart":
				case "drop":
				case "focusin":
				case "focusout":
				case "input":
				case "invalid":
				case "keydown":
				case "keypress":
				case "keyup":
				case "mousedown":
				case "mouseup":
				case "paste":
				case "pause":
				case "play":
				case "pointercancel":
				case "pointerdown":
				case "pointerup":
				case "ratechange":
				case "reset":
				case "resize":
				case "seeked":
				case "submit":
				case "toggle":
				case "touchcancel":
				case "touchend":
				case "touchstart":
				case "volumechange":
				case "change":
				case "selectionchange":
				case "textInput":
				case "compositionstart":
				case "compositionend":
				case "compositionupdate":
				case "beforeblur":
				case "afterblur":
				case "beforeinput":
				case "blur":
				case "fullscreenchange":
				case "focus":
				case "hashchange":
				case "popstate":
				case "select":
				case "selectstart":
					return 2;
				case "drag":
				case "dragenter":
				case "dragexit":
				case "dragleave":
				case "dragover":
				case "mousemove":
				case "mouseout":
				case "mouseover":
				case "pointermove":
				case "pointerout":
				case "pointerover":
				case "scroll":
				case "touchmove":
				case "wheel":
				case "mouseenter":
				case "mouseleave":
				case "pointerenter":
				case "pointerleave":
					return 8;
				case "message":
					switch (bt()) {
						case pn:
							return 2;
						case ut:
							return 8;
						case Vt:
						case yr:
							return 32;
						case Yr:
							return 268435456;
						default:
							return 32;
					}
				default:
					return 32;
			}
		}
		var Gd = !1,
			ia = null,
			aa = null,
			ua = null,
			Wl = new Map(),
			es = new Map(),
			la = [],
			E1 =
				"mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
					" ",
				);
		function cp(n, r) {
			switch (n) {
				case "focusin":
				case "focusout":
					ia = null;
					break;
				case "dragenter":
				case "dragleave":
					aa = null;
					break;
				case "mouseover":
				case "mouseout":
					ua = null;
					break;
				case "pointerover":
				case "pointerout":
					Wl.delete(r.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture":
					es.delete(r.pointerId);
			}
		}
		function ts(n, r, a, l, c, d) {
			return n === null || n.nativeEvent !== d
				? ((n = { blockedOn: r, domEventName: a, eventSystemFlags: l, nativeEvent: d, targetContainers: [c] }),
					r !== null && ((r = Yn(r)), r !== null && lp(r)),
					n)
				: ((n.eventSystemFlags |= l), (r = n.targetContainers), c !== null && r.indexOf(c) === -1 && r.push(c), n);
		}
		function T1(n, r, a, l, c) {
			switch (r) {
				case "focusin":
					return ((ia = ts(ia, n, r, a, l, c)), !0);
				case "dragenter":
					return ((aa = ts(aa, n, r, a, l, c)), !0);
				case "mouseover":
					return ((ua = ts(ua, n, r, a, l, c)), !0);
				case "pointerover":
					var d = c.pointerId;
					return (Wl.set(d, ts(Wl.get(d) || null, n, r, a, l, c)), !0);
				case "gotpointercapture":
					return ((d = c.pointerId), es.set(d, ts(es.get(d) || null, n, r, a, l, c)), !0);
			}
			return !1;
		}
		function fp(n) {
			var r = Kt(n.target);
			if (r !== null) {
				var a = f(r);
				if (a !== null) {
					if (((r = a.tag), r === 13)) {
						if (((r = h(a)), r !== null)) {
							((n.blockedOn = r),
								wa(n.priority, function () {
									sp(a);
								}));
							return;
						}
					} else if (r === 31) {
						if (((r = m(a)), r !== null)) {
							((n.blockedOn = r),
								wa(n.priority, function () {
									sp(a);
								}));
							return;
						}
					} else if (r === 3 && a.stateNode.current.memoizedState.isDehydrated) {
						n.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
						return;
					}
				}
			}
			n.blockedOn = null;
		}
		function qo(n) {
			if (n.blockedOn !== null) return !1;
			for (var r = n.targetContainers; 0 < r.length; ) {
				var a = Kd(n.nativeEvent);
				if (a === null) {
					a = n.nativeEvent;
					var l = new a.constructor(a.type, a);
					((ml = l), a.target.dispatchEvent(l), (ml = null));
				} else return ((r = Yn(a)), r !== null && lp(r), (n.blockedOn = a), !1);
				r.shift();
			}
			return !0;
		}
		function dp(n, r, a) {
			qo(n) && a.delete(r);
		}
		function x1() {
			((Gd = !1),
				ia !== null && qo(ia) && (ia = null),
				aa !== null && qo(aa) && (aa = null),
				ua !== null && qo(ua) && (ua = null),
				Wl.forEach(dp),
				es.forEach(dp));
		}
		function Uo(n, r) {
			n.blockedOn === r &&
				((n.blockedOn = null), Gd || ((Gd = !0), t.unstable_scheduleCallback(t.unstable_NormalPriority, x1)));
		}
		var $o = null;
		function hp(n) {
			$o !== n &&
				(($o = n),
				t.unstable_scheduleCallback(t.unstable_NormalPriority, function () {
					$o === n && ($o = null);
					for (var r = 0; r < n.length; r += 3) {
						var a = n[r],
							l = n[r + 1],
							c = n[r + 2];
						if (typeof l != "function") {
							if (Yd(l || a) === null) continue;
							break;
						}
						var d = Yn(a);
						d !== null &&
							(n.splice(r, 3), (r -= 3), Yf(d, { pending: !0, data: c, method: a.method, action: l }, l, c));
					}
				}));
		}
		function Lu(n) {
			function r(z) {
				return Uo(z, n);
			}
			(ia !== null && Uo(ia, n), aa !== null && Uo(aa, n), ua !== null && Uo(ua, n), Wl.forEach(r), es.forEach(r));
			for (var a = 0; a < la.length; a++) {
				var l = la[a];
				l.blockedOn === n && (l.blockedOn = null);
			}
			for (; 0 < la.length && ((a = la[0]), a.blockedOn === null); ) (fp(a), a.blockedOn === null && la.shift());
			if (((a = (n.ownerDocument || n).$$reactFormReplay), a != null))
				for (l = 0; l < a.length; l += 3) {
					var c = a[l],
						d = a[l + 1],
						y = c[rn] || null;
					if (typeof d == "function") y || hp(a);
					else if (y) {
						var x = null;
						if (d && d.hasAttribute("formAction")) {
							if (((c = d), (y = d[rn] || null))) x = y.formAction;
							else if (Yd(c) !== null) continue;
						} else x = y.action;
						(typeof x == "function" ? (a[l + 1] = x) : (a.splice(l, 3), (l -= 3)), hp(a));
					}
				}
		}
		function A1() {
			function n(d) {
				d.canIntercept &&
					d.info === "react-transition" &&
					d.intercept({
						handler: function () {
							return new Promise(function (y) {
								return (c = y);
							});
						},
						focusReset: "manual",
						scroll: "manual",
					});
			}
			function r() {
				(c !== null && (c(), (c = null)), l || setTimeout(a, 20));
			}
			function a() {
				if (!l && !navigation.transition) {
					var d = navigation.currentEntry;
					d &&
						d.url != null &&
						navigation.navigate(d.url, { state: d.getState(), info: "react-transition", history: "replace" });
				}
			}
			if (typeof navigation == "object") {
				var l = !1,
					c = null;
				return (
					navigation.addEventListener("navigate", n),
					navigation.addEventListener("navigatesuccess", r),
					navigation.addEventListener("navigateerror", r),
					setTimeout(a, 100),
					function () {
						((l = !0),
							navigation.removeEventListener("navigate", n),
							navigation.removeEventListener("navigatesuccess", r),
							navigation.removeEventListener("navigateerror", r),
							c !== null && (c(), (c = null)));
					}
				);
			}
		}
		function Fd(n) {
			this._internalRoot = n;
		}
		((Xd.prototype.render = Fd.prototype.render =
			function (n) {
				var r = this._internalRoot;
				if (r === null) throw Error(s(409));
				var a = r.current;
				ap(a, Nr(), n, r, null, null);
			}),
			(Xd.prototype.unmount = Fd.prototype.unmount =
				function () {
					var n = this._internalRoot;
					if (n !== null) {
						this._internalRoot = null;
						var r = n.containerInfo;
						(ap(n.current, 2, null, n, null, null), So(), (r[wr] = null));
					}
				}));
		function Xd(n) {
			this._internalRoot = n;
		}
		Xd.prototype.unstable_scheduleHydration = function (n) {
			if (n) {
				var r = Li();
				n = { blockedOn: null, target: n, priority: r };
				for (var a = 0; a < la.length && r !== 0 && r < la[a].priority; a++);
				(la.splice(a, 0, n), a === 0 && fp(n));
			}
		};
		var mp = i.version;
		if (mp !== "19.2.8") throw Error(s(527, mp, "19.2.8"));
		P.findDOMNode = function (n) {
			var r = n._reactInternals;
			if (r === void 0)
				throw typeof n.render == "function" ? Error(s(188)) : ((n = Object.keys(n).join(",")), Error(s(268, n)));
			return ((n = g(r)), (n = n !== null ? S(n) : null), (n = n === null ? null : n.stateNode), n);
		};
		var R1 = {
			bundleType: 0,
			version: "19.2.8",
			rendererPackageName: "react-dom",
			currentDispatcherRef: B,
			reconcilerVersion: "19.2.8",
		};
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
			var Bo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (!Bo.isDisabled && Bo.supportsFiber)
				try {
					((kn = Bo.inject(R1)), (_t = Bo));
				} catch {}
		}
		e.createRoot = function (n, r) {
			if (!o(n)) throw Error(s(299));
			var a = !1,
				l = "",
				c = ww,
				d = Ew,
				y = Tw;
			return (
				r != null &&
					(r.unstable_strictMode === !0 && (a = !0),
					r.identifierPrefix !== void 0 && (l = r.identifierPrefix),
					r.onUncaughtError !== void 0 && (c = r.onUncaughtError),
					r.onCaughtError !== void 0 && (d = r.onCaughtError),
					r.onRecoverableError !== void 0 && (y = r.onRecoverableError)),
				(r = b1(n, 1, !1, null, null, a, l, null, c, d, y, A1)),
				(n[wr] = r.current),
				jy(n),
				new Fd(r)
			);
		};
	}),
	TT = Ir((e, t) => {
		function i() {
			if (
				!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")
			)
				try {
					__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
				} catch (u) {
					console.error(u);
				}
		}
		(i(), (t.exports = ET()));
	}),
	Bp;
function re(e, t, i) {
	function u(h, m) {
		if (
			(h._zod || Object.defineProperty(h, "_zod", { value: { def: m, constr: f, traits: new Set() }, enumerable: !1 }),
			h._zod.traits.has(e))
		)
			return;
		(h._zod.traits.add(e), t(h, m));
		const v = f.prototype,
			g = Object.keys(v);
		for (let S = 0; S < g.length; S++) {
			const b = g[S];
			b in h || (h[b] = v[b].bind(h));
		}
	}
	const s = i?.Parent ?? Object;
	class o extends s {}
	Object.defineProperty(o, "name", { value: e });
	function f(h) {
		var m;
		const v = i?.Parent ? new o() : this;
		(u(v, h), (m = v._zod).deferred ?? (m.deferred = []));
		for (const g of v._zod.deferred) g();
		return v;
	}
	return (
		Object.defineProperty(f, "init", { value: u }),
		Object.defineProperty(f, Symbol.hasInstance, {
			value: (h) => (i?.Parent && h instanceof i.Parent ? !0 : h?._zod?.traits?.has(e)),
		}),
		Object.defineProperty(f, "name", { value: e }),
		f
	);
}
var Ku = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	},
	Ab = class extends Error {
		constructor(e) {
			(super(`Encountered unidirectional transform during encode: ${e}`), (this.name = "ZodEncodeError"));
		}
	};
(Bp = globalThis).__zod_globalConfig ?? (Bp.__zod_globalConfig = {});
var mc = globalThis.__zod_globalConfig;
function Ni(e) {
	return (e && Object.assign(mc, e), mc);
}
function Rb(e) {
	const t = Object.values(e).filter((i) => typeof i == "number");
	return Object.entries(e)
		.filter(([i, u]) => t.indexOf(+i) === -1)
		.map(([i, u]) => u);
}
function zh(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function tm(e) {
	return {
		get value() {
			{
				const t = e();
				return (Object.defineProperty(this, "value", { value: t }), t);
			}
			throw new Error("cached value already set");
		},
	};
}
function nm(e) {
	return e == null;
}
function rm(e) {
	const t = e.startsWith("^") ? 1 : 0,
		i = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, i);
}
function xT(e, t) {
	const i = e / t,
		u = Math.round(i),
		s = Number.EPSILON * Math.max(Math.abs(i), 1);
	return Math.abs(i - u) < s ? 0 : i - u;
}
var Vp = Symbol("evaluating");
function yt(e, t, i) {
	let u;
	Object.defineProperty(e, t, {
		get() {
			if (u !== Vp) return (u === void 0 && ((u = Vp), (u = i())), u);
		},
		set(s) {
			Object.defineProperty(e, t, { value: s });
		},
		configurable: !0,
	});
}
function ru(e, t, i) {
	Object.defineProperty(e, t, { value: i, writable: !0, enumerable: !0, configurable: !0 });
}
function pa(...e) {
	const t = {};
	for (const i of e) {
		const u = Object.getOwnPropertyDescriptors(i);
		Object.assign(t, u);
	}
	return Object.defineProperties({}, t);
}
function Hp(e) {
	return JSON.stringify(e);
}
function AT(e) {
	return e
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}
var Cb = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function vc(e) {
	return typeof e == "object" && e !== null && !Array.isArray(e);
}
var RT = tm(() => {
	if (mc.jitless || (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))) return !1;
	try {
		return !1;
	} catch {
		return !1;
	}
});
function Ju(e) {
	if (vc(e) === !1) return !1;
	const t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	const i = t.prototype;
	return !(vc(i) === !1 || Object.prototype.hasOwnProperty.call(i, "isPrototypeOf") === !1);
}
function kb(e) {
	return Ju(e)
		? { ...e }
		: Array.isArray(e)
			? [...e]
			: e instanceof Map
				? new Map(e)
				: e instanceof Set
					? new Set(e)
					: e;
}
var CT = new Set(["string", "number", "symbol"]);
function Wu(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function ba(e, t, i) {
	const u = new e._zod.constr(t ?? e._zod.def);
	return ((!t || i?.parent) && (u._zod.parent = e), u);
}
function xe(e) {
	const t = e;
	if (!t) return {};
	if (typeof t == "string") return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return (delete t.message, typeof t.error == "string" ? { ...t, error: () => t.error } : t);
}
function kT(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
var MT = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
function NT(e, t) {
	const i = e._zod.def,
		u = i.checks;
	if (u && u.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	return ba(
		e,
		pa(e._zod.def, {
			get shape() {
				const s = {};
				for (const o in t) {
					if (!(o in i.shape)) throw new Error(`Unrecognized key: "${o}"`);
					t[o] && (s[o] = i.shape[o]);
				}
				return (ru(this, "shape", s), s);
			},
			checks: [],
		}),
	);
}
function OT(e, t) {
	const i = e._zod.def,
		u = i.checks;
	if (u && u.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	return ba(
		e,
		pa(e._zod.def, {
			get shape() {
				const s = { ...e._zod.def.shape };
				for (const o in t) {
					if (!(o in i.shape)) throw new Error(`Unrecognized key: "${o}"`);
					t[o] && delete s[o];
				}
				return (ru(this, "shape", s), s);
			},
			checks: [],
		}),
	);
}
function zT(e, t) {
	if (!Ju(t)) throw new Error("Invalid input to extend: expected a plain object");
	const i = e._zod.def.checks;
	if (i && i.length > 0) {
		const u = e._zod.def.shape;
		for (const s in t)
			if (Object.getOwnPropertyDescriptor(u, s) !== void 0)
				throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return ba(
		e,
		pa(e._zod.def, {
			get shape() {
				const u = { ...e._zod.def.shape, ...t };
				return (ru(this, "shape", u), u);
			},
		}),
	);
}
function DT(e, t) {
	if (!Ju(t)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return ba(
		e,
		pa(e._zod.def, {
			get shape() {
				const i = { ...e._zod.def.shape, ...t };
				return (ru(this, "shape", i), i);
			},
		}),
	);
}
function jT(e, t) {
	if (e._zod.def.checks?.length)
		throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return ba(
		e,
		pa(e._zod.def, {
			get shape() {
				const i = { ...e._zod.def.shape, ...t._zod.def.shape };
				return (ru(this, "shape", i), i);
			},
			get catchall() {
				return t._zod.def.catchall;
			},
			checks: t._zod.def.checks ?? [],
		}),
	);
}
function IT(e, t, i) {
	const u = t._zod.def.checks;
	if (u && u.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
	return ba(
		t,
		pa(t._zod.def, {
			get shape() {
				const s = t._zod.def.shape,
					o = { ...s };
				if (i)
					for (const f in i) {
						if (!(f in s)) throw new Error(`Unrecognized key: "${f}"`);
						i[f] && (o[f] = e ? new e({ type: "optional", innerType: s[f] }) : s[f]);
					}
				else for (const f in s) o[f] = e ? new e({ type: "optional", innerType: s[f] }) : s[f];
				return (ru(this, "shape", o), o);
			},
			checks: [],
		}),
	);
}
function LT(e, t, i) {
	return ba(
		t,
		pa(t._zod.def, {
			get shape() {
				const u = t._zod.def.shape,
					s = { ...u };
				if (i)
					for (const o in i) {
						if (!(o in s)) throw new Error(`Unrecognized key: "${o}"`);
						i[o] && (s[o] = new e({ type: "nonoptional", innerType: u[o] }));
					}
				else for (const o in u) s[o] = new e({ type: "nonoptional", innerType: u[o] });
				return (ru(this, "shape", s), s);
			},
		}),
	);
}
function Hu(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let i = t; i < e.issues.length; i++) if (e.issues[i]?.continue !== !0) return !0;
	return !1;
}
function qT(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let i = t; i < e.issues.length; i++) if (e.issues[i]?.continue === !1) return !0;
	return !1;
}
function Zu(e, t) {
	return t.map((i) => {
		var u;
		return ((u = i).path ?? (u.path = []), i.path.unshift(e), i);
	});
}
function Qo(e) {
	return typeof e == "string" ? e : e?.message;
}
function Oi(e, t, i) {
	const u = e.message
			? e.message
			: (Qo(e.inst?._zod.def?.error?.(e)) ??
				Qo(t?.error?.(e)) ??
				Qo(i.customError?.(e)) ??
				Qo(i.localeError?.(e)) ??
				"Invalid input"),
		{ inst: s, continue: o, input: f, ...h } = e;
	return (h.path ?? (h.path = []), (h.message = u), t?.reportInput && (h.input = f), h);
}
function im(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function ds(...e) {
	const [t, i, u] = e;
	return typeof t == "string" ? { message: t, code: "custom", input: i, inst: u } : { ...t };
}
var Mb = (e, t) => {
		((e.name = "$ZodError"),
			Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
			Object.defineProperty(e, "issues", { value: t, enumerable: !1 }),
			(e.message = JSON.stringify(t, zh, 2)),
			Object.defineProperty(e, "toString", { value: () => e.message, enumerable: !1 }));
	},
	Nb = re("$ZodError", Mb),
	Ob = re("$ZodError", Mb, { Parent: Error });
function UT(e, t = (i) => i.message) {
	const i = {},
		u = [];
	for (const s of e.issues)
		s.path.length > 0 ? ((i[s.path[0]] = i[s.path[0]] || []), i[s.path[0]].push(t(s))) : u.push(t(s));
	return { formErrors: u, fieldErrors: i };
}
function $T(e, t = (i) => i.message) {
	const i = { _errors: [] },
		u = (s, o = []) => {
			for (const f of s.issues)
				if (f.code === "invalid_union" && f.errors.length) f.errors.map((h) => u({ issues: h }, [...o, ...f.path]));
				else if (f.code === "invalid_key") u({ issues: f.issues }, [...o, ...f.path]);
				else if (f.code === "invalid_element") u({ issues: f.issues }, [...o, ...f.path]);
				else {
					const h = [...o, ...f.path];
					if (h.length === 0) i._errors.push(t(f));
					else {
						let m = i,
							v = 0;
						for (; v < h.length; ) {
							const g = h[v];
							(v !== h.length - 1
								? (m[g] = m[g] || { _errors: [] })
								: ((m[g] = m[g] || { _errors: [] }), m[g]._errors.push(t(f))),
								(m = m[g]),
								v++);
						}
					}
				}
		};
	return (u(e), i);
}
var am = (e) => (t, i, u, s) => {
		const o = u ? { ...u, async: !1 } : { async: !1 },
			f = t._zod.run({ value: i, issues: [] }, o);
		if (f instanceof Promise) throw new Ku();
		if (f.issues.length) {
			const h = new (s?.Err ?? e)(f.issues.map((m) => Oi(m, o, Ni())));
			throw (Cb(h, s?.callee), h);
		}
		return f.value;
	},
	um = (e) => async (t, i, u, s) => {
		const o = u ? { ...u, async: !0 } : { async: !0 };
		let f = t._zod.run({ value: i, issues: [] }, o);
		if ((f instanceof Promise && (f = await f), f.issues.length)) {
			const h = new (s?.Err ?? e)(f.issues.map((m) => Oi(m, o, Ni())));
			throw (Cb(h, s?.callee), h);
		}
		return f.value;
	},
	Cc = (e) => (t, i, u) => {
		const s = u ? { ...u, async: !1 } : { async: !1 },
			o = t._zod.run({ value: i, issues: [] }, s);
		if (o instanceof Promise) throw new Ku();
		return o.issues.length
			? { success: !1, error: new (e ?? Nb)(o.issues.map((f) => Oi(f, s, Ni()))) }
			: { success: !0, data: o.value };
	},
	BT = Cc(Ob),
	kc = (e) => async (t, i, u) => {
		const s = u ? { ...u, async: !0 } : { async: !0 };
		let o = t._zod.run({ value: i, issues: [] }, s);
		return (
			o instanceof Promise && (o = await o),
			o.issues.length
				? { success: !1, error: new e(o.issues.map((f) => Oi(f, s, Ni()))) }
				: { success: !0, data: o.value }
		);
	},
	VT = kc(Ob),
	HT = (e) => (t, i, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return am(e)(t, i, s);
	},
	ZT = (e) => (t, i, u) => am(e)(t, i, u),
	PT = (e) => async (t, i, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return um(e)(t, i, s);
	},
	QT = (e) => async (t, i, u) => um(e)(t, i, u),
	KT = (e) => (t, i, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Cc(e)(t, i, s);
	},
	YT = (e) => (t, i, u) => Cc(e)(t, i, u),
	GT = (e) => async (t, i, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return kc(e)(t, i, s);
	},
	FT = (e) => async (t, i, u) => kc(e)(t, i, u),
	XT = /^[cC][0-9a-z]{6,}$/,
	JT = /^[0-9a-z]+$/,
	WT = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
	ex = /^[0-9a-vA-V]{20}$/,
	tx = /^[A-Za-z0-9]{27}$/,
	nx = /^[a-zA-Z0-9_-]{21}$/,
	rx = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
	ix = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
	Zp = (e) =>
		e
			? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`)
			: /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
	ax = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
	ux = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function lx() {
	return new RegExp(ux, "u");
}
var sx =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	ox =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
	cx =
		/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
	fx =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	dx = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
	zb = /^[A-Za-z0-9_-]*$/,
	hx = /^https?$/,
	mx = /^\+[1-9]\d{6,14}$/,
	Db =
		"(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
	vx = new RegExp(`^${Db}$`);
function jb(e) {
	const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number"
		? e.precision === -1
			? `${t}`
			: e.precision === 0
				? `${t}:[0-5]\\d`
				: `${t}:[0-5]\\d\\.\\d{${e.precision}}`
		: `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function gx(e) {
	return new RegExp(`^${jb(e)}$`);
}
function yx(e) {
	const t = jb({ precision: e.precision }),
		i = ["Z"];
	(e.local && i.push(""), e.offset && i.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)"));
	const u = `${t}(?:${i.join("|")})`;
	return new RegExp(`^${Db}T(?:${u})$`);
}
var px = (e) => {
		const t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
		return new RegExp(`^${t}$`);
	},
	bx = /^-?\d+$/,
	Ib = /^-?\d+(?:\.\d+)?$/,
	_x = /^(?:true|false)$/i,
	Sx = /^undefined$/i,
	wx = /^[^A-Z]*$/,
	Ex = /^[^a-z]*$/,
	ir = re("$ZodCheck", (e, t) => {
		var i;
		(e._zod ?? (e._zod = {}), (e._zod.def = t), (i = e._zod).onattach ?? (i.onattach = []));
	}),
	Lb = { number: "number", bigint: "bigint", object: "date" },
	qb = re("$ZodCheckLessThan", (e, t) => {
		ir.init(e, t);
		const i = Lb[typeof t.value];
		(e._zod.onattach.push((u) => {
			const s = u._zod.bag,
				o = (t.inclusive ? s.maximum : s.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
			t.value < o && (t.inclusive ? (s.maximum = t.value) : (s.exclusiveMaximum = t.value));
		}),
			(e._zod.check = (u) => {
				(t.inclusive ? u.value <= t.value : u.value < t.value) ||
					u.issues.push({
						origin: i,
						code: "too_big",
						maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
						input: u.value,
						inclusive: t.inclusive,
						inst: e,
						continue: !t.abort,
					});
			}));
	}),
	Ub = re("$ZodCheckGreaterThan", (e, t) => {
		ir.init(e, t);
		const i = Lb[typeof t.value];
		(e._zod.onattach.push((u) => {
			const s = u._zod.bag,
				o = (t.inclusive ? s.minimum : s.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
			t.value > o && (t.inclusive ? (s.minimum = t.value) : (s.exclusiveMinimum = t.value));
		}),
			(e._zod.check = (u) => {
				(t.inclusive ? u.value >= t.value : u.value > t.value) ||
					u.issues.push({
						origin: i,
						code: "too_small",
						minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
						input: u.value,
						inclusive: t.inclusive,
						inst: e,
						continue: !t.abort,
					});
			}));
	}),
	Tx = re("$ZodCheckMultipleOf", (e, t) => {
		(ir.init(e, t),
			e._zod.onattach.push((i) => {
				var u;
				(u = i._zod.bag).multipleOf ?? (u.multipleOf = t.value);
			}),
			(e._zod.check = (i) => {
				if (typeof i.value != typeof t.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				(typeof i.value == "bigint" ? i.value % t.value === BigInt(0) : xT(i.value, t.value) === 0) ||
					i.issues.push({
						origin: typeof i.value,
						code: "not_multiple_of",
						divisor: t.value,
						input: i.value,
						inst: e,
						continue: !t.abort,
					});
			}));
	}),
	xx = re("$ZodCheckNumberFormat", (e, t) => {
		(ir.init(e, t), (t.format = t.format || "float64"));
		const i = t.format?.includes("int"),
			u = i ? "int" : "number",
			[s, o] = MT[t.format];
		(e._zod.onattach.push((f) => {
			const h = f._zod.bag;
			((h.format = t.format), (h.minimum = s), (h.maximum = o), i && (h.pattern = bx));
		}),
			(e._zod.check = (f) => {
				const h = f.value;
				if (i) {
					if (!Number.isInteger(h)) {
						f.issues.push({ expected: u, format: t.format, code: "invalid_type", continue: !1, input: h, inst: e });
						return;
					}
					if (!Number.isSafeInteger(h)) {
						h > 0
							? f.issues.push({
									input: h,
									code: "too_big",
									maximum: Number.MAX_SAFE_INTEGER,
									note: "Integers must be within the safe integer range.",
									inst: e,
									origin: u,
									inclusive: !0,
									continue: !t.abort,
								})
							: f.issues.push({
									input: h,
									code: "too_small",
									minimum: Number.MIN_SAFE_INTEGER,
									note: "Integers must be within the safe integer range.",
									inst: e,
									origin: u,
									inclusive: !0,
									continue: !t.abort,
								});
						return;
					}
				}
				(h < s &&
					f.issues.push({
						origin: "number",
						input: h,
						code: "too_small",
						minimum: s,
						inclusive: !0,
						inst: e,
						continue: !t.abort,
					}),
					h > o &&
						f.issues.push({
							origin: "number",
							input: h,
							code: "too_big",
							maximum: o,
							inclusive: !0,
							inst: e,
							continue: !t.abort,
						}));
			}));
	}),
	Ax = re("$ZodCheckMaxLength", (e, t) => {
		var i;
		(ir.init(e, t),
			(i = e._zod.def).when ??
				(i.when = (u) => {
					const s = u.value;
					return !nm(s) && s.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
				t.maximum < s && (u._zod.bag.maximum = t.maximum);
			}),
			(e._zod.check = (u) => {
				const s = u.value;
				if (s.length <= t.maximum) return;
				const o = im(s);
				u.issues.push({
					origin: o,
					code: "too_big",
					maximum: t.maximum,
					inclusive: !0,
					input: s,
					inst: e,
					continue: !t.abort,
				});
			}));
	}),
	Rx = re("$ZodCheckMinLength", (e, t) => {
		var i;
		(ir.init(e, t),
			(i = e._zod.def).when ??
				(i.when = (u) => {
					const s = u.value;
					return !nm(s) && s.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
				t.minimum > s && (u._zod.bag.minimum = t.minimum);
			}),
			(e._zod.check = (u) => {
				const s = u.value;
				if (s.length >= t.minimum) return;
				const o = im(s);
				u.issues.push({
					origin: o,
					code: "too_small",
					minimum: t.minimum,
					inclusive: !0,
					input: s,
					inst: e,
					continue: !t.abort,
				});
			}));
	}),
	Cx = re("$ZodCheckLengthEquals", (e, t) => {
		var i;
		(ir.init(e, t),
			(i = e._zod.def).when ??
				(i.when = (u) => {
					const s = u.value;
					return !nm(s) && s.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag;
				((s.minimum = t.length), (s.maximum = t.length), (s.length = t.length));
			}),
			(e._zod.check = (u) => {
				const s = u.value,
					o = s.length;
				if (o === t.length) return;
				const f = im(s),
					h = o > t.length;
				u.issues.push({
					origin: f,
					...(h ? { code: "too_big", maximum: t.length } : { code: "too_small", minimum: t.length }),
					inclusive: !0,
					exact: !0,
					input: u.value,
					inst: e,
					continue: !t.abort,
				});
			}));
	}),
	Mc = re("$ZodCheckStringFormat", (e, t) => {
		var i, u;
		(ir.init(e, t),
			e._zod.onattach.push((s) => {
				const o = s._zod.bag;
				((o.format = t.format), t.pattern && (o.patterns ?? (o.patterns = new Set()), o.patterns.add(t.pattern)));
			}),
			t.pattern
				? ((i = e._zod).check ??
					(i.check = (s) => {
						((t.pattern.lastIndex = 0),
							!t.pattern.test(s.value) &&
								s.issues.push({
									origin: "string",
									code: "invalid_format",
									format: t.format,
									input: s.value,
									...(t.pattern ? { pattern: t.pattern.toString() } : {}),
									inst: e,
									continue: !t.abort,
								}));
					}))
				: ((u = e._zod).check ?? (u.check = () => {})));
	}),
	kx = re("$ZodCheckRegex", (e, t) => {
		(Mc.init(e, t),
			(e._zod.check = (i) => {
				((t.pattern.lastIndex = 0),
					!t.pattern.test(i.value) &&
						i.issues.push({
							origin: "string",
							code: "invalid_format",
							format: "regex",
							input: i.value,
							pattern: t.pattern.toString(),
							inst: e,
							continue: !t.abort,
						}));
			}));
	}),
	Mx = re("$ZodCheckLowerCase", (e, t) => {
		(t.pattern ?? (t.pattern = wx), Mc.init(e, t));
	}),
	Nx = re("$ZodCheckUpperCase", (e, t) => {
		(t.pattern ?? (t.pattern = Ex), Mc.init(e, t));
	}),
	Ox = re("$ZodCheckIncludes", (e, t) => {
		ir.init(e, t);
		const i = Wu(t.includes),
			u = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${i}` : i);
		((t.pattern = u),
			e._zod.onattach.push((s) => {
				const o = s._zod.bag;
				(o.patterns ?? (o.patterns = new Set()), o.patterns.add(u));
			}),
			(e._zod.check = (s) => {
				s.value.includes(t.includes, t.position) ||
					s.issues.push({
						origin: "string",
						code: "invalid_format",
						format: "includes",
						includes: t.includes,
						input: s.value,
						inst: e,
						continue: !t.abort,
					});
			}));
	}),
	zx = re("$ZodCheckStartsWith", (e, t) => {
		ir.init(e, t);
		const i = new RegExp(`^${Wu(t.prefix)}.*`);
		(t.pattern ?? (t.pattern = i),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag;
				(s.patterns ?? (s.patterns = new Set()), s.patterns.add(i));
			}),
			(e._zod.check = (u) => {
				u.value.startsWith(t.prefix) ||
					u.issues.push({
						origin: "string",
						code: "invalid_format",
						format: "starts_with",
						prefix: t.prefix,
						input: u.value,
						inst: e,
						continue: !t.abort,
					});
			}));
	}),
	Dx = re("$ZodCheckEndsWith", (e, t) => {
		ir.init(e, t);
		const i = new RegExp(`.*${Wu(t.suffix)}$`);
		(t.pattern ?? (t.pattern = i),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag;
				(s.patterns ?? (s.patterns = new Set()), s.patterns.add(i));
			}),
			(e._zod.check = (u) => {
				u.value.endsWith(t.suffix) ||
					u.issues.push({
						origin: "string",
						code: "invalid_format",
						format: "ends_with",
						suffix: t.suffix,
						input: u.value,
						inst: e,
						continue: !t.abort,
					});
			}));
	}),
	jx = re("$ZodCheckOverwrite", (e, t) => {
		(ir.init(e, t),
			(e._zod.check = (i) => {
				i.value = t.tx(i.value);
			}));
	}),
	Ix = class {
		constructor(e = []) {
			((this.content = []), (this.indent = 0), this && (this.args = e));
		}
		indented(e) {
			((this.indent += 1), e(this), (this.indent -= 1));
		}
		write(e) {
			if (typeof e == "function") {
				(e(this, { execution: "sync" }), e(this, { execution: "async" }));
				return;
			}
			const t = e
					.split(
						`
`,
					)
					.filter((s) => s),
				i = Math.min(...t.map((s) => s.length - s.trimStart().length)),
				u = t.map((s) => s.slice(i)).map((s) => " ".repeat(this.indent * 2) + s);
			for (const s of u) this.content.push(s);
		}
		compile() {
			const e = Function,
				t = this?.args,
				i = [...(this?.content ?? [""]).map((u) => `  ${u}`)];
			return new e(
				...t,
				i.join(`
`),
			);
		}
	},
	Lx = { major: 4, minor: 4, patch: 3 },
	Nt = re("$ZodType", (e, t) => {
		var i;
		(e ?? (e = {}), (e._zod.def = t), (e._zod.bag = e._zod.bag || {}), (e._zod.version = Lx));
		const u = [...(e._zod.def.checks ?? [])];
		e._zod.traits.has("$ZodCheck") && u.unshift(e);
		for (const s of u) for (const o of s._zod.onattach) o(e);
		if (u.length === 0)
			((i = e._zod).deferred ?? (i.deferred = []),
				e._zod.deferred?.push(() => {
					e._zod.run = e._zod.parse;
				}));
		else {
			const s = (f, h, m) => {
					let v = Hu(f),
						g;
					for (const S of h) {
						if (S._zod.def.when) {
							if (qT(f) || !S._zod.def.when(f)) continue;
						} else if (v) continue;
						const b = f.issues.length,
							p = S._zod.check(f);
						if (p instanceof Promise && m?.async === !1) throw new Ku();
						if (g || p instanceof Promise)
							g = (g ?? Promise.resolve()).then(async () => {
								(await p, f.issues.length !== b && (v || (v = Hu(f, b))));
							});
						else {
							if (f.issues.length === b) continue;
							v || (v = Hu(f, b));
						}
					}
					return g ? g.then(() => f) : f;
				},
				o = (f, h, m) => {
					if (Hu(f)) return ((f.aborted = !0), f);
					const v = s(h, u, m);
					if (v instanceof Promise) {
						if (m.async === !1) throw new Ku();
						return v.then((g) => e._zod.parse(g, m));
					}
					return e._zod.parse(v, m);
				};
			e._zod.run = (f, h) => {
				if (h.skipChecks) return e._zod.parse(f, h);
				if (h.direction === "backward") {
					const v = e._zod.parse({ value: f.value, issues: [] }, { ...h, skipChecks: !0 });
					return v instanceof Promise ? v.then((g) => o(g, f, h)) : o(v, f, h);
				}
				const m = e._zod.parse(f, h);
				if (m instanceof Promise) {
					if (h.async === !1) throw new Ku();
					return m.then((v) => s(v, u, h));
				}
				return s(m, u, h);
			};
		}
		yt(e, "~standard", () => ({
			validate: (s) => {
				try {
					const o = BT(e, s);
					return o.success ? { value: o.data } : { issues: o.error?.issues };
				} catch {
					return VT(e, s).then((f) => (f.success ? { value: f.data } : { issues: f.error?.issues }));
				}
			},
			vendor: "zod",
			version: 1,
		}));
	}),
	lm = re("$ZodString", (e, t) => {
		(Nt.init(e, t),
			(e._zod.pattern = [...(e?._zod.bag?.patterns ?? [])].pop() ?? px(e._zod.bag)),
			(e._zod.parse = (i, u) => {
				if (t.coerce)
					try {
						i.value = String(i.value);
					} catch {}
				return (
					typeof i.value == "string" ||
						i.issues.push({ expected: "string", code: "invalid_type", input: i.value, inst: e }),
					i
				);
			}));
	}),
	Ot = re("$ZodStringFormat", (e, t) => {
		(Mc.init(e, t), lm.init(e, t));
	}),
	qx = re("$ZodGUID", (e, t) => {
		(t.pattern ?? (t.pattern = ix), Ot.init(e, t));
	}),
	Ux = re("$ZodUUID", (e, t) => {
		if (t.version) {
			const i = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[t.version];
			if (i === void 0) throw new Error(`Invalid UUID version: "${t.version}"`);
			t.pattern ?? (t.pattern = Zp(i));
		} else t.pattern ?? (t.pattern = Zp());
		Ot.init(e, t);
	}),
	$x = re("$ZodEmail", (e, t) => {
		(t.pattern ?? (t.pattern = ax), Ot.init(e, t));
	}),
	Bx = re("$ZodURL", (e, t) => {
		(Ot.init(e, t),
			(e._zod.check = (i) => {
				try {
					const u = i.value.trim();
					if (!t.normalize && t.protocol?.source === hx.source && !/^https?:\/\//i.test(u)) {
						i.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid URL format",
							input: i.value,
							inst: e,
							continue: !t.abort,
						});
						return;
					}
					const s = new URL(u);
					(t.hostname &&
						((t.hostname.lastIndex = 0),
						t.hostname.test(s.hostname) ||
							i.issues.push({
								code: "invalid_format",
								format: "url",
								note: "Invalid hostname",
								pattern: t.hostname.source,
								input: i.value,
								inst: e,
								continue: !t.abort,
							})),
						t.protocol &&
							((t.protocol.lastIndex = 0),
							t.protocol.test(s.protocol.endsWith(":") ? s.protocol.slice(0, -1) : s.protocol) ||
								i.issues.push({
									code: "invalid_format",
									format: "url",
									note: "Invalid protocol",
									pattern: t.protocol.source,
									input: i.value,
									inst: e,
									continue: !t.abort,
								})),
						t.normalize ? (i.value = s.href) : (i.value = u));
					return;
				} catch {
					i.issues.push({ code: "invalid_format", format: "url", input: i.value, inst: e, continue: !t.abort });
				}
			}));
	}),
	Vx = re("$ZodEmoji", (e, t) => {
		(t.pattern ?? (t.pattern = lx()), Ot.init(e, t));
	}),
	Hx = re("$ZodNanoID", (e, t) => {
		(t.pattern ?? (t.pattern = nx), Ot.init(e, t));
	}),
	Zx = re("$ZodCUID", (e, t) => {
		(t.pattern ?? (t.pattern = XT), Ot.init(e, t));
	}),
	Px = re("$ZodCUID2", (e, t) => {
		(t.pattern ?? (t.pattern = JT), Ot.init(e, t));
	}),
	Qx = re("$ZodULID", (e, t) => {
		(t.pattern ?? (t.pattern = WT), Ot.init(e, t));
	}),
	Kx = re("$ZodXID", (e, t) => {
		(t.pattern ?? (t.pattern = ex), Ot.init(e, t));
	}),
	Yx = re("$ZodKSUID", (e, t) => {
		(t.pattern ?? (t.pattern = tx), Ot.init(e, t));
	}),
	Gx = re("$ZodISODateTime", (e, t) => {
		(t.pattern ?? (t.pattern = yx(t)), Ot.init(e, t));
	}),
	Fx = re("$ZodISODate", (e, t) => {
		(t.pattern ?? (t.pattern = vx), Ot.init(e, t));
	}),
	Xx = re("$ZodISOTime", (e, t) => {
		(t.pattern ?? (t.pattern = gx(t)), Ot.init(e, t));
	}),
	Jx = re("$ZodISODuration", (e, t) => {
		(t.pattern ?? (t.pattern = rx), Ot.init(e, t));
	}),
	Wx = re("$ZodIPv4", (e, t) => {
		(t.pattern ?? (t.pattern = sx), Ot.init(e, t), (e._zod.bag.format = "ipv4"));
	}),
	eA = re("$ZodIPv6", (e, t) => {
		(t.pattern ?? (t.pattern = ox),
			Ot.init(e, t),
			(e._zod.bag.format = "ipv6"),
			(e._zod.check = (i) => {
				try {
					new URL(`http://[${i.value}]`);
				} catch {
					i.issues.push({ code: "invalid_format", format: "ipv6", input: i.value, inst: e, continue: !t.abort });
				}
			}));
	}),
	tA = re("$ZodCIDRv4", (e, t) => {
		(t.pattern ?? (t.pattern = cx), Ot.init(e, t));
	}),
	nA = re("$ZodCIDRv6", (e, t) => {
		(t.pattern ?? (t.pattern = fx),
			Ot.init(e, t),
			(e._zod.check = (i) => {
				const u = i.value.split("/");
				try {
					if (u.length !== 2) throw new Error();
					const [s, o] = u;
					if (!o) throw new Error();
					const f = Number(o);
					if (`${f}` !== o) throw new Error();
					if (f < 0 || f > 128) throw new Error();
					new URL(`http://[${s}]`);
				} catch {
					i.issues.push({ code: "invalid_format", format: "cidrv6", input: i.value, inst: e, continue: !t.abort });
				}
			}));
	});
function $b(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 !== 0) return !1;
	try {
		return (atob(e), !0);
	} catch {
		return !1;
	}
}
var rA = re("$ZodBase64", (e, t) => {
	(t.pattern ?? (t.pattern = dx),
		Ot.init(e, t),
		(e._zod.bag.contentEncoding = "base64"),
		(e._zod.check = (i) => {
			$b(i.value) ||
				i.issues.push({ code: "invalid_format", format: "base64", input: i.value, inst: e, continue: !t.abort });
		}));
});
function iA(e) {
	if (!zb.test(e)) return !1;
	const t = e.replace(/[-_]/g, (i) => (i === "-" ? "+" : "/"));
	return $b(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
var aA = re("$ZodBase64URL", (e, t) => {
		(t.pattern ?? (t.pattern = zb),
			Ot.init(e, t),
			(e._zod.bag.contentEncoding = "base64url"),
			(e._zod.check = (i) => {
				iA(i.value) ||
					i.issues.push({ code: "invalid_format", format: "base64url", input: i.value, inst: e, continue: !t.abort });
			}));
	}),
	uA = re("$ZodE164", (e, t) => {
		(t.pattern ?? (t.pattern = mx), Ot.init(e, t));
	});
function lA(e, t = null) {
	try {
		const i = e.split(".");
		if (i.length !== 3) return !1;
		const [u] = i;
		if (!u) return !1;
		const s = JSON.parse(atob(u));
		return !(("typ" in s && s?.typ !== "JWT") || !s.alg || (t && (!("alg" in s) || s.alg !== t)));
	} catch {
		return !1;
	}
}
var sA = re("$ZodJWT", (e, t) => {
		(Ot.init(e, t),
			(e._zod.check = (i) => {
				lA(i.value, t.alg) ||
					i.issues.push({ code: "invalid_format", format: "jwt", input: i.value, inst: e, continue: !t.abort });
			}));
	}),
	Bb = re("$ZodNumber", (e, t) => {
		(Nt.init(e, t),
			(e._zod.pattern = e._zod.bag.pattern ?? Ib),
			(e._zod.parse = (i, u) => {
				if (t.coerce)
					try {
						i.value = Number(i.value);
					} catch {}
				const s = i.value;
				if (typeof s == "number" && !Number.isNaN(s) && Number.isFinite(s)) return i;
				const o = typeof s == "number" ? (Number.isNaN(s) ? "NaN" : Number.isFinite(s) ? void 0 : "Infinity") : void 0;
				return (
					i.issues.push({ expected: "number", code: "invalid_type", input: s, inst: e, ...(o ? { received: o } : {}) }),
					i
				);
			}));
	}),
	oA = re("$ZodNumberFormat", (e, t) => {
		(xx.init(e, t), Bb.init(e, t));
	}),
	cA = re("$ZodBoolean", (e, t) => {
		(Nt.init(e, t),
			(e._zod.pattern = _x),
			(e._zod.parse = (i, u) => {
				if (t.coerce)
					try {
						i.value = !!i.value;
					} catch {}
				const s = i.value;
				return (
					typeof s == "boolean" || i.issues.push({ expected: "boolean", code: "invalid_type", input: s, inst: e }),
					i
				);
			}));
	}),
	fA = re("$ZodUndefined", (e, t) => {
		(Nt.init(e, t),
			(e._zod.pattern = Sx),
			(e._zod.values = new Set([void 0])),
			(e._zod.parse = (i, u) => {
				const s = i.value;
				return (typeof s > "u" || i.issues.push({ expected: "undefined", code: "invalid_type", input: s, inst: e }), i);
			}));
	}),
	dA = re("$ZodUnknown", (e, t) => {
		(Nt.init(e, t), (e._zod.parse = (i) => i));
	}),
	hA = re("$ZodNever", (e, t) => {
		(Nt.init(e, t),
			(e._zod.parse = (i, u) => (
				i.issues.push({ expected: "never", code: "invalid_type", input: i.value, inst: e }),
				i
			)));
	});
function Pp(e, t, i) {
	(e.issues.length && t.issues.push(...Zu(i, e.issues)), (t.value[i] = e.value));
}
var mA = re("$ZodArray", (e, t) => {
	(Nt.init(e, t),
		(e._zod.parse = (i, u) => {
			const s = i.value;
			if (!Array.isArray(s)) return (i.issues.push({ expected: "array", code: "invalid_type", input: s, inst: e }), i);
			i.value = Array(s.length);
			const o = [];
			for (let f = 0; f < s.length; f++) {
				const h = s[f],
					m = t.element._zod.run({ value: h, issues: [] }, u);
				m instanceof Promise ? o.push(m.then((v) => Pp(v, i, f))) : Pp(m, i, f);
			}
			return o.length ? Promise.all(o).then(() => i) : i;
		}));
});
function gc(e, t, i, u, s, o) {
	const f = i in u;
	if (e.issues.length) {
		if (s && o && !f) return;
		t.issues.push(...Zu(i, e.issues));
	}
	if (!f && !s) {
		e.issues.length || t.issues.push({ code: "invalid_type", expected: "nonoptional", input: void 0, path: [i] });
		return;
	}
	e.value === void 0 ? f && (t.value[i] = void 0) : (t.value[i] = e.value);
}
function Vb(e) {
	const t = Object.keys(e.shape);
	for (const u of t)
		if (!e.shape?.[u]?._zod?.traits?.has("$ZodType"))
			throw new Error(`Invalid element at key "${u}": expected a Zod schema`);
	const i = kT(e.shape);
	return { ...e, keys: t, keySet: new Set(t), numKeys: t.length, optionalKeys: new Set(i) };
}
function Hb(e, t, i, u, s, o) {
	const f = [],
		h = s.keySet,
		m = s.catchall._zod,
		v = m.def.type,
		g = m.optin === "optional",
		S = m.optout === "optional";
	for (const b in t) {
		if (b === "__proto__" || h.has(b)) continue;
		if (v === "never") {
			f.push(b);
			continue;
		}
		const p = m.run({ value: t[b], issues: [] }, u);
		p instanceof Promise ? e.push(p.then((T) => gc(T, i, b, t, g, S))) : gc(p, i, b, t, g, S);
	}
	return (
		f.length && i.issues.push({ code: "unrecognized_keys", keys: f, input: t, inst: o }),
		e.length ? Promise.all(e).then(() => i) : i
	);
}
var vA = re("$ZodObject", (e, t) => {
		if ((Nt.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get)) {
			const f = t.shape;
			Object.defineProperty(t, "shape", {
				get: () => {
					const h = { ...f };
					return (Object.defineProperty(t, "shape", { value: h }), h);
				},
			});
		}
		const i = tm(() => Vb(t));
		yt(e._zod, "propValues", () => {
			const f = t.shape,
				h = {};
			for (const m in f) {
				const v = f[m]._zod;
				if (v.values) {
					h[m] ?? (h[m] = new Set());
					for (const g of v.values) h[m].add(g);
				}
			}
			return h;
		});
		const u = vc,
			s = t.catchall;
		let o;
		e._zod.parse = (f, h) => {
			o ?? (o = i.value);
			const m = f.value;
			if (!u(m)) return (f.issues.push({ expected: "object", code: "invalid_type", input: m, inst: e }), f);
			f.value = {};
			const v = [],
				g = o.shape;
			for (const S of o.keys) {
				const b = g[S],
					p = b._zod.optin === "optional",
					T = b._zod.optout === "optional",
					A = b._zod.run({ value: m[S], issues: [] }, h);
				A instanceof Promise ? v.push(A.then((N) => gc(N, f, S, m, p, T))) : gc(A, f, S, m, p, T);
			}
			return s ? Hb(v, m, f, h, i.value, e) : v.length ? Promise.all(v).then(() => f) : f;
		};
	}),
	gA = re("$ZodObjectJIT", (e, t) => {
		vA.init(e, t);
		const i = e._zod.parse,
			u = tm(() => Vb(t)),
			s = (b) => {
				const p = new Ix(["shape", "payload", "ctx"]),
					T = u.value,
					A = (C) => {
						const k = Hp(C);
						return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
					};
				p.write("const input = payload.value;");
				const N = Object.create(null);
				let q = 0;
				for (const C of T.keys) N[C] = `key_${q++}`;
				p.write("const newResult = {};");
				for (const C of T.keys) {
					const k = N[C],
						L = Hp(C),
						Q = b[C],
						K = Q?._zod?.optin === "optional",
						O = Q?._zod?.optout === "optional";
					(p.write(`const ${k} = ${A(C)};`),
						K && O
							? p.write(`
        if (${k}.issues.length) {
          if (${L} in input) {
            payload.issues = payload.issues.concat(${k}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${L}, ...iss.path] : [${L}]
            })));
          }
        }
        
        if (${k}.value === undefined) {
          if (${L} in input) {
            newResult[${L}] = undefined;
          }
        } else {
          newResult[${L}] = ${k}.value;
        }
        
      `)
							: K
								? p.write(`
        if (${k}.issues.length) {
          payload.issues = payload.issues.concat(${k}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${L}, ...iss.path] : [${L}]
          })));
        }
        
        if (${k}.value === undefined) {
          if (${L} in input) {
            newResult[${L}] = undefined;
          }
        } else {
          newResult[${L}] = ${k}.value;
        }
        
      `)
								: p.write(`
        const ${k}_present = ${L} in input;
        if (${k}.issues.length) {
          payload.issues = payload.issues.concat(${k}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${L}, ...iss.path] : [${L}]
          })));
        }
        if (!${k}_present && !${k}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${L}]
          });
        }

        if (${k}_present) {
          if (${k}.value === undefined) {
            newResult[${L}] = undefined;
          } else {
            newResult[${L}] = ${k}.value;
          }
        }

      `));
				}
				(p.write("payload.value = newResult;"), p.write("return payload;"));
				const I = p.compile();
				return (C, k) => I(b, C, k);
			};
		let o;
		const f = vc,
			h = !mc.jitless,
			v = h && RT.value,
			g = t.catchall;
		let S;
		e._zod.parse = (b, p) => {
			S ?? (S = u.value);
			const T = b.value;
			return f(T)
				? h && v && p?.async === !1 && p.jitless !== !0
					? (o || (o = s(t.shape)), (b = o(b, p)), g ? Hb([], T, b, p, S, e) : b)
					: i(b, p)
				: (b.issues.push({ expected: "object", code: "invalid_type", input: T, inst: e }), b);
		};
	});
function Qp(e, t, i, u) {
	for (const o of e) if (o.issues.length === 0) return ((t.value = o.value), t);
	const s = e.filter((o) => !Hu(o));
	return s.length === 1
		? ((t.value = s[0].value), s[0])
		: (t.issues.push({
				code: "invalid_union",
				input: t.value,
				inst: i,
				errors: e.map((o) => o.issues.map((f) => Oi(f, u, Ni()))),
			}),
			t);
}
var yA = re("$ZodUnion", (e, t) => {
		(Nt.init(e, t),
			yt(e._zod, "optin", () => (t.options.some((u) => u._zod.optin === "optional") ? "optional" : void 0)),
			yt(e._zod, "optout", () => (t.options.some((u) => u._zod.optout === "optional") ? "optional" : void 0)),
			yt(e._zod, "values", () => {
				if (t.options.every((u) => u._zod.values)) return new Set(t.options.flatMap((u) => Array.from(u._zod.values)));
			}),
			yt(e._zod, "pattern", () => {
				if (t.options.every((u) => u._zod.pattern)) {
					const u = t.options.map((s) => s._zod.pattern);
					return new RegExp(`^(${u.map((s) => rm(s.source)).join("|")})$`);
				}
			}));
		const i = t.options.length === 1 ? t.options[0]._zod.run : null;
		e._zod.parse = (u, s) => {
			if (i) return i(u, s);
			let o = !1;
			const f = [];
			for (const h of t.options) {
				const m = h._zod.run({ value: u.value, issues: [] }, s);
				if (m instanceof Promise) (f.push(m), (o = !0));
				else {
					if (m.issues.length === 0) return m;
					f.push(m);
				}
			}
			return o ? Promise.all(f).then((h) => Qp(h, u, e, s)) : Qp(f, u, e, s);
		};
	}),
	pA = re("$ZodIntersection", (e, t) => {
		(Nt.init(e, t),
			(e._zod.parse = (i, u) => {
				const s = i.value,
					o = t.left._zod.run({ value: s, issues: [] }, u),
					f = t.right._zod.run({ value: s, issues: [] }, u);
				return o instanceof Promise || f instanceof Promise
					? Promise.all([o, f]).then(([h, m]) => Kp(i, h, m))
					: Kp(i, o, f);
			}));
	});
function Dh(e, t) {
	if (e === t) return { valid: !0, data: e };
	if (e instanceof Date && t instanceof Date && +e == +t) return { valid: !0, data: e };
	if (Ju(e) && Ju(t)) {
		const i = Object.keys(t),
			u = Object.keys(e).filter((o) => i.indexOf(o) !== -1),
			s = { ...e, ...t };
		for (const o of u) {
			const f = Dh(e[o], t[o]);
			if (!f.valid) return { valid: !1, mergeErrorPath: [o, ...f.mergeErrorPath] };
			s[o] = f.data;
		}
		return { valid: !0, data: s };
	}
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return { valid: !1, mergeErrorPath: [] };
		const i = [];
		for (let u = 0; u < e.length; u++) {
			const s = e[u],
				o = t[u],
				f = Dh(s, o);
			if (!f.valid) return { valid: !1, mergeErrorPath: [u, ...f.mergeErrorPath] };
			i.push(f.data);
		}
		return { valid: !0, data: i };
	}
	return { valid: !1, mergeErrorPath: [] };
}
function Kp(e, t, i) {
	const u = new Map();
	let s;
	for (const h of t.issues)
		if (h.code === "unrecognized_keys") {
			s ?? (s = h);
			for (const m of h.keys) (u.has(m) || u.set(m, {}), (u.get(m).l = !0));
		} else e.issues.push(h);
	for (const h of i.issues)
		if (h.code === "unrecognized_keys") for (const m of h.keys) (u.has(m) || u.set(m, {}), (u.get(m).r = !0));
		else e.issues.push(h);
	const o = [...u].filter(([, h]) => h.l && h.r).map(([h]) => h);
	if ((o.length && s && e.issues.push({ ...s, keys: o }), Hu(e))) return e;
	const f = Dh(t.value, i.value);
	if (!f.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(f.mergeErrorPath)}`);
	return ((e.value = f.data), e);
}
var bA = re("$ZodRecord", (e, t) => {
		(Nt.init(e, t),
			(e._zod.parse = (i, u) => {
				const s = i.value;
				if (!Ju(s)) return (i.issues.push({ expected: "record", code: "invalid_type", input: s, inst: e }), i);
				const o = [],
					f = t.keyType._zod.values;
				if (f) {
					i.value = {};
					const h = new Set();
					for (const v of f)
						if (typeof v == "string" || typeof v == "number" || typeof v == "symbol") {
							h.add(typeof v == "number" ? v.toString() : v);
							const g = t.keyType._zod.run({ value: v, issues: [] }, u);
							if (g instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
							if (g.issues.length) {
								i.issues.push({
									code: "invalid_key",
									origin: "record",
									issues: g.issues.map((p) => Oi(p, u, Ni())),
									input: v,
									path: [v],
									inst: e,
								});
								continue;
							}
							const S = g.value,
								b = t.valueType._zod.run({ value: s[v], issues: [] }, u);
							b instanceof Promise
								? o.push(
										b.then((p) => {
											(p.issues.length && i.issues.push(...Zu(v, p.issues)), (i.value[S] = p.value));
										}),
									)
								: (b.issues.length && i.issues.push(...Zu(v, b.issues)), (i.value[S] = b.value));
						}
					let m;
					for (const v in s) h.has(v) || ((m = m ?? []), m.push(v));
					m && m.length > 0 && i.issues.push({ code: "unrecognized_keys", input: s, inst: e, keys: m });
				} else {
					i.value = {};
					for (const h of Reflect.ownKeys(s)) {
						if (h === "__proto__" || !Object.prototype.propertyIsEnumerable.call(s, h)) continue;
						let m = t.keyType._zod.run({ value: h, issues: [] }, u);
						if (m instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
						if (typeof h == "string" && Ib.test(h) && m.issues.length) {
							const g = t.keyType._zod.run({ value: Number(h), issues: [] }, u);
							if (g instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
							g.issues.length === 0 && (m = g);
						}
						if (m.issues.length) {
							t.mode === "loose"
								? (i.value[h] = s[h])
								: i.issues.push({
										code: "invalid_key",
										origin: "record",
										issues: m.issues.map((g) => Oi(g, u, Ni())),
										input: h,
										path: [h],
										inst: e,
									});
							continue;
						}
						const v = t.valueType._zod.run({ value: s[h], issues: [] }, u);
						v instanceof Promise
							? o.push(
									v.then((g) => {
										(g.issues.length && i.issues.push(...Zu(h, g.issues)), (i.value[m.value] = g.value));
									}),
								)
							: (v.issues.length && i.issues.push(...Zu(h, v.issues)), (i.value[m.value] = v.value));
					}
				}
				return o.length ? Promise.all(o).then(() => i) : i;
			}));
	}),
	_A = re("$ZodEnum", (e, t) => {
		Nt.init(e, t);
		const i = Rb(t.entries),
			u = new Set(i);
		((e._zod.values = u),
			(e._zod.pattern = new RegExp(
				`^(${i
					.filter((s) => CT.has(typeof s))
					.map((s) => (typeof s == "string" ? Wu(s) : s.toString()))
					.join("|")})$`,
			)),
			(e._zod.parse = (s, o) => {
				const f = s.value;
				return (u.has(f) || s.issues.push({ code: "invalid_value", values: i, input: f, inst: e }), s);
			}));
	}),
	SA = re("$ZodLiteral", (e, t) => {
		if ((Nt.init(e, t), t.values.length === 0)) throw new Error("Cannot create literal schema with no valid values");
		const i = new Set(t.values);
		((e._zod.values = i),
			(e._zod.pattern = new RegExp(
				`^(${t.values.map((u) => (typeof u == "string" ? Wu(u) : u ? Wu(u.toString()) : String(u))).join("|")})$`,
			)),
			(e._zod.parse = (u, s) => {
				const o = u.value;
				return (i.has(o) || u.issues.push({ code: "invalid_value", values: t.values, input: o, inst: e }), u);
			}));
	}),
	wA = re("$ZodTransform", (e, t) => {
		(Nt.init(e, t),
			(e._zod.optin = "optional"),
			(e._zod.parse = (i, u) => {
				if (u.direction === "backward") throw new Ab(e.constructor.name);
				const s = t.transform(i.value, i);
				if (u.async)
					return (s instanceof Promise ? s : Promise.resolve(s)).then((o) => ((i.value = o), (i.fallback = !0), i));
				if (s instanceof Promise) throw new Ku();
				return ((i.value = s), (i.fallback = !0), i);
			}));
	});
function Yp(e, t) {
	return t === void 0 && (e.issues.length || e.fallback) ? { issues: [], value: void 0 } : e;
}
var Zb = re("$ZodOptional", (e, t) => {
		(Nt.init(e, t),
			(e._zod.optin = "optional"),
			(e._zod.optout = "optional"),
			yt(e._zod, "values", () => (t.innerType._zod.values ? new Set([...t.innerType._zod.values, void 0]) : void 0)),
			yt(e._zod, "pattern", () => {
				const i = t.innerType._zod.pattern;
				return i ? new RegExp(`^(${rm(i.source)})?$`) : void 0;
			}),
			(e._zod.parse = (i, u) => {
				if (t.innerType._zod.optin === "optional") {
					const s = i.value,
						o = t.innerType._zod.run(i, u);
					return o instanceof Promise ? o.then((f) => Yp(f, s)) : Yp(o, s);
				}
				return i.value === void 0 ? i : t.innerType._zod.run(i, u);
			}));
	}),
	EA = re("$ZodExactOptional", (e, t) => {
		(Zb.init(e, t),
			yt(e._zod, "values", () => t.innerType._zod.values),
			yt(e._zod, "pattern", () => t.innerType._zod.pattern),
			(e._zod.parse = (i, u) => t.innerType._zod.run(i, u)));
	}),
	TA = re("$ZodNullable", (e, t) => {
		(Nt.init(e, t),
			yt(e._zod, "optin", () => t.innerType._zod.optin),
			yt(e._zod, "optout", () => t.innerType._zod.optout),
			yt(e._zod, "pattern", () => {
				const i = t.innerType._zod.pattern;
				return i ? new RegExp(`^(${rm(i.source)}|null)$`) : void 0;
			}),
			yt(e._zod, "values", () => (t.innerType._zod.values ? new Set([...t.innerType._zod.values, null]) : void 0)),
			(e._zod.parse = (i, u) => (i.value === null ? i : t.innerType._zod.run(i, u))));
	}),
	xA = re("$ZodDefault", (e, t) => {
		(Nt.init(e, t),
			(e._zod.optin = "optional"),
			yt(e._zod, "values", () => t.innerType._zod.values),
			(e._zod.parse = (i, u) => {
				if (u.direction === "backward") return t.innerType._zod.run(i, u);
				if (i.value === void 0) return ((i.value = t.defaultValue), i);
				const s = t.innerType._zod.run(i, u);
				return s instanceof Promise ? s.then((o) => Gp(o, t)) : Gp(s, t);
			}));
	});
function Gp(e, t) {
	return (e.value === void 0 && (e.value = t.defaultValue), e);
}
var AA = re("$ZodPrefault", (e, t) => {
		(Nt.init(e, t),
			(e._zod.optin = "optional"),
			yt(e._zod, "values", () => t.innerType._zod.values),
			(e._zod.parse = (i, u) => (
				u.direction === "backward" || (i.value === void 0 && (i.value = t.defaultValue)),
				t.innerType._zod.run(i, u)
			)));
	}),
	RA = re("$ZodNonOptional", (e, t) => {
		(Nt.init(e, t),
			yt(e._zod, "values", () => {
				const i = t.innerType._zod.values;
				return i ? new Set([...i].filter((u) => u !== void 0)) : void 0;
			}),
			(e._zod.parse = (i, u) => {
				const s = t.innerType._zod.run(i, u);
				return s instanceof Promise ? s.then((o) => Fp(o, e)) : Fp(s, e);
			}));
	});
function Fp(e, t) {
	return (
		!e.issues.length &&
			e.value === void 0 &&
			e.issues.push({ code: "invalid_type", expected: "nonoptional", input: e.value, inst: t }),
		e
	);
}
var CA = re("$ZodCatch", (e, t) => {
		(Nt.init(e, t),
			(e._zod.optin = "optional"),
			yt(e._zod, "optout", () => t.innerType._zod.optout),
			yt(e._zod, "values", () => t.innerType._zod.values),
			(e._zod.parse = (i, u) => {
				if (u.direction === "backward") return t.innerType._zod.run(i, u);
				const s = t.innerType._zod.run(i, u);
				return s instanceof Promise
					? s.then(
							(o) => (
								(i.value = o.value),
								o.issues.length &&
									((i.value = t.catchValue({
										...i,
										error: { issues: o.issues.map((f) => Oi(f, u, Ni())) },
										input: i.value,
									})),
									(i.issues = []),
									(i.fallback = !0)),
								i
							),
						)
					: ((i.value = s.value),
						s.issues.length &&
							((i.value = t.catchValue({
								...i,
								error: { issues: s.issues.map((o) => Oi(o, u, Ni())) },
								input: i.value,
							})),
							(i.issues = []),
							(i.fallback = !0)),
						i);
			}));
	}),
	kA = re("$ZodPipe", (e, t) => {
		(Nt.init(e, t),
			yt(e._zod, "values", () => t.in._zod.values),
			yt(e._zod, "optin", () => t.in._zod.optin),
			yt(e._zod, "optout", () => t.out._zod.optout),
			yt(e._zod, "propValues", () => t.in._zod.propValues),
			(e._zod.parse = (i, u) => {
				if (u.direction === "backward") {
					const o = t.out._zod.run(i, u);
					return o instanceof Promise ? o.then((f) => Ko(f, t.in, u)) : Ko(o, t.in, u);
				}
				const s = t.in._zod.run(i, u);
				return s instanceof Promise ? s.then((o) => Ko(o, t.out, u)) : Ko(s, t.out, u);
			}));
	});
function Ko(e, t, i) {
	return e.issues.length
		? ((e.aborted = !0), e)
		: t._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, i);
}
var MA = re("$ZodReadonly", (e, t) => {
	(Nt.init(e, t),
		yt(e._zod, "propValues", () => t.innerType._zod.propValues),
		yt(e._zod, "values", () => t.innerType._zod.values),
		yt(e._zod, "optin", () => t.innerType?._zod?.optin),
		yt(e._zod, "optout", () => t.innerType?._zod?.optout),
		(e._zod.parse = (i, u) => {
			if (u.direction === "backward") return t.innerType._zod.run(i, u);
			const s = t.innerType._zod.run(i, u);
			return s instanceof Promise ? s.then(Xp) : Xp(s);
		}));
});
function Xp(e) {
	return ((e.value = Object.freeze(e.value)), e);
}
var NA = re("$ZodCustom", (e, t) => {
	(ir.init(e, t),
		Nt.init(e, t),
		(e._zod.parse = (i, u) => i),
		(e._zod.check = (i) => {
			const u = i.value,
				s = t.fn(u);
			if (s instanceof Promise) return s.then((o) => Jp(o, i, u, e));
			Jp(s, i, u, e);
		}));
});
function Jp(e, t, i, u) {
	if (!e) {
		const s = { code: "custom", input: i, inst: u, path: [...(u._zod.def.path ?? [])], continue: !u._zod.def.abort };
		(u._zod.def.params && (s.params = u._zod.def.params), t.issues.push(ds(s)));
	}
}
var Wp,
	OA = class {
		constructor() {
			((this._map = new WeakMap()), (this._idmap = new Map()));
		}
		add(e, ...t) {
			const i = t[0];
			return (this._map.set(e, i), i && typeof i == "object" && "id" in i && this._idmap.set(i.id, e), this);
		}
		clear() {
			return ((this._map = new WeakMap()), (this._idmap = new Map()), this);
		}
		remove(e) {
			const t = this._map.get(e);
			return (t && typeof t == "object" && "id" in t && this._idmap.delete(t.id), this._map.delete(e), this);
		}
		get(e) {
			const t = e._zod.parent;
			if (t) {
				const i = { ...(this.get(t) ?? {}) };
				delete i.id;
				const u = { ...i, ...this._map.get(e) };
				return Object.keys(u).length ? u : void 0;
			}
			return this._map.get(e);
		}
		has(e) {
			return this._map.has(e);
		}
	};
function zA() {
	return new OA();
}
(Wp = globalThis).__zod_globalRegistry ?? (Wp.__zod_globalRegistry = zA());
var is = globalThis.__zod_globalRegistry;
function DA(e, t) {
	return new e({ type: "string", ...xe(t) });
}
function jA(e, t) {
	return new e({ type: "string", format: "email", check: "string_format", abort: !1, ...xe(t) });
}
function e0(e, t) {
	return new e({ type: "string", format: "guid", check: "string_format", abort: !1, ...xe(t) });
}
function IA(e, t) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, ...xe(t) });
}
function LA(e, t) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v4", ...xe(t) });
}
function qA(e, t) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v6", ...xe(t) });
}
function UA(e, t) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v7", ...xe(t) });
}
function $A(e, t) {
	return new e({ type: "string", format: "url", check: "string_format", abort: !1, ...xe(t) });
}
function BA(e, t) {
	return new e({ type: "string", format: "emoji", check: "string_format", abort: !1, ...xe(t) });
}
function VA(e, t) {
	return new e({ type: "string", format: "nanoid", check: "string_format", abort: !1, ...xe(t) });
}
function HA(e, t) {
	return new e({ type: "string", format: "cuid", check: "string_format", abort: !1, ...xe(t) });
}
function ZA(e, t) {
	return new e({ type: "string", format: "cuid2", check: "string_format", abort: !1, ...xe(t) });
}
function PA(e, t) {
	return new e({ type: "string", format: "ulid", check: "string_format", abort: !1, ...xe(t) });
}
function QA(e, t) {
	return new e({ type: "string", format: "xid", check: "string_format", abort: !1, ...xe(t) });
}
function KA(e, t) {
	return new e({ type: "string", format: "ksuid", check: "string_format", abort: !1, ...xe(t) });
}
function YA(e, t) {
	return new e({ type: "string", format: "ipv4", check: "string_format", abort: !1, ...xe(t) });
}
function GA(e, t) {
	return new e({ type: "string", format: "ipv6", check: "string_format", abort: !1, ...xe(t) });
}
function FA(e, t) {
	return new e({ type: "string", format: "cidrv4", check: "string_format", abort: !1, ...xe(t) });
}
function XA(e, t) {
	return new e({ type: "string", format: "cidrv6", check: "string_format", abort: !1, ...xe(t) });
}
function JA(e, t) {
	return new e({ type: "string", format: "base64", check: "string_format", abort: !1, ...xe(t) });
}
function WA(e, t) {
	return new e({ type: "string", format: "base64url", check: "string_format", abort: !1, ...xe(t) });
}
function eR(e, t) {
	return new e({ type: "string", format: "e164", check: "string_format", abort: !1, ...xe(t) });
}
function tR(e, t) {
	return new e({ type: "string", format: "jwt", check: "string_format", abort: !1, ...xe(t) });
}
function nR(e, t) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...xe(t),
	});
}
function rR(e, t) {
	return new e({ type: "string", format: "date", check: "string_format", ...xe(t) });
}
function iR(e, t) {
	return new e({ type: "string", format: "time", check: "string_format", precision: null, ...xe(t) });
}
function aR(e, t) {
	return new e({ type: "string", format: "duration", check: "string_format", ...xe(t) });
}
function uR(e, t) {
	return new e({ type: "number", checks: [], ...xe(t) });
}
function lR(e, t) {
	return new e({ type: "number", check: "number_format", abort: !1, format: "safeint", ...xe(t) });
}
function sR(e, t) {
	return new e({ type: "boolean", ...xe(t) });
}
function oR(e, t) {
	return new e({ type: "undefined", ...xe(t) });
}
function cR(e) {
	return new e({ type: "unknown" });
}
function fR(e, t) {
	return new e({ type: "never", ...xe(t) });
}
function t0(e, t) {
	return new qb({ check: "less_than", ...xe(t), value: e, inclusive: !1 });
}
function ah(e, t) {
	return new qb({ check: "less_than", ...xe(t), value: e, inclusive: !0 });
}
function n0(e, t) {
	return new Ub({ check: "greater_than", ...xe(t), value: e, inclusive: !1 });
}
function uh(e, t) {
	return new Ub({ check: "greater_than", ...xe(t), value: e, inclusive: !0 });
}
function r0(e, t) {
	return new Tx({ check: "multiple_of", ...xe(t), value: e });
}
function Pb(e, t) {
	return new Ax({ check: "max_length", ...xe(t), maximum: e });
}
function yc(e, t) {
	return new Rx({ check: "min_length", ...xe(t), minimum: e });
}
function Qb(e, t) {
	return new Cx({ check: "length_equals", ...xe(t), length: e });
}
function dR(e, t) {
	return new kx({ check: "string_format", format: "regex", ...xe(t), pattern: e });
}
function hR(e) {
	return new Mx({ check: "string_format", format: "lowercase", ...xe(e) });
}
function mR(e) {
	return new Nx({ check: "string_format", format: "uppercase", ...xe(e) });
}
function vR(e, t) {
	return new Ox({ check: "string_format", format: "includes", ...xe(t), includes: e });
}
function gR(e, t) {
	return new zx({ check: "string_format", format: "starts_with", ...xe(t), prefix: e });
}
function yR(e, t) {
	return new Dx({ check: "string_format", format: "ends_with", ...xe(t), suffix: e });
}
function nl(e) {
	return new jx({ check: "overwrite", tx: e });
}
function pR(e) {
	return nl((t) => t.normalize(e));
}
function bR() {
	return nl((e) => e.trim());
}
function _R() {
	return nl((e) => e.toLowerCase());
}
function SR() {
	return nl((e) => e.toUpperCase());
}
function wR() {
	return nl((e) => AT(e));
}
function ER(e, t, i) {
	return new e({ type: "array", element: t, ...xe(i) });
}
function TR(e, t, i) {
	return new e({ type: "custom", check: "custom", fn: t, ...xe(i) });
}
function xR(e, t) {
	const i = AR(
		(u) => (
			(u.addIssue = (s) => {
				if (typeof s == "string") u.issues.push(ds(s, u.value, i._zod.def));
				else {
					const o = s;
					(o.fatal && (o.continue = !1),
						o.code ?? (o.code = "custom"),
						o.input ?? (o.input = u.value),
						o.inst ?? (o.inst = i),
						o.continue ?? (o.continue = !i._zod.def.abort),
						u.issues.push(ds(o)));
				}
			}),
			e(u.value, u)
		),
		t,
	);
	return i;
}
function AR(e, t) {
	const i = new ir({ check: "custom", ...xe(t) });
	return ((i._zod.check = e), i);
}
function Kb(e) {
	let t = e?.target ?? "draft-2020-12";
	return (
		t === "draft-4" && (t = "draft-04"),
		t === "draft-7" && (t = "draft-07"),
		{
			processors: e.processors ?? {},
			metadataRegistry: e?.metadata ?? is,
			target: t,
			unrepresentable: e?.unrepresentable ?? "throw",
			override: e?.override ?? (() => {}),
			io: e?.io ?? "output",
			counter: 0,
			seen: new Map(),
			cycles: e?.cycles ?? "ref",
			reused: e?.reused ?? "inline",
			external: e?.external ?? void 0,
		}
	);
}
function hn(e, t, i = { path: [], schemaPath: [] }) {
	var u;
	const s = e._zod.def,
		o = t.seen.get(e);
	if (o) return (o.count++, i.schemaPath.includes(e) && (o.cycle = i.path), o.schema);
	const f = { schema: {}, count: 1, cycle: void 0, path: i.path };
	t.seen.set(e, f);
	const h = e._zod.toJSONSchema?.();
	if (h) f.schema = h;
	else {
		const v = { ...i, schemaPath: [...i.schemaPath, e], path: i.path };
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, f.schema, v);
		else {
			const S = f.schema,
				b = t.processors[s.type];
			if (!b) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${s.type}`);
			b(e, t, S, v);
		}
		const g = e._zod.parent;
		g && (f.ref || (f.ref = g), hn(g, t, v), (t.seen.get(g).isParent = !0));
	}
	const m = t.metadataRegistry.get(e);
	return (
		m && Object.assign(f.schema, m),
		t.io === "input" && Hn(e) && (delete f.schema.examples, delete f.schema.default),
		t.io === "input" && "_prefault" in f.schema && ((u = f.schema).default ?? (u.default = f.schema._prefault)),
		delete f.schema._prefault,
		t.seen.get(e).schema
	);
}
function Yb(e, t) {
	const i = e.seen.get(t);
	if (!i) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const u = new Map();
	for (const f of e.seen.entries()) {
		const h = e.metadataRegistry.get(f[0])?.id;
		if (h) {
			const m = u.get(h);
			if (m && m !== f[0])
				throw new Error(
					`Duplicate schema id "${h}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`,
				);
			u.set(h, f[0]);
		}
	}
	const s = (f) => {
			const h = e.target === "draft-2020-12" ? "$defs" : "definitions";
			if (e.external) {
				const g = e.external.registry.get(f[0])?.id,
					S = e.external.uri ?? ((p) => p);
				if (g) return { ref: S(g) };
				const b = f[1].defId ?? f[1].schema.id ?? `schema${e.counter++}`;
				return ((f[1].defId = b), { defId: b, ref: `${S("__shared")}#/${h}/${b}` });
			}
			if (f[1] === i) return { ref: "#" };
			const m = `#/${h}/`,
				v = f[1].schema.id ?? `__schema${e.counter++}`;
			return { defId: v, ref: m + v };
		},
		o = (f) => {
			if (f[1].schema.$ref) return;
			const h = f[1],
				{ ref: m, defId: v } = s(f);
			((h.def = { ...h.schema }), v && (h.defId = v));
			const g = h.schema;
			for (const S in g) delete g[S];
			g.$ref = m;
		};
	if (e.cycles === "throw")
		for (const f of e.seen.entries()) {
			const h = f[1];
			if (h.cycle)
				throw new Error(`Cycle detected: #/${h.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
		}
	for (const f of e.seen.entries()) {
		const h = f[1];
		if (t === f[0]) {
			o(f);
			continue;
		}
		if (e.external) {
			const m = e.external.registry.get(f[0])?.id;
			if (t !== f[0] && m) {
				o(f);
				continue;
			}
		}
		if (e.metadataRegistry.get(f[0])?.id) {
			o(f);
			continue;
		}
		if (h.cycle) {
			o(f);
			continue;
		}
		if (h.count > 1 && e.reused === "ref") {
			o(f);
			continue;
		}
	}
}
function Gb(e, t) {
	const i = e.seen.get(t);
	if (!i) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const u = (h) => {
		const m = e.seen.get(h);
		if (m.ref === null) return;
		const v = m.def ?? m.schema,
			g = { ...v },
			S = m.ref;
		if (((m.ref = null), S)) {
			u(S);
			const p = e.seen.get(S),
				T = p.schema;
			if (
				(T.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0")
					? ((v.allOf = v.allOf ?? []), v.allOf.push(T))
					: Object.assign(v, T),
				Object.assign(v, g),
				h._zod.parent === S)
			)
				for (const A in v) A === "$ref" || A === "allOf" || A in g || delete v[A];
			if (T.$ref && p.def)
				for (const A in v)
					A === "$ref" ||
						A === "allOf" ||
						(A in p.def && JSON.stringify(v[A]) === JSON.stringify(p.def[A]) && delete v[A]);
		}
		const b = h._zod.parent;
		if (b && b !== S) {
			u(b);
			const p = e.seen.get(b);
			if (p?.schema.$ref && ((v.$ref = p.schema.$ref), p.def))
				for (const T in v)
					T === "$ref" ||
						T === "allOf" ||
						(T in p.def && JSON.stringify(v[T]) === JSON.stringify(p.def[T]) && delete v[T]);
		}
		e.override({ zodSchema: h, jsonSchema: v, path: m.path ?? [] });
	};
	for (const h of [...e.seen.entries()].reverse()) u(h[0]);
	const s = {};
	if (
		(e.target === "draft-2020-12"
			? (s.$schema = "https://json-schema.org/draft/2020-12/schema")
			: e.target === "draft-07"
				? (s.$schema = "http://json-schema.org/draft-07/schema#")
				: e.target === "draft-04"
					? (s.$schema = "http://json-schema.org/draft-04/schema#")
					: e.target,
		e.external?.uri)
	) {
		const h = e.external.registry.get(t)?.id;
		if (!h) throw new Error("Schema is missing an `id` property");
		s.$id = e.external.uri(h);
	}
	Object.assign(s, i.def ?? i.schema);
	const o = e.metadataRegistry.get(t)?.id;
	o !== void 0 && s.id === o && delete s.id;
	const f = e.external?.defs ?? {};
	for (const h of e.seen.entries()) {
		const m = h[1];
		m.def && m.defId && (m.def.id === m.defId && delete m.def.id, (f[m.defId] = m.def));
	}
	e.external || (Object.keys(f).length > 0 && (e.target === "draft-2020-12" ? (s.$defs = f) : (s.definitions = f)));
	try {
		const h = JSON.parse(JSON.stringify(s));
		return (
			Object.defineProperty(h, "~standard", {
				value: {
					...t["~standard"],
					jsonSchema: { input: pc(t, "input", e.processors), output: pc(t, "output", e.processors) },
				},
				enumerable: !1,
				writable: !1,
			}),
			h
		);
	} catch {
		throw new Error("Error converting schema to JSON.");
	}
}
function Hn(e, t) {
	const i = t ?? { seen: new Set() };
	if (i.seen.has(e)) return !1;
	i.seen.add(e);
	const u = e._zod.def;
	if (u.type === "transform") return !0;
	if (u.type === "array") return Hn(u.element, i);
	if (u.type === "set") return Hn(u.valueType, i);
	if (u.type === "lazy") return Hn(u.getter(), i);
	if (
		u.type === "promise" ||
		u.type === "optional" ||
		u.type === "nonoptional" ||
		u.type === "nullable" ||
		u.type === "readonly" ||
		u.type === "default" ||
		u.type === "prefault"
	)
		return Hn(u.innerType, i);
	if (u.type === "intersection") return Hn(u.left, i) || Hn(u.right, i);
	if (u.type === "record" || u.type === "map") return Hn(u.keyType, i) || Hn(u.valueType, i);
	if (u.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : Hn(u.in, i) || Hn(u.out, i);
	if (u.type === "object") {
		for (const s in u.shape) if (Hn(u.shape[s], i)) return !0;
		return !1;
	}
	if (u.type === "union") {
		for (const s of u.options) if (Hn(s, i)) return !0;
		return !1;
	}
	if (u.type === "tuple") {
		for (const s of u.items) if (Hn(s, i)) return !0;
		return !!(u.rest && Hn(u.rest, i));
	}
	return !1;
}
var RR =
		(e, t = {}) =>
		(i) => {
			const u = Kb({ ...i, processors: t });
			return (hn(e, u), Yb(u, e), Gb(u, e));
		},
	pc =
		(e, t, i = {}) =>
		(u) => {
			const { libraryOptions: s, target: o } = u ?? {},
				f = Kb({ ...(s ?? {}), target: o, io: t, processors: i });
			return (hn(e, f), Yb(f, e), Gb(f, e));
		},
	CR = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" },
	kR = (e, t, i, u) => {
		const s = i;
		s.type = "string";
		const { minimum: o, maximum: f, format: h, patterns: m, contentEncoding: v } = e._zod.bag;
		if (
			(typeof o == "number" && (s.minLength = o),
			typeof f == "number" && (s.maxLength = f),
			h && ((s.format = CR[h] ?? h), s.format === "" && delete s.format, h === "time" && delete s.format),
			v && (s.contentEncoding = v),
			m && m.size > 0)
		) {
			const g = [...m];
			g.length === 1
				? (s.pattern = g[0].source)
				: g.length > 1 &&
					(s.allOf = [
						...g.map((S) => ({
							...(t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0"
								? { type: "string" }
								: {}),
							pattern: S.source,
						})),
					]);
		}
	},
	MR = (e, t, i, u) => {
		const s = i,
			{ minimum: o, maximum: f, format: h, multipleOf: m, exclusiveMaximum: v, exclusiveMinimum: g } = e._zod.bag;
		typeof h == "string" && h.includes("int") ? (s.type = "integer") : (s.type = "number");
		const S = typeof g == "number" && g >= (o ?? Number.NEGATIVE_INFINITY),
			b = typeof v == "number" && v <= (f ?? Number.POSITIVE_INFINITY),
			p = t.target === "draft-04" || t.target === "openapi-3.0";
		(S
			? p
				? ((s.minimum = g), (s.exclusiveMinimum = !0))
				: (s.exclusiveMinimum = g)
			: typeof o == "number" && (s.minimum = o),
			b
				? p
					? ((s.maximum = v), (s.exclusiveMaximum = !0))
					: (s.exclusiveMaximum = v)
				: typeof f == "number" && (s.maximum = f),
			typeof m == "number" && (s.multipleOf = m));
	},
	NR = (e, t, i, u) => {
		i.type = "boolean";
	},
	OR = (e, t, i, u) => {
		if (t.unrepresentable === "throw") throw new Error("Undefined cannot be represented in JSON Schema");
	},
	zR = (e, t, i, u) => {
		i.not = {};
	},
	DR = (e, t, i, u) => {},
	jR = (e, t, i, u) => {
		const s = e._zod.def,
			o = Rb(s.entries);
		(o.every((f) => typeof f == "number") && (i.type = "number"),
			o.every((f) => typeof f == "string") && (i.type = "string"),
			(i.enum = o));
	},
	IR = (e, t, i, u) => {
		const s = e._zod.def,
			o = [];
		for (const f of s.values)
			if (f === void 0) {
				if (t.unrepresentable === "throw") throw new Error("Literal `undefined` cannot be represented in JSON Schema");
			} else if (typeof f == "bigint") {
				if (t.unrepresentable === "throw") throw new Error("BigInt literals cannot be represented in JSON Schema");
				o.push(Number(f));
			} else o.push(f);
		if (o.length !== 0)
			if (o.length === 1) {
				const f = o[0];
				((i.type = f === null ? "null" : typeof f),
					t.target === "draft-04" || t.target === "openapi-3.0" ? (i.enum = [f]) : (i.const = f));
			} else
				(o.every((f) => typeof f == "number") && (i.type = "number"),
					o.every((f) => typeof f == "string") && (i.type = "string"),
					o.every((f) => typeof f == "boolean") && (i.type = "boolean"),
					o.every((f) => f === null) && (i.type = "null"),
					(i.enum = o));
	},
	LR = (e, t, i, u) => {
		if (t.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
	},
	qR = (e, t, i, u) => {
		if (t.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
	},
	UR = (e, t, i, u) => {
		const s = i,
			o = e._zod.def,
			{ minimum: f, maximum: h } = e._zod.bag;
		(typeof f == "number" && (s.minItems = f),
			typeof h == "number" && (s.maxItems = h),
			(s.type = "array"),
			(s.items = hn(o.element, t, { ...u, path: [...u.path, "items"] })));
	},
	$R = (e, t, i, u) => {
		const s = i,
			o = e._zod.def;
		((s.type = "object"), (s.properties = {}));
		const f = o.shape;
		for (const v in f) s.properties[v] = hn(f[v], t, { ...u, path: [...u.path, "properties", v] });
		const h = new Set(Object.keys(f)),
			m = new Set(
				[...h].filter((v) => {
					const g = o.shape[v]._zod;
					return t.io === "input" ? g.optin === void 0 : g.optout === void 0;
				}),
			);
		(m.size > 0 && (s.required = Array.from(m)),
			o.catchall?._zod.def.type === "never"
				? (s.additionalProperties = !1)
				: o.catchall
					? o.catchall &&
						(s.additionalProperties = hn(o.catchall, t, { ...u, path: [...u.path, "additionalProperties"] }))
					: t.io === "output" && (s.additionalProperties = !1));
	},
	BR = (e, t, i, u) => {
		const s = e._zod.def,
			o = s.inclusive === !1,
			f = s.options.map((h, m) => hn(h, t, { ...u, path: [...u.path, o ? "oneOf" : "anyOf", m] }));
		o ? (i.oneOf = f) : (i.anyOf = f);
	},
	VR = (e, t, i, u) => {
		const s = e._zod.def,
			o = hn(s.left, t, { ...u, path: [...u.path, "allOf", 0] }),
			f = hn(s.right, t, { ...u, path: [...u.path, "allOf", 1] }),
			h = (m) => "allOf" in m && Object.keys(m).length === 1;
		i.allOf = [...(h(o) ? o.allOf : [o]), ...(h(f) ? f.allOf : [f])];
	},
	HR = (e, t, i, u) => {
		const s = i,
			o = e._zod.def;
		s.type = "object";
		const f = o.keyType,
			h = f._zod.bag?.patterns;
		if (o.mode === "loose" && h && h.size > 0) {
			const v = hn(o.valueType, t, { ...u, path: [...u.path, "patternProperties", "*"] });
			s.patternProperties = {};
			for (const g of h) s.patternProperties[g.source] = v;
		} else
			((t.target === "draft-07" || t.target === "draft-2020-12") &&
				(s.propertyNames = hn(o.keyType, t, { ...u, path: [...u.path, "propertyNames"] })),
				(s.additionalProperties = hn(o.valueType, t, { ...u, path: [...u.path, "additionalProperties"] })));
		const m = f._zod.values;
		if (m) {
			const v = [...m].filter((g) => typeof g == "string" || typeof g == "number");
			v.length > 0 && (s.required = v);
		}
	},
	ZR = (e, t, i, u) => {
		const s = e._zod.def,
			o = hn(s.innerType, t, u),
			f = t.seen.get(e);
		t.target === "openapi-3.0" ? ((f.ref = s.innerType), (i.nullable = !0)) : (i.anyOf = [o, { type: "null" }]);
	},
	PR = (e, t, i, u) => {
		const s = e._zod.def;
		hn(s.innerType, t, u);
		const o = t.seen.get(e);
		o.ref = s.innerType;
	},
	QR = (e, t, i, u) => {
		const s = e._zod.def;
		hn(s.innerType, t, u);
		const o = t.seen.get(e);
		((o.ref = s.innerType), (i.default = JSON.parse(JSON.stringify(s.defaultValue))));
	},
	KR = (e, t, i, u) => {
		const s = e._zod.def;
		hn(s.innerType, t, u);
		const o = t.seen.get(e);
		((o.ref = s.innerType), t.io === "input" && (i._prefault = JSON.parse(JSON.stringify(s.defaultValue))));
	},
	YR = (e, t, i, u) => {
		const s = e._zod.def;
		hn(s.innerType, t, u);
		const o = t.seen.get(e);
		o.ref = s.innerType;
		let f;
		try {
			f = s.catchValue(void 0);
		} catch {
			throw new Error("Dynamic catch values are not supported in JSON Schema");
		}
		i.default = f;
	},
	GR = (e, t, i, u) => {
		const s = e._zod.def,
			o = s.in._zod.traits.has("$ZodTransform"),
			f = t.io === "input" ? (o ? s.out : s.in) : s.out;
		hn(f, t, u);
		const h = t.seen.get(e);
		h.ref = f;
	},
	FR = (e, t, i, u) => {
		const s = e._zod.def;
		hn(s.innerType, t, u);
		const o = t.seen.get(e);
		((o.ref = s.innerType), (i.readOnly = !0));
	},
	Fb = (e, t, i, u) => {
		const s = e._zod.def;
		hn(s.innerType, t, u);
		const o = t.seen.get(e);
		o.ref = s.innerType;
	},
	XR = re("ZodISODateTime", (e, t) => {
		(Gx.init(e, t), It.init(e, t));
	});
function JR(e) {
	return nR(XR, e);
}
var WR = re("ZodISODate", (e, t) => {
	(Fx.init(e, t), It.init(e, t));
});
function eC(e) {
	return rR(WR, e);
}
var tC = re("ZodISOTime", (e, t) => {
	(Xx.init(e, t), It.init(e, t));
});
function nC(e) {
	return iR(tC, e);
}
var rC = re("ZodISODuration", (e, t) => {
	(Jx.init(e, t), It.init(e, t));
});
function iC(e) {
	return aR(rC, e);
}
var aC = (e, t) => {
		(Nb.init(e, t),
			(e.name = "ZodError"),
			Object.defineProperties(e, {
				format: { value: (i) => $T(e, i) },
				flatten: { value: (i) => UT(e, i) },
				addIssue: {
					value: (i) => {
						(e.issues.push(i), (e.message = JSON.stringify(e.issues, zh, 2)));
					},
				},
				addIssues: {
					value: (i) => {
						(e.issues.push(...i), (e.message = JSON.stringify(e.issues, zh, 2)));
					},
				},
				isEmpty: {
					get() {
						return e.issues.length === 0;
					},
				},
			}));
	},
	Lr = re("ZodError", aC, { Parent: Error }),
	uC = am(Lr),
	lC = um(Lr),
	sC = Cc(Lr),
	oC = kc(Lr),
	cC = HT(Lr),
	fC = ZT(Lr),
	dC = PT(Lr),
	hC = QT(Lr),
	mC = KT(Lr),
	vC = YT(Lr),
	gC = GT(Lr),
	yC = FT(Lr),
	i0 = new WeakMap();
function ps(e, t, i) {
	const u = Object.getPrototypeOf(e);
	let s = i0.get(u);
	if ((s || ((s = new Set()), i0.set(u, s)), !s.has(t))) {
		s.add(t);
		for (const o in i) {
			const f = i[o];
			Object.defineProperty(u, o, {
				configurable: !0,
				enumerable: !1,
				get() {
					const h = f.bind(this);
					return (Object.defineProperty(this, o, { configurable: !0, writable: !0, enumerable: !0, value: h }), h);
				},
				set(h) {
					Object.defineProperty(this, o, { configurable: !0, writable: !0, enumerable: !0, value: h });
				},
			});
		}
	}
}
var zt = re(
		"ZodType",
		(e, t) => (
			Nt.init(e, t),
			Object.assign(e["~standard"], { jsonSchema: { input: pc(e, "input"), output: pc(e, "output") } }),
			(e.toJSONSchema = RR(e, {})),
			(e.def = t),
			(e.type = t.type),
			Object.defineProperty(e, "_def", { value: t }),
			(e.parse = (i, u) => uC(e, i, u, { callee: e.parse })),
			(e.safeParse = (i, u) => sC(e, i, u)),
			(e.parseAsync = async (i, u) => lC(e, i, u, { callee: e.parseAsync })),
			(e.safeParseAsync = async (i, u) => oC(e, i, u)),
			(e.spa = e.safeParseAsync),
			(e.encode = (i, u) => cC(e, i, u)),
			(e.decode = (i, u) => fC(e, i, u)),
			(e.encodeAsync = async (i, u) => dC(e, i, u)),
			(e.decodeAsync = async (i, u) => hC(e, i, u)),
			(e.safeEncode = (i, u) => mC(e, i, u)),
			(e.safeDecode = (i, u) => vC(e, i, u)),
			(e.safeEncodeAsync = async (i, u) => gC(e, i, u)),
			(e.safeDecodeAsync = async (i, u) => yC(e, i, u)),
			ps(e, "ZodType", {
				check(...i) {
					const u = this.def;
					return this.clone(
						pa(u, {
							checks: [
								...(u.checks ?? []),
								...i.map((s) =>
									typeof s == "function" ? { _zod: { check: s, def: { check: "custom" }, onattach: [] } } : s,
								),
							],
						}),
						{ parent: !0 },
					);
				},
				with(...i) {
					return this.check(...i);
				},
				clone(i, u) {
					return ba(this, i, u);
				},
				brand() {
					return this;
				},
				register(i, u) {
					return (i.add(this, u), this);
				},
				refine(i, u) {
					return this.check(dk(i, u));
				},
				superRefine(i, u) {
					return this.check(hk(i, u));
				},
				overwrite(i) {
					return this.check(nl(i));
				},
				optional() {
					return s0(this);
				},
				exactOptional() {
					return WC(this);
				},
				nullable() {
					return o0(this);
				},
				nullish() {
					return s0(o0(this));
				},
				nonoptional(i) {
					return ak(this, i);
				},
				array() {
					return Xa(this);
				},
				or(i) {
					return Nc([this, i]);
				},
				and(i) {
					return KC(this, i);
				},
				transform(i) {
					return c0(this, XC(i));
				},
				default(i) {
					return nk(this, i);
				},
				prefault(i) {
					return ik(this, i);
				},
				catch(i) {
					return lk(this, i);
				},
				pipe(i) {
					return c0(this, i);
				},
				readonly() {
					return ck(this);
				},
				describe(i) {
					const u = this.clone();
					return (is.add(u, { description: i }), u);
				},
				meta(...i) {
					if (i.length === 0) return is.get(this);
					const u = this.clone();
					return (is.add(u, i[0]), u);
				},
				isOptional() {
					return this.safeParse(void 0).success;
				},
				isNullable() {
					return this.safeParse(null).success;
				},
				apply(i) {
					return i(this);
				},
			}),
			Object.defineProperty(e, "description", {
				get() {
					return is.get(e)?.description;
				},
				configurable: !0,
			}),
			e
		),
	),
	Xb = re("_ZodString", (e, t) => {
		(lm.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (u, s, o) => kR(e, u, s, o)));
		const i = e._zod.bag;
		((e.format = i.format ?? null),
			(e.minLength = i.minimum ?? null),
			(e.maxLength = i.maximum ?? null),
			ps(e, "_ZodString", {
				regex(...u) {
					return this.check(dR(...u));
				},
				includes(...u) {
					return this.check(vR(...u));
				},
				startsWith(...u) {
					return this.check(gR(...u));
				},
				endsWith(...u) {
					return this.check(yR(...u));
				},
				min(...u) {
					return this.check(yc(...u));
				},
				max(...u) {
					return this.check(Pb(...u));
				},
				length(...u) {
					return this.check(Qb(...u));
				},
				nonempty(...u) {
					return this.check(yc(1, ...u));
				},
				lowercase(u) {
					return this.check(hR(u));
				},
				uppercase(u) {
					return this.check(mR(u));
				},
				trim() {
					return this.check(bR());
				},
				normalize(...u) {
					return this.check(pR(...u));
				},
				toLowerCase() {
					return this.check(_R());
				},
				toUpperCase() {
					return this.check(SR());
				},
				slugify() {
					return this.check(wR());
				},
			}));
	}),
	pC = re("ZodString", (e, t) => {
		(lm.init(e, t),
			Xb.init(e, t),
			(e.email = (i) => e.check(jA(bC, i))),
			(e.url = (i) => e.check($A(_C, i))),
			(e.jwt = (i) => e.check(tR(jC, i))),
			(e.emoji = (i) => e.check(BA(SC, i))),
			(e.guid = (i) => e.check(e0(a0, i))),
			(e.uuid = (i) => e.check(IA(Yo, i))),
			(e.uuidv4 = (i) => e.check(LA(Yo, i))),
			(e.uuidv6 = (i) => e.check(qA(Yo, i))),
			(e.uuidv7 = (i) => e.check(UA(Yo, i))),
			(e.nanoid = (i) => e.check(VA(wC, i))),
			(e.guid = (i) => e.check(e0(a0, i))),
			(e.cuid = (i) => e.check(HA(EC, i))),
			(e.cuid2 = (i) => e.check(ZA(TC, i))),
			(e.ulid = (i) => e.check(PA(xC, i))),
			(e.base64 = (i) => e.check(JA(OC, i))),
			(e.base64url = (i) => e.check(WA(zC, i))),
			(e.xid = (i) => e.check(QA(AC, i))),
			(e.ksuid = (i) => e.check(KA(RC, i))),
			(e.ipv4 = (i) => e.check(YA(CC, i))),
			(e.ipv6 = (i) => e.check(GA(kC, i))),
			(e.cidrv4 = (i) => e.check(FA(MC, i))),
			(e.cidrv6 = (i) => e.check(XA(NC, i))),
			(e.e164 = (i) => e.check(eR(DC, i))),
			(e.datetime = (i) => e.check(JR(i))),
			(e.date = (i) => e.check(eC(i))),
			(e.time = (i) => e.check(nC(i))),
			(e.duration = (i) => e.check(iC(i))));
	});
function jt(e) {
	return DA(pC, e);
}
var It = re("ZodStringFormat", (e, t) => {
		(Ot.init(e, t), Xb.init(e, t));
	}),
	bC = re("ZodEmail", (e, t) => {
		($x.init(e, t), It.init(e, t));
	}),
	a0 = re("ZodGUID", (e, t) => {
		(qx.init(e, t), It.init(e, t));
	}),
	Yo = re("ZodUUID", (e, t) => {
		(Ux.init(e, t), It.init(e, t));
	}),
	_C = re("ZodURL", (e, t) => {
		(Bx.init(e, t), It.init(e, t));
	}),
	SC = re("ZodEmoji", (e, t) => {
		(Vx.init(e, t), It.init(e, t));
	}),
	wC = re("ZodNanoID", (e, t) => {
		(Hx.init(e, t), It.init(e, t));
	}),
	EC = re("ZodCUID", (e, t) => {
		(Zx.init(e, t), It.init(e, t));
	}),
	TC = re("ZodCUID2", (e, t) => {
		(Px.init(e, t), It.init(e, t));
	}),
	xC = re("ZodULID", (e, t) => {
		(Qx.init(e, t), It.init(e, t));
	}),
	AC = re("ZodXID", (e, t) => {
		(Kx.init(e, t), It.init(e, t));
	}),
	RC = re("ZodKSUID", (e, t) => {
		(Yx.init(e, t), It.init(e, t));
	}),
	CC = re("ZodIPv4", (e, t) => {
		(Wx.init(e, t), It.init(e, t));
	}),
	kC = re("ZodIPv6", (e, t) => {
		(eA.init(e, t), It.init(e, t));
	}),
	MC = re("ZodCIDRv4", (e, t) => {
		(tA.init(e, t), It.init(e, t));
	}),
	NC = re("ZodCIDRv6", (e, t) => {
		(nA.init(e, t), It.init(e, t));
	}),
	OC = re("ZodBase64", (e, t) => {
		(rA.init(e, t), It.init(e, t));
	}),
	zC = re("ZodBase64URL", (e, t) => {
		(aA.init(e, t), It.init(e, t));
	}),
	DC = re("ZodE164", (e, t) => {
		(uA.init(e, t), It.init(e, t));
	}),
	jC = re("ZodJWT", (e, t) => {
		(sA.init(e, t), It.init(e, t));
	}),
	Jb = re("ZodNumber", (e, t) => {
		(Bb.init(e, t),
			zt.init(e, t),
			(e._zod.processJSONSchema = (u, s, o) => MR(e, u, s, o)),
			ps(e, "ZodNumber", {
				gt(u, s) {
					return this.check(n0(u, s));
				},
				gte(u, s) {
					return this.check(uh(u, s));
				},
				min(u, s) {
					return this.check(uh(u, s));
				},
				lt(u, s) {
					return this.check(t0(u, s));
				},
				lte(u, s) {
					return this.check(ah(u, s));
				},
				max(u, s) {
					return this.check(ah(u, s));
				},
				int(u) {
					return this.check(u0(u));
				},
				safe(u) {
					return this.check(u0(u));
				},
				positive(u) {
					return this.check(n0(0, u));
				},
				nonnegative(u) {
					return this.check(uh(0, u));
				},
				negative(u) {
					return this.check(t0(0, u));
				},
				nonpositive(u) {
					return this.check(ah(0, u));
				},
				multipleOf(u, s) {
					return this.check(r0(u, s));
				},
				step(u, s) {
					return this.check(r0(u, s));
				},
				finite() {
					return this;
				},
			}));
		const i = e._zod.bag;
		((e.minValue =
			Math.max(i.minimum ?? Number.NEGATIVE_INFINITY, i.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null),
			(e.maxValue =
				Math.min(i.maximum ?? Number.POSITIVE_INFINITY, i.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null),
			(e.isInt = (i.format ?? "").includes("int") || Number.isSafeInteger(i.multipleOf ?? 0.5)),
			(e.isFinite = !0),
			(e.format = i.format ?? null));
	});
function gr(e) {
	return uR(Jb, e);
}
var IC = re("ZodNumberFormat", (e, t) => {
	(oA.init(e, t), Jb.init(e, t));
});
function u0(e) {
	return lR(IC, e);
}
var LC = re("ZodBoolean", (e, t) => {
	(cA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => NR(e, i, u, s)));
});
function sm(e) {
	return sR(LC, e);
}
var qC = re("ZodUndefined", (e, t) => {
	(fA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => OR(e, i, u, s)));
});
function UC(e) {
	return oR(qC, e);
}
var $C = re("ZodUnknown", (e, t) => {
	(dA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => DR(e, i, u, s)));
});
function jh() {
	return cR($C);
}
var BC = re("ZodNever", (e, t) => {
	(hA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => zR(e, i, u, s)));
});
function VC(e) {
	return fR(BC, e);
}
var HC = re("ZodArray", (e, t) => {
	(mA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => UR(e, i, u, s)),
		(e.element = t.element),
		ps(e, "ZodArray", {
			min(i, u) {
				return this.check(yc(i, u));
			},
			nonempty(i) {
				return this.check(yc(1, i));
			},
			max(i, u) {
				return this.check(Pb(i, u));
			},
			length(i, u) {
				return this.check(Qb(i, u));
			},
			unwrap() {
				return this.element;
			},
		}));
});
function Xa(e, t) {
	return ER(HC, e, t);
}
var ZC = re("ZodObject", (e, t) => {
	(gA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => $R(e, i, u, s)),
		yt(e, "shape", () => t.shape),
		ps(e, "ZodObject", {
			keyof() {
				return YC(Object.keys(this._zod.def.shape));
			},
			catchall(i) {
				return this.clone({ ...this._zod.def, catchall: i });
			},
			passthrough() {
				return this.clone({ ...this._zod.def, catchall: jh() });
			},
			loose() {
				return this.clone({ ...this._zod.def, catchall: jh() });
			},
			strict() {
				return this.clone({ ...this._zod.def, catchall: VC() });
			},
			strip() {
				return this.clone({ ...this._zod.def, catchall: void 0 });
			},
			extend(i) {
				return zT(this, i);
			},
			safeExtend(i) {
				return DT(this, i);
			},
			merge(i) {
				return jT(this, i);
			},
			pick(i) {
				return NT(this, i);
			},
			omit(i) {
				return OT(this, i);
			},
			partial(...i) {
				return IT(e_, this, i[0]);
			},
			required(...i) {
				return LT(t_, this, i[0]);
			},
		}));
});
function jn(e, t) {
	const i = { type: "object", shape: e ?? {}, ...xe(t) };
	return new ZC(i);
}
var PC = re("ZodUnion", (e, t) => {
	(yA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => BR(e, i, u, s)), (e.options = t.options));
});
function Nc(e, t) {
	return new PC({ type: "union", options: e, ...xe(t) });
}
var QC = re("ZodIntersection", (e, t) => {
	(pA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => VR(e, i, u, s)));
});
function KC(e, t) {
	return new QC({ type: "intersection", left: e, right: t });
}
var l0 = re("ZodRecord", (e, t) => {
	(bA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => HR(e, i, u, s)),
		(e.keyType = t.keyType),
		(e.valueType = t.valueType));
});
function Wb(e, t, i) {
	return !t || !t._zod
		? new l0({ type: "record", keyType: jt(), valueType: e, ...xe(t) })
		: new l0({ type: "record", keyType: e, valueType: t, ...xe(i) });
}
var Ih = re("ZodEnum", (e, t) => {
	(_A.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (u, s, o) => jR(e, u, s, o)),
		(e.enum = t.entries),
		(e.options = Object.values(t.entries)));
	const i = new Set(Object.keys(t.entries));
	((e.extract = (u, s) => {
		const o = {};
		for (const f of u)
			if (i.has(f)) o[f] = t.entries[f];
			else throw new Error(`Key ${f} not found in enum`);
		return new Ih({ ...t, checks: [], ...xe(s), entries: o });
	}),
		(e.exclude = (u, s) => {
			const o = { ...t.entries };
			for (const f of u)
				if (i.has(f)) delete o[f];
				else throw new Error(`Key ${f} not found in enum`);
			return new Ih({ ...t, checks: [], ...xe(s), entries: o });
		}));
});
function YC(e, t) {
	const i = Array.isArray(e) ? Object.fromEntries(e.map((u) => [u, u])) : e;
	return new Ih({ type: "enum", entries: i, ...xe(t) });
}
var GC = re("ZodLiteral", (e, t) => {
	(SA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => IR(e, i, u, s)),
		(e.values = new Set(t.values)),
		Object.defineProperty(e, "value", {
			get() {
				if (t.values.length > 1)
					throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
				return t.values[0];
			},
		}));
});
function hs(e, t) {
	return new GC({ type: "literal", values: Array.isArray(e) ? e : [e], ...xe(t) });
}
var FC = re("ZodTransform", (e, t) => {
	(wA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => qR(e, i, u, s)),
		(e._zod.parse = (i, u) => {
			if (u.direction === "backward") throw new Ab(e.constructor.name);
			i.addIssue = (o) => {
				if (typeof o == "string") i.issues.push(ds(o, i.value, t));
				else {
					const f = o;
					(f.fatal && (f.continue = !1),
						f.code ?? (f.code = "custom"),
						f.input ?? (f.input = i.value),
						f.inst ?? (f.inst = e),
						i.issues.push(ds(f)));
				}
			};
			const s = t.transform(i.value, i);
			return s instanceof Promise
				? s.then((o) => ((i.value = o), (i.fallback = !0), i))
				: ((i.value = s), (i.fallback = !0), i);
		}));
});
function XC(e) {
	return new FC({ type: "transform", transform: e });
}
var e_ = re("ZodOptional", (e, t) => {
	(Zb.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => Fb(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function s0(e) {
	return new e_({ type: "optional", innerType: e });
}
var JC = re("ZodExactOptional", (e, t) => {
	(EA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => Fb(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function WC(e) {
	return new JC({ type: "optional", innerType: e });
}
var ek = re("ZodNullable", (e, t) => {
	(TA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => ZR(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function o0(e) {
	return new ek({ type: "nullable", innerType: e });
}
var tk = re("ZodDefault", (e, t) => {
	(xA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => QR(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeDefault = e.unwrap));
});
function nk(e, t) {
	return new tk({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : kb(t);
		},
	});
}
var rk = re("ZodPrefault", (e, t) => {
	(AA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => KR(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function ik(e, t) {
	return new rk({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : kb(t);
		},
	});
}
var t_ = re("ZodNonOptional", (e, t) => {
	(RA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => PR(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function ak(e, t) {
	return new t_({ type: "nonoptional", innerType: e, ...xe(t) });
}
var uk = re("ZodCatch", (e, t) => {
	(CA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => YR(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeCatch = e.unwrap));
});
function lk(e, t) {
	return new uk({ type: "catch", innerType: e, catchValue: typeof t == "function" ? t : () => t });
}
var sk = re("ZodPipe", (e, t) => {
	(kA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => GR(e, i, u, s)),
		(e.in = t.in),
		(e.out = t.out));
});
function c0(e, t) {
	return new sk({ type: "pipe", in: e, out: t });
}
var ok = re("ZodReadonly", (e, t) => {
	(MA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => FR(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function ck(e) {
	return new ok({ type: "readonly", innerType: e });
}
var fk = re("ZodCustom", (e, t) => {
	(NA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => LR(e, i, u, s)));
});
function dk(e, t = {}) {
	return TR(fk, e, t);
}
function hk(e, t) {
	return xR(e, t);
}
var _ = hb(Rc()),
	mk = TT(),
	Pu = ["thumbs_up", "heart", "laugh", "wow", "sad", "party", "rocket", "eyes"],
	n_ = { thumbs_up: "👍", heart: "❤️", laugh: "😂", wow: "😮", sad: "😢", party: "🎉", rocket: "🚀", eyes: "👀" },
	r_ = {
		thumbs_up: "Thumbs up",
		heart: "Heart",
		laugh: "Laugh",
		wow: "Wow",
		sad: "Sad",
		party: "Party",
		rocket: "Rocket",
		eyes: "Eyes",
	},
	vk = 9999999999999,
	gk = /(?:^|:)(\d{13}):([^:]{1,16})$/;
function Ja(e) {
	const t = gk.exec(e);
	return t ? vk - Number(t[1]) : null;
}
var i_ = "p/",
	yk = /^p\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/u,
	Lh = ["channels", "messages", "replies", "reactions"],
	om =
		"Only the people added here can read it — and the organization owner, who can read everything in this workspace.";
function pk(e) {
	const t = crypto.randomUUID();
	return e === "private" ? `${i_}${t}` : t;
}
function yn(e) {
	return e.startsWith(i_);
}
function bk(e) {
	return yk.test(e);
}
function Go(e) {
	return `${e}:`;
}
function cm(e) {
	const t = e.split(":");
	return t.length < 3 || Ja(e) === null ? null : t.slice(0, -2).join(":");
}
function a_(e) {
	return `${e}:`;
}
function _k(e) {
	const t = e.split(":");
	if (t.length < 4) return null;
	const i = t[t.length - 2];
	if (!Pu.includes(i)) return null;
	const u = t.slice(0, -2).join(":");
	return Ja(u) === null ? null : { targetKey: u, token: i, keyTailUserId: t[t.length - 1] };
}
function ms(e) {
	const t = e.split(":");
	if (t.length < 5) return null;
	const i = t.slice(0, -2).join(":");
	return Ja(i) === null || Ja(e) === null ? null : i;
}
function bc(e) {
	const t = e.split(":");
	return t.length === 3 ? (Ja(e) === null ? null : e) : t.length === 5 ? ms(e) : null;
}
function f0(e) {
	return `me:${e}`;
}
function d0(e) {
	return `${e}:read`;
}
function Sk(e) {
	const t = e.split(":");
	return t.length !== 3 || t[1] !== "read" || !yn(t[0]) ? null : { channelKey: t[0], keyTailUserId: t[2] };
}
var wk = jn({ name: jt().min(1).max(64), archivedAt: gr().nullable(), topic: jt().max(250).optional() }),
	Ek = jn({ fileNodeId: jt().min(1), name: jt().min(1) }),
	Tk = jn({
		text: jt(),
		attachments: Xa(Ek),
		editedAt: gr().nullable(),
		deletedAt: gr().nullable(),
		mentions: Xa(jt()).optional(),
	}),
	xk = "Someone with no name yet";
function uc(e) {
	return e !== null && e !== "" ? e : xk;
}
function Ak(e, t) {
	const i = /(?:^|\s)@([^\s@]*)$/.exec(e.slice(0, t));
	if (i === null) return null;
	const u = i[1] ?? "";
	return { start: t - u.length - 1, query: u };
}
function Rk(e, t, i) {
	const u = t.toLowerCase();
	return e
		.filter((s) => s.userId !== i)
		.map((s) => ({ ...s, label: uc(s.displayName) }))
		.filter((s) => s.label.toLowerCase().includes(u))
		.sort((s, o) => s.label.localeCompare(o.label));
}
function Ck(e, t, i, u) {
	return { text: `${e.slice(0, t)}@${u} ${e.slice(i)}`, caret: t + u.length + 2 };
}
function kk(e, t) {
	const i = [];
	for (const [u, s] of e) t.includes(`@${s}`) && i.push(u);
	return i;
}
function u_(e) {
	return e === "not_consented"
		? "This workspace has not allowed Chitchat to read the member list yet. An admin can accept the plugin's current permissions."
		: "The member list is not available right now. You can keep typing.";
}
var Mk = jn({ channels: Wb(jt(), gr()) }),
	Nk = jn({
		messages: gr().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
		replies: gr().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
	}),
	Ok = Nc([
		jn({ at: gr(), activity: Nk }),
		jn({ at: gr(), activity: UC().optional() }).transform((e) => ({ at: e.at, activity: { messages: 0, replies: 0 } })),
	]),
	iu = jn({
		collection: jt(),
		key: jt().min(1).max(128),
		value: Wb(jt(), jh()),
		revision: gr(),
		createdBy: jt().min(1),
		updatedBy: jt(),
		ownership: Nc([hs("shared"), hs("owned")]),
		createdAt: gr(),
		updatedAt: gr(),
	});
function zk(e, t) {
	const i = iu.safeParse(e);
	if (!i.success) return null;
	const u = Ja(i.data.key);
	if (u === null) return null;
	const s = t.safeParse(i.data.value);
	return s.success
		? {
				key: i.data.key,
				value: s.data,
				revision: i.data.revision,
				createdBy: i.data.createdBy,
				updatedBy: i.data.updatedBy,
				createdAt: i.data.createdAt,
				updatedAt: i.data.updatedAt,
				timestamp: u,
			}
		: null;
}
function ns(e) {
	const t = iu.safeParse(e);
	if (!t.success) return null;
	const i = wk.safeParse(t.data.value);
	return i.success
		? {
				key: t.data.key,
				value: i.data,
				revision: t.data.revision,
				createdBy: t.data.createdBy,
				updatedBy: t.data.updatedBy,
				createdAt: t.data.createdAt,
				updatedAt: t.data.updatedAt,
				timestamp: t.data.createdAt,
			}
		: null;
}
function _c(e) {
	return zk(e, Tk);
}
var Dk = jn({ removed: hs(!0).optional() });
function jk(e) {
	const t = iu.safeParse(e);
	if (!t.success) return null;
	const i = _k(t.data.key);
	if (i === null) return null;
	const u = Dk.safeParse(t.data.value);
	return u.success
		? {
				key: t.data.key,
				targetKey: i.targetKey,
				token: i.token,
				createdBy: t.data.createdBy,
				revision: t.data.revision,
				updatedAt: t.data.updatedAt,
				removed: u.data.removed === !0,
			}
		: null;
}
function Ik(e) {
	const t = iu.safeParse(e);
	if (!t.success) return null;
	const i = Mk.safeParse(t.data.value);
	return i.success
		? {
				key: t.data.key,
				value: i.data,
				revision: t.data.revision,
				createdBy: t.data.createdBy,
				updatedBy: t.data.updatedBy,
				createdAt: t.data.createdAt,
				updatedAt: t.data.updatedAt,
				ownership: t.data.ownership,
				timestamp: t.data.createdAt,
			}
		: null;
}
function h0(e) {
	const t = iu.safeParse(e);
	if (!t.success || t.data.ownership !== "owned") return null;
	const i = Sk(t.data.key);
	if (i === null) return null;
	const u = Ok.safeParse(t.data.value);
	return u.success
		? {
				key: t.data.key,
				channelKey: i.channelKey,
				createdBy: t.data.createdBy,
				at: u.data.at,
				activity: u.data.activity,
				revision: t.data.revision,
			}
		: null;
}
function Ha(e, t) {
	const i = { ...e.channels };
	for (const [u, s] of Object.entries(t.channels)) {
		const o = i[u];
		i[u] = o === void 0 ? s : Math.max(o, s);
	}
	return { channels: i };
}
function Lk(e) {
	const t = new Map();
	for (const i of e.docs) {
		const u = cm(i.key);
		if (u === null || yn(u) || i.value.deletedAt !== null || i.createdBy === e.selfUserId) continue;
		const s = e.cursorChannels[u];
		if (s !== void 0 && i.timestamp <= s) continue;
		const o = i.value.mentions?.includes(e.selfUserId) ? 1 : 0,
			f = t.get(u);
		f === void 0
			? t.set(u, { unreadCount: 1, mentionCount: o, latest: i })
			: ((f.unreadCount += 1), (f.mentionCount += o), i.timestamp > f.latest.timestamp && (f.latest = i));
	}
	return t;
}
function Oc(e, t) {
	const i = t - e;
	return i < 6e4
		? "just now"
		: i < 60 * 6e4
			? `${Math.floor(i / 6e4)}m ago`
			: i < 1440 * 6e4
				? `${Math.floor(i / (60 * 6e4))}h ago`
				: i < 10080 * 6e4
					? new Date(e).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" })
					: new Date(e).toLocaleDateString(void 0, { year: "numeric", month: "short", day: "numeric" });
}
var Fo = jn({ document: iu.nullable() }),
	qk = jn({
		path: jt(),
		name: jt(),
		kind: Nc([hs("file"), hs("folder")]),
		nodeId: jt(),
		contentType: jt().nullable(),
		updatedAt: gr(),
	}),
	Uk = jn({ items: Xa(qk), cursor: jt().nullable(), isDone: sm() }),
	l_ = jn({ documents: Xa(iu), cursor: jt().nullable(), isDone: sm() }),
	$k = jn({
		items: Xa(jn({ fileNodeId: jt(), url: jt(), expiresAt: gr() })),
		errors: Xa(jn({ fileNodeId: jt(), message: jt() })),
		truncated: sm(),
	});
function zn(e) {
	return e instanceof Error ? e.message : String(e);
}
function lh(e) {
	const t = new Map();
	let i = 0;
	const u = (o) => {
		const f = t.get(o.key);
		(f === void 0 || o.revision >= f.revision) && t.set(o.key, o);
	};
	return {
		apply_window: (o) => {
			const f = [];
			for (const h of o) {
				const m = e(h);
				if (m === null) {
					i += 1;
					continue;
				}
				(f.push(m), u(m));
			}
			return f;
		},
		apply_local: u,
		get_sorted() {
			return [...t.values()].sort((o, f) => (o.key < f.key ? -1 : o.key > f.key ? 1 : 0));
		},
		dropped_count: () => i,
	};
}
function lc(e) {
	let t = [],
		i = 0;
	return {
		apply_window(u) {
			const s = [];
			for (const o of u) {
				const f = e(o);
				if (f === null) {
					i += 1;
					continue;
				}
				s.push(f);
			}
			return ((t = s), s);
		},
		get_all: () => t,
		dropped_count: () => i,
	};
}
function Bk(e, t) {
	const i = new Map();
	for (const s of e) {
		if (s.removed) continue;
		let o = i.get(s.targetKey);
		o === void 0 && ((o = new Map()), i.set(s.targetKey, o));
		let f = o.get(s.token);
		(f === void 0 && ((f = new Set()), o.set(s.token, f)), f.add(s.createdBy));
	}
	const u = new Map();
	for (const [s, o] of i) {
		const f = [];
		for (const h of Pu) {
			const m = o.get(h);
			m === void 0 || m.size === 0 || f.push({ token: h, count: m.size, reactedByMe: m.has(t) });
		}
		u.set(s, f);
	}
	return u;
}
function Vk(e) {
	const t = new Map();
	for (const i of e) {
		const u = ms(i.key);
		if (u === null) continue;
		const s = t.get(u);
		s === void 0
			? t.set(u, { count: 1, latestAt: i.timestamp })
			: ((s.count += 1), (s.latestAt = Math.max(s.latestAt, i.timestamp)));
	}
	return t;
}
function Hk(e, t) {
	return e > 99 && t ? "99+" : String(e);
}
var Zk = 3,
	Pk = 5e3,
	Qk = 3e4,
	Kk = "This message is too long to send. Shorten it and try again.",
	Yk = "Sending too fast — wait a moment and try again.";
function Gk(e) {
	return new TextEncoder().encode(JSON.stringify(e)).byteLength > Qk;
}
function Fk(e) {
	return new Promise((t) => setTimeout(t, e));
}
async function Ya(e, t, i) {
	try {
		for (let u = 1; ; u += 1) {
			const s = await e.backend.invoke({ endpoint: t, input: i });
			if ("_nay" in s) {
				if (s._nay.name === "busy" && u < Zk) {
					await Fk(Math.min(s._nay.retryAfterMs ?? 1e3, Pk));
					continue;
				}
				return s._nay.name === "busy"
					? { _nay: { name: "busy", message: Yk } }
					: { _nay: { name: s._nay.name, message: s._nay.message } };
			}
			let o = null;
			try {
				o = JSON.parse(s._yay.output);
			} catch {
				o = null;
			}
			const f = typeof o == "object" && o !== null ? o : {};
			if (s._yay.pluginStatus >= 200 && s._yay.pluginStatus < 300) return { _yay: f };
			const h =
				typeof f.message == "string" && f.message !== ""
					? f.message
					: `The Chitchat backend refused this call (${s._yay.pluginStatus})`;
			return {
				_nay: {
					name: s._yay.pluginStatus === 409 ? "conflict" : s._yay.pluginStatus === 413 ? "too_large" : "refused",
					message: h,
				},
			};
		}
	} catch (u) {
		return { _nay: { name: "unavailable", message: zn(u) } };
	}
}
var Xk = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
	Jk = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (t, i, u) => (u ? u.toUpperCase() : i.toLowerCase())),
	m0 = (e) => {
		const t = Jk(e);
		return t.charAt(0).toUpperCase() + t.slice(1);
	},
	s_ = (...e) =>
		e
			.filter((t, i, u) => !!t && t.trim() !== "" && u.indexOf(t) === i)
			.join(" ")
			.trim(),
	Wk = (e) => {
		for (const t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	},
	eM = {
		xmlns: "http://www.w3.org/2000/svg",
		width: 24,
		height: 24,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round",
	},
	tM = (0, _.forwardRef)(
		(
			{
				color: e = "currentColor",
				size: t = 24,
				strokeWidth: i = 2,
				absoluteStrokeWidth: u,
				className: s = "",
				children: o,
				iconNode: f,
				...h
			},
			m,
		) =>
			(0, _.createElement)(
				"svg",
				{
					ref: m,
					...eM,
					width: t,
					height: t,
					stroke: e,
					strokeWidth: u ? (Number(i) * 24) / Number(t) : i,
					className: s_("lucide", s),
					...(!o && !Wk(h) && { "aria-hidden": "true" }),
					...h,
				},
				[...f.map(([v, g]) => (0, _.createElement)(v, g)), ...(Array.isArray(o) ? o : [o])],
			),
	),
	fm = (e, t) => {
		const i = (0, _.forwardRef)(({ className: u, ...s }, o) =>
			(0, _.createElement)(tM, { ref: o, iconNode: t, className: s_(`lucide-${Xk(m0(e))}`, `lucide-${e}`, u), ...s }),
		);
		return ((i.displayName = m0(e)), i);
	},
	nM = [
		["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
		["path", { d: "M12 19V5", key: "x0mq9r" }],
	],
	rM = fm("arrow-up", nM),
	iM = [
		["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
		["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
		["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
	],
	aM = fm("ellipsis", iM),
	uM = [
		[
			"path",
			{
				d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
				key: "1miecu",
			},
		],
	],
	lM = fm("paperclip", uM),
	rl = sM();
function sM() {
	var e;
	return typeof window < "u" && !!((e = window.document) != null && e.createElement);
}
function xt(e) {
	return e ? ("self" in e ? e.document : e.ownerDocument || document) : document;
}
function o_(e) {
	return e ? ("self" in e ? e.self : xt(e).defaultView || window) : self;
}
function Di(e, t = !1) {
	const { activeElement: i } = xt(e);
	if (!i?.nodeName) return null;
	if (dm(i) && i.contentDocument) return Di(i.contentDocument.body, t);
	if (t) {
		const u = i.getAttribute("aria-activedescendant");
		if (u) {
			const s = xt(i).getElementById(u);
			if (s) return s;
		}
	}
	return i;
}
function mn(e, t) {
	return e === t || e.contains(t);
}
function dm(e) {
	return e.tagName === "IFRAME";
}
function ma(e) {
	const t = e.tagName.toLowerCase();
	return t === "button" ? !0 : t === "input" && e.type ? oM.indexOf(e.type) !== -1 : !1;
}
var oM = ["button", "color", "file", "image", "reset", "submit"];
function c_(e) {
	if (typeof e.checkVisibility == "function") return e.checkVisibility();
	const t = e;
	return t.offsetWidth > 0 || t.offsetHeight > 0 || e.getClientRects().length > 0;
}
function ii(e) {
	try {
		const t = e instanceof HTMLInputElement && e.selectionStart !== null,
			i = e.tagName === "TEXTAREA";
		return t || i || !1;
	} catch {
		return !1;
	}
}
function qh(e) {
	return e.isContentEditable || ii(e);
}
function cM(e) {
	if (ii(e)) return e.value;
	if (e.isContentEditable) {
		const t = xt(e).createRange();
		return (t.selectNodeContents(e), t.toString());
	}
	return "";
}
function Uh(e) {
	let t = 0,
		i = 0;
	if (ii(e)) ((t = e.selectionStart || 0), (i = e.selectionEnd || 0));
	else if (e.isContentEditable) {
		const u = xt(e).getSelection();
		if (u?.rangeCount && u.anchorNode && mn(e, u.anchorNode) && u.focusNode && mn(e, u.focusNode)) {
			const s = u.getRangeAt(0),
				o = s.cloneRange();
			(o.selectNodeContents(e),
				o.setEnd(s.startContainer, s.startOffset),
				(t = o.toString().length),
				o.setEnd(s.endContainer, s.endOffset),
				(i = o.toString().length));
		}
	}
	return { start: t, end: i };
}
function zc(e, t) {
	const i = ["dialog", "menu", "listbox", "tree", "grid"],
		u = e?.getAttribute("role");
	return u && i.indexOf(u) !== -1 ? u : t;
}
function f_(e, t) {
	var i;
	const u = { menu: "menuitem", listbox: "option", tree: "treeitem" },
		s = zc(e);
	return s && (i = u[s]) != null ? i : t;
}
function hm(e) {
	if (!e) return null;
	const t = (i) => i === "auto" || i === "scroll";
	if (e.clientHeight && e.scrollHeight > e.clientHeight) {
		const { overflowY: i } = getComputedStyle(e);
		if (t(i)) return e;
	} else if (e.clientWidth && e.scrollWidth > e.clientWidth) {
		const { overflowX: i } = getComputedStyle(e);
		if (t(i)) return e;
	}
	return hm(e.parentElement) || document.scrollingElement || document.body;
}
function sh(e, ...t) {
	/text|search|password|tel|url/i.test(e.type) && e.setSelectionRange(...t);
}
function d_(e, t) {
	const i = e.map((s, o) => [o, s]);
	let u = !1;
	return (
		i.sort(([s, o], [f, h]) => {
			const m = t(o),
				v = t(h);
			return m === v || !m || !v ? 0 : fM(m, v) ? (s > f && (u = !0), -1) : (s < f && (u = !0), 1);
		}),
		u ? i.map(([s, o]) => o) : e
	);
}
function fM(e, t) {
	return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
var dM = { id: null };
function hM(e, t, i = !1) {
	const u = e.findIndex((s) => s.id === t);
	return [...e.slice(u + 1), ...(i ? [dM] : []), ...e.slice(0, u)];
}
function mM(e, t) {
	return e.find((i) => (t ? !i.disabled && i.id !== t : !i.disabled));
}
function da(e, t) {
	return (t && e.item(t)) || null;
}
function vM(e) {
	const t = [];
	for (const i of e) {
		const u = t.find((s) => {
			var o;
			return ((o = s[0]) == null ? void 0 : o.rowId) === i.rowId;
		});
		u ? u.push(i) : t.push([i]);
	}
	return t;
}
function gM(e, t = !1) {
	if (ii(e)) e.setSelectionRange(t ? e.value.length : 0, e.value.length);
	else if (e.isContentEditable) {
		const i = xt(e).getSelection();
		(i?.selectAllChildren(e), t && i?.collapseToEnd());
	}
}
var $h = Symbol("FOCUS_SILENTLY");
function yM(e) {
	((e[$h] = !0), e.focus({ preventScroll: !0 }));
}
function pM(e) {
	const t = e[$h];
	return (delete e[$h], t);
}
function ls(e, t, i) {
	if (!t || t === i) return !1;
	const u = e.item(t.id);
	return !(!u || (i && u.element === i));
}
function ss(...e) {}
function h_(e, t) {
	return bM(e) ? e(_M(t) ? t() : t) : e;
}
function bM(e) {
	return typeof e == "function";
}
function _M(e) {
	return typeof e == "function";
}
function zi(e, t) {
	return typeof Object.hasOwn == "function" ? Object.hasOwn(e, t) : Object.prototype.hasOwnProperty.call(e, t);
}
function rr(...e) {
	return (...t) => {
		for (const i of e) typeof i == "function" && i(...t);
	};
}
function m_(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function SM(e, t) {
	const i = { ...e };
	for (const u of t) zi(i, u) && delete i[u];
	return i;
}
function wM(e, t) {
	const i = {};
	for (const u of t) zi(e, u) && (i[u] = e[u]);
	return i;
}
function v_(e) {
	return e;
}
function Jt(e, t) {
	if (!e) throw typeof t != "string" ? new Error("Invariant failed") : new Error(t);
}
function EM(e) {
	return Object.keys(e);
}
function Dc(e, ...t) {
	const i = typeof e == "function" ? e(...t) : e;
	return i == null ? !1 : !i;
}
function bs(e) {
	return e.disabled || e["aria-disabled"] === !0 || e["aria-disabled"] === "true";
}
function au(e) {
	const t = {};
	for (const i in e) e[i] !== void 0 && (t[i] = e[i]);
	return t;
}
function Ie(...e) {
	for (const t of e) if (t !== void 0) return t;
}
function Bh(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function TM(e) {
	return !e || !(0, _.isValidElement)(e) ? !1 : "ref" in e.props || "ref" in e;
}
function xM(e) {
	return TM(e) ? { ...e.props }.ref || e.ref : null;
}
function AM(e, t) {
	const i = { ...e };
	for (const u in t) {
		if (!zi(t, u)) continue;
		if (u === "className") {
			const o = "className";
			i[o] = e[o] ? `${e[o]} ${t[o]}` : t[o];
			continue;
		}
		if (u === "style") {
			const o = "style";
			i[o] = e[o] ? { ...e[o], ...t[o] } : t[o];
			continue;
		}
		const s = t[u];
		if (typeof s == "function" && u.startsWith("on")) {
			const o = e[u];
			if (typeof o == "function") {
				i[u] = (...f) => {
					(s(...f), o(...f));
				};
				continue;
			}
		}
		i[u] = s;
	}
	return i;
}
function g_() {
	return rl && !!navigator.maxTouchPoints;
}
function mm() {
	return rl ? /mac|iphone|ipad|ipod/i.test(navigator.platform) : !1;
}
function jc() {
	return rl && mm() && /apple/i.test(navigator.vendor);
}
function RM() {
	return rl && /firefox\//i.test(navigator.userAgent);
}
function CM() {
	return rl && navigator.platform.startsWith("Mac") && !g_();
}
function y_(e) {
	return !!(e.currentTarget && !mn(e.currentTarget, e.target));
}
function vr(e) {
	return e.target === e.currentTarget;
}
function p_(e) {
	const t = e.currentTarget;
	if (!t) return !1;
	const i = mm();
	if ((i && !e.metaKey) || (!i && !e.ctrlKey)) return !1;
	const u = t.tagName.toLowerCase();
	return u === "a" || (u === "button" && t.type === "submit") || (u === "input" && t.type === "submit");
}
function b_(e) {
	const t = e.currentTarget;
	if (!t) return !1;
	const i = t.tagName.toLowerCase();
	return e.altKey ? i === "a" || (i === "button" && t.type === "submit") || (i === "input" && t.type === "submit") : !1;
}
function kM(e, t, i) {
	const u = new Event(t, i);
	return e.dispatchEvent(u);
}
function $u(e, t) {
	const i = new FocusEvent("blur", t),
		u = e.dispatchEvent(i),
		s = { ...t, bubbles: !0 };
	return (e.dispatchEvent(new FocusEvent("focusout", s)), u);
}
function MM(e, t, i) {
	const u = new KeyboardEvent(t, i);
	return e.dispatchEvent(u);
}
function v0(e, t) {
	const i = new MouseEvent("click", t);
	return e.dispatchEvent(i);
}
function Pa(e, t) {
	const i = t || e.currentTarget,
		u = e.relatedTarget;
	return !u || !mn(i, u);
}
function Yu(e, t, i, u) {
	const o = ((h) => {
			if (u) {
				const v = setTimeout(h, u);
				return () => clearTimeout(v);
			}
			const m = requestAnimationFrame(h);
			return () => cancelAnimationFrame(m);
		})(() => {
			(e.removeEventListener(t, f, !0), i());
		}),
		f = () => {
			(o(), i());
		};
	return (e.addEventListener(t, f, { once: !0, capture: !0 }), o);
}
function Rn(e, t, i, u = window) {
	const s = [];
	try {
		u.document.addEventListener(e, t, i);
		for (const f of Array.from(u.frames)) s.push(Rn(e, t, i, f));
	} catch {}
	return () => {
		try {
			u.document.removeEventListener(e, t, i);
		} catch {}
		for (const f of s) f();
	};
}
var vm = { ..._ },
	g0 = vm.useId,
	qD = vm.useDeferredValue,
	y0 = vm.useInsertionEffect,
	ot = rl ? _.useLayoutEffect : _.useEffect;
function NM(e) {
	const [t] = (0, _.useState)(e);
	return t;
}
function __(e) {
	const t = (0, _.useRef)(e);
	return (
		ot(() => {
			t.current = e;
		}),
		t
	);
}
function De(e) {
	const t = (0, _.useRef)(() => {
		throw new Error("Cannot call an event handler while rendering.");
	});
	return (
		y0
			? y0(() => {
					t.current = e;
				})
			: (t.current = e),
		(0, _.useCallback)((...i) => {
			var u;
			return (u = t.current) == null ? void 0 : u.call(t, ...i);
		}, [])
	);
}
function OM(e) {
	const [t, i] = (0, _.useState)(null);
	return (
		ot(() => {
			if (t == null || !e) return;
			let u = null;
			return (
				e((s) => ((u = s), t)),
				() => {
					e(u);
				}
			);
		}, [t, e]),
		[t, i]
	);
}
function Wt(...e) {
	return (0, _.useMemo)(() => {
		if (e.some(Boolean))
			return (t) => {
				for (const i of e) Bh(i, t);
			};
	}, e);
}
function ji(e) {
	if (g0) {
		const u = g0();
		return e || u;
	}
	const [t, i] = (0, _.useState)(e);
	return (
		ot(() => {
			if (e || t) return;
			const u = Math.random().toString(36).slice(2, 8);
			i(`id-${u}`);
		}, [e, t]),
		e || t
	);
}
function S_(e, t) {
	const i = (o) => {
			if (typeof o == "string") return o;
		},
		[u, s] = (0, _.useState)(() => i(t));
	return (
		ot(() => {
			const o = e && "current" in e ? e.current : e;
			s(o?.tagName.toLowerCase() || i(t));
		}, [e, t]),
		u
	);
}
function zM(e, t, i) {
	const u = NM(i),
		[s, o] = (0, _.useState)(u);
	return (
		(0, _.useEffect)(() => {
			const f = e && "current" in e ? e.current : e;
			if (!f) return;
			const h = () => {
					const v = f.getAttribute(t);
					o(v ?? u);
				},
				m = new MutationObserver(h);
			return (m.observe(f, { attributeFilter: [t] }), h(), () => m.disconnect());
		}, [e, t, u]),
		s
	);
}
function il(e, t) {
	const i = (0, _.useRef)(!1);
	((0, _.useEffect)(() => {
		if (i.current) return e();
		i.current = !0;
	}, t),
		(0, _.useEffect)(
			() => () => {
				i.current = !1;
			},
			[],
		));
}
function DM(e, t) {
	const i = (0, _.useRef)(!1);
	(ot(() => {
		if (i.current) return e();
		i.current = !0;
	}, t),
		ot(
			() => () => {
				i.current = !1;
			},
			[],
		));
}
function w_() {
	return (0, _.useReducer)(() => [], []);
}
function Mt(e) {
	return De(typeof e == "function" ? e : () => e);
}
function Cn(e, t, i = []) {
	const u = (0, _.useCallback)((s) => (e.wrapElement && (s = e.wrapElement(s)), t(s)), [...i, e.wrapElement]);
	return { ...e, wrapElement: u };
}
function gm(e = !1, t) {
	const [i, u] = (0, _.useState)(null);
	return { portalRef: Wt(u, t), portalNode: i, domReady: !e || i };
}
function E_(e, t, i) {
	const u = e.onLoadedMetadataCapture,
		s = (0, _.useMemo)(() => Object.assign(() => {}, { ...u, [t]: i }), [u, t, i]);
	return [u?.[t], { onLoadedMetadataCapture: s }];
}
var p0 = !1;
function ym() {
	return (
		(0, _.useEffect)(() => {
			p0 ||
				(Rn("mousemove", IM, !0),
				Rn("mousedown", Xo, !0),
				Rn("mouseup", Xo, !0),
				Rn("keydown", Xo, !0),
				Rn("scroll", Xo, !0),
				(p0 = !0));
		}, []),
		De(() => pm)
	);
}
var pm = !1,
	b0 = 0,
	_0 = 0;
function jM(e) {
	const t = e.movementX || e.screenX - b0,
		i = e.movementY || e.screenY - _0;
	return ((b0 = e.screenX), (_0 = e.screenY), t || i || !1);
}
function IM(e) {
	jM(e) && (pm = !0);
}
function Xo() {
	pm = !1;
}
var LM = Ir((e) => {
		var t = Symbol.for("react.transitional.element"),
			i = Symbol.for("react.fragment");
		function u(s, o, f) {
			var h = null;
			if ((f !== void 0 && (h = "" + f), o.key !== void 0 && (h = "" + o.key), "key" in o)) {
				f = {};
				for (var m in o) m !== "key" && (f[m] = o[m]);
			} else f = o;
			return ((o = f.ref), { $$typeof: t, type: s, key: h, ref: o !== void 0 ? o : null, props: f });
		}
		((e.Fragment = i), (e.jsx = u), (e.jsxs = u));
	}),
	qM = Ir((e, t) => {
		t.exports = LM();
	}),
	w = qM();
function Fe(e) {
	const t = _.forwardRef((i, u) => e({ ...i, ref: u }));
	return ((t.displayName = e.displayName || e.name), t);
}
function Ic(e, t) {
	return _.memo(e, t);
}
function We(e, t) {
	const { wrapElement: i, render: u, ...s } = t,
		o = Wt(t.ref, xM(u));
	let f;
	if (_.isValidElement(u)) {
		const h = { ...u.props, ref: o };
		f = _.cloneElement(u, AM(s, h));
	} else u ? (f = u(s)) : (f = (0, w.jsx)(e, { ...s }));
	return i ? i(f) : f;
}
function tt(e) {
	const t = (i = {}) => e(i);
	return ((t.displayName = e.name), t);
}
function ai(e = [], t = []) {
	const i = _.createContext(void 0),
		u = _.createContext(void 0),
		s = () => _.useContext(i),
		o = (v = !1) => {
			const g = _.useContext(u),
				S = s();
			return v ? g : g || S;
		},
		f = () => {
			const v = _.useContext(u),
				g = s();
			if (!(v && v === g)) return g;
		},
		h = (v) => e.reduceRight((g, S) => (0, w.jsx)(S, { ...v, children: g }), (0, w.jsx)(i.Provider, { ...v }));
	return {
		context: i,
		scopedContext: u,
		useContext: s,
		useScopedContext: o,
		useProviderContext: f,
		ContextProvider: h,
		ScopedContextProvider: (v) =>
			(0, w.jsx)(h, {
				...v,
				children: t.reduceRight((g, S) => (0, w.jsx)(S, { ...v, children: g }), (0, w.jsx)(u.Provider, { ...v })),
			}),
	};
}
var _s = ai(),
	UM = _s.useContext,
	UD = _s.useScopedContext,
	$D = _s.useProviderContext,
	$M = _s.ContextProvider,
	BM = _s.ScopedContextProvider,
	Ss = ai([$M], [BM]),
	Lc = Ss.useContext,
	BD = Ss.useScopedContext,
	VM = Ss.useProviderContext,
	ws = Ss.ContextProvider,
	qc = Ss.ScopedContextProvider,
	HM = (0, _.createContext)(void 0),
	ZM = (0, _.createContext)(void 0),
	T_ = (0, _.createContext)(!0),
	Uc =
		"input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], summary, iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])";
function PM(e) {
	return Number.parseInt(e.getAttribute("tabindex") || "0", 10) < 0;
}
function Qr(e) {
	return !(!e.matches(Uc) || !c_(e) || e.closest("[inert]"));
}
function el(e) {
	if (!Qr(e) || PM(e)) return !1;
	if (!("form" in e) || !e.form || e.checked || e.type !== "radio") return !0;
	const t = e.form.elements.namedItem(e.name);
	if (!t || !("length" in t)) return !0;
	const i = Di(e);
	return !i || i === e || !("form" in i) || i.form !== e.form || i.name !== e.name;
}
function bm(e, t) {
	const i = Array.from(e.querySelectorAll(Uc));
	t && i.unshift(e);
	const u = i.filter(Qr);
	return (
		u.forEach((s, o) => {
			if (dm(s) && s.contentDocument) {
				const f = s.contentDocument.body;
				u.splice(o, 1, ...bm(f));
			}
		}),
		u
	);
}
function $c(e, t, i) {
	const u = Array.from(e.querySelectorAll(Uc)),
		s = u.filter(el);
	return (
		t && el(e) && s.unshift(e),
		s.forEach((o, f) => {
			if (dm(o) && o.contentDocument) {
				const h = o.contentDocument.body,
					m = $c(h, !1, i);
				s.splice(f, 1, ...m);
			}
		}),
		!s.length && i ? u : s
	);
}
function QM(e, t, i) {
	const [u] = $c(e, t, i);
	return u || null;
}
function KM(e, t, i, u) {
	const s = Di(e),
		o = bm(e, t),
		f = o.indexOf(s),
		h = o.slice(f + 1);
	return h.find(el) || (i ? o.find(el) : null) || (u ? h[0] : null) || null;
}
function oh(e, t) {
	return KM(document.body, !1, e, t);
}
function YM(e, t, i, u) {
	const s = Di(e),
		o = bm(e, t).reverse(),
		f = o.indexOf(s),
		h = o.slice(f + 1);
	return h.find(el) || (i ? o.find(el) : null) || (u ? h[0] : null) || null;
}
function S0(e, t) {
	return YM(document.body, !1, e, t);
}
function GM(e) {
	for (; e && !Qr(e); ) e = e.closest(Uc);
	return e || null;
}
function Wa(e) {
	const t = Di(e);
	if (!t) return !1;
	if (t === e) return !0;
	const i = t.getAttribute("aria-activedescendant");
	return i ? i === e.id : !1;
}
function ha(e) {
	const t = Di(e);
	if (!t) return !1;
	if (mn(e, t)) return !0;
	const i = t.getAttribute("aria-activedescendant");
	return !i || !("id" in e) ? !1 : i === e.id ? !0 : !!e.querySelector(`#${CSS.escape(i)}`);
}
function x_(e) {
	!ha(e) && Qr(e) && e.focus();
}
function FM(e) {
	var t;
	const i = (t = e.getAttribute("tabindex")) != null ? t : "";
	(e.setAttribute("data-tabindex", i), e.setAttribute("tabindex", "-1"));
}
function XM(e, t) {
	const i = $c(e, t);
	for (const u of i) FM(u);
}
function JM(e) {
	const t = e.querySelectorAll("[data-tabindex]"),
		i = (u) => {
			const s = u.getAttribute("data-tabindex");
			(u.removeAttribute("data-tabindex"), s ? u.setAttribute("tabindex", s) : u.removeAttribute("tabindex"));
		};
	e.hasAttribute("data-tabindex") && i(e);
	for (const u of t) i(u);
}
function WM(e, t) {
	"scrollIntoView" in e
		? (e.focus({ preventScroll: !0 }), e.scrollIntoView({ block: "nearest", inline: "nearest", ...t }))
		: e.focus();
}
var eN = "div",
	w0 = jc(),
	tN = [
		"text",
		"search",
		"url",
		"tel",
		"email",
		"password",
		"number",
		"date",
		"month",
		"week",
		"time",
		"datetime",
		"datetime-local",
	],
	A_ = Symbol("safariFocusAncestor");
function nN(e) {
	return e ? !!e[A_] : !1;
}
function E0(e, t) {
	e && (e[A_] = t);
}
function rN(e) {
	const { tagName: t, readOnly: i, type: u } = e;
	return (t === "TEXTAREA" && !i) || (t === "SELECT" && !i)
		? !0
		: t === "INPUT" && !i
			? tN.includes(u)
			: !!(e.isContentEditable || (e.getAttribute("role") === "combobox" && e.dataset.name));
}
function iN(e) {
	return "labels" in e ? e.labels : null;
}
function T0(e) {
	return e.tagName.toLowerCase() === "input" && e.type ? e.type === "radio" || e.type === "checkbox" : !1;
}
function aN(e) {
	return e ? e === "button" || e === "summary" || e === "input" || e === "select" || e === "textarea" || e === "a" : !0;
}
function uN(e) {
	return e ? e === "button" || e === "input" || e === "select" || e === "textarea" : !0;
}
function lN(e, t, i, u, s) {
	return e ? (t ? (i && !u ? -1 : void 0) : i ? s : s || 0) : s;
}
function ch(e, t) {
	return De((i) => {
		(e?.(i), !i.defaultPrevented && t && (i.stopPropagation(), i.preventDefault()));
	});
}
var x0 = !1,
	_m = !0;
function sN(e) {
	const t = e.target;
	t && "hasAttribute" in t && (t.hasAttribute("data-focus-visible") || (_m = !1));
}
function oN(e) {
	e.metaKey || e.ctrlKey || e.altKey || (_m = !0);
}
var Es = tt(function ({ focusable: t = !0, accessibleWhenDisabled: i, autoFocus: u, onFocusVisible: s, ...o }) {
		const f = (0, _.useRef)(null);
		((0, _.useEffect)(() => {
			t && (x0 || (Rn("mousedown", sN, !0), Rn("keydown", oN, !0), (x0 = !0)));
		}, [t]),
			w0 &&
				(0, _.useEffect)(() => {
					if (!t) return;
					const te = f.current;
					if (!te || !T0(te)) return;
					const fe = iN(te);
					if (!fe) return;
					const j = () => queueMicrotask(() => te.focus());
					for (const B of fe) B.addEventListener("mouseup", j);
					return () => {
						for (const B of fe) B.removeEventListener("mouseup", j);
					};
				}, [t]));
		const h = t && bs(o),
			m = !!h && !i,
			[v, g] = (0, _.useState)(!1);
		((0, _.useEffect)(() => {
			t && m && v && g(!1);
		}, [t, m, v]),
			(0, _.useEffect)(() => {
				if (!t || !v) return;
				const te = f.current;
				if (!te || typeof IntersectionObserver > "u") return;
				const fe = new IntersectionObserver(() => {
					Qr(te) || g(!1);
				});
				return (fe.observe(te), () => fe.disconnect());
			}, [t, v]));
		const S = ch(o.onKeyPressCapture, h),
			b = ch(o.onMouseDownCapture, h),
			p = ch(o.onClickCapture, h),
			T = o.onMouseDown,
			A = De((te) => {
				if ((T?.(te), te.defaultPrevented || !t)) return;
				const fe = te.currentTarget;
				if (!w0 || y_(te) || (!ma(fe) && !T0(fe))) return;
				let j = !1;
				const B = () => {
					j = !0;
				};
				fe.addEventListener("focusin", B, { capture: !0, once: !0 });
				const P = GM(fe.parentElement);
				(E0(P, !0),
					Yu(fe, "mouseup", () => {
						(fe.removeEventListener("focusin", B, !0), E0(P, !1), !j && x_(fe));
					}));
			}),
			N = (te, fe) => {
				if ((fe && (te.currentTarget = fe), !t)) return;
				const j = te.currentTarget;
				j && Wa(j) && (s?.(te), !te.defaultPrevented && ((j.dataset.focusVisible = "true"), g(!0)));
			},
			q = o.onKeyDownCapture,
			I = De((te) => {
				if ((q?.(te), te.defaultPrevented || !t || v || te.metaKey || te.altKey || te.ctrlKey || !vr(te))) return;
				const fe = te.currentTarget;
				Yu(fe, "focusout", () => N(te, fe));
			}),
			C = o.onFocusCapture,
			k = De((te) => {
				if ((C?.(te), te.defaultPrevented || !t)) return;
				if (!vr(te)) {
					g(!1);
					return;
				}
				const fe = te.currentTarget,
					j = () => N(te, fe);
				_m || rN(te.target) ? Yu(te.target, "focusout", j) : g(!1);
			}),
			L = o.onBlur,
			Q = De((te) => {
				(L?.(te), t && Pa(te) && (te.currentTarget.removeAttribute("data-focus-visible"), g(!1)));
			}),
			K = (0, _.useContext)(T_),
			O = De((te) => {
				t &&
					u &&
					te &&
					K &&
					queueMicrotask(() => {
						Wa(te) || (Qr(te) && te.focus());
					});
			}),
			$ = S_(f),
			V = t && aN($),
			Y = t && uN($),
			ae = o.style,
			se = (0, _.useMemo)(() => (m ? { pointerEvents: "none", ...ae } : ae), [m, ae]);
		return (
			(o = {
				"data-focus-visible": (t && v) || void 0,
				"data-autofocus": u || void 0,
				"aria-disabled": h || void 0,
				...o,
				ref: Wt(f, O, o.ref),
				style: se,
				tabIndex: lN(t, m, V, Y, o.tabIndex),
				disabled: Y && m ? !0 : void 0,
				contentEditable: h ? void 0 : o.contentEditable,
				onKeyPressCapture: S,
				onClickCapture: p,
				onMouseDownCapture: b,
				onMouseDown: A,
				onKeyDownCapture: I,
				onFocusCapture: k,
				onBlur: Q,
			}),
			au(o)
		);
	}),
	VD = Fe(function (t) {
		return We(eN, Es(t));
	});
function R_(e) {
	const t = [];
	for (const i of e) t.push(...i);
	return t;
}
function Vh(e) {
	return e.slice().reverse();
}
var cN = "div";
function fN(e) {
	return e.some((t) => !!t.rowId);
}
function dN(e) {
	const t = e.target;
	return t && !ii(t) ? !1 : e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
function hN(e) {
	return e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta";
}
function A0(e, t, i) {
	return De((u) => {
		var s;
		if ((t?.(u), u.defaultPrevented || u.isPropagationStopped() || !vr(u) || hN(u) || dN(u))) return;
		const o = (s = da(e, e.getState().activeId)) == null ? void 0 : s.element;
		if (!o) return;
		const { view: f, ...h } = u;
		(o !== i?.current && o.focus(),
			MM(o, u.type, h) || u.preventDefault(),
			u.currentTarget.contains(o) && u.stopPropagation());
	});
}
function mN(e) {
	return mM(R_(Vh(vM(e))));
}
function vN(e) {
	const [t, i] = (0, _.useState)(!1),
		u = (0, _.useCallback)(() => i(!0), []),
		s = e.useState((o) => da(e, o.activeId));
	return (
		(0, _.useEffect)(() => {
			const o = s?.element;
			t && o && (i(!1), o.focus({ preventScroll: !0 }));
		}, [s, t]),
		u
	);
}
var Sm = tt(function ({ store: t, composite: i = !0, focusOnMove: u = i, moveOnKeyPress: s = !0, ...o }) {
		const f = VM();
		((t = t || f), Jt(t, !1));
		const h = (0, _.useRef)(null),
			m = (0, _.useRef)(null),
			v = vN(t),
			g = t.useState("moves"),
			[, S] = OM(i ? t.setBaseElement : null);
		((0, _.useEffect)(() => {
			var $;
			if (!t || !g || !i || !u) return;
			const { activeId: V } = t.getState(),
				Y = ($ = da(t, V)) == null ? void 0 : $.element;
			Y && WM(Y);
		}, [t, g, i, u]),
			ot(() => {
				if (!t || !g || !i) return;
				const { baseElement: $, activeId: V } = t.getState();
				if (V !== null || !$) return;
				const Y = m.current;
				((m.current = null), Y && $u(Y, { relatedTarget: $ }), Wa($) || $.focus());
			}, [t, g, i]));
		const b = t.useState("activeId"),
			p = t.useState("virtualFocus");
		ot(() => {
			var $;
			if (!t || !i || !p) return;
			const V = m.current;
			if (((m.current = null), !V)) return;
			const Y = (($ = da(t, b)) == null ? void 0 : $.element) || Di(V);
			Y !== V && $u(V, { relatedTarget: Y });
		}, [t, b, p, i]);
		const T = A0(t, o.onKeyDownCapture, m),
			A = A0(t, o.onKeyUpCapture, m),
			N = o.onFocusCapture,
			q = De(($) => {
				if ((N?.($), $.defaultPrevented || !t)) return;
				const { virtualFocus: V } = t.getState();
				if (!V) return;
				const Y = $.relatedTarget,
					ae = pM($.currentTarget);
				vr($) && ae && ($.stopPropagation(), (m.current = Y));
			}),
			I = o.onFocus,
			C = De(($) => {
				if ((I?.($), $.defaultPrevented || !i || !t)) return;
				const { relatedTarget: V } = $,
					{ virtualFocus: Y } = t.getState();
				Y ? vr($) && !ls(t, V) && queueMicrotask(v) : vr($) && t.setActiveId(null);
			}),
			k = o.onBlurCapture,
			L = De(($) => {
				var V;
				if ((k?.($), $.defaultPrevented || !t)) return;
				const { virtualFocus: Y, activeId: ae } = t.getState();
				if (!Y) return;
				const se = (V = da(t, ae)) == null ? void 0 : V.element,
					te = $.relatedTarget,
					fe = ls(t, te),
					j = m.current;
				((m.current = null),
					vr($) && fe
						? (te === se ? j && j !== te && $u(j, $) : se ? $u(se, $) : j && $u(j, $), $.stopPropagation())
						: !ls(t, $.target) && se && $u(se, $));
			}),
			Q = o.onKeyDown,
			K = Mt(s),
			O = De(($) => {
				var V;
				if ((Q?.($), $.nativeEvent.isComposing || $.defaultPrevented || !t || !vr($))) return;
				const { orientation: Y, renderedItems: ae, activeId: se } = t.getState(),
					te = da(t, se);
				if ((V = te?.element) != null && V.isConnected) return;
				const fe = Y !== "horizontal",
					j = Y !== "vertical",
					B = fN(ae);
				if (
					($.key === "ArrowLeft" || $.key === "ArrowRight" || $.key === "Home" || $.key === "End") &&
					ii($.currentTarget)
				)
					return;
				const ge = {
					ArrowUp:
						(B || fe) &&
						(() => {
							if (B) {
								const be = mN(ae);
								return be?.id;
							}
							return t?.last();
						}),
					ArrowRight: (B || j) && t.first,
					ArrowDown: (B || fe) && t.first,
					ArrowLeft: (B || j) && t.last,
					Home: t.first,
					End: t.last,
					PageUp: t.first,
					PageDown: t.last,
				}[$.key];
				if (ge) {
					const be = ge();
					if (be !== void 0) {
						if (!K($)) return;
						($.preventDefault(), t.move(be));
					}
				}
			});
		return (
			(o = Cn(o, ($) => (0, w.jsx)(ws, { value: t, children: $ }), [t])),
			(o = {
				"aria-activedescendant": t.useState(($) => {
					var V;
					if (t && i && $.virtualFocus) return (V = da(t, $.activeId)) == null ? void 0 : V.id;
				}),
				...o,
				ref: Wt(h, S, o.ref),
				onKeyDownCapture: T,
				onKeyUpCapture: A,
				onFocusCapture: q,
				onFocus: C,
				onBlurCapture: L,
				onKeyDown: O,
			}),
			(o = Es({ focusable: t.useState(($) => i && ($.virtualFocus || $.activeId === null)), ...o })),
			o
		);
	}),
	HD = Fe(function (t) {
		return We(cN, Sm(t));
	}),
	Ts = ai(),
	ZD = Ts.useContext,
	PD = Ts.useScopedContext,
	wm = Ts.useProviderContext,
	gN = Ts.ContextProvider,
	yN = Ts.ScopedContextProvider,
	xs = ai([gN], [yN]),
	QD = xs.useContext,
	KD = xs.useScopedContext,
	Bc = xs.useProviderContext,
	pN = xs.ContextProvider,
	Em = xs.ScopedContextProvider,
	bN = (0, _.createContext)(void 0),
	_N = (0, _.createContext)(void 0),
	As = ai([pN], [Em]),
	YD = As.useContext,
	GD = As.useScopedContext,
	Vc = As.useProviderContext,
	C_ = As.ContextProvider,
	Hc = As.ScopedContextProvider,
	SN = "div",
	Tm = tt(function ({ store: t, ...i }) {
		const u = Vc();
		return ((t = t || u), (i = { ...i, ref: Wt(t?.setAnchorElement, i.ref) }), i);
	}),
	FD = Fe(function (t) {
		return We(SN, Tm(t));
	}),
	k_ = (0, _.createContext)(void 0),
	Rs = ai([C_, ws], [Hc, qc]),
	wN = Rs.useContext,
	M_ = Rs.useScopedContext,
	Zc = Rs.useProviderContext,
	XD = Rs.ContextProvider,
	EN = Rs.ScopedContextProvider,
	TN = (0, _.createContext)(void 0),
	xN = (0, _.createContext)(!1);
function uu(e, t) {
	const i = e.__unstableInternals;
	return (Jt(i, "Invalid store"), i[t]);
}
function Kr(e, ...t) {
	let i = e,
		u = i,
		s = Symbol(),
		o = ss;
	const f = new Set(),
		h = new Set(),
		m = new Set(),
		v = new Set(),
		g = new Set(),
		S = new WeakMap(),
		b = new WeakMap(),
		p = (O) => (m.add(O), () => m.delete(O)),
		T = () => {
			const O = f.size,
				$ = Symbol();
			f.add($);
			const V = () => {
				(f.delete($), !f.size && o());
			};
			if (O) return V;
			const Y = EM(i).map((te) =>
					rr(
						...t.map((fe) => {
							var j;
							const B = (j = fe?.getState) == null ? void 0 : j.call(fe);
							if (B && zi(B, te))
								return Dn(fe, [te], (P) => {
									Q(te, P[te], !0);
								});
						}),
					),
				),
				ae = [];
			for (const te of m) ae.push(te());
			const se = t.map(xm);
			return ((o = rr(...Y, ...ae, ...se)), V);
		},
		A = (O, $, V = v) => (
			V.add($),
			b.set($, O),
			() => {
				var Y;
				((Y = S.get($)) == null || Y(), S.delete($), b.delete($), V.delete($));
			}
		),
		N = (O, $) => A(O, $),
		q = (O, $) => (S.set($, $(i, i)), A(O, $)),
		I = (O, $) => (S.set($, $(i, u)), A(O, $, g)),
		C = (O) => Kr(wM(i, O), K),
		k = (O) => Kr(SM(i, O), K),
		L = () => i,
		Q = (O, $, V = !1) => {
			var Y;
			if (!zi(i, O)) return;
			const ae = h_($, i[O]);
			if (ae === i[O]) return;
			if (!V) for (const j of t) (Y = j?.setState) == null || Y.call(j, O, ae);
			const se = i;
			i = { ...i, [O]: ae };
			const te = Symbol();
			((s = te), h.add(O));
			const fe = (j, B, P) => {
				var ge;
				const be = b.get(j),
					Pe = (M) => (P ? P.has(M) : M === O);
				(!be || be.some(Pe)) && ((ge = S.get(j)) == null || ge(), S.set(j, j(i, B)));
			};
			for (const j of v) fe(j, se);
			queueMicrotask(() => {
				if (s !== te) return;
				const j = i;
				for (const B of g) fe(B, u, h);
				((u = j), h.clear());
			});
		},
		K = {
			getState: L,
			setState: Q,
			__unstableInternals: { setup: p, init: T, subscribe: N, sync: q, batch: I, pick: C, omit: k },
		};
	return K;
}
function Zn(e, ...t) {
	if (e) return uu(e, "setup")(...t);
}
function xm(e, ...t) {
	if (e) return uu(e, "init")(...t);
}
function Am(e, ...t) {
	if (e) return uu(e, "subscribe")(...t);
}
function Dn(e, ...t) {
	if (e) return uu(e, "sync")(...t);
}
function Sc(e, ...t) {
	if (e) return uu(e, "batch")(...t);
}
function Rm(e, ...t) {
	if (e) return uu(e, "omit")(...t);
}
function N_(e, ...t) {
	if (e) return uu(e, "pick")(...t);
}
function Pc(...e) {
	var t;
	const i = {};
	for (const s of e) {
		const o = (t = s?.getState) == null ? void 0 : t.call(s);
		o && Object.assign(i, o);
	}
	const u = Kr(i, ...e);
	return Object.assign({}, ...e, u);
}
var AN = "input";
function R0(e, t, i) {
	if (!i) return !1;
	const u = e.find((s) => !s.disabled && s.value);
	return u?.value === t;
}
function C0(e, t) {
	return !t || e == null ? !1 : ((e = m_(e)), t.length > e.length && t.toLowerCase().indexOf(e.toLowerCase()) === 0);
}
function RN(e) {
	return e.type === "input";
}
function CN(e) {
	return e === "inline" || e === "list" || e === "both" || e === "none";
}
function kN(e) {
	const t = e.find((i) => {
		var u;
		return i.disabled ? !1 : ((u = i.element) == null ? void 0 : u.getAttribute("role")) !== "tab";
	});
	return t?.id;
}
var MN = tt(function ({
		store: t,
		focusable: i = !0,
		autoSelect: u = !1,
		getAutoSelectId: s,
		setValueOnChange: o,
		showMinLength: f = 0,
		showOnChange: h,
		showOnMouseDown: m,
		showOnClick: v = m,
		showOnKeyDown: g,
		showOnKeyPress: S = g,
		blurActiveItemOnClick: b,
		setValueOnClick: p = !0,
		moveOnKeyPress: T = !0,
		autoComplete: A = "list",
		...N
	}) {
		const q = Zc();
		((t = t || q), Jt(t, !1));
		const I = (0, _.useRef)(null),
			[C, k] = w_(),
			L = (0, _.useRef)(!1),
			Q = (0, _.useRef)(!1),
			K = t.useState((ce) => ce.virtualFocus && u),
			O = A === "inline" || A === "both",
			[$, V] = (0, _.useState)(O);
		DM(() => {
			O && V(!0);
		}, [O]);
		const Y = t.useState("value"),
			ae = (0, _.useRef)();
		(0, _.useEffect)(
			() =>
				Dn(t, ["selectedValue", "activeId"], (ce, ze) => {
					ae.current = ze.selectedValue;
				}),
			[],
		);
		const se = t.useState((ce) => {
				var ze;
				if (
					O &&
					$ &&
					!(
						ce.activeValue &&
						Array.isArray(ce.selectedValue) &&
						(ce.selectedValue.includes(ce.activeValue) || ((ze = ae.current) != null && ze.includes(ce.activeValue)))
					)
				)
					return ce.activeValue;
			}),
			te = t.useState("renderedItems"),
			fe = t.useState("open"),
			j = t.useState("contentElement"),
			B = (0, _.useMemo)(() => {
				if (!O || !$) return Y;
				if (R0(te, se, K)) {
					if (C0(Y, se)) {
						const ce = se?.slice(Y.length) || "";
						return Y + ce;
					}
					return Y;
				}
				return se || Y;
			}, [O, $, te, se, K, Y]);
		((0, _.useEffect)(() => {
			const ce = I.current;
			if (!ce) return;
			const ze = () => V(!0);
			return (
				ce.addEventListener("combobox-item-move", ze),
				() => {
					ce.removeEventListener("combobox-item-move", ze);
				}
			);
		}, []),
			(0, _.useEffect)(() => {
				if (!O || !$ || !se || !R0(te, se, K) || !C0(Y, se)) return;
				let ce = ss;
				return (
					queueMicrotask(() => {
						const ze = I.current;
						if (!ze) return;
						const { start: rt, end: Ne } = Uh(ze),
							bt = Y.length,
							pn = se.length;
						(sh(ze, bt, pn),
							(ce = () => {
								if (!Wa(ze)) return;
								const { start: ut, end: Vt } = Uh(ze);
								ut === bt && Vt === pn && sh(ze, rt, Ne);
							}));
					}),
					() => ce()
				);
			}, [C, O, $, se, te, K, Y]));
		const P = (0, _.useRef)(null),
			ge = De(s),
			be = (0, _.useRef)(null);
		((0, _.useEffect)(() => {
			if (!fe || !j) return;
			const ce = hm(j);
			if (!ce) return;
			P.current = ce;
			const ze = () => {
					L.current = !1;
				},
				rt = () => {
					if (!t || !L.current) return;
					const { activeId: bt } = t.getState();
					bt !== null && bt !== be.current && (L.current = !1);
				},
				Ne = { passive: !0, capture: !0 };
			return (
				ce.addEventListener("wheel", ze, Ne),
				ce.addEventListener("touchmove", ze, Ne),
				ce.addEventListener("scroll", rt, Ne),
				() => {
					(ce.removeEventListener("wheel", ze, !0),
						ce.removeEventListener("touchmove", ze, !0),
						ce.removeEventListener("scroll", rt, !0));
				}
			);
		}, [fe, j, t]),
			ot(() => {
				Y && (Q.current || (L.current = !0));
			}, [Y]),
			ot(() => {
				(K !== "always" && fe) || (L.current = fe);
			}, [K, fe]));
		const Pe = t.useState("resetValueOnSelect");
		(il(() => {
			var ce, ze;
			const rt = L.current;
			if (!t || !fe || (!rt && !Pe)) return;
			const { baseElement: Ne, contentElement: bt, activeId: pn } = t.getState();
			if (!(Ne && !Wa(Ne))) {
				if (bt?.hasAttribute("data-placing")) {
					const ut = new MutationObserver(k);
					return (ut.observe(bt, { attributeFilter: ["data-placing"] }), () => ut.disconnect());
				}
				if (K && rt) {
					const ut = ge(te),
						Vt = ut !== void 0 ? ut : (ce = kN(te)) != null ? ce : t.first();
					((be.current = Vt), t.move(Vt ?? null));
				} else {
					const ut = (ze = t.item(pn || t.first())) == null ? void 0 : ze.element;
					ut && "scrollIntoView" in ut && ut.scrollIntoView({ block: "nearest", inline: "nearest" });
				}
			}
		}, [t, fe, C, Y, K, Pe, ge, te]),
			(0, _.useEffect)(() => {
				if (!O) return;
				const ce = I.current;
				if (!ce) return;
				const ze = [ce, j].filter((Ne) => !!Ne),
					rt = (Ne) => {
						ze.every((bt) => Pa(Ne, bt)) && t?.setValue(B);
					};
				for (const Ne of ze) Ne.addEventListener("focusout", rt);
				return () => {
					for (const Ne of ze) Ne.removeEventListener("focusout", rt);
				};
			}, [O, j, t, B]));
		const M = (ce) => ce.currentTarget.value.length >= f,
			D = N.onChange,
			le = Mt(h ?? M),
			oe = Mt(o ?? !t.tag),
			me = De((ce) => {
				if ((D?.(ce), ce.defaultPrevented || !t)) return;
				const ze = ce.currentTarget,
					{ value: rt, selectionStart: Ne, selectionEnd: bt } = ze,
					pn = ce.nativeEvent;
				if (((L.current = !0), RN(pn) && (pn.isComposing && ((L.current = !1), (Q.current = !0)), O))) {
					const ut = pn.inputType === "insertText" || pn.inputType === "insertCompositionText",
						Vt = Ne === rt.length;
					V(ut && Vt);
				}
				if (oe(ce)) {
					const ut = rt === t.getState().value;
					(t.setValue(rt),
						queueMicrotask(() => {
							sh(ze, Ne, bt);
						}),
						O && K && ut && k());
				}
				(le(ce) && t.show(), (!K || !L.current) && t.setActiveId(null));
			}),
			Se = N.onCompositionEnd,
			Re = De((ce) => {
				((L.current = !0), (Q.current = !1), Se?.(ce), !ce.defaultPrevented && K && k());
			}),
			Le = N.onMouseDown,
			Xe = Mt(b ?? (() => !!t?.getState().includesBaseElement)),
			pt = Mt(p),
			At = Mt(v ?? M),
			vn = De((ce) => {
				(Le?.(ce),
					!ce.defaultPrevented &&
						(ce.button ||
							ce.ctrlKey ||
							(t &&
								(Xe(ce) && t.setActiveId(null),
								pt(ce) && t.setValue(B),
								At(ce) && Yu(ce.currentTarget, "mouseup", t.show)))));
			}),
			en = N.onKeyDown,
			Be = Mt(S ?? M),
			ye = De((ce) => {
				if (
					(en?.(ce),
					ce.repeat || (L.current = !1),
					ce.defaultPrevented || ce.ctrlKey || ce.altKey || ce.shiftKey || ce.metaKey || !t)
				)
					return;
				const { open: ze } = t.getState();
				ze || ((ce.key === "ArrowUp" || ce.key === "ArrowDown") && Be(ce) && (ce.preventDefault(), t.show()));
			}),
			Ce = N.onBlur,
			nt = De((ce) => {
				((L.current = !1), Ce?.(ce), ce.defaultPrevented);
			}),
			Ve = ji(N.id),
			Bt = CN(A) ? A : void 0,
			et = t.useState((ce) => ce.activeId === null);
		return (
			(N = {
				id: Ve,
				role: "combobox",
				"aria-autocomplete": Bt,
				"aria-haspopup": zc(j, "listbox"),
				"aria-expanded": fe,
				"aria-controls": j?.id,
				"data-active-item": et || void 0,
				value: B,
				...N,
				ref: Wt(I, N.ref),
				onChange: me,
				onCompositionEnd: Re,
				onMouseDown: vn,
				onKeyDown: ye,
				onBlur: nt,
			}),
			(N = Sm({ store: t, focusable: i, ...N, moveOnKeyPress: (ce) => (Dc(T, ce) ? !1 : (O && V(!0), !0)) })),
			(N = Tm({ store: t, ...N })),
			{ autoComplete: "off", ...N }
		);
	}),
	NN = Fe(function (t) {
		return We(AN, MN(t));
	}),
	ON = "button";
function k0(e) {
	if (!e.isTrusted) return !1;
	const t = e.currentTarget;
	return e.key === "Enter"
		? ma(t) || t.tagName === "SUMMARY" || t.tagName === "A"
		: e.key === " "
			? ma(t) || t.tagName === "SUMMARY" || t.tagName === "INPUT" || t.tagName === "SELECT"
			: !1;
}
var zN = Symbol("command"),
	Cm = tt(function ({ clickOnEnter: t = !0, clickOnSpace: i = !0, ...u }) {
		const s = (0, _.useRef)(null),
			[o, f] = (0, _.useState)(!1);
		(0, _.useEffect)(() => {
			s.current && f(ma(s.current));
		}, []);
		const [h, m] = (0, _.useState)(!1),
			v = (0, _.useRef)(!1),
			g = bs(u),
			[S, b] = E_(u, zN, !0),
			p = u.onKeyDown,
			T = De((q) => {
				p?.(q);
				const I = q.currentTarget;
				if (q.defaultPrevented || S || g || !vr(q) || ii(I) || I.isContentEditable) return;
				const C = t && q.key === "Enter",
					k = i && q.key === " ",
					L = q.key === "Enter" && !t,
					Q = q.key === " " && !i;
				if (L || Q) {
					q.preventDefault();
					return;
				}
				if (C || k) {
					const K = k0(q);
					if (C) {
						if (!K) {
							q.preventDefault();
							const { view: O, ...$ } = q,
								V = () => v0(I, $);
							RM() ? Yu(I, "keyup", V) : queueMicrotask(V);
						}
					} else k && ((v.current = !0), K || (q.preventDefault(), m(!0)));
				}
			}),
			A = u.onKeyUp,
			N = De((q) => {
				if ((A?.(q), q.defaultPrevented || S || g || q.metaKey)) return;
				const I = i && q.key === " ";
				if (v.current && I && ((v.current = !1), !k0(q))) {
					(q.preventDefault(), m(!1));
					const C = q.currentTarget,
						{ view: k, ...L } = q;
					queueMicrotask(() => v0(C, L));
				}
			});
		return (
			(u = {
				"data-active": h || void 0,
				type: o ? "button" : void 0,
				...b,
				...u,
				ref: Wt(s, u.ref),
				onKeyDown: T,
				onKeyUp: N,
			}),
			(u = Es(u)),
			u
		);
	}),
	JD = Fe(function (t) {
		return We(ON, Cm(t));
	}),
	O_ = "button",
	z_ = tt(function (t) {
		const i = (0, _.useRef)(null),
			u = S_(i, O_),
			[s, o] = (0, _.useState)(() => !!u && ma({ tagName: u, type: t.type }));
		return (
			(0, _.useEffect)(() => {
				i.current && o(ma(i.current));
			}, []),
			(t = { role: !s && u !== "a" ? "button" : void 0, ...t, ref: Wt(i, t.ref) }),
			(t = Cm(t)),
			t
		);
	}),
	WD = Fe(function (t) {
		return We(O_, z_(t));
	}),
	DN = "button",
	jN = Symbol("disclosure"),
	D_ = tt(function ({ store: t, toggleOnClick: i = !0, ...u }) {
		const s = wm();
		((t = t || s), Jt(t, !1));
		const o = (0, _.useRef)(null),
			[f, h] = (0, _.useState)(!1),
			m = t.useState("disclosureElement"),
			v = t.useState("open");
		(0, _.useEffect)(() => {
			let N = m === o.current;
			(m?.isConnected || (t?.setDisclosureElement(o.current), (N = !0)), h(v && N));
		}, [m, t, v]);
		const g = u.onClick,
			S = Mt(i),
			[b, p] = E_(u, jN, !0),
			T = De((N) => {
				(g?.(N), !N.defaultPrevented && (b || (S(N) && (t?.setDisclosureElement(N.currentTarget), t?.toggle()))));
			}),
			A = t.useState("contentElement");
		return (
			(u = { "aria-expanded": f, "aria-controls": A?.id, ...p, ...u, ref: Wt(o, u.ref), onClick: T }),
			(u = z_(u)),
			u
		);
	}),
	ej = Fe(function (t) {
		return We(DN, D_(t));
	}),
	IN = "button",
	j_ = tt(function ({ store: t, ...i }) {
		const u = Bc();
		return (
			(t = t || u),
			Jt(t, !1),
			(i = { "aria-haspopup": zc(t.useState("contentElement"), "dialog"), ...i }),
			(i = D_({ store: t, ...i })),
			i
		);
	}),
	tj = Fe(function (t) {
		return We(IN, j_(t));
	}),
	LN = "div";
function I_(e) {
	const t = e.relatedTarget;
	return t?.nodeType === Node.ELEMENT_NODE ? t : null;
}
function qN(e) {
	const t = I_(e);
	return t ? mn(e.currentTarget, t) : !1;
}
var Hh = Symbol("composite-hover");
function UN(e) {
	let t = I_(e);
	if (!t) return !1;
	do {
		if (zi(t, Hh) && t[Hh]) return !0;
		t = t.parentElement;
	} while (t);
	return !1;
}
var km = tt(function ({ store: t, focusOnHover: i = !0, blurOnHoverEnd: u = !!i, ...s }) {
		const o = Lc();
		((t = t || o), Jt(t, !1));
		const f = ym(),
			h = s.onMouseMove,
			m = Mt(i),
			v = De((T) => {
				if ((h?.(T), !T.defaultPrevented && f() && m(T))) {
					if (!ha(T.currentTarget)) {
						const A = t?.getState().baseElement;
						A && !Wa(A) && A.focus();
					}
					t?.setActiveId(T.currentTarget.id);
				}
			}),
			g = s.onMouseLeave,
			S = Mt(u),
			b = De((T) => {
				var A;
				(g?.(T),
					!T.defaultPrevented &&
						f() &&
						(qN(T) ||
							UN(T) ||
							(m(T) && S(T) && (t?.setActiveId(null), (A = t?.getState().baseElement) == null || A.focus()))));
			}),
			p = (0, _.useCallback)((T) => {
				T && (T[Hh] = !0);
			}, []);
		return ((s = { ...s, ref: Wt(p, s.ref), onMouseMove: v, onMouseLeave: b }), au(s));
	}),
	nj = Ic(
		Fe(function (t) {
			return We(LN, km(t));
		}),
	),
	$N = "div",
	L_ = tt(function ({ store: t, shouldRegisterItem: i = !0, getItem: u = v_, element: s, ...o }) {
		const f = UM();
		t = t || f;
		const h = ji(o.id),
			m = (0, _.useRef)(s);
		return (
			(0, _.useEffect)(() => {
				const v = m.current;
				if (!h || !v || !i) return;
				const g = u({ id: h, element: v });
				return t?.renderItem(g);
			}, [h, i, u, t]),
			(o = { ...o, ref: Wt(m, o.ref) }),
			au(o)
		);
	}),
	rj = Fe(function (t) {
		return We($N, L_(t));
	}),
	BN = Ir((e) => {
		var t = Rc();
		function i(b, p) {
			return (b === p && (b !== 0 || 1 / b === 1 / p)) || (b !== b && p !== p);
		}
		var u = typeof Object.is == "function" ? Object.is : i,
			s = t.useState,
			o = t.useEffect,
			f = t.useLayoutEffect,
			h = t.useDebugValue;
		function m(b, p) {
			var T = p(),
				A = s({ inst: { value: T, getSnapshot: p } }),
				N = A[0].inst,
				q = A[1];
			return (
				f(
					function () {
						((N.value = T), (N.getSnapshot = p), v(N) && q({ inst: N }));
					},
					[b, T, p],
				),
				o(
					function () {
						return (
							v(N) && q({ inst: N }),
							b(function () {
								v(N) && q({ inst: N });
							})
						);
					},
					[b],
				),
				h(T),
				T
			);
		}
		function v(b) {
			var p = b.getSnapshot;
			b = b.value;
			try {
				var T = p();
				return !u(b, T);
			} catch {
				return !0;
			}
		}
		function g(b, p) {
			return p();
		}
		var S = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? g : m;
		e.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : S;
	}),
	VN = Ir((e, t) => {
		t.exports = BN();
	}),
	HN = hb(VN(), 1),
	{ useSyncExternalStore: q_ } = HN.default,
	U_ = () => () => {};
function dn(e, t = v_) {
	const i = _.useCallback((s) => (e ? Am(e, null, s) : U_()), [e]),
		u = () => {
			const s = typeof t == "string" ? t : null,
				o = typeof t == "function" ? t : null,
				f = e?.getState();
			if (o) return o(f);
			if (f && s && zi(f, s)) return f[s];
		};
	return q_(i, u, u);
}
function $_(e, t) {
	const i = _.useRef({}),
		u = _.useCallback((o) => (e ? Am(e, null, o) : U_()), [e]),
		s = () => {
			const o = e?.getState();
			let f = !1;
			const h = i.current;
			for (const m in t) {
				const v = t[m];
				if (typeof v == "function") {
					const g = v(o);
					g !== h[m] && ((h[m] = g), (f = !0));
				}
				if (typeof v == "string") {
					if (!o || !zi(o, v)) continue;
					const g = o[v];
					g !== h[m] && ((h[m] = g), (f = !0));
				}
			}
			return (f && (i.current = { ...h }), i.current);
		};
	return q_(u, s, s);
}
function Xt(e, t, i, u) {
	const s = zi(t, i) ? t[i] : void 0,
		o = __({ value: s, setValue: u ? t[u] : void 0 });
	(ot(
		() =>
			Dn(e, [i], (f, h) => {
				const { value: m, setValue: v } = o.current;
				v && f[i] !== h[i] && f[i] !== m && v(f[i]);
			}),
		[e, i],
	),
		ot(() => {
			if (s !== void 0)
				return (
					e.setState(i, s),
					Sc(e, [i], () => {
						s !== void 0 && e.setState(i, s);
					})
				);
		}));
}
function Qc(e, t) {
	const [i, u] = _.useState(() => e(t));
	ot(() => xm(i), [i]);
	const s = _.useCallback((o) => dn(i, o), [i]);
	return [
		_.useMemo(() => ({ ...i, useState: s }), [i, s]),
		De(() => {
			u((o) => e({ ...t, ...o.getState() }));
		}),
	];
}
var ZN = "button";
function PN(e) {
	return qh(e) ? !0 : e.tagName === "INPUT" && !ma(e);
}
function QN(e, t = !1) {
	const i = e.clientHeight,
		{ top: u } = e.getBoundingClientRect(),
		s = Math.max(i * 0.875, i - 40) * 1.5,
		o = t ? i - s + u : s + u;
	return e.tagName === "HTML" ? o + e.scrollTop : o;
}
function KN(e, t = !1) {
	const { top: i } = e.getBoundingClientRect();
	return t ? i + e.clientHeight : i;
}
function M0(e, t, i, u = !1) {
	var s;
	if (!t || !i) return;
	const { renderedItems: o } = t.getState(),
		f = hm(e);
	if (!f) return;
	const h = QN(f, u);
	let m, v;
	for (let g = 0; g < o.length; g += 1) {
		const S = m;
		if (((m = i(g)), !m)) break;
		if (m === S) continue;
		const b = (s = da(t, m)) == null ? void 0 : s.element;
		if (!b) continue;
		const p = KN(b, u) - h,
			T = Math.abs(p);
		if ((u && p <= 0) || (!u && p >= 0)) {
			v !== void 0 && v < T && (m = S);
			break;
		}
		v = T;
	}
	return m;
}
function YN(e, t) {
	return vr(e) ? !1 : ls(t, e.target);
}
var Mm = tt(function ({
		store: t,
		rowId: i,
		preventScrollOnKeyDown: u = !1,
		moveOnKeyPress: s = !0,
		tabbable: o = !1,
		getItem: f,
		"aria-setsize": h,
		"aria-posinset": m,
		...v
	}) {
		const g = Lc();
		t = t || g;
		const S = ji(v.id),
			b = (0, _.useRef)(null),
			p = (0, _.useContext)(ZM),
			T = bs(v) && !v.accessibleWhenDisabled,
			{
				rowId: A,
				baseElement: N,
				isActiveItem: q,
				ariaSetSize: I,
				ariaPosInSet: C,
				isTabbable: k,
			} = $_(t, {
				rowId(j) {
					if (i) return i;
					if (j && p?.baseElement && p.baseElement === j.baseElement) return p.id;
				},
				baseElement(j) {
					return j?.baseElement || void 0;
				},
				isActiveItem(j) {
					return !!j && j.activeId === S;
				},
				ariaSetSize(j) {
					if (h != null) return h;
					if (j && p?.ariaSetSize && p.baseElement === j.baseElement) return p.ariaSetSize;
				},
				ariaPosInSet(j) {
					if (m != null) return m;
					if (!j || !p?.ariaPosInSet || p.baseElement !== j.baseElement) return;
					const B = j.renderedItems.filter((P) => P.rowId === A);
					return p.ariaPosInSet + B.findIndex((P) => P.id === S);
				},
				isTabbable(j) {
					if (!j?.renderedItems.length) return !0;
					if (j.virtualFocus) return !1;
					if (o) return !0;
					if (j.activeId === null) return !1;
					const B = t?.item(j.activeId);
					return B?.disabled || !B?.element ? !0 : j.activeId === S;
				},
			}),
			L = (0, _.useCallback)(
				(j) => {
					var B;
					const P = {
						...j,
						id: S || j.id,
						rowId: A,
						disabled: !!T,
						children: (B = j.element) == null ? void 0 : B.textContent,
					};
					return f ? f(P) : P;
				},
				[S, A, T, f],
			),
			Q = v.onFocus,
			K = (0, _.useRef)(!1),
			O = De((j) => {
				if ((Q?.(j), j.defaultPrevented || y_(j) || !S || !t || YN(j, t))) return;
				const { virtualFocus: B, baseElement: P } = t.getState();
				(t.setActiveId(S),
					qh(j.currentTarget) && gM(j.currentTarget),
					B &&
						vr(j) &&
						(PN(j.currentTarget) ||
							(P?.isConnected &&
								(jc() &&
									j.currentTarget.hasAttribute("data-autofocus") &&
									j.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" }),
								(K.current = !0),
								j.relatedTarget === P || ls(t, j.relatedTarget) ? yM(P) : P.focus()))));
			}),
			$ = v.onBlurCapture,
			V = De((j) => {
				if (($?.(j), j.defaultPrevented)) return;
				const B = t?.getState();
				B?.virtualFocus && K.current && ((K.current = !1), j.preventDefault(), j.stopPropagation());
			}),
			Y = v.onKeyDown,
			ae = Mt(u),
			se = Mt(s),
			te = De((j) => {
				if ((Y?.(j), j.defaultPrevented || !vr(j) || !t)) return;
				const { currentTarget: B } = j,
					P = t.getState(),
					ge = t.item(S),
					be = !!ge?.rowId,
					Pe = P.orientation !== "horizontal",
					M = P.orientation !== "vertical",
					D = () => !!(be || M || !P.baseElement || !ii(P.baseElement)),
					le = {
						ArrowUp: (be || Pe) && t.up,
						ArrowRight: (be || M) && t.next,
						ArrowDown: (be || Pe) && t.down,
						ArrowLeft: (be || M) && t.previous,
						Home: () => {
							if (D()) return !be || j.ctrlKey ? t?.first() : t?.previous(-1);
						},
						End: () => {
							if (D()) return !be || j.ctrlKey ? t?.last() : t?.next(-1);
						},
						PageUp: () => M0(B, t, t?.up, !0),
						PageDown: () => M0(B, t, t?.down),
					}[j.key];
				if (le) {
					if (qh(B)) {
						const me = Uh(B),
							Se = M && j.key === "ArrowLeft",
							Re = M && j.key === "ArrowRight",
							Le = Pe && j.key === "ArrowUp",
							Xe = Pe && j.key === "ArrowDown";
						if (Re || Xe) {
							const { length: pt } = cM(B);
							if (me.end !== pt) return;
						} else if ((Se || Le) && me.start !== 0) return;
					}
					const oe = le();
					if (ae(j) || oe !== void 0) {
						if (!se(j)) return;
						(j.preventDefault(), t.move(oe));
					}
				}
			}),
			fe = (0, _.useMemo)(() => ({ id: S, baseElement: N }), [S, N]);
		return (
			(v = Cn(v, (j) => (0, w.jsx)(HM.Provider, { value: fe, children: j }), [fe])),
			(v = {
				id: S,
				"data-active-item": q || void 0,
				...v,
				ref: Wt(b, v.ref),
				tabIndex: k ? v.tabIndex : -1,
				onFocus: O,
				onBlurCapture: V,
				onKeyDown: te,
			}),
			(v = Cm(v)),
			(v = L_({ store: t, ...v, getItem: L, shouldRegisterItem: S ? v.shouldRegisterItem : !1 })),
			au({ ...v, "aria-setsize": I, "aria-posinset": C })
		);
	}),
	ij = Ic(
		Fe(function (t) {
			return We(ZN, Mm(t));
		}),
	),
	GN = "div";
function FN(e, t) {
	if (t != null) return e == null ? !1 : Array.isArray(e) ? e.includes(t) : e === t;
}
function XN(e) {
	var t;
	return (t = { menu: "menuitem", listbox: "option", tree: "treeitem" }[e]) != null ? t : "option";
}
var JN = tt(function ({
		store: t,
		value: i,
		hideOnClick: u,
		setValueOnClick: s,
		selectValueOnClick: o = !0,
		resetValueOnSelect: f,
		focusOnHover: h = !1,
		moveOnKeyPress: m = !0,
		getItem: v,
		...g
	}) {
		var S;
		const b = M_();
		((t = t || b), Jt(t, !1));
		const {
				resetValueOnSelectState: p,
				multiSelectable: T,
				selected: A,
			} = $_(t, {
				resetValueOnSelectState: "resetValueOnSelect",
				multiSelectable(V) {
					return Array.isArray(V.selectedValue);
				},
				selected(V) {
					return FN(V.selectedValue, i);
				},
			}),
			N = (0, _.useCallback)(
				(V) => {
					const Y = { ...V, value: i };
					return v ? v(Y) : Y;
				},
				[i, v],
			);
		((s = s ?? !T), (u = u ?? (i != null && !T)));
		const q = g.onClick,
			I = Mt(s),
			C = Mt(o),
			k = Mt((S = f ?? p) != null ? S : T),
			L = Mt(u),
			Q = De((V) => {
				(q?.(V),
					!V.defaultPrevented &&
						(b_(V) ||
							p_(V) ||
							(i != null &&
								(C(V) &&
									(k(V) && t?.resetValue(),
									t?.setSelectedValue((Y) =>
										Array.isArray(Y) ? (Y.includes(i) ? Y.filter((ae) => ae !== i) : [...Y, i]) : i,
									)),
								I(V) && t?.setValue(i)),
							L(V) && t?.hide())));
			}),
			K = g.onKeyDown,
			O = De((V) => {
				if ((K?.(V), V.defaultPrevented)) return;
				const Y = t?.getState().baseElement;
				Y &&
					(Wa(Y) ||
						((V.key.length === 1 || V.key === "Backspace" || V.key === "Delete") &&
							(queueMicrotask(() => Y.focus()), ii(Y) && t?.setValue(Y.value))));
			});
		(T && A != null && (g = { "aria-selected": A, ...g }),
			(g = Cn(
				g,
				(V) =>
					(0, w.jsx)(TN.Provider, { value: i, children: (0, w.jsx)(xN.Provider, { value: A ?? !1, children: V }) }),
				[i, A],
			)),
			(g = { role: XN((0, _.useContext)(k_)), children: i, ...g, onClick: Q, onKeyDown: O }));
		const $ = Mt(m);
		return (
			(g = Mm({
				store: t,
				...g,
				getItem: N,
				moveOnKeyPress: (V) => {
					if (!$(V)) return !1;
					const Y = new Event("combobox-item-move");
					return (t?.getState().baseElement?.dispatchEvent(Y), !0);
				},
			})),
			(g = km({ store: t, focusOnHover: h, ...g })),
			g
		);
	}),
	WN = Ic(
		Fe(function (t) {
			return We(GN, JN(t));
		}),
	),
	wc = xb(),
	eO = "div";
function N0(e, t) {
	const i = setTimeout(t, e);
	return () => clearTimeout(i);
}
function tO(e) {
	let t = requestAnimationFrame(() => {
		t = requestAnimationFrame(e);
	});
	return () => cancelAnimationFrame(t);
}
function O0(...e) {
	return e
		.join(", ")
		.split(", ")
		.reduce((t, i) => {
			const u = i.endsWith("ms") ? 1 : 1e3,
				s = Number.parseFloat(i || "0s") * u;
			return s > t ? s : t;
		}, 0);
}
function Kc(e, t, i) {
	return !i && t !== !1 && (!e || !!t);
}
var Nm = tt(function ({ store: t, alwaysVisible: i, ...u }) {
		const s = wm();
		((t = t || s), Jt(t, !1));
		const o = (0, _.useRef)(null),
			f = ji(u.id),
			[h, m] = (0, _.useState)(null),
			v = t.useState("open"),
			g = t.useState("mounted"),
			S = t.useState("animated"),
			b = t.useState("contentElement"),
			p = dn(t.disclosure, "contentElement");
		(ot(() => {
			o.current && t?.setContentElement(o.current);
		}, [t]),
			ot(() => {
				let q;
				return (
					t?.setState("animated", (I) => ((q = I), !0)),
					() => {
						q !== void 0 && t?.setState("animated", q);
					}
				);
			}, [t]),
			ot(() => {
				if (S) {
					if (!b?.isConnected) {
						m(null);
						return;
					}
					return tO(() => {
						m(v ? "enter" : g ? "leave" : null);
					});
				}
			}, [S, b, v, g]),
			ot(() => {
				if (!t || !S || !h || !b) return;
				const q = () => t?.setState("animating", !1),
					I = () => (0, wc.flushSync)(q);
				if ((h === "leave" && v) || (h === "enter" && !v)) return;
				if (typeof S == "number") return N0(S, I);
				const {
						transitionDuration: C,
						animationDuration: k,
						transitionDelay: L,
						animationDelay: Q,
					} = getComputedStyle(b),
					{
						transitionDuration: K = "0",
						animationDuration: O = "0",
						transitionDelay: $ = "0",
						animationDelay: V = "0",
					} = p ? getComputedStyle(p) : {},
					Y = O0(L, Q, $, V) + O0(C, k, K, O);
				if (!Y) {
					(h === "enter" && t.setState("animated", !1), q());
					return;
				}
				return N0(Math.max(Y - 1e3 / 60, 0), I);
			}, [t, S, b, p, v, h]),
			(u = Cn(u, (q) => (0, w.jsx)(Em, { value: t, children: q }), [t])));
		const T = Kc(g, u.hidden, i),
			A = u.style,
			N = (0, _.useMemo)(() => (T ? { ...A, display: "none" } : A), [T, A]);
		return (
			(u = {
				id: f,
				"data-open": v || void 0,
				"data-enter": h === "enter" || void 0,
				"data-leave": h === "leave" || void 0,
				hidden: T,
				...u,
				ref: Wt(f ? t.setContentElement : null, o, u.ref),
				style: N,
			}),
			au(u)
		);
	}),
	nO = Fe(function (t) {
		return We(eO, Nm(t));
	}),
	aj = Fe(function ({ unmountOnHide: t, ...i }) {
		const u = wm();
		return dn(i.store || u, (s) => !t || s?.mounted) === !1 ? null : (0, w.jsx)(nO, { ...i });
	}),
	rO = "div",
	B_ = tt(function ({ store: t, alwaysVisible: i, ...u }) {
		const s = M_(!0),
			o = wN();
		t = t || o;
		const f = !!t && t === s;
		Jt(t, !1);
		const h = (0, _.useRef)(null),
			m = ji(u.id),
			v = t.useState("mounted"),
			g = Kc(v, u.hidden, i),
			S = g ? { ...u.style, display: "none" } : u.style,
			b = t.useState((C) => Array.isArray(C.selectedValue)),
			p = zM(h, "role", u.role),
			T = ((p === "listbox" || p === "tree" || p === "grid") && b) || void 0,
			[A, N] = (0, _.useState)(!1),
			q = t.useState("contentElement");
		(ot(() => {
			if (!v) return;
			const C = h.current;
			if (!C || q !== C) return;
			const k = () => {
					N(!!C.querySelector("[role='listbox']"));
				},
				L = new MutationObserver(k);
			return (L.observe(C, { subtree: !0, childList: !0, attributeFilter: ["role"] }), k(), () => L.disconnect());
		}, [v, q]),
			A || (u = { role: "listbox", "aria-multiselectable": T, ...u }),
			(u = Cn(u, (C) => (0, w.jsx)(EN, { value: t, children: (0, w.jsx)(k_.Provider, { value: p, children: C }) }), [
				t,
				p,
			])));
		const I = m && (!s || !f) ? t.setContentElement : null;
		return ((u = { id: m, hidden: g, ...u, ref: Wt(I, h, u.ref), style: S }), au(u));
	}),
	uj = Fe(function (t) {
		return We(rO, B_(t));
	}),
	z0 = (0, _.createContext)(null),
	iO = "span",
	V_ = tt(function (t) {
		return (
			(t = {
				...t,
				style: {
					border: 0,
					clip: "rect(0 0 0 0)",
					height: "1px",
					margin: "-1px",
					overflow: "hidden",
					padding: 0,
					position: "absolute",
					whiteSpace: "nowrap",
					width: "1px",
					...t.style,
				},
			}),
			t
		);
	}),
	lj = Fe(function (t) {
		return We(iO, V_(t));
	}),
	aO = "span",
	uO = tt(function (t) {
		return (
			(t = {
				"data-focus-trap": "",
				tabIndex: 0,
				"aria-hidden": !0,
				...t,
				style: { position: "fixed", top: 0, left: 0, ...t.style },
			}),
			(t = V_(t)),
			t
		);
	}),
	Jo = Fe(function (t) {
		return We(aO, uO(t));
	}),
	lO = "div";
function sO(e) {
	return xt(e).body;
}
function oO(e, t) {
	return t ? (typeof t == "function" ? t(e) : t) : xt(e).createElement("div");
}
function cO(e = "id") {
	return `${e ? `${e}-` : ""}${Math.random().toString(36).slice(2, 8)}`;
}
function oa(e) {
	queueMicrotask(() => {
		e?.focus();
	});
}
var H_ = tt(function ({
		preserveTabOrder: t,
		preserveTabOrderAnchor: i,
		portalElement: u,
		portalRef: s,
		portal: o = !0,
		...f
	}) {
		const h = (0, _.useRef)(null),
			m = Wt(h, f.ref),
			v = (0, _.useContext)(z0),
			[g, S] = (0, _.useState)(null),
			[b, p] = (0, _.useState)(null),
			T = (0, _.useRef)(null),
			A = (0, _.useRef)(null),
			N = (0, _.useRef)(null),
			q = (0, _.useRef)(null);
		return (
			ot(() => {
				const I = h.current;
				if (!I || !o) {
					S(null);
					return;
				}
				const C = oO(I, u);
				if (!C) {
					S(null);
					return;
				}
				const k = C.isConnected;
				if ((k || (v || sO(I)).appendChild(C), C.id || (C.id = I.id ? `portal/${I.id}` : cO()), S(C), Bh(s, C), !k))
					return () => {
						(C.remove(), Bh(s, null));
					};
			}, [o, u, v, s]),
			ot(() => {
				if (!o || !t || !i) return;
				const I = xt(i).createElement("span");
				return (
					(I.style.position = "fixed"),
					i.insertAdjacentElement("afterend", I),
					p(I),
					() => {
						(I.remove(), p(null));
					}
				);
			}, [o, t, i]),
			(0, _.useEffect)(() => {
				if (!g || !t) return;
				let I = 0;
				const C = (k) => {
					if (!Pa(k)) return;
					const L = k.type === "focusin";
					if ((cancelAnimationFrame(I), L)) return JM(g);
					I = requestAnimationFrame(() => {
						XM(g, !0);
					});
				};
				return (
					g.addEventListener("focusin", C, !0),
					g.addEventListener("focusout", C, !0),
					() => {
						(cancelAnimationFrame(I),
							g.removeEventListener("focusin", C, !0),
							g.removeEventListener("focusout", C, !0));
					}
				);
			}, [g, t]),
			(f = Cn(
				f,
				(I) => {
					if (((I = (0, w.jsx)(z0.Provider, { value: g || v, children: I })), !o)) return I;
					if (!g) return (0, w.jsx)("span", { ref: m, id: f.id, style: { position: "fixed" }, hidden: !0 });
					((I = (0, w.jsxs)(w.Fragment, {
						children: [
							t &&
								g &&
								(0, w.jsx)(Jo, {
									ref: A,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-before",
									onFocus: (k) => {
										Pa(k, g) ? oa(oh()) : oa(T.current);
									},
								}),
							I,
							t &&
								g &&
								(0, w.jsx)(Jo, {
									ref: N,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-after",
									onFocus: (k) => {
										Pa(k, g) ? oa(S0()) : oa(q.current);
									},
								}),
						],
					})),
						g && (I = (0, wc.createPortal)(I, g)));
					let C = (0, w.jsxs)(w.Fragment, {
						children: [
							t &&
								g &&
								(0, w.jsx)(Jo, {
									ref: T,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-before",
									onFocus: (k) => {
										k.relatedTarget !== q.current && Pa(k, g) ? oa(A.current) : oa(S0());
									},
								}),
							t && (0, w.jsx)("span", { "aria-owns": g?.id, style: { position: "fixed" } }),
							t &&
								g &&
								(0, w.jsx)(Jo, {
									ref: q,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-after",
									onFocus: (k) => {
										if (Pa(k, g)) oa(N.current);
										else {
											const L = oh();
											if (L === A.current) {
												requestAnimationFrame(() => {
													var Q;
													return (Q = oh()) == null ? void 0 : Q.focus();
												});
												return;
											}
											oa(L);
										}
									},
								}),
						],
					});
					return (b && t && (C = (0, wc.createPortal)(C, b)), (0, w.jsxs)(w.Fragment, { children: [C, I] }));
				},
				[g, v, o, f.id, t, b],
			)),
			(f = { ...f, ref: m }),
			f
		);
	}),
	sj = Fe(function (t) {
		return We(lO, H_(t));
	}),
	D0 = (0, _.createContext)(0);
function fO({ level: e, children: t }) {
	const i = (0, _.useContext)(D0),
		u = Math.max(Math.min(e || i + 1, 6), 1);
	return (0, w.jsx)(D0.Provider, { value: u, children: t });
}
var dO = "div",
	Z_ = tt(function ({ autoFocusOnShow: t = !0, ...i }) {
		return ((i = Cn(i, (u) => (0, w.jsx)(T_.Provider, { value: t, children: u }), [t])), i);
	}),
	oj = Fe(function (t) {
		return We(dO, Z_(t));
	});
function hO(e, t) {
	const i = xt(e).createElement("button");
	return (
		(i.type = "button"),
		(i.tabIndex = -1),
		(i.textContent = "Dismiss popup"),
		Object.assign(i.style, {
			border: "0px",
			clip: "rect(0 0 0 0)",
			height: "1px",
			margin: "-1px",
			overflow: "hidden",
			padding: "0px",
			position: "absolute",
			whiteSpace: "nowrap",
			width: "1px",
		}),
		i.addEventListener("click", t),
		e.prepend(i),
		() => {
			(i.removeEventListener("click", t), i.remove());
		}
	);
}
function mO(e) {
	const t = (0, _.useRef)();
	return (
		(0, _.useEffect)(() => {
			if (!e) {
				t.current = null;
				return;
			}
			return Rn(
				"mousedown",
				(u) => {
					t.current = u.target;
				},
				!0,
			);
		}, [e]),
		t
	);
}
var fh = new WeakMap();
function Cs(e, t, i) {
	fh.has(e) || fh.set(e, new Map());
	const u = fh.get(e),
		s = u.get(t);
	if (!s)
		return (
			u.set(t, i()),
			() => {
				var h;
				((h = u.get(t)) == null || h(), u.delete(t));
			}
		);
	const o = i(),
		f = () => {
			(o(), s(), u.delete(t));
		};
	return (
		u.set(t, f),
		() => {
			u.get(t) === f && (o(), u.set(t, s));
		}
	);
}
function Om(e, t, i) {
	return Cs(e, t, () => {
		const s = e.getAttribute(t);
		return (
			e.setAttribute(t, i),
			() => {
				s == null ? e.removeAttribute(t) : e.setAttribute(t, s);
			}
		);
	});
}
function eu(e, t, i) {
	return Cs(e, t, () => {
		const s = t in e,
			o = e[t];
		return (
			(e[t] = i),
			() => {
				s ? (e[t] = o) : delete e[t];
			}
		);
	});
}
function Zh(e, t) {
	return e
		? Cs(e, "style", () => {
				const u = e.style.cssText;
				return (
					Object.assign(e.style, t),
					() => {
						e.style.cssText = u;
					}
				);
			})
		: () => {};
}
function vO(e, t, i) {
	return e
		? Cs(e, t, () => {
				const s = e.style.getPropertyValue(t);
				return (
					e.style.setProperty(t, i),
					() => {
						s ? e.style.setProperty(t, s) : e.style.removeProperty(t);
					}
				);
			})
		: () => {};
}
var gO = ["SCRIPT", "STYLE"];
function Ph(e) {
	return `__ariakit-dialog-snapshot-${e}`;
}
function yO(e, t) {
	const i = xt(t),
		u = Ph(e);
	if (!i.body[u]) return !0;
	do {
		if (t === i.body) return !1;
		if (t[u]) return !0;
		if (!t.parentElement) return !1;
		t = t.parentElement;
	} while (!0);
}
function pO(e, t, i) {
	return gO.includes(t.tagName) || !yO(e, t) ? !1 : !i.some((u) => u && mn(t, u));
}
function zm(e, t, i, u) {
	for (let s of t) {
		if (!s?.isConnected) continue;
		const o = t.some((m) => (!m || m === s ? !1 : m.contains(s))),
			f = xt(s),
			h = s;
		for (; s.parentElement && s !== f.body; ) {
			if ((u?.(s.parentElement, h), !o)) for (const m of s.parentElement.children) pO(e, m, t) && i(m, h);
			s = s.parentElement;
		}
	}
}
function bO(e, t) {
	const { body: i } = xt(t[0]),
		u = [];
	return (
		zm(e, t, (o) => {
			u.push(eu(o, Ph(e), !0));
		}),
		rr(eu(i, Ph(e), !0), () => {
			for (const o of u) o();
		})
	);
}
function P_(e, ...t) {
	if (!e) return !1;
	const i = e.getAttribute("data-backdrop");
	return i == null ? !1 : i === "" || i === "true" || !t.length ? !0 : t.some((u) => i === u);
}
function tl(e = "", t = !1) {
	return `__ariakit-dialog-${t ? "ancestor" : "outside"}${e ? `-${e}` : ""}`;
}
function _O(e, t = "") {
	return rr(eu(e, tl(), !0), eu(e, tl(t), !0));
}
function Q_(e, t = "") {
	return rr(eu(e, tl("", !0), !0), eu(e, tl(t, !0), !0));
}
function Dm(e, t) {
	const i = tl(t, !0);
	if (e[i]) return !0;
	const u = tl(t);
	do {
		if (e[u]) return !0;
		if (!e.parentElement) return !1;
		e = e.parentElement;
	} while (!0);
}
function j0(e, t) {
	const i = [],
		u = t.map((o) => o?.id);
	return (
		zm(
			e,
			t,
			(o) => {
				P_(o, ...u) || i.unshift(_O(o, e));
			},
			(o, f) => {
				(f.hasAttribute("data-dialog") && f.id !== e) || i.unshift(Q_(o, e));
			},
		),
		() => {
			for (const o of i) o();
		}
	);
}
function SO(e) {
	return e.tagName === "HTML" ? !0 : mn(xt(e).body, e);
}
function wO(e, t) {
	if (!e) return !1;
	if (mn(e, t)) return !0;
	const i = t.getAttribute("aria-activedescendant");
	if (i) {
		const u = xt(e).getElementById(i);
		if (u) return mn(e, u);
	}
	return !1;
}
function EO(e, t) {
	if (!("clientY" in e)) return !1;
	const i = t.getBoundingClientRect();
	return i.width === 0 || i.height === 0
		? !1
		: i.top <= e.clientY && e.clientY <= i.top + i.height && i.left <= e.clientX && e.clientX <= i.left + i.width;
}
function dh({ store: e, type: t, listener: i, capture: u, domReady: s }) {
	const o = De(i),
		f = dn(e, "open"),
		h = (0, _.useRef)(!1);
	(ot(() => {
		if (!f || !s) return;
		const { contentElement: m } = e.getState();
		if (!m) return;
		const v = () => {
			h.current = !0;
		};
		return (m.addEventListener("focusin", v, !0), () => m.removeEventListener("focusin", v, !0));
	}, [e, f, s]),
		(0, _.useEffect)(
			() =>
				f
					? Rn(
							t,
							(v) => {
								const { contentElement: g, disclosureElement: S } = e.getState(),
									b = v.target;
								g &&
									b &&
									SO(b) &&
									(mn(g, b) ||
										wO(S, b) ||
										b.hasAttribute("data-focus-trap") ||
										EO(v, g) ||
										(h.current && !Dm(b, g.id)) ||
										nN(b) ||
										o(v));
							},
							u,
						)
					: void 0,
			[f, u],
		));
}
function hh(e, t) {
	return typeof e == "function" ? e(t) : !!e;
}
function TO(e, t, i) {
	const u = mO(dn(e, "open")),
		s = { store: e, domReady: i, capture: !0 };
	(dh({
		...s,
		type: "click",
		listener: (o) => {
			const { contentElement: f } = e.getState(),
				h = u.current;
			h && c_(h) && Dm(h, f?.id) && hh(t, o) && e.hide();
		},
	}),
		dh({
			...s,
			type: "focusin",
			listener: (o) => {
				const { contentElement: f } = e.getState();
				f && o.target !== xt(f) && hh(t, o) && e.hide();
			},
		}),
		dh({
			...s,
			type: "contextmenu",
			listener: (o) => {
				hh(t, o) && e.hide();
			},
		}));
}
var I0 = (0, _.createContext)({});
function xO(e) {
	const t = (0, _.useContext)(I0),
		[i, u] = (0, _.useState)([]),
		s = (0, _.useCallback)(
			(f) => {
				var h;
				return (
					u((m) => [...m, f]),
					rr((h = t.add) == null ? void 0 : h.call(t, f), () => {
						u((m) => m.filter((v) => v !== f));
					})
				);
			},
			[t],
		);
	ot(
		() =>
			Dn(e, ["open", "contentElement"], (f) => {
				var h;
				if (f.open && f.contentElement) return (h = t.add) == null ? void 0 : h.call(t, e);
			}),
		[e, t],
	);
	const o = (0, _.useMemo)(() => ({ store: e, add: s }), [e, s]);
	return {
		wrapElement: (0, _.useCallback)((f) => (0, w.jsx)(I0.Provider, { value: o, children: f }), [o]),
		nestedDialogs: i,
	};
}
function AO({ attribute: e, contentId: t, contentElement: i, enabled: u }) {
	const [s, o] = w_(),
		f = (0, _.useCallback)(() => {
			if (!u || !i) return !1;
			const { body: h } = xt(i),
				m = h.getAttribute(e);
			return !m || m === t;
		}, [s, u, i, e, t]);
	return (
		(0, _.useEffect)(() => {
			if (!u || !t || !i) return;
			const { body: h } = xt(i);
			if (f()) return (h.setAttribute(e, t), () => h.removeAttribute(e));
			const m = new MutationObserver(() => (0, wc.flushSync)(o));
			return (m.observe(h, { attributeFilter: [e] }), () => m.disconnect());
		}, [s, u, t, i, f, e]),
		f
	);
}
function RO(e) {
	const t = e.getBoundingClientRect().left;
	return Math.round(t) + e.scrollLeft ? "paddingLeft" : "paddingRight";
}
function CO(e, t, i) {
	const u = AO({ attribute: "data-dialog-prevent-body-scroll", contentElement: e, contentId: t, enabled: i });
	(0, _.useEffect)(() => {
		if (!u() || !e) return;
		const s = xt(e),
			o = o_(e),
			{ documentElement: f, body: h } = s,
			m = f.style.getPropertyValue("--scrollbar-width"),
			v = m ? Number.parseInt(m, 10) : o.innerWidth - f.clientWidth,
			g = () => vO(f, "--scrollbar-width", `${v}px`),
			S = RO(f),
			b = () => Zh(h, { overflow: "hidden", [S]: `${v}px` }),
			p = () => {
				var A, N;
				const { scrollX: q, scrollY: I, visualViewport: C } = o,
					k = (A = C?.offsetLeft) != null ? A : 0,
					L = (N = C?.offsetTop) != null ? N : 0,
					Q = Zh(h, {
						position: "fixed",
						overflow: "hidden",
						top: `${-(I - Math.floor(L))}px`,
						left: `${-(q - Math.floor(k))}px`,
						right: "0",
						[S]: `${v}px`,
					});
				return () => {
					(Q(), o.scrollTo({ left: q, top: I, behavior: "instant" }));
				};
			},
			T = mm() && !CM();
		return rr(g(), T ? p() : b());
	}, [u, e]);
}
function kO(e, ...t) {
	if (!e) return !1;
	const i = e.getAttribute("data-focus-trap");
	return i == null ? !1 : t.length ? (i === "" ? !1 : t.some((u) => i === u)) : !0;
}
function K_() {
	return "inert" in HTMLElement.prototype;
}
function MO(e) {
	return Om(e, "aria-hidden", "true");
}
function Y_(e, t) {
	return "style" in e
		? K_()
			? eu(e, "inert", !0)
			: rr(
					...$c(e, !0).map((i) => {
						if (t?.some((s) => s && mn(s, i))) return ss;
						const u = Cs(
							i,
							"focus",
							() => (
								(i.focus = ss),
								() => {
									delete i.focus;
								}
							),
						);
						return rr(Om(i, "tabindex", "-1"), u);
					}),
					MO(e),
					Zh(e, { pointerEvents: "none", userSelect: "none", cursor: "default" }),
				)
		: ss;
}
function NO(e, t) {
	const i = [],
		u = t.map((o) => o?.id);
	return (
		zm(
			e,
			t,
			(o) => {
				P_(o, ...u) || kO(o, ...u) || i.unshift(Y_(o, t));
			},
			(o) => {
				o.hasAttribute("role") && (t.some((f) => f && mn(f, o)) || i.unshift(Om(o, "role", "none")));
			},
		),
		() => {
			for (const o of i) o();
		}
	);
}
function G_(e = {}) {
	const t = Pc(e.store, Rm(e.disclosure, ["contentElement", "disclosureElement"]));
	const i = t?.getState(),
		u = Ie(e.open, i?.open, e.defaultOpen, !1),
		s = Ie(e.animated, i?.animated, !1),
		o = Kr(
			{
				open: u,
				animated: s,
				animating: !!s && u,
				mounted: u,
				contentElement: Ie(i?.contentElement, null),
				disclosureElement: Ie(i?.disclosureElement, null),
			},
			t,
		);
	return (
		Zn(o, () =>
			Dn(o, ["animated", "animating"], (f) => {
				f.animated || o.setState("animating", !1);
			}),
		),
		Zn(o, () =>
			Am(o, ["open"], () => {
				o.getState().animated && o.setState("animating", !0);
			}),
		),
		Zn(o, () =>
			Dn(o, ["open", "animating"], (f) => {
				o.setState("mounted", f.open || f.animating);
			}),
		),
		{
			...o,
			disclosure: e.disclosure,
			setOpen: (f) => o.setState("open", f),
			show: () => o.setState("open", !0),
			hide: () => o.setState("open", !1),
			toggle: () => o.setState("open", (f) => !f),
			stopAnimation: () => o.setState("animating", !1),
			setContentElement: (f) => o.setState("contentElement", f),
			setDisclosureElement: (f) => o.setState("disclosureElement", f),
		}
	);
}
function F_(e, t, i) {
	return (
		il(t, [i.store, i.disclosure]),
		Xt(e, i, "open", "setOpen"),
		Xt(e, i, "mounted", "setMounted"),
		Xt(e, i, "animated"),
		Object.assign(e, { disclosure: i.disclosure })
	);
}
function OO(e = {}) {
	const [t, i] = Qc(G_, e);
	return F_(t, i, e);
}
var zO = "div",
	DO = [
		"a",
		"button",
		"details",
		"dialog",
		"div",
		"form",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"header",
		"img",
		"input",
		"label",
		"li",
		"nav",
		"ol",
		"p",
		"section",
		"select",
		"span",
		"summary",
		"textarea",
		"ul",
		"svg",
	],
	cj = tt(function (t) {
		return t;
	}),
	Ec = Fe(function (t) {
		return We(zO, t);
	});
Object.assign(
	Ec,
	DO.reduce(
		(e, t) => (
			(e[t] = Fe(function (u) {
				return We(t, u);
			})),
			e
		),
		{},
	),
);
function jO({ store: e, backdrop: t, alwaysVisible: i, hidden: u }) {
	const s = (0, _.useRef)(null),
		o = OO({ disclosure: e }),
		f = dn(e, "contentElement");
	((0, _.useEffect)(() => {
		const v = s.current,
			g = f;
		v && g && (v.style.zIndex = getComputedStyle(g).zIndex);
	}, [f]),
		ot(() => {
			const v = f?.id;
			if (!v) return;
			const g = s.current;
			if (g) return Q_(g, v);
		}, [f]));
	const h = Nm({
		ref: s,
		store: o,
		role: "presentation",
		"data-backdrop": f?.id || "",
		alwaysVisible: i,
		hidden: u ?? void 0,
		style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 },
	});
	if (!t) return null;
	if ((0, _.isValidElement)(t)) return (0, w.jsx)(Ec, { ...h, render: t });
	const m = typeof t != "boolean" ? t : "div";
	return (0, w.jsx)(Ec, { ...h, render: (0, w.jsx)(m, {}) });
}
function X_(e = {}) {
	return G_(e);
}
function J_(e, t, i) {
	return F_(e, t, i);
}
function IO(e = {}) {
	const [t, i] = Qc(X_, e);
	return J_(t, i, e);
}
var LO = "div",
	L0 = jc();
function qO(e) {
	const t = Di();
	return !t || (e && mn(e, t)) ? !1 : !!Qr(t);
}
function q0(e, t = !1) {
	if (!e) return null;
	const i = "current" in e ? e.current : e;
	return i ? (t ? (Qr(i) ? i : null) : i) : null;
}
var W_ = tt(function ({
	store: t,
	open: i,
	onClose: u,
	focusable: s = !0,
	modal: o = !0,
	portal: f = !!o,
	backdrop: h = !!o,
	hideOnEscape: m = !0,
	hideOnInteractOutside: v = !0,
	getPersistentElements: g,
	preventBodyScroll: S = !!o,
	autoFocusOnShow: b = !0,
	autoFocusOnHide: p = !0,
	initialFocus: T,
	finalFocus: A,
	unmountOnHide: N,
	unstable_treeSnapshotKey: q,
	...I
}) {
	const C = Bc(),
		k = (0, _.useRef)(null),
		L = IO({
			store: t || C,
			open: i,
			setOpen(ye) {
				if (ye) return;
				const Ce = k.current;
				if (!Ce) return;
				const nt = new Event("close", { bubbles: !1, cancelable: !0 });
				(u && Ce.addEventListener("close", u, { once: !0 }),
					Ce.dispatchEvent(nt),
					nt.defaultPrevented && L.setOpen(!0));
			},
		}),
		{ portalRef: Q, domReady: K } = gm(f, I.portalRef),
		O = I.preserveTabOrder,
		$ = dn(L, (ye) => O && !o && ye.mounted),
		V = ji(I.id),
		Y = dn(L, "open"),
		ae = dn(L, "mounted"),
		se = dn(L, "contentElement"),
		te = Kc(ae, I.hidden, I.alwaysVisible);
	(CO(se, V, S && !te), TO(L, v, K));
	const { wrapElement: fe, nestedDialogs: j } = xO(L);
	((I = Cn(I, fe, [fe])),
		ot(() => {
			if (!Y) return;
			const ye = k.current,
				Ce = Di(ye, !0);
			Ce && Ce.tagName !== "BODY" && ((ye && mn(ye, Ce)) || L.setDisclosureElement(Ce));
		}, [L, Y]),
		L0 &&
			(0, _.useEffect)(() => {
				if (!ae) return;
				const { disclosureElement: ye } = L.getState();
				if (!ye || !ma(ye)) return;
				const Ce = () => {
					let nt = !1;
					const Ve = () => {
						nt = !0;
					};
					(ye.addEventListener("focusin", Ve, { capture: !0, once: !0 }),
						Yu(ye, "mouseup", () => {
							(ye.removeEventListener("focusin", Ve, !0), !nt && x_(ye));
						}));
				};
				return (
					ye.addEventListener("mousedown", Ce),
					() => {
						ye.removeEventListener("mousedown", Ce);
					}
				);
			}, [L, ae]),
		(0, _.useEffect)(() => {
			if (!ae || !K) return;
			const ye = k.current;
			if (!ye) return;
			const Ce = o_(ye),
				nt = Ce.visualViewport || Ce,
				Ve = () => {
					var Bt, et;
					const ce = (et = (Bt = Ce.visualViewport) == null ? void 0 : Bt.height) != null ? et : Ce.innerHeight;
					ye.style.setProperty("--dialog-viewport-height", `${ce}px`);
				};
			return (
				Ve(),
				nt.addEventListener("resize", Ve),
				() => {
					nt.removeEventListener("resize", Ve);
				}
			);
		}, [ae, K]),
		(0, _.useEffect)(() => {
			if (!o || !ae || !K) return;
			const ye = k.current;
			if (ye && !ye.querySelector("[data-dialog-dismiss]")) return hO(ye, L.hide);
		}, [L, o, ae, K]),
		ot(() => {
			if (!K_() || Y || !ae || !K) return;
			const ye = k.current;
			if (ye) return Y_(ye);
		}, [Y, ae, K]));
	const B = Y && K;
	ot(() => {
		if (!V || !B) return;
		const ye = k.current;
		return bO(V, [ye]);
	}, [V, B, q]);
	const P = De(g);
	ot(() => {
		if (!V || !B) return;
		const { disclosureElement: ye } = L.getState(),
			Ce = [k.current, ...(P() || []), ...j.map((nt) => nt.getState().contentElement)];
		return o ? rr(j0(V, Ce), NO(V, Ce)) : j0(V, [ye, ...Ce]);
	}, [V, L, B, P, j, o, q]);
	const ge = !!b,
		be = Mt(b),
		[Pe, M] = (0, _.useState)(!1);
	(0, _.useEffect)(() => {
		if (!Y || !ge || !K || !se?.isConnected) return;
		const ye = q0(T, !0) || se.querySelector("[data-autofocus=true],[autofocus]") || QM(se, !0, f && $) || se,
			Ce = Qr(ye);
		be(Ce ? ye : null) &&
			(M(!0),
			queueMicrotask(() => {
				(ye.focus(), L0 && Ce && ye.scrollIntoView({ block: "nearest", inline: "nearest" }));
			}));
	}, [Y, ge, K, se, T, f, $, be]);
	const D = !!p,
		le = Mt(p),
		[oe, me] = (0, _.useState)(!1);
	(0, _.useEffect)(() => {
		if (Y) return (me(!0), () => me(!1));
	}, [Y]);
	const Se = (0, _.useCallback)(
			(ye, Ce = !0) => {
				const { disclosureElement: nt } = L.getState();
				if (qO(ye)) return;
				let Ve = q0(A) || nt;
				if (Ve?.id) {
					const et = xt(Ve),
						ce = `[aria-activedescendant="${Ve.id}"]`,
						ze = et.querySelector(ce);
					ze && (Ve = ze);
				}
				if (Ve && !Qr(Ve)) {
					const et = Ve.closest("[data-dialog]");
					if (et?.id) {
						const ce = xt(et),
							ze = `[aria-controls~="${et.id}"]`,
							rt = ce.querySelector(ze);
						rt && (Ve = rt);
					}
				}
				const Bt = Ve && Qr(Ve);
				if (!Bt && Ce) {
					requestAnimationFrame(() => Se(ye, !1));
					return;
				}
				le(Bt ? Ve : null) && Bt && Ve?.focus({ preventScroll: !0 });
			},
			[L, A, le],
		),
		Re = (0, _.useRef)(!1);
	(ot(() => {
		if (Y || !oe || !D) return;
		const ye = k.current;
		((Re.current = !0), Se(ye));
	}, [Y, oe, K, D, Se]),
		(0, _.useEffect)(() => {
			if (!oe || !D) return;
			const ye = k.current;
			return () => {
				if (Re.current) {
					Re.current = !1;
					return;
				}
				Se(ye);
			};
		}, [oe, D, Se]));
	const Le = Mt(m);
	((0, _.useEffect)(
		() =>
			!K || !ae
				? void 0
				: Rn(
						"keydown",
						(Ce) => {
							if (Ce.key !== "Escape" || Ce.defaultPrevented) return;
							const nt = k.current;
							if (!nt || Dm(nt)) return;
							const Ve = Ce.target;
							if (!Ve) return;
							const { disclosureElement: Bt } = L.getState();
							!!(Ve.tagName === "BODY" || mn(nt, Ve) || !Bt || mn(Bt, Ve)) && Le(Ce) && L.hide();
						},
						!0,
					),
		[L, K, ae, Le],
	),
		(I = Cn(I, (ye) => (0, w.jsx)(fO, { level: o ? 1 : void 0, children: ye }), [o])));
	const Xe = I.hidden,
		pt = I.alwaysVisible;
	I = Cn(
		I,
		(ye) =>
			h
				? (0, w.jsxs)(w.Fragment, {
						children: [(0, w.jsx)(jO, { store: L, backdrop: h, hidden: Xe, alwaysVisible: pt }), ye],
					})
				: ye,
		[L, h, Xe, pt],
	);
	const [At, vn] = (0, _.useState)(),
		[en, Be] = (0, _.useState)();
	return (
		(I = Cn(
			I,
			(ye) =>
				(0, w.jsx)(Em, {
					value: L,
					children: (0, w.jsx)(bN.Provider, {
						value: vn,
						children: (0, w.jsx)(_N.Provider, { value: Be, children: ye }),
					}),
				}),
			[L],
		)),
		(I = {
			id: V,
			"data-dialog": "",
			role: "dialog",
			tabIndex: s ? -1 : void 0,
			"aria-labelledby": At,
			"aria-describedby": en,
			...I,
			ref: Wt(k, I.ref),
		}),
		(I = Z_({ ...I, autoFocusOnShow: Pe })),
		(I = Nm({ store: L, ...I })),
		(I = Es({ ...I, focusable: s })),
		(I = H_({ portal: f, ...I, portalRef: Q, preserveTabOrder: $ })),
		I
	);
});
function ks(e, t = Bc) {
	return Fe(function (u) {
		const s = t();
		return dn(u.store || s, (o) => !u.unmountOnHide || o?.mounted || !!u.open) ? (0, w.jsx)(e, { ...u }) : null;
	});
}
var fj = ks(
		Fe(function (t) {
			return We(LO, W_(t));
		}),
		Bc,
	),
	va = Math.min,
	ki = Math.max,
	Tc = Math.round,
	Wo = Math.floor,
	Mi = (e) => ({ x: e, y: e }),
	UO = { left: "right", right: "left", bottom: "top", top: "bottom" };
function eS(e, t, i) {
	return ki(e, va(t, i));
}
function ga(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function ya(e) {
	return e.split("-")[0];
}
function al(e) {
	return e.split("-")[1];
}
function jm(e) {
	return e === "x" ? "y" : "x";
}
function Im(e) {
	return e === "y" ? "height" : "width";
}
function ti(e) {
	const t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Lm(e) {
	return jm(ti(e));
}
function $O(e, t, i) {
	i === void 0 && (i = !1);
	const u = al(e),
		s = Lm(e),
		o = Im(s);
	let f = s === "x" ? (u === (i ? "end" : "start") ? "right" : "left") : u === "start" ? "bottom" : "top";
	return (t.reference[o] > t.floating[o] && (f = xc(f)), [f, xc(f)]);
}
function BO(e) {
	const t = xc(e);
	return [Qh(e), t, Qh(t)];
}
function Qh(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var U0 = ["left", "right"],
	$0 = ["right", "left"],
	VO = ["top", "bottom"],
	HO = ["bottom", "top"];
function ZO(e, t, i) {
	switch (e) {
		case "top":
		case "bottom":
			return i ? (t ? $0 : U0) : t ? U0 : $0;
		case "left":
		case "right":
			return t ? VO : HO;
		default:
			return [];
	}
}
function PO(e, t, i, u) {
	const s = al(e);
	let o = ZO(ya(e), i === "start", u);
	return (s && ((o = o.map((f) => f + "-" + s)), t && (o = o.concat(o.map(Qh)))), o);
}
function xc(e) {
	const t = ya(e);
	return UO[t] + e.slice(t.length);
}
function QO(e) {
	var t, i, u, s;
	return {
		top: (t = e.top) != null ? t : 0,
		right: (i = e.right) != null ? i : 0,
		bottom: (u = e.bottom) != null ? u : 0,
		left: (s = e.left) != null ? s : 0,
	};
}
function tS(e) {
	return typeof e != "number" ? QO(e) : { top: e, right: e, bottom: e, left: e };
}
function Ac(e) {
	const { x: t, y: i, width: u, height: s } = e;
	return { width: u, height: s, top: i, left: t, right: t + u, bottom: i + s, x: t, y: i };
}
function B0(e, t, i) {
	let { reference: u, floating: s } = e;
	const o = ti(t),
		f = Lm(t),
		h = Im(f),
		m = ya(t),
		v = o === "y",
		g = u.x + u.width / 2 - s.width / 2,
		S = u.y + u.height / 2 - s.height / 2,
		b = u[h] / 2 - s[h] / 2;
	let p;
	switch (m) {
		case "top":
			p = { x: g, y: u.y - s.height };
			break;
		case "bottom":
			p = { x: g, y: u.y + u.height };
			break;
		case "right":
			p = { x: u.x + u.width, y: S };
			break;
		case "left":
			p = { x: u.x - s.width, y: S };
			break;
		default:
			p = { x: u.x, y: u.y };
	}
	const T = al(t);
	return (T && (p[f] += b * (T === "end" ? 1 : -1) * (i && v ? -1 : 1)), p);
}
async function KO(e, t) {
	var i;
	t === void 0 && (t = {});
	const { x: u, y: s, platform: o, rects: f, elements: h, strategy: m } = e,
		{
			boundary: v = "clippingAncestors",
			rootBoundary: g = "viewport",
			elementContext: S = "floating",
			altBoundary: b = !1,
			padding: p = 0,
		} = ga(t, e),
		T = tS(p),
		A = h[b ? (S === "floating" ? "reference" : "floating") : S],
		N = Ac(
			await o.getClippingRect({
				element:
					(i = await (o.isElement == null ? void 0 : o.isElement(A))) == null || i
						? A
						: A.contextElement || (await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(h.floating))),
				boundary: v,
				rootBoundary: g,
				strategy: m,
			}),
		),
		q = S === "floating" ? { x: u, y: s, width: f.floating.width, height: f.floating.height } : f.reference,
		I = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(h.floating)),
		C = ((await (o.isElement == null ? void 0 : o.isElement(I))) &&
			(await (o.getScale == null ? void 0 : o.getScale(I)))) || { x: 1, y: 1 },
		k = Ac(
			o.convertOffsetParentRelativeRectToViewportRelativeRect
				? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
						elements: h,
						rect: q,
						offsetParent: I,
						strategy: m,
					})
				: q,
		);
	return {
		top: (N.top - k.top + T.top) / C.y,
		bottom: (k.bottom - N.bottom + T.bottom) / C.y,
		left: (N.left - k.left + T.left) / C.x,
		right: (k.right - N.right + T.right) / C.x,
	};
}
var YO = 50,
	GO = async (e, t, i) => {
		const { placement: u = "bottom", strategy: s = "absolute", middleware: o = [], platform: f } = i,
			h = f.detectOverflow ? f : { ...f, detectOverflow: KO },
			m = await (f.isRTL == null ? void 0 : f.isRTL(t));
		let v = await f.getElementRects({ reference: e, floating: t, strategy: s }),
			{ x: g, y: S } = B0(v, u, m),
			b = u,
			p = 0;
		const T = {};
		for (let A = 0; A < o.length; A++) {
			const N = o[A];
			if (!N) continue;
			const { name: q, fn: I } = N,
				{
					x: C,
					y: k,
					data: L,
					reset: Q,
				} = await I({
					x: g,
					y: S,
					initialPlacement: u,
					placement: b,
					strategy: s,
					middlewareData: T,
					rects: v,
					platform: h,
					elements: { reference: e, floating: t },
				});
			((g = C ?? g),
				(S = k ?? S),
				(T[q] = { ...T[q], ...L }),
				Q &&
					p < YO &&
					(p++,
					typeof Q == "object" &&
						(Q.placement && (b = Q.placement),
						Q.rects &&
							(v = Q.rects === !0 ? await f.getElementRects({ reference: e, floating: t, strategy: s }) : Q.rects),
						({ x: g, y: S } = B0(v, b, m))),
					(A = -1)));
		}
		return { x: g, y: S, placement: b, strategy: s, middlewareData: T };
	},
	FO = (e) => ({
		name: "arrow",
		options: e,
		async fn(t) {
			const { x: i, y: u, placement: s, rects: o, platform: f, elements: h, middlewareData: m } = t,
				{ element: v, padding: g = 0 } = ga(e, t) || {};
			if (v == null) return {};
			const S = tS(g),
				b = { x: i, y: u },
				p = Lm(s),
				T = Im(p),
				A = await f.getDimensions(v),
				N = p === "y",
				q = N ? "top" : "left",
				I = N ? "bottom" : "right",
				C = N ? "clientHeight" : "clientWidth",
				k = o.reference[T] + o.reference[p] - b[p] - o.floating[T],
				L = b[p] - o.reference[p],
				Q = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(v));
			let K = Q ? Q[C] : 0;
			(!K || !(await (f.isElement == null ? void 0 : f.isElement(Q)))) && (K = h.floating[C] || o.floating[T]);
			const O = k / 2 - L / 2,
				$ = K / 2 - A[T] / 2 - 1,
				V = va(S[q], $),
				Y = va(S[I], $),
				ae = K - A[T] - Y,
				se = K / 2 - A[T] / 2 + O,
				te = eS(V, se, ae),
				fe = !m.arrow && al(s) != null && se !== te && o.reference[T] / 2 - (se < V ? V : Y) - A[T] / 2 < 0,
				j = fe ? (se < V ? se - V : se - ae) : 0;
			return {
				[p]: b[p] + j,
				data: { [p]: te, centerOffset: se - te - j, ...(fe && { alignmentOffset: j }) },
				reset: fe,
			};
		},
	}),
	XO = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "flip",
				options: e,
				async fn(t) {
					var i, u;
					const { placement: s, middlewareData: o, rects: f, initialPlacement: h, platform: m, elements: v } = t,
						{
							mainAxis: g = !0,
							crossAxis: S = !0,
							fallbackPlacements: b,
							fallbackStrategy: p = "bestFit",
							fallbackAxisSideDirection: T = "none",
							flipAlignment: A = !0,
							...N
						} = ga(e, t);
					if ((i = o.arrow) != null && i.alignmentOffset) return {};
					const q = ya(s),
						I = ti(h),
						C = ya(h) === h,
						k = await (m.isRTL == null ? void 0 : m.isRTL(v.floating)),
						L = b || (C || !A ? [xc(h)] : BO(h)),
						Q = T !== "none";
					!b && Q && L.push(...PO(h, A, T, k));
					const K = [h, ...L],
						O = await m.detectOverflow(t, N),
						$ = [];
					let V = ((u = o.flip) == null ? void 0 : u.overflows) || [];
					if ((g && $.push(O[q]), S)) {
						const te = $O(s, f, k);
						$.push(O[te[0]], O[te[1]]);
					}
					if (((V = [...V, { placement: s, overflows: $ }]), !$.every((te) => te <= 0))) {
						var Y, ae;
						const te = (((Y = o.flip) == null ? void 0 : Y.index) || 0) + 1,
							fe = K[te];
						if (
							fe &&
							(!(S === "alignment" && I !== ti(fe)) ||
								V.every((B) => (ti(B.placement) === I ? B.overflows[0] > 0 : !0)))
						)
							return { data: { index: te, overflows: V }, reset: { placement: fe } };
						let j =
							(ae = V.filter((B) => B.overflows[0] <= 0).sort((B, P) => B.overflows[1] - P.overflows[1])[0]) == null
								? void 0
								: ae.placement;
						if (!j)
							switch (p) {
								case "bestFit": {
									var se;
									const B =
										(se = V.filter((P) => {
											if (Q) {
												const ge = ti(P.placement);
												return ge === I || ge === "y";
											}
											return !0;
										})
											.map((P) => [P.placement, P.overflows.filter((ge) => ge > 0).reduce((ge, be) => ge + be, 0)])
											.sort((P, ge) => P[1] - ge[1])[0]) == null
											? void 0
											: se[0];
									B && (j = B);
									break;
								}
								case "initialPlacement":
									j = h;
									break;
							}
						if (s !== j) return { reset: { placement: j } };
					}
					return {};
				},
			}
		);
	},
	nS = new Set(["left", "top"]);
async function JO(e, t) {
	const { placement: i, platform: u, elements: s } = e,
		o = await (u.isRTL == null ? void 0 : u.isRTL(s.floating)),
		f = ya(i),
		h = al(i),
		m = ti(i) === "y",
		v = nS.has(f) ? -1 : 1,
		g = o && m ? -1 : 1,
		S = ga(t, e);
	let {
		mainAxis: b,
		crossAxis: p,
		alignmentAxis: T,
	} = typeof S == "number"
		? { mainAxis: S, crossAxis: 0, alignmentAxis: null }
		: { mainAxis: S.mainAxis || 0, crossAxis: S.crossAxis || 0, alignmentAxis: S.alignmentAxis };
	return (
		h && typeof T == "number" && (p = h === "end" ? T * -1 : T),
		m ? { x: p * g, y: b * v } : { x: b * v, y: p * g }
	);
}
var WO = function (e) {
		return (
			e === void 0 && (e = 0),
			{
				name: "offset",
				options: e,
				async fn(t) {
					var i, u;
					const { x: s, y: o, placement: f, middlewareData: h } = t,
						m = await JO(t, e);
					return f === ((i = h.offset) == null ? void 0 : i.placement) && (u = h.arrow) != null && u.alignmentOffset
						? {}
						: { x: s + m.x, y: o + m.y, data: { ...m, placement: f } };
				},
			}
		);
	},
	e2 = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "shift",
				options: e,
				async fn(t) {
					const { x: i, y: u, placement: s, platform: o } = t,
						{
							mainAxis: f = !0,
							crossAxis: h = !1,
							limiter: m = {
								fn: (I) => {
									let { x: C, y: k } = I;
									return { x: C, y: k };
								},
							},
							...v
						} = ga(e, t),
						g = { x: i, y: u },
						S = await o.detectOverflow(t, v),
						b = ti(s),
						p = jm(b);
					let T = g[p],
						A = g[b];
					const N = (I, C) => eS(C + S[I === "y" ? "top" : "left"], C, C - S[I === "y" ? "bottom" : "right"]);
					(f && (T = N(p, T)), h && (A = N(b, A)));
					const q = m.fn({ ...t, [p]: T, [b]: A });
					return { ...q, data: { x: q.x - i, y: q.y - u, enabled: { [p]: f, [b]: h } } };
				},
			}
		);
	},
	t2 = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				options: e,
				fn(t) {
					var i, u;
					const { x: s, y: o, placement: f, rects: h, middlewareData: m } = t,
						{ offset: v = 0, mainAxis: g = !0, crossAxis: S = !0 } = ga(e, t),
						b = { x: s, y: o },
						p = ti(f),
						T = jm(p);
					let A = b[T],
						N = b[p];
					const q = ga(v, t),
						I =
							typeof q == "number"
								? { mainAxis: q, crossAxis: 0 }
								: { mainAxis: (i = q.mainAxis) != null ? i : 0, crossAxis: (u = q.crossAxis) != null ? u : 0 };
					if (g) {
						const L = T === "y" ? "height" : "width",
							Q = h.reference[T] - h.floating[L] + I.mainAxis,
							K = h.reference[T] + h.reference[L] - I.mainAxis;
						A < Q ? (A = Q) : A > K && (A = K);
					}
					if (S) {
						var C, k;
						const L = T === "y" ? "width" : "height",
							Q = nS.has(ya(f)),
							K =
								h.reference[p] -
								h.floating[L] +
								((Q && ((C = m.offset) == null ? void 0 : C[p])) || 0) +
								(Q ? 0 : I.crossAxis),
							O =
								h.reference[p] +
								h.reference[L] +
								(Q ? 0 : ((k = m.offset) == null ? void 0 : k[p]) || 0) -
								(Q ? I.crossAxis : 0);
						N < K ? (N = K) : N > O && (N = O);
					}
					return { [T]: A, [p]: N };
				},
			}
		);
	},
	n2 = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "size",
				options: e,
				async fn(t) {
					const { placement: i, rects: u, platform: s, elements: o } = t,
						{ apply: f = () => {}, ...h } = ga(e, t),
						m = await s.detectOverflow(t, h),
						v = ya(i),
						g = al(i),
						S = ti(i) === "y",
						{ width: b, height: p } = u.floating;
					let T, A;
					v === "top" || v === "bottom"
						? ((T = v),
							(A =
								g === ((await (s.isRTL == null ? void 0 : s.isRTL(o.floating))) ? "start" : "end") ? "left" : "right"))
						: ((A = v), (T = g === "end" ? "top" : "bottom"));
					const N = p - m.top - m.bottom,
						q = b - m.left - m.right,
						I = va(p - m[T], N),
						C = va(b - m[A], q),
						k = t.middlewareData.shift,
						L = !k;
					let Q = I,
						K = C;
					(k != null && k.enabled.x && (K = q),
						k != null && k.enabled.y && (Q = N),
						L && !g && (S ? (K = b - 2 * ki(m.left, m.right)) : (Q = p - 2 * ki(m.top, m.bottom))),
						await f({ ...t, availableWidth: K, availableHeight: Q }));
					const O = await s.getDimensions(o.floating);
					return b !== O.width || p !== O.height ? { reset: { rects: !0 } } : {};
				},
			}
		);
	};
function Yc() {
	return typeof window < "u";
}
function ul(e) {
	return rS(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function nr(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ii(e) {
	var t;
	return (t = (rS(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function rS(e) {
	return Yc() ? e instanceof Node || e instanceof nr(e).Node : !1;
}
function ni(e) {
	return Yc() ? e instanceof Element || e instanceof nr(e).Element : !1;
}
function _a(e) {
	return Yc() ? e instanceof HTMLElement || e instanceof nr(e).HTMLElement : !1;
}
function V0(e) {
	return !Yc() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof nr(e).ShadowRoot;
}
function Gc(e) {
	const { overflow: t, overflowX: i, overflowY: u, display: s } = ri(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + u + i) && s !== "inline" && s !== "contents";
}
function r2(e) {
	return /^(table|td|th)$/.test(ul(e));
}
function Fc(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var i2 = /transform|translate|scale|rotate|perspective|filter/,
	a2 = /paint|layout|strict|content/,
	Za = (e) => !!e && e !== "none",
	mh;
function qm(e) {
	const t = ni(e) ? ri(e) : e;
	return (
		Za(t.transform) ||
		Za(t.translate) ||
		Za(t.scale) ||
		Za(t.rotate) ||
		Za(t.perspective) ||
		(!Um() && (Za(t.backdropFilter) || Za(t.filter))) ||
		i2.test(t.willChange || "") ||
		a2.test(t.contain || "")
	);
}
function u2(e) {
	let t = tu(e);
	for (; _a(t) && !vs(t); ) {
		if (qm(t)) return t;
		if (Fc(t)) return null;
		t = tu(t);
	}
	return null;
}
function Um() {
	return (mh == null && (mh = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), mh);
}
function vs(e) {
	return /^(html|body|#document)$/.test(ul(e));
}
function ri(e) {
	return nr(e).getComputedStyle(e);
}
function Xc(e) {
	return ni(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function tu(e) {
	if (ul(e) === "html") return e;
	const t = e.assignedSlot || e.parentNode || (V0(e) && e.host) || Ii(e);
	return V0(t) ? t.host : t;
}
function iS(e) {
	const t = tu(e);
	return vs(t) ? (e.ownerDocument || e).body : _a(t) && Gc(t) ? t : iS(t);
}
function gs(e, t, i) {
	var u;
	(t === void 0 && (t = []), i === void 0 && (i = !0));
	const s = iS(e),
		o = s === ((u = e.ownerDocument) == null ? void 0 : u.body),
		f = nr(s);
	if (o) {
		const h = Kh(f);
		return t.concat(f, f.visualViewport || [], Gc(s) ? s : [], h && i ? gs(h) : []);
	} else return t.concat(s, gs(s, [], i));
}
function Kh(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function aS(e) {
	const t = ri(e);
	let i = parseFloat(t.width) || 0,
		u = parseFloat(t.height) || 0;
	const s = _a(e),
		o = s ? e.offsetWidth : i,
		f = s ? e.offsetHeight : u,
		h = Tc(i) !== o || Tc(u) !== f;
	return (h && ((i = o), (u = f)), { width: i, height: u, $: h });
}
function $m(e) {
	return ni(e) ? e : e.contextElement;
}
function Gu(e) {
	const t = $m(e);
	if (!_a(t)) return Mi(1);
	const i = t.getBoundingClientRect(),
		{ width: u, height: s, $: o } = aS(t);
	let f = (o ? Tc(i.width) : i.width) / u,
		h = (o ? Tc(i.height) : i.height) / s;
	return ((!f || !Number.isFinite(f)) && (f = 1), (!h || !Number.isFinite(h)) && (h = 1), { x: f, y: h });
}
var l2 = Mi(0);
function uS(e) {
	const t = nr(e);
	return !Um() || !t.visualViewport ? l2 : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function s2(e, t, i) {
	return (t === void 0 && (t = !1), !!i && t && i === nr(e));
}
function nu(e, t, i, u) {
	(t === void 0 && (t = !1), i === void 0 && (i = !1));
	const s = e.getBoundingClientRect(),
		o = $m(e);
	let f = Mi(1);
	t && (u ? ni(u) && (f = Gu(u)) : (f = Gu(e)));
	const h = s2(o, i, u) ? uS(o) : Mi(0);
	let m = (s.left + h.x) / f.x,
		v = (s.top + h.y) / f.y,
		g = s.width / f.x,
		S = s.height / f.y;
	if (o && u) {
		const b = nr(o),
			p = ni(u) ? nr(u) : u;
		let T = b,
			A = Kh(T);
		for (; A && p !== T; ) {
			const N = Gu(A),
				q = A.getBoundingClientRect(),
				I = ri(A),
				C = q.left + (A.clientLeft + parseFloat(I.paddingLeft)) * N.x,
				k = q.top + (A.clientTop + parseFloat(I.paddingTop)) * N.y;
			((m *= N.x), (v *= N.y), (g *= N.x), (S *= N.y), (m += C), (v += k), (T = nr(A)), (A = Kh(T)));
		}
	}
	return Ac({ width: g, height: S, x: m, y: v });
}
function Jc(e, t) {
	const i = Xc(e).scrollLeft;
	return t ? t.left + i : nu(Ii(e)).left + i;
}
function lS(e, t) {
	const i = e.getBoundingClientRect();
	return { x: i.left + t.scrollLeft - Jc(e, i), y: i.top + t.scrollTop };
}
function o2(e) {
	let { elements: t, rect: i, offsetParent: u, strategy: s } = e;
	const o = s === "fixed",
		f = Ii(u),
		h = t ? Fc(t.floating) : !1;
	if (u === f || (h && o)) return i;
	let m = { scrollLeft: 0, scrollTop: 0 },
		v = Mi(1);
	const g = Mi(0),
		S = _a(u);
	if ((S || !o) && ((ul(u) !== "body" || Gc(f)) && (m = Xc(u)), S)) {
		const p = nu(u);
		((v = Gu(u)), (g.x = p.x + u.clientLeft), (g.y = p.y + u.clientTop));
	}
	const b = f && !S && !o ? lS(f, m) : Mi(0);
	return {
		width: i.width * v.x,
		height: i.height * v.y,
		x: i.x * v.x - m.scrollLeft * v.x + g.x + b.x,
		y: i.y * v.y - m.scrollTop * v.y + g.y + b.y,
	};
}
function c2(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function f2(e) {
	const t = Xc(e),
		i = e.ownerDocument.body,
		u = ki(e.scrollWidth, e.clientWidth, i.scrollWidth, i.clientWidth),
		s = ki(e.scrollHeight, e.clientHeight, i.scrollHeight, i.clientHeight);
	let o = -t.scrollLeft + Jc(e);
	const f = -t.scrollTop;
	return (
		ri(i).direction === "rtl" && (o += ki(e.clientWidth, i.clientWidth) - u),
		{ width: u, height: s, x: o, y: f }
	);
}
var d2 = 25;
function h2(e, t, i) {
	i === void 0 && (i = "viewport");
	const u = i === "layoutViewport",
		s = nr(e),
		o = Ii(e),
		f = s.visualViewport;
	let h = o.clientWidth,
		m = o.clientHeight,
		v = 0,
		g = 0;
	if (f) {
		const S = !Um() || t === "fixed";
		u
			? S || ((v = -f.offsetLeft), (g = -f.offsetTop))
			: ((h = f.width), (m = f.height), S && ((v = f.offsetLeft), (g = f.offsetTop)));
	}
	if (Jc(o) <= 0) {
		const S = o.ownerDocument,
			b = S.body,
			p = getComputedStyle(b),
			T = (S.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight)) || 0,
			A = Math.abs(o.clientWidth - b.clientWidth - T),
			N = getComputedStyle(o).scrollbarGutter === "stable both-edges" ? A / 2 : A;
		N <= d2 && (h -= N);
	}
	return { width: h, height: m, x: v, y: g };
}
function m2(e, t) {
	const i = nu(e, !0, t === "fixed"),
		u = i.top + e.clientTop,
		s = i.left + e.clientLeft,
		o = Gu(e);
	return { width: e.clientWidth * o.x, height: e.clientHeight * o.y, x: s * o.x, y: u * o.y };
}
function H0(e, t, i) {
	let u;
	if (t === "viewport" || t === "layoutViewport") u = h2(e, i, t);
	else if (t === "document") u = f2(Ii(e));
	else if (ni(t)) u = m2(t, i);
	else {
		const s = uS(e);
		u = { x: t.x - s.x, y: t.y - s.y, width: t.width, height: t.height };
	}
	return Ac(u);
}
function v2(e, t) {
	const i = t.get(e);
	if (i) return i;
	let u = gs(e, [], !1).filter((h) => ni(h) && ul(h) !== "body"),
		s = null;
	const o = ri(e).position === "fixed";
	let f = o ? tu(e) : e;
	for (; ni(f) && !vs(f); ) {
		const h = ri(f),
			m = qm(f),
			v = s ? s.position : o ? "fixed" : "";
		(!m && (v === "fixed" || (v === "absolute" && h.position === "static")) ? (u = u.filter((g) => g !== f)) : (s = h),
			(f = tu(f)));
	}
	return (t.set(e, u), u);
}
function g2(e) {
	let { element: t, boundary: i, rootBoundary: u, strategy: s } = e;
	const o = [...(i === "clippingAncestors" ? (Fc(t) ? [] : v2(t, this._c)) : [].concat(i)), u],
		f = H0(t, o[0], s);
	let h = f.top,
		m = f.right,
		v = f.bottom,
		g = f.left;
	for (let S = 1; S < o.length; S++) {
		const b = H0(t, o[S], s);
		((h = ki(b.top, h)), (m = va(b.right, m)), (v = va(b.bottom, v)), (g = ki(b.left, g)));
	}
	return { width: m - g, height: v - h, x: g, y: h };
}
function y2(e) {
	const { width: t, height: i } = aS(e);
	return { width: t, height: i };
}
function p2(e, t, i) {
	const u = _a(t),
		s = Ii(t),
		o = i === "fixed",
		f = nu(e, !0, o, t);
	let h = { scrollLeft: 0, scrollTop: 0 };
	const m = Mi(0);
	if ((u || !o) && ((ul(t) !== "body" || Gc(s)) && (h = Xc(t)), u)) {
		const g = nu(t, !0, o, t);
		((m.x = g.x + t.clientLeft), (m.y = g.y + t.clientTop));
	}
	!u && s && (m.x = Jc(s));
	const v = s && !u && !o ? lS(s, h) : Mi(0);
	return { x: f.left + h.scrollLeft - m.x - v.x, y: f.top + h.scrollTop - m.y - v.y, width: f.width, height: f.height };
}
function vh(e) {
	return ri(e).position === "static";
}
function Z0(e, t) {
	if (!_a(e) || ri(e).position === "fixed") return null;
	if (t) return t(e);
	let i = e.offsetParent;
	return (Ii(e) === i && (i = i.ownerDocument.body), i);
}
function sS(e, t) {
	const i = nr(e);
	if (Fc(e)) return i;
	if (!_a(e)) {
		let s = tu(e);
		for (; s && !vs(s); ) {
			if (ni(s) && !vh(s)) return s;
			s = tu(s);
		}
		return i;
	}
	let u = Z0(e, t);
	for (; u && r2(u) && vh(u); ) u = Z0(u, t);
	return u && vs(u) && vh(u) && !qm(u) ? i : u || u2(e) || i;
}
var b2 = async function (e) {
	const t = this.getOffsetParent || sS,
		i = this.getDimensions,
		u = await i(e.floating);
	return {
		reference: p2(e.reference, await t(e.floating), e.strategy),
		floating: { x: 0, y: 0, width: u.width, height: u.height },
	};
};
function _2(e) {
	return ri(e).direction === "rtl";
}
var S2 = {
	convertOffsetParentRelativeRectToViewportRelativeRect: o2,
	getDocumentElement: Ii,
	getClippingRect: g2,
	getOffsetParent: sS,
	getElementRects: b2,
	getClientRects: c2,
	getDimensions: y2,
	getScale: Gu,
	isElement: ni,
	isRTL: _2,
};
function oS(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function w2(e, t, i) {
	let u = null,
		s;
	const o = Ii(e);
	function f() {
		var g;
		(clearTimeout(s), (g = u) == null || g.disconnect(), (u = null));
	}
	function h(g, S) {
		(g === void 0 && (g = !1), S === void 0 && (S = 1), f());
		const b = e.getBoundingClientRect(),
			{ left: p, top: T, width: A, height: N } = b;
		if ((g || t(), !A || !N)) return;
		const q = Wo(T),
			I = Wo(o.clientWidth - (p + A)),
			C = Wo(o.clientHeight - (T + N)),
			k = Wo(p),
			L = { rootMargin: -q + "px " + -I + "px " + -C + "px " + -k + "px", threshold: ki(0, va(1, S)) || 1 };
		let Q = !0;
		function K(O) {
			const $ = O[0].intersectionRatio;
			if (!oS(b, e.getBoundingClientRect())) return h();
			if ($ !== S) {
				if (!Q) return h();
				$
					? h(!1, $)
					: (s = setTimeout(() => {
							h(!1, 1e-7);
						}, 1e3));
			}
			Q = !1;
		}
		try {
			u = new IntersectionObserver(K, { ...L, root: o.ownerDocument });
		} catch {
			u = new IntersectionObserver(K, L);
		}
		u.observe(e);
	}
	const m = nr(e),
		v = () => h(i);
	return (
		m.addEventListener("resize", v),
		h(!0),
		() => {
			(m.removeEventListener("resize", v), f());
		}
	);
}
function E2(e, t, i, u) {
	u === void 0 && (u = {});
	const {
			ancestorScroll: s = !0,
			ancestorResize: o = !0,
			elementResize: f = typeof ResizeObserver == "function",
			layoutShift: h = typeof IntersectionObserver == "function",
			animationFrame: m = !1,
		} = u,
		v = $m(e),
		g = s || o ? [...(v ? gs(v) : []), ...(t ? gs(t) : [])] : [];
	g.forEach((q) => {
		(s && q.addEventListener("scroll", i), o && q.addEventListener("resize", i));
	});
	const S = v && h ? w2(v, i, o) : null;
	let b = -1,
		p = null;
	f &&
		((p = new ResizeObserver((q) => {
			let [I] = q;
			(I &&
				I.target === v &&
				p &&
				t &&
				(p.unobserve(t),
				cancelAnimationFrame(b),
				(b = requestAnimationFrame(() => {
					var C;
					(C = p) == null || C.observe(t);
				}))),
				i());
		})),
		v && !m && p.observe(v),
		t && p.observe(t));
	let T,
		A = m ? nu(e) : null;
	m && N();
	function N() {
		const q = nu(e);
		(A && !oS(A, q) && i(), (A = q), (T = requestAnimationFrame(N)));
	}
	return (
		i(),
		() => {
			var q;
			(g.forEach((I) => {
				(s && I.removeEventListener("scroll", i), o && I.removeEventListener("resize", i));
			}),
				S?.(),
				(q = p) == null || q.disconnect(),
				(p = null),
				m && cancelAnimationFrame(T));
		}
	);
}
var T2 = WO,
	x2 = e2,
	A2 = XO,
	R2 = n2,
	C2 = FO,
	k2 = t2,
	M2 = (e, t, i) => {
		const u = new Map(),
			s = i ?? {},
			o = { ...S2, ...s.platform, _c: u };
		return GO(e, t, { ...s, platform: o });
	},
	N2 = "div";
function P0(e = 0, t = 0, i = 0, u = 0) {
	if (typeof DOMRect == "function") return new DOMRect(e, t, i, u);
	const s = { x: e, y: t, width: i, height: u, top: t, right: e + i, bottom: t + u, left: e };
	return { ...s, toJSON: () => s };
}
function O2(e) {
	if (!e) return P0();
	const { x: t, y: i, width: u, height: s } = e;
	return P0(t, i, u, s);
}
function z2(e, t) {
	return {
		contextElement: e || void 0,
		getBoundingClientRect: () => {
			const i = e,
				u = t?.(i);
			return u || !i ? O2(u) : i.getBoundingClientRect();
		},
	};
}
function D2(e) {
	return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e);
}
function Q0(e) {
	const t = window.devicePixelRatio || 1;
	return Math.round(e * t) / t;
}
function j2(e, t) {
	return T2(({ placement: i }) => {
		var u;
		const s = (e?.clientHeight || 0) / 2,
			o = typeof t.gutter == "number" ? t.gutter + s : (u = t.gutter) != null ? u : s;
		return { crossAxis: i.split("-")[1] ? void 0 : t.shift, mainAxis: o, alignmentAxis: t.shift };
	});
}
function I2(e) {
	if (e.flip === !1) return;
	const t = typeof e.flip == "string" ? e.flip.split(" ") : void 0;
	return (Jt(!t || t.every(D2), !1), A2({ padding: e.overflowPadding, fallbackPlacements: t }));
}
function L2(e) {
	if (!(!e.slide && !e.overlap))
		return x2({ mainAxis: e.slide, crossAxis: e.overlap, padding: e.overflowPadding, limiter: k2() });
}
function q2(e) {
	return R2({
		padding: e.overflowPadding,
		apply({ elements: t, availableWidth: i, availableHeight: u, rects: s }) {
			const o = t.floating,
				f = Math.round(s.reference.width);
			((i = Math.floor(i)),
				(u = Math.floor(u)),
				o.style.setProperty("--popover-anchor-width", `${f}px`),
				o.style.setProperty("--popover-available-width", `${i}px`),
				o.style.setProperty("--popover-available-height", `${u}px`),
				e.sameWidth && (o.style.width = `${f}px`),
				e.fitViewport && ((o.style.maxWidth = `${i}px`), (o.style.maxHeight = `${u}px`)));
		},
	});
}
function U2(e, t) {
	if (e) return C2({ element: e, padding: t.arrowPadding });
}
var Bm = tt(function ({
		store: t,
		modal: i = !1,
		portal: u = !!i,
		preserveTabOrder: s = !0,
		autoFocusOnShow: o = !0,
		wrapperProps: f,
		fixed: h = !1,
		flip: m = !0,
		shift: v = 0,
		slide: g = !0,
		overlap: S = !1,
		sameWidth: b = !1,
		fitViewport: p = !1,
		gutter: T,
		arrowPadding: A = 4,
		overflowPadding: N = 8,
		getAnchorRect: q,
		updatePosition: I,
		...C
	}) {
		const k = Vc();
		((t = t || k), Jt(t, !1));
		const L = t.useState("arrowElement"),
			Q = t.useState("anchorElement"),
			K = t.useState("disclosureElement"),
			O = t.useState("popoverElement"),
			$ = t.useState("contentElement"),
			V = t.useState("placement"),
			Y = t.useState("mounted"),
			ae = t.useState("rendered"),
			se = (0, _.useRef)(null),
			[te, fe] = (0, _.useState)(!1),
			{ portalRef: j, domReady: B } = gm(u, C.portalRef),
			P = De(q),
			ge = De(I),
			be = !!I;
		(ot(() => {
			if (!O?.isConnected) return;
			O.style.setProperty("--popover-overflow-padding", `${N}px`);
			const M = z2(Q, P),
				D = async () => {
					if (!Y) return;
					L || (se.current = se.current || document.createElement("div"));
					const me = L || se.current,
						Se = [
							j2(me, { gutter: T, shift: v }),
							I2({ flip: m, overflowPadding: N }),
							L2({ slide: g, shift: v, overlap: S, overflowPadding: N }),
							U2(me, { arrowPadding: A }),
							q2({ sameWidth: b, fitViewport: p, overflowPadding: N }),
						],
						Re = await M2(M, O, { placement: V, strategy: h ? "fixed" : "absolute", middleware: Se });
					(t?.setState("currentPlacement", Re.placement), fe(!0));
					const Le = Q0(Re.x),
						Xe = Q0(Re.y);
					if (
						(Object.assign(O.style, { top: "0", left: "0", transform: `translate3d(${Le}px,${Xe}px,0)` }),
						me && Re.middlewareData.arrow)
					) {
						const { x: pt, y: At } = Re.middlewareData.arrow,
							vn = Re.placement.split("-")[0],
							en = me.clientWidth / 2,
							Be = me.clientHeight / 2,
							ye = pt != null ? pt + en : -en,
							Ce = At != null ? At + Be : -Be;
						(O.style.setProperty(
							"--popover-transform-origin",
							{
								top: `${ye}px calc(100% + ${Be}px)`,
								bottom: `${ye}px ${-Be}px`,
								left: `calc(100% + ${en}px) ${Ce}px`,
								right: `${-en}px ${Ce}px`,
							}[vn],
						),
							Object.assign(me.style, {
								left: pt != null ? `${pt}px` : "",
								top: At != null ? `${At}px` : "",
								[vn]: "100%",
							}));
					}
				},
				oe = E2(
					M,
					O,
					async () => {
						be ? (await ge({ updatePosition: D }), fe(!0)) : await D();
					},
					{ elementResize: typeof ResizeObserver == "function" },
				);
			return () => {
				(fe(!1), oe());
			};
		}, [t, ae, O, L, Q, O, V, Y, B, h, m, v, g, S, b, p, T, A, N, P, be, ge]),
			ot(() => {
				if (!Y || !B || !O?.isConnected || !$?.isConnected) return;
				const M = () => {
					O.style.zIndex = getComputedStyle($).zIndex;
				};
				M();
				let D = requestAnimationFrame(() => {
					D = requestAnimationFrame(M);
				});
				return () => cancelAnimationFrame(D);
			}, [Y, B, O, $]));
		const Pe = h ? "fixed" : "absolute";
		return (
			(C = Cn(
				C,
				(M) =>
					(0, w.jsx)("div", {
						...f,
						style: { position: Pe, top: 0, left: 0, width: "max-content", ...f?.style },
						ref: t?.setPopoverElement,
						children: M,
					}),
				[t, Pe, f],
			)),
			(C = Cn(C, (M) => (0, w.jsx)(Hc, { value: t, children: M }), [t])),
			(C = { "data-placing": !te || void 0, ...C, style: { position: "relative", ...C.style } }),
			(C = W_({
				store: t,
				modal: i,
				portal: u,
				preserveTabOrder: s,
				preserveTabOrderAnchor: K || Q,
				autoFocusOnShow: te && o,
				...C,
				portalRef: j,
			})),
			C
		);
	}),
	dj = ks(
		Fe(function (t) {
			return We(N2, Bm(t));
		}),
		Vc,
	),
	$2 = "div";
function B2(e, ...t) {
	if (!e) return !1;
	if ("id" in e) {
		const i = t
			.filter(Boolean)
			.map((u) => `[aria-controls~="${u}"]`)
			.join(", ");
		return i ? e.matches(i) : !1;
	}
	return !1;
}
var V2 = tt(function ({
		store: t,
		modal: i,
		tabIndex: u,
		alwaysVisible: s,
		autoFocusOnHide: o = !0,
		hideOnInteractOutside: f = !0,
		...h
	}) {
		const m = Zc();
		((t = t || m), Jt(t, !1));
		const v = t.useState("baseElement"),
			g = (0, _.useRef)(!1),
			S = dn(t.tag, (b) => b?.renderedItems.length);
		return (
			(h = B_({ store: t, alwaysVisible: s, ...h })),
			(h = Bm({
				store: t,
				modal: i,
				alwaysVisible: s,
				backdrop: !1,
				autoFocusOnShow: !1,
				finalFocus: v,
				preserveTabOrderAnchor: null,
				unstable_treeSnapshotKey: S,
				...h,
				getPersistentElements() {
					var b;
					const p = ((b = h.getPersistentElements) == null ? void 0 : b.call(h)) || [];
					if (!i || !t) return p;
					const { contentElement: T, baseElement: A } = t.getState();
					if (!A) return p;
					const N = xt(A),
						q = [];
					if ((T?.id && q.push(`[aria-controls~="${T.id}"]`), A?.id && q.push(`[aria-controls~="${A.id}"]`), !q.length))
						return [...p, A];
					const I = q.join(","),
						C = N.querySelectorAll(I);
					return [...p, ...C];
				},
				autoFocusOnHide(b) {
					return Dc(o, b) ? !1 : g.current ? ((g.current = !1), !1) : !0;
				},
				hideOnInteractOutside(b) {
					var p, T;
					const A = t?.getState(),
						N = (p = A?.contentElement) == null ? void 0 : p.id,
						q = (T = A?.baseElement) == null ? void 0 : T.id;
					if (B2(b.target, N, q)) return !1;
					const I = typeof f == "function" ? f(b) : f;
					return (I && (g.current = b.type === "click"), I);
				},
			})),
			h
		);
	}),
	H2 = ks(
		Fe(function (t) {
			return We($2, V2(t));
		}),
		Zc,
	),
	hj = (0, _.createContext)(null),
	mj = (0, _.createContext)(null),
	Ms = ai([ws], [qc]),
	Z2 = Ms.useContext,
	vj = Ms.useScopedContext,
	gj = Ms.useProviderContext,
	yj = Ms.ContextProvider,
	pj = Ms.ScopedContextProvider;
function cS({ popover: e, ...t } = {}) {
	const i = Pc(
		t.store,
		Rm(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
	);
	const u = i?.getState(),
		s = X_({ ...t, store: i }),
		o = Ie(t.placement, u?.placement, "bottom"),
		f = Kr(
			{
				...s.getState(),
				placement: o,
				currentPlacement: o,
				anchorElement: Ie(u?.anchorElement, null),
				popoverElement: Ie(u?.popoverElement, null),
				arrowElement: Ie(u?.arrowElement, null),
				rendered: Symbol("rendered"),
			},
			s,
			i,
		);
	return {
		...s,
		...f,
		setAnchorElement: (h) => f.setState("anchorElement", h),
		setPopoverElement: (h) => f.setState("popoverElement", h),
		setArrowElement: (h) => f.setState("arrowElement", h),
		render: () => f.setState("rendered", Symbol("rendered")),
	};
}
function fS(e, t, i) {
	return (il(t, [i.popover]), Xt(e, i, "placement"), J_(e, t, i));
}
function P2(e) {
	var t;
	const i = e.find((o) => !!o.element),
		u = [...e].reverse().find((o) => !!o.element);
	let s = (t = i?.element) == null ? void 0 : t.parentElement;
	for (; s && u?.element; ) {
		if (u && s.contains(u.element)) return s;
		s = s.parentElement;
	}
	return xt(s).body;
}
function Q2(e) {
	return e?.__unstablePrivateStore;
}
function K2(e = {}) {
	var t;
	e.store;
	const i = (t = e.store) == null ? void 0 : t.getState(),
		u = Ie(e.items, i?.items, e.defaultItems, []),
		s = new Map(u.map((b) => [b.id, b])),
		o = { items: u, renderedItems: Ie(i?.renderedItems, []) },
		f = Q2(e.store),
		h = Kr({ items: u, renderedItems: o.renderedItems }, f),
		m = Kr(o, e.store),
		v = (b) => {
			const p = d_(b, (T) => T.element);
			(h.setState("renderedItems", p), m.setState("renderedItems", p));
		};
	(Zn(m, () => xm(h)),
		Zn(h, () =>
			Sc(h, ["items"], (b) => {
				m.setState("items", b.items);
			}),
		),
		Zn(h, () =>
			Sc(h, ["renderedItems"], (b) => {
				let p = !0,
					T = requestAnimationFrame(() => {
						const { renderedItems: I } = m.getState();
						b.renderedItems !== I && v(b.renderedItems);
					});
				if (typeof IntersectionObserver != "function") return () => cancelAnimationFrame(T);
				const A = () => {
						if (p) {
							p = !1;
							return;
						}
						(cancelAnimationFrame(T), (T = requestAnimationFrame(() => v(b.renderedItems))));
					},
					N = P2(b.renderedItems),
					q = new IntersectionObserver(A, { root: N });
				for (const I of b.renderedItems) I.element && q.observe(I.element);
				return () => {
					(cancelAnimationFrame(T), q.disconnect());
				};
			}),
		));
	const g = (b, p, T = !1) => {
			let A;
			return (
				p((q) => {
					const I = q.findIndex(({ id: k }) => k === b.id),
						C = q.slice();
					if (I !== -1) {
						A = q[I];
						const k = { ...A, ...b };
						((C[I] = k), s.set(b.id, k));
					} else (C.push(b), s.set(b.id, b));
					return C;
				}),
				() => {
					p((q) => {
						if (!A) return (T && s.delete(b.id), q.filter(({ id: k }) => k !== b.id));
						const I = q.findIndex(({ id: k }) => k === b.id);
						if (I === -1) return q;
						const C = q.slice();
						return ((C[I] = A), s.set(b.id, A), C);
					});
				}
			);
		},
		S = (b) => g(b, (p) => h.setState("items", p), !0);
	return {
		...m,
		registerItem: S,
		renderItem: (b) =>
			rr(
				S(b),
				g(b, (p) => h.setState("renderedItems", p)),
			),
		item: (b) => {
			if (!b) return null;
			let p = s.get(b);
			if (!p) {
				const { items: T } = h.getState();
				((p = T.find((A) => A.id === b)), p && s.set(b, p));
			}
			return p || null;
		},
		__unstablePrivateStore: h,
	};
}
function Y2(e, t, i) {
	return (il(t, [i.store]), Xt(e, i, "items", "setItems"), e);
}
var G2 = { id: null };
function Ti(e, t) {
	return e.find((i) => (t ? !i.disabled && i.id !== t : !i.disabled));
}
function F2(e, t) {
	return e.filter((i) => (t ? !i.disabled && i.id !== t : !i.disabled));
}
function K0(e, t) {
	return e.filter((i) => i.rowId === t);
}
function X2(e, t, i = !1) {
	const u = e.findIndex((s) => s.id === t);
	return [...e.slice(u + 1), ...(i ? [G2] : []), ...e.slice(0, u)];
}
function dS(e) {
	const t = [];
	for (const i of e) {
		const u = t.find((s) => {
			var o;
			return ((o = s[0]) == null ? void 0 : o.rowId) === i.rowId;
		});
		u ? u.push(i) : t.push([i]);
	}
	return t;
}
function hS(e) {
	let t = 0;
	for (const { length: i } of e) i > t && (t = i);
	return t;
}
function J2(e) {
	return { id: "__EMPTY_ITEM__", disabled: !0, rowId: e };
}
function W2(e, t, i) {
	const u = hS(e);
	for (const s of e)
		for (let o = 0; o < u; o += 1) {
			const f = s[o];
			if (!f || (i && f.disabled)) {
				const h = o === 0 && i ? Ti(s) : s[o - 1];
				s[o] = h && t !== h.id && i ? h : J2(h?.rowId);
			}
		}
	return e;
}
function ez(e) {
	const t = dS(e),
		i = hS(t),
		u = [];
	for (let s = 0; s < i; s += 1)
		for (const o of t) {
			const f = o[s];
			f && u.push({ ...f, rowId: f.rowId ? `${s}` : void 0 });
		}
	return u;
}
function mS(e = {}) {
	var t;
	const i = (t = e.store) == null ? void 0 : t.getState(),
		u = K2(e),
		s = Ie(e.activeId, i?.activeId, e.defaultActiveId),
		o = Kr(
			{
				...u.getState(),
				id: Ie(e.id, i?.id, `id-${Math.random().toString(36).slice(2, 8)}`),
				activeId: s,
				baseElement: Ie(i?.baseElement, null),
				includesBaseElement: Ie(e.includesBaseElement, i?.includesBaseElement, s === null),
				moves: Ie(i?.moves, 0),
				orientation: Ie(e.orientation, i?.orientation, "both"),
				rtl: Ie(e.rtl, i?.rtl, !1),
				virtualFocus: Ie(e.virtualFocus, i?.virtualFocus, !1),
				focusLoop: Ie(e.focusLoop, i?.focusLoop, !1),
				focusWrap: Ie(e.focusWrap, i?.focusWrap, !1),
				focusShift: Ie(e.focusShift, i?.focusShift, !1),
			},
			u,
			e.store,
		);
	Zn(o, () =>
		Dn(o, ["renderedItems", "activeId"], (h) => {
			o.setState("activeId", (m) => {
				var v;
				return m !== void 0 ? m : (v = Ti(h.renderedItems)) == null ? void 0 : v.id;
			});
		}),
	);
	const f = (h = "next", m = {}) => {
		var v, g;
		const S = o.getState(),
			{
				skip: b = 0,
				activeId: p = S.activeId,
				focusShift: T = S.focusShift,
				focusLoop: A = S.focusLoop,
				focusWrap: N = S.focusWrap,
				includesBaseElement: q = S.includesBaseElement,
				renderedItems: I = S.renderedItems,
				rtl: C = S.rtl,
			} = m,
			k = h === "up" || h === "down",
			L = h === "next" || h === "down",
			Q = L ? C && !k : !C || k,
			K = T && !b;
		let O = k ? R_(W2(dS(I), p, K)) : I;
		if (((O = Q ? Vh(O) : O), (O = k ? ez(O) : O), p == null)) return (v = Ti(O)) == null ? void 0 : v.id;
		const $ = O.find((P) => P.id === p);
		if (!$) return (g = Ti(O)) == null ? void 0 : g.id;
		const V = O.some((P) => P.rowId),
			Y = O.indexOf($),
			ae = O.slice(Y + 1),
			se = K0(ae, $.rowId);
		if (b) {
			const P = F2(se, p),
				ge = P.slice(b)[0] || P[P.length - 1];
			return ge?.id;
		}
		const te = A && (k ? A !== "horizontal" : A !== "vertical"),
			fe = V && N && (k ? N !== "horizontal" : N !== "vertical"),
			j = L ? (!V || k) && te && q : k ? q : !1;
		if (te) {
			const P = Ti(X2(fe && !j ? O : K0(O, $.rowId), p, j), p);
			return P?.id;
		}
		if (fe) {
			const P = Ti(j ? se : ae, p);
			return j ? P?.id || null : P?.id;
		}
		const B = Ti(se, p);
		return !B && j ? null : B?.id;
	};
	return {
		...u,
		...o,
		setBaseElement: (h) => o.setState("baseElement", h),
		setActiveId: (h) => o.setState("activeId", h),
		move: (h) => {
			h !== void 0 && (o.setState("activeId", h), o.setState("moves", (m) => m + 1));
		},
		first: () => {
			var h;
			return (h = Ti(o.getState().renderedItems)) == null ? void 0 : h.id;
		},
		last: () => {
			var h;
			return (h = Ti(Vh(o.getState().renderedItems))) == null ? void 0 : h.id;
		},
		next: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("next", h)),
		previous: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("previous", h)),
		down: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("down", h)),
		up: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("up", h)),
	};
}
function tz(e) {
	return { id: ji(e.id), ...e };
}
function vS(e, t, i) {
	return (
		(e = Y2(e, t, i)),
		Xt(e, i, "activeId", "setActiveId"),
		Xt(e, i, "includesBaseElement"),
		Xt(e, i, "virtualFocus"),
		Xt(e, i, "orientation"),
		Xt(e, i, "rtl"),
		Xt(e, i, "focusLoop"),
		Xt(e, i, "focusWrap"),
		Xt(e, i, "focusShift"),
		e
	);
}
var nz = jc() && g_();
function rz({ tag: e, ...t } = {}) {
	const i = Pc(t.store, N_(e, ["value", "rtl"]));
	const u = e?.getState(),
		s = i?.getState(),
		o = Ie(t.activeId, s?.activeId, t.defaultActiveId, null),
		f = mS({
			...t,
			activeId: o,
			includesBaseElement: Ie(t.includesBaseElement, s?.includesBaseElement, !0),
			orientation: Ie(t.orientation, s?.orientation, "vertical"),
			focusLoop: Ie(t.focusLoop, s?.focusLoop, !0),
			focusWrap: Ie(t.focusWrap, s?.focusWrap, !0),
			virtualFocus: Ie(t.virtualFocus, s?.virtualFocus, !0),
		}),
		h = cS({ ...t, placement: Ie(t.placement, s?.placement, "bottom-start") }),
		m = Ie(t.value, s?.value, t.defaultValue, ""),
		v = Ie(t.selectedValue, s?.selectedValue, u?.values, t.defaultSelectedValue, ""),
		g = Array.isArray(v),
		S = {
			...f.getState(),
			...h.getState(),
			value: m,
			selectedValue: v,
			resetValueOnSelect: Ie(t.resetValueOnSelect, s?.resetValueOnSelect, g),
			resetValueOnHide: Ie(t.resetValueOnHide, s?.resetValueOnHide, g && !e),
			activeValue: s?.activeValue,
		},
		b = Kr(S, f, h, i);
	return (
		nz &&
			Zn(b, () =>
				Dn(b, ["virtualFocus"], () => {
					b.setState("virtualFocus", !1);
				}),
			),
		Zn(b, () => {
			if (e)
				return rr(
					Dn(b, ["selectedValue"], (p) => {
						Array.isArray(p.selectedValue) && e.setValues(p.selectedValue);
					}),
					Dn(e, ["values"], (p) => {
						b.setState("selectedValue", p.values);
					}),
				);
		}),
		Zn(b, () =>
			Dn(b, ["resetValueOnHide", "mounted"], (p) => {
				p.resetValueOnHide && (p.mounted || b.setState("value", m));
			}),
		),
		Zn(b, () =>
			Dn(b, ["open"], (p) => {
				p.open || (b.setState("activeId", o), b.setState("moves", 0));
			}),
		),
		Zn(b, () =>
			Dn(b, ["moves", "activeId"], (p, T) => {
				p.moves === T.moves && b.setState("activeValue", void 0);
			}),
		),
		Zn(b, () =>
			Sc(b, ["moves", "renderedItems"], (p, T) => {
				if (p.moves === T.moves) return;
				const { activeId: A } = b.getState(),
					N = f.item(A);
				b.setState("activeValue", N?.value);
			}),
		),
		{
			...h,
			...f,
			...b,
			tag: e,
			setValue: (p) => b.setState("value", p),
			resetValue: () => b.setState("value", S.value),
			setSelectedValue: (p) => b.setState("selectedValue", p),
		}
	);
}
function iz(e) {
	const t = Z2();
	return ((e = { ...e, tag: e.tag !== void 0 ? e.tag : t }), tz(e));
}
function az(e, t, i) {
	return (
		il(t, [i.tag]),
		Xt(e, i, "value", "setValue"),
		Xt(e, i, "selectedValue", "setSelectedValue"),
		Xt(e, i, "resetValueOnHide"),
		Xt(e, i, "resetValueOnSelect"),
		Object.assign(vS(fS(e, t, i), t, i), { tag: i.tag })
	);
}
function uz(e = {}) {
	e = iz(e);
	const [t, i] = Qc(rz, e);
	return az(t, i, e);
}
var lz = "hr",
	gS = tt(function ({ orientation: t = "horizontal", ...i }) {
		return ((i = { role: "separator", "aria-orientation": t, ...i }), i);
	}),
	bj = Fe(function (t) {
		return We(lz, gS(t));
	}),
	sz = "hr",
	yS = tt(function ({ store: t, ...i }) {
		const u = Lc();
		((t = t || u), Jt(t, !1));
		const s = t.useState((o) => (o.orientation === "horizontal" ? "vertical" : "horizontal"));
		return ((i = gS({ ...i, orientation: s })), i);
	}),
	_j = Fe(function (t) {
		return We(sz, yS(t));
	}),
	Yh =
		'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Y0(e) {
	const t = e.querySelector("[data-dialog-initial]");
	return t?.matches(Yh) ? t : (e.querySelector(Yh) ?? e);
}
function ll(e) {
	const t = (0, _.useRef)(null);
	((0, _.useEffect)(() => {
		const u = document.activeElement instanceof HTMLElement ? document.activeElement : null,
			s = t.current;
		return (
			(s === null ? null : Y0(s))?.focus(),
			() => {
				u?.focus();
			}
		);
	}, []),
		(0, _.useEffect)(() => {
			const u = t.current;
			if (!u) return;
			const s = () => {
					!u.isConnected || document.activeElement !== document.body || Y0(u).focus();
				},
				o = () => queueMicrotask(s);
			return (u.addEventListener("focusout", o), () => u.removeEventListener("focusout", o));
		}, []));
	const i = (u) => {
		if (u.key === "Escape") {
			(u.stopPropagation(), e.onClose());
			return;
		}
		if (u.key !== "Tab") return;
		const s = t.current;
		if (!s) return;
		const o = [...s.querySelectorAll(Yh)];
		if (o.length === 0) {
			(u.preventDefault(), s.focus());
			return;
		}
		const f = o[0],
			h = o[o.length - 1];
		document.activeElement === s
			? (u.preventDefault(), (u.shiftKey ? h : f).focus())
			: u.shiftKey && document.activeElement === f
				? (u.preventDefault(), h.focus())
				: !u.shiftKey && document.activeElement === h && (u.preventDefault(), f.focus());
	};
	return (0, w.jsx)("div", {
		className: "dialog-overlay",
		children: (0, w.jsx)("div", {
			ref: t,
			className: "dialog",
			role: "dialog",
			tabIndex: -1,
			"aria-modal": "true",
			"aria-labelledby": e.labelledBy,
			onKeyDown: i,
			children: e.children,
		}),
	});
}
var oz = 1e3,
	cz = 3e4;
function pS(e) {
	const [t, i] = (0, _.useState)([]),
		u = (0, _.useRef)(new Map()),
		s = (0, _.useRef)(e.onRequestSettled);
	s.current = e.onRequestSettled;
	const o = (v) => {
		v.settled ||
			v.cancelled ||
			((v.settled = !0),
			v.retryTimer !== null && (clearTimeout(v.retryTimer), (v.retryTimer = null)),
			u.current.get(v.clientRequestId) === v && u.current.delete(v.clientRequestId),
			s.current());
	};
	(0, _.useEffect)(
		() => () => {
			for (const v of u.current.values())
				((v.cancelled = !0),
					v.retryTimer !== null && clearTimeout(v.retryTimer),
					v.settled || ((v.settled = !0), s.current()));
			u.current.clear();
		},
		[],
	);
	const f = (v) => {
		if (u.current.has(v.clientRequestId)) return;
		const g = {
				text: v.text,
				attachments: v.attachments,
				editedAt: null,
				deletedAt: null,
				...(v.mentions.length > 0 ? { mentions: v.mentions } : {}),
			},
			S = { clientRequestId: v.clientRequestId, retryDelayMs: oz, retryTimer: null, settled: !1, cancelled: !1 };
		(u.current.set(v.clientRequestId, S), e.onRequestStart());
		const b = (N, q = !1) => {
				u.current.get(v.clientRequestId) !== S ||
					S.cancelled ||
					(q && e.onStorageFull(N),
					i((I) =>
						I.map((C) =>
							C.clientRequestId === v.clientRequestId ? { ...C, status: "failed", errorMessage: q ? null : N } : C,
						),
					),
					o(S));
			},
			p = e.keyPrefix.slice(0, -1),
			T = {
				...(e.collection === "messages" ? { channelKey: p } : { rootMessageKey: p }),
				text: v.text,
				attachments: v.attachments,
				mentions: v.mentions,
				authorName: e.getAuthorName(),
				clientRequestId: v.clientRequestId,
			},
			A = () => {
				if (!(u.current.get(v.clientRequestId) !== S || S.cancelled)) {
					if (Gk(T)) {
						b(Kk);
						return;
					}
					try {
						Ya(e.client, e.collection === "messages" ? "message-send" : "reply-send", T).then(
							(N) => {
								if (u.current.get(v.clientRequestId) !== S || S.cancelled) return;
								if ("_nay" in N) {
									if (N._nay.name === "unavailable") {
										const C = S.retryDelayMs;
										S.retryTimer = setTimeout(() => {
											((S.retryTimer = null), (S.retryDelayMs = Math.min(C * 2, cz)), A());
										}, C);
										return;
									}
									b(N._nay.message, N._nay.name === "storage_full");
									return;
								}
								const q = N._yay.messageKey;
								if (typeof q != "string") {
									b("The Chitchat backend answered without a message key");
									return;
								}
								i((C) => C.filter((k) => k.clientRequestId !== v.clientRequestId));
								const I = Ja(q) ?? Date.now();
								(e.onDelivered({
									key: q,
									value: g,
									revision: 0,
									createdBy: e.userId,
									updatedBy: e.userId,
									createdAt: I,
									updatedAt: I,
									timestamp: I,
								}),
									o(S));
							},
							(N) => {
								b(zn(N));
							},
						);
					} catch (N) {
						b(zn(N));
					}
				}
			};
		A();
	};
	return {
		pending: t,
		send: (v, g, S) => {
			const b = crypto.randomUUID();
			(i((p) => [
				...p,
				{ clientRequestId: b, text: v, attachments: g, mentions: S, status: "sending", errorMessage: null },
			]),
				f({ clientRequestId: b, text: v, attachments: g, mentions: S }));
		},
		retry: (v) => {
			(i((g) =>
				g.map((S) => (S.clientRequestId === v.clientRequestId ? { ...S, status: "sending", errorMessage: null } : S)),
			),
				f(v));
		},
		busy: t.some((v) => v.status === "sending"),
	};
}
var fz = ["image/", "video/", "audio/", "application/", "text/"],
	G0 = 20;
function dz(e) {
	const [t, i] = (0, _.useState)(new Map()),
		[u, s] = (0, _.useState)(!1),
		[o, f] = (0, _.useState)(null),
		h = (0, _.useRef)(new Map()),
		m = (0, _.useRef)(null);
	(0, _.useEffect)(() => {
		const g = m.current;
		if (g === null) return;
		const S = h.current.get(g);
		S && ((m.current = null), S.focus());
	}, [t]);
	const v = (g) => {
		((m.current = g),
			s(!0),
			f(null),
			(async () => {
				const S = new Map(t);
				for (let b = 0; b < e.attachments.length; b += G0) {
					const p = e.attachments.slice(b, b + G0),
						T = await e.client.fetchJson("/api/v1/files/download-urls", {
							body: { fileNodeIds: p.map((N) => N.fileNodeId) },
						}),
						A = $k.safeParse(T);
					if (!A.success) throw new Error("Unexpected response for the download links");
					for (const N of A.data.items) S.set(N.fileNodeId, { kind: "ready", url: N.url });
					for (const N of A.data.errors) S.set(N.fileNodeId, { kind: "error", message: N.message });
				}
				return S;
			})()
				.then((S) => {
					(s(!1), i(S));
				})
				.catch((S) => {
					(s(!1), (m.current = null), f(zn(S)));
				}));
	};
	return (0, w.jsxs)("div", {
		className: "message-attachments",
		children: [
			e.attachments.map((g) => {
				const S = t.get(g.fileNodeId);
				return S?.kind === "ready"
					? (0, w.jsxs)(
							"span",
							{
								className: "attachment",
								children: [
									(0, w.jsx)("a", {
										ref: (b) => {
											b === null ? h.current.delete(g.fileNodeId) : h.current.set(g.fileNodeId, b);
										},
										className: "attachment-link",
										href: S.url,
										target: "_blank",
										rel: "noopener noreferrer",
										children: g.name,
									}),
									(0, w.jsx)("span", {
										className: "attachment-hint",
										children: "Link ready — it expires after a few minutes.",
									}),
								],
							},
							g.fileNodeId,
						)
					: (0, w.jsxs)(
							"span",
							{
								className: "attachment",
								children: [
									(0, w.jsx)("button", {
										type: "button",
										className: "attachment-button",
										disabled: u,
										onClick: () => v(g.fileNodeId),
										children: u ? `Getting link for ${g.name}…` : g.name,
									}),
									S?.kind === "error"
										? (0, w.jsx)("span", { className: "attachment-error", role: "alert", children: S.message })
										: null,
								],
							},
							g.fileNodeId,
						);
			}),
			o !== null ? (0, w.jsx)("span", { className: "attachment-error", role: "alert", children: o }) : null,
		],
	});
}
function hz(e) {
	const t = (0, _.useId)(),
		[i, u] = (0, _.useState)([]),
		[s, o] = (0, _.useState)(null),
		[f, h] = (0, _.useState)(!1),
		[m, v] = (0, _.useState)(!1),
		[g, S] = (0, _.useState)(null),
		b = (0, _.useRef)(new Set()),
		p = (0, _.useRef)(!1),
		T = () => {
			(v(!0),
				S(null),
				e.client
					.fetchJson("/api/v1/files/list", {
						body: {
							path: "/",
							recursive: !0,
							kind: "file",
							limit: 100,
							scanLimit: 1e4,
							contentTypePrefixes: fz,
							cursor: s,
						},
					})
					.then((A) => {
						v(!1);
						const N = Uk.safeParse(A);
						if (!N.success) {
							S("Unexpected response from the file list");
							return;
						}
						const q = N.data.items.filter((I) => !b.current.has(I.nodeId));
						for (const I of q) b.current.add(I.nodeId);
						(u((I) => [...I, ...q]), o(N.data.cursor), h(N.data.isDone));
					})
					.catch((A) => {
						(v(!1), S(zn(A)));
					}));
		};
	return (
		(0, _.useEffect)(() => {
			p.current || ((p.current = !0), T());
		}, []),
		(0, w.jsxs)(ll, {
			labelledBy: t,
			onClose: e.onClose,
			children: [
				(0, w.jsx)("h2", { id: t, className: "dialog-title", children: "Attach a file" }),
				(0, w.jsx)("button", {
					type: "button",
					className: "button",
					"data-dialog-initial": !0,
					onClick: e.onClose,
					children: "Cancel",
				}),
				i.length > 0
					? (0, w.jsx)("ul", {
							className: "picker-list",
							children: i.map((A) =>
								(0, w.jsx)(
									"li",
									{
										children: (0, w.jsxs)("button", {
											type: "button",
											className: "picker-item",
											onClick: () => e.onPick({ fileNodeId: A.nodeId, name: A.name }),
											children: [
												(0, w.jsx)("span", { className: "picker-item-name", children: A.name }),
												(0, w.jsx)("span", { className: "picker-item-path", children: A.path }),
											],
										}),
									},
									A.nodeId,
								),
							),
						})
					: null,
				m ? (0, w.jsx)("div", { className: "channel-status", role: "status", children: "Loading files…" }) : null,
				g !== null
					? (0, w.jsxs)("div", {
							className: "channel-status is-error",
							role: "alert",
							children: [
								(0, w.jsx)("span", { children: g }),
								(0, w.jsx)("button", { type: "button", className: "button", onClick: T, children: "Retry" }),
							],
						})
					: null,
				!m && g === null && i.length === 0 && f
					? (0, w.jsx)("div", { className: "channel-status", children: "No files found." })
					: null,
				!f && !m && g === null
					? (0, w.jsx)("button", { type: "button", className: "button", onClick: T, children: "Load more" })
					: null,
			],
		})
	);
}
var mz = 8,
	vz = 100,
	gz = 10,
	Gh = new WeakMap(),
	gh = new WeakMap();
function yz(e) {
	const t = Gh.get(e);
	if (t !== void 0) return Promise.resolve(t);
	const i = gh.get(e);
	if (i !== void 0) return i;
	const u = pz(e).then((s) => (s.status === "ready" && Gh.set(e, s), gh.delete(e), s));
	return (gh.set(e, u), u);
}
async function pz(e) {
	const t = [];
	let i;
	for (let u = 0; u < gz; u += 1) {
		const s = await e.members.list({ limit: vz, ...(i === void 0 ? {} : { cursor: i }) });
		if ("_nay" in s) return { status: "refused", name: s._nay.name };
		if ((t.push(...s._yay.members), s._yay.cursor === null)) return { status: "ready", members: t };
		i = s._yay.cursor;
	}
	return { status: "ready", members: t };
}
function F0(e) {
	return `mention:${e}`;
}
function bS(e) {
	const t = (0, _.useId)(),
		[i, u] = (0, _.useState)(""),
		[s, o] = (0, _.useState)([]),
		[f, h] = (0, _.useState)(!1),
		[m, v] = (0, _.useState)(null),
		[g, S] = (0, _.useState)(null),
		b = (0, _.useRef)(new Map()),
		p = (0, _.useRef)(null),
		T = (0, _.useRef)(null),
		A = uz({
			placement: "top-start",
			resetValueOnHide: !1,
			setOpen: (O) => {
				O || S(null);
			},
		}),
		N = e.client.context.userId,
		q =
			g !== null && m !== null && m !== "loading" && m.status === "ready" ? Rk(m.members, g.query, N).slice(0, mz) : [],
		I = g !== null && (m === "loading" || (m !== null && m.status === "refused") || q.length > 0),
		C = () => {
			if (m !== null) return;
			const O = Gh.get(e.client);
			if (O !== void 0) {
				v(O);
				return;
			}
			(v("loading"), yz(e.client).then(v));
		},
		k = (O) => {
			if (g === null) return;
			const $ = p.current?.selectionStart ?? i.length,
				V = Ck(i, g.start, $, O.label);
			(b.current.set(O.userId, O.label), u(V.text), S(null), (T.current = V.caret), A.hide(), A.setValue(""));
		},
		L = () => {
			if (e.busy || e.disabled) return;
			const O = i.trim();
			if (O === "" && s.length === 0) return;
			const $ = kk(b.current, O);
			(e.onSend(O, s, $), u(""), o([]), S(null), b.current.clear(), A.hide());
		},
		Q = (O) => {
			const $ = O.currentTarget.value,
				V = O.currentTarget.selectionStart ?? $.length;
			u($);
			const Y = Ak($, V);
			if ((S(Y), A.setValue(Y?.query ?? ""), Y === null)) {
				A.hide();
				return;
			}
			C();
		},
		K = (O) => {
			if (I) {
				if (O.key === "ArrowLeft" || O.key === "ArrowRight") {
					A.hide();
					return;
				}
				if (O.key === "Escape") {
					(O.preventDefault(), O.stopPropagation(), S(null), A.hide());
					return;
				}
				if ((O.key === "Enter" || O.key === "Tab") && !O.shiftKey && q.length > 0) {
					O.preventDefault();
					const $ = A.getState().activeId,
						V = q.find((Y) => F0(Y.userId) === $) ?? q[0];
					k(V);
					return;
				}
			}
			O.key === "Enter" && !O.shiftKey && (O.preventDefault(), L());
		};
	return (
		(0, _.useLayoutEffect)(() => {
			A.setOpen(I);
		}, [A, I]),
		(0, _.useLayoutEffect)(() => {
			const O = T.current;
			if (O === null) return;
			T.current = null;
			const $ = p.current;
			$ !== null && ($.focus(), $.setSelectionRange(O, O));
		}, [i]),
		(0, _.useEffect)(() => {
			A.render();
		}, [A, i]),
		(0, w.jsxs)("div", {
			className: "composer",
			children: [
				s.length > 0
					? (0, w.jsx)("ul", {
							className: "composer-attachments",
							children: s.map((O) =>
								(0, w.jsxs)(
									"li",
									{
										className: "composer-attachment",
										children: [
											(0, w.jsx)("span", { children: O.name }),
											(0, w.jsx)("button", {
												type: "button",
												className: "composer-attachment-remove",
												"aria-label": `Remove attachment ${O.name}`,
												onClick: () => o(($) => $.filter((V) => V.fileNodeId !== O.fileNodeId)),
												children: "×",
											}),
										],
									},
									O.fileNodeId,
								),
							),
						})
					: null,
				(0, w.jsxs)("div", {
					className: "composer-bar",
					children: [
						(0, w.jsx)(NN, {
							store: A,
							autoSelect: !0,
							value: i,
							showOnClick: !1,
							showOnChange: !1,
							showOnKeyPress: !1,
							setValueOnChange: !1,
							render: (0, w.jsx)("textarea", {
								ref: p,
								className: "composer-input",
								"aria-label": e.label,
								"aria-describedby": t,
								placeholder: e.label,
								rows: 1,
								onChange: Q,
								onKeyDown: K,
								onPointerDown: A.hide,
								onScroll: A.render,
							}),
						}),
						(0, w.jsx)("button", {
							type: "button",
							className: "composer-action",
							"aria-label": "Attach file",
							disabled: e.disabled,
							onClick: () => h(!0),
							children: (0, w.jsx)(lM, { size: 18, "aria-hidden": "true" }),
						}),
						(0, w.jsx)("button", {
							type: "button",
							className: "composer-action composer-send",
							"aria-label": e.busy ? "Sending…" : "Send",
							disabled: e.busy || e.disabled,
							onClick: L,
							children: (0, w.jsx)(rM, { size: 18, "aria-hidden": "true" }),
						}),
					],
				}),
				(0, w.jsxs)(H2, {
					store: A,
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					fitViewport: !0,
					hidden: !I,
					getAnchorRect: () => {
						const O = p.current;
						return O === null ? null : O.getBoundingClientRect();
					},
					className: "mention-menu",
					"aria-label": "Mention somebody",
					children: [
						m === "loading"
							? (0, w.jsx)("div", { className: "mention-menu-status", role: "status", children: "Loading people…" })
							: null,
						m !== null && m !== "loading" && m.status === "refused"
							? (0, w.jsx)("div", { className: "mention-menu-status", role: "status", children: u_(m.name) })
							: null,
						q.map((O) =>
							(0, w.jsx)(
								WN,
								{
									id: F0(O.userId),
									value: O.label,
									setValueOnClick: !1,
									focusOnHover: !0,
									className: "mention-option",
									onMouseDown: ($) => {
										$.preventDefault();
									},
									onClick: () => k(O),
									children: O.label,
								},
								O.userId,
							),
						),
					],
				}),
				(0, w.jsx)("span", { id: t, className: "composer-hint", children: "Enter sends · Shift+Enter for a new line" }),
				f
					? (0, w.jsx)(hz, {
							client: e.client,
							onPick: (O) => {
								(o(($) => ($.some((V) => V.fileNodeId === O.fileNodeId) ? $ : [...$, O])), h(!1));
							},
							onClose: () => h(!1),
						})
					: null,
			],
		})
	);
}
function bz(e) {
	const [t, i] = (0, _.useState)(!1),
		u = (0, _.useRef)(null),
		s = (0, _.useRef)([]);
	(0, _.useEffect)(() => {
		t && s.current[0]?.focus();
	}, [t]);
	const o = () => {
			(i(!1), u.current?.focus());
		},
		f = (h, m) => {
			h.key === "Escape"
				? (h.preventDefault(), o())
				: h.key === "ArrowRight" || h.key === "ArrowDown"
					? (h.preventDefault(), s.current[(m + 1) % Pu.length]?.focus())
					: (h.key === "ArrowLeft" || h.key === "ArrowUp") &&
						(h.preventDefault(), s.current[(m + Pu.length - 1) % Pu.length]?.focus());
		};
	return (0, w.jsxs)("span", {
		className: "add-reaction",
		children: [
			(0, w.jsx)("button", {
				ref: u,
				type: "button",
				className: "button message-action",
				"aria-expanded": t,
				onClick: () => (t ? o() : i(!0)),
				children: "Add reaction",
			}),
			t
				? (0, w.jsx)("span", {
						className: "reaction-palette",
						role: "group",
						"aria-label": "Choose a reaction",
						children: Pu.map((h, m) => {
							const v = e.groups.find((g) => g.token === h)?.reactedByMe ?? !1;
							return (0, w.jsx)(
								"button",
								{
									ref: (g) => {
										s.current[m] = g;
									},
									type: "button",
									className: "reaction-palette-item",
									"aria-pressed": v,
									"aria-label": r_[h],
									onKeyDown: (g) => f(g, m),
									onClick: () => {
										(e.onPick(h, v), o());
									},
									children: (0, w.jsx)("span", { "aria-hidden": "true", children: n_[h] }),
								},
								h,
							);
						}),
					})
				: null,
		],
	});
}
var _S = 1440 * 60 * 1e3,
	_z = 300 * 1e3;
function Sz(e) {
	return new Date(e).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" });
}
function Fh(e) {
	return new Date(e).toLocaleDateString(void 0, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}
function wz(e, t) {
	const i = new Date(e).toDateString();
	return i === new Date(t).toDateString() ? "Today" : i === new Date(t - _S).toDateString() ? "Yesterday" : Fh(e);
}
function Ez(e) {
	if (e == null) return "•";
	const t = e.split(/\s+/u).filter((u) => u !== "");
	if (t.length === 0) return "•";
	const i = t.length > 1 ? t[t.length - 1][0] : "";
	return `${t[0][0]}${i}`.toUpperCase();
}
function SS(e, t, i = null) {
	const u = [];
	let s = null,
		o = !1;
	for (const f of e) {
		const h = s !== null && new Date(s.timestamp).toDateString() !== new Date(f.timestamp).toDateString();
		h && u.push({ kind: "divider", key: `divider:${f.key}`, label: wz(f.timestamp, t) });
		const m =
			!o && i !== null && f.timestamp > i.lastReadAt && f.createdBy !== i.selfUserId && f.value.deletedAt === null;
		m && ((o = !0), u.push({ kind: "new", key: `new:${f.key}` }));
		const v = s !== null && !h && !m && s.createdBy === f.createdBy && f.timestamp - s.timestamp <= _z;
		(u.push({ kind: "message", doc: f, isContinuation: v }), (s = f));
	}
	return u;
}
function Tz(e, t, i) {
	const u = e.mentions ?? [];
	if (u.length === 0) return e.text;
	const s = u
		.map((h) => ({ id: h, name: t.get(h) }))
		.filter((h) => typeof h.name == "string" && h.name !== "")
		.sort((h, m) => m.name.length - h.name.length);
	if (s.length === 0) return e.text;
	const o = [];
	let f = e.text;
	for (; f !== ""; ) {
		let h = null;
		for (const m of s) {
			const v = f.indexOf(`@${m.name}`);
			v !== -1 && (h === null || v < h.index) && (h = { index: v, id: m.id, name: m.name });
		}
		if (h === null) {
			o.push(f);
			break;
		}
		(h.index > 0 && o.push(f.slice(0, h.index)),
			o.push({ id: h.id, name: h.name }),
			(f = f.slice(h.index + h.name.length + 1)));
	}
	return o.map((h, m) =>
		typeof h == "string"
			? h
			: (0, w.jsxs)("span", { className: h.id === i ? "mention mention-self" : "mention", children: ["@", h.name] }, m),
	);
}
function Xh(e) {
	const { client: t, collection: i, doc: u, isOwn: s } = e,
		o = u.value.deletedAt !== null,
		f = (0, _.useId)(),
		[h, m] = (0, _.useState)(!1),
		[v, g] = (0, _.useState)(""),
		[S, b] = (0, _.useState)(!1),
		[p, T] = (0, _.useState)(!1),
		[A, N] = (0, _.useState)(null),
		[q, I] = (0, _.useState)(!1),
		C = (0, _.useRef)(null),
		k = (0, _.useRef)(null),
		L = (0, _.useRef)(null),
		Q = (0, _.useRef)(!1),
		K = (0, _.useRef)(null),
		O = (0, _.useRef)(null),
		$ = (0, _.useRef)(e.onRequestSettled);
	(($.current = e.onRequestSettled),
		(0, _.useEffect)(() => {
			h && C.current?.focus();
		}, [h]),
		(0, _.useEffect)(() => {
			const D = K.current;
			if (D === null) return;
			const le = D === "edit" ? k.current : L.current;
			le !== null && ((K.current = null), le.focus());
		}, [h, q, o]));
	const V = (D) => {
			D.settled || ((D.settled = !0), (D.cancelled = !0), O.current === D && (O.current = null), $.current());
		},
		Y = (D) => {
			(V(D), b(!1), T(!1), N(null), D.onDone());
		},
		ae = (D) => {
			if (O.current !== D || D.running || D.cancelled) return;
			((D.running = !0), b(!0), T(!1), N(null));
			const le = (me) => {
					O.current !== D || D.cancelled || ((D.running = !1), (D.uncertain = !0), b(!1), T(!0), N(me));
				},
				oe = D.value.deletedAt !== null && u.value.deletedAt === null;
			try {
				Ya(
					t,
					oe ? "message-delete" : "message-edit",
					oe ? { messageKey: u.key } : { messageKey: u.key, text: D.value.text, mentions: D.value.mentions ?? [] },
				)
					.then((me) => {
						if (O.current !== D || D.cancelled) return;
						if (((D.running = !1), "_nay" in me)) {
							if (me._nay.name === "unavailable") {
								le(me._nay.message);
								return;
							}
							if (D.uncertain && me._nay.name === "conflict") {
								(b(!1), T(!0), N(me._nay.message));
								return;
							}
							if ((V(D), b(!1), T(!1), me._nay.name === "storage_full")) {
								e.onStorageFull(me._nay.message);
								return;
							}
							N(me._nay.message);
							return;
						}
						const Se = typeof me._yay.revision == "number" ? me._yay.revision : u.revision;
						(e.onApplyLocal({ ...u, value: D.value, revision: Se, updatedAt: Date.now() }), Y(D));
					})
					.catch((me) => {
						le(zn(me));
					});
			} catch (me) {
				le(zn(me));
			}
		},
		se = (D, le) => {
			if (O.current !== null) return;
			const oe = {
				value: D,
				expectedRevision: u.revision,
				onDone: le,
				running: !1,
				uncertain: !1,
				settled: !1,
				cancelled: !1,
			};
			((O.current = oe), e.onRequestStart(), ae(oe));
		},
		te = () => {
			const D = O.current;
			(D !== null && V(D), b(!1), T(!1), N(null));
		};
	((0, _.useEffect)(() => {
		o &&
			(h || q
				? (Q.current && (K.current = "row"), m(!1), g(""), I(!1), b(!1), T(!1), N(null))
				: Q.current && L.current?.focus());
	}, [o, h, q]),
		(0, _.useEffect)(() => {
			const D = O.current;
			if (!(D === null || D.cancelled || u.revision <= D.expectedRevision)) {
				if (u.value.deletedAt !== null && D.value.deletedAt === null) {
					(V(D), b(!1), T(!1), N(null));
					return;
				}
				if (
					D.value.deletedAt !== null
						? u.value.deletedAt !== null
						: u.value.text === D.value.text && u.value.editedAt !== null
				) {
					Y(D);
					return;
				}
				(V(D),
					b(!1),
					T(!1),
					N("Someone else changed this message while the request was pending. Review it and try again."));
			}
		}, [u.revision, u.value.deletedAt, u.value.editedAt, u.value.text]),
		(0, _.useEffect)(
			() => () => {
				const D = O.current;
				D !== null && V(D);
			},
			[],
		));
	const fe = () => {
			if (S) return;
			const D = O.current;
			if (D !== null) {
				ae(D);
				return;
			}
			const le = v.trim();
			le !== "" &&
				se({ ...u.value, text: le, editedAt: Date.now() }, () => {
					((K.current = "edit"), m(!1), g(""));
				});
		},
		j = () => {
			S || (te(), (K.current = "edit"), m(!1), g(""));
		},
		B = () => {
			if (S) return;
			const D = O.current;
			if (D !== null) {
				ae(D);
				return;
			}
			se({ ...u.value, deletedAt: Date.now() }, () => {
				((K.current = "row"), I(!1));
			});
		},
		P = () => {
			S || (te(), I(!1));
		},
		ge = (D, le) => {
			if ((N(null), !Array.isArray(e.reactionGroups) && le)) {
				N("Reactions on this message could not be loaded, so they can't be removed right now.");
				return;
			}
			const oe = le;
			Ya(t, "reaction-toggle", { targetKey: u.key, token: D, on: !oe })
				.then((me) => {
					if ("_nay" in me) {
						if (me._nay.name === "storage_full") {
							e.onStorageFull(me._nay.message);
							return;
						}
						N(me._nay.message);
						return;
					}
					const Se = typeof me._yay.key == "string" ? me._yay.key : `${u.key}:${D}:${e.selfUserId}`,
						Re = typeof me._yay.revision == "number" ? me._yay.revision : 0;
					e.onApplyReaction({
						key: Se,
						targetKey: u.key,
						token: D,
						createdBy: e.selfUserId,
						revision: Re,
						updatedAt: Date.now(),
						removed: oe,
					});
				})
				.catch((me) => {
					N(zn(me));
				});
		},
		be = e.authorName === null ? "Former member" : (e.authorName ?? "…"),
		Pe = Date.now() - u.timestamp < 7 * _S,
		M = e.onOpenThread !== null && typeof e.replyCount == "number" && e.replyCount > 0;
	return (0, w.jsxs)("li", {
		ref: L,
		className: e.isContinuation ? "message is-continuation" : "message is-leader",
		"data-key": u.key,
		tabIndex: -1,
		onFocusCapture: () => {
			Q.current = !0;
		},
		onBlurCapture: (D) => {
			D.relatedTarget instanceof Node && (Q.current = D.currentTarget.contains(D.relatedTarget));
		},
		children: [
			(0, w.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: Ez(e.authorName) }),
			(0, w.jsxs)("div", {
				className: e.isContinuation ? "message-head visually-hidden" : "message-head",
				children: [
					(0, w.jsx)("span", { className: "message-author", children: be }),
					(0, w.jsxs)("time", {
						className: "message-time",
						dateTime: new Date(u.timestamp).toISOString(),
						children: [
							Pe ? (0, w.jsxs)("span", { className: "visually-hidden", children: [Fh(u.timestamp), " "] }) : null,
							(0, w.jsx)("span", { className: "message-clock", children: Pe ? Sz(u.timestamp) : Fh(u.timestamp) }),
						],
					}),
				],
			}),
			o
				? (0, w.jsx)("p", { className: "message-text is-deleted", children: "Message deleted" })
				: h
					? (0, w.jsxs)("div", {
							className: "message-edit",
							children: [
								(0, w.jsx)("textarea", {
									ref: C,
									className: "composer-input",
									"aria-label": "Edit message",
									rows: 2,
									value: v,
									readOnly: S || p,
									onInput: (D) => g(D.currentTarget.value),
									onKeyDown: (D) => {
										D.key === "Escape"
											? (D.preventDefault(), j())
											: D.key === "Enter" && !D.shiftKey && (D.preventDefault(), fe());
									},
								}),
								(0, w.jsxs)("div", {
									className: "message-edit-actions",
									children: [
										(0, w.jsx)("button", {
											type: "button",
											className: "button",
											disabled: S,
											onClick: j,
											children: "Cancel",
										}),
										(0, w.jsx)("button", {
											type: "button",
											className: "button button-primary",
											disabled: S,
											onClick: fe,
											children: S ? "Saving…" : p ? "Retry" : "Save",
										}),
									],
								}),
							],
						})
					: (0, w.jsxs)(w.Fragment, {
							children: [
								(0, w.jsxs)("p", {
									className: "message-text",
									children: [
										Tz(u.value, e.memberNames, e.selfUserId),
										u.value.editedAt !== null
											? (0, w.jsx)("span", { className: "message-edited", children: " (edited)" })
											: null,
									],
								}),
								u.value.attachments.length > 0 ? (0, w.jsx)(dz, { client: t, attachments: u.value.attachments }) : null,
								e.reactionGroups === "unknown"
									? (0, w.jsx)("div", { className: "message-reactions-unknown", children: "Reactions unavailable" })
									: Array.isArray(e.reactionGroups) && e.reactionGroups.length > 0
										? (0, w.jsx)("div", {
												className: "message-reactions",
												children: e.reactionGroups.map((D) =>
													(0, w.jsxs)(
														"button",
														{
															type: "button",
															className: D.reactedByMe ? "reaction-chip is-mine" : "reaction-chip",
															"aria-pressed": D.reactedByMe,
															"aria-label": `${r_[D.token]}, ${D.count} ${D.count === 1 ? "reaction" : "reactions"}`,
															onClick: () => ge(D.token, D.reactedByMe),
															children: [
																(0, w.jsx)("span", { "aria-hidden": "true", children: n_[D.token] }),
																(0, w.jsx)("span", { className: "reaction-chip-count", children: D.count }),
															],
														},
														D.token,
													),
												),
											})
										: null,
								M && typeof e.replyCount == "number"
									? (0, w.jsxs)("button", {
											ref: e.replyTriggerRef ?? void 0,
											type: "button",
											className: "message-thread-summary",
											disabled: e.threadDisabled,
											onClick: () => e.onOpenThread?.(u),
											children: [
												(0, w.jsx)("span", {
													className: "message-thread-summary-icon",
													"aria-hidden": "true",
													children: "↳",
												}),
												(0, w.jsx)("span", {
													className: "message-thread-summary-count",
													children: `${Hk(e.replyCount, e.repliesHasMore)} ${e.replyCount === 1 ? "reply" : "replies"}`,
												}),
												e.replyLatestAt !== null
													? (0, w.jsx)("span", {
															className: "message-thread-summary-recency",
															children: `Last reply ${Oc(e.replyLatestAt, Date.now())}`,
														})
													: null,
											],
										})
									: null,
							],
						}),
			!o && !h
				? (0, w.jsxs)("div", {
						className: "message-actions",
						children: [
							e.onOpenThread !== null && e.replyCount !== null && !M
								? (0, w.jsx)("button", {
										ref: e.replyTriggerRef ?? void 0,
										type: "button",
										className: "button message-action",
										disabled: e.threadDisabled,
										onClick: () => e.onOpenThread?.(u),
										children: e.replyCount === "unknown" ? "View thread" : "Reply in thread",
									})
								: null,
							(0, w.jsx)(bz, { groups: Array.isArray(e.reactionGroups) ? e.reactionGroups : [], onPick: ge }),
							s
								? (0, w.jsxs)(w.Fragment, {
										children: [
											(0, w.jsx)("button", {
												ref: k,
												type: "button",
												className: "button message-action",
												onClick: () => {
													(g(u.value.text), m(!0));
												},
												children: "Edit",
											}),
											(0, w.jsx)("button", {
												type: "button",
												className: "button message-action button-danger",
												onClick: () => I(!0),
												children: "Delete",
											}),
										],
									})
								: null,
						],
					})
				: null,
			A !== null && !q ? (0, w.jsx)("p", { className: "form-error", role: "alert", children: A }) : null,
			q
				? (0, w.jsxs)(ll, {
						labelledBy: f,
						onClose: P,
						children: [
							(0, w.jsx)("h2", { id: f, className: "dialog-title", children: "Delete message?" }),
							(0, w.jsx)("p", { children: 'The message is replaced by a "Message deleted" placeholder for everyone.' }),
							A !== null ? (0, w.jsx)("p", { className: "form-error", role: "alert", children: A }) : null,
							(0, w.jsxs)("div", {
								className: "dialog-actions",
								children: [
									(0, w.jsx)("button", {
										type: "button",
										className: "button",
										"data-dialog-initial": !0,
										disabled: S,
										onClick: P,
										children: "Cancel",
									}),
									(0, w.jsx)("button", {
										type: "button",
										className: "button button-danger",
										disabled: S,
										onClick: B,
										children: S ? "Deleting…" : p ? "Retry delete" : "Delete message",
									}),
								],
							}),
						],
					})
				: null,
		],
	});
}
function wS(e) {
	return (0, w.jsxs)("li", {
		className:
			e.pending.status === "failed" ? "message is-leader is-pending is-failed" : "message is-leader is-pending",
		children: [
			(0, w.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: "•" }),
			(0, w.jsxs)("div", {
				className: "message-head",
				children: [
					(0, w.jsx)("span", { className: "message-author", children: "You" }),
					(0, w.jsx)("span", {
						className: "message-time",
						children: e.pending.status === "sending" ? "Sending…" : "Not sent",
					}),
				],
			}),
			(0, w.jsx)("p", { className: "message-text", children: e.pending.text }),
			e.pending.attachments.length > 0
				? (0, w.jsx)("p", { className: "message-text", children: e.pending.attachments.map((t) => t.name).join(", ") })
				: null,
			e.pending.status === "failed"
				? (0, w.jsxs)("div", {
						className: "message-send-error",
						role: "alert",
						children: [
							(0, w.jsx)("span", { children: e.pending.errorMessage ?? "Failed to send message" }),
							(0, w.jsx)("button", {
								type: "button",
								className: "button",
								onClick: e.onRetry,
								children: "Retry sending message",
							}),
						],
					})
				: null,
		],
	});
}
function ec(e, t) {
	return e === "denied"
		? `Chitchat can no longer read ${t}. Reload the page to try again.`
		: e === "session_expired"
			? `This Chitchat session expired, so ${t} stopped updating. Reload the page to continue.`
			: e === "unavailable"
				? `Chitchat cannot reach ${t} right now. Check your connection and reload the page.`
				: e === "capacity"
					? `Chitchat has too many live views open, so ${t} stopped updating. Reload the page.`
					: `Chitchat stopped reading ${t}. Reload the page to try again.`;
}
function xz(e) {
	const { client: t, userId: i, root: u, memberNames: s, replies: o, repliesLoaded: f } = e,
		h = (0, _.useRef)(null);
	(0, _.useEffect)(() => {
		h.current?.focus();
	}, []);
	const m = pS({
		client: t,
		collection: "replies",
		keyPrefix: a_(u.key),
		userId: i,
		getAuthorName: () => s.get(i) ?? null,
		onDelivered: (S) => {
			e.onApplyLocalReply(S);
		},
		onRequestStart: e.onRequestStart,
		onRequestSettled: e.onRequestSettled,
		onStorageFull: e.onStorageFull,
	});
	(0, _.useEffect)(() => {
		const S = new Set();
		for (const b of o) {
			S.add(b.createdBy);
			for (const p of b.value.mentions ?? []) S.add(p);
		}
		S.size > 0 && s.resolve([...S]);
	}, [o, s]);
	const v = (S) => {
			if (S.key === "Escape") {
				if ((S.stopPropagation(), e.sendInFlight)) {
					e.announce("Wait for pending message changes to finish before closing the thread.");
					return;
				}
				e.onClose();
			}
		},
		g = SS([...o].reverse(), Date.now());
	return (0, w.jsxs)("section", {
		className: "thread",
		"aria-label": "Thread",
		tabIndex: -1,
		onKeyDown: v,
		children: [
			(0, w.jsxs)("div", {
				className: "thread-head",
				children: [
					(0, w.jsx)("h3", { className: "thread-title", children: "Thread" }),
					(0, w.jsx)("button", {
						ref: h,
						type: "button",
						className: "button",
						disabled: e.sendInFlight,
						onClick: e.onClose,
						children: e.isNarrow ? "Back to messages" : "Close thread",
					}),
				],
			}),
			(0, w.jsx)("ul", {
				className: "message-list thread-root",
				children: (0, w.jsx)(Xh, {
					client: t,
					collection: "messages",
					doc: u,
					isOwn: u.createdBy === i,
					selfUserId: i,
					memberNames: s,
					isContinuation: !1,
					authorName: s.get(u.createdBy),
					reactionGroups: Jh(e.reactionCoverage, e.reactionGroupsByTarget, u.key),
					replyCount: null,
					replyLatestAt: null,
					repliesHasMore: !1,
					onOpenThread: null,
					threadDisabled: !1,
					replyTriggerRef: null,
					onApplyLocal: e.onApplyLocalRoot,
					onRequestStart: e.onRequestStart,
					onRequestSettled: e.onRequestSettled,
					onApplyReaction: e.onApplyReaction,
					onStorageFull: e.onStorageFull,
				}),
			}),
			e.repliesError !== null
				? (0, w.jsx)("div", { className: "channel-status is-error", role: "alert", children: e.repliesError })
				: null,
			e.repliesTruncated
				? (0, w.jsx)("div", {
						className: "channel-status",
						role: "status",
						children: "Only the newest 100 replies are shown.",
					})
				: null,
			f ? null : (0, w.jsx)("div", { className: "channel-status", role: "status", children: "Loading replies…" }),
			f && o.length === 0 && m.pending.length === 0
				? (0, w.jsx)("div", { className: "channel-status", children: "No replies yet" })
				: o.length > 0 || m.pending.length > 0
					? (0, w.jsxs)("ul", {
							className: "message-list thread-replies",
							children: [
								g.map((S) =>
									S.kind === "divider"
										? (0, w.jsx)("li", { className: "day-divider", children: S.label }, S.key)
										: S.kind === "new"
											? null
											: (0, w.jsx)(
													Xh,
													{
														client: t,
														collection: "replies",
														doc: S.doc,
														isOwn: S.doc.createdBy === i,
														selfUserId: i,
														memberNames: s,
														isContinuation: S.isContinuation,
														authorName: s.get(S.doc.createdBy),
														reactionGroups: Jh(e.reactionCoverage, e.reactionGroupsByTarget, S.doc.key),
														replyCount: null,
														replyLatestAt: null,
														repliesHasMore: !1,
														onOpenThread: null,
														threadDisabled: !1,
														replyTriggerRef: null,
														onApplyLocal: e.onApplyLocalReply,
														onRequestStart: e.onRequestStart,
														onRequestSettled: e.onRequestSettled,
														onApplyReaction: e.onApplyReaction,
														onStorageFull: e.onStorageFull,
													},
													S.doc.key,
												),
								),
								m.pending.map((S) => (0, w.jsx)(wS, { pending: S, onRetry: () => m.retry(S) }, S.clientRequestId)),
							],
						})
					: null,
			e.storageFull !== null
				? (0, w.jsx)("div", { className: "channel-status is-error", role: "alert", children: e.storageFull })
				: null,
			(0, w.jsx)(bS, {
				client: t,
				label: "Reply in thread",
				busy: m.busy,
				disabled: e.storageFull !== null || e.repliesError !== null,
				onSend: m.send,
			}),
		],
	});
}
var tc = { hasMore: !0, deepestRoot: null, incomplete: !1, death: null };
function ES(e, t) {
	return e.incomplete || e.death !== null ? !1 : !e.hasMore || (e.deepestRoot !== null && t < e.deepestRoot);
}
var nc = 100,
	yh = 1e3,
	Az = 3e4;
function Rz(e) {
	let t = null;
	for (const i of e) (t === null || i.updatedAt > t) && (t = i.updatedAt);
	return t;
}
function Cz(e) {
	if (typeof e != "object" || e === null) return null;
	const t = e.key;
	return typeof t == "string" ? t : null;
}
function ph(e) {
	let t = null;
	for (const i of e) {
		if (typeof i != "object" || i === null) continue;
		const u = i.updatedAt;
		typeof u == "number" && Number.isFinite(u) && (t === null || u > t) && (t = u);
	}
	return t;
}
function bh(e) {
	return e.newest === null
		? null
		: e.truncated && e.newest === e.current
			? e.newest + 1
			: e.newest > e.current
				? e.newest
				: null;
}
function _h(e, t) {
	return e.filter((i) => {
		const u = Cz(i);
		return u !== null && u.startsWith(t);
	});
}
function Sh(e, t) {
	return e.fetchJson("/api/v1/plugin-data/list", { body: t }).then((i) => {
		const u = l_.safeParse(i);
		if (!u.success) throw new Error("Unexpected response from the document list");
		return u.data;
	});
}
function Jh(e, t, i) {
	if (e.incomplete || e.death !== null) return "unknown";
	const u = t.get(i);
	if (u !== void 0 && u.length > 0) return u;
	const s = bc(i);
	return s !== null && ES(e, s) ? (u ?? []) : "pending";
}
function kz(e, t, i) {
	if (e.incomplete || e.death !== null) return "unknown";
	const u = t.get(i);
	if (u !== void 0 && u.count > 0) return u.count;
	const s = bc(i);
	return s !== null && ES(e, s) ? (u?.count ?? 0) : "unknown";
}
var X0 = 420,
	rc = 244,
	wh = 340,
	J0 = 16;
function Mz(e) {
	if (typeof e != "string") return null;
	let t;
	try {
		t = JSON.parse(e);
	} catch {
		return null;
	}
	if (typeof t != "object" || t === null) return null;
	const i = t.retryAfterMs;
	return typeof i == "number" && Number.isFinite(i) && i > 0 ? i : null;
}
function Nz(e) {
	const {
			client: t,
			userId: i,
			channel: u,
			readGeneration: s,
			memberNames: o,
			announce: f,
			threadRootKey: h,
			setThreadRootKey: m,
			isNarrow: v,
			onRequestStart: g,
			onRequestSettled: S,
			sendInFlight: b,
			onNewestVisible: p,
			openedAtLastReadAt: T,
		} = e,
		[A, N] = (0, _.useState)([]),
		[q, I] = (0, _.useState)(!1),
		[C, k] = (0, _.useState)(null),
		[L, Q] = (0, _.useState)({ hasMore: !1, atCapacity: !1, incomplete: !1 }),
		[K, O] = (0, _.useState)([]),
		[$, V] = (0, _.useState)([]),
		[Y, ae] = (0, _.useState)(tc),
		[se, te] = (0, _.useState)(tc),
		[fe, j] = (0, _.useState)(null),
		[B, P] = (0, _.useState)({ kind: "idle" }),
		[ge, be] = (0, _.useState)(wh),
		[Pe, M] = (0, _.useState)(0),
		[D, le] = (0, _.useState)(null),
		[oe, me] = (0, _.useState)(null),
		[Se, Re] = (0, _.useState)(null),
		[Le, Xe] = (0, _.useState)(null),
		[pt, At] = (0, _.useState)(!1),
		[vn, en] = (0, _.useState)(!1),
		[Be, ye] = (0, _.useState)(null),
		Ce = (0, _.useRef)(null),
		nt = (0, _.useRef)(null),
		Ve = (0, _.useRef)(null),
		Bt = (0, _.useRef)(null),
		et = (0, _.useRef)(null),
		ce = (0, _.useRef)(null),
		ze = (0, _.useRef)(null),
		rt = (0, _.useRef)(null),
		Ne = (0, _.useRef)(null),
		bt = (0, _.useRef)(null),
		pn = (0, _.useRef)({ reactions: null, replies: null }),
		ut = (0, _.useRef)({ reactions: !1, replies: !1 }),
		Vt = (0, _.useRef)(0),
		yr = (0, _.useRef)({ reactions: { delayMs: yh, timer: null }, replies: { delayMs: yh, timer: null } }),
		Yr = (0, _.useRef)(!1),
		pr = (0, _.useRef)(!1),
		Pn = (0, _.useRef)(null),
		kn = (0, _.useRef)(u.value.name),
		_t = (0, _.useRef)(null),
		tn = (0, _.useRef)(new Map()),
		ct = (0, _.useRef)(null),
		br = (0, _.useRef)(null),
		ar = (0, _.useRef)(0),
		_n = (0, _.useRef)(0),
		Ht = Go(u.key),
		Zt = yn(u.key) ? u.key : void 0,
		Qn = () => {
			((_n.current += 1), g());
		},
		Mn = () => {
			_n.current !== 0 && ((_n.current -= 1), S());
		};
	((0, _.useEffect)(() => {
		kn.current = u.value.name;
	}, [u.value.name]),
		(0, _.useEffect)(() => {
			Ya(t, "reconcile", { channelKey: u.key }).catch(() => {});
		}, [t, u.key]));
	const ur = (J) => {
			const ve = nt.current;
			ve !== null && (ve.apply_window(J), V(ve.get_sorted()));
		},
		Sn = (J) => {
			const ve = Ce.current;
			if (ve === null) return [];
			const Te = ve.apply_window(J);
			return (N(ve.get_sorted()), Te);
		},
		_r = (J, ve, Te, je, Qe) => {
			const Ct = ve.at(-1),
				St =
					Ct === void 0 ? null : J === "reactions" ? (Ct.targetKey === void 0 ? null : bc(Ct.targetKey)) : ms(Ct.key);
			Te.length > 0 && (pn.current[J] = Te[Te.length - 1].key);
			const ht = {
				hasMore: Te.length === 0 ? !1 : !je,
				deepestRoot: St ?? (J === "reactions" ? et.current?.deepestRoot : ce.current?.deepestRoot) ?? null,
				incomplete: Qe,
				death: (J === "reactions" ? et.current?.death : ce.current?.death) ?? null,
			};
			J === "reactions"
				? ((et.current = ht), ae(ht), Qe || Pt("reactions"))
				: ((ce.current = ht), te(ht), Qe || Pt("replies"));
		},
		lr = (J) => {
			const ve = yr.current[J];
			ve.timer !== null && (clearTimeout(ve.timer), (ve.timer = null));
		},
		Pt = (J) => {
			(lr(J), (yr.current[J].delayMs = yh));
		},
		In = (J) => {
			if ((J === "reactions" ? et.current : ce.current)?.death != null) return;
			const ve = yr.current[J];
			if (ve.timer !== null) return;
			const Te = ve.delayMs,
				je = Te * (0.5 + Math.random());
			ve.timer = setTimeout(() => {
				((ve.timer = null), (ve.delayMs = Math.min(Te * 2, Az)), Sr(J));
			}, je);
		},
		Sr = (J) => {
			if (ut.current[J] || (J === "reactions" ? et.current : ce.current)?.death != null) return;
			ut.current[J] = !0;
			const ve = Vt.current,
				Te = pn.current[J];
			Sh(t, { collection: J, keyPrefix: Ht, ...(Te === null ? {} : { keyStartExclusive: Te }), limit: nc })
				.then((je) => {
					if (!(!Yr.current || Vt.current !== ve)) {
						if (((ut.current[J] = !1), J === "reactions")) {
							const Qe = Ve.current;
							if (Qe === null) return;
							const Ct = Qe.apply_window(je.documents);
							O(Qe.get_sorted());
							const St = je.documents.length === 0 && !je.isDone;
							(_r("reactions", Ct, je.documents, je.isDone, St), St && In("reactions"));
						} else {
							const Qe = nt.current;
							if (Qe === null) return;
							const Ct = Qe.apply_window(je.documents);
							V(Qe.get_sorted());
							const St = je.documents.length === 0 && !je.isDone;
							(_r("replies", Ct, je.documents, je.isDone, St), St && In("replies"));
						}
						Qt();
					}
				})
				.catch(() => {
					!Yr.current || Vt.current !== ve || ((ut.current[J] = !1), _r(J, [], [], !0, !0), In(J));
				});
		},
		Lt = (J) => {
			const ve = J === "reactions" ? et.current : ce.current;
			ve === null || !ve.incomplete || ve.death !== null || (lr(J), Sr(J));
		},
		Qt = () => {
			const J = ze.current;
			if (J !== null)
				for (const ve of ["reactions", "replies"]) {
					const Te = ve === "reactions" ? et.current : ce.current;
					Te === null ||
						!Te.hasMore ||
						Te.incomplete ||
						Te.death !== null ||
						((Te.deepestRoot === null || Te.deepestRoot < J) && Sr(ve));
				}
		},
		Sa = (J) => {
			if (pr.current) return;
			const ve = Rz(J);
			ve !== null && ((pr.current = !0), Xe(s), le(ve), me(ve), Re(ve));
		};
	(0, _.useEffect)(() => {
		let J = !0,
			ve = 0;
		const Te = Ce.current ?? lh(_c);
		((Ce.current = Te),
			(nt.current ??= lh(_c)),
			(Ve.current ??= lh(jk)),
			(Vt.current += 1),
			(Yr.current = !0),
			(pr.current = !1),
			(pn.current = { reactions: null, replies: null }),
			(ut.current = { reactions: !1, replies: !1 }),
			Pt("reactions"),
			Pt("replies"),
			(et.current = null),
			(ce.current = null),
			ae(tc),
			te(tc),
			Xe(null),
			le(null),
			me(null),
			Re(null),
			(Ne.current = null));
		const je = t.data.watchWindow({ collection: "messages", keyPrefix: Go(u.key), pageSize: 100 }, (Qe, Ct) => {
			if (Qe === null) {
				k({ reason: Ct?.reason });
				return;
			}
			k(null);
			const St = Te.apply_window(Qe.docs);
			(N(Te.get_sorted()), I(!0), Q({ hasMore: Qe.hasMore, atCapacity: Qe.atCapacity, incomplete: Qe.incomplete }));
			const ht = Qe.docs.at(-1)?.key ?? null;
			((rt.current = ht),
				(ze.current = ht === null ? null : bc(ht)),
				Sa(Qe.docs),
				et.current === null && !ut.current.reactions && Sr("reactions"),
				ce.current === null && !ut.current.replies && Sr("replies"),
				Qt());
			const Ur = _t.current;
			if (Ur === null) {
				_t.current = new Set(St.map((an) => an.key));
				return;
			}
			const Gn = Ne.current;
			if (Gn !== null) {
				const an = Qe.docs.findIndex((Tr) => Tr.key === Gn);
				if (an < 0) Ne.current = null;
				else {
					const Tr = Qe.docs.slice(an + 1);
					for (const qn of Tr) Ur.add(qn.key);
					(Tr.length > 0 || !Qe.hasMore) && (Ne.current = null);
				}
			}
			const Yt = St.filter((an) => !Ur.has(an.key) && an.createdBy !== i && an.value.deletedAt === null);
			for (const an of St) Ur.add(an.key);
			const $i = Yt.length > 0 ? ++ve : ve;
			if (Yt.length === 1) {
				const an = Yt[0];
				o.resolve([an.createdBy])
					.then(() => {
						if (!J || $i !== ve) return;
						const Tr = o.get(an.createdBy) ?? null,
							qn = an.value.text,
							Gr = qn.length > 80 ? `${qn.slice(0, 80)}…` : qn;
						f(`${Tr ?? "Former member"}: ${Gr}`);
					})
					.catch(() => {
						!J || $i !== ve || f(`New message in #${kn.current}`);
					});
			} else Yt.length > 1 && f(`${Yt.length} new messages in #${kn.current}`);
		});
		return (
			(Bt.current = je),
			() => {
				((J = !1), (Yr.current = !1), Pt("reactions"), Pt("replies"), (Bt.current = null), je.unsubscribe());
			}
		);
	}, [t, u.key, s, i, o, f]);
	const Ln = Zt === void 0 ? {} : { scopeId: Zt };
	((0, _.useEffect)(() => {
		if (!(D === null || Le !== s))
			return t.data.watchChanges({ collection: "messages", limit: 100, updatedSince: D, ...Ln }, (J, ve) => {
				if (J === null) {
					k({ reason: ve?.reason });
					return;
				}
				k(null);
				const Te = Ce.current;
				if (Te === null) return;
				const je = _h(J.docs, Ht);
				(Te.apply_window(je),
					N(Te.get_sorted()),
					J.truncated &&
						rt.current !== null &&
						Sh(t, { collection: "messages", keyPrefix: Ht, keyStartExclusive: rt.current, limit: nc })
							.then((St) => {
								Sn(St.documents);
							})
							.catch(() => {}));
				const Qe = ph(J.docs),
					Ct = bh({ current: D, newest: Qe, truncated: J.truncated });
				Ct !== null && le(Ct);
			});
	}, [t, u.key, D, Le, s, Zt, Ht]),
		(0, _.useEffect)(() => {
			if (!(oe === null || Le !== s))
				return t.data.watchChanges({ collection: "replies", limit: 100, updatedSince: oe, ...Ln }, (J, ve) => {
					if (J === null) {
						lr("replies");
						const ht = {
							...(ce.current ?? { hasMore: !1, deepestRoot: null, incomplete: !1, death: null }),
							incomplete: !1,
							death: { reason: ve?.reason },
						};
						((ce.current = ht), te(ht));
						return;
					}
					const Te = nt.current;
					if (Te === null) return;
					const je = ce.current;
					if (je !== null && je.death !== null) {
						const ht = { ...je, death: null };
						((ce.current = ht), te(ht));
					}
					const Qe = _h(J.docs, Ht);
					(Te.apply_window(Qe), V(Te.get_sorted()), Lt("replies"));
					const Ct = ph(J.docs),
						St = bh({ current: oe, newest: Ct, truncated: J.truncated });
					St !== null && me(St);
				});
		}, [t, u.key, oe, Le, s, Zt, Ht]),
		(0, _.useEffect)(() => {
			if (!(Se === null || Le !== s))
				return t.data.watchChanges({ collection: "reactions", limit: 100, updatedSince: Se, ...Ln }, (J, ve) => {
					if (J === null) {
						lr("reactions");
						const ht = {
							...(et.current ?? { hasMore: !1, deepestRoot: null, incomplete: !1, death: null }),
							incomplete: !1,
							death: { reason: ve?.reason },
						};
						((et.current = ht), ae(ht));
						return;
					}
					const Te = Ve.current;
					if (Te === null) return;
					const je = et.current;
					if (je !== null && je.death !== null) {
						const ht = { ...je, death: null };
						((et.current = ht), ae(ht));
					}
					const Qe = _h(J.docs, Ht);
					(Te.apply_window(Qe), O(Te.get_sorted()), Lt("reactions"));
					const Ct = ph(J.docs),
						St = bh({ current: Se, newest: Ct, truncated: J.truncated });
					St !== null && Re(St);
				});
		}, [t, u.key, Se, Le, s, Zt, Ht]),
		(0, _.useEffect)(() => {
			const J = () => {
				document.visibilityState === "visible" && (Lt("reactions"), Lt("replies"));
			};
			return (
				document.addEventListener("visibilitychange", J),
				() => document.removeEventListener("visibilitychange", J)
			);
		}, [t, u.key]),
		(0, _.useEffect)(() => {
			if (h === null) {
				(At(!0), en(!1), ye(null));
				return;
			}
			let J = !1;
			return (
				At(!1),
				en(!1),
				ye(null),
				Sh(t, { collection: "replies", keyPrefix: a_(h), limit: nc })
					.then((ve) => {
						J || (ur(ve.documents), en(!ve.isDone), At(!0));
					})
					.catch((ve) => {
						J || (ye(zn(ve)), At(!0));
					}),
				() => {
					J = !0;
				}
			);
		}, [t, h, s]));
	const nn = pS({
		client: t,
		collection: "messages",
		keyPrefix: Go(u.key),
		userId: i,
		getAuthorName: () => o.get(i) ?? null,
		onDelivered: (J) => {
			(Ce.current?.apply_local(J), _t.current?.add(J.key), N(Ce.current?.get_sorted() ?? []));
		},
		onRequestStart: Qn,
		onRequestSettled: Mn,
		onStorageFull: j,
	});
	((0, _.useEffect)(() => {
		const J = new Set();
		for (const ve of A) {
			J.add(ve.createdBy);
			for (const Te of ve.value.mentions ?? []) J.add(Te);
		}
		for (const ve of $) {
			J.add(ve.createdBy);
			for (const Te of ve.value.mentions ?? []) J.add(Te);
		}
		J.size > 0 && o.resolve([...J]);
	}, [A, $, o]),
		(0, _.useEffect)(() => {
			A.length > 0 && p(A[0].timestamp);
		}, [A, p]),
		(0, _.useEffect)(() => {
			const J = A.length > 0 ? A[0].key : null,
				ve = J !== null && J !== br.current,
				Te = nn.pending.length > ar.current;
			((br.current = J),
				(ar.current = nn.pending.length),
				(ve || Te) && ct.current && (ct.current.scrollTop = ct.current.scrollHeight));
		}, [A, nn.pending.length]));
	const Li = () => {
			const J = Bt.current;
			J !== null && ((Ne.current = rt.current), J.loadOlder());
		},
		wa = () => {
			const J = bt.current ?? rt.current;
			J !== null &&
				(P({ kind: "loading" }),
				t
					.fetchJson("/api/v1/plugin-data/list", {
						body: { collection: "messages", keyPrefix: Go(u.key), keyStartExclusive: J, limit: nc },
					})
					.then((ve) => {
						const Te = l_.safeParse(ve);
						if (!Te.success) {
							P({ kind: "failed", message: "Unexpected response for older messages.", retryAt: null });
							return;
						}
						const je = Ce.current;
						if (je === null) return;
						if (Te.data.documents.length === 0 && !Te.data.isDone) {
							P({
								kind: "failed",
								message: "Older messages returned an incomplete page. Please retry.",
								retryAt: null,
							});
							return;
						}
						const Qe = Te.data.documents.at(-1);
						Qe !== void 0 && (bt.current = Qe.key);
						const Ct = je.apply_window(Te.data.documents);
						N(je.get_sorted());
						for (const St of Ct) _t.current?.add(St.key);
						P(Te.data.isDone ? { kind: "exhausted" } : { kind: "idle" });
					})
					.catch((ve) => {
						if (ve.status !== 429) {
							P({ kind: "failed", message: zn(ve), retryAt: null });
							return;
						}
						const Te = Mz(ve.responseText) ?? 1e3;
						P({
							kind: "failed",
							message: "Older messages are being loaded too quickly. Waiting a moment before you can try again.",
							retryAt: Date.now() + Te,
						});
					}));
		};
	((0, _.useEffect)(() => {
		if (B.kind !== "failed" || B.retryAt === null) return;
		const J = setTimeout(
			() => {
				P({ kind: "idle" });
			},
			Math.max(0, B.retryAt - Date.now()),
		);
		return () => {
			clearTimeout(J);
		};
	}, [B]),
		(0, _.useEffect)(() => {
			const J = Pn.current;
			if (h === null || J === null) return;
			M(J.clientWidth);
			const ve = new ResizeObserver(() => M(J.clientWidth));
			return (ve.observe(J), () => ve.disconnect());
		}, [h]));
	const qt = (J) => {
			const ve = Math.max(rc, Pe - X0);
			return Math.min(ve, Math.max(rc, J));
		},
		Dt = (J) => {
			J.key === "ArrowLeft"
				? (J.preventDefault(), be(qt(ge + J0)))
				: J.key === "ArrowRight"
					? (J.preventDefault(), be(qt(ge - J0)))
					: J.key === "Home" && (J.preventDefault(), be(qt(wh)));
		},
		rn = (J) => {
			(J.preventDefault(), J.currentTarget.setPointerCapture(J.pointerId));
		},
		wr = (J) => {
			if (!J.currentTarget.hasPointerCapture(J.pointerId)) return;
			const ve = Pn.current?.getBoundingClientRect();
			ve !== void 0 && be(qt(ve.right - J.clientX));
		},
		qr = (0, _.useMemo)(() => Bk(K, i), [K, i]),
		Er = (0, _.useMemo)(() => Vk($), [$]),
		ui = (J) => {
			(Ce.current?.apply_local(J), N(Ce.current?.get_sorted() ?? []));
		},
		qi = (J) => {
			(nt.current?.apply_local(J), V(nt.current?.get_sorted() ?? []));
		},
		Kn = (J) => {
			(Ve.current?.apply_local(J), O(Ve.current?.get_sorted() ?? []));
		},
		Ui = h === null ? [] : $.filter((J) => ms(J.key) === h),
		Kt = (J) => {
			if ((b || _n.current > 0) && h !== J.key) {
				f("Wait for pending message changes to finish before switching threads.");
				return;
			}
			m(J.key);
		},
		Yn = () => {
			if (b || _n.current > 0) {
				f("Wait for pending message changes to finish before closing the thread.");
				return;
			}
			const J = h;
			(m(null), J !== null && tn.current.get(J)?.focus());
		},
		Nn = h === null ? null : (A.find((J) => J.key === h) ?? null),
		sr = SS([...A].reverse(), Date.now(), T === null ? null : { lastReadAt: T, selfUserId: i }),
		Rt = Math.max(rc, Pe - X0),
		Ea = qt(ge);
	return C !== null && Zt === void 0
		? (0, w.jsx)("div", {
				className: "channel",
				children: (0, w.jsx)("div", {
					className: "channel-dead",
					role: "alert",
					children: ec(C.reason, `messages in #${u.value.name}`),
				}),
			})
		: (0, w.jsxs)("div", {
				className: "channel",
				children: [
					(0, w.jsxs)("header", {
						className: "channel-head",
						children: [
							(0, w.jsxs)("div", {
								className: "channel-head-main",
								children: [
									(0, w.jsxs)("h2", { className: "channel-title", children: ["#", u.value.name] }),
									u.value.topic !== void 0 && u.value.topic !== ""
										? (0, w.jsx)("p", { className: "channel-topic", children: u.value.topic })
										: null,
									yn(u.key) ? (0, w.jsx)("p", { className: "channel-privacy", children: om }) : null,
								],
							}),
							u.value.archivedAt !== null
								? (0, w.jsx)("span", { className: "channel-archived-badge", children: "Archived" })
								: null,
						],
					}),
					(0, w.jsxs)("div", {
						ref: Pn,
						className: "channel-body",
						style: { "--thread-width": `${Ea}px` },
						children: [
							(0, w.jsxs)("div", {
								ref: ct,
								className: "message-log",
								role: "log",
								"aria-live": "off",
								"aria-label": `Messages in #${u.value.name}`,
								children: [
									C !== null
										? (0, w.jsx)("div", {
												className: "channel-status is-error",
												role: "alert",
												children: ec(C.reason, `messages in #${u.value.name}`),
											})
										: null,
									q && L.hasMore && !L.atCapacity
										? (0, w.jsx)("div", {
												className: "log-older",
												children: (0, w.jsx)("button", {
													type: "button",
													className: "button",
													onClick: Li,
													children: "Load older",
												}),
											})
										: null,
									q && L.hasMore && L.atCapacity
										? (0, w.jsxs)("div", {
												className: "log-older",
												children: [
													(0, w.jsx)("span", {
														className: "channel-status",
														role: "status",
														children:
															B.kind === "loading"
																? "Loading older messages…"
																: B.kind === "exhausted"
																	? `You have reached the start of #${u.value.name}.`
																	: "The live view stopped growing. Older messages load on request.",
													}),
													B.kind === "exhausted"
														? null
														: (0, w.jsx)("button", {
																type: "button",
																className: "button",
																disabled: B.kind === "loading" || (B.kind === "failed" && B.retryAt !== null),
																onClick: wa,
																children: "Load older messages",
															}),
													B.kind === "failed"
														? (0, w.jsx)("span", {
																className: "channel-status is-error",
																role: "alert",
																children: B.message,
															})
														: null,
												],
											})
										: null,
									L.incomplete
										? (0, w.jsx)("div", {
												className: "channel-status",
												role: "alert",
												children: "Older messages in view may be out of date.",
											})
										: null,
									Y.incomplete || se.incomplete
										? (0, w.jsx)("div", {
												className: "channel-status",
												role: "alert",
												children: "Some reactions and replies in this range could not be loaded.",
											})
										: null,
									Y.death !== null
										? (0, w.jsx)("div", {
												className: "channel-status is-error",
												role: "alert",
												children: ec(Y.death.reason, "reactions in this channel"),
											})
										: null,
									se.death !== null
										? (0, w.jsx)("div", {
												className: "channel-status is-error",
												role: "alert",
												children: ec(se.death.reason, "reply counts in this channel"),
											})
										: null,
									q
										? A.length === 0 && nn.pending.length === 0
											? (0, w.jsx)("div", { className: "channel-status", children: "No messages yet" })
											: (0, w.jsxs)("ul", {
													className: "message-list",
													children: [
														sr.map((J) =>
															J.kind === "divider"
																? (0, w.jsx)("li", { className: "day-divider", children: J.label }, J.key)
																: J.kind === "new"
																	? (0, w.jsx)(
																			"li",
																			{
																				className: "new-divider",
																				children: (0, w.jsx)("span", {
																					className: "new-divider-label",
																					children: "New messages",
																				}),
																			},
																			J.key,
																		)
																	: (0, w.jsx)(
																			Xh,
																			{
																				client: t,
																				collection: "messages",
																				doc: J.doc,
																				isOwn: J.doc.createdBy === i,
																				selfUserId: i,
																				memberNames: o,
																				isContinuation: J.isContinuation,
																				authorName: o.get(J.doc.createdBy),
																				reactionGroups: Jh(Y, qr, J.doc.key),
																				replyCount: kz(se, Er, J.doc.key),
																				replyLatestAt: Er.get(J.doc.key)?.latestAt ?? null,
																				repliesHasMore: se.hasMore,
																				onOpenThread: Kt,
																				threadDisabled: b,
																				replyTriggerRef: (ve) => {
																					ve === null ? tn.current.delete(J.doc.key) : tn.current.set(J.doc.key, ve);
																				},
																				onApplyLocal: ui,
																				onRequestStart: Qn,
																				onRequestSettled: Mn,
																				onApplyReaction: Kn,
																				onStorageFull: j,
																			},
																			J.doc.key,
																		),
														),
														nn.pending.map((J) =>
															(0, w.jsx)(wS, { pending: J, onRetry: () => nn.retry(J) }, J.clientRequestId),
														),
													],
												})
										: (0, w.jsx)("div", { className: "channel-status", role: "status", children: "Loading messages…" }),
								],
							}),
							Nn !== null
								? (0, w.jsx)("div", {
										className: "thread-resize",
										role: "separator",
										tabIndex: 0,
										"aria-orientation": "vertical",
										"aria-label": "Resize thread panel",
										"aria-valuenow": Ea,
										"aria-valuemin": rc,
										"aria-valuemax": Rt,
										onKeyDown: Dt,
										onPointerDown: rn,
										onPointerMove: wr,
										onDoubleClick: () => be(qt(wh)),
									})
								: null,
							Nn !== null
								? (0, w.jsx)(
										xz,
										{
											client: t,
											userId: i,
											root: Nn,
											replies: Ui,
											repliesLoaded: pt,
											repliesTruncated: vn,
											repliesError: Be,
											reactionCoverage: Y,
											reactionGroupsByTarget: qr,
											memberNames: o,
											isNarrow: v,
											storageFull: fe,
											onStorageFull: j,
											onApplyLocalRoot: ui,
											onApplyLocalReply: qi,
											onRequestStart: Qn,
											onRequestSettled: Mn,
											sendInFlight: b,
											announce: f,
											onApplyReaction: Kn,
											onClose: Yn,
										},
										Nn.key,
									)
								: null,
						],
					}),
					fe !== null ? (0, w.jsx)("div", { className: "channel-status is-error", role: "alert", children: fe }) : null,
					b
						? (0, w.jsx)("div", {
								className: "channel-status",
								role: "status",
								children: "Wait for pending message changes to finish before leaving this channel or thread.",
							})
						: null,
					(0, w.jsx)(bS, {
						client: t,
						label: `Message #${u.value.name}`,
						busy: nn.busy,
						disabled: fe !== null,
						onSend: nn.send,
					}),
				],
			});
}
var Ns = ai([ws], [qc]),
	Oz = Ns.useContext,
	zz = Ns.useScopedContext,
	Sj = Ns.useProviderContext,
	wj = Ns.ContextProvider,
	Ej = Ns.ScopedContextProvider,
	Tj = (0, _.createContext)(void 0),
	Os = ai([C_], [Hc]),
	xj = Os.useContext,
	Aj = Os.useScopedContext,
	Vm = Os.useProviderContext,
	Dz = Os.ContextProvider,
	TS = Os.ScopedContextProvider,
	zs = ai([ws, Dz], [qc, TS]),
	xS = zs.useContext,
	jz = zs.useScopedContext,
	Wc = zs.useProviderContext,
	AS = zs.ContextProvider,
	Iz = zs.ScopedContextProvider,
	Rj = (0, _.createContext)(void 0),
	Lz = "div",
	Ci = "";
function Eh() {
	Ci = "";
}
function qz(e) {
	const t = e.target;
	return t && ii(t)
		? !1
		: e.key === " " && Ci.length
			? !0
			: e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey && /^[\p{Letter}\p{Number}]$/u.test(e.key);
}
function Uz(e, t) {
	if (vr(e)) return !0;
	const i = e.target;
	return i ? t.some((u) => u.element === i) : !1;
}
function $z(e) {
	return e.filter((t) => !t.disabled);
}
function sc(e, t) {
	var i;
	const u = ((i = e.element) == null ? void 0 : i.textContent) || e.children || ("value" in e && e.value);
	return u ? m_(u).trim().toLowerCase().startsWith(t.toLowerCase()) : !1;
}
function Bz(e, t, i) {
	if (!i) return e;
	const u = e.find((s) => s.id === i);
	return !u || !sc(u, t) || (Ci !== t && sc(u, Ci))
		? e
		: ((Ci = t),
			hM(
				e.filter((s) => sc(s, Ci)),
				i,
			).filter((s) => s.id !== i));
}
var Hm = tt(function ({ store: t, typeahead: i = !0, ...u }) {
		const s = Lc();
		((t = t || s), Jt(t, !1));
		const o = u.onKeyDownCapture,
			f = (0, _.useRef)(0),
			h = De((m) => {
				if ((o?.(m), m.defaultPrevented || !i || !t)) return;
				if (!qz(m)) return Eh();
				const { renderedItems: v, items: g, activeId: S, id: b } = t.getState();
				let p = $z(g.length > v.length ? g : v);
				const T = xt(m.currentTarget),
					A = `[data-offscreen-id="${b}"]`,
					N = T.querySelectorAll(A);
				for (const C of N) {
					const k = C.ariaDisabled === "true" || ("disabled" in C && !!C.disabled);
					p.push({ id: C.id, element: C, disabled: k });
				}
				if ((N.length && (p = d_(p, (C) => C.element)), !Uz(m, p))) return Eh();
				(m.preventDefault(),
					window.clearTimeout(f.current),
					(f.current = window.setTimeout(() => {
						Ci = "";
					}, 500)));
				const q = m.key.toLowerCase();
				((Ci += q), (p = Bz(p, q, S)));
				const I = p.find((C) => sc(C, Ci));
				I ? t.move(I.id) : Eh();
			});
		return ((u = { ...u, onKeyDownCapture: h }), au(u));
	}),
	Cj = Fe(function (t) {
		return We(Lz, Hm(t));
	}),
	Vz = "div";
function Hz({ store: e, ...t }) {
	const [i, u] = (0, _.useState)(void 0),
		s = t["aria-label"],
		o = dn(e, "disclosureElement"),
		f = dn(e, "contentElement");
	return (
		(0, _.useEffect)(() => {
			const h = o;
			if (!h) return;
			const m = f;
			m && (s || m.hasAttribute("aria-label") ? u(void 0) : h.id && u(h.id));
		}, [s, o, f]),
		i
	);
}
var RS = tt(function ({ store: t, alwaysVisible: i, composite: u, ...s }) {
		const o = Wc();
		((t = t || o), Jt(t, !1));
		const f = t.parent,
			h = t.menubar,
			m = !!f,
			v = ji(s.id),
			g = s.onKeyDown,
			S = t.useState((k) => k.placement.split("-")[0]),
			b = t.useState((k) => (k.orientation === "both" ? void 0 : k.orientation)),
			p = b !== "vertical",
			T = dn(h, (k) => !!k && k.orientation !== "vertical"),
			A = De((k) => {
				if ((g?.(k), !k.defaultPrevented)) {
					if (m || (h && !p)) {
						const L = {
							ArrowRight: () => S === "left" && !p,
							ArrowLeft: () => S === "right" && !p,
							ArrowUp: () => S === "bottom" && p,
							ArrowDown: () => S === "top" && p,
						}[k.key];
						if (L?.()) return (k.stopPropagation(), k.preventDefault(), t?.hide());
					}
					if (h) {
						const L = {
								ArrowRight: () => {
									if (T) return h.next();
								},
								ArrowLeft: () => {
									if (T) return h.previous();
								},
								ArrowDown: () => {
									if (!T) return h.next();
								},
								ArrowUp: () => {
									if (!T) return h.previous();
								},
							}[k.key],
							Q = L?.();
						Q !== void 0 && (k.stopPropagation(), k.preventDefault(), h.move(Q));
					}
				}
			});
		s = Cn(s, (k) => (0, w.jsx)(Iz, { value: t, children: k }), [t]);
		const N = Hz({ store: t, ...s }),
			q = Kc(t.useState("mounted"), s.hidden, i),
			I = q ? { ...s.style, display: "none" } : s.style;
		s = {
			id: v,
			"aria-labelledby": N,
			hidden: q,
			...s,
			ref: Wt(v ? t.setContentElement : null, s.ref),
			style: I,
			onKeyDown: A,
		};
		const C = !!t.combobox;
		return (
			(u = u ?? !C),
			u && (s = { role: "menu", "aria-orientation": b, ...s }),
			(s = Sm({ store: t, composite: u, ...s })),
			(s = Hm({ store: t, typeahead: !C, ...s })),
			s
		);
	}),
	kj = Fe(function (t) {
		return We(Vz, RS(t));
	});
function Th(e) {
	return [e.clientX, e.clientY];
}
function W0(e, t) {
	const [i, u] = e;
	let s = !1;
	const o = t.length;
	for (let f = o, h = 0, m = f - 1; h < f; m = h++) {
		const [v, g] = t[h],
			[S, b] = t[m],
			[, p] = t[m === 0 ? f - 1 : m - 1] || [0, 0],
			T = (g - b) * (i - v) - (v - S) * (u - g);
		if (b < g) {
			if (u >= b && u < g) {
				if (T === 0) return !0;
				T > 0 && (u === b ? u > p && (s = !s) : (s = !s));
			}
		} else if (g < b) {
			if (u > g && u <= b) {
				if (T === 0) return !0;
				T < 0 && (u === b ? u < p && (s = !s) : (s = !s));
			}
		} else if (u === g && ((i >= S && i <= v) || (i >= v && i <= S))) return !0;
	}
	return s;
}
function Zz(e, t) {
	const { top: i, right: u, bottom: s, left: o } = t,
		[f, h] = e;
	return [f < o ? "left" : f > u ? "right" : null, h < i ? "top" : h > s ? "bottom" : null];
}
function eb(e, t) {
	const i = e.getBoundingClientRect(),
		{ top: u, right: s, bottom: o, left: f } = i,
		[h, m] = Zz(t, i),
		v = [t];
	return (
		h
			? (m !== "top" && v.push([h === "left" ? f : s, u]),
				v.push([h === "left" ? s : f, u]),
				v.push([h === "left" ? s : f, o]),
				m !== "bottom" && v.push([h === "left" ? f : s, o]))
			: m === "top"
				? (v.push([f, u]), v.push([f, o]), v.push([s, o]), v.push([s, u]))
				: (v.push([f, o]), v.push([f, u]), v.push([s, u]), v.push([s, o])),
		v
	);
}
var Pz = "div";
function CS(e, t, i, u) {
	return ha(t) ? !0 : e ? !!(mn(t, e) || (i && mn(i, e)) || u?.some((s) => CS(e, s, i))) : !1;
}
function Qz({ store: e, ...t }) {
	const [i, u] = (0, _.useState)(!1),
		s = e.useState("mounted");
	(0, _.useEffect)(() => {
		s || u(!1);
	}, [s]);
	const o = t.onFocus,
		f = De((m) => {
			(o?.(m), !m.defaultPrevented && u(!0));
		}),
		h = (0, _.useRef)(null);
	return (
		(0, _.useEffect)(
			() =>
				Dn(e, ["anchorElement"], (m) => {
					h.current = m.anchorElement;
				}),
			[],
		),
		(t = { autoFocusOnHide: i, finalFocus: h, ...t, onFocus: f }),
		t
	);
}
var tb = (0, _.createContext)(null),
	kS = tt(function ({
		store: t,
		modal: i = !1,
		portal: u = !!i,
		hideOnEscape: s = !0,
		hideOnHoverOutside: o = !0,
		disablePointerEventsOnApproach: f = !!o,
		...h
	}) {
		const m = Vm();
		((t = t || m), Jt(t, !1));
		const v = (0, _.useRef)(null),
			[g, S] = (0, _.useState)([]),
			b = (0, _.useRef)(0),
			p = (0, _.useRef)(null),
			{ portalRef: T, domReady: A } = gm(u, h.portalRef),
			N = ym(),
			q = !!o,
			I = Mt(o),
			C = !!f,
			k = Mt(f),
			L = t.useState("open"),
			Q = t.useState("mounted");
		((0, _.useEffect)(() => {
			if (!A || !Q || (!q && !C)) return;
			const Y = v.current;
			return Y
				? rr(
						Rn(
							"mousemove",
							(se) => {
								if (!t || !N()) return;
								const { anchorElement: te, hideTimeout: fe, timeout: j } = t.getState(),
									B = p.current,
									[P] = se.composedPath(),
									ge = te;
								if (CS(P, Y, ge, g)) {
									((p.current = P && ge && mn(ge, P) ? Th(se) : null), window.clearTimeout(b.current), (b.current = 0));
									return;
								}
								if (!b.current) {
									if (B) {
										const be = Th(se);
										if (W0(be, eb(Y, B))) {
											if (((p.current = be), !k(se))) return;
											(se.preventDefault(), se.stopPropagation());
											return;
										}
									}
									I(se) &&
										(b.current = window.setTimeout(() => {
											((b.current = 0), t?.hide());
										}, fe ?? j));
								}
							},
							!0,
						),
						() => clearTimeout(b.current),
					)
				: void 0;
		}, [t, N, A, Q, q, C, g, k, I]),
			(0, _.useEffect)(() => {
				if (!A || !Q || !C) return;
				const Y = (ae) => {
					const se = v.current;
					if (!se) return;
					const te = p.current;
					if (!te) return;
					const fe = eb(se, te);
					if (W0(Th(ae), fe)) {
						if (!k(ae)) return;
						(ae.preventDefault(), ae.stopPropagation());
					}
				};
				return rr(Rn("mouseenter", Y, !0), Rn("mouseover", Y, !0), Rn("mouseout", Y, !0), Rn("mouseleave", Y, !0));
			}, [A, Q, C, k]),
			(0, _.useEffect)(() => {
				A && (L || t?.setAutoFocusOnShow(!1));
			}, [t, A, L]));
		const K = __(L);
		(0, _.useEffect)(() => {
			if (A)
				return () => {
					K.current || t?.setAutoFocusOnShow(!1);
				};
		}, [t, A]);
		const O = (0, _.useContext)(tb);
		ot(() => {
			if (i || !u || !Q || !A) return;
			const Y = v.current;
			if (Y) return O?.(Y);
		}, [i, u, Q, A]);
		const $ = (0, _.useCallback)(
			(Y) => {
				S((se) => [...se, Y]);
				const ae = O?.(Y);
				return () => {
					(S((se) => se.filter((te) => te !== Y)), ae?.());
				};
			},
			[O],
		);
		((h = Cn(h, (Y) => (0, w.jsx)(TS, { value: t, children: (0, w.jsx)(tb.Provider, { value: $, children: Y }) }), [
			t,
			$,
		])),
			(h = { ...h, ref: Wt(v, h.ref) }),
			(h = Qz({ store: t, ...h })));
		const V = t.useState((Y) => i || Y.autoFocusOnShow);
		return (
			(h = Bm({
				store: t,
				modal: i,
				portal: u,
				autoFocusOnShow: V,
				...h,
				portalRef: T,
				hideOnEscape(Y) {
					return Dc(s, Y)
						? !1
						: (requestAnimationFrame(() => {
								requestAnimationFrame(() => {
									t?.hide();
								});
							}),
							!0);
				},
			})),
			h
		);
	}),
	Mj = ks(
		Fe(function (t) {
			return We(Pz, kS(t));
		}),
		Vm,
	),
	Kz = "div",
	Yz = tt(function ({
		store: t,
		modal: i = !1,
		portal: u = !!i,
		hideOnEscape: s = !0,
		autoFocusOnShow: o = !0,
		hideOnHoverOutside: f,
		alwaysVisible: h,
		...m
	}) {
		const v = Wc();
		((t = t || v), Jt(t, !1));
		const g = (0, _.useRef)(null),
			S = t.parent,
			b = t.menubar,
			p = !!S,
			T = !!b && !p;
		m = { ...m, ref: Wt(g, m.ref) };
		const { "aria-labelledby": A, ...N } = RS({ store: t, alwaysVisible: h, ...m });
		m = N;
		const [q, I] = (0, _.useState)(),
			C = t.useState("autoFocusOnShow"),
			k = t.useState("initialFocus"),
			L = t.useState("baseElement"),
			Q = t.useState("renderedItems");
		(0, _.useEffect)(() => {
			let se = !1;
			return (
				I((te) => {
					var fe, j, B;
					if (se || !C) return;
					if ((fe = te?.current) != null && fe.isConnected) return te;
					const P = (0, _.createRef)();
					switch (k) {
						case "first":
							P.current = ((j = Q.find((ge) => !ge.disabled && ge.element)) == null ? void 0 : j.element) || null;
							break;
						case "last":
							P.current =
								((B = [...Q].reverse().find((ge) => !ge.disabled && ge.element)) == null ? void 0 : B.element) || null;
							break;
						default:
							P.current = L;
					}
					return P;
				}),
				() => {
					se = !0;
				}
			);
		}, [t, C, k, Q, L]);
		const K = p ? !1 : i,
			O = !!o,
			$ = !!q || !!m.initialFocus || !!K,
			V = dn(t.combobox || t, "contentElement"),
			Y = dn(S?.combobox || S, "contentElement"),
			ae = (0, _.useMemo)(() => {
				if (!Y || !V) return;
				const se = V.getAttribute("role"),
					te = Y.getAttribute("role");
				if (!((te === "menu" || te === "menubar") && se === "menu")) return Y;
			}, [V, Y]);
		return (
			ae !== void 0 && (m = { preserveTabOrderAnchor: ae, ...m }),
			(m = kS({
				store: t,
				alwaysVisible: h,
				initialFocus: q,
				autoFocusOnShow: O ? $ && o : C || !!K,
				...m,
				hideOnEscape(se) {
					return Dc(s, se) ? !1 : (t?.hideAll(), !0);
				},
				hideOnHoverOutside(se) {
					const te = t?.getState().disclosureElement;
					return (typeof f == "function" ? f(se) : (f ?? (p ? !0 : T ? (te ? !ha(te) : !0) : !1)))
						? se.defaultPrevented || !p || !te || (kM(te, "mouseout", se), !ha(te))
							? !0
							: (requestAnimationFrame(() => {
									ha(te) || t?.hide();
								}),
								!1)
						: !1;
				},
				modal: K,
				portal: u,
				backdrop: p ? !1 : m.backdrop,
			})),
			(m = { "aria-labelledby": A, ...m }),
			m
		);
	}),
	Gz = ks(
		Fe(function (t) {
			return We(Kz, Yz(t));
		}),
		Wc,
	),
	Fz = "a",
	MS = tt(function ({ store: t, showOnHover: i = !0, ...u }) {
		const s = Vm();
		((t = t || s), Jt(t, !1));
		const o = bs(u),
			f = (0, _.useRef)(0);
		((0, _.useEffect)(() => () => window.clearTimeout(f.current), []),
			(0, _.useEffect)(
				() =>
					Rn(
						"mouseleave",
						(A) => {
							if (!t) return;
							const { anchorElement: N } = t.getState();
							N && A.target === N && (window.clearTimeout(f.current), (f.current = 0));
						},
						!0,
					),
				[t],
			));
		const h = u.onMouseMove,
			m = Mt(i),
			v = ym(),
			g = De((T) => {
				if ((h?.(T), o || !t || T.defaultPrevented || f.current || !v() || !m(T))) return;
				const A = T.currentTarget;
				(t.setAnchorElement(A), t.setDisclosureElement(A));
				const { showTimeout: N, timeout: q } = t.getState(),
					I = () => {
						((f.current = 0),
							v() &&
								(t?.setAnchorElement(A),
								t?.show(),
								queueMicrotask(() => {
									t?.setDisclosureElement(A);
								})));
					},
					C = N ?? q;
				C === 0 ? I() : (f.current = window.setTimeout(I, C));
			}),
			S = u.onClick,
			b = De((T) => {
				(S?.(T), t && (window.clearTimeout(f.current), (f.current = 0)));
			}),
			p = (0, _.useCallback)(
				(T) => {
					if (!t) return;
					const { anchorElement: A } = t.getState();
					A?.isConnected || t.setAnchorElement(T);
				},
				[t],
			);
		return ((u = { ...u, ref: Wt(p, u.ref), onMouseMove: g, onClick: b }), (u = Es(u)), u);
	}),
	Nj = Fe(function (t) {
		return We(Fz, MS(t));
	}),
	Xz = "button",
	NS = tt(function ({ store: t, ...i }) {
		const u = Vc();
		((t = t || u), Jt(t, !1));
		const s = i.onClick,
			o = De((f) => {
				(t?.setAnchorElement(f.currentTarget), s?.(f));
			});
		return (
			(i = Cn(i, (f) => (0, w.jsx)(Hc, { value: t, children: f }), [t])),
			(i = { ...i, onClick: o }),
			(i = Tm({ store: t, ...i })),
			(i = j_({ store: t, ...i })),
			i
		);
	}),
	Oj = Fe(function (t) {
		return We(Xz, NS(t));
	}),
	Jz = "button";
function Wz(e, t) {
	return {
		ArrowDown: t === "bottom" || t === "top" ? "first" : !1,
		ArrowUp: t === "bottom" || t === "top" ? "last" : !1,
		ArrowRight: t === "right" ? "first" : !1,
		ArrowLeft: t === "left" ? "first" : !1,
	}[e.key];
}
function nb(e, t) {
	return !!e?.some((i) => (!i.element || i.element === t ? !1 : i.element.getAttribute("aria-expanded") === "true"));
}
var eD = tt(function ({ store: t, focusable: i, accessibleWhenDisabled: u, showOnHover: s, ...o }) {
		const f = Wc();
		((t = t || f), Jt(t, !1));
		const h = (0, _.useRef)(null),
			m = t.parent,
			v = t.menubar,
			g = !!m,
			S = !!v && !g,
			b = bs(o),
			p = () => {
				const K = h.current;
				K && (t?.setDisclosureElement(K), t?.setAnchorElement(K), t?.show());
			},
			T = o.onFocus,
			A = De((K) => {
				if ((T?.(K), b || K.defaultPrevented || (t?.setAutoFocusOnShow(!1), t?.setActiveId(null), !v) || !S)) return;
				const { items: O } = v.getState();
				nb(O, K.currentTarget) && p();
			}),
			N = dn(t, (K) => K.placement.split("-")[0]),
			q = o.onKeyDown,
			I = De((K) => {
				if ((q?.(K), b || K.defaultPrevented)) return;
				const O = Wz(K, N);
				O && (K.preventDefault(), p(), t?.setAutoFocusOnShow(!0), t?.setInitialFocus(O));
			}),
			C = o.onClick,
			k = De((K) => {
				if ((C?.(K), K.defaultPrevented || !t)) return;
				const O = !K.detail,
					{ open: $ } = t.getState();
				((!$ || O) && ((!g || O) && t.setAutoFocusOnShow(!0), t.setInitialFocus(O ? "first" : "container")), g && p());
			});
		((o = Cn(o, (K) => (0, w.jsx)(AS, { value: t, children: K }), [t])),
			g && (o = { ...o, render: (0, w.jsx)(Ec.div, { render: o.render }) }));
		const L = ji(o.id),
			Q = dn(m?.combobox || m, "contentElement");
		return (
			(o = {
				id: L,
				role: g || S ? f_(Q, "menuitem") : void 0,
				"aria-haspopup": zc(t.useState("contentElement"), "menu"),
				...o,
				ref: Wt(h, o.ref),
				onFocus: A,
				onKeyDown: I,
				onClick: k,
			}),
			(o = MS({
				store: t,
				focusable: i,
				accessibleWhenDisabled: u,
				...o,
				showOnHover: (K) => {
					if (
						!(() => {
							if (typeof s == "function") return s(K);
							if (s != null) return s;
							if (g) return !0;
							if (!v) return !1;
							const { items: V } = v.getState();
							return S && nb(V);
						})()
					)
						return !1;
					const $ = S ? v : m;
					return ($ && $.setActiveId(K.currentTarget.id), !0);
				},
			})),
			(o = NS({ store: t, toggleOnClick: !g, focusable: i, accessibleWhenDisabled: u, ...o })),
			(o = Hm({ store: t, typeahead: S, ...o })),
			o
		);
	}),
	tD = Fe(function (t) {
		return We(Jz, eD(t));
	}),
	nD = "div";
function rD(e, t, i) {
	var u;
	if (!e) return !1;
	if (ha(e)) return !0;
	const s = t?.find((h) => {
			var m;
			return h.element === i ? !1 : ((m = h.element) == null ? void 0 : m.getAttribute("aria-expanded")) === "true";
		}),
		o = (u = s?.element) == null ? void 0 : u.getAttribute("aria-controls");
	if (!o) return !1;
	const f = xt(e).getElementById(o);
	return f ? (ha(f) ? !0 : !!f.querySelector("[role=menuitem][aria-expanded=true]")) : !1;
}
var iD = tt(function ({
		store: t,
		hideOnClick: i = !0,
		preventScrollOnKeyDown: u = !0,
		focusOnHover: s,
		blurOnHoverEnd: o,
		...f
	}) {
		const h = jz(!0),
			m = zz();
		((t = t || h || m), Jt(t, !1));
		const v = f.onClick,
			g = Mt(i),
			S = "hideAll" in t ? t.hideAll : void 0,
			b = !!S,
			p = De((T) => {
				(v?.(T),
					!T.defaultPrevented &&
						(b_(T) || p_(T) || (S && T.currentTarget.getAttribute("aria-haspopup") !== "menu" && g(T) && S())));
			});
		return (
			(f = {
				role: f_(
					dn(t, (T) => ("contentElement" in T ? T.contentElement : null)),
					"menuitem",
				),
				...f,
				onClick: p,
			}),
			(f = Mm({ store: t, preventScrollOnKeyDown: u, ...f })),
			(f = km({
				store: t,
				...f,
				focusOnHover(T) {
					const A = () => (typeof s == "function" ? s(T) : (s ?? !0));
					if (!t || !A()) return !1;
					const { baseElement: N, items: q } = t.getState();
					return b
						? (T.currentTarget.hasAttribute("aria-expanded") && T.currentTarget.focus(), !0)
						: rD(N, q, T.currentTarget)
							? (T.currentTarget.focus(), !0)
							: !1;
				},
				blurOnHoverEnd(T) {
					return typeof o == "function" ? o(T) : (o ?? b);
				},
			})),
			f
		);
	}),
	aD = Ic(
		Fe(function (t) {
			return We(nD, iD(t));
		}),
	);
function uD(e = {}) {
	var t;
	const i = (t = e.store) == null ? void 0 : t.getState(),
		u = cS({ ...e, placement: Ie(e.placement, i?.placement, "bottom") }),
		s = Ie(e.timeout, i?.timeout, 500),
		o = Kr(
			{
				...u.getState(),
				timeout: s,
				showTimeout: Ie(e.showTimeout, i?.showTimeout),
				hideTimeout: Ie(e.hideTimeout, i?.hideTimeout),
				autoFocusOnShow: Ie(i?.autoFocusOnShow, !1),
			},
			u,
			e.store,
		);
	return { ...u, ...o, setAutoFocusOnShow: (f) => o.setState("autoFocusOnShow", f) };
}
function lD(e, t, i) {
	return (Xt(e, i, "timeout"), Xt(e, i, "showTimeout"), Xt(e, i, "hideTimeout"), fS(e, t, i));
}
function sD({ combobox: e, parent: t, menubar: i, ...u } = {}) {
	const s = !!i && !t,
		o = Pc(
			u.store,
			N_(t, ["values"]),
			Rm(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
		);
	const f = o.getState(),
		h = mS({ ...u, store: o, orientation: Ie(u.orientation, f.orientation, "vertical") }),
		m = uD({
			...u,
			store: o,
			placement: Ie(u.placement, f.placement, "bottom-start"),
			timeout: Ie(u.timeout, f.timeout, s ? 0 : 150),
			hideTimeout: Ie(u.hideTimeout, f.hideTimeout, 0),
		}),
		v = Kr(
			{
				...h.getState(),
				...m.getState(),
				initialFocus: Ie(f.initialFocus, "container"),
				values: Ie(u.values, f.values, u.defaultValues, {}),
			},
			h,
			m,
			o,
		);
	return (
		Zn(v, () =>
			Dn(v, ["mounted"], (g) => {
				g.mounted || v.setState("activeId", null);
			}),
		),
		Zn(v, () =>
			Dn(t, ["orientation"], (g) => {
				v.setState("placement", g.orientation === "vertical" ? "right-start" : "bottom-start");
			}),
		),
		{
			...h,
			...m,
			...v,
			combobox: e,
			parent: t,
			menubar: i,
			hideAll: () => {
				(m.hide(), t?.hideAll());
			},
			setInitialFocus: (g) => v.setState("initialFocus", g),
			setValues: (g) => v.setState("values", g),
			setValue: (g, S) => {
				g !== "__proto__" &&
					g !== "constructor" &&
					(Array.isArray(g) ||
						v.setState("values", (b) => {
							const p = b[g],
								T = h_(S, p);
							return T === p ? b : { ...b, [g]: T !== void 0 && T };
						}));
			},
		}
	);
}
function oD(e, t, i) {
	return (
		il(t, [i.combobox, i.parent, i.menubar]),
		Xt(e, i, "values", "setValues"),
		Object.assign(lD(vS(e, t, i), t, i), { combobox: i.combobox, parent: i.parent, menubar: i.menubar })
	);
}
function cD(e = {}) {
	const t = xS(),
		i = Oz(),
		u = Zc();
	e = {
		...e,
		parent: e.parent !== void 0 ? e.parent : t,
		menubar: e.menubar !== void 0 ? e.menubar : i,
		combobox: e.combobox !== void 0 ? e.combobox : u,
	};
	const [s, o] = Qc(sD, e);
	return oD(s, o, e);
}
function fD(e = {}) {
	return (0, w.jsx)(AS, { value: cD(e), children: e.children });
}
var dD = "hr",
	hD = tt(function ({ store: t, ...i }) {
		const u = xS();
		return ((t = t || u), (i = yS({ store: t, ...i })), i);
	}),
	mD = Fe(function (t) {
		return We(dD, hD(t));
	}),
	vD = (0, _.memo)(function (t) {
		const { channelName: i, items: u } = t;
		return (0, w.jsxs)(fD, {
			placement: "bottom-end",
			children: [
				(0, w.jsx)(tD, {
					className: "ChannelRowMenu-trigger",
					"aria-label": `Actions for #${i}`,
					children: (0, w.jsx)(aM, { size: 16, "aria-hidden": "true" }),
				}),
				(0, w.jsx)(Gz, {
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					className: "ChannelRowMenu-popover",
					"aria-label": `Actions for #${i}`,
					children: u.map((s) =>
						"separator" in s
							? (0, w.jsx)(mD, { className: "ChannelRowMenu-separator" }, s.id)
							: (0, w.jsx)(
									aD,
									{
										className: s.danger ? "ChannelRowMenu-item ChannelRowMenu-item-danger" : "ChannelRowMenu-item",
										onClick: s.onSelect,
										children: s.label,
									},
									s.id,
								),
					),
				}),
			],
		});
	}),
	gD = 300 * 1e3;
function yD(e) {
	const t = (0, _.useRef)(new Map()),
		i = (0, _.useRef)(new Map()),
		u = (0, _.useRef)(new Map()),
		[, s] = (0, _.useState)(0),
		o = (0, _.useCallback)((h) => (t.current.has(h) ? t.current.get(h) : void 0), []),
		f = (0, _.useCallback)(
			async (h) => {
				const m = Date.now(),
					v = [],
					g = new Set();
				for (const S of new Set(h)) {
					const b = u.current.get(S);
					if (b !== void 0) {
						g.add(b);
						continue;
					}
					const p = i.current.get(S);
					(p === void 0 || m - p >= gD) && v.push(S);
				}
				for (let S = 0; S < v.length; S += 50) {
					const b = v.slice(S, S + 50),
						p = e.members
							.resolve(b)
							.then((T) => {
								for (const A of b) (t.current.set(A, T[A] ?? null), i.current.set(A, Date.now()));
							})
							.catch(() => {
								for (const T of b) i.current.delete(T);
							});
					for (const T of b) u.current.set(T, p);
					(p.then(() => {
						for (const T of b) u.current.get(T) === p && u.current.delete(T);
					}),
						g.add(p));
				}
				g.size !== 0 && (await Promise.all(g), s((S) => S + 1));
			},
			[e],
		);
	return (0, _.useMemo)(() => ({ get: o, resolve: f }), [o, f]);
}
function pD(e) {
	const [t, i] = (0, _.useState)(null);
	return (
		(0, _.useEffect)(() => {
			let u = !1;
			return (
				e.members.list({ limit: 100 }).then((s) => {
					if (!u) {
						if ("_nay" in s) {
							i({ members: [], error: u_(s._nay.name), truncated: !1 });
							return;
						}
						i({ members: s._yay.members, error: null, truncated: s._yay.cursor !== null });
					}
				}),
				() => {
					u = !0;
				}
			);
		}, [e]),
		t
	);
}
function OS(e) {
	const t = pD(e.client);
	if (t === null) return (0, w.jsx)("p", { className: "channel-status", role: "status", children: "Loading people…" });
	if (t.error !== null) return (0, w.jsx)("p", { className: "form-error", role: "alert", children: t.error });
	const i = t.members
		.filter((u) => u.userId !== e.selfUserId)
		.sort((u, s) => uc(u.displayName).localeCompare(uc(s.displayName)));
	return i.length === 0
		? (0, w.jsx)("p", { className: "channel-status", children: "Nobody else is in this workspace yet." })
		: (0, w.jsxs)(w.Fragment, {
				children: [
					(0, w.jsx)("ul", {
						className: "people-list",
						children: i.map((u) =>
							(0, w.jsx)(
								"li",
								{
									className: "people-item",
									children: (0, w.jsxs)("label", {
										children: [
											(0, w.jsx)("input", {
												type: "checkbox",
												checked: e.selected.includes(u.userId),
												disabled: e.disabled,
												onChange: (s) => e.onToggle(u.userId, s.currentTarget.checked),
											}),
											uc(u.displayName),
										],
									}),
								},
								u.userId,
							),
						),
					}),
					t.truncated
						? (0, w.jsx)("p", {
								className: "channel-status",
								children: "Showing the first 100 people in this workspace.",
							})
						: null,
				],
			});
}
function rb(e) {
	const t = (0, _.useId)(),
		i = (0, _.useId)(),
		u = (0, _.useId)(),
		s = (0, _.useId)(),
		[o, f] = (0, _.useState)(e.initialName),
		[h, m] = (0, _.useState)(e.initialTopic),
		[v, g] = (0, _.useState)(!1),
		[S, b] = (0, _.useState)([]),
		[p, T] = (0, _.useState)(null),
		A = e.busy || e.fieldsLocked,
		N = () => {
			if (e.busy || e.waiting) return;
			const C = o.trim();
			if (C.length < 1 || C.length > 64) {
				T("Enter a name between 1 and 64 characters.");
				return;
			}
			const k = h.trim();
			if (k.length > 250) {
				T("Keep the topic under 250 characters.");
				return;
			}
			(T(null), e.onSubmit(C, k, { isPrivate: v, userIds: S }));
		},
		q = p ?? e.error,
		I = () => {
			e.busy || e.onClose();
		};
	return (0, w.jsxs)(ll, {
		labelledBy: t,
		onClose: I,
		children: [
			(0, w.jsx)("h2", { id: t, className: "dialog-title", children: e.title }),
			(0, w.jsxs)("div", {
				className: "field",
				children: [
					(0, w.jsx)("label", { htmlFor: i, children: "Channel name" }),
					(0, w.jsx)("input", {
						id: i,
						"data-dialog-initial": !0,
						type: "text",
						value: o,
						maxLength: 64,
						disabled: A,
						onInput: (C) => f(C.currentTarget.value),
						onKeyDown: (C) => {
							C.key === "Enter" && (C.preventDefault(), N());
						},
					}),
				],
			}),
			(0, w.jsxs)("div", {
				className: "field",
				children: [
					(0, w.jsx)("label", { htmlFor: u, children: "Topic (optional)" }),
					(0, w.jsx)("input", {
						id: u,
						type: "text",
						value: h,
						maxLength: 250,
						disabled: A,
						onInput: (C) => m(C.currentTarget.value),
						onKeyDown: (C) => {
							C.key === "Enter" && (C.preventDefault(), N());
						},
					}),
				],
			}),
			e.privacy !== null
				? (0, w.jsxs)("div", {
						className: "field",
						children: [
							(0, w.jsxs)("label", {
								className: "checkbox-label",
								htmlFor: s,
								children: [
									(0, w.jsx)("input", {
										id: s,
										type: "checkbox",
										checked: v,
										disabled: A,
										onChange: (C) => g(C.currentTarget.checked),
									}),
									"Private channel",
								],
							}),
							v
								? (0, w.jsxs)(w.Fragment, {
										children: [
											(0, w.jsx)("p", { className: "field-note", children: om }),
											(0, w.jsx)("p", {
												className: "field-note",
												children: "Tick one person for a direct message, or several for a group.",
											}),
											(0, w.jsx)(OS, {
												client: e.privacy.client,
												selfUserId: e.privacy.selfUserId,
												selected: S,
												disabled: A,
												onToggle: (C, k) => b((L) => (k ? [...L, C] : L.filter((Q) => Q !== C))),
											}),
										],
									})
								: null,
						],
					})
				: null,
			q !== null ? (0, w.jsx)("p", { className: "form-error", role: "alert", children: q }) : null,
			(0, w.jsxs)("div", {
				className: "dialog-actions",
				children: [
					(0, w.jsx)("button", {
						type: "button",
						className: "button",
						disabled: e.busy,
						onClick: I,
						children: "Cancel",
					}),
					(0, w.jsx)("button", {
						type: "button",
						className: "button button-primary",
						disabled: e.busy || e.waiting,
						onClick: N,
						children: e.busy ? "Saving…" : e.waiting ? "Checking…" : e.fieldsLocked ? "Retry" : e.submitLabel,
					}),
				],
			}),
		],
	});
}
function bD(e) {
	const t = (0, _.useId)(),
		[i, u] = (0, _.useState)(void 0),
		[s, o] = (0, _.useState)(!1),
		[f, h] = (0, _.useState)(null),
		[m, v] = (0, _.useState)(!1),
		[g, S] = (0, _.useState)(null),
		b = (0, _.useRef)(!1),
		p = (0, _.useRef)(!0),
		T = (0, _.useRef)(0);
	(0, _.useEffect)(
		() => (
			(p.current = !0),
			() => {
				((p.current = !1), (T.current += 1));
			}
		),
		[],
	);
	const A = (0, _.useCallback)(() => {
		const k = (T.current += 1);
		return (
			o(!1),
			h(null),
			Promise.resolve()
				.then(() => e.client.scopes.listPrincipals({ scopeId: e.channel.key }))
				.then((L) => {
					if (!p.current || T.current !== k) return { kind: "cancelled" };
					const Q = os(L);
					return (
						o(!0),
						Q === null || "_nay" in Q
							? (u(void 0),
								h(Q !== null && "_nay" in Q ? Q._nay.message : "The people list response was invalid."),
								{ kind: "unavailable" })
							: (u(Q._yay),
								Q._yay !== null && e.memberNames.resolve(Q._yay.map((K) => K.userId)),
								{ kind: "exact", principals: Q._yay })
					);
				})
				.catch(() =>
					!p.current || T.current !== k
						? { kind: "cancelled" }
						: (o(!0), u(void 0), h("Failed to read who can access this"), { kind: "unavailable" }),
				)
		);
	}, [e.client, e.channel.key, e.memberNames]);
	(0, _.useEffect)(() => {
		A();
	}, [A]);
	const N = (k) => {
			b.current ||
				((b.current = !0),
				v(!0),
				S(null),
				k()
					.then((L) => {
						if ("_nay" in L) {
							if (L._nay.name === "unavailable")
								return A().then((Q) => {
									Q.kind !== "cancelled" &&
										S(
											Q.kind === "unavailable"
												? "We could not confirm the change, and the current people list could not be loaded."
												: Q.principals === null
													? "We could not confirm the change, and this people list is no longer readable."
													: "We could not confirm the change. The current people list is shown.",
										);
								});
							S(L._nay.message);
							return;
						}
						return A().then(() => {});
					})
					.finally(() => {
						((b.current = !1), v(!1));
					}));
		},
		q = new Set((i ?? []).map((k) => k.userId)),
		I = (i ?? []).some((k) => k.userId === e.selfUserId && k.level === "manage"),
		C = () => {
			m || e.onClose();
		};
	return (0, w.jsxs)(ll, {
		labelledBy: t,
		onClose: C,
		children: [
			(0, w.jsxs)("h2", { id: t, className: "dialog-title", children: ["People in #", e.channel.value.name] }),
			(0, w.jsx)("p", { className: "field-note", children: om }),
			s
				? f !== null
					? (0, w.jsx)("p", { className: "form-error", role: "alert", children: f })
					: i === void 0
						? (0, w.jsx)("p", { className: "channel-status", role: "status", children: "Loading people…" })
						: i === null
							? (0, w.jsx)("p", {
									className: "form-error",
									role: "alert",
									children: "This channel's people list is no longer readable. Reload the page.",
								})
							: (0, w.jsx)("ul", {
									className: "people-list current-people",
									"aria-label": "People in this channel",
									children: i.map((k) =>
										(0, w.jsxs)(
											"li",
											{
												className: "people-item",
												children: [
													(0, w.jsxs)("span", {
														children: [
															e.memberNames.get(k.userId) ?? k.userId,
															k.level === "manage" ? " (can add people)" : "",
														],
													}),
													I && k.userId !== e.selfUserId
														? (0, w.jsx)("button", {
																type: "button",
																className: "button channel-item-action",
																disabled: m,
																onClick: () =>
																	N(() =>
																		e.client.scopes.removePrincipal({ scopeId: e.channel.key, userId: k.userId }),
																	),
																children: "Remove",
															})
														: null,
												],
											},
											k.userId,
										),
									),
								})
				: (0, w.jsx)("p", { className: "channel-status", role: "status", children: "Loading people…" }),
			s && i !== void 0 && i !== null && I
				? (0, w.jsxs)("div", {
						className: "field",
						children: [
							(0, w.jsx)("p", { className: "field-label", children: "Add people" }),
							(0, w.jsx)(OS, {
								client: e.client,
								selfUserId: e.selfUserId,
								selected: [...q],
								disabled: m,
								onToggle: (k, L) =>
									N(() =>
										L
											? e.client.scopes.setPrincipal({ scopeId: e.channel.key, userId: k, level: "member" })
											: e.client.scopes.removePrincipal({ scopeId: e.channel.key, userId: k }),
									),
							}),
						],
					})
				: null,
			g !== null ? (0, w.jsx)("p", { className: "form-error", role: "alert", children: g }) : null,
			(0, w.jsxs)("div", {
				className: "dialog-actions",
				children: [
					s && f !== null
						? (0, w.jsx)("button", {
								type: "button",
								className: "button",
								"data-dialog-initial": !0,
								disabled: m,
								onClick: () => void A(),
								children: "Retry",
							})
						: null,
					(0, w.jsx)("button", {
						type: "button",
						className: "button",
						"data-dialog-initial": f === null ? !0 : void 0,
						disabled: m,
						onClick: C,
						children: "Close",
					}),
				],
			}),
		],
	});
}
function _D(e) {
	const t = (0, _.useId)(),
		i = () => {
			e.busy || e.onClose();
		};
	return (0, w.jsxs)(ll, {
		labelledBy: t,
		onClose: i,
		children: [
			(0, w.jsxs)("h2", { id: t, className: "dialog-title", children: ["Archive #", e.channelName, "?"] }),
			(0, w.jsx)("p", {
				children: "The channel is hidden from the list. Its messages stay stored and it can be unarchived any time.",
			}),
			e.error !== null ? (0, w.jsx)("p", { className: "form-error", role: "alert", children: e.error }) : null,
			(0, w.jsxs)("div", {
				className: "dialog-actions",
				children: [
					(0, w.jsx)("button", {
						type: "button",
						className: "button",
						"data-dialog-initial": !0,
						disabled: e.busy,
						onClick: i,
						children: "Cancel",
					}),
					(0, w.jsx)("button", {
						type: "button",
						className: "button button-danger",
						disabled: e.busy,
						onClick: e.onConfirm,
						children: e.busy ? "Archiving…" : e.retry ? "Retry" : "Archive channel",
					}),
				],
			}),
		],
	});
}
function SD(e) {
	const t = (0, _.useId)(),
		[i, u] = (0, _.useState)(void 0),
		[s, o] = (0, _.useState)(null),
		[f, h] = (0, _.useState)(0);
	(0, _.useEffect)(() => {
		let S = !1;
		return (
			u(void 0),
			o(null),
			Promise.resolve()
				.then(() => e.client.scopes.listPrincipals({ scopeId: e.channel.key }))
				.then((b) => {
					if (S) return;
					const p = os(b);
					if (p === null || "_nay" in p) {
						o(p !== null && "_nay" in p ? p._nay.message : "The people list response was invalid.");
						return;
					}
					u(p._yay?.length ?? null);
				})
				.catch(() => {
					S || o("Failed to read who can access this");
				}),
			() => {
				S = !0;
			}
		);
	}, [e.client, e.channel.key, f]);
	const m = e.action === "delete" || i === 1,
		v = () => {
			e.busy || e.onClose();
		},
		g =
			i === void 0
				? ""
				: e.action === "delete"
					? i === null
						? "We could not read how many people are in this channel. Deleting it will remove the channel for everyone who is in it. Nobody will be able to open the channel again. The organization owner may still be able to read messages that were copied into archived files. This cannot be undone."
						: `${i === 1 ? "This deletes the channel for the one person in it." : `This deletes the channel for all ${i} people in it.`} Nobody will be able to open the channel again. The organization owner may still be able to read messages that were copied into archived files. This cannot be undone.`
					: i === null
						? "We could not read who else is in this channel. If other people remain, they keep the channel and somebody who can add people has to add you back. If you are the only person left, leaving deletes it. Then nobody will be able to open the channel again. The organization owner may still be able to read messages that were copied into archived files."
						: i === 1
							? "You are the only person in this channel, so leaving deletes it. Nobody will be able to open the channel again. The organization owner may still be able to read messages that were copied into archived files. This cannot be undone."
							: `You stop seeing this channel and its messages here. If you are not the organization owner, you also lose access to its files. ${i === 2 ? "The other person keeps it." : `The other ${i - 1} people keep it.`} Somebody who can add people has to add you back.`;
	return (0, w.jsxs)(ll, {
		labelledBy: t,
		onClose: v,
		children: [
			(0, w.jsx)("h2", {
				id: t,
				className: "dialog-title",
				children:
					e.action === "delete" ? `Delete #${e.channel.value.name} for everyone?` : `Leave #${e.channel.value.name}?`,
			}),
			s !== null
				? (0, w.jsx)("p", { className: "form-error", role: "alert", children: s })
				: i === void 0
					? (0, w.jsx)("p", { role: "status", children: "Reading who is in this channel…" })
					: (0, w.jsx)("p", { children: g }),
			e.error !== null ? (0, w.jsx)("p", { className: "form-error", role: "alert", children: e.error }) : null,
			(0, w.jsxs)("div", {
				className: "dialog-actions",
				children: [
					(0, w.jsx)("button", {
						type: "button",
						className: "button",
						"data-dialog-initial": s === null ? !0 : void 0,
						disabled: e.busy,
						onClick: v,
						children: "Cancel",
					}),
					s !== null
						? (0, w.jsx)("button", {
								type: "button",
								className: "button",
								"data-dialog-initial": !0,
								disabled: e.busy,
								onClick: () => h((S) => S + 1),
								children: "Retry",
							})
						: null,
					(0, w.jsx)("button", {
						type: "button",
						className: "button button-danger",
						disabled: e.busy || e.waiting || i === void 0 || s !== null,
						onClick: () => e.onConfirm(i ?? void 0),
						children: e.waiting
							? "Checking…"
							: e.busy
								? m
									? "Deleting…"
									: "Leaving…"
								: e.action === "delete"
									? "Delete channel"
									: i === 1
										? "Leave and delete channel"
										: "Leave channel",
					}),
				],
			}),
		],
	});
}
var wD = [
	{ key: "view:unreads", name: "Unreads" },
	{ key: "view:threads", name: "Threads" },
	{ key: "view:activity", name: "Activity" },
];
function Zm(e) {
	return e === null ? "Former member" : (e ?? "…");
}
function Pm(e) {
	return e.length > 80 ? `${e.slice(0, 80)}…` : e;
}
function ED(e) {
	const t = [];
	for (const s of e.channels) {
		if (yn(s.key)) {
			const f = e.privateActivity.get(s.key),
				h = e.privateCursors.get(s.key)?.activity ?? Dr;
			f !== void 0 && !as(h, f.activity) && t.push({ channel: s, at: f.at, mentionCount: 0, preview: null });
			continue;
		}
		const o = e.publicUnreads.get(s.key);
		o !== void 0 && t.push({ channel: s, at: o.latest.timestamp, mentionCount: o.mentionCount, preview: o.latest });
	}
	t.sort((s, o) => o.at - s.at);
	const i = e.memberNames;
	(0, _.useEffect)(() => {
		const s = [...e.publicUnreads.values()].map((o) => o.latest.createdBy);
		s.length > 0 && i.resolve(s);
	}, [e.publicUnreads, i]);
	const u = Date.now();
	return (0, w.jsxs)("section", {
		className: "view",
		"aria-label": "Unreads",
		children: [
			(0, w.jsx)("header", {
				className: "view-head",
				children: (0, w.jsx)("h2", { className: "view-title", children: "Unreads" }),
			}),
			(0, w.jsx)("p", {
				className: "view-note",
				children:
					"Only the newest 100 public messages are checked, so an older unread channel can be missing here. Private channels show their name only.",
			}),
			e.recentDead
				? (0, w.jsx)("div", {
						className: "channel-status is-error",
						role: "alert",
						children:
							"The recent-messages feed stopped, so unread state for public channels is not updating. Reload the page to try again.",
					})
				: null,
			t.length === 0
				? (0, w.jsx)("div", { className: "channel-status", children: "You are all caught up." })
				: (0, w.jsx)("ul", {
						className: "view-rows",
						children: t.map((s) =>
							(0, w.jsx)(
								"li",
								{
									className: "view-row",
									children: (0, w.jsxs)("button", {
										type: "button",
										className: "view-row-button",
										onClick: () => e.onSelectChannel(s.channel),
										children: [
											(0, w.jsxs)("span", {
												className: "view-row-title",
												children: [
													"#",
													s.channel.value.name,
													s.mentionCount > 0
														? (0, w.jsxs)("span", {
																className: "mention-badge",
																children: [
																	s.mentionCount,
																	(0, w.jsx)("span", { className: "visually-hidden", children: " mentions of you" }),
																],
															})
														: null,
												],
											}),
											(0, w.jsx)("span", { className: "view-row-time", children: Oc(s.at, u) }),
											s.preview !== null
												? (0, w.jsx)("span", {
														className: "view-row-preview",
														children: `${Zm(i.get(s.preview.createdBy))}: ${Pm(s.preview.value.text)}`,
													})
												: null,
										],
									}),
								},
								s.channel.key,
							),
						),
					}),
		],
	});
}
function TD(e) {
	const t = new Map(e.channels.map((o) => [o.key, o])),
		i = [];
	for (const o of e.feed) {
		if (o.value.deletedAt !== null) continue;
		const f = cm(o.key),
			h = f === null ? void 0 : t.get(f);
		if (h === void 0) continue;
		const m = i[i.length - 1];
		m !== void 0 && m.channel.key === h.key ? m.messages.push(o) : i.push({ channel: h, messages: [o] });
	}
	const u = e.memberNames;
	(0, _.useEffect)(() => {
		const o = [...new Set(e.feed.map((f) => f.createdBy))];
		o.length > 0 && u.resolve(o);
	}, [e.feed, u]);
	const s = Date.now();
	return (0, w.jsxs)("section", {
		className: "view",
		"aria-label": "Activity",
		children: [
			(0, w.jsx)("header", {
				className: "view-head",
				children: (0, w.jsx)("h2", { className: "view-title", children: "Activity" }),
			}),
			(0, w.jsx)("p", {
				className: "view-note",
				children: "The newest public messages. Private channels are not shown here.",
			}),
			e.recentDead
				? (0, w.jsx)("div", {
						className: "channel-status is-error",
						role: "alert",
						children: "The recent-messages feed stopped, so this view is not updating. Reload the page to try again.",
					})
				: null,
			i.length === 0
				? (0, w.jsx)("div", { className: "channel-status", children: "No public messages yet." })
				: (0, w.jsx)("div", {
						className: "view-groups",
						children: i.map((o, f) =>
							(0, w.jsxs)(
								"section",
								{
									className: "view-group",
									children: [
										(0, w.jsx)("h3", {
											className: "view-group-title",
											children: (0, w.jsxs)("button", {
												type: "button",
												className: "view-group-link",
												onClick: () => e.onSelectChannel(o.channel),
												children: ["#", o.channel.value.name],
											}),
										}),
										(0, w.jsx)("ul", {
											className: "view-rows",
											children: o.messages.map((h) =>
												(0, w.jsxs)(
													"li",
													{
														className: h.value.mentions?.includes(e.selfUserId) ? "view-row mention-self" : "view-row",
														children: [
															(0, w.jsx)("span", { className: "view-row-title", children: Zm(u.get(h.createdBy)) }),
															(0, w.jsx)("span", { className: "view-row-time", children: Oc(h.timestamp, s) }),
															(0, w.jsx)("span", { className: "view-row-preview", children: Pm(h.value.text) }),
														],
													},
													h.key,
												),
											),
										}),
									],
								},
								`${o.channel.key}:${f}`,
							),
						),
					}),
		],
	});
}
function xD(e) {
	const [t, i] = (0, _.useState)([]),
		[u, s] = (0, _.useState)(!1),
		[o, f] = (0, _.useState)(!1);
	(0, _.useEffect)(() => {
		const S = lc(_c);
		return e.client.data.watchRecent({ collection: "replies", limit: 100, order: "desc" }, (b) => {
			if (b === null) {
				(f(!0), s(!0));
				return;
			}
			(i(S.apply_window(b.docs)), s(!0));
		});
	}, [e.client]);
	const h = new Map(e.channels.map((S) => [S.key, S])),
		m = new Map();
	for (const S of t) {
		if (S.value.deletedAt !== null) continue;
		const b = ms(S.key),
			p = b === null ? null : cm(b),
			T = p === null ? void 0 : h.get(p);
		if (b === null || T === void 0) continue;
		const A = m.get(b);
		A === void 0 ? m.set(b, { channel: T, newest: S, count: 1 }) : (A.count += 1);
	}
	const v = e.memberNames;
	(0, _.useEffect)(() => {
		const S = [...new Set(t.map((b) => b.createdBy))];
		S.length > 0 && v.resolve(S);
	}, [t, v]);
	const g = Date.now();
	return (0, w.jsxs)("section", {
		className: "view",
		"aria-label": "Threads",
		children: [
			(0, w.jsx)("header", {
				className: "view-head",
				children: (0, w.jsx)("h2", { className: "view-title", children: "Threads" }),
			}),
			(0, w.jsx)("p", {
				className: "view-note",
				children:
					"The newest public reply activity; counts read the newest 100 replies. Private channels are not shown here.",
			}),
			o
				? (0, w.jsx)("div", {
						className: "channel-status is-error",
						role: "alert",
						children: "The replies feed stopped, so this view is not updating. Reload the page to try again.",
					})
				: null,
			u
				? m.size === 0
					? (0, w.jsx)("div", { className: "channel-status", children: "No recent thread activity." })
					: (0, w.jsx)("ul", {
							className: "view-rows",
							children: [...m.entries()].map(([S, b]) =>
								(0, w.jsx)(
									"li",
									{
										className: "view-row",
										children: (0, w.jsxs)("button", {
											type: "button",
											className: "view-row-button",
											onClick: () => e.onOpenThread(b.channel, S),
											children: [
												(0, w.jsxs)("span", { className: "view-row-title", children: ["#", b.channel.value.name] }),
												(0, w.jsx)("span", { className: "view-row-time", children: Oc(b.newest.timestamp, g) }),
												(0, w.jsx)("span", {
													className: "view-row-preview",
													children: `${b.count} ${b.count === 1 ? "reply" : "replies"} · ${Zm(v.get(b.newest.createdBy))}: ${Pm(b.newest.value.text)}`,
												}),
											],
										}),
									},
									S,
								),
							),
						})
				: (0, w.jsx)("div", { className: "channel-status", role: "status", children: "Loading threads…" }),
		],
	});
}
function AD(e) {
	return e === "denied"
		? "Chitchat can no longer read its data. Reload the page to try again."
		: e === "session_expired"
			? "This Chitchat session expired. Reload the page to continue."
			: e === "unavailable"
				? "Chitchat cannot reach its data right now. Check your connection and reload the page."
				: e === "capacity"
					? "Chitchat has too many live views open. Reload the page."
					: "Chitchat stopped reading its data. Reload the page to try again.";
}
var ib = 8,
	RD = 2e3,
	ca = 250,
	ab = 4e3,
	ub = 250,
	CD = 4e3,
	kD = 250,
	MD = 4e3,
	ND =
		"Chitchat cannot confirm whether this private channel was created because no channel is readable at its saved key. Retry checks the same key, or Cancel.",
	OD = "This private channel exists, but you are not in its current access list. Retry checks the same key, or Cancel.",
	lb = 250,
	sb = 4e3,
	ob = 250,
	zD = 4e3,
	xh = "Wait for pending message changes to finish before leaving this channel or thread.";
function DD(e) {
	const t = e.appendActivity;
	return (
		bk(e.scopeId) &&
		e.keyPrefix === e.scopeId &&
		e.collections.length === Lh.length &&
		Lh.every((i) => e.collections.includes(i)) &&
		Number.isSafeInteger(e.membershipRevision) &&
		e.membershipRevision >= 0 &&
		Array.isArray(t) &&
		t.every(
			(i) =>
				typeof i == "object" &&
				i !== null &&
				typeof i.collection == "string" &&
				Number.isSafeInteger(i.at) &&
				i.at >= 0 &&
				Number.isSafeInteger(i.sequence) &&
				i.sequence >= 0 &&
				typeof i.createdByUserId == "string" &&
				i.createdByUserId !== "",
		)
	);
}
function jD(e) {
	return (
		Array.isArray(e) &&
		e.every(
			(t) =>
				typeof t == "object" &&
				t !== null &&
				"userId" in t &&
				typeof t.userId == "string" &&
				t.userId !== "" &&
				"level" in t &&
				(t.level === "member" || t.level === "manage"),
		)
	);
}
function os(e) {
	if (typeof e != "object" || e === null) return null;
	if ("_yay" in e) {
		const t = e._yay;
		return t === null || jD(t) ? { _yay: t } : null;
	}
	if ("_nay" in e) {
		const t = e._nay;
		if (
			typeof t == "object" &&
			t !== null &&
			"name" in t &&
			t.name === "unavailable" &&
			"message" in t &&
			typeof t.message == "string"
		)
			return { _nay: { name: "unavailable", message: t.message } };
	}
	return null;
}
var Dr = { messages: 0, replies: 0 };
function Ai(e, t) {
	return { messages: Math.max(e.messages, t.messages), replies: Math.max(e.replies, t.replies) };
}
function as(e, t) {
	return e.messages >= t.messages && e.replies >= t.replies;
}
function ID(e) {
	let t = 0,
		i = Dr;
	for (const u of e.appendActivity)
		u.collection === "messages"
			? ((t = Math.max(t, u.at)), (i = Ai(i, { messages: u.sequence, replies: 0 })))
			: u.collection === "replies" && ((t = Math.max(t, u.at)), (i = Ai(i, { messages: 0, replies: u.sequence })));
	return { at: t, activity: i };
}
function cb(e) {
	((e.cancelled = !0), e.retryTimer !== null && clearTimeout(e.retryTimer));
}
function fb(e, t) {
	return t.revision <= e.revision
		? !1
		: ((e.revision = t.revision),
			(e.storedAt = Math.max(e.storedAt, t.at)),
			(e.storedActivity = Ai(e.storedActivity, t.activity)),
			(e.waitingForRefresh = !1),
			!0);
}
function ic(e) {
	((e.cancelled = !0), e.retryTimer !== null && (clearTimeout(e.retryTimer), (e.retryTimer = null)));
}
function Ah(e) {
	((e.cancelled = !0), e.retryTimer !== null && (clearTimeout(e.retryTimer), (e.retryTimer = null)));
}
function Rh(e) {
	((e.cancelled = !0), e.retryTimer !== null && (clearTimeout(e.retryTimer), (e.retryTimer = null)));
}
function LD(e) {
	const { client: t } = e,
		i = t.context.userId,
		u = yD(t),
		[s, o] = (0, _.useState)([]),
		[f, h] = (0, _.useState)([]),
		[m, v] = (0, _.useState)({}),
		[g, S] = (0, _.useState)(!1),
		[b, p] = (0, _.useState)(null),
		[T, A] = (0, _.useState)(!1),
		[N, q] = (0, _.useState)(null),
		[I, C] = (0, _.useState)([]),
		[k, L] = (0, _.useState)(!1),
		[Q, K] = (0, _.useState)({}),
		[O, $] = (0, _.useState)(0),
		[V, Y] = (0, _.useState)(0),
		[ae, se] = (0, _.useState)(null),
		[te, fe] = (0, _.useState)({}),
		[j, B] = (0, _.useState)(null),
		[P, ge] = (0, _.useState)(null),
		[be, Pe] = (0, _.useState)(!1),
		[M, D] = (0, _.useState)(null),
		[le, oe] = (0, _.useState)(!1),
		[me, Se] = (0, _.useState)(!1),
		[Re, Le] = (0, _.useState)(!1),
		[Xe, pt] = (0, _.useState)(!1),
		[At, vn] = (0, _.useState)(!1),
		[en, Be] = (0, _.useState)(null),
		[ye, Ce] = (0, _.useState)(!1),
		[nt, Ve] = (0, _.useState)({ sequence: 0, text: "" }),
		[Bt, et] = (0, _.useState)(""),
		[ce, ze] = (0, _.useState)(!1),
		rt = (0, _.useRef)(null),
		Ne = (0, _.useRef)(null),
		bt = (0, _.useRef)(null),
		pn = (0, _.useRef)(null),
		ut = (0, _.useRef)(null),
		Vt = (0, _.useRef)(null),
		yr = (0, _.useRef)(null),
		Yr = (0, _.useRef)(new Set());
	Yr.current = new Set(s.map((E) => E.key));
	const pr = (0, _.useRef)(null),
		Pn = (0, _.useRef)(null),
		kn = (0, _.useRef)(null),
		_t = (0, _.useRef)(null),
		tn = (0, _.useRef)(new Map()),
		ct = (0, _.useRef)(new Map()),
		br = (0, _.useRef)(new Map()),
		ar = (0, _.useRef)(new Set()),
		_n = (0, _.useRef)(new Map()),
		Ht = (0, _.useRef)(new Map()),
		Zt = (0, _.useRef)(new Map()),
		Qn = (0, _.useRef)(new Set()),
		Mn = (0, _.useRef)(new Map()),
		ur = (0, _.useRef)(new Map()),
		Sn = (0, _.useRef)(new Map()),
		_r = (0, _.useRef)(new Map()),
		lr = (0, _.useRef)(new Map()),
		Pt = (0, _.useRef)(new Set()),
		In = (0, _.useRef)(!1),
		Sr = (0, _.useRef)(0),
		Lt = (0, _.useRef)(!0),
		Qt = (0, _.useRef)(new Map()),
		Sa = (0, _.useRef)(new Set()),
		Ln = (0, _.useRef)(new Map()),
		nn = (0, _.useRef)(new Map()),
		Li = (0, _.useRef)(null),
		[wa, qt] = (0, _.useState)(!1),
		Dt = (0, _.useCallback)(
			(E, R) => {
				const H = yr.current;
				if (H !== null && H.revision > E) return;
				const F = Date.now(),
					de = {
						key: f0(i),
						value: R,
						revision: E,
						createdBy: i,
						updatedBy: i,
						createdAt: H?.createdAt ?? F,
						updatedAt: F,
						ownership: "owned",
						timestamp: H?.timestamp ?? F,
					};
				((yr.current = de), q(de));
			},
			[i],
		),
		rn = (0, _.useCallback)(
			function E() {
				const R = _t.current,
					H = yr.current,
					F = H?.revision ?? 0;
				if (
					!Lt.current ||
					R === null ||
					R.running ||
					R.retryTimer !== null ||
					(F === R.attemptedRevision && !R.retryCurrentRevision)
				)
					return;
				if (R.waitBeforeRetry) {
					const Ee = R.retryDelayMs;
					((R.waitBeforeRetry = !1),
						(R.retryTimer = setTimeout(() => {
							((R.retryTimer = null), (R.retryDelayMs = Math.min(Ee * 2, ab)), E());
						}, Ee)));
					return;
				}
				const de = { channels: R.channels };
				((R.channels = {}), (R.attemptedRevision = F), (R.retryCurrentRevision = !1));
				const he = R.needsCompaction;
				R.needsCompaction = !1;
				const pe = Ha(H?.value ?? { channels: {} }, de),
					Me = he
						? { channels: Object.fromEntries(Object.entries(pe.channels).filter(([Ee]) => Yr.current.has(Ee))) }
						: pe;
				if (he && Object.keys(Me.channels).length === Object.keys(pe.channels).length) {
					((R.channels = Ha({ channels: R.channels }, de).channels),
						(R.needsCompaction = !0),
						console.warn("[chitchat] The read-cursor map is still too large after cleanup"));
					return;
				}
				((R.running = !0),
					t.data
						.putOwned({ collection: "cursors", key: "me", value: Me, expectedRevision: F })
						.then((Ee) => {
							if (((R.running = !1), !(!Lt.current || _t.current !== R))) {
								if ("_yay" in Ee) ((R.retryDelayMs = ca), Dt(Ee._yay.revision, Me));
								else if (Ee._nay.name === "conflict")
									((R.channels = Ha({ channels: R.channels }, de).channels),
										(R.needsCompaction ||= he),
										(R.retryCurrentRevision = R.waitBeforeRetry),
										(R.retryDelayMs = ca));
								else if (Ee._nay.name === "storage_full") {
									if (
										((R.channels = Ha({ channels: R.channels }, de).channels),
										(R.needsCompaction = !0),
										(R.retryCurrentRevision = !0),
										(R.retryDelayMs = ca),
										he)
									) {
										console.warn("[chitchat] The compacted read-cursor retry was refused", {
											message: Ee._nay.message,
										});
										return;
									}
								} else
									Ee._nay.name === "unavailable"
										? ((R.channels = Ha({ channels: R.channels }, de).channels),
											(R.needsCompaction ||= he),
											(R.retryCurrentRevision = !0),
											(R.waitBeforeRetry = !0))
										: console.warn("[chitchat] A read-cursor retry was refused", { message: Ee._nay.message });
								if (Object.keys(R.channels).length === 0) {
									_t.current = null;
									return;
								}
								E();
							}
						})
						.catch(() => {
							((R.running = !1),
								!(!Lt.current || _t.current !== R) &&
									((R.channels = Ha({ channels: R.channels }, de).channels),
									(R.needsCompaction ||= he),
									(R.retryCurrentRevision = !0),
									(R.waitBeforeRetry = !0),
									E()));
						}));
			},
			[Dt, t],
		),
		wr = (E, R, H) => {
			if (!Lt.current) return;
			const F = _t.current ?? {
				channels: {},
				attemptedRevision: R,
				running: !1,
				needsCompaction: !1,
				retryCurrentRevision: !1,
				waitBeforeRetry: !1,
				retryDelayMs: ca,
				retryTimer: null,
			};
			((F.channels = Ha({ channels: F.channels }, E).channels),
				(F.attemptedRevision = Math.max(F.attemptedRevision, R)),
				H === "storage_full"
					? ((F.needsCompaction = !0), (F.retryCurrentRevision = !0))
					: H === "unavailable" && ((F.retryCurrentRevision = !0), F.retryTimer === null && (F.waitBeforeRetry = !0)),
				(_t.current = F),
				rn());
		},
		qr = (0, _.useCallback)(
			function E(R) {
				const H = () => R.storedAt >= R.pendingAt && as(R.storedActivity, R.pendingActivity),
					F = (Ee) => {
						if (R.cancelled || !Lt.current || !Pt.current.has(R.channelKey) || H() || R.retryTimer !== null) return;
						const $e = R.retryDelayMs;
						R.retryTimer = setTimeout(() => {
							((R.retryTimer = null), (R.retryDelayMs = Math.min($e * 2, ab)), Ee());
						}, $e);
					},
					de = () => {
						if (
							R.cancelled ||
							!Lt.current ||
							!Pt.current.has(R.channelKey) ||
							!R.waitingForRefresh ||
							R.running ||
							R.retryTimer !== null
						)
							return;
						R.running = !0;
						const Ee = `${d0(R.channelKey)}:${i}`;
						t.fetchJson("/api/v1/plugin-data/read", { body: { collection: "channels", key: Ee } })
							.then(($e) => {
								if (Qt.current.get(R.channelKey) !== R || R.cancelled) return;
								if (((R.running = !1), !R.waitingForRefresh)) {
									E(R);
									return;
								}
								const Ke = Fo.safeParse($e),
									Oe = Ke.success ? h0(Ke.data.document) : null;
								if (Oe !== null && Oe.key === Ee && Oe.channelKey === R.channelKey && Oe.createdBy === i && fb(R, Oe)) {
									((R.retryDelayMs = ca), E(R));
									return;
								}
								F(de);
							})
							.catch(() => {
								if (!(Qt.current.get(R.channelKey) !== R || R.cancelled)) {
									if (((R.running = !1), !R.waitingForRefresh)) {
										E(R);
										return;
									}
									F(de);
								}
							});
					};
				if (R.running || R.retryTimer !== null || R.cancelled || !Pt.current.has(R.channelKey)) return;
				if (R.waitingForRefresh) {
					de();
					return;
				}
				if (H()) {
					Qt.current.delete(R.channelKey);
					return;
				}
				const he = Math.max(R.pendingAt, R.storedAt),
					pe = Ai(R.pendingActivity, R.storedActivity),
					Me = R.revision;
				((R.running = !0),
					t.data
						.putOwned({
							collection: "channels",
							key: d0(R.channelKey),
							value: { at: he, activity: pe },
							expectedRevision: Me,
						})
						.then((Ee) => {
							if (!(Qt.current.get(R.channelKey) !== R || R.cancelled)) {
								if (((R.running = !1), "_yay" in Ee)) {
									((R.retryDelayMs = ca),
										(R.revision = Math.max(R.revision, Ee._yay.revision)),
										(R.storedAt = Math.max(R.storedAt, he)),
										(R.storedActivity = Ai(R.storedActivity, pe)),
										E(R));
									return;
								}
								if (Ee._nay.name === "conflict") {
									if (R.revision !== Me) {
										E(R);
										return;
									}
									((R.waitingForRefresh = !0), de());
									return;
								}
								if (Ee._nay.name === "unavailable") {
									F(() => E(R));
									return;
								}
								(console.warn("[chitchat] A private read-cursor write was refused", { message: Ee._nay.message }),
									Qt.current.delete(R.channelKey));
							}
						})
						.catch((Ee) => {
							Qt.current.get(R.channelKey) !== R ||
								R.cancelled ||
								((R.running = !1),
								console.warn("[chitchat] A private read-cursor write failed", { message: zn(Ee) }),
								F(() => E(R)));
						}));
			},
			[t, i],
		),
		Er = (0, _.useMemo)(() => new Set(f.map((E) => E.scopeId)), [f]),
		ui = (0, _.useMemo)(
			() => f.map((E) => ({ scopeId: E.scopeId, keyPrefix: E.keyPrefix, collections: E.collections })),
			[
				JSON.stringify(
					f
						.map((E) => ({ scopeId: E.scopeId, keyPrefix: E.keyPrefix, collections: [...E.collections].sort() }))
						.sort((E, R) => E.scopeId.localeCompare(R.scopeId)),
				),
			],
		),
		qi = (0, _.useMemo)(() => [...ui].sort((E, R) => E.scopeId.localeCompare(R.scopeId)).slice(0, ib), [ui]),
		Kn = (0, _.useMemo)(() => {
			const E = [...ui].sort((H, F) => H.scopeId.localeCompare(F.scopeId)),
				R = ae !== null && yn(ae) ? E.find((H) => H.scopeId === ae) : void 0;
			return R === void 0 || qi.some((H) => H.scopeId === R.scopeId)
				? qi
				: [R, ...E.filter((H) => H.scopeId !== R.scopeId).slice(0, 7)].sort((H, F) =>
						H.scopeId.localeCompare(F.scopeId),
					);
		}, [qi, ui, ae]),
		Ui = (0, _.useMemo)(() => new Set(Kn.map((E) => E.scopeId)), [Kn]),
		Kt = [...s, ...Object.entries(m).flatMap(([E, R]) => (Er.has(E) && Ui.has(E) ? R : []))].sort((E, R) =>
			E.value.name.localeCompare(R.value.name),
		),
		Yn = new Map(
			Object.entries(Q).flatMap(([E, R]) => (Er.has(E) && Ui.has(E) ? R.map((H) => [H.channelKey, H]) : [])),
		),
		Nn = new Map(f.map((E) => [E.scopeId, ID(E)])),
		sr = (0, _.useMemo)(() => Lk({ docs: I, cursorChannels: N?.value.channels ?? {}, selfUserId: i }), [I, N, i]),
		Rt = (E) => {
			if (E.key === ae || E.value.archivedAt !== null) return !1;
			if (yn(E.key)) {
				const R = Nn.get(E.key)?.activity ?? Dr;
				return !as(Yn.get(E.key)?.activity ?? Dr, R);
			}
			return sr.has(E.key);
		},
		Ea = (E) => (yn(E.key) ? (Yn.get(E.key)?.at ?? 0) : (N?.value.channels[E.key] ?? 0)),
		J = (E) => (E.key === ae || E.value.archivedAt !== null ? 0 : (sr.get(E.key)?.mentionCount ?? 0)),
		ve = (0, _.useId)(),
		Te = (0, _.useId)(),
		je = (0, _.useCallback)((E) => {
			Ve((R) => ({ sequence: R.sequence + 1, text: E }));
		}, []),
		Qe = (0, _.useCallback)((E) => {
			const R = (ct.current.get(E) ?? 0) + 1;
			(ct.current.set(E, R), fe(Object.fromEntries(ct.current)));
		}, []),
		Ct = (0, _.useCallback)((E) => {
			const R = ct.current.get(E) ?? 0;
			R !== 0 && (R === 1 ? ct.current.delete(E) : ct.current.set(E, R - 1), fe(Object.fromEntries(ct.current)));
		}, []),
		St = (0, _.useCallback)(
			(E) => {
				if (!Qn.current.has(E.scopeId) || (ur.current.get(E.scopeId) ?? -1) >= E.membershipRevision) return;
				const R = Sn.current.get(E.scopeId);
				if (R !== void 0) {
					R.scope = E;
					return;
				}
				const H = { scope: E, running: !1, retryDelayMs: lb, retryTimer: null, cancelled: !1 };
				Sn.current.set(E.scopeId, H);
				const F = () => Lt.current && !H.cancelled && Sn.current.get(E.scopeId) === H,
					de = () => {
						(Rh(H), Sn.current.get(E.scopeId) === H && Sn.current.delete(E.scopeId));
					},
					he = () => {
						const Me = H.scope;
						(de(),
							Qn.current.delete(Me.scopeId),
							ur.current.delete(Me.scopeId),
							Ln.current.delete(Me.scopeId),
							ar.current.delete(Me.scopeId),
							_n.current.delete(Me.scopeId),
							Ht.current.delete(Me.scopeId));
						const Ee = new Set(Pt.current);
						(Ee.add(Me.scopeId),
							(Pt.current = Ee),
							_r.current.set(Me.scopeId, Me.membershipRevision),
							(Sr.current += 1),
							h(($e) => {
								const Ke = $e.findIndex((lt) => lt.scopeId === Me.scopeId);
								if (Ke === -1) return [...$e, Me];
								const Oe = [...$e];
								return ((Oe[Ke] = Me), Oe);
							}),
							$(Sr.current));
					},
					pe = () => {
						if (!F() || H.running || H.retryTimer !== null) return;
						H.running = !0;
						const Me = H.scope.membershipRevision,
							Ee = () => {
								if (!F() || H.retryTimer !== null) return;
								const Ke = H.retryDelayMs;
								H.retryTimer = setTimeout(() => {
									((H.retryTimer = null), (H.retryDelayMs = Math.min(Ke * 2, sb)), pe());
								}, Ke);
							},
							$e = () => {
								if (((H.running = !1), H.scope.membershipRevision !== Me)) {
									pe();
									return;
								}
								(ur.current.set(E.scopeId, Me), de());
							};
						Promise.resolve()
							.then(() => t.fetchJson("/api/v1/plugin-data/read", { body: { collection: "channels", key: E.scopeId } }))
							.then((Ke) => {
								if (!F()) return;
								const Oe = Fo.safeParse(Ke);
								if (!Oe.success) {
									((H.running = !1), Ee());
									return;
								}
								if (Oe.data.document === null) {
									$e();
									return;
								}
								const lt = ns(Oe.data.document);
								if (Oe.data.document.collection !== "channels" || lt === null || lt.key !== E.scopeId || !yn(lt.key)) {
									((H.running = !1), Ee());
									return;
								}
								return t.scopes.listPrincipals({ scopeId: lt.key }).then((Bn) => {
									if (!F()) return;
									H.running = !1;
									const gl = os(Bn);
									if (gl === null || "_nay" in gl) {
										Ee();
										return;
									}
									const su = gl._yay;
									if (su === null) {
										$e();
										return;
									}
									if (H.scope.membershipRevision !== Me) {
										pe();
										return;
									}
									if (su.some((yl) => yl.userId === i)) {
										he();
										return;
									}
									(ur.current.set(E.scopeId, Me), de());
								});
							})
							.catch(() => {
								F() && ((H.running = !1), Ee());
							});
					};
				pe();
			},
			[t, i],
		);
	((0, _.useEffect)(() => {
		if (nt.text === "") return;
		et("");
		const E = requestAnimationFrame(() => et(nt.text));
		return () => cancelAnimationFrame(E);
	}, [nt]),
		(0, _.useEffect)(() => {
			const E = (H) => {
					const F = H.target;
					F instanceof Node && !rt.current?.contains(F) && (ut.current = null);
				},
				R = () => {
					ut.current = null;
				};
			return (
				document.addEventListener("focusin", E),
				window.addEventListener("blur", R),
				() => {
					(document.removeEventListener("focusin", E), window.removeEventListener("blur", R));
				}
			);
		}, []),
		(0, _.useEffect)(() => {
			const E = window.matchMedia("(max-width: 719px)");
			ze(E.matches);
			const R = (H) => {
				const F = ut.current;
				((Vt.current = H.matches
					? P !== null && (F === "sidebar" || F === "separator")
						? "thread"
						: F === "sidebar" && !ye
							? "drawer"
							: null
					: F === "drawer"
						? "selected"
						: null),
					ze(H.matches));
			};
			return (E.addEventListener("change", R), () => E.removeEventListener("change", R));
		}, [ye, P]),
		(0, _.useLayoutEffect)(() => {
			const E = Vt.current;
			Vt.current = null;
			const R = () => {
				const H = rt.current?.querySelector(".thread") ?? null;
				if (H === null) return !1;
				const F = H?.querySelector(".thread-head button") ?? null;
				return (
					F?.focus(),
					document.activeElement !== F && H.focus(),
					document.activeElement === F || document.activeElement === H
				);
			};
			if (E === "drawer") (P === null || !R()) && bt.current?.focus();
			else if (E === "thread") R() || bt.current?.focus();
			else if (E === "selected") {
				const H = Ne.current?.querySelector('[aria-current="page"]') ?? null;
				(H?.focus(), document.activeElement !== H && Ne.current?.focus());
			}
		}, [ce, P]),
		(0, _.useEffect)(() => {
			const E = lc(ns);
			return t.data.watch({ collection: "channels", limit: 100 }, (R, H) => {
				if (R === null) {
					p({ ...(H?.reason === void 0 ? {} : { reason: H.reason }) });
					return;
				}
				const F = R.docs.filter((de) => {
					const he = de.key;
					return !(typeof he == "string" && yn(he));
				});
				(o(E.apply_window(F)), S(!0), A(R.truncated));
			});
		}, [t]),
		(0, _.useEffect)(() => {
			let E = !1,
				R = null,
				H = null,
				F = ub;
			const de = () => {
				E ||
					(R = t.scopes.watchMine((he, pe) => {
						if (E) return;
						if (he === null) {
							if (((In.current = !1), pe?.reason === "unavailable" && H === null)) {
								const Oe = F;
								H = setTimeout(() => {
									((H = null), (F = Math.min(Oe * 2, CD)), de());
								}, Oe);
							}
							return;
						}
						F = ub;
						const Me = he.filter(DD);
						Mn.current = new Map(Me.map((Oe) => [Oe.scopeId, Oe]));
						for (const [Oe, lt] of Sn.current) Mn.current.has(Oe) || (Rh(lt), Sn.current.delete(Oe));
						const Ee = Me.filter((Oe) => (Qn.current.has(Oe.scopeId) ? (St(Oe), !1) : !0)),
							$e = new Set(Ee.map((Oe) => Oe.scopeId)),
							Ke = !In.current;
						((In.current = !0), Ke && Y((Oe) => Oe + 1));
						for (const [Oe, lt] of Qt.current) $e.has(Oe) || (cb(lt), Qt.current.delete(Oe));
						((_r.current = new Map(Ee.map((Oe) => [Oe.scopeId, Oe.membershipRevision]))),
							(Sr.current += 1),
							(Pt.current = $e),
							h(Ee),
							$(Sr.current));
					}));
			};
			return (
				de(),
				() => {
					((E = !0), (In.current = !1), H !== null && clearTimeout(H), R?.());
				}
			);
		}, [t, St]),
		(0, _.useEffect)(() => {
			const E = Kn.map((R) => {
				const H = lc(ns);
				let F = !1,
					de = null,
					he = null,
					pe = ob;
				const Me = () => {
					F ||
						!In.current ||
						(de = t.data.watch({ collection: "channels", keyPrefix: R.keyPrefix, limit: 100 }, (Ee, $e) => {
							if (F) return;
							if (Ee === null) {
								if (
									(de?.(),
									(de = null),
									($e?.reason === "unavailable" || $e?.reason === "denied") && In.current && he === null)
								) {
									const lt = pe;
									he = setTimeout(() => {
										((he = null), (pe = Math.min(lt * 2, zD)), Me());
									}, lt);
								}
								return;
							}
							(he !== null && (clearTimeout(he), (he = null)), (pe = ob));
							const Ke = H.apply_window(Ee.docs.filter((lt) => lt.key === R.scopeId));
							v((lt) => ({ ...lt, [R.scopeId]: Ke }));
							const Oe = Ee.docs
								.map(h0)
								.filter((lt) => lt !== null && lt.channelKey === R.scopeId && lt.createdBy === i);
							for (const lt of Oe) {
								const Bn = Qt.current.get(lt.channelKey);
								Bn !== void 0 &&
									fb(Bn, lt) &&
									(Bn.retryTimer !== null && (clearTimeout(Bn.retryTimer), (Bn.retryTimer = null)),
									(Bn.retryDelayMs = ca),
									qr(Bn));
							}
							K((lt) => ({ ...lt, [R.scopeId]: Oe }));
						}));
				};
				return (
					Me(),
					() => {
						((F = !0), he !== null && clearTimeout(he), de?.());
					}
				);
			});
			return () => {
				for (const R of E) R();
			};
		}, [t, qr, V, Kn, i]),
		(0, _.useEffect)(() => {
			const E = f0(i),
				R = (H) => {
					if (H === null) {
						(q(null), (yr.current = null));
						return;
					}
					const F =
						H.docs
							.map(Ik)
							.find((de) => de !== null && de.key === E && de.createdBy === i && de.ownership === "owned") ?? null;
					(q(F), (yr.current = F));
				};
			return t.convex.onUpdate(
				t.api.plugins_data.watch_documents,
				{ collection: "cursors", keyPrefix: E, limit: 1 },
				R,
				() => R(null),
			);
		}, [t, i]),
		(0, _.useEffect)(() => {
			const E = lc(_c);
			return t.data.watchRecent({ collection: "messages", limit: 100, order: "desc" }, (R) => {
				if (R === null) {
					(L(!0), C([]));
					return;
				}
				(L(!1), C(E.apply_window(R.docs)));
			});
		}, [t]),
		(0, _.useEffect)(() => {
			if (ae === null) {
				const E = Kt.find((R) => R.value.archivedAt === null);
				E !== void 0 && se((R) => R ?? E.key);
			}
		}, [Kt, ae]),
		(0, _.useEffect)(() => {
			let E = !1;
			for (const [R, H] of nn.current) {
				const F = Kt.find((de) => de.key === H.channelKey);
				if (F === void 0) {
					(nn.current.delete(R), (E = !0));
					continue;
				}
				F.revision <= H.sourceRevision ||
					(nn.current.delete(R), (F.value.archivedAt !== null) === H.archived && (E = !0));
			}
			E && qt(!0);
		}, [Kt]),
		(0, _.useEffect)(() => {
			ye && Ne.current?.focus();
		}, [ye]));
	const ht = () => window.matchMedia("(max-width: 719px)").matches,
		Ur = (E, R) => {
			const H = yr.current,
				F = H?.value.channels ?? {};
			if ((F[E] ?? 0) >= R) return;
			const de = { channels: { ...F, [E]: R } },
				he = H?.revision ?? 0;
			t.data
				.putOwned({ collection: "cursors", key: "me", value: de, expectedRevision: he })
				.then((pe) => {
					if ("_yay" in pe) {
						Dt(pe._yay.revision, de);
						return;
					}
					if (pe._nay.name === "conflict") {
						wr(de, he, "conflict");
						return;
					}
					if (pe._nay.name === "storage_full") {
						wr(de, he, "storage_full");
						return;
					}
					if (pe._nay.name === "unavailable") {
						wr(de, he, "unavailable");
						return;
					}
					console.warn("[chitchat] A read-cursor write was refused", { message: pe._nay.message });
				})
				.catch((pe) => {
					(console.warn("[chitchat] A read-cursor write failed", { message: zn(pe) }), wr(de, he, "unavailable"));
				});
		},
		Gn = (E, R, H) => {
			if (!Pt.current.has(E.key)) return;
			const F = Qt.current.get(E.key);
			if (F !== void 0) {
				((F.pendingAt = Math.max(F.pendingAt, R)), (F.pendingActivity = Ai(F.pendingActivity, H)), qr(F));
				return;
			}
			const de = Yn.get(E.key);
			if ((de?.at ?? 0) >= R && as(de?.activity ?? Dr, H)) return;
			const he = {
				channelKey: E.key,
				pendingAt: R,
				pendingActivity: H,
				storedAt: de?.at ?? 0,
				storedActivity: de?.activity ?? Dr,
				revision: de?.revision ?? 0,
				running: !1,
				waitingForRefresh: !1,
				retryDelayMs: ca,
				retryTimer: null,
				cancelled: !1,
			};
			(Qt.current.set(E.key, he), qr(he));
		},
		Yt = (E, R, H) => {
			yn(E.key) ? Gn(E, R, H ?? Dr) : Ur(E.key, R);
		},
		$i = (E, R = !0) => {
			const H = tn.current.get(E);
			if ((H !== void 0 && (clearTimeout(H), tn.current.delete(E)), br.current.delete(E), R)) {
				const F = Qt.current.get(E);
				F !== void 0 && ((F.cancelled = !0), F.retryTimer !== null && clearTimeout(F.retryTimer), Qt.current.delete(E));
			}
		},
		an = (E, R, H) => {
			const F = br.current.get(E.key);
			(br.current.set(E.key, {
				channel: E,
				at: Math.max(F?.at ?? 0, R),
				activity: H === null ? null : Ai(F?.activity ?? Dr, H),
			}),
				!tn.current.has(E.key) &&
					tn.current.set(
						E.key,
						setTimeout(() => {
							tn.current.delete(E.key);
							const de = br.current.get(E.key);
							(br.current.delete(E.key), de !== void 0 && !ar.current.has(E.key) && Yt(de.channel, de.at, de.activity));
						}, RD),
					));
		},
		Tr = (E, R) => {
			const H = yn(E.key) ? Nn.get(E.key) : void 0,
				F = { channel: E, at: Math.max(R, H?.at ?? 0), activity: H?.activity ?? (yn(E.key) ? Dr : null) };
			if (ar.current.has(E.key)) {
				const de = _n.current.get(E.key);
				_n.current.set(E.key, {
					channel: E,
					at: Math.max(de?.at ?? 0, F.at),
					activity: F.activity === null ? null : Ai(de?.activity ?? Dr, F.activity),
				});
				return;
			}
			an(E, F.at, F.activity);
		},
		qn = ae === null ? void 0 : Nn.get(ae),
		Gr = qn?.at ?? 0;
	((0, _.useEffect)(() => {
		if (ae === null || qn === void 0 || !yn(ae)) return;
		const E = Kt.find((H) => H.key === ae),
			R = Yn.get(ae);
		E !== void 0 && ((R?.at ?? 0) < Gr || !as(R?.activity ?? Dr, qn.activity)) && an(E, Gr, qn.activity);
	}, [ae, Gr, qn?.activity.messages ?? 0, qn?.activity.replies ?? 0]),
		(0, _.useEffect)(() => {
			const E = Sa.current;
			for (const R of Er) Ln.current.delete(R);
			for (const R of E) {
				if (Er.has(R)) continue;
				const H = m[R]?.find((F) => F.key === R);
				(H !== void 0 && Ln.current.set(R, H), $i(R));
			}
			Sa.current = new Set(Er);
		}, [Er, m]),
		(0, _.useEffect)(() => {
			if (M !== null) return;
			let E = !1;
			for (const [R, H] of Ln.current) {
				const F = Ht.current.get(R);
				if (F === "pending") continue;
				const de = F !== void 0;
				(je(
					F === "deleted"
						? `Deleted #${H.value.name}`
						: F === "left"
							? `Left #${H.value.name}`
							: F === "delete_unconfirmed"
								? `You no longer have access to #${H.value.name}. The Delete request could not be confirmed.`
								: F === "leave_unconfirmed"
									? `You no longer have access to #${H.value.name}. The Leave request could not be confirmed.`
									: `You were removed from #${H.value.name}.`,
				),
					ae === R && (se(null), ge(null), B(null)),
					(ae === R || de) && (E = !0),
					ar.current.delete(R),
					_n.current.delete(R),
					Ht.current.delete(R),
					Ln.current.delete(R));
			}
			E && qt(!0);
		}, [je, M, Er, ae]),
		(0, _.useLayoutEffect)(() => {
			if (!wa || M !== null) return;
			const E = document.activeElement;
			if (E instanceof HTMLElement && E !== document.body && E.isConnected) {
				qt(!1);
				return;
			}
			if (ce && !ye) {
				if (P !== null) {
					const R = rt.current?.querySelector(".thread-head button") ?? null;
					if (R !== null && (R.focus(), document.activeElement === R)) {
						qt(!1);
						return;
					}
				}
				(qt(!1), bt.current?.focus());
			} else (qt(!1), Ne.current?.focus());
		}, [M, ye, ce, wa, P]),
		(0, _.useEffect)(() => {
			const E = Li.current;
			if (!(E === null || M !== null)) {
				if (((Li.current = null), ce && !ye)) {
					if (P !== null) {
						const R = rt.current?.querySelector(".thread-head button") ?? null;
						if (R !== null && (R.focus(), document.activeElement === R)) return;
					}
					bt.current?.focus();
					return;
				}
				for (const R of rt.current?.querySelectorAll(".channel-item") ?? [])
					if (R.dataset.channelKey === E) {
						const H = R.querySelector(".ChannelRowMenu-trigger");
						if (H !== null && (H.focus(), document.activeElement === H)) return;
					}
				Ne.current?.focus();
			}
		}, [M, ye, ce, P]));
	const sl = () => (ae === null || (ct.current.get(ae) ?? 0) === 0 ? !1 : (je(xh), !0)),
		wn = (E) => {
			if ((E.key !== ae || P !== null) && sl()) return !1;
			if ((se(E.key), ge(null), Rt(E) || J(E) > 0)) {
				B(Ea(E));
				const R = Nn.get(E.key),
					H = sr.get(E.key)?.latest.timestamp ?? 0;
				Yt(E, R?.at ?? H, R?.activity ?? null);
			} else B(null);
			return (je(`#${E.value.name}`), ye && ht() && (Ce(!1), bt.current?.focus()), !0);
		},
		ol = (E) => {
			(E.key !== ae && sl()) || (se(E.key), ge(null), je(E.name), ye && ht() && (Ce(!1), bt.current?.focus()));
		},
		Ds = (E, R) => {
			wn(E) && ge(R);
		},
		cl = () => {
			sl() || D({ kind: "create" });
		};
	((0, _.useEffect)(() => {
		rn();
	}, [N, s, rn]),
		(0, _.useEffect)(
			() => (
				(Lt.current = !0),
				() => {
					Lt.current = !1;
					const E = _t.current;
					(E !== null && E.retryTimer !== null && clearTimeout(E.retryTimer), (_t.current = null));
					for (const H of tn.current.values()) clearTimeout(H);
					(tn.current.clear(), br.current.clear());
					for (const H of Qt.current.values()) cb(H);
					(Qt.current.clear(), ar.current.clear(), _n.current.clear(), Ht.current.clear());
					for (const H of Zt.current.values()) Ah(H);
					Zt.current.clear();
					for (const H of Sn.current.values()) Rh(H);
					(Sn.current.clear(),
						Qn.current.clear(),
						ur.current.clear(),
						Mn.current.clear(),
						_r.current.clear(),
						lr.current.clear(),
						ct.current.clear());
					const R = Pn.current;
					R !== null && (ic(R), (Pn.current = null));
				}
			),
			[],
		));
	const $r = (E) => {
			const R = Zt.current.get(E);
			(R !== void 0 && (Ah(R), Zt.current.delete(E)), lr.current.delete(E), ar.current.delete(E), Ht.current.delete(E));
			const H = _n.current.get(E);
			(_n.current.delete(E), Lt.current && H !== void 0 && Pt.current.has(E) && an(H.channel, H.at, H.activity));
		},
		Un = () => {
			(M?.kind === "exit" && Zt.current.has(M.channel.key) && $r(M.channel.key), (pr.current = null));
			const E = Pn.current;
			(E !== null && ic(E),
				(Pn.current = null),
				Le(!1),
				pt(!1),
				(kn.current = null),
				vn(!1),
				Se(!1),
				D(null),
				oe(!1),
				Be(null));
		},
		fl = (E) => {
			(Ln.current.delete(E), $r(E), (Li.current = E), Un());
		},
		Br = (E, R) => {
			const H = Zt.current.get(E.key);
			(H !== void 0 && (Ah(H), Zt.current.delete(E.key)),
				lr.current.delete(E.key),
				Ht.current.set(E.key, R),
				Ln.current.set(E.key, E));
			const F = new Set(Pt.current);
			(F.delete(E.key),
				(Pt.current = F),
				_r.current.delete(E.key),
				h((de) => de.filter((he) => he.scopeId !== E.key)),
				Un());
		},
		js = (E) => {
			const R = () => Lt.current && !E.cancelled && Zt.current.get(E.channel.key) === E,
				H = () => {
					(Qn.current.add(E.channel.key),
						ur.current.delete(E.channel.key),
						Br(E.channel, E.action === "leave" ? "left" : "delete_unconfirmed"));
					const de = Mn.current.get(E.channel.key);
					de !== void 0 && St(de);
				},
				F = () => {
					if (!R() || E.retryTimer !== null) return;
					const de = E.retryDelayMs;
					E.retryTimer = setTimeout(() => {
						((E.retryTimer = null), (E.retryDelayMs = Math.min(de * 2, sb)), js(E));
					}, de);
				};
			!R() ||
				E.running ||
				E.retryTimer !== null ||
				((E.running = !0),
				Promise.resolve()
					.then(() => t.fetchJson("/api/v1/plugin-data/read", { body: { collection: "channels", key: E.channel.key } }))
					.then((de) => {
						if (!R()) return;
						const he = Fo.safeParse(de);
						if (!he.success) {
							((E.running = !1), F());
							return;
						}
						if (he.data.document === null) {
							((E.running = !1), H());
							return;
						}
						const pe = ns(he.data.document);
						if (he.data.document.collection !== "channels" || pe === null || pe.key !== E.channel.key || !yn(pe.key)) {
							((E.running = !1), F());
							return;
						}
						return t.scopes.listPrincipals({ scopeId: pe.key }).then((Me) => {
							if (!R()) return;
							E.running = !1;
							const Ee = os(Me);
							if (Ee === null || "_nay" in Ee) {
								F();
								return;
							}
							const $e = Ee._yay;
							if ($e === null) {
								H();
								return;
							}
							if (!$e.some((Ke) => Ke.userId === i)) {
								H();
								return;
							}
							(Ln.current.delete(pe.key), $r(pe.key), Se(!1), oe(!1));
						});
					})
					.catch(() => {
						R() && ((E.running = !1), F());
					}));
		},
		Is = (E, R, H) => {
			if (ar.current.has(E.key)) return;
			if ((ct.current.get(E.key) ?? 0) > 0) {
				(oe(!1), Be(xh), je(xh));
				return;
			}
			const F = br.current.get(E.key);
			if (F !== void 0) {
				const pe = _n.current.get(E.key);
				_n.current.set(E.key, {
					channel: F.channel,
					at: Math.max(pe?.at ?? 0, F.at),
					activity: F.activity === null ? null : Ai(pe?.activity ?? Dr, F.activity),
				});
			}
			(ar.current.add(E.key), Ht.current.set(E.key, "pending"), $i(E.key, !1), oe(!0), Be(null));
			const de =
					R === "delete"
						? t.scopes.delete({ scopeId: E.key, ...(H === void 0 ? {} : { expectedPrincipalCount: H }) })
						: t.scopes.removePrincipal({
								scopeId: E.key,
								userId: i,
								...(H === void 0 ? {} : { expectedPrincipalCount: H }),
							}),
				he = (pe) => {
					const Me = { channel: E, action: R, running: !1, retryDelayMs: lb, retryTimer: null, cancelled: !1 };
					(Zt.current.set(E.key, Me), oe(!1), Se(!0), Be(pe), js(Me));
				};
			de.then((pe) => {
				if (Lt.current) {
					if ("_nay" in pe) {
						if (pe._nay.name === "unavailable") {
							he(pe._nay.message);
							return;
						}
						($r(E.key),
							oe(!1),
							Be(
								pe._nay.name === "conflict"
									? "Who is in this channel changed. Close it and try again."
									: pe._nay.message,
							));
						return;
					}
					if (R === "leave" && !pe._yay.deleted) {
						const Me = _r.current.get(E.key);
						if (Me === void 0) {
							Br(E, "left");
							return;
						}
						if (Me > pe._yay.membershipRevision) {
							fl(E.key);
							return;
						}
						lr.current.set(E.key, { channel: E, membershipRevision: pe._yay.membershipRevision });
						return;
					}
					Br(E, pe._yay.deleted ? "deleted" : "left");
				}
			}).catch((pe) => {
				Lt.current && he(zn(pe));
			});
		};
	(0, _.useEffect)(() => {
		for (const [E, R] of lr.current) {
			const H = _r.current.get(E);
			if (H === void 0) {
				Br(R.channel, "left");
				continue;
			}
			H > R.membershipRevision && fl(E);
		}
	}, [O]);
	const dl = (E) => {
		const R = () => Lt.current && !E.cancelled && Pn.current === E,
			H = () => {
				if (!R() || E.retryTimer !== null) return;
				const de = E.retryDelayMs;
				E.retryTimer = setTimeout(() => {
					((E.retryTimer = null), (E.retryDelayMs = Math.min(de * 2, MD)), dl(E));
				}, de);
			},
			F = (de) => {
				(ic(E), (Pn.current = null), Le(!0), pt(!1), oe(!1), Be(de));
			};
		!R() ||
			E.running ||
			E.retryTimer !== null ||
			((E.running = !0),
			Promise.resolve()
				.then(() => t.fetchJson("/api/v1/plugin-data/read", { body: { collection: "channels", key: E.key } }))
				.then((de) => {
					if (!R()) return;
					const he = Fo.safeParse(de);
					if (!he.success) {
						((E.running = !1), H());
						return;
					}
					if (he.data.document === null) {
						((E.running = !1), F(ND));
						return;
					}
					const pe = ns(he.data.document);
					if (he.data.document.collection !== "channels" || pe === null || pe.key !== E.key || !yn(pe.key)) {
						((E.running = !1), H());
						return;
					}
					return t.scopes.listPrincipals({ scopeId: pe.key }).then((Me) => {
						if (!R()) return;
						E.running = !1;
						const Ee = os(Me);
						if (Ee === null || "_nay" in Ee) {
							H();
							return;
						}
						const $e = Ee._yay;
						if ($e === null || !$e.some((Ke) => Ke.userId === i)) {
							F(OD);
							return;
						}
						(ic(E), (Pn.current = null), se(E.key), B(null), Un());
					});
				})
				.catch(() => {
					R() && ((E.running = !1), H());
				}));
	};
	(0, _.useEffect)(() => {
		const E = kn.current;
		if (
			!At ||
			E === null ||
			M === null ||
			(M.kind !== "rename" && M.kind !== "archive") ||
			M.channel.key !== E.channelKey
		)
			return;
		const R = Kt.find((H) => H.key === E.channelKey);
		if (R === void 0) {
			Un();
			return;
		}
		if (!(R.revision <= E.expectedRevision)) {
			if (
				E.sectionMoveRequestId === null
					? R.value.name === E.value.name && (R.value.topic ?? "") === (E.value.topic ?? "")
					: R.value.archivedAt !== null
			) {
				Un();
				return;
			}
			((kn.current = null),
				vn(!1),
				oe(!1),
				D((H) =>
					H !== null && (H.kind === "rename" || H.kind === "archive") && H.channel.key === R.key
						? { ...H, channel: R }
						: H,
				),
				Be("Someone else changed this channel while the request was pending. Review it and try again."));
		}
	}, [At, Kt, M]);
	const hl = (E, R, H) => {
			(oe(!0), Be(null));
			const F = pr.current,
				de = Re && F !== null,
				he = de
					? F
					: {
							key: pk(H.isPrivate ? "private" : "public"),
							name: E,
							topic: R,
							isPrivate: H.isPrivate,
							userIds: [...H.userIds],
							clientRequestId: crypto.randomUUID(),
						};
			((pr.current = he),
				Le(!1),
				pt(!1),
				(async () => {
					const pe = ($e) => {
						(se($e), B(null), Un());
					};
					if (!he.isPrivate) {
						const $e = await Ya(t, "channel-manage", {
							action: "create",
							name: he.name,
							topic: he.topic === "" ? null : he.topic,
							clientRequestId: he.clientRequestId,
						});
						if ("_nay" in $e) {
							if ($e._nay.name === "unavailable") {
								(Le(!0), pt(!1), oe(!1), Be($e._nay.message));
								return;
							}
							((pr.current = null), Le(!1), oe(!1), Be($e._nay.message));
							return;
						}
						const Ke = $e._yay.channelKey;
						if (typeof Ke != "string") {
							((pr.current = null), Le(!1), oe(!1), Be("The Chitchat backend answered without a channel key"));
							return;
						}
						pe(Ke);
						return;
					}
					const Me = { name: he.name, archivedAt: null, ...(he.topic === "" ? {} : { topic: he.topic }) },
						Ee = await t.scopes.createWithDocument({
							scopeId: he.key,
							collections: Lh,
							keyPrefix: he.key,
							principals: he.userIds.map(($e) => ({ userId: $e, level: "member" })),
							document: { collection: "channels", key: he.key, value: Me },
						});
					if ("_nay" in Ee) {
						if (Ee._nay.name === "unavailable") {
							(Le(!0), pt(!1), oe(!1), Be(Ee._nay.message));
							return;
						}
						if (de && Ee._nay.name === "conflict") {
							const $e = { key: he.key, running: !1, retryDelayMs: kD, retryTimer: null, cancelled: !1 };
							((Pn.current = $e),
								Le(!0),
								pt(!0),
								oe(!1),
								Be("Checking whether this private channel was created."),
								dl($e));
							return;
						}
						((pr.current = null), Le(!1), oe(!1), Be(Ee._nay.message));
						return;
					}
					pe(he.key);
				})().catch((pe) => {
					(Le(!0), pt(!1), oe(!1), Be(zn(pe)));
				}));
		},
		Ls = (E, R) => {
			const H = kn.current,
				F = At && H !== null,
				de = (E.value.archivedAt !== null) != (R.archivedAt !== null),
				he = F
					? H
					: { channelKey: E.key, value: R, expectedRevision: E.revision, sectionMoveRequestId: de ? Symbol() : null };
			((kn.current = he),
				vn(!1),
				!F &&
					he.sectionMoveRequestId !== null &&
					nn.current.set(he.sectionMoveRequestId, {
						channelKey: he.channelKey,
						sourceRevision: he.expectedRevision,
						archived: he.value.archivedAt !== null,
					}),
				oe(!0),
				Be(null),
				Ya(t, "channel-manage", {
					action: "update",
					channelKey: he.channelKey,
					name: he.value.name,
					topic: he.value.topic ?? null,
					archived: he.value.archivedAt !== null,
				})
					.then((pe) => {
						if ("_nay" in pe) {
							if (pe._nay.name === "unavailable" || (F && pe._nay.name === "conflict")) {
								(vn(!0), oe(!1), Be(pe._nay.message));
								return;
							}
							((kn.current = null),
								vn(!1),
								he.sectionMoveRequestId !== null &&
									pe._nay.name !== "conflict" &&
									nn.current.delete(he.sectionMoveRequestId),
								oe(!1),
								Be(
									pe._nay.name === "conflict"
										? "Someone else changed this channel while the dialog was open. Close it and try again."
										: pe._nay.message,
								));
							return;
						}
						Un();
					})
					.catch((pe) => {
						(vn(!0), oe(!1), Be(zn(pe)));
					}));
		},
		ef = (E) => {
			const R = Symbol();
			(nn.current.set(R, { channelKey: E.key, sourceRevision: E.revision, archived: !1 }),
				Ya(t, "channel-manage", { action: "update", channelKey: E.key, archived: !1 })
					.then((H) => {
						"_nay" in H &&
							(H._nay.name !== "conflict" && H._nay.name !== "unavailable" && nn.current.delete(R), je(H._nay.message));
					})
					.catch((H) => {
						je(zn(H));
					}));
		};
	if (b !== null)
		return (0, w.jsx)("div", {
			className: "chitchat",
			children: (0, w.jsxs)("div", {
				className: "page-dead",
				role: "alert",
				children: [(0, w.jsx)("h1", { children: "Chitchat" }), (0, w.jsx)("p", { children: AD(b.reason) })],
			}),
		});
	const Ta = (E, R) => E.value.name.localeCompare(R.value.name),
		On = Kt.filter((E) => E.value.archivedAt === null).sort(Ta),
		ml = Kt.filter((E) => E.value.archivedAt !== null).sort(Ta),
		$n = Kt.find((E) => E.key === ae) ?? null,
		Bi = $n !== null && yn($n.key) ? (f.find((E) => E.scopeId === $n.key)?.membershipRevision ?? 0) : 0,
		Vr = $n !== null && (te[$n.key] ?? 0) > 0,
		vl = On.filter(Rt).length,
		xa = On.reduce((E, R) => E + J(R), 0),
		lu = Math.max(0, f.length - Kn.length),
		Vi = (E, R, H) =>
			R.length === 0
				? null
				: (0, w.jsxs)("div", {
						className: "channel-section",
						children: [
							(0, w.jsx)("h2", { id: H, className: "channel-section-title", children: E }),
							(0, w.jsx)("ul", {
								className: "channel-list",
								"aria-labelledby": H,
								children: R.map((F) => {
									const de = Rt(F),
										he = J(F),
										pe = f.find((Me) => Me.scopeId === F.key);
									return (0, w.jsxs)(
										"li",
										{
											className: "channel-item",
											"data-channel-key": F.key,
											children: [
												(0, w.jsxs)("button", {
													type: "button",
													className: de || he > 0 ? "channel-link is-unread" : "channel-link",
													"aria-current": F.key === ae ? "page" : void 0,
													disabled: Vr && (F.key !== ae || P !== null),
													onClick: () => wn(F),
													children: [
														(0, w.jsx)("span", {
															className: "channel-initial",
															"aria-hidden": "true",
															children: F.value.name.slice(0, 1).toUpperCase(),
														}),
														(0, w.jsxs)("span", {
															className: "channel-name",
															children: [
																"#",
																F.value.name,
																yn(F.key) ? " (private)" : "",
																F.value.archivedAt !== null ? " (archived)" : "",
															],
														}),
														he > 0
															? (0, w.jsxs)("span", {
																	className: "mention-badge",
																	children: [
																		he,
																		(0, w.jsx)("span", { className: "visually-hidden", children: " unread mentions" }),
																	],
																})
															: de
																? (0, w.jsxs)(w.Fragment, {
																		children: [
																			(0, w.jsx)("span", { className: "unread-dot", "aria-hidden": "true" }),
																			(0, w.jsx)("span", { className: "visually-hidden", children: "unread" }),
																		],
																	})
																: null,
													],
												}),
												(0, w.jsx)("span", {
													className: "channel-item-actions",
													children: (0, w.jsx)(vD, {
														channelName: F.value.name,
														items: [
															...(yn(F.key)
																? [
																		{
																			id: "people",
																			label: `People in #${F.value.name}`,
																			onSelect: () => D({ kind: "people", channel: F }),
																		},
																	]
																: []),
															{
																id: "rename",
																label: `Rename #${F.value.name}`,
																onSelect: () => D({ kind: "rename", channel: F }),
															},
															F.value.archivedAt === null
																? {
																		id: "archive",
																		label: `Archive #${F.value.name}`,
																		onSelect: () => D({ kind: "archive", channel: F }),
																	}
																: { id: "unarchive", label: `Unarchive #${F.value.name}`, onSelect: () => ef(F) },
															...(pe
																? [
																		{ id: "private-exit-separator", separator: !0 },
																		{
																			id: "leave",
																			label: `Leave #${F.value.name}`,
																			danger: !0,
																			onSelect: () => D({ kind: "exit", action: "leave", channel: F }),
																		},
																		...(pe.level === "manage"
																			? [
																					{
																						id: "delete",
																						label: `Delete #${F.value.name} for everyone`,
																						danger: !0,
																						onSelect: () => D({ kind: "exit", action: "delete", channel: F }),
																					},
																				]
																			: []),
																	]
																: []),
														],
													}),
												}),
											],
										},
										F.key,
									);
								}),
							}),
						],
					});
	return (0, w.jsxs)("div", {
		ref: rt,
		className: "chitchat",
		onFocusCapture: (E) => {
			const R = E.target;
			ut.current =
				R === bt.current
					? "drawer"
					: Ne.current?.contains(R)
						? "sidebar"
						: R.classList.contains("thread-resize")
							? "separator"
							: null;
		},
		children: [
			(0, w.jsxs)("header", {
				className: "app-bar",
				children: [
					(0, w.jsx)("h1", { className: "visually-hidden", children: "Chitchat" }),
					(0, w.jsx)("button", {
						ref: bt,
						type: "button",
						className: "button drawer-toggle",
						"aria-expanded": ye,
						onClick: () => Ce((E) => !E),
						children: "Channels",
					}),
				],
			}),
			(0, w.jsx)("nav", {
				ref: Ne,
				className: ["sidebar", ye ? "is-open" : "", be ? "is-expanded" : ""].filter(Boolean).join(" "),
				"aria-label": "Channels",
				tabIndex: -1,
				children: (0, w.jsxs)("div", {
					className: "sidebar-inner",
					inert: ce && !ye ? !0 : void 0,
					children: [
						(0, w.jsxs)("div", {
							className: "sidebar-head",
							children: [
								(0, w.jsx)("p", { className: "sidebar-title", children: "Chitchat" }),
								(0, w.jsx)("button", {
									ref: pn,
									type: "button",
									className: "button sidebar-expand",
									"aria-expanded": be,
									"aria-label": be ? "Collapse channel rail" : "Expand channel rail",
									onClick: () => Pe((E) => !E),
									children: be ? "«" : "»",
								}),
								(0, w.jsx)("button", {
									type: "button",
									className: "button sidebar-create",
									disabled: Vr,
									onClick: cl,
									children: "Create channel",
								}),
							],
						}),
						T
							? (0, w.jsx)("div", {
									className: "channel-status",
									role: "status",
									children: "Only the first 100 channels are shown.",
								})
							: null,
						lu > 0
							? (0, w.jsx)("div", {
									className: "channel-status",
									role: "status",
									children: `This page can watch ${ib} private channels at a time; ${lu} more ${lu === 1 ? "is" : "are"} hidden.`,
								})
							: null,
						(0, w.jsx)("ul", {
							className: "view-list",
							"aria-label": "Views",
							children: wD.map((E) =>
								(0, w.jsx)(
									"li",
									{
										className: "view-item",
										children: (0, w.jsxs)("button", {
											type: "button",
											className:
												E.key === "view:unreads" && (vl > 0 || xa > 0)
													? "channel-link view-link is-unread"
													: "channel-link view-link",
											"aria-current": ae === E.key ? "page" : void 0,
											disabled: Vr,
											onClick: () => ol(E),
											children: [
												(0, w.jsx)("span", {
													className: "channel-initial",
													"aria-hidden": "true",
													children: E.name.slice(0, 1),
												}),
												(0, w.jsx)("span", { className: "channel-name", children: E.name }),
												E.key === "view:unreads" && xa > 0
													? (0, w.jsxs)("span", {
															className: "mention-badge",
															children: [
																xa,
																(0, w.jsx)("span", { className: "visually-hidden", children: " mentions of you" }),
															],
														})
													: E.key === "view:unreads" && vl > 0
														? (0, w.jsxs)(w.Fragment, {
																children: [
																	(0, w.jsx)("span", { className: "unread-dot", "aria-hidden": "true" }),
																	(0, w.jsx)("span", { className: "visually-hidden", children: "unread" }),
																],
															})
														: null,
											],
										}),
									},
									E.key,
								),
							),
						}),
						g
							? Kt.length === 0
								? (0, w.jsx)("div", { className: "channel-status", children: "No channels yet" })
								: (0, w.jsxs)(w.Fragment, { children: [Vi("Channels", On, ve), Vi("Archived", ml, Te)] })
							: (0, w.jsx)("div", { className: "channel-status", role: "status", children: "Loading channels…" }),
					],
				}),
			}),
			(0, w.jsx)("main", {
				className: "main",
				children:
					ae === "view:unreads"
						? (0, w.jsx)(ED, {
								channels: On,
								publicUnreads: sr,
								privateCursors: Yn,
								privateActivity: Nn,
								recentDead: k,
								memberNames: u,
								onSelectChannel: wn,
							})
						: ae === "view:threads"
							? (0, w.jsx)(xD, { client: t, channels: On, memberNames: u, onOpenThread: Ds })
							: ae === "view:activity"
								? (0, w.jsx)(TD, {
										feed: I,
										channels: On,
										selfUserId: i,
										recentDead: k,
										memberNames: u,
										onSelectChannel: wn,
									})
								: $n !== null
									? (0, w.jsx)(
											Nz,
											{
												client: t,
												userId: i,
												channel: $n,
												readGeneration: Bi,
												memberNames: u,
												announce: je,
												threadRootKey: P,
												setThreadRootKey: ge,
												isNarrow: ce,
												onRequestStart: () => Qe($n.key),
												onRequestSettled: () => Ct($n.key),
												sendInFlight: Vr,
												onNewestVisible: (E) => Tr($n, E),
												openedAtLastReadAt: j,
											},
											$n.key,
										)
									: g
										? Kt.length === 0
											? (0, w.jsx)("div", {
													className: "channel-status",
													children: (0, w.jsx)("span", { children: "No channels yet — create the first one." }),
												})
											: (0, w.jsx)("div", { className: "channel-status", children: "Select a channel." })
										: (0, w.jsx)("div", { className: "channel-status", role: "status", children: "Loading channels…" }),
			}),
			M !== null && M.kind === "create"
				? (0, w.jsx)(rb, {
						title: "Create channel",
						submitLabel: "Create",
						initialName: "",
						initialTopic: "",
						privacy: { client: t, selfUserId: i },
						busy: le,
						waiting: Xe,
						fieldsLocked: Re,
						error: en,
						onSubmit: hl,
						onClose: Un,
					})
				: null,
			M !== null && M.kind === "people"
				? (0, w.jsx)(bD, { client: t, channel: M.channel, selfUserId: i, memberNames: u, onClose: Un })
				: null,
			M !== null && M.kind === "rename"
				? (0, w.jsx)(rb, {
						title: `Rename #${M.channel.value.name}`,
						submitLabel: "Rename",
						initialName: M.channel.value.name,
						initialTopic: M.channel.value.topic ?? "",
						privacy: null,
						busy: le,
						waiting: !1,
						fieldsLocked: At,
						error: en,
						onSubmit: (E, R) =>
							Ls(M.channel, { ...M.channel.value, name: E, ...(R === "" ? { topic: void 0 } : { topic: R }) }),
						onClose: Un,
					})
				: null,
			M !== null && M.kind === "archive"
				? (0, w.jsx)(_D, {
						channelName: M.channel.value.name,
						busy: le,
						retry: At,
						error: en,
						onConfirm: () => Ls(M.channel, { ...M.channel.value, archivedAt: Date.now() }),
						onClose: Un,
					})
				: null,
			M !== null && M.kind === "exit"
				? (0, w.jsx)(SD, {
						client: t,
						channel: M.channel,
						action: M.action,
						busy: le,
						waiting: me,
						error: en,
						onConfirm: (E) => Is(M.channel, M.action, E),
						onClose: Un,
					})
				: null,
			(0, w.jsxs)("div", {
				className: "chitchat-announcer visually-hidden",
				role: "status",
				"aria-live": "polite",
				children: [(0, w.jsx)("span", { "data-announcement-sequence": String(nt.sequence) }), Bt],
			}),
		],
	});
}
function zS(e) {
	return (0, w.jsx)("div", {
		className: e.isError ? "boot-screen is-error" : "boot-screen",
		role: e.isError ? "alert" : "status",
		"aria-live": e.isError ? void 0 : "polite",
		children: e.message,
	});
}
var DS = document.getElementById("root");
if (!DS) throw new Error("index.html is missing the #root element");
var Wh = (0, mk.createRoot)(DS);
Wh.render((0, w.jsx)(zS, { message: "Connecting…" }));
pT().then(
	(e) => {
		(e.context.kind === "page" && (document.title = e.context.pageTitle), Wh.render((0, w.jsx)(LD, { client: e })));
	},
	(e) => {
		Wh.render((0, w.jsx)(zS, { message: e instanceof Error ? e.message : String(e), isError: !0 }));
	},
);
