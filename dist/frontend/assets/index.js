var A1 = Object.create,
	cb = Object.defineProperty,
	R1 = Object.getOwnPropertyDescriptor,
	C1 = Object.getOwnPropertyNames,
	k1 = Object.getPrototypeOf,
	N1 = Object.prototype.hasOwnProperty,
	Ir = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), (e = null)), t.exports),
	M1 = (e, t, i, u) => {
		if ((t && typeof t == "object") || typeof t == "function")
			for (var s = C1(t), o = 0, f = s.length, h; o < f; o++)
				((h = s[o]),
					!N1.call(e, h) &&
						h !== i &&
						cb(e, h, { get: ((m) => t[m]).bind(null, h), enumerable: !(u = R1(t, h)) || u.enumerable }));
		return e;
	},
	fb = (e, t, i) => (
		(i = e != null ? A1(k1(e)) : {}),
		M1(t || !e || !e.__esModule ? cb(i, "default", { value: e, enumerable: !0 }) : i, e)
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
	ti = [],
	jr = [],
	O1 = Uint8Array,
	Fd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Lu = 0, z1 = Fd.length; Lu < z1; ++Lu) ((ti[Lu] = Fd[Lu]), (jr[Fd.charCodeAt(Lu)] = Lu));
jr[45] = 62;
jr[95] = 63;
function D1(e) {
	var t = e.length;
	if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
	var i = e.indexOf("=");
	i === -1 && (i = t);
	var u = i === t ? 0 : 4 - (i % 4);
	return [i, u];
}
function j1(e, t, i) {
	return ((t + i) * 3) / 4 - i;
}
function os(e) {
	var t,
		i = D1(e),
		u = i[0],
		s = i[1],
		o = new O1(j1(e, u, s)),
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
function I1(e) {
	return ti[(e >> 18) & 63] + ti[(e >> 12) & 63] + ti[(e >> 6) & 63] + ti[e & 63];
}
function L1(e, t, i) {
	for (var u, s = [], o = t; o < i; o += 3)
		((u = ((e[o] << 16) & 16711680) + ((e[o + 1] << 8) & 65280) + (e[o + 2] & 255)), s.push(I1(u)));
	return s.join("");
}
function cs(e) {
	for (var t, i = e.length, u = i % 3, s = [], o = 16383, f = 0, h = i - u; f < h; f += o)
		s.push(L1(e, f, f + o > h ? h : f + o));
	return (
		u === 1
			? ((t = e[i - 1]), s.push(ti[t >> 2] + ti[(t << 4) & 63] + "=="))
			: u === 2 &&
				((t = (e[i - 2] << 8) + e[i - 1]), s.push(ti[t >> 10] + ti[(t >> 4) & 63] + ti[(t << 2) & 63] + "=")),
		s.join("")
	);
}
function fa(e) {
	if (e === void 0) return {};
	if (!hb(e)) throw new Error(`The arguments to a Convex function must be an object. Received: ${e}`);
	return e;
}
function db(e) {
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
function hb(e) {
	const t = typeof e == "object",
		i = Object.getPrototypeOf(e),
		u = i === null || i === Object.prototype || i?.constructor?.name === "Object";
	return t && u;
}
var mb = !0,
	Gu = BigInt("-9223372036854775808"),
	em = BigInt("9223372036854775807"),
	Ah = BigInt("0"),
	q1 = BigInt("8"),
	U1 = BigInt("256"),
	Xd =
		"This commit timestamp is unresolved: its value is assigned when the mutation commits. Read the document after the mutation completes to get its value.",
	vb = class {
		[Symbol.toPrimitive](e) {
			if (e === "string") return this.toString();
			throw new Error(Xd);
		}
		valueOf() {
			throw new Error(Xd);
		}
		toJSON() {
			throw new Error(Xd);
		}
		toString() {
			return "[unresolved commit timestamp]";
		}
	},
	$1 = new vb();
function gb(e) {
	return Number.isNaN(e) || !Number.isFinite(e) || Object.is(e, -0);
}
function B1(e) {
	e < Ah && (e -= Gu + Gu);
	let t = e.toString(16);
	t.length % 2 === 1 && (t = "0" + t);
	const i = new Uint8Array(new ArrayBuffer(8));
	let u = 0;
	for (const s of t.match(/.{2}/g).reverse()) (i.set([parseInt(s, 16)], u++), (e >>= q1));
	return cs(i);
}
function V1(e) {
	const t = os(e);
	if (t.byteLength !== 8) throw new Error(`Received ${t.byteLength} bytes, expected 8 for $integer`);
	let i = Ah,
		u = Ah;
	for (const s of t) ((i += BigInt(s) * U1 ** u), u++);
	return (i > em && (i += Gu + Gu), i);
}
function Z1(e) {
	if (e < Gu || em < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
	const t = new ArrayBuffer(8);
	return (new DataView(t).setBigInt64(0, e, !0), cs(new Uint8Array(t)));
}
function H1(e) {
	const t = os(e);
	if (t.byteLength !== 8) throw new Error(`Received ${t.byteLength} bytes, expected 8 for $integer`);
	return new DataView(t.buffer).getBigInt64(0, !0);
}
var P1 = DataView.prototype.setBigInt64 ? Z1 : B1,
	Q1 = DataView.prototype.getBigInt64 ? H1 : V1,
	gp = 1024;
function Rh(e) {
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
function Fu(e) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return e;
	if (Array.isArray(e)) return e.map((u) => Fu(u));
	if (typeof e != "object") throw new Error(`Unexpected type of ${e}`);
	const t = Object.entries(e);
	if (t.length === 1) {
		const u = t[0][0];
		if (u === "$bytes") {
			if (typeof e.$bytes != "string") throw new Error(`Malformed $bytes field on ${e}`);
			return os(e.$bytes).buffer;
		}
		if (u === "$integer") {
			if (typeof e.$integer != "string") throw new Error(`Malformed $integer field on ${e}`);
			return Q1(e.$integer);
		}
		if (u === "$float") {
			if (typeof e.$float != "string") throw new Error(`Malformed $float field on ${e}`);
			const s = os(e.$float);
			if (s.byteLength !== 8) throw new Error(`Received ${s.byteLength} bytes, expected 8 for $float`);
			const o = new DataView(s.buffer).getFloat64(0, mb);
			if (!gb(o)) throw new Error(`Float ${o} should be encoded as a number`);
			return o;
		}
		if (u === "$commitTs") {
			if (e.$commitTs !== null) throw new Error(`Malformed $commitTs field on ${e}`);
			return $1;
		}
		if (u === "$set") throw new Error("Received a Set which is no longer supported as a Convex type.");
		if (u === "$map") throw new Error("Received a Map which is no longer supported as a Convex type.");
	}
	const i = {};
	for (const [u, s] of Object.entries(e)) (Rh(u), (i[u] = Fu(s)));
	return i;
}
var yp = 16384;
function Pu(e) {
	const t = JSON.stringify(e, (i, u) => (u === void 0 ? "undefined" : typeof u == "bigint" ? `${u.toString()}n` : u));
	if (t.length > yp) {
		const i = "[...truncated]";
		let u = yp - 14;
		const s = t.codePointAt(u - 1);
		return (s !== void 0 && s > 65535 && (u -= 1), t.substring(0, u) + i);
	}
	return t;
}
function sc(e, t, i, u) {
	if (e === void 0) {
		const f = i && ` (present at path ${i} in original object ${Pu(t)})`;
		throw new Error(
			`undefined is not a valid Convex value${f}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`,
		);
	}
	if (e === null) return e;
	if (typeof e == "bigint") {
		if (e < Gu || em < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
		return { $integer: P1(e) };
	}
	if (typeof e == "number")
		if (gb(e)) {
			const f = new ArrayBuffer(8);
			return (new DataView(f).setFloat64(0, e, mb), { $float: cs(new Uint8Array(f)) });
		} else return e;
	if (typeof e == "boolean" || typeof e == "string") return e;
	if (e instanceof ArrayBuffer) return { $bytes: cs(new Uint8Array(e)) };
	if (e instanceof vb) return { $commitTs: null };
	if (Array.isArray(e)) return e.map((f, h) => sc(f, t, i + `[${h}]`, !1));
	if (e instanceof Set) throw new Error(Jd(i, "Set", [...e], t));
	if (e instanceof Map) throw new Error(Jd(i, "Map", [...e], t));
	if (!hb(e)) {
		const f = e?.constructor?.name,
			h = f ? `${f} ` : "";
		throw new Error(Jd(i, h, e, t));
	}
	const s = {},
		o = Object.entries(e);
	o.sort(([f, h], [m, v]) => (f === m ? 0 : f < m ? -1 : 1));
	for (const [f, h] of o)
		h !== void 0 ? (Rh(f), (s[f] = sc(h, t, i + `.${f}`, !1))) : u && (Rh(f), (s[f] = K1(h, t, i + `.${f}`)));
	return s;
}
function Jd(e, t, i, u) {
	return e
		? `${t}${Pu(i)} is not a supported Convex type (present at path ${e} in original object ${Pu(u)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
		: `${t}${Pu(i)} is not a supported Convex type.`;
}
function K1(e, t, i) {
	if (e === void 0) return { $undefined: null };
	if (t === void 0) throw new Error(`Programming error. Current value is ${Pu(e)} but original value is undefined`);
	return sc(e, t, i, !1);
}
function Ya(e) {
	return sc(e, e, "", !1);
}
var Y1 = Object.defineProperty,
	G1 = (e, t, i) => (t in e ? Y1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	Wd = (e, t, i) => G1(e, typeof t != "symbol" ? t + "" : t, i),
	pp,
	bp,
	F1 = Symbol.for("ConvexError"),
	Ch = class extends ((bp = Error), (pp = F1), bp) {
		constructor(e) {
			(super(typeof e == "string" ? e : Pu(e)),
				Wd(this, "name", "ConvexError"),
				Wd(this, "data"),
				Wd(this, pp, !0),
				(this.data = e));
		}
	},
	X1 = Object.defineProperty,
	J1 = (e, t, i) => (t in e ? X1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	_p = (e, t, i) => J1(e, typeof t != "symbol" ? t + "" : t, i),
	W1 = "color:rgb(0, 145, 255)";
function yb(e) {
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
var pb = class {
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
function eE(e) {
	const t = new pb(e);
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
function tE(e) {
	return new pb(e);
}
function oc(e, t, i, u, s) {
	const o = yb(i);
	if ((typeof s == "object" && (s = `ConvexError ${JSON.stringify(s.errorData, null, 2)}`), t === "info")) {
		const f = s.match(/^\[.*?\] /);
		if (f === null) {
			e.error(`[CONVEX ${o}(${u})] Could not parse console.log`);
			return;
		}
		const h = s.slice(1, f[0].length - 2),
			m = s.slice(f[0].length);
		e.log(`%c[CONVEX ${o}(${u})] [${h}]`, W1, m);
	} else e.error(`[CONVEX ${o}(${u})] ${s}`);
}
function nE(e, t) {
	const i = `[CONVEX FATAL ERROR] ${t}`;
	return (e.error(i), new Error(i));
}
function Bu(e, t, i) {
	return `[CONVEX ${yb(e)}(${t})] ${i.errorMessage}
  Called by client`;
}
function kh(e, t) {
	return ((t.data = e.errorData), t);
}
function Ga(e) {
	const t = e.split(":");
	let i, u;
	return (
		t.length === 1 ? ((i = t[0]), (u = "default")) : ((i = t.slice(0, t.length - 1).join(":")), (u = t[t.length - 1])),
		i.endsWith(".js") && (i = i.slice(0, -3)),
		`${i}:${u}`
	);
}
function Ka(e, t) {
	return JSON.stringify({ udfPath: Ga(e), args: Ya(t) });
}
function Sp(e, t, i) {
	const { initialNumItems: u, id: s } = i;
	return JSON.stringify({ type: "paginated", udfPath: Ga(e), args: Ya(t), options: Ya({ initialNumItems: u, id: s }) });
}
function rE(e) {
	return JSON.parse(e).type === "paginated";
}
var iE = Object.defineProperty,
	aE = (e, t, i) => (t in e ? iE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	ei = (e, t, i) => aE(e, typeof t != "symbol" ? t + "" : t, i),
	uE = class {
		constructor() {
			(ei(this, "nextQueryId"),
				ei(this, "querySetVersion"),
				ei(this, "querySet"),
				ei(this, "queryIdToToken"),
				ei(this, "identityVersion"),
				ei(this, "auth"),
				ei(this, "outstandingQueriesOlderThanRestart"),
				ei(this, "outstandingAuthOlderThanRestart"),
				ei(this, "paused"),
				ei(this, "pendingQuerySetModifications"),
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
			const s = Ga(e),
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
					S = { type: "Add", queryId: h, udfPath: s, args: [Ya(t)], journal: i, componentPath: u };
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
			const i = Ka(Ga(e), t),
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
					args: [Ya(u.args)],
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
	lE = Object.defineProperty,
	sE = (e, t, i) => (t in e ? lE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	Bo = (e, t, i) => sE(e, typeof t != "symbol" ? t + "" : t, i),
	oE = class {
		constructor(e, t) {
			((this.logger = e),
				(this.markConnectionStateDirty = t),
				Bo(this, "inflightRequests"),
				Bo(this, "requestsOlderThanRestart"),
				Bo(this, "inflightMutationsCount", 0),
				Bo(this, "inflightActionsCount", 0),
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
			for (const h of e.logLines) oc(this.logger, "info", i, u, h);
			const s = t.status;
			let o, f;
			if (e.success) ((o = { success: !0, logLines: e.logLines, value: Fu(e.result) }), (f = () => s.onResult(o)));
			else {
				const h = e.result,
					{ errorData: m } = e;
				(oc(this.logger, "error", i, u, h),
					(o = { success: !1, errorMessage: h, errorData: m !== void 0 ? Fu(m) : void 0, logLines: e.logLines }),
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
	cc = Symbol.for("functionName"),
	cE = Symbol.for("toReferencePath");
function fE(e) {
	return e[cE] ?? null;
}
function dE(e) {
	return e.startsWith("function://");
}
function hE(e) {
	let t;
	if (typeof e == "string") dE(e) ? (t = { functionHandle: e }) : (t = { name: e });
	else if (e[cc]) t = { name: e[cc] };
	else {
		const i = fE(e);
		if (!i) throw new Error(`${e} is not a functionReference`);
		t = { reference: i };
	}
	return t;
}
function Ai(e) {
	const t = hE(e);
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
	const i = e[cc];
	if (!i) throw new Error(`${e} is not a functionReference`);
	return i;
}
function bb(e = []) {
	return new Proxy(
		{},
		{
			get(t, i) {
				if (typeof i == "string") return bb([...e, i]);
				if (i === cc) {
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
var vr = bb(),
	mE = Object.defineProperty,
	vE = (e, t, i) => (t in e ? mE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	fc = (e, t, i) => vE(e, typeof t != "symbol" ? t + "" : t, i),
	wp = class Nh {
		constructor(t) {
			(fc(this, "queryResults"), fc(this, "modifiedQueries"), (this.queryResults = t), (this.modifiedQueries = []));
		}
		getQuery(t, ...i) {
			const u = fa(i[0]),
				s = Ai(t),
				o = this.queryResults.get(Ka(s, u));
			if (o !== void 0) return Nh.queryValue(o.result);
		}
		getAllQueries(t) {
			const i = [],
				u = Ai(t);
			for (const s of this.queryResults.values())
				s.udfPath === Ga(u) && i.push({ args: s.args, value: Nh.queryValue(s.result) });
			return i;
		}
		setQuery(t, i, u) {
			const s = fa(i),
				o = Ai(t),
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
	gE = class {
		constructor() {
			(fc(this, "queryResults"),
				fc(this, "optimisticUpdates"),
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
				throw i.errorData !== void 0 ? kh(i, new Ch(Bu("query", t.udfPath, i))) : new Error(Bu("query", t.udfPath, i));
			}
		}
		hasQueryResult(e) {
			return this.queryResults.get(e) !== void 0;
		}
		queryLogs(e) {
			return this.queryResults.get(e)?.result?.logLines;
		}
	},
	yE = Object.defineProperty,
	pE = (e, t, i) => (t in e ? yE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	eh = (e, t, i) => pE(e, typeof t != "symbol" ? t + "" : t, i),
	gs = class Ti {
		constructor(t, i) {
			(eh(this, "low"),
				eh(this, "high"),
				eh(this, "__isUnsignedLong__"),
				(this.low = t | 0),
				(this.high = i | 0),
				(this.__isUnsignedLong__ = !0));
		}
		static isLong(t) {
			return (t && t.__isUnsignedLong__) === !0;
		}
		static fromBytesLE(t) {
			return new Ti(t[0] | (t[1] << 8) | (t[2] << 16) | (t[3] << 24), t[4] | (t[5] << 8) | (t[6] << 16) | (t[7] << 24));
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
			return isNaN(t) || t < 0 ? Ep : t >= bE ? _E : new Ti((t % as) | 0, (t / as) | 0);
		}
		toString() {
			return (BigInt(this.high) * BigInt(as) + BigInt(this.low)).toString();
		}
		equals(t) {
			return (
				Ti.isLong(t) || (t = Ti.fromValue(t)),
				this.high >>> 31 === 1 && t.high >>> 31 === 1 ? !1 : this.high === t.high && this.low === t.low
			);
		}
		notEquals(t) {
			return !this.equals(t);
		}
		comp(t) {
			return (
				Ti.isLong(t) || (t = Ti.fromValue(t)),
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
			return typeof t == "number" ? Ti.fromNumber(t) : new Ti(t.low, t.high);
		}
	},
	Ep = new gs(0, 0),
	Tp = 65536,
	as = Tp * Tp,
	bE = as * as,
	_E = new gs(-1, -1),
	SE = Object.defineProperty,
	wE = (e, t, i) => (t in e ? SE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	Vo = (e, t, i) => wE(e, typeof t != "symbol" ? t + "" : t, i),
	xp = class {
		constructor(e, t) {
			(Vo(this, "version"),
				Vo(this, "remoteQuerySet"),
				Vo(this, "queryPath"),
				Vo(this, "logger"),
				(this.version = { querySet: 0, ts: gs.fromNumber(0), identity: 0 }),
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
						if (u) for (const o of i.logLines) oc(this.logger, "info", "query", u, o);
						const s = Fu(i.value ?? null);
						this.remoteQuerySet.set(i.queryId, { success: !0, value: s, logLines: i.logLines });
						break;
					}
					case "QueryFailed": {
						const u = this.queryPath(i.queryId);
						if (u) for (const o of i.logLines) oc(this.logger, "info", "query", u, o);
						const { errorData: s } = i;
						this.remoteQuerySet.set(i.queryId, {
							success: !1,
							errorMessage: i.errorMessage,
							errorData: s !== void 0 ? Fu(s) : void 0,
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
function th(e) {
	const t = os(e);
	return gs.fromBytesLE(Array.from(t));
}
function EE(e) {
	const t = new Uint8Array(e.toBytesLE());
	return cs(t);
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
			return e.success ? { ...e, ts: th(e.ts) } : { ...e };
		case "Transition":
			return {
				...e,
				startVersion: { ...e.startVersion, ts: th(e.startVersion.ts) },
				endVersion: { ...e.endVersion, ts: th(e.endVersion.ts) },
			};
		default:
	}
}
function TE(e) {
	switch (e.type) {
		case "Authenticate":
		case "ModifyQuerySet":
		case "Mutation":
		case "Action":
		case "Event":
			return { ...e };
		case "Connect":
			return e.maxObservedTimestamp !== void 0
				? { ...e, maxObservedTimestamp: EE(e.maxObservedTimestamp) }
				: { ...e, maxObservedTimestamp: void 0 };
		default:
	}
}
var xE = Object.defineProperty,
	AE = (e, t, i) => (t in e ? xE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	cn = (e, t, i) => AE(e, typeof t != "symbol" ? t + "" : t, i),
	RE = 1e3,
	CE = 1001,
	kE = 1005,
	NE = 4040,
	ic;
function $u() {
	return (
		ic === void 0 && (ic = Date.now()),
		typeof performance > "u" || !performance.now ? Date.now() : Math.round(ic + performance.now())
	);
}
function Rp() {
	return `t=${Math.round(($u() - ic) / 100) / 10}s`;
}
var _b = {
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
function ME(e) {
	if (e === void 0) return "Unknown";
	for (const t of Object.keys(_b)) if (e.startsWith(t)) return t;
	return "Unknown";
}
var OE = class {
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
							clientTs: $u(),
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
					t.code !== RE && t.code !== CE && t.code !== kE && t.code !== NE)
				) {
					let u = `WebSocket closed with code ${t.code}`;
					(t.reason && (u += `: ${t.reason}`),
						this.logger.log(u),
						this.onServerDisconnectError && t.reason && this.onServerDisconnectError(u));
				}
				const i = ME(t.reason);
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
			const i = TE(e),
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
		const i = $u(),
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
			const t = $u() - this.scheduledReconnect.scheduledAt;
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
							clientTs: $u(),
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
			(e === "client" ? 100 : e === "Unknown" ? this.defaultInitialBackoff : _b[e].timeout) * Math.pow(2, this.retries);
		this.retries += 1;
		const i = Math.min(t, this.maxBackoff);
		return i + i * (Math.random() - 0.5);
	}
	reportLargeTransition({ transition: e, messageLength: t }) {
		if (e.clientClockSkew === void 0 || e.serverTs === void 0) return;
		const i = $u() - e.clientClockSkew - e.serverTs / 1e6,
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
function zE() {
	return DE();
}
function DE() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
		const t = (Math.random() * 16) | 0;
		return (e === "x" ? t : (t & 3) | 8).toString(16);
	});
}
var ns = class extends Error {};
ns.prototype.name = "InvalidTokenError";
function jE(e) {
	return decodeURIComponent(
		atob(e).replace(/(.)/g, (t, i) => {
			let u = i.charCodeAt(0).toString(16).toUpperCase();
			return (u.length < 2 && (u = "0" + u), "%" + u);
		}),
	);
}
function IE(e) {
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
		return jE(t);
	} catch {
		return atob(t);
	}
}
function Sb(e, t) {
	if (typeof e != "string") throw new ns("Invalid token specified: must be a string");
	t || (t = {});
	const i = t.header === !0 ? 0 : 1,
		u = e.split(".")[i];
	if (typeof u != "string") throw new ns(`Invalid token specified: missing part #${i + 1}`);
	let s;
	try {
		s = IE(u);
	} catch (o) {
		throw new ns(`Invalid token specified: invalid base64 for part #${i + 1} (${o.message})`);
	}
	try {
		return JSON.parse(s);
	} catch (o) {
		throw new ns(`Invalid token specified: invalid json for part #${i + 1} (${o.message})`);
	}
}
var LE = Object.defineProperty,
	qE = (e, t, i) => (t in e ? LE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	tr = (e, t, i) => qE(e, typeof t != "symbol" ? t + "" : t, i),
	UE = 480 * 60 * 60 * 1e3,
	Cp = 2,
	$E = class {
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
			let h = Math.min(UE, (f - this.refreshTokenLeewaySeconds) * 1e3);
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
				return Sb(e);
			} catch (t) {
				return (this._logVerbose(`Error decoding token: ${t instanceof Error ? t.message : "Unknown error"}`), null);
			}
		}
		_logVerbose(e) {
			this.logger.logVerbose(`${e} [v${this.configVersion}]`);
		}
	},
	BE = ["convexClientConstructed", "convexWebSocketOpen", "convexFirstMessageReceived"];
function VE(e, t) {
	const i = { sessionId: t };
	typeof performance > "u" || !performance.mark || performance.mark(e, { detail: i });
}
function ZE(e) {
	let t = e.name.slice(6);
	return ((t = t.charAt(0).toLowerCase() + t.slice(1)), { name: t, startTime: e.startTime });
}
function HE(e) {
	if (typeof performance > "u" || !performance.getEntriesByName) return [];
	const t = [];
	for (const i of BE) {
		const u = performance
			.getEntriesByName(i)
			.filter((s) => s.entryType === "mark")
			.filter((s) => s.detail.sessionId === e);
		t.push(...u);
	}
	return t.map(ZE);
}
var PE = Object.defineProperty,
	QE = (e, t, i) => (t in e ? PE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	fn = (e, t, i) => QE(e, typeof t != "symbol" ? t + "" : t, i),
	KE = class {
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
					this.debug && VE(b, this.sessionId);
				}),
				typeof e == "object")
			)
				throw new Error(
					"Passing a ClientConfig object is no longer supported. Pass the URL of the Convex deployment as a string directly.",
				);
			(i?.skipConvexDeploymentUrlCheck !== !0 && db(e), (i = { ...i }));
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
						? tE({ verbose: i.verbose ?? !1 })
						: i.logger !== !0 && i.logger
							? i.logger
							: eE({ verbose: i.verbose ?? !1 })));
			const o = e.search("://");
			if (o === -1) throw new Error("Provided address was not an absolute URL.");
			const f = e.substring(o + 3),
				h = e.substring(0, o);
			let m;
			if (h === "http") m = "ws";
			else if (h === "https") m = "wss";
			else throw new Error(`Unknown parent protocol ${h}`);
			const v = `${m}://${f}/api/${vp}/sync`;
			((this.state = new uE()),
				(this.remoteQuerySet = new xp((b) => this.state.queryPath(b), this.logger)),
				(this.requestManager = new oE(this.logger, this.markConnectionStateDirty)));
			const g = () => {
				(this.webSocketManager.pause(), this.state.pause());
			};
			((this.authenticationManager = new $E(
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
				(this.optimisticQueryResults = new gE()),
				this.addOnTransitionHandler((b) => {
					t(b.queries.map((p) => p.token));
				}),
				(this._nextRequestId = 0),
				(this._sessionId = zE()));
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
			((this.webSocketManager = new OE(
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
						const [p, E] = this.state.restart();
						(E && this.webSocketManager.sendMessage(E), this.webSocketManager.sendMessage(p));
						for (const A of this.requestManager.restart()) this.webSocketManager.sendMessage(A);
					},
					onResume: () => {
						const [b, p] = this.state.resume();
						(p && this.webSocketManager.sendMessage(p), b && this.webSocketManager.sendMessage(b));
						for (const E of this.requestManager.resume()) this.webSocketManager.sendMessage(E);
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
								const p = nE(this.logger, b.error);
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
					t = e ? Sb(e.value) : {};
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
				throw u.errorData !== void 0 ? kh(u, new Ch(Bu("mutation", e, u))) : new Error(Bu("mutation", e, u));
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
			const f = { type: "Mutation", requestId: o, udfPath: e, componentPath: u, args: [Ya(s)] },
				h = this.webSocketManager.sendMessage(f);
			return { requestId: o, mutationPromise: this.requestManager.request(f, h) };
		}
		async action(e, t) {
			const i = await this.actionInternal(e, t);
			if (!i.success) throw i.errorData !== void 0 ? kh(i, new Ch(Bu("action", e, i))) : new Error(Bu("action", e, i));
			return i.value;
		}
		async actionInternal(e, t, i) {
			const u = fa(t),
				s = this.nextRequestId;
			(this._nextRequestId++, this.tryReportLongDisconnect());
			const o = { type: "Action", requestId: s, udfPath: e, componentPath: i, args: [Ya(u)] },
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
				const e = HE(this.sessionId);
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
function nh(e) {
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
var YE = Object.defineProperty,
	GE = (e, t, i) => (t in e ? YE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	kp = (e, t, i) => GE(e, typeof t != "symbol" ? t + "" : t, i),
	FE = class {
		constructor(e, t) {
			((this.client = e),
				(this.onTransition = t),
				kp(this, "paginatedQuerySet", new Map()),
				kp(this, "lastTransitionTs"),
				(this.lastTransitionTs = gs.fromNumber(0)),
				this.client.addOnTransitionHandler((i) => this.onBaseTransition(i)));
		}
		subscribe(e, t, i) {
			const u = Ga(e),
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
			const u = Sp(Ga(e), t, i);
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
				const v = nh(m);
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
			const s = nh(u);
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
					const g = nh(v);
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
	XE = Object.defineProperty,
	JE = (e, t, i) => (t in e ? XE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	qu = (e, t, i) => JE(e, typeof t != "symbol" ? t + "" : t, i),
	Np,
	WE = class {
		constructor(e, t = {}) {
			(qu(this, "listeners"),
				qu(this, "_client"),
				qu(this, "_paginatedClient"),
				qu(this, "callNewListenersWithCurrentValuesTimer"),
				qu(this, "_closed"),
				qu(this, "_disabled"),
				t.skipConvexDeploymentUrlCheck !== !0 && db(e));
			const { disabled: i, ...u } = t;
			((this._closed = !1),
				(this._disabled = !!i),
				Np && !("webSocketConstructor" in u) && typeof WebSocket > "u" && (u.webSocketConstructor = Np),
				typeof window > "u" && !("unsavedChangesWarning" in u) && (u.unsavedChangesWarning = !1),
				this.disabled ||
					((this._client = new KE(e, () => {}, u)),
					(this._paginatedClient = new FE(this._client, (s) => this._transition(s)))),
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
			const { queryToken: s, unsubscribe: o } = this.client.subscribe(Ai(e), t),
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
				{ paginatedQueryToken: f, unsubscribe: h } = this.paginatedClient.subscribe(Ai(e), t, o),
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
					getCurrentValue: () => this.paginatedClient.localQueryResult(Ai(e), t, o),
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
					v = rE(f),
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
			return await this.client.mutation(Ai(e), t, i);
		}
		async action(e, t) {
			if (this.disabled) throw new Error("ConvexClient is disabled");
			return await this.client.action(Ai(e), t);
		}
		async query(e, t) {
			if (this.disabled) throw new Error("ConvexClient is disabled");
			const i = this.client.localQueryResult(Ai(e), t);
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
	eT = 6e4,
	tT = 500,
	nT = 1e4,
	rT = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
	Mp = 128,
	Op = 109,
	zp = 100,
	iT = /^[\x21-\x7e]+$/,
	Dp = 100,
	jp = 16,
	Zo = 6,
	Ip = 100;
function Lp(e) {
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
var Mh = { reason: "denied", message: "This plugin no longer has access to its data" },
	Oh = { reason: "session_expired", message: "This plugin session expired" },
	Qa = { reason: "unavailable", message: "The plugin data connection is unavailable" };
function aT(e) {
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
function qp() {
	return { _nay: { name: "unavailable", message: "Failed to read who can access this" } };
}
function uT(e) {
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
function lT() {
	const e = window.location.hash.slice(1);
	if (!e) throw new Error("Missing host bridge fragment — this plugin frame must be embedded by the Bonobo host app");
	const t = new URLSearchParams(e),
		i = t.getAll("parentOrigin"),
		u = t.getAll("bridgeNonce");
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
	if (!rT.test(o)) throw new Error("Invalid host bridge nonce");
	return { parentOrigin: s, bridgeNonce: o };
}
function Ho(e) {
	return e.collection.length === 0 || e.collection.length > Mp
		? `Collection names must be 1 to ${Mp} characters`
		: e.keyPrefix !== void 0 && (e.keyPrefix.length > Op || !iT.test(e.keyPrefix))
			? `Key prefixes must be 1 to ${Op} printable ASCII characters`
			: !Number.isInteger(e.limit) || e.limit < 1 || e.limit > zp
				? `Watch limits must be integers from 1 to ${zp}`
				: null;
}
function sT(e) {
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
			const O = e.start_watch(
				e.queryArgs,
				{
					...(C.start === null ? {} : { keyStartExclusive: C.start }),
					...(C.end === null ? {} : { keyEndInclusive: C.end }),
				},
				(Y) => {
					k || q(C, Y);
				},
			);
			return O
				? ((C.stop = () => {
						k || ((k = !0), O.dispose(), e.release_server_slot());
					}),
					!0)
				: (e.release_server_slot(), !1);
		},
		o = (C) => {
			if (C.docs === null || C.docs.length === 0) return null;
			const k = C.previousFirstKey ?? C.docs[C.docs.length - 1].key;
			return k === C.start || k === C.end || new Set(C.docs.map((O) => O.key)).size < 2 ? null : k;
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
			const C = t.intervals.flatMap((O, Y) => {
					const X = v(Y);
					return (X === void 0 ? O.docs : X) ?? [];
				}),
				k = t.intervals[t.intervals.length - 1];
			return {
				docs: C,
				hasMore: t.bottomOpen && !(k !== void 0 && k.end === null && k.docs !== null && !k.truncated),
				atCapacity: t.forceAtCapacity || t.intervals.length >= Zo || e.page_at_ceiling(),
				incomplete: t.intervals.some((O, Y) =>
					O.end === null ||
					!O.truncated ||
					O.docs === null ||
					(t.pending && Y >= t.pending.from && Y < t.pending.from + t.pending.removeCount)
						? !1
						: o(O) === null || h() + 1 > Zo || e.page_at_ceiling(2),
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
				O = k[k.length - 1].key;
			(C.stop(), (C.end = O), (C.truncated = !1), (t.bottomOpen = !0), s(C) || u(Qa));
		},
		E = () => {
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
				t.queuedLoadOlder && ((t.queuedLoadOlder = !1), E());
				for (const [k, O] of t.intervals.entries()) {
					if (O.end === null || !O.truncated || O.docs === null) continue;
					const Y = o(O);
					if (Y === null) continue;
					if (f() + 1 > Zo) break;
					const X = {
							start: O.start,
							end: Y,
							docs: null,
							truncated: !1,
							previousFirstKey: void 0,
							previousDocs: null,
							stop: () => {},
						},
						D = {
							start: Y,
							end: O.end,
							docs: null,
							truncated: !1,
							previousFirstKey: void 0,
							previousDocs: null,
							stop: () => {},
						};
					if (!s(X)) break;
					if (!s(D)) {
						X.stop();
						break;
					}
					t.pending = { from: k, removeCount: 1, replacements: [X, D], suppressedDocs: [m(O)] };
					return;
				}
				for (let k = 0; k + 1 < t.intervals.length; k += 1) {
					const O = t.intervals[k],
						Y = t.intervals[k + 1];
					if (O.docs === null || Y.docs === null || O.docs.length + Y.docs.length >= e.queryArgs.limit) continue;
					const X = {
						start: O.start,
						end: Y.end,
						docs: null,
						truncated: !1,
						previousFirstKey: void 0,
						previousDocs: null,
						stop: () => {},
					};
					if (!s(X)) break;
					t.pending = { from: k, removeCount: 2, replacements: [X], suppressedDocs: [m(O), m(Y)] };
					return;
				}
			}
		},
		M = () => {
			const C = t.pending;
			t.pending = null;
			const k = t.intervals.splice(C.from, C.removeCount, ...C.replacements);
			for (const O of k) O.stop();
			(S(), A());
		},
		q = (C, k) => {
			if (!t.dead) {
				if ("queryError" in k) {
					const O = e.session_expired() ? Oh : Qa;
					(O === Qa && console.error("[bonobo-plugin-sdk] Plugin data window interval failed:", k.queryError), u(O));
					return;
				}
				if (k.value === null) {
					u(Mh);
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
					t.pending.replacements.every((O) => O.docs !== null) && M();
					return;
				}
				(S(), A());
			}
		},
		z = {
			start: null,
			end: null,
			docs: null,
			truncated: !1,
			previousFirstKey: void 0,
			previousDocs: null,
			stop: () => {},
		};
	return s(z)
		? (t.intervals.push(z),
			{
				load_older: () => {
					if (!t.dead) {
						if (t.pending) {
							t.queuedLoadOlder = !0;
							return;
						}
						E();
					}
				},
				dispose: () => {
					t.dead || i();
				},
			})
		: null;
}
function oT(e) {
	const t = new Set();
	let i = 0;
	const u = () => (i >= Ip ? !1 : ((i += 1), !0)),
		s = () => {
			i -= 1;
		},
		o = (p = 1) => i + p > Ip,
		f = (p, E) => {
			setTimeout(() => {
				E ? p(null, E) : p(null);
			}, 0);
		},
		h = (p) => {
			(console.warn("[bonobo-plugin-sdk] Data watch refused, subscription cap reached"),
				f(p, { reason: "capacity", message: "Subscription limit reached for this plugin frame" }));
		},
		m = (p) => {
			if (t.size >= jp || o()) return (h(p.onUpdate), () => {});
			if (!u()) return (h(p.onUpdate), () => {});
			const E = {};
			t.add(E);
			let A = null;
			const M = () => {
				t.delete(E) && (A?.dispose(), s());
			};
			return (
				(A = p.start((q) => {
					if (t.has(E)) {
						if ("queryError" in q) {
							const z = e.session_expired() ? Oh : Qa;
							(z === Qa && console.error(`[bonobo-plugin-sdk] Plugin ${p.failureLabel} failed:`, q.queryError),
								M(),
								p.onUpdate(null, z));
							return;
						}
						if (q.value === null) {
							(M(), p.onUpdate(null, Mh));
							return;
						}
						p.onUpdate(p.deliver(q.value));
					}
				})),
				A
					? function () {
							M();
						}
					: (M(),
						console.error(`[bonobo-plugin-sdk] Plugin ${p.failureLabel} could not start`),
						f(p.onUpdate),
						() => {})
			);
		},
		v = {
			watch(p, E) {
				const A = Ho({
					collection: p.collection,
					...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
					limit: p.limit,
				});
				return A
					? (f(E, { reason: "invalid", message: A }), () => {})
					: m({
							start: (M) =>
								e.start_watch(
									{
										collection: p.collection,
										...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
										limit: p.limit,
									},
									null,
									M,
								),
							onUpdate: E,
							deliver: (M) => ({ docs: M.docs, truncated: M.truncated }),
							failureLabel: "data watch",
						});
			},
			watchRecent(p, E) {
				const A = Ho({ collection: p.collection, limit: p.limit });
				return A
					? (f(E, { reason: "invalid", message: A }), () => {})
					: m({
							start: (M) =>
								e.start_recent_watch(
									{
										collection: p.collection,
										limit: p.limit,
										...(p.order === void 0 ? {} : { order: p.order }),
										...(p.since === void 0 ? {} : { since: p.since }),
										...(p.before === void 0 ? {} : { before: p.before }),
										...(p.scopeId === void 0 ? {} : { scopeId: p.scopeId }),
									},
									M,
								),
							onUpdate: E,
							deliver: (M) => ({ docs: M.docs, truncated: M.truncated }),
							failureLabel: "recent watch",
						});
			},
			watchChanges(p, E) {
				const A = Ho({ collection: p.collection, limit: p.limit });
				return A
					? (f(E, { reason: "invalid", message: A }), () => {})
					: m({
							start: (M) =>
								e.start_changes_watch(
									{
										collection: p.collection,
										limit: p.limit,
										...(p.updatedSince === void 0 ? {} : { updatedSince: p.updatedSince }),
										...(p.scopeId === void 0 ? {} : { scopeId: p.scopeId }),
									},
									M,
								),
							onUpdate: E,
							deliver: (M) => ({ docs: M.docs, truncated: M.truncated }),
							failureLabel: "changes watch",
						});
			},
			watchWindow(p, E) {
				const A = { loadOlder() {}, unsubscribe() {} },
					M = Ho({
						collection: p.collection,
						...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
						limit: p.pageSize,
					});
				if (M) return (f(E, { reason: "invalid", message: M }), A);
				if (t.size >= jp || o()) return (h(E), A);
				const q = {};
				t.add(q);
				const z = sT({
					queryArgs: {
						collection: p.collection,
						...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
						limit: p.pageSize,
					},
					start_watch: e.start_watch,
					acquire_server_slot: u,
					release_server_slot: s,
					page_at_ceiling: o,
					post_update: (C) => E(C),
					on_dead: (C) => {
						(t.delete(q), E(null, C));
					},
					session_expired: e.session_expired,
				});
				return z
					? {
							loadOlder() {
								t.has(q) && z.load_older();
							},
							unsubscribe() {
								t.delete(q) && z.dispose();
							},
						}
					: (t.delete(q), console.error("[bonobo-plugin-sdk] Plugin data window could not start"), f(E), A);
			},
			append(p) {
				return g("append", {
					collection: p.collection,
					...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
					value: p.value,
					...(p.clientRequestId === void 0 ? {} : { clientRequestId: p.clientRequestId }),
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
	function g(p, E) {
		return Promise.resolve()
			.then(() => e.run_user_write(p, E))
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
				.then((E) => (E === null ? {} : E.members))
				.catch((E) => (console.error("[bonobo-plugin-sdk] Failed to resolve plugin member names:", E), {}));
		},
		list(p) {
			return !Number.isInteger(p.limit) || p.limit < 1 || p.limit > Dp
				? Promise.resolve({ _nay: { name: "invalid", message: `Member list limits must be integers from 1 to ${Dp}` } })
				: Promise.resolve()
						.then(() => e.list_members(p.limit, p.cursor ?? null))
						.then((E) =>
							E === null
								? { _nay: { name: Mh.reason, message: "This plugin no longer has access to this workspace" } }
								: "refusal" in E
									? {
											_nay: {
												name: "not_consented",
												message: "This workspace has not granted this plugin the member list",
											},
										}
									: { _yay: { members: E.members, cursor: E.cursor } },
						)
						.catch((E) => {
							const A = e.session_expired() ? Oh : Qa;
							return (
								A === Qa && console.error("[bonobo-plugin-sdk] Failed to list plugin workspace members:", E),
								{ _nay: { name: A.reason, message: A.message } }
							);
						});
		},
	};
	function b(p) {
		return Promise.resolve()
			.then(() => e.run_manage_scope(p))
			.then((E) => E)
			.catch(
				(E) => (
					console.error("[bonobo-plugin-sdk] Plugin scope change failed:", E),
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
					principals: p.principals,
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
					.then((E) => {
						const A = aT(E);
						return A === void 0
							? (console.error("[bonobo-plugin-sdk] Plugin scope principals response was invalid"), qp())
							: { _yay: A };
					})
					.catch((E) => (console.error("[bonobo-plugin-sdk] Failed to read plugin scope principals:", E), qp()));
			},
			watchMine(p) {
				return m({
					start: (E) => e.start_my_scopes_watch(E),
					onUpdate: p,
					deliver: (E) => E,
					failureLabel: "scope watch",
				});
			},
		},
	};
}
function cT(e) {
	return {
		start_watch: (i, u, s) => {
			try {
				const o = e.onUpdate(
					vr.plugins_data.watch_documents,
					{
						...i,
						...(u?.keyStartExclusive === void 0 ? {} : { keyStartExclusive: u.keyStartExclusive }),
						...(u?.keyEndInclusive === void 0 ? {} : { keyEndInclusive: u.keyEndInclusive }),
					},
					(f) => s({ value: f }),
					(f) => s({ queryError: f }),
				);
				return { dispose: () => void o() };
			} catch {
				return null;
			}
		},
		start_recent_watch: (i, u) => {
			try {
				const s = e.onUpdate(
					vr.plugins_data.watch_recent,
					i,
					(o) => u({ value: o }),
					(o) => u({ queryError: o }),
				);
				return { dispose: () => void s() };
			} catch {
				return null;
			}
		},
		start_changes_watch: (i, u) => {
			try {
				const s = e.onUpdate(
					vr.plugins_data.watch_changes,
					i,
					(o) => u({ value: o }),
					(o) => u({ queryError: o }),
				);
				return { dispose: () => void s() };
			} catch {
				return null;
			}
		},
		run_user_write: (i, u) => {
			switch (i) {
				case "append":
					return e.mutation(vr.plugins_data.user_append_document, u);
				case "put":
					return e.mutation(vr.plugins_data.user_put_document, u);
				case "remove":
					return e.mutation(vr.plugins_data.user_remove_document, u);
				case "putOwned":
					return e.mutation(vr.plugins_data.user_put_owned_document, u);
				case "removeOwned":
					return e.mutation(vr.plugins_data.user_remove_owned_document, u);
			}
		},
		resolve_member_display: (i) => e.query(vr.plugins_data.resolve_member_display, { userIds: i }),
		list_members: (i, u) => e.query(vr.plugins_data.list_members, { limit: i, cursor: u }),
		run_manage_scope: (i) => e.mutation(vr.plugins_data.user_manage_scope, { action: i }),
		list_scope_principals: (i) => e.query(vr.plugins_data.watch_scope_principals, { scopeId: i }),
		start_my_scopes_watch: (i) => {
			try {
				const u = e.onUpdate(
					vr.plugins_data.watch_my_scopes,
					{},
					(s) => i({ value: s }),
					(s) => i({ queryError: s }),
				);
				return { dispose: () => void u() };
			} catch {
				return null;
			}
		},
	};
}
async function fT() {
	const { parentOrigin: e, bridgeNonce: t } = lT();
	let i = "",
		u = "",
		s = 0,
		o = null;
	const f = new Set(),
		h = new Map();
	let m = null;
	async function v() {
		return Date.now() >= s - eT ? g() : u;
	}
	function g() {
		if (m) return m;
		const E = crypto.randomUUID();
		return (
			(m = new Promise((A, M) => {
				const q = setTimeout(() => {
					(h.delete(E), M(new Error("Plugin frame token refresh timed out")));
				}, nT);
				h.set(E, { resolve: A, reject: M, timeout: q });
				try {
					window.parent.postMessage({ type: "bonobo:token-refresh-request", bridgeNonce: t, requestId: E }, e);
				} catch (z) {
					(clearTimeout(q), h.delete(E), M(z));
				}
			}).finally(() => {
				m = null;
			})),
			m
		);
	}
	async function S(E, A) {
		const M = A?.body !== void 0,
			q = (k) => {
				const O = new Headers(A?.headers);
				return (
					O.set("Authorization", `Bearer ${k}`),
					M && O.set("Content-Type", "application/json"),
					fetch(i + E, {
						method: A?.method ?? (M ? "POST" : "GET"),
						headers: O,
						body: M ? JSON.stringify(A.body) : void 0,
					})
				);
			},
			z = await v();
		let C = await q(z);
		if ((C.status === 401 && (C = await q(u !== z ? u : await g())), !C.ok)) {
			const k = await C.text();
			throw Object.assign(new Error(`${E} responded ${C.status}: ${k}`), { status: C.status, responseText: k });
		}
		return C.json();
	}
	const b = (E) =>
		fetch(i + "/plugins-ui/session-jwt", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token: E }),
		});
	async function p() {
		for (let E = 0; ; E += 1) {
			let A = null;
			try {
				((A = await b(await v())), A.status === 401 && (A = await b(await g())));
			} catch {
				A = null;
			}
			if (A?.ok) {
				const M = await A.json().catch(() => null),
					q = M?._yay?.jwt,
					z = M?._yay?.sessionExpiresAt;
				return typeof q != "string" || typeof z != "number" ? null : ((s = z), q);
			}
			if (!(A === null || A.status === 429 || A.status >= 500) || E >= 2) return null;
			await new Promise((M) => setTimeout(M, 1e3 * (E + 1)));
		}
	}
	return new Promise((E) => {
		let A = !1,
			M;
		const q = () => {
				window.parent.postMessage({ type: "bonobo:ready", bridgeNonce: t }, e);
			},
			z = () => {
				clearInterval(M);
			},
			C = (k) => {
				if (k.source !== window.parent || k.origin !== e) return;
				const O = k.data;
				if (!(typeof O != "object" || O === null)) {
					if (
						O.type === "bonobo:init" &&
						!A &&
						O.bridgeNonce === t &&
						typeof O.apiOrigin == "string" &&
						typeof O.convexUrl == "string" &&
						typeof O.token == "string" &&
						typeof O.tokenExpiresAt == "number" &&
						Number.isFinite(O.tokenExpiresAt) &&
						uT(O.context)
					) {
						((A = !0),
							z(),
							window.removeEventListener("pagehide", z),
							(i = O.apiOrigin),
							(u = O.token),
							(s = O.tokenExpiresAt));
						const Y = new WE(O.convexUrl, { expectAuth: !0, unsavedChangesWarning: !1 });
						(Y.setAuth(p), window.addEventListener("pagehide", () => void Y.close(), { once: !0 }), (o = Lp(O.theme)));
						const { data: X, members: D, scopes: V } = oT({ ...cT(Y), session_expired: () => Date.now() >= s });
						E({
							context: O.context,
							apiOrigin: i,
							getToken: v,
							refreshToken: g,
							fetchJson: S,
							data: X,
							members: D,
							scopes: V,
							theme: {
								current: () => o,
								subscribe(J) {
									return (
										f.add(J),
										() => {
											f.delete(J);
										}
									);
								},
							},
						});
					} else if (
						A &&
						O.bridgeNonce === t &&
						O.type === "bonobo:token" &&
						typeof O.requestId == "string" &&
						typeof O.token == "string" &&
						typeof O.tokenExpiresAt == "number" &&
						Number.isFinite(O.tokenExpiresAt)
					) {
						const Y = h.get(O.requestId);
						Y &&
							(h.delete(O.requestId),
							clearTimeout(Y.timeout),
							(u = O.token),
							(s = O.tokenExpiresAt),
							Y.resolve(O.token));
					} else if (A && O.bridgeNonce === t && O.type === "bonobo:theme") {
						const Y = Lp(O.theme);
						if (Y) {
							o = Y;
							for (const X of f) X(Y);
						}
					} else if (
						A &&
						O.bridgeNonce === t &&
						O.type === "bonobo:token-error" &&
						typeof O.requestId == "string" &&
						typeof O.message == "string"
					) {
						const Y = h.get(O.requestId);
						Y && (h.delete(O.requestId), clearTimeout(Y.timeout), Y.reject(new Error(O.message)));
					}
				}
			};
		(window.addEventListener("message", C),
			window.addEventListener("pagehide", z, { once: !0 }),
			q(),
			(M = setInterval(q, tT)));
	});
}
var dT = Ir((e) => {
		function t(L, $) {
			var H = L.length;
			L.push($);
			e: for (; 0 < H; ) {
				var ve = (H - 1) >>> 1,
					pe = L[ve];
				if (0 < s(pe, $)) ((L[ve] = $), (L[H] = pe), (H = ve));
				else break e;
			}
		}
		function i(L) {
			return L.length === 0 ? null : L[0];
		}
		function u(L) {
			if (L.length === 0) return null;
			var $ = L[0],
				H = L.pop();
			if (H !== $) {
				L[0] = H;
				e: for (var ve = 0, pe = L.length, Ze = pe >>> 1; ve < Ze; ) {
					var N = 2 * (ve + 1) - 1,
						I = L[N],
						se = N + 1,
						ae = L[se];
					if (0 > s(I, H))
						se < pe && 0 > s(ae, I) ? ((L[ve] = ae), (L[se] = H), (ve = se)) : ((L[ve] = I), (L[N] = H), (ve = N));
					else if (se < pe && 0 > s(ae, H)) ((L[ve] = ae), (L[se] = H), (ve = se));
					else break e;
				}
			}
			return $;
		}
		function s(L, $) {
			var H = L.sortIndex - $.sortIndex;
			return H !== 0 ? H : L.id - $.id;
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
			E = !1,
			A = !1,
			M = !1,
			q = typeof setTimeout == "function" ? setTimeout : null,
			z = typeof clearTimeout == "function" ? clearTimeout : null,
			C = typeof setImmediate < "u" ? setImmediate : null;
		function k(L) {
			for (var $ = i(v); $ !== null; ) {
				if ($.callback === null) u(v);
				else if ($.startTime <= L) (u(v), ($.sortIndex = $.expirationTime), t(m, $));
				else break;
				$ = i(v);
			}
		}
		function O(L) {
			if (((A = !1), k(L), !E))
				if (i(m) !== null) ((E = !0), Y || ((Y = !0), le()));
				else {
					var $ = i(v);
					$ !== null && fe(O, $.startTime - L);
				}
		}
		var Y = !1,
			X = -1,
			D = 5,
			V = -1;
		function J() {
			return M ? !0 : !(e.unstable_now() - V < D);
		}
		function W() {
			if (((M = !1), Y)) {
				var L = e.unstable_now();
				V = L;
				var $ = !0;
				try {
					e: {
						((E = !1), A && ((A = !1), z(X), (X = -1)), (p = !0));
						var H = b;
						try {
							t: {
								for (k(L), S = i(m); S !== null && !(S.expirationTime > L && J()); ) {
									var ve = S.callback;
									if (typeof ve == "function") {
										((S.callback = null), (b = S.priorityLevel));
										var pe = ve(S.expirationTime <= L);
										if (((L = e.unstable_now()), typeof pe == "function")) {
											((S.callback = pe), k(L), ($ = !0));
											break t;
										}
										(S === i(m) && u(m), k(L));
									} else u(m);
									S = i(m);
								}
								if (S !== null) $ = !0;
								else {
									var Ze = i(v);
									(Ze !== null && fe(O, Ze.startTime - L), ($ = !1));
								}
							}
							break e;
						} finally {
							((S = null), (b = H), (p = !1));
						}
						$ = void 0;
					}
				} finally {
					$ ? le() : (Y = !1);
				}
			}
		}
		var le;
		if (typeof C == "function")
			le = function () {
				C(W);
			};
		else if (typeof MessageChannel < "u") {
			var oe = new MessageChannel(),
				te = oe.port2;
			((oe.port1.onmessage = W),
				(le = function () {
					te.postMessage(null);
				}));
		} else
			le = function () {
				q(W, 0);
			};
		function fe(L, $) {
			X = q(function () {
				L(e.unstable_now());
			}, $);
		}
		((e.unstable_IdlePriority = 5),
			(e.unstable_ImmediatePriority = 1),
			(e.unstable_LowPriority = 4),
			(e.unstable_NormalPriority = 3),
			(e.unstable_Profiling = null),
			(e.unstable_UserBlockingPriority = 2),
			(e.unstable_cancelCallback = function (L) {
				L.callback = null;
			}),
			(e.unstable_forceFrameRate = function (L) {
				0 > L || 125 < L
					? console.error(
							"forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
						)
					: (D = 0 < L ? Math.floor(1e3 / L) : 5);
			}),
			(e.unstable_getCurrentPriorityLevel = function () {
				return b;
			}),
			(e.unstable_next = function (L) {
				switch (b) {
					case 1:
					case 2:
					case 3:
						var $ = 3;
						break;
					default:
						$ = b;
				}
				var H = b;
				b = $;
				try {
					return L();
				} finally {
					b = H;
				}
			}),
			(e.unstable_requestPaint = function () {
				M = !0;
			}),
			(e.unstable_runWithPriority = function (L, $) {
				switch (L) {
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						break;
					default:
						L = 3;
				}
				var H = b;
				b = L;
				try {
					return $();
				} finally {
					b = H;
				}
			}),
			(e.unstable_scheduleCallback = function (L, $, H) {
				var ve = e.unstable_now();
				switch (
					(typeof H == "object" && H !== null
						? ((H = H.delay), (H = typeof H == "number" && 0 < H ? ve + H : ve))
						: (H = ve),
					L)
				) {
					case 1:
						var pe = -1;
						break;
					case 2:
						pe = 250;
						break;
					case 5:
						pe = 1073741823;
						break;
					case 4:
						pe = 1e4;
						break;
					default:
						pe = 5e3;
				}
				return (
					(pe = H + pe),
					(L = { id: g++, callback: $, priorityLevel: L, startTime: H, expirationTime: pe, sortIndex: -1 }),
					H > ve
						? ((L.sortIndex = H),
							t(v, L),
							i(m) === null && L === i(v) && (A ? (z(X), (X = -1)) : (A = !0), fe(O, H - ve)))
						: ((L.sortIndex = pe), t(m, L), E || p || ((E = !0), Y || ((Y = !0), le()))),
					L
				);
			}),
			(e.unstable_shouldYield = J),
			(e.unstable_wrapCallback = function (L) {
				var $ = b;
				return function () {
					var H = b;
					b = $;
					try {
						return L.apply(this, arguments);
					} finally {
						b = H;
					}
				};
			}));
	}),
	hT = Ir((e, t) => {
		t.exports = dT();
	}),
	mT = Ir((e) => {
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
		function E(N) {
			return N === null || typeof N != "object"
				? null
				: ((N = (p && N[p]) || N["@@iterator"]), typeof N == "function" ? N : null);
		}
		var A = {
				isMounted: function () {
					return !1;
				},
				enqueueForceUpdate: function () {},
				enqueueReplaceState: function () {},
				enqueueSetState: function () {},
			},
			M = Object.assign,
			q = {};
		function z(N, I, se) {
			((this.props = N), (this.context = I), (this.refs = q), (this.updater = se || A));
		}
		((z.prototype.isReactComponent = {}),
			(z.prototype.setState = function (N, I) {
				if (typeof N != "object" && typeof N != "function" && N != null)
					throw Error(
						"takes an object of state variables to update or a function which returns an object of state variables.",
					);
				this.updater.enqueueSetState(this, N, I, "setState");
			}),
			(z.prototype.forceUpdate = function (N) {
				this.updater.enqueueForceUpdate(this, N, "forceUpdate");
			}));
		function C() {}
		C.prototype = z.prototype;
		function k(N, I, se) {
			((this.props = N), (this.context = I), (this.refs = q), (this.updater = se || A));
		}
		var O = (k.prototype = new C());
		((O.constructor = k), M(O, z.prototype), (O.isPureReactComponent = !0));
		var Y = Array.isArray;
		function X() {}
		var D = { H: null, A: null, T: null, S: null },
			V = Object.prototype.hasOwnProperty;
		function J(N, I, se) {
			var ae = se.ref;
			return { $$typeof: t, type: N, key: I, ref: ae !== void 0 ? ae : null, props: se };
		}
		function W(N, I) {
			return J(N.type, I, N.props);
		}
		function le(N) {
			return typeof N == "object" && N !== null && N.$$typeof === t;
		}
		function oe(N) {
			var I = { "=": "=0", ":": "=2" };
			return (
				"$" +
				N.replace(/[=:]/g, function (se) {
					return I[se];
				})
			);
		}
		var te = /\/+/g;
		function fe(N, I) {
			return typeof N == "object" && N !== null && N.key != null ? oe("" + N.key) : I.toString(36);
		}
		function L(N) {
			switch (N.status) {
				case "fulfilled":
					return N.value;
				case "rejected":
					throw N.reason;
				default:
					switch (
						(typeof N.status == "string"
							? N.then(X, X)
							: ((N.status = "pending"),
								N.then(
									function (I) {
										N.status === "pending" && ((N.status = "fulfilled"), (N.value = I));
									},
									function (I) {
										N.status === "pending" && ((N.status = "rejected"), (N.reason = I));
									},
								)),
						N.status)
					) {
						case "fulfilled":
							return N.value;
						case "rejected":
							throw N.reason;
					}
			}
			throw N;
		}
		function $(N, I, se, ae, be) {
			var Te = typeof N;
			(Te === "undefined" || Te === "boolean") && (N = null);
			var ke = !1;
			if (N === null) ke = !0;
			else
				switch (Te) {
					case "bigint":
					case "string":
					case "number":
						ke = !0;
						break;
					case "object":
						switch (N.$$typeof) {
							case t:
							case i:
								ke = !0;
								break;
							case S:
								return ((ke = N._init), $(ke(N._payload), I, se, ae, be));
						}
				}
			if (ke)
				return (
					(be = be(N)),
					(ke = ae === "" ? "." + fe(N, 0) : ae),
					Y(be)
						? ((se = ""),
							ke != null && (se = ke.replace(te, "$&/") + "/"),
							$(be, I, se, "", function (St) {
								return St;
							}))
						: be != null &&
							(le(be) &&
								(be = W(
									be,
									se + (be.key == null || (N && N.key === be.key) ? "" : ("" + be.key).replace(te, "$&/") + "/") + ke,
								)),
							I.push(be)),
					1
				);
			ke = 0;
			var Ue = ae === "" ? "." : ae + ":";
			if (Y(N))
				for (var Ye = 0; Ye < N.length; Ye++) ((ae = N[Ye]), (Te = Ue + fe(ae, Ye)), (ke += $(ae, I, se, Te, be)));
			else if (((Ye = E(N)), typeof Ye == "function"))
				for (N = Ye.call(N), Ye = 0; !(ae = N.next()).done; )
					((ae = ae.value), (Te = Ue + fe(ae, Ye++)), (ke += $(ae, I, se, Te, be)));
			else if (Te === "object") {
				if (typeof N.then == "function") return $(L(N), I, se, ae, be);
				throw (
					(I = String(N)),
					Error(
						"Objects are not valid as a React child (found: " +
							(I === "[object Object]" ? "object with keys {" + Object.keys(N).join(", ") + "}" : I) +
							"). If you meant to render a collection of children, use an array instead.",
					)
				);
			}
			return ke;
		}
		function H(N, I, se) {
			if (N == null) return N;
			var ae = [],
				be = 0;
			return (
				$(N, ae, "", "", function (Te) {
					return I.call(se, Te, be++);
				}),
				ae
			);
		}
		function ve(N) {
			if (N._status === -1) {
				var I = N._result;
				((I = I()),
					I.then(
						function (se) {
							(N._status === 0 || N._status === -1) && ((N._status = 1), (N._result = se));
						},
						function (se) {
							(N._status === 0 || N._status === -1) && ((N._status = 2), (N._result = se));
						},
					),
					N._status === -1 && ((N._status = 0), (N._result = I)));
			}
			if (N._status === 1) return N._result.default;
			throw N._result;
		}
		var pe =
				typeof reportError == "function"
					? reportError
					: function (N) {
							if (typeof window == "object" && typeof window.ErrorEvent == "function") {
								var I = new window.ErrorEvent("error", {
									bubbles: !0,
									cancelable: !0,
									message:
										typeof N == "object" && N !== null && typeof N.message == "string" ? String(N.message) : String(N),
									error: N,
								});
								if (!window.dispatchEvent(I)) return;
							} else if (typeof process == "object" && typeof process.emit == "function") {
								process.emit("uncaughtException", N);
								return;
							}
							console.error(N);
						},
			Ze = {
				map: H,
				forEach: function (N, I, se) {
					H(
						N,
						function () {
							I.apply(this, arguments);
						},
						se,
					);
				},
				count: function (N) {
					var I = 0;
					return (
						H(N, function () {
							I++;
						}),
						I
					);
				},
				toArray: function (N) {
					return (
						H(N, function (I) {
							return I;
						}) || []
					);
				},
				only: function (N) {
					if (!le(N)) throw Error("React.Children.only expected to receive a single React element child.");
					return N;
				},
			};
		((e.Activity = b),
			(e.Children = Ze),
			(e.Component = z),
			(e.Fragment = u),
			(e.Profiler = o),
			(e.PureComponent = k),
			(e.StrictMode = s),
			(e.Suspense = v),
			(e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = D),
			(e.__COMPILER_RUNTIME = {
				__proto__: null,
				c: function (N) {
					return D.H.useMemoCache(N);
				},
			}),
			(e.cache = function (N) {
				return function () {
					return N.apply(null, arguments);
				};
			}),
			(e.cacheSignal = function () {
				return null;
			}),
			(e.cloneElement = function (N, I, se) {
				if (N == null) throw Error("The argument must be a React element, but you passed " + N + ".");
				var ae = M({}, N.props),
					be = N.key;
				if (I != null)
					for (Te in (I.key !== void 0 && (be = "" + I.key), I))
						!V.call(I, Te) ||
							Te === "key" ||
							Te === "__self" ||
							Te === "__source" ||
							(Te === "ref" && I.ref === void 0) ||
							(ae[Te] = I[Te]);
				var Te = arguments.length - 2;
				if (Te === 1) ae.children = se;
				else if (1 < Te) {
					for (var ke = Array(Te), Ue = 0; Ue < Te; Ue++) ke[Ue] = arguments[Ue + 2];
					ae.children = ke;
				}
				return J(N.type, be, ae);
			}),
			(e.createContext = function (N) {
				return (
					(N = { $$typeof: h, _currentValue: N, _currentValue2: N, _threadCount: 0, Provider: null, Consumer: null }),
					(N.Provider = N),
					(N.Consumer = { $$typeof: f, _context: N }),
					N
				);
			}),
			(e.createElement = function (N, I, se) {
				var ae,
					be = {},
					Te = null;
				if (I != null)
					for (ae in (I.key !== void 0 && (Te = "" + I.key), I))
						V.call(I, ae) && ae !== "key" && ae !== "__self" && ae !== "__source" && (be[ae] = I[ae]);
				var ke = arguments.length - 2;
				if (ke === 1) be.children = se;
				else if (1 < ke) {
					for (var Ue = Array(ke), Ye = 0; Ye < ke; Ye++) Ue[Ye] = arguments[Ye + 2];
					be.children = Ue;
				}
				if (N && N.defaultProps) for (ae in ((ke = N.defaultProps), ke)) be[ae] === void 0 && (be[ae] = ke[ae]);
				return J(N, Te, be);
			}),
			(e.createRef = function () {
				return { current: null };
			}),
			(e.forwardRef = function (N) {
				return { $$typeof: m, render: N };
			}),
			(e.isValidElement = le),
			(e.lazy = function (N) {
				return { $$typeof: S, _payload: { _status: -1, _result: N }, _init: ve };
			}),
			(e.memo = function (N, I) {
				return { $$typeof: g, type: N, compare: I === void 0 ? null : I };
			}),
			(e.startTransition = function (N) {
				var I = D.T,
					se = {};
				D.T = se;
				try {
					var ae = N(),
						be = D.S;
					(be !== null && be(se, ae),
						typeof ae == "object" && ae !== null && typeof ae.then == "function" && ae.then(X, pe));
				} catch (Te) {
					pe(Te);
				} finally {
					(I !== null && se.types !== null && (I.types = se.types), (D.T = I));
				}
			}),
			(e.unstable_useCacheRefresh = function () {
				return D.H.useCacheRefresh();
			}),
			(e.use = function (N) {
				return D.H.use(N);
			}),
			(e.useActionState = function (N, I, se) {
				return D.H.useActionState(N, I, se);
			}),
			(e.useCallback = function (N, I) {
				return D.H.useCallback(N, I);
			}),
			(e.useContext = function (N) {
				return D.H.useContext(N);
			}),
			(e.useDebugValue = function () {}),
			(e.useDeferredValue = function (N, I) {
				return D.H.useDeferredValue(N, I);
			}),
			(e.useEffect = function (N, I) {
				return D.H.useEffect(N, I);
			}),
			(e.useEffectEvent = function (N) {
				return D.H.useEffectEvent(N);
			}),
			(e.useId = function () {
				return D.H.useId();
			}),
			(e.useImperativeHandle = function (N, I, se) {
				return D.H.useImperativeHandle(N, I, se);
			}),
			(e.useInsertionEffect = function (N, I) {
				return D.H.useInsertionEffect(N, I);
			}),
			(e.useLayoutEffect = function (N, I) {
				return D.H.useLayoutEffect(N, I);
			}),
			(e.useMemo = function (N, I) {
				return D.H.useMemo(N, I);
			}),
			(e.useOptimistic = function (N, I) {
				return D.H.useOptimistic(N, I);
			}),
			(e.useReducer = function (N, I, se) {
				return D.H.useReducer(N, I, se);
			}),
			(e.useRef = function (N) {
				return D.H.useRef(N);
			}),
			(e.useState = function (N) {
				return D.H.useState(N);
			}),
			(e.useSyncExternalStore = function (N, I, se) {
				return D.H.useSyncExternalStore(N, I, se);
			}),
			(e.useTransition = function () {
				return D.H.useTransition();
			}),
			(e.version = "19.2.8"));
	}),
	xc = Ir((e, t) => {
		t.exports = mT();
	}),
	vT = Ir((e) => {
		var t = xc();
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
						E = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
					S === "style"
						? s.d.S(v, typeof g.precedence == "string" ? g.precedence : void 0, {
								crossOrigin: b,
								integrity: p,
								fetchPriority: E,
							})
						: S === "script" &&
							s.d.X(v, {
								crossOrigin: b,
								integrity: p,
								fetchPriority: E,
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
	wb = Ir((e, t) => {
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
		(i(), (t.exports = vT()));
	}),
	gT = Ir((e) => {
		var t = hT(),
			i = xc(),
			u = wb();
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
			E = Symbol.for("react.transitional.element"),
			A = Symbol.for("react.portal"),
			M = Symbol.for("react.fragment"),
			q = Symbol.for("react.strict_mode"),
			z = Symbol.for("react.profiler"),
			C = Symbol.for("react.consumer"),
			k = Symbol.for("react.context"),
			O = Symbol.for("react.forward_ref"),
			Y = Symbol.for("react.suspense"),
			X = Symbol.for("react.suspense_list"),
			D = Symbol.for("react.memo"),
			V = Symbol.for("react.lazy"),
			J = Symbol.for("react.activity"),
			W = Symbol.for("react.memo_cache_sentinel"),
			le = Symbol.iterator;
		function oe(n) {
			return n === null || typeof n != "object"
				? null
				: ((n = (le && n[le]) || n["@@iterator"]), typeof n == "function" ? n : null);
		}
		var te = Symbol.for("react.client.reference");
		function fe(n) {
			if (n == null) return null;
			if (typeof n == "function") return n.$$typeof === te ? null : n.displayName || n.name || null;
			if (typeof n == "string") return n;
			switch (n) {
				case M:
					return "Fragment";
				case z:
					return "Profiler";
				case q:
					return "StrictMode";
				case Y:
					return "Suspense";
				case X:
					return "SuspenseList";
				case J:
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
					case O:
						var r = n.render;
						return (
							(n = n.displayName),
							n || ((n = r.displayName || r.name || ""), (n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef")),
							n
						);
					case D:
						return ((r = n.displayName || null), r !== null ? r : fe(n.type) || "Memo");
					case V:
						((r = n._payload), (n = n._init));
						try {
							return fe(n(r));
						} catch {}
				}
			return null;
		}
		var L = Array.isArray,
			$ = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			H = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			ve = { pending: !1, data: null, method: null, action: null },
			pe = [],
			Ze = -1;
		function N(n) {
			return { current: n };
		}
		function I(n) {
			0 > Ze || ((n.current = pe[Ze]), (pe[Ze] = null), Ze--);
		}
		function se(n, r) {
			(Ze++, (pe[Ze] = n.current), (n.current = r));
		}
		var ae = N(null),
			be = N(null),
			Te = N(null),
			ke = N(null);
		function Ue(n, r) {
			switch ((se(Te, r), se(be, n), se(ae, null), r.nodeType)) {
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
			(I(ae), se(ae, n));
		}
		function Ye() {
			(I(ae), I(be), I(Te));
		}
		function St(n) {
			n.memoizedState !== null && se(ke, n);
			var r = ae.current,
				a = Vy(r, n.type);
			r !== a && (se(be, n), se(ae, a));
		}
		function At(n) {
			(be.current === n && (I(ae), I(be)), ke.current === n && (I(ke), (Xl._currentValue = ve)));
		}
		var vn, en;
		function Ge(n) {
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
		var ge = !1;
		function Ce(n, r) {
			if (!n || ge) return "";
			ge = !0;
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
										var F = ee;
									}
									Reflect.construct(n, [], ue);
								} else {
									try {
										ue.call();
									} catch (ee) {
										F = ee;
									}
									n.call(ue.prototype);
								}
							} else {
								try {
									throw Error();
								} catch (ee) {
									F = ee;
								}
								(ue = n()) && typeof ue.catch == "function" && ue.catch(function () {});
							}
						} catch (ee) {
							if (ee && F && typeof ee.stack == "string") return [ee.stack, F.stack];
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
					var j = y.split(`
`),
						K = x.split(`
`);
					for (c = l = 0; l < j.length && !j[l].includes("DetermineComponentFrameRoot"); ) l++;
					for (; c < K.length && !K[c].includes("DetermineComponentFrameRoot"); ) c++;
					if (l === j.length || c === K.length)
						for (l = j.length - 1, c = K.length - 1; 1 <= l && 0 <= c && j[l] !== K[c]; ) c--;
					for (; 1 <= l && 0 <= c; l--, c--)
						if (j[l] !== K[c]) {
							if (l !== 1 || c !== 1)
								do
									if ((l--, c--, 0 > c || j[l] !== K[c])) {
										var ne =
											`
` + j[l].replace(" at new ", " at ");
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
				((ge = !1), (Error.prepareStackTrace = a));
			}
			return (a = n ? n.displayName || n.name : "") ? Ge(a) : "";
		}
		function tt(n, r) {
			switch (n.tag) {
				case 26:
				case 27:
				case 5:
					return Ge(n.type);
				case 16:
					return Ge("Lazy");
				case 13:
					return n.child !== r && r !== null ? Ge("Suspense Fallback") : Ge("Suspense");
				case 19:
					return Ge("SuspenseList");
				case 0:
				case 15:
					return Ce(n.type, !1);
				case 11:
					return Ce(n.type.render, !1);
				case 1:
					return Ce(n.type, !0);
				case 31:
					return Ge("Activity");
				default:
					return "";
			}
		}
		function $e(n) {
			try {
				var r = "",
					a = null;
				do ((r += tt(n, a)), (a = n), (n = n.return));
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
			Je = t.unstable_scheduleCallback,
			ce = t.unstable_cancelCallback,
			ze = t.unstable_shouldYield,
			nt = t.unstable_requestPaint,
			Me = t.unstable_now,
			yt = t.unstable_getCurrentPriorityLevel,
			pn = t.unstable_ImmediatePriority,
			at = t.unstable_UserBlockingPriority,
			Vt = t.unstable_NormalPriority,
			pr = t.unstable_LowPriority,
			Yr = t.unstable_IdlePriority,
			Gr = t.log,
			Pn = t.unstable_setDisableYieldValue,
			kn = null,
			pt = null;
		function tn(n) {
			if ((typeof Gr == "function" && Pn(n), pt && typeof pt.setStrictMode == "function"))
				try {
					pt.setStrictMode(kn, n);
				} catch {}
		}
		var ot = Math.clz32 ? Math.clz32 : _n,
			br = Math.log,
			ar = Math.LN2;
		function _n(n) {
			return ((n >>>= 0), n === 0 ? 32 : (31 - ((br(n) / ar) | 0)) | 0);
		}
		var Zt = 256,
			Ht = 262144,
			Qn = 4194304;
		function Nn(n) {
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
						l !== 0 ? (c = Nn(l)) : ((y &= x), y !== 0 ? (c = Nn(y)) : a || ((a = x & ~n), a !== 0 && (c = Nn(a)))))
					: ((x = l & ~d), x !== 0 ? (c = Nn(x)) : y !== 0 ? (c = Nn(y)) : a || ((a = l & ~n), a !== 0 && (c = Nn(a)))),
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
		function jn(n, r) {
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
				j = n.expirationTimes,
				K = n.hiddenUpdates;
			for (a = y & ~a; 0 < a; ) {
				var ne = 31 - ot(a),
					ue = 1 << ne;
				((x[ne] = 0), (j[ne] = -1));
				var F = K[ne];
				if (F !== null)
					for (K[ne] = null, ne = 0; ne < F.length; ne++) {
						var ee = F[ne];
						ee !== null && (ee.lane &= -536870913);
					}
				a &= ~ue;
			}
			(l !== 0 && Lt(n, l, 0), d !== 0 && c === 0 && n.tag !== 0 && (n.suspendedLanes |= d & ~(y & ~r)));
		}
		function Lt(n, r, a) {
			((n.pendingLanes |= r), (n.suspendedLanes &= ~r));
			var l = 31 - ot(r);
			((n.entangledLanes |= r), (n.entanglements[l] = n.entanglements[l] | 1073741824 | (a & 261930)));
		}
		function Qt(n, r) {
			var a = (n.entangledLanes |= r);
			for (n = n.entanglements; a; ) {
				var l = 31 - ot(a),
					c = 1 << l;
				((c & r) | (n[l] & r) && (n[l] |= r), (a &= ~c));
			}
		}
		function Sa(n, r) {
			var a = r & -r;
			return ((a = (a & 42) !== 0 ? 1 : In(a)), (a & (n.suspendedLanes | r)) !== 0 ? 0 : a);
		}
		function In(n) {
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
			var n = H.p;
			return n !== 0 ? n : ((n = window.event), n === void 0 ? 32 : op(n.type));
		}
		function wa(n, r) {
			var a = H.p;
			try {
				return ((H.p = n), r());
			} finally {
				H.p = a;
			}
		}
		var qt = Math.random().toString(36).slice(2),
			Dt = "__reactFiber$" + qt,
			rn = "__reactProps$" + qt,
			wr = "__reactContainer$" + qt,
			qr = "__reactEvents$" + qt,
			Er = "__reactListeners$" + qt,
			li = "__reactHandles$" + qt,
			qi = "__reactResources$" + qt,
			Kn = "__reactMarker$" + qt;
		function Ui(n) {
			(delete n[Dt], delete n[rn], delete n[qr], delete n[Er], delete n[li]);
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
		function Mn(n) {
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
			G = {};
		function me(n, r) {
			(we(n, r), we(n + "Capture", r));
		}
		function we(n, r) {
			for (G[n] = r, n = 0; n < r.length; n++) Ea.add(r[n]);
		}
		var je = RegExp(
				"^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
			),
			He = {},
			Ct = {};
		function bt(n) {
			return Bt.call(Ct, n) ? !0 : Bt.call(He, n) ? !1 : je.test(n) ? (Ct[n] = !0) : ((He[n] = !0), !1);
		}
		function dt(n, r, a) {
			if (bt(r))
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
		function Ln(n) {
			if (!n) return !1;
			var r = n._valueTracker;
			if (!r) return !0;
			var a = r.getValue(),
				l = "";
			return (n && (l = $i(n) ? (n.checked ? "true" : "false") : n.value), (n = l), n !== a ? (r.setValue(n), !0) : !1);
		}
		function Fr(n) {
			if (((n = n || (typeof document < "u" ? document : void 0)), typeof n > "u")) return null;
			try {
				return n.activeElement || n.body;
			} catch {
				return n.body;
			}
		}
		var ll = /[\n"\\]/g;
		function wn(n) {
			return n.replace(ll, function (r) {
				return "\\" + r.charCodeAt(0).toString(16) + " ";
			});
		}
		function sl(n, r, a, l, c, d, y, x) {
			((n.name = ""),
				y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean"
					? (n.type = y)
					: n.removeAttribute("type"),
				r != null
					? y === "number"
						? ((r === 0 && n.value === "") || n.value != r) && (n.value = "" + Yt(r))
						: n.value !== "" + Yt(r) && (n.value = "" + Yt(r))
					: (y !== "submit" && y !== "reset") || n.removeAttribute("value"),
				r != null ? ol(n, y, Yt(r)) : a != null ? ol(n, y, Yt(a)) : l != null && n.removeAttribute("value"),
				c == null && d != null && (n.defaultChecked = !!d),
				c != null && (n.checked = c && typeof c != "function" && typeof c != "symbol"),
				x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean"
					? (n.name = "" + Yt(x))
					: n.removeAttribute("name"));
		}
		function zs(n, r, a, l, c, d, y, x) {
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
		function ol(n, r, a) {
			(r === "number" && Fr(n.ownerDocument) === n) || n.defaultValue === "" + a || (n.defaultValue = "" + a);
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
		function qn(n, r, a) {
			if (r != null && ((r = "" + Yt(r)), r !== n.value && (n.value = r), a == null)) {
				n.defaultValue !== r && (n.defaultValue = r);
				return;
			}
			n.defaultValue = a != null ? "" + Yt(a) : "";
		}
		function cl(n, r, a, l) {
			if (r == null) {
				if (l != null) {
					if (a != null) throw Error(s(92));
					if (L(l)) {
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
		var Ds = new Set(
			"animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
				" ",
			),
		);
		function js(n, r, a) {
			var l = r.indexOf("--") === 0;
			a == null || typeof a == "boolean" || a === ""
				? l
					? n.setProperty(r, "")
					: r === "float"
						? (n.cssFloat = "")
						: (n[r] = "")
				: l
					? n.setProperty(r, a)
					: typeof a != "number" || a === 0 || Ds.has(r)
						? r === "float"
							? (n.cssFloat = a)
							: (n[r] = ("" + a).trim())
						: (n[r] = a + "px");
		}
		function fl(n, r, a) {
			if (r != null && typeof r != "object") throw Error(s(62));
			if (((n = n.style), a != null)) {
				for (var l in a)
					!a.hasOwnProperty(l) ||
						(r != null && r.hasOwnProperty(l)) ||
						(l.indexOf("--") === 0 ? n.setProperty(l, "") : l === "float" ? (n.cssFloat = "") : (n[l] = ""));
				for (var c in r) ((l = r[c]), r.hasOwnProperty(c) && a[c] !== l && js(n, c, l));
			} else for (var d in r) r.hasOwnProperty(d) && js(n, d, r[d]);
		}
		function dl(n) {
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
		var Is = new Map([
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
			Jc =
				/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
		function Ta(n) {
			return Jc.test("" + n)
				? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
				: n;
		}
		function On() {}
		var hl = null;
		function Un(n) {
			return (
				(n = n.target || n.srcElement || window),
				n.correspondingUseElement && (n = n.correspondingUseElement),
				n.nodeType === 3 ? n.parentNode : n
			);
		}
		var Bi = null,
			Vr = null;
		function ml(n) {
			var r = Yn(n);
			if (r && (n = r.stateNode)) {
				var a = n[rn] || null;
				e: switch (((n = r.stateNode), r.type)) {
					case "input":
						if (
							(sl(n, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name),
							(r = a.name),
							a.type === "radio" && r != null)
						) {
							for (a = n; a.parentNode; ) a = a.parentNode;
							for (a = a.querySelectorAll('input[name="' + wn("" + r) + '"][type="radio"]'), r = 0; r < a.length; r++) {
								var l = a[r];
								if (l !== n && l.form === n.form) {
									var c = l[rn] || null;
									if (!c) throw Error(s(90));
									sl(l, c.value, c.defaultValue, c.defaultValue, c.checked, c.defaultChecked, c.type, c.name);
								}
							}
							for (r = 0; r < a.length; r++) ((l = a[r]), l.form === n.form && Ln(l));
						}
						break e;
					case "textarea":
						qn(n, a.value, a.defaultValue);
						break e;
					case "select":
						((r = a.value), r != null && $r(n, !!a.multiple, r, !1));
				}
			}
		}
		var xa = !1;
		function uu(n, r, a) {
			if (xa) return n(r, a);
			xa = !0;
			try {
				return n(r);
			} finally {
				if (((xa = !1), (Bi !== null || Vr !== null) && (_o(), Bi && ((r = Bi), (n = Vr), (Vr = Bi = null), ml(r), n))))
					for (r = 0; r < n.length; r++) ml(n[r]);
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
		var T = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
			R = !1;
		if (T)
			try {
				var B = {};
				(Object.defineProperty(B, "passive", {
					get: function () {
						R = !0;
					},
				}),
					window.addEventListener("test", B, B),
					window.removeEventListener("test", B, B));
			} catch {
				R = !1;
			}
		var P = null,
			de = null,
			he = null;
		function ye() {
			if (he) return he;
			var n,
				r = de,
				a = r.length,
				l,
				c = "value" in P ? P.value : P.textContent,
				d = c.length;
			for (n = 0; n < a && r[n] === c[n]; n++);
			var y = a - n;
			for (l = 1; l <= y && r[a - l] === c[d - l]; l++);
			return (he = c.slice(n, 1 < l ? 1 - l : void 0));
		}
		function Re(n) {
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
		function wt() {
			return !1;
		}
		function We(n) {
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
						: wt),
					(this.isPropagationStopped = wt),
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
			ut = We(Oe),
			$n = b({}, Oe, { view: 0, detail: 0 }),
			vl = We($n),
			lu,
			gl,
			yl,
			Ls = b({}, $n, {
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
				getModifierState: ef,
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
						: (n !== yl &&
								(yl && n.type === "mousemove"
									? ((lu = n.screenX - yl.screenX), (gl = n.screenY - yl.screenY))
									: (gl = lu = 0),
								(yl = n)),
							lu);
				},
				movementY: function (n) {
					return "movementY" in n ? n.movementY : gl;
				},
			}),
			Qm = We(Ls),
			OS = We(b({}, Ls, { dataTransfer: 0 })),
			Wc = We(b({}, $n, { relatedTarget: 0 })),
			zS = We(b({}, Oe, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
			DS = We(
				b({}, Oe, {
					clipboardData: function (n) {
						return "clipboardData" in n ? n.clipboardData : window.clipboardData;
					},
				}),
			),
			Km = We(b({}, Oe, { data: 0 })),
			jS = {
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
			IS = {
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
			LS = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
		function qS(n) {
			var r = this.nativeEvent;
			return r.getModifierState ? r.getModifierState(n) : (n = LS[n]) ? !!r[n] : !1;
		}
		function ef() {
			return qS;
		}
		var US = We(
				b({}, $n, {
					key: function (n) {
						if (n.key) {
							var r = jS[n.key] || n.key;
							if (r !== "Unidentified") return r;
						}
						return n.type === "keypress"
							? ((n = Re(n)), n === 13 ? "Enter" : String.fromCharCode(n))
							: n.type === "keydown" || n.type === "keyup"
								? IS[n.keyCode] || "Unidentified"
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
					getModifierState: ef,
					charCode: function (n) {
						return n.type === "keypress" ? Re(n) : 0;
					},
					keyCode: function (n) {
						return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
					},
					which: function (n) {
						return n.type === "keypress" ? Re(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
					},
				}),
			),
			Ym = We(
				b({}, Ls, {
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
			$S = We(
				b({}, $n, {
					touches: 0,
					targetTouches: 0,
					changedTouches: 0,
					altKey: 0,
					metaKey: 0,
					ctrlKey: 0,
					shiftKey: 0,
					getModifierState: ef,
				}),
			),
			BS = We(b({}, Oe, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
			VS = We(
				b({}, Ls, {
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
			ZS = We(b({}, Oe, { newState: 0, oldState: 0 })),
			HS = [9, 13, 27, 32],
			tf = T && "CompositionEvent" in window,
			pl = null;
		T && "documentMode" in document && (pl = document.documentMode);
		var PS = T && "TextEvent" in window && !pl,
			Gm = T && (!tf || (pl && 8 < pl && 11 >= pl)),
			Fm = " ",
			Xm = !1;
		function Jm(n, r) {
			switch (n) {
				case "keyup":
					return HS.indexOf(r.keyCode) !== -1;
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
		var su = !1;
		function QS(n, r) {
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
		function KS(n, r) {
			if (su)
				return n === "compositionend" || (!tf && Jm(n, r)) ? ((n = ye()), (he = de = P = null), (su = !1), n) : null;
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
		var YS = {
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
			return r === "input" ? !!YS[n.type] : r === "textarea";
		}
		function tv(n, r, a, l) {
			(Bi ? (Vr ? Vr.push(l) : (Vr = [l])) : (Bi = l),
				(r = Ro(r, "onChange")),
				0 < r.length && ((a = new ut("onChange", "change", null, a, l)), n.push({ event: a, listeners: r })));
		}
		var bl = null,
			_l = null;
		function GS(n) {
			Dy(n, 0);
		}
		function qs(n) {
			if (Ln(Mn(n))) return n;
		}
		function nv(n, r) {
			if (n === "change") return r;
		}
		var rv = !1;
		if (T) {
			var nf;
			if (T) {
				var rf = "oninput" in document;
				if (!rf) {
					var iv = document.createElement("div");
					(iv.setAttribute("oninput", "return;"), (rf = typeof iv.oninput == "function"));
				}
				nf = rf;
			} else nf = !1;
			rv = nf && (!document.documentMode || 9 < document.documentMode);
		}
		function av() {
			bl && (bl.detachEvent("onpropertychange", uv), (_l = bl = null));
		}
		function uv(n) {
			if (n.propertyName === "value" && qs(_l)) {
				var r = [];
				(tv(r, _l, n, Un(n)), uu(GS, r));
			}
		}
		function FS(n, r, a) {
			n === "focusin" ? (av(), (bl = r), (_l = a), bl.attachEvent("onpropertychange", uv)) : n === "focusout" && av();
		}
		function XS(n) {
			if (n === "selectionchange" || n === "keyup" || n === "keydown") return qs(_l);
		}
		function JS(n, r) {
			if (n === "click") return qs(r);
		}
		function WS(n, r) {
			if (n === "input" || n === "change") return qs(r);
		}
		function ew(n, r) {
			return (n === r && (n !== 0 || 1 / n === 1 / r)) || (n !== n && r !== r);
		}
		var or = typeof Object.is == "function" ? Object.is : ew;
		function Sl(n, r) {
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
			for (var r = Fr(n.document); r instanceof n.HTMLIFrameElement; ) {
				try {
					var a = typeof r.contentWindow.location.href == "string";
				} catch {
					a = !1;
				}
				if (a) n = r.contentWindow;
				else break;
				r = Fr(n.document);
			}
			return r;
		}
		function af(n) {
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
		var tw = T && "documentMode" in document && 11 >= document.documentMode,
			ou = null,
			uf = null,
			wl = null,
			lf = !1;
		function fv(n, r, a) {
			var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
			lf ||
				ou == null ||
				ou !== Fr(l) ||
				((l = ou),
				"selectionStart" in l && af(l)
					? (l = { start: l.selectionStart, end: l.selectionEnd })
					: ((l = ((l.ownerDocument && l.ownerDocument.defaultView) || window).getSelection()),
						(l = {
							anchorNode: l.anchorNode,
							anchorOffset: l.anchorOffset,
							focusNode: l.focusNode,
							focusOffset: l.focusOffset,
						})),
				(wl && Sl(wl, l)) ||
					((wl = l),
					(l = Ro(uf, "onSelect")),
					0 < l.length &&
						((r = new ut("onSelect", "select", null, r, a)), n.push({ event: r, listeners: l }), (r.target = ou))));
		}
		function Aa(n, r) {
			var a = {};
			return ((a[n.toLowerCase()] = r.toLowerCase()), (a["Webkit" + n] = "webkit" + r), (a["Moz" + n] = "moz" + r), a);
		}
		var cu = {
				animationend: Aa("Animation", "AnimationEnd"),
				animationiteration: Aa("Animation", "AnimationIteration"),
				animationstart: Aa("Animation", "AnimationStart"),
				transitionrun: Aa("Transition", "TransitionRun"),
				transitionstart: Aa("Transition", "TransitionStart"),
				transitioncancel: Aa("Transition", "TransitionCancel"),
				transitionend: Aa("Transition", "TransitionEnd"),
			},
			sf = {},
			dv = {};
		T &&
			((dv = document.createElement("div").style),
			"AnimationEvent" in window ||
				(delete cu.animationend.animation, delete cu.animationiteration.animation, delete cu.animationstart.animation),
			"TransitionEvent" in window || delete cu.transitionend.transition);
		function Ra(n) {
			if (sf[n]) return sf[n];
			if (!cu[n]) return n;
			var r = cu[n],
				a;
			for (a in r) if (r.hasOwnProperty(a) && a in dv) return (sf[n] = r[a]);
			return n;
		}
		var hv = Ra("animationend"),
			mv = Ra("animationiteration"),
			vv = Ra("animationstart"),
			nw = Ra("transitionrun"),
			rw = Ra("transitionstart"),
			iw = Ra("transitioncancel"),
			gv = Ra("transitionend"),
			yv = new Map(),
			of =
				"abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
					" ",
				);
		of.push("scrollEnd");
		function Zr(n, r) {
			(yv.set(n, r), me(r, [n]));
		}
		var Us =
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
			fu = 0,
			cf = 0;
		function $s() {
			for (var n = fu, r = (cf = fu = 0); r < n; ) {
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
		function Bs(n, r, a, l) {
			((xr[fu++] = n),
				(xr[fu++] = r),
				(xr[fu++] = a),
				(xr[fu++] = l),
				(cf |= l),
				(n.lanes |= l),
				(n = n.alternate),
				n !== null && (n.lanes |= l));
		}
		function ff(n, r, a, l) {
			return (Bs(n, r, a, l), Vs(n));
		}
		function Ca(n, r) {
			return (Bs(n, null, null, r), Vs(n));
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
						((c = 31 - ot(a)),
						(n = d.hiddenUpdates),
						(l = n[c]),
						l === null ? (n[c] = [r]) : l.push(r),
						(r.lane = a | 536870912)),
					d)
				: null;
		}
		function Vs(n) {
			if (50 < Hl) throw ((Hl = 0), (_d = null), Error(s(185)));
			for (var r = n.return; r !== null; ) ((n = r), (r = n.return));
			return n.tag === 3 ? n.stateNode : null;
		}
		var du = {};
		function aw(n, r, a, l) {
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
			return new aw(n, r, a, l);
		}
		function df(n) {
			return ((n = n.prototype), !(!n || !n.isReactComponent));
		}
		function si(n, r) {
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
			if (((l = n), typeof n == "function")) df(n) && (y = 1);
			else if (typeof n == "string")
				y = f1(n, a, ae.current) ? 26 : n === "html" || n === "head" || n === "body" ? 27 : 5;
			else
				e: switch (n) {
					case J:
						return ((n = cr(31, a, r, c)), (n.elementType = J), (n.lanes = d), n);
					case M:
						return ka(a.children, c, d, r);
					case q:
						((y = 8), (c |= 24));
						break;
					case z:
						return ((n = cr(12, a, r, c | 2)), (n.elementType = z), (n.lanes = d), n);
					case Y:
						return ((n = cr(13, a, r, c)), (n.elementType = Y), (n.lanes = d), n);
					case X:
						return ((n = cr(19, a, r, c)), (n.elementType = X), (n.lanes = d), n);
					default:
						if (typeof n == "object" && n !== null)
							switch (n.$$typeof) {
								case k:
									y = 10;
									break e;
								case C:
									y = 9;
									break e;
								case O:
									y = 11;
									break e;
								case D:
									y = 14;
									break e;
								case V:
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
		function hf(n, r, a) {
			return ((n = cr(6, n, null, r)), (n.lanes = a), n);
		}
		function _v(n) {
			var r = cr(18, null, null, 0);
			return ((r.stateNode = n), r);
		}
		function mf(n, r, a) {
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
				return a !== void 0 ? a : ((r = { value: n, source: r, stack: $e(r) }), Sv.set(n, r), r);
			}
			return { value: n, source: r, stack: $e(r) };
		}
		var hu = [],
			mu = 0,
			Hs = null,
			El = 0,
			Rr = [],
			Cr = 0,
			Zi = null,
			Xr = 1,
			Jr = "";
		function oi(n, r) {
			((hu[mu++] = El), (hu[mu++] = Hs), (Hs = n), (El = r));
		}
		function wv(n, r, a) {
			((Rr[Cr++] = Xr), (Rr[Cr++] = Jr), (Rr[Cr++] = Zi), (Zi = n));
			var l = Xr;
			n = Jr;
			var c = 32 - ot(l) - 1;
			((l &= ~(1 << c)), (a += 1));
			var d = 32 - ot(r) + c;
			if (30 < d) {
				var y = c - (c % 5);
				((d = (l & ((1 << y) - 1)).toString(32)),
					(l >>= y),
					(c -= y),
					(Xr = (1 << (32 - ot(r) + c)) | (a << c) | l),
					(Jr = d + n));
			} else ((Xr = (1 << d) | (a << c) | l), (Jr = n));
		}
		function vf(n) {
			n.return !== null && (oi(n, 1), wv(n, 1, 0));
		}
		function gf(n) {
			for (; n === Hs; ) ((Hs = hu[--mu]), (hu[mu] = null), (El = hu[--mu]), (hu[mu] = null));
			for (; n === Zi; )
				((Zi = Rr[--Cr]), (Rr[Cr] = null), (Jr = Rr[--Cr]), (Rr[Cr] = null), (Xr = Rr[--Cr]), (Rr[Cr] = null));
		}
		function Ev(n, r) {
			((Rr[Cr++] = Xr), (Rr[Cr++] = Jr), (Rr[Cr++] = Zi), (Xr = r.id), (Jr = r.overflow), (Zi = n));
		}
		var En = null,
			Et = null,
			Fe = !1,
			Hi = null,
			kr = !1,
			yf = Error(s(519));
		function Pi(n) {
			throw (
				Tl(Ar(Error(s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), n)),
				yf
			);
		}
		function Tv(n) {
			var r = n.stateNode,
				a = n.type,
				l = n.memoizedProps;
			switch (((r[Dt] = n), (r[rn] = l), a)) {
				case "dialog":
					(Ve("cancel", r), Ve("close", r));
					break;
				case "iframe":
				case "object":
				case "embed":
					Ve("load", r);
					break;
				case "video":
				case "audio":
					for (a = 0; a < Ql.length; a++) Ve(Ql[a], r);
					break;
				case "source":
					Ve("error", r);
					break;
				case "img":
				case "image":
				case "link":
					(Ve("error", r), Ve("load", r));
					break;
				case "details":
					Ve("toggle", r);
					break;
				case "input":
					(Ve("invalid", r), zs(r, l.value, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name, !0));
					break;
				case "select":
					Ve("invalid", r);
					break;
				case "textarea":
					(Ve("invalid", r), cl(r, l.value, l.defaultValue, l.children));
			}
			((a = l.children),
				(typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
				r.textContent === "" + a ||
				l.suppressHydrationWarning === !0 ||
				Uy(r.textContent, a)
					? (l.popover != null && (Ve("beforetoggle", r), Ve("toggle", r)),
						l.onScroll != null && Ve("scroll", r),
						l.onScrollEnd != null && Ve("scrollend", r),
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
		function vu(n) {
			if (n !== En) return !1;
			if (!Fe) return (xv(n), (Fe = !0), !1);
			var r = n.tag,
				a;
			if (
				((a = r !== 3 && r !== 27) &&
					((a = r === 5) && ((a = n.type), (a = !(a !== "form" && a !== "button") || Dd(n.type, n.memoizedProps))),
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
					? ((r = Et), ra(n.type) ? ((n = Ud), (Ud = null), (Et = n)) : (Et = r))
					: (Et = En ? Or(n.stateNode.nextSibling) : null);
			return !0;
		}
		function Na() {
			((Et = En = null), (Fe = !1));
		}
		function pf() {
			var n = Hi;
			return (n !== null && (Wn === null ? (Wn = n) : Wn.push.apply(Wn, n), (Hi = null)), n);
		}
		function Tl(n) {
			Hi === null ? (Hi = [n]) : Hi.push(n);
		}
		var bf = N(null),
			Ma = null,
			ci = null;
		function Qi(n, r, a) {
			(se(bf, r._currentValue), (r._currentValue = a));
		}
		function fi(n) {
			((n._currentValue = bf.current), I(bf));
		}
		function _f(n, r, a) {
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
		function Sf(n, r, a, l) {
			var c = n.child;
			for (c !== null && (c.return = n); c !== null; ) {
				var d = c.dependencies;
				if (d !== null) {
					var y = c.child;
					d = d.firstContext;
					e: for (; d !== null; ) {
						var x = d;
						d = c;
						for (var j = 0; j < r.length; j++)
							if (x.context === r[j]) {
								((d.lanes |= a), (x = d.alternate), x !== null && (x.lanes |= a), _f(d.return, a, n), l || (y = null));
								break e;
							}
						d = x.next;
					}
				} else if (c.tag === 18) {
					if (((y = c.return), y === null)) throw Error(s(341));
					((y.lanes |= a), (d = y.alternate), d !== null && (d.lanes |= a), _f(y, a, n), (y = null));
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
		function gu(n, r, a, l) {
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
				} else if (c === ke.current) {
					if (((y = c.alternate), y === null)) throw Error(s(387));
					y.memoizedState.memoizedState !== c.memoizedState.memoizedState && (n !== null ? n.push(Xl) : (n = [Xl]));
				}
				c = c.return;
			}
			(n !== null && Sf(r, n, a, l), (r.flags |= 262144));
		}
		function Ps(n) {
			for (n = n.firstContext; n !== null; ) {
				if (!or(n.context._currentValue, n.memoizedValue)) return !0;
				n = n.next;
			}
			return !1;
		}
		function Oa(n) {
			((Ma = n), (ci = null), (n = n.dependencies), n !== null && (n.firstContext = null));
		}
		function Tn(n) {
			return Av(Ma, n);
		}
		function Qs(n, r) {
			return (Ma === null && Oa(n), Av(n, r));
		}
		function Av(n, r) {
			var a = r._currentValue;
			if (((r = { context: r, memoizedValue: a, next: null }), ci === null)) {
				if (n === null) throw Error(s(308));
				((ci = r), (n.dependencies = { lanes: 0, firstContext: r }), (n.flags |= 524288));
			} else ci = ci.next = r;
			return a;
		}
		var uw =
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
			lw = t.unstable_scheduleCallback,
			sw = t.unstable_NormalPriority,
			un = { $$typeof: k, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
		function wf() {
			return { controller: new uw(), data: new Map(), refCount: 0 };
		}
		function xl(n) {
			(n.refCount--,
				n.refCount === 0 &&
					lw(sw, function () {
						n.controller.abort();
					}));
		}
		var Al = null,
			Ef = 0,
			yu = 0,
			pu = null;
		function ow(n, r) {
			if (Al === null) {
				var a = (Al = []);
				((Ef = 0),
					(yu = Ad()),
					(pu = {
						status: "pending",
						value: void 0,
						then: function (l) {
							a.push(l);
						},
					}));
			}
			return (Ef++, r.then(Rv, Rv), r);
		}
		function Rv() {
			if (--Ef === 0 && Al !== null) {
				pu !== null && (pu.status = "fulfilled");
				var n = Al;
				((Al = null), (yu = 0), (pu = null));
				for (var r = 0; r < n.length; r++) (0, n[r])();
			}
		}
		function cw(n, r) {
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
		var Cv = $.S;
		$.S = function (n, r) {
			((sy = Me()),
				typeof r == "object" && r !== null && typeof r.then == "function" && ow(n, r),
				Cv !== null && Cv(n, r));
		};
		var za = N(null);
		function Tf() {
			var n = za.current;
			return n !== null ? n : _t.pooledCache;
		}
		function Ks(n, r) {
			r === null ? se(za, za.current) : se(za, r.pool);
		}
		function kv() {
			var n = Tf();
			return n === null ? null : { parent: un._currentValue, pool: n };
		}
		var bu = Error(s(460)),
			xf = Error(s(474)),
			Ys = Error(s(542)),
			Gs = { then: function () {} };
		function Nv(n) {
			return ((n = n.status), n === "fulfilled" || n === "rejected");
		}
		function Mv(n, r, a) {
			switch (((a = n[a]), a === void 0 ? n.push(r) : a !== r && (r.then(On, On), (r = a)), r.status)) {
				case "fulfilled":
					return r.value;
				case "rejected":
					throw ((n = r.reason), zv(n), n);
				default:
					if (typeof r.status == "string") r.then(On, On);
					else {
						if (((n = _t), n !== null && 100 < n.shellSuspendCounter)) throw Error(s(482));
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
					throw ((ja = r), bu);
			}
		}
		function Da(n) {
			try {
				var r = n._init;
				return r(n._payload);
			} catch (a) {
				throw a !== null && typeof a == "object" && typeof a.then == "function" ? ((ja = a), bu) : a;
			}
		}
		var ja = null;
		function Ov() {
			if (ja === null) throw Error(s(459));
			var n = ja;
			return ((ja = null), n);
		}
		function zv(n) {
			if (n === bu || n === Ys) throw Error(s(483));
		}
		var _u = null,
			Rl = 0;
		function Fs(n) {
			var r = Rl;
			return ((Rl += 1), _u === null && (_u = []), Mv(_u, n, r));
		}
		function Cl(n, r) {
			((r = r.props.ref), (n.ref = r !== void 0 ? r : null));
		}
		function Xs(n, r) {
			throw r.$$typeof === p
				? Error(s(525))
				: ((n = Object.prototype.toString.call(r)),
					Error(s(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n)));
		}
		function Dv(n) {
			function r(Z, U) {
				if (n) {
					var Q = Z.deletions;
					Q === null ? ((Z.deletions = [U]), (Z.flags |= 16)) : Q.push(U);
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
				return ((Z = si(Z, U)), (Z.index = 0), (Z.sibling = null), Z);
			}
			function d(Z, U, Q) {
				return (
					(Z.index = Q),
					n
						? ((Q = Z.alternate),
							Q !== null ? ((Q = Q.index), Q < U ? ((Z.flags |= 67108866), U) : Q) : ((Z.flags |= 67108866), U))
						: ((Z.flags |= 1048576), U)
				);
			}
			function y(Z) {
				return (n && Z.alternate === null && (Z.flags |= 67108866), Z);
			}
			function x(Z, U, Q, ie) {
				return U === null || U.tag !== 6
					? ((U = hf(Q, Z.mode, ie)), (U.return = Z), U)
					: ((U = c(U, Q)), (U.return = Z), U);
			}
			function j(Z, U, Q, ie) {
				var Ae = Q.type;
				return Ae === M
					? ne(Z, U, Q.props.children, ie, Q.key)
					: U !== null &&
						  (U.elementType === Ae || (typeof Ae == "object" && Ae !== null && Ae.$$typeof === V && Da(Ae) === U.type))
						? ((U = c(U, Q.props)), Cl(U, Q), (U.return = Z), U)
						: ((U = Zs(Q.type, Q.key, Q.props, null, Z.mode, ie)), Cl(U, Q), (U.return = Z), U);
			}
			function K(Z, U, Q, ie) {
				return U === null ||
					U.tag !== 4 ||
					U.stateNode.containerInfo !== Q.containerInfo ||
					U.stateNode.implementation !== Q.implementation
					? ((U = mf(Q, Z.mode, ie)), (U.return = Z), U)
					: ((U = c(U, Q.children || [])), (U.return = Z), U);
			}
			function ne(Z, U, Q, ie, Ae) {
				return U === null || U.tag !== 7
					? ((U = ka(Q, Z.mode, ie, Ae)), (U.return = Z), U)
					: ((U = c(U, Q)), (U.return = Z), U);
			}
			function ue(Z, U, Q) {
				if ((typeof U == "string" && U !== "") || typeof U == "number" || typeof U == "bigint")
					return ((U = hf("" + U, Z.mode, Q)), (U.return = Z), U);
				if (typeof U == "object" && U !== null) {
					switch (U.$$typeof) {
						case E:
							return ((Q = Zs(U.type, U.key, U.props, null, Z.mode, Q)), Cl(Q, U), (Q.return = Z), Q);
						case A:
							return ((U = mf(U, Z.mode, Q)), (U.return = Z), U);
						case V:
							return ((U = Da(U)), ue(Z, U, Q));
					}
					if (L(U) || oe(U)) return ((U = ka(U, Z.mode, Q, null)), (U.return = Z), U);
					if (typeof U.then == "function") return ue(Z, Fs(U), Q);
					if (U.$$typeof === k) return ue(Z, Qs(Z, U), Q);
					Xs(Z, U);
				}
				return null;
			}
			function F(Z, U, Q, ie) {
				var Ae = U !== null ? U.key : null;
				if ((typeof Q == "string" && Q !== "") || typeof Q == "number" || typeof Q == "bigint")
					return Ae !== null ? null : x(Z, U, "" + Q, ie);
				if (typeof Q == "object" && Q !== null) {
					switch (Q.$$typeof) {
						case E:
							return Q.key === Ae ? j(Z, U, Q, ie) : null;
						case A:
							return Q.key === Ae ? K(Z, U, Q, ie) : null;
						case V:
							return ((Q = Da(Q)), F(Z, U, Q, ie));
					}
					if (L(Q) || oe(Q)) return Ae !== null ? null : ne(Z, U, Q, ie, null);
					if (typeof Q.then == "function") return F(Z, U, Fs(Q), ie);
					if (Q.$$typeof === k) return F(Z, U, Qs(Z, Q), ie);
					Xs(Z, Q);
				}
				return null;
			}
			function ee(Z, U, Q, ie, Ae) {
				if ((typeof ie == "string" && ie !== "") || typeof ie == "number" || typeof ie == "bigint")
					return ((Z = Z.get(Q) || null), x(U, Z, "" + ie, Ae));
				if (typeof ie == "object" && ie !== null) {
					switch (ie.$$typeof) {
						case E:
							return ((Z = Z.get(ie.key === null ? Q : ie.key) || null), j(U, Z, ie, Ae));
						case A:
							return ((Z = Z.get(ie.key === null ? Q : ie.key) || null), K(U, Z, ie, Ae));
						case V:
							return ((ie = Da(ie)), ee(Z, U, Q, ie, Ae));
					}
					if (L(ie) || oe(ie)) return ((Z = Z.get(Q) || null), ne(U, Z, ie, Ae, null));
					if (typeof ie.then == "function") return ee(Z, U, Q, Fs(ie), Ae);
					if (ie.$$typeof === k) return ee(Z, U, Q, Qs(U, ie), Ae);
					Xs(U, ie);
				}
				return null;
			}
			function _e(Z, U, Q, ie) {
				for (var Ae = null, rt = null, Se = U, qe = (U = 0), Qe = null; Se !== null && qe < Q.length; qe++) {
					Se.index > qe ? ((Qe = Se), (Se = null)) : (Qe = Se.sibling);
					var it = F(Z, Se, Q[qe], ie);
					if (it === null) {
						Se === null && (Se = Qe);
						break;
					}
					(n && Se && it.alternate === null && r(Z, Se),
						(U = d(it, U, qe)),
						rt === null ? (Ae = it) : (rt.sibling = it),
						(rt = it),
						(Se = Qe));
				}
				if (qe === Q.length) return (a(Z, Se), Fe && oi(Z, qe), Ae);
				if (Se === null) {
					for (; qe < Q.length; qe++)
						((Se = ue(Z, Q[qe], ie)),
							Se !== null && ((U = d(Se, U, qe)), rt === null ? (Ae = Se) : (rt.sibling = Se), (rt = Se)));
					return (Fe && oi(Z, qe), Ae);
				}
				for (Se = l(Se); qe < Q.length; qe++)
					((Qe = ee(Se, Z, qe, Q[qe], ie)),
						Qe !== null &&
							(n && Qe.alternate !== null && Se.delete(Qe.key === null ? qe : Qe.key),
							(U = d(Qe, U, qe)),
							rt === null ? (Ae = Qe) : (rt.sibling = Qe),
							(rt = Qe)));
				return (
					n &&
						Se.forEach(function (sa) {
							return r(Z, sa);
						}),
					Fe && oi(Z, qe),
					Ae
				);
			}
			function Ne(Z, U, Q, ie) {
				if (Q == null) throw Error(s(151));
				for (
					var Ae = null, rt = null, Se = U, qe = (U = 0), Qe = null, it = Q.next();
					Se !== null && !it.done;
					qe++, it = Q.next()
				) {
					Se.index > qe ? ((Qe = Se), (Se = null)) : (Qe = Se.sibling);
					var sa = F(Z, Se, it.value, ie);
					if (sa === null) {
						Se === null && (Se = Qe);
						break;
					}
					(n && Se && sa.alternate === null && r(Z, Se),
						(U = d(sa, U, qe)),
						rt === null ? (Ae = sa) : (rt.sibling = sa),
						(rt = sa),
						(Se = Qe));
				}
				if (it.done) return (a(Z, Se), Fe && oi(Z, qe), Ae);
				if (Se === null) {
					for (; !it.done; qe++, it = Q.next())
						((it = ue(Z, it.value, ie)),
							it !== null && ((U = d(it, U, qe)), rt === null ? (Ae = it) : (rt.sibling = it), (rt = it)));
					return (Fe && oi(Z, qe), Ae);
				}
				for (Se = l(Se); !it.done; qe++, it = Q.next())
					((it = ee(Se, Z, qe, it.value, ie)),
						it !== null &&
							(n && it.alternate !== null && Se.delete(it.key === null ? qe : it.key),
							(U = d(it, U, qe)),
							rt === null ? (Ae = it) : (rt.sibling = it),
							(rt = it)));
				return (
					n &&
						Se.forEach(function (x1) {
							return r(Z, x1);
						}),
					Fe && oi(Z, qe),
					Ae
				);
			}
			function vt(Z, U, Q, ie) {
				if (
					(typeof Q == "object" && Q !== null && Q.type === M && Q.key === null && (Q = Q.props.children),
					typeof Q == "object" && Q !== null)
				) {
					switch (Q.$$typeof) {
						case E:
							e: {
								for (var Ae = Q.key; U !== null; ) {
									if (U.key === Ae) {
										if (((Ae = Q.type), Ae === M)) {
											if (U.tag === 7) {
												(a(Z, U.sibling), (ie = c(U, Q.props.children)), (ie.return = Z), (Z = ie));
												break e;
											}
										} else if (
											U.elementType === Ae ||
											(typeof Ae == "object" && Ae !== null && Ae.$$typeof === V && Da(Ae) === U.type)
										) {
											(a(Z, U.sibling), (ie = c(U, Q.props)), Cl(ie, Q), (ie.return = Z), (Z = ie));
											break e;
										}
										a(Z, U);
										break;
									} else r(Z, U);
									U = U.sibling;
								}
								Q.type === M
									? ((ie = ka(Q.props.children, Z.mode, ie, Q.key)), (ie.return = Z), (Z = ie))
									: ((ie = Zs(Q.type, Q.key, Q.props, null, Z.mode, ie)), Cl(ie, Q), (ie.return = Z), (Z = ie));
							}
							return y(Z);
						case A:
							e: {
								for (Ae = Q.key; U !== null; ) {
									if (U.key === Ae)
										if (
											U.tag === 4 &&
											U.stateNode.containerInfo === Q.containerInfo &&
											U.stateNode.implementation === Q.implementation
										) {
											(a(Z, U.sibling), (ie = c(U, Q.children || [])), (ie.return = Z), (Z = ie));
											break e;
										} else {
											a(Z, U);
											break;
										}
									else r(Z, U);
									U = U.sibling;
								}
								((ie = mf(Q, Z.mode, ie)), (ie.return = Z), (Z = ie));
							}
							return y(Z);
						case V:
							return ((Q = Da(Q)), vt(Z, U, Q, ie));
					}
					if (L(Q)) return _e(Z, U, Q, ie);
					if (oe(Q)) {
						if (((Ae = oe(Q)), typeof Ae != "function")) throw Error(s(150));
						return ((Q = Ae.call(Q)), Ne(Z, U, Q, ie));
					}
					if (typeof Q.then == "function") return vt(Z, U, Fs(Q), ie);
					if (Q.$$typeof === k) return vt(Z, U, Qs(Z, Q), ie);
					Xs(Z, Q);
				}
				return (typeof Q == "string" && Q !== "") || typeof Q == "number" || typeof Q == "bigint"
					? ((Q = "" + Q),
						U !== null && U.tag === 6
							? (a(Z, U.sibling), (ie = c(U, Q)), (ie.return = Z), (Z = ie))
							: (a(Z, U), (ie = hf(Q, Z.mode, ie)), (ie.return = Z), (Z = ie)),
						y(Z))
					: a(Z, U);
			}
			return function (Z, U, Q, ie) {
				try {
					Rl = 0;
					var Ae = vt(Z, U, Q, ie);
					return ((_u = null), Ae);
				} catch (Se) {
					if (Se === bu || Se === Ys) throw Se;
					var rt = cr(29, Se, null, Z.mode);
					return ((rt.lanes = ie), (rt.return = Z), rt);
				}
			};
		}
		var Ia = Dv(!0),
			jv = Dv(!1),
			Ki = !1;
		function Af(n) {
			n.updateQueue = {
				baseState: n.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: { pending: null, lanes: 0, hiddenCallbacks: null },
				callbacks: null,
			};
		}
		function Rf(n, r) {
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
			if (((l = l.shared), (lt & 2) !== 0)) {
				var c = l.pending;
				return (
					c === null ? (r.next = r) : ((r.next = c.next), (c.next = r)),
					(l.pending = r),
					(r = Vs(n)),
					pv(n, null, a),
					r
				);
			}
			return (Bs(n, l, r, a), Vs(n));
		}
		function kl(n, r, a) {
			if (((r = r.updateQueue), r !== null && ((r = r.shared), (a & 4194048) !== 0))) {
				var l = r.lanes;
				((l &= n.pendingLanes), (a |= l), (r.lanes = a), Qt(n, a));
			}
		}
		function Cf(n, r) {
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
		var kf = !1;
		function Nl() {
			if (kf) {
				var n = pu;
				if (n !== null) throw n;
			}
		}
		function Ml(n, r, a, l) {
			kf = !1;
			var c = n.updateQueue;
			Ki = !1;
			var d = c.firstBaseUpdate,
				y = c.lastBaseUpdate,
				x = c.shared.pending;
			if (x !== null) {
				c.shared.pending = null;
				var j = x,
					K = j.next;
				((j.next = null), y === null ? (d = K) : (y.next = K), (y = j));
				var ne = n.alternate;
				ne !== null &&
					((ne = ne.updateQueue),
					(x = ne.lastBaseUpdate),
					x !== y && (x === null ? (ne.firstBaseUpdate = K) : (x.next = K), (ne.lastBaseUpdate = j)));
			}
			if (d !== null) {
				var ue = c.baseState;
				((y = 0), (ne = K = j = null), (x = d));
				do {
					var F = x.lane & -536870913,
						ee = F !== x.lane;
					if (ee ? (Pe & F) === F : (l & F) === F) {
						(F !== 0 && F === yu && (kf = !0),
							ne !== null && (ne = ne.next = { lane: 0, tag: x.tag, payload: x.payload, callback: null, next: null }));
						e: {
							var _e = n,
								Ne = x;
							F = r;
							var vt = a;
							switch (Ne.tag) {
								case 1:
									if (((_e = Ne.payload), typeof _e == "function")) {
										ue = _e.call(vt, ue, F);
										break e;
									}
									ue = _e;
									break e;
								case 3:
									_e.flags = (_e.flags & -65537) | 128;
								case 0:
									if (((_e = Ne.payload), (F = typeof _e == "function" ? _e.call(vt, ue, F) : _e), F == null)) break e;
									ue = b({}, ue, F);
									break e;
								case 2:
									Ki = !0;
							}
						}
						((F = x.callback),
							F !== null &&
								((n.flags |= 64),
								ee && (n.flags |= 8192),
								(ee = c.callbacks),
								ee === null ? (c.callbacks = [F]) : ee.push(F)));
					} else
						((ee = { lane: F, tag: x.tag, payload: x.payload, callback: x.callback, next: null }),
							ne === null ? ((K = ne = ee), (j = ue)) : (ne = ne.next = ee),
							(y |= F));
					if (((x = x.next), x === null)) {
						if (((x = c.shared.pending), x === null)) break;
						((ee = x), (x = ee.next), (ee.next = null), (c.lastBaseUpdate = ee), (c.shared.pending = null));
					}
				} while (!0);
				(ne === null && (j = ue),
					(c.baseState = j),
					(c.firstBaseUpdate = K),
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
		var Su = N(null),
			Js = N(0);
		function qv(n, r) {
			((n = _i), se(Js, n), se(Su, r), (_i = n | r.baseLanes));
		}
		function Nf() {
			(se(Js, _i), se(Su, Su.current));
		}
		function Mf() {
			((_i = Js.current), I(Su), I(Js));
		}
		var fr = N(null),
			Nr = null;
		function Yi(n) {
			var r = n.alternate;
			(se(Gt, Gt.current & 1),
				se(fr, n),
				Nr === null && (r === null || Su.current !== null || r.memoizedState !== null) && (Nr = n));
		}
		function Of(n) {
			(se(Gt, Gt.current), se(fr, n), Nr === null && (Nr = n));
		}
		function Uv(n) {
			n.tag === 22 ? (se(Gt, Gt.current), se(fr, n), Nr === null && (Nr = n)) : Gi(n);
		}
		function Gi() {
			(se(Gt, Gt.current), se(fr, fr.current));
		}
		function dr(n) {
			(I(fr), Nr === n && (Nr = null), I(Gt));
		}
		var Gt = N(0);
		function Ws(n) {
			for (var r = n; r !== null; ) {
				if (r.tag === 13) {
					var a = r.memoizedState;
					if (a !== null && ((a = a.dehydrated), a === null || Ld(a) || qd(a))) return r;
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
		var di = 0,
			Le = null,
			ht = null,
			ln = null,
			eo = !1,
			wu = !1,
			Ua = !1,
			to = 0,
			Ol = 0,
			Eu = null,
			fw = 0;
		function Ut() {
			throw Error(s(321));
		}
		function zf(n, r) {
			if (r === null) return !1;
			for (var a = 0; a < r.length && a < n.length; a++) if (!or(n[a], r[a])) return !1;
			return !0;
		}
		function Df(n, r, a, l, c, d) {
			return (
				(di = d),
				(Le = r),
				(r.memoizedState = null),
				(r.updateQueue = null),
				(r.lanes = 0),
				($.H = n === null || n.memoizedState === null ? wg : Gf),
				(Ua = !1),
				(d = a(l, c)),
				(Ua = !1),
				wu && (d = Bv(r, a, l, c)),
				$v(n),
				d
			);
		}
		function $v(n) {
			$.H = jl;
			var r = ht !== null && ht.next !== null;
			if (((di = 0), (ln = ht = Le = null), (eo = !1), (Ol = 0), (Eu = null), r)) throw Error(s(300));
			n === null || sn || ((n = n.dependencies), n !== null && Ps(n) && (sn = !0));
		}
		function Bv(n, r, a, l) {
			Le = n;
			var c = 0;
			do {
				if ((wu && (Eu = null), (Ol = 0), (wu = !1), 25 <= c)) throw Error(s(301));
				if (((c += 1), (ln = ht = null), n.updateQueue != null)) {
					var d = n.updateQueue;
					((d.lastEffect = null), (d.events = null), (d.stores = null), d.memoCache != null && (d.memoCache.index = 0));
				}
				(($.H = Eg), (d = r(a, l)));
			} while (wu);
			return d;
		}
		function dw() {
			var n = $.H,
				r = n.useState()[0];
			return (
				(r = typeof r.then == "function" ? zl(r) : r),
				(n = n.useState()[0]),
				(ht !== null ? ht.memoizedState : null) !== n && (Le.flags |= 1024),
				r
			);
		}
		function jf() {
			var n = to !== 0;
			return ((to = 0), n);
		}
		function If(n, r, a) {
			((r.updateQueue = n.updateQueue), (r.flags &= -2053), (n.lanes &= ~a));
		}
		function Lf(n) {
			if (eo) {
				for (n = n.memoizedState; n !== null; ) {
					var r = n.queue;
					(r !== null && (r.pending = null), (n = n.next));
				}
				eo = !1;
			}
			((di = 0), (ln = ht = Le = null), (wu = !1), (Ol = to = 0), (Eu = null));
		}
		function Bn() {
			var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
			return (ln === null ? (Le.memoizedState = ln = n) : (ln = ln.next = n), ln);
		}
		function Ft() {
			if (ht === null) {
				var n = Le.alternate;
				n = n !== null ? n.memoizedState : null;
			} else n = ht.next;
			var r = ln === null ? Le.memoizedState : ln.next;
			if (r !== null) ((ln = r), (ht = n));
			else {
				if (n === null) throw Le.alternate === null ? Error(s(467)) : Error(s(310));
				((ht = n),
					(n = {
						memoizedState: ht.memoizedState,
						baseState: ht.baseState,
						baseQueue: ht.baseQueue,
						queue: ht.queue,
						next: null,
					}),
					ln === null ? (Le.memoizedState = ln = n) : (ln = ln.next = n));
			}
			return ln;
		}
		function no() {
			return { lastEffect: null, events: null, stores: null, memoCache: null };
		}
		function zl(n) {
			var r = Ol;
			return (
				(Ol += 1),
				Eu === null && (Eu = []),
				(n = Mv(Eu, n, r)),
				(r = Le),
				(ln === null ? r.memoizedState : ln.next) === null &&
					((r = r.alternate), ($.H = r === null || r.memoizedState === null ? wg : Gf)),
				n
			);
		}
		function ro(n) {
			if (n !== null && typeof n == "object") {
				if (typeof n.then == "function") return zl(n);
				if (n.$$typeof === k) return Tn(n);
			}
			throw Error(s(438, String(n)));
		}
		function qf(n) {
			var r = null,
				a = Le.updateQueue;
			if ((a !== null && (r = a.memoCache), r == null)) {
				var l = Le.alternate;
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
				a === null && ((a = no()), (Le.updateQueue = a)),
				(a.memoCache = r),
				(a = r.data[r.index]),
				a === void 0)
			)
				for (a = r.data[r.index] = Array(n), l = 0; l < n; l++) a[l] = W;
			return (r.index++, a);
		}
		function hi(n, r) {
			return typeof r == "function" ? r(n) : r;
		}
		function io(n) {
			return Uf(Ft(), ht, n);
		}
		function Uf(n, r, a) {
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
					j = null,
					K = r,
					ne = !1;
				do {
					var ue = K.lane & -536870913;
					if (ue !== K.lane ? (Pe & ue) === ue : (di & ue) === ue) {
						var F = K.revertLane;
						if (F === 0)
							(j !== null &&
								(j = j.next =
									{
										lane: 0,
										revertLane: 0,
										gesture: null,
										action: K.action,
										hasEagerState: K.hasEagerState,
										eagerState: K.eagerState,
										next: null,
									}),
								ue === yu && (ne = !0));
						else if ((di & F) === F) {
							((K = K.next), F === yu && (ne = !0));
							continue;
						} else
							((ue = {
								lane: 0,
								revertLane: K.revertLane,
								gesture: null,
								action: K.action,
								hasEagerState: K.hasEagerState,
								eagerState: K.eagerState,
								next: null,
							}),
								j === null ? ((x = j = ue), (y = d)) : (j = j.next = ue),
								(Le.lanes |= F),
								(Ji |= F));
						((ue = K.action), Ua && a(d, ue), (d = K.hasEagerState ? K.eagerState : a(d, ue)));
					} else
						((F = {
							lane: ue,
							revertLane: K.revertLane,
							gesture: K.gesture,
							action: K.action,
							hasEagerState: K.hasEagerState,
							eagerState: K.eagerState,
							next: null,
						}),
							j === null ? ((x = j = F), (y = d)) : (j = j.next = F),
							(Le.lanes |= ue),
							(Ji |= ue));
					K = K.next;
				} while (K !== null && K !== r);
				if ((j === null ? (y = d) : (j.next = x), !or(d, n.memoizedState) && ((sn = !0), ne && ((a = pu), a !== null))))
					throw a;
				((n.memoizedState = d), (n.baseState = y), (n.baseQueue = j), (l.lastRenderedState = d));
			}
			return (c === null && (l.lanes = 0), [n.memoizedState, l.dispatch]);
		}
		function $f(n) {
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
			var l = Le,
				c = Ft(),
				d = Fe;
			if (d) {
				if (a === void 0) throw Error(s(407));
				a = a();
			} else a = r();
			var y = !or((ht || c).memoizedState, a);
			if (
				(y && ((c.memoizedState = a), (sn = !0)),
				(c = c.queue),
				Zf(Pv.bind(null, l, c, n), [n]),
				c.getSnapshot !== r || y || (ln !== null && ln.memoizedState.tag & 1))
			) {
				if (((l.flags |= 2048), Tu(9, { destroy: void 0 }, Hv.bind(null, l, c, a, r), null), _t === null))
					throw Error(s(349));
				d || (di & 127) !== 0 || Zv(l, r, a);
			}
			return a;
		}
		function Zv(n, r, a) {
			((n.flags |= 16384),
				(n = { getSnapshot: r, value: a }),
				(r = Le.updateQueue),
				r === null
					? ((r = no()), (Le.updateQueue = r), (r.stores = [n]))
					: ((a = r.stores), a === null ? (r.stores = [n]) : a.push(n)));
		}
		function Hv(n, r, a, l) {
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
		function Bf(n) {
			var r = Bn();
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
				(r.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: hi, lastRenderedState: n }),
				r
			);
		}
		function Yv(n, r, a, l) {
			return ((n.baseState = a), Uf(n, ht, typeof l == "function" ? l : hi));
		}
		function hw(n, r, a, l, c) {
			if (lo(n)) throw Error(s(485));
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
				($.T !== null ? a(!0) : (d.isTransition = !1),
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
				var d = $.T,
					y = {};
				$.T = y;
				try {
					var x = a(c, l),
						j = $.S;
					(j !== null && j(y, x), Fv(n, r, x));
				} catch (K) {
					Vf(n, r, K);
				} finally {
					(d !== null && y.types !== null && (d.types = y.types), ($.T = d));
				}
			} else
				try {
					((d = a(c, l)), Fv(n, r, d));
				} catch (K) {
					Vf(n, r, K);
				}
		}
		function Fv(n, r, a) {
			a !== null && typeof a == "object" && typeof a.then == "function"
				? a.then(
						function (l) {
							Xv(n, r, l);
						},
						function (l) {
							return Vf(n, r, l);
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
		function Vf(n, r, a) {
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
			if (Fe) {
				var a = _t.formState;
				if (a !== null) {
					e: {
						var l = Le;
						if (Fe) {
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
				(a = Bn()),
				(a.memoizedState = a.baseState = r),
				(l = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Wv, lastRenderedState: r }),
				(a.queue = l),
				(a = bg.bind(null, Le, l)),
				(l.dispatch = a),
				(l = Bf(!1)),
				(d = Yf.bind(null, Le, !1, l.queue)),
				(l = Bn()),
				(c = { state: r, dispatch: null, action: n, pending: null }),
				(l.queue = c),
				(a = hw.bind(null, Le, c, d, a)),
				(c.dispatch = a),
				(l.memoizedState = n),
				[r, a, !1]
			);
		}
		function tg(n) {
			return ng(Ft(), ht, n);
		}
		function ng(n, r, a) {
			if (((r = Uf(n, r, Wv)[0]), (n = io(hi)[0]), typeof r == "object" && r !== null && typeof r.then == "function"))
				try {
					var l = zl(r);
				} catch (y) {
					throw y === bu ? Ys : y;
				}
			else l = r;
			r = Ft();
			var c = r.queue,
				d = c.dispatch;
			return (
				a !== r.memoizedState && ((Le.flags |= 2048), Tu(9, { destroy: void 0 }, mw.bind(null, c, a), null)),
				[l, d, n]
			);
		}
		function mw(n, r) {
			n.action = r;
		}
		function rg(n) {
			var r = Ft(),
				a = ht;
			if (a !== null) return ng(r, a, n);
			(Ft(), (r = r.memoizedState), (a = Ft()));
			var l = a.queue.dispatch;
			return ((a.memoizedState = n), [r, l, !1]);
		}
		function Tu(n, r, a, l) {
			return (
				(n = { tag: n, create: a, deps: l, inst: r, next: null }),
				(r = Le.updateQueue),
				r === null && ((r = no()), (Le.updateQueue = r)),
				(a = r.lastEffect),
				a === null ? (r.lastEffect = n.next = n) : ((l = a.next), (a.next = n), (n.next = l), (r.lastEffect = n)),
				n
			);
		}
		function ig() {
			return Ft().memoizedState;
		}
		function ao(n, r, a, l) {
			var c = Bn();
			((Le.flags |= n), (c.memoizedState = Tu(1 | r, { destroy: void 0 }, a, l === void 0 ? null : l)));
		}
		function uo(n, r, a, l) {
			var c = Ft();
			l = l === void 0 ? null : l;
			var d = c.memoizedState.inst;
			ht !== null && l !== null && zf(l, ht.memoizedState.deps)
				? (c.memoizedState = Tu(r, d, a, l))
				: ((Le.flags |= n), (c.memoizedState = Tu(1 | r, d, a, l)));
		}
		function ag(n, r) {
			ao(8390656, 8, n, r);
		}
		function Zf(n, r) {
			uo(2048, 8, n, r);
		}
		function vw(n) {
			Le.flags |= 4;
			var r = Le.updateQueue;
			if (r === null) ((r = no()), (Le.updateQueue = r), (r.events = [n]));
			else {
				var a = r.events;
				a === null ? (r.events = [n]) : a.push(n);
			}
		}
		function ug(n) {
			var r = Ft().memoizedState;
			return (
				vw({ ref: r, nextImpl: n }),
				function () {
					if ((lt & 2) !== 0) throw Error(s(440));
					return r.impl.apply(void 0, arguments);
				}
			);
		}
		function lg(n, r) {
			return uo(4, 2, n, r);
		}
		function sg(n, r) {
			return uo(4, 4, n, r);
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
			((a = a != null ? a.concat([n]) : null), uo(4, 4, og.bind(null, r, n), a));
		}
		function Hf() {}
		function fg(n, r) {
			var a = Ft();
			r = r === void 0 ? null : r;
			var l = a.memoizedState;
			return r !== null && zf(r, l[1]) ? l[0] : ((a.memoizedState = [n, r]), n);
		}
		function dg(n, r) {
			var a = Ft();
			r = r === void 0 ? null : r;
			var l = a.memoizedState;
			if (r !== null && zf(r, l[1])) return l[0];
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
		function Pf(n, r, a) {
			return a === void 0 || ((di & 1073741824) !== 0 && (Pe & 261930) === 0)
				? (n.memoizedState = r)
				: ((n.memoizedState = a), (n = cy()), (Le.lanes |= n), (Ji |= n), a);
		}
		function hg(n, r, a, l) {
			return or(a, r)
				? a
				: Su.current !== null
					? ((n = Pf(n, a, l)), or(n, r) || (sn = !0), n)
					: (di & 42) === 0 || ((di & 1073741824) !== 0 && (Pe & 261930) === 0)
						? ((sn = !0), (n.memoizedState = a))
						: ((n = cy()), (Le.lanes |= n), (Ji |= n), r);
		}
		function mg(n, r, a, l, c) {
			var d = H.p;
			H.p = d !== 0 && 8 > d ? d : 8;
			var y = $.T,
				x = {};
			(($.T = x), Yf(n, !1, r, a));
			try {
				var j = c(),
					K = $.S;
				(K !== null && K(x, j),
					j !== null && typeof j == "object" && typeof j.then == "function"
						? Dl(n, r, cw(j, l), Mr(n))
						: Dl(n, r, l, Mr(n)));
			} catch (ne) {
				Dl(n, r, { then: function () {}, status: "rejected", reason: ne }, Mr());
			} finally {
				((H.p = d), y !== null && x.types !== null && (y.types = x.types), ($.T = y));
			}
		}
		function gw() {}
		function Qf(n, r, a, l) {
			if (n.tag !== 5) throw Error(s(476));
			var c = vg(n).queue;
			mg(
				n,
				c,
				r,
				ve,
				a === null
					? gw
					: function () {
							return (gg(n), a(l));
						},
			);
		}
		function vg(n) {
			var r = n.memoizedState;
			if (r !== null) return r;
			r = {
				memoizedState: ve,
				baseState: ve,
				baseQueue: null,
				queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: hi, lastRenderedState: ve },
				next: null,
			};
			var a = {};
			return (
				(r.next = {
					memoizedState: a,
					baseState: a,
					baseQueue: null,
					queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: hi, lastRenderedState: a },
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
			(r.next === null && (r = n.alternate.memoizedState), Dl(n, r.next.queue, {}, Mr()));
		}
		function Kf() {
			return Tn(Xl);
		}
		function yg() {
			return Ft().memoizedState;
		}
		function pg() {
			return Ft().memoizedState;
		}
		function yw(n) {
			for (var r = n.return; r !== null; ) {
				switch (r.tag) {
					case 24:
					case 3:
						var a = Mr();
						n = La(a);
						var l = qa(r, n, a);
						(l !== null && (er(l, r, a), kl(l, r, a)), (r = { cache: wf() }), (n.payload = r));
						return;
				}
				r = r.return;
			}
		}
		function pw(n, r, a) {
			var l = Mr();
			((a = { lane: l, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null }),
				lo(n) ? _g(r, a) : ((a = ff(n, r, a, l)), a !== null && (er(a, n, l), Sg(a, r, l))));
		}
		function bg(n, r, a) {
			Dl(n, r, a, Mr());
		}
		function Dl(n, r, a, l) {
			var c = { lane: l, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null };
			if (lo(n)) _g(r, c);
			else {
				var d = n.alternate;
				if (n.lanes === 0 && (d === null || d.lanes === 0) && ((d = r.lastRenderedReducer), d !== null))
					try {
						var y = r.lastRenderedState,
							x = d(y, a);
						if (((c.hasEagerState = !0), (c.eagerState = x), or(x, y)))
							return (Bs(n, r, c, 0), _t === null && $s(), !1);
					} catch {}
				if (((a = ff(n, r, c, l)), a !== null)) return (er(a, n, l), Sg(a, r, l), !0);
			}
			return !1;
		}
		function Yf(n, r, a, l) {
			if (
				((l = { lane: 2, revertLane: Ad(), gesture: null, action: l, hasEagerState: !1, eagerState: null, next: null }),
				lo(n))
			) {
				if (r) throw Error(s(479));
			} else ((r = ff(n, a, l, 2)), r !== null && er(r, n, 2));
		}
		function lo(n) {
			var r = n.alternate;
			return n === Le || (r !== null && r === Le);
		}
		function _g(n, r) {
			wu = eo = !0;
			var a = n.pending;
			(a === null ? (r.next = r) : ((r.next = a.next), (a.next = r)), (n.pending = r));
		}
		function Sg(n, r, a) {
			if ((a & 4194048) !== 0) {
				var l = r.lanes;
				((l &= n.pendingLanes), (a |= l), (r.lanes = a), Qt(n, a));
			}
		}
		var jl = {
			readContext: Tn,
			use: ro,
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
		jl.useEffectEvent = Ut;
		var wg = {
				readContext: Tn,
				use: ro,
				useCallback: function (n, r) {
					return ((Bn().memoizedState = [n, r === void 0 ? null : r]), n);
				},
				useContext: Tn,
				useEffect: ag,
				useImperativeHandle: function (n, r, a) {
					((a = a != null ? a.concat([n]) : null), ao(4194308, 4, og.bind(null, r, n), a));
				},
				useLayoutEffect: function (n, r) {
					return ao(4194308, 4, n, r);
				},
				useInsertionEffect: function (n, r) {
					ao(4, 2, n, r);
				},
				useMemo: function (n, r) {
					var a = Bn();
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
					var l = Bn();
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
						(n = n.dispatch = pw.bind(null, Le, n)),
						[l.memoizedState, n]
					);
				},
				useRef: function (n) {
					var r = Bn();
					return ((n = { current: n }), (r.memoizedState = n));
				},
				useState: function (n) {
					n = Bf(n);
					var r = n.queue,
						a = bg.bind(null, Le, r);
					return ((r.dispatch = a), [n.memoizedState, a]);
				},
				useDebugValue: Hf,
				useDeferredValue: function (n, r) {
					return Pf(Bn(), n, r);
				},
				useTransition: function () {
					var n = Bf(!1);
					return ((n = mg.bind(null, Le, n.queue, !0, !1)), (Bn().memoizedState = n), [!1, n]);
				},
				useSyncExternalStore: function (n, r, a) {
					var l = Le,
						c = Bn();
					if (Fe) {
						if (a === void 0) throw Error(s(407));
						a = a();
					} else {
						if (((a = r()), _t === null)) throw Error(s(349));
						(Pe & 127) !== 0 || Zv(l, r, a);
					}
					c.memoizedState = a;
					var d = { value: a, getSnapshot: r };
					return (
						(c.queue = d),
						ag(Pv.bind(null, l, d, n), [n]),
						(l.flags |= 2048),
						Tu(9, { destroy: void 0 }, Hv.bind(null, l, d, a, r), null),
						a
					);
				},
				useId: function () {
					var n = Bn(),
						r = _t.identifierPrefix;
					if (Fe) {
						var a = Jr,
							l = Xr;
						((a = (l & ~(1 << (32 - ot(l) - 1))).toString(32) + a),
							(r = "_" + r + "R_" + a),
							(a = to++),
							0 < a && (r += "H" + a.toString(32)),
							(r += "_"));
					} else ((a = fw++), (r = "_" + r + "r_" + a.toString(32) + "_"));
					return (n.memoizedState = r);
				},
				useHostTransitionStatus: Kf,
				useFormState: eg,
				useActionState: eg,
				useOptimistic: function (n) {
					var r = Bn();
					r.memoizedState = r.baseState = n;
					var a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
					return ((r.queue = a), (r = Yf.bind(null, Le, !0, a)), (a.dispatch = r), [n, r]);
				},
				useMemoCache: qf,
				useCacheRefresh: function () {
					return (Bn().memoizedState = yw.bind(null, Le));
				},
				useEffectEvent: function (n) {
					var r = Bn(),
						a = { impl: n };
					return (
						(r.memoizedState = a),
						function () {
							if ((lt & 2) !== 0) throw Error(s(440));
							return a.impl.apply(void 0, arguments);
						}
					);
				},
			},
			Gf = {
				readContext: Tn,
				use: ro,
				useCallback: fg,
				useContext: Tn,
				useEffect: Zf,
				useImperativeHandle: cg,
				useInsertionEffect: lg,
				useLayoutEffect: sg,
				useMemo: dg,
				useReducer: io,
				useRef: ig,
				useState: function () {
					return io(hi);
				},
				useDebugValue: Hf,
				useDeferredValue: function (n, r) {
					return hg(Ft(), ht.memoizedState, n, r);
				},
				useTransition: function () {
					var n = io(hi)[0],
						r = Ft().memoizedState;
					return [typeof n == "boolean" ? n : zl(n), r];
				},
				useSyncExternalStore: Vv,
				useId: yg,
				useHostTransitionStatus: Kf,
				useFormState: tg,
				useActionState: tg,
				useOptimistic: function (n, r) {
					return Yv(Ft(), ht, n, r);
				},
				useMemoCache: qf,
				useCacheRefresh: pg,
			};
		Gf.useEffectEvent = ug;
		var Eg = {
			readContext: Tn,
			use: ro,
			useCallback: fg,
			useContext: Tn,
			useEffect: Zf,
			useImperativeHandle: cg,
			useInsertionEffect: lg,
			useLayoutEffect: sg,
			useMemo: dg,
			useReducer: $f,
			useRef: ig,
			useState: function () {
				return $f(hi);
			},
			useDebugValue: Hf,
			useDeferredValue: function (n, r) {
				var a = Ft();
				return ht === null ? Pf(a, n, r) : hg(a, ht.memoizedState, n, r);
			},
			useTransition: function () {
				var n = $f(hi)[0],
					r = Ft().memoizedState;
				return [typeof n == "boolean" ? n : zl(n), r];
			},
			useSyncExternalStore: Vv,
			useId: yg,
			useHostTransitionStatus: Kf,
			useFormState: rg,
			useActionState: rg,
			useOptimistic: function (n, r) {
				var a = Ft();
				return ht !== null ? Yv(a, ht, n, r) : ((a.baseState = n), [n, a.queue.dispatch]);
			},
			useMemoCache: qf,
			useCacheRefresh: pg,
		};
		Eg.useEffectEvent = ug;
		function Ff(n, r, a, l) {
			((r = n.memoizedState),
				(a = a(l, r)),
				(a = a == null ? r : b({}, r, a)),
				(n.memoizedState = a),
				n.lanes === 0 && (n.updateQueue.baseState = a));
		}
		var Xf = {
			enqueueSetState: function (n, r, a) {
				n = n._reactInternals;
				var l = Mr(),
					c = La(l);
				((c.payload = r), a != null && (c.callback = a), (r = qa(n, c, l)), r !== null && (er(r, n, l), kl(r, n, l)));
			},
			enqueueReplaceState: function (n, r, a) {
				n = n._reactInternals;
				var l = Mr(),
					c = La(l);
				((c.tag = 1),
					(c.payload = r),
					a != null && (c.callback = a),
					(r = qa(n, c, l)),
					r !== null && (er(r, n, l), kl(r, n, l)));
			},
			enqueueForceUpdate: function (n, r) {
				n = n._reactInternals;
				var a = Mr(),
					l = La(a);
				((l.tag = 2), r != null && (l.callback = r), (r = qa(n, l, a)), r !== null && (er(r, n, a), kl(r, n, a)));
			},
		};
		function Tg(n, r, a, l, c, d, y) {
			return (
				(n = n.stateNode),
				typeof n.shouldComponentUpdate == "function"
					? n.shouldComponentUpdate(l, d, y)
					: r.prototype && r.prototype.isPureReactComponent
						? !Sl(a, l) || !Sl(c, d)
						: !0
			);
		}
		function xg(n, r, a, l) {
			((n = r.state),
				typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(a, l),
				typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(a, l),
				r.state !== n && Xf.enqueueReplaceState(r, r.state, null));
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
		function bw(n) {
			Us(n);
		}
		function _w(n) {
			console.error(n);
		}
		function Sw(n) {
			Us(n);
		}
		function so(n, r) {
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
		function Jf(n, r, a) {
			return (
				(a = La(a)),
				(a.tag = 3),
				(a.payload = { element: null }),
				(a.callback = function () {
					so(n, r);
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
		function ww(n, r, a, l, c) {
			if (((a.flags |= 32768), l !== null && typeof l == "object" && typeof l.then == "function")) {
				if (((r = a.alternate), r !== null && gu(r, a, c, !0), (a = fr.current), a !== null)) {
					switch (a.tag) {
						case 31:
						case 13:
							return (
								Nr === null ? So() : a.alternate === null && $t === 0 && ($t = 3),
								(a.flags &= -257),
								(a.flags |= 65536),
								(a.lanes = c),
								l === Gs
									? (a.flags |= 16384)
									: ((r = a.updateQueue), r === null ? (a.updateQueue = new Set([l])) : r.add(l), Ed(n, l, c)),
								!1
							);
						case 22:
							return (
								(a.flags |= 65536),
								l === Gs
									? (a.flags |= 16384)
									: ((r = a.updateQueue),
										r === null
											? ((r = { transitions: null, markerInstances: null, retryQueue: new Set([l]) }),
												(a.updateQueue = r))
											: ((a = r.retryQueue), a === null ? (r.retryQueue = new Set([l])) : a.add(l)),
										Ed(n, l, c)),
								!1
							);
					}
					throw Error(s(435, a.tag));
				}
				return (Ed(n, l, c), So(), !1);
			}
			if (Fe)
				return (
					(r = fr.current),
					r !== null
						? ((r.flags & 65536) === 0 && (r.flags |= 256),
							(r.flags |= 65536),
							(r.lanes = c),
							l !== yf && ((n = Error(s(422), { cause: l })), Tl(Ar(n, a))))
						: (l !== yf && ((r = Error(s(423), { cause: l })), Tl(Ar(r, a))),
							(n = n.current.alternate),
							(n.flags |= 65536),
							(c &= -c),
							(n.lanes |= c),
							(l = Ar(l, a)),
							(c = Jf(n.stateNode, l, c)),
							Cf(n, c),
							$t !== 4 && ($t = 2)),
					!1
				);
			var d = Error(s(520), { cause: l });
			if (((d = Ar(d, a)), Zl === null ? (Zl = [d]) : Zl.push(d), $t !== 4 && ($t = 2), r === null)) return !0;
			((l = Ar(l, a)), (a = r));
			do {
				switch (a.tag) {
					case 3:
						return ((a.flags |= 65536), (n = c & -c), (a.lanes |= n), (n = Jf(a.stateNode, l, n)), Cf(a, n), !1);
					case 1:
						if (
							((r = a.type),
							(d = a.stateNode),
							(a.flags & 128) === 0 &&
								(typeof r.getDerivedStateFromError == "function" ||
									(d !== null && typeof d.componentDidCatch == "function" && (Wi === null || !Wi.has(d)))))
						)
							return ((a.flags |= 65536), (c &= -c), (a.lanes |= c), (c = Rg(c)), Cg(c, n, a, l), Cf(a, c), !1);
				}
				a = a.return;
			} while (a !== null);
			return !1;
		}
		var Wf = Error(s(461)),
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
				(l = Df(n, r, a, y, d, c)),
				(x = jf()),
				n !== null && !sn ? (If(n, r, c), mi(n, r, c)) : (Fe && x && vf(r), (r.flags |= 1), xn(n, r, l, c), r.child)
			);
		}
		function Ng(n, r, a, l, c) {
			if (n === null) {
				var d = a.type;
				return typeof d == "function" && !df(d) && d.defaultProps === void 0 && a.compare === null
					? ((r.tag = 15), (r.type = d), Mg(n, r, d, l, c))
					: ((n = Zs(a.type, null, l, r, r.mode, c)), (n.ref = r.ref), (n.return = r), (r.child = n));
			}
			if (((d = n.child), !ld(n, c))) {
				var y = d.memoizedProps;
				if (((a = a.compare), (a = a !== null ? a : Sl), a(y, l) && n.ref === r.ref)) return mi(n, r, c);
			}
			return ((r.flags |= 1), (n = si(d, l)), (n.ref = r.ref), (n.return = r), (r.child = n));
		}
		function Mg(n, r, a, l, c) {
			if (n !== null) {
				var d = n.memoizedProps;
				if (Sl(d, l) && n.ref === r.ref)
					if (((sn = !1), (r.pendingProps = l = d), ld(n, c))) (n.flags & 131072) !== 0 && (sn = !0);
					else return ((r.lanes = n.lanes), mi(n, r, c));
			}
			return ed(n, r, a, l, c);
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
						n !== null && Ks(r, d !== null ? d.cachePool : null),
						d !== null ? qv(r, d) : Nf(),
						Uv(r));
				else return ((l = r.lanes = 536870912), zg(n, r, d !== null ? d.baseLanes | a : a, a, l));
			} else
				d !== null
					? (Ks(r, d.cachePool), qv(r, d), Gi(r), (r.memoizedState = null))
					: (n !== null && Ks(r, null), Nf(), Gi(r));
			return (xn(n, r, c, a), r.child);
		}
		function Il(n, r) {
			return (
				(n !== null && n.tag === 22) ||
					r.stateNode !== null ||
					(r.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				r.sibling
			);
		}
		function zg(n, r, a, l, c) {
			var d = Tf();
			return (
				(d = d === null ? null : { parent: un._currentValue, pool: d }),
				(r.memoizedState = { baseLanes: a, cachePool: d }),
				n !== null && Ks(r, null),
				Nf(),
				Uv(r),
				n !== null && gu(n, r, l, !0),
				(r.childLanes = c),
				null
			);
		}
		function oo(n, r) {
			return (
				(r = fo({ mode: r.mode, children: r.children }, n.mode)),
				(r.ref = n.ref),
				(n.child = r),
				(r.return = n),
				r
			);
		}
		function Dg(n, r, a) {
			return (Ia(r, n.child, null, a), (n = oo(r, r.pendingProps)), (n.flags |= 2), dr(r), (r.memoizedState = null), n);
		}
		function Ew(n, r, a) {
			var l = r.pendingProps,
				c = (r.flags & 128) !== 0;
			if (((r.flags &= -129), n === null)) {
				if (Fe) {
					if (l.mode === "hidden") return ((n = oo(r, l)), (r.lanes = 536870912), Il(null, n));
					if (
						(Of(r),
						(n = Et)
							? ((n = Ky(n, kr)),
								(n = n !== null && n.data === "&" ? n : null),
								n !== null &&
									((r.memoizedState = {
										dehydrated: n,
										treeContext: Zi !== null ? { id: Xr, overflow: Jr } : null,
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
				return oo(r, l);
			}
			var d = n.memoizedState;
			if (d !== null) {
				var y = d.dehydrated;
				if ((Of(r), c))
					if (r.flags & 256) ((r.flags &= -257), (r = Dg(n, r, a)));
					else if (r.memoizedState !== null) ((r.child = n.child), (r.flags |= 128), (r = null));
					else throw Error(s(558));
				else if ((sn || gu(n, r, a, !1), (c = (a & n.childLanes) !== 0), sn || c)) {
					if (((l = _t), l !== null && ((y = Sa(l, a)), y !== 0 && y !== d.retryLane)))
						throw ((d.retryLane = y), Ca(n, y), er(l, n, y), Wf);
					(So(), (r = Dg(n, r, a)));
				} else
					((n = d.treeContext),
						(Et = Or(y.nextSibling)),
						(En = r),
						(Fe = !0),
						(Hi = null),
						(kr = !1),
						n !== null && Ev(r, n),
						(r = oo(r, l)),
						(r.flags |= 4096));
				return r;
			}
			return (
				(n = si(n.child, { mode: l.mode, children: l.children })),
				(n.ref = r.ref),
				(r.child = n),
				(n.return = r),
				n
			);
		}
		function co(n, r) {
			var a = r.ref;
			if (a === null) n !== null && n.ref !== null && (r.flags |= 4194816);
			else {
				if (typeof a != "function" && typeof a != "object") throw Error(s(284));
				(n === null || n.ref !== a) && (r.flags |= 4194816);
			}
		}
		function ed(n, r, a, l, c) {
			return (
				Oa(r),
				(a = Df(n, r, a, l, void 0, c)),
				(l = jf()),
				n !== null && !sn ? (If(n, r, c), mi(n, r, c)) : (Fe && l && vf(r), (r.flags |= 1), xn(n, r, a, c), r.child)
			);
		}
		function jg(n, r, a, l, c, d) {
			return (
				Oa(r),
				(r.updateQueue = null),
				(a = Bv(r, l, a, c)),
				$v(n),
				(l = jf()),
				n !== null && !sn ? (If(n, r, d), mi(n, r, d)) : (Fe && l && vf(r), (r.flags |= 1), xn(n, r, a, d), r.child)
			);
		}
		function Ig(n, r, a, l, c) {
			if ((Oa(r), r.stateNode === null)) {
				var d = du,
					y = a.contextType;
				(typeof y == "object" && y !== null && (d = Tn(y)),
					(d = new a(l, d)),
					(r.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null),
					(d.updater = Xf),
					(r.stateNode = d),
					(d._reactInternals = r),
					(d = r.stateNode),
					(d.props = l),
					(d.state = r.memoizedState),
					(d.refs = {}),
					Af(r),
					(y = a.contextType),
					(d.context = typeof y == "object" && y !== null ? Tn(y) : du),
					(d.state = r.memoizedState),
					(y = a.getDerivedStateFromProps),
					typeof y == "function" && (Ff(r, a, y, l), (d.state = r.memoizedState)),
					typeof a.getDerivedStateFromProps == "function" ||
						typeof d.getSnapshotBeforeUpdate == "function" ||
						(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
						((y = d.state),
						typeof d.componentWillMount == "function" && d.componentWillMount(),
						typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(),
						y !== d.state && Xf.enqueueReplaceState(d, d.state, null),
						Ml(r, l, d, c),
						Nl(),
						(d.state = r.memoizedState)),
					typeof d.componentDidMount == "function" && (r.flags |= 4194308),
					(l = !0));
			} else if (n === null) {
				d = r.stateNode;
				var x = r.memoizedProps,
					j = $a(a, x);
				d.props = j;
				var K = d.context,
					ne = a.contextType;
				((y = du), typeof ne == "object" && ne !== null && (y = Tn(ne)));
				var ue = a.getDerivedStateFromProps;
				((ne = typeof ue == "function" || typeof d.getSnapshotBeforeUpdate == "function"),
					(x = r.pendingProps !== x),
					ne ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((x || K !== y) && xg(r, d, l, y)),
					(Ki = !1));
				var F = r.memoizedState;
				((d.state = F),
					Ml(r, l, d, c),
					Nl(),
					(K = r.memoizedState),
					x || F !== K || Ki
						? (typeof ue == "function" && (Ff(r, a, ue, l), (K = r.memoizedState)),
							(j = Ki || Tg(r, a, j, l, F, K, y))
								? (ne ||
										(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
										(typeof d.componentWillMount == "function" && d.componentWillMount(),
										typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()),
									typeof d.componentDidMount == "function" && (r.flags |= 4194308))
								: (typeof d.componentDidMount == "function" && (r.flags |= 4194308),
									(r.memoizedProps = l),
									(r.memoizedState = K)),
							(d.props = l),
							(d.state = K),
							(d.context = y),
							(l = j))
						: (typeof d.componentDidMount == "function" && (r.flags |= 4194308), (l = !1)));
			} else {
				((d = r.stateNode),
					Rf(n, r),
					(y = r.memoizedProps),
					(ne = $a(a, y)),
					(d.props = ne),
					(ue = r.pendingProps),
					(F = d.context),
					(K = a.contextType),
					(j = du),
					typeof K == "object" && K !== null && (j = Tn(K)),
					(x = a.getDerivedStateFromProps),
					(K = typeof x == "function" || typeof d.getSnapshotBeforeUpdate == "function") ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((y !== ue || F !== j) && xg(r, d, l, j)),
					(Ki = !1),
					(F = r.memoizedState),
					(d.state = F),
					Ml(r, l, d, c),
					Nl());
				var ee = r.memoizedState;
				y !== ue || F !== ee || Ki || (n !== null && n.dependencies !== null && Ps(n.dependencies))
					? (typeof x == "function" && (Ff(r, a, x, l), (ee = r.memoizedState)),
						(ne = Ki || Tg(r, a, ne, l, F, ee, j) || (n !== null && n.dependencies !== null && Ps(n.dependencies)))
							? (K ||
									(typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function") ||
									(typeof d.componentWillUpdate == "function" && d.componentWillUpdate(l, ee, j),
									typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(l, ee, j)),
								typeof d.componentDidUpdate == "function" && (r.flags |= 4),
								typeof d.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024))
							: (typeof d.componentDidUpdate != "function" ||
									(y === n.memoizedProps && F === n.memoizedState) ||
									(r.flags |= 4),
								typeof d.getSnapshotBeforeUpdate != "function" ||
									(y === n.memoizedProps && F === n.memoizedState) ||
									(r.flags |= 1024),
								(r.memoizedProps = l),
								(r.memoizedState = ee)),
						(d.props = l),
						(d.state = ee),
						(d.context = j),
						(l = ne))
					: (typeof d.componentDidUpdate != "function" ||
							(y === n.memoizedProps && F === n.memoizedState) ||
							(r.flags |= 4),
						typeof d.getSnapshotBeforeUpdate != "function" ||
							(y === n.memoizedProps && F === n.memoizedState) ||
							(r.flags |= 1024),
						(l = !1));
			}
			return (
				(d = l),
				co(n, r),
				(l = (r.flags & 128) !== 0),
				d || l
					? ((d = r.stateNode),
						(a = l && typeof a.getDerivedStateFromError != "function" ? null : d.render()),
						(r.flags |= 1),
						n !== null && l ? ((r.child = Ia(r, n.child, null, c)), (r.child = Ia(r, null, a, c))) : xn(n, r, a, c),
						(r.memoizedState = d.state),
						(n = r.child))
					: (n = mi(n, r, c)),
				n
			);
		}
		function Lg(n, r, a, l) {
			return (Na(), (r.flags |= 256), xn(n, r, a, l), r.child);
		}
		var td = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
		function nd(n) {
			return { baseLanes: n, cachePool: kv() };
		}
		function rd(n, r, a) {
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
				if (Fe) {
					if (
						(c ? Yi(r) : Gi(r),
						(n = Et)
							? ((n = Ky(n, kr)),
								(n = n !== null && n.data !== "&" ? n : null),
								n !== null &&
									((r.memoizedState = {
										dehydrated: n,
										treeContext: Zi !== null ? { id: Xr, overflow: Jr } : null,
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
					return (qd(n) ? (r.lanes = 32) : (r.lanes = 536870912), null);
				}
				var x = l.children;
				return (
					(l = l.fallback),
					c
						? (Gi(r),
							(c = r.mode),
							(x = fo({ mode: "hidden", children: x }, c)),
							(l = ka(l, c, a, null)),
							(x.return = r),
							(l.return = r),
							(x.sibling = l),
							(r.child = x),
							(l = r.child),
							(l.memoizedState = nd(a)),
							(l.childLanes = rd(n, y, a)),
							(r.memoizedState = td),
							Il(null, l))
						: (Yi(r), id(r, x))
				);
			}
			var j = n.memoizedState;
			if (j !== null && ((x = j.dehydrated), x !== null)) {
				if (d)
					r.flags & 256
						? (Yi(r), (r.flags &= -257), (r = ad(n, r, a)))
						: r.memoizedState !== null
							? (Gi(r), (r.child = n.child), (r.flags |= 128), (r = null))
							: (Gi(r),
								(x = l.fallback),
								(c = r.mode),
								(l = fo({ mode: "visible", children: l.children }, c)),
								(x = ka(x, c, a, null)),
								(x.flags |= 2),
								(l.return = r),
								(x.return = r),
								(l.sibling = x),
								(r.child = l),
								Ia(r, n.child, null, a),
								(l = r.child),
								(l.memoizedState = nd(a)),
								(l.childLanes = rd(n, y, a)),
								(r.memoizedState = td),
								(r = Il(null, l)));
				else if ((Yi(r), qd(x))) {
					if (((y = x.nextSibling && x.nextSibling.dataset), y)) var K = y.dgst;
					((y = K),
						(l = Error(s(419))),
						(l.stack = ""),
						(l.digest = y),
						Tl({ value: l, source: null, stack: null }),
						(r = ad(n, r, a)));
				} else if ((sn || gu(n, r, a, !1), (y = (a & n.childLanes) !== 0), sn || y)) {
					if (((y = _t), y !== null && ((l = Sa(y, a)), l !== 0 && l !== j.retryLane)))
						throw ((j.retryLane = l), Ca(n, l), er(y, n, l), Wf);
					(Ld(x) || So(), (r = ad(n, r, a)));
				} else
					Ld(x)
						? ((r.flags |= 192), (r.child = n.child), (r = null))
						: ((n = j.treeContext),
							(Et = Or(x.nextSibling)),
							(En = r),
							(Fe = !0),
							(Hi = null),
							(kr = !1),
							n !== null && Ev(r, n),
							(r = id(r, l.children)),
							(r.flags |= 4096));
				return r;
			}
			return c
				? (Gi(r),
					(x = l.fallback),
					(c = r.mode),
					(j = n.child),
					(K = j.sibling),
					(l = si(j, { mode: "hidden", children: l.children })),
					(l.subtreeFlags = j.subtreeFlags & 65011712),
					K !== null ? (x = si(K, x)) : ((x = ka(x, c, a, null)), (x.flags |= 2)),
					(x.return = r),
					(l.return = r),
					(l.sibling = x),
					(r.child = l),
					Il(null, l),
					(l = r.child),
					(x = n.child.memoizedState),
					x === null
						? (x = nd(a))
						: ((c = x.cachePool),
							c !== null ? ((j = un._currentValue), (c = c.parent !== j ? { parent: j, pool: j } : c)) : (c = kv()),
							(x = { baseLanes: x.baseLanes | a, cachePool: c })),
					(l.memoizedState = x),
					(l.childLanes = rd(n, y, a)),
					(r.memoizedState = td),
					Il(n.child, l))
				: (Yi(r),
					(a = n.child),
					(n = a.sibling),
					(a = si(a, { mode: "visible", children: l.children })),
					(a.return = r),
					(a.sibling = null),
					n !== null && ((y = r.deletions), y === null ? ((r.deletions = [n]), (r.flags |= 16)) : y.push(n)),
					(r.child = a),
					(r.memoizedState = null),
					a);
		}
		function id(n, r) {
			return ((r = fo({ mode: "visible", children: r }, n.mode)), (r.return = n), (n.child = r));
		}
		function fo(n, r) {
			return ((n = cr(22, n, null, r)), (n.lanes = 0), n);
		}
		function ad(n, r, a) {
			return (
				Ia(r, n.child, null, a),
				(n = id(r, r.pendingProps.children)),
				(n.flags |= 2),
				(r.memoizedState = null),
				n
			);
		}
		function Ug(n, r, a) {
			n.lanes |= r;
			var l = n.alternate;
			(l !== null && (l.lanes |= r), _f(n.return, r, a));
		}
		function ud(n, r, a, l, c, d) {
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
				se(Gt, y),
				xn(n, r, l, a),
				(l = Fe ? El : 0),
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
						((n = a.alternate), n !== null && Ws(n) === null && (c = a), (a = a.sibling));
					((a = c),
						a === null ? ((c = r.child), (r.child = null)) : ((c = a.sibling), (a.sibling = null)),
						ud(r, !1, c, a, d, l));
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (a = null, c = r.child, r.child = null; c !== null; ) {
						if (((n = c.alternate), n !== null && Ws(n) === null)) {
							r.child = c;
							break;
						}
						((n = c.sibling), (c.sibling = a), (a = c), (c = n));
					}
					ud(r, !0, a, null, d, l);
					break;
				case "together":
					ud(r, !1, null, null, void 0, l);
					break;
				default:
					r.memoizedState = null;
			}
			return r.child;
		}
		function mi(n, r, a) {
			if ((n !== null && (r.dependencies = n.dependencies), (Ji |= r.lanes), (a & r.childLanes) === 0))
				if (n !== null) {
					if ((gu(n, r, a, !1), (a & r.childLanes) === 0)) return null;
				} else return null;
			if (n !== null && r.child !== n.child) throw Error(s(153));
			if (r.child !== null) {
				for (n = r.child, a = si(n, n.pendingProps), r.child = a, a.return = r; n.sibling !== null; )
					((n = n.sibling), (a = a.sibling = si(n, n.pendingProps)), (a.return = r));
				a.sibling = null;
			}
			return r.child;
		}
		function ld(n, r) {
			return (n.lanes & r) !== 0 ? !0 : ((n = n.dependencies), !!(n !== null && Ps(n)));
		}
		function Tw(n, r, a) {
			switch (r.tag) {
				case 3:
					(Ue(r, r.stateNode.containerInfo), Qi(r, un, n.memoizedState.cache), Na());
					break;
				case 27:
				case 5:
					St(r);
					break;
				case 4:
					Ue(r, r.stateNode.containerInfo);
					break;
				case 10:
					Qi(r, r.type, r.memoizedProps.value);
					break;
				case 31:
					if (r.memoizedState !== null) return ((r.flags |= 128), Of(r), null);
					break;
				case 13:
					var l = r.memoizedState;
					if (l !== null)
						return l.dehydrated !== null
							? (Yi(r), (r.flags |= 128), null)
							: (a & r.child.childLanes) !== 0
								? qg(n, r, a)
								: (Yi(r), (n = mi(n, r, a)), n !== null ? n.sibling : null);
					Yi(r);
					break;
				case 19:
					var c = (n.flags & 128) !== 0;
					if (((l = (a & r.childLanes) !== 0), l || (gu(n, r, a, !1), (l = (a & r.childLanes) !== 0)), c)) {
						if (l) return $g(n, r, a);
						r.flags |= 128;
					}
					if (
						((c = r.memoizedState),
						c !== null && ((c.rendering = null), (c.tail = null), (c.lastEffect = null)),
						se(Gt, Gt.current),
						l)
					)
						break;
					return null;
				case 22:
					return ((r.lanes = 0), Og(n, r, a, r.pendingProps));
				case 24:
					Qi(r, un, n.memoizedState.cache);
			}
			return mi(n, r, a);
		}
		function Bg(n, r, a) {
			if (n !== null)
				if (n.memoizedProps !== r.pendingProps) sn = !0;
				else {
					if (!ld(n, a) && (r.flags & 128) === 0) return ((sn = !1), Tw(n, r, a));
					sn = (n.flags & 131072) !== 0;
				}
			else ((sn = !1), Fe && (r.flags & 1048576) !== 0 && wv(r, El, r.index));
			switch (((r.lanes = 0), r.tag)) {
				case 16:
					e: {
						var l = r.pendingProps;
						if (((n = Da(r.elementType)), (r.type = n), typeof n == "function"))
							df(n)
								? ((l = $a(n, l)), (r.tag = 1), (r = Ig(null, r, n, l, a)))
								: ((r.tag = 0), (r = ed(null, r, n, l, a)));
						else {
							if (n != null) {
								var c = n.$$typeof;
								if (c === O) {
									((r.tag = 11), (r = kg(null, r, n, l, a)));
									break e;
								} else if (c === D) {
									((r.tag = 14), (r = Ng(null, r, n, l, a)));
									break e;
								}
							}
							throw ((r = fe(n) || n), Error(s(306, r, "")));
						}
					}
					return r;
				case 0:
					return ed(n, r, r.type, r.pendingProps, a);
				case 1:
					return ((l = r.type), (c = $a(l, r.pendingProps)), Ig(n, r, l, c, a));
				case 3:
					e: {
						if ((Ue(r, r.stateNode.containerInfo), n === null)) throw Error(s(387));
						l = r.pendingProps;
						var d = r.memoizedState;
						((c = d.element), Rf(n, r), Ml(r, l, null, a));
						var y = r.memoizedState;
						if (
							((l = y.cache), Qi(r, un, l), l !== d.cache && Sf(r, [un], a, !0), Nl(), (l = y.element), d.isDehydrated)
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
								((c = Ar(Error(s(424)), r)), Tl(c), (r = Lg(n, r, l, a)));
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
									Et = Or(n.firstChild), En = r, Fe = !0, Hi = null, kr = !0, a = jv(r, null, l, a), r.child = a;
									a;
								)
									((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
							}
						else {
							if ((Na(), l === c)) {
								r = mi(n, r, a);
								break e;
							}
							xn(n, r, l, a);
						}
						r = r.child;
					}
					return r;
				case 26:
					return (
						co(n, r),
						n === null
							? (a = Wy(r.type, null, r.pendingProps, null))
								? (r.memoizedState = a)
								: Fe ||
									((a = r.type),
									(n = r.pendingProps),
									(l = Co(Te.current).createElement(a)),
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
						St(r),
						n === null &&
							Fe &&
							((l = r.stateNode = Fy(r.type, r.pendingProps, Te.current)),
							(En = r),
							(kr = !0),
							(c = Et),
							ra(r.type) ? ((Ud = c), (Et = Or(l.firstChild))) : (Et = c)),
						xn(n, r, r.pendingProps.children, a),
						co(n, r),
						n === null && (r.flags |= 4194304),
						r.child
					);
				case 5:
					return (
						n === null &&
							Fe &&
							((c = l = Et) &&
								((l = Jw(l, r.type, r.pendingProps, kr)),
								l !== null ? ((r.stateNode = l), (En = r), (Et = Or(l.firstChild)), (kr = !1), (c = !0)) : (c = !1)),
							c || Pi(r)),
						St(r),
						(c = r.type),
						(d = r.pendingProps),
						(y = n !== null ? n.memoizedProps : null),
						(l = d.children),
						Dd(c, d) ? (l = null) : y !== null && Dd(c, y) && (r.flags |= 32),
						r.memoizedState !== null && ((c = Df(n, r, dw, null, null, a)), (Xl._currentValue = c)),
						co(n, r),
						xn(n, r, l, a),
						r.child
					);
				case 6:
					return (
						n === null &&
							Fe &&
							((n = a = Et) &&
								((a = Ww(a, r.pendingProps, kr)),
								a !== null ? ((r.stateNode = a), (En = r), (Et = null), (n = !0)) : (n = !1)),
							n || Pi(r)),
						null
					);
				case 13:
					return qg(n, r, a);
				case 4:
					return (
						Ue(r, r.stateNode.containerInfo),
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
					return Ng(n, r, r.type, r.pendingProps, a);
				case 15:
					return Mg(n, r, r.type, r.pendingProps, a);
				case 19:
					return $g(n, r, a);
				case 31:
					return Ew(n, r, a);
				case 22:
					return Og(n, r, a, r.pendingProps);
				case 24:
					return (
						Oa(r),
						(l = Tn(un)),
						n === null
							? ((c = Tf()),
								c === null &&
									((c = _t),
									(d = wf()),
									(c.pooledCache = d),
									d.refCount++,
									d !== null && (c.pooledCacheLanes |= a),
									(c = d)),
								(r.memoizedState = { parent: l, cache: c }),
								Af(r),
								Qi(r, un, c))
							: ((n.lanes & a) !== 0 && (Rf(n, r), Ml(r, null, null, a), Nl()),
								(c = n.memoizedState),
								(d = r.memoizedState),
								c.parent !== l
									? ((c = { parent: l, cache: l }),
										(r.memoizedState = c),
										r.lanes === 0 && (r.memoizedState = r.updateQueue.baseState = c),
										Qi(r, un, l))
									: ((l = d.cache), Qi(r, un, l), l !== c.cache && Sf(r, [un], a, !0))),
						xn(n, r, r.pendingProps.children, a),
						r.child
					);
				case 29:
					throw r.pendingProps;
			}
			throw Error(s(156, r.tag));
		}
		function vi(n) {
			n.flags |= 4;
		}
		function sd(n, r, a, l, c) {
			if (((r = (n.mode & 32) !== 0) && (r = !1), r)) {
				if (((n.flags |= 16777216), (c & 335544128) === c))
					if (n.stateNode.complete) n.flags |= 8192;
					else if (my()) n.flags |= 8192;
					else throw ((ja = Gs), xf);
			} else n.flags &= -16777217;
		}
		function Vg(n, r) {
			if (r.type !== "stylesheet" || (r.state.loading & 4) !== 0) n.flags &= -16777217;
			else if (((n.flags |= 16777216), !ip(r)))
				if (my()) n.flags |= 8192;
				else throw ((ja = Gs), xf);
		}
		function ho(n, r) {
			(r !== null && (n.flags |= 4),
				n.flags & 16384 && ((r = n.tag !== 22 ? lr() : 536870912), (n.lanes |= r), (Cu |= r)));
		}
		function Ll(n, r) {
			if (!Fe)
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
		function xw(n, r, a) {
			var l = r.pendingProps;
			switch ((gf(r), r.tag)) {
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
						fi(un),
						Ye(),
						a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
						(n === null || n.child === null) &&
							(vu(r)
								? vi(r)
								: n === null || (n.memoizedState.isDehydrated && (r.flags & 256) === 0) || ((r.flags |= 1024), pf())),
						Tt(r),
						null
					);
				case 26:
					var c = r.type,
						d = r.memoizedState;
					return (
						n === null
							? (vi(r), d !== null ? (Tt(r), Vg(r, d)) : (Tt(r), sd(r, c, null, l, a)))
							: d
								? d !== n.memoizedState
									? (vi(r), Tt(r), Vg(r, d))
									: (Tt(r), (r.flags &= -16777217))
								: ((n = n.memoizedProps), n !== l && vi(r), Tt(r), sd(r, c, n, l, a)),
						null
					);
				case 27:
					if ((At(r), (a = Te.current), (c = r.type), n !== null && r.stateNode != null))
						n.memoizedProps !== l && vi(r);
					else {
						if (!l) {
							if (r.stateNode === null) throw Error(s(166));
							return (Tt(r), null);
						}
						((n = ae.current), vu(r) ? Tv(r, n) : ((n = Fy(c, l, a)), (r.stateNode = n), vi(r)));
					}
					return (Tt(r), null);
				case 5:
					if ((At(r), (c = r.type), n !== null && r.stateNode != null)) n.memoizedProps !== l && vi(r);
					else {
						if (!l) {
							if (r.stateNode === null) throw Error(s(166));
							return (Tt(r), null);
						}
						if (((d = ae.current), vu(r))) Tv(r, d);
						else {
							var y = Co(Te.current);
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
							l && vi(r);
						}
					}
					return (Tt(r), sd(r, r.type, n === null ? null : n.memoizedProps, r.pendingProps, a), null);
				case 6:
					if (n && r.stateNode != null) n.memoizedProps !== l && vi(r);
					else {
						if (typeof l != "string" && r.stateNode === null) throw Error(s(166));
						if (((n = Te.current), vu(r))) {
							if (((n = r.stateNode), (a = r.memoizedProps), (l = null), (c = En), c !== null))
								switch (c.tag) {
									case 27:
									case 5:
										l = c.memoizedProps;
								}
							((n[Dt] = r),
								(n = !!(n.nodeValue === a || (l !== null && l.suppressHydrationWarning === !0) || Uy(n.nodeValue, a))),
								n || Pi(r, !0));
						} else ((n = Co(n).createTextNode(l)), (n[Dt] = r), (r.stateNode = n));
					}
					return (Tt(r), null);
				case 31:
					if (((a = r.memoizedState), n === null || n.memoizedState !== null)) {
						if (((l = vu(r)), a !== null)) {
							if (n === null) {
								if (!l) throw Error(s(318));
								if (((n = r.memoizedState), (n = n !== null ? n.dehydrated : null), !n)) throw Error(s(557));
								n[Dt] = r;
							} else (Na(), (r.flags & 128) === 0 && (r.memoizedState = null), (r.flags |= 4));
							(Tt(r), (n = !1));
						} else
							((a = pf()), n !== null && n.memoizedState !== null && (n.memoizedState.hydrationErrors = a), (n = !0));
						if (!n) return r.flags & 256 ? (dr(r), r) : (dr(r), null);
						if ((r.flags & 128) !== 0) throw Error(s(558));
					}
					return (Tt(r), null);
				case 13:
					if (
						((l = r.memoizedState), n === null || (n.memoizedState !== null && n.memoizedState.dehydrated !== null))
					) {
						if (((c = vu(r)), l !== null && l.dehydrated !== null)) {
							if (n === null) {
								if (!c) throw Error(s(318));
								if (((c = r.memoizedState), (c = c !== null ? c.dehydrated : null), !c)) throw Error(s(317));
								c[Dt] = r;
							} else (Na(), (r.flags & 128) === 0 && (r.memoizedState = null), (r.flags |= 4));
							(Tt(r), (c = !1));
						} else
							((c = pf()), n !== null && n.memoizedState !== null && (n.memoizedState.hydrationErrors = c), (c = !0));
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
								ho(r, r.updateQueue),
								Tt(r),
								null)
					);
				case 4:
					return (Ye(), n === null && jy(r.stateNode.containerInfo), Tt(r), null);
				case 10:
					return (fi(r.type), Tt(r), null);
				case 19:
					if ((I(Gt), (l = r.memoizedState), l === null)) return (Tt(r), null);
					if (((c = (r.flags & 128) !== 0), (d = l.rendering), d === null))
						if (c) Ll(l, !1);
						else {
							if ($t !== 0 || (n !== null && (n.flags & 128) !== 0))
								for (n = r.child; n !== null; ) {
									if (((d = Ws(n)), d !== null)) {
										for (
											r.flags |= 128,
												Ll(l, !1),
												n = d.updateQueue,
												r.updateQueue = n,
												ho(r, n),
												r.subtreeFlags = 0,
												n = a,
												a = r.child;
											a !== null;
										)
											(bv(a, n), (a = a.sibling));
										return (se(Gt, (Gt.current & 1) | 2), Fe && oi(r, l.treeForkCount), r.child);
									}
									n = n.sibling;
								}
							l.tail !== null && Me() > po && ((r.flags |= 128), (c = !0), Ll(l, !1), (r.lanes = 4194304));
						}
					else {
						if (!c)
							if (((n = Ws(d)), n !== null)) {
								if (
									((r.flags |= 128),
									(c = !0),
									(n = n.updateQueue),
									(r.updateQueue = n),
									ho(r, n),
									Ll(l, !0),
									l.tail === null && l.tailMode === "hidden" && !d.alternate && !Fe)
								)
									return (Tt(r), null);
							} else
								2 * Me() - l.renderingStartTime > po &&
									a !== 536870912 &&
									((r.flags |= 128), (c = !0), Ll(l, !1), (r.lanes = 4194304));
						l.isBackwards
							? ((d.sibling = r.child), (r.child = d))
							: ((n = l.last), n !== null ? (n.sibling = d) : (r.child = d), (l.last = d));
					}
					return l.tail !== null
						? ((n = l.tail),
							(l.rendering = n),
							(l.tail = n.sibling),
							(l.renderingStartTime = Me()),
							(n.sibling = null),
							(a = Gt.current),
							se(Gt, c ? (a & 1) | 2 : a & 1),
							Fe && oi(r, l.treeForkCount),
							n)
						: (Tt(r), null);
				case 22:
				case 23:
					return (
						dr(r),
						Mf(),
						(l = r.memoizedState !== null),
						n !== null ? (n.memoizedState !== null) !== l && (r.flags |= 8192) : l && (r.flags |= 8192),
						l
							? (a & 536870912) !== 0 && (r.flags & 128) === 0 && (Tt(r), r.subtreeFlags & 6 && (r.flags |= 8192))
							: Tt(r),
						(a = r.updateQueue),
						a !== null && ho(r, a.retryQueue),
						(a = null),
						n !== null &&
							n.memoizedState !== null &&
							n.memoizedState.cachePool !== null &&
							(a = n.memoizedState.cachePool.pool),
						(l = null),
						r.memoizedState !== null && r.memoizedState.cachePool !== null && (l = r.memoizedState.cachePool.pool),
						l !== a && (r.flags |= 2048),
						n !== null && I(za),
						null
					);
				case 24:
					return (
						(a = null),
						n !== null && (a = n.memoizedState.cache),
						r.memoizedState.cache !== a && (r.flags |= 2048),
						fi(un),
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
		function Aw(n, r) {
			switch ((gf(r), r.tag)) {
				case 1:
					return ((n = r.flags), n & 65536 ? ((r.flags = (n & -65537) | 128), r) : null);
				case 3:
					return (
						fi(un),
						Ye(),
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
						Na();
					}
					return ((n = r.flags), n & 65536 ? ((r.flags = (n & -65537) | 128), r) : null);
				case 13:
					if ((dr(r), (n = r.memoizedState), n !== null && n.dehydrated !== null)) {
						if (r.alternate === null) throw Error(s(340));
						Na();
					}
					return ((n = r.flags), n & 65536 ? ((r.flags = (n & -65537) | 128), r) : null);
				case 19:
					return (I(Gt), null);
				case 4:
					return (Ye(), null);
				case 10:
					return (fi(r.type), null);
				case 22:
				case 23:
					return (
						dr(r),
						Mf(),
						n !== null && I(za),
						(n = r.flags),
						n & 65536 ? ((r.flags = (n & -65537) | 128), r) : null
					);
				case 24:
					return (fi(un), null);
				case 25:
					return null;
				default:
					return null;
			}
		}
		function Zg(n, r) {
			switch ((gf(r), r.tag)) {
				case 3:
					(fi(un), Ye());
					break;
				case 26:
				case 27:
				case 5:
					At(r);
					break;
				case 4:
					Ye();
					break;
				case 31:
					r.memoizedState !== null && dr(r);
					break;
				case 13:
					dr(r);
					break;
				case 19:
					I(Gt);
					break;
				case 10:
					fi(r.type);
					break;
				case 22:
				case 23:
					(dr(r), Mf(), n !== null && I(za));
					break;
				case 24:
					fi(un);
			}
		}
		function ql(n, r) {
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
				ft(r, r.return, x);
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
								var j = a,
									K = x;
								try {
									K();
								} catch (ne) {
									ft(c, j, ne);
								}
							}
						}
						l = l.next;
					} while (l !== d);
				}
			} catch (ne) {
				ft(r, r.return, ne);
			}
		}
		function Hg(n) {
			var r = n.updateQueue;
			if (r !== null) {
				var a = n.stateNode;
				try {
					Lv(r, a);
				} catch (l) {
					ft(n, n.return, l);
				}
			}
		}
		function Pg(n, r, a) {
			((a.props = $a(n.type, n.memoizedProps)), (a.state = n.memoizedState));
			try {
				a.componentWillUnmount();
			} catch (l) {
				ft(n, r, l);
			}
		}
		function Ul(n, r) {
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
				ft(n, r, c);
			}
		}
		function Wr(n, r) {
			var a = n.ref,
				l = n.refCleanup;
			if (a !== null)
				if (typeof l == "function")
					try {
						l();
					} catch (c) {
						ft(n, r, c);
					} finally {
						((n.refCleanup = null), (n = n.alternate), n != null && (n.refCleanup = null));
					}
				else if (typeof a == "function")
					try {
						a(null);
					} catch (c) {
						ft(n, r, c);
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
				ft(n, n.return, c);
			}
		}
		function od(n, r, a) {
			try {
				var l = n.stateNode;
				(Qw(l, n.type, a, r), (l[rn] = r));
			} catch (c) {
				ft(n, n.return, c);
			}
		}
		function Kg(n) {
			return n.tag === 5 || n.tag === 3 || n.tag === 26 || (n.tag === 27 && ra(n.type)) || n.tag === 4;
		}
		function cd(n) {
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
		function fd(n, r, a) {
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
				for (fd(n, r, a), n = n.sibling; n !== null; ) (fd(n, r, a), (n = n.sibling));
		}
		function mo(n, r, a) {
			var l = n.tag;
			if (l === 5 || l === 6) ((n = n.stateNode), r ? a.insertBefore(n, r) : a.appendChild(n));
			else if (l !== 4 && (l === 27 && ra(n.type) && (a = n.stateNode), (n = n.child), n !== null))
				for (mo(n, r, a), n = n.sibling; n !== null; ) (mo(n, r, a), (n = n.sibling));
		}
		function Yg(n) {
			var r = n.stateNode,
				a = n.memoizedProps;
			try {
				for (var l = n.type, c = r.attributes; c.length; ) r.removeAttributeNode(c[0]);
				(An(r, l, a), (r[Dt] = n), (r[rn] = a));
			} catch (d) {
				ft(n, n.return, d);
			}
		}
		var gi = !1,
			on = !1,
			dd = !1,
			Gg = typeof WeakSet == "function" ? WeakSet : Set,
			bn = null;
		function Rw(n, r) {
			if (((n = n.containerInfo), (Od = jo), (n = cv(n)), af(n))) {
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
								j = -1,
								K = 0,
								ne = 0,
								ue = n,
								F = null;
							t: for (;;) {
								for (
									var ee;
									ue !== a || (c !== 0 && ue.nodeType !== 3) || (x = y + c),
										ue !== d || (l !== 0 && ue.nodeType !== 3) || (j = y + l),
										ue.nodeType === 3 && (y += ue.nodeValue.length),
										(ee = ue.firstChild) !== null;
								)
									((F = ue), (ue = ee));
								for (;;) {
									if (ue === n) break t;
									if (
										(F === a && ++K === c && (x = y), F === d && ++ne === l && (j = y), (ee = ue.nextSibling) !== null)
									)
										break;
									((ue = F), (F = ue.parentNode));
								}
								ue = ee;
							}
							a = x === -1 || j === -1 ? null : { start: x, end: j };
						} else a = null;
					}
				a = a || { start: 0, end: 0 };
			} else a = null;
			for (zd = { focusedElem: n, selectionRange: a }, jo = !1, bn = r; bn !== null; )
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
									} catch (Ne) {
										ft(a, a.return, Ne);
									}
								}
								break;
							case 3:
								if ((n & 1024) !== 0) {
									if (((n = r.stateNode.containerInfo), (a = n.nodeType), a === 9)) Id(n);
									else if (a === 1)
										switch (n.nodeName) {
											case "HEAD":
											case "HTML":
											case "BODY":
												Id(n);
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
					(pi(n, a), l & 4 && ql(5, a));
					break;
				case 1:
					if ((pi(n, a), l & 4))
						if (((n = a.stateNode), r === null))
							try {
								n.componentDidMount();
							} catch (y) {
								ft(a, a.return, y);
							}
						else {
							var c = $a(a.type, r.memoizedProps);
							r = r.memoizedState;
							try {
								n.componentDidUpdate(c, r, n.__reactInternalSnapshotBeforeUpdate);
							} catch (y) {
								ft(a, a.return, y);
							}
						}
					(l & 64 && Hg(a), l & 512 && Ul(a, a.return));
					break;
				case 3:
					if ((pi(n, a), l & 64 && ((n = a.updateQueue), n !== null))) {
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
							ft(a, a.return, y);
						}
					}
					break;
				case 27:
					r === null && l & 4 && Yg(a);
				case 26:
				case 5:
					(pi(n, a), r === null && l & 4 && Qg(a), l & 512 && Ul(a, a.return));
					break;
				case 12:
					pi(n, a);
					break;
				case 31:
					(pi(n, a), l & 4 && Wg(n, a));
					break;
				case 13:
					(pi(n, a),
						l & 4 && ey(n, a),
						l & 64 &&
							((n = a.memoizedState),
							n !== null && ((n = n.dehydrated), n !== null && ((a = Iw.bind(null, a)), e1(n, a)))));
					break;
				case 22:
					if (((l = a.memoizedState !== null || gi), !l)) {
						((r = (r !== null && r.memoizedState !== null) || on), (c = gi));
						var d = on;
						((gi = l), (on = r) && !d ? bi(n, a, (a.subtreeFlags & 8772) !== 0) : pi(n, a), (gi = c), (on = d));
					}
					break;
				case 30:
					break;
				default:
					pi(n, a);
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
		function yi(n, r, a) {
			for (a = a.child; a !== null; ) (Jg(n, r, a), (a = a.sibling));
		}
		function Jg(n, r, a) {
			if (pt && typeof pt.onCommitFiberUnmount == "function")
				try {
					pt.onCommitFiberUnmount(kn, a);
				} catch {}
			switch (a.tag) {
				case 26:
					(on || Wr(a, r),
						yi(n, r, a),
						a.memoizedState
							? a.memoizedState.count--
							: a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
					break;
				case 27:
					on || Wr(a, r);
					var l = kt,
						c = Fn;
					(ra(a.type) && ((kt = a.stateNode), (Fn = !1)), yi(n, r, a), Yl(a.stateNode), (kt = l), (Fn = c));
					break;
				case 5:
					on || Wr(a, r);
				case 6:
					if (((l = kt), (c = Fn), (kt = null), yi(n, r, a), (kt = l), (Fn = c), kt !== null))
						if (Fn)
							try {
								(kt.nodeType === 9 ? kt.body : kt.nodeName === "HTML" ? kt.ownerDocument.body : kt).removeChild(
									a.stateNode,
								);
							} catch (d) {
								ft(a, r, d);
							}
						else
							try {
								kt.removeChild(a.stateNode);
							} catch (d) {
								ft(a, r, d);
							}
					break;
				case 18:
					kt !== null &&
						(Fn
							? ((n = kt),
								Py(n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, a.stateNode),
								Iu(n))
							: Py(kt, a.stateNode));
					break;
				case 4:
					((l = kt), (c = Fn), (kt = a.stateNode.containerInfo), (Fn = !0), yi(n, r, a), (kt = l), (Fn = c));
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					(Fi(2, a, r), on || Fi(4, a, r), yi(n, r, a));
					break;
				case 1:
					(on || (Wr(a, r), (l = a.stateNode), typeof l.componentWillUnmount == "function" && Pg(a, r, l)),
						yi(n, r, a));
					break;
				case 21:
					yi(n, r, a);
					break;
				case 22:
					((on = (l = on) || a.memoizedState !== null), yi(n, r, a), (on = l));
					break;
				default:
					yi(n, r, a);
			}
		}
		function Wg(n, r) {
			if (r.memoizedState === null && ((n = r.alternate), n !== null && ((n = n.memoizedState), n !== null))) {
				n = n.dehydrated;
				try {
					Iu(n);
				} catch (a) {
					ft(r, r.return, a);
				}
			}
		}
		function ey(n, r) {
			if (
				r.memoizedState === null &&
				((n = r.alternate), n !== null && ((n = n.memoizedState), n !== null && ((n = n.dehydrated), n !== null)))
			)
				try {
					Iu(n);
				} catch (a) {
					ft(r, r.return, a);
				}
		}
		function Cw(n) {
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
		function vo(n, r) {
			var a = Cw(n);
			r.forEach(function (l) {
				if (!a.has(l)) {
					a.add(l);
					var c = Lw.bind(null, n, l);
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
		var Hr = null;
		function ty(n, r) {
			var a = n.alternate,
				l = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					(Xn(r, n), Jn(n), l & 4 && (Fi(3, n, n.return), ql(3, n), Fi(5, n, n.return)));
					break;
				case 1:
					(Xn(r, n),
						Jn(n),
						l & 512 && (on || a === null || Wr(a, a.return)),
						l & 64 &&
							gi &&
							((n = n.updateQueue),
							n !== null &&
								((l = n.callbacks),
								l !== null &&
									((a = n.shared.hiddenCallbacks), (n.shared.hiddenCallbacks = a === null ? l : a.concat(l))))));
					break;
				case 26:
					var c = Hr;
					if ((Xn(r, n), Jn(n), l & 512 && (on || a === null || Wr(a, a.return)), l & 4)) {
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
								: l === null && n.stateNode !== null && od(n, n.memoizedProps, a.memoizedProps);
					}
					break;
				case 27:
					(Xn(r, n),
						Jn(n),
						l & 512 && (on || a === null || Wr(a, a.return)),
						a !== null && l & 4 && od(n, n.memoizedProps, a.memoizedProps));
					break;
				case 5:
					if ((Xn(r, n), Jn(n), l & 512 && (on || a === null || Wr(a, a.return)), n.flags & 32)) {
						c = n.stateNode;
						try {
							Br(c, "");
						} catch (_e) {
							ft(n, n.return, _e);
						}
					}
					(l & 4 && n.stateNode != null && ((c = n.memoizedProps), od(n, c, a !== null ? a.memoizedProps : c)),
						l & 1024 && (dd = !0));
					break;
				case 6:
					if ((Xn(r, n), Jn(n), l & 4)) {
						if (n.stateNode === null) throw Error(s(162));
						((l = n.memoizedProps), (a = n.stateNode));
						try {
							a.nodeValue = l;
						} catch (_e) {
							ft(n, n.return, _e);
						}
					}
					break;
				case 3:
					if (
						((Mo = null),
						(c = Hr),
						(Hr = ko(r.containerInfo)),
						Xn(r, n),
						(Hr = c),
						Jn(n),
						l & 4 && a !== null && a.memoizedState.isDehydrated)
					)
						try {
							Iu(r.containerInfo);
						} catch (_e) {
							ft(n, n.return, _e);
						}
					dd && ((dd = !1), ny(n));
					break;
				case 4:
					((l = Hr), (Hr = ko(n.stateNode.containerInfo)), Xn(r, n), Jn(n), (Hr = l));
					break;
				case 12:
					(Xn(r, n), Jn(n));
					break;
				case 31:
					(Xn(r, n), Jn(n), l & 4 && ((l = n.updateQueue), l !== null && ((n.updateQueue = null), vo(n, l))));
					break;
				case 13:
					(Xn(r, n),
						Jn(n),
						n.child.flags & 8192 &&
							(n.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
							(yo = Me()),
						l & 4 && ((l = n.updateQueue), l !== null && ((n.updateQueue = null), vo(n, l))));
					break;
				case 22:
					c = n.memoizedState !== null;
					var j = a !== null && a.memoizedState !== null,
						K = gi,
						ne = on;
					if (((gi = K || c), (on = ne || j), Xn(r, n), (on = ne), (gi = K), Jn(n), l & 8192))
						e: for (
							r = n.stateNode,
								r._visibility = c ? r._visibility & -2 : r._visibility | 1,
								c && (a === null || j || gi || on || Ba(n)),
								a = null,
								r = n;
							;
						) {
							if (r.tag === 5 || r.tag === 26) {
								if (a === null) {
									j = a = r;
									try {
										if (((d = j.stateNode), c))
											((y = d.style),
												typeof y.setProperty == "function"
													? y.setProperty("display", "none", "important")
													: (y.display = "none"));
										else {
											x = j.stateNode;
											var ue = j.memoizedProps.style,
												F = ue != null && ue.hasOwnProperty("display") ? ue.display : null;
											x.style.display = F == null || typeof F == "boolean" ? "" : ("" + F).trim();
										}
									} catch (_e) {
										ft(j, j.return, _e);
									}
								}
							} else if (r.tag === 6) {
								if (a === null) {
									j = r;
									try {
										j.stateNode.nodeValue = c ? "" : j.memoizedProps;
									} catch (_e) {
										ft(j, j.return, _e);
									}
								}
							} else if (r.tag === 18) {
								if (a === null) {
									j = r;
									try {
										var ee = j.stateNode;
										c ? Qy(ee, !0) : Qy(j.stateNode, !1);
									} catch (_e) {
										ft(j, j.return, _e);
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
						((l = n.updateQueue), l !== null && ((a = l.retryQueue), a !== null && ((l.retryQueue = null), vo(n, a))));
					break;
				case 19:
					(Xn(r, n), Jn(n), l & 4 && ((l = n.updateQueue), l !== null && ((n.updateQueue = null), vo(n, l))));
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
							mo(n, cd(n), c);
							break;
						case 5:
							var d = a.stateNode;
							(a.flags & 32 && (Br(d, ""), (a.flags &= -33)), mo(n, cd(n), d));
							break;
						case 3:
						case 4:
							var y = a.stateNode.containerInfo;
							fd(n, cd(n), y);
							break;
						default:
							throw Error(s(161));
					}
				} catch (x) {
					ft(n, n.return, x);
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
		function pi(n, r) {
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
						Wr(r, r.return);
						var a = r.stateNode;
						(typeof a.componentWillUnmount == "function" && Pg(r, r.return, a), Ba(r));
						break;
					case 27:
						Yl(r.stateNode);
					case 26:
					case 5:
						(Wr(r, r.return), Ba(r));
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
		function bi(n, r, a) {
			for (a = a && (r.subtreeFlags & 8772) !== 0, r = r.child; r !== null; ) {
				var l = r.alternate,
					c = n,
					d = r,
					y = d.flags;
				switch (d.tag) {
					case 0:
					case 11:
					case 15:
						(bi(c, d, a), ql(4, d));
						break;
					case 1:
						if ((bi(c, d, a), (l = d), (c = l.stateNode), typeof c.componentDidMount == "function"))
							try {
								c.componentDidMount();
							} catch (K) {
								ft(l, l.return, K);
							}
						if (((l = d), (c = l.updateQueue), c !== null)) {
							var x = l.stateNode;
							try {
								var j = c.shared.hiddenCallbacks;
								if (j !== null) for (c.shared.hiddenCallbacks = null, c = 0; c < j.length; c++) Iv(j[c], x);
							} catch (K) {
								ft(l, l.return, K);
							}
						}
						(a && y & 64 && Hg(d), Ul(d, d.return));
						break;
					case 27:
						Yg(d);
					case 26:
					case 5:
						(bi(c, d, a), a && l === null && y & 4 && Qg(d), Ul(d, d.return));
						break;
					case 12:
						bi(c, d, a);
						break;
					case 31:
						(bi(c, d, a), a && y & 4 && Wg(c, d));
						break;
					case 13:
						(bi(c, d, a), a && y & 4 && ey(c, d));
						break;
					case 22:
						(d.memoizedState === null && bi(c, d, a), Ul(d, d.return));
						break;
					case 30:
						break;
					default:
						bi(c, d, a);
				}
				r = r.sibling;
			}
		}
		function hd(n, r) {
			var a = null;
			(n !== null &&
				n.memoizedState !== null &&
				n.memoizedState.cachePool !== null &&
				(a = n.memoizedState.cachePool.pool),
				(n = null),
				r.memoizedState !== null && r.memoizedState.cachePool !== null && (n = r.memoizedState.cachePool.pool),
				n !== a && (n != null && n.refCount++, a != null && xl(a)));
		}
		function md(n, r) {
			((n = null),
				r.alternate !== null && (n = r.alternate.memoizedState.cache),
				(r = r.memoizedState.cache),
				r !== n && (r.refCount++, n != null && xl(n)));
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
					(Pr(n, r, a, l), c & 2048 && ql(9, r));
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
							r !== n && (r.refCount++, n != null && xl(n))));
					break;
				case 12:
					if (c & 2048) {
						(Pr(n, r, a, l), (n = r.stateNode));
						try {
							var d = r.memoizedProps,
								y = d.id,
								x = d.onPostCommit;
							typeof x == "function" && x(y, r.alternate === null ? "mount" : "update", n.passiveEffectDuration, -0);
						} catch (j) {
							ft(r, r.return, j);
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
								: $l(n, r)
							: d._visibility & 2
								? Pr(n, r, a, l)
								: ((d._visibility |= 2), xu(n, r, a, l, (r.subtreeFlags & 10256) !== 0 || !1)),
						c & 2048 && hd(y, r));
					break;
				case 24:
					(Pr(n, r, a, l), c & 2048 && md(r.alternate, r));
					break;
				default:
					Pr(n, r, a, l);
			}
		}
		function xu(n, r, a, l, c) {
			for (c = c && ((r.subtreeFlags & 10256) !== 0 || !1), r = r.child; r !== null; ) {
				var d = n,
					y = r,
					x = a,
					j = l,
					K = y.flags;
				switch (y.tag) {
					case 0:
					case 11:
					case 15:
						(xu(d, y, x, j, c), ql(8, y));
						break;
					case 23:
						break;
					case 22:
						var ne = y.stateNode;
						(y.memoizedState !== null
							? ne._visibility & 2
								? xu(d, y, x, j, c)
								: $l(d, y)
							: ((ne._visibility |= 2), xu(d, y, x, j, c)),
							c && K & 2048 && hd(y.alternate, y));
						break;
					case 24:
						(xu(d, y, x, j, c), c && K & 2048 && md(y.alternate, y));
						break;
					default:
						xu(d, y, x, j, c);
				}
				r = r.sibling;
			}
		}
		function $l(n, r) {
			if (r.subtreeFlags & 10256)
				for (r = r.child; r !== null; ) {
					var a = n,
						l = r,
						c = l.flags;
					switch (l.tag) {
						case 22:
							($l(a, l), c & 2048 && hd(l.alternate, l));
							break;
						case 24:
							($l(a, l), c & 2048 && md(l.alternate, l));
							break;
						default:
							$l(a, l);
					}
					r = r.sibling;
				}
		}
		var Bl = 8192;
		function Au(n, r, a) {
			if (n.subtreeFlags & Bl) for (n = n.child; n !== null; ) (iy(n, r, a), (n = n.sibling));
		}
		function iy(n, r, a) {
			switch (n.tag) {
				case 26:
					(Au(n, r, a), n.flags & Bl && n.memoizedState !== null && d1(a, Hr, n.memoizedState, n.memoizedProps));
					break;
				case 5:
					Au(n, r, a);
					break;
				case 3:
				case 4:
					var l = Hr;
					((Hr = ko(n.stateNode.containerInfo)), Au(n, r, a), (Hr = l));
					break;
				case 22:
					n.memoizedState === null &&
						((l = n.alternate),
						l !== null && l.memoizedState !== null ? ((l = Bl), (Bl = 16777216), Au(n, r, a), (Bl = l)) : Au(n, r, a));
					break;
				default:
					Au(n, r, a);
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
		function Vl(n) {
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
					(Vl(n), n.flags & 2048 && Fi(9, n, n.return));
					break;
				case 3:
					Vl(n);
					break;
				case 12:
					Vl(n);
					break;
				case 22:
					var r = n.stateNode;
					n.memoizedState !== null && r._visibility & 2 && (n.return === null || n.return.tag !== 13)
						? ((r._visibility &= -3), go(n))
						: Vl(n);
					break;
				default:
					Vl(n);
			}
		}
		function go(n) {
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
						(Fi(8, r, r.return), go(r));
						break;
					case 22:
						((a = r.stateNode), a._visibility & 2 && ((a._visibility &= -3), go(r)));
						break;
					default:
						go(r);
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
						xl(a.memoizedState.cache);
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
		var kw = {
				getCacheForType: function (n) {
					var r = Tn(un),
						a = r.data.get(n);
					return (a === void 0 && ((a = n()), r.data.set(n, a)), a);
				},
				cacheSignal: function () {
					return Tn(un).controller.signal;
				},
			},
			Nw = typeof WeakMap == "function" ? WeakMap : Map,
			lt = 0,
			_t = null,
			Be = null,
			Pe = 0,
			ct = 0,
			hr = null,
			Xi = !1,
			Ru = !1,
			vd = !1,
			_i = 0,
			$t = 0,
			Ji = 0,
			Va = 0,
			gd = 0,
			mr = 0,
			Cu = 0,
			Zl = null,
			Wn = null,
			yd = !1,
			yo = 0,
			sy = 0,
			po = 1 / 0,
			bo = null,
			Wi = null,
			gn = 0,
			ea = null,
			ku = null,
			Si = 0,
			pd = 0,
			bd = null,
			oy = null,
			Hl = 0,
			_d = null;
		function Mr() {
			return (lt & 2) !== 0 && Pe !== 0 ? Pe & -Pe : $.T !== null ? Ad() : Li();
		}
		function cy() {
			if (mr === 0)
				if ((Pe & 536870912) === 0 || Fe) {
					var n = Ht;
					((Ht <<= 1), (Ht & 3932160) === 0 && (Ht = 262144), (mr = n));
				} else mr = 536870912;
			return ((n = fr.current), n !== null && (n.flags |= 32), mr);
		}
		function er(n, r, a) {
			(((n === _t && (ct === 2 || ct === 9)) || n.cancelPendingCommit !== null) && (Nu(n, 0), ta(n, Pe, mr, !1)),
				jn(n, a),
				((lt & 2) === 0 || n !== _t) &&
					(n === _t && ((lt & 2) === 0 && (Va |= a), $t === 4 && ta(n, Pe, mr, !1)), wi(n)));
		}
		function fy(n, r, a) {
			if ((lt & 6) !== 0) throw Error(s(327));
			var l = (!a && (r & 127) === 0 && (r & n.expiredLanes) === 0) || Sn(n, r),
				c = l ? zw(n, r) : wd(n, r, !0),
				d = l;
			do {
				if (c === 0) {
					Ru && !l && ta(n, r, 0, !1);
					break;
				} else {
					if (((a = n.current.alternate), d && !Mw(a))) {
						((c = wd(n, r, !1)), (d = !1));
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
								var j = x.current.memoizedState.isDehydrated;
								if ((j && (Nu(x, y).flags |= 256), (y = wd(x, y, !1)), y !== 2)) {
									if (vd && !j) {
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
						if ((r & 62914560) === r && ((c = yo + 300 - Me()), 10 < c)) {
							if ((ta(l, r, mr, !Xi), ur(l, 0, !0) !== 0)) break e;
							((Si = r),
								(l.timeoutHandle = Zy(dy.bind(null, l, a, Wn, bo, yd, r, mr, Va, Cu, Xi, d, "Throttled", -0, 0), c)));
							break e;
						}
						dy(l, a, Wn, bo, yd, r, mr, Va, Cu, Xi, d, null, -0, 0);
					}
				}
				break;
			} while (!0);
			wi(n);
		}
		function dy(n, r, a, l, c, d, y, x, j, K, ne, ue, F, ee) {
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
				var _e = (d & 62914560) === d ? yo - Me() : (d & 4194048) === d ? sy - Me() : 0;
				if (((_e = h1(ue, _e)), _e !== null)) {
					((Si = d),
						(n.cancelPendingCommit = _e(_y.bind(null, n, r, d, a, l, c, y, x, j, ne, ue, null, F, ee))),
						ta(n, d, y, !K));
					return;
				}
			}
			_y(n, r, d, a, l, c, y, x, j);
		}
		function Mw(n) {
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
			((r &= ~gd),
				(r &= ~Va),
				(n.suspendedLanes |= r),
				(n.pingedLanes &= ~r),
				l && (n.warmLanes |= r),
				(l = n.expirationTimes));
			for (var c = r; 0 < c; ) {
				var d = 31 - ot(c),
					y = 1 << d;
				((l[d] = -1), (c &= ~y));
			}
			a !== 0 && Lt(n, a, r);
		}
		function _o() {
			return (lt & 6) === 0 ? (Pl(0, !1), !1) : !0;
		}
		function Sd() {
			if (Be !== null) {
				if (ct === 0) var n = Be.return;
				else ((n = Be), (ci = Ma = null), Lf(n), (_u = null), (Rl = 0), (n = Be));
				for (; n !== null; ) (Zg(n.alternate, n), (n = n.return));
				Be = null;
			}
		}
		function Nu(n, r) {
			var a = n.timeoutHandle;
			(a !== -1 && ((n.timeoutHandle = -1), Gw(a)),
				(a = n.cancelPendingCommit),
				a !== null && ((n.cancelPendingCommit = null), a()),
				(Si = 0),
				Sd(),
				(_t = n),
				(Be = a = si(n.current, null)),
				(Pe = r),
				(ct = 0),
				(hr = null),
				(Xi = !1),
				(Ru = Sn(n, r)),
				(vd = !1),
				(Cu = mr = gd = Va = Ji = $t = 0),
				(Wn = Zl = null),
				(yd = !1),
				(r & 8) !== 0 && (r |= r & 32));
			var l = n.entangledLanes;
			if (l !== 0)
				for (n = n.entanglements, l &= r; 0 < l; ) {
					var c = 31 - ot(l),
						d = 1 << c;
					((r |= n[c]), (l &= ~d));
				}
			return ((_i = r), $s(), a);
		}
		function hy(n, r) {
			((Le = null),
				($.H = jl),
				r === bu || r === Ys
					? ((r = Ov()), (ct = 3))
					: r === xf
						? ((r = Ov()), (ct = 4))
						: (ct = r === Wf ? 8 : r !== null && typeof r == "object" && typeof r.then == "function" ? 6 : 1),
				(hr = r),
				Be === null && (($t = 1), so(n, Ar(r, n.current))));
		}
		function my() {
			var n = fr.current;
			return n === null
				? !0
				: (Pe & 4194048) === Pe
					? Nr === null
					: (Pe & 62914560) === Pe || (Pe & 536870912) !== 0
						? n === Nr
						: !1;
		}
		function vy() {
			var n = $.H;
			return (($.H = jl), n === null ? jl : n);
		}
		function gy() {
			var n = $.A;
			return (($.A = kw), n);
		}
		function So() {
			(($t = 4),
				Xi || ((Pe & 4194048) !== Pe && fr.current !== null) || (Ru = !0),
				((Ji & 134217727) === 0 && (Va & 134217727) === 0) || _t === null || ta(_t, Pe, mr, !1));
		}
		function wd(n, r, a) {
			var l = lt;
			lt |= 2;
			var c = vy(),
				d = gy();
			((_t !== n || Pe !== r) && ((bo = null), Nu(n, r)), (r = !1));
			var y = $t;
			e: do
				try {
					if (ct !== 0 && Be !== null) {
						var x = Be,
							j = hr;
						switch (ct) {
							case 8:
								(Sd(), (y = 6));
								break e;
							case 3:
							case 2:
							case 9:
							case 6:
								fr.current === null && (r = !0);
								var K = ct;
								if (((ct = 0), (hr = null), Mu(n, x, j, K), a && Ru)) {
									y = 0;
									break e;
								}
								break;
							default:
								((K = ct), (ct = 0), (hr = null), Mu(n, x, j, K));
						}
					}
					(Ow(), (y = $t));
					break;
				} catch (ne) {
					hy(n, ne);
				}
			while (!0);
			return (
				r && n.shellSuspendCounter++,
				(ci = Ma = null),
				(lt = l),
				($.H = c),
				($.A = d),
				Be === null && ((_t = null), (Pe = 0), $s()),
				y
			);
		}
		function Ow() {
			for (; Be !== null; ) yy(Be);
		}
		function zw(n, r) {
			var a = lt;
			lt |= 2;
			var l = vy(),
				c = gy();
			_t !== n || Pe !== r ? ((bo = null), (po = Me() + 500), Nu(n, r)) : (Ru = Sn(n, r));
			e: do
				try {
					if (ct !== 0 && Be !== null) {
						r = Be;
						var d = hr;
						t: switch (ct) {
							case 1:
								((ct = 0), (hr = null), Mu(n, r, d, 1));
								break;
							case 2:
							case 9:
								if (Nv(d)) {
									((ct = 0), (hr = null), py(r));
									break;
								}
								((r = function () {
									((ct !== 2 && ct !== 9) || _t !== n || (ct = 7), wi(n));
								}),
									d.then(r, r));
								break e;
							case 3:
								ct = 7;
								break e;
							case 4:
								ct = 5;
								break e;
							case 7:
								Nv(d) ? ((ct = 0), (hr = null), py(r)) : ((ct = 0), (hr = null), Mu(n, r, d, 7));
								break;
							case 5:
								var y = null;
								switch (Be.tag) {
									case 26:
										y = Be.memoizedState;
									case 5:
									case 27:
										var x = Be;
										if (y ? ip(y) : x.stateNode.complete) {
											((ct = 0), (hr = null));
											var j = x.sibling;
											if (j !== null) Be = j;
											else {
												var K = x.return;
												K !== null ? ((Be = K), wo(K)) : (Be = null);
											}
											break t;
										}
								}
								((ct = 0), (hr = null), Mu(n, r, d, 5));
								break;
							case 6:
								((ct = 0), (hr = null), Mu(n, r, d, 6));
								break;
							case 8:
								(Sd(), ($t = 6));
								break e;
							default:
								throw Error(s(462));
						}
					}
					Dw();
					break;
				} catch (ne) {
					hy(n, ne);
				}
			while (!0);
			return ((ci = Ma = null), ($.H = l), ($.A = c), (lt = a), Be !== null ? 0 : ((_t = null), (Pe = 0), $s(), $t));
		}
		function Dw() {
			for (; Be !== null && !ze(); ) yy(Be);
		}
		function yy(n) {
			var r = Bg(n.alternate, n, _i);
			((n.memoizedProps = n.pendingProps), r === null ? wo(n) : (Be = r));
		}
		function py(n) {
			var r = n,
				a = r.alternate;
			switch (r.tag) {
				case 15:
				case 0:
					r = jg(a, r, r.pendingProps, r.type, void 0, Pe);
					break;
				case 11:
					r = jg(a, r, r.pendingProps, r.type.render, r.ref, Pe);
					break;
				case 5:
					Lf(r);
				default:
					(Zg(a, r), (r = Be = bv(r, _i)), (r = Bg(a, r, _i)));
			}
			((n.memoizedProps = n.pendingProps), r === null ? wo(n) : (Be = r));
		}
		function Mu(n, r, a, l) {
			((ci = Ma = null), Lf(r), (_u = null), (Rl = 0));
			var c = r.return;
			try {
				if (ww(n, c, r, a, Pe)) {
					(($t = 1), so(n, Ar(a, n.current)), (Be = null));
					return;
				}
			} catch (d) {
				if (c !== null) throw ((Be = c), d);
				(($t = 1), so(n, Ar(a, n.current)), (Be = null));
				return;
			}
			r.flags & 32768
				? (Fe || l === 1
						? (n = !0)
						: Ru || (Pe & 536870912) !== 0
							? (n = !1)
							: ((Xi = n = !0),
								(l === 2 || l === 9 || l === 3 || l === 6) &&
									((l = fr.current), l !== null && l.tag === 13 && (l.flags |= 16384))),
					by(r, n))
				: wo(r);
		}
		function wo(n) {
			var r = n;
			do {
				if ((r.flags & 32768) !== 0) {
					by(r, Xi);
					return;
				}
				n = r.return;
				var a = xw(r.alternate, r, _i);
				if (a !== null) {
					Be = a;
					return;
				}
				if (((r = r.sibling), r !== null)) {
					Be = r;
					return;
				}
				Be = r = n;
			} while (r !== null);
			$t === 0 && ($t = 5);
		}
		function by(n, r) {
			do {
				var a = Aw(n.alternate, n);
				if (a !== null) {
					((a.flags &= 32767), (Be = a));
					return;
				}
				if (
					((a = n.return),
					a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
					!r && ((n = n.sibling), n !== null))
				) {
					Be = n;
					return;
				}
				Be = n = a;
			} while (n !== null);
			(($t = 6), (Be = null));
		}
		function _y(n, r, a, l, c, d, y, x, j) {
			n.cancelPendingCommit = null;
			do Eo();
			while (gn !== 0);
			if ((lt & 6) !== 0) throw Error(s(327));
			if (r !== null) {
				if (r === n.current) throw Error(s(177));
				if (
					((d = r.lanes | r.childLanes),
					(d |= cf),
					Sr(n, a, d, y, x, j),
					n === _t && ((Be = _t = null), (Pe = 0)),
					(ku = r),
					(ea = n),
					(Si = a),
					(pd = d),
					(bd = c),
					(oy = l),
					(r.subtreeFlags & 10256) !== 0 || (r.flags & 10256) !== 0
						? ((n.callbackNode = null),
							(n.callbackPriority = 0),
							qw(Vt, function () {
								return (xy(), null);
							}))
						: ((n.callbackNode = null), (n.callbackPriority = 0)),
					(l = (r.flags & 13878) !== 0),
					(r.subtreeFlags & 13878) !== 0 || l)
				) {
					((l = $.T), ($.T = null), (c = H.p), (H.p = 2), (y = lt), (lt |= 4));
					try {
						Rw(n, r, a);
					} finally {
						((lt = y), (H.p = c), ($.T = l));
					}
				}
				((gn = 1), Sy(), wy(), Ey());
			}
		}
		function Sy() {
			if (gn === 1) {
				gn = 0;
				var n = ea,
					r = ku,
					a = (r.flags & 13878) !== 0;
				if ((r.subtreeFlags & 13878) !== 0 || a) {
					((a = $.T), ($.T = null));
					var l = H.p;
					H.p = 2;
					var c = lt;
					lt |= 4;
					try {
						ty(r, n);
						var d = zd,
							y = cv(n.containerInfo),
							x = d.focusedElem,
							j = d.selectionRange;
						if (y !== x && x && x.ownerDocument && ov(x.ownerDocument.documentElement, x)) {
							if (j !== null && af(x)) {
								var K = j.start,
									ne = j.end;
								if ((ne === void 0 && (ne = K), "selectionStart" in x))
									((x.selectionStart = K), (x.selectionEnd = Math.min(ne, x.value.length)));
								else {
									var ue = x.ownerDocument || document,
										F = (ue && ue.defaultView) || window;
									if (F.getSelection) {
										var ee = F.getSelection(),
											_e = x.textContent.length,
											Ne = Math.min(j.start, _e),
											vt = j.end === void 0 ? Ne : Math.min(j.end, _e);
										!ee.extend && Ne > vt && ((y = vt), (vt = Ne), (Ne = y));
										var Z = sv(x, Ne),
											U = sv(x, vt);
										if (
											Z &&
											U &&
											(ee.rangeCount !== 1 ||
												ee.anchorNode !== Z.node ||
												ee.anchorOffset !== Z.offset ||
												ee.focusNode !== U.node ||
												ee.focusOffset !== U.offset)
										) {
											var Q = ue.createRange();
											(Q.setStart(Z.node, Z.offset),
												ee.removeAllRanges(),
												Ne > vt
													? (ee.addRange(Q), ee.extend(U.node, U.offset))
													: (Q.setEnd(U.node, U.offset), ee.addRange(Q)));
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
						((jo = !!Od), (zd = Od = null));
					} finally {
						((lt = c), (H.p = l), ($.T = a));
					}
				}
				((n.current = r), (gn = 2));
			}
		}
		function wy() {
			if (gn === 2) {
				gn = 0;
				var n = ea,
					r = ku,
					a = (r.flags & 8772) !== 0;
				if ((r.subtreeFlags & 8772) !== 0 || a) {
					((a = $.T), ($.T = null));
					var l = H.p;
					H.p = 2;
					var c = lt;
					lt |= 4;
					try {
						Fg(n, r.alternate, r);
					} finally {
						((lt = c), (H.p = l), ($.T = a));
					}
				}
				gn = 3;
			}
		}
		function Ey() {
			if (gn === 4 || gn === 3) {
				((gn = 0), nt());
				var n = ea,
					r = ku,
					a = Si,
					l = oy;
				(r.subtreeFlags & 10256) !== 0 || (r.flags & 10256) !== 0
					? (gn = 5)
					: ((gn = 0), (ku = ea = null), Ty(n, n.pendingLanes));
				var c = n.pendingLanes;
				if ((c === 0 && (Wi = null), nn(a), (r = r.stateNode), pt && typeof pt.onCommitFiberRoot == "function"))
					try {
						pt.onCommitFiberRoot(kn, r, void 0, (r.current.flags & 128) === 128);
					} catch {}
				if (l !== null) {
					((r = $.T), (c = H.p), (H.p = 2), ($.T = null));
					try {
						for (var d = n.onRecoverableError, y = 0; y < l.length; y++) {
							var x = l[y];
							d(x.value, { componentStack: x.stack });
						}
					} finally {
						(($.T = r), (H.p = c));
					}
				}
				((Si & 3) !== 0 && Eo(),
					wi(n),
					(c = n.pendingLanes),
					(a & 261930) !== 0 && (c & 42) !== 0 ? (n === _d ? Hl++ : ((Hl = 0), (_d = n))) : (Hl = 0),
					Pl(0, !1));
			}
		}
		function Ty(n, r) {
			(n.pooledCacheLanes &= r) === 0 && ((r = n.pooledCache), r != null && ((n.pooledCache = null), xl(r)));
		}
		function Eo() {
			return (Sy(), wy(), Ey(), xy());
		}
		function xy() {
			if (gn !== 5) return !1;
			var n = ea,
				r = pd;
			pd = 0;
			var a = nn(Si),
				l = $.T,
				c = H.p;
			try {
				((H.p = 32 > a ? 32 : a), ($.T = null), (a = bd), (bd = null));
				var d = ea,
					y = Si;
				if (((gn = 0), (ku = ea = null), (Si = 0), (lt & 6) !== 0)) throw Error(s(331));
				var x = lt;
				if (
					((lt |= 4),
					uy(d.current),
					ry(d, d.current, y, a),
					(lt = x),
					Pl(0, !1),
					pt && typeof pt.onPostCommitFiberRoot == "function")
				)
					try {
						pt.onPostCommitFiberRoot(kn, d);
					} catch {}
				return !0;
			} finally {
				((H.p = c), ($.T = l), Ty(n, r));
			}
		}
		function Ay(n, r, a) {
			((r = Ar(a, r)), (r = Jf(n.stateNode, r, 2)), (n = qa(n, r, 2)), n !== null && (jn(n, 2), wi(n)));
		}
		function ft(n, r, a) {
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
							((n = Ar(a, n)), (a = Rg(2)), (l = qa(r, a, 2)), l !== null && (Cg(a, l, r, n), jn(l, 2), wi(l)));
							break;
						}
					}
					r = r.return;
				}
		}
		function Ed(n, r, a) {
			var l = n.pingCache;
			if (l === null) {
				l = n.pingCache = new Nw();
				var c = new Set();
				l.set(r, c);
			} else ((c = l.get(r)), c === void 0 && ((c = new Set()), l.set(r, c)));
			c.has(a) || ((vd = !0), c.add(a), (n = jw.bind(null, n, r, a)), r.then(n, n));
		}
		function jw(n, r, a) {
			var l = n.pingCache;
			(l !== null && l.delete(r),
				(n.pingedLanes |= n.suspendedLanes & a),
				(n.warmLanes &= ~a),
				_t === n &&
					(Pe & a) === a &&
					($t === 4 || ($t === 3 && (Pe & 62914560) === Pe && 300 > Me() - yo) ? (lt & 2) === 0 && Nu(n, 0) : (gd |= a),
					Cu === Pe && (Cu = 0)),
				wi(n));
		}
		function Ry(n, r) {
			(r === 0 && (r = lr()), (n = Ca(n, r)), n !== null && (jn(n, r), wi(n)));
		}
		function Iw(n) {
			var r = n.memoizedState,
				a = 0;
			(r !== null && (a = r.retryLane), Ry(n, a));
		}
		function Lw(n, r) {
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
		function qw(n, r) {
			return Je(n, r);
		}
		var To = null,
			Ou = null,
			Td = !1,
			xo = !1,
			xd = !1,
			na = 0;
		function wi(n) {
			(n !== Ou && n.next === null && (Ou === null ? (To = Ou = n) : (Ou = Ou.next = n)),
				(xo = !0),
				Td || ((Td = !0), $w()));
		}
		function Pl(n, r) {
			if (!xd && xo) {
				xd = !0;
				do
					for (var a = !1, l = To; l !== null; ) {
						if (!r)
							if (n !== 0) {
								var c = l.pendingLanes;
								if (c === 0) var d = 0;
								else {
									var y = l.suspendedLanes,
										x = l.pingedLanes;
									((d = (1 << (31 - ot(42 | n) + 1)) - 1),
										(d &= c & ~(y & ~x)),
										(d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0));
								}
								d !== 0 && ((a = !0), My(l, d));
							} else
								((d = Pe),
									(d = ur(l, l === _t ? d : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1)),
									(d & 3) === 0 || Sn(l, d) || ((a = !0), My(l, d)));
						l = l.next;
					}
				while (a);
				xd = !1;
			}
		}
		function Uw() {
			Cy();
		}
		function Cy() {
			xo = Td = !1;
			var n = 0;
			na !== 0 && Yw() && (n = na);
			for (var r = Me(), a = null, l = To; l !== null; ) {
				var c = l.next,
					d = ky(l, r);
				(d === 0
					? ((l.next = null), a === null ? (To = c) : (a.next = c), c === null && (Ou = a))
					: ((a = l), (n !== 0 || (d & 3) !== 0) && (xo = !0)),
					(l = c));
			}
			((gn !== 0 && gn !== 5) || Pl(n, !1), na !== 0 && (na = 0));
		}
		function ky(n, r) {
			for (
				var a = n.suspendedLanes, l = n.pingedLanes, c = n.expirationTimes, d = n.pendingLanes & -62914561;
				0 < d;
			) {
				var y = 31 - ot(d),
					x = 1 << y,
					j = c[y];
				(j === -1 ? ((x & a) === 0 || (x & l) !== 0) && (c[y] = _r(x, r)) : j <= r && (n.expiredLanes |= x), (d &= ~x));
			}
			if (
				((r = _t),
				(a = Pe),
				(a = ur(n, n === r ? a : 0, n.cancelPendingCommit !== null || n.timeoutHandle !== -1)),
				(l = n.callbackNode),
				a === 0 || (n === r && (ct === 2 || ct === 9)) || n.cancelPendingCommit !== null)
			)
				return (l !== null && l !== null && ce(l), (n.callbackNode = null), (n.callbackPriority = 0));
			if ((a & 3) === 0 || Sn(n, a)) {
				if (((r = a & -a), r === n.callbackPriority)) return r;
				switch ((l !== null && ce(l), nn(a))) {
					case 2:
					case 8:
						a = at;
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
				return ((l = Ny.bind(null, n)), (a = Je(a, l)), (n.callbackPriority = r), (n.callbackNode = a), r);
			}
			return (l !== null && l !== null && ce(l), (n.callbackPriority = 2), (n.callbackNode = null), 2);
		}
		function Ny(n, r) {
			if (gn !== 0 && gn !== 5) return ((n.callbackNode = null), (n.callbackPriority = 0), null);
			var a = n.callbackNode;
			if (Eo() && n.callbackNode !== a) return null;
			var l = Pe;
			return (
				(l = ur(n, n === _t ? l : 0, n.cancelPendingCommit !== null || n.timeoutHandle !== -1)),
				l === 0
					? null
					: (fy(n, l, r), ky(n, Me()), n.callbackNode != null && n.callbackNode === a ? Ny.bind(null, n) : null)
			);
		}
		function My(n, r) {
			if (Eo()) return null;
			fy(n, r, !0);
		}
		function $w() {
			Fw(function () {
				(lt & 6) !== 0 ? Je(pn, Uw) : Cy();
			});
		}
		function Ad() {
			if (na === 0) {
				var n = yu;
				(n === 0 && ((n = Zt), (Zt <<= 1), (Zt & 261888) === 0 && (Zt = 256)), (na = n));
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
		function Bw(n, r, a, l, c) {
			if (r === "submit" && a && a.stateNode === c) {
				var d = Oy((c[rn] || null).action),
					y = l.submitter;
				y &&
					((r = (r = y[rn] || null) ? Oy(r.formAction) : y.getAttribute("formAction")),
					r !== null && ((d = r), (y = null)));
				var x = new ut("action", "action", null, l, c);
				n.push({
					event: x,
					listeners: [
						{
							instance: null,
							listener: function () {
								if (l.defaultPrevented) {
									if (na !== 0) {
										var j = y ? zy(c, y) : new FormData(c);
										Qf(a, { pending: !0, data: j, method: c.method, action: d }, null, j);
									}
								} else
									typeof d == "function" &&
										(x.preventDefault(),
										(j = y ? zy(c, y) : new FormData(c)),
										Qf(a, { pending: !0, data: j, method: c.method, action: d }, d, j));
							},
							currentTarget: c,
						},
					],
				});
			}
		}
		for (var Rd = 0; Rd < of.length; Rd++) {
			var Cd = of[Rd];
			Zr(Cd.toLowerCase(), "on" + (Cd[0].toUpperCase() + Cd.slice(1)));
		}
		(Zr(hv, "onAnimationEnd"),
			Zr(mv, "onAnimationIteration"),
			Zr(vv, "onAnimationStart"),
			Zr("dblclick", "onDoubleClick"),
			Zr("focusin", "onFocus"),
			Zr("focusout", "onBlur"),
			Zr(nw, "onTransitionRun"),
			Zr(rw, "onTransitionStart"),
			Zr(iw, "onTransitionCancel"),
			Zr(gv, "onTransitionEnd"),
			we("onMouseEnter", ["mouseout", "mouseover"]),
			we("onMouseLeave", ["mouseout", "mouseover"]),
			we("onPointerEnter", ["pointerout", "pointerover"]),
			we("onPointerLeave", ["pointerout", "pointerover"]),
			me("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
			me("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
			me("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
			me("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
			me("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
			me("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" ")));
		var Ql =
				"abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
					" ",
				),
			Vw = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ql));
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
								j = x.instance,
								K = x.currentTarget;
							if (((x = x.listener), j !== d && c.isPropagationStopped())) break e;
							((d = x), (c.currentTarget = K));
							try {
								d(c);
							} catch (ne) {
								Us(ne);
							}
							((c.currentTarget = null), (d = j));
						}
					else
						for (y = 0; y < l.length; y++) {
							if (
								((x = l[y]),
								(j = x.instance),
								(K = x.currentTarget),
								(x = x.listener),
								j !== d && c.isPropagationStopped())
							)
								break e;
							((d = x), (c.currentTarget = K));
							try {
								d(c);
							} catch (ne) {
								Us(ne);
							}
							((c.currentTarget = null), (d = j));
						}
				}
			}
		}
		function Ve(n, r) {
			var a = r[qr];
			a === void 0 && (a = r[qr] = new Set());
			var l = n + "__bubble";
			a.has(l) || (Iy(r, n, 2, !1), a.add(l));
		}
		function kd(n, r, a) {
			var l = 0;
			(r && (l |= 4), Iy(a, n, l, r));
		}
		var Ao = "_reactListening" + Math.random().toString(36).slice(2);
		function jy(n) {
			if (!n[Ao]) {
				((n[Ao] = !0),
					Ea.forEach(function (a) {
						a !== "selectionchange" && (Vw.has(a) || kd(a, !1, n), kd(a, !0, n));
					}));
				var r = n.nodeType === 9 ? n : n.ownerDocument;
				r === null || r[Ao] || ((r[Ao] = !0), kd("selectionchange", !1, r));
			}
		}
		function Iy(n, r, a, l) {
			switch (op(r)) {
				case 2:
					var c = p1;
					break;
				case 8:
					c = b1;
					break;
				default:
					c = Hd;
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
		function Nd(n, r, a, l, c) {
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
								var j = y.tag;
								if ((j === 3 || j === 4) && y.stateNode.containerInfo === c) return;
								y = y.return;
							}
						for (; x !== null; ) {
							if (((y = Kt(x)), y === null)) return;
							if (((j = y.tag), j === 5 || j === 6 || j === 26 || j === 27)) {
								l = d = y;
								continue e;
							}
							x = x.parentNode;
						}
					}
					l = l.return;
				}
			uu(function () {
				var K = d,
					ne = Un(a),
					ue = [];
				e: {
					var F = yv.get(n);
					if (F !== void 0) {
						var ee = ut,
							_e = n;
						switch (n) {
							case "keypress":
								if (Re(a) === 0) break e;
							case "keydown":
							case "keyup":
								ee = US;
								break;
							case "focusin":
								((_e = "focus"), (ee = Wc));
								break;
							case "focusout":
								((_e = "blur"), (ee = Wc));
								break;
							case "beforeblur":
							case "afterblur":
								ee = Wc;
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
								ee = OS;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								ee = $S;
								break;
							case hv:
							case mv:
							case vv:
								ee = zS;
								break;
							case gv:
								ee = BS;
								break;
							case "scroll":
							case "scrollend":
								ee = vl;
								break;
							case "wheel":
								ee = VS;
								break;
							case "copy":
							case "cut":
							case "paste":
								ee = DS;
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
								ee = ZS;
						}
						var Ne = (r & 4) !== 0,
							vt = !Ne && (n === "scroll" || n === "scrollend"),
							Z = Ne ? (F !== null ? F + "Capture" : null) : F;
						Ne = [];
						for (var U = K, Q; U !== null; ) {
							var ie = U;
							if (
								((Q = ie.stateNode),
								(ie = ie.tag),
								(ie !== 5 && ie !== 26 && ie !== 27) ||
									Q === null ||
									Z === null ||
									((ie = Vi(U, Z)), ie != null && Ne.push(Kl(U, ie, Q))),
								vt)
							)
								break;
							U = U.return;
						}
						0 < Ne.length && ((F = new ee(F, _e, null, a, ne)), ue.push({ event: F, listeners: Ne }));
					}
				}
				if ((r & 7) === 0) {
					e: {
						if (
							((F = n === "mouseover" || n === "pointerover"),
							(ee = n === "mouseout" || n === "pointerout"),
							F && a !== hl && (_e = a.relatedTarget || a.fromElement) && (Kt(_e) || _e[wr]))
						)
							break e;
						if (
							(ee || F) &&
							((F = ne.window === ne ? ne : (F = ne.ownerDocument) ? F.defaultView || F.parentWindow : window),
							ee
								? ((_e = a.relatedTarget || a.toElement),
									(ee = K),
									(_e = _e ? Kt(_e) : null),
									_e !== null &&
										((vt = f(_e)), (Ne = _e.tag), _e !== vt || (Ne !== 5 && Ne !== 27 && Ne !== 6)) &&
										(_e = null))
								: ((ee = null), (_e = K)),
							ee !== _e)
						) {
							if (
								((Ne = Qm),
								(ie = "onMouseLeave"),
								(Z = "onMouseEnter"),
								(U = "mouse"),
								(n === "pointerout" || n === "pointerover") &&
									((Ne = Ym), (ie = "onPointerLeave"), (Z = "onPointerEnter"), (U = "pointer")),
								(vt = ee == null ? F : Mn(ee)),
								(Q = _e == null ? F : Mn(_e)),
								(F = new Ne(ie, U + "leave", ee, a, ne)),
								(F.target = vt),
								(F.relatedTarget = Q),
								(ie = null),
								Kt(ne) === K &&
									((Ne = new Ne(Z, U + "enter", _e, a, ne)), (Ne.target = Q), (Ne.relatedTarget = vt), (ie = Ne)),
								(vt = ie),
								ee && _e)
							)
								t: {
									for (Ne = Zw, Z = ee, U = _e, Q = 0, ie = Z; ie; ie = Ne(ie)) Q++;
									ie = 0;
									for (var Ae = U; Ae; Ae = Ne(Ae)) ie++;
									for (; 0 < Q - ie; ) ((Z = Ne(Z)), Q--);
									for (; 0 < ie - Q; ) ((U = Ne(U)), ie--);
									for (; Q--; ) {
										if (Z === U || (U !== null && Z === U.alternate)) {
											Ne = Z;
											break t;
										}
										((Z = Ne(Z)), (U = Ne(U)));
									}
									Ne = null;
								}
							else Ne = null;
							(ee !== null && Ly(ue, F, ee, Ne, !1), _e !== null && vt !== null && Ly(ue, vt, _e, Ne, !0));
						}
					}
					e: {
						if (
							((F = K ? Mn(K) : window),
							(ee = F.nodeName && F.nodeName.toLowerCase()),
							ee === "select" || (ee === "input" && F.type === "file"))
						)
							var rt = nv;
						else if (ev(F))
							if (rv) rt = WS;
							else {
								rt = XS;
								var Se = FS;
							}
						else
							((ee = F.nodeName),
								!ee || ee.toLowerCase() !== "input" || (F.type !== "checkbox" && F.type !== "radio")
									? K && dl(K.elementType) && (rt = nv)
									: (rt = JS));
						if (rt && (rt = rt(n, K))) {
							tv(ue, rt, a, ne);
							break e;
						}
						(Se && Se(n, F, K),
							n === "focusout" &&
								K &&
								F.type === "number" &&
								K.memoizedProps.value != null &&
								ol(F, "number", F.value));
					}
					switch (((Se = K ? Mn(K) : window), n)) {
						case "focusin":
							(ev(Se) || Se.contentEditable === "true") && ((ou = Se), (uf = K), (wl = null));
							break;
						case "focusout":
							wl = uf = ou = null;
							break;
						case "mousedown":
							lf = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							((lf = !1), fv(ue, a, ne));
							break;
						case "selectionchange":
							if (tw) break;
						case "keydown":
						case "keyup":
							fv(ue, a, ne);
					}
					var qe;
					if (tf)
						e: {
							switch (n) {
								case "compositionstart":
									var Qe = "onCompositionStart";
									break e;
								case "compositionend":
									Qe = "onCompositionEnd";
									break e;
								case "compositionupdate":
									Qe = "onCompositionUpdate";
									break e;
							}
							Qe = void 0;
						}
					else
						su
							? Jm(n, a) && (Qe = "onCompositionEnd")
							: n === "keydown" && a.keyCode === 229 && (Qe = "onCompositionStart");
					(Qe &&
						(Gm &&
							a.locale !== "ko" &&
							(su || Qe !== "onCompositionStart"
								? Qe === "onCompositionEnd" && su && (qe = ye())
								: ((P = ne), (de = "value" in P ? P.value : P.textContent), (su = !0))),
						(Se = Ro(K, Qe)),
						0 < Se.length &&
							((Qe = new Km(Qe, n, null, a, ne)),
							ue.push({ event: Qe, listeners: Se }),
							qe ? (Qe.data = qe) : ((qe = Wm(a)), qe !== null && (Qe.data = qe)))),
						(qe = PS ? QS(n, a) : KS(n, a)) &&
							((Qe = Ro(K, "onBeforeInput")),
							0 < Qe.length &&
								((Se = new Km("onBeforeInput", "beforeinput", null, a, ne)),
								ue.push({ event: Se, listeners: Qe }),
								(Se.data = qe))),
						Bw(ue, n, K, a, ne));
				}
				Dy(ue, r);
			});
		}
		function Kl(n, r, a) {
			return { instance: n, listener: r, currentTarget: a };
		}
		function Ro(n, r) {
			for (var a = r + "Capture", l = []; n !== null; ) {
				var c = n,
					d = c.stateNode;
				if (
					((c = c.tag),
					(c !== 5 && c !== 26 && c !== 27) ||
						d === null ||
						((c = Vi(n, a)), c != null && l.unshift(Kl(n, c, d)), (c = Vi(n, r)), c != null && l.push(Kl(n, c, d))),
					n.tag === 3)
				)
					return l;
				n = n.return;
			}
			return [];
		}
		function Zw(n) {
			if (n === null) return null;
			do n = n.return;
			while (n && n.tag !== 5 && n.tag !== 27);
			return n || null;
		}
		function Ly(n, r, a, l, c) {
			for (var d = r._reactName, y = []; a !== null && a !== l; ) {
				var x = a,
					j = x.alternate,
					K = x.stateNode;
				if (((x = x.tag), j !== null && j === l)) break;
				((x !== 5 && x !== 26 && x !== 27) ||
					K === null ||
					((j = K),
					c
						? ((K = Vi(a, d)), K != null && y.unshift(Kl(a, K, j)))
						: c || ((K = Vi(a, d)), K != null && y.push(Kl(a, K, j)))),
					(a = a.return));
			}
			y.length !== 0 && n.push({ event: r, listeners: y });
		}
		var Hw = /\r\n?/g,
			Pw = /\u0000|\uFFFD/g;
		function qy(n) {
			return (typeof n == "string" ? n : "" + n)
				.replace(
					Hw,
					`
`,
				)
				.replace(Pw, "");
		}
		function Uy(n, r) {
			return ((r = qy(r)), qy(n) === r);
		}
		function mt(n, r, a, l, c, d) {
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
					fl(n, l, d);
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
								? (r !== "input" && mt(n, r, "name", c.name, c, null),
									mt(n, r, "formEncType", c.formEncType, c, null),
									mt(n, r, "formMethod", c.formMethod, c, null),
									mt(n, r, "formTarget", c.formTarget, c, null))
								: (mt(n, r, "encType", c.encType, c, null),
									mt(n, r, "method", c.method, c, null),
									mt(n, r, "target", c.target, c, null)));
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
					l != null && Ve("scroll", n);
					break;
				case "onScrollEnd":
					l != null && Ve("scrollend", n);
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
					(Ve("beforetoggle", n), Ve("toggle", n), dt(n, "popover", l));
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
					dt(n, "is", l);
					break;
				case "innerText":
				case "textContent":
					break;
				default:
					(!(2 < a.length) || (a[0] !== "o" && a[0] !== "O") || (a[1] !== "n" && a[1] !== "N")) &&
						((a = Is.get(a) || a), dt(n, a, l));
			}
		}
		function Md(n, r, a, l, c, d) {
			switch (a) {
				case "style":
					fl(n, l, d);
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
					l != null && Ve("scroll", n);
					break;
				case "onScrollEnd":
					l != null && Ve("scrollend", n);
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
					if (!G.hasOwnProperty(a))
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
							a in n ? (n[a] = l) : l === !0 ? n.setAttribute(a, "") : dt(n, a, l);
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
					(Ve("error", n), Ve("load", n));
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
										mt(n, r, d, y, a, null);
								}
						}
					(c && mt(n, r, "srcSet", a.srcSet, a, null), l && mt(n, r, "src", a.src, a, null));
					return;
				case "input":
					Ve("invalid", n);
					var x = (d = y = c = null),
						j = null,
						K = null;
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
										j = ne;
										break;
									case "defaultChecked":
										K = ne;
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
										mt(n, r, l, ne, a, null);
								}
						}
					zs(n, d, x, j, K, y, c, !1);
					return;
				case "select":
					(Ve("invalid", n), (l = y = d = null));
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
									mt(n, r, c, x, a, null);
							}
					((r = d), (a = y), (n.multiple = !!l), r != null ? $r(n, !!l, r, !1) : a != null && $r(n, !!l, a, !0));
					return;
				case "textarea":
					(Ve("invalid", n), (d = c = l = null));
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
									mt(n, r, y, x, a, null);
							}
					cl(n, l, c, d);
					return;
				case "option":
					for (j in a)
						if (a.hasOwnProperty(j) && ((l = a[j]), l != null))
							switch (j) {
								case "selected":
									n.selected = l && typeof l != "function" && typeof l != "symbol";
									break;
								default:
									mt(n, r, j, l, a, null);
							}
					return;
				case "dialog":
					(Ve("beforetoggle", n), Ve("toggle", n), Ve("cancel", n), Ve("close", n));
					break;
				case "iframe":
				case "object":
					Ve("load", n);
					break;
				case "video":
				case "audio":
					for (l = 0; l < Ql.length; l++) Ve(Ql[l], n);
					break;
				case "image":
					(Ve("error", n), Ve("load", n));
					break;
				case "details":
					Ve("toggle", n);
					break;
				case "embed":
				case "source":
				case "link":
					(Ve("error", n), Ve("load", n));
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
					for (K in a)
						if (a.hasOwnProperty(K) && ((l = a[K]), l != null))
							switch (K) {
								case "children":
								case "dangerouslySetInnerHTML":
									throw Error(s(137, r));
								default:
									mt(n, r, K, l, a, null);
							}
					return;
				default:
					if (dl(r)) {
						for (ne in a) a.hasOwnProperty(ne) && ((l = a[ne]), l !== void 0 && Md(n, r, ne, l, a, void 0));
						return;
					}
			}
			for (x in a) a.hasOwnProperty(x) && ((l = a[x]), l != null && mt(n, r, x, l, a, null));
		}
		function Qw(n, r, a, l) {
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
						j = null,
						K = null,
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
									j = ue;
								default:
									l.hasOwnProperty(ee) || mt(n, r, ee, null, l, ue);
							}
					}
					for (var F in l) {
						var ee = l[F];
						if (((ue = a[F]), l.hasOwnProperty(F) && (ee != null || ue != null)))
							switch (F) {
								case "type":
									d = ee;
									break;
								case "name":
									c = ee;
									break;
								case "checked":
									K = ee;
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
									ee !== ue && mt(n, r, F, ee, l, ue);
							}
					}
					sl(n, y, x, j, K, ne, d, c);
					return;
				case "select":
					ee = y = x = F = null;
					for (d in a)
						if (((j = a[d]), a.hasOwnProperty(d) && j != null))
							switch (d) {
								case "value":
									break;
								case "multiple":
									ee = j;
								default:
									l.hasOwnProperty(d) || mt(n, r, d, null, l, j);
							}
					for (c in l)
						if (((d = l[c]), (j = a[c]), l.hasOwnProperty(c) && (d != null || j != null)))
							switch (c) {
								case "value":
									F = d;
									break;
								case "defaultValue":
									x = d;
									break;
								case "multiple":
									y = d;
								default:
									d !== j && mt(n, r, c, d, l, j);
							}
					((r = x),
						(a = y),
						(l = ee),
						F != null
							? $r(n, !!a, F, !1)
							: !!l != !!a && (r != null ? $r(n, !!a, r, !0) : $r(n, !!a, a ? [] : "", !1)));
					return;
				case "textarea":
					ee = F = null;
					for (x in a)
						if (((c = a[x]), a.hasOwnProperty(x) && c != null && !l.hasOwnProperty(x)))
							switch (x) {
								case "value":
									break;
								case "children":
									break;
								default:
									mt(n, r, x, null, l, c);
							}
					for (y in l)
						if (((c = l[y]), (d = a[y]), l.hasOwnProperty(y) && (c != null || d != null)))
							switch (y) {
								case "value":
									F = c;
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
									c !== d && mt(n, r, y, c, l, d);
							}
					qn(n, F, ee);
					return;
				case "option":
					for (var _e in a)
						if (((F = a[_e]), a.hasOwnProperty(_e) && F != null && !l.hasOwnProperty(_e)))
							switch (_e) {
								case "selected":
									n.selected = !1;
									break;
								default:
									mt(n, r, _e, null, l, F);
							}
					for (j in l)
						if (((F = l[j]), (ee = a[j]), l.hasOwnProperty(j) && F !== ee && (F != null || ee != null)))
							switch (j) {
								case "selected":
									n.selected = F && typeof F != "function" && typeof F != "symbol";
									break;
								default:
									mt(n, r, j, F, l, ee);
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
					for (var Ne in a)
						((F = a[Ne]), a.hasOwnProperty(Ne) && F != null && !l.hasOwnProperty(Ne) && mt(n, r, Ne, null, l, F));
					for (K in l)
						if (((F = l[K]), (ee = a[K]), l.hasOwnProperty(K) && F !== ee && (F != null || ee != null)))
							switch (K) {
								case "children":
								case "dangerouslySetInnerHTML":
									if (F != null) throw Error(s(137, r));
									break;
								default:
									mt(n, r, K, F, l, ee);
							}
					return;
				default:
					if (dl(r)) {
						for (var vt in a)
							((F = a[vt]),
								a.hasOwnProperty(vt) && F !== void 0 && !l.hasOwnProperty(vt) && Md(n, r, vt, void 0, l, F));
						for (ne in l)
							((F = l[ne]),
								(ee = a[ne]),
								!l.hasOwnProperty(ne) || F === ee || (F === void 0 && ee === void 0) || Md(n, r, ne, F, l, ee));
						return;
					}
			}
			for (var Z in a)
				((F = a[Z]), a.hasOwnProperty(Z) && F != null && !l.hasOwnProperty(Z) && mt(n, r, Z, null, l, F));
			for (ue in l)
				((F = l[ue]),
					(ee = a[ue]),
					!l.hasOwnProperty(ue) || F === ee || (F == null && ee == null) || mt(n, r, ue, F, l, ee));
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
		function Kw() {
			if (typeof performance.getEntriesByType == "function") {
				for (var n = 0, r = 0, a = performance.getEntriesByType("resource"), l = 0; l < a.length; l++) {
					var c = a[l],
						d = c.transferSize,
						y = c.initiatorType,
						x = c.duration;
					if (d && x && $y(y)) {
						for (y = 0, x = c.responseEnd, l += 1; l < a.length; l++) {
							var j = a[l],
								K = j.startTime;
							if (K > x) break;
							var ne = j.transferSize,
								ue = j.initiatorType;
							ne && $y(ue) && ((j = j.responseEnd), (y += ne * (j < x ? 1 : (x - K) / (j - K))));
						}
						if ((--l, (r += (8 * (d + y)) / (c.duration / 1e3)), n++, 10 < n)) break;
					}
				}
				if (0 < n) return r / n / 1e6;
			}
			return navigator.connection && ((n = navigator.connection.downlink), typeof n == "number") ? n : 5;
		}
		var Od = null,
			zd = null;
		function Co(n) {
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
		function Dd(n, r) {
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
		var jd = null;
		function Yw() {
			var n = window.event;
			return n && n.type === "popstate" ? (n === jd ? !1 : ((jd = n), !0)) : ((jd = null), !1);
		}
		var Zy = typeof setTimeout == "function" ? setTimeout : void 0,
			Gw = typeof clearTimeout == "function" ? clearTimeout : void 0,
			Hy = typeof Promise == "function" ? Promise : void 0,
			Fw =
				typeof queueMicrotask == "function"
					? queueMicrotask
					: typeof Hy < "u"
						? function (n) {
								return Hy.resolve(null).then(n).catch(Xw);
							}
						: Zy;
		function Xw(n) {
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
							(n.removeChild(c), Iu(r));
							return;
						}
						l--;
					} else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&") l++;
					else if (a === "html") Yl(n.ownerDocument.documentElement);
					else if (a === "head") {
						((a = n.ownerDocument.head), Yl(a));
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
					} else a === "body" && Yl(n.ownerDocument.body);
				a = c;
			} while (a);
			Iu(r);
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
		function Id(n) {
			var r = n.firstChild;
			for (r && r.nodeType === 10 && (r = r.nextSibling); r; ) {
				var a = r;
				switch (((r = r.nextSibling), a.nodeName)) {
					case "HTML":
					case "HEAD":
					case "BODY":
						(Id(a), Ui(a));
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
		function Jw(n, r, a, l) {
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
		function Ww(n, r, a) {
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
		function Ld(n) {
			return n.data === "$?" || n.data === "$~";
		}
		function qd(n) {
			return n.data === "$!" || (n.data === "$?" && n.ownerDocument.readyState !== "loading");
		}
		function e1(n, r) {
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
		var Ud = null;
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
			switch (((r = Co(a)), n)) {
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
		function Yl(n) {
			for (var r = n.attributes; r.length; ) n.removeAttributeNode(r[0]);
			Ui(n);
		}
		var zr = new Map(),
			Xy = new Set();
		function ko(n) {
			return typeof n.getRootNode == "function" ? n.getRootNode() : n.nodeType === 9 ? n : n.ownerDocument;
		}
		var Ei = H.d;
		H.d = { f: t1, r: n1, D: r1, C: i1, L: a1, m: u1, X: s1, S: l1, M: o1 };
		function t1() {
			var n = Ei.f(),
				r = _o();
			return n || r;
		}
		function n1(n) {
			var r = Yn(n);
			r !== null && r.tag === 5 && r.type === "form" ? gg(r) : Ei.r(n);
		}
		var zu = typeof document > "u" ? null : document;
		function Jy(n, r, a) {
			var l = zu;
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
		function r1(n) {
			(Ei.D(n), Jy("dns-prefetch", n, null));
		}
		function i1(n, r) {
			(Ei.C(n, r), Jy("preconnect", n, r));
		}
		function a1(n, r, a) {
			Ei.L(n, r, a);
			var l = zu;
			if (l && n && r) {
				var c = 'link[rel="preload"][as="' + wn(r) + '"]';
				r === "image" && a && a.imageSrcSet
					? ((c += '[imagesrcset="' + wn(a.imageSrcSet) + '"]'),
						typeof a.imageSizes == "string" && (c += '[imagesizes="' + wn(a.imageSizes) + '"]'))
					: (c += '[href="' + wn(n) + '"]');
				var d = c;
				switch (r) {
					case "style":
						d = Du(n);
						break;
					case "script":
						d = ju(n);
				}
				zr.has(d) ||
					((n = b({ rel: "preload", href: r === "image" && a && a.imageSrcSet ? void 0 : n, as: r }, a)),
					zr.set(d, n),
					l.querySelector(c) !== null ||
						(r === "style" && l.querySelector(Gl(d))) ||
						(r === "script" && l.querySelector(Fl(d))) ||
						((r = l.createElement("link")), An(r, "link", n), Rt(r), l.head.appendChild(r)));
			}
		}
		function u1(n, r) {
			Ei.m(n, r);
			var a = zu;
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
						d = ju(n);
				}
				if (!zr.has(d) && ((n = b({ rel: "modulepreload", href: n }, r)), zr.set(d, n), a.querySelector(c) === null)) {
					switch (l) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script":
							if (a.querySelector(Fl(d))) return;
					}
					((l = a.createElement("link")), An(l, "link", n), Rt(l), a.head.appendChild(l));
				}
			}
		}
		function l1(n, r, a) {
			Ei.S(n, r, a);
			var l = zu;
			if (l && n) {
				var c = sr(l).hoistableStyles,
					d = Du(n);
				r = r || "default";
				var y = c.get(d);
				if (!y) {
					var x = { loading: 0, preload: null };
					if ((y = l.querySelector(Gl(d)))) x.loading = 5;
					else {
						((n = b({ rel: "stylesheet", href: n, "data-precedence": r }, a)), (a = zr.get(d)) && $d(n, a));
						var j = (y = l.createElement("link"));
						(Rt(j),
							An(j, "link", n),
							(j._p = new Promise(function (K, ne) {
								((j.onload = K), (j.onerror = ne));
							})),
							j.addEventListener("load", function () {
								x.loading |= 1;
							}),
							j.addEventListener("error", function () {
								x.loading |= 2;
							}),
							(x.loading |= 4),
							No(y, r, l));
					}
					((y = { type: "stylesheet", instance: y, count: 1, state: x }), c.set(d, y));
				}
			}
		}
		function s1(n, r) {
			Ei.X(n, r);
			var a = zu;
			if (a && n) {
				var l = sr(a).hoistableScripts,
					c = ju(n),
					d = l.get(c);
				d ||
					((d = a.querySelector(Fl(c))),
					d ||
						((n = b({ src: n, async: !0 }, r)),
						(r = zr.get(c)) && Bd(n, r),
						(d = a.createElement("script")),
						Rt(d),
						An(d, "link", n),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					l.set(c, d));
			}
		}
		function o1(n, r) {
			Ei.M(n, r);
			var a = zu;
			if (a && n) {
				var l = sr(a).hoistableScripts,
					c = ju(n),
					d = l.get(c);
				d ||
					((d = a.querySelector(Fl(c))),
					d ||
						((n = b({ src: n, async: !0, type: "module" }, r)),
						(r = zr.get(c)) && Bd(n, r),
						(d = a.createElement("script")),
						Rt(d),
						An(d, "link", n),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					l.set(c, d));
			}
		}
		function Wy(n, r, a, l) {
			var c = (c = Te.current) ? ko(c) : null;
			if (!c) throw Error(s(446));
			switch (n) {
				case "meta":
				case "title":
					return null;
				case "style":
					return typeof a.precedence == "string" && typeof a.href == "string"
						? ((r = Du(a.href)),
							(a = sr(c).hoistableStyles),
							(l = a.get(r)),
							l || ((l = { type: "style", instance: null, count: 0, state: null }), a.set(r, l)),
							l)
						: { type: "void", instance: null, count: 0, state: null };
				case "link":
					if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
						n = Du(a.href);
						var d = sr(c).hoistableStyles,
							y = d.get(n);
						if (
							(y ||
								((c = c.ownerDocument || c),
								(y = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }),
								d.set(n, y),
								(d = c.querySelector(Gl(n))) && !d._p && ((y.instance = d), (y.state.loading = 5)),
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
									d || c1(c, n, a, y.state))),
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
							? ((r = ju(a)),
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
		function Du(n) {
			return 'href="' + wn(n) + '"';
		}
		function Gl(n) {
			return 'link[rel="stylesheet"][' + n + "]";
		}
		function ep(n) {
			return b({}, n, { "data-precedence": n.precedence, precedence: null });
		}
		function c1(n, r, a, l) {
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
		function ju(n) {
			return '[src="' + wn(n) + '"]';
		}
		function Fl(n) {
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
						c = Du(a.href);
						var d = n.querySelector(Gl(c));
						if (d) return ((r.state.loading |= 4), (r.instance = d), Rt(d), d);
						((l = ep(a)), (c = zr.get(c)) && $d(l, c), (d = (n.ownerDocument || n).createElement("link")), Rt(d));
						var y = d;
						return (
							(y._p = new Promise(function (x, j) {
								((y.onload = x), (y.onerror = j));
							})),
							An(d, "link", l),
							(r.state.loading |= 4),
							No(d, a.precedence, n),
							(r.instance = d)
						);
					case "script":
						return (
							(d = ju(a.src)),
							(c = n.querySelector(Fl(d)))
								? ((r.instance = c), Rt(c), c)
								: ((l = a),
									(c = zr.get(d)) && ((l = b({}, a)), Bd(l, c)),
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
		function $d(n, r) {
			((n.crossOrigin ??= r.crossOrigin), (n.referrerPolicy ??= r.referrerPolicy), (n.title ??= r.title));
		}
		function Bd(n, r) {
			((n.crossOrigin ??= r.crossOrigin), (n.referrerPolicy ??= r.referrerPolicy), (n.integrity ??= r.integrity));
		}
		var Mo = null;
		function np(n, r, a) {
			if (Mo === null) {
				var l = new Map(),
					c = (Mo = new Map());
				c.set(a, l);
			} else ((c = Mo), (l = c.get(a)), l || ((l = new Map()), c.set(a, l)));
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
		function f1(n, r, a) {
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
		function d1(n, r, a, l) {
			if (
				a.type === "stylesheet" &&
				(typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
				(a.state.loading & 4) === 0
			) {
				if (a.instance === null) {
					var c = Du(l.href),
						d = r.querySelector(Gl(c));
					if (d) {
						((r = d._p),
							r !== null &&
								typeof r == "object" &&
								typeof r.then == "function" &&
								(n.count++, (n = Oo.bind(n)), r.then(n, n)),
							(a.state.loading |= 4),
							(a.instance = d),
							Rt(d));
						return;
					}
					((d = r.ownerDocument || r), (l = ep(l)), (c = zr.get(c)) && $d(l, c), (d = d.createElement("link")), Rt(d));
					var y = d;
					((y._p = new Promise(function (x, j) {
						((y.onload = x), (y.onerror = j));
					})),
						An(d, "link", l),
						(a.instance = d));
				}
				(n.stylesheets === null && (n.stylesheets = new Map()),
					n.stylesheets.set(a, r),
					(r = a.state.preload) &&
						(a.state.loading & 3) === 0 &&
						(n.count++, (a = Oo.bind(n)), r.addEventListener("load", a), r.addEventListener("error", a)));
			}
		}
		var Vd = 0;
		function h1(n, r) {
			return (
				n.stylesheets && n.count === 0 && Do(n, n.stylesheets),
				0 < n.count || 0 < n.imgCount
					? function (a) {
							var l = setTimeout(function () {
								if ((n.stylesheets && Do(n, n.stylesheets), n.unsuspend)) {
									var d = n.unsuspend;
									((n.unsuspend = null), d());
								}
							}, 6e4 + r);
							0 < n.imgBytes && Vd === 0 && (Vd = 62500 * Kw());
							var c = setTimeout(
								function () {
									if (
										((n.waitingForImages = !1), n.count === 0 && (n.stylesheets && Do(n, n.stylesheets), n.unsuspend))
									) {
										var d = n.unsuspend;
										((n.unsuspend = null), d());
									}
								},
								(n.imgBytes > Vd ? 50 : 800) + r,
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
		function Oo() {
			if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
				if (this.stylesheets) Do(this, this.stylesheets);
				else if (this.unsuspend) {
					var n = this.unsuspend;
					((this.unsuspend = null), n());
				}
			}
		}
		var zo = null;
		function Do(n, r) {
			((n.stylesheets = null),
				n.unsuspend !== null && (n.count++, (zo = new Map()), r.forEach(m1, n), (zo = null), Oo.call(n)));
		}
		function m1(n, r) {
			if (!(r.state.loading & 4)) {
				var a = zo.get(n);
				if (a) var l = a.get(null);
				else {
					((a = new Map()), zo.set(n, a));
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
					(l = Oo.bind(this)),
					c.addEventListener("load", l),
					c.addEventListener("error", l),
					d
						? d.parentNode.insertBefore(c, d.nextSibling)
						: ((n = n.nodeType === 9 ? n.head : n), n.insertBefore(c, n.firstChild)),
					(r.state.loading |= 4));
			}
		}
		var Xl = { $$typeof: k, Provider: null, Consumer: null, _currentValue: ve, _currentValue2: ve, _threadCount: 0 };
		function v1(n, r, a, l, c, d, y, x, j) {
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
				(this.formState = j),
				(this.incompleteTransitions = new Map()));
		}
		function g1(n, r, a, l, c, d, y, x, j, K, ne, ue) {
			return (
				(n = new v1(n, r, a, y, j, K, ne, ue, x)),
				(r = 1),
				d === !0 && (r |= 24),
				(d = cr(3, null, null, r)),
				(n.current = d),
				(d.stateNode = n),
				(r = wf()),
				r.refCount++,
				(n.pooledCache = r),
				r.refCount++,
				(d.memoizedState = { element: l, isDehydrated: a, cache: r }),
				Af(d),
				n
			);
		}
		function y1(n) {
			return n ? ((n = du), n) : du;
		}
		function ap(n, r, a, l, c, d) {
			((c = y1(c)),
				l.context === null ? (l.context = c) : (l.pendingContext = c),
				(l = La(r)),
				(l.payload = { element: a }),
				(d = d === void 0 ? null : d),
				d !== null && (l.callback = d),
				(a = qa(n, l, r)),
				a !== null && (er(a, n, r), kl(a, n, r)));
		}
		function up(n, r) {
			if (((n = n.memoizedState), n !== null && n.dehydrated !== null)) {
				var a = n.retryLane;
				n.retryLane = a !== 0 && a < r ? a : r;
			}
		}
		function Zd(n, r) {
			(up(n, r), (n = n.alternate) && up(n, r));
		}
		function lp(n) {
			if (n.tag === 13 || n.tag === 31) {
				var r = Ca(n, 67108864);
				(r !== null && er(r, n, 67108864), Zd(n, 67108864));
			}
		}
		function sp(n) {
			if (n.tag === 13 || n.tag === 31) {
				var r = Mr();
				r = In(r);
				var a = Ca(n, r);
				(a !== null && er(a, n, r), Zd(n, r));
			}
		}
		var jo = !0;
		function p1(n, r, a, l) {
			var c = $.T;
			$.T = null;
			var d = H.p;
			try {
				((H.p = 2), Hd(n, r, a, l));
			} finally {
				((H.p = d), ($.T = c));
			}
		}
		function b1(n, r, a, l) {
			var c = $.T;
			$.T = null;
			var d = H.p;
			try {
				((H.p = 8), Hd(n, r, a, l));
			} finally {
				((H.p = d), ($.T = c));
			}
		}
		function Hd(n, r, a, l) {
			if (jo) {
				var c = Pd(l);
				if (c === null) (Nd(n, r, l, Io, a), cp(n, l));
				else if (S1(c, n, r, a, l)) l.stopPropagation();
				else if ((cp(n, l), r & 4 && -1 < _1.indexOf(n))) {
					for (; c !== null; ) {
						var d = Yn(c);
						if (d !== null)
							switch (d.tag) {
								case 3:
									if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
										var y = Nn(d.pendingLanes);
										if (y !== 0) {
											var x = d;
											for (x.pendingLanes |= 2, x.entangledLanes |= 2; y; ) {
												var j = 1 << (31 - ot(y));
												((x.entanglements[1] |= j), (y &= ~j));
											}
											(wi(d), (lt & 6) === 0 && ((po = Me() + 500), Pl(0, !1)));
										}
									}
									break;
								case 31:
								case 13:
									((x = Ca(d, 2)), x !== null && er(x, d, 2), _o(), Zd(d, 2));
							}
						if (((d = Pd(l)), d === null && Nd(n, r, l, Io, a), d === c)) break;
						c = d;
					}
					c !== null && l.stopPropagation();
				} else Nd(n, r, l, null, a);
			}
		}
		function Pd(n) {
			return ((n = Un(n)), Qd(n));
		}
		var Io = null;
		function Qd(n) {
			if (((Io = null), (n = Kt(n)), n !== null)) {
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
			return ((Io = n), null);
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
					switch (yt()) {
						case pn:
							return 2;
						case at:
							return 8;
						case Vt:
						case pr:
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
		var Kd = !1,
			ia = null,
			aa = null,
			ua = null,
			Jl = new Map(),
			Wl = new Map(),
			la = [],
			_1 =
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
					Jl.delete(r.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture":
					Wl.delete(r.pointerId);
			}
		}
		function es(n, r, a, l, c, d) {
			return n === null || n.nativeEvent !== d
				? ((n = { blockedOn: r, domEventName: a, eventSystemFlags: l, nativeEvent: d, targetContainers: [c] }),
					r !== null && ((r = Yn(r)), r !== null && lp(r)),
					n)
				: ((n.eventSystemFlags |= l), (r = n.targetContainers), c !== null && r.indexOf(c) === -1 && r.push(c), n);
		}
		function S1(n, r, a, l, c) {
			switch (r) {
				case "focusin":
					return ((ia = es(ia, n, r, a, l, c)), !0);
				case "dragenter":
					return ((aa = es(aa, n, r, a, l, c)), !0);
				case "mouseover":
					return ((ua = es(ua, n, r, a, l, c)), !0);
				case "pointerover":
					var d = c.pointerId;
					return (Jl.set(d, es(Jl.get(d) || null, n, r, a, l, c)), !0);
				case "gotpointercapture":
					return ((d = c.pointerId), Wl.set(d, es(Wl.get(d) || null, n, r, a, l, c)), !0);
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
		function Lo(n) {
			if (n.blockedOn !== null) return !1;
			for (var r = n.targetContainers; 0 < r.length; ) {
				var a = Pd(n.nativeEvent);
				if (a === null) {
					a = n.nativeEvent;
					var l = new a.constructor(a.type, a);
					((hl = l), a.target.dispatchEvent(l), (hl = null));
				} else return ((r = Yn(a)), r !== null && lp(r), (n.blockedOn = a), !1);
				r.shift();
			}
			return !0;
		}
		function dp(n, r, a) {
			Lo(n) && a.delete(r);
		}
		function w1() {
			((Kd = !1),
				ia !== null && Lo(ia) && (ia = null),
				aa !== null && Lo(aa) && (aa = null),
				ua !== null && Lo(ua) && (ua = null),
				Jl.forEach(dp),
				Wl.forEach(dp));
		}
		function qo(n, r) {
			n.blockedOn === r &&
				((n.blockedOn = null), Kd || ((Kd = !0), t.unstable_scheduleCallback(t.unstable_NormalPriority, w1)));
		}
		var Uo = null;
		function hp(n) {
			Uo !== n &&
				((Uo = n),
				t.unstable_scheduleCallback(t.unstable_NormalPriority, function () {
					Uo === n && (Uo = null);
					for (var r = 0; r < n.length; r += 3) {
						var a = n[r],
							l = n[r + 1],
							c = n[r + 2];
						if (typeof l != "function") {
							if (Qd(l || a) === null) continue;
							break;
						}
						var d = Yn(a);
						d !== null &&
							(n.splice(r, 3), (r -= 3), Qf(d, { pending: !0, data: c, method: a.method, action: l }, l, c));
					}
				}));
		}
		function Iu(n) {
			function r(j) {
				return qo(j, n);
			}
			(ia !== null && qo(ia, n), aa !== null && qo(aa, n), ua !== null && qo(ua, n), Jl.forEach(r), Wl.forEach(r));
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
							else if (Qd(c) !== null) continue;
						} else x = y.action;
						(typeof x == "function" ? (a[l + 1] = x) : (a.splice(l, 3), (l -= 3)), hp(a));
					}
				}
		}
		function E1() {
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
		function Yd(n) {
			this._internalRoot = n;
		}
		((Gd.prototype.render = Yd.prototype.render =
			function (n) {
				var r = this._internalRoot;
				if (r === null) throw Error(s(409));
				var a = r.current;
				ap(a, Mr(), n, r, null, null);
			}),
			(Gd.prototype.unmount = Yd.prototype.unmount =
				function () {
					var n = this._internalRoot;
					if (n !== null) {
						this._internalRoot = null;
						var r = n.containerInfo;
						(ap(n.current, 2, null, n, null, null), _o(), (r[wr] = null));
					}
				}));
		function Gd(n) {
			this._internalRoot = n;
		}
		Gd.prototype.unstable_scheduleHydration = function (n) {
			if (n) {
				var r = Li();
				n = { blockedOn: null, target: n, priority: r };
				for (var a = 0; a < la.length && r !== 0 && r < la[a].priority; a++);
				(la.splice(a, 0, n), a === 0 && fp(n));
			}
		};
		var mp = i.version;
		if (mp !== "19.2.8") throw Error(s(527, mp, "19.2.8"));
		H.findDOMNode = function (n) {
			var r = n._reactInternals;
			if (r === void 0)
				throw typeof n.render == "function" ? Error(s(188)) : ((n = Object.keys(n).join(",")), Error(s(268, n)));
			return ((n = g(r)), (n = n !== null ? S(n) : null), (n = n === null ? null : n.stateNode), n);
		};
		var T1 = {
			bundleType: 0,
			version: "19.2.8",
			rendererPackageName: "react-dom",
			currentDispatcherRef: $,
			reconcilerVersion: "19.2.8",
		};
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
			var $o = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (!$o.isDisabled && $o.supportsFiber)
				try {
					((kn = $o.inject(T1)), (pt = $o));
				} catch {}
		}
		e.createRoot = function (n, r) {
			if (!o(n)) throw Error(s(299));
			var a = !1,
				l = "",
				c = bw,
				d = _w,
				y = Sw;
			return (
				r != null &&
					(r.unstable_strictMode === !0 && (a = !0),
					r.identifierPrefix !== void 0 && (l = r.identifierPrefix),
					r.onUncaughtError !== void 0 && (c = r.onUncaughtError),
					r.onCaughtError !== void 0 && (d = r.onCaughtError),
					r.onRecoverableError !== void 0 && (y = r.onRecoverableError)),
				(r = g1(n, 1, !1, null, null, a, l, null, c, d, y, E1)),
				(n[wr] = r.current),
				jy(n),
				new Yd(r)
			);
		};
	}),
	yT = Ir((e, t) => {
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
		(i(), (t.exports = gT()));
	}),
	Up;
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
var Qu = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	},
	Eb = class extends Error {
		constructor(e) {
			(super(`Encountered unidirectional transform during encode: ${e}`), (this.name = "ZodEncodeError"));
		}
	};
(Up = globalThis).__zod_globalConfig ?? (Up.__zod_globalConfig = {});
var dc = globalThis.__zod_globalConfig;
function Mi(e) {
	return (e && Object.assign(dc, e), dc);
}
function Tb(e) {
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
function pT(e, t) {
	const i = e / t,
		u = Math.round(i),
		s = Number.EPSILON * Math.max(Math.abs(i), 1);
	return Math.abs(i - u) < s ? 0 : i - u;
}
var $p = Symbol("evaluating");
function gt(e, t, i) {
	let u;
	Object.defineProperty(e, t, {
		get() {
			if (u !== $p) return (u === void 0 && ((u = $p), (u = i())), u);
		},
		set(s) {
			Object.defineProperty(e, t, { value: s });
		},
		configurable: !0,
	});
}
function nu(e, t, i) {
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
function Bp(e) {
	return JSON.stringify(e);
}
function bT(e) {
	return e
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}
var xb = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function hc(e) {
	return typeof e == "object" && e !== null && !Array.isArray(e);
}
var _T = tm(() => {
	if (dc.jitless || (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))) return !1;
	try {
		return !1;
	} catch {
		return !1;
	}
});
function Xu(e) {
	if (hc(e) === !1) return !1;
	const t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	const i = t.prototype;
	return !(hc(i) === !1 || Object.prototype.hasOwnProperty.call(i, "isPrototypeOf") === !1);
}
function Ab(e) {
	return Xu(e)
		? { ...e }
		: Array.isArray(e)
			? [...e]
			: e instanceof Map
				? new Map(e)
				: e instanceof Set
					? new Set(e)
					: e;
}
var ST = new Set(["string", "number", "symbol"]);
function Ju(e) {
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
function wT(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
var ET = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
function TT(e, t) {
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
				return (nu(this, "shape", s), s);
			},
			checks: [],
		}),
	);
}
function xT(e, t) {
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
				return (nu(this, "shape", s), s);
			},
			checks: [],
		}),
	);
}
function AT(e, t) {
	if (!Xu(t)) throw new Error("Invalid input to extend: expected a plain object");
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
				return (nu(this, "shape", u), u);
			},
		}),
	);
}
function RT(e, t) {
	if (!Xu(t)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return ba(
		e,
		pa(e._zod.def, {
			get shape() {
				const i = { ...e._zod.def.shape, ...t };
				return (nu(this, "shape", i), i);
			},
		}),
	);
}
function CT(e, t) {
	if (e._zod.def.checks?.length)
		throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return ba(
		e,
		pa(e._zod.def, {
			get shape() {
				const i = { ...e._zod.def.shape, ...t._zod.def.shape };
				return (nu(this, "shape", i), i);
			},
			get catchall() {
				return t._zod.def.catchall;
			},
			checks: t._zod.def.checks ?? [],
		}),
	);
}
function kT(e, t, i) {
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
				return (nu(this, "shape", o), o);
			},
			checks: [],
		}),
	);
}
function NT(e, t, i) {
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
				return (nu(this, "shape", s), s);
			},
		}),
	);
}
function Vu(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let i = t; i < e.issues.length; i++) if (e.issues[i]?.continue !== !0) return !0;
	return !1;
}
function MT(e, t = 0) {
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
function Po(e) {
	return typeof e == "string" ? e : e?.message;
}
function Oi(e, t, i) {
	const u = e.message
			? e.message
			: (Po(e.inst?._zod.def?.error?.(e)) ??
				Po(t?.error?.(e)) ??
				Po(i.customError?.(e)) ??
				Po(i.localeError?.(e)) ??
				"Invalid input"),
		{ inst: s, continue: o, input: f, ...h } = e;
	return (h.path ?? (h.path = []), (h.message = u), t?.reportInput && (h.input = f), h);
}
function im(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function fs(...e) {
	const [t, i, u] = e;
	return typeof t == "string" ? { message: t, code: "custom", input: i, inst: u } : { ...t };
}
var Rb = (e, t) => {
		((e.name = "$ZodError"),
			Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
			Object.defineProperty(e, "issues", { value: t, enumerable: !1 }),
			(e.message = JSON.stringify(t, zh, 2)),
			Object.defineProperty(e, "toString", { value: () => e.message, enumerable: !1 }));
	},
	Cb = re("$ZodError", Rb),
	kb = re("$ZodError", Rb, { Parent: Error });
function OT(e, t = (i) => i.message) {
	const i = {},
		u = [];
	for (const s of e.issues)
		s.path.length > 0 ? ((i[s.path[0]] = i[s.path[0]] || []), i[s.path[0]].push(t(s))) : u.push(t(s));
	return { formErrors: u, fieldErrors: i };
}
function zT(e, t = (i) => i.message) {
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
		if (f instanceof Promise) throw new Qu();
		if (f.issues.length) {
			const h = new (s?.Err ?? e)(f.issues.map((m) => Oi(m, o, Mi())));
			throw (xb(h, s?.callee), h);
		}
		return f.value;
	},
	um = (e) => async (t, i, u, s) => {
		const o = u ? { ...u, async: !0 } : { async: !0 };
		let f = t._zod.run({ value: i, issues: [] }, o);
		if ((f instanceof Promise && (f = await f), f.issues.length)) {
			const h = new (s?.Err ?? e)(f.issues.map((m) => Oi(m, o, Mi())));
			throw (xb(h, s?.callee), h);
		}
		return f.value;
	},
	Ac = (e) => (t, i, u) => {
		const s = u ? { ...u, async: !1 } : { async: !1 },
			o = t._zod.run({ value: i, issues: [] }, s);
		if (o instanceof Promise) throw new Qu();
		return o.issues.length
			? { success: !1, error: new (e ?? Cb)(o.issues.map((f) => Oi(f, s, Mi()))) }
			: { success: !0, data: o.value };
	},
	DT = Ac(kb),
	Rc = (e) => async (t, i, u) => {
		const s = u ? { ...u, async: !0 } : { async: !0 };
		let o = t._zod.run({ value: i, issues: [] }, s);
		return (
			o instanceof Promise && (o = await o),
			o.issues.length
				? { success: !1, error: new e(o.issues.map((f) => Oi(f, s, Mi()))) }
				: { success: !0, data: o.value }
		);
	},
	jT = Rc(kb),
	IT = (e) => (t, i, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return am(e)(t, i, s);
	},
	LT = (e) => (t, i, u) => am(e)(t, i, u),
	qT = (e) => async (t, i, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return um(e)(t, i, s);
	},
	UT = (e) => async (t, i, u) => um(e)(t, i, u),
	$T = (e) => (t, i, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Ac(e)(t, i, s);
	},
	BT = (e) => (t, i, u) => Ac(e)(t, i, u),
	VT = (e) => async (t, i, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Rc(e)(t, i, s);
	},
	ZT = (e) => async (t, i, u) => Rc(e)(t, i, u),
	HT = /^[cC][0-9a-z]{6,}$/,
	PT = /^[0-9a-z]+$/,
	QT = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
	KT = /^[0-9a-vA-V]{20}$/,
	YT = /^[A-Za-z0-9]{27}$/,
	GT = /^[a-zA-Z0-9_-]{21}$/,
	FT = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
	XT = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
	Vp = (e) =>
		e
			? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`)
			: /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
	JT = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
	WT = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function ex() {
	return new RegExp(WT, "u");
}
var tx =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	nx =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
	rx =
		/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
	ix =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	ax = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
	Nb = /^[A-Za-z0-9_-]*$/,
	ux = /^https?$/,
	lx = /^\+[1-9]\d{6,14}$/,
	Mb =
		"(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
	sx = new RegExp(`^${Mb}$`);
function Ob(e) {
	const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number"
		? e.precision === -1
			? `${t}`
			: e.precision === 0
				? `${t}:[0-5]\\d`
				: `${t}:[0-5]\\d\\.\\d{${e.precision}}`
		: `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function ox(e) {
	return new RegExp(`^${Ob(e)}$`);
}
function cx(e) {
	const t = Ob({ precision: e.precision }),
		i = ["Z"];
	(e.local && i.push(""), e.offset && i.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)"));
	const u = `${t}(?:${i.join("|")})`;
	return new RegExp(`^${Mb}T(?:${u})$`);
}
var fx = (e) => {
		const t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
		return new RegExp(`^${t}$`);
	},
	dx = /^-?\d+$/,
	zb = /^-?\d+(?:\.\d+)?$/,
	hx = /^(?:true|false)$/i,
	mx = /^undefined$/i,
	vx = /^[^A-Z]*$/,
	gx = /^[^a-z]*$/,
	ir = re("$ZodCheck", (e, t) => {
		var i;
		(e._zod ?? (e._zod = {}), (e._zod.def = t), (i = e._zod).onattach ?? (i.onattach = []));
	}),
	Db = { number: "number", bigint: "bigint", object: "date" },
	jb = re("$ZodCheckLessThan", (e, t) => {
		ir.init(e, t);
		const i = Db[typeof t.value];
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
	Ib = re("$ZodCheckGreaterThan", (e, t) => {
		ir.init(e, t);
		const i = Db[typeof t.value];
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
	yx = re("$ZodCheckMultipleOf", (e, t) => {
		(ir.init(e, t),
			e._zod.onattach.push((i) => {
				var u;
				(u = i._zod.bag).multipleOf ?? (u.multipleOf = t.value);
			}),
			(e._zod.check = (i) => {
				if (typeof i.value != typeof t.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				(typeof i.value == "bigint" ? i.value % t.value === BigInt(0) : pT(i.value, t.value) === 0) ||
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
	px = re("$ZodCheckNumberFormat", (e, t) => {
		(ir.init(e, t), (t.format = t.format || "float64"));
		const i = t.format?.includes("int"),
			u = i ? "int" : "number",
			[s, o] = ET[t.format];
		(e._zod.onattach.push((f) => {
			const h = f._zod.bag;
			((h.format = t.format), (h.minimum = s), (h.maximum = o), i && (h.pattern = dx));
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
	bx = re("$ZodCheckMaxLength", (e, t) => {
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
	_x = re("$ZodCheckMinLength", (e, t) => {
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
	Sx = re("$ZodCheckLengthEquals", (e, t) => {
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
	Cc = re("$ZodCheckStringFormat", (e, t) => {
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
	wx = re("$ZodCheckRegex", (e, t) => {
		(Cc.init(e, t),
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
	Ex = re("$ZodCheckLowerCase", (e, t) => {
		(t.pattern ?? (t.pattern = vx), Cc.init(e, t));
	}),
	Tx = re("$ZodCheckUpperCase", (e, t) => {
		(t.pattern ?? (t.pattern = gx), Cc.init(e, t));
	}),
	xx = re("$ZodCheckIncludes", (e, t) => {
		ir.init(e, t);
		const i = Ju(t.includes),
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
	Ax = re("$ZodCheckStartsWith", (e, t) => {
		ir.init(e, t);
		const i = new RegExp(`^${Ju(t.prefix)}.*`);
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
	Rx = re("$ZodCheckEndsWith", (e, t) => {
		ir.init(e, t);
		const i = new RegExp(`.*${Ju(t.suffix)}$`);
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
	Cx = re("$ZodCheckOverwrite", (e, t) => {
		(ir.init(e, t),
			(e._zod.check = (i) => {
				i.value = t.tx(i.value);
			}));
	}),
	kx = class {
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
	Nx = { major: 4, minor: 4, patch: 3 },
	Mt = re("$ZodType", (e, t) => {
		var i;
		(e ?? (e = {}), (e._zod.def = t), (e._zod.bag = e._zod.bag || {}), (e._zod.version = Nx));
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
					let v = Vu(f),
						g;
					for (const S of h) {
						if (S._zod.def.when) {
							if (MT(f) || !S._zod.def.when(f)) continue;
						} else if (v) continue;
						const b = f.issues.length,
							p = S._zod.check(f);
						if (p instanceof Promise && m?.async === !1) throw new Qu();
						if (g || p instanceof Promise)
							g = (g ?? Promise.resolve()).then(async () => {
								(await p, f.issues.length !== b && (v || (v = Vu(f, b))));
							});
						else {
							if (f.issues.length === b) continue;
							v || (v = Vu(f, b));
						}
					}
					return g ? g.then(() => f) : f;
				},
				o = (f, h, m) => {
					if (Vu(f)) return ((f.aborted = !0), f);
					const v = s(h, u, m);
					if (v instanceof Promise) {
						if (m.async === !1) throw new Qu();
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
					if (h.async === !1) throw new Qu();
					return m.then((v) => s(v, u, h));
				}
				return s(m, u, h);
			};
		}
		gt(e, "~standard", () => ({
			validate: (s) => {
				try {
					const o = DT(e, s);
					return o.success ? { value: o.data } : { issues: o.error?.issues };
				} catch {
					return jT(e, s).then((f) => (f.success ? { value: f.data } : { issues: f.error?.issues }));
				}
			},
			vendor: "zod",
			version: 1,
		}));
	}),
	lm = re("$ZodString", (e, t) => {
		(Mt.init(e, t),
			(e._zod.pattern = [...(e?._zod.bag?.patterns ?? [])].pop() ?? fx(e._zod.bag)),
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
		(Cc.init(e, t), lm.init(e, t));
	}),
	Mx = re("$ZodGUID", (e, t) => {
		(t.pattern ?? (t.pattern = XT), Ot.init(e, t));
	}),
	Ox = re("$ZodUUID", (e, t) => {
		if (t.version) {
			const i = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[t.version];
			if (i === void 0) throw new Error(`Invalid UUID version: "${t.version}"`);
			t.pattern ?? (t.pattern = Vp(i));
		} else t.pattern ?? (t.pattern = Vp());
		Ot.init(e, t);
	}),
	zx = re("$ZodEmail", (e, t) => {
		(t.pattern ?? (t.pattern = JT), Ot.init(e, t));
	}),
	Dx = re("$ZodURL", (e, t) => {
		(Ot.init(e, t),
			(e._zod.check = (i) => {
				try {
					const u = i.value.trim();
					if (!t.normalize && t.protocol?.source === ux.source && !/^https?:\/\//i.test(u)) {
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
	jx = re("$ZodEmoji", (e, t) => {
		(t.pattern ?? (t.pattern = ex()), Ot.init(e, t));
	}),
	Ix = re("$ZodNanoID", (e, t) => {
		(t.pattern ?? (t.pattern = GT), Ot.init(e, t));
	}),
	Lx = re("$ZodCUID", (e, t) => {
		(t.pattern ?? (t.pattern = HT), Ot.init(e, t));
	}),
	qx = re("$ZodCUID2", (e, t) => {
		(t.pattern ?? (t.pattern = PT), Ot.init(e, t));
	}),
	Ux = re("$ZodULID", (e, t) => {
		(t.pattern ?? (t.pattern = QT), Ot.init(e, t));
	}),
	$x = re("$ZodXID", (e, t) => {
		(t.pattern ?? (t.pattern = KT), Ot.init(e, t));
	}),
	Bx = re("$ZodKSUID", (e, t) => {
		(t.pattern ?? (t.pattern = YT), Ot.init(e, t));
	}),
	Vx = re("$ZodISODateTime", (e, t) => {
		(t.pattern ?? (t.pattern = cx(t)), Ot.init(e, t));
	}),
	Zx = re("$ZodISODate", (e, t) => {
		(t.pattern ?? (t.pattern = sx), Ot.init(e, t));
	}),
	Hx = re("$ZodISOTime", (e, t) => {
		(t.pattern ?? (t.pattern = ox(t)), Ot.init(e, t));
	}),
	Px = re("$ZodISODuration", (e, t) => {
		(t.pattern ?? (t.pattern = FT), Ot.init(e, t));
	}),
	Qx = re("$ZodIPv4", (e, t) => {
		(t.pattern ?? (t.pattern = tx), Ot.init(e, t), (e._zod.bag.format = "ipv4"));
	}),
	Kx = re("$ZodIPv6", (e, t) => {
		(t.pattern ?? (t.pattern = nx),
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
	Yx = re("$ZodCIDRv4", (e, t) => {
		(t.pattern ?? (t.pattern = rx), Ot.init(e, t));
	}),
	Gx = re("$ZodCIDRv6", (e, t) => {
		(t.pattern ?? (t.pattern = ix),
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
function Lb(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 !== 0) return !1;
	try {
		return (atob(e), !0);
	} catch {
		return !1;
	}
}
var Fx = re("$ZodBase64", (e, t) => {
	(t.pattern ?? (t.pattern = ax),
		Ot.init(e, t),
		(e._zod.bag.contentEncoding = "base64"),
		(e._zod.check = (i) => {
			Lb(i.value) ||
				i.issues.push({ code: "invalid_format", format: "base64", input: i.value, inst: e, continue: !t.abort });
		}));
});
function Xx(e) {
	if (!Nb.test(e)) return !1;
	const t = e.replace(/[-_]/g, (i) => (i === "-" ? "+" : "/"));
	return Lb(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
var Jx = re("$ZodBase64URL", (e, t) => {
		(t.pattern ?? (t.pattern = Nb),
			Ot.init(e, t),
			(e._zod.bag.contentEncoding = "base64url"),
			(e._zod.check = (i) => {
				Xx(i.value) ||
					i.issues.push({ code: "invalid_format", format: "base64url", input: i.value, inst: e, continue: !t.abort });
			}));
	}),
	Wx = re("$ZodE164", (e, t) => {
		(t.pattern ?? (t.pattern = lx), Ot.init(e, t));
	});
function eA(e, t = null) {
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
var tA = re("$ZodJWT", (e, t) => {
		(Ot.init(e, t),
			(e._zod.check = (i) => {
				eA(i.value, t.alg) ||
					i.issues.push({ code: "invalid_format", format: "jwt", input: i.value, inst: e, continue: !t.abort });
			}));
	}),
	qb = re("$ZodNumber", (e, t) => {
		(Mt.init(e, t),
			(e._zod.pattern = e._zod.bag.pattern ?? zb),
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
	nA = re("$ZodNumberFormat", (e, t) => {
		(px.init(e, t), qb.init(e, t));
	}),
	rA = re("$ZodBoolean", (e, t) => {
		(Mt.init(e, t),
			(e._zod.pattern = hx),
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
	iA = re("$ZodUndefined", (e, t) => {
		(Mt.init(e, t),
			(e._zod.pattern = mx),
			(e._zod.values = new Set([void 0])),
			(e._zod.parse = (i, u) => {
				const s = i.value;
				return (typeof s > "u" || i.issues.push({ expected: "undefined", code: "invalid_type", input: s, inst: e }), i);
			}));
	}),
	aA = re("$ZodUnknown", (e, t) => {
		(Mt.init(e, t), (e._zod.parse = (i) => i));
	}),
	uA = re("$ZodNever", (e, t) => {
		(Mt.init(e, t),
			(e._zod.parse = (i, u) => (
				i.issues.push({ expected: "never", code: "invalid_type", input: i.value, inst: e }),
				i
			)));
	});
function Zp(e, t, i) {
	(e.issues.length && t.issues.push(...Zu(i, e.issues)), (t.value[i] = e.value));
}
var lA = re("$ZodArray", (e, t) => {
	(Mt.init(e, t),
		(e._zod.parse = (i, u) => {
			const s = i.value;
			if (!Array.isArray(s)) return (i.issues.push({ expected: "array", code: "invalid_type", input: s, inst: e }), i);
			i.value = Array(s.length);
			const o = [];
			for (let f = 0; f < s.length; f++) {
				const h = s[f],
					m = t.element._zod.run({ value: h, issues: [] }, u);
				m instanceof Promise ? o.push(m.then((v) => Zp(v, i, f))) : Zp(m, i, f);
			}
			return o.length ? Promise.all(o).then(() => i) : i;
		}));
});
function mc(e, t, i, u, s, o) {
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
function Ub(e) {
	const t = Object.keys(e.shape);
	for (const u of t)
		if (!e.shape?.[u]?._zod?.traits?.has("$ZodType"))
			throw new Error(`Invalid element at key "${u}": expected a Zod schema`);
	const i = wT(e.shape);
	return { ...e, keys: t, keySet: new Set(t), numKeys: t.length, optionalKeys: new Set(i) };
}
function $b(e, t, i, u, s, o) {
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
		p instanceof Promise ? e.push(p.then((E) => mc(E, i, b, t, g, S))) : mc(p, i, b, t, g, S);
	}
	return (
		f.length && i.issues.push({ code: "unrecognized_keys", keys: f, input: t, inst: o }),
		e.length ? Promise.all(e).then(() => i) : i
	);
}
var sA = re("$ZodObject", (e, t) => {
		if ((Mt.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get)) {
			const f = t.shape;
			Object.defineProperty(t, "shape", {
				get: () => {
					const h = { ...f };
					return (Object.defineProperty(t, "shape", { value: h }), h);
				},
			});
		}
		const i = tm(() => Ub(t));
		gt(e._zod, "propValues", () => {
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
		const u = hc,
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
					E = b._zod.optout === "optional",
					A = b._zod.run({ value: m[S], issues: [] }, h);
				A instanceof Promise ? v.push(A.then((M) => mc(M, f, S, m, p, E))) : mc(A, f, S, m, p, E);
			}
			return s ? $b(v, m, f, h, i.value, e) : v.length ? Promise.all(v).then(() => f) : f;
		};
	}),
	oA = re("$ZodObjectJIT", (e, t) => {
		sA.init(e, t);
		const i = e._zod.parse,
			u = tm(() => Ub(t)),
			s = (b) => {
				const p = new kx(["shape", "payload", "ctx"]),
					E = u.value,
					A = (C) => {
						const k = Bp(C);
						return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
					};
				p.write("const input = payload.value;");
				const M = Object.create(null);
				let q = 0;
				for (const C of E.keys) M[C] = `key_${q++}`;
				p.write("const newResult = {};");
				for (const C of E.keys) {
					const k = M[C],
						O = Bp(C),
						Y = b[C],
						X = Y?._zod?.optin === "optional",
						D = Y?._zod?.optout === "optional";
					(p.write(`const ${k} = ${A(C)};`),
						X && D
							? p.write(`
        if (${k}.issues.length) {
          if (${O} in input) {
            payload.issues = payload.issues.concat(${k}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${O}, ...iss.path] : [${O}]
            })));
          }
        }
        
        if (${k}.value === undefined) {
          if (${O} in input) {
            newResult[${O}] = undefined;
          }
        } else {
          newResult[${O}] = ${k}.value;
        }
        
      `)
							: X
								? p.write(`
        if (${k}.issues.length) {
          payload.issues = payload.issues.concat(${k}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${O}, ...iss.path] : [${O}]
          })));
        }
        
        if (${k}.value === undefined) {
          if (${O} in input) {
            newResult[${O}] = undefined;
          }
        } else {
          newResult[${O}] = ${k}.value;
        }
        
      `)
								: p.write(`
        const ${k}_present = ${O} in input;
        if (${k}.issues.length) {
          payload.issues = payload.issues.concat(${k}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${O}, ...iss.path] : [${O}]
          })));
        }
        if (!${k}_present && !${k}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${O}]
          });
        }

        if (${k}_present) {
          if (${k}.value === undefined) {
            newResult[${O}] = undefined;
          } else {
            newResult[${O}] = ${k}.value;
          }
        }

      `));
				}
				(p.write("payload.value = newResult;"), p.write("return payload;"));
				const z = p.compile();
				return (C, k) => z(b, C, k);
			};
		let o;
		const f = hc,
			h = !dc.jitless,
			v = h && _T.value,
			g = t.catchall;
		let S;
		e._zod.parse = (b, p) => {
			S ?? (S = u.value);
			const E = b.value;
			return f(E)
				? h && v && p?.async === !1 && p.jitless !== !0
					? (o || (o = s(t.shape)), (b = o(b, p)), g ? $b([], E, b, p, S, e) : b)
					: i(b, p)
				: (b.issues.push({ expected: "object", code: "invalid_type", input: E, inst: e }), b);
		};
	});
function Hp(e, t, i, u) {
	for (const o of e) if (o.issues.length === 0) return ((t.value = o.value), t);
	const s = e.filter((o) => !Vu(o));
	return s.length === 1
		? ((t.value = s[0].value), s[0])
		: (t.issues.push({
				code: "invalid_union",
				input: t.value,
				inst: i,
				errors: e.map((o) => o.issues.map((f) => Oi(f, u, Mi()))),
			}),
			t);
}
var cA = re("$ZodUnion", (e, t) => {
		(Mt.init(e, t),
			gt(e._zod, "optin", () => (t.options.some((u) => u._zod.optin === "optional") ? "optional" : void 0)),
			gt(e._zod, "optout", () => (t.options.some((u) => u._zod.optout === "optional") ? "optional" : void 0)),
			gt(e._zod, "values", () => {
				if (t.options.every((u) => u._zod.values)) return new Set(t.options.flatMap((u) => Array.from(u._zod.values)));
			}),
			gt(e._zod, "pattern", () => {
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
			return o ? Promise.all(f).then((h) => Hp(h, u, e, s)) : Hp(f, u, e, s);
		};
	}),
	fA = re("$ZodIntersection", (e, t) => {
		(Mt.init(e, t),
			(e._zod.parse = (i, u) => {
				const s = i.value,
					o = t.left._zod.run({ value: s, issues: [] }, u),
					f = t.right._zod.run({ value: s, issues: [] }, u);
				return o instanceof Promise || f instanceof Promise
					? Promise.all([o, f]).then(([h, m]) => Pp(i, h, m))
					: Pp(i, o, f);
			}));
	});
function Dh(e, t) {
	if (e === t) return { valid: !0, data: e };
	if (e instanceof Date && t instanceof Date && +e == +t) return { valid: !0, data: e };
	if (Xu(e) && Xu(t)) {
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
function Pp(e, t, i) {
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
	if ((o.length && s && e.issues.push({ ...s, keys: o }), Vu(e))) return e;
	const f = Dh(t.value, i.value);
	if (!f.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(f.mergeErrorPath)}`);
	return ((e.value = f.data), e);
}
var dA = re("$ZodRecord", (e, t) => {
		(Mt.init(e, t),
			(e._zod.parse = (i, u) => {
				const s = i.value;
				if (!Xu(s)) return (i.issues.push({ expected: "record", code: "invalid_type", input: s, inst: e }), i);
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
									issues: g.issues.map((p) => Oi(p, u, Mi())),
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
						if (typeof h == "string" && zb.test(h) && m.issues.length) {
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
										issues: m.issues.map((g) => Oi(g, u, Mi())),
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
	hA = re("$ZodEnum", (e, t) => {
		Mt.init(e, t);
		const i = Tb(t.entries),
			u = new Set(i);
		((e._zod.values = u),
			(e._zod.pattern = new RegExp(
				`^(${i
					.filter((s) => ST.has(typeof s))
					.map((s) => (typeof s == "string" ? Ju(s) : s.toString()))
					.join("|")})$`,
			)),
			(e._zod.parse = (s, o) => {
				const f = s.value;
				return (u.has(f) || s.issues.push({ code: "invalid_value", values: i, input: f, inst: e }), s);
			}));
	}),
	mA = re("$ZodLiteral", (e, t) => {
		if ((Mt.init(e, t), t.values.length === 0)) throw new Error("Cannot create literal schema with no valid values");
		const i = new Set(t.values);
		((e._zod.values = i),
			(e._zod.pattern = new RegExp(
				`^(${t.values.map((u) => (typeof u == "string" ? Ju(u) : u ? Ju(u.toString()) : String(u))).join("|")})$`,
			)),
			(e._zod.parse = (u, s) => {
				const o = u.value;
				return (i.has(o) || u.issues.push({ code: "invalid_value", values: t.values, input: o, inst: e }), u);
			}));
	}),
	vA = re("$ZodTransform", (e, t) => {
		(Mt.init(e, t),
			(e._zod.optin = "optional"),
			(e._zod.parse = (i, u) => {
				if (u.direction === "backward") throw new Eb(e.constructor.name);
				const s = t.transform(i.value, i);
				if (u.async)
					return (s instanceof Promise ? s : Promise.resolve(s)).then((o) => ((i.value = o), (i.fallback = !0), i));
				if (s instanceof Promise) throw new Qu();
				return ((i.value = s), (i.fallback = !0), i);
			}));
	});
function Qp(e, t) {
	return t === void 0 && (e.issues.length || e.fallback) ? { issues: [], value: void 0 } : e;
}
var Bb = re("$ZodOptional", (e, t) => {
		(Mt.init(e, t),
			(e._zod.optin = "optional"),
			(e._zod.optout = "optional"),
			gt(e._zod, "values", () => (t.innerType._zod.values ? new Set([...t.innerType._zod.values, void 0]) : void 0)),
			gt(e._zod, "pattern", () => {
				const i = t.innerType._zod.pattern;
				return i ? new RegExp(`^(${rm(i.source)})?$`) : void 0;
			}),
			(e._zod.parse = (i, u) => {
				if (t.innerType._zod.optin === "optional") {
					const s = i.value,
						o = t.innerType._zod.run(i, u);
					return o instanceof Promise ? o.then((f) => Qp(f, s)) : Qp(o, s);
				}
				return i.value === void 0 ? i : t.innerType._zod.run(i, u);
			}));
	}),
	gA = re("$ZodExactOptional", (e, t) => {
		(Bb.init(e, t),
			gt(e._zod, "values", () => t.innerType._zod.values),
			gt(e._zod, "pattern", () => t.innerType._zod.pattern),
			(e._zod.parse = (i, u) => t.innerType._zod.run(i, u)));
	}),
	yA = re("$ZodNullable", (e, t) => {
		(Mt.init(e, t),
			gt(e._zod, "optin", () => t.innerType._zod.optin),
			gt(e._zod, "optout", () => t.innerType._zod.optout),
			gt(e._zod, "pattern", () => {
				const i = t.innerType._zod.pattern;
				return i ? new RegExp(`^(${rm(i.source)}|null)$`) : void 0;
			}),
			gt(e._zod, "values", () => (t.innerType._zod.values ? new Set([...t.innerType._zod.values, null]) : void 0)),
			(e._zod.parse = (i, u) => (i.value === null ? i : t.innerType._zod.run(i, u))));
	}),
	pA = re("$ZodDefault", (e, t) => {
		(Mt.init(e, t),
			(e._zod.optin = "optional"),
			gt(e._zod, "values", () => t.innerType._zod.values),
			(e._zod.parse = (i, u) => {
				if (u.direction === "backward") return t.innerType._zod.run(i, u);
				if (i.value === void 0) return ((i.value = t.defaultValue), i);
				const s = t.innerType._zod.run(i, u);
				return s instanceof Promise ? s.then((o) => Kp(o, t)) : Kp(s, t);
			}));
	});
function Kp(e, t) {
	return (e.value === void 0 && (e.value = t.defaultValue), e);
}
var bA = re("$ZodPrefault", (e, t) => {
		(Mt.init(e, t),
			(e._zod.optin = "optional"),
			gt(e._zod, "values", () => t.innerType._zod.values),
			(e._zod.parse = (i, u) => (
				u.direction === "backward" || (i.value === void 0 && (i.value = t.defaultValue)),
				t.innerType._zod.run(i, u)
			)));
	}),
	_A = re("$ZodNonOptional", (e, t) => {
		(Mt.init(e, t),
			gt(e._zod, "values", () => {
				const i = t.innerType._zod.values;
				return i ? new Set([...i].filter((u) => u !== void 0)) : void 0;
			}),
			(e._zod.parse = (i, u) => {
				const s = t.innerType._zod.run(i, u);
				return s instanceof Promise ? s.then((o) => Yp(o, e)) : Yp(s, e);
			}));
	});
function Yp(e, t) {
	return (
		!e.issues.length &&
			e.value === void 0 &&
			e.issues.push({ code: "invalid_type", expected: "nonoptional", input: e.value, inst: t }),
		e
	);
}
var SA = re("$ZodCatch", (e, t) => {
		(Mt.init(e, t),
			(e._zod.optin = "optional"),
			gt(e._zod, "optout", () => t.innerType._zod.optout),
			gt(e._zod, "values", () => t.innerType._zod.values),
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
										error: { issues: o.issues.map((f) => Oi(f, u, Mi())) },
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
								error: { issues: s.issues.map((o) => Oi(o, u, Mi())) },
								input: i.value,
							})),
							(i.issues = []),
							(i.fallback = !0)),
						i);
			}));
	}),
	wA = re("$ZodPipe", (e, t) => {
		(Mt.init(e, t),
			gt(e._zod, "values", () => t.in._zod.values),
			gt(e._zod, "optin", () => t.in._zod.optin),
			gt(e._zod, "optout", () => t.out._zod.optout),
			gt(e._zod, "propValues", () => t.in._zod.propValues),
			(e._zod.parse = (i, u) => {
				if (u.direction === "backward") {
					const o = t.out._zod.run(i, u);
					return o instanceof Promise ? o.then((f) => Qo(f, t.in, u)) : Qo(o, t.in, u);
				}
				const s = t.in._zod.run(i, u);
				return s instanceof Promise ? s.then((o) => Qo(o, t.out, u)) : Qo(s, t.out, u);
			}));
	});
function Qo(e, t, i) {
	return e.issues.length
		? ((e.aborted = !0), e)
		: t._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, i);
}
var EA = re("$ZodReadonly", (e, t) => {
	(Mt.init(e, t),
		gt(e._zod, "propValues", () => t.innerType._zod.propValues),
		gt(e._zod, "values", () => t.innerType._zod.values),
		gt(e._zod, "optin", () => t.innerType?._zod?.optin),
		gt(e._zod, "optout", () => t.innerType?._zod?.optout),
		(e._zod.parse = (i, u) => {
			if (u.direction === "backward") return t.innerType._zod.run(i, u);
			const s = t.innerType._zod.run(i, u);
			return s instanceof Promise ? s.then(Gp) : Gp(s);
		}));
});
function Gp(e) {
	return ((e.value = Object.freeze(e.value)), e);
}
var TA = re("$ZodCustom", (e, t) => {
	(ir.init(e, t),
		Mt.init(e, t),
		(e._zod.parse = (i, u) => i),
		(e._zod.check = (i) => {
			const u = i.value,
				s = t.fn(u);
			if (s instanceof Promise) return s.then((o) => Fp(o, i, u, e));
			Fp(s, i, u, e);
		}));
});
function Fp(e, t, i, u) {
	if (!e) {
		const s = { code: "custom", input: i, inst: u, path: [...(u._zod.def.path ?? [])], continue: !u._zod.def.abort };
		(u._zod.def.params && (s.params = u._zod.def.params), t.issues.push(fs(s)));
	}
}
var Xp,
	xA = class {
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
function AA() {
	return new xA();
}
(Xp = globalThis).__zod_globalRegistry ?? (Xp.__zod_globalRegistry = AA());
var rs = globalThis.__zod_globalRegistry;
function RA(e, t) {
	return new e({ type: "string", ...xe(t) });
}
function CA(e, t) {
	return new e({ type: "string", format: "email", check: "string_format", abort: !1, ...xe(t) });
}
function Jp(e, t) {
	return new e({ type: "string", format: "guid", check: "string_format", abort: !1, ...xe(t) });
}
function kA(e, t) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, ...xe(t) });
}
function NA(e, t) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v4", ...xe(t) });
}
function MA(e, t) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v6", ...xe(t) });
}
function OA(e, t) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v7", ...xe(t) });
}
function zA(e, t) {
	return new e({ type: "string", format: "url", check: "string_format", abort: !1, ...xe(t) });
}
function DA(e, t) {
	return new e({ type: "string", format: "emoji", check: "string_format", abort: !1, ...xe(t) });
}
function jA(e, t) {
	return new e({ type: "string", format: "nanoid", check: "string_format", abort: !1, ...xe(t) });
}
function IA(e, t) {
	return new e({ type: "string", format: "cuid", check: "string_format", abort: !1, ...xe(t) });
}
function LA(e, t) {
	return new e({ type: "string", format: "cuid2", check: "string_format", abort: !1, ...xe(t) });
}
function qA(e, t) {
	return new e({ type: "string", format: "ulid", check: "string_format", abort: !1, ...xe(t) });
}
function UA(e, t) {
	return new e({ type: "string", format: "xid", check: "string_format", abort: !1, ...xe(t) });
}
function $A(e, t) {
	return new e({ type: "string", format: "ksuid", check: "string_format", abort: !1, ...xe(t) });
}
function BA(e, t) {
	return new e({ type: "string", format: "ipv4", check: "string_format", abort: !1, ...xe(t) });
}
function VA(e, t) {
	return new e({ type: "string", format: "ipv6", check: "string_format", abort: !1, ...xe(t) });
}
function ZA(e, t) {
	return new e({ type: "string", format: "cidrv4", check: "string_format", abort: !1, ...xe(t) });
}
function HA(e, t) {
	return new e({ type: "string", format: "cidrv6", check: "string_format", abort: !1, ...xe(t) });
}
function PA(e, t) {
	return new e({ type: "string", format: "base64", check: "string_format", abort: !1, ...xe(t) });
}
function QA(e, t) {
	return new e({ type: "string", format: "base64url", check: "string_format", abort: !1, ...xe(t) });
}
function KA(e, t) {
	return new e({ type: "string", format: "e164", check: "string_format", abort: !1, ...xe(t) });
}
function YA(e, t) {
	return new e({ type: "string", format: "jwt", check: "string_format", abort: !1, ...xe(t) });
}
function GA(e, t) {
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
function FA(e, t) {
	return new e({ type: "string", format: "date", check: "string_format", ...xe(t) });
}
function XA(e, t) {
	return new e({ type: "string", format: "time", check: "string_format", precision: null, ...xe(t) });
}
function JA(e, t) {
	return new e({ type: "string", format: "duration", check: "string_format", ...xe(t) });
}
function WA(e, t) {
	return new e({ type: "number", checks: [], ...xe(t) });
}
function eR(e, t) {
	return new e({ type: "number", check: "number_format", abort: !1, format: "safeint", ...xe(t) });
}
function tR(e, t) {
	return new e({ type: "boolean", ...xe(t) });
}
function nR(e, t) {
	return new e({ type: "undefined", ...xe(t) });
}
function rR(e) {
	return new e({ type: "unknown" });
}
function iR(e, t) {
	return new e({ type: "never", ...xe(t) });
}
function Wp(e, t) {
	return new jb({ check: "less_than", ...xe(t), value: e, inclusive: !1 });
}
function rh(e, t) {
	return new jb({ check: "less_than", ...xe(t), value: e, inclusive: !0 });
}
function e0(e, t) {
	return new Ib({ check: "greater_than", ...xe(t), value: e, inclusive: !1 });
}
function ih(e, t) {
	return new Ib({ check: "greater_than", ...xe(t), value: e, inclusive: !0 });
}
function t0(e, t) {
	return new yx({ check: "multiple_of", ...xe(t), value: e });
}
function Vb(e, t) {
	return new bx({ check: "max_length", ...xe(t), maximum: e });
}
function vc(e, t) {
	return new _x({ check: "min_length", ...xe(t), minimum: e });
}
function Zb(e, t) {
	return new Sx({ check: "length_equals", ...xe(t), length: e });
}
function aR(e, t) {
	return new wx({ check: "string_format", format: "regex", ...xe(t), pattern: e });
}
function uR(e) {
	return new Ex({ check: "string_format", format: "lowercase", ...xe(e) });
}
function lR(e) {
	return new Tx({ check: "string_format", format: "uppercase", ...xe(e) });
}
function sR(e, t) {
	return new xx({ check: "string_format", format: "includes", ...xe(t), includes: e });
}
function oR(e, t) {
	return new Ax({ check: "string_format", format: "starts_with", ...xe(t), prefix: e });
}
function cR(e, t) {
	return new Rx({ check: "string_format", format: "ends_with", ...xe(t), suffix: e });
}
function tl(e) {
	return new Cx({ check: "overwrite", tx: e });
}
function fR(e) {
	return tl((t) => t.normalize(e));
}
function dR() {
	return tl((e) => e.trim());
}
function hR() {
	return tl((e) => e.toLowerCase());
}
function mR() {
	return tl((e) => e.toUpperCase());
}
function vR() {
	return tl((e) => bT(e));
}
function gR(e, t, i) {
	return new e({ type: "array", element: t, ...xe(i) });
}
function yR(e, t, i) {
	return new e({ type: "custom", check: "custom", fn: t, ...xe(i) });
}
function pR(e, t) {
	const i = bR(
		(u) => (
			(u.addIssue = (s) => {
				if (typeof s == "string") u.issues.push(fs(s, u.value, i._zod.def));
				else {
					const o = s;
					(o.fatal && (o.continue = !1),
						o.code ?? (o.code = "custom"),
						o.input ?? (o.input = u.value),
						o.inst ?? (o.inst = i),
						o.continue ?? (o.continue = !i._zod.def.abort),
						u.issues.push(fs(o)));
				}
			}),
			e(u.value, u)
		),
		t,
	);
	return i;
}
function bR(e, t) {
	const i = new ir({ check: "custom", ...xe(t) });
	return ((i._zod.check = e), i);
}
function Hb(e) {
	let t = e?.target ?? "draft-2020-12";
	return (
		t === "draft-4" && (t = "draft-04"),
		t === "draft-7" && (t = "draft-07"),
		{
			processors: e.processors ?? {},
			metadataRegistry: e?.metadata ?? rs,
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
		t.io === "input" && Vn(e) && (delete f.schema.examples, delete f.schema.default),
		t.io === "input" && "_prefault" in f.schema && ((u = f.schema).default ?? (u.default = f.schema._prefault)),
		delete f.schema._prefault,
		t.seen.get(e).schema
	);
}
function Pb(e, t) {
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
function Qb(e, t) {
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
				E = p.schema;
			if (
				(E.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0")
					? ((v.allOf = v.allOf ?? []), v.allOf.push(E))
					: Object.assign(v, E),
				Object.assign(v, g),
				h._zod.parent === S)
			)
				for (const A in v) A === "$ref" || A === "allOf" || A in g || delete v[A];
			if (E.$ref && p.def)
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
				for (const E in v)
					E === "$ref" ||
						E === "allOf" ||
						(E in p.def && JSON.stringify(v[E]) === JSON.stringify(p.def[E]) && delete v[E]);
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
					jsonSchema: { input: gc(t, "input", e.processors), output: gc(t, "output", e.processors) },
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
function Vn(e, t) {
	const i = t ?? { seen: new Set() };
	if (i.seen.has(e)) return !1;
	i.seen.add(e);
	const u = e._zod.def;
	if (u.type === "transform") return !0;
	if (u.type === "array") return Vn(u.element, i);
	if (u.type === "set") return Vn(u.valueType, i);
	if (u.type === "lazy") return Vn(u.getter(), i);
	if (
		u.type === "promise" ||
		u.type === "optional" ||
		u.type === "nonoptional" ||
		u.type === "nullable" ||
		u.type === "readonly" ||
		u.type === "default" ||
		u.type === "prefault"
	)
		return Vn(u.innerType, i);
	if (u.type === "intersection") return Vn(u.left, i) || Vn(u.right, i);
	if (u.type === "record" || u.type === "map") return Vn(u.keyType, i) || Vn(u.valueType, i);
	if (u.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : Vn(u.in, i) || Vn(u.out, i);
	if (u.type === "object") {
		for (const s in u.shape) if (Vn(u.shape[s], i)) return !0;
		return !1;
	}
	if (u.type === "union") {
		for (const s of u.options) if (Vn(s, i)) return !0;
		return !1;
	}
	if (u.type === "tuple") {
		for (const s of u.items) if (Vn(s, i)) return !0;
		return !!(u.rest && Vn(u.rest, i));
	}
	return !1;
}
var _R =
		(e, t = {}) =>
		(i) => {
			const u = Hb({ ...i, processors: t });
			return (hn(e, u), Pb(u, e), Qb(u, e));
		},
	gc =
		(e, t, i = {}) =>
		(u) => {
			const { libraryOptions: s, target: o } = u ?? {},
				f = Hb({ ...(s ?? {}), target: o, io: t, processors: i });
			return (hn(e, f), Pb(f, e), Qb(f, e));
		},
	SR = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" },
	wR = (e, t, i, u) => {
		const s = i;
		s.type = "string";
		const { minimum: o, maximum: f, format: h, patterns: m, contentEncoding: v } = e._zod.bag;
		if (
			(typeof o == "number" && (s.minLength = o),
			typeof f == "number" && (s.maxLength = f),
			h && ((s.format = SR[h] ?? h), s.format === "" && delete s.format, h === "time" && delete s.format),
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
	ER = (e, t, i, u) => {
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
	TR = (e, t, i, u) => {
		i.type = "boolean";
	},
	xR = (e, t, i, u) => {
		if (t.unrepresentable === "throw") throw new Error("Undefined cannot be represented in JSON Schema");
	},
	AR = (e, t, i, u) => {
		i.not = {};
	},
	RR = (e, t, i, u) => {},
	CR = (e, t, i, u) => {
		const s = e._zod.def,
			o = Tb(s.entries);
		(o.every((f) => typeof f == "number") && (i.type = "number"),
			o.every((f) => typeof f == "string") && (i.type = "string"),
			(i.enum = o));
	},
	kR = (e, t, i, u) => {
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
	NR = (e, t, i, u) => {
		if (t.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
	},
	MR = (e, t, i, u) => {
		if (t.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
	},
	OR = (e, t, i, u) => {
		const s = i,
			o = e._zod.def,
			{ minimum: f, maximum: h } = e._zod.bag;
		(typeof f == "number" && (s.minItems = f),
			typeof h == "number" && (s.maxItems = h),
			(s.type = "array"),
			(s.items = hn(o.element, t, { ...u, path: [...u.path, "items"] })));
	},
	zR = (e, t, i, u) => {
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
	DR = (e, t, i, u) => {
		const s = e._zod.def,
			o = s.inclusive === !1,
			f = s.options.map((h, m) => hn(h, t, { ...u, path: [...u.path, o ? "oneOf" : "anyOf", m] }));
		o ? (i.oneOf = f) : (i.anyOf = f);
	},
	jR = (e, t, i, u) => {
		const s = e._zod.def,
			o = hn(s.left, t, { ...u, path: [...u.path, "allOf", 0] }),
			f = hn(s.right, t, { ...u, path: [...u.path, "allOf", 1] }),
			h = (m) => "allOf" in m && Object.keys(m).length === 1;
		i.allOf = [...(h(o) ? o.allOf : [o]), ...(h(f) ? f.allOf : [f])];
	},
	IR = (e, t, i, u) => {
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
	LR = (e, t, i, u) => {
		const s = e._zod.def,
			o = hn(s.innerType, t, u),
			f = t.seen.get(e);
		t.target === "openapi-3.0" ? ((f.ref = s.innerType), (i.nullable = !0)) : (i.anyOf = [o, { type: "null" }]);
	},
	qR = (e, t, i, u) => {
		const s = e._zod.def;
		hn(s.innerType, t, u);
		const o = t.seen.get(e);
		o.ref = s.innerType;
	},
	UR = (e, t, i, u) => {
		const s = e._zod.def;
		hn(s.innerType, t, u);
		const o = t.seen.get(e);
		((o.ref = s.innerType), (i.default = JSON.parse(JSON.stringify(s.defaultValue))));
	},
	$R = (e, t, i, u) => {
		const s = e._zod.def;
		hn(s.innerType, t, u);
		const o = t.seen.get(e);
		((o.ref = s.innerType), t.io === "input" && (i._prefault = JSON.parse(JSON.stringify(s.defaultValue))));
	},
	BR = (e, t, i, u) => {
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
	VR = (e, t, i, u) => {
		const s = e._zod.def,
			o = s.in._zod.traits.has("$ZodTransform"),
			f = t.io === "input" ? (o ? s.out : s.in) : s.out;
		hn(f, t, u);
		const h = t.seen.get(e);
		h.ref = f;
	},
	ZR = (e, t, i, u) => {
		const s = e._zod.def;
		hn(s.innerType, t, u);
		const o = t.seen.get(e);
		((o.ref = s.innerType), (i.readOnly = !0));
	},
	Kb = (e, t, i, u) => {
		const s = e._zod.def;
		hn(s.innerType, t, u);
		const o = t.seen.get(e);
		o.ref = s.innerType;
	},
	HR = re("ZodISODateTime", (e, t) => {
		(Vx.init(e, t), It.init(e, t));
	});
function PR(e) {
	return GA(HR, e);
}
var QR = re("ZodISODate", (e, t) => {
	(Zx.init(e, t), It.init(e, t));
});
function KR(e) {
	return FA(QR, e);
}
var YR = re("ZodISOTime", (e, t) => {
	(Hx.init(e, t), It.init(e, t));
});
function GR(e) {
	return XA(YR, e);
}
var FR = re("ZodISODuration", (e, t) => {
	(Px.init(e, t), It.init(e, t));
});
function XR(e) {
	return JA(FR, e);
}
var JR = (e, t) => {
		(Cb.init(e, t),
			(e.name = "ZodError"),
			Object.defineProperties(e, {
				format: { value: (i) => zT(e, i) },
				flatten: { value: (i) => OT(e, i) },
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
	Lr = re("ZodError", JR, { Parent: Error }),
	WR = am(Lr),
	eC = um(Lr),
	tC = Ac(Lr),
	nC = Rc(Lr),
	rC = IT(Lr),
	iC = LT(Lr),
	aC = qT(Lr),
	uC = UT(Lr),
	lC = $T(Lr),
	sC = BT(Lr),
	oC = VT(Lr),
	cC = ZT(Lr),
	n0 = new WeakMap();
function ys(e, t, i) {
	const u = Object.getPrototypeOf(e);
	let s = n0.get(u);
	if ((s || ((s = new Set()), n0.set(u, s)), !s.has(t))) {
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
			Mt.init(e, t),
			Object.assign(e["~standard"], { jsonSchema: { input: gc(e, "input"), output: gc(e, "output") } }),
			(e.toJSONSchema = _R(e, {})),
			(e.def = t),
			(e.type = t.type),
			Object.defineProperty(e, "_def", { value: t }),
			(e.parse = (i, u) => WR(e, i, u, { callee: e.parse })),
			(e.safeParse = (i, u) => tC(e, i, u)),
			(e.parseAsync = async (i, u) => eC(e, i, u, { callee: e.parseAsync })),
			(e.safeParseAsync = async (i, u) => nC(e, i, u)),
			(e.spa = e.safeParseAsync),
			(e.encode = (i, u) => rC(e, i, u)),
			(e.decode = (i, u) => iC(e, i, u)),
			(e.encodeAsync = async (i, u) => aC(e, i, u)),
			(e.decodeAsync = async (i, u) => uC(e, i, u)),
			(e.safeEncode = (i, u) => lC(e, i, u)),
			(e.safeDecode = (i, u) => sC(e, i, u)),
			(e.safeEncodeAsync = async (i, u) => oC(e, i, u)),
			(e.safeDecodeAsync = async (i, u) => cC(e, i, u)),
			ys(e, "ZodType", {
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
					return this.check(ak(i, u));
				},
				superRefine(i, u) {
					return this.check(uk(i, u));
				},
				overwrite(i) {
					return this.check(tl(i));
				},
				optional() {
					return u0(this);
				},
				exactOptional() {
					return QC(this);
				},
				nullable() {
					return l0(this);
				},
				nullish() {
					return u0(l0(this));
				},
				nonoptional(i) {
					return JC(this, i);
				},
				array() {
					return Fa(this);
				},
				or(i) {
					return kc([this, i]);
				},
				and(i) {
					return $C(this, i);
				},
				transform(i) {
					return s0(this, HC(i));
				},
				default(i) {
					return GC(this, i);
				},
				prefault(i) {
					return XC(this, i);
				},
				catch(i) {
					return ek(this, i);
				},
				pipe(i) {
					return s0(this, i);
				},
				readonly() {
					return rk(this);
				},
				describe(i) {
					const u = this.clone();
					return (rs.add(u, { description: i }), u);
				},
				meta(...i) {
					if (i.length === 0) return rs.get(this);
					const u = this.clone();
					return (rs.add(u, i[0]), u);
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
					return rs.get(e)?.description;
				},
				configurable: !0,
			}),
			e
		),
	),
	Yb = re("_ZodString", (e, t) => {
		(lm.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (u, s, o) => wR(e, u, s, o)));
		const i = e._zod.bag;
		((e.format = i.format ?? null),
			(e.minLength = i.minimum ?? null),
			(e.maxLength = i.maximum ?? null),
			ys(e, "_ZodString", {
				regex(...u) {
					return this.check(aR(...u));
				},
				includes(...u) {
					return this.check(sR(...u));
				},
				startsWith(...u) {
					return this.check(oR(...u));
				},
				endsWith(...u) {
					return this.check(cR(...u));
				},
				min(...u) {
					return this.check(vc(...u));
				},
				max(...u) {
					return this.check(Vb(...u));
				},
				length(...u) {
					return this.check(Zb(...u));
				},
				nonempty(...u) {
					return this.check(vc(1, ...u));
				},
				lowercase(u) {
					return this.check(uR(u));
				},
				uppercase(u) {
					return this.check(lR(u));
				},
				trim() {
					return this.check(dR());
				},
				normalize(...u) {
					return this.check(fR(...u));
				},
				toLowerCase() {
					return this.check(hR());
				},
				toUpperCase() {
					return this.check(mR());
				},
				slugify() {
					return this.check(vR());
				},
			}));
	}),
	fC = re("ZodString", (e, t) => {
		(lm.init(e, t),
			Yb.init(e, t),
			(e.email = (i) => e.check(CA(dC, i))),
			(e.url = (i) => e.check(zA(hC, i))),
			(e.jwt = (i) => e.check(YA(CC, i))),
			(e.emoji = (i) => e.check(DA(mC, i))),
			(e.guid = (i) => e.check(Jp(r0, i))),
			(e.uuid = (i) => e.check(kA(Ko, i))),
			(e.uuidv4 = (i) => e.check(NA(Ko, i))),
			(e.uuidv6 = (i) => e.check(MA(Ko, i))),
			(e.uuidv7 = (i) => e.check(OA(Ko, i))),
			(e.nanoid = (i) => e.check(jA(vC, i))),
			(e.guid = (i) => e.check(Jp(r0, i))),
			(e.cuid = (i) => e.check(IA(gC, i))),
			(e.cuid2 = (i) => e.check(LA(yC, i))),
			(e.ulid = (i) => e.check(qA(pC, i))),
			(e.base64 = (i) => e.check(PA(xC, i))),
			(e.base64url = (i) => e.check(QA(AC, i))),
			(e.xid = (i) => e.check(UA(bC, i))),
			(e.ksuid = (i) => e.check($A(_C, i))),
			(e.ipv4 = (i) => e.check(BA(SC, i))),
			(e.ipv6 = (i) => e.check(VA(wC, i))),
			(e.cidrv4 = (i) => e.check(ZA(EC, i))),
			(e.cidrv6 = (i) => e.check(HA(TC, i))),
			(e.e164 = (i) => e.check(KA(RC, i))),
			(e.datetime = (i) => e.check(PR(i))),
			(e.date = (i) => e.check(KR(i))),
			(e.time = (i) => e.check(GR(i))),
			(e.duration = (i) => e.check(XR(i))));
	});
function jt(e) {
	return RA(fC, e);
}
var It = re("ZodStringFormat", (e, t) => {
		(Ot.init(e, t), Yb.init(e, t));
	}),
	dC = re("ZodEmail", (e, t) => {
		(zx.init(e, t), It.init(e, t));
	}),
	r0 = re("ZodGUID", (e, t) => {
		(Mx.init(e, t), It.init(e, t));
	}),
	Ko = re("ZodUUID", (e, t) => {
		(Ox.init(e, t), It.init(e, t));
	}),
	hC = re("ZodURL", (e, t) => {
		(Dx.init(e, t), It.init(e, t));
	}),
	mC = re("ZodEmoji", (e, t) => {
		(jx.init(e, t), It.init(e, t));
	}),
	vC = re("ZodNanoID", (e, t) => {
		(Ix.init(e, t), It.init(e, t));
	}),
	gC = re("ZodCUID", (e, t) => {
		(Lx.init(e, t), It.init(e, t));
	}),
	yC = re("ZodCUID2", (e, t) => {
		(qx.init(e, t), It.init(e, t));
	}),
	pC = re("ZodULID", (e, t) => {
		(Ux.init(e, t), It.init(e, t));
	}),
	bC = re("ZodXID", (e, t) => {
		($x.init(e, t), It.init(e, t));
	}),
	_C = re("ZodKSUID", (e, t) => {
		(Bx.init(e, t), It.init(e, t));
	}),
	SC = re("ZodIPv4", (e, t) => {
		(Qx.init(e, t), It.init(e, t));
	}),
	wC = re("ZodIPv6", (e, t) => {
		(Kx.init(e, t), It.init(e, t));
	}),
	EC = re("ZodCIDRv4", (e, t) => {
		(Yx.init(e, t), It.init(e, t));
	}),
	TC = re("ZodCIDRv6", (e, t) => {
		(Gx.init(e, t), It.init(e, t));
	}),
	xC = re("ZodBase64", (e, t) => {
		(Fx.init(e, t), It.init(e, t));
	}),
	AC = re("ZodBase64URL", (e, t) => {
		(Jx.init(e, t), It.init(e, t));
	}),
	RC = re("ZodE164", (e, t) => {
		(Wx.init(e, t), It.init(e, t));
	}),
	CC = re("ZodJWT", (e, t) => {
		(tA.init(e, t), It.init(e, t));
	}),
	Gb = re("ZodNumber", (e, t) => {
		(qb.init(e, t),
			zt.init(e, t),
			(e._zod.processJSONSchema = (u, s, o) => ER(e, u, s, o)),
			ys(e, "ZodNumber", {
				gt(u, s) {
					return this.check(e0(u, s));
				},
				gte(u, s) {
					return this.check(ih(u, s));
				},
				min(u, s) {
					return this.check(ih(u, s));
				},
				lt(u, s) {
					return this.check(Wp(u, s));
				},
				lte(u, s) {
					return this.check(rh(u, s));
				},
				max(u, s) {
					return this.check(rh(u, s));
				},
				int(u) {
					return this.check(i0(u));
				},
				safe(u) {
					return this.check(i0(u));
				},
				positive(u) {
					return this.check(e0(0, u));
				},
				nonnegative(u) {
					return this.check(ih(0, u));
				},
				negative(u) {
					return this.check(Wp(0, u));
				},
				nonpositive(u) {
					return this.check(rh(0, u));
				},
				multipleOf(u, s) {
					return this.check(t0(u, s));
				},
				step(u, s) {
					return this.check(t0(u, s));
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
function yr(e) {
	return WA(Gb, e);
}
var kC = re("ZodNumberFormat", (e, t) => {
	(nA.init(e, t), Gb.init(e, t));
});
function i0(e) {
	return eR(kC, e);
}
var NC = re("ZodBoolean", (e, t) => {
	(rA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => TR(e, i, u, s)));
});
function sm(e) {
	return tR(NC, e);
}
var MC = re("ZodUndefined", (e, t) => {
	(iA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => xR(e, i, u, s)));
});
function OC(e) {
	return nR(MC, e);
}
var zC = re("ZodUnknown", (e, t) => {
	(aA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => RR(e, i, u, s)));
});
function jh() {
	return rR(zC);
}
var DC = re("ZodNever", (e, t) => {
	(uA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => AR(e, i, u, s)));
});
function jC(e) {
	return iR(DC, e);
}
var IC = re("ZodArray", (e, t) => {
	(lA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => OR(e, i, u, s)),
		(e.element = t.element),
		ys(e, "ZodArray", {
			min(i, u) {
				return this.check(vc(i, u));
			},
			nonempty(i) {
				return this.check(vc(1, i));
			},
			max(i, u) {
				return this.check(Vb(i, u));
			},
			length(i, u) {
				return this.check(Zb(i, u));
			},
			unwrap() {
				return this.element;
			},
		}));
});
function Fa(e, t) {
	return gR(IC, e, t);
}
var LC = re("ZodObject", (e, t) => {
	(oA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => zR(e, i, u, s)),
		gt(e, "shape", () => t.shape),
		ys(e, "ZodObject", {
			keyof() {
				return BC(Object.keys(this._zod.def.shape));
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
				return this.clone({ ...this._zod.def, catchall: jC() });
			},
			strip() {
				return this.clone({ ...this._zod.def, catchall: void 0 });
			},
			extend(i) {
				return AT(this, i);
			},
			safeExtend(i) {
				return RT(this, i);
			},
			merge(i) {
				return CT(this, i);
			},
			pick(i) {
				return TT(this, i);
			},
			omit(i) {
				return xT(this, i);
			},
			partial(...i) {
				return kT(Xb, this, i[0]);
			},
			required(...i) {
				return NT(Jb, this, i[0]);
			},
		}));
});
function Dn(e, t) {
	const i = { type: "object", shape: e ?? {}, ...xe(t) };
	return new LC(i);
}
var qC = re("ZodUnion", (e, t) => {
	(cA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => DR(e, i, u, s)), (e.options = t.options));
});
function kc(e, t) {
	return new qC({ type: "union", options: e, ...xe(t) });
}
var UC = re("ZodIntersection", (e, t) => {
	(fA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => jR(e, i, u, s)));
});
function $C(e, t) {
	return new UC({ type: "intersection", left: e, right: t });
}
var a0 = re("ZodRecord", (e, t) => {
	(dA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => IR(e, i, u, s)),
		(e.keyType = t.keyType),
		(e.valueType = t.valueType));
});
function Fb(e, t, i) {
	return !t || !t._zod
		? new a0({ type: "record", keyType: jt(), valueType: e, ...xe(t) })
		: new a0({ type: "record", keyType: e, valueType: t, ...xe(i) });
}
var Ih = re("ZodEnum", (e, t) => {
	(hA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (u, s, o) => CR(e, u, s, o)),
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
function BC(e, t) {
	const i = Array.isArray(e) ? Object.fromEntries(e.map((u) => [u, u])) : e;
	return new Ih({ type: "enum", entries: i, ...xe(t) });
}
var VC = re("ZodLiteral", (e, t) => {
	(mA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => kR(e, i, u, s)),
		(e.values = new Set(t.values)),
		Object.defineProperty(e, "value", {
			get() {
				if (t.values.length > 1)
					throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
				return t.values[0];
			},
		}));
});
function ds(e, t) {
	return new VC({ type: "literal", values: Array.isArray(e) ? e : [e], ...xe(t) });
}
var ZC = re("ZodTransform", (e, t) => {
	(vA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => MR(e, i, u, s)),
		(e._zod.parse = (i, u) => {
			if (u.direction === "backward") throw new Eb(e.constructor.name);
			i.addIssue = (o) => {
				if (typeof o == "string") i.issues.push(fs(o, i.value, t));
				else {
					const f = o;
					(f.fatal && (f.continue = !1),
						f.code ?? (f.code = "custom"),
						f.input ?? (f.input = i.value),
						f.inst ?? (f.inst = e),
						i.issues.push(fs(f)));
				}
			};
			const s = t.transform(i.value, i);
			return s instanceof Promise
				? s.then((o) => ((i.value = o), (i.fallback = !0), i))
				: ((i.value = s), (i.fallback = !0), i);
		}));
});
function HC(e) {
	return new ZC({ type: "transform", transform: e });
}
var Xb = re("ZodOptional", (e, t) => {
	(Bb.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => Kb(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function u0(e) {
	return new Xb({ type: "optional", innerType: e });
}
var PC = re("ZodExactOptional", (e, t) => {
	(gA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => Kb(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function QC(e) {
	return new PC({ type: "optional", innerType: e });
}
var KC = re("ZodNullable", (e, t) => {
	(yA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => LR(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function l0(e) {
	return new KC({ type: "nullable", innerType: e });
}
var YC = re("ZodDefault", (e, t) => {
	(pA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => UR(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeDefault = e.unwrap));
});
function GC(e, t) {
	return new YC({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : Ab(t);
		},
	});
}
var FC = re("ZodPrefault", (e, t) => {
	(bA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => $R(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function XC(e, t) {
	return new FC({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : Ab(t);
		},
	});
}
var Jb = re("ZodNonOptional", (e, t) => {
	(_A.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => qR(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function JC(e, t) {
	return new Jb({ type: "nonoptional", innerType: e, ...xe(t) });
}
var WC = re("ZodCatch", (e, t) => {
	(SA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => BR(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeCatch = e.unwrap));
});
function ek(e, t) {
	return new WC({ type: "catch", innerType: e, catchValue: typeof t == "function" ? t : () => t });
}
var tk = re("ZodPipe", (e, t) => {
	(wA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => VR(e, i, u, s)),
		(e.in = t.in),
		(e.out = t.out));
});
function s0(e, t) {
	return new tk({ type: "pipe", in: e, out: t });
}
var nk = re("ZodReadonly", (e, t) => {
	(EA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => ZR(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function rk(e) {
	return new nk({ type: "readonly", innerType: e });
}
var ik = re("ZodCustom", (e, t) => {
	(TA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => NR(e, i, u, s)));
});
function ak(e, t = {}) {
	return yR(ik, e, t);
}
function uk(e, t) {
	return pR(e, t);
}
var _ = fb(xc()),
	lk = yT(),
	Hu = ["thumbs_up", "heart", "laugh", "wow", "sad", "party", "rocket", "eyes"],
	Wb = { thumbs_up: "👍", heart: "❤️", laugh: "😂", wow: "😮", sad: "😢", party: "🎉", rocket: "🚀", eyes: "👀" },
	e_ = {
		thumbs_up: "Thumbs up",
		heart: "Heart",
		laugh: "Laugh",
		wow: "Wow",
		sad: "Sad",
		party: "Party",
		rocket: "Rocket",
		eyes: "Eyes",
	},
	sk = 9999999999999,
	ok = /(?:^|:)(\d{13}):([^:]{1,16})$/;
function Xa(e) {
	const t = ok.exec(e);
	return t ? sk - Number(t[1]) : null;
}
var t_ = "p/",
	ck = /^p\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/u,
	Lh = ["channels", "messages", "replies", "reactions"],
	om =
		"Only the people added here can read it — and the organization owner, who can read everything in this workspace.";
function fk(e) {
	const t = crypto.randomUUID();
	return e === "private" ? `${t_}${t}` : t;
}
function yn(e) {
	return e.startsWith(t_);
}
function dk(e) {
	return ck.test(e);
}
function Yo(e) {
	return `${e}:`;
}
function cm(e) {
	const t = e.split(":");
	return t.length < 3 || Xa(e) === null ? null : t.slice(0, -2).join(":");
}
function n_(e) {
	return `${e}:`;
}
function hk(e, t) {
	return `${e}:${t}`;
}
function mk(e) {
	const t = e.split(":");
	if (t.length < 4) return null;
	const i = t[t.length - 2];
	if (!Hu.includes(i)) return null;
	const u = t.slice(0, -2).join(":");
	return Xa(u) === null ? null : { targetKey: u, token: i, keyTailUserId: t[t.length - 1] };
}
function hs(e) {
	const t = e.split(":");
	if (t.length < 5) return null;
	const i = t.slice(0, -2).join(":");
	return Xa(i) === null || Xa(e) === null ? null : i;
}
function yc(e) {
	const t = e.split(":");
	return t.length === 3 ? (Xa(e) === null ? null : e) : t.length === 5 ? hs(e) : null;
}
function o0(e) {
	return `me:${e}`;
}
function c0(e) {
	return `${e}:read`;
}
function vk(e) {
	const t = e.split(":");
	return t.length !== 3 || t[1] !== "read" || !yn(t[0]) ? null : { channelKey: t[0], keyTailUserId: t[2] };
}
var gk = Dn({ name: jt().min(1).max(64), archivedAt: yr().nullable(), topic: jt().max(250).optional() }),
	yk = Dn({ fileNodeId: jt().min(1), name: jt().min(1) }),
	pk = Dn({
		text: jt(),
		attachments: Fa(yk),
		editedAt: yr().nullable(),
		deletedAt: yr().nullable(),
		mentions: Fa(jt()).optional(),
	}),
	bk = "Someone with no name yet";
function ac(e) {
	return e !== null && e !== "" ? e : bk;
}
function _k(e, t) {
	const i = /(?:^|\s)@([^\s@]*)$/.exec(e.slice(0, t));
	if (i === null) return null;
	const u = i[1] ?? "";
	return { start: t - u.length - 1, query: u };
}
function Sk(e, t, i) {
	const u = t.toLowerCase();
	return e
		.filter((s) => s.userId !== i)
		.map((s) => ({ ...s, label: ac(s.displayName) }))
		.filter((s) => s.label.toLowerCase().includes(u))
		.sort((s, o) => s.label.localeCompare(o.label));
}
function wk(e, t, i, u) {
	return { text: `${e.slice(0, t)}@${u} ${e.slice(i)}`, caret: t + u.length + 2 };
}
function Ek(e, t) {
	const i = [];
	for (const [u, s] of e) t.includes(`@${s}`) && i.push(u);
	return i;
}
function r_(e) {
	return e === "not_consented"
		? "This workspace has not allowed Chitchat to read the member list yet. An admin can accept the plugin's current permissions."
		: "The member list is not available right now. You can keep typing.";
}
var Tk = Dn({ channels: Fb(jt(), yr()) }),
	xk = Dn({
		messages: yr().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
		replies: yr().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
	}),
	Ak = kc([
		Dn({ at: yr(), activity: xk }),
		Dn({ at: yr(), activity: OC().optional() }).transform((e) => ({ at: e.at, activity: { messages: 0, replies: 0 } })),
	]),
	ru = Dn({
		collection: jt(),
		key: jt().min(1).max(128),
		value: Fb(jt(), jh()),
		revision: yr(),
		createdBy: jt().min(1),
		updatedBy: jt(),
		ownership: kc([ds("shared"), ds("owned")]),
		createdAt: yr(),
		updatedAt: yr(),
	});
function Rk(e, t) {
	const i = ru.safeParse(e);
	if (!i.success) return null;
	const u = Xa(i.data.key);
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
function ts(e) {
	const t = ru.safeParse(e);
	if (!t.success) return null;
	const i = gk.safeParse(t.data.value);
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
function pc(e) {
	return Rk(e, pk);
}
var Ck = Dn({ removed: ds(!0).optional() });
function kk(e) {
	const t = ru.safeParse(e);
	if (!t.success) return null;
	const i = mk(t.data.key);
	if (i === null) return null;
	const u = Ck.safeParse(t.data.value);
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
function Nk(e) {
	const t = ru.safeParse(e);
	if (!t.success) return null;
	const i = Tk.safeParse(t.data.value);
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
function f0(e) {
	const t = ru.safeParse(e);
	if (!t.success || t.data.ownership !== "owned") return null;
	const i = vk(t.data.key);
	if (i === null) return null;
	const u = Ak.safeParse(t.data.value);
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
function Za(e, t) {
	const i = { ...e.channels };
	for (const [u, s] of Object.entries(t.channels)) {
		const o = i[u];
		i[u] = o === void 0 ? s : Math.max(o, s);
	}
	return { channels: i };
}
function Mk(e) {
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
function Nc(e, t) {
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
var Go = Dn({ document: ru.nullable() }),
	Ok = Dn({
		path: jt(),
		name: jt(),
		kind: kc([ds("file"), ds("folder")]),
		nodeId: jt(),
		contentType: jt().nullable(),
		updatedAt: yr(),
	}),
	zk = Dn({ items: Fa(Ok), cursor: jt().nullable(), isDone: sm() }),
	i_ = Dn({ documents: Fa(ru), cursor: jt().nullable(), isDone: sm() }),
	Dk = Dn({
		items: Fa(Dn({ fileNodeId: jt(), url: jt(), expiresAt: yr() })),
		errors: Fa(Dn({ fileNodeId: jt(), message: jt() })),
		truncated: sm(),
	});
function Zn(e) {
	return e instanceof Error ? e.message : String(e);
}
function ah(e) {
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
function uc(e) {
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
function jk(e, t) {
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
		for (const h of Hu) {
			const m = o.get(h);
			m === void 0 || m.size === 0 || f.push({ token: h, count: m.size, reactedByMe: m.has(t) });
		}
		u.set(s, f);
	}
	return u;
}
function Ik(e) {
	const t = new Map();
	for (const i of e) {
		const u = hs(i.key);
		if (u === null) continue;
		const s = t.get(u);
		s === void 0
			? t.set(u, { count: 1, latestAt: i.timestamp })
			: ((s.count += 1), (s.latestAt = Math.max(s.latestAt, i.timestamp)));
	}
	return t;
}
function Lk(e, t) {
	return e > 99 && t ? "99+" : String(e);
}
var qk = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
	Uk = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (t, i, u) => (u ? u.toUpperCase() : i.toLowerCase())),
	d0 = (e) => {
		const t = Uk(e);
		return t.charAt(0).toUpperCase() + t.slice(1);
	},
	a_ = (...e) =>
		e
			.filter((t, i, u) => !!t && t.trim() !== "" && u.indexOf(t) === i)
			.join(" ")
			.trim(),
	$k = (e) => {
		for (const t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	},
	Bk = {
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
	Vk = (0, _.forwardRef)(
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
					...Bk,
					width: t,
					height: t,
					stroke: e,
					strokeWidth: u ? (Number(i) * 24) / Number(t) : i,
					className: a_("lucide", s),
					...(!o && !$k(h) && { "aria-hidden": "true" }),
					...h,
				},
				[...f.map(([v, g]) => (0, _.createElement)(v, g)), ...(Array.isArray(o) ? o : [o])],
			),
	),
	fm = (e, t) => {
		const i = (0, _.forwardRef)(({ className: u, ...s }, o) =>
			(0, _.createElement)(Vk, { ref: o, iconNode: t, className: a_(`lucide-${qk(d0(e))}`, `lucide-${e}`, u), ...s }),
		);
		return ((i.displayName = d0(e)), i);
	},
	Zk = [
		["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
		["path", { d: "M12 19V5", key: "x0mq9r" }],
	],
	Hk = fm("arrow-up", Zk),
	Pk = [
		["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
		["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
		["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
	],
	Qk = fm("ellipsis", Pk),
	Kk = [
		[
			"path",
			{
				d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
				key: "1miecu",
			},
		],
	],
	Yk = fm("paperclip", Kk),
	nl = Gk();
function Gk() {
	var e;
	return typeof window < "u" && !!((e = window.document) != null && e.createElement);
}
function xt(e) {
	return e ? ("self" in e ? e.document : e.ownerDocument || document) : document;
}
function u_(e) {
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
	return t === "button" ? !0 : t === "input" && e.type ? Fk.indexOf(e.type) !== -1 : !1;
}
var Fk = ["button", "color", "file", "image", "reset", "submit"];
function l_(e) {
	if (typeof e.checkVisibility == "function") return e.checkVisibility();
	const t = e;
	return t.offsetWidth > 0 || t.offsetHeight > 0 || e.getClientRects().length > 0;
}
function ai(e) {
	try {
		const t = e instanceof HTMLInputElement && e.selectionStart !== null,
			i = e.tagName === "TEXTAREA";
		return t || i || !1;
	} catch {
		return !1;
	}
}
function qh(e) {
	return e.isContentEditable || ai(e);
}
function Xk(e) {
	if (ai(e)) return e.value;
	if (e.isContentEditable) {
		const t = xt(e).createRange();
		return (t.selectNodeContents(e), t.toString());
	}
	return "";
}
function Uh(e) {
	let t = 0,
		i = 0;
	if (ai(e)) ((t = e.selectionStart || 0), (i = e.selectionEnd || 0));
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
function Mc(e, t) {
	const i = ["dialog", "menu", "listbox", "tree", "grid"],
		u = e?.getAttribute("role");
	return u && i.indexOf(u) !== -1 ? u : t;
}
function s_(e, t) {
	var i;
	const u = { menu: "menuitem", listbox: "option", tree: "treeitem" },
		s = Mc(e);
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
function uh(e, ...t) {
	/text|search|password|tel|url/i.test(e.type) && e.setSelectionRange(...t);
}
function o_(e, t) {
	const i = e.map((s, o) => [o, s]);
	let u = !1;
	return (
		i.sort(([s, o], [f, h]) => {
			const m = t(o),
				v = t(h);
			return m === v || !m || !v ? 0 : Jk(m, v) ? (s > f && (u = !0), -1) : (s < f && (u = !0), 1);
		}),
		u ? i.map(([s, o]) => o) : e
	);
}
function Jk(e, t) {
	return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
var Wk = { id: null };
function eN(e, t, i = !1) {
	const u = e.findIndex((s) => s.id === t);
	return [...e.slice(u + 1), ...(i ? [Wk] : []), ...e.slice(0, u)];
}
function tN(e, t) {
	return e.find((i) => (t ? !i.disabled && i.id !== t : !i.disabled));
}
function da(e, t) {
	return (t && e.item(t)) || null;
}
function nN(e) {
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
function rN(e, t = !1) {
	if (ai(e)) e.setSelectionRange(t ? e.value.length : 0, e.value.length);
	else if (e.isContentEditable) {
		const i = xt(e).getSelection();
		(i?.selectAllChildren(e), t && i?.collapseToEnd());
	}
}
var $h = Symbol("FOCUS_SILENTLY");
function iN(e) {
	((e[$h] = !0), e.focus({ preventScroll: !0 }));
}
function aN(e) {
	const t = e[$h];
	return (delete e[$h], t);
}
function us(e, t, i) {
	if (!t || t === i) return !1;
	const u = e.item(t.id);
	return !(!u || (i && u.element === i));
}
function ls(...e) {}
function c_(e, t) {
	return uN(e) ? e(lN(t) ? t() : t) : e;
}
function uN(e) {
	return typeof e == "function";
}
function lN(e) {
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
function f_(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function sN(e, t) {
	const i = { ...e };
	for (const u of t) zi(i, u) && delete i[u];
	return i;
}
function oN(e, t) {
	const i = {};
	for (const u of t) zi(e, u) && (i[u] = e[u]);
	return i;
}
function d_(e) {
	return e;
}
function Jt(e, t) {
	if (!e) throw typeof t != "string" ? new Error("Invariant failed") : new Error(t);
}
function cN(e) {
	return Object.keys(e);
}
function Oc(e, ...t) {
	const i = typeof e == "function" ? e(...t) : e;
	return i == null ? !1 : !i;
}
function ps(e) {
	return e.disabled || e["aria-disabled"] === !0 || e["aria-disabled"] === "true";
}
function iu(e) {
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
function fN(e) {
	return !e || !(0, _.isValidElement)(e) ? !1 : "ref" in e.props || "ref" in e;
}
function dN(e) {
	return fN(e) ? { ...e.props }.ref || e.ref : null;
}
function hN(e, t) {
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
function h_() {
	return nl && !!navigator.maxTouchPoints;
}
function mm() {
	return nl ? /mac|iphone|ipad|ipod/i.test(navigator.platform) : !1;
}
function zc() {
	return nl && mm() && /apple/i.test(navigator.vendor);
}
function mN() {
	return nl && /firefox\//i.test(navigator.userAgent);
}
function vN() {
	return nl && navigator.platform.startsWith("Mac") && !h_();
}
function m_(e) {
	return !!(e.currentTarget && !mn(e.currentTarget, e.target));
}
function gr(e) {
	return e.target === e.currentTarget;
}
function v_(e) {
	const t = e.currentTarget;
	if (!t) return !1;
	const i = mm();
	if ((i && !e.metaKey) || (!i && !e.ctrlKey)) return !1;
	const u = t.tagName.toLowerCase();
	return u === "a" || (u === "button" && t.type === "submit") || (u === "input" && t.type === "submit");
}
function g_(e) {
	const t = e.currentTarget;
	if (!t) return !1;
	const i = t.tagName.toLowerCase();
	return e.altKey ? i === "a" || (i === "button" && t.type === "submit") || (i === "input" && t.type === "submit") : !1;
}
function gN(e, t, i) {
	const u = new Event(t, i);
	return e.dispatchEvent(u);
}
function Uu(e, t) {
	const i = new FocusEvent("blur", t),
		u = e.dispatchEvent(i),
		s = { ...t, bubbles: !0 };
	return (e.dispatchEvent(new FocusEvent("focusout", s)), u);
}
function yN(e, t, i) {
	const u = new KeyboardEvent(t, i);
	return e.dispatchEvent(u);
}
function h0(e, t) {
	const i = new MouseEvent("click", t);
	return e.dispatchEvent(i);
}
function Pa(e, t) {
	const i = t || e.currentTarget,
		u = e.relatedTarget;
	return !u || !mn(i, u);
}
function Ku(e, t, i, u) {
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
	m0 = vm.useId,
	AD = vm.useDeferredValue,
	v0 = vm.useInsertionEffect,
	st = nl ? _.useLayoutEffect : _.useEffect;
function pN(e) {
	const [t] = (0, _.useState)(e);
	return t;
}
function y_(e) {
	const t = (0, _.useRef)(e);
	return (
		st(() => {
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
		v0
			? v0(() => {
					t.current = e;
				})
			: (t.current = e),
		(0, _.useCallback)((...i) => {
			var u;
			return (u = t.current) == null ? void 0 : u.call(t, ...i);
		}, [])
	);
}
function bN(e) {
	const [t, i] = (0, _.useState)(null);
	return (
		st(() => {
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
	if (m0) {
		const u = m0();
		return e || u;
	}
	const [t, i] = (0, _.useState)(e);
	return (
		st(() => {
			if (e || t) return;
			const u = Math.random().toString(36).slice(2, 8);
			i(`id-${u}`);
		}, [e, t]),
		e || t
	);
}
function p_(e, t) {
	const i = (o) => {
			if (typeof o == "string") return o;
		},
		[u, s] = (0, _.useState)(() => i(t));
	return (
		st(() => {
			const o = e && "current" in e ? e.current : e;
			s(o?.tagName.toLowerCase() || i(t));
		}, [e, t]),
		u
	);
}
function _N(e, t, i) {
	const u = pN(i),
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
function rl(e, t) {
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
function SN(e, t) {
	const i = (0, _.useRef)(!1);
	(st(() => {
		if (i.current) return e();
		i.current = !0;
	}, t),
		st(
			() => () => {
				i.current = !1;
			},
			[],
		));
}
function b_() {
	return (0, _.useReducer)(() => [], []);
}
function Nt(e) {
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
function __(e, t, i) {
	const u = e.onLoadedMetadataCapture,
		s = (0, _.useMemo)(() => Object.assign(() => {}, { ...u, [t]: i }), [u, t, i]);
	return [u?.[t], { onLoadedMetadataCapture: s }];
}
var g0 = !1;
function ym() {
	return (
		(0, _.useEffect)(() => {
			g0 ||
				(Rn("mousemove", EN, !0),
				Rn("mousedown", Fo, !0),
				Rn("mouseup", Fo, !0),
				Rn("keydown", Fo, !0),
				Rn("scroll", Fo, !0),
				(g0 = !0));
		}, []),
		De(() => pm)
	);
}
var pm = !1,
	y0 = 0,
	p0 = 0;
function wN(e) {
	const t = e.movementX || e.screenX - y0,
		i = e.movementY || e.screenY - p0;
	return ((y0 = e.screenX), (p0 = e.screenY), t || i || !1);
}
function EN(e) {
	wN(e) && (pm = !0);
}
function Fo() {
	pm = !1;
}
var TN = Ir((e) => {
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
	xN = Ir((e, t) => {
		t.exports = TN();
	}),
	w = xN();
function Ke(e) {
	const t = _.forwardRef((i, u) => e({ ...i, ref: u }));
	return ((t.displayName = e.displayName || e.name), t);
}
function Dc(e, t) {
	return _.memo(e, t);
}
function Xe(e, t) {
	const { wrapElement: i, render: u, ...s } = t,
		o = Wt(t.ref, dN(u));
	let f;
	if (_.isValidElement(u)) {
		const h = { ...u.props, ref: o };
		f = _.cloneElement(u, hN(s, h));
	} else u ? (f = u(s)) : (f = (0, w.jsx)(e, { ...s }));
	return i ? i(f) : f;
}
function et(e) {
	const t = (i = {}) => e(i);
	return ((t.displayName = e.name), t);
}
function ui(e = [], t = []) {
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
var bs = ui(),
	AN = bs.useContext,
	RD = bs.useScopedContext,
	CD = bs.useProviderContext,
	RN = bs.ContextProvider,
	CN = bs.ScopedContextProvider,
	_s = ui([RN], [CN]),
	jc = _s.useContext,
	kD = _s.useScopedContext,
	kN = _s.useProviderContext,
	Ss = _s.ContextProvider,
	Ic = _s.ScopedContextProvider,
	NN = (0, _.createContext)(void 0),
	MN = (0, _.createContext)(void 0),
	S_ = (0, _.createContext)(!0),
	Lc =
		"input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], summary, iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])";
function ON(e) {
	return Number.parseInt(e.getAttribute("tabindex") || "0", 10) < 0;
}
function Qr(e) {
	return !(!e.matches(Lc) || !l_(e) || e.closest("[inert]"));
}
function Wu(e) {
	if (!Qr(e) || ON(e)) return !1;
	if (!("form" in e) || !e.form || e.checked || e.type !== "radio") return !0;
	const t = e.form.elements.namedItem(e.name);
	if (!t || !("length" in t)) return !0;
	const i = Di(e);
	return !i || i === e || !("form" in i) || i.form !== e.form || i.name !== e.name;
}
function bm(e, t) {
	const i = Array.from(e.querySelectorAll(Lc));
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
function qc(e, t, i) {
	const u = Array.from(e.querySelectorAll(Lc)),
		s = u.filter(Wu);
	return (
		t && Wu(e) && s.unshift(e),
		s.forEach((o, f) => {
			if (dm(o) && o.contentDocument) {
				const h = o.contentDocument.body,
					m = qc(h, !1, i);
				s.splice(f, 1, ...m);
			}
		}),
		!s.length && i ? u : s
	);
}
function zN(e, t, i) {
	const [u] = qc(e, t, i);
	return u || null;
}
function DN(e, t, i, u) {
	const s = Di(e),
		o = bm(e, t),
		f = o.indexOf(s),
		h = o.slice(f + 1);
	return h.find(Wu) || (i ? o.find(Wu) : null) || (u ? h[0] : null) || null;
}
function lh(e, t) {
	return DN(document.body, !1, e, t);
}
function jN(e, t, i, u) {
	const s = Di(e),
		o = bm(e, t).reverse(),
		f = o.indexOf(s),
		h = o.slice(f + 1);
	return h.find(Wu) || (i ? o.find(Wu) : null) || (u ? h[0] : null) || null;
}
function b0(e, t) {
	return jN(document.body, !1, e, t);
}
function IN(e) {
	for (; e && !Qr(e); ) e = e.closest(Lc);
	return e || null;
}
function Ja(e) {
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
function w_(e) {
	!ha(e) && Qr(e) && e.focus();
}
function LN(e) {
	var t;
	const i = (t = e.getAttribute("tabindex")) != null ? t : "";
	(e.setAttribute("data-tabindex", i), e.setAttribute("tabindex", "-1"));
}
function qN(e, t) {
	const i = qc(e, t);
	for (const u of i) LN(u);
}
function UN(e) {
	const t = e.querySelectorAll("[data-tabindex]"),
		i = (u) => {
			const s = u.getAttribute("data-tabindex");
			(u.removeAttribute("data-tabindex"), s ? u.setAttribute("tabindex", s) : u.removeAttribute("tabindex"));
		};
	e.hasAttribute("data-tabindex") && i(e);
	for (const u of t) i(u);
}
function $N(e, t) {
	"scrollIntoView" in e
		? (e.focus({ preventScroll: !0 }), e.scrollIntoView({ block: "nearest", inline: "nearest", ...t }))
		: e.focus();
}
var BN = "div",
	_0 = zc(),
	VN = [
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
	E_ = Symbol("safariFocusAncestor");
function ZN(e) {
	return e ? !!e[E_] : !1;
}
function S0(e, t) {
	e && (e[E_] = t);
}
function HN(e) {
	const { tagName: t, readOnly: i, type: u } = e;
	return (t === "TEXTAREA" && !i) || (t === "SELECT" && !i)
		? !0
		: t === "INPUT" && !i
			? VN.includes(u)
			: !!(e.isContentEditable || (e.getAttribute("role") === "combobox" && e.dataset.name));
}
function PN(e) {
	return "labels" in e ? e.labels : null;
}
function w0(e) {
	return e.tagName.toLowerCase() === "input" && e.type ? e.type === "radio" || e.type === "checkbox" : !1;
}
function QN(e) {
	return e ? e === "button" || e === "summary" || e === "input" || e === "select" || e === "textarea" || e === "a" : !0;
}
function KN(e) {
	return e ? e === "button" || e === "input" || e === "select" || e === "textarea" : !0;
}
function YN(e, t, i, u, s) {
	return e ? (t ? (i && !u ? -1 : void 0) : i ? s : s || 0) : s;
}
function sh(e, t) {
	return De((i) => {
		(e?.(i), !i.defaultPrevented && t && (i.stopPropagation(), i.preventDefault()));
	});
}
var E0 = !1,
	_m = !0;
function GN(e) {
	const t = e.target;
	t && "hasAttribute" in t && (t.hasAttribute("data-focus-visible") || (_m = !1));
}
function FN(e) {
	e.metaKey || e.ctrlKey || e.altKey || (_m = !0);
}
var ws = et(function ({ focusable: t = !0, accessibleWhenDisabled: i, autoFocus: u, onFocusVisible: s, ...o }) {
		const f = (0, _.useRef)(null);
		((0, _.useEffect)(() => {
			t && (E0 || (Rn("mousedown", GN, !0), Rn("keydown", FN, !0), (E0 = !0)));
		}, [t]),
			_0 &&
				(0, _.useEffect)(() => {
					if (!t) return;
					const te = f.current;
					if (!te || !w0(te)) return;
					const fe = PN(te);
					if (!fe) return;
					const L = () => queueMicrotask(() => te.focus());
					for (const $ of fe) $.addEventListener("mouseup", L);
					return () => {
						for (const $ of fe) $.removeEventListener("mouseup", L);
					};
				}, [t]));
		const h = t && ps(o),
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
		const S = sh(o.onKeyPressCapture, h),
			b = sh(o.onMouseDownCapture, h),
			p = sh(o.onClickCapture, h),
			E = o.onMouseDown,
			A = De((te) => {
				if ((E?.(te), te.defaultPrevented || !t)) return;
				const fe = te.currentTarget;
				if (!_0 || m_(te) || (!ma(fe) && !w0(fe))) return;
				let L = !1;
				const $ = () => {
					L = !0;
				};
				fe.addEventListener("focusin", $, { capture: !0, once: !0 });
				const H = IN(fe.parentElement);
				(S0(H, !0),
					Ku(fe, "mouseup", () => {
						(fe.removeEventListener("focusin", $, !0), S0(H, !1), !L && w_(fe));
					}));
			}),
			M = (te, fe) => {
				if ((fe && (te.currentTarget = fe), !t)) return;
				const L = te.currentTarget;
				L && Ja(L) && (s?.(te), !te.defaultPrevented && ((L.dataset.focusVisible = "true"), g(!0)));
			},
			q = o.onKeyDownCapture,
			z = De((te) => {
				if ((q?.(te), te.defaultPrevented || !t || v || te.metaKey || te.altKey || te.ctrlKey || !gr(te))) return;
				const fe = te.currentTarget;
				Ku(fe, "focusout", () => M(te, fe));
			}),
			C = o.onFocusCapture,
			k = De((te) => {
				if ((C?.(te), te.defaultPrevented || !t)) return;
				if (!gr(te)) {
					g(!1);
					return;
				}
				const fe = te.currentTarget,
					L = () => M(te, fe);
				_m || HN(te.target) ? Ku(te.target, "focusout", L) : g(!1);
			}),
			O = o.onBlur,
			Y = De((te) => {
				(O?.(te), t && Pa(te) && (te.currentTarget.removeAttribute("data-focus-visible"), g(!1)));
			}),
			X = (0, _.useContext)(S_),
			D = De((te) => {
				t &&
					u &&
					te &&
					X &&
					queueMicrotask(() => {
						Ja(te) || (Qr(te) && te.focus());
					});
			}),
			V = p_(f),
			J = t && QN(V),
			W = t && KN(V),
			le = o.style,
			oe = (0, _.useMemo)(() => (m ? { pointerEvents: "none", ...le } : le), [m, le]);
		return (
			(o = {
				"data-focus-visible": (t && v) || void 0,
				"data-autofocus": u || void 0,
				"aria-disabled": h || void 0,
				...o,
				ref: Wt(f, D, o.ref),
				style: oe,
				tabIndex: YN(t, m, J, W, o.tabIndex),
				disabled: W && m ? !0 : void 0,
				contentEditable: h ? void 0 : o.contentEditable,
				onKeyPressCapture: S,
				onClickCapture: p,
				onMouseDownCapture: b,
				onMouseDown: A,
				onKeyDownCapture: z,
				onFocusCapture: k,
				onBlur: Y,
			}),
			iu(o)
		);
	}),
	ND = Ke(function (t) {
		return Xe(BN, ws(t));
	});
function T_(e) {
	const t = [];
	for (const i of e) t.push(...i);
	return t;
}
function Vh(e) {
	return e.slice().reverse();
}
var XN = "div";
function JN(e) {
	return e.some((t) => !!t.rowId);
}
function WN(e) {
	const t = e.target;
	return t && !ai(t) ? !1 : e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
function eM(e) {
	return e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta";
}
function T0(e, t, i) {
	return De((u) => {
		var s;
		if ((t?.(u), u.defaultPrevented || u.isPropagationStopped() || !gr(u) || eM(u) || WN(u))) return;
		const o = (s = da(e, e.getState().activeId)) == null ? void 0 : s.element;
		if (!o) return;
		const { view: f, ...h } = u;
		(o !== i?.current && o.focus(),
			yN(o, u.type, h) || u.preventDefault(),
			u.currentTarget.contains(o) && u.stopPropagation());
	});
}
function tM(e) {
	return tN(T_(Vh(nN(e))));
}
function nM(e) {
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
var Sm = et(function ({ store: t, composite: i = !0, focusOnMove: u = i, moveOnKeyPress: s = !0, ...o }) {
		const f = kN();
		((t = t || f), Jt(t, !1));
		const h = (0, _.useRef)(null),
			m = (0, _.useRef)(null),
			v = nM(t),
			g = t.useState("moves"),
			[, S] = bN(i ? t.setBaseElement : null);
		((0, _.useEffect)(() => {
			var V;
			if (!t || !g || !i || !u) return;
			const { activeId: J } = t.getState(),
				W = (V = da(t, J)) == null ? void 0 : V.element;
			W && $N(W);
		}, [t, g, i, u]),
			st(() => {
				if (!t || !g || !i) return;
				const { baseElement: V, activeId: J } = t.getState();
				if (J !== null || !V) return;
				const W = m.current;
				((m.current = null), W && Uu(W, { relatedTarget: V }), Ja(V) || V.focus());
			}, [t, g, i]));
		const b = t.useState("activeId"),
			p = t.useState("virtualFocus");
		st(() => {
			var V;
			if (!t || !i || !p) return;
			const J = m.current;
			if (((m.current = null), !J)) return;
			const W = ((V = da(t, b)) == null ? void 0 : V.element) || Di(J);
			W !== J && Uu(J, { relatedTarget: W });
		}, [t, b, p, i]);
		const E = T0(t, o.onKeyDownCapture, m),
			A = T0(t, o.onKeyUpCapture, m),
			M = o.onFocusCapture,
			q = De((V) => {
				if ((M?.(V), V.defaultPrevented || !t)) return;
				const { virtualFocus: J } = t.getState();
				if (!J) return;
				const W = V.relatedTarget,
					le = aN(V.currentTarget);
				gr(V) && le && (V.stopPropagation(), (m.current = W));
			}),
			z = o.onFocus,
			C = De((V) => {
				if ((z?.(V), V.defaultPrevented || !i || !t)) return;
				const { relatedTarget: J } = V,
					{ virtualFocus: W } = t.getState();
				W ? gr(V) && !us(t, J) && queueMicrotask(v) : gr(V) && t.setActiveId(null);
			}),
			k = o.onBlurCapture,
			O = De((V) => {
				var J;
				if ((k?.(V), V.defaultPrevented || !t)) return;
				const { virtualFocus: W, activeId: le } = t.getState();
				if (!W) return;
				const oe = (J = da(t, le)) == null ? void 0 : J.element,
					te = V.relatedTarget,
					fe = us(t, te),
					L = m.current;
				((m.current = null),
					gr(V) && fe
						? (te === oe ? L && L !== te && Uu(L, V) : oe ? Uu(oe, V) : L && Uu(L, V), V.stopPropagation())
						: !us(t, V.target) && oe && Uu(oe, V));
			}),
			Y = o.onKeyDown,
			X = Nt(s),
			D = De((V) => {
				var J;
				if ((Y?.(V), V.nativeEvent.isComposing || V.defaultPrevented || !t || !gr(V))) return;
				const { orientation: W, renderedItems: le, activeId: oe } = t.getState(),
					te = da(t, oe);
				if ((J = te?.element) != null && J.isConnected) return;
				const fe = W !== "horizontal",
					L = W !== "vertical",
					$ = JN(le);
				if (
					(V.key === "ArrowLeft" || V.key === "ArrowRight" || V.key === "Home" || V.key === "End") &&
					ai(V.currentTarget)
				)
					return;
				const ve = {
					ArrowUp:
						($ || fe) &&
						(() => {
							if ($) {
								const pe = tM(le);
								return pe?.id;
							}
							return t?.last();
						}),
					ArrowRight: ($ || L) && t.first,
					ArrowDown: ($ || fe) && t.first,
					ArrowLeft: ($ || L) && t.last,
					Home: t.first,
					End: t.last,
					PageUp: t.first,
					PageDown: t.last,
				}[V.key];
				if (ve) {
					const pe = ve();
					if (pe !== void 0) {
						if (!X(V)) return;
						(V.preventDefault(), t.move(pe));
					}
				}
			});
		return (
			(o = Cn(o, (V) => (0, w.jsx)(Ss, { value: t, children: V }), [t])),
			(o = {
				"aria-activedescendant": t.useState((V) => {
					var J;
					if (t && i && V.virtualFocus) return (J = da(t, V.activeId)) == null ? void 0 : J.id;
				}),
				...o,
				ref: Wt(h, S, o.ref),
				onKeyDownCapture: E,
				onKeyUpCapture: A,
				onFocusCapture: q,
				onFocus: C,
				onBlurCapture: O,
				onKeyDown: D,
			}),
			(o = ws({ focusable: t.useState((V) => i && (V.virtualFocus || V.activeId === null)), ...o })),
			o
		);
	}),
	MD = Ke(function (t) {
		return Xe(XN, Sm(t));
	}),
	Es = ui(),
	OD = Es.useContext,
	zD = Es.useScopedContext,
	wm = Es.useProviderContext,
	rM = Es.ContextProvider,
	iM = Es.ScopedContextProvider,
	Ts = ui([rM], [iM]),
	DD = Ts.useContext,
	jD = Ts.useScopedContext,
	Uc = Ts.useProviderContext,
	aM = Ts.ContextProvider,
	Em = Ts.ScopedContextProvider,
	uM = (0, _.createContext)(void 0),
	lM = (0, _.createContext)(void 0),
	xs = ui([aM], [Em]),
	ID = xs.useContext,
	LD = xs.useScopedContext,
	$c = xs.useProviderContext,
	x_ = xs.ContextProvider,
	Bc = xs.ScopedContextProvider,
	sM = "div",
	Tm = et(function ({ store: t, ...i }) {
		const u = $c();
		return ((t = t || u), (i = { ...i, ref: Wt(t?.setAnchorElement, i.ref) }), i);
	}),
	qD = Ke(function (t) {
		return Xe(sM, Tm(t));
	}),
	A_ = (0, _.createContext)(void 0),
	As = ui([x_, Ss], [Bc, Ic]),
	oM = As.useContext,
	R_ = As.useScopedContext,
	Vc = As.useProviderContext,
	UD = As.ContextProvider,
	cM = As.ScopedContextProvider,
	fM = (0, _.createContext)(void 0),
	dM = (0, _.createContext)(!1);
function au(e, t) {
	const i = e.__unstableInternals;
	return (Jt(i, "Invalid store"), i[t]);
}
function Kr(e, ...t) {
	let i = e,
		u = i,
		s = Symbol(),
		o = ls;
	const f = new Set(),
		h = new Set(),
		m = new Set(),
		v = new Set(),
		g = new Set(),
		S = new WeakMap(),
		b = new WeakMap(),
		p = (D) => (m.add(D), () => m.delete(D)),
		E = () => {
			const D = f.size,
				V = Symbol();
			f.add(V);
			const J = () => {
				(f.delete(V), !f.size && o());
			};
			if (D) return J;
			const W = cN(i).map((te) =>
					rr(
						...t.map((fe) => {
							var L;
							const $ = (L = fe?.getState) == null ? void 0 : L.call(fe);
							if ($ && zi($, te))
								return zn(fe, [te], (H) => {
									Y(te, H[te], !0);
								});
						}),
					),
				),
				le = [];
			for (const te of m) le.push(te());
			const oe = t.map(xm);
			return ((o = rr(...W, ...le, ...oe)), J);
		},
		A = (D, V, J = v) => (
			J.add(V),
			b.set(V, D),
			() => {
				var W;
				((W = S.get(V)) == null || W(), S.delete(V), b.delete(V), J.delete(V));
			}
		),
		M = (D, V) => A(D, V),
		q = (D, V) => (S.set(V, V(i, i)), A(D, V)),
		z = (D, V) => (S.set(V, V(i, u)), A(D, V, g)),
		C = (D) => Kr(oN(i, D), X),
		k = (D) => Kr(sN(i, D), X),
		O = () => i,
		Y = (D, V, J = !1) => {
			var W;
			if (!zi(i, D)) return;
			const le = c_(V, i[D]);
			if (le === i[D]) return;
			if (!J) for (const L of t) (W = L?.setState) == null || W.call(L, D, le);
			const oe = i;
			i = { ...i, [D]: le };
			const te = Symbol();
			((s = te), h.add(D));
			const fe = (L, $, H) => {
				var ve;
				const pe = b.get(L),
					Ze = (N) => (H ? H.has(N) : N === D);
				(!pe || pe.some(Ze)) && ((ve = S.get(L)) == null || ve(), S.set(L, L(i, $)));
			};
			for (const L of v) fe(L, oe);
			queueMicrotask(() => {
				if (s !== te) return;
				const L = i;
				for (const $ of g) fe($, u, h);
				((u = L), h.clear());
			});
		},
		X = {
			getState: O,
			setState: Y,
			__unstableInternals: { setup: p, init: E, subscribe: M, sync: q, batch: z, pick: C, omit: k },
		};
	return X;
}
function Hn(e, ...t) {
	if (e) return au(e, "setup")(...t);
}
function xm(e, ...t) {
	if (e) return au(e, "init")(...t);
}
function Am(e, ...t) {
	if (e) return au(e, "subscribe")(...t);
}
function zn(e, ...t) {
	if (e) return au(e, "sync")(...t);
}
function bc(e, ...t) {
	if (e) return au(e, "batch")(...t);
}
function Rm(e, ...t) {
	if (e) return au(e, "omit")(...t);
}
function C_(e, ...t) {
	if (e) return au(e, "pick")(...t);
}
function Zc(...e) {
	var t;
	const i = {};
	for (const s of e) {
		const o = (t = s?.getState) == null ? void 0 : t.call(s);
		o && Object.assign(i, o);
	}
	const u = Kr(i, ...e);
	return Object.assign({}, ...e, u);
}
var hM = "input";
function x0(e, t, i) {
	if (!i) return !1;
	const u = e.find((s) => !s.disabled && s.value);
	return u?.value === t;
}
function A0(e, t) {
	return !t || e == null ? !1 : ((e = f_(e)), t.length > e.length && t.toLowerCase().indexOf(e.toLowerCase()) === 0);
}
function mM(e) {
	return e.type === "input";
}
function vM(e) {
	return e === "inline" || e === "list" || e === "both" || e === "none";
}
function gM(e) {
	const t = e.find((i) => {
		var u;
		return i.disabled ? !1 : ((u = i.element) == null ? void 0 : u.getAttribute("role")) !== "tab";
	});
	return t?.id;
}
var yM = et(function ({
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
		moveOnKeyPress: E = !0,
		autoComplete: A = "list",
		...M
	}) {
		const q = Vc();
		((t = t || q), Jt(t, !1));
		const z = (0, _.useRef)(null),
			[C, k] = b_(),
			O = (0, _.useRef)(!1),
			Y = (0, _.useRef)(!1),
			X = t.useState((ce) => ce.virtualFocus && u),
			D = A === "inline" || A === "both",
			[V, J] = (0, _.useState)(D);
		SN(() => {
			D && J(!0);
		}, [D]);
		const W = t.useState("value"),
			le = (0, _.useRef)();
		(0, _.useEffect)(
			() =>
				zn(t, ["selectedValue", "activeId"], (ce, ze) => {
					le.current = ze.selectedValue;
				}),
			[],
		);
		const oe = t.useState((ce) => {
				var ze;
				if (
					D &&
					V &&
					!(
						ce.activeValue &&
						Array.isArray(ce.selectedValue) &&
						(ce.selectedValue.includes(ce.activeValue) || ((ze = le.current) != null && ze.includes(ce.activeValue)))
					)
				)
					return ce.activeValue;
			}),
			te = t.useState("renderedItems"),
			fe = t.useState("open"),
			L = t.useState("contentElement"),
			$ = (0, _.useMemo)(() => {
				if (!D || !V) return W;
				if (x0(te, oe, X)) {
					if (A0(W, oe)) {
						const ce = oe?.slice(W.length) || "";
						return W + ce;
					}
					return W;
				}
				return oe || W;
			}, [D, V, te, oe, X, W]);
		((0, _.useEffect)(() => {
			const ce = z.current;
			if (!ce) return;
			const ze = () => J(!0);
			return (
				ce.addEventListener("combobox-item-move", ze),
				() => {
					ce.removeEventListener("combobox-item-move", ze);
				}
			);
		}, []),
			(0, _.useEffect)(() => {
				if (!D || !V || !oe || !x0(te, oe, X) || !A0(W, oe)) return;
				let ce = ls;
				return (
					queueMicrotask(() => {
						const ze = z.current;
						if (!ze) return;
						const { start: nt, end: Me } = Uh(ze),
							yt = W.length,
							pn = oe.length;
						(uh(ze, yt, pn),
							(ce = () => {
								if (!Ja(ze)) return;
								const { start: at, end: Vt } = Uh(ze);
								at === yt && Vt === pn && uh(ze, nt, Me);
							}));
					}),
					() => ce()
				);
			}, [C, D, V, oe, te, X, W]));
		const H = (0, _.useRef)(null),
			ve = De(s),
			pe = (0, _.useRef)(null);
		((0, _.useEffect)(() => {
			if (!fe || !L) return;
			const ce = hm(L);
			if (!ce) return;
			H.current = ce;
			const ze = () => {
					O.current = !1;
				},
				nt = () => {
					if (!t || !O.current) return;
					const { activeId: yt } = t.getState();
					yt !== null && yt !== pe.current && (O.current = !1);
				},
				Me = { passive: !0, capture: !0 };
			return (
				ce.addEventListener("wheel", ze, Me),
				ce.addEventListener("touchmove", ze, Me),
				ce.addEventListener("scroll", nt, Me),
				() => {
					(ce.removeEventListener("wheel", ze, !0),
						ce.removeEventListener("touchmove", ze, !0),
						ce.removeEventListener("scroll", nt, !0));
				}
			);
		}, [fe, L, t]),
			st(() => {
				W && (Y.current || (O.current = !0));
			}, [W]),
			st(() => {
				(X !== "always" && fe) || (O.current = fe);
			}, [X, fe]));
		const Ze = t.useState("resetValueOnSelect");
		(rl(() => {
			var ce, ze;
			const nt = O.current;
			if (!t || !fe || (!nt && !Ze)) return;
			const { baseElement: Me, contentElement: yt, activeId: pn } = t.getState();
			if (!(Me && !Ja(Me))) {
				if (yt?.hasAttribute("data-placing")) {
					const at = new MutationObserver(k);
					return (at.observe(yt, { attributeFilter: ["data-placing"] }), () => at.disconnect());
				}
				if (X && nt) {
					const at = ve(te),
						Vt = at !== void 0 ? at : (ce = gM(te)) != null ? ce : t.first();
					((pe.current = Vt), t.move(Vt ?? null));
				} else {
					const at = (ze = t.item(pn || t.first())) == null ? void 0 : ze.element;
					at && "scrollIntoView" in at && at.scrollIntoView({ block: "nearest", inline: "nearest" });
				}
			}
		}, [t, fe, C, W, X, Ze, ve, te]),
			(0, _.useEffect)(() => {
				if (!D) return;
				const ce = z.current;
				if (!ce) return;
				const ze = [ce, L].filter((Me) => !!Me),
					nt = (Me) => {
						ze.every((yt) => Pa(Me, yt)) && t?.setValue($);
					};
				for (const Me of ze) Me.addEventListener("focusout", nt);
				return () => {
					for (const Me of ze) Me.removeEventListener("focusout", nt);
				};
			}, [D, L, t, $]));
		const N = (ce) => ce.currentTarget.value.length >= f,
			I = M.onChange,
			se = Nt(h ?? N),
			ae = Nt(o ?? !t.tag),
			be = De((ce) => {
				if ((I?.(ce), ce.defaultPrevented || !t)) return;
				const ze = ce.currentTarget,
					{ value: nt, selectionStart: Me, selectionEnd: yt } = ze,
					pn = ce.nativeEvent;
				if (((O.current = !0), mM(pn) && (pn.isComposing && ((O.current = !1), (Y.current = !0)), D))) {
					const at = pn.inputType === "insertText" || pn.inputType === "insertCompositionText",
						Vt = Me === nt.length;
					J(at && Vt);
				}
				if (ae(ce)) {
					const at = nt === t.getState().value;
					(t.setValue(nt),
						queueMicrotask(() => {
							uh(ze, Me, yt);
						}),
						D && X && at && k());
				}
				(se(ce) && t.show(), (!X || !O.current) && t.setActiveId(null));
			}),
			Te = M.onCompositionEnd,
			ke = De((ce) => {
				((O.current = !0), (Y.current = !1), Te?.(ce), !ce.defaultPrevented && X && k());
			}),
			Ue = M.onMouseDown,
			Ye = Nt(b ?? (() => !!t?.getState().includesBaseElement)),
			St = Nt(p),
			At = Nt(v ?? N),
			vn = De((ce) => {
				(Ue?.(ce),
					!ce.defaultPrevented &&
						(ce.button ||
							ce.ctrlKey ||
							(t &&
								(Ye(ce) && t.setActiveId(null),
								St(ce) && t.setValue($),
								At(ce) && Ku(ce.currentTarget, "mouseup", t.show)))));
			}),
			en = M.onKeyDown,
			Ge = Nt(S ?? N),
			ge = De((ce) => {
				if (
					(en?.(ce),
					ce.repeat || (O.current = !1),
					ce.defaultPrevented || ce.ctrlKey || ce.altKey || ce.shiftKey || ce.metaKey || !t)
				)
					return;
				const { open: ze } = t.getState();
				ze || ((ce.key === "ArrowUp" || ce.key === "ArrowDown") && Ge(ce) && (ce.preventDefault(), t.show()));
			}),
			Ce = M.onBlur,
			tt = De((ce) => {
				((O.current = !1), Ce?.(ce), ce.defaultPrevented);
			}),
			$e = ji(M.id),
			Bt = vM(A) ? A : void 0,
			Je = t.useState((ce) => ce.activeId === null);
		return (
			(M = {
				id: $e,
				role: "combobox",
				"aria-autocomplete": Bt,
				"aria-haspopup": Mc(L, "listbox"),
				"aria-expanded": fe,
				"aria-controls": L?.id,
				"data-active-item": Je || void 0,
				value: $,
				...M,
				ref: Wt(z, M.ref),
				onChange: be,
				onCompositionEnd: ke,
				onMouseDown: vn,
				onKeyDown: ge,
				onBlur: tt,
			}),
			(M = Sm({ store: t, focusable: i, ...M, moveOnKeyPress: (ce) => (Oc(E, ce) ? !1 : (D && J(!0), !0)) })),
			(M = Tm({ store: t, ...M })),
			{ autoComplete: "off", ...M }
		);
	}),
	pM = Ke(function (t) {
		return Xe(hM, yM(t));
	}),
	bM = "button";
function R0(e) {
	if (!e.isTrusted) return !1;
	const t = e.currentTarget;
	return e.key === "Enter"
		? ma(t) || t.tagName === "SUMMARY" || t.tagName === "A"
		: e.key === " "
			? ma(t) || t.tagName === "SUMMARY" || t.tagName === "INPUT" || t.tagName === "SELECT"
			: !1;
}
var _M = Symbol("command"),
	Cm = et(function ({ clickOnEnter: t = !0, clickOnSpace: i = !0, ...u }) {
		const s = (0, _.useRef)(null),
			[o, f] = (0, _.useState)(!1);
		(0, _.useEffect)(() => {
			s.current && f(ma(s.current));
		}, []);
		const [h, m] = (0, _.useState)(!1),
			v = (0, _.useRef)(!1),
			g = ps(u),
			[S, b] = __(u, _M, !0),
			p = u.onKeyDown,
			E = De((q) => {
				p?.(q);
				const z = q.currentTarget;
				if (q.defaultPrevented || S || g || !gr(q) || ai(z) || z.isContentEditable) return;
				const C = t && q.key === "Enter",
					k = i && q.key === " ",
					O = q.key === "Enter" && !t,
					Y = q.key === " " && !i;
				if (O || Y) {
					q.preventDefault();
					return;
				}
				if (C || k) {
					const X = R0(q);
					if (C) {
						if (!X) {
							q.preventDefault();
							const { view: D, ...V } = q,
								J = () => h0(z, V);
							mN() ? Ku(z, "keyup", J) : queueMicrotask(J);
						}
					} else k && ((v.current = !0), X || (q.preventDefault(), m(!0)));
				}
			}),
			A = u.onKeyUp,
			M = De((q) => {
				if ((A?.(q), q.defaultPrevented || S || g || q.metaKey)) return;
				const z = i && q.key === " ";
				if (v.current && z && ((v.current = !1), !R0(q))) {
					(q.preventDefault(), m(!1));
					const C = q.currentTarget,
						{ view: k, ...O } = q;
					queueMicrotask(() => h0(C, O));
				}
			});
		return (
			(u = {
				"data-active": h || void 0,
				type: o ? "button" : void 0,
				...b,
				...u,
				ref: Wt(s, u.ref),
				onKeyDown: E,
				onKeyUp: M,
			}),
			(u = ws(u)),
			u
		);
	}),
	$D = Ke(function (t) {
		return Xe(bM, Cm(t));
	}),
	k_ = "button",
	N_ = et(function (t) {
		const i = (0, _.useRef)(null),
			u = p_(i, k_),
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
	BD = Ke(function (t) {
		return Xe(k_, N_(t));
	}),
	SM = "button",
	wM = Symbol("disclosure"),
	M_ = et(function ({ store: t, toggleOnClick: i = !0, ...u }) {
		const s = wm();
		((t = t || s), Jt(t, !1));
		const o = (0, _.useRef)(null),
			[f, h] = (0, _.useState)(!1),
			m = t.useState("disclosureElement"),
			v = t.useState("open");
		(0, _.useEffect)(() => {
			let M = m === o.current;
			(m?.isConnected || (t?.setDisclosureElement(o.current), (M = !0)), h(v && M));
		}, [m, t, v]);
		const g = u.onClick,
			S = Nt(i),
			[b, p] = __(u, wM, !0),
			E = De((M) => {
				(g?.(M), !M.defaultPrevented && (b || (S(M) && (t?.setDisclosureElement(M.currentTarget), t?.toggle()))));
			}),
			A = t.useState("contentElement");
		return (
			(u = { "aria-expanded": f, "aria-controls": A?.id, ...p, ...u, ref: Wt(o, u.ref), onClick: E }),
			(u = N_(u)),
			u
		);
	}),
	VD = Ke(function (t) {
		return Xe(SM, M_(t));
	}),
	EM = "button",
	O_ = et(function ({ store: t, ...i }) {
		const u = Uc();
		return (
			(t = t || u),
			Jt(t, !1),
			(i = { "aria-haspopup": Mc(t.useState("contentElement"), "dialog"), ...i }),
			(i = M_({ store: t, ...i })),
			i
		);
	}),
	ZD = Ke(function (t) {
		return Xe(EM, O_(t));
	}),
	TM = "div";
function z_(e) {
	const t = e.relatedTarget;
	return t?.nodeType === Node.ELEMENT_NODE ? t : null;
}
function xM(e) {
	const t = z_(e);
	return t ? mn(e.currentTarget, t) : !1;
}
var Zh = Symbol("composite-hover");
function AM(e) {
	let t = z_(e);
	if (!t) return !1;
	do {
		if (zi(t, Zh) && t[Zh]) return !0;
		t = t.parentElement;
	} while (t);
	return !1;
}
var km = et(function ({ store: t, focusOnHover: i = !0, blurOnHoverEnd: u = !!i, ...s }) {
		const o = jc();
		((t = t || o), Jt(t, !1));
		const f = ym(),
			h = s.onMouseMove,
			m = Nt(i),
			v = De((E) => {
				if ((h?.(E), !E.defaultPrevented && f() && m(E))) {
					if (!ha(E.currentTarget)) {
						const A = t?.getState().baseElement;
						A && !Ja(A) && A.focus();
					}
					t?.setActiveId(E.currentTarget.id);
				}
			}),
			g = s.onMouseLeave,
			S = Nt(u),
			b = De((E) => {
				var A;
				(g?.(E),
					!E.defaultPrevented &&
						f() &&
						(xM(E) ||
							AM(E) ||
							(m(E) && S(E) && (t?.setActiveId(null), (A = t?.getState().baseElement) == null || A.focus()))));
			}),
			p = (0, _.useCallback)((E) => {
				E && (E[Zh] = !0);
			}, []);
		return ((s = { ...s, ref: Wt(p, s.ref), onMouseMove: v, onMouseLeave: b }), iu(s));
	}),
	HD = Dc(
		Ke(function (t) {
			return Xe(TM, km(t));
		}),
	),
	RM = "div",
	D_ = et(function ({ store: t, shouldRegisterItem: i = !0, getItem: u = d_, element: s, ...o }) {
		const f = AN();
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
			iu(o)
		);
	}),
	PD = Ke(function (t) {
		return Xe(RM, D_(t));
	}),
	CM = Ir((e) => {
		var t = xc();
		function i(b, p) {
			return (b === p && (b !== 0 || 1 / b === 1 / p)) || (b !== b && p !== p);
		}
		var u = typeof Object.is == "function" ? Object.is : i,
			s = t.useState,
			o = t.useEffect,
			f = t.useLayoutEffect,
			h = t.useDebugValue;
		function m(b, p) {
			var E = p(),
				A = s({ inst: { value: E, getSnapshot: p } }),
				M = A[0].inst,
				q = A[1];
			return (
				f(
					function () {
						((M.value = E), (M.getSnapshot = p), v(M) && q({ inst: M }));
					},
					[b, E, p],
				),
				o(
					function () {
						return (
							v(M) && q({ inst: M }),
							b(function () {
								v(M) && q({ inst: M });
							})
						);
					},
					[b],
				),
				h(E),
				E
			);
		}
		function v(b) {
			var p = b.getSnapshot;
			b = b.value;
			try {
				var E = p();
				return !u(b, E);
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
	kM = Ir((e, t) => {
		t.exports = CM();
	}),
	NM = fb(kM(), 1),
	{ useSyncExternalStore: j_ } = NM.default,
	I_ = () => () => {};
function dn(e, t = d_) {
	const i = _.useCallback((s) => (e ? Am(e, null, s) : I_()), [e]),
		u = () => {
			const s = typeof t == "string" ? t : null,
				o = typeof t == "function" ? t : null,
				f = e?.getState();
			if (o) return o(f);
			if (f && s && zi(f, s)) return f[s];
		};
	return j_(i, u, u);
}
function L_(e, t) {
	const i = _.useRef({}),
		u = _.useCallback((o) => (e ? Am(e, null, o) : I_()), [e]),
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
	return j_(u, s, s);
}
function Xt(e, t, i, u) {
	const s = zi(t, i) ? t[i] : void 0,
		o = y_({ value: s, setValue: u ? t[u] : void 0 });
	(st(
		() =>
			zn(e, [i], (f, h) => {
				const { value: m, setValue: v } = o.current;
				v && f[i] !== h[i] && f[i] !== m && v(f[i]);
			}),
		[e, i],
	),
		st(() => {
			if (s !== void 0)
				return (
					e.setState(i, s),
					bc(e, [i], () => {
						s !== void 0 && e.setState(i, s);
					})
				);
		}));
}
function Hc(e, t) {
	const [i, u] = _.useState(() => e(t));
	st(() => xm(i), [i]);
	const s = _.useCallback((o) => dn(i, o), [i]);
	return [
		_.useMemo(() => ({ ...i, useState: s }), [i, s]),
		De(() => {
			u((o) => e({ ...t, ...o.getState() }));
		}),
	];
}
var MM = "button";
function OM(e) {
	return qh(e) ? !0 : e.tagName === "INPUT" && !ma(e);
}
function zM(e, t = !1) {
	const i = e.clientHeight,
		{ top: u } = e.getBoundingClientRect(),
		s = Math.max(i * 0.875, i - 40) * 1.5,
		o = t ? i - s + u : s + u;
	return e.tagName === "HTML" ? o + e.scrollTop : o;
}
function DM(e, t = !1) {
	const { top: i } = e.getBoundingClientRect();
	return t ? i + e.clientHeight : i;
}
function C0(e, t, i, u = !1) {
	var s;
	if (!t || !i) return;
	const { renderedItems: o } = t.getState(),
		f = hm(e);
	if (!f) return;
	const h = zM(f, u);
	let m, v;
	for (let g = 0; g < o.length; g += 1) {
		const S = m;
		if (((m = i(g)), !m)) break;
		if (m === S) continue;
		const b = (s = da(t, m)) == null ? void 0 : s.element;
		if (!b) continue;
		const p = DM(b, u) - h,
			E = Math.abs(p);
		if ((u && p <= 0) || (!u && p >= 0)) {
			v !== void 0 && v < E && (m = S);
			break;
		}
		v = E;
	}
	return m;
}
function jM(e, t) {
	return gr(e) ? !1 : us(t, e.target);
}
var Nm = et(function ({
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
		const g = jc();
		t = t || g;
		const S = ji(v.id),
			b = (0, _.useRef)(null),
			p = (0, _.useContext)(MN),
			E = ps(v) && !v.accessibleWhenDisabled,
			{
				rowId: A,
				baseElement: M,
				isActiveItem: q,
				ariaSetSize: z,
				ariaPosInSet: C,
				isTabbable: k,
			} = L_(t, {
				rowId(L) {
					if (i) return i;
					if (L && p?.baseElement && p.baseElement === L.baseElement) return p.id;
				},
				baseElement(L) {
					return L?.baseElement || void 0;
				},
				isActiveItem(L) {
					return !!L && L.activeId === S;
				},
				ariaSetSize(L) {
					if (h != null) return h;
					if (L && p?.ariaSetSize && p.baseElement === L.baseElement) return p.ariaSetSize;
				},
				ariaPosInSet(L) {
					if (m != null) return m;
					if (!L || !p?.ariaPosInSet || p.baseElement !== L.baseElement) return;
					const $ = L.renderedItems.filter((H) => H.rowId === A);
					return p.ariaPosInSet + $.findIndex((H) => H.id === S);
				},
				isTabbable(L) {
					if (!L?.renderedItems.length) return !0;
					if (L.virtualFocus) return !1;
					if (o) return !0;
					if (L.activeId === null) return !1;
					const $ = t?.item(L.activeId);
					return $?.disabled || !$?.element ? !0 : L.activeId === S;
				},
			}),
			O = (0, _.useCallback)(
				(L) => {
					var $;
					const H = {
						...L,
						id: S || L.id,
						rowId: A,
						disabled: !!E,
						children: ($ = L.element) == null ? void 0 : $.textContent,
					};
					return f ? f(H) : H;
				},
				[S, A, E, f],
			),
			Y = v.onFocus,
			X = (0, _.useRef)(!1),
			D = De((L) => {
				if ((Y?.(L), L.defaultPrevented || m_(L) || !S || !t || jM(L, t))) return;
				const { virtualFocus: $, baseElement: H } = t.getState();
				(t.setActiveId(S),
					qh(L.currentTarget) && rN(L.currentTarget),
					$ &&
						gr(L) &&
						(OM(L.currentTarget) ||
							(H?.isConnected &&
								(zc() &&
									L.currentTarget.hasAttribute("data-autofocus") &&
									L.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" }),
								(X.current = !0),
								L.relatedTarget === H || us(t, L.relatedTarget) ? iN(H) : H.focus()))));
			}),
			V = v.onBlurCapture,
			J = De((L) => {
				if ((V?.(L), L.defaultPrevented)) return;
				const $ = t?.getState();
				$?.virtualFocus && X.current && ((X.current = !1), L.preventDefault(), L.stopPropagation());
			}),
			W = v.onKeyDown,
			le = Nt(u),
			oe = Nt(s),
			te = De((L) => {
				if ((W?.(L), L.defaultPrevented || !gr(L) || !t)) return;
				const { currentTarget: $ } = L,
					H = t.getState(),
					ve = t.item(S),
					pe = !!ve?.rowId,
					Ze = H.orientation !== "horizontal",
					N = H.orientation !== "vertical",
					I = () => !!(pe || N || !H.baseElement || !ai(H.baseElement)),
					se = {
						ArrowUp: (pe || Ze) && t.up,
						ArrowRight: (pe || N) && t.next,
						ArrowDown: (pe || Ze) && t.down,
						ArrowLeft: (pe || N) && t.previous,
						Home: () => {
							if (I()) return !pe || L.ctrlKey ? t?.first() : t?.previous(-1);
						},
						End: () => {
							if (I()) return !pe || L.ctrlKey ? t?.last() : t?.next(-1);
						},
						PageUp: () => C0($, t, t?.up, !0),
						PageDown: () => C0($, t, t?.down),
					}[L.key];
				if (se) {
					if (qh($)) {
						const be = Uh($),
							Te = N && L.key === "ArrowLeft",
							ke = N && L.key === "ArrowRight",
							Ue = Ze && L.key === "ArrowUp",
							Ye = Ze && L.key === "ArrowDown";
						if (ke || Ye) {
							const { length: St } = Xk($);
							if (be.end !== St) return;
						} else if ((Te || Ue) && be.start !== 0) return;
					}
					const ae = se();
					if (le(L) || ae !== void 0) {
						if (!oe(L)) return;
						(L.preventDefault(), t.move(ae));
					}
				}
			}),
			fe = (0, _.useMemo)(() => ({ id: S, baseElement: M }), [S, M]);
		return (
			(v = Cn(v, (L) => (0, w.jsx)(NN.Provider, { value: fe, children: L }), [fe])),
			(v = {
				id: S,
				"data-active-item": q || void 0,
				...v,
				ref: Wt(b, v.ref),
				tabIndex: k ? v.tabIndex : -1,
				onFocus: D,
				onBlurCapture: J,
				onKeyDown: te,
			}),
			(v = Cm(v)),
			(v = D_({ store: t, ...v, getItem: O, shouldRegisterItem: S ? v.shouldRegisterItem : !1 })),
			iu({ ...v, "aria-setsize": z, "aria-posinset": C })
		);
	}),
	QD = Dc(
		Ke(function (t) {
			return Xe(MM, Nm(t));
		}),
	),
	IM = "div";
function LM(e, t) {
	if (t != null) return e == null ? !1 : Array.isArray(e) ? e.includes(t) : e === t;
}
function qM(e) {
	var t;
	return (t = { menu: "menuitem", listbox: "option", tree: "treeitem" }[e]) != null ? t : "option";
}
var UM = et(function ({
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
		const b = R_();
		((t = t || b), Jt(t, !1));
		const {
				resetValueOnSelectState: p,
				multiSelectable: E,
				selected: A,
			} = L_(t, {
				resetValueOnSelectState: "resetValueOnSelect",
				multiSelectable(J) {
					return Array.isArray(J.selectedValue);
				},
				selected(J) {
					return LM(J.selectedValue, i);
				},
			}),
			M = (0, _.useCallback)(
				(J) => {
					const W = { ...J, value: i };
					return v ? v(W) : W;
				},
				[i, v],
			);
		((s = s ?? !E), (u = u ?? (i != null && !E)));
		const q = g.onClick,
			z = Nt(s),
			C = Nt(o),
			k = Nt((S = f ?? p) != null ? S : E),
			O = Nt(u),
			Y = De((J) => {
				(q?.(J),
					!J.defaultPrevented &&
						(g_(J) ||
							v_(J) ||
							(i != null &&
								(C(J) &&
									(k(J) && t?.resetValue(),
									t?.setSelectedValue((W) =>
										Array.isArray(W) ? (W.includes(i) ? W.filter((le) => le !== i) : [...W, i]) : i,
									)),
								z(J) && t?.setValue(i)),
							O(J) && t?.hide())));
			}),
			X = g.onKeyDown,
			D = De((J) => {
				if ((X?.(J), J.defaultPrevented)) return;
				const W = t?.getState().baseElement;
				W &&
					(Ja(W) ||
						((J.key.length === 1 || J.key === "Backspace" || J.key === "Delete") &&
							(queueMicrotask(() => W.focus()), ai(W) && t?.setValue(W.value))));
			});
		(E && A != null && (g = { "aria-selected": A, ...g }),
			(g = Cn(
				g,
				(J) =>
					(0, w.jsx)(fM.Provider, { value: i, children: (0, w.jsx)(dM.Provider, { value: A ?? !1, children: J }) }),
				[i, A],
			)),
			(g = { role: qM((0, _.useContext)(A_)), children: i, ...g, onClick: Y, onKeyDown: D }));
		const V = Nt(m);
		return (
			(g = Nm({
				store: t,
				...g,
				getItem: M,
				moveOnKeyPress: (J) => {
					if (!V(J)) return !1;
					const W = new Event("combobox-item-move");
					return (t?.getState().baseElement?.dispatchEvent(W), !0);
				},
			})),
			(g = km({ store: t, focusOnHover: h, ...g })),
			g
		);
	}),
	$M = Dc(
		Ke(function (t) {
			return Xe(IM, UM(t));
		}),
	),
	_c = wb(),
	BM = "div";
function k0(e, t) {
	const i = setTimeout(t, e);
	return () => clearTimeout(i);
}
function VM(e) {
	let t = requestAnimationFrame(() => {
		t = requestAnimationFrame(e);
	});
	return () => cancelAnimationFrame(t);
}
function N0(...e) {
	return e
		.join(", ")
		.split(", ")
		.reduce((t, i) => {
			const u = i.endsWith("ms") ? 1 : 1e3,
				s = Number.parseFloat(i || "0s") * u;
			return s > t ? s : t;
		}, 0);
}
function Pc(e, t, i) {
	return !i && t !== !1 && (!e || !!t);
}
var Mm = et(function ({ store: t, alwaysVisible: i, ...u }) {
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
		(st(() => {
			o.current && t?.setContentElement(o.current);
		}, [t]),
			st(() => {
				let q;
				return (
					t?.setState("animated", (z) => ((q = z), !0)),
					() => {
						q !== void 0 && t?.setState("animated", q);
					}
				);
			}, [t]),
			st(() => {
				if (S) {
					if (!b?.isConnected) {
						m(null);
						return;
					}
					return VM(() => {
						m(v ? "enter" : g ? "leave" : null);
					});
				}
			}, [S, b, v, g]),
			st(() => {
				if (!t || !S || !h || !b) return;
				const q = () => t?.setState("animating", !1),
					z = () => (0, _c.flushSync)(q);
				if ((h === "leave" && v) || (h === "enter" && !v)) return;
				if (typeof S == "number") return k0(S, z);
				const {
						transitionDuration: C,
						animationDuration: k,
						transitionDelay: O,
						animationDelay: Y,
					} = getComputedStyle(b),
					{
						transitionDuration: X = "0",
						animationDuration: D = "0",
						transitionDelay: V = "0",
						animationDelay: J = "0",
					} = p ? getComputedStyle(p) : {},
					W = N0(O, Y, V, J) + N0(C, k, X, D);
				if (!W) {
					(h === "enter" && t.setState("animated", !1), q());
					return;
				}
				return k0(Math.max(W - 1e3 / 60, 0), z);
			}, [t, S, b, p, v, h]),
			(u = Cn(u, (q) => (0, w.jsx)(Em, { value: t, children: q }), [t])));
		const E = Pc(g, u.hidden, i),
			A = u.style,
			M = (0, _.useMemo)(() => (E ? { ...A, display: "none" } : A), [E, A]);
		return (
			(u = {
				id: f,
				"data-open": v || void 0,
				"data-enter": h === "enter" || void 0,
				"data-leave": h === "leave" || void 0,
				hidden: E,
				...u,
				ref: Wt(f ? t.setContentElement : null, o, u.ref),
				style: M,
			}),
			iu(u)
		);
	}),
	ZM = Ke(function (t) {
		return Xe(BM, Mm(t));
	}),
	KD = Ke(function ({ unmountOnHide: t, ...i }) {
		const u = wm();
		return dn(i.store || u, (s) => !t || s?.mounted) === !1 ? null : (0, w.jsx)(ZM, { ...i });
	}),
	HM = "div",
	q_ = et(function ({ store: t, alwaysVisible: i, ...u }) {
		const s = R_(!0),
			o = oM();
		t = t || o;
		const f = !!t && t === s;
		Jt(t, !1);
		const h = (0, _.useRef)(null),
			m = ji(u.id),
			v = t.useState("mounted"),
			g = Pc(v, u.hidden, i),
			S = g ? { ...u.style, display: "none" } : u.style,
			b = t.useState((C) => Array.isArray(C.selectedValue)),
			p = _N(h, "role", u.role),
			E = ((p === "listbox" || p === "tree" || p === "grid") && b) || void 0,
			[A, M] = (0, _.useState)(!1),
			q = t.useState("contentElement");
		(st(() => {
			if (!v) return;
			const C = h.current;
			if (!C || q !== C) return;
			const k = () => {
					M(!!C.querySelector("[role='listbox']"));
				},
				O = new MutationObserver(k);
			return (O.observe(C, { subtree: !0, childList: !0, attributeFilter: ["role"] }), k(), () => O.disconnect());
		}, [v, q]),
			A || (u = { role: "listbox", "aria-multiselectable": E, ...u }),
			(u = Cn(u, (C) => (0, w.jsx)(cM, { value: t, children: (0, w.jsx)(A_.Provider, { value: p, children: C }) }), [
				t,
				p,
			])));
		const z = m && (!s || !f) ? t.setContentElement : null;
		return ((u = { id: m, hidden: g, ...u, ref: Wt(z, h, u.ref), style: S }), iu(u));
	}),
	YD = Ke(function (t) {
		return Xe(HM, q_(t));
	}),
	M0 = (0, _.createContext)(null),
	PM = "span",
	U_ = et(function (t) {
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
	GD = Ke(function (t) {
		return Xe(PM, U_(t));
	}),
	QM = "span",
	KM = et(function (t) {
		return (
			(t = {
				"data-focus-trap": "",
				tabIndex: 0,
				"aria-hidden": !0,
				...t,
				style: { position: "fixed", top: 0, left: 0, ...t.style },
			}),
			(t = U_(t)),
			t
		);
	}),
	Xo = Ke(function (t) {
		return Xe(QM, KM(t));
	}),
	YM = "div";
function GM(e) {
	return xt(e).body;
}
function FM(e, t) {
	return t ? (typeof t == "function" ? t(e) : t) : xt(e).createElement("div");
}
function XM(e = "id") {
	return `${e ? `${e}-` : ""}${Math.random().toString(36).slice(2, 8)}`;
}
function oa(e) {
	queueMicrotask(() => {
		e?.focus();
	});
}
var $_ = et(function ({
		preserveTabOrder: t,
		preserveTabOrderAnchor: i,
		portalElement: u,
		portalRef: s,
		portal: o = !0,
		...f
	}) {
		const h = (0, _.useRef)(null),
			m = Wt(h, f.ref),
			v = (0, _.useContext)(M0),
			[g, S] = (0, _.useState)(null),
			[b, p] = (0, _.useState)(null),
			E = (0, _.useRef)(null),
			A = (0, _.useRef)(null),
			M = (0, _.useRef)(null),
			q = (0, _.useRef)(null);
		return (
			st(() => {
				const z = h.current;
				if (!z || !o) {
					S(null);
					return;
				}
				const C = FM(z, u);
				if (!C) {
					S(null);
					return;
				}
				const k = C.isConnected;
				if ((k || (v || GM(z)).appendChild(C), C.id || (C.id = z.id ? `portal/${z.id}` : XM()), S(C), Bh(s, C), !k))
					return () => {
						(C.remove(), Bh(s, null));
					};
			}, [o, u, v, s]),
			st(() => {
				if (!o || !t || !i) return;
				const z = xt(i).createElement("span");
				return (
					(z.style.position = "fixed"),
					i.insertAdjacentElement("afterend", z),
					p(z),
					() => {
						(z.remove(), p(null));
					}
				);
			}, [o, t, i]),
			(0, _.useEffect)(() => {
				if (!g || !t) return;
				let z = 0;
				const C = (k) => {
					if (!Pa(k)) return;
					const O = k.type === "focusin";
					if ((cancelAnimationFrame(z), O)) return UN(g);
					z = requestAnimationFrame(() => {
						qN(g, !0);
					});
				};
				return (
					g.addEventListener("focusin", C, !0),
					g.addEventListener("focusout", C, !0),
					() => {
						(cancelAnimationFrame(z),
							g.removeEventListener("focusin", C, !0),
							g.removeEventListener("focusout", C, !0));
					}
				);
			}, [g, t]),
			(f = Cn(
				f,
				(z) => {
					if (((z = (0, w.jsx)(M0.Provider, { value: g || v, children: z })), !o)) return z;
					if (!g) return (0, w.jsx)("span", { ref: m, id: f.id, style: { position: "fixed" }, hidden: !0 });
					((z = (0, w.jsxs)(w.Fragment, {
						children: [
							t &&
								g &&
								(0, w.jsx)(Xo, {
									ref: A,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-before",
									onFocus: (k) => {
										Pa(k, g) ? oa(lh()) : oa(E.current);
									},
								}),
							z,
							t &&
								g &&
								(0, w.jsx)(Xo, {
									ref: M,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-after",
									onFocus: (k) => {
										Pa(k, g) ? oa(b0()) : oa(q.current);
									},
								}),
						],
					})),
						g && (z = (0, _c.createPortal)(z, g)));
					let C = (0, w.jsxs)(w.Fragment, {
						children: [
							t &&
								g &&
								(0, w.jsx)(Xo, {
									ref: E,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-before",
									onFocus: (k) => {
										k.relatedTarget !== q.current && Pa(k, g) ? oa(A.current) : oa(b0());
									},
								}),
							t && (0, w.jsx)("span", { "aria-owns": g?.id, style: { position: "fixed" } }),
							t &&
								g &&
								(0, w.jsx)(Xo, {
									ref: q,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-after",
									onFocus: (k) => {
										if (Pa(k, g)) oa(M.current);
										else {
											const O = lh();
											if (O === A.current) {
												requestAnimationFrame(() => {
													var Y;
													return (Y = lh()) == null ? void 0 : Y.focus();
												});
												return;
											}
											oa(O);
										}
									},
								}),
						],
					});
					return (b && t && (C = (0, _c.createPortal)(C, b)), (0, w.jsxs)(w.Fragment, { children: [C, z] }));
				},
				[g, v, o, f.id, t, b],
			)),
			(f = { ...f, ref: m }),
			f
		);
	}),
	FD = Ke(function (t) {
		return Xe(YM, $_(t));
	}),
	O0 = (0, _.createContext)(0);
function JM({ level: e, children: t }) {
	const i = (0, _.useContext)(O0),
		u = Math.max(Math.min(e || i + 1, 6), 1);
	return (0, w.jsx)(O0.Provider, { value: u, children: t });
}
var WM = "div",
	B_ = et(function ({ autoFocusOnShow: t = !0, ...i }) {
		return ((i = Cn(i, (u) => (0, w.jsx)(S_.Provider, { value: t, children: u }), [t])), i);
	}),
	XD = Ke(function (t) {
		return Xe(WM, B_(t));
	});
function eO(e, t) {
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
function tO(e) {
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
var oh = new WeakMap();
function Rs(e, t, i) {
	oh.has(e) || oh.set(e, new Map());
	const u = oh.get(e),
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
	return Rs(e, t, () => {
		const s = e.getAttribute(t);
		return (
			e.setAttribute(t, i),
			() => {
				s == null ? e.removeAttribute(t) : e.setAttribute(t, s);
			}
		);
	});
}
function Wa(e, t, i) {
	return Rs(e, t, () => {
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
function Hh(e, t) {
	return e
		? Rs(e, "style", () => {
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
function nO(e, t, i) {
	return e
		? Rs(e, t, () => {
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
var rO = ["SCRIPT", "STYLE"];
function Ph(e) {
	return `__ariakit-dialog-snapshot-${e}`;
}
function iO(e, t) {
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
function aO(e, t, i) {
	return rO.includes(t.tagName) || !iO(e, t) ? !1 : !i.some((u) => u && mn(t, u));
}
function zm(e, t, i, u) {
	for (let s of t) {
		if (!s?.isConnected) continue;
		const o = t.some((m) => (!m || m === s ? !1 : m.contains(s))),
			f = xt(s),
			h = s;
		for (; s.parentElement && s !== f.body; ) {
			if ((u?.(s.parentElement, h), !o)) for (const m of s.parentElement.children) aO(e, m, t) && i(m, h);
			s = s.parentElement;
		}
	}
}
function uO(e, t) {
	const { body: i } = xt(t[0]),
		u = [];
	return (
		zm(e, t, (o) => {
			u.push(Wa(o, Ph(e), !0));
		}),
		rr(Wa(i, Ph(e), !0), () => {
			for (const o of u) o();
		})
	);
}
function V_(e, ...t) {
	if (!e) return !1;
	const i = e.getAttribute("data-backdrop");
	return i == null ? !1 : i === "" || i === "true" || !t.length ? !0 : t.some((u) => i === u);
}
function el(e = "", t = !1) {
	return `__ariakit-dialog-${t ? "ancestor" : "outside"}${e ? `-${e}` : ""}`;
}
function lO(e, t = "") {
	return rr(Wa(e, el(), !0), Wa(e, el(t), !0));
}
function Z_(e, t = "") {
	return rr(Wa(e, el("", !0), !0), Wa(e, el(t, !0), !0));
}
function Dm(e, t) {
	const i = el(t, !0);
	if (e[i]) return !0;
	const u = el(t);
	do {
		if (e[u]) return !0;
		if (!e.parentElement) return !1;
		e = e.parentElement;
	} while (!0);
}
function z0(e, t) {
	const i = [],
		u = t.map((o) => o?.id);
	return (
		zm(
			e,
			t,
			(o) => {
				V_(o, ...u) || i.unshift(lO(o, e));
			},
			(o, f) => {
				(f.hasAttribute("data-dialog") && f.id !== e) || i.unshift(Z_(o, e));
			},
		),
		() => {
			for (const o of i) o();
		}
	);
}
function sO(e) {
	return e.tagName === "HTML" ? !0 : mn(xt(e).body, e);
}
function oO(e, t) {
	if (!e) return !1;
	if (mn(e, t)) return !0;
	const i = t.getAttribute("aria-activedescendant");
	if (i) {
		const u = xt(e).getElementById(i);
		if (u) return mn(e, u);
	}
	return !1;
}
function cO(e, t) {
	if (!("clientY" in e)) return !1;
	const i = t.getBoundingClientRect();
	return i.width === 0 || i.height === 0
		? !1
		: i.top <= e.clientY && e.clientY <= i.top + i.height && i.left <= e.clientX && e.clientX <= i.left + i.width;
}
function ch({ store: e, type: t, listener: i, capture: u, domReady: s }) {
	const o = De(i),
		f = dn(e, "open"),
		h = (0, _.useRef)(!1);
	(st(() => {
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
									sO(b) &&
									(mn(g, b) ||
										oO(S, b) ||
										b.hasAttribute("data-focus-trap") ||
										cO(v, g) ||
										(h.current && !Dm(b, g.id)) ||
										ZN(b) ||
										o(v));
							},
							u,
						)
					: void 0,
			[f, u],
		));
}
function fh(e, t) {
	return typeof e == "function" ? e(t) : !!e;
}
function fO(e, t, i) {
	const u = tO(dn(e, "open")),
		s = { store: e, domReady: i, capture: !0 };
	(ch({
		...s,
		type: "click",
		listener: (o) => {
			const { contentElement: f } = e.getState(),
				h = u.current;
			h && l_(h) && Dm(h, f?.id) && fh(t, o) && e.hide();
		},
	}),
		ch({
			...s,
			type: "focusin",
			listener: (o) => {
				const { contentElement: f } = e.getState();
				f && o.target !== xt(f) && fh(t, o) && e.hide();
			},
		}),
		ch({
			...s,
			type: "contextmenu",
			listener: (o) => {
				fh(t, o) && e.hide();
			},
		}));
}
var D0 = (0, _.createContext)({});
function dO(e) {
	const t = (0, _.useContext)(D0),
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
	st(
		() =>
			zn(e, ["open", "contentElement"], (f) => {
				var h;
				if (f.open && f.contentElement) return (h = t.add) == null ? void 0 : h.call(t, e);
			}),
		[e, t],
	);
	const o = (0, _.useMemo)(() => ({ store: e, add: s }), [e, s]);
	return {
		wrapElement: (0, _.useCallback)((f) => (0, w.jsx)(D0.Provider, { value: o, children: f }), [o]),
		nestedDialogs: i,
	};
}
function hO({ attribute: e, contentId: t, contentElement: i, enabled: u }) {
	const [s, o] = b_(),
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
			const m = new MutationObserver(() => (0, _c.flushSync)(o));
			return (m.observe(h, { attributeFilter: [e] }), () => m.disconnect());
		}, [s, u, t, i, f, e]),
		f
	);
}
function mO(e) {
	const t = e.getBoundingClientRect().left;
	return Math.round(t) + e.scrollLeft ? "paddingLeft" : "paddingRight";
}
function vO(e, t, i) {
	const u = hO({ attribute: "data-dialog-prevent-body-scroll", contentElement: e, contentId: t, enabled: i });
	(0, _.useEffect)(() => {
		if (!u() || !e) return;
		const s = xt(e),
			o = u_(e),
			{ documentElement: f, body: h } = s,
			m = f.style.getPropertyValue("--scrollbar-width"),
			v = m ? Number.parseInt(m, 10) : o.innerWidth - f.clientWidth,
			g = () => nO(f, "--scrollbar-width", `${v}px`),
			S = mO(f),
			b = () => Hh(h, { overflow: "hidden", [S]: `${v}px` }),
			p = () => {
				var A, M;
				const { scrollX: q, scrollY: z, visualViewport: C } = o,
					k = (A = C?.offsetLeft) != null ? A : 0,
					O = (M = C?.offsetTop) != null ? M : 0,
					Y = Hh(h, {
						position: "fixed",
						overflow: "hidden",
						top: `${-(z - Math.floor(O))}px`,
						left: `${-(q - Math.floor(k))}px`,
						right: "0",
						[S]: `${v}px`,
					});
				return () => {
					(Y(), o.scrollTo({ left: q, top: z, behavior: "instant" }));
				};
			},
			E = mm() && !vN();
		return rr(g(), E ? p() : b());
	}, [u, e]);
}
function gO(e, ...t) {
	if (!e) return !1;
	const i = e.getAttribute("data-focus-trap");
	return i == null ? !1 : t.length ? (i === "" ? !1 : t.some((u) => i === u)) : !0;
}
function H_() {
	return "inert" in HTMLElement.prototype;
}
function yO(e) {
	return Om(e, "aria-hidden", "true");
}
function P_(e, t) {
	return "style" in e
		? H_()
			? Wa(e, "inert", !0)
			: rr(
					...qc(e, !0).map((i) => {
						if (t?.some((s) => s && mn(s, i))) return ls;
						const u = Rs(
							i,
							"focus",
							() => (
								(i.focus = ls),
								() => {
									delete i.focus;
								}
							),
						);
						return rr(Om(i, "tabindex", "-1"), u);
					}),
					yO(e),
					Hh(e, { pointerEvents: "none", userSelect: "none", cursor: "default" }),
				)
		: ls;
}
function pO(e, t) {
	const i = [],
		u = t.map((o) => o?.id);
	return (
		zm(
			e,
			t,
			(o) => {
				V_(o, ...u) || gO(o, ...u) || i.unshift(P_(o, t));
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
function Q_(e = {}) {
	const t = Zc(e.store, Rm(e.disclosure, ["contentElement", "disclosureElement"]));
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
		Hn(o, () =>
			zn(o, ["animated", "animating"], (f) => {
				f.animated || o.setState("animating", !1);
			}),
		),
		Hn(o, () =>
			Am(o, ["open"], () => {
				o.getState().animated && o.setState("animating", !0);
			}),
		),
		Hn(o, () =>
			zn(o, ["open", "animating"], (f) => {
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
function K_(e, t, i) {
	return (
		rl(t, [i.store, i.disclosure]),
		Xt(e, i, "open", "setOpen"),
		Xt(e, i, "mounted", "setMounted"),
		Xt(e, i, "animated"),
		Object.assign(e, { disclosure: i.disclosure })
	);
}
function bO(e = {}) {
	const [t, i] = Hc(Q_, e);
	return K_(t, i, e);
}
var _O = "div",
	SO = [
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
	JD = et(function (t) {
		return t;
	}),
	Sc = Ke(function (t) {
		return Xe(_O, t);
	});
Object.assign(
	Sc,
	SO.reduce(
		(e, t) => (
			(e[t] = Ke(function (u) {
				return Xe(t, u);
			})),
			e
		),
		{},
	),
);
function wO({ store: e, backdrop: t, alwaysVisible: i, hidden: u }) {
	const s = (0, _.useRef)(null),
		o = bO({ disclosure: e }),
		f = dn(e, "contentElement");
	((0, _.useEffect)(() => {
		const v = s.current,
			g = f;
		v && g && (v.style.zIndex = getComputedStyle(g).zIndex);
	}, [f]),
		st(() => {
			const v = f?.id;
			if (!v) return;
			const g = s.current;
			if (g) return Z_(g, v);
		}, [f]));
	const h = Mm({
		ref: s,
		store: o,
		role: "presentation",
		"data-backdrop": f?.id || "",
		alwaysVisible: i,
		hidden: u ?? void 0,
		style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 },
	});
	if (!t) return null;
	if ((0, _.isValidElement)(t)) return (0, w.jsx)(Sc, { ...h, render: t });
	const m = typeof t != "boolean" ? t : "div";
	return (0, w.jsx)(Sc, { ...h, render: (0, w.jsx)(m, {}) });
}
function Y_(e = {}) {
	return Q_(e);
}
function G_(e, t, i) {
	return K_(e, t, i);
}
function EO(e = {}) {
	const [t, i] = Hc(Y_, e);
	return G_(t, i, e);
}
var TO = "div",
	j0 = zc();
function xO(e) {
	const t = Di();
	return !t || (e && mn(e, t)) ? !1 : !!Qr(t);
}
function I0(e, t = !1) {
	if (!e) return null;
	const i = "current" in e ? e.current : e;
	return i ? (t ? (Qr(i) ? i : null) : i) : null;
}
var F_ = et(function ({
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
	initialFocus: E,
	finalFocus: A,
	unmountOnHide: M,
	unstable_treeSnapshotKey: q,
	...z
}) {
	const C = Uc(),
		k = (0, _.useRef)(null),
		O = EO({
			store: t || C,
			open: i,
			setOpen(ge) {
				if (ge) return;
				const Ce = k.current;
				if (!Ce) return;
				const tt = new Event("close", { bubbles: !1, cancelable: !0 });
				(u && Ce.addEventListener("close", u, { once: !0 }),
					Ce.dispatchEvent(tt),
					tt.defaultPrevented && O.setOpen(!0));
			},
		}),
		{ portalRef: Y, domReady: X } = gm(f, z.portalRef),
		D = z.preserveTabOrder,
		V = dn(O, (ge) => D && !o && ge.mounted),
		J = ji(z.id),
		W = dn(O, "open"),
		le = dn(O, "mounted"),
		oe = dn(O, "contentElement"),
		te = Pc(le, z.hidden, z.alwaysVisible);
	(vO(oe, J, S && !te), fO(O, v, X));
	const { wrapElement: fe, nestedDialogs: L } = dO(O);
	((z = Cn(z, fe, [fe])),
		st(() => {
			if (!W) return;
			const ge = k.current,
				Ce = Di(ge, !0);
			Ce && Ce.tagName !== "BODY" && ((ge && mn(ge, Ce)) || O.setDisclosureElement(Ce));
		}, [O, W]),
		j0 &&
			(0, _.useEffect)(() => {
				if (!le) return;
				const { disclosureElement: ge } = O.getState();
				if (!ge || !ma(ge)) return;
				const Ce = () => {
					let tt = !1;
					const $e = () => {
						tt = !0;
					};
					(ge.addEventListener("focusin", $e, { capture: !0, once: !0 }),
						Ku(ge, "mouseup", () => {
							(ge.removeEventListener("focusin", $e, !0), !tt && w_(ge));
						}));
				};
				return (
					ge.addEventListener("mousedown", Ce),
					() => {
						ge.removeEventListener("mousedown", Ce);
					}
				);
			}, [O, le]),
		(0, _.useEffect)(() => {
			if (!le || !X) return;
			const ge = k.current;
			if (!ge) return;
			const Ce = u_(ge),
				tt = Ce.visualViewport || Ce,
				$e = () => {
					var Bt, Je;
					const ce = (Je = (Bt = Ce.visualViewport) == null ? void 0 : Bt.height) != null ? Je : Ce.innerHeight;
					ge.style.setProperty("--dialog-viewport-height", `${ce}px`);
				};
			return (
				$e(),
				tt.addEventListener("resize", $e),
				() => {
					tt.removeEventListener("resize", $e);
				}
			);
		}, [le, X]),
		(0, _.useEffect)(() => {
			if (!o || !le || !X) return;
			const ge = k.current;
			if (ge && !ge.querySelector("[data-dialog-dismiss]")) return eO(ge, O.hide);
		}, [O, o, le, X]),
		st(() => {
			if (!H_() || W || !le || !X) return;
			const ge = k.current;
			if (ge) return P_(ge);
		}, [W, le, X]));
	const $ = W && X;
	st(() => {
		if (!J || !$) return;
		const ge = k.current;
		return uO(J, [ge]);
	}, [J, $, q]);
	const H = De(g);
	st(() => {
		if (!J || !$) return;
		const { disclosureElement: ge } = O.getState(),
			Ce = [k.current, ...(H() || []), ...L.map((tt) => tt.getState().contentElement)];
		return o ? rr(z0(J, Ce), pO(J, Ce)) : z0(J, [ge, ...Ce]);
	}, [J, O, $, H, L, o, q]);
	const ve = !!b,
		pe = Nt(b),
		[Ze, N] = (0, _.useState)(!1);
	(0, _.useEffect)(() => {
		if (!W || !ve || !X || !oe?.isConnected) return;
		const ge = I0(E, !0) || oe.querySelector("[data-autofocus=true],[autofocus]") || zN(oe, !0, f && V) || oe,
			Ce = Qr(ge);
		pe(Ce ? ge : null) &&
			(N(!0),
			queueMicrotask(() => {
				(ge.focus(), j0 && Ce && ge.scrollIntoView({ block: "nearest", inline: "nearest" }));
			}));
	}, [W, ve, X, oe, E, f, V, pe]);
	const I = !!p,
		se = Nt(p),
		[ae, be] = (0, _.useState)(!1);
	(0, _.useEffect)(() => {
		if (W) return (be(!0), () => be(!1));
	}, [W]);
	const Te = (0, _.useCallback)(
			(ge, Ce = !0) => {
				const { disclosureElement: tt } = O.getState();
				if (xO(ge)) return;
				let $e = I0(A) || tt;
				if ($e?.id) {
					const Je = xt($e),
						ce = `[aria-activedescendant="${$e.id}"]`,
						ze = Je.querySelector(ce);
					ze && ($e = ze);
				}
				if ($e && !Qr($e)) {
					const Je = $e.closest("[data-dialog]");
					if (Je?.id) {
						const ce = xt(Je),
							ze = `[aria-controls~="${Je.id}"]`,
							nt = ce.querySelector(ze);
						nt && ($e = nt);
					}
				}
				const Bt = $e && Qr($e);
				if (!Bt && Ce) {
					requestAnimationFrame(() => Te(ge, !1));
					return;
				}
				se(Bt ? $e : null) && Bt && $e?.focus({ preventScroll: !0 });
			},
			[O, A, se],
		),
		ke = (0, _.useRef)(!1);
	(st(() => {
		if (W || !ae || !I) return;
		const ge = k.current;
		((ke.current = !0), Te(ge));
	}, [W, ae, X, I, Te]),
		(0, _.useEffect)(() => {
			if (!ae || !I) return;
			const ge = k.current;
			return () => {
				if (ke.current) {
					ke.current = !1;
					return;
				}
				Te(ge);
			};
		}, [ae, I, Te]));
	const Ue = Nt(m);
	((0, _.useEffect)(
		() =>
			!X || !le
				? void 0
				: Rn(
						"keydown",
						(Ce) => {
							if (Ce.key !== "Escape" || Ce.defaultPrevented) return;
							const tt = k.current;
							if (!tt || Dm(tt)) return;
							const $e = Ce.target;
							if (!$e) return;
							const { disclosureElement: Bt } = O.getState();
							!!($e.tagName === "BODY" || mn(tt, $e) || !Bt || mn(Bt, $e)) && Ue(Ce) && O.hide();
						},
						!0,
					),
		[O, X, le, Ue],
	),
		(z = Cn(z, (ge) => (0, w.jsx)(JM, { level: o ? 1 : void 0, children: ge }), [o])));
	const Ye = z.hidden,
		St = z.alwaysVisible;
	z = Cn(
		z,
		(ge) =>
			h
				? (0, w.jsxs)(w.Fragment, {
						children: [(0, w.jsx)(wO, { store: O, backdrop: h, hidden: Ye, alwaysVisible: St }), ge],
					})
				: ge,
		[O, h, Ye, St],
	);
	const [At, vn] = (0, _.useState)(),
		[en, Ge] = (0, _.useState)();
	return (
		(z = Cn(
			z,
			(ge) =>
				(0, w.jsx)(Em, {
					value: O,
					children: (0, w.jsx)(uM.Provider, {
						value: vn,
						children: (0, w.jsx)(lM.Provider, { value: Ge, children: ge }),
					}),
				}),
			[O],
		)),
		(z = {
			id: J,
			"data-dialog": "",
			role: "dialog",
			tabIndex: s ? -1 : void 0,
			"aria-labelledby": At,
			"aria-describedby": en,
			...z,
			ref: Wt(k, z.ref),
		}),
		(z = B_({ ...z, autoFocusOnShow: Ze })),
		(z = Mm({ store: O, ...z })),
		(z = ws({ ...z, focusable: s })),
		(z = $_({ portal: f, ...z, portalRef: Y, preserveTabOrder: V })),
		z
	);
});
function Cs(e, t = Uc) {
	return Ke(function (u) {
		const s = t();
		return dn(u.store || s, (o) => !u.unmountOnHide || o?.mounted || !!u.open) ? (0, w.jsx)(e, { ...u }) : null;
	});
}
var WD = Cs(
		Ke(function (t) {
			return Xe(TO, F_(t));
		}),
		Uc,
	),
	va = Math.min,
	ki = Math.max,
	wc = Math.round,
	Jo = Math.floor,
	Ni = (e) => ({ x: e, y: e }),
	AO = { left: "right", right: "left", bottom: "top", top: "bottom" };
function X_(e, t, i) {
	return ki(e, va(t, i));
}
function ga(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function ya(e) {
	return e.split("-")[0];
}
function il(e) {
	return e.split("-")[1];
}
function jm(e) {
	return e === "x" ? "y" : "x";
}
function Im(e) {
	return e === "y" ? "height" : "width";
}
function ni(e) {
	const t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Lm(e) {
	return jm(ni(e));
}
function RO(e, t, i) {
	i === void 0 && (i = !1);
	const u = il(e),
		s = Lm(e),
		o = Im(s);
	let f = s === "x" ? (u === (i ? "end" : "start") ? "right" : "left") : u === "start" ? "bottom" : "top";
	return (t.reference[o] > t.floating[o] && (f = Ec(f)), [f, Ec(f)]);
}
function CO(e) {
	const t = Ec(e);
	return [Qh(e), t, Qh(t)];
}
function Qh(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var L0 = ["left", "right"],
	q0 = ["right", "left"],
	kO = ["top", "bottom"],
	NO = ["bottom", "top"];
function MO(e, t, i) {
	switch (e) {
		case "top":
		case "bottom":
			return i ? (t ? q0 : L0) : t ? L0 : q0;
		case "left":
		case "right":
			return t ? kO : NO;
		default:
			return [];
	}
}
function OO(e, t, i, u) {
	const s = il(e);
	let o = MO(ya(e), i === "start", u);
	return (s && ((o = o.map((f) => f + "-" + s)), t && (o = o.concat(o.map(Qh)))), o);
}
function Ec(e) {
	const t = ya(e);
	return AO[t] + e.slice(t.length);
}
function zO(e) {
	var t, i, u, s;
	return {
		top: (t = e.top) != null ? t : 0,
		right: (i = e.right) != null ? i : 0,
		bottom: (u = e.bottom) != null ? u : 0,
		left: (s = e.left) != null ? s : 0,
	};
}
function J_(e) {
	return typeof e != "number" ? zO(e) : { top: e, right: e, bottom: e, left: e };
}
function Tc(e) {
	const { x: t, y: i, width: u, height: s } = e;
	return { width: u, height: s, top: i, left: t, right: t + u, bottom: i + s, x: t, y: i };
}
function U0(e, t, i) {
	let { reference: u, floating: s } = e;
	const o = ni(t),
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
	const E = il(t);
	return (E && (p[f] += b * (E === "end" ? 1 : -1) * (i && v ? -1 : 1)), p);
}
async function DO(e, t) {
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
		E = J_(p),
		A = h[b ? (S === "floating" ? "reference" : "floating") : S],
		M = Tc(
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
		z = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(h.floating)),
		C = ((await (o.isElement == null ? void 0 : o.isElement(z))) &&
			(await (o.getScale == null ? void 0 : o.getScale(z)))) || { x: 1, y: 1 },
		k = Tc(
			o.convertOffsetParentRelativeRectToViewportRelativeRect
				? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
						elements: h,
						rect: q,
						offsetParent: z,
						strategy: m,
					})
				: q,
		);
	return {
		top: (M.top - k.top + E.top) / C.y,
		bottom: (k.bottom - M.bottom + E.bottom) / C.y,
		left: (M.left - k.left + E.left) / C.x,
		right: (k.right - M.right + E.right) / C.x,
	};
}
var jO = 50,
	IO = async (e, t, i) => {
		const { placement: u = "bottom", strategy: s = "absolute", middleware: o = [], platform: f } = i,
			h = f.detectOverflow ? f : { ...f, detectOverflow: DO },
			m = await (f.isRTL == null ? void 0 : f.isRTL(t));
		let v = await f.getElementRects({ reference: e, floating: t, strategy: s }),
			{ x: g, y: S } = U0(v, u, m),
			b = u,
			p = 0;
		const E = {};
		for (let A = 0; A < o.length; A++) {
			const M = o[A];
			if (!M) continue;
			const { name: q, fn: z } = M,
				{
					x: C,
					y: k,
					data: O,
					reset: Y,
				} = await z({
					x: g,
					y: S,
					initialPlacement: u,
					placement: b,
					strategy: s,
					middlewareData: E,
					rects: v,
					platform: h,
					elements: { reference: e, floating: t },
				});
			((g = C ?? g),
				(S = k ?? S),
				(E[q] = { ...E[q], ...O }),
				Y &&
					p < jO &&
					(p++,
					typeof Y == "object" &&
						(Y.placement && (b = Y.placement),
						Y.rects &&
							(v = Y.rects === !0 ? await f.getElementRects({ reference: e, floating: t, strategy: s }) : Y.rects),
						({ x: g, y: S } = U0(v, b, m))),
					(A = -1)));
		}
		return { x: g, y: S, placement: b, strategy: s, middlewareData: E };
	},
	LO = (e) => ({
		name: "arrow",
		options: e,
		async fn(t) {
			const { x: i, y: u, placement: s, rects: o, platform: f, elements: h, middlewareData: m } = t,
				{ element: v, padding: g = 0 } = ga(e, t) || {};
			if (v == null) return {};
			const S = J_(g),
				b = { x: i, y: u },
				p = Lm(s),
				E = Im(p),
				A = await f.getDimensions(v),
				M = p === "y",
				q = M ? "top" : "left",
				z = M ? "bottom" : "right",
				C = M ? "clientHeight" : "clientWidth",
				k = o.reference[E] + o.reference[p] - b[p] - o.floating[E],
				O = b[p] - o.reference[p],
				Y = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(v));
			let X = Y ? Y[C] : 0;
			(!X || !(await (f.isElement == null ? void 0 : f.isElement(Y)))) && (X = h.floating[C] || o.floating[E]);
			const D = k / 2 - O / 2,
				V = X / 2 - A[E] / 2 - 1,
				J = va(S[q], V),
				W = va(S[z], V),
				le = X - A[E] - W,
				oe = X / 2 - A[E] / 2 + D,
				te = X_(J, oe, le),
				fe = !m.arrow && il(s) != null && oe !== te && o.reference[E] / 2 - (oe < J ? J : W) - A[E] / 2 < 0,
				L = fe ? (oe < J ? oe - J : oe - le) : 0;
			return {
				[p]: b[p] + L,
				data: { [p]: te, centerOffset: oe - te - L, ...(fe && { alignmentOffset: L }) },
				reset: fe,
			};
		},
	}),
	qO = function (e) {
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
							fallbackAxisSideDirection: E = "none",
							flipAlignment: A = !0,
							...M
						} = ga(e, t);
					if ((i = o.arrow) != null && i.alignmentOffset) return {};
					const q = ya(s),
						z = ni(h),
						C = ya(h) === h,
						k = await (m.isRTL == null ? void 0 : m.isRTL(v.floating)),
						O = b || (C || !A ? [Ec(h)] : CO(h)),
						Y = E !== "none";
					!b && Y && O.push(...OO(h, A, E, k));
					const X = [h, ...O],
						D = await m.detectOverflow(t, M),
						V = [];
					let J = ((u = o.flip) == null ? void 0 : u.overflows) || [];
					if ((g && V.push(D[q]), S)) {
						const te = RO(s, f, k);
						V.push(D[te[0]], D[te[1]]);
					}
					if (((J = [...J, { placement: s, overflows: V }]), !V.every((te) => te <= 0))) {
						var W, le;
						const te = (((W = o.flip) == null ? void 0 : W.index) || 0) + 1,
							fe = X[te];
						if (
							fe &&
							(!(S === "alignment" && z !== ni(fe)) ||
								J.every(($) => (ni($.placement) === z ? $.overflows[0] > 0 : !0)))
						)
							return { data: { index: te, overflows: J }, reset: { placement: fe } };
						let L =
							(le = J.filter(($) => $.overflows[0] <= 0).sort(($, H) => $.overflows[1] - H.overflows[1])[0]) == null
								? void 0
								: le.placement;
						if (!L)
							switch (p) {
								case "bestFit": {
									var oe;
									const $ =
										(oe = J.filter((H) => {
											if (Y) {
												const ve = ni(H.placement);
												return ve === z || ve === "y";
											}
											return !0;
										})
											.map((H) => [H.placement, H.overflows.filter((ve) => ve > 0).reduce((ve, pe) => ve + pe, 0)])
											.sort((H, ve) => H[1] - ve[1])[0]) == null
											? void 0
											: oe[0];
									$ && (L = $);
									break;
								}
								case "initialPlacement":
									L = h;
									break;
							}
						if (s !== L) return { reset: { placement: L } };
					}
					return {};
				},
			}
		);
	},
	W_ = new Set(["left", "top"]);
async function UO(e, t) {
	const { placement: i, platform: u, elements: s } = e,
		o = await (u.isRTL == null ? void 0 : u.isRTL(s.floating)),
		f = ya(i),
		h = il(i),
		m = ni(i) === "y",
		v = W_.has(f) ? -1 : 1,
		g = o && m ? -1 : 1,
		S = ga(t, e);
	let {
		mainAxis: b,
		crossAxis: p,
		alignmentAxis: E,
	} = typeof S == "number"
		? { mainAxis: S, crossAxis: 0, alignmentAxis: null }
		: { mainAxis: S.mainAxis || 0, crossAxis: S.crossAxis || 0, alignmentAxis: S.alignmentAxis };
	return (
		h && typeof E == "number" && (p = h === "end" ? E * -1 : E),
		m ? { x: p * g, y: b * v } : { x: b * v, y: p * g }
	);
}
var $O = function (e) {
		return (
			e === void 0 && (e = 0),
			{
				name: "offset",
				options: e,
				async fn(t) {
					var i, u;
					const { x: s, y: o, placement: f, middlewareData: h } = t,
						m = await UO(t, e);
					return f === ((i = h.offset) == null ? void 0 : i.placement) && (u = h.arrow) != null && u.alignmentOffset
						? {}
						: { x: s + m.x, y: o + m.y, data: { ...m, placement: f } };
				},
			}
		);
	},
	BO = function (e) {
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
								fn: (z) => {
									let { x: C, y: k } = z;
									return { x: C, y: k };
								},
							},
							...v
						} = ga(e, t),
						g = { x: i, y: u },
						S = await o.detectOverflow(t, v),
						b = ni(s),
						p = jm(b);
					let E = g[p],
						A = g[b];
					const M = (z, C) => X_(C + S[z === "y" ? "top" : "left"], C, C - S[z === "y" ? "bottom" : "right"]);
					(f && (E = M(p, E)), h && (A = M(b, A)));
					const q = m.fn({ ...t, [p]: E, [b]: A });
					return { ...q, data: { x: q.x - i, y: q.y - u, enabled: { [p]: f, [b]: h } } };
				},
			}
		);
	},
	VO = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				options: e,
				fn(t) {
					var i, u;
					const { x: s, y: o, placement: f, rects: h, middlewareData: m } = t,
						{ offset: v = 0, mainAxis: g = !0, crossAxis: S = !0 } = ga(e, t),
						b = { x: s, y: o },
						p = ni(f),
						E = jm(p);
					let A = b[E],
						M = b[p];
					const q = ga(v, t),
						z =
							typeof q == "number"
								? { mainAxis: q, crossAxis: 0 }
								: { mainAxis: (i = q.mainAxis) != null ? i : 0, crossAxis: (u = q.crossAxis) != null ? u : 0 };
					if (g) {
						const O = E === "y" ? "height" : "width",
							Y = h.reference[E] - h.floating[O] + z.mainAxis,
							X = h.reference[E] + h.reference[O] - z.mainAxis;
						A < Y ? (A = Y) : A > X && (A = X);
					}
					if (S) {
						var C, k;
						const O = E === "y" ? "width" : "height",
							Y = W_.has(ya(f)),
							X =
								h.reference[p] -
								h.floating[O] +
								((Y && ((C = m.offset) == null ? void 0 : C[p])) || 0) +
								(Y ? 0 : z.crossAxis),
							D =
								h.reference[p] +
								h.reference[O] +
								(Y ? 0 : ((k = m.offset) == null ? void 0 : k[p]) || 0) -
								(Y ? z.crossAxis : 0);
						M < X ? (M = X) : M > D && (M = D);
					}
					return { [E]: A, [p]: M };
				},
			}
		);
	},
	ZO = function (e) {
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
						g = il(i),
						S = ni(i) === "y",
						{ width: b, height: p } = u.floating;
					let E, A;
					v === "top" || v === "bottom"
						? ((E = v),
							(A =
								g === ((await (s.isRTL == null ? void 0 : s.isRTL(o.floating))) ? "start" : "end") ? "left" : "right"))
						: ((A = v), (E = g === "end" ? "top" : "bottom"));
					const M = p - m.top - m.bottom,
						q = b - m.left - m.right,
						z = va(p - m[E], M),
						C = va(b - m[A], q),
						k = t.middlewareData.shift,
						O = !k;
					let Y = z,
						X = C;
					(k != null && k.enabled.x && (X = q),
						k != null && k.enabled.y && (Y = M),
						O && !g && (S ? (X = b - 2 * ki(m.left, m.right)) : (Y = p - 2 * ki(m.top, m.bottom))),
						await f({ ...t, availableWidth: X, availableHeight: Y }));
					const D = await s.getDimensions(o.floating);
					return b !== D.width || p !== D.height ? { reset: { rects: !0 } } : {};
				},
			}
		);
	};
function Qc() {
	return typeof window < "u";
}
function al(e) {
	return eS(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function nr(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ii(e) {
	var t;
	return (t = (eS(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function eS(e) {
	return Qc() ? e instanceof Node || e instanceof nr(e).Node : !1;
}
function ri(e) {
	return Qc() ? e instanceof Element || e instanceof nr(e).Element : !1;
}
function _a(e) {
	return Qc() ? e instanceof HTMLElement || e instanceof nr(e).HTMLElement : !1;
}
function $0(e) {
	return !Qc() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof nr(e).ShadowRoot;
}
function Kc(e) {
	const { overflow: t, overflowX: i, overflowY: u, display: s } = ii(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + u + i) && s !== "inline" && s !== "contents";
}
function HO(e) {
	return /^(table|td|th)$/.test(al(e));
}
function Yc(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var PO = /transform|translate|scale|rotate|perspective|filter/,
	QO = /paint|layout|strict|content/,
	Ha = (e) => !!e && e !== "none",
	dh;
function qm(e) {
	const t = ri(e) ? ii(e) : e;
	return (
		Ha(t.transform) ||
		Ha(t.translate) ||
		Ha(t.scale) ||
		Ha(t.rotate) ||
		Ha(t.perspective) ||
		(!Um() && (Ha(t.backdropFilter) || Ha(t.filter))) ||
		PO.test(t.willChange || "") ||
		QO.test(t.contain || "")
	);
}
function KO(e) {
	let t = eu(e);
	for (; _a(t) && !ms(t); ) {
		if (qm(t)) return t;
		if (Yc(t)) return null;
		t = eu(t);
	}
	return null;
}
function Um() {
	return (dh == null && (dh = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), dh);
}
function ms(e) {
	return /^(html|body|#document)$/.test(al(e));
}
function ii(e) {
	return nr(e).getComputedStyle(e);
}
function Gc(e) {
	return ri(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function eu(e) {
	if (al(e) === "html") return e;
	const t = e.assignedSlot || e.parentNode || ($0(e) && e.host) || Ii(e);
	return $0(t) ? t.host : t;
}
function tS(e) {
	const t = eu(e);
	return ms(t) ? (e.ownerDocument || e).body : _a(t) && Kc(t) ? t : tS(t);
}
function vs(e, t, i) {
	var u;
	(t === void 0 && (t = []), i === void 0 && (i = !0));
	const s = tS(e),
		o = s === ((u = e.ownerDocument) == null ? void 0 : u.body),
		f = nr(s);
	if (o) {
		const h = Kh(f);
		return t.concat(f, f.visualViewport || [], Kc(s) ? s : [], h && i ? vs(h) : []);
	} else return t.concat(s, vs(s, [], i));
}
function Kh(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function nS(e) {
	const t = ii(e);
	let i = parseFloat(t.width) || 0,
		u = parseFloat(t.height) || 0;
	const s = _a(e),
		o = s ? e.offsetWidth : i,
		f = s ? e.offsetHeight : u,
		h = wc(i) !== o || wc(u) !== f;
	return (h && ((i = o), (u = f)), { width: i, height: u, $: h });
}
function $m(e) {
	return ri(e) ? e : e.contextElement;
}
function Yu(e) {
	const t = $m(e);
	if (!_a(t)) return Ni(1);
	const i = t.getBoundingClientRect(),
		{ width: u, height: s, $: o } = nS(t);
	let f = (o ? wc(i.width) : i.width) / u,
		h = (o ? wc(i.height) : i.height) / s;
	return ((!f || !Number.isFinite(f)) && (f = 1), (!h || !Number.isFinite(h)) && (h = 1), { x: f, y: h });
}
var YO = Ni(0);
function rS(e) {
	const t = nr(e);
	return !Um() || !t.visualViewport ? YO : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function GO(e, t, i) {
	return (t === void 0 && (t = !1), !!i && t && i === nr(e));
}
function tu(e, t, i, u) {
	(t === void 0 && (t = !1), i === void 0 && (i = !1));
	const s = e.getBoundingClientRect(),
		o = $m(e);
	let f = Ni(1);
	t && (u ? ri(u) && (f = Yu(u)) : (f = Yu(e)));
	const h = GO(o, i, u) ? rS(o) : Ni(0);
	let m = (s.left + h.x) / f.x,
		v = (s.top + h.y) / f.y,
		g = s.width / f.x,
		S = s.height / f.y;
	if (o && u) {
		const b = nr(o),
			p = ri(u) ? nr(u) : u;
		let E = b,
			A = Kh(E);
		for (; A && p !== E; ) {
			const M = Yu(A),
				q = A.getBoundingClientRect(),
				z = ii(A),
				C = q.left + (A.clientLeft + parseFloat(z.paddingLeft)) * M.x,
				k = q.top + (A.clientTop + parseFloat(z.paddingTop)) * M.y;
			((m *= M.x), (v *= M.y), (g *= M.x), (S *= M.y), (m += C), (v += k), (E = nr(A)), (A = Kh(E)));
		}
	}
	return Tc({ width: g, height: S, x: m, y: v });
}
function Fc(e, t) {
	const i = Gc(e).scrollLeft;
	return t ? t.left + i : tu(Ii(e)).left + i;
}
function iS(e, t) {
	const i = e.getBoundingClientRect();
	return { x: i.left + t.scrollLeft - Fc(e, i), y: i.top + t.scrollTop };
}
function FO(e) {
	let { elements: t, rect: i, offsetParent: u, strategy: s } = e;
	const o = s === "fixed",
		f = Ii(u),
		h = t ? Yc(t.floating) : !1;
	if (u === f || (h && o)) return i;
	let m = { scrollLeft: 0, scrollTop: 0 },
		v = Ni(1);
	const g = Ni(0),
		S = _a(u);
	if ((S || !o) && ((al(u) !== "body" || Kc(f)) && (m = Gc(u)), S)) {
		const p = tu(u);
		((v = Yu(u)), (g.x = p.x + u.clientLeft), (g.y = p.y + u.clientTop));
	}
	const b = f && !S && !o ? iS(f, m) : Ni(0);
	return {
		width: i.width * v.x,
		height: i.height * v.y,
		x: i.x * v.x - m.scrollLeft * v.x + g.x + b.x,
		y: i.y * v.y - m.scrollTop * v.y + g.y + b.y,
	};
}
function XO(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function JO(e) {
	const t = Gc(e),
		i = e.ownerDocument.body,
		u = ki(e.scrollWidth, e.clientWidth, i.scrollWidth, i.clientWidth),
		s = ki(e.scrollHeight, e.clientHeight, i.scrollHeight, i.clientHeight);
	let o = -t.scrollLeft + Fc(e);
	const f = -t.scrollTop;
	return (
		ii(i).direction === "rtl" && (o += ki(e.clientWidth, i.clientWidth) - u),
		{ width: u, height: s, x: o, y: f }
	);
}
var WO = 25;
function e2(e, t, i) {
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
	if (Fc(o) <= 0) {
		const S = o.ownerDocument,
			b = S.body,
			p = getComputedStyle(b),
			E = (S.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight)) || 0,
			A = Math.abs(o.clientWidth - b.clientWidth - E),
			M = getComputedStyle(o).scrollbarGutter === "stable both-edges" ? A / 2 : A;
		M <= WO && (h -= M);
	}
	return { width: h, height: m, x: v, y: g };
}
function t2(e, t) {
	const i = tu(e, !0, t === "fixed"),
		u = i.top + e.clientTop,
		s = i.left + e.clientLeft,
		o = Yu(e);
	return { width: e.clientWidth * o.x, height: e.clientHeight * o.y, x: s * o.x, y: u * o.y };
}
function B0(e, t, i) {
	let u;
	if (t === "viewport" || t === "layoutViewport") u = e2(e, i, t);
	else if (t === "document") u = JO(Ii(e));
	else if (ri(t)) u = t2(t, i);
	else {
		const s = rS(e);
		u = { x: t.x - s.x, y: t.y - s.y, width: t.width, height: t.height };
	}
	return Tc(u);
}
function n2(e, t) {
	const i = t.get(e);
	if (i) return i;
	let u = vs(e, [], !1).filter((h) => ri(h) && al(h) !== "body"),
		s = null;
	const o = ii(e).position === "fixed";
	let f = o ? eu(e) : e;
	for (; ri(f) && !ms(f); ) {
		const h = ii(f),
			m = qm(f),
			v = s ? s.position : o ? "fixed" : "";
		(!m && (v === "fixed" || (v === "absolute" && h.position === "static")) ? (u = u.filter((g) => g !== f)) : (s = h),
			(f = eu(f)));
	}
	return (t.set(e, u), u);
}
function r2(e) {
	let { element: t, boundary: i, rootBoundary: u, strategy: s } = e;
	const o = [...(i === "clippingAncestors" ? (Yc(t) ? [] : n2(t, this._c)) : [].concat(i)), u],
		f = B0(t, o[0], s);
	let h = f.top,
		m = f.right,
		v = f.bottom,
		g = f.left;
	for (let S = 1; S < o.length; S++) {
		const b = B0(t, o[S], s);
		((h = ki(b.top, h)), (m = va(b.right, m)), (v = va(b.bottom, v)), (g = ki(b.left, g)));
	}
	return { width: m - g, height: v - h, x: g, y: h };
}
function i2(e) {
	const { width: t, height: i } = nS(e);
	return { width: t, height: i };
}
function a2(e, t, i) {
	const u = _a(t),
		s = Ii(t),
		o = i === "fixed",
		f = tu(e, !0, o, t);
	let h = { scrollLeft: 0, scrollTop: 0 };
	const m = Ni(0);
	if ((u || !o) && ((al(t) !== "body" || Kc(s)) && (h = Gc(t)), u)) {
		const g = tu(t, !0, o, t);
		((m.x = g.x + t.clientLeft), (m.y = g.y + t.clientTop));
	}
	!u && s && (m.x = Fc(s));
	const v = s && !u && !o ? iS(s, h) : Ni(0);
	return { x: f.left + h.scrollLeft - m.x - v.x, y: f.top + h.scrollTop - m.y - v.y, width: f.width, height: f.height };
}
function hh(e) {
	return ii(e).position === "static";
}
function V0(e, t) {
	if (!_a(e) || ii(e).position === "fixed") return null;
	if (t) return t(e);
	let i = e.offsetParent;
	return (Ii(e) === i && (i = i.ownerDocument.body), i);
}
function aS(e, t) {
	const i = nr(e);
	if (Yc(e)) return i;
	if (!_a(e)) {
		let s = eu(e);
		for (; s && !ms(s); ) {
			if (ri(s) && !hh(s)) return s;
			s = eu(s);
		}
		return i;
	}
	let u = V0(e, t);
	for (; u && HO(u) && hh(u); ) u = V0(u, t);
	return u && ms(u) && hh(u) && !qm(u) ? i : u || KO(e) || i;
}
var u2 = async function (e) {
	const t = this.getOffsetParent || aS,
		i = this.getDimensions,
		u = await i(e.floating);
	return {
		reference: a2(e.reference, await t(e.floating), e.strategy),
		floating: { x: 0, y: 0, width: u.width, height: u.height },
	};
};
function l2(e) {
	return ii(e).direction === "rtl";
}
var s2 = {
	convertOffsetParentRelativeRectToViewportRelativeRect: FO,
	getDocumentElement: Ii,
	getClippingRect: r2,
	getOffsetParent: aS,
	getElementRects: u2,
	getClientRects: XO,
	getDimensions: i2,
	getScale: Yu,
	isElement: ri,
	isRTL: l2,
};
function uS(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function o2(e, t, i) {
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
			{ left: p, top: E, width: A, height: M } = b;
		if ((g || t(), !A || !M)) return;
		const q = Jo(E),
			z = Jo(o.clientWidth - (p + A)),
			C = Jo(o.clientHeight - (E + M)),
			k = Jo(p),
			O = { rootMargin: -q + "px " + -z + "px " + -C + "px " + -k + "px", threshold: ki(0, va(1, S)) || 1 };
		let Y = !0;
		function X(D) {
			const V = D[0].intersectionRatio;
			if (!uS(b, e.getBoundingClientRect())) return h();
			if (V !== S) {
				if (!Y) return h();
				V
					? h(!1, V)
					: (s = setTimeout(() => {
							h(!1, 1e-7);
						}, 1e3));
			}
			Y = !1;
		}
		try {
			u = new IntersectionObserver(X, { ...O, root: o.ownerDocument });
		} catch {
			u = new IntersectionObserver(X, O);
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
function c2(e, t, i, u) {
	u === void 0 && (u = {});
	const {
			ancestorScroll: s = !0,
			ancestorResize: o = !0,
			elementResize: f = typeof ResizeObserver == "function",
			layoutShift: h = typeof IntersectionObserver == "function",
			animationFrame: m = !1,
		} = u,
		v = $m(e),
		g = s || o ? [...(v ? vs(v) : []), ...(t ? vs(t) : [])] : [];
	g.forEach((q) => {
		(s && q.addEventListener("scroll", i), o && q.addEventListener("resize", i));
	});
	const S = v && h ? o2(v, i, o) : null;
	let b = -1,
		p = null;
	f &&
		((p = new ResizeObserver((q) => {
			let [z] = q;
			(z &&
				z.target === v &&
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
	let E,
		A = m ? tu(e) : null;
	m && M();
	function M() {
		const q = tu(e);
		(A && !uS(A, q) && i(), (A = q), (E = requestAnimationFrame(M)));
	}
	return (
		i(),
		() => {
			var q;
			(g.forEach((z) => {
				(s && z.removeEventListener("scroll", i), o && z.removeEventListener("resize", i));
			}),
				S?.(),
				(q = p) == null || q.disconnect(),
				(p = null),
				m && cancelAnimationFrame(E));
		}
	);
}
var f2 = $O,
	d2 = BO,
	h2 = qO,
	m2 = ZO,
	v2 = LO,
	g2 = VO,
	y2 = (e, t, i) => {
		const u = new Map(),
			s = i ?? {},
			o = { ...s2, ...s.platform, _c: u };
		return IO(e, t, { ...s, platform: o });
	},
	p2 = "div";
function Z0(e = 0, t = 0, i = 0, u = 0) {
	if (typeof DOMRect == "function") return new DOMRect(e, t, i, u);
	const s = { x: e, y: t, width: i, height: u, top: t, right: e + i, bottom: t + u, left: e };
	return { ...s, toJSON: () => s };
}
function b2(e) {
	if (!e) return Z0();
	const { x: t, y: i, width: u, height: s } = e;
	return Z0(t, i, u, s);
}
function _2(e, t) {
	return {
		contextElement: e || void 0,
		getBoundingClientRect: () => {
			const i = e,
				u = t?.(i);
			return u || !i ? b2(u) : i.getBoundingClientRect();
		},
	};
}
function S2(e) {
	return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e);
}
function H0(e) {
	const t = window.devicePixelRatio || 1;
	return Math.round(e * t) / t;
}
function w2(e, t) {
	return f2(({ placement: i }) => {
		var u;
		const s = (e?.clientHeight || 0) / 2,
			o = typeof t.gutter == "number" ? t.gutter + s : (u = t.gutter) != null ? u : s;
		return { crossAxis: i.split("-")[1] ? void 0 : t.shift, mainAxis: o, alignmentAxis: t.shift };
	});
}
function E2(e) {
	if (e.flip === !1) return;
	const t = typeof e.flip == "string" ? e.flip.split(" ") : void 0;
	return (Jt(!t || t.every(S2), !1), h2({ padding: e.overflowPadding, fallbackPlacements: t }));
}
function T2(e) {
	if (!(!e.slide && !e.overlap))
		return d2({ mainAxis: e.slide, crossAxis: e.overlap, padding: e.overflowPadding, limiter: g2() });
}
function x2(e) {
	return m2({
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
function A2(e, t) {
	if (e) return v2({ element: e, padding: t.arrowPadding });
}
var Bm = et(function ({
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
		gutter: E,
		arrowPadding: A = 4,
		overflowPadding: M = 8,
		getAnchorRect: q,
		updatePosition: z,
		...C
	}) {
		const k = $c();
		((t = t || k), Jt(t, !1));
		const O = t.useState("arrowElement"),
			Y = t.useState("anchorElement"),
			X = t.useState("disclosureElement"),
			D = t.useState("popoverElement"),
			V = t.useState("contentElement"),
			J = t.useState("placement"),
			W = t.useState("mounted"),
			le = t.useState("rendered"),
			oe = (0, _.useRef)(null),
			[te, fe] = (0, _.useState)(!1),
			{ portalRef: L, domReady: $ } = gm(u, C.portalRef),
			H = De(q),
			ve = De(z),
			pe = !!z;
		(st(() => {
			if (!D?.isConnected) return;
			D.style.setProperty("--popover-overflow-padding", `${M}px`);
			const N = _2(Y, H),
				I = async () => {
					if (!W) return;
					O || (oe.current = oe.current || document.createElement("div"));
					const be = O || oe.current,
						Te = [
							w2(be, { gutter: E, shift: v }),
							E2({ flip: m, overflowPadding: M }),
							T2({ slide: g, shift: v, overlap: S, overflowPadding: M }),
							A2(be, { arrowPadding: A }),
							x2({ sameWidth: b, fitViewport: p, overflowPadding: M }),
						],
						ke = await y2(N, D, { placement: J, strategy: h ? "fixed" : "absolute", middleware: Te });
					(t?.setState("currentPlacement", ke.placement), fe(!0));
					const Ue = H0(ke.x),
						Ye = H0(ke.y);
					if (
						(Object.assign(D.style, { top: "0", left: "0", transform: `translate3d(${Ue}px,${Ye}px,0)` }),
						be && ke.middlewareData.arrow)
					) {
						const { x: St, y: At } = ke.middlewareData.arrow,
							vn = ke.placement.split("-")[0],
							en = be.clientWidth / 2,
							Ge = be.clientHeight / 2,
							ge = St != null ? St + en : -en,
							Ce = At != null ? At + Ge : -Ge;
						(D.style.setProperty(
							"--popover-transform-origin",
							{
								top: `${ge}px calc(100% + ${Ge}px)`,
								bottom: `${ge}px ${-Ge}px`,
								left: `calc(100% + ${en}px) ${Ce}px`,
								right: `${-en}px ${Ce}px`,
							}[vn],
						),
							Object.assign(be.style, {
								left: St != null ? `${St}px` : "",
								top: At != null ? `${At}px` : "",
								[vn]: "100%",
							}));
					}
				},
				ae = c2(
					N,
					D,
					async () => {
						pe ? (await ve({ updatePosition: I }), fe(!0)) : await I();
					},
					{ elementResize: typeof ResizeObserver == "function" },
				);
			return () => {
				(fe(!1), ae());
			};
		}, [t, le, D, O, Y, D, J, W, $, h, m, v, g, S, b, p, E, A, M, H, pe, ve]),
			st(() => {
				if (!W || !$ || !D?.isConnected || !V?.isConnected) return;
				const N = () => {
					D.style.zIndex = getComputedStyle(V).zIndex;
				};
				N();
				let I = requestAnimationFrame(() => {
					I = requestAnimationFrame(N);
				});
				return () => cancelAnimationFrame(I);
			}, [W, $, D, V]));
		const Ze = h ? "fixed" : "absolute";
		return (
			(C = Cn(
				C,
				(N) =>
					(0, w.jsx)("div", {
						...f,
						style: { position: Ze, top: 0, left: 0, width: "max-content", ...f?.style },
						ref: t?.setPopoverElement,
						children: N,
					}),
				[t, Ze, f],
			)),
			(C = Cn(C, (N) => (0, w.jsx)(Bc, { value: t, children: N }), [t])),
			(C = { "data-placing": !te || void 0, ...C, style: { position: "relative", ...C.style } }),
			(C = F_({
				store: t,
				modal: i,
				portal: u,
				preserveTabOrder: s,
				preserveTabOrderAnchor: X || Y,
				autoFocusOnShow: te && o,
				...C,
				portalRef: L,
			})),
			C
		);
	}),
	ej = Cs(
		Ke(function (t) {
			return Xe(p2, Bm(t));
		}),
		$c,
	),
	R2 = "div";
function C2(e, ...t) {
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
var k2 = et(function ({
		store: t,
		modal: i,
		tabIndex: u,
		alwaysVisible: s,
		autoFocusOnHide: o = !0,
		hideOnInteractOutside: f = !0,
		...h
	}) {
		const m = Vc();
		((t = t || m), Jt(t, !1));
		const v = t.useState("baseElement"),
			g = (0, _.useRef)(!1),
			S = dn(t.tag, (b) => b?.renderedItems.length);
		return (
			(h = q_({ store: t, alwaysVisible: s, ...h })),
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
					const { contentElement: E, baseElement: A } = t.getState();
					if (!A) return p;
					const M = xt(A),
						q = [];
					if ((E?.id && q.push(`[aria-controls~="${E.id}"]`), A?.id && q.push(`[aria-controls~="${A.id}"]`), !q.length))
						return [...p, A];
					const z = q.join(","),
						C = M.querySelectorAll(z);
					return [...p, ...C];
				},
				autoFocusOnHide(b) {
					return Oc(o, b) ? !1 : g.current ? ((g.current = !1), !1) : !0;
				},
				hideOnInteractOutside(b) {
					var p, E;
					const A = t?.getState(),
						M = (p = A?.contentElement) == null ? void 0 : p.id,
						q = (E = A?.baseElement) == null ? void 0 : E.id;
					if (C2(b.target, M, q)) return !1;
					const z = typeof f == "function" ? f(b) : f;
					return (z && (g.current = b.type === "click"), z);
				},
			})),
			h
		);
	}),
	N2 = Cs(
		Ke(function (t) {
			return Xe(R2, k2(t));
		}),
		Vc,
	),
	tj = (0, _.createContext)(null),
	nj = (0, _.createContext)(null),
	ks = ui([Ss], [Ic]),
	M2 = ks.useContext,
	rj = ks.useScopedContext,
	ij = ks.useProviderContext,
	aj = ks.ContextProvider,
	uj = ks.ScopedContextProvider;
function lS({ popover: e, ...t } = {}) {
	const i = Zc(
		t.store,
		Rm(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
	);
	const u = i?.getState(),
		s = Y_({ ...t, store: i }),
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
function sS(e, t, i) {
	return (rl(t, [i.popover]), Xt(e, i, "placement"), G_(e, t, i));
}
function O2(e) {
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
function z2(e) {
	return e?.__unstablePrivateStore;
}
function D2(e = {}) {
	var t;
	e.store;
	const i = (t = e.store) == null ? void 0 : t.getState(),
		u = Ie(e.items, i?.items, e.defaultItems, []),
		s = new Map(u.map((b) => [b.id, b])),
		o = { items: u, renderedItems: Ie(i?.renderedItems, []) },
		f = z2(e.store),
		h = Kr({ items: u, renderedItems: o.renderedItems }, f),
		m = Kr(o, e.store),
		v = (b) => {
			const p = o_(b, (E) => E.element);
			(h.setState("renderedItems", p), m.setState("renderedItems", p));
		};
	(Hn(m, () => xm(h)),
		Hn(h, () =>
			bc(h, ["items"], (b) => {
				m.setState("items", b.items);
			}),
		),
		Hn(h, () =>
			bc(h, ["renderedItems"], (b) => {
				let p = !0,
					E = requestAnimationFrame(() => {
						const { renderedItems: z } = m.getState();
						b.renderedItems !== z && v(b.renderedItems);
					});
				if (typeof IntersectionObserver != "function") return () => cancelAnimationFrame(E);
				const A = () => {
						if (p) {
							p = !1;
							return;
						}
						(cancelAnimationFrame(E), (E = requestAnimationFrame(() => v(b.renderedItems))));
					},
					M = O2(b.renderedItems),
					q = new IntersectionObserver(A, { root: M });
				for (const z of b.renderedItems) z.element && q.observe(z.element);
				return () => {
					(cancelAnimationFrame(E), q.disconnect());
				};
			}),
		));
	const g = (b, p, E = !1) => {
			let A;
			return (
				p((q) => {
					const z = q.findIndex(({ id: k }) => k === b.id),
						C = q.slice();
					if (z !== -1) {
						A = q[z];
						const k = { ...A, ...b };
						((C[z] = k), s.set(b.id, k));
					} else (C.push(b), s.set(b.id, b));
					return C;
				}),
				() => {
					p((q) => {
						if (!A) return (E && s.delete(b.id), q.filter(({ id: k }) => k !== b.id));
						const z = q.findIndex(({ id: k }) => k === b.id);
						if (z === -1) return q;
						const C = q.slice();
						return ((C[z] = A), s.set(b.id, A), C);
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
				const { items: E } = h.getState();
				((p = E.find((A) => A.id === b)), p && s.set(b, p));
			}
			return p || null;
		},
		__unstablePrivateStore: h,
	};
}
function j2(e, t, i) {
	return (rl(t, [i.store]), Xt(e, i, "items", "setItems"), e);
}
var I2 = { id: null };
function xi(e, t) {
	return e.find((i) => (t ? !i.disabled && i.id !== t : !i.disabled));
}
function L2(e, t) {
	return e.filter((i) => (t ? !i.disabled && i.id !== t : !i.disabled));
}
function P0(e, t) {
	return e.filter((i) => i.rowId === t);
}
function q2(e, t, i = !1) {
	const u = e.findIndex((s) => s.id === t);
	return [...e.slice(u + 1), ...(i ? [I2] : []), ...e.slice(0, u)];
}
function oS(e) {
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
function cS(e) {
	let t = 0;
	for (const { length: i } of e) i > t && (t = i);
	return t;
}
function U2(e) {
	return { id: "__EMPTY_ITEM__", disabled: !0, rowId: e };
}
function $2(e, t, i) {
	const u = cS(e);
	for (const s of e)
		for (let o = 0; o < u; o += 1) {
			const f = s[o];
			if (!f || (i && f.disabled)) {
				const h = o === 0 && i ? xi(s) : s[o - 1];
				s[o] = h && t !== h.id && i ? h : U2(h?.rowId);
			}
		}
	return e;
}
function B2(e) {
	const t = oS(e),
		i = cS(t),
		u = [];
	for (let s = 0; s < i; s += 1)
		for (const o of t) {
			const f = o[s];
			f && u.push({ ...f, rowId: f.rowId ? `${s}` : void 0 });
		}
	return u;
}
function fS(e = {}) {
	var t;
	const i = (t = e.store) == null ? void 0 : t.getState(),
		u = D2(e),
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
	Hn(o, () =>
		zn(o, ["renderedItems", "activeId"], (h) => {
			o.setState("activeId", (m) => {
				var v;
				return m !== void 0 ? m : (v = xi(h.renderedItems)) == null ? void 0 : v.id;
			});
		}),
	);
	const f = (h = "next", m = {}) => {
		var v, g;
		const S = o.getState(),
			{
				skip: b = 0,
				activeId: p = S.activeId,
				focusShift: E = S.focusShift,
				focusLoop: A = S.focusLoop,
				focusWrap: M = S.focusWrap,
				includesBaseElement: q = S.includesBaseElement,
				renderedItems: z = S.renderedItems,
				rtl: C = S.rtl,
			} = m,
			k = h === "up" || h === "down",
			O = h === "next" || h === "down",
			Y = O ? C && !k : !C || k,
			X = E && !b;
		let D = k ? T_($2(oS(z), p, X)) : z;
		if (((D = Y ? Vh(D) : D), (D = k ? B2(D) : D), p == null)) return (v = xi(D)) == null ? void 0 : v.id;
		const V = D.find((H) => H.id === p);
		if (!V) return (g = xi(D)) == null ? void 0 : g.id;
		const J = D.some((H) => H.rowId),
			W = D.indexOf(V),
			le = D.slice(W + 1),
			oe = P0(le, V.rowId);
		if (b) {
			const H = L2(oe, p),
				ve = H.slice(b)[0] || H[H.length - 1];
			return ve?.id;
		}
		const te = A && (k ? A !== "horizontal" : A !== "vertical"),
			fe = J && M && (k ? M !== "horizontal" : M !== "vertical"),
			L = O ? (!J || k) && te && q : k ? q : !1;
		if (te) {
			const H = xi(q2(fe && !L ? D : P0(D, V.rowId), p, L), p);
			return H?.id;
		}
		if (fe) {
			const H = xi(L ? oe : le, p);
			return L ? H?.id || null : H?.id;
		}
		const $ = xi(oe, p);
		return !$ && L ? null : $?.id;
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
			return (h = xi(o.getState().renderedItems)) == null ? void 0 : h.id;
		},
		last: () => {
			var h;
			return (h = xi(Vh(o.getState().renderedItems))) == null ? void 0 : h.id;
		},
		next: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("next", h)),
		previous: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("previous", h)),
		down: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("down", h)),
		up: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("up", h)),
	};
}
function V2(e) {
	return { id: ji(e.id), ...e };
}
function dS(e, t, i) {
	return (
		(e = j2(e, t, i)),
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
var Z2 = zc() && h_();
function H2({ tag: e, ...t } = {}) {
	const i = Zc(t.store, C_(e, ["value", "rtl"]));
	const u = e?.getState(),
		s = i?.getState(),
		o = Ie(t.activeId, s?.activeId, t.defaultActiveId, null),
		f = fS({
			...t,
			activeId: o,
			includesBaseElement: Ie(t.includesBaseElement, s?.includesBaseElement, !0),
			orientation: Ie(t.orientation, s?.orientation, "vertical"),
			focusLoop: Ie(t.focusLoop, s?.focusLoop, !0),
			focusWrap: Ie(t.focusWrap, s?.focusWrap, !0),
			virtualFocus: Ie(t.virtualFocus, s?.virtualFocus, !0),
		}),
		h = lS({ ...t, placement: Ie(t.placement, s?.placement, "bottom-start") }),
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
		Z2 &&
			Hn(b, () =>
				zn(b, ["virtualFocus"], () => {
					b.setState("virtualFocus", !1);
				}),
			),
		Hn(b, () => {
			if (e)
				return rr(
					zn(b, ["selectedValue"], (p) => {
						Array.isArray(p.selectedValue) && e.setValues(p.selectedValue);
					}),
					zn(e, ["values"], (p) => {
						b.setState("selectedValue", p.values);
					}),
				);
		}),
		Hn(b, () =>
			zn(b, ["resetValueOnHide", "mounted"], (p) => {
				p.resetValueOnHide && (p.mounted || b.setState("value", m));
			}),
		),
		Hn(b, () =>
			zn(b, ["open"], (p) => {
				p.open || (b.setState("activeId", o), b.setState("moves", 0));
			}),
		),
		Hn(b, () =>
			zn(b, ["moves", "activeId"], (p, E) => {
				p.moves === E.moves && b.setState("activeValue", void 0);
			}),
		),
		Hn(b, () =>
			bc(b, ["moves", "renderedItems"], (p, E) => {
				if (p.moves === E.moves) return;
				const { activeId: A } = b.getState(),
					M = f.item(A);
				b.setState("activeValue", M?.value);
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
function P2(e) {
	const t = M2();
	return ((e = { ...e, tag: e.tag !== void 0 ? e.tag : t }), V2(e));
}
function Q2(e, t, i) {
	return (
		rl(t, [i.tag]),
		Xt(e, i, "value", "setValue"),
		Xt(e, i, "selectedValue", "setSelectedValue"),
		Xt(e, i, "resetValueOnHide"),
		Xt(e, i, "resetValueOnSelect"),
		Object.assign(dS(sS(e, t, i), t, i), { tag: i.tag })
	);
}
function K2(e = {}) {
	e = P2(e);
	const [t, i] = Hc(H2, e);
	return Q2(t, i, e);
}
var Y2 = "hr",
	hS = et(function ({ orientation: t = "horizontal", ...i }) {
		return ((i = { role: "separator", "aria-orientation": t, ...i }), i);
	}),
	lj = Ke(function (t) {
		return Xe(Y2, hS(t));
	}),
	G2 = "hr",
	mS = et(function ({ store: t, ...i }) {
		const u = jc();
		((t = t || u), Jt(t, !1));
		const s = t.useState((o) => (o.orientation === "horizontal" ? "vertical" : "horizontal"));
		return ((i = hS({ ...i, orientation: s })), i);
	}),
	sj = Ke(function (t) {
		return Xe(G2, mS(t));
	}),
	Yh =
		'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Q0(e) {
	const t = e.querySelector("[data-dialog-initial]");
	return t?.matches(Yh) ? t : (e.querySelector(Yh) ?? e);
}
function ul(e) {
	const t = (0, _.useRef)(null);
	((0, _.useEffect)(() => {
		const u = document.activeElement instanceof HTMLElement ? document.activeElement : null,
			s = t.current;
		return (
			(s === null ? null : Q0(s))?.focus(),
			() => {
				u?.focus();
			}
		);
	}, []),
		(0, _.useEffect)(() => {
			const u = t.current;
			if (!u) return;
			const s = () => {
					!u.isConnected || document.activeElement !== document.body || Q0(u).focus();
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
var F2 = 1e3,
	X2 = 3e4;
function vS(e) {
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
			S = { clientRequestId: v.clientRequestId, retryDelayMs: F2, retryTimer: null, settled: !1, cancelled: !1 };
		(u.current.set(v.clientRequestId, S), e.onRequestStart());
		const b = (E, A = !1) => {
				u.current.get(v.clientRequestId) !== S ||
					S.cancelled ||
					(A && e.onStorageFull(E),
					i((M) =>
						M.map((q) =>
							q.clientRequestId === v.clientRequestId ? { ...q, status: "failed", errorMessage: A ? null : E } : q,
						),
					),
					o(S));
			},
			p = () => {
				if (!(u.current.get(v.clientRequestId) !== S || S.cancelled))
					try {
						e.client.data
							.append({
								collection: e.collection,
								keyPrefix: e.keyPrefix,
								value: g,
								clientRequestId: v.clientRequestId,
							})
							.then(
								(E) => {
									if (u.current.get(v.clientRequestId) !== S || S.cancelled) return;
									if ("_nay" in E) {
										if (E._nay.name === "unavailable") {
											const q = S.retryDelayMs;
											S.retryTimer = setTimeout(() => {
												((S.retryTimer = null), (S.retryDelayMs = Math.min(q * 2, X2)), p());
											}, q);
											return;
										}
										b(E._nay.message, E._nay.name === "storage_full");
										return;
									}
									i((q) => q.filter((z) => z.clientRequestId !== v.clientRequestId));
									const A = E._yay.key,
										M = Xa(A) ?? Date.now();
									(e.onDelivered({
										key: A,
										value: g,
										revision: 0,
										createdBy: e.userId,
										updatedBy: e.userId,
										createdAt: M,
										updatedAt: M,
										timestamp: M,
									}),
										o(S));
								},
								(E) => {
									b(Zn(E));
								},
							);
					} catch (E) {
						b(Zn(E));
					}
			};
		p();
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
var J2 = ["image/", "video/", "audio/", "application/", "text/"],
	K0 = 20;
function W2(e) {
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
				for (let b = 0; b < e.attachments.length; b += K0) {
					const p = e.attachments.slice(b, b + K0),
						E = await e.client.fetchJson("/api/v1/files/download-urls", {
							body: { fileNodeIds: p.map((M) => M.fileNodeId) },
						}),
						A = Dk.safeParse(E);
					if (!A.success) throw new Error("Unexpected response for the download links");
					for (const M of A.data.items) S.set(M.fileNodeId, { kind: "ready", url: M.url });
					for (const M of A.data.errors) S.set(M.fileNodeId, { kind: "error", message: M.message });
				}
				return S;
			})()
				.then((S) => {
					(s(!1), i(S));
				})
				.catch((S) => {
					(s(!1), (m.current = null), f(Zn(S)));
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
function ez(e) {
	const t = (0, _.useId)(),
		[i, u] = (0, _.useState)([]),
		[s, o] = (0, _.useState)(null),
		[f, h] = (0, _.useState)(!1),
		[m, v] = (0, _.useState)(!1),
		[g, S] = (0, _.useState)(null),
		b = (0, _.useRef)(new Set()),
		p = (0, _.useRef)(!1),
		E = () => {
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
							contentTypePrefixes: J2,
							cursor: s,
						},
					})
					.then((A) => {
						v(!1);
						const M = zk.safeParse(A);
						if (!M.success) {
							S("Unexpected response from the file list");
							return;
						}
						const q = M.data.items.filter((z) => !b.current.has(z.nodeId));
						for (const z of q) b.current.add(z.nodeId);
						(u((z) => [...z, ...q]), o(M.data.cursor), h(M.data.isDone));
					})
					.catch((A) => {
						(v(!1), S(Zn(A)));
					}));
		};
	return (
		(0, _.useEffect)(() => {
			p.current || ((p.current = !0), E());
		}, []),
		(0, w.jsxs)(ul, {
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
								(0, w.jsx)("button", { type: "button", className: "button", onClick: E, children: "Retry" }),
							],
						})
					: null,
				!m && g === null && i.length === 0 && f
					? (0, w.jsx)("div", { className: "channel-status", children: "No files found." })
					: null,
				!f && !m && g === null
					? (0, w.jsx)("button", { type: "button", className: "button", onClick: E, children: "Load more" })
					: null,
			],
		})
	);
}
var tz = 8,
	nz = 100,
	rz = 10,
	Gh = new WeakMap(),
	mh = new WeakMap();
function iz(e) {
	const t = Gh.get(e);
	if (t !== void 0) return Promise.resolve(t);
	const i = mh.get(e);
	if (i !== void 0) return i;
	const u = az(e).then((s) => (s.status === "ready" && Gh.set(e, s), mh.delete(e), s));
	return (mh.set(e, u), u);
}
async function az(e) {
	const t = [];
	let i;
	for (let u = 0; u < rz; u += 1) {
		const s = await e.members.list({ limit: nz, ...(i === void 0 ? {} : { cursor: i }) });
		if ("_nay" in s) return { status: "refused", name: s._nay.name };
		if ((t.push(...s._yay.members), s._yay.cursor === null)) return { status: "ready", members: t };
		i = s._yay.cursor;
	}
	return { status: "ready", members: t };
}
function Y0(e) {
	return `mention:${e}`;
}
function gS(e) {
	const t = (0, _.useId)(),
		[i, u] = (0, _.useState)(""),
		[s, o] = (0, _.useState)([]),
		[f, h] = (0, _.useState)(!1),
		[m, v] = (0, _.useState)(null),
		[g, S] = (0, _.useState)(null),
		b = (0, _.useRef)(new Map()),
		p = (0, _.useRef)(null),
		E = (0, _.useRef)(null),
		A = K2({
			placement: "top-start",
			resetValueOnHide: !1,
			setOpen: (D) => {
				D || S(null);
			},
		}),
		M = e.client.context.userId,
		q =
			g !== null && m !== null && m !== "loading" && m.status === "ready" ? Sk(m.members, g.query, M).slice(0, tz) : [],
		z = g !== null && (m === "loading" || (m !== null && m.status === "refused") || q.length > 0),
		C = () => {
			if (m !== null) return;
			const D = Gh.get(e.client);
			if (D !== void 0) {
				v(D);
				return;
			}
			(v("loading"), iz(e.client).then(v));
		},
		k = (D) => {
			if (g === null) return;
			const V = p.current?.selectionStart ?? i.length,
				J = wk(i, g.start, V, D.label);
			(b.current.set(D.userId, D.label), u(J.text), S(null), (E.current = J.caret), A.hide(), A.setValue(""));
		},
		O = () => {
			if (e.busy || e.disabled) return;
			const D = i.trim();
			if (D === "" && s.length === 0) return;
			const V = Ek(b.current, D);
			(e.onSend(D, s, V), u(""), o([]), S(null), b.current.clear(), A.hide());
		},
		Y = (D) => {
			const V = D.currentTarget.value,
				J = D.currentTarget.selectionStart ?? V.length;
			u(V);
			const W = _k(V, J);
			if ((S(W), A.setValue(W?.query ?? ""), W === null)) {
				A.hide();
				return;
			}
			C();
		},
		X = (D) => {
			if (z) {
				if (D.key === "ArrowLeft" || D.key === "ArrowRight") {
					A.hide();
					return;
				}
				if (D.key === "Escape") {
					(D.preventDefault(), D.stopPropagation(), S(null), A.hide());
					return;
				}
				if ((D.key === "Enter" || D.key === "Tab") && !D.shiftKey && q.length > 0) {
					D.preventDefault();
					const V = A.getState().activeId,
						J = q.find((W) => Y0(W.userId) === V) ?? q[0];
					k(J);
					return;
				}
			}
			D.key === "Enter" && !D.shiftKey && (D.preventDefault(), O());
		};
	return (
		(0, _.useLayoutEffect)(() => {
			A.setOpen(z);
		}, [A, z]),
		(0, _.useLayoutEffect)(() => {
			const D = E.current;
			if (D === null) return;
			E.current = null;
			const V = p.current;
			V !== null && (V.focus(), V.setSelectionRange(D, D));
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
							children: s.map((D) =>
								(0, w.jsxs)(
									"li",
									{
										className: "composer-attachment",
										children: [
											(0, w.jsx)("span", { children: D.name }),
											(0, w.jsx)("button", {
												type: "button",
												className: "composer-attachment-remove",
												"aria-label": `Remove attachment ${D.name}`,
												onClick: () => o((V) => V.filter((J) => J.fileNodeId !== D.fileNodeId)),
												children: "×",
											}),
										],
									},
									D.fileNodeId,
								),
							),
						})
					: null,
				(0, w.jsxs)("div", {
					className: "composer-bar",
					children: [
						(0, w.jsx)(pM, {
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
								onChange: Y,
								onKeyDown: X,
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
							children: (0, w.jsx)(Yk, { size: 18, "aria-hidden": "true" }),
						}),
						(0, w.jsx)("button", {
							type: "button",
							className: "composer-action composer-send",
							"aria-label": e.busy ? "Sending…" : "Send",
							disabled: e.busy || e.disabled,
							onClick: O,
							children: (0, w.jsx)(Hk, { size: 18, "aria-hidden": "true" }),
						}),
					],
				}),
				(0, w.jsxs)(N2, {
					store: A,
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					fitViewport: !0,
					hidden: !z,
					getAnchorRect: () => {
						const D = p.current;
						return D === null ? null : D.getBoundingClientRect();
					},
					className: "mention-menu",
					"aria-label": "Mention somebody",
					children: [
						m === "loading"
							? (0, w.jsx)("div", { className: "mention-menu-status", role: "status", children: "Loading people…" })
							: null,
						m !== null && m !== "loading" && m.status === "refused"
							? (0, w.jsx)("div", { className: "mention-menu-status", role: "status", children: r_(m.name) })
							: null,
						q.map((D) =>
							(0, w.jsx)(
								$M,
								{
									id: Y0(D.userId),
									value: D.label,
									setValueOnClick: !1,
									focusOnHover: !0,
									className: "mention-option",
									onMouseDown: (V) => {
										V.preventDefault();
									},
									onClick: () => k(D),
									children: D.label,
								},
								D.userId,
							),
						),
					],
				}),
				(0, w.jsx)("span", { id: t, className: "composer-hint", children: "Enter sends · Shift+Enter for a new line" }),
				f
					? (0, w.jsx)(ez, {
							client: e.client,
							onPick: (D) => {
								(o((V) => (V.some((J) => J.fileNodeId === D.fileNodeId) ? V : [...V, D])), h(!1));
							},
							onClose: () => h(!1),
						})
					: null,
			],
		})
	);
}
function uz(e) {
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
					? (h.preventDefault(), s.current[(m + 1) % Hu.length]?.focus())
					: (h.key === "ArrowLeft" || h.key === "ArrowUp") &&
						(h.preventDefault(), s.current[(m + Hu.length - 1) % Hu.length]?.focus());
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
						children: Hu.map((h, m) => {
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
									"aria-label": e_[h],
									onKeyDown: (g) => f(g, m),
									onClick: () => {
										(e.onPick(h, v), o());
									},
									children: (0, w.jsx)("span", { "aria-hidden": "true", children: Wb[h] }),
								},
								h,
							);
						}),
					})
				: null,
		],
	});
}
var yS = 1440 * 60 * 1e3,
	lz = 300 * 1e3;
function sz(e) {
	return new Date(e).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" });
}
function Fh(e) {
	return new Date(e).toLocaleDateString(void 0, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}
function oz(e, t) {
	const i = new Date(e).toDateString();
	return i === new Date(t).toDateString() ? "Today" : i === new Date(t - yS).toDateString() ? "Yesterday" : Fh(e);
}
function cz(e) {
	if (e == null) return "•";
	const t = e.split(/\s+/u).filter((u) => u !== "");
	if (t.length === 0) return "•";
	const i = t.length > 1 ? t[t.length - 1][0] : "";
	return `${t[0][0]}${i}`.toUpperCase();
}
function pS(e, t, i = null) {
	const u = [];
	let s = null,
		o = !1;
	for (const f of e) {
		const h = s !== null && new Date(s.timestamp).toDateString() !== new Date(f.timestamp).toDateString();
		h && u.push({ kind: "divider", key: `divider:${f.key}`, label: oz(f.timestamp, t) });
		const m =
			!o && i !== null && f.timestamp > i.lastReadAt && f.createdBy !== i.selfUserId && f.value.deletedAt === null;
		m && ((o = !0), u.push({ kind: "new", key: `new:${f.key}` }));
		const v = s !== null && !h && !m && s.createdBy === f.createdBy && f.timestamp - s.timestamp <= lz;
		(u.push({ kind: "message", doc: f, isContinuation: v }), (s = f));
	}
	return u;
}
function fz(e, t, i) {
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
		[p, E] = (0, _.useState)(!1),
		[A, M] = (0, _.useState)(null),
		[q, z] = (0, _.useState)(!1),
		C = (0, _.useRef)(null),
		k = (0, _.useRef)(null),
		O = (0, _.useRef)(null),
		Y = (0, _.useRef)(!1),
		X = (0, _.useRef)(null),
		D = (0, _.useRef)(null),
		V = (0, _.useRef)(e.onRequestSettled);
	((V.current = e.onRequestSettled),
		(0, _.useEffect)(() => {
			h && C.current?.focus();
		}, [h]),
		(0, _.useEffect)(() => {
			const I = X.current;
			if (I === null) return;
			const se = I === "edit" ? k.current : O.current;
			se !== null && ((X.current = null), se.focus());
		}, [h, q, o]));
	const J = (I) => {
			I.settled || ((I.settled = !0), (I.cancelled = !0), D.current === I && (D.current = null), V.current());
		},
		W = (I) => {
			(J(I), b(!1), E(!1), M(null), I.onDone());
		},
		le = (I) => {
			if (D.current !== I || I.running || I.cancelled) return;
			((I.running = !0), b(!0), E(!1), M(null));
			const se = (ae) => {
				D.current !== I || I.cancelled || ((I.running = !1), (I.uncertain = !0), b(!1), E(!0), M(ae));
			};
			try {
				t.data
					.put({ collection: i, key: u.key, value: I.value, expectedRevision: I.expectedRevision })
					.then((ae) => {
						if (!(D.current !== I || I.cancelled)) {
							if (((I.running = !1), "_nay" in ae)) {
								if (ae._nay.name === "unavailable") {
									se(ae._nay.message);
									return;
								}
								if (I.uncertain && ae._nay.name === "conflict") {
									(b(!1), E(!0), M(ae._nay.message));
									return;
								}
								if ((J(I), b(!1), E(!1), ae._nay.name === "storage_full")) {
									e.onStorageFull(ae._nay.message);
									return;
								}
								M(ae._nay.message);
								return;
							}
							(e.onApplyLocal({ ...u, value: I.value, revision: ae._yay.revision, updatedAt: Date.now() }), W(I));
						}
					})
					.catch((ae) => {
						se(Zn(ae));
					});
			} catch (ae) {
				se(Zn(ae));
			}
		},
		oe = (I, se) => {
			if (D.current !== null) return;
			const ae = {
				value: I,
				expectedRevision: u.revision,
				onDone: se,
				running: !1,
				uncertain: !1,
				settled: !1,
				cancelled: !1,
			};
			((D.current = ae), e.onRequestStart(), le(ae));
		},
		te = () => {
			const I = D.current;
			(I !== null && J(I), b(!1), E(!1), M(null));
		};
	((0, _.useEffect)(() => {
		o &&
			(h || q
				? (Y.current && (X.current = "row"), m(!1), g(""), z(!1), b(!1), E(!1), M(null))
				: Y.current && O.current?.focus());
	}, [o, h, q]),
		(0, _.useEffect)(() => {
			const I = D.current;
			if (!(I === null || I.cancelled || u.revision <= I.expectedRevision)) {
				if (u.value.deletedAt !== null && I.value.deletedAt === null) {
					(J(I), b(!1), E(!1), M(null));
					return;
				}
				if (
					I.value.deletedAt !== null
						? u.value.deletedAt !== null
						: u.value.text === I.value.text && u.value.editedAt === I.value.editedAt
				) {
					W(I);
					return;
				}
				(J(I),
					b(!1),
					E(!1),
					M("Someone else changed this message while the request was pending. Review it and try again."));
			}
		}, [u.revision, u.value.deletedAt, u.value.editedAt, u.value.text]),
		(0, _.useEffect)(
			() => () => {
				const I = D.current;
				I !== null && J(I);
			},
			[],
		));
	const fe = () => {
			if (S) return;
			const I = D.current;
			if (I !== null) {
				le(I);
				return;
			}
			const se = v.trim();
			se !== "" &&
				oe({ ...u.value, text: se, editedAt: Date.now() }, () => {
					((X.current = "edit"), m(!1), g(""));
				});
		},
		L = () => {
			S || (te(), (X.current = "edit"), m(!1), g(""));
		},
		$ = () => {
			if (S) return;
			const I = D.current;
			if (I !== null) {
				le(I);
				return;
			}
			oe({ ...u.value, deletedAt: Date.now() }, () => {
				((X.current = "row"), z(!1));
			});
		},
		H = () => {
			S || (te(), z(!1));
		},
		ve = (I, se) => {
			if ((M(null), !Array.isArray(e.reactionGroups) && se)) {
				M("Reactions on this message could not be loaded, so they can't be removed right now.");
				return;
			}
			const ae = se;
			t.data
				.putOwned({ collection: "reactions", key: hk(u.key, I), value: ae ? { removed: !0 } : {} })
				.then((be) => {
					if ("_nay" in be) {
						if (be._nay.name === "storage_full") {
							e.onStorageFull(be._nay.message);
							return;
						}
						M(be._nay.message);
						return;
					}
					e.onApplyReaction({
						key: be._yay.key,
						targetKey: u.key,
						token: I,
						createdBy: e.selfUserId,
						revision: be._yay.revision,
						updatedAt: Date.now(),
						removed: ae,
					});
				})
				.catch((be) => {
					M(Zn(be));
				});
		},
		pe = e.authorName === null ? "Former member" : (e.authorName ?? "…"),
		Ze = Date.now() - u.timestamp < 7 * yS,
		N = e.onOpenThread !== null && typeof e.replyCount == "number" && e.replyCount > 0;
	return (0, w.jsxs)("li", {
		ref: O,
		className: e.isContinuation ? "message is-continuation" : "message is-leader",
		"data-key": u.key,
		tabIndex: -1,
		onFocusCapture: () => {
			Y.current = !0;
		},
		onBlurCapture: (I) => {
			I.relatedTarget instanceof Node && (Y.current = I.currentTarget.contains(I.relatedTarget));
		},
		children: [
			(0, w.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: cz(e.authorName) }),
			(0, w.jsxs)("div", {
				className: e.isContinuation ? "message-head visually-hidden" : "message-head",
				children: [
					(0, w.jsx)("span", { className: "message-author", children: pe }),
					(0, w.jsxs)("time", {
						className: "message-time",
						dateTime: new Date(u.timestamp).toISOString(),
						children: [
							Ze ? (0, w.jsxs)("span", { className: "visually-hidden", children: [Fh(u.timestamp), " "] }) : null,
							(0, w.jsx)("span", { className: "message-clock", children: Ze ? sz(u.timestamp) : Fh(u.timestamp) }),
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
									onInput: (I) => g(I.currentTarget.value),
									onKeyDown: (I) => {
										I.key === "Escape"
											? (I.preventDefault(), L())
											: I.key === "Enter" && !I.shiftKey && (I.preventDefault(), fe());
									},
								}),
								(0, w.jsxs)("div", {
									className: "message-edit-actions",
									children: [
										(0, w.jsx)("button", {
											type: "button",
											className: "button",
											disabled: S,
											onClick: L,
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
										fz(u.value, e.memberNames, e.selfUserId),
										u.value.editedAt !== null
											? (0, w.jsx)("span", { className: "message-edited", children: " (edited)" })
											: null,
									],
								}),
								u.value.attachments.length > 0 ? (0, w.jsx)(W2, { client: t, attachments: u.value.attachments }) : null,
								e.reactionGroups === "unknown"
									? (0, w.jsx)("div", { className: "message-reactions-unknown", children: "Reactions unavailable" })
									: Array.isArray(e.reactionGroups) && e.reactionGroups.length > 0
										? (0, w.jsx)("div", {
												className: "message-reactions",
												children: e.reactionGroups.map((I) =>
													(0, w.jsxs)(
														"button",
														{
															type: "button",
															className: I.reactedByMe ? "reaction-chip is-mine" : "reaction-chip",
															"aria-pressed": I.reactedByMe,
															"aria-label": `${e_[I.token]}, ${I.count} ${I.count === 1 ? "reaction" : "reactions"}`,
															onClick: () => ve(I.token, I.reactedByMe),
															children: [
																(0, w.jsx)("span", { "aria-hidden": "true", children: Wb[I.token] }),
																(0, w.jsx)("span", { className: "reaction-chip-count", children: I.count }),
															],
														},
														I.token,
													),
												),
											})
										: null,
								N && typeof e.replyCount == "number"
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
													children: `${Lk(e.replyCount, e.repliesHasMore)} ${e.replyCount === 1 ? "reply" : "replies"}`,
												}),
												e.replyLatestAt !== null
													? (0, w.jsx)("span", {
															className: "message-thread-summary-recency",
															children: `Last reply ${Nc(e.replyLatestAt, Date.now())}`,
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
							e.onOpenThread !== null && e.replyCount !== null && !N
								? (0, w.jsx)("button", {
										ref: e.replyTriggerRef ?? void 0,
										type: "button",
										className: "button message-action",
										disabled: e.threadDisabled,
										onClick: () => e.onOpenThread?.(u),
										children: e.replyCount === "unknown" ? "View thread" : "Reply in thread",
									})
								: null,
							(0, w.jsx)(uz, { groups: Array.isArray(e.reactionGroups) ? e.reactionGroups : [], onPick: ve }),
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
												onClick: () => z(!0),
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
				? (0, w.jsxs)(ul, {
						labelledBy: f,
						onClose: H,
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
										onClick: H,
										children: "Cancel",
									}),
									(0, w.jsx)("button", {
										type: "button",
										className: "button button-danger",
										disabled: S,
										onClick: $,
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
function bS(e) {
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
function Wo(e, t) {
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
function dz(e) {
	const { client: t, userId: i, root: u, memberNames: s, replies: o, repliesLoaded: f } = e,
		h = (0, _.useRef)(null);
	(0, _.useEffect)(() => {
		h.current?.focus();
	}, []);
	const m = vS({
		client: t,
		collection: "replies",
		keyPrefix: n_(u.key),
		userId: i,
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
		g = pS([...o].reverse(), Date.now());
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
								m.pending.map((S) => (0, w.jsx)(bS, { pending: S, onRetry: () => m.retry(S) }, S.clientRequestId)),
							],
						})
					: null,
			e.storageFull !== null
				? (0, w.jsx)("div", { className: "channel-status is-error", role: "alert", children: e.storageFull })
				: null,
			(0, w.jsx)(gS, {
				client: t,
				label: "Reply in thread",
				busy: m.busy,
				disabled: e.storageFull !== null || e.repliesError !== null,
				onSend: m.send,
			}),
		],
	});
}
var ec = { hasMore: !0, deepestRoot: null, incomplete: !1, death: null };
function _S(e, t) {
	return e.incomplete || e.death !== null ? !1 : !e.hasMore || (e.deepestRoot !== null && t < e.deepestRoot);
}
var tc = 100,
	vh = 1e3,
	hz = 3e4;
function mz(e) {
	let t = null;
	for (const i of e) (t === null || i.updatedAt > t) && (t = i.updatedAt);
	return t;
}
function vz(e) {
	if (typeof e != "object" || e === null) return null;
	const t = e.key;
	return typeof t == "string" ? t : null;
}
function gh(e) {
	let t = null;
	for (const i of e) {
		if (typeof i != "object" || i === null) continue;
		const u = i.updatedAt;
		typeof u == "number" && Number.isFinite(u) && (t === null || u > t) && (t = u);
	}
	return t;
}
function yh(e) {
	return e.newest === null
		? null
		: e.truncated && e.newest === e.current
			? e.newest + 1
			: e.newest > e.current
				? e.newest
				: null;
}
function ph(e, t) {
	return e.filter((i) => {
		const u = vz(i);
		return u !== null && u.startsWith(t);
	});
}
function bh(e, t) {
	return e.fetchJson("/api/v1/plugin-data/list", { body: t }).then((i) => {
		const u = i_.safeParse(i);
		if (!u.success) throw new Error("Unexpected response from the document list");
		return u.data;
	});
}
function Jh(e, t, i) {
	if (e.incomplete || e.death !== null) return "unknown";
	const u = t.get(i);
	if (u !== void 0 && u.length > 0) return u;
	const s = yc(i);
	return s !== null && _S(e, s) ? (u ?? []) : "pending";
}
function gz(e, t, i) {
	if (e.incomplete || e.death !== null) return "unknown";
	const u = t.get(i);
	if (u !== void 0 && u.count > 0) return u.count;
	const s = yc(i);
	return s !== null && _S(e, s) ? (u?.count ?? 0) : "unknown";
}
var G0 = 420,
	nc = 244,
	_h = 340,
	F0 = 16;
function yz(e) {
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
function pz(e) {
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
			openedAtLastReadAt: E,
		} = e,
		[A, M] = (0, _.useState)([]),
		[q, z] = (0, _.useState)(!1),
		[C, k] = (0, _.useState)(null),
		[O, Y] = (0, _.useState)({ hasMore: !1, atCapacity: !1, incomplete: !1 }),
		[X, D] = (0, _.useState)([]),
		[V, J] = (0, _.useState)([]),
		[W, le] = (0, _.useState)(ec),
		[oe, te] = (0, _.useState)(ec),
		[fe, L] = (0, _.useState)(null),
		[$, H] = (0, _.useState)({ kind: "idle" }),
		[ve, pe] = (0, _.useState)(_h),
		[Ze, N] = (0, _.useState)(0),
		[I, se] = (0, _.useState)(null),
		[ae, be] = (0, _.useState)(null),
		[Te, ke] = (0, _.useState)(null),
		[Ue, Ye] = (0, _.useState)(null),
		[St, At] = (0, _.useState)(!1),
		[vn, en] = (0, _.useState)(!1),
		[Ge, ge] = (0, _.useState)(null),
		Ce = (0, _.useRef)(null),
		tt = (0, _.useRef)(null),
		$e = (0, _.useRef)(null),
		Bt = (0, _.useRef)(null),
		Je = (0, _.useRef)(null),
		ce = (0, _.useRef)(null),
		ze = (0, _.useRef)(null),
		nt = (0, _.useRef)(null),
		Me = (0, _.useRef)(null),
		yt = (0, _.useRef)(null),
		pn = (0, _.useRef)({ reactions: null, replies: null }),
		at = (0, _.useRef)({ reactions: !1, replies: !1 }),
		Vt = (0, _.useRef)(0),
		pr = (0, _.useRef)({ reactions: { delayMs: vh, timer: null }, replies: { delayMs: vh, timer: null } }),
		Yr = (0, _.useRef)(!1),
		Gr = (0, _.useRef)(!1),
		Pn = (0, _.useRef)(null),
		kn = (0, _.useRef)(u.value.name),
		pt = (0, _.useRef)(null),
		tn = (0, _.useRef)(new Map()),
		ot = (0, _.useRef)(null),
		br = (0, _.useRef)(null),
		ar = (0, _.useRef)(0),
		_n = (0, _.useRef)(0),
		Zt = Yo(u.key),
		Ht = yn(u.key) ? u.key : void 0,
		Qn = () => {
			((_n.current += 1), g());
		},
		Nn = () => {
			_n.current !== 0 && ((_n.current -= 1), S());
		};
	(0, _.useEffect)(() => {
		kn.current = u.value.name;
	}, [u.value.name]);
	const ur = (G) => {
			const me = tt.current;
			me !== null && (me.apply_window(G), J(me.get_sorted()));
		},
		Sn = (G) => {
			const me = Ce.current;
			if (me === null) return [];
			const we = me.apply_window(G);
			return (M(me.get_sorted()), we);
		},
		_r = (G, me, we, je, He) => {
			const Ct = me.at(-1),
				bt =
					Ct === void 0 ? null : G === "reactions" ? (Ct.targetKey === void 0 ? null : yc(Ct.targetKey)) : hs(Ct.key);
			we.length > 0 && (pn.current[G] = we[we.length - 1].key);
			const dt = {
				hasMore: we.length === 0 ? !1 : !je,
				deepestRoot: bt ?? (G === "reactions" ? Je.current?.deepestRoot : ce.current?.deepestRoot) ?? null,
				incomplete: He,
				death: (G === "reactions" ? Je.current?.death : ce.current?.death) ?? null,
			};
			G === "reactions"
				? ((Je.current = dt), le(dt), He || Pt("reactions"))
				: ((ce.current = dt), te(dt), He || Pt("replies"));
		},
		lr = (G) => {
			const me = pr.current[G];
			me.timer !== null && (clearTimeout(me.timer), (me.timer = null));
		},
		Pt = (G) => {
			(lr(G), (pr.current[G].delayMs = vh));
		},
		jn = (G) => {
			if ((G === "reactions" ? Je.current : ce.current)?.death != null) return;
			const me = pr.current[G];
			if (me.timer !== null) return;
			const we = me.delayMs,
				je = we * (0.5 + Math.random());
			me.timer = setTimeout(() => {
				((me.timer = null), (me.delayMs = Math.min(we * 2, hz)), Sr(G));
			}, je);
		},
		Sr = (G) => {
			if (at.current[G] || (G === "reactions" ? Je.current : ce.current)?.death != null) return;
			at.current[G] = !0;
			const me = Vt.current,
				we = pn.current[G];
			bh(t, { collection: G, keyPrefix: Zt, ...(we === null ? {} : { keyStartExclusive: we }), limit: tc })
				.then((je) => {
					if (!(!Yr.current || Vt.current !== me)) {
						if (((at.current[G] = !1), G === "reactions")) {
							const He = $e.current;
							if (He === null) return;
							const Ct = He.apply_window(je.documents);
							D(He.get_sorted());
							const bt = je.documents.length === 0 && !je.isDone;
							(_r("reactions", Ct, je.documents, je.isDone, bt), bt && jn("reactions"));
						} else {
							const He = tt.current;
							if (He === null) return;
							const Ct = He.apply_window(je.documents);
							J(He.get_sorted());
							const bt = je.documents.length === 0 && !je.isDone;
							(_r("replies", Ct, je.documents, je.isDone, bt), bt && jn("replies"));
						}
						Qt();
					}
				})
				.catch(() => {
					!Yr.current || Vt.current !== me || ((at.current[G] = !1), _r(G, [], [], !0, !0), jn(G));
				});
		},
		Lt = (G) => {
			const me = G === "reactions" ? Je.current : ce.current;
			me === null || !me.incomplete || me.death !== null || (lr(G), Sr(G));
		},
		Qt = () => {
			const G = ze.current;
			if (G !== null)
				for (const me of ["reactions", "replies"]) {
					const we = me === "reactions" ? Je.current : ce.current;
					we === null ||
						!we.hasMore ||
						we.incomplete ||
						we.death !== null ||
						((we.deepestRoot === null || we.deepestRoot < G) && Sr(me));
				}
		},
		Sa = (G) => {
			if (Gr.current) return;
			const me = mz(G);
			me !== null && ((Gr.current = !0), Ye(s), se(me), be(me), ke(me));
		};
	(0, _.useEffect)(() => {
		let G = !0,
			me = 0;
		const we = Ce.current ?? ah(pc);
		((Ce.current = we),
			(tt.current ??= ah(pc)),
			($e.current ??= ah(kk)),
			(Vt.current += 1),
			(Yr.current = !0),
			(Gr.current = !1),
			(pn.current = { reactions: null, replies: null }),
			(at.current = { reactions: !1, replies: !1 }),
			Pt("reactions"),
			Pt("replies"),
			(Je.current = null),
			(ce.current = null),
			le(ec),
			te(ec),
			Ye(null),
			se(null),
			be(null),
			ke(null),
			(Me.current = null));
		const je = t.data.watchWindow({ collection: "messages", keyPrefix: Yo(u.key), pageSize: 100 }, (He, Ct) => {
			if (He === null) {
				k({ reason: Ct?.reason });
				return;
			}
			k(null);
			const bt = we.apply_window(He.docs);
			(M(we.get_sorted()), z(!0), Y({ hasMore: He.hasMore, atCapacity: He.atCapacity, incomplete: He.incomplete }));
			const dt = He.docs.at(-1)?.key ?? null;
			((nt.current = dt),
				(ze.current = dt === null ? null : yc(dt)),
				Sa(He.docs),
				Je.current === null && !at.current.reactions && Sr("reactions"),
				ce.current === null && !at.current.replies && Sr("replies"),
				Qt());
			const Ur = pt.current;
			if (Ur === null) {
				pt.current = new Set(bt.map((an) => an.key));
				return;
			}
			const Gn = Me.current;
			if (Gn !== null) {
				const an = He.docs.findIndex((Tr) => Tr.key === Gn);
				if (an < 0) Me.current = null;
				else {
					const Tr = He.docs.slice(an + 1);
					for (const Ln of Tr) Ur.add(Ln.key);
					(Tr.length > 0 || !He.hasMore) && (Me.current = null);
				}
			}
			const Yt = bt.filter((an) => !Ur.has(an.key) && an.createdBy !== i && an.value.deletedAt === null);
			for (const an of bt) Ur.add(an.key);
			const $i = Yt.length > 0 ? ++me : me;
			if (Yt.length === 1) {
				const an = Yt[0];
				o.resolve([an.createdBy])
					.then(() => {
						if (!G || $i !== me) return;
						const Tr = o.get(an.createdBy) ?? null,
							Ln = an.value.text,
							Fr = Ln.length > 80 ? `${Ln.slice(0, 80)}…` : Ln;
						f(`${Tr ?? "Former member"}: ${Fr}`);
					})
					.catch(() => {
						!G || $i !== me || f(`New message in #${kn.current}`);
					});
			} else Yt.length > 1 && f(`${Yt.length} new messages in #${kn.current}`);
		});
		return (
			(Bt.current = je),
			() => {
				((G = !1), (Yr.current = !1), Pt("reactions"), Pt("replies"), (Bt.current = null), je.unsubscribe());
			}
		);
	}, [t, u.key, s, i, o, f]);
	const In = Ht === void 0 ? {} : { scopeId: Ht };
	((0, _.useEffect)(() => {
		if (!(I === null || Ue !== s))
			return t.data.watchChanges({ collection: "messages", limit: 100, updatedSince: I, ...In }, (G, me) => {
				if (G === null) {
					k({ reason: me?.reason });
					return;
				}
				k(null);
				const we = Ce.current;
				if (we === null) return;
				const je = ph(G.docs, Zt);
				(we.apply_window(je),
					M(we.get_sorted()),
					G.truncated &&
						nt.current !== null &&
						bh(t, { collection: "messages", keyPrefix: Zt, keyStartExclusive: nt.current, limit: tc })
							.then((bt) => {
								Sn(bt.documents);
							})
							.catch(() => {}));
				const He = gh(G.docs),
					Ct = yh({ current: I, newest: He, truncated: G.truncated });
				Ct !== null && se(Ct);
			});
	}, [t, u.key, I, Ue, s, Ht, Zt]),
		(0, _.useEffect)(() => {
			if (!(ae === null || Ue !== s))
				return t.data.watchChanges({ collection: "replies", limit: 100, updatedSince: ae, ...In }, (G, me) => {
					if (G === null) {
						lr("replies");
						const dt = {
							...(ce.current ?? { hasMore: !1, deepestRoot: null, incomplete: !1, death: null }),
							incomplete: !1,
							death: { reason: me?.reason },
						};
						((ce.current = dt), te(dt));
						return;
					}
					const we = tt.current;
					if (we === null) return;
					const je = ce.current;
					if (je !== null && je.death !== null) {
						const dt = { ...je, death: null };
						((ce.current = dt), te(dt));
					}
					const He = ph(G.docs, Zt);
					(we.apply_window(He), J(we.get_sorted()), Lt("replies"));
					const Ct = gh(G.docs),
						bt = yh({ current: ae, newest: Ct, truncated: G.truncated });
					bt !== null && be(bt);
				});
		}, [t, u.key, ae, Ue, s, Ht, Zt]),
		(0, _.useEffect)(() => {
			if (!(Te === null || Ue !== s))
				return t.data.watchChanges({ collection: "reactions", limit: 100, updatedSince: Te, ...In }, (G, me) => {
					if (G === null) {
						lr("reactions");
						const dt = {
							...(Je.current ?? { hasMore: !1, deepestRoot: null, incomplete: !1, death: null }),
							incomplete: !1,
							death: { reason: me?.reason },
						};
						((Je.current = dt), le(dt));
						return;
					}
					const we = $e.current;
					if (we === null) return;
					const je = Je.current;
					if (je !== null && je.death !== null) {
						const dt = { ...je, death: null };
						((Je.current = dt), le(dt));
					}
					const He = ph(G.docs, Zt);
					(we.apply_window(He), D(we.get_sorted()), Lt("reactions"));
					const Ct = gh(G.docs),
						bt = yh({ current: Te, newest: Ct, truncated: G.truncated });
					bt !== null && ke(bt);
				});
		}, [t, u.key, Te, Ue, s, Ht, Zt]),
		(0, _.useEffect)(() => {
			const G = () => {
				document.visibilityState === "visible" && (Lt("reactions"), Lt("replies"));
			};
			return (
				document.addEventListener("visibilitychange", G),
				() => document.removeEventListener("visibilitychange", G)
			);
		}, [t, u.key]),
		(0, _.useEffect)(() => {
			if (h === null) {
				(At(!0), en(!1), ge(null));
				return;
			}
			let G = !1;
			return (
				At(!1),
				en(!1),
				ge(null),
				bh(t, { collection: "replies", keyPrefix: n_(h), limit: tc })
					.then((me) => {
						G || (ur(me.documents), en(!me.isDone), At(!0));
					})
					.catch((me) => {
						G || (ge(Zn(me)), At(!0));
					}),
				() => {
					G = !0;
				}
			);
		}, [t, h, s]));
	const nn = vS({
		client: t,
		collection: "messages",
		keyPrefix: Yo(u.key),
		userId: i,
		onDelivered: (G) => {
			(Ce.current?.apply_local(G), pt.current?.add(G.key), M(Ce.current?.get_sorted() ?? []));
		},
		onRequestStart: Qn,
		onRequestSettled: Nn,
		onStorageFull: L,
	});
	((0, _.useEffect)(() => {
		const G = new Set();
		for (const me of A) {
			G.add(me.createdBy);
			for (const we of me.value.mentions ?? []) G.add(we);
		}
		for (const me of V) {
			G.add(me.createdBy);
			for (const we of me.value.mentions ?? []) G.add(we);
		}
		G.size > 0 && o.resolve([...G]);
	}, [A, V, o]),
		(0, _.useEffect)(() => {
			A.length > 0 && p(A[0].timestamp);
		}, [A, p]),
		(0, _.useEffect)(() => {
			const G = A.length > 0 ? A[0].key : null,
				me = G !== null && G !== br.current,
				we = nn.pending.length > ar.current;
			((br.current = G),
				(ar.current = nn.pending.length),
				(me || we) && ot.current && (ot.current.scrollTop = ot.current.scrollHeight));
		}, [A, nn.pending.length]));
	const Li = () => {
			const G = Bt.current;
			G !== null && ((Me.current = nt.current), G.loadOlder());
		},
		wa = () => {
			const G = yt.current ?? nt.current;
			G !== null &&
				(H({ kind: "loading" }),
				t
					.fetchJson("/api/v1/plugin-data/list", {
						body: { collection: "messages", keyPrefix: Yo(u.key), keyStartExclusive: G, limit: tc },
					})
					.then((me) => {
						const we = i_.safeParse(me);
						if (!we.success) {
							H({ kind: "failed", message: "Unexpected response for older messages.", retryAt: null });
							return;
						}
						const je = Ce.current;
						if (je === null) return;
						if (we.data.documents.length === 0 && !we.data.isDone) {
							H({
								kind: "failed",
								message: "Older messages returned an incomplete page. Please retry.",
								retryAt: null,
							});
							return;
						}
						const He = we.data.documents.at(-1);
						He !== void 0 && (yt.current = He.key);
						const Ct = je.apply_window(we.data.documents);
						M(je.get_sorted());
						for (const bt of Ct) pt.current?.add(bt.key);
						H(we.data.isDone ? { kind: "exhausted" } : { kind: "idle" });
					})
					.catch((me) => {
						if (me.status !== 429) {
							H({ kind: "failed", message: Zn(me), retryAt: null });
							return;
						}
						const we = yz(me.responseText) ?? 1e3;
						H({
							kind: "failed",
							message: "Older messages are being loaded too quickly. Waiting a moment before you can try again.",
							retryAt: Date.now() + we,
						});
					}));
		};
	((0, _.useEffect)(() => {
		if ($.kind !== "failed" || $.retryAt === null) return;
		const G = setTimeout(
			() => {
				H({ kind: "idle" });
			},
			Math.max(0, $.retryAt - Date.now()),
		);
		return () => {
			clearTimeout(G);
		};
	}, [$]),
		(0, _.useEffect)(() => {
			const G = Pn.current;
			if (h === null || G === null) return;
			N(G.clientWidth);
			const me = new ResizeObserver(() => N(G.clientWidth));
			return (me.observe(G), () => me.disconnect());
		}, [h]));
	const qt = (G) => {
			const me = Math.max(nc, Ze - G0);
			return Math.min(me, Math.max(nc, G));
		},
		Dt = (G) => {
			G.key === "ArrowLeft"
				? (G.preventDefault(), pe(qt(ve + F0)))
				: G.key === "ArrowRight"
					? (G.preventDefault(), pe(qt(ve - F0)))
					: G.key === "Home" && (G.preventDefault(), pe(qt(_h)));
		},
		rn = (G) => {
			(G.preventDefault(), G.currentTarget.setPointerCapture(G.pointerId));
		},
		wr = (G) => {
			if (!G.currentTarget.hasPointerCapture(G.pointerId)) return;
			const me = Pn.current?.getBoundingClientRect();
			me !== void 0 && pe(qt(me.right - G.clientX));
		},
		qr = (0, _.useMemo)(() => jk(X, i), [X, i]),
		Er = (0, _.useMemo)(() => Ik(V), [V]),
		li = (G) => {
			(Ce.current?.apply_local(G), M(Ce.current?.get_sorted() ?? []));
		},
		qi = (G) => {
			(tt.current?.apply_local(G), J(tt.current?.get_sorted() ?? []));
		},
		Kn = (G) => {
			($e.current?.apply_local(G), D($e.current?.get_sorted() ?? []));
		},
		Ui = h === null ? [] : V.filter((G) => hs(G.key) === h),
		Kt = (G) => {
			if ((b || _n.current > 0) && h !== G.key) {
				f("Wait for pending message changes to finish before switching threads.");
				return;
			}
			m(G.key);
		},
		Yn = () => {
			if (b || _n.current > 0) {
				f("Wait for pending message changes to finish before closing the thread.");
				return;
			}
			const G = h;
			(m(null), G !== null && tn.current.get(G)?.focus());
		},
		Mn = h === null ? null : (A.find((G) => G.key === h) ?? null),
		sr = pS([...A].reverse(), Date.now(), E === null ? null : { lastReadAt: E, selfUserId: i }),
		Rt = Math.max(nc, Ze - G0),
		Ea = qt(ve);
	return C !== null && Ht === void 0
		? (0, w.jsx)("div", {
				className: "channel",
				children: (0, w.jsx)("div", {
					className: "channel-dead",
					role: "alert",
					children: Wo(C.reason, `messages in #${u.value.name}`),
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
								ref: ot,
								className: "message-log",
								role: "log",
								"aria-live": "off",
								"aria-label": `Messages in #${u.value.name}`,
								children: [
									C !== null
										? (0, w.jsx)("div", {
												className: "channel-status is-error",
												role: "alert",
												children: Wo(C.reason, `messages in #${u.value.name}`),
											})
										: null,
									q && O.hasMore && !O.atCapacity
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
									q && O.hasMore && O.atCapacity
										? (0, w.jsxs)("div", {
												className: "log-older",
												children: [
													(0, w.jsx)("span", {
														className: "channel-status",
														role: "status",
														children:
															$.kind === "loading"
																? "Loading older messages…"
																: $.kind === "exhausted"
																	? `You have reached the start of #${u.value.name}.`
																	: "The live view stopped growing. Older messages load on request.",
													}),
													$.kind === "exhausted"
														? null
														: (0, w.jsx)("button", {
																type: "button",
																className: "button",
																disabled: $.kind === "loading" || ($.kind === "failed" && $.retryAt !== null),
																onClick: wa,
																children: "Load older messages",
															}),
													$.kind === "failed"
														? (0, w.jsx)("span", {
																className: "channel-status is-error",
																role: "alert",
																children: $.message,
															})
														: null,
												],
											})
										: null,
									O.incomplete
										? (0, w.jsx)("div", {
												className: "channel-status",
												role: "alert",
												children: "Older messages in view may be out of date.",
											})
										: null,
									W.incomplete || oe.incomplete
										? (0, w.jsx)("div", {
												className: "channel-status",
												role: "alert",
												children: "Some reactions and replies in this range could not be loaded.",
											})
										: null,
									W.death !== null
										? (0, w.jsx)("div", {
												className: "channel-status is-error",
												role: "alert",
												children: Wo(W.death.reason, "reactions in this channel"),
											})
										: null,
									oe.death !== null
										? (0, w.jsx)("div", {
												className: "channel-status is-error",
												role: "alert",
												children: Wo(oe.death.reason, "reply counts in this channel"),
											})
										: null,
									q
										? A.length === 0 && nn.pending.length === 0
											? (0, w.jsx)("div", { className: "channel-status", children: "No messages yet" })
											: (0, w.jsxs)("ul", {
													className: "message-list",
													children: [
														sr.map((G) =>
															G.kind === "divider"
																? (0, w.jsx)("li", { className: "day-divider", children: G.label }, G.key)
																: G.kind === "new"
																	? (0, w.jsx)(
																			"li",
																			{
																				className: "new-divider",
																				children: (0, w.jsx)("span", {
																					className: "new-divider-label",
																					children: "New messages",
																				}),
																			},
																			G.key,
																		)
																	: (0, w.jsx)(
																			Xh,
																			{
																				client: t,
																				collection: "messages",
																				doc: G.doc,
																				isOwn: G.doc.createdBy === i,
																				selfUserId: i,
																				memberNames: o,
																				isContinuation: G.isContinuation,
																				authorName: o.get(G.doc.createdBy),
																				reactionGroups: Jh(W, qr, G.doc.key),
																				replyCount: gz(oe, Er, G.doc.key),
																				replyLatestAt: Er.get(G.doc.key)?.latestAt ?? null,
																				repliesHasMore: oe.hasMore,
																				onOpenThread: Kt,
																				threadDisabled: b,
																				replyTriggerRef: (me) => {
																					me === null ? tn.current.delete(G.doc.key) : tn.current.set(G.doc.key, me);
																				},
																				onApplyLocal: li,
																				onRequestStart: Qn,
																				onRequestSettled: Nn,
																				onApplyReaction: Kn,
																				onStorageFull: L,
																			},
																			G.doc.key,
																		),
														),
														nn.pending.map((G) =>
															(0, w.jsx)(bS, { pending: G, onRetry: () => nn.retry(G) }, G.clientRequestId),
														),
													],
												})
										: (0, w.jsx)("div", { className: "channel-status", role: "status", children: "Loading messages…" }),
								],
							}),
							Mn !== null
								? (0, w.jsx)("div", {
										className: "thread-resize",
										role: "separator",
										tabIndex: 0,
										"aria-orientation": "vertical",
										"aria-label": "Resize thread panel",
										"aria-valuenow": Ea,
										"aria-valuemin": nc,
										"aria-valuemax": Rt,
										onKeyDown: Dt,
										onPointerDown: rn,
										onPointerMove: wr,
										onDoubleClick: () => pe(qt(_h)),
									})
								: null,
							Mn !== null
								? (0, w.jsx)(
										dz,
										{
											client: t,
											userId: i,
											root: Mn,
											replies: Ui,
											repliesLoaded: St,
											repliesTruncated: vn,
											repliesError: Ge,
											reactionCoverage: W,
											reactionGroupsByTarget: qr,
											memberNames: o,
											isNarrow: v,
											storageFull: fe,
											onStorageFull: L,
											onApplyLocalRoot: li,
											onApplyLocalReply: qi,
											onRequestStart: Qn,
											onRequestSettled: Nn,
											sendInFlight: b,
											announce: f,
											onApplyReaction: Kn,
											onClose: Yn,
										},
										Mn.key,
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
					(0, w.jsx)(gS, {
						client: t,
						label: `Message #${u.value.name}`,
						busy: nn.busy,
						disabled: fe !== null,
						onSend: nn.send,
					}),
				],
			});
}
var Ns = ui([Ss], [Ic]),
	bz = Ns.useContext,
	_z = Ns.useScopedContext,
	oj = Ns.useProviderContext,
	cj = Ns.ContextProvider,
	fj = Ns.ScopedContextProvider,
	dj = (0, _.createContext)(void 0),
	Ms = ui([x_], [Bc]),
	hj = Ms.useContext,
	mj = Ms.useScopedContext,
	Vm = Ms.useProviderContext,
	Sz = Ms.ContextProvider,
	SS = Ms.ScopedContextProvider,
	Os = ui([Ss, Sz], [Ic, SS]),
	wS = Os.useContext,
	wz = Os.useScopedContext,
	Xc = Os.useProviderContext,
	ES = Os.ContextProvider,
	Ez = Os.ScopedContextProvider,
	vj = (0, _.createContext)(void 0),
	Tz = "div",
	Ci = "";
function Sh() {
	Ci = "";
}
function xz(e) {
	const t = e.target;
	return t && ai(t)
		? !1
		: e.key === " " && Ci.length
			? !0
			: e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey && /^[\p{Letter}\p{Number}]$/u.test(e.key);
}
function Az(e, t) {
	if (gr(e)) return !0;
	const i = e.target;
	return i ? t.some((u) => u.element === i) : !1;
}
function Rz(e) {
	return e.filter((t) => !t.disabled);
}
function lc(e, t) {
	var i;
	const u = ((i = e.element) == null ? void 0 : i.textContent) || e.children || ("value" in e && e.value);
	return u ? f_(u).trim().toLowerCase().startsWith(t.toLowerCase()) : !1;
}
function Cz(e, t, i) {
	if (!i) return e;
	const u = e.find((s) => s.id === i);
	return !u || !lc(u, t) || (Ci !== t && lc(u, Ci))
		? e
		: ((Ci = t),
			eN(
				e.filter((s) => lc(s, Ci)),
				i,
			).filter((s) => s.id !== i));
}
var Zm = et(function ({ store: t, typeahead: i = !0, ...u }) {
		const s = jc();
		((t = t || s), Jt(t, !1));
		const o = u.onKeyDownCapture,
			f = (0, _.useRef)(0),
			h = De((m) => {
				if ((o?.(m), m.defaultPrevented || !i || !t)) return;
				if (!xz(m)) return Sh();
				const { renderedItems: v, items: g, activeId: S, id: b } = t.getState();
				let p = Rz(g.length > v.length ? g : v);
				const E = xt(m.currentTarget),
					A = `[data-offscreen-id="${b}"]`,
					M = E.querySelectorAll(A);
				for (const C of M) {
					const k = C.ariaDisabled === "true" || ("disabled" in C && !!C.disabled);
					p.push({ id: C.id, element: C, disabled: k });
				}
				if ((M.length && (p = o_(p, (C) => C.element)), !Az(m, p))) return Sh();
				(m.preventDefault(),
					window.clearTimeout(f.current),
					(f.current = window.setTimeout(() => {
						Ci = "";
					}, 500)));
				const q = m.key.toLowerCase();
				((Ci += q), (p = Cz(p, q, S)));
				const z = p.find((C) => lc(C, Ci));
				z ? t.move(z.id) : Sh();
			});
		return ((u = { ...u, onKeyDownCapture: h }), iu(u));
	}),
	gj = Ke(function (t) {
		return Xe(Tz, Zm(t));
	}),
	kz = "div";
function Nz({ store: e, ...t }) {
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
var TS = et(function ({ store: t, alwaysVisible: i, composite: u, ...s }) {
		const o = Xc();
		((t = t || o), Jt(t, !1));
		const f = t.parent,
			h = t.menubar,
			m = !!f,
			v = ji(s.id),
			g = s.onKeyDown,
			S = t.useState((k) => k.placement.split("-")[0]),
			b = t.useState((k) => (k.orientation === "both" ? void 0 : k.orientation)),
			p = b !== "vertical",
			E = dn(h, (k) => !!k && k.orientation !== "vertical"),
			A = De((k) => {
				if ((g?.(k), !k.defaultPrevented)) {
					if (m || (h && !p)) {
						const O = {
							ArrowRight: () => S === "left" && !p,
							ArrowLeft: () => S === "right" && !p,
							ArrowUp: () => S === "bottom" && p,
							ArrowDown: () => S === "top" && p,
						}[k.key];
						if (O?.()) return (k.stopPropagation(), k.preventDefault(), t?.hide());
					}
					if (h) {
						const O = {
								ArrowRight: () => {
									if (E) return h.next();
								},
								ArrowLeft: () => {
									if (E) return h.previous();
								},
								ArrowDown: () => {
									if (!E) return h.next();
								},
								ArrowUp: () => {
									if (!E) return h.previous();
								},
							}[k.key],
							Y = O?.();
						Y !== void 0 && (k.stopPropagation(), k.preventDefault(), h.move(Y));
					}
				}
			});
		s = Cn(s, (k) => (0, w.jsx)(Ez, { value: t, children: k }), [t]);
		const M = Nz({ store: t, ...s }),
			q = Pc(t.useState("mounted"), s.hidden, i),
			z = q ? { ...s.style, display: "none" } : s.style;
		s = {
			id: v,
			"aria-labelledby": M,
			hidden: q,
			...s,
			ref: Wt(v ? t.setContentElement : null, s.ref),
			style: z,
			onKeyDown: A,
		};
		const C = !!t.combobox;
		return (
			(u = u ?? !C),
			u && (s = { role: "menu", "aria-orientation": b, ...s }),
			(s = Sm({ store: t, composite: u, ...s })),
			(s = Zm({ store: t, typeahead: !C, ...s })),
			s
		);
	}),
	yj = Ke(function (t) {
		return Xe(kz, TS(t));
	});
function wh(e) {
	return [e.clientX, e.clientY];
}
function X0(e, t) {
	const [i, u] = e;
	let s = !1;
	const o = t.length;
	for (let f = o, h = 0, m = f - 1; h < f; m = h++) {
		const [v, g] = t[h],
			[S, b] = t[m],
			[, p] = t[m === 0 ? f - 1 : m - 1] || [0, 0],
			E = (g - b) * (i - v) - (v - S) * (u - g);
		if (b < g) {
			if (u >= b && u < g) {
				if (E === 0) return !0;
				E > 0 && (u === b ? u > p && (s = !s) : (s = !s));
			}
		} else if (g < b) {
			if (u > g && u <= b) {
				if (E === 0) return !0;
				E < 0 && (u === b ? u < p && (s = !s) : (s = !s));
			}
		} else if (u === g && ((i >= S && i <= v) || (i >= v && i <= S))) return !0;
	}
	return s;
}
function Mz(e, t) {
	const { top: i, right: u, bottom: s, left: o } = t,
		[f, h] = e;
	return [f < o ? "left" : f > u ? "right" : null, h < i ? "top" : h > s ? "bottom" : null];
}
function J0(e, t) {
	const i = e.getBoundingClientRect(),
		{ top: u, right: s, bottom: o, left: f } = i,
		[h, m] = Mz(t, i),
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
var Oz = "div";
function xS(e, t, i, u) {
	return ha(t) ? !0 : e ? !!(mn(t, e) || (i && mn(i, e)) || u?.some((s) => xS(e, s, i))) : !1;
}
function zz({ store: e, ...t }) {
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
				zn(e, ["anchorElement"], (m) => {
					h.current = m.anchorElement;
				}),
			[],
		),
		(t = { autoFocusOnHide: i, finalFocus: h, ...t, onFocus: f }),
		t
	);
}
var W0 = (0, _.createContext)(null),
	AS = et(function ({
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
			{ portalRef: E, domReady: A } = gm(u, h.portalRef),
			M = ym(),
			q = !!o,
			z = Nt(o),
			C = !!f,
			k = Nt(f),
			O = t.useState("open"),
			Y = t.useState("mounted");
		((0, _.useEffect)(() => {
			if (!A || !Y || (!q && !C)) return;
			const W = v.current;
			return W
				? rr(
						Rn(
							"mousemove",
							(oe) => {
								if (!t || !M()) return;
								const { anchorElement: te, hideTimeout: fe, timeout: L } = t.getState(),
									$ = p.current,
									[H] = oe.composedPath(),
									ve = te;
								if (xS(H, W, ve, g)) {
									((p.current = H && ve && mn(ve, H) ? wh(oe) : null), window.clearTimeout(b.current), (b.current = 0));
									return;
								}
								if (!b.current) {
									if ($) {
										const pe = wh(oe);
										if (X0(pe, J0(W, $))) {
											if (((p.current = pe), !k(oe))) return;
											(oe.preventDefault(), oe.stopPropagation());
											return;
										}
									}
									z(oe) &&
										(b.current = window.setTimeout(() => {
											((b.current = 0), t?.hide());
										}, fe ?? L));
								}
							},
							!0,
						),
						() => clearTimeout(b.current),
					)
				: void 0;
		}, [t, M, A, Y, q, C, g, k, z]),
			(0, _.useEffect)(() => {
				if (!A || !Y || !C) return;
				const W = (le) => {
					const oe = v.current;
					if (!oe) return;
					const te = p.current;
					if (!te) return;
					const fe = J0(oe, te);
					if (X0(wh(le), fe)) {
						if (!k(le)) return;
						(le.preventDefault(), le.stopPropagation());
					}
				};
				return rr(Rn("mouseenter", W, !0), Rn("mouseover", W, !0), Rn("mouseout", W, !0), Rn("mouseleave", W, !0));
			}, [A, Y, C, k]),
			(0, _.useEffect)(() => {
				A && (O || t?.setAutoFocusOnShow(!1));
			}, [t, A, O]));
		const X = y_(O);
		(0, _.useEffect)(() => {
			if (A)
				return () => {
					X.current || t?.setAutoFocusOnShow(!1);
				};
		}, [t, A]);
		const D = (0, _.useContext)(W0);
		st(() => {
			if (i || !u || !Y || !A) return;
			const W = v.current;
			if (W) return D?.(W);
		}, [i, u, Y, A]);
		const V = (0, _.useCallback)(
			(W) => {
				S((oe) => [...oe, W]);
				const le = D?.(W);
				return () => {
					(S((oe) => oe.filter((te) => te !== W)), le?.());
				};
			},
			[D],
		);
		((h = Cn(h, (W) => (0, w.jsx)(SS, { value: t, children: (0, w.jsx)(W0.Provider, { value: V, children: W }) }), [
			t,
			V,
		])),
			(h = { ...h, ref: Wt(v, h.ref) }),
			(h = zz({ store: t, ...h })));
		const J = t.useState((W) => i || W.autoFocusOnShow);
		return (
			(h = Bm({
				store: t,
				modal: i,
				portal: u,
				autoFocusOnShow: J,
				...h,
				portalRef: E,
				hideOnEscape(W) {
					return Oc(s, W)
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
	pj = Cs(
		Ke(function (t) {
			return Xe(Oz, AS(t));
		}),
		Vm,
	),
	Dz = "div",
	jz = et(function ({
		store: t,
		modal: i = !1,
		portal: u = !!i,
		hideOnEscape: s = !0,
		autoFocusOnShow: o = !0,
		hideOnHoverOutside: f,
		alwaysVisible: h,
		...m
	}) {
		const v = Xc();
		((t = t || v), Jt(t, !1));
		const g = (0, _.useRef)(null),
			S = t.parent,
			b = t.menubar,
			p = !!S,
			E = !!b && !p;
		m = { ...m, ref: Wt(g, m.ref) };
		const { "aria-labelledby": A, ...M } = TS({ store: t, alwaysVisible: h, ...m });
		m = M;
		const [q, z] = (0, _.useState)(),
			C = t.useState("autoFocusOnShow"),
			k = t.useState("initialFocus"),
			O = t.useState("baseElement"),
			Y = t.useState("renderedItems");
		(0, _.useEffect)(() => {
			let oe = !1;
			return (
				z((te) => {
					var fe, L, $;
					if (oe || !C) return;
					if ((fe = te?.current) != null && fe.isConnected) return te;
					const H = (0, _.createRef)();
					switch (k) {
						case "first":
							H.current = ((L = Y.find((ve) => !ve.disabled && ve.element)) == null ? void 0 : L.element) || null;
							break;
						case "last":
							H.current =
								(($ = [...Y].reverse().find((ve) => !ve.disabled && ve.element)) == null ? void 0 : $.element) || null;
							break;
						default:
							H.current = O;
					}
					return H;
				}),
				() => {
					oe = !0;
				}
			);
		}, [t, C, k, Y, O]);
		const X = p ? !1 : i,
			D = !!o,
			V = !!q || !!m.initialFocus || !!X,
			J = dn(t.combobox || t, "contentElement"),
			W = dn(S?.combobox || S, "contentElement"),
			le = (0, _.useMemo)(() => {
				if (!W || !J) return;
				const oe = J.getAttribute("role"),
					te = W.getAttribute("role");
				if (!((te === "menu" || te === "menubar") && oe === "menu")) return W;
			}, [J, W]);
		return (
			le !== void 0 && (m = { preserveTabOrderAnchor: le, ...m }),
			(m = AS({
				store: t,
				alwaysVisible: h,
				initialFocus: q,
				autoFocusOnShow: D ? V && o : C || !!X,
				...m,
				hideOnEscape(oe) {
					return Oc(s, oe) ? !1 : (t?.hideAll(), !0);
				},
				hideOnHoverOutside(oe) {
					const te = t?.getState().disclosureElement;
					return (typeof f == "function" ? f(oe) : (f ?? (p ? !0 : E ? (te ? !ha(te) : !0) : !1)))
						? oe.defaultPrevented || !p || !te || (gN(te, "mouseout", oe), !ha(te))
							? !0
							: (requestAnimationFrame(() => {
									ha(te) || t?.hide();
								}),
								!1)
						: !1;
				},
				modal: X,
				portal: u,
				backdrop: p ? !1 : m.backdrop,
			})),
			(m = { "aria-labelledby": A, ...m }),
			m
		);
	}),
	Iz = Cs(
		Ke(function (t) {
			return Xe(Dz, jz(t));
		}),
		Xc,
	),
	Lz = "a",
	RS = et(function ({ store: t, showOnHover: i = !0, ...u }) {
		const s = Vm();
		((t = t || s), Jt(t, !1));
		const o = ps(u),
			f = (0, _.useRef)(0);
		((0, _.useEffect)(() => () => window.clearTimeout(f.current), []),
			(0, _.useEffect)(
				() =>
					Rn(
						"mouseleave",
						(A) => {
							if (!t) return;
							const { anchorElement: M } = t.getState();
							M && A.target === M && (window.clearTimeout(f.current), (f.current = 0));
						},
						!0,
					),
				[t],
			));
		const h = u.onMouseMove,
			m = Nt(i),
			v = ym(),
			g = De((E) => {
				if ((h?.(E), o || !t || E.defaultPrevented || f.current || !v() || !m(E))) return;
				const A = E.currentTarget;
				(t.setAnchorElement(A), t.setDisclosureElement(A));
				const { showTimeout: M, timeout: q } = t.getState(),
					z = () => {
						((f.current = 0),
							v() &&
								(t?.setAnchorElement(A),
								t?.show(),
								queueMicrotask(() => {
									t?.setDisclosureElement(A);
								})));
					},
					C = M ?? q;
				C === 0 ? z() : (f.current = window.setTimeout(z, C));
			}),
			S = u.onClick,
			b = De((E) => {
				(S?.(E), t && (window.clearTimeout(f.current), (f.current = 0)));
			}),
			p = (0, _.useCallback)(
				(E) => {
					if (!t) return;
					const { anchorElement: A } = t.getState();
					A?.isConnected || t.setAnchorElement(E);
				},
				[t],
			);
		return ((u = { ...u, ref: Wt(p, u.ref), onMouseMove: g, onClick: b }), (u = ws(u)), u);
	}),
	bj = Ke(function (t) {
		return Xe(Lz, RS(t));
	}),
	qz = "button",
	CS = et(function ({ store: t, ...i }) {
		const u = $c();
		((t = t || u), Jt(t, !1));
		const s = i.onClick,
			o = De((f) => {
				(t?.setAnchorElement(f.currentTarget), s?.(f));
			});
		return (
			(i = Cn(i, (f) => (0, w.jsx)(Bc, { value: t, children: f }), [t])),
			(i = { ...i, onClick: o }),
			(i = Tm({ store: t, ...i })),
			(i = O_({ store: t, ...i })),
			i
		);
	}),
	_j = Ke(function (t) {
		return Xe(qz, CS(t));
	}),
	Uz = "button";
function $z(e, t) {
	return {
		ArrowDown: t === "bottom" || t === "top" ? "first" : !1,
		ArrowUp: t === "bottom" || t === "top" ? "last" : !1,
		ArrowRight: t === "right" ? "first" : !1,
		ArrowLeft: t === "left" ? "first" : !1,
	}[e.key];
}
function eb(e, t) {
	return !!e?.some((i) => (!i.element || i.element === t ? !1 : i.element.getAttribute("aria-expanded") === "true"));
}
var Bz = et(function ({ store: t, focusable: i, accessibleWhenDisabled: u, showOnHover: s, ...o }) {
		const f = Xc();
		((t = t || f), Jt(t, !1));
		const h = (0, _.useRef)(null),
			m = t.parent,
			v = t.menubar,
			g = !!m,
			S = !!v && !g,
			b = ps(o),
			p = () => {
				const X = h.current;
				X && (t?.setDisclosureElement(X), t?.setAnchorElement(X), t?.show());
			},
			E = o.onFocus,
			A = De((X) => {
				if ((E?.(X), b || X.defaultPrevented || (t?.setAutoFocusOnShow(!1), t?.setActiveId(null), !v) || !S)) return;
				const { items: D } = v.getState();
				eb(D, X.currentTarget) && p();
			}),
			M = dn(t, (X) => X.placement.split("-")[0]),
			q = o.onKeyDown,
			z = De((X) => {
				if ((q?.(X), b || X.defaultPrevented)) return;
				const D = $z(X, M);
				D && (X.preventDefault(), p(), t?.setAutoFocusOnShow(!0), t?.setInitialFocus(D));
			}),
			C = o.onClick,
			k = De((X) => {
				if ((C?.(X), X.defaultPrevented || !t)) return;
				const D = !X.detail,
					{ open: V } = t.getState();
				((!V || D) && ((!g || D) && t.setAutoFocusOnShow(!0), t.setInitialFocus(D ? "first" : "container")), g && p());
			});
		((o = Cn(o, (X) => (0, w.jsx)(ES, { value: t, children: X }), [t])),
			g && (o = { ...o, render: (0, w.jsx)(Sc.div, { render: o.render }) }));
		const O = ji(o.id),
			Y = dn(m?.combobox || m, "contentElement");
		return (
			(o = {
				id: O,
				role: g || S ? s_(Y, "menuitem") : void 0,
				"aria-haspopup": Mc(t.useState("contentElement"), "menu"),
				...o,
				ref: Wt(h, o.ref),
				onFocus: A,
				onKeyDown: z,
				onClick: k,
			}),
			(o = RS({
				store: t,
				focusable: i,
				accessibleWhenDisabled: u,
				...o,
				showOnHover: (X) => {
					if (
						!(() => {
							if (typeof s == "function") return s(X);
							if (s != null) return s;
							if (g) return !0;
							if (!v) return !1;
							const { items: J } = v.getState();
							return S && eb(J);
						})()
					)
						return !1;
					const V = S ? v : m;
					return (V && V.setActiveId(X.currentTarget.id), !0);
				},
			})),
			(o = CS({ store: t, toggleOnClick: !g, focusable: i, accessibleWhenDisabled: u, ...o })),
			(o = Zm({ store: t, typeahead: S, ...o })),
			o
		);
	}),
	Vz = Ke(function (t) {
		return Xe(Uz, Bz(t));
	}),
	Zz = "div";
function Hz(e, t, i) {
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
var Pz = et(function ({
		store: t,
		hideOnClick: i = !0,
		preventScrollOnKeyDown: u = !0,
		focusOnHover: s,
		blurOnHoverEnd: o,
		...f
	}) {
		const h = wz(!0),
			m = _z();
		((t = t || h || m), Jt(t, !1));
		const v = f.onClick,
			g = Nt(i),
			S = "hideAll" in t ? t.hideAll : void 0,
			b = !!S,
			p = De((E) => {
				(v?.(E),
					!E.defaultPrevented &&
						(g_(E) || v_(E) || (S && E.currentTarget.getAttribute("aria-haspopup") !== "menu" && g(E) && S())));
			});
		return (
			(f = {
				role: s_(
					dn(t, (E) => ("contentElement" in E ? E.contentElement : null)),
					"menuitem",
				),
				...f,
				onClick: p,
			}),
			(f = Nm({ store: t, preventScrollOnKeyDown: u, ...f })),
			(f = km({
				store: t,
				...f,
				focusOnHover(E) {
					const A = () => (typeof s == "function" ? s(E) : (s ?? !0));
					if (!t || !A()) return !1;
					const { baseElement: M, items: q } = t.getState();
					return b
						? (E.currentTarget.hasAttribute("aria-expanded") && E.currentTarget.focus(), !0)
						: Hz(M, q, E.currentTarget)
							? (E.currentTarget.focus(), !0)
							: !1;
				},
				blurOnHoverEnd(E) {
					return typeof o == "function" ? o(E) : (o ?? b);
				},
			})),
			f
		);
	}),
	Qz = Dc(
		Ke(function (t) {
			return Xe(Zz, Pz(t));
		}),
	);
function Kz(e = {}) {
	var t;
	const i = (t = e.store) == null ? void 0 : t.getState(),
		u = lS({ ...e, placement: Ie(e.placement, i?.placement, "bottom") }),
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
function Yz(e, t, i) {
	return (Xt(e, i, "timeout"), Xt(e, i, "showTimeout"), Xt(e, i, "hideTimeout"), sS(e, t, i));
}
function Gz({ combobox: e, parent: t, menubar: i, ...u } = {}) {
	const s = !!i && !t,
		o = Zc(
			u.store,
			C_(t, ["values"]),
			Rm(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
		);
	const f = o.getState(),
		h = fS({ ...u, store: o, orientation: Ie(u.orientation, f.orientation, "vertical") }),
		m = Kz({
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
		Hn(v, () =>
			zn(v, ["mounted"], (g) => {
				g.mounted || v.setState("activeId", null);
			}),
		),
		Hn(v, () =>
			zn(t, ["orientation"], (g) => {
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
								E = c_(S, p);
							return E === p ? b : { ...b, [g]: E !== void 0 && E };
						}));
			},
		}
	);
}
function Fz(e, t, i) {
	return (
		rl(t, [i.combobox, i.parent, i.menubar]),
		Xt(e, i, "values", "setValues"),
		Object.assign(Yz(dS(e, t, i), t, i), { combobox: i.combobox, parent: i.parent, menubar: i.menubar })
	);
}
function Xz(e = {}) {
	const t = wS(),
		i = bz(),
		u = Vc();
	e = {
		...e,
		parent: e.parent !== void 0 ? e.parent : t,
		menubar: e.menubar !== void 0 ? e.menubar : i,
		combobox: e.combobox !== void 0 ? e.combobox : u,
	};
	const [s, o] = Hc(Gz, e);
	return Fz(s, o, e);
}
function Jz(e = {}) {
	return (0, w.jsx)(ES, { value: Xz(e), children: e.children });
}
var Wz = "hr",
	eD = et(function ({ store: t, ...i }) {
		const u = wS();
		return ((t = t || u), (i = mS({ store: t, ...i })), i);
	}),
	tD = Ke(function (t) {
		return Xe(Wz, eD(t));
	}),
	nD = (0, _.memo)(function (t) {
		const { channelName: i, items: u } = t;
		return (0, w.jsxs)(Jz, {
			placement: "bottom-end",
			children: [
				(0, w.jsx)(Vz, {
					className: "ChannelRowMenu-trigger",
					"aria-label": `Actions for #${i}`,
					children: (0, w.jsx)(Qk, { size: 16, "aria-hidden": "true" }),
				}),
				(0, w.jsx)(Iz, {
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					className: "ChannelRowMenu-popover",
					"aria-label": `Actions for #${i}`,
					children: u.map((s) =>
						"separator" in s
							? (0, w.jsx)(tD, { className: "ChannelRowMenu-separator" }, s.id)
							: (0, w.jsx)(
									Qz,
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
	rD = 300 * 1e3;
function iD(e) {
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
					(p === void 0 || m - p >= rD) && v.push(S);
				}
				for (let S = 0; S < v.length; S += 50) {
					const b = v.slice(S, S + 50),
						p = e.members
							.resolve(b)
							.then((E) => {
								for (const A of b) (t.current.set(A, E[A] ?? null), i.current.set(A, Date.now()));
							})
							.catch(() => {
								for (const E of b) i.current.delete(E);
							});
					for (const E of b) u.current.set(E, p);
					(p.then(() => {
						for (const E of b) u.current.get(E) === p && u.current.delete(E);
					}),
						g.add(p));
				}
				g.size !== 0 && (await Promise.all(g), s((S) => S + 1));
			},
			[e],
		);
	return (0, _.useMemo)(() => ({ get: o, resolve: f }), [o, f]);
}
function aD(e) {
	const [t, i] = (0, _.useState)(null);
	return (
		(0, _.useEffect)(() => {
			let u = !1;
			return (
				e.members.list({ limit: 100 }).then((s) => {
					if (!u) {
						if ("_nay" in s) {
							i({ members: [], error: r_(s._nay.name), truncated: !1 });
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
function kS(e) {
	const t = aD(e.client);
	if (t === null) return (0, w.jsx)("p", { className: "channel-status", role: "status", children: "Loading people…" });
	if (t.error !== null) return (0, w.jsx)("p", { className: "form-error", role: "alert", children: t.error });
	const i = t.members
		.filter((u) => u.userId !== e.selfUserId)
		.sort((u, s) => ac(u.displayName).localeCompare(ac(s.displayName)));
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
											ac(u.displayName),
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
function tb(e) {
	const t = (0, _.useId)(),
		i = (0, _.useId)(),
		u = (0, _.useId)(),
		s = (0, _.useId)(),
		[o, f] = (0, _.useState)(e.initialName),
		[h, m] = (0, _.useState)(e.initialTopic),
		[v, g] = (0, _.useState)(!1),
		[S, b] = (0, _.useState)([]),
		[p, E] = (0, _.useState)(null),
		A = e.busy || e.fieldsLocked,
		M = () => {
			if (e.busy || e.waiting) return;
			const C = o.trim();
			if (C.length < 1 || C.length > 64) {
				E("Enter a name between 1 and 64 characters.");
				return;
			}
			const k = h.trim();
			if (k.length > 250) {
				E("Keep the topic under 250 characters.");
				return;
			}
			(E(null), e.onSubmit(C, k, { isPrivate: v, userIds: S }));
		},
		q = p ?? e.error,
		z = () => {
			e.busy || e.onClose();
		};
	return (0, w.jsxs)(ul, {
		labelledBy: t,
		onClose: z,
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
							C.key === "Enter" && (C.preventDefault(), M());
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
							C.key === "Enter" && (C.preventDefault(), M());
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
											(0, w.jsx)(kS, {
												client: e.privacy.client,
												selfUserId: e.privacy.selfUserId,
												selected: S,
												disabled: A,
												onToggle: (C, k) => b((O) => (k ? [...O, C] : O.filter((Y) => Y !== C))),
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
						onClick: z,
						children: "Cancel",
					}),
					(0, w.jsx)("button", {
						type: "button",
						className: "button button-primary",
						disabled: e.busy || e.waiting,
						onClick: M,
						children: e.busy ? "Saving…" : e.waiting ? "Checking…" : e.fieldsLocked ? "Retry" : e.submitLabel,
					}),
				],
			}),
		],
	});
}
function uD(e) {
	const t = (0, _.useId)(),
		[i, u] = (0, _.useState)(void 0),
		[s, o] = (0, _.useState)(!1),
		[f, h] = (0, _.useState)(null),
		[m, v] = (0, _.useState)(!1),
		[g, S] = (0, _.useState)(null),
		b = (0, _.useRef)(!1),
		p = (0, _.useRef)(!0),
		E = (0, _.useRef)(0);
	(0, _.useEffect)(
		() => (
			(p.current = !0),
			() => {
				((p.current = !1), (E.current += 1));
			}
		),
		[],
	);
	const A = (0, _.useCallback)(() => {
		const k = (E.current += 1);
		return (
			o(!1),
			h(null),
			Promise.resolve()
				.then(() => e.client.scopes.listPrincipals({ scopeId: e.channel.key }))
				.then((O) => {
					if (!p.current || E.current !== k) return { kind: "cancelled" };
					const Y = ss(O);
					return (
						o(!0),
						Y === null || "_nay" in Y
							? (u(void 0),
								h(Y !== null && "_nay" in Y ? Y._nay.message : "The people list response was invalid."),
								{ kind: "unavailable" })
							: (u(Y._yay),
								Y._yay !== null && e.memberNames.resolve(Y._yay.map((X) => X.userId)),
								{ kind: "exact", principals: Y._yay })
					);
				})
				.catch(() =>
					!p.current || E.current !== k
						? { kind: "cancelled" }
						: (o(!0), u(void 0), h("Failed to read who can access this"), { kind: "unavailable" }),
				)
		);
	}, [e.client, e.channel.key, e.memberNames]);
	(0, _.useEffect)(() => {
		A();
	}, [A]);
	const M = (k) => {
			b.current ||
				((b.current = !0),
				v(!0),
				S(null),
				k()
					.then((O) => {
						if ("_nay" in O) {
							if (O._nay.name === "unavailable")
								return A().then((Y) => {
									Y.kind !== "cancelled" &&
										S(
											Y.kind === "unavailable"
												? "We could not confirm the change, and the current people list could not be loaded."
												: Y.principals === null
													? "We could not confirm the change, and this people list is no longer readable."
													: "We could not confirm the change. The current people list is shown.",
										);
								});
							S(O._nay.message);
							return;
						}
						return A().then(() => {});
					})
					.finally(() => {
						((b.current = !1), v(!1));
					}));
		},
		q = new Set((i ?? []).map((k) => k.userId)),
		z = (i ?? []).some((k) => k.userId === e.selfUserId && k.level === "manage"),
		C = () => {
			m || e.onClose();
		};
	return (0, w.jsxs)(ul, {
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
													z && k.userId !== e.selfUserId
														? (0, w.jsx)("button", {
																type: "button",
																className: "button channel-item-action",
																disabled: m,
																onClick: () =>
																	M(() =>
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
			s && i !== void 0 && i !== null && z
				? (0, w.jsxs)("div", {
						className: "field",
						children: [
							(0, w.jsx)("p", { className: "field-label", children: "Add people" }),
							(0, w.jsx)(kS, {
								client: e.client,
								selfUserId: e.selfUserId,
								selected: [...q],
								disabled: m,
								onToggle: (k, O) =>
									M(() =>
										O
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
function lD(e) {
	const t = (0, _.useId)(),
		i = () => {
			e.busy || e.onClose();
		};
	return (0, w.jsxs)(ul, {
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
function sD(e) {
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
					const p = ss(b);
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
	return (0, w.jsxs)(ul, {
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
var oD = [
	{ key: "view:unreads", name: "Unreads" },
	{ key: "view:threads", name: "Threads" },
	{ key: "view:activity", name: "Activity" },
];
function Hm(e) {
	return e === null ? "Former member" : (e ?? "…");
}
function Pm(e) {
	return e.length > 80 ? `${e.slice(0, 80)}…` : e;
}
function cD(e) {
	const t = [];
	for (const s of e.channels) {
		if (yn(s.key)) {
			const f = e.privateActivity.get(s.key),
				h = e.privateCursors.get(s.key)?.activity ?? Dr;
			f !== void 0 && !is(h, f.activity) && t.push({ channel: s, at: f.at, mentionCount: 0, preview: null });
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
											(0, w.jsx)("span", { className: "view-row-time", children: Nc(s.at, u) }),
											s.preview !== null
												? (0, w.jsx)("span", {
														className: "view-row-preview",
														children: `${Hm(i.get(s.preview.createdBy))}: ${Pm(s.preview.value.text)}`,
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
function fD(e) {
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
															(0, w.jsx)("span", { className: "view-row-title", children: Hm(u.get(h.createdBy)) }),
															(0, w.jsx)("span", { className: "view-row-time", children: Nc(h.timestamp, s) }),
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
function dD(e) {
	const [t, i] = (0, _.useState)([]),
		[u, s] = (0, _.useState)(!1),
		[o, f] = (0, _.useState)(!1);
	(0, _.useEffect)(() => {
		const S = uc(pc);
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
		const b = hs(S.key),
			p = b === null ? null : cm(b),
			E = p === null ? void 0 : h.get(p);
		if (b === null || E === void 0) continue;
		const A = m.get(b);
		A === void 0 ? m.set(b, { channel: E, newest: S, count: 1 }) : (A.count += 1);
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
												(0, w.jsx)("span", { className: "view-row-time", children: Nc(b.newest.timestamp, g) }),
												(0, w.jsx)("span", {
													className: "view-row-preview",
													children: `${b.count} ${b.count === 1 ? "reply" : "replies"} · ${Hm(v.get(b.newest.createdBy))}: ${Pm(b.newest.value.text)}`,
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
function hD(e) {
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
function mD(e) {
	return `--bonobo-${e.replace(/[A-Z]/gu, (t) => `-${t.toLowerCase()}`)}`;
}
var nb = 8,
	vD = 2e3,
	ca = 250,
	rb = 4e3,
	ib = 250,
	gD = 4e3,
	yD = 250,
	pD = 4e3,
	bD =
		"Chitchat cannot confirm whether this private channel was created because no channel is readable at its saved key. Retry checks the same key, or Cancel.",
	_D = "This private channel exists, but you are not in its current access list. Retry checks the same key, or Cancel.",
	ab = 250,
	ub = 4e3,
	lb = 250,
	SD = 4e3,
	Eh = "Wait for pending message changes to finish before leaving this channel or thread.";
function wD(e) {
	const t = e.appendActivity;
	return (
		dk(e.scopeId) &&
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
function ED(e) {
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
function ss(e) {
	if (typeof e != "object" || e === null) return null;
	if ("_yay" in e) {
		const t = e._yay;
		return t === null || ED(t) ? { _yay: t } : null;
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
function Ri(e, t) {
	return { messages: Math.max(e.messages, t.messages), replies: Math.max(e.replies, t.replies) };
}
function is(e, t) {
	return e.messages >= t.messages && e.replies >= t.replies;
}
function TD(e) {
	let t = 0,
		i = Dr;
	for (const u of e.appendActivity)
		u.collection === "messages"
			? ((t = Math.max(t, u.at)), (i = Ri(i, { messages: u.sequence, replies: 0 })))
			: u.collection === "replies" && ((t = Math.max(t, u.at)), (i = Ri(i, { messages: 0, replies: u.sequence })));
	return { at: t, activity: i };
}
function sb(e) {
	((e.cancelled = !0), e.retryTimer !== null && clearTimeout(e.retryTimer));
}
function ob(e, t) {
	return t.revision <= e.revision
		? !1
		: ((e.revision = t.revision),
			(e.storedAt = Math.max(e.storedAt, t.at)),
			(e.storedActivity = Ri(e.storedActivity, t.activity)),
			(e.waitingForRefresh = !1),
			!0);
}
function rc(e) {
	((e.cancelled = !0), e.retryTimer !== null && (clearTimeout(e.retryTimer), (e.retryTimer = null)));
}
function Th(e) {
	((e.cancelled = !0), e.retryTimer !== null && (clearTimeout(e.retryTimer), (e.retryTimer = null)));
}
function xh(e) {
	((e.cancelled = !0), e.retryTimer !== null && (clearTimeout(e.retryTimer), (e.retryTimer = null)));
}
function xD(e) {
	const { client: t } = e,
		i = t.context.userId,
		u = iD(t),
		[s, o] = (0, _.useState)([]),
		[f, h] = (0, _.useState)([]),
		[m, v] = (0, _.useState)({}),
		[g, S] = (0, _.useState)(!1),
		[b, p] = (0, _.useState)(null),
		[E, A] = (0, _.useState)(!1),
		[M, q] = (0, _.useState)(null),
		[z, C] = (0, _.useState)([]),
		[k, O] = (0, _.useState)(!1),
		[Y, X] = (0, _.useState)({}),
		[D, V] = (0, _.useState)(0),
		[J, W] = (0, _.useState)(0),
		[le, oe] = (0, _.useState)(null),
		[te, fe] = (0, _.useState)({}),
		[L, $] = (0, _.useState)(null),
		[H, ve] = (0, _.useState)(null),
		[pe, Ze] = (0, _.useState)(!1),
		[N, I] = (0, _.useState)(null),
		[se, ae] = (0, _.useState)(!1),
		[be, Te] = (0, _.useState)(!1),
		[ke, Ue] = (0, _.useState)(!1),
		[Ye, St] = (0, _.useState)(!1),
		[At, vn] = (0, _.useState)(!1),
		[en, Ge] = (0, _.useState)(null),
		[ge, Ce] = (0, _.useState)(!1),
		[tt, $e] = (0, _.useState)({ sequence: 0, text: "" }),
		[Bt, Je] = (0, _.useState)(""),
		[ce, ze] = (0, _.useState)(!1),
		nt = (0, _.useRef)(null),
		Me = (0, _.useRef)(null),
		yt = (0, _.useRef)(null),
		pn = (0, _.useRef)(null),
		at = (0, _.useRef)(null),
		Vt = (0, _.useRef)(null),
		pr = (0, _.useRef)(null),
		Yr = (0, _.useRef)(new Set());
	Yr.current = new Set(s.map((T) => T.key));
	const Gr = (0, _.useRef)(null),
		Pn = (0, _.useRef)(null),
		kn = (0, _.useRef)(null),
		pt = (0, _.useRef)(null),
		tn = (0, _.useRef)(new Map()),
		ot = (0, _.useRef)(new Map()),
		br = (0, _.useRef)(new Map()),
		ar = (0, _.useRef)(new Set()),
		_n = (0, _.useRef)(new Map()),
		Zt = (0, _.useRef)(new Map()),
		Ht = (0, _.useRef)(new Map()),
		Qn = (0, _.useRef)(new Set()),
		Nn = (0, _.useRef)(new Map()),
		ur = (0, _.useRef)(new Map()),
		Sn = (0, _.useRef)(new Map()),
		_r = (0, _.useRef)(new Map()),
		lr = (0, _.useRef)(new Map()),
		Pt = (0, _.useRef)(new Set()),
		jn = (0, _.useRef)(!1),
		Sr = (0, _.useRef)(0),
		Lt = (0, _.useRef)(!0),
		Qt = (0, _.useRef)(new Map()),
		Sa = (0, _.useRef)(new Set()),
		In = (0, _.useRef)(new Map()),
		nn = (0, _.useRef)(new Map()),
		Li = (0, _.useRef)(null),
		[wa, qt] = (0, _.useState)(!1),
		Dt = (0, _.useCallback)(
			(T, R) => {
				const B = pr.current;
				if (B !== null && B.revision > T) return;
				const P = Date.now(),
					de = {
						key: o0(i),
						value: R,
						revision: T,
						createdBy: i,
						updatedBy: i,
						createdAt: B?.createdAt ?? P,
						updatedAt: P,
						ownership: "owned",
						timestamp: B?.timestamp ?? P,
					};
				((pr.current = de), q(de));
			},
			[i],
		),
		rn = (0, _.useCallback)(
			function T() {
				const R = pt.current,
					B = pr.current,
					P = B?.revision ?? 0;
				if (
					!Lt.current ||
					R === null ||
					R.running ||
					R.retryTimer !== null ||
					(P === R.attemptedRevision && !R.retryCurrentRevision)
				)
					return;
				if (R.waitBeforeRetry) {
					const Ee = R.retryDelayMs;
					((R.waitBeforeRetry = !1),
						(R.retryTimer = setTimeout(() => {
							((R.retryTimer = null), (R.retryDelayMs = Math.min(Ee * 2, rb)), T());
						}, Ee)));
					return;
				}
				const de = { channels: R.channels };
				((R.channels = {}), (R.attemptedRevision = P), (R.retryCurrentRevision = !1));
				const he = R.needsCompaction;
				R.needsCompaction = !1;
				const ye = Za(B?.value ?? { channels: {} }, de),
					Re = he
						? { channels: Object.fromEntries(Object.entries(ye.channels).filter(([Ee]) => Yr.current.has(Ee))) }
						: ye;
				if (he && Object.keys(Re.channels).length === Object.keys(ye.channels).length) {
					((R.channels = Za({ channels: R.channels }, de).channels),
						(R.needsCompaction = !0),
						console.warn("[chitchat] The read-cursor map is still too large after cleanup"));
					return;
				}
				((R.running = !0),
					t.data
						.putOwned({ collection: "cursors", key: "me", value: Re, expectedRevision: P })
						.then((Ee) => {
							if (((R.running = !1), !(!Lt.current || pt.current !== R))) {
								if ("_yay" in Ee) ((R.retryDelayMs = ca), Dt(Ee._yay.revision, Re));
								else if (Ee._nay.name === "conflict")
									((R.channels = Za({ channels: R.channels }, de).channels),
										(R.needsCompaction ||= he),
										(R.retryCurrentRevision = R.waitBeforeRetry),
										(R.retryDelayMs = ca));
								else if (Ee._nay.name === "storage_full") {
									if (
										((R.channels = Za({ channels: R.channels }, de).channels),
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
										? ((R.channels = Za({ channels: R.channels }, de).channels),
											(R.needsCompaction ||= he),
											(R.retryCurrentRevision = !0),
											(R.waitBeforeRetry = !0))
										: console.warn("[chitchat] A read-cursor retry was refused", { message: Ee._nay.message });
								if (Object.keys(R.channels).length === 0) {
									pt.current = null;
									return;
								}
								T();
							}
						})
						.catch(() => {
							((R.running = !1),
								!(!Lt.current || pt.current !== R) &&
									((R.channels = Za({ channels: R.channels }, de).channels),
									(R.needsCompaction ||= he),
									(R.retryCurrentRevision = !0),
									(R.waitBeforeRetry = !0),
									T()));
						}));
			},
			[Dt, t],
		),
		wr = (T, R, B) => {
			if (!Lt.current) return;
			const P = pt.current ?? {
				channels: {},
				attemptedRevision: R,
				running: !1,
				needsCompaction: !1,
				retryCurrentRevision: !1,
				waitBeforeRetry: !1,
				retryDelayMs: ca,
				retryTimer: null,
			};
			((P.channels = Za({ channels: P.channels }, T).channels),
				(P.attemptedRevision = Math.max(P.attemptedRevision, R)),
				B === "storage_full"
					? ((P.needsCompaction = !0), (P.retryCurrentRevision = !0))
					: B === "unavailable" && ((P.retryCurrentRevision = !0), P.retryTimer === null && (P.waitBeforeRetry = !0)),
				(pt.current = P),
				rn());
		},
		qr = (0, _.useCallback)(
			function T(R) {
				const B = () => R.storedAt >= R.pendingAt && is(R.storedActivity, R.pendingActivity),
					P = (Ee) => {
						if (R.cancelled || !Lt.current || !Pt.current.has(R.channelKey) || B() || R.retryTimer !== null) return;
						const wt = R.retryDelayMs;
						R.retryTimer = setTimeout(() => {
							((R.retryTimer = null), (R.retryDelayMs = Math.min(wt * 2, rb)), Ee());
						}, wt);
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
						const Ee = `${c0(R.channelKey)}:${i}`;
						t.fetchJson("/api/v1/plugin-data/read", { body: { collection: "channels", key: Ee } })
							.then((wt) => {
								if (Qt.current.get(R.channelKey) !== R || R.cancelled) return;
								if (((R.running = !1), !R.waitingForRefresh)) {
									T(R);
									return;
								}
								const We = Go.safeParse(wt),
									Oe = We.success ? f0(We.data.document) : null;
								if (Oe !== null && Oe.key === Ee && Oe.channelKey === R.channelKey && Oe.createdBy === i && ob(R, Oe)) {
									((R.retryDelayMs = ca), T(R));
									return;
								}
								P(de);
							})
							.catch(() => {
								if (!(Qt.current.get(R.channelKey) !== R || R.cancelled)) {
									if (((R.running = !1), !R.waitingForRefresh)) {
										T(R);
										return;
									}
									P(de);
								}
							});
					};
				if (R.running || R.retryTimer !== null || R.cancelled || !Pt.current.has(R.channelKey)) return;
				if (R.waitingForRefresh) {
					de();
					return;
				}
				if (B()) {
					Qt.current.delete(R.channelKey);
					return;
				}
				const he = Math.max(R.pendingAt, R.storedAt),
					ye = Ri(R.pendingActivity, R.storedActivity),
					Re = R.revision;
				((R.running = !0),
					t.data
						.putOwned({
							collection: "channels",
							key: c0(R.channelKey),
							value: { at: he, activity: ye },
							expectedRevision: Re,
						})
						.then((Ee) => {
							if (!(Qt.current.get(R.channelKey) !== R || R.cancelled)) {
								if (((R.running = !1), "_yay" in Ee)) {
									((R.retryDelayMs = ca),
										(R.revision = Math.max(R.revision, Ee._yay.revision)),
										(R.storedAt = Math.max(R.storedAt, he)),
										(R.storedActivity = Ri(R.storedActivity, ye)),
										T(R));
									return;
								}
								if (Ee._nay.name === "conflict") {
									if (R.revision !== Re) {
										T(R);
										return;
									}
									((R.waitingForRefresh = !0), de());
									return;
								}
								if (Ee._nay.name === "unavailable") {
									P(() => T(R));
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
								console.warn("[chitchat] A private read-cursor write failed", { message: Zn(Ee) }),
								P(() => T(R)));
						}));
			},
			[t, i],
		),
		Er = (0, _.useMemo)(() => new Set(f.map((T) => T.scopeId)), [f]),
		li = (0, _.useMemo)(
			() => f.map((T) => ({ scopeId: T.scopeId, keyPrefix: T.keyPrefix, collections: T.collections })),
			[
				JSON.stringify(
					f
						.map((T) => ({ scopeId: T.scopeId, keyPrefix: T.keyPrefix, collections: [...T.collections].sort() }))
						.sort((T, R) => T.scopeId.localeCompare(R.scopeId)),
				),
			],
		),
		qi = (0, _.useMemo)(() => [...li].sort((T, R) => T.scopeId.localeCompare(R.scopeId)).slice(0, nb), [li]),
		Kn = (0, _.useMemo)(() => {
			const T = [...li].sort((B, P) => B.scopeId.localeCompare(P.scopeId)),
				R = le !== null && yn(le) ? T.find((B) => B.scopeId === le) : void 0;
			return R === void 0 || qi.some((B) => B.scopeId === R.scopeId)
				? qi
				: [R, ...T.filter((B) => B.scopeId !== R.scopeId).slice(0, 7)].sort((B, P) =>
						B.scopeId.localeCompare(P.scopeId),
					);
		}, [qi, li, le]),
		Ui = (0, _.useMemo)(() => new Set(Kn.map((T) => T.scopeId)), [Kn]),
		Kt = [...s, ...Object.entries(m).flatMap(([T, R]) => (Er.has(T) && Ui.has(T) ? R : []))].sort((T, R) =>
			T.value.name.localeCompare(R.value.name),
		),
		Yn = new Map(
			Object.entries(Y).flatMap(([T, R]) => (Er.has(T) && Ui.has(T) ? R.map((B) => [B.channelKey, B]) : [])),
		),
		Mn = new Map(f.map((T) => [T.scopeId, TD(T)])),
		sr = (0, _.useMemo)(() => Mk({ docs: z, cursorChannels: M?.value.channels ?? {}, selfUserId: i }), [z, M, i]),
		Rt = (T) => {
			if (T.key === le || T.value.archivedAt !== null) return !1;
			if (yn(T.key)) {
				const R = Mn.get(T.key)?.activity ?? Dr;
				return !is(Yn.get(T.key)?.activity ?? Dr, R);
			}
			return sr.has(T.key);
		},
		Ea = (T) => (yn(T.key) ? (Yn.get(T.key)?.at ?? 0) : (M?.value.channels[T.key] ?? 0)),
		G = (T) => (T.key === le || T.value.archivedAt !== null ? 0 : (sr.get(T.key)?.mentionCount ?? 0)),
		me = (0, _.useId)(),
		we = (0, _.useId)(),
		je = (0, _.useCallback)((T) => {
			$e((R) => ({ sequence: R.sequence + 1, text: T }));
		}, []),
		He = (0, _.useCallback)((T) => {
			const R = (ot.current.get(T) ?? 0) + 1;
			(ot.current.set(T, R), fe(Object.fromEntries(ot.current)));
		}, []),
		Ct = (0, _.useCallback)((T) => {
			const R = ot.current.get(T) ?? 0;
			R !== 0 && (R === 1 ? ot.current.delete(T) : ot.current.set(T, R - 1), fe(Object.fromEntries(ot.current)));
		}, []),
		bt = (0, _.useCallback)(
			(T) => {
				if (!Qn.current.has(T.scopeId) || (ur.current.get(T.scopeId) ?? -1) >= T.membershipRevision) return;
				const R = Sn.current.get(T.scopeId);
				if (R !== void 0) {
					R.scope = T;
					return;
				}
				const B = { scope: T, running: !1, retryDelayMs: ab, retryTimer: null, cancelled: !1 };
				Sn.current.set(T.scopeId, B);
				const P = () => Lt.current && !B.cancelled && Sn.current.get(T.scopeId) === B,
					de = () => {
						(xh(B), Sn.current.get(T.scopeId) === B && Sn.current.delete(T.scopeId));
					},
					he = () => {
						const Re = B.scope;
						(de(),
							Qn.current.delete(Re.scopeId),
							ur.current.delete(Re.scopeId),
							In.current.delete(Re.scopeId),
							ar.current.delete(Re.scopeId),
							_n.current.delete(Re.scopeId),
							Zt.current.delete(Re.scopeId));
						const Ee = new Set(Pt.current);
						(Ee.add(Re.scopeId),
							(Pt.current = Ee),
							_r.current.set(Re.scopeId, Re.membershipRevision),
							(Sr.current += 1),
							h((wt) => {
								const We = wt.findIndex((ut) => ut.scopeId === Re.scopeId);
								if (We === -1) return [...wt, Re];
								const Oe = [...wt];
								return ((Oe[We] = Re), Oe);
							}),
							V(Sr.current));
					},
					ye = () => {
						if (!P() || B.running || B.retryTimer !== null) return;
						B.running = !0;
						const Re = B.scope.membershipRevision,
							Ee = () => {
								if (!P() || B.retryTimer !== null) return;
								const We = B.retryDelayMs;
								B.retryTimer = setTimeout(() => {
									((B.retryTimer = null), (B.retryDelayMs = Math.min(We * 2, ub)), ye());
								}, We);
							},
							wt = () => {
								if (((B.running = !1), B.scope.membershipRevision !== Re)) {
									ye();
									return;
								}
								(ur.current.set(T.scopeId, Re), de());
							};
						Promise.resolve()
							.then(() => t.fetchJson("/api/v1/plugin-data/read", { body: { collection: "channels", key: T.scopeId } }))
							.then((We) => {
								if (!P()) return;
								const Oe = Go.safeParse(We);
								if (!Oe.success) {
									((B.running = !1), Ee());
									return;
								}
								if (Oe.data.document === null) {
									wt();
									return;
								}
								const ut = ts(Oe.data.document);
								if (Oe.data.document.collection !== "channels" || ut === null || ut.key !== T.scopeId || !yn(ut.key)) {
									((B.running = !1), Ee());
									return;
								}
								return t.scopes.listPrincipals({ scopeId: ut.key }).then(($n) => {
									if (!P()) return;
									B.running = !1;
									const vl = ss($n);
									if (vl === null || "_nay" in vl) {
										Ee();
										return;
									}
									const lu = vl._yay;
									if (lu === null) {
										wt();
										return;
									}
									if (B.scope.membershipRevision !== Re) {
										ye();
										return;
									}
									if (lu.some((gl) => gl.userId === i)) {
										he();
										return;
									}
									(ur.current.set(T.scopeId, Re), de());
								});
							})
							.catch(() => {
								P() && ((B.running = !1), Ee());
							});
					};
				ye();
			},
			[t, i],
		);
	((0, _.useEffect)(() => {
		if (tt.text === "") return;
		Je("");
		const T = requestAnimationFrame(() => Je(tt.text));
		return () => cancelAnimationFrame(T);
	}, [tt]),
		(0, _.useEffect)(() => {
			const T = (B) => {
					const P = B.target;
					P instanceof Node && !nt.current?.contains(P) && (at.current = null);
				},
				R = () => {
					at.current = null;
				};
			return (
				document.addEventListener("focusin", T),
				window.addEventListener("blur", R),
				() => {
					(document.removeEventListener("focusin", T), window.removeEventListener("blur", R));
				}
			);
		}, []),
		(0, _.useEffect)(() => {
			const T = window.matchMedia("(max-width: 719px)");
			ze(T.matches);
			const R = (B) => {
				const P = at.current;
				((Vt.current = B.matches
					? H !== null && (P === "sidebar" || P === "separator")
						? "thread"
						: P === "sidebar" && !ge
							? "drawer"
							: null
					: P === "drawer"
						? "selected"
						: null),
					ze(B.matches));
			};
			return (T.addEventListener("change", R), () => T.removeEventListener("change", R));
		}, [ge, H]),
		(0, _.useLayoutEffect)(() => {
			const T = Vt.current;
			Vt.current = null;
			const R = () => {
				const B = nt.current?.querySelector(".thread") ?? null;
				if (B === null) return !1;
				const P = B?.querySelector(".thread-head button") ?? null;
				return (
					P?.focus(),
					document.activeElement !== P && B.focus(),
					document.activeElement === P || document.activeElement === B
				);
			};
			if (T === "drawer") (H === null || !R()) && yt.current?.focus();
			else if (T === "thread") R() || yt.current?.focus();
			else if (T === "selected") {
				const B = Me.current?.querySelector('[aria-current="page"]') ?? null;
				(B?.focus(), document.activeElement !== B && Me.current?.focus());
			}
		}, [ce, H]),
		(0, _.useEffect)(() => {
			const T = (B) => {
					const P = document.documentElement;
					P.classList.toggle("theme-light", B.mode === "light");
					for (const [de, he] of Object.entries(B.tokens)) P.style.setProperty(mD(de), he);
				},
				R = t.theme.current();
			return (R !== null && T(R), t.theme.subscribe(T));
		}, [t]),
		(0, _.useEffect)(() => {
			const T = uc(ts);
			return t.data.watch({ collection: "channels", limit: 100 }, (R, B) => {
				if (R === null) {
					p({ ...(B?.reason === void 0 ? {} : { reason: B.reason }) });
					return;
				}
				const P = R.docs.filter((de) => {
					const he = de.key;
					return !(typeof he == "string" && yn(he));
				});
				(o(T.apply_window(P)), S(!0), A(R.truncated));
			});
		}, [t]),
		(0, _.useEffect)(() => {
			let T = !1,
				R = null,
				B = null,
				P = ib;
			const de = () => {
				T ||
					(R = t.scopes.watchMine((he, ye) => {
						if (T) return;
						if (he === null) {
							if (((jn.current = !1), ye?.reason === "unavailable" && B === null)) {
								const Oe = P;
								B = setTimeout(() => {
									((B = null), (P = Math.min(Oe * 2, gD)), de());
								}, Oe);
							}
							return;
						}
						P = ib;
						const Re = he.filter(wD);
						Nn.current = new Map(Re.map((Oe) => [Oe.scopeId, Oe]));
						for (const [Oe, ut] of Sn.current) Nn.current.has(Oe) || (xh(ut), Sn.current.delete(Oe));
						const Ee = Re.filter((Oe) => (Qn.current.has(Oe.scopeId) ? (bt(Oe), !1) : !0)),
							wt = new Set(Ee.map((Oe) => Oe.scopeId)),
							We = !jn.current;
						((jn.current = !0), We && W((Oe) => Oe + 1));
						for (const [Oe, ut] of Qt.current) wt.has(Oe) || (sb(ut), Qt.current.delete(Oe));
						((_r.current = new Map(Ee.map((Oe) => [Oe.scopeId, Oe.membershipRevision]))),
							(Sr.current += 1),
							(Pt.current = wt),
							h(Ee),
							V(Sr.current));
					}));
			};
			return (
				de(),
				() => {
					((T = !0), (jn.current = !1), B !== null && clearTimeout(B), R?.());
				}
			);
		}, [t, bt]),
		(0, _.useEffect)(() => {
			const T = Kn.map((R) => {
				const B = uc(ts);
				let P = !1,
					de = null,
					he = null,
					ye = lb;
				const Re = () => {
					P ||
						!jn.current ||
						(de = t.data.watch({ collection: "channels", keyPrefix: R.keyPrefix, limit: 100 }, (Ee, wt) => {
							if (P) return;
							if (Ee === null) {
								if (
									(de?.(),
									(de = null),
									(wt?.reason === "unavailable" || wt?.reason === "denied") && jn.current && he === null)
								) {
									const ut = ye;
									he = setTimeout(() => {
										((he = null), (ye = Math.min(ut * 2, SD)), Re());
									}, ut);
								}
								return;
							}
							(he !== null && (clearTimeout(he), (he = null)), (ye = lb));
							const We = B.apply_window(Ee.docs.filter((ut) => ut.key === R.scopeId));
							v((ut) => ({ ...ut, [R.scopeId]: We }));
							const Oe = Ee.docs
								.map(f0)
								.filter((ut) => ut !== null && ut.channelKey === R.scopeId && ut.createdBy === i);
							for (const ut of Oe) {
								const $n = Qt.current.get(ut.channelKey);
								$n !== void 0 &&
									ob($n, ut) &&
									($n.retryTimer !== null && (clearTimeout($n.retryTimer), ($n.retryTimer = null)),
									($n.retryDelayMs = ca),
									qr($n));
							}
							X((ut) => ({ ...ut, [R.scopeId]: Oe }));
						}));
				};
				return (
					Re(),
					() => {
						((P = !0), he !== null && clearTimeout(he), de?.());
					}
				);
			});
			return () => {
				for (const R of T) R();
			};
		}, [t, qr, J, Kn, i]),
		(0, _.useEffect)(() => {
			const T = o0(i);
			return t.data.watch({ collection: "cursors", keyPrefix: T, limit: 1 }, (R) => {
				if (R === null) {
					(q(null), (pr.current = null));
					return;
				}
				const B =
					R.docs.map(Nk).find((P) => P !== null && P.key === T && P.createdBy === i && P.ownership === "owned") ?? null;
				(q(B), (pr.current = B));
			});
		}, [t, i]),
		(0, _.useEffect)(() => {
			const T = uc(pc);
			return t.data.watchRecent({ collection: "messages", limit: 100, order: "desc" }, (R) => {
				if (R === null) {
					(O(!0), C([]));
					return;
				}
				(O(!1), C(T.apply_window(R.docs)));
			});
		}, [t]),
		(0, _.useEffect)(() => {
			if (le === null) {
				const T = Kt.find((R) => R.value.archivedAt === null);
				T !== void 0 && oe((R) => R ?? T.key);
			}
		}, [Kt, le]),
		(0, _.useEffect)(() => {
			let T = !1;
			for (const [R, B] of nn.current) {
				const P = Kt.find((de) => de.key === B.channelKey);
				if (P === void 0) {
					(nn.current.delete(R), (T = !0));
					continue;
				}
				P.revision <= B.sourceRevision ||
					(nn.current.delete(R), (P.value.archivedAt !== null) === B.archived && (T = !0));
			}
			T && qt(!0);
		}, [Kt]),
		(0, _.useEffect)(() => {
			ge && Me.current?.focus();
		}, [ge]));
	const dt = () => window.matchMedia("(max-width: 719px)").matches,
		Ur = (T, R) => {
			const B = pr.current,
				P = B?.value.channels ?? {};
			if ((P[T] ?? 0) >= R) return;
			const de = { channels: { ...P, [T]: R } },
				he = B?.revision ?? 0;
			t.data
				.putOwned({ collection: "cursors", key: "me", value: de, expectedRevision: he })
				.then((ye) => {
					if ("_yay" in ye) {
						Dt(ye._yay.revision, de);
						return;
					}
					if (ye._nay.name === "conflict") {
						wr(de, he, "conflict");
						return;
					}
					if (ye._nay.name === "storage_full") {
						wr(de, he, "storage_full");
						return;
					}
					if (ye._nay.name === "unavailable") {
						wr(de, he, "unavailable");
						return;
					}
					console.warn("[chitchat] A read-cursor write was refused", { message: ye._nay.message });
				})
				.catch((ye) => {
					(console.warn("[chitchat] A read-cursor write failed", { message: Zn(ye) }), wr(de, he, "unavailable"));
				});
		},
		Gn = (T, R, B) => {
			if (!Pt.current.has(T.key)) return;
			const P = Qt.current.get(T.key);
			if (P !== void 0) {
				((P.pendingAt = Math.max(P.pendingAt, R)), (P.pendingActivity = Ri(P.pendingActivity, B)), qr(P));
				return;
			}
			const de = Yn.get(T.key);
			if ((de?.at ?? 0) >= R && is(de?.activity ?? Dr, B)) return;
			const he = {
				channelKey: T.key,
				pendingAt: R,
				pendingActivity: B,
				storedAt: de?.at ?? 0,
				storedActivity: de?.activity ?? Dr,
				revision: de?.revision ?? 0,
				running: !1,
				waitingForRefresh: !1,
				retryDelayMs: ca,
				retryTimer: null,
				cancelled: !1,
			};
			(Qt.current.set(T.key, he), qr(he));
		},
		Yt = (T, R, B) => {
			yn(T.key) ? Gn(T, R, B ?? Dr) : Ur(T.key, R);
		},
		$i = (T, R = !0) => {
			const B = tn.current.get(T);
			if ((B !== void 0 && (clearTimeout(B), tn.current.delete(T)), br.current.delete(T), R)) {
				const P = Qt.current.get(T);
				P !== void 0 && ((P.cancelled = !0), P.retryTimer !== null && clearTimeout(P.retryTimer), Qt.current.delete(T));
			}
		},
		an = (T, R, B) => {
			const P = br.current.get(T.key);
			(br.current.set(T.key, {
				channel: T,
				at: Math.max(P?.at ?? 0, R),
				activity: B === null ? null : Ri(P?.activity ?? Dr, B),
			}),
				!tn.current.has(T.key) &&
					tn.current.set(
						T.key,
						setTimeout(() => {
							tn.current.delete(T.key);
							const de = br.current.get(T.key);
							(br.current.delete(T.key), de !== void 0 && !ar.current.has(T.key) && Yt(de.channel, de.at, de.activity));
						}, vD),
					));
		},
		Tr = (T, R) => {
			const B = yn(T.key) ? Mn.get(T.key) : void 0,
				P = { channel: T, at: Math.max(R, B?.at ?? 0), activity: B?.activity ?? (yn(T.key) ? Dr : null) };
			if (ar.current.has(T.key)) {
				const de = _n.current.get(T.key);
				_n.current.set(T.key, {
					channel: T,
					at: Math.max(de?.at ?? 0, P.at),
					activity: P.activity === null ? null : Ri(de?.activity ?? Dr, P.activity),
				});
				return;
			}
			an(T, P.at, P.activity);
		},
		Ln = le === null ? void 0 : Mn.get(le),
		Fr = Ln?.at ?? 0;
	((0, _.useEffect)(() => {
		if (le === null || Ln === void 0 || !yn(le)) return;
		const T = Kt.find((B) => B.key === le),
			R = Yn.get(le);
		T !== void 0 && ((R?.at ?? 0) < Fr || !is(R?.activity ?? Dr, Ln.activity)) && an(T, Fr, Ln.activity);
	}, [le, Fr, Ln?.activity.messages ?? 0, Ln?.activity.replies ?? 0]),
		(0, _.useEffect)(() => {
			const T = Sa.current;
			for (const R of Er) In.current.delete(R);
			for (const R of T) {
				if (Er.has(R)) continue;
				const B = m[R]?.find((P) => P.key === R);
				(B !== void 0 && In.current.set(R, B), $i(R));
			}
			Sa.current = new Set(Er);
		}, [Er, m]),
		(0, _.useEffect)(() => {
			if (N !== null) return;
			let T = !1;
			for (const [R, B] of In.current) {
				const P = Zt.current.get(R);
				if (P === "pending") continue;
				const de = P !== void 0;
				(je(
					P === "deleted"
						? `Deleted #${B.value.name}`
						: P === "left"
							? `Left #${B.value.name}`
							: P === "delete_unconfirmed"
								? `You no longer have access to #${B.value.name}. The Delete request could not be confirmed.`
								: P === "leave_unconfirmed"
									? `You no longer have access to #${B.value.name}. The Leave request could not be confirmed.`
									: `You were removed from #${B.value.name}.`,
				),
					le === R && (oe(null), ve(null), $(null)),
					(le === R || de) && (T = !0),
					ar.current.delete(R),
					_n.current.delete(R),
					Zt.current.delete(R),
					In.current.delete(R));
			}
			T && qt(!0);
		}, [je, N, Er, le]),
		(0, _.useLayoutEffect)(() => {
			if (!wa || N !== null) return;
			const T = document.activeElement;
			if (T instanceof HTMLElement && T !== document.body && T.isConnected) {
				qt(!1);
				return;
			}
			if (ce && !ge) {
				if (H !== null) {
					const R = nt.current?.querySelector(".thread-head button") ?? null;
					if (R !== null && (R.focus(), document.activeElement === R)) {
						qt(!1);
						return;
					}
				}
				(qt(!1), yt.current?.focus());
			} else (qt(!1), Me.current?.focus());
		}, [N, ge, ce, wa, H]),
		(0, _.useEffect)(() => {
			const T = Li.current;
			if (!(T === null || N !== null)) {
				if (((Li.current = null), ce && !ge)) {
					if (H !== null) {
						const R = nt.current?.querySelector(".thread-head button") ?? null;
						if (R !== null && (R.focus(), document.activeElement === R)) return;
					}
					yt.current?.focus();
					return;
				}
				for (const R of nt.current?.querySelectorAll(".channel-item") ?? [])
					if (R.dataset.channelKey === T) {
						const B = R.querySelector(".ChannelRowMenu-trigger");
						if (B !== null && (B.focus(), document.activeElement === B)) return;
					}
				Me.current?.focus();
			}
		}, [N, ge, ce, H]));
	const ll = () => (le === null || (ot.current.get(le) ?? 0) === 0 ? !1 : (je(Eh), !0)),
		wn = (T) => {
			if ((T.key !== le || H !== null) && ll()) return !1;
			if ((oe(T.key), ve(null), Rt(T) || G(T) > 0)) {
				$(Ea(T));
				const R = Mn.get(T.key),
					B = sr.get(T.key)?.latest.timestamp ?? 0;
				Yt(T, R?.at ?? B, R?.activity ?? null);
			} else $(null);
			return (je(`#${T.value.name}`), ge && dt() && (Ce(!1), yt.current?.focus()), !0);
		},
		sl = (T) => {
			(T.key !== le && ll()) || (oe(T.key), ve(null), je(T.name), ge && dt() && (Ce(!1), yt.current?.focus()));
		},
		zs = (T, R) => {
			wn(T) && ve(R);
		},
		ol = () => {
			ll() || I({ kind: "create" });
		};
	((0, _.useEffect)(() => {
		rn();
	}, [M, s, rn]),
		(0, _.useEffect)(
			() => (
				(Lt.current = !0),
				() => {
					Lt.current = !1;
					const T = pt.current;
					(T !== null && T.retryTimer !== null && clearTimeout(T.retryTimer), (pt.current = null));
					for (const B of tn.current.values()) clearTimeout(B);
					(tn.current.clear(), br.current.clear());
					for (const B of Qt.current.values()) sb(B);
					(Qt.current.clear(), ar.current.clear(), _n.current.clear(), Zt.current.clear());
					for (const B of Ht.current.values()) Th(B);
					Ht.current.clear();
					for (const B of Sn.current.values()) xh(B);
					(Sn.current.clear(),
						Qn.current.clear(),
						ur.current.clear(),
						Nn.current.clear(),
						_r.current.clear(),
						lr.current.clear(),
						ot.current.clear());
					const R = Pn.current;
					R !== null && (rc(R), (Pn.current = null));
				}
			),
			[],
		));
	const $r = (T) => {
			const R = Ht.current.get(T);
			(R !== void 0 && (Th(R), Ht.current.delete(T)), lr.current.delete(T), ar.current.delete(T), Zt.current.delete(T));
			const B = _n.current.get(T);
			(_n.current.delete(T), Lt.current && B !== void 0 && Pt.current.has(T) && an(B.channel, B.at, B.activity));
		},
		qn = () => {
			(N?.kind === "exit" && Ht.current.has(N.channel.key) && $r(N.channel.key), (Gr.current = null));
			const T = Pn.current;
			(T !== null && rc(T),
				(Pn.current = null),
				Ue(!1),
				St(!1),
				(kn.current = null),
				vn(!1),
				Te(!1),
				I(null),
				ae(!1),
				Ge(null));
		},
		cl = (T) => {
			(In.current.delete(T), $r(T), (Li.current = T), qn());
		},
		Br = (T, R) => {
			const B = Ht.current.get(T.key);
			(B !== void 0 && (Th(B), Ht.current.delete(T.key)),
				lr.current.delete(T.key),
				Zt.current.set(T.key, R),
				In.current.set(T.key, T));
			const P = new Set(Pt.current);
			(P.delete(T.key),
				(Pt.current = P),
				_r.current.delete(T.key),
				h((de) => de.filter((he) => he.scopeId !== T.key)),
				qn());
		},
		Ds = (T) => {
			const R = () => Lt.current && !T.cancelled && Ht.current.get(T.channel.key) === T,
				B = () => {
					(Qn.current.add(T.channel.key),
						ur.current.delete(T.channel.key),
						Br(T.channel, T.action === "leave" ? "left" : "delete_unconfirmed"));
					const de = Nn.current.get(T.channel.key);
					de !== void 0 && bt(de);
				},
				P = () => {
					if (!R() || T.retryTimer !== null) return;
					const de = T.retryDelayMs;
					T.retryTimer = setTimeout(() => {
						((T.retryTimer = null), (T.retryDelayMs = Math.min(de * 2, ub)), Ds(T));
					}, de);
				};
			!R() ||
				T.running ||
				T.retryTimer !== null ||
				((T.running = !0),
				Promise.resolve()
					.then(() => t.fetchJson("/api/v1/plugin-data/read", { body: { collection: "channels", key: T.channel.key } }))
					.then((de) => {
						if (!R()) return;
						const he = Go.safeParse(de);
						if (!he.success) {
							((T.running = !1), P());
							return;
						}
						if (he.data.document === null) {
							((T.running = !1), B());
							return;
						}
						const ye = ts(he.data.document);
						if (he.data.document.collection !== "channels" || ye === null || ye.key !== T.channel.key || !yn(ye.key)) {
							((T.running = !1), P());
							return;
						}
						return t.scopes.listPrincipals({ scopeId: ye.key }).then((Re) => {
							if (!R()) return;
							T.running = !1;
							const Ee = ss(Re);
							if (Ee === null || "_nay" in Ee) {
								P();
								return;
							}
							const wt = Ee._yay;
							if (wt === null) {
								B();
								return;
							}
							if (!wt.some((We) => We.userId === i)) {
								B();
								return;
							}
							(In.current.delete(ye.key), $r(ye.key), Te(!1), ae(!1));
						});
					})
					.catch(() => {
						R() && ((T.running = !1), P());
					}));
		},
		js = (T, R, B) => {
			if (ar.current.has(T.key)) return;
			if ((ot.current.get(T.key) ?? 0) > 0) {
				(ae(!1), Ge(Eh), je(Eh));
				return;
			}
			const P = br.current.get(T.key);
			if (P !== void 0) {
				const ye = _n.current.get(T.key);
				_n.current.set(T.key, {
					channel: P.channel,
					at: Math.max(ye?.at ?? 0, P.at),
					activity: P.activity === null ? null : Ri(ye?.activity ?? Dr, P.activity),
				});
			}
			(ar.current.add(T.key), Zt.current.set(T.key, "pending"), $i(T.key, !1), ae(!0), Ge(null));
			const de =
					R === "delete"
						? t.scopes.delete({ scopeId: T.key, ...(B === void 0 ? {} : { expectedPrincipalCount: B }) })
						: t.scopes.removePrincipal({
								scopeId: T.key,
								userId: i,
								...(B === void 0 ? {} : { expectedPrincipalCount: B }),
							}),
				he = (ye) => {
					const Re = { channel: T, action: R, running: !1, retryDelayMs: ab, retryTimer: null, cancelled: !1 };
					(Ht.current.set(T.key, Re), ae(!1), Te(!0), Ge(ye), Ds(Re));
				};
			de.then((ye) => {
				if (Lt.current) {
					if ("_nay" in ye) {
						if (ye._nay.name === "unavailable") {
							he(ye._nay.message);
							return;
						}
						($r(T.key),
							ae(!1),
							Ge(
								ye._nay.name === "conflict"
									? "Who is in this channel changed. Close it and try again."
									: ye._nay.message,
							));
						return;
					}
					if (R === "leave" && !ye._yay.deleted) {
						const Re = _r.current.get(T.key);
						if (Re === void 0) {
							Br(T, "left");
							return;
						}
						if (Re > ye._yay.membershipRevision) {
							cl(T.key);
							return;
						}
						lr.current.set(T.key, { channel: T, membershipRevision: ye._yay.membershipRevision });
						return;
					}
					Br(T, ye._yay.deleted ? "deleted" : "left");
				}
			}).catch((ye) => {
				Lt.current && he(Zn(ye));
			});
		};
	(0, _.useEffect)(() => {
		for (const [T, R] of lr.current) {
			const B = _r.current.get(T);
			if (B === void 0) {
				Br(R.channel, "left");
				continue;
			}
			B > R.membershipRevision && cl(T);
		}
	}, [D]);
	const fl = (T) => {
		const R = () => Lt.current && !T.cancelled && Pn.current === T,
			B = () => {
				if (!R() || T.retryTimer !== null) return;
				const de = T.retryDelayMs;
				T.retryTimer = setTimeout(() => {
					((T.retryTimer = null), (T.retryDelayMs = Math.min(de * 2, pD)), fl(T));
				}, de);
			},
			P = (de) => {
				(rc(T), (Pn.current = null), Ue(!0), St(!1), ae(!1), Ge(de));
			};
		!R() ||
			T.running ||
			T.retryTimer !== null ||
			((T.running = !0),
			Promise.resolve()
				.then(() => t.fetchJson("/api/v1/plugin-data/read", { body: { collection: "channels", key: T.key } }))
				.then((de) => {
					if (!R()) return;
					const he = Go.safeParse(de);
					if (!he.success) {
						((T.running = !1), B());
						return;
					}
					if (he.data.document === null) {
						((T.running = !1), P(bD));
						return;
					}
					const ye = ts(he.data.document);
					if (he.data.document.collection !== "channels" || ye === null || ye.key !== T.key || !yn(ye.key)) {
						((T.running = !1), B());
						return;
					}
					return t.scopes.listPrincipals({ scopeId: ye.key }).then((Re) => {
						if (!R()) return;
						T.running = !1;
						const Ee = ss(Re);
						if (Ee === null || "_nay" in Ee) {
							B();
							return;
						}
						const wt = Ee._yay;
						if (wt === null || !wt.some((We) => We.userId === i)) {
							P(_D);
							return;
						}
						(rc(T), (Pn.current = null), oe(T.key), $(null), qn());
					});
				})
				.catch(() => {
					R() && ((T.running = !1), B());
				}));
	};
	(0, _.useEffect)(() => {
		const T = kn.current;
		if (
			!At ||
			T === null ||
			N === null ||
			(N.kind !== "rename" && N.kind !== "archive") ||
			N.channel.key !== T.channelKey
		)
			return;
		const R = Kt.find((B) => B.key === T.channelKey);
		if (R === void 0) {
			qn();
			return;
		}
		if (!(R.revision <= T.expectedRevision)) {
			if (
				T.sectionMoveRequestId === null
					? R.value.name === T.value.name && (R.value.topic ?? "") === (T.value.topic ?? "")
					: R.value.archivedAt !== null
			) {
				qn();
				return;
			}
			((kn.current = null),
				vn(!1),
				ae(!1),
				I((B) =>
					B !== null && (B.kind === "rename" || B.kind === "archive") && B.channel.key === R.key
						? { ...B, channel: R }
						: B,
				),
				Ge("Someone else changed this channel while the request was pending. Review it and try again."));
		}
	}, [At, Kt, N]);
	const dl = (T, R, B) => {
			(ae(!0), Ge(null));
			const P = Gr.current,
				de = ke && P !== null,
				he = de
					? P
					: {
							key: fk(B.isPrivate ? "private" : "public"),
							name: T,
							topic: R,
							isPrivate: B.isPrivate,
							userIds: [...B.userIds],
						};
			((Gr.current = he),
				Ue(!1),
				St(!1),
				(async () => {
					const ye = { name: he.name, archivedAt: null, ...(he.topic === "" ? {} : { topic: he.topic }) },
						Re = he.isPrivate
							? await t.scopes.createWithDocument({
									scopeId: he.key,
									collections: Lh,
									keyPrefix: he.key,
									principals: he.userIds.map((Ee) => ({ userId: Ee, level: "member" })),
									document: { collection: "channels", key: he.key, value: ye },
								})
							: await t.data.put({ collection: "channels", key: he.key, value: ye, expectedRevision: 0 });
					if ("_nay" in Re) {
						if (Re._nay.name === "unavailable") {
							(Ue(!0), St(!1), ae(!1), Ge(Re._nay.message));
							return;
						}
						if (de && Re._nay.name === "conflict" && he.isPrivate) {
							const Ee = { key: he.key, running: !1, retryDelayMs: yD, retryTimer: null, cancelled: !1 };
							((Pn.current = Ee),
								Ue(!0),
								St(!0),
								ae(!1),
								Ge("Checking whether this private channel was created."),
								fl(Ee));
							return;
						}
						if (!(de && Re._nay.name === "conflict")) {
							((Gr.current = null), Ue(!1), ae(!1), Ge(Re._nay.message));
							return;
						}
					}
					(oe(he.key), $(null), qn());
				})().catch((ye) => {
					(Ue(!0), St(!1), ae(!1), Ge(Zn(ye)));
				}));
		},
		Is = (T, R) => {
			const B = kn.current,
				P = At && B !== null,
				de = (T.value.archivedAt !== null) != (R.archivedAt !== null),
				he = P
					? B
					: { channelKey: T.key, value: R, expectedRevision: T.revision, sectionMoveRequestId: de ? Symbol() : null };
			((kn.current = he),
				vn(!1),
				!P &&
					he.sectionMoveRequestId !== null &&
					nn.current.set(he.sectionMoveRequestId, {
						channelKey: he.channelKey,
						sourceRevision: he.expectedRevision,
						archived: he.value.archivedAt !== null,
					}),
				ae(!0),
				Ge(null),
				t.data
					.put({ collection: "channels", key: he.channelKey, value: he.value, expectedRevision: he.expectedRevision })
					.then((ye) => {
						if ("_nay" in ye) {
							if (ye._nay.name === "unavailable" || (P && ye._nay.name === "conflict")) {
								(vn(!0), ae(!1), Ge(ye._nay.message));
								return;
							}
							((kn.current = null),
								vn(!1),
								he.sectionMoveRequestId !== null &&
									ye._nay.name !== "conflict" &&
									nn.current.delete(he.sectionMoveRequestId),
								ae(!1),
								Ge(
									ye._nay.name === "conflict"
										? "Someone else changed this channel while the dialog was open. Close it and try again."
										: ye._nay.message,
								));
							return;
						}
						qn();
					})
					.catch((ye) => {
						(vn(!0), ae(!1), Ge(Zn(ye)));
					}));
		},
		Jc = (T) => {
			const R = Symbol();
			(nn.current.set(R, { channelKey: T.key, sourceRevision: T.revision, archived: !1 }),
				t.data
					.put({
						collection: "channels",
						key: T.key,
						value: { ...T.value, archivedAt: null },
						expectedRevision: T.revision,
					})
					.then((B) => {
						"_nay" in B &&
							(B._nay.name !== "conflict" && B._nay.name !== "unavailable" && nn.current.delete(R), je(B._nay.message));
					})
					.catch((B) => {
						je(Zn(B));
					}));
		};
	if (b !== null)
		return (0, w.jsx)("div", {
			className: "chitchat",
			children: (0, w.jsxs)("div", {
				className: "page-dead",
				role: "alert",
				children: [(0, w.jsx)("h1", { children: "Chitchat" }), (0, w.jsx)("p", { children: hD(b.reason) })],
			}),
		});
	const Ta = (T, R) => T.value.name.localeCompare(R.value.name),
		On = Kt.filter((T) => T.value.archivedAt === null).sort(Ta),
		hl = Kt.filter((T) => T.value.archivedAt !== null).sort(Ta),
		Un = Kt.find((T) => T.key === le) ?? null,
		Bi = Un !== null && yn(Un.key) ? (f.find((T) => T.scopeId === Un.key)?.membershipRevision ?? 0) : 0,
		Vr = Un !== null && (te[Un.key] ?? 0) > 0,
		ml = On.filter(Rt).length,
		xa = On.reduce((T, R) => T + G(R), 0),
		uu = Math.max(0, f.length - Kn.length),
		Vi = (T, R, B) =>
			R.length === 0
				? null
				: (0, w.jsxs)("div", {
						className: "channel-section",
						children: [
							(0, w.jsx)("h2", { id: B, className: "channel-section-title", children: T }),
							(0, w.jsx)("ul", {
								className: "channel-list",
								"aria-labelledby": B,
								children: R.map((P) => {
									const de = Rt(P),
										he = G(P),
										ye = f.find((Re) => Re.scopeId === P.key);
									return (0, w.jsxs)(
										"li",
										{
											className: "channel-item",
											"data-channel-key": P.key,
											children: [
												(0, w.jsxs)("button", {
													type: "button",
													className: de || he > 0 ? "channel-link is-unread" : "channel-link",
													"aria-current": P.key === le ? "page" : void 0,
													disabled: Vr && (P.key !== le || H !== null),
													onClick: () => wn(P),
													children: [
														(0, w.jsx)("span", {
															className: "channel-initial",
															"aria-hidden": "true",
															children: P.value.name.slice(0, 1).toUpperCase(),
														}),
														(0, w.jsxs)("span", {
															className: "channel-name",
															children: [
																"#",
																P.value.name,
																yn(P.key) ? " (private)" : "",
																P.value.archivedAt !== null ? " (archived)" : "",
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
													children: (0, w.jsx)(nD, {
														channelName: P.value.name,
														items: [
															...(yn(P.key)
																? [
																		{
																			id: "people",
																			label: `People in #${P.value.name}`,
																			onSelect: () => I({ kind: "people", channel: P }),
																		},
																	]
																: []),
															{
																id: "rename",
																label: `Rename #${P.value.name}`,
																onSelect: () => I({ kind: "rename", channel: P }),
															},
															P.value.archivedAt === null
																? {
																		id: "archive",
																		label: `Archive #${P.value.name}`,
																		onSelect: () => I({ kind: "archive", channel: P }),
																	}
																: { id: "unarchive", label: `Unarchive #${P.value.name}`, onSelect: () => Jc(P) },
															...(ye
																? [
																		{ id: "private-exit-separator", separator: !0 },
																		{
																			id: "leave",
																			label: `Leave #${P.value.name}`,
																			danger: !0,
																			onSelect: () => I({ kind: "exit", action: "leave", channel: P }),
																		},
																		...(ye.level === "manage"
																			? [
																					{
																						id: "delete",
																						label: `Delete #${P.value.name} for everyone`,
																						danger: !0,
																						onSelect: () => I({ kind: "exit", action: "delete", channel: P }),
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
										P.key,
									);
								}),
							}),
						],
					});
	return (0, w.jsxs)("div", {
		ref: nt,
		className: "chitchat",
		onFocusCapture: (T) => {
			const R = T.target;
			at.current =
				R === yt.current
					? "drawer"
					: Me.current?.contains(R)
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
						ref: yt,
						type: "button",
						className: "button drawer-toggle",
						"aria-expanded": ge,
						onClick: () => Ce((T) => !T),
						children: "Channels",
					}),
				],
			}),
			(0, w.jsx)("nav", {
				ref: Me,
				className: ["sidebar", ge ? "is-open" : "", pe ? "is-expanded" : ""].filter(Boolean).join(" "),
				"aria-label": "Channels",
				tabIndex: -1,
				children: (0, w.jsxs)("div", {
					className: "sidebar-inner",
					inert: ce && !ge ? !0 : void 0,
					children: [
						(0, w.jsxs)("div", {
							className: "sidebar-head",
							children: [
								(0, w.jsx)("p", { className: "sidebar-title", children: "Chitchat" }),
								(0, w.jsx)("button", {
									ref: pn,
									type: "button",
									className: "button sidebar-expand",
									"aria-expanded": pe,
									"aria-label": pe ? "Collapse channel rail" : "Expand channel rail",
									onClick: () => Ze((T) => !T),
									children: pe ? "«" : "»",
								}),
								(0, w.jsx)("button", {
									type: "button",
									className: "button sidebar-create",
									disabled: Vr,
									onClick: ol,
									children: "Create channel",
								}),
							],
						}),
						E
							? (0, w.jsx)("div", {
									className: "channel-status",
									role: "status",
									children: "Only the first 100 channels are shown.",
								})
							: null,
						uu > 0
							? (0, w.jsx)("div", {
									className: "channel-status",
									role: "status",
									children: `This page can watch ${nb} private channels at a time; ${uu} more ${uu === 1 ? "is" : "are"} hidden.`,
								})
							: null,
						(0, w.jsx)("ul", {
							className: "view-list",
							"aria-label": "Views",
							children: oD.map((T) =>
								(0, w.jsx)(
									"li",
									{
										className: "view-item",
										children: (0, w.jsxs)("button", {
											type: "button",
											className:
												T.key === "view:unreads" && (ml > 0 || xa > 0)
													? "channel-link view-link is-unread"
													: "channel-link view-link",
											"aria-current": le === T.key ? "page" : void 0,
											disabled: Vr,
											onClick: () => sl(T),
											children: [
												(0, w.jsx)("span", {
													className: "channel-initial",
													"aria-hidden": "true",
													children: T.name.slice(0, 1),
												}),
												(0, w.jsx)("span", { className: "channel-name", children: T.name }),
												T.key === "view:unreads" && xa > 0
													? (0, w.jsxs)("span", {
															className: "mention-badge",
															children: [
																xa,
																(0, w.jsx)("span", { className: "visually-hidden", children: " mentions of you" }),
															],
														})
													: T.key === "view:unreads" && ml > 0
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
									T.key,
								),
							),
						}),
						g
							? Kt.length === 0
								? (0, w.jsx)("div", { className: "channel-status", children: "No channels yet" })
								: (0, w.jsxs)(w.Fragment, { children: [Vi("Channels", On, me), Vi("Archived", hl, we)] })
							: (0, w.jsx)("div", { className: "channel-status", role: "status", children: "Loading channels…" }),
					],
				}),
			}),
			(0, w.jsx)("main", {
				className: "main",
				children:
					le === "view:unreads"
						? (0, w.jsx)(cD, {
								channels: On,
								publicUnreads: sr,
								privateCursors: Yn,
								privateActivity: Mn,
								recentDead: k,
								memberNames: u,
								onSelectChannel: wn,
							})
						: le === "view:threads"
							? (0, w.jsx)(dD, { client: t, channels: On, memberNames: u, onOpenThread: zs })
							: le === "view:activity"
								? (0, w.jsx)(fD, {
										feed: z,
										channels: On,
										selfUserId: i,
										recentDead: k,
										memberNames: u,
										onSelectChannel: wn,
									})
								: Un !== null
									? (0, w.jsx)(
											pz,
											{
												client: t,
												userId: i,
												channel: Un,
												readGeneration: Bi,
												memberNames: u,
												announce: je,
												threadRootKey: H,
												setThreadRootKey: ve,
												isNarrow: ce,
												onRequestStart: () => He(Un.key),
												onRequestSettled: () => Ct(Un.key),
												sendInFlight: Vr,
												onNewestVisible: (T) => Tr(Un, T),
												openedAtLastReadAt: L,
											},
											Un.key,
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
			N !== null && N.kind === "create"
				? (0, w.jsx)(tb, {
						title: "Create channel",
						submitLabel: "Create",
						initialName: "",
						initialTopic: "",
						privacy: { client: t, selfUserId: i },
						busy: se,
						waiting: Ye,
						fieldsLocked: ke,
						error: en,
						onSubmit: dl,
						onClose: qn,
					})
				: null,
			N !== null && N.kind === "people"
				? (0, w.jsx)(uD, { client: t, channel: N.channel, selfUserId: i, memberNames: u, onClose: qn })
				: null,
			N !== null && N.kind === "rename"
				? (0, w.jsx)(tb, {
						title: `Rename #${N.channel.value.name}`,
						submitLabel: "Rename",
						initialName: N.channel.value.name,
						initialTopic: N.channel.value.topic ?? "",
						privacy: null,
						busy: se,
						waiting: !1,
						fieldsLocked: At,
						error: en,
						onSubmit: (T, R) =>
							Is(N.channel, { ...N.channel.value, name: T, ...(R === "" ? { topic: void 0 } : { topic: R }) }),
						onClose: qn,
					})
				: null,
			N !== null && N.kind === "archive"
				? (0, w.jsx)(lD, {
						channelName: N.channel.value.name,
						busy: se,
						retry: At,
						error: en,
						onConfirm: () => Is(N.channel, { ...N.channel.value, archivedAt: Date.now() }),
						onClose: qn,
					})
				: null,
			N !== null && N.kind === "exit"
				? (0, w.jsx)(sD, {
						client: t,
						channel: N.channel,
						action: N.action,
						busy: se,
						waiting: be,
						error: en,
						onConfirm: (T) => js(N.channel, N.action, T),
						onClose: qn,
					})
				: null,
			(0, w.jsxs)("div", {
				className: "chitchat-announcer visually-hidden",
				role: "status",
				"aria-live": "polite",
				children: [(0, w.jsx)("span", { "data-announcement-sequence": String(tt.sequence) }), Bt],
			}),
		],
	});
}
function NS(e) {
	return (0, w.jsx)("div", {
		className: e.isError ? "boot-screen is-error" : "boot-screen",
		role: e.isError ? "alert" : "status",
		"aria-live": e.isError ? void 0 : "polite",
		children: e.message,
	});
}
var MS = document.getElementById("root");
if (!MS) throw new Error("index.html is missing the #root element");
var Wh = (0, lk.createRoot)(MS);
Wh.render((0, w.jsx)(NS, { message: "Connecting…" }));
fT().then(
	(e) => {
		(e.context.kind === "page" && (document.title = e.context.pageTitle), Wh.render((0, w.jsx)(xD, { client: e })));
	},
	(e) => {
		Wh.render((0, w.jsx)(NS, { message: e instanceof Error ? e.message : String(e), isError: !0 }));
	},
);
