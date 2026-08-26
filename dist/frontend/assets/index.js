var e1 = Object.create,
	Mp = Object.defineProperty,
	t1 = Object.getOwnPropertyDescriptor,
	n1 = Object.getOwnPropertyNames,
	i1 = Object.getPrototypeOf,
	r1 = Object.prototype.hasOwnProperty,
	Jn = (e, n) => () => (n || (e((n = { exports: {} }).exports, n), (e = null)), n.exports),
	a1 = (e, n, r, u) => {
		if ((n && typeof n == "object") || typeof n == "function")
			for (var s = n1(n), o = 0, f = s.length, h; o < f; o++)
				((h = s[o]),
					!r1.call(e, h) &&
						h !== r &&
						Mp(e, h, { get: ((m) => n[m]).bind(null, h), enumerable: !(u = t1(n, h)) || u.enumerable }));
		return e;
	},
	zp = (e, n, r) => (
		(r = e != null ? e1(i1(e)) : {}),
		a1(n || !e || !e.__esModule ? Mp(r, "default", { value: e, enumerable: !0 }) : r, e)
	);
(function () {
	const n = document.createElement("link").relList;
	if (n && n.supports && n.supports("modulepreload")) return;
	for (const s of document.querySelectorAll('link[rel="modulepreload"]')) u(s);
	new MutationObserver((s) => {
		for (const o of s)
			if (o.type === "childList")
				for (const f of o.addedNodes) f.tagName === "LINK" && f.rel === "modulepreload" && u(f);
	}).observe(document, { childList: !0, subtree: !0 });
	function r(s) {
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
		const o = r(s);
		fetch(s.href, o);
	}
})();
var Yy = "1.44.0",
	bi = [],
	Fn = [],
	u1 = Uint8Array,
	gd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var tu = 0, l1 = gd.length; tu < l1; ++tu) ((bi[tu] = gd[tu]), (Fn[gd.charCodeAt(tu)] = tu));
Fn[45] = 62;
Fn[95] = 63;
function s1(e) {
	var n = e.length;
	if (n % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
	var r = e.indexOf("=");
	r === -1 && (r = n);
	var u = r === n ? 0 : 4 - (r % 4);
	return [r, u];
}
function o1(e, n, r) {
	return ((n + r) * 3) / 4 - r;
}
function pl(e) {
	var n,
		r = s1(e),
		u = r[0],
		s = r[1],
		o = new u1(o1(e, u, s)),
		f = 0,
		h = s > 0 ? u - 4 : u,
		m;
	for (m = 0; m < h; m += 4)
		((n =
			(Fn[e.charCodeAt(m)] << 18) |
			(Fn[e.charCodeAt(m + 1)] << 12) |
			(Fn[e.charCodeAt(m + 2)] << 6) |
			Fn[e.charCodeAt(m + 3)]),
			(o[f++] = (n >> 16) & 255),
			(o[f++] = (n >> 8) & 255),
			(o[f++] = n & 255));
	return (
		s === 2 && ((n = (Fn[e.charCodeAt(m)] << 2) | (Fn[e.charCodeAt(m + 1)] >> 4)), (o[f++] = n & 255)),
		s === 1 &&
			((n = (Fn[e.charCodeAt(m)] << 10) | (Fn[e.charCodeAt(m + 1)] << 4) | (Fn[e.charCodeAt(m + 2)] >> 2)),
			(o[f++] = (n >> 8) & 255),
			(o[f++] = n & 255)),
		o
	);
}
function c1(e) {
	return bi[(e >> 18) & 63] + bi[(e >> 12) & 63] + bi[(e >> 6) & 63] + bi[e & 63];
}
function f1(e, n, r) {
	for (var u, s = [], o = n; o < r; o += 3)
		((u = ((e[o] << 16) & 16711680) + ((e[o + 1] << 8) & 65280) + (e[o + 2] & 255)), s.push(c1(u)));
	return s.join("");
}
function bl(e) {
	for (var n, r = e.length, u = r % 3, s = [], o = 16383, f = 0, h = r - u; f < h; f += o)
		s.push(f1(e, f, f + o > h ? h : f + o));
	return (
		u === 1
			? ((n = e[r - 1]), s.push(bi[n >> 2] + bi[(n << 4) & 63] + "=="))
			: u === 2 &&
				((n = (e[r - 2] << 8) + e[r - 1]), s.push(bi[n >> 10] + bi[(n >> 4) & 63] + bi[(n << 2) & 63] + "=")),
		s.join("")
	);
}
function Rr(e) {
	if (e === void 0) return {};
	if (!jp(e)) throw new Error(`The arguments to a Convex function must be an object. Received: ${e}`);
	return e;
}
function Dp(e) {
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
function jp(e) {
	const n = typeof e == "object",
		r = Object.getPrototypeOf(e),
		u = r === null || r === Object.prototype || r?.constructor?.name === "Object";
	return n && u;
}
var Lp = !0,
	hu = BigInt("-9223372036854775808"),
	gh = BigInt("9223372036854775807"),
	Qd = BigInt("0"),
	d1 = BigInt("8"),
	h1 = BigInt("256"),
	yd =
		"This commit timestamp is unresolved: its value is assigned when the mutation commits. Read the document after the mutation completes to get its value.",
	qp = class {
		[Symbol.toPrimitive](e) {
			if (e === "string") return this.toString();
			throw new Error(yd);
		}
		valueOf() {
			throw new Error(yd);
		}
		toJSON() {
			throw new Error(yd);
		}
		toString() {
			return "[unresolved commit timestamp]";
		}
	},
	m1 = new qp();
function Up(e) {
	return Number.isNaN(e) || !Number.isFinite(e) || Object.is(e, -0);
}
function v1(e) {
	e < Qd && (e -= hu + hu);
	let n = e.toString(16);
	n.length % 2 === 1 && (n = "0" + n);
	const r = new Uint8Array(new ArrayBuffer(8));
	let u = 0;
	for (const s of n.match(/.{2}/g).reverse()) (r.set([parseInt(s, 16)], u++), (e >>= d1));
	return bl(r);
}
function g1(e) {
	const n = pl(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	let r = Qd,
		u = Qd;
	for (const s of n) ((r += BigInt(s) * h1 ** u), u++);
	return (r > gh && (r += hu + hu), r);
}
function y1(e) {
	if (e < hu || gh < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
	const n = new ArrayBuffer(8);
	return (new DataView(n).setBigInt64(0, e, !0), bl(new Uint8Array(n)));
}
function p1(e) {
	const n = pl(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	return new DataView(n.buffer).getBigInt64(0, !0);
}
var b1 = DataView.prototype.setBigInt64 ? y1 : v1,
	_1 = DataView.prototype.getBigInt64 ? p1 : g1,
	Ky = 1024;
function Yd(e) {
	if (e.length > Ky) throw new Error(`Field name ${e} exceeds maximum field name length ${Ky}.`);
	if (e.startsWith("$")) throw new Error(`Field name ${e} starts with a '$', which is reserved.`);
	for (let n = 0; n < e.length; n += 1) {
		const r = e.charCodeAt(n);
		if (r < 32 || r >= 127)
			throw new Error(
				`Field name ${e} has invalid character '${e[n]}': Field names can only contain non-control ASCII characters`,
			);
	}
}
function mu(e) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return e;
	if (Array.isArray(e)) return e.map((u) => mu(u));
	if (typeof e != "object") throw new Error(`Unexpected type of ${e}`);
	const n = Object.entries(e);
	if (n.length === 1) {
		const u = n[0][0];
		if (u === "$bytes") {
			if (typeof e.$bytes != "string") throw new Error(`Malformed $bytes field on ${e}`);
			return pl(e.$bytes).buffer;
		}
		if (u === "$integer") {
			if (typeof e.$integer != "string") throw new Error(`Malformed $integer field on ${e}`);
			return _1(e.$integer);
		}
		if (u === "$float") {
			if (typeof e.$float != "string") throw new Error(`Malformed $float field on ${e}`);
			const s = pl(e.$float);
			if (s.byteLength !== 8) throw new Error(`Received ${s.byteLength} bytes, expected 8 for $float`);
			const o = new DataView(s.buffer).getFloat64(0, Lp);
			if (!Up(o)) throw new Error(`Float ${o} should be encoded as a number`);
			return o;
		}
		if (u === "$commitTs") {
			if (e.$commitTs !== null) throw new Error(`Malformed $commitTs field on ${e}`);
			return m1;
		}
		if (u === "$set") throw new Error("Received a Set which is no longer supported as a Convex type.");
		if (u === "$map") throw new Error("Received a Map which is no longer supported as a Convex type.");
	}
	const r = {};
	for (const [u, s] of Object.entries(e)) (Yd(u), (r[u] = mu(s)));
	return r;
}
var Gy = 16384;
function ou(e) {
	const n = JSON.stringify(e, (r, u) => (u === void 0 ? "undefined" : typeof u == "bigint" ? `${u.toString()}n` : u));
	if (n.length > Gy) {
		const r = "[...truncated]";
		let u = Gy - 14;
		const s = n.codePointAt(u - 1);
		return (s !== void 0 && s > 65535 && (u -= 1), n.substring(0, u) + r);
	}
	return n;
}
function bo(e, n, r, u) {
	if (e === void 0) {
		const f = r && ` (present at path ${r} in original object ${ou(n)})`;
		throw new Error(
			`undefined is not a valid Convex value${f}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`,
		);
	}
	if (e === null) return e;
	if (typeof e == "bigint") {
		if (e < hu || gh < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
		return { $integer: b1(e) };
	}
	if (typeof e == "number")
		if (Up(e)) {
			const f = new ArrayBuffer(8);
			return (new DataView(f).setFloat64(0, e, Lp), { $float: bl(new Uint8Array(f)) });
		} else return e;
	if (typeof e == "boolean" || typeof e == "string") return e;
	if (e instanceof ArrayBuffer) return { $bytes: bl(new Uint8Array(e)) };
	if (e instanceof qp) return { $commitTs: null };
	if (Array.isArray(e)) return e.map((f, h) => bo(f, n, r + `[${h}]`, !1));
	if (e instanceof Set) throw new Error(pd(r, "Set", [...e], n));
	if (e instanceof Map) throw new Error(pd(r, "Map", [...e], n));
	if (!jp(e)) {
		const f = e?.constructor?.name,
			h = f ? `${f} ` : "";
		throw new Error(pd(r, h, e, n));
	}
	const s = {},
		o = Object.entries(e);
	o.sort(([f, h], [m, v]) => (f === m ? 0 : f < m ? -1 : 1));
	for (const [f, h] of o)
		h !== void 0 ? (Yd(f), (s[f] = bo(h, n, r + `.${f}`, !1))) : u && (Yd(f), (s[f] = S1(h, n, r + `.${f}`)));
	return s;
}
function pd(e, n, r, u) {
	return e
		? `${n}${ou(r)} is not a supported Convex type (present at path ${e} in original object ${ou(u)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
		: `${n}${ou(r)} is not a supported Convex type.`;
}
function S1(e, n, r) {
	if (e === void 0) return { $undefined: null };
	if (n === void 0) throw new Error(`Programming error. Current value is ${ou(e)} but original value is undefined`);
	return bo(e, n, r, !1);
}
function oa(e) {
	return bo(e, e, "", !1);
}
var w1 = Object.defineProperty,
	E1 = (e, n, r) => (n in e ? w1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	bd = (e, n, r) => E1(e, typeof n != "symbol" ? n + "" : n, r),
	Fy,
	Xy,
	T1 = Symbol.for("ConvexError"),
	Kd = class extends ((Xy = Error), (Fy = T1), Xy) {
		constructor(e) {
			(super(typeof e == "string" ? e : ou(e)),
				bd(this, "name", "ConvexError"),
				bd(this, "data"),
				bd(this, Fy, !0),
				(this.data = e));
		}
	},
	x1 = Object.defineProperty,
	A1 = (e, n, r) => (n in e ? x1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Jy = (e, n, r) => A1(e, typeof n != "symbol" ? n + "" : n, r),
	C1 = "color:rgb(0, 145, 255)";
function $p(e) {
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
var Bp = class {
	constructor(e) {
		(Jy(this, "_onLogLineFuncs"), Jy(this, "_verbose"), (this._onLogLineFuncs = {}), (this._verbose = e.verbose));
	}
	addLogLineListener(e) {
		let n = Math.random().toString(36).substring(2, 15);
		for (let r = 0; r < 10 && this._onLogLineFuncs[n] !== void 0; r++) n = Math.random().toString(36).substring(2, 15);
		return (
			(this._onLogLineFuncs[n] = e),
			() => {
				delete this._onLogLineFuncs[n];
			}
		);
	}
	logVerbose(...e) {
		if (this._verbose)
			for (const n of Object.values(this._onLogLineFuncs)) n("debug", `${new Date().toISOString()}`, ...e);
	}
	log(...e) {
		for (const n of Object.values(this._onLogLineFuncs)) n("info", ...e);
	}
	warn(...e) {
		for (const n of Object.values(this._onLogLineFuncs)) n("warn", ...e);
	}
	error(...e) {
		for (const n of Object.values(this._onLogLineFuncs)) n("error", ...e);
	}
};
function R1(e) {
	const n = new Bp(e);
	return (
		n.addLogLineListener((r, ...u) => {
			switch (r) {
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
		n
	);
}
function O1(e) {
	return new Bp(e);
}
function _o(e, n, r, u, s) {
	const o = $p(r);
	if ((typeof s == "object" && (s = `ConvexError ${JSON.stringify(s.errorData, null, 2)}`), n === "info")) {
		const f = s.match(/^\[.*?\] /);
		if (f === null) {
			e.error(`[CONVEX ${o}(${u})] Could not parse console.log`);
			return;
		}
		const h = s.slice(1, f[0].length - 2),
			m = s.slice(f[0].length);
		e.log(`%c[CONVEX ${o}(${u})] [${h}]`, C1, m);
	} else e.error(`[CONVEX ${o}(${u})] ${s}`);
}
function N1(e, n) {
	const r = `[CONVEX FATAL ERROR] ${n}`;
	return (e.error(r), new Error(r));
}
function au(e, n, r) {
	return `[CONVEX ${$p(e)}(${n})] ${r.errorMessage}
  Called by client`;
}
function Gd(e, n) {
	return ((n.data = e.errorData), n);
}
function ca(e) {
	const n = e.split(":");
	let r, u;
	return (
		n.length === 1 ? ((r = n[0]), (u = "default")) : ((r = n.slice(0, n.length - 1).join(":")), (u = n[n.length - 1])),
		r.endsWith(".js") && (r = r.slice(0, -3)),
		`${r}:${u}`
	);
}
function sa(e, n) {
	return JSON.stringify({ udfPath: ca(e), args: oa(n) });
}
function Wy(e, n, r) {
	const { initialNumItems: u, id: s } = r;
	return JSON.stringify({ type: "paginated", udfPath: ca(e), args: oa(n), options: oa({ initialNumItems: u, id: s }) });
}
function k1(e) {
	return JSON.parse(e).type === "paginated";
}
var M1 = Object.defineProperty,
	z1 = (e, n, r) => (n in e ? M1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	pi = (e, n, r) => z1(e, typeof n != "symbol" ? n + "" : n, r),
	D1 = class {
		constructor() {
			(pi(this, "nextQueryId"),
				pi(this, "querySetVersion"),
				pi(this, "querySet"),
				pi(this, "queryIdToToken"),
				pi(this, "identityVersion"),
				pi(this, "auth"),
				pi(this, "outstandingQueriesOlderThanRestart"),
				pi(this, "outstandingAuthOlderThanRestart"),
				pi(this, "paused"),
				pi(this, "pendingQuerySetModifications"),
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
		subscribe(e, n, r, u) {
			const s = ca(e),
				o = sa(s, n),
				f = this.querySet.get(o);
			if (f !== void 0)
				return (
					(f.numSubscribers += 1),
					{ queryToken: o, modification: null, unsubscribe: () => this.removeSubscriber(o) }
				);
			{
				const h = this.nextQueryId++,
					m = { id: h, canonicalizedUdfPath: s, args: n, numSubscribers: 1, journal: r, componentPath: u };
				(this.querySet.set(o, m), this.queryIdToToken.set(h, o));
				const v = this.querySetVersion,
					g = this.querySetVersion + 1,
					_ = { type: "Add", queryId: h, udfPath: s, args: [oa(n)], journal: r, componentPath: u };
				return (
					this.paused ? this.pendingQuerySetModifications.set(h, _) : (this.querySetVersion = g),
					{
						queryToken: o,
						modification: { type: "ModifyQuerySet", baseVersion: v, newVersion: g, modifications: [_] },
						unsubscribe: () => this.removeSubscriber(o),
					}
				);
			}
		}
		transition(e) {
			for (const n of e.modifications)
				switch (n.type) {
					case "QueryUpdated":
					case "QueryFailed": {
						this.outstandingQueriesOlderThanRestart.delete(n.queryId);
						const r = n.journal;
						if (r !== void 0) {
							const u = this.queryIdToToken.get(n.queryId);
							u !== void 0 && (this.querySet.get(u).journal = r);
						}
						break;
					}
					case "QueryRemoved":
						this.outstandingQueriesOlderThanRestart.delete(n.queryId);
						break;
					default:
						throw new Error(`Invalid modification ${n.type}`);
				}
		}
		queryId(e, n) {
			const r = sa(ca(e), n),
				u = this.querySet.get(r);
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
			const n = this.identityVersion;
			return (this.paused || (this.identityVersion = n + 1), { type: "Authenticate", baseVersion: n, ...this.auth });
		}
		setAdminAuth(e, n) {
			const r = { tokenType: "Admin", value: e, impersonating: n };
			this.auth = r;
			const u = this.identityVersion;
			return (this.paused || (this.identityVersion = u + 1), { type: "Authenticate", baseVersion: u, ...r });
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
			const n = this.queryIdToToken.get(e);
			return n ? this.querySet.get(n).canonicalizedUdfPath : null;
		}
		queryArgs(e) {
			const n = this.queryIdToToken.get(e);
			return n ? this.querySet.get(n).args : null;
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
					args: [oa(u.args)],
					journal: u.journal,
					componentPath: u.componentPath,
				};
				(e.push(s), this.outstandingQueriesOlderThanRestart.add(u.id));
			}
			this.querySetVersion = 1;
			const n = { type: "ModifyQuerySet", baseVersion: 0, newVersion: 1, modifications: e };
			if (!this.auth) return ((this.identityVersion = 0), [n, void 0]);
			this.outstandingAuthOlderThanRestart = !0;
			const r = { type: "Authenticate", baseVersion: 0, ...this.auth };
			return ((this.identityVersion = 1), [n, r]);
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
				n = this.auth !== void 0 ? { type: "Authenticate", baseVersion: this.identityVersion++, ...this.auth } : void 0;
			return (this.unpause(), [e, n]);
		}
		unpause() {
			((this.paused = !1), this.pendingQuerySetModifications.clear());
		}
		removeSubscriber(e) {
			const n = this.querySet.get(e);
			if (n.numSubscribers > 1) return ((n.numSubscribers -= 1), null);
			{
				(this.querySet.delete(e),
					this.queryIdToToken.delete(n.id),
					this.outstandingQueriesOlderThanRestart.delete(n.id));
				const r = this.querySetVersion,
					u = this.querySetVersion + 1,
					s = { type: "Remove", queryId: n.id };
				return (
					this.paused
						? this.pendingQuerySetModifications.has(n.id)
							? this.pendingQuerySetModifications.delete(n.id)
							: this.pendingQuerySetModifications.set(n.id, s)
						: (this.querySetVersion = u),
					{ type: "ModifyQuerySet", baseVersion: r, newVersion: u, modifications: [s] }
				);
			}
		}
	},
	j1 = Object.defineProperty,
	L1 = (e, n, r) => (n in e ? j1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	to = (e, n, r) => L1(e, typeof n != "symbol" ? n + "" : n, r),
	q1 = class {
		constructor(e, n) {
			((this.logger = e),
				(this.markConnectionStateDirty = n),
				to(this, "inflightRequests"),
				to(this, "requestsOlderThanRestart"),
				to(this, "inflightMutationsCount", 0),
				to(this, "inflightActionsCount", 0),
				(this.inflightRequests = new Map()),
				(this.requestsOlderThanRestart = new Set()));
		}
		request(e, n) {
			const r = new Promise((u) => {
				const s = n ? "Requested" : "NotSent";
				(this.inflightRequests.set(e.requestId, {
					message: e,
					status: { status: s, requestedAt: new Date(), onResult: u },
				}),
					e.type === "Mutation" ? this.inflightMutationsCount++ : e.type === "Action" && this.inflightActionsCount++);
			});
			return (this.markConnectionStateDirty(), r);
		}
		onResponse(e) {
			const n = this.inflightRequests.get(e.requestId);
			if (n === void 0 || n.status.status === "Completed") return null;
			const r = n.message.type === "Mutation" ? "mutation" : "action",
				u = n.message.udfPath;
			for (const h of e.logLines) _o(this.logger, "info", r, u, h);
			const s = n.status;
			let o, f;
			if (e.success) ((o = { success: !0, logLines: e.logLines, value: mu(e.result) }), (f = () => s.onResult(o)));
			else {
				const h = e.result,
					{ errorData: m } = e;
				(_o(this.logger, "error", r, u, h),
					(o = { success: !1, errorMessage: h, errorData: m !== void 0 ? mu(m) : void 0, logLines: e.logLines }),
					(f = () => s.onResult(o)));
			}
			return e.type === "ActionResponse" || !e.success
				? (f(),
					this.inflightRequests.delete(e.requestId),
					this.requestsOlderThanRestart.delete(e.requestId),
					n.message.type === "Action"
						? this.inflightActionsCount--
						: n.message.type === "Mutation" && this.inflightMutationsCount--,
					this.markConnectionStateDirty(),
					{ requestId: e.requestId, result: o })
				: ((n.status = { status: "Completed", result: o, ts: e.ts, onResolve: f }), null);
		}
		removeCompleted(e) {
			const n = new Map();
			for (const [r, u] of this.inflightRequests.entries()) {
				const s = u.status;
				s.status === "Completed" &&
					s.ts.lessThanOrEqual(e) &&
					(s.onResolve(),
					n.set(r, s.result),
					u.message.type === "Mutation"
						? this.inflightMutationsCount--
						: u.message.type === "Action" && this.inflightActionsCount--,
					this.inflightRequests.delete(r),
					this.requestsOlderThanRestart.delete(r));
			}
			return (n.size > 0 && this.markConnectionStateDirty(), n);
		}
		restart() {
			this.requestsOlderThanRestart = new Set(this.inflightRequests.keys());
			const e = [];
			for (const [n, r] of this.inflightRequests) {
				if (r.status.status === "NotSent") {
					((r.status.status = "Requested"), e.push(r.message));
					continue;
				}
				if (r.message.type === "Mutation") e.push(r.message);
				else if (r.message.type === "Action") {
					if (
						(this.inflightRequests.delete(n),
						this.requestsOlderThanRestart.delete(n),
						this.inflightActionsCount--,
						r.status.status === "Completed")
					)
						throw new Error("Action should never be in 'Completed' state");
					r.status.onResult({ success: !1, errorMessage: "Connection lost while action was in flight", logLines: [] });
				}
			}
			return (this.markConnectionStateDirty(), e);
		}
		resume() {
			const e = [];
			for (const [, n] of this.inflightRequests)
				if (n.status.status === "NotSent") {
					((n.status.status = "Requested"), e.push(n.message));
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
			for (const n of this.inflightRequests.values())
				n.status.status !== "Completed" && n.status.requestedAt.getTime() < e && (e = n.status.requestedAt.getTime());
			return new Date(e);
		}
		inflightMutations() {
			return this.inflightMutationsCount;
		}
		inflightActions() {
			return this.inflightActionsCount;
		}
	},
	So = Symbol.for("functionName"),
	U1 = Symbol.for("toReferencePath");
function $1(e) {
	return e[U1] ?? null;
}
function B1(e) {
	return e.startsWith("function://");
}
function I1(e) {
	let n;
	if (typeof e == "string") B1(e) ? (n = { functionHandle: e }) : (n = { name: e });
	else if (e[So]) n = { name: e[So] };
	else {
		const r = $1(e);
		if (!r) throw new Error(`${e} is not a functionReference`);
		n = { reference: r };
	}
	return n;
}
function Gi(e) {
	const n = I1(e);
	if (n.name === void 0)
		throw n.functionHandle !== void 0
			? new Error(
					`Expected function reference like "api.file.func" or "internal.file.func", but received function handle ${n.functionHandle}`,
				)
			: n.reference !== void 0
				? new Error(
						`Expected function reference in the current component like "api.file.func" or "internal.file.func", but received reference ${n.reference}`,
					)
				: new Error(
						`Expected function reference like "api.file.func" or "internal.file.func", but received ${JSON.stringify(n)}`,
					);
	if (typeof e == "string") return e;
	const r = e[So];
	if (!r) throw new Error(`${e} is not a functionReference`);
	return r;
}
function Ip(e = []) {
	return new Proxy(
		{},
		{
			get(n, r) {
				if (typeof r == "string") return Ip([...e, r]);
				if (r === So) {
					if (e.length < 2) {
						const o = ["api", ...e].join(".");
						throw new Error(`API path is expected to be of the form \`api.moduleName.functionName\`. Found: \`${o}\``);
					}
					const u = e.slice(0, -1).join("/"),
						s = e[e.length - 1];
					return s === "default" ? u : u + ":" + s;
				} else return r === Symbol.toStringTag ? "FunctionReference" : void 0;
			},
		},
	);
}
var Dn = Ip(),
	V1 = Object.defineProperty,
	Z1 = (e, n, r) => (n in e ? V1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	wo = (e, n, r) => Z1(e, typeof n != "symbol" ? n + "" : n, r),
	e0 = class Fd {
		constructor(n) {
			(wo(this, "queryResults"), wo(this, "modifiedQueries"), (this.queryResults = n), (this.modifiedQueries = []));
		}
		getQuery(n, ...r) {
			const u = Rr(r[0]),
				s = Gi(n),
				o = this.queryResults.get(sa(s, u));
			if (o !== void 0) return Fd.queryValue(o.result);
		}
		getAllQueries(n) {
			const r = [],
				u = Gi(n);
			for (const s of this.queryResults.values())
				s.udfPath === ca(u) && r.push({ args: s.args, value: Fd.queryValue(s.result) });
			return r;
		}
		setQuery(n, r, u) {
			const s = Rr(r),
				o = Gi(n),
				f = sa(o, s);
			let h;
			u === void 0 ? (h = void 0) : (h = { success: !0, value: u, logLines: [] });
			const m = { udfPath: o, args: s, result: h };
			(this.queryResults.set(f, m), this.modifiedQueries.push(f));
		}
		static queryValue(n) {
			if (n !== void 0) return n.success ? n.value : void 0;
		}
	},
	H1 = class {
		constructor() {
			(wo(this, "queryResults"),
				wo(this, "optimisticUpdates"),
				(this.queryResults = new Map()),
				(this.optimisticUpdates = []));
		}
		ingestQueryResultsFromServer(e, n) {
			this.optimisticUpdates = this.optimisticUpdates.filter((o) => !n.has(o.mutationId));
			const r = this.queryResults;
			this.queryResults = new Map(e);
			const u = new e0(this.queryResults);
			for (const o of this.optimisticUpdates) o.update(u);
			const s = [];
			for (const [o, f] of this.queryResults) {
				const h = r.get(o);
				(h === void 0 || h.result !== f.result) && s.push(o);
			}
			return s;
		}
		applyOptimisticUpdate(e, n) {
			this.optimisticUpdates.push({ update: e, mutationId: n });
			const r = new e0(this.queryResults);
			return (e(r), r.modifiedQueries);
		}
		rawQueryResult(e) {
			const n = this.queryResults.get(e);
			if (n !== void 0) return n.result;
		}
		queryResult(e) {
			const n = this.queryResults.get(e);
			if (n === void 0) return;
			const r = n.result;
			if (r !== void 0) {
				if (r.success) return r.value;
				throw r.errorData !== void 0 ? Gd(r, new Kd(au("query", n.udfPath, r))) : new Error(au("query", n.udfPath, r));
			}
		}
		hasQueryResult(e) {
			return this.queryResults.get(e) !== void 0;
		}
		queryLogs(e) {
			return this.queryResults.get(e)?.result?.logLines;
		}
	},
	P1 = Object.defineProperty,
	Q1 = (e, n, r) => (n in e ? P1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	_d = (e, n, r) => Q1(e, typeof n != "symbol" ? n + "" : n, r),
	Tl = class Yi {
		constructor(n, r) {
			(_d(this, "low"),
				_d(this, "high"),
				_d(this, "__isUnsignedLong__"),
				(this.low = n | 0),
				(this.high = r | 0),
				(this.__isUnsignedLong__ = !0));
		}
		static isLong(n) {
			return (n && n.__isUnsignedLong__) === !0;
		}
		static fromBytesLE(n) {
			return new Yi(n[0] | (n[1] << 8) | (n[2] << 16) | (n[3] << 24), n[4] | (n[5] << 8) | (n[6] << 16) | (n[7] << 24));
		}
		toBytesLE() {
			const n = this.high,
				r = this.low;
			return [
				r & 255,
				(r >>> 8) & 255,
				(r >>> 16) & 255,
				r >>> 24,
				n & 255,
				(n >>> 8) & 255,
				(n >>> 16) & 255,
				n >>> 24,
			];
		}
		static fromNumber(n) {
			return isNaN(n) || n < 0 ? t0 : n >= Y1 ? K1 : new Yi((n % vl) | 0, (n / vl) | 0);
		}
		toString() {
			return (BigInt(this.high) * BigInt(vl) + BigInt(this.low)).toString();
		}
		equals(n) {
			return (
				Yi.isLong(n) || (n = Yi.fromValue(n)),
				this.high >>> 31 === 1 && n.high >>> 31 === 1 ? !1 : this.high === n.high && this.low === n.low
			);
		}
		notEquals(n) {
			return !this.equals(n);
		}
		comp(n) {
			return (
				Yi.isLong(n) || (n = Yi.fromValue(n)),
				this.equals(n)
					? 0
					: n.high >>> 0 > this.high >>> 0 || (n.high === this.high && n.low >>> 0 > this.low >>> 0)
						? -1
						: 1
			);
		}
		lessThanOrEqual(n) {
			return this.comp(n) <= 0;
		}
		static fromValue(n) {
			return typeof n == "number" ? Yi.fromNumber(n) : new Yi(n.low, n.high);
		}
	},
	t0 = new Tl(0, 0),
	n0 = 65536,
	vl = n0 * n0,
	Y1 = vl * vl,
	K1 = new Tl(-1, -1),
	G1 = Object.defineProperty,
	F1 = (e, n, r) => (n in e ? G1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	no = (e, n, r) => F1(e, typeof n != "symbol" ? n + "" : n, r),
	i0 = class {
		constructor(e, n) {
			(no(this, "version"),
				no(this, "remoteQuerySet"),
				no(this, "queryPath"),
				no(this, "logger"),
				(this.version = { querySet: 0, ts: Tl.fromNumber(0), identity: 0 }),
				(this.remoteQuerySet = new Map()),
				(this.queryPath = e),
				(this.logger = n));
		}
		transition(e) {
			const n = e.startVersion;
			if (
				this.version.querySet !== n.querySet ||
				this.version.ts.notEquals(n.ts) ||
				this.version.identity !== n.identity
			)
				throw new Error(
					`Invalid start version: ${n.ts.toString()}:${n.querySet}:${n.identity}, transitioning from ${this.version.ts.toString()}:${this.version.querySet}:${this.version.identity}`,
				);
			for (const r of e.modifications)
				switch (r.type) {
					case "QueryUpdated": {
						const u = this.queryPath(r.queryId);
						if (u) for (const o of r.logLines) _o(this.logger, "info", "query", u, o);
						const s = mu(r.value ?? null);
						this.remoteQuerySet.set(r.queryId, { success: !0, value: s, logLines: r.logLines });
						break;
					}
					case "QueryFailed": {
						const u = this.queryPath(r.queryId);
						if (u) for (const o of r.logLines) _o(this.logger, "info", "query", u, o);
						const { errorData: s } = r;
						this.remoteQuerySet.set(r.queryId, {
							success: !1,
							errorMessage: r.errorMessage,
							errorData: s !== void 0 ? mu(s) : void 0,
							logLines: r.logLines,
						});
						break;
					}
					case "QueryRemoved":
						this.remoteQuerySet.delete(r.queryId);
						break;
					default:
						throw new Error(`Invalid modification ${r.type}`);
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
function Sd(e) {
	const n = pl(e);
	return Tl.fromBytesLE(Array.from(n));
}
function X1(e) {
	const n = new Uint8Array(e.toBytesLE());
	return bl(n);
}
function r0(e) {
	switch (e.type) {
		case "FatalError":
		case "AuthError":
		case "ActionResponse":
		case "TransitionChunk":
		case "Ping":
			return { ...e };
		case "MutationResponse":
			return e.success ? { ...e, ts: Sd(e.ts) } : { ...e };
		case "Transition":
			return {
				...e,
				startVersion: { ...e.startVersion, ts: Sd(e.startVersion.ts) },
				endVersion: { ...e.endVersion, ts: Sd(e.endVersion.ts) },
			};
		default:
	}
}
function J1(e) {
	switch (e.type) {
		case "Authenticate":
		case "ModifyQuerySet":
		case "Mutation":
		case "Action":
		case "Event":
			return { ...e };
		case "Connect":
			return e.maxObservedTimestamp !== void 0
				? { ...e, maxObservedTimestamp: X1(e.maxObservedTimestamp) }
				: { ...e, maxObservedTimestamp: void 0 };
		default:
	}
}
var W1 = Object.defineProperty,
	eE = (e, n, r) => (n in e ? W1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	It = (e, n, r) => eE(e, typeof n != "symbol" ? n + "" : n, r),
	tE = 1e3,
	nE = 1001,
	iE = 1005,
	rE = 4040,
	vo;
function ru() {
	return (
		vo === void 0 && (vo = Date.now()),
		typeof performance > "u" || !performance.now ? Date.now() : Math.round(vo + performance.now())
	);
}
function a0() {
	return `t=${Math.round((ru() - vo) / 100) / 10}s`;
}
var Vp = {
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
function aE(e) {
	if (e === void 0) return "Unknown";
	for (const n of Object.keys(Vp)) if (e.startsWith(n)) return n;
	return "Unknown";
}
var uE = class {
	constructor(e, n, r, u, s, o) {
		((this.markConnectionStateDirty = s),
			(this.debug = o),
			It(this, "socket"),
			It(this, "connectionCount"),
			It(this, "_hasEverConnected", !1),
			It(this, "lastCloseReason"),
			It(this, "transitionChunkBuffer", null),
			It(this, "defaultInitialBackoff"),
			It(this, "maxBackoff"),
			It(this, "retries"),
			It(this, "serverInactivityThreshold"),
			It(this, "reconnectDueToServerInactivityTimeout"),
			It(this, "scheduledReconnect", null),
			It(this, "networkOnlineHandler", null),
			It(this, "pendingNetworkRecoveryInfo", null),
			It(this, "uri"),
			It(this, "onOpen"),
			It(this, "onResume"),
			It(this, "onMessage"),
			It(this, "webSocketConstructor"),
			It(this, "logger"),
			It(this, "onServerDisconnectError"),
			(this.webSocketConstructor = r),
			(this.socket = { state: "disconnected" }),
			(this.connectionCount = 0),
			(this.lastCloseReason = "InitialConnect"),
			(this.defaultInitialBackoff = 1e3),
			(this.maxBackoff = 16e3),
			(this.retries = 0),
			(this.serverInactivityThreshold = 6e4),
			(this.reconnectDueToServerInactivityTimeout = null),
			(this.uri = e),
			(this.onOpen = n.onOpen),
			(this.onResume = n.onResume),
			(this.onMessage = n.onMessage),
			(this.onServerDisconnectError = n.onServerDisconnectError),
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
			const n = this.transitionChunkBuffer.chunks.length;
			throw (
				(this.transitionChunkBuffer = null),
				new Error(`TransitionChunk received out of order: expected part ${n}, got ${e.partNumber}`)
			);
		}
		if ((this.transitionChunkBuffer.chunks.push(e.chunk), this.transitionChunkBuffer.chunks.length === e.totalParts)) {
			const n = this.transitionChunkBuffer.chunks.join("");
			this.transitionChunkBuffer = null;
			const r = r0(JSON.parse(n));
			if (r.type !== "Transition") throw new Error(`Expected Transition, got ${r.type} after assembling chunks`);
			return r;
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
							clientTs: ru(),
						})),
					this.lastCloseReason !== "InitialConnect" &&
						(this.lastCloseReason
							? this.logger.log("WebSocket reconnected at", a0(), "after disconnect due to", this.lastCloseReason)
							: this.logger.log("WebSocket reconnected at", a0())),
					(this.connectionCount += 1),
					(this.lastCloseReason = null),
					this.pendingNetworkRecoveryInfo !== null)
				) {
					const { timeSavedMs: n } = this.pendingNetworkRecoveryInfo;
					((this.pendingNetworkRecoveryInfo = null),
						this.sendMessage({ type: "Event", eventType: "NetworkRecoveryReconnect", event: { timeSavedMs: n } }),
						this.logger.log(`Network recovery reconnect saved ~${Math.round(n / 1e3)}s of waiting`));
				}
			}),
			(e.onerror = (n) => {
				this.transitionChunkBuffer = null;
				const r = n.message;
				r && this.logger.log(`WebSocket error message: ${r}`);
			}),
			(e.onmessage = (n) => {
				this.resetServerInactivityTimeout();
				const r = n.data.length;
				let u = r0(JSON.parse(n.data));
				if ((this._logVerbose(`received ws message with type ${u.type}`), u.type !== "Ping")) {
					if (u.type === "TransitionChunk") {
						const s = this.assembleTransition(u);
						if (!s) return;
						((u = s), this._logVerbose(`assembled full ws message of type ${u.type}`));
					}
					(this.transitionChunkBuffer !== null &&
						((this.transitionChunkBuffer = null),
						this.logger.log(`Received unexpected ${u.type} while buffering TransitionChunks`)),
						u.type === "Transition" && this.reportLargeTransition({ messageLength: r, transition: u }),
						this.onMessage(u).hasSyncedPastLastReconnect && ((this.retries = 0), this.markConnectionStateDirty()));
				}
			}),
			(e.onclose = (n) => {
				if (
					(this._logVerbose("begin ws.onclose"),
					(this.transitionChunkBuffer = null),
					this.lastCloseReason === null && (this.lastCloseReason = n.reason || `closed with code ${n.code}`),
					n.code !== tE && n.code !== nE && n.code !== iE && n.code !== rE)
				) {
					let u = `WebSocket closed with code ${n.code}`;
					(n.reason && (u += `: ${n.reason}`),
						this.logger.log(u),
						this.onServerDisconnectError && n.reason && this.onServerDisconnectError(u));
				}
				const r = aE(n.reason);
				this.scheduleReconnect(r);
			}));
	}
	socketState() {
		return this.socket.state;
	}
	sendMessage(e) {
		const n = {
			type: e.type,
			...(e.type === "Authenticate" && e.tokenType === "User" ? { value: `...${e.value.slice(-7)}` } : {}),
		};
		if (this.socket.state === "ready" && this.socket.paused === "no") {
			const r = J1(e),
				u = JSON.stringify(r);
			let s = !1;
			try {
				(this.socket.ws.send(u), (s = !0));
			} catch (o) {
				(this.logger.log(`Failed to send message on WebSocket, reconnecting: ${o}`),
					this.closeAndReconnect("FailedToSendMessage"));
			}
			return (
				this._logVerbose(`${s ? "sent" : "failed to send"} message with type ${e.type}: ${JSON.stringify(n)}`),
				!0
			);
		}
		return (
			this._logVerbose(
				`message not sent (socket state: ${this.socket.state}, paused: ${"paused" in this.socket ? this.socket.paused : void 0}): ${JSON.stringify(n)}`,
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
		const n = this.nextBackoff(e);
		(this.markConnectionStateDirty(), this.logger.log(`Attempting reconnect in ${Math.round(n)}ms`));
		const r = ru(),
			u = setTimeout(() => {
				this.scheduledReconnect?.timeout === u && ((this.scheduledReconnect = null), this.connect());
			}, n);
		this.scheduledReconnect = { timeout: u, scheduledAt: r, backoffMs: n };
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
					(e.onmessage = (n) => {
						this._logVerbose("Ignoring message received after close");
					}),
					new Promise((n) => {
						((e.onclose = () => {
							(this._logVerbose("Closed after connecting"), n());
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
				e.onmessage = (r) => {
					this._logVerbose("Ignoring message received after close");
				};
				const n = new Promise((r) => {
					e.onclose = () => {
						r();
					};
				});
				return (e.close(), n);
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
			const n = ru() - this.scheduledReconnect.scheduledAt;
			((e = Math.max(0, this.scheduledReconnect.backoffMs - n)),
				this._logVerbose(
					`would have waited ${Math.round(e)}ms more (backoff was ${Math.round(this.scheduledReconnect.backoffMs)}ms, elapsed ${Math.round(n)}ms)`,
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
							clientTs: ru(),
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
		const n =
			(e === "client" ? 100 : e === "Unknown" ? this.defaultInitialBackoff : Vp[e].timeout) * Math.pow(2, this.retries);
		this.retries += 1;
		const r = Math.min(n, this.maxBackoff);
		return r + r * (Math.random() - 0.5);
	}
	reportLargeTransition({ transition: e, messageLength: n }) {
		if (e.clientClockSkew === void 0 || e.serverTs === void 0) return;
		const r = ru() - e.clientClockSkew - e.serverTs / 1e6,
			u = `${Math.round(r)}ms`,
			s = `${Math.round(n / 1e4) / 100}MB`,
			o = n / (r / 1e3),
			f = `${Math.round(o / 1e4) / 100}MB per second`;
		(this._logVerbose(`received ${s} transition in ${u} at ${f}`),
			n > 2e7
				? this.logger.log(
						`received query results totaling more that 20MB (${s}) which will take a long time to download on slower connections`,
					)
				: r > 2e4 && this.logger.log(`received query results totaling ${s} which took more than 20s to arrive (${u})`),
			this.debug &&
				this.sendMessage({
					type: "Event",
					eventType: "ClientReceivedTransition",
					event: { transitionTransitTime: r, messageLength: n },
				}));
	}
};
function lE() {
	return sE();
}
function sE() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
		const n = (Math.random() * 16) | 0;
		return (e === "x" ? n : (n & 3) | 8).toString(16);
	});
}
var hl = class extends Error {};
hl.prototype.name = "InvalidTokenError";
function oE(e) {
	return decodeURIComponent(
		atob(e).replace(/(.)/g, (n, r) => {
			let u = r.charCodeAt(0).toString(16).toUpperCase();
			return (u.length < 2 && (u = "0" + u), "%" + u);
		}),
	);
}
function cE(e) {
	let n = e.replace(/-/g, "+").replace(/_/g, "/");
	switch (n.length % 4) {
		case 0:
			break;
		case 2:
			n += "==";
			break;
		case 3:
			n += "=";
			break;
		default:
			throw new Error("base64 string is not of the correct length");
	}
	try {
		return oE(n);
	} catch {
		return atob(n);
	}
}
function Zp(e, n) {
	if (typeof e != "string") throw new hl("Invalid token specified: must be a string");
	n || (n = {});
	const r = n.header === !0 ? 0 : 1,
		u = e.split(".")[r];
	if (typeof u != "string") throw new hl(`Invalid token specified: missing part #${r + 1}`);
	let s;
	try {
		s = cE(u);
	} catch (o) {
		throw new hl(`Invalid token specified: invalid base64 for part #${r + 1} (${o.message})`);
	}
	try {
		return JSON.parse(s);
	} catch (o) {
		throw new hl(`Invalid token specified: invalid json for part #${r + 1} (${o.message})`);
	}
}
var fE = Object.defineProperty,
	dE = (e, n, r) => (n in e ? fE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	En = (e, n, r) => dE(e, typeof n != "symbol" ? n + "" : n, r),
	hE = 480 * 60 * 60 * 1e3,
	u0 = 2,
	mE = class {
		constructor(e, n, r) {
			(En(this, "authState", { state: "noAuth" }),
				En(this, "configVersion", 0),
				En(this, "syncState"),
				En(this, "authenticate"),
				En(this, "stopSocket"),
				En(this, "tryRestartSocket"),
				En(this, "pauseSocket"),
				En(this, "resumeSocket"),
				En(this, "clearAuth"),
				En(this, "logger"),
				En(this, "refreshTokenLeewaySeconds"),
				En(this, "initialAuthTokenReuse"),
				En(this, "lastRefreshChange"),
				En(this, "tokenConfirmationAttempts", 0),
				(this.syncState = e),
				(this.authenticate = n.authenticate),
				(this.stopSocket = n.stopSocket),
				(this.tryRestartSocket = n.tryRestartSocket),
				(this.pauseSocket = n.pauseSocket),
				(this.resumeSocket = n.resumeSocket),
				(this.clearAuth = n.clearAuth),
				(this.logger = r.logger),
				(this.refreshTokenLeewaySeconds = r.refreshTokenLeewaySeconds),
				(this.initialAuthTokenReuse = r.initialAuthTokenReuse),
				(this.lastRefreshChange = !1));
		}
		notifyRefreshChange(e) {
			this.authState.state !== "noAuth" &&
				this.authState.state !== "initialRefetch" &&
				this.authState.config.onRefreshChange &&
				this.lastRefreshChange !== e &&
				((this.lastRefreshChange = e), this.authState.config.onRefreshChange(e));
		}
		async setConfig(e, n, r) {
			(this.resetAuthState(), this._logVerbose("pausing WS for auth token fetch"), this.pauseSocket());
			const u = await this.fetchTokenAndGuardAgainstRace(e, { forceRefreshToken: !1 });
			if (u.isFromOutdatedConfig) return;
			const s = { fetchToken: e, onAuthChange: n, onRefreshChange: r };
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
					const n = this.syncState.getAuth()?.value;
					(this.initialAuthTokenReuse && n ? this.scheduleTokenRefetch(n, e.clientClockSkew) : this.refetchToken(),
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
			const { baseVersion: n } = e;
			if (!this.syncState.isCurrentOrNewerAuthVersion(n + 1)) {
				this._logVerbose("ignoring auth error for previous auth attempt");
				return;
			}
			this.tryToReauthenticate(e);
		}
		async tryToReauthenticate(e) {
			if (
				(this._logVerbose(`attempting to reauthenticate: ${e.error}`),
				this.authState.state === "noAuth" ||
					(this.authState.state === "waitingForServerConfirmationOfFreshToken" && this.tokenConfirmationAttempts >= u0))
			) {
				(this.logger.error(`Failed to authenticate: "${e.error}", check your server auth config`),
					this.syncState.hasAuth() && this.syncState.clearAuth(),
					this.authState.state !== "noAuth" && this.setAndReportAuthFailed(this.authState.config.onAuthChange));
				return;
			}
			if (
				(this.authState.state === "waitingForServerConfirmationOfFreshToken" &&
					(this.tokenConfirmationAttempts++,
					this._logVerbose(`retrying reauthentication, ${u0 - this.tokenConfirmationAttempts} attempts remaining`)),
				this.notifyRefreshChange(!0),
				await this.stopSocket(),
				this.authState.state === "noAuth")
			)
				return;
			const n = await this.fetchTokenAndGuardAgainstRace(this.authState.config.fetchToken, { forceRefreshToken: !0 });
			n.isFromOutdatedConfig ||
				(n.value && this.syncState.isNewAuth(n.value)
					? (this.authenticate(n.value),
						this.setAuthState({
							state: "waitingForServerConfirmationOfFreshToken",
							config: this.authState.config,
							token: n.value,
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
		scheduleTokenRefetch(e, n) {
			if (this.authState.state === "noAuth") return;
			const r = this.decodeToken(e);
			if (!r) {
				this.logger.error("Auth token is not a valid JWT, cannot refetch the token");
				return;
			}
			const { iat: u, exp: s } = r;
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
			n !== void 0 ? ((f = s - (Date.now() - n) / 1e3), f <= 0 && (f = 0)) : (f = o);
			let h = Math.min(hE, (f - this.refreshTokenLeewaySeconds) * 1e3);
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
		async fetchTokenAndGuardAgainstRace(e, n) {
			const r = ++this.configVersion;
			this._logVerbose(`fetching token with config version ${r}`);
			const u = await e(n);
			return this.configVersion !== r
				? (this._logVerbose(`stale config version, expected ${r}, got ${this.configVersion}`),
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
			const n =
				e.state === "waitingForServerConfirmationOfFreshToken"
					? { hadAuth: e.hadAuth, state: e.state, token: `...${e.token.slice(-7)}` }
					: { state: e.state };
			switch ((this._logVerbose(`setting auth state to ${JSON.stringify(n)}`), e.state)) {
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
				return Zp(e);
			} catch (n) {
				return (this._logVerbose(`Error decoding token: ${n instanceof Error ? n.message : "Unknown error"}`), null);
			}
		}
		_logVerbose(e) {
			this.logger.logVerbose(`${e} [v${this.configVersion}]`);
		}
	},
	vE = ["convexClientConstructed", "convexWebSocketOpen", "convexFirstMessageReceived"];
function gE(e, n) {
	const r = { sessionId: n };
	typeof performance > "u" || !performance.mark || performance.mark(e, { detail: r });
}
function yE(e) {
	let n = e.name.slice(6);
	return ((n = n.charAt(0).toLowerCase() + n.slice(1)), { name: n, startTime: e.startTime });
}
function pE(e) {
	if (typeof performance > "u" || !performance.getEntriesByName) return [];
	const n = [];
	for (const r of vE) {
		const u = performance
			.getEntriesByName(r)
			.filter((s) => s.entryType === "mark")
			.filter((s) => s.detail.sessionId === e);
		n.push(...u);
	}
	return n.map(yE);
}
var bE = Object.defineProperty,
	_E = (e, n, r) => (n in e ? bE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Vt = (e, n, r) => _E(e, typeof n != "symbol" ? n + "" : n, r),
	SE = class {
		constructor(e, n, r) {
			if (
				(Vt(this, "address"),
				Vt(this, "state"),
				Vt(this, "requestManager"),
				Vt(this, "webSocketManager"),
				Vt(this, "authenticationManager"),
				Vt(this, "remoteQuerySet"),
				Vt(this, "optimisticQueryResults"),
				Vt(this, "_transitionHandlerCounter", 0),
				Vt(this, "_nextRequestId"),
				Vt(this, "_onTransitionFns", new Map()),
				Vt(this, "_sessionId"),
				Vt(this, "firstMessageReceived", !1),
				Vt(this, "debug"),
				Vt(this, "logger"),
				Vt(this, "maxObservedTimestamp"),
				Vt(this, "connectionStateSubscribers", new Map()),
				Vt(this, "nextConnectionStateSubscriberId", 0),
				Vt(this, "_lastPublishedConnectionState"),
				Vt(this, "markConnectionStateDirty", () => {
					Promise.resolve().then(() => {
						const b = this.connectionState();
						if (JSON.stringify(b) !== JSON.stringify(this._lastPublishedConnectionState)) {
							this._lastPublishedConnectionState = b;
							for (const p of this.connectionStateSubscribers.values()) p(b);
						}
					});
				}),
				Vt(this, "mark", (b) => {
					this.debug && gE(b, this.sessionId);
				}),
				typeof e == "object")
			)
				throw new Error(
					"Passing a ClientConfig object is no longer supported. Pass the URL of the Convex deployment as a string directly.",
				);
			(r?.skipConvexDeploymentUrlCheck !== !0 && Dp(e), (r = { ...r }));
			const u = r.authRefreshTokenLeewaySeconds ?? 10;
			let s = r.webSocketConstructor;
			if (!s && typeof WebSocket > "u")
				throw new Error(
					"No WebSocket global variable defined! To use Convex in an environment without WebSocket try the HTTP client: https://docs.convex.dev/api/classes/browser.ConvexHttpClient",
				);
			((s = s || WebSocket),
				(this.debug = r.reportDebugInfoToConvex ?? !1),
				(this.address = e),
				(this.logger =
					r.logger === !1
						? O1({ verbose: r.verbose ?? !1 })
						: r.logger !== !0 && r.logger
							? r.logger
							: R1({ verbose: r.verbose ?? !1 })));
			const o = e.search("://");
			if (o === -1) throw new Error("Provided address was not an absolute URL.");
			const f = e.substring(o + 3),
				h = e.substring(0, o);
			let m;
			if (h === "http") m = "ws";
			else if (h === "https") m = "wss";
			else throw new Error(`Unknown parent protocol ${h}`);
			const v = `${m}://${f}/api/${Yy}/sync`;
			((this.state = new D1()),
				(this.remoteQuerySet = new i0((b) => this.state.queryPath(b), this.logger)),
				(this.requestManager = new q1(this.logger, this.markConnectionStateDirty)));
			const g = () => {
				(this.webSocketManager.pause(), this.state.pause());
			};
			((this.authenticationManager = new mE(
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
				{ logger: this.logger, refreshTokenLeewaySeconds: u, initialAuthTokenReuse: r.initialAuthTokenReuse ?? !1 },
			)),
				(this.optimisticQueryResults = new H1()),
				this.addOnTransitionHandler((b) => {
					n(b.queries.map((p) => p.token));
				}),
				(this._nextRequestId = 0),
				(this._sessionId = lE()));
			const { unsavedChangesWarning: _ } = r;
			if (typeof window > "u" || typeof window.addEventListener > "u") {
				if (_ === !0)
					throw new Error(
						"unsavedChangesWarning requested, but window.addEventListener not found! Remove {unsavedChangesWarning: true} from Convex client options.",
					);
			} else
				_ !== !1 &&
					window.addEventListener("beforeunload", (b) => {
						if (this.requestManager.hasIncompleteRequests()) {
							b.preventDefault();
							const p = "Are you sure you want to leave? Your changes may not be saved.";
							return (((b || window.event).returnValue = p), p);
						}
					});
			((this.webSocketManager = new uE(
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
							(this.remoteQuerySet = new i0((x) => this.state.queryPath(x), this.logger)));
						const [p, E] = this.state.restart();
						(E && this.webSocketManager.sendMessage(E), this.webSocketManager.sendMessage(p));
						for (const x of this.requestManager.restart()) this.webSocketManager.sendMessage(x);
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
								const p = N1(this.logger, b.error);
								throw (this.webSocketManager.terminate(), p);
							}
							default:
						}
						return { hasSyncedPastLastReconnect: this.hasSyncedPastLastReconnect() };
					},
					onServerDisconnectError: r.onServerDisconnectError,
				},
				s,
				this.logger,
				this.markConnectionStateDirty,
				this.debug,
			)),
				this.mark("convexClientConstructed"),
				r.expectAuth && g());
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
			const n = this.remoteQuerySet.remoteQueryResults(),
				r = new Map();
			for (const [s, o] of n) {
				const f = this.state.queryToken(s);
				if (f !== null) {
					const h = { result: o, udfPath: this.state.queryPath(s), args: this.state.queryArgs(s) };
					r.set(f, h);
				}
			}
			const u = this.optimisticQueryResults.ingestQueryResultsFromServer(r, new Set(e.keys()));
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
			for (const n of this._onTransitionFns.values()) n(e);
		}
		addOnTransitionHandler(e) {
			const n = this._transitionHandlerCounter++;
			return (this._onTransitionFns.set(n, e), () => this._onTransitionFns.delete(n));
		}
		getCurrentAuthClaims() {
			const e = this.state.getAuth();
			let n = {};
			if (e && e.tokenType === "User")
				try {
					n = e ? Zp(e.value) : {};
				} catch {
					n = {};
				}
			else return;
			return { token: e.value, decoded: n };
		}
		setAuth(e, n, r) {
			this.authenticationManager.setConfig(e, n, r);
		}
		hasAuth() {
			return this.state.hasAuth();
		}
		setAdminAuth(e, n) {
			const r = this.state.setAdminAuth(e, n);
			this.webSocketManager.sendMessage(r);
		}
		clearAuth() {
			const e = this.state.clearAuth();
			this.webSocketManager.sendMessage(e);
		}
		subscribe(e, n, r) {
			const u = Rr(n),
				{ modification: s, queryToken: o, unsubscribe: f } = this.state.subscribe(e, u, r?.journal, r?.componentPath);
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
		localQueryResult(e, n) {
			const r = sa(e, Rr(n));
			return this.optimisticQueryResults.queryResult(r);
		}
		localQueryResultByToken(e) {
			return this.optimisticQueryResults.queryResult(e);
		}
		hasLocalQueryResultByToken(e) {
			return this.optimisticQueryResults.hasQueryResult(e);
		}
		localQueryLogs(e, n) {
			const r = sa(e, Rr(n));
			return this.optimisticQueryResults.queryLogs(r);
		}
		queryJournal(e, n) {
			const r = sa(e, Rr(n));
			return this.state.queryJournal(r);
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
			const n = this.nextConnectionStateSubscriberId++;
			return (
				this.connectionStateSubscribers.set(n, e),
				() => {
					this.connectionStateSubscribers.delete(n);
				}
			);
		}
		async mutation(e, n, r) {
			const u = await this.mutationInternal(e, n, r);
			if (!u.success)
				throw u.errorData !== void 0 ? Gd(u, new Kd(au("mutation", e, u))) : new Error(au("mutation", e, u));
			return u.value;
		}
		async mutationInternal(e, n, r, u) {
			const { mutationPromise: s } = this.enqueueMutation(e, n, r, u);
			return s;
		}
		enqueueMutation(e, n, r, u) {
			const s = Rr(n);
			this.tryReportLongDisconnect();
			const o = this.nextRequestId;
			if ((this._nextRequestId++, r !== void 0)) {
				const m = r.optimisticUpdate;
				if (m !== void 0) {
					const v = (_) => {
							m(_, s) instanceof Promise &&
								this.logger.warn(
									"Optimistic update handler returned a Promise. Optimistic updates should be synchronous.",
								);
						},
						g = this.optimisticQueryResults.applyOptimisticUpdate(v, o).map((_) => {
							const b = this.localQueryResultByToken(_);
							return {
								token: _,
								modification: {
									kind: "Updated",
									result: b === void 0 ? void 0 : { success: !0, value: b, logLines: [] },
								},
							};
						});
					this.handleTransition({ queries: g, reflectedMutations: [], timestamp: this.remoteQuerySet.timestamp() });
				}
			}
			const f = { type: "Mutation", requestId: o, udfPath: e, componentPath: u, args: [oa(s)] },
				h = this.webSocketManager.sendMessage(f);
			return { requestId: o, mutationPromise: this.requestManager.request(f, h) };
		}
		async action(e, n) {
			const r = await this.actionInternal(e, n);
			if (!r.success) throw r.errorData !== void 0 ? Gd(r, new Kd(au("action", e, r))) : new Error(au("action", e, r));
			return r.value;
		}
		async actionInternal(e, n, r) {
			const u = Rr(n),
				s = this.nextRequestId;
			(this._nextRequestId++, this.tryReportLongDisconnect());
			const o = { type: "Action", requestId: s, udfPath: e, componentPath: r, args: [oa(u)] },
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
				const e = pE(this.sessionId);
				this.webSocketManager.sendMessage({ type: "Event", eventType: "ClientConnect", event: e });
			}
		}
		tryReportLongDisconnect() {
			if (!this.debug) return;
			const e = this.connectionState().timeOfOldestInflightRequest;
			if (e === null || Date.now() - e.getTime() <= 60 * 1e3) return;
			const n = `${this.address}/api/debug_event`;
			fetch(n, {
				method: "POST",
				headers: { "Content-Type": "application/json", "Convex-Client": `npm-${Yy}` },
				body: JSON.stringify({ event: "LongWebsocketDisconnect" }),
			})
				.then((r) => {
					r.ok || this.logger.warn("Analytics request failed with response:", r.body);
				})
				.catch((r) => {
					this.logger.warn("Analytics response failed with error:", r);
				});
		}
	};
function wd(e) {
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
var wE = Object.defineProperty,
	EE = (e, n, r) => (n in e ? wE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	l0 = (e, n, r) => EE(e, typeof n != "symbol" ? n + "" : n, r),
	TE = class {
		constructor(e, n) {
			((this.client = e),
				(this.onTransition = n),
				l0(this, "paginatedQuerySet", new Map()),
				l0(this, "lastTransitionTs"),
				(this.lastTransitionTs = Tl.fromNumber(0)),
				this.client.addOnTransitionHandler((r) => this.onBaseTransition(r)));
		}
		subscribe(e, n, r) {
			const u = ca(e),
				s = Wy(u, n, r),
				o = () => this.removePaginatedQuerySubscriber(s),
				f = this.paginatedQuerySet.get(s);
			return f
				? ((f.numSubscribers += 1), { paginatedQueryToken: s, unsubscribe: o })
				: (this.paginatedQuerySet.set(s, {
						token: s,
						canonicalizedUdfPath: u,
						args: n,
						numSubscribers: 1,
						options: { initialNumItems: r.initialNumItems },
						nextPageKey: 0,
						pageKeys: [],
						pageKeyToQuery: new Map(),
						ongoingSplits: new Map(),
						skip: !1,
						id: r.id,
					}),
					this.addPageToPaginatedQuery(s, null, r.initialNumItems),
					{ paginatedQueryToken: s, unsubscribe: o });
		}
		localQueryResult(e, n, r) {
			const u = Wy(ca(e), n, r);
			return this.localQueryResultByToken(u);
		}
		localQueryResultByToken(e) {
			const n = this.paginatedQuerySet.get(e);
			if (!n) return;
			const r = this.activePageQueryTokens(n);
			if (r.length === 0)
				return { results: [], status: "LoadingFirstPage", loadMore: (h) => this.loadMoreOfPaginatedQuery(e, h) };
			let u = [],
				s = !1,
				o = !1;
			for (const h of r) {
				const m = this.client.localQueryResultByToken(h);
				if (m === void 0) {
					((s = !0), (o = !1));
					continue;
				}
				const v = wd(m);
				((u = u.concat(v.page)), (o = !!v.isDone));
			}
			let f;
			return (
				s ? (f = u.length === 0 ? "LoadingFirstPage" : "LoadingMore") : o ? (f = "Exhausted") : (f = "CanLoadMore"),
				{ results: u, status: f, loadMore: (h) => this.loadMoreOfPaginatedQuery(e, h) }
			);
		}
		onBaseTransition(e) {
			const n = e.queries.map((o) => o.token),
				r = this.queriesContainingTokens(n);
			let u = [];
			r.length > 0 &&
				(this.processPaginatedQuerySplits(r, (o) => this.client.localQueryResultByToken(o)),
				(u = r.map((o) => ({ token: o, modification: { kind: "Updated", result: this.localQueryResultByToken(o) } }))));
			const s = { ...e, paginatedQueries: u };
			this.onTransition(s);
		}
		loadMoreOfPaginatedQuery(e, n) {
			this.mustGetPaginatedQuery(e);
			const r = this.queryTokenForLastPageOfPaginatedQuery(e),
				u = this.client.localQueryResultByToken(r);
			if (!u) return !1;
			const s = wd(u);
			if (s.isDone) return !1;
			this.addPageToPaginatedQuery(e, s.continueCursor, n);
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
			const n = [],
				r = new Set(e);
			for (const [u, s] of this.paginatedQuerySet)
				for (const o of this.allQueryTokens(s))
					if (r.has(o)) {
						n.push(u);
						break;
					}
			return n;
		}
		processPaginatedQuerySplits(e, n) {
			for (const r of e) {
				const u = this.mustGetPaginatedQuery(r),
					{ ongoingSplits: s, pageKeyToQuery: o, pageKeys: f } = u;
				for (const [h, [m, v]] of s)
					n(o.get(m).queryToken) !== void 0 &&
						n(o.get(v).queryToken) !== void 0 &&
						this.completePaginatedQuerySplit(u, h, m, v);
				for (const h of f) {
					if (s.has(h)) continue;
					const m = o.get(h);
					if (!m) throw new Error(`No page query for active pageKey ${h}`);
					const v = n(m.queryToken);
					if (!v) continue;
					const g = wd(v);
					g.splitCursor &&
						(g.pageStatus === "SplitRecommended" ||
							g.pageStatus === "SplitRequired" ||
							g.page.length > u.options.initialNumItems * 2) &&
						this.splitPaginatedQueryPage(u, h, m.cursor, g.splitCursor, g.continueCursor);
				}
			}
		}
		splitPaginatedQueryPage(e, n, r, u, s) {
			const o = e.nextPageKey++,
				f = e.nextPageKey++,
				h = { numItems: e.options.initialNumItems, id: e.id },
				m = this.client.subscribe(e.canonicalizedUdfPath, {
					...e.args,
					paginationOpts: { ...h, cursor: r, endCursor: u },
				});
			e.pageKeyToQuery.set(o, { ...m, cursor: r });
			const v = this.client.subscribe(e.canonicalizedUdfPath, {
				...e.args,
				paginationOpts: { ...h, cursor: u, endCursor: s },
			});
			(e.pageKeyToQuery.set(f, { ...v, cursor: u }), e.ongoingSplits.set(n, [o, f]));
		}
		addPageToPaginatedQuery(e, n, r) {
			const u = this.mustGetPaginatedQuery(e),
				s = u.nextPageKey++,
				o = { cursor: n, numItems: r, id: u.id },
				f = { ...u.args, paginationOpts: o },
				h = this.client.subscribe(u.canonicalizedUdfPath, f);
			return (u.pageKeys.push(s), u.pageKeyToQuery.set(s, { ...h, cursor: n }), h);
		}
		removePaginatedQuerySubscriber(e) {
			const n = this.paginatedQuerySet.get(e);
			if (n && ((n.numSubscribers -= 1), !(n.numSubscribers > 0))) {
				for (const r of n.pageKeyToQuery.values()) r.unsubscribe();
				this.paginatedQuerySet.delete(e);
			}
		}
		completePaginatedQuerySplit(e, n, r, u) {
			const s = e.pageKeyToQuery.get(n);
			e.pageKeyToQuery.delete(n);
			const o = e.pageKeys.indexOf(n);
			(e.pageKeys.splice(o, 1, r, u), e.ongoingSplits.delete(n), s.unsubscribe());
		}
		activePageQueryTokens(e) {
			return e.pageKeys.map((n) => e.pageKeyToQuery.get(n).queryToken);
		}
		allQueryTokens(e) {
			return Array.from(e.pageKeyToQuery.values()).map((n) => n.queryToken);
		}
		queryTokenForLastPageOfPaginatedQuery(e) {
			const n = this.mustGetPaginatedQuery(e),
				r = n.pageKeys[n.pageKeys.length - 1];
			if (r === void 0) throw new Error(`No pages for paginated query ${e}`);
			return n.pageKeyToQuery.get(r).queryToken;
		}
		mustGetPaginatedQuery(e) {
			const n = this.paginatedQuerySet.get(e);
			if (!n) throw new Error("paginated query no longer exists for token " + e);
			return n;
		}
	},
	xE = Object.defineProperty,
	AE = (e, n, r) => (n in e ? xE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	nu = (e, n, r) => AE(e, typeof n != "symbol" ? n + "" : n, r),
	s0,
	CE = class {
		constructor(e, n = {}) {
			(nu(this, "listeners"),
				nu(this, "_client"),
				nu(this, "_paginatedClient"),
				nu(this, "callNewListenersWithCurrentValuesTimer"),
				nu(this, "_closed"),
				nu(this, "_disabled"),
				n.skipConvexDeploymentUrlCheck !== !0 && Dp(e));
			const { disabled: r, ...u } = n;
			((this._closed = !1),
				(this._disabled = !!r),
				s0 && !("webSocketConstructor" in u) && typeof WebSocket > "u" && (u.webSocketConstructor = s0),
				typeof window > "u" && !("unsavedChangesWarning" in u) && (u.unsavedChangesWarning = !1),
				this.disabled ||
					((this._client = new SE(e, () => {}, u)),
					(this._paginatedClient = new TE(this._client, (s) => this._transition(s)))),
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
		onUpdate(e, n, r, u) {
			if (this.disabled) return this.createDisabledUnsubscribe();
			const { queryToken: s, unsubscribe: o } = this.client.subscribe(Gi(e), n),
				f = {
					queryToken: s,
					callback: r,
					onError: u,
					unsubscribe: o,
					hasEverRun: !1,
					query: e,
					args: n,
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
		onPaginatedUpdate_experimental(e, n, r, u, s) {
			if (this.disabled) return this.createDisabledUnsubscribe();
			const o = { initialNumItems: r.initialNumItems, id: -1 },
				{ paginatedQueryToken: f, unsubscribe: h } = this.paginatedClient.subscribe(Gi(e), n, o),
				m = {
					queryToken: f,
					callback: u,
					onError: s,
					unsubscribe: h,
					hasEverRun: !1,
					query: e,
					args: n,
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
					getCurrentValue: () => this.paginatedClient.localQueryResult(Gi(e), n, o),
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
		setAuth(e, n) {
			this.disabled || this.client.setAuth(e, n ?? (() => {}));
		}
		setAdminAuth(e, n) {
			if (this.closed) throw new Error("ConvexClient has already been closed.");
			this.disabled || this.client.setAdminAuth(e, n);
		}
		_transition({ queries: e, paginatedQueries: n }, r = !1) {
			const u = [...e.map((s) => s.token), ...n.map((s) => s.token)];
			for (const s of this.listeners) {
				const { callback: o, queryToken: f, onError: h, hasEverRun: m } = s,
					v = k1(f),
					g = v ? !!this.paginatedClient.localQueryResultByToken(f) : this.client.hasLocalQueryResultByToken(f);
				if (u.includes(f) || (r && !m && g)) {
					s.hasEverRun = !0;
					let _;
					try {
						v ? (_ = this.paginatedClient.localQueryResultByToken(f)) : (_ = this.client.localQueryResultByToken(f));
					} catch (b) {
						if (!(b instanceof Error)) throw b;
						h ? h(b, "Second argument to onUpdate onError is reserved for later use") : Promise.reject(b);
						continue;
					}
					o(_, "Second argument to onUpdate callback is reserved for later use");
				}
			}
		}
		async mutation(e, n, r) {
			if (this.disabled) throw new Error("ConvexClient is disabled");
			return await this.client.mutation(Gi(e), n, r);
		}
		async action(e, n) {
			if (this.disabled) throw new Error("ConvexClient is disabled");
			return await this.client.action(Gi(e), n);
		}
		async query(e, n) {
			if (this.disabled) throw new Error("ConvexClient is disabled");
			const r = this.client.localQueryResult(Gi(e), n);
			return r !== void 0
				? Promise.resolve(r)
				: new Promise((u, s) => {
						const { unsubscribe: o } = this.onUpdate(
							e,
							n,
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
	RE = 6e4,
	OE = 500,
	NE = 1e4,
	kE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
	o0 = 128,
	c0 = 109,
	f0 = 100,
	ME = /^[\x21-\x7e]+$/,
	d0 = 100,
	h0 = 16,
	io = 6,
	m0 = 100;
function v0(e) {
	if (typeof e != "object" || e === null) return null;
	const n = e;
	if ((n.mode !== "light" && n.mode !== "dark") || typeof n.tokens != "object" || n.tokens === null) return null;
	const r = {};
	for (const [u, s] of Object.entries(n.tokens)) {
		if (typeof s != "string") return null;
		r[u] = s;
	}
	return { mode: n.mode, tokens: r };
}
var Xd = { reason: "denied", message: "This plugin no longer has access to its data" },
	Jd = { reason: "session_expired", message: "This plugin session expired" },
	la = { reason: "unavailable", message: "The plugin data connection is unavailable" };
function zE(e) {
	if (typeof e != "object" || e === null) return !1;
	const n = e;
	if (
		typeof n.pluginName != "string" ||
		typeof n.userId != "string" ||
		typeof n.organizationId != "string" ||
		typeof n.workspaceId != "string"
	)
		return !1;
	if (n.kind === "page") return typeof n.pageId == "string" && typeof n.pageTitle == "string";
	if (n.kind === "file_view") {
		if (
			typeof n.fileViewId != "string" ||
			typeof n.fileViewTitle != "string" ||
			typeof n.file != "object" ||
			n.file === null
		)
			return !1;
		const r = n.file;
		return (
			typeof r.fileNodeId == "string" &&
			typeof r.name == "string" &&
			typeof r.path == "string" &&
			typeof r.contentType == "string"
		);
	}
	return !1;
}
function DE() {
	const e = window.location.hash.slice(1);
	if (!e) throw new Error("Missing host bridge fragment — this plugin frame must be embedded by the Bonobo host app");
	const n = new URLSearchParams(e),
		r = n.getAll("parentOrigin"),
		u = n.getAll("bridgeNonce");
	if (n.size !== 2 || r.length !== 1 || u.length !== 1) throw new Error("Invalid host bridge fragment");
	const s = r[0],
		o = u[0];
	let f;
	try {
		f = new URL(s);
	} catch {
		throw new Error("Invalid host bridge parent origin");
	}
	if ((f.protocol !== "http:" && f.protocol !== "https:") || f.origin !== s)
		throw new Error("Invalid host bridge parent origin");
	if (!kE.test(o)) throw new Error("Invalid host bridge nonce");
	return { parentOrigin: s, bridgeNonce: o };
}
function ro(e) {
	return e.collection.length === 0 || e.collection.length > o0
		? `Collection names must be 1 to ${o0} characters`
		: e.keyPrefix !== void 0 && (e.keyPrefix.length > c0 || !ME.test(e.keyPrefix))
			? `Key prefixes must be 1 to ${c0} printable ASCII characters`
			: !Number.isInteger(e.limit) || e.limit < 1 || e.limit > f0
				? `Watch limits must be integers from 1 to ${f0}`
				: null;
}
function jE(e) {
	const n = {
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
		r = () => {
			n.dead = !0;
			for (const A of n.intervals) A.stop();
			for (const A of n.pending?.replacements ?? []) A.stop();
			n.pending = null;
		},
		u = (A) => {
			n.dead || (r(), e.on_dead(A));
		},
		s = (A) => {
			if (n.dead || !e.acquire_server_slot()) return !1;
			let C = !1;
			const k = e.start_watch(
				e.queryArgs,
				{
					...(A.start === null ? {} : { keyStartExclusive: A.start }),
					...(A.end === null ? {} : { keyEndInclusive: A.end }),
				},
				(F) => {
					C || z(A, F);
				},
			);
			return k
				? ((A.stop = () => {
						C || ((C = !0), k.dispose(), e.release_server_slot());
					}),
					!0)
				: (e.release_server_slot(), !1);
		},
		o = (A) => {
			if (A.docs === null || A.docs.length === 0) return null;
			const C = A.previousFirstKey ?? A.docs[A.docs.length - 1].key;
			return C === A.start || C === A.end || new Set(A.docs.map((k) => k.key)).size < 2 ? null : C;
		},
		f = () => n.intervals.length + (n.pending?.replacements.length ?? 0),
		h = () => n.intervals.length + (n.pending ? n.pending.replacements.length - n.pending.removeCount : 0),
		m = (A) => (A.truncated ? (A.previousDocs ?? A.docs) : A.docs),
		v = (A) => {
			if (!n.pending) return;
			const C = A - n.pending.from;
			if (!(C < 0 || C >= n.pending.removeCount)) return n.pending.suppressedDocs[C];
		},
		g = () => {
			const A = n.intervals.flatMap((k, F) => {
					const Q = v(F);
					return (Q === void 0 ? k.docs : Q) ?? [];
				}),
				C = n.intervals[n.intervals.length - 1];
			return {
				docs: A,
				hasMore: n.bottomOpen && !(C !== void 0 && C.end === null && C.docs !== null && !C.truncated),
				atCapacity: n.forceAtCapacity || n.intervals.length >= io || e.page_at_ceiling(),
				incomplete: n.intervals.some((k, F) =>
					k.end === null ||
					!k.truncated ||
					k.docs === null ||
					(n.pending && F >= n.pending.from && F < n.pending.from + n.pending.removeCount)
						? !1
						: o(k) === null || h() + 1 > io || e.page_at_ceiling(2),
				),
			};
		},
		_ = () => {
			n.flushScheduled ||
				n.dead ||
				((n.flushScheduled = !0),
				queueMicrotask(() => {
					if (((n.flushScheduled = !1), n.dead)) return;
					const A = g();
					n.forceAtCapacity = !1;
					const C = JSON.stringify(A);
					C !== n.lastPayloadJson && ((n.lastPayloadJson = C), e.post_update(A));
				}));
		},
		b = () => {
			n.dead || ((n.forceAtCapacity = !0), _());
		},
		p = (A) => {
			const C = A.docs,
				k = C[C.length - 1].key;
			(A.stop(), (A.end = k), (A.truncated = !1), (n.bottomOpen = !0), s(A) || u(la));
		},
		E = () => {
			if (n.dead || n.loadingOlder || n.pending || !g().hasMore) return;
			const A = n.intervals[n.intervals.length - 1];
			if (!A || A.end === null) return;
			if (f() + 1 > io || e.page_at_ceiling()) {
				b();
				return;
			}
			const C = {
				start: A.end,
				end: null,
				docs: null,
				truncated: !1,
				previousFirstKey: void 0,
				previousDocs: null,
				stop: () => {},
			};
			if (!s(C)) {
				b();
				return;
			}
			(n.intervals.push(C), (n.loadingOlder = !0), (n.awaitingTail = C));
		},
		x = () => {
			if (n.dead) return;
			const A = n.intervals[n.intervals.length - 1];
			if (!(A && A.end === null && A.docs !== null && A.truncated && (p(A), n.dead)) && !n.pending) {
				n.queuedLoadOlder && ((n.queuedLoadOlder = !1), E());
				for (const [C, k] of n.intervals.entries()) {
					if (k.end === null || !k.truncated || k.docs === null) continue;
					const F = o(k);
					if (F === null) continue;
					if (f() + 1 > io) break;
					const Q = {
							start: k.start,
							end: F,
							docs: null,
							truncated: !1,
							previousFirstKey: void 0,
							previousDocs: null,
							stop: () => {},
						},
						j = {
							start: F,
							end: k.end,
							docs: null,
							truncated: !1,
							previousFirstKey: void 0,
							previousDocs: null,
							stop: () => {},
						};
					if (!s(Q)) break;
					if (!s(j)) {
						Q.stop();
						break;
					}
					n.pending = { from: C, removeCount: 1, replacements: [Q, j], suppressedDocs: [m(k)] };
					return;
				}
				for (let C = 0; C + 1 < n.intervals.length; C += 1) {
					const k = n.intervals[C],
						F = n.intervals[C + 1];
					if (k.docs === null || F.docs === null || k.docs.length + F.docs.length >= e.queryArgs.limit) continue;
					const Q = {
						start: k.start,
						end: F.end,
						docs: null,
						truncated: !1,
						previousFirstKey: void 0,
						previousDocs: null,
						stop: () => {},
					};
					if (!s(Q)) break;
					n.pending = { from: C, removeCount: 2, replacements: [Q], suppressedDocs: [m(k), m(F)] };
					return;
				}
			}
		},
		O = () => {
			const A = n.pending;
			n.pending = null;
			const C = n.intervals.splice(A.from, A.removeCount, ...A.replacements);
			for (const k of C) k.stop();
			(_(), x());
		},
		z = (A, C) => {
			if (!n.dead) {
				if ("queryError" in C) {
					const k = e.session_expired() ? Jd : la;
					(k === la && console.error("[bonobo-plugin-sdk] Plugin data window interval failed:", C.queryError), u(k));
					return;
				}
				if (C.value === null) {
					u(Xd);
					return;
				}
				if (
					((A.previousFirstKey = A.docs?.[0]?.key),
					(A.previousDocs = A.docs),
					(A.docs = C.value.docs),
					(A.truncated = C.value.truncated),
					n.awaitingTail === A && ((n.awaitingTail = null), (n.loadingOlder = !1)),
					n.pending?.replacements.includes(A))
				) {
					n.pending.replacements.every((k) => k.docs !== null) && O();
					return;
				}
				(_(), x());
			}
		},
		D = {
			start: null,
			end: null,
			docs: null,
			truncated: !1,
			previousFirstKey: void 0,
			previousDocs: null,
			stop: () => {},
		};
	return s(D)
		? (n.intervals.push(D),
			{
				load_older: () => {
					if (!n.dead) {
						if (n.pending) {
							n.queuedLoadOlder = !0;
							return;
						}
						E();
					}
				},
				dispose: () => {
					n.dead || r();
				},
			})
		: null;
}
function LE(e) {
	const n = new Set();
	let r = 0;
	const u = () => (r >= m0 ? !1 : ((r += 1), !0)),
		s = () => {
			r -= 1;
		},
		o = (p = 1) => r + p > m0,
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
			if (n.size >= h0 || o()) return (h(p.onUpdate), () => {});
			if (!u()) return (h(p.onUpdate), () => {});
			const E = {};
			n.add(E);
			let x = null;
			const O = () => {
				n.delete(E) && (x?.dispose(), s());
			};
			return (
				(x = p.start((z) => {
					if (n.has(E)) {
						if ("queryError" in z) {
							const D = e.session_expired() ? Jd : la;
							(D === la && console.error(`[bonobo-plugin-sdk] Plugin ${p.failureLabel} failed:`, z.queryError),
								O(),
								p.onUpdate(null, D));
							return;
						}
						if (z.value === null) {
							(O(), p.onUpdate(null, Xd));
							return;
						}
						p.onUpdate(p.deliver(z.value));
					}
				})),
				x
					? function () {
							O();
						}
					: (O(),
						console.error(`[bonobo-plugin-sdk] Plugin ${p.failureLabel} could not start`),
						f(p.onUpdate),
						() => {})
			);
		},
		v = {
			watch(p, E) {
				const x = ro({
					collection: p.collection,
					...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
					limit: p.limit,
				});
				return x
					? (f(E, { reason: "invalid", message: x }), () => {})
					: m({
							start: (O) =>
								e.start_watch(
									{
										collection: p.collection,
										...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
										limit: p.limit,
									},
									null,
									O,
								),
							onUpdate: E,
							deliver: (O) => ({ docs: O.docs, truncated: O.truncated }),
							failureLabel: "data watch",
						});
			},
			watchRecent(p, E) {
				const x = ro({ collection: p.collection, limit: p.limit });
				return x
					? (f(E, { reason: "invalid", message: x }), () => {})
					: m({
							start: (O) =>
								e.start_recent_watch(
									{
										collection: p.collection,
										limit: p.limit,
										...(p.order === void 0 ? {} : { order: p.order }),
										...(p.since === void 0 ? {} : { since: p.since }),
										...(p.before === void 0 ? {} : { before: p.before }),
										...(p.scopeId === void 0 ? {} : { scopeId: p.scopeId }),
									},
									O,
								),
							onUpdate: E,
							deliver: (O) => ({ docs: O.docs, truncated: O.truncated }),
							failureLabel: "recent watch",
						});
			},
			watchChanges(p, E) {
				const x = ro({ collection: p.collection, limit: p.limit });
				return x
					? (f(E, { reason: "invalid", message: x }), () => {})
					: m({
							start: (O) =>
								e.start_changes_watch(
									{
										collection: p.collection,
										limit: p.limit,
										...(p.updatedSince === void 0 ? {} : { updatedSince: p.updatedSince }),
										...(p.scopeId === void 0 ? {} : { scopeId: p.scopeId }),
									},
									O,
								),
							onUpdate: E,
							deliver: (O) => ({ docs: O.docs, truncated: O.truncated }),
							failureLabel: "changes watch",
						});
			},
			watchWindow(p, E) {
				const x = { loadOlder() {}, unsubscribe() {} },
					O = ro({
						collection: p.collection,
						...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
						limit: p.pageSize,
					});
				if (O) return (f(E, { reason: "invalid", message: O }), x);
				if (n.size >= h0 || o()) return (h(E), x);
				const z = {};
				n.add(z);
				const D = jE({
					queryArgs: {
						collection: p.collection,
						...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
						limit: p.pageSize,
					},
					start_watch: e.start_watch,
					acquire_server_slot: u,
					release_server_slot: s,
					page_at_ceiling: o,
					post_update: (A) => E(A),
					on_dead: (A) => {
						(n.delete(z), E(null, A));
					},
					session_expired: e.session_expired,
				});
				return D
					? {
							loadOlder() {
								n.has(z) && D.load_older();
							},
							unsubscribe() {
								n.delete(z) && D.dispose();
							},
						}
					: (n.delete(z), console.error("[bonobo-plugin-sdk] Plugin data window could not start"), f(E), x);
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
				(x) => (
					console.error("[bonobo-plugin-sdk] Plugin data write failed:", x),
					{ _nay: { message: "Failed to write plugin data" } }
				),
			);
	}
	const _ = {
		resolve(p) {
			return Promise.resolve()
				.then(() => e.resolve_member_display(p))
				.then((E) => (E === null ? {} : E.members))
				.catch((E) => (console.error("[bonobo-plugin-sdk] Failed to resolve plugin member names:", E), {}));
		},
		list(p) {
			return !Number.isInteger(p.limit) || p.limit < 1 || p.limit > d0
				? Promise.resolve({ _nay: { name: "invalid", message: `Member list limits must be integers from 1 to ${d0}` } })
				: Promise.resolve()
						.then(() => e.list_members(p.limit, p.cursor ?? null))
						.then((E) =>
							E === null
								? { _nay: { name: Xd.reason, message: "This plugin no longer has access to this workspace" } }
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
							const x = e.session_expired() ? Jd : la;
							return (
								x === la && console.error("[bonobo-plugin-sdk] Failed to list plugin workspace members:", E),
								{ _nay: { name: x.reason, message: x.message } }
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
					{ _nay: { message: "Failed to change who can read this" } }
				),
			);
	}
	return {
		data: v,
		members: _,
		scopes: {
			create(p) {
				return b({ kind: "create", scopeId: p.scopeId, collections: p.collections, keyPrefix: p.keyPrefix });
			},
			setPrincipal(p) {
				return b({ kind: "set_principal", scopeId: p.scopeId, userId: p.userId, level: p.level });
			},
			removePrincipal(p) {
				return b({ kind: "remove_principal", scopeId: p.scopeId, userId: p.userId });
			},
			delete(p) {
				return b({ kind: "delete", scopeId: p.scopeId });
			},
			listPrincipals(p) {
				return Promise.resolve()
					.then(() => e.list_scope_principals(p.scopeId))
					.catch((E) => (console.error("[bonobo-plugin-sdk] Failed to read plugin scope principals:", E), null));
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
function qE(e) {
	return {
		start_watch: (r, u, s) => {
			try {
				const o = e.onUpdate(
					Dn.plugins_data.watch_documents,
					{
						...r,
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
		start_recent_watch: (r, u) => {
			try {
				const s = e.onUpdate(
					Dn.plugins_data.watch_recent,
					r,
					(o) => u({ value: o }),
					(o) => u({ queryError: o }),
				);
				return { dispose: () => void s() };
			} catch {
				return null;
			}
		},
		start_changes_watch: (r, u) => {
			try {
				const s = e.onUpdate(
					Dn.plugins_data.watch_changes,
					r,
					(o) => u({ value: o }),
					(o) => u({ queryError: o }),
				);
				return { dispose: () => void s() };
			} catch {
				return null;
			}
		},
		run_user_write: (r, u) => {
			switch (r) {
				case "append":
					return e.mutation(Dn.plugins_data.user_append_document, u);
				case "put":
					return e.mutation(Dn.plugins_data.user_put_document, u);
				case "remove":
					return e.mutation(Dn.plugins_data.user_remove_document, u);
				case "putOwned":
					return e.mutation(Dn.plugins_data.user_put_owned_document, u);
				case "removeOwned":
					return e.mutation(Dn.plugins_data.user_remove_owned_document, u);
			}
		},
		resolve_member_display: (r) => e.query(Dn.plugins_data.resolve_member_display, { userIds: r }),
		list_members: (r, u) => e.query(Dn.plugins_data.list_members, { limit: r, cursor: u }),
		run_manage_scope: (r) => e.mutation(Dn.plugins_data.user_manage_scope, { action: r }),
		list_scope_principals: (r) => e.query(Dn.plugins_data.watch_scope_principals, { scopeId: r }),
		start_my_scopes_watch: (r) => {
			try {
				const u = e.onUpdate(
					Dn.plugins_data.watch_my_scopes,
					{},
					(s) => r({ value: s }),
					(s) => r({ queryError: s }),
				);
				return { dispose: () => void u() };
			} catch {
				return null;
			}
		},
	};
}
async function UE() {
	const { parentOrigin: e, bridgeNonce: n } = DE();
	let r = "",
		u = "",
		s = 0,
		o = null;
	const f = new Set(),
		h = new Map();
	let m = null;
	async function v() {
		return Date.now() >= s - RE ? g() : u;
	}
	function g() {
		if (m) return m;
		const E = crypto.randomUUID();
		return (
			(m = new Promise((x, O) => {
				const z = setTimeout(() => {
					(h.delete(E), O(new Error("Plugin frame token refresh timed out")));
				}, NE);
				h.set(E, { resolve: x, reject: O, timeout: z });
				try {
					window.parent.postMessage({ type: "bonobo:token-refresh-request", bridgeNonce: n, requestId: E }, e);
				} catch (D) {
					(clearTimeout(z), h.delete(E), O(D));
				}
			}).finally(() => {
				m = null;
			})),
			m
		);
	}
	async function _(E, x) {
		const O = x?.body !== void 0,
			z = (C) => {
				const k = new Headers(x?.headers);
				return (
					k.set("Authorization", `Bearer ${C}`),
					O && k.set("Content-Type", "application/json"),
					fetch(r + E, {
						method: x?.method ?? (O ? "POST" : "GET"),
						headers: k,
						body: O ? JSON.stringify(x.body) : void 0,
					})
				);
			},
			D = await v();
		let A = await z(D);
		if ((A.status === 401 && (A = await z(u !== D ? u : await g())), !A.ok)) {
			const C = await A.text();
			throw Object.assign(new Error(`${E} responded ${A.status}: ${C}`), { status: A.status, responseText: C });
		}
		return A.json();
	}
	const b = (E) =>
		fetch(r + "/plugins-ui/session-jwt", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token: E }),
		});
	async function p() {
		for (let E = 0; ; E += 1) {
			let x = null;
			try {
				((x = await b(await v())), x.status === 401 && (x = await b(await g())));
			} catch {
				x = null;
			}
			if (x?.ok) {
				const O = await x.json().catch(() => null),
					z = O?._yay?.jwt,
					D = O?._yay?.sessionExpiresAt;
				return typeof z != "string" || typeof D != "number" ? null : ((s = D), z);
			}
			if (!(x === null || x.status === 429 || x.status >= 500) || E >= 2) return null;
			await new Promise((O) => setTimeout(O, 1e3 * (E + 1)));
		}
	}
	return new Promise((E) => {
		let x = !1,
			O;
		const z = () => {
				window.parent.postMessage({ type: "bonobo:ready", bridgeNonce: n }, e);
			},
			D = () => {
				clearInterval(O);
			},
			A = (C) => {
				if (C.source !== window.parent || C.origin !== e) return;
				const k = C.data;
				if (!(typeof k != "object" || k === null)) {
					if (
						k.type === "bonobo:init" &&
						!x &&
						k.bridgeNonce === n &&
						typeof k.apiOrigin == "string" &&
						typeof k.convexUrl == "string" &&
						typeof k.token == "string" &&
						typeof k.tokenExpiresAt == "number" &&
						Number.isFinite(k.tokenExpiresAt) &&
						zE(k.context)
					) {
						((x = !0),
							D(),
							window.removeEventListener("pagehide", D),
							(r = k.apiOrigin),
							(u = k.token),
							(s = k.tokenExpiresAt));
						const F = new CE(k.convexUrl, { expectAuth: !0, unsavedChangesWarning: !1 });
						(F.setAuth(p), window.addEventListener("pagehide", () => void F.close(), { once: !0 }), (o = v0(k.theme)));
						const { data: Q, members: j, scopes: q } = LE({ ...qE(F), session_expired: () => Date.now() >= s });
						E({
							context: k.context,
							apiOrigin: r,
							getToken: v,
							refreshToken: g,
							fetchJson: _,
							data: Q,
							members: j,
							scopes: q,
							theme: {
								current: () => o,
								subscribe(G) {
									return (
										f.add(G),
										() => {
											f.delete(G);
										}
									);
								},
							},
						});
					} else if (
						x &&
						k.bridgeNonce === n &&
						k.type === "bonobo:token" &&
						typeof k.requestId == "string" &&
						typeof k.token == "string" &&
						typeof k.tokenExpiresAt == "number" &&
						Number.isFinite(k.tokenExpiresAt)
					) {
						const F = h.get(k.requestId);
						F &&
							(h.delete(k.requestId),
							clearTimeout(F.timeout),
							(u = k.token),
							(s = k.tokenExpiresAt),
							F.resolve(k.token));
					} else if (x && k.bridgeNonce === n && k.type === "bonobo:theme") {
						const F = v0(k.theme);
						if (F) {
							o = F;
							for (const Q of f) Q(F);
						}
					} else if (
						x &&
						k.bridgeNonce === n &&
						k.type === "bonobo:token-error" &&
						typeof k.requestId == "string" &&
						typeof k.message == "string"
					) {
						const F = h.get(k.requestId);
						F && (h.delete(k.requestId), clearTimeout(F.timeout), F.reject(new Error(k.message)));
					}
				}
			};
		(window.addEventListener("message", A),
			window.addEventListener("pagehide", D, { once: !0 }),
			z(),
			(O = setInterval(z, OE)));
	});
}
var $E = Jn((e) => {
		function n(R, $) {
			var H = R.length;
			R.push($);
			e: for (; 0 < H; ) {
				var se = (H - 1) >>> 1,
					me = R[se];
				if (0 < s(me, $)) ((R[se] = $), (R[H] = me), (H = se));
				else break e;
			}
		}
		function r(R) {
			return R.length === 0 ? null : R[0];
		}
		function u(R) {
			if (R.length === 0) return null;
			var $ = R[0],
				H = R.pop();
			if (H !== $) {
				R[0] = H;
				e: for (var se = 0, me = R.length, Re = me >>> 1; se < Re; ) {
					var N = 2 * (se + 1) - 1,
						X = R[N],
						re = N + 1,
						de = R[re];
					if (0 > s(X, H))
						re < me && 0 > s(de, X) ? ((R[se] = de), (R[re] = H), (se = re)) : ((R[se] = X), (R[N] = H), (se = N));
					else if (re < me && 0 > s(de, H)) ((R[se] = de), (R[re] = H), (se = re));
					else break e;
				}
			}
			return $;
		}
		function s(R, $) {
			var H = R.sortIndex - $.sortIndex;
			return H !== 0 ? H : R.id - $.id;
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
			_ = null,
			b = 3,
			p = !1,
			E = !1,
			x = !1,
			O = !1,
			z = typeof setTimeout == "function" ? setTimeout : null,
			D = typeof clearTimeout == "function" ? clearTimeout : null,
			A = typeof setImmediate < "u" ? setImmediate : null;
		function C(R) {
			for (var $ = r(v); $ !== null; ) {
				if ($.callback === null) u(v);
				else if ($.startTime <= R) (u(v), ($.sortIndex = $.expirationTime), n(m, $));
				else break;
				$ = r(v);
			}
		}
		function k(R) {
			if (((x = !1), C(R), !E))
				if (r(m) !== null) ((E = !0), F || ((F = !0), oe()));
				else {
					var $ = r(v);
					$ !== null && ae(k, $.startTime - R);
				}
		}
		var F = !1,
			Q = -1,
			j = 5,
			q = -1;
		function G() {
			return O ? !0 : !(e.unstable_now() - q < j);
		}
		function B() {
			if (((O = !1), F)) {
				var R = e.unstable_now();
				q = R;
				var $ = !0;
				try {
					e: {
						((E = !1), x && ((x = !1), D(Q), (Q = -1)), (p = !0));
						var H = b;
						try {
							t: {
								for (C(R), _ = r(m); _ !== null && !(_.expirationTime > R && G()); ) {
									var se = _.callback;
									if (typeof se == "function") {
										((_.callback = null), (b = _.priorityLevel));
										var me = se(_.expirationTime <= R);
										if (((R = e.unstable_now()), typeof me == "function")) {
											((_.callback = me), C(R), ($ = !0));
											break t;
										}
										(_ === r(m) && u(m), C(R));
									} else u(m);
									_ = r(m);
								}
								if (_ !== null) $ = !0;
								else {
									var Re = r(v);
									(Re !== null && ae(k, Re.startTime - R), ($ = !1));
								}
							}
							break e;
						} finally {
							((_ = null), (b = H), (p = !1));
						}
						$ = void 0;
					}
				} finally {
					$ ? oe() : (F = !1);
				}
			}
		}
		var oe;
		if (typeof A == "function")
			oe = function () {
				A(B);
			};
		else if (typeof MessageChannel < "u") {
			var ee = new MessageChannel(),
				Y = ee.port2;
			((ee.port1.onmessage = B),
				(oe = function () {
					Y.postMessage(null);
				}));
		} else
			oe = function () {
				z(B, 0);
			};
		function ae(R, $) {
			Q = z(function () {
				R(e.unstable_now());
			}, $);
		}
		((e.unstable_IdlePriority = 5),
			(e.unstable_ImmediatePriority = 1),
			(e.unstable_LowPriority = 4),
			(e.unstable_NormalPriority = 3),
			(e.unstable_Profiling = null),
			(e.unstable_UserBlockingPriority = 2),
			(e.unstable_cancelCallback = function (R) {
				R.callback = null;
			}),
			(e.unstable_forceFrameRate = function (R) {
				0 > R || 125 < R
					? console.error(
							"forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
						)
					: (j = 0 < R ? Math.floor(1e3 / R) : 5);
			}),
			(e.unstable_getCurrentPriorityLevel = function () {
				return b;
			}),
			(e.unstable_next = function (R) {
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
					return R();
				} finally {
					b = H;
				}
			}),
			(e.unstable_requestPaint = function () {
				O = !0;
			}),
			(e.unstable_runWithPriority = function (R, $) {
				switch (R) {
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						break;
					default:
						R = 3;
				}
				var H = b;
				b = R;
				try {
					return $();
				} finally {
					b = H;
				}
			}),
			(e.unstable_scheduleCallback = function (R, $, H) {
				var se = e.unstable_now();
				switch (
					(typeof H == "object" && H !== null
						? ((H = H.delay), (H = typeof H == "number" && 0 < H ? se + H : se))
						: (H = se),
					R)
				) {
					case 1:
						var me = -1;
						break;
					case 2:
						me = 250;
						break;
					case 5:
						me = 1073741823;
						break;
					case 4:
						me = 1e4;
						break;
					default:
						me = 5e3;
				}
				return (
					(me = H + me),
					(R = { id: g++, callback: $, priorityLevel: R, startTime: H, expirationTime: me, sortIndex: -1 }),
					H > se
						? ((R.sortIndex = H),
							n(v, R),
							r(m) === null && R === r(v) && (x ? (D(Q), (Q = -1)) : (x = !0), ae(k, H - se)))
						: ((R.sortIndex = me), n(m, R), E || p || ((E = !0), F || ((F = !0), oe()))),
					R
				);
			}),
			(e.unstable_shouldYield = G),
			(e.unstable_wrapCallback = function (R) {
				var $ = b;
				return function () {
					var H = b;
					b = $;
					try {
						return R.apply(this, arguments);
					} finally {
						b = H;
					}
				};
			}));
	}),
	BE = Jn((e, n) => {
		n.exports = $E();
	}),
	IE = Jn((e) => {
		var n = Symbol.for("react.transitional.element"),
			r = Symbol.for("react.portal"),
			u = Symbol.for("react.fragment"),
			s = Symbol.for("react.strict_mode"),
			o = Symbol.for("react.profiler"),
			f = Symbol.for("react.consumer"),
			h = Symbol.for("react.context"),
			m = Symbol.for("react.forward_ref"),
			v = Symbol.for("react.suspense"),
			g = Symbol.for("react.memo"),
			_ = Symbol.for("react.lazy"),
			b = Symbol.for("react.activity"),
			p = Symbol.iterator;
		function E(N) {
			return N === null || typeof N != "object"
				? null
				: ((N = (p && N[p]) || N["@@iterator"]), typeof N == "function" ? N : null);
		}
		var x = {
				isMounted: function () {
					return !1;
				},
				enqueueForceUpdate: function () {},
				enqueueReplaceState: function () {},
				enqueueSetState: function () {},
			},
			O = Object.assign,
			z = {};
		function D(N, X, re) {
			((this.props = N), (this.context = X), (this.refs = z), (this.updater = re || x));
		}
		((D.prototype.isReactComponent = {}),
			(D.prototype.setState = function (N, X) {
				if (typeof N != "object" && typeof N != "function" && N != null)
					throw Error(
						"takes an object of state variables to update or a function which returns an object of state variables.",
					);
				this.updater.enqueueSetState(this, N, X, "setState");
			}),
			(D.prototype.forceUpdate = function (N) {
				this.updater.enqueueForceUpdate(this, N, "forceUpdate");
			}));
		function A() {}
		A.prototype = D.prototype;
		function C(N, X, re) {
			((this.props = N), (this.context = X), (this.refs = z), (this.updater = re || x));
		}
		var k = (C.prototype = new A());
		((k.constructor = C), O(k, D.prototype), (k.isPureReactComponent = !0));
		var F = Array.isArray;
		function Q() {}
		var j = { H: null, A: null, T: null, S: null },
			q = Object.prototype.hasOwnProperty;
		function G(N, X, re) {
			var de = re.ref;
			return { $$typeof: n, type: N, key: X, ref: de !== void 0 ? de : null, props: re };
		}
		function B(N, X) {
			return G(N.type, X, N.props);
		}
		function oe(N) {
			return typeof N == "object" && N !== null && N.$$typeof === n;
		}
		function ee(N) {
			var X = { "=": "=0", ":": "=2" };
			return (
				"$" +
				N.replace(/[=:]/g, function (re) {
					return X[re];
				})
			);
		}
		var Y = /\/+/g;
		function ae(N, X) {
			return typeof N == "object" && N !== null && N.key != null ? ee("" + N.key) : X.toString(36);
		}
		function R(N) {
			switch (N.status) {
				case "fulfilled":
					return N.value;
				case "rejected":
					throw N.reason;
				default:
					switch (
						(typeof N.status == "string"
							? N.then(Q, Q)
							: ((N.status = "pending"),
								N.then(
									function (X) {
										N.status === "pending" && ((N.status = "fulfilled"), (N.value = X));
									},
									function (X) {
										N.status === "pending" && ((N.status = "rejected"), (N.reason = X));
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
		function $(N, X, re, de, ge) {
			var _e = typeof N;
			(_e === "undefined" || _e === "boolean") && (N = null);
			var we = !1;
			if (N === null) we = !0;
			else
				switch (_e) {
					case "bigint":
					case "string":
					case "number":
						we = !0;
						break;
					case "object":
						switch (N.$$typeof) {
							case n:
							case r:
								we = !0;
								break;
							case _:
								return ((we = N._init), $(we(N._payload), X, re, de, ge));
						}
				}
			if (we)
				return (
					(ge = ge(N)),
					(we = de === "" ? "." + ae(N, 0) : de),
					F(ge)
						? ((re = ""),
							we != null && (re = we.replace(Y, "$&/") + "/"),
							$(ge, X, re, "", function (Ke) {
								return Ke;
							}))
						: ge != null &&
							(oe(ge) &&
								(ge = B(
									ge,
									re + (ge.key == null || (N && N.key === ge.key) ? "" : ("" + ge.key).replace(Y, "$&/") + "/") + we,
								)),
							X.push(ge)),
					1
				);
			we = 0;
			var Je = de === "" ? "." : de + ":";
			if (F(N))
				for (var De = 0; De < N.length; De++) ((de = N[De]), (_e = Je + ae(de, De)), (we += $(de, X, re, _e, ge)));
			else if (((De = E(N)), typeof De == "function"))
				for (N = De.call(N), De = 0; !(de = N.next()).done; )
					((de = de.value), (_e = Je + ae(de, De++)), (we += $(de, X, re, _e, ge)));
			else if (_e === "object") {
				if (typeof N.then == "function") return $(R(N), X, re, de, ge);
				throw (
					(X = String(N)),
					Error(
						"Objects are not valid as a React child (found: " +
							(X === "[object Object]" ? "object with keys {" + Object.keys(N).join(", ") + "}" : X) +
							"). If you meant to render a collection of children, use an array instead.",
					)
				);
			}
			return we;
		}
		function H(N, X, re) {
			if (N == null) return N;
			var de = [],
				ge = 0;
			return (
				$(N, de, "", "", function (_e) {
					return X.call(re, _e, ge++);
				}),
				de
			);
		}
		function se(N) {
			if (N._status === -1) {
				var X = N._result;
				((X = X()),
					X.then(
						function (re) {
							(N._status === 0 || N._status === -1) && ((N._status = 1), (N._result = re));
						},
						function (re) {
							(N._status === 0 || N._status === -1) && ((N._status = 2), (N._result = re));
						},
					),
					N._status === -1 && ((N._status = 0), (N._result = X)));
			}
			if (N._status === 1) return N._result.default;
			throw N._result;
		}
		var me =
				typeof reportError == "function"
					? reportError
					: function (N) {
							if (typeof window == "object" && typeof window.ErrorEvent == "function") {
								var X = new window.ErrorEvent("error", {
									bubbles: !0,
									cancelable: !0,
									message:
										typeof N == "object" && N !== null && typeof N.message == "string" ? String(N.message) : String(N),
									error: N,
								});
								if (!window.dispatchEvent(X)) return;
							} else if (typeof process == "object" && typeof process.emit == "function") {
								process.emit("uncaughtException", N);
								return;
							}
							console.error(N);
						},
			Re = {
				map: H,
				forEach: function (N, X, re) {
					H(
						N,
						function () {
							X.apply(this, arguments);
						},
						re,
					);
				},
				count: function (N) {
					var X = 0;
					return (
						H(N, function () {
							X++;
						}),
						X
					);
				},
				toArray: function (N) {
					return (
						H(N, function (X) {
							return X;
						}) || []
					);
				},
				only: function (N) {
					if (!oe(N)) throw Error("React.Children.only expected to receive a single React element child.");
					return N;
				},
			};
		((e.Activity = b),
			(e.Children = Re),
			(e.Component = D),
			(e.Fragment = u),
			(e.Profiler = o),
			(e.PureComponent = C),
			(e.StrictMode = s),
			(e.Suspense = v),
			(e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = j),
			(e.__COMPILER_RUNTIME = {
				__proto__: null,
				c: function (N) {
					return j.H.useMemoCache(N);
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
			(e.cloneElement = function (N, X, re) {
				if (N == null) throw Error("The argument must be a React element, but you passed " + N + ".");
				var de = O({}, N.props),
					ge = N.key;
				if (X != null)
					for (_e in (X.key !== void 0 && (ge = "" + X.key), X))
						!q.call(X, _e) ||
							_e === "key" ||
							_e === "__self" ||
							_e === "__source" ||
							(_e === "ref" && X.ref === void 0) ||
							(de[_e] = X[_e]);
				var _e = arguments.length - 2;
				if (_e === 1) de.children = re;
				else if (1 < _e) {
					for (var we = Array(_e), Je = 0; Je < _e; Je++) we[Je] = arguments[Je + 2];
					de.children = we;
				}
				return G(N.type, ge, de);
			}),
			(e.createContext = function (N) {
				return (
					(N = { $$typeof: h, _currentValue: N, _currentValue2: N, _threadCount: 0, Provider: null, Consumer: null }),
					(N.Provider = N),
					(N.Consumer = { $$typeof: f, _context: N }),
					N
				);
			}),
			(e.createElement = function (N, X, re) {
				var de,
					ge = {},
					_e = null;
				if (X != null)
					for (de in (X.key !== void 0 && (_e = "" + X.key), X))
						q.call(X, de) && de !== "key" && de !== "__self" && de !== "__source" && (ge[de] = X[de]);
				var we = arguments.length - 2;
				if (we === 1) ge.children = re;
				else if (1 < we) {
					for (var Je = Array(we), De = 0; De < we; De++) Je[De] = arguments[De + 2];
					ge.children = Je;
				}
				if (N && N.defaultProps) for (de in ((we = N.defaultProps), we)) ge[de] === void 0 && (ge[de] = we[de]);
				return G(N, _e, ge);
			}),
			(e.createRef = function () {
				return { current: null };
			}),
			(e.forwardRef = function (N) {
				return { $$typeof: m, render: N };
			}),
			(e.isValidElement = oe),
			(e.lazy = function (N) {
				return { $$typeof: _, _payload: { _status: -1, _result: N }, _init: se };
			}),
			(e.memo = function (N, X) {
				return { $$typeof: g, type: N, compare: X === void 0 ? null : X };
			}),
			(e.startTransition = function (N) {
				var X = j.T,
					re = {};
				j.T = re;
				try {
					var de = N(),
						ge = j.S;
					(ge !== null && ge(re, de),
						typeof de == "object" && de !== null && typeof de.then == "function" && de.then(Q, me));
				} catch (_e) {
					me(_e);
				} finally {
					(X !== null && re.types !== null && (X.types = re.types), (j.T = X));
				}
			}),
			(e.unstable_useCacheRefresh = function () {
				return j.H.useCacheRefresh();
			}),
			(e.use = function (N) {
				return j.H.use(N);
			}),
			(e.useActionState = function (N, X, re) {
				return j.H.useActionState(N, X, re);
			}),
			(e.useCallback = function (N, X) {
				return j.H.useCallback(N, X);
			}),
			(e.useContext = function (N) {
				return j.H.useContext(N);
			}),
			(e.useDebugValue = function () {}),
			(e.useDeferredValue = function (N, X) {
				return j.H.useDeferredValue(N, X);
			}),
			(e.useEffect = function (N, X) {
				return j.H.useEffect(N, X);
			}),
			(e.useEffectEvent = function (N) {
				return j.H.useEffectEvent(N);
			}),
			(e.useId = function () {
				return j.H.useId();
			}),
			(e.useImperativeHandle = function (N, X, re) {
				return j.H.useImperativeHandle(N, X, re);
			}),
			(e.useInsertionEffect = function (N, X) {
				return j.H.useInsertionEffect(N, X);
			}),
			(e.useLayoutEffect = function (N, X) {
				return j.H.useLayoutEffect(N, X);
			}),
			(e.useMemo = function (N, X) {
				return j.H.useMemo(N, X);
			}),
			(e.useOptimistic = function (N, X) {
				return j.H.useOptimistic(N, X);
			}),
			(e.useReducer = function (N, X, re) {
				return j.H.useReducer(N, X, re);
			}),
			(e.useRef = function (N) {
				return j.H.useRef(N);
			}),
			(e.useState = function (N) {
				return j.H.useState(N);
			}),
			(e.useSyncExternalStore = function (N, X, re) {
				return j.H.useSyncExternalStore(N, X, re);
			}),
			(e.useTransition = function () {
				return j.H.useTransition();
			}),
			(e.version = "19.2.8"));
	}),
	qo = Jn((e, n) => {
		n.exports = IE();
	}),
	VE = Jn((e) => {
		var n = qo();
		function r(v) {
			var g = "https://react.dev/errors/" + v;
			if (1 < arguments.length) {
				g += "?args[]=" + encodeURIComponent(arguments[1]);
				for (var _ = 2; _ < arguments.length; _++) g += "&args[]=" + encodeURIComponent(arguments[_]);
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
						throw Error(r(522));
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
		function f(v, g, _) {
			var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
			return { $$typeof: o, key: b == null ? null : "" + b, children: v, containerInfo: g, implementation: _ };
		}
		var h = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		function m(v, g) {
			if (v === "font") return "";
			if (typeof g == "string") return g === "use-credentials" ? g : "";
		}
		((e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
			(e.createPortal = function (v, g) {
				var _ = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
				if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)) throw Error(r(299));
				return f(v, g, null, _);
			}),
			(e.flushSync = function (v) {
				var g = h.T,
					_ = s.p;
				try {
					if (((h.T = null), (s.p = 2), v)) return v();
				} finally {
					((h.T = g), (s.p = _), s.d.f());
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
					var _ = g.as,
						b = m(_, g.crossOrigin),
						p = typeof g.integrity == "string" ? g.integrity : void 0,
						E = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
					_ === "style"
						? s.d.S(v, typeof g.precedence == "string" ? g.precedence : void 0, {
								crossOrigin: b,
								integrity: p,
								fetchPriority: E,
							})
						: _ === "script" &&
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
							var _ = m(g.as, g.crossOrigin);
							s.d.M(v, {
								crossOrigin: _,
								integrity: typeof g.integrity == "string" ? g.integrity : void 0,
								nonce: typeof g.nonce == "string" ? g.nonce : void 0,
							});
						}
					} else g ?? s.d.M(v);
			}),
			(e.preload = function (v, g) {
				if (typeof v == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
					var _ = g.as,
						b = m(_, g.crossOrigin);
					s.d.L(v, _, {
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
						var _ = m(g.as, g.crossOrigin);
						s.d.m(v, {
							as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
							crossOrigin: _,
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
			(e.useFormState = function (v, g, _) {
				return h.H.useFormState(v, g, _);
			}),
			(e.useFormStatus = function () {
				return h.H.useHostTransitionStatus();
			}),
			(e.version = "19.2.8"));
	}),
	Hp = Jn((e, n) => {
		function r() {
			if (
				!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")
			)
				try {
					__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
				} catch (u) {
					console.error(u);
				}
		}
		(r(), (n.exports = VE()));
	}),
	ZE = Jn((e) => {
		var n = BE(),
			r = qo(),
			u = Hp();
		function s(t) {
			var i = "https://react.dev/errors/" + t;
			if (1 < arguments.length) {
				i += "?args[]=" + encodeURIComponent(arguments[1]);
				for (var a = 2; a < arguments.length; a++) i += "&args[]=" + encodeURIComponent(arguments[a]);
			}
			return (
				"Minified React error #" +
				t +
				"; visit " +
				i +
				" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
			);
		}
		function o(t) {
			return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
		}
		function f(t) {
			var i = t,
				a = t;
			if (t.alternate) for (; i.return; ) i = i.return;
			else {
				t = i;
				do ((i = t), (i.flags & 4098) !== 0 && (a = i.return), (t = i.return));
				while (t);
			}
			return i.tag === 3 ? a : null;
		}
		function h(t) {
			if (t.tag === 13) {
				var i = t.memoizedState;
				if ((i === null && ((t = t.alternate), t !== null && (i = t.memoizedState)), i !== null)) return i.dehydrated;
			}
			return null;
		}
		function m(t) {
			if (t.tag === 31) {
				var i = t.memoizedState;
				if ((i === null && ((t = t.alternate), t !== null && (i = t.memoizedState)), i !== null)) return i.dehydrated;
			}
			return null;
		}
		function v(t) {
			if (f(t) !== t) throw Error(s(188));
		}
		function g(t) {
			var i = t.alternate;
			if (!i) {
				if (((i = f(t)), i === null)) throw Error(s(188));
				return i !== t ? null : t;
			}
			for (var a = t, l = i; ; ) {
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
						if (d === a) return (v(c), t);
						if (d === l) return (v(c), i);
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
			return a.stateNode.current === a ? t : i;
		}
		function _(t) {
			var i = t.tag;
			if (i === 5 || i === 26 || i === 27 || i === 6) return t;
			for (t = t.child; t !== null; ) {
				if (((i = _(t)), i !== null)) return i;
				t = t.sibling;
			}
			return null;
		}
		var b = Object.assign,
			p = Symbol.for("react.element"),
			E = Symbol.for("react.transitional.element"),
			x = Symbol.for("react.portal"),
			O = Symbol.for("react.fragment"),
			z = Symbol.for("react.strict_mode"),
			D = Symbol.for("react.profiler"),
			A = Symbol.for("react.consumer"),
			C = Symbol.for("react.context"),
			k = Symbol.for("react.forward_ref"),
			F = Symbol.for("react.suspense"),
			Q = Symbol.for("react.suspense_list"),
			j = Symbol.for("react.memo"),
			q = Symbol.for("react.lazy"),
			G = Symbol.for("react.activity"),
			B = Symbol.for("react.memo_cache_sentinel"),
			oe = Symbol.iterator;
		function ee(t) {
			return t === null || typeof t != "object"
				? null
				: ((t = (oe && t[oe]) || t["@@iterator"]), typeof t == "function" ? t : null);
		}
		var Y = Symbol.for("react.client.reference");
		function ae(t) {
			if (t == null) return null;
			if (typeof t == "function") return t.$$typeof === Y ? null : t.displayName || t.name || null;
			if (typeof t == "string") return t;
			switch (t) {
				case O:
					return "Fragment";
				case D:
					return "Profiler";
				case z:
					return "StrictMode";
				case F:
					return "Suspense";
				case Q:
					return "SuspenseList";
				case G:
					return "Activity";
			}
			if (typeof t == "object")
				switch (t.$$typeof) {
					case x:
						return "Portal";
					case C:
						return t.displayName || "Context";
					case A:
						return (t._context.displayName || "Context") + ".Consumer";
					case k:
						var i = t.render;
						return (
							(t = t.displayName),
							t || ((t = i.displayName || i.name || ""), (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
							t
						);
					case j:
						return ((i = t.displayName || null), i !== null ? i : ae(t.type) || "Memo");
					case q:
						((i = t._payload), (t = t._init));
						try {
							return ae(t(i));
						} catch {}
				}
			return null;
		}
		var R = Array.isArray,
			$ = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			H = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			se = { pending: !1, data: null, method: null, action: null },
			me = [],
			Re = -1;
		function N(t) {
			return { current: t };
		}
		function X(t) {
			0 > Re || ((t.current = me[Re]), (me[Re] = null), Re--);
		}
		function re(t, i) {
			(Re++, (me[Re] = t.current), (t.current = i));
		}
		var de = N(null),
			ge = N(null),
			_e = N(null),
			we = N(null);
		function Je(t, i) {
			switch ((re(_e, i), re(ge, t), re(de, null), i.nodeType)) {
				case 9:
				case 11:
					t = (t = i.documentElement) && (t = t.namespaceURI) ? by(t) : 0;
					break;
				default:
					if (((t = i.tagName), (i = i.namespaceURI))) ((i = by(i)), (t = _y(i, t)));
					else
						switch (t) {
							case "svg":
								t = 1;
								break;
							case "math":
								t = 2;
								break;
							default:
								t = 0;
						}
			}
			(X(de), re(de, t));
		}
		function De() {
			(X(de), X(ge), X(_e));
		}
		function Ke(t) {
			t.memoizedState !== null && re(we, t);
			var i = de.current,
				a = _y(i, t.type);
			i !== a && (re(ge, t), re(de, a));
		}
		function xt(t) {
			(ge.current === t && (X(de), X(ge)), we.current === t && (X(we), (ol._currentValue = se)));
		}
		var At, Yt;
		function Be(t) {
			if (At === void 0)
				try {
					throw Error();
				} catch (a) {
					var i = a.stack.trim().match(/\n( *(at )?)/);
					((At = (i && i[1]) || ""),
						(Yt =
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
				At +
				t +
				Yt
			);
		}
		var fe = !1;
		function Ee(t, i) {
			if (!t || fe) return "";
			fe = !0;
			var a = Error.prepareStackTrace;
			Error.prepareStackTrace = void 0;
			try {
				var l = {
					DetermineComponentFrameRoot: function () {
						try {
							if (i) {
								var ie = function () {
									throw Error();
								};
								if (
									(Object.defineProperty(ie.prototype, "props", {
										set: function () {
											throw Error();
										},
									}),
									typeof Reflect == "object" && Reflect.construct)
								) {
									try {
										Reflect.construct(ie, []);
									} catch (K) {
										var Z = K;
									}
									Reflect.construct(t, [], ie);
								} else {
									try {
										ie.call();
									} catch (K) {
										Z = K;
									}
									t.call(ie.prototype);
								}
							} else {
								try {
									throw Error();
								} catch (K) {
									Z = K;
								}
								(ie = t()) && typeof ie.catch == "function" && ie.catch(function () {});
							}
						} catch (K) {
							if (K && Z && typeof K.stack == "string") return [K.stack, Z.stack];
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
					var M = y.split(`
`),
						V = T.split(`
`);
					for (c = l = 0; l < M.length && !M[l].includes("DetermineComponentFrameRoot"); ) l++;
					for (; c < V.length && !V[c].includes("DetermineComponentFrameRoot"); ) c++;
					if (l === M.length || c === V.length)
						for (l = M.length - 1, c = V.length - 1; 1 <= l && 0 <= c && M[l] !== V[c]; ) c--;
					for (; 1 <= l && 0 <= c; l--, c--)
						if (M[l] !== V[c]) {
							if (l !== 1 || c !== 1)
								do
									if ((l--, c--, 0 > c || M[l] !== V[c])) {
										var J =
											`
` + M[l].replace(" at new ", " at ");
										return (
											t.displayName && J.includes("<anonymous>") && (J = J.replace("<anonymous>", t.displayName)),
											J
										);
									}
								while (1 <= l && 0 <= c);
							break;
						}
				}
			} finally {
				((fe = !1), (Error.prepareStackTrace = a));
			}
			return (a = t ? t.displayName || t.name : "") ? Be(a) : "";
		}
		function Ge(t, i) {
			switch (t.tag) {
				case 26:
				case 27:
				case 5:
					return Be(t.type);
				case 16:
					return Be("Lazy");
				case 13:
					return t.child !== i && i !== null ? Be("Suspense Fallback") : Be("Suspense");
				case 19:
					return Be("SuspenseList");
				case 0:
				case 15:
					return Ee(t.type, !1);
				case 11:
					return Ee(t.type.render, !1);
				case 1:
					return Ee(t.type, !0);
				case 31:
					return Be("Activity");
				default:
					return "";
			}
		}
		function ze(t) {
			try {
				var i = "",
					a = null;
				do ((i += Ge(t, a)), (a = t), (t = t.return));
				while (t);
				return i;
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
		var bt = Object.prototype.hasOwnProperty,
			st = n.unstable_scheduleCallback,
			ue = n.unstable_cancelCallback,
			xe = n.unstable_shouldYield,
			ct = n.unstable_requestPaint,
			Oe = n.unstable_now,
			Ct = n.unstable_getCurrentPriorityLevel,
			Kt = n.unstable_ImmediatePriority,
			vt = n.unstable_UserBlockingPriority,
			jt = n.unstable_NormalPriority,
			ba = n.unstable_LowPriority,
			ci = n.unstable_IdlePriority,
			qn = n.log,
			xi = n.unstable_setDisableYieldValue,
			vn = null,
			Wt = null;
		function cn(t) {
			if ((typeof qn == "function" && xi(t), Wt && typeof Wt.setStrictMode == "function"))
				try {
					Wt.setStrictMode(vn, t);
				} catch {}
		}
		var Lt = Math.clz32 ? Math.clz32 : Ai,
			ei = Math.log,
			fi = Math.LN2;
		function Ai(t) {
			return ((t >>>= 0), t === 0 ? 32 : (31 - ((ei(t) / fi) | 0)) | 0);
		}
		var gn = 256,
			di = 262144,
			hi = 4194304;
		function fn(t) {
			var i = t & 42;
			if (i !== 0) return i;
			switch (t & -t) {
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
					return t & 261888;
				case 262144:
				case 524288:
				case 1048576:
				case 2097152:
					return t & 3932160;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432:
					return t & 62914560;
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
					return t;
			}
		}
		function Un(t, i, a) {
			var l = t.pendingLanes;
			if (l === 0) return 0;
			var c = 0,
				d = t.suspendedLanes,
				y = t.pingedLanes;
			t = t.warmLanes;
			var T = l & 134217727;
			return (
				T !== 0
					? ((l = T & ~d),
						l !== 0 ? (c = fn(l)) : ((y &= T), y !== 0 ? (c = fn(y)) : a || ((a = T & ~t), a !== 0 && (c = fn(a)))))
					: ((T = l & ~d), T !== 0 ? (c = fn(T)) : y !== 0 ? (c = fn(y)) : a || ((a = l & ~t), a !== 0 && (c = fn(a)))),
				c === 0
					? 0
					: i !== 0 &&
						  i !== c &&
						  (i & d) === 0 &&
						  ((d = c & -c), (a = i & -i), d >= a || (d === 32 && (a & 4194048) !== 0))
						? i
						: c
			);
		}
		function W(t, i) {
			return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & i) === 0;
		}
		function ce(t, i) {
			switch (t) {
				case 1:
				case 2:
				case 4:
				case 8:
				case 64:
					return i + 250;
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
					return i + 5e3;
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
		function Ae() {
			var t = hi;
			return ((hi <<= 1), (hi & 62914560) === 0 && (hi = 4194304), t);
		}
		function Se(t) {
			for (var i = [], a = 0; 31 > a; a++) i.push(t);
			return i;
		}
		function Fe(t, i) {
			((t.pendingLanes |= i), i !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
		}
		function ft(t, i, a, l, c, d) {
			var y = t.pendingLanes;
			((t.pendingLanes = a),
				(t.suspendedLanes = 0),
				(t.pingedLanes = 0),
				(t.warmLanes = 0),
				(t.expiredLanes &= a),
				(t.entangledLanes &= a),
				(t.errorRecoveryDisabledLanes &= a),
				(t.shellSuspendCounter = 0));
			var T = t.entanglements,
				M = t.expirationTimes,
				V = t.hiddenUpdates;
			for (a = y & ~a; 0 < a; ) {
				var J = 31 - Lt(a),
					ie = 1 << J;
				((T[J] = 0), (M[J] = -1));
				var Z = V[J];
				if (Z !== null)
					for (V[J] = null, J = 0; J < Z.length; J++) {
						var K = Z[J];
						K !== null && (K.lane &= -536870913);
					}
				a &= ~ie;
			}
			(l !== 0 && sn(t, l, 0), d !== 0 && c === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(y & ~i)));
		}
		function sn(t, i, a) {
			((t.pendingLanes |= i), (t.suspendedLanes &= ~i));
			var l = 31 - Lt(i);
			((t.entangledLanes |= i), (t.entanglements[l] = t.entanglements[l] | 1073741824 | (a & 261930)));
		}
		function Rt(t, i) {
			var a = (t.entangledLanes |= i);
			for (t = t.entanglements; a; ) {
				var l = 31 - Lt(a),
					c = 1 << l;
				((c & i) | (t[l] & i) && (t[l] |= i), (a &= ~c));
			}
		}
		function ti(t, i) {
			var a = i & -i;
			return ((a = (a & 42) !== 0 ? 1 : Cn(a)), (a & (t.suspendedLanes | i)) !== 0 ? 0 : a);
		}
		function Cn(t) {
			switch (t) {
				case 2:
					t = 1;
					break;
				case 8:
					t = 4;
					break;
				case 32:
					t = 16;
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
					t = 128;
					break;
				case 268435456:
					t = 134217728;
					break;
				default:
					t = 0;
			}
			return t;
		}
		function _t(t) {
			return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
		}
		function Ur() {
			var t = H.p;
			return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : Iy(t.type));
		}
		function ar(t, i) {
			var a = H.p;
			try {
				return ((H.p = t), i());
			} finally {
				H.p = a;
			}
		}
		var mi = Math.random().toString(36).slice(2),
			Gt = "__reactFiber$" + mi,
			Ft = "__reactProps$" + mi,
			$r = "__reactContainer$" + mi,
			xu = "__reactEvents$" + mi,
			Zl = "__reactListeners$" + mi,
			P = "__reactHandles$" + mi,
			le = "__reactResources$" + mi,
			ye = "__reactMarker$" + mi;
		function We(t) {
			(delete t[Gt], delete t[Ft], delete t[xu], delete t[Zl], delete t[P]);
		}
		function ot(t) {
			var i = t[Gt];
			if (i) return i;
			for (var a = t.parentNode; a; ) {
				if ((i = a[$r] || a[Gt])) {
					if (((a = i.alternate), i.child !== null || (a !== null && a.child !== null)))
						for (t = Cy(t); t !== null; ) {
							if ((a = t[Gt])) return a;
							t = Cy(t);
						}
					return i;
				}
				((t = a), (a = t.parentNode));
			}
			return null;
		}
		function nt(t) {
			if ((t = t[Gt] || t[$r])) {
				var i = t.tag;
				if (i === 5 || i === 6 || i === 13 || i === 31 || i === 26 || i === 27 || i === 3) return t;
			}
			return null;
		}
		function en(t) {
			var i = t.tag;
			if (i === 5 || i === 26 || i === 27 || i === 6) return t.stateNode;
			throw Error(s(33));
		}
		function ni(t) {
			var i = t[le];
			return (i || (i = t[le] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), i);
		}
		function Ie(t) {
			t[ye] = !0;
		}
		var Br = new Set(),
			_a = {};
		function Ci(t, i) {
			(Sa(t, i), Sa(t + "Capture", i));
		}
		function Sa(t, i) {
			for (_a[t] = i, t = 0; t < i.length; t++) Br.add(i[t]);
		}
		var J_ = RegExp(
				"^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
			),
			fm = {},
			dm = {};
		function W_(t) {
			return bt.call(dm, t) ? !0 : bt.call(fm, t) ? !1 : J_.test(t) ? (dm[t] = !0) : ((fm[t] = !0), !1);
		}
		function Hl(t, i, a) {
			if (W_(i))
				if (a === null) t.removeAttribute(i);
				else {
					switch (typeof a) {
						case "undefined":
						case "function":
						case "symbol":
							t.removeAttribute(i);
							return;
						case "boolean":
							var l = i.toLowerCase().slice(0, 5);
							if (l !== "data-" && l !== "aria-") {
								t.removeAttribute(i);
								return;
							}
					}
					t.setAttribute(i, "" + a);
				}
		}
		function Pl(t, i, a) {
			if (a === null) t.removeAttribute(i);
			else {
				switch (typeof a) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						t.removeAttribute(i);
						return;
				}
				t.setAttribute(i, "" + a);
			}
		}
		function Ri(t, i, a, l) {
			if (l === null) t.removeAttribute(a);
			else {
				switch (typeof l) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						t.removeAttribute(a);
						return;
				}
				t.setAttributeNS(i, a, "" + l);
			}
		}
		function $n(t) {
			switch (typeof t) {
				case "bigint":
				case "boolean":
				case "number":
				case "string":
				case "undefined":
					return t;
				case "object":
					return t;
				default:
					return "";
			}
		}
		function hm(t) {
			var i = t.type;
			return (t = t.nodeName) && t.toLowerCase() === "input" && (i === "checkbox" || i === "radio");
		}
		function eS(t, i, a) {
			var l = Object.getOwnPropertyDescriptor(t.constructor.prototype, i);
			if (!t.hasOwnProperty(i) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
				var c = l.get,
					d = l.set;
				return (
					Object.defineProperty(t, i, {
						configurable: !0,
						get: function () {
							return c.call(this);
						},
						set: function (y) {
							((a = "" + y), d.call(this, y));
						},
					}),
					Object.defineProperty(t, i, { enumerable: l.enumerable }),
					{
						getValue: function () {
							return a;
						},
						setValue: function (y) {
							a = "" + y;
						},
						stopTracking: function () {
							((t._valueTracker = null), delete t[i]);
						},
					}
				);
			}
		}
		function sc(t) {
			if (!t._valueTracker) {
				var i = hm(t) ? "checked" : "value";
				t._valueTracker = eS(t, i, "" + t[i]);
			}
		}
		function mm(t) {
			if (!t) return !1;
			var i = t._valueTracker;
			if (!i) return !0;
			var a = i.getValue(),
				l = "";
			return (t && (l = hm(t) ? (t.checked ? "true" : "false") : t.value), (t = l), t !== a ? (i.setValue(t), !0) : !1);
		}
		function Ql(t) {
			if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")) return null;
			try {
				return t.activeElement || t.body;
			} catch {
				return t.body;
			}
		}
		var tS = /[\n"\\]/g;
		function Bn(t) {
			return t.replace(tS, function (i) {
				return "\\" + i.charCodeAt(0).toString(16) + " ";
			});
		}
		function oc(t, i, a, l, c, d, y, T) {
			((t.name = ""),
				y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean"
					? (t.type = y)
					: t.removeAttribute("type"),
				i != null
					? y === "number"
						? ((i === 0 && t.value === "") || t.value != i) && (t.value = "" + $n(i))
						: t.value !== "" + $n(i) && (t.value = "" + $n(i))
					: (y !== "submit" && y !== "reset") || t.removeAttribute("value"),
				i != null ? cc(t, y, $n(i)) : a != null ? cc(t, y, $n(a)) : l != null && t.removeAttribute("value"),
				c == null && d != null && (t.defaultChecked = !!d),
				c != null && (t.checked = c && typeof c != "function" && typeof c != "symbol"),
				T != null && typeof T != "function" && typeof T != "symbol" && typeof T != "boolean"
					? (t.name = "" + $n(T))
					: t.removeAttribute("name"));
		}
		function vm(t, i, a, l, c, d, y, T) {
			if (
				(d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (t.type = d),
				i != null || a != null)
			) {
				if (!((d !== "submit" && d !== "reset") || i != null)) {
					sc(t);
					return;
				}
				((a = a != null ? "" + $n(a) : ""),
					(i = i != null ? "" + $n(i) : a),
					T || i === t.value || (t.value = i),
					(t.defaultValue = i));
			}
			((l = l ?? c),
				(l = typeof l != "function" && typeof l != "symbol" && !!l),
				(t.checked = T ? t.checked : !!l),
				(t.defaultChecked = !!l),
				y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (t.name = y),
				sc(t));
		}
		function cc(t, i, a) {
			(i === "number" && Ql(t.ownerDocument) === t) || t.defaultValue === "" + a || (t.defaultValue = "" + a);
		}
		function wa(t, i, a, l) {
			if (((t = t.options), i)) {
				i = {};
				for (var c = 0; c < a.length; c++) i["$" + a[c]] = !0;
				for (a = 0; a < t.length; a++)
					((c = i.hasOwnProperty("$" + t[a].value)),
						t[a].selected !== c && (t[a].selected = c),
						c && l && (t[a].defaultSelected = !0));
			} else {
				for (a = "" + $n(a), i = null, c = 0; c < t.length; c++) {
					if (t[c].value === a) {
						((t[c].selected = !0), l && (t[c].defaultSelected = !0));
						return;
					}
					i !== null || t[c].disabled || (i = t[c]);
				}
				i !== null && (i.selected = !0);
			}
		}
		function gm(t, i, a) {
			if (i != null && ((i = "" + $n(i)), i !== t.value && (t.value = i), a == null)) {
				t.defaultValue !== i && (t.defaultValue = i);
				return;
			}
			t.defaultValue = a != null ? "" + $n(a) : "";
		}
		function ym(t, i, a, l) {
			if (i == null) {
				if (l != null) {
					if (a != null) throw Error(s(92));
					if (R(l)) {
						if (1 < l.length) throw Error(s(93));
						l = l[0];
					}
					a = l;
				}
				((a ??= ""), (i = a));
			}
			((a = $n(i)),
				(t.defaultValue = a),
				(l = t.textContent),
				l === a && l !== "" && l !== null && (t.value = l),
				sc(t));
		}
		function Ea(t, i) {
			if (i) {
				var a = t.firstChild;
				if (a && a === t.lastChild && a.nodeType === 3) {
					a.nodeValue = i;
					return;
				}
			}
			t.textContent = i;
		}
		var nS = new Set(
			"animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
				" ",
			),
		);
		function pm(t, i, a) {
			var l = i.indexOf("--") === 0;
			a == null || typeof a == "boolean" || a === ""
				? l
					? t.setProperty(i, "")
					: i === "float"
						? (t.cssFloat = "")
						: (t[i] = "")
				: l
					? t.setProperty(i, a)
					: typeof a != "number" || a === 0 || nS.has(i)
						? i === "float"
							? (t.cssFloat = a)
							: (t[i] = ("" + a).trim())
						: (t[i] = a + "px");
		}
		function bm(t, i, a) {
			if (i != null && typeof i != "object") throw Error(s(62));
			if (((t = t.style), a != null)) {
				for (var l in a)
					!a.hasOwnProperty(l) ||
						(i != null && i.hasOwnProperty(l)) ||
						(l.indexOf("--") === 0 ? t.setProperty(l, "") : l === "float" ? (t.cssFloat = "") : (t[l] = ""));
				for (var c in i) ((l = i[c]), i.hasOwnProperty(c) && a[c] !== l && pm(t, c, l));
			} else for (var d in i) i.hasOwnProperty(d) && pm(t, d, i[d]);
		}
		function fc(t) {
			if (t.indexOf("-") === -1) return !1;
			switch (t) {
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
		var iS = new Map([
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
			rS =
				/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
		function Yl(t) {
			return rS.test("" + t)
				? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
				: t;
		}
		function Oi() {}
		var dc = null;
		function hc(t) {
			return (
				(t = t.target || t.srcElement || window),
				t.correspondingUseElement && (t = t.correspondingUseElement),
				t.nodeType === 3 ? t.parentNode : t
			);
		}
		var Ta = null,
			xa = null;
		function _m(t) {
			var i = nt(t);
			if (i && (t = i.stateNode)) {
				var a = t[Ft] || null;
				e: switch (((t = i.stateNode), i.type)) {
					case "input":
						if (
							(oc(t, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name),
							(i = a.name),
							a.type === "radio" && i != null)
						) {
							for (a = t; a.parentNode; ) a = a.parentNode;
							for (a = a.querySelectorAll('input[name="' + Bn("" + i) + '"][type="radio"]'), i = 0; i < a.length; i++) {
								var l = a[i];
								if (l !== t && l.form === t.form) {
									var c = l[Ft] || null;
									if (!c) throw Error(s(90));
									oc(l, c.value, c.defaultValue, c.defaultValue, c.checked, c.defaultChecked, c.type, c.name);
								}
							}
							for (i = 0; i < a.length; i++) ((l = a[i]), l.form === t.form && mm(l));
						}
						break e;
					case "textarea":
						gm(t, a.value, a.defaultValue);
						break e;
					case "select":
						((i = a.value), i != null && wa(t, !!a.multiple, i, !1));
				}
			}
		}
		var mc = !1;
		function Sm(t, i, a) {
			if (mc) return t(i, a);
			mc = !0;
			try {
				return t(i);
			} finally {
				if (((mc = !1), (Ta !== null || xa !== null) && (Ds(), Ta && ((i = Ta), (t = xa), (xa = Ta = null), _m(i), t))))
					for (i = 0; i < t.length; i++) _m(t[i]);
			}
		}
		function Au(t, i) {
			var a = t.stateNode;
			if (a === null) return null;
			var l = a[Ft] || null;
			if (l === null) return null;
			a = l[i];
			e: switch (i) {
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
						((t = t.type), (l = !(t === "button" || t === "input" || t === "select" || t === "textarea"))),
						(t = !l));
					break e;
				default:
					t = !1;
			}
			if (t) return null;
			if (a && typeof a != "function") throw Error(s(231, i, typeof a));
			return a;
		}
		var Ni = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
			vc = !1;
		if (Ni)
			try {
				var Cu = {};
				(Object.defineProperty(Cu, "passive", {
					get: function () {
						vc = !0;
					},
				}),
					window.addEventListener("test", Cu, Cu),
					window.removeEventListener("test", Cu, Cu));
			} catch {
				vc = !1;
			}
		var ur = null,
			gc = null,
			Kl = null;
		function wm() {
			if (Kl) return Kl;
			var t,
				i = gc,
				a = i.length,
				l,
				c = "value" in ur ? ur.value : ur.textContent,
				d = c.length;
			for (t = 0; t < a && i[t] === c[t]; t++);
			var y = a - t;
			for (l = 1; l <= y && i[a - l] === c[d - l]; l++);
			return (Kl = c.slice(t, 1 < l ? 1 - l : void 0));
		}
		function Gl(t) {
			var i = t.keyCode;
			return (
				"charCode" in t ? ((t = t.charCode), t === 0 && i === 13 && (t = 13)) : (t = i),
				t === 10 && (t = 13),
				32 <= t || t === 13 ? t : 0
			);
		}
		function Fl() {
			return !0;
		}
		function Em() {
			return !1;
		}
		function yn(t) {
			function i(a, l, c, d, y) {
				((this._reactName = a),
					(this._targetInst = c),
					(this.type = l),
					(this.nativeEvent = d),
					(this.target = y),
					(this.currentTarget = null));
				for (var T in t) t.hasOwnProperty(T) && ((a = t[T]), (this[T] = a ? a(d) : d[T]));
				return (
					(this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1)
						? Fl
						: Em),
					(this.isPropagationStopped = Em),
					this
				);
			}
			return (
				b(i.prototype, {
					preventDefault: function () {
						this.defaultPrevented = !0;
						var a = this.nativeEvent;
						a &&
							(a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1),
							(this.isDefaultPrevented = Fl));
					},
					stopPropagation: function () {
						var a = this.nativeEvent;
						a &&
							(a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
							(this.isPropagationStopped = Fl));
					},
					persist: function () {},
					isPersistent: Fl,
				}),
				i
			);
		}
		var Ir = {
				eventPhase: 0,
				bubbles: 0,
				cancelable: 0,
				timeStamp: function (t) {
					return t.timeStamp || Date.now();
				},
				defaultPrevented: 0,
				isTrusted: 0,
			},
			Xl = yn(Ir),
			Ru = b({}, Ir, { view: 0, detail: 0 }),
			aS = yn(Ru),
			yc,
			pc,
			Ou,
			Jl = b({}, Ru, {
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
				getModifierState: _c,
				button: 0,
				buttons: 0,
				relatedTarget: function (t) {
					return t.relatedTarget === void 0
						? t.fromElement === t.srcElement
							? t.toElement
							: t.fromElement
						: t.relatedTarget;
				},
				movementX: function (t) {
					return "movementX" in t
						? t.movementX
						: (t !== Ou &&
								(Ou && t.type === "mousemove"
									? ((yc = t.screenX - Ou.screenX), (pc = t.screenY - Ou.screenY))
									: (pc = yc = 0),
								(Ou = t)),
							yc);
				},
				movementY: function (t) {
					return "movementY" in t ? t.movementY : pc;
				},
			}),
			Tm = yn(Jl),
			uS = yn(b({}, Jl, { dataTransfer: 0 })),
			bc = yn(b({}, Ru, { relatedTarget: 0 })),
			lS = yn(b({}, Ir, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
			sS = yn(
				b({}, Ir, {
					clipboardData: function (t) {
						return "clipboardData" in t ? t.clipboardData : window.clipboardData;
					},
				}),
			),
			xm = yn(b({}, Ir, { data: 0 })),
			oS = {
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
			cS = {
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
			fS = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
		function dS(t) {
			var i = this.nativeEvent;
			return i.getModifierState ? i.getModifierState(t) : (t = fS[t]) ? !!i[t] : !1;
		}
		function _c() {
			return dS;
		}
		var hS = yn(
				b({}, Ru, {
					key: function (t) {
						if (t.key) {
							var i = oS[t.key] || t.key;
							if (i !== "Unidentified") return i;
						}
						return t.type === "keypress"
							? ((t = Gl(t)), t === 13 ? "Enter" : String.fromCharCode(t))
							: t.type === "keydown" || t.type === "keyup"
								? cS[t.keyCode] || "Unidentified"
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
					getModifierState: _c,
					charCode: function (t) {
						return t.type === "keypress" ? Gl(t) : 0;
					},
					keyCode: function (t) {
						return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
					which: function (t) {
						return t.type === "keypress" ? Gl(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
				}),
			),
			Am = yn(
				b({}, Jl, {
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
			mS = yn(
				b({}, Ru, {
					touches: 0,
					targetTouches: 0,
					changedTouches: 0,
					altKey: 0,
					metaKey: 0,
					ctrlKey: 0,
					shiftKey: 0,
					getModifierState: _c,
				}),
			),
			vS = yn(b({}, Ir, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
			gS = yn(
				b({}, Jl, {
					deltaX: function (t) {
						return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
					},
					deltaY: function (t) {
						return "deltaY" in t
							? t.deltaY
							: "wheelDeltaY" in t
								? -t.wheelDeltaY
								: "wheelDelta" in t
									? -t.wheelDelta
									: 0;
					},
					deltaZ: 0,
					deltaMode: 0,
				}),
			),
			yS = yn(b({}, Ir, { newState: 0, oldState: 0 })),
			pS = [9, 13, 27, 32],
			Sc = Ni && "CompositionEvent" in window,
			Nu = null;
		Ni && "documentMode" in document && (Nu = document.documentMode);
		var bS = Ni && "TextEvent" in window && !Nu,
			Cm = Ni && (!Sc || (Nu && 8 < Nu && 11 >= Nu)),
			Rm = " ",
			Om = !1;
		function Nm(t, i) {
			switch (t) {
				case "keyup":
					return pS.indexOf(i.keyCode) !== -1;
				case "keydown":
					return i.keyCode !== 229;
				case "keypress":
				case "mousedown":
				case "focusout":
					return !0;
				default:
					return !1;
			}
		}
		function km(t) {
			return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
		}
		var Aa = !1;
		function _S(t, i) {
			switch (t) {
				case "compositionend":
					return km(i);
				case "keypress":
					return i.which !== 32 ? null : ((Om = !0), Rm);
				case "textInput":
					return ((t = i.data), t === Rm && Om ? null : t);
				default:
					return null;
			}
		}
		function SS(t, i) {
			if (Aa)
				return t === "compositionend" || (!Sc && Nm(t, i)) ? ((t = wm()), (Kl = gc = ur = null), (Aa = !1), t) : null;
			switch (t) {
				case "paste":
					return null;
				case "keypress":
					if (!(i.ctrlKey || i.altKey || i.metaKey) || (i.ctrlKey && i.altKey)) {
						if (i.char && 1 < i.char.length) return i.char;
						if (i.which) return String.fromCharCode(i.which);
					}
					return null;
				case "compositionend":
					return Cm && i.locale !== "ko" ? null : i.data;
				default:
					return null;
			}
		}
		var wS = {
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
		function Mm(t) {
			var i = t && t.nodeName && t.nodeName.toLowerCase();
			return i === "input" ? !!wS[t.type] : i === "textarea";
		}
		function zm(t, i, a, l) {
			(Ta ? (xa ? xa.push(l) : (xa = [l])) : (Ta = l),
				(i = Is(i, "onChange")),
				0 < i.length && ((a = new Xl("onChange", "change", null, a, l)), t.push({ event: a, listeners: i })));
		}
		var ku = null,
			Mu = null;
		function ES(t) {
			dy(t, 0);
		}
		function Wl(t) {
			if (mm(en(t))) return t;
		}
		function Dm(t, i) {
			if (t === "change") return i;
		}
		var jm = !1;
		if (Ni) {
			var wc;
			if (Ni) {
				var Ec = "oninput" in document;
				if (!Ec) {
					var Lm = document.createElement("div");
					(Lm.setAttribute("oninput", "return;"), (Ec = typeof Lm.oninput == "function"));
				}
				wc = Ec;
			} else wc = !1;
			jm = wc && (!document.documentMode || 9 < document.documentMode);
		}
		function qm() {
			ku && (ku.detachEvent("onpropertychange", Um), (Mu = ku = null));
		}
		function Um(t) {
			if (t.propertyName === "value" && Wl(Mu)) {
				var i = [];
				(zm(i, Mu, t, hc(t)), Sm(ES, i));
			}
		}
		function TS(t, i, a) {
			t === "focusin" ? (qm(), (ku = i), (Mu = a), ku.attachEvent("onpropertychange", Um)) : t === "focusout" && qm();
		}
		function xS(t) {
			if (t === "selectionchange" || t === "keyup" || t === "keydown") return Wl(Mu);
		}
		function AS(t, i) {
			if (t === "click") return Wl(i);
		}
		function CS(t, i) {
			if (t === "input" || t === "change") return Wl(i);
		}
		function RS(t, i) {
			return (t === i && (t !== 0 || 1 / t === 1 / i)) || (t !== t && i !== i);
		}
		var Rn = typeof Object.is == "function" ? Object.is : RS;
		function zu(t, i) {
			if (Rn(t, i)) return !0;
			if (typeof t != "object" || t === null || typeof i != "object" || i === null) return !1;
			var a = Object.keys(t),
				l = Object.keys(i);
			if (a.length !== l.length) return !1;
			for (l = 0; l < a.length; l++) {
				var c = a[l];
				if (!bt.call(i, c) || !Rn(t[c], i[c])) return !1;
			}
			return !0;
		}
		function $m(t) {
			for (; t && t.firstChild; ) t = t.firstChild;
			return t;
		}
		function Bm(t, i) {
			var a = $m(t);
			t = 0;
			for (var l; a; ) {
				if (a.nodeType === 3) {
					if (((l = t + a.textContent.length), t <= i && l >= i)) return { node: a, offset: i - t };
					t = l;
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
				a = $m(a);
			}
		}
		function Im(t, i) {
			return t && i
				? t === i
					? !0
					: t && t.nodeType === 3
						? !1
						: i && i.nodeType === 3
							? Im(t, i.parentNode)
							: "contains" in t
								? t.contains(i)
								: t.compareDocumentPosition
									? !!(t.compareDocumentPosition(i) & 16)
									: !1
				: !1;
		}
		function Vm(t) {
			t =
				t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
					? t.ownerDocument.defaultView
					: window;
			for (var i = Ql(t.document); i instanceof t.HTMLIFrameElement; ) {
				try {
					var a = typeof i.contentWindow.location.href == "string";
				} catch {
					a = !1;
				}
				if (a) t = i.contentWindow;
				else break;
				i = Ql(t.document);
			}
			return i;
		}
		function Tc(t) {
			var i = t && t.nodeName && t.nodeName.toLowerCase();
			return (
				i &&
				((i === "input" &&
					(t.type === "text" ||
						t.type === "search" ||
						t.type === "tel" ||
						t.type === "url" ||
						t.type === "password")) ||
					i === "textarea" ||
					t.contentEditable === "true")
			);
		}
		var OS = Ni && "documentMode" in document && 11 >= document.documentMode,
			Ca = null,
			xc = null,
			Du = null,
			Ac = !1;
		function Zm(t, i, a) {
			var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
			Ac ||
				Ca == null ||
				Ca !== Ql(l) ||
				((l = Ca),
				"selectionStart" in l && Tc(l)
					? (l = { start: l.selectionStart, end: l.selectionEnd })
					: ((l = ((l.ownerDocument && l.ownerDocument.defaultView) || window).getSelection()),
						(l = {
							anchorNode: l.anchorNode,
							anchorOffset: l.anchorOffset,
							focusNode: l.focusNode,
							focusOffset: l.focusOffset,
						})),
				(Du && zu(Du, l)) ||
					((Du = l),
					(l = Is(xc, "onSelect")),
					0 < l.length &&
						((i = new Xl("onSelect", "select", null, i, a)), t.push({ event: i, listeners: l }), (i.target = Ca))));
		}
		function Vr(t, i) {
			var a = {};
			return ((a[t.toLowerCase()] = i.toLowerCase()), (a["Webkit" + t] = "webkit" + i), (a["Moz" + t] = "moz" + i), a);
		}
		var Ra = {
				animationend: Vr("Animation", "AnimationEnd"),
				animationiteration: Vr("Animation", "AnimationIteration"),
				animationstart: Vr("Animation", "AnimationStart"),
				transitionrun: Vr("Transition", "TransitionRun"),
				transitionstart: Vr("Transition", "TransitionStart"),
				transitioncancel: Vr("Transition", "TransitionCancel"),
				transitionend: Vr("Transition", "TransitionEnd"),
			},
			Cc = {},
			Hm = {};
		Ni &&
			((Hm = document.createElement("div").style),
			"AnimationEvent" in window ||
				(delete Ra.animationend.animation, delete Ra.animationiteration.animation, delete Ra.animationstart.animation),
			"TransitionEvent" in window || delete Ra.transitionend.transition);
		function Zr(t) {
			if (Cc[t]) return Cc[t];
			if (!Ra[t]) return t;
			var i = Ra[t],
				a;
			for (a in i) if (i.hasOwnProperty(a) && a in Hm) return (Cc[t] = i[a]);
			return t;
		}
		var Pm = Zr("animationend"),
			Qm = Zr("animationiteration"),
			Ym = Zr("animationstart"),
			NS = Zr("transitionrun"),
			kS = Zr("transitionstart"),
			MS = Zr("transitioncancel"),
			Km = Zr("transitionend"),
			Gm = new Map(),
			Rc =
				"abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
					" ",
				);
		Rc.push("scrollEnd");
		function ii(t, i) {
			(Gm.set(t, i), Ci(i, [t]));
		}
		var es =
				typeof reportError == "function"
					? reportError
					: function (t) {
							if (typeof window == "object" && typeof window.ErrorEvent == "function") {
								var i = new window.ErrorEvent("error", {
									bubbles: !0,
									cancelable: !0,
									message:
										typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
									error: t,
								});
								if (!window.dispatchEvent(i)) return;
							} else if (typeof process == "object" && typeof process.emit == "function") {
								process.emit("uncaughtException", t);
								return;
							}
							console.error(t);
						},
			In = [],
			Oa = 0,
			Oc = 0;
		function ts() {
			for (var t = Oa, i = (Oc = Oa = 0); i < t; ) {
				var a = In[i];
				In[i++] = null;
				var l = In[i];
				In[i++] = null;
				var c = In[i];
				In[i++] = null;
				var d = In[i];
				if (((In[i++] = null), l !== null && c !== null)) {
					var y = l.pending;
					(y === null ? (c.next = c) : ((c.next = y.next), (y.next = c)), (l.pending = c));
				}
				d !== 0 && Fm(a, c, d);
			}
		}
		function ns(t, i, a, l) {
			((In[Oa++] = t),
				(In[Oa++] = i),
				(In[Oa++] = a),
				(In[Oa++] = l),
				(Oc |= l),
				(t.lanes |= l),
				(t = t.alternate),
				t !== null && (t.lanes |= l));
		}
		function Nc(t, i, a, l) {
			return (ns(t, i, a, l), is(t));
		}
		function Hr(t, i) {
			return (ns(t, null, null, i), is(t));
		}
		function Fm(t, i, a) {
			t.lanes |= a;
			var l = t.alternate;
			l !== null && (l.lanes |= a);
			for (var c = !1, d = t.return; d !== null; )
				((d.childLanes |= a),
					(l = d.alternate),
					l !== null && (l.childLanes |= a),
					d.tag === 22 && ((t = d.stateNode), t === null || t._visibility & 1 || (c = !0)),
					(t = d),
					(d = d.return));
			return t.tag === 3
				? ((d = t.stateNode),
					c &&
						i !== null &&
						((c = 31 - Lt(a)),
						(t = d.hiddenUpdates),
						(l = t[c]),
						l === null ? (t[c] = [i]) : l.push(i),
						(i.lane = a | 536870912)),
					d)
				: null;
		}
		function is(t) {
			if (50 < nl) throw ((nl = 0), (Bf = null), Error(s(185)));
			for (var i = t.return; i !== null; ) ((t = i), (i = t.return));
			return t.tag === 3 ? t.stateNode : null;
		}
		var Na = {};
		function zS(t, i, a, l) {
			((this.tag = t),
				(this.key = a),
				(this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
				(this.index = 0),
				(this.refCleanup = this.ref = null),
				(this.pendingProps = i),
				(this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
				(this.mode = l),
				(this.subtreeFlags = this.flags = 0),
				(this.deletions = null),
				(this.childLanes = this.lanes = 0),
				(this.alternate = null));
		}
		function On(t, i, a, l) {
			return new zS(t, i, a, l);
		}
		function kc(t) {
			return ((t = t.prototype), !(!t || !t.isReactComponent));
		}
		function ki(t, i) {
			var a = t.alternate;
			return (
				a === null
					? ((a = On(t.tag, i, t.key, t.mode)),
						(a.elementType = t.elementType),
						(a.type = t.type),
						(a.stateNode = t.stateNode),
						(a.alternate = t),
						(t.alternate = a))
					: ((a.pendingProps = i), (a.type = t.type), (a.flags = 0), (a.subtreeFlags = 0), (a.deletions = null)),
				(a.flags = t.flags & 65011712),
				(a.childLanes = t.childLanes),
				(a.lanes = t.lanes),
				(a.child = t.child),
				(a.memoizedProps = t.memoizedProps),
				(a.memoizedState = t.memoizedState),
				(a.updateQueue = t.updateQueue),
				(i = t.dependencies),
				(a.dependencies = i === null ? null : { lanes: i.lanes, firstContext: i.firstContext }),
				(a.sibling = t.sibling),
				(a.index = t.index),
				(a.ref = t.ref),
				(a.refCleanup = t.refCleanup),
				a
			);
		}
		function Xm(t, i) {
			t.flags &= 65011714;
			var a = t.alternate;
			return (
				a === null
					? ((t.childLanes = 0),
						(t.lanes = i),
						(t.child = null),
						(t.subtreeFlags = 0),
						(t.memoizedProps = null),
						(t.memoizedState = null),
						(t.updateQueue = null),
						(t.dependencies = null),
						(t.stateNode = null))
					: ((t.childLanes = a.childLanes),
						(t.lanes = a.lanes),
						(t.child = a.child),
						(t.subtreeFlags = 0),
						(t.deletions = null),
						(t.memoizedProps = a.memoizedProps),
						(t.memoizedState = a.memoizedState),
						(t.updateQueue = a.updateQueue),
						(t.type = a.type),
						(i = a.dependencies),
						(t.dependencies = i === null ? null : { lanes: i.lanes, firstContext: i.firstContext })),
				t
			);
		}
		function rs(t, i, a, l, c, d) {
			var y = 0;
			if (((l = t), typeof t == "function")) kc(t) && (y = 1);
			else if (typeof t == "string")
				y = $w(t, a, de.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
			else
				e: switch (t) {
					case G:
						return ((t = On(31, a, i, c)), (t.elementType = G), (t.lanes = d), t);
					case O:
						return Pr(a.children, c, d, i);
					case z:
						((y = 8), (c |= 24));
						break;
					case D:
						return ((t = On(12, a, i, c | 2)), (t.elementType = D), (t.lanes = d), t);
					case F:
						return ((t = On(13, a, i, c)), (t.elementType = F), (t.lanes = d), t);
					case Q:
						return ((t = On(19, a, i, c)), (t.elementType = Q), (t.lanes = d), t);
					default:
						if (typeof t == "object" && t !== null)
							switch (t.$$typeof) {
								case C:
									y = 10;
									break e;
								case A:
									y = 9;
									break e;
								case k:
									y = 11;
									break e;
								case j:
									y = 14;
									break e;
								case q:
									((y = 16), (l = null));
									break e;
							}
						((y = 29), (a = Error(s(130, t === null ? "null" : typeof t, ""))), (l = null));
				}
			return ((i = On(y, a, i, c)), (i.elementType = t), (i.type = l), (i.lanes = d), i);
		}
		function Pr(t, i, a, l) {
			return ((t = On(7, t, l, i)), (t.lanes = a), t);
		}
		function Mc(t, i, a) {
			return ((t = On(6, t, null, i)), (t.lanes = a), t);
		}
		function Jm(t) {
			var i = On(18, null, null, 0);
			return ((i.stateNode = t), i);
		}
		function zc(t, i, a) {
			return (
				(i = On(4, t.children !== null ? t.children : [], t.key, i)),
				(i.lanes = a),
				(i.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }),
				i
			);
		}
		var Wm = new WeakMap();
		function Vn(t, i) {
			if (typeof t == "object" && t !== null) {
				var a = Wm.get(t);
				return a !== void 0 ? a : ((i = { value: t, source: i, stack: ze(i) }), Wm.set(t, i), i);
			}
			return { value: t, source: i, stack: ze(i) };
		}
		var ka = [],
			Ma = 0,
			as = null,
			ju = 0,
			Zn = [],
			Hn = 0,
			lr = null,
			vi = 1,
			gi = "";
		function Mi(t, i) {
			((ka[Ma++] = ju), (ka[Ma++] = as), (as = t), (ju = i));
		}
		function ev(t, i, a) {
			((Zn[Hn++] = vi), (Zn[Hn++] = gi), (Zn[Hn++] = lr), (lr = t));
			var l = vi;
			t = gi;
			var c = 32 - Lt(l) - 1;
			((l &= ~(1 << c)), (a += 1));
			var d = 32 - Lt(i) + c;
			if (30 < d) {
				var y = c - (c % 5);
				((d = (l & ((1 << y) - 1)).toString(32)),
					(l >>= y),
					(c -= y),
					(vi = (1 << (32 - Lt(i) + c)) | (a << c) | l),
					(gi = d + t));
			} else ((vi = (1 << d) | (a << c) | l), (gi = t));
		}
		function Dc(t) {
			t.return !== null && (Mi(t, 1), ev(t, 1, 0));
		}
		function jc(t) {
			for (; t === as; ) ((as = ka[--Ma]), (ka[Ma] = null), (ju = ka[--Ma]), (ka[Ma] = null));
			for (; t === lr; )
				((lr = Zn[--Hn]), (Zn[Hn] = null), (gi = Zn[--Hn]), (Zn[Hn] = null), (vi = Zn[--Hn]), (Zn[Hn] = null));
		}
		function tv(t, i) {
			((Zn[Hn++] = vi), (Zn[Hn++] = gi), (Zn[Hn++] = lr), (vi = i.id), (gi = i.overflow), (lr = t));
		}
		var tn = null,
			dt = null,
			$e = !1,
			sr = null,
			Pn = !1,
			Lc = Error(s(519));
		function or(t) {
			throw (
				Lu(Vn(Error(s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), t)),
				Lc
			);
		}
		function nv(t) {
			var i = t.stateNode,
				a = t.type,
				l = t.memoizedProps;
			switch (((i[Gt] = t), (i[Ft] = l), a)) {
				case "dialog":
					(Le("cancel", i), Le("close", i));
					break;
				case "iframe":
				case "object":
				case "embed":
					Le("load", i);
					break;
				case "video":
				case "audio":
					for (a = 0; a < rl.length; a++) Le(rl[a], i);
					break;
				case "source":
					Le("error", i);
					break;
				case "img":
				case "image":
				case "link":
					(Le("error", i), Le("load", i));
					break;
				case "details":
					Le("toggle", i);
					break;
				case "input":
					(Le("invalid", i), vm(i, l.value, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name, !0));
					break;
				case "select":
					Le("invalid", i);
					break;
				case "textarea":
					(Le("invalid", i), ym(i, l.value, l.defaultValue, l.children));
			}
			((a = l.children),
				(typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
				i.textContent === "" + a ||
				l.suppressHydrationWarning === !0 ||
				yy(i.textContent, a)
					? (l.popover != null && (Le("beforetoggle", i), Le("toggle", i)),
						l.onScroll != null && Le("scroll", i),
						l.onScrollEnd != null && Le("scrollend", i),
						l.onClick != null && (i.onclick = Oi),
						(i = !0))
					: (i = !1),
				i || or(t, !0));
		}
		function iv(t) {
			for (tn = t.return; tn; )
				switch (tn.tag) {
					case 5:
					case 31:
					case 13:
						Pn = !1;
						return;
					case 27:
					case 3:
						Pn = !0;
						return;
					default:
						tn = tn.return;
				}
		}
		function za(t) {
			if (t !== tn) return !1;
			if (!$e) return (iv(t), ($e = !0), !1);
			var i = t.tag,
				a;
			if (
				((a = i !== 3 && i !== 27) &&
					((a = i === 5) && ((a = t.type), (a = !(a !== "form" && a !== "button") || ed(t.type, t.memoizedProps))),
					(a = !a)),
				a && dt && or(t),
				iv(t),
				i === 13)
			) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
				dt = Ay(t);
			} else if (i === 31) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
				dt = Ay(t);
			} else
				i === 27
					? ((i = dt), Sr(t.type) ? ((t = ad), (ad = null), (dt = t)) : (dt = i))
					: (dt = tn ? Kn(t.stateNode.nextSibling) : null);
			return !0;
		}
		function Qr() {
			((dt = tn = null), ($e = !1));
		}
		function qc() {
			var t = sr;
			return (t !== null && (Sn === null ? (Sn = t) : Sn.push.apply(Sn, t), (sr = null)), t);
		}
		function Lu(t) {
			sr === null ? (sr = [t]) : sr.push(t);
		}
		var Uc = N(null),
			Yr = null,
			zi = null;
		function cr(t, i, a) {
			(re(Uc, i._currentValue), (i._currentValue = a));
		}
		function Di(t) {
			((t._currentValue = Uc.current), X(Uc));
		}
		function $c(t, i, a) {
			for (; t !== null; ) {
				var l = t.alternate;
				if (
					((t.childLanes & i) !== i
						? ((t.childLanes |= i), l !== null && (l.childLanes |= i))
						: l !== null && (l.childLanes & i) !== i && (l.childLanes |= i),
					t === a)
				)
					break;
				t = t.return;
			}
		}
		function Bc(t, i, a, l) {
			var c = t.child;
			for (c !== null && (c.return = t); c !== null; ) {
				var d = c.dependencies;
				if (d !== null) {
					var y = c.child;
					d = d.firstContext;
					e: for (; d !== null; ) {
						var T = d;
						d = c;
						for (var M = 0; M < i.length; M++)
							if (T.context === i[M]) {
								((d.lanes |= a), (T = d.alternate), T !== null && (T.lanes |= a), $c(d.return, a, t), l || (y = null));
								break e;
							}
						d = T.next;
					}
				} else if (c.tag === 18) {
					if (((y = c.return), y === null)) throw Error(s(341));
					((y.lanes |= a), (d = y.alternate), d !== null && (d.lanes |= a), $c(y, a, t), (y = null));
				} else y = c.child;
				if (y !== null) y.return = c;
				else
					for (y = c; y !== null; ) {
						if (y === t) {
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
		function Da(t, i, a, l) {
			t = null;
			for (var c = i, d = !1; c !== null; ) {
				if (!d) {
					if ((c.flags & 524288) !== 0) d = !0;
					else if ((c.flags & 262144) !== 0) break;
				}
				if (c.tag === 10) {
					var y = c.alternate;
					if (y === null) throw Error(s(387));
					if (((y = y.memoizedProps), y !== null)) {
						var T = c.type;
						Rn(c.pendingProps.value, y.value) || (t !== null ? t.push(T) : (t = [T]));
					}
				} else if (c === we.current) {
					if (((y = c.alternate), y === null)) throw Error(s(387));
					y.memoizedState.memoizedState !== c.memoizedState.memoizedState && (t !== null ? t.push(ol) : (t = [ol]));
				}
				c = c.return;
			}
			(t !== null && Bc(i, t, a, l), (i.flags |= 262144));
		}
		function us(t) {
			for (t = t.firstContext; t !== null; ) {
				if (!Rn(t.context._currentValue, t.memoizedValue)) return !0;
				t = t.next;
			}
			return !1;
		}
		function Kr(t) {
			((Yr = t), (zi = null), (t = t.dependencies), t !== null && (t.firstContext = null));
		}
		function nn(t) {
			return rv(Yr, t);
		}
		function ls(t, i) {
			return (Yr === null && Kr(t), rv(t, i));
		}
		function rv(t, i) {
			var a = i._currentValue;
			if (((i = { context: i, memoizedValue: a, next: null }), zi === null)) {
				if (t === null) throw Error(s(308));
				((zi = i), (t.dependencies = { lanes: 0, firstContext: i }), (t.flags |= 524288));
			} else zi = zi.next = i;
			return a;
		}
		var DS =
				typeof AbortController < "u"
					? AbortController
					: function () {
							var t = [],
								i = (this.signal = {
									aborted: !1,
									addEventListener: function (a, l) {
										t.push(l);
									},
								});
							this.abort = function () {
								((i.aborted = !0),
									t.forEach(function (a) {
										return a();
									}));
							};
						},
			jS = n.unstable_scheduleCallback,
			LS = n.unstable_NormalPriority,
			qt = { $$typeof: C, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
		function Ic() {
			return { controller: new DS(), data: new Map(), refCount: 0 };
		}
		function qu(t) {
			(t.refCount--,
				t.refCount === 0 &&
					jS(LS, function () {
						t.controller.abort();
					}));
		}
		var Uu = null,
			Vc = 0,
			ja = 0,
			La = null;
		function qS(t, i) {
			if (Uu === null) {
				var a = (Uu = []);
				((Vc = 0),
					(ja = Qf()),
					(La = {
						status: "pending",
						value: void 0,
						then: function (l) {
							a.push(l);
						},
					}));
			}
			return (Vc++, i.then(av, av), i);
		}
		function av() {
			if (--Vc === 0 && Uu !== null) {
				La !== null && (La.status = "fulfilled");
				var t = Uu;
				((Uu = null), (ja = 0), (La = null));
				for (var i = 0; i < t.length; i++) (0, t[i])();
			}
		}
		function US(t, i) {
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
				t.then(
					function () {
						((l.status = "fulfilled"), (l.value = i));
						for (var c = 0; c < a.length; c++) (0, a[c])(i);
					},
					function (c) {
						for (l.status = "rejected", l.reason = c, c = 0; c < a.length; c++) (0, a[c])(void 0);
					},
				),
				l
			);
		}
		var uv = $.S;
		$.S = function (t, i) {
			((Bg = Oe()),
				typeof i == "object" && i !== null && typeof i.then == "function" && qS(t, i),
				uv !== null && uv(t, i));
		};
		var Gr = N(null);
		function Zc() {
			var t = Gr.current;
			return t !== null ? t : lt.pooledCache;
		}
		function ss(t, i) {
			i === null ? re(Gr, Gr.current) : re(Gr, i.pool);
		}
		function lv() {
			var t = Zc();
			return t === null ? null : { parent: qt._currentValue, pool: t };
		}
		var qa = Error(s(460)),
			Hc = Error(s(474)),
			os = Error(s(542)),
			cs = { then: function () {} };
		function sv(t) {
			return ((t = t.status), t === "fulfilled" || t === "rejected");
		}
		function ov(t, i, a) {
			switch (((a = t[a]), a === void 0 ? t.push(i) : a !== i && (i.then(Oi, Oi), (i = a)), i.status)) {
				case "fulfilled":
					return i.value;
				case "rejected":
					throw ((t = i.reason), fv(t), t);
				default:
					if (typeof i.status == "string") i.then(Oi, Oi);
					else {
						if (((t = lt), t !== null && 100 < t.shellSuspendCounter)) throw Error(s(482));
						((t = i),
							(t.status = "pending"),
							t.then(
								function (l) {
									if (i.status === "pending") {
										var c = i;
										((c.status = "fulfilled"), (c.value = l));
									}
								},
								function (l) {
									if (i.status === "pending") {
										var c = i;
										((c.status = "rejected"), (c.reason = l));
									}
								},
							));
					}
					switch (i.status) {
						case "fulfilled":
							return i.value;
						case "rejected":
							throw ((t = i.reason), fv(t), t);
					}
					throw ((Xr = i), qa);
			}
		}
		function Fr(t) {
			try {
				var i = t._init;
				return i(t._payload);
			} catch (a) {
				throw a !== null && typeof a == "object" && typeof a.then == "function" ? ((Xr = a), qa) : a;
			}
		}
		var Xr = null;
		function cv() {
			if (Xr === null) throw Error(s(459));
			var t = Xr;
			return ((Xr = null), t);
		}
		function fv(t) {
			if (t === qa || t === os) throw Error(s(483));
		}
		var Ua = null,
			$u = 0;
		function fs(t) {
			var i = $u;
			return (($u += 1), Ua === null && (Ua = []), ov(Ua, t, i));
		}
		function Bu(t, i) {
			((i = i.props.ref), (t.ref = i !== void 0 ? i : null));
		}
		function ds(t, i) {
			throw i.$$typeof === p
				? Error(s(525))
				: ((t = Object.prototype.toString.call(i)),
					Error(s(31, t === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : t)));
		}
		function dv(t) {
			function i(U, L) {
				if (t) {
					var I = U.deletions;
					I === null ? ((U.deletions = [L]), (U.flags |= 16)) : I.push(L);
				}
			}
			function a(U, L) {
				if (!t) return null;
				for (; L !== null; ) (i(U, L), (L = L.sibling));
				return null;
			}
			function l(U) {
				for (var L = new Map(); U !== null; ) (U.key !== null ? L.set(U.key, U) : L.set(U.index, U), (U = U.sibling));
				return L;
			}
			function c(U, L) {
				return ((U = ki(U, L)), (U.index = 0), (U.sibling = null), U);
			}
			function d(U, L, I) {
				return (
					(U.index = I),
					t
						? ((I = U.alternate),
							I !== null ? ((I = I.index), I < L ? ((U.flags |= 67108866), L) : I) : ((U.flags |= 67108866), L))
						: ((U.flags |= 1048576), L)
				);
			}
			function y(U) {
				return (t && U.alternate === null && (U.flags |= 67108866), U);
			}
			function T(U, L, I, te) {
				return L === null || L.tag !== 6
					? ((L = Mc(I, U.mode, te)), (L.return = U), L)
					: ((L = c(L, I)), (L.return = U), L);
			}
			function M(U, L, I, te) {
				var be = I.type;
				return be === O
					? J(U, L, I.props.children, te, I.key)
					: L !== null &&
						  (L.elementType === be || (typeof be == "object" && be !== null && be.$$typeof === q && Fr(be) === L.type))
						? ((L = c(L, I.props)), Bu(L, I), (L.return = U), L)
						: ((L = rs(I.type, I.key, I.props, null, U.mode, te)), Bu(L, I), (L.return = U), L);
			}
			function V(U, L, I, te) {
				return L === null ||
					L.tag !== 4 ||
					L.stateNode.containerInfo !== I.containerInfo ||
					L.stateNode.implementation !== I.implementation
					? ((L = zc(I, U.mode, te)), (L.return = U), L)
					: ((L = c(L, I.children || [])), (L.return = U), L);
			}
			function J(U, L, I, te, be) {
				return L === null || L.tag !== 7
					? ((L = Pr(I, U.mode, te, be)), (L.return = U), L)
					: ((L = c(L, I)), (L.return = U), L);
			}
			function ie(U, L, I) {
				if ((typeof L == "string" && L !== "") || typeof L == "number" || typeof L == "bigint")
					return ((L = Mc("" + L, U.mode, I)), (L.return = U), L);
				if (typeof L == "object" && L !== null) {
					switch (L.$$typeof) {
						case E:
							return ((I = rs(L.type, L.key, L.props, null, U.mode, I)), Bu(I, L), (I.return = U), I);
						case x:
							return ((L = zc(L, U.mode, I)), (L.return = U), L);
						case q:
							return ((L = Fr(L)), ie(U, L, I));
					}
					if (R(L) || ee(L)) return ((L = Pr(L, U.mode, I, null)), (L.return = U), L);
					if (typeof L.then == "function") return ie(U, fs(L), I);
					if (L.$$typeof === C) return ie(U, ls(U, L), I);
					ds(U, L);
				}
				return null;
			}
			function Z(U, L, I, te) {
				var be = L !== null ? L.key : null;
				if ((typeof I == "string" && I !== "") || typeof I == "number" || typeof I == "bigint")
					return be !== null ? null : T(U, L, "" + I, te);
				if (typeof I == "object" && I !== null) {
					switch (I.$$typeof) {
						case E:
							return I.key === be ? M(U, L, I, te) : null;
						case x:
							return I.key === be ? V(U, L, I, te) : null;
						case q:
							return ((I = Fr(I)), Z(U, L, I, te));
					}
					if (R(I) || ee(I)) return be !== null ? null : J(U, L, I, te, null);
					if (typeof I.then == "function") return Z(U, L, fs(I), te);
					if (I.$$typeof === C) return Z(U, L, ls(U, I), te);
					ds(U, I);
				}
				return null;
			}
			function K(U, L, I, te, be) {
				if ((typeof te == "string" && te !== "") || typeof te == "number" || typeof te == "bigint")
					return ((U = U.get(I) || null), T(L, U, "" + te, be));
				if (typeof te == "object" && te !== null) {
					switch (te.$$typeof) {
						case E:
							return ((U = U.get(te.key === null ? I : te.key) || null), M(L, U, te, be));
						case x:
							return ((U = U.get(te.key === null ? I : te.key) || null), V(L, U, te, be));
						case q:
							return ((te = Fr(te)), K(U, L, I, te, be));
					}
					if (R(te) || ee(te)) return ((U = U.get(I) || null), J(L, U, te, be, null));
					if (typeof te.then == "function") return K(U, L, I, fs(te), be);
					if (te.$$typeof === C) return K(U, L, I, ls(L, te), be);
					ds(L, te);
				}
				return null;
			}
			function he(U, L, I, te) {
				for (var be = null, Ze = null, ve = L, Me = (L = 0), Ue = null; ve !== null && Me < I.length; Me++) {
					ve.index > Me ? ((Ue = ve), (ve = null)) : (Ue = ve.sibling);
					var He = Z(U, ve, I[Me], te);
					if (He === null) {
						ve === null && (ve = Ue);
						break;
					}
					(t && ve && He.alternate === null && i(U, ve),
						(L = d(He, L, Me)),
						Ze === null ? (be = He) : (Ze.sibling = He),
						(Ze = He),
						(ve = Ue));
				}
				if (Me === I.length) return (a(U, ve), $e && Mi(U, Me), be);
				if (ve === null) {
					for (; Me < I.length; Me++)
						((ve = ie(U, I[Me], te)),
							ve !== null && ((L = d(ve, L, Me)), Ze === null ? (be = ve) : (Ze.sibling = ve), (Ze = ve)));
					return ($e && Mi(U, Me), be);
				}
				for (ve = l(ve); Me < I.length; Me++)
					((Ue = K(ve, U, Me, I[Me], te)),
						Ue !== null &&
							(t && Ue.alternate !== null && ve.delete(Ue.key === null ? Me : Ue.key),
							(L = d(Ue, L, Me)),
							Ze === null ? (be = Ue) : (Ze.sibling = Ue),
							(Ze = Ue)));
				return (
					t &&
						ve.forEach(function (Ar) {
							return i(U, Ar);
						}),
					$e && Mi(U, Me),
					be
				);
			}
			function Te(U, L, I, te) {
				if (I == null) throw Error(s(151));
				for (
					var be = null, Ze = null, ve = L, Me = (L = 0), Ue = null, He = I.next();
					ve !== null && !He.done;
					Me++, He = I.next()
				) {
					ve.index > Me ? ((Ue = ve), (ve = null)) : (Ue = ve.sibling);
					var Ar = Z(U, ve, He.value, te);
					if (Ar === null) {
						ve === null && (ve = Ue);
						break;
					}
					(t && ve && Ar.alternate === null && i(U, ve),
						(L = d(Ar, L, Me)),
						Ze === null ? (be = Ar) : (Ze.sibling = Ar),
						(Ze = Ar),
						(ve = Ue));
				}
				if (He.done) return (a(U, ve), $e && Mi(U, Me), be);
				if (ve === null) {
					for (; !He.done; Me++, He = I.next())
						((He = ie(U, He.value, te)),
							He !== null && ((L = d(He, L, Me)), Ze === null ? (be = He) : (Ze.sibling = He), (Ze = He)));
					return ($e && Mi(U, Me), be);
				}
				for (ve = l(ve); !He.done; Me++, He = I.next())
					((He = K(ve, U, Me, He.value, te)),
						He !== null &&
							(t && He.alternate !== null && ve.delete(He.key === null ? Me : He.key),
							(L = d(He, L, Me)),
							Ze === null ? (be = He) : (Ze.sibling = He),
							(Ze = He)));
				return (
					t &&
						ve.forEach(function (Ww) {
							return i(U, Ww);
						}),
					$e && Mi(U, Me),
					be
				);
			}
			function at(U, L, I, te) {
				if (
					(typeof I == "object" && I !== null && I.type === O && I.key === null && (I = I.props.children),
					typeof I == "object" && I !== null)
				) {
					switch (I.$$typeof) {
						case E:
							e: {
								for (var be = I.key; L !== null; ) {
									if (L.key === be) {
										if (((be = I.type), be === O)) {
											if (L.tag === 7) {
												(a(U, L.sibling), (te = c(L, I.props.children)), (te.return = U), (U = te));
												break e;
											}
										} else if (
											L.elementType === be ||
											(typeof be == "object" && be !== null && be.$$typeof === q && Fr(be) === L.type)
										) {
											(a(U, L.sibling), (te = c(L, I.props)), Bu(te, I), (te.return = U), (U = te));
											break e;
										}
										a(U, L);
										break;
									} else i(U, L);
									L = L.sibling;
								}
								I.type === O
									? ((te = Pr(I.props.children, U.mode, te, I.key)), (te.return = U), (U = te))
									: ((te = rs(I.type, I.key, I.props, null, U.mode, te)), Bu(te, I), (te.return = U), (U = te));
							}
							return y(U);
						case x:
							e: {
								for (be = I.key; L !== null; ) {
									if (L.key === be)
										if (
											L.tag === 4 &&
											L.stateNode.containerInfo === I.containerInfo &&
											L.stateNode.implementation === I.implementation
										) {
											(a(U, L.sibling), (te = c(L, I.children || [])), (te.return = U), (U = te));
											break e;
										} else {
											a(U, L);
											break;
										}
									else i(U, L);
									L = L.sibling;
								}
								((te = zc(I, U.mode, te)), (te.return = U), (U = te));
							}
							return y(U);
						case q:
							return ((I = Fr(I)), at(U, L, I, te));
					}
					if (R(I)) return he(U, L, I, te);
					if (ee(I)) {
						if (((be = ee(I)), typeof be != "function")) throw Error(s(150));
						return ((I = be.call(I)), Te(U, L, I, te));
					}
					if (typeof I.then == "function") return at(U, L, fs(I), te);
					if (I.$$typeof === C) return at(U, L, ls(U, I), te);
					ds(U, I);
				}
				return (typeof I == "string" && I !== "") || typeof I == "number" || typeof I == "bigint"
					? ((I = "" + I),
						L !== null && L.tag === 6
							? (a(U, L.sibling), (te = c(L, I)), (te.return = U), (U = te))
							: (a(U, L), (te = Mc(I, U.mode, te)), (te.return = U), (U = te)),
						y(U))
					: a(U, L);
			}
			return function (U, L, I, te) {
				try {
					$u = 0;
					var be = at(U, L, I, te);
					return ((Ua = null), be);
				} catch (ve) {
					if (ve === qa || ve === os) throw ve;
					var Ze = On(29, ve, null, U.mode);
					return ((Ze.lanes = te), (Ze.return = U), Ze);
				}
			};
		}
		var Jr = dv(!0),
			hv = dv(!1),
			fr = !1;
		function Pc(t) {
			t.updateQueue = {
				baseState: t.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: { pending: null, lanes: 0, hiddenCallbacks: null },
				callbacks: null,
			};
		}
		function Qc(t, i) {
			((t = t.updateQueue),
				i.updateQueue === t &&
					(i.updateQueue = {
						baseState: t.baseState,
						firstBaseUpdate: t.firstBaseUpdate,
						lastBaseUpdate: t.lastBaseUpdate,
						shared: t.shared,
						callbacks: null,
					}));
		}
		function Wr(t) {
			return { lane: t, tag: 0, payload: null, callback: null, next: null };
		}
		function ea(t, i, a) {
			var l = t.updateQueue;
			if (l === null) return null;
			if (((l = l.shared), (Pe & 2) !== 0)) {
				var c = l.pending;
				return (
					c === null ? (i.next = i) : ((i.next = c.next), (c.next = i)),
					(l.pending = i),
					(i = is(t)),
					Fm(t, null, a),
					i
				);
			}
			return (ns(t, l, i, a), is(t));
		}
		function Iu(t, i, a) {
			if (((i = i.updateQueue), i !== null && ((i = i.shared), (a & 4194048) !== 0))) {
				var l = i.lanes;
				((l &= t.pendingLanes), (a |= l), (i.lanes = a), Rt(t, a));
			}
		}
		function Yc(t, i) {
			var a = t.updateQueue,
				l = t.alternate;
			if (l !== null && ((l = l.updateQueue), a === l)) {
				var c = null,
					d = null;
				if (((a = a.firstBaseUpdate), a !== null)) {
					do {
						var y = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
						(d === null ? (c = d = y) : (d = d.next = y), (a = a.next));
					} while (a !== null);
					d === null ? (c = d = i) : (d = d.next = i);
				} else c = d = i;
				((a = {
					baseState: l.baseState,
					firstBaseUpdate: c,
					lastBaseUpdate: d,
					shared: l.shared,
					callbacks: l.callbacks,
				}),
					(t.updateQueue = a));
				return;
			}
			((t = a.lastBaseUpdate), t === null ? (a.firstBaseUpdate = i) : (t.next = i), (a.lastBaseUpdate = i));
		}
		var Kc = !1;
		function Vu() {
			if (Kc) {
				var t = La;
				if (t !== null) throw t;
			}
		}
		function Zu(t, i, a, l) {
			Kc = !1;
			var c = t.updateQueue;
			fr = !1;
			var d = c.firstBaseUpdate,
				y = c.lastBaseUpdate,
				T = c.shared.pending;
			if (T !== null) {
				c.shared.pending = null;
				var M = T,
					V = M.next;
				((M.next = null), y === null ? (d = V) : (y.next = V), (y = M));
				var J = t.alternate;
				J !== null &&
					((J = J.updateQueue),
					(T = J.lastBaseUpdate),
					T !== y && (T === null ? (J.firstBaseUpdate = V) : (T.next = V), (J.lastBaseUpdate = M)));
			}
			if (d !== null) {
				var ie = c.baseState;
				((y = 0), (J = V = M = null), (T = d));
				do {
					var Z = T.lane & -536870913,
						K = Z !== T.lane;
					if (K ? (qe & Z) === Z : (l & Z) === Z) {
						(Z !== 0 && Z === ja && (Kc = !0),
							J !== null && (J = J.next = { lane: 0, tag: T.tag, payload: T.payload, callback: null, next: null }));
						e: {
							var he = t,
								Te = T;
							Z = i;
							var at = a;
							switch (Te.tag) {
								case 1:
									if (((he = Te.payload), typeof he == "function")) {
										ie = he.call(at, ie, Z);
										break e;
									}
									ie = he;
									break e;
								case 3:
									he.flags = (he.flags & -65537) | 128;
								case 0:
									if (((he = Te.payload), (Z = typeof he == "function" ? he.call(at, ie, Z) : he), Z == null)) break e;
									ie = b({}, ie, Z);
									break e;
								case 2:
									fr = !0;
							}
						}
						((Z = T.callback),
							Z !== null &&
								((t.flags |= 64),
								K && (t.flags |= 8192),
								(K = c.callbacks),
								K === null ? (c.callbacks = [Z]) : K.push(Z)));
					} else
						((K = { lane: Z, tag: T.tag, payload: T.payload, callback: T.callback, next: null }),
							J === null ? ((V = J = K), (M = ie)) : (J = J.next = K),
							(y |= Z));
					if (((T = T.next), T === null)) {
						if (((T = c.shared.pending), T === null)) break;
						((K = T), (T = K.next), (K.next = null), (c.lastBaseUpdate = K), (c.shared.pending = null));
					}
				} while (!0);
				(J === null && (M = ie),
					(c.baseState = M),
					(c.firstBaseUpdate = V),
					(c.lastBaseUpdate = J),
					d === null && (c.shared.lanes = 0),
					(gr |= y),
					(t.lanes = y),
					(t.memoizedState = ie));
			}
		}
		function mv(t, i) {
			if (typeof t != "function") throw Error(s(191, t));
			t.call(i);
		}
		function vv(t, i) {
			var a = t.callbacks;
			if (a !== null) for (t.callbacks = null, t = 0; t < a.length; t++) mv(a[t], i);
		}
		var $a = N(null),
			hs = N(0);
		function gv(t, i) {
			((t = Zi), re(hs, t), re($a, i), (Zi = t | i.baseLanes));
		}
		function Gc() {
			(re(hs, Zi), re($a, $a.current));
		}
		function Fc() {
			((Zi = hs.current), X($a), X(hs));
		}
		var Nn = N(null),
			Qn = null;
		function dr(t) {
			var i = t.alternate;
			(re(kt, kt.current & 1),
				re(Nn, t),
				Qn === null && (i === null || $a.current !== null || i.memoizedState !== null) && (Qn = t));
		}
		function Xc(t) {
			(re(kt, kt.current), re(Nn, t), Qn === null && (Qn = t));
		}
		function yv(t) {
			t.tag === 22 ? (re(kt, kt.current), re(Nn, t), Qn === null && (Qn = t)) : hr(t);
		}
		function hr() {
			(re(kt, kt.current), re(Nn, Nn.current));
		}
		function kn(t) {
			(X(Nn), Qn === t && (Qn = null), X(kt));
		}
		var kt = N(0);
		function ms(t) {
			for (var i = t; i !== null; ) {
				if (i.tag === 13) {
					var a = i.memoizedState;
					if (a !== null && ((a = a.dehydrated), a === null || id(a) || rd(a))) return i;
				} else if (
					i.tag === 19 &&
					(i.memoizedProps.revealOrder === "forwards" ||
						i.memoizedProps.revealOrder === "backwards" ||
						i.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
						i.memoizedProps.revealOrder === "together")
				) {
					if ((i.flags & 128) !== 0) return i;
				} else if (i.child !== null) {
					((i.child.return = i), (i = i.child));
					continue;
				}
				if (i === t) break;
				for (; i.sibling === null; ) {
					if (i.return === null || i.return === t) return null;
					i = i.return;
				}
				((i.sibling.return = i.return), (i = i.sibling));
			}
			return null;
		}
		var ji = 0,
			ke = null,
			it = null,
			Ut = null,
			vs = !1,
			Ba = !1,
			ta = !1,
			gs = 0,
			Hu = 0,
			Ia = null,
			$S = 0;
		function Ot() {
			throw Error(s(321));
		}
		function Jc(t, i) {
			if (i === null) return !1;
			for (var a = 0; a < i.length && a < t.length; a++) if (!Rn(t[a], i[a])) return !1;
			return !0;
		}
		function Wc(t, i, a, l, c, d) {
			return (
				(ji = d),
				(ke = i),
				(i.memoizedState = null),
				(i.updateQueue = null),
				(i.lanes = 0),
				($.H = t === null || t.memoizedState === null ? eg : vf),
				(ta = !1),
				(d = a(l, c)),
				(ta = !1),
				Ba && (d = bv(i, a, l, c)),
				pv(t),
				d
			);
		}
		function pv(t) {
			$.H = Yu;
			var i = it !== null && it.next !== null;
			if (((ji = 0), (Ut = it = ke = null), (vs = !1), (Hu = 0), (Ia = null), i)) throw Error(s(300));
			t === null || $t || ((t = t.dependencies), t !== null && us(t) && ($t = !0));
		}
		function bv(t, i, a, l) {
			ke = t;
			var c = 0;
			do {
				if ((Ba && (Ia = null), (Hu = 0), (Ba = !1), 25 <= c)) throw Error(s(301));
				if (((c += 1), (Ut = it = null), t.updateQueue != null)) {
					var d = t.updateQueue;
					((d.lastEffect = null), (d.events = null), (d.stores = null), d.memoCache != null && (d.memoCache.index = 0));
				}
				(($.H = tg), (d = i(a, l)));
			} while (Ba);
			return d;
		}
		function BS() {
			var t = $.H,
				i = t.useState()[0];
			return (
				(i = typeof i.then == "function" ? Pu(i) : i),
				(t = t.useState()[0]),
				(it !== null ? it.memoizedState : null) !== t && (ke.flags |= 1024),
				i
			);
		}
		function ef() {
			var t = gs !== 0;
			return ((gs = 0), t);
		}
		function tf(t, i, a) {
			((i.updateQueue = t.updateQueue), (i.flags &= -2053), (t.lanes &= ~a));
		}
		function nf(t) {
			if (vs) {
				for (t = t.memoizedState; t !== null; ) {
					var i = t.queue;
					(i !== null && (i.pending = null), (t = t.next));
				}
				vs = !1;
			}
			((ji = 0), (Ut = it = ke = null), (Ba = !1), (Hu = gs = 0), (Ia = null));
		}
		function dn() {
			var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
			return (Ut === null ? (ke.memoizedState = Ut = t) : (Ut = Ut.next = t), Ut);
		}
		function Mt() {
			if (it === null) {
				var t = ke.alternate;
				t = t !== null ? t.memoizedState : null;
			} else t = it.next;
			var i = Ut === null ? ke.memoizedState : Ut.next;
			if (i !== null) ((Ut = i), (it = t));
			else {
				if (t === null) throw ke.alternate === null ? Error(s(467)) : Error(s(310));
				((it = t),
					(t = {
						memoizedState: it.memoizedState,
						baseState: it.baseState,
						baseQueue: it.baseQueue,
						queue: it.queue,
						next: null,
					}),
					Ut === null ? (ke.memoizedState = Ut = t) : (Ut = Ut.next = t));
			}
			return Ut;
		}
		function ys() {
			return { lastEffect: null, events: null, stores: null, memoCache: null };
		}
		function Pu(t) {
			var i = Hu;
			return (
				(Hu += 1),
				Ia === null && (Ia = []),
				(t = ov(Ia, t, i)),
				(i = ke),
				(Ut === null ? i.memoizedState : Ut.next) === null &&
					((i = i.alternate), ($.H = i === null || i.memoizedState === null ? eg : vf)),
				t
			);
		}
		function ps(t) {
			if (t !== null && typeof t == "object") {
				if (typeof t.then == "function") return Pu(t);
				if (t.$$typeof === C) return nn(t);
			}
			throw Error(s(438, String(t)));
		}
		function rf(t) {
			var i = null,
				a = ke.updateQueue;
			if ((a !== null && (i = a.memoCache), i == null)) {
				var l = ke.alternate;
				l !== null &&
					((l = l.updateQueue),
					l !== null &&
						((l = l.memoCache),
						l != null &&
							(i = {
								data: l.data.map(function (c) {
									return c.slice();
								}),
								index: 0,
							})));
			}
			if (
				((i ??= { data: [], index: 0 }),
				a === null && ((a = ys()), (ke.updateQueue = a)),
				(a.memoCache = i),
				(a = i.data[i.index]),
				a === void 0)
			)
				for (a = i.data[i.index] = Array(t), l = 0; l < t; l++) a[l] = B;
			return (i.index++, a);
		}
		function Li(t, i) {
			return typeof i == "function" ? i(t) : i;
		}
		function bs(t) {
			return af(Mt(), it, t);
		}
		function af(t, i, a) {
			var l = t.queue;
			if (l === null) throw Error(s(311));
			l.lastRenderedReducer = a;
			var c = t.baseQueue,
				d = l.pending;
			if (d !== null) {
				if (c !== null) {
					var y = c.next;
					((c.next = d.next), (d.next = y));
				}
				((i.baseQueue = c = d), (l.pending = null));
			}
			if (((d = t.baseState), c === null)) t.memoizedState = d;
			else {
				i = c.next;
				var T = (y = null),
					M = null,
					V = i,
					J = !1;
				do {
					var ie = V.lane & -536870913;
					if (ie !== V.lane ? (qe & ie) === ie : (ji & ie) === ie) {
						var Z = V.revertLane;
						if (Z === 0)
							(M !== null &&
								(M = M.next =
									{
										lane: 0,
										revertLane: 0,
										gesture: null,
										action: V.action,
										hasEagerState: V.hasEagerState,
										eagerState: V.eagerState,
										next: null,
									}),
								ie === ja && (J = !0));
						else if ((ji & Z) === Z) {
							((V = V.next), Z === ja && (J = !0));
							continue;
						} else
							((ie = {
								lane: 0,
								revertLane: V.revertLane,
								gesture: null,
								action: V.action,
								hasEagerState: V.hasEagerState,
								eagerState: V.eagerState,
								next: null,
							}),
								M === null ? ((T = M = ie), (y = d)) : (M = M.next = ie),
								(ke.lanes |= Z),
								(gr |= Z));
						((ie = V.action), ta && a(d, ie), (d = V.hasEagerState ? V.eagerState : a(d, ie)));
					} else
						((Z = {
							lane: ie,
							revertLane: V.revertLane,
							gesture: V.gesture,
							action: V.action,
							hasEagerState: V.hasEagerState,
							eagerState: V.eagerState,
							next: null,
						}),
							M === null ? ((T = M = Z), (y = d)) : (M = M.next = Z),
							(ke.lanes |= ie),
							(gr |= ie));
					V = V.next;
				} while (V !== null && V !== i);
				if ((M === null ? (y = d) : (M.next = T), !Rn(d, t.memoizedState) && (($t = !0), J && ((a = La), a !== null))))
					throw a;
				((t.memoizedState = d), (t.baseState = y), (t.baseQueue = M), (l.lastRenderedState = d));
			}
			return (c === null && (l.lanes = 0), [t.memoizedState, l.dispatch]);
		}
		function uf(t) {
			var i = Mt(),
				a = i.queue;
			if (a === null) throw Error(s(311));
			a.lastRenderedReducer = t;
			var l = a.dispatch,
				c = a.pending,
				d = i.memoizedState;
			if (c !== null) {
				a.pending = null;
				var y = (c = c.next);
				do ((d = t(d, y.action)), (y = y.next));
				while (y !== c);
				(Rn(d, i.memoizedState) || ($t = !0),
					(i.memoizedState = d),
					i.baseQueue === null && (i.baseState = d),
					(a.lastRenderedState = d));
			}
			return [d, l];
		}
		function _v(t, i, a) {
			var l = ke,
				c = Mt(),
				d = $e;
			if (d) {
				if (a === void 0) throw Error(s(407));
				a = a();
			} else a = i();
			var y = !Rn((it || c).memoizedState, a);
			if (
				(y && ((c.memoizedState = a), ($t = !0)),
				(c = c.queue),
				of(Ev.bind(null, l, c, t), [t]),
				c.getSnapshot !== i || y || (Ut !== null && Ut.memoizedState.tag & 1))
			) {
				if (((l.flags |= 2048), Va(9, { destroy: void 0 }, wv.bind(null, l, c, a, i), null), lt === null))
					throw Error(s(349));
				d || (ji & 127) !== 0 || Sv(l, i, a);
			}
			return a;
		}
		function Sv(t, i, a) {
			((t.flags |= 16384),
				(t = { getSnapshot: i, value: a }),
				(i = ke.updateQueue),
				i === null
					? ((i = ys()), (ke.updateQueue = i), (i.stores = [t]))
					: ((a = i.stores), a === null ? (i.stores = [t]) : a.push(t)));
		}
		function wv(t, i, a, l) {
			((i.value = a), (i.getSnapshot = l), Tv(i) && xv(t));
		}
		function Ev(t, i, a) {
			return a(function () {
				Tv(i) && xv(t);
			});
		}
		function Tv(t) {
			var i = t.getSnapshot;
			t = t.value;
			try {
				var a = i();
				return !Rn(t, a);
			} catch {
				return !0;
			}
		}
		function xv(t) {
			var i = Hr(t, 2);
			i !== null && wn(i, t, 2);
		}
		function lf(t) {
			var i = dn();
			if (typeof t == "function") {
				var a = t;
				if (((t = a()), ta)) {
					cn(!0);
					try {
						a();
					} finally {
						cn(!1);
					}
				}
			}
			return (
				(i.memoizedState = i.baseState = t),
				(i.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Li, lastRenderedState: t }),
				i
			);
		}
		function Av(t, i, a, l) {
			return ((t.baseState = a), af(t, it, typeof l == "function" ? l : Li));
		}
		function IS(t, i, a, l, c) {
			if (ws(t)) throw Error(s(485));
			if (((t = i.action), t !== null)) {
				var d = {
					payload: c,
					action: t,
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
					(a = i.pending),
					a === null ? ((d.next = i.pending = d), Cv(i, d)) : ((d.next = a.next), (i.pending = a.next = d)));
			}
		}
		function Cv(t, i) {
			var a = i.action,
				l = i.payload,
				c = t.state;
			if (i.isTransition) {
				var d = $.T,
					y = {};
				$.T = y;
				try {
					var T = a(c, l),
						M = $.S;
					(M !== null && M(y, T), Rv(t, i, T));
				} catch (V) {
					sf(t, i, V);
				} finally {
					(d !== null && y.types !== null && (d.types = y.types), ($.T = d));
				}
			} else
				try {
					((d = a(c, l)), Rv(t, i, d));
				} catch (V) {
					sf(t, i, V);
				}
		}
		function Rv(t, i, a) {
			a !== null && typeof a == "object" && typeof a.then == "function"
				? a.then(
						function (l) {
							Ov(t, i, l);
						},
						function (l) {
							return sf(t, i, l);
						},
					)
				: Ov(t, i, a);
		}
		function Ov(t, i, a) {
			((i.status = "fulfilled"),
				(i.value = a),
				Nv(i),
				(t.state = a),
				(i = t.pending),
				i !== null && ((a = i.next), a === i ? (t.pending = null) : ((a = a.next), (i.next = a), Cv(t, a))));
		}
		function sf(t, i, a) {
			var l = t.pending;
			if (((t.pending = null), l !== null)) {
				l = l.next;
				do ((i.status = "rejected"), (i.reason = a), Nv(i), (i = i.next));
				while (i !== l);
			}
			t.action = null;
		}
		function Nv(t) {
			t = t.listeners;
			for (var i = 0; i < t.length; i++) (0, t[i])();
		}
		function kv(t, i) {
			return i;
		}
		function Mv(t, i) {
			if ($e) {
				var a = lt.formState;
				if (a !== null) {
					e: {
						var l = ke;
						if ($e) {
							if (dt) {
								t: {
									for (var c = dt, d = Pn; c.nodeType !== 8; ) {
										if (!d) {
											c = null;
											break t;
										}
										if (((c = Kn(c.nextSibling)), c === null)) {
											c = null;
											break t;
										}
									}
									((d = c.data), (c = d === "F!" || d === "F" ? c : null));
								}
								if (c) {
									((dt = Kn(c.nextSibling)), (l = c.data === "F!"));
									break e;
								}
							}
							or(l);
						}
						l = !1;
					}
					l && (i = a[0]);
				}
			}
			return (
				(a = dn()),
				(a.memoizedState = a.baseState = i),
				(l = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: kv, lastRenderedState: i }),
				(a.queue = l),
				(a = Xv.bind(null, ke, l)),
				(l.dispatch = a),
				(l = lf(!1)),
				(d = mf.bind(null, ke, !1, l.queue)),
				(l = dn()),
				(c = { state: i, dispatch: null, action: t, pending: null }),
				(l.queue = c),
				(a = IS.bind(null, ke, c, d, a)),
				(c.dispatch = a),
				(l.memoizedState = t),
				[i, a, !1]
			);
		}
		function zv(t) {
			return Dv(Mt(), it, t);
		}
		function Dv(t, i, a) {
			if (((i = af(t, i, kv)[0]), (t = bs(Li)[0]), typeof i == "object" && i !== null && typeof i.then == "function"))
				try {
					var l = Pu(i);
				} catch (y) {
					throw y === qa ? os : y;
				}
			else l = i;
			i = Mt();
			var c = i.queue,
				d = c.dispatch;
			return (
				a !== i.memoizedState && ((ke.flags |= 2048), Va(9, { destroy: void 0 }, VS.bind(null, c, a), null)),
				[l, d, t]
			);
		}
		function VS(t, i) {
			t.action = i;
		}
		function jv(t) {
			var i = Mt(),
				a = it;
			if (a !== null) return Dv(i, a, t);
			(Mt(), (i = i.memoizedState), (a = Mt()));
			var l = a.queue.dispatch;
			return ((a.memoizedState = t), [i, l, !1]);
		}
		function Va(t, i, a, l) {
			return (
				(t = { tag: t, create: a, deps: l, inst: i, next: null }),
				(i = ke.updateQueue),
				i === null && ((i = ys()), (ke.updateQueue = i)),
				(a = i.lastEffect),
				a === null ? (i.lastEffect = t.next = t) : ((l = a.next), (a.next = t), (t.next = l), (i.lastEffect = t)),
				t
			);
		}
		function Lv() {
			return Mt().memoizedState;
		}
		function _s(t, i, a, l) {
			var c = dn();
			((ke.flags |= t), (c.memoizedState = Va(1 | i, { destroy: void 0 }, a, l === void 0 ? null : l)));
		}
		function Ss(t, i, a, l) {
			var c = Mt();
			l = l === void 0 ? null : l;
			var d = c.memoizedState.inst;
			it !== null && l !== null && Jc(l, it.memoizedState.deps)
				? (c.memoizedState = Va(i, d, a, l))
				: ((ke.flags |= t), (c.memoizedState = Va(1 | i, d, a, l)));
		}
		function qv(t, i) {
			_s(8390656, 8, t, i);
		}
		function of(t, i) {
			Ss(2048, 8, t, i);
		}
		function ZS(t) {
			ke.flags |= 4;
			var i = ke.updateQueue;
			if (i === null) ((i = ys()), (ke.updateQueue = i), (i.events = [t]));
			else {
				var a = i.events;
				a === null ? (i.events = [t]) : a.push(t);
			}
		}
		function Uv(t) {
			var i = Mt().memoizedState;
			return (
				ZS({ ref: i, nextImpl: t }),
				function () {
					if ((Pe & 2) !== 0) throw Error(s(440));
					return i.impl.apply(void 0, arguments);
				}
			);
		}
		function $v(t, i) {
			return Ss(4, 2, t, i);
		}
		function Bv(t, i) {
			return Ss(4, 4, t, i);
		}
		function Iv(t, i) {
			if (typeof i == "function") {
				t = t();
				var a = i(t);
				return function () {
					typeof a == "function" ? a() : i(null);
				};
			}
			if (i != null)
				return (
					(t = t()),
					(i.current = t),
					function () {
						i.current = null;
					}
				);
		}
		function Vv(t, i, a) {
			((a = a != null ? a.concat([t]) : null), Ss(4, 4, Iv.bind(null, i, t), a));
		}
		function cf() {}
		function Zv(t, i) {
			var a = Mt();
			i = i === void 0 ? null : i;
			var l = a.memoizedState;
			return i !== null && Jc(i, l[1]) ? l[0] : ((a.memoizedState = [t, i]), t);
		}
		function Hv(t, i) {
			var a = Mt();
			i = i === void 0 ? null : i;
			var l = a.memoizedState;
			if (i !== null && Jc(i, l[1])) return l[0];
			if (((l = t()), ta)) {
				cn(!0);
				try {
					t();
				} finally {
					cn(!1);
				}
			}
			return ((a.memoizedState = [l, i]), l);
		}
		function ff(t, i, a) {
			return a === void 0 || ((ji & 1073741824) !== 0 && (qe & 261930) === 0)
				? (t.memoizedState = i)
				: ((t.memoizedState = a), (t = Vg()), (ke.lanes |= t), (gr |= t), a);
		}
		function Pv(t, i, a, l) {
			return Rn(a, i)
				? a
				: $a.current !== null
					? ((t = ff(t, a, l)), Rn(t, i) || ($t = !0), t)
					: (ji & 42) === 0 || ((ji & 1073741824) !== 0 && (qe & 261930) === 0)
						? (($t = !0), (t.memoizedState = a))
						: ((t = Vg()), (ke.lanes |= t), (gr |= t), i);
		}
		function Qv(t, i, a, l, c) {
			var d = H.p;
			H.p = d !== 0 && 8 > d ? d : 8;
			var y = $.T,
				T = {};
			(($.T = T), mf(t, !1, i, a));
			try {
				var M = c(),
					V = $.S;
				(V !== null && V(T, M),
					M !== null && typeof M == "object" && typeof M.then == "function"
						? Qu(t, i, US(M, l), Yn(t))
						: Qu(t, i, l, Yn(t)));
			} catch (J) {
				Qu(t, i, { then: function () {}, status: "rejected", reason: J }, Yn());
			} finally {
				((H.p = d), y !== null && T.types !== null && (y.types = T.types), ($.T = y));
			}
		}
		function HS() {}
		function df(t, i, a, l) {
			if (t.tag !== 5) throw Error(s(476));
			var c = Yv(t).queue;
			Qv(
				t,
				c,
				i,
				se,
				a === null
					? HS
					: function () {
							return (Kv(t), a(l));
						},
			);
		}
		function Yv(t) {
			var i = t.memoizedState;
			if (i !== null) return i;
			i = {
				memoizedState: se,
				baseState: se,
				baseQueue: null,
				queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Li, lastRenderedState: se },
				next: null,
			};
			var a = {};
			return (
				(i.next = {
					memoizedState: a,
					baseState: a,
					baseQueue: null,
					queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Li, lastRenderedState: a },
					next: null,
				}),
				(t.memoizedState = i),
				(t = t.alternate),
				t !== null && (t.memoizedState = i),
				i
			);
		}
		function Kv(t) {
			var i = Yv(t);
			(i.next === null && (i = t.alternate.memoizedState), Qu(t, i.next.queue, {}, Yn()));
		}
		function hf() {
			return nn(ol);
		}
		function Gv() {
			return Mt().memoizedState;
		}
		function Fv() {
			return Mt().memoizedState;
		}
		function PS(t) {
			for (var i = t.return; i !== null; ) {
				switch (i.tag) {
					case 24:
					case 3:
						var a = Yn();
						t = Wr(a);
						var l = ea(i, t, a);
						(l !== null && (wn(l, i, a), Iu(l, i, a)), (i = { cache: Ic() }), (t.payload = i));
						return;
				}
				i = i.return;
			}
		}
		function QS(t, i, a) {
			var l = Yn();
			((a = { lane: l, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null }),
				ws(t) ? Jv(i, a) : ((a = Nc(t, i, a, l)), a !== null && (wn(a, t, l), Wv(a, i, l))));
		}
		function Xv(t, i, a) {
			Qu(t, i, a, Yn());
		}
		function Qu(t, i, a, l) {
			var c = { lane: l, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null };
			if (ws(t)) Jv(i, c);
			else {
				var d = t.alternate;
				if (t.lanes === 0 && (d === null || d.lanes === 0) && ((d = i.lastRenderedReducer), d !== null))
					try {
						var y = i.lastRenderedState,
							T = d(y, a);
						if (((c.hasEagerState = !0), (c.eagerState = T), Rn(T, y)))
							return (ns(t, i, c, 0), lt === null && ts(), !1);
					} catch {}
				if (((a = Nc(t, i, c, l)), a !== null)) return (wn(a, t, l), Wv(a, i, l), !0);
			}
			return !1;
		}
		function mf(t, i, a, l) {
			if (
				((l = { lane: 2, revertLane: Qf(), gesture: null, action: l, hasEagerState: !1, eagerState: null, next: null }),
				ws(t))
			) {
				if (i) throw Error(s(479));
			} else ((i = Nc(t, a, l, 2)), i !== null && wn(i, t, 2));
		}
		function ws(t) {
			var i = t.alternate;
			return t === ke || (i !== null && i === ke);
		}
		function Jv(t, i) {
			Ba = vs = !0;
			var a = t.pending;
			(a === null ? (i.next = i) : ((i.next = a.next), (a.next = i)), (t.pending = i));
		}
		function Wv(t, i, a) {
			if ((a & 4194048) !== 0) {
				var l = i.lanes;
				((l &= t.pendingLanes), (a |= l), (i.lanes = a), Rt(t, a));
			}
		}
		var Yu = {
			readContext: nn,
			use: ps,
			useCallback: Ot,
			useContext: Ot,
			useEffect: Ot,
			useImperativeHandle: Ot,
			useLayoutEffect: Ot,
			useInsertionEffect: Ot,
			useMemo: Ot,
			useReducer: Ot,
			useRef: Ot,
			useState: Ot,
			useDebugValue: Ot,
			useDeferredValue: Ot,
			useTransition: Ot,
			useSyncExternalStore: Ot,
			useId: Ot,
			useHostTransitionStatus: Ot,
			useFormState: Ot,
			useActionState: Ot,
			useOptimistic: Ot,
			useMemoCache: Ot,
			useCacheRefresh: Ot,
		};
		Yu.useEffectEvent = Ot;
		var eg = {
				readContext: nn,
				use: ps,
				useCallback: function (t, i) {
					return ((dn().memoizedState = [t, i === void 0 ? null : i]), t);
				},
				useContext: nn,
				useEffect: qv,
				useImperativeHandle: function (t, i, a) {
					((a = a != null ? a.concat([t]) : null), _s(4194308, 4, Iv.bind(null, i, t), a));
				},
				useLayoutEffect: function (t, i) {
					return _s(4194308, 4, t, i);
				},
				useInsertionEffect: function (t, i) {
					_s(4, 2, t, i);
				},
				useMemo: function (t, i) {
					var a = dn();
					i = i === void 0 ? null : i;
					var l = t();
					if (ta) {
						cn(!0);
						try {
							t();
						} finally {
							cn(!1);
						}
					}
					return ((a.memoizedState = [l, i]), l);
				},
				useReducer: function (t, i, a) {
					var l = dn();
					if (a !== void 0) {
						var c = a(i);
						if (ta) {
							cn(!0);
							try {
								a(i);
							} finally {
								cn(!1);
							}
						}
					} else c = i;
					return (
						(l.memoizedState = l.baseState = c),
						(t = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: c }),
						(l.queue = t),
						(t = t.dispatch = QS.bind(null, ke, t)),
						[l.memoizedState, t]
					);
				},
				useRef: function (t) {
					var i = dn();
					return ((t = { current: t }), (i.memoizedState = t));
				},
				useState: function (t) {
					t = lf(t);
					var i = t.queue,
						a = Xv.bind(null, ke, i);
					return ((i.dispatch = a), [t.memoizedState, a]);
				},
				useDebugValue: cf,
				useDeferredValue: function (t, i) {
					return ff(dn(), t, i);
				},
				useTransition: function () {
					var t = lf(!1);
					return ((t = Qv.bind(null, ke, t.queue, !0, !1)), (dn().memoizedState = t), [!1, t]);
				},
				useSyncExternalStore: function (t, i, a) {
					var l = ke,
						c = dn();
					if ($e) {
						if (a === void 0) throw Error(s(407));
						a = a();
					} else {
						if (((a = i()), lt === null)) throw Error(s(349));
						(qe & 127) !== 0 || Sv(l, i, a);
					}
					c.memoizedState = a;
					var d = { value: a, getSnapshot: i };
					return (
						(c.queue = d),
						qv(Ev.bind(null, l, d, t), [t]),
						(l.flags |= 2048),
						Va(9, { destroy: void 0 }, wv.bind(null, l, d, a, i), null),
						a
					);
				},
				useId: function () {
					var t = dn(),
						i = lt.identifierPrefix;
					if ($e) {
						var a = gi,
							l = vi;
						((a = (l & ~(1 << (32 - Lt(l) - 1))).toString(32) + a),
							(i = "_" + i + "R_" + a),
							(a = gs++),
							0 < a && (i += "H" + a.toString(32)),
							(i += "_"));
					} else ((a = $S++), (i = "_" + i + "r_" + a.toString(32) + "_"));
					return (t.memoizedState = i);
				},
				useHostTransitionStatus: hf,
				useFormState: Mv,
				useActionState: Mv,
				useOptimistic: function (t) {
					var i = dn();
					i.memoizedState = i.baseState = t;
					var a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
					return ((i.queue = a), (i = mf.bind(null, ke, !0, a)), (a.dispatch = i), [t, i]);
				},
				useMemoCache: rf,
				useCacheRefresh: function () {
					return (dn().memoizedState = PS.bind(null, ke));
				},
				useEffectEvent: function (t) {
					var i = dn(),
						a = { impl: t };
					return (
						(i.memoizedState = a),
						function () {
							if ((Pe & 2) !== 0) throw Error(s(440));
							return a.impl.apply(void 0, arguments);
						}
					);
				},
			},
			vf = {
				readContext: nn,
				use: ps,
				useCallback: Zv,
				useContext: nn,
				useEffect: of,
				useImperativeHandle: Vv,
				useInsertionEffect: $v,
				useLayoutEffect: Bv,
				useMemo: Hv,
				useReducer: bs,
				useRef: Lv,
				useState: function () {
					return bs(Li);
				},
				useDebugValue: cf,
				useDeferredValue: function (t, i) {
					return Pv(Mt(), it.memoizedState, t, i);
				},
				useTransition: function () {
					var t = bs(Li)[0],
						i = Mt().memoizedState;
					return [typeof t == "boolean" ? t : Pu(t), i];
				},
				useSyncExternalStore: _v,
				useId: Gv,
				useHostTransitionStatus: hf,
				useFormState: zv,
				useActionState: zv,
				useOptimistic: function (t, i) {
					return Av(Mt(), it, t, i);
				},
				useMemoCache: rf,
				useCacheRefresh: Fv,
			};
		vf.useEffectEvent = Uv;
		var tg = {
			readContext: nn,
			use: ps,
			useCallback: Zv,
			useContext: nn,
			useEffect: of,
			useImperativeHandle: Vv,
			useInsertionEffect: $v,
			useLayoutEffect: Bv,
			useMemo: Hv,
			useReducer: uf,
			useRef: Lv,
			useState: function () {
				return uf(Li);
			},
			useDebugValue: cf,
			useDeferredValue: function (t, i) {
				var a = Mt();
				return it === null ? ff(a, t, i) : Pv(a, it.memoizedState, t, i);
			},
			useTransition: function () {
				var t = uf(Li)[0],
					i = Mt().memoizedState;
				return [typeof t == "boolean" ? t : Pu(t), i];
			},
			useSyncExternalStore: _v,
			useId: Gv,
			useHostTransitionStatus: hf,
			useFormState: jv,
			useActionState: jv,
			useOptimistic: function (t, i) {
				var a = Mt();
				return it !== null ? Av(a, it, t, i) : ((a.baseState = t), [t, a.queue.dispatch]);
			},
			useMemoCache: rf,
			useCacheRefresh: Fv,
		};
		tg.useEffectEvent = Uv;
		function gf(t, i, a, l) {
			((i = t.memoizedState),
				(a = a(l, i)),
				(a = a == null ? i : b({}, i, a)),
				(t.memoizedState = a),
				t.lanes === 0 && (t.updateQueue.baseState = a));
		}
		var yf = {
			enqueueSetState: function (t, i, a) {
				t = t._reactInternals;
				var l = Yn(),
					c = Wr(l);
				((c.payload = i), a != null && (c.callback = a), (i = ea(t, c, l)), i !== null && (wn(i, t, l), Iu(i, t, l)));
			},
			enqueueReplaceState: function (t, i, a) {
				t = t._reactInternals;
				var l = Yn(),
					c = Wr(l);
				((c.tag = 1),
					(c.payload = i),
					a != null && (c.callback = a),
					(i = ea(t, c, l)),
					i !== null && (wn(i, t, l), Iu(i, t, l)));
			},
			enqueueForceUpdate: function (t, i) {
				t = t._reactInternals;
				var a = Yn(),
					l = Wr(a);
				((l.tag = 2), i != null && (l.callback = i), (i = ea(t, l, a)), i !== null && (wn(i, t, a), Iu(i, t, a)));
			},
		};
		function ng(t, i, a, l, c, d, y) {
			return (
				(t = t.stateNode),
				typeof t.shouldComponentUpdate == "function"
					? t.shouldComponentUpdate(l, d, y)
					: i.prototype && i.prototype.isPureReactComponent
						? !zu(a, l) || !zu(c, d)
						: !0
			);
		}
		function ig(t, i, a, l) {
			((t = i.state),
				typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(a, l),
				typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(a, l),
				i.state !== t && yf.enqueueReplaceState(i, i.state, null));
		}
		function na(t, i) {
			var a = i;
			if ("ref" in i) {
				a = {};
				for (var l in i) l !== "ref" && (a[l] = i[l]);
			}
			if ((t = t.defaultProps)) {
				a === i && (a = b({}, a));
				for (var c in t) a[c] === void 0 && (a[c] = t[c]);
			}
			return a;
		}
		function YS(t) {
			es(t);
		}
		function KS(t) {
			console.error(t);
		}
		function GS(t) {
			es(t);
		}
		function Es(t, i) {
			try {
				var a = t.onUncaughtError;
				a(i.value, { componentStack: i.stack });
			} catch (l) {
				setTimeout(function () {
					throw l;
				});
			}
		}
		function rg(t, i, a) {
			try {
				var l = t.onCaughtError;
				l(a.value, { componentStack: a.stack, errorBoundary: i.tag === 1 ? i.stateNode : null });
			} catch (c) {
				setTimeout(function () {
					throw c;
				});
			}
		}
		function pf(t, i, a) {
			return (
				(a = Wr(a)),
				(a.tag = 3),
				(a.payload = { element: null }),
				(a.callback = function () {
					Es(t, i);
				}),
				a
			);
		}
		function ag(t) {
			return ((t = Wr(t)), (t.tag = 3), t);
		}
		function ug(t, i, a, l) {
			var c = a.type.getDerivedStateFromError;
			if (typeof c == "function") {
				var d = l.value;
				((t.payload = function () {
					return c(d);
				}),
					(t.callback = function () {
						rg(i, a, l);
					}));
			}
			var y = a.stateNode;
			y !== null &&
				typeof y.componentDidCatch == "function" &&
				(t.callback = function () {
					(rg(i, a, l), typeof c != "function" && (yr === null ? (yr = new Set([this])) : yr.add(this)));
					var T = l.stack;
					this.componentDidCatch(l.value, { componentStack: T !== null ? T : "" });
				});
		}
		function FS(t, i, a, l, c) {
			if (((a.flags |= 32768), l !== null && typeof l == "object" && typeof l.then == "function")) {
				if (((i = a.alternate), i !== null && Da(i, a, c, !0), (a = Nn.current), a !== null)) {
					switch (a.tag) {
						case 31:
						case 13:
							return (
								Qn === null ? js() : a.alternate === null && Nt === 0 && (Nt = 3),
								(a.flags &= -257),
								(a.flags |= 65536),
								(a.lanes = c),
								l === cs
									? (a.flags |= 16384)
									: ((i = a.updateQueue), i === null ? (a.updateQueue = new Set([l])) : i.add(l), Zf(t, l, c)),
								!1
							);
						case 22:
							return (
								(a.flags |= 65536),
								l === cs
									? (a.flags |= 16384)
									: ((i = a.updateQueue),
										i === null
											? ((i = { transitions: null, markerInstances: null, retryQueue: new Set([l]) }),
												(a.updateQueue = i))
											: ((a = i.retryQueue), a === null ? (i.retryQueue = new Set([l])) : a.add(l)),
										Zf(t, l, c)),
								!1
							);
					}
					throw Error(s(435, a.tag));
				}
				return (Zf(t, l, c), js(), !1);
			}
			if ($e)
				return (
					(i = Nn.current),
					i !== null
						? ((i.flags & 65536) === 0 && (i.flags |= 256),
							(i.flags |= 65536),
							(i.lanes = c),
							l !== Lc && ((t = Error(s(422), { cause: l })), Lu(Vn(t, a))))
						: (l !== Lc && ((i = Error(s(423), { cause: l })), Lu(Vn(i, a))),
							(t = t.current.alternate),
							(t.flags |= 65536),
							(c &= -c),
							(t.lanes |= c),
							(l = Vn(l, a)),
							(c = pf(t.stateNode, l, c)),
							Yc(t, c),
							Nt !== 4 && (Nt = 2)),
					!1
				);
			var d = Error(s(520), { cause: l });
			if (((d = Vn(d, a)), tl === null ? (tl = [d]) : tl.push(d), Nt !== 4 && (Nt = 2), i === null)) return !0;
			((l = Vn(l, a)), (a = i));
			do {
				switch (a.tag) {
					case 3:
						return ((a.flags |= 65536), (t = c & -c), (a.lanes |= t), (t = pf(a.stateNode, l, t)), Yc(a, t), !1);
					case 1:
						if (
							((i = a.type),
							(d = a.stateNode),
							(a.flags & 128) === 0 &&
								(typeof i.getDerivedStateFromError == "function" ||
									(d !== null && typeof d.componentDidCatch == "function" && (yr === null || !yr.has(d)))))
						)
							return ((a.flags |= 65536), (c &= -c), (a.lanes |= c), (c = ag(c)), ug(c, t, a, l), Yc(a, c), !1);
				}
				a = a.return;
			} while (a !== null);
			return !1;
		}
		var bf = Error(s(461)),
			$t = !1;
		function rn(t, i, a, l) {
			i.child = t === null ? hv(i, null, a, l) : Jr(i, t.child, a, l);
		}
		function lg(t, i, a, l, c) {
			a = a.render;
			var d = i.ref;
			if ("ref" in l) {
				var y = {};
				for (var T in l) T !== "ref" && (y[T] = l[T]);
			} else y = l;
			return (
				Kr(i),
				(l = Wc(t, i, a, y, d, c)),
				(T = ef()),
				t !== null && !$t ? (tf(t, i, c), qi(t, i, c)) : ($e && T && Dc(i), (i.flags |= 1), rn(t, i, l, c), i.child)
			);
		}
		function sg(t, i, a, l, c) {
			if (t === null) {
				var d = a.type;
				return typeof d == "function" && !kc(d) && d.defaultProps === void 0 && a.compare === null
					? ((i.tag = 15), (i.type = d), og(t, i, d, l, c))
					: ((t = rs(a.type, null, l, i, i.mode, c)), (t.ref = i.ref), (t.return = i), (i.child = t));
			}
			if (((d = t.child), !Cf(t, c))) {
				var y = d.memoizedProps;
				if (((a = a.compare), (a = a !== null ? a : zu), a(y, l) && t.ref === i.ref)) return qi(t, i, c);
			}
			return ((i.flags |= 1), (t = ki(d, l)), (t.ref = i.ref), (t.return = i), (i.child = t));
		}
		function og(t, i, a, l, c) {
			if (t !== null) {
				var d = t.memoizedProps;
				if (zu(d, l) && t.ref === i.ref)
					if ((($t = !1), (i.pendingProps = l = d), Cf(t, c))) (t.flags & 131072) !== 0 && ($t = !0);
					else return ((i.lanes = t.lanes), qi(t, i, c));
			}
			return _f(t, i, a, l, c);
		}
		function cg(t, i, a, l) {
			var c = l.children,
				d = t !== null ? t.memoizedState : null;
			if (
				(t === null &&
					i.stateNode === null &&
					(i.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				l.mode === "hidden")
			) {
				if ((i.flags & 128) !== 0) {
					if (((d = d !== null ? d.baseLanes | a : a), t !== null)) {
						for (l = i.child = t.child, c = 0; l !== null; ) ((c = c | l.lanes | l.childLanes), (l = l.sibling));
						l = c & ~d;
					} else ((l = 0), (i.child = null));
					return fg(t, i, d, a, l);
				}
				if ((a & 536870912) !== 0)
					((i.memoizedState = { baseLanes: 0, cachePool: null }),
						t !== null && ss(i, d !== null ? d.cachePool : null),
						d !== null ? gv(i, d) : Gc(),
						yv(i));
				else return ((l = i.lanes = 536870912), fg(t, i, d !== null ? d.baseLanes | a : a, a, l));
			} else
				d !== null
					? (ss(i, d.cachePool), gv(i, d), hr(i), (i.memoizedState = null))
					: (t !== null && ss(i, null), Gc(), hr(i));
			return (rn(t, i, c, a), i.child);
		}
		function Ku(t, i) {
			return (
				(t !== null && t.tag === 22) ||
					i.stateNode !== null ||
					(i.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				i.sibling
			);
		}
		function fg(t, i, a, l, c) {
			var d = Zc();
			return (
				(d = d === null ? null : { parent: qt._currentValue, pool: d }),
				(i.memoizedState = { baseLanes: a, cachePool: d }),
				t !== null && ss(i, null),
				Gc(),
				yv(i),
				t !== null && Da(t, i, l, !0),
				(i.childLanes = c),
				null
			);
		}
		function Ts(t, i) {
			return (
				(i = As({ mode: i.mode, children: i.children }, t.mode)),
				(i.ref = t.ref),
				(t.child = i),
				(i.return = t),
				i
			);
		}
		function dg(t, i, a) {
			return (Jr(i, t.child, null, a), (t = Ts(i, i.pendingProps)), (t.flags |= 2), kn(i), (i.memoizedState = null), t);
		}
		function XS(t, i, a) {
			var l = i.pendingProps,
				c = (i.flags & 128) !== 0;
			if (((i.flags &= -129), t === null)) {
				if ($e) {
					if (l.mode === "hidden") return ((t = Ts(i, l)), (i.lanes = 536870912), Ku(null, t));
					if (
						(Xc(i),
						(t = dt)
							? ((t = xy(t, Pn)),
								(t = t !== null && t.data === "&" ? t : null),
								t !== null &&
									((i.memoizedState = {
										dehydrated: t,
										treeContext: lr !== null ? { id: vi, overflow: gi } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = Jm(t)),
									(a.return = i),
									(i.child = a),
									(tn = i),
									(dt = null)))
							: (t = null),
						t === null)
					)
						throw or(i);
					return ((i.lanes = 536870912), null);
				}
				return Ts(i, l);
			}
			var d = t.memoizedState;
			if (d !== null) {
				var y = d.dehydrated;
				if ((Xc(i), c))
					if (i.flags & 256) ((i.flags &= -257), (i = dg(t, i, a)));
					else if (i.memoizedState !== null) ((i.child = t.child), (i.flags |= 128), (i = null));
					else throw Error(s(558));
				else if (($t || Da(t, i, a, !1), (c = (a & t.childLanes) !== 0), $t || c)) {
					if (((l = lt), l !== null && ((y = ti(l, a)), y !== 0 && y !== d.retryLane)))
						throw ((d.retryLane = y), Hr(t, y), wn(l, t, y), bf);
					(js(), (i = dg(t, i, a)));
				} else
					((t = d.treeContext),
						(dt = Kn(y.nextSibling)),
						(tn = i),
						($e = !0),
						(sr = null),
						(Pn = !1),
						t !== null && tv(i, t),
						(i = Ts(i, l)),
						(i.flags |= 4096));
				return i;
			}
			return (
				(t = ki(t.child, { mode: l.mode, children: l.children })),
				(t.ref = i.ref),
				(i.child = t),
				(t.return = i),
				t
			);
		}
		function xs(t, i) {
			var a = i.ref;
			if (a === null) t !== null && t.ref !== null && (i.flags |= 4194816);
			else {
				if (typeof a != "function" && typeof a != "object") throw Error(s(284));
				(t === null || t.ref !== a) && (i.flags |= 4194816);
			}
		}
		function _f(t, i, a, l, c) {
			return (
				Kr(i),
				(a = Wc(t, i, a, l, void 0, c)),
				(l = ef()),
				t !== null && !$t ? (tf(t, i, c), qi(t, i, c)) : ($e && l && Dc(i), (i.flags |= 1), rn(t, i, a, c), i.child)
			);
		}
		function hg(t, i, a, l, c, d) {
			return (
				Kr(i),
				(i.updateQueue = null),
				(a = bv(i, l, a, c)),
				pv(t),
				(l = ef()),
				t !== null && !$t ? (tf(t, i, d), qi(t, i, d)) : ($e && l && Dc(i), (i.flags |= 1), rn(t, i, a, d), i.child)
			);
		}
		function mg(t, i, a, l, c) {
			if ((Kr(i), i.stateNode === null)) {
				var d = Na,
					y = a.contextType;
				(typeof y == "object" && y !== null && (d = nn(y)),
					(d = new a(l, d)),
					(i.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null),
					(d.updater = yf),
					(i.stateNode = d),
					(d._reactInternals = i),
					(d = i.stateNode),
					(d.props = l),
					(d.state = i.memoizedState),
					(d.refs = {}),
					Pc(i),
					(y = a.contextType),
					(d.context = typeof y == "object" && y !== null ? nn(y) : Na),
					(d.state = i.memoizedState),
					(y = a.getDerivedStateFromProps),
					typeof y == "function" && (gf(i, a, y, l), (d.state = i.memoizedState)),
					typeof a.getDerivedStateFromProps == "function" ||
						typeof d.getSnapshotBeforeUpdate == "function" ||
						(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
						((y = d.state),
						typeof d.componentWillMount == "function" && d.componentWillMount(),
						typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(),
						y !== d.state && yf.enqueueReplaceState(d, d.state, null),
						Zu(i, l, d, c),
						Vu(),
						(d.state = i.memoizedState)),
					typeof d.componentDidMount == "function" && (i.flags |= 4194308),
					(l = !0));
			} else if (t === null) {
				d = i.stateNode;
				var T = i.memoizedProps,
					M = na(a, T);
				d.props = M;
				var V = d.context,
					J = a.contextType;
				((y = Na), typeof J == "object" && J !== null && (y = nn(J)));
				var ie = a.getDerivedStateFromProps;
				((J = typeof ie == "function" || typeof d.getSnapshotBeforeUpdate == "function"),
					(T = i.pendingProps !== T),
					J ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((T || V !== y) && ig(i, d, l, y)),
					(fr = !1));
				var Z = i.memoizedState;
				((d.state = Z),
					Zu(i, l, d, c),
					Vu(),
					(V = i.memoizedState),
					T || Z !== V || fr
						? (typeof ie == "function" && (gf(i, a, ie, l), (V = i.memoizedState)),
							(M = fr || ng(i, a, M, l, Z, V, y))
								? (J ||
										(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
										(typeof d.componentWillMount == "function" && d.componentWillMount(),
										typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()),
									typeof d.componentDidMount == "function" && (i.flags |= 4194308))
								: (typeof d.componentDidMount == "function" && (i.flags |= 4194308),
									(i.memoizedProps = l),
									(i.memoizedState = V)),
							(d.props = l),
							(d.state = V),
							(d.context = y),
							(l = M))
						: (typeof d.componentDidMount == "function" && (i.flags |= 4194308), (l = !1)));
			} else {
				((d = i.stateNode),
					Qc(t, i),
					(y = i.memoizedProps),
					(J = na(a, y)),
					(d.props = J),
					(ie = i.pendingProps),
					(Z = d.context),
					(V = a.contextType),
					(M = Na),
					typeof V == "object" && V !== null && (M = nn(V)),
					(T = a.getDerivedStateFromProps),
					(V = typeof T == "function" || typeof d.getSnapshotBeforeUpdate == "function") ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((y !== ie || Z !== M) && ig(i, d, l, M)),
					(fr = !1),
					(Z = i.memoizedState),
					(d.state = Z),
					Zu(i, l, d, c),
					Vu());
				var K = i.memoizedState;
				y !== ie || Z !== K || fr || (t !== null && t.dependencies !== null && us(t.dependencies))
					? (typeof T == "function" && (gf(i, a, T, l), (K = i.memoizedState)),
						(J = fr || ng(i, a, J, l, Z, K, M) || (t !== null && t.dependencies !== null && us(t.dependencies)))
							? (V ||
									(typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function") ||
									(typeof d.componentWillUpdate == "function" && d.componentWillUpdate(l, K, M),
									typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(l, K, M)),
								typeof d.componentDidUpdate == "function" && (i.flags |= 4),
								typeof d.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024))
							: (typeof d.componentDidUpdate != "function" ||
									(y === t.memoizedProps && Z === t.memoizedState) ||
									(i.flags |= 4),
								typeof d.getSnapshotBeforeUpdate != "function" ||
									(y === t.memoizedProps && Z === t.memoizedState) ||
									(i.flags |= 1024),
								(i.memoizedProps = l),
								(i.memoizedState = K)),
						(d.props = l),
						(d.state = K),
						(d.context = M),
						(l = J))
					: (typeof d.componentDidUpdate != "function" ||
							(y === t.memoizedProps && Z === t.memoizedState) ||
							(i.flags |= 4),
						typeof d.getSnapshotBeforeUpdate != "function" ||
							(y === t.memoizedProps && Z === t.memoizedState) ||
							(i.flags |= 1024),
						(l = !1));
			}
			return (
				(d = l),
				xs(t, i),
				(l = (i.flags & 128) !== 0),
				d || l
					? ((d = i.stateNode),
						(a = l && typeof a.getDerivedStateFromError != "function" ? null : d.render()),
						(i.flags |= 1),
						t !== null && l ? ((i.child = Jr(i, t.child, null, c)), (i.child = Jr(i, null, a, c))) : rn(t, i, a, c),
						(i.memoizedState = d.state),
						(t = i.child))
					: (t = qi(t, i, c)),
				t
			);
		}
		function vg(t, i, a, l) {
			return (Qr(), (i.flags |= 256), rn(t, i, a, l), i.child);
		}
		var Sf = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
		function wf(t) {
			return { baseLanes: t, cachePool: lv() };
		}
		function Ef(t, i, a) {
			return ((t = t !== null ? t.childLanes & ~a : 0), i && (t |= zn), t);
		}
		function gg(t, i, a) {
			var l = i.pendingProps,
				c = !1,
				d = (i.flags & 128) !== 0,
				y;
			if (
				((y = d) || (y = t !== null && t.memoizedState === null ? !1 : (kt.current & 2) !== 0),
				y && ((c = !0), (i.flags &= -129)),
				(y = (i.flags & 32) !== 0),
				(i.flags &= -33),
				t === null)
			) {
				if ($e) {
					if (
						(c ? dr(i) : hr(i),
						(t = dt)
							? ((t = xy(t, Pn)),
								(t = t !== null && t.data !== "&" ? t : null),
								t !== null &&
									((i.memoizedState = {
										dehydrated: t,
										treeContext: lr !== null ? { id: vi, overflow: gi } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = Jm(t)),
									(a.return = i),
									(i.child = a),
									(tn = i),
									(dt = null)))
							: (t = null),
						t === null)
					)
						throw or(i);
					return (rd(t) ? (i.lanes = 32) : (i.lanes = 536870912), null);
				}
				var T = l.children;
				return (
					(l = l.fallback),
					c
						? (hr(i),
							(c = i.mode),
							(T = As({ mode: "hidden", children: T }, c)),
							(l = Pr(l, c, a, null)),
							(T.return = i),
							(l.return = i),
							(T.sibling = l),
							(i.child = T),
							(l = i.child),
							(l.memoizedState = wf(a)),
							(l.childLanes = Ef(t, y, a)),
							(i.memoizedState = Sf),
							Ku(null, l))
						: (dr(i), Tf(i, T))
				);
			}
			var M = t.memoizedState;
			if (M !== null && ((T = M.dehydrated), T !== null)) {
				if (d)
					i.flags & 256
						? (dr(i), (i.flags &= -257), (i = xf(t, i, a)))
						: i.memoizedState !== null
							? (hr(i), (i.child = t.child), (i.flags |= 128), (i = null))
							: (hr(i),
								(T = l.fallback),
								(c = i.mode),
								(l = As({ mode: "visible", children: l.children }, c)),
								(T = Pr(T, c, a, null)),
								(T.flags |= 2),
								(l.return = i),
								(T.return = i),
								(l.sibling = T),
								(i.child = l),
								Jr(i, t.child, null, a),
								(l = i.child),
								(l.memoizedState = wf(a)),
								(l.childLanes = Ef(t, y, a)),
								(i.memoizedState = Sf),
								(i = Ku(null, l)));
				else if ((dr(i), rd(T))) {
					if (((y = T.nextSibling && T.nextSibling.dataset), y)) var V = y.dgst;
					((y = V),
						(l = Error(s(419))),
						(l.stack = ""),
						(l.digest = y),
						Lu({ value: l, source: null, stack: null }),
						(i = xf(t, i, a)));
				} else if (($t || Da(t, i, a, !1), (y = (a & t.childLanes) !== 0), $t || y)) {
					if (((y = lt), y !== null && ((l = ti(y, a)), l !== 0 && l !== M.retryLane)))
						throw ((M.retryLane = l), Hr(t, l), wn(y, t, l), bf);
					(id(T) || js(), (i = xf(t, i, a)));
				} else
					id(T)
						? ((i.flags |= 192), (i.child = t.child), (i = null))
						: ((t = M.treeContext),
							(dt = Kn(T.nextSibling)),
							(tn = i),
							($e = !0),
							(sr = null),
							(Pn = !1),
							t !== null && tv(i, t),
							(i = Tf(i, l.children)),
							(i.flags |= 4096));
				return i;
			}
			return c
				? (hr(i),
					(T = l.fallback),
					(c = i.mode),
					(M = t.child),
					(V = M.sibling),
					(l = ki(M, { mode: "hidden", children: l.children })),
					(l.subtreeFlags = M.subtreeFlags & 65011712),
					V !== null ? (T = ki(V, T)) : ((T = Pr(T, c, a, null)), (T.flags |= 2)),
					(T.return = i),
					(l.return = i),
					(l.sibling = T),
					(i.child = l),
					Ku(null, l),
					(l = i.child),
					(T = t.child.memoizedState),
					T === null
						? (T = wf(a))
						: ((c = T.cachePool),
							c !== null ? ((M = qt._currentValue), (c = c.parent !== M ? { parent: M, pool: M } : c)) : (c = lv()),
							(T = { baseLanes: T.baseLanes | a, cachePool: c })),
					(l.memoizedState = T),
					(l.childLanes = Ef(t, y, a)),
					(i.memoizedState = Sf),
					Ku(t.child, l))
				: (dr(i),
					(a = t.child),
					(t = a.sibling),
					(a = ki(a, { mode: "visible", children: l.children })),
					(a.return = i),
					(a.sibling = null),
					t !== null && ((y = i.deletions), y === null ? ((i.deletions = [t]), (i.flags |= 16)) : y.push(t)),
					(i.child = a),
					(i.memoizedState = null),
					a);
		}
		function Tf(t, i) {
			return ((i = As({ mode: "visible", children: i }, t.mode)), (i.return = t), (t.child = i));
		}
		function As(t, i) {
			return ((t = On(22, t, null, i)), (t.lanes = 0), t);
		}
		function xf(t, i, a) {
			return (
				Jr(i, t.child, null, a),
				(t = Tf(i, i.pendingProps.children)),
				(t.flags |= 2),
				(i.memoizedState = null),
				t
			);
		}
		function yg(t, i, a) {
			t.lanes |= i;
			var l = t.alternate;
			(l !== null && (l.lanes |= i), $c(t.return, i, a));
		}
		function Af(t, i, a, l, c, d) {
			var y = t.memoizedState;
			y === null
				? (t.memoizedState = {
						isBackwards: i,
						rendering: null,
						renderingStartTime: 0,
						last: l,
						tail: a,
						tailMode: c,
						treeForkCount: d,
					})
				: ((y.isBackwards = i),
					(y.rendering = null),
					(y.renderingStartTime = 0),
					(y.last = l),
					(y.tail = a),
					(y.tailMode = c),
					(y.treeForkCount = d));
		}
		function pg(t, i, a) {
			var l = i.pendingProps,
				c = l.revealOrder,
				d = l.tail;
			l = l.children;
			var y = kt.current,
				T = (y & 2) !== 0;
			if (
				(T ? ((y = (y & 1) | 2), (i.flags |= 128)) : (y &= 1),
				re(kt, y),
				rn(t, i, l, a),
				(l = $e ? ju : 0),
				!T && t !== null && (t.flags & 128) !== 0)
			)
				e: for (t = i.child; t !== null; ) {
					if (t.tag === 13) t.memoizedState !== null && yg(t, a, i);
					else if (t.tag === 19) yg(t, a, i);
					else if (t.child !== null) {
						((t.child.return = t), (t = t.child));
						continue;
					}
					if (t === i) break e;
					for (; t.sibling === null; ) {
						if (t.return === null || t.return === i) break e;
						t = t.return;
					}
					((t.sibling.return = t.return), (t = t.sibling));
				}
			switch (c) {
				case "forwards":
					for (a = i.child, c = null; a !== null; )
						((t = a.alternate), t !== null && ms(t) === null && (c = a), (a = a.sibling));
					((a = c),
						a === null ? ((c = i.child), (i.child = null)) : ((c = a.sibling), (a.sibling = null)),
						Af(i, !1, c, a, d, l));
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (a = null, c = i.child, i.child = null; c !== null; ) {
						if (((t = c.alternate), t !== null && ms(t) === null)) {
							i.child = c;
							break;
						}
						((t = c.sibling), (c.sibling = a), (a = c), (c = t));
					}
					Af(i, !0, a, null, d, l);
					break;
				case "together":
					Af(i, !1, null, null, void 0, l);
					break;
				default:
					i.memoizedState = null;
			}
			return i.child;
		}
		function qi(t, i, a) {
			if ((t !== null && (i.dependencies = t.dependencies), (gr |= i.lanes), (a & i.childLanes) === 0))
				if (t !== null) {
					if ((Da(t, i, a, !1), (a & i.childLanes) === 0)) return null;
				} else return null;
			if (t !== null && i.child !== t.child) throw Error(s(153));
			if (i.child !== null) {
				for (t = i.child, a = ki(t, t.pendingProps), i.child = a, a.return = i; t.sibling !== null; )
					((t = t.sibling), (a = a.sibling = ki(t, t.pendingProps)), (a.return = i));
				a.sibling = null;
			}
			return i.child;
		}
		function Cf(t, i) {
			return (t.lanes & i) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && us(t)));
		}
		function JS(t, i, a) {
			switch (i.tag) {
				case 3:
					(Je(i, i.stateNode.containerInfo), cr(i, qt, t.memoizedState.cache), Qr());
					break;
				case 27:
				case 5:
					Ke(i);
					break;
				case 4:
					Je(i, i.stateNode.containerInfo);
					break;
				case 10:
					cr(i, i.type, i.memoizedProps.value);
					break;
				case 31:
					if (i.memoizedState !== null) return ((i.flags |= 128), Xc(i), null);
					break;
				case 13:
					var l = i.memoizedState;
					if (l !== null)
						return l.dehydrated !== null
							? (dr(i), (i.flags |= 128), null)
							: (a & i.child.childLanes) !== 0
								? gg(t, i, a)
								: (dr(i), (t = qi(t, i, a)), t !== null ? t.sibling : null);
					dr(i);
					break;
				case 19:
					var c = (t.flags & 128) !== 0;
					if (((l = (a & i.childLanes) !== 0), l || (Da(t, i, a, !1), (l = (a & i.childLanes) !== 0)), c)) {
						if (l) return pg(t, i, a);
						i.flags |= 128;
					}
					if (
						((c = i.memoizedState),
						c !== null && ((c.rendering = null), (c.tail = null), (c.lastEffect = null)),
						re(kt, kt.current),
						l)
					)
						break;
					return null;
				case 22:
					return ((i.lanes = 0), cg(t, i, a, i.pendingProps));
				case 24:
					cr(i, qt, t.memoizedState.cache);
			}
			return qi(t, i, a);
		}
		function bg(t, i, a) {
			if (t !== null)
				if (t.memoizedProps !== i.pendingProps) $t = !0;
				else {
					if (!Cf(t, a) && (i.flags & 128) === 0) return (($t = !1), JS(t, i, a));
					$t = (t.flags & 131072) !== 0;
				}
			else (($t = !1), $e && (i.flags & 1048576) !== 0 && ev(i, ju, i.index));
			switch (((i.lanes = 0), i.tag)) {
				case 16:
					e: {
						var l = i.pendingProps;
						if (((t = Fr(i.elementType)), (i.type = t), typeof t == "function"))
							kc(t)
								? ((l = na(t, l)), (i.tag = 1), (i = mg(null, i, t, l, a)))
								: ((i.tag = 0), (i = _f(null, i, t, l, a)));
						else {
							if (t != null) {
								var c = t.$$typeof;
								if (c === k) {
									((i.tag = 11), (i = lg(null, i, t, l, a)));
									break e;
								} else if (c === j) {
									((i.tag = 14), (i = sg(null, i, t, l, a)));
									break e;
								}
							}
							throw ((i = ae(t) || t), Error(s(306, i, "")));
						}
					}
					return i;
				case 0:
					return _f(t, i, i.type, i.pendingProps, a);
				case 1:
					return ((l = i.type), (c = na(l, i.pendingProps)), mg(t, i, l, c, a));
				case 3:
					e: {
						if ((Je(i, i.stateNode.containerInfo), t === null)) throw Error(s(387));
						l = i.pendingProps;
						var d = i.memoizedState;
						((c = d.element), Qc(t, i), Zu(i, l, null, a));
						var y = i.memoizedState;
						if (
							((l = y.cache), cr(i, qt, l), l !== d.cache && Bc(i, [qt], a, !0), Vu(), (l = y.element), d.isDehydrated)
						)
							if (
								((d = { element: l, isDehydrated: !1, cache: y.cache }),
								(i.updateQueue.baseState = d),
								(i.memoizedState = d),
								i.flags & 256)
							) {
								i = vg(t, i, l, a);
								break e;
							} else if (l !== c) {
								((c = Vn(Error(s(424)), i)), Lu(c), (i = vg(t, i, l, a)));
								break e;
							} else {
								switch (((t = i.stateNode.containerInfo), t.nodeType)) {
									case 9:
										t = t.body;
										break;
									default:
										t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
								}
								for (
									dt = Kn(t.firstChild), tn = i, $e = !0, sr = null, Pn = !0, a = hv(i, null, l, a), i.child = a;
									a;
								)
									((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
							}
						else {
							if ((Qr(), l === c)) {
								i = qi(t, i, a);
								break e;
							}
							rn(t, i, l, a);
						}
						i = i.child;
					}
					return i;
				case 26:
					return (
						xs(t, i),
						t === null
							? (a = ky(i.type, null, i.pendingProps, null))
								? (i.memoizedState = a)
								: $e ||
									((a = i.type),
									(t = i.pendingProps),
									(l = Vs(_e.current).createElement(a)),
									(l[Gt] = i),
									(l[Ft] = t),
									an(l, a, t),
									Ie(l),
									(i.stateNode = l))
							: (i.memoizedState = ky(i.type, t.memoizedProps, i.pendingProps, t.memoizedState)),
						null
					);
				case 27:
					return (
						Ke(i),
						t === null &&
							$e &&
							((l = i.stateNode = Ry(i.type, i.pendingProps, _e.current)),
							(tn = i),
							(Pn = !0),
							(c = dt),
							Sr(i.type) ? ((ad = c), (dt = Kn(l.firstChild))) : (dt = c)),
						rn(t, i, i.pendingProps.children, a),
						xs(t, i),
						t === null && (i.flags |= 4194304),
						i.child
					);
				case 5:
					return (
						t === null &&
							$e &&
							((c = l = dt) &&
								((l = Aw(l, i.type, i.pendingProps, Pn)),
								l !== null ? ((i.stateNode = l), (tn = i), (dt = Kn(l.firstChild)), (Pn = !1), (c = !0)) : (c = !1)),
							c || or(i)),
						Ke(i),
						(c = i.type),
						(d = i.pendingProps),
						(y = t !== null ? t.memoizedProps : null),
						(l = d.children),
						ed(c, d) ? (l = null) : y !== null && ed(c, y) && (i.flags |= 32),
						i.memoizedState !== null && ((c = Wc(t, i, BS, null, null, a)), (ol._currentValue = c)),
						xs(t, i),
						rn(t, i, l, a),
						i.child
					);
				case 6:
					return (
						t === null &&
							$e &&
							((t = a = dt) &&
								((a = Cw(a, i.pendingProps, Pn)),
								a !== null ? ((i.stateNode = a), (tn = i), (dt = null), (t = !0)) : (t = !1)),
							t || or(i)),
						null
					);
				case 13:
					return gg(t, i, a);
				case 4:
					return (
						Je(i, i.stateNode.containerInfo),
						(l = i.pendingProps),
						t === null ? (i.child = Jr(i, null, l, a)) : rn(t, i, l, a),
						i.child
					);
				case 11:
					return lg(t, i, i.type, i.pendingProps, a);
				case 7:
					return (rn(t, i, i.pendingProps, a), i.child);
				case 8:
					return (rn(t, i, i.pendingProps.children, a), i.child);
				case 12:
					return (rn(t, i, i.pendingProps.children, a), i.child);
				case 10:
					return ((l = i.pendingProps), cr(i, i.type, l.value), rn(t, i, l.children, a), i.child);
				case 9:
					return (
						(c = i.type._context),
						(l = i.pendingProps.children),
						Kr(i),
						(c = nn(c)),
						(l = l(c)),
						(i.flags |= 1),
						rn(t, i, l, a),
						i.child
					);
				case 14:
					return sg(t, i, i.type, i.pendingProps, a);
				case 15:
					return og(t, i, i.type, i.pendingProps, a);
				case 19:
					return pg(t, i, a);
				case 31:
					return XS(t, i, a);
				case 22:
					return cg(t, i, a, i.pendingProps);
				case 24:
					return (
						Kr(i),
						(l = nn(qt)),
						t === null
							? ((c = Zc()),
								c === null &&
									((c = lt),
									(d = Ic()),
									(c.pooledCache = d),
									d.refCount++,
									d !== null && (c.pooledCacheLanes |= a),
									(c = d)),
								(i.memoizedState = { parent: l, cache: c }),
								Pc(i),
								cr(i, qt, c))
							: ((t.lanes & a) !== 0 && (Qc(t, i), Zu(i, null, null, a), Vu()),
								(c = t.memoizedState),
								(d = i.memoizedState),
								c.parent !== l
									? ((c = { parent: l, cache: l }),
										(i.memoizedState = c),
										i.lanes === 0 && (i.memoizedState = i.updateQueue.baseState = c),
										cr(i, qt, l))
									: ((l = d.cache), cr(i, qt, l), l !== c.cache && Bc(i, [qt], a, !0))),
						rn(t, i, i.pendingProps.children, a),
						i.child
					);
				case 29:
					throw i.pendingProps;
			}
			throw Error(s(156, i.tag));
		}
		function Ui(t) {
			t.flags |= 4;
		}
		function Rf(t, i, a, l, c) {
			if (((i = (t.mode & 32) !== 0) && (i = !1), i)) {
				if (((t.flags |= 16777216), (c & 335544128) === c))
					if (t.stateNode.complete) t.flags |= 8192;
					else if (Qg()) t.flags |= 8192;
					else throw ((Xr = cs), Hc);
			} else t.flags &= -16777217;
		}
		function _g(t, i) {
			if (i.type !== "stylesheet" || (i.state.loading & 4) !== 0) t.flags &= -16777217;
			else if (((t.flags |= 16777216), !Ly(i)))
				if (Qg()) t.flags |= 8192;
				else throw ((Xr = cs), Hc);
		}
		function Cs(t, i) {
			(i !== null && (t.flags |= 4),
				t.flags & 16384 && ((i = t.tag !== 22 ? Ae() : 536870912), (t.lanes |= i), (Qa |= i)));
		}
		function Gu(t, i) {
			if (!$e)
				switch (t.tailMode) {
					case "hidden":
						i = t.tail;
						for (var a = null; i !== null; ) (i.alternate !== null && (a = i), (i = i.sibling));
						a === null ? (t.tail = null) : (a.sibling = null);
						break;
					case "collapsed":
						a = t.tail;
						for (var l = null; a !== null; ) (a.alternate !== null && (l = a), (a = a.sibling));
						l === null ? (i || t.tail === null ? (t.tail = null) : (t.tail.sibling = null)) : (l.sibling = null);
				}
		}
		function ht(t) {
			var i = t.alternate !== null && t.alternate.child === t.child,
				a = 0,
				l = 0;
			if (i)
				for (var c = t.child; c !== null; )
					((a |= c.lanes | c.childLanes),
						(l |= c.subtreeFlags & 65011712),
						(l |= c.flags & 65011712),
						(c.return = t),
						(c = c.sibling));
			else
				for (c = t.child; c !== null; )
					((a |= c.lanes | c.childLanes), (l |= c.subtreeFlags), (l |= c.flags), (c.return = t), (c = c.sibling));
			return ((t.subtreeFlags |= l), (t.childLanes = a), i);
		}
		function WS(t, i, a) {
			var l = i.pendingProps;
			switch ((jc(i), i.tag)) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14:
					return (ht(i), null);
				case 1:
					return (ht(i), null);
				case 3:
					return (
						(a = i.stateNode),
						(l = null),
						t !== null && (l = t.memoizedState.cache),
						i.memoizedState.cache !== l && (i.flags |= 2048),
						Di(qt),
						De(),
						a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
						(t === null || t.child === null) &&
							(za(i)
								? Ui(i)
								: t === null || (t.memoizedState.isDehydrated && (i.flags & 256) === 0) || ((i.flags |= 1024), qc())),
						ht(i),
						null
					);
				case 26:
					var c = i.type,
						d = i.memoizedState;
					return (
						t === null
							? (Ui(i), d !== null ? (ht(i), _g(i, d)) : (ht(i), Rf(i, c, null, l, a)))
							: d
								? d !== t.memoizedState
									? (Ui(i), ht(i), _g(i, d))
									: (ht(i), (i.flags &= -16777217))
								: ((t = t.memoizedProps), t !== l && Ui(i), ht(i), Rf(i, c, t, l, a)),
						null
					);
				case 27:
					if ((xt(i), (a = _e.current), (c = i.type), t !== null && i.stateNode != null))
						t.memoizedProps !== l && Ui(i);
					else {
						if (!l) {
							if (i.stateNode === null) throw Error(s(166));
							return (ht(i), null);
						}
						((t = de.current), za(i) ? nv(i, t) : ((t = Ry(c, l, a)), (i.stateNode = t), Ui(i)));
					}
					return (ht(i), null);
				case 5:
					if ((xt(i), (c = i.type), t !== null && i.stateNode != null)) t.memoizedProps !== l && Ui(i);
					else {
						if (!l) {
							if (i.stateNode === null) throw Error(s(166));
							return (ht(i), null);
						}
						if (((d = de.current), za(i))) nv(i, d);
						else {
							var y = Vs(_e.current);
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
							((d[Gt] = i), (d[Ft] = l));
							e: for (y = i.child; y !== null; ) {
								if (y.tag === 5 || y.tag === 6) d.appendChild(y.stateNode);
								else if (y.tag !== 4 && y.tag !== 27 && y.child !== null) {
									((y.child.return = y), (y = y.child));
									continue;
								}
								if (y === i) break e;
								for (; y.sibling === null; ) {
									if (y.return === null || y.return === i) break e;
									y = y.return;
								}
								((y.sibling.return = y.return), (y = y.sibling));
							}
							i.stateNode = d;
							e: switch ((an(d, c, l), c)) {
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
							l && Ui(i);
						}
					}
					return (ht(i), Rf(i, i.type, t === null ? null : t.memoizedProps, i.pendingProps, a), null);
				case 6:
					if (t && i.stateNode != null) t.memoizedProps !== l && Ui(i);
					else {
						if (typeof l != "string" && i.stateNode === null) throw Error(s(166));
						if (((t = _e.current), za(i))) {
							if (((t = i.stateNode), (a = i.memoizedProps), (l = null), (c = tn), c !== null))
								switch (c.tag) {
									case 27:
									case 5:
										l = c.memoizedProps;
								}
							((t[Gt] = i),
								(t = !!(t.nodeValue === a || (l !== null && l.suppressHydrationWarning === !0) || yy(t.nodeValue, a))),
								t || or(i, !0));
						} else ((t = Vs(t).createTextNode(l)), (t[Gt] = i), (i.stateNode = t));
					}
					return (ht(i), null);
				case 31:
					if (((a = i.memoizedState), t === null || t.memoizedState !== null)) {
						if (((l = za(i)), a !== null)) {
							if (t === null) {
								if (!l) throw Error(s(318));
								if (((t = i.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(557));
								t[Gt] = i;
							} else (Qr(), (i.flags & 128) === 0 && (i.memoizedState = null), (i.flags |= 4));
							(ht(i), (t = !1));
						} else
							((a = qc()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), (t = !0));
						if (!t) return i.flags & 256 ? (kn(i), i) : (kn(i), null);
						if ((i.flags & 128) !== 0) throw Error(s(558));
					}
					return (ht(i), null);
				case 13:
					if (
						((l = i.memoizedState), t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
					) {
						if (((c = za(i)), l !== null && l.dehydrated !== null)) {
							if (t === null) {
								if (!c) throw Error(s(318));
								if (((c = i.memoizedState), (c = c !== null ? c.dehydrated : null), !c)) throw Error(s(317));
								c[Gt] = i;
							} else (Qr(), (i.flags & 128) === 0 && (i.memoizedState = null), (i.flags |= 4));
							(ht(i), (c = !1));
						} else
							((c = qc()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = c), (c = !0));
						if (!c) return i.flags & 256 ? (kn(i), i) : (kn(i), null);
					}
					return (
						kn(i),
						(i.flags & 128) !== 0
							? ((i.lanes = a), i)
							: ((a = l !== null),
								(t = t !== null && t.memoizedState !== null),
								a &&
									((l = i.child),
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
								a !== t && a && (i.child.flags |= 8192),
								Cs(i, i.updateQueue),
								ht(i),
								null)
					);
				case 4:
					return (De(), t === null && hy(i.stateNode.containerInfo), ht(i), null);
				case 10:
					return (Di(i.type), ht(i), null);
				case 19:
					if ((X(kt), (l = i.memoizedState), l === null)) return (ht(i), null);
					if (((c = (i.flags & 128) !== 0), (d = l.rendering), d === null))
						if (c) Gu(l, !1);
						else {
							if (Nt !== 0 || (t !== null && (t.flags & 128) !== 0))
								for (t = i.child; t !== null; ) {
									if (((d = ms(t)), d !== null)) {
										for (
											i.flags |= 128,
												Gu(l, !1),
												t = d.updateQueue,
												i.updateQueue = t,
												Cs(i, t),
												i.subtreeFlags = 0,
												t = a,
												a = i.child;
											a !== null;
										)
											(Xm(a, t), (a = a.sibling));
										return (re(kt, (kt.current & 1) | 2), $e && Mi(i, l.treeForkCount), i.child);
									}
									t = t.sibling;
								}
							l.tail !== null && Oe() > Ms && ((i.flags |= 128), (c = !0), Gu(l, !1), (i.lanes = 4194304));
						}
					else {
						if (!c)
							if (((t = ms(d)), t !== null)) {
								if (
									((i.flags |= 128),
									(c = !0),
									(t = t.updateQueue),
									(i.updateQueue = t),
									Cs(i, t),
									Gu(l, !0),
									l.tail === null && l.tailMode === "hidden" && !d.alternate && !$e)
								)
									return (ht(i), null);
							} else
								2 * Oe() - l.renderingStartTime > Ms &&
									a !== 536870912 &&
									((i.flags |= 128), (c = !0), Gu(l, !1), (i.lanes = 4194304));
						l.isBackwards
							? ((d.sibling = i.child), (i.child = d))
							: ((t = l.last), t !== null ? (t.sibling = d) : (i.child = d), (l.last = d));
					}
					return l.tail !== null
						? ((t = l.tail),
							(l.rendering = t),
							(l.tail = t.sibling),
							(l.renderingStartTime = Oe()),
							(t.sibling = null),
							(a = kt.current),
							re(kt, c ? (a & 1) | 2 : a & 1),
							$e && Mi(i, l.treeForkCount),
							t)
						: (ht(i), null);
				case 22:
				case 23:
					return (
						kn(i),
						Fc(),
						(l = i.memoizedState !== null),
						t !== null ? (t.memoizedState !== null) !== l && (i.flags |= 8192) : l && (i.flags |= 8192),
						l
							? (a & 536870912) !== 0 && (i.flags & 128) === 0 && (ht(i), i.subtreeFlags & 6 && (i.flags |= 8192))
							: ht(i),
						(a = i.updateQueue),
						a !== null && Cs(i, a.retryQueue),
						(a = null),
						t !== null &&
							t.memoizedState !== null &&
							t.memoizedState.cachePool !== null &&
							(a = t.memoizedState.cachePool.pool),
						(l = null),
						i.memoizedState !== null && i.memoizedState.cachePool !== null && (l = i.memoizedState.cachePool.pool),
						l !== a && (i.flags |= 2048),
						t !== null && X(Gr),
						null
					);
				case 24:
					return (
						(a = null),
						t !== null && (a = t.memoizedState.cache),
						i.memoizedState.cache !== a && (i.flags |= 2048),
						Di(qt),
						ht(i),
						null
					);
				case 25:
					return null;
				case 30:
					return null;
			}
			throw Error(s(156, i.tag));
		}
		function ew(t, i) {
			switch ((jc(i), i.tag)) {
				case 1:
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 3:
					return (
						Di(qt),
						De(),
						(t = i.flags),
						(t & 65536) !== 0 && (t & 128) === 0 ? ((i.flags = (t & -65537) | 128), i) : null
					);
				case 26:
				case 27:
				case 5:
					return (xt(i), null);
				case 31:
					if (i.memoizedState !== null) {
						if ((kn(i), i.alternate === null)) throw Error(s(340));
						Qr();
					}
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 13:
					if ((kn(i), (t = i.memoizedState), t !== null && t.dehydrated !== null)) {
						if (i.alternate === null) throw Error(s(340));
						Qr();
					}
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 19:
					return (X(kt), null);
				case 4:
					return (De(), null);
				case 10:
					return (Di(i.type), null);
				case 22:
				case 23:
					return (
						kn(i),
						Fc(),
						t !== null && X(Gr),
						(t = i.flags),
						t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null
					);
				case 24:
					return (Di(qt), null);
				case 25:
					return null;
				default:
					return null;
			}
		}
		function Sg(t, i) {
			switch ((jc(i), i.tag)) {
				case 3:
					(Di(qt), De());
					break;
				case 26:
				case 27:
				case 5:
					xt(i);
					break;
				case 4:
					De();
					break;
				case 31:
					i.memoizedState !== null && kn(i);
					break;
				case 13:
					kn(i);
					break;
				case 19:
					X(kt);
					break;
				case 10:
					Di(i.type);
					break;
				case 22:
				case 23:
					(kn(i), Fc(), t !== null && X(Gr));
					break;
				case 24:
					Di(qt);
			}
		}
		function Fu(t, i) {
			try {
				var a = i.updateQueue,
					l = a !== null ? a.lastEffect : null;
				if (l !== null) {
					var c = l.next;
					a = c;
					do {
						if ((a.tag & t) === t) {
							l = void 0;
							var d = a.create,
								y = a.inst;
							((l = d()), (y.destroy = l));
						}
						a = a.next;
					} while (a !== c);
				}
			} catch (T) {
				tt(i, i.return, T);
			}
		}
		function mr(t, i, a) {
			try {
				var l = i.updateQueue,
					c = l !== null ? l.lastEffect : null;
				if (c !== null) {
					var d = c.next;
					l = d;
					do {
						if ((l.tag & t) === t) {
							var y = l.inst,
								T = y.destroy;
							if (T !== void 0) {
								((y.destroy = void 0), (c = i));
								var M = a,
									V = T;
								try {
									V();
								} catch (J) {
									tt(c, M, J);
								}
							}
						}
						l = l.next;
					} while (l !== d);
				}
			} catch (J) {
				tt(i, i.return, J);
			}
		}
		function wg(t) {
			var i = t.updateQueue;
			if (i !== null) {
				var a = t.stateNode;
				try {
					vv(i, a);
				} catch (l) {
					tt(t, t.return, l);
				}
			}
		}
		function Eg(t, i, a) {
			((a.props = na(t.type, t.memoizedProps)), (a.state = t.memoizedState));
			try {
				a.componentWillUnmount();
			} catch (l) {
				tt(t, i, l);
			}
		}
		function Xu(t, i) {
			try {
				var a = t.ref;
				if (a !== null) {
					switch (t.tag) {
						case 26:
						case 27:
						case 5:
							var l = t.stateNode;
							break;
						case 30:
							l = t.stateNode;
							break;
						default:
							l = t.stateNode;
					}
					typeof a == "function" ? (t.refCleanup = a(l)) : (a.current = l);
				}
			} catch (c) {
				tt(t, i, c);
			}
		}
		function yi(t, i) {
			var a = t.ref,
				l = t.refCleanup;
			if (a !== null)
				if (typeof l == "function")
					try {
						l();
					} catch (c) {
						tt(t, i, c);
					} finally {
						((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
					}
				else if (typeof a == "function")
					try {
						a(null);
					} catch (c) {
						tt(t, i, c);
					}
				else a.current = null;
		}
		function Tg(t) {
			var i = t.type,
				a = t.memoizedProps,
				l = t.stateNode;
			try {
				e: switch (i) {
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
				tt(t, t.return, c);
			}
		}
		function Of(t, i, a) {
			try {
				var l = t.stateNode;
				(_w(l, t.type, a, i), (l[Ft] = i));
			} catch (c) {
				tt(t, t.return, c);
			}
		}
		function xg(t) {
			return t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && Sr(t.type)) || t.tag === 4;
		}
		function Nf(t) {
			e: for (;;) {
				for (; t.sibling === null; ) {
					if (t.return === null || xg(t.return)) return null;
					t = t.return;
				}
				for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
					if ((t.tag === 27 && Sr(t.type)) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
					((t.child.return = t), (t = t.child));
				}
				if (!(t.flags & 2)) return t.stateNode;
			}
		}
		function kf(t, i, a) {
			var l = t.tag;
			if (l === 5 || l === 6)
				((t = t.stateNode),
					i
						? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(t, i)
						: ((i = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a),
							i.appendChild(t),
							(a = a._reactRootContainer),
							a != null || i.onclick !== null || (i.onclick = Oi)));
			else if (l !== 4 && (l === 27 && Sr(t.type) && ((a = t.stateNode), (i = null)), (t = t.child), t !== null))
				for (kf(t, i, a), t = t.sibling; t !== null; ) (kf(t, i, a), (t = t.sibling));
		}
		function Rs(t, i, a) {
			var l = t.tag;
			if (l === 5 || l === 6) ((t = t.stateNode), i ? a.insertBefore(t, i) : a.appendChild(t));
			else if (l !== 4 && (l === 27 && Sr(t.type) && (a = t.stateNode), (t = t.child), t !== null))
				for (Rs(t, i, a), t = t.sibling; t !== null; ) (Rs(t, i, a), (t = t.sibling));
		}
		function Ag(t) {
			var i = t.stateNode,
				a = t.memoizedProps;
			try {
				for (var l = t.type, c = i.attributes; c.length; ) i.removeAttributeNode(c[0]);
				(an(i, l, a), (i[Gt] = t), (i[Ft] = a));
			} catch (d) {
				tt(t, t.return, d);
			}
		}
		var $i = !1,
			Bt = !1,
			Mf = !1,
			Cg = typeof WeakSet == "function" ? WeakSet : Set,
			Jt = null;
		function tw(t, i) {
			if (((t = t.containerInfo), (Jf = Gs), (t = Vm(t)), Tc(t))) {
				if ("selectionStart" in t) var a = { start: t.selectionStart, end: t.selectionEnd };
				else
					e: {
						a = ((a = t.ownerDocument) && a.defaultView) || window;
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
								M = -1,
								V = 0,
								J = 0,
								ie = t,
								Z = null;
							t: for (;;) {
								for (
									var K;
									ie !== a || (c !== 0 && ie.nodeType !== 3) || (T = y + c),
										ie !== d || (l !== 0 && ie.nodeType !== 3) || (M = y + l),
										ie.nodeType === 3 && (y += ie.nodeValue.length),
										(K = ie.firstChild) !== null;
								)
									((Z = ie), (ie = K));
								for (;;) {
									if (ie === t) break t;
									if ((Z === a && ++V === c && (T = y), Z === d && ++J === l && (M = y), (K = ie.nextSibling) !== null))
										break;
									((ie = Z), (Z = ie.parentNode));
								}
								ie = K;
							}
							a = T === -1 || M === -1 ? null : { start: T, end: M };
						} else a = null;
					}
				a = a || { start: 0, end: 0 };
			} else a = null;
			for (Wf = { focusedElem: t, selectionRange: a }, Gs = !1, Jt = i; Jt !== null; )
				if (((i = Jt), (t = i.child), (i.subtreeFlags & 1028) !== 0 && t !== null)) ((t.return = i), (Jt = t));
				else
					for (; Jt !== null; ) {
						switch (((i = Jt), (d = i.alternate), (t = i.flags), i.tag)) {
							case 0:
								if ((t & 4) !== 0 && ((t = i.updateQueue), (t = t !== null ? t.events : null), t !== null))
									for (a = 0; a < t.length; a++) ((c = t[a]), (c.ref.impl = c.nextImpl));
								break;
							case 11:
							case 15:
								break;
							case 1:
								if ((t & 1024) !== 0 && d !== null) {
									((t = void 0), (a = i), (c = d.memoizedProps), (d = d.memoizedState), (l = a.stateNode));
									try {
										var he = na(a.type, c);
										((t = l.getSnapshotBeforeUpdate(he, d)), (l.__reactInternalSnapshotBeforeUpdate = t));
									} catch (Te) {
										tt(a, a.return, Te);
									}
								}
								break;
							case 3:
								if ((t & 1024) !== 0) {
									if (((t = i.stateNode.containerInfo), (a = t.nodeType), a === 9)) nd(t);
									else if (a === 1)
										switch (t.nodeName) {
											case "HEAD":
											case "HTML":
											case "BODY":
												nd(t);
												break;
											default:
												t.textContent = "";
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
								if ((t & 1024) !== 0) throw Error(s(163));
						}
						if (((t = i.sibling), t !== null)) {
							((t.return = i.return), (Jt = t));
							break;
						}
						Jt = i.return;
					}
		}
		function Rg(t, i, a) {
			var l = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					(Ii(t, a), l & 4 && Fu(5, a));
					break;
				case 1:
					if ((Ii(t, a), l & 4))
						if (((t = a.stateNode), i === null))
							try {
								t.componentDidMount();
							} catch (y) {
								tt(a, a.return, y);
							}
						else {
							var c = na(a.type, i.memoizedProps);
							i = i.memoizedState;
							try {
								t.componentDidUpdate(c, i, t.__reactInternalSnapshotBeforeUpdate);
							} catch (y) {
								tt(a, a.return, y);
							}
						}
					(l & 64 && wg(a), l & 512 && Xu(a, a.return));
					break;
				case 3:
					if ((Ii(t, a), l & 64 && ((t = a.updateQueue), t !== null))) {
						if (((i = null), a.child !== null))
							switch (a.child.tag) {
								case 27:
								case 5:
									i = a.child.stateNode;
									break;
								case 1:
									i = a.child.stateNode;
							}
						try {
							vv(t, i);
						} catch (y) {
							tt(a, a.return, y);
						}
					}
					break;
				case 27:
					i === null && l & 4 && Ag(a);
				case 26:
				case 5:
					(Ii(t, a), i === null && l & 4 && Tg(a), l & 512 && Xu(a, a.return));
					break;
				case 12:
					Ii(t, a);
					break;
				case 31:
					(Ii(t, a), l & 4 && kg(t, a));
					break;
				case 13:
					(Ii(t, a),
						l & 4 && Mg(t, a),
						l & 64 &&
							((t = a.memoizedState),
							t !== null && ((t = t.dehydrated), t !== null && ((a = cw.bind(null, a)), Rw(t, a)))));
					break;
				case 22:
					if (((l = a.memoizedState !== null || $i), !l)) {
						((i = (i !== null && i.memoizedState !== null) || Bt), (c = $i));
						var d = Bt;
						(($i = l), (Bt = i) && !d ? Vi(t, a, (a.subtreeFlags & 8772) !== 0) : Ii(t, a), ($i = c), (Bt = d));
					}
					break;
				case 30:
					break;
				default:
					Ii(t, a);
			}
		}
		function Og(t) {
			var i = t.alternate;
			(i !== null && ((t.alternate = null), Og(i)),
				(t.child = null),
				(t.deletions = null),
				(t.sibling = null),
				t.tag === 5 && ((i = t.stateNode), i !== null && We(i)),
				(t.stateNode = null),
				(t.return = null),
				(t.dependencies = null),
				(t.memoizedProps = null),
				(t.memoizedState = null),
				(t.pendingProps = null),
				(t.stateNode = null),
				(t.updateQueue = null));
		}
		var gt = null,
			pn = !1;
		function Bi(t, i, a) {
			for (a = a.child; a !== null; ) (Ng(t, i, a), (a = a.sibling));
		}
		function Ng(t, i, a) {
			if (Wt && typeof Wt.onCommitFiberUnmount == "function")
				try {
					Wt.onCommitFiberUnmount(vn, a);
				} catch {}
			switch (a.tag) {
				case 26:
					(Bt || yi(a, i),
						Bi(t, i, a),
						a.memoizedState
							? a.memoizedState.count--
							: a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
					break;
				case 27:
					Bt || yi(a, i);
					var l = gt,
						c = pn;
					(Sr(a.type) && ((gt = a.stateNode), (pn = !1)), Bi(t, i, a), ul(a.stateNode), (gt = l), (pn = c));
					break;
				case 5:
					Bt || yi(a, i);
				case 6:
					if (((l = gt), (c = pn), (gt = null), Bi(t, i, a), (gt = l), (pn = c), gt !== null))
						if (pn)
							try {
								(gt.nodeType === 9 ? gt.body : gt.nodeName === "HTML" ? gt.ownerDocument.body : gt).removeChild(
									a.stateNode,
								);
							} catch (d) {
								tt(a, i, d);
							}
						else
							try {
								gt.removeChild(a.stateNode);
							} catch (d) {
								tt(a, i, d);
							}
					break;
				case 18:
					gt !== null &&
						(pn
							? ((t = gt),
								Ey(t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, a.stateNode),
								eu(t))
							: Ey(gt, a.stateNode));
					break;
				case 4:
					((l = gt), (c = pn), (gt = a.stateNode.containerInfo), (pn = !0), Bi(t, i, a), (gt = l), (pn = c));
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					(mr(2, a, i), Bt || mr(4, a, i), Bi(t, i, a));
					break;
				case 1:
					(Bt || (yi(a, i), (l = a.stateNode), typeof l.componentWillUnmount == "function" && Eg(a, i, l)),
						Bi(t, i, a));
					break;
				case 21:
					Bi(t, i, a);
					break;
				case 22:
					((Bt = (l = Bt) || a.memoizedState !== null), Bi(t, i, a), (Bt = l));
					break;
				default:
					Bi(t, i, a);
			}
		}
		function kg(t, i) {
			if (i.memoizedState === null && ((t = i.alternate), t !== null && ((t = t.memoizedState), t !== null))) {
				t = t.dehydrated;
				try {
					eu(t);
				} catch (a) {
					tt(i, i.return, a);
				}
			}
		}
		function Mg(t, i) {
			if (
				i.memoizedState === null &&
				((t = i.alternate), t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
			)
				try {
					eu(t);
				} catch (a) {
					tt(i, i.return, a);
				}
		}
		function nw(t) {
			switch (t.tag) {
				case 31:
				case 13:
				case 19:
					var i = t.stateNode;
					return (i === null && (i = t.stateNode = new Cg()), i);
				case 22:
					return ((t = t.stateNode), (i = t._retryCache), i === null && (i = t._retryCache = new Cg()), i);
				default:
					throw Error(s(435, t.tag));
			}
		}
		function Os(t, i) {
			var a = nw(t);
			i.forEach(function (l) {
				if (!a.has(l)) {
					a.add(l);
					var c = fw.bind(null, t, l);
					l.then(c, c);
				}
			});
		}
		function bn(t, i) {
			var a = i.deletions;
			if (a !== null)
				for (var l = 0; l < a.length; l++) {
					var c = a[l],
						d = t,
						y = i,
						T = y;
					e: for (; T !== null; ) {
						switch (T.tag) {
							case 27:
								if (Sr(T.type)) {
									((gt = T.stateNode), (pn = !1));
									break e;
								}
								break;
							case 5:
								((gt = T.stateNode), (pn = !1));
								break e;
							case 3:
							case 4:
								((gt = T.stateNode.containerInfo), (pn = !0));
								break e;
						}
						T = T.return;
					}
					if (gt === null) throw Error(s(160));
					(Ng(d, y, c), (gt = null), (pn = !1), (d = c.alternate), d !== null && (d.return = null), (c.return = null));
				}
			if (i.subtreeFlags & 13886) for (i = i.child; i !== null; ) (zg(i, t), (i = i.sibling));
		}
		var ri = null;
		function zg(t, i) {
			var a = t.alternate,
				l = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					(bn(i, t), _n(t), l & 4 && (mr(3, t, t.return), Fu(3, t), mr(5, t, t.return)));
					break;
				case 1:
					(bn(i, t),
						_n(t),
						l & 512 && (Bt || a === null || yi(a, a.return)),
						l & 64 &&
							$i &&
							((t = t.updateQueue),
							t !== null &&
								((l = t.callbacks),
								l !== null &&
									((a = t.shared.hiddenCallbacks), (t.shared.hiddenCallbacks = a === null ? l : a.concat(l))))));
					break;
				case 26:
					var c = ri;
					if ((bn(i, t), _n(t), l & 512 && (Bt || a === null || yi(a, a.return)), l & 4)) {
						var d = a !== null ? a.memoizedState : null;
						if (((l = t.memoizedState), a === null))
							if (l === null)
								if (t.stateNode === null) {
									e: {
										((l = t.type), (a = t.memoizedProps), (c = c.ownerDocument || c));
										t: switch (l) {
											case "title":
												((d = c.getElementsByTagName("title")[0]),
													(!d ||
														d[ye] ||
														d[Gt] ||
														d.namespaceURI === "http://www.w3.org/2000/svg" ||
														d.hasAttribute("itemprop")) &&
														((d = c.createElement(l)), c.head.insertBefore(d, c.querySelector("head > title"))),
													an(d, l, a),
													(d[Gt] = t),
													Ie(d),
													(l = d));
												break e;
											case "link":
												var y = Dy("link", "href", c).get(l + (a.href || ""));
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
												((d = c.createElement(l)), an(d, l, a), c.head.appendChild(d));
												break;
											case "meta":
												if ((y = Dy("meta", "content", c).get(l + (a.content || "")))) {
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
												((d = c.createElement(l)), an(d, l, a), c.head.appendChild(d));
												break;
											default:
												throw Error(s(468, l));
										}
										((d[Gt] = t), Ie(d), (l = d));
									}
									t.stateNode = l;
								} else jy(c, t.type, t.stateNode);
							else t.stateNode = zy(c, l, t.memoizedProps);
						else
							d !== l
								? (d === null ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a)) : d.count--,
									l === null ? jy(c, t.type, t.stateNode) : zy(c, l, t.memoizedProps))
								: l === null && t.stateNode !== null && Of(t, t.memoizedProps, a.memoizedProps);
					}
					break;
				case 27:
					(bn(i, t),
						_n(t),
						l & 512 && (Bt || a === null || yi(a, a.return)),
						a !== null && l & 4 && Of(t, t.memoizedProps, a.memoizedProps));
					break;
				case 5:
					if ((bn(i, t), _n(t), l & 512 && (Bt || a === null || yi(a, a.return)), t.flags & 32)) {
						c = t.stateNode;
						try {
							Ea(c, "");
						} catch (he) {
							tt(t, t.return, he);
						}
					}
					(l & 4 && t.stateNode != null && ((c = t.memoizedProps), Of(t, c, a !== null ? a.memoizedProps : c)),
						l & 1024 && (Mf = !0));
					break;
				case 6:
					if ((bn(i, t), _n(t), l & 4)) {
						if (t.stateNode === null) throw Error(s(162));
						((l = t.memoizedProps), (a = t.stateNode));
						try {
							a.nodeValue = l;
						} catch (he) {
							tt(t, t.return, he);
						}
					}
					break;
				case 3:
					if (
						((Ps = null),
						(c = ri),
						(ri = Zs(i.containerInfo)),
						bn(i, t),
						(ri = c),
						_n(t),
						l & 4 && a !== null && a.memoizedState.isDehydrated)
					)
						try {
							eu(i.containerInfo);
						} catch (he) {
							tt(t, t.return, he);
						}
					Mf && ((Mf = !1), Dg(t));
					break;
				case 4:
					((l = ri), (ri = Zs(t.stateNode.containerInfo)), bn(i, t), _n(t), (ri = l));
					break;
				case 12:
					(bn(i, t), _n(t));
					break;
				case 31:
					(bn(i, t), _n(t), l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), Os(t, l))));
					break;
				case 13:
					(bn(i, t),
						_n(t),
						t.child.flags & 8192 &&
							(t.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
							(ks = Oe()),
						l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), Os(t, l))));
					break;
				case 22:
					c = t.memoizedState !== null;
					var M = a !== null && a.memoizedState !== null,
						V = $i,
						J = Bt;
					if ((($i = V || c), (Bt = J || M), bn(i, t), (Bt = J), ($i = V), _n(t), l & 8192))
						e: for (
							i = t.stateNode,
								i._visibility = c ? i._visibility & -2 : i._visibility | 1,
								c && (a === null || M || $i || Bt || ia(t)),
								a = null,
								i = t;
							;
						) {
							if (i.tag === 5 || i.tag === 26) {
								if (a === null) {
									M = a = i;
									try {
										if (((d = M.stateNode), c))
											((y = d.style),
												typeof y.setProperty == "function"
													? y.setProperty("display", "none", "important")
													: (y.display = "none"));
										else {
											T = M.stateNode;
											var ie = M.memoizedProps.style,
												Z = ie != null && ie.hasOwnProperty("display") ? ie.display : null;
											T.style.display = Z == null || typeof Z == "boolean" ? "" : ("" + Z).trim();
										}
									} catch (he) {
										tt(M, M.return, he);
									}
								}
							} else if (i.tag === 6) {
								if (a === null) {
									M = i;
									try {
										M.stateNode.nodeValue = c ? "" : M.memoizedProps;
									} catch (he) {
										tt(M, M.return, he);
									}
								}
							} else if (i.tag === 18) {
								if (a === null) {
									M = i;
									try {
										var K = M.stateNode;
										c ? Ty(K, !0) : Ty(M.stateNode, !1);
									} catch (he) {
										tt(M, M.return, he);
									}
								}
							} else if (((i.tag !== 22 && i.tag !== 23) || i.memoizedState === null || i === t) && i.child !== null) {
								((i.child.return = i), (i = i.child));
								continue;
							}
							if (i === t) break e;
							for (; i.sibling === null; ) {
								if (i.return === null || i.return === t) break e;
								(a === i && (a = null), (i = i.return));
							}
							(a === i && (a = null), (i.sibling.return = i.return), (i = i.sibling));
						}
					l & 4 &&
						((l = t.updateQueue), l !== null && ((a = l.retryQueue), a !== null && ((l.retryQueue = null), Os(t, a))));
					break;
				case 19:
					(bn(i, t), _n(t), l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), Os(t, l))));
					break;
				case 30:
					break;
				case 21:
					break;
				default:
					(bn(i, t), _n(t));
			}
		}
		function _n(t) {
			var i = t.flags;
			if (i & 2) {
				try {
					for (var a, l = t.return; l !== null; ) {
						if (xg(l)) {
							a = l;
							break;
						}
						l = l.return;
					}
					if (a == null) throw Error(s(160));
					switch (a.tag) {
						case 27:
							var c = a.stateNode;
							Rs(t, Nf(t), c);
							break;
						case 5:
							var d = a.stateNode;
							(a.flags & 32 && (Ea(d, ""), (a.flags &= -33)), Rs(t, Nf(t), d));
							break;
						case 3:
						case 4:
							var y = a.stateNode.containerInfo;
							kf(t, Nf(t), y);
							break;
						default:
							throw Error(s(161));
					}
				} catch (T) {
					tt(t, t.return, T);
				}
				t.flags &= -3;
			}
			i & 4096 && (t.flags &= -4097);
		}
		function Dg(t) {
			if (t.subtreeFlags & 1024)
				for (t = t.child; t !== null; ) {
					var i = t;
					(Dg(i), i.tag === 5 && i.flags & 1024 && i.stateNode.reset(), (t = t.sibling));
				}
		}
		function Ii(t, i) {
			if (i.subtreeFlags & 8772) for (i = i.child; i !== null; ) (Rg(t, i.alternate, i), (i = i.sibling));
		}
		function ia(t) {
			for (t = t.child; t !== null; ) {
				var i = t;
				switch (i.tag) {
					case 0:
					case 11:
					case 14:
					case 15:
						(mr(4, i, i.return), ia(i));
						break;
					case 1:
						yi(i, i.return);
						var a = i.stateNode;
						(typeof a.componentWillUnmount == "function" && Eg(i, i.return, a), ia(i));
						break;
					case 27:
						ul(i.stateNode);
					case 26:
					case 5:
						(yi(i, i.return), ia(i));
						break;
					case 22:
						i.memoizedState === null && ia(i);
						break;
					case 30:
						ia(i);
						break;
					default:
						ia(i);
				}
				t = t.sibling;
			}
		}
		function Vi(t, i, a) {
			for (a = a && (i.subtreeFlags & 8772) !== 0, i = i.child; i !== null; ) {
				var l = i.alternate,
					c = t,
					d = i,
					y = d.flags;
				switch (d.tag) {
					case 0:
					case 11:
					case 15:
						(Vi(c, d, a), Fu(4, d));
						break;
					case 1:
						if ((Vi(c, d, a), (l = d), (c = l.stateNode), typeof c.componentDidMount == "function"))
							try {
								c.componentDidMount();
							} catch (V) {
								tt(l, l.return, V);
							}
						if (((l = d), (c = l.updateQueue), c !== null)) {
							var T = l.stateNode;
							try {
								var M = c.shared.hiddenCallbacks;
								if (M !== null) for (c.shared.hiddenCallbacks = null, c = 0; c < M.length; c++) mv(M[c], T);
							} catch (V) {
								tt(l, l.return, V);
							}
						}
						(a && y & 64 && wg(d), Xu(d, d.return));
						break;
					case 27:
						Ag(d);
					case 26:
					case 5:
						(Vi(c, d, a), a && l === null && y & 4 && Tg(d), Xu(d, d.return));
						break;
					case 12:
						Vi(c, d, a);
						break;
					case 31:
						(Vi(c, d, a), a && y & 4 && kg(c, d));
						break;
					case 13:
						(Vi(c, d, a), a && y & 4 && Mg(c, d));
						break;
					case 22:
						(d.memoizedState === null && Vi(c, d, a), Xu(d, d.return));
						break;
					case 30:
						break;
					default:
						Vi(c, d, a);
				}
				i = i.sibling;
			}
		}
		function zf(t, i) {
			var a = null;
			(t !== null &&
				t.memoizedState !== null &&
				t.memoizedState.cachePool !== null &&
				(a = t.memoizedState.cachePool.pool),
				(t = null),
				i.memoizedState !== null && i.memoizedState.cachePool !== null && (t = i.memoizedState.cachePool.pool),
				t !== a && (t != null && t.refCount++, a != null && qu(a)));
		}
		function Df(t, i) {
			((t = null),
				i.alternate !== null && (t = i.alternate.memoizedState.cache),
				(i = i.memoizedState.cache),
				i !== t && (i.refCount++, t != null && qu(t)));
		}
		function ai(t, i, a, l) {
			if (i.subtreeFlags & 10256) for (i = i.child; i !== null; ) (jg(t, i, a, l), (i = i.sibling));
		}
		function jg(t, i, a, l) {
			var c = i.flags;
			switch (i.tag) {
				case 0:
				case 11:
				case 15:
					(ai(t, i, a, l), c & 2048 && Fu(9, i));
					break;
				case 1:
					ai(t, i, a, l);
					break;
				case 3:
					(ai(t, i, a, l),
						c & 2048 &&
							((t = null),
							i.alternate !== null && (t = i.alternate.memoizedState.cache),
							(i = i.memoizedState.cache),
							i !== t && (i.refCount++, t != null && qu(t))));
					break;
				case 12:
					if (c & 2048) {
						(ai(t, i, a, l), (t = i.stateNode));
						try {
							var d = i.memoizedProps,
								y = d.id,
								T = d.onPostCommit;
							typeof T == "function" && T(y, i.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
						} catch (M) {
							tt(i, i.return, M);
						}
					} else ai(t, i, a, l);
					break;
				case 31:
					ai(t, i, a, l);
					break;
				case 13:
					ai(t, i, a, l);
					break;
				case 23:
					break;
				case 22:
					((d = i.stateNode),
						(y = i.alternate),
						i.memoizedState !== null
							? d._visibility & 2
								? ai(t, i, a, l)
								: Ju(t, i)
							: d._visibility & 2
								? ai(t, i, a, l)
								: ((d._visibility |= 2), Za(t, i, a, l, (i.subtreeFlags & 10256) !== 0 || !1)),
						c & 2048 && zf(y, i));
					break;
				case 24:
					(ai(t, i, a, l), c & 2048 && Df(i.alternate, i));
					break;
				default:
					ai(t, i, a, l);
			}
		}
		function Za(t, i, a, l, c) {
			for (c = c && ((i.subtreeFlags & 10256) !== 0 || !1), i = i.child; i !== null; ) {
				var d = t,
					y = i,
					T = a,
					M = l,
					V = y.flags;
				switch (y.tag) {
					case 0:
					case 11:
					case 15:
						(Za(d, y, T, M, c), Fu(8, y));
						break;
					case 23:
						break;
					case 22:
						var J = y.stateNode;
						(y.memoizedState !== null
							? J._visibility & 2
								? Za(d, y, T, M, c)
								: Ju(d, y)
							: ((J._visibility |= 2), Za(d, y, T, M, c)),
							c && V & 2048 && zf(y.alternate, y));
						break;
					case 24:
						(Za(d, y, T, M, c), c && V & 2048 && Df(y.alternate, y));
						break;
					default:
						Za(d, y, T, M, c);
				}
				i = i.sibling;
			}
		}
		function Ju(t, i) {
			if (i.subtreeFlags & 10256)
				for (i = i.child; i !== null; ) {
					var a = t,
						l = i,
						c = l.flags;
					switch (l.tag) {
						case 22:
							(Ju(a, l), c & 2048 && zf(l.alternate, l));
							break;
						case 24:
							(Ju(a, l), c & 2048 && Df(l.alternate, l));
							break;
						default:
							Ju(a, l);
					}
					i = i.sibling;
				}
		}
		var Wu = 8192;
		function Ha(t, i, a) {
			if (t.subtreeFlags & Wu) for (t = t.child; t !== null; ) (Lg(t, i, a), (t = t.sibling));
		}
		function Lg(t, i, a) {
			switch (t.tag) {
				case 26:
					(Ha(t, i, a), t.flags & Wu && t.memoizedState !== null && Bw(a, ri, t.memoizedState, t.memoizedProps));
					break;
				case 5:
					Ha(t, i, a);
					break;
				case 3:
				case 4:
					var l = ri;
					((ri = Zs(t.stateNode.containerInfo)), Ha(t, i, a), (ri = l));
					break;
				case 22:
					t.memoizedState === null &&
						((l = t.alternate),
						l !== null && l.memoizedState !== null ? ((l = Wu), (Wu = 16777216), Ha(t, i, a), (Wu = l)) : Ha(t, i, a));
					break;
				default:
					Ha(t, i, a);
			}
		}
		function qg(t) {
			var i = t.alternate;
			if (i !== null && ((t = i.child), t !== null)) {
				i.child = null;
				do ((i = t.sibling), (t.sibling = null), (t = i));
				while (t !== null);
			}
		}
		function el(t) {
			var i = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (i !== null)
					for (var a = 0; a < i.length; a++) {
						var l = i[a];
						((Jt = l), $g(l, t));
					}
				qg(t);
			}
			if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (Ug(t), (t = t.sibling));
		}
		function Ug(t) {
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(el(t), t.flags & 2048 && mr(9, t, t.return));
					break;
				case 3:
					el(t);
					break;
				case 12:
					el(t);
					break;
				case 22:
					var i = t.stateNode;
					t.memoizedState !== null && i._visibility & 2 && (t.return === null || t.return.tag !== 13)
						? ((i._visibility &= -3), Ns(t))
						: el(t);
					break;
				default:
					el(t);
			}
		}
		function Ns(t) {
			var i = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (i !== null)
					for (var a = 0; a < i.length; a++) {
						var l = i[a];
						((Jt = l), $g(l, t));
					}
				qg(t);
			}
			for (t = t.child; t !== null; ) {
				switch (((i = t), i.tag)) {
					case 0:
					case 11:
					case 15:
						(mr(8, i, i.return), Ns(i));
						break;
					case 22:
						((a = i.stateNode), a._visibility & 2 && ((a._visibility &= -3), Ns(i)));
						break;
					default:
						Ns(i);
				}
				t = t.sibling;
			}
		}
		function $g(t, i) {
			for (; Jt !== null; ) {
				var a = Jt;
				switch (a.tag) {
					case 0:
					case 11:
					case 15:
						mr(8, a, i);
						break;
					case 23:
					case 22:
						if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
							var l = a.memoizedState.cachePool.pool;
							l != null && l.refCount++;
						}
						break;
					case 24:
						qu(a.memoizedState.cache);
				}
				if (((l = a.child), l !== null)) ((l.return = a), (Jt = l));
				else
					e: for (a = t; Jt !== null; ) {
						l = Jt;
						var c = l.sibling,
							d = l.return;
						if ((Og(l), l === a)) {
							Jt = null;
							break e;
						}
						if (c !== null) {
							((c.return = d), (Jt = c));
							break e;
						}
						Jt = d;
					}
			}
		}
		var iw = {
				getCacheForType: function (t) {
					var i = nn(qt),
						a = i.data.get(t);
					return (a === void 0 && ((a = t()), i.data.set(t, a)), a);
				},
				cacheSignal: function () {
					return nn(qt).controller.signal;
				},
			},
			rw = typeof WeakMap == "function" ? WeakMap : Map,
			Pe = 0,
			lt = null,
			je = null,
			qe = 0,
			et = 0,
			Mn = null,
			vr = !1,
			Pa = !1,
			jf = !1,
			Zi = 0,
			Nt = 0,
			gr = 0,
			ra = 0,
			Lf = 0,
			zn = 0,
			Qa = 0,
			tl = null,
			Sn = null,
			qf = !1,
			ks = 0,
			Bg = 0,
			Ms = 1 / 0,
			zs = null,
			yr = null,
			Xt = 0,
			pr = null,
			Ya = null,
			Hi = 0,
			Uf = 0,
			$f = null,
			Ig = null,
			nl = 0,
			Bf = null;
		function Yn() {
			return (Pe & 2) !== 0 && qe !== 0 ? qe & -qe : $.T !== null ? Qf() : Ur();
		}
		function Vg() {
			if (zn === 0)
				if ((qe & 536870912) === 0 || $e) {
					var t = di;
					((di <<= 1), (di & 3932160) === 0 && (di = 262144), (zn = t));
				} else zn = 536870912;
			return ((t = Nn.current), t !== null && (t.flags |= 32), zn);
		}
		function wn(t, i, a) {
			(((t === lt && (et === 2 || et === 9)) || t.cancelPendingCommit !== null) && (Ka(t, 0), br(t, qe, zn, !1)),
				Fe(t, a),
				((Pe & 2) === 0 || t !== lt) &&
					(t === lt && ((Pe & 2) === 0 && (ra |= a), Nt === 4 && br(t, qe, zn, !1)), Pi(t)));
		}
		function Zg(t, i, a) {
			if ((Pe & 6) !== 0) throw Error(s(327));
			var l = (!a && (i & 127) === 0 && (i & t.expiredLanes) === 0) || W(t, i),
				c = l ? lw(t, i) : Vf(t, i, !0),
				d = l;
			do {
				if (c === 0) {
					Pa && !l && br(t, i, 0, !1);
					break;
				} else {
					if (((a = t.current.alternate), d && !aw(a))) {
						((c = Vf(t, i, !1)), (d = !1));
						continue;
					}
					if (c === 2) {
						if (((d = i), t.errorRecoveryDisabledLanes & d)) var y = 0;
						else ((y = t.pendingLanes & -536870913), (y = y !== 0 ? y : y & 536870912 ? 536870912 : 0));
						if (y !== 0) {
							i = y;
							e: {
								var T = t;
								c = tl;
								var M = T.current.memoizedState.isDehydrated;
								if ((M && (Ka(T, y).flags |= 256), (y = Vf(T, y, !1)), y !== 2)) {
									if (jf && !M) {
										((T.errorRecoveryDisabledLanes |= d), (ra |= d), (c = 4));
										break e;
									}
									((d = Sn), (Sn = c), d !== null && (Sn === null ? (Sn = d) : Sn.push.apply(Sn, d)));
								}
								c = y;
							}
							if (((d = !1), c !== 2)) continue;
						}
					}
					if (c === 1) {
						(Ka(t, 0), br(t, i, 0, !0));
						break;
					}
					e: {
						switch (((l = t), (d = c), d)) {
							case 0:
							case 1:
								throw Error(s(345));
							case 4:
								if ((i & 4194048) !== i) break;
							case 6:
								br(l, i, zn, !vr);
								break e;
							case 2:
								Sn = null;
								break;
							case 3:
							case 5:
								break;
							default:
								throw Error(s(329));
						}
						if ((i & 62914560) === i && ((c = ks + 300 - Oe()), 10 < c)) {
							if ((br(l, i, zn, !vr), Un(l, 0, !0) !== 0)) break e;
							((Hi = i),
								(l.timeoutHandle = Sy(Hg.bind(null, l, a, Sn, zs, qf, i, zn, ra, Qa, vr, d, "Throttled", -0, 0), c)));
							break e;
						}
						Hg(l, a, Sn, zs, qf, i, zn, ra, Qa, vr, d, null, -0, 0);
					}
				}
				break;
			} while (!0);
			Pi(t);
		}
		function Hg(t, i, a, l, c, d, y, T, M, V, J, ie, Z, K) {
			if (((t.timeoutHandle = -1), (ie = i.subtreeFlags), ie & 8192 || (ie & 16785408) === 16785408)) {
				((ie = {
					stylesheets: null,
					count: 0,
					imgCount: 0,
					imgBytes: 0,
					suspenseyImages: [],
					waitingForImages: !0,
					waitingForViewTransition: !1,
					unsuspend: Oi,
				}),
					Lg(i, d, ie));
				var he = (d & 62914560) === d ? ks - Oe() : (d & 4194048) === d ? Bg - Oe() : 0;
				if (((he = Iw(ie, he)), he !== null)) {
					((Hi = d),
						(t.cancelPendingCommit = he(Jg.bind(null, t, i, d, a, l, c, y, T, M, J, ie, null, Z, K))),
						br(t, d, y, !V));
					return;
				}
			}
			Jg(t, i, d, a, l, c, y, T, M);
		}
		function aw(t) {
			for (var i = t; ; ) {
				var a = i.tag;
				if (
					(a === 0 || a === 11 || a === 15) &&
					i.flags & 16384 &&
					((a = i.updateQueue), a !== null && ((a = a.stores), a !== null))
				)
					for (var l = 0; l < a.length; l++) {
						var c = a[l],
							d = c.getSnapshot;
						c = c.value;
						try {
							if (!Rn(d(), c)) return !1;
						} catch {
							return !1;
						}
					}
				if (((a = i.child), i.subtreeFlags & 16384 && a !== null)) ((a.return = i), (i = a));
				else {
					if (i === t) break;
					for (; i.sibling === null; ) {
						if (i.return === null || i.return === t) return !0;
						i = i.return;
					}
					((i.sibling.return = i.return), (i = i.sibling));
				}
			}
			return !0;
		}
		function br(t, i, a, l) {
			((i &= ~Lf),
				(i &= ~ra),
				(t.suspendedLanes |= i),
				(t.pingedLanes &= ~i),
				l && (t.warmLanes |= i),
				(l = t.expirationTimes));
			for (var c = i; 0 < c; ) {
				var d = 31 - Lt(c),
					y = 1 << d;
				((l[d] = -1), (c &= ~y));
			}
			a !== 0 && sn(t, a, i);
		}
		function Ds() {
			return (Pe & 6) === 0 ? (il(0, !1), !1) : !0;
		}
		function If() {
			if (je !== null) {
				if (et === 0) var t = je.return;
				else ((t = je), (zi = Yr = null), nf(t), (Ua = null), ($u = 0), (t = je));
				for (; t !== null; ) (Sg(t.alternate, t), (t = t.return));
				je = null;
			}
		}
		function Ka(t, i) {
			var a = t.timeoutHandle;
			(a !== -1 && ((t.timeoutHandle = -1), Ew(a)),
				(a = t.cancelPendingCommit),
				a !== null && ((t.cancelPendingCommit = null), a()),
				(Hi = 0),
				If(),
				(lt = t),
				(je = a = ki(t.current, null)),
				(qe = i),
				(et = 0),
				(Mn = null),
				(vr = !1),
				(Pa = W(t, i)),
				(jf = !1),
				(Qa = zn = Lf = ra = gr = Nt = 0),
				(Sn = tl = null),
				(qf = !1),
				(i & 8) !== 0 && (i |= i & 32));
			var l = t.entangledLanes;
			if (l !== 0)
				for (t = t.entanglements, l &= i; 0 < l; ) {
					var c = 31 - Lt(l),
						d = 1 << c;
					((i |= t[c]), (l &= ~d));
				}
			return ((Zi = i), ts(), a);
		}
		function Pg(t, i) {
			((ke = null),
				($.H = Yu),
				i === qa || i === os
					? ((i = cv()), (et = 3))
					: i === Hc
						? ((i = cv()), (et = 4))
						: (et = i === bf ? 8 : i !== null && typeof i == "object" && typeof i.then == "function" ? 6 : 1),
				(Mn = i),
				je === null && ((Nt = 1), Es(t, Vn(i, t.current))));
		}
		function Qg() {
			var t = Nn.current;
			return t === null
				? !0
				: (qe & 4194048) === qe
					? Qn === null
					: (qe & 62914560) === qe || (qe & 536870912) !== 0
						? t === Qn
						: !1;
		}
		function Yg() {
			var t = $.H;
			return (($.H = Yu), t === null ? Yu : t);
		}
		function Kg() {
			var t = $.A;
			return (($.A = iw), t);
		}
		function js() {
			((Nt = 4),
				vr || ((qe & 4194048) !== qe && Nn.current !== null) || (Pa = !0),
				((gr & 134217727) === 0 && (ra & 134217727) === 0) || lt === null || br(lt, qe, zn, !1));
		}
		function Vf(t, i, a) {
			var l = Pe;
			Pe |= 2;
			var c = Yg(),
				d = Kg();
			((lt !== t || qe !== i) && ((zs = null), Ka(t, i)), (i = !1));
			var y = Nt;
			e: do
				try {
					if (et !== 0 && je !== null) {
						var T = je,
							M = Mn;
						switch (et) {
							case 8:
								(If(), (y = 6));
								break e;
							case 3:
							case 2:
							case 9:
							case 6:
								Nn.current === null && (i = !0);
								var V = et;
								if (((et = 0), (Mn = null), Ga(t, T, M, V), a && Pa)) {
									y = 0;
									break e;
								}
								break;
							default:
								((V = et), (et = 0), (Mn = null), Ga(t, T, M, V));
						}
					}
					(uw(), (y = Nt));
					break;
				} catch (J) {
					Pg(t, J);
				}
			while (!0);
			return (
				i && t.shellSuspendCounter++,
				(zi = Yr = null),
				(Pe = l),
				($.H = c),
				($.A = d),
				je === null && ((lt = null), (qe = 0), ts()),
				y
			);
		}
		function uw() {
			for (; je !== null; ) Gg(je);
		}
		function lw(t, i) {
			var a = Pe;
			Pe |= 2;
			var l = Yg(),
				c = Kg();
			lt !== t || qe !== i ? ((zs = null), (Ms = Oe() + 500), Ka(t, i)) : (Pa = W(t, i));
			e: do
				try {
					if (et !== 0 && je !== null) {
						i = je;
						var d = Mn;
						t: switch (et) {
							case 1:
								((et = 0), (Mn = null), Ga(t, i, d, 1));
								break;
							case 2:
							case 9:
								if (sv(d)) {
									((et = 0), (Mn = null), Fg(i));
									break;
								}
								((i = function () {
									((et !== 2 && et !== 9) || lt !== t || (et = 7), Pi(t));
								}),
									d.then(i, i));
								break e;
							case 3:
								et = 7;
								break e;
							case 4:
								et = 5;
								break e;
							case 7:
								sv(d) ? ((et = 0), (Mn = null), Fg(i)) : ((et = 0), (Mn = null), Ga(t, i, d, 7));
								break;
							case 5:
								var y = null;
								switch (je.tag) {
									case 26:
										y = je.memoizedState;
									case 5:
									case 27:
										var T = je;
										if (y ? Ly(y) : T.stateNode.complete) {
											((et = 0), (Mn = null));
											var M = T.sibling;
											if (M !== null) je = M;
											else {
												var V = T.return;
												V !== null ? ((je = V), Ls(V)) : (je = null);
											}
											break t;
										}
								}
								((et = 0), (Mn = null), Ga(t, i, d, 5));
								break;
							case 6:
								((et = 0), (Mn = null), Ga(t, i, d, 6));
								break;
							case 8:
								(If(), (Nt = 6));
								break e;
							default:
								throw Error(s(462));
						}
					}
					sw();
					break;
				} catch (J) {
					Pg(t, J);
				}
			while (!0);
			return ((zi = Yr = null), ($.H = l), ($.A = c), (Pe = a), je !== null ? 0 : ((lt = null), (qe = 0), ts(), Nt));
		}
		function sw() {
			for (; je !== null && !xe(); ) Gg(je);
		}
		function Gg(t) {
			var i = bg(t.alternate, t, Zi);
			((t.memoizedProps = t.pendingProps), i === null ? Ls(t) : (je = i));
		}
		function Fg(t) {
			var i = t,
				a = i.alternate;
			switch (i.tag) {
				case 15:
				case 0:
					i = hg(a, i, i.pendingProps, i.type, void 0, qe);
					break;
				case 11:
					i = hg(a, i, i.pendingProps, i.type.render, i.ref, qe);
					break;
				case 5:
					nf(i);
				default:
					(Sg(a, i), (i = je = Xm(i, Zi)), (i = bg(a, i, Zi)));
			}
			((t.memoizedProps = t.pendingProps), i === null ? Ls(t) : (je = i));
		}
		function Ga(t, i, a, l) {
			((zi = Yr = null), nf(i), (Ua = null), ($u = 0));
			var c = i.return;
			try {
				if (FS(t, c, i, a, qe)) {
					((Nt = 1), Es(t, Vn(a, t.current)), (je = null));
					return;
				}
			} catch (d) {
				if (c !== null) throw ((je = c), d);
				((Nt = 1), Es(t, Vn(a, t.current)), (je = null));
				return;
			}
			i.flags & 32768
				? ($e || l === 1
						? (t = !0)
						: Pa || (qe & 536870912) !== 0
							? (t = !1)
							: ((vr = t = !0),
								(l === 2 || l === 9 || l === 3 || l === 6) &&
									((l = Nn.current), l !== null && l.tag === 13 && (l.flags |= 16384))),
					Xg(i, t))
				: Ls(i);
		}
		function Ls(t) {
			var i = t;
			do {
				if ((i.flags & 32768) !== 0) {
					Xg(i, vr);
					return;
				}
				t = i.return;
				var a = WS(i.alternate, i, Zi);
				if (a !== null) {
					je = a;
					return;
				}
				if (((i = i.sibling), i !== null)) {
					je = i;
					return;
				}
				je = i = t;
			} while (i !== null);
			Nt === 0 && (Nt = 5);
		}
		function Xg(t, i) {
			do {
				var a = ew(t.alternate, t);
				if (a !== null) {
					((a.flags &= 32767), (je = a));
					return;
				}
				if (
					((a = t.return),
					a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
					!i && ((t = t.sibling), t !== null))
				) {
					je = t;
					return;
				}
				je = t = a;
			} while (t !== null);
			((Nt = 6), (je = null));
		}
		function Jg(t, i, a, l, c, d, y, T, M) {
			t.cancelPendingCommit = null;
			do qs();
			while (Xt !== 0);
			if ((Pe & 6) !== 0) throw Error(s(327));
			if (i !== null) {
				if (i === t.current) throw Error(s(177));
				if (
					((d = i.lanes | i.childLanes),
					(d |= Oc),
					ft(t, a, d, y, T, M),
					t === lt && ((je = lt = null), (qe = 0)),
					(Ya = i),
					(pr = t),
					(Hi = a),
					(Uf = d),
					($f = c),
					(Ig = l),
					(i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0
						? ((t.callbackNode = null),
							(t.callbackPriority = 0),
							dw(jt, function () {
								return (iy(), null);
							}))
						: ((t.callbackNode = null), (t.callbackPriority = 0)),
					(l = (i.flags & 13878) !== 0),
					(i.subtreeFlags & 13878) !== 0 || l)
				) {
					((l = $.T), ($.T = null), (c = H.p), (H.p = 2), (y = Pe), (Pe |= 4));
					try {
						tw(t, i, a);
					} finally {
						((Pe = y), (H.p = c), ($.T = l));
					}
				}
				((Xt = 1), Wg(), ey(), ty());
			}
		}
		function Wg() {
			if (Xt === 1) {
				Xt = 0;
				var t = pr,
					i = Ya,
					a = (i.flags & 13878) !== 0;
				if ((i.subtreeFlags & 13878) !== 0 || a) {
					((a = $.T), ($.T = null));
					var l = H.p;
					H.p = 2;
					var c = Pe;
					Pe |= 4;
					try {
						zg(i, t);
						var d = Wf,
							y = Vm(t.containerInfo),
							T = d.focusedElem,
							M = d.selectionRange;
						if (y !== T && T && T.ownerDocument && Im(T.ownerDocument.documentElement, T)) {
							if (M !== null && Tc(T)) {
								var V = M.start,
									J = M.end;
								if ((J === void 0 && (J = V), "selectionStart" in T))
									((T.selectionStart = V), (T.selectionEnd = Math.min(J, T.value.length)));
								else {
									var ie = T.ownerDocument || document,
										Z = (ie && ie.defaultView) || window;
									if (Z.getSelection) {
										var K = Z.getSelection(),
											he = T.textContent.length,
											Te = Math.min(M.start, he),
											at = M.end === void 0 ? Te : Math.min(M.end, he);
										!K.extend && Te > at && ((y = at), (at = Te), (Te = y));
										var U = Bm(T, Te),
											L = Bm(T, at);
										if (
											U &&
											L &&
											(K.rangeCount !== 1 ||
												K.anchorNode !== U.node ||
												K.anchorOffset !== U.offset ||
												K.focusNode !== L.node ||
												K.focusOffset !== L.offset)
										) {
											var I = ie.createRange();
											(I.setStart(U.node, U.offset),
												K.removeAllRanges(),
												Te > at
													? (K.addRange(I), K.extend(L.node, L.offset))
													: (I.setEnd(L.node, L.offset), K.addRange(I)));
										}
									}
								}
							}
							for (ie = [], K = T; (K = K.parentNode); )
								K.nodeType === 1 && ie.push({ element: K, left: K.scrollLeft, top: K.scrollTop });
							for (typeof T.focus == "function" && T.focus(), T = 0; T < ie.length; T++) {
								var te = ie[T];
								((te.element.scrollLeft = te.left), (te.element.scrollTop = te.top));
							}
						}
						((Gs = !!Jf), (Wf = Jf = null));
					} finally {
						((Pe = c), (H.p = l), ($.T = a));
					}
				}
				((t.current = i), (Xt = 2));
			}
		}
		function ey() {
			if (Xt === 2) {
				Xt = 0;
				var t = pr,
					i = Ya,
					a = (i.flags & 8772) !== 0;
				if ((i.subtreeFlags & 8772) !== 0 || a) {
					((a = $.T), ($.T = null));
					var l = H.p;
					H.p = 2;
					var c = Pe;
					Pe |= 4;
					try {
						Rg(t, i.alternate, i);
					} finally {
						((Pe = c), (H.p = l), ($.T = a));
					}
				}
				Xt = 3;
			}
		}
		function ty() {
			if (Xt === 4 || Xt === 3) {
				((Xt = 0), ct());
				var t = pr,
					i = Ya,
					a = Hi,
					l = Ig;
				(i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0
					? (Xt = 5)
					: ((Xt = 0), (Ya = pr = null), ny(t, t.pendingLanes));
				var c = t.pendingLanes;
				if ((c === 0 && (yr = null), _t(a), (i = i.stateNode), Wt && typeof Wt.onCommitFiberRoot == "function"))
					try {
						Wt.onCommitFiberRoot(vn, i, void 0, (i.current.flags & 128) === 128);
					} catch {}
				if (l !== null) {
					((i = $.T), (c = H.p), (H.p = 2), ($.T = null));
					try {
						for (var d = t.onRecoverableError, y = 0; y < l.length; y++) {
							var T = l[y];
							d(T.value, { componentStack: T.stack });
						}
					} finally {
						(($.T = i), (H.p = c));
					}
				}
				((Hi & 3) !== 0 && qs(),
					Pi(t),
					(c = t.pendingLanes),
					(a & 261930) !== 0 && (c & 42) !== 0 ? (t === Bf ? nl++ : ((nl = 0), (Bf = t))) : (nl = 0),
					il(0, !1));
			}
		}
		function ny(t, i) {
			(t.pooledCacheLanes &= i) === 0 && ((i = t.pooledCache), i != null && ((t.pooledCache = null), qu(i)));
		}
		function qs() {
			return (Wg(), ey(), ty(), iy());
		}
		function iy() {
			if (Xt !== 5) return !1;
			var t = pr,
				i = Uf;
			Uf = 0;
			var a = _t(Hi),
				l = $.T,
				c = H.p;
			try {
				((H.p = 32 > a ? 32 : a), ($.T = null), (a = $f), ($f = null));
				var d = pr,
					y = Hi;
				if (((Xt = 0), (Ya = pr = null), (Hi = 0), (Pe & 6) !== 0)) throw Error(s(331));
				var T = Pe;
				if (
					((Pe |= 4),
					Ug(d.current),
					jg(d, d.current, y, a),
					(Pe = T),
					il(0, !1),
					Wt && typeof Wt.onPostCommitFiberRoot == "function")
				)
					try {
						Wt.onPostCommitFiberRoot(vn, d);
					} catch {}
				return !0;
			} finally {
				((H.p = c), ($.T = l), ny(t, i));
			}
		}
		function ry(t, i, a) {
			((i = Vn(a, i)), (i = pf(t.stateNode, i, 2)), (t = ea(t, i, 2)), t !== null && (Fe(t, 2), Pi(t)));
		}
		function tt(t, i, a) {
			if (t.tag === 3) ry(t, t, a);
			else
				for (; i !== null; ) {
					if (i.tag === 3) {
						ry(i, t, a);
						break;
					} else if (i.tag === 1) {
						var l = i.stateNode;
						if (
							typeof i.type.getDerivedStateFromError == "function" ||
							(typeof l.componentDidCatch == "function" && (yr === null || !yr.has(l)))
						) {
							((t = Vn(a, t)), (a = ag(2)), (l = ea(i, a, 2)), l !== null && (ug(a, l, i, t), Fe(l, 2), Pi(l)));
							break;
						}
					}
					i = i.return;
				}
		}
		function Zf(t, i, a) {
			var l = t.pingCache;
			if (l === null) {
				l = t.pingCache = new rw();
				var c = new Set();
				l.set(i, c);
			} else ((c = l.get(i)), c === void 0 && ((c = new Set()), l.set(i, c)));
			c.has(a) || ((jf = !0), c.add(a), (t = ow.bind(null, t, i, a)), i.then(t, t));
		}
		function ow(t, i, a) {
			var l = t.pingCache;
			(l !== null && l.delete(i),
				(t.pingedLanes |= t.suspendedLanes & a),
				(t.warmLanes &= ~a),
				lt === t &&
					(qe & a) === a &&
					(Nt === 4 || (Nt === 3 && (qe & 62914560) === qe && 300 > Oe() - ks) ? (Pe & 2) === 0 && Ka(t, 0) : (Lf |= a),
					Qa === qe && (Qa = 0)),
				Pi(t));
		}
		function ay(t, i) {
			(i === 0 && (i = Ae()), (t = Hr(t, i)), t !== null && (Fe(t, i), Pi(t)));
		}
		function cw(t) {
			var i = t.memoizedState,
				a = 0;
			(i !== null && (a = i.retryLane), ay(t, a));
		}
		function fw(t, i) {
			var a = 0;
			switch (t.tag) {
				case 31:
				case 13:
					var l = t.stateNode,
						c = t.memoizedState;
					c !== null && (a = c.retryLane);
					break;
				case 19:
					l = t.stateNode;
					break;
				case 22:
					l = t.stateNode._retryCache;
					break;
				default:
					throw Error(s(314));
			}
			(l !== null && l.delete(i), ay(t, a));
		}
		function dw(t, i) {
			return st(t, i);
		}
		var Us = null,
			Fa = null,
			Hf = !1,
			$s = !1,
			Pf = !1,
			_r = 0;
		function Pi(t) {
			(t !== Fa && t.next === null && (Fa === null ? (Us = Fa = t) : (Fa = Fa.next = t)),
				($s = !0),
				Hf || ((Hf = !0), mw()));
		}
		function il(t, i) {
			if (!Pf && $s) {
				Pf = !0;
				do
					for (var a = !1, l = Us; l !== null; ) {
						if (!i)
							if (t !== 0) {
								var c = l.pendingLanes;
								if (c === 0) var d = 0;
								else {
									var y = l.suspendedLanes,
										T = l.pingedLanes;
									((d = (1 << (31 - Lt(42 | t) + 1)) - 1),
										(d &= c & ~(y & ~T)),
										(d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0));
								}
								d !== 0 && ((a = !0), oy(l, d));
							} else
								((d = qe),
									(d = Un(l, l === lt ? d : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1)),
									(d & 3) === 0 || W(l, d) || ((a = !0), oy(l, d)));
						l = l.next;
					}
				while (a);
				Pf = !1;
			}
		}
		function hw() {
			uy();
		}
		function uy() {
			$s = Hf = !1;
			var t = 0;
			_r !== 0 && ww() && (t = _r);
			for (var i = Oe(), a = null, l = Us; l !== null; ) {
				var c = l.next,
					d = ly(l, i);
				(d === 0
					? ((l.next = null), a === null ? (Us = c) : (a.next = c), c === null && (Fa = a))
					: ((a = l), (t !== 0 || (d & 3) !== 0) && ($s = !0)),
					(l = c));
			}
			((Xt !== 0 && Xt !== 5) || il(t, !1), _r !== 0 && (_r = 0));
		}
		function ly(t, i) {
			for (
				var a = t.suspendedLanes, l = t.pingedLanes, c = t.expirationTimes, d = t.pendingLanes & -62914561;
				0 < d;
			) {
				var y = 31 - Lt(d),
					T = 1 << y,
					M = c[y];
				(M === -1 ? ((T & a) === 0 || (T & l) !== 0) && (c[y] = ce(T, i)) : M <= i && (t.expiredLanes |= T), (d &= ~T));
			}
			if (
				((i = lt),
				(a = qe),
				(a = Un(t, t === i ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				(l = t.callbackNode),
				a === 0 || (t === i && (et === 2 || et === 9)) || t.cancelPendingCommit !== null)
			)
				return (l !== null && l !== null && ue(l), (t.callbackNode = null), (t.callbackPriority = 0));
			if ((a & 3) === 0 || W(t, a)) {
				if (((i = a & -a), i === t.callbackPriority)) return i;
				switch ((l !== null && ue(l), _t(a))) {
					case 2:
					case 8:
						a = vt;
						break;
					case 32:
						a = jt;
						break;
					case 268435456:
						a = ci;
						break;
					default:
						a = jt;
				}
				return ((l = sy.bind(null, t)), (a = st(a, l)), (t.callbackPriority = i), (t.callbackNode = a), i);
			}
			return (l !== null && l !== null && ue(l), (t.callbackPriority = 2), (t.callbackNode = null), 2);
		}
		function sy(t, i) {
			if (Xt !== 0 && Xt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
			var a = t.callbackNode;
			if (qs() && t.callbackNode !== a) return null;
			var l = qe;
			return (
				(l = Un(t, t === lt ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				l === 0
					? null
					: (Zg(t, l, i), ly(t, Oe()), t.callbackNode != null && t.callbackNode === a ? sy.bind(null, t) : null)
			);
		}
		function oy(t, i) {
			if (qs()) return null;
			Zg(t, i, !0);
		}
		function mw() {
			Tw(function () {
				(Pe & 6) !== 0 ? st(Kt, hw) : uy();
			});
		}
		function Qf() {
			if (_r === 0) {
				var t = ja;
				(t === 0 && ((t = gn), (gn <<= 1), (gn & 261888) === 0 && (gn = 256)), (_r = t));
			}
			return _r;
		}
		function cy(t) {
			return t == null || typeof t == "symbol" || typeof t == "boolean"
				? null
				: typeof t == "function"
					? t
					: Yl("" + t);
		}
		function fy(t, i) {
			var a = i.ownerDocument.createElement("input");
			return (
				(a.name = i.name),
				(a.value = i.value),
				t.id && a.setAttribute("form", t.id),
				i.parentNode.insertBefore(a, i),
				(t = new FormData(t)),
				a.parentNode.removeChild(a),
				t
			);
		}
		function vw(t, i, a, l, c) {
			if (i === "submit" && a && a.stateNode === c) {
				var d = cy((c[Ft] || null).action),
					y = l.submitter;
				y &&
					((i = (i = y[Ft] || null) ? cy(i.formAction) : y.getAttribute("formAction")),
					i !== null && ((d = i), (y = null)));
				var T = new Xl("action", "action", null, l, c);
				t.push({
					event: T,
					listeners: [
						{
							instance: null,
							listener: function () {
								if (l.defaultPrevented) {
									if (_r !== 0) {
										var M = y ? fy(c, y) : new FormData(c);
										df(a, { pending: !0, data: M, method: c.method, action: d }, null, M);
									}
								} else
									typeof d == "function" &&
										(T.preventDefault(),
										(M = y ? fy(c, y) : new FormData(c)),
										df(a, { pending: !0, data: M, method: c.method, action: d }, d, M));
							},
							currentTarget: c,
						},
					],
				});
			}
		}
		for (var Yf = 0; Yf < Rc.length; Yf++) {
			var Kf = Rc[Yf];
			ii(Kf.toLowerCase(), "on" + (Kf[0].toUpperCase() + Kf.slice(1)));
		}
		(ii(Pm, "onAnimationEnd"),
			ii(Qm, "onAnimationIteration"),
			ii(Ym, "onAnimationStart"),
			ii("dblclick", "onDoubleClick"),
			ii("focusin", "onFocus"),
			ii("focusout", "onBlur"),
			ii(NS, "onTransitionRun"),
			ii(kS, "onTransitionStart"),
			ii(MS, "onTransitionCancel"),
			ii(Km, "onTransitionEnd"),
			Sa("onMouseEnter", ["mouseout", "mouseover"]),
			Sa("onMouseLeave", ["mouseout", "mouseover"]),
			Sa("onPointerEnter", ["pointerout", "pointerover"]),
			Sa("onPointerLeave", ["pointerout", "pointerover"]),
			Ci("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
			Ci("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
			Ci("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
			Ci("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
			Ci("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
			Ci("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" ")));
		var rl =
				"abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
					" ",
				),
			gw = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(rl));
		function dy(t, i) {
			i = (i & 4) !== 0;
			for (var a = 0; a < t.length; a++) {
				var l = t[a],
					c = l.event;
				l = l.listeners;
				e: {
					var d = void 0;
					if (i)
						for (var y = l.length - 1; 0 <= y; y--) {
							var T = l[y],
								M = T.instance,
								V = T.currentTarget;
							if (((T = T.listener), M !== d && c.isPropagationStopped())) break e;
							((d = T), (c.currentTarget = V));
							try {
								d(c);
							} catch (J) {
								es(J);
							}
							((c.currentTarget = null), (d = M));
						}
					else
						for (y = 0; y < l.length; y++) {
							if (
								((T = l[y]),
								(M = T.instance),
								(V = T.currentTarget),
								(T = T.listener),
								M !== d && c.isPropagationStopped())
							)
								break e;
							((d = T), (c.currentTarget = V));
							try {
								d(c);
							} catch (J) {
								es(J);
							}
							((c.currentTarget = null), (d = M));
						}
				}
			}
		}
		function Le(t, i) {
			var a = i[xu];
			a === void 0 && (a = i[xu] = new Set());
			var l = t + "__bubble";
			a.has(l) || (my(i, t, 2, !1), a.add(l));
		}
		function Gf(t, i, a) {
			var l = 0;
			(i && (l |= 4), my(a, t, l, i));
		}
		var Bs = "_reactListening" + Math.random().toString(36).slice(2);
		function hy(t) {
			if (!t[Bs]) {
				((t[Bs] = !0),
					Br.forEach(function (a) {
						a !== "selectionchange" && (gw.has(a) || Gf(a, !1, t), Gf(a, !0, t));
					}));
				var i = t.nodeType === 9 ? t : t.ownerDocument;
				i === null || i[Bs] || ((i[Bs] = !0), Gf("selectionchange", !1, i));
			}
		}
		function my(t, i, a, l) {
			switch (Iy(i)) {
				case 2:
					var c = Qw;
					break;
				case 8:
					c = Yw;
					break;
				default:
					c = cd;
			}
			((a = c.bind(null, i, a, t)),
				(c = void 0),
				!vc || (i !== "touchstart" && i !== "touchmove" && i !== "wheel") || (c = !0),
				l
					? c !== void 0
						? t.addEventListener(i, a, { capture: !0, passive: c })
						: t.addEventListener(i, a, !0)
					: c !== void 0
						? t.addEventListener(i, a, { passive: c })
						: t.addEventListener(i, a, !1));
		}
		function Ff(t, i, a, l, c) {
			var d = l;
			if ((i & 1) === 0 && (i & 2) === 0 && l !== null)
				e: for (;;) {
					if (l === null) return;
					var y = l.tag;
					if (y === 3 || y === 4) {
						var T = l.stateNode.containerInfo;
						if (T === c) break;
						if (y === 4)
							for (y = l.return; y !== null; ) {
								var M = y.tag;
								if ((M === 3 || M === 4) && y.stateNode.containerInfo === c) return;
								y = y.return;
							}
						for (; T !== null; ) {
							if (((y = ot(T)), y === null)) return;
							if (((M = y.tag), M === 5 || M === 6 || M === 26 || M === 27)) {
								l = d = y;
								continue e;
							}
							T = T.parentNode;
						}
					}
					l = l.return;
				}
			Sm(function () {
				var V = d,
					J = hc(a),
					ie = [];
				e: {
					var Z = Gm.get(t);
					if (Z !== void 0) {
						var K = Xl,
							he = t;
						switch (t) {
							case "keypress":
								if (Gl(a) === 0) break e;
							case "keydown":
							case "keyup":
								K = hS;
								break;
							case "focusin":
								((he = "focus"), (K = bc));
								break;
							case "focusout":
								((he = "blur"), (K = bc));
								break;
							case "beforeblur":
							case "afterblur":
								K = bc;
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
								K = Tm;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								K = uS;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								K = mS;
								break;
							case Pm:
							case Qm:
							case Ym:
								K = lS;
								break;
							case Km:
								K = vS;
								break;
							case "scroll":
							case "scrollend":
								K = aS;
								break;
							case "wheel":
								K = gS;
								break;
							case "copy":
							case "cut":
							case "paste":
								K = sS;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								K = Am;
								break;
							case "toggle":
							case "beforetoggle":
								K = yS;
						}
						var Te = (i & 4) !== 0,
							at = !Te && (t === "scroll" || t === "scrollend"),
							U = Te ? (Z !== null ? Z + "Capture" : null) : Z;
						Te = [];
						for (var L = V, I; L !== null; ) {
							var te = L;
							if (
								((I = te.stateNode),
								(te = te.tag),
								(te !== 5 && te !== 26 && te !== 27) ||
									I === null ||
									U === null ||
									((te = Au(L, U)), te != null && Te.push(al(L, te, I))),
								at)
							)
								break;
							L = L.return;
						}
						0 < Te.length && ((Z = new K(Z, he, null, a, J)), ie.push({ event: Z, listeners: Te }));
					}
				}
				if ((i & 7) === 0) {
					e: {
						if (
							((Z = t === "mouseover" || t === "pointerover"),
							(K = t === "mouseout" || t === "pointerout"),
							Z && a !== dc && (he = a.relatedTarget || a.fromElement) && (ot(he) || he[$r]))
						)
							break e;
						if (
							(K || Z) &&
							((Z = J.window === J ? J : (Z = J.ownerDocument) ? Z.defaultView || Z.parentWindow : window),
							K
								? ((he = a.relatedTarget || a.toElement),
									(K = V),
									(he = he ? ot(he) : null),
									he !== null &&
										((at = f(he)), (Te = he.tag), he !== at || (Te !== 5 && Te !== 27 && Te !== 6)) &&
										(he = null))
								: ((K = null), (he = V)),
							K !== he)
						) {
							if (
								((Te = Tm),
								(te = "onMouseLeave"),
								(U = "onMouseEnter"),
								(L = "mouse"),
								(t === "pointerout" || t === "pointerover") &&
									((Te = Am), (te = "onPointerLeave"), (U = "onPointerEnter"), (L = "pointer")),
								(at = K == null ? Z : en(K)),
								(I = he == null ? Z : en(he)),
								(Z = new Te(te, L + "leave", K, a, J)),
								(Z.target = at),
								(Z.relatedTarget = I),
								(te = null),
								ot(J) === V &&
									((Te = new Te(U, L + "enter", he, a, J)), (Te.target = I), (Te.relatedTarget = at), (te = Te)),
								(at = te),
								K && he)
							)
								t: {
									for (Te = yw, U = K, L = he, I = 0, te = U; te; te = Te(te)) I++;
									te = 0;
									for (var be = L; be; be = Te(be)) te++;
									for (; 0 < I - te; ) ((U = Te(U)), I--);
									for (; 0 < te - I; ) ((L = Te(L)), te--);
									for (; I--; ) {
										if (U === L || (L !== null && U === L.alternate)) {
											Te = U;
											break t;
										}
										((U = Te(U)), (L = Te(L)));
									}
									Te = null;
								}
							else Te = null;
							(K !== null && vy(ie, Z, K, Te, !1), he !== null && at !== null && vy(ie, at, he, Te, !0));
						}
					}
					e: {
						if (
							((Z = V ? en(V) : window),
							(K = Z.nodeName && Z.nodeName.toLowerCase()),
							K === "select" || (K === "input" && Z.type === "file"))
						)
							var Ze = Dm;
						else if (Mm(Z))
							if (jm) Ze = CS;
							else {
								Ze = xS;
								var ve = TS;
							}
						else
							((K = Z.nodeName),
								!K || K.toLowerCase() !== "input" || (Z.type !== "checkbox" && Z.type !== "radio")
									? V && fc(V.elementType) && (Ze = Dm)
									: (Ze = AS));
						if (Ze && (Ze = Ze(t, V))) {
							zm(ie, Ze, a, J);
							break e;
						}
						(ve && ve(t, Z, V),
							t === "focusout" &&
								V &&
								Z.type === "number" &&
								V.memoizedProps.value != null &&
								cc(Z, "number", Z.value));
					}
					switch (((ve = V ? en(V) : window), t)) {
						case "focusin":
							(Mm(ve) || ve.contentEditable === "true") && ((Ca = ve), (xc = V), (Du = null));
							break;
						case "focusout":
							Du = xc = Ca = null;
							break;
						case "mousedown":
							Ac = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							((Ac = !1), Zm(ie, a, J));
							break;
						case "selectionchange":
							if (OS) break;
						case "keydown":
						case "keyup":
							Zm(ie, a, J);
					}
					var Me;
					if (Sc)
						e: {
							switch (t) {
								case "compositionstart":
									var Ue = "onCompositionStart";
									break e;
								case "compositionend":
									Ue = "onCompositionEnd";
									break e;
								case "compositionupdate":
									Ue = "onCompositionUpdate";
									break e;
							}
							Ue = void 0;
						}
					else
						Aa
							? Nm(t, a) && (Ue = "onCompositionEnd")
							: t === "keydown" && a.keyCode === 229 && (Ue = "onCompositionStart");
					(Ue &&
						(Cm &&
							a.locale !== "ko" &&
							(Aa || Ue !== "onCompositionStart"
								? Ue === "onCompositionEnd" && Aa && (Me = wm())
								: ((ur = J), (gc = "value" in ur ? ur.value : ur.textContent), (Aa = !0))),
						(ve = Is(V, Ue)),
						0 < ve.length &&
							((Ue = new xm(Ue, t, null, a, J)),
							ie.push({ event: Ue, listeners: ve }),
							Me ? (Ue.data = Me) : ((Me = km(a)), Me !== null && (Ue.data = Me)))),
						(Me = bS ? _S(t, a) : SS(t, a)) &&
							((Ue = Is(V, "onBeforeInput")),
							0 < Ue.length &&
								((ve = new xm("onBeforeInput", "beforeinput", null, a, J)),
								ie.push({ event: ve, listeners: Ue }),
								(ve.data = Me))),
						vw(ie, t, V, a, J));
				}
				dy(ie, i);
			});
		}
		function al(t, i, a) {
			return { instance: t, listener: i, currentTarget: a };
		}
		function Is(t, i) {
			for (var a = i + "Capture", l = []; t !== null; ) {
				var c = t,
					d = c.stateNode;
				if (
					((c = c.tag),
					(c !== 5 && c !== 26 && c !== 27) ||
						d === null ||
						((c = Au(t, a)), c != null && l.unshift(al(t, c, d)), (c = Au(t, i)), c != null && l.push(al(t, c, d))),
					t.tag === 3)
				)
					return l;
				t = t.return;
			}
			return [];
		}
		function yw(t) {
			if (t === null) return null;
			do t = t.return;
			while (t && t.tag !== 5 && t.tag !== 27);
			return t || null;
		}
		function vy(t, i, a, l, c) {
			for (var d = i._reactName, y = []; a !== null && a !== l; ) {
				var T = a,
					M = T.alternate,
					V = T.stateNode;
				if (((T = T.tag), M !== null && M === l)) break;
				((T !== 5 && T !== 26 && T !== 27) ||
					V === null ||
					((M = V),
					c
						? ((V = Au(a, d)), V != null && y.unshift(al(a, V, M)))
						: c || ((V = Au(a, d)), V != null && y.push(al(a, V, M)))),
					(a = a.return));
			}
			y.length !== 0 && t.push({ event: i, listeners: y });
		}
		var pw = /\r\n?/g,
			bw = /\u0000|\uFFFD/g;
		function gy(t) {
			return (typeof t == "string" ? t : "" + t)
				.replace(
					pw,
					`
`,
				)
				.replace(bw, "");
		}
		function yy(t, i) {
			return ((i = gy(i)), gy(t) === i);
		}
		function rt(t, i, a, l, c, d) {
			switch (a) {
				case "children":
					typeof l == "string"
						? i === "body" || (i === "textarea" && l === "") || Ea(t, l)
						: (typeof l == "number" || typeof l == "bigint") && i !== "body" && Ea(t, "" + l);
					break;
				case "className":
					Pl(t, "class", l);
					break;
				case "tabIndex":
					Pl(t, "tabindex", l);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					Pl(t, a, l);
					break;
				case "style":
					bm(t, l, d);
					break;
				case "data":
					if (i !== "object") {
						Pl(t, "data", l);
						break;
					}
				case "src":
				case "href":
					if (l === "" && (i !== "a" || a !== "href")) {
						t.removeAttribute(a);
						break;
					}
					if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
						t.removeAttribute(a);
						break;
					}
					((l = Yl("" + l)), t.setAttribute(a, l));
					break;
				case "action":
				case "formAction":
					if (typeof l == "function") {
						t.setAttribute(
							a,
							"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
						);
						break;
					} else
						typeof d == "function" &&
							(a === "formAction"
								? (i !== "input" && rt(t, i, "name", c.name, c, null),
									rt(t, i, "formEncType", c.formEncType, c, null),
									rt(t, i, "formMethod", c.formMethod, c, null),
									rt(t, i, "formTarget", c.formTarget, c, null))
								: (rt(t, i, "encType", c.encType, c, null),
									rt(t, i, "method", c.method, c, null),
									rt(t, i, "target", c.target, c, null)));
					if (l == null || typeof l == "symbol" || typeof l == "boolean") {
						t.removeAttribute(a);
						break;
					}
					((l = Yl("" + l)), t.setAttribute(a, l));
					break;
				case "onClick":
					l != null && (t.onclick = Oi);
					break;
				case "onScroll":
					l != null && Le("scroll", t);
					break;
				case "onScrollEnd":
					l != null && Le("scrollend", t);
					break;
				case "dangerouslySetInnerHTML":
					if (l != null) {
						if (typeof l != "object" || !("__html" in l)) throw Error(s(61));
						if (((a = l.__html), a != null)) {
							if (c.children != null) throw Error(s(60));
							t.innerHTML = a;
						}
					}
					break;
				case "multiple":
					t.multiple = l && typeof l != "function" && typeof l != "symbol";
					break;
				case "muted":
					t.muted = l && typeof l != "function" && typeof l != "symbol";
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
						t.removeAttribute("xlink:href");
						break;
					}
					((a = Yl("" + l)), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a));
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
						? t.setAttribute(a, "" + l)
						: t.removeAttribute(a);
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
					l && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(a, "") : t.removeAttribute(a);
					break;
				case "capture":
				case "download":
					l === !0
						? t.setAttribute(a, "")
						: l !== !1 && l != null && typeof l != "function" && typeof l != "symbol"
							? t.setAttribute(a, l)
							: t.removeAttribute(a);
					break;
				case "cols":
				case "rows":
				case "size":
				case "span":
					l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l
						? t.setAttribute(a, l)
						: t.removeAttribute(a);
					break;
				case "rowSpan":
				case "start":
					l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l)
						? t.removeAttribute(a)
						: t.setAttribute(a, l);
					break;
				case "popover":
					(Le("beforetoggle", t), Le("toggle", t), Hl(t, "popover", l));
					break;
				case "xlinkActuate":
					Ri(t, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
					break;
				case "xlinkArcrole":
					Ri(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
					break;
				case "xlinkRole":
					Ri(t, "http://www.w3.org/1999/xlink", "xlink:role", l);
					break;
				case "xlinkShow":
					Ri(t, "http://www.w3.org/1999/xlink", "xlink:show", l);
					break;
				case "xlinkTitle":
					Ri(t, "http://www.w3.org/1999/xlink", "xlink:title", l);
					break;
				case "xlinkType":
					Ri(t, "http://www.w3.org/1999/xlink", "xlink:type", l);
					break;
				case "xmlBase":
					Ri(t, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
					break;
				case "xmlLang":
					Ri(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
					break;
				case "xmlSpace":
					Ri(t, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
					break;
				case "is":
					Hl(t, "is", l);
					break;
				case "innerText":
				case "textContent":
					break;
				default:
					(!(2 < a.length) || (a[0] !== "o" && a[0] !== "O") || (a[1] !== "n" && a[1] !== "N")) &&
						((a = iS.get(a) || a), Hl(t, a, l));
			}
		}
		function Xf(t, i, a, l, c, d) {
			switch (a) {
				case "style":
					bm(t, l, d);
					break;
				case "dangerouslySetInnerHTML":
					if (l != null) {
						if (typeof l != "object" || !("__html" in l)) throw Error(s(61));
						if (((a = l.__html), a != null)) {
							if (c.children != null) throw Error(s(60));
							t.innerHTML = a;
						}
					}
					break;
				case "children":
					typeof l == "string" ? Ea(t, l) : (typeof l == "number" || typeof l == "bigint") && Ea(t, "" + l);
					break;
				case "onScroll":
					l != null && Le("scroll", t);
					break;
				case "onScrollEnd":
					l != null && Le("scrollend", t);
					break;
				case "onClick":
					l != null && (t.onclick = Oi);
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
					if (!_a.hasOwnProperty(a))
						e: {
							if (
								a[0] === "o" &&
								a[1] === "n" &&
								((c = a.endsWith("Capture")),
								(i = a.slice(2, c ? a.length - 7 : void 0)),
								(d = t[Ft] || null),
								(d = d != null ? d[a] : null),
								typeof d == "function" && t.removeEventListener(i, d, c),
								typeof l == "function")
							) {
								(typeof d != "function" &&
									d !== null &&
									(a in t ? (t[a] = null) : t.hasAttribute(a) && t.removeAttribute(a)),
									t.addEventListener(i, l, c));
								break e;
							}
							a in t ? (t[a] = l) : l === !0 ? t.setAttribute(a, "") : Hl(t, a, l);
						}
			}
		}
		function an(t, i, a) {
			switch (i) {
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
					(Le("error", t), Le("load", t));
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
										throw Error(s(137, i));
									default:
										rt(t, i, d, y, a, null);
								}
						}
					(c && rt(t, i, "srcSet", a.srcSet, a, null), l && rt(t, i, "src", a.src, a, null));
					return;
				case "input":
					Le("invalid", t);
					var T = (d = y = c = null),
						M = null,
						V = null;
					for (l in a)
						if (a.hasOwnProperty(l)) {
							var J = a[l];
							if (J != null)
								switch (l) {
									case "name":
										c = J;
										break;
									case "type":
										y = J;
										break;
									case "checked":
										M = J;
										break;
									case "defaultChecked":
										V = J;
										break;
									case "value":
										d = J;
										break;
									case "defaultValue":
										T = J;
										break;
									case "children":
									case "dangerouslySetInnerHTML":
										if (J != null) throw Error(s(137, i));
										break;
									default:
										rt(t, i, l, J, a, null);
								}
						}
					vm(t, d, T, M, V, y, c, !1);
					return;
				case "select":
					(Le("invalid", t), (l = y = d = null));
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
									rt(t, i, c, T, a, null);
							}
					((i = d), (a = y), (t.multiple = !!l), i != null ? wa(t, !!l, i, !1) : a != null && wa(t, !!l, a, !0));
					return;
				case "textarea":
					(Le("invalid", t), (d = c = l = null));
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
									rt(t, i, y, T, a, null);
							}
					ym(t, l, c, d);
					return;
				case "option":
					for (M in a)
						if (a.hasOwnProperty(M) && ((l = a[M]), l != null))
							switch (M) {
								case "selected":
									t.selected = l && typeof l != "function" && typeof l != "symbol";
									break;
								default:
									rt(t, i, M, l, a, null);
							}
					return;
				case "dialog":
					(Le("beforetoggle", t), Le("toggle", t), Le("cancel", t), Le("close", t));
					break;
				case "iframe":
				case "object":
					Le("load", t);
					break;
				case "video":
				case "audio":
					for (l = 0; l < rl.length; l++) Le(rl[l], t);
					break;
				case "image":
					(Le("error", t), Le("load", t));
					break;
				case "details":
					Le("toggle", t);
					break;
				case "embed":
				case "source":
				case "link":
					(Le("error", t), Le("load", t));
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
					for (V in a)
						if (a.hasOwnProperty(V) && ((l = a[V]), l != null))
							switch (V) {
								case "children":
								case "dangerouslySetInnerHTML":
									throw Error(s(137, i));
								default:
									rt(t, i, V, l, a, null);
							}
					return;
				default:
					if (fc(i)) {
						for (J in a) a.hasOwnProperty(J) && ((l = a[J]), l !== void 0 && Xf(t, i, J, l, a, void 0));
						return;
					}
			}
			for (T in a) a.hasOwnProperty(T) && ((l = a[T]), l != null && rt(t, i, T, l, a, null));
		}
		function _w(t, i, a, l) {
			switch (i) {
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
						M = null,
						V = null,
						J = null;
					for (K in a) {
						var ie = a[K];
						if (a.hasOwnProperty(K) && ie != null)
							switch (K) {
								case "checked":
									break;
								case "value":
									break;
								case "defaultValue":
									M = ie;
								default:
									l.hasOwnProperty(K) || rt(t, i, K, null, l, ie);
							}
					}
					for (var Z in l) {
						var K = l[Z];
						if (((ie = a[Z]), l.hasOwnProperty(Z) && (K != null || ie != null)))
							switch (Z) {
								case "type":
									d = K;
									break;
								case "name":
									c = K;
									break;
								case "checked":
									V = K;
									break;
								case "defaultChecked":
									J = K;
									break;
								case "value":
									y = K;
									break;
								case "defaultValue":
									T = K;
									break;
								case "children":
								case "dangerouslySetInnerHTML":
									if (K != null) throw Error(s(137, i));
									break;
								default:
									K !== ie && rt(t, i, Z, K, l, ie);
							}
					}
					oc(t, y, T, M, V, J, d, c);
					return;
				case "select":
					K = y = T = Z = null;
					for (d in a)
						if (((M = a[d]), a.hasOwnProperty(d) && M != null))
							switch (d) {
								case "value":
									break;
								case "multiple":
									K = M;
								default:
									l.hasOwnProperty(d) || rt(t, i, d, null, l, M);
							}
					for (c in l)
						if (((d = l[c]), (M = a[c]), l.hasOwnProperty(c) && (d != null || M != null)))
							switch (c) {
								case "value":
									Z = d;
									break;
								case "defaultValue":
									T = d;
									break;
								case "multiple":
									y = d;
								default:
									d !== M && rt(t, i, c, d, l, M);
							}
					((i = T),
						(a = y),
						(l = K),
						Z != null
							? wa(t, !!a, Z, !1)
							: !!l != !!a && (i != null ? wa(t, !!a, i, !0) : wa(t, !!a, a ? [] : "", !1)));
					return;
				case "textarea":
					K = Z = null;
					for (T in a)
						if (((c = a[T]), a.hasOwnProperty(T) && c != null && !l.hasOwnProperty(T)))
							switch (T) {
								case "value":
									break;
								case "children":
									break;
								default:
									rt(t, i, T, null, l, c);
							}
					for (y in l)
						if (((c = l[y]), (d = a[y]), l.hasOwnProperty(y) && (c != null || d != null)))
							switch (y) {
								case "value":
									Z = c;
									break;
								case "defaultValue":
									K = c;
									break;
								case "children":
									break;
								case "dangerouslySetInnerHTML":
									if (c != null) throw Error(s(91));
									break;
								default:
									c !== d && rt(t, i, y, c, l, d);
							}
					gm(t, Z, K);
					return;
				case "option":
					for (var he in a)
						if (((Z = a[he]), a.hasOwnProperty(he) && Z != null && !l.hasOwnProperty(he)))
							switch (he) {
								case "selected":
									t.selected = !1;
									break;
								default:
									rt(t, i, he, null, l, Z);
							}
					for (M in l)
						if (((Z = l[M]), (K = a[M]), l.hasOwnProperty(M) && Z !== K && (Z != null || K != null)))
							switch (M) {
								case "selected":
									t.selected = Z && typeof Z != "function" && typeof Z != "symbol";
									break;
								default:
									rt(t, i, M, Z, l, K);
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
					for (var Te in a)
						((Z = a[Te]), a.hasOwnProperty(Te) && Z != null && !l.hasOwnProperty(Te) && rt(t, i, Te, null, l, Z));
					for (V in l)
						if (((Z = l[V]), (K = a[V]), l.hasOwnProperty(V) && Z !== K && (Z != null || K != null)))
							switch (V) {
								case "children":
								case "dangerouslySetInnerHTML":
									if (Z != null) throw Error(s(137, i));
									break;
								default:
									rt(t, i, V, Z, l, K);
							}
					return;
				default:
					if (fc(i)) {
						for (var at in a)
							((Z = a[at]),
								a.hasOwnProperty(at) && Z !== void 0 && !l.hasOwnProperty(at) && Xf(t, i, at, void 0, l, Z));
						for (J in l)
							((Z = l[J]),
								(K = a[J]),
								!l.hasOwnProperty(J) || Z === K || (Z === void 0 && K === void 0) || Xf(t, i, J, Z, l, K));
						return;
					}
			}
			for (var U in a)
				((Z = a[U]), a.hasOwnProperty(U) && Z != null && !l.hasOwnProperty(U) && rt(t, i, U, null, l, Z));
			for (ie in l)
				((Z = l[ie]),
					(K = a[ie]),
					!l.hasOwnProperty(ie) || Z === K || (Z == null && K == null) || rt(t, i, ie, Z, l, K));
		}
		function py(t) {
			switch (t) {
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
		function Sw() {
			if (typeof performance.getEntriesByType == "function") {
				for (var t = 0, i = 0, a = performance.getEntriesByType("resource"), l = 0; l < a.length; l++) {
					var c = a[l],
						d = c.transferSize,
						y = c.initiatorType,
						T = c.duration;
					if (d && T && py(y)) {
						for (y = 0, T = c.responseEnd, l += 1; l < a.length; l++) {
							var M = a[l],
								V = M.startTime;
							if (V > T) break;
							var J = M.transferSize,
								ie = M.initiatorType;
							J && py(ie) && ((M = M.responseEnd), (y += J * (M < T ? 1 : (T - V) / (M - V))));
						}
						if ((--l, (i += (8 * (d + y)) / (c.duration / 1e3)), t++, 10 < t)) break;
					}
				}
				if (0 < t) return i / t / 1e6;
			}
			return navigator.connection && ((t = navigator.connection.downlink), typeof t == "number") ? t : 5;
		}
		var Jf = null,
			Wf = null;
		function Vs(t) {
			return t.nodeType === 9 ? t : t.ownerDocument;
		}
		function by(t) {
			switch (t) {
				case "http://www.w3.org/2000/svg":
					return 1;
				case "http://www.w3.org/1998/Math/MathML":
					return 2;
				default:
					return 0;
			}
		}
		function _y(t, i) {
			if (t === 0)
				switch (i) {
					case "svg":
						return 1;
					case "math":
						return 2;
					default:
						return 0;
				}
			return t === 1 && i === "foreignObject" ? 0 : t;
		}
		function ed(t, i) {
			return (
				t === "textarea" ||
				t === "noscript" ||
				typeof i.children == "string" ||
				typeof i.children == "number" ||
				typeof i.children == "bigint" ||
				(typeof i.dangerouslySetInnerHTML == "object" &&
					i.dangerouslySetInnerHTML !== null &&
					i.dangerouslySetInnerHTML.__html != null)
			);
		}
		var td = null;
		function ww() {
			var t = window.event;
			return t && t.type === "popstate" ? (t === td ? !1 : ((td = t), !0)) : ((td = null), !1);
		}
		var Sy = typeof setTimeout == "function" ? setTimeout : void 0,
			Ew = typeof clearTimeout == "function" ? clearTimeout : void 0,
			wy = typeof Promise == "function" ? Promise : void 0,
			Tw =
				typeof queueMicrotask == "function"
					? queueMicrotask
					: typeof wy < "u"
						? function (t) {
								return wy.resolve(null).then(t).catch(xw);
							}
						: Sy;
		function xw(t) {
			setTimeout(function () {
				throw t;
			});
		}
		function Sr(t) {
			return t === "head";
		}
		function Ey(t, i) {
			var a = i,
				l = 0;
			do {
				var c = a.nextSibling;
				if ((t.removeChild(a), c && c.nodeType === 8))
					if (((a = c.data), a === "/$" || a === "/&")) {
						if (l === 0) {
							(t.removeChild(c), eu(i));
							return;
						}
						l--;
					} else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&") l++;
					else if (a === "html") ul(t.ownerDocument.documentElement);
					else if (a === "head") {
						((a = t.ownerDocument.head), ul(a));
						for (var d = a.firstChild; d; ) {
							var y = d.nextSibling,
								T = d.nodeName;
							(d[ye] ||
								T === "SCRIPT" ||
								T === "STYLE" ||
								(T === "LINK" && d.rel.toLowerCase() === "stylesheet") ||
								a.removeChild(d),
								(d = y));
						}
					} else a === "body" && ul(t.ownerDocument.body);
				a = c;
			} while (a);
			eu(i);
		}
		function Ty(t, i) {
			var a = t;
			t = 0;
			do {
				var l = a.nextSibling;
				if (
					(a.nodeType === 1
						? i
							? ((a._stashedDisplay = a.style.display), (a.style.display = "none"))
							: ((a.style.display = a._stashedDisplay || ""),
								a.getAttribute("style") === "" && a.removeAttribute("style"))
						: a.nodeType === 3 &&
							(i ? ((a._stashedText = a.nodeValue), (a.nodeValue = "")) : (a.nodeValue = a._stashedText || "")),
					l && l.nodeType === 8)
				)
					if (((a = l.data), a === "/$")) {
						if (t === 0) break;
						t--;
					} else (a !== "$" && a !== "$?" && a !== "$~" && a !== "$!") || t++;
				a = l;
			} while (a);
		}
		function nd(t) {
			var i = t.firstChild;
			for (i && i.nodeType === 10 && (i = i.nextSibling); i; ) {
				var a = i;
				switch (((i = i.nextSibling), a.nodeName)) {
					case "HTML":
					case "HEAD":
					case "BODY":
						(nd(a), We(a));
						continue;
					case "SCRIPT":
					case "STYLE":
						continue;
					case "LINK":
						if (a.rel.toLowerCase() === "stylesheet") continue;
				}
				t.removeChild(a);
			}
		}
		function Aw(t, i, a, l) {
			for (; t.nodeType === 1; ) {
				var c = a;
				if (t.nodeName.toLowerCase() !== i.toLowerCase()) {
					if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
				} else if (l) {
					if (!t[ye])
						switch (i) {
							case "meta":
								if (!t.hasAttribute("itemprop")) break;
								return t;
							case "link":
								if (((d = t.getAttribute("rel")), d === "stylesheet" && t.hasAttribute("data-precedence"))) break;
								if (
									d !== c.rel ||
									t.getAttribute("href") !== (c.href == null || c.href === "" ? null : c.href) ||
									t.getAttribute("crossorigin") !== (c.crossOrigin == null ? null : c.crossOrigin) ||
									t.getAttribute("title") !== (c.title == null ? null : c.title)
								)
									break;
								return t;
							case "style":
								if (t.hasAttribute("data-precedence")) break;
								return t;
							case "script":
								if (
									((d = t.getAttribute("src")),
									(d !== (c.src == null ? null : c.src) ||
										t.getAttribute("type") !== (c.type == null ? null : c.type) ||
										t.getAttribute("crossorigin") !== (c.crossOrigin == null ? null : c.crossOrigin)) &&
										d &&
										t.hasAttribute("async") &&
										!t.hasAttribute("itemprop"))
								)
									break;
								return t;
							default:
								return t;
						}
				} else if (i === "input" && t.type === "hidden") {
					var d = c.name == null ? null : "" + c.name;
					if (c.type === "hidden" && t.getAttribute("name") === d) return t;
				} else return t;
				if (((t = Kn(t.nextSibling)), t === null)) break;
			}
			return null;
		}
		function Cw(t, i, a) {
			if (i === "") return null;
			for (; t.nodeType !== 3; )
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !a) ||
					((t = Kn(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function xy(t, i) {
			for (; t.nodeType !== 8; )
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i) ||
					((t = Kn(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function id(t) {
			return t.data === "$?" || t.data === "$~";
		}
		function rd(t) {
			return t.data === "$!" || (t.data === "$?" && t.ownerDocument.readyState !== "loading");
		}
		function Rw(t, i) {
			var a = t.ownerDocument;
			if (t.data === "$~") t._reactRetry = i;
			else if (t.data !== "$?" || a.readyState !== "loading") i();
			else {
				var l = function () {
					(i(), a.removeEventListener("DOMContentLoaded", l));
				};
				(a.addEventListener("DOMContentLoaded", l), (t._reactRetry = l));
			}
		}
		function Kn(t) {
			for (; t != null; t = t.nextSibling) {
				var i = t.nodeType;
				if (i === 1 || i === 3) break;
				if (i === 8) {
					if (
						((i = t.data), i === "$" || i === "$!" || i === "$?" || i === "$~" || i === "&" || i === "F!" || i === "F")
					)
						break;
					if (i === "/$" || i === "/&") return null;
				}
			}
			return t;
		}
		var ad = null;
		function Ay(t) {
			t = t.nextSibling;
			for (var i = 0; t; ) {
				if (t.nodeType === 8) {
					var a = t.data;
					if (a === "/$" || a === "/&") {
						if (i === 0) return Kn(t.nextSibling);
						i--;
					} else (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") || i++;
				}
				t = t.nextSibling;
			}
			return null;
		}
		function Cy(t) {
			t = t.previousSibling;
			for (var i = 0; t; ) {
				if (t.nodeType === 8) {
					var a = t.data;
					if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
						if (i === 0) return t;
						i--;
					} else (a !== "/$" && a !== "/&") || i++;
				}
				t = t.previousSibling;
			}
			return null;
		}
		function Ry(t, i, a) {
			switch (((i = Vs(a)), t)) {
				case "html":
					if (((t = i.documentElement), !t)) throw Error(s(452));
					return t;
				case "head":
					if (((t = i.head), !t)) throw Error(s(453));
					return t;
				case "body":
					if (((t = i.body), !t)) throw Error(s(454));
					return t;
				default:
					throw Error(s(451));
			}
		}
		function ul(t) {
			for (var i = t.attributes; i.length; ) t.removeAttributeNode(i[0]);
			We(t);
		}
		var Gn = new Map(),
			Oy = new Set();
		function Zs(t) {
			return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
		}
		var Qi = H.d;
		H.d = { f: Ow, r: Nw, D: kw, C: Mw, L: zw, m: Dw, X: Lw, S: jw, M: qw };
		function Ow() {
			var t = Qi.f(),
				i = Ds();
			return t || i;
		}
		function Nw(t) {
			var i = nt(t);
			i !== null && i.tag === 5 && i.type === "form" ? Kv(i) : Qi.r(t);
		}
		var Xa = typeof document > "u" ? null : document;
		function Ny(t, i, a) {
			var l = Xa;
			if (l && typeof i == "string" && i) {
				var c = Bn(i);
				((c = 'link[rel="' + t + '"][href="' + c + '"]'),
					typeof a == "string" && (c += '[crossorigin="' + a + '"]'),
					Oy.has(c) ||
						(Oy.add(c),
						(t = { rel: t, crossOrigin: a, href: i }),
						l.querySelector(c) === null &&
							((i = l.createElement("link")), an(i, "link", t), Ie(i), l.head.appendChild(i))));
			}
		}
		function kw(t) {
			(Qi.D(t), Ny("dns-prefetch", t, null));
		}
		function Mw(t, i) {
			(Qi.C(t, i), Ny("preconnect", t, i));
		}
		function zw(t, i, a) {
			Qi.L(t, i, a);
			var l = Xa;
			if (l && t && i) {
				var c = 'link[rel="preload"][as="' + Bn(i) + '"]';
				i === "image" && a && a.imageSrcSet
					? ((c += '[imagesrcset="' + Bn(a.imageSrcSet) + '"]'),
						typeof a.imageSizes == "string" && (c += '[imagesizes="' + Bn(a.imageSizes) + '"]'))
					: (c += '[href="' + Bn(t) + '"]');
				var d = c;
				switch (i) {
					case "style":
						d = Ja(t);
						break;
					case "script":
						d = Wa(t);
				}
				Gn.has(d) ||
					((t = b({ rel: "preload", href: i === "image" && a && a.imageSrcSet ? void 0 : t, as: i }, a)),
					Gn.set(d, t),
					l.querySelector(c) !== null ||
						(i === "style" && l.querySelector(ll(d))) ||
						(i === "script" && l.querySelector(sl(d))) ||
						((i = l.createElement("link")), an(i, "link", t), Ie(i), l.head.appendChild(i)));
			}
		}
		function Dw(t, i) {
			Qi.m(t, i);
			var a = Xa;
			if (a && t) {
				var l = i && typeof i.as == "string" ? i.as : "script",
					c = 'link[rel="modulepreload"][as="' + Bn(l) + '"][href="' + Bn(t) + '"]',
					d = c;
				switch (l) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script":
						d = Wa(t);
				}
				if (!Gn.has(d) && ((t = b({ rel: "modulepreload", href: t }, i)), Gn.set(d, t), a.querySelector(c) === null)) {
					switch (l) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script":
							if (a.querySelector(sl(d))) return;
					}
					((l = a.createElement("link")), an(l, "link", t), Ie(l), a.head.appendChild(l));
				}
			}
		}
		function jw(t, i, a) {
			Qi.S(t, i, a);
			var l = Xa;
			if (l && t) {
				var c = ni(l).hoistableStyles,
					d = Ja(t);
				i = i || "default";
				var y = c.get(d);
				if (!y) {
					var T = { loading: 0, preload: null };
					if ((y = l.querySelector(ll(d)))) T.loading = 5;
					else {
						((t = b({ rel: "stylesheet", href: t, "data-precedence": i }, a)), (a = Gn.get(d)) && ud(t, a));
						var M = (y = l.createElement("link"));
						(Ie(M),
							an(M, "link", t),
							(M._p = new Promise(function (V, J) {
								((M.onload = V), (M.onerror = J));
							})),
							M.addEventListener("load", function () {
								T.loading |= 1;
							}),
							M.addEventListener("error", function () {
								T.loading |= 2;
							}),
							(T.loading |= 4),
							Hs(y, i, l));
					}
					((y = { type: "stylesheet", instance: y, count: 1, state: T }), c.set(d, y));
				}
			}
		}
		function Lw(t, i) {
			Qi.X(t, i);
			var a = Xa;
			if (a && t) {
				var l = ni(a).hoistableScripts,
					c = Wa(t),
					d = l.get(c);
				d ||
					((d = a.querySelector(sl(c))),
					d ||
						((t = b({ src: t, async: !0 }, i)),
						(i = Gn.get(c)) && ld(t, i),
						(d = a.createElement("script")),
						Ie(d),
						an(d, "link", t),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					l.set(c, d));
			}
		}
		function qw(t, i) {
			Qi.M(t, i);
			var a = Xa;
			if (a && t) {
				var l = ni(a).hoistableScripts,
					c = Wa(t),
					d = l.get(c);
				d ||
					((d = a.querySelector(sl(c))),
					d ||
						((t = b({ src: t, async: !0, type: "module" }, i)),
						(i = Gn.get(c)) && ld(t, i),
						(d = a.createElement("script")),
						Ie(d),
						an(d, "link", t),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					l.set(c, d));
			}
		}
		function ky(t, i, a, l) {
			var c = (c = _e.current) ? Zs(c) : null;
			if (!c) throw Error(s(446));
			switch (t) {
				case "meta":
				case "title":
					return null;
				case "style":
					return typeof a.precedence == "string" && typeof a.href == "string"
						? ((i = Ja(a.href)),
							(a = ni(c).hoistableStyles),
							(l = a.get(i)),
							l || ((l = { type: "style", instance: null, count: 0, state: null }), a.set(i, l)),
							l)
						: { type: "void", instance: null, count: 0, state: null };
				case "link":
					if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
						t = Ja(a.href);
						var d = ni(c).hoistableStyles,
							y = d.get(t);
						if (
							(y ||
								((c = c.ownerDocument || c),
								(y = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }),
								d.set(t, y),
								(d = c.querySelector(ll(t))) && !d._p && ((y.instance = d), (y.state.loading = 5)),
								Gn.has(t) ||
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
									Gn.set(t, a),
									d || Uw(c, t, a, y.state))),
							i && l === null)
						)
							throw Error(s(528, ""));
						return y;
					}
					if (i && l !== null) throw Error(s(529, ""));
					return null;
				case "script":
					return (
						(i = a.async),
						(a = a.src),
						typeof a == "string" && i && typeof i != "function" && typeof i != "symbol"
							? ((i = Wa(a)),
								(a = ni(c).hoistableScripts),
								(l = a.get(i)),
								l || ((l = { type: "script", instance: null, count: 0, state: null }), a.set(i, l)),
								l)
							: { type: "void", instance: null, count: 0, state: null }
					);
				default:
					throw Error(s(444, t));
			}
		}
		function Ja(t) {
			return 'href="' + Bn(t) + '"';
		}
		function ll(t) {
			return 'link[rel="stylesheet"][' + t + "]";
		}
		function My(t) {
			return b({}, t, { "data-precedence": t.precedence, precedence: null });
		}
		function Uw(t, i, a, l) {
			t.querySelector('link[rel="preload"][as="style"][' + i + "]")
				? (l.loading = 1)
				: ((i = t.createElement("link")),
					(l.preload = i),
					i.addEventListener("load", function () {
						return (l.loading |= 1);
					}),
					i.addEventListener("error", function () {
						return (l.loading |= 2);
					}),
					an(i, "link", a),
					Ie(i),
					t.head.appendChild(i));
		}
		function Wa(t) {
			return '[src="' + Bn(t) + '"]';
		}
		function sl(t) {
			return "script[async]" + t;
		}
		function zy(t, i, a) {
			if ((i.count++, i.instance === null))
				switch (i.type) {
					case "style":
						var l = t.querySelector('style[data-href~="' + Bn(a.href) + '"]');
						if (l) return ((i.instance = l), Ie(l), l);
						var c = b({}, a, { "data-href": a.href, "data-precedence": a.precedence, href: null, precedence: null });
						return (
							(l = (t.ownerDocument || t).createElement("style")),
							Ie(l),
							an(l, "style", c),
							Hs(l, a.precedence, t),
							(i.instance = l)
						);
					case "stylesheet":
						c = Ja(a.href);
						var d = t.querySelector(ll(c));
						if (d) return ((i.state.loading |= 4), (i.instance = d), Ie(d), d);
						((l = My(a)), (c = Gn.get(c)) && ud(l, c), (d = (t.ownerDocument || t).createElement("link")), Ie(d));
						var y = d;
						return (
							(y._p = new Promise(function (T, M) {
								((y.onload = T), (y.onerror = M));
							})),
							an(d, "link", l),
							(i.state.loading |= 4),
							Hs(d, a.precedence, t),
							(i.instance = d)
						);
					case "script":
						return (
							(d = Wa(a.src)),
							(c = t.querySelector(sl(d)))
								? ((i.instance = c), Ie(c), c)
								: ((l = a),
									(c = Gn.get(d)) && ((l = b({}, a)), ld(l, c)),
									(t = t.ownerDocument || t),
									(c = t.createElement("script")),
									Ie(c),
									an(c, "link", l),
									t.head.appendChild(c),
									(i.instance = c))
						);
					case "void":
						return null;
					default:
						throw Error(s(443, i.type));
				}
			else
				i.type === "stylesheet" &&
					(i.state.loading & 4) === 0 &&
					((l = i.instance), (i.state.loading |= 4), Hs(l, a.precedence, t));
			return i.instance;
		}
		function Hs(t, i, a) {
			for (
				var l = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
					c = l.length ? l[l.length - 1] : null,
					d = c,
					y = 0;
				y < l.length;
				y++
			) {
				var T = l[y];
				if (T.dataset.precedence === i) d = T;
				else if (d !== c) break;
			}
			d
				? d.parentNode.insertBefore(t, d.nextSibling)
				: ((i = a.nodeType === 9 ? a.head : a), i.insertBefore(t, i.firstChild));
		}
		function ud(t, i) {
			((t.crossOrigin ??= i.crossOrigin), (t.referrerPolicy ??= i.referrerPolicy), (t.title ??= i.title));
		}
		function ld(t, i) {
			((t.crossOrigin ??= i.crossOrigin), (t.referrerPolicy ??= i.referrerPolicy), (t.integrity ??= i.integrity));
		}
		var Ps = null;
		function Dy(t, i, a) {
			if (Ps === null) {
				var l = new Map(),
					c = (Ps = new Map());
				c.set(a, l);
			} else ((c = Ps), (l = c.get(a)), l || ((l = new Map()), c.set(a, l)));
			if (l.has(t)) return l;
			for (l.set(t, null), a = a.getElementsByTagName(t), c = 0; c < a.length; c++) {
				var d = a[c];
				if (
					!(d[ye] || d[Gt] || (t === "link" && d.getAttribute("rel") === "stylesheet")) &&
					d.namespaceURI !== "http://www.w3.org/2000/svg"
				) {
					var y = d.getAttribute(i) || "";
					y = t + y;
					var T = l.get(y);
					T ? T.push(d) : l.set(y, [d]);
				}
			}
			return l;
		}
		function jy(t, i, a) {
			((t = t.ownerDocument || t), t.head.insertBefore(a, i === "title" ? t.querySelector("head > title") : null));
		}
		function $w(t, i, a) {
			if (a === 1 || i.itemProp != null) return !1;
			switch (t) {
				case "meta":
				case "title":
					return !0;
				case "style":
					if (typeof i.precedence != "string" || typeof i.href != "string" || i.href === "") break;
					return !0;
				case "link":
					if (typeof i.rel != "string" || typeof i.href != "string" || i.href === "" || i.onLoad || i.onError) break;
					switch (i.rel) {
						case "stylesheet":
							return ((t = i.disabled), typeof i.precedence == "string" && t == null);
						default:
							return !0;
					}
				case "script":
					if (
						i.async &&
						typeof i.async != "function" &&
						typeof i.async != "symbol" &&
						!i.onLoad &&
						!i.onError &&
						i.src &&
						typeof i.src == "string"
					)
						return !0;
			}
			return !1;
		}
		function Ly(t) {
			return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
		}
		function Bw(t, i, a, l) {
			if (
				a.type === "stylesheet" &&
				(typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
				(a.state.loading & 4) === 0
			) {
				if (a.instance === null) {
					var c = Ja(l.href),
						d = i.querySelector(ll(c));
					if (d) {
						((i = d._p),
							i !== null &&
								typeof i == "object" &&
								typeof i.then == "function" &&
								(t.count++, (t = Qs.bind(t)), i.then(t, t)),
							(a.state.loading |= 4),
							(a.instance = d),
							Ie(d));
						return;
					}
					((d = i.ownerDocument || i), (l = My(l)), (c = Gn.get(c)) && ud(l, c), (d = d.createElement("link")), Ie(d));
					var y = d;
					((y._p = new Promise(function (T, M) {
						((y.onload = T), (y.onerror = M));
					})),
						an(d, "link", l),
						(a.instance = d));
				}
				(t.stylesheets === null && (t.stylesheets = new Map()),
					t.stylesheets.set(a, i),
					(i = a.state.preload) &&
						(a.state.loading & 3) === 0 &&
						(t.count++, (a = Qs.bind(t)), i.addEventListener("load", a), i.addEventListener("error", a)));
			}
		}
		var sd = 0;
		function Iw(t, i) {
			return (
				t.stylesheets && t.count === 0 && Ks(t, t.stylesheets),
				0 < t.count || 0 < t.imgCount
					? function (a) {
							var l = setTimeout(function () {
								if ((t.stylesheets && Ks(t, t.stylesheets), t.unsuspend)) {
									var d = t.unsuspend;
									((t.unsuspend = null), d());
								}
							}, 6e4 + i);
							0 < t.imgBytes && sd === 0 && (sd = 62500 * Sw());
							var c = setTimeout(
								function () {
									if (
										((t.waitingForImages = !1), t.count === 0 && (t.stylesheets && Ks(t, t.stylesheets), t.unsuspend))
									) {
										var d = t.unsuspend;
										((t.unsuspend = null), d());
									}
								},
								(t.imgBytes > sd ? 50 : 800) + i,
							);
							return (
								(t.unsuspend = a),
								function () {
									((t.unsuspend = null), clearTimeout(l), clearTimeout(c));
								}
							);
						}
					: null
			);
		}
		function Qs() {
			if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
				if (this.stylesheets) Ks(this, this.stylesheets);
				else if (this.unsuspend) {
					var t = this.unsuspend;
					((this.unsuspend = null), t());
				}
			}
		}
		var Ys = null;
		function Ks(t, i) {
			((t.stylesheets = null),
				t.unsuspend !== null && (t.count++, (Ys = new Map()), i.forEach(Vw, t), (Ys = null), Qs.call(t)));
		}
		function Vw(t, i) {
			if (!(i.state.loading & 4)) {
				var a = Ys.get(t);
				if (a) var l = a.get(null);
				else {
					((a = new Map()), Ys.set(t, a));
					for (var c = t.querySelectorAll("link[data-precedence],style[data-precedence]"), d = 0; d < c.length; d++) {
						var y = c[d];
						(y.nodeName === "LINK" || y.getAttribute("media") !== "not all") &&
							(a.set(y.dataset.precedence, y), (l = y));
					}
					l && a.set(null, l);
				}
				((c = i.instance),
					(y = c.getAttribute("data-precedence")),
					(d = a.get(y) || l),
					d === l && a.set(null, c),
					a.set(y, c),
					this.count++,
					(l = Qs.bind(this)),
					c.addEventListener("load", l),
					c.addEventListener("error", l),
					d
						? d.parentNode.insertBefore(c, d.nextSibling)
						: ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(c, t.firstChild)),
					(i.state.loading |= 4));
			}
		}
		var ol = { $$typeof: C, Provider: null, Consumer: null, _currentValue: se, _currentValue2: se, _threadCount: 0 };
		function Zw(t, i, a, l, c, d, y, T, M) {
			((this.tag = 1),
				(this.containerInfo = t),
				(this.pingCache = this.current = this.pendingChildren = null),
				(this.timeoutHandle = -1),
				(this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null),
				(this.callbackPriority = 0),
				(this.expirationTimes = Se(-1)),
				(this.entangledLanes =
					this.shellSuspendCounter =
					this.errorRecoveryDisabledLanes =
					this.expiredLanes =
					this.warmLanes =
					this.pingedLanes =
					this.suspendedLanes =
					this.pendingLanes =
						0),
				(this.entanglements = Se(0)),
				(this.hiddenUpdates = Se(null)),
				(this.identifierPrefix = l),
				(this.onUncaughtError = c),
				(this.onCaughtError = d),
				(this.onRecoverableError = y),
				(this.pooledCache = null),
				(this.pooledCacheLanes = 0),
				(this.formState = M),
				(this.incompleteTransitions = new Map()));
		}
		function Hw(t, i, a, l, c, d, y, T, M, V, J, ie) {
			return (
				(t = new Zw(t, i, a, y, M, V, J, ie, T)),
				(i = 1),
				d === !0 && (i |= 24),
				(d = On(3, null, null, i)),
				(t.current = d),
				(d.stateNode = t),
				(i = Ic()),
				i.refCount++,
				(t.pooledCache = i),
				i.refCount++,
				(d.memoizedState = { element: l, isDehydrated: a, cache: i }),
				Pc(d),
				t
			);
		}
		function Pw(t) {
			return t ? ((t = Na), t) : Na;
		}
		function qy(t, i, a, l, c, d) {
			((c = Pw(c)),
				l.context === null ? (l.context = c) : (l.pendingContext = c),
				(l = Wr(i)),
				(l.payload = { element: a }),
				(d = d === void 0 ? null : d),
				d !== null && (l.callback = d),
				(a = ea(t, l, i)),
				a !== null && (wn(a, t, i), Iu(a, t, i)));
		}
		function Uy(t, i) {
			if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
				var a = t.retryLane;
				t.retryLane = a !== 0 && a < i ? a : i;
			}
		}
		function od(t, i) {
			(Uy(t, i), (t = t.alternate) && Uy(t, i));
		}
		function $y(t) {
			if (t.tag === 13 || t.tag === 31) {
				var i = Hr(t, 67108864);
				(i !== null && wn(i, t, 67108864), od(t, 67108864));
			}
		}
		function By(t) {
			if (t.tag === 13 || t.tag === 31) {
				var i = Yn();
				i = Cn(i);
				var a = Hr(t, i);
				(a !== null && wn(a, t, i), od(t, i));
			}
		}
		var Gs = !0;
		function Qw(t, i, a, l) {
			var c = $.T;
			$.T = null;
			var d = H.p;
			try {
				((H.p = 2), cd(t, i, a, l));
			} finally {
				((H.p = d), ($.T = c));
			}
		}
		function Yw(t, i, a, l) {
			var c = $.T;
			$.T = null;
			var d = H.p;
			try {
				((H.p = 8), cd(t, i, a, l));
			} finally {
				((H.p = d), ($.T = c));
			}
		}
		function cd(t, i, a, l) {
			if (Gs) {
				var c = fd(l);
				if (c === null) (Ff(t, i, l, Fs, a), Vy(t, l));
				else if (Gw(c, t, i, a, l)) l.stopPropagation();
				else if ((Vy(t, l), i & 4 && -1 < Kw.indexOf(t))) {
					for (; c !== null; ) {
						var d = nt(c);
						if (d !== null)
							switch (d.tag) {
								case 3:
									if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
										var y = fn(d.pendingLanes);
										if (y !== 0) {
											var T = d;
											for (T.pendingLanes |= 2, T.entangledLanes |= 2; y; ) {
												var M = 1 << (31 - Lt(y));
												((T.entanglements[1] |= M), (y &= ~M));
											}
											(Pi(d), (Pe & 6) === 0 && ((Ms = Oe() + 500), il(0, !1)));
										}
									}
									break;
								case 31:
								case 13:
									((T = Hr(d, 2)), T !== null && wn(T, d, 2), Ds(), od(d, 2));
							}
						if (((d = fd(l)), d === null && Ff(t, i, l, Fs, a), d === c)) break;
						c = d;
					}
					c !== null && l.stopPropagation();
				} else Ff(t, i, l, null, a);
			}
		}
		function fd(t) {
			return ((t = hc(t)), dd(t));
		}
		var Fs = null;
		function dd(t) {
			if (((Fs = null), (t = ot(t)), t !== null)) {
				var i = f(t);
				if (i === null) t = null;
				else {
					var a = i.tag;
					if (a === 13) {
						if (((t = h(i)), t !== null)) return t;
						t = null;
					} else if (a === 31) {
						if (((t = m(i)), t !== null)) return t;
						t = null;
					} else if (a === 3) {
						if (i.stateNode.current.memoizedState.isDehydrated) return i.tag === 3 ? i.stateNode.containerInfo : null;
						t = null;
					} else i !== t && (t = null);
				}
			}
			return ((Fs = t), null);
		}
		function Iy(t) {
			switch (t) {
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
					switch (Ct()) {
						case Kt:
							return 2;
						case vt:
							return 8;
						case jt:
						case ba:
							return 32;
						case ci:
							return 268435456;
						default:
							return 32;
					}
				default:
					return 32;
			}
		}
		var hd = !1,
			wr = null,
			Er = null,
			Tr = null,
			cl = new Map(),
			fl = new Map(),
			xr = [],
			Kw =
				"mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
					" ",
				);
		function Vy(t, i) {
			switch (t) {
				case "focusin":
				case "focusout":
					wr = null;
					break;
				case "dragenter":
				case "dragleave":
					Er = null;
					break;
				case "mouseover":
				case "mouseout":
					Tr = null;
					break;
				case "pointerover":
				case "pointerout":
					cl.delete(i.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture":
					fl.delete(i.pointerId);
			}
		}
		function dl(t, i, a, l, c, d) {
			return t === null || t.nativeEvent !== d
				? ((t = { blockedOn: i, domEventName: a, eventSystemFlags: l, nativeEvent: d, targetContainers: [c] }),
					i !== null && ((i = nt(i)), i !== null && $y(i)),
					t)
				: ((t.eventSystemFlags |= l), (i = t.targetContainers), c !== null && i.indexOf(c) === -1 && i.push(c), t);
		}
		function Gw(t, i, a, l, c) {
			switch (i) {
				case "focusin":
					return ((wr = dl(wr, t, i, a, l, c)), !0);
				case "dragenter":
					return ((Er = dl(Er, t, i, a, l, c)), !0);
				case "mouseover":
					return ((Tr = dl(Tr, t, i, a, l, c)), !0);
				case "pointerover":
					var d = c.pointerId;
					return (cl.set(d, dl(cl.get(d) || null, t, i, a, l, c)), !0);
				case "gotpointercapture":
					return ((d = c.pointerId), fl.set(d, dl(fl.get(d) || null, t, i, a, l, c)), !0);
			}
			return !1;
		}
		function Zy(t) {
			var i = ot(t.target);
			if (i !== null) {
				var a = f(i);
				if (a !== null) {
					if (((i = a.tag), i === 13)) {
						if (((i = h(a)), i !== null)) {
							((t.blockedOn = i),
								ar(t.priority, function () {
									By(a);
								}));
							return;
						}
					} else if (i === 31) {
						if (((i = m(a)), i !== null)) {
							((t.blockedOn = i),
								ar(t.priority, function () {
									By(a);
								}));
							return;
						}
					} else if (i === 3 && a.stateNode.current.memoizedState.isDehydrated) {
						t.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
						return;
					}
				}
			}
			t.blockedOn = null;
		}
		function Xs(t) {
			if (t.blockedOn !== null) return !1;
			for (var i = t.targetContainers; 0 < i.length; ) {
				var a = fd(t.nativeEvent);
				if (a === null) {
					a = t.nativeEvent;
					var l = new a.constructor(a.type, a);
					((dc = l), a.target.dispatchEvent(l), (dc = null));
				} else return ((i = nt(a)), i !== null && $y(i), (t.blockedOn = a), !1);
				i.shift();
			}
			return !0;
		}
		function Hy(t, i, a) {
			Xs(t) && a.delete(i);
		}
		function Fw() {
			((hd = !1),
				wr !== null && Xs(wr) && (wr = null),
				Er !== null && Xs(Er) && (Er = null),
				Tr !== null && Xs(Tr) && (Tr = null),
				cl.forEach(Hy),
				fl.forEach(Hy));
		}
		function Js(t, i) {
			t.blockedOn === i &&
				((t.blockedOn = null), hd || ((hd = !0), n.unstable_scheduleCallback(n.unstable_NormalPriority, Fw)));
		}
		var Ws = null;
		function Py(t) {
			Ws !== t &&
				((Ws = t),
				n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
					Ws === t && (Ws = null);
					for (var i = 0; i < t.length; i += 3) {
						var a = t[i],
							l = t[i + 1],
							c = t[i + 2];
						if (typeof l != "function") {
							if (dd(l || a) === null) continue;
							break;
						}
						var d = nt(a);
						d !== null &&
							(t.splice(i, 3), (i -= 3), df(d, { pending: !0, data: c, method: a.method, action: l }, l, c));
					}
				}));
		}
		function eu(t) {
			function i(M) {
				return Js(M, t);
			}
			(wr !== null && Js(wr, t), Er !== null && Js(Er, t), Tr !== null && Js(Tr, t), cl.forEach(i), fl.forEach(i));
			for (var a = 0; a < xr.length; a++) {
				var l = xr[a];
				l.blockedOn === t && (l.blockedOn = null);
			}
			for (; 0 < xr.length && ((a = xr[0]), a.blockedOn === null); ) (Zy(a), a.blockedOn === null && xr.shift());
			if (((a = (t.ownerDocument || t).$$reactFormReplay), a != null))
				for (l = 0; l < a.length; l += 3) {
					var c = a[l],
						d = a[l + 1],
						y = c[Ft] || null;
					if (typeof d == "function") y || Py(a);
					else if (y) {
						var T = null;
						if (d && d.hasAttribute("formAction")) {
							if (((c = d), (y = d[Ft] || null))) T = y.formAction;
							else if (dd(c) !== null) continue;
						} else T = y.action;
						(typeof T == "function" ? (a[l + 1] = T) : (a.splice(l, 3), (l -= 3)), Py(a));
					}
				}
		}
		function Xw() {
			function t(d) {
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
			function i() {
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
					navigation.addEventListener("navigate", t),
					navigation.addEventListener("navigatesuccess", i),
					navigation.addEventListener("navigateerror", i),
					setTimeout(a, 100),
					function () {
						((l = !0),
							navigation.removeEventListener("navigate", t),
							navigation.removeEventListener("navigatesuccess", i),
							navigation.removeEventListener("navigateerror", i),
							c !== null && (c(), (c = null)));
					}
				);
			}
		}
		function md(t) {
			this._internalRoot = t;
		}
		((vd.prototype.render = md.prototype.render =
			function (t) {
				var i = this._internalRoot;
				if (i === null) throw Error(s(409));
				var a = i.current;
				qy(a, Yn(), t, i, null, null);
			}),
			(vd.prototype.unmount = md.prototype.unmount =
				function () {
					var t = this._internalRoot;
					if (t !== null) {
						this._internalRoot = null;
						var i = t.containerInfo;
						(qy(t.current, 2, null, t, null, null), Ds(), (i[$r] = null));
					}
				}));
		function vd(t) {
			this._internalRoot = t;
		}
		vd.prototype.unstable_scheduleHydration = function (t) {
			if (t) {
				var i = Ur();
				t = { blockedOn: null, target: t, priority: i };
				for (var a = 0; a < xr.length && i !== 0 && i < xr[a].priority; a++);
				(xr.splice(a, 0, t), a === 0 && Zy(t));
			}
		};
		var Qy = r.version;
		if (Qy !== "19.2.8") throw Error(s(527, Qy, "19.2.8"));
		H.findDOMNode = function (t) {
			var i = t._reactInternals;
			if (i === void 0)
				throw typeof t.render == "function" ? Error(s(188)) : ((t = Object.keys(t).join(",")), Error(s(268, t)));
			return ((t = g(i)), (t = t !== null ? _(t) : null), (t = t === null ? null : t.stateNode), t);
		};
		var Jw = {
			bundleType: 0,
			version: "19.2.8",
			rendererPackageName: "react-dom",
			currentDispatcherRef: $,
			reconcilerVersion: "19.2.8",
		};
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
			var eo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (!eo.isDisabled && eo.supportsFiber)
				try {
					((vn = eo.inject(Jw)), (Wt = eo));
				} catch {}
		}
		e.createRoot = function (t, i) {
			if (!o(t)) throw Error(s(299));
			var a = !1,
				l = "",
				c = YS,
				d = KS,
				y = GS;
			return (
				i != null &&
					(i.unstable_strictMode === !0 && (a = !0),
					i.identifierPrefix !== void 0 && (l = i.identifierPrefix),
					i.onUncaughtError !== void 0 && (c = i.onUncaughtError),
					i.onCaughtError !== void 0 && (d = i.onCaughtError),
					i.onRecoverableError !== void 0 && (y = i.onRecoverableError)),
				(i = Hw(t, 1, !1, null, null, a, l, null, c, d, y, Xw)),
				(t[$r] = i.current),
				hy(t),
				new md(i)
			);
		};
	}),
	HE = Jn((e, n) => {
		function r() {
			if (
				!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")
			)
				try {
					__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
				} catch (u) {
					console.error(u);
				}
		}
		(r(), (n.exports = ZE()));
	}),
	g0;
function ne(e, n, r) {
	function u(h, m) {
		if (
			(h._zod || Object.defineProperty(h, "_zod", { value: { def: m, constr: f, traits: new Set() }, enumerable: !1 }),
			h._zod.traits.has(e))
		)
			return;
		(h._zod.traits.add(e), n(h, m));
		const v = f.prototype,
			g = Object.keys(v);
		for (let _ = 0; _ < g.length; _++) {
			const b = g[_];
			b in h || (h[b] = v[b].bind(h));
		}
	}
	const s = r?.Parent ?? Object;
	class o extends s {}
	Object.defineProperty(o, "name", { value: e });
	function f(h) {
		var m;
		const v = r?.Parent ? new o() : this;
		(u(v, h), (m = v._zod).deferred ?? (m.deferred = []));
		for (const g of v._zod.deferred) g();
		return v;
	}
	return (
		Object.defineProperty(f, "init", { value: u }),
		Object.defineProperty(f, Symbol.hasInstance, {
			value: (h) => (r?.Parent && h instanceof r.Parent ? !0 : h?._zod?.traits?.has(e)),
		}),
		Object.defineProperty(f, "name", { value: e }),
		f
	);
}
var cu = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	},
	Pp = class extends Error {
		constructor(e) {
			(super(`Encountered unidirectional transform during encode: ${e}`), (this.name = "ZodEncodeError"));
		}
	};
(g0 = globalThis).__zod_globalConfig ?? (g0.__zod_globalConfig = {});
var Eo = globalThis.__zod_globalConfig;
function Wi(e) {
	return (e && Object.assign(Eo, e), Eo);
}
function Qp(e) {
	const n = Object.values(e).filter((r) => typeof r == "number");
	return Object.entries(e)
		.filter(([r, u]) => n.indexOf(+r) === -1)
		.map(([r, u]) => u);
}
function Wd(e, n) {
	return typeof n == "bigint" ? n.toString() : n;
}
function yh(e) {
	return {
		get value() {
			{
				const n = e();
				return (Object.defineProperty(this, "value", { value: n }), n);
			}
			throw new Error("cached value already set");
		},
	};
}
function ph(e) {
	return e == null;
}
function bh(e) {
	const n = e.startsWith("^") ? 1 : 0,
		r = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(n, r);
}
function PE(e, n) {
	const r = e / n,
		u = Math.round(r),
		s = Number.EPSILON * Math.max(Math.abs(r), 1);
	return Math.abs(r - u) < s ? 0 : r - u;
}
var y0 = Symbol("evaluating");
function ut(e, n, r) {
	let u;
	Object.defineProperty(e, n, {
		get() {
			if (u !== y0) return (u === void 0 && ((u = y0), (u = r())), u);
		},
		set(s) {
			Object.defineProperty(e, n, { value: s });
		},
		configurable: !0,
	});
}
function ga(e, n, r) {
	Object.defineProperty(e, n, { value: r, writable: !0, enumerable: !0, configurable: !0 });
}
function jr(...e) {
	const n = {};
	for (const r of e) {
		const u = Object.getOwnPropertyDescriptors(r);
		Object.assign(n, u);
	}
	return Object.defineProperties({}, n);
}
function p0(e) {
	return JSON.stringify(e);
}
function QE(e) {
	return e
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}
var Yp = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function To(e) {
	return typeof e == "object" && e !== null && !Array.isArray(e);
}
var YE = yh(() => {
	if (Eo.jitless || (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))) return !1;
	try {
		return !1;
	} catch {
		return !1;
	}
});
function vu(e) {
	if (To(e) === !1) return !1;
	const n = e.constructor;
	if (n === void 0 || typeof n != "function") return !0;
	const r = n.prototype;
	return !(To(r) === !1 || Object.prototype.hasOwnProperty.call(r, "isPrototypeOf") === !1);
}
function Kp(e) {
	return vu(e)
		? { ...e }
		: Array.isArray(e)
			? [...e]
			: e instanceof Map
				? new Map(e)
				: e instanceof Set
					? new Set(e)
					: e;
}
var KE = new Set(["string", "number", "symbol"]);
function gu(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Lr(e, n, r) {
	const u = new e._zod.constr(n ?? e._zod.def);
	return ((!n || r?.parent) && (u._zod.parent = e), u);
}
function pe(e) {
	const n = e;
	if (!n) return {};
	if (typeof n == "string") return { error: () => n };
	if (n?.message !== void 0) {
		if (n?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
		n.error = n.message;
	}
	return (delete n.message, typeof n.error == "string" ? { ...n, error: () => n.error } : n);
}
function GE(e) {
	return Object.keys(e).filter((n) => e[n]._zod.optin === "optional" && e[n]._zod.optout === "optional");
}
var FE = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
function XE(e, n) {
	const r = e._zod.def,
		u = r.checks;
	if (u && u.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	return Lr(
		e,
		jr(e._zod.def, {
			get shape() {
				const s = {};
				for (const o in n) {
					if (!(o in r.shape)) throw new Error(`Unrecognized key: "${o}"`);
					n[o] && (s[o] = r.shape[o]);
				}
				return (ga(this, "shape", s), s);
			},
			checks: [],
		}),
	);
}
function JE(e, n) {
	const r = e._zod.def,
		u = r.checks;
	if (u && u.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	return Lr(
		e,
		jr(e._zod.def, {
			get shape() {
				const s = { ...e._zod.def.shape };
				for (const o in n) {
					if (!(o in r.shape)) throw new Error(`Unrecognized key: "${o}"`);
					n[o] && delete s[o];
				}
				return (ga(this, "shape", s), s);
			},
			checks: [],
		}),
	);
}
function WE(e, n) {
	if (!vu(n)) throw new Error("Invalid input to extend: expected a plain object");
	const r = e._zod.def.checks;
	if (r && r.length > 0) {
		const u = e._zod.def.shape;
		for (const s in n)
			if (Object.getOwnPropertyDescriptor(u, s) !== void 0)
				throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return Lr(
		e,
		jr(e._zod.def, {
			get shape() {
				const u = { ...e._zod.def.shape, ...n };
				return (ga(this, "shape", u), u);
			},
		}),
	);
}
function eT(e, n) {
	if (!vu(n)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return Lr(
		e,
		jr(e._zod.def, {
			get shape() {
				const r = { ...e._zod.def.shape, ...n };
				return (ga(this, "shape", r), r);
			},
		}),
	);
}
function tT(e, n) {
	if (e._zod.def.checks?.length)
		throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return Lr(
		e,
		jr(e._zod.def, {
			get shape() {
				const r = { ...e._zod.def.shape, ...n._zod.def.shape };
				return (ga(this, "shape", r), r);
			},
			get catchall() {
				return n._zod.def.catchall;
			},
			checks: n._zod.def.checks ?? [],
		}),
	);
}
function nT(e, n, r) {
	const u = n._zod.def.checks;
	if (u && u.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
	return Lr(
		n,
		jr(n._zod.def, {
			get shape() {
				const s = n._zod.def.shape,
					o = { ...s };
				if (r)
					for (const f in r) {
						if (!(f in s)) throw new Error(`Unrecognized key: "${f}"`);
						r[f] && (o[f] = e ? new e({ type: "optional", innerType: s[f] }) : s[f]);
					}
				else for (const f in s) o[f] = e ? new e({ type: "optional", innerType: s[f] }) : s[f];
				return (ga(this, "shape", o), o);
			},
			checks: [],
		}),
	);
}
function iT(e, n, r) {
	return Lr(
		n,
		jr(n._zod.def, {
			get shape() {
				const u = n._zod.def.shape,
					s = { ...u };
				if (r)
					for (const o in r) {
						if (!(o in s)) throw new Error(`Unrecognized key: "${o}"`);
						r[o] && (s[o] = new e({ type: "nonoptional", innerType: u[o] }));
					}
				else for (const o in u) s[o] = new e({ type: "nonoptional", innerType: u[o] });
				return (ga(this, "shape", s), s);
			},
		}),
	);
}
function uu(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let r = n; r < e.issues.length; r++) if (e.issues[r]?.continue !== !0) return !0;
	return !1;
}
function rT(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let r = n; r < e.issues.length; r++) if (e.issues[r]?.continue === !1) return !0;
	return !1;
}
function lu(e, n) {
	return n.map((r) => {
		var u;
		return ((u = r).path ?? (u.path = []), r.path.unshift(e), r);
	});
}
function ao(e) {
	return typeof e == "string" ? e : e?.message;
}
function er(e, n, r) {
	const u = e.message
			? e.message
			: (ao(e.inst?._zod.def?.error?.(e)) ??
				ao(n?.error?.(e)) ??
				ao(r.customError?.(e)) ??
				ao(r.localeError?.(e)) ??
				"Invalid input"),
		{ inst: s, continue: o, input: f, ...h } = e;
	return (h.path ?? (h.path = []), (h.message = u), n?.reportInput && (h.input = f), h);
}
function _h(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function _l(...e) {
	const [n, r, u] = e;
	return typeof n == "string" ? { message: n, code: "custom", input: r, inst: u } : { ...n };
}
var Gp = (e, n) => {
		((e.name = "$ZodError"),
			Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
			Object.defineProperty(e, "issues", { value: n, enumerable: !1 }),
			(e.message = JSON.stringify(n, Wd, 2)),
			Object.defineProperty(e, "toString", { value: () => e.message, enumerable: !1 }));
	},
	Fp = ne("$ZodError", Gp),
	Xp = ne("$ZodError", Gp, { Parent: Error });
function aT(e, n = (r) => r.message) {
	const r = {},
		u = [];
	for (const s of e.issues)
		s.path.length > 0 ? ((r[s.path[0]] = r[s.path[0]] || []), r[s.path[0]].push(n(s))) : u.push(n(s));
	return { formErrors: u, fieldErrors: r };
}
function uT(e, n = (r) => r.message) {
	const r = { _errors: [] },
		u = (s, o = []) => {
			for (const f of s.issues)
				if (f.code === "invalid_union" && f.errors.length) f.errors.map((h) => u({ issues: h }, [...o, ...f.path]));
				else if (f.code === "invalid_key") u({ issues: f.issues }, [...o, ...f.path]);
				else if (f.code === "invalid_element") u({ issues: f.issues }, [...o, ...f.path]);
				else {
					const h = [...o, ...f.path];
					if (h.length === 0) r._errors.push(n(f));
					else {
						let m = r,
							v = 0;
						for (; v < h.length; ) {
							const g = h[v];
							(v !== h.length - 1
								? (m[g] = m[g] || { _errors: [] })
								: ((m[g] = m[g] || { _errors: [] }), m[g]._errors.push(n(f))),
								(m = m[g]),
								v++);
						}
					}
				}
		};
	return (u(e), r);
}
var Sh = (e) => (n, r, u, s) => {
		const o = u ? { ...u, async: !1 } : { async: !1 },
			f = n._zod.run({ value: r, issues: [] }, o);
		if (f instanceof Promise) throw new cu();
		if (f.issues.length) {
			const h = new (s?.Err ?? e)(f.issues.map((m) => er(m, o, Wi())));
			throw (Yp(h, s?.callee), h);
		}
		return f.value;
	},
	wh = (e) => async (n, r, u, s) => {
		const o = u ? { ...u, async: !0 } : { async: !0 };
		let f = n._zod.run({ value: r, issues: [] }, o);
		if ((f instanceof Promise && (f = await f), f.issues.length)) {
			const h = new (s?.Err ?? e)(f.issues.map((m) => er(m, o, Wi())));
			throw (Yp(h, s?.callee), h);
		}
		return f.value;
	},
	Uo = (e) => (n, r, u) => {
		const s = u ? { ...u, async: !1 } : { async: !1 },
			o = n._zod.run({ value: r, issues: [] }, s);
		if (o instanceof Promise) throw new cu();
		return o.issues.length
			? { success: !1, error: new (e ?? Fp)(o.issues.map((f) => er(f, s, Wi()))) }
			: { success: !0, data: o.value };
	},
	lT = Uo(Xp),
	$o = (e) => async (n, r, u) => {
		const s = u ? { ...u, async: !0 } : { async: !0 };
		let o = n._zod.run({ value: r, issues: [] }, s);
		return (
			o instanceof Promise && (o = await o),
			o.issues.length
				? { success: !1, error: new e(o.issues.map((f) => er(f, s, Wi()))) }
				: { success: !0, data: o.value }
		);
	},
	sT = $o(Xp),
	oT = (e) => (n, r, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Sh(e)(n, r, s);
	},
	cT = (e) => (n, r, u) => Sh(e)(n, r, u),
	fT = (e) => async (n, r, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return wh(e)(n, r, s);
	},
	dT = (e) => async (n, r, u) => wh(e)(n, r, u),
	hT = (e) => (n, r, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Uo(e)(n, r, s);
	},
	mT = (e) => (n, r, u) => Uo(e)(n, r, u),
	vT = (e) => async (n, r, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return $o(e)(n, r, s);
	},
	gT = (e) => async (n, r, u) => $o(e)(n, r, u),
	yT = /^[cC][0-9a-z]{6,}$/,
	pT = /^[0-9a-z]+$/,
	bT = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
	_T = /^[0-9a-vA-V]{20}$/,
	ST = /^[A-Za-z0-9]{27}$/,
	wT = /^[a-zA-Z0-9_-]{21}$/,
	ET = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
	TT = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
	b0 = (e) =>
		e
			? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`)
			: /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
	xT = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
	AT = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function CT() {
	return new RegExp(AT, "u");
}
var RT =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	OT =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
	NT =
		/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
	kT =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	MT = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
	Jp = /^[A-Za-z0-9_-]*$/,
	zT = /^https?$/,
	DT = /^\+[1-9]\d{6,14}$/,
	Wp =
		"(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
	jT = new RegExp(`^${Wp}$`);
function eb(e) {
	const n = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number"
		? e.precision === -1
			? `${n}`
			: e.precision === 0
				? `${n}:[0-5]\\d`
				: `${n}:[0-5]\\d\\.\\d{${e.precision}}`
		: `${n}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function LT(e) {
	return new RegExp(`^${eb(e)}$`);
}
function qT(e) {
	const n = eb({ precision: e.precision }),
		r = ["Z"];
	(e.local && r.push(""), e.offset && r.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)"));
	const u = `${n}(?:${r.join("|")})`;
	return new RegExp(`^${Wp}T(?:${u})$`);
}
var UT = (e) => {
		const n = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
		return new RegExp(`^${n}$`);
	},
	$T = /^-?\d+$/,
	tb = /^-?\d+(?:\.\d+)?$/,
	BT = /^(?:true|false)$/i,
	IT = /^[^A-Z]*$/,
	VT = /^[^a-z]*$/,
	An = ne("$ZodCheck", (e, n) => {
		var r;
		(e._zod ?? (e._zod = {}), (e._zod.def = n), (r = e._zod).onattach ?? (r.onattach = []));
	}),
	nb = { number: "number", bigint: "bigint", object: "date" },
	ib = ne("$ZodCheckLessThan", (e, n) => {
		An.init(e, n);
		const r = nb[typeof n.value];
		(e._zod.onattach.push((u) => {
			const s = u._zod.bag,
				o = (n.inclusive ? s.maximum : s.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
			n.value < o && (n.inclusive ? (s.maximum = n.value) : (s.exclusiveMaximum = n.value));
		}),
			(e._zod.check = (u) => {
				(n.inclusive ? u.value <= n.value : u.value < n.value) ||
					u.issues.push({
						origin: r,
						code: "too_big",
						maximum: typeof n.value == "object" ? n.value.getTime() : n.value,
						input: u.value,
						inclusive: n.inclusive,
						inst: e,
						continue: !n.abort,
					});
			}));
	}),
	rb = ne("$ZodCheckGreaterThan", (e, n) => {
		An.init(e, n);
		const r = nb[typeof n.value];
		(e._zod.onattach.push((u) => {
			const s = u._zod.bag,
				o = (n.inclusive ? s.minimum : s.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
			n.value > o && (n.inclusive ? (s.minimum = n.value) : (s.exclusiveMinimum = n.value));
		}),
			(e._zod.check = (u) => {
				(n.inclusive ? u.value >= n.value : u.value > n.value) ||
					u.issues.push({
						origin: r,
						code: "too_small",
						minimum: typeof n.value == "object" ? n.value.getTime() : n.value,
						input: u.value,
						inclusive: n.inclusive,
						inst: e,
						continue: !n.abort,
					});
			}));
	}),
	ZT = ne("$ZodCheckMultipleOf", (e, n) => {
		(An.init(e, n),
			e._zod.onattach.push((r) => {
				var u;
				(u = r._zod.bag).multipleOf ?? (u.multipleOf = n.value);
			}),
			(e._zod.check = (r) => {
				if (typeof r.value != typeof n.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				(typeof r.value == "bigint" ? r.value % n.value === BigInt(0) : PE(r.value, n.value) === 0) ||
					r.issues.push({
						origin: typeof r.value,
						code: "not_multiple_of",
						divisor: n.value,
						input: r.value,
						inst: e,
						continue: !n.abort,
					});
			}));
	}),
	HT = ne("$ZodCheckNumberFormat", (e, n) => {
		(An.init(e, n), (n.format = n.format || "float64"));
		const r = n.format?.includes("int"),
			u = r ? "int" : "number",
			[s, o] = FE[n.format];
		(e._zod.onattach.push((f) => {
			const h = f._zod.bag;
			((h.format = n.format), (h.minimum = s), (h.maximum = o), r && (h.pattern = $T));
		}),
			(e._zod.check = (f) => {
				const h = f.value;
				if (r) {
					if (!Number.isInteger(h)) {
						f.issues.push({ expected: u, format: n.format, code: "invalid_type", continue: !1, input: h, inst: e });
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
									continue: !n.abort,
								})
							: f.issues.push({
									input: h,
									code: "too_small",
									minimum: Number.MIN_SAFE_INTEGER,
									note: "Integers must be within the safe integer range.",
									inst: e,
									origin: u,
									inclusive: !0,
									continue: !n.abort,
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
						continue: !n.abort,
					}),
					h > o &&
						f.issues.push({
							origin: "number",
							input: h,
							code: "too_big",
							maximum: o,
							inclusive: !0,
							inst: e,
							continue: !n.abort,
						}));
			}));
	}),
	PT = ne("$ZodCheckMaxLength", (e, n) => {
		var r;
		(An.init(e, n),
			(r = e._zod.def).when ??
				(r.when = (u) => {
					const s = u.value;
					return !ph(s) && s.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
				n.maximum < s && (u._zod.bag.maximum = n.maximum);
			}),
			(e._zod.check = (u) => {
				const s = u.value;
				if (s.length <= n.maximum) return;
				const o = _h(s);
				u.issues.push({
					origin: o,
					code: "too_big",
					maximum: n.maximum,
					inclusive: !0,
					input: s,
					inst: e,
					continue: !n.abort,
				});
			}));
	}),
	QT = ne("$ZodCheckMinLength", (e, n) => {
		var r;
		(An.init(e, n),
			(r = e._zod.def).when ??
				(r.when = (u) => {
					const s = u.value;
					return !ph(s) && s.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
				n.minimum > s && (u._zod.bag.minimum = n.minimum);
			}),
			(e._zod.check = (u) => {
				const s = u.value;
				if (s.length >= n.minimum) return;
				const o = _h(s);
				u.issues.push({
					origin: o,
					code: "too_small",
					minimum: n.minimum,
					inclusive: !0,
					input: s,
					inst: e,
					continue: !n.abort,
				});
			}));
	}),
	YT = ne("$ZodCheckLengthEquals", (e, n) => {
		var r;
		(An.init(e, n),
			(r = e._zod.def).when ??
				(r.when = (u) => {
					const s = u.value;
					return !ph(s) && s.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag;
				((s.minimum = n.length), (s.maximum = n.length), (s.length = n.length));
			}),
			(e._zod.check = (u) => {
				const s = u.value,
					o = s.length;
				if (o === n.length) return;
				const f = _h(s),
					h = o > n.length;
				u.issues.push({
					origin: f,
					...(h ? { code: "too_big", maximum: n.length } : { code: "too_small", minimum: n.length }),
					inclusive: !0,
					exact: !0,
					input: u.value,
					inst: e,
					continue: !n.abort,
				});
			}));
	}),
	Bo = ne("$ZodCheckStringFormat", (e, n) => {
		var r, u;
		(An.init(e, n),
			e._zod.onattach.push((s) => {
				const o = s._zod.bag;
				((o.format = n.format), n.pattern && (o.patterns ?? (o.patterns = new Set()), o.patterns.add(n.pattern)));
			}),
			n.pattern
				? ((r = e._zod).check ??
					(r.check = (s) => {
						((n.pattern.lastIndex = 0),
							!n.pattern.test(s.value) &&
								s.issues.push({
									origin: "string",
									code: "invalid_format",
									format: n.format,
									input: s.value,
									...(n.pattern ? { pattern: n.pattern.toString() } : {}),
									inst: e,
									continue: !n.abort,
								}));
					}))
				: ((u = e._zod).check ?? (u.check = () => {})));
	}),
	KT = ne("$ZodCheckRegex", (e, n) => {
		(Bo.init(e, n),
			(e._zod.check = (r) => {
				((n.pattern.lastIndex = 0),
					!n.pattern.test(r.value) &&
						r.issues.push({
							origin: "string",
							code: "invalid_format",
							format: "regex",
							input: r.value,
							pattern: n.pattern.toString(),
							inst: e,
							continue: !n.abort,
						}));
			}));
	}),
	GT = ne("$ZodCheckLowerCase", (e, n) => {
		(n.pattern ?? (n.pattern = IT), Bo.init(e, n));
	}),
	FT = ne("$ZodCheckUpperCase", (e, n) => {
		(n.pattern ?? (n.pattern = VT), Bo.init(e, n));
	}),
	XT = ne("$ZodCheckIncludes", (e, n) => {
		An.init(e, n);
		const r = gu(n.includes),
			u = new RegExp(typeof n.position == "number" ? `^.{${n.position}}${r}` : r);
		((n.pattern = u),
			e._zod.onattach.push((s) => {
				const o = s._zod.bag;
				(o.patterns ?? (o.patterns = new Set()), o.patterns.add(u));
			}),
			(e._zod.check = (s) => {
				s.value.includes(n.includes, n.position) ||
					s.issues.push({
						origin: "string",
						code: "invalid_format",
						format: "includes",
						includes: n.includes,
						input: s.value,
						inst: e,
						continue: !n.abort,
					});
			}));
	}),
	JT = ne("$ZodCheckStartsWith", (e, n) => {
		An.init(e, n);
		const r = new RegExp(`^${gu(n.prefix)}.*`);
		(n.pattern ?? (n.pattern = r),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag;
				(s.patterns ?? (s.patterns = new Set()), s.patterns.add(r));
			}),
			(e._zod.check = (u) => {
				u.value.startsWith(n.prefix) ||
					u.issues.push({
						origin: "string",
						code: "invalid_format",
						format: "starts_with",
						prefix: n.prefix,
						input: u.value,
						inst: e,
						continue: !n.abort,
					});
			}));
	}),
	WT = ne("$ZodCheckEndsWith", (e, n) => {
		An.init(e, n);
		const r = new RegExp(`.*${gu(n.suffix)}$`);
		(n.pattern ?? (n.pattern = r),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag;
				(s.patterns ?? (s.patterns = new Set()), s.patterns.add(r));
			}),
			(e._zod.check = (u) => {
				u.value.endsWith(n.suffix) ||
					u.issues.push({
						origin: "string",
						code: "invalid_format",
						format: "ends_with",
						suffix: n.suffix,
						input: u.value,
						inst: e,
						continue: !n.abort,
					});
			}));
	}),
	ex = ne("$ZodCheckOverwrite", (e, n) => {
		(An.init(e, n),
			(e._zod.check = (r) => {
				r.value = n.tx(r.value);
			}));
	}),
	tx = class {
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
			const n = e
					.split(
						`
`,
					)
					.filter((s) => s),
				r = Math.min(...n.map((s) => s.length - s.trimStart().length)),
				u = n.map((s) => s.slice(r)).map((s) => " ".repeat(this.indent * 2) + s);
			for (const s of u) this.content.push(s);
		}
		compile() {
			const e = Function,
				n = this?.args,
				r = [...(this?.content ?? [""]).map((u) => `  ${u}`)];
			return new e(
				...n,
				r.join(`
`),
			);
		}
	},
	nx = { major: 4, minor: 4, patch: 3 },
	wt = ne("$ZodType", (e, n) => {
		var r;
		(e ?? (e = {}), (e._zod.def = n), (e._zod.bag = e._zod.bag || {}), (e._zod.version = nx));
		const u = [...(e._zod.def.checks ?? [])];
		e._zod.traits.has("$ZodCheck") && u.unshift(e);
		for (const s of u) for (const o of s._zod.onattach) o(e);
		if (u.length === 0)
			((r = e._zod).deferred ?? (r.deferred = []),
				e._zod.deferred?.push(() => {
					e._zod.run = e._zod.parse;
				}));
		else {
			const s = (f, h, m) => {
					let v = uu(f),
						g;
					for (const _ of h) {
						if (_._zod.def.when) {
							if (rT(f) || !_._zod.def.when(f)) continue;
						} else if (v) continue;
						const b = f.issues.length,
							p = _._zod.check(f);
						if (p instanceof Promise && m?.async === !1) throw new cu();
						if (g || p instanceof Promise)
							g = (g ?? Promise.resolve()).then(async () => {
								(await p, f.issues.length !== b && (v || (v = uu(f, b))));
							});
						else {
							if (f.issues.length === b) continue;
							v || (v = uu(f, b));
						}
					}
					return g ? g.then(() => f) : f;
				},
				o = (f, h, m) => {
					if (uu(f)) return ((f.aborted = !0), f);
					const v = s(h, u, m);
					if (v instanceof Promise) {
						if (m.async === !1) throw new cu();
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
					if (h.async === !1) throw new cu();
					return m.then((v) => s(v, u, h));
				}
				return s(m, u, h);
			};
		}
		ut(e, "~standard", () => ({
			validate: (s) => {
				try {
					const o = lT(e, s);
					return o.success ? { value: o.data } : { issues: o.error?.issues };
				} catch {
					return sT(e, s).then((f) => (f.success ? { value: f.data } : { issues: f.error?.issues }));
				}
			},
			vendor: "zod",
			version: 1,
		}));
	}),
	Eh = ne("$ZodString", (e, n) => {
		(wt.init(e, n),
			(e._zod.pattern = [...(e?._zod.bag?.patterns ?? [])].pop() ?? UT(e._zod.bag)),
			(e._zod.parse = (r, u) => {
				if (n.coerce)
					try {
						r.value = String(r.value);
					} catch {}
				return (
					typeof r.value == "string" ||
						r.issues.push({ expected: "string", code: "invalid_type", input: r.value, inst: e }),
					r
				);
			}));
	}),
	pt = ne("$ZodStringFormat", (e, n) => {
		(Bo.init(e, n), Eh.init(e, n));
	}),
	ix = ne("$ZodGUID", (e, n) => {
		(n.pattern ?? (n.pattern = TT), pt.init(e, n));
	}),
	rx = ne("$ZodUUID", (e, n) => {
		if (n.version) {
			const r = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[n.version];
			if (r === void 0) throw new Error(`Invalid UUID version: "${n.version}"`);
			n.pattern ?? (n.pattern = b0(r));
		} else n.pattern ?? (n.pattern = b0());
		pt.init(e, n);
	}),
	ax = ne("$ZodEmail", (e, n) => {
		(n.pattern ?? (n.pattern = xT), pt.init(e, n));
	}),
	ux = ne("$ZodURL", (e, n) => {
		(pt.init(e, n),
			(e._zod.check = (r) => {
				try {
					const u = r.value.trim();
					if (!n.normalize && n.protocol?.source === zT.source && !/^https?:\/\//i.test(u)) {
						r.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid URL format",
							input: r.value,
							inst: e,
							continue: !n.abort,
						});
						return;
					}
					const s = new URL(u);
					(n.hostname &&
						((n.hostname.lastIndex = 0),
						n.hostname.test(s.hostname) ||
							r.issues.push({
								code: "invalid_format",
								format: "url",
								note: "Invalid hostname",
								pattern: n.hostname.source,
								input: r.value,
								inst: e,
								continue: !n.abort,
							})),
						n.protocol &&
							((n.protocol.lastIndex = 0),
							n.protocol.test(s.protocol.endsWith(":") ? s.protocol.slice(0, -1) : s.protocol) ||
								r.issues.push({
									code: "invalid_format",
									format: "url",
									note: "Invalid protocol",
									pattern: n.protocol.source,
									input: r.value,
									inst: e,
									continue: !n.abort,
								})),
						n.normalize ? (r.value = s.href) : (r.value = u));
					return;
				} catch {
					r.issues.push({ code: "invalid_format", format: "url", input: r.value, inst: e, continue: !n.abort });
				}
			}));
	}),
	lx = ne("$ZodEmoji", (e, n) => {
		(n.pattern ?? (n.pattern = CT()), pt.init(e, n));
	}),
	sx = ne("$ZodNanoID", (e, n) => {
		(n.pattern ?? (n.pattern = wT), pt.init(e, n));
	}),
	ox = ne("$ZodCUID", (e, n) => {
		(n.pattern ?? (n.pattern = yT), pt.init(e, n));
	}),
	cx = ne("$ZodCUID2", (e, n) => {
		(n.pattern ?? (n.pattern = pT), pt.init(e, n));
	}),
	fx = ne("$ZodULID", (e, n) => {
		(n.pattern ?? (n.pattern = bT), pt.init(e, n));
	}),
	dx = ne("$ZodXID", (e, n) => {
		(n.pattern ?? (n.pattern = _T), pt.init(e, n));
	}),
	hx = ne("$ZodKSUID", (e, n) => {
		(n.pattern ?? (n.pattern = ST), pt.init(e, n));
	}),
	mx = ne("$ZodISODateTime", (e, n) => {
		(n.pattern ?? (n.pattern = qT(n)), pt.init(e, n));
	}),
	vx = ne("$ZodISODate", (e, n) => {
		(n.pattern ?? (n.pattern = jT), pt.init(e, n));
	}),
	gx = ne("$ZodISOTime", (e, n) => {
		(n.pattern ?? (n.pattern = LT(n)), pt.init(e, n));
	}),
	yx = ne("$ZodISODuration", (e, n) => {
		(n.pattern ?? (n.pattern = ET), pt.init(e, n));
	}),
	px = ne("$ZodIPv4", (e, n) => {
		(n.pattern ?? (n.pattern = RT), pt.init(e, n), (e._zod.bag.format = "ipv4"));
	}),
	bx = ne("$ZodIPv6", (e, n) => {
		(n.pattern ?? (n.pattern = OT),
			pt.init(e, n),
			(e._zod.bag.format = "ipv6"),
			(e._zod.check = (r) => {
				try {
					new URL(`http://[${r.value}]`);
				} catch {
					r.issues.push({ code: "invalid_format", format: "ipv6", input: r.value, inst: e, continue: !n.abort });
				}
			}));
	}),
	_x = ne("$ZodCIDRv4", (e, n) => {
		(n.pattern ?? (n.pattern = NT), pt.init(e, n));
	}),
	Sx = ne("$ZodCIDRv6", (e, n) => {
		(n.pattern ?? (n.pattern = kT),
			pt.init(e, n),
			(e._zod.check = (r) => {
				const u = r.value.split("/");
				try {
					if (u.length !== 2) throw new Error();
					const [s, o] = u;
					if (!o) throw new Error();
					const f = Number(o);
					if (`${f}` !== o) throw new Error();
					if (f < 0 || f > 128) throw new Error();
					new URL(`http://[${s}]`);
				} catch {
					r.issues.push({ code: "invalid_format", format: "cidrv6", input: r.value, inst: e, continue: !n.abort });
				}
			}));
	});
function ab(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 !== 0) return !1;
	try {
		return (atob(e), !0);
	} catch {
		return !1;
	}
}
var wx = ne("$ZodBase64", (e, n) => {
	(n.pattern ?? (n.pattern = MT),
		pt.init(e, n),
		(e._zod.bag.contentEncoding = "base64"),
		(e._zod.check = (r) => {
			ab(r.value) ||
				r.issues.push({ code: "invalid_format", format: "base64", input: r.value, inst: e, continue: !n.abort });
		}));
});
function Ex(e) {
	if (!Jp.test(e)) return !1;
	const n = e.replace(/[-_]/g, (r) => (r === "-" ? "+" : "/"));
	return ab(n.padEnd(Math.ceil(n.length / 4) * 4, "="));
}
var Tx = ne("$ZodBase64URL", (e, n) => {
		(n.pattern ?? (n.pattern = Jp),
			pt.init(e, n),
			(e._zod.bag.contentEncoding = "base64url"),
			(e._zod.check = (r) => {
				Ex(r.value) ||
					r.issues.push({ code: "invalid_format", format: "base64url", input: r.value, inst: e, continue: !n.abort });
			}));
	}),
	xx = ne("$ZodE164", (e, n) => {
		(n.pattern ?? (n.pattern = DT), pt.init(e, n));
	});
function Ax(e, n = null) {
	try {
		const r = e.split(".");
		if (r.length !== 3) return !1;
		const [u] = r;
		if (!u) return !1;
		const s = JSON.parse(atob(u));
		return !(("typ" in s && s?.typ !== "JWT") || !s.alg || (n && (!("alg" in s) || s.alg !== n)));
	} catch {
		return !1;
	}
}
var Cx = ne("$ZodJWT", (e, n) => {
		(pt.init(e, n),
			(e._zod.check = (r) => {
				Ax(r.value, n.alg) ||
					r.issues.push({ code: "invalid_format", format: "jwt", input: r.value, inst: e, continue: !n.abort });
			}));
	}),
	ub = ne("$ZodNumber", (e, n) => {
		(wt.init(e, n),
			(e._zod.pattern = e._zod.bag.pattern ?? tb),
			(e._zod.parse = (r, u) => {
				if (n.coerce)
					try {
						r.value = Number(r.value);
					} catch {}
				const s = r.value;
				if (typeof s == "number" && !Number.isNaN(s) && Number.isFinite(s)) return r;
				const o = typeof s == "number" ? (Number.isNaN(s) ? "NaN" : Number.isFinite(s) ? void 0 : "Infinity") : void 0;
				return (
					r.issues.push({ expected: "number", code: "invalid_type", input: s, inst: e, ...(o ? { received: o } : {}) }),
					r
				);
			}));
	}),
	Rx = ne("$ZodNumberFormat", (e, n) => {
		(HT.init(e, n), ub.init(e, n));
	}),
	Ox = ne("$ZodBoolean", (e, n) => {
		(wt.init(e, n),
			(e._zod.pattern = BT),
			(e._zod.parse = (r, u) => {
				if (n.coerce)
					try {
						r.value = !!r.value;
					} catch {}
				const s = r.value;
				return (
					typeof s == "boolean" || r.issues.push({ expected: "boolean", code: "invalid_type", input: s, inst: e }),
					r
				);
			}));
	}),
	Nx = ne("$ZodUnknown", (e, n) => {
		(wt.init(e, n), (e._zod.parse = (r) => r));
	}),
	kx = ne("$ZodNever", (e, n) => {
		(wt.init(e, n),
			(e._zod.parse = (r, u) => (
				r.issues.push({ expected: "never", code: "invalid_type", input: r.value, inst: e }),
				r
			)));
	});
function _0(e, n, r) {
	(e.issues.length && n.issues.push(...lu(r, e.issues)), (n.value[r] = e.value));
}
var Mx = ne("$ZodArray", (e, n) => {
	(wt.init(e, n),
		(e._zod.parse = (r, u) => {
			const s = r.value;
			if (!Array.isArray(s)) return (r.issues.push({ expected: "array", code: "invalid_type", input: s, inst: e }), r);
			r.value = Array(s.length);
			const o = [];
			for (let f = 0; f < s.length; f++) {
				const h = s[f],
					m = n.element._zod.run({ value: h, issues: [] }, u);
				m instanceof Promise ? o.push(m.then((v) => _0(v, r, f))) : _0(m, r, f);
			}
			return o.length ? Promise.all(o).then(() => r) : r;
		}));
});
function xo(e, n, r, u, s, o) {
	const f = r in u;
	if (e.issues.length) {
		if (s && o && !f) return;
		n.issues.push(...lu(r, e.issues));
	}
	if (!f && !s) {
		e.issues.length || n.issues.push({ code: "invalid_type", expected: "nonoptional", input: void 0, path: [r] });
		return;
	}
	e.value === void 0 ? f && (n.value[r] = void 0) : (n.value[r] = e.value);
}
function lb(e) {
	const n = Object.keys(e.shape);
	for (const u of n)
		if (!e.shape?.[u]?._zod?.traits?.has("$ZodType"))
			throw new Error(`Invalid element at key "${u}": expected a Zod schema`);
	const r = GE(e.shape);
	return { ...e, keys: n, keySet: new Set(n), numKeys: n.length, optionalKeys: new Set(r) };
}
function sb(e, n, r, u, s, o) {
	const f = [],
		h = s.keySet,
		m = s.catchall._zod,
		v = m.def.type,
		g = m.optin === "optional",
		_ = m.optout === "optional";
	for (const b in n) {
		if (b === "__proto__" || h.has(b)) continue;
		if (v === "never") {
			f.push(b);
			continue;
		}
		const p = m.run({ value: n[b], issues: [] }, u);
		p instanceof Promise ? e.push(p.then((E) => xo(E, r, b, n, g, _))) : xo(p, r, b, n, g, _);
	}
	return (
		f.length && r.issues.push({ code: "unrecognized_keys", keys: f, input: n, inst: o }),
		e.length ? Promise.all(e).then(() => r) : r
	);
}
var zx = ne("$ZodObject", (e, n) => {
		if ((wt.init(e, n), !Object.getOwnPropertyDescriptor(n, "shape")?.get)) {
			const f = n.shape;
			Object.defineProperty(n, "shape", {
				get: () => {
					const h = { ...f };
					return (Object.defineProperty(n, "shape", { value: h }), h);
				},
			});
		}
		const r = yh(() => lb(n));
		ut(e._zod, "propValues", () => {
			const f = n.shape,
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
		const u = To,
			s = n.catchall;
		let o;
		e._zod.parse = (f, h) => {
			o ?? (o = r.value);
			const m = f.value;
			if (!u(m)) return (f.issues.push({ expected: "object", code: "invalid_type", input: m, inst: e }), f);
			f.value = {};
			const v = [],
				g = o.shape;
			for (const _ of o.keys) {
				const b = g[_],
					p = b._zod.optin === "optional",
					E = b._zod.optout === "optional",
					x = b._zod.run({ value: m[_], issues: [] }, h);
				x instanceof Promise ? v.push(x.then((O) => xo(O, f, _, m, p, E))) : xo(x, f, _, m, p, E);
			}
			return s ? sb(v, m, f, h, r.value, e) : v.length ? Promise.all(v).then(() => f) : f;
		};
	}),
	Dx = ne("$ZodObjectJIT", (e, n) => {
		zx.init(e, n);
		const r = e._zod.parse,
			u = yh(() => lb(n)),
			s = (b) => {
				const p = new tx(["shape", "payload", "ctx"]),
					E = u.value,
					x = (A) => {
						const C = p0(A);
						return `shape[${C}]._zod.run({ value: input[${C}], issues: [] }, ctx)`;
					};
				p.write("const input = payload.value;");
				const O = Object.create(null);
				let z = 0;
				for (const A of E.keys) O[A] = `key_${z++}`;
				p.write("const newResult = {};");
				for (const A of E.keys) {
					const C = O[A],
						k = p0(A),
						F = b[A],
						Q = F?._zod?.optin === "optional",
						j = F?._zod?.optout === "optional";
					(p.write(`const ${C} = ${x(A)};`),
						Q && j
							? p.write(`
        if (${C}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${C}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${C}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${C}.value;
        }
        
      `)
							: Q
								? p.write(`
        if (${C}.issues.length) {
          payload.issues = payload.issues.concat(${C}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${C}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${C}.value;
        }
        
      `)
								: p.write(`
        const ${C}_present = ${k} in input;
        if (${C}.issues.length) {
          payload.issues = payload.issues.concat(${C}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        if (!${C}_present && !${C}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
        }

        if (${C}_present) {
          if (${C}.value === undefined) {
            newResult[${k}] = undefined;
          } else {
            newResult[${k}] = ${C}.value;
          }
        }

      `));
				}
				(p.write("payload.value = newResult;"), p.write("return payload;"));
				const D = p.compile();
				return (A, C) => D(b, A, C);
			};
		let o;
		const f = To,
			h = !Eo.jitless,
			v = h && YE.value,
			g = n.catchall;
		let _;
		e._zod.parse = (b, p) => {
			_ ?? (_ = u.value);
			const E = b.value;
			return f(E)
				? h && v && p?.async === !1 && p.jitless !== !0
					? (o || (o = s(n.shape)), (b = o(b, p)), g ? sb([], E, b, p, _, e) : b)
					: r(b, p)
				: (b.issues.push({ expected: "object", code: "invalid_type", input: E, inst: e }), b);
		};
	});
function S0(e, n, r, u) {
	for (const o of e) if (o.issues.length === 0) return ((n.value = o.value), n);
	const s = e.filter((o) => !uu(o));
	return s.length === 1
		? ((n.value = s[0].value), s[0])
		: (n.issues.push({
				code: "invalid_union",
				input: n.value,
				inst: r,
				errors: e.map((o) => o.issues.map((f) => er(f, u, Wi()))),
			}),
			n);
}
var jx = ne("$ZodUnion", (e, n) => {
		(wt.init(e, n),
			ut(e._zod, "optin", () => (n.options.some((u) => u._zod.optin === "optional") ? "optional" : void 0)),
			ut(e._zod, "optout", () => (n.options.some((u) => u._zod.optout === "optional") ? "optional" : void 0)),
			ut(e._zod, "values", () => {
				if (n.options.every((u) => u._zod.values)) return new Set(n.options.flatMap((u) => Array.from(u._zod.values)));
			}),
			ut(e._zod, "pattern", () => {
				if (n.options.every((u) => u._zod.pattern)) {
					const u = n.options.map((s) => s._zod.pattern);
					return new RegExp(`^(${u.map((s) => bh(s.source)).join("|")})$`);
				}
			}));
		const r = n.options.length === 1 ? n.options[0]._zod.run : null;
		e._zod.parse = (u, s) => {
			if (r) return r(u, s);
			let o = !1;
			const f = [];
			for (const h of n.options) {
				const m = h._zod.run({ value: u.value, issues: [] }, s);
				if (m instanceof Promise) (f.push(m), (o = !0));
				else {
					if (m.issues.length === 0) return m;
					f.push(m);
				}
			}
			return o ? Promise.all(f).then((h) => S0(h, u, e, s)) : S0(f, u, e, s);
		};
	}),
	Lx = ne("$ZodIntersection", (e, n) => {
		(wt.init(e, n),
			(e._zod.parse = (r, u) => {
				const s = r.value,
					o = n.left._zod.run({ value: s, issues: [] }, u),
					f = n.right._zod.run({ value: s, issues: [] }, u);
				return o instanceof Promise || f instanceof Promise
					? Promise.all([o, f]).then(([h, m]) => w0(r, h, m))
					: w0(r, o, f);
			}));
	});
function eh(e, n) {
	if (e === n) return { valid: !0, data: e };
	if (e instanceof Date && n instanceof Date && +e == +n) return { valid: !0, data: e };
	if (vu(e) && vu(n)) {
		const r = Object.keys(n),
			u = Object.keys(e).filter((o) => r.indexOf(o) !== -1),
			s = { ...e, ...n };
		for (const o of u) {
			const f = eh(e[o], n[o]);
			if (!f.valid) return { valid: !1, mergeErrorPath: [o, ...f.mergeErrorPath] };
			s[o] = f.data;
		}
		return { valid: !0, data: s };
	}
	if (Array.isArray(e) && Array.isArray(n)) {
		if (e.length !== n.length) return { valid: !1, mergeErrorPath: [] };
		const r = [];
		for (let u = 0; u < e.length; u++) {
			const s = e[u],
				o = n[u],
				f = eh(s, o);
			if (!f.valid) return { valid: !1, mergeErrorPath: [u, ...f.mergeErrorPath] };
			r.push(f.data);
		}
		return { valid: !0, data: r };
	}
	return { valid: !1, mergeErrorPath: [] };
}
function w0(e, n, r) {
	const u = new Map();
	let s;
	for (const h of n.issues)
		if (h.code === "unrecognized_keys") {
			s ?? (s = h);
			for (const m of h.keys) (u.has(m) || u.set(m, {}), (u.get(m).l = !0));
		} else e.issues.push(h);
	for (const h of r.issues)
		if (h.code === "unrecognized_keys") for (const m of h.keys) (u.has(m) || u.set(m, {}), (u.get(m).r = !0));
		else e.issues.push(h);
	const o = [...u].filter(([, h]) => h.l && h.r).map(([h]) => h);
	if ((o.length && s && e.issues.push({ ...s, keys: o }), uu(e))) return e;
	const f = eh(n.value, r.value);
	if (!f.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(f.mergeErrorPath)}`);
	return ((e.value = f.data), e);
}
var qx = ne("$ZodRecord", (e, n) => {
		(wt.init(e, n),
			(e._zod.parse = (r, u) => {
				const s = r.value;
				if (!vu(s)) return (r.issues.push({ expected: "record", code: "invalid_type", input: s, inst: e }), r);
				const o = [],
					f = n.keyType._zod.values;
				if (f) {
					r.value = {};
					const h = new Set();
					for (const v of f)
						if (typeof v == "string" || typeof v == "number" || typeof v == "symbol") {
							h.add(typeof v == "number" ? v.toString() : v);
							const g = n.keyType._zod.run({ value: v, issues: [] }, u);
							if (g instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
							if (g.issues.length) {
								r.issues.push({
									code: "invalid_key",
									origin: "record",
									issues: g.issues.map((p) => er(p, u, Wi())),
									input: v,
									path: [v],
									inst: e,
								});
								continue;
							}
							const _ = g.value,
								b = n.valueType._zod.run({ value: s[v], issues: [] }, u);
							b instanceof Promise
								? o.push(
										b.then((p) => {
											(p.issues.length && r.issues.push(...lu(v, p.issues)), (r.value[_] = p.value));
										}),
									)
								: (b.issues.length && r.issues.push(...lu(v, b.issues)), (r.value[_] = b.value));
						}
					let m;
					for (const v in s) h.has(v) || ((m = m ?? []), m.push(v));
					m && m.length > 0 && r.issues.push({ code: "unrecognized_keys", input: s, inst: e, keys: m });
				} else {
					r.value = {};
					for (const h of Reflect.ownKeys(s)) {
						if (h === "__proto__" || !Object.prototype.propertyIsEnumerable.call(s, h)) continue;
						let m = n.keyType._zod.run({ value: h, issues: [] }, u);
						if (m instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
						if (typeof h == "string" && tb.test(h) && m.issues.length) {
							const g = n.keyType._zod.run({ value: Number(h), issues: [] }, u);
							if (g instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
							g.issues.length === 0 && (m = g);
						}
						if (m.issues.length) {
							n.mode === "loose"
								? (r.value[h] = s[h])
								: r.issues.push({
										code: "invalid_key",
										origin: "record",
										issues: m.issues.map((g) => er(g, u, Wi())),
										input: h,
										path: [h],
										inst: e,
									});
							continue;
						}
						const v = n.valueType._zod.run({ value: s[h], issues: [] }, u);
						v instanceof Promise
							? o.push(
									v.then((g) => {
										(g.issues.length && r.issues.push(...lu(h, g.issues)), (r.value[m.value] = g.value));
									}),
								)
							: (v.issues.length && r.issues.push(...lu(h, v.issues)), (r.value[m.value] = v.value));
					}
				}
				return o.length ? Promise.all(o).then(() => r) : r;
			}));
	}),
	Ux = ne("$ZodEnum", (e, n) => {
		wt.init(e, n);
		const r = Qp(n.entries),
			u = new Set(r);
		((e._zod.values = u),
			(e._zod.pattern = new RegExp(
				`^(${r
					.filter((s) => KE.has(typeof s))
					.map((s) => (typeof s == "string" ? gu(s) : s.toString()))
					.join("|")})$`,
			)),
			(e._zod.parse = (s, o) => {
				const f = s.value;
				return (u.has(f) || s.issues.push({ code: "invalid_value", values: r, input: f, inst: e }), s);
			}));
	}),
	$x = ne("$ZodLiteral", (e, n) => {
		if ((wt.init(e, n), n.values.length === 0)) throw new Error("Cannot create literal schema with no valid values");
		const r = new Set(n.values);
		((e._zod.values = r),
			(e._zod.pattern = new RegExp(
				`^(${n.values.map((u) => (typeof u == "string" ? gu(u) : u ? gu(u.toString()) : String(u))).join("|")})$`,
			)),
			(e._zod.parse = (u, s) => {
				const o = u.value;
				return (r.has(o) || u.issues.push({ code: "invalid_value", values: n.values, input: o, inst: e }), u);
			}));
	}),
	Bx = ne("$ZodTransform", (e, n) => {
		(wt.init(e, n),
			(e._zod.optin = "optional"),
			(e._zod.parse = (r, u) => {
				if (u.direction === "backward") throw new Pp(e.constructor.name);
				const s = n.transform(r.value, r);
				if (u.async)
					return (s instanceof Promise ? s : Promise.resolve(s)).then((o) => ((r.value = o), (r.fallback = !0), r));
				if (s instanceof Promise) throw new cu();
				return ((r.value = s), (r.fallback = !0), r);
			}));
	});
function E0(e, n) {
	return n === void 0 && (e.issues.length || e.fallback) ? { issues: [], value: void 0 } : e;
}
var ob = ne("$ZodOptional", (e, n) => {
		(wt.init(e, n),
			(e._zod.optin = "optional"),
			(e._zod.optout = "optional"),
			ut(e._zod, "values", () => (n.innerType._zod.values ? new Set([...n.innerType._zod.values, void 0]) : void 0)),
			ut(e._zod, "pattern", () => {
				const r = n.innerType._zod.pattern;
				return r ? new RegExp(`^(${bh(r.source)})?$`) : void 0;
			}),
			(e._zod.parse = (r, u) => {
				if (n.innerType._zod.optin === "optional") {
					const s = r.value,
						o = n.innerType._zod.run(r, u);
					return o instanceof Promise ? o.then((f) => E0(f, s)) : E0(o, s);
				}
				return r.value === void 0 ? r : n.innerType._zod.run(r, u);
			}));
	}),
	Ix = ne("$ZodExactOptional", (e, n) => {
		(ob.init(e, n),
			ut(e._zod, "values", () => n.innerType._zod.values),
			ut(e._zod, "pattern", () => n.innerType._zod.pattern),
			(e._zod.parse = (r, u) => n.innerType._zod.run(r, u)));
	}),
	Vx = ne("$ZodNullable", (e, n) => {
		(wt.init(e, n),
			ut(e._zod, "optin", () => n.innerType._zod.optin),
			ut(e._zod, "optout", () => n.innerType._zod.optout),
			ut(e._zod, "pattern", () => {
				const r = n.innerType._zod.pattern;
				return r ? new RegExp(`^(${bh(r.source)}|null)$`) : void 0;
			}),
			ut(e._zod, "values", () => (n.innerType._zod.values ? new Set([...n.innerType._zod.values, null]) : void 0)),
			(e._zod.parse = (r, u) => (r.value === null ? r : n.innerType._zod.run(r, u))));
	}),
	Zx = ne("$ZodDefault", (e, n) => {
		(wt.init(e, n),
			(e._zod.optin = "optional"),
			ut(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (r, u) => {
				if (u.direction === "backward") return n.innerType._zod.run(r, u);
				if (r.value === void 0) return ((r.value = n.defaultValue), r);
				const s = n.innerType._zod.run(r, u);
				return s instanceof Promise ? s.then((o) => T0(o, n)) : T0(s, n);
			}));
	});
function T0(e, n) {
	return (e.value === void 0 && (e.value = n.defaultValue), e);
}
var Hx = ne("$ZodPrefault", (e, n) => {
		(wt.init(e, n),
			(e._zod.optin = "optional"),
			ut(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (r, u) => (
				u.direction === "backward" || (r.value === void 0 && (r.value = n.defaultValue)),
				n.innerType._zod.run(r, u)
			)));
	}),
	Px = ne("$ZodNonOptional", (e, n) => {
		(wt.init(e, n),
			ut(e._zod, "values", () => {
				const r = n.innerType._zod.values;
				return r ? new Set([...r].filter((u) => u !== void 0)) : void 0;
			}),
			(e._zod.parse = (r, u) => {
				const s = n.innerType._zod.run(r, u);
				return s instanceof Promise ? s.then((o) => x0(o, e)) : x0(s, e);
			}));
	});
function x0(e, n) {
	return (
		!e.issues.length &&
			e.value === void 0 &&
			e.issues.push({ code: "invalid_type", expected: "nonoptional", input: e.value, inst: n }),
		e
	);
}
var Qx = ne("$ZodCatch", (e, n) => {
		(wt.init(e, n),
			(e._zod.optin = "optional"),
			ut(e._zod, "optout", () => n.innerType._zod.optout),
			ut(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (r, u) => {
				if (u.direction === "backward") return n.innerType._zod.run(r, u);
				const s = n.innerType._zod.run(r, u);
				return s instanceof Promise
					? s.then(
							(o) => (
								(r.value = o.value),
								o.issues.length &&
									((r.value = n.catchValue({
										...r,
										error: { issues: o.issues.map((f) => er(f, u, Wi())) },
										input: r.value,
									})),
									(r.issues = []),
									(r.fallback = !0)),
								r
							),
						)
					: ((r.value = s.value),
						s.issues.length &&
							((r.value = n.catchValue({
								...r,
								error: { issues: s.issues.map((o) => er(o, u, Wi())) },
								input: r.value,
							})),
							(r.issues = []),
							(r.fallback = !0)),
						r);
			}));
	}),
	Yx = ne("$ZodPipe", (e, n) => {
		(wt.init(e, n),
			ut(e._zod, "values", () => n.in._zod.values),
			ut(e._zod, "optin", () => n.in._zod.optin),
			ut(e._zod, "optout", () => n.out._zod.optout),
			ut(e._zod, "propValues", () => n.in._zod.propValues),
			(e._zod.parse = (r, u) => {
				if (u.direction === "backward") {
					const o = n.out._zod.run(r, u);
					return o instanceof Promise ? o.then((f) => uo(f, n.in, u)) : uo(o, n.in, u);
				}
				const s = n.in._zod.run(r, u);
				return s instanceof Promise ? s.then((o) => uo(o, n.out, u)) : uo(s, n.out, u);
			}));
	});
function uo(e, n, r) {
	return e.issues.length
		? ((e.aborted = !0), e)
		: n._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, r);
}
var Kx = ne("$ZodReadonly", (e, n) => {
	(wt.init(e, n),
		ut(e._zod, "propValues", () => n.innerType._zod.propValues),
		ut(e._zod, "values", () => n.innerType._zod.values),
		ut(e._zod, "optin", () => n.innerType?._zod?.optin),
		ut(e._zod, "optout", () => n.innerType?._zod?.optout),
		(e._zod.parse = (r, u) => {
			if (u.direction === "backward") return n.innerType._zod.run(r, u);
			const s = n.innerType._zod.run(r, u);
			return s instanceof Promise ? s.then(A0) : A0(s);
		}));
});
function A0(e) {
	return ((e.value = Object.freeze(e.value)), e);
}
var Gx = ne("$ZodCustom", (e, n) => {
	(An.init(e, n),
		wt.init(e, n),
		(e._zod.parse = (r, u) => r),
		(e._zod.check = (r) => {
			const u = r.value,
				s = n.fn(u);
			if (s instanceof Promise) return s.then((o) => C0(o, r, u, e));
			C0(s, r, u, e);
		}));
});
function C0(e, n, r, u) {
	if (!e) {
		const s = { code: "custom", input: r, inst: u, path: [...(u._zod.def.path ?? [])], continue: !u._zod.def.abort };
		(u._zod.def.params && (s.params = u._zod.def.params), n.issues.push(_l(s)));
	}
}
var R0,
	Fx = class {
		constructor() {
			((this._map = new WeakMap()), (this._idmap = new Map()));
		}
		add(e, ...n) {
			const r = n[0];
			return (this._map.set(e, r), r && typeof r == "object" && "id" in r && this._idmap.set(r.id, e), this);
		}
		clear() {
			return ((this._map = new WeakMap()), (this._idmap = new Map()), this);
		}
		remove(e) {
			const n = this._map.get(e);
			return (n && typeof n == "object" && "id" in n && this._idmap.delete(n.id), this._map.delete(e), this);
		}
		get(e) {
			const n = e._zod.parent;
			if (n) {
				const r = { ...(this.get(n) ?? {}) };
				delete r.id;
				const u = { ...r, ...this._map.get(e) };
				return Object.keys(u).length ? u : void 0;
			}
			return this._map.get(e);
		}
		has(e) {
			return this._map.has(e);
		}
	};
function Xx() {
	return new Fx();
}
(R0 = globalThis).__zod_globalRegistry ?? (R0.__zod_globalRegistry = Xx());
var ml = globalThis.__zod_globalRegistry;
function Jx(e, n) {
	return new e({ type: "string", ...pe(n) });
}
function Wx(e, n) {
	return new e({ type: "string", format: "email", check: "string_format", abort: !1, ...pe(n) });
}
function O0(e, n) {
	return new e({ type: "string", format: "guid", check: "string_format", abort: !1, ...pe(n) });
}
function eA(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, ...pe(n) });
}
function tA(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v4", ...pe(n) });
}
function nA(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v6", ...pe(n) });
}
function iA(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v7", ...pe(n) });
}
function rA(e, n) {
	return new e({ type: "string", format: "url", check: "string_format", abort: !1, ...pe(n) });
}
function aA(e, n) {
	return new e({ type: "string", format: "emoji", check: "string_format", abort: !1, ...pe(n) });
}
function uA(e, n) {
	return new e({ type: "string", format: "nanoid", check: "string_format", abort: !1, ...pe(n) });
}
function lA(e, n) {
	return new e({ type: "string", format: "cuid", check: "string_format", abort: !1, ...pe(n) });
}
function sA(e, n) {
	return new e({ type: "string", format: "cuid2", check: "string_format", abort: !1, ...pe(n) });
}
function oA(e, n) {
	return new e({ type: "string", format: "ulid", check: "string_format", abort: !1, ...pe(n) });
}
function cA(e, n) {
	return new e({ type: "string", format: "xid", check: "string_format", abort: !1, ...pe(n) });
}
function fA(e, n) {
	return new e({ type: "string", format: "ksuid", check: "string_format", abort: !1, ...pe(n) });
}
function dA(e, n) {
	return new e({ type: "string", format: "ipv4", check: "string_format", abort: !1, ...pe(n) });
}
function hA(e, n) {
	return new e({ type: "string", format: "ipv6", check: "string_format", abort: !1, ...pe(n) });
}
function mA(e, n) {
	return new e({ type: "string", format: "cidrv4", check: "string_format", abort: !1, ...pe(n) });
}
function vA(e, n) {
	return new e({ type: "string", format: "cidrv6", check: "string_format", abort: !1, ...pe(n) });
}
function gA(e, n) {
	return new e({ type: "string", format: "base64", check: "string_format", abort: !1, ...pe(n) });
}
function yA(e, n) {
	return new e({ type: "string", format: "base64url", check: "string_format", abort: !1, ...pe(n) });
}
function pA(e, n) {
	return new e({ type: "string", format: "e164", check: "string_format", abort: !1, ...pe(n) });
}
function bA(e, n) {
	return new e({ type: "string", format: "jwt", check: "string_format", abort: !1, ...pe(n) });
}
function _A(e, n) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...pe(n),
	});
}
function SA(e, n) {
	return new e({ type: "string", format: "date", check: "string_format", ...pe(n) });
}
function wA(e, n) {
	return new e({ type: "string", format: "time", check: "string_format", precision: null, ...pe(n) });
}
function EA(e, n) {
	return new e({ type: "string", format: "duration", check: "string_format", ...pe(n) });
}
function TA(e, n) {
	return new e({ type: "number", checks: [], ...pe(n) });
}
function xA(e, n) {
	return new e({ type: "number", check: "number_format", abort: !1, format: "safeint", ...pe(n) });
}
function AA(e, n) {
	return new e({ type: "boolean", ...pe(n) });
}
function CA(e) {
	return new e({ type: "unknown" });
}
function RA(e, n) {
	return new e({ type: "never", ...pe(n) });
}
function N0(e, n) {
	return new ib({ check: "less_than", ...pe(n), value: e, inclusive: !1 });
}
function Ed(e, n) {
	return new ib({ check: "less_than", ...pe(n), value: e, inclusive: !0 });
}
function k0(e, n) {
	return new rb({ check: "greater_than", ...pe(n), value: e, inclusive: !1 });
}
function Td(e, n) {
	return new rb({ check: "greater_than", ...pe(n), value: e, inclusive: !0 });
}
function M0(e, n) {
	return new ZT({ check: "multiple_of", ...pe(n), value: e });
}
function cb(e, n) {
	return new PT({ check: "max_length", ...pe(n), maximum: e });
}
function Ao(e, n) {
	return new QT({ check: "min_length", ...pe(n), minimum: e });
}
function fb(e, n) {
	return new YT({ check: "length_equals", ...pe(n), length: e });
}
function OA(e, n) {
	return new KT({ check: "string_format", format: "regex", ...pe(n), pattern: e });
}
function NA(e) {
	return new GT({ check: "string_format", format: "lowercase", ...pe(e) });
}
function kA(e) {
	return new FT({ check: "string_format", format: "uppercase", ...pe(e) });
}
function MA(e, n) {
	return new XT({ check: "string_format", format: "includes", ...pe(n), includes: e });
}
function zA(e, n) {
	return new JT({ check: "string_format", format: "starts_with", ...pe(n), prefix: e });
}
function DA(e, n) {
	return new WT({ check: "string_format", format: "ends_with", ...pe(n), suffix: e });
}
function _u(e) {
	return new ex({ check: "overwrite", tx: e });
}
function jA(e) {
	return _u((n) => n.normalize(e));
}
function LA() {
	return _u((e) => e.trim());
}
function qA() {
	return _u((e) => e.toLowerCase());
}
function UA() {
	return _u((e) => e.toUpperCase());
}
function $A() {
	return _u((e) => QE(e));
}
function BA(e, n, r) {
	return new e({ type: "array", element: n, ...pe(r) });
}
function IA(e, n, r) {
	return new e({ type: "custom", check: "custom", fn: n, ...pe(r) });
}
function VA(e, n) {
	const r = ZA(
		(u) => (
			(u.addIssue = (s) => {
				if (typeof s == "string") u.issues.push(_l(s, u.value, r._zod.def));
				else {
					const o = s;
					(o.fatal && (o.continue = !1),
						o.code ?? (o.code = "custom"),
						o.input ?? (o.input = u.value),
						o.inst ?? (o.inst = r),
						o.continue ?? (o.continue = !r._zod.def.abort),
						u.issues.push(_l(o)));
				}
			}),
			e(u.value, u)
		),
		n,
	);
	return r;
}
function ZA(e, n) {
	const r = new An({ check: "custom", ...pe(n) });
	return ((r._zod.check = e), r);
}
function db(e) {
	let n = e?.target ?? "draft-2020-12";
	return (
		n === "draft-4" && (n = "draft-04"),
		n === "draft-7" && (n = "draft-07"),
		{
			processors: e.processors ?? {},
			metadataRegistry: e?.metadata ?? ml,
			target: n,
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
function Ht(e, n, r = { path: [], schemaPath: [] }) {
	var u;
	const s = e._zod.def,
		o = n.seen.get(e);
	if (o) return (o.count++, r.schemaPath.includes(e) && (o.cycle = r.path), o.schema);
	const f = { schema: {}, count: 1, cycle: void 0, path: r.path };
	n.seen.set(e, f);
	const h = e._zod.toJSONSchema?.();
	if (h) f.schema = h;
	else {
		const v = { ...r, schemaPath: [...r.schemaPath, e], path: r.path };
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(n, f.schema, v);
		else {
			const _ = f.schema,
				b = n.processors[s.type];
			if (!b) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${s.type}`);
			b(e, n, _, v);
		}
		const g = e._zod.parent;
		g && (f.ref || (f.ref = g), Ht(g, n, v), (n.seen.get(g).isParent = !0));
	}
	const m = n.metadataRegistry.get(e);
	return (
		m && Object.assign(f.schema, m),
		n.io === "input" && hn(e) && (delete f.schema.examples, delete f.schema.default),
		n.io === "input" && "_prefault" in f.schema && ((u = f.schema).default ?? (u.default = f.schema._prefault)),
		delete f.schema._prefault,
		n.seen.get(e).schema
	);
}
function hb(e, n) {
	const r = e.seen.get(n);
	if (!r) throw new Error("Unprocessed schema. This is a bug in Zod.");
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
					_ = e.external.uri ?? ((p) => p);
				if (g) return { ref: _(g) };
				const b = f[1].defId ?? f[1].schema.id ?? `schema${e.counter++}`;
				return ((f[1].defId = b), { defId: b, ref: `${_("__shared")}#/${h}/${b}` });
			}
			if (f[1] === r) return { ref: "#" };
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
			for (const _ in g) delete g[_];
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
		if (n === f[0]) {
			o(f);
			continue;
		}
		if (e.external) {
			const m = e.external.registry.get(f[0])?.id;
			if (n !== f[0] && m) {
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
function mb(e, n) {
	const r = e.seen.get(n);
	if (!r) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const u = (h) => {
		const m = e.seen.get(h);
		if (m.ref === null) return;
		const v = m.def ?? m.schema,
			g = { ...v },
			_ = m.ref;
		if (((m.ref = null), _)) {
			u(_);
			const p = e.seen.get(_),
				E = p.schema;
			if (
				(E.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0")
					? ((v.allOf = v.allOf ?? []), v.allOf.push(E))
					: Object.assign(v, E),
				Object.assign(v, g),
				h._zod.parent === _)
			)
				for (const x in v) x === "$ref" || x === "allOf" || x in g || delete v[x];
			if (E.$ref && p.def)
				for (const x in v)
					x === "$ref" ||
						x === "allOf" ||
						(x in p.def && JSON.stringify(v[x]) === JSON.stringify(p.def[x]) && delete v[x]);
		}
		const b = h._zod.parent;
		if (b && b !== _) {
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
		const h = e.external.registry.get(n)?.id;
		if (!h) throw new Error("Schema is missing an `id` property");
		s.$id = e.external.uri(h);
	}
	Object.assign(s, r.def ?? r.schema);
	const o = e.metadataRegistry.get(n)?.id;
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
					...n["~standard"],
					jsonSchema: { input: Co(n, "input", e.processors), output: Co(n, "output", e.processors) },
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
function hn(e, n) {
	const r = n ?? { seen: new Set() };
	if (r.seen.has(e)) return !1;
	r.seen.add(e);
	const u = e._zod.def;
	if (u.type === "transform") return !0;
	if (u.type === "array") return hn(u.element, r);
	if (u.type === "set") return hn(u.valueType, r);
	if (u.type === "lazy") return hn(u.getter(), r);
	if (
		u.type === "promise" ||
		u.type === "optional" ||
		u.type === "nonoptional" ||
		u.type === "nullable" ||
		u.type === "readonly" ||
		u.type === "default" ||
		u.type === "prefault"
	)
		return hn(u.innerType, r);
	if (u.type === "intersection") return hn(u.left, r) || hn(u.right, r);
	if (u.type === "record" || u.type === "map") return hn(u.keyType, r) || hn(u.valueType, r);
	if (u.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : hn(u.in, r) || hn(u.out, r);
	if (u.type === "object") {
		for (const s in u.shape) if (hn(u.shape[s], r)) return !0;
		return !1;
	}
	if (u.type === "union") {
		for (const s of u.options) if (hn(s, r)) return !0;
		return !1;
	}
	if (u.type === "tuple") {
		for (const s of u.items) if (hn(s, r)) return !0;
		return !!(u.rest && hn(u.rest, r));
	}
	return !1;
}
var HA =
		(e, n = {}) =>
		(r) => {
			const u = db({ ...r, processors: n });
			return (Ht(e, u), hb(u, e), mb(u, e));
		},
	Co =
		(e, n, r = {}) =>
		(u) => {
			const { libraryOptions: s, target: o } = u ?? {},
				f = db({ ...(s ?? {}), target: o, io: n, processors: r });
			return (Ht(e, f), hb(f, e), mb(f, e));
		},
	PA = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" },
	QA = (e, n, r, u) => {
		const s = r;
		s.type = "string";
		const { minimum: o, maximum: f, format: h, patterns: m, contentEncoding: v } = e._zod.bag;
		if (
			(typeof o == "number" && (s.minLength = o),
			typeof f == "number" && (s.maxLength = f),
			h && ((s.format = PA[h] ?? h), s.format === "" && delete s.format, h === "time" && delete s.format),
			v && (s.contentEncoding = v),
			m && m.size > 0)
		) {
			const g = [...m];
			g.length === 1
				? (s.pattern = g[0].source)
				: g.length > 1 &&
					(s.allOf = [
						...g.map((_) => ({
							...(n.target === "draft-07" || n.target === "draft-04" || n.target === "openapi-3.0"
								? { type: "string" }
								: {}),
							pattern: _.source,
						})),
					]);
		}
	},
	YA = (e, n, r, u) => {
		const s = r,
			{ minimum: o, maximum: f, format: h, multipleOf: m, exclusiveMaximum: v, exclusiveMinimum: g } = e._zod.bag;
		typeof h == "string" && h.includes("int") ? (s.type = "integer") : (s.type = "number");
		const _ = typeof g == "number" && g >= (o ?? Number.NEGATIVE_INFINITY),
			b = typeof v == "number" && v <= (f ?? Number.POSITIVE_INFINITY),
			p = n.target === "draft-04" || n.target === "openapi-3.0";
		(_
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
	KA = (e, n, r, u) => {
		r.type = "boolean";
	},
	GA = (e, n, r, u) => {
		r.not = {};
	},
	FA = (e, n, r, u) => {},
	XA = (e, n, r, u) => {
		const s = e._zod.def,
			o = Qp(s.entries);
		(o.every((f) => typeof f == "number") && (r.type = "number"),
			o.every((f) => typeof f == "string") && (r.type = "string"),
			(r.enum = o));
	},
	JA = (e, n, r, u) => {
		const s = e._zod.def,
			o = [];
		for (const f of s.values)
			if (f === void 0) {
				if (n.unrepresentable === "throw") throw new Error("Literal `undefined` cannot be represented in JSON Schema");
			} else if (typeof f == "bigint") {
				if (n.unrepresentable === "throw") throw new Error("BigInt literals cannot be represented in JSON Schema");
				o.push(Number(f));
			} else o.push(f);
		if (o.length !== 0)
			if (o.length === 1) {
				const f = o[0];
				((r.type = f === null ? "null" : typeof f),
					n.target === "draft-04" || n.target === "openapi-3.0" ? (r.enum = [f]) : (r.const = f));
			} else
				(o.every((f) => typeof f == "number") && (r.type = "number"),
					o.every((f) => typeof f == "string") && (r.type = "string"),
					o.every((f) => typeof f == "boolean") && (r.type = "boolean"),
					o.every((f) => f === null) && (r.type = "null"),
					(r.enum = o));
	},
	WA = (e, n, r, u) => {
		if (n.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
	},
	eC = (e, n, r, u) => {
		if (n.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
	},
	tC = (e, n, r, u) => {
		const s = r,
			o = e._zod.def,
			{ minimum: f, maximum: h } = e._zod.bag;
		(typeof f == "number" && (s.minItems = f),
			typeof h == "number" && (s.maxItems = h),
			(s.type = "array"),
			(s.items = Ht(o.element, n, { ...u, path: [...u.path, "items"] })));
	},
	nC = (e, n, r, u) => {
		const s = r,
			o = e._zod.def;
		((s.type = "object"), (s.properties = {}));
		const f = o.shape;
		for (const v in f) s.properties[v] = Ht(f[v], n, { ...u, path: [...u.path, "properties", v] });
		const h = new Set(Object.keys(f)),
			m = new Set(
				[...h].filter((v) => {
					const g = o.shape[v]._zod;
					return n.io === "input" ? g.optin === void 0 : g.optout === void 0;
				}),
			);
		(m.size > 0 && (s.required = Array.from(m)),
			o.catchall?._zod.def.type === "never"
				? (s.additionalProperties = !1)
				: o.catchall
					? o.catchall &&
						(s.additionalProperties = Ht(o.catchall, n, { ...u, path: [...u.path, "additionalProperties"] }))
					: n.io === "output" && (s.additionalProperties = !1));
	},
	iC = (e, n, r, u) => {
		const s = e._zod.def,
			o = s.inclusive === !1,
			f = s.options.map((h, m) => Ht(h, n, { ...u, path: [...u.path, o ? "oneOf" : "anyOf", m] }));
		o ? (r.oneOf = f) : (r.anyOf = f);
	},
	rC = (e, n, r, u) => {
		const s = e._zod.def,
			o = Ht(s.left, n, { ...u, path: [...u.path, "allOf", 0] }),
			f = Ht(s.right, n, { ...u, path: [...u.path, "allOf", 1] }),
			h = (m) => "allOf" in m && Object.keys(m).length === 1;
		r.allOf = [...(h(o) ? o.allOf : [o]), ...(h(f) ? f.allOf : [f])];
	},
	aC = (e, n, r, u) => {
		const s = r,
			o = e._zod.def;
		s.type = "object";
		const f = o.keyType,
			h = f._zod.bag?.patterns;
		if (o.mode === "loose" && h && h.size > 0) {
			const v = Ht(o.valueType, n, { ...u, path: [...u.path, "patternProperties", "*"] });
			s.patternProperties = {};
			for (const g of h) s.patternProperties[g.source] = v;
		} else
			((n.target === "draft-07" || n.target === "draft-2020-12") &&
				(s.propertyNames = Ht(o.keyType, n, { ...u, path: [...u.path, "propertyNames"] })),
				(s.additionalProperties = Ht(o.valueType, n, { ...u, path: [...u.path, "additionalProperties"] })));
		const m = f._zod.values;
		if (m) {
			const v = [...m].filter((g) => typeof g == "string" || typeof g == "number");
			v.length > 0 && (s.required = v);
		}
	},
	uC = (e, n, r, u) => {
		const s = e._zod.def,
			o = Ht(s.innerType, n, u),
			f = n.seen.get(e);
		n.target === "openapi-3.0" ? ((f.ref = s.innerType), (r.nullable = !0)) : (r.anyOf = [o, { type: "null" }]);
	},
	lC = (e, n, r, u) => {
		const s = e._zod.def;
		Ht(s.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = s.innerType;
	},
	sC = (e, n, r, u) => {
		const s = e._zod.def;
		Ht(s.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = s.innerType), (r.default = JSON.parse(JSON.stringify(s.defaultValue))));
	},
	oC = (e, n, r, u) => {
		const s = e._zod.def;
		Ht(s.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = s.innerType), n.io === "input" && (r._prefault = JSON.parse(JSON.stringify(s.defaultValue))));
	},
	cC = (e, n, r, u) => {
		const s = e._zod.def;
		Ht(s.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = s.innerType;
		let f;
		try {
			f = s.catchValue(void 0);
		} catch {
			throw new Error("Dynamic catch values are not supported in JSON Schema");
		}
		r.default = f;
	},
	fC = (e, n, r, u) => {
		const s = e._zod.def,
			o = s.in._zod.traits.has("$ZodTransform"),
			f = n.io === "input" ? (o ? s.out : s.in) : s.out;
		Ht(f, n, u);
		const h = n.seen.get(e);
		h.ref = f;
	},
	dC = (e, n, r, u) => {
		const s = e._zod.def;
		Ht(s.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = s.innerType), (r.readOnly = !0));
	},
	vb = (e, n, r, u) => {
		const s = e._zod.def;
		Ht(s.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = s.innerType;
	},
	hC = ne("ZodISODateTime", (e, n) => {
		(mx.init(e, n), Tt.init(e, n));
	});
function mC(e) {
	return _A(hC, e);
}
var vC = ne("ZodISODate", (e, n) => {
	(vx.init(e, n), Tt.init(e, n));
});
function gC(e) {
	return SA(vC, e);
}
var yC = ne("ZodISOTime", (e, n) => {
	(gx.init(e, n), Tt.init(e, n));
});
function pC(e) {
	return wA(yC, e);
}
var bC = ne("ZodISODuration", (e, n) => {
	(yx.init(e, n), Tt.init(e, n));
});
function _C(e) {
	return EA(bC, e);
}
var SC = (e, n) => {
		(Fp.init(e, n),
			(e.name = "ZodError"),
			Object.defineProperties(e, {
				format: { value: (r) => uT(e, r) },
				flatten: { value: (r) => aT(e, r) },
				addIssue: {
					value: (r) => {
						(e.issues.push(r), (e.message = JSON.stringify(e.issues, Wd, 2)));
					},
				},
				addIssues: {
					value: (r) => {
						(e.issues.push(...r), (e.message = JSON.stringify(e.issues, Wd, 2)));
					},
				},
				isEmpty: {
					get() {
						return e.issues.length === 0;
					},
				},
			}));
	},
	Wn = ne("ZodError", SC, { Parent: Error }),
	wC = Sh(Wn),
	EC = wh(Wn),
	TC = Uo(Wn),
	xC = $o(Wn),
	AC = oT(Wn),
	CC = cT(Wn),
	RC = fT(Wn),
	OC = dT(Wn),
	NC = hT(Wn),
	kC = mT(Wn),
	MC = vT(Wn),
	zC = gT(Wn),
	z0 = new WeakMap();
function xl(e, n, r) {
	const u = Object.getPrototypeOf(e);
	let s = z0.get(u);
	if ((s || ((s = new Set()), z0.set(u, s)), !s.has(n))) {
		s.add(n);
		for (const o in r) {
			const f = r[o];
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
var Et = ne(
		"ZodType",
		(e, n) => (
			wt.init(e, n),
			Object.assign(e["~standard"], { jsonSchema: { input: Co(e, "input"), output: Co(e, "output") } }),
			(e.toJSONSchema = HA(e, {})),
			(e.def = n),
			(e.type = n.type),
			Object.defineProperty(e, "_def", { value: n }),
			(e.parse = (r, u) => wC(e, r, u, { callee: e.parse })),
			(e.safeParse = (r, u) => TC(e, r, u)),
			(e.parseAsync = async (r, u) => EC(e, r, u, { callee: e.parseAsync })),
			(e.safeParseAsync = async (r, u) => xC(e, r, u)),
			(e.spa = e.safeParseAsync),
			(e.encode = (r, u) => AC(e, r, u)),
			(e.decode = (r, u) => CC(e, r, u)),
			(e.encodeAsync = async (r, u) => RC(e, r, u)),
			(e.decodeAsync = async (r, u) => OC(e, r, u)),
			(e.safeEncode = (r, u) => NC(e, r, u)),
			(e.safeDecode = (r, u) => kC(e, r, u)),
			(e.safeEncodeAsync = async (r, u) => MC(e, r, u)),
			(e.safeDecodeAsync = async (r, u) => zC(e, r, u)),
			xl(e, "ZodType", {
				check(...r) {
					const u = this.def;
					return this.clone(
						jr(u, {
							checks: [
								...(u.checks ?? []),
								...r.map((s) =>
									typeof s == "function" ? { _zod: { check: s, def: { check: "custom" }, onattach: [] } } : s,
								),
							],
						}),
						{ parent: !0 },
					);
				},
				with(...r) {
					return this.check(...r);
				},
				clone(r, u) {
					return Lr(this, r, u);
				},
				brand() {
					return this;
				},
				register(r, u) {
					return (r.add(this, u), this);
				},
				refine(r, u) {
					return this.check(AR(r, u));
				},
				superRefine(r, u) {
					return this.check(CR(r, u));
				},
				overwrite(r) {
					return this.check(_u(r));
				},
				optional() {
					return q0(this);
				},
				exactOptional() {
					return hR(this);
				},
				nullable() {
					return U0(this);
				},
				nullish() {
					return q0(U0(this));
				},
				nonoptional(r) {
					return bR(this, r);
				},
				array() {
					return fa(this);
				},
				or(r) {
					return xh([this, r]);
				},
				and(r) {
					return lR(this, r);
				},
				transform(r) {
					return $0(this, fR(r));
				},
				default(r) {
					return gR(this, r);
				},
				prefault(r) {
					return pR(this, r);
				},
				catch(r) {
					return SR(this, r);
				},
				pipe(r) {
					return $0(this, r);
				},
				readonly() {
					return TR(this);
				},
				describe(r) {
					const u = this.clone();
					return (ml.add(u, { description: r }), u);
				},
				meta(...r) {
					if (r.length === 0) return ml.get(this);
					const u = this.clone();
					return (ml.add(u, r[0]), u);
				},
				isOptional() {
					return this.safeParse(void 0).success;
				},
				isNullable() {
					return this.safeParse(null).success;
				},
				apply(r) {
					return r(this);
				},
			}),
			Object.defineProperty(e, "description", {
				get() {
					return ml.get(e)?.description;
				},
				configurable: !0,
			}),
			e
		),
	),
	gb = ne("_ZodString", (e, n) => {
		(Eh.init(e, n), Et.init(e, n), (e._zod.processJSONSchema = (u, s, o) => QA(e, u, s, o)));
		const r = e._zod.bag;
		((e.format = r.format ?? null),
			(e.minLength = r.minimum ?? null),
			(e.maxLength = r.maximum ?? null),
			xl(e, "_ZodString", {
				regex(...u) {
					return this.check(OA(...u));
				},
				includes(...u) {
					return this.check(MA(...u));
				},
				startsWith(...u) {
					return this.check(zA(...u));
				},
				endsWith(...u) {
					return this.check(DA(...u));
				},
				min(...u) {
					return this.check(Ao(...u));
				},
				max(...u) {
					return this.check(cb(...u));
				},
				length(...u) {
					return this.check(fb(...u));
				},
				nonempty(...u) {
					return this.check(Ao(1, ...u));
				},
				lowercase(u) {
					return this.check(NA(u));
				},
				uppercase(u) {
					return this.check(kA(u));
				},
				trim() {
					return this.check(LA());
				},
				normalize(...u) {
					return this.check(jA(...u));
				},
				toLowerCase() {
					return this.check(qA());
				},
				toUpperCase() {
					return this.check(UA());
				},
				slugify() {
					return this.check($A());
				},
			}));
	}),
	DC = ne("ZodString", (e, n) => {
		(Eh.init(e, n),
			gb.init(e, n),
			(e.email = (r) => e.check(Wx(jC, r))),
			(e.url = (r) => e.check(rA(LC, r))),
			(e.jwt = (r) => e.check(bA(XC, r))),
			(e.emoji = (r) => e.check(aA(qC, r))),
			(e.guid = (r) => e.check(O0(D0, r))),
			(e.uuid = (r) => e.check(eA(lo, r))),
			(e.uuidv4 = (r) => e.check(tA(lo, r))),
			(e.uuidv6 = (r) => e.check(nA(lo, r))),
			(e.uuidv7 = (r) => e.check(iA(lo, r))),
			(e.nanoid = (r) => e.check(uA(UC, r))),
			(e.guid = (r) => e.check(O0(D0, r))),
			(e.cuid = (r) => e.check(lA($C, r))),
			(e.cuid2 = (r) => e.check(sA(BC, r))),
			(e.ulid = (r) => e.check(oA(IC, r))),
			(e.base64 = (r) => e.check(gA(KC, r))),
			(e.base64url = (r) => e.check(yA(GC, r))),
			(e.xid = (r) => e.check(cA(VC, r))),
			(e.ksuid = (r) => e.check(fA(ZC, r))),
			(e.ipv4 = (r) => e.check(dA(HC, r))),
			(e.ipv6 = (r) => e.check(hA(PC, r))),
			(e.cidrv4 = (r) => e.check(mA(QC, r))),
			(e.cidrv6 = (r) => e.check(vA(YC, r))),
			(e.e164 = (r) => e.check(pA(FC, r))),
			(e.datetime = (r) => e.check(mC(r))),
			(e.date = (r) => e.check(gC(r))),
			(e.time = (r) => e.check(pC(r))),
			(e.duration = (r) => e.check(_C(r))));
	});
function St(e) {
	return Jx(DC, e);
}
var Tt = ne("ZodStringFormat", (e, n) => {
		(pt.init(e, n), gb.init(e, n));
	}),
	jC = ne("ZodEmail", (e, n) => {
		(ax.init(e, n), Tt.init(e, n));
	}),
	D0 = ne("ZodGUID", (e, n) => {
		(ix.init(e, n), Tt.init(e, n));
	}),
	lo = ne("ZodUUID", (e, n) => {
		(rx.init(e, n), Tt.init(e, n));
	}),
	LC = ne("ZodURL", (e, n) => {
		(ux.init(e, n), Tt.init(e, n));
	}),
	qC = ne("ZodEmoji", (e, n) => {
		(lx.init(e, n), Tt.init(e, n));
	}),
	UC = ne("ZodNanoID", (e, n) => {
		(sx.init(e, n), Tt.init(e, n));
	}),
	$C = ne("ZodCUID", (e, n) => {
		(ox.init(e, n), Tt.init(e, n));
	}),
	BC = ne("ZodCUID2", (e, n) => {
		(cx.init(e, n), Tt.init(e, n));
	}),
	IC = ne("ZodULID", (e, n) => {
		(fx.init(e, n), Tt.init(e, n));
	}),
	VC = ne("ZodXID", (e, n) => {
		(dx.init(e, n), Tt.init(e, n));
	}),
	ZC = ne("ZodKSUID", (e, n) => {
		(hx.init(e, n), Tt.init(e, n));
	}),
	HC = ne("ZodIPv4", (e, n) => {
		(px.init(e, n), Tt.init(e, n));
	}),
	PC = ne("ZodIPv6", (e, n) => {
		(bx.init(e, n), Tt.init(e, n));
	}),
	QC = ne("ZodCIDRv4", (e, n) => {
		(_x.init(e, n), Tt.init(e, n));
	}),
	YC = ne("ZodCIDRv6", (e, n) => {
		(Sx.init(e, n), Tt.init(e, n));
	}),
	KC = ne("ZodBase64", (e, n) => {
		(wx.init(e, n), Tt.init(e, n));
	}),
	GC = ne("ZodBase64URL", (e, n) => {
		(Tx.init(e, n), Tt.init(e, n));
	}),
	FC = ne("ZodE164", (e, n) => {
		(xx.init(e, n), Tt.init(e, n));
	}),
	XC = ne("ZodJWT", (e, n) => {
		(Cx.init(e, n), Tt.init(e, n));
	}),
	yb = ne("ZodNumber", (e, n) => {
		(ub.init(e, n),
			Et.init(e, n),
			(e._zod.processJSONSchema = (u, s, o) => YA(e, u, s, o)),
			xl(e, "ZodNumber", {
				gt(u, s) {
					return this.check(k0(u, s));
				},
				gte(u, s) {
					return this.check(Td(u, s));
				},
				min(u, s) {
					return this.check(Td(u, s));
				},
				lt(u, s) {
					return this.check(N0(u, s));
				},
				lte(u, s) {
					return this.check(Ed(u, s));
				},
				max(u, s) {
					return this.check(Ed(u, s));
				},
				int(u) {
					return this.check(j0(u));
				},
				safe(u) {
					return this.check(j0(u));
				},
				positive(u) {
					return this.check(k0(0, u));
				},
				nonnegative(u) {
					return this.check(Td(0, u));
				},
				negative(u) {
					return this.check(N0(0, u));
				},
				nonpositive(u) {
					return this.check(Ed(0, u));
				},
				multipleOf(u, s) {
					return this.check(M0(u, s));
				},
				step(u, s) {
					return this.check(M0(u, s));
				},
				finite() {
					return this;
				},
			}));
		const r = e._zod.bag;
		((e.minValue =
			Math.max(r.minimum ?? Number.NEGATIVE_INFINITY, r.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null),
			(e.maxValue =
				Math.min(r.maximum ?? Number.POSITIVE_INFINITY, r.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null),
			(e.isInt = (r.format ?? "").includes("int") || Number.isSafeInteger(r.multipleOf ?? 0.5)),
			(e.isFinite = !0),
			(e.format = r.format ?? null));
	});
function li(e) {
	return TA(yb, e);
}
var JC = ne("ZodNumberFormat", (e, n) => {
	(Rx.init(e, n), yb.init(e, n));
});
function j0(e) {
	return xA(JC, e);
}
var WC = ne("ZodBoolean", (e, n) => {
	(Ox.init(e, n), Et.init(e, n), (e._zod.processJSONSchema = (r, u, s) => KA(e, r, u, s)));
});
function Th(e) {
	return AA(WC, e);
}
var eR = ne("ZodUnknown", (e, n) => {
	(Nx.init(e, n), Et.init(e, n), (e._zod.processJSONSchema = (r, u, s) => FA(e, r, u, s)));
});
function Ro() {
	return CA(eR);
}
var tR = ne("ZodNever", (e, n) => {
	(kx.init(e, n), Et.init(e, n), (e._zod.processJSONSchema = (r, u, s) => GA(e, r, u, s)));
});
function nR(e) {
	return RA(tR, e);
}
var iR = ne("ZodArray", (e, n) => {
	(Mx.init(e, n),
		Et.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => tC(e, r, u, s)),
		(e.element = n.element),
		xl(e, "ZodArray", {
			min(r, u) {
				return this.check(Ao(r, u));
			},
			nonempty(r) {
				return this.check(Ao(1, r));
			},
			max(r, u) {
				return this.check(cb(r, u));
			},
			length(r, u) {
				return this.check(fb(r, u));
			},
			unwrap() {
				return this.element;
			},
		}));
});
function fa(e, n) {
	return BA(iR, e, n);
}
var rR = ne("ZodObject", (e, n) => {
	(Dx.init(e, n),
		Et.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => nC(e, r, u, s)),
		ut(e, "shape", () => n.shape),
		xl(e, "ZodObject", {
			keyof() {
				return sR(Object.keys(this._zod.def.shape));
			},
			catchall(r) {
				return this.clone({ ...this._zod.def, catchall: r });
			},
			passthrough() {
				return this.clone({ ...this._zod.def, catchall: Ro() });
			},
			loose() {
				return this.clone({ ...this._zod.def, catchall: Ro() });
			},
			strict() {
				return this.clone({ ...this._zod.def, catchall: nR() });
			},
			strip() {
				return this.clone({ ...this._zod.def, catchall: void 0 });
			},
			extend(r) {
				return WE(this, r);
			},
			safeExtend(r) {
				return eT(this, r);
			},
			merge(r) {
				return tT(this, r);
			},
			pick(r) {
				return XE(this, r);
			},
			omit(r) {
				return JE(this, r);
			},
			partial(...r) {
				return nT(bb, this, r[0]);
			},
			required(...r) {
				return iT(_b, this, r[0]);
			},
		}));
});
function Ln(e, n) {
	const r = { type: "object", shape: e ?? {}, ...pe(n) };
	return new rR(r);
}
var aR = ne("ZodUnion", (e, n) => {
	(jx.init(e, n), Et.init(e, n), (e._zod.processJSONSchema = (r, u, s) => iC(e, r, u, s)), (e.options = n.options));
});
function xh(e, n) {
	return new aR({ type: "union", options: e, ...pe(n) });
}
var uR = ne("ZodIntersection", (e, n) => {
	(Lx.init(e, n), Et.init(e, n), (e._zod.processJSONSchema = (r, u, s) => rC(e, r, u, s)));
});
function lR(e, n) {
	return new uR({ type: "intersection", left: e, right: n });
}
var L0 = ne("ZodRecord", (e, n) => {
	(qx.init(e, n),
		Et.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => aC(e, r, u, s)),
		(e.keyType = n.keyType),
		(e.valueType = n.valueType));
});
function pb(e, n, r) {
	return !n || !n._zod
		? new L0({ type: "record", keyType: St(), valueType: e, ...pe(n) })
		: new L0({ type: "record", keyType: e, valueType: n, ...pe(r) });
}
var th = ne("ZodEnum", (e, n) => {
	(Ux.init(e, n),
		Et.init(e, n),
		(e._zod.processJSONSchema = (u, s, o) => XA(e, u, s, o)),
		(e.enum = n.entries),
		(e.options = Object.values(n.entries)));
	const r = new Set(Object.keys(n.entries));
	((e.extract = (u, s) => {
		const o = {};
		for (const f of u)
			if (r.has(f)) o[f] = n.entries[f];
			else throw new Error(`Key ${f} not found in enum`);
		return new th({ ...n, checks: [], ...pe(s), entries: o });
	}),
		(e.exclude = (u, s) => {
			const o = { ...n.entries };
			for (const f of u)
				if (r.has(f)) delete o[f];
				else throw new Error(`Key ${f} not found in enum`);
			return new th({ ...n, checks: [], ...pe(s), entries: o });
		}));
});
function sR(e, n) {
	const r = Array.isArray(e) ? Object.fromEntries(e.map((u) => [u, u])) : e;
	return new th({ type: "enum", entries: r, ...pe(n) });
}
var oR = ne("ZodLiteral", (e, n) => {
	($x.init(e, n),
		Et.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => JA(e, r, u, s)),
		(e.values = new Set(n.values)),
		Object.defineProperty(e, "value", {
			get() {
				if (n.values.length > 1)
					throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
				return n.values[0];
			},
		}));
});
function Sl(e, n) {
	return new oR({ type: "literal", values: Array.isArray(e) ? e : [e], ...pe(n) });
}
var cR = ne("ZodTransform", (e, n) => {
	(Bx.init(e, n),
		Et.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => eC(e, r, u, s)),
		(e._zod.parse = (r, u) => {
			if (u.direction === "backward") throw new Pp(e.constructor.name);
			r.addIssue = (o) => {
				if (typeof o == "string") r.issues.push(_l(o, r.value, n));
				else {
					const f = o;
					(f.fatal && (f.continue = !1),
						f.code ?? (f.code = "custom"),
						f.input ?? (f.input = r.value),
						f.inst ?? (f.inst = e),
						r.issues.push(_l(f)));
				}
			};
			const s = n.transform(r.value, r);
			return s instanceof Promise
				? s.then((o) => ((r.value = o), (r.fallback = !0), r))
				: ((r.value = s), (r.fallback = !0), r);
		}));
});
function fR(e) {
	return new cR({ type: "transform", transform: e });
}
var bb = ne("ZodOptional", (e, n) => {
	(ob.init(e, n),
		Et.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => vb(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function q0(e) {
	return new bb({ type: "optional", innerType: e });
}
var dR = ne("ZodExactOptional", (e, n) => {
	(Ix.init(e, n),
		Et.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => vb(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function hR(e) {
	return new dR({ type: "optional", innerType: e });
}
var mR = ne("ZodNullable", (e, n) => {
	(Vx.init(e, n),
		Et.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => uC(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function U0(e) {
	return new mR({ type: "nullable", innerType: e });
}
var vR = ne("ZodDefault", (e, n) => {
	(Zx.init(e, n),
		Et.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => sC(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeDefault = e.unwrap));
});
function gR(e, n) {
	return new vR({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : Kp(n);
		},
	});
}
var yR = ne("ZodPrefault", (e, n) => {
	(Hx.init(e, n),
		Et.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => oC(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function pR(e, n) {
	return new yR({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : Kp(n);
		},
	});
}
var _b = ne("ZodNonOptional", (e, n) => {
	(Px.init(e, n),
		Et.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => lC(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function bR(e, n) {
	return new _b({ type: "nonoptional", innerType: e, ...pe(n) });
}
var _R = ne("ZodCatch", (e, n) => {
	(Qx.init(e, n),
		Et.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => cC(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeCatch = e.unwrap));
});
function SR(e, n) {
	return new _R({ type: "catch", innerType: e, catchValue: typeof n == "function" ? n : () => n });
}
var wR = ne("ZodPipe", (e, n) => {
	(Yx.init(e, n),
		Et.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => fC(e, r, u, s)),
		(e.in = n.in),
		(e.out = n.out));
});
function $0(e, n) {
	return new wR({ type: "pipe", in: e, out: n });
}
var ER = ne("ZodReadonly", (e, n) => {
	(Kx.init(e, n),
		Et.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => dC(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function TR(e) {
	return new ER({ type: "readonly", innerType: e });
}
var xR = ne("ZodCustom", (e, n) => {
	(Gx.init(e, n), Et.init(e, n), (e._zod.processJSONSchema = (r, u, s) => WA(e, r, u, s)));
});
function AR(e, n = {}) {
	return IA(xR, e, n);
}
function CR(e, n) {
	return VA(e, n);
}
var w = zp(qo()),
	RR = HE(),
	su = ["thumbs_up", "heart", "laugh", "wow", "sad", "party", "rocket", "eyes"],
	Sb = { thumbs_up: "👍", heart: "❤️", laugh: "😂", wow: "😮", sad: "😢", party: "🎉", rocket: "🚀", eyes: "👀" },
	wb = {
		thumbs_up: "Thumbs up",
		heart: "Heart",
		laugh: "Laugh",
		wow: "Wow",
		sad: "Sad",
		party: "Party",
		rocket: "Rocket",
		eyes: "Eyes",
	},
	OR = 9999999999999,
	NR = /(?:^|:)(\d{13}):([^:]{1,16})$/;
function yu(e) {
	const n = NR.exec(e);
	return n ? OR - Number(n[1]) : null;
}
var Eb = "p/",
	kR = ["channels", "messages", "replies", "reactions"],
	Ah =
		"Only the people added here can read it — and the organization owner, who can read everything in this workspace.";
function MR(e) {
	const n = crypto.randomUUID();
	return e === "private" ? `${Eb}${n}` : n;
}
function ui(e) {
	return e.startsWith(Eb);
}
function so(e) {
	return `${e}:`;
}
function Ch(e) {
	const n = e.split(":");
	return n.length < 3 || yu(e) === null ? null : n.slice(0, -2).join(":");
}
function Tb(e) {
	return `${e}:`;
}
function zR(e, n) {
	return `${e}:${n}`;
}
function DR(e) {
	const n = e.split(":");
	if (n.length < 4) return null;
	const r = n[n.length - 2];
	if (!su.includes(r)) return null;
	const u = n.slice(0, -2).join(":");
	return yu(u) === null ? null : { targetKey: u, token: r, keyTailUserId: n[n.length - 1] };
}
function Rh(e) {
	const n = e.split(":");
	if (n.length < 5) return null;
	const r = n.slice(0, -2).join(":");
	return yu(r) === null || yu(e) === null ? null : r;
}
function B0(e) {
	return `me:${e}`;
}
function jR(e) {
	return `${e}:read`;
}
function xb(e) {
	const n = e.split(":");
	return n.length !== 3 || n[1] !== "read" || !ui(n[0]) ? null : { channelKey: n[0], keyTailUserId: n[2] };
}
var LR = Ln({
		name: St().min(1).max(64),
		archivedAt: li().nullable(),
		topic: St().max(250).optional(),
		lastMessageAt: li().optional(),
	}),
	qR = Ln({ fileNodeId: St().min(1), name: St().min(1) }),
	UR = Ln({
		text: St(),
		attachments: fa(qR),
		editedAt: li().nullable(),
		deletedAt: li().nullable(),
		mentions: fa(St()).optional(),
	}),
	$R = "Someone with no name yet";
function go(e) {
	return e !== null && e !== "" ? e : $R;
}
function BR(e, n) {
	const r = /(?:^|\s)@([^\s@]*)$/.exec(e.slice(0, n));
	if (r === null) return null;
	const u = r[1] ?? "";
	return { start: n - u.length - 1, query: u };
}
function IR(e, n, r) {
	const u = n.toLowerCase();
	return e
		.filter((s) => s.userId !== r)
		.map((s) => ({ ...s, label: go(s.displayName) }))
		.filter((s) => s.label.toLowerCase().includes(u))
		.sort((s, o) => s.label.localeCompare(o.label));
}
function VR(e, n, r, u) {
	return { text: `${e.slice(0, n)}@${u} ${e.slice(r)}`, caret: n + u.length + 2 };
}
function ZR(e, n) {
	const r = [];
	for (const [u, s] of e) n.includes(`@${s}`) && r.push(u);
	return r;
}
function Ab(e) {
	return e === "not_consented"
		? "This workspace has not allowed Chitchat to read the member list yet. An admin can accept the plugin's current permissions."
		: "The member list is not available right now. You can keep typing.";
}
var HR = Ln({ channels: pb(St(), li()) }),
	PR = Ln({ at: li() }),
	Al = Ln({
		collection: St(),
		key: St().min(1).max(128),
		value: pb(St(), Ro()),
		revision: li(),
		createdBy: St().min(1),
		updatedBy: St(),
		ownership: xh([Sl("shared"), Sl("owned")]),
		createdAt: li(),
		updatedAt: li(),
	});
function QR(e, n) {
	const r = Al.safeParse(e);
	if (!r.success) return null;
	const u = yu(r.data.key);
	if (u === null) return null;
	const s = n.safeParse(r.data.value);
	return s.success
		? {
				key: r.data.key,
				value: s.data,
				revision: r.data.revision,
				createdBy: r.data.createdBy,
				updatedBy: r.data.updatedBy,
				createdAt: r.data.createdAt,
				updatedAt: r.data.updatedAt,
				timestamp: u,
			}
		: null;
}
function I0(e) {
	const n = Al.safeParse(e);
	if (!n.success) return null;
	const r = LR.safeParse(n.data.value);
	return r.success
		? {
				key: n.data.key,
				value: r.data,
				revision: n.data.revision,
				createdBy: n.data.createdBy,
				updatedBy: n.data.updatedBy,
				createdAt: n.data.createdAt,
				updatedAt: n.data.updatedAt,
				timestamp: n.data.createdAt,
			}
		: null;
}
function Oo(e) {
	return QR(e, UR);
}
var YR = Ln({ removed: Sl(!0).optional() });
function KR(e) {
	const n = Al.safeParse(e);
	if (!n.success) return null;
	const r = DR(n.data.key);
	if (r === null) return null;
	const u = YR.safeParse(n.data.value);
	return u.success
		? {
				key: n.data.key,
				targetKey: r.targetKey,
				token: r.token,
				createdBy: n.data.createdBy,
				revision: n.data.revision,
				updatedAt: n.data.updatedAt,
				removed: u.data.removed === !0,
			}
		: null;
}
function GR(e) {
	const n = Al.safeParse(e);
	if (!n.success) return null;
	const r = HR.safeParse(n.data.value);
	return r.success
		? {
				key: n.data.key,
				value: r.data,
				revision: n.data.revision,
				createdBy: n.data.createdBy,
				updatedBy: n.data.updatedBy,
				createdAt: n.data.createdAt,
				updatedAt: n.data.updatedAt,
				timestamp: n.data.createdAt,
			}
		: null;
}
function FR(e) {
	const n = Al.safeParse(e);
	if (!n.success) return null;
	const r = xb(n.data.key);
	if (r === null) return null;
	const u = PR.safeParse(n.data.value);
	return u.success
		? {
				key: n.data.key,
				channelKey: r.channelKey,
				createdBy: n.data.createdBy,
				at: u.data.at,
				revision: n.data.revision,
			}
		: null;
}
function V0(e, n) {
	const r = { ...e.channels };
	for (const [u, s] of Object.entries(n.channels)) {
		const o = r[u];
		r[u] = o === void 0 ? s : Math.max(o, s);
	}
	return { channels: r };
}
function XR(e) {
	const n = new Map();
	for (const r of e.docs) {
		const u = Ch(r.key);
		if (u === null || ui(u) || r.value.deletedAt !== null || r.createdBy === e.selfUserId) continue;
		const s = e.cursorChannels[u];
		if (s !== void 0 && r.timestamp <= s) continue;
		const o = r.value.mentions?.includes(e.selfUserId) ? 1 : 0,
			f = n.get(u);
		f === void 0
			? n.set(u, { unreadCount: 1, mentionCount: o, latest: r })
			: ((f.unreadCount += 1), (f.mentionCount += o), r.timestamp > f.latest.timestamp && (f.latest = r));
	}
	return n;
}
function Io(e, n) {
	const r = n - e;
	return r < 6e4
		? "just now"
		: r < 60 * 6e4
			? `${Math.floor(r / 6e4)}m ago`
			: r < 1440 * 6e4
				? `${Math.floor(r / (60 * 6e4))}h ago`
				: r < 10080 * 6e4
					? new Date(e).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" })
					: new Date(e).toLocaleDateString(void 0, { year: "numeric", month: "short", day: "numeric" });
}
var JR = Ln({
		path: St(),
		name: St(),
		kind: xh([Sl("file"), Sl("folder")]),
		nodeId: St(),
		contentType: St().nullable(),
		updatedAt: li(),
	}),
	WR = Ln({ items: fa(JR), cursor: St().nullable(), isDone: Th() }),
	Cb = Ln({ documents: fa(Ro()), cursor: St().nullable(), isDone: Th() }),
	eO = Ln({
		items: fa(Ln({ fileNodeId: St(), url: St(), expiresAt: li() })),
		errors: fa(Ln({ fileNodeId: St(), message: St() })),
		truncated: Th(),
	});
function Xn(e) {
	return e instanceof Error ? e.message : String(e);
}
function xd(e) {
	const n = new Map();
	let r = 0;
	const u = (o) => {
		const f = n.get(o.key);
		(f === void 0 || o.revision >= f.revision) && n.set(o.key, o);
	};
	return {
		apply_window: (o) => {
			const f = [];
			for (const h of o) {
				const m = e(h);
				if (m === null) {
					r += 1;
					continue;
				}
				(f.push(m), u(m));
			}
			return f;
		},
		apply_local: u,
		get_sorted() {
			return [...n.values()].sort((o, f) => (o.key < f.key ? -1 : o.key > f.key ? 1 : 0));
		},
		dropped_count: () => r,
	};
}
function yo(e) {
	let n = [],
		r = 0;
	return {
		apply_window(u) {
			const s = [];
			for (const o of u) {
				const f = e(o);
				if (f === null) {
					r += 1;
					continue;
				}
				s.push(f);
			}
			return ((n = s), s);
		},
		get_all: () => n,
		dropped_count: () => r,
	};
}
function tO(e, n) {
	const r = new Map();
	for (const s of e) {
		if (s.removed) continue;
		let o = r.get(s.targetKey);
		o === void 0 && ((o = new Map()), r.set(s.targetKey, o));
		let f = o.get(s.token);
		(f === void 0 && ((f = new Set()), o.set(s.token, f)), f.add(s.createdBy));
	}
	const u = new Map();
	for (const [s, o] of r) {
		const f = [];
		for (const h of su) {
			const m = o.get(h);
			m === void 0 || m.size === 0 || f.push({ token: h, count: m.size, reactedByMe: m.has(n) });
		}
		u.set(s, f);
	}
	return u;
}
function nO(e) {
	const n = new Map();
	for (const r of e) {
		const u = Rh(r.key);
		if (u === null) continue;
		const s = n.get(u);
		s === void 0
			? n.set(u, { count: 1, latestAt: r.timestamp })
			: ((s.count += 1), (s.latestAt = Math.max(s.latestAt, r.timestamp)));
	}
	return n;
}
function iO(e, n) {
	return e > 99 && n ? "99+" : String(e);
}
var rO = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
	aO = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (n, r, u) => (u ? u.toUpperCase() : r.toLowerCase())),
	Z0 = (e) => {
		const n = aO(e);
		return n.charAt(0).toUpperCase() + n.slice(1);
	},
	Rb = (...e) =>
		e
			.filter((n, r, u) => !!n && n.trim() !== "" && u.indexOf(n) === r)
			.join(" ")
			.trim(),
	uO = (e) => {
		for (const n in e) if (n.startsWith("aria-") || n === "role" || n === "title") return !0;
	},
	lO = {
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
	sO = (0, w.forwardRef)(
		(
			{
				color: e = "currentColor",
				size: n = 24,
				strokeWidth: r = 2,
				absoluteStrokeWidth: u,
				className: s = "",
				children: o,
				iconNode: f,
				...h
			},
			m,
		) =>
			(0, w.createElement)(
				"svg",
				{
					ref: m,
					...lO,
					width: n,
					height: n,
					stroke: e,
					strokeWidth: u ? (Number(r) * 24) / Number(n) : r,
					className: Rb("lucide", s),
					...(!o && !uO(h) && { "aria-hidden": "true" }),
					...h,
				},
				[...f.map(([v, g]) => (0, w.createElement)(v, g)), ...(Array.isArray(o) ? o : [o])],
			),
	),
	Oh = (e, n) => {
		const r = (0, w.forwardRef)(({ className: u, ...s }, o) =>
			(0, w.createElement)(sO, { ref: o, iconNode: n, className: Rb(`lucide-${rO(Z0(e))}`, `lucide-${e}`, u), ...s }),
		);
		return ((r.displayName = Z0(e)), r);
	},
	oO = [
		["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
		["path", { d: "M12 19V5", key: "x0mq9r" }],
	],
	cO = Oh("arrow-up", oO),
	fO = [
		["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
		["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
		["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
	],
	dO = Oh("ellipsis", fO),
	hO = [
		[
			"path",
			{
				d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
				key: "1miecu",
			},
		],
	],
	mO = Oh("paperclip", hO),
	Su = vO();
function vO() {
	var e;
	return typeof window < "u" && !!((e = window.document) != null && e.createElement);
}
function mt(e) {
	return e ? ("self" in e ? e.document : e.ownerDocument || document) : document;
}
function Ob(e) {
	return e ? ("self" in e ? e.self : mt(e).defaultView || window) : self;
}
function nr(e, n = !1) {
	const { activeElement: r } = mt(e);
	if (!r?.nodeName) return null;
	if (Nh(r) && r.contentDocument) return nr(r.contentDocument.body, n);
	if (n) {
		const u = r.getAttribute("aria-activedescendant");
		if (u) {
			const s = mt(r).getElementById(u);
			if (s) return s;
		}
	}
	return r;
}
function Pt(e, n) {
	return e === n || e.contains(n);
}
function Nh(e) {
	return e.tagName === "IFRAME";
}
function kr(e) {
	const n = e.tagName.toLowerCase();
	return n === "button" ? !0 : n === "input" && e.type ? gO.indexOf(e.type) !== -1 : !1;
}
var gO = ["button", "color", "file", "image", "reset", "submit"];
function Nb(e) {
	if (typeof e.checkVisibility == "function") return e.checkVisibility();
	const n = e;
	return n.offsetWidth > 0 || n.offsetHeight > 0 || e.getClientRects().length > 0;
}
function Ei(e) {
	try {
		const n = e instanceof HTMLInputElement && e.selectionStart !== null,
			r = e.tagName === "TEXTAREA";
		return n || r || !1;
	} catch {
		return !1;
	}
}
function nh(e) {
	return e.isContentEditable || Ei(e);
}
function yO(e) {
	if (Ei(e)) return e.value;
	if (e.isContentEditable) {
		const n = mt(e).createRange();
		return (n.selectNodeContents(e), n.toString());
	}
	return "";
}
function ih(e) {
	let n = 0,
		r = 0;
	if (Ei(e)) ((n = e.selectionStart || 0), (r = e.selectionEnd || 0));
	else if (e.isContentEditable) {
		const u = mt(e).getSelection();
		if (u?.rangeCount && u.anchorNode && Pt(e, u.anchorNode) && u.focusNode && Pt(e, u.focusNode)) {
			const s = u.getRangeAt(0),
				o = s.cloneRange();
			(o.selectNodeContents(e),
				o.setEnd(s.startContainer, s.startOffset),
				(n = o.toString().length),
				o.setEnd(s.endContainer, s.endOffset),
				(r = o.toString().length));
		}
	}
	return { start: n, end: r };
}
function Vo(e, n) {
	const r = ["dialog", "menu", "listbox", "tree", "grid"],
		u = e?.getAttribute("role");
	return u && r.indexOf(u) !== -1 ? u : n;
}
function kb(e, n) {
	var r;
	const u = { menu: "menuitem", listbox: "option", tree: "treeitem" },
		s = Vo(e);
	return s && (r = u[s]) != null ? r : n;
}
function kh(e) {
	if (!e) return null;
	const n = (r) => r === "auto" || r === "scroll";
	if (e.clientHeight && e.scrollHeight > e.clientHeight) {
		const { overflowY: r } = getComputedStyle(e);
		if (n(r)) return e;
	} else if (e.clientWidth && e.scrollWidth > e.clientWidth) {
		const { overflowX: r } = getComputedStyle(e);
		if (n(r)) return e;
	}
	return kh(e.parentElement) || document.scrollingElement || document.body;
}
function Ad(e, ...n) {
	/text|search|password|tel|url/i.test(e.type) && e.setSelectionRange(...n);
}
function Mb(e, n) {
	const r = e.map((s, o) => [o, s]);
	let u = !1;
	return (
		r.sort(([s, o], [f, h]) => {
			const m = n(o),
				v = n(h);
			return m === v || !m || !v ? 0 : pO(m, v) ? (s > f && (u = !0), -1) : (s < f && (u = !0), 1);
		}),
		u ? r.map(([s, o]) => o) : e
	);
}
function pO(e, n) {
	return !!(n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
var bO = { id: null };
function _O(e, n, r = !1) {
	const u = e.findIndex((s) => s.id === n);
	return [...e.slice(u + 1), ...(r ? [bO] : []), ...e.slice(0, u)];
}
function SO(e, n) {
	return e.find((r) => (n ? !r.disabled && r.id !== n : !r.disabled));
}
function Or(e, n) {
	return (n && e.item(n)) || null;
}
function wO(e) {
	const n = [];
	for (const r of e) {
		const u = n.find((s) => {
			var o;
			return ((o = s[0]) == null ? void 0 : o.rowId) === r.rowId;
		});
		u ? u.push(r) : n.push([r]);
	}
	return n;
}
function EO(e, n = !1) {
	if (Ei(e)) e.setSelectionRange(n ? e.value.length : 0, e.value.length);
	else if (e.isContentEditable) {
		const r = mt(e).getSelection();
		(r?.selectAllChildren(e), n && r?.collapseToEnd());
	}
}
var rh = Symbol("FOCUS_SILENTLY");
function TO(e) {
	((e[rh] = !0), e.focus({ preventScroll: !0 }));
}
function xO(e) {
	const n = e[rh];
	return (delete e[rh], n);
}
function gl(e, n, r) {
	if (!n || n === r) return !1;
	const u = e.item(n.id);
	return !(!u || (r && u.element === r));
}
function yl(...e) {}
function zb(e, n) {
	return AO(e) ? e(CO(n) ? n() : n) : e;
}
function AO(e) {
	return typeof e == "function";
}
function CO(e) {
	return typeof e == "function";
}
function tr(e, n) {
	return typeof Object.hasOwn == "function" ? Object.hasOwn(e, n) : Object.prototype.hasOwnProperty.call(e, n);
}
function xn(...e) {
	return (...n) => {
		for (const r of e) typeof r == "function" && r(...n);
	};
}
function Db(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function RO(e, n) {
	const r = { ...e };
	for (const u of n) tr(r, u) && delete r[u];
	return r;
}
function OO(e, n) {
	const r = {};
	for (const u of n) tr(e, u) && (r[u] = e[u]);
	return r;
}
function jb(e) {
	return e;
}
function Qt(e, n) {
	if (!e) throw typeof n != "string" ? new Error("Invariant failed") : new Error(n);
}
function NO(e) {
	return Object.keys(e);
}
function Zo(e, ...n) {
	const r = typeof e == "function" ? e(...n) : e;
	return r == null ? !1 : !r;
}
function Cl(e) {
	return e.disabled || e["aria-disabled"] === !0 || e["aria-disabled"] === "true";
}
function ya(e) {
	const n = {};
	for (const r in e) e[r] !== void 0 && (n[r] = e[r]);
	return n;
}
function Ne(...e) {
	for (const n of e) if (n !== void 0) return n;
}
function ah(e, n) {
	typeof e == "function" ? e(n) : e && (e.current = n);
}
function kO(e) {
	return !e || !(0, w.isValidElement)(e) ? !1 : "ref" in e.props || "ref" in e;
}
function MO(e) {
	return kO(e) ? { ...e.props }.ref || e.ref : null;
}
function zO(e, n) {
	const r = { ...e };
	for (const u in n) {
		if (!tr(n, u)) continue;
		if (u === "className") {
			const o = "className";
			r[o] = e[o] ? `${e[o]} ${n[o]}` : n[o];
			continue;
		}
		if (u === "style") {
			const o = "style";
			r[o] = e[o] ? { ...e[o], ...n[o] } : n[o];
			continue;
		}
		const s = n[u];
		if (typeof s == "function" && u.startsWith("on")) {
			const o = e[u];
			if (typeof o == "function") {
				r[u] = (...f) => {
					(s(...f), o(...f));
				};
				continue;
			}
		}
		r[u] = s;
	}
	return r;
}
function Lb() {
	return Su && !!navigator.maxTouchPoints;
}
function Mh() {
	return Su ? /mac|iphone|ipad|ipod/i.test(navigator.platform) : !1;
}
function Ho() {
	return Su && Mh() && /apple/i.test(navigator.vendor);
}
function DO() {
	return Su && /firefox\//i.test(navigator.userAgent);
}
function jO() {
	return Su && navigator.platform.startsWith("Mac") && !Lb();
}
function qb(e) {
	return !!(e.currentTarget && !Pt(e.currentTarget, e.target));
}
function jn(e) {
	return e.target === e.currentTarget;
}
function Ub(e) {
	const n = e.currentTarget;
	if (!n) return !1;
	const r = Mh();
	if ((r && !e.metaKey) || (!r && !e.ctrlKey)) return !1;
	const u = n.tagName.toLowerCase();
	return u === "a" || (u === "button" && n.type === "submit") || (u === "input" && n.type === "submit");
}
function $b(e) {
	const n = e.currentTarget;
	if (!n) return !1;
	const r = n.tagName.toLowerCase();
	return e.altKey ? r === "a" || (r === "button" && n.type === "submit") || (r === "input" && n.type === "submit") : !1;
}
function LO(e, n, r) {
	const u = new Event(n, r);
	return e.dispatchEvent(u);
}
function iu(e, n) {
	const r = new FocusEvent("blur", n),
		u = e.dispatchEvent(r),
		s = { ...n, bubbles: !0 };
	return (e.dispatchEvent(new FocusEvent("focusout", s)), u);
}
function qO(e, n, r) {
	const u = new KeyboardEvent(n, r);
	return e.dispatchEvent(u);
}
function H0(e, n) {
	const r = new MouseEvent("click", n);
	return e.dispatchEvent(r);
}
function ua(e, n) {
	const r = n || e.currentTarget,
		u = e.relatedTarget;
	return !u || !Pt(r, u);
}
function fu(e, n, r, u) {
	const o = ((h) => {
			if (u) {
				const v = setTimeout(h, u);
				return () => clearTimeout(v);
			}
			const m = requestAnimationFrame(h);
			return () => cancelAnimationFrame(m);
		})(() => {
			(e.removeEventListener(n, f, !0), r());
		}),
		f = () => {
			(o(), r());
		};
	return (e.addEventListener(n, f, { once: !0, capture: !0 }), o);
}
function un(e, n, r, u = window) {
	const s = [];
	try {
		u.document.addEventListener(e, n, r);
		for (const f of Array.from(u.frames)) s.push(un(e, n, r, f));
	} catch {}
	return () => {
		try {
			u.document.removeEventListener(e, n, r);
		} catch {}
		for (const f of s) f();
	};
}
var zh = { ...w },
	P0 = zh.useId,
	Mz = zh.useDeferredValue,
	Q0 = zh.useInsertionEffect,
	Qe = Su ? w.useLayoutEffect : w.useEffect;
function UO(e) {
	const [n] = (0, w.useState)(e);
	return n;
}
function Bb(e) {
	const n = (0, w.useRef)(e);
	return (
		Qe(() => {
			n.current = e;
		}),
		n
	);
}
function Ce(e) {
	const n = (0, w.useRef)(() => {
		throw new Error("Cannot call an event handler while rendering.");
	});
	return (
		Q0
			? Q0(() => {
					n.current = e;
				})
			: (n.current = e),
		(0, w.useCallback)((...r) => {
			var u;
			return (u = n.current) == null ? void 0 : u.call(n, ...r);
		}, [])
	);
}
function $O(e) {
	const [n, r] = (0, w.useState)(null);
	return (
		Qe(() => {
			if (n == null || !e) return;
			let u = null;
			return (
				e((s) => ((u = s), n)),
				() => {
					e(u);
				}
			);
		}, [n, e]),
		[n, r]
	);
}
function Dt(...e) {
	return (0, w.useMemo)(() => {
		if (e.some(Boolean))
			return (n) => {
				for (const r of e) ah(r, n);
			};
	}, e);
}
function ir(e) {
	if (P0) {
		const u = P0();
		return e || u;
	}
	const [n, r] = (0, w.useState)(e);
	return (
		Qe(() => {
			if (e || n) return;
			const u = Math.random().toString(36).slice(2, 8);
			r(`id-${u}`);
		}, [e, n]),
		e || n
	);
}
function Ib(e, n) {
	const r = (o) => {
			if (typeof o == "string") return o;
		},
		[u, s] = (0, w.useState)(() => r(n));
	return (
		Qe(() => {
			const o = e && "current" in e ? e.current : e;
			s(o?.tagName.toLowerCase() || r(n));
		}, [e, n]),
		u
	);
}
function BO(e, n, r) {
	const u = UO(r),
		[s, o] = (0, w.useState)(u);
	return (
		(0, w.useEffect)(() => {
			const f = e && "current" in e ? e.current : e;
			if (!f) return;
			const h = () => {
					const v = f.getAttribute(n);
					o(v ?? u);
				},
				m = new MutationObserver(h);
			return (m.observe(f, { attributeFilter: [n] }), h(), () => m.disconnect());
		}, [e, n, u]),
		s
	);
}
function wu(e, n) {
	const r = (0, w.useRef)(!1);
	((0, w.useEffect)(() => {
		if (r.current) return e();
		r.current = !0;
	}, n),
		(0, w.useEffect)(
			() => () => {
				r.current = !1;
			},
			[],
		));
}
function IO(e, n) {
	const r = (0, w.useRef)(!1);
	(Qe(() => {
		if (r.current) return e();
		r.current = !0;
	}, n),
		Qe(
			() => () => {
				r.current = !1;
			},
			[],
		));
}
function Vb() {
	return (0, w.useReducer)(() => [], []);
}
function yt(e) {
	return Ce(typeof e == "function" ? e : () => e);
}
function ln(e, n, r = []) {
	const u = (0, w.useCallback)((s) => (e.wrapElement && (s = e.wrapElement(s)), n(s)), [...r, e.wrapElement]);
	return { ...e, wrapElement: u };
}
function Dh(e = !1, n) {
	const [r, u] = (0, w.useState)(null);
	return { portalRef: Dt(u, n), portalNode: r, domReady: !e || r };
}
function Zb(e, n, r) {
	const u = e.onLoadedMetadataCapture,
		s = (0, w.useMemo)(() => Object.assign(() => {}, { ...u, [n]: r }), [u, n, r]);
	return [u?.[n], { onLoadedMetadataCapture: s }];
}
var Y0 = !1;
function jh() {
	return (
		(0, w.useEffect)(() => {
			Y0 ||
				(un("mousemove", ZO, !0),
				un("mousedown", oo, !0),
				un("mouseup", oo, !0),
				un("keydown", oo, !0),
				un("scroll", oo, !0),
				(Y0 = !0));
		}, []),
		Ce(() => Lh)
	);
}
var Lh = !1,
	K0 = 0,
	G0 = 0;
function VO(e) {
	const n = e.movementX || e.screenX - K0,
		r = e.movementY || e.screenY - G0;
	return ((K0 = e.screenX), (G0 = e.screenY), n || r || !1);
}
function ZO(e) {
	VO(e) && (Lh = !0);
}
function oo() {
	Lh = !1;
}
var HO = Jn((e) => {
		var n = Symbol.for("react.transitional.element"),
			r = Symbol.for("react.fragment");
		function u(s, o, f) {
			var h = null;
			if ((f !== void 0 && (h = "" + f), o.key !== void 0 && (h = "" + o.key), "key" in o)) {
				f = {};
				for (var m in o) m !== "key" && (f[m] = o[m]);
			} else f = o;
			return ((o = f.ref), { $$typeof: n, type: s, key: h, ref: o !== void 0 ? o : null, props: f });
		}
		((e.Fragment = r), (e.jsx = u), (e.jsxs = u));
	}),
	PO = Jn((e, n) => {
		n.exports = HO();
	}),
	S = PO();
function Ve(e) {
	const n = w.forwardRef((r, u) => e({ ...r, ref: u }));
	return ((n.displayName = e.displayName || e.name), n);
}
function Po(e, n) {
	return w.memo(e, n);
}
function Ye(e, n) {
	const { wrapElement: r, render: u, ...s } = n,
		o = Dt(n.ref, MO(u));
	let f;
	if (w.isValidElement(u)) {
		const h = { ...u.props, ref: o };
		f = w.cloneElement(u, zO(s, h));
	} else u ? (f = u(s)) : (f = (0, S.jsx)(e, { ...s }));
	return r ? r(f) : f;
}
function Xe(e) {
	const n = (r = {}) => e(r);
	return ((n.displayName = e.name), n);
}
function Ti(e = [], n = []) {
	const r = w.createContext(void 0),
		u = w.createContext(void 0),
		s = () => w.useContext(r),
		o = (v = !1) => {
			const g = w.useContext(u),
				_ = s();
			return v ? g : g || _;
		},
		f = () => {
			const v = w.useContext(u),
				g = s();
			if (!(v && v === g)) return g;
		},
		h = (v) => e.reduceRight((g, _) => (0, S.jsx)(_, { ...v, children: g }), (0, S.jsx)(r.Provider, { ...v }));
	return {
		context: r,
		scopedContext: u,
		useContext: s,
		useScopedContext: o,
		useProviderContext: f,
		ContextProvider: h,
		ScopedContextProvider: (v) =>
			(0, S.jsx)(h, {
				...v,
				children: n.reduceRight((g, _) => (0, S.jsx)(_, { ...v, children: g }), (0, S.jsx)(u.Provider, { ...v })),
			}),
	};
}
var Rl = Ti(),
	QO = Rl.useContext,
	zz = Rl.useScopedContext,
	Dz = Rl.useProviderContext,
	YO = Rl.ContextProvider,
	KO = Rl.ScopedContextProvider,
	Ol = Ti([YO], [KO]),
	qh = Ol.useContext,
	jz = Ol.useScopedContext,
	GO = Ol.useProviderContext,
	Nl = Ol.ContextProvider,
	Qo = Ol.ScopedContextProvider,
	FO = (0, w.createContext)(void 0),
	XO = (0, w.createContext)(void 0),
	Hb = (0, w.createContext)(!0),
	Yo =
		"input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], summary, iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])";
function JO(e) {
	return Number.parseInt(e.getAttribute("tabindex") || "0", 10) < 0;
}
function si(e) {
	return !(!e.matches(Yo) || !Nb(e) || e.closest("[inert]"));
}
function pu(e) {
	if (!si(e) || JO(e)) return !1;
	if (!("form" in e) || !e.form || e.checked || e.type !== "radio") return !0;
	const n = e.form.elements.namedItem(e.name);
	if (!n || !("length" in n)) return !0;
	const r = nr(e);
	return !r || r === e || !("form" in r) || r.form !== e.form || r.name !== e.name;
}
function Uh(e, n) {
	const r = Array.from(e.querySelectorAll(Yo));
	n && r.unshift(e);
	const u = r.filter(si);
	return (
		u.forEach((s, o) => {
			if (Nh(s) && s.contentDocument) {
				const f = s.contentDocument.body;
				u.splice(o, 1, ...Uh(f));
			}
		}),
		u
	);
}
function Ko(e, n, r) {
	const u = Array.from(e.querySelectorAll(Yo)),
		s = u.filter(pu);
	return (
		n && pu(e) && s.unshift(e),
		s.forEach((o, f) => {
			if (Nh(o) && o.contentDocument) {
				const h = o.contentDocument.body,
					m = Ko(h, !1, r);
				s.splice(f, 1, ...m);
			}
		}),
		!s.length && r ? u : s
	);
}
function WO(e, n, r) {
	const [u] = Ko(e, n, r);
	return u || null;
}
function eN(e, n, r, u) {
	const s = nr(e),
		o = Uh(e, n),
		f = o.indexOf(s),
		h = o.slice(f + 1);
	return h.find(pu) || (r ? o.find(pu) : null) || (u ? h[0] : null) || null;
}
function Cd(e, n) {
	return eN(document.body, !1, e, n);
}
function tN(e, n, r, u) {
	const s = nr(e),
		o = Uh(e, n).reverse(),
		f = o.indexOf(s),
		h = o.slice(f + 1);
	return h.find(pu) || (r ? o.find(pu) : null) || (u ? h[0] : null) || null;
}
function F0(e, n) {
	return tN(document.body, !1, e, n);
}
function nN(e) {
	for (; e && !si(e); ) e = e.closest(Yo);
	return e || null;
}
function da(e) {
	const n = nr(e);
	if (!n) return !1;
	if (n === e) return !0;
	const r = n.getAttribute("aria-activedescendant");
	return r ? r === e.id : !1;
}
function Nr(e) {
	const n = nr(e);
	if (!n) return !1;
	if (Pt(e, n)) return !0;
	const r = n.getAttribute("aria-activedescendant");
	return !r || !("id" in e) ? !1 : r === e.id ? !0 : !!e.querySelector(`#${CSS.escape(r)}`);
}
function Pb(e) {
	!Nr(e) && si(e) && e.focus();
}
function iN(e) {
	var n;
	const r = (n = e.getAttribute("tabindex")) != null ? n : "";
	(e.setAttribute("data-tabindex", r), e.setAttribute("tabindex", "-1"));
}
function rN(e, n) {
	const r = Ko(e, n);
	for (const u of r) iN(u);
}
function aN(e) {
	const n = e.querySelectorAll("[data-tabindex]"),
		r = (u) => {
			const s = u.getAttribute("data-tabindex");
			(u.removeAttribute("data-tabindex"), s ? u.setAttribute("tabindex", s) : u.removeAttribute("tabindex"));
		};
	e.hasAttribute("data-tabindex") && r(e);
	for (const u of n) r(u);
}
function uN(e, n) {
	"scrollIntoView" in e
		? (e.focus({ preventScroll: !0 }), e.scrollIntoView({ block: "nearest", inline: "nearest", ...n }))
		: e.focus();
}
var lN = "div",
	X0 = Ho(),
	sN = [
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
	Qb = Symbol("safariFocusAncestor");
function oN(e) {
	return e ? !!e[Qb] : !1;
}
function J0(e, n) {
	e && (e[Qb] = n);
}
function cN(e) {
	const { tagName: n, readOnly: r, type: u } = e;
	return (n === "TEXTAREA" && !r) || (n === "SELECT" && !r)
		? !0
		: n === "INPUT" && !r
			? sN.includes(u)
			: !!(e.isContentEditable || (e.getAttribute("role") === "combobox" && e.dataset.name));
}
function fN(e) {
	return "labels" in e ? e.labels : null;
}
function W0(e) {
	return e.tagName.toLowerCase() === "input" && e.type ? e.type === "radio" || e.type === "checkbox" : !1;
}
function dN(e) {
	return e ? e === "button" || e === "summary" || e === "input" || e === "select" || e === "textarea" || e === "a" : !0;
}
function hN(e) {
	return e ? e === "button" || e === "input" || e === "select" || e === "textarea" : !0;
}
function mN(e, n, r, u, s) {
	return e ? (n ? (r && !u ? -1 : void 0) : r ? s : s || 0) : s;
}
function Rd(e, n) {
	return Ce((r) => {
		(e?.(r), !r.defaultPrevented && n && (r.stopPropagation(), r.preventDefault()));
	});
}
var ep = !1,
	$h = !0;
function vN(e) {
	const n = e.target;
	n && "hasAttribute" in n && (n.hasAttribute("data-focus-visible") || ($h = !1));
}
function gN(e) {
	e.metaKey || e.ctrlKey || e.altKey || ($h = !0);
}
var kl = Xe(function ({ focusable: n = !0, accessibleWhenDisabled: r, autoFocus: u, onFocusVisible: s, ...o }) {
		const f = (0, w.useRef)(null);
		((0, w.useEffect)(() => {
			n && (ep || (un("mousedown", vN, !0), un("keydown", gN, !0), (ep = !0)));
		}, [n]),
			X0 &&
				(0, w.useEffect)(() => {
					if (!n) return;
					const Y = f.current;
					if (!Y || !W0(Y)) return;
					const ae = fN(Y);
					if (!ae) return;
					const R = () => queueMicrotask(() => Y.focus());
					for (const $ of ae) $.addEventListener("mouseup", R);
					return () => {
						for (const $ of ae) $.removeEventListener("mouseup", R);
					};
				}, [n]));
		const h = n && Cl(o),
			m = !!h && !r,
			[v, g] = (0, w.useState)(!1);
		((0, w.useEffect)(() => {
			n && m && v && g(!1);
		}, [n, m, v]),
			(0, w.useEffect)(() => {
				if (!n || !v) return;
				const Y = f.current;
				if (!Y || typeof IntersectionObserver > "u") return;
				const ae = new IntersectionObserver(() => {
					si(Y) || g(!1);
				});
				return (ae.observe(Y), () => ae.disconnect());
			}, [n, v]));
		const _ = Rd(o.onKeyPressCapture, h),
			b = Rd(o.onMouseDownCapture, h),
			p = Rd(o.onClickCapture, h),
			E = o.onMouseDown,
			x = Ce((Y) => {
				if ((E?.(Y), Y.defaultPrevented || !n)) return;
				const ae = Y.currentTarget;
				if (!X0 || qb(Y) || (!kr(ae) && !W0(ae))) return;
				let R = !1;
				const $ = () => {
					R = !0;
				};
				ae.addEventListener("focusin", $, { capture: !0, once: !0 });
				const H = nN(ae.parentElement);
				(J0(H, !0),
					fu(ae, "mouseup", () => {
						(ae.removeEventListener("focusin", $, !0), J0(H, !1), !R && Pb(ae));
					}));
			}),
			O = (Y, ae) => {
				if ((ae && (Y.currentTarget = ae), !n)) return;
				const R = Y.currentTarget;
				R && da(R) && (s?.(Y), !Y.defaultPrevented && ((R.dataset.focusVisible = "true"), g(!0)));
			},
			z = o.onKeyDownCapture,
			D = Ce((Y) => {
				if ((z?.(Y), Y.defaultPrevented || !n || v || Y.metaKey || Y.altKey || Y.ctrlKey || !jn(Y))) return;
				const ae = Y.currentTarget;
				fu(ae, "focusout", () => O(Y, ae));
			}),
			A = o.onFocusCapture,
			C = Ce((Y) => {
				if ((A?.(Y), Y.defaultPrevented || !n)) return;
				if (!jn(Y)) {
					g(!1);
					return;
				}
				const ae = Y.currentTarget,
					R = () => O(Y, ae);
				$h || cN(Y.target) ? fu(Y.target, "focusout", R) : g(!1);
			}),
			k = o.onBlur,
			F = Ce((Y) => {
				(k?.(Y), n && ua(Y) && (Y.currentTarget.removeAttribute("data-focus-visible"), g(!1)));
			}),
			Q = (0, w.useContext)(Hb),
			j = Ce((Y) => {
				n &&
					u &&
					Y &&
					Q &&
					queueMicrotask(() => {
						da(Y) || (si(Y) && Y.focus());
					});
			}),
			q = Ib(f),
			G = n && dN(q),
			B = n && hN(q),
			oe = o.style,
			ee = (0, w.useMemo)(() => (m ? { pointerEvents: "none", ...oe } : oe), [m, oe]);
		return (
			(o = {
				"data-focus-visible": (n && v) || void 0,
				"data-autofocus": u || void 0,
				"aria-disabled": h || void 0,
				...o,
				ref: Dt(f, j, o.ref),
				style: ee,
				tabIndex: mN(n, m, G, B, o.tabIndex),
				disabled: B && m ? !0 : void 0,
				contentEditable: h ? void 0 : o.contentEditable,
				onKeyPressCapture: _,
				onClickCapture: p,
				onMouseDownCapture: b,
				onMouseDown: x,
				onKeyDownCapture: D,
				onFocusCapture: C,
				onBlur: F,
			}),
			ya(o)
		);
	}),
	Lz = Ve(function (n) {
		return Ye(lN, kl(n));
	});
function Yb(e) {
	const n = [];
	for (const r of e) n.push(...r);
	return n;
}
function uh(e) {
	return e.slice().reverse();
}
var yN = "div";
function pN(e) {
	return e.some((n) => !!n.rowId);
}
function bN(e) {
	const n = e.target;
	return n && !Ei(n) ? !1 : e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
function _N(e) {
	return e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta";
}
function tp(e, n, r) {
	return Ce((u) => {
		var s;
		if ((n?.(u), u.defaultPrevented || u.isPropagationStopped() || !jn(u) || _N(u) || bN(u))) return;
		const o = (s = Or(e, e.getState().activeId)) == null ? void 0 : s.element;
		if (!o) return;
		const { view: f, ...h } = u;
		(o !== r?.current && o.focus(),
			qO(o, u.type, h) || u.preventDefault(),
			u.currentTarget.contains(o) && u.stopPropagation());
	});
}
function SN(e) {
	return SO(Yb(uh(wO(e))));
}
function wN(e) {
	const [n, r] = (0, w.useState)(!1),
		u = (0, w.useCallback)(() => r(!0), []),
		s = e.useState((o) => Or(e, o.activeId));
	return (
		(0, w.useEffect)(() => {
			const o = s?.element;
			n && o && (r(!1), o.focus({ preventScroll: !0 }));
		}, [s, n]),
		u
	);
}
var Bh = Xe(function ({ store: n, composite: r = !0, focusOnMove: u = r, moveOnKeyPress: s = !0, ...o }) {
		const f = GO();
		((n = n || f), Qt(n, !1));
		const h = (0, w.useRef)(null),
			m = (0, w.useRef)(null),
			v = wN(n),
			g = n.useState("moves"),
			[, _] = $O(r ? n.setBaseElement : null);
		((0, w.useEffect)(() => {
			var q;
			if (!n || !g || !r || !u) return;
			const { activeId: G } = n.getState(),
				B = (q = Or(n, G)) == null ? void 0 : q.element;
			B && uN(B);
		}, [n, g, r, u]),
			Qe(() => {
				if (!n || !g || !r) return;
				const { baseElement: q, activeId: G } = n.getState();
				if (G !== null || !q) return;
				const B = m.current;
				((m.current = null), B && iu(B, { relatedTarget: q }), da(q) || q.focus());
			}, [n, g, r]));
		const b = n.useState("activeId"),
			p = n.useState("virtualFocus");
		Qe(() => {
			var q;
			if (!n || !r || !p) return;
			const G = m.current;
			if (((m.current = null), !G)) return;
			const B = ((q = Or(n, b)) == null ? void 0 : q.element) || nr(G);
			B !== G && iu(G, { relatedTarget: B });
		}, [n, b, p, r]);
		const E = tp(n, o.onKeyDownCapture, m),
			x = tp(n, o.onKeyUpCapture, m),
			O = o.onFocusCapture,
			z = Ce((q) => {
				if ((O?.(q), q.defaultPrevented || !n)) return;
				const { virtualFocus: G } = n.getState();
				if (!G) return;
				const B = q.relatedTarget,
					oe = xO(q.currentTarget);
				jn(q) && oe && (q.stopPropagation(), (m.current = B));
			}),
			D = o.onFocus,
			A = Ce((q) => {
				if ((D?.(q), q.defaultPrevented || !r || !n)) return;
				const { relatedTarget: G } = q,
					{ virtualFocus: B } = n.getState();
				B ? jn(q) && !gl(n, G) && queueMicrotask(v) : jn(q) && n.setActiveId(null);
			}),
			C = o.onBlurCapture,
			k = Ce((q) => {
				var G;
				if ((C?.(q), q.defaultPrevented || !n)) return;
				const { virtualFocus: B, activeId: oe } = n.getState();
				if (!B) return;
				const ee = (G = Or(n, oe)) == null ? void 0 : G.element,
					Y = q.relatedTarget,
					ae = gl(n, Y),
					R = m.current;
				((m.current = null),
					jn(q) && ae
						? (Y === ee ? R && R !== Y && iu(R, q) : ee ? iu(ee, q) : R && iu(R, q), q.stopPropagation())
						: !gl(n, q.target) && ee && iu(ee, q));
			}),
			F = o.onKeyDown,
			Q = yt(s),
			j = Ce((q) => {
				var G;
				if ((F?.(q), q.nativeEvent.isComposing || q.defaultPrevented || !n || !jn(q))) return;
				const { orientation: B, renderedItems: oe, activeId: ee } = n.getState(),
					Y = Or(n, ee);
				if ((G = Y?.element) != null && G.isConnected) return;
				const ae = B !== "horizontal",
					R = B !== "vertical",
					$ = pN(oe);
				if (
					(q.key === "ArrowLeft" || q.key === "ArrowRight" || q.key === "Home" || q.key === "End") &&
					Ei(q.currentTarget)
				)
					return;
				const se = {
					ArrowUp:
						($ || ae) &&
						(() => {
							if ($) {
								const me = SN(oe);
								return me?.id;
							}
							return n?.last();
						}),
					ArrowRight: ($ || R) && n.first,
					ArrowDown: ($ || ae) && n.first,
					ArrowLeft: ($ || R) && n.last,
					Home: n.first,
					End: n.last,
					PageUp: n.first,
					PageDown: n.last,
				}[q.key];
				if (se) {
					const me = se();
					if (me !== void 0) {
						if (!Q(q)) return;
						(q.preventDefault(), n.move(me));
					}
				}
			});
		return (
			(o = ln(o, (q) => (0, S.jsx)(Nl, { value: n, children: q }), [n])),
			(o = {
				"aria-activedescendant": n.useState((q) => {
					var G;
					if (n && r && q.virtualFocus) return (G = Or(n, q.activeId)) == null ? void 0 : G.id;
				}),
				...o,
				ref: Dt(h, _, o.ref),
				onKeyDownCapture: E,
				onKeyUpCapture: x,
				onFocusCapture: z,
				onFocus: A,
				onBlurCapture: k,
				onKeyDown: j,
			}),
			(o = kl({ focusable: n.useState((q) => r && (q.virtualFocus || q.activeId === null)), ...o })),
			o
		);
	}),
	qz = Ve(function (n) {
		return Ye(yN, Bh(n));
	}),
	Ml = Ti(),
	Uz = Ml.useContext,
	$z = Ml.useScopedContext,
	Ih = Ml.useProviderContext,
	EN = Ml.ContextProvider,
	TN = Ml.ScopedContextProvider,
	zl = Ti([EN], [TN]),
	Bz = zl.useContext,
	Iz = zl.useScopedContext,
	Go = zl.useProviderContext,
	xN = zl.ContextProvider,
	Vh = zl.ScopedContextProvider,
	AN = (0, w.createContext)(void 0),
	CN = (0, w.createContext)(void 0),
	Dl = Ti([xN], [Vh]),
	Vz = Dl.useContext,
	Zz = Dl.useScopedContext,
	Fo = Dl.useProviderContext,
	Kb = Dl.ContextProvider,
	Xo = Dl.ScopedContextProvider,
	RN = "div",
	Zh = Xe(function ({ store: n, ...r }) {
		const u = Fo();
		return ((n = n || u), (r = { ...r, ref: Dt(n?.setAnchorElement, r.ref) }), r);
	}),
	Hz = Ve(function (n) {
		return Ye(RN, Zh(n));
	}),
	Gb = (0, w.createContext)(void 0),
	jl = Ti([Kb, Nl], [Xo, Qo]),
	ON = jl.useContext,
	Fb = jl.useScopedContext,
	Jo = jl.useProviderContext,
	Pz = jl.ContextProvider,
	NN = jl.ScopedContextProvider,
	kN = (0, w.createContext)(void 0),
	MN = (0, w.createContext)(!1);
function pa(e, n) {
	const r = e.__unstableInternals;
	return (Qt(r, "Invalid store"), r[n]);
}
function oi(e, ...n) {
	let r = e,
		u = r,
		s = Symbol(),
		o = yl;
	const f = new Set(),
		h = new Set(),
		m = new Set(),
		v = new Set(),
		g = new Set(),
		_ = new WeakMap(),
		b = new WeakMap(),
		p = (j) => (m.add(j), () => m.delete(j)),
		E = () => {
			const j = f.size,
				q = Symbol();
			f.add(q);
			const G = () => {
				(f.delete(q), !f.size && o());
			};
			if (j) return G;
			const B = NO(r).map((Y) =>
					xn(
						...n.map((ae) => {
							var R;
							const $ = (R = ae?.getState) == null ? void 0 : R.call(ae);
							if ($ && tr($, Y))
								return on(ae, [Y], (H) => {
									F(Y, H[Y], !0);
								});
						}),
					),
				),
				oe = [];
			for (const Y of m) oe.push(Y());
			const ee = n.map(Hh);
			return ((o = xn(...B, ...oe, ...ee)), G);
		},
		x = (j, q, G = v) => (
			G.add(q),
			b.set(q, j),
			() => {
				var B;
				((B = _.get(q)) == null || B(), _.delete(q), b.delete(q), G.delete(q));
			}
		),
		O = (j, q) => x(j, q),
		z = (j, q) => (_.set(q, q(r, r)), x(j, q)),
		D = (j, q) => (_.set(q, q(r, u)), x(j, q, g)),
		A = (j) => oi(OO(r, j), Q),
		C = (j) => oi(RO(r, j), Q),
		k = () => r,
		F = (j, q, G = !1) => {
			var B;
			if (!tr(r, j)) return;
			const oe = zb(q, r[j]);
			if (oe === r[j]) return;
			if (!G) for (const R of n) (B = R?.setState) == null || B.call(R, j, oe);
			const ee = r;
			r = { ...r, [j]: oe };
			const Y = Symbol();
			((s = Y), h.add(j));
			const ae = (R, $, H) => {
				var se;
				const me = b.get(R),
					Re = (N) => (H ? H.has(N) : N === j);
				(!me || me.some(Re)) && ((se = _.get(R)) == null || se(), _.set(R, R(r, $)));
			};
			for (const R of v) ae(R, ee);
			queueMicrotask(() => {
				if (s !== Y) return;
				const R = r;
				for (const $ of g) ae($, u, h);
				((u = R), h.clear());
			});
		},
		Q = {
			getState: k,
			setState: F,
			__unstableInternals: { setup: p, init: E, subscribe: O, sync: z, batch: D, pick: A, omit: C },
		};
	return Q;
}
function mn(e, ...n) {
	if (e) return pa(e, "setup")(...n);
}
function Hh(e, ...n) {
	if (e) return pa(e, "init")(...n);
}
function Ph(e, ...n) {
	if (e) return pa(e, "subscribe")(...n);
}
function on(e, ...n) {
	if (e) return pa(e, "sync")(...n);
}
function No(e, ...n) {
	if (e) return pa(e, "batch")(...n);
}
function Qh(e, ...n) {
	if (e) return pa(e, "omit")(...n);
}
function Xb(e, ...n) {
	if (e) return pa(e, "pick")(...n);
}
function Wo(...e) {
	var n;
	const r = {};
	for (const s of e) {
		const o = (n = s?.getState) == null ? void 0 : n.call(s);
		o && Object.assign(r, o);
	}
	const u = oi(r, ...e);
	return Object.assign({}, ...e, u);
}
var zN = "input";
function np(e, n, r) {
	if (!r) return !1;
	const u = e.find((s) => !s.disabled && s.value);
	return u?.value === n;
}
function ip(e, n) {
	return !n || e == null ? !1 : ((e = Db(e)), n.length > e.length && n.toLowerCase().indexOf(e.toLowerCase()) === 0);
}
function DN(e) {
	return e.type === "input";
}
function jN(e) {
	return e === "inline" || e === "list" || e === "both" || e === "none";
}
function LN(e) {
	const n = e.find((r) => {
		var u;
		return r.disabled ? !1 : ((u = r.element) == null ? void 0 : u.getAttribute("role")) !== "tab";
	});
	return n?.id;
}
var qN = Xe(function ({
		store: n,
		focusable: r = !0,
		autoSelect: u = !1,
		getAutoSelectId: s,
		setValueOnChange: o,
		showMinLength: f = 0,
		showOnChange: h,
		showOnMouseDown: m,
		showOnClick: v = m,
		showOnKeyDown: g,
		showOnKeyPress: _ = g,
		blurActiveItemOnClick: b,
		setValueOnClick: p = !0,
		moveOnKeyPress: E = !0,
		autoComplete: x = "list",
		...O
	}) {
		const z = Jo();
		((n = n || z), Qt(n, !1));
		const D = (0, w.useRef)(null),
			[A, C] = Vb(),
			k = (0, w.useRef)(!1),
			F = (0, w.useRef)(!1),
			Q = n.useState((ue) => ue.virtualFocus && u),
			j = x === "inline" || x === "both",
			[q, G] = (0, w.useState)(j);
		IO(() => {
			j && G(!0);
		}, [j]);
		const B = n.useState("value"),
			oe = (0, w.useRef)();
		(0, w.useEffect)(
			() =>
				on(n, ["selectedValue", "activeId"], (ue, xe) => {
					oe.current = xe.selectedValue;
				}),
			[],
		);
		const ee = n.useState((ue) => {
				var xe;
				if (
					j &&
					q &&
					!(
						ue.activeValue &&
						Array.isArray(ue.selectedValue) &&
						(ue.selectedValue.includes(ue.activeValue) || ((xe = oe.current) != null && xe.includes(ue.activeValue)))
					)
				)
					return ue.activeValue;
			}),
			Y = n.useState("renderedItems"),
			ae = n.useState("open"),
			R = n.useState("contentElement"),
			$ = (0, w.useMemo)(() => {
				if (!j || !q) return B;
				if (np(Y, ee, Q)) {
					if (ip(B, ee)) {
						const ue = ee?.slice(B.length) || "";
						return B + ue;
					}
					return B;
				}
				return ee || B;
			}, [j, q, Y, ee, Q, B]);
		((0, w.useEffect)(() => {
			const ue = D.current;
			if (!ue) return;
			const xe = () => G(!0);
			return (
				ue.addEventListener("combobox-item-move", xe),
				() => {
					ue.removeEventListener("combobox-item-move", xe);
				}
			);
		}, []),
			(0, w.useEffect)(() => {
				if (!j || !q || !ee || !np(Y, ee, Q) || !ip(B, ee)) return;
				let ue = yl;
				return (
					queueMicrotask(() => {
						const xe = D.current;
						if (!xe) return;
						const { start: ct, end: Oe } = ih(xe),
							Ct = B.length,
							Kt = ee.length;
						(Ad(xe, Ct, Kt),
							(ue = () => {
								if (!da(xe)) return;
								const { start: vt, end: jt } = ih(xe);
								vt === Ct && jt === Kt && Ad(xe, ct, Oe);
							}));
					}),
					() => ue()
				);
			}, [A, j, q, ee, Y, Q, B]));
		const H = (0, w.useRef)(null),
			se = Ce(s),
			me = (0, w.useRef)(null);
		((0, w.useEffect)(() => {
			if (!ae || !R) return;
			const ue = kh(R);
			if (!ue) return;
			H.current = ue;
			const xe = () => {
					k.current = !1;
				},
				ct = () => {
					if (!n || !k.current) return;
					const { activeId: Ct } = n.getState();
					Ct !== null && Ct !== me.current && (k.current = !1);
				},
				Oe = { passive: !0, capture: !0 };
			return (
				ue.addEventListener("wheel", xe, Oe),
				ue.addEventListener("touchmove", xe, Oe),
				ue.addEventListener("scroll", ct, Oe),
				() => {
					(ue.removeEventListener("wheel", xe, !0),
						ue.removeEventListener("touchmove", xe, !0),
						ue.removeEventListener("scroll", ct, !0));
				}
			);
		}, [ae, R, n]),
			Qe(() => {
				B && (F.current || (k.current = !0));
			}, [B]),
			Qe(() => {
				(Q !== "always" && ae) || (k.current = ae);
			}, [Q, ae]));
		const Re = n.useState("resetValueOnSelect");
		(wu(() => {
			var ue, xe;
			const ct = k.current;
			if (!n || !ae || (!ct && !Re)) return;
			const { baseElement: Oe, contentElement: Ct, activeId: Kt } = n.getState();
			if (!(Oe && !da(Oe))) {
				if (Ct?.hasAttribute("data-placing")) {
					const vt = new MutationObserver(C);
					return (vt.observe(Ct, { attributeFilter: ["data-placing"] }), () => vt.disconnect());
				}
				if (Q && ct) {
					const vt = se(Y),
						jt = vt !== void 0 ? vt : (ue = LN(Y)) != null ? ue : n.first();
					((me.current = jt), n.move(jt ?? null));
				} else {
					const vt = (xe = n.item(Kt || n.first())) == null ? void 0 : xe.element;
					vt && "scrollIntoView" in vt && vt.scrollIntoView({ block: "nearest", inline: "nearest" });
				}
			}
		}, [n, ae, A, B, Q, Re, se, Y]),
			(0, w.useEffect)(() => {
				if (!j) return;
				const ue = D.current;
				if (!ue) return;
				const xe = [ue, R].filter((Oe) => !!Oe),
					ct = (Oe) => {
						xe.every((Ct) => ua(Oe, Ct)) && n?.setValue($);
					};
				for (const Oe of xe) Oe.addEventListener("focusout", ct);
				return () => {
					for (const Oe of xe) Oe.removeEventListener("focusout", ct);
				};
			}, [j, R, n, $]));
		const N = (ue) => ue.currentTarget.value.length >= f,
			X = O.onChange,
			re = yt(h ?? N),
			de = yt(o ?? !n.tag),
			ge = Ce((ue) => {
				if ((X?.(ue), ue.defaultPrevented || !n)) return;
				const xe = ue.currentTarget,
					{ value: ct, selectionStart: Oe, selectionEnd: Ct } = xe,
					Kt = ue.nativeEvent;
				if (((k.current = !0), DN(Kt) && (Kt.isComposing && ((k.current = !1), (F.current = !0)), j))) {
					const vt = Kt.inputType === "insertText" || Kt.inputType === "insertCompositionText",
						jt = Oe === ct.length;
					G(vt && jt);
				}
				if (de(ue)) {
					const vt = ct === n.getState().value;
					(n.setValue(ct),
						queueMicrotask(() => {
							Ad(xe, Oe, Ct);
						}),
						j && Q && vt && C());
				}
				(re(ue) && n.show(), (!Q || !k.current) && n.setActiveId(null));
			}),
			_e = O.onCompositionEnd,
			we = Ce((ue) => {
				((k.current = !0), (F.current = !1), _e?.(ue), !ue.defaultPrevented && Q && C());
			}),
			Je = O.onMouseDown,
			De = yt(b ?? (() => !!n?.getState().includesBaseElement)),
			Ke = yt(p),
			xt = yt(v ?? N),
			At = Ce((ue) => {
				(Je?.(ue),
					!ue.defaultPrevented &&
						(ue.button ||
							ue.ctrlKey ||
							(n &&
								(De(ue) && n.setActiveId(null),
								Ke(ue) && n.setValue($),
								xt(ue) && fu(ue.currentTarget, "mouseup", n.show)))));
			}),
			Yt = O.onKeyDown,
			Be = yt(_ ?? N),
			fe = Ce((ue) => {
				if (
					(Yt?.(ue),
					ue.repeat || (k.current = !1),
					ue.defaultPrevented || ue.ctrlKey || ue.altKey || ue.shiftKey || ue.metaKey || !n)
				)
					return;
				const { open: xe } = n.getState();
				xe || ((ue.key === "ArrowUp" || ue.key === "ArrowDown") && Be(ue) && (ue.preventDefault(), n.show()));
			}),
			Ee = O.onBlur,
			Ge = Ce((ue) => {
				((k.current = !1), Ee?.(ue), ue.defaultPrevented);
			}),
			ze = ir(O.id),
			bt = jN(x) ? x : void 0,
			st = n.useState((ue) => ue.activeId === null);
		return (
			(O = {
				id: ze,
				role: "combobox",
				"aria-autocomplete": bt,
				"aria-haspopup": Vo(R, "listbox"),
				"aria-expanded": ae,
				"aria-controls": R?.id,
				"data-active-item": st || void 0,
				value: $,
				...O,
				ref: Dt(D, O.ref),
				onChange: ge,
				onCompositionEnd: we,
				onMouseDown: At,
				onKeyDown: fe,
				onBlur: Ge,
			}),
			(O = Bh({ store: n, focusable: r, ...O, moveOnKeyPress: (ue) => (Zo(E, ue) ? !1 : (j && G(!0), !0)) })),
			(O = Zh({ store: n, ...O })),
			{ autoComplete: "off", ...O }
		);
	}),
	UN = Ve(function (n) {
		return Ye(zN, qN(n));
	}),
	$N = "button";
function rp(e) {
	if (!e.isTrusted) return !1;
	const n = e.currentTarget;
	return e.key === "Enter"
		? kr(n) || n.tagName === "SUMMARY" || n.tagName === "A"
		: e.key === " "
			? kr(n) || n.tagName === "SUMMARY" || n.tagName === "INPUT" || n.tagName === "SELECT"
			: !1;
}
var BN = Symbol("command"),
	Yh = Xe(function ({ clickOnEnter: n = !0, clickOnSpace: r = !0, ...u }) {
		const s = (0, w.useRef)(null),
			[o, f] = (0, w.useState)(!1);
		(0, w.useEffect)(() => {
			s.current && f(kr(s.current));
		}, []);
		const [h, m] = (0, w.useState)(!1),
			v = (0, w.useRef)(!1),
			g = Cl(u),
			[_, b] = Zb(u, BN, !0),
			p = u.onKeyDown,
			E = Ce((z) => {
				p?.(z);
				const D = z.currentTarget;
				if (z.defaultPrevented || _ || g || !jn(z) || Ei(D) || D.isContentEditable) return;
				const A = n && z.key === "Enter",
					C = r && z.key === " ",
					k = z.key === "Enter" && !n,
					F = z.key === " " && !r;
				if (k || F) {
					z.preventDefault();
					return;
				}
				if (A || C) {
					const Q = rp(z);
					if (A) {
						if (!Q) {
							z.preventDefault();
							const { view: j, ...q } = z,
								G = () => H0(D, q);
							DO() ? fu(D, "keyup", G) : queueMicrotask(G);
						}
					} else C && ((v.current = !0), Q || (z.preventDefault(), m(!0)));
				}
			}),
			x = u.onKeyUp,
			O = Ce((z) => {
				if ((x?.(z), z.defaultPrevented || _ || g || z.metaKey)) return;
				const D = r && z.key === " ";
				if (v.current && D && ((v.current = !1), !rp(z))) {
					(z.preventDefault(), m(!1));
					const A = z.currentTarget,
						{ view: C, ...k } = z;
					queueMicrotask(() => H0(A, k));
				}
			});
		return (
			(u = {
				"data-active": h || void 0,
				type: o ? "button" : void 0,
				...b,
				...u,
				ref: Dt(s, u.ref),
				onKeyDown: E,
				onKeyUp: O,
			}),
			(u = kl(u)),
			u
		);
	}),
	Qz = Ve(function (n) {
		return Ye($N, Yh(n));
	}),
	Jb = "button",
	Wb = Xe(function (n) {
		const r = (0, w.useRef)(null),
			u = Ib(r, Jb),
			[s, o] = (0, w.useState)(() => !!u && kr({ tagName: u, type: n.type }));
		return (
			(0, w.useEffect)(() => {
				r.current && o(kr(r.current));
			}, []),
			(n = { role: !s && u !== "a" ? "button" : void 0, ...n, ref: Dt(r, n.ref) }),
			(n = Yh(n)),
			n
		);
	}),
	Yz = Ve(function (n) {
		return Ye(Jb, Wb(n));
	}),
	IN = "button",
	VN = Symbol("disclosure"),
	e_ = Xe(function ({ store: n, toggleOnClick: r = !0, ...u }) {
		const s = Ih();
		((n = n || s), Qt(n, !1));
		const o = (0, w.useRef)(null),
			[f, h] = (0, w.useState)(!1),
			m = n.useState("disclosureElement"),
			v = n.useState("open");
		(0, w.useEffect)(() => {
			let O = m === o.current;
			(m?.isConnected || (n?.setDisclosureElement(o.current), (O = !0)), h(v && O));
		}, [m, n, v]);
		const g = u.onClick,
			_ = yt(r),
			[b, p] = Zb(u, VN, !0),
			E = Ce((O) => {
				(g?.(O), !O.defaultPrevented && (b || (_(O) && (n?.setDisclosureElement(O.currentTarget), n?.toggle()))));
			}),
			x = n.useState("contentElement");
		return (
			(u = { "aria-expanded": f, "aria-controls": x?.id, ...p, ...u, ref: Dt(o, u.ref), onClick: E }),
			(u = Wb(u)),
			u
		);
	}),
	Kz = Ve(function (n) {
		return Ye(IN, e_(n));
	}),
	ZN = "button",
	t_ = Xe(function ({ store: n, ...r }) {
		const u = Go();
		return (
			(n = n || u),
			Qt(n, !1),
			(r = { "aria-haspopup": Vo(n.useState("contentElement"), "dialog"), ...r }),
			(r = e_({ store: n, ...r })),
			r
		);
	}),
	Gz = Ve(function (n) {
		return Ye(ZN, t_(n));
	}),
	HN = "div";
function n_(e) {
	const n = e.relatedTarget;
	return n?.nodeType === Node.ELEMENT_NODE ? n : null;
}
function PN(e) {
	const n = n_(e);
	return n ? Pt(e.currentTarget, n) : !1;
}
var lh = Symbol("composite-hover");
function QN(e) {
	let n = n_(e);
	if (!n) return !1;
	do {
		if (tr(n, lh) && n[lh]) return !0;
		n = n.parentElement;
	} while (n);
	return !1;
}
var Kh = Xe(function ({ store: n, focusOnHover: r = !0, blurOnHoverEnd: u = !!r, ...s }) {
		const o = qh();
		((n = n || o), Qt(n, !1));
		const f = jh(),
			h = s.onMouseMove,
			m = yt(r),
			v = Ce((E) => {
				if ((h?.(E), !E.defaultPrevented && f() && m(E))) {
					if (!Nr(E.currentTarget)) {
						const x = n?.getState().baseElement;
						x && !da(x) && x.focus();
					}
					n?.setActiveId(E.currentTarget.id);
				}
			}),
			g = s.onMouseLeave,
			_ = yt(u),
			b = Ce((E) => {
				var x;
				(g?.(E),
					!E.defaultPrevented &&
						f() &&
						(PN(E) ||
							QN(E) ||
							(m(E) && _(E) && (n?.setActiveId(null), (x = n?.getState().baseElement) == null || x.focus()))));
			}),
			p = (0, w.useCallback)((E) => {
				E && (E[lh] = !0);
			}, []);
		return ((s = { ...s, ref: Dt(p, s.ref), onMouseMove: v, onMouseLeave: b }), ya(s));
	}),
	Fz = Po(
		Ve(function (n) {
			return Ye(HN, Kh(n));
		}),
	),
	YN = "div",
	i_ = Xe(function ({ store: n, shouldRegisterItem: r = !0, getItem: u = jb, element: s, ...o }) {
		const f = QO();
		n = n || f;
		const h = ir(o.id),
			m = (0, w.useRef)(s);
		return (
			(0, w.useEffect)(() => {
				const v = m.current;
				if (!h || !v || !r) return;
				const g = u({ id: h, element: v });
				return n?.renderItem(g);
			}, [h, r, u, n]),
			(o = { ...o, ref: Dt(m, o.ref) }),
			ya(o)
		);
	}),
	Xz = Ve(function (n) {
		return Ye(YN, i_(n));
	}),
	KN = Jn((e) => {
		var n = qo();
		function r(b, p) {
			return (b === p && (b !== 0 || 1 / b === 1 / p)) || (b !== b && p !== p);
		}
		var u = typeof Object.is == "function" ? Object.is : r,
			s = n.useState,
			o = n.useEffect,
			f = n.useLayoutEffect,
			h = n.useDebugValue;
		function m(b, p) {
			var E = p(),
				x = s({ inst: { value: E, getSnapshot: p } }),
				O = x[0].inst,
				z = x[1];
			return (
				f(
					function () {
						((O.value = E), (O.getSnapshot = p), v(O) && z({ inst: O }));
					},
					[b, E, p],
				),
				o(
					function () {
						return (
							v(O) && z({ inst: O }),
							b(function () {
								v(O) && z({ inst: O });
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
		var _ = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? g : m;
		e.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : _;
	}),
	GN = Jn((e, n) => {
		n.exports = KN();
	}),
	FN = zp(GN(), 1),
	{ useSyncExternalStore: r_ } = FN.default,
	a_ = () => () => {};
function Zt(e, n = jb) {
	const r = w.useCallback((s) => (e ? Ph(e, null, s) : a_()), [e]),
		u = () => {
			const s = typeof n == "string" ? n : null,
				o = typeof n == "function" ? n : null,
				f = e?.getState();
			if (o) return o(f);
			if (f && s && tr(f, s)) return f[s];
		};
	return r_(r, u, u);
}
function u_(e, n) {
	const r = w.useRef({}),
		u = w.useCallback((o) => (e ? Ph(e, null, o) : a_()), [e]),
		s = () => {
			const o = e?.getState();
			let f = !1;
			const h = r.current;
			for (const m in n) {
				const v = n[m];
				if (typeof v == "function") {
					const g = v(o);
					g !== h[m] && ((h[m] = g), (f = !0));
				}
				if (typeof v == "string") {
					if (!o || !tr(o, v)) continue;
					const g = o[v];
					g !== h[m] && ((h[m] = g), (f = !0));
				}
			}
			return (f && (r.current = { ...h }), r.current);
		};
	return r_(u, s, s);
}
function zt(e, n, r, u) {
	const s = tr(n, r) ? n[r] : void 0,
		o = Bb({ value: s, setValue: u ? n[u] : void 0 });
	(Qe(
		() =>
			on(e, [r], (f, h) => {
				const { value: m, setValue: v } = o.current;
				v && f[r] !== h[r] && f[r] !== m && v(f[r]);
			}),
		[e, r],
	),
		Qe(() => {
			if (s !== void 0)
				return (
					e.setState(r, s),
					No(e, [r], () => {
						s !== void 0 && e.setState(r, s);
					})
				);
		}));
}
function ec(e, n) {
	const [r, u] = w.useState(() => e(n));
	Qe(() => Hh(r), [r]);
	const s = w.useCallback((o) => Zt(r, o), [r]);
	return [
		w.useMemo(() => ({ ...r, useState: s }), [r, s]),
		Ce(() => {
			u((o) => e({ ...n, ...o.getState() }));
		}),
	];
}
var XN = "button";
function JN(e) {
	return nh(e) ? !0 : e.tagName === "INPUT" && !kr(e);
}
function WN(e, n = !1) {
	const r = e.clientHeight,
		{ top: u } = e.getBoundingClientRect(),
		s = Math.max(r * 0.875, r - 40) * 1.5,
		o = n ? r - s + u : s + u;
	return e.tagName === "HTML" ? o + e.scrollTop : o;
}
function ek(e, n = !1) {
	const { top: r } = e.getBoundingClientRect();
	return n ? r + e.clientHeight : r;
}
function ap(e, n, r, u = !1) {
	var s;
	if (!n || !r) return;
	const { renderedItems: o } = n.getState(),
		f = kh(e);
	if (!f) return;
	const h = WN(f, u);
	let m, v;
	for (let g = 0; g < o.length; g += 1) {
		const _ = m;
		if (((m = r(g)), !m)) break;
		if (m === _) continue;
		const b = (s = Or(n, m)) == null ? void 0 : s.element;
		if (!b) continue;
		const p = ek(b, u) - h,
			E = Math.abs(p);
		if ((u && p <= 0) || (!u && p >= 0)) {
			v !== void 0 && v < E && (m = _);
			break;
		}
		v = E;
	}
	return m;
}
function tk(e, n) {
	return jn(e) ? !1 : gl(n, e.target);
}
var Gh = Xe(function ({
		store: n,
		rowId: r,
		preventScrollOnKeyDown: u = !1,
		moveOnKeyPress: s = !0,
		tabbable: o = !1,
		getItem: f,
		"aria-setsize": h,
		"aria-posinset": m,
		...v
	}) {
		const g = qh();
		n = n || g;
		const _ = ir(v.id),
			b = (0, w.useRef)(null),
			p = (0, w.useContext)(XO),
			E = Cl(v) && !v.accessibleWhenDisabled,
			{
				rowId: x,
				baseElement: O,
				isActiveItem: z,
				ariaSetSize: D,
				ariaPosInSet: A,
				isTabbable: C,
			} = u_(n, {
				rowId(R) {
					if (r) return r;
					if (R && p?.baseElement && p.baseElement === R.baseElement) return p.id;
				},
				baseElement(R) {
					return R?.baseElement || void 0;
				},
				isActiveItem(R) {
					return !!R && R.activeId === _;
				},
				ariaSetSize(R) {
					if (h != null) return h;
					if (R && p?.ariaSetSize && p.baseElement === R.baseElement) return p.ariaSetSize;
				},
				ariaPosInSet(R) {
					if (m != null) return m;
					if (!R || !p?.ariaPosInSet || p.baseElement !== R.baseElement) return;
					const $ = R.renderedItems.filter((H) => H.rowId === x);
					return p.ariaPosInSet + $.findIndex((H) => H.id === _);
				},
				isTabbable(R) {
					if (!R?.renderedItems.length) return !0;
					if (R.virtualFocus) return !1;
					if (o) return !0;
					if (R.activeId === null) return !1;
					const $ = n?.item(R.activeId);
					return $?.disabled || !$?.element ? !0 : R.activeId === _;
				},
			}),
			k = (0, w.useCallback)(
				(R) => {
					var $;
					const H = {
						...R,
						id: _ || R.id,
						rowId: x,
						disabled: !!E,
						children: ($ = R.element) == null ? void 0 : $.textContent,
					};
					return f ? f(H) : H;
				},
				[_, x, E, f],
			),
			F = v.onFocus,
			Q = (0, w.useRef)(!1),
			j = Ce((R) => {
				if ((F?.(R), R.defaultPrevented || qb(R) || !_ || !n || tk(R, n))) return;
				const { virtualFocus: $, baseElement: H } = n.getState();
				(n.setActiveId(_),
					nh(R.currentTarget) && EO(R.currentTarget),
					$ &&
						jn(R) &&
						(JN(R.currentTarget) ||
							(H?.isConnected &&
								(Ho() &&
									R.currentTarget.hasAttribute("data-autofocus") &&
									R.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" }),
								(Q.current = !0),
								R.relatedTarget === H || gl(n, R.relatedTarget) ? TO(H) : H.focus()))));
			}),
			q = v.onBlurCapture,
			G = Ce((R) => {
				if ((q?.(R), R.defaultPrevented)) return;
				const $ = n?.getState();
				$?.virtualFocus && Q.current && ((Q.current = !1), R.preventDefault(), R.stopPropagation());
			}),
			B = v.onKeyDown,
			oe = yt(u),
			ee = yt(s),
			Y = Ce((R) => {
				if ((B?.(R), R.defaultPrevented || !jn(R) || !n)) return;
				const { currentTarget: $ } = R,
					H = n.getState(),
					se = n.item(_),
					me = !!se?.rowId,
					Re = H.orientation !== "horizontal",
					N = H.orientation !== "vertical",
					X = () => !!(me || N || !H.baseElement || !Ei(H.baseElement)),
					re = {
						ArrowUp: (me || Re) && n.up,
						ArrowRight: (me || N) && n.next,
						ArrowDown: (me || Re) && n.down,
						ArrowLeft: (me || N) && n.previous,
						Home: () => {
							if (X()) return !me || R.ctrlKey ? n?.first() : n?.previous(-1);
						},
						End: () => {
							if (X()) return !me || R.ctrlKey ? n?.last() : n?.next(-1);
						},
						PageUp: () => ap($, n, n?.up, !0),
						PageDown: () => ap($, n, n?.down),
					}[R.key];
				if (re) {
					if (nh($)) {
						const ge = ih($),
							_e = N && R.key === "ArrowLeft",
							we = N && R.key === "ArrowRight",
							Je = Re && R.key === "ArrowUp",
							De = Re && R.key === "ArrowDown";
						if (we || De) {
							const { length: Ke } = yO($);
							if (ge.end !== Ke) return;
						} else if ((_e || Je) && ge.start !== 0) return;
					}
					const de = re();
					if (oe(R) || de !== void 0) {
						if (!ee(R)) return;
						(R.preventDefault(), n.move(de));
					}
				}
			}),
			ae = (0, w.useMemo)(() => ({ id: _, baseElement: O }), [_, O]);
		return (
			(v = ln(v, (R) => (0, S.jsx)(FO.Provider, { value: ae, children: R }), [ae])),
			(v = {
				id: _,
				"data-active-item": z || void 0,
				...v,
				ref: Dt(b, v.ref),
				tabIndex: C ? v.tabIndex : -1,
				onFocus: j,
				onBlurCapture: G,
				onKeyDown: Y,
			}),
			(v = Yh(v)),
			(v = i_({ store: n, ...v, getItem: k, shouldRegisterItem: _ ? v.shouldRegisterItem : !1 })),
			ya({ ...v, "aria-setsize": D, "aria-posinset": A })
		);
	}),
	Jz = Po(
		Ve(function (n) {
			return Ye(XN, Gh(n));
		}),
	),
	nk = "div";
function ik(e, n) {
	if (n != null) return e == null ? !1 : Array.isArray(e) ? e.includes(n) : e === n;
}
function rk(e) {
	var n;
	return (n = { menu: "menuitem", listbox: "option", tree: "treeitem" }[e]) != null ? n : "option";
}
var ak = Xe(function ({
		store: n,
		value: r,
		hideOnClick: u,
		setValueOnClick: s,
		selectValueOnClick: o = !0,
		resetValueOnSelect: f,
		focusOnHover: h = !1,
		moveOnKeyPress: m = !0,
		getItem: v,
		...g
	}) {
		var _;
		const b = Fb();
		((n = n || b), Qt(n, !1));
		const {
				resetValueOnSelectState: p,
				multiSelectable: E,
				selected: x,
			} = u_(n, {
				resetValueOnSelectState: "resetValueOnSelect",
				multiSelectable(G) {
					return Array.isArray(G.selectedValue);
				},
				selected(G) {
					return ik(G.selectedValue, r);
				},
			}),
			O = (0, w.useCallback)(
				(G) => {
					const B = { ...G, value: r };
					return v ? v(B) : B;
				},
				[r, v],
			);
		((s = s ?? !E), (u = u ?? (r != null && !E)));
		const z = g.onClick,
			D = yt(s),
			A = yt(o),
			C = yt((_ = f ?? p) != null ? _ : E),
			k = yt(u),
			F = Ce((G) => {
				(z?.(G),
					!G.defaultPrevented &&
						($b(G) ||
							Ub(G) ||
							(r != null &&
								(A(G) &&
									(C(G) && n?.resetValue(),
									n?.setSelectedValue((B) =>
										Array.isArray(B) ? (B.includes(r) ? B.filter((oe) => oe !== r) : [...B, r]) : r,
									)),
								D(G) && n?.setValue(r)),
							k(G) && n?.hide())));
			}),
			Q = g.onKeyDown,
			j = Ce((G) => {
				if ((Q?.(G), G.defaultPrevented)) return;
				const B = n?.getState().baseElement;
				B &&
					(da(B) ||
						((G.key.length === 1 || G.key === "Backspace" || G.key === "Delete") &&
							(queueMicrotask(() => B.focus()), Ei(B) && n?.setValue(B.value))));
			});
		(E && x != null && (g = { "aria-selected": x, ...g }),
			(g = ln(
				g,
				(G) =>
					(0, S.jsx)(kN.Provider, { value: r, children: (0, S.jsx)(MN.Provider, { value: x ?? !1, children: G }) }),
				[r, x],
			)),
			(g = { role: rk((0, w.useContext)(Gb)), children: r, ...g, onClick: F, onKeyDown: j }));
		const q = yt(m);
		return (
			(g = Gh({
				store: n,
				...g,
				getItem: O,
				moveOnKeyPress: (G) => {
					if (!q(G)) return !1;
					const B = new Event("combobox-item-move");
					return (n?.getState().baseElement?.dispatchEvent(B), !0);
				},
			})),
			(g = Kh({ store: n, focusOnHover: h, ...g })),
			g
		);
	}),
	uk = Po(
		Ve(function (n) {
			return Ye(nk, ak(n));
		}),
	),
	ko = Hp(),
	lk = "div";
function up(e, n) {
	const r = setTimeout(n, e);
	return () => clearTimeout(r);
}
function sk(e) {
	let n = requestAnimationFrame(() => {
		n = requestAnimationFrame(e);
	});
	return () => cancelAnimationFrame(n);
}
function lp(...e) {
	return e
		.join(", ")
		.split(", ")
		.reduce((n, r) => {
			const u = r.endsWith("ms") ? 1 : 1e3,
				s = Number.parseFloat(r || "0s") * u;
			return s > n ? s : n;
		}, 0);
}
function tc(e, n, r) {
	return !r && n !== !1 && (!e || !!n);
}
var Fh = Xe(function ({ store: n, alwaysVisible: r, ...u }) {
		const s = Ih();
		((n = n || s), Qt(n, !1));
		const o = (0, w.useRef)(null),
			f = ir(u.id),
			[h, m] = (0, w.useState)(null),
			v = n.useState("open"),
			g = n.useState("mounted"),
			_ = n.useState("animated"),
			b = n.useState("contentElement"),
			p = Zt(n.disclosure, "contentElement");
		(Qe(() => {
			o.current && n?.setContentElement(o.current);
		}, [n]),
			Qe(() => {
				let z;
				return (
					n?.setState("animated", (D) => ((z = D), !0)),
					() => {
						z !== void 0 && n?.setState("animated", z);
					}
				);
			}, [n]),
			Qe(() => {
				if (_) {
					if (!b?.isConnected) {
						m(null);
						return;
					}
					return sk(() => {
						m(v ? "enter" : g ? "leave" : null);
					});
				}
			}, [_, b, v, g]),
			Qe(() => {
				if (!n || !_ || !h || !b) return;
				const z = () => n?.setState("animating", !1),
					D = () => (0, ko.flushSync)(z);
				if ((h === "leave" && v) || (h === "enter" && !v)) return;
				if (typeof _ == "number") return up(_, D);
				const {
						transitionDuration: A,
						animationDuration: C,
						transitionDelay: k,
						animationDelay: F,
					} = getComputedStyle(b),
					{
						transitionDuration: Q = "0",
						animationDuration: j = "0",
						transitionDelay: q = "0",
						animationDelay: G = "0",
					} = p ? getComputedStyle(p) : {},
					B = lp(k, F, q, G) + lp(A, C, Q, j);
				if (!B) {
					(h === "enter" && n.setState("animated", !1), z());
					return;
				}
				return up(Math.max(B - 1e3 / 60, 0), D);
			}, [n, _, b, p, v, h]),
			(u = ln(u, (z) => (0, S.jsx)(Vh, { value: n, children: z }), [n])));
		const E = tc(g, u.hidden, r),
			x = u.style,
			O = (0, w.useMemo)(() => (E ? { ...x, display: "none" } : x), [E, x]);
		return (
			(u = {
				id: f,
				"data-open": v || void 0,
				"data-enter": h === "enter" || void 0,
				"data-leave": h === "leave" || void 0,
				hidden: E,
				...u,
				ref: Dt(f ? n.setContentElement : null, o, u.ref),
				style: O,
			}),
			ya(u)
		);
	}),
	ok = Ve(function (n) {
		return Ye(lk, Fh(n));
	}),
	Wz = Ve(function ({ unmountOnHide: n, ...r }) {
		const u = Ih();
		return Zt(r.store || u, (s) => !n || s?.mounted) === !1 ? null : (0, S.jsx)(ok, { ...r });
	}),
	ck = "div",
	l_ = Xe(function ({ store: n, alwaysVisible: r, ...u }) {
		const s = Fb(!0),
			o = ON();
		n = n || o;
		const f = !!n && n === s;
		Qt(n, !1);
		const h = (0, w.useRef)(null),
			m = ir(u.id),
			v = n.useState("mounted"),
			g = tc(v, u.hidden, r),
			_ = g ? { ...u.style, display: "none" } : u.style,
			b = n.useState((A) => Array.isArray(A.selectedValue)),
			p = BO(h, "role", u.role),
			E = ((p === "listbox" || p === "tree" || p === "grid") && b) || void 0,
			[x, O] = (0, w.useState)(!1),
			z = n.useState("contentElement");
		(Qe(() => {
			if (!v) return;
			const A = h.current;
			if (!A || z !== A) return;
			const C = () => {
					O(!!A.querySelector("[role='listbox']"));
				},
				k = new MutationObserver(C);
			return (k.observe(A, { subtree: !0, childList: !0, attributeFilter: ["role"] }), C(), () => k.disconnect());
		}, [v, z]),
			x || (u = { role: "listbox", "aria-multiselectable": E, ...u }),
			(u = ln(u, (A) => (0, S.jsx)(NN, { value: n, children: (0, S.jsx)(Gb.Provider, { value: p, children: A }) }), [
				n,
				p,
			])));
		const D = m && (!s || !f) ? n.setContentElement : null;
		return ((u = { id: m, hidden: g, ...u, ref: Dt(D, h, u.ref), style: _ }), ya(u));
	}),
	eD = Ve(function (n) {
		return Ye(ck, l_(n));
	}),
	sp = (0, w.createContext)(null),
	fk = "span",
	s_ = Xe(function (n) {
		return (
			(n = {
				...n,
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
					...n.style,
				},
			}),
			n
		);
	}),
	tD = Ve(function (n) {
		return Ye(fk, s_(n));
	}),
	dk = "span",
	hk = Xe(function (n) {
		return (
			(n = {
				"data-focus-trap": "",
				tabIndex: 0,
				"aria-hidden": !0,
				...n,
				style: { position: "fixed", top: 0, left: 0, ...n.style },
			}),
			(n = s_(n)),
			n
		);
	}),
	co = Ve(function (n) {
		return Ye(dk, hk(n));
	}),
	mk = "div";
function vk(e) {
	return mt(e).body;
}
function gk(e, n) {
	return n ? (typeof n == "function" ? n(e) : n) : mt(e).createElement("div");
}
function yk(e = "id") {
	return `${e ? `${e}-` : ""}${Math.random().toString(36).slice(2, 8)}`;
}
function Cr(e) {
	queueMicrotask(() => {
		e?.focus();
	});
}
var o_ = Xe(function ({
		preserveTabOrder: n,
		preserveTabOrderAnchor: r,
		portalElement: u,
		portalRef: s,
		portal: o = !0,
		...f
	}) {
		const h = (0, w.useRef)(null),
			m = Dt(h, f.ref),
			v = (0, w.useContext)(sp),
			[g, _] = (0, w.useState)(null),
			[b, p] = (0, w.useState)(null),
			E = (0, w.useRef)(null),
			x = (0, w.useRef)(null),
			O = (0, w.useRef)(null),
			z = (0, w.useRef)(null);
		return (
			Qe(() => {
				const D = h.current;
				if (!D || !o) {
					_(null);
					return;
				}
				const A = gk(D, u);
				if (!A) {
					_(null);
					return;
				}
				const C = A.isConnected;
				if ((C || (v || vk(D)).appendChild(A), A.id || (A.id = D.id ? `portal/${D.id}` : yk()), _(A), ah(s, A), !C))
					return () => {
						(A.remove(), ah(s, null));
					};
			}, [o, u, v, s]),
			Qe(() => {
				if (!o || !n || !r) return;
				const D = mt(r).createElement("span");
				return (
					(D.style.position = "fixed"),
					r.insertAdjacentElement("afterend", D),
					p(D),
					() => {
						(D.remove(), p(null));
					}
				);
			}, [o, n, r]),
			(0, w.useEffect)(() => {
				if (!g || !n) return;
				let D = 0;
				const A = (C) => {
					if (!ua(C)) return;
					const k = C.type === "focusin";
					if ((cancelAnimationFrame(D), k)) return aN(g);
					D = requestAnimationFrame(() => {
						rN(g, !0);
					});
				};
				return (
					g.addEventListener("focusin", A, !0),
					g.addEventListener("focusout", A, !0),
					() => {
						(cancelAnimationFrame(D),
							g.removeEventListener("focusin", A, !0),
							g.removeEventListener("focusout", A, !0));
					}
				);
			}, [g, n]),
			(f = ln(
				f,
				(D) => {
					if (((D = (0, S.jsx)(sp.Provider, { value: g || v, children: D })), !o)) return D;
					if (!g) return (0, S.jsx)("span", { ref: m, id: f.id, style: { position: "fixed" }, hidden: !0 });
					((D = (0, S.jsxs)(S.Fragment, {
						children: [
							n &&
								g &&
								(0, S.jsx)(co, {
									ref: x,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-before",
									onFocus: (C) => {
										ua(C, g) ? Cr(Cd()) : Cr(E.current);
									},
								}),
							D,
							n &&
								g &&
								(0, S.jsx)(co, {
									ref: O,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-after",
									onFocus: (C) => {
										ua(C, g) ? Cr(F0()) : Cr(z.current);
									},
								}),
						],
					})),
						g && (D = (0, ko.createPortal)(D, g)));
					let A = (0, S.jsxs)(S.Fragment, {
						children: [
							n &&
								g &&
								(0, S.jsx)(co, {
									ref: E,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-before",
									onFocus: (C) => {
										C.relatedTarget !== z.current && ua(C, g) ? Cr(x.current) : Cr(F0());
									},
								}),
							n && (0, S.jsx)("span", { "aria-owns": g?.id, style: { position: "fixed" } }),
							n &&
								g &&
								(0, S.jsx)(co, {
									ref: z,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-after",
									onFocus: (C) => {
										if (ua(C, g)) Cr(O.current);
										else {
											const k = Cd();
											if (k === x.current) {
												requestAnimationFrame(() => {
													var F;
													return (F = Cd()) == null ? void 0 : F.focus();
												});
												return;
											}
											Cr(k);
										}
									},
								}),
						],
					});
					return (b && n && (A = (0, ko.createPortal)(A, b)), (0, S.jsxs)(S.Fragment, { children: [A, D] }));
				},
				[g, v, o, f.id, n, b],
			)),
			(f = { ...f, ref: m }),
			f
		);
	}),
	nD = Ve(function (n) {
		return Ye(mk, o_(n));
	}),
	op = (0, w.createContext)(0);
function pk({ level: e, children: n }) {
	const r = (0, w.useContext)(op),
		u = Math.max(Math.min(e || r + 1, 6), 1);
	return (0, S.jsx)(op.Provider, { value: u, children: n });
}
var bk = "div",
	c_ = Xe(function ({ autoFocusOnShow: n = !0, ...r }) {
		return ((r = ln(r, (u) => (0, S.jsx)(Hb.Provider, { value: n, children: u }), [n])), r);
	}),
	iD = Ve(function (n) {
		return Ye(bk, c_(n));
	});
function _k(e, n) {
	const r = mt(e).createElement("button");
	return (
		(r.type = "button"),
		(r.tabIndex = -1),
		(r.textContent = "Dismiss popup"),
		Object.assign(r.style, {
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
		r.addEventListener("click", n),
		e.prepend(r),
		() => {
			(r.removeEventListener("click", n), r.remove());
		}
	);
}
function Sk(e) {
	const n = (0, w.useRef)();
	return (
		(0, w.useEffect)(() => {
			if (!e) {
				n.current = null;
				return;
			}
			return un(
				"mousedown",
				(u) => {
					n.current = u.target;
				},
				!0,
			);
		}, [e]),
		n
	);
}
var Od = new WeakMap();
function Ll(e, n, r) {
	Od.has(e) || Od.set(e, new Map());
	const u = Od.get(e),
		s = u.get(n);
	if (!s)
		return (
			u.set(n, r()),
			() => {
				var h;
				((h = u.get(n)) == null || h(), u.delete(n));
			}
		);
	const o = r(),
		f = () => {
			(o(), s(), u.delete(n));
		};
	return (
		u.set(n, f),
		() => {
			u.get(n) === f && (o(), u.set(n, s));
		}
	);
}
function Xh(e, n, r) {
	return Ll(e, n, () => {
		const s = e.getAttribute(n);
		return (
			e.setAttribute(n, r),
			() => {
				s == null ? e.removeAttribute(n) : e.setAttribute(n, s);
			}
		);
	});
}
function ha(e, n, r) {
	return Ll(e, n, () => {
		const s = n in e,
			o = e[n];
		return (
			(e[n] = r),
			() => {
				s ? (e[n] = o) : delete e[n];
			}
		);
	});
}
function sh(e, n) {
	return e
		? Ll(e, "style", () => {
				const u = e.style.cssText;
				return (
					Object.assign(e.style, n),
					() => {
						e.style.cssText = u;
					}
				);
			})
		: () => {};
}
function wk(e, n, r) {
	return e
		? Ll(e, n, () => {
				const s = e.style.getPropertyValue(n);
				return (
					e.style.setProperty(n, r),
					() => {
						s ? e.style.setProperty(n, s) : e.style.removeProperty(n);
					}
				);
			})
		: () => {};
}
var Ek = ["SCRIPT", "STYLE"];
function oh(e) {
	return `__ariakit-dialog-snapshot-${e}`;
}
function Tk(e, n) {
	const r = mt(n),
		u = oh(e);
	if (!r.body[u]) return !0;
	do {
		if (n === r.body) return !1;
		if (n[u]) return !0;
		if (!n.parentElement) return !1;
		n = n.parentElement;
	} while (!0);
}
function xk(e, n, r) {
	return Ek.includes(n.tagName) || !Tk(e, n) ? !1 : !r.some((u) => u && Pt(n, u));
}
function Jh(e, n, r, u) {
	for (let s of n) {
		if (!s?.isConnected) continue;
		const o = n.some((m) => (!m || m === s ? !1 : m.contains(s))),
			f = mt(s),
			h = s;
		for (; s.parentElement && s !== f.body; ) {
			if ((u?.(s.parentElement, h), !o)) for (const m of s.parentElement.children) xk(e, m, n) && r(m, h);
			s = s.parentElement;
		}
	}
}
function Ak(e, n) {
	const { body: r } = mt(n[0]),
		u = [];
	return (
		Jh(e, n, (o) => {
			u.push(ha(o, oh(e), !0));
		}),
		xn(ha(r, oh(e), !0), () => {
			for (const o of u) o();
		})
	);
}
function f_(e, ...n) {
	if (!e) return !1;
	const r = e.getAttribute("data-backdrop");
	return r == null ? !1 : r === "" || r === "true" || !n.length ? !0 : n.some((u) => r === u);
}
function bu(e = "", n = !1) {
	return `__ariakit-dialog-${n ? "ancestor" : "outside"}${e ? `-${e}` : ""}`;
}
function Ck(e, n = "") {
	return xn(ha(e, bu(), !0), ha(e, bu(n), !0));
}
function d_(e, n = "") {
	return xn(ha(e, bu("", !0), !0), ha(e, bu(n, !0), !0));
}
function Wh(e, n) {
	const r = bu(n, !0);
	if (e[r]) return !0;
	const u = bu(n);
	do {
		if (e[u]) return !0;
		if (!e.parentElement) return !1;
		e = e.parentElement;
	} while (!0);
}
function cp(e, n) {
	const r = [],
		u = n.map((o) => o?.id);
	return (
		Jh(
			e,
			n,
			(o) => {
				f_(o, ...u) || r.unshift(Ck(o, e));
			},
			(o, f) => {
				(f.hasAttribute("data-dialog") && f.id !== e) || r.unshift(d_(o, e));
			},
		),
		() => {
			for (const o of r) o();
		}
	);
}
function Rk(e) {
	return e.tagName === "HTML" ? !0 : Pt(mt(e).body, e);
}
function Ok(e, n) {
	if (!e) return !1;
	if (Pt(e, n)) return !0;
	const r = n.getAttribute("aria-activedescendant");
	if (r) {
		const u = mt(e).getElementById(r);
		if (u) return Pt(e, u);
	}
	return !1;
}
function Nk(e, n) {
	if (!("clientY" in e)) return !1;
	const r = n.getBoundingClientRect();
	return r.width === 0 || r.height === 0
		? !1
		: r.top <= e.clientY && e.clientY <= r.top + r.height && r.left <= e.clientX && e.clientX <= r.left + r.width;
}
function Nd({ store: e, type: n, listener: r, capture: u, domReady: s }) {
	const o = Ce(r),
		f = Zt(e, "open"),
		h = (0, w.useRef)(!1);
	(Qe(() => {
		if (!f || !s) return;
		const { contentElement: m } = e.getState();
		if (!m) return;
		const v = () => {
			h.current = !0;
		};
		return (m.addEventListener("focusin", v, !0), () => m.removeEventListener("focusin", v, !0));
	}, [e, f, s]),
		(0, w.useEffect)(
			() =>
				f
					? un(
							n,
							(v) => {
								const { contentElement: g, disclosureElement: _ } = e.getState(),
									b = v.target;
								g &&
									b &&
									Rk(b) &&
									(Pt(g, b) ||
										Ok(_, b) ||
										b.hasAttribute("data-focus-trap") ||
										Nk(v, g) ||
										(h.current && !Wh(b, g.id)) ||
										oN(b) ||
										o(v));
							},
							u,
						)
					: void 0,
			[f, u],
		));
}
function kd(e, n) {
	return typeof e == "function" ? e(n) : !!e;
}
function kk(e, n, r) {
	const u = Sk(Zt(e, "open")),
		s = { store: e, domReady: r, capture: !0 };
	(Nd({
		...s,
		type: "click",
		listener: (o) => {
			const { contentElement: f } = e.getState(),
				h = u.current;
			h && Nb(h) && Wh(h, f?.id) && kd(n, o) && e.hide();
		},
	}),
		Nd({
			...s,
			type: "focusin",
			listener: (o) => {
				const { contentElement: f } = e.getState();
				f && o.target !== mt(f) && kd(n, o) && e.hide();
			},
		}),
		Nd({
			...s,
			type: "contextmenu",
			listener: (o) => {
				kd(n, o) && e.hide();
			},
		}));
}
var fp = (0, w.createContext)({});
function Mk(e) {
	const n = (0, w.useContext)(fp),
		[r, u] = (0, w.useState)([]),
		s = (0, w.useCallback)(
			(f) => {
				var h;
				return (
					u((m) => [...m, f]),
					xn((h = n.add) == null ? void 0 : h.call(n, f), () => {
						u((m) => m.filter((v) => v !== f));
					})
				);
			},
			[n],
		);
	Qe(
		() =>
			on(e, ["open", "contentElement"], (f) => {
				var h;
				if (f.open && f.contentElement) return (h = n.add) == null ? void 0 : h.call(n, e);
			}),
		[e, n],
	);
	const o = (0, w.useMemo)(() => ({ store: e, add: s }), [e, s]);
	return {
		wrapElement: (0, w.useCallback)((f) => (0, S.jsx)(fp.Provider, { value: o, children: f }), [o]),
		nestedDialogs: r,
	};
}
function zk({ attribute: e, contentId: n, contentElement: r, enabled: u }) {
	const [s, o] = Vb(),
		f = (0, w.useCallback)(() => {
			if (!u || !r) return !1;
			const { body: h } = mt(r),
				m = h.getAttribute(e);
			return !m || m === n;
		}, [s, u, r, e, n]);
	return (
		(0, w.useEffect)(() => {
			if (!u || !n || !r) return;
			const { body: h } = mt(r);
			if (f()) return (h.setAttribute(e, n), () => h.removeAttribute(e));
			const m = new MutationObserver(() => (0, ko.flushSync)(o));
			return (m.observe(h, { attributeFilter: [e] }), () => m.disconnect());
		}, [s, u, n, r, f, e]),
		f
	);
}
function Dk(e) {
	const n = e.getBoundingClientRect().left;
	return Math.round(n) + e.scrollLeft ? "paddingLeft" : "paddingRight";
}
function jk(e, n, r) {
	const u = zk({ attribute: "data-dialog-prevent-body-scroll", contentElement: e, contentId: n, enabled: r });
	(0, w.useEffect)(() => {
		if (!u() || !e) return;
		const s = mt(e),
			o = Ob(e),
			{ documentElement: f, body: h } = s,
			m = f.style.getPropertyValue("--scrollbar-width"),
			v = m ? Number.parseInt(m, 10) : o.innerWidth - f.clientWidth,
			g = () => wk(f, "--scrollbar-width", `${v}px`),
			_ = Dk(f),
			b = () => sh(h, { overflow: "hidden", [_]: `${v}px` }),
			p = () => {
				var x, O;
				const { scrollX: z, scrollY: D, visualViewport: A } = o,
					C = (x = A?.offsetLeft) != null ? x : 0,
					k = (O = A?.offsetTop) != null ? O : 0,
					F = sh(h, {
						position: "fixed",
						overflow: "hidden",
						top: `${-(D - Math.floor(k))}px`,
						left: `${-(z - Math.floor(C))}px`,
						right: "0",
						[_]: `${v}px`,
					});
				return () => {
					(F(), o.scrollTo({ left: z, top: D, behavior: "instant" }));
				};
			},
			E = Mh() && !jO();
		return xn(g(), E ? p() : b());
	}, [u, e]);
}
function Lk(e, ...n) {
	if (!e) return !1;
	const r = e.getAttribute("data-focus-trap");
	return r == null ? !1 : n.length ? (r === "" ? !1 : n.some((u) => r === u)) : !0;
}
function h_() {
	return "inert" in HTMLElement.prototype;
}
function qk(e) {
	return Xh(e, "aria-hidden", "true");
}
function m_(e, n) {
	return "style" in e
		? h_()
			? ha(e, "inert", !0)
			: xn(
					...Ko(e, !0).map((r) => {
						if (n?.some((s) => s && Pt(s, r))) return yl;
						const u = Ll(
							r,
							"focus",
							() => (
								(r.focus = yl),
								() => {
									delete r.focus;
								}
							),
						);
						return xn(Xh(r, "tabindex", "-1"), u);
					}),
					qk(e),
					sh(e, { pointerEvents: "none", userSelect: "none", cursor: "default" }),
				)
		: yl;
}
function Uk(e, n) {
	const r = [],
		u = n.map((o) => o?.id);
	return (
		Jh(
			e,
			n,
			(o) => {
				f_(o, ...u) || Lk(o, ...u) || r.unshift(m_(o, n));
			},
			(o) => {
				o.hasAttribute("role") && (n.some((f) => f && Pt(f, o)) || r.unshift(Xh(o, "role", "none")));
			},
		),
		() => {
			for (const o of r) o();
		}
	);
}
function v_(e = {}) {
	const n = Wo(e.store, Qh(e.disclosure, ["contentElement", "disclosureElement"]));
	const r = n?.getState(),
		u = Ne(e.open, r?.open, e.defaultOpen, !1),
		s = Ne(e.animated, r?.animated, !1),
		o = oi(
			{
				open: u,
				animated: s,
				animating: !!s && u,
				mounted: u,
				contentElement: Ne(r?.contentElement, null),
				disclosureElement: Ne(r?.disclosureElement, null),
			},
			n,
		);
	return (
		mn(o, () =>
			on(o, ["animated", "animating"], (f) => {
				f.animated || o.setState("animating", !1);
			}),
		),
		mn(o, () =>
			Ph(o, ["open"], () => {
				o.getState().animated && o.setState("animating", !0);
			}),
		),
		mn(o, () =>
			on(o, ["open", "animating"], (f) => {
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
function g_(e, n, r) {
	return (
		wu(n, [r.store, r.disclosure]),
		zt(e, r, "open", "setOpen"),
		zt(e, r, "mounted", "setMounted"),
		zt(e, r, "animated"),
		Object.assign(e, { disclosure: r.disclosure })
	);
}
function $k(e = {}) {
	const [n, r] = ec(v_, e);
	return g_(n, r, e);
}
var Bk = "div",
	Ik = [
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
	rD = Xe(function (n) {
		return n;
	}),
	Mo = Ve(function (n) {
		return Ye(Bk, n);
	});
Object.assign(
	Mo,
	Ik.reduce(
		(e, n) => (
			(e[n] = Ve(function (u) {
				return Ye(n, u);
			})),
			e
		),
		{},
	),
);
function Vk({ store: e, backdrop: n, alwaysVisible: r, hidden: u }) {
	const s = (0, w.useRef)(null),
		o = $k({ disclosure: e }),
		f = Zt(e, "contentElement");
	((0, w.useEffect)(() => {
		const v = s.current,
			g = f;
		v && g && (v.style.zIndex = getComputedStyle(g).zIndex);
	}, [f]),
		Qe(() => {
			const v = f?.id;
			if (!v) return;
			const g = s.current;
			if (g) return d_(g, v);
		}, [f]));
	const h = Fh({
		ref: s,
		store: o,
		role: "presentation",
		"data-backdrop": f?.id || "",
		alwaysVisible: r,
		hidden: u ?? void 0,
		style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 },
	});
	if (!n) return null;
	if ((0, w.isValidElement)(n)) return (0, S.jsx)(Mo, { ...h, render: n });
	const m = typeof n != "boolean" ? n : "div";
	return (0, S.jsx)(Mo, { ...h, render: (0, S.jsx)(m, {}) });
}
function y_(e = {}) {
	return v_(e);
}
function p_(e, n, r) {
	return g_(e, n, r);
}
function Zk(e = {}) {
	const [n, r] = ec(y_, e);
	return p_(n, r, e);
}
var Hk = "div",
	dp = Ho();
function Pk(e) {
	const n = nr();
	return !n || (e && Pt(e, n)) ? !1 : !!si(n);
}
function hp(e, n = !1) {
	if (!e) return null;
	const r = "current" in e ? e.current : e;
	return r ? (n ? (si(r) ? r : null) : r) : null;
}
var b_ = Xe(function ({
	store: n,
	open: r,
	onClose: u,
	focusable: s = !0,
	modal: o = !0,
	portal: f = !!o,
	backdrop: h = !!o,
	hideOnEscape: m = !0,
	hideOnInteractOutside: v = !0,
	getPersistentElements: g,
	preventBodyScroll: _ = !!o,
	autoFocusOnShow: b = !0,
	autoFocusOnHide: p = !0,
	initialFocus: E,
	finalFocus: x,
	unmountOnHide: O,
	unstable_treeSnapshotKey: z,
	...D
}) {
	const A = Go(),
		C = (0, w.useRef)(null),
		k = Zk({
			store: n || A,
			open: r,
			setOpen(fe) {
				if (fe) return;
				const Ee = C.current;
				if (!Ee) return;
				const Ge = new Event("close", { bubbles: !1, cancelable: !0 });
				(u && Ee.addEventListener("close", u, { once: !0 }),
					Ee.dispatchEvent(Ge),
					Ge.defaultPrevented && k.setOpen(!0));
			},
		}),
		{ portalRef: F, domReady: Q } = Dh(f, D.portalRef),
		j = D.preserveTabOrder,
		q = Zt(k, (fe) => j && !o && fe.mounted),
		G = ir(D.id),
		B = Zt(k, "open"),
		oe = Zt(k, "mounted"),
		ee = Zt(k, "contentElement"),
		Y = tc(oe, D.hidden, D.alwaysVisible);
	(jk(ee, G, _ && !Y), kk(k, v, Q));
	const { wrapElement: ae, nestedDialogs: R } = Mk(k);
	((D = ln(D, ae, [ae])),
		Qe(() => {
			if (!B) return;
			const fe = C.current,
				Ee = nr(fe, !0);
			Ee && Ee.tagName !== "BODY" && ((fe && Pt(fe, Ee)) || k.setDisclosureElement(Ee));
		}, [k, B]),
		dp &&
			(0, w.useEffect)(() => {
				if (!oe) return;
				const { disclosureElement: fe } = k.getState();
				if (!fe || !kr(fe)) return;
				const Ee = () => {
					let Ge = !1;
					const ze = () => {
						Ge = !0;
					};
					(fe.addEventListener("focusin", ze, { capture: !0, once: !0 }),
						fu(fe, "mouseup", () => {
							(fe.removeEventListener("focusin", ze, !0), !Ge && Pb(fe));
						}));
				};
				return (
					fe.addEventListener("mousedown", Ee),
					() => {
						fe.removeEventListener("mousedown", Ee);
					}
				);
			}, [k, oe]),
		(0, w.useEffect)(() => {
			if (!oe || !Q) return;
			const fe = C.current;
			if (!fe) return;
			const Ee = Ob(fe),
				Ge = Ee.visualViewport || Ee,
				ze = () => {
					var bt, st;
					const ue = (st = (bt = Ee.visualViewport) == null ? void 0 : bt.height) != null ? st : Ee.innerHeight;
					fe.style.setProperty("--dialog-viewport-height", `${ue}px`);
				};
			return (
				ze(),
				Ge.addEventListener("resize", ze),
				() => {
					Ge.removeEventListener("resize", ze);
				}
			);
		}, [oe, Q]),
		(0, w.useEffect)(() => {
			if (!o || !oe || !Q) return;
			const fe = C.current;
			if (fe && !fe.querySelector("[data-dialog-dismiss]")) return _k(fe, k.hide);
		}, [k, o, oe, Q]),
		Qe(() => {
			if (!h_() || B || !oe || !Q) return;
			const fe = C.current;
			if (fe) return m_(fe);
		}, [B, oe, Q]));
	const $ = B && Q;
	Qe(() => {
		if (!G || !$) return;
		const fe = C.current;
		return Ak(G, [fe]);
	}, [G, $, z]);
	const H = Ce(g);
	Qe(() => {
		if (!G || !$) return;
		const { disclosureElement: fe } = k.getState(),
			Ee = [C.current, ...(H() || []), ...R.map((Ge) => Ge.getState().contentElement)];
		return o ? xn(cp(G, Ee), Uk(G, Ee)) : cp(G, [fe, ...Ee]);
	}, [G, k, $, H, R, o, z]);
	const se = !!b,
		me = yt(b),
		[Re, N] = (0, w.useState)(!1);
	(0, w.useEffect)(() => {
		if (!B || !se || !Q || !ee?.isConnected) return;
		const fe = hp(E, !0) || ee.querySelector("[data-autofocus=true],[autofocus]") || WO(ee, !0, f && q) || ee,
			Ee = si(fe);
		me(Ee ? fe : null) &&
			(N(!0),
			queueMicrotask(() => {
				(fe.focus(), dp && Ee && fe.scrollIntoView({ block: "nearest", inline: "nearest" }));
			}));
	}, [B, se, Q, ee, E, f, q, me]);
	const X = !!p,
		re = yt(p),
		[de, ge] = (0, w.useState)(!1);
	(0, w.useEffect)(() => {
		if (B) return (ge(!0), () => ge(!1));
	}, [B]);
	const _e = (0, w.useCallback)(
			(fe, Ee = !0) => {
				const { disclosureElement: Ge } = k.getState();
				if (Pk(fe)) return;
				let ze = hp(x) || Ge;
				if (ze?.id) {
					const st = mt(ze),
						ue = `[aria-activedescendant="${ze.id}"]`,
						xe = st.querySelector(ue);
					xe && (ze = xe);
				}
				if (ze && !si(ze)) {
					const st = ze.closest("[data-dialog]");
					if (st?.id) {
						const ue = mt(st),
							xe = `[aria-controls~="${st.id}"]`,
							ct = ue.querySelector(xe);
						ct && (ze = ct);
					}
				}
				const bt = ze && si(ze);
				if (!bt && Ee) {
					requestAnimationFrame(() => _e(fe, !1));
					return;
				}
				re(bt ? ze : null) && bt && ze?.focus({ preventScroll: !0 });
			},
			[k, x, re],
		),
		we = (0, w.useRef)(!1);
	(Qe(() => {
		if (B || !de || !X) return;
		const fe = C.current;
		((we.current = !0), _e(fe));
	}, [B, de, Q, X, _e]),
		(0, w.useEffect)(() => {
			if (!de || !X) return;
			const fe = C.current;
			return () => {
				if (we.current) {
					we.current = !1;
					return;
				}
				_e(fe);
			};
		}, [de, X, _e]));
	const Je = yt(m);
	((0, w.useEffect)(
		() =>
			!Q || !oe
				? void 0
				: un(
						"keydown",
						(Ee) => {
							if (Ee.key !== "Escape" || Ee.defaultPrevented) return;
							const Ge = C.current;
							if (!Ge || Wh(Ge)) return;
							const ze = Ee.target;
							if (!ze) return;
							const { disclosureElement: bt } = k.getState();
							!!(ze.tagName === "BODY" || Pt(Ge, ze) || !bt || Pt(bt, ze)) && Je(Ee) && k.hide();
						},
						!0,
					),
		[k, Q, oe, Je],
	),
		(D = ln(D, (fe) => (0, S.jsx)(pk, { level: o ? 1 : void 0, children: fe }), [o])));
	const De = D.hidden,
		Ke = D.alwaysVisible;
	D = ln(
		D,
		(fe) =>
			h
				? (0, S.jsxs)(S.Fragment, {
						children: [(0, S.jsx)(Vk, { store: k, backdrop: h, hidden: De, alwaysVisible: Ke }), fe],
					})
				: fe,
		[k, h, De, Ke],
	);
	const [xt, At] = (0, w.useState)(),
		[Yt, Be] = (0, w.useState)();
	return (
		(D = ln(
			D,
			(fe) =>
				(0, S.jsx)(Vh, {
					value: k,
					children: (0, S.jsx)(AN.Provider, {
						value: At,
						children: (0, S.jsx)(CN.Provider, { value: Be, children: fe }),
					}),
				}),
			[k],
		)),
		(D = {
			id: G,
			"data-dialog": "",
			role: "dialog",
			tabIndex: s ? -1 : void 0,
			"aria-labelledby": xt,
			"aria-describedby": Yt,
			...D,
			ref: Dt(C, D.ref),
		}),
		(D = c_({ ...D, autoFocusOnShow: Re })),
		(D = Fh({ store: k, ...D })),
		(D = kl({ ...D, focusable: s })),
		(D = o_({ portal: f, ...D, portalRef: F, preserveTabOrder: q })),
		D
	);
});
function ql(e, n = Go) {
	return Ve(function (u) {
		const s = n();
		return Zt(u.store || s, (o) => !u.unmountOnHide || o?.mounted || !!u.open) ? (0, S.jsx)(e, { ...u }) : null;
	});
}
var aD = ql(
		Ve(function (n) {
			return Ye(Hk, b_(n));
		}),
		Go,
	),
	Mr = Math.min,
	Xi = Math.max,
	zo = Math.round,
	fo = Math.floor,
	Ji = (e) => ({ x: e, y: e }),
	Qk = { left: "right", right: "left", bottom: "top", top: "bottom" };
function __(e, n, r) {
	return Xi(e, Mr(n, r));
}
function zr(e, n) {
	return typeof e == "function" ? e(n) : e;
}
function Dr(e) {
	return e.split("-")[0];
}
function Eu(e) {
	return e.split("-")[1];
}
function em(e) {
	return e === "x" ? "y" : "x";
}
function tm(e) {
	return e === "y" ? "height" : "width";
}
function _i(e) {
	const n = e[0];
	return n === "t" || n === "b" ? "y" : "x";
}
function nm(e) {
	return em(_i(e));
}
function Yk(e, n, r) {
	r === void 0 && (r = !1);
	const u = Eu(e),
		s = nm(e),
		o = tm(s);
	let f = s === "x" ? (u === (r ? "end" : "start") ? "right" : "left") : u === "start" ? "bottom" : "top";
	return (n.reference[o] > n.floating[o] && (f = Do(f)), [f, Do(f)]);
}
function Kk(e) {
	const n = Do(e);
	return [ch(e), n, ch(n)];
}
function ch(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var mp = ["left", "right"],
	vp = ["right", "left"],
	Gk = ["top", "bottom"],
	Fk = ["bottom", "top"];
function Xk(e, n, r) {
	switch (e) {
		case "top":
		case "bottom":
			return r ? (n ? vp : mp) : n ? mp : vp;
		case "left":
		case "right":
			return n ? Gk : Fk;
		default:
			return [];
	}
}
function Jk(e, n, r, u) {
	const s = Eu(e);
	let o = Xk(Dr(e), r === "start", u);
	return (s && ((o = o.map((f) => f + "-" + s)), n && (o = o.concat(o.map(ch)))), o);
}
function Do(e) {
	const n = Dr(e);
	return Qk[n] + e.slice(n.length);
}
function Wk(e) {
	var n, r, u, s;
	return {
		top: (n = e.top) != null ? n : 0,
		right: (r = e.right) != null ? r : 0,
		bottom: (u = e.bottom) != null ? u : 0,
		left: (s = e.left) != null ? s : 0,
	};
}
function S_(e) {
	return typeof e != "number" ? Wk(e) : { top: e, right: e, bottom: e, left: e };
}
function jo(e) {
	const { x: n, y: r, width: u, height: s } = e;
	return { width: u, height: s, top: r, left: n, right: n + u, bottom: r + s, x: n, y: r };
}
function gp(e, n, r) {
	let { reference: u, floating: s } = e;
	const o = _i(n),
		f = nm(n),
		h = tm(f),
		m = Dr(n),
		v = o === "y",
		g = u.x + u.width / 2 - s.width / 2,
		_ = u.y + u.height / 2 - s.height / 2,
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
			p = { x: u.x + u.width, y: _ };
			break;
		case "left":
			p = { x: u.x - s.width, y: _ };
			break;
		default:
			p = { x: u.x, y: u.y };
	}
	const E = Eu(n);
	return (E && (p[f] += b * (E === "end" ? 1 : -1) * (r && v ? -1 : 1)), p);
}
async function e2(e, n) {
	var r;
	n === void 0 && (n = {});
	const { x: u, y: s, platform: o, rects: f, elements: h, strategy: m } = e,
		{
			boundary: v = "clippingAncestors",
			rootBoundary: g = "viewport",
			elementContext: _ = "floating",
			altBoundary: b = !1,
			padding: p = 0,
		} = zr(n, e),
		E = S_(p),
		x = h[b ? (_ === "floating" ? "reference" : "floating") : _],
		O = jo(
			await o.getClippingRect({
				element:
					(r = await (o.isElement == null ? void 0 : o.isElement(x))) == null || r
						? x
						: x.contextElement || (await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(h.floating))),
				boundary: v,
				rootBoundary: g,
				strategy: m,
			}),
		),
		z = _ === "floating" ? { x: u, y: s, width: f.floating.width, height: f.floating.height } : f.reference,
		D = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(h.floating)),
		A = ((await (o.isElement == null ? void 0 : o.isElement(D))) &&
			(await (o.getScale == null ? void 0 : o.getScale(D)))) || { x: 1, y: 1 },
		C = jo(
			o.convertOffsetParentRelativeRectToViewportRelativeRect
				? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
						elements: h,
						rect: z,
						offsetParent: D,
						strategy: m,
					})
				: z,
		);
	return {
		top: (O.top - C.top + E.top) / A.y,
		bottom: (C.bottom - O.bottom + E.bottom) / A.y,
		left: (O.left - C.left + E.left) / A.x,
		right: (C.right - O.right + E.right) / A.x,
	};
}
var t2 = 50,
	n2 = async (e, n, r) => {
		const { placement: u = "bottom", strategy: s = "absolute", middleware: o = [], platform: f } = r,
			h = f.detectOverflow ? f : { ...f, detectOverflow: e2 },
			m = await (f.isRTL == null ? void 0 : f.isRTL(n));
		let v = await f.getElementRects({ reference: e, floating: n, strategy: s }),
			{ x: g, y: _ } = gp(v, u, m),
			b = u,
			p = 0;
		const E = {};
		for (let x = 0; x < o.length; x++) {
			const O = o[x];
			if (!O) continue;
			const { name: z, fn: D } = O,
				{
					x: A,
					y: C,
					data: k,
					reset: F,
				} = await D({
					x: g,
					y: _,
					initialPlacement: u,
					placement: b,
					strategy: s,
					middlewareData: E,
					rects: v,
					platform: h,
					elements: { reference: e, floating: n },
				});
			((g = A ?? g),
				(_ = C ?? _),
				(E[z] = { ...E[z], ...k }),
				F &&
					p < t2 &&
					(p++,
					typeof F == "object" &&
						(F.placement && (b = F.placement),
						F.rects &&
							(v = F.rects === !0 ? await f.getElementRects({ reference: e, floating: n, strategy: s }) : F.rects),
						({ x: g, y: _ } = gp(v, b, m))),
					(x = -1)));
		}
		return { x: g, y: _, placement: b, strategy: s, middlewareData: E };
	},
	i2 = (e) => ({
		name: "arrow",
		options: e,
		async fn(n) {
			const { x: r, y: u, placement: s, rects: o, platform: f, elements: h, middlewareData: m } = n,
				{ element: v, padding: g = 0 } = zr(e, n) || {};
			if (v == null) return {};
			const _ = S_(g),
				b = { x: r, y: u },
				p = nm(s),
				E = tm(p),
				x = await f.getDimensions(v),
				O = p === "y",
				z = O ? "top" : "left",
				D = O ? "bottom" : "right",
				A = O ? "clientHeight" : "clientWidth",
				C = o.reference[E] + o.reference[p] - b[p] - o.floating[E],
				k = b[p] - o.reference[p],
				F = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(v));
			let Q = F ? F[A] : 0;
			(!Q || !(await (f.isElement == null ? void 0 : f.isElement(F)))) && (Q = h.floating[A] || o.floating[E]);
			const j = C / 2 - k / 2,
				q = Q / 2 - x[E] / 2 - 1,
				G = Mr(_[z], q),
				B = Mr(_[D], q),
				oe = Q - x[E] - B,
				ee = Q / 2 - x[E] / 2 + j,
				Y = __(G, ee, oe),
				ae = !m.arrow && Eu(s) != null && ee !== Y && o.reference[E] / 2 - (ee < G ? G : B) - x[E] / 2 < 0,
				R = ae ? (ee < G ? ee - G : ee - oe) : 0;
			return {
				[p]: b[p] + R,
				data: { [p]: Y, centerOffset: ee - Y - R, ...(ae && { alignmentOffset: R }) },
				reset: ae,
			};
		},
	}),
	r2 = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "flip",
				options: e,
				async fn(n) {
					var r, u;
					const { placement: s, middlewareData: o, rects: f, initialPlacement: h, platform: m, elements: v } = n,
						{
							mainAxis: g = !0,
							crossAxis: _ = !0,
							fallbackPlacements: b,
							fallbackStrategy: p = "bestFit",
							fallbackAxisSideDirection: E = "none",
							flipAlignment: x = !0,
							...O
						} = zr(e, n);
					if ((r = o.arrow) != null && r.alignmentOffset) return {};
					const z = Dr(s),
						D = _i(h),
						A = Dr(h) === h,
						C = await (m.isRTL == null ? void 0 : m.isRTL(v.floating)),
						k = b || (A || !x ? [Do(h)] : Kk(h)),
						F = E !== "none";
					!b && F && k.push(...Jk(h, x, E, C));
					const Q = [h, ...k],
						j = await m.detectOverflow(n, O),
						q = [];
					let G = ((u = o.flip) == null ? void 0 : u.overflows) || [];
					if ((g && q.push(j[z]), _)) {
						const Y = Yk(s, f, C);
						q.push(j[Y[0]], j[Y[1]]);
					}
					if (((G = [...G, { placement: s, overflows: q }]), !q.every((Y) => Y <= 0))) {
						var B, oe;
						const Y = (((B = o.flip) == null ? void 0 : B.index) || 0) + 1,
							ae = Q[Y];
						if (
							ae &&
							(!(_ === "alignment" && D !== _i(ae)) ||
								G.every(($) => (_i($.placement) === D ? $.overflows[0] > 0 : !0)))
						)
							return { data: { index: Y, overflows: G }, reset: { placement: ae } };
						let R =
							(oe = G.filter(($) => $.overflows[0] <= 0).sort(($, H) => $.overflows[1] - H.overflows[1])[0]) == null
								? void 0
								: oe.placement;
						if (!R)
							switch (p) {
								case "bestFit": {
									var ee;
									const $ =
										(ee = G.filter((H) => {
											if (F) {
												const se = _i(H.placement);
												return se === D || se === "y";
											}
											return !0;
										})
											.map((H) => [H.placement, H.overflows.filter((se) => se > 0).reduce((se, me) => se + me, 0)])
											.sort((H, se) => H[1] - se[1])[0]) == null
											? void 0
											: ee[0];
									$ && (R = $);
									break;
								}
								case "initialPlacement":
									R = h;
									break;
							}
						if (s !== R) return { reset: { placement: R } };
					}
					return {};
				},
			}
		);
	},
	w_ = new Set(["left", "top"]);
async function a2(e, n) {
	const { placement: r, platform: u, elements: s } = e,
		o = await (u.isRTL == null ? void 0 : u.isRTL(s.floating)),
		f = Dr(r),
		h = Eu(r),
		m = _i(r) === "y",
		v = w_.has(f) ? -1 : 1,
		g = o && m ? -1 : 1,
		_ = zr(n, e);
	let {
		mainAxis: b,
		crossAxis: p,
		alignmentAxis: E,
	} = typeof _ == "number"
		? { mainAxis: _, crossAxis: 0, alignmentAxis: null }
		: { mainAxis: _.mainAxis || 0, crossAxis: _.crossAxis || 0, alignmentAxis: _.alignmentAxis };
	return (
		h && typeof E == "number" && (p = h === "end" ? E * -1 : E),
		m ? { x: p * g, y: b * v } : { x: b * v, y: p * g }
	);
}
var u2 = function (e) {
		return (
			e === void 0 && (e = 0),
			{
				name: "offset",
				options: e,
				async fn(n) {
					var r, u;
					const { x: s, y: o, placement: f, middlewareData: h } = n,
						m = await a2(n, e);
					return f === ((r = h.offset) == null ? void 0 : r.placement) && (u = h.arrow) != null && u.alignmentOffset
						? {}
						: { x: s + m.x, y: o + m.y, data: { ...m, placement: f } };
				},
			}
		);
	},
	l2 = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "shift",
				options: e,
				async fn(n) {
					const { x: r, y: u, placement: s, platform: o } = n,
						{
							mainAxis: f = !0,
							crossAxis: h = !1,
							limiter: m = {
								fn: (D) => {
									let { x: A, y: C } = D;
									return { x: A, y: C };
								},
							},
							...v
						} = zr(e, n),
						g = { x: r, y: u },
						_ = await o.detectOverflow(n, v),
						b = _i(s),
						p = em(b);
					let E = g[p],
						x = g[b];
					const O = (D, A) => __(A + _[D === "y" ? "top" : "left"], A, A - _[D === "y" ? "bottom" : "right"]);
					(f && (E = O(p, E)), h && (x = O(b, x)));
					const z = m.fn({ ...n, [p]: E, [b]: x });
					return { ...z, data: { x: z.x - r, y: z.y - u, enabled: { [p]: f, [b]: h } } };
				},
			}
		);
	},
	s2 = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				options: e,
				fn(n) {
					var r, u;
					const { x: s, y: o, placement: f, rects: h, middlewareData: m } = n,
						{ offset: v = 0, mainAxis: g = !0, crossAxis: _ = !0 } = zr(e, n),
						b = { x: s, y: o },
						p = _i(f),
						E = em(p);
					let x = b[E],
						O = b[p];
					const z = zr(v, n),
						D =
							typeof z == "number"
								? { mainAxis: z, crossAxis: 0 }
								: { mainAxis: (r = z.mainAxis) != null ? r : 0, crossAxis: (u = z.crossAxis) != null ? u : 0 };
					if (g) {
						const k = E === "y" ? "height" : "width",
							F = h.reference[E] - h.floating[k] + D.mainAxis,
							Q = h.reference[E] + h.reference[k] - D.mainAxis;
						x < F ? (x = F) : x > Q && (x = Q);
					}
					if (_) {
						var A, C;
						const k = E === "y" ? "width" : "height",
							F = w_.has(Dr(f)),
							Q =
								h.reference[p] -
								h.floating[k] +
								((F && ((A = m.offset) == null ? void 0 : A[p])) || 0) +
								(F ? 0 : D.crossAxis),
							j =
								h.reference[p] +
								h.reference[k] +
								(F ? 0 : ((C = m.offset) == null ? void 0 : C[p]) || 0) -
								(F ? D.crossAxis : 0);
						O < Q ? (O = Q) : O > j && (O = j);
					}
					return { [E]: x, [p]: O };
				},
			}
		);
	},
	o2 = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "size",
				options: e,
				async fn(n) {
					const { placement: r, rects: u, platform: s, elements: o } = n,
						{ apply: f = () => {}, ...h } = zr(e, n),
						m = await s.detectOverflow(n, h),
						v = Dr(r),
						g = Eu(r),
						_ = _i(r) === "y",
						{ width: b, height: p } = u.floating;
					let E, x;
					v === "top" || v === "bottom"
						? ((E = v),
							(x =
								g === ((await (s.isRTL == null ? void 0 : s.isRTL(o.floating))) ? "start" : "end") ? "left" : "right"))
						: ((x = v), (E = g === "end" ? "top" : "bottom"));
					const O = p - m.top - m.bottom,
						z = b - m.left - m.right,
						D = Mr(p - m[E], O),
						A = Mr(b - m[x], z),
						C = n.middlewareData.shift,
						k = !C;
					let F = D,
						Q = A;
					(C != null && C.enabled.x && (Q = z),
						C != null && C.enabled.y && (F = O),
						k && !g && (_ ? (Q = b - 2 * Xi(m.left, m.right)) : (F = p - 2 * Xi(m.top, m.bottom))),
						await f({ ...n, availableWidth: Q, availableHeight: F }));
					const j = await s.getDimensions(o.floating);
					return b !== j.width || p !== j.height ? { reset: { rects: !0 } } : {};
				},
			}
		);
	};
function nc() {
	return typeof window < "u";
}
function Tu(e) {
	return E_(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Tn(e) {
	var n;
	return (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) || window;
}
function rr(e) {
	var n;
	return (n = (E_(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : n.documentElement;
}
function E_(e) {
	return nc() ? e instanceof Node || e instanceof Tn(e).Node : !1;
}
function Si(e) {
	return nc() ? e instanceof Element || e instanceof Tn(e).Element : !1;
}
function qr(e) {
	return nc() ? e instanceof HTMLElement || e instanceof Tn(e).HTMLElement : !1;
}
function yp(e) {
	return !nc() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Tn(e).ShadowRoot;
}
function ic(e) {
	const { overflow: n, overflowX: r, overflowY: u, display: s } = wi(e);
	return /auto|scroll|overlay|hidden|clip/.test(n + u + r) && s !== "inline" && s !== "contents";
}
function c2(e) {
	return /^(table|td|th)$/.test(Tu(e));
}
function rc(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var f2 = /transform|translate|scale|rotate|perspective|filter/,
	d2 = /paint|layout|strict|content/,
	aa = (e) => !!e && e !== "none",
	Md;
function im(e) {
	const n = Si(e) ? wi(e) : e;
	return (
		aa(n.transform) ||
		aa(n.translate) ||
		aa(n.scale) ||
		aa(n.rotate) ||
		aa(n.perspective) ||
		(!rm() && (aa(n.backdropFilter) || aa(n.filter))) ||
		f2.test(n.willChange || "") ||
		d2.test(n.contain || "")
	);
}
function h2(e) {
	let n = ma(e);
	for (; qr(n) && !wl(n); ) {
		if (im(n)) return n;
		if (rc(n)) return null;
		n = ma(n);
	}
	return null;
}
function rm() {
	return (Md == null && (Md = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Md);
}
function wl(e) {
	return /^(html|body|#document)$/.test(Tu(e));
}
function wi(e) {
	return Tn(e).getComputedStyle(e);
}
function ac(e) {
	return Si(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function ma(e) {
	if (Tu(e) === "html") return e;
	const n = e.assignedSlot || e.parentNode || (yp(e) && e.host) || rr(e);
	return yp(n) ? n.host : n;
}
function T_(e) {
	const n = ma(e);
	return wl(n) ? (e.ownerDocument || e).body : qr(n) && ic(n) ? n : T_(n);
}
function El(e, n, r) {
	var u;
	(n === void 0 && (n = []), r === void 0 && (r = !0));
	const s = T_(e),
		o = s === ((u = e.ownerDocument) == null ? void 0 : u.body),
		f = Tn(s);
	if (o) {
		const h = fh(f);
		return n.concat(f, f.visualViewport || [], ic(s) ? s : [], h && r ? El(h) : []);
	} else return n.concat(s, El(s, [], r));
}
function fh(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function x_(e) {
	const n = wi(e);
	let r = parseFloat(n.width) || 0,
		u = parseFloat(n.height) || 0;
	const s = qr(e),
		o = s ? e.offsetWidth : r,
		f = s ? e.offsetHeight : u,
		h = zo(r) !== o || zo(u) !== f;
	return (h && ((r = o), (u = f)), { width: r, height: u, $: h });
}
function am(e) {
	return Si(e) ? e : e.contextElement;
}
function du(e) {
	const n = am(e);
	if (!qr(n)) return Ji(1);
	const r = n.getBoundingClientRect(),
		{ width: u, height: s, $: o } = x_(n);
	let f = (o ? zo(r.width) : r.width) / u,
		h = (o ? zo(r.height) : r.height) / s;
	return ((!f || !Number.isFinite(f)) && (f = 1), (!h || !Number.isFinite(h)) && (h = 1), { x: f, y: h });
}
var m2 = Ji(0);
function A_(e) {
	const n = Tn(e);
	return !rm() || !n.visualViewport ? m2 : { x: n.visualViewport.offsetLeft, y: n.visualViewport.offsetTop };
}
function v2(e, n, r) {
	return (n === void 0 && (n = !1), !!r && n && r === Tn(e));
}
function va(e, n, r, u) {
	(n === void 0 && (n = !1), r === void 0 && (r = !1));
	const s = e.getBoundingClientRect(),
		o = am(e);
	let f = Ji(1);
	n && (u ? Si(u) && (f = du(u)) : (f = du(e)));
	const h = v2(o, r, u) ? A_(o) : Ji(0);
	let m = (s.left + h.x) / f.x,
		v = (s.top + h.y) / f.y,
		g = s.width / f.x,
		_ = s.height / f.y;
	if (o && u) {
		const b = Tn(o),
			p = Si(u) ? Tn(u) : u;
		let E = b,
			x = fh(E);
		for (; x && p !== E; ) {
			const O = du(x),
				z = x.getBoundingClientRect(),
				D = wi(x),
				A = z.left + (x.clientLeft + parseFloat(D.paddingLeft)) * O.x,
				C = z.top + (x.clientTop + parseFloat(D.paddingTop)) * O.y;
			((m *= O.x), (v *= O.y), (g *= O.x), (_ *= O.y), (m += A), (v += C), (E = Tn(x)), (x = fh(E)));
		}
	}
	return jo({ width: g, height: _, x: m, y: v });
}
function uc(e, n) {
	const r = ac(e).scrollLeft;
	return n ? n.left + r : va(rr(e)).left + r;
}
function C_(e, n) {
	const r = e.getBoundingClientRect();
	return { x: r.left + n.scrollLeft - uc(e, r), y: r.top + n.scrollTop };
}
function g2(e) {
	let { elements: n, rect: r, offsetParent: u, strategy: s } = e;
	const o = s === "fixed",
		f = rr(u),
		h = n ? rc(n.floating) : !1;
	if (u === f || (h && o)) return r;
	let m = { scrollLeft: 0, scrollTop: 0 },
		v = Ji(1);
	const g = Ji(0),
		_ = qr(u);
	if ((_ || !o) && ((Tu(u) !== "body" || ic(f)) && (m = ac(u)), _)) {
		const p = va(u);
		((v = du(u)), (g.x = p.x + u.clientLeft), (g.y = p.y + u.clientTop));
	}
	const b = f && !_ && !o ? C_(f, m) : Ji(0);
	return {
		width: r.width * v.x,
		height: r.height * v.y,
		x: r.x * v.x - m.scrollLeft * v.x + g.x + b.x,
		y: r.y * v.y - m.scrollTop * v.y + g.y + b.y,
	};
}
function y2(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function p2(e) {
	const n = ac(e),
		r = e.ownerDocument.body,
		u = Xi(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth),
		s = Xi(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
	let o = -n.scrollLeft + uc(e);
	const f = -n.scrollTop;
	return (
		wi(r).direction === "rtl" && (o += Xi(e.clientWidth, r.clientWidth) - u),
		{ width: u, height: s, x: o, y: f }
	);
}
var b2 = 25;
function _2(e, n, r) {
	r === void 0 && (r = "viewport");
	const u = r === "layoutViewport",
		s = Tn(e),
		o = rr(e),
		f = s.visualViewport;
	let h = o.clientWidth,
		m = o.clientHeight,
		v = 0,
		g = 0;
	if (f) {
		const _ = !rm() || n === "fixed";
		u
			? _ || ((v = -f.offsetLeft), (g = -f.offsetTop))
			: ((h = f.width), (m = f.height), _ && ((v = f.offsetLeft), (g = f.offsetTop)));
	}
	if (uc(o) <= 0) {
		const _ = o.ownerDocument,
			b = _.body,
			p = getComputedStyle(b),
			E = (_.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight)) || 0,
			x = Math.abs(o.clientWidth - b.clientWidth - E),
			O = getComputedStyle(o).scrollbarGutter === "stable both-edges" ? x / 2 : x;
		O <= b2 && (h -= O);
	}
	return { width: h, height: m, x: v, y: g };
}
function S2(e, n) {
	const r = va(e, !0, n === "fixed"),
		u = r.top + e.clientTop,
		s = r.left + e.clientLeft,
		o = du(e);
	return { width: e.clientWidth * o.x, height: e.clientHeight * o.y, x: s * o.x, y: u * o.y };
}
function pp(e, n, r) {
	let u;
	if (n === "viewport" || n === "layoutViewport") u = _2(e, r, n);
	else if (n === "document") u = p2(rr(e));
	else if (Si(n)) u = S2(n, r);
	else {
		const s = A_(e);
		u = { x: n.x - s.x, y: n.y - s.y, width: n.width, height: n.height };
	}
	return jo(u);
}
function w2(e, n) {
	const r = n.get(e);
	if (r) return r;
	let u = El(e, [], !1).filter((h) => Si(h) && Tu(h) !== "body"),
		s = null;
	const o = wi(e).position === "fixed";
	let f = o ? ma(e) : e;
	for (; Si(f) && !wl(f); ) {
		const h = wi(f),
			m = im(f),
			v = s ? s.position : o ? "fixed" : "";
		(!m && (v === "fixed" || (v === "absolute" && h.position === "static")) ? (u = u.filter((g) => g !== f)) : (s = h),
			(f = ma(f)));
	}
	return (n.set(e, u), u);
}
function E2(e) {
	let { element: n, boundary: r, rootBoundary: u, strategy: s } = e;
	const o = [...(r === "clippingAncestors" ? (rc(n) ? [] : w2(n, this._c)) : [].concat(r)), u],
		f = pp(n, o[0], s);
	let h = f.top,
		m = f.right,
		v = f.bottom,
		g = f.left;
	for (let _ = 1; _ < o.length; _++) {
		const b = pp(n, o[_], s);
		((h = Xi(b.top, h)), (m = Mr(b.right, m)), (v = Mr(b.bottom, v)), (g = Xi(b.left, g)));
	}
	return { width: m - g, height: v - h, x: g, y: h };
}
function T2(e) {
	const { width: n, height: r } = x_(e);
	return { width: n, height: r };
}
function x2(e, n, r) {
	const u = qr(n),
		s = rr(n),
		o = r === "fixed",
		f = va(e, !0, o, n);
	let h = { scrollLeft: 0, scrollTop: 0 };
	const m = Ji(0);
	if ((u || !o) && ((Tu(n) !== "body" || ic(s)) && (h = ac(n)), u)) {
		const g = va(n, !0, o, n);
		((m.x = g.x + n.clientLeft), (m.y = g.y + n.clientTop));
	}
	!u && s && (m.x = uc(s));
	const v = s && !u && !o ? C_(s, h) : Ji(0);
	return { x: f.left + h.scrollLeft - m.x - v.x, y: f.top + h.scrollTop - m.y - v.y, width: f.width, height: f.height };
}
function zd(e) {
	return wi(e).position === "static";
}
function bp(e, n) {
	if (!qr(e) || wi(e).position === "fixed") return null;
	if (n) return n(e);
	let r = e.offsetParent;
	return (rr(e) === r && (r = r.ownerDocument.body), r);
}
function R_(e, n) {
	const r = Tn(e);
	if (rc(e)) return r;
	if (!qr(e)) {
		let s = ma(e);
		for (; s && !wl(s); ) {
			if (Si(s) && !zd(s)) return s;
			s = ma(s);
		}
		return r;
	}
	let u = bp(e, n);
	for (; u && c2(u) && zd(u); ) u = bp(u, n);
	return u && wl(u) && zd(u) && !im(u) ? r : u || h2(e) || r;
}
var A2 = async function (e) {
	const n = this.getOffsetParent || R_,
		r = this.getDimensions,
		u = await r(e.floating);
	return {
		reference: x2(e.reference, await n(e.floating), e.strategy),
		floating: { x: 0, y: 0, width: u.width, height: u.height },
	};
};
function C2(e) {
	return wi(e).direction === "rtl";
}
var R2 = {
	convertOffsetParentRelativeRectToViewportRelativeRect: g2,
	getDocumentElement: rr,
	getClippingRect: E2,
	getOffsetParent: R_,
	getElementRects: A2,
	getClientRects: y2,
	getDimensions: T2,
	getScale: du,
	isElement: Si,
	isRTL: C2,
};
function O_(e, n) {
	return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height;
}
function O2(e, n, r) {
	let u = null,
		s;
	const o = rr(e);
	function f() {
		var g;
		(clearTimeout(s), (g = u) == null || g.disconnect(), (u = null));
	}
	function h(g, _) {
		(g === void 0 && (g = !1), _ === void 0 && (_ = 1), f());
		const b = e.getBoundingClientRect(),
			{ left: p, top: E, width: x, height: O } = b;
		if ((g || n(), !x || !O)) return;
		const z = fo(E),
			D = fo(o.clientWidth - (p + x)),
			A = fo(o.clientHeight - (E + O)),
			C = fo(p),
			k = { rootMargin: -z + "px " + -D + "px " + -A + "px " + -C + "px", threshold: Xi(0, Mr(1, _)) || 1 };
		let F = !0;
		function Q(j) {
			const q = j[0].intersectionRatio;
			if (!O_(b, e.getBoundingClientRect())) return h();
			if (q !== _) {
				if (!F) return h();
				q
					? h(!1, q)
					: (s = setTimeout(() => {
							h(!1, 1e-7);
						}, 1e3));
			}
			F = !1;
		}
		try {
			u = new IntersectionObserver(Q, { ...k, root: o.ownerDocument });
		} catch {
			u = new IntersectionObserver(Q, k);
		}
		u.observe(e);
	}
	const m = Tn(e),
		v = () => h(r);
	return (
		m.addEventListener("resize", v),
		h(!0),
		() => {
			(m.removeEventListener("resize", v), f());
		}
	);
}
function N2(e, n, r, u) {
	u === void 0 && (u = {});
	const {
			ancestorScroll: s = !0,
			ancestorResize: o = !0,
			elementResize: f = typeof ResizeObserver == "function",
			layoutShift: h = typeof IntersectionObserver == "function",
			animationFrame: m = !1,
		} = u,
		v = am(e),
		g = s || o ? [...(v ? El(v) : []), ...(n ? El(n) : [])] : [];
	g.forEach((z) => {
		(s && z.addEventListener("scroll", r), o && z.addEventListener("resize", r));
	});
	const _ = v && h ? O2(v, r, o) : null;
	let b = -1,
		p = null;
	f &&
		((p = new ResizeObserver((z) => {
			let [D] = z;
			(D &&
				D.target === v &&
				p &&
				n &&
				(p.unobserve(n),
				cancelAnimationFrame(b),
				(b = requestAnimationFrame(() => {
					var A;
					(A = p) == null || A.observe(n);
				}))),
				r());
		})),
		v && !m && p.observe(v),
		n && p.observe(n));
	let E,
		x = m ? va(e) : null;
	m && O();
	function O() {
		const z = va(e);
		(x && !O_(x, z) && r(), (x = z), (E = requestAnimationFrame(O)));
	}
	return (
		r(),
		() => {
			var z;
			(g.forEach((D) => {
				(s && D.removeEventListener("scroll", r), o && D.removeEventListener("resize", r));
			}),
				_?.(),
				(z = p) == null || z.disconnect(),
				(p = null),
				m && cancelAnimationFrame(E));
		}
	);
}
var k2 = u2,
	M2 = l2,
	z2 = r2,
	D2 = o2,
	j2 = i2,
	L2 = s2,
	q2 = (e, n, r) => {
		const u = new Map(),
			s = r ?? {},
			o = { ...R2, ...s.platform, _c: u };
		return n2(e, n, { ...s, platform: o });
	},
	U2 = "div";
function _p(e = 0, n = 0, r = 0, u = 0) {
	if (typeof DOMRect == "function") return new DOMRect(e, n, r, u);
	const s = { x: e, y: n, width: r, height: u, top: n, right: e + r, bottom: n + u, left: e };
	return { ...s, toJSON: () => s };
}
function $2(e) {
	if (!e) return _p();
	const { x: n, y: r, width: u, height: s } = e;
	return _p(n, r, u, s);
}
function B2(e, n) {
	return {
		contextElement: e || void 0,
		getBoundingClientRect: () => {
			const r = e,
				u = n?.(r);
			return u || !r ? $2(u) : r.getBoundingClientRect();
		},
	};
}
function I2(e) {
	return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e);
}
function Sp(e) {
	const n = window.devicePixelRatio || 1;
	return Math.round(e * n) / n;
}
function V2(e, n) {
	return k2(({ placement: r }) => {
		var u;
		const s = (e?.clientHeight || 0) / 2,
			o = typeof n.gutter == "number" ? n.gutter + s : (u = n.gutter) != null ? u : s;
		return { crossAxis: r.split("-")[1] ? void 0 : n.shift, mainAxis: o, alignmentAxis: n.shift };
	});
}
function Z2(e) {
	if (e.flip === !1) return;
	const n = typeof e.flip == "string" ? e.flip.split(" ") : void 0;
	return (Qt(!n || n.every(I2), !1), z2({ padding: e.overflowPadding, fallbackPlacements: n }));
}
function H2(e) {
	if (!(!e.slide && !e.overlap))
		return M2({ mainAxis: e.slide, crossAxis: e.overlap, padding: e.overflowPadding, limiter: L2() });
}
function P2(e) {
	return D2({
		padding: e.overflowPadding,
		apply({ elements: n, availableWidth: r, availableHeight: u, rects: s }) {
			const o = n.floating,
				f = Math.round(s.reference.width);
			((r = Math.floor(r)),
				(u = Math.floor(u)),
				o.style.setProperty("--popover-anchor-width", `${f}px`),
				o.style.setProperty("--popover-available-width", `${r}px`),
				o.style.setProperty("--popover-available-height", `${u}px`),
				e.sameWidth && (o.style.width = `${f}px`),
				e.fitViewport && ((o.style.maxWidth = `${r}px`), (o.style.maxHeight = `${u}px`)));
		},
	});
}
function Q2(e, n) {
	if (e) return j2({ element: e, padding: n.arrowPadding });
}
var um = Xe(function ({
		store: n,
		modal: r = !1,
		portal: u = !!r,
		preserveTabOrder: s = !0,
		autoFocusOnShow: o = !0,
		wrapperProps: f,
		fixed: h = !1,
		flip: m = !0,
		shift: v = 0,
		slide: g = !0,
		overlap: _ = !1,
		sameWidth: b = !1,
		fitViewport: p = !1,
		gutter: E,
		arrowPadding: x = 4,
		overflowPadding: O = 8,
		getAnchorRect: z,
		updatePosition: D,
		...A
	}) {
		const C = Fo();
		((n = n || C), Qt(n, !1));
		const k = n.useState("arrowElement"),
			F = n.useState("anchorElement"),
			Q = n.useState("disclosureElement"),
			j = n.useState("popoverElement"),
			q = n.useState("contentElement"),
			G = n.useState("placement"),
			B = n.useState("mounted"),
			oe = n.useState("rendered"),
			ee = (0, w.useRef)(null),
			[Y, ae] = (0, w.useState)(!1),
			{ portalRef: R, domReady: $ } = Dh(u, A.portalRef),
			H = Ce(z),
			se = Ce(D),
			me = !!D;
		(Qe(() => {
			if (!j?.isConnected) return;
			j.style.setProperty("--popover-overflow-padding", `${O}px`);
			const N = B2(F, H),
				X = async () => {
					if (!B) return;
					k || (ee.current = ee.current || document.createElement("div"));
					const ge = k || ee.current,
						_e = [
							V2(ge, { gutter: E, shift: v }),
							Z2({ flip: m, overflowPadding: O }),
							H2({ slide: g, shift: v, overlap: _, overflowPadding: O }),
							Q2(ge, { arrowPadding: x }),
							P2({ sameWidth: b, fitViewport: p, overflowPadding: O }),
						],
						we = await q2(N, j, { placement: G, strategy: h ? "fixed" : "absolute", middleware: _e });
					(n?.setState("currentPlacement", we.placement), ae(!0));
					const Je = Sp(we.x),
						De = Sp(we.y);
					if (
						(Object.assign(j.style, { top: "0", left: "0", transform: `translate3d(${Je}px,${De}px,0)` }),
						ge && we.middlewareData.arrow)
					) {
						const { x: Ke, y: xt } = we.middlewareData.arrow,
							At = we.placement.split("-")[0],
							Yt = ge.clientWidth / 2,
							Be = ge.clientHeight / 2,
							fe = Ke != null ? Ke + Yt : -Yt,
							Ee = xt != null ? xt + Be : -Be;
						(j.style.setProperty(
							"--popover-transform-origin",
							{
								top: `${fe}px calc(100% + ${Be}px)`,
								bottom: `${fe}px ${-Be}px`,
								left: `calc(100% + ${Yt}px) ${Ee}px`,
								right: `${-Yt}px ${Ee}px`,
							}[At],
						),
							Object.assign(ge.style, {
								left: Ke != null ? `${Ke}px` : "",
								top: xt != null ? `${xt}px` : "",
								[At]: "100%",
							}));
					}
				},
				de = N2(
					N,
					j,
					async () => {
						me ? (await se({ updatePosition: X }), ae(!0)) : await X();
					},
					{ elementResize: typeof ResizeObserver == "function" },
				);
			return () => {
				(ae(!1), de());
			};
		}, [n, oe, j, k, F, j, G, B, $, h, m, v, g, _, b, p, E, x, O, H, me, se]),
			Qe(() => {
				if (!B || !$ || !j?.isConnected || !q?.isConnected) return;
				const N = () => {
					j.style.zIndex = getComputedStyle(q).zIndex;
				};
				N();
				let X = requestAnimationFrame(() => {
					X = requestAnimationFrame(N);
				});
				return () => cancelAnimationFrame(X);
			}, [B, $, j, q]));
		const Re = h ? "fixed" : "absolute";
		return (
			(A = ln(
				A,
				(N) =>
					(0, S.jsx)("div", {
						...f,
						style: { position: Re, top: 0, left: 0, width: "max-content", ...f?.style },
						ref: n?.setPopoverElement,
						children: N,
					}),
				[n, Re, f],
			)),
			(A = ln(A, (N) => (0, S.jsx)(Xo, { value: n, children: N }), [n])),
			(A = { "data-placing": !Y || void 0, ...A, style: { position: "relative", ...A.style } }),
			(A = b_({
				store: n,
				modal: r,
				portal: u,
				preserveTabOrder: s,
				preserveTabOrderAnchor: Q || F,
				autoFocusOnShow: Y && o,
				...A,
				portalRef: R,
			})),
			A
		);
	}),
	uD = ql(
		Ve(function (n) {
			return Ye(U2, um(n));
		}),
		Fo,
	),
	Y2 = "div";
function K2(e, ...n) {
	if (!e) return !1;
	if ("id" in e) {
		const r = n
			.filter(Boolean)
			.map((u) => `[aria-controls~="${u}"]`)
			.join(", ");
		return r ? e.matches(r) : !1;
	}
	return !1;
}
var G2 = Xe(function ({
		store: n,
		modal: r,
		tabIndex: u,
		alwaysVisible: s,
		autoFocusOnHide: o = !0,
		hideOnInteractOutside: f = !0,
		...h
	}) {
		const m = Jo();
		((n = n || m), Qt(n, !1));
		const v = n.useState("baseElement"),
			g = (0, w.useRef)(!1),
			_ = Zt(n.tag, (b) => b?.renderedItems.length);
		return (
			(h = l_({ store: n, alwaysVisible: s, ...h })),
			(h = um({
				store: n,
				modal: r,
				alwaysVisible: s,
				backdrop: !1,
				autoFocusOnShow: !1,
				finalFocus: v,
				preserveTabOrderAnchor: null,
				unstable_treeSnapshotKey: _,
				...h,
				getPersistentElements() {
					var b;
					const p = ((b = h.getPersistentElements) == null ? void 0 : b.call(h)) || [];
					if (!r || !n) return p;
					const { contentElement: E, baseElement: x } = n.getState();
					if (!x) return p;
					const O = mt(x),
						z = [];
					if ((E?.id && z.push(`[aria-controls~="${E.id}"]`), x?.id && z.push(`[aria-controls~="${x.id}"]`), !z.length))
						return [...p, x];
					const D = z.join(","),
						A = O.querySelectorAll(D);
					return [...p, ...A];
				},
				autoFocusOnHide(b) {
					return Zo(o, b) ? !1 : g.current ? ((g.current = !1), !1) : !0;
				},
				hideOnInteractOutside(b) {
					var p, E;
					const x = n?.getState(),
						O = (p = x?.contentElement) == null ? void 0 : p.id,
						z = (E = x?.baseElement) == null ? void 0 : E.id;
					if (K2(b.target, O, z)) return !1;
					const D = typeof f == "function" ? f(b) : f;
					return (D && (g.current = b.type === "click"), D);
				},
			})),
			h
		);
	}),
	F2 = ql(
		Ve(function (n) {
			return Ye(Y2, G2(n));
		}),
		Jo,
	),
	lD = (0, w.createContext)(null),
	sD = (0, w.createContext)(null),
	Ul = Ti([Nl], [Qo]),
	X2 = Ul.useContext,
	oD = Ul.useScopedContext,
	cD = Ul.useProviderContext,
	fD = Ul.ContextProvider,
	dD = Ul.ScopedContextProvider;
function N_({ popover: e, ...n } = {}) {
	const r = Wo(
		n.store,
		Qh(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
	);
	const u = r?.getState(),
		s = y_({ ...n, store: r }),
		o = Ne(n.placement, u?.placement, "bottom"),
		f = oi(
			{
				...s.getState(),
				placement: o,
				currentPlacement: o,
				anchorElement: Ne(u?.anchorElement, null),
				popoverElement: Ne(u?.popoverElement, null),
				arrowElement: Ne(u?.arrowElement, null),
				rendered: Symbol("rendered"),
			},
			s,
			r,
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
function k_(e, n, r) {
	return (wu(n, [r.popover]), zt(e, r, "placement"), p_(e, n, r));
}
function J2(e) {
	var n;
	const r = e.find((o) => !!o.element),
		u = [...e].reverse().find((o) => !!o.element);
	let s = (n = r?.element) == null ? void 0 : n.parentElement;
	for (; s && u?.element; ) {
		if (u && s.contains(u.element)) return s;
		s = s.parentElement;
	}
	return mt(s).body;
}
function W2(e) {
	return e?.__unstablePrivateStore;
}
function eM(e = {}) {
	var n;
	e.store;
	const r = (n = e.store) == null ? void 0 : n.getState(),
		u = Ne(e.items, r?.items, e.defaultItems, []),
		s = new Map(u.map((b) => [b.id, b])),
		o = { items: u, renderedItems: Ne(r?.renderedItems, []) },
		f = W2(e.store),
		h = oi({ items: u, renderedItems: o.renderedItems }, f),
		m = oi(o, e.store),
		v = (b) => {
			const p = Mb(b, (E) => E.element);
			(h.setState("renderedItems", p), m.setState("renderedItems", p));
		};
	(mn(m, () => Hh(h)),
		mn(h, () =>
			No(h, ["items"], (b) => {
				m.setState("items", b.items);
			}),
		),
		mn(h, () =>
			No(h, ["renderedItems"], (b) => {
				let p = !0,
					E = requestAnimationFrame(() => {
						const { renderedItems: D } = m.getState();
						b.renderedItems !== D && v(b.renderedItems);
					});
				if (typeof IntersectionObserver != "function") return () => cancelAnimationFrame(E);
				const x = () => {
						if (p) {
							p = !1;
							return;
						}
						(cancelAnimationFrame(E), (E = requestAnimationFrame(() => v(b.renderedItems))));
					},
					O = J2(b.renderedItems),
					z = new IntersectionObserver(x, { root: O });
				for (const D of b.renderedItems) D.element && z.observe(D.element);
				return () => {
					(cancelAnimationFrame(E), z.disconnect());
				};
			}),
		));
	const g = (b, p, E = !1) => {
			let x;
			return (
				p((z) => {
					const D = z.findIndex(({ id: C }) => C === b.id),
						A = z.slice();
					if (D !== -1) {
						x = z[D];
						const C = { ...x, ...b };
						((A[D] = C), s.set(b.id, C));
					} else (A.push(b), s.set(b.id, b));
					return A;
				}),
				() => {
					p((z) => {
						if (!x) return (E && s.delete(b.id), z.filter(({ id: C }) => C !== b.id));
						const D = z.findIndex(({ id: C }) => C === b.id);
						if (D === -1) return z;
						const A = z.slice();
						return ((A[D] = x), s.set(b.id, x), A);
					});
				}
			);
		},
		_ = (b) => g(b, (p) => h.setState("items", p), !0);
	return {
		...m,
		registerItem: _,
		renderItem: (b) =>
			xn(
				_(b),
				g(b, (p) => h.setState("renderedItems", p)),
			),
		item: (b) => {
			if (!b) return null;
			let p = s.get(b);
			if (!p) {
				const { items: E } = h.getState();
				((p = E.find((x) => x.id === b)), p && s.set(b, p));
			}
			return p || null;
		},
		__unstablePrivateStore: h,
	};
}
function tM(e, n, r) {
	return (wu(n, [r.store]), zt(e, r, "items", "setItems"), e);
}
var nM = { id: null };
function Ki(e, n) {
	return e.find((r) => (n ? !r.disabled && r.id !== n : !r.disabled));
}
function iM(e, n) {
	return e.filter((r) => (n ? !r.disabled && r.id !== n : !r.disabled));
}
function wp(e, n) {
	return e.filter((r) => r.rowId === n);
}
function rM(e, n, r = !1) {
	const u = e.findIndex((s) => s.id === n);
	return [...e.slice(u + 1), ...(r ? [nM] : []), ...e.slice(0, u)];
}
function M_(e) {
	const n = [];
	for (const r of e) {
		const u = n.find((s) => {
			var o;
			return ((o = s[0]) == null ? void 0 : o.rowId) === r.rowId;
		});
		u ? u.push(r) : n.push([r]);
	}
	return n;
}
function z_(e) {
	let n = 0;
	for (const { length: r } of e) r > n && (n = r);
	return n;
}
function aM(e) {
	return { id: "__EMPTY_ITEM__", disabled: !0, rowId: e };
}
function uM(e, n, r) {
	const u = z_(e);
	for (const s of e)
		for (let o = 0; o < u; o += 1) {
			const f = s[o];
			if (!f || (r && f.disabled)) {
				const h = o === 0 && r ? Ki(s) : s[o - 1];
				s[o] = h && n !== h.id && r ? h : aM(h?.rowId);
			}
		}
	return e;
}
function lM(e) {
	const n = M_(e),
		r = z_(n),
		u = [];
	for (let s = 0; s < r; s += 1)
		for (const o of n) {
			const f = o[s];
			f && u.push({ ...f, rowId: f.rowId ? `${s}` : void 0 });
		}
	return u;
}
function D_(e = {}) {
	var n;
	const r = (n = e.store) == null ? void 0 : n.getState(),
		u = eM(e),
		s = Ne(e.activeId, r?.activeId, e.defaultActiveId),
		o = oi(
			{
				...u.getState(),
				id: Ne(e.id, r?.id, `id-${Math.random().toString(36).slice(2, 8)}`),
				activeId: s,
				baseElement: Ne(r?.baseElement, null),
				includesBaseElement: Ne(e.includesBaseElement, r?.includesBaseElement, s === null),
				moves: Ne(r?.moves, 0),
				orientation: Ne(e.orientation, r?.orientation, "both"),
				rtl: Ne(e.rtl, r?.rtl, !1),
				virtualFocus: Ne(e.virtualFocus, r?.virtualFocus, !1),
				focusLoop: Ne(e.focusLoop, r?.focusLoop, !1),
				focusWrap: Ne(e.focusWrap, r?.focusWrap, !1),
				focusShift: Ne(e.focusShift, r?.focusShift, !1),
			},
			u,
			e.store,
		);
	mn(o, () =>
		on(o, ["renderedItems", "activeId"], (h) => {
			o.setState("activeId", (m) => {
				var v;
				return m !== void 0 ? m : (v = Ki(h.renderedItems)) == null ? void 0 : v.id;
			});
		}),
	);
	const f = (h = "next", m = {}) => {
		var v, g;
		const _ = o.getState(),
			{
				skip: b = 0,
				activeId: p = _.activeId,
				focusShift: E = _.focusShift,
				focusLoop: x = _.focusLoop,
				focusWrap: O = _.focusWrap,
				includesBaseElement: z = _.includesBaseElement,
				renderedItems: D = _.renderedItems,
				rtl: A = _.rtl,
			} = m,
			C = h === "up" || h === "down",
			k = h === "next" || h === "down",
			F = k ? A && !C : !A || C,
			Q = E && !b;
		let j = C ? Yb(uM(M_(D), p, Q)) : D;
		if (((j = F ? uh(j) : j), (j = C ? lM(j) : j), p == null)) return (v = Ki(j)) == null ? void 0 : v.id;
		const q = j.find((H) => H.id === p);
		if (!q) return (g = Ki(j)) == null ? void 0 : g.id;
		const G = j.some((H) => H.rowId),
			B = j.indexOf(q),
			oe = j.slice(B + 1),
			ee = wp(oe, q.rowId);
		if (b) {
			const H = iM(ee, p),
				se = H.slice(b)[0] || H[H.length - 1];
			return se?.id;
		}
		const Y = x && (C ? x !== "horizontal" : x !== "vertical"),
			ae = G && O && (C ? O !== "horizontal" : O !== "vertical"),
			R = k ? (!G || C) && Y && z : C ? z : !1;
		if (Y) {
			const H = Ki(rM(ae && !R ? j : wp(j, q.rowId), p, R), p);
			return H?.id;
		}
		if (ae) {
			const H = Ki(R ? ee : oe, p);
			return R ? H?.id || null : H?.id;
		}
		const $ = Ki(ee, p);
		return !$ && R ? null : $?.id;
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
			return (h = Ki(o.getState().renderedItems)) == null ? void 0 : h.id;
		},
		last: () => {
			var h;
			return (h = Ki(uh(o.getState().renderedItems))) == null ? void 0 : h.id;
		},
		next: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("next", h)),
		previous: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("previous", h)),
		down: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("down", h)),
		up: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("up", h)),
	};
}
function sM(e) {
	return { id: ir(e.id), ...e };
}
function j_(e, n, r) {
	return (
		(e = tM(e, n, r)),
		zt(e, r, "activeId", "setActiveId"),
		zt(e, r, "includesBaseElement"),
		zt(e, r, "virtualFocus"),
		zt(e, r, "orientation"),
		zt(e, r, "rtl"),
		zt(e, r, "focusLoop"),
		zt(e, r, "focusWrap"),
		zt(e, r, "focusShift"),
		e
	);
}
var oM = Ho() && Lb();
function cM({ tag: e, ...n } = {}) {
	const r = Wo(n.store, Xb(e, ["value", "rtl"]));
	const u = e?.getState(),
		s = r?.getState(),
		o = Ne(n.activeId, s?.activeId, n.defaultActiveId, null),
		f = D_({
			...n,
			activeId: o,
			includesBaseElement: Ne(n.includesBaseElement, s?.includesBaseElement, !0),
			orientation: Ne(n.orientation, s?.orientation, "vertical"),
			focusLoop: Ne(n.focusLoop, s?.focusLoop, !0),
			focusWrap: Ne(n.focusWrap, s?.focusWrap, !0),
			virtualFocus: Ne(n.virtualFocus, s?.virtualFocus, !0),
		}),
		h = N_({ ...n, placement: Ne(n.placement, s?.placement, "bottom-start") }),
		m = Ne(n.value, s?.value, n.defaultValue, ""),
		v = Ne(n.selectedValue, s?.selectedValue, u?.values, n.defaultSelectedValue, ""),
		g = Array.isArray(v),
		_ = {
			...f.getState(),
			...h.getState(),
			value: m,
			selectedValue: v,
			resetValueOnSelect: Ne(n.resetValueOnSelect, s?.resetValueOnSelect, g),
			resetValueOnHide: Ne(n.resetValueOnHide, s?.resetValueOnHide, g && !e),
			activeValue: s?.activeValue,
		},
		b = oi(_, f, h, r);
	return (
		oM &&
			mn(b, () =>
				on(b, ["virtualFocus"], () => {
					b.setState("virtualFocus", !1);
				}),
			),
		mn(b, () => {
			if (e)
				return xn(
					on(b, ["selectedValue"], (p) => {
						Array.isArray(p.selectedValue) && e.setValues(p.selectedValue);
					}),
					on(e, ["values"], (p) => {
						b.setState("selectedValue", p.values);
					}),
				);
		}),
		mn(b, () =>
			on(b, ["resetValueOnHide", "mounted"], (p) => {
				p.resetValueOnHide && (p.mounted || b.setState("value", m));
			}),
		),
		mn(b, () =>
			on(b, ["open"], (p) => {
				p.open || (b.setState("activeId", o), b.setState("moves", 0));
			}),
		),
		mn(b, () =>
			on(b, ["moves", "activeId"], (p, E) => {
				p.moves === E.moves && b.setState("activeValue", void 0);
			}),
		),
		mn(b, () =>
			No(b, ["moves", "renderedItems"], (p, E) => {
				if (p.moves === E.moves) return;
				const { activeId: x } = b.getState(),
					O = f.item(x);
				b.setState("activeValue", O?.value);
			}),
		),
		{
			...h,
			...f,
			...b,
			tag: e,
			setValue: (p) => b.setState("value", p),
			resetValue: () => b.setState("value", _.value),
			setSelectedValue: (p) => b.setState("selectedValue", p),
		}
	);
}
function fM(e) {
	const n = X2();
	return ((e = { ...e, tag: e.tag !== void 0 ? e.tag : n }), sM(e));
}
function dM(e, n, r) {
	return (
		wu(n, [r.tag]),
		zt(e, r, "value", "setValue"),
		zt(e, r, "selectedValue", "setSelectedValue"),
		zt(e, r, "resetValueOnHide"),
		zt(e, r, "resetValueOnSelect"),
		Object.assign(j_(k_(e, n, r), n, r), { tag: r.tag })
	);
}
function hM(e = {}) {
	e = fM(e);
	const [n, r] = ec(cM, e);
	return dM(n, r, e);
}
var Dd =
	'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function $l(e) {
	const n = (0, w.useRef)(null);
	((0, w.useEffect)(() => {
		const u = document.activeElement instanceof HTMLElement ? document.activeElement : null,
			s = n.current;
		return (
			(s?.querySelector("[data-dialog-initial]") ?? s?.querySelector(Dd))?.focus(),
			() => {
				u?.focus();
			}
		);
	}, []),
		(0, w.useEffect)(() => {
			const u = n.current;
			if (!u) return;
			const s = () => {
					!u.isConnected ||
						document.activeElement !== document.body ||
						(u.querySelector("[data-dialog-initial]") ?? u.querySelector(Dd))?.focus();
				},
				o = () => queueMicrotask(s);
			return (u.addEventListener("focusout", o), () => u.removeEventListener("focusout", o));
		}, []));
	const r = (u) => {
		if (u.key === "Escape") {
			(u.stopPropagation(), e.onClose());
			return;
		}
		if (u.key !== "Tab") return;
		const s = n.current;
		if (!s) return;
		const o = [...s.querySelectorAll(Dd)];
		if (o.length === 0) return;
		const f = o[0],
			h = o[o.length - 1];
		u.shiftKey && document.activeElement === f
			? (u.preventDefault(), h.focus())
			: !u.shiftKey && document.activeElement === h && (u.preventDefault(), f.focus());
	};
	return (0, S.jsx)("div", {
		className: "dialog-overlay",
		children: (0, S.jsx)("div", {
			ref: n,
			className: "dialog",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": e.labelledBy,
			onKeyDown: r,
			children: e.children,
		}),
	});
}
function L_(e) {
	const [n, r] = (0, w.useState)([]),
		u = (f) => {
			const h = {
				text: f.text,
				attachments: f.attachments,
				editedAt: null,
				deletedAt: null,
				...(f.mentions.length > 0 ? { mentions: f.mentions } : {}),
			};
			e.client.data
				.append({ collection: e.collection, keyPrefix: e.keyPrefix, value: h, clientRequestId: f.clientRequestId })
				.then((m) => {
					if ("_nay" in m) {
						const _ = m._nay.name === "storage_full";
						(_ && e.onStorageFull(m._nay.message),
							r((b) =>
								b.map((p) =>
									p.clientRequestId === f.clientRequestId
										? { ...p, status: "failed", errorMessage: _ ? null : m._nay.message }
										: p,
								),
							));
						return;
					}
					r((_) => _.filter((b) => b.clientRequestId !== f.clientRequestId));
					const v = m._yay.key,
						g = yu(v) ?? Date.now();
					e.onDelivered({
						key: v,
						value: h,
						revision: 0,
						createdBy: e.userId,
						updatedBy: e.userId,
						createdAt: g,
						updatedAt: g,
						timestamp: g,
					});
				})
				.catch((m) => {
					r((v) =>
						v.map((g) =>
							g.clientRequestId === f.clientRequestId ? { ...g, status: "failed", errorMessage: Xn(m) } : g,
						),
					);
				});
		};
	return {
		pending: n,
		send: (f, h, m) => {
			const v = crypto.randomUUID();
			(r((g) => [
				...g,
				{ clientRequestId: v, text: f, attachments: h, mentions: m, status: "sending", errorMessage: null },
			]),
				u({ clientRequestId: v, text: f, attachments: h, mentions: m }));
		},
		retry: (f) => {
			(r((h) =>
				h.map((m) => (m.clientRequestId === f.clientRequestId ? { ...m, status: "sending", errorMessage: null } : m)),
			),
				u(f));
		},
		busy: n.some((f) => f.status === "sending"),
	};
}
var mM = ["image/", "video/", "audio/", "application/", "text/"],
	Ep = 20;
function vM(e) {
	const [n, r] = (0, w.useState)(new Map()),
		[u, s] = (0, w.useState)(!1),
		[o, f] = (0, w.useState)(null),
		h = (0, w.useRef)(new Map()),
		m = (0, w.useRef)(null);
	(0, w.useEffect)(() => {
		const g = m.current;
		if (g === null) return;
		const _ = h.current.get(g);
		_ && ((m.current = null), _.focus());
	}, [n]);
	const v = (g) => {
		((m.current = g),
			s(!0),
			f(null),
			(async () => {
				const _ = new Map(n);
				for (let b = 0; b < e.attachments.length; b += Ep) {
					const p = e.attachments.slice(b, b + Ep),
						E = await e.client.fetchJson("/api/v1/files/download-urls", {
							body: { fileNodeIds: p.map((O) => O.fileNodeId) },
						}),
						x = eO.safeParse(E);
					if (!x.success) throw new Error("Unexpected response for the download links");
					for (const O of x.data.items) _.set(O.fileNodeId, { kind: "ready", url: O.url });
					for (const O of x.data.errors) _.set(O.fileNodeId, { kind: "error", message: O.message });
				}
				return _;
			})()
				.then((_) => {
					(s(!1), r(_));
				})
				.catch((_) => {
					(s(!1), (m.current = null), f(Xn(_)));
				}));
	};
	return (0, S.jsxs)("div", {
		className: "message-attachments",
		children: [
			e.attachments.map((g) => {
				const _ = n.get(g.fileNodeId);
				return _?.kind === "ready"
					? (0, S.jsxs)(
							"span",
							{
								className: "attachment",
								children: [
									(0, S.jsx)("a", {
										ref: (b) => {
											b === null ? h.current.delete(g.fileNodeId) : h.current.set(g.fileNodeId, b);
										},
										className: "attachment-link",
										href: _.url,
										target: "_blank",
										rel: "noopener noreferrer",
										children: g.name,
									}),
									(0, S.jsx)("span", {
										className: "attachment-hint",
										children: "Link ready — it expires after a few minutes.",
									}),
								],
							},
							g.fileNodeId,
						)
					: (0, S.jsxs)(
							"span",
							{
								className: "attachment",
								children: [
									(0, S.jsx)("button", {
										type: "button",
										className: "attachment-button",
										disabled: u,
										onClick: () => v(g.fileNodeId),
										children: u ? `Getting link for ${g.name}…` : g.name,
									}),
									_?.kind === "error"
										? (0, S.jsx)("span", { className: "attachment-error", role: "alert", children: _.message })
										: null,
								],
							},
							g.fileNodeId,
						);
			}),
			o !== null ? (0, S.jsx)("span", { className: "attachment-error", role: "alert", children: o }) : null,
		],
	});
}
function gM(e) {
	const n = (0, w.useId)(),
		[r, u] = (0, w.useState)([]),
		[s, o] = (0, w.useState)(null),
		[f, h] = (0, w.useState)(!1),
		[m, v] = (0, w.useState)(!1),
		[g, _] = (0, w.useState)(null),
		b = (0, w.useRef)(new Set()),
		p = (0, w.useRef)(!1),
		E = () => {
			(v(!0),
				_(null),
				e.client
					.fetchJson("/api/v1/files/list", {
						body: {
							path: "/",
							recursive: !0,
							kind: "file",
							limit: 100,
							scanLimit: 1e4,
							contentTypePrefixes: mM,
							cursor: s,
						},
					})
					.then((x) => {
						v(!1);
						const O = WR.safeParse(x);
						if (!O.success) {
							_("Unexpected response from the file list");
							return;
						}
						const z = O.data.items.filter((D) => !b.current.has(D.nodeId));
						for (const D of z) b.current.add(D.nodeId);
						(u((D) => [...D, ...z]), o(O.data.cursor), h(O.data.isDone));
					})
					.catch((x) => {
						(v(!1), _(Xn(x)));
					}));
		};
	return (
		(0, w.useEffect)(() => {
			p.current || ((p.current = !0), E());
		}, []),
		(0, S.jsxs)($l, {
			labelledBy: n,
			onClose: e.onClose,
			children: [
				(0, S.jsx)("h2", { id: n, className: "dialog-title", children: "Attach a file" }),
				(0, S.jsx)("button", {
					type: "button",
					className: "button",
					"data-dialog-initial": !0,
					onClick: e.onClose,
					children: "Cancel",
				}),
				r.length > 0
					? (0, S.jsx)("ul", {
							className: "picker-list",
							children: r.map((x) =>
								(0, S.jsx)(
									"li",
									{
										children: (0, S.jsxs)("button", {
											type: "button",
											className: "picker-item",
											onClick: () => e.onPick({ fileNodeId: x.nodeId, name: x.name }),
											children: [
												(0, S.jsx)("span", { className: "picker-item-name", children: x.name }),
												(0, S.jsx)("span", { className: "picker-item-path", children: x.path }),
											],
										}),
									},
									x.nodeId,
								),
							),
						})
					: null,
				m ? (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading files…" }) : null,
				g !== null
					? (0, S.jsxs)("div", {
							className: "channel-status is-error",
							role: "alert",
							children: [
								(0, S.jsx)("span", { children: g }),
								(0, S.jsx)("button", { type: "button", className: "button", onClick: E, children: "Retry" }),
							],
						})
					: null,
				!m && g === null && r.length === 0 && f
					? (0, S.jsx)("div", { className: "channel-status", children: "No files found." })
					: null,
				!f && !m && g === null
					? (0, S.jsx)("button", { type: "button", className: "button", onClick: E, children: "Load more" })
					: null,
			],
		})
	);
}
var yM = 8,
	pM = 100,
	bM = 10,
	dh = new WeakMap(),
	jd = new WeakMap();
function _M(e) {
	const n = dh.get(e);
	if (n !== void 0) return Promise.resolve(n);
	const r = jd.get(e);
	if (r !== void 0) return r;
	const u = SM(e).then((s) => (s.status === "ready" && dh.set(e, s), jd.delete(e), s));
	return (jd.set(e, u), u);
}
async function SM(e) {
	const n = [];
	let r;
	for (let u = 0; u < bM; u += 1) {
		const s = await e.members.list({ limit: pM, ...(r === void 0 ? {} : { cursor: r }) });
		if ("_nay" in s) return n.length > 0 ? { status: "ready", members: n } : { status: "refused", name: s._nay.name };
		if ((n.push(...s._yay.members), s._yay.cursor === null)) return { status: "ready", members: n };
		r = s._yay.cursor;
	}
	return { status: "ready", members: n };
}
function Tp(e) {
	return `mention:${e}`;
}
function q_(e) {
	const n = (0, w.useId)(),
		[r, u] = (0, w.useState)(""),
		[s, o] = (0, w.useState)([]),
		[f, h] = (0, w.useState)(!1),
		[m, v] = (0, w.useState)(null),
		[g, _] = (0, w.useState)(null),
		b = (0, w.useRef)(new Map()),
		p = (0, w.useRef)(null),
		E = (0, w.useRef)(null),
		x = hM({
			placement: "top-start",
			resetValueOnHide: !1,
			setOpen: (j) => {
				j || _(null);
			},
		}),
		O = e.client.context.userId,
		z =
			g !== null && m !== null && m !== "loading" && m.status === "ready" ? IR(m.members, g.query, O).slice(0, yM) : [],
		D = g !== null && (m === "loading" || (m !== null && m.status === "refused") || z.length > 0),
		A = () => {
			if (m !== null) return;
			const j = dh.get(e.client);
			if (j !== void 0) {
				v(j);
				return;
			}
			(v("loading"), _M(e.client).then(v));
		},
		C = (j) => {
			if (g === null) return;
			const q = p.current?.selectionStart ?? r.length,
				G = VR(r, g.start, q, j.label);
			(b.current.set(j.userId, j.label), u(G.text), _(null), (E.current = G.caret), x.hide(), x.setValue(""));
		},
		k = () => {
			if (e.busy || e.disabled) return;
			const j = r.trim();
			if (j === "" && s.length === 0) return;
			const q = ZR(b.current, j);
			(e.onSend(j, s, q), u(""), o([]), _(null), b.current.clear(), x.hide());
		},
		F = (j) => {
			const q = j.currentTarget.value,
				G = j.currentTarget.selectionStart ?? q.length;
			u(q);
			const B = BR(q, G);
			if ((_(B), x.setValue(B?.query ?? ""), B === null)) {
				x.hide();
				return;
			}
			A();
		},
		Q = (j) => {
			if (D) {
				if (j.key === "ArrowLeft" || j.key === "ArrowRight") {
					x.hide();
					return;
				}
				if (j.key === "Escape") {
					(j.preventDefault(), j.stopPropagation(), _(null), x.hide());
					return;
				}
				if ((j.key === "Enter" || j.key === "Tab") && !j.shiftKey && z.length > 0) {
					j.preventDefault();
					const q = x.getState().activeId,
						G = z.find((B) => Tp(B.userId) === q) ?? z[0];
					C(G);
					return;
				}
			}
			j.key === "Enter" && !j.shiftKey && (j.preventDefault(), k());
		};
	return (
		(0, w.useLayoutEffect)(() => {
			x.setOpen(D);
		}, [x, D]),
		(0, w.useLayoutEffect)(() => {
			const j = E.current;
			if (j === null) return;
			E.current = null;
			const q = p.current;
			q !== null && (q.focus(), q.setSelectionRange(j, j));
		}, [r]),
		(0, w.useEffect)(() => {
			x.render();
		}, [x, r]),
		(0, S.jsxs)("div", {
			className: "composer",
			children: [
				s.length > 0
					? (0, S.jsx)("ul", {
							className: "composer-attachments",
							children: s.map((j) =>
								(0, S.jsxs)(
									"li",
									{
										className: "composer-attachment",
										children: [
											(0, S.jsx)("span", { children: j.name }),
											(0, S.jsx)("button", {
												type: "button",
												className: "composer-attachment-remove",
												"aria-label": `Remove attachment ${j.name}`,
												onClick: () => o((q) => q.filter((G) => G.fileNodeId !== j.fileNodeId)),
												children: "×",
											}),
										],
									},
									j.fileNodeId,
								),
							),
						})
					: null,
				(0, S.jsxs)("div", {
					className: "composer-bar",
					children: [
						(0, S.jsx)(UN, {
							store: x,
							autoSelect: !0,
							value: r,
							showOnClick: !1,
							showOnChange: !1,
							showOnKeyPress: !1,
							setValueOnChange: !1,
							render: (0, S.jsx)("textarea", {
								ref: p,
								className: "composer-input",
								"aria-label": e.label,
								"aria-describedby": n,
								placeholder: e.label,
								rows: 1,
								onChange: F,
								onKeyDown: Q,
								onPointerDown: x.hide,
								onScroll: x.render,
							}),
						}),
						(0, S.jsx)("button", {
							type: "button",
							className: "composer-action",
							"aria-label": "Attach file",
							disabled: e.disabled,
							onClick: () => h(!0),
							children: (0, S.jsx)(mO, { size: 18, "aria-hidden": "true" }),
						}),
						(0, S.jsx)("button", {
							type: "button",
							className: "composer-action composer-send",
							"aria-label": e.busy ? "Sending…" : "Send",
							disabled: e.busy || e.disabled,
							onClick: k,
							children: (0, S.jsx)(cO, { size: 18, "aria-hidden": "true" }),
						}),
					],
				}),
				(0, S.jsxs)(F2, {
					store: x,
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					fitViewport: !0,
					hidden: !D,
					getAnchorRect: () => {
						const j = p.current;
						return j === null ? null : j.getBoundingClientRect();
					},
					className: "mention-menu",
					"aria-label": "Mention somebody",
					children: [
						m === "loading"
							? (0, S.jsx)("div", { className: "mention-menu-status", role: "status", children: "Loading people…" })
							: null,
						m !== null && m !== "loading" && m.status === "refused"
							? (0, S.jsx)("div", { className: "mention-menu-status", role: "status", children: Ab(m.name) })
							: null,
						z.map((j) =>
							(0, S.jsx)(
								uk,
								{
									id: Tp(j.userId),
									value: j.label,
									setValueOnClick: !1,
									focusOnHover: !0,
									className: "mention-option",
									onMouseDown: (q) => {
										q.preventDefault();
									},
									onClick: () => C(j),
									children: j.label,
								},
								j.userId,
							),
						),
					],
				}),
				(0, S.jsx)("span", { id: n, className: "composer-hint", children: "Enter sends · Shift+Enter for a new line" }),
				f
					? (0, S.jsx)(gM, {
							client: e.client,
							onPick: (j) => {
								(o((q) => (q.some((G) => G.fileNodeId === j.fileNodeId) ? q : [...q, j])), h(!1));
							},
							onClose: () => h(!1),
						})
					: null,
			],
		})
	);
}
function wM(e) {
	const [n, r] = (0, w.useState)(!1),
		u = (0, w.useRef)(null),
		s = (0, w.useRef)([]);
	(0, w.useEffect)(() => {
		n && s.current[0]?.focus();
	}, [n]);
	const o = () => {
			(r(!1), u.current?.focus());
		},
		f = (h, m) => {
			h.key === "Escape"
				? (h.preventDefault(), o())
				: h.key === "ArrowRight" || h.key === "ArrowDown"
					? (h.preventDefault(), s.current[(m + 1) % su.length]?.focus())
					: (h.key === "ArrowLeft" || h.key === "ArrowUp") &&
						(h.preventDefault(), s.current[(m + su.length - 1) % su.length]?.focus());
		};
	return (0, S.jsxs)("span", {
		className: "add-reaction",
		children: [
			(0, S.jsx)("button", {
				ref: u,
				type: "button",
				className: "button message-action",
				"aria-expanded": n,
				onClick: () => (n ? o() : r(!0)),
				children: "Add reaction",
			}),
			n
				? (0, S.jsx)("span", {
						className: "reaction-palette",
						role: "group",
						"aria-label": "Choose a reaction",
						children: su.map((h, m) => {
							const v = e.groups.find((g) => g.token === h)?.reactedByMe ?? !1;
							return (0, S.jsx)(
								"button",
								{
									ref: (g) => {
										s.current[m] = g;
									},
									type: "button",
									className: "reaction-palette-item",
									"aria-pressed": v,
									"aria-label": wb[h],
									onKeyDown: (g) => f(g, m),
									onClick: () => {
										(e.onPick(h, v), o());
									},
									children: (0, S.jsx)("span", { "aria-hidden": "true", children: Sb[h] }),
								},
								h,
							);
						}),
					})
				: null,
		],
	});
}
var U_ = 1440 * 60 * 1e3,
	EM = 300 * 1e3;
function TM(e) {
	return new Date(e).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" });
}
function hh(e) {
	return new Date(e).toLocaleDateString(void 0, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}
function xM(e, n) {
	const r = new Date(e).toDateString();
	return r === new Date(n).toDateString() ? "Today" : r === new Date(n - U_).toDateString() ? "Yesterday" : hh(e);
}
function AM(e) {
	if (e == null) return "•";
	const n = e.split(/\s+/u).filter((u) => u !== "");
	if (n.length === 0) return "•";
	const r = n.length > 1 ? n[n.length - 1][0] : "";
	return `${n[0][0]}${r}`.toUpperCase();
}
function $_(e, n, r = null) {
	const u = [];
	let s = null,
		o = !1;
	for (const f of e) {
		const h = s !== null && new Date(s.timestamp).toDateString() !== new Date(f.timestamp).toDateString();
		h && u.push({ kind: "divider", key: `divider:${f.key}`, label: xM(f.timestamp, n) });
		const m =
			!o && r !== null && f.timestamp > r.lastReadAt && f.createdBy !== r.selfUserId && f.value.deletedAt === null;
		m && ((o = !0), u.push({ kind: "new", key: `new:${f.key}` }));
		const v = s !== null && !h && !m && s.createdBy === f.createdBy && f.timestamp - s.timestamp <= EM;
		(u.push({ kind: "message", doc: f, isContinuation: v }), (s = f));
	}
	return u;
}
function CM(e, n, r) {
	const u = e.mentions ?? [];
	if (u.length === 0) return e.text;
	const s = u
		.map((h) => ({ id: h, name: n.get(h) }))
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
			: (0, S.jsxs)("span", { className: h.id === r ? "mention mention-self" : "mention", children: ["@", h.name] }, m),
	);
}
function mh(e) {
	const { client: n, collection: r, doc: u, isOwn: s } = e,
		o = (0, w.useId)(),
		[f, h] = (0, w.useState)(!1),
		[m, v] = (0, w.useState)(""),
		[g, _] = (0, w.useState)(!1),
		[b, p] = (0, w.useState)(null),
		[E, x] = (0, w.useState)(!1),
		O = (0, w.useRef)(null),
		z = (0, w.useRef)(null);
	(0, w.useEffect)(() => {
		f && O.current?.focus();
	}, [f]);
	const D = (B, oe) => {
			(_(!0),
				p(null),
				n.data
					.put({ collection: r, key: u.key, value: B, expectedRevision: u.revision })
					.then((ee) => {
						if ((_(!1), "_nay" in ee)) {
							if (ee._nay.name === "storage_full") {
								e.onStorageFull(ee._nay.message);
								return;
							}
							p(ee._nay.message);
							return;
						}
						(e.onApplyLocal({ ...u, value: B, revision: ee._yay.revision, updatedAt: Date.now() }), oe());
					})
					.catch((ee) => {
						(_(!1), p(Xn(ee)));
					}));
		},
		A = () => {
			if (g) return;
			const B = m.trim();
			B !== "" &&
				D({ ...u.value, text: B, editedAt: Date.now() }, () => {
					(h(!1), z.current?.focus());
				});
		},
		C = () => {
			(h(!1), z.current?.focus());
		},
		k = () => {
			D({ ...u.value, deletedAt: Date.now() }, () => {
				x(!1);
			});
		},
		F = (B, oe) => {
			if ((p(null), e.reactionGroups === "unknown" && oe)) {
				p("Reactions on this message could not be loaded, so they can't be removed right now.");
				return;
			}
			const ee = oe;
			n.data
				.putOwned({ collection: "reactions", key: zR(u.key, B), value: ee ? { removed: !0 } : {} })
				.then((Y) => {
					if ("_nay" in Y) {
						if (Y._nay.name === "storage_full") {
							e.onStorageFull(Y._nay.message);
							return;
						}
						p(Y._nay.message);
						return;
					}
					e.onApplyReaction({
						key: Y._yay.key,
						targetKey: u.key,
						token: B,
						createdBy: e.selfUserId,
						revision: Y._yay.revision,
						updatedAt: Date.now(),
						removed: ee,
					});
				})
				.catch((Y) => {
					p(Xn(Y));
				});
		},
		Q = u.value.deletedAt !== null,
		j = e.authorName === null ? "Former member" : (e.authorName ?? "…"),
		q = Date.now() - u.timestamp < 7 * U_,
		G = e.onOpenThread !== null && typeof e.replyCount == "number" && e.replyCount > 0;
	return (0, S.jsxs)("li", {
		className: e.isContinuation ? "message is-continuation" : "message is-leader",
		"data-key": u.key,
		children: [
			(0, S.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: AM(e.authorName) }),
			(0, S.jsxs)("div", {
				className: e.isContinuation ? "message-head visually-hidden" : "message-head",
				children: [
					(0, S.jsx)("span", { className: "message-author", children: j }),
					(0, S.jsxs)("time", {
						className: "message-time",
						dateTime: new Date(u.timestamp).toISOString(),
						children: [
							q ? (0, S.jsxs)("span", { className: "visually-hidden", children: [hh(u.timestamp), " "] }) : null,
							(0, S.jsx)("span", { className: "message-clock", children: q ? TM(u.timestamp) : hh(u.timestamp) }),
						],
					}),
				],
			}),
			Q
				? (0, S.jsx)("p", { className: "message-text is-deleted", children: "Message deleted" })
				: f
					? (0, S.jsxs)("div", {
							className: "message-edit",
							children: [
								(0, S.jsx)("textarea", {
									ref: O,
									className: "composer-input",
									"aria-label": "Edit message",
									rows: 2,
									value: m,
									onInput: (B) => v(B.currentTarget.value),
									onKeyDown: (B) => {
										B.key === "Escape"
											? (B.preventDefault(), C())
											: B.key === "Enter" && !B.shiftKey && (B.preventDefault(), A());
									},
								}),
								(0, S.jsxs)("div", {
									className: "message-edit-actions",
									children: [
										(0, S.jsx)("button", {
											type: "button",
											className: "button",
											disabled: g,
											onClick: C,
											children: "Cancel",
										}),
										(0, S.jsx)("button", {
											type: "button",
											className: "button button-primary",
											disabled: g,
											onClick: A,
											children: g ? "Saving…" : "Save",
										}),
									],
								}),
							],
						})
					: (0, S.jsxs)(S.Fragment, {
							children: [
								(0, S.jsxs)("p", {
									className: "message-text",
									children: [
										CM(u.value, e.memberNames, e.selfUserId),
										u.value.editedAt !== null
											? (0, S.jsx)("span", { className: "message-edited", children: " (edited)" })
											: null,
									],
								}),
								u.value.attachments.length > 0 ? (0, S.jsx)(vM, { client: n, attachments: u.value.attachments }) : null,
								e.reactionGroups === "unknown"
									? (0, S.jsx)("div", { className: "message-reactions-unknown", children: "Reactions unavailable" })
									: e.reactionGroups.length > 0
										? (0, S.jsx)("div", {
												className: "message-reactions",
												children: e.reactionGroups.map((B) =>
													(0, S.jsxs)(
														"button",
														{
															type: "button",
															className: B.reactedByMe ? "reaction-chip is-mine" : "reaction-chip",
															"aria-pressed": B.reactedByMe,
															"aria-label": `${wb[B.token]}, ${B.count} ${B.count === 1 ? "reaction" : "reactions"}`,
															onClick: () => F(B.token, B.reactedByMe),
															children: [
																(0, S.jsx)("span", { "aria-hidden": "true", children: Sb[B.token] }),
																(0, S.jsx)("span", { className: "reaction-chip-count", children: B.count }),
															],
														},
														B.token,
													),
												),
											})
										: null,
								G && typeof e.replyCount == "number"
									? (0, S.jsxs)("button", {
											ref: e.replyTriggerRef ?? void 0,
											type: "button",
											className: "message-thread-summary",
											onClick: () => e.onOpenThread?.(u),
											children: [
												(0, S.jsx)("span", {
													className: "message-thread-summary-icon",
													"aria-hidden": "true",
													children: "↳",
												}),
												(0, S.jsx)("span", {
													className: "message-thread-summary-count",
													children: `${iO(e.replyCount, e.repliesHasMore)} ${e.replyCount === 1 ? "reply" : "replies"}`,
												}),
												e.replyLatestAt !== null
													? (0, S.jsx)("span", {
															className: "message-thread-summary-recency",
															children: `Last reply ${Io(e.replyLatestAt, Date.now())}`,
														})
													: null,
											],
										})
									: null,
							],
						}),
			!Q && !f
				? (0, S.jsxs)("div", {
						className: "message-actions",
						children: [
							e.onOpenThread !== null && e.replyCount !== null && !G
								? (0, S.jsx)("button", {
										ref: e.replyTriggerRef ?? void 0,
										type: "button",
										className: "button message-action",
										onClick: () => e.onOpenThread?.(u),
										children: e.replyCount === "unknown" ? "View thread" : "Reply in thread",
									})
								: null,
							(0, S.jsx)(wM, { groups: e.reactionGroups === "unknown" ? [] : e.reactionGroups, onPick: F }),
							s
								? (0, S.jsxs)(S.Fragment, {
										children: [
											(0, S.jsx)("button", {
												ref: z,
												type: "button",
												className: "button message-action",
												onClick: () => {
													(v(u.value.text), h(!0));
												},
												children: "Edit",
											}),
											(0, S.jsx)("button", {
												type: "button",
												className: "button message-action button-danger",
												onClick: () => x(!0),
												children: "Delete",
											}),
										],
									})
								: null,
						],
					})
				: null,
			b !== null ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: b }) : null,
			E
				? (0, S.jsxs)($l, {
						labelledBy: o,
						onClose: () => x(!1),
						children: [
							(0, S.jsx)("h2", { id: o, className: "dialog-title", children: "Delete message?" }),
							(0, S.jsx)("p", { children: 'The message is replaced by a "Message deleted" placeholder for everyone.' }),
							(0, S.jsxs)("div", {
								className: "dialog-actions",
								children: [
									(0, S.jsx)("button", {
										type: "button",
										className: "button",
										"data-dialog-initial": !0,
										disabled: g,
										onClick: () => x(!1),
										children: "Cancel",
									}),
									(0, S.jsx)("button", {
										type: "button",
										className: "button button-danger",
										disabled: g,
										onClick: k,
										children: g ? "Deleting…" : "Delete message",
									}),
								],
							}),
						],
					})
				: null,
		],
	});
}
function B_(e) {
	return (0, S.jsxs)("li", {
		className:
			e.pending.status === "failed" ? "message is-leader is-pending is-failed" : "message is-leader is-pending",
		children: [
			(0, S.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: "•" }),
			(0, S.jsxs)("div", {
				className: "message-head",
				children: [
					(0, S.jsx)("span", { className: "message-author", children: "You" }),
					(0, S.jsx)("span", {
						className: "message-time",
						children: e.pending.status === "sending" ? "Sending…" : "Not sent",
					}),
				],
			}),
			(0, S.jsx)("p", { className: "message-text", children: e.pending.text }),
			e.pending.attachments.length > 0
				? (0, S.jsx)("p", { className: "message-text", children: e.pending.attachments.map((n) => n.name).join(", ") })
				: null,
			e.pending.status === "failed"
				? (0, S.jsxs)("div", {
						className: "message-send-error",
						role: "alert",
						children: [
							(0, S.jsx)("span", { children: e.pending.errorMessage ?? "Failed to send message" }),
							(0, S.jsx)("button", {
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
function Ld(e, n) {
	return e === "denied"
		? `Chitchat can no longer read ${n}. Reload the page to try again.`
		: e === "session_expired"
			? `This Chitchat session expired, so ${n} stopped updating. Reload the page to continue.`
			: e === "unavailable"
				? `Chitchat cannot reach ${n} right now. Nothing here will update until the connection returns.`
				: e === "capacity"
					? `Chitchat has too many live views open, so ${n} stopped updating. Reload the page.`
					: `Chitchat stopped reading ${n}. Reload the page to try again.`;
}
function RM(e) {
	const { client: n, userId: r, root: u, memberNames: s, replies: o, repliesLoaded: f } = e,
		h = (0, w.useRef)(null);
	(0, w.useEffect)(() => {
		h.current?.focus();
	}, []);
	const m = L_({
		client: n,
		collection: "replies",
		keyPrefix: Tb(u.key),
		userId: r,
		onDelivered: (_) => {
			e.onApplyLocalReply(_);
		},
		onStorageFull: e.onStorageFull,
	});
	(0, w.useEffect)(() => {
		const _ = new Set();
		for (const b of o) {
			_.add(b.createdBy);
			for (const p of b.value.mentions ?? []) _.add(p);
		}
		_.size > 0 && s.resolve([..._]);
	}, [o, s]);
	const v = (_) => {
			_.key === "Escape" && (_.stopPropagation(), e.onClose());
		},
		g = $_([...o].reverse(), Date.now());
	return (0, S.jsxs)("section", {
		className: "thread",
		"aria-label": "Thread",
		onKeyDown: v,
		children: [
			(0, S.jsxs)("div", {
				className: "thread-head",
				children: [
					(0, S.jsx)("h3", { className: "thread-title", children: "Thread" }),
					(0, S.jsx)("button", {
						ref: h,
						type: "button",
						className: "button",
						onClick: e.onClose,
						children: e.isNarrow ? "Back to messages" : "Close thread",
					}),
				],
			}),
			(0, S.jsx)("ul", {
				className: "message-list thread-root",
				children: (0, S.jsx)(mh, {
					client: n,
					collection: "messages",
					doc: u,
					isOwn: u.createdBy === r,
					selfUserId: r,
					memberNames: s,
					isContinuation: !1,
					authorName: s.get(u.createdBy),
					reactionGroups: e.reactionGroupsByTarget.get(u.key) ?? [],
					replyCount: null,
					replyLatestAt: null,
					repliesHasMore: !1,
					onOpenThread: null,
					replyTriggerRef: null,
					onApplyLocal: e.onApplyLocalRoot,
					onApplyReaction: e.onApplyReaction,
					onStorageFull: e.onStorageFull,
				}),
			}),
			e.repliesError !== null
				? (0, S.jsx)("div", { className: "channel-status is-error", role: "alert", children: e.repliesError })
				: null,
			e.repliesTruncated
				? (0, S.jsx)("div", {
						className: "channel-status",
						role: "status",
						children: "Only the newest 100 replies are shown.",
					})
				: null,
			f
				? o.length === 0 && m.pending.length === 0
					? (0, S.jsx)("div", { className: "channel-status", children: "No replies yet" })
					: (0, S.jsxs)("ul", {
							className: "message-list thread-replies",
							children: [
								g.map((_) =>
									_.kind === "divider"
										? (0, S.jsx)("li", { className: "day-divider", children: _.label }, _.key)
										: _.kind === "new"
											? null
											: (0, S.jsx)(
													mh,
													{
														client: n,
														collection: "replies",
														doc: _.doc,
														isOwn: _.doc.createdBy === r,
														selfUserId: r,
														memberNames: s,
														isContinuation: _.isContinuation,
														authorName: s.get(_.doc.createdBy),
														reactionGroups: e.reactionGroupsByTarget.get(_.doc.key) ?? [],
														replyCount: null,
														replyLatestAt: null,
														repliesHasMore: !1,
														onOpenThread: null,
														replyTriggerRef: null,
														onApplyLocal: e.onApplyLocalReply,
														onApplyReaction: e.onApplyReaction,
														onStorageFull: e.onStorageFull,
													},
													_.doc.key,
												),
								),
								m.pending.map((_) => (0, S.jsx)(B_, { pending: _, onRetry: () => m.retry(_) }, _.clientRequestId)),
							],
						})
				: (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading replies…" }),
			e.storageFull !== null
				? (0, S.jsx)("div", { className: "channel-status is-error", role: "alert", children: e.storageFull })
				: null,
			(0, S.jsx)(q_, {
				client: n,
				label: "Reply in thread",
				busy: m.busy,
				disabled: e.storageFull !== null || e.repliesError !== null,
				onSend: m.send,
			}),
		],
	});
}
var OM = 15e3;
function I_(e, n) {
	return e.incomplete || e.death !== null ? !1 : !e.hasMore || (e.deepestRoot !== null && n < e.deepestRoot);
}
var Lo = 55,
	ho = 100,
	qd = 1e3,
	NM = 3e4;
function kM(e) {
	let n = null;
	for (const r of e) (n === null || r.updatedAt > n) && (n = r.updatedAt);
	return n;
}
function MM(e) {
	if (typeof e != "object" || e === null) return null;
	const n = e.key;
	return typeof n == "string" ? n : null;
}
function Ud(e) {
	let n = null;
	for (const r of e) {
		if (typeof r != "object" || r === null) continue;
		const u = r.updatedAt;
		typeof u == "number" && Number.isFinite(u) && (n === null || u > n) && (n = u);
	}
	return n;
}
function $d(e) {
	return e.newest === null
		? null
		: e.truncated && e.newest === e.current
			? e.newest + 1
			: e.newest > e.current
				? e.newest
				: null;
}
function Bd(e, n) {
	return e.filter((r) => {
		const u = MM(r);
		return u !== null && u.startsWith(n);
	});
}
function Id(e, n) {
	return e.fetchJson("/api/v1/plugin-data/list", { body: n }).then((r) => {
		const u = Cb.safeParse(r);
		if (!u.success) throw new Error("Unexpected response from the document list");
		return u.data;
	});
}
function zM(e, n, r) {
	if (e.incomplete || e.death !== null) return "unknown";
	const u = n.get(r);
	return u !== void 0 && u.length > 0 ? u : I_(e, r.slice(0, Lo)) ? (u ?? []) : "unknown";
}
function DM(e, n, r) {
	if (e.incomplete || e.death !== null) return "unknown";
	const u = n.get(r);
	return u !== void 0 && u.count > 0 ? u.count : I_(e, r.slice(0, Lo)) ? (u?.count ?? 0) : "unknown";
}
var xp = 420,
	mo = 244,
	Vd = 340,
	Ap = 16;
function jM(e) {
	if (typeof e != "string") return null;
	let n;
	try {
		n = JSON.parse(e);
	} catch {
		return null;
	}
	if (typeof n != "object" || n === null) return null;
	const r = n.retryAfterMs;
	return typeof r == "number" && Number.isFinite(r) && r > 0 ? r : null;
}
function LM(e) {
	const {
			client: n,
			userId: r,
			channel: u,
			memberNames: s,
			announce: o,
			threadRootKey: f,
			setThreadRootKey: h,
			isNarrow: m,
			onNewestVisible: v,
			openedAtLastReadAt: g,
		} = e,
		[_, b] = (0, w.useState)([]),
		[p, E] = (0, w.useState)(!1),
		[x, O] = (0, w.useState)(null),
		[z, D] = (0, w.useState)({ hasMore: !1, atCapacity: !1, incomplete: !1 }),
		[A, C] = (0, w.useState)([]),
		[k, F] = (0, w.useState)([]),
		[Q, j] = (0, w.useState)({ hasMore: !1, deepestRoot: null, incomplete: !1, death: null }),
		[q, G] = (0, w.useState)({ hasMore: !1, deepestRoot: null, incomplete: !1, death: null }),
		[B, oe] = (0, w.useState)(null),
		[ee, Y] = (0, w.useState)({ kind: "idle" }),
		[ae, R] = (0, w.useState)(Vd),
		[$, H] = (0, w.useState)(0),
		[se, me] = (0, w.useState)(null),
		[Re, N] = (0, w.useState)(null),
		[X, re] = (0, w.useState)(null),
		[de, ge] = (0, w.useState)(!1),
		[_e, we] = (0, w.useState)(!1),
		[Je, De] = (0, w.useState)(null),
		Ke = (0, w.useRef)(null),
		xt = (0, w.useRef)(null),
		At = (0, w.useRef)(null),
		Yt = (0, w.useRef)(null),
		Be = (0, w.useRef)(null),
		fe = (0, w.useRef)(null),
		Ee = (0, w.useRef)(null),
		Ge = (0, w.useRef)(null),
		ze = (0, w.useRef)(null),
		bt = (0, w.useRef)({ reactions: null, replies: null }),
		st = (0, w.useRef)({ reactions: !1, replies: !1 }),
		ue = (0, w.useRef)({ reactions: { delayMs: qd, timer: null }, replies: { delayMs: qd, timer: null } }),
		xe = (0, w.useRef)(!1),
		ct = (0, w.useRef)(!1),
		Oe = (0, w.useRef)(null),
		Ct = (0, w.useRef)(u.value.name),
		Kt = (0, w.useRef)(null),
		vt = (0, w.useRef)(new Map()),
		jt = (0, w.useRef)(null),
		ba = (0, w.useRef)(null),
		ci = (0, w.useRef)(0),
		qn = so(u.key),
		xi = ui(u.key) ? u.key : void 0;
	(0, w.useEffect)(() => {
		Ct.current = u.value.name;
	}, [u.value.name]);
	const vn = (P) => {
			const le = xt.current;
			le !== null && (le.apply_window(P), F(le.get_sorted()));
		},
		Wt = (P) => {
			const le = Ke.current;
			if (le === null) return [];
			const ye = le.apply_window(P);
			return (b(le.get_sorted()), ye);
		},
		cn = (P, le, ye, We) => {
			const ot = le.length > 0 ? le[le.length - 1].key.slice(0, Lo) : null;
			le.length > 0 && (bt.current[P] = le[le.length - 1].key);
			const nt = {
				hasMore: le.length === 0 ? !1 : !ye,
				deepestRoot: ot ?? (P === "reactions" ? Be.current?.deepestRoot : fe.current?.deepestRoot) ?? null,
				incomplete: We,
				death: (P === "reactions" ? Be.current?.death : fe.current?.death) ?? null,
			};
			P === "reactions"
				? ((Be.current = nt), j(nt), We || ei("reactions"))
				: ((fe.current = nt), G(nt), We || ei("replies"));
		},
		Lt = (P) => {
			const le = ue.current[P];
			le.timer !== null && (clearTimeout(le.timer), (le.timer = null));
		},
		ei = (P) => {
			(Lt(P), (ue.current[P].delayMs = qd));
		},
		fi = (P) => {
			if ((P === "reactions" ? Be.current : fe.current)?.death != null) return;
			const le = ue.current[P];
			if (le.timer !== null) return;
			const ye = le.delayMs,
				We = ye * (0.5 + Math.random());
			le.timer = setTimeout(() => {
				((le.timer = null), (le.delayMs = Math.min(ye * 2, NM)), Ai(P));
			}, We);
		},
		Ai = (P) => {
			if (st.current[P] || (P === "reactions" ? Be.current : fe.current)?.death != null) return;
			st.current[P] = !0;
			const le = bt.current[P];
			Id(n, { collection: P, keyPrefix: qn, ...(le === null ? {} : { keyStartExclusive: le }), limit: ho })
				.then((ye) => {
					if (((st.current[P] = !1), !!xe.current)) {
						if (P === "reactions") {
							const We = At.current;
							if (We === null) return;
							const ot = We.apply_window(ye.documents);
							(C(We.get_sorted()), cn("reactions", ot, ye.isDone, !1));
						} else {
							const We = xt.current;
							if (We === null) return;
							const ot = We.apply_window(ye.documents);
							(F(We.get_sorted()), cn("replies", ot, ye.isDone, !1));
						}
						di();
					}
				})
				.catch(() => {
					((st.current[P] = !1), xe.current && (cn(P, [], !0, !0), fi(P)));
				});
		},
		gn = (P) => {
			const le = P === "reactions" ? Be.current : fe.current;
			le === null || !le.incomplete || le.death !== null || (Lt(P), Ai(P));
		},
		di = () => {
			const P = Ee.current;
			if (P !== null)
				for (const le of ["reactions", "replies"]) {
					const ye = le === "reactions" ? Be.current : fe.current;
					ye === null ||
						!ye.hasMore ||
						ye.incomplete ||
						ye.death !== null ||
						((ye.deepestRoot === null || ye.deepestRoot < P) && Ai(le));
				}
		},
		hi = (P) => {
			if (ct.current) return;
			const le = kM(P);
			le !== null && ((ct.current = !0), me(le), N(le), re(le));
		};
	(0, w.useEffect)(() => {
		const P = xd(Oo);
		((Ke.current = P),
			(xt.current = xd(Oo)),
			(At.current = xd(KR)),
			(xe.current = !0),
			(ct.current = !1),
			(bt.current = { reactions: null, replies: null }),
			(st.current = { reactions: !1, replies: !1 }),
			ei("reactions"),
			ei("replies"),
			(Be.current = null),
			(fe.current = null),
			me(null),
			N(null),
			re(null));
		const le = n.data.watchWindow({ collection: "messages", keyPrefix: so(u.key), pageSize: 100 }, (ye, We) => {
			if (ye === null) {
				O({ reason: We?.reason });
				return;
			}
			const ot = P.apply_window(ye.docs);
			(b(P.get_sorted()), E(!0), D({ hasMore: ye.hasMore, atCapacity: ye.atCapacity, incomplete: ye.incomplete }));
			const nt = ot.reduce((Ie, Br) => (Ie === null || Br.key > Ie ? Br.key : Ie), null);
			((Ge.current = nt),
				(Ee.current = nt === null ? null : nt.slice(0, Lo)),
				hi(ot),
				Be.current === null && !st.current.reactions && Ai("reactions"),
				fe.current === null && !st.current.replies && Ai("replies"),
				di());
			const en = Kt.current;
			if (en === null) {
				Kt.current = new Set(ot.map((Ie) => Ie.key));
				return;
			}
			const ni = ot.filter((Ie) => !en.has(Ie.key) && Ie.createdBy !== r && Ie.value.deletedAt === null);
			for (const Ie of ot) en.add(Ie.key);
			if (ni.length === 1) {
				const Ie = ni[0];
				s.resolve([Ie.createdBy])
					.then(() => {
						const Br = s.get(Ie.createdBy) ?? null,
							_a = Ie.value.text,
							Ci = _a.length > 80 ? `${_a.slice(0, 80)}…` : _a;
						o(`${Br ?? "Former member"}: ${Ci}`);
					})
					.catch(() => {
						o(`New message in #${Ct.current}`);
					});
			} else ni.length > 1 && o(`${ni.length} new messages in #${Ct.current}`);
		});
		return (
			(Yt.current = le),
			() => {
				((xe.current = !1), ei("reactions"), ei("replies"), (Yt.current = null), le.unsubscribe());
			}
		);
	}, [n, u.key, r, s, o]);
	const fn = xi === void 0 ? {} : { scopeId: xi };
	((0, w.useEffect)(() => {
		if (se !== null)
			return n.data.watchChanges({ collection: "messages", limit: 100, updatedSince: se, ...fn }, (P, le) => {
				if (P === null) {
					O({ reason: le?.reason });
					return;
				}
				const ye = Ke.current;
				if (ye === null) return;
				const We = Bd(P.docs, qn);
				(ye.apply_window(We),
					b(ye.get_sorted()),
					P.truncated &&
						Ge.current !== null &&
						Id(n, { collection: "messages", keyPrefix: qn, keyStartExclusive: Ge.current, limit: ho })
							.then((en) => {
								Wt(en.documents);
							})
							.catch(() => {}));
				const ot = Ud(P.docs),
					nt = $d({ current: se, newest: ot, truncated: P.truncated });
				nt !== null && me(nt);
			});
	}, [n, u.key, se, xi, qn]),
		(0, w.useEffect)(() => {
			if (Re !== null)
				return n.data.watchChanges({ collection: "replies", limit: 100, updatedSince: Re, ...fn }, (P, le) => {
					if (P === null) {
						Lt("replies");
						const en = {
							...(fe.current ?? { hasMore: !1, deepestRoot: null, incomplete: !1, death: null }),
							incomplete: !1,
							death: { reason: le?.reason },
						};
						((fe.current = en), G(en));
						return;
					}
					const ye = xt.current;
					if (ye === null) return;
					const We = Bd(P.docs, qn);
					(ye.apply_window(We), F(ye.get_sorted()), gn("replies"));
					const ot = Ud(P.docs),
						nt = $d({ current: Re, newest: ot, truncated: P.truncated });
					nt !== null && N(nt);
				});
		}, [n, u.key, Re, xi, qn]),
		(0, w.useEffect)(() => {
			if (X !== null)
				return n.data.watchChanges({ collection: "reactions", limit: 100, updatedSince: X, ...fn }, (P, le) => {
					if (P === null) {
						Lt("reactions");
						const en = {
							...(Be.current ?? { hasMore: !1, deepestRoot: null, incomplete: !1, death: null }),
							incomplete: !1,
							death: { reason: le?.reason },
						};
						((Be.current = en), j(en));
						return;
					}
					const ye = At.current;
					if (ye === null) return;
					const We = Bd(P.docs, qn);
					(ye.apply_window(We), C(ye.get_sorted()), gn("reactions"));
					const ot = Ud(P.docs),
						nt = $d({ current: X, newest: ot, truncated: P.truncated });
					nt !== null && re(nt);
				});
		}, [n, u.key, X, xi, qn]),
		(0, w.useEffect)(() => {
			const P = () => {
				document.visibilityState === "visible" && (gn("reactions"), gn("replies"));
			};
			return (
				document.addEventListener("visibilitychange", P),
				() => document.removeEventListener("visibilitychange", P)
			);
		}, [n, u.key]),
		(0, w.useEffect)(() => {
			if (f === null) {
				(ge(!0), we(!1), De(null));
				return;
			}
			let P = !1;
			return (
				ge(!1),
				we(!1),
				De(null),
				Id(n, { collection: "replies", keyPrefix: Tb(f), limit: ho })
					.then((le) => {
						P || (vn(le.documents), we(!le.isDone), ge(!0));
					})
					.catch((le) => {
						P || (De(Xn(le)), ge(!0));
					}),
				() => {
					P = !0;
				}
			);
		}, [n, f]));
	const Un = (0, w.useRef)(null),
		W = (P, le) => {
			n.data
				.put({
					collection: "channels",
					key: P.key,
					value: { ...P.value, lastMessageAt: le },
					expectedRevision: P.revision,
				})
				.then((ye) => {
					"_nay" in ye && ye._nay.name === "conflict" && Un.current === null && (Un.current = le);
				})
				.catch(() => {});
		};
	(0, w.useEffect)(() => {
		const P = Un.current;
		P !== null && ((Un.current = null), (u.value.lastMessageAt ?? 0) < P && W(u, P));
	}, [u]);
	const ce = L_({
		client: n,
		collection: "messages",
		keyPrefix: so(u.key),
		userId: r,
		onDelivered: (P) => {
			(Ke.current?.apply_local(P),
				Kt.current?.add(P.key),
				b(Ke.current?.get_sorted() ?? []),
				ui(u.key) && P.timestamp - (u.value.lastMessageAt ?? 0) >= OM && W(u, P.timestamp));
		},
		onStorageFull: oe,
	});
	((0, w.useEffect)(() => {
		const P = new Set();
		for (const le of _) {
			P.add(le.createdBy);
			for (const ye of le.value.mentions ?? []) P.add(ye);
		}
		for (const le of k) {
			P.add(le.createdBy);
			for (const ye of le.value.mentions ?? []) P.add(ye);
		}
		P.size > 0 && s.resolve([...P]);
	}, [_, k, s]),
		(0, w.useEffect)(() => {
			_.length > 0 && v(_[0].timestamp);
		}, [_, v]),
		(0, w.useEffect)(() => {
			const P = _.length > 0 ? _[0].key : null,
				le = P !== null && P !== ba.current,
				ye = ce.pending.length > ci.current;
			((ba.current = P),
				(ci.current = ce.pending.length),
				(le || ye) && jt.current && (jt.current.scrollTop = jt.current.scrollHeight));
		}, [_, ce.pending.length]));
	const Ae = () => {
			Yt.current?.loadOlder();
		},
		Se = () => {
			const P = ze.current ?? Ge.current;
			P !== null &&
				(Y({ kind: "loading" }),
				n
					.fetchJson("/api/v1/plugin-data/list", {
						body: { collection: "messages", keyPrefix: so(u.key), keyStartExclusive: P, limit: ho },
					})
					.then((le) => {
						const ye = Cb.safeParse(le);
						if (!ye.success) {
							Y({ kind: "failed", message: "Unexpected response for older messages.", retryAt: null });
							return;
						}
						const We = Ke.current;
						if (We === null) return;
						const ot = We.apply_window(ye.data.documents);
						b(We.get_sorted());
						for (const nt of ot)
							(Kt.current?.add(nt.key), (ze.current === null || nt.key > ze.current) && (ze.current = nt.key));
						Y(ye.data.isDone ? { kind: "exhausted" } : { kind: "idle" });
					})
					.catch((le) => {
						if (le.status !== 429) {
							Y({ kind: "failed", message: Xn(le), retryAt: null });
							return;
						}
						const ye = jM(le.responseText) ?? 1e3;
						Y({
							kind: "failed",
							message: "Older messages are being loaded too quickly. Waiting a moment before you can try again.",
							retryAt: Date.now() + ye,
						});
					}));
		};
	((0, w.useEffect)(() => {
		if (ee.kind !== "failed" || ee.retryAt === null) return;
		const P = setTimeout(
			() => {
				Y({ kind: "idle" });
			},
			Math.max(0, ee.retryAt - Date.now()),
		);
		return () => {
			clearTimeout(P);
		};
	}, [ee]),
		(0, w.useEffect)(() => {
			const P = Oe.current;
			if (f === null || P === null) return;
			H(P.clientWidth);
			const le = new ResizeObserver(() => H(P.clientWidth));
			return (le.observe(P), () => le.disconnect());
		}, [f]));
	const Fe = (P) => {
			const le = Math.max(mo, $ - xp);
			return Math.min(le, Math.max(mo, P));
		},
		ft = (P) => {
			P.key === "ArrowLeft"
				? (P.preventDefault(), R(Fe(ae + Ap)))
				: P.key === "ArrowRight"
					? (P.preventDefault(), R(Fe(ae - Ap)))
					: P.key === "Home" && (P.preventDefault(), R(Fe(Vd)));
		},
		sn = (P) => {
			(P.preventDefault(), P.currentTarget.setPointerCapture(P.pointerId));
		},
		Rt = (P) => {
			if (!P.currentTarget.hasPointerCapture(P.pointerId)) return;
			const le = Oe.current?.getBoundingClientRect();
			le !== void 0 && R(Fe(le.right - P.clientX));
		},
		ti = (0, w.useMemo)(() => tO(A, r), [A, r]),
		Cn = (0, w.useMemo)(() => nO(k), [k]),
		_t = (P) => {
			(Ke.current?.apply_local(P), b(Ke.current?.get_sorted() ?? []));
		},
		Ur = (P) => {
			(xt.current?.apply_local(P), F(xt.current?.get_sorted() ?? []));
		},
		ar = (P) => {
			(At.current?.apply_local(P), C(At.current?.get_sorted() ?? []));
		},
		mi = f === null ? [] : k.filter((P) => Rh(P.key) === f),
		Gt = () => {
			const P = f;
			(h(null), P !== null && vt.current.get(P)?.focus());
		},
		Ft = f === null ? null : (_.find((P) => P.key === f) ?? null),
		$r = $_([..._].reverse(), Date.now(), g === null ? null : { lastReadAt: g, selfUserId: r }),
		xu = Math.max(mo, $ - xp),
		Zl = Fe(ae);
	return x !== null
		? (0, S.jsx)("div", {
				className: "channel",
				children: (0, S.jsx)("div", {
					className: "channel-dead",
					role: "alert",
					children: Ld(x.reason, `messages in #${u.value.name}`),
				}),
			})
		: (0, S.jsxs)("div", {
				className: "channel",
				children: [
					(0, S.jsxs)("header", {
						className: "channel-head",
						children: [
							(0, S.jsxs)("div", {
								className: "channel-head-main",
								children: [
									(0, S.jsxs)("h2", { className: "channel-title", children: ["#", u.value.name] }),
									u.value.topic !== void 0 && u.value.topic !== ""
										? (0, S.jsx)("p", { className: "channel-topic", children: u.value.topic })
										: null,
									ui(u.key) ? (0, S.jsx)("p", { className: "channel-privacy", children: Ah }) : null,
								],
							}),
							u.value.archivedAt !== null
								? (0, S.jsx)("span", { className: "channel-archived-badge", children: "Archived" })
								: null,
						],
					}),
					(0, S.jsxs)("div", {
						ref: Oe,
						className: "channel-body",
						style: { "--thread-width": `${Zl}px` },
						children: [
							(0, S.jsxs)("div", {
								ref: jt,
								className: "message-log",
								role: "log",
								"aria-live": "off",
								"aria-label": `Messages in #${u.value.name}`,
								children: [
									p && z.hasMore && !z.atCapacity
										? (0, S.jsx)("div", {
												className: "log-older",
												children: (0, S.jsx)("button", {
													type: "button",
													className: "button",
													onClick: Ae,
													children: "Load older",
												}),
											})
										: null,
									p && z.hasMore && z.atCapacity
										? (0, S.jsxs)("div", {
												className: "log-older",
												children: [
													(0, S.jsx)("span", {
														className: "channel-status",
														role: "status",
														children:
															ee.kind === "loading"
																? "Loading older messages…"
																: ee.kind === "exhausted"
																	? `You have reached the start of #${u.value.name}.`
																	: "The live view stopped growing. Older messages load on request.",
													}),
													ee.kind === "exhausted"
														? null
														: (0, S.jsx)("button", {
																type: "button",
																className: "button",
																disabled: ee.kind === "loading" || (ee.kind === "failed" && ee.retryAt !== null),
																onClick: Se,
																children: "Load older messages",
															}),
													ee.kind === "failed"
														? (0, S.jsx)("span", {
																className: "channel-status is-error",
																role: "alert",
																children: ee.message,
															})
														: null,
												],
											})
										: null,
									z.incomplete
										? (0, S.jsx)("div", {
												className: "channel-status",
												role: "alert",
												children: "Older messages in view may be out of date.",
											})
										: null,
									Q.incomplete || q.incomplete
										? (0, S.jsx)("div", {
												className: "channel-status",
												role: "alert",
												children: "Some reactions and replies in this range could not be loaded.",
											})
										: null,
									Q.death !== null
										? (0, S.jsx)("div", {
												className: "channel-status is-error",
												role: "alert",
												children: Ld(Q.death.reason, "reactions in this channel"),
											})
										: null,
									q.death !== null
										? (0, S.jsx)("div", {
												className: "channel-status is-error",
												role: "alert",
												children: Ld(q.death.reason, "reply counts in this channel"),
											})
										: null,
									p
										? _.length === 0 && ce.pending.length === 0
											? (0, S.jsx)("div", { className: "channel-status", children: "No messages yet" })
											: (0, S.jsxs)("ul", {
													className: "message-list",
													children: [
														$r.map((P) =>
															P.kind === "divider"
																? (0, S.jsx)("li", { className: "day-divider", children: P.label }, P.key)
																: P.kind === "new"
																	? (0, S.jsx)(
																			"li",
																			{
																				className: "new-divider",
																				children: (0, S.jsx)("span", {
																					className: "new-divider-label",
																					children: "New messages",
																				}),
																			},
																			P.key,
																		)
																	: (0, S.jsx)(
																			mh,
																			{
																				client: n,
																				collection: "messages",
																				doc: P.doc,
																				isOwn: P.doc.createdBy === r,
																				selfUserId: r,
																				memberNames: s,
																				isContinuation: P.isContinuation,
																				authorName: s.get(P.doc.createdBy),
																				reactionGroups: zM(Q, ti, P.doc.key),
																				replyCount: DM(q, Cn, P.doc.key),
																				replyLatestAt: Cn.get(P.doc.key)?.latestAt ?? null,
																				repliesHasMore: q.hasMore,
																				onOpenThread: (le) => h(le.key),
																				replyTriggerRef: (le) => {
																					le === null ? vt.current.delete(P.doc.key) : vt.current.set(P.doc.key, le);
																				},
																				onApplyLocal: _t,
																				onApplyReaction: ar,
																				onStorageFull: oe,
																			},
																			P.doc.key,
																		),
														),
														ce.pending.map((P) =>
															(0, S.jsx)(B_, { pending: P, onRetry: () => ce.retry(P) }, P.clientRequestId),
														),
													],
												})
										: (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading messages…" }),
								],
							}),
							Ft !== null
								? (0, S.jsx)("div", {
										className: "thread-resize",
										role: "separator",
										tabIndex: 0,
										"aria-orientation": "vertical",
										"aria-label": "Resize thread panel",
										"aria-valuenow": Zl,
										"aria-valuemin": mo,
										"aria-valuemax": xu,
										onKeyDown: ft,
										onPointerDown: sn,
										onPointerMove: Rt,
										onDoubleClick: () => R(Fe(Vd)),
									})
								: null,
							Ft !== null
								? (0, S.jsx)(
										RM,
										{
											client: n,
											userId: r,
											root: Ft,
											replies: mi,
											repliesLoaded: de,
											repliesTruncated: _e,
											repliesError: Je,
											reactionGroupsByTarget: ti,
											memberNames: s,
											isNarrow: m,
											storageFull: B,
											onStorageFull: oe,
											onApplyLocalRoot: _t,
											onApplyLocalReply: Ur,
											onApplyReaction: ar,
											onClose: Gt,
										},
										Ft.key,
									)
								: null,
						],
					}),
					B !== null ? (0, S.jsx)("div", { className: "channel-status is-error", role: "alert", children: B }) : null,
					(0, S.jsx)(q_, {
						client: n,
						label: `Message #${u.value.name}`,
						busy: ce.busy,
						disabled: B !== null,
						onSend: ce.send,
					}),
				],
			});
}
var Bl = Ti([Nl], [Qo]),
	qM = Bl.useContext,
	UM = Bl.useScopedContext,
	hD = Bl.useProviderContext,
	mD = Bl.ContextProvider,
	vD = Bl.ScopedContextProvider,
	gD = (0, w.createContext)(void 0),
	Il = Ti([Kb], [Xo]),
	yD = Il.useContext,
	pD = Il.useScopedContext,
	lm = Il.useProviderContext,
	$M = Il.ContextProvider,
	V_ = Il.ScopedContextProvider,
	Vl = Ti([Nl, $M], [Qo, V_]),
	BM = Vl.useContext,
	IM = Vl.useScopedContext,
	lc = Vl.useProviderContext,
	Z_ = Vl.ContextProvider,
	VM = Vl.ScopedContextProvider,
	bD = (0, w.createContext)(void 0),
	ZM = "div",
	Fi = "";
function Zd() {
	Fi = "";
}
function HM(e) {
	const n = e.target;
	return n && Ei(n)
		? !1
		: e.key === " " && Fi.length
			? !0
			: e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey && /^[\p{Letter}\p{Number}]$/u.test(e.key);
}
function PM(e, n) {
	if (jn(e)) return !0;
	const r = e.target;
	return r ? n.some((u) => u.element === r) : !1;
}
function QM(e) {
	return e.filter((n) => !n.disabled);
}
function po(e, n) {
	var r;
	const u = ((r = e.element) == null ? void 0 : r.textContent) || e.children || ("value" in e && e.value);
	return u ? Db(u).trim().toLowerCase().startsWith(n.toLowerCase()) : !1;
}
function YM(e, n, r) {
	if (!r) return e;
	const u = e.find((s) => s.id === r);
	return !u || !po(u, n) || (Fi !== n && po(u, Fi))
		? e
		: ((Fi = n),
			_O(
				e.filter((s) => po(s, Fi)),
				r,
			).filter((s) => s.id !== r));
}
var sm = Xe(function ({ store: n, typeahead: r = !0, ...u }) {
		const s = qh();
		((n = n || s), Qt(n, !1));
		const o = u.onKeyDownCapture,
			f = (0, w.useRef)(0),
			h = Ce((m) => {
				if ((o?.(m), m.defaultPrevented || !r || !n)) return;
				if (!HM(m)) return Zd();
				const { renderedItems: v, items: g, activeId: _, id: b } = n.getState();
				let p = QM(g.length > v.length ? g : v);
				const E = mt(m.currentTarget),
					x = `[data-offscreen-id="${b}"]`,
					O = E.querySelectorAll(x);
				for (const A of O) {
					const C = A.ariaDisabled === "true" || ("disabled" in A && !!A.disabled);
					p.push({ id: A.id, element: A, disabled: C });
				}
				if ((O.length && (p = Mb(p, (A) => A.element)), !PM(m, p))) return Zd();
				(m.preventDefault(),
					window.clearTimeout(f.current),
					(f.current = window.setTimeout(() => {
						Fi = "";
					}, 500)));
				const z = m.key.toLowerCase();
				((Fi += z), (p = YM(p, z, _)));
				const D = p.find((A) => po(A, Fi));
				D ? n.move(D.id) : Zd();
			});
		return ((u = { ...u, onKeyDownCapture: h }), ya(u));
	}),
	_D = Ve(function (n) {
		return Ye(ZM, sm(n));
	}),
	KM = "div";
function GM({ store: e, ...n }) {
	const [r, u] = (0, w.useState)(void 0),
		s = n["aria-label"],
		o = Zt(e, "disclosureElement"),
		f = Zt(e, "contentElement");
	return (
		(0, w.useEffect)(() => {
			const h = o;
			if (!h) return;
			const m = f;
			m && (s || m.hasAttribute("aria-label") ? u(void 0) : h.id && u(h.id));
		}, [s, o, f]),
		r
	);
}
var H_ = Xe(function ({ store: n, alwaysVisible: r, composite: u, ...s }) {
		const o = lc();
		((n = n || o), Qt(n, !1));
		const f = n.parent,
			h = n.menubar,
			m = !!f,
			v = ir(s.id),
			g = s.onKeyDown,
			_ = n.useState((C) => C.placement.split("-")[0]),
			b = n.useState((C) => (C.orientation === "both" ? void 0 : C.orientation)),
			p = b !== "vertical",
			E = Zt(h, (C) => !!C && C.orientation !== "vertical"),
			x = Ce((C) => {
				if ((g?.(C), !C.defaultPrevented)) {
					if (m || (h && !p)) {
						const k = {
							ArrowRight: () => _ === "left" && !p,
							ArrowLeft: () => _ === "right" && !p,
							ArrowUp: () => _ === "bottom" && p,
							ArrowDown: () => _ === "top" && p,
						}[C.key];
						if (k?.()) return (C.stopPropagation(), C.preventDefault(), n?.hide());
					}
					if (h) {
						const k = {
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
							}[C.key],
							F = k?.();
						F !== void 0 && (C.stopPropagation(), C.preventDefault(), h.move(F));
					}
				}
			});
		s = ln(s, (C) => (0, S.jsx)(VM, { value: n, children: C }), [n]);
		const O = GM({ store: n, ...s }),
			z = tc(n.useState("mounted"), s.hidden, r),
			D = z ? { ...s.style, display: "none" } : s.style;
		s = {
			id: v,
			"aria-labelledby": O,
			hidden: z,
			...s,
			ref: Dt(v ? n.setContentElement : null, s.ref),
			style: D,
			onKeyDown: x,
		};
		const A = !!n.combobox;
		return (
			(u = u ?? !A),
			u && (s = { role: "menu", "aria-orientation": b, ...s }),
			(s = Bh({ store: n, composite: u, ...s })),
			(s = sm({ store: n, typeahead: !A, ...s })),
			s
		);
	}),
	SD = Ve(function (n) {
		return Ye(KM, H_(n));
	});
function Hd(e) {
	return [e.clientX, e.clientY];
}
function Cp(e, n) {
	const [r, u] = e;
	let s = !1;
	const o = n.length;
	for (let f = o, h = 0, m = f - 1; h < f; m = h++) {
		const [v, g] = n[h],
			[_, b] = n[m],
			[, p] = n[m === 0 ? f - 1 : m - 1] || [0, 0],
			E = (g - b) * (r - v) - (v - _) * (u - g);
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
		} else if (u === g && ((r >= _ && r <= v) || (r >= v && r <= _))) return !0;
	}
	return s;
}
function FM(e, n) {
	const { top: r, right: u, bottom: s, left: o } = n,
		[f, h] = e;
	return [f < o ? "left" : f > u ? "right" : null, h < r ? "top" : h > s ? "bottom" : null];
}
function Rp(e, n) {
	const r = e.getBoundingClientRect(),
		{ top: u, right: s, bottom: o, left: f } = r,
		[h, m] = FM(n, r),
		v = [n];
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
var XM = "div";
function P_(e, n, r, u) {
	return Nr(n) ? !0 : e ? !!(Pt(n, e) || (r && Pt(r, e)) || u?.some((s) => P_(e, s, r))) : !1;
}
function JM({ store: e, ...n }) {
	const [r, u] = (0, w.useState)(!1),
		s = e.useState("mounted");
	(0, w.useEffect)(() => {
		s || u(!1);
	}, [s]);
	const o = n.onFocus,
		f = Ce((m) => {
			(o?.(m), !m.defaultPrevented && u(!0));
		}),
		h = (0, w.useRef)(null);
	return (
		(0, w.useEffect)(
			() =>
				on(e, ["anchorElement"], (m) => {
					h.current = m.anchorElement;
				}),
			[],
		),
		(n = { autoFocusOnHide: r, finalFocus: h, ...n, onFocus: f }),
		n
	);
}
var Op = (0, w.createContext)(null),
	Q_ = Xe(function ({
		store: n,
		modal: r = !1,
		portal: u = !!r,
		hideOnEscape: s = !0,
		hideOnHoverOutside: o = !0,
		disablePointerEventsOnApproach: f = !!o,
		...h
	}) {
		const m = lm();
		((n = n || m), Qt(n, !1));
		const v = (0, w.useRef)(null),
			[g, _] = (0, w.useState)([]),
			b = (0, w.useRef)(0),
			p = (0, w.useRef)(null),
			{ portalRef: E, domReady: x } = Dh(u, h.portalRef),
			O = jh(),
			z = !!o,
			D = yt(o),
			A = !!f,
			C = yt(f),
			k = n.useState("open"),
			F = n.useState("mounted");
		((0, w.useEffect)(() => {
			if (!x || !F || (!z && !A)) return;
			const B = v.current;
			return B
				? xn(
						un(
							"mousemove",
							(ee) => {
								if (!n || !O()) return;
								const { anchorElement: Y, hideTimeout: ae, timeout: R } = n.getState(),
									$ = p.current,
									[H] = ee.composedPath(),
									se = Y;
								if (P_(H, B, se, g)) {
									((p.current = H && se && Pt(se, H) ? Hd(ee) : null), window.clearTimeout(b.current), (b.current = 0));
									return;
								}
								if (!b.current) {
									if ($) {
										const me = Hd(ee);
										if (Cp(me, Rp(B, $))) {
											if (((p.current = me), !C(ee))) return;
											(ee.preventDefault(), ee.stopPropagation());
											return;
										}
									}
									D(ee) &&
										(b.current = window.setTimeout(() => {
											((b.current = 0), n?.hide());
										}, ae ?? R));
								}
							},
							!0,
						),
						() => clearTimeout(b.current),
					)
				: void 0;
		}, [n, O, x, F, z, A, g, C, D]),
			(0, w.useEffect)(() => {
				if (!x || !F || !A) return;
				const B = (oe) => {
					const ee = v.current;
					if (!ee) return;
					const Y = p.current;
					if (!Y) return;
					const ae = Rp(ee, Y);
					if (Cp(Hd(oe), ae)) {
						if (!C(oe)) return;
						(oe.preventDefault(), oe.stopPropagation());
					}
				};
				return xn(un("mouseenter", B, !0), un("mouseover", B, !0), un("mouseout", B, !0), un("mouseleave", B, !0));
			}, [x, F, A, C]),
			(0, w.useEffect)(() => {
				x && (k || n?.setAutoFocusOnShow(!1));
			}, [n, x, k]));
		const Q = Bb(k);
		(0, w.useEffect)(() => {
			if (x)
				return () => {
					Q.current || n?.setAutoFocusOnShow(!1);
				};
		}, [n, x]);
		const j = (0, w.useContext)(Op);
		Qe(() => {
			if (r || !u || !F || !x) return;
			const B = v.current;
			if (B) return j?.(B);
		}, [r, u, F, x]);
		const q = (0, w.useCallback)(
			(B) => {
				_((ee) => [...ee, B]);
				const oe = j?.(B);
				return () => {
					(_((ee) => ee.filter((Y) => Y !== B)), oe?.());
				};
			},
			[j],
		);
		((h = ln(h, (B) => (0, S.jsx)(V_, { value: n, children: (0, S.jsx)(Op.Provider, { value: q, children: B }) }), [
			n,
			q,
		])),
			(h = { ...h, ref: Dt(v, h.ref) }),
			(h = JM({ store: n, ...h })));
		const G = n.useState((B) => r || B.autoFocusOnShow);
		return (
			(h = um({
				store: n,
				modal: r,
				portal: u,
				autoFocusOnShow: G,
				...h,
				portalRef: E,
				hideOnEscape(B) {
					return Zo(s, B)
						? !1
						: (requestAnimationFrame(() => {
								requestAnimationFrame(() => {
									n?.hide();
								});
							}),
							!0);
				},
			})),
			h
		);
	}),
	wD = ql(
		Ve(function (n) {
			return Ye(XM, Q_(n));
		}),
		lm,
	),
	WM = "div",
	ez = Xe(function ({
		store: n,
		modal: r = !1,
		portal: u = !!r,
		hideOnEscape: s = !0,
		autoFocusOnShow: o = !0,
		hideOnHoverOutside: f,
		alwaysVisible: h,
		...m
	}) {
		const v = lc();
		((n = n || v), Qt(n, !1));
		const g = (0, w.useRef)(null),
			_ = n.parent,
			b = n.menubar,
			p = !!_,
			E = !!b && !p;
		m = { ...m, ref: Dt(g, m.ref) };
		const { "aria-labelledby": x, ...O } = H_({ store: n, alwaysVisible: h, ...m });
		m = O;
		const [z, D] = (0, w.useState)(),
			A = n.useState("autoFocusOnShow"),
			C = n.useState("initialFocus"),
			k = n.useState("baseElement"),
			F = n.useState("renderedItems");
		(0, w.useEffect)(() => {
			let ee = !1;
			return (
				D((Y) => {
					var ae, R, $;
					if (ee || !A) return;
					if ((ae = Y?.current) != null && ae.isConnected) return Y;
					const H = (0, w.createRef)();
					switch (C) {
						case "first":
							H.current = ((R = F.find((se) => !se.disabled && se.element)) == null ? void 0 : R.element) || null;
							break;
						case "last":
							H.current =
								(($ = [...F].reverse().find((se) => !se.disabled && se.element)) == null ? void 0 : $.element) || null;
							break;
						default:
							H.current = k;
					}
					return H;
				}),
				() => {
					ee = !0;
				}
			);
		}, [n, A, C, F, k]);
		const Q = p ? !1 : r,
			j = !!o,
			q = !!z || !!m.initialFocus || !!Q,
			G = Zt(n.combobox || n, "contentElement"),
			B = Zt(_?.combobox || _, "contentElement"),
			oe = (0, w.useMemo)(() => {
				if (!B || !G) return;
				const ee = G.getAttribute("role"),
					Y = B.getAttribute("role");
				if (!((Y === "menu" || Y === "menubar") && ee === "menu")) return B;
			}, [G, B]);
		return (
			oe !== void 0 && (m = { preserveTabOrderAnchor: oe, ...m }),
			(m = Q_({
				store: n,
				alwaysVisible: h,
				initialFocus: z,
				autoFocusOnShow: j ? q && o : A || !!Q,
				...m,
				hideOnEscape(ee) {
					return Zo(s, ee) ? !1 : (n?.hideAll(), !0);
				},
				hideOnHoverOutside(ee) {
					const Y = n?.getState().disclosureElement;
					return (typeof f == "function" ? f(ee) : (f ?? (p ? !0 : E ? (Y ? !Nr(Y) : !0) : !1)))
						? ee.defaultPrevented || !p || !Y || (LO(Y, "mouseout", ee), !Nr(Y))
							? !0
							: (requestAnimationFrame(() => {
									Nr(Y) || n?.hide();
								}),
								!1)
						: !1;
				},
				modal: Q,
				portal: u,
				backdrop: p ? !1 : m.backdrop,
			})),
			(m = { "aria-labelledby": x, ...m }),
			m
		);
	}),
	tz = ql(
		Ve(function (n) {
			return Ye(WM, ez(n));
		}),
		lc,
	),
	nz = "a",
	Y_ = Xe(function ({ store: n, showOnHover: r = !0, ...u }) {
		const s = lm();
		((n = n || s), Qt(n, !1));
		const o = Cl(u),
			f = (0, w.useRef)(0);
		((0, w.useEffect)(() => () => window.clearTimeout(f.current), []),
			(0, w.useEffect)(
				() =>
					un(
						"mouseleave",
						(x) => {
							if (!n) return;
							const { anchorElement: O } = n.getState();
							O && x.target === O && (window.clearTimeout(f.current), (f.current = 0));
						},
						!0,
					),
				[n],
			));
		const h = u.onMouseMove,
			m = yt(r),
			v = jh(),
			g = Ce((E) => {
				if ((h?.(E), o || !n || E.defaultPrevented || f.current || !v() || !m(E))) return;
				const x = E.currentTarget;
				(n.setAnchorElement(x), n.setDisclosureElement(x));
				const { showTimeout: O, timeout: z } = n.getState(),
					D = () => {
						((f.current = 0),
							v() &&
								(n?.setAnchorElement(x),
								n?.show(),
								queueMicrotask(() => {
									n?.setDisclosureElement(x);
								})));
					},
					A = O ?? z;
				A === 0 ? D() : (f.current = window.setTimeout(D, A));
			}),
			_ = u.onClick,
			b = Ce((E) => {
				(_?.(E), n && (window.clearTimeout(f.current), (f.current = 0)));
			}),
			p = (0, w.useCallback)(
				(E) => {
					if (!n) return;
					const { anchorElement: x } = n.getState();
					x?.isConnected || n.setAnchorElement(E);
				},
				[n],
			);
		return ((u = { ...u, ref: Dt(p, u.ref), onMouseMove: g, onClick: b }), (u = kl(u)), u);
	}),
	ED = Ve(function (n) {
		return Ye(nz, Y_(n));
	}),
	iz = "button",
	K_ = Xe(function ({ store: n, ...r }) {
		const u = Fo();
		((n = n || u), Qt(n, !1));
		const s = r.onClick,
			o = Ce((f) => {
				(n?.setAnchorElement(f.currentTarget), s?.(f));
			});
		return (
			(r = ln(r, (f) => (0, S.jsx)(Xo, { value: n, children: f }), [n])),
			(r = { ...r, onClick: o }),
			(r = Zh({ store: n, ...r })),
			(r = t_({ store: n, ...r })),
			r
		);
	}),
	TD = Ve(function (n) {
		return Ye(iz, K_(n));
	}),
	rz = "button";
function az(e, n) {
	return {
		ArrowDown: n === "bottom" || n === "top" ? "first" : !1,
		ArrowUp: n === "bottom" || n === "top" ? "last" : !1,
		ArrowRight: n === "right" ? "first" : !1,
		ArrowLeft: n === "left" ? "first" : !1,
	}[e.key];
}
function Np(e, n) {
	return !!e?.some((r) => (!r.element || r.element === n ? !1 : r.element.getAttribute("aria-expanded") === "true"));
}
var uz = Xe(function ({ store: n, focusable: r, accessibleWhenDisabled: u, showOnHover: s, ...o }) {
		const f = lc();
		((n = n || f), Qt(n, !1));
		const h = (0, w.useRef)(null),
			m = n.parent,
			v = n.menubar,
			g = !!m,
			_ = !!v && !g,
			b = Cl(o),
			p = () => {
				const Q = h.current;
				Q && (n?.setDisclosureElement(Q), n?.setAnchorElement(Q), n?.show());
			},
			E = o.onFocus,
			x = Ce((Q) => {
				if ((E?.(Q), b || Q.defaultPrevented || (n?.setAutoFocusOnShow(!1), n?.setActiveId(null), !v) || !_)) return;
				const { items: j } = v.getState();
				Np(j, Q.currentTarget) && p();
			}),
			O = Zt(n, (Q) => Q.placement.split("-")[0]),
			z = o.onKeyDown,
			D = Ce((Q) => {
				if ((z?.(Q), b || Q.defaultPrevented)) return;
				const j = az(Q, O);
				j && (Q.preventDefault(), p(), n?.setAutoFocusOnShow(!0), n?.setInitialFocus(j));
			}),
			A = o.onClick,
			C = Ce((Q) => {
				if ((A?.(Q), Q.defaultPrevented || !n)) return;
				const j = !Q.detail,
					{ open: q } = n.getState();
				((!q || j) && ((!g || j) && n.setAutoFocusOnShow(!0), n.setInitialFocus(j ? "first" : "container")), g && p());
			});
		((o = ln(o, (Q) => (0, S.jsx)(Z_, { value: n, children: Q }), [n])),
			g && (o = { ...o, render: (0, S.jsx)(Mo.div, { render: o.render }) }));
		const k = ir(o.id),
			F = Zt(m?.combobox || m, "contentElement");
		return (
			(o = {
				id: k,
				role: g || _ ? kb(F, "menuitem") : void 0,
				"aria-haspopup": Vo(n.useState("contentElement"), "menu"),
				...o,
				ref: Dt(h, o.ref),
				onFocus: x,
				onKeyDown: D,
				onClick: C,
			}),
			(o = Y_({
				store: n,
				focusable: r,
				accessibleWhenDisabled: u,
				...o,
				showOnHover: (Q) => {
					if (
						!(() => {
							if (typeof s == "function") return s(Q);
							if (s != null) return s;
							if (g) return !0;
							if (!v) return !1;
							const { items: G } = v.getState();
							return _ && Np(G);
						})()
					)
						return !1;
					const q = _ ? v : m;
					return (q && q.setActiveId(Q.currentTarget.id), !0);
				},
			})),
			(o = K_({ store: n, toggleOnClick: !g, focusable: r, accessibleWhenDisabled: u, ...o })),
			(o = sm({ store: n, typeahead: _, ...o })),
			o
		);
	}),
	lz = Ve(function (n) {
		return Ye(rz, uz(n));
	}),
	sz = "div";
function oz(e, n, r) {
	var u;
	if (!e) return !1;
	if (Nr(e)) return !0;
	const s = n?.find((h) => {
			var m;
			return h.element === r ? !1 : ((m = h.element) == null ? void 0 : m.getAttribute("aria-expanded")) === "true";
		}),
		o = (u = s?.element) == null ? void 0 : u.getAttribute("aria-controls");
	if (!o) return !1;
	const f = mt(e).getElementById(o);
	return f ? (Nr(f) ? !0 : !!f.querySelector("[role=menuitem][aria-expanded=true]")) : !1;
}
var cz = Xe(function ({
		store: n,
		hideOnClick: r = !0,
		preventScrollOnKeyDown: u = !0,
		focusOnHover: s,
		blurOnHoverEnd: o,
		...f
	}) {
		const h = IM(!0),
			m = UM();
		((n = n || h || m), Qt(n, !1));
		const v = f.onClick,
			g = yt(r),
			_ = "hideAll" in n ? n.hideAll : void 0,
			b = !!_,
			p = Ce((E) => {
				(v?.(E),
					!E.defaultPrevented &&
						($b(E) || Ub(E) || (_ && E.currentTarget.getAttribute("aria-haspopup") !== "menu" && g(E) && _())));
			});
		return (
			(f = {
				role: kb(
					Zt(n, (E) => ("contentElement" in E ? E.contentElement : null)),
					"menuitem",
				),
				...f,
				onClick: p,
			}),
			(f = Gh({ store: n, preventScrollOnKeyDown: u, ...f })),
			(f = Kh({
				store: n,
				...f,
				focusOnHover(E) {
					const x = () => (typeof s == "function" ? s(E) : (s ?? !0));
					if (!n || !x()) return !1;
					const { baseElement: O, items: z } = n.getState();
					return b
						? (E.currentTarget.hasAttribute("aria-expanded") && E.currentTarget.focus(), !0)
						: oz(O, z, E.currentTarget)
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
	fz = Po(
		Ve(function (n) {
			return Ye(sz, cz(n));
		}),
	);
function dz(e = {}) {
	var n;
	const r = (n = e.store) == null ? void 0 : n.getState(),
		u = N_({ ...e, placement: Ne(e.placement, r?.placement, "bottom") }),
		s = Ne(e.timeout, r?.timeout, 500),
		o = oi(
			{
				...u.getState(),
				timeout: s,
				showTimeout: Ne(e.showTimeout, r?.showTimeout),
				hideTimeout: Ne(e.hideTimeout, r?.hideTimeout),
				autoFocusOnShow: Ne(r?.autoFocusOnShow, !1),
			},
			u,
			e.store,
		);
	return { ...u, ...o, setAutoFocusOnShow: (f) => o.setState("autoFocusOnShow", f) };
}
function hz(e, n, r) {
	return (zt(e, r, "timeout"), zt(e, r, "showTimeout"), zt(e, r, "hideTimeout"), k_(e, n, r));
}
function mz({ combobox: e, parent: n, menubar: r, ...u } = {}) {
	const s = !!r && !n,
		o = Wo(
			u.store,
			Xb(n, ["values"]),
			Qh(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
		);
	const f = o.getState(),
		h = D_({ ...u, store: o, orientation: Ne(u.orientation, f.orientation, "vertical") }),
		m = dz({
			...u,
			store: o,
			placement: Ne(u.placement, f.placement, "bottom-start"),
			timeout: Ne(u.timeout, f.timeout, s ? 0 : 150),
			hideTimeout: Ne(u.hideTimeout, f.hideTimeout, 0),
		}),
		v = oi(
			{
				...h.getState(),
				...m.getState(),
				initialFocus: Ne(f.initialFocus, "container"),
				values: Ne(u.values, f.values, u.defaultValues, {}),
			},
			h,
			m,
			o,
		);
	return (
		mn(v, () =>
			on(v, ["mounted"], (g) => {
				g.mounted || v.setState("activeId", null);
			}),
		),
		mn(v, () =>
			on(n, ["orientation"], (g) => {
				v.setState("placement", g.orientation === "vertical" ? "right-start" : "bottom-start");
			}),
		),
		{
			...h,
			...m,
			...v,
			combobox: e,
			parent: n,
			menubar: r,
			hideAll: () => {
				(m.hide(), n?.hideAll());
			},
			setInitialFocus: (g) => v.setState("initialFocus", g),
			setValues: (g) => v.setState("values", g),
			setValue: (g, _) => {
				g !== "__proto__" &&
					g !== "constructor" &&
					(Array.isArray(g) ||
						v.setState("values", (b) => {
							const p = b[g],
								E = zb(_, p);
							return E === p ? b : { ...b, [g]: E !== void 0 && E };
						}));
			},
		}
	);
}
function vz(e, n, r) {
	return (
		wu(n, [r.combobox, r.parent, r.menubar]),
		zt(e, r, "values", "setValues"),
		Object.assign(hz(j_(e, n, r), n, r), { combobox: r.combobox, parent: r.parent, menubar: r.menubar })
	);
}
function gz(e = {}) {
	const n = BM(),
		r = qM(),
		u = Jo();
	e = {
		...e,
		parent: e.parent !== void 0 ? e.parent : n,
		menubar: e.menubar !== void 0 ? e.menubar : r,
		combobox: e.combobox !== void 0 ? e.combobox : u,
	};
	const [s, o] = ec(mz, e);
	return vz(s, o, e);
}
function yz(e = {}) {
	return (0, S.jsx)(Z_, { value: gz(e), children: e.children });
}
var pz = (0, w.memo)(function (n) {
		const { channelName: r, items: u } = n;
		return (0, S.jsxs)(yz, {
			placement: "bottom-end",
			children: [
				(0, S.jsx)(lz, {
					className: "ChannelRowMenu-trigger",
					"aria-label": `Actions for #${r}`,
					children: (0, S.jsx)(dO, { size: 16, "aria-hidden": "true" }),
				}),
				(0, S.jsx)(tz, {
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					className: "ChannelRowMenu-popover",
					"aria-label": `Actions for #${r}`,
					children: u.map((s) =>
						(0, S.jsx)(fz, { className: "ChannelRowMenu-item", onClick: s.onSelect, children: s.label }, s.id),
					),
				}),
			],
		});
	}),
	bz = 300 * 1e3;
function _z(e) {
	const n = (0, w.useRef)(new Map()),
		r = (0, w.useRef)(new Map()),
		[, u] = (0, w.useState)(0),
		s = (0, w.useCallback)((f) => (n.current.has(f) ? n.current.get(f) : void 0), []),
		o = (0, w.useCallback)(
			async (f) => {
				const h = Date.now(),
					m = [...new Set(f)].filter((v) => {
						const g = r.current.get(v);
						return g === void 0 || h - g >= bz;
					});
				if (m.length !== 0) {
					for (const v of m) r.current.set(v, h);
					for (let v = 0; v < m.length; v += 50) {
						const g = m.slice(v, v + 50);
						try {
							const _ = await e.members.resolve(g);
							for (const b of g) n.current.set(b, _[b] ?? null);
						} catch {
							for (const _ of g) r.current.delete(_);
						}
					}
					u((v) => v + 1);
				}
			},
			[e],
		);
	return (0, w.useMemo)(() => ({ get: s, resolve: o }), [s, o]);
}
function Sz(e) {
	const [n, r] = (0, w.useState)(null);
	return (
		(0, w.useEffect)(() => {
			let u = !1;
			return (
				e.members.list({ limit: 100 }).then((s) => {
					if (!u) {
						if ("_nay" in s) {
							r({ members: [], error: Ab(s._nay.name), truncated: !1 });
							return;
						}
						r({ members: s._yay.members, error: null, truncated: s._yay.cursor !== null });
					}
				}),
				() => {
					u = !0;
				}
			);
		}, [e]),
		n
	);
}
function G_(e) {
	const n = Sz(e.client);
	if (n === null) return (0, S.jsx)("p", { className: "channel-status", role: "status", children: "Loading people…" });
	if (n.error !== null) return (0, S.jsx)("p", { className: "form-error", role: "alert", children: n.error });
	const r = n.members
		.filter((u) => u.userId !== e.selfUserId)
		.sort((u, s) => go(u.displayName).localeCompare(go(s.displayName)));
	return r.length === 0
		? (0, S.jsx)("p", { className: "channel-status", children: "Nobody else is in this workspace yet." })
		: (0, S.jsxs)(S.Fragment, {
				children: [
					(0, S.jsx)("ul", {
						className: "people-list",
						children: r.map((u) =>
							(0, S.jsx)(
								"li",
								{
									className: "people-item",
									children: (0, S.jsxs)("label", {
										children: [
											(0, S.jsx)("input", {
												type: "checkbox",
												checked: e.selected.includes(u.userId),
												onChange: (s) => e.onToggle(u.userId, s.currentTarget.checked),
											}),
											go(u.displayName),
										],
									}),
								},
								u.userId,
							),
						),
					}),
					n.truncated
						? (0, S.jsx)("p", {
								className: "channel-status",
								children: "Showing the first 100 people in this workspace.",
							})
						: null,
				],
			});
}
function kp(e) {
	const n = (0, w.useId)(),
		r = (0, w.useId)(),
		u = (0, w.useId)(),
		s = (0, w.useId)(),
		[o, f] = (0, w.useState)(e.initialName),
		[h, m] = (0, w.useState)(e.initialTopic),
		[v, g] = (0, w.useState)(!1),
		[_, b] = (0, w.useState)([]),
		[p, E] = (0, w.useState)(null),
		x = () => {
			if (e.busy) return;
			const z = o.trim();
			if (z.length < 1 || z.length > 64) {
				E("Enter a name between 1 and 64 characters.");
				return;
			}
			const D = h.trim();
			if (D.length > 250) {
				E("Keep the topic under 250 characters.");
				return;
			}
			(E(null), e.onSubmit(z, D, { isPrivate: v, userIds: _ }));
		},
		O = p ?? e.error;
	return (0, S.jsxs)($l, {
		labelledBy: n,
		onClose: e.onClose,
		children: [
			(0, S.jsx)("h2", { id: n, className: "dialog-title", children: e.title }),
			(0, S.jsxs)("div", {
				className: "field",
				children: [
					(0, S.jsx)("label", { htmlFor: r, children: "Channel name" }),
					(0, S.jsx)("input", {
						id: r,
						"data-dialog-initial": !0,
						type: "text",
						value: o,
						maxLength: 64,
						onInput: (z) => f(z.currentTarget.value),
						onKeyDown: (z) => {
							z.key === "Enter" && (z.preventDefault(), x());
						},
					}),
				],
			}),
			(0, S.jsxs)("div", {
				className: "field",
				children: [
					(0, S.jsx)("label", { htmlFor: u, children: "Topic (optional)" }),
					(0, S.jsx)("input", {
						id: u,
						type: "text",
						value: h,
						maxLength: 250,
						onInput: (z) => m(z.currentTarget.value),
						onKeyDown: (z) => {
							z.key === "Enter" && (z.preventDefault(), x());
						},
					}),
				],
			}),
			e.privacy !== null
				? (0, S.jsxs)("div", {
						className: "field",
						children: [
							(0, S.jsxs)("label", {
								className: "checkbox-label",
								htmlFor: s,
								children: [
									(0, S.jsx)("input", {
										id: s,
										type: "checkbox",
										checked: v,
										onChange: (z) => g(z.currentTarget.checked),
									}),
									"Private channel",
								],
							}),
							v
								? (0, S.jsxs)(S.Fragment, {
										children: [
											(0, S.jsx)("p", { className: "field-note", children: Ah }),
											(0, S.jsx)("p", {
												className: "field-note",
												children: "Tick one person for a direct message, or several for a group.",
											}),
											(0, S.jsx)(G_, {
												client: e.privacy.client,
												selfUserId: e.privacy.selfUserId,
												selected: _,
												onToggle: (z, D) => b((A) => (D ? [...A, z] : A.filter((C) => C !== z))),
											}),
										],
									})
								: null,
						],
					})
				: null,
			O !== null ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: O }) : null,
			(0, S.jsxs)("div", {
				className: "dialog-actions",
				children: [
					(0, S.jsx)("button", {
						type: "button",
						className: "button",
						disabled: e.busy,
						onClick: e.onClose,
						children: "Cancel",
					}),
					(0, S.jsx)("button", {
						type: "button",
						className: "button button-primary",
						disabled: e.busy,
						onClick: x,
						children: e.busy ? "Saving…" : e.submitLabel,
					}),
				],
			}),
		],
	});
}
function wz(e) {
	const n = (0, w.useId)(),
		[r, u] = (0, w.useState)(null),
		[s, o] = (0, w.useState)(!1),
		[f, h] = (0, w.useState)(!1),
		[m, v] = (0, w.useState)(null),
		g = (0, w.useCallback)(
			() =>
				e.client.scopes
					.listPrincipals({ scopeId: e.channel.key })
					.then((E) => (u(E), o(!0), E !== null && e.memberNames.resolve(E.map((x) => x.userId)), E)),
			[e.client, e.channel.key, e.memberNames],
		);
	(0, w.useEffect)(() => {
		g();
	}, [g]);
	const _ = (E) => {
			(h(!0),
				v(null),
				E.then((x) => {
					if ("_nay" in x) {
						v(x._nay.message);
						return;
					}
					return g().then(() => {});
				}).finally(() => h(!1)));
		},
		b = new Set((r ?? []).map((E) => E.userId)),
		p = (r ?? []).some((E) => E.userId === e.selfUserId && E.level === "manage");
	return (0, S.jsxs)($l, {
		labelledBy: n,
		onClose: e.onClose,
		children: [
			(0, S.jsxs)("h2", { id: n, className: "dialog-title", children: ["People in #", e.channel.value.name] }),
			(0, S.jsx)("p", { className: "field-note", children: Ah }),
			s
				? r === null
					? (0, S.jsx)("p", {
							className: "form-error",
							role: "alert",
							children: "This channel's people list is no longer readable. Reload the page.",
						})
					: (0, S.jsx)("ul", {
							className: "people-list current-people",
							"aria-label": "People in this channel",
							children: r.map((E) =>
								(0, S.jsxs)(
									"li",
									{
										className: "people-item",
										children: [
											(0, S.jsxs)("span", {
												children: [
													e.memberNames.get(E.userId) ?? E.userId,
													E.level === "manage" ? " (can add people)" : "",
												],
											}),
											p && E.userId !== e.selfUserId
												? (0, S.jsx)("button", {
														type: "button",
														className: "button channel-item-action",
														disabled: f,
														onClick: () =>
															_(e.client.scopes.removePrincipal({ scopeId: e.channel.key, userId: E.userId })),
														children: "Remove",
													})
												: null,
										],
									},
									E.userId,
								),
							),
						})
				: (0, S.jsx)("p", { className: "channel-status", role: "status", children: "Loading people…" }),
			s && r !== null && p
				? (0, S.jsxs)("div", {
						className: "field",
						children: [
							(0, S.jsx)("p", { className: "field-label", children: "Add people" }),
							(0, S.jsx)(G_, {
								client: e.client,
								selfUserId: e.selfUserId,
								selected: [...b],
								onToggle: (E, x) =>
									_(
										x
											? e.client.scopes.setPrincipal({ scopeId: e.channel.key, userId: E, level: "member" })
											: e.client.scopes.removePrincipal({ scopeId: e.channel.key, userId: E }),
									),
							}),
						],
					})
				: null,
			m !== null ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: m }) : null,
			(0, S.jsx)("div", {
				className: "dialog-actions",
				children: (0, S.jsx)("button", {
					type: "button",
					className: "button",
					"data-dialog-initial": !0,
					onClick: e.onClose,
					children: "Close",
				}),
			}),
		],
	});
}
function Ez(e) {
	const n = (0, w.useId)();
	return (0, S.jsxs)($l, {
		labelledBy: n,
		onClose: e.onClose,
		children: [
			(0, S.jsxs)("h2", { id: n, className: "dialog-title", children: ["Archive #", e.channelName, "?"] }),
			(0, S.jsx)("p", {
				children: "The channel is hidden from the list. Its messages stay stored and it can be unarchived any time.",
			}),
			e.error !== null ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: e.error }) : null,
			(0, S.jsxs)("div", {
				className: "dialog-actions",
				children: [
					(0, S.jsx)("button", {
						type: "button",
						className: "button",
						"data-dialog-initial": !0,
						disabled: e.busy,
						onClick: e.onClose,
						children: "Cancel",
					}),
					(0, S.jsx)("button", {
						type: "button",
						className: "button button-danger",
						disabled: e.busy,
						onClick: e.onConfirm,
						children: e.busy ? "Archiving…" : "Archive channel",
					}),
				],
			}),
		],
	});
}
var Tz = [
	{ key: "view:unreads", name: "Unreads" },
	{ key: "view:threads", name: "Threads" },
	{ key: "view:activity", name: "Activity" },
];
function om(e) {
	return e === null ? "Former member" : (e ?? "…");
}
function cm(e) {
	return e.length > 80 ? `${e.slice(0, 80)}…` : e;
}
function xz(e) {
	const n = [];
	for (const s of e.channels) {
		if (ui(s.key)) {
			const f = s.value.lastMessageAt;
			f !== void 0 &&
				f > (e.privateCursors.get(s.key)?.at ?? 0) &&
				n.push({ channel: s, at: f, mentionCount: 0, preview: null });
			continue;
		}
		const o = e.publicUnreads.get(s.key);
		o !== void 0 && n.push({ channel: s, at: o.latest.timestamp, mentionCount: o.mentionCount, preview: o.latest });
	}
	n.sort((s, o) => o.at - s.at);
	const r = e.memberNames;
	(0, w.useEffect)(() => {
		const s = [...e.publicUnreads.values()].map((o) => o.latest.createdBy);
		s.length > 0 && r.resolve(s);
	}, [e.publicUnreads, r]);
	const u = Date.now();
	return (0, S.jsxs)("section", {
		className: "view",
		"aria-label": "Unreads",
		children: [
			(0, S.jsx)("header", {
				className: "view-head",
				children: (0, S.jsx)("h2", { className: "view-title", children: "Unreads" }),
			}),
			(0, S.jsx)("p", {
				className: "view-note",
				children:
					"Only the newest 100 public messages are checked, so an older unread channel can be missing here. Private channels show their name only.",
			}),
			e.recentDead
				? (0, S.jsx)("div", {
						className: "channel-status is-error",
						role: "alert",
						children: "The recent-messages feed stopped, so unread state for public channels is not updating.",
					})
				: null,
			n.length === 0
				? (0, S.jsx)("div", { className: "channel-status", children: "You are all caught up." })
				: (0, S.jsx)("ul", {
						className: "view-rows",
						children: n.map((s) =>
							(0, S.jsx)(
								"li",
								{
									className: "view-row",
									children: (0, S.jsxs)("button", {
										type: "button",
										className: "view-row-button",
										onClick: () => e.onSelectChannel(s.channel),
										children: [
											(0, S.jsxs)("span", {
												className: "view-row-title",
												children: [
													"#",
													s.channel.value.name,
													s.mentionCount > 0
														? (0, S.jsxs)("span", {
																className: "mention-badge",
																children: [
																	s.mentionCount,
																	(0, S.jsx)("span", { className: "visually-hidden", children: " mentions of you" }),
																],
															})
														: null,
												],
											}),
											(0, S.jsx)("span", { className: "view-row-time", children: Io(s.at, u) }),
											s.preview !== null
												? (0, S.jsx)("span", {
														className: "view-row-preview",
														children: `${om(r.get(s.preview.createdBy))}: ${cm(s.preview.value.text)}`,
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
function Az(e) {
	const n = new Map(e.channels.map((o) => [o.key, o])),
		r = [];
	for (const o of e.feed) {
		if (o.value.deletedAt !== null) continue;
		const f = Ch(o.key),
			h = f === null ? void 0 : n.get(f);
		if (h === void 0) continue;
		const m = r[r.length - 1];
		m !== void 0 && m.channel.key === h.key ? m.messages.push(o) : r.push({ channel: h, messages: [o] });
	}
	const u = e.memberNames;
	(0, w.useEffect)(() => {
		const o = [...new Set(e.feed.map((f) => f.createdBy))];
		o.length > 0 && u.resolve(o);
	}, [e.feed, u]);
	const s = Date.now();
	return (0, S.jsxs)("section", {
		className: "view",
		"aria-label": "Activity",
		children: [
			(0, S.jsx)("header", {
				className: "view-head",
				children: (0, S.jsx)("h2", { className: "view-title", children: "Activity" }),
			}),
			(0, S.jsx)("p", {
				className: "view-note",
				children: "The newest public messages. Private channels are not shown here.",
			}),
			e.recentDead
				? (0, S.jsx)("div", {
						className: "channel-status is-error",
						role: "alert",
						children: "The recent-messages feed stopped, so this view is not updating.",
					})
				: null,
			r.length === 0
				? (0, S.jsx)("div", { className: "channel-status", children: "No public messages yet." })
				: (0, S.jsx)("div", {
						className: "view-groups",
						children: r.map((o, f) =>
							(0, S.jsxs)(
								"section",
								{
									className: "view-group",
									children: [
										(0, S.jsx)("h3", {
											className: "view-group-title",
											children: (0, S.jsxs)("button", {
												type: "button",
												className: "view-group-link",
												onClick: () => e.onSelectChannel(o.channel),
												children: ["#", o.channel.value.name],
											}),
										}),
										(0, S.jsx)("ul", {
											className: "view-rows",
											children: o.messages.map((h) =>
												(0, S.jsxs)(
													"li",
													{
														className: h.value.mentions?.includes(e.selfUserId) ? "view-row mention-self" : "view-row",
														children: [
															(0, S.jsx)("span", { className: "view-row-title", children: om(u.get(h.createdBy)) }),
															(0, S.jsx)("span", { className: "view-row-time", children: Io(h.timestamp, s) }),
															(0, S.jsx)("span", { className: "view-row-preview", children: cm(h.value.text) }),
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
function Cz(e) {
	const [n, r] = (0, w.useState)([]),
		[u, s] = (0, w.useState)(!1),
		[o, f] = (0, w.useState)(!1);
	(0, w.useEffect)(() => {
		const _ = yo(Oo);
		return e.client.data.watchRecent({ collection: "replies", limit: 100, order: "desc" }, (b) => {
			if (b === null) {
				(f(!0), s(!0));
				return;
			}
			(r(_.apply_window(b.docs)), s(!0));
		});
	}, [e.client]);
	const h = new Map(e.channels.map((_) => [_.key, _])),
		m = new Map();
	for (const _ of n) {
		if (_.value.deletedAt !== null) continue;
		const b = Rh(_.key),
			p = b === null ? null : Ch(b),
			E = p === null ? void 0 : h.get(p);
		if (b === null || E === void 0) continue;
		const x = m.get(b);
		x === void 0 ? m.set(b, { channel: E, newest: _, count: 1 }) : (x.count += 1);
	}
	const v = e.memberNames;
	(0, w.useEffect)(() => {
		const _ = [...new Set(n.map((b) => b.createdBy))];
		_.length > 0 && v.resolve(_);
	}, [n, v]);
	const g = Date.now();
	return (0, S.jsxs)("section", {
		className: "view",
		"aria-label": "Threads",
		children: [
			(0, S.jsx)("header", {
				className: "view-head",
				children: (0, S.jsx)("h2", { className: "view-title", children: "Threads" }),
			}),
			(0, S.jsx)("p", {
				className: "view-note",
				children:
					"The newest public reply activity; counts read the newest 100 replies. Private channels are not shown here.",
			}),
			o
				? (0, S.jsx)("div", {
						className: "channel-status is-error",
						role: "alert",
						children: "The replies feed stopped, so this view is not updating.",
					})
				: null,
			u
				? m.size === 0
					? (0, S.jsx)("div", { className: "channel-status", children: "No recent thread activity." })
					: (0, S.jsx)("ul", {
							className: "view-rows",
							children: [...m.entries()].map(([_, b]) =>
								(0, S.jsx)(
									"li",
									{
										className: "view-row",
										children: (0, S.jsxs)("button", {
											type: "button",
											className: "view-row-button",
											onClick: () => e.onOpenThread(b.channel, _),
											children: [
												(0, S.jsxs)("span", { className: "view-row-title", children: ["#", b.channel.value.name] }),
												(0, S.jsx)("span", { className: "view-row-time", children: Io(b.newest.timestamp, g) }),
												(0, S.jsx)("span", {
													className: "view-row-preview",
													children: `${b.count} ${b.count === 1 ? "reply" : "replies"} · ${om(v.get(b.newest.createdBy))}: ${cm(b.newest.value.text)}`,
												}),
											],
										}),
									},
									_,
								),
							),
						})
				: (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading threads…" }),
		],
	});
}
function Rz(e) {
	return e === "denied"
		? "Chitchat can no longer read its data. Reload the page to try again."
		: e === "session_expired"
			? "This Chitchat session expired. Reload the page to continue."
			: e === "unavailable"
				? "Chitchat cannot reach its data right now. Nothing will update until the connection returns."
				: e === "capacity"
					? "Chitchat has too many live views open. Reload the page."
					: "Chitchat stopped reading its data. Reload the page to try again.";
}
function Oz(e) {
	return `--bonobo-${e.replace(/[A-Z]/gu, (n) => `-${n.toLowerCase()}`)}`;
}
var Pd = 8,
	Nz = 2e3;
function kz(e) {
	const { client: n } = e,
		r = n.context.userId,
		u = _z(n),
		[s, o] = (0, w.useState)([]),
		[f, h] = (0, w.useState)([]),
		[m, v] = (0, w.useState)({}),
		[g, _] = (0, w.useState)(!1),
		[b, p] = (0, w.useState)(null),
		[E, x] = (0, w.useState)(!1),
		[O, z] = (0, w.useState)(null),
		[D, A] = (0, w.useState)([]),
		[C, k] = (0, w.useState)(!1),
		[F, Q] = (0, w.useState)({}),
		[j, q] = (0, w.useState)(null),
		[G, B] = (0, w.useState)(null),
		[oe, ee] = (0, w.useState)(null),
		[Y, ae] = (0, w.useState)(!1),
		[R, $] = (0, w.useState)(null),
		[H, se] = (0, w.useState)(!1),
		[me, Re] = (0, w.useState)(null),
		[N, X] = (0, w.useState)(!1),
		[re, de] = (0, w.useState)({ sequence: 0, text: "" }),
		[ge, _e] = (0, w.useState)(""),
		[we, Je] = (0, w.useState)(!1),
		De = (0, w.useRef)(null),
		Ke = (0, w.useRef)(null),
		xt = (0, w.useRef)(null),
		At = (0, w.useRef)(null),
		Yt = (0, w.useRef)(null),
		Be = (0, w.useRef)(null),
		fe = (0, w.useRef)(null),
		Ee = [...s, ...Object.values(m).flat()].sort((W, ce) => W.value.name.localeCompare(ce.value.name)),
		Ge = new Map(
			Object.values(F)
				.flat()
				.map((W) => [W.channelKey, W]),
		),
		ze = (0, w.useMemo)(() => XR({ docs: D, cursorChannels: O?.value.channels ?? {}, selfUserId: r }), [D, O, r]),
		bt = (W) => {
			if (W.key === j || W.value.archivedAt !== null) return !1;
			if (ui(W.key)) {
				const ce = W.value.lastMessageAt;
				return ce !== void 0 && ce > (Ge.get(W.key)?.at ?? 0);
			}
			return ze.has(W.key);
		},
		st = (W) => (ui(W.key) ? (Ge.get(W.key)?.at ?? 0) : (O?.value.channels[W.key] ?? 0)),
		ue = (W) => (W.key === j || W.value.archivedAt !== null ? 0 : (ze.get(W.key)?.mentionCount ?? 0)),
		xe = (0, w.useId)(),
		ct = (0, w.useId)(),
		Oe = (0, w.useCallback)((W) => {
			de((ce) => ({ sequence: ce.sequence + 1, text: W }));
		}, []);
	((0, w.useEffect)(() => {
		if (re.text === "") return;
		_e("");
		const W = requestAnimationFrame(() => _e(re.text));
		return () => cancelAnimationFrame(W);
	}, [re]),
		(0, w.useEffect)(() => {
			const W = window.matchMedia("(max-width: 719px)");
			Je(W.matches);
			const ce = (Ae) => Je(Ae.matches);
			return (W.addEventListener("change", ce), () => W.removeEventListener("change", ce));
		}, []),
		(0, w.useEffect)(() => {
			const W = (Ae) => {
					const Se = document.documentElement;
					Se.classList.toggle("theme-light", Ae.mode === "light");
					for (const [Fe, ft] of Object.entries(Ae.tokens)) Se.style.setProperty(Oz(Fe), ft);
				},
				ce = n.theme.current();
			return (ce !== null && W(ce), n.theme.subscribe(W));
		}, [n]),
		(0, w.useEffect)(() => {
			const W = yo(I0);
			return n.data.watch({ collection: "channels", limit: 100 }, (ce, Ae) => {
				if (ce === null) {
					p({ ...(Ae?.reason === void 0 ? {} : { reason: Ae.reason }) });
					return;
				}
				(o(W.apply_window(ce.docs)), _(!0), x(ce.truncated));
			});
		}, [n]),
		(0, w.useEffect)(
			() =>
				n.scopes.watchMine((W) => {
					h(W ?? []);
				}),
			[n],
		),
		(0, w.useEffect)(() => {
			const W = f.slice(0, Pd).map((ce) => {
				const Ae = yo(I0);
				return n.data.watch({ collection: "channels", keyPrefix: ce.keyPrefix, limit: 100 }, (Se) => {
					const Fe =
						Se === null
							? []
							: Se.docs.filter((ft) => {
									const sn = ft.key;
									return !(typeof sn == "string" && xb(sn) !== null);
								});
					(v((ft) => {
						if (Se === null) {
							const { [ce.scopeId]: sn, ...Rt } = ft;
							return Rt;
						}
						return { ...ft, [ce.scopeId]: Ae.apply_window(Fe) };
					}),
						Q((ft) => {
							if (Se === null) {
								const { [ce.scopeId]: Rt, ...ti } = ft;
								return ti;
							}
							const sn = Se.docs.map(FR).filter((Rt) => Rt !== null && Rt.createdBy === r);
							return { ...ft, [ce.scopeId]: sn };
						}));
				});
			});
			return () => {
				for (const ce of W) ce();
			};
		}, [n, f, r]),
		(0, w.useEffect)(
			() =>
				n.data.watch({ collection: "cursors", keyPrefix: B0(r), limit: 1 }, (W) => {
					if (W === null) {
						(z(null), (At.current = null));
						return;
					}
					const ce = W.docs.map(GR).find((Ae) => Ae !== null) ?? null;
					(z(ce), (At.current = ce));
				}),
			[n, r],
		),
		(0, w.useEffect)(() => {
			const W = yo(Oo);
			return n.data.watchRecent({ collection: "messages", limit: 100, order: "desc" }, (ce) => {
				if (ce === null) {
					(k(!0), A([]));
					return;
				}
				(k(!1), A(W.apply_window(ce.docs)));
			});
		}, [n]),
		(0, w.useEffect)(() => {
			if (j === null) {
				const W = Ee.find((ce) => ce.value.archivedAt === null);
				W !== void 0 && q((ce) => ce ?? W.key);
			}
		}, [Ee, j]),
		(0, w.useEffect)(() => {
			N && De.current?.focus();
		}, [N]));
	const Ct = () => window.matchMedia("(max-width: 719px)").matches,
		Kt = (W, ce) => {
			const Ae = At.current,
				Se = Ae?.value.channels ?? {};
			if ((Se[W] ?? 0) >= ce) return;
			const Fe = { channels: { ...Se, [W]: ce } },
				ft = Ae?.revision ?? 0,
				sn = (Rt, ti) => {
					const Cn = Date.now(),
						_t = {
							key: B0(r),
							value: ti,
							revision: Rt,
							createdBy: r,
							updatedBy: r,
							createdAt: Ae?.createdAt ?? Cn,
							updatedAt: Cn,
							timestamp: Ae?.timestamp ?? Cn,
						};
					((At.current = _t), z(_t));
				};
			n.data
				.putOwned({ collection: "cursors", key: "me", value: Fe, expectedRevision: ft })
				.then((Rt) => {
					if ("_yay" in Rt) {
						sn(Rt._yay.revision, Fe);
						return;
					}
					if (Rt._nay.name === "conflict") {
						const _t = At.current;
						if (_t !== null && _t.revision !== ft) {
							const Ur = V0(_t.value, Fe);
							n.data
								.putOwned({ collection: "cursors", key: "me", value: Ur, expectedRevision: _t.revision })
								.then((ar) => {
									"_yay" in ar && sn(ar._yay.revision, Ur);
								})
								.catch(() => {});
							return;
						}
						Yt.current = { channels: Fe.channels, attemptedRevision: ft };
						return;
					}
					const ti = new Set(Ee.map((_t) => _t.key)),
						Cn = Object.fromEntries(Object.entries(Fe.channels).filter(([_t]) => _t === W || ti.has(_t)));
					if (Object.keys(Cn).length === Object.keys(Fe.channels).length) {
						console.warn("[chitchat] A read-cursor write was refused", { message: Rt._nay.message });
						return;
					}
					n.data
						.putOwned({ collection: "cursors", key: "me", value: { channels: Cn }, expectedRevision: ft })
						.then((_t) => {
							"_yay" in _t
								? sn(_t._yay.revision, { channels: Cn })
								: console.warn("[chitchat] A read-cursor write was refused", { message: _t._nay.message });
						})
						.catch(() => {});
				})
				.catch((Rt) => {
					console.warn("[chitchat] A read-cursor write failed", { message: Xn(Rt) });
				});
		},
		vt = (W, ce) => {
			const Ae = Ge.get(W.key);
			(Ae?.at ?? 0) >= ce ||
				n.data
					.putOwned({ collection: "channels", key: jR(W.key), value: { at: ce }, expectedRevision: Ae?.revision ?? 0 })
					.then((Se) => {
						"_nay" in Se &&
							Se._nay.name !== "conflict" &&
							console.warn("[chitchat] A private read-cursor write was refused", { message: Se._nay.message });
					})
					.catch((Se) => {
						console.warn("[chitchat] A private read-cursor write failed", { message: Xn(Se) });
					});
		},
		jt = (W, ce) => {
			ui(W.key) ? vt(W, ce) : Kt(W.key, ce);
		},
		ba = (W, ce) => {
			const Ae = fe.current;
			((fe.current =
				Ae !== null && Ae.channel.key === W.key ? { channel: W, at: Math.max(Ae.at, ce) } : { channel: W, at: ce }),
				Be.current === null &&
					(Be.current = setTimeout(() => {
						Be.current = null;
						const Se = fe.current;
						((fe.current = null), Se !== null && jt(Se.channel, Se.at));
					}, Nz)));
		},
		ci = (W) => {
			(q(W.key),
				ee(null),
				bt(W) || ue(W) > 0 ? (B(st(W)), jt(W, Date.now())) : B(null),
				Oe(`#${W.value.name}`),
				N && Ct() && (X(!1), Ke.current?.focus()));
		},
		qn = (W) => {
			(q(W.key), ee(null), Oe(W.name), N && Ct() && (X(!1), Ke.current?.focus()));
		},
		xi = (W, ce) => {
			(ci(W), ee(ce));
		};
	((0, w.useEffect)(() => {
		const W = Yt.current;
		if (W === null || O === null || O.revision === W.attemptedRevision) return;
		Yt.current = null;
		const ce = V0(O.value, { channels: W.channels });
		n.data
			.putOwned({ collection: "cursors", key: "me", value: ce, expectedRevision: O.revision })
			.then((Ae) => {
				"_nay" in Ae &&
					Ae._nay.name !== "conflict" &&
					console.warn("[chitchat] The read-cursor retry was refused", { message: Ae._nay.message });
			})
			.catch(() => {});
	}, [O, n]),
		(0, w.useEffect)(
			() => () => {
				Be.current !== null && clearTimeout(Be.current);
			},
			[],
		));
	const vn = () => {
			($(null), se(!1), Re(null));
		},
		Wt = (W, ce, Ae) => {
			(se(!0), Re(null));
			const Se = MR(Ae.isPrivate ? "private" : "public");
			(async () => {
				if (Ae.isPrivate) {
					const ft = await n.scopes.create({ scopeId: Se, collections: kR, keyPrefix: Se });
					if ("_nay" in ft) {
						(se(!1), Re(ft._nay.message));
						return;
					}
					for (const sn of Ae.userIds) {
						const Rt = await n.scopes.setPrincipal({ scopeId: Se, userId: sn, level: "member" });
						if ("_nay" in Rt) {
							(se(!1), Re(Rt._nay.message));
							return;
						}
					}
				}
				const Fe = await n.data.put({
					collection: "channels",
					key: Se,
					value: { name: W, archivedAt: null, ...(ce === "" ? {} : { topic: ce }) },
				});
				if ("_nay" in Fe) {
					(se(!1), Re(Fe._nay.message));
					return;
				}
				(q(Se), B(null), vn());
			})().catch((Fe) => {
				(se(!1), Re(Xn(Fe)));
			});
		},
		cn = (W, ce) => {
			(se(!0),
				Re(null),
				n.data
					.put({ collection: "channels", key: W.key, value: ce, expectedRevision: W.revision })
					.then((Ae) => {
						if ("_nay" in Ae) {
							(se(!1),
								Re(
									Ae._nay.name === "conflict"
										? "Someone else changed this channel while the dialog was open. Close it and try again."
										: Ae._nay.message,
								));
							return;
						}
						vn();
					})
					.catch((Ae) => {
						(se(!1), Re(Xn(Ae)));
					}));
		},
		Lt = (W) => {
			n.data
				.put({
					collection: "channels",
					key: W.key,
					value: { ...W.value, archivedAt: null },
					expectedRevision: W.revision,
				})
				.then((ce) => {
					"_nay" in ce && Oe(ce._nay.message);
				})
				.catch((ce) => {
					Oe(Xn(ce));
				});
		};
	if (b !== null)
		return (0, S.jsx)("div", {
			className: "chitchat",
			children: (0, S.jsxs)("div", {
				className: "page-dead",
				role: "alert",
				children: [(0, S.jsx)("h1", { children: "Chitchat" }), (0, S.jsx)("p", { children: Rz(b.reason) })],
			}),
		});
	const ei = (W, ce) => W.value.name.localeCompare(ce.value.name),
		fi = Ee.filter((W) => W.value.archivedAt === null).sort(ei),
		Ai = Ee.filter((W) => W.value.archivedAt !== null).sort(ei),
		gn = Ee.find((W) => W.key === j) ?? null,
		di = fi.filter(bt).length,
		hi = fi.reduce((W, ce) => W + ue(ce), 0),
		fn = Math.max(0, f.length - Pd),
		Un = (W, ce, Ae) =>
			ce.length === 0
				? null
				: (0, S.jsxs)("div", {
						className: "channel-section",
						children: [
							(0, S.jsx)("h2", { id: Ae, className: "channel-section-title", children: W }),
							(0, S.jsx)("ul", {
								className: "channel-list",
								"aria-labelledby": Ae,
								children: ce.map((Se) => {
									const Fe = bt(Se),
										ft = ue(Se);
									return (0, S.jsxs)(
										"li",
										{
											className: "channel-item",
											children: [
												(0, S.jsxs)("button", {
													type: "button",
													className: Fe || ft > 0 ? "channel-link is-unread" : "channel-link",
													"aria-current": Se.key === j ? "page" : void 0,
													onClick: () => ci(Se),
													children: [
														(0, S.jsx)("span", {
															className: "channel-initial",
															"aria-hidden": "true",
															children: Se.value.name.slice(0, 1).toUpperCase(),
														}),
														(0, S.jsxs)("span", {
															className: "channel-name",
															children: [
																"#",
																Se.value.name,
																ui(Se.key) ? " (private)" : "",
																Se.value.archivedAt !== null ? " (archived)" : "",
															],
														}),
														ft > 0
															? (0, S.jsxs)("span", {
																	className: "mention-badge",
																	children: [
																		ft,
																		(0, S.jsx)("span", { className: "visually-hidden", children: " unread mentions" }),
																	],
																})
															: Fe
																? (0, S.jsxs)(S.Fragment, {
																		children: [
																			(0, S.jsx)("span", { className: "unread-dot", "aria-hidden": "true" }),
																			(0, S.jsx)("span", { className: "visually-hidden", children: "unread" }),
																		],
																	})
																: null,
													],
												}),
												(0, S.jsx)("span", {
													className: "channel-item-actions",
													children: (0, S.jsx)(pz, {
														channelName: Se.value.name,
														items: [
															...(ui(Se.key)
																? [
																		{
																			id: "people",
																			label: `People in #${Se.value.name}`,
																			onSelect: () => $({ kind: "people", channel: Se }),
																		},
																	]
																: []),
															{
																id: "rename",
																label: `Rename #${Se.value.name}`,
																onSelect: () => $({ kind: "rename", channel: Se }),
															},
															Se.value.archivedAt === null
																? {
																		id: "archive",
																		label: `Archive #${Se.value.name}`,
																		onSelect: () => $({ kind: "archive", channel: Se }),
																	}
																: { id: "unarchive", label: `Unarchive #${Se.value.name}`, onSelect: () => Lt(Se) },
														],
													}),
												}),
											],
										},
										Se.key,
									);
								}),
							}),
						],
					});
	return (0, S.jsxs)("div", {
		className: oe === null ? "chitchat" : "chitchat has-thread",
		children: [
			(0, S.jsxs)("header", {
				className: "app-bar",
				children: [
					(0, S.jsx)("h1", { className: "visually-hidden", children: "Chitchat" }),
					(0, S.jsx)("button", {
						ref: Ke,
						type: "button",
						className: "button drawer-toggle",
						"aria-expanded": N,
						onClick: () => X((W) => !W),
						children: "Channels",
					}),
				],
			}),
			(0, S.jsx)("nav", {
				ref: De,
				className: `sidebar${N ? " is-open" : ""}${Y ? " is-expanded" : ""}`,
				"aria-label": "Channels",
				tabIndex: -1,
				children: (0, S.jsxs)("div", {
					className: "sidebar-inner",
					inert: we && !N ? !0 : void 0,
					children: [
						(0, S.jsxs)("div", {
							className: "sidebar-head",
							children: [
								(0, S.jsx)("p", { className: "sidebar-title", children: "Chitchat" }),
								(0, S.jsx)("button", {
									ref: xt,
									type: "button",
									className: "button sidebar-expand",
									"aria-expanded": Y,
									"aria-label": Y ? "Collapse channel rail" : "Expand channel rail",
									onClick: () => ae((W) => !W),
									children: Y ? "«" : "»",
								}),
								(0, S.jsx)("button", {
									type: "button",
									className: "button sidebar-create",
									onClick: () => $({ kind: "create" }),
									children: "Create channel",
								}),
							],
						}),
						E
							? (0, S.jsx)("div", {
									className: "channel-status",
									role: "status",
									children: "Only the first 100 channels are shown.",
								})
							: null,
						fn > 0
							? (0, S.jsx)("div", {
									className: "channel-status",
									role: "status",
									children: `This page can watch ${Pd} private channels at a time; ${fn} more ${fn === 1 ? "is" : "are"} hidden.`,
								})
							: null,
						(0, S.jsx)("ul", {
							className: "view-list",
							"aria-label": "Views",
							children: Tz.map((W) =>
								(0, S.jsx)(
									"li",
									{
										className: "view-item",
										children: (0, S.jsxs)("button", {
											type: "button",
											className:
												W.key === "view:unreads" && (di > 0 || hi > 0)
													? "channel-link view-link is-unread"
													: "channel-link view-link",
											"aria-current": j === W.key ? "page" : void 0,
											onClick: () => qn(W),
											children: [
												(0, S.jsx)("span", {
													className: "channel-initial",
													"aria-hidden": "true",
													children: W.name.slice(0, 1),
												}),
												(0, S.jsx)("span", { className: "channel-name", children: W.name }),
												W.key === "view:unreads" && hi > 0
													? (0, S.jsxs)("span", {
															className: "mention-badge",
															children: [
																hi,
																(0, S.jsx)("span", { className: "visually-hidden", children: " mentions of you" }),
															],
														})
													: W.key === "view:unreads" && di > 0
														? (0, S.jsxs)(S.Fragment, {
																children: [
																	(0, S.jsx)("span", { className: "unread-dot", "aria-hidden": "true" }),
																	(0, S.jsx)("span", { className: "visually-hidden", children: "unread" }),
																],
															})
														: null,
											],
										}),
									},
									W.key,
								),
							),
						}),
						g
							? Ee.length === 0
								? (0, S.jsx)("div", { className: "channel-status", children: "No channels yet" })
								: (0, S.jsxs)(S.Fragment, { children: [Un("Channels", fi, xe), Un("Archived", Ai, ct)] })
							: (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading channels…" }),
					],
				}),
			}),
			(0, S.jsx)("main", {
				className: "main",
				children:
					j === "view:unreads"
						? (0, S.jsx)(xz, {
								channels: fi,
								publicUnreads: ze,
								privateCursors: Ge,
								recentDead: C,
								memberNames: u,
								onSelectChannel: ci,
							})
						: j === "view:threads"
							? (0, S.jsx)(Cz, { client: n, channels: fi, memberNames: u, onOpenThread: xi })
							: j === "view:activity"
								? (0, S.jsx)(Az, {
										feed: D,
										channels: fi,
										selfUserId: r,
										recentDead: C,
										memberNames: u,
										onSelectChannel: ci,
									})
								: gn !== null
									? (0, S.jsx)(
											LM,
											{
												client: n,
												userId: r,
												channel: gn,
												memberNames: u,
												announce: Oe,
												threadRootKey: oe,
												setThreadRootKey: ee,
												isNarrow: we,
												onNewestVisible: (W) => ba(gn, W),
												openedAtLastReadAt: G,
											},
											gn.key,
										)
									: g
										? Ee.length === 0
											? (0, S.jsx)("div", {
													className: "channel-status",
													children: (0, S.jsx)("span", { children: "No channels yet — create the first one." }),
												})
											: (0, S.jsx)("div", { className: "channel-status", children: "Select a channel." })
										: (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading channels…" }),
			}),
			R !== null && R.kind === "create"
				? (0, S.jsx)(kp, {
						title: "Create channel",
						submitLabel: "Create",
						initialName: "",
						initialTopic: "",
						privacy: { client: n, selfUserId: r },
						busy: H,
						error: me,
						onSubmit: Wt,
						onClose: vn,
					})
				: null,
			R !== null && R.kind === "people"
				? (0, S.jsx)(wz, { client: n, channel: R.channel, selfUserId: r, memberNames: u, onClose: vn })
				: null,
			R !== null && R.kind === "rename"
				? (0, S.jsx)(kp, {
						title: `Rename #${R.channel.value.name}`,
						submitLabel: "Rename",
						initialName: R.channel.value.name,
						initialTopic: R.channel.value.topic ?? "",
						privacy: null,
						busy: H,
						error: me,
						onSubmit: (W, ce) =>
							cn(R.channel, { ...R.channel.value, name: W, ...(ce === "" ? { topic: void 0 } : { topic: ce }) }),
						onClose: vn,
					})
				: null,
			R !== null && R.kind === "archive"
				? (0, S.jsx)(Ez, {
						channelName: R.channel.value.name,
						busy: H,
						error: me,
						onConfirm: () => cn(R.channel, { ...R.channel.value, archivedAt: Date.now() }),
						onClose: vn,
					})
				: null,
			(0, S.jsxs)("div", {
				className: "chitchat-announcer visually-hidden",
				role: "status",
				"aria-live": "polite",
				children: [(0, S.jsx)("span", { "data-announcement-sequence": String(re.sequence) }), ge],
			}),
		],
	});
}
function F_(e) {
	return (0, S.jsx)("div", {
		className: e.isError ? "boot-screen is-error" : "boot-screen",
		role: e.isError ? "alert" : "status",
		"aria-live": e.isError ? void 0 : "polite",
		children: e.message,
	});
}
var X_ = document.getElementById("root");
if (!X_) throw new Error("index.html is missing the #root element");
var vh = (0, RR.createRoot)(X_);
vh.render((0, S.jsx)(F_, { message: "Connecting…" }));
UE().then(
	(e) => {
		(e.context.kind === "page" && (document.title = e.context.pageTitle), vh.render((0, S.jsx)(kz, { client: e })));
	},
	(e) => {
		vh.render((0, S.jsx)(F_, { message: e instanceof Error ? e.message : String(e), isError: !0 }));
	},
);
