var k1 = Object.create,
	hb = Object.defineProperty,
	M1 = Object.getOwnPropertyDescriptor,
	N1 = Object.getOwnPropertyNames,
	O1 = Object.getPrototypeOf,
	z1 = Object.prototype.hasOwnProperty,
	Lr = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), (e = null)), t.exports),
	D1 = (e, t, i, u) => {
		if ((t && typeof t == "object") || typeof t == "function")
			for (var s = N1(t), o = 0, f = s.length, h; o < f; o++)
				((h = s[o]),
					!z1.call(e, h) &&
						h !== i &&
						hb(e, h, { get: ((m) => t[m]).bind(null, h), enumerable: !(u = M1(t, h)) || u.enumerable }));
		return e;
	},
	mb = (e, t, i) => (
		(i = e != null ? k1(O1(e)) : {}),
		D1(t || !e || !e.__esModule ? hb(i, "default", { value: e, enumerable: !0 }) : i, e)
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
var gp = "1.44.0",
	ti = [],
	Ir = [],
	j1 = Uint8Array,
	Wd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Uu = 0, I1 = Wd.length; Uu < I1; ++Uu) ((ti[Uu] = Wd[Uu]), (Ir[Wd.charCodeAt(Uu)] = Uu));
Ir[45] = 62;
Ir[95] = 63;
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
function fs(e) {
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
			(Ir[e.charCodeAt(m)] << 18) |
			(Ir[e.charCodeAt(m + 1)] << 12) |
			(Ir[e.charCodeAt(m + 2)] << 6) |
			Ir[e.charCodeAt(m + 3)]),
			(o[f++] = (t >> 16) & 255),
			(o[f++] = (t >> 8) & 255),
			(o[f++] = t & 255));
	return (
		s === 2 && ((t = (Ir[e.charCodeAt(m)] << 2) | (Ir[e.charCodeAt(m + 1)] >> 4)), (o[f++] = t & 255)),
		s === 1 &&
			((t = (Ir[e.charCodeAt(m)] << 10) | (Ir[e.charCodeAt(m + 1)] << 4) | (Ir[e.charCodeAt(m + 2)] >> 2)),
			(o[f++] = (t >> 8) & 255),
			(o[f++] = t & 255)),
		o
	);
}
function U1(e) {
	return ti[(e >> 18) & 63] + ti[(e >> 12) & 63] + ti[(e >> 6) & 63] + ti[e & 63];
}
function $1(e, t, i) {
	for (var u, s = [], o = t; o < i; o += 3)
		((u = ((e[o] << 16) & 16711680) + ((e[o + 1] << 8) & 65280) + (e[o + 2] & 255)), s.push(U1(u)));
	return s.join("");
}
function ds(e) {
	for (var t, i = e.length, u = i % 3, s = [], o = 16383, f = 0, h = i - u; f < h; f += o)
		s.push($1(e, f, f + o > h ? h : f + o));
	return (
		u === 1
			? ((t = e[i - 1]), s.push(ti[t >> 2] + ti[(t << 4) & 63] + "=="))
			: u === 2 &&
				((t = (e[i - 2] << 8) + e[i - 1]), s.push(ti[t >> 10] + ti[(t >> 4) & 63] + ti[(t << 2) & 63] + "=")),
		s.join("")
	);
}
function da(e) {
	if (e === void 0) return {};
	if (!gb(e)) throw new Error(`The arguments to a Convex function must be an object. Received: ${e}`);
	return e;
}
function vb(e) {
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
function gb(e) {
	const t = typeof e == "object",
		i = Object.getPrototypeOf(e),
		u = i === null || i === Object.prototype || i?.constructor?.name === "Object";
	return t && u;
}
var yb = !0,
	Xu = BigInt("-9223372036854775808"),
	tm = BigInt("9223372036854775807"),
	kh = BigInt("0"),
	B1 = BigInt("8"),
	V1 = BigInt("256"),
	eh =
		"This commit timestamp is unresolved: its value is assigned when the mutation commits. Read the document after the mutation completes to get its value.",
	pb = class {
		[Symbol.toPrimitive](e) {
			if (e === "string") return this.toString();
			throw new Error(eh);
		}
		valueOf() {
			throw new Error(eh);
		}
		toJSON() {
			throw new Error(eh);
		}
		toString() {
			return "[unresolved commit timestamp]";
		}
	},
	H1 = new pb();
function bb(e) {
	return Number.isNaN(e) || !Number.isFinite(e) || Object.is(e, -0);
}
function Z1(e) {
	e < kh && (e -= Xu + Xu);
	let t = e.toString(16);
	t.length % 2 === 1 && (t = "0" + t);
	const i = new Uint8Array(new ArrayBuffer(8));
	let u = 0;
	for (const s of t.match(/.{2}/g).reverse()) (i.set([parseInt(s, 16)], u++), (e >>= B1));
	return ds(i);
}
function P1(e) {
	const t = fs(e);
	if (t.byteLength !== 8) throw new Error(`Received ${t.byteLength} bytes, expected 8 for $integer`);
	let i = kh,
		u = kh;
	for (const s of t) ((i += BigInt(s) * V1 ** u), u++);
	return (i > tm && (i += Xu + Xu), i);
}
function Q1(e) {
	if (e < Xu || tm < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
	const t = new ArrayBuffer(8);
	return (new DataView(t).setBigInt64(0, e, !0), ds(new Uint8Array(t)));
}
function K1(e) {
	const t = fs(e);
	if (t.byteLength !== 8) throw new Error(`Received ${t.byteLength} bytes, expected 8 for $integer`);
	return new DataView(t.buffer).getBigInt64(0, !0);
}
var Y1 = DataView.prototype.setBigInt64 ? Q1 : Z1,
	G1 = DataView.prototype.getBigInt64 ? K1 : P1,
	yp = 1024;
function Mh(e) {
	if (e.length > yp) throw new Error(`Field name ${e} exceeds maximum field name length ${yp}.`);
	if (e.startsWith("$")) throw new Error(`Field name ${e} starts with a '$', which is reserved.`);
	for (let t = 0; t < e.length; t += 1) {
		const i = e.charCodeAt(t);
		if (i < 32 || i >= 127)
			throw new Error(
				`Field name ${e} has invalid character '${e[t]}': Field names can only contain non-control ASCII characters`,
			);
	}
}
function Ju(e) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return e;
	if (Array.isArray(e)) return e.map((u) => Ju(u));
	if (typeof e != "object") throw new Error(`Unexpected type of ${e}`);
	const t = Object.entries(e);
	if (t.length === 1) {
		const u = t[0][0];
		if (u === "$bytes") {
			if (typeof e.$bytes != "string") throw new Error(`Malformed $bytes field on ${e}`);
			return fs(e.$bytes).buffer;
		}
		if (u === "$integer") {
			if (typeof e.$integer != "string") throw new Error(`Malformed $integer field on ${e}`);
			return G1(e.$integer);
		}
		if (u === "$float") {
			if (typeof e.$float != "string") throw new Error(`Malformed $float field on ${e}`);
			const s = fs(e.$float);
			if (s.byteLength !== 8) throw new Error(`Received ${s.byteLength} bytes, expected 8 for $float`);
			const o = new DataView(s.buffer).getFloat64(0, yb);
			if (!bb(o)) throw new Error(`Float ${o} should be encoded as a number`);
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
	for (const [u, s] of Object.entries(e)) (Mh(u), (i[u] = Ju(s)));
	return i;
}
var pp = 16384;
function Ku(e) {
	const t = JSON.stringify(e, (i, u) => (u === void 0 ? "undefined" : typeof u == "bigint" ? `${u.toString()}n` : u));
	if (t.length > pp) {
		const i = "[...truncated]";
		let u = pp - 14;
		const s = t.codePointAt(u - 1);
		return (s !== void 0 && s > 65535 && (u -= 1), t.substring(0, u) + i);
	}
	return t;
}
function cc(e, t, i, u) {
	if (e === void 0) {
		const f = i && ` (present at path ${i} in original object ${Ku(t)})`;
		throw new Error(
			`undefined is not a valid Convex value${f}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`,
		);
	}
	if (e === null) return e;
	if (typeof e == "bigint") {
		if (e < Xu || tm < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
		return { $integer: Y1(e) };
	}
	if (typeof e == "number")
		if (bb(e)) {
			const f = new ArrayBuffer(8);
			return (new DataView(f).setFloat64(0, e, yb), { $float: ds(new Uint8Array(f)) });
		} else return e;
	if (typeof e == "boolean" || typeof e == "string") return e;
	if (e instanceof ArrayBuffer) return { $bytes: ds(new Uint8Array(e)) };
	if (e instanceof pb) return { $commitTs: null };
	if (Array.isArray(e)) return e.map((f, h) => cc(f, t, i + `[${h}]`, !1));
	if (e instanceof Set) throw new Error(th(i, "Set", [...e], t));
	if (e instanceof Map) throw new Error(th(i, "Map", [...e], t));
	if (!gb(e)) {
		const f = e?.constructor?.name,
			h = f ? `${f} ` : "";
		throw new Error(th(i, h, e, t));
	}
	const s = {},
		o = Object.entries(e);
	o.sort(([f, h], [m, v]) => (f === m ? 0 : f < m ? -1 : 1));
	for (const [f, h] of o)
		h !== void 0 ? (Mh(f), (s[f] = cc(h, t, i + `.${f}`, !1))) : u && (Mh(f), (s[f] = F1(h, t, i + `.${f}`)));
	return s;
}
function th(e, t, i, u) {
	return e
		? `${t}${Ku(i)} is not a supported Convex type (present at path ${e} in original object ${Ku(u)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
		: `${t}${Ku(i)} is not a supported Convex type.`;
}
function F1(e, t, i) {
	if (e === void 0) return { $undefined: null };
	if (t === void 0) throw new Error(`Programming error. Current value is ${Ku(e)} but original value is undefined`);
	return cc(e, t, i, !1);
}
function Fa(e) {
	return cc(e, e, "", !1);
}
var X1 = Object.defineProperty,
	J1 = (e, t, i) => (t in e ? X1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	nh = (e, t, i) => J1(e, typeof t != "symbol" ? t + "" : t, i),
	bp,
	_p,
	W1 = Symbol.for("ConvexError"),
	Nh = class extends ((_p = Error), (bp = W1), _p) {
		constructor(e) {
			(super(typeof e == "string" ? e : Ku(e)),
				nh(this, "name", "ConvexError"),
				nh(this, "data"),
				nh(this, bp, !0),
				(this.data = e));
		}
	},
	eE = Object.defineProperty,
	tE = (e, t, i) => (t in e ? eE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	Sp = (e, t, i) => tE(e, typeof t != "symbol" ? t + "" : t, i),
	nE = "color:rgb(0, 145, 255)";
function _b(e) {
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
var Sb = class {
	constructor(e) {
		(Sp(this, "_onLogLineFuncs"), Sp(this, "_verbose"), (this._onLogLineFuncs = {}), (this._verbose = e.verbose));
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
	const t = new Sb(e);
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
	return new Sb(e);
}
function fc(e, t, i, u, s) {
	const o = _b(i);
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
function Hu(e, t, i) {
	return `[CONVEX ${_b(e)}(${t})] ${i.errorMessage}
  Called by client`;
}
function Oh(e, t) {
	return ((t.data = e.errorData), t);
}
function Xa(e) {
	const t = e.split(":");
	let i, u;
	return (
		t.length === 1 ? ((i = t[0]), (u = "default")) : ((i = t.slice(0, t.length - 1).join(":")), (u = t[t.length - 1])),
		i.endsWith(".js") && (i = i.slice(0, -3)),
		`${i}:${u}`
	);
}
function Ya(e, t) {
	return JSON.stringify({ udfPath: Xa(e), args: Fa(t) });
}
function wp(e, t, i) {
	const { initialNumItems: u, id: s } = i;
	return JSON.stringify({ type: "paginated", udfPath: Xa(e), args: Fa(t), options: Fa({ initialNumItems: u, id: s }) });
}
function uE(e) {
	return JSON.parse(e).type === "paginated";
}
var lE = Object.defineProperty,
	sE = (e, t, i) => (t in e ? lE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	ei = (e, t, i) => sE(e, typeof t != "symbol" ? t + "" : t, i),
	oE = class {
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
			const s = Xa(e),
				o = Ya(s, t),
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
					S = { type: "Add", queryId: h, udfPath: s, args: [Fa(t)], journal: i, componentPath: u };
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
			const i = Ya(Xa(e), t),
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
					args: [Fa(u.args)],
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
	Ho = (e, t, i) => fE(e, typeof t != "symbol" ? t + "" : t, i),
	dE = class {
		constructor(e, t) {
			((this.logger = e),
				(this.markConnectionStateDirty = t),
				Ho(this, "inflightRequests"),
				Ho(this, "requestsOlderThanRestart"),
				Ho(this, "inflightMutationsCount", 0),
				Ho(this, "inflightActionsCount", 0),
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
			for (const h of e.logLines) fc(this.logger, "info", i, u, h);
			const s = t.status;
			let o, f;
			if (e.success) ((o = { success: !0, logLines: e.logLines, value: Ju(e.result) }), (f = () => s.onResult(o)));
			else {
				const h = e.result,
					{ errorData: m } = e;
				(fc(this.logger, "error", i, u, h),
					(o = { success: !1, errorMessage: h, errorData: m !== void 0 ? Ju(m) : void 0, logLines: e.logLines }),
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
	dc = Symbol.for("functionName"),
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
	else if (e[dc]) t = { name: e[dc] };
	else {
		const i = mE(e);
		if (!i) throw new Error(`${e} is not a functionReference`);
		t = { reference: i };
	}
	return t;
}
function Ai(e) {
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
	const i = e[dc];
	if (!i) throw new Error(`${e} is not a functionReference`);
	return i;
}
function wb(e = []) {
	return new Proxy(
		{},
		{
			get(t, i) {
				if (typeof i == "string") return wb([...e, i]);
				if (i === dc) {
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
var vr = wb(),
	yE = Object.defineProperty,
	pE = (e, t, i) => (t in e ? yE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	hc = (e, t, i) => pE(e, typeof t != "symbol" ? t + "" : t, i),
	Ep = class zh {
		constructor(t) {
			(hc(this, "queryResults"), hc(this, "modifiedQueries"), (this.queryResults = t), (this.modifiedQueries = []));
		}
		getQuery(t, ...i) {
			const u = da(i[0]),
				s = Ai(t),
				o = this.queryResults.get(Ya(s, u));
			if (o !== void 0) return zh.queryValue(o.result);
		}
		getAllQueries(t) {
			const i = [],
				u = Ai(t);
			for (const s of this.queryResults.values())
				s.udfPath === Xa(u) && i.push({ args: s.args, value: zh.queryValue(s.result) });
			return i;
		}
		setQuery(t, i, u) {
			const s = da(i),
				o = Ai(t),
				f = Ya(o, s);
			let h;
			u === void 0 ? (h = void 0) : (h = { success: !0, value: u, logLines: [] });
			const m = { udfPath: o, args: s, result: h };
			(this.queryResults.set(f, m), this.modifiedQueries.push(f));
		}
		static queryValue(t) {
			if (t !== void 0) return t.success ? t.value : void 0;
		}
	},
	bE = class {
		constructor() {
			(hc(this, "queryResults"),
				hc(this, "optimisticUpdates"),
				(this.queryResults = new Map()),
				(this.optimisticUpdates = []));
		}
		ingestQueryResultsFromServer(e, t) {
			this.optimisticUpdates = this.optimisticUpdates.filter((o) => !t.has(o.mutationId));
			const i = this.queryResults;
			this.queryResults = new Map(e);
			const u = new Ep(this.queryResults);
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
			const i = new Ep(this.queryResults);
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
				throw i.errorData !== void 0 ? Oh(i, new Nh(Hu("query", t.udfPath, i))) : new Error(Hu("query", t.udfPath, i));
			}
		}
		hasQueryResult(e) {
			return this.queryResults.get(e) !== void 0;
		}
		queryLogs(e) {
			return this.queryResults.get(e)?.result?.logLines;
		}
	},
	_E = Object.defineProperty,
	SE = (e, t, i) => (t in e ? _E(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	rh = (e, t, i) => SE(e, typeof t != "symbol" ? t + "" : t, i),
	ps = class Ti {
		constructor(t, i) {
			(rh(this, "low"),
				rh(this, "high"),
				rh(this, "__isUnsignedLong__"),
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
			return isNaN(t) || t < 0 ? Tp : t >= wE ? EE : new Ti((t % ls) | 0, (t / ls) | 0);
		}
		toString() {
			return (BigInt(this.high) * BigInt(ls) + BigInt(this.low)).toString();
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
	Tp = new ps(0, 0),
	xp = 65536,
	ls = xp * xp,
	wE = ls * ls,
	EE = new ps(-1, -1),
	TE = Object.defineProperty,
	xE = (e, t, i) => (t in e ? TE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	Zo = (e, t, i) => xE(e, typeof t != "symbol" ? t + "" : t, i),
	Ap = class {
		constructor(e, t) {
			(Zo(this, "version"),
				Zo(this, "remoteQuerySet"),
				Zo(this, "queryPath"),
				Zo(this, "logger"),
				(this.version = { querySet: 0, ts: ps.fromNumber(0), identity: 0 }),
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
						if (u) for (const o of i.logLines) fc(this.logger, "info", "query", u, o);
						const s = Ju(i.value ?? null);
						this.remoteQuerySet.set(i.queryId, { success: !0, value: s, logLines: i.logLines });
						break;
					}
					case "QueryFailed": {
						const u = this.queryPath(i.queryId);
						if (u) for (const o of i.logLines) fc(this.logger, "info", "query", u, o);
						const { errorData: s } = i;
						this.remoteQuerySet.set(i.queryId, {
							success: !1,
							errorMessage: i.errorMessage,
							errorData: s !== void 0 ? Ju(s) : void 0,
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
function ih(e) {
	const t = fs(e);
	return ps.fromBytesLE(Array.from(t));
}
function AE(e) {
	const t = new Uint8Array(e.toBytesLE());
	return ds(t);
}
function Rp(e) {
	switch (e.type) {
		case "FatalError":
		case "AuthError":
		case "ActionResponse":
		case "TransitionChunk":
		case "Ping":
			return { ...e };
		case "MutationResponse":
			return e.success ? { ...e, ts: ih(e.ts) } : { ...e };
		case "Transition":
			return {
				...e,
				startVersion: { ...e.startVersion, ts: ih(e.startVersion.ts) },
				endVersion: { ...e.endVersion, ts: ih(e.endVersion.ts) },
			};
		default:
	}
}
function RE(e) {
	switch (e.type) {
		case "Authenticate":
		case "ModifyQuerySet":
		case "Mutation":
		case "Action":
		case "Event":
			return { ...e };
		case "Connect":
			return e.maxObservedTimestamp !== void 0
				? { ...e, maxObservedTimestamp: AE(e.maxObservedTimestamp) }
				: { ...e, maxObservedTimestamp: void 0 };
		default:
	}
}
var CE = Object.defineProperty,
	kE = (e, t, i) => (t in e ? CE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	cn = (e, t, i) => kE(e, typeof t != "symbol" ? t + "" : t, i),
	ME = 1e3,
	NE = 1001,
	OE = 1005,
	zE = 4040,
	uc;
function Vu() {
	return (
		uc === void 0 && (uc = Date.now()),
		typeof performance > "u" || !performance.now ? Date.now() : Math.round(uc + performance.now())
	);
}
function Cp() {
	return `t=${Math.round((Vu() - uc) / 100) / 10}s`;
}
var Eb = {
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
function DE(e) {
	if (e === void 0) return "Unknown";
	for (const t of Object.keys(Eb)) if (e.startsWith(t)) return t;
	return "Unknown";
}
var jE = class {
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
			const i = Rp(JSON.parse(t));
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
							clientTs: Vu(),
						})),
					this.lastCloseReason !== "InitialConnect" &&
						(this.lastCloseReason
							? this.logger.log("WebSocket reconnected at", Cp(), "after disconnect due to", this.lastCloseReason)
							: this.logger.log("WebSocket reconnected at", Cp())),
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
				let u = Rp(JSON.parse(t.data));
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
					t.code !== ME && t.code !== NE && t.code !== OE && t.code !== zE)
				) {
					let u = `WebSocket closed with code ${t.code}`;
					(t.reason && (u += `: ${t.reason}`),
						this.logger.log(u),
						this.onServerDisconnectError && t.reason && this.onServerDisconnectError(u));
				}
				const i = DE(t.reason);
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
			const i = RE(e),
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
		const i = Vu(),
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
			const t = Vu() - this.scheduledReconnect.scheduledAt;
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
							clientTs: Vu(),
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
			(e === "client" ? 100 : e === "Unknown" ? this.defaultInitialBackoff : Eb[e].timeout) * Math.pow(2, this.retries);
		this.retries += 1;
		const i = Math.min(t, this.maxBackoff);
		return i + i * (Math.random() - 0.5);
	}
	reportLargeTransition({ transition: e, messageLength: t }) {
		if (e.clientClockSkew === void 0 || e.serverTs === void 0) return;
		const i = Vu() - e.clientClockSkew - e.serverTs / 1e6,
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
function IE() {
	return LE();
}
function LE() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
		const t = (Math.random() * 16) | 0;
		return (e === "x" ? t : (t & 3) | 8).toString(16);
	});
}
var is = class extends Error {};
is.prototype.name = "InvalidTokenError";
function qE(e) {
	return decodeURIComponent(
		atob(e).replace(/(.)/g, (t, i) => {
			let u = i.charCodeAt(0).toString(16).toUpperCase();
			return (u.length < 2 && (u = "0" + u), "%" + u);
		}),
	);
}
function UE(e) {
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
		return qE(t);
	} catch {
		return atob(t);
	}
}
function Tb(e, t) {
	if (typeof e != "string") throw new is("Invalid token specified: must be a string");
	t || (t = {});
	const i = t.header === !0 ? 0 : 1,
		u = e.split(".")[i];
	if (typeof u != "string") throw new is(`Invalid token specified: missing part #${i + 1}`);
	let s;
	try {
		s = UE(u);
	} catch (o) {
		throw new is(`Invalid token specified: invalid base64 for part #${i + 1} (${o.message})`);
	}
	try {
		return JSON.parse(s);
	} catch (o) {
		throw new is(`Invalid token specified: invalid json for part #${i + 1} (${o.message})`);
	}
}
var $E = Object.defineProperty,
	BE = (e, t, i) => (t in e ? $E(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	tr = (e, t, i) => BE(e, typeof t != "symbol" ? t + "" : t, i),
	VE = 480 * 60 * 60 * 1e3,
	kp = 2,
	HE = class {
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
					(this.authState.state === "waitingForServerConfirmationOfFreshToken" && this.tokenConfirmationAttempts >= kp))
			) {
				(this.logger.error(`Failed to authenticate: "${e.error}", check your server auth config`),
					this.syncState.hasAuth() && this.syncState.clearAuth(),
					this.authState.state !== "noAuth" && this.setAndReportAuthFailed(this.authState.config.onAuthChange));
				return;
			}
			if (
				(this.authState.state === "waitingForServerConfirmationOfFreshToken" &&
					(this.tokenConfirmationAttempts++,
					this._logVerbose(`retrying reauthentication, ${kp - this.tokenConfirmationAttempts} attempts remaining`)),
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
			let h = Math.min(VE, (f - this.refreshTokenLeewaySeconds) * 1e3);
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
				return Tb(e);
			} catch (t) {
				return (this._logVerbose(`Error decoding token: ${t instanceof Error ? t.message : "Unknown error"}`), null);
			}
		}
		_logVerbose(e) {
			this.logger.logVerbose(`${e} [v${this.configVersion}]`);
		}
	},
	ZE = ["convexClientConstructed", "convexWebSocketOpen", "convexFirstMessageReceived"];
function PE(e, t) {
	const i = { sessionId: t };
	typeof performance > "u" || !performance.mark || performance.mark(e, { detail: i });
}
function QE(e) {
	let t = e.name.slice(6);
	return ((t = t.charAt(0).toLowerCase() + t.slice(1)), { name: t, startTime: e.startTime });
}
function KE(e) {
	if (typeof performance > "u" || !performance.getEntriesByName) return [];
	const t = [];
	for (const i of ZE) {
		const u = performance
			.getEntriesByName(i)
			.filter((s) => s.entryType === "mark")
			.filter((s) => s.detail.sessionId === e);
		t.push(...u);
	}
	return t.map(QE);
}
var YE = Object.defineProperty,
	GE = (e, t, i) => (t in e ? YE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	fn = (e, t, i) => GE(e, typeof t != "symbol" ? t + "" : t, i),
	FE = class {
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
					this.debug && PE(b, this.sessionId);
				}),
				typeof e == "object")
			)
				throw new Error(
					"Passing a ClientConfig object is no longer supported. Pass the URL of the Convex deployment as a string directly.",
				);
			(i?.skipConvexDeploymentUrlCheck !== !0 && vb(e), (i = { ...i }));
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
			const v = `${m}://${f}/api/${gp}/sync`;
			((this.state = new oE()),
				(this.remoteQuerySet = new Ap((b) => this.state.queryPath(b), this.logger)),
				(this.requestManager = new dE(this.logger, this.markConnectionStateDirty)));
			const g = () => {
				(this.webSocketManager.pause(), this.state.pause());
			};
			((this.authenticationManager = new HE(
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
				(this.optimisticQueryResults = new bE()),
				this.addOnTransitionHandler((b) => {
					t(b.queries.map((p) => p.token));
				}),
				(this._nextRequestId = 0),
				(this._sessionId = IE()));
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
			((this.webSocketManager = new jE(
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
							(this.remoteQuerySet = new Ap((A) => this.state.queryPath(A), this.logger)));
						const [p, x] = this.state.restart();
						(x && this.webSocketManager.sendMessage(x), this.webSocketManager.sendMessage(p));
						for (const A of this.requestManager.restart()) this.webSocketManager.sendMessage(A);
					},
					onResume: () => {
						const [b, p] = this.state.resume();
						(p && this.webSocketManager.sendMessage(p), b && this.webSocketManager.sendMessage(b));
						for (const x of this.requestManager.resume()) this.webSocketManager.sendMessage(x);
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
					t = e ? Tb(e.value) : {};
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
			const u = da(t),
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
			const i = Ya(e, da(t));
			return this.optimisticQueryResults.queryResult(i);
		}
		localQueryResultByToken(e) {
			return this.optimisticQueryResults.queryResult(e);
		}
		hasLocalQueryResultByToken(e) {
			return this.optimisticQueryResults.hasQueryResult(e);
		}
		localQueryLogs(e, t) {
			const i = Ya(e, da(t));
			return this.optimisticQueryResults.queryLogs(i);
		}
		queryJournal(e, t) {
			const i = Ya(e, da(t));
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
				throw u.errorData !== void 0 ? Oh(u, new Nh(Hu("mutation", e, u))) : new Error(Hu("mutation", e, u));
			return u.value;
		}
		async mutationInternal(e, t, i, u) {
			const { mutationPromise: s } = this.enqueueMutation(e, t, i, u);
			return s;
		}
		enqueueMutation(e, t, i, u) {
			const s = da(t);
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
			const f = { type: "Mutation", requestId: o, udfPath: e, componentPath: u, args: [Fa(s)] },
				h = this.webSocketManager.sendMessage(f);
			return { requestId: o, mutationPromise: this.requestManager.request(f, h) };
		}
		async action(e, t) {
			const i = await this.actionInternal(e, t);
			if (!i.success) throw i.errorData !== void 0 ? Oh(i, new Nh(Hu("action", e, i))) : new Error(Hu("action", e, i));
			return i.value;
		}
		async actionInternal(e, t, i) {
			const u = da(t),
				s = this.nextRequestId;
			(this._nextRequestId++, this.tryReportLongDisconnect());
			const o = { type: "Action", requestId: s, udfPath: e, componentPath: i, args: [Fa(u)] },
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
				const e = KE(this.sessionId);
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
				headers: { "Content-Type": "application/json", "Convex-Client": `npm-${gp}` },
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
function ah(e) {
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
var XE = Object.defineProperty,
	JE = (e, t, i) => (t in e ? XE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	Mp = (e, t, i) => JE(e, typeof t != "symbol" ? t + "" : t, i),
	WE = class {
		constructor(e, t) {
			((this.client = e),
				(this.onTransition = t),
				Mp(this, "paginatedQuerySet", new Map()),
				Mp(this, "lastTransitionTs"),
				(this.lastTransitionTs = ps.fromNumber(0)),
				this.client.addOnTransitionHandler((i) => this.onBaseTransition(i)));
		}
		subscribe(e, t, i) {
			const u = Xa(e),
				s = wp(u, t, i),
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
			const u = wp(Xa(e), t, i);
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
				const v = ah(m);
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
			const s = ah(u);
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
					const g = ah(v);
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
	eT = Object.defineProperty,
	tT = (e, t, i) => (t in e ? eT(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	$u = (e, t, i) => tT(e, typeof t != "symbol" ? t + "" : t, i),
	Np,
	nT = class {
		constructor(e, t = {}) {
			($u(this, "listeners"),
				$u(this, "_client"),
				$u(this, "_paginatedClient"),
				$u(this, "callNewListenersWithCurrentValuesTimer"),
				$u(this, "_closed"),
				$u(this, "_disabled"),
				t.skipConvexDeploymentUrlCheck !== !0 && vb(e));
			const { disabled: i, ...u } = t;
			((this._closed = !1),
				(this._disabled = !!i),
				Np && !("webSocketConstructor" in u) && typeof WebSocket > "u" && (u.webSocketConstructor = Np),
				typeof window > "u" && !("unsavedChangesWarning" in u) && (u.unsavedChangesWarning = !1),
				this.disabled ||
					((this._client = new FE(e, () => {}, u)),
					(this._paginatedClient = new WE(this._client, (s) => this._transition(s)))),
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
	Op = 6e4,
	rT = 500,
	iT = 1e4,
	aT = 1e3,
	uT = 3e4,
	lT = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
	zp = 128,
	Dp = 109,
	jp = 100,
	sT = /^[\x21-\x7e]+$/,
	Ip = 100,
	Lp = 16,
	Po = 6,
	qp = 100;
function Up(e) {
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
function $p(e) {
	const t = document.documentElement;
	for (const [i, u] of Object.entries(e.tokens)) t.style.setProperty(i, u);
	(t.classList.toggle("light", e.mode === "light"), t.classList.toggle("dark", e.mode === "dark"));
}
var mc = { reason: "denied", message: "This plugin no longer has access to its data" },
	Ka = { reason: "session_expired", message: "This plugin session expired" },
	Ci = { reason: "unavailable", message: "The plugin data connection is unavailable" };
function oT(e) {
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
function Bp() {
	return { _nay: { name: "unavailable", message: "Failed to read who can access this" } };
}
function cT(e) {
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
function fT(e) {
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
function dT() {
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
	if (!lT.test(o)) throw new Error("Invalid host bridge nonce");
	return { parentOrigin: s, nonce: o };
}
function Qo(e) {
	return e.collection.length === 0 || e.collection.length > zp
		? `Collection names must be 1 to ${zp} characters`
		: e.keyPrefix !== void 0 && (e.keyPrefix.length > Dp || !sT.test(e.keyPrefix))
			? `Key prefixes must be 1 to ${Dp} printable ASCII characters`
			: !Number.isInteger(e.limit) || e.limit < 1 || e.limit > jp
				? `Watch limits must be integers from 1 to ${jp}`
				: null;
}
function hT(e) {
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
				atCapacity: t.forceAtCapacity || t.intervals.length >= Po || e.page_at_ceiling(),
				incomplete: t.intervals.some((L, Q) =>
					L.end === null ||
					!L.truncated ||
					L.docs === null ||
					(t.pending && Q >= t.pending.from && Q < t.pending.from + t.pending.removeCount)
						? !1
						: o(L) === null || h() + 1 > Po || e.page_at_ceiling(2),
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
			(C.stop(), (C.end = L), (C.truncated = !1), (t.bottomOpen = !0), s(C) || u(Ci));
		},
		x = () => {
			if (t.dead || t.loadingOlder || t.pending || !g().hasMore) return;
			const C = t.intervals[t.intervals.length - 1];
			if (!C || C.end === null) return;
			if (f() + 1 > Po || e.page_at_ceiling()) {
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
				t.queuedLoadOlder && ((t.queuedLoadOlder = !1), x());
				for (const [k, L] of t.intervals.entries()) {
					if (L.end === null || !L.truncated || L.docs === null) continue;
					const Q = o(L);
					if (Q === null) continue;
					if (f() + 1 > Po) break;
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
					const L = e.session_expired() ? Ka : Ci;
					(L === Ci && console.error("[bonobo-plugin-sdk] Plugin data window interval failed:", k.queryError), u(L));
					return;
				}
				if (k.value === null) {
					u(mc);
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
						x();
					}
				},
				dispose: () => {
					t.dead || i();
				},
			})
		: null;
}
function mT(e) {
	const t = new Set();
	let i = 0;
	const u = () => (i >= qp ? !1 : ((i += 1), !0)),
		s = () => {
			i -= 1;
		},
		o = (p = 1) => i + p > qp,
		f = (p, x) => {
			setTimeout(() => {
				x ? p(null, x) : p(null);
			}, 0);
		},
		h = (p) => {
			(console.warn("[bonobo-plugin-sdk] Data watch refused, subscription cap reached"),
				f(p, { reason: "capacity", message: "Subscription limit reached for this plugin frame" }));
		},
		m = (p) => {
			if (t.size >= Lp || o()) return (h(p.onUpdate), () => {});
			if (!u()) return (h(p.onUpdate), () => {});
			const x = {};
			t.add(x);
			let A = null;
			const N = () => {
				t.delete(x) && (A?.dispose(), s());
			};
			return (
				(A = p.start((q) => {
					if (t.has(x)) {
						if ("queryError" in q) {
							const I = e.session_expired() ? Ka : Ci;
							(I === Ci && console.error(`[bonobo-plugin-sdk] Plugin ${p.failureLabel} failed:`, q.queryError),
								N(),
								p.onUpdate(null, I));
							return;
						}
						if (q.value === null) {
							(N(), p.onUpdate(null, mc));
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
			watch(p, x) {
				const A = Qo({
					collection: p.collection,
					...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
					limit: p.limit,
				});
				return A
					? (f(x, { reason: "invalid", message: A }), () => {})
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
							onUpdate: x,
							deliver: (N) => ({ docs: N.docs, truncated: N.truncated }),
							failureLabel: "data watch",
						});
			},
			watchRecent(p, x) {
				const A = Qo({ collection: p.collection, limit: p.limit });
				return A
					? (f(x, { reason: "invalid", message: A }), () => {})
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
							onUpdate: x,
							deliver: (N) => ({ docs: N.docs, truncated: N.truncated }),
							failureLabel: "recent watch",
						});
			},
			watchChanges(p, x) {
				const A = Qo({ collection: p.collection, limit: p.limit });
				return A
					? (f(x, { reason: "invalid", message: A }), () => {})
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
							onUpdate: x,
							deliver: (N) => ({ docs: N.docs, truncated: N.truncated }),
							failureLabel: "changes watch",
						});
			},
			watchWindow(p, x) {
				const A = { loadOlder() {}, unsubscribe() {} },
					N = Qo({
						collection: p.collection,
						...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
						limit: p.pageSize,
					});
				if (N) return (f(x, { reason: "invalid", message: N }), A);
				if (t.size >= Lp || o()) return (h(x), A);
				const q = {};
				t.add(q);
				const I = hT({
					queryArgs: {
						collection: p.collection,
						...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
						limit: p.pageSize,
					},
					start_watch: e.start_watch,
					acquire_server_slot: u,
					release_server_slot: s,
					page_at_ceiling: o,
					post_update: (C) => x(C),
					on_dead: (C) => {
						(t.delete(q), x(null, C));
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
					: (t.delete(q), console.error("[bonobo-plugin-sdk] Plugin data window could not start"), f(x), A);
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
	function g(p, x) {
		return Promise.resolve()
			.then(() => e.run_user_write(p, x))
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
				.then((x) => (x === null ? {} : x.members))
				.catch((x) => (console.error("[bonobo-plugin-sdk] Failed to resolve plugin member names:", x), {}));
		},
		list(p) {
			return !Number.isInteger(p.limit) || p.limit < 1 || p.limit > Ip
				? Promise.resolve({ _nay: { name: "invalid", message: `Member list limits must be integers from 1 to ${Ip}` } })
				: Promise.resolve()
						.then(() => e.list_members(p.limit, p.cursor ?? null))
						.then((x) =>
							x === null
								? { _nay: { name: mc.reason, message: "This plugin no longer has access to this workspace" } }
								: "refusal" in x
									? {
											_nay: {
												name: "not_consented",
												message: "This workspace has not granted this plugin the member list",
											},
										}
									: { _yay: { members: x.members, cursor: x.cursor } },
						)
						.catch((x) => {
							const A = e.session_expired() ? Ka : Ci;
							return (
								A === Ci && console.error("[bonobo-plugin-sdk] Failed to list plugin workspace members:", x),
								{ _nay: { name: A.reason, message: A.message } }
							);
						});
		},
	};
	function b(p) {
		return Promise.resolve()
			.then(() => e.run_manage_scope(p))
			.then((x) => x)
			.catch(
				(x) => (
					console.error("[bonobo-plugin-sdk] Plugin scope change failed:", x),
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
					.then((x) => {
						const A = oT(x);
						return A === void 0
							? (console.error("[bonobo-plugin-sdk] Plugin scope principals response was invalid"), Bp())
							: { _yay: A };
					})
					.catch((x) => (console.error("[bonobo-plugin-sdk] Failed to read plugin scope principals:", x), Bp()));
			},
			watchMine(p) {
				return m({
					start: (x) => e.start_my_scopes_watch(x),
					onUpdate: p,
					deliver: (x) => x,
					failureLabel: "scope watch",
				});
			},
		},
	};
}
function vT(e) {
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
async function gT() {
	const { parentOrigin: e, nonce: t } = dT();
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
		return Date.now() >= s - Op ? b() : u;
	}
	function b() {
		if (g) return g;
		const C = crypto.randomUUID();
		return (
			(g = new Promise((k, L) => {
				const Q = setTimeout(() => {
					(v.delete(C), L(new Error("Plugin frame token refresh timed out")));
				}, iT);
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
	const p = () => o !== "" && Date.now() < f - Op,
		x = (C) => {
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
						const L = cT(k);
						return L === void 0
							? (console.error("[bonobo-plugin-sdk] Plugin backend invoke response was invalid"),
								{ _nay: { name: Ci.reason, message: "Failed to run the plugin backend" } })
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
									? { _nay: { name: Ka.reason, message: Ka.message } }
									: { _nay: { name: mc.reason, message: O ?? "This plugin may not run its backend here" } }
								: Q !== null && Q < 500 && O !== null
									? { _nay: { name: "invalid", message: O } }
									: Date.now() >= s
										? { _nay: { name: Ka.reason, message: Ka.message } }
										: (console.error("[bonobo-plugin-sdk] Plugin backend invoke failed:", k),
											{ _nay: { name: Ci.reason, message: "Failed to run the plugin backend" } });
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
						fT(V.context)
					) {
						((k = !0),
							K(),
							window.removeEventListener("pagehide", K),
							(i = V.apiOrigin),
							(u = V.token),
							(s = V.tokenExpiresAt),
							x(V));
						const Y = new nT(V.convexUrl, { expectAuth: !0, unsavedChangesWarning: !1, initialAuthTokenReuse: !0 });
						let ae = Date.now();
						const se = setInterval(() => {
							const B = Date.now();
							(B - ae >= uT && Y.setAuth(I), (ae = B));
						}, aT);
						(Y.setAuth(I),
							window.addEventListener(
								"pagehide",
								() => {
									(clearInterval(se), Y.close());
								},
								{ once: !0 },
							),
							(h = Up(V.theme)),
							h && $p(h));
						const { data: te, members: fe, scopes: j } = mT({ ...vT(Y), session_expired: () => Date.now() >= s });
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
							x(V),
							Y.resolve(V.token));
					} else if (k && V.nonce === t && V.type === "bonobo:theme") {
						const Y = Up(V.theme);
						if (Y) {
							((h = Y), $p(Y));
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
			(L = setInterval(Q, rT)));
	});
}
var yT = Lr((e) => {
		function t(j, B) {
			var P = j.length;
			j.push(B);
			e: for (; 0 < P; ) {
				var ve = (P - 1) >>> 1,
					be = j[ve];
				if (0 < s(be, B)) ((j[ve] = B), (j[P] = be), (P = ve));
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
				e: for (var ve = 0, be = j.length, Pe = be >>> 1; ve < Pe; ) {
					var M = 2 * (ve + 1) - 1,
						D = j[M],
						le = M + 1,
						oe = j[le];
					if (0 > s(D, P))
						le < be && 0 > s(oe, D) ? ((j[ve] = oe), (j[le] = P), (ve = le)) : ((j[ve] = D), (j[M] = P), (ve = M));
					else if (le < be && 0 > s(oe, P)) ((j[ve] = oe), (j[le] = P), (ve = le));
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
			x = !1,
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
			if (((A = !1), k(j), !x))
				if (i(m) !== null) ((x = !0), Q || ((Q = !0), ae()));
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
						((x = !1), A && ((A = !1), I(K), (K = -1)), (p = !0));
						var P = b;
						try {
							t: {
								for (k(j), S = i(m); S !== null && !(S.expirationTime > j && V()); ) {
									var ve = S.callback;
									if (typeof ve == "function") {
										((S.callback = null), (b = S.priorityLevel));
										var be = ve(S.expirationTime <= j);
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
				var ve = e.unstable_now();
				switch (
					(typeof P == "object" && P !== null
						? ((P = P.delay), (P = typeof P == "number" && 0 < P ? ve + P : ve))
						: (P = ve),
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
					P > ve
						? ((j.sortIndex = P),
							t(v, j),
							i(m) === null && j === i(v) && (A ? (I(K), (K = -1)) : (A = !0), fe(L, P - ve)))
						: ((j.sortIndex = be), t(m, j), x || p || ((x = !0), Q || ((Q = !0), ae()))),
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
	pT = Lr((e, t) => {
		t.exports = yT();
	}),
	bT = Lr((e) => {
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
		function x(M) {
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
		function B(M, D, le, oe, he) {
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
								return ((Re = M._init), B(Re(M._payload), D, le, oe, he));
						}
				}
			if (Re)
				return (
					(he = he(M)),
					(Re = oe === "" ? "." + fe(M, 0) : oe),
					Q(he)
						? ((le = ""),
							Re != null && (le = Re.replace(te, "$&/") + "/"),
							B(he, D, le, "", function (pt) {
								return pt;
							}))
						: he != null &&
							(ae(he) &&
								(he = Y(
									he,
									le + (he.key == null || (M && M.key === he.key) ? "" : ("" + he.key).replace(te, "$&/") + "/") + Re,
								)),
							D.push(he)),
					1
				);
			Re = 0;
			var Le = oe === "" ? "." : oe + ":";
			if (Q(M))
				for (var Xe = 0; Xe < M.length; Xe++) ((oe = M[Xe]), (Se = Le + fe(oe, Xe)), (Re += B(oe, D, le, Se, he)));
			else if (((Xe = x(M)), typeof Xe == "function"))
				for (M = Xe.call(M), Xe = 0; !(oe = M.next()).done; )
					((oe = oe.value), (Se = Le + fe(oe, Xe++)), (Re += B(oe, D, le, Se, he)));
			else if (Se === "object") {
				if (typeof M.then == "function") return B(j(M), D, le, oe, he);
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
				he = 0;
			return (
				B(M, oe, "", "", function (Se) {
					return D.call(le, Se, he++);
				}),
				oe
			);
		}
		function ve(M) {
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
					he = M.key;
				if (D != null)
					for (Se in (D.key !== void 0 && (he = "" + D.key), D))
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
				return V(M.type, he, oe);
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
					he = {},
					Se = null;
				if (D != null)
					for (oe in (D.key !== void 0 && (Se = "" + D.key), D))
						$.call(D, oe) && oe !== "key" && oe !== "__self" && oe !== "__source" && (he[oe] = D[oe]);
				var Re = arguments.length - 2;
				if (Re === 1) he.children = le;
				else if (1 < Re) {
					for (var Le = Array(Re), Xe = 0; Xe < Re; Xe++) Le[Xe] = arguments[Xe + 2];
					he.children = Le;
				}
				if (M && M.defaultProps) for (oe in ((Re = M.defaultProps), Re)) he[oe] === void 0 && (he[oe] = Re[oe]);
				return V(M, Se, he);
			}),
			(e.createRef = function () {
				return { current: null };
			}),
			(e.forwardRef = function (M) {
				return { $$typeof: m, render: M };
			}),
			(e.isValidElement = ae),
			(e.lazy = function (M) {
				return { $$typeof: S, _payload: { _status: -1, _result: M }, _init: ve };
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
						he = O.S;
					(he !== null && he(le, oe),
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
	Cc = Lr((e, t) => {
		t.exports = bT();
	}),
	_T = Lr((e) => {
		var t = Cc();
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
						x = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
					S === "style"
						? s.d.S(v, typeof g.precedence == "string" ? g.precedence : void 0, {
								crossOrigin: b,
								integrity: p,
								fetchPriority: x,
							})
						: S === "script" &&
							s.d.X(v, {
								crossOrigin: b,
								integrity: p,
								fetchPriority: x,
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
	xb = Lr((e, t) => {
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
		(i(), (t.exports = _T()));
	}),
	ST = Lr((e) => {
		var t = pT(),
			i = Cc(),
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
					for (var y = !1, T = c.child; T; ) {
						if (T === a) {
							((y = !0), (a = c), (l = d));
							break;
						}
						if (T === l) {
							((y = !0), (l = c), (a = d));
							break;
						}
						T = T.sibling;
					}
					if (!y) {
						for (T = d.child; T; ) {
							if (T === a) {
								((y = !0), (a = d), (l = c));
								break;
							}
							if (T === l) {
								((y = !0), (l = d), (a = c));
								break;
							}
							T = T.sibling;
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
			x = Symbol.for("react.transitional.element"),
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
			ve = { pending: !1, data: null, method: null, action: null },
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
			he = M(null),
			Se = M(null),
			Re = M(null);
		function Le(n, r) {
			switch ((le(Se, r), le(he, n), le(oe, null), r.nodeType)) {
				case 9:
				case 11:
					n = (n = r.documentElement) && (n = n.namespaceURI) ? Vy(n) : 0;
					break;
				default:
					if (((n = r.tagName), (r = r.namespaceURI))) ((r = Vy(r)), (n = Hy(r, n)));
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
			(D(oe), D(he), D(Se));
		}
		function pt(n) {
			n.memoizedState !== null && le(Re, n);
			var r = oe.current,
				a = Hy(r, n.type);
			r !== a && (le(he, n), le(oe, a));
		}
		function At(n) {
			(he.current === n && (D(oe), D(he)), Re.current === n && (D(Re), (Wl._currentValue = ve)));
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
					T = d[1];
				if (y && T) {
					var z = y.split(`
`),
						X = T.split(`
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
			pr = t.unstable_LowPriority,
			Gr = t.unstable_IdlePriority,
			br = t.log,
			Pn = t.unstable_setDisableYieldValue,
			kn = null,
			_t = null;
		function tn(n) {
			if ((typeof br == "function" && Pn(n), _t && typeof _t.setStrictMode == "function"))
				try {
					_t.setStrictMode(kn, n);
				} catch {}
		}
		var ct = Math.clz32 ? Math.clz32 : _n,
			_r = Math.log,
			ar = Math.LN2;
		function _n(n) {
			return ((n >>>= 0), n === 0 ? 32 : (31 - ((_r(n) / ar) | 0)) | 0);
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
			var T = l & 134217727;
			return (
				T !== 0
					? ((l = T & ~d),
						l !== 0 ? (c = Mn(l)) : ((y &= T), y !== 0 ? (c = Mn(y)) : a || ((a = T & ~n), a !== 0 && (c = Mn(a)))))
					: ((T = l & ~d), T !== 0 ? (c = Mn(T)) : y !== 0 ? (c = Mn(y)) : a || ((a = l & ~n), a !== 0 && (c = Mn(a)))),
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
		function Sr(n, r) {
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
		function wr(n, r, a, l, c, d) {
			var y = n.pendingLanes;
			((n.pendingLanes = a),
				(n.suspendedLanes = 0),
				(n.pingedLanes = 0),
				(n.warmLanes = 0),
				(n.expiredLanes &= a),
				(n.entangledLanes &= a),
				(n.errorRecoveryDisabledLanes &= a),
				(n.shellSuspendCounter = 0));
			var T = n.entanglements,
				z = n.expirationTimes,
				X = n.hiddenUpdates;
			for (a = y & ~a; 0 < a; ) {
				var ne = 31 - ct(a),
					ue = 1 << ne;
				((T[ne] = 0), (z[ne] = -1));
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
		function wa(n, r) {
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
		function qi() {
			var n = P.p;
			return n !== 0 ? n : ((n = window.event), n === void 0 ? 32 : cp(n.type));
		}
		function Ea(n, r) {
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
			Er = "__reactContainer$" + qt,
			Ur = "__reactEvents$" + qt,
			Tr = "__reactListeners$" + qt,
			li = "__reactHandles$" + qt,
			Ui = "__reactResources$" + qt,
			Kn = "__reactMarker$" + qt;
		function $i(n) {
			(delete n[Dt], delete n[rn], delete n[Ur], delete n[Tr], delete n[li]);
		}
		function Kt(n) {
			var r = n[Dt];
			if (r) return r;
			for (var a = n.parentNode; a; ) {
				if ((r = a[Er] || a[Dt])) {
					if (((a = r.alternate), r.child !== null || (a !== null && a.child !== null)))
						for (n = Fy(n); n !== null; ) {
							if ((a = n[Dt])) return a;
							n = Fy(n);
						}
					return r;
				}
				((n = a), (a = n.parentNode));
			}
			return null;
		}
		function Yn(n) {
			if ((n = n[Dt] || n[Er])) {
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
			var r = n[Ui];
			return (r || (r = n[Ui] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), r);
		}
		function Rt(n) {
			n[Kn] = !0;
		}
		var Ta = new Set(),
			J = {};
		function me(n, r) {
			(Te(n, r), Te(n + "Capture", r));
		}
		function Te(n, r) {
			for (J[n] = r, n = 0; n < r.length; n++) Ta.add(r[n]);
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
		function $r(n, r, a) {
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
		function Bi(n) {
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
		function xr(n) {
			if (!n._valueTracker) {
				var r = Bi(n) ? "checked" : "value";
				n._valueTracker = an(n, r, "" + n[r]);
			}
		}
		function qn(n) {
			if (!n) return !1;
			var r = n._valueTracker;
			if (!r) return !0;
			var a = r.getValue(),
				l = "";
			return (n && (l = Bi(n) ? (n.checked ? "true" : "false") : n.value), (n = l), n !== a ? (r.setValue(n), !0) : !1);
		}
		function Fr(n) {
			if (((n = n || (typeof document < "u" ? document : void 0)), typeof n > "u")) return null;
			try {
				return n.activeElement || n.body;
			} catch {
				return n.body;
			}
		}
		var ol = /[\n"\\]/g;
		function wn(n) {
			return n.replace(ol, function (r) {
				return "\\" + r.charCodeAt(0).toString(16) + " ";
			});
		}
		function cl(n, r, a, l, c, d, y, T) {
			((n.name = ""),
				y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean"
					? (n.type = y)
					: n.removeAttribute("type"),
				r != null
					? y === "number"
						? ((r === 0 && n.value === "") || n.value != r) && (n.value = "" + Yt(r))
						: n.value !== "" + Yt(r) && (n.value = "" + Yt(r))
					: (y !== "submit" && y !== "reset") || n.removeAttribute("value"),
				r != null ? fl(n, y, Yt(r)) : a != null ? fl(n, y, Yt(a)) : l != null && n.removeAttribute("value"),
				c == null && d != null && (n.defaultChecked = !!d),
				c != null && (n.checked = c && typeof c != "function" && typeof c != "symbol"),
				T != null && typeof T != "function" && typeof T != "symbol" && typeof T != "boolean"
					? (n.name = "" + Yt(T))
					: n.removeAttribute("name"));
		}
		function js(n, r, a, l, c, d, y, T) {
			if (
				(d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (n.type = d),
				r != null || a != null)
			) {
				if (!((d !== "submit" && d !== "reset") || r != null)) {
					xr(n);
					return;
				}
				((a = a != null ? "" + Yt(a) : ""),
					(r = r != null ? "" + Yt(r) : a),
					T || r === n.value || (n.value = r),
					(n.defaultValue = r));
			}
			((l = l ?? c),
				(l = typeof l != "function" && typeof l != "symbol" && !!l),
				(n.checked = T ? n.checked : !!l),
				(n.defaultChecked = !!l),
				y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (n.name = y),
				xr(n));
		}
		function fl(n, r, a) {
			(r === "number" && Fr(n.ownerDocument) === n) || n.defaultValue === "" + a || (n.defaultValue = "" + a);
		}
		function Br(n, r, a, l) {
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
		function dl(n, r, a, l) {
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
				xr(n));
		}
		function Vr(n, r) {
			if (r) {
				var a = n.firstChild;
				if (a && a === n.lastChild && a.nodeType === 3) {
					a.nodeValue = r;
					return;
				}
			}
			n.textContent = r;
		}
		var Is = new Set(
			"animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
				" ",
			),
		);
		function Ls(n, r, a) {
			var l = r.indexOf("--") === 0;
			a == null || typeof a == "boolean" || a === ""
				? l
					? n.setProperty(r, "")
					: r === "float"
						? (n.cssFloat = "")
						: (n[r] = "")
				: l
					? n.setProperty(r, a)
					: typeof a != "number" || a === 0 || Is.has(r)
						? r === "float"
							? (n.cssFloat = a)
							: (n[r] = ("" + a).trim())
						: (n[r] = a + "px");
		}
		function hl(n, r, a) {
			if (r != null && typeof r != "object") throw Error(s(62));
			if (((n = n.style), a != null)) {
				for (var l in a)
					!a.hasOwnProperty(l) ||
						(r != null && r.hasOwnProperty(l)) ||
						(l.indexOf("--") === 0 ? n.setProperty(l, "") : l === "float" ? (n.cssFloat = "") : (n[l] = ""));
				for (var c in r) ((l = r[c]), r.hasOwnProperty(c) && a[c] !== l && Ls(n, c, l));
			} else for (var d in r) r.hasOwnProperty(d) && Ls(n, d, r[d]);
		}
		function ml(n) {
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
		var qs = new Map([
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
			tf =
				/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
		function xa(n) {
			return tf.test("" + n)
				? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
				: n;
		}
		function On() {}
		var vl = null;
		function $n(n) {
			return (
				(n = n.target || n.srcElement || window),
				n.correspondingUseElement && (n = n.correspondingUseElement),
				n.nodeType === 3 ? n.parentNode : n
			);
		}
		var Vi = null,
			Hr = null;
		function gl(n) {
			var r = Yn(n);
			if (r && (n = r.stateNode)) {
				var a = n[rn] || null;
				e: switch (((n = r.stateNode), r.type)) {
					case "input":
						if (
							(cl(n, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name),
							(r = a.name),
							a.type === "radio" && r != null)
						) {
							for (a = n; a.parentNode; ) a = a.parentNode;
							for (a = a.querySelectorAll('input[name="' + wn("" + r) + '"][type="radio"]'), r = 0; r < a.length; r++) {
								var l = a[r];
								if (l !== n && l.form === n.form) {
									var c = l[rn] || null;
									if (!c) throw Error(s(90));
									cl(l, c.value, c.defaultValue, c.defaultValue, c.checked, c.defaultChecked, c.type, c.name);
								}
							}
							for (r = 0; r < a.length; r++) ((l = a[r]), l.form === n.form && qn(l));
						}
						break e;
					case "textarea":
						Un(n, a.value, a.defaultValue);
						break e;
					case "select":
						((r = a.value), r != null && Br(n, !!a.multiple, r, !1));
				}
			}
		}
		var Aa = !1;
		function su(n, r, a) {
			if (Aa) return n(r, a);
			Aa = !0;
			try {
				return n(r);
			} finally {
				if (((Aa = !1), (Vi !== null || Hr !== null) && (wo(), Vi && ((r = Vi), (n = Hr), (Hr = Vi = null), gl(r), n))))
					for (r = 0; r < n.length; r++) gl(n[r]);
			}
		}
		function Hi(n, r) {
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
			ge = null,
			de = null;
		function pe() {
			if (de) return de;
			var n,
				r = ge,
				a = r.length,
				l,
				c = "value" in F ? F.value : F.textContent,
				d = c.length;
			for (n = 0; n < a && r[n] === c[n]; n++);
			var y = a - n;
			for (l = 1; l <= y && r[a - l] === c[d - l]; l++);
			return (de = c.slice(n, 1 < l ? 1 - l : void 0));
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
				for (var T in n) n.hasOwnProperty(T) && ((a = n[T]), (this[T] = a ? a(d) : d[T]));
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
			yl = Ke(Bn),
			ou,
			pl,
			bl,
			Us = b({}, Bn, {
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
				getModifierState: rf,
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
						: (n !== bl &&
								(bl && n.type === "mousemove"
									? ((ou = n.screenX - bl.screenX), (pl = n.screenY - bl.screenY))
									: (pl = ou = 0),
								(bl = n)),
							ou);
				},
				movementY: function (n) {
					return "movementY" in n ? n.movementY : pl;
				},
			}),
			Km = Ke(Us),
			jS = Ke(b({}, Us, { dataTransfer: 0 })),
			nf = Ke(b({}, Bn, { relatedTarget: 0 })),
			IS = Ke(b({}, Oe, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
			LS = Ke(
				b({}, Oe, {
					clipboardData: function (n) {
						return "clipboardData" in n ? n.clipboardData : window.clipboardData;
					},
				}),
			),
			Ym = Ke(b({}, Oe, { data: 0 })),
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
		function rf() {
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
					getModifierState: rf,
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
			Gm = Ke(
				b({}, Us, {
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
					getModifierState: rf,
				}),
			),
			ZS = Ke(b({}, Oe, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
			PS = Ke(
				b({}, Us, {
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
			af = E && "CompositionEvent" in window,
			_l = null;
		E && "documentMode" in document && (_l = document.documentMode);
		var YS = E && "TextEvent" in window && !_l,
			Fm = E && (!af || (_l && 8 < _l && 11 >= _l)),
			Xm = " ",
			Jm = !1;
		function Wm(n, r) {
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
		function ev(n) {
			return ((n = n.detail), typeof n == "object" && "data" in n ? n.data : null);
		}
		var cu = !1;
		function GS(n, r) {
			switch (n) {
				case "compositionend":
					return ev(r);
				case "keypress":
					return r.which !== 32 ? null : ((Jm = !0), Xm);
				case "textInput":
					return ((n = r.data), n === Xm && Jm ? null : n);
				default:
					return null;
			}
		}
		function FS(n, r) {
			if (cu)
				return n === "compositionend" || (!af && Wm(n, r)) ? ((n = pe()), (de = ge = F = null), (cu = !1), n) : null;
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
					return Fm && r.locale !== "ko" ? null : r.data;
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
		function tv(n) {
			var r = n && n.nodeName && n.nodeName.toLowerCase();
			return r === "input" ? !!XS[n.type] : r === "textarea";
		}
		function nv(n, r, a, l) {
			(Vi ? (Hr ? Hr.push(l) : (Hr = [l])) : (Vi = l),
				(r = ko(r, "onChange")),
				0 < r.length && ((a = new lt("onChange", "change", null, a, l)), n.push({ event: a, listeners: r })));
		}
		var Sl = null,
			wl = null;
		function JS(n) {
			jy(n, 0);
		}
		function $s(n) {
			if (qn(Nn(n))) return n;
		}
		function rv(n, r) {
			if (n === "change") return r;
		}
		var iv = !1;
		if (E) {
			var uf;
			if (E) {
				var lf = "oninput" in document;
				if (!lf) {
					var av = document.createElement("div");
					(av.setAttribute("oninput", "return;"), (lf = typeof av.oninput == "function"));
				}
				uf = lf;
			} else uf = !1;
			iv = uf && (!document.documentMode || 9 < document.documentMode);
		}
		function uv() {
			Sl && (Sl.detachEvent("onpropertychange", lv), (wl = Sl = null));
		}
		function lv(n) {
			if (n.propertyName === "value" && $s(wl)) {
				var r = [];
				(nv(r, wl, n, $n(n)), su(JS, r));
			}
		}
		function WS(n, r, a) {
			n === "focusin" ? (uv(), (Sl = r), (wl = a), Sl.attachEvent("onpropertychange", lv)) : n === "focusout" && uv();
		}
		function ew(n) {
			if (n === "selectionchange" || n === "keyup" || n === "keydown") return $s(wl);
		}
		function tw(n, r) {
			if (n === "click") return $s(r);
		}
		function nw(n, r) {
			if (n === "input" || n === "change") return $s(r);
		}
		function rw(n, r) {
			return (n === r && (n !== 0 || 1 / n === 1 / r)) || (n !== n && r !== r);
		}
		var or = typeof Object.is == "function" ? Object.is : rw;
		function El(n, r) {
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
		function sv(n) {
			for (; n && n.firstChild; ) n = n.firstChild;
			return n;
		}
		function ov(n, r) {
			var a = sv(n);
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
				a = sv(a);
			}
		}
		function cv(n, r) {
			return n && r
				? n === r
					? !0
					: n && n.nodeType === 3
						? !1
						: r && r.nodeType === 3
							? cv(n, r.parentNode)
							: "contains" in n
								? n.contains(r)
								: n.compareDocumentPosition
									? !!(n.compareDocumentPosition(r) & 16)
									: !1
				: !1;
		}
		function fv(n) {
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
		function sf(n) {
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
			fu = null,
			of = null,
			Tl = null,
			cf = !1;
		function dv(n, r, a) {
			var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
			cf ||
				fu == null ||
				fu !== Fr(l) ||
				((l = fu),
				"selectionStart" in l && sf(l)
					? (l = { start: l.selectionStart, end: l.selectionEnd })
					: ((l = ((l.ownerDocument && l.ownerDocument.defaultView) || window).getSelection()),
						(l = {
							anchorNode: l.anchorNode,
							anchorOffset: l.anchorOffset,
							focusNode: l.focusNode,
							focusOffset: l.focusOffset,
						})),
				(Tl && El(Tl, l)) ||
					((Tl = l),
					(l = ko(of, "onSelect")),
					0 < l.length &&
						((r = new lt("onSelect", "select", null, r, a)), n.push({ event: r, listeners: l }), (r.target = fu))));
		}
		function Ra(n, r) {
			var a = {};
			return ((a[n.toLowerCase()] = r.toLowerCase()), (a["Webkit" + n] = "webkit" + r), (a["Moz" + n] = "moz" + r), a);
		}
		var du = {
				animationend: Ra("Animation", "AnimationEnd"),
				animationiteration: Ra("Animation", "AnimationIteration"),
				animationstart: Ra("Animation", "AnimationStart"),
				transitionrun: Ra("Transition", "TransitionRun"),
				transitionstart: Ra("Transition", "TransitionStart"),
				transitioncancel: Ra("Transition", "TransitionCancel"),
				transitionend: Ra("Transition", "TransitionEnd"),
			},
			ff = {},
			hv = {};
		E &&
			((hv = document.createElement("div").style),
			"AnimationEvent" in window ||
				(delete du.animationend.animation, delete du.animationiteration.animation, delete du.animationstart.animation),
			"TransitionEvent" in window || delete du.transitionend.transition);
		function Ca(n) {
			if (ff[n]) return ff[n];
			if (!du[n]) return n;
			var r = du[n],
				a;
			for (a in r) if (r.hasOwnProperty(a) && a in hv) return (ff[n] = r[a]);
			return n;
		}
		var mv = Ca("animationend"),
			vv = Ca("animationiteration"),
			gv = Ca("animationstart"),
			aw = Ca("transitionrun"),
			uw = Ca("transitionstart"),
			lw = Ca("transitioncancel"),
			yv = Ca("transitionend"),
			pv = new Map(),
			df =
				"abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
					" ",
				);
		df.push("scrollEnd");
		function Zr(n, r) {
			(pv.set(n, r), me(r, [n]));
		}
		var Bs =
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
			Ar = [],
			hu = 0,
			hf = 0;
		function Vs() {
			for (var n = hu, r = (hf = hu = 0); r < n; ) {
				var a = Ar[r];
				Ar[r++] = null;
				var l = Ar[r];
				Ar[r++] = null;
				var c = Ar[r];
				Ar[r++] = null;
				var d = Ar[r];
				if (((Ar[r++] = null), l !== null && c !== null)) {
					var y = l.pending;
					(y === null ? (c.next = c) : ((c.next = y.next), (y.next = c)), (l.pending = c));
				}
				d !== 0 && bv(a, c, d);
			}
		}
		function Hs(n, r, a, l) {
			((Ar[hu++] = n),
				(Ar[hu++] = r),
				(Ar[hu++] = a),
				(Ar[hu++] = l),
				(hf |= l),
				(n.lanes |= l),
				(n = n.alternate),
				n !== null && (n.lanes |= l));
		}
		function mf(n, r, a, l) {
			return (Hs(n, r, a, l), Zs(n));
		}
		function ka(n, r) {
			return (Hs(n, null, null, r), Zs(n));
		}
		function bv(n, r, a) {
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
		function Zs(n) {
			if (50 < Ql) throw ((Ql = 0), (Ed = null), Error(s(185)));
			for (var r = n.return; r !== null; ) ((n = r), (r = n.return));
			return n.tag === 3 ? n.stateNode : null;
		}
		var mu = {};
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
		function vf(n) {
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
		function _v(n, r) {
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
		function Ps(n, r, a, l, c, d) {
			var y = 0;
			if (((l = n), typeof n == "function")) vf(n) && (y = 1);
			else if (typeof n == "string")
				y = m1(n, a, oe.current) ? 26 : n === "html" || n === "head" || n === "body" ? 27 : 5;
			else
				e: switch (n) {
					case V:
						return ((n = cr(31, a, r, c)), (n.elementType = V), (n.lanes = d), n);
					case N:
						return Ma(a.children, c, d, r);
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
		function Ma(n, r, a, l) {
			return ((n = cr(7, n, l, r)), (n.lanes = a), n);
		}
		function gf(n, r, a) {
			return ((n = cr(6, n, null, r)), (n.lanes = a), n);
		}
		function Sv(n) {
			var r = cr(18, null, null, 0);
			return ((r.stateNode = n), r);
		}
		function yf(n, r, a) {
			return (
				(r = cr(4, n.children !== null ? n.children : [], n.key, r)),
				(r.lanes = a),
				(r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }),
				r
			);
		}
		var wv = new WeakMap();
		function Rr(n, r) {
			if (typeof n == "object" && n !== null) {
				var a = wv.get(n);
				return a !== void 0 ? a : ((r = { value: n, source: r, stack: Ve(r) }), wv.set(n, r), r);
			}
			return { value: n, source: r, stack: Ve(r) };
		}
		var vu = [],
			gu = 0,
			Qs = null,
			xl = 0,
			Cr = [],
			kr = 0,
			Zi = null,
			Xr = 1,
			Jr = "";
		function oi(n, r) {
			((vu[gu++] = xl), (vu[gu++] = Qs), (Qs = n), (xl = r));
		}
		function Ev(n, r, a) {
			((Cr[kr++] = Xr), (Cr[kr++] = Jr), (Cr[kr++] = Zi), (Zi = n));
			var l = Xr;
			n = Jr;
			var c = 32 - ct(l) - 1;
			((l &= ~(1 << c)), (a += 1));
			var d = 32 - ct(r) + c;
			if (30 < d) {
				var y = c - (c % 5);
				((d = (l & ((1 << y) - 1)).toString(32)),
					(l >>= y),
					(c -= y),
					(Xr = (1 << (32 - ct(r) + c)) | (a << c) | l),
					(Jr = d + n));
			} else ((Xr = (1 << d) | (a << c) | l), (Jr = n));
		}
		function pf(n) {
			n.return !== null && (oi(n, 1), Ev(n, 1, 0));
		}
		function bf(n) {
			for (; n === Qs; ) ((Qs = vu[--gu]), (vu[gu] = null), (xl = vu[--gu]), (vu[gu] = null));
			for (; n === Zi; )
				((Zi = Cr[--kr]), (Cr[kr] = null), (Jr = Cr[--kr]), (Cr[kr] = null), (Xr = Cr[--kr]), (Cr[kr] = null));
		}
		function Tv(n, r) {
			((Cr[kr++] = Xr), (Cr[kr++] = Jr), (Cr[kr++] = Zi), (Xr = r.id), (Jr = r.overflow), (Zi = n));
		}
		var En = null,
			Et = null,
			Je = !1,
			Pi = null,
			Mr = !1,
			_f = Error(s(519));
		function Qi(n) {
			throw (
				Al(Rr(Error(s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), n)),
				_f
			);
		}
		function xv(n) {
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
					for (a = 0; a < Yl.length; a++) Ze(Yl[a], r);
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
					(Ze("invalid", r), js(r, l.value, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name, !0));
					break;
				case "select":
					Ze("invalid", r);
					break;
				case "textarea":
					(Ze("invalid", r), dl(r, l.value, l.defaultValue, l.children));
			}
			((a = l.children),
				(typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
				r.textContent === "" + a ||
				l.suppressHydrationWarning === !0 ||
				$y(r.textContent, a)
					? (l.popover != null && (Ze("beforetoggle", r), Ze("toggle", r)),
						l.onScroll != null && Ze("scroll", r),
						l.onScrollEnd != null && Ze("scrollend", r),
						l.onClick != null && (r.onclick = On),
						(r = !0))
					: (r = !1),
				r || Qi(n, !0));
		}
		function Av(n) {
			for (En = n.return; En; )
				switch (En.tag) {
					case 5:
					case 31:
					case 13:
						Mr = !1;
						return;
					case 27:
					case 3:
						Mr = !0;
						return;
					default:
						En = En.return;
				}
		}
		function yu(n) {
			if (n !== En) return !1;
			if (!Je) return (Av(n), (Je = !0), !1);
			var r = n.tag,
				a;
			if (
				((a = r !== 3 && r !== 27) &&
					((a = r === 5) && ((a = n.type), (a = !(a !== "form" && a !== "button") || Ld(n.type, n.memoizedProps))),
					(a = !a)),
				a && Et && Qi(n),
				Av(n),
				r === 13)
			) {
				if (((n = n.memoizedState), (n = n !== null ? n.dehydrated : null), !n)) throw Error(s(317));
				Et = Gy(n);
			} else if (r === 31) {
				if (((n = n.memoizedState), (n = n !== null ? n.dehydrated : null), !n)) throw Error(s(317));
				Et = Gy(n);
			} else
				r === 27
					? ((r = Et), ia(n.type) ? ((n = Vd), (Vd = null), (Et = n)) : (Et = r))
					: (Et = En ? zr(n.stateNode.nextSibling) : null);
			return !0;
		}
		function Na() {
			((Et = En = null), (Je = !1));
		}
		function Sf() {
			var n = Pi;
			return (n !== null && (Wn === null ? (Wn = n) : Wn.push.apply(Wn, n), (Pi = null)), n);
		}
		function Al(n) {
			Pi === null ? (Pi = [n]) : Pi.push(n);
		}
		var wf = M(null),
			Oa = null,
			ci = null;
		function Ki(n, r, a) {
			(le(wf, r._currentValue), (r._currentValue = a));
		}
		function fi(n) {
			((n._currentValue = wf.current), D(wf));
		}
		function Ef(n, r, a) {
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
		function Tf(n, r, a, l) {
			var c = n.child;
			for (c !== null && (c.return = n); c !== null; ) {
				var d = c.dependencies;
				if (d !== null) {
					var y = c.child;
					d = d.firstContext;
					e: for (; d !== null; ) {
						var T = d;
						d = c;
						for (var z = 0; z < r.length; z++)
							if (T.context === r[z]) {
								((d.lanes |= a), (T = d.alternate), T !== null && (T.lanes |= a), Ef(d.return, a, n), l || (y = null));
								break e;
							}
						d = T.next;
					}
				} else if (c.tag === 18) {
					if (((y = c.return), y === null)) throw Error(s(341));
					((y.lanes |= a), (d = y.alternate), d !== null && (d.lanes |= a), Ef(y, a, n), (y = null));
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
		function pu(n, r, a, l) {
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
						var T = c.type;
						or(c.pendingProps.value, y.value) || (n !== null ? n.push(T) : (n = [T]));
					}
				} else if (c === Re.current) {
					if (((y = c.alternate), y === null)) throw Error(s(387));
					y.memoizedState.memoizedState !== c.memoizedState.memoizedState && (n !== null ? n.push(Wl) : (n = [Wl]));
				}
				c = c.return;
			}
			(n !== null && Tf(r, n, a, l), (r.flags |= 262144));
		}
		function Ks(n) {
			for (n = n.firstContext; n !== null; ) {
				if (!or(n.context._currentValue, n.memoizedValue)) return !0;
				n = n.next;
			}
			return !1;
		}
		function za(n) {
			((Oa = n), (ci = null), (n = n.dependencies), n !== null && (n.firstContext = null));
		}
		function Tn(n) {
			return Rv(Oa, n);
		}
		function Ys(n, r) {
			return (Oa === null && za(n), Rv(n, r));
		}
		function Rv(n, r) {
			var a = r._currentValue;
			if (((r = { context: r, memoizedValue: a, next: null }), ci === null)) {
				if (n === null) throw Error(s(308));
				((ci = r), (n.dependencies = { lanes: 0, firstContext: r }), (n.flags |= 524288));
			} else ci = ci.next = r;
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
		function xf() {
			return { controller: new ow(), data: new Map(), refCount: 0 };
		}
		function Rl(n) {
			(n.refCount--,
				n.refCount === 0 &&
					cw(fw, function () {
						n.controller.abort();
					}));
		}
		var Cl = null,
			Af = 0,
			bu = 0,
			_u = null;
		function dw(n, r) {
			if (Cl === null) {
				var a = (Cl = []);
				((Af = 0),
					(bu = kd()),
					(_u = {
						status: "pending",
						value: void 0,
						then: function (l) {
							a.push(l);
						},
					}));
			}
			return (Af++, r.then(Cv, Cv), r);
		}
		function Cv() {
			if (--Af === 0 && Cl !== null) {
				_u !== null && (_u.status = "fulfilled");
				var n = Cl;
				((Cl = null), (bu = 0), (_u = null));
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
		var kv = B.S;
		B.S = function (n, r) {
			((oy = Ne()),
				typeof r == "object" && r !== null && typeof r.then == "function" && dw(n, r),
				kv !== null && kv(n, r));
		};
		var Da = M(null);
		function Rf() {
			var n = Da.current;
			return n !== null ? n : wt.pooledCache;
		}
		function Gs(n, r) {
			r === null ? le(Da, Da.current) : le(Da, r.pool);
		}
		function Mv() {
			var n = Rf();
			return n === null ? null : { parent: un._currentValue, pool: n };
		}
		var Su = Error(s(460)),
			Cf = Error(s(474)),
			Fs = Error(s(542)),
			Xs = { then: function () {} };
		function Nv(n) {
			return ((n = n.status), n === "fulfilled" || n === "rejected");
		}
		function Ov(n, r, a) {
			switch (((a = n[a]), a === void 0 ? n.push(r) : a !== r && (r.then(On, On), (r = a)), r.status)) {
				case "fulfilled":
					return r.value;
				case "rejected":
					throw ((n = r.reason), Dv(n), n);
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
							throw ((n = r.reason), Dv(n), n);
					}
					throw ((Ia = r), Su);
			}
		}
		function ja(n) {
			try {
				var r = n._init;
				return r(n._payload);
			} catch (a) {
				throw a !== null && typeof a == "object" && typeof a.then == "function" ? ((Ia = a), Su) : a;
			}
		}
		var Ia = null;
		function zv() {
			if (Ia === null) throw Error(s(459));
			var n = Ia;
			return ((Ia = null), n);
		}
		function Dv(n) {
			if (n === Su || n === Fs) throw Error(s(483));
		}
		var wu = null,
			kl = 0;
		function Js(n) {
			var r = kl;
			return ((kl += 1), wu === null && (wu = []), Ov(wu, n, r));
		}
		function Ml(n, r) {
			((r = r.props.ref), (n.ref = r !== void 0 ? r : null));
		}
		function Ws(n, r) {
			throw r.$$typeof === p
				? Error(s(525))
				: ((n = Object.prototype.toString.call(r)),
					Error(s(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n)));
		}
		function jv(n) {
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
				return ((Z = si(Z, U)), (Z.index = 0), (Z.sibling = null), Z);
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
			function T(Z, U, G, ie) {
				return U === null || U.tag !== 6
					? ((U = gf(G, Z.mode, ie)), (U.return = Z), U)
					: ((U = c(U, G)), (U.return = Z), U);
			}
			function z(Z, U, G, ie) {
				var Ae = G.type;
				return Ae === N
					? ne(Z, U, G.props.children, ie, G.key)
					: U !== null &&
						  (U.elementType === Ae || (typeof Ae == "object" && Ae !== null && Ae.$$typeof === $ && ja(Ae) === U.type))
						? ((U = c(U, G.props)), Ml(U, G), (U.return = Z), U)
						: ((U = Ps(G.type, G.key, G.props, null, Z.mode, ie)), Ml(U, G), (U.return = Z), U);
			}
			function X(Z, U, G, ie) {
				return U === null ||
					U.tag !== 4 ||
					U.stateNode.containerInfo !== G.containerInfo ||
					U.stateNode.implementation !== G.implementation
					? ((U = yf(G, Z.mode, ie)), (U.return = Z), U)
					: ((U = c(U, G.children || [])), (U.return = Z), U);
			}
			function ne(Z, U, G, ie, Ae) {
				return U === null || U.tag !== 7
					? ((U = Ma(G, Z.mode, ie, Ae)), (U.return = Z), U)
					: ((U = c(U, G)), (U.return = Z), U);
			}
			function ue(Z, U, G) {
				if ((typeof U == "string" && U !== "") || typeof U == "number" || typeof U == "bigint")
					return ((U = gf("" + U, Z.mode, G)), (U.return = Z), U);
				if (typeof U == "object" && U !== null) {
					switch (U.$$typeof) {
						case x:
							return ((G = Ps(U.type, U.key, U.props, null, Z.mode, G)), Ml(G, U), (G.return = Z), G);
						case A:
							return ((U = yf(U, Z.mode, G)), (U.return = Z), U);
						case $:
							return ((U = ja(U)), ue(Z, U, G));
					}
					if (j(U) || se(U)) return ((U = Ma(U, Z.mode, G, null)), (U.return = Z), U);
					if (typeof U.then == "function") return ue(Z, Js(U), G);
					if (U.$$typeof === k) return ue(Z, Ys(Z, U), G);
					Ws(Z, U);
				}
				return null;
			}
			function W(Z, U, G, ie) {
				var Ae = U !== null ? U.key : null;
				if ((typeof G == "string" && G !== "") || typeof G == "number" || typeof G == "bigint")
					return Ae !== null ? null : T(Z, U, "" + G, ie);
				if (typeof G == "object" && G !== null) {
					switch (G.$$typeof) {
						case x:
							return G.key === Ae ? z(Z, U, G, ie) : null;
						case A:
							return G.key === Ae ? X(Z, U, G, ie) : null;
						case $:
							return ((G = ja(G)), W(Z, U, G, ie));
					}
					if (j(G) || se(G)) return Ae !== null ? null : ne(Z, U, G, ie, null);
					if (typeof G.then == "function") return W(Z, U, Js(G), ie);
					if (G.$$typeof === k) return W(Z, U, Ys(Z, G), ie);
					Ws(Z, G);
				}
				return null;
			}
			function ee(Z, U, G, ie, Ae) {
				if ((typeof ie == "string" && ie !== "") || typeof ie == "number" || typeof ie == "bigint")
					return ((Z = Z.get(G) || null), T(U, Z, "" + ie, Ae));
				if (typeof ie == "object" && ie !== null) {
					switch (ie.$$typeof) {
						case x:
							return ((Z = Z.get(ie.key === null ? G : ie.key) || null), z(U, Z, ie, Ae));
						case A:
							return ((Z = Z.get(ie.key === null ? G : ie.key) || null), X(U, Z, ie, Ae));
						case $:
							return ((ie = ja(ie)), ee(Z, U, G, ie, Ae));
					}
					if (j(ie) || se(ie)) return ((Z = Z.get(G) || null), ne(U, Z, ie, Ae, null));
					if (typeof ie.then == "function") return ee(Z, U, G, Js(ie), Ae);
					if (ie.$$typeof === k) return ee(Z, U, G, Ys(U, ie), Ae);
					Ws(U, ie);
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
				if (Ue === G.length) return (a(Z, we), Je && oi(Z, Ue), Ae);
				if (we === null) {
					for (; Ue < G.length; Ue++)
						((we = ue(Z, G[Ue], ie)),
							we !== null && ((U = d(we, U, Ue)), it === null ? (Ae = we) : (it.sibling = we), (it = we)));
					return (Je && oi(Z, Ue), Ae);
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
						we.forEach(function (oa) {
							return r(Z, oa);
						}),
					Je && oi(Z, Ue),
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
					var oa = W(Z, we, at.value, ie);
					if (oa === null) {
						we === null && (we = Ge);
						break;
					}
					(n && we && oa.alternate === null && r(Z, we),
						(U = d(oa, U, Ue)),
						it === null ? (Ae = oa) : (it.sibling = oa),
						(it = oa),
						(we = Ge));
				}
				if (at.done) return (a(Z, we), Je && oi(Z, Ue), Ae);
				if (we === null) {
					for (; !at.done; Ue++, at = G.next())
						((at = ue(Z, at.value, ie)),
							at !== null && ((U = d(at, U, Ue)), it === null ? (Ae = at) : (it.sibling = at), (it = at)));
					return (Je && oi(Z, Ue), Ae);
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
					Je && oi(Z, Ue),
					Ae
				);
			}
			function gt(Z, U, G, ie) {
				if (
					(typeof G == "object" && G !== null && G.type === N && G.key === null && (G = G.props.children),
					typeof G == "object" && G !== null)
				) {
					switch (G.$$typeof) {
						case x:
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
											(typeof Ae == "object" && Ae !== null && Ae.$$typeof === $ && ja(Ae) === U.type)
										) {
											(a(Z, U.sibling), (ie = c(U, G.props)), Ml(ie, G), (ie.return = Z), (Z = ie));
											break e;
										}
										a(Z, U);
										break;
									} else r(Z, U);
									U = U.sibling;
								}
								G.type === N
									? ((ie = Ma(G.props.children, Z.mode, ie, G.key)), (ie.return = Z), (Z = ie))
									: ((ie = Ps(G.type, G.key, G.props, null, Z.mode, ie)), Ml(ie, G), (ie.return = Z), (Z = ie));
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
								((ie = yf(G, Z.mode, ie)), (ie.return = Z), (Z = ie));
							}
							return y(Z);
						case $:
							return ((G = ja(G)), gt(Z, U, G, ie));
					}
					if (j(G)) return _e(Z, U, G, ie);
					if (se(G)) {
						if (((Ae = se(G)), typeof Ae != "function")) throw Error(s(150));
						return ((G = Ae.call(G)), ke(Z, U, G, ie));
					}
					if (typeof G.then == "function") return gt(Z, U, Js(G), ie);
					if (G.$$typeof === k) return gt(Z, U, Ys(Z, G), ie);
					Ws(Z, G);
				}
				return (typeof G == "string" && G !== "") || typeof G == "number" || typeof G == "bigint"
					? ((G = "" + G),
						U !== null && U.tag === 6
							? (a(Z, U.sibling), (ie = c(U, G)), (ie.return = Z), (Z = ie))
							: (a(Z, U), (ie = gf(G, Z.mode, ie)), (ie.return = Z), (Z = ie)),
						y(Z))
					: a(Z, U);
			}
			return function (Z, U, G, ie) {
				try {
					kl = 0;
					var Ae = gt(Z, U, G, ie);
					return ((wu = null), Ae);
				} catch (we) {
					if (we === Su || we === Fs) throw we;
					var it = cr(29, we, null, Z.mode);
					return ((it.lanes = ie), (it.return = Z), it);
				}
			};
		}
		var La = jv(!0),
			Iv = jv(!1),
			Yi = !1;
		function kf(n) {
			n.updateQueue = {
				baseState: n.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: { pending: null, lanes: 0, hiddenCallbacks: null },
				callbacks: null,
			};
		}
		function Mf(n, r) {
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
		function qa(n) {
			return { lane: n, tag: 0, payload: null, callback: null, next: null };
		}
		function Ua(n, r, a) {
			var l = n.updateQueue;
			if (l === null) return null;
			if (((l = l.shared), (st & 2) !== 0)) {
				var c = l.pending;
				return (
					c === null ? (r.next = r) : ((r.next = c.next), (c.next = r)),
					(l.pending = r),
					(r = Zs(n)),
					bv(n, null, a),
					r
				);
			}
			return (Hs(n, l, r, a), Zs(n));
		}
		function Nl(n, r, a) {
			if (((r = r.updateQueue), r !== null && ((r = r.shared), (a & 4194048) !== 0))) {
				var l = r.lanes;
				((l &= n.pendingLanes), (a |= l), (r.lanes = a), Qt(n, a));
			}
		}
		function Nf(n, r) {
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
		var Of = !1;
		function Ol() {
			if (Of) {
				var n = _u;
				if (n !== null) throw n;
			}
		}
		function zl(n, r, a, l) {
			Of = !1;
			var c = n.updateQueue;
			Yi = !1;
			var d = c.firstBaseUpdate,
				y = c.lastBaseUpdate,
				T = c.shared.pending;
			if (T !== null) {
				c.shared.pending = null;
				var z = T,
					X = z.next;
				((z.next = null), y === null ? (d = X) : (y.next = X), (y = z));
				var ne = n.alternate;
				ne !== null &&
					((ne = ne.updateQueue),
					(T = ne.lastBaseUpdate),
					T !== y && (T === null ? (ne.firstBaseUpdate = X) : (T.next = X), (ne.lastBaseUpdate = z)));
			}
			if (d !== null) {
				var ue = c.baseState;
				((y = 0), (ne = X = z = null), (T = d));
				do {
					var W = T.lane & -536870913,
						ee = W !== T.lane;
					if (ee ? (Ye & W) === W : (l & W) === W) {
						(W !== 0 && W === bu && (Of = !0),
							ne !== null && (ne = ne.next = { lane: 0, tag: T.tag, payload: T.payload, callback: null, next: null }));
						e: {
							var _e = n,
								ke = T;
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
									Yi = !0;
							}
						}
						((W = T.callback),
							W !== null &&
								((n.flags |= 64),
								ee && (n.flags |= 8192),
								(ee = c.callbacks),
								ee === null ? (c.callbacks = [W]) : ee.push(W)));
					} else
						((ee = { lane: W, tag: T.tag, payload: T.payload, callback: T.callback, next: null }),
							ne === null ? ((X = ne = ee), (z = ue)) : (ne = ne.next = ee),
							(y |= W));
					if (((T = T.next), T === null)) {
						if (((T = c.shared.pending), T === null)) break;
						((ee = T), (T = ee.next), (ee.next = null), (c.lastBaseUpdate = ee), (c.shared.pending = null));
					}
				} while (!0);
				(ne === null && (z = ue),
					(c.baseState = z),
					(c.firstBaseUpdate = X),
					(c.lastBaseUpdate = ne),
					d === null && (c.shared.lanes = 0),
					(Wi |= y),
					(n.lanes = y),
					(n.memoizedState = ue));
			}
		}
		function Lv(n, r) {
			if (typeof n != "function") throw Error(s(191, n));
			n.call(r);
		}
		function qv(n, r) {
			var a = n.callbacks;
			if (a !== null) for (n.callbacks = null, n = 0; n < a.length; n++) Lv(a[n], r);
		}
		var Eu = M(null),
			eo = M(0);
		function Uv(n, r) {
			((n = _i), le(eo, n), le(Eu, r), (_i = n | r.baseLanes));
		}
		function zf() {
			(le(eo, _i), le(Eu, Eu.current));
		}
		function Df() {
			((_i = eo.current), D(Eu), D(eo));
		}
		var fr = M(null),
			Nr = null;
		function Gi(n) {
			var r = n.alternate;
			(le(Gt, Gt.current & 1),
				le(fr, n),
				Nr === null && (r === null || Eu.current !== null || r.memoizedState !== null) && (Nr = n));
		}
		function jf(n) {
			(le(Gt, Gt.current), le(fr, n), Nr === null && (Nr = n));
		}
		function $v(n) {
			n.tag === 22 ? (le(Gt, Gt.current), le(fr, n), Nr === null && (Nr = n)) : Fi(n);
		}
		function Fi() {
			(le(Gt, Gt.current), le(fr, fr.current));
		}
		function dr(n) {
			(D(fr), Nr === n && (Nr = null), D(Gt));
		}
		var Gt = M(0);
		function to(n) {
			for (var r = n; r !== null; ) {
				if (r.tag === 13) {
					var a = r.memoizedState;
					if (a !== null && ((a = a.dehydrated), a === null || $d(a) || Bd(a))) return r;
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
			qe = null,
			mt = null,
			ln = null,
			no = !1,
			Tu = !1,
			$a = !1,
			ro = 0,
			Dl = 0,
			xu = null,
			mw = 0;
		function Ut() {
			throw Error(s(321));
		}
		function If(n, r) {
			if (r === null) return !1;
			for (var a = 0; a < r.length && a < n.length; a++) if (!or(n[a], r[a])) return !1;
			return !0;
		}
		function Lf(n, r, a, l, c, d) {
			return (
				(di = d),
				(qe = r),
				(r.memoizedState = null),
				(r.updateQueue = null),
				(r.lanes = 0),
				(B.H = n === null || n.memoizedState === null ? Eg : Jf),
				($a = !1),
				(d = a(l, c)),
				($a = !1),
				Tu && (d = Vv(r, a, l, c)),
				Bv(n),
				d
			);
		}
		function Bv(n) {
			B.H = Ll;
			var r = mt !== null && mt.next !== null;
			if (((di = 0), (ln = mt = qe = null), (no = !1), (Dl = 0), (xu = null), r)) throw Error(s(300));
			n === null || sn || ((n = n.dependencies), n !== null && Ks(n) && (sn = !0));
		}
		function Vv(n, r, a, l) {
			qe = n;
			var c = 0;
			do {
				if ((Tu && (xu = null), (Dl = 0), (Tu = !1), 25 <= c)) throw Error(s(301));
				if (((c += 1), (ln = mt = null), n.updateQueue != null)) {
					var d = n.updateQueue;
					((d.lastEffect = null), (d.events = null), (d.stores = null), d.memoCache != null && (d.memoCache.index = 0));
				}
				((B.H = Tg), (d = r(a, l)));
			} while (Tu);
			return d;
		}
		function vw() {
			var n = B.H,
				r = n.useState()[0];
			return (
				(r = typeof r.then == "function" ? jl(r) : r),
				(n = n.useState()[0]),
				(mt !== null ? mt.memoizedState : null) !== n && (qe.flags |= 1024),
				r
			);
		}
		function qf() {
			var n = ro !== 0;
			return ((ro = 0), n);
		}
		function Uf(n, r, a) {
			((r.updateQueue = n.updateQueue), (r.flags &= -2053), (n.lanes &= ~a));
		}
		function $f(n) {
			if (no) {
				for (n = n.memoizedState; n !== null; ) {
					var r = n.queue;
					(r !== null && (r.pending = null), (n = n.next));
				}
				no = !1;
			}
			((di = 0), (ln = mt = qe = null), (Tu = !1), (Dl = ro = 0), (xu = null));
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
		function io() {
			return { lastEffect: null, events: null, stores: null, memoCache: null };
		}
		function jl(n) {
			var r = Dl;
			return (
				(Dl += 1),
				xu === null && (xu = []),
				(n = Ov(xu, n, r)),
				(r = qe),
				(ln === null ? r.memoizedState : ln.next) === null &&
					((r = r.alternate), (B.H = r === null || r.memoizedState === null ? Eg : Jf)),
				n
			);
		}
		function ao(n) {
			if (n !== null && typeof n == "object") {
				if (typeof n.then == "function") return jl(n);
				if (n.$$typeof === k) return Tn(n);
			}
			throw Error(s(438, String(n)));
		}
		function Bf(n) {
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
				a === null && ((a = io()), (qe.updateQueue = a)),
				(a.memoCache = r),
				(a = r.data[r.index]),
				a === void 0)
			)
				for (a = r.data[r.index] = Array(n), l = 0; l < n; l++) a[l] = Y;
			return (r.index++, a);
		}
		function hi(n, r) {
			return typeof r == "function" ? r(n) : r;
		}
		function uo(n) {
			return Vf(Ft(), mt, n);
		}
		function Vf(n, r, a) {
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
				var T = (y = null),
					z = null,
					X = r,
					ne = !1;
				do {
					var ue = X.lane & -536870913;
					if (ue !== X.lane ? (Ye & ue) === ue : (di & ue) === ue) {
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
								ue === bu && (ne = !0));
						else if ((di & W) === W) {
							((X = X.next), W === bu && (ne = !0));
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
								z === null ? ((T = z = ue), (y = d)) : (z = z.next = ue),
								(qe.lanes |= W),
								(Wi |= W));
						((ue = X.action), $a && a(d, ue), (d = X.hasEagerState ? X.eagerState : a(d, ue)));
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
							z === null ? ((T = z = W), (y = d)) : (z = z.next = W),
							(qe.lanes |= ue),
							(Wi |= ue));
					X = X.next;
				} while (X !== null && X !== r);
				if ((z === null ? (y = d) : (z.next = T), !or(d, n.memoizedState) && ((sn = !0), ne && ((a = _u), a !== null))))
					throw a;
				((n.memoizedState = d), (n.baseState = y), (n.baseQueue = z), (l.lastRenderedState = d));
			}
			return (c === null && (l.lanes = 0), [n.memoizedState, l.dispatch]);
		}
		function Hf(n) {
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
		function Hv(n, r, a) {
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
				Qf(Qv.bind(null, l, c, n), [n]),
				c.getSnapshot !== r || y || (ln !== null && ln.memoizedState.tag & 1))
			) {
				if (((l.flags |= 2048), Au(9, { destroy: void 0 }, Pv.bind(null, l, c, a, r), null), wt === null))
					throw Error(s(349));
				d || (di & 127) !== 0 || Zv(l, r, a);
			}
			return a;
		}
		function Zv(n, r, a) {
			((n.flags |= 16384),
				(n = { getSnapshot: r, value: a }),
				(r = qe.updateQueue),
				r === null
					? ((r = io()), (qe.updateQueue = r), (r.stores = [n]))
					: ((a = r.stores), a === null ? (r.stores = [n]) : a.push(n)));
		}
		function Pv(n, r, a, l) {
			((r.value = a), (r.getSnapshot = l), Kv(r) && Yv(n));
		}
		function Qv(n, r, a) {
			return a(function () {
				Kv(r) && Yv(n);
			});
		}
		function Kv(n) {
			var r = n.getSnapshot;
			n = n.value;
			try {
				var a = r();
				return !or(n, a);
			} catch {
				return !0;
			}
		}
		function Yv(n) {
			var r = ka(n, 2);
			r !== null && er(r, n, 2);
		}
		function Zf(n) {
			var r = Vn();
			if (typeof n == "function") {
				var a = n;
				if (((n = a()), $a)) {
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
		function Gv(n, r, a, l) {
			return ((n.baseState = a), Vf(n, mt, typeof l == "function" ? l : hi));
		}
		function gw(n, r, a, l, c) {
			if (oo(n)) throw Error(s(485));
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
					a === null ? ((d.next = r.pending = d), Fv(r, d)) : ((d.next = a.next), (r.pending = a.next = d)));
			}
		}
		function Fv(n, r) {
			var a = r.action,
				l = r.payload,
				c = n.state;
			if (r.isTransition) {
				var d = B.T,
					y = {};
				B.T = y;
				try {
					var T = a(c, l),
						z = B.S;
					(z !== null && z(y, T), Xv(n, r, T));
				} catch (X) {
					Pf(n, r, X);
				} finally {
					(d !== null && y.types !== null && (d.types = y.types), (B.T = d));
				}
			} else
				try {
					((d = a(c, l)), Xv(n, r, d));
				} catch (X) {
					Pf(n, r, X);
				}
		}
		function Xv(n, r, a) {
			a !== null && typeof a == "object" && typeof a.then == "function"
				? a.then(
						function (l) {
							Jv(n, r, l);
						},
						function (l) {
							return Pf(n, r, l);
						},
					)
				: Jv(n, r, a);
		}
		function Jv(n, r, a) {
			((r.status = "fulfilled"),
				(r.value = a),
				Wv(r),
				(n.state = a),
				(r = n.pending),
				r !== null && ((a = r.next), a === r ? (n.pending = null) : ((a = a.next), (r.next = a), Fv(n, a))));
		}
		function Pf(n, r, a) {
			var l = n.pending;
			if (((n.pending = null), l !== null)) {
				l = l.next;
				do ((r.status = "rejected"), (r.reason = a), Wv(r), (r = r.next));
				while (r !== l);
			}
			n.action = null;
		}
		function Wv(n) {
			n = n.listeners;
			for (var r = 0; r < n.length; r++) (0, n[r])();
		}
		function eg(n, r) {
			return r;
		}
		function tg(n, r) {
			if (Je) {
				var a = wt.formState;
				if (a !== null) {
					e: {
						var l = qe;
						if (Je) {
							if (Et) {
								t: {
									for (var c = Et, d = Mr; c.nodeType !== 8; ) {
										if (!d) {
											c = null;
											break t;
										}
										if (((c = zr(c.nextSibling)), c === null)) {
											c = null;
											break t;
										}
									}
									((d = c.data), (c = d === "F!" || d === "F" ? c : null));
								}
								if (c) {
									((Et = zr(c.nextSibling)), (l = c.data === "F!"));
									break e;
								}
							}
							Qi(l);
						}
						l = !1;
					}
					l && (r = a[0]);
				}
			}
			return (
				(a = Vn()),
				(a.memoizedState = a.baseState = r),
				(l = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: eg, lastRenderedState: r }),
				(a.queue = l),
				(a = _g.bind(null, qe, l)),
				(l.dispatch = a),
				(l = Zf(!1)),
				(d = Xf.bind(null, qe, !1, l.queue)),
				(l = Vn()),
				(c = { state: r, dispatch: null, action: n, pending: null }),
				(l.queue = c),
				(a = gw.bind(null, qe, c, d, a)),
				(c.dispatch = a),
				(l.memoizedState = n),
				[r, a, !1]
			);
		}
		function ng(n) {
			return rg(Ft(), mt, n);
		}
		function rg(n, r, a) {
			if (((r = Vf(n, r, eg)[0]), (n = uo(hi)[0]), typeof r == "object" && r !== null && typeof r.then == "function"))
				try {
					var l = jl(r);
				} catch (y) {
					throw y === Su ? Fs : y;
				}
			else l = r;
			r = Ft();
			var c = r.queue,
				d = c.dispatch;
			return (
				a !== r.memoizedState && ((qe.flags |= 2048), Au(9, { destroy: void 0 }, yw.bind(null, c, a), null)),
				[l, d, n]
			);
		}
		function yw(n, r) {
			n.action = r;
		}
		function ig(n) {
			var r = Ft(),
				a = mt;
			if (a !== null) return rg(r, a, n);
			(Ft(), (r = r.memoizedState), (a = Ft()));
			var l = a.queue.dispatch;
			return ((a.memoizedState = n), [r, l, !1]);
		}
		function Au(n, r, a, l) {
			return (
				(n = { tag: n, create: a, deps: l, inst: r, next: null }),
				(r = qe.updateQueue),
				r === null && ((r = io()), (qe.updateQueue = r)),
				(a = r.lastEffect),
				a === null ? (r.lastEffect = n.next = n) : ((l = a.next), (a.next = n), (n.next = l), (r.lastEffect = n)),
				n
			);
		}
		function ag() {
			return Ft().memoizedState;
		}
		function lo(n, r, a, l) {
			var c = Vn();
			((qe.flags |= n), (c.memoizedState = Au(1 | r, { destroy: void 0 }, a, l === void 0 ? null : l)));
		}
		function so(n, r, a, l) {
			var c = Ft();
			l = l === void 0 ? null : l;
			var d = c.memoizedState.inst;
			mt !== null && l !== null && If(l, mt.memoizedState.deps)
				? (c.memoizedState = Au(r, d, a, l))
				: ((qe.flags |= n), (c.memoizedState = Au(1 | r, d, a, l)));
		}
		function ug(n, r) {
			lo(8390656, 8, n, r);
		}
		function Qf(n, r) {
			so(2048, 8, n, r);
		}
		function pw(n) {
			qe.flags |= 4;
			var r = qe.updateQueue;
			if (r === null) ((r = io()), (qe.updateQueue = r), (r.events = [n]));
			else {
				var a = r.events;
				a === null ? (r.events = [n]) : a.push(n);
			}
		}
		function lg(n) {
			var r = Ft().memoizedState;
			return (
				pw({ ref: r, nextImpl: n }),
				function () {
					if ((st & 2) !== 0) throw Error(s(440));
					return r.impl.apply(void 0, arguments);
				}
			);
		}
		function sg(n, r) {
			return so(4, 2, n, r);
		}
		function og(n, r) {
			return so(4, 4, n, r);
		}
		function cg(n, r) {
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
		function fg(n, r, a) {
			((a = a != null ? a.concat([n]) : null), so(4, 4, cg.bind(null, r, n), a));
		}
		function Kf() {}
		function dg(n, r) {
			var a = Ft();
			r = r === void 0 ? null : r;
			var l = a.memoizedState;
			return r !== null && If(r, l[1]) ? l[0] : ((a.memoizedState = [n, r]), n);
		}
		function hg(n, r) {
			var a = Ft();
			r = r === void 0 ? null : r;
			var l = a.memoizedState;
			if (r !== null && If(r, l[1])) return l[0];
			if (((l = n()), $a)) {
				tn(!0);
				try {
					n();
				} finally {
					tn(!1);
				}
			}
			return ((a.memoizedState = [l, r]), l);
		}
		function Yf(n, r, a) {
			return a === void 0 || ((di & 1073741824) !== 0 && (Ye & 261930) === 0)
				? (n.memoizedState = r)
				: ((n.memoizedState = a), (n = fy()), (qe.lanes |= n), (Wi |= n), a);
		}
		function mg(n, r, a, l) {
			return or(a, r)
				? a
				: Eu.current !== null
					? ((n = Yf(n, a, l)), or(n, r) || (sn = !0), n)
					: (di & 42) === 0 || ((di & 1073741824) !== 0 && (Ye & 261930) === 0)
						? ((sn = !0), (n.memoizedState = a))
						: ((n = fy()), (qe.lanes |= n), (Wi |= n), r);
		}
		function vg(n, r, a, l, c) {
			var d = P.p;
			P.p = d !== 0 && 8 > d ? d : 8;
			var y = B.T,
				T = {};
			((B.T = T), Xf(n, !1, r, a));
			try {
				var z = c(),
					X = B.S;
				(X !== null && X(T, z),
					z !== null && typeof z == "object" && typeof z.then == "function"
						? Il(n, r, hw(z, l), Or(n))
						: Il(n, r, l, Or(n)));
			} catch (ne) {
				Il(n, r, { then: function () {}, status: "rejected", reason: ne }, Or());
			} finally {
				((P.p = d), y !== null && T.types !== null && (y.types = T.types), (B.T = y));
			}
		}
		function bw() {}
		function Gf(n, r, a, l) {
			if (n.tag !== 5) throw Error(s(476));
			var c = gg(n).queue;
			vg(
				n,
				c,
				r,
				ve,
				a === null
					? bw
					: function () {
							return (yg(n), a(l));
						},
			);
		}
		function gg(n) {
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
		function yg(n) {
			var r = gg(n);
			(r.next === null && (r = n.alternate.memoizedState), Il(n, r.next.queue, {}, Or()));
		}
		function Ff() {
			return Tn(Wl);
		}
		function pg() {
			return Ft().memoizedState;
		}
		function bg() {
			return Ft().memoizedState;
		}
		function _w(n) {
			for (var r = n.return; r !== null; ) {
				switch (r.tag) {
					case 24:
					case 3:
						var a = Or();
						n = qa(a);
						var l = Ua(r, n, a);
						(l !== null && (er(l, r, a), Nl(l, r, a)), (r = { cache: xf() }), (n.payload = r));
						return;
				}
				r = r.return;
			}
		}
		function Sw(n, r, a) {
			var l = Or();
			((a = { lane: l, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null }),
				oo(n) ? Sg(r, a) : ((a = mf(n, r, a, l)), a !== null && (er(a, n, l), wg(a, r, l))));
		}
		function _g(n, r, a) {
			Il(n, r, a, Or());
		}
		function Il(n, r, a, l) {
			var c = { lane: l, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null };
			if (oo(n)) Sg(r, c);
			else {
				var d = n.alternate;
				if (n.lanes === 0 && (d === null || d.lanes === 0) && ((d = r.lastRenderedReducer), d !== null))
					try {
						var y = r.lastRenderedState,
							T = d(y, a);
						if (((c.hasEagerState = !0), (c.eagerState = T), or(T, y)))
							return (Hs(n, r, c, 0), wt === null && Vs(), !1);
					} catch {}
				if (((a = mf(n, r, c, l)), a !== null)) return (er(a, n, l), wg(a, r, l), !0);
			}
			return !1;
		}
		function Xf(n, r, a, l) {
			if (
				((l = { lane: 2, revertLane: kd(), gesture: null, action: l, hasEagerState: !1, eagerState: null, next: null }),
				oo(n))
			) {
				if (r) throw Error(s(479));
			} else ((r = mf(n, a, l, 2)), r !== null && er(r, n, 2));
		}
		function oo(n) {
			var r = n.alternate;
			return n === qe || (r !== null && r === qe);
		}
		function Sg(n, r) {
			Tu = no = !0;
			var a = n.pending;
			(a === null ? (r.next = r) : ((r.next = a.next), (a.next = r)), (n.pending = r));
		}
		function wg(n, r, a) {
			if ((a & 4194048) !== 0) {
				var l = r.lanes;
				((l &= n.pendingLanes), (a |= l), (r.lanes = a), Qt(n, a));
			}
		}
		var Ll = {
			readContext: Tn,
			use: ao,
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
		Ll.useEffectEvent = Ut;
		var Eg = {
				readContext: Tn,
				use: ao,
				useCallback: function (n, r) {
					return ((Vn().memoizedState = [n, r === void 0 ? null : r]), n);
				},
				useContext: Tn,
				useEffect: ug,
				useImperativeHandle: function (n, r, a) {
					((a = a != null ? a.concat([n]) : null), lo(4194308, 4, cg.bind(null, r, n), a));
				},
				useLayoutEffect: function (n, r) {
					return lo(4194308, 4, n, r);
				},
				useInsertionEffect: function (n, r) {
					lo(4, 2, n, r);
				},
				useMemo: function (n, r) {
					var a = Vn();
					r = r === void 0 ? null : r;
					var l = n();
					if ($a) {
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
						if ($a) {
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
					n = Zf(n);
					var r = n.queue,
						a = _g.bind(null, qe, r);
					return ((r.dispatch = a), [n.memoizedState, a]);
				},
				useDebugValue: Kf,
				useDeferredValue: function (n, r) {
					return Yf(Vn(), n, r);
				},
				useTransition: function () {
					var n = Zf(!1);
					return ((n = vg.bind(null, qe, n.queue, !0, !1)), (Vn().memoizedState = n), [!1, n]);
				},
				useSyncExternalStore: function (n, r, a) {
					var l = qe,
						c = Vn();
					if (Je) {
						if (a === void 0) throw Error(s(407));
						a = a();
					} else {
						if (((a = r()), wt === null)) throw Error(s(349));
						(Ye & 127) !== 0 || Zv(l, r, a);
					}
					c.memoizedState = a;
					var d = { value: a, getSnapshot: r };
					return (
						(c.queue = d),
						ug(Qv.bind(null, l, d, n), [n]),
						(l.flags |= 2048),
						Au(9, { destroy: void 0 }, Pv.bind(null, l, d, a, r), null),
						a
					);
				},
				useId: function () {
					var n = Vn(),
						r = wt.identifierPrefix;
					if (Je) {
						var a = Jr,
							l = Xr;
						((a = (l & ~(1 << (32 - ct(l) - 1))).toString(32) + a),
							(r = "_" + r + "R_" + a),
							(a = ro++),
							0 < a && (r += "H" + a.toString(32)),
							(r += "_"));
					} else ((a = mw++), (r = "_" + r + "r_" + a.toString(32) + "_"));
					return (n.memoizedState = r);
				},
				useHostTransitionStatus: Ff,
				useFormState: tg,
				useActionState: tg,
				useOptimistic: function (n) {
					var r = Vn();
					r.memoizedState = r.baseState = n;
					var a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
					return ((r.queue = a), (r = Xf.bind(null, qe, !0, a)), (a.dispatch = r), [n, r]);
				},
				useMemoCache: Bf,
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
			Jf = {
				readContext: Tn,
				use: ao,
				useCallback: dg,
				useContext: Tn,
				useEffect: Qf,
				useImperativeHandle: fg,
				useInsertionEffect: sg,
				useLayoutEffect: og,
				useMemo: hg,
				useReducer: uo,
				useRef: ag,
				useState: function () {
					return uo(hi);
				},
				useDebugValue: Kf,
				useDeferredValue: function (n, r) {
					return mg(Ft(), mt.memoizedState, n, r);
				},
				useTransition: function () {
					var n = uo(hi)[0],
						r = Ft().memoizedState;
					return [typeof n == "boolean" ? n : jl(n), r];
				},
				useSyncExternalStore: Hv,
				useId: pg,
				useHostTransitionStatus: Ff,
				useFormState: ng,
				useActionState: ng,
				useOptimistic: function (n, r) {
					return Gv(Ft(), mt, n, r);
				},
				useMemoCache: Bf,
				useCacheRefresh: bg,
			};
		Jf.useEffectEvent = lg;
		var Tg = {
			readContext: Tn,
			use: ao,
			useCallback: dg,
			useContext: Tn,
			useEffect: Qf,
			useImperativeHandle: fg,
			useInsertionEffect: sg,
			useLayoutEffect: og,
			useMemo: hg,
			useReducer: Hf,
			useRef: ag,
			useState: function () {
				return Hf(hi);
			},
			useDebugValue: Kf,
			useDeferredValue: function (n, r) {
				var a = Ft();
				return mt === null ? Yf(a, n, r) : mg(a, mt.memoizedState, n, r);
			},
			useTransition: function () {
				var n = Hf(hi)[0],
					r = Ft().memoizedState;
				return [typeof n == "boolean" ? n : jl(n), r];
			},
			useSyncExternalStore: Hv,
			useId: pg,
			useHostTransitionStatus: Ff,
			useFormState: ig,
			useActionState: ig,
			useOptimistic: function (n, r) {
				var a = Ft();
				return mt !== null ? Gv(a, mt, n, r) : ((a.baseState = n), [n, a.queue.dispatch]);
			},
			useMemoCache: Bf,
			useCacheRefresh: bg,
		};
		Tg.useEffectEvent = lg;
		function Wf(n, r, a, l) {
			((r = n.memoizedState),
				(a = a(l, r)),
				(a = a == null ? r : b({}, r, a)),
				(n.memoizedState = a),
				n.lanes === 0 && (n.updateQueue.baseState = a));
		}
		var ed = {
			enqueueSetState: function (n, r, a) {
				n = n._reactInternals;
				var l = Or(),
					c = qa(l);
				((c.payload = r), a != null && (c.callback = a), (r = Ua(n, c, l)), r !== null && (er(r, n, l), Nl(r, n, l)));
			},
			enqueueReplaceState: function (n, r, a) {
				n = n._reactInternals;
				var l = Or(),
					c = qa(l);
				((c.tag = 1),
					(c.payload = r),
					a != null && (c.callback = a),
					(r = Ua(n, c, l)),
					r !== null && (er(r, n, l), Nl(r, n, l)));
			},
			enqueueForceUpdate: function (n, r) {
				n = n._reactInternals;
				var a = Or(),
					l = qa(a);
				((l.tag = 2), r != null && (l.callback = r), (r = Ua(n, l, a)), r !== null && (er(r, n, a), Nl(r, n, a)));
			},
		};
		function xg(n, r, a, l, c, d, y) {
			return (
				(n = n.stateNode),
				typeof n.shouldComponentUpdate == "function"
					? n.shouldComponentUpdate(l, d, y)
					: r.prototype && r.prototype.isPureReactComponent
						? !El(a, l) || !El(c, d)
						: !0
			);
		}
		function Ag(n, r, a, l) {
			((n = r.state),
				typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(a, l),
				typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(a, l),
				r.state !== n && ed.enqueueReplaceState(r, r.state, null));
		}
		function Ba(n, r) {
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
			Bs(n);
		}
		function Ew(n) {
			console.error(n);
		}
		function Tw(n) {
			Bs(n);
		}
		function co(n, r) {
			try {
				var a = n.onUncaughtError;
				a(r.value, { componentStack: r.stack });
			} catch (l) {
				setTimeout(function () {
					throw l;
				});
			}
		}
		function Rg(n, r, a) {
			try {
				var l = n.onCaughtError;
				l(a.value, { componentStack: a.stack, errorBoundary: r.tag === 1 ? r.stateNode : null });
			} catch (c) {
				setTimeout(function () {
					throw c;
				});
			}
		}
		function td(n, r, a) {
			return (
				(a = qa(a)),
				(a.tag = 3),
				(a.payload = { element: null }),
				(a.callback = function () {
					co(n, r);
				}),
				a
			);
		}
		function Cg(n) {
			return ((n = qa(n)), (n.tag = 3), n);
		}
		function kg(n, r, a, l) {
			var c = a.type.getDerivedStateFromError;
			if (typeof c == "function") {
				var d = l.value;
				((n.payload = function () {
					return c(d);
				}),
					(n.callback = function () {
						Rg(r, a, l);
					}));
			}
			var y = a.stateNode;
			y !== null &&
				typeof y.componentDidCatch == "function" &&
				(n.callback = function () {
					(Rg(r, a, l), typeof c != "function" && (ea === null ? (ea = new Set([this])) : ea.add(this)));
					var T = l.stack;
					this.componentDidCatch(l.value, { componentStack: T !== null ? T : "" });
				});
		}
		function xw(n, r, a, l, c) {
			if (((a.flags |= 32768), l !== null && typeof l == "object" && typeof l.then == "function")) {
				if (((r = a.alternate), r !== null && pu(r, a, c, !0), (a = fr.current), a !== null)) {
					switch (a.tag) {
						case 31:
						case 13:
							return (
								Nr === null ? Eo() : a.alternate === null && $t === 0 && ($t = 3),
								(a.flags &= -257),
								(a.flags |= 65536),
								(a.lanes = c),
								l === Xs
									? (a.flags |= 16384)
									: ((r = a.updateQueue), r === null ? (a.updateQueue = new Set([l])) : r.add(l), Ad(n, l, c)),
								!1
							);
						case 22:
							return (
								(a.flags |= 65536),
								l === Xs
									? (a.flags |= 16384)
									: ((r = a.updateQueue),
										r === null
											? ((r = { transitions: null, markerInstances: null, retryQueue: new Set([l]) }),
												(a.updateQueue = r))
											: ((a = r.retryQueue), a === null ? (r.retryQueue = new Set([l])) : a.add(l)),
										Ad(n, l, c)),
								!1
							);
					}
					throw Error(s(435, a.tag));
				}
				return (Ad(n, l, c), Eo(), !1);
			}
			if (Je)
				return (
					(r = fr.current),
					r !== null
						? ((r.flags & 65536) === 0 && (r.flags |= 256),
							(r.flags |= 65536),
							(r.lanes = c),
							l !== _f && ((n = Error(s(422), { cause: l })), Al(Rr(n, a))))
						: (l !== _f && ((r = Error(s(423), { cause: l })), Al(Rr(r, a))),
							(n = n.current.alternate),
							(n.flags |= 65536),
							(c &= -c),
							(n.lanes |= c),
							(l = Rr(l, a)),
							(c = td(n.stateNode, l, c)),
							Nf(n, c),
							$t !== 4 && ($t = 2)),
					!1
				);
			var d = Error(s(520), { cause: l });
			if (((d = Rr(d, a)), Pl === null ? (Pl = [d]) : Pl.push(d), $t !== 4 && ($t = 2), r === null)) return !0;
			((l = Rr(l, a)), (a = r));
			do {
				switch (a.tag) {
					case 3:
						return ((a.flags |= 65536), (n = c & -c), (a.lanes |= n), (n = td(a.stateNode, l, n)), Nf(a, n), !1);
					case 1:
						if (
							((r = a.type),
							(d = a.stateNode),
							(a.flags & 128) === 0 &&
								(typeof r.getDerivedStateFromError == "function" ||
									(d !== null && typeof d.componentDidCatch == "function" && (ea === null || !ea.has(d)))))
						)
							return ((a.flags |= 65536), (c &= -c), (a.lanes |= c), (c = Cg(c)), kg(c, n, a, l), Nf(a, c), !1);
				}
				a = a.return;
			} while (a !== null);
			return !1;
		}
		var nd = Error(s(461)),
			sn = !1;
		function xn(n, r, a, l) {
			r.child = n === null ? Iv(r, null, a, l) : La(r, n.child, a, l);
		}
		function Mg(n, r, a, l, c) {
			a = a.render;
			var d = r.ref;
			if ("ref" in l) {
				var y = {};
				for (var T in l) T !== "ref" && (y[T] = l[T]);
			} else y = l;
			return (
				za(r),
				(l = Lf(n, r, a, y, d, c)),
				(T = qf()),
				n !== null && !sn ? (Uf(n, r, c), mi(n, r, c)) : (Je && T && pf(r), (r.flags |= 1), xn(n, r, l, c), r.child)
			);
		}
		function Ng(n, r, a, l, c) {
			if (n === null) {
				var d = a.type;
				return typeof d == "function" && !vf(d) && d.defaultProps === void 0 && a.compare === null
					? ((r.tag = 15), (r.type = d), Og(n, r, d, l, c))
					: ((n = Ps(a.type, null, l, r, r.mode, c)), (n.ref = r.ref), (n.return = r), (r.child = n));
			}
			if (((d = n.child), !cd(n, c))) {
				var y = d.memoizedProps;
				if (((a = a.compare), (a = a !== null ? a : El), a(y, l) && n.ref === r.ref)) return mi(n, r, c);
			}
			return ((r.flags |= 1), (n = si(d, l)), (n.ref = r.ref), (n.return = r), (r.child = n));
		}
		function Og(n, r, a, l, c) {
			if (n !== null) {
				var d = n.memoizedProps;
				if (El(d, l) && n.ref === r.ref)
					if (((sn = !1), (r.pendingProps = l = d), cd(n, c))) (n.flags & 131072) !== 0 && (sn = !0);
					else return ((r.lanes = n.lanes), mi(n, r, c));
			}
			return rd(n, r, a, l, c);
		}
		function zg(n, r, a, l) {
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
					return Dg(n, r, d, a, l);
				}
				if ((a & 536870912) !== 0)
					((r.memoizedState = { baseLanes: 0, cachePool: null }),
						n !== null && Gs(r, d !== null ? d.cachePool : null),
						d !== null ? Uv(r, d) : zf(),
						$v(r));
				else return ((l = r.lanes = 536870912), Dg(n, r, d !== null ? d.baseLanes | a : a, a, l));
			} else
				d !== null
					? (Gs(r, d.cachePool), Uv(r, d), Fi(r), (r.memoizedState = null))
					: (n !== null && Gs(r, null), zf(), Fi(r));
			return (xn(n, r, c, a), r.child);
		}
		function ql(n, r) {
			return (
				(n !== null && n.tag === 22) ||
					r.stateNode !== null ||
					(r.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				r.sibling
			);
		}
		function Dg(n, r, a, l, c) {
			var d = Rf();
			return (
				(d = d === null ? null : { parent: un._currentValue, pool: d }),
				(r.memoizedState = { baseLanes: a, cachePool: d }),
				n !== null && Gs(r, null),
				zf(),
				$v(r),
				n !== null && pu(n, r, l, !0),
				(r.childLanes = c),
				null
			);
		}
		function fo(n, r) {
			return (
				(r = mo({ mode: r.mode, children: r.children }, n.mode)),
				(r.ref = n.ref),
				(n.child = r),
				(r.return = n),
				r
			);
		}
		function jg(n, r, a) {
			return (La(r, n.child, null, a), (n = fo(r, r.pendingProps)), (n.flags |= 2), dr(r), (r.memoizedState = null), n);
		}
		function Aw(n, r, a) {
			var l = r.pendingProps,
				c = (r.flags & 128) !== 0;
			if (((r.flags &= -129), n === null)) {
				if (Je) {
					if (l.mode === "hidden") return ((n = fo(r, l)), (r.lanes = 536870912), ql(null, n));
					if (
						(jf(r),
						(n = Et)
							? ((n = Yy(n, Mr)),
								(n = n !== null && n.data === "&" ? n : null),
								n !== null &&
									((r.memoizedState = {
										dehydrated: n,
										treeContext: Zi !== null ? { id: Xr, overflow: Jr } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = Sv(n)),
									(a.return = r),
									(r.child = a),
									(En = r),
									(Et = null)))
							: (n = null),
						n === null)
					)
						throw Qi(r);
					return ((r.lanes = 536870912), null);
				}
				return fo(r, l);
			}
			var d = n.memoizedState;
			if (d !== null) {
				var y = d.dehydrated;
				if ((jf(r), c))
					if (r.flags & 256) ((r.flags &= -257), (r = jg(n, r, a)));
					else if (r.memoizedState !== null) ((r.child = n.child), (r.flags |= 128), (r = null));
					else throw Error(s(558));
				else if ((sn || pu(n, r, a, !1), (c = (a & n.childLanes) !== 0), sn || c)) {
					if (((l = wt), l !== null && ((y = wa(l, a)), y !== 0 && y !== d.retryLane)))
						throw ((d.retryLane = y), ka(n, y), er(l, n, y), nd);
					(Eo(), (r = jg(n, r, a)));
				} else
					((n = d.treeContext),
						(Et = zr(y.nextSibling)),
						(En = r),
						(Je = !0),
						(Pi = null),
						(Mr = !1),
						n !== null && Tv(r, n),
						(r = fo(r, l)),
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
		function ho(n, r) {
			var a = r.ref;
			if (a === null) n !== null && n.ref !== null && (r.flags |= 4194816);
			else {
				if (typeof a != "function" && typeof a != "object") throw Error(s(284));
				(n === null || n.ref !== a) && (r.flags |= 4194816);
			}
		}
		function rd(n, r, a, l, c) {
			return (
				za(r),
				(a = Lf(n, r, a, l, void 0, c)),
				(l = qf()),
				n !== null && !sn ? (Uf(n, r, c), mi(n, r, c)) : (Je && l && pf(r), (r.flags |= 1), xn(n, r, a, c), r.child)
			);
		}
		function Ig(n, r, a, l, c, d) {
			return (
				za(r),
				(r.updateQueue = null),
				(a = Vv(r, l, a, c)),
				Bv(n),
				(l = qf()),
				n !== null && !sn ? (Uf(n, r, d), mi(n, r, d)) : (Je && l && pf(r), (r.flags |= 1), xn(n, r, a, d), r.child)
			);
		}
		function Lg(n, r, a, l, c) {
			if ((za(r), r.stateNode === null)) {
				var d = mu,
					y = a.contextType;
				(typeof y == "object" && y !== null && (d = Tn(y)),
					(d = new a(l, d)),
					(r.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null),
					(d.updater = ed),
					(r.stateNode = d),
					(d._reactInternals = r),
					(d = r.stateNode),
					(d.props = l),
					(d.state = r.memoizedState),
					(d.refs = {}),
					kf(r),
					(y = a.contextType),
					(d.context = typeof y == "object" && y !== null ? Tn(y) : mu),
					(d.state = r.memoizedState),
					(y = a.getDerivedStateFromProps),
					typeof y == "function" && (Wf(r, a, y, l), (d.state = r.memoizedState)),
					typeof a.getDerivedStateFromProps == "function" ||
						typeof d.getSnapshotBeforeUpdate == "function" ||
						(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
						((y = d.state),
						typeof d.componentWillMount == "function" && d.componentWillMount(),
						typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(),
						y !== d.state && ed.enqueueReplaceState(d, d.state, null),
						zl(r, l, d, c),
						Ol(),
						(d.state = r.memoizedState)),
					typeof d.componentDidMount == "function" && (r.flags |= 4194308),
					(l = !0));
			} else if (n === null) {
				d = r.stateNode;
				var T = r.memoizedProps,
					z = Ba(a, T);
				d.props = z;
				var X = d.context,
					ne = a.contextType;
				((y = mu), typeof ne == "object" && ne !== null && (y = Tn(ne)));
				var ue = a.getDerivedStateFromProps;
				((ne = typeof ue == "function" || typeof d.getSnapshotBeforeUpdate == "function"),
					(T = r.pendingProps !== T),
					ne ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((T || X !== y) && Ag(r, d, l, y)),
					(Yi = !1));
				var W = r.memoizedState;
				((d.state = W),
					zl(r, l, d, c),
					Ol(),
					(X = r.memoizedState),
					T || W !== X || Yi
						? (typeof ue == "function" && (Wf(r, a, ue, l), (X = r.memoizedState)),
							(z = Yi || xg(r, a, z, l, W, X, y))
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
					Mf(n, r),
					(y = r.memoizedProps),
					(ne = Ba(a, y)),
					(d.props = ne),
					(ue = r.pendingProps),
					(W = d.context),
					(X = a.contextType),
					(z = mu),
					typeof X == "object" && X !== null && (z = Tn(X)),
					(T = a.getDerivedStateFromProps),
					(X = typeof T == "function" || typeof d.getSnapshotBeforeUpdate == "function") ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((y !== ue || W !== z) && Ag(r, d, l, z)),
					(Yi = !1),
					(W = r.memoizedState),
					(d.state = W),
					zl(r, l, d, c),
					Ol());
				var ee = r.memoizedState;
				y !== ue || W !== ee || Yi || (n !== null && n.dependencies !== null && Ks(n.dependencies))
					? (typeof T == "function" && (Wf(r, a, T, l), (ee = r.memoizedState)),
						(ne = Yi || xg(r, a, ne, l, W, ee, z) || (n !== null && n.dependencies !== null && Ks(n.dependencies)))
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
				ho(n, r),
				(l = (r.flags & 128) !== 0),
				d || l
					? ((d = r.stateNode),
						(a = l && typeof a.getDerivedStateFromError != "function" ? null : d.render()),
						(r.flags |= 1),
						n !== null && l ? ((r.child = La(r, n.child, null, c)), (r.child = La(r, null, a, c))) : xn(n, r, a, c),
						(r.memoizedState = d.state),
						(n = r.child))
					: (n = mi(n, r, c)),
				n
			);
		}
		function qg(n, r, a, l) {
			return (Na(), (r.flags |= 256), xn(n, r, a, l), r.child);
		}
		var id = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
		function ad(n) {
			return { baseLanes: n, cachePool: Mv() };
		}
		function ud(n, r, a) {
			return ((n = n !== null ? n.childLanes & ~a : 0), r && (n |= mr), n);
		}
		function Ug(n, r, a) {
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
						(c ? Gi(r) : Fi(r),
						(n = Et)
							? ((n = Yy(n, Mr)),
								(n = n !== null && n.data !== "&" ? n : null),
								n !== null &&
									((r.memoizedState = {
										dehydrated: n,
										treeContext: Zi !== null ? { id: Xr, overflow: Jr } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = Sv(n)),
									(a.return = r),
									(r.child = a),
									(En = r),
									(Et = null)))
							: (n = null),
						n === null)
					)
						throw Qi(r);
					return (Bd(n) ? (r.lanes = 32) : (r.lanes = 536870912), null);
				}
				var T = l.children;
				return (
					(l = l.fallback),
					c
						? (Fi(r),
							(c = r.mode),
							(T = mo({ mode: "hidden", children: T }, c)),
							(l = Ma(l, c, a, null)),
							(T.return = r),
							(l.return = r),
							(T.sibling = l),
							(r.child = T),
							(l = r.child),
							(l.memoizedState = ad(a)),
							(l.childLanes = ud(n, y, a)),
							(r.memoizedState = id),
							ql(null, l))
						: (Gi(r), ld(r, T))
				);
			}
			var z = n.memoizedState;
			if (z !== null && ((T = z.dehydrated), T !== null)) {
				if (d)
					r.flags & 256
						? (Gi(r), (r.flags &= -257), (r = sd(n, r, a)))
						: r.memoizedState !== null
							? (Fi(r), (r.child = n.child), (r.flags |= 128), (r = null))
							: (Fi(r),
								(T = l.fallback),
								(c = r.mode),
								(l = mo({ mode: "visible", children: l.children }, c)),
								(T = Ma(T, c, a, null)),
								(T.flags |= 2),
								(l.return = r),
								(T.return = r),
								(l.sibling = T),
								(r.child = l),
								La(r, n.child, null, a),
								(l = r.child),
								(l.memoizedState = ad(a)),
								(l.childLanes = ud(n, y, a)),
								(r.memoizedState = id),
								(r = ql(null, l)));
				else if ((Gi(r), Bd(T))) {
					if (((y = T.nextSibling && T.nextSibling.dataset), y)) var X = y.dgst;
					((y = X),
						(l = Error(s(419))),
						(l.stack = ""),
						(l.digest = y),
						Al({ value: l, source: null, stack: null }),
						(r = sd(n, r, a)));
				} else if ((sn || pu(n, r, a, !1), (y = (a & n.childLanes) !== 0), sn || y)) {
					if (((y = wt), y !== null && ((l = wa(y, a)), l !== 0 && l !== z.retryLane)))
						throw ((z.retryLane = l), ka(n, l), er(y, n, l), nd);
					($d(T) || Eo(), (r = sd(n, r, a)));
				} else
					$d(T)
						? ((r.flags |= 192), (r.child = n.child), (r = null))
						: ((n = z.treeContext),
							(Et = zr(T.nextSibling)),
							(En = r),
							(Je = !0),
							(Pi = null),
							(Mr = !1),
							n !== null && Tv(r, n),
							(r = ld(r, l.children)),
							(r.flags |= 4096));
				return r;
			}
			return c
				? (Fi(r),
					(T = l.fallback),
					(c = r.mode),
					(z = n.child),
					(X = z.sibling),
					(l = si(z, { mode: "hidden", children: l.children })),
					(l.subtreeFlags = z.subtreeFlags & 65011712),
					X !== null ? (T = si(X, T)) : ((T = Ma(T, c, a, null)), (T.flags |= 2)),
					(T.return = r),
					(l.return = r),
					(l.sibling = T),
					(r.child = l),
					ql(null, l),
					(l = r.child),
					(T = n.child.memoizedState),
					T === null
						? (T = ad(a))
						: ((c = T.cachePool),
							c !== null ? ((z = un._currentValue), (c = c.parent !== z ? { parent: z, pool: z } : c)) : (c = Mv()),
							(T = { baseLanes: T.baseLanes | a, cachePool: c })),
					(l.memoizedState = T),
					(l.childLanes = ud(n, y, a)),
					(r.memoizedState = id),
					ql(n.child, l))
				: (Gi(r),
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
		function ld(n, r) {
			return ((r = mo({ mode: "visible", children: r }, n.mode)), (r.return = n), (n.child = r));
		}
		function mo(n, r) {
			return ((n = cr(22, n, null, r)), (n.lanes = 0), n);
		}
		function sd(n, r, a) {
			return (
				La(r, n.child, null, a),
				(n = ld(r, r.pendingProps.children)),
				(n.flags |= 2),
				(r.memoizedState = null),
				n
			);
		}
		function $g(n, r, a) {
			n.lanes |= r;
			var l = n.alternate;
			(l !== null && (l.lanes |= r), Ef(n.return, r, a));
		}
		function od(n, r, a, l, c, d) {
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
		function Bg(n, r, a) {
			var l = r.pendingProps,
				c = l.revealOrder,
				d = l.tail;
			l = l.children;
			var y = Gt.current,
				T = (y & 2) !== 0;
			if (
				(T ? ((y = (y & 1) | 2), (r.flags |= 128)) : (y &= 1),
				le(Gt, y),
				xn(n, r, l, a),
				(l = Je ? xl : 0),
				!T && n !== null && (n.flags & 128) !== 0)
			)
				e: for (n = r.child; n !== null; ) {
					if (n.tag === 13) n.memoizedState !== null && $g(n, a, r);
					else if (n.tag === 19) $g(n, a, r);
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
						((n = a.alternate), n !== null && to(n) === null && (c = a), (a = a.sibling));
					((a = c),
						a === null ? ((c = r.child), (r.child = null)) : ((c = a.sibling), (a.sibling = null)),
						od(r, !1, c, a, d, l));
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (a = null, c = r.child, r.child = null; c !== null; ) {
						if (((n = c.alternate), n !== null && to(n) === null)) {
							r.child = c;
							break;
						}
						((n = c.sibling), (c.sibling = a), (a = c), (c = n));
					}
					od(r, !0, a, null, d, l);
					break;
				case "together":
					od(r, !1, null, null, void 0, l);
					break;
				default:
					r.memoizedState = null;
			}
			return r.child;
		}
		function mi(n, r, a) {
			if ((n !== null && (r.dependencies = n.dependencies), (Wi |= r.lanes), (a & r.childLanes) === 0))
				if (n !== null) {
					if ((pu(n, r, a, !1), (a & r.childLanes) === 0)) return null;
				} else return null;
			if (n !== null && r.child !== n.child) throw Error(s(153));
			if (r.child !== null) {
				for (n = r.child, a = si(n, n.pendingProps), r.child = a, a.return = r; n.sibling !== null; )
					((n = n.sibling), (a = a.sibling = si(n, n.pendingProps)), (a.return = r));
				a.sibling = null;
			}
			return r.child;
		}
		function cd(n, r) {
			return (n.lanes & r) !== 0 ? !0 : ((n = n.dependencies), !!(n !== null && Ks(n)));
		}
		function Rw(n, r, a) {
			switch (r.tag) {
				case 3:
					(Le(r, r.stateNode.containerInfo), Ki(r, un, n.memoizedState.cache), Na());
					break;
				case 27:
				case 5:
					pt(r);
					break;
				case 4:
					Le(r, r.stateNode.containerInfo);
					break;
				case 10:
					Ki(r, r.type, r.memoizedProps.value);
					break;
				case 31:
					if (r.memoizedState !== null) return ((r.flags |= 128), jf(r), null);
					break;
				case 13:
					var l = r.memoizedState;
					if (l !== null)
						return l.dehydrated !== null
							? (Gi(r), (r.flags |= 128), null)
							: (a & r.child.childLanes) !== 0
								? Ug(n, r, a)
								: (Gi(r), (n = mi(n, r, a)), n !== null ? n.sibling : null);
					Gi(r);
					break;
				case 19:
					var c = (n.flags & 128) !== 0;
					if (((l = (a & r.childLanes) !== 0), l || (pu(n, r, a, !1), (l = (a & r.childLanes) !== 0)), c)) {
						if (l) return Bg(n, r, a);
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
					return ((r.lanes = 0), zg(n, r, a, r.pendingProps));
				case 24:
					Ki(r, un, n.memoizedState.cache);
			}
			return mi(n, r, a);
		}
		function Vg(n, r, a) {
			if (n !== null)
				if (n.memoizedProps !== r.pendingProps) sn = !0;
				else {
					if (!cd(n, a) && (r.flags & 128) === 0) return ((sn = !1), Rw(n, r, a));
					sn = (n.flags & 131072) !== 0;
				}
			else ((sn = !1), Je && (r.flags & 1048576) !== 0 && Ev(r, xl, r.index));
			switch (((r.lanes = 0), r.tag)) {
				case 16:
					e: {
						var l = r.pendingProps;
						if (((n = ja(r.elementType)), (r.type = n), typeof n == "function"))
							vf(n)
								? ((l = Ba(n, l)), (r.tag = 1), (r = Lg(null, r, n, l, a)))
								: ((r.tag = 0), (r = rd(null, r, n, l, a)));
						else {
							if (n != null) {
								var c = n.$$typeof;
								if (c === L) {
									((r.tag = 11), (r = Mg(null, r, n, l, a)));
									break e;
								} else if (c === O) {
									((r.tag = 14), (r = Ng(null, r, n, l, a)));
									break e;
								}
							}
							throw ((r = fe(n) || n), Error(s(306, r, "")));
						}
					}
					return r;
				case 0:
					return rd(n, r, r.type, r.pendingProps, a);
				case 1:
					return ((l = r.type), (c = Ba(l, r.pendingProps)), Lg(n, r, l, c, a));
				case 3:
					e: {
						if ((Le(r, r.stateNode.containerInfo), n === null)) throw Error(s(387));
						l = r.pendingProps;
						var d = r.memoizedState;
						((c = d.element), Mf(n, r), zl(r, l, null, a));
						var y = r.memoizedState;
						if (
							((l = y.cache), Ki(r, un, l), l !== d.cache && Tf(r, [un], a, !0), Ol(), (l = y.element), d.isDehydrated)
						)
							if (
								((d = { element: l, isDehydrated: !1, cache: y.cache }),
								(r.updateQueue.baseState = d),
								(r.memoizedState = d),
								r.flags & 256)
							) {
								r = qg(n, r, l, a);
								break e;
							} else if (l !== c) {
								((c = Rr(Error(s(424)), r)), Al(c), (r = qg(n, r, l, a)));
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
									Et = zr(n.firstChild), En = r, Je = !0, Pi = null, Mr = !0, a = Iv(r, null, l, a), r.child = a;
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
						ho(n, r),
						n === null
							? (a = ep(r.type, null, r.pendingProps, null))
								? (r.memoizedState = a)
								: Je ||
									((a = r.type),
									(n = r.pendingProps),
									(l = Mo(Se.current).createElement(a)),
									(l[Dt] = r),
									(l[rn] = n),
									An(l, a, n),
									Rt(l),
									(r.stateNode = l))
							: (r.memoizedState = ep(r.type, n.memoizedProps, r.pendingProps, n.memoizedState)),
						null
					);
				case 27:
					return (
						pt(r),
						n === null &&
							Je &&
							((l = r.stateNode = Xy(r.type, r.pendingProps, Se.current)),
							(En = r),
							(Mr = !0),
							(c = Et),
							ia(r.type) ? ((Vd = c), (Et = zr(l.firstChild))) : (Et = c)),
						xn(n, r, r.pendingProps.children, a),
						ho(n, r),
						n === null && (r.flags |= 4194304),
						r.child
					);
				case 5:
					return (
						n === null &&
							Je &&
							((c = l = Et) &&
								((l = t1(l, r.type, r.pendingProps, Mr)),
								l !== null ? ((r.stateNode = l), (En = r), (Et = zr(l.firstChild)), (Mr = !1), (c = !0)) : (c = !1)),
							c || Qi(r)),
						pt(r),
						(c = r.type),
						(d = r.pendingProps),
						(y = n !== null ? n.memoizedProps : null),
						(l = d.children),
						Ld(c, d) ? (l = null) : y !== null && Ld(c, y) && (r.flags |= 32),
						r.memoizedState !== null && ((c = Lf(n, r, vw, null, null, a)), (Wl._currentValue = c)),
						ho(n, r),
						xn(n, r, l, a),
						r.child
					);
				case 6:
					return (
						n === null &&
							Je &&
							((n = a = Et) &&
								((a = n1(a, r.pendingProps, Mr)),
								a !== null ? ((r.stateNode = a), (En = r), (Et = null), (n = !0)) : (n = !1)),
							n || Qi(r)),
						null
					);
				case 13:
					return Ug(n, r, a);
				case 4:
					return (
						Le(r, r.stateNode.containerInfo),
						(l = r.pendingProps),
						n === null ? (r.child = La(r, null, l, a)) : xn(n, r, l, a),
						r.child
					);
				case 11:
					return Mg(n, r, r.type, r.pendingProps, a);
				case 7:
					return (xn(n, r, r.pendingProps, a), r.child);
				case 8:
					return (xn(n, r, r.pendingProps.children, a), r.child);
				case 12:
					return (xn(n, r, r.pendingProps.children, a), r.child);
				case 10:
					return ((l = r.pendingProps), Ki(r, r.type, l.value), xn(n, r, l.children, a), r.child);
				case 9:
					return (
						(c = r.type._context),
						(l = r.pendingProps.children),
						za(r),
						(c = Tn(c)),
						(l = l(c)),
						(r.flags |= 1),
						xn(n, r, l, a),
						r.child
					);
				case 14:
					return Ng(n, r, r.type, r.pendingProps, a);
				case 15:
					return Og(n, r, r.type, r.pendingProps, a);
				case 19:
					return Bg(n, r, a);
				case 31:
					return Aw(n, r, a);
				case 22:
					return zg(n, r, a, r.pendingProps);
				case 24:
					return (
						za(r),
						(l = Tn(un)),
						n === null
							? ((c = Rf()),
								c === null &&
									((c = wt),
									(d = xf()),
									(c.pooledCache = d),
									d.refCount++,
									d !== null && (c.pooledCacheLanes |= a),
									(c = d)),
								(r.memoizedState = { parent: l, cache: c }),
								kf(r),
								Ki(r, un, c))
							: ((n.lanes & a) !== 0 && (Mf(n, r), zl(r, null, null, a), Ol()),
								(c = n.memoizedState),
								(d = r.memoizedState),
								c.parent !== l
									? ((c = { parent: l, cache: l }),
										(r.memoizedState = c),
										r.lanes === 0 && (r.memoizedState = r.updateQueue.baseState = c),
										Ki(r, un, l))
									: ((l = d.cache), Ki(r, un, l), l !== c.cache && Tf(r, [un], a, !0))),
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
		function fd(n, r, a, l, c) {
			if (((r = (n.mode & 32) !== 0) && (r = !1), r)) {
				if (((n.flags |= 16777216), (c & 335544128) === c))
					if (n.stateNode.complete) n.flags |= 8192;
					else if (vy()) n.flags |= 8192;
					else throw ((Ia = Xs), Cf);
			} else n.flags &= -16777217;
		}
		function Hg(n, r) {
			if (r.type !== "stylesheet" || (r.state.loading & 4) !== 0) n.flags &= -16777217;
			else if (((n.flags |= 16777216), !ap(r)))
				if (vy()) n.flags |= 8192;
				else throw ((Ia = Xs), Cf);
		}
		function vo(n, r) {
			(r !== null && (n.flags |= 4),
				n.flags & 16384 && ((r = n.tag !== 22 ? lr() : 536870912), (n.lanes |= r), (Mu |= r)));
		}
		function Ul(n, r) {
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
			switch ((bf(r), r.tag)) {
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
						Xe(),
						a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
						(n === null || n.child === null) &&
							(yu(r)
								? vi(r)
								: n === null || (n.memoizedState.isDehydrated && (r.flags & 256) === 0) || ((r.flags |= 1024), Sf())),
						Tt(r),
						null
					);
				case 26:
					var c = r.type,
						d = r.memoizedState;
					return (
						n === null
							? (vi(r), d !== null ? (Tt(r), Hg(r, d)) : (Tt(r), fd(r, c, null, l, a)))
							: d
								? d !== n.memoizedState
									? (vi(r), Tt(r), Hg(r, d))
									: (Tt(r), (r.flags &= -16777217))
								: ((n = n.memoizedProps), n !== l && vi(r), Tt(r), fd(r, c, n, l, a)),
						null
					);
				case 27:
					if ((At(r), (a = Se.current), (c = r.type), n !== null && r.stateNode != null))
						n.memoizedProps !== l && vi(r);
					else {
						if (!l) {
							if (r.stateNode === null) throw Error(s(166));
							return (Tt(r), null);
						}
						((n = oe.current), yu(r) ? xv(r, n) : ((n = Xy(c, l, a)), (r.stateNode = n), vi(r)));
					}
					return (Tt(r), null);
				case 5:
					if ((At(r), (c = r.type), n !== null && r.stateNode != null)) n.memoizedProps !== l && vi(r);
					else {
						if (!l) {
							if (r.stateNode === null) throw Error(s(166));
							return (Tt(r), null);
						}
						if (((d = oe.current), yu(r))) xv(r, d);
						else {
							var y = Mo(Se.current);
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
					return (Tt(r), fd(r, r.type, n === null ? null : n.memoizedProps, r.pendingProps, a), null);
				case 6:
					if (n && r.stateNode != null) n.memoizedProps !== l && vi(r);
					else {
						if (typeof l != "string" && r.stateNode === null) throw Error(s(166));
						if (((n = Se.current), yu(r))) {
							if (((n = r.stateNode), (a = r.memoizedProps), (l = null), (c = En), c !== null))
								switch (c.tag) {
									case 27:
									case 5:
										l = c.memoizedProps;
								}
							((n[Dt] = r),
								(n = !!(n.nodeValue === a || (l !== null && l.suppressHydrationWarning === !0) || $y(n.nodeValue, a))),
								n || Qi(r, !0));
						} else ((n = Mo(n).createTextNode(l)), (n[Dt] = r), (r.stateNode = n));
					}
					return (Tt(r), null);
				case 31:
					if (((a = r.memoizedState), n === null || n.memoizedState !== null)) {
						if (((l = yu(r)), a !== null)) {
							if (n === null) {
								if (!l) throw Error(s(318));
								if (((n = r.memoizedState), (n = n !== null ? n.dehydrated : null), !n)) throw Error(s(557));
								n[Dt] = r;
							} else (Na(), (r.flags & 128) === 0 && (r.memoizedState = null), (r.flags |= 4));
							(Tt(r), (n = !1));
						} else
							((a = Sf()), n !== null && n.memoizedState !== null && (n.memoizedState.hydrationErrors = a), (n = !0));
						if (!n) return r.flags & 256 ? (dr(r), r) : (dr(r), null);
						if ((r.flags & 128) !== 0) throw Error(s(558));
					}
					return (Tt(r), null);
				case 13:
					if (
						((l = r.memoizedState), n === null || (n.memoizedState !== null && n.memoizedState.dehydrated !== null))
					) {
						if (((c = yu(r)), l !== null && l.dehydrated !== null)) {
							if (n === null) {
								if (!c) throw Error(s(318));
								if (((c = r.memoizedState), (c = c !== null ? c.dehydrated : null), !c)) throw Error(s(317));
								c[Dt] = r;
							} else (Na(), (r.flags & 128) === 0 && (r.memoizedState = null), (r.flags |= 4));
							(Tt(r), (c = !1));
						} else
							((c = Sf()), n !== null && n.memoizedState !== null && (n.memoizedState.hydrationErrors = c), (c = !0));
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
								vo(r, r.updateQueue),
								Tt(r),
								null)
					);
				case 4:
					return (Xe(), n === null && Iy(r.stateNode.containerInfo), Tt(r), null);
				case 10:
					return (fi(r.type), Tt(r), null);
				case 19:
					if ((D(Gt), (l = r.memoizedState), l === null)) return (Tt(r), null);
					if (((c = (r.flags & 128) !== 0), (d = l.rendering), d === null))
						if (c) Ul(l, !1);
						else {
							if ($t !== 0 || (n !== null && (n.flags & 128) !== 0))
								for (n = r.child; n !== null; ) {
									if (((d = to(n)), d !== null)) {
										for (
											r.flags |= 128,
												Ul(l, !1),
												n = d.updateQueue,
												r.updateQueue = n,
												vo(r, n),
												r.subtreeFlags = 0,
												n = a,
												a = r.child;
											a !== null;
										)
											(_v(a, n), (a = a.sibling));
										return (le(Gt, (Gt.current & 1) | 2), Je && oi(r, l.treeForkCount), r.child);
									}
									n = n.sibling;
								}
							l.tail !== null && Ne() > _o && ((r.flags |= 128), (c = !0), Ul(l, !1), (r.lanes = 4194304));
						}
					else {
						if (!c)
							if (((n = to(d)), n !== null)) {
								if (
									((r.flags |= 128),
									(c = !0),
									(n = n.updateQueue),
									(r.updateQueue = n),
									vo(r, n),
									Ul(l, !0),
									l.tail === null && l.tailMode === "hidden" && !d.alternate && !Je)
								)
									return (Tt(r), null);
							} else
								2 * Ne() - l.renderingStartTime > _o &&
									a !== 536870912 &&
									((r.flags |= 128), (c = !0), Ul(l, !1), (r.lanes = 4194304));
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
							Je && oi(r, l.treeForkCount),
							n)
						: (Tt(r), null);
				case 22:
				case 23:
					return (
						dr(r),
						Df(),
						(l = r.memoizedState !== null),
						n !== null ? (n.memoizedState !== null) !== l && (r.flags |= 8192) : l && (r.flags |= 8192),
						l
							? (a & 536870912) !== 0 && (r.flags & 128) === 0 && (Tt(r), r.subtreeFlags & 6 && (r.flags |= 8192))
							: Tt(r),
						(a = r.updateQueue),
						a !== null && vo(r, a.retryQueue),
						(a = null),
						n !== null &&
							n.memoizedState !== null &&
							n.memoizedState.cachePool !== null &&
							(a = n.memoizedState.cachePool.pool),
						(l = null),
						r.memoizedState !== null && r.memoizedState.cachePool !== null && (l = r.memoizedState.cachePool.pool),
						l !== a && (r.flags |= 2048),
						n !== null && D(Da),
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
		function kw(n, r) {
			switch ((bf(r), r.tag)) {
				case 1:
					return ((n = r.flags), n & 65536 ? ((r.flags = (n & -65537) | 128), r) : null);
				case 3:
					return (
						fi(un),
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
					return (D(Gt), null);
				case 4:
					return (Xe(), null);
				case 10:
					return (fi(r.type), null);
				case 22:
				case 23:
					return (
						dr(r),
						Df(),
						n !== null && D(Da),
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
			switch ((bf(r), r.tag)) {
				case 3:
					(fi(un), Xe());
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
					fi(r.type);
					break;
				case 22:
				case 23:
					(dr(r), Df(), n !== null && D(Da));
					break;
				case 24:
					fi(un);
			}
		}
		function $l(n, r) {
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
			} catch (T) {
				dt(r, r.return, T);
			}
		}
		function Xi(n, r, a) {
			try {
				var l = r.updateQueue,
					c = l !== null ? l.lastEffect : null;
				if (c !== null) {
					var d = c.next;
					l = d;
					do {
						if ((l.tag & n) === n) {
							var y = l.inst,
								T = y.destroy;
							if (T !== void 0) {
								((y.destroy = void 0), (c = r));
								var z = a,
									X = T;
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
		function Pg(n) {
			var r = n.updateQueue;
			if (r !== null) {
				var a = n.stateNode;
				try {
					qv(r, a);
				} catch (l) {
					dt(n, n.return, l);
				}
			}
		}
		function Qg(n, r, a) {
			((a.props = Ba(n.type, n.memoizedProps)), (a.state = n.memoizedState));
			try {
				a.componentWillUnmount();
			} catch (l) {
				dt(n, r, l);
			}
		}
		function Bl(n, r) {
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
		function Wr(n, r) {
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
		function Kg(n) {
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
		function dd(n, r, a) {
			try {
				var l = n.stateNode;
				(Gw(l, n.type, a, r), (l[rn] = r));
			} catch (c) {
				dt(n, n.return, c);
			}
		}
		function Yg(n) {
			return n.tag === 5 || n.tag === 3 || n.tag === 26 || (n.tag === 27 && ia(n.type)) || n.tag === 4;
		}
		function hd(n) {
			e: for (;;) {
				for (; n.sibling === null; ) {
					if (n.return === null || Yg(n.return)) return null;
					n = n.return;
				}
				for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
					if ((n.tag === 27 && ia(n.type)) || n.flags & 2 || n.child === null || n.tag === 4) continue e;
					((n.child.return = n), (n = n.child));
				}
				if (!(n.flags & 2)) return n.stateNode;
			}
		}
		function md(n, r, a) {
			var l = n.tag;
			if (l === 5 || l === 6)
				((n = n.stateNode),
					r
						? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(n, r)
						: ((r = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a),
							r.appendChild(n),
							(a = a._reactRootContainer),
							a != null || r.onclick !== null || (r.onclick = On)));
			else if (l !== 4 && (l === 27 && ia(n.type) && ((a = n.stateNode), (r = null)), (n = n.child), n !== null))
				for (md(n, r, a), n = n.sibling; n !== null; ) (md(n, r, a), (n = n.sibling));
		}
		function go(n, r, a) {
			var l = n.tag;
			if (l === 5 || l === 6) ((n = n.stateNode), r ? a.insertBefore(n, r) : a.appendChild(n));
			else if (l !== 4 && (l === 27 && ia(n.type) && (a = n.stateNode), (n = n.child), n !== null))
				for (go(n, r, a), n = n.sibling; n !== null; ) (go(n, r, a), (n = n.sibling));
		}
		function Gg(n) {
			var r = n.stateNode,
				a = n.memoizedProps;
			try {
				for (var l = n.type, c = r.attributes; c.length; ) r.removeAttributeNode(c[0]);
				(An(r, l, a), (r[Dt] = n), (r[rn] = a));
			} catch (d) {
				dt(n, n.return, d);
			}
		}
		var gi = !1,
			on = !1,
			vd = !1,
			Fg = typeof WeakSet == "function" ? WeakSet : Set,
			bn = null;
		function Mw(n, r) {
			if (((n = n.containerInfo), (jd = Lo), (n = fv(n)), sf(n))) {
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
								T = -1,
								z = -1,
								X = 0,
								ne = 0,
								ue = n,
								W = null;
							t: for (;;) {
								for (
									var ee;
									ue !== a || (c !== 0 && ue.nodeType !== 3) || (T = y + c),
										ue !== d || (l !== 0 && ue.nodeType !== 3) || (z = y + l),
										ue.nodeType === 3 && (y += ue.nodeValue.length),
										(ee = ue.firstChild) !== null;
								)
									((W = ue), (ue = ee));
								for (;;) {
									if (ue === n) break t;
									if (
										(W === a && ++X === c && (T = y), W === d && ++ne === l && (z = y), (ee = ue.nextSibling) !== null)
									)
										break;
									((ue = W), (W = ue.parentNode));
								}
								ue = ee;
							}
							a = T === -1 || z === -1 ? null : { start: T, end: z };
						} else a = null;
					}
				a = a || { start: 0, end: 0 };
			} else a = null;
			for (Id = { focusedElem: n, selectionRange: a }, Lo = !1, bn = r; bn !== null; )
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
										var _e = Ba(a.type, c);
										((n = l.getSnapshotBeforeUpdate(_e, d)), (l.__reactInternalSnapshotBeforeUpdate = n));
									} catch (ke) {
										dt(a, a.return, ke);
									}
								}
								break;
							case 3:
								if ((n & 1024) !== 0) {
									if (((n = r.stateNode.containerInfo), (a = n.nodeType), a === 9)) Ud(n);
									else if (a === 1)
										switch (n.nodeName) {
											case "HEAD":
											case "HTML":
											case "BODY":
												Ud(n);
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
		function Xg(n, r, a) {
			var l = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					(pi(n, a), l & 4 && $l(5, a));
					break;
				case 1:
					if ((pi(n, a), l & 4))
						if (((n = a.stateNode), r === null))
							try {
								n.componentDidMount();
							} catch (y) {
								dt(a, a.return, y);
							}
						else {
							var c = Ba(a.type, r.memoizedProps);
							r = r.memoizedState;
							try {
								n.componentDidUpdate(c, r, n.__reactInternalSnapshotBeforeUpdate);
							} catch (y) {
								dt(a, a.return, y);
							}
						}
					(l & 64 && Pg(a), l & 512 && Bl(a, a.return));
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
							qv(n, r);
						} catch (y) {
							dt(a, a.return, y);
						}
					}
					break;
				case 27:
					r === null && l & 4 && Gg(a);
				case 26:
				case 5:
					(pi(n, a), r === null && l & 4 && Kg(a), l & 512 && Bl(a, a.return));
					break;
				case 12:
					pi(n, a);
					break;
				case 31:
					(pi(n, a), l & 4 && ey(n, a));
					break;
				case 13:
					(pi(n, a),
						l & 4 && ty(n, a),
						l & 64 &&
							((n = a.memoizedState),
							n !== null && ((n = n.dehydrated), n !== null && ((a = Uw.bind(null, a)), r1(n, a)))));
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
		function Jg(n) {
			var r = n.alternate;
			(r !== null && ((n.alternate = null), Jg(r)),
				(n.child = null),
				(n.deletions = null),
				(n.sibling = null),
				n.tag === 5 && ((r = n.stateNode), r !== null && $i(r)),
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
			for (a = a.child; a !== null; ) (Wg(n, r, a), (a = a.sibling));
		}
		function Wg(n, r, a) {
			if (_t && typeof _t.onCommitFiberUnmount == "function")
				try {
					_t.onCommitFiberUnmount(kn, a);
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
					(ia(a.type) && ((kt = a.stateNode), (Fn = !1)), yi(n, r, a), Fl(a.stateNode), (kt = l), (Fn = c));
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
								Qy(n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, a.stateNode),
								qu(n))
							: Qy(kt, a.stateNode));
					break;
				case 4:
					((l = kt), (c = Fn), (kt = a.stateNode.containerInfo), (Fn = !0), yi(n, r, a), (kt = l), (Fn = c));
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					(Xi(2, a, r), on || Xi(4, a, r), yi(n, r, a));
					break;
				case 1:
					(on || (Wr(a, r), (l = a.stateNode), typeof l.componentWillUnmount == "function" && Qg(a, r, l)),
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
		function ey(n, r) {
			if (r.memoizedState === null && ((n = r.alternate), n !== null && ((n = n.memoizedState), n !== null))) {
				n = n.dehydrated;
				try {
					qu(n);
				} catch (a) {
					dt(r, r.return, a);
				}
			}
		}
		function ty(n, r) {
			if (
				r.memoizedState === null &&
				((n = r.alternate), n !== null && ((n = n.memoizedState), n !== null && ((n = n.dehydrated), n !== null)))
			)
				try {
					qu(n);
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
					return (r === null && (r = n.stateNode = new Fg()), r);
				case 22:
					return ((n = n.stateNode), (r = n._retryCache), r === null && (r = n._retryCache = new Fg()), r);
				default:
					throw Error(s(435, n.tag));
			}
		}
		function yo(n, r) {
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
						T = y;
					e: for (; T !== null; ) {
						switch (T.tag) {
							case 27:
								if (ia(T.type)) {
									((kt = T.stateNode), (Fn = !1));
									break e;
								}
								break;
							case 5:
								((kt = T.stateNode), (Fn = !1));
								break e;
							case 3:
							case 4:
								((kt = T.stateNode.containerInfo), (Fn = !0));
								break e;
						}
						T = T.return;
					}
					if (kt === null) throw Error(s(160));
					(Wg(d, y, c), (kt = null), (Fn = !1), (d = c.alternate), d !== null && (d.return = null), (c.return = null));
				}
			if (r.subtreeFlags & 13886) for (r = r.child; r !== null; ) (ny(r, n), (r = r.sibling));
		}
		var Pr = null;
		function ny(n, r) {
			var a = n.alternate,
				l = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					(Xn(r, n), Jn(n), l & 4 && (Xi(3, n, n.return), $l(3, n), Xi(5, n, n.return)));
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
					var c = Pr;
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
												var y = rp("link", "href", c).get(l + (a.href || ""));
												if (y) {
													for (var T = 0; T < y.length; T++)
														if (
															((d = y[T]),
															d.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) &&
																d.getAttribute("rel") === (a.rel == null ? null : a.rel) &&
																d.getAttribute("title") === (a.title == null ? null : a.title) &&
																d.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin))
														) {
															y.splice(T, 1);
															break t;
														}
												}
												((d = c.createElement(l)), An(d, l, a), c.head.appendChild(d));
												break;
											case "meta":
												if ((y = rp("meta", "content", c).get(l + (a.content || "")))) {
													for (T = 0; T < y.length; T++)
														if (
															((d = y[T]),
															d.getAttribute("content") === (a.content == null ? null : "" + a.content) &&
																d.getAttribute("name") === (a.name == null ? null : a.name) &&
																d.getAttribute("property") === (a.property == null ? null : a.property) &&
																d.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) &&
																d.getAttribute("charset") === (a.charSet == null ? null : a.charSet))
														) {
															y.splice(T, 1);
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
								} else ip(c, n.type, n.stateNode);
							else n.stateNode = np(c, l, n.memoizedProps);
						else
							d !== l
								? (d === null ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a)) : d.count--,
									l === null ? ip(c, n.type, n.stateNode) : np(c, l, n.memoizedProps))
								: l === null && n.stateNode !== null && dd(n, n.memoizedProps, a.memoizedProps);
					}
					break;
				case 27:
					(Xn(r, n),
						Jn(n),
						l & 512 && (on || a === null || Wr(a, a.return)),
						a !== null && l & 4 && dd(n, n.memoizedProps, a.memoizedProps));
					break;
				case 5:
					if ((Xn(r, n), Jn(n), l & 512 && (on || a === null || Wr(a, a.return)), n.flags & 32)) {
						c = n.stateNode;
						try {
							Vr(c, "");
						} catch (_e) {
							dt(n, n.return, _e);
						}
					}
					(l & 4 && n.stateNode != null && ((c = n.memoizedProps), dd(n, c, a !== null ? a.memoizedProps : c)),
						l & 1024 && (vd = !0));
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
						((zo = null),
						(c = Pr),
						(Pr = No(r.containerInfo)),
						Xn(r, n),
						(Pr = c),
						Jn(n),
						l & 4 && a !== null && a.memoizedState.isDehydrated)
					)
						try {
							qu(r.containerInfo);
						} catch (_e) {
							dt(n, n.return, _e);
						}
					vd && ((vd = !1), ry(n));
					break;
				case 4:
					((l = Pr), (Pr = No(n.stateNode.containerInfo)), Xn(r, n), Jn(n), (Pr = l));
					break;
				case 12:
					(Xn(r, n), Jn(n));
					break;
				case 31:
					(Xn(r, n), Jn(n), l & 4 && ((l = n.updateQueue), l !== null && ((n.updateQueue = null), yo(n, l))));
					break;
				case 13:
					(Xn(r, n),
						Jn(n),
						n.child.flags & 8192 &&
							(n.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
							(bo = Ne()),
						l & 4 && ((l = n.updateQueue), l !== null && ((n.updateQueue = null), yo(n, l))));
					break;
				case 22:
					c = n.memoizedState !== null;
					var z = a !== null && a.memoizedState !== null,
						X = gi,
						ne = on;
					if (((gi = X || c), (on = ne || z), Xn(r, n), (on = ne), (gi = X), Jn(n), l & 8192))
						e: for (
							r = n.stateNode,
								r._visibility = c ? r._visibility & -2 : r._visibility | 1,
								c && (a === null || z || gi || on || Va(n)),
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
											T = z.stateNode;
											var ue = z.memoizedProps.style,
												W = ue != null && ue.hasOwnProperty("display") ? ue.display : null;
											T.style.display = W == null || typeof W == "boolean" ? "" : ("" + W).trim();
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
										c ? Ky(ee, !0) : Ky(z.stateNode, !1);
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
						((l = n.updateQueue), l !== null && ((a = l.retryQueue), a !== null && ((l.retryQueue = null), yo(n, a))));
					break;
				case 19:
					(Xn(r, n), Jn(n), l & 4 && ((l = n.updateQueue), l !== null && ((n.updateQueue = null), yo(n, l))));
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
						if (Yg(l)) {
							a = l;
							break;
						}
						l = l.return;
					}
					if (a == null) throw Error(s(160));
					switch (a.tag) {
						case 27:
							var c = a.stateNode;
							go(n, hd(n), c);
							break;
						case 5:
							var d = a.stateNode;
							(a.flags & 32 && (Vr(d, ""), (a.flags &= -33)), go(n, hd(n), d));
							break;
						case 3:
						case 4:
							var y = a.stateNode.containerInfo;
							md(n, hd(n), y);
							break;
						default:
							throw Error(s(161));
					}
				} catch (T) {
					dt(n, n.return, T);
				}
				n.flags &= -3;
			}
			r & 4096 && (n.flags &= -4097);
		}
		function ry(n) {
			if (n.subtreeFlags & 1024)
				for (n = n.child; n !== null; ) {
					var r = n;
					(ry(r), r.tag === 5 && r.flags & 1024 && r.stateNode.reset(), (n = n.sibling));
				}
		}
		function pi(n, r) {
			if (r.subtreeFlags & 8772) for (r = r.child; r !== null; ) (Xg(n, r.alternate, r), (r = r.sibling));
		}
		function Va(n) {
			for (n = n.child; n !== null; ) {
				var r = n;
				switch (r.tag) {
					case 0:
					case 11:
					case 14:
					case 15:
						(Xi(4, r, r.return), Va(r));
						break;
					case 1:
						Wr(r, r.return);
						var a = r.stateNode;
						(typeof a.componentWillUnmount == "function" && Qg(r, r.return, a), Va(r));
						break;
					case 27:
						Fl(r.stateNode);
					case 26:
					case 5:
						(Wr(r, r.return), Va(r));
						break;
					case 22:
						r.memoizedState === null && Va(r);
						break;
					case 30:
						Va(r);
						break;
					default:
						Va(r);
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
						(bi(c, d, a), $l(4, d));
						break;
					case 1:
						if ((bi(c, d, a), (l = d), (c = l.stateNode), typeof c.componentDidMount == "function"))
							try {
								c.componentDidMount();
							} catch (X) {
								dt(l, l.return, X);
							}
						if (((l = d), (c = l.updateQueue), c !== null)) {
							var T = l.stateNode;
							try {
								var z = c.shared.hiddenCallbacks;
								if (z !== null) for (c.shared.hiddenCallbacks = null, c = 0; c < z.length; c++) Lv(z[c], T);
							} catch (X) {
								dt(l, l.return, X);
							}
						}
						(a && y & 64 && Pg(d), Bl(d, d.return));
						break;
					case 27:
						Gg(d);
					case 26:
					case 5:
						(bi(c, d, a), a && l === null && y & 4 && Kg(d), Bl(d, d.return));
						break;
					case 12:
						bi(c, d, a);
						break;
					case 31:
						(bi(c, d, a), a && y & 4 && ey(c, d));
						break;
					case 13:
						(bi(c, d, a), a && y & 4 && ty(c, d));
						break;
					case 22:
						(d.memoizedState === null && bi(c, d, a), Bl(d, d.return));
						break;
					case 30:
						break;
					default:
						bi(c, d, a);
				}
				r = r.sibling;
			}
		}
		function gd(n, r) {
			var a = null;
			(n !== null &&
				n.memoizedState !== null &&
				n.memoizedState.cachePool !== null &&
				(a = n.memoizedState.cachePool.pool),
				(n = null),
				r.memoizedState !== null && r.memoizedState.cachePool !== null && (n = r.memoizedState.cachePool.pool),
				n !== a && (n != null && n.refCount++, a != null && Rl(a)));
		}
		function yd(n, r) {
			((n = null),
				r.alternate !== null && (n = r.alternate.memoizedState.cache),
				(r = r.memoizedState.cache),
				r !== n && (r.refCount++, n != null && Rl(n)));
		}
		function Qr(n, r, a, l) {
			if (r.subtreeFlags & 10256) for (r = r.child; r !== null; ) (iy(n, r, a, l), (r = r.sibling));
		}
		function iy(n, r, a, l) {
			var c = r.flags;
			switch (r.tag) {
				case 0:
				case 11:
				case 15:
					(Qr(n, r, a, l), c & 2048 && $l(9, r));
					break;
				case 1:
					Qr(n, r, a, l);
					break;
				case 3:
					(Qr(n, r, a, l),
						c & 2048 &&
							((n = null),
							r.alternate !== null && (n = r.alternate.memoizedState.cache),
							(r = r.memoizedState.cache),
							r !== n && (r.refCount++, n != null && Rl(n))));
					break;
				case 12:
					if (c & 2048) {
						(Qr(n, r, a, l), (n = r.stateNode));
						try {
							var d = r.memoizedProps,
								y = d.id,
								T = d.onPostCommit;
							typeof T == "function" && T(y, r.alternate === null ? "mount" : "update", n.passiveEffectDuration, -0);
						} catch (z) {
							dt(r, r.return, z);
						}
					} else Qr(n, r, a, l);
					break;
				case 31:
					Qr(n, r, a, l);
					break;
				case 13:
					Qr(n, r, a, l);
					break;
				case 23:
					break;
				case 22:
					((d = r.stateNode),
						(y = r.alternate),
						r.memoizedState !== null
							? d._visibility & 2
								? Qr(n, r, a, l)
								: Vl(n, r)
							: d._visibility & 2
								? Qr(n, r, a, l)
								: ((d._visibility |= 2), Ru(n, r, a, l, (r.subtreeFlags & 10256) !== 0 || !1)),
						c & 2048 && gd(y, r));
					break;
				case 24:
					(Qr(n, r, a, l), c & 2048 && yd(r.alternate, r));
					break;
				default:
					Qr(n, r, a, l);
			}
		}
		function Ru(n, r, a, l, c) {
			for (c = c && ((r.subtreeFlags & 10256) !== 0 || !1), r = r.child; r !== null; ) {
				var d = n,
					y = r,
					T = a,
					z = l,
					X = y.flags;
				switch (y.tag) {
					case 0:
					case 11:
					case 15:
						(Ru(d, y, T, z, c), $l(8, y));
						break;
					case 23:
						break;
					case 22:
						var ne = y.stateNode;
						(y.memoizedState !== null
							? ne._visibility & 2
								? Ru(d, y, T, z, c)
								: Vl(d, y)
							: ((ne._visibility |= 2), Ru(d, y, T, z, c)),
							c && X & 2048 && gd(y.alternate, y));
						break;
					case 24:
						(Ru(d, y, T, z, c), c && X & 2048 && yd(y.alternate, y));
						break;
					default:
						Ru(d, y, T, z, c);
				}
				r = r.sibling;
			}
		}
		function Vl(n, r) {
			if (r.subtreeFlags & 10256)
				for (r = r.child; r !== null; ) {
					var a = n,
						l = r,
						c = l.flags;
					switch (l.tag) {
						case 22:
							(Vl(a, l), c & 2048 && gd(l.alternate, l));
							break;
						case 24:
							(Vl(a, l), c & 2048 && yd(l.alternate, l));
							break;
						default:
							Vl(a, l);
					}
					r = r.sibling;
				}
		}
		var Hl = 8192;
		function Cu(n, r, a) {
			if (n.subtreeFlags & Hl) for (n = n.child; n !== null; ) (ay(n, r, a), (n = n.sibling));
		}
		function ay(n, r, a) {
			switch (n.tag) {
				case 26:
					(Cu(n, r, a), n.flags & Hl && n.memoizedState !== null && v1(a, Pr, n.memoizedState, n.memoizedProps));
					break;
				case 5:
					Cu(n, r, a);
					break;
				case 3:
				case 4:
					var l = Pr;
					((Pr = No(n.stateNode.containerInfo)), Cu(n, r, a), (Pr = l));
					break;
				case 22:
					n.memoizedState === null &&
						((l = n.alternate),
						l !== null && l.memoizedState !== null ? ((l = Hl), (Hl = 16777216), Cu(n, r, a), (Hl = l)) : Cu(n, r, a));
					break;
				default:
					Cu(n, r, a);
			}
		}
		function uy(n) {
			var r = n.alternate;
			if (r !== null && ((n = r.child), n !== null)) {
				r.child = null;
				do ((r = n.sibling), (n.sibling = null), (n = r));
				while (n !== null);
			}
		}
		function Zl(n) {
			var r = n.deletions;
			if ((n.flags & 16) !== 0) {
				if (r !== null)
					for (var a = 0; a < r.length; a++) {
						var l = r[a];
						((bn = l), sy(l, n));
					}
				uy(n);
			}
			if (n.subtreeFlags & 10256) for (n = n.child; n !== null; ) (ly(n), (n = n.sibling));
		}
		function ly(n) {
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					(Zl(n), n.flags & 2048 && Xi(9, n, n.return));
					break;
				case 3:
					Zl(n);
					break;
				case 12:
					Zl(n);
					break;
				case 22:
					var r = n.stateNode;
					n.memoizedState !== null && r._visibility & 2 && (n.return === null || n.return.tag !== 13)
						? ((r._visibility &= -3), po(n))
						: Zl(n);
					break;
				default:
					Zl(n);
			}
		}
		function po(n) {
			var r = n.deletions;
			if ((n.flags & 16) !== 0) {
				if (r !== null)
					for (var a = 0; a < r.length; a++) {
						var l = r[a];
						((bn = l), sy(l, n));
					}
				uy(n);
			}
			for (n = n.child; n !== null; ) {
				switch (((r = n), r.tag)) {
					case 0:
					case 11:
					case 15:
						(Xi(8, r, r.return), po(r));
						break;
					case 22:
						((a = r.stateNode), a._visibility & 2 && ((a._visibility &= -3), po(r)));
						break;
					default:
						po(r);
				}
				n = n.sibling;
			}
		}
		function sy(n, r) {
			for (; bn !== null; ) {
				var a = bn;
				switch (a.tag) {
					case 0:
					case 11:
					case 15:
						Xi(8, a, r);
						break;
					case 23:
					case 22:
						if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
							var l = a.memoizedState.cachePool.pool;
							l != null && l.refCount++;
						}
						break;
					case 24:
						Rl(a.memoizedState.cache);
				}
				if (((l = a.child), l !== null)) ((l.return = a), (bn = l));
				else
					e: for (a = n; bn !== null; ) {
						l = bn;
						var c = l.sibling,
							d = l.return;
						if ((Jg(l), l === a)) {
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
			Ji = !1,
			ku = !1,
			pd = !1,
			_i = 0,
			$t = 0,
			Wi = 0,
			Ha = 0,
			bd = 0,
			mr = 0,
			Mu = 0,
			Pl = null,
			Wn = null,
			_d = !1,
			bo = 0,
			oy = 0,
			_o = 1 / 0,
			So = null,
			ea = null,
			gn = 0,
			ta = null,
			Nu = null,
			Si = 0,
			Sd = 0,
			wd = null,
			cy = null,
			Ql = 0,
			Ed = null;
		function Or() {
			return (st & 2) !== 0 && Ye !== 0 ? Ye & -Ye : B.T !== null ? kd() : qi();
		}
		function fy() {
			if (mr === 0)
				if ((Ye & 536870912) === 0 || Je) {
					var n = Zt;
					((Zt <<= 1), (Zt & 3932160) === 0 && (Zt = 262144), (mr = n));
				} else mr = 536870912;
			return ((n = fr.current), n !== null && (n.flags |= 32), mr);
		}
		function er(n, r, a) {
			(((n === wt && (ft === 2 || ft === 9)) || n.cancelPendingCommit !== null) && (Ou(n, 0), na(n, Ye, mr, !1)),
				In(n, a),
				((st & 2) === 0 || n !== wt) &&
					(n === wt && ((st & 2) === 0 && (Ha |= a), $t === 4 && na(n, Ye, mr, !1)), wi(n)));
		}
		function dy(n, r, a) {
			if ((st & 6) !== 0) throw Error(s(327));
			var l = (!a && (r & 127) === 0 && (r & n.expiredLanes) === 0) || Sn(n, r),
				c = l ? Iw(n, r) : xd(n, r, !0),
				d = l;
			do {
				if (c === 0) {
					ku && !l && na(n, r, 0, !1);
					break;
				} else {
					if (((a = n.current.alternate), d && !Dw(a))) {
						((c = xd(n, r, !1)), (d = !1));
						continue;
					}
					if (c === 2) {
						if (((d = r), n.errorRecoveryDisabledLanes & d)) var y = 0;
						else ((y = n.pendingLanes & -536870913), (y = y !== 0 ? y : y & 536870912 ? 536870912 : 0));
						if (y !== 0) {
							r = y;
							e: {
								var T = n;
								c = Pl;
								var z = T.current.memoizedState.isDehydrated;
								if ((z && (Ou(T, y).flags |= 256), (y = xd(T, y, !1)), y !== 2)) {
									if (pd && !z) {
										((T.errorRecoveryDisabledLanes |= d), (Ha |= d), (c = 4));
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
						(Ou(n, 0), na(n, r, 0, !0));
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
								na(l, r, mr, !Ji);
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
						if ((r & 62914560) === r && ((c = bo + 300 - Ne()), 10 < c)) {
							if ((na(l, r, mr, !Ji), ur(l, 0, !0) !== 0)) break e;
							((Si = r),
								(l.timeoutHandle = Zy(hy.bind(null, l, a, Wn, So, _d, r, mr, Ha, Mu, Ji, d, "Throttled", -0, 0), c)));
							break e;
						}
						hy(l, a, Wn, So, _d, r, mr, Ha, Mu, Ji, d, null, -0, 0);
					}
				}
				break;
			} while (!0);
			wi(n);
		}
		function hy(n, r, a, l, c, d, y, T, z, X, ne, ue, W, ee) {
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
					ay(r, d, ue));
				var _e = (d & 62914560) === d ? bo - Ne() : (d & 4194048) === d ? oy - Ne() : 0;
				if (((_e = g1(ue, _e)), _e !== null)) {
					((Si = d),
						(n.cancelPendingCommit = _e(Sy.bind(null, n, r, d, a, l, c, y, T, z, ne, ue, null, W, ee))),
						na(n, d, y, !X));
					return;
				}
			}
			Sy(n, r, d, a, l, c, y, T, z);
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
		function na(n, r, a, l) {
			((r &= ~bd),
				(r &= ~Ha),
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
		function wo() {
			return (st & 6) === 0 ? (Kl(0, !1), !1) : !0;
		}
		function Td() {
			if (He !== null) {
				if (ft === 0) var n = He.return;
				else ((n = He), (ci = Oa = null), $f(n), (wu = null), (kl = 0), (n = He));
				for (; n !== null; ) (Zg(n.alternate, n), (n = n.return));
				He = null;
			}
		}
		function Ou(n, r) {
			var a = n.timeoutHandle;
			(a !== -1 && ((n.timeoutHandle = -1), Jw(a)),
				(a = n.cancelPendingCommit),
				a !== null && ((n.cancelPendingCommit = null), a()),
				(Si = 0),
				Td(),
				(wt = n),
				(He = a = si(n.current, null)),
				(Ye = r),
				(ft = 0),
				(hr = null),
				(Ji = !1),
				(ku = Sn(n, r)),
				(pd = !1),
				(Mu = mr = bd = Ha = Wi = $t = 0),
				(Wn = Pl = null),
				(_d = !1),
				(r & 8) !== 0 && (r |= r & 32));
			var l = n.entangledLanes;
			if (l !== 0)
				for (n = n.entanglements, l &= r; 0 < l; ) {
					var c = 31 - ct(l),
						d = 1 << c;
					((r |= n[c]), (l &= ~d));
				}
			return ((_i = r), Vs(), a);
		}
		function my(n, r) {
			((qe = null),
				(B.H = Ll),
				r === Su || r === Fs
					? ((r = zv()), (ft = 3))
					: r === Cf
						? ((r = zv()), (ft = 4))
						: (ft = r === nd ? 8 : r !== null && typeof r == "object" && typeof r.then == "function" ? 6 : 1),
				(hr = r),
				He === null && (($t = 1), co(n, Rr(r, n.current))));
		}
		function vy() {
			var n = fr.current;
			return n === null
				? !0
				: (Ye & 4194048) === Ye
					? Nr === null
					: (Ye & 62914560) === Ye || (Ye & 536870912) !== 0
						? n === Nr
						: !1;
		}
		function gy() {
			var n = B.H;
			return ((B.H = Ll), n === null ? Ll : n);
		}
		function yy() {
			var n = B.A;
			return ((B.A = Ow), n);
		}
		function Eo() {
			(($t = 4),
				Ji || ((Ye & 4194048) !== Ye && fr.current !== null) || (ku = !0),
				((Wi & 134217727) === 0 && (Ha & 134217727) === 0) || wt === null || na(wt, Ye, mr, !1));
		}
		function xd(n, r, a) {
			var l = st;
			st |= 2;
			var c = gy(),
				d = yy();
			((wt !== n || Ye !== r) && ((So = null), Ou(n, r)), (r = !1));
			var y = $t;
			e: do
				try {
					if (ft !== 0 && He !== null) {
						var T = He,
							z = hr;
						switch (ft) {
							case 8:
								(Td(), (y = 6));
								break e;
							case 3:
							case 2:
							case 9:
							case 6:
								fr.current === null && (r = !0);
								var X = ft;
								if (((ft = 0), (hr = null), zu(n, T, z, X), a && ku)) {
									y = 0;
									break e;
								}
								break;
							default:
								((X = ft), (ft = 0), (hr = null), zu(n, T, z, X));
						}
					}
					(jw(), (y = $t));
					break;
				} catch (ne) {
					my(n, ne);
				}
			while (!0);
			return (
				r && n.shellSuspendCounter++,
				(ci = Oa = null),
				(st = l),
				(B.H = c),
				(B.A = d),
				He === null && ((wt = null), (Ye = 0), Vs()),
				y
			);
		}
		function jw() {
			for (; He !== null; ) py(He);
		}
		function Iw(n, r) {
			var a = st;
			st |= 2;
			var l = gy(),
				c = yy();
			wt !== n || Ye !== r ? ((So = null), (_o = Ne() + 500), Ou(n, r)) : (ku = Sn(n, r));
			e: do
				try {
					if (ft !== 0 && He !== null) {
						r = He;
						var d = hr;
						t: switch (ft) {
							case 1:
								((ft = 0), (hr = null), zu(n, r, d, 1));
								break;
							case 2:
							case 9:
								if (Nv(d)) {
									((ft = 0), (hr = null), by(r));
									break;
								}
								((r = function () {
									((ft !== 2 && ft !== 9) || wt !== n || (ft = 7), wi(n));
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
								Nv(d) ? ((ft = 0), (hr = null), by(r)) : ((ft = 0), (hr = null), zu(n, r, d, 7));
								break;
							case 5:
								var y = null;
								switch (He.tag) {
									case 26:
										y = He.memoizedState;
									case 5:
									case 27:
										var T = He;
										if (y ? ap(y) : T.stateNode.complete) {
											((ft = 0), (hr = null));
											var z = T.sibling;
											if (z !== null) He = z;
											else {
												var X = T.return;
												X !== null ? ((He = X), To(X)) : (He = null);
											}
											break t;
										}
								}
								((ft = 0), (hr = null), zu(n, r, d, 5));
								break;
							case 6:
								((ft = 0), (hr = null), zu(n, r, d, 6));
								break;
							case 8:
								(Td(), ($t = 6));
								break e;
							default:
								throw Error(s(462));
						}
					}
					Lw();
					break;
				} catch (ne) {
					my(n, ne);
				}
			while (!0);
			return ((ci = Oa = null), (B.H = l), (B.A = c), (st = a), He !== null ? 0 : ((wt = null), (Ye = 0), Vs(), $t));
		}
		function Lw() {
			for (; He !== null && !ze(); ) py(He);
		}
		function py(n) {
			var r = Vg(n.alternate, n, _i);
			((n.memoizedProps = n.pendingProps), r === null ? To(n) : (He = r));
		}
		function by(n) {
			var r = n,
				a = r.alternate;
			switch (r.tag) {
				case 15:
				case 0:
					r = Ig(a, r, r.pendingProps, r.type, void 0, Ye);
					break;
				case 11:
					r = Ig(a, r, r.pendingProps, r.type.render, r.ref, Ye);
					break;
				case 5:
					$f(r);
				default:
					(Zg(a, r), (r = He = _v(r, _i)), (r = Vg(a, r, _i)));
			}
			((n.memoizedProps = n.pendingProps), r === null ? To(n) : (He = r));
		}
		function zu(n, r, a, l) {
			((ci = Oa = null), $f(r), (wu = null), (kl = 0));
			var c = r.return;
			try {
				if (xw(n, c, r, a, Ye)) {
					(($t = 1), co(n, Rr(a, n.current)), (He = null));
					return;
				}
			} catch (d) {
				if (c !== null) throw ((He = c), d);
				(($t = 1), co(n, Rr(a, n.current)), (He = null));
				return;
			}
			r.flags & 32768
				? (Je || l === 1
						? (n = !0)
						: ku || (Ye & 536870912) !== 0
							? (n = !1)
							: ((Ji = n = !0),
								(l === 2 || l === 9 || l === 3 || l === 6) &&
									((l = fr.current), l !== null && l.tag === 13 && (l.flags |= 16384))),
					_y(r, n))
				: To(r);
		}
		function To(n) {
			var r = n;
			do {
				if ((r.flags & 32768) !== 0) {
					_y(r, Ji);
					return;
				}
				n = r.return;
				var a = Cw(r.alternate, r, _i);
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
		function _y(n, r) {
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
		function Sy(n, r, a, l, c, d, y, T, z) {
			n.cancelPendingCommit = null;
			do xo();
			while (gn !== 0);
			if ((st & 6) !== 0) throw Error(s(327));
			if (r !== null) {
				if (r === n.current) throw Error(s(177));
				if (
					((d = r.lanes | r.childLanes),
					(d |= hf),
					wr(n, a, d, y, T, z),
					n === wt && ((He = wt = null), (Ye = 0)),
					(Nu = r),
					(ta = n),
					(Si = a),
					(Sd = d),
					(wd = c),
					(cy = l),
					(r.subtreeFlags & 10256) !== 0 || (r.flags & 10256) !== 0
						? ((n.callbackNode = null),
							(n.callbackPriority = 0),
							Bw(Vt, function () {
								return (Ay(), null);
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
				((gn = 1), wy(), Ey(), Ty());
			}
		}
		function wy() {
			if (gn === 1) {
				gn = 0;
				var n = ta,
					r = Nu,
					a = (r.flags & 13878) !== 0;
				if ((r.subtreeFlags & 13878) !== 0 || a) {
					((a = B.T), (B.T = null));
					var l = P.p;
					P.p = 2;
					var c = st;
					st |= 4;
					try {
						ny(r, n);
						var d = Id,
							y = fv(n.containerInfo),
							T = d.focusedElem,
							z = d.selectionRange;
						if (y !== T && T && T.ownerDocument && cv(T.ownerDocument.documentElement, T)) {
							if (z !== null && sf(T)) {
								var X = z.start,
									ne = z.end;
								if ((ne === void 0 && (ne = X), "selectionStart" in T))
									((T.selectionStart = X), (T.selectionEnd = Math.min(ne, T.value.length)));
								else {
									var ue = T.ownerDocument || document,
										W = (ue && ue.defaultView) || window;
									if (W.getSelection) {
										var ee = W.getSelection(),
											_e = T.textContent.length,
											ke = Math.min(z.start, _e),
											gt = z.end === void 0 ? ke : Math.min(z.end, _e);
										!ee.extend && ke > gt && ((y = gt), (gt = ke), (ke = y));
										var Z = ov(T, ke),
											U = ov(T, gt);
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
							for (ue = [], ee = T; (ee = ee.parentNode); )
								ee.nodeType === 1 && ue.push({ element: ee, left: ee.scrollLeft, top: ee.scrollTop });
							for (typeof T.focus == "function" && T.focus(), T = 0; T < ue.length; T++) {
								var ie = ue[T];
								((ie.element.scrollLeft = ie.left), (ie.element.scrollTop = ie.top));
							}
						}
						((Lo = !!jd), (Id = jd = null));
					} finally {
						((st = c), (P.p = l), (B.T = a));
					}
				}
				((n.current = r), (gn = 2));
			}
		}
		function Ey() {
			if (gn === 2) {
				gn = 0;
				var n = ta,
					r = Nu,
					a = (r.flags & 8772) !== 0;
				if ((r.subtreeFlags & 8772) !== 0 || a) {
					((a = B.T), (B.T = null));
					var l = P.p;
					P.p = 2;
					var c = st;
					st |= 4;
					try {
						Xg(n, r.alternate, r);
					} finally {
						((st = c), (P.p = l), (B.T = a));
					}
				}
				gn = 3;
			}
		}
		function Ty() {
			if (gn === 4 || gn === 3) {
				((gn = 0), rt());
				var n = ta,
					r = Nu,
					a = Si,
					l = cy;
				(r.subtreeFlags & 10256) !== 0 || (r.flags & 10256) !== 0
					? (gn = 5)
					: ((gn = 0), (Nu = ta = null), xy(n, n.pendingLanes));
				var c = n.pendingLanes;
				if ((c === 0 && (ea = null), nn(a), (r = r.stateNode), _t && typeof _t.onCommitFiberRoot == "function"))
					try {
						_t.onCommitFiberRoot(kn, r, void 0, (r.current.flags & 128) === 128);
					} catch {}
				if (l !== null) {
					((r = B.T), (c = P.p), (P.p = 2), (B.T = null));
					try {
						for (var d = n.onRecoverableError, y = 0; y < l.length; y++) {
							var T = l[y];
							d(T.value, { componentStack: T.stack });
						}
					} finally {
						((B.T = r), (P.p = c));
					}
				}
				((Si & 3) !== 0 && xo(),
					wi(n),
					(c = n.pendingLanes),
					(a & 261930) !== 0 && (c & 42) !== 0 ? (n === Ed ? Ql++ : ((Ql = 0), (Ed = n))) : (Ql = 0),
					Kl(0, !1));
			}
		}
		function xy(n, r) {
			(n.pooledCacheLanes &= r) === 0 && ((r = n.pooledCache), r != null && ((n.pooledCache = null), Rl(r)));
		}
		function xo() {
			return (wy(), Ey(), Ty(), Ay());
		}
		function Ay() {
			if (gn !== 5) return !1;
			var n = ta,
				r = Sd;
			Sd = 0;
			var a = nn(Si),
				l = B.T,
				c = P.p;
			try {
				((P.p = 32 > a ? 32 : a), (B.T = null), (a = wd), (wd = null));
				var d = ta,
					y = Si;
				if (((gn = 0), (Nu = ta = null), (Si = 0), (st & 6) !== 0)) throw Error(s(331));
				var T = st;
				if (
					((st |= 4),
					ly(d.current),
					iy(d, d.current, y, a),
					(st = T),
					Kl(0, !1),
					_t && typeof _t.onPostCommitFiberRoot == "function")
				)
					try {
						_t.onPostCommitFiberRoot(kn, d);
					} catch {}
				return !0;
			} finally {
				((P.p = c), (B.T = l), xy(n, r));
			}
		}
		function Ry(n, r, a) {
			((r = Rr(a, r)), (r = td(n.stateNode, r, 2)), (n = Ua(n, r, 2)), n !== null && (In(n, 2), wi(n)));
		}
		function dt(n, r, a) {
			if (n.tag === 3) Ry(n, n, a);
			else
				for (; r !== null; ) {
					if (r.tag === 3) {
						Ry(r, n, a);
						break;
					} else if (r.tag === 1) {
						var l = r.stateNode;
						if (
							typeof r.type.getDerivedStateFromError == "function" ||
							(typeof l.componentDidCatch == "function" && (ea === null || !ea.has(l)))
						) {
							((n = Rr(a, n)), (a = Cg(2)), (l = Ua(r, a, 2)), l !== null && (kg(a, l, r, n), In(l, 2), wi(l)));
							break;
						}
					}
					r = r.return;
				}
		}
		function Ad(n, r, a) {
			var l = n.pingCache;
			if (l === null) {
				l = n.pingCache = new zw();
				var c = new Set();
				l.set(r, c);
			} else ((c = l.get(r)), c === void 0 && ((c = new Set()), l.set(r, c)));
			c.has(a) || ((pd = !0), c.add(a), (n = qw.bind(null, n, r, a)), r.then(n, n));
		}
		function qw(n, r, a) {
			var l = n.pingCache;
			(l !== null && l.delete(r),
				(n.pingedLanes |= n.suspendedLanes & a),
				(n.warmLanes &= ~a),
				wt === n &&
					(Ye & a) === a &&
					($t === 4 || ($t === 3 && (Ye & 62914560) === Ye && 300 > Ne() - bo) ? (st & 2) === 0 && Ou(n, 0) : (bd |= a),
					Mu === Ye && (Mu = 0)),
				wi(n));
		}
		function Cy(n, r) {
			(r === 0 && (r = lr()), (n = ka(n, r)), n !== null && (In(n, r), wi(n)));
		}
		function Uw(n) {
			var r = n.memoizedState,
				a = 0;
			(r !== null && (a = r.retryLane), Cy(n, a));
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
			(l !== null && l.delete(r), Cy(n, a));
		}
		function Bw(n, r) {
			return et(n, r);
		}
		var Ao = null,
			Du = null,
			Rd = !1,
			Ro = !1,
			Cd = !1,
			ra = 0;
		function wi(n) {
			(n !== Du && n.next === null && (Du === null ? (Ao = Du = n) : (Du = Du.next = n)),
				(Ro = !0),
				Rd || ((Rd = !0), Hw()));
		}
		function Kl(n, r) {
			if (!Cd && Ro) {
				Cd = !0;
				do
					for (var a = !1, l = Ao; l !== null; ) {
						if (!r)
							if (n !== 0) {
								var c = l.pendingLanes;
								if (c === 0) var d = 0;
								else {
									var y = l.suspendedLanes,
										T = l.pingedLanes;
									((d = (1 << (31 - ct(42 | n) + 1)) - 1),
										(d &= c & ~(y & ~T)),
										(d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0));
								}
								d !== 0 && ((a = !0), Oy(l, d));
							} else
								((d = Ye),
									(d = ur(l, l === wt ? d : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1)),
									(d & 3) === 0 || Sn(l, d) || ((a = !0), Oy(l, d)));
						l = l.next;
					}
				while (a);
				Cd = !1;
			}
		}
		function Vw() {
			ky();
		}
		function ky() {
			Ro = Rd = !1;
			var n = 0;
			ra !== 0 && Xw() && (n = ra);
			for (var r = Ne(), a = null, l = Ao; l !== null; ) {
				var c = l.next,
					d = My(l, r);
				(d === 0
					? ((l.next = null), a === null ? (Ao = c) : (a.next = c), c === null && (Du = a))
					: ((a = l), (n !== 0 || (d & 3) !== 0) && (Ro = !0)),
					(l = c));
			}
			((gn !== 0 && gn !== 5) || Kl(n, !1), ra !== 0 && (ra = 0));
		}
		function My(n, r) {
			for (
				var a = n.suspendedLanes, l = n.pingedLanes, c = n.expirationTimes, d = n.pendingLanes & -62914561;
				0 < d;
			) {
				var y = 31 - ct(d),
					T = 1 << y,
					z = c[y];
				(z === -1 ? ((T & a) === 0 || (T & l) !== 0) && (c[y] = Sr(T, r)) : z <= r && (n.expiredLanes |= T), (d &= ~T));
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
						a = Gr;
						break;
					default:
						a = Vt;
				}
				return ((l = Ny.bind(null, n)), (a = et(a, l)), (n.callbackPriority = r), (n.callbackNode = a), r);
			}
			return (l !== null && l !== null && ce(l), (n.callbackPriority = 2), (n.callbackNode = null), 2);
		}
		function Ny(n, r) {
			if (gn !== 0 && gn !== 5) return ((n.callbackNode = null), (n.callbackPriority = 0), null);
			var a = n.callbackNode;
			if (xo() && n.callbackNode !== a) return null;
			var l = Ye;
			return (
				(l = ur(n, n === wt ? l : 0, n.cancelPendingCommit !== null || n.timeoutHandle !== -1)),
				l === 0
					? null
					: (dy(n, l, r), My(n, Ne()), n.callbackNode != null && n.callbackNode === a ? Ny.bind(null, n) : null)
			);
		}
		function Oy(n, r) {
			if (xo()) return null;
			dy(n, r, !0);
		}
		function Hw() {
			Ww(function () {
				(st & 6) !== 0 ? et(pn, Vw) : ky();
			});
		}
		function kd() {
			if (ra === 0) {
				var n = bu;
				(n === 0 && ((n = Ht), (Ht <<= 1), (Ht & 261888) === 0 && (Ht = 256)), (ra = n));
			}
			return ra;
		}
		function zy(n) {
			return n == null || typeof n == "symbol" || typeof n == "boolean"
				? null
				: typeof n == "function"
					? n
					: xa("" + n);
		}
		function Dy(n, r) {
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
				var d = zy((c[rn] || null).action),
					y = l.submitter;
				y &&
					((r = (r = y[rn] || null) ? zy(r.formAction) : y.getAttribute("formAction")),
					r !== null && ((d = r), (y = null)));
				var T = new lt("action", "action", null, l, c);
				n.push({
					event: T,
					listeners: [
						{
							instance: null,
							listener: function () {
								if (l.defaultPrevented) {
									if (ra !== 0) {
										var z = y ? Dy(c, y) : new FormData(c);
										Gf(a, { pending: !0, data: z, method: c.method, action: d }, null, z);
									}
								} else
									typeof d == "function" &&
										(T.preventDefault(),
										(z = y ? Dy(c, y) : new FormData(c)),
										Gf(a, { pending: !0, data: z, method: c.method, action: d }, d, z));
							},
							currentTarget: c,
						},
					],
				});
			}
		}
		for (var Md = 0; Md < df.length; Md++) {
			var Nd = df[Md];
			Zr(Nd.toLowerCase(), "on" + (Nd[0].toUpperCase() + Nd.slice(1)));
		}
		(Zr(mv, "onAnimationEnd"),
			Zr(vv, "onAnimationIteration"),
			Zr(gv, "onAnimationStart"),
			Zr("dblclick", "onDoubleClick"),
			Zr("focusin", "onFocus"),
			Zr("focusout", "onBlur"),
			Zr(aw, "onTransitionRun"),
			Zr(uw, "onTransitionStart"),
			Zr(lw, "onTransitionCancel"),
			Zr(yv, "onTransitionEnd"),
			Te("onMouseEnter", ["mouseout", "mouseover"]),
			Te("onMouseLeave", ["mouseout", "mouseover"]),
			Te("onPointerEnter", ["pointerout", "pointerover"]),
			Te("onPointerLeave", ["pointerout", "pointerover"]),
			me("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
			me("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
			me("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
			me("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
			me("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
			me("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" ")));
		var Yl =
				"abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
					" ",
				),
			Pw = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Yl));
		function jy(n, r) {
			r = (r & 4) !== 0;
			for (var a = 0; a < n.length; a++) {
				var l = n[a],
					c = l.event;
				l = l.listeners;
				e: {
					var d = void 0;
					if (r)
						for (var y = l.length - 1; 0 <= y; y--) {
							var T = l[y],
								z = T.instance,
								X = T.currentTarget;
							if (((T = T.listener), z !== d && c.isPropagationStopped())) break e;
							((d = T), (c.currentTarget = X));
							try {
								d(c);
							} catch (ne) {
								Bs(ne);
							}
							((c.currentTarget = null), (d = z));
						}
					else
						for (y = 0; y < l.length; y++) {
							if (
								((T = l[y]),
								(z = T.instance),
								(X = T.currentTarget),
								(T = T.listener),
								z !== d && c.isPropagationStopped())
							)
								break e;
							((d = T), (c.currentTarget = X));
							try {
								d(c);
							} catch (ne) {
								Bs(ne);
							}
							((c.currentTarget = null), (d = z));
						}
				}
			}
		}
		function Ze(n, r) {
			var a = r[Ur];
			a === void 0 && (a = r[Ur] = new Set());
			var l = n + "__bubble";
			a.has(l) || (Ly(r, n, 2, !1), a.add(l));
		}
		function Od(n, r, a) {
			var l = 0;
			(r && (l |= 4), Ly(a, n, l, r));
		}
		var Co = "_reactListening" + Math.random().toString(36).slice(2);
		function Iy(n) {
			if (!n[Co]) {
				((n[Co] = !0),
					Ta.forEach(function (a) {
						a !== "selectionchange" && (Pw.has(a) || Od(a, !1, n), Od(a, !0, n));
					}));
				var r = n.nodeType === 9 ? n : n.ownerDocument;
				r === null || r[Co] || ((r[Co] = !0), Od("selectionchange", !1, r));
			}
		}
		function Ly(n, r, a, l) {
			switch (cp(r)) {
				case 2:
					var c = S1;
					break;
				case 8:
					c = w1;
					break;
				default:
					c = Kd;
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
		function zd(n, r, a, l, c) {
			var d = l;
			if ((r & 1) === 0 && (r & 2) === 0 && l !== null)
				e: for (;;) {
					if (l === null) return;
					var y = l.tag;
					if (y === 3 || y === 4) {
						var T = l.stateNode.containerInfo;
						if (T === c) break;
						if (y === 4)
							for (y = l.return; y !== null; ) {
								var z = y.tag;
								if ((z === 3 || z === 4) && y.stateNode.containerInfo === c) return;
								y = y.return;
							}
						for (; T !== null; ) {
							if (((y = Kt(T)), y === null)) return;
							if (((z = y.tag), z === 5 || z === 6 || z === 26 || z === 27)) {
								l = d = y;
								continue e;
							}
							T = T.parentNode;
						}
					}
					l = l.return;
				}
			su(function () {
				var X = d,
					ne = $n(a),
					ue = [];
				e: {
					var W = pv.get(n);
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
								((_e = "focus"), (ee = nf));
								break;
							case "focusout":
								((_e = "blur"), (ee = nf));
								break;
							case "beforeblur":
							case "afterblur":
								ee = nf;
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
								ee = Km;
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
							case mv:
							case vv:
							case gv:
								ee = IS;
								break;
							case yv:
								ee = ZS;
								break;
							case "scroll":
							case "scrollend":
								ee = yl;
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
								ee = Gm;
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
									((ie = Hi(U, Z)), ie != null && ke.push(Gl(U, ie, G))),
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
							W && a !== vl && (_e = a.relatedTarget || a.fromElement) && (Kt(_e) || _e[Er]))
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
								((ke = Km),
								(ie = "onMouseLeave"),
								(Z = "onMouseEnter"),
								(U = "mouse"),
								(n === "pointerout" || n === "pointerover") &&
									((ke = Gm), (ie = "onPointerLeave"), (Z = "onPointerEnter"), (U = "pointer")),
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
							(ee !== null && qy(ue, W, ee, ke, !1), _e !== null && gt !== null && qy(ue, gt, _e, ke, !0));
						}
					}
					e: {
						if (
							((W = X ? Nn(X) : window),
							(ee = W.nodeName && W.nodeName.toLowerCase()),
							ee === "select" || (ee === "input" && W.type === "file"))
						)
							var it = rv;
						else if (tv(W))
							if (iv) it = nw;
							else {
								it = ew;
								var we = WS;
							}
						else
							((ee = W.nodeName),
								!ee || ee.toLowerCase() !== "input" || (W.type !== "checkbox" && W.type !== "radio")
									? X && ml(X.elementType) && (it = rv)
									: (it = tw));
						if (it && (it = it(n, X))) {
							nv(ue, it, a, ne);
							break e;
						}
						(we && we(n, W, X),
							n === "focusout" &&
								X &&
								W.type === "number" &&
								X.memoizedProps.value != null &&
								fl(W, "number", W.value));
					}
					switch (((we = X ? Nn(X) : window), n)) {
						case "focusin":
							(tv(we) || we.contentEditable === "true") && ((fu = we), (of = X), (Tl = null));
							break;
						case "focusout":
							Tl = of = fu = null;
							break;
						case "mousedown":
							cf = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							((cf = !1), dv(ue, a, ne));
							break;
						case "selectionchange":
							if (iw) break;
						case "keydown":
						case "keyup":
							dv(ue, a, ne);
					}
					var Ue;
					if (af)
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
						cu
							? Wm(n, a) && (Ge = "onCompositionEnd")
							: n === "keydown" && a.keyCode === 229 && (Ge = "onCompositionStart");
					(Ge &&
						(Fm &&
							a.locale !== "ko" &&
							(cu || Ge !== "onCompositionStart"
								? Ge === "onCompositionEnd" && cu && (Ue = pe())
								: ((F = ne), (ge = "value" in F ? F.value : F.textContent), (cu = !0))),
						(we = ko(X, Ge)),
						0 < we.length &&
							((Ge = new Ym(Ge, n, null, a, ne)),
							ue.push({ event: Ge, listeners: we }),
							Ue ? (Ge.data = Ue) : ((Ue = ev(a)), Ue !== null && (Ge.data = Ue)))),
						(Ue = YS ? GS(n, a) : FS(n, a)) &&
							((Ge = ko(X, "onBeforeInput")),
							0 < Ge.length &&
								((we = new Ym("onBeforeInput", "beforeinput", null, a, ne)),
								ue.push({ event: we, listeners: Ge }),
								(we.data = Ue))),
						Zw(ue, n, X, a, ne));
				}
				jy(ue, r);
			});
		}
		function Gl(n, r, a) {
			return { instance: n, listener: r, currentTarget: a };
		}
		function ko(n, r) {
			for (var a = r + "Capture", l = []; n !== null; ) {
				var c = n,
					d = c.stateNode;
				if (
					((c = c.tag),
					(c !== 5 && c !== 26 && c !== 27) ||
						d === null ||
						((c = Hi(n, a)), c != null && l.unshift(Gl(n, c, d)), (c = Hi(n, r)), c != null && l.push(Gl(n, c, d))),
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
		function qy(n, r, a, l, c) {
			for (var d = r._reactName, y = []; a !== null && a !== l; ) {
				var T = a,
					z = T.alternate,
					X = T.stateNode;
				if (((T = T.tag), z !== null && z === l)) break;
				((T !== 5 && T !== 26 && T !== 27) ||
					X === null ||
					((z = X),
					c
						? ((X = Hi(a, d)), X != null && y.unshift(Gl(a, X, z)))
						: c || ((X = Hi(a, d)), X != null && y.push(Gl(a, X, z)))),
					(a = a.return));
			}
			y.length !== 0 && n.push({ event: r, listeners: y });
		}
		var Kw = /\r\n?/g,
			Yw = /\u0000|\uFFFD/g;
		function Uy(n) {
			return (typeof n == "string" ? n : "" + n)
				.replace(
					Kw,
					`
`,
				)
				.replace(Yw, "");
		}
		function $y(n, r) {
			return ((r = Uy(r)), Uy(n) === r);
		}
		function vt(n, r, a, l, c, d) {
			switch (a) {
				case "children":
					typeof l == "string"
						? r === "body" || (r === "textarea" && l === "") || Vr(n, l)
						: (typeof l == "number" || typeof l == "bigint") && r !== "body" && Vr(n, "" + l);
					break;
				case "className":
					$r(n, "class", l);
					break;
				case "tabIndex":
					$r(n, "tabindex", l);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					$r(n, a, l);
					break;
				case "style":
					hl(n, l, d);
					break;
				case "data":
					if (r !== "object") {
						$r(n, "data", l);
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
					((l = xa("" + l)), n.setAttribute(a, l));
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
					((l = xa("" + l)), n.setAttribute(a, l));
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
					((a = xa("" + l)), n.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a));
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
						((a = qs.get(a) || a), ht(n, a, l));
			}
		}
		function Dd(n, r, a, l, c, d) {
			switch (a) {
				case "style":
					hl(n, l, d);
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
					typeof l == "string" ? Vr(n, l) : (typeof l == "number" || typeof l == "bigint") && Vr(n, "" + l);
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
					var T = (d = y = c = null),
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
										T = ne;
										break;
									case "children":
									case "dangerouslySetInnerHTML":
										if (ne != null) throw Error(s(137, r));
										break;
									default:
										vt(n, r, l, ne, a, null);
								}
						}
					js(n, d, T, z, X, y, c, !1);
					return;
				case "select":
					(Ze("invalid", n), (l = y = d = null));
					for (c in a)
						if (a.hasOwnProperty(c) && ((T = a[c]), T != null))
							switch (c) {
								case "value":
									d = T;
									break;
								case "defaultValue":
									y = T;
									break;
								case "multiple":
									l = T;
								default:
									vt(n, r, c, T, a, null);
							}
					((r = d), (a = y), (n.multiple = !!l), r != null ? Br(n, !!l, r, !1) : a != null && Br(n, !!l, a, !0));
					return;
				case "textarea":
					(Ze("invalid", n), (d = c = l = null));
					for (y in a)
						if (a.hasOwnProperty(y) && ((T = a[y]), T != null))
							switch (y) {
								case "value":
									l = T;
									break;
								case "defaultValue":
									c = T;
									break;
								case "children":
									d = T;
									break;
								case "dangerouslySetInnerHTML":
									if (T != null) throw Error(s(91));
									break;
								default:
									vt(n, r, y, T, a, null);
							}
					dl(n, l, c, d);
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
					for (l = 0; l < Yl.length; l++) Ze(Yl[l], n);
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
					if (ml(r)) {
						for (ne in a) a.hasOwnProperty(ne) && ((l = a[ne]), l !== void 0 && Dd(n, r, ne, l, a, void 0));
						return;
					}
			}
			for (T in a) a.hasOwnProperty(T) && ((l = a[T]), l != null && vt(n, r, T, l, a, null));
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
						T = null,
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
									T = ee;
									break;
								case "children":
								case "dangerouslySetInnerHTML":
									if (ee != null) throw Error(s(137, r));
									break;
								default:
									ee !== ue && vt(n, r, W, ee, l, ue);
							}
					}
					cl(n, y, T, z, X, ne, d, c);
					return;
				case "select":
					ee = y = T = W = null;
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
									T = d;
									break;
								case "multiple":
									y = d;
								default:
									d !== z && vt(n, r, c, d, l, z);
							}
					((r = T),
						(a = y),
						(l = ee),
						W != null
							? Br(n, !!a, W, !1)
							: !!l != !!a && (r != null ? Br(n, !!a, r, !0) : Br(n, !!a, a ? [] : "", !1)));
					return;
				case "textarea":
					ee = W = null;
					for (T in a)
						if (((c = a[T]), a.hasOwnProperty(T) && c != null && !l.hasOwnProperty(T)))
							switch (T) {
								case "value":
									break;
								case "children":
									break;
								default:
									vt(n, r, T, null, l, c);
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
					if (ml(r)) {
						for (var gt in a)
							((W = a[gt]),
								a.hasOwnProperty(gt) && W !== void 0 && !l.hasOwnProperty(gt) && Dd(n, r, gt, void 0, l, W));
						for (ne in l)
							((W = l[ne]),
								(ee = a[ne]),
								!l.hasOwnProperty(ne) || W === ee || (W === void 0 && ee === void 0) || Dd(n, r, ne, W, l, ee));
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
		function By(n) {
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
						T = c.duration;
					if (d && T && By(y)) {
						for (y = 0, T = c.responseEnd, l += 1; l < a.length; l++) {
							var z = a[l],
								X = z.startTime;
							if (X > T) break;
							var ne = z.transferSize,
								ue = z.initiatorType;
							ne && By(ue) && ((z = z.responseEnd), (y += ne * (z < T ? 1 : (T - X) / (z - X))));
						}
						if ((--l, (r += (8 * (d + y)) / (c.duration / 1e3)), n++, 10 < n)) break;
					}
				}
				if (0 < n) return r / n / 1e6;
			}
			return navigator.connection && ((n = navigator.connection.downlink), typeof n == "number") ? n : 5;
		}
		var jd = null,
			Id = null;
		function Mo(n) {
			return n.nodeType === 9 ? n : n.ownerDocument;
		}
		function Vy(n) {
			switch (n) {
				case "http://www.w3.org/2000/svg":
					return 1;
				case "http://www.w3.org/1998/Math/MathML":
					return 2;
				default:
					return 0;
			}
		}
		function Hy(n, r) {
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
		function Ld(n, r) {
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
		var qd = null;
		function Xw() {
			var n = window.event;
			return n && n.type === "popstate" ? (n === qd ? !1 : ((qd = n), !0)) : ((qd = null), !1);
		}
		var Zy = typeof setTimeout == "function" ? setTimeout : void 0,
			Jw = typeof clearTimeout == "function" ? clearTimeout : void 0,
			Py = typeof Promise == "function" ? Promise : void 0,
			Ww =
				typeof queueMicrotask == "function"
					? queueMicrotask
					: typeof Py < "u"
						? function (n) {
								return Py.resolve(null).then(n).catch(e1);
							}
						: Zy;
		function e1(n) {
			setTimeout(function () {
				throw n;
			});
		}
		function ia(n) {
			return n === "head";
		}
		function Qy(n, r) {
			var a = r,
				l = 0;
			do {
				var c = a.nextSibling;
				if ((n.removeChild(a), c && c.nodeType === 8))
					if (((a = c.data), a === "/$" || a === "/&")) {
						if (l === 0) {
							(n.removeChild(c), qu(r));
							return;
						}
						l--;
					} else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&") l++;
					else if (a === "html") Fl(n.ownerDocument.documentElement);
					else if (a === "head") {
						((a = n.ownerDocument.head), Fl(a));
						for (var d = a.firstChild; d; ) {
							var y = d.nextSibling,
								T = d.nodeName;
							(d[Kn] ||
								T === "SCRIPT" ||
								T === "STYLE" ||
								(T === "LINK" && d.rel.toLowerCase() === "stylesheet") ||
								a.removeChild(d),
								(d = y));
						}
					} else a === "body" && Fl(n.ownerDocument.body);
				a = c;
			} while (a);
			qu(r);
		}
		function Ky(n, r) {
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
		function Ud(n) {
			var r = n.firstChild;
			for (r && r.nodeType === 10 && (r = r.nextSibling); r; ) {
				var a = r;
				switch (((r = r.nextSibling), a.nodeName)) {
					case "HTML":
					case "HEAD":
					case "BODY":
						(Ud(a), $i(a));
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
				if (((n = zr(n.nextSibling)), n === null)) break;
			}
			return null;
		}
		function n1(n, r, a) {
			if (r === "") return null;
			for (; n.nodeType !== 3; )
				if (
					((n.nodeType !== 1 || n.nodeName !== "INPUT" || n.type !== "hidden") && !a) ||
					((n = zr(n.nextSibling)), n === null)
				)
					return null;
			return n;
		}
		function Yy(n, r) {
			for (; n.nodeType !== 8; )
				if (
					((n.nodeType !== 1 || n.nodeName !== "INPUT" || n.type !== "hidden") && !r) ||
					((n = zr(n.nextSibling)), n === null)
				)
					return null;
			return n;
		}
		function $d(n) {
			return n.data === "$?" || n.data === "$~";
		}
		function Bd(n) {
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
		function zr(n) {
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
		var Vd = null;
		function Gy(n) {
			n = n.nextSibling;
			for (var r = 0; n; ) {
				if (n.nodeType === 8) {
					var a = n.data;
					if (a === "/$" || a === "/&") {
						if (r === 0) return zr(n.nextSibling);
						r--;
					} else (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") || r++;
				}
				n = n.nextSibling;
			}
			return null;
		}
		function Fy(n) {
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
		function Xy(n, r, a) {
			switch (((r = Mo(a)), n)) {
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
		function Fl(n) {
			for (var r = n.attributes; r.length; ) n.removeAttributeNode(r[0]);
			$i(n);
		}
		var Dr = new Map(),
			Jy = new Set();
		function No(n) {
			return typeof n.getRootNode == "function" ? n.getRootNode() : n.nodeType === 9 ? n : n.ownerDocument;
		}
		var Ei = P.d;
		P.d = { f: i1, r: a1, D: u1, C: l1, L: s1, m: o1, X: f1, S: c1, M: d1 };
		function i1() {
			var n = Ei.f(),
				r = wo();
			return n || r;
		}
		function a1(n) {
			var r = Yn(n);
			r !== null && r.tag === 5 && r.type === "form" ? yg(r) : Ei.r(n);
		}
		var ju = typeof document > "u" ? null : document;
		function Wy(n, r, a) {
			var l = ju;
			if (l && typeof r == "string" && r) {
				var c = wn(r);
				((c = 'link[rel="' + n + '"][href="' + c + '"]'),
					typeof a == "string" && (c += '[crossorigin="' + a + '"]'),
					Jy.has(c) ||
						(Jy.add(c),
						(n = { rel: n, crossOrigin: a, href: r }),
						l.querySelector(c) === null &&
							((r = l.createElement("link")), An(r, "link", n), Rt(r), l.head.appendChild(r))));
			}
		}
		function u1(n) {
			(Ei.D(n), Wy("dns-prefetch", n, null));
		}
		function l1(n, r) {
			(Ei.C(n, r), Wy("preconnect", n, r));
		}
		function s1(n, r, a) {
			Ei.L(n, r, a);
			var l = ju;
			if (l && n && r) {
				var c = 'link[rel="preload"][as="' + wn(r) + '"]';
				r === "image" && a && a.imageSrcSet
					? ((c += '[imagesrcset="' + wn(a.imageSrcSet) + '"]'),
						typeof a.imageSizes == "string" && (c += '[imagesizes="' + wn(a.imageSizes) + '"]'))
					: (c += '[href="' + wn(n) + '"]');
				var d = c;
				switch (r) {
					case "style":
						d = Iu(n);
						break;
					case "script":
						d = Lu(n);
				}
				Dr.has(d) ||
					((n = b({ rel: "preload", href: r === "image" && a && a.imageSrcSet ? void 0 : n, as: r }, a)),
					Dr.set(d, n),
					l.querySelector(c) !== null ||
						(r === "style" && l.querySelector(Xl(d))) ||
						(r === "script" && l.querySelector(Jl(d))) ||
						((r = l.createElement("link")), An(r, "link", n), Rt(r), l.head.appendChild(r)));
			}
		}
		function o1(n, r) {
			Ei.m(n, r);
			var a = ju;
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
						d = Lu(n);
				}
				if (!Dr.has(d) && ((n = b({ rel: "modulepreload", href: n }, r)), Dr.set(d, n), a.querySelector(c) === null)) {
					switch (l) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script":
							if (a.querySelector(Jl(d))) return;
					}
					((l = a.createElement("link")), An(l, "link", n), Rt(l), a.head.appendChild(l));
				}
			}
		}
		function c1(n, r, a) {
			Ei.S(n, r, a);
			var l = ju;
			if (l && n) {
				var c = sr(l).hoistableStyles,
					d = Iu(n);
				r = r || "default";
				var y = c.get(d);
				if (!y) {
					var T = { loading: 0, preload: null };
					if ((y = l.querySelector(Xl(d)))) T.loading = 5;
					else {
						((n = b({ rel: "stylesheet", href: n, "data-precedence": r }, a)), (a = Dr.get(d)) && Hd(n, a));
						var z = (y = l.createElement("link"));
						(Rt(z),
							An(z, "link", n),
							(z._p = new Promise(function (X, ne) {
								((z.onload = X), (z.onerror = ne));
							})),
							z.addEventListener("load", function () {
								T.loading |= 1;
							}),
							z.addEventListener("error", function () {
								T.loading |= 2;
							}),
							(T.loading |= 4),
							Oo(y, r, l));
					}
					((y = { type: "stylesheet", instance: y, count: 1, state: T }), c.set(d, y));
				}
			}
		}
		function f1(n, r) {
			Ei.X(n, r);
			var a = ju;
			if (a && n) {
				var l = sr(a).hoistableScripts,
					c = Lu(n),
					d = l.get(c);
				d ||
					((d = a.querySelector(Jl(c))),
					d ||
						((n = b({ src: n, async: !0 }, r)),
						(r = Dr.get(c)) && Zd(n, r),
						(d = a.createElement("script")),
						Rt(d),
						An(d, "link", n),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					l.set(c, d));
			}
		}
		function d1(n, r) {
			Ei.M(n, r);
			var a = ju;
			if (a && n) {
				var l = sr(a).hoistableScripts,
					c = Lu(n),
					d = l.get(c);
				d ||
					((d = a.querySelector(Jl(c))),
					d ||
						((n = b({ src: n, async: !0, type: "module" }, r)),
						(r = Dr.get(c)) && Zd(n, r),
						(d = a.createElement("script")),
						Rt(d),
						An(d, "link", n),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					l.set(c, d));
			}
		}
		function ep(n, r, a, l) {
			var c = (c = Se.current) ? No(c) : null;
			if (!c) throw Error(s(446));
			switch (n) {
				case "meta":
				case "title":
					return null;
				case "style":
					return typeof a.precedence == "string" && typeof a.href == "string"
						? ((r = Iu(a.href)),
							(a = sr(c).hoistableStyles),
							(l = a.get(r)),
							l || ((l = { type: "style", instance: null, count: 0, state: null }), a.set(r, l)),
							l)
						: { type: "void", instance: null, count: 0, state: null };
				case "link":
					if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
						n = Iu(a.href);
						var d = sr(c).hoistableStyles,
							y = d.get(n);
						if (
							(y ||
								((c = c.ownerDocument || c),
								(y = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }),
								d.set(n, y),
								(d = c.querySelector(Xl(n))) && !d._p && ((y.instance = d), (y.state.loading = 5)),
								Dr.has(n) ||
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
									Dr.set(n, a),
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
							? ((r = Lu(a)),
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
		function Iu(n) {
			return 'href="' + wn(n) + '"';
		}
		function Xl(n) {
			return 'link[rel="stylesheet"][' + n + "]";
		}
		function tp(n) {
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
		function Lu(n) {
			return '[src="' + wn(n) + '"]';
		}
		function Jl(n) {
			return "script[async]" + n;
		}
		function np(n, r, a) {
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
							Oo(l, a.precedence, n),
							(r.instance = l)
						);
					case "stylesheet":
						c = Iu(a.href);
						var d = n.querySelector(Xl(c));
						if (d) return ((r.state.loading |= 4), (r.instance = d), Rt(d), d);
						((l = tp(a)), (c = Dr.get(c)) && Hd(l, c), (d = (n.ownerDocument || n).createElement("link")), Rt(d));
						var y = d;
						return (
							(y._p = new Promise(function (T, z) {
								((y.onload = T), (y.onerror = z));
							})),
							An(d, "link", l),
							(r.state.loading |= 4),
							Oo(d, a.precedence, n),
							(r.instance = d)
						);
					case "script":
						return (
							(d = Lu(a.src)),
							(c = n.querySelector(Jl(d)))
								? ((r.instance = c), Rt(c), c)
								: ((l = a),
									(c = Dr.get(d)) && ((l = b({}, a)), Zd(l, c)),
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
					((l = r.instance), (r.state.loading |= 4), Oo(l, a.precedence, n));
			return r.instance;
		}
		function Oo(n, r, a) {
			for (
				var l = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
					c = l.length ? l[l.length - 1] : null,
					d = c,
					y = 0;
				y < l.length;
				y++
			) {
				var T = l[y];
				if (T.dataset.precedence === r) d = T;
				else if (d !== c) break;
			}
			d
				? d.parentNode.insertBefore(n, d.nextSibling)
				: ((r = a.nodeType === 9 ? a.head : a), r.insertBefore(n, r.firstChild));
		}
		function Hd(n, r) {
			((n.crossOrigin ??= r.crossOrigin), (n.referrerPolicy ??= r.referrerPolicy), (n.title ??= r.title));
		}
		function Zd(n, r) {
			((n.crossOrigin ??= r.crossOrigin), (n.referrerPolicy ??= r.referrerPolicy), (n.integrity ??= r.integrity));
		}
		var zo = null;
		function rp(n, r, a) {
			if (zo === null) {
				var l = new Map(),
					c = (zo = new Map());
				c.set(a, l);
			} else ((c = zo), (l = c.get(a)), l || ((l = new Map()), c.set(a, l)));
			if (l.has(n)) return l;
			for (l.set(n, null), a = a.getElementsByTagName(n), c = 0; c < a.length; c++) {
				var d = a[c];
				if (
					!(d[Kn] || d[Dt] || (n === "link" && d.getAttribute("rel") === "stylesheet")) &&
					d.namespaceURI !== "http://www.w3.org/2000/svg"
				) {
					var y = d.getAttribute(r) || "";
					y = n + y;
					var T = l.get(y);
					T ? T.push(d) : l.set(y, [d]);
				}
			}
			return l;
		}
		function ip(n, r, a) {
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
		function ap(n) {
			return !(n.type === "stylesheet" && (n.state.loading & 3) === 0);
		}
		function v1(n, r, a, l) {
			if (
				a.type === "stylesheet" &&
				(typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
				(a.state.loading & 4) === 0
			) {
				if (a.instance === null) {
					var c = Iu(l.href),
						d = r.querySelector(Xl(c));
					if (d) {
						((r = d._p),
							r !== null &&
								typeof r == "object" &&
								typeof r.then == "function" &&
								(n.count++, (n = Do.bind(n)), r.then(n, n)),
							(a.state.loading |= 4),
							(a.instance = d),
							Rt(d));
						return;
					}
					((d = r.ownerDocument || r), (l = tp(l)), (c = Dr.get(c)) && Hd(l, c), (d = d.createElement("link")), Rt(d));
					var y = d;
					((y._p = new Promise(function (T, z) {
						((y.onload = T), (y.onerror = z));
					})),
						An(d, "link", l),
						(a.instance = d));
				}
				(n.stylesheets === null && (n.stylesheets = new Map()),
					n.stylesheets.set(a, r),
					(r = a.state.preload) &&
						(a.state.loading & 3) === 0 &&
						(n.count++, (a = Do.bind(n)), r.addEventListener("load", a), r.addEventListener("error", a)));
			}
		}
		var Pd = 0;
		function g1(n, r) {
			return (
				n.stylesheets && n.count === 0 && Io(n, n.stylesheets),
				0 < n.count || 0 < n.imgCount
					? function (a) {
							var l = setTimeout(function () {
								if ((n.stylesheets && Io(n, n.stylesheets), n.unsuspend)) {
									var d = n.unsuspend;
									((n.unsuspend = null), d());
								}
							}, 6e4 + r);
							0 < n.imgBytes && Pd === 0 && (Pd = 62500 * Fw());
							var c = setTimeout(
								function () {
									if (
										((n.waitingForImages = !1), n.count === 0 && (n.stylesheets && Io(n, n.stylesheets), n.unsuspend))
									) {
										var d = n.unsuspend;
										((n.unsuspend = null), d());
									}
								},
								(n.imgBytes > Pd ? 50 : 800) + r,
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
		function Do() {
			if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
				if (this.stylesheets) Io(this, this.stylesheets);
				else if (this.unsuspend) {
					var n = this.unsuspend;
					((this.unsuspend = null), n());
				}
			}
		}
		var jo = null;
		function Io(n, r) {
			((n.stylesheets = null),
				n.unsuspend !== null && (n.count++, (jo = new Map()), r.forEach(y1, n), (jo = null), Do.call(n)));
		}
		function y1(n, r) {
			if (!(r.state.loading & 4)) {
				var a = jo.get(n);
				if (a) var l = a.get(null);
				else {
					((a = new Map()), jo.set(n, a));
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
					(l = Do.bind(this)),
					c.addEventListener("load", l),
					c.addEventListener("error", l),
					d
						? d.parentNode.insertBefore(c, d.nextSibling)
						: ((n = n.nodeType === 9 ? n.head : n), n.insertBefore(c, n.firstChild)),
					(r.state.loading |= 4));
			}
		}
		var Wl = { $$typeof: k, Provider: null, Consumer: null, _currentValue: ve, _currentValue2: ve, _threadCount: 0 };
		function p1(n, r, a, l, c, d, y, T, z) {
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
		function b1(n, r, a, l, c, d, y, T, z, X, ne, ue) {
			return (
				(n = new p1(n, r, a, y, z, X, ne, ue, T)),
				(r = 1),
				d === !0 && (r |= 24),
				(d = cr(3, null, null, r)),
				(n.current = d),
				(d.stateNode = n),
				(r = xf()),
				r.refCount++,
				(n.pooledCache = r),
				r.refCount++,
				(d.memoizedState = { element: l, isDehydrated: a, cache: r }),
				kf(d),
				n
			);
		}
		function _1(n) {
			return n ? ((n = mu), n) : mu;
		}
		function up(n, r, a, l, c, d) {
			((c = _1(c)),
				l.context === null ? (l.context = c) : (l.pendingContext = c),
				(l = qa(r)),
				(l.payload = { element: a }),
				(d = d === void 0 ? null : d),
				d !== null && (l.callback = d),
				(a = Ua(n, l, r)),
				a !== null && (er(a, n, r), Nl(a, n, r)));
		}
		function lp(n, r) {
			if (((n = n.memoizedState), n !== null && n.dehydrated !== null)) {
				var a = n.retryLane;
				n.retryLane = a !== 0 && a < r ? a : r;
			}
		}
		function Qd(n, r) {
			(lp(n, r), (n = n.alternate) && lp(n, r));
		}
		function sp(n) {
			if (n.tag === 13 || n.tag === 31) {
				var r = ka(n, 67108864);
				(r !== null && er(r, n, 67108864), Qd(n, 67108864));
			}
		}
		function op(n) {
			if (n.tag === 13 || n.tag === 31) {
				var r = Or();
				r = Ln(r);
				var a = ka(n, r);
				(a !== null && er(a, n, r), Qd(n, r));
			}
		}
		var Lo = !0;
		function S1(n, r, a, l) {
			var c = B.T;
			B.T = null;
			var d = P.p;
			try {
				((P.p = 2), Kd(n, r, a, l));
			} finally {
				((P.p = d), (B.T = c));
			}
		}
		function w1(n, r, a, l) {
			var c = B.T;
			B.T = null;
			var d = P.p;
			try {
				((P.p = 8), Kd(n, r, a, l));
			} finally {
				((P.p = d), (B.T = c));
			}
		}
		function Kd(n, r, a, l) {
			if (Lo) {
				var c = Yd(l);
				if (c === null) (zd(n, r, l, qo, a), fp(n, l));
				else if (T1(c, n, r, a, l)) l.stopPropagation();
				else if ((fp(n, l), r & 4 && -1 < E1.indexOf(n))) {
					for (; c !== null; ) {
						var d = Yn(c);
						if (d !== null)
							switch (d.tag) {
								case 3:
									if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
										var y = Mn(d.pendingLanes);
										if (y !== 0) {
											var T = d;
											for (T.pendingLanes |= 2, T.entangledLanes |= 2; y; ) {
												var z = 1 << (31 - ct(y));
												((T.entanglements[1] |= z), (y &= ~z));
											}
											(wi(d), (st & 6) === 0 && ((_o = Ne() + 500), Kl(0, !1)));
										}
									}
									break;
								case 31:
								case 13:
									((T = ka(d, 2)), T !== null && er(T, d, 2), wo(), Qd(d, 2));
							}
						if (((d = Yd(l)), d === null && zd(n, r, l, qo, a), d === c)) break;
						c = d;
					}
					c !== null && l.stopPropagation();
				} else zd(n, r, l, null, a);
			}
		}
		function Yd(n) {
			return ((n = $n(n)), Gd(n));
		}
		var qo = null;
		function Gd(n) {
			if (((qo = null), (n = Kt(n)), n !== null)) {
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
			return ((qo = n), null);
		}
		function cp(n) {
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
						case pr:
							return 32;
						case Gr:
							return 268435456;
						default:
							return 32;
					}
				default:
					return 32;
			}
		}
		var Fd = !1,
			aa = null,
			ua = null,
			la = null,
			es = new Map(),
			ts = new Map(),
			sa = [],
			E1 =
				"mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
					" ",
				);
		function fp(n, r) {
			switch (n) {
				case "focusin":
				case "focusout":
					aa = null;
					break;
				case "dragenter":
				case "dragleave":
					ua = null;
					break;
				case "mouseover":
				case "mouseout":
					la = null;
					break;
				case "pointerover":
				case "pointerout":
					es.delete(r.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture":
					ts.delete(r.pointerId);
			}
		}
		function ns(n, r, a, l, c, d) {
			return n === null || n.nativeEvent !== d
				? ((n = { blockedOn: r, domEventName: a, eventSystemFlags: l, nativeEvent: d, targetContainers: [c] }),
					r !== null && ((r = Yn(r)), r !== null && sp(r)),
					n)
				: ((n.eventSystemFlags |= l), (r = n.targetContainers), c !== null && r.indexOf(c) === -1 && r.push(c), n);
		}
		function T1(n, r, a, l, c) {
			switch (r) {
				case "focusin":
					return ((aa = ns(aa, n, r, a, l, c)), !0);
				case "dragenter":
					return ((ua = ns(ua, n, r, a, l, c)), !0);
				case "mouseover":
					return ((la = ns(la, n, r, a, l, c)), !0);
				case "pointerover":
					var d = c.pointerId;
					return (es.set(d, ns(es.get(d) || null, n, r, a, l, c)), !0);
				case "gotpointercapture":
					return ((d = c.pointerId), ts.set(d, ns(ts.get(d) || null, n, r, a, l, c)), !0);
			}
			return !1;
		}
		function dp(n) {
			var r = Kt(n.target);
			if (r !== null) {
				var a = f(r);
				if (a !== null) {
					if (((r = a.tag), r === 13)) {
						if (((r = h(a)), r !== null)) {
							((n.blockedOn = r),
								Ea(n.priority, function () {
									op(a);
								}));
							return;
						}
					} else if (r === 31) {
						if (((r = m(a)), r !== null)) {
							((n.blockedOn = r),
								Ea(n.priority, function () {
									op(a);
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
		function Uo(n) {
			if (n.blockedOn !== null) return !1;
			for (var r = n.targetContainers; 0 < r.length; ) {
				var a = Yd(n.nativeEvent);
				if (a === null) {
					a = n.nativeEvent;
					var l = new a.constructor(a.type, a);
					((vl = l), a.target.dispatchEvent(l), (vl = null));
				} else return ((r = Yn(a)), r !== null && sp(r), (n.blockedOn = a), !1);
				r.shift();
			}
			return !0;
		}
		function hp(n, r, a) {
			Uo(n) && a.delete(r);
		}
		function x1() {
			((Fd = !1),
				aa !== null && Uo(aa) && (aa = null),
				ua !== null && Uo(ua) && (ua = null),
				la !== null && Uo(la) && (la = null),
				es.forEach(hp),
				ts.forEach(hp));
		}
		function $o(n, r) {
			n.blockedOn === r &&
				((n.blockedOn = null), Fd || ((Fd = !0), t.unstable_scheduleCallback(t.unstable_NormalPriority, x1)));
		}
		var Bo = null;
		function mp(n) {
			Bo !== n &&
				((Bo = n),
				t.unstable_scheduleCallback(t.unstable_NormalPriority, function () {
					Bo === n && (Bo = null);
					for (var r = 0; r < n.length; r += 3) {
						var a = n[r],
							l = n[r + 1],
							c = n[r + 2];
						if (typeof l != "function") {
							if (Gd(l || a) === null) continue;
							break;
						}
						var d = Yn(a);
						d !== null &&
							(n.splice(r, 3), (r -= 3), Gf(d, { pending: !0, data: c, method: a.method, action: l }, l, c));
					}
				}));
		}
		function qu(n) {
			function r(z) {
				return $o(z, n);
			}
			(aa !== null && $o(aa, n), ua !== null && $o(ua, n), la !== null && $o(la, n), es.forEach(r), ts.forEach(r));
			for (var a = 0; a < sa.length; a++) {
				var l = sa[a];
				l.blockedOn === n && (l.blockedOn = null);
			}
			for (; 0 < sa.length && ((a = sa[0]), a.blockedOn === null); ) (dp(a), a.blockedOn === null && sa.shift());
			if (((a = (n.ownerDocument || n).$$reactFormReplay), a != null))
				for (l = 0; l < a.length; l += 3) {
					var c = a[l],
						d = a[l + 1],
						y = c[rn] || null;
					if (typeof d == "function") y || mp(a);
					else if (y) {
						var T = null;
						if (d && d.hasAttribute("formAction")) {
							if (((c = d), (y = d[rn] || null))) T = y.formAction;
							else if (Gd(c) !== null) continue;
						} else T = y.action;
						(typeof T == "function" ? (a[l + 1] = T) : (a.splice(l, 3), (l -= 3)), mp(a));
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
		function Xd(n) {
			this._internalRoot = n;
		}
		((Jd.prototype.render = Xd.prototype.render =
			function (n) {
				var r = this._internalRoot;
				if (r === null) throw Error(s(409));
				var a = r.current;
				up(a, Or(), n, r, null, null);
			}),
			(Jd.prototype.unmount = Xd.prototype.unmount =
				function () {
					var n = this._internalRoot;
					if (n !== null) {
						this._internalRoot = null;
						var r = n.containerInfo;
						(up(n.current, 2, null, n, null, null), wo(), (r[Er] = null));
					}
				}));
		function Jd(n) {
			this._internalRoot = n;
		}
		Jd.prototype.unstable_scheduleHydration = function (n) {
			if (n) {
				var r = qi();
				n = { blockedOn: null, target: n, priority: r };
				for (var a = 0; a < sa.length && r !== 0 && r < sa[a].priority; a++);
				(sa.splice(a, 0, n), a === 0 && dp(n));
			}
		};
		var vp = i.version;
		if (vp !== "19.2.8") throw Error(s(527, vp, "19.2.8"));
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
			var Vo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (!Vo.isDisabled && Vo.supportsFiber)
				try {
					((kn = Vo.inject(R1)), (_t = Vo));
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
				(n[Er] = r.current),
				Iy(n),
				new Xd(r)
			);
		};
	}),
	wT = Lr((e, t) => {
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
		(i(), (t.exports = ST()));
	}),
	Vp;
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
var Yu = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	},
	Ab = class extends Error {
		constructor(e) {
			(super(`Encountered unidirectional transform during encode: ${e}`), (this.name = "ZodEncodeError"));
		}
	};
(Vp = globalThis).__zod_globalConfig ?? (Vp.__zod_globalConfig = {});
var vc = globalThis.__zod_globalConfig;
function Oi(e) {
	return (e && Object.assign(vc, e), vc);
}
function Rb(e) {
	const t = Object.values(e).filter((i) => typeof i == "number");
	return Object.entries(e)
		.filter(([i, u]) => t.indexOf(+i) === -1)
		.map(([i, u]) => u);
}
function Dh(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function nm(e) {
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
function rm(e) {
	return e == null;
}
function im(e) {
	const t = e.startsWith("^") ? 1 : 0,
		i = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, i);
}
function ET(e, t) {
	const i = e / t,
		u = Math.round(i),
		s = Number.EPSILON * Math.max(Math.abs(i), 1);
	return Math.abs(i - u) < s ? 0 : i - u;
}
var Hp = Symbol("evaluating");
function yt(e, t, i) {
	let u;
	Object.defineProperty(e, t, {
		get() {
			if (u !== Hp) return (u === void 0 && ((u = Hp), (u = i())), u);
		},
		set(s) {
			Object.defineProperty(e, t, { value: s });
		},
		configurable: !0,
	});
}
function iu(e, t, i) {
	Object.defineProperty(e, t, { value: i, writable: !0, enumerable: !0, configurable: !0 });
}
function ba(...e) {
	const t = {};
	for (const i of e) {
		const u = Object.getOwnPropertyDescriptors(i);
		Object.assign(t, u);
	}
	return Object.defineProperties({}, t);
}
function Zp(e) {
	return JSON.stringify(e);
}
function TT(e) {
	return e
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}
var Cb = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function gc(e) {
	return typeof e == "object" && e !== null && !Array.isArray(e);
}
var xT = nm(() => {
	if (vc.jitless || (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))) return !1;
	try {
		return !1;
	} catch {
		return !1;
	}
});
function Wu(e) {
	if (gc(e) === !1) return !1;
	const t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	const i = t.prototype;
	return !(gc(i) === !1 || Object.prototype.hasOwnProperty.call(i, "isPrototypeOf") === !1);
}
function kb(e) {
	return Wu(e)
		? { ...e }
		: Array.isArray(e)
			? [...e]
			: e instanceof Map
				? new Map(e)
				: e instanceof Set
					? new Set(e)
					: e;
}
var AT = new Set(["string", "number", "symbol"]);
function el(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function _a(e, t, i) {
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
function RT(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
var CT = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
function kT(e, t) {
	const i = e._zod.def,
		u = i.checks;
	if (u && u.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	return _a(
		e,
		ba(e._zod.def, {
			get shape() {
				const s = {};
				for (const o in t) {
					if (!(o in i.shape)) throw new Error(`Unrecognized key: "${o}"`);
					t[o] && (s[o] = i.shape[o]);
				}
				return (iu(this, "shape", s), s);
			},
			checks: [],
		}),
	);
}
function MT(e, t) {
	const i = e._zod.def,
		u = i.checks;
	if (u && u.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	return _a(
		e,
		ba(e._zod.def, {
			get shape() {
				const s = { ...e._zod.def.shape };
				for (const o in t) {
					if (!(o in i.shape)) throw new Error(`Unrecognized key: "${o}"`);
					t[o] && delete s[o];
				}
				return (iu(this, "shape", s), s);
			},
			checks: [],
		}),
	);
}
function NT(e, t) {
	if (!Wu(t)) throw new Error("Invalid input to extend: expected a plain object");
	const i = e._zod.def.checks;
	if (i && i.length > 0) {
		const u = e._zod.def.shape;
		for (const s in t)
			if (Object.getOwnPropertyDescriptor(u, s) !== void 0)
				throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return _a(
		e,
		ba(e._zod.def, {
			get shape() {
				const u = { ...e._zod.def.shape, ...t };
				return (iu(this, "shape", u), u);
			},
		}),
	);
}
function OT(e, t) {
	if (!Wu(t)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return _a(
		e,
		ba(e._zod.def, {
			get shape() {
				const i = { ...e._zod.def.shape, ...t };
				return (iu(this, "shape", i), i);
			},
		}),
	);
}
function zT(e, t) {
	if (e._zod.def.checks?.length)
		throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return _a(
		e,
		ba(e._zod.def, {
			get shape() {
				const i = { ...e._zod.def.shape, ...t._zod.def.shape };
				return (iu(this, "shape", i), i);
			},
			get catchall() {
				return t._zod.def.catchall;
			},
			checks: t._zod.def.checks ?? [],
		}),
	);
}
function DT(e, t, i) {
	const u = t._zod.def.checks;
	if (u && u.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
	return _a(
		t,
		ba(t._zod.def, {
			get shape() {
				const s = t._zod.def.shape,
					o = { ...s };
				if (i)
					for (const f in i) {
						if (!(f in s)) throw new Error(`Unrecognized key: "${f}"`);
						i[f] && (o[f] = e ? new e({ type: "optional", innerType: s[f] }) : s[f]);
					}
				else for (const f in s) o[f] = e ? new e({ type: "optional", innerType: s[f] }) : s[f];
				return (iu(this, "shape", o), o);
			},
			checks: [],
		}),
	);
}
function jT(e, t, i) {
	return _a(
		t,
		ba(t._zod.def, {
			get shape() {
				const u = t._zod.def.shape,
					s = { ...u };
				if (i)
					for (const o in i) {
						if (!(o in s)) throw new Error(`Unrecognized key: "${o}"`);
						i[o] && (s[o] = new e({ type: "nonoptional", innerType: u[o] }));
					}
				else for (const o in u) s[o] = new e({ type: "nonoptional", innerType: u[o] });
				return (iu(this, "shape", s), s);
			},
		}),
	);
}
function Zu(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let i = t; i < e.issues.length; i++) if (e.issues[i]?.continue !== !0) return !0;
	return !1;
}
function IT(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let i = t; i < e.issues.length; i++) if (e.issues[i]?.continue === !1) return !0;
	return !1;
}
function Pu(e, t) {
	return t.map((i) => {
		var u;
		return ((u = i).path ?? (u.path = []), i.path.unshift(e), i);
	});
}
function Ko(e) {
	return typeof e == "string" ? e : e?.message;
}
function zi(e, t, i) {
	const u = e.message
			? e.message
			: (Ko(e.inst?._zod.def?.error?.(e)) ??
				Ko(t?.error?.(e)) ??
				Ko(i.customError?.(e)) ??
				Ko(i.localeError?.(e)) ??
				"Invalid input"),
		{ inst: s, continue: o, input: f, ...h } = e;
	return (h.path ?? (h.path = []), (h.message = u), t?.reportInput && (h.input = f), h);
}
function am(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function hs(...e) {
	const [t, i, u] = e;
	return typeof t == "string" ? { message: t, code: "custom", input: i, inst: u } : { ...t };
}
var Mb = (e, t) => {
		((e.name = "$ZodError"),
			Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
			Object.defineProperty(e, "issues", { value: t, enumerable: !1 }),
			(e.message = JSON.stringify(t, Dh, 2)),
			Object.defineProperty(e, "toString", { value: () => e.message, enumerable: !1 }));
	},
	Nb = re("$ZodError", Mb),
	Ob = re("$ZodError", Mb, { Parent: Error });
function LT(e, t = (i) => i.message) {
	const i = {},
		u = [];
	for (const s of e.issues)
		s.path.length > 0 ? ((i[s.path[0]] = i[s.path[0]] || []), i[s.path[0]].push(t(s))) : u.push(t(s));
	return { formErrors: u, fieldErrors: i };
}
function qT(e, t = (i) => i.message) {
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
var um = (e) => (t, i, u, s) => {
		const o = u ? { ...u, async: !1 } : { async: !1 },
			f = t._zod.run({ value: i, issues: [] }, o);
		if (f instanceof Promise) throw new Yu();
		if (f.issues.length) {
			const h = new (s?.Err ?? e)(f.issues.map((m) => zi(m, o, Oi())));
			throw (Cb(h, s?.callee), h);
		}
		return f.value;
	},
	lm = (e) => async (t, i, u, s) => {
		const o = u ? { ...u, async: !0 } : { async: !0 };
		let f = t._zod.run({ value: i, issues: [] }, o);
		if ((f instanceof Promise && (f = await f), f.issues.length)) {
			const h = new (s?.Err ?? e)(f.issues.map((m) => zi(m, o, Oi())));
			throw (Cb(h, s?.callee), h);
		}
		return f.value;
	},
	kc = (e) => (t, i, u) => {
		const s = u ? { ...u, async: !1 } : { async: !1 },
			o = t._zod.run({ value: i, issues: [] }, s);
		if (o instanceof Promise) throw new Yu();
		return o.issues.length
			? { success: !1, error: new (e ?? Nb)(o.issues.map((f) => zi(f, s, Oi()))) }
			: { success: !0, data: o.value };
	},
	UT = kc(Ob),
	Mc = (e) => async (t, i, u) => {
		const s = u ? { ...u, async: !0 } : { async: !0 };
		let o = t._zod.run({ value: i, issues: [] }, s);
		return (
			o instanceof Promise && (o = await o),
			o.issues.length
				? { success: !1, error: new e(o.issues.map((f) => zi(f, s, Oi()))) }
				: { success: !0, data: o.value }
		);
	},
	$T = Mc(Ob),
	BT = (e) => (t, i, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return um(e)(t, i, s);
	},
	VT = (e) => (t, i, u) => um(e)(t, i, u),
	HT = (e) => async (t, i, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return lm(e)(t, i, s);
	},
	ZT = (e) => async (t, i, u) => lm(e)(t, i, u),
	PT = (e) => (t, i, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return kc(e)(t, i, s);
	},
	QT = (e) => (t, i, u) => kc(e)(t, i, u),
	KT = (e) => async (t, i, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Mc(e)(t, i, s);
	},
	YT = (e) => async (t, i, u) => Mc(e)(t, i, u),
	GT = /^[cC][0-9a-z]{6,}$/,
	FT = /^[0-9a-z]+$/,
	XT = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
	JT = /^[0-9a-vA-V]{20}$/,
	WT = /^[A-Za-z0-9]{27}$/,
	ex = /^[a-zA-Z0-9_-]{21}$/,
	tx = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
	nx = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
	Pp = (e) =>
		e
			? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`)
			: /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
	rx = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
	ix = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function ax() {
	return new RegExp(ix, "u");
}
var ux =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	lx =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
	sx =
		/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
	ox =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	cx = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
	zb = /^[A-Za-z0-9_-]*$/,
	fx = /^https?$/,
	dx = /^\+[1-9]\d{6,14}$/,
	Db =
		"(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
	hx = new RegExp(`^${Db}$`);
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
function mx(e) {
	return new RegExp(`^${jb(e)}$`);
}
function vx(e) {
	const t = jb({ precision: e.precision }),
		i = ["Z"];
	(e.local && i.push(""), e.offset && i.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)"));
	const u = `${t}(?:${i.join("|")})`;
	return new RegExp(`^${Db}T(?:${u})$`);
}
var gx = (e) => {
		const t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
		return new RegExp(`^${t}$`);
	},
	yx = /^-?\d+$/,
	Ib = /^-?\d+(?:\.\d+)?$/,
	px = /^(?:true|false)$/i,
	bx = /^undefined$/i,
	_x = /^[^A-Z]*$/,
	Sx = /^[^a-z]*$/,
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
	wx = re("$ZodCheckMultipleOf", (e, t) => {
		(ir.init(e, t),
			e._zod.onattach.push((i) => {
				var u;
				(u = i._zod.bag).multipleOf ?? (u.multipleOf = t.value);
			}),
			(e._zod.check = (i) => {
				if (typeof i.value != typeof t.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				(typeof i.value == "bigint" ? i.value % t.value === BigInt(0) : ET(i.value, t.value) === 0) ||
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
	Ex = re("$ZodCheckNumberFormat", (e, t) => {
		(ir.init(e, t), (t.format = t.format || "float64"));
		const i = t.format?.includes("int"),
			u = i ? "int" : "number",
			[s, o] = CT[t.format];
		(e._zod.onattach.push((f) => {
			const h = f._zod.bag;
			((h.format = t.format), (h.minimum = s), (h.maximum = o), i && (h.pattern = yx));
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
	Tx = re("$ZodCheckMaxLength", (e, t) => {
		var i;
		(ir.init(e, t),
			(i = e._zod.def).when ??
				(i.when = (u) => {
					const s = u.value;
					return !rm(s) && s.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
				t.maximum < s && (u._zod.bag.maximum = t.maximum);
			}),
			(e._zod.check = (u) => {
				const s = u.value;
				if (s.length <= t.maximum) return;
				const o = am(s);
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
	xx = re("$ZodCheckMinLength", (e, t) => {
		var i;
		(ir.init(e, t),
			(i = e._zod.def).when ??
				(i.when = (u) => {
					const s = u.value;
					return !rm(s) && s.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
				t.minimum > s && (u._zod.bag.minimum = t.minimum);
			}),
			(e._zod.check = (u) => {
				const s = u.value;
				if (s.length >= t.minimum) return;
				const o = am(s);
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
	Ax = re("$ZodCheckLengthEquals", (e, t) => {
		var i;
		(ir.init(e, t),
			(i = e._zod.def).when ??
				(i.when = (u) => {
					const s = u.value;
					return !rm(s) && s.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag;
				((s.minimum = t.length), (s.maximum = t.length), (s.length = t.length));
			}),
			(e._zod.check = (u) => {
				const s = u.value,
					o = s.length;
				if (o === t.length) return;
				const f = am(s),
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
	Nc = re("$ZodCheckStringFormat", (e, t) => {
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
	Rx = re("$ZodCheckRegex", (e, t) => {
		(Nc.init(e, t),
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
	Cx = re("$ZodCheckLowerCase", (e, t) => {
		(t.pattern ?? (t.pattern = _x), Nc.init(e, t));
	}),
	kx = re("$ZodCheckUpperCase", (e, t) => {
		(t.pattern ?? (t.pattern = Sx), Nc.init(e, t));
	}),
	Mx = re("$ZodCheckIncludes", (e, t) => {
		ir.init(e, t);
		const i = el(t.includes),
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
	Nx = re("$ZodCheckStartsWith", (e, t) => {
		ir.init(e, t);
		const i = new RegExp(`^${el(t.prefix)}.*`);
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
	Ox = re("$ZodCheckEndsWith", (e, t) => {
		ir.init(e, t);
		const i = new RegExp(`.*${el(t.suffix)}$`);
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
	zx = re("$ZodCheckOverwrite", (e, t) => {
		(ir.init(e, t),
			(e._zod.check = (i) => {
				i.value = t.tx(i.value);
			}));
	}),
	Dx = class {
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
	jx = { major: 4, minor: 4, patch: 3 },
	Nt = re("$ZodType", (e, t) => {
		var i;
		(e ?? (e = {}), (e._zod.def = t), (e._zod.bag = e._zod.bag || {}), (e._zod.version = jx));
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
					let v = Zu(f),
						g;
					for (const S of h) {
						if (S._zod.def.when) {
							if (IT(f) || !S._zod.def.when(f)) continue;
						} else if (v) continue;
						const b = f.issues.length,
							p = S._zod.check(f);
						if (p instanceof Promise && m?.async === !1) throw new Yu();
						if (g || p instanceof Promise)
							g = (g ?? Promise.resolve()).then(async () => {
								(await p, f.issues.length !== b && (v || (v = Zu(f, b))));
							});
						else {
							if (f.issues.length === b) continue;
							v || (v = Zu(f, b));
						}
					}
					return g ? g.then(() => f) : f;
				},
				o = (f, h, m) => {
					if (Zu(f)) return ((f.aborted = !0), f);
					const v = s(h, u, m);
					if (v instanceof Promise) {
						if (m.async === !1) throw new Yu();
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
					if (h.async === !1) throw new Yu();
					return m.then((v) => s(v, u, h));
				}
				return s(m, u, h);
			};
		}
		yt(e, "~standard", () => ({
			validate: (s) => {
				try {
					const o = UT(e, s);
					return o.success ? { value: o.data } : { issues: o.error?.issues };
				} catch {
					return $T(e, s).then((f) => (f.success ? { value: f.data } : { issues: f.error?.issues }));
				}
			},
			vendor: "zod",
			version: 1,
		}));
	}),
	sm = re("$ZodString", (e, t) => {
		(Nt.init(e, t),
			(e._zod.pattern = [...(e?._zod.bag?.patterns ?? [])].pop() ?? gx(e._zod.bag)),
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
		(Nc.init(e, t), sm.init(e, t));
	}),
	Ix = re("$ZodGUID", (e, t) => {
		(t.pattern ?? (t.pattern = nx), Ot.init(e, t));
	}),
	Lx = re("$ZodUUID", (e, t) => {
		if (t.version) {
			const i = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[t.version];
			if (i === void 0) throw new Error(`Invalid UUID version: "${t.version}"`);
			t.pattern ?? (t.pattern = Pp(i));
		} else t.pattern ?? (t.pattern = Pp());
		Ot.init(e, t);
	}),
	qx = re("$ZodEmail", (e, t) => {
		(t.pattern ?? (t.pattern = rx), Ot.init(e, t));
	}),
	Ux = re("$ZodURL", (e, t) => {
		(Ot.init(e, t),
			(e._zod.check = (i) => {
				try {
					const u = i.value.trim();
					if (!t.normalize && t.protocol?.source === fx.source && !/^https?:\/\//i.test(u)) {
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
	$x = re("$ZodEmoji", (e, t) => {
		(t.pattern ?? (t.pattern = ax()), Ot.init(e, t));
	}),
	Bx = re("$ZodNanoID", (e, t) => {
		(t.pattern ?? (t.pattern = ex), Ot.init(e, t));
	}),
	Vx = re("$ZodCUID", (e, t) => {
		(t.pattern ?? (t.pattern = GT), Ot.init(e, t));
	}),
	Hx = re("$ZodCUID2", (e, t) => {
		(t.pattern ?? (t.pattern = FT), Ot.init(e, t));
	}),
	Zx = re("$ZodULID", (e, t) => {
		(t.pattern ?? (t.pattern = XT), Ot.init(e, t));
	}),
	Px = re("$ZodXID", (e, t) => {
		(t.pattern ?? (t.pattern = JT), Ot.init(e, t));
	}),
	Qx = re("$ZodKSUID", (e, t) => {
		(t.pattern ?? (t.pattern = WT), Ot.init(e, t));
	}),
	Kx = re("$ZodISODateTime", (e, t) => {
		(t.pattern ?? (t.pattern = vx(t)), Ot.init(e, t));
	}),
	Yx = re("$ZodISODate", (e, t) => {
		(t.pattern ?? (t.pattern = hx), Ot.init(e, t));
	}),
	Gx = re("$ZodISOTime", (e, t) => {
		(t.pattern ?? (t.pattern = mx(t)), Ot.init(e, t));
	}),
	Fx = re("$ZodISODuration", (e, t) => {
		(t.pattern ?? (t.pattern = tx), Ot.init(e, t));
	}),
	Xx = re("$ZodIPv4", (e, t) => {
		(t.pattern ?? (t.pattern = ux), Ot.init(e, t), (e._zod.bag.format = "ipv4"));
	}),
	Jx = re("$ZodIPv6", (e, t) => {
		(t.pattern ?? (t.pattern = lx),
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
	Wx = re("$ZodCIDRv4", (e, t) => {
		(t.pattern ?? (t.pattern = sx), Ot.init(e, t));
	}),
	eA = re("$ZodCIDRv6", (e, t) => {
		(t.pattern ?? (t.pattern = ox),
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
var tA = re("$ZodBase64", (e, t) => {
	(t.pattern ?? (t.pattern = cx),
		Ot.init(e, t),
		(e._zod.bag.contentEncoding = "base64"),
		(e._zod.check = (i) => {
			$b(i.value) ||
				i.issues.push({ code: "invalid_format", format: "base64", input: i.value, inst: e, continue: !t.abort });
		}));
});
function nA(e) {
	if (!zb.test(e)) return !1;
	const t = e.replace(/[-_]/g, (i) => (i === "-" ? "+" : "/"));
	return $b(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
var rA = re("$ZodBase64URL", (e, t) => {
		(t.pattern ?? (t.pattern = zb),
			Ot.init(e, t),
			(e._zod.bag.contentEncoding = "base64url"),
			(e._zod.check = (i) => {
				nA(i.value) ||
					i.issues.push({ code: "invalid_format", format: "base64url", input: i.value, inst: e, continue: !t.abort });
			}));
	}),
	iA = re("$ZodE164", (e, t) => {
		(t.pattern ?? (t.pattern = dx), Ot.init(e, t));
	});
function aA(e, t = null) {
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
var uA = re("$ZodJWT", (e, t) => {
		(Ot.init(e, t),
			(e._zod.check = (i) => {
				aA(i.value, t.alg) ||
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
	lA = re("$ZodNumberFormat", (e, t) => {
		(Ex.init(e, t), Bb.init(e, t));
	}),
	sA = re("$ZodBoolean", (e, t) => {
		(Nt.init(e, t),
			(e._zod.pattern = px),
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
	oA = re("$ZodUndefined", (e, t) => {
		(Nt.init(e, t),
			(e._zod.pattern = bx),
			(e._zod.values = new Set([void 0])),
			(e._zod.parse = (i, u) => {
				const s = i.value;
				return (typeof s > "u" || i.issues.push({ expected: "undefined", code: "invalid_type", input: s, inst: e }), i);
			}));
	}),
	cA = re("$ZodUnknown", (e, t) => {
		(Nt.init(e, t), (e._zod.parse = (i) => i));
	}),
	fA = re("$ZodNever", (e, t) => {
		(Nt.init(e, t),
			(e._zod.parse = (i, u) => (
				i.issues.push({ expected: "never", code: "invalid_type", input: i.value, inst: e }),
				i
			)));
	});
function Qp(e, t, i) {
	(e.issues.length && t.issues.push(...Pu(i, e.issues)), (t.value[i] = e.value));
}
var dA = re("$ZodArray", (e, t) => {
	(Nt.init(e, t),
		(e._zod.parse = (i, u) => {
			const s = i.value;
			if (!Array.isArray(s)) return (i.issues.push({ expected: "array", code: "invalid_type", input: s, inst: e }), i);
			i.value = Array(s.length);
			const o = [];
			for (let f = 0; f < s.length; f++) {
				const h = s[f],
					m = t.element._zod.run({ value: h, issues: [] }, u);
				m instanceof Promise ? o.push(m.then((v) => Qp(v, i, f))) : Qp(m, i, f);
			}
			return o.length ? Promise.all(o).then(() => i) : i;
		}));
});
function yc(e, t, i, u, s, o) {
	const f = i in u;
	if (e.issues.length) {
		if (s && o && !f) return;
		t.issues.push(...Pu(i, e.issues));
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
	const i = RT(e.shape);
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
		p instanceof Promise ? e.push(p.then((x) => yc(x, i, b, t, g, S))) : yc(p, i, b, t, g, S);
	}
	return (
		f.length && i.issues.push({ code: "unrecognized_keys", keys: f, input: t, inst: o }),
		e.length ? Promise.all(e).then(() => i) : i
	);
}
var hA = re("$ZodObject", (e, t) => {
		if ((Nt.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get)) {
			const f = t.shape;
			Object.defineProperty(t, "shape", {
				get: () => {
					const h = { ...f };
					return (Object.defineProperty(t, "shape", { value: h }), h);
				},
			});
		}
		const i = nm(() => Vb(t));
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
		const u = gc,
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
					x = b._zod.optout === "optional",
					A = b._zod.run({ value: m[S], issues: [] }, h);
				A instanceof Promise ? v.push(A.then((N) => yc(N, f, S, m, p, x))) : yc(A, f, S, m, p, x);
			}
			return s ? Hb(v, m, f, h, i.value, e) : v.length ? Promise.all(v).then(() => f) : f;
		};
	}),
	mA = re("$ZodObjectJIT", (e, t) => {
		hA.init(e, t);
		const i = e._zod.parse,
			u = nm(() => Vb(t)),
			s = (b) => {
				const p = new Dx(["shape", "payload", "ctx"]),
					x = u.value,
					A = (C) => {
						const k = Zp(C);
						return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
					};
				p.write("const input = payload.value;");
				const N = Object.create(null);
				let q = 0;
				for (const C of x.keys) N[C] = `key_${q++}`;
				p.write("const newResult = {};");
				for (const C of x.keys) {
					const k = N[C],
						L = Zp(C),
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
		const f = gc,
			h = !vc.jitless,
			v = h && xT.value,
			g = t.catchall;
		let S;
		e._zod.parse = (b, p) => {
			S ?? (S = u.value);
			const x = b.value;
			return f(x)
				? h && v && p?.async === !1 && p.jitless !== !0
					? (o || (o = s(t.shape)), (b = o(b, p)), g ? Hb([], x, b, p, S, e) : b)
					: i(b, p)
				: (b.issues.push({ expected: "object", code: "invalid_type", input: x, inst: e }), b);
		};
	});
function Kp(e, t, i, u) {
	for (const o of e) if (o.issues.length === 0) return ((t.value = o.value), t);
	const s = e.filter((o) => !Zu(o));
	return s.length === 1
		? ((t.value = s[0].value), s[0])
		: (t.issues.push({
				code: "invalid_union",
				input: t.value,
				inst: i,
				errors: e.map((o) => o.issues.map((f) => zi(f, u, Oi()))),
			}),
			t);
}
var vA = re("$ZodUnion", (e, t) => {
		(Nt.init(e, t),
			yt(e._zod, "optin", () => (t.options.some((u) => u._zod.optin === "optional") ? "optional" : void 0)),
			yt(e._zod, "optout", () => (t.options.some((u) => u._zod.optout === "optional") ? "optional" : void 0)),
			yt(e._zod, "values", () => {
				if (t.options.every((u) => u._zod.values)) return new Set(t.options.flatMap((u) => Array.from(u._zod.values)));
			}),
			yt(e._zod, "pattern", () => {
				if (t.options.every((u) => u._zod.pattern)) {
					const u = t.options.map((s) => s._zod.pattern);
					return new RegExp(`^(${u.map((s) => im(s.source)).join("|")})$`);
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
			return o ? Promise.all(f).then((h) => Kp(h, u, e, s)) : Kp(f, u, e, s);
		};
	}),
	gA = re("$ZodIntersection", (e, t) => {
		(Nt.init(e, t),
			(e._zod.parse = (i, u) => {
				const s = i.value,
					o = t.left._zod.run({ value: s, issues: [] }, u),
					f = t.right._zod.run({ value: s, issues: [] }, u);
				return o instanceof Promise || f instanceof Promise
					? Promise.all([o, f]).then(([h, m]) => Yp(i, h, m))
					: Yp(i, o, f);
			}));
	});
function jh(e, t) {
	if (e === t) return { valid: !0, data: e };
	if (e instanceof Date && t instanceof Date && +e == +t) return { valid: !0, data: e };
	if (Wu(e) && Wu(t)) {
		const i = Object.keys(t),
			u = Object.keys(e).filter((o) => i.indexOf(o) !== -1),
			s = { ...e, ...t };
		for (const o of u) {
			const f = jh(e[o], t[o]);
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
				f = jh(s, o);
			if (!f.valid) return { valid: !1, mergeErrorPath: [u, ...f.mergeErrorPath] };
			i.push(f.data);
		}
		return { valid: !0, data: i };
	}
	return { valid: !1, mergeErrorPath: [] };
}
function Yp(e, t, i) {
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
	if ((o.length && s && e.issues.push({ ...s, keys: o }), Zu(e))) return e;
	const f = jh(t.value, i.value);
	if (!f.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(f.mergeErrorPath)}`);
	return ((e.value = f.data), e);
}
var yA = re("$ZodRecord", (e, t) => {
		(Nt.init(e, t),
			(e._zod.parse = (i, u) => {
				const s = i.value;
				if (!Wu(s)) return (i.issues.push({ expected: "record", code: "invalid_type", input: s, inst: e }), i);
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
									issues: g.issues.map((p) => zi(p, u, Oi())),
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
											(p.issues.length && i.issues.push(...Pu(v, p.issues)), (i.value[S] = p.value));
										}),
									)
								: (b.issues.length && i.issues.push(...Pu(v, b.issues)), (i.value[S] = b.value));
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
										issues: m.issues.map((g) => zi(g, u, Oi())),
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
										(g.issues.length && i.issues.push(...Pu(h, g.issues)), (i.value[m.value] = g.value));
									}),
								)
							: (v.issues.length && i.issues.push(...Pu(h, v.issues)), (i.value[m.value] = v.value));
					}
				}
				return o.length ? Promise.all(o).then(() => i) : i;
			}));
	}),
	pA = re("$ZodEnum", (e, t) => {
		Nt.init(e, t);
		const i = Rb(t.entries),
			u = new Set(i);
		((e._zod.values = u),
			(e._zod.pattern = new RegExp(
				`^(${i
					.filter((s) => AT.has(typeof s))
					.map((s) => (typeof s == "string" ? el(s) : s.toString()))
					.join("|")})$`,
			)),
			(e._zod.parse = (s, o) => {
				const f = s.value;
				return (u.has(f) || s.issues.push({ code: "invalid_value", values: i, input: f, inst: e }), s);
			}));
	}),
	bA = re("$ZodLiteral", (e, t) => {
		if ((Nt.init(e, t), t.values.length === 0)) throw new Error("Cannot create literal schema with no valid values");
		const i = new Set(t.values);
		((e._zod.values = i),
			(e._zod.pattern = new RegExp(
				`^(${t.values.map((u) => (typeof u == "string" ? el(u) : u ? el(u.toString()) : String(u))).join("|")})$`,
			)),
			(e._zod.parse = (u, s) => {
				const o = u.value;
				return (i.has(o) || u.issues.push({ code: "invalid_value", values: t.values, input: o, inst: e }), u);
			}));
	}),
	_A = re("$ZodTransform", (e, t) => {
		(Nt.init(e, t),
			(e._zod.optin = "optional"),
			(e._zod.parse = (i, u) => {
				if (u.direction === "backward") throw new Ab(e.constructor.name);
				const s = t.transform(i.value, i);
				if (u.async)
					return (s instanceof Promise ? s : Promise.resolve(s)).then((o) => ((i.value = o), (i.fallback = !0), i));
				if (s instanceof Promise) throw new Yu();
				return ((i.value = s), (i.fallback = !0), i);
			}));
	});
function Gp(e, t) {
	return t === void 0 && (e.issues.length || e.fallback) ? { issues: [], value: void 0 } : e;
}
var Zb = re("$ZodOptional", (e, t) => {
		(Nt.init(e, t),
			(e._zod.optin = "optional"),
			(e._zod.optout = "optional"),
			yt(e._zod, "values", () => (t.innerType._zod.values ? new Set([...t.innerType._zod.values, void 0]) : void 0)),
			yt(e._zod, "pattern", () => {
				const i = t.innerType._zod.pattern;
				return i ? new RegExp(`^(${im(i.source)})?$`) : void 0;
			}),
			(e._zod.parse = (i, u) => {
				if (t.innerType._zod.optin === "optional") {
					const s = i.value,
						o = t.innerType._zod.run(i, u);
					return o instanceof Promise ? o.then((f) => Gp(f, s)) : Gp(o, s);
				}
				return i.value === void 0 ? i : t.innerType._zod.run(i, u);
			}));
	}),
	SA = re("$ZodExactOptional", (e, t) => {
		(Zb.init(e, t),
			yt(e._zod, "values", () => t.innerType._zod.values),
			yt(e._zod, "pattern", () => t.innerType._zod.pattern),
			(e._zod.parse = (i, u) => t.innerType._zod.run(i, u)));
	}),
	wA = re("$ZodNullable", (e, t) => {
		(Nt.init(e, t),
			yt(e._zod, "optin", () => t.innerType._zod.optin),
			yt(e._zod, "optout", () => t.innerType._zod.optout),
			yt(e._zod, "pattern", () => {
				const i = t.innerType._zod.pattern;
				return i ? new RegExp(`^(${im(i.source)}|null)$`) : void 0;
			}),
			yt(e._zod, "values", () => (t.innerType._zod.values ? new Set([...t.innerType._zod.values, null]) : void 0)),
			(e._zod.parse = (i, u) => (i.value === null ? i : t.innerType._zod.run(i, u))));
	}),
	EA = re("$ZodDefault", (e, t) => {
		(Nt.init(e, t),
			(e._zod.optin = "optional"),
			yt(e._zod, "values", () => t.innerType._zod.values),
			(e._zod.parse = (i, u) => {
				if (u.direction === "backward") return t.innerType._zod.run(i, u);
				if (i.value === void 0) return ((i.value = t.defaultValue), i);
				const s = t.innerType._zod.run(i, u);
				return s instanceof Promise ? s.then((o) => Fp(o, t)) : Fp(s, t);
			}));
	});
function Fp(e, t) {
	return (e.value === void 0 && (e.value = t.defaultValue), e);
}
var TA = re("$ZodPrefault", (e, t) => {
		(Nt.init(e, t),
			(e._zod.optin = "optional"),
			yt(e._zod, "values", () => t.innerType._zod.values),
			(e._zod.parse = (i, u) => (
				u.direction === "backward" || (i.value === void 0 && (i.value = t.defaultValue)),
				t.innerType._zod.run(i, u)
			)));
	}),
	xA = re("$ZodNonOptional", (e, t) => {
		(Nt.init(e, t),
			yt(e._zod, "values", () => {
				const i = t.innerType._zod.values;
				return i ? new Set([...i].filter((u) => u !== void 0)) : void 0;
			}),
			(e._zod.parse = (i, u) => {
				const s = t.innerType._zod.run(i, u);
				return s instanceof Promise ? s.then((o) => Xp(o, e)) : Xp(s, e);
			}));
	});
function Xp(e, t) {
	return (
		!e.issues.length &&
			e.value === void 0 &&
			e.issues.push({ code: "invalid_type", expected: "nonoptional", input: e.value, inst: t }),
		e
	);
}
var AA = re("$ZodCatch", (e, t) => {
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
										error: { issues: o.issues.map((f) => zi(f, u, Oi())) },
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
								error: { issues: s.issues.map((o) => zi(o, u, Oi())) },
								input: i.value,
							})),
							(i.issues = []),
							(i.fallback = !0)),
						i);
			}));
	}),
	RA = re("$ZodPipe", (e, t) => {
		(Nt.init(e, t),
			yt(e._zod, "values", () => t.in._zod.values),
			yt(e._zod, "optin", () => t.in._zod.optin),
			yt(e._zod, "optout", () => t.out._zod.optout),
			yt(e._zod, "propValues", () => t.in._zod.propValues),
			(e._zod.parse = (i, u) => {
				if (u.direction === "backward") {
					const o = t.out._zod.run(i, u);
					return o instanceof Promise ? o.then((f) => Yo(f, t.in, u)) : Yo(o, t.in, u);
				}
				const s = t.in._zod.run(i, u);
				return s instanceof Promise ? s.then((o) => Yo(o, t.out, u)) : Yo(s, t.out, u);
			}));
	});
function Yo(e, t, i) {
	return e.issues.length
		? ((e.aborted = !0), e)
		: t._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, i);
}
var CA = re("$ZodReadonly", (e, t) => {
	(Nt.init(e, t),
		yt(e._zod, "propValues", () => t.innerType._zod.propValues),
		yt(e._zod, "values", () => t.innerType._zod.values),
		yt(e._zod, "optin", () => t.innerType?._zod?.optin),
		yt(e._zod, "optout", () => t.innerType?._zod?.optout),
		(e._zod.parse = (i, u) => {
			if (u.direction === "backward") return t.innerType._zod.run(i, u);
			const s = t.innerType._zod.run(i, u);
			return s instanceof Promise ? s.then(Jp) : Jp(s);
		}));
});
function Jp(e) {
	return ((e.value = Object.freeze(e.value)), e);
}
var kA = re("$ZodCustom", (e, t) => {
	(ir.init(e, t),
		Nt.init(e, t),
		(e._zod.parse = (i, u) => i),
		(e._zod.check = (i) => {
			const u = i.value,
				s = t.fn(u);
			if (s instanceof Promise) return s.then((o) => Wp(o, i, u, e));
			Wp(s, i, u, e);
		}));
});
function Wp(e, t, i, u) {
	if (!e) {
		const s = { code: "custom", input: i, inst: u, path: [...(u._zod.def.path ?? [])], continue: !u._zod.def.abort };
		(u._zod.def.params && (s.params = u._zod.def.params), t.issues.push(hs(s)));
	}
}
var e0,
	MA = class {
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
function NA() {
	return new MA();
}
(e0 = globalThis).__zod_globalRegistry ?? (e0.__zod_globalRegistry = NA());
var as = globalThis.__zod_globalRegistry;
function OA(e, t) {
	return new e({ type: "string", ...xe(t) });
}
function zA(e, t) {
	return new e({ type: "string", format: "email", check: "string_format", abort: !1, ...xe(t) });
}
function t0(e, t) {
	return new e({ type: "string", format: "guid", check: "string_format", abort: !1, ...xe(t) });
}
function DA(e, t) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, ...xe(t) });
}
function jA(e, t) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v4", ...xe(t) });
}
function IA(e, t) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v6", ...xe(t) });
}
function LA(e, t) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v7", ...xe(t) });
}
function qA(e, t) {
	return new e({ type: "string", format: "url", check: "string_format", abort: !1, ...xe(t) });
}
function UA(e, t) {
	return new e({ type: "string", format: "emoji", check: "string_format", abort: !1, ...xe(t) });
}
function $A(e, t) {
	return new e({ type: "string", format: "nanoid", check: "string_format", abort: !1, ...xe(t) });
}
function BA(e, t) {
	return new e({ type: "string", format: "cuid", check: "string_format", abort: !1, ...xe(t) });
}
function VA(e, t) {
	return new e({ type: "string", format: "cuid2", check: "string_format", abort: !1, ...xe(t) });
}
function HA(e, t) {
	return new e({ type: "string", format: "ulid", check: "string_format", abort: !1, ...xe(t) });
}
function ZA(e, t) {
	return new e({ type: "string", format: "xid", check: "string_format", abort: !1, ...xe(t) });
}
function PA(e, t) {
	return new e({ type: "string", format: "ksuid", check: "string_format", abort: !1, ...xe(t) });
}
function QA(e, t) {
	return new e({ type: "string", format: "ipv4", check: "string_format", abort: !1, ...xe(t) });
}
function KA(e, t) {
	return new e({ type: "string", format: "ipv6", check: "string_format", abort: !1, ...xe(t) });
}
function YA(e, t) {
	return new e({ type: "string", format: "cidrv4", check: "string_format", abort: !1, ...xe(t) });
}
function GA(e, t) {
	return new e({ type: "string", format: "cidrv6", check: "string_format", abort: !1, ...xe(t) });
}
function FA(e, t) {
	return new e({ type: "string", format: "base64", check: "string_format", abort: !1, ...xe(t) });
}
function XA(e, t) {
	return new e({ type: "string", format: "base64url", check: "string_format", abort: !1, ...xe(t) });
}
function JA(e, t) {
	return new e({ type: "string", format: "e164", check: "string_format", abort: !1, ...xe(t) });
}
function WA(e, t) {
	return new e({ type: "string", format: "jwt", check: "string_format", abort: !1, ...xe(t) });
}
function eR(e, t) {
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
function tR(e, t) {
	return new e({ type: "string", format: "date", check: "string_format", ...xe(t) });
}
function nR(e, t) {
	return new e({ type: "string", format: "time", check: "string_format", precision: null, ...xe(t) });
}
function rR(e, t) {
	return new e({ type: "string", format: "duration", check: "string_format", ...xe(t) });
}
function iR(e, t) {
	return new e({ type: "number", checks: [], ...xe(t) });
}
function aR(e, t) {
	return new e({ type: "number", check: "number_format", abort: !1, format: "safeint", ...xe(t) });
}
function uR(e, t) {
	return new e({ type: "boolean", ...xe(t) });
}
function lR(e, t) {
	return new e({ type: "undefined", ...xe(t) });
}
function sR(e) {
	return new e({ type: "unknown" });
}
function oR(e, t) {
	return new e({ type: "never", ...xe(t) });
}
function n0(e, t) {
	return new qb({ check: "less_than", ...xe(t), value: e, inclusive: !1 });
}
function uh(e, t) {
	return new qb({ check: "less_than", ...xe(t), value: e, inclusive: !0 });
}
function r0(e, t) {
	return new Ub({ check: "greater_than", ...xe(t), value: e, inclusive: !1 });
}
function lh(e, t) {
	return new Ub({ check: "greater_than", ...xe(t), value: e, inclusive: !0 });
}
function i0(e, t) {
	return new wx({ check: "multiple_of", ...xe(t), value: e });
}
function Pb(e, t) {
	return new Tx({ check: "max_length", ...xe(t), maximum: e });
}
function pc(e, t) {
	return new xx({ check: "min_length", ...xe(t), minimum: e });
}
function Qb(e, t) {
	return new Ax({ check: "length_equals", ...xe(t), length: e });
}
function cR(e, t) {
	return new Rx({ check: "string_format", format: "regex", ...xe(t), pattern: e });
}
function fR(e) {
	return new Cx({ check: "string_format", format: "lowercase", ...xe(e) });
}
function dR(e) {
	return new kx({ check: "string_format", format: "uppercase", ...xe(e) });
}
function hR(e, t) {
	return new Mx({ check: "string_format", format: "includes", ...xe(t), includes: e });
}
function mR(e, t) {
	return new Nx({ check: "string_format", format: "starts_with", ...xe(t), prefix: e });
}
function vR(e, t) {
	return new Ox({ check: "string_format", format: "ends_with", ...xe(t), suffix: e });
}
function rl(e) {
	return new zx({ check: "overwrite", tx: e });
}
function gR(e) {
	return rl((t) => t.normalize(e));
}
function yR() {
	return rl((e) => e.trim());
}
function pR() {
	return rl((e) => e.toLowerCase());
}
function bR() {
	return rl((e) => e.toUpperCase());
}
function _R() {
	return rl((e) => TT(e));
}
function SR(e, t, i) {
	return new e({ type: "array", element: t, ...xe(i) });
}
function wR(e, t, i) {
	return new e({ type: "custom", check: "custom", fn: t, ...xe(i) });
}
function ER(e, t) {
	const i = TR(
		(u) => (
			(u.addIssue = (s) => {
				if (typeof s == "string") u.issues.push(hs(s, u.value, i._zod.def));
				else {
					const o = s;
					(o.fatal && (o.continue = !1),
						o.code ?? (o.code = "custom"),
						o.input ?? (o.input = u.value),
						o.inst ?? (o.inst = i),
						o.continue ?? (o.continue = !i._zod.def.abort),
						u.issues.push(hs(o)));
				}
			}),
			e(u.value, u)
		),
		t,
	);
	return i;
}
function TR(e, t) {
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
			metadataRegistry: e?.metadata ?? as,
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
				x = p.schema;
			if (
				(x.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0")
					? ((v.allOf = v.allOf ?? []), v.allOf.push(x))
					: Object.assign(v, x),
				Object.assign(v, g),
				h._zod.parent === S)
			)
				for (const A in v) A === "$ref" || A === "allOf" || A in g || delete v[A];
			if (x.$ref && p.def)
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
				for (const x in v)
					x === "$ref" ||
						x === "allOf" ||
						(x in p.def && JSON.stringify(v[x]) === JSON.stringify(p.def[x]) && delete v[x]);
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
					jsonSchema: { input: bc(t, "input", e.processors), output: bc(t, "output", e.processors) },
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
var xR =
		(e, t = {}) =>
		(i) => {
			const u = Kb({ ...i, processors: t });
			return (hn(e, u), Yb(u, e), Gb(u, e));
		},
	bc =
		(e, t, i = {}) =>
		(u) => {
			const { libraryOptions: s, target: o } = u ?? {},
				f = Kb({ ...(s ?? {}), target: o, io: t, processors: i });
			return (hn(e, f), Yb(f, e), Gb(f, e));
		},
	AR = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" },
	RR = (e, t, i, u) => {
		const s = i;
		s.type = "string";
		const { minimum: o, maximum: f, format: h, patterns: m, contentEncoding: v } = e._zod.bag;
		if (
			(typeof o == "number" && (s.minLength = o),
			typeof f == "number" && (s.maxLength = f),
			h && ((s.format = AR[h] ?? h), s.format === "" && delete s.format, h === "time" && delete s.format),
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
	CR = (e, t, i, u) => {
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
	kR = (e, t, i, u) => {
		i.type = "boolean";
	},
	MR = (e, t, i, u) => {
		if (t.unrepresentable === "throw") throw new Error("Undefined cannot be represented in JSON Schema");
	},
	NR = (e, t, i, u) => {
		i.not = {};
	},
	OR = (e, t, i, u) => {},
	zR = (e, t, i, u) => {
		const s = e._zod.def,
			o = Rb(s.entries);
		(o.every((f) => typeof f == "number") && (i.type = "number"),
			o.every((f) => typeof f == "string") && (i.type = "string"),
			(i.enum = o));
	},
	DR = (e, t, i, u) => {
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
	jR = (e, t, i, u) => {
		if (t.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
	},
	IR = (e, t, i, u) => {
		if (t.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
	},
	LR = (e, t, i, u) => {
		const s = i,
			o = e._zod.def,
			{ minimum: f, maximum: h } = e._zod.bag;
		(typeof f == "number" && (s.minItems = f),
			typeof h == "number" && (s.maxItems = h),
			(s.type = "array"),
			(s.items = hn(o.element, t, { ...u, path: [...u.path, "items"] })));
	},
	qR = (e, t, i, u) => {
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
	UR = (e, t, i, u) => {
		const s = e._zod.def,
			o = s.inclusive === !1,
			f = s.options.map((h, m) => hn(h, t, { ...u, path: [...u.path, o ? "oneOf" : "anyOf", m] }));
		o ? (i.oneOf = f) : (i.anyOf = f);
	},
	$R = (e, t, i, u) => {
		const s = e._zod.def,
			o = hn(s.left, t, { ...u, path: [...u.path, "allOf", 0] }),
			f = hn(s.right, t, { ...u, path: [...u.path, "allOf", 1] }),
			h = (m) => "allOf" in m && Object.keys(m).length === 1;
		i.allOf = [...(h(o) ? o.allOf : [o]), ...(h(f) ? f.allOf : [f])];
	},
	BR = (e, t, i, u) => {
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
	VR = (e, t, i, u) => {
		const s = e._zod.def,
			o = hn(s.innerType, t, u),
			f = t.seen.get(e);
		t.target === "openapi-3.0" ? ((f.ref = s.innerType), (i.nullable = !0)) : (i.anyOf = [o, { type: "null" }]);
	},
	HR = (e, t, i, u) => {
		const s = e._zod.def;
		hn(s.innerType, t, u);
		const o = t.seen.get(e);
		o.ref = s.innerType;
	},
	ZR = (e, t, i, u) => {
		const s = e._zod.def;
		hn(s.innerType, t, u);
		const o = t.seen.get(e);
		((o.ref = s.innerType), (i.default = JSON.parse(JSON.stringify(s.defaultValue))));
	},
	PR = (e, t, i, u) => {
		const s = e._zod.def;
		hn(s.innerType, t, u);
		const o = t.seen.get(e);
		((o.ref = s.innerType), t.io === "input" && (i._prefault = JSON.parse(JSON.stringify(s.defaultValue))));
	},
	QR = (e, t, i, u) => {
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
	KR = (e, t, i, u) => {
		const s = e._zod.def,
			o = s.in._zod.traits.has("$ZodTransform"),
			f = t.io === "input" ? (o ? s.out : s.in) : s.out;
		hn(f, t, u);
		const h = t.seen.get(e);
		h.ref = f;
	},
	YR = (e, t, i, u) => {
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
	GR = re("ZodISODateTime", (e, t) => {
		(Kx.init(e, t), It.init(e, t));
	});
function FR(e) {
	return eR(GR, e);
}
var XR = re("ZodISODate", (e, t) => {
	(Yx.init(e, t), It.init(e, t));
});
function JR(e) {
	return tR(XR, e);
}
var WR = re("ZodISOTime", (e, t) => {
	(Gx.init(e, t), It.init(e, t));
});
function eC(e) {
	return nR(WR, e);
}
var tC = re("ZodISODuration", (e, t) => {
	(Fx.init(e, t), It.init(e, t));
});
function nC(e) {
	return rR(tC, e);
}
var rC = (e, t) => {
		(Nb.init(e, t),
			(e.name = "ZodError"),
			Object.defineProperties(e, {
				format: { value: (i) => qT(e, i) },
				flatten: { value: (i) => LT(e, i) },
				addIssue: {
					value: (i) => {
						(e.issues.push(i), (e.message = JSON.stringify(e.issues, Dh, 2)));
					},
				},
				addIssues: {
					value: (i) => {
						(e.issues.push(...i), (e.message = JSON.stringify(e.issues, Dh, 2)));
					},
				},
				isEmpty: {
					get() {
						return e.issues.length === 0;
					},
				},
			}));
	},
	qr = re("ZodError", rC, { Parent: Error }),
	iC = um(qr),
	aC = lm(qr),
	uC = kc(qr),
	lC = Mc(qr),
	sC = BT(qr),
	oC = VT(qr),
	cC = HT(qr),
	fC = ZT(qr),
	dC = PT(qr),
	hC = QT(qr),
	mC = KT(qr),
	vC = YT(qr),
	a0 = new WeakMap();
function bs(e, t, i) {
	const u = Object.getPrototypeOf(e);
	let s = a0.get(u);
	if ((s || ((s = new Set()), a0.set(u, s)), !s.has(t))) {
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
			Object.assign(e["~standard"], { jsonSchema: { input: bc(e, "input"), output: bc(e, "output") } }),
			(e.toJSONSchema = xR(e, {})),
			(e.def = t),
			(e.type = t.type),
			Object.defineProperty(e, "_def", { value: t }),
			(e.parse = (i, u) => iC(e, i, u, { callee: e.parse })),
			(e.safeParse = (i, u) => uC(e, i, u)),
			(e.parseAsync = async (i, u) => aC(e, i, u, { callee: e.parseAsync })),
			(e.safeParseAsync = async (i, u) => lC(e, i, u)),
			(e.spa = e.safeParseAsync),
			(e.encode = (i, u) => sC(e, i, u)),
			(e.decode = (i, u) => oC(e, i, u)),
			(e.encodeAsync = async (i, u) => cC(e, i, u)),
			(e.decodeAsync = async (i, u) => fC(e, i, u)),
			(e.safeEncode = (i, u) => dC(e, i, u)),
			(e.safeDecode = (i, u) => hC(e, i, u)),
			(e.safeEncodeAsync = async (i, u) => mC(e, i, u)),
			(e.safeDecodeAsync = async (i, u) => vC(e, i, u)),
			bs(e, "ZodType", {
				check(...i) {
					const u = this.def;
					return this.clone(
						ba(u, {
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
					return _a(this, i, u);
				},
				brand() {
					return this;
				},
				register(i, u) {
					return (i.add(this, u), this);
				},
				refine(i, u) {
					return this.check(ck(i, u));
				},
				superRefine(i, u) {
					return this.check(fk(i, u));
				},
				overwrite(i) {
					return this.check(rl(i));
				},
				optional() {
					return o0(this);
				},
				exactOptional() {
					return XC(this);
				},
				nullable() {
					return c0(this);
				},
				nullish() {
					return o0(c0(this));
				},
				nonoptional(i) {
					return rk(this, i);
				},
				array() {
					return Ja(this);
				},
				or(i) {
					return Oc([this, i]);
				},
				and(i) {
					return PC(this, i);
				},
				transform(i) {
					return f0(this, GC(i));
				},
				default(i) {
					return ek(this, i);
				},
				prefault(i) {
					return nk(this, i);
				},
				catch(i) {
					return ak(this, i);
				},
				pipe(i) {
					return f0(this, i);
				},
				readonly() {
					return sk(this);
				},
				describe(i) {
					const u = this.clone();
					return (as.add(u, { description: i }), u);
				},
				meta(...i) {
					if (i.length === 0) return as.get(this);
					const u = this.clone();
					return (as.add(u, i[0]), u);
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
					return as.get(e)?.description;
				},
				configurable: !0,
			}),
			e
		),
	),
	Xb = re("_ZodString", (e, t) => {
		(sm.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (u, s, o) => RR(e, u, s, o)));
		const i = e._zod.bag;
		((e.format = i.format ?? null),
			(e.minLength = i.minimum ?? null),
			(e.maxLength = i.maximum ?? null),
			bs(e, "_ZodString", {
				regex(...u) {
					return this.check(cR(...u));
				},
				includes(...u) {
					return this.check(hR(...u));
				},
				startsWith(...u) {
					return this.check(mR(...u));
				},
				endsWith(...u) {
					return this.check(vR(...u));
				},
				min(...u) {
					return this.check(pc(...u));
				},
				max(...u) {
					return this.check(Pb(...u));
				},
				length(...u) {
					return this.check(Qb(...u));
				},
				nonempty(...u) {
					return this.check(pc(1, ...u));
				},
				lowercase(u) {
					return this.check(fR(u));
				},
				uppercase(u) {
					return this.check(dR(u));
				},
				trim() {
					return this.check(yR());
				},
				normalize(...u) {
					return this.check(gR(...u));
				},
				toLowerCase() {
					return this.check(pR());
				},
				toUpperCase() {
					return this.check(bR());
				},
				slugify() {
					return this.check(_R());
				},
			}));
	}),
	gC = re("ZodString", (e, t) => {
		(sm.init(e, t),
			Xb.init(e, t),
			(e.email = (i) => e.check(zA(yC, i))),
			(e.url = (i) => e.check(qA(pC, i))),
			(e.jwt = (i) => e.check(WA(zC, i))),
			(e.emoji = (i) => e.check(UA(bC, i))),
			(e.guid = (i) => e.check(t0(u0, i))),
			(e.uuid = (i) => e.check(DA(Go, i))),
			(e.uuidv4 = (i) => e.check(jA(Go, i))),
			(e.uuidv6 = (i) => e.check(IA(Go, i))),
			(e.uuidv7 = (i) => e.check(LA(Go, i))),
			(e.nanoid = (i) => e.check($A(_C, i))),
			(e.guid = (i) => e.check(t0(u0, i))),
			(e.cuid = (i) => e.check(BA(SC, i))),
			(e.cuid2 = (i) => e.check(VA(wC, i))),
			(e.ulid = (i) => e.check(HA(EC, i))),
			(e.base64 = (i) => e.check(FA(MC, i))),
			(e.base64url = (i) => e.check(XA(NC, i))),
			(e.xid = (i) => e.check(ZA(TC, i))),
			(e.ksuid = (i) => e.check(PA(xC, i))),
			(e.ipv4 = (i) => e.check(QA(AC, i))),
			(e.ipv6 = (i) => e.check(KA(RC, i))),
			(e.cidrv4 = (i) => e.check(YA(CC, i))),
			(e.cidrv6 = (i) => e.check(GA(kC, i))),
			(e.e164 = (i) => e.check(JA(OC, i))),
			(e.datetime = (i) => e.check(FR(i))),
			(e.date = (i) => e.check(JR(i))),
			(e.time = (i) => e.check(eC(i))),
			(e.duration = (i) => e.check(nC(i))));
	});
function jt(e) {
	return OA(gC, e);
}
var It = re("ZodStringFormat", (e, t) => {
		(Ot.init(e, t), Xb.init(e, t));
	}),
	yC = re("ZodEmail", (e, t) => {
		(qx.init(e, t), It.init(e, t));
	}),
	u0 = re("ZodGUID", (e, t) => {
		(Ix.init(e, t), It.init(e, t));
	}),
	Go = re("ZodUUID", (e, t) => {
		(Lx.init(e, t), It.init(e, t));
	}),
	pC = re("ZodURL", (e, t) => {
		(Ux.init(e, t), It.init(e, t));
	}),
	bC = re("ZodEmoji", (e, t) => {
		($x.init(e, t), It.init(e, t));
	}),
	_C = re("ZodNanoID", (e, t) => {
		(Bx.init(e, t), It.init(e, t));
	}),
	SC = re("ZodCUID", (e, t) => {
		(Vx.init(e, t), It.init(e, t));
	}),
	wC = re("ZodCUID2", (e, t) => {
		(Hx.init(e, t), It.init(e, t));
	}),
	EC = re("ZodULID", (e, t) => {
		(Zx.init(e, t), It.init(e, t));
	}),
	TC = re("ZodXID", (e, t) => {
		(Px.init(e, t), It.init(e, t));
	}),
	xC = re("ZodKSUID", (e, t) => {
		(Qx.init(e, t), It.init(e, t));
	}),
	AC = re("ZodIPv4", (e, t) => {
		(Xx.init(e, t), It.init(e, t));
	}),
	RC = re("ZodIPv6", (e, t) => {
		(Jx.init(e, t), It.init(e, t));
	}),
	CC = re("ZodCIDRv4", (e, t) => {
		(Wx.init(e, t), It.init(e, t));
	}),
	kC = re("ZodCIDRv6", (e, t) => {
		(eA.init(e, t), It.init(e, t));
	}),
	MC = re("ZodBase64", (e, t) => {
		(tA.init(e, t), It.init(e, t));
	}),
	NC = re("ZodBase64URL", (e, t) => {
		(rA.init(e, t), It.init(e, t));
	}),
	OC = re("ZodE164", (e, t) => {
		(iA.init(e, t), It.init(e, t));
	}),
	zC = re("ZodJWT", (e, t) => {
		(uA.init(e, t), It.init(e, t));
	}),
	Jb = re("ZodNumber", (e, t) => {
		(Bb.init(e, t),
			zt.init(e, t),
			(e._zod.processJSONSchema = (u, s, o) => CR(e, u, s, o)),
			bs(e, "ZodNumber", {
				gt(u, s) {
					return this.check(r0(u, s));
				},
				gte(u, s) {
					return this.check(lh(u, s));
				},
				min(u, s) {
					return this.check(lh(u, s));
				},
				lt(u, s) {
					return this.check(n0(u, s));
				},
				lte(u, s) {
					return this.check(uh(u, s));
				},
				max(u, s) {
					return this.check(uh(u, s));
				},
				int(u) {
					return this.check(l0(u));
				},
				safe(u) {
					return this.check(l0(u));
				},
				positive(u) {
					return this.check(r0(0, u));
				},
				nonnegative(u) {
					return this.check(lh(0, u));
				},
				negative(u) {
					return this.check(n0(0, u));
				},
				nonpositive(u) {
					return this.check(uh(0, u));
				},
				multipleOf(u, s) {
					return this.check(i0(u, s));
				},
				step(u, s) {
					return this.check(i0(u, s));
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
	return iR(Jb, e);
}
var DC = re("ZodNumberFormat", (e, t) => {
	(lA.init(e, t), Jb.init(e, t));
});
function l0(e) {
	return aR(DC, e);
}
var jC = re("ZodBoolean", (e, t) => {
	(sA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => kR(e, i, u, s)));
});
function om(e) {
	return uR(jC, e);
}
var IC = re("ZodUndefined", (e, t) => {
	(oA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => MR(e, i, u, s)));
});
function LC(e) {
	return lR(IC, e);
}
var qC = re("ZodUnknown", (e, t) => {
	(cA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => OR(e, i, u, s)));
});
function Ih() {
	return sR(qC);
}
var UC = re("ZodNever", (e, t) => {
	(fA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => NR(e, i, u, s)));
});
function $C(e) {
	return oR(UC, e);
}
var BC = re("ZodArray", (e, t) => {
	(dA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => LR(e, i, u, s)),
		(e.element = t.element),
		bs(e, "ZodArray", {
			min(i, u) {
				return this.check(pc(i, u));
			},
			nonempty(i) {
				return this.check(pc(1, i));
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
function Ja(e, t) {
	return SR(BC, e, t);
}
var VC = re("ZodObject", (e, t) => {
	(mA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => qR(e, i, u, s)),
		yt(e, "shape", () => t.shape),
		bs(e, "ZodObject", {
			keyof() {
				return QC(Object.keys(this._zod.def.shape));
			},
			catchall(i) {
				return this.clone({ ...this._zod.def, catchall: i });
			},
			passthrough() {
				return this.clone({ ...this._zod.def, catchall: Ih() });
			},
			loose() {
				return this.clone({ ...this._zod.def, catchall: Ih() });
			},
			strict() {
				return this.clone({ ...this._zod.def, catchall: $C() });
			},
			strip() {
				return this.clone({ ...this._zod.def, catchall: void 0 });
			},
			extend(i) {
				return NT(this, i);
			},
			safeExtend(i) {
				return OT(this, i);
			},
			merge(i) {
				return zT(this, i);
			},
			pick(i) {
				return kT(this, i);
			},
			omit(i) {
				return MT(this, i);
			},
			partial(...i) {
				return DT(e_, this, i[0]);
			},
			required(...i) {
				return jT(t_, this, i[0]);
			},
		}));
});
function jn(e, t) {
	const i = { type: "object", shape: e ?? {}, ...xe(t) };
	return new VC(i);
}
var HC = re("ZodUnion", (e, t) => {
	(vA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => UR(e, i, u, s)), (e.options = t.options));
});
function Oc(e, t) {
	return new HC({ type: "union", options: e, ...xe(t) });
}
var ZC = re("ZodIntersection", (e, t) => {
	(gA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => $R(e, i, u, s)));
});
function PC(e, t) {
	return new ZC({ type: "intersection", left: e, right: t });
}
var s0 = re("ZodRecord", (e, t) => {
	(yA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => BR(e, i, u, s)),
		(e.keyType = t.keyType),
		(e.valueType = t.valueType));
});
function Wb(e, t, i) {
	return !t || !t._zod
		? new s0({ type: "record", keyType: jt(), valueType: e, ...xe(t) })
		: new s0({ type: "record", keyType: e, valueType: t, ...xe(i) });
}
var Lh = re("ZodEnum", (e, t) => {
	(pA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (u, s, o) => zR(e, u, s, o)),
		(e.enum = t.entries),
		(e.options = Object.values(t.entries)));
	const i = new Set(Object.keys(t.entries));
	((e.extract = (u, s) => {
		const o = {};
		for (const f of u)
			if (i.has(f)) o[f] = t.entries[f];
			else throw new Error(`Key ${f} not found in enum`);
		return new Lh({ ...t, checks: [], ...xe(s), entries: o });
	}),
		(e.exclude = (u, s) => {
			const o = { ...t.entries };
			for (const f of u)
				if (i.has(f)) delete o[f];
				else throw new Error(`Key ${f} not found in enum`);
			return new Lh({ ...t, checks: [], ...xe(s), entries: o });
		}));
});
function QC(e, t) {
	const i = Array.isArray(e) ? Object.fromEntries(e.map((u) => [u, u])) : e;
	return new Lh({ type: "enum", entries: i, ...xe(t) });
}
var KC = re("ZodLiteral", (e, t) => {
	(bA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => DR(e, i, u, s)),
		(e.values = new Set(t.values)),
		Object.defineProperty(e, "value", {
			get() {
				if (t.values.length > 1)
					throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
				return t.values[0];
			},
		}));
});
function ms(e, t) {
	return new KC({ type: "literal", values: Array.isArray(e) ? e : [e], ...xe(t) });
}
var YC = re("ZodTransform", (e, t) => {
	(_A.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => IR(e, i, u, s)),
		(e._zod.parse = (i, u) => {
			if (u.direction === "backward") throw new Ab(e.constructor.name);
			i.addIssue = (o) => {
				if (typeof o == "string") i.issues.push(hs(o, i.value, t));
				else {
					const f = o;
					(f.fatal && (f.continue = !1),
						f.code ?? (f.code = "custom"),
						f.input ?? (f.input = i.value),
						f.inst ?? (f.inst = e),
						i.issues.push(hs(f)));
				}
			};
			const s = t.transform(i.value, i);
			return s instanceof Promise
				? s.then((o) => ((i.value = o), (i.fallback = !0), i))
				: ((i.value = s), (i.fallback = !0), i);
		}));
});
function GC(e) {
	return new YC({ type: "transform", transform: e });
}
var e_ = re("ZodOptional", (e, t) => {
	(Zb.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => Fb(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function o0(e) {
	return new e_({ type: "optional", innerType: e });
}
var FC = re("ZodExactOptional", (e, t) => {
	(SA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => Fb(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function XC(e) {
	return new FC({ type: "optional", innerType: e });
}
var JC = re("ZodNullable", (e, t) => {
	(wA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => VR(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function c0(e) {
	return new JC({ type: "nullable", innerType: e });
}
var WC = re("ZodDefault", (e, t) => {
	(EA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => ZR(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeDefault = e.unwrap));
});
function ek(e, t) {
	return new WC({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : kb(t);
		},
	});
}
var tk = re("ZodPrefault", (e, t) => {
	(TA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => PR(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function nk(e, t) {
	return new tk({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : kb(t);
		},
	});
}
var t_ = re("ZodNonOptional", (e, t) => {
	(xA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => HR(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function rk(e, t) {
	return new t_({ type: "nonoptional", innerType: e, ...xe(t) });
}
var ik = re("ZodCatch", (e, t) => {
	(AA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => QR(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeCatch = e.unwrap));
});
function ak(e, t) {
	return new ik({ type: "catch", innerType: e, catchValue: typeof t == "function" ? t : () => t });
}
var uk = re("ZodPipe", (e, t) => {
	(RA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => KR(e, i, u, s)),
		(e.in = t.in),
		(e.out = t.out));
});
function f0(e, t) {
	return new uk({ type: "pipe", in: e, out: t });
}
var lk = re("ZodReadonly", (e, t) => {
	(CA.init(e, t),
		zt.init(e, t),
		(e._zod.processJSONSchema = (i, u, s) => YR(e, i, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function sk(e) {
	return new lk({ type: "readonly", innerType: e });
}
var ok = re("ZodCustom", (e, t) => {
	(kA.init(e, t), zt.init(e, t), (e._zod.processJSONSchema = (i, u, s) => jR(e, i, u, s)));
});
function ck(e, t = {}) {
	return wR(ok, e, t);
}
function fk(e, t) {
	return ER(e, t);
}
var _ = mb(Cc()),
	dk = wT(),
	Qu = ["thumbs_up", "heart", "laugh", "wow", "sad", "party", "rocket", "eyes"],
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
	hk = 9999999999999,
	mk = /(?:^|:)(\d{13}):([^:]{1,16})$/;
function Wa(e) {
	const t = mk.exec(e);
	return t ? hk - Number(t[1]) : null;
}
var i_ = "p/",
	vk = /^p\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/u,
	qh = ["channels", "messages", "replies", "reactions"],
	cm =
		"Only the people added here can read it — and the organization owner, who can read everything in this workspace.";
function gk(e) {
	const t = crypto.randomUUID();
	return e === "private" ? `${i_}${t}` : t;
}
function yn(e) {
	return e.startsWith(i_);
}
function yk(e) {
	return vk.test(e);
}
function Fo(e) {
	return `${e}:`;
}
function fm(e) {
	const t = e.split(":");
	return t.length < 3 || Wa(e) === null ? null : t.slice(0, -2).join(":");
}
function a_(e) {
	return `${e}:`;
}
function pk(e) {
	const t = e.split(":");
	if (t.length < 4) return null;
	const i = t[t.length - 2];
	if (!Qu.includes(i)) return null;
	const u = t.slice(0, -2).join(":");
	return Wa(u) === null ? null : { targetKey: u, token: i, keyTailUserId: t[t.length - 1] };
}
function vs(e) {
	const t = e.split(":");
	if (t.length < 5) return null;
	const i = t.slice(0, -2).join(":");
	return Wa(i) === null || Wa(e) === null ? null : i;
}
function _c(e) {
	const t = e.split(":");
	return t.length === 3 ? (Wa(e) === null ? null : e) : t.length === 5 ? vs(e) : null;
}
function d0(e) {
	return `me:${e}`;
}
function h0(e) {
	return `${e}:read`;
}
function bk(e) {
	const t = e.split(":");
	return t.length !== 3 || t[1] !== "read" || !yn(t[0]) ? null : { channelKey: t[0], keyTailUserId: t[2] };
}
var _k = jn({ name: jt().min(1).max(64), archivedAt: yr().nullable(), topic: jt().max(250).optional() }),
	Sk = jn({ fileNodeId: jt().min(1), name: jt().min(1) }),
	wk = jn({
		text: jt(),
		attachments: Ja(Sk),
		editedAt: yr().nullable(),
		deletedAt: yr().nullable(),
		mentions: Ja(jt()).optional(),
	}),
	Ek = "Someone with no name yet";
function lc(e) {
	return e !== null && e !== "" ? e : Ek;
}
function Tk(e, t) {
	const i = /(?:^|\s)@([^\s@]*)$/.exec(e.slice(0, t));
	if (i === null) return null;
	const u = i[1] ?? "";
	return { start: t - u.length - 1, query: u };
}
function xk(e, t, i) {
	const u = t.toLowerCase();
	return e
		.filter((s) => s.userId !== i)
		.map((s) => ({ ...s, label: lc(s.displayName) }))
		.filter((s) => s.label.toLowerCase().includes(u))
		.sort((s, o) => s.label.localeCompare(o.label));
}
function Ak(e, t, i, u) {
	return { text: `${e.slice(0, t)}@${u} ${e.slice(i)}`, caret: t + u.length + 2 };
}
function Rk(e, t) {
	const i = [];
	for (const [u, s] of e) t.includes(`@${s}`) && i.push(u);
	return i;
}
function u_(e) {
	return e === "not_consented"
		? "This workspace has not allowed Chitchat to read the member list yet. An admin can accept the plugin's current permissions."
		: "The member list is not available right now. You can keep typing.";
}
var Ck = jn({ channels: Wb(jt(), yr()) }),
	kk = jn({
		messages: yr().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
		replies: yr().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
	}),
	Mk = Oc([
		jn({ at: yr(), activity: kk }),
		jn({ at: yr(), activity: LC().optional() }).transform((e) => ({ at: e.at, activity: { messages: 0, replies: 0 } })),
	]),
	au = jn({
		collection: jt(),
		key: jt().min(1).max(128),
		value: Wb(jt(), Ih()),
		revision: yr(),
		createdBy: jt().min(1),
		updatedBy: jt(),
		ownership: Oc([ms("shared"), ms("owned")]),
		createdAt: yr(),
		updatedAt: yr(),
	});
function Nk(e, t) {
	const i = au.safeParse(e);
	if (!i.success) return null;
	const u = Wa(i.data.key);
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
function rs(e) {
	const t = au.safeParse(e);
	if (!t.success) return null;
	const i = _k.safeParse(t.data.value);
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
function Sc(e) {
	return Nk(e, wk);
}
var Ok = jn({ removed: ms(!0).optional() });
function zk(e) {
	const t = au.safeParse(e);
	if (!t.success) return null;
	const i = pk(t.data.key);
	if (i === null) return null;
	const u = Ok.safeParse(t.data.value);
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
function Dk(e) {
	const t = au.safeParse(e);
	if (!t.success) return null;
	const i = Ck.safeParse(t.data.value);
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
function m0(e) {
	const t = au.safeParse(e);
	if (!t.success || t.data.ownership !== "owned") return null;
	const i = bk(t.data.key);
	if (i === null) return null;
	const u = Mk.safeParse(t.data.value);
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
function jk(e) {
	const t = new Map();
	for (const i of e.docs) {
		const u = fm(i.key);
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
function zc(e, t) {
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
var Xo = jn({ document: au.nullable() }),
	Ik = jn({
		path: jt(),
		name: jt(),
		kind: Oc([ms("file"), ms("folder")]),
		nodeId: jt(),
		contentType: jt().nullable(),
		updatedAt: yr(),
	}),
	Lk = jn({ items: Ja(Ik), cursor: jt().nullable(), isDone: om() }),
	l_ = jn({ documents: Ja(au), cursor: jt().nullable(), isDone: om() }),
	qk = jn({
		items: Ja(jn({ fileNodeId: jt(), url: jt(), expiresAt: yr() })),
		errors: Ja(jn({ fileNodeId: jt(), message: jt() })),
		truncated: om(),
	});
function zn(e) {
	return e instanceof Error ? e.message : String(e);
}
function sh(e) {
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
function sc(e) {
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
function Uk(e, t) {
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
		for (const h of Qu) {
			const m = o.get(h);
			m === void 0 || m.size === 0 || f.push({ token: h, count: m.size, reactedByMe: m.has(t) });
		}
		u.set(s, f);
	}
	return u;
}
function $k(e) {
	const t = new Map();
	for (const i of e) {
		const u = vs(i.key);
		if (u === null) continue;
		const s = t.get(u);
		s === void 0
			? t.set(u, { count: 1, latestAt: i.timestamp })
			: ((s.count += 1), (s.latestAt = Math.max(s.latestAt, i.timestamp)));
	}
	return t;
}
function Bk(e, t) {
	return e > 99 && t ? "99+" : String(e);
}
var Vk = 3,
	Hk = 5e3,
	Zk = 3e4,
	Pk = "This message is too long to send. Shorten it and try again.",
	Qk = "Sending too fast — wait a moment and try again.";
function Kk(e) {
	return new TextEncoder().encode(JSON.stringify(e)).byteLength > Zk;
}
function Yk(e) {
	return new Promise((t) => setTimeout(t, e));
}
async function Ga(e, t, i) {
	try {
		for (let u = 1; ; u += 1) {
			const s = await e.backend.invoke({ endpoint: t, input: i });
			if ("_nay" in s) {
				if (s._nay.name === "busy" && u < Vk) {
					await Yk(Math.min(s._nay.retryAfterMs ?? 1e3, Hk));
					continue;
				}
				return s._nay.name === "busy"
					? { _nay: { name: "busy", message: Qk } }
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
var Gk = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
	Fk = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (t, i, u) => (u ? u.toUpperCase() : i.toLowerCase())),
	v0 = (e) => {
		const t = Fk(e);
		return t.charAt(0).toUpperCase() + t.slice(1);
	},
	s_ = (...e) =>
		e
			.filter((t, i, u) => !!t && t.trim() !== "" && u.indexOf(t) === i)
			.join(" ")
			.trim(),
	Xk = (e) => {
		for (const t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	},
	Jk = {
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
	Wk = (0, _.forwardRef)(
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
					...Jk,
					width: t,
					height: t,
					stroke: e,
					strokeWidth: u ? (Number(i) * 24) / Number(t) : i,
					className: s_("lucide", s),
					...(!o && !Xk(h) && { "aria-hidden": "true" }),
					...h,
				},
				[...f.map(([v, g]) => (0, _.createElement)(v, g)), ...(Array.isArray(o) ? o : [o])],
			),
	),
	dm = (e, t) => {
		const i = (0, _.forwardRef)(({ className: u, ...s }, o) =>
			(0, _.createElement)(Wk, { ref: o, iconNode: t, className: s_(`lucide-${Gk(v0(e))}`, `lucide-${e}`, u), ...s }),
		);
		return ((i.displayName = v0(e)), i);
	},
	eM = [
		["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
		["path", { d: "M12 19V5", key: "x0mq9r" }],
	],
	tM = dm("arrow-up", eM),
	nM = [
		["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
		["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
		["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
	],
	rM = dm("ellipsis", nM),
	iM = [
		[
			"path",
			{
				d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
				key: "1miecu",
			},
		],
	],
	aM = dm("paperclip", iM),
	il = uM();
function uM() {
	var e;
	return typeof window < "u" && !!((e = window.document) != null && e.createElement);
}
function xt(e) {
	return e ? ("self" in e ? e.document : e.ownerDocument || document) : document;
}
function o_(e) {
	return e ? ("self" in e ? e.self : xt(e).defaultView || window) : self;
}
function ji(e, t = !1) {
	const { activeElement: i } = xt(e);
	if (!i?.nodeName) return null;
	if (hm(i) && i.contentDocument) return ji(i.contentDocument.body, t);
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
function hm(e) {
	return e.tagName === "IFRAME";
}
function va(e) {
	const t = e.tagName.toLowerCase();
	return t === "button" ? !0 : t === "input" && e.type ? lM.indexOf(e.type) !== -1 : !1;
}
var lM = ["button", "color", "file", "image", "reset", "submit"];
function c_(e) {
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
function Uh(e) {
	return e.isContentEditable || ai(e);
}
function sM(e) {
	if (ai(e)) return e.value;
	if (e.isContentEditable) {
		const t = xt(e).createRange();
		return (t.selectNodeContents(e), t.toString());
	}
	return "";
}
function $h(e) {
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
function Dc(e, t) {
	const i = ["dialog", "menu", "listbox", "tree", "grid"],
		u = e?.getAttribute("role");
	return u && i.indexOf(u) !== -1 ? u : t;
}
function f_(e, t) {
	var i;
	const u = { menu: "menuitem", listbox: "option", tree: "treeitem" },
		s = Dc(e);
	return s && (i = u[s]) != null ? i : t;
}
function mm(e) {
	if (!e) return null;
	const t = (i) => i === "auto" || i === "scroll";
	if (e.clientHeight && e.scrollHeight > e.clientHeight) {
		const { overflowY: i } = getComputedStyle(e);
		if (t(i)) return e;
	} else if (e.clientWidth && e.scrollWidth > e.clientWidth) {
		const { overflowX: i } = getComputedStyle(e);
		if (t(i)) return e;
	}
	return mm(e.parentElement) || document.scrollingElement || document.body;
}
function oh(e, ...t) {
	/text|search|password|tel|url/i.test(e.type) && e.setSelectionRange(...t);
}
function d_(e, t) {
	const i = e.map((s, o) => [o, s]);
	let u = !1;
	return (
		i.sort(([s, o], [f, h]) => {
			const m = t(o),
				v = t(h);
			return m === v || !m || !v ? 0 : oM(m, v) ? (s > f && (u = !0), -1) : (s < f && (u = !0), 1);
		}),
		u ? i.map(([s, o]) => o) : e
	);
}
function oM(e, t) {
	return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
var cM = { id: null };
function fM(e, t, i = !1) {
	const u = e.findIndex((s) => s.id === t);
	return [...e.slice(u + 1), ...(i ? [cM] : []), ...e.slice(0, u)];
}
function dM(e, t) {
	return e.find((i) => (t ? !i.disabled && i.id !== t : !i.disabled));
}
function ha(e, t) {
	return (t && e.item(t)) || null;
}
function hM(e) {
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
function mM(e, t = !1) {
	if (ai(e)) e.setSelectionRange(t ? e.value.length : 0, e.value.length);
	else if (e.isContentEditable) {
		const i = xt(e).getSelection();
		(i?.selectAllChildren(e), t && i?.collapseToEnd());
	}
}
var Bh = Symbol("FOCUS_SILENTLY");
function vM(e) {
	((e[Bh] = !0), e.focus({ preventScroll: !0 }));
}
function gM(e) {
	const t = e[Bh];
	return (delete e[Bh], t);
}
function ss(e, t, i) {
	if (!t || t === i) return !1;
	const u = e.item(t.id);
	return !(!u || (i && u.element === i));
}
function os(...e) {}
function h_(e, t) {
	return yM(e) ? e(pM(t) ? t() : t) : e;
}
function yM(e) {
	return typeof e == "function";
}
function pM(e) {
	return typeof e == "function";
}
function Di(e, t) {
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
function bM(e, t) {
	const i = { ...e };
	for (const u of t) Di(i, u) && delete i[u];
	return i;
}
function _M(e, t) {
	const i = {};
	for (const u of t) Di(e, u) && (i[u] = e[u]);
	return i;
}
function v_(e) {
	return e;
}
function Jt(e, t) {
	if (!e) throw typeof t != "string" ? new Error("Invariant failed") : new Error(t);
}
function SM(e) {
	return Object.keys(e);
}
function jc(e, ...t) {
	const i = typeof e == "function" ? e(...t) : e;
	return i == null ? !1 : !i;
}
function _s(e) {
	return e.disabled || e["aria-disabled"] === !0 || e["aria-disabled"] === "true";
}
function uu(e) {
	const t = {};
	for (const i in e) e[i] !== void 0 && (t[i] = e[i]);
	return t;
}
function Ie(...e) {
	for (const t of e) if (t !== void 0) return t;
}
function Vh(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function wM(e) {
	return !e || !(0, _.isValidElement)(e) ? !1 : "ref" in e.props || "ref" in e;
}
function EM(e) {
	return wM(e) ? { ...e.props }.ref || e.ref : null;
}
function TM(e, t) {
	const i = { ...e };
	for (const u in t) {
		if (!Di(t, u)) continue;
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
	return il && !!navigator.maxTouchPoints;
}
function vm() {
	return il ? /mac|iphone|ipad|ipod/i.test(navigator.platform) : !1;
}
function Ic() {
	return il && vm() && /apple/i.test(navigator.vendor);
}
function xM() {
	return il && /firefox\//i.test(navigator.userAgent);
}
function AM() {
	return il && navigator.platform.startsWith("Mac") && !g_();
}
function y_(e) {
	return !!(e.currentTarget && !mn(e.currentTarget, e.target));
}
function gr(e) {
	return e.target === e.currentTarget;
}
function p_(e) {
	const t = e.currentTarget;
	if (!t) return !1;
	const i = vm();
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
function RM(e, t, i) {
	const u = new Event(t, i);
	return e.dispatchEvent(u);
}
function Bu(e, t) {
	const i = new FocusEvent("blur", t),
		u = e.dispatchEvent(i),
		s = { ...t, bubbles: !0 };
	return (e.dispatchEvent(new FocusEvent("focusout", s)), u);
}
function CM(e, t, i) {
	const u = new KeyboardEvent(t, i);
	return e.dispatchEvent(u);
}
function g0(e, t) {
	const i = new MouseEvent("click", t);
	return e.dispatchEvent(i);
}
function Qa(e, t) {
	const i = t || e.currentTarget,
		u = e.relatedTarget;
	return !u || !mn(i, u);
}
function Gu(e, t, i, u) {
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
var gm = { ..._ },
	y0 = gm.useId,
	ID = gm.useDeferredValue,
	p0 = gm.useInsertionEffect,
	ot = il ? _.useLayoutEffect : _.useEffect;
function kM(e) {
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
		p0
			? p0(() => {
					t.current = e;
				})
			: (t.current = e),
		(0, _.useCallback)((...i) => {
			var u;
			return (u = t.current) == null ? void 0 : u.call(t, ...i);
		}, [])
	);
}
function MM(e) {
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
				for (const i of e) Vh(i, t);
			};
	}, e);
}
function Ii(e) {
	if (y0) {
		const u = y0();
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
function NM(e, t, i) {
	const u = kM(i),
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
function al(e, t) {
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
function OM(e, t) {
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
function ym(e = !1, t) {
	const [i, u] = (0, _.useState)(null);
	return { portalRef: Wt(u, t), portalNode: i, domReady: !e || i };
}
function E_(e, t, i) {
	const u = e.onLoadedMetadataCapture,
		s = (0, _.useMemo)(() => Object.assign(() => {}, { ...u, [t]: i }), [u, t, i]);
	return [u?.[t], { onLoadedMetadataCapture: s }];
}
var b0 = !1;
function pm() {
	return (
		(0, _.useEffect)(() => {
			b0 ||
				(Rn("mousemove", DM, !0),
				Rn("mousedown", Jo, !0),
				Rn("mouseup", Jo, !0),
				Rn("keydown", Jo, !0),
				Rn("scroll", Jo, !0),
				(b0 = !0));
		}, []),
		De(() => bm)
	);
}
var bm = !1,
	_0 = 0,
	S0 = 0;
function zM(e) {
	const t = e.movementX || e.screenX - _0,
		i = e.movementY || e.screenY - S0;
	return ((_0 = e.screenX), (S0 = e.screenY), t || i || !1);
}
function DM(e) {
	zM(e) && (bm = !0);
}
function Jo() {
	bm = !1;
}
var jM = Lr((e) => {
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
	IM = Lr((e, t) => {
		t.exports = jM();
	}),
	w = IM();
function Fe(e) {
	const t = _.forwardRef((i, u) => e({ ...i, ref: u }));
	return ((t.displayName = e.displayName || e.name), t);
}
function Lc(e, t) {
	return _.memo(e, t);
}
function We(e, t) {
	const { wrapElement: i, render: u, ...s } = t,
		o = Wt(t.ref, EM(u));
	let f;
	if (_.isValidElement(u)) {
		const h = { ...u.props, ref: o };
		f = _.cloneElement(u, TM(s, h));
	} else u ? (f = u(s)) : (f = (0, w.jsx)(e, { ...s }));
	return i ? i(f) : f;
}
function tt(e) {
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
var Ss = ui(),
	LM = Ss.useContext,
	LD = Ss.useScopedContext,
	qD = Ss.useProviderContext,
	qM = Ss.ContextProvider,
	UM = Ss.ScopedContextProvider,
	ws = ui([qM], [UM]),
	qc = ws.useContext,
	UD = ws.useScopedContext,
	$M = ws.useProviderContext,
	Es = ws.ContextProvider,
	Uc = ws.ScopedContextProvider,
	BM = (0, _.createContext)(void 0),
	VM = (0, _.createContext)(void 0),
	T_ = (0, _.createContext)(!0),
	$c =
		"input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], summary, iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])";
function HM(e) {
	return Number.parseInt(e.getAttribute("tabindex") || "0", 10) < 0;
}
function Kr(e) {
	return !(!e.matches($c) || !c_(e) || e.closest("[inert]"));
}
function tl(e) {
	if (!Kr(e) || HM(e)) return !1;
	if (!("form" in e) || !e.form || e.checked || e.type !== "radio") return !0;
	const t = e.form.elements.namedItem(e.name);
	if (!t || !("length" in t)) return !0;
	const i = ji(e);
	return !i || i === e || !("form" in i) || i.form !== e.form || i.name !== e.name;
}
function _m(e, t) {
	const i = Array.from(e.querySelectorAll($c));
	t && i.unshift(e);
	const u = i.filter(Kr);
	return (
		u.forEach((s, o) => {
			if (hm(s) && s.contentDocument) {
				const f = s.contentDocument.body;
				u.splice(o, 1, ..._m(f));
			}
		}),
		u
	);
}
function Bc(e, t, i) {
	const u = Array.from(e.querySelectorAll($c)),
		s = u.filter(tl);
	return (
		t && tl(e) && s.unshift(e),
		s.forEach((o, f) => {
			if (hm(o) && o.contentDocument) {
				const h = o.contentDocument.body,
					m = Bc(h, !1, i);
				s.splice(f, 1, ...m);
			}
		}),
		!s.length && i ? u : s
	);
}
function ZM(e, t, i) {
	const [u] = Bc(e, t, i);
	return u || null;
}
function PM(e, t, i, u) {
	const s = ji(e),
		o = _m(e, t),
		f = o.indexOf(s),
		h = o.slice(f + 1);
	return h.find(tl) || (i ? o.find(tl) : null) || (u ? h[0] : null) || null;
}
function ch(e, t) {
	return PM(document.body, !1, e, t);
}
function QM(e, t, i, u) {
	const s = ji(e),
		o = _m(e, t).reverse(),
		f = o.indexOf(s),
		h = o.slice(f + 1);
	return h.find(tl) || (i ? o.find(tl) : null) || (u ? h[0] : null) || null;
}
function w0(e, t) {
	return QM(document.body, !1, e, t);
}
function KM(e) {
	for (; e && !Kr(e); ) e = e.closest($c);
	return e || null;
}
function eu(e) {
	const t = ji(e);
	if (!t) return !1;
	if (t === e) return !0;
	const i = t.getAttribute("aria-activedescendant");
	return i ? i === e.id : !1;
}
function ma(e) {
	const t = ji(e);
	if (!t) return !1;
	if (mn(e, t)) return !0;
	const i = t.getAttribute("aria-activedescendant");
	return !i || !("id" in e) ? !1 : i === e.id ? !0 : !!e.querySelector(`#${CSS.escape(i)}`);
}
function x_(e) {
	!ma(e) && Kr(e) && e.focus();
}
function YM(e) {
	var t;
	const i = (t = e.getAttribute("tabindex")) != null ? t : "";
	(e.setAttribute("data-tabindex", i), e.setAttribute("tabindex", "-1"));
}
function GM(e, t) {
	const i = Bc(e, t);
	for (const u of i) YM(u);
}
function FM(e) {
	const t = e.querySelectorAll("[data-tabindex]"),
		i = (u) => {
			const s = u.getAttribute("data-tabindex");
			(u.removeAttribute("data-tabindex"), s ? u.setAttribute("tabindex", s) : u.removeAttribute("tabindex"));
		};
	e.hasAttribute("data-tabindex") && i(e);
	for (const u of t) i(u);
}
function XM(e, t) {
	"scrollIntoView" in e
		? (e.focus({ preventScroll: !0 }), e.scrollIntoView({ block: "nearest", inline: "nearest", ...t }))
		: e.focus();
}
var JM = "div",
	E0 = Ic(),
	WM = [
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
function eN(e) {
	return e ? !!e[A_] : !1;
}
function T0(e, t) {
	e && (e[A_] = t);
}
function tN(e) {
	const { tagName: t, readOnly: i, type: u } = e;
	return (t === "TEXTAREA" && !i) || (t === "SELECT" && !i)
		? !0
		: t === "INPUT" && !i
			? WM.includes(u)
			: !!(e.isContentEditable || (e.getAttribute("role") === "combobox" && e.dataset.name));
}
function nN(e) {
	return "labels" in e ? e.labels : null;
}
function x0(e) {
	return e.tagName.toLowerCase() === "input" && e.type ? e.type === "radio" || e.type === "checkbox" : !1;
}
function rN(e) {
	return e ? e === "button" || e === "summary" || e === "input" || e === "select" || e === "textarea" || e === "a" : !0;
}
function iN(e) {
	return e ? e === "button" || e === "input" || e === "select" || e === "textarea" : !0;
}
function aN(e, t, i, u, s) {
	return e ? (t ? (i && !u ? -1 : void 0) : i ? s : s || 0) : s;
}
function fh(e, t) {
	return De((i) => {
		(e?.(i), !i.defaultPrevented && t && (i.stopPropagation(), i.preventDefault()));
	});
}
var A0 = !1,
	Sm = !0;
function uN(e) {
	const t = e.target;
	t && "hasAttribute" in t && (t.hasAttribute("data-focus-visible") || (Sm = !1));
}
function lN(e) {
	e.metaKey || e.ctrlKey || e.altKey || (Sm = !0);
}
var Ts = tt(function ({ focusable: t = !0, accessibleWhenDisabled: i, autoFocus: u, onFocusVisible: s, ...o }) {
		const f = (0, _.useRef)(null);
		((0, _.useEffect)(() => {
			t && (A0 || (Rn("mousedown", uN, !0), Rn("keydown", lN, !0), (A0 = !0)));
		}, [t]),
			E0 &&
				(0, _.useEffect)(() => {
					if (!t) return;
					const te = f.current;
					if (!te || !x0(te)) return;
					const fe = nN(te);
					if (!fe) return;
					const j = () => queueMicrotask(() => te.focus());
					for (const B of fe) B.addEventListener("mouseup", j);
					return () => {
						for (const B of fe) B.removeEventListener("mouseup", j);
					};
				}, [t]));
		const h = t && _s(o),
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
					Kr(te) || g(!1);
				});
				return (fe.observe(te), () => fe.disconnect());
			}, [t, v]));
		const S = fh(o.onKeyPressCapture, h),
			b = fh(o.onMouseDownCapture, h),
			p = fh(o.onClickCapture, h),
			x = o.onMouseDown,
			A = De((te) => {
				if ((x?.(te), te.defaultPrevented || !t)) return;
				const fe = te.currentTarget;
				if (!E0 || y_(te) || (!va(fe) && !x0(fe))) return;
				let j = !1;
				const B = () => {
					j = !0;
				};
				fe.addEventListener("focusin", B, { capture: !0, once: !0 });
				const P = KM(fe.parentElement);
				(T0(P, !0),
					Gu(fe, "mouseup", () => {
						(fe.removeEventListener("focusin", B, !0), T0(P, !1), !j && x_(fe));
					}));
			}),
			N = (te, fe) => {
				if ((fe && (te.currentTarget = fe), !t)) return;
				const j = te.currentTarget;
				j && eu(j) && (s?.(te), !te.defaultPrevented && ((j.dataset.focusVisible = "true"), g(!0)));
			},
			q = o.onKeyDownCapture,
			I = De((te) => {
				if ((q?.(te), te.defaultPrevented || !t || v || te.metaKey || te.altKey || te.ctrlKey || !gr(te))) return;
				const fe = te.currentTarget;
				Gu(fe, "focusout", () => N(te, fe));
			}),
			C = o.onFocusCapture,
			k = De((te) => {
				if ((C?.(te), te.defaultPrevented || !t)) return;
				if (!gr(te)) {
					g(!1);
					return;
				}
				const fe = te.currentTarget,
					j = () => N(te, fe);
				Sm || tN(te.target) ? Gu(te.target, "focusout", j) : g(!1);
			}),
			L = o.onBlur,
			Q = De((te) => {
				(L?.(te), t && Qa(te) && (te.currentTarget.removeAttribute("data-focus-visible"), g(!1)));
			}),
			K = (0, _.useContext)(T_),
			O = De((te) => {
				t &&
					u &&
					te &&
					K &&
					queueMicrotask(() => {
						eu(te) || (Kr(te) && te.focus());
					});
			}),
			$ = S_(f),
			V = t && rN($),
			Y = t && iN($),
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
				tabIndex: aN(t, m, V, Y, o.tabIndex),
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
			uu(o)
		);
	}),
	$D = Fe(function (t) {
		return We(JM, Ts(t));
	});
function R_(e) {
	const t = [];
	for (const i of e) t.push(...i);
	return t;
}
function Hh(e) {
	return e.slice().reverse();
}
var sN = "div";
function oN(e) {
	return e.some((t) => !!t.rowId);
}
function cN(e) {
	const t = e.target;
	return t && !ai(t) ? !1 : e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
function fN(e) {
	return e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta";
}
function R0(e, t, i) {
	return De((u) => {
		var s;
		if ((t?.(u), u.defaultPrevented || u.isPropagationStopped() || !gr(u) || fN(u) || cN(u))) return;
		const o = (s = ha(e, e.getState().activeId)) == null ? void 0 : s.element;
		if (!o) return;
		const { view: f, ...h } = u;
		(o !== i?.current && o.focus(),
			CM(o, u.type, h) || u.preventDefault(),
			u.currentTarget.contains(o) && u.stopPropagation());
	});
}
function dN(e) {
	return dM(R_(Hh(hM(e))));
}
function hN(e) {
	const [t, i] = (0, _.useState)(!1),
		u = (0, _.useCallback)(() => i(!0), []),
		s = e.useState((o) => ha(e, o.activeId));
	return (
		(0, _.useEffect)(() => {
			const o = s?.element;
			t && o && (i(!1), o.focus({ preventScroll: !0 }));
		}, [s, t]),
		u
	);
}
var wm = tt(function ({ store: t, composite: i = !0, focusOnMove: u = i, moveOnKeyPress: s = !0, ...o }) {
		const f = $M();
		((t = t || f), Jt(t, !1));
		const h = (0, _.useRef)(null),
			m = (0, _.useRef)(null),
			v = hN(t),
			g = t.useState("moves"),
			[, S] = MM(i ? t.setBaseElement : null);
		((0, _.useEffect)(() => {
			var $;
			if (!t || !g || !i || !u) return;
			const { activeId: V } = t.getState(),
				Y = ($ = ha(t, V)) == null ? void 0 : $.element;
			Y && XM(Y);
		}, [t, g, i, u]),
			ot(() => {
				if (!t || !g || !i) return;
				const { baseElement: $, activeId: V } = t.getState();
				if (V !== null || !$) return;
				const Y = m.current;
				((m.current = null), Y && Bu(Y, { relatedTarget: $ }), eu($) || $.focus());
			}, [t, g, i]));
		const b = t.useState("activeId"),
			p = t.useState("virtualFocus");
		ot(() => {
			var $;
			if (!t || !i || !p) return;
			const V = m.current;
			if (((m.current = null), !V)) return;
			const Y = (($ = ha(t, b)) == null ? void 0 : $.element) || ji(V);
			Y !== V && Bu(V, { relatedTarget: Y });
		}, [t, b, p, i]);
		const x = R0(t, o.onKeyDownCapture, m),
			A = R0(t, o.onKeyUpCapture, m),
			N = o.onFocusCapture,
			q = De(($) => {
				if ((N?.($), $.defaultPrevented || !t)) return;
				const { virtualFocus: V } = t.getState();
				if (!V) return;
				const Y = $.relatedTarget,
					ae = gM($.currentTarget);
				gr($) && ae && ($.stopPropagation(), (m.current = Y));
			}),
			I = o.onFocus,
			C = De(($) => {
				if ((I?.($), $.defaultPrevented || !i || !t)) return;
				const { relatedTarget: V } = $,
					{ virtualFocus: Y } = t.getState();
				Y ? gr($) && !ss(t, V) && queueMicrotask(v) : gr($) && t.setActiveId(null);
			}),
			k = o.onBlurCapture,
			L = De(($) => {
				var V;
				if ((k?.($), $.defaultPrevented || !t)) return;
				const { virtualFocus: Y, activeId: ae } = t.getState();
				if (!Y) return;
				const se = (V = ha(t, ae)) == null ? void 0 : V.element,
					te = $.relatedTarget,
					fe = ss(t, te),
					j = m.current;
				((m.current = null),
					gr($) && fe
						? (te === se ? j && j !== te && Bu(j, $) : se ? Bu(se, $) : j && Bu(j, $), $.stopPropagation())
						: !ss(t, $.target) && se && Bu(se, $));
			}),
			Q = o.onKeyDown,
			K = Mt(s),
			O = De(($) => {
				var V;
				if ((Q?.($), $.nativeEvent.isComposing || $.defaultPrevented || !t || !gr($))) return;
				const { orientation: Y, renderedItems: ae, activeId: se } = t.getState(),
					te = ha(t, se);
				if ((V = te?.element) != null && V.isConnected) return;
				const fe = Y !== "horizontal",
					j = Y !== "vertical",
					B = oN(ae);
				if (
					($.key === "ArrowLeft" || $.key === "ArrowRight" || $.key === "Home" || $.key === "End") &&
					ai($.currentTarget)
				)
					return;
				const ve = {
					ArrowUp:
						(B || fe) &&
						(() => {
							if (B) {
								const be = dN(ae);
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
				if (ve) {
					const be = ve();
					if (be !== void 0) {
						if (!K($)) return;
						($.preventDefault(), t.move(be));
					}
				}
			});
		return (
			(o = Cn(o, ($) => (0, w.jsx)(Es, { value: t, children: $ }), [t])),
			(o = {
				"aria-activedescendant": t.useState(($) => {
					var V;
					if (t && i && $.virtualFocus) return (V = ha(t, $.activeId)) == null ? void 0 : V.id;
				}),
				...o,
				ref: Wt(h, S, o.ref),
				onKeyDownCapture: x,
				onKeyUpCapture: A,
				onFocusCapture: q,
				onFocus: C,
				onBlurCapture: L,
				onKeyDown: O,
			}),
			(o = Ts({ focusable: t.useState(($) => i && ($.virtualFocus || $.activeId === null)), ...o })),
			o
		);
	}),
	BD = Fe(function (t) {
		return We(sN, wm(t));
	}),
	xs = ui(),
	VD = xs.useContext,
	HD = xs.useScopedContext,
	Em = xs.useProviderContext,
	mN = xs.ContextProvider,
	vN = xs.ScopedContextProvider,
	As = ui([mN], [vN]),
	ZD = As.useContext,
	PD = As.useScopedContext,
	Vc = As.useProviderContext,
	gN = As.ContextProvider,
	Tm = As.ScopedContextProvider,
	yN = (0, _.createContext)(void 0),
	pN = (0, _.createContext)(void 0),
	Rs = ui([gN], [Tm]),
	QD = Rs.useContext,
	KD = Rs.useScopedContext,
	Hc = Rs.useProviderContext,
	C_ = Rs.ContextProvider,
	Zc = Rs.ScopedContextProvider,
	bN = "div",
	xm = tt(function ({ store: t, ...i }) {
		const u = Hc();
		return ((t = t || u), (i = { ...i, ref: Wt(t?.setAnchorElement, i.ref) }), i);
	}),
	YD = Fe(function (t) {
		return We(bN, xm(t));
	}),
	k_ = (0, _.createContext)(void 0),
	Cs = ui([C_, Es], [Zc, Uc]),
	_N = Cs.useContext,
	M_ = Cs.useScopedContext,
	Pc = Cs.useProviderContext,
	GD = Cs.ContextProvider,
	SN = Cs.ScopedContextProvider,
	wN = (0, _.createContext)(void 0),
	EN = (0, _.createContext)(!1);
function lu(e, t) {
	const i = e.__unstableInternals;
	return (Jt(i, "Invalid store"), i[t]);
}
function Yr(e, ...t) {
	let i = e,
		u = i,
		s = Symbol(),
		o = os;
	const f = new Set(),
		h = new Set(),
		m = new Set(),
		v = new Set(),
		g = new Set(),
		S = new WeakMap(),
		b = new WeakMap(),
		p = (O) => (m.add(O), () => m.delete(O)),
		x = () => {
			const O = f.size,
				$ = Symbol();
			f.add($);
			const V = () => {
				(f.delete($), !f.size && o());
			};
			if (O) return V;
			const Y = SM(i).map((te) =>
					rr(
						...t.map((fe) => {
							var j;
							const B = (j = fe?.getState) == null ? void 0 : j.call(fe);
							if (B && Di(B, te))
								return Dn(fe, [te], (P) => {
									Q(te, P[te], !0);
								});
						}),
					),
				),
				ae = [];
			for (const te of m) ae.push(te());
			const se = t.map(Am);
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
		C = (O) => Yr(_M(i, O), K),
		k = (O) => Yr(bM(i, O), K),
		L = () => i,
		Q = (O, $, V = !1) => {
			var Y;
			if (!Di(i, O)) return;
			const ae = h_($, i[O]);
			if (ae === i[O]) return;
			if (!V) for (const j of t) (Y = j?.setState) == null || Y.call(j, O, ae);
			const se = i;
			i = { ...i, [O]: ae };
			const te = Symbol();
			((s = te), h.add(O));
			const fe = (j, B, P) => {
				var ve;
				const be = b.get(j),
					Pe = (M) => (P ? P.has(M) : M === O);
				(!be || be.some(Pe)) && ((ve = S.get(j)) == null || ve(), S.set(j, j(i, B)));
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
			__unstableInternals: { setup: p, init: x, subscribe: N, sync: q, batch: I, pick: C, omit: k },
		};
	return K;
}
function Zn(e, ...t) {
	if (e) return lu(e, "setup")(...t);
}
function Am(e, ...t) {
	if (e) return lu(e, "init")(...t);
}
function Rm(e, ...t) {
	if (e) return lu(e, "subscribe")(...t);
}
function Dn(e, ...t) {
	if (e) return lu(e, "sync")(...t);
}
function wc(e, ...t) {
	if (e) return lu(e, "batch")(...t);
}
function Cm(e, ...t) {
	if (e) return lu(e, "omit")(...t);
}
function N_(e, ...t) {
	if (e) return lu(e, "pick")(...t);
}
function Qc(...e) {
	var t;
	const i = {};
	for (const s of e) {
		const o = (t = s?.getState) == null ? void 0 : t.call(s);
		o && Object.assign(i, o);
	}
	const u = Yr(i, ...e);
	return Object.assign({}, ...e, u);
}
var TN = "input";
function C0(e, t, i) {
	if (!i) return !1;
	const u = e.find((s) => !s.disabled && s.value);
	return u?.value === t;
}
function k0(e, t) {
	return !t || e == null ? !1 : ((e = m_(e)), t.length > e.length && t.toLowerCase().indexOf(e.toLowerCase()) === 0);
}
function xN(e) {
	return e.type === "input";
}
function AN(e) {
	return e === "inline" || e === "list" || e === "both" || e === "none";
}
function RN(e) {
	const t = e.find((i) => {
		var u;
		return i.disabled ? !1 : ((u = i.element) == null ? void 0 : u.getAttribute("role")) !== "tab";
	});
	return t?.id;
}
var CN = tt(function ({
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
		moveOnKeyPress: x = !0,
		autoComplete: A = "list",
		...N
	}) {
		const q = Pc();
		((t = t || q), Jt(t, !1));
		const I = (0, _.useRef)(null),
			[C, k] = w_(),
			L = (0, _.useRef)(!1),
			Q = (0, _.useRef)(!1),
			K = t.useState((ce) => ce.virtualFocus && u),
			O = A === "inline" || A === "both",
			[$, V] = (0, _.useState)(O);
		OM(() => {
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
				if (C0(te, se, K)) {
					if (k0(Y, se)) {
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
				if (!O || !$ || !se || !C0(te, se, K) || !k0(Y, se)) return;
				let ce = os;
				return (
					queueMicrotask(() => {
						const ze = I.current;
						if (!ze) return;
						const { start: rt, end: Ne } = $h(ze),
							bt = Y.length,
							pn = se.length;
						(oh(ze, bt, pn),
							(ce = () => {
								if (!eu(ze)) return;
								const { start: ut, end: Vt } = $h(ze);
								ut === bt && Vt === pn && oh(ze, rt, Ne);
							}));
					}),
					() => ce()
				);
			}, [C, O, $, se, te, K, Y]));
		const P = (0, _.useRef)(null),
			ve = De(s),
			be = (0, _.useRef)(null);
		((0, _.useEffect)(() => {
			if (!fe || !j) return;
			const ce = mm(j);
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
		(al(() => {
			var ce, ze;
			const rt = L.current;
			if (!t || !fe || (!rt && !Pe)) return;
			const { baseElement: Ne, contentElement: bt, activeId: pn } = t.getState();
			if (!(Ne && !eu(Ne))) {
				if (bt?.hasAttribute("data-placing")) {
					const ut = new MutationObserver(k);
					return (ut.observe(bt, { attributeFilter: ["data-placing"] }), () => ut.disconnect());
				}
				if (K && rt) {
					const ut = ve(te),
						Vt = ut !== void 0 ? ut : (ce = RN(te)) != null ? ce : t.first();
					((be.current = Vt), t.move(Vt ?? null));
				} else {
					const ut = (ze = t.item(pn || t.first())) == null ? void 0 : ze.element;
					ut && "scrollIntoView" in ut && ut.scrollIntoView({ block: "nearest", inline: "nearest" });
				}
			}
		}, [t, fe, C, Y, K, Pe, ve, te]),
			(0, _.useEffect)(() => {
				if (!O) return;
				const ce = I.current;
				if (!ce) return;
				const ze = [ce, j].filter((Ne) => !!Ne),
					rt = (Ne) => {
						ze.every((bt) => Qa(Ne, bt)) && t?.setValue(B);
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
			he = De((ce) => {
				if ((D?.(ce), ce.defaultPrevented || !t)) return;
				const ze = ce.currentTarget,
					{ value: rt, selectionStart: Ne, selectionEnd: bt } = ze,
					pn = ce.nativeEvent;
				if (((L.current = !0), xN(pn) && (pn.isComposing && ((L.current = !1), (Q.current = !0)), O))) {
					const ut = pn.inputType === "insertText" || pn.inputType === "insertCompositionText",
						Vt = Ne === rt.length;
					V(ut && Vt);
				}
				if (oe(ce)) {
					const ut = rt === t.getState().value;
					(t.setValue(rt),
						queueMicrotask(() => {
							oh(ze, Ne, bt);
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
								At(ce) && Gu(ce.currentTarget, "mouseup", t.show)))));
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
			Ve = Ii(N.id),
			Bt = AN(A) ? A : void 0,
			et = t.useState((ce) => ce.activeId === null);
		return (
			(N = {
				id: Ve,
				role: "combobox",
				"aria-autocomplete": Bt,
				"aria-haspopup": Dc(j, "listbox"),
				"aria-expanded": fe,
				"aria-controls": j?.id,
				"data-active-item": et || void 0,
				value: B,
				...N,
				ref: Wt(I, N.ref),
				onChange: he,
				onCompositionEnd: Re,
				onMouseDown: vn,
				onKeyDown: ye,
				onBlur: nt,
			}),
			(N = wm({ store: t, focusable: i, ...N, moveOnKeyPress: (ce) => (jc(x, ce) ? !1 : (O && V(!0), !0)) })),
			(N = xm({ store: t, ...N })),
			{ autoComplete: "off", ...N }
		);
	}),
	kN = Fe(function (t) {
		return We(TN, CN(t));
	}),
	MN = "button";
function M0(e) {
	if (!e.isTrusted) return !1;
	const t = e.currentTarget;
	return e.key === "Enter"
		? va(t) || t.tagName === "SUMMARY" || t.tagName === "A"
		: e.key === " "
			? va(t) || t.tagName === "SUMMARY" || t.tagName === "INPUT" || t.tagName === "SELECT"
			: !1;
}
var NN = Symbol("command"),
	km = tt(function ({ clickOnEnter: t = !0, clickOnSpace: i = !0, ...u }) {
		const s = (0, _.useRef)(null),
			[o, f] = (0, _.useState)(!1);
		(0, _.useEffect)(() => {
			s.current && f(va(s.current));
		}, []);
		const [h, m] = (0, _.useState)(!1),
			v = (0, _.useRef)(!1),
			g = _s(u),
			[S, b] = E_(u, NN, !0),
			p = u.onKeyDown,
			x = De((q) => {
				p?.(q);
				const I = q.currentTarget;
				if (q.defaultPrevented || S || g || !gr(q) || ai(I) || I.isContentEditable) return;
				const C = t && q.key === "Enter",
					k = i && q.key === " ",
					L = q.key === "Enter" && !t,
					Q = q.key === " " && !i;
				if (L || Q) {
					q.preventDefault();
					return;
				}
				if (C || k) {
					const K = M0(q);
					if (C) {
						if (!K) {
							q.preventDefault();
							const { view: O, ...$ } = q,
								V = () => g0(I, $);
							xM() ? Gu(I, "keyup", V) : queueMicrotask(V);
						}
					} else k && ((v.current = !0), K || (q.preventDefault(), m(!0)));
				}
			}),
			A = u.onKeyUp,
			N = De((q) => {
				if ((A?.(q), q.defaultPrevented || S || g || q.metaKey)) return;
				const I = i && q.key === " ";
				if (v.current && I && ((v.current = !1), !M0(q))) {
					(q.preventDefault(), m(!1));
					const C = q.currentTarget,
						{ view: k, ...L } = q;
					queueMicrotask(() => g0(C, L));
				}
			});
		return (
			(u = {
				"data-active": h || void 0,
				type: o ? "button" : void 0,
				...b,
				...u,
				ref: Wt(s, u.ref),
				onKeyDown: x,
				onKeyUp: N,
			}),
			(u = Ts(u)),
			u
		);
	}),
	FD = Fe(function (t) {
		return We(MN, km(t));
	}),
	O_ = "button",
	z_ = tt(function (t) {
		const i = (0, _.useRef)(null),
			u = S_(i, O_),
			[s, o] = (0, _.useState)(() => !!u && va({ tagName: u, type: t.type }));
		return (
			(0, _.useEffect)(() => {
				i.current && o(va(i.current));
			}, []),
			(t = { role: !s && u !== "a" ? "button" : void 0, ...t, ref: Wt(i, t.ref) }),
			(t = km(t)),
			t
		);
	}),
	XD = Fe(function (t) {
		return We(O_, z_(t));
	}),
	ON = "button",
	zN = Symbol("disclosure"),
	D_ = tt(function ({ store: t, toggleOnClick: i = !0, ...u }) {
		const s = Em();
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
			[b, p] = E_(u, zN, !0),
			x = De((N) => {
				(g?.(N), !N.defaultPrevented && (b || (S(N) && (t?.setDisclosureElement(N.currentTarget), t?.toggle()))));
			}),
			A = t.useState("contentElement");
		return (
			(u = { "aria-expanded": f, "aria-controls": A?.id, ...p, ...u, ref: Wt(o, u.ref), onClick: x }),
			(u = z_(u)),
			u
		);
	}),
	JD = Fe(function (t) {
		return We(ON, D_(t));
	}),
	DN = "button",
	j_ = tt(function ({ store: t, ...i }) {
		const u = Vc();
		return (
			(t = t || u),
			Jt(t, !1),
			(i = { "aria-haspopup": Dc(t.useState("contentElement"), "dialog"), ...i }),
			(i = D_({ store: t, ...i })),
			i
		);
	}),
	WD = Fe(function (t) {
		return We(DN, j_(t));
	}),
	jN = "div";
function I_(e) {
	const t = e.relatedTarget;
	return t?.nodeType === Node.ELEMENT_NODE ? t : null;
}
function IN(e) {
	const t = I_(e);
	return t ? mn(e.currentTarget, t) : !1;
}
var Zh = Symbol("composite-hover");
function LN(e) {
	let t = I_(e);
	if (!t) return !1;
	do {
		if (Di(t, Zh) && t[Zh]) return !0;
		t = t.parentElement;
	} while (t);
	return !1;
}
var Mm = tt(function ({ store: t, focusOnHover: i = !0, blurOnHoverEnd: u = !!i, ...s }) {
		const o = qc();
		((t = t || o), Jt(t, !1));
		const f = pm(),
			h = s.onMouseMove,
			m = Mt(i),
			v = De((x) => {
				if ((h?.(x), !x.defaultPrevented && f() && m(x))) {
					if (!ma(x.currentTarget)) {
						const A = t?.getState().baseElement;
						A && !eu(A) && A.focus();
					}
					t?.setActiveId(x.currentTarget.id);
				}
			}),
			g = s.onMouseLeave,
			S = Mt(u),
			b = De((x) => {
				var A;
				(g?.(x),
					!x.defaultPrevented &&
						f() &&
						(IN(x) ||
							LN(x) ||
							(m(x) && S(x) && (t?.setActiveId(null), (A = t?.getState().baseElement) == null || A.focus()))));
			}),
			p = (0, _.useCallback)((x) => {
				x && (x[Zh] = !0);
			}, []);
		return ((s = { ...s, ref: Wt(p, s.ref), onMouseMove: v, onMouseLeave: b }), uu(s));
	}),
	ej = Lc(
		Fe(function (t) {
			return We(jN, Mm(t));
		}),
	),
	qN = "div",
	L_ = tt(function ({ store: t, shouldRegisterItem: i = !0, getItem: u = v_, element: s, ...o }) {
		const f = LM();
		t = t || f;
		const h = Ii(o.id),
			m = (0, _.useRef)(s);
		return (
			(0, _.useEffect)(() => {
				const v = m.current;
				if (!h || !v || !i) return;
				const g = u({ id: h, element: v });
				return t?.renderItem(g);
			}, [h, i, u, t]),
			(o = { ...o, ref: Wt(m, o.ref) }),
			uu(o)
		);
	}),
	tj = Fe(function (t) {
		return We(qN, L_(t));
	}),
	UN = Lr((e) => {
		var t = Cc();
		function i(b, p) {
			return (b === p && (b !== 0 || 1 / b === 1 / p)) || (b !== b && p !== p);
		}
		var u = typeof Object.is == "function" ? Object.is : i,
			s = t.useState,
			o = t.useEffect,
			f = t.useLayoutEffect,
			h = t.useDebugValue;
		function m(b, p) {
			var x = p(),
				A = s({ inst: { value: x, getSnapshot: p } }),
				N = A[0].inst,
				q = A[1];
			return (
				f(
					function () {
						((N.value = x), (N.getSnapshot = p), v(N) && q({ inst: N }));
					},
					[b, x, p],
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
				h(x),
				x
			);
		}
		function v(b) {
			var p = b.getSnapshot;
			b = b.value;
			try {
				var x = p();
				return !u(b, x);
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
	$N = Lr((e, t) => {
		t.exports = UN();
	}),
	BN = mb($N(), 1),
	{ useSyncExternalStore: q_ } = BN.default,
	U_ = () => () => {};
function dn(e, t = v_) {
	const i = _.useCallback((s) => (e ? Rm(e, null, s) : U_()), [e]),
		u = () => {
			const s = typeof t == "string" ? t : null,
				o = typeof t == "function" ? t : null,
				f = e?.getState();
			if (o) return o(f);
			if (f && s && Di(f, s)) return f[s];
		};
	return q_(i, u, u);
}
function $_(e, t) {
	const i = _.useRef({}),
		u = _.useCallback((o) => (e ? Rm(e, null, o) : U_()), [e]),
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
					if (!o || !Di(o, v)) continue;
					const g = o[v];
					g !== h[m] && ((h[m] = g), (f = !0));
				}
			}
			return (f && (i.current = { ...h }), i.current);
		};
	return q_(u, s, s);
}
function Xt(e, t, i, u) {
	const s = Di(t, i) ? t[i] : void 0,
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
					wc(e, [i], () => {
						s !== void 0 && e.setState(i, s);
					})
				);
		}));
}
function Kc(e, t) {
	const [i, u] = _.useState(() => e(t));
	ot(() => Am(i), [i]);
	const s = _.useCallback((o) => dn(i, o), [i]);
	return [
		_.useMemo(() => ({ ...i, useState: s }), [i, s]),
		De(() => {
			u((o) => e({ ...t, ...o.getState() }));
		}),
	];
}
var VN = "button";
function HN(e) {
	return Uh(e) ? !0 : e.tagName === "INPUT" && !va(e);
}
function ZN(e, t = !1) {
	const i = e.clientHeight,
		{ top: u } = e.getBoundingClientRect(),
		s = Math.max(i * 0.875, i - 40) * 1.5,
		o = t ? i - s + u : s + u;
	return e.tagName === "HTML" ? o + e.scrollTop : o;
}
function PN(e, t = !1) {
	const { top: i } = e.getBoundingClientRect();
	return t ? i + e.clientHeight : i;
}
function N0(e, t, i, u = !1) {
	var s;
	if (!t || !i) return;
	const { renderedItems: o } = t.getState(),
		f = mm(e);
	if (!f) return;
	const h = ZN(f, u);
	let m, v;
	for (let g = 0; g < o.length; g += 1) {
		const S = m;
		if (((m = i(g)), !m)) break;
		if (m === S) continue;
		const b = (s = ha(t, m)) == null ? void 0 : s.element;
		if (!b) continue;
		const p = PN(b, u) - h,
			x = Math.abs(p);
		if ((u && p <= 0) || (!u && p >= 0)) {
			v !== void 0 && v < x && (m = S);
			break;
		}
		v = x;
	}
	return m;
}
function QN(e, t) {
	return gr(e) ? !1 : ss(t, e.target);
}
var Nm = tt(function ({
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
		const g = qc();
		t = t || g;
		const S = Ii(v.id),
			b = (0, _.useRef)(null),
			p = (0, _.useContext)(VM),
			x = _s(v) && !v.accessibleWhenDisabled,
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
						disabled: !!x,
						children: (B = j.element) == null ? void 0 : B.textContent,
					};
					return f ? f(P) : P;
				},
				[S, A, x, f],
			),
			Q = v.onFocus,
			K = (0, _.useRef)(!1),
			O = De((j) => {
				if ((Q?.(j), j.defaultPrevented || y_(j) || !S || !t || QN(j, t))) return;
				const { virtualFocus: B, baseElement: P } = t.getState();
				(t.setActiveId(S),
					Uh(j.currentTarget) && mM(j.currentTarget),
					B &&
						gr(j) &&
						(HN(j.currentTarget) ||
							(P?.isConnected &&
								(Ic() &&
									j.currentTarget.hasAttribute("data-autofocus") &&
									j.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" }),
								(K.current = !0),
								j.relatedTarget === P || ss(t, j.relatedTarget) ? vM(P) : P.focus()))));
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
				if ((Y?.(j), j.defaultPrevented || !gr(j) || !t)) return;
				const { currentTarget: B } = j,
					P = t.getState(),
					ve = t.item(S),
					be = !!ve?.rowId,
					Pe = P.orientation !== "horizontal",
					M = P.orientation !== "vertical",
					D = () => !!(be || M || !P.baseElement || !ai(P.baseElement)),
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
						PageUp: () => N0(B, t, t?.up, !0),
						PageDown: () => N0(B, t, t?.down),
					}[j.key];
				if (le) {
					if (Uh(B)) {
						const he = $h(B),
							Se = M && j.key === "ArrowLeft",
							Re = M && j.key === "ArrowRight",
							Le = Pe && j.key === "ArrowUp",
							Xe = Pe && j.key === "ArrowDown";
						if (Re || Xe) {
							const { length: pt } = sM(B);
							if (he.end !== pt) return;
						} else if ((Se || Le) && he.start !== 0) return;
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
			(v = Cn(v, (j) => (0, w.jsx)(BM.Provider, { value: fe, children: j }), [fe])),
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
			(v = km(v)),
			(v = L_({ store: t, ...v, getItem: L, shouldRegisterItem: S ? v.shouldRegisterItem : !1 })),
			uu({ ...v, "aria-setsize": I, "aria-posinset": C })
		);
	}),
	nj = Lc(
		Fe(function (t) {
			return We(VN, Nm(t));
		}),
	),
	KN = "div";
function YN(e, t) {
	if (t != null) return e == null ? !1 : Array.isArray(e) ? e.includes(t) : e === t;
}
function GN(e) {
	var t;
	return (t = { menu: "menuitem", listbox: "option", tree: "treeitem" }[e]) != null ? t : "option";
}
var FN = tt(function ({
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
				multiSelectable: x,
				selected: A,
			} = $_(t, {
				resetValueOnSelectState: "resetValueOnSelect",
				multiSelectable(V) {
					return Array.isArray(V.selectedValue);
				},
				selected(V) {
					return YN(V.selectedValue, i);
				},
			}),
			N = (0, _.useCallback)(
				(V) => {
					const Y = { ...V, value: i };
					return v ? v(Y) : Y;
				},
				[i, v],
			);
		((s = s ?? !x), (u = u ?? (i != null && !x)));
		const q = g.onClick,
			I = Mt(s),
			C = Mt(o),
			k = Mt((S = f ?? p) != null ? S : x),
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
					(eu(Y) ||
						((V.key.length === 1 || V.key === "Backspace" || V.key === "Delete") &&
							(queueMicrotask(() => Y.focus()), ai(Y) && t?.setValue(Y.value))));
			});
		(x && A != null && (g = { "aria-selected": A, ...g }),
			(g = Cn(
				g,
				(V) =>
					(0, w.jsx)(wN.Provider, { value: i, children: (0, w.jsx)(EN.Provider, { value: A ?? !1, children: V }) }),
				[i, A],
			)),
			(g = { role: GN((0, _.useContext)(k_)), children: i, ...g, onClick: Q, onKeyDown: O }));
		const $ = Mt(m);
		return (
			(g = Nm({
				store: t,
				...g,
				getItem: N,
				moveOnKeyPress: (V) => {
					if (!$(V)) return !1;
					const Y = new Event("combobox-item-move");
					return (t?.getState().baseElement?.dispatchEvent(Y), !0);
				},
			})),
			(g = Mm({ store: t, focusOnHover: h, ...g })),
			g
		);
	}),
	XN = Lc(
		Fe(function (t) {
			return We(KN, FN(t));
		}),
	),
	Ec = xb(),
	JN = "div";
function O0(e, t) {
	const i = setTimeout(t, e);
	return () => clearTimeout(i);
}
function WN(e) {
	let t = requestAnimationFrame(() => {
		t = requestAnimationFrame(e);
	});
	return () => cancelAnimationFrame(t);
}
function z0(...e) {
	return e
		.join(", ")
		.split(", ")
		.reduce((t, i) => {
			const u = i.endsWith("ms") ? 1 : 1e3,
				s = Number.parseFloat(i || "0s") * u;
			return s > t ? s : t;
		}, 0);
}
function Yc(e, t, i) {
	return !i && t !== !1 && (!e || !!t);
}
var Om = tt(function ({ store: t, alwaysVisible: i, ...u }) {
		const s = Em();
		((t = t || s), Jt(t, !1));
		const o = (0, _.useRef)(null),
			f = Ii(u.id),
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
					return WN(() => {
						m(v ? "enter" : g ? "leave" : null);
					});
				}
			}, [S, b, v, g]),
			ot(() => {
				if (!t || !S || !h || !b) return;
				const q = () => t?.setState("animating", !1),
					I = () => (0, Ec.flushSync)(q);
				if ((h === "leave" && v) || (h === "enter" && !v)) return;
				if (typeof S == "number") return O0(S, I);
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
					Y = z0(L, Q, $, V) + z0(C, k, K, O);
				if (!Y) {
					(h === "enter" && t.setState("animated", !1), q());
					return;
				}
				return O0(Math.max(Y - 1e3 / 60, 0), I);
			}, [t, S, b, p, v, h]),
			(u = Cn(u, (q) => (0, w.jsx)(Tm, { value: t, children: q }), [t])));
		const x = Yc(g, u.hidden, i),
			A = u.style,
			N = (0, _.useMemo)(() => (x ? { ...A, display: "none" } : A), [x, A]);
		return (
			(u = {
				id: f,
				"data-open": v || void 0,
				"data-enter": h === "enter" || void 0,
				"data-leave": h === "leave" || void 0,
				hidden: x,
				...u,
				ref: Wt(f ? t.setContentElement : null, o, u.ref),
				style: N,
			}),
			uu(u)
		);
	}),
	eO = Fe(function (t) {
		return We(JN, Om(t));
	}),
	rj = Fe(function ({ unmountOnHide: t, ...i }) {
		const u = Em();
		return dn(i.store || u, (s) => !t || s?.mounted) === !1 ? null : (0, w.jsx)(eO, { ...i });
	}),
	tO = "div",
	B_ = tt(function ({ store: t, alwaysVisible: i, ...u }) {
		const s = M_(!0),
			o = _N();
		t = t || o;
		const f = !!t && t === s;
		Jt(t, !1);
		const h = (0, _.useRef)(null),
			m = Ii(u.id),
			v = t.useState("mounted"),
			g = Yc(v, u.hidden, i),
			S = g ? { ...u.style, display: "none" } : u.style,
			b = t.useState((C) => Array.isArray(C.selectedValue)),
			p = NM(h, "role", u.role),
			x = ((p === "listbox" || p === "tree" || p === "grid") && b) || void 0,
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
			A || (u = { role: "listbox", "aria-multiselectable": x, ...u }),
			(u = Cn(u, (C) => (0, w.jsx)(SN, { value: t, children: (0, w.jsx)(k_.Provider, { value: p, children: C }) }), [
				t,
				p,
			])));
		const I = m && (!s || !f) ? t.setContentElement : null;
		return ((u = { id: m, hidden: g, ...u, ref: Wt(I, h, u.ref), style: S }), uu(u));
	}),
	ij = Fe(function (t) {
		return We(tO, B_(t));
	}),
	D0 = (0, _.createContext)(null),
	nO = "span",
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
	aj = Fe(function (t) {
		return We(nO, V_(t));
	}),
	rO = "span",
	iO = tt(function (t) {
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
	Wo = Fe(function (t) {
		return We(rO, iO(t));
	}),
	aO = "div";
function uO(e) {
	return xt(e).body;
}
function lO(e, t) {
	return t ? (typeof t == "function" ? t(e) : t) : xt(e).createElement("div");
}
function sO(e = "id") {
	return `${e ? `${e}-` : ""}${Math.random().toString(36).slice(2, 8)}`;
}
function ca(e) {
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
			v = (0, _.useContext)(D0),
			[g, S] = (0, _.useState)(null),
			[b, p] = (0, _.useState)(null),
			x = (0, _.useRef)(null),
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
				const C = lO(I, u);
				if (!C) {
					S(null);
					return;
				}
				const k = C.isConnected;
				if ((k || (v || uO(I)).appendChild(C), C.id || (C.id = I.id ? `portal/${I.id}` : sO()), S(C), Vh(s, C), !k))
					return () => {
						(C.remove(), Vh(s, null));
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
					if (!Qa(k)) return;
					const L = k.type === "focusin";
					if ((cancelAnimationFrame(I), L)) return FM(g);
					I = requestAnimationFrame(() => {
						GM(g, !0);
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
					if (((I = (0, w.jsx)(D0.Provider, { value: g || v, children: I })), !o)) return I;
					if (!g) return (0, w.jsx)("span", { ref: m, id: f.id, style: { position: "fixed" }, hidden: !0 });
					((I = (0, w.jsxs)(w.Fragment, {
						children: [
							t &&
								g &&
								(0, w.jsx)(Wo, {
									ref: A,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-before",
									onFocus: (k) => {
										Qa(k, g) ? ca(ch()) : ca(x.current);
									},
								}),
							I,
							t &&
								g &&
								(0, w.jsx)(Wo, {
									ref: N,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-after",
									onFocus: (k) => {
										Qa(k, g) ? ca(w0()) : ca(q.current);
									},
								}),
						],
					})),
						g && (I = (0, Ec.createPortal)(I, g)));
					let C = (0, w.jsxs)(w.Fragment, {
						children: [
							t &&
								g &&
								(0, w.jsx)(Wo, {
									ref: x,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-before",
									onFocus: (k) => {
										k.relatedTarget !== q.current && Qa(k, g) ? ca(A.current) : ca(w0());
									},
								}),
							t && (0, w.jsx)("span", { "aria-owns": g?.id, style: { position: "fixed" } }),
							t &&
								g &&
								(0, w.jsx)(Wo, {
									ref: q,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-after",
									onFocus: (k) => {
										if (Qa(k, g)) ca(N.current);
										else {
											const L = ch();
											if (L === A.current) {
												requestAnimationFrame(() => {
													var Q;
													return (Q = ch()) == null ? void 0 : Q.focus();
												});
												return;
											}
											ca(L);
										}
									},
								}),
						],
					});
					return (b && t && (C = (0, Ec.createPortal)(C, b)), (0, w.jsxs)(w.Fragment, { children: [C, I] }));
				},
				[g, v, o, f.id, t, b],
			)),
			(f = { ...f, ref: m }),
			f
		);
	}),
	uj = Fe(function (t) {
		return We(aO, H_(t));
	}),
	j0 = (0, _.createContext)(0);
function oO({ level: e, children: t }) {
	const i = (0, _.useContext)(j0),
		u = Math.max(Math.min(e || i + 1, 6), 1);
	return (0, w.jsx)(j0.Provider, { value: u, children: t });
}
var cO = "div",
	Z_ = tt(function ({ autoFocusOnShow: t = !0, ...i }) {
		return ((i = Cn(i, (u) => (0, w.jsx)(T_.Provider, { value: t, children: u }), [t])), i);
	}),
	lj = Fe(function (t) {
		return We(cO, Z_(t));
	});
function fO(e, t) {
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
function dO(e) {
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
var dh = new WeakMap();
function ks(e, t, i) {
	dh.has(e) || dh.set(e, new Map());
	const u = dh.get(e),
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
function zm(e, t, i) {
	return ks(e, t, () => {
		const s = e.getAttribute(t);
		return (
			e.setAttribute(t, i),
			() => {
				s == null ? e.removeAttribute(t) : e.setAttribute(t, s);
			}
		);
	});
}
function tu(e, t, i) {
	return ks(e, t, () => {
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
function Ph(e, t) {
	return e
		? ks(e, "style", () => {
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
function hO(e, t, i) {
	return e
		? ks(e, t, () => {
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
var mO = ["SCRIPT", "STYLE"];
function Qh(e) {
	return `__ariakit-dialog-snapshot-${e}`;
}
function vO(e, t) {
	const i = xt(t),
		u = Qh(e);
	if (!i.body[u]) return !0;
	do {
		if (t === i.body) return !1;
		if (t[u]) return !0;
		if (!t.parentElement) return !1;
		t = t.parentElement;
	} while (!0);
}
function gO(e, t, i) {
	return mO.includes(t.tagName) || !vO(e, t) ? !1 : !i.some((u) => u && mn(t, u));
}
function Dm(e, t, i, u) {
	for (let s of t) {
		if (!s?.isConnected) continue;
		const o = t.some((m) => (!m || m === s ? !1 : m.contains(s))),
			f = xt(s),
			h = s;
		for (; s.parentElement && s !== f.body; ) {
			if ((u?.(s.parentElement, h), !o)) for (const m of s.parentElement.children) gO(e, m, t) && i(m, h);
			s = s.parentElement;
		}
	}
}
function yO(e, t) {
	const { body: i } = xt(t[0]),
		u = [];
	return (
		Dm(e, t, (o) => {
			u.push(tu(o, Qh(e), !0));
		}),
		rr(tu(i, Qh(e), !0), () => {
			for (const o of u) o();
		})
	);
}
function P_(e, ...t) {
	if (!e) return !1;
	const i = e.getAttribute("data-backdrop");
	return i == null ? !1 : i === "" || i === "true" || !t.length ? !0 : t.some((u) => i === u);
}
function nl(e = "", t = !1) {
	return `__ariakit-dialog-${t ? "ancestor" : "outside"}${e ? `-${e}` : ""}`;
}
function pO(e, t = "") {
	return rr(tu(e, nl(), !0), tu(e, nl(t), !0));
}
function Q_(e, t = "") {
	return rr(tu(e, nl("", !0), !0), tu(e, nl(t, !0), !0));
}
function jm(e, t) {
	const i = nl(t, !0);
	if (e[i]) return !0;
	const u = nl(t);
	do {
		if (e[u]) return !0;
		if (!e.parentElement) return !1;
		e = e.parentElement;
	} while (!0);
}
function I0(e, t) {
	const i = [],
		u = t.map((o) => o?.id);
	return (
		Dm(
			e,
			t,
			(o) => {
				P_(o, ...u) || i.unshift(pO(o, e));
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
function bO(e) {
	return e.tagName === "HTML" ? !0 : mn(xt(e).body, e);
}
function _O(e, t) {
	if (!e) return !1;
	if (mn(e, t)) return !0;
	const i = t.getAttribute("aria-activedescendant");
	if (i) {
		const u = xt(e).getElementById(i);
		if (u) return mn(e, u);
	}
	return !1;
}
function SO(e, t) {
	if (!("clientY" in e)) return !1;
	const i = t.getBoundingClientRect();
	return i.width === 0 || i.height === 0
		? !1
		: i.top <= e.clientY && e.clientY <= i.top + i.height && i.left <= e.clientX && e.clientX <= i.left + i.width;
}
function hh({ store: e, type: t, listener: i, capture: u, domReady: s }) {
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
									bO(b) &&
									(mn(g, b) ||
										_O(S, b) ||
										b.hasAttribute("data-focus-trap") ||
										SO(v, g) ||
										(h.current && !jm(b, g.id)) ||
										eN(b) ||
										o(v));
							},
							u,
						)
					: void 0,
			[f, u],
		));
}
function mh(e, t) {
	return typeof e == "function" ? e(t) : !!e;
}
function wO(e, t, i) {
	const u = dO(dn(e, "open")),
		s = { store: e, domReady: i, capture: !0 };
	(hh({
		...s,
		type: "click",
		listener: (o) => {
			const { contentElement: f } = e.getState(),
				h = u.current;
			h && c_(h) && jm(h, f?.id) && mh(t, o) && e.hide();
		},
	}),
		hh({
			...s,
			type: "focusin",
			listener: (o) => {
				const { contentElement: f } = e.getState();
				f && o.target !== xt(f) && mh(t, o) && e.hide();
			},
		}),
		hh({
			...s,
			type: "contextmenu",
			listener: (o) => {
				mh(t, o) && e.hide();
			},
		}));
}
var L0 = (0, _.createContext)({});
function EO(e) {
	const t = (0, _.useContext)(L0),
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
		wrapElement: (0, _.useCallback)((f) => (0, w.jsx)(L0.Provider, { value: o, children: f }), [o]),
		nestedDialogs: i,
	};
}
function TO({ attribute: e, contentId: t, contentElement: i, enabled: u }) {
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
			const m = new MutationObserver(() => (0, Ec.flushSync)(o));
			return (m.observe(h, { attributeFilter: [e] }), () => m.disconnect());
		}, [s, u, t, i, f, e]),
		f
	);
}
function xO(e) {
	const t = e.getBoundingClientRect().left;
	return Math.round(t) + e.scrollLeft ? "paddingLeft" : "paddingRight";
}
function AO(e, t, i) {
	const u = TO({ attribute: "data-dialog-prevent-body-scroll", contentElement: e, contentId: t, enabled: i });
	(0, _.useEffect)(() => {
		if (!u() || !e) return;
		const s = xt(e),
			o = o_(e),
			{ documentElement: f, body: h } = s,
			m = f.style.getPropertyValue("--scrollbar-width"),
			v = m ? Number.parseInt(m, 10) : o.innerWidth - f.clientWidth,
			g = () => hO(f, "--scrollbar-width", `${v}px`),
			S = xO(f),
			b = () => Ph(h, { overflow: "hidden", [S]: `${v}px` }),
			p = () => {
				var A, N;
				const { scrollX: q, scrollY: I, visualViewport: C } = o,
					k = (A = C?.offsetLeft) != null ? A : 0,
					L = (N = C?.offsetTop) != null ? N : 0,
					Q = Ph(h, {
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
			x = vm() && !AM();
		return rr(g(), x ? p() : b());
	}, [u, e]);
}
function RO(e, ...t) {
	if (!e) return !1;
	const i = e.getAttribute("data-focus-trap");
	return i == null ? !1 : t.length ? (i === "" ? !1 : t.some((u) => i === u)) : !0;
}
function K_() {
	return "inert" in HTMLElement.prototype;
}
function CO(e) {
	return zm(e, "aria-hidden", "true");
}
function Y_(e, t) {
	return "style" in e
		? K_()
			? tu(e, "inert", !0)
			: rr(
					...Bc(e, !0).map((i) => {
						if (t?.some((s) => s && mn(s, i))) return os;
						const u = ks(
							i,
							"focus",
							() => (
								(i.focus = os),
								() => {
									delete i.focus;
								}
							),
						);
						return rr(zm(i, "tabindex", "-1"), u);
					}),
					CO(e),
					Ph(e, { pointerEvents: "none", userSelect: "none", cursor: "default" }),
				)
		: os;
}
function kO(e, t) {
	const i = [],
		u = t.map((o) => o?.id);
	return (
		Dm(
			e,
			t,
			(o) => {
				P_(o, ...u) || RO(o, ...u) || i.unshift(Y_(o, t));
			},
			(o) => {
				o.hasAttribute("role") && (t.some((f) => f && mn(f, o)) || i.unshift(zm(o, "role", "none")));
			},
		),
		() => {
			for (const o of i) o();
		}
	);
}
function G_(e = {}) {
	const t = Qc(e.store, Cm(e.disclosure, ["contentElement", "disclosureElement"]));
	const i = t?.getState(),
		u = Ie(e.open, i?.open, e.defaultOpen, !1),
		s = Ie(e.animated, i?.animated, !1),
		o = Yr(
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
			Rm(o, ["open"], () => {
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
		al(t, [i.store, i.disclosure]),
		Xt(e, i, "open", "setOpen"),
		Xt(e, i, "mounted", "setMounted"),
		Xt(e, i, "animated"),
		Object.assign(e, { disclosure: i.disclosure })
	);
}
function MO(e = {}) {
	const [t, i] = Kc(G_, e);
	return F_(t, i, e);
}
var NO = "div",
	OO = [
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
	sj = tt(function (t) {
		return t;
	}),
	Tc = Fe(function (t) {
		return We(NO, t);
	});
Object.assign(
	Tc,
	OO.reduce(
		(e, t) => (
			(e[t] = Fe(function (u) {
				return We(t, u);
			})),
			e
		),
		{},
	),
);
function zO({ store: e, backdrop: t, alwaysVisible: i, hidden: u }) {
	const s = (0, _.useRef)(null),
		o = MO({ disclosure: e }),
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
	const h = Om({
		ref: s,
		store: o,
		role: "presentation",
		"data-backdrop": f?.id || "",
		alwaysVisible: i,
		hidden: u ?? void 0,
		style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 },
	});
	if (!t) return null;
	if ((0, _.isValidElement)(t)) return (0, w.jsx)(Tc, { ...h, render: t });
	const m = typeof t != "boolean" ? t : "div";
	return (0, w.jsx)(Tc, { ...h, render: (0, w.jsx)(m, {}) });
}
function X_(e = {}) {
	return G_(e);
}
function J_(e, t, i) {
	return F_(e, t, i);
}
function DO(e = {}) {
	const [t, i] = Kc(X_, e);
	return J_(t, i, e);
}
var jO = "div",
	q0 = Ic();
function IO(e) {
	const t = ji();
	return !t || (e && mn(e, t)) ? !1 : !!Kr(t);
}
function U0(e, t = !1) {
	if (!e) return null;
	const i = "current" in e ? e.current : e;
	return i ? (t ? (Kr(i) ? i : null) : i) : null;
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
	initialFocus: x,
	finalFocus: A,
	unmountOnHide: N,
	unstable_treeSnapshotKey: q,
	...I
}) {
	const C = Vc(),
		k = (0, _.useRef)(null),
		L = DO({
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
		{ portalRef: Q, domReady: K } = ym(f, I.portalRef),
		O = I.preserveTabOrder,
		$ = dn(L, (ye) => O && !o && ye.mounted),
		V = Ii(I.id),
		Y = dn(L, "open"),
		ae = dn(L, "mounted"),
		se = dn(L, "contentElement"),
		te = Yc(ae, I.hidden, I.alwaysVisible);
	(AO(se, V, S && !te), wO(L, v, K));
	const { wrapElement: fe, nestedDialogs: j } = EO(L);
	((I = Cn(I, fe, [fe])),
		ot(() => {
			if (!Y) return;
			const ye = k.current,
				Ce = ji(ye, !0);
			Ce && Ce.tagName !== "BODY" && ((ye && mn(ye, Ce)) || L.setDisclosureElement(Ce));
		}, [L, Y]),
		q0 &&
			(0, _.useEffect)(() => {
				if (!ae) return;
				const { disclosureElement: ye } = L.getState();
				if (!ye || !va(ye)) return;
				const Ce = () => {
					let nt = !1;
					const Ve = () => {
						nt = !0;
					};
					(ye.addEventListener("focusin", Ve, { capture: !0, once: !0 }),
						Gu(ye, "mouseup", () => {
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
			if (ye && !ye.querySelector("[data-dialog-dismiss]")) return fO(ye, L.hide);
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
		return yO(V, [ye]);
	}, [V, B, q]);
	const P = De(g);
	ot(() => {
		if (!V || !B) return;
		const { disclosureElement: ye } = L.getState(),
			Ce = [k.current, ...(P() || []), ...j.map((nt) => nt.getState().contentElement)];
		return o ? rr(I0(V, Ce), kO(V, Ce)) : I0(V, [ye, ...Ce]);
	}, [V, L, B, P, j, o, q]);
	const ve = !!b,
		be = Mt(b),
		[Pe, M] = (0, _.useState)(!1);
	(0, _.useEffect)(() => {
		if (!Y || !ve || !K || !se?.isConnected) return;
		const ye = U0(x, !0) || se.querySelector("[data-autofocus=true],[autofocus]") || ZM(se, !0, f && $) || se,
			Ce = Kr(ye);
		be(Ce ? ye : null) &&
			(M(!0),
			queueMicrotask(() => {
				(ye.focus(), q0 && Ce && ye.scrollIntoView({ block: "nearest", inline: "nearest" }));
			}));
	}, [Y, ve, K, se, x, f, $, be]);
	const D = !!p,
		le = Mt(p),
		[oe, he] = (0, _.useState)(!1);
	(0, _.useEffect)(() => {
		if (Y) return (he(!0), () => he(!1));
	}, [Y]);
	const Se = (0, _.useCallback)(
			(ye, Ce = !0) => {
				const { disclosureElement: nt } = L.getState();
				if (IO(ye)) return;
				let Ve = U0(A) || nt;
				if (Ve?.id) {
					const et = xt(Ve),
						ce = `[aria-activedescendant="${Ve.id}"]`,
						ze = et.querySelector(ce);
					ze && (Ve = ze);
				}
				if (Ve && !Kr(Ve)) {
					const et = Ve.closest("[data-dialog]");
					if (et?.id) {
						const ce = xt(et),
							ze = `[aria-controls~="${et.id}"]`,
							rt = ce.querySelector(ze);
						rt && (Ve = rt);
					}
				}
				const Bt = Ve && Kr(Ve);
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
							if (!nt || jm(nt)) return;
							const Ve = Ce.target;
							if (!Ve) return;
							const { disclosureElement: Bt } = L.getState();
							!!(Ve.tagName === "BODY" || mn(nt, Ve) || !Bt || mn(Bt, Ve)) && Le(Ce) && L.hide();
						},
						!0,
					),
		[L, K, ae, Le],
	),
		(I = Cn(I, (ye) => (0, w.jsx)(oO, { level: o ? 1 : void 0, children: ye }), [o])));
	const Xe = I.hidden,
		pt = I.alwaysVisible;
	I = Cn(
		I,
		(ye) =>
			h
				? (0, w.jsxs)(w.Fragment, {
						children: [(0, w.jsx)(zO, { store: L, backdrop: h, hidden: Xe, alwaysVisible: pt }), ye],
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
				(0, w.jsx)(Tm, {
					value: L,
					children: (0, w.jsx)(yN.Provider, {
						value: vn,
						children: (0, w.jsx)(pN.Provider, { value: Be, children: ye }),
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
		(I = Om({ store: L, ...I })),
		(I = Ts({ ...I, focusable: s })),
		(I = H_({ portal: f, ...I, portalRef: Q, preserveTabOrder: $ })),
		I
	);
});
function Ms(e, t = Vc) {
	return Fe(function (u) {
		const s = t();
		return dn(u.store || s, (o) => !u.unmountOnHide || o?.mounted || !!u.open) ? (0, w.jsx)(e, { ...u }) : null;
	});
}
var oj = Ms(
		Fe(function (t) {
			return We(jO, W_(t));
		}),
		Vc,
	),
	ga = Math.min,
	Mi = Math.max,
	xc = Math.round,
	ec = Math.floor,
	Ni = (e) => ({ x: e, y: e }),
	LO = { left: "right", right: "left", bottom: "top", top: "bottom" };
function eS(e, t, i) {
	return Mi(e, ga(t, i));
}
function ya(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function pa(e) {
	return e.split("-")[0];
}
function ul(e) {
	return e.split("-")[1];
}
function Im(e) {
	return e === "x" ? "y" : "x";
}
function Lm(e) {
	return e === "y" ? "height" : "width";
}
function ni(e) {
	const t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function qm(e) {
	return Im(ni(e));
}
function qO(e, t, i) {
	i === void 0 && (i = !1);
	const u = ul(e),
		s = qm(e),
		o = Lm(s);
	let f = s === "x" ? (u === (i ? "end" : "start") ? "right" : "left") : u === "start" ? "bottom" : "top";
	return (t.reference[o] > t.floating[o] && (f = Ac(f)), [f, Ac(f)]);
}
function UO(e) {
	const t = Ac(e);
	return [Kh(e), t, Kh(t)];
}
function Kh(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var $0 = ["left", "right"],
	B0 = ["right", "left"],
	$O = ["top", "bottom"],
	BO = ["bottom", "top"];
function VO(e, t, i) {
	switch (e) {
		case "top":
		case "bottom":
			return i ? (t ? B0 : $0) : t ? $0 : B0;
		case "left":
		case "right":
			return t ? $O : BO;
		default:
			return [];
	}
}
function HO(e, t, i, u) {
	const s = ul(e);
	let o = VO(pa(e), i === "start", u);
	return (s && ((o = o.map((f) => f + "-" + s)), t && (o = o.concat(o.map(Kh)))), o);
}
function Ac(e) {
	const t = pa(e);
	return LO[t] + e.slice(t.length);
}
function ZO(e) {
	var t, i, u, s;
	return {
		top: (t = e.top) != null ? t : 0,
		right: (i = e.right) != null ? i : 0,
		bottom: (u = e.bottom) != null ? u : 0,
		left: (s = e.left) != null ? s : 0,
	};
}
function tS(e) {
	return typeof e != "number" ? ZO(e) : { top: e, right: e, bottom: e, left: e };
}
function Rc(e) {
	const { x: t, y: i, width: u, height: s } = e;
	return { width: u, height: s, top: i, left: t, right: t + u, bottom: i + s, x: t, y: i };
}
function V0(e, t, i) {
	let { reference: u, floating: s } = e;
	const o = ni(t),
		f = qm(t),
		h = Lm(f),
		m = pa(t),
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
	const x = ul(t);
	return (x && (p[f] += b * (x === "end" ? 1 : -1) * (i && v ? -1 : 1)), p);
}
async function PO(e, t) {
	var i;
	t === void 0 && (t = {});
	const { x: u, y: s, platform: o, rects: f, elements: h, strategy: m } = e,
		{
			boundary: v = "clippingAncestors",
			rootBoundary: g = "viewport",
			elementContext: S = "floating",
			altBoundary: b = !1,
			padding: p = 0,
		} = ya(t, e),
		x = tS(p),
		A = h[b ? (S === "floating" ? "reference" : "floating") : S],
		N = Rc(
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
		k = Rc(
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
		top: (N.top - k.top + x.top) / C.y,
		bottom: (k.bottom - N.bottom + x.bottom) / C.y,
		left: (N.left - k.left + x.left) / C.x,
		right: (k.right - N.right + x.right) / C.x,
	};
}
var QO = 50,
	KO = async (e, t, i) => {
		const { placement: u = "bottom", strategy: s = "absolute", middleware: o = [], platform: f } = i,
			h = f.detectOverflow ? f : { ...f, detectOverflow: PO },
			m = await (f.isRTL == null ? void 0 : f.isRTL(t));
		let v = await f.getElementRects({ reference: e, floating: t, strategy: s }),
			{ x: g, y: S } = V0(v, u, m),
			b = u,
			p = 0;
		const x = {};
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
					middlewareData: x,
					rects: v,
					platform: h,
					elements: { reference: e, floating: t },
				});
			((g = C ?? g),
				(S = k ?? S),
				(x[q] = { ...x[q], ...L }),
				Q &&
					p < QO &&
					(p++,
					typeof Q == "object" &&
						(Q.placement && (b = Q.placement),
						Q.rects &&
							(v = Q.rects === !0 ? await f.getElementRects({ reference: e, floating: t, strategy: s }) : Q.rects),
						({ x: g, y: S } = V0(v, b, m))),
					(A = -1)));
		}
		return { x: g, y: S, placement: b, strategy: s, middlewareData: x };
	},
	YO = (e) => ({
		name: "arrow",
		options: e,
		async fn(t) {
			const { x: i, y: u, placement: s, rects: o, platform: f, elements: h, middlewareData: m } = t,
				{ element: v, padding: g = 0 } = ya(e, t) || {};
			if (v == null) return {};
			const S = tS(g),
				b = { x: i, y: u },
				p = qm(s),
				x = Lm(p),
				A = await f.getDimensions(v),
				N = p === "y",
				q = N ? "top" : "left",
				I = N ? "bottom" : "right",
				C = N ? "clientHeight" : "clientWidth",
				k = o.reference[x] + o.reference[p] - b[p] - o.floating[x],
				L = b[p] - o.reference[p],
				Q = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(v));
			let K = Q ? Q[C] : 0;
			(!K || !(await (f.isElement == null ? void 0 : f.isElement(Q)))) && (K = h.floating[C] || o.floating[x]);
			const O = k / 2 - L / 2,
				$ = K / 2 - A[x] / 2 - 1,
				V = ga(S[q], $),
				Y = ga(S[I], $),
				ae = K - A[x] - Y,
				se = K / 2 - A[x] / 2 + O,
				te = eS(V, se, ae),
				fe = !m.arrow && ul(s) != null && se !== te && o.reference[x] / 2 - (se < V ? V : Y) - A[x] / 2 < 0,
				j = fe ? (se < V ? se - V : se - ae) : 0;
			return {
				[p]: b[p] + j,
				data: { [p]: te, centerOffset: se - te - j, ...(fe && { alignmentOffset: j }) },
				reset: fe,
			};
		},
	}),
	GO = function (e) {
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
							fallbackAxisSideDirection: x = "none",
							flipAlignment: A = !0,
							...N
						} = ya(e, t);
					if ((i = o.arrow) != null && i.alignmentOffset) return {};
					const q = pa(s),
						I = ni(h),
						C = pa(h) === h,
						k = await (m.isRTL == null ? void 0 : m.isRTL(v.floating)),
						L = b || (C || !A ? [Ac(h)] : UO(h)),
						Q = x !== "none";
					!b && Q && L.push(...HO(h, A, x, k));
					const K = [h, ...L],
						O = await m.detectOverflow(t, N),
						$ = [];
					let V = ((u = o.flip) == null ? void 0 : u.overflows) || [];
					if ((g && $.push(O[q]), S)) {
						const te = qO(s, f, k);
						$.push(O[te[0]], O[te[1]]);
					}
					if (((V = [...V, { placement: s, overflows: $ }]), !$.every((te) => te <= 0))) {
						var Y, ae;
						const te = (((Y = o.flip) == null ? void 0 : Y.index) || 0) + 1,
							fe = K[te];
						if (
							fe &&
							(!(S === "alignment" && I !== ni(fe)) ||
								V.every((B) => (ni(B.placement) === I ? B.overflows[0] > 0 : !0)))
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
												const ve = ni(P.placement);
												return ve === I || ve === "y";
											}
											return !0;
										})
											.map((P) => [P.placement, P.overflows.filter((ve) => ve > 0).reduce((ve, be) => ve + be, 0)])
											.sort((P, ve) => P[1] - ve[1])[0]) == null
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
async function FO(e, t) {
	const { placement: i, platform: u, elements: s } = e,
		o = await (u.isRTL == null ? void 0 : u.isRTL(s.floating)),
		f = pa(i),
		h = ul(i),
		m = ni(i) === "y",
		v = nS.has(f) ? -1 : 1,
		g = o && m ? -1 : 1,
		S = ya(t, e);
	let {
		mainAxis: b,
		crossAxis: p,
		alignmentAxis: x,
	} = typeof S == "number"
		? { mainAxis: S, crossAxis: 0, alignmentAxis: null }
		: { mainAxis: S.mainAxis || 0, crossAxis: S.crossAxis || 0, alignmentAxis: S.alignmentAxis };
	return (
		h && typeof x == "number" && (p = h === "end" ? x * -1 : x),
		m ? { x: p * g, y: b * v } : { x: b * v, y: p * g }
	);
}
var XO = function (e) {
		return (
			e === void 0 && (e = 0),
			{
				name: "offset",
				options: e,
				async fn(t) {
					var i, u;
					const { x: s, y: o, placement: f, middlewareData: h } = t,
						m = await FO(t, e);
					return f === ((i = h.offset) == null ? void 0 : i.placement) && (u = h.arrow) != null && u.alignmentOffset
						? {}
						: { x: s + m.x, y: o + m.y, data: { ...m, placement: f } };
				},
			}
		);
	},
	JO = function (e) {
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
						} = ya(e, t),
						g = { x: i, y: u },
						S = await o.detectOverflow(t, v),
						b = ni(s),
						p = Im(b);
					let x = g[p],
						A = g[b];
					const N = (I, C) => eS(C + S[I === "y" ? "top" : "left"], C, C - S[I === "y" ? "bottom" : "right"]);
					(f && (x = N(p, x)), h && (A = N(b, A)));
					const q = m.fn({ ...t, [p]: x, [b]: A });
					return { ...q, data: { x: q.x - i, y: q.y - u, enabled: { [p]: f, [b]: h } } };
				},
			}
		);
	},
	WO = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				options: e,
				fn(t) {
					var i, u;
					const { x: s, y: o, placement: f, rects: h, middlewareData: m } = t,
						{ offset: v = 0, mainAxis: g = !0, crossAxis: S = !0 } = ya(e, t),
						b = { x: s, y: o },
						p = ni(f),
						x = Im(p);
					let A = b[x],
						N = b[p];
					const q = ya(v, t),
						I =
							typeof q == "number"
								? { mainAxis: q, crossAxis: 0 }
								: { mainAxis: (i = q.mainAxis) != null ? i : 0, crossAxis: (u = q.crossAxis) != null ? u : 0 };
					if (g) {
						const L = x === "y" ? "height" : "width",
							Q = h.reference[x] - h.floating[L] + I.mainAxis,
							K = h.reference[x] + h.reference[L] - I.mainAxis;
						A < Q ? (A = Q) : A > K && (A = K);
					}
					if (S) {
						var C, k;
						const L = x === "y" ? "width" : "height",
							Q = nS.has(pa(f)),
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
					return { [x]: A, [p]: N };
				},
			}
		);
	},
	e2 = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "size",
				options: e,
				async fn(t) {
					const { placement: i, rects: u, platform: s, elements: o } = t,
						{ apply: f = () => {}, ...h } = ya(e, t),
						m = await s.detectOverflow(t, h),
						v = pa(i),
						g = ul(i),
						S = ni(i) === "y",
						{ width: b, height: p } = u.floating;
					let x, A;
					v === "top" || v === "bottom"
						? ((x = v),
							(A =
								g === ((await (s.isRTL == null ? void 0 : s.isRTL(o.floating))) ? "start" : "end") ? "left" : "right"))
						: ((A = v), (x = g === "end" ? "top" : "bottom"));
					const N = p - m.top - m.bottom,
						q = b - m.left - m.right,
						I = ga(p - m[x], N),
						C = ga(b - m[A], q),
						k = t.middlewareData.shift,
						L = !k;
					let Q = I,
						K = C;
					(k != null && k.enabled.x && (K = q),
						k != null && k.enabled.y && (Q = N),
						L && !g && (S ? (K = b - 2 * Mi(m.left, m.right)) : (Q = p - 2 * Mi(m.top, m.bottom))),
						await f({ ...t, availableWidth: K, availableHeight: Q }));
					const O = await s.getDimensions(o.floating);
					return b !== O.width || p !== O.height ? { reset: { rects: !0 } } : {};
				},
			}
		);
	};
function Gc() {
	return typeof window < "u";
}
function ll(e) {
	return rS(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function nr(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Li(e) {
	var t;
	return (t = (rS(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function rS(e) {
	return Gc() ? e instanceof Node || e instanceof nr(e).Node : !1;
}
function ri(e) {
	return Gc() ? e instanceof Element || e instanceof nr(e).Element : !1;
}
function Sa(e) {
	return Gc() ? e instanceof HTMLElement || e instanceof nr(e).HTMLElement : !1;
}
function H0(e) {
	return !Gc() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof nr(e).ShadowRoot;
}
function Fc(e) {
	const { overflow: t, overflowX: i, overflowY: u, display: s } = ii(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + u + i) && s !== "inline" && s !== "contents";
}
function t2(e) {
	return /^(table|td|th)$/.test(ll(e));
}
function Xc(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var n2 = /transform|translate|scale|rotate|perspective|filter/,
	r2 = /paint|layout|strict|content/,
	Pa = (e) => !!e && e !== "none",
	vh;
function Um(e) {
	const t = ri(e) ? ii(e) : e;
	return (
		Pa(t.transform) ||
		Pa(t.translate) ||
		Pa(t.scale) ||
		Pa(t.rotate) ||
		Pa(t.perspective) ||
		(!$m() && (Pa(t.backdropFilter) || Pa(t.filter))) ||
		n2.test(t.willChange || "") ||
		r2.test(t.contain || "")
	);
}
function i2(e) {
	let t = nu(e);
	for (; Sa(t) && !gs(t); ) {
		if (Um(t)) return t;
		if (Xc(t)) return null;
		t = nu(t);
	}
	return null;
}
function $m() {
	return (vh == null && (vh = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), vh);
}
function gs(e) {
	return /^(html|body|#document)$/.test(ll(e));
}
function ii(e) {
	return nr(e).getComputedStyle(e);
}
function Jc(e) {
	return ri(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function nu(e) {
	if (ll(e) === "html") return e;
	const t = e.assignedSlot || e.parentNode || (H0(e) && e.host) || Li(e);
	return H0(t) ? t.host : t;
}
function iS(e) {
	const t = nu(e);
	return gs(t) ? (e.ownerDocument || e).body : Sa(t) && Fc(t) ? t : iS(t);
}
function ys(e, t, i) {
	var u;
	(t === void 0 && (t = []), i === void 0 && (i = !0));
	const s = iS(e),
		o = s === ((u = e.ownerDocument) == null ? void 0 : u.body),
		f = nr(s);
	if (o) {
		const h = Yh(f);
		return t.concat(f, f.visualViewport || [], Fc(s) ? s : [], h && i ? ys(h) : []);
	} else return t.concat(s, ys(s, [], i));
}
function Yh(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function aS(e) {
	const t = ii(e);
	let i = parseFloat(t.width) || 0,
		u = parseFloat(t.height) || 0;
	const s = Sa(e),
		o = s ? e.offsetWidth : i,
		f = s ? e.offsetHeight : u,
		h = xc(i) !== o || xc(u) !== f;
	return (h && ((i = o), (u = f)), { width: i, height: u, $: h });
}
function Bm(e) {
	return ri(e) ? e : e.contextElement;
}
function Fu(e) {
	const t = Bm(e);
	if (!Sa(t)) return Ni(1);
	const i = t.getBoundingClientRect(),
		{ width: u, height: s, $: o } = aS(t);
	let f = (o ? xc(i.width) : i.width) / u,
		h = (o ? xc(i.height) : i.height) / s;
	return ((!f || !Number.isFinite(f)) && (f = 1), (!h || !Number.isFinite(h)) && (h = 1), { x: f, y: h });
}
var a2 = Ni(0);
function uS(e) {
	const t = nr(e);
	return !$m() || !t.visualViewport ? a2 : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function u2(e, t, i) {
	return (t === void 0 && (t = !1), !!i && t && i === nr(e));
}
function ru(e, t, i, u) {
	(t === void 0 && (t = !1), i === void 0 && (i = !1));
	const s = e.getBoundingClientRect(),
		o = Bm(e);
	let f = Ni(1);
	t && (u ? ri(u) && (f = Fu(u)) : (f = Fu(e)));
	const h = u2(o, i, u) ? uS(o) : Ni(0);
	let m = (s.left + h.x) / f.x,
		v = (s.top + h.y) / f.y,
		g = s.width / f.x,
		S = s.height / f.y;
	if (o && u) {
		const b = nr(o),
			p = ri(u) ? nr(u) : u;
		let x = b,
			A = Yh(x);
		for (; A && p !== x; ) {
			const N = Fu(A),
				q = A.getBoundingClientRect(),
				I = ii(A),
				C = q.left + (A.clientLeft + parseFloat(I.paddingLeft)) * N.x,
				k = q.top + (A.clientTop + parseFloat(I.paddingTop)) * N.y;
			((m *= N.x), (v *= N.y), (g *= N.x), (S *= N.y), (m += C), (v += k), (x = nr(A)), (A = Yh(x)));
		}
	}
	return Rc({ width: g, height: S, x: m, y: v });
}
function Wc(e, t) {
	const i = Jc(e).scrollLeft;
	return t ? t.left + i : ru(Li(e)).left + i;
}
function lS(e, t) {
	const i = e.getBoundingClientRect();
	return { x: i.left + t.scrollLeft - Wc(e, i), y: i.top + t.scrollTop };
}
function l2(e) {
	let { elements: t, rect: i, offsetParent: u, strategy: s } = e;
	const o = s === "fixed",
		f = Li(u),
		h = t ? Xc(t.floating) : !1;
	if (u === f || (h && o)) return i;
	let m = { scrollLeft: 0, scrollTop: 0 },
		v = Ni(1);
	const g = Ni(0),
		S = Sa(u);
	if ((S || !o) && ((ll(u) !== "body" || Fc(f)) && (m = Jc(u)), S)) {
		const p = ru(u);
		((v = Fu(u)), (g.x = p.x + u.clientLeft), (g.y = p.y + u.clientTop));
	}
	const b = f && !S && !o ? lS(f, m) : Ni(0);
	return {
		width: i.width * v.x,
		height: i.height * v.y,
		x: i.x * v.x - m.scrollLeft * v.x + g.x + b.x,
		y: i.y * v.y - m.scrollTop * v.y + g.y + b.y,
	};
}
function s2(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function o2(e) {
	const t = Jc(e),
		i = e.ownerDocument.body,
		u = Mi(e.scrollWidth, e.clientWidth, i.scrollWidth, i.clientWidth),
		s = Mi(e.scrollHeight, e.clientHeight, i.scrollHeight, i.clientHeight);
	let o = -t.scrollLeft + Wc(e);
	const f = -t.scrollTop;
	return (
		ii(i).direction === "rtl" && (o += Mi(e.clientWidth, i.clientWidth) - u),
		{ width: u, height: s, x: o, y: f }
	);
}
var c2 = 25;
function f2(e, t, i) {
	i === void 0 && (i = "viewport");
	const u = i === "layoutViewport",
		s = nr(e),
		o = Li(e),
		f = s.visualViewport;
	let h = o.clientWidth,
		m = o.clientHeight,
		v = 0,
		g = 0;
	if (f) {
		const S = !$m() || t === "fixed";
		u
			? S || ((v = -f.offsetLeft), (g = -f.offsetTop))
			: ((h = f.width), (m = f.height), S && ((v = f.offsetLeft), (g = f.offsetTop)));
	}
	if (Wc(o) <= 0) {
		const S = o.ownerDocument,
			b = S.body,
			p = getComputedStyle(b),
			x = (S.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight)) || 0,
			A = Math.abs(o.clientWidth - b.clientWidth - x),
			N = getComputedStyle(o).scrollbarGutter === "stable both-edges" ? A / 2 : A;
		N <= c2 && (h -= N);
	}
	return { width: h, height: m, x: v, y: g };
}
function d2(e, t) {
	const i = ru(e, !0, t === "fixed"),
		u = i.top + e.clientTop,
		s = i.left + e.clientLeft,
		o = Fu(e);
	return { width: e.clientWidth * o.x, height: e.clientHeight * o.y, x: s * o.x, y: u * o.y };
}
function Z0(e, t, i) {
	let u;
	if (t === "viewport" || t === "layoutViewport") u = f2(e, i, t);
	else if (t === "document") u = o2(Li(e));
	else if (ri(t)) u = d2(t, i);
	else {
		const s = uS(e);
		u = { x: t.x - s.x, y: t.y - s.y, width: t.width, height: t.height };
	}
	return Rc(u);
}
function h2(e, t) {
	const i = t.get(e);
	if (i) return i;
	let u = ys(e, [], !1).filter((h) => ri(h) && ll(h) !== "body"),
		s = null;
	const o = ii(e).position === "fixed";
	let f = o ? nu(e) : e;
	for (; ri(f) && !gs(f); ) {
		const h = ii(f),
			m = Um(f),
			v = s ? s.position : o ? "fixed" : "";
		(!m && (v === "fixed" || (v === "absolute" && h.position === "static")) ? (u = u.filter((g) => g !== f)) : (s = h),
			(f = nu(f)));
	}
	return (t.set(e, u), u);
}
function m2(e) {
	let { element: t, boundary: i, rootBoundary: u, strategy: s } = e;
	const o = [...(i === "clippingAncestors" ? (Xc(t) ? [] : h2(t, this._c)) : [].concat(i)), u],
		f = Z0(t, o[0], s);
	let h = f.top,
		m = f.right,
		v = f.bottom,
		g = f.left;
	for (let S = 1; S < o.length; S++) {
		const b = Z0(t, o[S], s);
		((h = Mi(b.top, h)), (m = ga(b.right, m)), (v = ga(b.bottom, v)), (g = Mi(b.left, g)));
	}
	return { width: m - g, height: v - h, x: g, y: h };
}
function v2(e) {
	const { width: t, height: i } = aS(e);
	return { width: t, height: i };
}
function g2(e, t, i) {
	const u = Sa(t),
		s = Li(t),
		o = i === "fixed",
		f = ru(e, !0, o, t);
	let h = { scrollLeft: 0, scrollTop: 0 };
	const m = Ni(0);
	if ((u || !o) && ((ll(t) !== "body" || Fc(s)) && (h = Jc(t)), u)) {
		const g = ru(t, !0, o, t);
		((m.x = g.x + t.clientLeft), (m.y = g.y + t.clientTop));
	}
	!u && s && (m.x = Wc(s));
	const v = s && !u && !o ? lS(s, h) : Ni(0);
	return { x: f.left + h.scrollLeft - m.x - v.x, y: f.top + h.scrollTop - m.y - v.y, width: f.width, height: f.height };
}
function gh(e) {
	return ii(e).position === "static";
}
function P0(e, t) {
	if (!Sa(e) || ii(e).position === "fixed") return null;
	if (t) return t(e);
	let i = e.offsetParent;
	return (Li(e) === i && (i = i.ownerDocument.body), i);
}
function sS(e, t) {
	const i = nr(e);
	if (Xc(e)) return i;
	if (!Sa(e)) {
		let s = nu(e);
		for (; s && !gs(s); ) {
			if (ri(s) && !gh(s)) return s;
			s = nu(s);
		}
		return i;
	}
	let u = P0(e, t);
	for (; u && t2(u) && gh(u); ) u = P0(u, t);
	return u && gs(u) && gh(u) && !Um(u) ? i : u || i2(e) || i;
}
var y2 = async function (e) {
	const t = this.getOffsetParent || sS,
		i = this.getDimensions,
		u = await i(e.floating);
	return {
		reference: g2(e.reference, await t(e.floating), e.strategy),
		floating: { x: 0, y: 0, width: u.width, height: u.height },
	};
};
function p2(e) {
	return ii(e).direction === "rtl";
}
var b2 = {
	convertOffsetParentRelativeRectToViewportRelativeRect: l2,
	getDocumentElement: Li,
	getClippingRect: m2,
	getOffsetParent: sS,
	getElementRects: y2,
	getClientRects: s2,
	getDimensions: v2,
	getScale: Fu,
	isElement: ri,
	isRTL: p2,
};
function oS(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function _2(e, t, i) {
	let u = null,
		s;
	const o = Li(e);
	function f() {
		var g;
		(clearTimeout(s), (g = u) == null || g.disconnect(), (u = null));
	}
	function h(g, S) {
		(g === void 0 && (g = !1), S === void 0 && (S = 1), f());
		const b = e.getBoundingClientRect(),
			{ left: p, top: x, width: A, height: N } = b;
		if ((g || t(), !A || !N)) return;
		const q = ec(x),
			I = ec(o.clientWidth - (p + A)),
			C = ec(o.clientHeight - (x + N)),
			k = ec(p),
			L = { rootMargin: -q + "px " + -I + "px " + -C + "px " + -k + "px", threshold: Mi(0, ga(1, S)) || 1 };
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
function S2(e, t, i, u) {
	u === void 0 && (u = {});
	const {
			ancestorScroll: s = !0,
			ancestorResize: o = !0,
			elementResize: f = typeof ResizeObserver == "function",
			layoutShift: h = typeof IntersectionObserver == "function",
			animationFrame: m = !1,
		} = u,
		v = Bm(e),
		g = s || o ? [...(v ? ys(v) : []), ...(t ? ys(t) : [])] : [];
	g.forEach((q) => {
		(s && q.addEventListener("scroll", i), o && q.addEventListener("resize", i));
	});
	const S = v && h ? _2(v, i, o) : null;
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
	let x,
		A = m ? ru(e) : null;
	m && N();
	function N() {
		const q = ru(e);
		(A && !oS(A, q) && i(), (A = q), (x = requestAnimationFrame(N)));
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
				m && cancelAnimationFrame(x));
		}
	);
}
var w2 = XO,
	E2 = JO,
	T2 = GO,
	x2 = e2,
	A2 = YO,
	R2 = WO,
	C2 = (e, t, i) => {
		const u = new Map(),
			s = i ?? {},
			o = { ...b2, ...s.platform, _c: u };
		return KO(e, t, { ...s, platform: o });
	},
	k2 = "div";
function Q0(e = 0, t = 0, i = 0, u = 0) {
	if (typeof DOMRect == "function") return new DOMRect(e, t, i, u);
	const s = { x: e, y: t, width: i, height: u, top: t, right: e + i, bottom: t + u, left: e };
	return { ...s, toJSON: () => s };
}
function M2(e) {
	if (!e) return Q0();
	const { x: t, y: i, width: u, height: s } = e;
	return Q0(t, i, u, s);
}
function N2(e, t) {
	return {
		contextElement: e || void 0,
		getBoundingClientRect: () => {
			const i = e,
				u = t?.(i);
			return u || !i ? M2(u) : i.getBoundingClientRect();
		},
	};
}
function O2(e) {
	return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e);
}
function K0(e) {
	const t = window.devicePixelRatio || 1;
	return Math.round(e * t) / t;
}
function z2(e, t) {
	return w2(({ placement: i }) => {
		var u;
		const s = (e?.clientHeight || 0) / 2,
			o = typeof t.gutter == "number" ? t.gutter + s : (u = t.gutter) != null ? u : s;
		return { crossAxis: i.split("-")[1] ? void 0 : t.shift, mainAxis: o, alignmentAxis: t.shift };
	});
}
function D2(e) {
	if (e.flip === !1) return;
	const t = typeof e.flip == "string" ? e.flip.split(" ") : void 0;
	return (Jt(!t || t.every(O2), !1), T2({ padding: e.overflowPadding, fallbackPlacements: t }));
}
function j2(e) {
	if (!(!e.slide && !e.overlap))
		return E2({ mainAxis: e.slide, crossAxis: e.overlap, padding: e.overflowPadding, limiter: R2() });
}
function I2(e) {
	return x2({
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
function L2(e, t) {
	if (e) return A2({ element: e, padding: t.arrowPadding });
}
var Vm = tt(function ({
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
		gutter: x,
		arrowPadding: A = 4,
		overflowPadding: N = 8,
		getAnchorRect: q,
		updatePosition: I,
		...C
	}) {
		const k = Hc();
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
			{ portalRef: j, domReady: B } = ym(u, C.portalRef),
			P = De(q),
			ve = De(I),
			be = !!I;
		(ot(() => {
			if (!O?.isConnected) return;
			O.style.setProperty("--popover-overflow-padding", `${N}px`);
			const M = N2(Q, P),
				D = async () => {
					if (!Y) return;
					L || (se.current = se.current || document.createElement("div"));
					const he = L || se.current,
						Se = [
							z2(he, { gutter: x, shift: v }),
							D2({ flip: m, overflowPadding: N }),
							j2({ slide: g, shift: v, overlap: S, overflowPadding: N }),
							L2(he, { arrowPadding: A }),
							I2({ sameWidth: b, fitViewport: p, overflowPadding: N }),
						],
						Re = await C2(M, O, { placement: V, strategy: h ? "fixed" : "absolute", middleware: Se });
					(t?.setState("currentPlacement", Re.placement), fe(!0));
					const Le = K0(Re.x),
						Xe = K0(Re.y);
					if (
						(Object.assign(O.style, { top: "0", left: "0", transform: `translate3d(${Le}px,${Xe}px,0)` }),
						he && Re.middlewareData.arrow)
					) {
						const { x: pt, y: At } = Re.middlewareData.arrow,
							vn = Re.placement.split("-")[0],
							en = he.clientWidth / 2,
							Be = he.clientHeight / 2,
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
							Object.assign(he.style, {
								left: pt != null ? `${pt}px` : "",
								top: At != null ? `${At}px` : "",
								[vn]: "100%",
							}));
					}
				},
				oe = S2(
					M,
					O,
					async () => {
						be ? (await ve({ updatePosition: D }), fe(!0)) : await D();
					},
					{ elementResize: typeof ResizeObserver == "function" },
				);
			return () => {
				(fe(!1), oe());
			};
		}, [t, ae, O, L, Q, O, V, Y, B, h, m, v, g, S, b, p, x, A, N, P, be, ve]),
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
			(C = Cn(C, (M) => (0, w.jsx)(Zc, { value: t, children: M }), [t])),
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
	cj = Ms(
		Fe(function (t) {
			return We(k2, Vm(t));
		}),
		Hc,
	),
	q2 = "div";
function U2(e, ...t) {
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
var $2 = tt(function ({
		store: t,
		modal: i,
		tabIndex: u,
		alwaysVisible: s,
		autoFocusOnHide: o = !0,
		hideOnInteractOutside: f = !0,
		...h
	}) {
		const m = Pc();
		((t = t || m), Jt(t, !1));
		const v = t.useState("baseElement"),
			g = (0, _.useRef)(!1),
			S = dn(t.tag, (b) => b?.renderedItems.length);
		return (
			(h = B_({ store: t, alwaysVisible: s, ...h })),
			(h = Vm({
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
					const { contentElement: x, baseElement: A } = t.getState();
					if (!A) return p;
					const N = xt(A),
						q = [];
					if ((x?.id && q.push(`[aria-controls~="${x.id}"]`), A?.id && q.push(`[aria-controls~="${A.id}"]`), !q.length))
						return [...p, A];
					const I = q.join(","),
						C = N.querySelectorAll(I);
					return [...p, ...C];
				},
				autoFocusOnHide(b) {
					return jc(o, b) ? !1 : g.current ? ((g.current = !1), !1) : !0;
				},
				hideOnInteractOutside(b) {
					var p, x;
					const A = t?.getState(),
						N = (p = A?.contentElement) == null ? void 0 : p.id,
						q = (x = A?.baseElement) == null ? void 0 : x.id;
					if (U2(b.target, N, q)) return !1;
					const I = typeof f == "function" ? f(b) : f;
					return (I && (g.current = b.type === "click"), I);
				},
			})),
			h
		);
	}),
	B2 = Ms(
		Fe(function (t) {
			return We(q2, $2(t));
		}),
		Pc,
	),
	fj = (0, _.createContext)(null),
	dj = (0, _.createContext)(null),
	Ns = ui([Es], [Uc]),
	V2 = Ns.useContext,
	hj = Ns.useScopedContext,
	mj = Ns.useProviderContext,
	vj = Ns.ContextProvider,
	gj = Ns.ScopedContextProvider;
function cS({ popover: e, ...t } = {}) {
	const i = Qc(
		t.store,
		Cm(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
	);
	const u = i?.getState(),
		s = X_({ ...t, store: i }),
		o = Ie(t.placement, u?.placement, "bottom"),
		f = Yr(
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
	return (al(t, [i.popover]), Xt(e, i, "placement"), J_(e, t, i));
}
function H2(e) {
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
function Z2(e) {
	return e?.__unstablePrivateStore;
}
function P2(e = {}) {
	var t;
	e.store;
	const i = (t = e.store) == null ? void 0 : t.getState(),
		u = Ie(e.items, i?.items, e.defaultItems, []),
		s = new Map(u.map((b) => [b.id, b])),
		o = { items: u, renderedItems: Ie(i?.renderedItems, []) },
		f = Z2(e.store),
		h = Yr({ items: u, renderedItems: o.renderedItems }, f),
		m = Yr(o, e.store),
		v = (b) => {
			const p = d_(b, (x) => x.element);
			(h.setState("renderedItems", p), m.setState("renderedItems", p));
		};
	(Zn(m, () => Am(h)),
		Zn(h, () =>
			wc(h, ["items"], (b) => {
				m.setState("items", b.items);
			}),
		),
		Zn(h, () =>
			wc(h, ["renderedItems"], (b) => {
				let p = !0,
					x = requestAnimationFrame(() => {
						const { renderedItems: I } = m.getState();
						b.renderedItems !== I && v(b.renderedItems);
					});
				if (typeof IntersectionObserver != "function") return () => cancelAnimationFrame(x);
				const A = () => {
						if (p) {
							p = !1;
							return;
						}
						(cancelAnimationFrame(x), (x = requestAnimationFrame(() => v(b.renderedItems))));
					},
					N = H2(b.renderedItems),
					q = new IntersectionObserver(A, { root: N });
				for (const I of b.renderedItems) I.element && q.observe(I.element);
				return () => {
					(cancelAnimationFrame(x), q.disconnect());
				};
			}),
		));
	const g = (b, p, x = !1) => {
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
						if (!A) return (x && s.delete(b.id), q.filter(({ id: k }) => k !== b.id));
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
				const { items: x } = h.getState();
				((p = x.find((A) => A.id === b)), p && s.set(b, p));
			}
			return p || null;
		},
		__unstablePrivateStore: h,
	};
}
function Q2(e, t, i) {
	return (al(t, [i.store]), Xt(e, i, "items", "setItems"), e);
}
var K2 = { id: null };
function xi(e, t) {
	return e.find((i) => (t ? !i.disabled && i.id !== t : !i.disabled));
}
function Y2(e, t) {
	return e.filter((i) => (t ? !i.disabled && i.id !== t : !i.disabled));
}
function Y0(e, t) {
	return e.filter((i) => i.rowId === t);
}
function G2(e, t, i = !1) {
	const u = e.findIndex((s) => s.id === t);
	return [...e.slice(u + 1), ...(i ? [K2] : []), ...e.slice(0, u)];
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
function F2(e) {
	return { id: "__EMPTY_ITEM__", disabled: !0, rowId: e };
}
function X2(e, t, i) {
	const u = hS(e);
	for (const s of e)
		for (let o = 0; o < u; o += 1) {
			const f = s[o];
			if (!f || (i && f.disabled)) {
				const h = o === 0 && i ? xi(s) : s[o - 1];
				s[o] = h && t !== h.id && i ? h : F2(h?.rowId);
			}
		}
	return e;
}
function J2(e) {
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
		u = P2(e),
		s = Ie(e.activeId, i?.activeId, e.defaultActiveId),
		o = Yr(
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
				focusShift: x = S.focusShift,
				focusLoop: A = S.focusLoop,
				focusWrap: N = S.focusWrap,
				includesBaseElement: q = S.includesBaseElement,
				renderedItems: I = S.renderedItems,
				rtl: C = S.rtl,
			} = m,
			k = h === "up" || h === "down",
			L = h === "next" || h === "down",
			Q = L ? C && !k : !C || k,
			K = x && !b;
		let O = k ? R_(X2(dS(I), p, K)) : I;
		if (((O = Q ? Hh(O) : O), (O = k ? J2(O) : O), p == null)) return (v = xi(O)) == null ? void 0 : v.id;
		const $ = O.find((P) => P.id === p);
		if (!$) return (g = xi(O)) == null ? void 0 : g.id;
		const V = O.some((P) => P.rowId),
			Y = O.indexOf($),
			ae = O.slice(Y + 1),
			se = Y0(ae, $.rowId);
		if (b) {
			const P = Y2(se, p),
				ve = P.slice(b)[0] || P[P.length - 1];
			return ve?.id;
		}
		const te = A && (k ? A !== "horizontal" : A !== "vertical"),
			fe = V && N && (k ? N !== "horizontal" : N !== "vertical"),
			j = L ? (!V || k) && te && q : k ? q : !1;
		if (te) {
			const P = xi(G2(fe && !j ? O : Y0(O, $.rowId), p, j), p);
			return P?.id;
		}
		if (fe) {
			const P = xi(j ? se : ae, p);
			return j ? P?.id || null : P?.id;
		}
		const B = xi(se, p);
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
			return (h = xi(o.getState().renderedItems)) == null ? void 0 : h.id;
		},
		last: () => {
			var h;
			return (h = xi(Hh(o.getState().renderedItems))) == null ? void 0 : h.id;
		},
		next: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("next", h)),
		previous: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("previous", h)),
		down: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("down", h)),
		up: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("up", h)),
	};
}
function W2(e) {
	return { id: Ii(e.id), ...e };
}
function vS(e, t, i) {
	return (
		(e = Q2(e, t, i)),
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
var ez = Ic() && g_();
function tz({ tag: e, ...t } = {}) {
	const i = Qc(t.store, N_(e, ["value", "rtl"]));
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
		b = Yr(S, f, h, i);
	return (
		ez &&
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
			Dn(b, ["moves", "activeId"], (p, x) => {
				p.moves === x.moves && b.setState("activeValue", void 0);
			}),
		),
		Zn(b, () =>
			wc(b, ["moves", "renderedItems"], (p, x) => {
				if (p.moves === x.moves) return;
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
function nz(e) {
	const t = V2();
	return ((e = { ...e, tag: e.tag !== void 0 ? e.tag : t }), W2(e));
}
function rz(e, t, i) {
	return (
		al(t, [i.tag]),
		Xt(e, i, "value", "setValue"),
		Xt(e, i, "selectedValue", "setSelectedValue"),
		Xt(e, i, "resetValueOnHide"),
		Xt(e, i, "resetValueOnSelect"),
		Object.assign(vS(fS(e, t, i), t, i), { tag: i.tag })
	);
}
function iz(e = {}) {
	e = nz(e);
	const [t, i] = Kc(tz, e);
	return rz(t, i, e);
}
var az = "hr",
	gS = tt(function ({ orientation: t = "horizontal", ...i }) {
		return ((i = { role: "separator", "aria-orientation": t, ...i }), i);
	}),
	yj = Fe(function (t) {
		return We(az, gS(t));
	}),
	uz = "hr",
	yS = tt(function ({ store: t, ...i }) {
		const u = qc();
		((t = t || u), Jt(t, !1));
		const s = t.useState((o) => (o.orientation === "horizontal" ? "vertical" : "horizontal"));
		return ((i = gS({ ...i, orientation: s })), i);
	}),
	pj = Fe(function (t) {
		return We(uz, yS(t));
	}),
	Gh =
		'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function G0(e) {
	const t = e.querySelector("[data-dialog-initial]");
	return t?.matches(Gh) ? t : (e.querySelector(Gh) ?? e);
}
function sl(e) {
	const t = (0, _.useRef)(null);
	((0, _.useEffect)(() => {
		const u = document.activeElement instanceof HTMLElement ? document.activeElement : null,
			s = t.current;
		return (
			(s === null ? null : G0(s))?.focus(),
			() => {
				u?.focus();
			}
		);
	}, []),
		(0, _.useEffect)(() => {
			const u = t.current;
			if (!u) return;
			const s = () => {
					!u.isConnected || document.activeElement !== document.body || G0(u).focus();
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
		const o = [...s.querySelectorAll(Gh)];
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
var lz = 1e3,
	sz = 3e4;
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
			S = { clientRequestId: v.clientRequestId, retryDelayMs: lz, retryTimer: null, settled: !1, cancelled: !1 };
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
			x = {
				...(e.collection === "messages" ? { channelKey: p } : { rootMessageKey: p }),
				text: v.text,
				attachments: v.attachments,
				mentions: v.mentions,
				authorName: e.getAuthorName(),
				clientRequestId: v.clientRequestId,
			},
			A = () => {
				if (!(u.current.get(v.clientRequestId) !== S || S.cancelled)) {
					if (Kk(x)) {
						b(Pk);
						return;
					}
					try {
						Ga(e.client, e.collection === "messages" ? "message-send" : "reply-send", x).then(
							(N) => {
								if (u.current.get(v.clientRequestId) !== S || S.cancelled) return;
								if ("_nay" in N) {
									if (N._nay.name === "unavailable") {
										const C = S.retryDelayMs;
										S.retryTimer = setTimeout(() => {
											((S.retryTimer = null), (S.retryDelayMs = Math.min(C * 2, sz)), A());
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
								const I = Wa(q) ?? Date.now();
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
var oz = ["image/", "video/", "audio/", "application/", "text/"],
	F0 = 20;
function cz(e) {
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
				for (let b = 0; b < e.attachments.length; b += F0) {
					const p = e.attachments.slice(b, b + F0),
						x = await e.client.fetchJson("/api/v1/files/download-urls", {
							body: { fileNodeIds: p.map((N) => N.fileNodeId) },
						}),
						A = qk.safeParse(x);
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
function fz(e) {
	const t = (0, _.useId)(),
		[i, u] = (0, _.useState)([]),
		[s, o] = (0, _.useState)(null),
		[f, h] = (0, _.useState)(!1),
		[m, v] = (0, _.useState)(!1),
		[g, S] = (0, _.useState)(null),
		b = (0, _.useRef)(new Set()),
		p = (0, _.useRef)(!1),
		x = () => {
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
							contentTypePrefixes: oz,
							cursor: s,
						},
					})
					.then((A) => {
						v(!1);
						const N = Lk.safeParse(A);
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
			p.current || ((p.current = !0), x());
		}, []),
		(0, w.jsxs)(sl, {
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
								(0, w.jsx)("button", { type: "button", className: "button", onClick: x, children: "Retry" }),
							],
						})
					: null,
				!m && g === null && i.length === 0 && f
					? (0, w.jsx)("div", { className: "channel-status", children: "No files found." })
					: null,
				!f && !m && g === null
					? (0, w.jsx)("button", { type: "button", className: "button", onClick: x, children: "Load more" })
					: null,
			],
		})
	);
}
var dz = 8,
	hz = 100,
	mz = 10,
	Fh = new WeakMap(),
	yh = new WeakMap();
function vz(e) {
	const t = Fh.get(e);
	if (t !== void 0) return Promise.resolve(t);
	const i = yh.get(e);
	if (i !== void 0) return i;
	const u = gz(e).then((s) => (s.status === "ready" && Fh.set(e, s), yh.delete(e), s));
	return (yh.set(e, u), u);
}
async function gz(e) {
	const t = [];
	let i;
	for (let u = 0; u < mz; u += 1) {
		const s = await e.members.list({ limit: hz, ...(i === void 0 ? {} : { cursor: i }) });
		if ("_nay" in s) return { status: "refused", name: s._nay.name };
		if ((t.push(...s._yay.members), s._yay.cursor === null)) return { status: "ready", members: t };
		i = s._yay.cursor;
	}
	return { status: "ready", members: t };
}
function X0(e) {
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
		x = (0, _.useRef)(null),
		A = iz({
			placement: "top-start",
			resetValueOnHide: !1,
			setOpen: (O) => {
				O || S(null);
			},
		}),
		N = e.client.context.userId,
		q =
			g !== null && m !== null && m !== "loading" && m.status === "ready" ? xk(m.members, g.query, N).slice(0, dz) : [],
		I = g !== null && (m === "loading" || (m !== null && m.status === "refused") || q.length > 0),
		C = () => {
			if (m !== null) return;
			const O = Fh.get(e.client);
			if (O !== void 0) {
				v(O);
				return;
			}
			(v("loading"), vz(e.client).then(v));
		},
		k = (O) => {
			if (g === null) return;
			const $ = p.current?.selectionStart ?? i.length,
				V = Ak(i, g.start, $, O.label);
			(b.current.set(O.userId, O.label), u(V.text), S(null), (x.current = V.caret), A.hide(), A.setValue(""));
		},
		L = () => {
			if (e.busy || e.disabled) return;
			const O = i.trim();
			if (O === "" && s.length === 0) return;
			const $ = Rk(b.current, O);
			(e.onSend(O, s, $), u(""), o([]), S(null), b.current.clear(), A.hide());
		},
		Q = (O) => {
			const $ = O.currentTarget.value,
				V = O.currentTarget.selectionStart ?? $.length;
			u($);
			const Y = Tk($, V);
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
						V = q.find((Y) => X0(Y.userId) === $) ?? q[0];
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
			const O = x.current;
			if (O === null) return;
			x.current = null;
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
						(0, w.jsx)(kN, {
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
							children: (0, w.jsx)(aM, { size: 18, "aria-hidden": "true" }),
						}),
						(0, w.jsx)("button", {
							type: "button",
							className: "composer-action composer-send",
							"aria-label": e.busy ? "Sending…" : "Send",
							disabled: e.busy || e.disabled,
							onClick: L,
							children: (0, w.jsx)(tM, { size: 18, "aria-hidden": "true" }),
						}),
					],
				}),
				(0, w.jsxs)(B2, {
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
								XN,
								{
									id: X0(O.userId),
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
					? (0, w.jsx)(fz, {
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
function yz(e) {
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
					? (h.preventDefault(), s.current[(m + 1) % Qu.length]?.focus())
					: (h.key === "ArrowLeft" || h.key === "ArrowUp") &&
						(h.preventDefault(), s.current[(m + Qu.length - 1) % Qu.length]?.focus());
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
						children: Qu.map((h, m) => {
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
	pz = 300 * 1e3;
function bz(e) {
	return new Date(e).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" });
}
function Xh(e) {
	return new Date(e).toLocaleDateString(void 0, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}
function _z(e, t) {
	const i = new Date(e).toDateString();
	return i === new Date(t).toDateString() ? "Today" : i === new Date(t - _S).toDateString() ? "Yesterday" : Xh(e);
}
function Sz(e) {
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
		h && u.push({ kind: "divider", key: `divider:${f.key}`, label: _z(f.timestamp, t) });
		const m =
			!o && i !== null && f.timestamp > i.lastReadAt && f.createdBy !== i.selfUserId && f.value.deletedAt === null;
		m && ((o = !0), u.push({ kind: "new", key: `new:${f.key}` }));
		const v = s !== null && !h && !m && s.createdBy === f.createdBy && f.timestamp - s.timestamp <= pz;
		(u.push({ kind: "message", doc: f, isContinuation: v }), (s = f));
	}
	return u;
}
function wz(e, t, i) {
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
function Jh(e) {
	const { client: t, collection: i, doc: u, isOwn: s } = e,
		o = u.value.deletedAt !== null,
		f = (0, _.useId)(),
		[h, m] = (0, _.useState)(!1),
		[v, g] = (0, _.useState)(""),
		[S, b] = (0, _.useState)(!1),
		[p, x] = (0, _.useState)(!1),
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
			(V(D), b(!1), x(!1), N(null), D.onDone());
		},
		ae = (D) => {
			if (O.current !== D || D.running || D.cancelled) return;
			((D.running = !0), b(!0), x(!1), N(null));
			const le = (he) => {
					O.current !== D || D.cancelled || ((D.running = !1), (D.uncertain = !0), b(!1), x(!0), N(he));
				},
				oe = D.value.deletedAt !== null && u.value.deletedAt === null;
			try {
				Ga(
					t,
					oe ? "message-delete" : "message-edit",
					oe ? { messageKey: u.key } : { messageKey: u.key, text: D.value.text, mentions: D.value.mentions ?? [] },
				)
					.then((he) => {
						if (O.current !== D || D.cancelled) return;
						if (((D.running = !1), "_nay" in he)) {
							if (he._nay.name === "unavailable") {
								le(he._nay.message);
								return;
							}
							if (D.uncertain && he._nay.name === "conflict") {
								(b(!1), x(!0), N(he._nay.message));
								return;
							}
							if ((V(D), b(!1), x(!1), he._nay.name === "storage_full")) {
								e.onStorageFull(he._nay.message);
								return;
							}
							N(he._nay.message);
							return;
						}
						const Se = typeof he._yay.revision == "number" ? he._yay.revision : u.revision;
						(e.onApplyLocal({ ...u, value: D.value, revision: Se, updatedAt: Date.now() }), Y(D));
					})
					.catch((he) => {
						le(zn(he));
					});
			} catch (he) {
				le(zn(he));
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
			(D !== null && V(D), b(!1), x(!1), N(null));
		};
	((0, _.useEffect)(() => {
		o &&
			(h || q
				? (Q.current && (K.current = "row"), m(!1), g(""), I(!1), b(!1), x(!1), N(null))
				: Q.current && L.current?.focus());
	}, [o, h, q]),
		(0, _.useEffect)(() => {
			const D = O.current;
			if (!(D === null || D.cancelled || u.revision <= D.expectedRevision)) {
				if (u.value.deletedAt !== null && D.value.deletedAt === null) {
					(V(D), b(!1), x(!1), N(null));
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
					x(!1),
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
		ve = (D, le) => {
			if ((N(null), !Array.isArray(e.reactionGroups) && le)) {
				N("Reactions on this message could not be loaded, so they can't be removed right now.");
				return;
			}
			const oe = le;
			Ga(t, "reaction-toggle", { targetKey: u.key, token: D, on: !oe })
				.then((he) => {
					if ("_nay" in he) {
						if (he._nay.name === "storage_full") {
							e.onStorageFull(he._nay.message);
							return;
						}
						N(he._nay.message);
						return;
					}
					const Se = typeof he._yay.key == "string" ? he._yay.key : `${u.key}:${D}:${e.selfUserId}`,
						Re = typeof he._yay.revision == "number" ? he._yay.revision : 0;
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
				.catch((he) => {
					N(zn(he));
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
			(0, w.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: Sz(e.authorName) }),
			(0, w.jsxs)("div", {
				className: e.isContinuation ? "message-head visually-hidden" : "message-head",
				children: [
					(0, w.jsx)("span", { className: "message-author", children: be }),
					(0, w.jsxs)("time", {
						className: "message-time",
						dateTime: new Date(u.timestamp).toISOString(),
						children: [
							Pe ? (0, w.jsxs)("span", { className: "visually-hidden", children: [Xh(u.timestamp), " "] }) : null,
							(0, w.jsx)("span", { className: "message-clock", children: Pe ? bz(u.timestamp) : Xh(u.timestamp) }),
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
										wz(u.value, e.memberNames, e.selfUserId),
										u.value.editedAt !== null
											? (0, w.jsx)("span", { className: "message-edited", children: " (edited)" })
											: null,
									],
								}),
								u.value.attachments.length > 0 ? (0, w.jsx)(cz, { client: t, attachments: u.value.attachments }) : null,
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
															onClick: () => ve(D.token, D.reactedByMe),
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
													children: `${Bk(e.replyCount, e.repliesHasMore)} ${e.replyCount === 1 ? "reply" : "replies"}`,
												}),
												e.replyLatestAt !== null
													? (0, w.jsx)("span", {
															className: "message-thread-summary-recency",
															children: `Last reply ${zc(e.replyLatestAt, Date.now())}`,
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
							(0, w.jsx)(yz, { groups: Array.isArray(e.reactionGroups) ? e.reactionGroups : [], onPick: ve }),
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
				? (0, w.jsxs)(sl, {
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
function tc(e, t) {
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
function Ez(e) {
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
				children: (0, w.jsx)(Jh, {
					client: t,
					collection: "messages",
					doc: u,
					isOwn: u.createdBy === i,
					selfUserId: i,
					memberNames: s,
					isContinuation: !1,
					authorName: s.get(u.createdBy),
					reactionGroups: Wh(e.reactionCoverage, e.reactionGroupsByTarget, u.key),
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
													Jh,
													{
														client: t,
														collection: "replies",
														doc: S.doc,
														isOwn: S.doc.createdBy === i,
														selfUserId: i,
														memberNames: s,
														isContinuation: S.isContinuation,
														authorName: s.get(S.doc.createdBy),
														reactionGroups: Wh(e.reactionCoverage, e.reactionGroupsByTarget, S.doc.key),
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
var nc = { hasMore: !0, deepestRoot: null, incomplete: !1, death: null };
function ES(e, t) {
	return e.incomplete || e.death !== null ? !1 : !e.hasMore || (e.deepestRoot !== null && t < e.deepestRoot);
}
var rc = 100,
	ph = 1e3,
	Tz = 3e4;
function xz(e) {
	let t = null;
	for (const i of e) (t === null || i.updatedAt > t) && (t = i.updatedAt);
	return t;
}
function Az(e) {
	if (typeof e != "object" || e === null) return null;
	const t = e.key;
	return typeof t == "string" ? t : null;
}
function bh(e) {
	let t = null;
	for (const i of e) {
		if (typeof i != "object" || i === null) continue;
		const u = i.updatedAt;
		typeof u == "number" && Number.isFinite(u) && (t === null || u > t) && (t = u);
	}
	return t;
}
function _h(e) {
	return e.newest === null
		? null
		: e.truncated && e.newest === e.current
			? e.newest + 1
			: e.newest > e.current
				? e.newest
				: null;
}
function Sh(e, t) {
	return e.filter((i) => {
		const u = Az(i);
		return u !== null && u.startsWith(t);
	});
}
function wh(e, t) {
	return e.fetchJson("/api/v1/plugin-data/list", { body: t }).then((i) => {
		const u = l_.safeParse(i);
		if (!u.success) throw new Error("Unexpected response from the document list");
		return u.data;
	});
}
function Wh(e, t, i) {
	if (e.incomplete || e.death !== null) return "unknown";
	const u = t.get(i);
	if (u !== void 0 && u.length > 0) return u;
	const s = _c(i);
	return s !== null && ES(e, s) ? (u ?? []) : "pending";
}
function Rz(e, t, i) {
	if (e.incomplete || e.death !== null) return "unknown";
	const u = t.get(i);
	if (u !== void 0 && u.count > 0) return u.count;
	const s = _c(i);
	return s !== null && ES(e, s) ? (u?.count ?? 0) : "unknown";
}
var J0 = 420,
	ic = 244,
	Eh = 340,
	W0 = 16;
function Cz(e) {
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
function kz(e) {
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
			openedAtLastReadAt: x,
		} = e,
		[A, N] = (0, _.useState)([]),
		[q, I] = (0, _.useState)(!1),
		[C, k] = (0, _.useState)(null),
		[L, Q] = (0, _.useState)({ hasMore: !1, atCapacity: !1, incomplete: !1 }),
		[K, O] = (0, _.useState)([]),
		[$, V] = (0, _.useState)([]),
		[Y, ae] = (0, _.useState)(nc),
		[se, te] = (0, _.useState)(nc),
		[fe, j] = (0, _.useState)(null),
		[B, P] = (0, _.useState)({ kind: "idle" }),
		[ve, be] = (0, _.useState)(Eh),
		[Pe, M] = (0, _.useState)(0),
		[D, le] = (0, _.useState)(null),
		[oe, he] = (0, _.useState)(null),
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
		pr = (0, _.useRef)({ reactions: { delayMs: ph, timer: null }, replies: { delayMs: ph, timer: null } }),
		Gr = (0, _.useRef)(!1),
		br = (0, _.useRef)(!1),
		Pn = (0, _.useRef)(null),
		kn = (0, _.useRef)(u.value.name),
		_t = (0, _.useRef)(null),
		tn = (0, _.useRef)(new Map()),
		ct = (0, _.useRef)(null),
		_r = (0, _.useRef)(null),
		ar = (0, _.useRef)(0),
		_n = (0, _.useRef)(0),
		Ht = Fo(u.key),
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
			Ga(t, "reconcile", { channelKey: u.key }).catch(() => {});
		}, [t, u.key]));
	const ur = (J) => {
			const me = nt.current;
			me !== null && (me.apply_window(J), V(me.get_sorted()));
		},
		Sn = (J) => {
			const me = Ce.current;
			if (me === null) return [];
			const Te = me.apply_window(J);
			return (N(me.get_sorted()), Te);
		},
		Sr = (J, me, Te, je, Qe) => {
			const Ct = me.at(-1),
				St =
					Ct === void 0 ? null : J === "reactions" ? (Ct.targetKey === void 0 ? null : _c(Ct.targetKey)) : vs(Ct.key);
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
			const me = pr.current[J];
			me.timer !== null && (clearTimeout(me.timer), (me.timer = null));
		},
		Pt = (J) => {
			(lr(J), (pr.current[J].delayMs = ph));
		},
		In = (J) => {
			if ((J === "reactions" ? et.current : ce.current)?.death != null) return;
			const me = pr.current[J];
			if (me.timer !== null) return;
			const Te = me.delayMs,
				je = Te * (0.5 + Math.random());
			me.timer = setTimeout(() => {
				((me.timer = null), (me.delayMs = Math.min(Te * 2, Tz)), wr(J));
			}, je);
		},
		wr = (J) => {
			if (ut.current[J] || (J === "reactions" ? et.current : ce.current)?.death != null) return;
			ut.current[J] = !0;
			const me = Vt.current,
				Te = pn.current[J];
			wh(t, { collection: J, keyPrefix: Ht, ...(Te === null ? {} : { keyStartExclusive: Te }), limit: rc })
				.then((je) => {
					if (!(!Gr.current || Vt.current !== me)) {
						if (((ut.current[J] = !1), J === "reactions")) {
							const Qe = Ve.current;
							if (Qe === null) return;
							const Ct = Qe.apply_window(je.documents);
							O(Qe.get_sorted());
							const St = je.documents.length === 0 && !je.isDone;
							(Sr("reactions", Ct, je.documents, je.isDone, St), St && In("reactions"));
						} else {
							const Qe = nt.current;
							if (Qe === null) return;
							const Ct = Qe.apply_window(je.documents);
							V(Qe.get_sorted());
							const St = je.documents.length === 0 && !je.isDone;
							(Sr("replies", Ct, je.documents, je.isDone, St), St && In("replies"));
						}
						Qt();
					}
				})
				.catch(() => {
					!Gr.current || Vt.current !== me || ((ut.current[J] = !1), Sr(J, [], [], !0, !0), In(J));
				});
		},
		Lt = (J) => {
			const me = J === "reactions" ? et.current : ce.current;
			me === null || !me.incomplete || me.death !== null || (lr(J), wr(J));
		},
		Qt = () => {
			const J = ze.current;
			if (J !== null)
				for (const me of ["reactions", "replies"]) {
					const Te = me === "reactions" ? et.current : ce.current;
					Te === null ||
						!Te.hasMore ||
						Te.incomplete ||
						Te.death !== null ||
						((Te.deepestRoot === null || Te.deepestRoot < J) && wr(me));
				}
		},
		wa = (J) => {
			if (br.current) return;
			const me = xz(J);
			me !== null && ((br.current = !0), Xe(s), le(me), he(me), Re(me));
		};
	(0, _.useEffect)(() => {
		let J = !0,
			me = 0;
		const Te = Ce.current ?? sh(Sc);
		((Ce.current = Te),
			(nt.current ??= sh(Sc)),
			(Ve.current ??= sh(zk)),
			(Vt.current += 1),
			(Gr.current = !0),
			(br.current = !1),
			(pn.current = { reactions: null, replies: null }),
			(ut.current = { reactions: !1, replies: !1 }),
			Pt("reactions"),
			Pt("replies"),
			(et.current = null),
			(ce.current = null),
			ae(nc),
			te(nc),
			Xe(null),
			le(null),
			he(null),
			Re(null),
			(Ne.current = null));
		const je = t.data.watchWindow({ collection: "messages", keyPrefix: Fo(u.key), pageSize: 100 }, (Qe, Ct) => {
			if (Qe === null) {
				k({ reason: Ct?.reason });
				return;
			}
			k(null);
			const St = Te.apply_window(Qe.docs);
			(N(Te.get_sorted()), I(!0), Q({ hasMore: Qe.hasMore, atCapacity: Qe.atCapacity, incomplete: Qe.incomplete }));
			const ht = Qe.docs.at(-1)?.key ?? null;
			((rt.current = ht),
				(ze.current = ht === null ? null : _c(ht)),
				wa(Qe.docs),
				et.current === null && !ut.current.reactions && wr("reactions"),
				ce.current === null && !ut.current.replies && wr("replies"),
				Qt());
			const $r = _t.current;
			if ($r === null) {
				_t.current = new Set(St.map((an) => an.key));
				return;
			}
			const Gn = Ne.current;
			if (Gn !== null) {
				const an = Qe.docs.findIndex((xr) => xr.key === Gn);
				if (an < 0) Ne.current = null;
				else {
					const xr = Qe.docs.slice(an + 1);
					for (const qn of xr) $r.add(qn.key);
					(xr.length > 0 || !Qe.hasMore) && (Ne.current = null);
				}
			}
			const Yt = St.filter((an) => !$r.has(an.key) && an.createdBy !== i && an.value.deletedAt === null);
			for (const an of St) $r.add(an.key);
			const Bi = Yt.length > 0 ? ++me : me;
			if (Yt.length === 1) {
				const an = Yt[0];
				o.resolve([an.createdBy])
					.then(() => {
						if (!J || Bi !== me) return;
						const xr = o.get(an.createdBy) ?? null,
							qn = an.value.text,
							Fr = qn.length > 80 ? `${qn.slice(0, 80)}…` : qn;
						f(`${xr ?? "Former member"}: ${Fr}`);
					})
					.catch(() => {
						!J || Bi !== me || f(`New message in #${kn.current}`);
					});
			} else Yt.length > 1 && f(`${Yt.length} new messages in #${kn.current}`);
		});
		return (
			(Bt.current = je),
			() => {
				((J = !1), (Gr.current = !1), Pt("reactions"), Pt("replies"), (Bt.current = null), je.unsubscribe());
			}
		);
	}, [t, u.key, s, i, o, f]);
	const Ln = Zt === void 0 ? {} : { scopeId: Zt };
	((0, _.useEffect)(() => {
		if (!(D === null || Le !== s))
			return t.data.watchChanges({ collection: "messages", limit: 100, updatedSince: D, ...Ln }, (J, me) => {
				if (J === null) {
					k({ reason: me?.reason });
					return;
				}
				k(null);
				const Te = Ce.current;
				if (Te === null) return;
				const je = Sh(J.docs, Ht);
				(Te.apply_window(je),
					N(Te.get_sorted()),
					J.truncated &&
						rt.current !== null &&
						wh(t, { collection: "messages", keyPrefix: Ht, keyStartExclusive: rt.current, limit: rc })
							.then((St) => {
								Sn(St.documents);
							})
							.catch(() => {}));
				const Qe = bh(J.docs),
					Ct = _h({ current: D, newest: Qe, truncated: J.truncated });
				Ct !== null && le(Ct);
			});
	}, [t, u.key, D, Le, s, Zt, Ht]),
		(0, _.useEffect)(() => {
			if (!(oe === null || Le !== s))
				return t.data.watchChanges({ collection: "replies", limit: 100, updatedSince: oe, ...Ln }, (J, me) => {
					if (J === null) {
						lr("replies");
						const ht = {
							...(ce.current ?? { hasMore: !1, deepestRoot: null, incomplete: !1, death: null }),
							incomplete: !1,
							death: { reason: me?.reason },
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
					const Qe = Sh(J.docs, Ht);
					(Te.apply_window(Qe), V(Te.get_sorted()), Lt("replies"));
					const Ct = bh(J.docs),
						St = _h({ current: oe, newest: Ct, truncated: J.truncated });
					St !== null && he(St);
				});
		}, [t, u.key, oe, Le, s, Zt, Ht]),
		(0, _.useEffect)(() => {
			if (!(Se === null || Le !== s))
				return t.data.watchChanges({ collection: "reactions", limit: 100, updatedSince: Se, ...Ln }, (J, me) => {
					if (J === null) {
						lr("reactions");
						const ht = {
							...(et.current ?? { hasMore: !1, deepestRoot: null, incomplete: !1, death: null }),
							incomplete: !1,
							death: { reason: me?.reason },
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
					const Qe = Sh(J.docs, Ht);
					(Te.apply_window(Qe), O(Te.get_sorted()), Lt("reactions"));
					const Ct = bh(J.docs),
						St = _h({ current: Se, newest: Ct, truncated: J.truncated });
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
				wh(t, { collection: "replies", keyPrefix: a_(h), limit: rc })
					.then((me) => {
						J || (ur(me.documents), en(!me.isDone), At(!0));
					})
					.catch((me) => {
						J || (ye(zn(me)), At(!0));
					}),
				() => {
					J = !0;
				}
			);
		}, [t, h, s]));
	const nn = pS({
		client: t,
		collection: "messages",
		keyPrefix: Fo(u.key),
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
		for (const me of A) {
			J.add(me.createdBy);
			for (const Te of me.value.mentions ?? []) J.add(Te);
		}
		for (const me of $) {
			J.add(me.createdBy);
			for (const Te of me.value.mentions ?? []) J.add(Te);
		}
		J.size > 0 && o.resolve([...J]);
	}, [A, $, o]),
		(0, _.useEffect)(() => {
			A.length > 0 && p(A[0].timestamp);
		}, [A, p]),
		(0, _.useEffect)(() => {
			const J = A.length > 0 ? A[0].key : null,
				me = J !== null && J !== _r.current,
				Te = nn.pending.length > ar.current;
			((_r.current = J),
				(ar.current = nn.pending.length),
				(me || Te) && ct.current && (ct.current.scrollTop = ct.current.scrollHeight));
		}, [A, nn.pending.length]));
	const qi = () => {
			const J = Bt.current;
			J !== null && ((Ne.current = rt.current), J.loadOlder());
		},
		Ea = () => {
			const J = bt.current ?? rt.current;
			J !== null &&
				(P({ kind: "loading" }),
				t
					.fetchJson("/api/v1/plugin-data/list", {
						body: { collection: "messages", keyPrefix: Fo(u.key), keyStartExclusive: J, limit: rc },
					})
					.then((me) => {
						const Te = l_.safeParse(me);
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
					.catch((me) => {
						if (me.status !== 429) {
							P({ kind: "failed", message: zn(me), retryAt: null });
							return;
						}
						const Te = Cz(me.responseText) ?? 1e3;
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
			const me = new ResizeObserver(() => M(J.clientWidth));
			return (me.observe(J), () => me.disconnect());
		}, [h]));
	const qt = (J) => {
			const me = Math.max(ic, Pe - J0);
			return Math.min(me, Math.max(ic, J));
		},
		Dt = (J) => {
			J.key === "ArrowLeft"
				? (J.preventDefault(), be(qt(ve + W0)))
				: J.key === "ArrowRight"
					? (J.preventDefault(), be(qt(ve - W0)))
					: J.key === "Home" && (J.preventDefault(), be(qt(Eh)));
		},
		rn = (J) => {
			(J.preventDefault(), J.currentTarget.setPointerCapture(J.pointerId));
		},
		Er = (J) => {
			if (!J.currentTarget.hasPointerCapture(J.pointerId)) return;
			const me = Pn.current?.getBoundingClientRect();
			me !== void 0 && be(qt(me.right - J.clientX));
		},
		Ur = (0, _.useMemo)(() => Uk(K, i), [K, i]),
		Tr = (0, _.useMemo)(() => $k($), [$]),
		li = (J) => {
			(Ce.current?.apply_local(J), N(Ce.current?.get_sorted() ?? []));
		},
		Ui = (J) => {
			(nt.current?.apply_local(J), V(nt.current?.get_sorted() ?? []));
		},
		Kn = (J) => {
			(Ve.current?.apply_local(J), O(Ve.current?.get_sorted() ?? []));
		},
		$i = h === null ? [] : $.filter((J) => vs(J.key) === h),
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
		sr = SS([...A].reverse(), Date.now(), x === null ? null : { lastReadAt: x, selfUserId: i }),
		Rt = Math.max(ic, Pe - J0),
		Ta = qt(ve);
	return C !== null && Zt === void 0
		? (0, w.jsx)("div", {
				className: "channel",
				children: (0, w.jsx)("div", {
					className: "channel-dead",
					role: "alert",
					children: tc(C.reason, `messages in #${u.value.name}`),
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
									yn(u.key) ? (0, w.jsx)("p", { className: "channel-privacy", children: cm }) : null,
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
						style: { "--thread-width": `${Ta}px` },
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
												children: tc(C.reason, `messages in #${u.value.name}`),
											})
										: null,
									q && L.hasMore && !L.atCapacity
										? (0, w.jsx)("div", {
												className: "log-older",
												children: (0, w.jsx)("button", {
													type: "button",
													className: "button",
													onClick: qi,
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
																onClick: Ea,
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
												children: tc(Y.death.reason, "reactions in this channel"),
											})
										: null,
									se.death !== null
										? (0, w.jsx)("div", {
												className: "channel-status is-error",
												role: "alert",
												children: tc(se.death.reason, "reply counts in this channel"),
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
																			Jh,
																			{
																				client: t,
																				collection: "messages",
																				doc: J.doc,
																				isOwn: J.doc.createdBy === i,
																				selfUserId: i,
																				memberNames: o,
																				isContinuation: J.isContinuation,
																				authorName: o.get(J.doc.createdBy),
																				reactionGroups: Wh(Y, Ur, J.doc.key),
																				replyCount: Rz(se, Tr, J.doc.key),
																				replyLatestAt: Tr.get(J.doc.key)?.latestAt ?? null,
																				repliesHasMore: se.hasMore,
																				onOpenThread: Kt,
																				threadDisabled: b,
																				replyTriggerRef: (me) => {
																					me === null ? tn.current.delete(J.doc.key) : tn.current.set(J.doc.key, me);
																				},
																				onApplyLocal: li,
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
										"aria-valuenow": Ta,
										"aria-valuemin": ic,
										"aria-valuemax": Rt,
										onKeyDown: Dt,
										onPointerDown: rn,
										onPointerMove: Er,
										onDoubleClick: () => be(qt(Eh)),
									})
								: null,
							Nn !== null
								? (0, w.jsx)(
										Ez,
										{
											client: t,
											userId: i,
											root: Nn,
											replies: $i,
											repliesLoaded: pt,
											repliesTruncated: vn,
											repliesError: Be,
											reactionCoverage: Y,
											reactionGroupsByTarget: Ur,
											memberNames: o,
											isNarrow: v,
											storageFull: fe,
											onStorageFull: j,
											onApplyLocalRoot: li,
											onApplyLocalReply: Ui,
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
var Os = ui([Es], [Uc]),
	Mz = Os.useContext,
	Nz = Os.useScopedContext,
	bj = Os.useProviderContext,
	_j = Os.ContextProvider,
	Sj = Os.ScopedContextProvider,
	wj = (0, _.createContext)(void 0),
	zs = ui([C_], [Zc]),
	Ej = zs.useContext,
	Tj = zs.useScopedContext,
	Hm = zs.useProviderContext,
	Oz = zs.ContextProvider,
	TS = zs.ScopedContextProvider,
	Ds = ui([Es, Oz], [Uc, TS]),
	xS = Ds.useContext,
	zz = Ds.useScopedContext,
	ef = Ds.useProviderContext,
	AS = Ds.ContextProvider,
	Dz = Ds.ScopedContextProvider,
	xj = (0, _.createContext)(void 0),
	jz = "div",
	ki = "";
function Th() {
	ki = "";
}
function Iz(e) {
	const t = e.target;
	return t && ai(t)
		? !1
		: e.key === " " && ki.length
			? !0
			: e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey && /^[\p{Letter}\p{Number}]$/u.test(e.key);
}
function Lz(e, t) {
	if (gr(e)) return !0;
	const i = e.target;
	return i ? t.some((u) => u.element === i) : !1;
}
function qz(e) {
	return e.filter((t) => !t.disabled);
}
function oc(e, t) {
	var i;
	const u = ((i = e.element) == null ? void 0 : i.textContent) || e.children || ("value" in e && e.value);
	return u ? m_(u).trim().toLowerCase().startsWith(t.toLowerCase()) : !1;
}
function Uz(e, t, i) {
	if (!i) return e;
	const u = e.find((s) => s.id === i);
	return !u || !oc(u, t) || (ki !== t && oc(u, ki))
		? e
		: ((ki = t),
			fM(
				e.filter((s) => oc(s, ki)),
				i,
			).filter((s) => s.id !== i));
}
var Zm = tt(function ({ store: t, typeahead: i = !0, ...u }) {
		const s = qc();
		((t = t || s), Jt(t, !1));
		const o = u.onKeyDownCapture,
			f = (0, _.useRef)(0),
			h = De((m) => {
				if ((o?.(m), m.defaultPrevented || !i || !t)) return;
				if (!Iz(m)) return Th();
				const { renderedItems: v, items: g, activeId: S, id: b } = t.getState();
				let p = qz(g.length > v.length ? g : v);
				const x = xt(m.currentTarget),
					A = `[data-offscreen-id="${b}"]`,
					N = x.querySelectorAll(A);
				for (const C of N) {
					const k = C.ariaDisabled === "true" || ("disabled" in C && !!C.disabled);
					p.push({ id: C.id, element: C, disabled: k });
				}
				if ((N.length && (p = d_(p, (C) => C.element)), !Lz(m, p))) return Th();
				(m.preventDefault(),
					window.clearTimeout(f.current),
					(f.current = window.setTimeout(() => {
						ki = "";
					}, 500)));
				const q = m.key.toLowerCase();
				((ki += q), (p = Uz(p, q, S)));
				const I = p.find((C) => oc(C, ki));
				I ? t.move(I.id) : Th();
			});
		return ((u = { ...u, onKeyDownCapture: h }), uu(u));
	}),
	Aj = Fe(function (t) {
		return We(jz, Zm(t));
	}),
	$z = "div";
function Bz({ store: e, ...t }) {
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
		const o = ef();
		((t = t || o), Jt(t, !1));
		const f = t.parent,
			h = t.menubar,
			m = !!f,
			v = Ii(s.id),
			g = s.onKeyDown,
			S = t.useState((k) => k.placement.split("-")[0]),
			b = t.useState((k) => (k.orientation === "both" ? void 0 : k.orientation)),
			p = b !== "vertical",
			x = dn(h, (k) => !!k && k.orientation !== "vertical"),
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
									if (x) return h.next();
								},
								ArrowLeft: () => {
									if (x) return h.previous();
								},
								ArrowDown: () => {
									if (!x) return h.next();
								},
								ArrowUp: () => {
									if (!x) return h.previous();
								},
							}[k.key],
							Q = L?.();
						Q !== void 0 && (k.stopPropagation(), k.preventDefault(), h.move(Q));
					}
				}
			});
		s = Cn(s, (k) => (0, w.jsx)(Dz, { value: t, children: k }), [t]);
		const N = Bz({ store: t, ...s }),
			q = Yc(t.useState("mounted"), s.hidden, i),
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
			(s = wm({ store: t, composite: u, ...s })),
			(s = Zm({ store: t, typeahead: !C, ...s })),
			s
		);
	}),
	Rj = Fe(function (t) {
		return We($z, RS(t));
	});
function xh(e) {
	return [e.clientX, e.clientY];
}
function eb(e, t) {
	const [i, u] = e;
	let s = !1;
	const o = t.length;
	for (let f = o, h = 0, m = f - 1; h < f; m = h++) {
		const [v, g] = t[h],
			[S, b] = t[m],
			[, p] = t[m === 0 ? f - 1 : m - 1] || [0, 0],
			x = (g - b) * (i - v) - (v - S) * (u - g);
		if (b < g) {
			if (u >= b && u < g) {
				if (x === 0) return !0;
				x > 0 && (u === b ? u > p && (s = !s) : (s = !s));
			}
		} else if (g < b) {
			if (u > g && u <= b) {
				if (x === 0) return !0;
				x < 0 && (u === b ? u < p && (s = !s) : (s = !s));
			}
		} else if (u === g && ((i >= S && i <= v) || (i >= v && i <= S))) return !0;
	}
	return s;
}
function Vz(e, t) {
	const { top: i, right: u, bottom: s, left: o } = t,
		[f, h] = e;
	return [f < o ? "left" : f > u ? "right" : null, h < i ? "top" : h > s ? "bottom" : null];
}
function tb(e, t) {
	const i = e.getBoundingClientRect(),
		{ top: u, right: s, bottom: o, left: f } = i,
		[h, m] = Vz(t, i),
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
var Hz = "div";
function CS(e, t, i, u) {
	return ma(t) ? !0 : e ? !!(mn(t, e) || (i && mn(i, e)) || u?.some((s) => CS(e, s, i))) : !1;
}
function Zz({ store: e, ...t }) {
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
var nb = (0, _.createContext)(null),
	kS = tt(function ({
		store: t,
		modal: i = !1,
		portal: u = !!i,
		hideOnEscape: s = !0,
		hideOnHoverOutside: o = !0,
		disablePointerEventsOnApproach: f = !!o,
		...h
	}) {
		const m = Hm();
		((t = t || m), Jt(t, !1));
		const v = (0, _.useRef)(null),
			[g, S] = (0, _.useState)([]),
			b = (0, _.useRef)(0),
			p = (0, _.useRef)(null),
			{ portalRef: x, domReady: A } = ym(u, h.portalRef),
			N = pm(),
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
									ve = te;
								if (CS(P, Y, ve, g)) {
									((p.current = P && ve && mn(ve, P) ? xh(se) : null), window.clearTimeout(b.current), (b.current = 0));
									return;
								}
								if (!b.current) {
									if (B) {
										const be = xh(se);
										if (eb(be, tb(Y, B))) {
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
					const fe = tb(se, te);
					if (eb(xh(ae), fe)) {
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
		const O = (0, _.useContext)(nb);
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
		((h = Cn(h, (Y) => (0, w.jsx)(TS, { value: t, children: (0, w.jsx)(nb.Provider, { value: $, children: Y }) }), [
			t,
			$,
		])),
			(h = { ...h, ref: Wt(v, h.ref) }),
			(h = Zz({ store: t, ...h })));
		const V = t.useState((Y) => i || Y.autoFocusOnShow);
		return (
			(h = Vm({
				store: t,
				modal: i,
				portal: u,
				autoFocusOnShow: V,
				...h,
				portalRef: x,
				hideOnEscape(Y) {
					return jc(s, Y)
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
	Cj = Ms(
		Fe(function (t) {
			return We(Hz, kS(t));
		}),
		Hm,
	),
	Pz = "div",
	Qz = tt(function ({
		store: t,
		modal: i = !1,
		portal: u = !!i,
		hideOnEscape: s = !0,
		autoFocusOnShow: o = !0,
		hideOnHoverOutside: f,
		alwaysVisible: h,
		...m
	}) {
		const v = ef();
		((t = t || v), Jt(t, !1));
		const g = (0, _.useRef)(null),
			S = t.parent,
			b = t.menubar,
			p = !!S,
			x = !!b && !p;
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
							P.current = ((j = Q.find((ve) => !ve.disabled && ve.element)) == null ? void 0 : j.element) || null;
							break;
						case "last":
							P.current =
								((B = [...Q].reverse().find((ve) => !ve.disabled && ve.element)) == null ? void 0 : B.element) || null;
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
					return jc(s, se) ? !1 : (t?.hideAll(), !0);
				},
				hideOnHoverOutside(se) {
					const te = t?.getState().disclosureElement;
					return (typeof f == "function" ? f(se) : (f ?? (p ? !0 : x ? (te ? !ma(te) : !0) : !1)))
						? se.defaultPrevented || !p || !te || (RM(te, "mouseout", se), !ma(te))
							? !0
							: (requestAnimationFrame(() => {
									ma(te) || t?.hide();
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
	Kz = Ms(
		Fe(function (t) {
			return We(Pz, Qz(t));
		}),
		ef,
	),
	Yz = "a",
	MS = tt(function ({ store: t, showOnHover: i = !0, ...u }) {
		const s = Hm();
		((t = t || s), Jt(t, !1));
		const o = _s(u),
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
			v = pm(),
			g = De((x) => {
				if ((h?.(x), o || !t || x.defaultPrevented || f.current || !v() || !m(x))) return;
				const A = x.currentTarget;
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
			b = De((x) => {
				(S?.(x), t && (window.clearTimeout(f.current), (f.current = 0)));
			}),
			p = (0, _.useCallback)(
				(x) => {
					if (!t) return;
					const { anchorElement: A } = t.getState();
					A?.isConnected || t.setAnchorElement(x);
				},
				[t],
			);
		return ((u = { ...u, ref: Wt(p, u.ref), onMouseMove: g, onClick: b }), (u = Ts(u)), u);
	}),
	kj = Fe(function (t) {
		return We(Yz, MS(t));
	}),
	Gz = "button",
	NS = tt(function ({ store: t, ...i }) {
		const u = Hc();
		((t = t || u), Jt(t, !1));
		const s = i.onClick,
			o = De((f) => {
				(t?.setAnchorElement(f.currentTarget), s?.(f));
			});
		return (
			(i = Cn(i, (f) => (0, w.jsx)(Zc, { value: t, children: f }), [t])),
			(i = { ...i, onClick: o }),
			(i = xm({ store: t, ...i })),
			(i = j_({ store: t, ...i })),
			i
		);
	}),
	Mj = Fe(function (t) {
		return We(Gz, NS(t));
	}),
	Fz = "button";
function Xz(e, t) {
	return {
		ArrowDown: t === "bottom" || t === "top" ? "first" : !1,
		ArrowUp: t === "bottom" || t === "top" ? "last" : !1,
		ArrowRight: t === "right" ? "first" : !1,
		ArrowLeft: t === "left" ? "first" : !1,
	}[e.key];
}
function rb(e, t) {
	return !!e?.some((i) => (!i.element || i.element === t ? !1 : i.element.getAttribute("aria-expanded") === "true"));
}
var Jz = tt(function ({ store: t, focusable: i, accessibleWhenDisabled: u, showOnHover: s, ...o }) {
		const f = ef();
		((t = t || f), Jt(t, !1));
		const h = (0, _.useRef)(null),
			m = t.parent,
			v = t.menubar,
			g = !!m,
			S = !!v && !g,
			b = _s(o),
			p = () => {
				const K = h.current;
				K && (t?.setDisclosureElement(K), t?.setAnchorElement(K), t?.show());
			},
			x = o.onFocus,
			A = De((K) => {
				if ((x?.(K), b || K.defaultPrevented || (t?.setAutoFocusOnShow(!1), t?.setActiveId(null), !v) || !S)) return;
				const { items: O } = v.getState();
				rb(O, K.currentTarget) && p();
			}),
			N = dn(t, (K) => K.placement.split("-")[0]),
			q = o.onKeyDown,
			I = De((K) => {
				if ((q?.(K), b || K.defaultPrevented)) return;
				const O = Xz(K, N);
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
			g && (o = { ...o, render: (0, w.jsx)(Tc.div, { render: o.render }) }));
		const L = Ii(o.id),
			Q = dn(m?.combobox || m, "contentElement");
		return (
			(o = {
				id: L,
				role: g || S ? f_(Q, "menuitem") : void 0,
				"aria-haspopup": Dc(t.useState("contentElement"), "menu"),
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
							return S && rb(V);
						})()
					)
						return !1;
					const $ = S ? v : m;
					return ($ && $.setActiveId(K.currentTarget.id), !0);
				},
			})),
			(o = NS({ store: t, toggleOnClick: !g, focusable: i, accessibleWhenDisabled: u, ...o })),
			(o = Zm({ store: t, typeahead: S, ...o })),
			o
		);
	}),
	Wz = Fe(function (t) {
		return We(Fz, Jz(t));
	}),
	eD = "div";
function tD(e, t, i) {
	var u;
	if (!e) return !1;
	if (ma(e)) return !0;
	const s = t?.find((h) => {
			var m;
			return h.element === i ? !1 : ((m = h.element) == null ? void 0 : m.getAttribute("aria-expanded")) === "true";
		}),
		o = (u = s?.element) == null ? void 0 : u.getAttribute("aria-controls");
	if (!o) return !1;
	const f = xt(e).getElementById(o);
	return f ? (ma(f) ? !0 : !!f.querySelector("[role=menuitem][aria-expanded=true]")) : !1;
}
var nD = tt(function ({
		store: t,
		hideOnClick: i = !0,
		preventScrollOnKeyDown: u = !0,
		focusOnHover: s,
		blurOnHoverEnd: o,
		...f
	}) {
		const h = zz(!0),
			m = Nz();
		((t = t || h || m), Jt(t, !1));
		const v = f.onClick,
			g = Mt(i),
			S = "hideAll" in t ? t.hideAll : void 0,
			b = !!S,
			p = De((x) => {
				(v?.(x),
					!x.defaultPrevented &&
						(b_(x) || p_(x) || (S && x.currentTarget.getAttribute("aria-haspopup") !== "menu" && g(x) && S())));
			});
		return (
			(f = {
				role: f_(
					dn(t, (x) => ("contentElement" in x ? x.contentElement : null)),
					"menuitem",
				),
				...f,
				onClick: p,
			}),
			(f = Nm({ store: t, preventScrollOnKeyDown: u, ...f })),
			(f = Mm({
				store: t,
				...f,
				focusOnHover(x) {
					const A = () => (typeof s == "function" ? s(x) : (s ?? !0));
					if (!t || !A()) return !1;
					const { baseElement: N, items: q } = t.getState();
					return b
						? (x.currentTarget.hasAttribute("aria-expanded") && x.currentTarget.focus(), !0)
						: tD(N, q, x.currentTarget)
							? (x.currentTarget.focus(), !0)
							: !1;
				},
				blurOnHoverEnd(x) {
					return typeof o == "function" ? o(x) : (o ?? b);
				},
			})),
			f
		);
	}),
	rD = Lc(
		Fe(function (t) {
			return We(eD, nD(t));
		}),
	);
function iD(e = {}) {
	var t;
	const i = (t = e.store) == null ? void 0 : t.getState(),
		u = cS({ ...e, placement: Ie(e.placement, i?.placement, "bottom") }),
		s = Ie(e.timeout, i?.timeout, 500),
		o = Yr(
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
function aD(e, t, i) {
	return (Xt(e, i, "timeout"), Xt(e, i, "showTimeout"), Xt(e, i, "hideTimeout"), fS(e, t, i));
}
function uD({ combobox: e, parent: t, menubar: i, ...u } = {}) {
	const s = !!i && !t,
		o = Qc(
			u.store,
			N_(t, ["values"]),
			Cm(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
		);
	const f = o.getState(),
		h = mS({ ...u, store: o, orientation: Ie(u.orientation, f.orientation, "vertical") }),
		m = iD({
			...u,
			store: o,
			placement: Ie(u.placement, f.placement, "bottom-start"),
			timeout: Ie(u.timeout, f.timeout, s ? 0 : 150),
			hideTimeout: Ie(u.hideTimeout, f.hideTimeout, 0),
		}),
		v = Yr(
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
								x = h_(S, p);
							return x === p ? b : { ...b, [g]: x !== void 0 && x };
						}));
			},
		}
	);
}
function lD(e, t, i) {
	return (
		al(t, [i.combobox, i.parent, i.menubar]),
		Xt(e, i, "values", "setValues"),
		Object.assign(aD(vS(e, t, i), t, i), { combobox: i.combobox, parent: i.parent, menubar: i.menubar })
	);
}
function sD(e = {}) {
	const t = xS(),
		i = Mz(),
		u = Pc();
	e = {
		...e,
		parent: e.parent !== void 0 ? e.parent : t,
		menubar: e.menubar !== void 0 ? e.menubar : i,
		combobox: e.combobox !== void 0 ? e.combobox : u,
	};
	const [s, o] = Kc(uD, e);
	return lD(s, o, e);
}
function oD(e = {}) {
	return (0, w.jsx)(AS, { value: sD(e), children: e.children });
}
var cD = "hr",
	fD = tt(function ({ store: t, ...i }) {
		const u = xS();
		return ((t = t || u), (i = yS({ store: t, ...i })), i);
	}),
	dD = Fe(function (t) {
		return We(cD, fD(t));
	}),
	hD = (0, _.memo)(function (t) {
		const { channelName: i, items: u } = t;
		return (0, w.jsxs)(oD, {
			placement: "bottom-end",
			children: [
				(0, w.jsx)(Wz, {
					className: "ChannelRowMenu-trigger",
					"aria-label": `Actions for #${i}`,
					children: (0, w.jsx)(rM, { size: 16, "aria-hidden": "true" }),
				}),
				(0, w.jsx)(Kz, {
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					className: "ChannelRowMenu-popover",
					"aria-label": `Actions for #${i}`,
					children: u.map((s) =>
						"separator" in s
							? (0, w.jsx)(dD, { className: "ChannelRowMenu-separator" }, s.id)
							: (0, w.jsx)(
									rD,
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
	mD = 300 * 1e3;
function vD(e) {
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
					(p === void 0 || m - p >= mD) && v.push(S);
				}
				for (let S = 0; S < v.length; S += 50) {
					const b = v.slice(S, S + 50),
						p = e.members
							.resolve(b)
							.then((x) => {
								for (const A of b) (t.current.set(A, x[A] ?? null), i.current.set(A, Date.now()));
							})
							.catch(() => {
								for (const x of b) i.current.delete(x);
							});
					for (const x of b) u.current.set(x, p);
					(p.then(() => {
						for (const x of b) u.current.get(x) === p && u.current.delete(x);
					}),
						g.add(p));
				}
				g.size !== 0 && (await Promise.all(g), s((S) => S + 1));
			},
			[e],
		);
	return (0, _.useMemo)(() => ({ get: o, resolve: f }), [o, f]);
}
function gD(e) {
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
	const t = gD(e.client);
	if (t === null) return (0, w.jsx)("p", { className: "channel-status", role: "status", children: "Loading people…" });
	if (t.error !== null) return (0, w.jsx)("p", { className: "form-error", role: "alert", children: t.error });
	const i = t.members
		.filter((u) => u.userId !== e.selfUserId)
		.sort((u, s) => lc(u.displayName).localeCompare(lc(s.displayName)));
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
											lc(u.displayName),
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
function ib(e) {
	const t = (0, _.useId)(),
		i = (0, _.useId)(),
		u = (0, _.useId)(),
		s = (0, _.useId)(),
		[o, f] = (0, _.useState)(e.initialName),
		[h, m] = (0, _.useState)(e.initialTopic),
		[v, g] = (0, _.useState)(!1),
		[S, b] = (0, _.useState)([]),
		[p, x] = (0, _.useState)(null),
		A = e.busy || e.fieldsLocked,
		N = () => {
			if (e.busy || e.waiting) return;
			const C = o.trim();
			if (C.length < 1 || C.length > 64) {
				x("Enter a name between 1 and 64 characters.");
				return;
			}
			const k = h.trim();
			if (k.length > 250) {
				x("Keep the topic under 250 characters.");
				return;
			}
			(x(null), e.onSubmit(C, k, { isPrivate: v, userIds: S }));
		},
		q = p ?? e.error,
		I = () => {
			e.busy || e.onClose();
		};
	return (0, w.jsxs)(sl, {
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
											(0, w.jsx)("p", { className: "field-note", children: cm }),
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
function yD(e) {
	const t = (0, _.useId)(),
		[i, u] = (0, _.useState)(void 0),
		[s, o] = (0, _.useState)(!1),
		[f, h] = (0, _.useState)(null),
		[m, v] = (0, _.useState)(!1),
		[g, S] = (0, _.useState)(null),
		b = (0, _.useRef)(!1),
		p = (0, _.useRef)(!0),
		x = (0, _.useRef)(0);
	(0, _.useEffect)(
		() => (
			(p.current = !0),
			() => {
				((p.current = !1), (x.current += 1));
			}
		),
		[],
	);
	const A = (0, _.useCallback)(() => {
		const k = (x.current += 1);
		return (
			o(!1),
			h(null),
			Promise.resolve()
				.then(() => e.client.scopes.listPrincipals({ scopeId: e.channel.key }))
				.then((L) => {
					if (!p.current || x.current !== k) return { kind: "cancelled" };
					const Q = cs(L);
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
					!p.current || x.current !== k
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
	return (0, w.jsxs)(sl, {
		labelledBy: t,
		onClose: C,
		children: [
			(0, w.jsxs)("h2", { id: t, className: "dialog-title", children: ["People in #", e.channel.value.name] }),
			(0, w.jsx)("p", { className: "field-note", children: cm }),
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
function pD(e) {
	const t = (0, _.useId)(),
		i = () => {
			e.busy || e.onClose();
		};
	return (0, w.jsxs)(sl, {
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
function bD(e) {
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
					const p = cs(b);
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
	return (0, w.jsxs)(sl, {
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
var _D = [
	{ key: "view:unreads", name: "Unreads" },
	{ key: "view:threads", name: "Threads" },
	{ key: "view:activity", name: "Activity" },
];
function Pm(e) {
	return e === null ? "Former member" : (e ?? "…");
}
function Qm(e) {
	return e.length > 80 ? `${e.slice(0, 80)}…` : e;
}
function SD(e) {
	const t = [];
	for (const s of e.channels) {
		if (yn(s.key)) {
			const f = e.privateActivity.get(s.key),
				h = e.privateCursors.get(s.key)?.activity ?? jr;
			f !== void 0 && !us(h, f.activity) && t.push({ channel: s, at: f.at, mentionCount: 0, preview: null });
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
											(0, w.jsx)("span", { className: "view-row-time", children: zc(s.at, u) }),
											s.preview !== null
												? (0, w.jsx)("span", {
														className: "view-row-preview",
														children: `${Pm(i.get(s.preview.createdBy))}: ${Qm(s.preview.value.text)}`,
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
function wD(e) {
	const t = new Map(e.channels.map((o) => [o.key, o])),
		i = [];
	for (const o of e.feed) {
		if (o.value.deletedAt !== null) continue;
		const f = fm(o.key),
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
															(0, w.jsx)("span", { className: "view-row-title", children: Pm(u.get(h.createdBy)) }),
															(0, w.jsx)("span", { className: "view-row-time", children: zc(h.timestamp, s) }),
															(0, w.jsx)("span", { className: "view-row-preview", children: Qm(h.value.text) }),
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
function ED(e) {
	const [t, i] = (0, _.useState)([]),
		[u, s] = (0, _.useState)(!1),
		[o, f] = (0, _.useState)(!1);
	(0, _.useEffect)(() => {
		const S = sc(Sc);
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
		const b = vs(S.key),
			p = b === null ? null : fm(b),
			x = p === null ? void 0 : h.get(p);
		if (b === null || x === void 0) continue;
		const A = m.get(b);
		A === void 0 ? m.set(b, { channel: x, newest: S, count: 1 }) : (A.count += 1);
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
												(0, w.jsx)("span", { className: "view-row-time", children: zc(b.newest.timestamp, g) }),
												(0, w.jsx)("span", {
													className: "view-row-preview",
													children: `${b.count} ${b.count === 1 ? "reply" : "replies"} · ${Pm(v.get(b.newest.createdBy))}: ${Qm(b.newest.value.text)}`,
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
function TD(e) {
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
var ab = 8,
	xD = 2e3,
	fa = 250,
	ub = 4e3,
	lb = 250,
	AD = 4e3,
	RD = 250,
	CD = 4e3,
	kD =
		"Chitchat cannot confirm whether this private channel was created because no channel is readable at its saved key. Retry checks the same key, or Cancel.",
	MD = "This private channel exists, but you are not in its current access list. Retry checks the same key, or Cancel.",
	sb = 250,
	ob = 4e3,
	cb = 250,
	ND = 4e3,
	Ah = "Wait for pending message changes to finish before leaving this channel or thread.";
function OD(e) {
	const t = e.appendActivity;
	return (
		yk(e.scopeId) &&
		e.keyPrefix === e.scopeId &&
		e.collections.length === qh.length &&
		qh.every((i) => e.collections.includes(i)) &&
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
function zD(e) {
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
function cs(e) {
	if (typeof e != "object" || e === null) return null;
	if ("_yay" in e) {
		const t = e._yay;
		return t === null || zD(t) ? { _yay: t } : null;
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
var jr = { messages: 0, replies: 0 };
function Ri(e, t) {
	return { messages: Math.max(e.messages, t.messages), replies: Math.max(e.replies, t.replies) };
}
function us(e, t) {
	return e.messages >= t.messages && e.replies >= t.replies;
}
function DD(e) {
	let t = 0,
		i = jr;
	for (const u of e.appendActivity)
		u.collection === "messages"
			? ((t = Math.max(t, u.at)), (i = Ri(i, { messages: u.sequence, replies: 0 })))
			: u.collection === "replies" && ((t = Math.max(t, u.at)), (i = Ri(i, { messages: 0, replies: u.sequence })));
	return { at: t, activity: i };
}
function fb(e) {
	((e.cancelled = !0), e.retryTimer !== null && clearTimeout(e.retryTimer));
}
function db(e, t) {
	return t.revision <= e.revision
		? !1
		: ((e.revision = t.revision),
			(e.storedAt = Math.max(e.storedAt, t.at)),
			(e.storedActivity = Ri(e.storedActivity, t.activity)),
			(e.waitingForRefresh = !1),
			!0);
}
function ac(e) {
	((e.cancelled = !0), e.retryTimer !== null && (clearTimeout(e.retryTimer), (e.retryTimer = null)));
}
function Rh(e) {
	((e.cancelled = !0), e.retryTimer !== null && (clearTimeout(e.retryTimer), (e.retryTimer = null)));
}
function Ch(e) {
	((e.cancelled = !0), e.retryTimer !== null && (clearTimeout(e.retryTimer), (e.retryTimer = null)));
}
function jD(e) {
	const { client: t } = e,
		i = t.context.userId,
		u = vD(t),
		[s, o] = (0, _.useState)([]),
		[f, h] = (0, _.useState)([]),
		[m, v] = (0, _.useState)({}),
		[g, S] = (0, _.useState)(!1),
		[b, p] = (0, _.useState)(null),
		[x, A] = (0, _.useState)(!1),
		[N, q] = (0, _.useState)(null),
		[I, C] = (0, _.useState)([]),
		[k, L] = (0, _.useState)(!1),
		[Q, K] = (0, _.useState)({}),
		[O, $] = (0, _.useState)(0),
		[V, Y] = (0, _.useState)(0),
		[ae, se] = (0, _.useState)(null),
		[te, fe] = (0, _.useState)({}),
		[j, B] = (0, _.useState)(null),
		[P, ve] = (0, _.useState)(null),
		[be, Pe] = (0, _.useState)(!1),
		[M, D] = (0, _.useState)(null),
		[le, oe] = (0, _.useState)(!1),
		[he, Se] = (0, _.useState)(!1),
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
		pr = (0, _.useRef)(null),
		Gr = (0, _.useRef)(new Set());
	Gr.current = new Set(s.map((E) => E.key));
	const br = (0, _.useRef)(null),
		Pn = (0, _.useRef)(null),
		kn = (0, _.useRef)(null),
		_t = (0, _.useRef)(null),
		tn = (0, _.useRef)(new Map()),
		ct = (0, _.useRef)(new Map()),
		_r = (0, _.useRef)(new Map()),
		ar = (0, _.useRef)(new Set()),
		_n = (0, _.useRef)(new Map()),
		Ht = (0, _.useRef)(new Map()),
		Zt = (0, _.useRef)(new Map()),
		Qn = (0, _.useRef)(new Set()),
		Mn = (0, _.useRef)(new Map()),
		ur = (0, _.useRef)(new Map()),
		Sn = (0, _.useRef)(new Map()),
		Sr = (0, _.useRef)(new Map()),
		lr = (0, _.useRef)(new Map()),
		Pt = (0, _.useRef)(new Set()),
		In = (0, _.useRef)(!1),
		wr = (0, _.useRef)(0),
		Lt = (0, _.useRef)(!0),
		Qt = (0, _.useRef)(new Map()),
		wa = (0, _.useRef)(new Set()),
		Ln = (0, _.useRef)(new Map()),
		nn = (0, _.useRef)(new Map()),
		qi = (0, _.useRef)(null),
		[Ea, qt] = (0, _.useState)(!1),
		Dt = (0, _.useCallback)(
			(E, R) => {
				const H = pr.current;
				if (H !== null && H.revision > E) return;
				const F = Date.now(),
					ge = {
						key: d0(i),
						value: R,
						revision: E,
						createdBy: i,
						updatedBy: i,
						createdAt: H?.createdAt ?? F,
						updatedAt: F,
						ownership: "owned",
						timestamp: H?.timestamp ?? F,
					};
				((pr.current = ge), q(ge));
			},
			[i],
		),
		rn = (0, _.useCallback)(
			function E() {
				const R = _t.current,
					H = pr.current,
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
							((R.retryTimer = null), (R.retryDelayMs = Math.min(Ee * 2, ub)), E());
						}, Ee)));
					return;
				}
				const ge = { channels: R.channels };
				((R.channels = {}), (R.attemptedRevision = F), (R.retryCurrentRevision = !1));
				const de = R.needsCompaction;
				R.needsCompaction = !1;
				const pe = Za(H?.value ?? { channels: {} }, ge),
					Me = de
						? { channels: Object.fromEntries(Object.entries(pe.channels).filter(([Ee]) => Gr.current.has(Ee))) }
						: pe;
				if (de && Object.keys(Me.channels).length === Object.keys(pe.channels).length) {
					((R.channels = Za({ channels: R.channels }, ge).channels),
						(R.needsCompaction = !0),
						console.warn("[chitchat] The read-cursor map is still too large after cleanup"));
					return;
				}
				((R.running = !0),
					t.data
						.putOwned({ collection: "cursors", key: "me", value: Me, expectedRevision: F })
						.then((Ee) => {
							if (((R.running = !1), !(!Lt.current || _t.current !== R))) {
								if ("_yay" in Ee) ((R.retryDelayMs = fa), Dt(Ee._yay.revision, Me));
								else if (Ee._nay.name === "conflict")
									((R.channels = Za({ channels: R.channels }, ge).channels),
										(R.needsCompaction ||= de),
										(R.retryCurrentRevision = R.waitBeforeRetry),
										(R.retryDelayMs = fa));
								else if (Ee._nay.name === "storage_full") {
									if (
										((R.channels = Za({ channels: R.channels }, ge).channels),
										(R.needsCompaction = !0),
										(R.retryCurrentRevision = !0),
										(R.retryDelayMs = fa),
										de)
									) {
										console.warn("[chitchat] The compacted read-cursor retry was refused", {
											message: Ee._nay.message,
										});
										return;
									}
								} else
									Ee._nay.name === "unavailable"
										? ((R.channels = Za({ channels: R.channels }, ge).channels),
											(R.needsCompaction ||= de),
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
									((R.channels = Za({ channels: R.channels }, ge).channels),
									(R.needsCompaction ||= de),
									(R.retryCurrentRevision = !0),
									(R.waitBeforeRetry = !0),
									E()));
						}));
			},
			[Dt, t],
		),
		Er = (E, R, H) => {
			if (!Lt.current) return;
			const F = _t.current ?? {
				channels: {},
				attemptedRevision: R,
				running: !1,
				needsCompaction: !1,
				retryCurrentRevision: !1,
				waitBeforeRetry: !1,
				retryDelayMs: fa,
				retryTimer: null,
			};
			((F.channels = Za({ channels: F.channels }, E).channels),
				(F.attemptedRevision = Math.max(F.attemptedRevision, R)),
				H === "storage_full"
					? ((F.needsCompaction = !0), (F.retryCurrentRevision = !0))
					: H === "unavailable" && ((F.retryCurrentRevision = !0), F.retryTimer === null && (F.waitBeforeRetry = !0)),
				(_t.current = F),
				rn());
		},
		Ur = (0, _.useCallback)(
			function E(R) {
				const H = () => R.storedAt >= R.pendingAt && us(R.storedActivity, R.pendingActivity),
					F = (Ee) => {
						if (R.cancelled || !Lt.current || !Pt.current.has(R.channelKey) || H() || R.retryTimer !== null) return;
						const $e = R.retryDelayMs;
						R.retryTimer = setTimeout(() => {
							((R.retryTimer = null), (R.retryDelayMs = Math.min($e * 2, ub)), Ee());
						}, $e);
					},
					ge = () => {
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
						const Ee = `${h0(R.channelKey)}:${i}`;
						t.fetchJson("/api/v1/plugin-data/read", { body: { collection: "channels", key: Ee } })
							.then(($e) => {
								if (Qt.current.get(R.channelKey) !== R || R.cancelled) return;
								if (((R.running = !1), !R.waitingForRefresh)) {
									E(R);
									return;
								}
								const Ke = Xo.safeParse($e),
									Oe = Ke.success ? m0(Ke.data.document) : null;
								if (Oe !== null && Oe.key === Ee && Oe.channelKey === R.channelKey && Oe.createdBy === i && db(R, Oe)) {
									((R.retryDelayMs = fa), E(R));
									return;
								}
								F(ge);
							})
							.catch(() => {
								if (!(Qt.current.get(R.channelKey) !== R || R.cancelled)) {
									if (((R.running = !1), !R.waitingForRefresh)) {
										E(R);
										return;
									}
									F(ge);
								}
							});
					};
				if (R.running || R.retryTimer !== null || R.cancelled || !Pt.current.has(R.channelKey)) return;
				if (R.waitingForRefresh) {
					ge();
					return;
				}
				if (H()) {
					Qt.current.delete(R.channelKey);
					return;
				}
				const de = Math.max(R.pendingAt, R.storedAt),
					pe = Ri(R.pendingActivity, R.storedActivity),
					Me = R.revision;
				((R.running = !0),
					t.data
						.putOwned({
							collection: "channels",
							key: h0(R.channelKey),
							value: { at: de, activity: pe },
							expectedRevision: Me,
						})
						.then((Ee) => {
							if (!(Qt.current.get(R.channelKey) !== R || R.cancelled)) {
								if (((R.running = !1), "_yay" in Ee)) {
									((R.retryDelayMs = fa),
										(R.revision = Math.max(R.revision, Ee._yay.revision)),
										(R.storedAt = Math.max(R.storedAt, de)),
										(R.storedActivity = Ri(R.storedActivity, pe)),
										E(R));
									return;
								}
								if (Ee._nay.name === "conflict") {
									if (R.revision !== Me) {
										E(R);
										return;
									}
									((R.waitingForRefresh = !0), ge());
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
		Tr = (0, _.useMemo)(() => new Set(f.map((E) => E.scopeId)), [f]),
		li = (0, _.useMemo)(
			() => f.map((E) => ({ scopeId: E.scopeId, keyPrefix: E.keyPrefix, collections: E.collections })),
			[
				JSON.stringify(
					f
						.map((E) => ({ scopeId: E.scopeId, keyPrefix: E.keyPrefix, collections: [...E.collections].sort() }))
						.sort((E, R) => E.scopeId.localeCompare(R.scopeId)),
				),
			],
		),
		Ui = (0, _.useMemo)(() => [...li].sort((E, R) => E.scopeId.localeCompare(R.scopeId)).slice(0, ab), [li]),
		Kn = (0, _.useMemo)(() => {
			const E = [...li].sort((H, F) => H.scopeId.localeCompare(F.scopeId)),
				R = ae !== null && yn(ae) ? E.find((H) => H.scopeId === ae) : void 0;
			return R === void 0 || Ui.some((H) => H.scopeId === R.scopeId)
				? Ui
				: [R, ...E.filter((H) => H.scopeId !== R.scopeId).slice(0, 7)].sort((H, F) =>
						H.scopeId.localeCompare(F.scopeId),
					);
		}, [Ui, li, ae]),
		$i = (0, _.useMemo)(() => new Set(Kn.map((E) => E.scopeId)), [Kn]),
		Kt = [...s, ...Object.entries(m).flatMap(([E, R]) => (Tr.has(E) && $i.has(E) ? R : []))].sort((E, R) =>
			E.value.name.localeCompare(R.value.name),
		),
		Yn = new Map(
			Object.entries(Q).flatMap(([E, R]) => (Tr.has(E) && $i.has(E) ? R.map((H) => [H.channelKey, H]) : [])),
		),
		Nn = new Map(f.map((E) => [E.scopeId, DD(E)])),
		sr = (0, _.useMemo)(() => jk({ docs: I, cursorChannels: N?.value.channels ?? {}, selfUserId: i }), [I, N, i]),
		Rt = (E) => {
			if (E.key === ae || E.value.archivedAt !== null) return !1;
			if (yn(E.key)) {
				const R = Nn.get(E.key)?.activity ?? jr;
				return !us(Yn.get(E.key)?.activity ?? jr, R);
			}
			return sr.has(E.key);
		},
		Ta = (E) => (yn(E.key) ? (Yn.get(E.key)?.at ?? 0) : (N?.value.channels[E.key] ?? 0)),
		J = (E) => (E.key === ae || E.value.archivedAt !== null ? 0 : (sr.get(E.key)?.mentionCount ?? 0)),
		me = (0, _.useId)(),
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
				const H = { scope: E, running: !1, retryDelayMs: sb, retryTimer: null, cancelled: !1 };
				Sn.current.set(E.scopeId, H);
				const F = () => Lt.current && !H.cancelled && Sn.current.get(E.scopeId) === H,
					ge = () => {
						(Ch(H), Sn.current.get(E.scopeId) === H && Sn.current.delete(E.scopeId));
					},
					de = () => {
						const Me = H.scope;
						(ge(),
							Qn.current.delete(Me.scopeId),
							ur.current.delete(Me.scopeId),
							Ln.current.delete(Me.scopeId),
							ar.current.delete(Me.scopeId),
							_n.current.delete(Me.scopeId),
							Ht.current.delete(Me.scopeId));
						const Ee = new Set(Pt.current);
						(Ee.add(Me.scopeId),
							(Pt.current = Ee),
							Sr.current.set(Me.scopeId, Me.membershipRevision),
							(wr.current += 1),
							h(($e) => {
								const Ke = $e.findIndex((lt) => lt.scopeId === Me.scopeId);
								if (Ke === -1) return [...$e, Me];
								const Oe = [...$e];
								return ((Oe[Ke] = Me), Oe);
							}),
							$(wr.current));
					},
					pe = () => {
						if (!F() || H.running || H.retryTimer !== null) return;
						H.running = !0;
						const Me = H.scope.membershipRevision,
							Ee = () => {
								if (!F() || H.retryTimer !== null) return;
								const Ke = H.retryDelayMs;
								H.retryTimer = setTimeout(() => {
									((H.retryTimer = null), (H.retryDelayMs = Math.min(Ke * 2, ob)), pe());
								}, Ke);
							},
							$e = () => {
								if (((H.running = !1), H.scope.membershipRevision !== Me)) {
									pe();
									return;
								}
								(ur.current.set(E.scopeId, Me), ge());
							};
						Promise.resolve()
							.then(() => t.fetchJson("/api/v1/plugin-data/read", { body: { collection: "channels", key: E.scopeId } }))
							.then((Ke) => {
								if (!F()) return;
								const Oe = Xo.safeParse(Ke);
								if (!Oe.success) {
									((H.running = !1), Ee());
									return;
								}
								if (Oe.data.document === null) {
									$e();
									return;
								}
								const lt = rs(Oe.data.document);
								if (Oe.data.document.collection !== "channels" || lt === null || lt.key !== E.scopeId || !yn(lt.key)) {
									((H.running = !1), Ee());
									return;
								}
								return t.scopes.listPrincipals({ scopeId: lt.key }).then((Bn) => {
									if (!F()) return;
									H.running = !1;
									const yl = cs(Bn);
									if (yl === null || "_nay" in yl) {
										Ee();
										return;
									}
									const ou = yl._yay;
									if (ou === null) {
										$e();
										return;
									}
									if (H.scope.membershipRevision !== Me) {
										pe();
										return;
									}
									if (ou.some((pl) => pl.userId === i)) {
										de();
										return;
									}
									(ur.current.set(E.scopeId, Me), ge());
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
			const E = sc(rs);
			return t.data.watch({ collection: "channels", limit: 100 }, (R, H) => {
				if (R === null) {
					p({ ...(H?.reason === void 0 ? {} : { reason: H.reason }) });
					return;
				}
				const F = R.docs.filter((ge) => {
					const de = ge.key;
					return !(typeof de == "string" && yn(de));
				});
				(o(E.apply_window(F)), S(!0), A(R.truncated));
			});
		}, [t]),
		(0, _.useEffect)(() => {
			let E = !1,
				R = null,
				H = null,
				F = lb;
			const ge = () => {
				E ||
					(R = t.scopes.watchMine((de, pe) => {
						if (E) return;
						if (de === null) {
							if (((In.current = !1), pe?.reason === "unavailable" && H === null)) {
								const Oe = F;
								H = setTimeout(() => {
									((H = null), (F = Math.min(Oe * 2, AD)), ge());
								}, Oe);
							}
							return;
						}
						F = lb;
						const Me = de.filter(OD);
						Mn.current = new Map(Me.map((Oe) => [Oe.scopeId, Oe]));
						for (const [Oe, lt] of Sn.current) Mn.current.has(Oe) || (Ch(lt), Sn.current.delete(Oe));
						const Ee = Me.filter((Oe) => (Qn.current.has(Oe.scopeId) ? (St(Oe), !1) : !0)),
							$e = new Set(Ee.map((Oe) => Oe.scopeId)),
							Ke = !In.current;
						((In.current = !0), Ke && Y((Oe) => Oe + 1));
						for (const [Oe, lt] of Qt.current) $e.has(Oe) || (fb(lt), Qt.current.delete(Oe));
						((Sr.current = new Map(Ee.map((Oe) => [Oe.scopeId, Oe.membershipRevision]))),
							(wr.current += 1),
							(Pt.current = $e),
							h(Ee),
							$(wr.current));
					}));
			};
			return (
				ge(),
				() => {
					((E = !0), (In.current = !1), H !== null && clearTimeout(H), R?.());
				}
			);
		}, [t, St]),
		(0, _.useEffect)(() => {
			const E = Kn.map((R) => {
				const H = sc(rs);
				let F = !1,
					ge = null,
					de = null,
					pe = cb;
				const Me = () => {
					F ||
						!In.current ||
						(ge = t.data.watch({ collection: "channels", keyPrefix: R.keyPrefix, limit: 100 }, (Ee, $e) => {
							if (F) return;
							if (Ee === null) {
								if (
									(ge?.(),
									(ge = null),
									($e?.reason === "unavailable" || $e?.reason === "denied") && In.current && de === null)
								) {
									const lt = pe;
									de = setTimeout(() => {
										((de = null), (pe = Math.min(lt * 2, ND)), Me());
									}, lt);
								}
								return;
							}
							(de !== null && (clearTimeout(de), (de = null)), (pe = cb));
							const Ke = H.apply_window(Ee.docs.filter((lt) => lt.key === R.scopeId));
							v((lt) => ({ ...lt, [R.scopeId]: Ke }));
							const Oe = Ee.docs
								.map(m0)
								.filter((lt) => lt !== null && lt.channelKey === R.scopeId && lt.createdBy === i);
							for (const lt of Oe) {
								const Bn = Qt.current.get(lt.channelKey);
								Bn !== void 0 &&
									db(Bn, lt) &&
									(Bn.retryTimer !== null && (clearTimeout(Bn.retryTimer), (Bn.retryTimer = null)),
									(Bn.retryDelayMs = fa),
									Ur(Bn));
							}
							K((lt) => ({ ...lt, [R.scopeId]: Oe }));
						}));
				};
				return (
					Me(),
					() => {
						((F = !0), de !== null && clearTimeout(de), ge?.());
					}
				);
			});
			return () => {
				for (const R of E) R();
			};
		}, [t, Ur, V, Kn, i]),
		(0, _.useEffect)(() => {
			const E = d0(i);
			return t.data.watch({ collection: "cursors", keyPrefix: E, limit: 1 }, (R) => {
				if (R === null) {
					(q(null), (pr.current = null));
					return;
				}
				const H =
					R.docs.map(Dk).find((F) => F !== null && F.key === E && F.createdBy === i && F.ownership === "owned") ?? null;
				(q(H), (pr.current = H));
			});
		}, [t, i]),
		(0, _.useEffect)(() => {
			const E = sc(Sc);
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
				const F = Kt.find((ge) => ge.key === H.channelKey);
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
		$r = (E, R) => {
			const H = pr.current,
				F = H?.value.channels ?? {};
			if ((F[E] ?? 0) >= R) return;
			const ge = { channels: { ...F, [E]: R } },
				de = H?.revision ?? 0;
			t.data
				.putOwned({ collection: "cursors", key: "me", value: ge, expectedRevision: de })
				.then((pe) => {
					if ("_yay" in pe) {
						Dt(pe._yay.revision, ge);
						return;
					}
					if (pe._nay.name === "conflict") {
						Er(ge, de, "conflict");
						return;
					}
					if (pe._nay.name === "storage_full") {
						Er(ge, de, "storage_full");
						return;
					}
					if (pe._nay.name === "unavailable") {
						Er(ge, de, "unavailable");
						return;
					}
					console.warn("[chitchat] A read-cursor write was refused", { message: pe._nay.message });
				})
				.catch((pe) => {
					(console.warn("[chitchat] A read-cursor write failed", { message: zn(pe) }), Er(ge, de, "unavailable"));
				});
		},
		Gn = (E, R, H) => {
			if (!Pt.current.has(E.key)) return;
			const F = Qt.current.get(E.key);
			if (F !== void 0) {
				((F.pendingAt = Math.max(F.pendingAt, R)), (F.pendingActivity = Ri(F.pendingActivity, H)), Ur(F));
				return;
			}
			const ge = Yn.get(E.key);
			if ((ge?.at ?? 0) >= R && us(ge?.activity ?? jr, H)) return;
			const de = {
				channelKey: E.key,
				pendingAt: R,
				pendingActivity: H,
				storedAt: ge?.at ?? 0,
				storedActivity: ge?.activity ?? jr,
				revision: ge?.revision ?? 0,
				running: !1,
				waitingForRefresh: !1,
				retryDelayMs: fa,
				retryTimer: null,
				cancelled: !1,
			};
			(Qt.current.set(E.key, de), Ur(de));
		},
		Yt = (E, R, H) => {
			yn(E.key) ? Gn(E, R, H ?? jr) : $r(E.key, R);
		},
		Bi = (E, R = !0) => {
			const H = tn.current.get(E);
			if ((H !== void 0 && (clearTimeout(H), tn.current.delete(E)), _r.current.delete(E), R)) {
				const F = Qt.current.get(E);
				F !== void 0 && ((F.cancelled = !0), F.retryTimer !== null && clearTimeout(F.retryTimer), Qt.current.delete(E));
			}
		},
		an = (E, R, H) => {
			const F = _r.current.get(E.key);
			(_r.current.set(E.key, {
				channel: E,
				at: Math.max(F?.at ?? 0, R),
				activity: H === null ? null : Ri(F?.activity ?? jr, H),
			}),
				!tn.current.has(E.key) &&
					tn.current.set(
						E.key,
						setTimeout(() => {
							tn.current.delete(E.key);
							const ge = _r.current.get(E.key);
							(_r.current.delete(E.key), ge !== void 0 && !ar.current.has(E.key) && Yt(ge.channel, ge.at, ge.activity));
						}, xD),
					));
		},
		xr = (E, R) => {
			const H = yn(E.key) ? Nn.get(E.key) : void 0,
				F = { channel: E, at: Math.max(R, H?.at ?? 0), activity: H?.activity ?? (yn(E.key) ? jr : null) };
			if (ar.current.has(E.key)) {
				const ge = _n.current.get(E.key);
				_n.current.set(E.key, {
					channel: E,
					at: Math.max(ge?.at ?? 0, F.at),
					activity: F.activity === null ? null : Ri(ge?.activity ?? jr, F.activity),
				});
				return;
			}
			an(E, F.at, F.activity);
		},
		qn = ae === null ? void 0 : Nn.get(ae),
		Fr = qn?.at ?? 0;
	((0, _.useEffect)(() => {
		if (ae === null || qn === void 0 || !yn(ae)) return;
		const E = Kt.find((H) => H.key === ae),
			R = Yn.get(ae);
		E !== void 0 && ((R?.at ?? 0) < Fr || !us(R?.activity ?? jr, qn.activity)) && an(E, Fr, qn.activity);
	}, [ae, Fr, qn?.activity.messages ?? 0, qn?.activity.replies ?? 0]),
		(0, _.useEffect)(() => {
			const E = wa.current;
			for (const R of Tr) Ln.current.delete(R);
			for (const R of E) {
				if (Tr.has(R)) continue;
				const H = m[R]?.find((F) => F.key === R);
				(H !== void 0 && Ln.current.set(R, H), Bi(R));
			}
			wa.current = new Set(Tr);
		}, [Tr, m]),
		(0, _.useEffect)(() => {
			if (M !== null) return;
			let E = !1;
			for (const [R, H] of Ln.current) {
				const F = Ht.current.get(R);
				if (F === "pending") continue;
				const ge = F !== void 0;
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
					ae === R && (se(null), ve(null), B(null)),
					(ae === R || ge) && (E = !0),
					ar.current.delete(R),
					_n.current.delete(R),
					Ht.current.delete(R),
					Ln.current.delete(R));
			}
			E && qt(!0);
		}, [je, M, Tr, ae]),
		(0, _.useLayoutEffect)(() => {
			if (!Ea || M !== null) return;
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
		}, [M, ye, ce, Ea, P]),
		(0, _.useEffect)(() => {
			const E = qi.current;
			if (!(E === null || M !== null)) {
				if (((qi.current = null), ce && !ye)) {
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
	const ol = () => (ae === null || (ct.current.get(ae) ?? 0) === 0 ? !1 : (je(Ah), !0)),
		wn = (E) => {
			if ((E.key !== ae || P !== null) && ol()) return !1;
			if ((se(E.key), ve(null), Rt(E) || J(E) > 0)) {
				B(Ta(E));
				const R = Nn.get(E.key),
					H = sr.get(E.key)?.latest.timestamp ?? 0;
				Yt(E, R?.at ?? H, R?.activity ?? null);
			} else B(null);
			return (je(`#${E.value.name}`), ye && ht() && (Ce(!1), bt.current?.focus()), !0);
		},
		cl = (E) => {
			(E.key !== ae && ol()) || (se(E.key), ve(null), je(E.name), ye && ht() && (Ce(!1), bt.current?.focus()));
		},
		js = (E, R) => {
			wn(E) && ve(R);
		},
		fl = () => {
			ol() || D({ kind: "create" });
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
					(tn.current.clear(), _r.current.clear());
					for (const H of Qt.current.values()) fb(H);
					(Qt.current.clear(), ar.current.clear(), _n.current.clear(), Ht.current.clear());
					for (const H of Zt.current.values()) Rh(H);
					Zt.current.clear();
					for (const H of Sn.current.values()) Ch(H);
					(Sn.current.clear(),
						Qn.current.clear(),
						ur.current.clear(),
						Mn.current.clear(),
						Sr.current.clear(),
						lr.current.clear(),
						ct.current.clear());
					const R = Pn.current;
					R !== null && (ac(R), (Pn.current = null));
				}
			),
			[],
		));
	const Br = (E) => {
			const R = Zt.current.get(E);
			(R !== void 0 && (Rh(R), Zt.current.delete(E)), lr.current.delete(E), ar.current.delete(E), Ht.current.delete(E));
			const H = _n.current.get(E);
			(_n.current.delete(E), Lt.current && H !== void 0 && Pt.current.has(E) && an(H.channel, H.at, H.activity));
		},
		Un = () => {
			(M?.kind === "exit" && Zt.current.has(M.channel.key) && Br(M.channel.key), (br.current = null));
			const E = Pn.current;
			(E !== null && ac(E),
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
		dl = (E) => {
			(Ln.current.delete(E), Br(E), (qi.current = E), Un());
		},
		Vr = (E, R) => {
			const H = Zt.current.get(E.key);
			(H !== void 0 && (Rh(H), Zt.current.delete(E.key)),
				lr.current.delete(E.key),
				Ht.current.set(E.key, R),
				Ln.current.set(E.key, E));
			const F = new Set(Pt.current);
			(F.delete(E.key),
				(Pt.current = F),
				Sr.current.delete(E.key),
				h((ge) => ge.filter((de) => de.scopeId !== E.key)),
				Un());
		},
		Is = (E) => {
			const R = () => Lt.current && !E.cancelled && Zt.current.get(E.channel.key) === E,
				H = () => {
					(Qn.current.add(E.channel.key),
						ur.current.delete(E.channel.key),
						Vr(E.channel, E.action === "leave" ? "left" : "delete_unconfirmed"));
					const ge = Mn.current.get(E.channel.key);
					ge !== void 0 && St(ge);
				},
				F = () => {
					if (!R() || E.retryTimer !== null) return;
					const ge = E.retryDelayMs;
					E.retryTimer = setTimeout(() => {
						((E.retryTimer = null), (E.retryDelayMs = Math.min(ge * 2, ob)), Is(E));
					}, ge);
				};
			!R() ||
				E.running ||
				E.retryTimer !== null ||
				((E.running = !0),
				Promise.resolve()
					.then(() => t.fetchJson("/api/v1/plugin-data/read", { body: { collection: "channels", key: E.channel.key } }))
					.then((ge) => {
						if (!R()) return;
						const de = Xo.safeParse(ge);
						if (!de.success) {
							((E.running = !1), F());
							return;
						}
						if (de.data.document === null) {
							((E.running = !1), H());
							return;
						}
						const pe = rs(de.data.document);
						if (de.data.document.collection !== "channels" || pe === null || pe.key !== E.channel.key || !yn(pe.key)) {
							((E.running = !1), F());
							return;
						}
						return t.scopes.listPrincipals({ scopeId: pe.key }).then((Me) => {
							if (!R()) return;
							E.running = !1;
							const Ee = cs(Me);
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
							(Ln.current.delete(pe.key), Br(pe.key), Se(!1), oe(!1));
						});
					})
					.catch(() => {
						R() && ((E.running = !1), F());
					}));
		},
		Ls = (E, R, H) => {
			if (ar.current.has(E.key)) return;
			if ((ct.current.get(E.key) ?? 0) > 0) {
				(oe(!1), Be(Ah), je(Ah));
				return;
			}
			const F = _r.current.get(E.key);
			if (F !== void 0) {
				const pe = _n.current.get(E.key);
				_n.current.set(E.key, {
					channel: F.channel,
					at: Math.max(pe?.at ?? 0, F.at),
					activity: F.activity === null ? null : Ri(pe?.activity ?? jr, F.activity),
				});
			}
			(ar.current.add(E.key), Ht.current.set(E.key, "pending"), Bi(E.key, !1), oe(!0), Be(null));
			const ge =
					R === "delete"
						? t.scopes.delete({ scopeId: E.key, ...(H === void 0 ? {} : { expectedPrincipalCount: H }) })
						: t.scopes.removePrincipal({
								scopeId: E.key,
								userId: i,
								...(H === void 0 ? {} : { expectedPrincipalCount: H }),
							}),
				de = (pe) => {
					const Me = { channel: E, action: R, running: !1, retryDelayMs: sb, retryTimer: null, cancelled: !1 };
					(Zt.current.set(E.key, Me), oe(!1), Se(!0), Be(pe), Is(Me));
				};
			ge.then((pe) => {
				if (Lt.current) {
					if ("_nay" in pe) {
						if (pe._nay.name === "unavailable") {
							de(pe._nay.message);
							return;
						}
						(Br(E.key),
							oe(!1),
							Be(
								pe._nay.name === "conflict"
									? "Who is in this channel changed. Close it and try again."
									: pe._nay.message,
							));
						return;
					}
					if (R === "leave" && !pe._yay.deleted) {
						const Me = Sr.current.get(E.key);
						if (Me === void 0) {
							Vr(E, "left");
							return;
						}
						if (Me > pe._yay.membershipRevision) {
							dl(E.key);
							return;
						}
						lr.current.set(E.key, { channel: E, membershipRevision: pe._yay.membershipRevision });
						return;
					}
					Vr(E, pe._yay.deleted ? "deleted" : "left");
				}
			}).catch((pe) => {
				Lt.current && de(zn(pe));
			});
		};
	(0, _.useEffect)(() => {
		for (const [E, R] of lr.current) {
			const H = Sr.current.get(E);
			if (H === void 0) {
				Vr(R.channel, "left");
				continue;
			}
			H > R.membershipRevision && dl(E);
		}
	}, [O]);
	const hl = (E) => {
		const R = () => Lt.current && !E.cancelled && Pn.current === E,
			H = () => {
				if (!R() || E.retryTimer !== null) return;
				const ge = E.retryDelayMs;
				E.retryTimer = setTimeout(() => {
					((E.retryTimer = null), (E.retryDelayMs = Math.min(ge * 2, CD)), hl(E));
				}, ge);
			},
			F = (ge) => {
				(ac(E), (Pn.current = null), Le(!0), pt(!1), oe(!1), Be(ge));
			};
		!R() ||
			E.running ||
			E.retryTimer !== null ||
			((E.running = !0),
			Promise.resolve()
				.then(() => t.fetchJson("/api/v1/plugin-data/read", { body: { collection: "channels", key: E.key } }))
				.then((ge) => {
					if (!R()) return;
					const de = Xo.safeParse(ge);
					if (!de.success) {
						((E.running = !1), H());
						return;
					}
					if (de.data.document === null) {
						((E.running = !1), F(kD));
						return;
					}
					const pe = rs(de.data.document);
					if (de.data.document.collection !== "channels" || pe === null || pe.key !== E.key || !yn(pe.key)) {
						((E.running = !1), H());
						return;
					}
					return t.scopes.listPrincipals({ scopeId: pe.key }).then((Me) => {
						if (!R()) return;
						E.running = !1;
						const Ee = cs(Me);
						if (Ee === null || "_nay" in Ee) {
							H();
							return;
						}
						const $e = Ee._yay;
						if ($e === null || !$e.some((Ke) => Ke.userId === i)) {
							F(MD);
							return;
						}
						(ac(E), (Pn.current = null), se(E.key), B(null), Un());
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
	const ml = (E, R, H) => {
			(oe(!0), Be(null));
			const F = br.current,
				ge = Re && F !== null,
				de = ge
					? F
					: {
							key: gk(H.isPrivate ? "private" : "public"),
							name: E,
							topic: R,
							isPrivate: H.isPrivate,
							userIds: [...H.userIds],
							clientRequestId: crypto.randomUUID(),
						};
			((br.current = de),
				Le(!1),
				pt(!1),
				(async () => {
					const pe = ($e) => {
						(se($e), B(null), Un());
					};
					if (!de.isPrivate) {
						const $e = await Ga(t, "channel-manage", {
							action: "create",
							name: de.name,
							topic: de.topic === "" ? null : de.topic,
							clientRequestId: de.clientRequestId,
						});
						if ("_nay" in $e) {
							if ($e._nay.name === "unavailable") {
								(Le(!0), pt(!1), oe(!1), Be($e._nay.message));
								return;
							}
							((br.current = null), Le(!1), oe(!1), Be($e._nay.message));
							return;
						}
						const Ke = $e._yay.channelKey;
						if (typeof Ke != "string") {
							((br.current = null), Le(!1), oe(!1), Be("The Chitchat backend answered without a channel key"));
							return;
						}
						pe(Ke);
						return;
					}
					const Me = { name: de.name, archivedAt: null, ...(de.topic === "" ? {} : { topic: de.topic }) },
						Ee = await t.scopes.createWithDocument({
							scopeId: de.key,
							collections: qh,
							keyPrefix: de.key,
							principals: de.userIds.map(($e) => ({ userId: $e, level: "member" })),
							document: { collection: "channels", key: de.key, value: Me },
						});
					if ("_nay" in Ee) {
						if (Ee._nay.name === "unavailable") {
							(Le(!0), pt(!1), oe(!1), Be(Ee._nay.message));
							return;
						}
						if (ge && Ee._nay.name === "conflict") {
							const $e = { key: de.key, running: !1, retryDelayMs: RD, retryTimer: null, cancelled: !1 };
							((Pn.current = $e),
								Le(!0),
								pt(!0),
								oe(!1),
								Be("Checking whether this private channel was created."),
								hl($e));
							return;
						}
						((br.current = null), Le(!1), oe(!1), Be(Ee._nay.message));
						return;
					}
					pe(de.key);
				})().catch((pe) => {
					(Le(!0), pt(!1), oe(!1), Be(zn(pe)));
				}));
		},
		qs = (E, R) => {
			const H = kn.current,
				F = At && H !== null,
				ge = (E.value.archivedAt !== null) != (R.archivedAt !== null),
				de = F
					? H
					: { channelKey: E.key, value: R, expectedRevision: E.revision, sectionMoveRequestId: ge ? Symbol() : null };
			((kn.current = de),
				vn(!1),
				!F &&
					de.sectionMoveRequestId !== null &&
					nn.current.set(de.sectionMoveRequestId, {
						channelKey: de.channelKey,
						sourceRevision: de.expectedRevision,
						archived: de.value.archivedAt !== null,
					}),
				oe(!0),
				Be(null),
				Ga(t, "channel-manage", {
					action: "update",
					channelKey: de.channelKey,
					name: de.value.name,
					topic: de.value.topic ?? null,
					archived: de.value.archivedAt !== null,
				})
					.then((pe) => {
						if ("_nay" in pe) {
							if (pe._nay.name === "unavailable" || (F && pe._nay.name === "conflict")) {
								(vn(!0), oe(!1), Be(pe._nay.message));
								return;
							}
							((kn.current = null),
								vn(!1),
								de.sectionMoveRequestId !== null &&
									pe._nay.name !== "conflict" &&
									nn.current.delete(de.sectionMoveRequestId),
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
		tf = (E) => {
			const R = Symbol();
			(nn.current.set(R, { channelKey: E.key, sourceRevision: E.revision, archived: !1 }),
				Ga(t, "channel-manage", { action: "update", channelKey: E.key, archived: !1 })
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
				children: [(0, w.jsx)("h1", { children: "Chitchat" }), (0, w.jsx)("p", { children: TD(b.reason) })],
			}),
		});
	const xa = (E, R) => E.value.name.localeCompare(R.value.name),
		On = Kt.filter((E) => E.value.archivedAt === null).sort(xa),
		vl = Kt.filter((E) => E.value.archivedAt !== null).sort(xa),
		$n = Kt.find((E) => E.key === ae) ?? null,
		Vi = $n !== null && yn($n.key) ? (f.find((E) => E.scopeId === $n.key)?.membershipRevision ?? 0) : 0,
		Hr = $n !== null && (te[$n.key] ?? 0) > 0,
		gl = On.filter(Rt).length,
		Aa = On.reduce((E, R) => E + J(R), 0),
		su = Math.max(0, f.length - Kn.length),
		Hi = (E, R, H) =>
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
									const ge = Rt(F),
										de = J(F),
										pe = f.find((Me) => Me.scopeId === F.key);
									return (0, w.jsxs)(
										"li",
										{
											className: "channel-item",
											"data-channel-key": F.key,
											children: [
												(0, w.jsxs)("button", {
													type: "button",
													className: ge || de > 0 ? "channel-link is-unread" : "channel-link",
													"aria-current": F.key === ae ? "page" : void 0,
													disabled: Hr && (F.key !== ae || P !== null),
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
														de > 0
															? (0, w.jsxs)("span", {
																	className: "mention-badge",
																	children: [
																		de,
																		(0, w.jsx)("span", { className: "visually-hidden", children: " unread mentions" }),
																	],
																})
															: ge
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
													children: (0, w.jsx)(hD, {
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
																: { id: "unarchive", label: `Unarchive #${F.value.name}`, onSelect: () => tf(F) },
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
									disabled: Hr,
									onClick: fl,
									children: "Create channel",
								}),
							],
						}),
						x
							? (0, w.jsx)("div", {
									className: "channel-status",
									role: "status",
									children: "Only the first 100 channels are shown.",
								})
							: null,
						su > 0
							? (0, w.jsx)("div", {
									className: "channel-status",
									role: "status",
									children: `This page can watch ${ab} private channels at a time; ${su} more ${su === 1 ? "is" : "are"} hidden.`,
								})
							: null,
						(0, w.jsx)("ul", {
							className: "view-list",
							"aria-label": "Views",
							children: _D.map((E) =>
								(0, w.jsx)(
									"li",
									{
										className: "view-item",
										children: (0, w.jsxs)("button", {
											type: "button",
											className:
												E.key === "view:unreads" && (gl > 0 || Aa > 0)
													? "channel-link view-link is-unread"
													: "channel-link view-link",
											"aria-current": ae === E.key ? "page" : void 0,
											disabled: Hr,
											onClick: () => cl(E),
											children: [
												(0, w.jsx)("span", {
													className: "channel-initial",
													"aria-hidden": "true",
													children: E.name.slice(0, 1),
												}),
												(0, w.jsx)("span", { className: "channel-name", children: E.name }),
												E.key === "view:unreads" && Aa > 0
													? (0, w.jsxs)("span", {
															className: "mention-badge",
															children: [
																Aa,
																(0, w.jsx)("span", { className: "visually-hidden", children: " mentions of you" }),
															],
														})
													: E.key === "view:unreads" && gl > 0
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
								: (0, w.jsxs)(w.Fragment, { children: [Hi("Channels", On, me), Hi("Archived", vl, Te)] })
							: (0, w.jsx)("div", { className: "channel-status", role: "status", children: "Loading channels…" }),
					],
				}),
			}),
			(0, w.jsx)("main", {
				className: "main",
				children:
					ae === "view:unreads"
						? (0, w.jsx)(SD, {
								channels: On,
								publicUnreads: sr,
								privateCursors: Yn,
								privateActivity: Nn,
								recentDead: k,
								memberNames: u,
								onSelectChannel: wn,
							})
						: ae === "view:threads"
							? (0, w.jsx)(ED, { client: t, channels: On, memberNames: u, onOpenThread: js })
							: ae === "view:activity"
								? (0, w.jsx)(wD, {
										feed: I,
										channels: On,
										selfUserId: i,
										recentDead: k,
										memberNames: u,
										onSelectChannel: wn,
									})
								: $n !== null
									? (0, w.jsx)(
											kz,
											{
												client: t,
												userId: i,
												channel: $n,
												readGeneration: Vi,
												memberNames: u,
												announce: je,
												threadRootKey: P,
												setThreadRootKey: ve,
												isNarrow: ce,
												onRequestStart: () => Qe($n.key),
												onRequestSettled: () => Ct($n.key),
												sendInFlight: Hr,
												onNewestVisible: (E) => xr($n, E),
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
				? (0, w.jsx)(ib, {
						title: "Create channel",
						submitLabel: "Create",
						initialName: "",
						initialTopic: "",
						privacy: { client: t, selfUserId: i },
						busy: le,
						waiting: Xe,
						fieldsLocked: Re,
						error: en,
						onSubmit: ml,
						onClose: Un,
					})
				: null,
			M !== null && M.kind === "people"
				? (0, w.jsx)(yD, { client: t, channel: M.channel, selfUserId: i, memberNames: u, onClose: Un })
				: null,
			M !== null && M.kind === "rename"
				? (0, w.jsx)(ib, {
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
							qs(M.channel, { ...M.channel.value, name: E, ...(R === "" ? { topic: void 0 } : { topic: R }) }),
						onClose: Un,
					})
				: null,
			M !== null && M.kind === "archive"
				? (0, w.jsx)(pD, {
						channelName: M.channel.value.name,
						busy: le,
						retry: At,
						error: en,
						onConfirm: () => qs(M.channel, { ...M.channel.value, archivedAt: Date.now() }),
						onClose: Un,
					})
				: null,
			M !== null && M.kind === "exit"
				? (0, w.jsx)(bD, {
						client: t,
						channel: M.channel,
						action: M.action,
						busy: le,
						waiting: he,
						error: en,
						onConfirm: (E) => Ls(M.channel, M.action, E),
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
var em = (0, dk.createRoot)(DS);
em.render((0, w.jsx)(zS, { message: "Connecting…" }));
gT().then(
	(e) => {
		(e.context.kind === "page" && (document.title = e.context.pageTitle), em.render((0, w.jsx)(jD, { client: e })));
	},
	(e) => {
		em.render((0, w.jsx)(zS, { message: e instanceof Error ? e.message : String(e), isError: !0 }));
	},
);
