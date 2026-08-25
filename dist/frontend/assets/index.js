var Ww = Object.create,
	kp = Object.defineProperty,
	e1 = Object.getOwnPropertyDescriptor,
	t1 = Object.getOwnPropertyNames,
	n1 = Object.getPrototypeOf,
	i1 = Object.prototype.hasOwnProperty,
	Jn = (e, n) => () => (n || (e((n = { exports: {} }).exports, n), (e = null)), n.exports),
	r1 = (e, n, r, u) => {
		if ((n && typeof n == "object") || typeof n == "function")
			for (var s = t1(n), o = 0, f = s.length, h; o < f; o++)
				((h = s[o]),
					!i1.call(e, h) &&
						h !== r &&
						kp(e, h, { get: ((m) => n[m]).bind(null, h), enumerable: !(u = e1(n, h)) || u.enumerable }));
		return e;
	},
	Mp = (e, n, r) => (
		(r = e != null ? Ww(n1(e)) : {}),
		r1(n || !e || !e.__esModule ? kp(r, "default", { value: e, enumerable: !0 }) : r, e)
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
var Qy = "1.44.0",
	yi = [],
	Fn = [],
	a1 = Uint8Array,
	md = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var eu = 0, u1 = md.length; eu < u1; ++eu) ((yi[eu] = md[eu]), (Fn[md.charCodeAt(eu)] = eu));
Fn[45] = 62;
Fn[95] = 63;
function l1(e) {
	var n = e.length;
	if (n % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
	var r = e.indexOf("=");
	r === -1 && (r = n);
	var u = r === n ? 0 : 4 - (r % 4);
	return [r, u];
}
function s1(e, n, r) {
	return ((n + r) * 3) / 4 - r;
}
function yl(e) {
	var n,
		r = l1(e),
		u = r[0],
		s = r[1],
		o = new a1(s1(e, u, s)),
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
function o1(e) {
	return yi[(e >> 18) & 63] + yi[(e >> 12) & 63] + yi[(e >> 6) & 63] + yi[e & 63];
}
function c1(e, n, r) {
	for (var u, s = [], o = n; o < r; o += 3)
		((u = ((e[o] << 16) & 16711680) + ((e[o + 1] << 8) & 65280) + (e[o + 2] & 255)), s.push(o1(u)));
	return s.join("");
}
function pl(e) {
	for (var n, r = e.length, u = r % 3, s = [], o = 16383, f = 0, h = r - u; f < h; f += o)
		s.push(c1(e, f, f + o > h ? h : f + o));
	return (
		u === 1
			? ((n = e[r - 1]), s.push(yi[n >> 2] + yi[(n << 4) & 63] + "=="))
			: u === 2 &&
				((n = (e[r - 2] << 8) + e[r - 1]), s.push(yi[n >> 10] + yi[(n >> 4) & 63] + yi[(n << 2) & 63] + "=")),
		s.join("")
	);
}
function Cr(e) {
	if (e === void 0) return {};
	if (!Dp(e)) throw new Error(`The arguments to a Convex function must be an object. Received: ${e}`);
	return e;
}
function zp(e) {
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
function Dp(e) {
	const n = typeof e == "object",
		r = Object.getPrototypeOf(e),
		u = r === null || r === Object.prototype || r?.constructor?.name === "Object";
	return n && u;
}
var jp = !0,
	du = BigInt("-9223372036854775808"),
	hh = BigInt("9223372036854775807"),
	Zd = BigInt("0"),
	f1 = BigInt("8"),
	d1 = BigInt("256"),
	vd =
		"This commit timestamp is unresolved: its value is assigned when the mutation commits. Read the document after the mutation completes to get its value.",
	Lp = class {
		[Symbol.toPrimitive](e) {
			if (e === "string") return this.toString();
			throw new Error(vd);
		}
		valueOf() {
			throw new Error(vd);
		}
		toJSON() {
			throw new Error(vd);
		}
		toString() {
			return "[unresolved commit timestamp]";
		}
	},
	h1 = new Lp();
function qp(e) {
	return Number.isNaN(e) || !Number.isFinite(e) || Object.is(e, -0);
}
function m1(e) {
	e < Zd && (e -= du + du);
	let n = e.toString(16);
	n.length % 2 === 1 && (n = "0" + n);
	const r = new Uint8Array(new ArrayBuffer(8));
	let u = 0;
	for (const s of n.match(/.{2}/g).reverse()) (r.set([parseInt(s, 16)], u++), (e >>= f1));
	return pl(r);
}
function v1(e) {
	const n = yl(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	let r = Zd,
		u = Zd;
	for (const s of n) ((r += BigInt(s) * d1 ** u), u++);
	return (r > hh && (r += du + du), r);
}
function g1(e) {
	if (e < du || hh < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
	const n = new ArrayBuffer(8);
	return (new DataView(n).setBigInt64(0, e, !0), pl(new Uint8Array(n)));
}
function y1(e) {
	const n = yl(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	return new DataView(n.buffer).getBigInt64(0, !0);
}
var p1 = DataView.prototype.setBigInt64 ? g1 : m1,
	b1 = DataView.prototype.getBigInt64 ? y1 : v1,
	Ky = 1024;
function Hd(e) {
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
function hu(e) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return e;
	if (Array.isArray(e)) return e.map((u) => hu(u));
	if (typeof e != "object") throw new Error(`Unexpected type of ${e}`);
	const n = Object.entries(e);
	if (n.length === 1) {
		const u = n[0][0];
		if (u === "$bytes") {
			if (typeof e.$bytes != "string") throw new Error(`Malformed $bytes field on ${e}`);
			return yl(e.$bytes).buffer;
		}
		if (u === "$integer") {
			if (typeof e.$integer != "string") throw new Error(`Malformed $integer field on ${e}`);
			return b1(e.$integer);
		}
		if (u === "$float") {
			if (typeof e.$float != "string") throw new Error(`Malformed $float field on ${e}`);
			const s = yl(e.$float);
			if (s.byteLength !== 8) throw new Error(`Received ${s.byteLength} bytes, expected 8 for $float`);
			const o = new DataView(s.buffer).getFloat64(0, jp);
			if (!qp(o)) throw new Error(`Float ${o} should be encoded as a number`);
			return o;
		}
		if (u === "$commitTs") {
			if (e.$commitTs !== null) throw new Error(`Malformed $commitTs field on ${e}`);
			return h1;
		}
		if (u === "$set") throw new Error("Received a Set which is no longer supported as a Convex type.");
		if (u === "$map") throw new Error("Received a Map which is no longer supported as a Convex type.");
	}
	const r = {};
	for (const [u, s] of Object.entries(e)) (Hd(u), (r[u] = hu(s)));
	return r;
}
var Yy = 16384;
function su(e) {
	const n = JSON.stringify(e, (r, u) => (u === void 0 ? "undefined" : typeof u == "bigint" ? `${u.toString()}n` : u));
	if (n.length > Yy) {
		const r = "[...truncated]";
		let u = Yy - 14;
		const s = n.codePointAt(u - 1);
		return (s !== void 0 && s > 65535 && (u -= 1), n.substring(0, u) + r);
	}
	return n;
}
function yo(e, n, r, u) {
	if (e === void 0) {
		const f = r && ` (present at path ${r} in original object ${su(n)})`;
		throw new Error(
			`undefined is not a valid Convex value${f}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`,
		);
	}
	if (e === null) return e;
	if (typeof e == "bigint") {
		if (e < du || hh < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
		return { $integer: p1(e) };
	}
	if (typeof e == "number")
		if (qp(e)) {
			const f = new ArrayBuffer(8);
			return (new DataView(f).setFloat64(0, e, jp), { $float: pl(new Uint8Array(f)) });
		} else return e;
	if (typeof e == "boolean" || typeof e == "string") return e;
	if (e instanceof ArrayBuffer) return { $bytes: pl(new Uint8Array(e)) };
	if (e instanceof Lp) return { $commitTs: null };
	if (Array.isArray(e)) return e.map((f, h) => yo(f, n, r + `[${h}]`, !1));
	if (e instanceof Set) throw new Error(gd(r, "Set", [...e], n));
	if (e instanceof Map) throw new Error(gd(r, "Map", [...e], n));
	if (!Dp(e)) {
		const f = e?.constructor?.name,
			h = f ? `${f} ` : "";
		throw new Error(gd(r, h, e, n));
	}
	const s = {},
		o = Object.entries(e);
	o.sort(([f, h], [m, v]) => (f === m ? 0 : f < m ? -1 : 1));
	for (const [f, h] of o)
		h !== void 0 ? (Hd(f), (s[f] = yo(h, n, r + `.${f}`, !1))) : u && (Hd(f), (s[f] = _1(h, n, r + `.${f}`)));
	return s;
}
function gd(e, n, r, u) {
	return e
		? `${n}${su(r)} is not a supported Convex type (present at path ${e} in original object ${su(u)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
		: `${n}${su(r)} is not a supported Convex type.`;
}
function _1(e, n, r) {
	if (e === void 0) return { $undefined: null };
	if (n === void 0) throw new Error(`Programming error. Current value is ${su(e)} but original value is undefined`);
	return yo(e, n, r, !1);
}
function oa(e) {
	return yo(e, e, "", !1);
}
var S1 = Object.defineProperty,
	w1 = (e, n, r) => (n in e ? S1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	yd = (e, n, r) => w1(e, typeof n != "symbol" ? n + "" : n, r),
	Gy,
	Fy,
	E1 = Symbol.for("ConvexError"),
	Pd = class extends ((Fy = Error), (Gy = E1), Fy) {
		constructor(e) {
			(super(typeof e == "string" ? e : su(e)),
				yd(this, "name", "ConvexError"),
				yd(this, "data"),
				yd(this, Gy, !0),
				(this.data = e));
		}
	},
	T1 = Object.defineProperty,
	x1 = (e, n, r) => (n in e ? T1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Xy = (e, n, r) => x1(e, typeof n != "symbol" ? n + "" : n, r),
	A1 = "color:rgb(0, 145, 255)";
function Up(e) {
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
var $p = class {
	constructor(e) {
		(Xy(this, "_onLogLineFuncs"), Xy(this, "_verbose"), (this._onLogLineFuncs = {}), (this._verbose = e.verbose));
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
function C1(e) {
	const n = new $p(e);
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
function R1(e) {
	return new $p(e);
}
function po(e, n, r, u, s) {
	const o = Up(r);
	if ((typeof s == "object" && (s = `ConvexError ${JSON.stringify(s.errorData, null, 2)}`), n === "info")) {
		const f = s.match(/^\[.*?\] /);
		if (f === null) {
			e.error(`[CONVEX ${o}(${u})] Could not parse console.log`);
			return;
		}
		const h = s.slice(1, f[0].length - 2),
			m = s.slice(f[0].length);
		e.log(`%c[CONVEX ${o}(${u})] [${h}]`, A1, m);
	} else e.error(`[CONVEX ${o}(${u})] ${s}`);
}
function O1(e, n) {
	const r = `[CONVEX FATAL ERROR] ${n}`;
	return (e.error(r), new Error(r));
}
function ru(e, n, r) {
	return `[CONVEX ${Up(e)}(${n})] ${r.errorMessage}
  Called by client`;
}
function Qd(e, n) {
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
function Jy(e, n, r) {
	const { initialNumItems: u, id: s } = r;
	return JSON.stringify({ type: "paginated", udfPath: ca(e), args: oa(n), options: oa({ initialNumItems: u, id: s }) });
}
function N1(e) {
	return JSON.parse(e).type === "paginated";
}
var k1 = Object.defineProperty,
	M1 = (e, n, r) => (n in e ? k1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	gi = (e, n, r) => M1(e, typeof n != "symbol" ? n + "" : n, r),
	z1 = class {
		constructor() {
			(gi(this, "nextQueryId"),
				gi(this, "querySetVersion"),
				gi(this, "querySet"),
				gi(this, "queryIdToToken"),
				gi(this, "identityVersion"),
				gi(this, "auth"),
				gi(this, "outstandingQueriesOlderThanRestart"),
				gi(this, "outstandingAuthOlderThanRestart"),
				gi(this, "paused"),
				gi(this, "pendingQuerySetModifications"),
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
	D1 = Object.defineProperty,
	j1 = (e, n, r) => (n in e ? D1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Ws = (e, n, r) => j1(e, typeof n != "symbol" ? n + "" : n, r),
	L1 = class {
		constructor(e, n) {
			((this.logger = e),
				(this.markConnectionStateDirty = n),
				Ws(this, "inflightRequests"),
				Ws(this, "requestsOlderThanRestart"),
				Ws(this, "inflightMutationsCount", 0),
				Ws(this, "inflightActionsCount", 0),
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
			for (const h of e.logLines) po(this.logger, "info", r, u, h);
			const s = n.status;
			let o, f;
			if (e.success) ((o = { success: !0, logLines: e.logLines, value: hu(e.result) }), (f = () => s.onResult(o)));
			else {
				const h = e.result,
					{ errorData: m } = e;
				(po(this.logger, "error", r, u, h),
					(o = { success: !1, errorMessage: h, errorData: m !== void 0 ? hu(m) : void 0, logLines: e.logLines }),
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
	bo = Symbol.for("functionName"),
	q1 = Symbol.for("toReferencePath");
function U1(e) {
	return e[q1] ?? null;
}
function $1(e) {
	return e.startsWith("function://");
}
function B1(e) {
	let n;
	if (typeof e == "string") $1(e) ? (n = { functionHandle: e }) : (n = { name: e });
	else if (e[bo]) n = { name: e[bo] };
	else {
		const r = U1(e);
		if (!r) throw new Error(`${e} is not a functionReference`);
		n = { reference: r };
	}
	return n;
}
function Ki(e) {
	const n = B1(e);
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
	const r = e[bo];
	if (!r) throw new Error(`${e} is not a functionReference`);
	return r;
}
function Bp(e = []) {
	return new Proxy(
		{},
		{
			get(n, r) {
				if (typeof r == "string") return Bp([...e, r]);
				if (r === bo) {
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
var jn = Bp(),
	I1 = Object.defineProperty,
	V1 = (e, n, r) => (n in e ? I1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	_o = (e, n, r) => V1(e, typeof n != "symbol" ? n + "" : n, r),
	Wy = class Kd {
		constructor(n) {
			(_o(this, "queryResults"), _o(this, "modifiedQueries"), (this.queryResults = n), (this.modifiedQueries = []));
		}
		getQuery(n, ...r) {
			const u = Cr(r[0]),
				s = Ki(n),
				o = this.queryResults.get(sa(s, u));
			if (o !== void 0) return Kd.queryValue(o.result);
		}
		getAllQueries(n) {
			const r = [],
				u = Ki(n);
			for (const s of this.queryResults.values())
				s.udfPath === ca(u) && r.push({ args: s.args, value: Kd.queryValue(s.result) });
			return r;
		}
		setQuery(n, r, u) {
			const s = Cr(r),
				o = Ki(n),
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
	Z1 = class {
		constructor() {
			(_o(this, "queryResults"),
				_o(this, "optimisticUpdates"),
				(this.queryResults = new Map()),
				(this.optimisticUpdates = []));
		}
		ingestQueryResultsFromServer(e, n) {
			this.optimisticUpdates = this.optimisticUpdates.filter((o) => !n.has(o.mutationId));
			const r = this.queryResults;
			this.queryResults = new Map(e);
			const u = new Wy(this.queryResults);
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
			const r = new Wy(this.queryResults);
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
				throw r.errorData !== void 0 ? Qd(r, new Pd(ru("query", n.udfPath, r))) : new Error(ru("query", n.udfPath, r));
			}
		}
		hasQueryResult(e) {
			return this.queryResults.get(e) !== void 0;
		}
		queryLogs(e) {
			return this.queryResults.get(e)?.result?.logLines;
		}
	},
	H1 = Object.defineProperty,
	P1 = (e, n, r) => (n in e ? H1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	pd = (e, n, r) => P1(e, typeof n != "symbol" ? n + "" : n, r),
	El = class Pi {
		constructor(n, r) {
			(pd(this, "low"),
				pd(this, "high"),
				pd(this, "__isUnsignedLong__"),
				(this.low = n | 0),
				(this.high = r | 0),
				(this.__isUnsignedLong__ = !0));
		}
		static isLong(n) {
			return (n && n.__isUnsignedLong__) === !0;
		}
		static fromBytesLE(n) {
			return new Pi(n[0] | (n[1] << 8) | (n[2] << 16) | (n[3] << 24), n[4] | (n[5] << 8) | (n[6] << 16) | (n[7] << 24));
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
			return isNaN(n) || n < 0 ? e0 : n >= Q1 ? K1 : new Pi((n % ml) | 0, (n / ml) | 0);
		}
		toString() {
			return (BigInt(this.high) * BigInt(ml) + BigInt(this.low)).toString();
		}
		equals(n) {
			return (
				Pi.isLong(n) || (n = Pi.fromValue(n)),
				this.high >>> 31 === 1 && n.high >>> 31 === 1 ? !1 : this.high === n.high && this.low === n.low
			);
		}
		notEquals(n) {
			return !this.equals(n);
		}
		comp(n) {
			return (
				Pi.isLong(n) || (n = Pi.fromValue(n)),
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
			return typeof n == "number" ? Pi.fromNumber(n) : new Pi(n.low, n.high);
		}
	},
	e0 = new El(0, 0),
	t0 = 65536,
	ml = t0 * t0,
	Q1 = ml * ml,
	K1 = new El(-1, -1),
	Y1 = Object.defineProperty,
	G1 = (e, n, r) => (n in e ? Y1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	eo = (e, n, r) => G1(e, typeof n != "symbol" ? n + "" : n, r),
	n0 = class {
		constructor(e, n) {
			(eo(this, "version"),
				eo(this, "remoteQuerySet"),
				eo(this, "queryPath"),
				eo(this, "logger"),
				(this.version = { querySet: 0, ts: El.fromNumber(0), identity: 0 }),
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
						if (u) for (const o of r.logLines) po(this.logger, "info", "query", u, o);
						const s = hu(r.value ?? null);
						this.remoteQuerySet.set(r.queryId, { success: !0, value: s, logLines: r.logLines });
						break;
					}
					case "QueryFailed": {
						const u = this.queryPath(r.queryId);
						if (u) for (const o of r.logLines) po(this.logger, "info", "query", u, o);
						const { errorData: s } = r;
						this.remoteQuerySet.set(r.queryId, {
							success: !1,
							errorMessage: r.errorMessage,
							errorData: s !== void 0 ? hu(s) : void 0,
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
function bd(e) {
	const n = yl(e);
	return El.fromBytesLE(Array.from(n));
}
function F1(e) {
	const n = new Uint8Array(e.toBytesLE());
	return pl(n);
}
function i0(e) {
	switch (e.type) {
		case "FatalError":
		case "AuthError":
		case "ActionResponse":
		case "TransitionChunk":
		case "Ping":
			return { ...e };
		case "MutationResponse":
			return e.success ? { ...e, ts: bd(e.ts) } : { ...e };
		case "Transition":
			return {
				...e,
				startVersion: { ...e.startVersion, ts: bd(e.startVersion.ts) },
				endVersion: { ...e.endVersion, ts: bd(e.endVersion.ts) },
			};
		default:
	}
}
function X1(e) {
	switch (e.type) {
		case "Authenticate":
		case "ModifyQuerySet":
		case "Mutation":
		case "Action":
		case "Event":
			return { ...e };
		case "Connect":
			return e.maxObservedTimestamp !== void 0
				? { ...e, maxObservedTimestamp: F1(e.maxObservedTimestamp) }
				: { ...e, maxObservedTimestamp: void 0 };
		default:
	}
}
var J1 = Object.defineProperty,
	W1 = (e, n, r) => (n in e ? J1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	It = (e, n, r) => W1(e, typeof n != "symbol" ? n + "" : n, r),
	eE = 1e3,
	tE = 1001,
	nE = 1005,
	iE = 4040,
	ho;
function iu() {
	return (
		ho === void 0 && (ho = Date.now()),
		typeof performance > "u" || !performance.now ? Date.now() : Math.round(ho + performance.now())
	);
}
function r0() {
	return `t=${Math.round((iu() - ho) / 100) / 10}s`;
}
var Ip = {
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
function rE(e) {
	if (e === void 0) return "Unknown";
	for (const n of Object.keys(Ip)) if (e.startsWith(n)) return n;
	return "Unknown";
}
var aE = class {
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
			const r = i0(JSON.parse(n));
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
							clientTs: iu(),
						})),
					this.lastCloseReason !== "InitialConnect" &&
						(this.lastCloseReason
							? this.logger.log("WebSocket reconnected at", r0(), "after disconnect due to", this.lastCloseReason)
							: this.logger.log("WebSocket reconnected at", r0())),
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
				let u = i0(JSON.parse(n.data));
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
					n.code !== eE && n.code !== tE && n.code !== nE && n.code !== iE)
				) {
					let u = `WebSocket closed with code ${n.code}`;
					(n.reason && (u += `: ${n.reason}`),
						this.logger.log(u),
						this.onServerDisconnectError && n.reason && this.onServerDisconnectError(u));
				}
				const r = rE(n.reason);
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
			const r = X1(e),
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
		const r = iu(),
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
			const n = iu() - this.scheduledReconnect.scheduledAt;
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
							clientTs: iu(),
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
			(e === "client" ? 100 : e === "Unknown" ? this.defaultInitialBackoff : Ip[e].timeout) * Math.pow(2, this.retries);
		this.retries += 1;
		const r = Math.min(n, this.maxBackoff);
		return r + r * (Math.random() - 0.5);
	}
	reportLargeTransition({ transition: e, messageLength: n }) {
		if (e.clientClockSkew === void 0 || e.serverTs === void 0) return;
		const r = iu() - e.clientClockSkew - e.serverTs / 1e6,
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
function uE() {
	return lE();
}
function lE() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
		const n = (Math.random() * 16) | 0;
		return (e === "x" ? n : (n & 3) | 8).toString(16);
	});
}
var dl = class extends Error {};
dl.prototype.name = "InvalidTokenError";
function sE(e) {
	return decodeURIComponent(
		atob(e).replace(/(.)/g, (n, r) => {
			let u = r.charCodeAt(0).toString(16).toUpperCase();
			return (u.length < 2 && (u = "0" + u), "%" + u);
		}),
	);
}
function oE(e) {
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
		return sE(n);
	} catch {
		return atob(n);
	}
}
function Vp(e, n) {
	if (typeof e != "string") throw new dl("Invalid token specified: must be a string");
	n || (n = {});
	const r = n.header === !0 ? 0 : 1,
		u = e.split(".")[r];
	if (typeof u != "string") throw new dl(`Invalid token specified: missing part #${r + 1}`);
	let s;
	try {
		s = oE(u);
	} catch (o) {
		throw new dl(`Invalid token specified: invalid base64 for part #${r + 1} (${o.message})`);
	}
	try {
		return JSON.parse(s);
	} catch (o) {
		throw new dl(`Invalid token specified: invalid json for part #${r + 1} (${o.message})`);
	}
}
var cE = Object.defineProperty,
	fE = (e, n, r) => (n in e ? cE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Tn = (e, n, r) => fE(e, typeof n != "symbol" ? n + "" : n, r),
	dE = 480 * 60 * 60 * 1e3,
	a0 = 2,
	hE = class {
		constructor(e, n, r) {
			(Tn(this, "authState", { state: "noAuth" }),
				Tn(this, "configVersion", 0),
				Tn(this, "syncState"),
				Tn(this, "authenticate"),
				Tn(this, "stopSocket"),
				Tn(this, "tryRestartSocket"),
				Tn(this, "pauseSocket"),
				Tn(this, "resumeSocket"),
				Tn(this, "clearAuth"),
				Tn(this, "logger"),
				Tn(this, "refreshTokenLeewaySeconds"),
				Tn(this, "initialAuthTokenReuse"),
				Tn(this, "lastRefreshChange"),
				Tn(this, "tokenConfirmationAttempts", 0),
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
					(this.authState.state === "waitingForServerConfirmationOfFreshToken" && this.tokenConfirmationAttempts >= a0))
			) {
				(this.logger.error(`Failed to authenticate: "${e.error}", check your server auth config`),
					this.syncState.hasAuth() && this.syncState.clearAuth(),
					this.authState.state !== "noAuth" && this.setAndReportAuthFailed(this.authState.config.onAuthChange));
				return;
			}
			if (
				(this.authState.state === "waitingForServerConfirmationOfFreshToken" &&
					(this.tokenConfirmationAttempts++,
					this._logVerbose(`retrying reauthentication, ${a0 - this.tokenConfirmationAttempts} attempts remaining`)),
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
			let h = Math.min(dE, (f - this.refreshTokenLeewaySeconds) * 1e3);
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
				return Vp(e);
			} catch (n) {
				return (this._logVerbose(`Error decoding token: ${n instanceof Error ? n.message : "Unknown error"}`), null);
			}
		}
		_logVerbose(e) {
			this.logger.logVerbose(`${e} [v${this.configVersion}]`);
		}
	},
	mE = ["convexClientConstructed", "convexWebSocketOpen", "convexFirstMessageReceived"];
function vE(e, n) {
	const r = { sessionId: n };
	typeof performance > "u" || !performance.mark || performance.mark(e, { detail: r });
}
function gE(e) {
	let n = e.name.slice(6);
	return ((n = n.charAt(0).toLowerCase() + n.slice(1)), { name: n, startTime: e.startTime });
}
function yE(e) {
	if (typeof performance > "u" || !performance.getEntriesByName) return [];
	const n = [];
	for (const r of mE) {
		const u = performance
			.getEntriesByName(r)
			.filter((s) => s.entryType === "mark")
			.filter((s) => s.detail.sessionId === e);
		n.push(...u);
	}
	return n.map(gE);
}
var pE = Object.defineProperty,
	bE = (e, n, r) => (n in e ? pE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Vt = (e, n, r) => bE(e, typeof n != "symbol" ? n + "" : n, r),
	_E = class {
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
					this.debug && vE(b, this.sessionId);
				}),
				typeof e == "object")
			)
				throw new Error(
					"Passing a ClientConfig object is no longer supported. Pass the URL of the Convex deployment as a string directly.",
				);
			(r?.skipConvexDeploymentUrlCheck !== !0 && zp(e), (r = { ...r }));
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
						? R1({ verbose: r.verbose ?? !1 })
						: r.logger !== !0 && r.logger
							? r.logger
							: C1({ verbose: r.verbose ?? !1 })));
			const o = e.search("://");
			if (o === -1) throw new Error("Provided address was not an absolute URL.");
			const f = e.substring(o + 3),
				h = e.substring(0, o);
			let m;
			if (h === "http") m = "ws";
			else if (h === "https") m = "wss";
			else throw new Error(`Unknown parent protocol ${h}`);
			const v = `${m}://${f}/api/${Qy}/sync`;
			((this.state = new z1()),
				(this.remoteQuerySet = new n0((b) => this.state.queryPath(b), this.logger)),
				(this.requestManager = new L1(this.logger, this.markConnectionStateDirty)));
			const g = () => {
				(this.webSocketManager.pause(), this.state.pause());
			};
			((this.authenticationManager = new hE(
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
				(this.optimisticQueryResults = new Z1()),
				this.addOnTransitionHandler((b) => {
					n(b.queries.map((p) => p.token));
				}),
				(this._nextRequestId = 0),
				(this._sessionId = uE()));
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
			((this.webSocketManager = new aE(
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
							(this.remoteQuerySet = new n0((x) => this.state.queryPath(x), this.logger)));
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
								const p = O1(this.logger, b.error);
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
					n = e ? Vp(e.value) : {};
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
			const u = Cr(n),
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
			const r = sa(e, Cr(n));
			return this.optimisticQueryResults.queryResult(r);
		}
		localQueryResultByToken(e) {
			return this.optimisticQueryResults.queryResult(e);
		}
		hasLocalQueryResultByToken(e) {
			return this.optimisticQueryResults.hasQueryResult(e);
		}
		localQueryLogs(e, n) {
			const r = sa(e, Cr(n));
			return this.optimisticQueryResults.queryLogs(r);
		}
		queryJournal(e, n) {
			const r = sa(e, Cr(n));
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
				throw u.errorData !== void 0 ? Qd(u, new Pd(ru("mutation", e, u))) : new Error(ru("mutation", e, u));
			return u.value;
		}
		async mutationInternal(e, n, r, u) {
			const { mutationPromise: s } = this.enqueueMutation(e, n, r, u);
			return s;
		}
		enqueueMutation(e, n, r, u) {
			const s = Cr(n);
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
			if (!r.success) throw r.errorData !== void 0 ? Qd(r, new Pd(ru("action", e, r))) : new Error(ru("action", e, r));
			return r.value;
		}
		async actionInternal(e, n, r) {
			const u = Cr(n),
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
				const e = yE(this.sessionId);
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
				headers: { "Content-Type": "application/json", "Convex-Client": `npm-${Qy}` },
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
function _d(e) {
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
var SE = Object.defineProperty,
	wE = (e, n, r) => (n in e ? SE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	u0 = (e, n, r) => wE(e, typeof n != "symbol" ? n + "" : n, r),
	EE = class {
		constructor(e, n) {
			((this.client = e),
				(this.onTransition = n),
				u0(this, "paginatedQuerySet", new Map()),
				u0(this, "lastTransitionTs"),
				(this.lastTransitionTs = El.fromNumber(0)),
				this.client.addOnTransitionHandler((r) => this.onBaseTransition(r)));
		}
		subscribe(e, n, r) {
			const u = ca(e),
				s = Jy(u, n, r),
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
			const u = Jy(ca(e), n, r);
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
				const v = _d(m);
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
			const s = _d(u);
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
					const g = _d(v);
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
	TE = Object.defineProperty,
	xE = (e, n, r) => (n in e ? TE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	tu = (e, n, r) => xE(e, typeof n != "symbol" ? n + "" : n, r),
	l0,
	AE = class {
		constructor(e, n = {}) {
			(tu(this, "listeners"),
				tu(this, "_client"),
				tu(this, "_paginatedClient"),
				tu(this, "callNewListenersWithCurrentValuesTimer"),
				tu(this, "_closed"),
				tu(this, "_disabled"),
				n.skipConvexDeploymentUrlCheck !== !0 && zp(e));
			const { disabled: r, ...u } = n;
			((this._closed = !1),
				(this._disabled = !!r),
				l0 && !("webSocketConstructor" in u) && typeof WebSocket > "u" && (u.webSocketConstructor = l0),
				typeof window > "u" && !("unsavedChangesWarning" in u) && (u.unsavedChangesWarning = !1),
				this.disabled ||
					((this._client = new _E(e, () => {}, u)),
					(this._paginatedClient = new EE(this._client, (s) => this._transition(s)))),
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
			const { queryToken: s, unsubscribe: o } = this.client.subscribe(Ki(e), n),
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
				{ paginatedQueryToken: f, unsubscribe: h } = this.paginatedClient.subscribe(Ki(e), n, o),
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
					getCurrentValue: () => this.paginatedClient.localQueryResult(Ki(e), n, o),
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
					v = N1(f),
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
			return await this.client.mutation(Ki(e), n, r);
		}
		async action(e, n) {
			if (this.disabled) throw new Error("ConvexClient is disabled");
			return await this.client.action(Ki(e), n);
		}
		async query(e, n) {
			if (this.disabled) throw new Error("ConvexClient is disabled");
			const r = this.client.localQueryResult(Ki(e), n);
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
	CE = 6e4,
	RE = 500,
	OE = 1e4,
	NE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
	s0 = 128,
	o0 = 109,
	c0 = 100,
	kE = /^[\x21-\x7e]+$/,
	f0 = 100,
	d0 = 16,
	to = 6,
	h0 = 24;
function m0(e) {
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
var Yd = { reason: "denied", message: "This plugin no longer has access to its data" },
	Gd = { reason: "session_expired", message: "This plugin session expired" },
	la = { reason: "unavailable", message: "The plugin data connection is unavailable" };
function ME(e) {
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
function zE() {
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
	if (!NE.test(o)) throw new Error("Invalid host bridge nonce");
	return { parentOrigin: s, bridgeNonce: o };
}
function no(e) {
	return e.collection.length === 0 || e.collection.length > s0
		? `Collection names must be 1 to ${s0} characters`
		: e.keyPrefix !== void 0 && (e.keyPrefix.length > o0 || !kE.test(e.keyPrefix))
			? `Key prefixes must be 1 to ${o0} printable ASCII characters`
			: !Number.isInteger(e.limit) || e.limit < 1 || e.limit > c0
				? `Watch limits must be integers from 1 to ${c0}`
				: null;
}
function DE(e) {
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
				atCapacity: n.forceAtCapacity || n.intervals.length >= to || e.page_at_ceiling(),
				incomplete: n.intervals.some((k, F) =>
					k.end === null ||
					!k.truncated ||
					k.docs === null ||
					(n.pending && F >= n.pending.from && F < n.pending.from + n.pending.removeCount)
						? !1
						: o(k) === null || h() + 1 > to || e.page_at_ceiling(2),
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
			if (f() + 1 > to || e.page_at_ceiling()) {
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
					if (f() + 1 > to) break;
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
					const k = e.session_expired() ? Gd : la;
					(k === la && console.error("[bonobo-plugin-sdk] Plugin data window interval failed:", C.queryError), u(k));
					return;
				}
				if (C.value === null) {
					u(Yd);
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
function jE(e) {
	const n = new Set();
	let r = 0;
	const u = () => (r >= h0 ? !1 : ((r += 1), !0)),
		s = () => {
			r -= 1;
		},
		o = (p = 1) => r + p > h0,
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
			if (n.size >= d0 || o()) return (h(p.onUpdate), () => {});
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
							const D = e.session_expired() ? Gd : la;
							(D === la && console.error(`[bonobo-plugin-sdk] Plugin ${p.failureLabel} failed:`, z.queryError),
								O(),
								p.onUpdate(null, D));
							return;
						}
						if (z.value === null) {
							(O(), p.onUpdate(null, Yd));
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
				const x = no({
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
				const x = no({ collection: p.collection, limit: p.limit });
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
				const x = no({ collection: p.collection, limit: p.limit });
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
					O = no({
						collection: p.collection,
						...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
						limit: p.pageSize,
					});
				if (O) return (f(E, { reason: "invalid", message: O }), x);
				if (n.size >= d0 || o()) return (h(E), x);
				const z = {};
				n.add(z);
				const D = DE({
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
			return !Number.isInteger(p.limit) || p.limit < 1 || p.limit > f0
				? Promise.resolve({ _nay: { name: "invalid", message: `Member list limits must be integers from 1 to ${f0}` } })
				: Promise.resolve()
						.then(() => e.list_members(p.limit, p.cursor ?? null))
						.then((E) =>
							E === null
								? { _nay: { name: Yd.reason, message: "This plugin no longer has access to this workspace" } }
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
							const x = e.session_expired() ? Gd : la;
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
function LE(e) {
	return {
		start_watch: (r, u, s) => {
			try {
				const o = e.onUpdate(
					jn.plugins_data.watch_documents,
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
					jn.plugins_data.watch_recent,
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
					jn.plugins_data.watch_changes,
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
					return e.mutation(jn.plugins_data.user_append_document, u);
				case "put":
					return e.mutation(jn.plugins_data.user_put_document, u);
				case "remove":
					return e.mutation(jn.plugins_data.user_remove_document, u);
				case "putOwned":
					return e.mutation(jn.plugins_data.user_put_owned_document, u);
				case "removeOwned":
					return e.mutation(jn.plugins_data.user_remove_owned_document, u);
			}
		},
		resolve_member_display: (r) => e.query(jn.plugins_data.resolve_member_display, { userIds: r }),
		list_members: (r, u) => e.query(jn.plugins_data.list_members, { limit: r, cursor: u }),
		run_manage_scope: (r) => e.mutation(jn.plugins_data.user_manage_scope, { action: r }),
		list_scope_principals: (r) => e.query(jn.plugins_data.watch_scope_principals, { scopeId: r }),
		start_my_scopes_watch: (r) => {
			try {
				const u = e.onUpdate(
					jn.plugins_data.watch_my_scopes,
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
async function qE() {
	const { parentOrigin: e, bridgeNonce: n } = zE();
	let r = "",
		u = "",
		s = 0,
		o = null;
	const f = new Set(),
		h = new Map();
	let m = null;
	async function v() {
		return Date.now() >= s - CE ? g() : u;
	}
	function g() {
		if (m) return m;
		const E = crypto.randomUUID();
		return (
			(m = new Promise((x, O) => {
				const z = setTimeout(() => {
					(h.delete(E), O(new Error("Plugin frame token refresh timed out")));
				}, OE);
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
						ME(k.context)
					) {
						((x = !0),
							D(),
							window.removeEventListener("pagehide", D),
							(r = k.apiOrigin),
							(u = k.token),
							(s = k.tokenExpiresAt));
						const F = new AE(k.convexUrl, { expectAuth: !0, unsavedChangesWarning: !1 });
						(F.setAuth(p), window.addEventListener("pagehide", () => void F.close(), { once: !0 }), (o = m0(k.theme)));
						const { data: Q, members: j, scopes: q } = jE({ ...LE(F), session_expired: () => Date.now() >= s });
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
						const F = m0(k.theme);
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
			(O = setInterval(z, RE)));
	});
}
var UE = Jn((e) => {
		function n(R, $) {
			var P = R.length;
			R.push($);
			e: for (; 0 < P; ) {
				var le = (P - 1) >>> 1,
					me = R[le];
				if (0 < s(me, $)) ((R[le] = $), (R[P] = me), (P = le));
				else break e;
			}
		}
		function r(R) {
			return R.length === 0 ? null : R[0];
		}
		function u(R) {
			if (R.length === 0) return null;
			var $ = R[0],
				P = R.pop();
			if (P !== $) {
				R[0] = P;
				e: for (var le = 0, me = R.length, Re = me >>> 1; le < Re; ) {
					var N = 2 * (le + 1) - 1,
						X = R[N],
						re = N + 1,
						fe = R[re];
					if (0 > s(X, P))
						re < me && 0 > s(fe, X) ? ((R[le] = fe), (R[re] = P), (le = re)) : ((R[le] = X), (R[N] = P), (le = N));
					else if (re < me && 0 > s(fe, P)) ((R[le] = fe), (R[re] = P), (le = re));
					else break e;
				}
			}
			return $;
		}
		function s(R, $) {
			var P = R.sortIndex - $.sortIndex;
			return P !== 0 ? P : R.id - $.id;
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
				if (r(m) !== null) ((E = !0), F || ((F = !0), se()));
				else {
					var $ = r(v);
					$ !== null && ue(k, $.startTime - R);
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
						var P = b;
						try {
							t: {
								for (C(R), _ = r(m); _ !== null && !(_.expirationTime > R && G()); ) {
									var le = _.callback;
									if (typeof le == "function") {
										((_.callback = null), (b = _.priorityLevel));
										var me = le(_.expirationTime <= R);
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
									(Re !== null && ue(k, Re.startTime - R), ($ = !1));
								}
							}
							break e;
						} finally {
							((_ = null), (b = P), (p = !1));
						}
						$ = void 0;
					}
				} finally {
					$ ? se() : (F = !1);
				}
			}
		}
		var se;
		if (typeof A == "function")
			se = function () {
				A(B);
			};
		else if (typeof MessageChannel < "u") {
			var ee = new MessageChannel(),
				K = ee.port2;
			((ee.port1.onmessage = B),
				(se = function () {
					K.postMessage(null);
				}));
		} else
			se = function () {
				z(B, 0);
			};
		function ue(R, $) {
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
				var P = b;
				b = $;
				try {
					return R();
				} finally {
					b = P;
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
				var P = b;
				b = R;
				try {
					return $();
				} finally {
					b = P;
				}
			}),
			(e.unstable_scheduleCallback = function (R, $, P) {
				var le = e.unstable_now();
				switch (
					(typeof P == "object" && P !== null
						? ((P = P.delay), (P = typeof P == "number" && 0 < P ? le + P : le))
						: (P = le),
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
					(me = P + me),
					(R = { id: g++, callback: $, priorityLevel: R, startTime: P, expirationTime: me, sortIndex: -1 }),
					P > le
						? ((R.sortIndex = P),
							n(v, R),
							r(m) === null && R === r(v) && (x ? (D(Q), (Q = -1)) : (x = !0), ue(k, P - le)))
						: ((R.sortIndex = me), n(m, R), E || p || ((E = !0), F || ((F = !0), se()))),
					R
				);
			}),
			(e.unstable_shouldYield = G),
			(e.unstable_wrapCallback = function (R) {
				var $ = b;
				return function () {
					var P = b;
					b = $;
					try {
						return R.apply(this, arguments);
					} finally {
						b = P;
					}
				};
			}));
	}),
	$E = Jn((e, n) => {
		n.exports = UE();
	}),
	BE = Jn((e) => {
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
			var fe = re.ref;
			return { $$typeof: n, type: N, key: X, ref: fe !== void 0 ? fe : null, props: re };
		}
		function B(N, X) {
			return G(N.type, X, N.props);
		}
		function se(N) {
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
		var K = /\/+/g;
		function ue(N, X) {
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
		function $(N, X, re, fe, ge) {
			var be = typeof N;
			(be === "undefined" || be === "boolean") && (N = null);
			var Se = !1;
			if (N === null) Se = !0;
			else
				switch (be) {
					case "bigint":
					case "string":
					case "number":
						Se = !0;
						break;
					case "object":
						switch (N.$$typeof) {
							case n:
							case r:
								Se = !0;
								break;
							case _:
								return ((Se = N._init), $(Se(N._payload), X, re, fe, ge));
						}
				}
			if (Se)
				return (
					(ge = ge(N)),
					(Se = fe === "" ? "." + ue(N, 0) : fe),
					F(ge)
						? ((re = ""),
							Se != null && (re = Se.replace(K, "$&/") + "/"),
							$(ge, X, re, "", function (Ke) {
								return Ke;
							}))
						: ge != null &&
							(se(ge) &&
								(ge = B(
									ge,
									re + (ge.key == null || (N && N.key === ge.key) ? "" : ("" + ge.key).replace(K, "$&/") + "/") + Se,
								)),
							X.push(ge)),
					1
				);
			Se = 0;
			var Fe = fe === "" ? "." : fe + ":";
			if (F(N))
				for (var De = 0; De < N.length; De++) ((fe = N[De]), (be = Fe + ue(fe, De)), (Se += $(fe, X, re, be, ge)));
			else if (((De = E(N)), typeof De == "function"))
				for (N = De.call(N), De = 0; !(fe = N.next()).done; )
					((fe = fe.value), (be = Fe + ue(fe, De++)), (Se += $(fe, X, re, be, ge)));
			else if (be === "object") {
				if (typeof N.then == "function") return $(R(N), X, re, fe, ge);
				throw (
					(X = String(N)),
					Error(
						"Objects are not valid as a React child (found: " +
							(X === "[object Object]" ? "object with keys {" + Object.keys(N).join(", ") + "}" : X) +
							"). If you meant to render a collection of children, use an array instead.",
					)
				);
			}
			return Se;
		}
		function P(N, X, re) {
			if (N == null) return N;
			var fe = [],
				ge = 0;
			return (
				$(N, fe, "", "", function (be) {
					return X.call(re, be, ge++);
				}),
				fe
			);
		}
		function le(N) {
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
				map: P,
				forEach: function (N, X, re) {
					P(
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
						P(N, function () {
							X++;
						}),
						X
					);
				},
				toArray: function (N) {
					return (
						P(N, function (X) {
							return X;
						}) || []
					);
				},
				only: function (N) {
					if (!se(N)) throw Error("React.Children.only expected to receive a single React element child.");
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
				var fe = O({}, N.props),
					ge = N.key;
				if (X != null)
					for (be in (X.key !== void 0 && (ge = "" + X.key), X))
						!q.call(X, be) ||
							be === "key" ||
							be === "__self" ||
							be === "__source" ||
							(be === "ref" && X.ref === void 0) ||
							(fe[be] = X[be]);
				var be = arguments.length - 2;
				if (be === 1) fe.children = re;
				else if (1 < be) {
					for (var Se = Array(be), Fe = 0; Fe < be; Fe++) Se[Fe] = arguments[Fe + 2];
					fe.children = Se;
				}
				return G(N.type, ge, fe);
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
				var fe,
					ge = {},
					be = null;
				if (X != null)
					for (fe in (X.key !== void 0 && (be = "" + X.key), X))
						q.call(X, fe) && fe !== "key" && fe !== "__self" && fe !== "__source" && (ge[fe] = X[fe]);
				var Se = arguments.length - 2;
				if (Se === 1) ge.children = re;
				else if (1 < Se) {
					for (var Fe = Array(Se), De = 0; De < Se; De++) Fe[De] = arguments[De + 2];
					ge.children = Fe;
				}
				if (N && N.defaultProps) for (fe in ((Se = N.defaultProps), Se)) ge[fe] === void 0 && (ge[fe] = Se[fe]);
				return G(N, be, ge);
			}),
			(e.createRef = function () {
				return { current: null };
			}),
			(e.forwardRef = function (N) {
				return { $$typeof: m, render: N };
			}),
			(e.isValidElement = se),
			(e.lazy = function (N) {
				return { $$typeof: _, _payload: { _status: -1, _result: N }, _init: le };
			}),
			(e.memo = function (N, X) {
				return { $$typeof: g, type: N, compare: X === void 0 ? null : X };
			}),
			(e.startTransition = function (N) {
				var X = j.T,
					re = {};
				j.T = re;
				try {
					var fe = N(),
						ge = j.S;
					(ge !== null && ge(re, fe),
						typeof fe == "object" && fe !== null && typeof fe.then == "function" && fe.then(Q, me));
				} catch (be) {
					me(be);
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
	jo = Jn((e, n) => {
		n.exports = BE();
	}),
	IE = Jn((e) => {
		var n = jo();
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
	Zp = Jn((e, n) => {
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
		(r(), (n.exports = IE()));
	}),
	VE = Jn((e) => {
		var n = $E(),
			r = jo(),
			u = Zp();
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
			se = Symbol.iterator;
		function ee(t) {
			return t === null || typeof t != "object"
				? null
				: ((t = (se && t[se]) || t["@@iterator"]), typeof t == "function" ? t : null);
		}
		var K = Symbol.for("react.client.reference");
		function ue(t) {
			if (t == null) return null;
			if (typeof t == "function") return t.$$typeof === K ? null : t.displayName || t.name || null;
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
						return ((i = t.displayName || null), i !== null ? i : ue(t.type) || "Memo");
					case q:
						((i = t._payload), (t = t._init));
						try {
							return ue(t(i));
						} catch {}
				}
			return null;
		}
		var R = Array.isArray,
			$ = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			P = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			le = { pending: !1, data: null, method: null, action: null },
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
		var fe = N(null),
			ge = N(null),
			be = N(null),
			Se = N(null);
		function Fe(t, i) {
			switch ((re(be, i), re(ge, t), re(fe, null), i.nodeType)) {
				case 9:
				case 11:
					t = (t = i.documentElement) && (t = t.namespaceURI) ? py(t) : 0;
					break;
				default:
					if (((t = i.tagName), (i = i.namespaceURI))) ((i = py(i)), (t = by(i, t)));
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
			(X(fe), re(fe, t));
		}
		function De() {
			(X(fe), X(ge), X(be));
		}
		function Ke(t) {
			t.memoizedState !== null && re(Se, t);
			var i = fe.current,
				a = by(i, t.type);
			i !== a && (re(ge, t), re(fe, a));
		}
		function Et(t) {
			(ge.current === t && (X(fe), X(ge)), Se.current === t && (X(Se), (sl._currentValue = le)));
		}
		var Tt, Kt;
		function Be(t) {
			if (Tt === void 0)
				try {
					throw Error();
				} catch (a) {
					var i = a.stack.trim().match(/\n( *(at )?)/);
					((Tt = (i && i[1]) || ""),
						(Kt =
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
				Tt +
				t +
				Kt
			);
		}
		var ce = !1;
		function Ee(t, i) {
			if (!t || ce) return "";
			ce = !0;
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
									} catch (Y) {
										var H = Y;
									}
									Reflect.construct(t, [], ie);
								} else {
									try {
										ie.call();
									} catch (Y) {
										H = Y;
									}
									t.call(ie.prototype);
								}
							} else {
								try {
									throw Error();
								} catch (Y) {
									H = Y;
								}
								(ie = t()) && typeof ie.catch == "function" && ie.catch(function () {});
							}
						} catch (Y) {
							if (Y && H && typeof Y.stack == "string") return [Y.stack, H.stack];
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
										var W =
											`
` + M[l].replace(" at new ", " at ");
										return (
											t.displayName && W.includes("<anonymous>") && (W = W.replace("<anonymous>", t.displayName)),
											W
										);
									}
								while (1 <= l && 0 <= c);
							break;
						}
				}
			} finally {
				((ce = !1), (Error.prepareStackTrace = a));
			}
			return (a = t ? t.displayName || t.name : "") ? Be(a) : "";
		}
		function Ye(t, i) {
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
				do ((i += Ye(t, a)), (a = t), (t = t.return));
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
		var yt = Object.prototype.hasOwnProperty,
			rt = n.unstable_scheduleCallback,
			ae = n.unstable_cancelCallback,
			Ae = n.unstable_shouldYield,
			lt = n.unstable_requestPaint,
			Oe = n.unstable_now,
			pt = n.unstable_getCurrentPriorityLevel,
			Ft = n.unstable_ImmediatePriority,
			st = n.unstable_UserBlockingPriority,
			Xt = n.unstable_NormalPriority,
			ba = n.unstable_LowPriority,
			fn = n.unstable_IdlePriority,
			Ei = n.log,
			Tu = n.unstable_setDisableYieldValue,
			gn = null,
			Yt = null;
		function en(t) {
			if ((typeof Ei == "function" && Tu(t), Yt && typeof Yt.setStrictMode == "function"))
				try {
					Yt.setStrictMode(gn, t);
				} catch {}
		}
		var jt = Math.clz32 ? Math.clz32 : Ur,
			qr = Math.log,
			oi = Math.LN2;
		function Ur(t) {
			return ((t >>>= 0), t === 0 ? 32 : (31 - ((qr(t) / oi) | 0)) | 0);
		}
		var yn = 256,
			ci = 262144,
			tn = 4194304;
		function Rn(t) {
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
		function Ti(t, i, a) {
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
						l !== 0 ? (c = Rn(l)) : ((y &= T), y !== 0 ? (c = Rn(y)) : a || ((a = T & ~t), a !== 0 && (c = Rn(a)))))
					: ((T = l & ~d), T !== 0 ? (c = Rn(T)) : y !== 0 ? (c = Rn(y)) : a || ((a = l & ~t), a !== 0 && (c = Rn(a)))),
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
		function J(t, i) {
			return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & i) === 0;
		}
		function de(t, i) {
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
		function xe() {
			var t = tn;
			return ((tn <<= 1), (tn & 62914560) === 0 && (tn = 4194304), t);
		}
		function _e(t) {
			for (var i = [], a = 0; 31 > a; a++) i.push(t);
			return i;
		}
		function at(t, i) {
			((t.pendingLanes |= i), i !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
		}
		function ut(t, i, a, l, c, d) {
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
				var W = 31 - jt(a),
					ie = 1 << W;
				((T[W] = 0), (M[W] = -1));
				var H = V[W];
				if (H !== null)
					for (V[W] = null, W = 0; W < H.length; W++) {
						var Y = H[W];
						Y !== null && (Y.lane &= -536870913);
					}
				a &= ~ie;
			}
			(l !== 0 && nn(t, l, 0), d !== 0 && c === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(y & ~i)));
		}
		function nn(t, i, a) {
			((t.pendingLanes |= i), (t.suspendedLanes &= ~i));
			var l = 31 - jt(i);
			((t.entangledLanes |= i), (t.entanglements[l] = t.entanglements[l] | 1073741824 | (a & 261930)));
		}
		function xt(t, i) {
			var a = (t.entangledLanes |= i);
			for (t = t.entanglements; a; ) {
				var l = 31 - jt(a),
					c = 1 << l;
				((c & i) | (t[l] & i) && (t[l] |= i), (a &= ~c));
			}
		}
		function ei(t, i) {
			var a = i & -i;
			return ((a = (a & 42) !== 0 ? 1 : Un(a)), (a & (t.suspendedLanes | i)) !== 0 ? 0 : a);
		}
		function Un(t) {
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
		function At(t) {
			return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
		}
		function fi() {
			var t = P.p;
			return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : By(t.type));
		}
		function $r(t, i) {
			var a = P.p;
			try {
				return ((P.p = t), i());
			} finally {
				P.p = a;
			}
		}
		var di = Math.random().toString(36).slice(2),
			Lt = "__reactFiber$" + di,
			Z = "__reactProps$" + di,
			oe = "__reactContainer$" + di,
			we = "__reactEvents$" + di,
			ot = "__reactListeners$" + di,
			Nt = "__reactHandles$" + di,
			ht = "__reactResources$" + di,
			rn = "__reactMarker$" + di;
		function ir(t) {
			(delete t[Lt], delete t[Z], delete t[we], delete t[ot], delete t[Nt]);
		}
		function Ct(t) {
			var i = t[Lt];
			if (i) return i;
			for (var a = t.parentNode; a; ) {
				if ((i = a[oe] || a[Lt])) {
					if (((a = i.alternate), i.child !== null || (a !== null && a.child !== null)))
						for (t = Ay(t); t !== null; ) {
							if ((a = t[Lt])) return a;
							t = Ay(t);
						}
					return i;
				}
				((t = a), (a = t.parentNode));
			}
			return null;
		}
		function ti(t) {
			if ((t = t[Lt] || t[oe])) {
				var i = t.tag;
				if (i === 5 || i === 6 || i === 13 || i === 31 || i === 26 || i === 27 || i === 3) return t;
			}
			return null;
		}
		function xi(t) {
			var i = t.tag;
			if (i === 5 || i === 26 || i === 27 || i === 6) return t.stateNode;
			throw Error(s(33));
		}
		function rr(t) {
			var i = t[ht];
			return (i || (i = t[ht] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), i);
		}
		function Jt(t) {
			t[rn] = !0;
		}
		var sm = new Set(),
			om = {};
		function Br(t, i) {
			(_a(t, i), _a(t + "Capture", i));
		}
		function _a(t, i) {
			for (om[t] = i, t = 0; t < i.length; t++) sm.add(i[t]);
		}
		var X_ = RegExp(
				"^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
			),
			cm = {},
			fm = {};
		function J_(t) {
			return yt.call(fm, t) ? !0 : yt.call(cm, t) ? !1 : X_.test(t) ? (fm[t] = !0) : ((cm[t] = !0), !1);
		}
		function Vl(t, i, a) {
			if (J_(i))
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
		function Zl(t, i, a) {
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
		function Ai(t, i, a, l) {
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
		function dm(t) {
			var i = t.type;
			return (t = t.nodeName) && t.toLowerCase() === "input" && (i === "checkbox" || i === "radio");
		}
		function W_(t, i, a) {
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
		function uc(t) {
			if (!t._valueTracker) {
				var i = dm(t) ? "checked" : "value";
				t._valueTracker = W_(t, i, "" + t[i]);
			}
		}
		function hm(t) {
			if (!t) return !1;
			var i = t._valueTracker;
			if (!i) return !0;
			var a = i.getValue(),
				l = "";
			return (t && (l = dm(t) ? (t.checked ? "true" : "false") : t.value), (t = l), t !== a ? (i.setValue(t), !0) : !1);
		}
		function Hl(t) {
			if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")) return null;
			try {
				return t.activeElement || t.body;
			} catch {
				return t.body;
			}
		}
		var eS = /[\n"\\]/g;
		function Bn(t) {
			return t.replace(eS, function (i) {
				return "\\" + i.charCodeAt(0).toString(16) + " ";
			});
		}
		function lc(t, i, a, l, c, d, y, T) {
			((t.name = ""),
				y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean"
					? (t.type = y)
					: t.removeAttribute("type"),
				i != null
					? y === "number"
						? ((i === 0 && t.value === "") || t.value != i) && (t.value = "" + $n(i))
						: t.value !== "" + $n(i) && (t.value = "" + $n(i))
					: (y !== "submit" && y !== "reset") || t.removeAttribute("value"),
				i != null ? sc(t, y, $n(i)) : a != null ? sc(t, y, $n(a)) : l != null && t.removeAttribute("value"),
				c == null && d != null && (t.defaultChecked = !!d),
				c != null && (t.checked = c && typeof c != "function" && typeof c != "symbol"),
				T != null && typeof T != "function" && typeof T != "symbol" && typeof T != "boolean"
					? (t.name = "" + $n(T))
					: t.removeAttribute("name"));
		}
		function mm(t, i, a, l, c, d, y, T) {
			if (
				(d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (t.type = d),
				i != null || a != null)
			) {
				if (!((d !== "submit" && d !== "reset") || i != null)) {
					uc(t);
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
				uc(t));
		}
		function sc(t, i, a) {
			(i === "number" && Hl(t.ownerDocument) === t) || t.defaultValue === "" + a || (t.defaultValue = "" + a);
		}
		function Sa(t, i, a, l) {
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
		function vm(t, i, a) {
			if (i != null && ((i = "" + $n(i)), i !== t.value && (t.value = i), a == null)) {
				t.defaultValue !== i && (t.defaultValue = i);
				return;
			}
			t.defaultValue = a != null ? "" + $n(a) : "";
		}
		function gm(t, i, a, l) {
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
				uc(t));
		}
		function wa(t, i) {
			if (i) {
				var a = t.firstChild;
				if (a && a === t.lastChild && a.nodeType === 3) {
					a.nodeValue = i;
					return;
				}
			}
			t.textContent = i;
		}
		var tS = new Set(
			"animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
				" ",
			),
		);
		function ym(t, i, a) {
			var l = i.indexOf("--") === 0;
			a == null || typeof a == "boolean" || a === ""
				? l
					? t.setProperty(i, "")
					: i === "float"
						? (t.cssFloat = "")
						: (t[i] = "")
				: l
					? t.setProperty(i, a)
					: typeof a != "number" || a === 0 || tS.has(i)
						? i === "float"
							? (t.cssFloat = a)
							: (t[i] = ("" + a).trim())
						: (t[i] = a + "px");
		}
		function pm(t, i, a) {
			if (i != null && typeof i != "object") throw Error(s(62));
			if (((t = t.style), a != null)) {
				for (var l in a)
					!a.hasOwnProperty(l) ||
						(i != null && i.hasOwnProperty(l)) ||
						(l.indexOf("--") === 0 ? t.setProperty(l, "") : l === "float" ? (t.cssFloat = "") : (t[l] = ""));
				for (var c in i) ((l = i[c]), i.hasOwnProperty(c) && a[c] !== l && ym(t, c, l));
			} else for (var d in i) i.hasOwnProperty(d) && ym(t, d, i[d]);
		}
		function oc(t) {
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
		var nS = new Map([
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
			iS =
				/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
		function Pl(t) {
			return iS.test("" + t)
				? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
				: t;
		}
		function Ci() {}
		var cc = null;
		function fc(t) {
			return (
				(t = t.target || t.srcElement || window),
				t.correspondingUseElement && (t = t.correspondingUseElement),
				t.nodeType === 3 ? t.parentNode : t
			);
		}
		var Ea = null,
			Ta = null;
		function bm(t) {
			var i = ti(t);
			if (i && (t = i.stateNode)) {
				var a = t[Z] || null;
				e: switch (((t = i.stateNode), i.type)) {
					case "input":
						if (
							(lc(t, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name),
							(i = a.name),
							a.type === "radio" && i != null)
						) {
							for (a = t; a.parentNode; ) a = a.parentNode;
							for (a = a.querySelectorAll('input[name="' + Bn("" + i) + '"][type="radio"]'), i = 0; i < a.length; i++) {
								var l = a[i];
								if (l !== t && l.form === t.form) {
									var c = l[Z] || null;
									if (!c) throw Error(s(90));
									lc(l, c.value, c.defaultValue, c.defaultValue, c.checked, c.defaultChecked, c.type, c.name);
								}
							}
							for (i = 0; i < a.length; i++) ((l = a[i]), l.form === t.form && hm(l));
						}
						break e;
					case "textarea":
						vm(t, a.value, a.defaultValue);
						break e;
					case "select":
						((i = a.value), i != null && Sa(t, !!a.multiple, i, !1));
				}
			}
		}
		var dc = !1;
		function _m(t, i, a) {
			if (dc) return t(i, a);
			dc = !0;
			try {
				return t(i);
			} finally {
				if (((dc = !1), (Ea !== null || Ta !== null) && (Ms(), Ea && ((i = Ea), (t = Ta), (Ta = Ea = null), bm(i), t))))
					for (i = 0; i < t.length; i++) bm(t[i]);
			}
		}
		function xu(t, i) {
			var a = t.stateNode;
			if (a === null) return null;
			var l = a[Z] || null;
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
		var Ri = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
			hc = !1;
		if (Ri)
			try {
				var Au = {};
				(Object.defineProperty(Au, "passive", {
					get: function () {
						hc = !0;
					},
				}),
					window.addEventListener("test", Au, Au),
					window.removeEventListener("test", Au, Au));
			} catch {
				hc = !1;
			}
		var ar = null,
			mc = null,
			Ql = null;
		function Sm() {
			if (Ql) return Ql;
			var t,
				i = mc,
				a = i.length,
				l,
				c = "value" in ar ? ar.value : ar.textContent,
				d = c.length;
			for (t = 0; t < a && i[t] === c[t]; t++);
			var y = a - t;
			for (l = 1; l <= y && i[a - l] === c[d - l]; l++);
			return (Ql = c.slice(t, 1 < l ? 1 - l : void 0));
		}
		function Kl(t) {
			var i = t.keyCode;
			return (
				"charCode" in t ? ((t = t.charCode), t === 0 && i === 13 && (t = 13)) : (t = i),
				t === 10 && (t = 13),
				32 <= t || t === 13 ? t : 0
			);
		}
		function Yl() {
			return !0;
		}
		function wm() {
			return !1;
		}
		function pn(t) {
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
						? Yl
						: wm),
					(this.isPropagationStopped = wm),
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
							(this.isDefaultPrevented = Yl));
					},
					stopPropagation: function () {
						var a = this.nativeEvent;
						a &&
							(a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
							(this.isPropagationStopped = Yl));
					},
					persist: function () {},
					isPersistent: Yl,
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
			Gl = pn(Ir),
			Cu = b({}, Ir, { view: 0, detail: 0 }),
			rS = pn(Cu),
			vc,
			gc,
			Ru,
			Fl = b({}, Cu, {
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
				getModifierState: pc,
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
						: (t !== Ru &&
								(Ru && t.type === "mousemove"
									? ((vc = t.screenX - Ru.screenX), (gc = t.screenY - Ru.screenY))
									: (gc = vc = 0),
								(Ru = t)),
							vc);
				},
				movementY: function (t) {
					return "movementY" in t ? t.movementY : gc;
				},
			}),
			Em = pn(Fl),
			aS = pn(b({}, Fl, { dataTransfer: 0 })),
			yc = pn(b({}, Cu, { relatedTarget: 0 })),
			uS = pn(b({}, Ir, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
			lS = pn(
				b({}, Ir, {
					clipboardData: function (t) {
						return "clipboardData" in t ? t.clipboardData : window.clipboardData;
					},
				}),
			),
			Tm = pn(b({}, Ir, { data: 0 })),
			sS = {
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
			oS = {
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
			cS = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
		function fS(t) {
			var i = this.nativeEvent;
			return i.getModifierState ? i.getModifierState(t) : (t = cS[t]) ? !!i[t] : !1;
		}
		function pc() {
			return fS;
		}
		var dS = pn(
				b({}, Cu, {
					key: function (t) {
						if (t.key) {
							var i = sS[t.key] || t.key;
							if (i !== "Unidentified") return i;
						}
						return t.type === "keypress"
							? ((t = Kl(t)), t === 13 ? "Enter" : String.fromCharCode(t))
							: t.type === "keydown" || t.type === "keyup"
								? oS[t.keyCode] || "Unidentified"
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
					getModifierState: pc,
					charCode: function (t) {
						return t.type === "keypress" ? Kl(t) : 0;
					},
					keyCode: function (t) {
						return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
					which: function (t) {
						return t.type === "keypress" ? Kl(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
				}),
			),
			xm = pn(
				b({}, Fl, {
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
			hS = pn(
				b({}, Cu, {
					touches: 0,
					targetTouches: 0,
					changedTouches: 0,
					altKey: 0,
					metaKey: 0,
					ctrlKey: 0,
					shiftKey: 0,
					getModifierState: pc,
				}),
			),
			mS = pn(b({}, Ir, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
			vS = pn(
				b({}, Fl, {
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
			gS = pn(b({}, Ir, { newState: 0, oldState: 0 })),
			yS = [9, 13, 27, 32],
			bc = Ri && "CompositionEvent" in window,
			Ou = null;
		Ri && "documentMode" in document && (Ou = document.documentMode);
		var pS = Ri && "TextEvent" in window && !Ou,
			Am = Ri && (!bc || (Ou && 8 < Ou && 11 >= Ou)),
			Cm = " ",
			Rm = !1;
		function Om(t, i) {
			switch (t) {
				case "keyup":
					return yS.indexOf(i.keyCode) !== -1;
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
		function Nm(t) {
			return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
		}
		var xa = !1;
		function bS(t, i) {
			switch (t) {
				case "compositionend":
					return Nm(i);
				case "keypress":
					return i.which !== 32 ? null : ((Rm = !0), Cm);
				case "textInput":
					return ((t = i.data), t === Cm && Rm ? null : t);
				default:
					return null;
			}
		}
		function _S(t, i) {
			if (xa)
				return t === "compositionend" || (!bc && Om(t, i)) ? ((t = Sm()), (Ql = mc = ar = null), (xa = !1), t) : null;
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
					return Am && i.locale !== "ko" ? null : i.data;
				default:
					return null;
			}
		}
		var SS = {
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
		function km(t) {
			var i = t && t.nodeName && t.nodeName.toLowerCase();
			return i === "input" ? !!SS[t.type] : i === "textarea";
		}
		function Mm(t, i, a, l) {
			(Ea ? (Ta ? Ta.push(l) : (Ta = [l])) : (Ea = l),
				(i = $s(i, "onChange")),
				0 < i.length && ((a = new Gl("onChange", "change", null, a, l)), t.push({ event: a, listeners: i })));
		}
		var Nu = null,
			ku = null;
		function wS(t) {
			fy(t, 0);
		}
		function Xl(t) {
			if (hm(xi(t))) return t;
		}
		function zm(t, i) {
			if (t === "change") return i;
		}
		var Dm = !1;
		if (Ri) {
			var _c;
			if (Ri) {
				var Sc = "oninput" in document;
				if (!Sc) {
					var jm = document.createElement("div");
					(jm.setAttribute("oninput", "return;"), (Sc = typeof jm.oninput == "function"));
				}
				_c = Sc;
			} else _c = !1;
			Dm = _c && (!document.documentMode || 9 < document.documentMode);
		}
		function Lm() {
			Nu && (Nu.detachEvent("onpropertychange", qm), (ku = Nu = null));
		}
		function qm(t) {
			if (t.propertyName === "value" && Xl(ku)) {
				var i = [];
				(Mm(i, ku, t, fc(t)), _m(wS, i));
			}
		}
		function ES(t, i, a) {
			t === "focusin" ? (Lm(), (Nu = i), (ku = a), Nu.attachEvent("onpropertychange", qm)) : t === "focusout" && Lm();
		}
		function TS(t) {
			if (t === "selectionchange" || t === "keyup" || t === "keydown") return Xl(ku);
		}
		function xS(t, i) {
			if (t === "click") return Xl(i);
		}
		function AS(t, i) {
			if (t === "input" || t === "change") return Xl(i);
		}
		function CS(t, i) {
			return (t === i && (t !== 0 || 1 / t === 1 / i)) || (t !== t && i !== i);
		}
		var On = typeof Object.is == "function" ? Object.is : CS;
		function Mu(t, i) {
			if (On(t, i)) return !0;
			if (typeof t != "object" || t === null || typeof i != "object" || i === null) return !1;
			var a = Object.keys(t),
				l = Object.keys(i);
			if (a.length !== l.length) return !1;
			for (l = 0; l < a.length; l++) {
				var c = a[l];
				if (!yt.call(i, c) || !On(t[c], i[c])) return !1;
			}
			return !0;
		}
		function Um(t) {
			for (; t && t.firstChild; ) t = t.firstChild;
			return t;
		}
		function $m(t, i) {
			var a = Um(t);
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
				a = Um(a);
			}
		}
		function Bm(t, i) {
			return t && i
				? t === i
					? !0
					: t && t.nodeType === 3
						? !1
						: i && i.nodeType === 3
							? Bm(t, i.parentNode)
							: "contains" in t
								? t.contains(i)
								: t.compareDocumentPosition
									? !!(t.compareDocumentPosition(i) & 16)
									: !1
				: !1;
		}
		function Im(t) {
			t =
				t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
					? t.ownerDocument.defaultView
					: window;
			for (var i = Hl(t.document); i instanceof t.HTMLIFrameElement; ) {
				try {
					var a = typeof i.contentWindow.location.href == "string";
				} catch {
					a = !1;
				}
				if (a) t = i.contentWindow;
				else break;
				i = Hl(t.document);
			}
			return i;
		}
		function wc(t) {
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
		var RS = Ri && "documentMode" in document && 11 >= document.documentMode,
			Aa = null,
			Ec = null,
			zu = null,
			Tc = !1;
		function Vm(t, i, a) {
			var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
			Tc ||
				Aa == null ||
				Aa !== Hl(l) ||
				((l = Aa),
				"selectionStart" in l && wc(l)
					? (l = { start: l.selectionStart, end: l.selectionEnd })
					: ((l = ((l.ownerDocument && l.ownerDocument.defaultView) || window).getSelection()),
						(l = {
							anchorNode: l.anchorNode,
							anchorOffset: l.anchorOffset,
							focusNode: l.focusNode,
							focusOffset: l.focusOffset,
						})),
				(zu && Mu(zu, l)) ||
					((zu = l),
					(l = $s(Ec, "onSelect")),
					0 < l.length &&
						((i = new Gl("onSelect", "select", null, i, a)), t.push({ event: i, listeners: l }), (i.target = Aa))));
		}
		function Vr(t, i) {
			var a = {};
			return ((a[t.toLowerCase()] = i.toLowerCase()), (a["Webkit" + t] = "webkit" + i), (a["Moz" + t] = "moz" + i), a);
		}
		var Ca = {
				animationend: Vr("Animation", "AnimationEnd"),
				animationiteration: Vr("Animation", "AnimationIteration"),
				animationstart: Vr("Animation", "AnimationStart"),
				transitionrun: Vr("Transition", "TransitionRun"),
				transitionstart: Vr("Transition", "TransitionStart"),
				transitioncancel: Vr("Transition", "TransitionCancel"),
				transitionend: Vr("Transition", "TransitionEnd"),
			},
			xc = {},
			Zm = {};
		Ri &&
			((Zm = document.createElement("div").style),
			"AnimationEvent" in window ||
				(delete Ca.animationend.animation, delete Ca.animationiteration.animation, delete Ca.animationstart.animation),
			"TransitionEvent" in window || delete Ca.transitionend.transition);
		function Zr(t) {
			if (xc[t]) return xc[t];
			if (!Ca[t]) return t;
			var i = Ca[t],
				a;
			for (a in i) if (i.hasOwnProperty(a) && a in Zm) return (xc[t] = i[a]);
			return t;
		}
		var Hm = Zr("animationend"),
			Pm = Zr("animationiteration"),
			Qm = Zr("animationstart"),
			OS = Zr("transitionrun"),
			NS = Zr("transitionstart"),
			kS = Zr("transitioncancel"),
			Km = Zr("transitionend"),
			Ym = new Map(),
			Ac =
				"abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
					" ",
				);
		Ac.push("scrollEnd");
		function ni(t, i) {
			(Ym.set(t, i), Br(i, [t]));
		}
		var Jl =
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
			Ra = 0,
			Cc = 0;
		function Wl() {
			for (var t = Ra, i = (Cc = Ra = 0); i < t; ) {
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
				d !== 0 && Gm(a, c, d);
			}
		}
		function es(t, i, a, l) {
			((In[Ra++] = t),
				(In[Ra++] = i),
				(In[Ra++] = a),
				(In[Ra++] = l),
				(Cc |= l),
				(t.lanes |= l),
				(t = t.alternate),
				t !== null && (t.lanes |= l));
		}
		function Rc(t, i, a, l) {
			return (es(t, i, a, l), ts(t));
		}
		function Hr(t, i) {
			return (es(t, null, null, i), ts(t));
		}
		function Gm(t, i, a) {
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
						((c = 31 - jt(a)),
						(t = d.hiddenUpdates),
						(l = t[c]),
						l === null ? (t[c] = [i]) : l.push(i),
						(i.lane = a | 536870912)),
					d)
				: null;
		}
		function ts(t) {
			if (50 < tl) throw ((tl = 0), (Uf = null), Error(s(185)));
			for (var i = t.return; i !== null; ) ((t = i), (i = t.return));
			return t.tag === 3 ? t.stateNode : null;
		}
		var Oa = {};
		function MS(t, i, a, l) {
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
		function Nn(t, i, a, l) {
			return new MS(t, i, a, l);
		}
		function Oc(t) {
			return ((t = t.prototype), !(!t || !t.isReactComponent));
		}
		function Oi(t, i) {
			var a = t.alternate;
			return (
				a === null
					? ((a = Nn(t.tag, i, t.key, t.mode)),
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
		function Fm(t, i) {
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
		function ns(t, i, a, l, c, d) {
			var y = 0;
			if (((l = t), typeof t == "function")) Oc(t) && (y = 1);
			else if (typeof t == "string")
				y = Uw(t, a, fe.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
			else
				e: switch (t) {
					case G:
						return ((t = Nn(31, a, i, c)), (t.elementType = G), (t.lanes = d), t);
					case O:
						return Pr(a.children, c, d, i);
					case z:
						((y = 8), (c |= 24));
						break;
					case D:
						return ((t = Nn(12, a, i, c | 2)), (t.elementType = D), (t.lanes = d), t);
					case F:
						return ((t = Nn(13, a, i, c)), (t.elementType = F), (t.lanes = d), t);
					case Q:
						return ((t = Nn(19, a, i, c)), (t.elementType = Q), (t.lanes = d), t);
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
			return ((i = Nn(y, a, i, c)), (i.elementType = t), (i.type = l), (i.lanes = d), i);
		}
		function Pr(t, i, a, l) {
			return ((t = Nn(7, t, l, i)), (t.lanes = a), t);
		}
		function Nc(t, i, a) {
			return ((t = Nn(6, t, null, i)), (t.lanes = a), t);
		}
		function Xm(t) {
			var i = Nn(18, null, null, 0);
			return ((i.stateNode = t), i);
		}
		function kc(t, i, a) {
			return (
				(i = Nn(4, t.children !== null ? t.children : [], t.key, i)),
				(i.lanes = a),
				(i.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }),
				i
			);
		}
		var Jm = new WeakMap();
		function Vn(t, i) {
			if (typeof t == "object" && t !== null) {
				var a = Jm.get(t);
				return a !== void 0 ? a : ((i = { value: t, source: i, stack: ze(i) }), Jm.set(t, i), i);
			}
			return { value: t, source: i, stack: ze(i) };
		}
		var Na = [],
			ka = 0,
			is = null,
			Du = 0,
			Zn = [],
			Hn = 0,
			ur = null,
			hi = 1,
			mi = "";
		function Ni(t, i) {
			((Na[ka++] = Du), (Na[ka++] = is), (is = t), (Du = i));
		}
		function Wm(t, i, a) {
			((Zn[Hn++] = hi), (Zn[Hn++] = mi), (Zn[Hn++] = ur), (ur = t));
			var l = hi;
			t = mi;
			var c = 32 - jt(l) - 1;
			((l &= ~(1 << c)), (a += 1));
			var d = 32 - jt(i) + c;
			if (30 < d) {
				var y = c - (c % 5);
				((d = (l & ((1 << y) - 1)).toString(32)),
					(l >>= y),
					(c -= y),
					(hi = (1 << (32 - jt(i) + c)) | (a << c) | l),
					(mi = d + t));
			} else ((hi = (1 << d) | (a << c) | l), (mi = t));
		}
		function Mc(t) {
			t.return !== null && (Ni(t, 1), Wm(t, 1, 0));
		}
		function zc(t) {
			for (; t === is; ) ((is = Na[--ka]), (Na[ka] = null), (Du = Na[--ka]), (Na[ka] = null));
			for (; t === ur; )
				((ur = Zn[--Hn]), (Zn[Hn] = null), (mi = Zn[--Hn]), (Zn[Hn] = null), (hi = Zn[--Hn]), (Zn[Hn] = null));
		}
		function ev(t, i) {
			((Zn[Hn++] = hi), (Zn[Hn++] = mi), (Zn[Hn++] = ur), (hi = i.id), (mi = i.overflow), (ur = t));
		}
		var an = null,
			ct = null,
			$e = !1,
			lr = null,
			Pn = !1,
			Dc = Error(s(519));
		function sr(t) {
			throw (
				ju(Vn(Error(s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), t)),
				Dc
			);
		}
		function tv(t) {
			var i = t.stateNode,
				a = t.type,
				l = t.memoizedProps;
			switch (((i[Lt] = t), (i[Z] = l), a)) {
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
					for (a = 0; a < il.length; a++) Le(il[a], i);
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
					(Le("invalid", i), mm(i, l.value, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name, !0));
					break;
				case "select":
					Le("invalid", i);
					break;
				case "textarea":
					(Le("invalid", i), gm(i, l.value, l.defaultValue, l.children));
			}
			((a = l.children),
				(typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
				i.textContent === "" + a ||
				l.suppressHydrationWarning === !0 ||
				gy(i.textContent, a)
					? (l.popover != null && (Le("beforetoggle", i), Le("toggle", i)),
						l.onScroll != null && Le("scroll", i),
						l.onScrollEnd != null && Le("scrollend", i),
						l.onClick != null && (i.onclick = Ci),
						(i = !0))
					: (i = !1),
				i || sr(t, !0));
		}
		function nv(t) {
			for (an = t.return; an; )
				switch (an.tag) {
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
						an = an.return;
				}
		}
		function Ma(t) {
			if (t !== an) return !1;
			if (!$e) return (nv(t), ($e = !0), !1);
			var i = t.tag,
				a;
			if (
				((a = i !== 3 && i !== 27) &&
					((a = i === 5) && ((a = t.type), (a = !(a !== "form" && a !== "button") || Jf(t.type, t.memoizedProps))),
					(a = !a)),
				a && ct && sr(t),
				nv(t),
				i === 13)
			) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
				ct = xy(t);
			} else if (i === 31) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
				ct = xy(t);
			} else
				i === 27
					? ((i = ct), _r(t.type) ? ((t = id), (id = null), (ct = t)) : (ct = i))
					: (ct = an ? Yn(t.stateNode.nextSibling) : null);
			return !0;
		}
		function Qr() {
			((ct = an = null), ($e = !1));
		}
		function jc() {
			var t = lr;
			return (t !== null && (wn === null ? (wn = t) : wn.push.apply(wn, t), (lr = null)), t);
		}
		function ju(t) {
			lr === null ? (lr = [t]) : lr.push(t);
		}
		var Lc = N(null),
			Kr = null,
			ki = null;
		function or(t, i, a) {
			(re(Lc, i._currentValue), (i._currentValue = a));
		}
		function Mi(t) {
			((t._currentValue = Lc.current), X(Lc));
		}
		function qc(t, i, a) {
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
		function Uc(t, i, a, l) {
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
								((d.lanes |= a), (T = d.alternate), T !== null && (T.lanes |= a), qc(d.return, a, t), l || (y = null));
								break e;
							}
						d = T.next;
					}
				} else if (c.tag === 18) {
					if (((y = c.return), y === null)) throw Error(s(341));
					((y.lanes |= a), (d = y.alternate), d !== null && (d.lanes |= a), qc(y, a, t), (y = null));
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
		function za(t, i, a, l) {
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
						On(c.pendingProps.value, y.value) || (t !== null ? t.push(T) : (t = [T]));
					}
				} else if (c === Se.current) {
					if (((y = c.alternate), y === null)) throw Error(s(387));
					y.memoizedState.memoizedState !== c.memoizedState.memoizedState && (t !== null ? t.push(sl) : (t = [sl]));
				}
				c = c.return;
			}
			(t !== null && Uc(i, t, a, l), (i.flags |= 262144));
		}
		function rs(t) {
			for (t = t.firstContext; t !== null; ) {
				if (!On(t.context._currentValue, t.memoizedValue)) return !0;
				t = t.next;
			}
			return !1;
		}
		function Yr(t) {
			((Kr = t), (ki = null), (t = t.dependencies), t !== null && (t.firstContext = null));
		}
		function un(t) {
			return iv(Kr, t);
		}
		function as(t, i) {
			return (Kr === null && Yr(t), iv(t, i));
		}
		function iv(t, i) {
			var a = i._currentValue;
			if (((i = { context: i, memoizedValue: a, next: null }), ki === null)) {
				if (t === null) throw Error(s(308));
				((ki = i), (t.dependencies = { lanes: 0, firstContext: i }), (t.flags |= 524288));
			} else ki = ki.next = i;
			return a;
		}
		var zS =
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
			DS = n.unstable_scheduleCallback,
			jS = n.unstable_NormalPriority,
			qt = { $$typeof: C, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
		function $c() {
			return { controller: new zS(), data: new Map(), refCount: 0 };
		}
		function Lu(t) {
			(t.refCount--,
				t.refCount === 0 &&
					DS(jS, function () {
						t.controller.abort();
					}));
		}
		var qu = null,
			Bc = 0,
			Da = 0,
			ja = null;
		function LS(t, i) {
			if (qu === null) {
				var a = (qu = []);
				((Bc = 0),
					(Da = Hf()),
					(ja = {
						status: "pending",
						value: void 0,
						then: function (l) {
							a.push(l);
						},
					}));
			}
			return (Bc++, i.then(rv, rv), i);
		}
		function rv() {
			if (--Bc === 0 && qu !== null) {
				ja !== null && (ja.status = "fulfilled");
				var t = qu;
				((qu = null), (Da = 0), (ja = null));
				for (var i = 0; i < t.length; i++) (0, t[i])();
			}
		}
		function qS(t, i) {
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
		var av = $.S;
		$.S = function (t, i) {
			(($g = Oe()),
				typeof i == "object" && i !== null && typeof i.then == "function" && LS(t, i),
				av !== null && av(t, i));
		};
		var Gr = N(null);
		function Ic() {
			var t = Gr.current;
			return t !== null ? t : it.pooledCache;
		}
		function us(t, i) {
			i === null ? re(Gr, Gr.current) : re(Gr, i.pool);
		}
		function uv() {
			var t = Ic();
			return t === null ? null : { parent: qt._currentValue, pool: t };
		}
		var La = Error(s(460)),
			Vc = Error(s(474)),
			ls = Error(s(542)),
			ss = { then: function () {} };
		function lv(t) {
			return ((t = t.status), t === "fulfilled" || t === "rejected");
		}
		function sv(t, i, a) {
			switch (((a = t[a]), a === void 0 ? t.push(i) : a !== i && (i.then(Ci, Ci), (i = a)), i.status)) {
				case "fulfilled":
					return i.value;
				case "rejected":
					throw ((t = i.reason), cv(t), t);
				default:
					if (typeof i.status == "string") i.then(Ci, Ci);
					else {
						if (((t = it), t !== null && 100 < t.shellSuspendCounter)) throw Error(s(482));
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
							throw ((t = i.reason), cv(t), t);
					}
					throw ((Xr = i), La);
			}
		}
		function Fr(t) {
			try {
				var i = t._init;
				return i(t._payload);
			} catch (a) {
				throw a !== null && typeof a == "object" && typeof a.then == "function" ? ((Xr = a), La) : a;
			}
		}
		var Xr = null;
		function ov() {
			if (Xr === null) throw Error(s(459));
			var t = Xr;
			return ((Xr = null), t);
		}
		function cv(t) {
			if (t === La || t === ls) throw Error(s(483));
		}
		var qa = null,
			Uu = 0;
		function os(t) {
			var i = Uu;
			return ((Uu += 1), qa === null && (qa = []), sv(qa, t, i));
		}
		function $u(t, i) {
			((i = i.props.ref), (t.ref = i !== void 0 ? i : null));
		}
		function cs(t, i) {
			throw i.$$typeof === p
				? Error(s(525))
				: ((t = Object.prototype.toString.call(i)),
					Error(s(31, t === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : t)));
		}
		function fv(t) {
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
				return ((U = Oi(U, L)), (U.index = 0), (U.sibling = null), U);
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
					? ((L = Nc(I, U.mode, te)), (L.return = U), L)
					: ((L = c(L, I)), (L.return = U), L);
			}
			function M(U, L, I, te) {
				var pe = I.type;
				return pe === O
					? W(U, L, I.props.children, te, I.key)
					: L !== null &&
						  (L.elementType === pe || (typeof pe == "object" && pe !== null && pe.$$typeof === q && Fr(pe) === L.type))
						? ((L = c(L, I.props)), $u(L, I), (L.return = U), L)
						: ((L = ns(I.type, I.key, I.props, null, U.mode, te)), $u(L, I), (L.return = U), L);
			}
			function V(U, L, I, te) {
				return L === null ||
					L.tag !== 4 ||
					L.stateNode.containerInfo !== I.containerInfo ||
					L.stateNode.implementation !== I.implementation
					? ((L = kc(I, U.mode, te)), (L.return = U), L)
					: ((L = c(L, I.children || [])), (L.return = U), L);
			}
			function W(U, L, I, te, pe) {
				return L === null || L.tag !== 7
					? ((L = Pr(I, U.mode, te, pe)), (L.return = U), L)
					: ((L = c(L, I)), (L.return = U), L);
			}
			function ie(U, L, I) {
				if ((typeof L == "string" && L !== "") || typeof L == "number" || typeof L == "bigint")
					return ((L = Nc("" + L, U.mode, I)), (L.return = U), L);
				if (typeof L == "object" && L !== null) {
					switch (L.$$typeof) {
						case E:
							return ((I = ns(L.type, L.key, L.props, null, U.mode, I)), $u(I, L), (I.return = U), I);
						case x:
							return ((L = kc(L, U.mode, I)), (L.return = U), L);
						case q:
							return ((L = Fr(L)), ie(U, L, I));
					}
					if (R(L) || ee(L)) return ((L = Pr(L, U.mode, I, null)), (L.return = U), L);
					if (typeof L.then == "function") return ie(U, os(L), I);
					if (L.$$typeof === C) return ie(U, as(U, L), I);
					cs(U, L);
				}
				return null;
			}
			function H(U, L, I, te) {
				var pe = L !== null ? L.key : null;
				if ((typeof I == "string" && I !== "") || typeof I == "number" || typeof I == "bigint")
					return pe !== null ? null : T(U, L, "" + I, te);
				if (typeof I == "object" && I !== null) {
					switch (I.$$typeof) {
						case E:
							return I.key === pe ? M(U, L, I, te) : null;
						case x:
							return I.key === pe ? V(U, L, I, te) : null;
						case q:
							return ((I = Fr(I)), H(U, L, I, te));
					}
					if (R(I) || ee(I)) return pe !== null ? null : W(U, L, I, te, null);
					if (typeof I.then == "function") return H(U, L, os(I), te);
					if (I.$$typeof === C) return H(U, L, as(U, I), te);
					cs(U, I);
				}
				return null;
			}
			function Y(U, L, I, te, pe) {
				if ((typeof te == "string" && te !== "") || typeof te == "number" || typeof te == "bigint")
					return ((U = U.get(I) || null), T(L, U, "" + te, pe));
				if (typeof te == "object" && te !== null) {
					switch (te.$$typeof) {
						case E:
							return ((U = U.get(te.key === null ? I : te.key) || null), M(L, U, te, pe));
						case x:
							return ((U = U.get(te.key === null ? I : te.key) || null), V(L, U, te, pe));
						case q:
							return ((te = Fr(te)), Y(U, L, I, te, pe));
					}
					if (R(te) || ee(te)) return ((U = U.get(I) || null), W(L, U, te, pe, null));
					if (typeof te.then == "function") return Y(U, L, I, os(te), pe);
					if (te.$$typeof === C) return Y(U, L, I, as(L, te), pe);
					cs(L, te);
				}
				return null;
			}
			function he(U, L, I, te) {
				for (var pe = null, Ve = null, ve = L, Me = (L = 0), Ue = null; ve !== null && Me < I.length; Me++) {
					ve.index > Me ? ((Ue = ve), (ve = null)) : (Ue = ve.sibling);
					var Ze = H(U, ve, I[Me], te);
					if (Ze === null) {
						ve === null && (ve = Ue);
						break;
					}
					(t && ve && Ze.alternate === null && i(U, ve),
						(L = d(Ze, L, Me)),
						Ve === null ? (pe = Ze) : (Ve.sibling = Ze),
						(Ve = Ze),
						(ve = Ue));
				}
				if (Me === I.length) return (a(U, ve), $e && Ni(U, Me), pe);
				if (ve === null) {
					for (; Me < I.length; Me++)
						((ve = ie(U, I[Me], te)),
							ve !== null && ((L = d(ve, L, Me)), Ve === null ? (pe = ve) : (Ve.sibling = ve), (Ve = ve)));
					return ($e && Ni(U, Me), pe);
				}
				for (ve = l(ve); Me < I.length; Me++)
					((Ue = Y(ve, U, Me, I[Me], te)),
						Ue !== null &&
							(t && Ue.alternate !== null && ve.delete(Ue.key === null ? Me : Ue.key),
							(L = d(Ue, L, Me)),
							Ve === null ? (pe = Ue) : (Ve.sibling = Ue),
							(Ve = Ue)));
				return (
					t &&
						ve.forEach(function (xr) {
							return i(U, xr);
						}),
					$e && Ni(U, Me),
					pe
				);
			}
			function Te(U, L, I, te) {
				if (I == null) throw Error(s(151));
				for (
					var pe = null, Ve = null, ve = L, Me = (L = 0), Ue = null, Ze = I.next();
					ve !== null && !Ze.done;
					Me++, Ze = I.next()
				) {
					ve.index > Me ? ((Ue = ve), (ve = null)) : (Ue = ve.sibling);
					var xr = H(U, ve, Ze.value, te);
					if (xr === null) {
						ve === null && (ve = Ue);
						break;
					}
					(t && ve && xr.alternate === null && i(U, ve),
						(L = d(xr, L, Me)),
						Ve === null ? (pe = xr) : (Ve.sibling = xr),
						(Ve = xr),
						(ve = Ue));
				}
				if (Ze.done) return (a(U, ve), $e && Ni(U, Me), pe);
				if (ve === null) {
					for (; !Ze.done; Me++, Ze = I.next())
						((Ze = ie(U, Ze.value, te)),
							Ze !== null && ((L = d(Ze, L, Me)), Ve === null ? (pe = Ze) : (Ve.sibling = Ze), (Ve = Ze)));
					return ($e && Ni(U, Me), pe);
				}
				for (ve = l(ve); !Ze.done; Me++, Ze = I.next())
					((Ze = Y(ve, U, Me, Ze.value, te)),
						Ze !== null &&
							(t && Ze.alternate !== null && ve.delete(Ze.key === null ? Me : Ze.key),
							(L = d(Ze, L, Me)),
							Ve === null ? (pe = Ze) : (Ve.sibling = Ze),
							(Ve = Ze)));
				return (
					t &&
						ve.forEach(function (Jw) {
							return i(U, Jw);
						}),
					$e && Ni(U, Me),
					pe
				);
			}
			function tt(U, L, I, te) {
				if (
					(typeof I == "object" && I !== null && I.type === O && I.key === null && (I = I.props.children),
					typeof I == "object" && I !== null)
				) {
					switch (I.$$typeof) {
						case E:
							e: {
								for (var pe = I.key; L !== null; ) {
									if (L.key === pe) {
										if (((pe = I.type), pe === O)) {
											if (L.tag === 7) {
												(a(U, L.sibling), (te = c(L, I.props.children)), (te.return = U), (U = te));
												break e;
											}
										} else if (
											L.elementType === pe ||
											(typeof pe == "object" && pe !== null && pe.$$typeof === q && Fr(pe) === L.type)
										) {
											(a(U, L.sibling), (te = c(L, I.props)), $u(te, I), (te.return = U), (U = te));
											break e;
										}
										a(U, L);
										break;
									} else i(U, L);
									L = L.sibling;
								}
								I.type === O
									? ((te = Pr(I.props.children, U.mode, te, I.key)), (te.return = U), (U = te))
									: ((te = ns(I.type, I.key, I.props, null, U.mode, te)), $u(te, I), (te.return = U), (U = te));
							}
							return y(U);
						case x:
							e: {
								for (pe = I.key; L !== null; ) {
									if (L.key === pe)
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
								((te = kc(I, U.mode, te)), (te.return = U), (U = te));
							}
							return y(U);
						case q:
							return ((I = Fr(I)), tt(U, L, I, te));
					}
					if (R(I)) return he(U, L, I, te);
					if (ee(I)) {
						if (((pe = ee(I)), typeof pe != "function")) throw Error(s(150));
						return ((I = pe.call(I)), Te(U, L, I, te));
					}
					if (typeof I.then == "function") return tt(U, L, os(I), te);
					if (I.$$typeof === C) return tt(U, L, as(U, I), te);
					cs(U, I);
				}
				return (typeof I == "string" && I !== "") || typeof I == "number" || typeof I == "bigint"
					? ((I = "" + I),
						L !== null && L.tag === 6
							? (a(U, L.sibling), (te = c(L, I)), (te.return = U), (U = te))
							: (a(U, L), (te = Nc(I, U.mode, te)), (te.return = U), (U = te)),
						y(U))
					: a(U, L);
			}
			return function (U, L, I, te) {
				try {
					Uu = 0;
					var pe = tt(U, L, I, te);
					return ((qa = null), pe);
				} catch (ve) {
					if (ve === La || ve === ls) throw ve;
					var Ve = Nn(29, ve, null, U.mode);
					return ((Ve.lanes = te), (Ve.return = U), Ve);
				}
			};
		}
		var Jr = fv(!0),
			dv = fv(!1),
			cr = !1;
		function Zc(t) {
			t.updateQueue = {
				baseState: t.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: { pending: null, lanes: 0, hiddenCallbacks: null },
				callbacks: null,
			};
		}
		function Hc(t, i) {
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
			if (((l = l.shared), (He & 2) !== 0)) {
				var c = l.pending;
				return (
					c === null ? (i.next = i) : ((i.next = c.next), (c.next = i)),
					(l.pending = i),
					(i = ts(t)),
					Gm(t, null, a),
					i
				);
			}
			return (es(t, l, i, a), ts(t));
		}
		function Bu(t, i, a) {
			if (((i = i.updateQueue), i !== null && ((i = i.shared), (a & 4194048) !== 0))) {
				var l = i.lanes;
				((l &= t.pendingLanes), (a |= l), (i.lanes = a), xt(t, a));
			}
		}
		function Pc(t, i) {
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
		var Qc = !1;
		function Iu() {
			if (Qc) {
				var t = ja;
				if (t !== null) throw t;
			}
		}
		function Vu(t, i, a, l) {
			Qc = !1;
			var c = t.updateQueue;
			cr = !1;
			var d = c.firstBaseUpdate,
				y = c.lastBaseUpdate,
				T = c.shared.pending;
			if (T !== null) {
				c.shared.pending = null;
				var M = T,
					V = M.next;
				((M.next = null), y === null ? (d = V) : (y.next = V), (y = M));
				var W = t.alternate;
				W !== null &&
					((W = W.updateQueue),
					(T = W.lastBaseUpdate),
					T !== y && (T === null ? (W.firstBaseUpdate = V) : (T.next = V), (W.lastBaseUpdate = M)));
			}
			if (d !== null) {
				var ie = c.baseState;
				((y = 0), (W = V = M = null), (T = d));
				do {
					var H = T.lane & -536870913,
						Y = H !== T.lane;
					if (Y ? (qe & H) === H : (l & H) === H) {
						(H !== 0 && H === Da && (Qc = !0),
							W !== null && (W = W.next = { lane: 0, tag: T.tag, payload: T.payload, callback: null, next: null }));
						e: {
							var he = t,
								Te = T;
							H = i;
							var tt = a;
							switch (Te.tag) {
								case 1:
									if (((he = Te.payload), typeof he == "function")) {
										ie = he.call(tt, ie, H);
										break e;
									}
									ie = he;
									break e;
								case 3:
									he.flags = (he.flags & -65537) | 128;
								case 0:
									if (((he = Te.payload), (H = typeof he == "function" ? he.call(tt, ie, H) : he), H == null)) break e;
									ie = b({}, ie, H);
									break e;
								case 2:
									cr = !0;
							}
						}
						((H = T.callback),
							H !== null &&
								((t.flags |= 64),
								Y && (t.flags |= 8192),
								(Y = c.callbacks),
								Y === null ? (c.callbacks = [H]) : Y.push(H)));
					} else
						((Y = { lane: H, tag: T.tag, payload: T.payload, callback: T.callback, next: null }),
							W === null ? ((V = W = Y), (M = ie)) : (W = W.next = Y),
							(y |= H));
					if (((T = T.next), T === null)) {
						if (((T = c.shared.pending), T === null)) break;
						((Y = T), (T = Y.next), (Y.next = null), (c.lastBaseUpdate = Y), (c.shared.pending = null));
					}
				} while (!0);
				(W === null && (M = ie),
					(c.baseState = M),
					(c.firstBaseUpdate = V),
					(c.lastBaseUpdate = W),
					d === null && (c.shared.lanes = 0),
					(vr |= y),
					(t.lanes = y),
					(t.memoizedState = ie));
			}
		}
		function hv(t, i) {
			if (typeof t != "function") throw Error(s(191, t));
			t.call(i);
		}
		function mv(t, i) {
			var a = t.callbacks;
			if (a !== null) for (t.callbacks = null, t = 0; t < a.length; t++) hv(a[t], i);
		}
		var Ua = N(null),
			fs = N(0);
		function vv(t, i) {
			((t = Ii), re(fs, t), re(Ua, i), (Ii = t | i.baseLanes));
		}
		function Kc() {
			(re(fs, Ii), re(Ua, Ua.current));
		}
		function Yc() {
			((Ii = fs.current), X(Ua), X(fs));
		}
		var kn = N(null),
			Qn = null;
		function fr(t) {
			var i = t.alternate;
			(re(kt, kt.current & 1),
				re(kn, t),
				Qn === null && (i === null || Ua.current !== null || i.memoizedState !== null) && (Qn = t));
		}
		function Gc(t) {
			(re(kt, kt.current), re(kn, t), Qn === null && (Qn = t));
		}
		function gv(t) {
			t.tag === 22 ? (re(kt, kt.current), re(kn, t), Qn === null && (Qn = t)) : dr(t);
		}
		function dr() {
			(re(kt, kt.current), re(kn, kn.current));
		}
		function Mn(t) {
			(X(kn), Qn === t && (Qn = null), X(kt));
		}
		var kt = N(0);
		function ds(t) {
			for (var i = t; i !== null; ) {
				if (i.tag === 13) {
					var a = i.memoizedState;
					if (a !== null && ((a = a.dehydrated), a === null || td(a) || nd(a))) return i;
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
		var zi = 0,
			ke = null,
			We = null,
			Ut = null,
			hs = !1,
			$a = !1,
			ta = !1,
			ms = 0,
			Zu = 0,
			Ba = null,
			US = 0;
		function Rt() {
			throw Error(s(321));
		}
		function Fc(t, i) {
			if (i === null) return !1;
			for (var a = 0; a < i.length && a < t.length; a++) if (!On(t[a], i[a])) return !1;
			return !0;
		}
		function Xc(t, i, a, l, c, d) {
			return (
				(zi = d),
				(ke = i),
				(i.memoizedState = null),
				(i.updateQueue = null),
				(i.lanes = 0),
				($.H = t === null || t.memoizedState === null ? Wv : hf),
				(ta = !1),
				(d = a(l, c)),
				(ta = !1),
				$a && (d = pv(i, a, l, c)),
				yv(t),
				d
			);
		}
		function yv(t) {
			$.H = Qu;
			var i = We !== null && We.next !== null;
			if (((zi = 0), (Ut = We = ke = null), (hs = !1), (Zu = 0), (Ba = null), i)) throw Error(s(300));
			t === null || $t || ((t = t.dependencies), t !== null && rs(t) && ($t = !0));
		}
		function pv(t, i, a, l) {
			ke = t;
			var c = 0;
			do {
				if (($a && (Ba = null), (Zu = 0), ($a = !1), 25 <= c)) throw Error(s(301));
				if (((c += 1), (Ut = We = null), t.updateQueue != null)) {
					var d = t.updateQueue;
					((d.lastEffect = null), (d.events = null), (d.stores = null), d.memoCache != null && (d.memoCache.index = 0));
				}
				(($.H = eg), (d = i(a, l)));
			} while ($a);
			return d;
		}
		function $S() {
			var t = $.H,
				i = t.useState()[0];
			return (
				(i = typeof i.then == "function" ? Hu(i) : i),
				(t = t.useState()[0]),
				(We !== null ? We.memoizedState : null) !== t && (ke.flags |= 1024),
				i
			);
		}
		function Jc() {
			var t = ms !== 0;
			return ((ms = 0), t);
		}
		function Wc(t, i, a) {
			((i.updateQueue = t.updateQueue), (i.flags &= -2053), (t.lanes &= ~a));
		}
		function ef(t) {
			if (hs) {
				for (t = t.memoizedState; t !== null; ) {
					var i = t.queue;
					(i !== null && (i.pending = null), (t = t.next));
				}
				hs = !1;
			}
			((zi = 0), (Ut = We = ke = null), ($a = !1), (Zu = ms = 0), (Ba = null));
		}
		function hn() {
			var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
			return (Ut === null ? (ke.memoizedState = Ut = t) : (Ut = Ut.next = t), Ut);
		}
		function Mt() {
			if (We === null) {
				var t = ke.alternate;
				t = t !== null ? t.memoizedState : null;
			} else t = We.next;
			var i = Ut === null ? ke.memoizedState : Ut.next;
			if (i !== null) ((Ut = i), (We = t));
			else {
				if (t === null) throw ke.alternate === null ? Error(s(467)) : Error(s(310));
				((We = t),
					(t = {
						memoizedState: We.memoizedState,
						baseState: We.baseState,
						baseQueue: We.baseQueue,
						queue: We.queue,
						next: null,
					}),
					Ut === null ? (ke.memoizedState = Ut = t) : (Ut = Ut.next = t));
			}
			return Ut;
		}
		function vs() {
			return { lastEffect: null, events: null, stores: null, memoCache: null };
		}
		function Hu(t) {
			var i = Zu;
			return (
				(Zu += 1),
				Ba === null && (Ba = []),
				(t = sv(Ba, t, i)),
				(i = ke),
				(Ut === null ? i.memoizedState : Ut.next) === null &&
					((i = i.alternate), ($.H = i === null || i.memoizedState === null ? Wv : hf)),
				t
			);
		}
		function gs(t) {
			if (t !== null && typeof t == "object") {
				if (typeof t.then == "function") return Hu(t);
				if (t.$$typeof === C) return un(t);
			}
			throw Error(s(438, String(t)));
		}
		function tf(t) {
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
				a === null && ((a = vs()), (ke.updateQueue = a)),
				(a.memoCache = i),
				(a = i.data[i.index]),
				a === void 0)
			)
				for (a = i.data[i.index] = Array(t), l = 0; l < t; l++) a[l] = B;
			return (i.index++, a);
		}
		function Di(t, i) {
			return typeof i == "function" ? i(t) : i;
		}
		function ys(t) {
			return nf(Mt(), We, t);
		}
		function nf(t, i, a) {
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
					W = !1;
				do {
					var ie = V.lane & -536870913;
					if (ie !== V.lane ? (qe & ie) === ie : (zi & ie) === ie) {
						var H = V.revertLane;
						if (H === 0)
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
								ie === Da && (W = !0));
						else if ((zi & H) === H) {
							((V = V.next), H === Da && (W = !0));
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
								(ke.lanes |= H),
								(vr |= H));
						((ie = V.action), ta && a(d, ie), (d = V.hasEagerState ? V.eagerState : a(d, ie)));
					} else
						((H = {
							lane: ie,
							revertLane: V.revertLane,
							gesture: V.gesture,
							action: V.action,
							hasEagerState: V.hasEagerState,
							eagerState: V.eagerState,
							next: null,
						}),
							M === null ? ((T = M = H), (y = d)) : (M = M.next = H),
							(ke.lanes |= ie),
							(vr |= ie));
					V = V.next;
				} while (V !== null && V !== i);
				if ((M === null ? (y = d) : (M.next = T), !On(d, t.memoizedState) && (($t = !0), W && ((a = ja), a !== null))))
					throw a;
				((t.memoizedState = d), (t.baseState = y), (t.baseQueue = M), (l.lastRenderedState = d));
			}
			return (c === null && (l.lanes = 0), [t.memoizedState, l.dispatch]);
		}
		function rf(t) {
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
				(On(d, i.memoizedState) || ($t = !0),
					(i.memoizedState = d),
					i.baseQueue === null && (i.baseState = d),
					(a.lastRenderedState = d));
			}
			return [d, l];
		}
		function bv(t, i, a) {
			var l = ke,
				c = Mt(),
				d = $e;
			if (d) {
				if (a === void 0) throw Error(s(407));
				a = a();
			} else a = i();
			var y = !On((We || c).memoizedState, a);
			if (
				(y && ((c.memoizedState = a), ($t = !0)),
				(c = c.queue),
				lf(wv.bind(null, l, c, t), [t]),
				c.getSnapshot !== i || y || (Ut !== null && Ut.memoizedState.tag & 1))
			) {
				if (((l.flags |= 2048), Ia(9, { destroy: void 0 }, Sv.bind(null, l, c, a, i), null), it === null))
					throw Error(s(349));
				d || (zi & 127) !== 0 || _v(l, i, a);
			}
			return a;
		}
		function _v(t, i, a) {
			((t.flags |= 16384),
				(t = { getSnapshot: i, value: a }),
				(i = ke.updateQueue),
				i === null
					? ((i = vs()), (ke.updateQueue = i), (i.stores = [t]))
					: ((a = i.stores), a === null ? (i.stores = [t]) : a.push(t)));
		}
		function Sv(t, i, a, l) {
			((i.value = a), (i.getSnapshot = l), Ev(i) && Tv(t));
		}
		function wv(t, i, a) {
			return a(function () {
				Ev(i) && Tv(t);
			});
		}
		function Ev(t) {
			var i = t.getSnapshot;
			t = t.value;
			try {
				var a = i();
				return !On(t, a);
			} catch {
				return !0;
			}
		}
		function Tv(t) {
			var i = Hr(t, 2);
			i !== null && En(i, t, 2);
		}
		function af(t) {
			var i = hn();
			if (typeof t == "function") {
				var a = t;
				if (((t = a()), ta)) {
					en(!0);
					try {
						a();
					} finally {
						en(!1);
					}
				}
			}
			return (
				(i.memoizedState = i.baseState = t),
				(i.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Di, lastRenderedState: t }),
				i
			);
		}
		function xv(t, i, a, l) {
			return ((t.baseState = a), nf(t, We, typeof l == "function" ? l : Di));
		}
		function BS(t, i, a, l, c) {
			if (_s(t)) throw Error(s(485));
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
					a === null ? ((d.next = i.pending = d), Av(i, d)) : ((d.next = a.next), (i.pending = a.next = d)));
			}
		}
		function Av(t, i) {
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
					(M !== null && M(y, T), Cv(t, i, T));
				} catch (V) {
					uf(t, i, V);
				} finally {
					(d !== null && y.types !== null && (d.types = y.types), ($.T = d));
				}
			} else
				try {
					((d = a(c, l)), Cv(t, i, d));
				} catch (V) {
					uf(t, i, V);
				}
		}
		function Cv(t, i, a) {
			a !== null && typeof a == "object" && typeof a.then == "function"
				? a.then(
						function (l) {
							Rv(t, i, l);
						},
						function (l) {
							return uf(t, i, l);
						},
					)
				: Rv(t, i, a);
		}
		function Rv(t, i, a) {
			((i.status = "fulfilled"),
				(i.value = a),
				Ov(i),
				(t.state = a),
				(i = t.pending),
				i !== null && ((a = i.next), a === i ? (t.pending = null) : ((a = a.next), (i.next = a), Av(t, a))));
		}
		function uf(t, i, a) {
			var l = t.pending;
			if (((t.pending = null), l !== null)) {
				l = l.next;
				do ((i.status = "rejected"), (i.reason = a), Ov(i), (i = i.next));
				while (i !== l);
			}
			t.action = null;
		}
		function Ov(t) {
			t = t.listeners;
			for (var i = 0; i < t.length; i++) (0, t[i])();
		}
		function Nv(t, i) {
			return i;
		}
		function kv(t, i) {
			if ($e) {
				var a = it.formState;
				if (a !== null) {
					e: {
						var l = ke;
						if ($e) {
							if (ct) {
								t: {
									for (var c = ct, d = Pn; c.nodeType !== 8; ) {
										if (!d) {
											c = null;
											break t;
										}
										if (((c = Yn(c.nextSibling)), c === null)) {
											c = null;
											break t;
										}
									}
									((d = c.data), (c = d === "F!" || d === "F" ? c : null));
								}
								if (c) {
									((ct = Yn(c.nextSibling)), (l = c.data === "F!"));
									break e;
								}
							}
							sr(l);
						}
						l = !1;
					}
					l && (i = a[0]);
				}
			}
			return (
				(a = hn()),
				(a.memoizedState = a.baseState = i),
				(l = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Nv, lastRenderedState: i }),
				(a.queue = l),
				(a = Fv.bind(null, ke, l)),
				(l.dispatch = a),
				(l = af(!1)),
				(d = df.bind(null, ke, !1, l.queue)),
				(l = hn()),
				(c = { state: i, dispatch: null, action: t, pending: null }),
				(l.queue = c),
				(a = BS.bind(null, ke, c, d, a)),
				(c.dispatch = a),
				(l.memoizedState = t),
				[i, a, !1]
			);
		}
		function Mv(t) {
			return zv(Mt(), We, t);
		}
		function zv(t, i, a) {
			if (((i = nf(t, i, Nv)[0]), (t = ys(Di)[0]), typeof i == "object" && i !== null && typeof i.then == "function"))
				try {
					var l = Hu(i);
				} catch (y) {
					throw y === La ? ls : y;
				}
			else l = i;
			i = Mt();
			var c = i.queue,
				d = c.dispatch;
			return (
				a !== i.memoizedState && ((ke.flags |= 2048), Ia(9, { destroy: void 0 }, IS.bind(null, c, a), null)),
				[l, d, t]
			);
		}
		function IS(t, i) {
			t.action = i;
		}
		function Dv(t) {
			var i = Mt(),
				a = We;
			if (a !== null) return zv(i, a, t);
			(Mt(), (i = i.memoizedState), (a = Mt()));
			var l = a.queue.dispatch;
			return ((a.memoizedState = t), [i, l, !1]);
		}
		function Ia(t, i, a, l) {
			return (
				(t = { tag: t, create: a, deps: l, inst: i, next: null }),
				(i = ke.updateQueue),
				i === null && ((i = vs()), (ke.updateQueue = i)),
				(a = i.lastEffect),
				a === null ? (i.lastEffect = t.next = t) : ((l = a.next), (a.next = t), (t.next = l), (i.lastEffect = t)),
				t
			);
		}
		function jv() {
			return Mt().memoizedState;
		}
		function ps(t, i, a, l) {
			var c = hn();
			((ke.flags |= t), (c.memoizedState = Ia(1 | i, { destroy: void 0 }, a, l === void 0 ? null : l)));
		}
		function bs(t, i, a, l) {
			var c = Mt();
			l = l === void 0 ? null : l;
			var d = c.memoizedState.inst;
			We !== null && l !== null && Fc(l, We.memoizedState.deps)
				? (c.memoizedState = Ia(i, d, a, l))
				: ((ke.flags |= t), (c.memoizedState = Ia(1 | i, d, a, l)));
		}
		function Lv(t, i) {
			ps(8390656, 8, t, i);
		}
		function lf(t, i) {
			bs(2048, 8, t, i);
		}
		function VS(t) {
			ke.flags |= 4;
			var i = ke.updateQueue;
			if (i === null) ((i = vs()), (ke.updateQueue = i), (i.events = [t]));
			else {
				var a = i.events;
				a === null ? (i.events = [t]) : a.push(t);
			}
		}
		function qv(t) {
			var i = Mt().memoizedState;
			return (
				VS({ ref: i, nextImpl: t }),
				function () {
					if ((He & 2) !== 0) throw Error(s(440));
					return i.impl.apply(void 0, arguments);
				}
			);
		}
		function Uv(t, i) {
			return bs(4, 2, t, i);
		}
		function $v(t, i) {
			return bs(4, 4, t, i);
		}
		function Bv(t, i) {
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
		function Iv(t, i, a) {
			((a = a != null ? a.concat([t]) : null), bs(4, 4, Bv.bind(null, i, t), a));
		}
		function sf() {}
		function Vv(t, i) {
			var a = Mt();
			i = i === void 0 ? null : i;
			var l = a.memoizedState;
			return i !== null && Fc(i, l[1]) ? l[0] : ((a.memoizedState = [t, i]), t);
		}
		function Zv(t, i) {
			var a = Mt();
			i = i === void 0 ? null : i;
			var l = a.memoizedState;
			if (i !== null && Fc(i, l[1])) return l[0];
			if (((l = t()), ta)) {
				en(!0);
				try {
					t();
				} finally {
					en(!1);
				}
			}
			return ((a.memoizedState = [l, i]), l);
		}
		function of(t, i, a) {
			return a === void 0 || ((zi & 1073741824) !== 0 && (qe & 261930) === 0)
				? (t.memoizedState = i)
				: ((t.memoizedState = a), (t = Ig()), (ke.lanes |= t), (vr |= t), a);
		}
		function Hv(t, i, a, l) {
			return On(a, i)
				? a
				: Ua.current !== null
					? ((t = of(t, a, l)), On(t, i) || ($t = !0), t)
					: (zi & 42) === 0 || ((zi & 1073741824) !== 0 && (qe & 261930) === 0)
						? (($t = !0), (t.memoizedState = a))
						: ((t = Ig()), (ke.lanes |= t), (vr |= t), i);
		}
		function Pv(t, i, a, l, c) {
			var d = P.p;
			P.p = d !== 0 && 8 > d ? d : 8;
			var y = $.T,
				T = {};
			(($.T = T), df(t, !1, i, a));
			try {
				var M = c(),
					V = $.S;
				(V !== null && V(T, M),
					M !== null && typeof M == "object" && typeof M.then == "function"
						? Pu(t, i, qS(M, l), Kn(t))
						: Pu(t, i, l, Kn(t)));
			} catch (W) {
				Pu(t, i, { then: function () {}, status: "rejected", reason: W }, Kn());
			} finally {
				((P.p = d), y !== null && T.types !== null && (y.types = T.types), ($.T = y));
			}
		}
		function ZS() {}
		function cf(t, i, a, l) {
			if (t.tag !== 5) throw Error(s(476));
			var c = Qv(t).queue;
			Pv(
				t,
				c,
				i,
				le,
				a === null
					? ZS
					: function () {
							return (Kv(t), a(l));
						},
			);
		}
		function Qv(t) {
			var i = t.memoizedState;
			if (i !== null) return i;
			i = {
				memoizedState: le,
				baseState: le,
				baseQueue: null,
				queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Di, lastRenderedState: le },
				next: null,
			};
			var a = {};
			return (
				(i.next = {
					memoizedState: a,
					baseState: a,
					baseQueue: null,
					queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Di, lastRenderedState: a },
					next: null,
				}),
				(t.memoizedState = i),
				(t = t.alternate),
				t !== null && (t.memoizedState = i),
				i
			);
		}
		function Kv(t) {
			var i = Qv(t);
			(i.next === null && (i = t.alternate.memoizedState), Pu(t, i.next.queue, {}, Kn()));
		}
		function ff() {
			return un(sl);
		}
		function Yv() {
			return Mt().memoizedState;
		}
		function Gv() {
			return Mt().memoizedState;
		}
		function HS(t) {
			for (var i = t.return; i !== null; ) {
				switch (i.tag) {
					case 24:
					case 3:
						var a = Kn();
						t = Wr(a);
						var l = ea(i, t, a);
						(l !== null && (En(l, i, a), Bu(l, i, a)), (i = { cache: $c() }), (t.payload = i));
						return;
				}
				i = i.return;
			}
		}
		function PS(t, i, a) {
			var l = Kn();
			((a = { lane: l, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null }),
				_s(t) ? Xv(i, a) : ((a = Rc(t, i, a, l)), a !== null && (En(a, t, l), Jv(a, i, l))));
		}
		function Fv(t, i, a) {
			Pu(t, i, a, Kn());
		}
		function Pu(t, i, a, l) {
			var c = { lane: l, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null };
			if (_s(t)) Xv(i, c);
			else {
				var d = t.alternate;
				if (t.lanes === 0 && (d === null || d.lanes === 0) && ((d = i.lastRenderedReducer), d !== null))
					try {
						var y = i.lastRenderedState,
							T = d(y, a);
						if (((c.hasEagerState = !0), (c.eagerState = T), On(T, y)))
							return (es(t, i, c, 0), it === null && Wl(), !1);
					} catch {}
				if (((a = Rc(t, i, c, l)), a !== null)) return (En(a, t, l), Jv(a, i, l), !0);
			}
			return !1;
		}
		function df(t, i, a, l) {
			if (
				((l = { lane: 2, revertLane: Hf(), gesture: null, action: l, hasEagerState: !1, eagerState: null, next: null }),
				_s(t))
			) {
				if (i) throw Error(s(479));
			} else ((i = Rc(t, a, l, 2)), i !== null && En(i, t, 2));
		}
		function _s(t) {
			var i = t.alternate;
			return t === ke || (i !== null && i === ke);
		}
		function Xv(t, i) {
			$a = hs = !0;
			var a = t.pending;
			(a === null ? (i.next = i) : ((i.next = a.next), (a.next = i)), (t.pending = i));
		}
		function Jv(t, i, a) {
			if ((a & 4194048) !== 0) {
				var l = i.lanes;
				((l &= t.pendingLanes), (a |= l), (i.lanes = a), xt(t, a));
			}
		}
		var Qu = {
			readContext: un,
			use: gs,
			useCallback: Rt,
			useContext: Rt,
			useEffect: Rt,
			useImperativeHandle: Rt,
			useLayoutEffect: Rt,
			useInsertionEffect: Rt,
			useMemo: Rt,
			useReducer: Rt,
			useRef: Rt,
			useState: Rt,
			useDebugValue: Rt,
			useDeferredValue: Rt,
			useTransition: Rt,
			useSyncExternalStore: Rt,
			useId: Rt,
			useHostTransitionStatus: Rt,
			useFormState: Rt,
			useActionState: Rt,
			useOptimistic: Rt,
			useMemoCache: Rt,
			useCacheRefresh: Rt,
		};
		Qu.useEffectEvent = Rt;
		var Wv = {
				readContext: un,
				use: gs,
				useCallback: function (t, i) {
					return ((hn().memoizedState = [t, i === void 0 ? null : i]), t);
				},
				useContext: un,
				useEffect: Lv,
				useImperativeHandle: function (t, i, a) {
					((a = a != null ? a.concat([t]) : null), ps(4194308, 4, Bv.bind(null, i, t), a));
				},
				useLayoutEffect: function (t, i) {
					return ps(4194308, 4, t, i);
				},
				useInsertionEffect: function (t, i) {
					ps(4, 2, t, i);
				},
				useMemo: function (t, i) {
					var a = hn();
					i = i === void 0 ? null : i;
					var l = t();
					if (ta) {
						en(!0);
						try {
							t();
						} finally {
							en(!1);
						}
					}
					return ((a.memoizedState = [l, i]), l);
				},
				useReducer: function (t, i, a) {
					var l = hn();
					if (a !== void 0) {
						var c = a(i);
						if (ta) {
							en(!0);
							try {
								a(i);
							} finally {
								en(!1);
							}
						}
					} else c = i;
					return (
						(l.memoizedState = l.baseState = c),
						(t = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: c }),
						(l.queue = t),
						(t = t.dispatch = PS.bind(null, ke, t)),
						[l.memoizedState, t]
					);
				},
				useRef: function (t) {
					var i = hn();
					return ((t = { current: t }), (i.memoizedState = t));
				},
				useState: function (t) {
					t = af(t);
					var i = t.queue,
						a = Fv.bind(null, ke, i);
					return ((i.dispatch = a), [t.memoizedState, a]);
				},
				useDebugValue: sf,
				useDeferredValue: function (t, i) {
					return of(hn(), t, i);
				},
				useTransition: function () {
					var t = af(!1);
					return ((t = Pv.bind(null, ke, t.queue, !0, !1)), (hn().memoizedState = t), [!1, t]);
				},
				useSyncExternalStore: function (t, i, a) {
					var l = ke,
						c = hn();
					if ($e) {
						if (a === void 0) throw Error(s(407));
						a = a();
					} else {
						if (((a = i()), it === null)) throw Error(s(349));
						(qe & 127) !== 0 || _v(l, i, a);
					}
					c.memoizedState = a;
					var d = { value: a, getSnapshot: i };
					return (
						(c.queue = d),
						Lv(wv.bind(null, l, d, t), [t]),
						(l.flags |= 2048),
						Ia(9, { destroy: void 0 }, Sv.bind(null, l, d, a, i), null),
						a
					);
				},
				useId: function () {
					var t = hn(),
						i = it.identifierPrefix;
					if ($e) {
						var a = mi,
							l = hi;
						((a = (l & ~(1 << (32 - jt(l) - 1))).toString(32) + a),
							(i = "_" + i + "R_" + a),
							(a = ms++),
							0 < a && (i += "H" + a.toString(32)),
							(i += "_"));
					} else ((a = US++), (i = "_" + i + "r_" + a.toString(32) + "_"));
					return (t.memoizedState = i);
				},
				useHostTransitionStatus: ff,
				useFormState: kv,
				useActionState: kv,
				useOptimistic: function (t) {
					var i = hn();
					i.memoizedState = i.baseState = t;
					var a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
					return ((i.queue = a), (i = df.bind(null, ke, !0, a)), (a.dispatch = i), [t, i]);
				},
				useMemoCache: tf,
				useCacheRefresh: function () {
					return (hn().memoizedState = HS.bind(null, ke));
				},
				useEffectEvent: function (t) {
					var i = hn(),
						a = { impl: t };
					return (
						(i.memoizedState = a),
						function () {
							if ((He & 2) !== 0) throw Error(s(440));
							return a.impl.apply(void 0, arguments);
						}
					);
				},
			},
			hf = {
				readContext: un,
				use: gs,
				useCallback: Vv,
				useContext: un,
				useEffect: lf,
				useImperativeHandle: Iv,
				useInsertionEffect: Uv,
				useLayoutEffect: $v,
				useMemo: Zv,
				useReducer: ys,
				useRef: jv,
				useState: function () {
					return ys(Di);
				},
				useDebugValue: sf,
				useDeferredValue: function (t, i) {
					return Hv(Mt(), We.memoizedState, t, i);
				},
				useTransition: function () {
					var t = ys(Di)[0],
						i = Mt().memoizedState;
					return [typeof t == "boolean" ? t : Hu(t), i];
				},
				useSyncExternalStore: bv,
				useId: Yv,
				useHostTransitionStatus: ff,
				useFormState: Mv,
				useActionState: Mv,
				useOptimistic: function (t, i) {
					return xv(Mt(), We, t, i);
				},
				useMemoCache: tf,
				useCacheRefresh: Gv,
			};
		hf.useEffectEvent = qv;
		var eg = {
			readContext: un,
			use: gs,
			useCallback: Vv,
			useContext: un,
			useEffect: lf,
			useImperativeHandle: Iv,
			useInsertionEffect: Uv,
			useLayoutEffect: $v,
			useMemo: Zv,
			useReducer: rf,
			useRef: jv,
			useState: function () {
				return rf(Di);
			},
			useDebugValue: sf,
			useDeferredValue: function (t, i) {
				var a = Mt();
				return We === null ? of(a, t, i) : Hv(a, We.memoizedState, t, i);
			},
			useTransition: function () {
				var t = rf(Di)[0],
					i = Mt().memoizedState;
				return [typeof t == "boolean" ? t : Hu(t), i];
			},
			useSyncExternalStore: bv,
			useId: Yv,
			useHostTransitionStatus: ff,
			useFormState: Dv,
			useActionState: Dv,
			useOptimistic: function (t, i) {
				var a = Mt();
				return We !== null ? xv(a, We, t, i) : ((a.baseState = t), [t, a.queue.dispatch]);
			},
			useMemoCache: tf,
			useCacheRefresh: Gv,
		};
		eg.useEffectEvent = qv;
		function mf(t, i, a, l) {
			((i = t.memoizedState),
				(a = a(l, i)),
				(a = a == null ? i : b({}, i, a)),
				(t.memoizedState = a),
				t.lanes === 0 && (t.updateQueue.baseState = a));
		}
		var vf = {
			enqueueSetState: function (t, i, a) {
				t = t._reactInternals;
				var l = Kn(),
					c = Wr(l);
				((c.payload = i), a != null && (c.callback = a), (i = ea(t, c, l)), i !== null && (En(i, t, l), Bu(i, t, l)));
			},
			enqueueReplaceState: function (t, i, a) {
				t = t._reactInternals;
				var l = Kn(),
					c = Wr(l);
				((c.tag = 1),
					(c.payload = i),
					a != null && (c.callback = a),
					(i = ea(t, c, l)),
					i !== null && (En(i, t, l), Bu(i, t, l)));
			},
			enqueueForceUpdate: function (t, i) {
				t = t._reactInternals;
				var a = Kn(),
					l = Wr(a);
				((l.tag = 2), i != null && (l.callback = i), (i = ea(t, l, a)), i !== null && (En(i, t, a), Bu(i, t, a)));
			},
		};
		function tg(t, i, a, l, c, d, y) {
			return (
				(t = t.stateNode),
				typeof t.shouldComponentUpdate == "function"
					? t.shouldComponentUpdate(l, d, y)
					: i.prototype && i.prototype.isPureReactComponent
						? !Mu(a, l) || !Mu(c, d)
						: !0
			);
		}
		function ng(t, i, a, l) {
			((t = i.state),
				typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(a, l),
				typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(a, l),
				i.state !== t && vf.enqueueReplaceState(i, i.state, null));
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
		function QS(t) {
			Jl(t);
		}
		function KS(t) {
			console.error(t);
		}
		function YS(t) {
			Jl(t);
		}
		function Ss(t, i) {
			try {
				var a = t.onUncaughtError;
				a(i.value, { componentStack: i.stack });
			} catch (l) {
				setTimeout(function () {
					throw l;
				});
			}
		}
		function ig(t, i, a) {
			try {
				var l = t.onCaughtError;
				l(a.value, { componentStack: a.stack, errorBoundary: i.tag === 1 ? i.stateNode : null });
			} catch (c) {
				setTimeout(function () {
					throw c;
				});
			}
		}
		function gf(t, i, a) {
			return (
				(a = Wr(a)),
				(a.tag = 3),
				(a.payload = { element: null }),
				(a.callback = function () {
					Ss(t, i);
				}),
				a
			);
		}
		function rg(t) {
			return ((t = Wr(t)), (t.tag = 3), t);
		}
		function ag(t, i, a, l) {
			var c = a.type.getDerivedStateFromError;
			if (typeof c == "function") {
				var d = l.value;
				((t.payload = function () {
					return c(d);
				}),
					(t.callback = function () {
						ig(i, a, l);
					}));
			}
			var y = a.stateNode;
			y !== null &&
				typeof y.componentDidCatch == "function" &&
				(t.callback = function () {
					(ig(i, a, l), typeof c != "function" && (gr === null ? (gr = new Set([this])) : gr.add(this)));
					var T = l.stack;
					this.componentDidCatch(l.value, { componentStack: T !== null ? T : "" });
				});
		}
		function GS(t, i, a, l, c) {
			if (((a.flags |= 32768), l !== null && typeof l == "object" && typeof l.then == "function")) {
				if (((i = a.alternate), i !== null && za(i, a, c, !0), (a = kn.current), a !== null)) {
					switch (a.tag) {
						case 31:
						case 13:
							return (
								Qn === null ? zs() : a.alternate === null && Ot === 0 && (Ot = 3),
								(a.flags &= -257),
								(a.flags |= 65536),
								(a.lanes = c),
								l === ss
									? (a.flags |= 16384)
									: ((i = a.updateQueue), i === null ? (a.updateQueue = new Set([l])) : i.add(l), If(t, l, c)),
								!1
							);
						case 22:
							return (
								(a.flags |= 65536),
								l === ss
									? (a.flags |= 16384)
									: ((i = a.updateQueue),
										i === null
											? ((i = { transitions: null, markerInstances: null, retryQueue: new Set([l]) }),
												(a.updateQueue = i))
											: ((a = i.retryQueue), a === null ? (i.retryQueue = new Set([l])) : a.add(l)),
										If(t, l, c)),
								!1
							);
					}
					throw Error(s(435, a.tag));
				}
				return (If(t, l, c), zs(), !1);
			}
			if ($e)
				return (
					(i = kn.current),
					i !== null
						? ((i.flags & 65536) === 0 && (i.flags |= 256),
							(i.flags |= 65536),
							(i.lanes = c),
							l !== Dc && ((t = Error(s(422), { cause: l })), ju(Vn(t, a))))
						: (l !== Dc && ((i = Error(s(423), { cause: l })), ju(Vn(i, a))),
							(t = t.current.alternate),
							(t.flags |= 65536),
							(c &= -c),
							(t.lanes |= c),
							(l = Vn(l, a)),
							(c = gf(t.stateNode, l, c)),
							Pc(t, c),
							Ot !== 4 && (Ot = 2)),
					!1
				);
			var d = Error(s(520), { cause: l });
			if (((d = Vn(d, a)), el === null ? (el = [d]) : el.push(d), Ot !== 4 && (Ot = 2), i === null)) return !0;
			((l = Vn(l, a)), (a = i));
			do {
				switch (a.tag) {
					case 3:
						return ((a.flags |= 65536), (t = c & -c), (a.lanes |= t), (t = gf(a.stateNode, l, t)), Pc(a, t), !1);
					case 1:
						if (
							((i = a.type),
							(d = a.stateNode),
							(a.flags & 128) === 0 &&
								(typeof i.getDerivedStateFromError == "function" ||
									(d !== null && typeof d.componentDidCatch == "function" && (gr === null || !gr.has(d)))))
						)
							return ((a.flags |= 65536), (c &= -c), (a.lanes |= c), (c = rg(c)), ag(c, t, a, l), Pc(a, c), !1);
				}
				a = a.return;
			} while (a !== null);
			return !1;
		}
		var yf = Error(s(461)),
			$t = !1;
		function ln(t, i, a, l) {
			i.child = t === null ? dv(i, null, a, l) : Jr(i, t.child, a, l);
		}
		function ug(t, i, a, l, c) {
			a = a.render;
			var d = i.ref;
			if ("ref" in l) {
				var y = {};
				for (var T in l) T !== "ref" && (y[T] = l[T]);
			} else y = l;
			return (
				Yr(i),
				(l = Xc(t, i, a, y, d, c)),
				(T = Jc()),
				t !== null && !$t ? (Wc(t, i, c), ji(t, i, c)) : ($e && T && Mc(i), (i.flags |= 1), ln(t, i, l, c), i.child)
			);
		}
		function lg(t, i, a, l, c) {
			if (t === null) {
				var d = a.type;
				return typeof d == "function" && !Oc(d) && d.defaultProps === void 0 && a.compare === null
					? ((i.tag = 15), (i.type = d), sg(t, i, d, l, c))
					: ((t = ns(a.type, null, l, i, i.mode, c)), (t.ref = i.ref), (t.return = i), (i.child = t));
			}
			if (((d = t.child), !xf(t, c))) {
				var y = d.memoizedProps;
				if (((a = a.compare), (a = a !== null ? a : Mu), a(y, l) && t.ref === i.ref)) return ji(t, i, c);
			}
			return ((i.flags |= 1), (t = Oi(d, l)), (t.ref = i.ref), (t.return = i), (i.child = t));
		}
		function sg(t, i, a, l, c) {
			if (t !== null) {
				var d = t.memoizedProps;
				if (Mu(d, l) && t.ref === i.ref)
					if ((($t = !1), (i.pendingProps = l = d), xf(t, c))) (t.flags & 131072) !== 0 && ($t = !0);
					else return ((i.lanes = t.lanes), ji(t, i, c));
			}
			return pf(t, i, a, l, c);
		}
		function og(t, i, a, l) {
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
					return cg(t, i, d, a, l);
				}
				if ((a & 536870912) !== 0)
					((i.memoizedState = { baseLanes: 0, cachePool: null }),
						t !== null && us(i, d !== null ? d.cachePool : null),
						d !== null ? vv(i, d) : Kc(),
						gv(i));
				else return ((l = i.lanes = 536870912), cg(t, i, d !== null ? d.baseLanes | a : a, a, l));
			} else
				d !== null
					? (us(i, d.cachePool), vv(i, d), dr(i), (i.memoizedState = null))
					: (t !== null && us(i, null), Kc(), dr(i));
			return (ln(t, i, c, a), i.child);
		}
		function Ku(t, i) {
			return (
				(t !== null && t.tag === 22) ||
					i.stateNode !== null ||
					(i.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				i.sibling
			);
		}
		function cg(t, i, a, l, c) {
			var d = Ic();
			return (
				(d = d === null ? null : { parent: qt._currentValue, pool: d }),
				(i.memoizedState = { baseLanes: a, cachePool: d }),
				t !== null && us(i, null),
				Kc(),
				gv(i),
				t !== null && za(t, i, l, !0),
				(i.childLanes = c),
				null
			);
		}
		function ws(t, i) {
			return (
				(i = Ts({ mode: i.mode, children: i.children }, t.mode)),
				(i.ref = t.ref),
				(t.child = i),
				(i.return = t),
				i
			);
		}
		function fg(t, i, a) {
			return (Jr(i, t.child, null, a), (t = ws(i, i.pendingProps)), (t.flags |= 2), Mn(i), (i.memoizedState = null), t);
		}
		function FS(t, i, a) {
			var l = i.pendingProps,
				c = (i.flags & 128) !== 0;
			if (((i.flags &= -129), t === null)) {
				if ($e) {
					if (l.mode === "hidden") return ((t = ws(i, l)), (i.lanes = 536870912), Ku(null, t));
					if (
						(Gc(i),
						(t = ct)
							? ((t = Ty(t, Pn)),
								(t = t !== null && t.data === "&" ? t : null),
								t !== null &&
									((i.memoizedState = {
										dehydrated: t,
										treeContext: ur !== null ? { id: hi, overflow: mi } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = Xm(t)),
									(a.return = i),
									(i.child = a),
									(an = i),
									(ct = null)))
							: (t = null),
						t === null)
					)
						throw sr(i);
					return ((i.lanes = 536870912), null);
				}
				return ws(i, l);
			}
			var d = t.memoizedState;
			if (d !== null) {
				var y = d.dehydrated;
				if ((Gc(i), c))
					if (i.flags & 256) ((i.flags &= -257), (i = fg(t, i, a)));
					else if (i.memoizedState !== null) ((i.child = t.child), (i.flags |= 128), (i = null));
					else throw Error(s(558));
				else if (($t || za(t, i, a, !1), (c = (a & t.childLanes) !== 0), $t || c)) {
					if (((l = it), l !== null && ((y = ei(l, a)), y !== 0 && y !== d.retryLane)))
						throw ((d.retryLane = y), Hr(t, y), En(l, t, y), yf);
					(zs(), (i = fg(t, i, a)));
				} else
					((t = d.treeContext),
						(ct = Yn(y.nextSibling)),
						(an = i),
						($e = !0),
						(lr = null),
						(Pn = !1),
						t !== null && ev(i, t),
						(i = ws(i, l)),
						(i.flags |= 4096));
				return i;
			}
			return (
				(t = Oi(t.child, { mode: l.mode, children: l.children })),
				(t.ref = i.ref),
				(i.child = t),
				(t.return = i),
				t
			);
		}
		function Es(t, i) {
			var a = i.ref;
			if (a === null) t !== null && t.ref !== null && (i.flags |= 4194816);
			else {
				if (typeof a != "function" && typeof a != "object") throw Error(s(284));
				(t === null || t.ref !== a) && (i.flags |= 4194816);
			}
		}
		function pf(t, i, a, l, c) {
			return (
				Yr(i),
				(a = Xc(t, i, a, l, void 0, c)),
				(l = Jc()),
				t !== null && !$t ? (Wc(t, i, c), ji(t, i, c)) : ($e && l && Mc(i), (i.flags |= 1), ln(t, i, a, c), i.child)
			);
		}
		function dg(t, i, a, l, c, d) {
			return (
				Yr(i),
				(i.updateQueue = null),
				(a = pv(i, l, a, c)),
				yv(t),
				(l = Jc()),
				t !== null && !$t ? (Wc(t, i, d), ji(t, i, d)) : ($e && l && Mc(i), (i.flags |= 1), ln(t, i, a, d), i.child)
			);
		}
		function hg(t, i, a, l, c) {
			if ((Yr(i), i.stateNode === null)) {
				var d = Oa,
					y = a.contextType;
				(typeof y == "object" && y !== null && (d = un(y)),
					(d = new a(l, d)),
					(i.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null),
					(d.updater = vf),
					(i.stateNode = d),
					(d._reactInternals = i),
					(d = i.stateNode),
					(d.props = l),
					(d.state = i.memoizedState),
					(d.refs = {}),
					Zc(i),
					(y = a.contextType),
					(d.context = typeof y == "object" && y !== null ? un(y) : Oa),
					(d.state = i.memoizedState),
					(y = a.getDerivedStateFromProps),
					typeof y == "function" && (mf(i, a, y, l), (d.state = i.memoizedState)),
					typeof a.getDerivedStateFromProps == "function" ||
						typeof d.getSnapshotBeforeUpdate == "function" ||
						(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
						((y = d.state),
						typeof d.componentWillMount == "function" && d.componentWillMount(),
						typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(),
						y !== d.state && vf.enqueueReplaceState(d, d.state, null),
						Vu(i, l, d, c),
						Iu(),
						(d.state = i.memoizedState)),
					typeof d.componentDidMount == "function" && (i.flags |= 4194308),
					(l = !0));
			} else if (t === null) {
				d = i.stateNode;
				var T = i.memoizedProps,
					M = na(a, T);
				d.props = M;
				var V = d.context,
					W = a.contextType;
				((y = Oa), typeof W == "object" && W !== null && (y = un(W)));
				var ie = a.getDerivedStateFromProps;
				((W = typeof ie == "function" || typeof d.getSnapshotBeforeUpdate == "function"),
					(T = i.pendingProps !== T),
					W ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((T || V !== y) && ng(i, d, l, y)),
					(cr = !1));
				var H = i.memoizedState;
				((d.state = H),
					Vu(i, l, d, c),
					Iu(),
					(V = i.memoizedState),
					T || H !== V || cr
						? (typeof ie == "function" && (mf(i, a, ie, l), (V = i.memoizedState)),
							(M = cr || tg(i, a, M, l, H, V, y))
								? (W ||
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
					Hc(t, i),
					(y = i.memoizedProps),
					(W = na(a, y)),
					(d.props = W),
					(ie = i.pendingProps),
					(H = d.context),
					(V = a.contextType),
					(M = Oa),
					typeof V == "object" && V !== null && (M = un(V)),
					(T = a.getDerivedStateFromProps),
					(V = typeof T == "function" || typeof d.getSnapshotBeforeUpdate == "function") ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((y !== ie || H !== M) && ng(i, d, l, M)),
					(cr = !1),
					(H = i.memoizedState),
					(d.state = H),
					Vu(i, l, d, c),
					Iu());
				var Y = i.memoizedState;
				y !== ie || H !== Y || cr || (t !== null && t.dependencies !== null && rs(t.dependencies))
					? (typeof T == "function" && (mf(i, a, T, l), (Y = i.memoizedState)),
						(W = cr || tg(i, a, W, l, H, Y, M) || (t !== null && t.dependencies !== null && rs(t.dependencies)))
							? (V ||
									(typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function") ||
									(typeof d.componentWillUpdate == "function" && d.componentWillUpdate(l, Y, M),
									typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(l, Y, M)),
								typeof d.componentDidUpdate == "function" && (i.flags |= 4),
								typeof d.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024))
							: (typeof d.componentDidUpdate != "function" ||
									(y === t.memoizedProps && H === t.memoizedState) ||
									(i.flags |= 4),
								typeof d.getSnapshotBeforeUpdate != "function" ||
									(y === t.memoizedProps && H === t.memoizedState) ||
									(i.flags |= 1024),
								(i.memoizedProps = l),
								(i.memoizedState = Y)),
						(d.props = l),
						(d.state = Y),
						(d.context = M),
						(l = W))
					: (typeof d.componentDidUpdate != "function" ||
							(y === t.memoizedProps && H === t.memoizedState) ||
							(i.flags |= 4),
						typeof d.getSnapshotBeforeUpdate != "function" ||
							(y === t.memoizedProps && H === t.memoizedState) ||
							(i.flags |= 1024),
						(l = !1));
			}
			return (
				(d = l),
				Es(t, i),
				(l = (i.flags & 128) !== 0),
				d || l
					? ((d = i.stateNode),
						(a = l && typeof a.getDerivedStateFromError != "function" ? null : d.render()),
						(i.flags |= 1),
						t !== null && l ? ((i.child = Jr(i, t.child, null, c)), (i.child = Jr(i, null, a, c))) : ln(t, i, a, c),
						(i.memoizedState = d.state),
						(t = i.child))
					: (t = ji(t, i, c)),
				t
			);
		}
		function mg(t, i, a, l) {
			return (Qr(), (i.flags |= 256), ln(t, i, a, l), i.child);
		}
		var bf = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
		function _f(t) {
			return { baseLanes: t, cachePool: uv() };
		}
		function Sf(t, i, a) {
			return ((t = t !== null ? t.childLanes & ~a : 0), i && (t |= Dn), t);
		}
		function vg(t, i, a) {
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
						(c ? fr(i) : dr(i),
						(t = ct)
							? ((t = Ty(t, Pn)),
								(t = t !== null && t.data !== "&" ? t : null),
								t !== null &&
									((i.memoizedState = {
										dehydrated: t,
										treeContext: ur !== null ? { id: hi, overflow: mi } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = Xm(t)),
									(a.return = i),
									(i.child = a),
									(an = i),
									(ct = null)))
							: (t = null),
						t === null)
					)
						throw sr(i);
					return (nd(t) ? (i.lanes = 32) : (i.lanes = 536870912), null);
				}
				var T = l.children;
				return (
					(l = l.fallback),
					c
						? (dr(i),
							(c = i.mode),
							(T = Ts({ mode: "hidden", children: T }, c)),
							(l = Pr(l, c, a, null)),
							(T.return = i),
							(l.return = i),
							(T.sibling = l),
							(i.child = T),
							(l = i.child),
							(l.memoizedState = _f(a)),
							(l.childLanes = Sf(t, y, a)),
							(i.memoizedState = bf),
							Ku(null, l))
						: (fr(i), wf(i, T))
				);
			}
			var M = t.memoizedState;
			if (M !== null && ((T = M.dehydrated), T !== null)) {
				if (d)
					i.flags & 256
						? (fr(i), (i.flags &= -257), (i = Ef(t, i, a)))
						: i.memoizedState !== null
							? (dr(i), (i.child = t.child), (i.flags |= 128), (i = null))
							: (dr(i),
								(T = l.fallback),
								(c = i.mode),
								(l = Ts({ mode: "visible", children: l.children }, c)),
								(T = Pr(T, c, a, null)),
								(T.flags |= 2),
								(l.return = i),
								(T.return = i),
								(l.sibling = T),
								(i.child = l),
								Jr(i, t.child, null, a),
								(l = i.child),
								(l.memoizedState = _f(a)),
								(l.childLanes = Sf(t, y, a)),
								(i.memoizedState = bf),
								(i = Ku(null, l)));
				else if ((fr(i), nd(T))) {
					if (((y = T.nextSibling && T.nextSibling.dataset), y)) var V = y.dgst;
					((y = V),
						(l = Error(s(419))),
						(l.stack = ""),
						(l.digest = y),
						ju({ value: l, source: null, stack: null }),
						(i = Ef(t, i, a)));
				} else if (($t || za(t, i, a, !1), (y = (a & t.childLanes) !== 0), $t || y)) {
					if (((y = it), y !== null && ((l = ei(y, a)), l !== 0 && l !== M.retryLane)))
						throw ((M.retryLane = l), Hr(t, l), En(y, t, l), yf);
					(td(T) || zs(), (i = Ef(t, i, a)));
				} else
					td(T)
						? ((i.flags |= 192), (i.child = t.child), (i = null))
						: ((t = M.treeContext),
							(ct = Yn(T.nextSibling)),
							(an = i),
							($e = !0),
							(lr = null),
							(Pn = !1),
							t !== null && ev(i, t),
							(i = wf(i, l.children)),
							(i.flags |= 4096));
				return i;
			}
			return c
				? (dr(i),
					(T = l.fallback),
					(c = i.mode),
					(M = t.child),
					(V = M.sibling),
					(l = Oi(M, { mode: "hidden", children: l.children })),
					(l.subtreeFlags = M.subtreeFlags & 65011712),
					V !== null ? (T = Oi(V, T)) : ((T = Pr(T, c, a, null)), (T.flags |= 2)),
					(T.return = i),
					(l.return = i),
					(l.sibling = T),
					(i.child = l),
					Ku(null, l),
					(l = i.child),
					(T = t.child.memoizedState),
					T === null
						? (T = _f(a))
						: ((c = T.cachePool),
							c !== null ? ((M = qt._currentValue), (c = c.parent !== M ? { parent: M, pool: M } : c)) : (c = uv()),
							(T = { baseLanes: T.baseLanes | a, cachePool: c })),
					(l.memoizedState = T),
					(l.childLanes = Sf(t, y, a)),
					(i.memoizedState = bf),
					Ku(t.child, l))
				: (fr(i),
					(a = t.child),
					(t = a.sibling),
					(a = Oi(a, { mode: "visible", children: l.children })),
					(a.return = i),
					(a.sibling = null),
					t !== null && ((y = i.deletions), y === null ? ((i.deletions = [t]), (i.flags |= 16)) : y.push(t)),
					(i.child = a),
					(i.memoizedState = null),
					a);
		}
		function wf(t, i) {
			return ((i = Ts({ mode: "visible", children: i }, t.mode)), (i.return = t), (t.child = i));
		}
		function Ts(t, i) {
			return ((t = Nn(22, t, null, i)), (t.lanes = 0), t);
		}
		function Ef(t, i, a) {
			return (
				Jr(i, t.child, null, a),
				(t = wf(i, i.pendingProps.children)),
				(t.flags |= 2),
				(i.memoizedState = null),
				t
			);
		}
		function gg(t, i, a) {
			t.lanes |= i;
			var l = t.alternate;
			(l !== null && (l.lanes |= i), qc(t.return, i, a));
		}
		function Tf(t, i, a, l, c, d) {
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
		function yg(t, i, a) {
			var l = i.pendingProps,
				c = l.revealOrder,
				d = l.tail;
			l = l.children;
			var y = kt.current,
				T = (y & 2) !== 0;
			if (
				(T ? ((y = (y & 1) | 2), (i.flags |= 128)) : (y &= 1),
				re(kt, y),
				ln(t, i, l, a),
				(l = $e ? Du : 0),
				!T && t !== null && (t.flags & 128) !== 0)
			)
				e: for (t = i.child; t !== null; ) {
					if (t.tag === 13) t.memoizedState !== null && gg(t, a, i);
					else if (t.tag === 19) gg(t, a, i);
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
						((t = a.alternate), t !== null && ds(t) === null && (c = a), (a = a.sibling));
					((a = c),
						a === null ? ((c = i.child), (i.child = null)) : ((c = a.sibling), (a.sibling = null)),
						Tf(i, !1, c, a, d, l));
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (a = null, c = i.child, i.child = null; c !== null; ) {
						if (((t = c.alternate), t !== null && ds(t) === null)) {
							i.child = c;
							break;
						}
						((t = c.sibling), (c.sibling = a), (a = c), (c = t));
					}
					Tf(i, !0, a, null, d, l);
					break;
				case "together":
					Tf(i, !1, null, null, void 0, l);
					break;
				default:
					i.memoizedState = null;
			}
			return i.child;
		}
		function ji(t, i, a) {
			if ((t !== null && (i.dependencies = t.dependencies), (vr |= i.lanes), (a & i.childLanes) === 0))
				if (t !== null) {
					if ((za(t, i, a, !1), (a & i.childLanes) === 0)) return null;
				} else return null;
			if (t !== null && i.child !== t.child) throw Error(s(153));
			if (i.child !== null) {
				for (t = i.child, a = Oi(t, t.pendingProps), i.child = a, a.return = i; t.sibling !== null; )
					((t = t.sibling), (a = a.sibling = Oi(t, t.pendingProps)), (a.return = i));
				a.sibling = null;
			}
			return i.child;
		}
		function xf(t, i) {
			return (t.lanes & i) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && rs(t)));
		}
		function XS(t, i, a) {
			switch (i.tag) {
				case 3:
					(Fe(i, i.stateNode.containerInfo), or(i, qt, t.memoizedState.cache), Qr());
					break;
				case 27:
				case 5:
					Ke(i);
					break;
				case 4:
					Fe(i, i.stateNode.containerInfo);
					break;
				case 10:
					or(i, i.type, i.memoizedProps.value);
					break;
				case 31:
					if (i.memoizedState !== null) return ((i.flags |= 128), Gc(i), null);
					break;
				case 13:
					var l = i.memoizedState;
					if (l !== null)
						return l.dehydrated !== null
							? (fr(i), (i.flags |= 128), null)
							: (a & i.child.childLanes) !== 0
								? vg(t, i, a)
								: (fr(i), (t = ji(t, i, a)), t !== null ? t.sibling : null);
					fr(i);
					break;
				case 19:
					var c = (t.flags & 128) !== 0;
					if (((l = (a & i.childLanes) !== 0), l || (za(t, i, a, !1), (l = (a & i.childLanes) !== 0)), c)) {
						if (l) return yg(t, i, a);
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
					return ((i.lanes = 0), og(t, i, a, i.pendingProps));
				case 24:
					or(i, qt, t.memoizedState.cache);
			}
			return ji(t, i, a);
		}
		function pg(t, i, a) {
			if (t !== null)
				if (t.memoizedProps !== i.pendingProps) $t = !0;
				else {
					if (!xf(t, a) && (i.flags & 128) === 0) return (($t = !1), XS(t, i, a));
					$t = (t.flags & 131072) !== 0;
				}
			else (($t = !1), $e && (i.flags & 1048576) !== 0 && Wm(i, Du, i.index));
			switch (((i.lanes = 0), i.tag)) {
				case 16:
					e: {
						var l = i.pendingProps;
						if (((t = Fr(i.elementType)), (i.type = t), typeof t == "function"))
							Oc(t)
								? ((l = na(t, l)), (i.tag = 1), (i = hg(null, i, t, l, a)))
								: ((i.tag = 0), (i = pf(null, i, t, l, a)));
						else {
							if (t != null) {
								var c = t.$$typeof;
								if (c === k) {
									((i.tag = 11), (i = ug(null, i, t, l, a)));
									break e;
								} else if (c === j) {
									((i.tag = 14), (i = lg(null, i, t, l, a)));
									break e;
								}
							}
							throw ((i = ue(t) || t), Error(s(306, i, "")));
						}
					}
					return i;
				case 0:
					return pf(t, i, i.type, i.pendingProps, a);
				case 1:
					return ((l = i.type), (c = na(l, i.pendingProps)), hg(t, i, l, c, a));
				case 3:
					e: {
						if ((Fe(i, i.stateNode.containerInfo), t === null)) throw Error(s(387));
						l = i.pendingProps;
						var d = i.memoizedState;
						((c = d.element), Hc(t, i), Vu(i, l, null, a));
						var y = i.memoizedState;
						if (
							((l = y.cache), or(i, qt, l), l !== d.cache && Uc(i, [qt], a, !0), Iu(), (l = y.element), d.isDehydrated)
						)
							if (
								((d = { element: l, isDehydrated: !1, cache: y.cache }),
								(i.updateQueue.baseState = d),
								(i.memoizedState = d),
								i.flags & 256)
							) {
								i = mg(t, i, l, a);
								break e;
							} else if (l !== c) {
								((c = Vn(Error(s(424)), i)), ju(c), (i = mg(t, i, l, a)));
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
									ct = Yn(t.firstChild), an = i, $e = !0, lr = null, Pn = !0, a = dv(i, null, l, a), i.child = a;
									a;
								)
									((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
							}
						else {
							if ((Qr(), l === c)) {
								i = ji(t, i, a);
								break e;
							}
							ln(t, i, l, a);
						}
						i = i.child;
					}
					return i;
				case 26:
					return (
						Es(t, i),
						t === null
							? (a = Ny(i.type, null, i.pendingProps, null))
								? (i.memoizedState = a)
								: $e ||
									((a = i.type),
									(t = i.pendingProps),
									(l = Bs(be.current).createElement(a)),
									(l[Lt] = i),
									(l[Z] = t),
									sn(l, a, t),
									Jt(l),
									(i.stateNode = l))
							: (i.memoizedState = Ny(i.type, t.memoizedProps, i.pendingProps, t.memoizedState)),
						null
					);
				case 27:
					return (
						Ke(i),
						t === null &&
							$e &&
							((l = i.stateNode = Cy(i.type, i.pendingProps, be.current)),
							(an = i),
							(Pn = !0),
							(c = ct),
							_r(i.type) ? ((id = c), (ct = Yn(l.firstChild))) : (ct = c)),
						ln(t, i, i.pendingProps.children, a),
						Es(t, i),
						t === null && (i.flags |= 4194304),
						i.child
					);
				case 5:
					return (
						t === null &&
							$e &&
							((c = l = ct) &&
								((l = xw(l, i.type, i.pendingProps, Pn)),
								l !== null ? ((i.stateNode = l), (an = i), (ct = Yn(l.firstChild)), (Pn = !1), (c = !0)) : (c = !1)),
							c || sr(i)),
						Ke(i),
						(c = i.type),
						(d = i.pendingProps),
						(y = t !== null ? t.memoizedProps : null),
						(l = d.children),
						Jf(c, d) ? (l = null) : y !== null && Jf(c, y) && (i.flags |= 32),
						i.memoizedState !== null && ((c = Xc(t, i, $S, null, null, a)), (sl._currentValue = c)),
						Es(t, i),
						ln(t, i, l, a),
						i.child
					);
				case 6:
					return (
						t === null &&
							$e &&
							((t = a = ct) &&
								((a = Aw(a, i.pendingProps, Pn)),
								a !== null ? ((i.stateNode = a), (an = i), (ct = null), (t = !0)) : (t = !1)),
							t || sr(i)),
						null
					);
				case 13:
					return vg(t, i, a);
				case 4:
					return (
						Fe(i, i.stateNode.containerInfo),
						(l = i.pendingProps),
						t === null ? (i.child = Jr(i, null, l, a)) : ln(t, i, l, a),
						i.child
					);
				case 11:
					return ug(t, i, i.type, i.pendingProps, a);
				case 7:
					return (ln(t, i, i.pendingProps, a), i.child);
				case 8:
					return (ln(t, i, i.pendingProps.children, a), i.child);
				case 12:
					return (ln(t, i, i.pendingProps.children, a), i.child);
				case 10:
					return ((l = i.pendingProps), or(i, i.type, l.value), ln(t, i, l.children, a), i.child);
				case 9:
					return (
						(c = i.type._context),
						(l = i.pendingProps.children),
						Yr(i),
						(c = un(c)),
						(l = l(c)),
						(i.flags |= 1),
						ln(t, i, l, a),
						i.child
					);
				case 14:
					return lg(t, i, i.type, i.pendingProps, a);
				case 15:
					return sg(t, i, i.type, i.pendingProps, a);
				case 19:
					return yg(t, i, a);
				case 31:
					return FS(t, i, a);
				case 22:
					return og(t, i, a, i.pendingProps);
				case 24:
					return (
						Yr(i),
						(l = un(qt)),
						t === null
							? ((c = Ic()),
								c === null &&
									((c = it),
									(d = $c()),
									(c.pooledCache = d),
									d.refCount++,
									d !== null && (c.pooledCacheLanes |= a),
									(c = d)),
								(i.memoizedState = { parent: l, cache: c }),
								Zc(i),
								or(i, qt, c))
							: ((t.lanes & a) !== 0 && (Hc(t, i), Vu(i, null, null, a), Iu()),
								(c = t.memoizedState),
								(d = i.memoizedState),
								c.parent !== l
									? ((c = { parent: l, cache: l }),
										(i.memoizedState = c),
										i.lanes === 0 && (i.memoizedState = i.updateQueue.baseState = c),
										or(i, qt, l))
									: ((l = d.cache), or(i, qt, l), l !== c.cache && Uc(i, [qt], a, !0))),
						ln(t, i, i.pendingProps.children, a),
						i.child
					);
				case 29:
					throw i.pendingProps;
			}
			throw Error(s(156, i.tag));
		}
		function Li(t) {
			t.flags |= 4;
		}
		function Af(t, i, a, l, c) {
			if (((i = (t.mode & 32) !== 0) && (i = !1), i)) {
				if (((t.flags |= 16777216), (c & 335544128) === c))
					if (t.stateNode.complete) t.flags |= 8192;
					else if (Pg()) t.flags |= 8192;
					else throw ((Xr = ss), Vc);
			} else t.flags &= -16777217;
		}
		function bg(t, i) {
			if (i.type !== "stylesheet" || (i.state.loading & 4) !== 0) t.flags &= -16777217;
			else if (((t.flags |= 16777216), !jy(i)))
				if (Pg()) t.flags |= 8192;
				else throw ((Xr = ss), Vc);
		}
		function xs(t, i) {
			(i !== null && (t.flags |= 4),
				t.flags & 16384 && ((i = t.tag !== 22 ? xe() : 536870912), (t.lanes |= i), (Pa |= i)));
		}
		function Yu(t, i) {
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
		function ft(t) {
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
		function JS(t, i, a) {
			var l = i.pendingProps;
			switch ((zc(i), i.tag)) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14:
					return (ft(i), null);
				case 1:
					return (ft(i), null);
				case 3:
					return (
						(a = i.stateNode),
						(l = null),
						t !== null && (l = t.memoizedState.cache),
						i.memoizedState.cache !== l && (i.flags |= 2048),
						Mi(qt),
						De(),
						a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
						(t === null || t.child === null) &&
							(Ma(i)
								? Li(i)
								: t === null || (t.memoizedState.isDehydrated && (i.flags & 256) === 0) || ((i.flags |= 1024), jc())),
						ft(i),
						null
					);
				case 26:
					var c = i.type,
						d = i.memoizedState;
					return (
						t === null
							? (Li(i), d !== null ? (ft(i), bg(i, d)) : (ft(i), Af(i, c, null, l, a)))
							: d
								? d !== t.memoizedState
									? (Li(i), ft(i), bg(i, d))
									: (ft(i), (i.flags &= -16777217))
								: ((t = t.memoizedProps), t !== l && Li(i), ft(i), Af(i, c, t, l, a)),
						null
					);
				case 27:
					if ((Et(i), (a = be.current), (c = i.type), t !== null && i.stateNode != null))
						t.memoizedProps !== l && Li(i);
					else {
						if (!l) {
							if (i.stateNode === null) throw Error(s(166));
							return (ft(i), null);
						}
						((t = fe.current), Ma(i) ? tv(i, t) : ((t = Cy(c, l, a)), (i.stateNode = t), Li(i)));
					}
					return (ft(i), null);
				case 5:
					if ((Et(i), (c = i.type), t !== null && i.stateNode != null)) t.memoizedProps !== l && Li(i);
					else {
						if (!l) {
							if (i.stateNode === null) throw Error(s(166));
							return (ft(i), null);
						}
						if (((d = fe.current), Ma(i))) tv(i, d);
						else {
							var y = Bs(be.current);
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
							((d[Lt] = i), (d[Z] = l));
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
							e: switch ((sn(d, c, l), c)) {
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
							l && Li(i);
						}
					}
					return (ft(i), Af(i, i.type, t === null ? null : t.memoizedProps, i.pendingProps, a), null);
				case 6:
					if (t && i.stateNode != null) t.memoizedProps !== l && Li(i);
					else {
						if (typeof l != "string" && i.stateNode === null) throw Error(s(166));
						if (((t = be.current), Ma(i))) {
							if (((t = i.stateNode), (a = i.memoizedProps), (l = null), (c = an), c !== null))
								switch (c.tag) {
									case 27:
									case 5:
										l = c.memoizedProps;
								}
							((t[Lt] = i),
								(t = !!(t.nodeValue === a || (l !== null && l.suppressHydrationWarning === !0) || gy(t.nodeValue, a))),
								t || sr(i, !0));
						} else ((t = Bs(t).createTextNode(l)), (t[Lt] = i), (i.stateNode = t));
					}
					return (ft(i), null);
				case 31:
					if (((a = i.memoizedState), t === null || t.memoizedState !== null)) {
						if (((l = Ma(i)), a !== null)) {
							if (t === null) {
								if (!l) throw Error(s(318));
								if (((t = i.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(557));
								t[Lt] = i;
							} else (Qr(), (i.flags & 128) === 0 && (i.memoizedState = null), (i.flags |= 4));
							(ft(i), (t = !1));
						} else
							((a = jc()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), (t = !0));
						if (!t) return i.flags & 256 ? (Mn(i), i) : (Mn(i), null);
						if ((i.flags & 128) !== 0) throw Error(s(558));
					}
					return (ft(i), null);
				case 13:
					if (
						((l = i.memoizedState), t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
					) {
						if (((c = Ma(i)), l !== null && l.dehydrated !== null)) {
							if (t === null) {
								if (!c) throw Error(s(318));
								if (((c = i.memoizedState), (c = c !== null ? c.dehydrated : null), !c)) throw Error(s(317));
								c[Lt] = i;
							} else (Qr(), (i.flags & 128) === 0 && (i.memoizedState = null), (i.flags |= 4));
							(ft(i), (c = !1));
						} else
							((c = jc()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = c), (c = !0));
						if (!c) return i.flags & 256 ? (Mn(i), i) : (Mn(i), null);
					}
					return (
						Mn(i),
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
								xs(i, i.updateQueue),
								ft(i),
								null)
					);
				case 4:
					return (De(), t === null && dy(i.stateNode.containerInfo), ft(i), null);
				case 10:
					return (Mi(i.type), ft(i), null);
				case 19:
					if ((X(kt), (l = i.memoizedState), l === null)) return (ft(i), null);
					if (((c = (i.flags & 128) !== 0), (d = l.rendering), d === null))
						if (c) Yu(l, !1);
						else {
							if (Ot !== 0 || (t !== null && (t.flags & 128) !== 0))
								for (t = i.child; t !== null; ) {
									if (((d = ds(t)), d !== null)) {
										for (
											i.flags |= 128,
												Yu(l, !1),
												t = d.updateQueue,
												i.updateQueue = t,
												xs(i, t),
												i.subtreeFlags = 0,
												t = a,
												a = i.child;
											a !== null;
										)
											(Fm(a, t), (a = a.sibling));
										return (re(kt, (kt.current & 1) | 2), $e && Ni(i, l.treeForkCount), i.child);
									}
									t = t.sibling;
								}
							l.tail !== null && Oe() > Ns && ((i.flags |= 128), (c = !0), Yu(l, !1), (i.lanes = 4194304));
						}
					else {
						if (!c)
							if (((t = ds(d)), t !== null)) {
								if (
									((i.flags |= 128),
									(c = !0),
									(t = t.updateQueue),
									(i.updateQueue = t),
									xs(i, t),
									Yu(l, !0),
									l.tail === null && l.tailMode === "hidden" && !d.alternate && !$e)
								)
									return (ft(i), null);
							} else
								2 * Oe() - l.renderingStartTime > Ns &&
									a !== 536870912 &&
									((i.flags |= 128), (c = !0), Yu(l, !1), (i.lanes = 4194304));
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
							$e && Ni(i, l.treeForkCount),
							t)
						: (ft(i), null);
				case 22:
				case 23:
					return (
						Mn(i),
						Yc(),
						(l = i.memoizedState !== null),
						t !== null ? (t.memoizedState !== null) !== l && (i.flags |= 8192) : l && (i.flags |= 8192),
						l
							? (a & 536870912) !== 0 && (i.flags & 128) === 0 && (ft(i), i.subtreeFlags & 6 && (i.flags |= 8192))
							: ft(i),
						(a = i.updateQueue),
						a !== null && xs(i, a.retryQueue),
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
						Mi(qt),
						ft(i),
						null
					);
				case 25:
					return null;
				case 30:
					return null;
			}
			throw Error(s(156, i.tag));
		}
		function WS(t, i) {
			switch ((zc(i), i.tag)) {
				case 1:
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 3:
					return (
						Mi(qt),
						De(),
						(t = i.flags),
						(t & 65536) !== 0 && (t & 128) === 0 ? ((i.flags = (t & -65537) | 128), i) : null
					);
				case 26:
				case 27:
				case 5:
					return (Et(i), null);
				case 31:
					if (i.memoizedState !== null) {
						if ((Mn(i), i.alternate === null)) throw Error(s(340));
						Qr();
					}
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 13:
					if ((Mn(i), (t = i.memoizedState), t !== null && t.dehydrated !== null)) {
						if (i.alternate === null) throw Error(s(340));
						Qr();
					}
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 19:
					return (X(kt), null);
				case 4:
					return (De(), null);
				case 10:
					return (Mi(i.type), null);
				case 22:
				case 23:
					return (
						Mn(i),
						Yc(),
						t !== null && X(Gr),
						(t = i.flags),
						t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null
					);
				case 24:
					return (Mi(qt), null);
				case 25:
					return null;
				default:
					return null;
			}
		}
		function _g(t, i) {
			switch ((zc(i), i.tag)) {
				case 3:
					(Mi(qt), De());
					break;
				case 26:
				case 27:
				case 5:
					Et(i);
					break;
				case 4:
					De();
					break;
				case 31:
					i.memoizedState !== null && Mn(i);
					break;
				case 13:
					Mn(i);
					break;
				case 19:
					X(kt);
					break;
				case 10:
					Mi(i.type);
					break;
				case 22:
				case 23:
					(Mn(i), Yc(), t !== null && X(Gr));
					break;
				case 24:
					Mi(qt);
			}
		}
		function Gu(t, i) {
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
				Je(i, i.return, T);
			}
		}
		function hr(t, i, a) {
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
								} catch (W) {
									Je(c, M, W);
								}
							}
						}
						l = l.next;
					} while (l !== d);
				}
			} catch (W) {
				Je(i, i.return, W);
			}
		}
		function Sg(t) {
			var i = t.updateQueue;
			if (i !== null) {
				var a = t.stateNode;
				try {
					mv(i, a);
				} catch (l) {
					Je(t, t.return, l);
				}
			}
		}
		function wg(t, i, a) {
			((a.props = na(t.type, t.memoizedProps)), (a.state = t.memoizedState));
			try {
				a.componentWillUnmount();
			} catch (l) {
				Je(t, i, l);
			}
		}
		function Fu(t, i) {
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
				Je(t, i, c);
			}
		}
		function vi(t, i) {
			var a = t.ref,
				l = t.refCleanup;
			if (a !== null)
				if (typeof l == "function")
					try {
						l();
					} catch (c) {
						Je(t, i, c);
					} finally {
						((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
					}
				else if (typeof a == "function")
					try {
						a(null);
					} catch (c) {
						Je(t, i, c);
					}
				else a.current = null;
		}
		function Eg(t) {
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
				Je(t, t.return, c);
			}
		}
		function Cf(t, i, a) {
			try {
				var l = t.stateNode;
				(bw(l, t.type, a, i), (l[Z] = i));
			} catch (c) {
				Je(t, t.return, c);
			}
		}
		function Tg(t) {
			return t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && _r(t.type)) || t.tag === 4;
		}
		function Rf(t) {
			e: for (;;) {
				for (; t.sibling === null; ) {
					if (t.return === null || Tg(t.return)) return null;
					t = t.return;
				}
				for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
					if ((t.tag === 27 && _r(t.type)) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
					((t.child.return = t), (t = t.child));
				}
				if (!(t.flags & 2)) return t.stateNode;
			}
		}
		function Of(t, i, a) {
			var l = t.tag;
			if (l === 5 || l === 6)
				((t = t.stateNode),
					i
						? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(t, i)
						: ((i = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a),
							i.appendChild(t),
							(a = a._reactRootContainer),
							a != null || i.onclick !== null || (i.onclick = Ci)));
			else if (l !== 4 && (l === 27 && _r(t.type) && ((a = t.stateNode), (i = null)), (t = t.child), t !== null))
				for (Of(t, i, a), t = t.sibling; t !== null; ) (Of(t, i, a), (t = t.sibling));
		}
		function As(t, i, a) {
			var l = t.tag;
			if (l === 5 || l === 6) ((t = t.stateNode), i ? a.insertBefore(t, i) : a.appendChild(t));
			else if (l !== 4 && (l === 27 && _r(t.type) && (a = t.stateNode), (t = t.child), t !== null))
				for (As(t, i, a), t = t.sibling; t !== null; ) (As(t, i, a), (t = t.sibling));
		}
		function xg(t) {
			var i = t.stateNode,
				a = t.memoizedProps;
			try {
				for (var l = t.type, c = i.attributes; c.length; ) i.removeAttributeNode(c[0]);
				(sn(i, l, a), (i[Lt] = t), (i[Z] = a));
			} catch (d) {
				Je(t, t.return, d);
			}
		}
		var qi = !1,
			Bt = !1,
			Nf = !1,
			Ag = typeof WeakSet == "function" ? WeakSet : Set,
			Wt = null;
		function ew(t, i) {
			if (((t = t.containerInfo), (Ff = Ks), (t = Im(t)), wc(t))) {
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
								W = 0,
								ie = t,
								H = null;
							t: for (;;) {
								for (
									var Y;
									ie !== a || (c !== 0 && ie.nodeType !== 3) || (T = y + c),
										ie !== d || (l !== 0 && ie.nodeType !== 3) || (M = y + l),
										ie.nodeType === 3 && (y += ie.nodeValue.length),
										(Y = ie.firstChild) !== null;
								)
									((H = ie), (ie = Y));
								for (;;) {
									if (ie === t) break t;
									if ((H === a && ++V === c && (T = y), H === d && ++W === l && (M = y), (Y = ie.nextSibling) !== null))
										break;
									((ie = H), (H = ie.parentNode));
								}
								ie = Y;
							}
							a = T === -1 || M === -1 ? null : { start: T, end: M };
						} else a = null;
					}
				a = a || { start: 0, end: 0 };
			} else a = null;
			for (Xf = { focusedElem: t, selectionRange: a }, Ks = !1, Wt = i; Wt !== null; )
				if (((i = Wt), (t = i.child), (i.subtreeFlags & 1028) !== 0 && t !== null)) ((t.return = i), (Wt = t));
				else
					for (; Wt !== null; ) {
						switch (((i = Wt), (d = i.alternate), (t = i.flags), i.tag)) {
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
										Je(a, a.return, Te);
									}
								}
								break;
							case 3:
								if ((t & 1024) !== 0) {
									if (((t = i.stateNode.containerInfo), (a = t.nodeType), a === 9)) ed(t);
									else if (a === 1)
										switch (t.nodeName) {
											case "HEAD":
											case "HTML":
											case "BODY":
												ed(t);
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
							((t.return = i.return), (Wt = t));
							break;
						}
						Wt = i.return;
					}
		}
		function Cg(t, i, a) {
			var l = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					($i(t, a), l & 4 && Gu(5, a));
					break;
				case 1:
					if (($i(t, a), l & 4))
						if (((t = a.stateNode), i === null))
							try {
								t.componentDidMount();
							} catch (y) {
								Je(a, a.return, y);
							}
						else {
							var c = na(a.type, i.memoizedProps);
							i = i.memoizedState;
							try {
								t.componentDidUpdate(c, i, t.__reactInternalSnapshotBeforeUpdate);
							} catch (y) {
								Je(a, a.return, y);
							}
						}
					(l & 64 && Sg(a), l & 512 && Fu(a, a.return));
					break;
				case 3:
					if (($i(t, a), l & 64 && ((t = a.updateQueue), t !== null))) {
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
							mv(t, i);
						} catch (y) {
							Je(a, a.return, y);
						}
					}
					break;
				case 27:
					i === null && l & 4 && xg(a);
				case 26:
				case 5:
					($i(t, a), i === null && l & 4 && Eg(a), l & 512 && Fu(a, a.return));
					break;
				case 12:
					$i(t, a);
					break;
				case 31:
					($i(t, a), l & 4 && Ng(t, a));
					break;
				case 13:
					($i(t, a),
						l & 4 && kg(t, a),
						l & 64 &&
							((t = a.memoizedState),
							t !== null && ((t = t.dehydrated), t !== null && ((a = ow.bind(null, a)), Cw(t, a)))));
					break;
				case 22:
					if (((l = a.memoizedState !== null || qi), !l)) {
						((i = (i !== null && i.memoizedState !== null) || Bt), (c = qi));
						var d = Bt;
						((qi = l), (Bt = i) && !d ? Bi(t, a, (a.subtreeFlags & 8772) !== 0) : $i(t, a), (qi = c), (Bt = d));
					}
					break;
				case 30:
					break;
				default:
					$i(t, a);
			}
		}
		function Rg(t) {
			var i = t.alternate;
			(i !== null && ((t.alternate = null), Rg(i)),
				(t.child = null),
				(t.deletions = null),
				(t.sibling = null),
				t.tag === 5 && ((i = t.stateNode), i !== null && ir(i)),
				(t.stateNode = null),
				(t.return = null),
				(t.dependencies = null),
				(t.memoizedProps = null),
				(t.memoizedState = null),
				(t.pendingProps = null),
				(t.stateNode = null),
				(t.updateQueue = null));
		}
		var mt = null,
			bn = !1;
		function Ui(t, i, a) {
			for (a = a.child; a !== null; ) (Og(t, i, a), (a = a.sibling));
		}
		function Og(t, i, a) {
			if (Yt && typeof Yt.onCommitFiberUnmount == "function")
				try {
					Yt.onCommitFiberUnmount(gn, a);
				} catch {}
			switch (a.tag) {
				case 26:
					(Bt || vi(a, i),
						Ui(t, i, a),
						a.memoizedState
							? a.memoizedState.count--
							: a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
					break;
				case 27:
					Bt || vi(a, i);
					var l = mt,
						c = bn;
					(_r(a.type) && ((mt = a.stateNode), (bn = !1)), Ui(t, i, a), al(a.stateNode), (mt = l), (bn = c));
					break;
				case 5:
					Bt || vi(a, i);
				case 6:
					if (((l = mt), (c = bn), (mt = null), Ui(t, i, a), (mt = l), (bn = c), mt !== null))
						if (bn)
							try {
								(mt.nodeType === 9 ? mt.body : mt.nodeName === "HTML" ? mt.ownerDocument.body : mt).removeChild(
									a.stateNode,
								);
							} catch (d) {
								Je(a, i, d);
							}
						else
							try {
								mt.removeChild(a.stateNode);
							} catch (d) {
								Je(a, i, d);
							}
					break;
				case 18:
					mt !== null &&
						(bn
							? ((t = mt),
								wy(t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, a.stateNode),
								Wa(t))
							: wy(mt, a.stateNode));
					break;
				case 4:
					((l = mt), (c = bn), (mt = a.stateNode.containerInfo), (bn = !0), Ui(t, i, a), (mt = l), (bn = c));
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					(hr(2, a, i), Bt || hr(4, a, i), Ui(t, i, a));
					break;
				case 1:
					(Bt || (vi(a, i), (l = a.stateNode), typeof l.componentWillUnmount == "function" && wg(a, i, l)),
						Ui(t, i, a));
					break;
				case 21:
					Ui(t, i, a);
					break;
				case 22:
					((Bt = (l = Bt) || a.memoizedState !== null), Ui(t, i, a), (Bt = l));
					break;
				default:
					Ui(t, i, a);
			}
		}
		function Ng(t, i) {
			if (i.memoizedState === null && ((t = i.alternate), t !== null && ((t = t.memoizedState), t !== null))) {
				t = t.dehydrated;
				try {
					Wa(t);
				} catch (a) {
					Je(i, i.return, a);
				}
			}
		}
		function kg(t, i) {
			if (
				i.memoizedState === null &&
				((t = i.alternate), t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
			)
				try {
					Wa(t);
				} catch (a) {
					Je(i, i.return, a);
				}
		}
		function tw(t) {
			switch (t.tag) {
				case 31:
				case 13:
				case 19:
					var i = t.stateNode;
					return (i === null && (i = t.stateNode = new Ag()), i);
				case 22:
					return ((t = t.stateNode), (i = t._retryCache), i === null && (i = t._retryCache = new Ag()), i);
				default:
					throw Error(s(435, t.tag));
			}
		}
		function Cs(t, i) {
			var a = tw(t);
			i.forEach(function (l) {
				if (!a.has(l)) {
					a.add(l);
					var c = cw.bind(null, t, l);
					l.then(c, c);
				}
			});
		}
		function _n(t, i) {
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
								if (_r(T.type)) {
									((mt = T.stateNode), (bn = !1));
									break e;
								}
								break;
							case 5:
								((mt = T.stateNode), (bn = !1));
								break e;
							case 3:
							case 4:
								((mt = T.stateNode.containerInfo), (bn = !0));
								break e;
						}
						T = T.return;
					}
					if (mt === null) throw Error(s(160));
					(Og(d, y, c), (mt = null), (bn = !1), (d = c.alternate), d !== null && (d.return = null), (c.return = null));
				}
			if (i.subtreeFlags & 13886) for (i = i.child; i !== null; ) (Mg(i, t), (i = i.sibling));
		}
		var ii = null;
		function Mg(t, i) {
			var a = t.alternate,
				l = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					(_n(i, t), Sn(t), l & 4 && (hr(3, t, t.return), Gu(3, t), hr(5, t, t.return)));
					break;
				case 1:
					(_n(i, t),
						Sn(t),
						l & 512 && (Bt || a === null || vi(a, a.return)),
						l & 64 &&
							qi &&
							((t = t.updateQueue),
							t !== null &&
								((l = t.callbacks),
								l !== null &&
									((a = t.shared.hiddenCallbacks), (t.shared.hiddenCallbacks = a === null ? l : a.concat(l))))));
					break;
				case 26:
					var c = ii;
					if ((_n(i, t), Sn(t), l & 512 && (Bt || a === null || vi(a, a.return)), l & 4)) {
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
														d[rn] ||
														d[Lt] ||
														d.namespaceURI === "http://www.w3.org/2000/svg" ||
														d.hasAttribute("itemprop")) &&
														((d = c.createElement(l)), c.head.insertBefore(d, c.querySelector("head > title"))),
													sn(d, l, a),
													(d[Lt] = t),
													Jt(d),
													(l = d));
												break e;
											case "link":
												var y = zy("link", "href", c).get(l + (a.href || ""));
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
												((d = c.createElement(l)), sn(d, l, a), c.head.appendChild(d));
												break;
											case "meta":
												if ((y = zy("meta", "content", c).get(l + (a.content || "")))) {
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
												((d = c.createElement(l)), sn(d, l, a), c.head.appendChild(d));
												break;
											default:
												throw Error(s(468, l));
										}
										((d[Lt] = t), Jt(d), (l = d));
									}
									t.stateNode = l;
								} else Dy(c, t.type, t.stateNode);
							else t.stateNode = My(c, l, t.memoizedProps);
						else
							d !== l
								? (d === null ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a)) : d.count--,
									l === null ? Dy(c, t.type, t.stateNode) : My(c, l, t.memoizedProps))
								: l === null && t.stateNode !== null && Cf(t, t.memoizedProps, a.memoizedProps);
					}
					break;
				case 27:
					(_n(i, t),
						Sn(t),
						l & 512 && (Bt || a === null || vi(a, a.return)),
						a !== null && l & 4 && Cf(t, t.memoizedProps, a.memoizedProps));
					break;
				case 5:
					if ((_n(i, t), Sn(t), l & 512 && (Bt || a === null || vi(a, a.return)), t.flags & 32)) {
						c = t.stateNode;
						try {
							wa(c, "");
						} catch (he) {
							Je(t, t.return, he);
						}
					}
					(l & 4 && t.stateNode != null && ((c = t.memoizedProps), Cf(t, c, a !== null ? a.memoizedProps : c)),
						l & 1024 && (Nf = !0));
					break;
				case 6:
					if ((_n(i, t), Sn(t), l & 4)) {
						if (t.stateNode === null) throw Error(s(162));
						((l = t.memoizedProps), (a = t.stateNode));
						try {
							a.nodeValue = l;
						} catch (he) {
							Je(t, t.return, he);
						}
					}
					break;
				case 3:
					if (
						((Zs = null),
						(c = ii),
						(ii = Is(i.containerInfo)),
						_n(i, t),
						(ii = c),
						Sn(t),
						l & 4 && a !== null && a.memoizedState.isDehydrated)
					)
						try {
							Wa(i.containerInfo);
						} catch (he) {
							Je(t, t.return, he);
						}
					Nf && ((Nf = !1), zg(t));
					break;
				case 4:
					((l = ii), (ii = Is(t.stateNode.containerInfo)), _n(i, t), Sn(t), (ii = l));
					break;
				case 12:
					(_n(i, t), Sn(t));
					break;
				case 31:
					(_n(i, t), Sn(t), l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), Cs(t, l))));
					break;
				case 13:
					(_n(i, t),
						Sn(t),
						t.child.flags & 8192 &&
							(t.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
							(Os = Oe()),
						l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), Cs(t, l))));
					break;
				case 22:
					c = t.memoizedState !== null;
					var M = a !== null && a.memoizedState !== null,
						V = qi,
						W = Bt;
					if (((qi = V || c), (Bt = W || M), _n(i, t), (Bt = W), (qi = V), Sn(t), l & 8192))
						e: for (
							i = t.stateNode,
								i._visibility = c ? i._visibility & -2 : i._visibility | 1,
								c && (a === null || M || qi || Bt || ia(t)),
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
												H = ie != null && ie.hasOwnProperty("display") ? ie.display : null;
											T.style.display = H == null || typeof H == "boolean" ? "" : ("" + H).trim();
										}
									} catch (he) {
										Je(M, M.return, he);
									}
								}
							} else if (i.tag === 6) {
								if (a === null) {
									M = i;
									try {
										M.stateNode.nodeValue = c ? "" : M.memoizedProps;
									} catch (he) {
										Je(M, M.return, he);
									}
								}
							} else if (i.tag === 18) {
								if (a === null) {
									M = i;
									try {
										var Y = M.stateNode;
										c ? Ey(Y, !0) : Ey(M.stateNode, !1);
									} catch (he) {
										Je(M, M.return, he);
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
						((l = t.updateQueue), l !== null && ((a = l.retryQueue), a !== null && ((l.retryQueue = null), Cs(t, a))));
					break;
				case 19:
					(_n(i, t), Sn(t), l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), Cs(t, l))));
					break;
				case 30:
					break;
				case 21:
					break;
				default:
					(_n(i, t), Sn(t));
			}
		}
		function Sn(t) {
			var i = t.flags;
			if (i & 2) {
				try {
					for (var a, l = t.return; l !== null; ) {
						if (Tg(l)) {
							a = l;
							break;
						}
						l = l.return;
					}
					if (a == null) throw Error(s(160));
					switch (a.tag) {
						case 27:
							var c = a.stateNode;
							As(t, Rf(t), c);
							break;
						case 5:
							var d = a.stateNode;
							(a.flags & 32 && (wa(d, ""), (a.flags &= -33)), As(t, Rf(t), d));
							break;
						case 3:
						case 4:
							var y = a.stateNode.containerInfo;
							Of(t, Rf(t), y);
							break;
						default:
							throw Error(s(161));
					}
				} catch (T) {
					Je(t, t.return, T);
				}
				t.flags &= -3;
			}
			i & 4096 && (t.flags &= -4097);
		}
		function zg(t) {
			if (t.subtreeFlags & 1024)
				for (t = t.child; t !== null; ) {
					var i = t;
					(zg(i), i.tag === 5 && i.flags & 1024 && i.stateNode.reset(), (t = t.sibling));
				}
		}
		function $i(t, i) {
			if (i.subtreeFlags & 8772) for (i = i.child; i !== null; ) (Cg(t, i.alternate, i), (i = i.sibling));
		}
		function ia(t) {
			for (t = t.child; t !== null; ) {
				var i = t;
				switch (i.tag) {
					case 0:
					case 11:
					case 14:
					case 15:
						(hr(4, i, i.return), ia(i));
						break;
					case 1:
						vi(i, i.return);
						var a = i.stateNode;
						(typeof a.componentWillUnmount == "function" && wg(i, i.return, a), ia(i));
						break;
					case 27:
						al(i.stateNode);
					case 26:
					case 5:
						(vi(i, i.return), ia(i));
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
		function Bi(t, i, a) {
			for (a = a && (i.subtreeFlags & 8772) !== 0, i = i.child; i !== null; ) {
				var l = i.alternate,
					c = t,
					d = i,
					y = d.flags;
				switch (d.tag) {
					case 0:
					case 11:
					case 15:
						(Bi(c, d, a), Gu(4, d));
						break;
					case 1:
						if ((Bi(c, d, a), (l = d), (c = l.stateNode), typeof c.componentDidMount == "function"))
							try {
								c.componentDidMount();
							} catch (V) {
								Je(l, l.return, V);
							}
						if (((l = d), (c = l.updateQueue), c !== null)) {
							var T = l.stateNode;
							try {
								var M = c.shared.hiddenCallbacks;
								if (M !== null) for (c.shared.hiddenCallbacks = null, c = 0; c < M.length; c++) hv(M[c], T);
							} catch (V) {
								Je(l, l.return, V);
							}
						}
						(a && y & 64 && Sg(d), Fu(d, d.return));
						break;
					case 27:
						xg(d);
					case 26:
					case 5:
						(Bi(c, d, a), a && l === null && y & 4 && Eg(d), Fu(d, d.return));
						break;
					case 12:
						Bi(c, d, a);
						break;
					case 31:
						(Bi(c, d, a), a && y & 4 && Ng(c, d));
						break;
					case 13:
						(Bi(c, d, a), a && y & 4 && kg(c, d));
						break;
					case 22:
						(d.memoizedState === null && Bi(c, d, a), Fu(d, d.return));
						break;
					case 30:
						break;
					default:
						Bi(c, d, a);
				}
				i = i.sibling;
			}
		}
		function kf(t, i) {
			var a = null;
			(t !== null &&
				t.memoizedState !== null &&
				t.memoizedState.cachePool !== null &&
				(a = t.memoizedState.cachePool.pool),
				(t = null),
				i.memoizedState !== null && i.memoizedState.cachePool !== null && (t = i.memoizedState.cachePool.pool),
				t !== a && (t != null && t.refCount++, a != null && Lu(a)));
		}
		function Mf(t, i) {
			((t = null),
				i.alternate !== null && (t = i.alternate.memoizedState.cache),
				(i = i.memoizedState.cache),
				i !== t && (i.refCount++, t != null && Lu(t)));
		}
		function ri(t, i, a, l) {
			if (i.subtreeFlags & 10256) for (i = i.child; i !== null; ) (Dg(t, i, a, l), (i = i.sibling));
		}
		function Dg(t, i, a, l) {
			var c = i.flags;
			switch (i.tag) {
				case 0:
				case 11:
				case 15:
					(ri(t, i, a, l), c & 2048 && Gu(9, i));
					break;
				case 1:
					ri(t, i, a, l);
					break;
				case 3:
					(ri(t, i, a, l),
						c & 2048 &&
							((t = null),
							i.alternate !== null && (t = i.alternate.memoizedState.cache),
							(i = i.memoizedState.cache),
							i !== t && (i.refCount++, t != null && Lu(t))));
					break;
				case 12:
					if (c & 2048) {
						(ri(t, i, a, l), (t = i.stateNode));
						try {
							var d = i.memoizedProps,
								y = d.id,
								T = d.onPostCommit;
							typeof T == "function" && T(y, i.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
						} catch (M) {
							Je(i, i.return, M);
						}
					} else ri(t, i, a, l);
					break;
				case 31:
					ri(t, i, a, l);
					break;
				case 13:
					ri(t, i, a, l);
					break;
				case 23:
					break;
				case 22:
					((d = i.stateNode),
						(y = i.alternate),
						i.memoizedState !== null
							? d._visibility & 2
								? ri(t, i, a, l)
								: Xu(t, i)
							: d._visibility & 2
								? ri(t, i, a, l)
								: ((d._visibility |= 2), Va(t, i, a, l, (i.subtreeFlags & 10256) !== 0 || !1)),
						c & 2048 && kf(y, i));
					break;
				case 24:
					(ri(t, i, a, l), c & 2048 && Mf(i.alternate, i));
					break;
				default:
					ri(t, i, a, l);
			}
		}
		function Va(t, i, a, l, c) {
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
						(Va(d, y, T, M, c), Gu(8, y));
						break;
					case 23:
						break;
					case 22:
						var W = y.stateNode;
						(y.memoizedState !== null
							? W._visibility & 2
								? Va(d, y, T, M, c)
								: Xu(d, y)
							: ((W._visibility |= 2), Va(d, y, T, M, c)),
							c && V & 2048 && kf(y.alternate, y));
						break;
					case 24:
						(Va(d, y, T, M, c), c && V & 2048 && Mf(y.alternate, y));
						break;
					default:
						Va(d, y, T, M, c);
				}
				i = i.sibling;
			}
		}
		function Xu(t, i) {
			if (i.subtreeFlags & 10256)
				for (i = i.child; i !== null; ) {
					var a = t,
						l = i,
						c = l.flags;
					switch (l.tag) {
						case 22:
							(Xu(a, l), c & 2048 && kf(l.alternate, l));
							break;
						case 24:
							(Xu(a, l), c & 2048 && Mf(l.alternate, l));
							break;
						default:
							Xu(a, l);
					}
					i = i.sibling;
				}
		}
		var Ju = 8192;
		function Za(t, i, a) {
			if (t.subtreeFlags & Ju) for (t = t.child; t !== null; ) (jg(t, i, a), (t = t.sibling));
		}
		function jg(t, i, a) {
			switch (t.tag) {
				case 26:
					(Za(t, i, a), t.flags & Ju && t.memoizedState !== null && $w(a, ii, t.memoizedState, t.memoizedProps));
					break;
				case 5:
					Za(t, i, a);
					break;
				case 3:
				case 4:
					var l = ii;
					((ii = Is(t.stateNode.containerInfo)), Za(t, i, a), (ii = l));
					break;
				case 22:
					t.memoizedState === null &&
						((l = t.alternate),
						l !== null && l.memoizedState !== null ? ((l = Ju), (Ju = 16777216), Za(t, i, a), (Ju = l)) : Za(t, i, a));
					break;
				default:
					Za(t, i, a);
			}
		}
		function Lg(t) {
			var i = t.alternate;
			if (i !== null && ((t = i.child), t !== null)) {
				i.child = null;
				do ((i = t.sibling), (t.sibling = null), (t = i));
				while (t !== null);
			}
		}
		function Wu(t) {
			var i = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (i !== null)
					for (var a = 0; a < i.length; a++) {
						var l = i[a];
						((Wt = l), Ug(l, t));
					}
				Lg(t);
			}
			if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (qg(t), (t = t.sibling));
		}
		function qg(t) {
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(Wu(t), t.flags & 2048 && hr(9, t, t.return));
					break;
				case 3:
					Wu(t);
					break;
				case 12:
					Wu(t);
					break;
				case 22:
					var i = t.stateNode;
					t.memoizedState !== null && i._visibility & 2 && (t.return === null || t.return.tag !== 13)
						? ((i._visibility &= -3), Rs(t))
						: Wu(t);
					break;
				default:
					Wu(t);
			}
		}
		function Rs(t) {
			var i = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (i !== null)
					for (var a = 0; a < i.length; a++) {
						var l = i[a];
						((Wt = l), Ug(l, t));
					}
				Lg(t);
			}
			for (t = t.child; t !== null; ) {
				switch (((i = t), i.tag)) {
					case 0:
					case 11:
					case 15:
						(hr(8, i, i.return), Rs(i));
						break;
					case 22:
						((a = i.stateNode), a._visibility & 2 && ((a._visibility &= -3), Rs(i)));
						break;
					default:
						Rs(i);
				}
				t = t.sibling;
			}
		}
		function Ug(t, i) {
			for (; Wt !== null; ) {
				var a = Wt;
				switch (a.tag) {
					case 0:
					case 11:
					case 15:
						hr(8, a, i);
						break;
					case 23:
					case 22:
						if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
							var l = a.memoizedState.cachePool.pool;
							l != null && l.refCount++;
						}
						break;
					case 24:
						Lu(a.memoizedState.cache);
				}
				if (((l = a.child), l !== null)) ((l.return = a), (Wt = l));
				else
					e: for (a = t; Wt !== null; ) {
						l = Wt;
						var c = l.sibling,
							d = l.return;
						if ((Rg(l), l === a)) {
							Wt = null;
							break e;
						}
						if (c !== null) {
							((c.return = d), (Wt = c));
							break e;
						}
						Wt = d;
					}
			}
		}
		var nw = {
				getCacheForType: function (t) {
					var i = un(qt),
						a = i.data.get(t);
					return (a === void 0 && ((a = t()), i.data.set(t, a)), a);
				},
				cacheSignal: function () {
					return un(qt).controller.signal;
				},
			},
			iw = typeof WeakMap == "function" ? WeakMap : Map,
			He = 0,
			it = null,
			je = null,
			qe = 0,
			Xe = 0,
			zn = null,
			mr = !1,
			Ha = !1,
			zf = !1,
			Ii = 0,
			Ot = 0,
			vr = 0,
			ra = 0,
			Df = 0,
			Dn = 0,
			Pa = 0,
			el = null,
			wn = null,
			jf = !1,
			Os = 0,
			$g = 0,
			Ns = 1 / 0,
			ks = null,
			gr = null,
			Gt = 0,
			yr = null,
			Qa = null,
			Vi = 0,
			Lf = 0,
			qf = null,
			Bg = null,
			tl = 0,
			Uf = null;
		function Kn() {
			return (He & 2) !== 0 && qe !== 0 ? qe & -qe : $.T !== null ? Hf() : fi();
		}
		function Ig() {
			if (Dn === 0)
				if ((qe & 536870912) === 0 || $e) {
					var t = ci;
					((ci <<= 1), (ci & 3932160) === 0 && (ci = 262144), (Dn = t));
				} else Dn = 536870912;
			return ((t = kn.current), t !== null && (t.flags |= 32), Dn);
		}
		function En(t, i, a) {
			(((t === it && (Xe === 2 || Xe === 9)) || t.cancelPendingCommit !== null) && (Ka(t, 0), pr(t, qe, Dn, !1)),
				at(t, a),
				((He & 2) === 0 || t !== it) &&
					(t === it && ((He & 2) === 0 && (ra |= a), Ot === 4 && pr(t, qe, Dn, !1)), Zi(t)));
		}
		function Vg(t, i, a) {
			if ((He & 6) !== 0) throw Error(s(327));
			var l = (!a && (i & 127) === 0 && (i & t.expiredLanes) === 0) || J(t, i),
				c = l ? uw(t, i) : Bf(t, i, !0),
				d = l;
			do {
				if (c === 0) {
					Ha && !l && pr(t, i, 0, !1);
					break;
				} else {
					if (((a = t.current.alternate), d && !rw(a))) {
						((c = Bf(t, i, !1)), (d = !1));
						continue;
					}
					if (c === 2) {
						if (((d = i), t.errorRecoveryDisabledLanes & d)) var y = 0;
						else ((y = t.pendingLanes & -536870913), (y = y !== 0 ? y : y & 536870912 ? 536870912 : 0));
						if (y !== 0) {
							i = y;
							e: {
								var T = t;
								c = el;
								var M = T.current.memoizedState.isDehydrated;
								if ((M && (Ka(T, y).flags |= 256), (y = Bf(T, y, !1)), y !== 2)) {
									if (zf && !M) {
										((T.errorRecoveryDisabledLanes |= d), (ra |= d), (c = 4));
										break e;
									}
									((d = wn), (wn = c), d !== null && (wn === null ? (wn = d) : wn.push.apply(wn, d)));
								}
								c = y;
							}
							if (((d = !1), c !== 2)) continue;
						}
					}
					if (c === 1) {
						(Ka(t, 0), pr(t, i, 0, !0));
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
								pr(l, i, Dn, !mr);
								break e;
							case 2:
								wn = null;
								break;
							case 3:
							case 5:
								break;
							default:
								throw Error(s(329));
						}
						if ((i & 62914560) === i && ((c = Os + 300 - Oe()), 10 < c)) {
							if ((pr(l, i, Dn, !mr), Ti(l, 0, !0) !== 0)) break e;
							((Vi = i),
								(l.timeoutHandle = _y(Zg.bind(null, l, a, wn, ks, jf, i, Dn, ra, Pa, mr, d, "Throttled", -0, 0), c)));
							break e;
						}
						Zg(l, a, wn, ks, jf, i, Dn, ra, Pa, mr, d, null, -0, 0);
					}
				}
				break;
			} while (!0);
			Zi(t);
		}
		function Zg(t, i, a, l, c, d, y, T, M, V, W, ie, H, Y) {
			if (((t.timeoutHandle = -1), (ie = i.subtreeFlags), ie & 8192 || (ie & 16785408) === 16785408)) {
				((ie = {
					stylesheets: null,
					count: 0,
					imgCount: 0,
					imgBytes: 0,
					suspenseyImages: [],
					waitingForImages: !0,
					waitingForViewTransition: !1,
					unsuspend: Ci,
				}),
					jg(i, d, ie));
				var he = (d & 62914560) === d ? Os - Oe() : (d & 4194048) === d ? $g - Oe() : 0;
				if (((he = Bw(ie, he)), he !== null)) {
					((Vi = d),
						(t.cancelPendingCommit = he(Xg.bind(null, t, i, d, a, l, c, y, T, M, W, ie, null, H, Y))),
						pr(t, d, y, !V));
					return;
				}
			}
			Xg(t, i, d, a, l, c, y, T, M);
		}
		function rw(t) {
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
							if (!On(d(), c)) return !1;
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
		function pr(t, i, a, l) {
			((i &= ~Df),
				(i &= ~ra),
				(t.suspendedLanes |= i),
				(t.pingedLanes &= ~i),
				l && (t.warmLanes |= i),
				(l = t.expirationTimes));
			for (var c = i; 0 < c; ) {
				var d = 31 - jt(c),
					y = 1 << d;
				((l[d] = -1), (c &= ~y));
			}
			a !== 0 && nn(t, a, i);
		}
		function Ms() {
			return (He & 6) === 0 ? (nl(0, !1), !1) : !0;
		}
		function $f() {
			if (je !== null) {
				if (Xe === 0) var t = je.return;
				else ((t = je), (ki = Kr = null), ef(t), (qa = null), (Uu = 0), (t = je));
				for (; t !== null; ) (_g(t.alternate, t), (t = t.return));
				je = null;
			}
		}
		function Ka(t, i) {
			var a = t.timeoutHandle;
			(a !== -1 && ((t.timeoutHandle = -1), ww(a)),
				(a = t.cancelPendingCommit),
				a !== null && ((t.cancelPendingCommit = null), a()),
				(Vi = 0),
				$f(),
				(it = t),
				(je = a = Oi(t.current, null)),
				(qe = i),
				(Xe = 0),
				(zn = null),
				(mr = !1),
				(Ha = J(t, i)),
				(zf = !1),
				(Pa = Dn = Df = ra = vr = Ot = 0),
				(wn = el = null),
				(jf = !1),
				(i & 8) !== 0 && (i |= i & 32));
			var l = t.entangledLanes;
			if (l !== 0)
				for (t = t.entanglements, l &= i; 0 < l; ) {
					var c = 31 - jt(l),
						d = 1 << c;
					((i |= t[c]), (l &= ~d));
				}
			return ((Ii = i), Wl(), a);
		}
		function Hg(t, i) {
			((ke = null),
				($.H = Qu),
				i === La || i === ls
					? ((i = ov()), (Xe = 3))
					: i === Vc
						? ((i = ov()), (Xe = 4))
						: (Xe = i === yf ? 8 : i !== null && typeof i == "object" && typeof i.then == "function" ? 6 : 1),
				(zn = i),
				je === null && ((Ot = 1), Ss(t, Vn(i, t.current))));
		}
		function Pg() {
			var t = kn.current;
			return t === null
				? !0
				: (qe & 4194048) === qe
					? Qn === null
					: (qe & 62914560) === qe || (qe & 536870912) !== 0
						? t === Qn
						: !1;
		}
		function Qg() {
			var t = $.H;
			return (($.H = Qu), t === null ? Qu : t);
		}
		function Kg() {
			var t = $.A;
			return (($.A = nw), t);
		}
		function zs() {
			((Ot = 4),
				mr || ((qe & 4194048) !== qe && kn.current !== null) || (Ha = !0),
				((vr & 134217727) === 0 && (ra & 134217727) === 0) || it === null || pr(it, qe, Dn, !1));
		}
		function Bf(t, i, a) {
			var l = He;
			He |= 2;
			var c = Qg(),
				d = Kg();
			((it !== t || qe !== i) && ((ks = null), Ka(t, i)), (i = !1));
			var y = Ot;
			e: do
				try {
					if (Xe !== 0 && je !== null) {
						var T = je,
							M = zn;
						switch (Xe) {
							case 8:
								($f(), (y = 6));
								break e;
							case 3:
							case 2:
							case 9:
							case 6:
								kn.current === null && (i = !0);
								var V = Xe;
								if (((Xe = 0), (zn = null), Ya(t, T, M, V), a && Ha)) {
									y = 0;
									break e;
								}
								break;
							default:
								((V = Xe), (Xe = 0), (zn = null), Ya(t, T, M, V));
						}
					}
					(aw(), (y = Ot));
					break;
				} catch (W) {
					Hg(t, W);
				}
			while (!0);
			return (
				i && t.shellSuspendCounter++,
				(ki = Kr = null),
				(He = l),
				($.H = c),
				($.A = d),
				je === null && ((it = null), (qe = 0), Wl()),
				y
			);
		}
		function aw() {
			for (; je !== null; ) Yg(je);
		}
		function uw(t, i) {
			var a = He;
			He |= 2;
			var l = Qg(),
				c = Kg();
			it !== t || qe !== i ? ((ks = null), (Ns = Oe() + 500), Ka(t, i)) : (Ha = J(t, i));
			e: do
				try {
					if (Xe !== 0 && je !== null) {
						i = je;
						var d = zn;
						t: switch (Xe) {
							case 1:
								((Xe = 0), (zn = null), Ya(t, i, d, 1));
								break;
							case 2:
							case 9:
								if (lv(d)) {
									((Xe = 0), (zn = null), Gg(i));
									break;
								}
								((i = function () {
									((Xe !== 2 && Xe !== 9) || it !== t || (Xe = 7), Zi(t));
								}),
									d.then(i, i));
								break e;
							case 3:
								Xe = 7;
								break e;
							case 4:
								Xe = 5;
								break e;
							case 7:
								lv(d) ? ((Xe = 0), (zn = null), Gg(i)) : ((Xe = 0), (zn = null), Ya(t, i, d, 7));
								break;
							case 5:
								var y = null;
								switch (je.tag) {
									case 26:
										y = je.memoizedState;
									case 5:
									case 27:
										var T = je;
										if (y ? jy(y) : T.stateNode.complete) {
											((Xe = 0), (zn = null));
											var M = T.sibling;
											if (M !== null) je = M;
											else {
												var V = T.return;
												V !== null ? ((je = V), Ds(V)) : (je = null);
											}
											break t;
										}
								}
								((Xe = 0), (zn = null), Ya(t, i, d, 5));
								break;
							case 6:
								((Xe = 0), (zn = null), Ya(t, i, d, 6));
								break;
							case 8:
								($f(), (Ot = 6));
								break e;
							default:
								throw Error(s(462));
						}
					}
					lw();
					break;
				} catch (W) {
					Hg(t, W);
				}
			while (!0);
			return ((ki = Kr = null), ($.H = l), ($.A = c), (He = a), je !== null ? 0 : ((it = null), (qe = 0), Wl(), Ot));
		}
		function lw() {
			for (; je !== null && !Ae(); ) Yg(je);
		}
		function Yg(t) {
			var i = pg(t.alternate, t, Ii);
			((t.memoizedProps = t.pendingProps), i === null ? Ds(t) : (je = i));
		}
		function Gg(t) {
			var i = t,
				a = i.alternate;
			switch (i.tag) {
				case 15:
				case 0:
					i = dg(a, i, i.pendingProps, i.type, void 0, qe);
					break;
				case 11:
					i = dg(a, i, i.pendingProps, i.type.render, i.ref, qe);
					break;
				case 5:
					ef(i);
				default:
					(_g(a, i), (i = je = Fm(i, Ii)), (i = pg(a, i, Ii)));
			}
			((t.memoizedProps = t.pendingProps), i === null ? Ds(t) : (je = i));
		}
		function Ya(t, i, a, l) {
			((ki = Kr = null), ef(i), (qa = null), (Uu = 0));
			var c = i.return;
			try {
				if (GS(t, c, i, a, qe)) {
					((Ot = 1), Ss(t, Vn(a, t.current)), (je = null));
					return;
				}
			} catch (d) {
				if (c !== null) throw ((je = c), d);
				((Ot = 1), Ss(t, Vn(a, t.current)), (je = null));
				return;
			}
			i.flags & 32768
				? ($e || l === 1
						? (t = !0)
						: Ha || (qe & 536870912) !== 0
							? (t = !1)
							: ((mr = t = !0),
								(l === 2 || l === 9 || l === 3 || l === 6) &&
									((l = kn.current), l !== null && l.tag === 13 && (l.flags |= 16384))),
					Fg(i, t))
				: Ds(i);
		}
		function Ds(t) {
			var i = t;
			do {
				if ((i.flags & 32768) !== 0) {
					Fg(i, mr);
					return;
				}
				t = i.return;
				var a = JS(i.alternate, i, Ii);
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
			Ot === 0 && (Ot = 5);
		}
		function Fg(t, i) {
			do {
				var a = WS(t.alternate, t);
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
			((Ot = 6), (je = null));
		}
		function Xg(t, i, a, l, c, d, y, T, M) {
			t.cancelPendingCommit = null;
			do js();
			while (Gt !== 0);
			if ((He & 6) !== 0) throw Error(s(327));
			if (i !== null) {
				if (i === t.current) throw Error(s(177));
				if (
					((d = i.lanes | i.childLanes),
					(d |= Cc),
					ut(t, a, d, y, T, M),
					t === it && ((je = it = null), (qe = 0)),
					(Qa = i),
					(yr = t),
					(Vi = a),
					(Lf = d),
					(qf = c),
					(Bg = l),
					(i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0
						? ((t.callbackNode = null),
							(t.callbackPriority = 0),
							fw(Xt, function () {
								return (ny(), null);
							}))
						: ((t.callbackNode = null), (t.callbackPriority = 0)),
					(l = (i.flags & 13878) !== 0),
					(i.subtreeFlags & 13878) !== 0 || l)
				) {
					((l = $.T), ($.T = null), (c = P.p), (P.p = 2), (y = He), (He |= 4));
					try {
						ew(t, i, a);
					} finally {
						((He = y), (P.p = c), ($.T = l));
					}
				}
				((Gt = 1), Jg(), Wg(), ey());
			}
		}
		function Jg() {
			if (Gt === 1) {
				Gt = 0;
				var t = yr,
					i = Qa,
					a = (i.flags & 13878) !== 0;
				if ((i.subtreeFlags & 13878) !== 0 || a) {
					((a = $.T), ($.T = null));
					var l = P.p;
					P.p = 2;
					var c = He;
					He |= 4;
					try {
						Mg(i, t);
						var d = Xf,
							y = Im(t.containerInfo),
							T = d.focusedElem,
							M = d.selectionRange;
						if (y !== T && T && T.ownerDocument && Bm(T.ownerDocument.documentElement, T)) {
							if (M !== null && wc(T)) {
								var V = M.start,
									W = M.end;
								if ((W === void 0 && (W = V), "selectionStart" in T))
									((T.selectionStart = V), (T.selectionEnd = Math.min(W, T.value.length)));
								else {
									var ie = T.ownerDocument || document,
										H = (ie && ie.defaultView) || window;
									if (H.getSelection) {
										var Y = H.getSelection(),
											he = T.textContent.length,
											Te = Math.min(M.start, he),
											tt = M.end === void 0 ? Te : Math.min(M.end, he);
										!Y.extend && Te > tt && ((y = tt), (tt = Te), (Te = y));
										var U = $m(T, Te),
											L = $m(T, tt);
										if (
											U &&
											L &&
											(Y.rangeCount !== 1 ||
												Y.anchorNode !== U.node ||
												Y.anchorOffset !== U.offset ||
												Y.focusNode !== L.node ||
												Y.focusOffset !== L.offset)
										) {
											var I = ie.createRange();
											(I.setStart(U.node, U.offset),
												Y.removeAllRanges(),
												Te > tt
													? (Y.addRange(I), Y.extend(L.node, L.offset))
													: (I.setEnd(L.node, L.offset), Y.addRange(I)));
										}
									}
								}
							}
							for (ie = [], Y = T; (Y = Y.parentNode); )
								Y.nodeType === 1 && ie.push({ element: Y, left: Y.scrollLeft, top: Y.scrollTop });
							for (typeof T.focus == "function" && T.focus(), T = 0; T < ie.length; T++) {
								var te = ie[T];
								((te.element.scrollLeft = te.left), (te.element.scrollTop = te.top));
							}
						}
						((Ks = !!Ff), (Xf = Ff = null));
					} finally {
						((He = c), (P.p = l), ($.T = a));
					}
				}
				((t.current = i), (Gt = 2));
			}
		}
		function Wg() {
			if (Gt === 2) {
				Gt = 0;
				var t = yr,
					i = Qa,
					a = (i.flags & 8772) !== 0;
				if ((i.subtreeFlags & 8772) !== 0 || a) {
					((a = $.T), ($.T = null));
					var l = P.p;
					P.p = 2;
					var c = He;
					He |= 4;
					try {
						Cg(t, i.alternate, i);
					} finally {
						((He = c), (P.p = l), ($.T = a));
					}
				}
				Gt = 3;
			}
		}
		function ey() {
			if (Gt === 4 || Gt === 3) {
				((Gt = 0), lt());
				var t = yr,
					i = Qa,
					a = Vi,
					l = Bg;
				(i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0
					? (Gt = 5)
					: ((Gt = 0), (Qa = yr = null), ty(t, t.pendingLanes));
				var c = t.pendingLanes;
				if ((c === 0 && (gr = null), At(a), (i = i.stateNode), Yt && typeof Yt.onCommitFiberRoot == "function"))
					try {
						Yt.onCommitFiberRoot(gn, i, void 0, (i.current.flags & 128) === 128);
					} catch {}
				if (l !== null) {
					((i = $.T), (c = P.p), (P.p = 2), ($.T = null));
					try {
						for (var d = t.onRecoverableError, y = 0; y < l.length; y++) {
							var T = l[y];
							d(T.value, { componentStack: T.stack });
						}
					} finally {
						(($.T = i), (P.p = c));
					}
				}
				((Vi & 3) !== 0 && js(),
					Zi(t),
					(c = t.pendingLanes),
					(a & 261930) !== 0 && (c & 42) !== 0 ? (t === Uf ? tl++ : ((tl = 0), (Uf = t))) : (tl = 0),
					nl(0, !1));
			}
		}
		function ty(t, i) {
			(t.pooledCacheLanes &= i) === 0 && ((i = t.pooledCache), i != null && ((t.pooledCache = null), Lu(i)));
		}
		function js() {
			return (Jg(), Wg(), ey(), ny());
		}
		function ny() {
			if (Gt !== 5) return !1;
			var t = yr,
				i = Lf;
			Lf = 0;
			var a = At(Vi),
				l = $.T,
				c = P.p;
			try {
				((P.p = 32 > a ? 32 : a), ($.T = null), (a = qf), (qf = null));
				var d = yr,
					y = Vi;
				if (((Gt = 0), (Qa = yr = null), (Vi = 0), (He & 6) !== 0)) throw Error(s(331));
				var T = He;
				if (
					((He |= 4),
					qg(d.current),
					Dg(d, d.current, y, a),
					(He = T),
					nl(0, !1),
					Yt && typeof Yt.onPostCommitFiberRoot == "function")
				)
					try {
						Yt.onPostCommitFiberRoot(gn, d);
					} catch {}
				return !0;
			} finally {
				((P.p = c), ($.T = l), ty(t, i));
			}
		}
		function iy(t, i, a) {
			((i = Vn(a, i)), (i = gf(t.stateNode, i, 2)), (t = ea(t, i, 2)), t !== null && (at(t, 2), Zi(t)));
		}
		function Je(t, i, a) {
			if (t.tag === 3) iy(t, t, a);
			else
				for (; i !== null; ) {
					if (i.tag === 3) {
						iy(i, t, a);
						break;
					} else if (i.tag === 1) {
						var l = i.stateNode;
						if (
							typeof i.type.getDerivedStateFromError == "function" ||
							(typeof l.componentDidCatch == "function" && (gr === null || !gr.has(l)))
						) {
							((t = Vn(a, t)), (a = rg(2)), (l = ea(i, a, 2)), l !== null && (ag(a, l, i, t), at(l, 2), Zi(l)));
							break;
						}
					}
					i = i.return;
				}
		}
		function If(t, i, a) {
			var l = t.pingCache;
			if (l === null) {
				l = t.pingCache = new iw();
				var c = new Set();
				l.set(i, c);
			} else ((c = l.get(i)), c === void 0 && ((c = new Set()), l.set(i, c)));
			c.has(a) || ((zf = !0), c.add(a), (t = sw.bind(null, t, i, a)), i.then(t, t));
		}
		function sw(t, i, a) {
			var l = t.pingCache;
			(l !== null && l.delete(i),
				(t.pingedLanes |= t.suspendedLanes & a),
				(t.warmLanes &= ~a),
				it === t &&
					(qe & a) === a &&
					(Ot === 4 || (Ot === 3 && (qe & 62914560) === qe && 300 > Oe() - Os) ? (He & 2) === 0 && Ka(t, 0) : (Df |= a),
					Pa === qe && (Pa = 0)),
				Zi(t));
		}
		function ry(t, i) {
			(i === 0 && (i = xe()), (t = Hr(t, i)), t !== null && (at(t, i), Zi(t)));
		}
		function ow(t) {
			var i = t.memoizedState,
				a = 0;
			(i !== null && (a = i.retryLane), ry(t, a));
		}
		function cw(t, i) {
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
			(l !== null && l.delete(i), ry(t, a));
		}
		function fw(t, i) {
			return rt(t, i);
		}
		var Ls = null,
			Ga = null,
			Vf = !1,
			qs = !1,
			Zf = !1,
			br = 0;
		function Zi(t) {
			(t !== Ga && t.next === null && (Ga === null ? (Ls = Ga = t) : (Ga = Ga.next = t)),
				(qs = !0),
				Vf || ((Vf = !0), hw()));
		}
		function nl(t, i) {
			if (!Zf && qs) {
				Zf = !0;
				do
					for (var a = !1, l = Ls; l !== null; ) {
						if (!i)
							if (t !== 0) {
								var c = l.pendingLanes;
								if (c === 0) var d = 0;
								else {
									var y = l.suspendedLanes,
										T = l.pingedLanes;
									((d = (1 << (31 - jt(42 | t) + 1)) - 1),
										(d &= c & ~(y & ~T)),
										(d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0));
								}
								d !== 0 && ((a = !0), sy(l, d));
							} else
								((d = qe),
									(d = Ti(l, l === it ? d : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1)),
									(d & 3) === 0 || J(l, d) || ((a = !0), sy(l, d)));
						l = l.next;
					}
				while (a);
				Zf = !1;
			}
		}
		function dw() {
			ay();
		}
		function ay() {
			qs = Vf = !1;
			var t = 0;
			br !== 0 && Sw() && (t = br);
			for (var i = Oe(), a = null, l = Ls; l !== null; ) {
				var c = l.next,
					d = uy(l, i);
				(d === 0
					? ((l.next = null), a === null ? (Ls = c) : (a.next = c), c === null && (Ga = a))
					: ((a = l), (t !== 0 || (d & 3) !== 0) && (qs = !0)),
					(l = c));
			}
			((Gt !== 0 && Gt !== 5) || nl(t, !1), br !== 0 && (br = 0));
		}
		function uy(t, i) {
			for (
				var a = t.suspendedLanes, l = t.pingedLanes, c = t.expirationTimes, d = t.pendingLanes & -62914561;
				0 < d;
			) {
				var y = 31 - jt(d),
					T = 1 << y,
					M = c[y];
				(M === -1 ? ((T & a) === 0 || (T & l) !== 0) && (c[y] = de(T, i)) : M <= i && (t.expiredLanes |= T), (d &= ~T));
			}
			if (
				((i = it),
				(a = qe),
				(a = Ti(t, t === i ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				(l = t.callbackNode),
				a === 0 || (t === i && (Xe === 2 || Xe === 9)) || t.cancelPendingCommit !== null)
			)
				return (l !== null && l !== null && ae(l), (t.callbackNode = null), (t.callbackPriority = 0));
			if ((a & 3) === 0 || J(t, a)) {
				if (((i = a & -a), i === t.callbackPriority)) return i;
				switch ((l !== null && ae(l), At(a))) {
					case 2:
					case 8:
						a = st;
						break;
					case 32:
						a = Xt;
						break;
					case 268435456:
						a = fn;
						break;
					default:
						a = Xt;
				}
				return ((l = ly.bind(null, t)), (a = rt(a, l)), (t.callbackPriority = i), (t.callbackNode = a), i);
			}
			return (l !== null && l !== null && ae(l), (t.callbackPriority = 2), (t.callbackNode = null), 2);
		}
		function ly(t, i) {
			if (Gt !== 0 && Gt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
			var a = t.callbackNode;
			if (js() && t.callbackNode !== a) return null;
			var l = qe;
			return (
				(l = Ti(t, t === it ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				l === 0
					? null
					: (Vg(t, l, i), uy(t, Oe()), t.callbackNode != null && t.callbackNode === a ? ly.bind(null, t) : null)
			);
		}
		function sy(t, i) {
			if (js()) return null;
			Vg(t, i, !0);
		}
		function hw() {
			Ew(function () {
				(He & 6) !== 0 ? rt(Ft, dw) : ay();
			});
		}
		function Hf() {
			if (br === 0) {
				var t = Da;
				(t === 0 && ((t = yn), (yn <<= 1), (yn & 261888) === 0 && (yn = 256)), (br = t));
			}
			return br;
		}
		function oy(t) {
			return t == null || typeof t == "symbol" || typeof t == "boolean"
				? null
				: typeof t == "function"
					? t
					: Pl("" + t);
		}
		function cy(t, i) {
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
		function mw(t, i, a, l, c) {
			if (i === "submit" && a && a.stateNode === c) {
				var d = oy((c[Z] || null).action),
					y = l.submitter;
				y &&
					((i = (i = y[Z] || null) ? oy(i.formAction) : y.getAttribute("formAction")),
					i !== null && ((d = i), (y = null)));
				var T = new Gl("action", "action", null, l, c);
				t.push({
					event: T,
					listeners: [
						{
							instance: null,
							listener: function () {
								if (l.defaultPrevented) {
									if (br !== 0) {
										var M = y ? cy(c, y) : new FormData(c);
										cf(a, { pending: !0, data: M, method: c.method, action: d }, null, M);
									}
								} else
									typeof d == "function" &&
										(T.preventDefault(),
										(M = y ? cy(c, y) : new FormData(c)),
										cf(a, { pending: !0, data: M, method: c.method, action: d }, d, M));
							},
							currentTarget: c,
						},
					],
				});
			}
		}
		for (var Pf = 0; Pf < Ac.length; Pf++) {
			var Qf = Ac[Pf];
			ni(Qf.toLowerCase(), "on" + (Qf[0].toUpperCase() + Qf.slice(1)));
		}
		(ni(Hm, "onAnimationEnd"),
			ni(Pm, "onAnimationIteration"),
			ni(Qm, "onAnimationStart"),
			ni("dblclick", "onDoubleClick"),
			ni("focusin", "onFocus"),
			ni("focusout", "onBlur"),
			ni(OS, "onTransitionRun"),
			ni(NS, "onTransitionStart"),
			ni(kS, "onTransitionCancel"),
			ni(Km, "onTransitionEnd"),
			_a("onMouseEnter", ["mouseout", "mouseover"]),
			_a("onMouseLeave", ["mouseout", "mouseover"]),
			_a("onPointerEnter", ["pointerout", "pointerover"]),
			_a("onPointerLeave", ["pointerout", "pointerover"]),
			Br("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
			Br("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
			Br("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
			Br("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
			Br("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
			Br("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" ")));
		var il =
				"abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
					" ",
				),
			vw = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(il));
		function fy(t, i) {
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
							} catch (W) {
								Jl(W);
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
							} catch (W) {
								Jl(W);
							}
							((c.currentTarget = null), (d = M));
						}
				}
			}
		}
		function Le(t, i) {
			var a = i[we];
			a === void 0 && (a = i[we] = new Set());
			var l = t + "__bubble";
			a.has(l) || (hy(i, t, 2, !1), a.add(l));
		}
		function Kf(t, i, a) {
			var l = 0;
			(i && (l |= 4), hy(a, t, l, i));
		}
		var Us = "_reactListening" + Math.random().toString(36).slice(2);
		function dy(t) {
			if (!t[Us]) {
				((t[Us] = !0),
					sm.forEach(function (a) {
						a !== "selectionchange" && (vw.has(a) || Kf(a, !1, t), Kf(a, !0, t));
					}));
				var i = t.nodeType === 9 ? t : t.ownerDocument;
				i === null || i[Us] || ((i[Us] = !0), Kf("selectionchange", !1, i));
			}
		}
		function hy(t, i, a, l) {
			switch (By(i)) {
				case 2:
					var c = Pw;
					break;
				case 8:
					c = Qw;
					break;
				default:
					c = sd;
			}
			((a = c.bind(null, i, a, t)),
				(c = void 0),
				!hc || (i !== "touchstart" && i !== "touchmove" && i !== "wheel") || (c = !0),
				l
					? c !== void 0
						? t.addEventListener(i, a, { capture: !0, passive: c })
						: t.addEventListener(i, a, !0)
					: c !== void 0
						? t.addEventListener(i, a, { passive: c })
						: t.addEventListener(i, a, !1));
		}
		function Yf(t, i, a, l, c) {
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
							if (((y = Ct(T)), y === null)) return;
							if (((M = y.tag), M === 5 || M === 6 || M === 26 || M === 27)) {
								l = d = y;
								continue e;
							}
							T = T.parentNode;
						}
					}
					l = l.return;
				}
			_m(function () {
				var V = d,
					W = fc(a),
					ie = [];
				e: {
					var H = Ym.get(t);
					if (H !== void 0) {
						var Y = Gl,
							he = t;
						switch (t) {
							case "keypress":
								if (Kl(a) === 0) break e;
							case "keydown":
							case "keyup":
								Y = dS;
								break;
							case "focusin":
								((he = "focus"), (Y = yc));
								break;
							case "focusout":
								((he = "blur"), (Y = yc));
								break;
							case "beforeblur":
							case "afterblur":
								Y = yc;
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
								Y = Em;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								Y = aS;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								Y = hS;
								break;
							case Hm:
							case Pm:
							case Qm:
								Y = uS;
								break;
							case Km:
								Y = mS;
								break;
							case "scroll":
							case "scrollend":
								Y = rS;
								break;
							case "wheel":
								Y = vS;
								break;
							case "copy":
							case "cut":
							case "paste":
								Y = lS;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								Y = xm;
								break;
							case "toggle":
							case "beforetoggle":
								Y = gS;
						}
						var Te = (i & 4) !== 0,
							tt = !Te && (t === "scroll" || t === "scrollend"),
							U = Te ? (H !== null ? H + "Capture" : null) : H;
						Te = [];
						for (var L = V, I; L !== null; ) {
							var te = L;
							if (
								((I = te.stateNode),
								(te = te.tag),
								(te !== 5 && te !== 26 && te !== 27) ||
									I === null ||
									U === null ||
									((te = xu(L, U)), te != null && Te.push(rl(L, te, I))),
								tt)
							)
								break;
							L = L.return;
						}
						0 < Te.length && ((H = new Y(H, he, null, a, W)), ie.push({ event: H, listeners: Te }));
					}
				}
				if ((i & 7) === 0) {
					e: {
						if (
							((H = t === "mouseover" || t === "pointerover"),
							(Y = t === "mouseout" || t === "pointerout"),
							H && a !== cc && (he = a.relatedTarget || a.fromElement) && (Ct(he) || he[oe]))
						)
							break e;
						if (
							(Y || H) &&
							((H = W.window === W ? W : (H = W.ownerDocument) ? H.defaultView || H.parentWindow : window),
							Y
								? ((he = a.relatedTarget || a.toElement),
									(Y = V),
									(he = he ? Ct(he) : null),
									he !== null &&
										((tt = f(he)), (Te = he.tag), he !== tt || (Te !== 5 && Te !== 27 && Te !== 6)) &&
										(he = null))
								: ((Y = null), (he = V)),
							Y !== he)
						) {
							if (
								((Te = Em),
								(te = "onMouseLeave"),
								(U = "onMouseEnter"),
								(L = "mouse"),
								(t === "pointerout" || t === "pointerover") &&
									((Te = xm), (te = "onPointerLeave"), (U = "onPointerEnter"), (L = "pointer")),
								(tt = Y == null ? H : xi(Y)),
								(I = he == null ? H : xi(he)),
								(H = new Te(te, L + "leave", Y, a, W)),
								(H.target = tt),
								(H.relatedTarget = I),
								(te = null),
								Ct(W) === V &&
									((Te = new Te(U, L + "enter", he, a, W)), (Te.target = I), (Te.relatedTarget = tt), (te = Te)),
								(tt = te),
								Y && he)
							)
								t: {
									for (Te = gw, U = Y, L = he, I = 0, te = U; te; te = Te(te)) I++;
									te = 0;
									for (var pe = L; pe; pe = Te(pe)) te++;
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
							(Y !== null && my(ie, H, Y, Te, !1), he !== null && tt !== null && my(ie, tt, he, Te, !0));
						}
					}
					e: {
						if (
							((H = V ? xi(V) : window),
							(Y = H.nodeName && H.nodeName.toLowerCase()),
							Y === "select" || (Y === "input" && H.type === "file"))
						)
							var Ve = zm;
						else if (km(H))
							if (Dm) Ve = AS;
							else {
								Ve = TS;
								var ve = ES;
							}
						else
							((Y = H.nodeName),
								!Y || Y.toLowerCase() !== "input" || (H.type !== "checkbox" && H.type !== "radio")
									? V && oc(V.elementType) && (Ve = zm)
									: (Ve = xS));
						if (Ve && (Ve = Ve(t, V))) {
							Mm(ie, Ve, a, W);
							break e;
						}
						(ve && ve(t, H, V),
							t === "focusout" &&
								V &&
								H.type === "number" &&
								V.memoizedProps.value != null &&
								sc(H, "number", H.value));
					}
					switch (((ve = V ? xi(V) : window), t)) {
						case "focusin":
							(km(ve) || ve.contentEditable === "true") && ((Aa = ve), (Ec = V), (zu = null));
							break;
						case "focusout":
							zu = Ec = Aa = null;
							break;
						case "mousedown":
							Tc = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							((Tc = !1), Vm(ie, a, W));
							break;
						case "selectionchange":
							if (RS) break;
						case "keydown":
						case "keyup":
							Vm(ie, a, W);
					}
					var Me;
					if (bc)
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
						xa
							? Om(t, a) && (Ue = "onCompositionEnd")
							: t === "keydown" && a.keyCode === 229 && (Ue = "onCompositionStart");
					(Ue &&
						(Am &&
							a.locale !== "ko" &&
							(xa || Ue !== "onCompositionStart"
								? Ue === "onCompositionEnd" && xa && (Me = Sm())
								: ((ar = W), (mc = "value" in ar ? ar.value : ar.textContent), (xa = !0))),
						(ve = $s(V, Ue)),
						0 < ve.length &&
							((Ue = new Tm(Ue, t, null, a, W)),
							ie.push({ event: Ue, listeners: ve }),
							Me ? (Ue.data = Me) : ((Me = Nm(a)), Me !== null && (Ue.data = Me)))),
						(Me = pS ? bS(t, a) : _S(t, a)) &&
							((Ue = $s(V, "onBeforeInput")),
							0 < Ue.length &&
								((ve = new Tm("onBeforeInput", "beforeinput", null, a, W)),
								ie.push({ event: ve, listeners: Ue }),
								(ve.data = Me))),
						mw(ie, t, V, a, W));
				}
				fy(ie, i);
			});
		}
		function rl(t, i, a) {
			return { instance: t, listener: i, currentTarget: a };
		}
		function $s(t, i) {
			for (var a = i + "Capture", l = []; t !== null; ) {
				var c = t,
					d = c.stateNode;
				if (
					((c = c.tag),
					(c !== 5 && c !== 26 && c !== 27) ||
						d === null ||
						((c = xu(t, a)), c != null && l.unshift(rl(t, c, d)), (c = xu(t, i)), c != null && l.push(rl(t, c, d))),
					t.tag === 3)
				)
					return l;
				t = t.return;
			}
			return [];
		}
		function gw(t) {
			if (t === null) return null;
			do t = t.return;
			while (t && t.tag !== 5 && t.tag !== 27);
			return t || null;
		}
		function my(t, i, a, l, c) {
			for (var d = i._reactName, y = []; a !== null && a !== l; ) {
				var T = a,
					M = T.alternate,
					V = T.stateNode;
				if (((T = T.tag), M !== null && M === l)) break;
				((T !== 5 && T !== 26 && T !== 27) ||
					V === null ||
					((M = V),
					c
						? ((V = xu(a, d)), V != null && y.unshift(rl(a, V, M)))
						: c || ((V = xu(a, d)), V != null && y.push(rl(a, V, M)))),
					(a = a.return));
			}
			y.length !== 0 && t.push({ event: i, listeners: y });
		}
		var yw = /\r\n?/g,
			pw = /\u0000|\uFFFD/g;
		function vy(t) {
			return (typeof t == "string" ? t : "" + t)
				.replace(
					yw,
					`
`,
				)
				.replace(pw, "");
		}
		function gy(t, i) {
			return ((i = vy(i)), vy(t) === i);
		}
		function et(t, i, a, l, c, d) {
			switch (a) {
				case "children":
					typeof l == "string"
						? i === "body" || (i === "textarea" && l === "") || wa(t, l)
						: (typeof l == "number" || typeof l == "bigint") && i !== "body" && wa(t, "" + l);
					break;
				case "className":
					Zl(t, "class", l);
					break;
				case "tabIndex":
					Zl(t, "tabindex", l);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					Zl(t, a, l);
					break;
				case "style":
					pm(t, l, d);
					break;
				case "data":
					if (i !== "object") {
						Zl(t, "data", l);
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
					((l = Pl("" + l)), t.setAttribute(a, l));
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
								? (i !== "input" && et(t, i, "name", c.name, c, null),
									et(t, i, "formEncType", c.formEncType, c, null),
									et(t, i, "formMethod", c.formMethod, c, null),
									et(t, i, "formTarget", c.formTarget, c, null))
								: (et(t, i, "encType", c.encType, c, null),
									et(t, i, "method", c.method, c, null),
									et(t, i, "target", c.target, c, null)));
					if (l == null || typeof l == "symbol" || typeof l == "boolean") {
						t.removeAttribute(a);
						break;
					}
					((l = Pl("" + l)), t.setAttribute(a, l));
					break;
				case "onClick":
					l != null && (t.onclick = Ci);
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
					((a = Pl("" + l)), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a));
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
					(Le("beforetoggle", t), Le("toggle", t), Vl(t, "popover", l));
					break;
				case "xlinkActuate":
					Ai(t, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
					break;
				case "xlinkArcrole":
					Ai(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
					break;
				case "xlinkRole":
					Ai(t, "http://www.w3.org/1999/xlink", "xlink:role", l);
					break;
				case "xlinkShow":
					Ai(t, "http://www.w3.org/1999/xlink", "xlink:show", l);
					break;
				case "xlinkTitle":
					Ai(t, "http://www.w3.org/1999/xlink", "xlink:title", l);
					break;
				case "xlinkType":
					Ai(t, "http://www.w3.org/1999/xlink", "xlink:type", l);
					break;
				case "xmlBase":
					Ai(t, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
					break;
				case "xmlLang":
					Ai(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
					break;
				case "xmlSpace":
					Ai(t, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
					break;
				case "is":
					Vl(t, "is", l);
					break;
				case "innerText":
				case "textContent":
					break;
				default:
					(!(2 < a.length) || (a[0] !== "o" && a[0] !== "O") || (a[1] !== "n" && a[1] !== "N")) &&
						((a = nS.get(a) || a), Vl(t, a, l));
			}
		}
		function Gf(t, i, a, l, c, d) {
			switch (a) {
				case "style":
					pm(t, l, d);
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
					typeof l == "string" ? wa(t, l) : (typeof l == "number" || typeof l == "bigint") && wa(t, "" + l);
					break;
				case "onScroll":
					l != null && Le("scroll", t);
					break;
				case "onScrollEnd":
					l != null && Le("scrollend", t);
					break;
				case "onClick":
					l != null && (t.onclick = Ci);
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
					if (!om.hasOwnProperty(a))
						e: {
							if (
								a[0] === "o" &&
								a[1] === "n" &&
								((c = a.endsWith("Capture")),
								(i = a.slice(2, c ? a.length - 7 : void 0)),
								(d = t[Z] || null),
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
							a in t ? (t[a] = l) : l === !0 ? t.setAttribute(a, "") : Vl(t, a, l);
						}
			}
		}
		function sn(t, i, a) {
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
										et(t, i, d, y, a, null);
								}
						}
					(c && et(t, i, "srcSet", a.srcSet, a, null), l && et(t, i, "src", a.src, a, null));
					return;
				case "input":
					Le("invalid", t);
					var T = (d = y = c = null),
						M = null,
						V = null;
					for (l in a)
						if (a.hasOwnProperty(l)) {
							var W = a[l];
							if (W != null)
								switch (l) {
									case "name":
										c = W;
										break;
									case "type":
										y = W;
										break;
									case "checked":
										M = W;
										break;
									case "defaultChecked":
										V = W;
										break;
									case "value":
										d = W;
										break;
									case "defaultValue":
										T = W;
										break;
									case "children":
									case "dangerouslySetInnerHTML":
										if (W != null) throw Error(s(137, i));
										break;
									default:
										et(t, i, l, W, a, null);
								}
						}
					mm(t, d, T, M, V, y, c, !1);
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
									et(t, i, c, T, a, null);
							}
					((i = d), (a = y), (t.multiple = !!l), i != null ? Sa(t, !!l, i, !1) : a != null && Sa(t, !!l, a, !0));
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
									et(t, i, y, T, a, null);
							}
					gm(t, l, c, d);
					return;
				case "option":
					for (M in a)
						if (a.hasOwnProperty(M) && ((l = a[M]), l != null))
							switch (M) {
								case "selected":
									t.selected = l && typeof l != "function" && typeof l != "symbol";
									break;
								default:
									et(t, i, M, l, a, null);
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
					for (l = 0; l < il.length; l++) Le(il[l], t);
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
									et(t, i, V, l, a, null);
							}
					return;
				default:
					if (oc(i)) {
						for (W in a) a.hasOwnProperty(W) && ((l = a[W]), l !== void 0 && Gf(t, i, W, l, a, void 0));
						return;
					}
			}
			for (T in a) a.hasOwnProperty(T) && ((l = a[T]), l != null && et(t, i, T, l, a, null));
		}
		function bw(t, i, a, l) {
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
						W = null;
					for (Y in a) {
						var ie = a[Y];
						if (a.hasOwnProperty(Y) && ie != null)
							switch (Y) {
								case "checked":
									break;
								case "value":
									break;
								case "defaultValue":
									M = ie;
								default:
									l.hasOwnProperty(Y) || et(t, i, Y, null, l, ie);
							}
					}
					for (var H in l) {
						var Y = l[H];
						if (((ie = a[H]), l.hasOwnProperty(H) && (Y != null || ie != null)))
							switch (H) {
								case "type":
									d = Y;
									break;
								case "name":
									c = Y;
									break;
								case "checked":
									V = Y;
									break;
								case "defaultChecked":
									W = Y;
									break;
								case "value":
									y = Y;
									break;
								case "defaultValue":
									T = Y;
									break;
								case "children":
								case "dangerouslySetInnerHTML":
									if (Y != null) throw Error(s(137, i));
									break;
								default:
									Y !== ie && et(t, i, H, Y, l, ie);
							}
					}
					lc(t, y, T, M, V, W, d, c);
					return;
				case "select":
					Y = y = T = H = null;
					for (d in a)
						if (((M = a[d]), a.hasOwnProperty(d) && M != null))
							switch (d) {
								case "value":
									break;
								case "multiple":
									Y = M;
								default:
									l.hasOwnProperty(d) || et(t, i, d, null, l, M);
							}
					for (c in l)
						if (((d = l[c]), (M = a[c]), l.hasOwnProperty(c) && (d != null || M != null)))
							switch (c) {
								case "value":
									H = d;
									break;
								case "defaultValue":
									T = d;
									break;
								case "multiple":
									y = d;
								default:
									d !== M && et(t, i, c, d, l, M);
							}
					((i = T),
						(a = y),
						(l = Y),
						H != null
							? Sa(t, !!a, H, !1)
							: !!l != !!a && (i != null ? Sa(t, !!a, i, !0) : Sa(t, !!a, a ? [] : "", !1)));
					return;
				case "textarea":
					Y = H = null;
					for (T in a)
						if (((c = a[T]), a.hasOwnProperty(T) && c != null && !l.hasOwnProperty(T)))
							switch (T) {
								case "value":
									break;
								case "children":
									break;
								default:
									et(t, i, T, null, l, c);
							}
					for (y in l)
						if (((c = l[y]), (d = a[y]), l.hasOwnProperty(y) && (c != null || d != null)))
							switch (y) {
								case "value":
									H = c;
									break;
								case "defaultValue":
									Y = c;
									break;
								case "children":
									break;
								case "dangerouslySetInnerHTML":
									if (c != null) throw Error(s(91));
									break;
								default:
									c !== d && et(t, i, y, c, l, d);
							}
					vm(t, H, Y);
					return;
				case "option":
					for (var he in a)
						if (((H = a[he]), a.hasOwnProperty(he) && H != null && !l.hasOwnProperty(he)))
							switch (he) {
								case "selected":
									t.selected = !1;
									break;
								default:
									et(t, i, he, null, l, H);
							}
					for (M in l)
						if (((H = l[M]), (Y = a[M]), l.hasOwnProperty(M) && H !== Y && (H != null || Y != null)))
							switch (M) {
								case "selected":
									t.selected = H && typeof H != "function" && typeof H != "symbol";
									break;
								default:
									et(t, i, M, H, l, Y);
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
						((H = a[Te]), a.hasOwnProperty(Te) && H != null && !l.hasOwnProperty(Te) && et(t, i, Te, null, l, H));
					for (V in l)
						if (((H = l[V]), (Y = a[V]), l.hasOwnProperty(V) && H !== Y && (H != null || Y != null)))
							switch (V) {
								case "children":
								case "dangerouslySetInnerHTML":
									if (H != null) throw Error(s(137, i));
									break;
								default:
									et(t, i, V, H, l, Y);
							}
					return;
				default:
					if (oc(i)) {
						for (var tt in a)
							((H = a[tt]),
								a.hasOwnProperty(tt) && H !== void 0 && !l.hasOwnProperty(tt) && Gf(t, i, tt, void 0, l, H));
						for (W in l)
							((H = l[W]),
								(Y = a[W]),
								!l.hasOwnProperty(W) || H === Y || (H === void 0 && Y === void 0) || Gf(t, i, W, H, l, Y));
						return;
					}
			}
			for (var U in a)
				((H = a[U]), a.hasOwnProperty(U) && H != null && !l.hasOwnProperty(U) && et(t, i, U, null, l, H));
			for (ie in l)
				((H = l[ie]),
					(Y = a[ie]),
					!l.hasOwnProperty(ie) || H === Y || (H == null && Y == null) || et(t, i, ie, H, l, Y));
		}
		function yy(t) {
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
		function _w() {
			if (typeof performance.getEntriesByType == "function") {
				for (var t = 0, i = 0, a = performance.getEntriesByType("resource"), l = 0; l < a.length; l++) {
					var c = a[l],
						d = c.transferSize,
						y = c.initiatorType,
						T = c.duration;
					if (d && T && yy(y)) {
						for (y = 0, T = c.responseEnd, l += 1; l < a.length; l++) {
							var M = a[l],
								V = M.startTime;
							if (V > T) break;
							var W = M.transferSize,
								ie = M.initiatorType;
							W && yy(ie) && ((M = M.responseEnd), (y += W * (M < T ? 1 : (T - V) / (M - V))));
						}
						if ((--l, (i += (8 * (d + y)) / (c.duration / 1e3)), t++, 10 < t)) break;
					}
				}
				if (0 < t) return i / t / 1e6;
			}
			return navigator.connection && ((t = navigator.connection.downlink), typeof t == "number") ? t : 5;
		}
		var Ff = null,
			Xf = null;
		function Bs(t) {
			return t.nodeType === 9 ? t : t.ownerDocument;
		}
		function py(t) {
			switch (t) {
				case "http://www.w3.org/2000/svg":
					return 1;
				case "http://www.w3.org/1998/Math/MathML":
					return 2;
				default:
					return 0;
			}
		}
		function by(t, i) {
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
		function Jf(t, i) {
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
		var Wf = null;
		function Sw() {
			var t = window.event;
			return t && t.type === "popstate" ? (t === Wf ? !1 : ((Wf = t), !0)) : ((Wf = null), !1);
		}
		var _y = typeof setTimeout == "function" ? setTimeout : void 0,
			ww = typeof clearTimeout == "function" ? clearTimeout : void 0,
			Sy = typeof Promise == "function" ? Promise : void 0,
			Ew =
				typeof queueMicrotask == "function"
					? queueMicrotask
					: typeof Sy < "u"
						? function (t) {
								return Sy.resolve(null).then(t).catch(Tw);
							}
						: _y;
		function Tw(t) {
			setTimeout(function () {
				throw t;
			});
		}
		function _r(t) {
			return t === "head";
		}
		function wy(t, i) {
			var a = i,
				l = 0;
			do {
				var c = a.nextSibling;
				if ((t.removeChild(a), c && c.nodeType === 8))
					if (((a = c.data), a === "/$" || a === "/&")) {
						if (l === 0) {
							(t.removeChild(c), Wa(i));
							return;
						}
						l--;
					} else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&") l++;
					else if (a === "html") al(t.ownerDocument.documentElement);
					else if (a === "head") {
						((a = t.ownerDocument.head), al(a));
						for (var d = a.firstChild; d; ) {
							var y = d.nextSibling,
								T = d.nodeName;
							(d[rn] ||
								T === "SCRIPT" ||
								T === "STYLE" ||
								(T === "LINK" && d.rel.toLowerCase() === "stylesheet") ||
								a.removeChild(d),
								(d = y));
						}
					} else a === "body" && al(t.ownerDocument.body);
				a = c;
			} while (a);
			Wa(i);
		}
		function Ey(t, i) {
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
		function ed(t) {
			var i = t.firstChild;
			for (i && i.nodeType === 10 && (i = i.nextSibling); i; ) {
				var a = i;
				switch (((i = i.nextSibling), a.nodeName)) {
					case "HTML":
					case "HEAD":
					case "BODY":
						(ed(a), ir(a));
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
		function xw(t, i, a, l) {
			for (; t.nodeType === 1; ) {
				var c = a;
				if (t.nodeName.toLowerCase() !== i.toLowerCase()) {
					if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
				} else if (l) {
					if (!t[rn])
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
				if (((t = Yn(t.nextSibling)), t === null)) break;
			}
			return null;
		}
		function Aw(t, i, a) {
			if (i === "") return null;
			for (; t.nodeType !== 3; )
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !a) ||
					((t = Yn(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function Ty(t, i) {
			for (; t.nodeType !== 8; )
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i) ||
					((t = Yn(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function td(t) {
			return t.data === "$?" || t.data === "$~";
		}
		function nd(t) {
			return t.data === "$!" || (t.data === "$?" && t.ownerDocument.readyState !== "loading");
		}
		function Cw(t, i) {
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
		function Yn(t) {
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
		var id = null;
		function xy(t) {
			t = t.nextSibling;
			for (var i = 0; t; ) {
				if (t.nodeType === 8) {
					var a = t.data;
					if (a === "/$" || a === "/&") {
						if (i === 0) return Yn(t.nextSibling);
						i--;
					} else (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") || i++;
				}
				t = t.nextSibling;
			}
			return null;
		}
		function Ay(t) {
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
		function Cy(t, i, a) {
			switch (((i = Bs(a)), t)) {
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
		function al(t) {
			for (var i = t.attributes; i.length; ) t.removeAttributeNode(i[0]);
			ir(t);
		}
		var Gn = new Map(),
			Ry = new Set();
		function Is(t) {
			return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
		}
		var Hi = P.d;
		P.d = { f: Rw, r: Ow, D: Nw, C: kw, L: Mw, m: zw, X: jw, S: Dw, M: Lw };
		function Rw() {
			var t = Hi.f(),
				i = Ms();
			return t || i;
		}
		function Ow(t) {
			var i = ti(t);
			i !== null && i.tag === 5 && i.type === "form" ? Kv(i) : Hi.r(t);
		}
		var Fa = typeof document > "u" ? null : document;
		function Oy(t, i, a) {
			var l = Fa;
			if (l && typeof i == "string" && i) {
				var c = Bn(i);
				((c = 'link[rel="' + t + '"][href="' + c + '"]'),
					typeof a == "string" && (c += '[crossorigin="' + a + '"]'),
					Ry.has(c) ||
						(Ry.add(c),
						(t = { rel: t, crossOrigin: a, href: i }),
						l.querySelector(c) === null &&
							((i = l.createElement("link")), sn(i, "link", t), Jt(i), l.head.appendChild(i))));
			}
		}
		function Nw(t) {
			(Hi.D(t), Oy("dns-prefetch", t, null));
		}
		function kw(t, i) {
			(Hi.C(t, i), Oy("preconnect", t, i));
		}
		function Mw(t, i, a) {
			Hi.L(t, i, a);
			var l = Fa;
			if (l && t && i) {
				var c = 'link[rel="preload"][as="' + Bn(i) + '"]';
				i === "image" && a && a.imageSrcSet
					? ((c += '[imagesrcset="' + Bn(a.imageSrcSet) + '"]'),
						typeof a.imageSizes == "string" && (c += '[imagesizes="' + Bn(a.imageSizes) + '"]'))
					: (c += '[href="' + Bn(t) + '"]');
				var d = c;
				switch (i) {
					case "style":
						d = Xa(t);
						break;
					case "script":
						d = Ja(t);
				}
				Gn.has(d) ||
					((t = b({ rel: "preload", href: i === "image" && a && a.imageSrcSet ? void 0 : t, as: i }, a)),
					Gn.set(d, t),
					l.querySelector(c) !== null ||
						(i === "style" && l.querySelector(ul(d))) ||
						(i === "script" && l.querySelector(ll(d))) ||
						((i = l.createElement("link")), sn(i, "link", t), Jt(i), l.head.appendChild(i)));
			}
		}
		function zw(t, i) {
			Hi.m(t, i);
			var a = Fa;
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
						d = Ja(t);
				}
				if (!Gn.has(d) && ((t = b({ rel: "modulepreload", href: t }, i)), Gn.set(d, t), a.querySelector(c) === null)) {
					switch (l) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script":
							if (a.querySelector(ll(d))) return;
					}
					((l = a.createElement("link")), sn(l, "link", t), Jt(l), a.head.appendChild(l));
				}
			}
		}
		function Dw(t, i, a) {
			Hi.S(t, i, a);
			var l = Fa;
			if (l && t) {
				var c = rr(l).hoistableStyles,
					d = Xa(t);
				i = i || "default";
				var y = c.get(d);
				if (!y) {
					var T = { loading: 0, preload: null };
					if ((y = l.querySelector(ul(d)))) T.loading = 5;
					else {
						((t = b({ rel: "stylesheet", href: t, "data-precedence": i }, a)), (a = Gn.get(d)) && rd(t, a));
						var M = (y = l.createElement("link"));
						(Jt(M),
							sn(M, "link", t),
							(M._p = new Promise(function (V, W) {
								((M.onload = V), (M.onerror = W));
							})),
							M.addEventListener("load", function () {
								T.loading |= 1;
							}),
							M.addEventListener("error", function () {
								T.loading |= 2;
							}),
							(T.loading |= 4),
							Vs(y, i, l));
					}
					((y = { type: "stylesheet", instance: y, count: 1, state: T }), c.set(d, y));
				}
			}
		}
		function jw(t, i) {
			Hi.X(t, i);
			var a = Fa;
			if (a && t) {
				var l = rr(a).hoistableScripts,
					c = Ja(t),
					d = l.get(c);
				d ||
					((d = a.querySelector(ll(c))),
					d ||
						((t = b({ src: t, async: !0 }, i)),
						(i = Gn.get(c)) && ad(t, i),
						(d = a.createElement("script")),
						Jt(d),
						sn(d, "link", t),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					l.set(c, d));
			}
		}
		function Lw(t, i) {
			Hi.M(t, i);
			var a = Fa;
			if (a && t) {
				var l = rr(a).hoistableScripts,
					c = Ja(t),
					d = l.get(c);
				d ||
					((d = a.querySelector(ll(c))),
					d ||
						((t = b({ src: t, async: !0, type: "module" }, i)),
						(i = Gn.get(c)) && ad(t, i),
						(d = a.createElement("script")),
						Jt(d),
						sn(d, "link", t),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					l.set(c, d));
			}
		}
		function Ny(t, i, a, l) {
			var c = (c = be.current) ? Is(c) : null;
			if (!c) throw Error(s(446));
			switch (t) {
				case "meta":
				case "title":
					return null;
				case "style":
					return typeof a.precedence == "string" && typeof a.href == "string"
						? ((i = Xa(a.href)),
							(a = rr(c).hoistableStyles),
							(l = a.get(i)),
							l || ((l = { type: "style", instance: null, count: 0, state: null }), a.set(i, l)),
							l)
						: { type: "void", instance: null, count: 0, state: null };
				case "link":
					if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
						t = Xa(a.href);
						var d = rr(c).hoistableStyles,
							y = d.get(t);
						if (
							(y ||
								((c = c.ownerDocument || c),
								(y = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }),
								d.set(t, y),
								(d = c.querySelector(ul(t))) && !d._p && ((y.instance = d), (y.state.loading = 5)),
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
									d || qw(c, t, a, y.state))),
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
							? ((i = Ja(a)),
								(a = rr(c).hoistableScripts),
								(l = a.get(i)),
								l || ((l = { type: "script", instance: null, count: 0, state: null }), a.set(i, l)),
								l)
							: { type: "void", instance: null, count: 0, state: null }
					);
				default:
					throw Error(s(444, t));
			}
		}
		function Xa(t) {
			return 'href="' + Bn(t) + '"';
		}
		function ul(t) {
			return 'link[rel="stylesheet"][' + t + "]";
		}
		function ky(t) {
			return b({}, t, { "data-precedence": t.precedence, precedence: null });
		}
		function qw(t, i, a, l) {
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
					sn(i, "link", a),
					Jt(i),
					t.head.appendChild(i));
		}
		function Ja(t) {
			return '[src="' + Bn(t) + '"]';
		}
		function ll(t) {
			return "script[async]" + t;
		}
		function My(t, i, a) {
			if ((i.count++, i.instance === null))
				switch (i.type) {
					case "style":
						var l = t.querySelector('style[data-href~="' + Bn(a.href) + '"]');
						if (l) return ((i.instance = l), Jt(l), l);
						var c = b({}, a, { "data-href": a.href, "data-precedence": a.precedence, href: null, precedence: null });
						return (
							(l = (t.ownerDocument || t).createElement("style")),
							Jt(l),
							sn(l, "style", c),
							Vs(l, a.precedence, t),
							(i.instance = l)
						);
					case "stylesheet":
						c = Xa(a.href);
						var d = t.querySelector(ul(c));
						if (d) return ((i.state.loading |= 4), (i.instance = d), Jt(d), d);
						((l = ky(a)), (c = Gn.get(c)) && rd(l, c), (d = (t.ownerDocument || t).createElement("link")), Jt(d));
						var y = d;
						return (
							(y._p = new Promise(function (T, M) {
								((y.onload = T), (y.onerror = M));
							})),
							sn(d, "link", l),
							(i.state.loading |= 4),
							Vs(d, a.precedence, t),
							(i.instance = d)
						);
					case "script":
						return (
							(d = Ja(a.src)),
							(c = t.querySelector(ll(d)))
								? ((i.instance = c), Jt(c), c)
								: ((l = a),
									(c = Gn.get(d)) && ((l = b({}, a)), ad(l, c)),
									(t = t.ownerDocument || t),
									(c = t.createElement("script")),
									Jt(c),
									sn(c, "link", l),
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
					((l = i.instance), (i.state.loading |= 4), Vs(l, a.precedence, t));
			return i.instance;
		}
		function Vs(t, i, a) {
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
		function rd(t, i) {
			((t.crossOrigin ??= i.crossOrigin), (t.referrerPolicy ??= i.referrerPolicy), (t.title ??= i.title));
		}
		function ad(t, i) {
			((t.crossOrigin ??= i.crossOrigin), (t.referrerPolicy ??= i.referrerPolicy), (t.integrity ??= i.integrity));
		}
		var Zs = null;
		function zy(t, i, a) {
			if (Zs === null) {
				var l = new Map(),
					c = (Zs = new Map());
				c.set(a, l);
			} else ((c = Zs), (l = c.get(a)), l || ((l = new Map()), c.set(a, l)));
			if (l.has(t)) return l;
			for (l.set(t, null), a = a.getElementsByTagName(t), c = 0; c < a.length; c++) {
				var d = a[c];
				if (
					!(d[rn] || d[Lt] || (t === "link" && d.getAttribute("rel") === "stylesheet")) &&
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
		function Dy(t, i, a) {
			((t = t.ownerDocument || t), t.head.insertBefore(a, i === "title" ? t.querySelector("head > title") : null));
		}
		function Uw(t, i, a) {
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
		function jy(t) {
			return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
		}
		function $w(t, i, a, l) {
			if (
				a.type === "stylesheet" &&
				(typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
				(a.state.loading & 4) === 0
			) {
				if (a.instance === null) {
					var c = Xa(l.href),
						d = i.querySelector(ul(c));
					if (d) {
						((i = d._p),
							i !== null &&
								typeof i == "object" &&
								typeof i.then == "function" &&
								(t.count++, (t = Hs.bind(t)), i.then(t, t)),
							(a.state.loading |= 4),
							(a.instance = d),
							Jt(d));
						return;
					}
					((d = i.ownerDocument || i), (l = ky(l)), (c = Gn.get(c)) && rd(l, c), (d = d.createElement("link")), Jt(d));
					var y = d;
					((y._p = new Promise(function (T, M) {
						((y.onload = T), (y.onerror = M));
					})),
						sn(d, "link", l),
						(a.instance = d));
				}
				(t.stylesheets === null && (t.stylesheets = new Map()),
					t.stylesheets.set(a, i),
					(i = a.state.preload) &&
						(a.state.loading & 3) === 0 &&
						(t.count++, (a = Hs.bind(t)), i.addEventListener("load", a), i.addEventListener("error", a)));
			}
		}
		var ud = 0;
		function Bw(t, i) {
			return (
				t.stylesheets && t.count === 0 && Qs(t, t.stylesheets),
				0 < t.count || 0 < t.imgCount
					? function (a) {
							var l = setTimeout(function () {
								if ((t.stylesheets && Qs(t, t.stylesheets), t.unsuspend)) {
									var d = t.unsuspend;
									((t.unsuspend = null), d());
								}
							}, 6e4 + i);
							0 < t.imgBytes && ud === 0 && (ud = 62500 * _w());
							var c = setTimeout(
								function () {
									if (
										((t.waitingForImages = !1), t.count === 0 && (t.stylesheets && Qs(t, t.stylesheets), t.unsuspend))
									) {
										var d = t.unsuspend;
										((t.unsuspend = null), d());
									}
								},
								(t.imgBytes > ud ? 50 : 800) + i,
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
		function Hs() {
			if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
				if (this.stylesheets) Qs(this, this.stylesheets);
				else if (this.unsuspend) {
					var t = this.unsuspend;
					((this.unsuspend = null), t());
				}
			}
		}
		var Ps = null;
		function Qs(t, i) {
			((t.stylesheets = null),
				t.unsuspend !== null && (t.count++, (Ps = new Map()), i.forEach(Iw, t), (Ps = null), Hs.call(t)));
		}
		function Iw(t, i) {
			if (!(i.state.loading & 4)) {
				var a = Ps.get(t);
				if (a) var l = a.get(null);
				else {
					((a = new Map()), Ps.set(t, a));
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
					(l = Hs.bind(this)),
					c.addEventListener("load", l),
					c.addEventListener("error", l),
					d
						? d.parentNode.insertBefore(c, d.nextSibling)
						: ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(c, t.firstChild)),
					(i.state.loading |= 4));
			}
		}
		var sl = { $$typeof: C, Provider: null, Consumer: null, _currentValue: le, _currentValue2: le, _threadCount: 0 };
		function Vw(t, i, a, l, c, d, y, T, M) {
			((this.tag = 1),
				(this.containerInfo = t),
				(this.pingCache = this.current = this.pendingChildren = null),
				(this.timeoutHandle = -1),
				(this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null),
				(this.callbackPriority = 0),
				(this.expirationTimes = _e(-1)),
				(this.entangledLanes =
					this.shellSuspendCounter =
					this.errorRecoveryDisabledLanes =
					this.expiredLanes =
					this.warmLanes =
					this.pingedLanes =
					this.suspendedLanes =
					this.pendingLanes =
						0),
				(this.entanglements = _e(0)),
				(this.hiddenUpdates = _e(null)),
				(this.identifierPrefix = l),
				(this.onUncaughtError = c),
				(this.onCaughtError = d),
				(this.onRecoverableError = y),
				(this.pooledCache = null),
				(this.pooledCacheLanes = 0),
				(this.formState = M),
				(this.incompleteTransitions = new Map()));
		}
		function Zw(t, i, a, l, c, d, y, T, M, V, W, ie) {
			return (
				(t = new Vw(t, i, a, y, M, V, W, ie, T)),
				(i = 1),
				d === !0 && (i |= 24),
				(d = Nn(3, null, null, i)),
				(t.current = d),
				(d.stateNode = t),
				(i = $c()),
				i.refCount++,
				(t.pooledCache = i),
				i.refCount++,
				(d.memoizedState = { element: l, isDehydrated: a, cache: i }),
				Zc(d),
				t
			);
		}
		function Hw(t) {
			return t ? ((t = Oa), t) : Oa;
		}
		function Ly(t, i, a, l, c, d) {
			((c = Hw(c)),
				l.context === null ? (l.context = c) : (l.pendingContext = c),
				(l = Wr(i)),
				(l.payload = { element: a }),
				(d = d === void 0 ? null : d),
				d !== null && (l.callback = d),
				(a = ea(t, l, i)),
				a !== null && (En(a, t, i), Bu(a, t, i)));
		}
		function qy(t, i) {
			if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
				var a = t.retryLane;
				t.retryLane = a !== 0 && a < i ? a : i;
			}
		}
		function ld(t, i) {
			(qy(t, i), (t = t.alternate) && qy(t, i));
		}
		function Uy(t) {
			if (t.tag === 13 || t.tag === 31) {
				var i = Hr(t, 67108864);
				(i !== null && En(i, t, 67108864), ld(t, 67108864));
			}
		}
		function $y(t) {
			if (t.tag === 13 || t.tag === 31) {
				var i = Kn();
				i = Un(i);
				var a = Hr(t, i);
				(a !== null && En(a, t, i), ld(t, i));
			}
		}
		var Ks = !0;
		function Pw(t, i, a, l) {
			var c = $.T;
			$.T = null;
			var d = P.p;
			try {
				((P.p = 2), sd(t, i, a, l));
			} finally {
				((P.p = d), ($.T = c));
			}
		}
		function Qw(t, i, a, l) {
			var c = $.T;
			$.T = null;
			var d = P.p;
			try {
				((P.p = 8), sd(t, i, a, l));
			} finally {
				((P.p = d), ($.T = c));
			}
		}
		function sd(t, i, a, l) {
			if (Ks) {
				var c = od(l);
				if (c === null) (Yf(t, i, l, Ys, a), Iy(t, l));
				else if (Yw(c, t, i, a, l)) l.stopPropagation();
				else if ((Iy(t, l), i & 4 && -1 < Kw.indexOf(t))) {
					for (; c !== null; ) {
						var d = ti(c);
						if (d !== null)
							switch (d.tag) {
								case 3:
									if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
										var y = Rn(d.pendingLanes);
										if (y !== 0) {
											var T = d;
											for (T.pendingLanes |= 2, T.entangledLanes |= 2; y; ) {
												var M = 1 << (31 - jt(y));
												((T.entanglements[1] |= M), (y &= ~M));
											}
											(Zi(d), (He & 6) === 0 && ((Ns = Oe() + 500), nl(0, !1)));
										}
									}
									break;
								case 31:
								case 13:
									((T = Hr(d, 2)), T !== null && En(T, d, 2), Ms(), ld(d, 2));
							}
						if (((d = od(l)), d === null && Yf(t, i, l, Ys, a), d === c)) break;
						c = d;
					}
					c !== null && l.stopPropagation();
				} else Yf(t, i, l, null, a);
			}
		}
		function od(t) {
			return ((t = fc(t)), cd(t));
		}
		var Ys = null;
		function cd(t) {
			if (((Ys = null), (t = Ct(t)), t !== null)) {
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
			return ((Ys = t), null);
		}
		function By(t) {
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
					switch (pt()) {
						case Ft:
							return 2;
						case st:
							return 8;
						case Xt:
						case ba:
							return 32;
						case fn:
							return 268435456;
						default:
							return 32;
					}
				default:
					return 32;
			}
		}
		var fd = !1,
			Sr = null,
			wr = null,
			Er = null,
			ol = new Map(),
			cl = new Map(),
			Tr = [],
			Kw =
				"mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
					" ",
				);
		function Iy(t, i) {
			switch (t) {
				case "focusin":
				case "focusout":
					Sr = null;
					break;
				case "dragenter":
				case "dragleave":
					wr = null;
					break;
				case "mouseover":
				case "mouseout":
					Er = null;
					break;
				case "pointerover":
				case "pointerout":
					ol.delete(i.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture":
					cl.delete(i.pointerId);
			}
		}
		function fl(t, i, a, l, c, d) {
			return t === null || t.nativeEvent !== d
				? ((t = { blockedOn: i, domEventName: a, eventSystemFlags: l, nativeEvent: d, targetContainers: [c] }),
					i !== null && ((i = ti(i)), i !== null && Uy(i)),
					t)
				: ((t.eventSystemFlags |= l), (i = t.targetContainers), c !== null && i.indexOf(c) === -1 && i.push(c), t);
		}
		function Yw(t, i, a, l, c) {
			switch (i) {
				case "focusin":
					return ((Sr = fl(Sr, t, i, a, l, c)), !0);
				case "dragenter":
					return ((wr = fl(wr, t, i, a, l, c)), !0);
				case "mouseover":
					return ((Er = fl(Er, t, i, a, l, c)), !0);
				case "pointerover":
					var d = c.pointerId;
					return (ol.set(d, fl(ol.get(d) || null, t, i, a, l, c)), !0);
				case "gotpointercapture":
					return ((d = c.pointerId), cl.set(d, fl(cl.get(d) || null, t, i, a, l, c)), !0);
			}
			return !1;
		}
		function Vy(t) {
			var i = Ct(t.target);
			if (i !== null) {
				var a = f(i);
				if (a !== null) {
					if (((i = a.tag), i === 13)) {
						if (((i = h(a)), i !== null)) {
							((t.blockedOn = i),
								$r(t.priority, function () {
									$y(a);
								}));
							return;
						}
					} else if (i === 31) {
						if (((i = m(a)), i !== null)) {
							((t.blockedOn = i),
								$r(t.priority, function () {
									$y(a);
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
		function Gs(t) {
			if (t.blockedOn !== null) return !1;
			for (var i = t.targetContainers; 0 < i.length; ) {
				var a = od(t.nativeEvent);
				if (a === null) {
					a = t.nativeEvent;
					var l = new a.constructor(a.type, a);
					((cc = l), a.target.dispatchEvent(l), (cc = null));
				} else return ((i = ti(a)), i !== null && Uy(i), (t.blockedOn = a), !1);
				i.shift();
			}
			return !0;
		}
		function Zy(t, i, a) {
			Gs(t) && a.delete(i);
		}
		function Gw() {
			((fd = !1),
				Sr !== null && Gs(Sr) && (Sr = null),
				wr !== null && Gs(wr) && (wr = null),
				Er !== null && Gs(Er) && (Er = null),
				ol.forEach(Zy),
				cl.forEach(Zy));
		}
		function Fs(t, i) {
			t.blockedOn === i &&
				((t.blockedOn = null), fd || ((fd = !0), n.unstable_scheduleCallback(n.unstable_NormalPriority, Gw)));
		}
		var Xs = null;
		function Hy(t) {
			Xs !== t &&
				((Xs = t),
				n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
					Xs === t && (Xs = null);
					for (var i = 0; i < t.length; i += 3) {
						var a = t[i],
							l = t[i + 1],
							c = t[i + 2];
						if (typeof l != "function") {
							if (cd(l || a) === null) continue;
							break;
						}
						var d = ti(a);
						d !== null &&
							(t.splice(i, 3), (i -= 3), cf(d, { pending: !0, data: c, method: a.method, action: l }, l, c));
					}
				}));
		}
		function Wa(t) {
			function i(M) {
				return Fs(M, t);
			}
			(Sr !== null && Fs(Sr, t), wr !== null && Fs(wr, t), Er !== null && Fs(Er, t), ol.forEach(i), cl.forEach(i));
			for (var a = 0; a < Tr.length; a++) {
				var l = Tr[a];
				l.blockedOn === t && (l.blockedOn = null);
			}
			for (; 0 < Tr.length && ((a = Tr[0]), a.blockedOn === null); ) (Vy(a), a.blockedOn === null && Tr.shift());
			if (((a = (t.ownerDocument || t).$$reactFormReplay), a != null))
				for (l = 0; l < a.length; l += 3) {
					var c = a[l],
						d = a[l + 1],
						y = c[Z] || null;
					if (typeof d == "function") y || Hy(a);
					else if (y) {
						var T = null;
						if (d && d.hasAttribute("formAction")) {
							if (((c = d), (y = d[Z] || null))) T = y.formAction;
							else if (cd(c) !== null) continue;
						} else T = y.action;
						(typeof T == "function" ? (a[l + 1] = T) : (a.splice(l, 3), (l -= 3)), Hy(a));
					}
				}
		}
		function Fw() {
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
		function dd(t) {
			this._internalRoot = t;
		}
		((hd.prototype.render = dd.prototype.render =
			function (t) {
				var i = this._internalRoot;
				if (i === null) throw Error(s(409));
				var a = i.current;
				Ly(a, Kn(), t, i, null, null);
			}),
			(hd.prototype.unmount = dd.prototype.unmount =
				function () {
					var t = this._internalRoot;
					if (t !== null) {
						this._internalRoot = null;
						var i = t.containerInfo;
						(Ly(t.current, 2, null, t, null, null), Ms(), (i[oe] = null));
					}
				}));
		function hd(t) {
			this._internalRoot = t;
		}
		hd.prototype.unstable_scheduleHydration = function (t) {
			if (t) {
				var i = fi();
				t = { blockedOn: null, target: t, priority: i };
				for (var a = 0; a < Tr.length && i !== 0 && i < Tr[a].priority; a++);
				(Tr.splice(a, 0, t), a === 0 && Vy(t));
			}
		};
		var Py = r.version;
		if (Py !== "19.2.8") throw Error(s(527, Py, "19.2.8"));
		P.findDOMNode = function (t) {
			var i = t._reactInternals;
			if (i === void 0)
				throw typeof t.render == "function" ? Error(s(188)) : ((t = Object.keys(t).join(",")), Error(s(268, t)));
			return ((t = g(i)), (t = t !== null ? _(t) : null), (t = t === null ? null : t.stateNode), t);
		};
		var Xw = {
			bundleType: 0,
			version: "19.2.8",
			rendererPackageName: "react-dom",
			currentDispatcherRef: $,
			reconcilerVersion: "19.2.8",
		};
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
			var Js = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (!Js.isDisabled && Js.supportsFiber)
				try {
					((gn = Js.inject(Xw)), (Yt = Js));
				} catch {}
		}
		e.createRoot = function (t, i) {
			if (!o(t)) throw Error(s(299));
			var a = !1,
				l = "",
				c = QS,
				d = KS,
				y = YS;
			return (
				i != null &&
					(i.unstable_strictMode === !0 && (a = !0),
					i.identifierPrefix !== void 0 && (l = i.identifierPrefix),
					i.onUncaughtError !== void 0 && (c = i.onUncaughtError),
					i.onCaughtError !== void 0 && (d = i.onCaughtError),
					i.onRecoverableError !== void 0 && (y = i.onRecoverableError)),
				(i = Zw(t, 1, !1, null, null, a, l, null, c, d, y, Fw)),
				(t[oe] = i.current),
				dy(t),
				new dd(i)
			);
		};
	}),
	ZE = Jn((e, n) => {
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
	v0;
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
var ou = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	},
	Hp = class extends Error {
		constructor(e) {
			(super(`Encountered unidirectional transform during encode: ${e}`), (this.name = "ZodEncodeError"));
		}
	};
(v0 = globalThis).__zod_globalConfig ?? (v0.__zod_globalConfig = {});
var So = globalThis.__zod_globalConfig;
function Xi(e) {
	return (e && Object.assign(So, e), So);
}
function Pp(e) {
	const n = Object.values(e).filter((r) => typeof r == "number");
	return Object.entries(e)
		.filter(([r, u]) => n.indexOf(+r) === -1)
		.map(([r, u]) => u);
}
function Fd(e, n) {
	return typeof n == "bigint" ? n.toString() : n;
}
function mh(e) {
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
function vh(e) {
	return e == null;
}
function gh(e) {
	const n = e.startsWith("^") ? 1 : 0,
		r = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(n, r);
}
function HE(e, n) {
	const r = e / n,
		u = Math.round(r),
		s = Number.EPSILON * Math.max(Math.abs(r), 1);
	return Math.abs(r - u) < s ? 0 : r - u;
}
var g0 = Symbol("evaluating");
function nt(e, n, r) {
	let u;
	Object.defineProperty(e, n, {
		get() {
			if (u !== g0) return (u === void 0 && ((u = g0), (u = r())), u);
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
function Dr(...e) {
	const n = {};
	for (const r of e) {
		const u = Object.getOwnPropertyDescriptors(r);
		Object.assign(n, u);
	}
	return Object.defineProperties({}, n);
}
function y0(e) {
	return JSON.stringify(e);
}
function PE(e) {
	return e
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}
var Qp = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function wo(e) {
	return typeof e == "object" && e !== null && !Array.isArray(e);
}
var QE = mh(() => {
	if (So.jitless || (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))) return !1;
	try {
		return !1;
	} catch {
		return !1;
	}
});
function mu(e) {
	if (wo(e) === !1) return !1;
	const n = e.constructor;
	if (n === void 0 || typeof n != "function") return !0;
	const r = n.prototype;
	return !(wo(r) === !1 || Object.prototype.hasOwnProperty.call(r, "isPrototypeOf") === !1);
}
function Kp(e) {
	return mu(e)
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
function vu(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function jr(e, n, r) {
	const u = new e._zod.constr(n ?? e._zod.def);
	return ((!n || r?.parent) && (u._zod.parent = e), u);
}
function ye(e) {
	const n = e;
	if (!n) return {};
	if (typeof n == "string") return { error: () => n };
	if (n?.message !== void 0) {
		if (n?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
		n.error = n.message;
	}
	return (delete n.message, typeof n.error == "string" ? { ...n, error: () => n.error } : n);
}
function YE(e) {
	return Object.keys(e).filter((n) => e[n]._zod.optin === "optional" && e[n]._zod.optout === "optional");
}
var GE = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
function FE(e, n) {
	const r = e._zod.def,
		u = r.checks;
	if (u && u.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	return jr(
		e,
		Dr(e._zod.def, {
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
function XE(e, n) {
	const r = e._zod.def,
		u = r.checks;
	if (u && u.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	return jr(
		e,
		Dr(e._zod.def, {
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
function JE(e, n) {
	if (!mu(n)) throw new Error("Invalid input to extend: expected a plain object");
	const r = e._zod.def.checks;
	if (r && r.length > 0) {
		const u = e._zod.def.shape;
		for (const s in n)
			if (Object.getOwnPropertyDescriptor(u, s) !== void 0)
				throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return jr(
		e,
		Dr(e._zod.def, {
			get shape() {
				const u = { ...e._zod.def.shape, ...n };
				return (ga(this, "shape", u), u);
			},
		}),
	);
}
function WE(e, n) {
	if (!mu(n)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return jr(
		e,
		Dr(e._zod.def, {
			get shape() {
				const r = { ...e._zod.def.shape, ...n };
				return (ga(this, "shape", r), r);
			},
		}),
	);
}
function eT(e, n) {
	if (e._zod.def.checks?.length)
		throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return jr(
		e,
		Dr(e._zod.def, {
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
function tT(e, n, r) {
	const u = n._zod.def.checks;
	if (u && u.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
	return jr(
		n,
		Dr(n._zod.def, {
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
function nT(e, n, r) {
	return jr(
		n,
		Dr(n._zod.def, {
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
function au(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let r = n; r < e.issues.length; r++) if (e.issues[r]?.continue !== !0) return !0;
	return !1;
}
function iT(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let r = n; r < e.issues.length; r++) if (e.issues[r]?.continue === !1) return !0;
	return !1;
}
function uu(e, n) {
	return n.map((r) => {
		var u;
		return ((u = r).path ?? (u.path = []), r.path.unshift(e), r);
	});
}
function io(e) {
	return typeof e == "string" ? e : e?.message;
}
function Ji(e, n, r) {
	const u = e.message
			? e.message
			: (io(e.inst?._zod.def?.error?.(e)) ??
				io(n?.error?.(e)) ??
				io(r.customError?.(e)) ??
				io(r.localeError?.(e)) ??
				"Invalid input"),
		{ inst: s, continue: o, input: f, ...h } = e;
	return (h.path ?? (h.path = []), (h.message = u), n?.reportInput && (h.input = f), h);
}
function yh(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function bl(...e) {
	const [n, r, u] = e;
	return typeof n == "string" ? { message: n, code: "custom", input: r, inst: u } : { ...n };
}
var Yp = (e, n) => {
		((e.name = "$ZodError"),
			Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
			Object.defineProperty(e, "issues", { value: n, enumerable: !1 }),
			(e.message = JSON.stringify(n, Fd, 2)),
			Object.defineProperty(e, "toString", { value: () => e.message, enumerable: !1 }));
	},
	Gp = ne("$ZodError", Yp),
	Fp = ne("$ZodError", Yp, { Parent: Error });
function rT(e, n = (r) => r.message) {
	const r = {},
		u = [];
	for (const s of e.issues)
		s.path.length > 0 ? ((r[s.path[0]] = r[s.path[0]] || []), r[s.path[0]].push(n(s))) : u.push(n(s));
	return { formErrors: u, fieldErrors: r };
}
function aT(e, n = (r) => r.message) {
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
var ph = (e) => (n, r, u, s) => {
		const o = u ? { ...u, async: !1 } : { async: !1 },
			f = n._zod.run({ value: r, issues: [] }, o);
		if (f instanceof Promise) throw new ou();
		if (f.issues.length) {
			const h = new (s?.Err ?? e)(f.issues.map((m) => Ji(m, o, Xi())));
			throw (Qp(h, s?.callee), h);
		}
		return f.value;
	},
	bh = (e) => async (n, r, u, s) => {
		const o = u ? { ...u, async: !0 } : { async: !0 };
		let f = n._zod.run({ value: r, issues: [] }, o);
		if ((f instanceof Promise && (f = await f), f.issues.length)) {
			const h = new (s?.Err ?? e)(f.issues.map((m) => Ji(m, o, Xi())));
			throw (Qp(h, s?.callee), h);
		}
		return f.value;
	},
	Lo = (e) => (n, r, u) => {
		const s = u ? { ...u, async: !1 } : { async: !1 },
			o = n._zod.run({ value: r, issues: [] }, s);
		if (o instanceof Promise) throw new ou();
		return o.issues.length
			? { success: !1, error: new (e ?? Gp)(o.issues.map((f) => Ji(f, s, Xi()))) }
			: { success: !0, data: o.value };
	},
	uT = Lo(Fp),
	qo = (e) => async (n, r, u) => {
		const s = u ? { ...u, async: !0 } : { async: !0 };
		let o = n._zod.run({ value: r, issues: [] }, s);
		return (
			o instanceof Promise && (o = await o),
			o.issues.length
				? { success: !1, error: new e(o.issues.map((f) => Ji(f, s, Xi()))) }
				: { success: !0, data: o.value }
		);
	},
	lT = qo(Fp),
	sT = (e) => (n, r, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return ph(e)(n, r, s);
	},
	oT = (e) => (n, r, u) => ph(e)(n, r, u),
	cT = (e) => async (n, r, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return bh(e)(n, r, s);
	},
	fT = (e) => async (n, r, u) => bh(e)(n, r, u),
	dT = (e) => (n, r, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Lo(e)(n, r, s);
	},
	hT = (e) => (n, r, u) => Lo(e)(n, r, u),
	mT = (e) => async (n, r, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return qo(e)(n, r, s);
	},
	vT = (e) => async (n, r, u) => qo(e)(n, r, u),
	gT = /^[cC][0-9a-z]{6,}$/,
	yT = /^[0-9a-z]+$/,
	pT = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
	bT = /^[0-9a-vA-V]{20}$/,
	_T = /^[A-Za-z0-9]{27}$/,
	ST = /^[a-zA-Z0-9_-]{21}$/,
	wT = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
	ET = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
	p0 = (e) =>
		e
			? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`)
			: /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
	TT = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
	xT = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function AT() {
	return new RegExp(xT, "u");
}
var CT =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	RT =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
	OT =
		/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
	NT =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	kT = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
	Xp = /^[A-Za-z0-9_-]*$/,
	MT = /^https?$/,
	zT = /^\+[1-9]\d{6,14}$/,
	Jp =
		"(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
	DT = new RegExp(`^${Jp}$`);
function Wp(e) {
	const n = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number"
		? e.precision === -1
			? `${n}`
			: e.precision === 0
				? `${n}:[0-5]\\d`
				: `${n}:[0-5]\\d\\.\\d{${e.precision}}`
		: `${n}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function jT(e) {
	return new RegExp(`^${Wp(e)}$`);
}
function LT(e) {
	const n = Wp({ precision: e.precision }),
		r = ["Z"];
	(e.local && r.push(""), e.offset && r.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)"));
	const u = `${n}(?:${r.join("|")})`;
	return new RegExp(`^${Jp}T(?:${u})$`);
}
var qT = (e) => {
		const n = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
		return new RegExp(`^${n}$`);
	},
	UT = /^-?\d+$/,
	eb = /^-?\d+(?:\.\d+)?$/,
	$T = /^(?:true|false)$/i,
	BT = /^[^A-Z]*$/,
	IT = /^[^a-z]*$/,
	Cn = ne("$ZodCheck", (e, n) => {
		var r;
		(e._zod ?? (e._zod = {}), (e._zod.def = n), (r = e._zod).onattach ?? (r.onattach = []));
	}),
	tb = { number: "number", bigint: "bigint", object: "date" },
	nb = ne("$ZodCheckLessThan", (e, n) => {
		Cn.init(e, n);
		const r = tb[typeof n.value];
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
	ib = ne("$ZodCheckGreaterThan", (e, n) => {
		Cn.init(e, n);
		const r = tb[typeof n.value];
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
	VT = ne("$ZodCheckMultipleOf", (e, n) => {
		(Cn.init(e, n),
			e._zod.onattach.push((r) => {
				var u;
				(u = r._zod.bag).multipleOf ?? (u.multipleOf = n.value);
			}),
			(e._zod.check = (r) => {
				if (typeof r.value != typeof n.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				(typeof r.value == "bigint" ? r.value % n.value === BigInt(0) : HE(r.value, n.value) === 0) ||
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
	ZT = ne("$ZodCheckNumberFormat", (e, n) => {
		(Cn.init(e, n), (n.format = n.format || "float64"));
		const r = n.format?.includes("int"),
			u = r ? "int" : "number",
			[s, o] = GE[n.format];
		(e._zod.onattach.push((f) => {
			const h = f._zod.bag;
			((h.format = n.format), (h.minimum = s), (h.maximum = o), r && (h.pattern = UT));
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
	HT = ne("$ZodCheckMaxLength", (e, n) => {
		var r;
		(Cn.init(e, n),
			(r = e._zod.def).when ??
				(r.when = (u) => {
					const s = u.value;
					return !vh(s) && s.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
				n.maximum < s && (u._zod.bag.maximum = n.maximum);
			}),
			(e._zod.check = (u) => {
				const s = u.value;
				if (s.length <= n.maximum) return;
				const o = yh(s);
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
	PT = ne("$ZodCheckMinLength", (e, n) => {
		var r;
		(Cn.init(e, n),
			(r = e._zod.def).when ??
				(r.when = (u) => {
					const s = u.value;
					return !vh(s) && s.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
				n.minimum > s && (u._zod.bag.minimum = n.minimum);
			}),
			(e._zod.check = (u) => {
				const s = u.value;
				if (s.length >= n.minimum) return;
				const o = yh(s);
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
	QT = ne("$ZodCheckLengthEquals", (e, n) => {
		var r;
		(Cn.init(e, n),
			(r = e._zod.def).when ??
				(r.when = (u) => {
					const s = u.value;
					return !vh(s) && s.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag;
				((s.minimum = n.length), (s.maximum = n.length), (s.length = n.length));
			}),
			(e._zod.check = (u) => {
				const s = u.value,
					o = s.length;
				if (o === n.length) return;
				const f = yh(s),
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
	Uo = ne("$ZodCheckStringFormat", (e, n) => {
		var r, u;
		(Cn.init(e, n),
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
		(Uo.init(e, n),
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
	YT = ne("$ZodCheckLowerCase", (e, n) => {
		(n.pattern ?? (n.pattern = BT), Uo.init(e, n));
	}),
	GT = ne("$ZodCheckUpperCase", (e, n) => {
		(n.pattern ?? (n.pattern = IT), Uo.init(e, n));
	}),
	FT = ne("$ZodCheckIncludes", (e, n) => {
		Cn.init(e, n);
		const r = vu(n.includes),
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
	XT = ne("$ZodCheckStartsWith", (e, n) => {
		Cn.init(e, n);
		const r = new RegExp(`^${vu(n.prefix)}.*`);
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
	JT = ne("$ZodCheckEndsWith", (e, n) => {
		Cn.init(e, n);
		const r = new RegExp(`.*${vu(n.suffix)}$`);
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
	WT = ne("$ZodCheckOverwrite", (e, n) => {
		(Cn.init(e, n),
			(e._zod.check = (r) => {
				r.value = n.tx(r.value);
			}));
	}),
	ex = class {
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
	tx = { major: 4, minor: 4, patch: 3 },
	_t = ne("$ZodType", (e, n) => {
		var r;
		(e ?? (e = {}), (e._zod.def = n), (e._zod.bag = e._zod.bag || {}), (e._zod.version = tx));
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
					let v = au(f),
						g;
					for (const _ of h) {
						if (_._zod.def.when) {
							if (iT(f) || !_._zod.def.when(f)) continue;
						} else if (v) continue;
						const b = f.issues.length,
							p = _._zod.check(f);
						if (p instanceof Promise && m?.async === !1) throw new ou();
						if (g || p instanceof Promise)
							g = (g ?? Promise.resolve()).then(async () => {
								(await p, f.issues.length !== b && (v || (v = au(f, b))));
							});
						else {
							if (f.issues.length === b) continue;
							v || (v = au(f, b));
						}
					}
					return g ? g.then(() => f) : f;
				},
				o = (f, h, m) => {
					if (au(f)) return ((f.aborted = !0), f);
					const v = s(h, u, m);
					if (v instanceof Promise) {
						if (m.async === !1) throw new ou();
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
					if (h.async === !1) throw new ou();
					return m.then((v) => s(v, u, h));
				}
				return s(m, u, h);
			};
		}
		nt(e, "~standard", () => ({
			validate: (s) => {
				try {
					const o = uT(e, s);
					return o.success ? { value: o.data } : { issues: o.error?.issues };
				} catch {
					return lT(e, s).then((f) => (f.success ? { value: f.data } : { issues: f.error?.issues }));
				}
			},
			vendor: "zod",
			version: 1,
		}));
	}),
	_h = ne("$ZodString", (e, n) => {
		(_t.init(e, n),
			(e._zod.pattern = [...(e?._zod.bag?.patterns ?? [])].pop() ?? qT(e._zod.bag)),
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
	gt = ne("$ZodStringFormat", (e, n) => {
		(Uo.init(e, n), _h.init(e, n));
	}),
	nx = ne("$ZodGUID", (e, n) => {
		(n.pattern ?? (n.pattern = ET), gt.init(e, n));
	}),
	ix = ne("$ZodUUID", (e, n) => {
		if (n.version) {
			const r = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[n.version];
			if (r === void 0) throw new Error(`Invalid UUID version: "${n.version}"`);
			n.pattern ?? (n.pattern = p0(r));
		} else n.pattern ?? (n.pattern = p0());
		gt.init(e, n);
	}),
	rx = ne("$ZodEmail", (e, n) => {
		(n.pattern ?? (n.pattern = TT), gt.init(e, n));
	}),
	ax = ne("$ZodURL", (e, n) => {
		(gt.init(e, n),
			(e._zod.check = (r) => {
				try {
					const u = r.value.trim();
					if (!n.normalize && n.protocol?.source === MT.source && !/^https?:\/\//i.test(u)) {
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
	ux = ne("$ZodEmoji", (e, n) => {
		(n.pattern ?? (n.pattern = AT()), gt.init(e, n));
	}),
	lx = ne("$ZodNanoID", (e, n) => {
		(n.pattern ?? (n.pattern = ST), gt.init(e, n));
	}),
	sx = ne("$ZodCUID", (e, n) => {
		(n.pattern ?? (n.pattern = gT), gt.init(e, n));
	}),
	ox = ne("$ZodCUID2", (e, n) => {
		(n.pattern ?? (n.pattern = yT), gt.init(e, n));
	}),
	cx = ne("$ZodULID", (e, n) => {
		(n.pattern ?? (n.pattern = pT), gt.init(e, n));
	}),
	fx = ne("$ZodXID", (e, n) => {
		(n.pattern ?? (n.pattern = bT), gt.init(e, n));
	}),
	dx = ne("$ZodKSUID", (e, n) => {
		(n.pattern ?? (n.pattern = _T), gt.init(e, n));
	}),
	hx = ne("$ZodISODateTime", (e, n) => {
		(n.pattern ?? (n.pattern = LT(n)), gt.init(e, n));
	}),
	mx = ne("$ZodISODate", (e, n) => {
		(n.pattern ?? (n.pattern = DT), gt.init(e, n));
	}),
	vx = ne("$ZodISOTime", (e, n) => {
		(n.pattern ?? (n.pattern = jT(n)), gt.init(e, n));
	}),
	gx = ne("$ZodISODuration", (e, n) => {
		(n.pattern ?? (n.pattern = wT), gt.init(e, n));
	}),
	yx = ne("$ZodIPv4", (e, n) => {
		(n.pattern ?? (n.pattern = CT), gt.init(e, n), (e._zod.bag.format = "ipv4"));
	}),
	px = ne("$ZodIPv6", (e, n) => {
		(n.pattern ?? (n.pattern = RT),
			gt.init(e, n),
			(e._zod.bag.format = "ipv6"),
			(e._zod.check = (r) => {
				try {
					new URL(`http://[${r.value}]`);
				} catch {
					r.issues.push({ code: "invalid_format", format: "ipv6", input: r.value, inst: e, continue: !n.abort });
				}
			}));
	}),
	bx = ne("$ZodCIDRv4", (e, n) => {
		(n.pattern ?? (n.pattern = OT), gt.init(e, n));
	}),
	_x = ne("$ZodCIDRv6", (e, n) => {
		(n.pattern ?? (n.pattern = NT),
			gt.init(e, n),
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
function rb(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 !== 0) return !1;
	try {
		return (atob(e), !0);
	} catch {
		return !1;
	}
}
var Sx = ne("$ZodBase64", (e, n) => {
	(n.pattern ?? (n.pattern = kT),
		gt.init(e, n),
		(e._zod.bag.contentEncoding = "base64"),
		(e._zod.check = (r) => {
			rb(r.value) ||
				r.issues.push({ code: "invalid_format", format: "base64", input: r.value, inst: e, continue: !n.abort });
		}));
});
function wx(e) {
	if (!Xp.test(e)) return !1;
	const n = e.replace(/[-_]/g, (r) => (r === "-" ? "+" : "/"));
	return rb(n.padEnd(Math.ceil(n.length / 4) * 4, "="));
}
var Ex = ne("$ZodBase64URL", (e, n) => {
		(n.pattern ?? (n.pattern = Xp),
			gt.init(e, n),
			(e._zod.bag.contentEncoding = "base64url"),
			(e._zod.check = (r) => {
				wx(r.value) ||
					r.issues.push({ code: "invalid_format", format: "base64url", input: r.value, inst: e, continue: !n.abort });
			}));
	}),
	Tx = ne("$ZodE164", (e, n) => {
		(n.pattern ?? (n.pattern = zT), gt.init(e, n));
	});
function xx(e, n = null) {
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
var Ax = ne("$ZodJWT", (e, n) => {
		(gt.init(e, n),
			(e._zod.check = (r) => {
				xx(r.value, n.alg) ||
					r.issues.push({ code: "invalid_format", format: "jwt", input: r.value, inst: e, continue: !n.abort });
			}));
	}),
	ab = ne("$ZodNumber", (e, n) => {
		(_t.init(e, n),
			(e._zod.pattern = e._zod.bag.pattern ?? eb),
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
	Cx = ne("$ZodNumberFormat", (e, n) => {
		(ZT.init(e, n), ab.init(e, n));
	}),
	Rx = ne("$ZodBoolean", (e, n) => {
		(_t.init(e, n),
			(e._zod.pattern = $T),
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
	Ox = ne("$ZodUnknown", (e, n) => {
		(_t.init(e, n), (e._zod.parse = (r) => r));
	}),
	Nx = ne("$ZodNever", (e, n) => {
		(_t.init(e, n),
			(e._zod.parse = (r, u) => (
				r.issues.push({ expected: "never", code: "invalid_type", input: r.value, inst: e }),
				r
			)));
	});
function b0(e, n, r) {
	(e.issues.length && n.issues.push(...uu(r, e.issues)), (n.value[r] = e.value));
}
var kx = ne("$ZodArray", (e, n) => {
	(_t.init(e, n),
		(e._zod.parse = (r, u) => {
			const s = r.value;
			if (!Array.isArray(s)) return (r.issues.push({ expected: "array", code: "invalid_type", input: s, inst: e }), r);
			r.value = Array(s.length);
			const o = [];
			for (let f = 0; f < s.length; f++) {
				const h = s[f],
					m = n.element._zod.run({ value: h, issues: [] }, u);
				m instanceof Promise ? o.push(m.then((v) => b0(v, r, f))) : b0(m, r, f);
			}
			return o.length ? Promise.all(o).then(() => r) : r;
		}));
});
function Eo(e, n, r, u, s, o) {
	const f = r in u;
	if (e.issues.length) {
		if (s && o && !f) return;
		n.issues.push(...uu(r, e.issues));
	}
	if (!f && !s) {
		e.issues.length || n.issues.push({ code: "invalid_type", expected: "nonoptional", input: void 0, path: [r] });
		return;
	}
	e.value === void 0 ? f && (n.value[r] = void 0) : (n.value[r] = e.value);
}
function ub(e) {
	const n = Object.keys(e.shape);
	for (const u of n)
		if (!e.shape?.[u]?._zod?.traits?.has("$ZodType"))
			throw new Error(`Invalid element at key "${u}": expected a Zod schema`);
	const r = YE(e.shape);
	return { ...e, keys: n, keySet: new Set(n), numKeys: n.length, optionalKeys: new Set(r) };
}
function lb(e, n, r, u, s, o) {
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
		p instanceof Promise ? e.push(p.then((E) => Eo(E, r, b, n, g, _))) : Eo(p, r, b, n, g, _);
	}
	return (
		f.length && r.issues.push({ code: "unrecognized_keys", keys: f, input: n, inst: o }),
		e.length ? Promise.all(e).then(() => r) : r
	);
}
var Mx = ne("$ZodObject", (e, n) => {
		if ((_t.init(e, n), !Object.getOwnPropertyDescriptor(n, "shape")?.get)) {
			const f = n.shape;
			Object.defineProperty(n, "shape", {
				get: () => {
					const h = { ...f };
					return (Object.defineProperty(n, "shape", { value: h }), h);
				},
			});
		}
		const r = mh(() => ub(n));
		nt(e._zod, "propValues", () => {
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
		const u = wo,
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
				x instanceof Promise ? v.push(x.then((O) => Eo(O, f, _, m, p, E))) : Eo(x, f, _, m, p, E);
			}
			return s ? lb(v, m, f, h, r.value, e) : v.length ? Promise.all(v).then(() => f) : f;
		};
	}),
	zx = ne("$ZodObjectJIT", (e, n) => {
		Mx.init(e, n);
		const r = e._zod.parse,
			u = mh(() => ub(n)),
			s = (b) => {
				const p = new ex(["shape", "payload", "ctx"]),
					E = u.value,
					x = (A) => {
						const C = y0(A);
						return `shape[${C}]._zod.run({ value: input[${C}], issues: [] }, ctx)`;
					};
				p.write("const input = payload.value;");
				const O = Object.create(null);
				let z = 0;
				for (const A of E.keys) O[A] = `key_${z++}`;
				p.write("const newResult = {};");
				for (const A of E.keys) {
					const C = O[A],
						k = y0(A),
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
		const f = wo,
			h = !So.jitless,
			v = h && QE.value,
			g = n.catchall;
		let _;
		e._zod.parse = (b, p) => {
			_ ?? (_ = u.value);
			const E = b.value;
			return f(E)
				? h && v && p?.async === !1 && p.jitless !== !0
					? (o || (o = s(n.shape)), (b = o(b, p)), g ? lb([], E, b, p, _, e) : b)
					: r(b, p)
				: (b.issues.push({ expected: "object", code: "invalid_type", input: E, inst: e }), b);
		};
	});
function _0(e, n, r, u) {
	for (const o of e) if (o.issues.length === 0) return ((n.value = o.value), n);
	const s = e.filter((o) => !au(o));
	return s.length === 1
		? ((n.value = s[0].value), s[0])
		: (n.issues.push({
				code: "invalid_union",
				input: n.value,
				inst: r,
				errors: e.map((o) => o.issues.map((f) => Ji(f, u, Xi()))),
			}),
			n);
}
var Dx = ne("$ZodUnion", (e, n) => {
		(_t.init(e, n),
			nt(e._zod, "optin", () => (n.options.some((u) => u._zod.optin === "optional") ? "optional" : void 0)),
			nt(e._zod, "optout", () => (n.options.some((u) => u._zod.optout === "optional") ? "optional" : void 0)),
			nt(e._zod, "values", () => {
				if (n.options.every((u) => u._zod.values)) return new Set(n.options.flatMap((u) => Array.from(u._zod.values)));
			}),
			nt(e._zod, "pattern", () => {
				if (n.options.every((u) => u._zod.pattern)) {
					const u = n.options.map((s) => s._zod.pattern);
					return new RegExp(`^(${u.map((s) => gh(s.source)).join("|")})$`);
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
			return o ? Promise.all(f).then((h) => _0(h, u, e, s)) : _0(f, u, e, s);
		};
	}),
	jx = ne("$ZodIntersection", (e, n) => {
		(_t.init(e, n),
			(e._zod.parse = (r, u) => {
				const s = r.value,
					o = n.left._zod.run({ value: s, issues: [] }, u),
					f = n.right._zod.run({ value: s, issues: [] }, u);
				return o instanceof Promise || f instanceof Promise
					? Promise.all([o, f]).then(([h, m]) => S0(r, h, m))
					: S0(r, o, f);
			}));
	});
function Xd(e, n) {
	if (e === n) return { valid: !0, data: e };
	if (e instanceof Date && n instanceof Date && +e == +n) return { valid: !0, data: e };
	if (mu(e) && mu(n)) {
		const r = Object.keys(n),
			u = Object.keys(e).filter((o) => r.indexOf(o) !== -1),
			s = { ...e, ...n };
		for (const o of u) {
			const f = Xd(e[o], n[o]);
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
				f = Xd(s, o);
			if (!f.valid) return { valid: !1, mergeErrorPath: [u, ...f.mergeErrorPath] };
			r.push(f.data);
		}
		return { valid: !0, data: r };
	}
	return { valid: !1, mergeErrorPath: [] };
}
function S0(e, n, r) {
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
	if ((o.length && s && e.issues.push({ ...s, keys: o }), au(e))) return e;
	const f = Xd(n.value, r.value);
	if (!f.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(f.mergeErrorPath)}`);
	return ((e.value = f.data), e);
}
var Lx = ne("$ZodRecord", (e, n) => {
		(_t.init(e, n),
			(e._zod.parse = (r, u) => {
				const s = r.value;
				if (!mu(s)) return (r.issues.push({ expected: "record", code: "invalid_type", input: s, inst: e }), r);
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
									issues: g.issues.map((p) => Ji(p, u, Xi())),
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
											(p.issues.length && r.issues.push(...uu(v, p.issues)), (r.value[_] = p.value));
										}),
									)
								: (b.issues.length && r.issues.push(...uu(v, b.issues)), (r.value[_] = b.value));
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
						if (typeof h == "string" && eb.test(h) && m.issues.length) {
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
										issues: m.issues.map((g) => Ji(g, u, Xi())),
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
										(g.issues.length && r.issues.push(...uu(h, g.issues)), (r.value[m.value] = g.value));
									}),
								)
							: (v.issues.length && r.issues.push(...uu(h, v.issues)), (r.value[m.value] = v.value));
					}
				}
				return o.length ? Promise.all(o).then(() => r) : r;
			}));
	}),
	qx = ne("$ZodEnum", (e, n) => {
		_t.init(e, n);
		const r = Pp(n.entries),
			u = new Set(r);
		((e._zod.values = u),
			(e._zod.pattern = new RegExp(
				`^(${r
					.filter((s) => KE.has(typeof s))
					.map((s) => (typeof s == "string" ? vu(s) : s.toString()))
					.join("|")})$`,
			)),
			(e._zod.parse = (s, o) => {
				const f = s.value;
				return (u.has(f) || s.issues.push({ code: "invalid_value", values: r, input: f, inst: e }), s);
			}));
	}),
	Ux = ne("$ZodLiteral", (e, n) => {
		if ((_t.init(e, n), n.values.length === 0)) throw new Error("Cannot create literal schema with no valid values");
		const r = new Set(n.values);
		((e._zod.values = r),
			(e._zod.pattern = new RegExp(
				`^(${n.values.map((u) => (typeof u == "string" ? vu(u) : u ? vu(u.toString()) : String(u))).join("|")})$`,
			)),
			(e._zod.parse = (u, s) => {
				const o = u.value;
				return (r.has(o) || u.issues.push({ code: "invalid_value", values: n.values, input: o, inst: e }), u);
			}));
	}),
	$x = ne("$ZodTransform", (e, n) => {
		(_t.init(e, n),
			(e._zod.optin = "optional"),
			(e._zod.parse = (r, u) => {
				if (u.direction === "backward") throw new Hp(e.constructor.name);
				const s = n.transform(r.value, r);
				if (u.async)
					return (s instanceof Promise ? s : Promise.resolve(s)).then((o) => ((r.value = o), (r.fallback = !0), r));
				if (s instanceof Promise) throw new ou();
				return ((r.value = s), (r.fallback = !0), r);
			}));
	});
function w0(e, n) {
	return n === void 0 && (e.issues.length || e.fallback) ? { issues: [], value: void 0 } : e;
}
var sb = ne("$ZodOptional", (e, n) => {
		(_t.init(e, n),
			(e._zod.optin = "optional"),
			(e._zod.optout = "optional"),
			nt(e._zod, "values", () => (n.innerType._zod.values ? new Set([...n.innerType._zod.values, void 0]) : void 0)),
			nt(e._zod, "pattern", () => {
				const r = n.innerType._zod.pattern;
				return r ? new RegExp(`^(${gh(r.source)})?$`) : void 0;
			}),
			(e._zod.parse = (r, u) => {
				if (n.innerType._zod.optin === "optional") {
					const s = r.value,
						o = n.innerType._zod.run(r, u);
					return o instanceof Promise ? o.then((f) => w0(f, s)) : w0(o, s);
				}
				return r.value === void 0 ? r : n.innerType._zod.run(r, u);
			}));
	}),
	Bx = ne("$ZodExactOptional", (e, n) => {
		(sb.init(e, n),
			nt(e._zod, "values", () => n.innerType._zod.values),
			nt(e._zod, "pattern", () => n.innerType._zod.pattern),
			(e._zod.parse = (r, u) => n.innerType._zod.run(r, u)));
	}),
	Ix = ne("$ZodNullable", (e, n) => {
		(_t.init(e, n),
			nt(e._zod, "optin", () => n.innerType._zod.optin),
			nt(e._zod, "optout", () => n.innerType._zod.optout),
			nt(e._zod, "pattern", () => {
				const r = n.innerType._zod.pattern;
				return r ? new RegExp(`^(${gh(r.source)}|null)$`) : void 0;
			}),
			nt(e._zod, "values", () => (n.innerType._zod.values ? new Set([...n.innerType._zod.values, null]) : void 0)),
			(e._zod.parse = (r, u) => (r.value === null ? r : n.innerType._zod.run(r, u))));
	}),
	Vx = ne("$ZodDefault", (e, n) => {
		(_t.init(e, n),
			(e._zod.optin = "optional"),
			nt(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (r, u) => {
				if (u.direction === "backward") return n.innerType._zod.run(r, u);
				if (r.value === void 0) return ((r.value = n.defaultValue), r);
				const s = n.innerType._zod.run(r, u);
				return s instanceof Promise ? s.then((o) => E0(o, n)) : E0(s, n);
			}));
	});
function E0(e, n) {
	return (e.value === void 0 && (e.value = n.defaultValue), e);
}
var Zx = ne("$ZodPrefault", (e, n) => {
		(_t.init(e, n),
			(e._zod.optin = "optional"),
			nt(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (r, u) => (
				u.direction === "backward" || (r.value === void 0 && (r.value = n.defaultValue)),
				n.innerType._zod.run(r, u)
			)));
	}),
	Hx = ne("$ZodNonOptional", (e, n) => {
		(_t.init(e, n),
			nt(e._zod, "values", () => {
				const r = n.innerType._zod.values;
				return r ? new Set([...r].filter((u) => u !== void 0)) : void 0;
			}),
			(e._zod.parse = (r, u) => {
				const s = n.innerType._zod.run(r, u);
				return s instanceof Promise ? s.then((o) => T0(o, e)) : T0(s, e);
			}));
	});
function T0(e, n) {
	return (
		!e.issues.length &&
			e.value === void 0 &&
			e.issues.push({ code: "invalid_type", expected: "nonoptional", input: e.value, inst: n }),
		e
	);
}
var Px = ne("$ZodCatch", (e, n) => {
		(_t.init(e, n),
			(e._zod.optin = "optional"),
			nt(e._zod, "optout", () => n.innerType._zod.optout),
			nt(e._zod, "values", () => n.innerType._zod.values),
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
										error: { issues: o.issues.map((f) => Ji(f, u, Xi())) },
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
								error: { issues: s.issues.map((o) => Ji(o, u, Xi())) },
								input: r.value,
							})),
							(r.issues = []),
							(r.fallback = !0)),
						r);
			}));
	}),
	Qx = ne("$ZodPipe", (e, n) => {
		(_t.init(e, n),
			nt(e._zod, "values", () => n.in._zod.values),
			nt(e._zod, "optin", () => n.in._zod.optin),
			nt(e._zod, "optout", () => n.out._zod.optout),
			nt(e._zod, "propValues", () => n.in._zod.propValues),
			(e._zod.parse = (r, u) => {
				if (u.direction === "backward") {
					const o = n.out._zod.run(r, u);
					return o instanceof Promise ? o.then((f) => ro(f, n.in, u)) : ro(o, n.in, u);
				}
				const s = n.in._zod.run(r, u);
				return s instanceof Promise ? s.then((o) => ro(o, n.out, u)) : ro(s, n.out, u);
			}));
	});
function ro(e, n, r) {
	return e.issues.length
		? ((e.aborted = !0), e)
		: n._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, r);
}
var Kx = ne("$ZodReadonly", (e, n) => {
	(_t.init(e, n),
		nt(e._zod, "propValues", () => n.innerType._zod.propValues),
		nt(e._zod, "values", () => n.innerType._zod.values),
		nt(e._zod, "optin", () => n.innerType?._zod?.optin),
		nt(e._zod, "optout", () => n.innerType?._zod?.optout),
		(e._zod.parse = (r, u) => {
			if (u.direction === "backward") return n.innerType._zod.run(r, u);
			const s = n.innerType._zod.run(r, u);
			return s instanceof Promise ? s.then(x0) : x0(s);
		}));
});
function x0(e) {
	return ((e.value = Object.freeze(e.value)), e);
}
var Yx = ne("$ZodCustom", (e, n) => {
	(Cn.init(e, n),
		_t.init(e, n),
		(e._zod.parse = (r, u) => r),
		(e._zod.check = (r) => {
			const u = r.value,
				s = n.fn(u);
			if (s instanceof Promise) return s.then((o) => A0(o, r, u, e));
			A0(s, r, u, e);
		}));
});
function A0(e, n, r, u) {
	if (!e) {
		const s = { code: "custom", input: r, inst: u, path: [...(u._zod.def.path ?? [])], continue: !u._zod.def.abort };
		(u._zod.def.params && (s.params = u._zod.def.params), n.issues.push(bl(s)));
	}
}
var C0,
	Gx = class {
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
function Fx() {
	return new Gx();
}
(C0 = globalThis).__zod_globalRegistry ?? (C0.__zod_globalRegistry = Fx());
var hl = globalThis.__zod_globalRegistry;
function Xx(e, n) {
	return new e({ type: "string", ...ye(n) });
}
function Jx(e, n) {
	return new e({ type: "string", format: "email", check: "string_format", abort: !1, ...ye(n) });
}
function R0(e, n) {
	return new e({ type: "string", format: "guid", check: "string_format", abort: !1, ...ye(n) });
}
function Wx(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, ...ye(n) });
}
function eA(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v4", ...ye(n) });
}
function tA(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v6", ...ye(n) });
}
function nA(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v7", ...ye(n) });
}
function iA(e, n) {
	return new e({ type: "string", format: "url", check: "string_format", abort: !1, ...ye(n) });
}
function rA(e, n) {
	return new e({ type: "string", format: "emoji", check: "string_format", abort: !1, ...ye(n) });
}
function aA(e, n) {
	return new e({ type: "string", format: "nanoid", check: "string_format", abort: !1, ...ye(n) });
}
function uA(e, n) {
	return new e({ type: "string", format: "cuid", check: "string_format", abort: !1, ...ye(n) });
}
function lA(e, n) {
	return new e({ type: "string", format: "cuid2", check: "string_format", abort: !1, ...ye(n) });
}
function sA(e, n) {
	return new e({ type: "string", format: "ulid", check: "string_format", abort: !1, ...ye(n) });
}
function oA(e, n) {
	return new e({ type: "string", format: "xid", check: "string_format", abort: !1, ...ye(n) });
}
function cA(e, n) {
	return new e({ type: "string", format: "ksuid", check: "string_format", abort: !1, ...ye(n) });
}
function fA(e, n) {
	return new e({ type: "string", format: "ipv4", check: "string_format", abort: !1, ...ye(n) });
}
function dA(e, n) {
	return new e({ type: "string", format: "ipv6", check: "string_format", abort: !1, ...ye(n) });
}
function hA(e, n) {
	return new e({ type: "string", format: "cidrv4", check: "string_format", abort: !1, ...ye(n) });
}
function mA(e, n) {
	return new e({ type: "string", format: "cidrv6", check: "string_format", abort: !1, ...ye(n) });
}
function vA(e, n) {
	return new e({ type: "string", format: "base64", check: "string_format", abort: !1, ...ye(n) });
}
function gA(e, n) {
	return new e({ type: "string", format: "base64url", check: "string_format", abort: !1, ...ye(n) });
}
function yA(e, n) {
	return new e({ type: "string", format: "e164", check: "string_format", abort: !1, ...ye(n) });
}
function pA(e, n) {
	return new e({ type: "string", format: "jwt", check: "string_format", abort: !1, ...ye(n) });
}
function bA(e, n) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...ye(n),
	});
}
function _A(e, n) {
	return new e({ type: "string", format: "date", check: "string_format", ...ye(n) });
}
function SA(e, n) {
	return new e({ type: "string", format: "time", check: "string_format", precision: null, ...ye(n) });
}
function wA(e, n) {
	return new e({ type: "string", format: "duration", check: "string_format", ...ye(n) });
}
function EA(e, n) {
	return new e({ type: "number", checks: [], ...ye(n) });
}
function TA(e, n) {
	return new e({ type: "number", check: "number_format", abort: !1, format: "safeint", ...ye(n) });
}
function xA(e, n) {
	return new e({ type: "boolean", ...ye(n) });
}
function AA(e) {
	return new e({ type: "unknown" });
}
function CA(e, n) {
	return new e({ type: "never", ...ye(n) });
}
function O0(e, n) {
	return new nb({ check: "less_than", ...ye(n), value: e, inclusive: !1 });
}
function Sd(e, n) {
	return new nb({ check: "less_than", ...ye(n), value: e, inclusive: !0 });
}
function N0(e, n) {
	return new ib({ check: "greater_than", ...ye(n), value: e, inclusive: !1 });
}
function wd(e, n) {
	return new ib({ check: "greater_than", ...ye(n), value: e, inclusive: !0 });
}
function k0(e, n) {
	return new VT({ check: "multiple_of", ...ye(n), value: e });
}
function ob(e, n) {
	return new HT({ check: "max_length", ...ye(n), maximum: e });
}
function To(e, n) {
	return new PT({ check: "min_length", ...ye(n), minimum: e });
}
function cb(e, n) {
	return new QT({ check: "length_equals", ...ye(n), length: e });
}
function RA(e, n) {
	return new KT({ check: "string_format", format: "regex", ...ye(n), pattern: e });
}
function OA(e) {
	return new YT({ check: "string_format", format: "lowercase", ...ye(e) });
}
function NA(e) {
	return new GT({ check: "string_format", format: "uppercase", ...ye(e) });
}
function kA(e, n) {
	return new FT({ check: "string_format", format: "includes", ...ye(n), includes: e });
}
function MA(e, n) {
	return new XT({ check: "string_format", format: "starts_with", ...ye(n), prefix: e });
}
function zA(e, n) {
	return new JT({ check: "string_format", format: "ends_with", ...ye(n), suffix: e });
}
function bu(e) {
	return new WT({ check: "overwrite", tx: e });
}
function DA(e) {
	return bu((n) => n.normalize(e));
}
function jA() {
	return bu((e) => e.trim());
}
function LA() {
	return bu((e) => e.toLowerCase());
}
function qA() {
	return bu((e) => e.toUpperCase());
}
function UA() {
	return bu((e) => PE(e));
}
function $A(e, n, r) {
	return new e({ type: "array", element: n, ...ye(r) });
}
function BA(e, n, r) {
	return new e({ type: "custom", check: "custom", fn: n, ...ye(r) });
}
function IA(e, n) {
	const r = VA(
		(u) => (
			(u.addIssue = (s) => {
				if (typeof s == "string") u.issues.push(bl(s, u.value, r._zod.def));
				else {
					const o = s;
					(o.fatal && (o.continue = !1),
						o.code ?? (o.code = "custom"),
						o.input ?? (o.input = u.value),
						o.inst ?? (o.inst = r),
						o.continue ?? (o.continue = !r._zod.def.abort),
						u.issues.push(bl(o)));
				}
			}),
			e(u.value, u)
		),
		n,
	);
	return r;
}
function VA(e, n) {
	const r = new Cn({ check: "custom", ...ye(n) });
	return ((r._zod.check = e), r);
}
function fb(e) {
	let n = e?.target ?? "draft-2020-12";
	return (
		n === "draft-4" && (n = "draft-04"),
		n === "draft-7" && (n = "draft-07"),
		{
			processors: e.processors ?? {},
			metadataRegistry: e?.metadata ?? hl,
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
		n.io === "input" && mn(e) && (delete f.schema.examples, delete f.schema.default),
		n.io === "input" && "_prefault" in f.schema && ((u = f.schema).default ?? (u.default = f.schema._prefault)),
		delete f.schema._prefault,
		n.seen.get(e).schema
	);
}
function db(e, n) {
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
function hb(e, n) {
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
					jsonSchema: { input: xo(n, "input", e.processors), output: xo(n, "output", e.processors) },
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
function mn(e, n) {
	const r = n ?? { seen: new Set() };
	if (r.seen.has(e)) return !1;
	r.seen.add(e);
	const u = e._zod.def;
	if (u.type === "transform") return !0;
	if (u.type === "array") return mn(u.element, r);
	if (u.type === "set") return mn(u.valueType, r);
	if (u.type === "lazy") return mn(u.getter(), r);
	if (
		u.type === "promise" ||
		u.type === "optional" ||
		u.type === "nonoptional" ||
		u.type === "nullable" ||
		u.type === "readonly" ||
		u.type === "default" ||
		u.type === "prefault"
	)
		return mn(u.innerType, r);
	if (u.type === "intersection") return mn(u.left, r) || mn(u.right, r);
	if (u.type === "record" || u.type === "map") return mn(u.keyType, r) || mn(u.valueType, r);
	if (u.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : mn(u.in, r) || mn(u.out, r);
	if (u.type === "object") {
		for (const s in u.shape) if (mn(u.shape[s], r)) return !0;
		return !1;
	}
	if (u.type === "union") {
		for (const s of u.options) if (mn(s, r)) return !0;
		return !1;
	}
	if (u.type === "tuple") {
		for (const s of u.items) if (mn(s, r)) return !0;
		return !!(u.rest && mn(u.rest, r));
	}
	return !1;
}
var ZA =
		(e, n = {}) =>
		(r) => {
			const u = fb({ ...r, processors: n });
			return (Ht(e, u), db(u, e), hb(u, e));
		},
	xo =
		(e, n, r = {}) =>
		(u) => {
			const { libraryOptions: s, target: o } = u ?? {},
				f = fb({ ...(s ?? {}), target: o, io: n, processors: r });
			return (Ht(e, f), db(f, e), hb(f, e));
		},
	HA = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" },
	PA = (e, n, r, u) => {
		const s = r;
		s.type = "string";
		const { minimum: o, maximum: f, format: h, patterns: m, contentEncoding: v } = e._zod.bag;
		if (
			(typeof o == "number" && (s.minLength = o),
			typeof f == "number" && (s.maxLength = f),
			h && ((s.format = HA[h] ?? h), s.format === "" && delete s.format, h === "time" && delete s.format),
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
	QA = (e, n, r, u) => {
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
	YA = (e, n, r, u) => {
		r.not = {};
	},
	GA = (e, n, r, u) => {},
	FA = (e, n, r, u) => {
		const s = e._zod.def,
			o = Pp(s.entries);
		(o.every((f) => typeof f == "number") && (r.type = "number"),
			o.every((f) => typeof f == "string") && (r.type = "string"),
			(r.enum = o));
	},
	XA = (e, n, r, u) => {
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
	JA = (e, n, r, u) => {
		if (n.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
	},
	WA = (e, n, r, u) => {
		if (n.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
	},
	eC = (e, n, r, u) => {
		const s = r,
			o = e._zod.def,
			{ minimum: f, maximum: h } = e._zod.bag;
		(typeof f == "number" && (s.minItems = f),
			typeof h == "number" && (s.maxItems = h),
			(s.type = "array"),
			(s.items = Ht(o.element, n, { ...u, path: [...u.path, "items"] })));
	},
	tC = (e, n, r, u) => {
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
	nC = (e, n, r, u) => {
		const s = e._zod.def,
			o = s.inclusive === !1,
			f = s.options.map((h, m) => Ht(h, n, { ...u, path: [...u.path, o ? "oneOf" : "anyOf", m] }));
		o ? (r.oneOf = f) : (r.anyOf = f);
	},
	iC = (e, n, r, u) => {
		const s = e._zod.def,
			o = Ht(s.left, n, { ...u, path: [...u.path, "allOf", 0] }),
			f = Ht(s.right, n, { ...u, path: [...u.path, "allOf", 1] }),
			h = (m) => "allOf" in m && Object.keys(m).length === 1;
		r.allOf = [...(h(o) ? o.allOf : [o]), ...(h(f) ? f.allOf : [f])];
	},
	rC = (e, n, r, u) => {
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
	aC = (e, n, r, u) => {
		const s = e._zod.def,
			o = Ht(s.innerType, n, u),
			f = n.seen.get(e);
		n.target === "openapi-3.0" ? ((f.ref = s.innerType), (r.nullable = !0)) : (r.anyOf = [o, { type: "null" }]);
	},
	uC = (e, n, r, u) => {
		const s = e._zod.def;
		Ht(s.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = s.innerType;
	},
	lC = (e, n, r, u) => {
		const s = e._zod.def;
		Ht(s.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = s.innerType), (r.default = JSON.parse(JSON.stringify(s.defaultValue))));
	},
	sC = (e, n, r, u) => {
		const s = e._zod.def;
		Ht(s.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = s.innerType), n.io === "input" && (r._prefault = JSON.parse(JSON.stringify(s.defaultValue))));
	},
	oC = (e, n, r, u) => {
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
	cC = (e, n, r, u) => {
		const s = e._zod.def,
			o = s.in._zod.traits.has("$ZodTransform"),
			f = n.io === "input" ? (o ? s.out : s.in) : s.out;
		Ht(f, n, u);
		const h = n.seen.get(e);
		h.ref = f;
	},
	fC = (e, n, r, u) => {
		const s = e._zod.def;
		Ht(s.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = s.innerType), (r.readOnly = !0));
	},
	mb = (e, n, r, u) => {
		const s = e._zod.def;
		Ht(s.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = s.innerType;
	},
	dC = ne("ZodISODateTime", (e, n) => {
		(hx.init(e, n), wt.init(e, n));
	});
function hC(e) {
	return bA(dC, e);
}
var mC = ne("ZodISODate", (e, n) => {
	(mx.init(e, n), wt.init(e, n));
});
function vC(e) {
	return _A(mC, e);
}
var gC = ne("ZodISOTime", (e, n) => {
	(vx.init(e, n), wt.init(e, n));
});
function yC(e) {
	return SA(gC, e);
}
var pC = ne("ZodISODuration", (e, n) => {
	(gx.init(e, n), wt.init(e, n));
});
function bC(e) {
	return wA(pC, e);
}
var _C = (e, n) => {
		(Gp.init(e, n),
			(e.name = "ZodError"),
			Object.defineProperties(e, {
				format: { value: (r) => aT(e, r) },
				flatten: { value: (r) => rT(e, r) },
				addIssue: {
					value: (r) => {
						(e.issues.push(r), (e.message = JSON.stringify(e.issues, Fd, 2)));
					},
				},
				addIssues: {
					value: (r) => {
						(e.issues.push(...r), (e.message = JSON.stringify(e.issues, Fd, 2)));
					},
				},
				isEmpty: {
					get() {
						return e.issues.length === 0;
					},
				},
			}));
	},
	Wn = ne("ZodError", _C, { Parent: Error }),
	SC = ph(Wn),
	wC = bh(Wn),
	EC = Lo(Wn),
	TC = qo(Wn),
	xC = sT(Wn),
	AC = oT(Wn),
	CC = cT(Wn),
	RC = fT(Wn),
	OC = dT(Wn),
	NC = hT(Wn),
	kC = mT(Wn),
	MC = vT(Wn),
	M0 = new WeakMap();
function Tl(e, n, r) {
	const u = Object.getPrototypeOf(e);
	let s = M0.get(u);
	if ((s || ((s = new Set()), M0.set(u, s)), !s.has(n))) {
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
var St = ne(
		"ZodType",
		(e, n) => (
			_t.init(e, n),
			Object.assign(e["~standard"], { jsonSchema: { input: xo(e, "input"), output: xo(e, "output") } }),
			(e.toJSONSchema = ZA(e, {})),
			(e.def = n),
			(e.type = n.type),
			Object.defineProperty(e, "_def", { value: n }),
			(e.parse = (r, u) => SC(e, r, u, { callee: e.parse })),
			(e.safeParse = (r, u) => EC(e, r, u)),
			(e.parseAsync = async (r, u) => wC(e, r, u, { callee: e.parseAsync })),
			(e.safeParseAsync = async (r, u) => TC(e, r, u)),
			(e.spa = e.safeParseAsync),
			(e.encode = (r, u) => xC(e, r, u)),
			(e.decode = (r, u) => AC(e, r, u)),
			(e.encodeAsync = async (r, u) => CC(e, r, u)),
			(e.decodeAsync = async (r, u) => RC(e, r, u)),
			(e.safeEncode = (r, u) => OC(e, r, u)),
			(e.safeDecode = (r, u) => NC(e, r, u)),
			(e.safeEncodeAsync = async (r, u) => kC(e, r, u)),
			(e.safeDecodeAsync = async (r, u) => MC(e, r, u)),
			Tl(e, "ZodType", {
				check(...r) {
					const u = this.def;
					return this.clone(
						Dr(u, {
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
					return jr(this, r, u);
				},
				brand() {
					return this;
				},
				register(r, u) {
					return (r.add(this, u), this);
				},
				refine(r, u) {
					return this.check(xR(r, u));
				},
				superRefine(r, u) {
					return this.check(AR(r, u));
				},
				overwrite(r) {
					return this.check(bu(r));
				},
				optional() {
					return L0(this);
				},
				exactOptional() {
					return dR(this);
				},
				nullable() {
					return q0(this);
				},
				nullish() {
					return L0(q0(this));
				},
				nonoptional(r) {
					return pR(this, r);
				},
				array() {
					return fa(this);
				},
				or(r) {
					return wh([this, r]);
				},
				and(r) {
					return uR(this, r);
				},
				transform(r) {
					return U0(this, cR(r));
				},
				default(r) {
					return vR(this, r);
				},
				prefault(r) {
					return yR(this, r);
				},
				catch(r) {
					return _R(this, r);
				},
				pipe(r) {
					return U0(this, r);
				},
				readonly() {
					return ER(this);
				},
				describe(r) {
					const u = this.clone();
					return (hl.add(u, { description: r }), u);
				},
				meta(...r) {
					if (r.length === 0) return hl.get(this);
					const u = this.clone();
					return (hl.add(u, r[0]), u);
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
					return hl.get(e)?.description;
				},
				configurable: !0,
			}),
			e
		),
	),
	vb = ne("_ZodString", (e, n) => {
		(_h.init(e, n), St.init(e, n), (e._zod.processJSONSchema = (u, s, o) => PA(e, u, s, o)));
		const r = e._zod.bag;
		((e.format = r.format ?? null),
			(e.minLength = r.minimum ?? null),
			(e.maxLength = r.maximum ?? null),
			Tl(e, "_ZodString", {
				regex(...u) {
					return this.check(RA(...u));
				},
				includes(...u) {
					return this.check(kA(...u));
				},
				startsWith(...u) {
					return this.check(MA(...u));
				},
				endsWith(...u) {
					return this.check(zA(...u));
				},
				min(...u) {
					return this.check(To(...u));
				},
				max(...u) {
					return this.check(ob(...u));
				},
				length(...u) {
					return this.check(cb(...u));
				},
				nonempty(...u) {
					return this.check(To(1, ...u));
				},
				lowercase(u) {
					return this.check(OA(u));
				},
				uppercase(u) {
					return this.check(NA(u));
				},
				trim() {
					return this.check(jA());
				},
				normalize(...u) {
					return this.check(DA(...u));
				},
				toLowerCase() {
					return this.check(LA());
				},
				toUpperCase() {
					return this.check(qA());
				},
				slugify() {
					return this.check(UA());
				},
			}));
	}),
	zC = ne("ZodString", (e, n) => {
		(_h.init(e, n),
			vb.init(e, n),
			(e.email = (r) => e.check(Jx(DC, r))),
			(e.url = (r) => e.check(iA(jC, r))),
			(e.jwt = (r) => e.check(pA(FC, r))),
			(e.emoji = (r) => e.check(rA(LC, r))),
			(e.guid = (r) => e.check(R0(z0, r))),
			(e.uuid = (r) => e.check(Wx(ao, r))),
			(e.uuidv4 = (r) => e.check(eA(ao, r))),
			(e.uuidv6 = (r) => e.check(tA(ao, r))),
			(e.uuidv7 = (r) => e.check(nA(ao, r))),
			(e.nanoid = (r) => e.check(aA(qC, r))),
			(e.guid = (r) => e.check(R0(z0, r))),
			(e.cuid = (r) => e.check(uA(UC, r))),
			(e.cuid2 = (r) => e.check(lA($C, r))),
			(e.ulid = (r) => e.check(sA(BC, r))),
			(e.base64 = (r) => e.check(vA(KC, r))),
			(e.base64url = (r) => e.check(gA(YC, r))),
			(e.xid = (r) => e.check(oA(IC, r))),
			(e.ksuid = (r) => e.check(cA(VC, r))),
			(e.ipv4 = (r) => e.check(fA(ZC, r))),
			(e.ipv6 = (r) => e.check(dA(HC, r))),
			(e.cidrv4 = (r) => e.check(hA(PC, r))),
			(e.cidrv6 = (r) => e.check(mA(QC, r))),
			(e.e164 = (r) => e.check(yA(GC, r))),
			(e.datetime = (r) => e.check(hC(r))),
			(e.date = (r) => e.check(vC(r))),
			(e.time = (r) => e.check(yC(r))),
			(e.duration = (r) => e.check(bC(r))));
	});
function bt(e) {
	return Xx(zC, e);
}
var wt = ne("ZodStringFormat", (e, n) => {
		(gt.init(e, n), vb.init(e, n));
	}),
	DC = ne("ZodEmail", (e, n) => {
		(rx.init(e, n), wt.init(e, n));
	}),
	z0 = ne("ZodGUID", (e, n) => {
		(nx.init(e, n), wt.init(e, n));
	}),
	ao = ne("ZodUUID", (e, n) => {
		(ix.init(e, n), wt.init(e, n));
	}),
	jC = ne("ZodURL", (e, n) => {
		(ax.init(e, n), wt.init(e, n));
	}),
	LC = ne("ZodEmoji", (e, n) => {
		(ux.init(e, n), wt.init(e, n));
	}),
	qC = ne("ZodNanoID", (e, n) => {
		(lx.init(e, n), wt.init(e, n));
	}),
	UC = ne("ZodCUID", (e, n) => {
		(sx.init(e, n), wt.init(e, n));
	}),
	$C = ne("ZodCUID2", (e, n) => {
		(ox.init(e, n), wt.init(e, n));
	}),
	BC = ne("ZodULID", (e, n) => {
		(cx.init(e, n), wt.init(e, n));
	}),
	IC = ne("ZodXID", (e, n) => {
		(fx.init(e, n), wt.init(e, n));
	}),
	VC = ne("ZodKSUID", (e, n) => {
		(dx.init(e, n), wt.init(e, n));
	}),
	ZC = ne("ZodIPv4", (e, n) => {
		(yx.init(e, n), wt.init(e, n));
	}),
	HC = ne("ZodIPv6", (e, n) => {
		(px.init(e, n), wt.init(e, n));
	}),
	PC = ne("ZodCIDRv4", (e, n) => {
		(bx.init(e, n), wt.init(e, n));
	}),
	QC = ne("ZodCIDRv6", (e, n) => {
		(_x.init(e, n), wt.init(e, n));
	}),
	KC = ne("ZodBase64", (e, n) => {
		(Sx.init(e, n), wt.init(e, n));
	}),
	YC = ne("ZodBase64URL", (e, n) => {
		(Ex.init(e, n), wt.init(e, n));
	}),
	GC = ne("ZodE164", (e, n) => {
		(Tx.init(e, n), wt.init(e, n));
	}),
	FC = ne("ZodJWT", (e, n) => {
		(Ax.init(e, n), wt.init(e, n));
	}),
	gb = ne("ZodNumber", (e, n) => {
		(ab.init(e, n),
			St.init(e, n),
			(e._zod.processJSONSchema = (u, s, o) => QA(e, u, s, o)),
			Tl(e, "ZodNumber", {
				gt(u, s) {
					return this.check(N0(u, s));
				},
				gte(u, s) {
					return this.check(wd(u, s));
				},
				min(u, s) {
					return this.check(wd(u, s));
				},
				lt(u, s) {
					return this.check(O0(u, s));
				},
				lte(u, s) {
					return this.check(Sd(u, s));
				},
				max(u, s) {
					return this.check(Sd(u, s));
				},
				int(u) {
					return this.check(D0(u));
				},
				safe(u) {
					return this.check(D0(u));
				},
				positive(u) {
					return this.check(N0(0, u));
				},
				nonnegative(u) {
					return this.check(wd(0, u));
				},
				negative(u) {
					return this.check(O0(0, u));
				},
				nonpositive(u) {
					return this.check(Sd(0, u));
				},
				multipleOf(u, s) {
					return this.check(k0(u, s));
				},
				step(u, s) {
					return this.check(k0(u, s));
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
function ui(e) {
	return EA(gb, e);
}
var XC = ne("ZodNumberFormat", (e, n) => {
	(Cx.init(e, n), gb.init(e, n));
});
function D0(e) {
	return TA(XC, e);
}
var JC = ne("ZodBoolean", (e, n) => {
	(Rx.init(e, n), St.init(e, n), (e._zod.processJSONSchema = (r, u, s) => KA(e, r, u, s)));
});
function Sh(e) {
	return xA(JC, e);
}
var WC = ne("ZodUnknown", (e, n) => {
	(Ox.init(e, n), St.init(e, n), (e._zod.processJSONSchema = (r, u, s) => GA(e, r, u, s)));
});
function Ao() {
	return AA(WC);
}
var eR = ne("ZodNever", (e, n) => {
	(Nx.init(e, n), St.init(e, n), (e._zod.processJSONSchema = (r, u, s) => YA(e, r, u, s)));
});
function tR(e) {
	return CA(eR, e);
}
var nR = ne("ZodArray", (e, n) => {
	(kx.init(e, n),
		St.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => eC(e, r, u, s)),
		(e.element = n.element),
		Tl(e, "ZodArray", {
			min(r, u) {
				return this.check(To(r, u));
			},
			nonempty(r) {
				return this.check(To(1, r));
			},
			max(r, u) {
				return this.check(ob(r, u));
			},
			length(r, u) {
				return this.check(cb(r, u));
			},
			unwrap() {
				return this.element;
			},
		}));
});
function fa(e, n) {
	return $A(nR, e, n);
}
var iR = ne("ZodObject", (e, n) => {
	(zx.init(e, n),
		St.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => tC(e, r, u, s)),
		nt(e, "shape", () => n.shape),
		Tl(e, "ZodObject", {
			keyof() {
				return lR(Object.keys(this._zod.def.shape));
			},
			catchall(r) {
				return this.clone({ ...this._zod.def, catchall: r });
			},
			passthrough() {
				return this.clone({ ...this._zod.def, catchall: Ao() });
			},
			loose() {
				return this.clone({ ...this._zod.def, catchall: Ao() });
			},
			strict() {
				return this.clone({ ...this._zod.def, catchall: tR() });
			},
			strip() {
				return this.clone({ ...this._zod.def, catchall: void 0 });
			},
			extend(r) {
				return JE(this, r);
			},
			safeExtend(r) {
				return WE(this, r);
			},
			merge(r) {
				return eT(this, r);
			},
			pick(r) {
				return FE(this, r);
			},
			omit(r) {
				return XE(this, r);
			},
			partial(...r) {
				return tT(pb, this, r[0]);
			},
			required(...r) {
				return nT(bb, this, r[0]);
			},
		}));
});
function qn(e, n) {
	const r = { type: "object", shape: e ?? {}, ...ye(n) };
	return new iR(r);
}
var rR = ne("ZodUnion", (e, n) => {
	(Dx.init(e, n), St.init(e, n), (e._zod.processJSONSchema = (r, u, s) => nC(e, r, u, s)), (e.options = n.options));
});
function wh(e, n) {
	return new rR({ type: "union", options: e, ...ye(n) });
}
var aR = ne("ZodIntersection", (e, n) => {
	(jx.init(e, n), St.init(e, n), (e._zod.processJSONSchema = (r, u, s) => iC(e, r, u, s)));
});
function uR(e, n) {
	return new aR({ type: "intersection", left: e, right: n });
}
var j0 = ne("ZodRecord", (e, n) => {
	(Lx.init(e, n),
		St.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => rC(e, r, u, s)),
		(e.keyType = n.keyType),
		(e.valueType = n.valueType));
});
function yb(e, n, r) {
	return !n || !n._zod
		? new j0({ type: "record", keyType: bt(), valueType: e, ...ye(n) })
		: new j0({ type: "record", keyType: e, valueType: n, ...ye(r) });
}
var Jd = ne("ZodEnum", (e, n) => {
	(qx.init(e, n),
		St.init(e, n),
		(e._zod.processJSONSchema = (u, s, o) => FA(e, u, s, o)),
		(e.enum = n.entries),
		(e.options = Object.values(n.entries)));
	const r = new Set(Object.keys(n.entries));
	((e.extract = (u, s) => {
		const o = {};
		for (const f of u)
			if (r.has(f)) o[f] = n.entries[f];
			else throw new Error(`Key ${f} not found in enum`);
		return new Jd({ ...n, checks: [], ...ye(s), entries: o });
	}),
		(e.exclude = (u, s) => {
			const o = { ...n.entries };
			for (const f of u)
				if (r.has(f)) delete o[f];
				else throw new Error(`Key ${f} not found in enum`);
			return new Jd({ ...n, checks: [], ...ye(s), entries: o });
		}));
});
function lR(e, n) {
	const r = Array.isArray(e) ? Object.fromEntries(e.map((u) => [u, u])) : e;
	return new Jd({ type: "enum", entries: r, ...ye(n) });
}
var sR = ne("ZodLiteral", (e, n) => {
	(Ux.init(e, n),
		St.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => XA(e, r, u, s)),
		(e.values = new Set(n.values)),
		Object.defineProperty(e, "value", {
			get() {
				if (n.values.length > 1)
					throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
				return n.values[0];
			},
		}));
});
function _l(e, n) {
	return new sR({ type: "literal", values: Array.isArray(e) ? e : [e], ...ye(n) });
}
var oR = ne("ZodTransform", (e, n) => {
	($x.init(e, n),
		St.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => WA(e, r, u, s)),
		(e._zod.parse = (r, u) => {
			if (u.direction === "backward") throw new Hp(e.constructor.name);
			r.addIssue = (o) => {
				if (typeof o == "string") r.issues.push(bl(o, r.value, n));
				else {
					const f = o;
					(f.fatal && (f.continue = !1),
						f.code ?? (f.code = "custom"),
						f.input ?? (f.input = r.value),
						f.inst ?? (f.inst = e),
						r.issues.push(bl(f)));
				}
			};
			const s = n.transform(r.value, r);
			return s instanceof Promise
				? s.then((o) => ((r.value = o), (r.fallback = !0), r))
				: ((r.value = s), (r.fallback = !0), r);
		}));
});
function cR(e) {
	return new oR({ type: "transform", transform: e });
}
var pb = ne("ZodOptional", (e, n) => {
	(sb.init(e, n),
		St.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => mb(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function L0(e) {
	return new pb({ type: "optional", innerType: e });
}
var fR = ne("ZodExactOptional", (e, n) => {
	(Bx.init(e, n),
		St.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => mb(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function dR(e) {
	return new fR({ type: "optional", innerType: e });
}
var hR = ne("ZodNullable", (e, n) => {
	(Ix.init(e, n),
		St.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => aC(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function q0(e) {
	return new hR({ type: "nullable", innerType: e });
}
var mR = ne("ZodDefault", (e, n) => {
	(Vx.init(e, n),
		St.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => lC(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeDefault = e.unwrap));
});
function vR(e, n) {
	return new mR({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : Kp(n);
		},
	});
}
var gR = ne("ZodPrefault", (e, n) => {
	(Zx.init(e, n),
		St.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => sC(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function yR(e, n) {
	return new gR({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : Kp(n);
		},
	});
}
var bb = ne("ZodNonOptional", (e, n) => {
	(Hx.init(e, n),
		St.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => uC(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function pR(e, n) {
	return new bb({ type: "nonoptional", innerType: e, ...ye(n) });
}
var bR = ne("ZodCatch", (e, n) => {
	(Px.init(e, n),
		St.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => oC(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeCatch = e.unwrap));
});
function _R(e, n) {
	return new bR({ type: "catch", innerType: e, catchValue: typeof n == "function" ? n : () => n });
}
var SR = ne("ZodPipe", (e, n) => {
	(Qx.init(e, n),
		St.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => cC(e, r, u, s)),
		(e.in = n.in),
		(e.out = n.out));
});
function U0(e, n) {
	return new SR({ type: "pipe", in: e, out: n });
}
var wR = ne("ZodReadonly", (e, n) => {
	(Kx.init(e, n),
		St.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => fC(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function ER(e) {
	return new wR({ type: "readonly", innerType: e });
}
var TR = ne("ZodCustom", (e, n) => {
	(Yx.init(e, n), St.init(e, n), (e._zod.processJSONSchema = (r, u, s) => JA(e, r, u, s)));
});
function xR(e, n = {}) {
	return BA(TR, e, n);
}
function AR(e, n) {
	return IA(e, n);
}
var w = Mp(jo()),
	CR = ZE(),
	lu = ["thumbs_up", "heart", "laugh", "wow", "sad", "party", "rocket", "eyes"],
	_b = { thumbs_up: "👍", heart: "❤️", laugh: "😂", wow: "😮", sad: "😢", party: "🎉", rocket: "🚀", eyes: "👀" },
	Sb = {
		thumbs_up: "Thumbs up",
		heart: "Heart",
		laugh: "Laugh",
		wow: "Wow",
		sad: "Sad",
		party: "Party",
		rocket: "Rocket",
		eyes: "Eyes",
	},
	RR = 9999999999999,
	OR = /(?:^|:)(\d{13}):([^:]{1,16})$/;
function gu(e) {
	const n = OR.exec(e);
	return n ? RR - Number(n[1]) : null;
}
var wb = "p/",
	NR = ["channels", "messages", "replies", "reactions"],
	Eh =
		"Only the people added here can read it — and the organization owner, who can read everything in this workspace.";
function kR(e) {
	const n = crypto.randomUUID();
	return e === "private" ? `${wb}${n}` : n;
}
function ai(e) {
	return e.startsWith(wb);
}
function uo(e) {
	return `${e}:`;
}
function Th(e) {
	const n = e.split(":");
	return n.length < 3 || gu(e) === null ? null : n.slice(0, -2).join(":");
}
function Eb(e) {
	return `${e}:`;
}
function MR(e, n) {
	return `${e}:${n}`;
}
function zR(e) {
	const n = e.split(":");
	if (n.length < 4) return null;
	const r = n[n.length - 2];
	if (!lu.includes(r)) return null;
	const u = n.slice(0, -2).join(":");
	return gu(u) === null ? null : { targetKey: u, token: r, keyTailUserId: n[n.length - 1] };
}
function xh(e) {
	const n = e.split(":");
	if (n.length < 5) return null;
	const r = n.slice(0, -2).join(":");
	return gu(r) === null || gu(e) === null ? null : r;
}
function $0(e) {
	return `me:${e}`;
}
function DR(e) {
	return `${e}:read`;
}
function Tb(e) {
	const n = e.split(":");
	return n.length !== 3 || n[1] !== "read" || !ai(n[0]) ? null : { channelKey: n[0], keyTailUserId: n[2] };
}
var jR = qn({
		name: bt().min(1).max(64),
		archivedAt: ui().nullable(),
		topic: bt().max(250).optional(),
		lastMessageAt: ui().optional(),
	}),
	LR = qn({ fileNodeId: bt().min(1), name: bt().min(1) }),
	qR = qn({
		text: bt(),
		attachments: fa(LR),
		editedAt: ui().nullable(),
		deletedAt: ui().nullable(),
		mentions: fa(bt()).optional(),
	}),
	UR = "Someone with no name yet";
function mo(e) {
	return e !== null && e !== "" ? e : UR;
}
function $R(e, n) {
	const r = /(?:^|\s)@([^\s@]*)$/.exec(e.slice(0, n));
	if (r === null) return null;
	const u = r[1] ?? "";
	return { start: n - u.length - 1, query: u };
}
function BR(e, n, r) {
	const u = n.toLowerCase();
	return e
		.filter((s) => s.userId !== r)
		.map((s) => ({ ...s, label: mo(s.displayName) }))
		.filter((s) => s.label.toLowerCase().includes(u))
		.sort((s, o) => s.label.localeCompare(o.label));
}
function IR(e, n, r, u) {
	return { text: `${e.slice(0, n)}@${u} ${e.slice(r)}`, caret: n + u.length + 2 };
}
function VR(e, n) {
	const r = [];
	for (const [u, s] of e) n.includes(`@${s}`) && r.push(u);
	return r;
}
function xb(e) {
	return e === "not_consented"
		? "This workspace has not allowed Chitchat to read the member list yet. An admin can accept the plugin's current permissions."
		: "The member list is not available right now. You can keep typing.";
}
var ZR = qn({ channels: yb(bt(), ui()) }),
	HR = qn({ at: ui() }),
	xl = qn({
		collection: bt(),
		key: bt().min(1).max(128),
		value: yb(bt(), Ao()),
		revision: ui(),
		createdBy: bt().min(1),
		updatedBy: bt(),
		ownership: wh([_l("shared"), _l("owned")]),
		createdAt: ui(),
		updatedAt: ui(),
	});
function PR(e, n) {
	const r = xl.safeParse(e);
	if (!r.success) return null;
	const u = gu(r.data.key);
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
function B0(e) {
	const n = xl.safeParse(e);
	if (!n.success) return null;
	const r = jR.safeParse(n.data.value);
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
function Co(e) {
	return PR(e, qR);
}
var QR = qn({ removed: _l(!0).optional() });
function KR(e) {
	const n = xl.safeParse(e);
	if (!n.success) return null;
	const r = zR(n.data.key);
	if (r === null) return null;
	const u = QR.safeParse(n.data.value);
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
function YR(e) {
	const n = xl.safeParse(e);
	if (!n.success) return null;
	const r = ZR.safeParse(n.data.value);
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
function GR(e) {
	const n = xl.safeParse(e);
	if (!n.success) return null;
	const r = Tb(n.data.key);
	if (r === null) return null;
	const u = HR.safeParse(n.data.value);
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
function I0(e, n) {
	const r = { ...e.channels };
	for (const [u, s] of Object.entries(n.channels)) {
		const o = r[u];
		r[u] = o === void 0 ? s : Math.max(o, s);
	}
	return { channels: r };
}
function FR(e) {
	const n = new Map();
	for (const r of e.docs) {
		const u = Th(r.key);
		if (u === null || ai(u) || r.value.deletedAt !== null || r.createdBy === e.selfUserId) continue;
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
function $o(e, n) {
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
var XR = qn({
		path: bt(),
		name: bt(),
		kind: wh([_l("file"), _l("folder")]),
		nodeId: bt(),
		contentType: bt().nullable(),
		updatedAt: ui(),
	}),
	JR = qn({ items: fa(XR), cursor: bt().nullable(), isDone: Sh() }),
	Ab = qn({ documents: fa(Ao()), cursor: bt().nullable(), isDone: Sh() }),
	WR = qn({
		items: fa(qn({ fileNodeId: bt(), url: bt(), expiresAt: ui() })),
		errors: fa(qn({ fileNodeId: bt(), message: bt() })),
		truncated: Sh(),
	});
function Xn(e) {
	return e instanceof Error ? e.message : String(e);
}
function Ed(e) {
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
function vo(e) {
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
function eO(e, n) {
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
		for (const h of lu) {
			const m = o.get(h);
			m === void 0 || m.size === 0 || f.push({ token: h, count: m.size, reactedByMe: m.has(n) });
		}
		u.set(s, f);
	}
	return u;
}
function tO(e) {
	const n = new Map();
	for (const r of e) {
		const u = xh(r.key);
		if (u === null) continue;
		const s = n.get(u);
		s === void 0
			? n.set(u, { count: 1, latestAt: r.timestamp })
			: ((s.count += 1), (s.latestAt = Math.max(s.latestAt, r.timestamp)));
	}
	return n;
}
function nO(e, n) {
	return e > 99 && n ? "99+" : String(e);
}
var iO = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
	rO = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (n, r, u) => (u ? u.toUpperCase() : r.toLowerCase())),
	V0 = (e) => {
		const n = rO(e);
		return n.charAt(0).toUpperCase() + n.slice(1);
	},
	Cb = (...e) =>
		e
			.filter((n, r, u) => !!n && n.trim() !== "" && u.indexOf(n) === r)
			.join(" ")
			.trim(),
	aO = (e) => {
		for (const n in e) if (n.startsWith("aria-") || n === "role" || n === "title") return !0;
	},
	uO = {
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
	lO = (0, w.forwardRef)(
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
					...uO,
					width: n,
					height: n,
					stroke: e,
					strokeWidth: u ? (Number(r) * 24) / Number(n) : r,
					className: Cb("lucide", s),
					...(!o && !aO(h) && { "aria-hidden": "true" }),
					...h,
				},
				[...f.map(([v, g]) => (0, w.createElement)(v, g)), ...(Array.isArray(o) ? o : [o])],
			),
	),
	Ah = (e, n) => {
		const r = (0, w.forwardRef)(({ className: u, ...s }, o) =>
			(0, w.createElement)(lO, { ref: o, iconNode: n, className: Cb(`lucide-${iO(V0(e))}`, `lucide-${e}`, u), ...s }),
		);
		return ((r.displayName = V0(e)), r);
	},
	sO = [
		["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
		["path", { d: "M12 19V5", key: "x0mq9r" }],
	],
	oO = Ah("arrow-up", sO),
	cO = [
		["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
		["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
		["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
	],
	fO = Ah("ellipsis", cO),
	dO = [
		[
			"path",
			{
				d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
				key: "1miecu",
			},
		],
	],
	hO = Ah("paperclip", dO),
	_u = mO();
function mO() {
	var e;
	return typeof window < "u" && !!((e = window.document) != null && e.createElement);
}
function dt(e) {
	return e ? ("self" in e ? e.document : e.ownerDocument || document) : document;
}
function Rb(e) {
	return e ? ("self" in e ? e.self : dt(e).defaultView || window) : self;
}
function er(e, n = !1) {
	const { activeElement: r } = dt(e);
	if (!r?.nodeName) return null;
	if (Ch(r) && r.contentDocument) return er(r.contentDocument.body, n);
	if (n) {
		const u = r.getAttribute("aria-activedescendant");
		if (u) {
			const s = dt(r).getElementById(u);
			if (s) return s;
		}
	}
	return r;
}
function Pt(e, n) {
	return e === n || e.contains(n);
}
function Ch(e) {
	return e.tagName === "IFRAME";
}
function Nr(e) {
	const n = e.tagName.toLowerCase();
	return n === "button" ? !0 : n === "input" && e.type ? vO.indexOf(e.type) !== -1 : !1;
}
var vO = ["button", "color", "file", "image", "reset", "submit"];
function Ob(e) {
	if (typeof e.checkVisibility == "function") return e.checkVisibility();
	const n = e;
	return n.offsetWidth > 0 || n.offsetHeight > 0 || e.getClientRects().length > 0;
}
function Si(e) {
	try {
		const n = e instanceof HTMLInputElement && e.selectionStart !== null,
			r = e.tagName === "TEXTAREA";
		return n || r || !1;
	} catch {
		return !1;
	}
}
function Wd(e) {
	return e.isContentEditable || Si(e);
}
function gO(e) {
	if (Si(e)) return e.value;
	if (e.isContentEditable) {
		const n = dt(e).createRange();
		return (n.selectNodeContents(e), n.toString());
	}
	return "";
}
function eh(e) {
	let n = 0,
		r = 0;
	if (Si(e)) ((n = e.selectionStart || 0), (r = e.selectionEnd || 0));
	else if (e.isContentEditable) {
		const u = dt(e).getSelection();
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
function Bo(e, n) {
	const r = ["dialog", "menu", "listbox", "tree", "grid"],
		u = e?.getAttribute("role");
	return u && r.indexOf(u) !== -1 ? u : n;
}
function Nb(e, n) {
	var r;
	const u = { menu: "menuitem", listbox: "option", tree: "treeitem" },
		s = Bo(e);
	return s && (r = u[s]) != null ? r : n;
}
function Rh(e) {
	if (!e) return null;
	const n = (r) => r === "auto" || r === "scroll";
	if (e.clientHeight && e.scrollHeight > e.clientHeight) {
		const { overflowY: r } = getComputedStyle(e);
		if (n(r)) return e;
	} else if (e.clientWidth && e.scrollWidth > e.clientWidth) {
		const { overflowX: r } = getComputedStyle(e);
		if (n(r)) return e;
	}
	return Rh(e.parentElement) || document.scrollingElement || document.body;
}
function Td(e, ...n) {
	/text|search|password|tel|url/i.test(e.type) && e.setSelectionRange(...n);
}
function kb(e, n) {
	const r = e.map((s, o) => [o, s]);
	let u = !1;
	return (
		r.sort(([s, o], [f, h]) => {
			const m = n(o),
				v = n(h);
			return m === v || !m || !v ? 0 : yO(m, v) ? (s > f && (u = !0), -1) : (s < f && (u = !0), 1);
		}),
		u ? r.map(([s, o]) => o) : e
	);
}
function yO(e, n) {
	return !!(n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
var pO = { id: null };
function bO(e, n, r = !1) {
	const u = e.findIndex((s) => s.id === n);
	return [...e.slice(u + 1), ...(r ? [pO] : []), ...e.slice(0, u)];
}
function _O(e, n) {
	return e.find((r) => (n ? !r.disabled && r.id !== n : !r.disabled));
}
function Rr(e, n) {
	return (n && e.item(n)) || null;
}
function SO(e) {
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
function wO(e, n = !1) {
	if (Si(e)) e.setSelectionRange(n ? e.value.length : 0, e.value.length);
	else if (e.isContentEditable) {
		const r = dt(e).getSelection();
		(r?.selectAllChildren(e), n && r?.collapseToEnd());
	}
}
var th = Symbol("FOCUS_SILENTLY");
function EO(e) {
	((e[th] = !0), e.focus({ preventScroll: !0 }));
}
function TO(e) {
	const n = e[th];
	return (delete e[th], n);
}
function vl(e, n, r) {
	if (!n || n === r) return !1;
	const u = e.item(n.id);
	return !(!u || (r && u.element === r));
}
function gl(...e) {}
function Mb(e, n) {
	return xO(e) ? e(AO(n) ? n() : n) : e;
}
function xO(e) {
	return typeof e == "function";
}
function AO(e) {
	return typeof e == "function";
}
function Wi(e, n) {
	return typeof Object.hasOwn == "function" ? Object.hasOwn(e, n) : Object.prototype.hasOwnProperty.call(e, n);
}
function An(...e) {
	return (...n) => {
		for (const r of e) typeof r == "function" && r(...n);
	};
}
function zb(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function CO(e, n) {
	const r = { ...e };
	for (const u of n) Wi(r, u) && delete r[u];
	return r;
}
function RO(e, n) {
	const r = {};
	for (const u of n) Wi(e, u) && (r[u] = e[u]);
	return r;
}
function Db(e) {
	return e;
}
function Qt(e, n) {
	if (!e) throw typeof n != "string" ? new Error("Invariant failed") : new Error(n);
}
function OO(e) {
	return Object.keys(e);
}
function Io(e, ...n) {
	const r = typeof e == "function" ? e(...n) : e;
	return r == null ? !1 : !r;
}
function Al(e) {
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
function nh(e, n) {
	typeof e == "function" ? e(n) : e && (e.current = n);
}
function NO(e) {
	return !e || !(0, w.isValidElement)(e) ? !1 : "ref" in e.props || "ref" in e;
}
function kO(e) {
	return NO(e) ? { ...e.props }.ref || e.ref : null;
}
function MO(e, n) {
	const r = { ...e };
	for (const u in n) {
		if (!Wi(n, u)) continue;
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
function jb() {
	return _u && !!navigator.maxTouchPoints;
}
function Oh() {
	return _u ? /mac|iphone|ipad|ipod/i.test(navigator.platform) : !1;
}
function Vo() {
	return _u && Oh() && /apple/i.test(navigator.vendor);
}
function zO() {
	return _u && /firefox\//i.test(navigator.userAgent);
}
function DO() {
	return _u && navigator.platform.startsWith("Mac") && !jb();
}
function Lb(e) {
	return !!(e.currentTarget && !Pt(e.currentTarget, e.target));
}
function Ln(e) {
	return e.target === e.currentTarget;
}
function qb(e) {
	const n = e.currentTarget;
	if (!n) return !1;
	const r = Oh();
	if ((r && !e.metaKey) || (!r && !e.ctrlKey)) return !1;
	const u = n.tagName.toLowerCase();
	return u === "a" || (u === "button" && n.type === "submit") || (u === "input" && n.type === "submit");
}
function Ub(e) {
	const n = e.currentTarget;
	if (!n) return !1;
	const r = n.tagName.toLowerCase();
	return e.altKey ? r === "a" || (r === "button" && n.type === "submit") || (r === "input" && n.type === "submit") : !1;
}
function jO(e, n, r) {
	const u = new Event(n, r);
	return e.dispatchEvent(u);
}
function nu(e, n) {
	const r = new FocusEvent("blur", n),
		u = e.dispatchEvent(r),
		s = { ...n, bubbles: !0 };
	return (e.dispatchEvent(new FocusEvent("focusout", s)), u);
}
function LO(e, n, r) {
	const u = new KeyboardEvent(n, r);
	return e.dispatchEvent(u);
}
function Z0(e, n) {
	const r = new MouseEvent("click", n);
	return e.dispatchEvent(r);
}
function ua(e, n) {
	const r = n || e.currentTarget,
		u = e.relatedTarget;
	return !u || !Pt(r, u);
}
function cu(e, n, r, u) {
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
function on(e, n, r, u = window) {
	const s = [];
	try {
		u.document.addEventListener(e, n, r);
		for (const f of Array.from(u.frames)) s.push(on(e, n, r, f));
	} catch {}
	return () => {
		try {
			u.document.removeEventListener(e, n, r);
		} catch {}
		for (const f of s) f();
	};
}
var Nh = { ...w },
	H0 = Nh.useId,
	Nz = Nh.useDeferredValue,
	P0 = Nh.useInsertionEffect,
	Pe = _u ? w.useLayoutEffect : w.useEffect;
function qO(e) {
	const [n] = (0, w.useState)(e);
	return n;
}
function $b(e) {
	const n = (0, w.useRef)(e);
	return (
		Pe(() => {
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
		P0
			? P0(() => {
					n.current = e;
				})
			: (n.current = e),
		(0, w.useCallback)((...r) => {
			var u;
			return (u = n.current) == null ? void 0 : u.call(n, ...r);
		}, [])
	);
}
function UO(e) {
	const [n, r] = (0, w.useState)(null);
	return (
		Pe(() => {
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
				for (const r of e) nh(r, n);
			};
	}, e);
}
function tr(e) {
	if (H0) {
		const u = H0();
		return e || u;
	}
	const [n, r] = (0, w.useState)(e);
	return (
		Pe(() => {
			if (e || n) return;
			const u = Math.random().toString(36).slice(2, 8);
			r(`id-${u}`);
		}, [e, n]),
		e || n
	);
}
function Bb(e, n) {
	const r = (o) => {
			if (typeof o == "string") return o;
		},
		[u, s] = (0, w.useState)(() => r(n));
	return (
		Pe(() => {
			const o = e && "current" in e ? e.current : e;
			s(o?.tagName.toLowerCase() || r(n));
		}, [e, n]),
		u
	);
}
function $O(e, n, r) {
	const u = qO(r),
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
function Su(e, n) {
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
function BO(e, n) {
	const r = (0, w.useRef)(!1);
	(Pe(() => {
		if (r.current) return e();
		r.current = !0;
	}, n),
		Pe(
			() => () => {
				r.current = !1;
			},
			[],
		));
}
function Ib() {
	return (0, w.useReducer)(() => [], []);
}
function vt(e) {
	return Ce(typeof e == "function" ? e : () => e);
}
function cn(e, n, r = []) {
	const u = (0, w.useCallback)((s) => (e.wrapElement && (s = e.wrapElement(s)), n(s)), [...r, e.wrapElement]);
	return { ...e, wrapElement: u };
}
function kh(e = !1, n) {
	const [r, u] = (0, w.useState)(null);
	return { portalRef: Dt(u, n), portalNode: r, domReady: !e || r };
}
function Vb(e, n, r) {
	const u = e.onLoadedMetadataCapture,
		s = (0, w.useMemo)(() => Object.assign(() => {}, { ...u, [n]: r }), [u, n, r]);
	return [u?.[n], { onLoadedMetadataCapture: s }];
}
var Q0 = !1;
function Mh() {
	return (
		(0, w.useEffect)(() => {
			Q0 ||
				(on("mousemove", VO, !0),
				on("mousedown", lo, !0),
				on("mouseup", lo, !0),
				on("keydown", lo, !0),
				on("scroll", lo, !0),
				(Q0 = !0));
		}, []),
		Ce(() => zh)
	);
}
var zh = !1,
	K0 = 0,
	Y0 = 0;
function IO(e) {
	const n = e.movementX || e.screenX - K0,
		r = e.movementY || e.screenY - Y0;
	return ((K0 = e.screenX), (Y0 = e.screenY), n || r || !1);
}
function VO(e) {
	IO(e) && (zh = !0);
}
function lo() {
	zh = !1;
}
var ZO = Jn((e) => {
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
	HO = Jn((e, n) => {
		n.exports = ZO();
	}),
	S = HO();
function Ie(e) {
	const n = w.forwardRef((r, u) => e({ ...r, ref: u }));
	return ((n.displayName = e.displayName || e.name), n);
}
function Zo(e, n) {
	return w.memo(e, n);
}
function Qe(e, n) {
	const { wrapElement: r, render: u, ...s } = n,
		o = Dt(n.ref, kO(u));
	let f;
	if (w.isValidElement(u)) {
		const h = { ...u.props, ref: o };
		f = w.cloneElement(u, MO(s, h));
	} else u ? (f = u(s)) : (f = (0, S.jsx)(e, { ...s }));
	return r ? r(f) : f;
}
function Ge(e) {
	const n = (r = {}) => e(r);
	return ((n.displayName = e.name), n);
}
function wi(e = [], n = []) {
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
var Cl = wi(),
	PO = Cl.useContext,
	kz = Cl.useScopedContext,
	Mz = Cl.useProviderContext,
	QO = Cl.ContextProvider,
	KO = Cl.ScopedContextProvider,
	Rl = wi([QO], [KO]),
	Dh = Rl.useContext,
	zz = Rl.useScopedContext,
	YO = Rl.useProviderContext,
	Ol = Rl.ContextProvider,
	Ho = Rl.ScopedContextProvider,
	GO = (0, w.createContext)(void 0),
	FO = (0, w.createContext)(void 0),
	Zb = (0, w.createContext)(!0),
	Po =
		"input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], summary, iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])";
function XO(e) {
	return Number.parseInt(e.getAttribute("tabindex") || "0", 10) < 0;
}
function li(e) {
	return !(!e.matches(Po) || !Ob(e) || e.closest("[inert]"));
}
function yu(e) {
	if (!li(e) || XO(e)) return !1;
	if (!("form" in e) || !e.form || e.checked || e.type !== "radio") return !0;
	const n = e.form.elements.namedItem(e.name);
	if (!n || !("length" in n)) return !0;
	const r = er(e);
	return !r || r === e || !("form" in r) || r.form !== e.form || r.name !== e.name;
}
function jh(e, n) {
	const r = Array.from(e.querySelectorAll(Po));
	n && r.unshift(e);
	const u = r.filter(li);
	return (
		u.forEach((s, o) => {
			if (Ch(s) && s.contentDocument) {
				const f = s.contentDocument.body;
				u.splice(o, 1, ...jh(f));
			}
		}),
		u
	);
}
function Qo(e, n, r) {
	const u = Array.from(e.querySelectorAll(Po)),
		s = u.filter(yu);
	return (
		n && yu(e) && s.unshift(e),
		s.forEach((o, f) => {
			if (Ch(o) && o.contentDocument) {
				const h = o.contentDocument.body,
					m = Qo(h, !1, r);
				s.splice(f, 1, ...m);
			}
		}),
		!s.length && r ? u : s
	);
}
function JO(e, n, r) {
	const [u] = Qo(e, n, r);
	return u || null;
}
function WO(e, n, r, u) {
	const s = er(e),
		o = jh(e, n),
		f = o.indexOf(s),
		h = o.slice(f + 1);
	return h.find(yu) || (r ? o.find(yu) : null) || (u ? h[0] : null) || null;
}
function xd(e, n) {
	return WO(document.body, !1, e, n);
}
function eN(e, n, r, u) {
	const s = er(e),
		o = jh(e, n).reverse(),
		f = o.indexOf(s),
		h = o.slice(f + 1);
	return h.find(yu) || (r ? o.find(yu) : null) || (u ? h[0] : null) || null;
}
function G0(e, n) {
	return eN(document.body, !1, e, n);
}
function tN(e) {
	for (; e && !li(e); ) e = e.closest(Po);
	return e || null;
}
function da(e) {
	const n = er(e);
	if (!n) return !1;
	if (n === e) return !0;
	const r = n.getAttribute("aria-activedescendant");
	return r ? r === e.id : !1;
}
function Or(e) {
	const n = er(e);
	if (!n) return !1;
	if (Pt(e, n)) return !0;
	const r = n.getAttribute("aria-activedescendant");
	return !r || !("id" in e) ? !1 : r === e.id ? !0 : !!e.querySelector(`#${CSS.escape(r)}`);
}
function Hb(e) {
	!Or(e) && li(e) && e.focus();
}
function nN(e) {
	var n;
	const r = (n = e.getAttribute("tabindex")) != null ? n : "";
	(e.setAttribute("data-tabindex", r), e.setAttribute("tabindex", "-1"));
}
function iN(e, n) {
	const r = Qo(e, n);
	for (const u of r) nN(u);
}
function rN(e) {
	const n = e.querySelectorAll("[data-tabindex]"),
		r = (u) => {
			const s = u.getAttribute("data-tabindex");
			(u.removeAttribute("data-tabindex"), s ? u.setAttribute("tabindex", s) : u.removeAttribute("tabindex"));
		};
	e.hasAttribute("data-tabindex") && r(e);
	for (const u of n) r(u);
}
function aN(e, n) {
	"scrollIntoView" in e
		? (e.focus({ preventScroll: !0 }), e.scrollIntoView({ block: "nearest", inline: "nearest", ...n }))
		: e.focus();
}
var uN = "div",
	F0 = Vo(),
	lN = [
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
	Pb = Symbol("safariFocusAncestor");
function sN(e) {
	return e ? !!e[Pb] : !1;
}
function X0(e, n) {
	e && (e[Pb] = n);
}
function oN(e) {
	const { tagName: n, readOnly: r, type: u } = e;
	return (n === "TEXTAREA" && !r) || (n === "SELECT" && !r)
		? !0
		: n === "INPUT" && !r
			? lN.includes(u)
			: !!(e.isContentEditable || (e.getAttribute("role") === "combobox" && e.dataset.name));
}
function cN(e) {
	return "labels" in e ? e.labels : null;
}
function J0(e) {
	return e.tagName.toLowerCase() === "input" && e.type ? e.type === "radio" || e.type === "checkbox" : !1;
}
function fN(e) {
	return e ? e === "button" || e === "summary" || e === "input" || e === "select" || e === "textarea" || e === "a" : !0;
}
function dN(e) {
	return e ? e === "button" || e === "input" || e === "select" || e === "textarea" : !0;
}
function hN(e, n, r, u, s) {
	return e ? (n ? (r && !u ? -1 : void 0) : r ? s : s || 0) : s;
}
function Ad(e, n) {
	return Ce((r) => {
		(e?.(r), !r.defaultPrevented && n && (r.stopPropagation(), r.preventDefault()));
	});
}
var W0 = !1,
	Lh = !0;
function mN(e) {
	const n = e.target;
	n && "hasAttribute" in n && (n.hasAttribute("data-focus-visible") || (Lh = !1));
}
function vN(e) {
	e.metaKey || e.ctrlKey || e.altKey || (Lh = !0);
}
var Nl = Ge(function ({ focusable: n = !0, accessibleWhenDisabled: r, autoFocus: u, onFocusVisible: s, ...o }) {
		const f = (0, w.useRef)(null);
		((0, w.useEffect)(() => {
			n && (W0 || (on("mousedown", mN, !0), on("keydown", vN, !0), (W0 = !0)));
		}, [n]),
			F0 &&
				(0, w.useEffect)(() => {
					if (!n) return;
					const K = f.current;
					if (!K || !J0(K)) return;
					const ue = cN(K);
					if (!ue) return;
					const R = () => queueMicrotask(() => K.focus());
					for (const $ of ue) $.addEventListener("mouseup", R);
					return () => {
						for (const $ of ue) $.removeEventListener("mouseup", R);
					};
				}, [n]));
		const h = n && Al(o),
			m = !!h && !r,
			[v, g] = (0, w.useState)(!1);
		((0, w.useEffect)(() => {
			n && m && v && g(!1);
		}, [n, m, v]),
			(0, w.useEffect)(() => {
				if (!n || !v) return;
				const K = f.current;
				if (!K || typeof IntersectionObserver > "u") return;
				const ue = new IntersectionObserver(() => {
					li(K) || g(!1);
				});
				return (ue.observe(K), () => ue.disconnect());
			}, [n, v]));
		const _ = Ad(o.onKeyPressCapture, h),
			b = Ad(o.onMouseDownCapture, h),
			p = Ad(o.onClickCapture, h),
			E = o.onMouseDown,
			x = Ce((K) => {
				if ((E?.(K), K.defaultPrevented || !n)) return;
				const ue = K.currentTarget;
				if (!F0 || Lb(K) || (!Nr(ue) && !J0(ue))) return;
				let R = !1;
				const $ = () => {
					R = !0;
				};
				ue.addEventListener("focusin", $, { capture: !0, once: !0 });
				const P = tN(ue.parentElement);
				(X0(P, !0),
					cu(ue, "mouseup", () => {
						(ue.removeEventListener("focusin", $, !0), X0(P, !1), !R && Hb(ue));
					}));
			}),
			O = (K, ue) => {
				if ((ue && (K.currentTarget = ue), !n)) return;
				const R = K.currentTarget;
				R && da(R) && (s?.(K), !K.defaultPrevented && ((R.dataset.focusVisible = "true"), g(!0)));
			},
			z = o.onKeyDownCapture,
			D = Ce((K) => {
				if ((z?.(K), K.defaultPrevented || !n || v || K.metaKey || K.altKey || K.ctrlKey || !Ln(K))) return;
				const ue = K.currentTarget;
				cu(ue, "focusout", () => O(K, ue));
			}),
			A = o.onFocusCapture,
			C = Ce((K) => {
				if ((A?.(K), K.defaultPrevented || !n)) return;
				if (!Ln(K)) {
					g(!1);
					return;
				}
				const ue = K.currentTarget,
					R = () => O(K, ue);
				Lh || oN(K.target) ? cu(K.target, "focusout", R) : g(!1);
			}),
			k = o.onBlur,
			F = Ce((K) => {
				(k?.(K), n && ua(K) && (K.currentTarget.removeAttribute("data-focus-visible"), g(!1)));
			}),
			Q = (0, w.useContext)(Zb),
			j = Ce((K) => {
				n &&
					u &&
					K &&
					Q &&
					queueMicrotask(() => {
						da(K) || (li(K) && K.focus());
					});
			}),
			q = Bb(f),
			G = n && fN(q),
			B = n && dN(q),
			se = o.style,
			ee = (0, w.useMemo)(() => (m ? { pointerEvents: "none", ...se } : se), [m, se]);
		return (
			(o = {
				"data-focus-visible": (n && v) || void 0,
				"data-autofocus": u || void 0,
				"aria-disabled": h || void 0,
				...o,
				ref: Dt(f, j, o.ref),
				style: ee,
				tabIndex: hN(n, m, G, B, o.tabIndex),
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
	Dz = Ie(function (n) {
		return Qe(uN, Nl(n));
	});
function Qb(e) {
	const n = [];
	for (const r of e) n.push(...r);
	return n;
}
function ih(e) {
	return e.slice().reverse();
}
var gN = "div";
function yN(e) {
	return e.some((n) => !!n.rowId);
}
function pN(e) {
	const n = e.target;
	return n && !Si(n) ? !1 : e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
function bN(e) {
	return e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta";
}
function ep(e, n, r) {
	return Ce((u) => {
		var s;
		if ((n?.(u), u.defaultPrevented || u.isPropagationStopped() || !Ln(u) || bN(u) || pN(u))) return;
		const o = (s = Rr(e, e.getState().activeId)) == null ? void 0 : s.element;
		if (!o) return;
		const { view: f, ...h } = u;
		(o !== r?.current && o.focus(),
			LO(o, u.type, h) || u.preventDefault(),
			u.currentTarget.contains(o) && u.stopPropagation());
	});
}
function _N(e) {
	return _O(Qb(ih(SO(e))));
}
function SN(e) {
	const [n, r] = (0, w.useState)(!1),
		u = (0, w.useCallback)(() => r(!0), []),
		s = e.useState((o) => Rr(e, o.activeId));
	return (
		(0, w.useEffect)(() => {
			const o = s?.element;
			n && o && (r(!1), o.focus({ preventScroll: !0 }));
		}, [s, n]),
		u
	);
}
var qh = Ge(function ({ store: n, composite: r = !0, focusOnMove: u = r, moveOnKeyPress: s = !0, ...o }) {
		const f = YO();
		((n = n || f), Qt(n, !1));
		const h = (0, w.useRef)(null),
			m = (0, w.useRef)(null),
			v = SN(n),
			g = n.useState("moves"),
			[, _] = UO(r ? n.setBaseElement : null);
		((0, w.useEffect)(() => {
			var q;
			if (!n || !g || !r || !u) return;
			const { activeId: G } = n.getState(),
				B = (q = Rr(n, G)) == null ? void 0 : q.element;
			B && aN(B);
		}, [n, g, r, u]),
			Pe(() => {
				if (!n || !g || !r) return;
				const { baseElement: q, activeId: G } = n.getState();
				if (G !== null || !q) return;
				const B = m.current;
				((m.current = null), B && nu(B, { relatedTarget: q }), da(q) || q.focus());
			}, [n, g, r]));
		const b = n.useState("activeId"),
			p = n.useState("virtualFocus");
		Pe(() => {
			var q;
			if (!n || !r || !p) return;
			const G = m.current;
			if (((m.current = null), !G)) return;
			const B = ((q = Rr(n, b)) == null ? void 0 : q.element) || er(G);
			B !== G && nu(G, { relatedTarget: B });
		}, [n, b, p, r]);
		const E = ep(n, o.onKeyDownCapture, m),
			x = ep(n, o.onKeyUpCapture, m),
			O = o.onFocusCapture,
			z = Ce((q) => {
				if ((O?.(q), q.defaultPrevented || !n)) return;
				const { virtualFocus: G } = n.getState();
				if (!G) return;
				const B = q.relatedTarget,
					se = TO(q.currentTarget);
				Ln(q) && se && (q.stopPropagation(), (m.current = B));
			}),
			D = o.onFocus,
			A = Ce((q) => {
				if ((D?.(q), q.defaultPrevented || !r || !n)) return;
				const { relatedTarget: G } = q,
					{ virtualFocus: B } = n.getState();
				B ? Ln(q) && !vl(n, G) && queueMicrotask(v) : Ln(q) && n.setActiveId(null);
			}),
			C = o.onBlurCapture,
			k = Ce((q) => {
				var G;
				if ((C?.(q), q.defaultPrevented || !n)) return;
				const { virtualFocus: B, activeId: se } = n.getState();
				if (!B) return;
				const ee = (G = Rr(n, se)) == null ? void 0 : G.element,
					K = q.relatedTarget,
					ue = vl(n, K),
					R = m.current;
				((m.current = null),
					Ln(q) && ue
						? (K === ee ? R && R !== K && nu(R, q) : ee ? nu(ee, q) : R && nu(R, q), q.stopPropagation())
						: !vl(n, q.target) && ee && nu(ee, q));
			}),
			F = o.onKeyDown,
			Q = vt(s),
			j = Ce((q) => {
				var G;
				if ((F?.(q), q.nativeEvent.isComposing || q.defaultPrevented || !n || !Ln(q))) return;
				const { orientation: B, renderedItems: se, activeId: ee } = n.getState(),
					K = Rr(n, ee);
				if ((G = K?.element) != null && G.isConnected) return;
				const ue = B !== "horizontal",
					R = B !== "vertical",
					$ = yN(se);
				if (
					(q.key === "ArrowLeft" || q.key === "ArrowRight" || q.key === "Home" || q.key === "End") &&
					Si(q.currentTarget)
				)
					return;
				const le = {
					ArrowUp:
						($ || ue) &&
						(() => {
							if ($) {
								const me = _N(se);
								return me?.id;
							}
							return n?.last();
						}),
					ArrowRight: ($ || R) && n.first,
					ArrowDown: ($ || ue) && n.first,
					ArrowLeft: ($ || R) && n.last,
					Home: n.first,
					End: n.last,
					PageUp: n.first,
					PageDown: n.last,
				}[q.key];
				if (le) {
					const me = le();
					if (me !== void 0) {
						if (!Q(q)) return;
						(q.preventDefault(), n.move(me));
					}
				}
			});
		return (
			(o = cn(o, (q) => (0, S.jsx)(Ol, { value: n, children: q }), [n])),
			(o = {
				"aria-activedescendant": n.useState((q) => {
					var G;
					if (n && r && q.virtualFocus) return (G = Rr(n, q.activeId)) == null ? void 0 : G.id;
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
			(o = Nl({ focusable: n.useState((q) => r && (q.virtualFocus || q.activeId === null)), ...o })),
			o
		);
	}),
	jz = Ie(function (n) {
		return Qe(gN, qh(n));
	}),
	kl = wi(),
	Lz = kl.useContext,
	qz = kl.useScopedContext,
	Uh = kl.useProviderContext,
	wN = kl.ContextProvider,
	EN = kl.ScopedContextProvider,
	Ml = wi([wN], [EN]),
	Uz = Ml.useContext,
	$z = Ml.useScopedContext,
	Ko = Ml.useProviderContext,
	TN = Ml.ContextProvider,
	$h = Ml.ScopedContextProvider,
	xN = (0, w.createContext)(void 0),
	AN = (0, w.createContext)(void 0),
	zl = wi([TN], [$h]),
	Bz = zl.useContext,
	Iz = zl.useScopedContext,
	Yo = zl.useProviderContext,
	Kb = zl.ContextProvider,
	Go = zl.ScopedContextProvider,
	CN = "div",
	Bh = Ge(function ({ store: n, ...r }) {
		const u = Yo();
		return ((n = n || u), (r = { ...r, ref: Dt(n?.setAnchorElement, r.ref) }), r);
	}),
	Vz = Ie(function (n) {
		return Qe(CN, Bh(n));
	}),
	Yb = (0, w.createContext)(void 0),
	Dl = wi([Kb, Ol], [Go, Ho]),
	RN = Dl.useContext,
	Gb = Dl.useScopedContext,
	Fo = Dl.useProviderContext,
	Zz = Dl.ContextProvider,
	ON = Dl.ScopedContextProvider,
	NN = (0, w.createContext)(void 0),
	kN = (0, w.createContext)(!1);
function pa(e, n) {
	const r = e.__unstableInternals;
	return (Qt(r, "Invalid store"), r[n]);
}
function si(e, ...n) {
	let r = e,
		u = r,
		s = Symbol(),
		o = gl;
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
			const B = OO(r).map((K) =>
					An(
						...n.map((ue) => {
							var R;
							const $ = (R = ue?.getState) == null ? void 0 : R.call(ue);
							if ($ && Wi($, K))
								return dn(ue, [K], (P) => {
									F(K, P[K], !0);
								});
						}),
					),
				),
				se = [];
			for (const K of m) se.push(K());
			const ee = n.map(Ih);
			return ((o = An(...B, ...se, ...ee)), G);
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
		A = (j) => si(RO(r, j), Q),
		C = (j) => si(CO(r, j), Q),
		k = () => r,
		F = (j, q, G = !1) => {
			var B;
			if (!Wi(r, j)) return;
			const se = Mb(q, r[j]);
			if (se === r[j]) return;
			if (!G) for (const R of n) (B = R?.setState) == null || B.call(R, j, se);
			const ee = r;
			r = { ...r, [j]: se };
			const K = Symbol();
			((s = K), h.add(j));
			const ue = (R, $, P) => {
				var le;
				const me = b.get(R),
					Re = (N) => (P ? P.has(N) : N === j);
				(!me || me.some(Re)) && ((le = _.get(R)) == null || le(), _.set(R, R(r, $)));
			};
			for (const R of v) ue(R, ee);
			queueMicrotask(() => {
				if (s !== K) return;
				const R = r;
				for (const $ of g) ue($, u, h);
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
function vn(e, ...n) {
	if (e) return pa(e, "setup")(...n);
}
function Ih(e, ...n) {
	if (e) return pa(e, "init")(...n);
}
function Vh(e, ...n) {
	if (e) return pa(e, "subscribe")(...n);
}
function dn(e, ...n) {
	if (e) return pa(e, "sync")(...n);
}
function Ro(e, ...n) {
	if (e) return pa(e, "batch")(...n);
}
function Zh(e, ...n) {
	if (e) return pa(e, "omit")(...n);
}
function Fb(e, ...n) {
	if (e) return pa(e, "pick")(...n);
}
function Xo(...e) {
	var n;
	const r = {};
	for (const s of e) {
		const o = (n = s?.getState) == null ? void 0 : n.call(s);
		o && Object.assign(r, o);
	}
	const u = si(r, ...e);
	return Object.assign({}, ...e, u);
}
var MN = "input";
function tp(e, n, r) {
	if (!r) return !1;
	const u = e.find((s) => !s.disabled && s.value);
	return u?.value === n;
}
function np(e, n) {
	return !n || e == null ? !1 : ((e = zb(e)), n.length > e.length && n.toLowerCase().indexOf(e.toLowerCase()) === 0);
}
function zN(e) {
	return e.type === "input";
}
function DN(e) {
	return e === "inline" || e === "list" || e === "both" || e === "none";
}
function jN(e) {
	const n = e.find((r) => {
		var u;
		return r.disabled ? !1 : ((u = r.element) == null ? void 0 : u.getAttribute("role")) !== "tab";
	});
	return n?.id;
}
var LN = Ge(function ({
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
		const z = Fo();
		((n = n || z), Qt(n, !1));
		const D = (0, w.useRef)(null),
			[A, C] = Ib(),
			k = (0, w.useRef)(!1),
			F = (0, w.useRef)(!1),
			Q = n.useState((ae) => ae.virtualFocus && u),
			j = x === "inline" || x === "both",
			[q, G] = (0, w.useState)(j);
		BO(() => {
			j && G(!0);
		}, [j]);
		const B = n.useState("value"),
			se = (0, w.useRef)();
		(0, w.useEffect)(
			() =>
				dn(n, ["selectedValue", "activeId"], (ae, Ae) => {
					se.current = Ae.selectedValue;
				}),
			[],
		);
		const ee = n.useState((ae) => {
				var Ae;
				if (
					j &&
					q &&
					!(
						ae.activeValue &&
						Array.isArray(ae.selectedValue) &&
						(ae.selectedValue.includes(ae.activeValue) || ((Ae = se.current) != null && Ae.includes(ae.activeValue)))
					)
				)
					return ae.activeValue;
			}),
			K = n.useState("renderedItems"),
			ue = n.useState("open"),
			R = n.useState("contentElement"),
			$ = (0, w.useMemo)(() => {
				if (!j || !q) return B;
				if (tp(K, ee, Q)) {
					if (np(B, ee)) {
						const ae = ee?.slice(B.length) || "";
						return B + ae;
					}
					return B;
				}
				return ee || B;
			}, [j, q, K, ee, Q, B]);
		((0, w.useEffect)(() => {
			const ae = D.current;
			if (!ae) return;
			const Ae = () => G(!0);
			return (
				ae.addEventListener("combobox-item-move", Ae),
				() => {
					ae.removeEventListener("combobox-item-move", Ae);
				}
			);
		}, []),
			(0, w.useEffect)(() => {
				if (!j || !q || !ee || !tp(K, ee, Q) || !np(B, ee)) return;
				let ae = gl;
				return (
					queueMicrotask(() => {
						const Ae = D.current;
						if (!Ae) return;
						const { start: lt, end: Oe } = eh(Ae),
							pt = B.length,
							Ft = ee.length;
						(Td(Ae, pt, Ft),
							(ae = () => {
								if (!da(Ae)) return;
								const { start: st, end: Xt } = eh(Ae);
								st === pt && Xt === Ft && Td(Ae, lt, Oe);
							}));
					}),
					() => ae()
				);
			}, [A, j, q, ee, K, Q, B]));
		const P = (0, w.useRef)(null),
			le = Ce(s),
			me = (0, w.useRef)(null);
		((0, w.useEffect)(() => {
			if (!ue || !R) return;
			const ae = Rh(R);
			if (!ae) return;
			P.current = ae;
			const Ae = () => {
					k.current = !1;
				},
				lt = () => {
					if (!n || !k.current) return;
					const { activeId: pt } = n.getState();
					pt !== null && pt !== me.current && (k.current = !1);
				},
				Oe = { passive: !0, capture: !0 };
			return (
				ae.addEventListener("wheel", Ae, Oe),
				ae.addEventListener("touchmove", Ae, Oe),
				ae.addEventListener("scroll", lt, Oe),
				() => {
					(ae.removeEventListener("wheel", Ae, !0),
						ae.removeEventListener("touchmove", Ae, !0),
						ae.removeEventListener("scroll", lt, !0));
				}
			);
		}, [ue, R, n]),
			Pe(() => {
				B && (F.current || (k.current = !0));
			}, [B]),
			Pe(() => {
				(Q !== "always" && ue) || (k.current = ue);
			}, [Q, ue]));
		const Re = n.useState("resetValueOnSelect");
		(Su(() => {
			var ae, Ae;
			const lt = k.current;
			if (!n || !ue || (!lt && !Re)) return;
			const { baseElement: Oe, contentElement: pt, activeId: Ft } = n.getState();
			if (!(Oe && !da(Oe))) {
				if (pt?.hasAttribute("data-placing")) {
					const st = new MutationObserver(C);
					return (st.observe(pt, { attributeFilter: ["data-placing"] }), () => st.disconnect());
				}
				if (Q && lt) {
					const st = le(K),
						Xt = st !== void 0 ? st : (ae = jN(K)) != null ? ae : n.first();
					((me.current = Xt), n.move(Xt ?? null));
				} else {
					const st = (Ae = n.item(Ft || n.first())) == null ? void 0 : Ae.element;
					st && "scrollIntoView" in st && st.scrollIntoView({ block: "nearest", inline: "nearest" });
				}
			}
		}, [n, ue, A, B, Q, Re, le, K]),
			(0, w.useEffect)(() => {
				if (!j) return;
				const ae = D.current;
				if (!ae) return;
				const Ae = [ae, R].filter((Oe) => !!Oe),
					lt = (Oe) => {
						Ae.every((pt) => ua(Oe, pt)) && n?.setValue($);
					};
				for (const Oe of Ae) Oe.addEventListener("focusout", lt);
				return () => {
					for (const Oe of Ae) Oe.removeEventListener("focusout", lt);
				};
			}, [j, R, n, $]));
		const N = (ae) => ae.currentTarget.value.length >= f,
			X = O.onChange,
			re = vt(h ?? N),
			fe = vt(o ?? !n.tag),
			ge = Ce((ae) => {
				if ((X?.(ae), ae.defaultPrevented || !n)) return;
				const Ae = ae.currentTarget,
					{ value: lt, selectionStart: Oe, selectionEnd: pt } = Ae,
					Ft = ae.nativeEvent;
				if (((k.current = !0), zN(Ft) && (Ft.isComposing && ((k.current = !1), (F.current = !0)), j))) {
					const st = Ft.inputType === "insertText" || Ft.inputType === "insertCompositionText",
						Xt = Oe === lt.length;
					G(st && Xt);
				}
				if (fe(ae)) {
					const st = lt === n.getState().value;
					(n.setValue(lt),
						queueMicrotask(() => {
							Td(Ae, Oe, pt);
						}),
						j && Q && st && C());
				}
				(re(ae) && n.show(), (!Q || !k.current) && n.setActiveId(null));
			}),
			be = O.onCompositionEnd,
			Se = Ce((ae) => {
				((k.current = !0), (F.current = !1), be?.(ae), !ae.defaultPrevented && Q && C());
			}),
			Fe = O.onMouseDown,
			De = vt(b ?? (() => !!n?.getState().includesBaseElement)),
			Ke = vt(p),
			Et = vt(v ?? N),
			Tt = Ce((ae) => {
				(Fe?.(ae),
					!ae.defaultPrevented &&
						(ae.button ||
							ae.ctrlKey ||
							(n &&
								(De(ae) && n.setActiveId(null),
								Ke(ae) && n.setValue($),
								Et(ae) && cu(ae.currentTarget, "mouseup", n.show)))));
			}),
			Kt = O.onKeyDown,
			Be = vt(_ ?? N),
			ce = Ce((ae) => {
				if (
					(Kt?.(ae),
					ae.repeat || (k.current = !1),
					ae.defaultPrevented || ae.ctrlKey || ae.altKey || ae.shiftKey || ae.metaKey || !n)
				)
					return;
				const { open: Ae } = n.getState();
				Ae || ((ae.key === "ArrowUp" || ae.key === "ArrowDown") && Be(ae) && (ae.preventDefault(), n.show()));
			}),
			Ee = O.onBlur,
			Ye = Ce((ae) => {
				((k.current = !1), Ee?.(ae), ae.defaultPrevented);
			}),
			ze = tr(O.id),
			yt = DN(x) ? x : void 0,
			rt = n.useState((ae) => ae.activeId === null);
		return (
			(O = {
				id: ze,
				role: "combobox",
				"aria-autocomplete": yt,
				"aria-haspopup": Bo(R, "listbox"),
				"aria-expanded": ue,
				"aria-controls": R?.id,
				"data-active-item": rt || void 0,
				value: $,
				...O,
				ref: Dt(D, O.ref),
				onChange: ge,
				onCompositionEnd: Se,
				onMouseDown: Tt,
				onKeyDown: ce,
				onBlur: Ye,
			}),
			(O = qh({ store: n, focusable: r, ...O, moveOnKeyPress: (ae) => (Io(E, ae) ? !1 : (j && G(!0), !0)) })),
			(O = Bh({ store: n, ...O })),
			{ autoComplete: "off", ...O }
		);
	}),
	qN = Ie(function (n) {
		return Qe(MN, LN(n));
	}),
	UN = "button";
function ip(e) {
	if (!e.isTrusted) return !1;
	const n = e.currentTarget;
	return e.key === "Enter"
		? Nr(n) || n.tagName === "SUMMARY" || n.tagName === "A"
		: e.key === " "
			? Nr(n) || n.tagName === "SUMMARY" || n.tagName === "INPUT" || n.tagName === "SELECT"
			: !1;
}
var $N = Symbol("command"),
	Hh = Ge(function ({ clickOnEnter: n = !0, clickOnSpace: r = !0, ...u }) {
		const s = (0, w.useRef)(null),
			[o, f] = (0, w.useState)(!1);
		(0, w.useEffect)(() => {
			s.current && f(Nr(s.current));
		}, []);
		const [h, m] = (0, w.useState)(!1),
			v = (0, w.useRef)(!1),
			g = Al(u),
			[_, b] = Vb(u, $N, !0),
			p = u.onKeyDown,
			E = Ce((z) => {
				p?.(z);
				const D = z.currentTarget;
				if (z.defaultPrevented || _ || g || !Ln(z) || Si(D) || D.isContentEditable) return;
				const A = n && z.key === "Enter",
					C = r && z.key === " ",
					k = z.key === "Enter" && !n,
					F = z.key === " " && !r;
				if (k || F) {
					z.preventDefault();
					return;
				}
				if (A || C) {
					const Q = ip(z);
					if (A) {
						if (!Q) {
							z.preventDefault();
							const { view: j, ...q } = z,
								G = () => Z0(D, q);
							zO() ? cu(D, "keyup", G) : queueMicrotask(G);
						}
					} else C && ((v.current = !0), Q || (z.preventDefault(), m(!0)));
				}
			}),
			x = u.onKeyUp,
			O = Ce((z) => {
				if ((x?.(z), z.defaultPrevented || _ || g || z.metaKey)) return;
				const D = r && z.key === " ";
				if (v.current && D && ((v.current = !1), !ip(z))) {
					(z.preventDefault(), m(!1));
					const A = z.currentTarget,
						{ view: C, ...k } = z;
					queueMicrotask(() => Z0(A, k));
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
			(u = Nl(u)),
			u
		);
	}),
	Hz = Ie(function (n) {
		return Qe(UN, Hh(n));
	}),
	Xb = "button",
	Jb = Ge(function (n) {
		const r = (0, w.useRef)(null),
			u = Bb(r, Xb),
			[s, o] = (0, w.useState)(() => !!u && Nr({ tagName: u, type: n.type }));
		return (
			(0, w.useEffect)(() => {
				r.current && o(Nr(r.current));
			}, []),
			(n = { role: !s && u !== "a" ? "button" : void 0, ...n, ref: Dt(r, n.ref) }),
			(n = Hh(n)),
			n
		);
	}),
	Pz = Ie(function (n) {
		return Qe(Xb, Jb(n));
	}),
	BN = "button",
	IN = Symbol("disclosure"),
	Wb = Ge(function ({ store: n, toggleOnClick: r = !0, ...u }) {
		const s = Uh();
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
			_ = vt(r),
			[b, p] = Vb(u, IN, !0),
			E = Ce((O) => {
				(g?.(O), !O.defaultPrevented && (b || (_(O) && (n?.setDisclosureElement(O.currentTarget), n?.toggle()))));
			}),
			x = n.useState("contentElement");
		return (
			(u = { "aria-expanded": f, "aria-controls": x?.id, ...p, ...u, ref: Dt(o, u.ref), onClick: E }),
			(u = Jb(u)),
			u
		);
	}),
	Qz = Ie(function (n) {
		return Qe(BN, Wb(n));
	}),
	VN = "button",
	e_ = Ge(function ({ store: n, ...r }) {
		const u = Ko();
		return (
			(n = n || u),
			Qt(n, !1),
			(r = { "aria-haspopup": Bo(n.useState("contentElement"), "dialog"), ...r }),
			(r = Wb({ store: n, ...r })),
			r
		);
	}),
	Kz = Ie(function (n) {
		return Qe(VN, e_(n));
	}),
	ZN = "div";
function t_(e) {
	const n = e.relatedTarget;
	return n?.nodeType === Node.ELEMENT_NODE ? n : null;
}
function HN(e) {
	const n = t_(e);
	return n ? Pt(e.currentTarget, n) : !1;
}
var rh = Symbol("composite-hover");
function PN(e) {
	let n = t_(e);
	if (!n) return !1;
	do {
		if (Wi(n, rh) && n[rh]) return !0;
		n = n.parentElement;
	} while (n);
	return !1;
}
var Ph = Ge(function ({ store: n, focusOnHover: r = !0, blurOnHoverEnd: u = !!r, ...s }) {
		const o = Dh();
		((n = n || o), Qt(n, !1));
		const f = Mh(),
			h = s.onMouseMove,
			m = vt(r),
			v = Ce((E) => {
				if ((h?.(E), !E.defaultPrevented && f() && m(E))) {
					if (!Or(E.currentTarget)) {
						const x = n?.getState().baseElement;
						x && !da(x) && x.focus();
					}
					n?.setActiveId(E.currentTarget.id);
				}
			}),
			g = s.onMouseLeave,
			_ = vt(u),
			b = Ce((E) => {
				var x;
				(g?.(E),
					!E.defaultPrevented &&
						f() &&
						(HN(E) ||
							PN(E) ||
							(m(E) && _(E) && (n?.setActiveId(null), (x = n?.getState().baseElement) == null || x.focus()))));
			}),
			p = (0, w.useCallback)((E) => {
				E && (E[rh] = !0);
			}, []);
		return ((s = { ...s, ref: Dt(p, s.ref), onMouseMove: v, onMouseLeave: b }), ya(s));
	}),
	Yz = Zo(
		Ie(function (n) {
			return Qe(ZN, Ph(n));
		}),
	),
	QN = "div",
	n_ = Ge(function ({ store: n, shouldRegisterItem: r = !0, getItem: u = Db, element: s, ...o }) {
		const f = PO();
		n = n || f;
		const h = tr(o.id),
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
	Gz = Ie(function (n) {
		return Qe(QN, n_(n));
	}),
	KN = Jn((e) => {
		var n = jo();
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
	YN = Jn((e, n) => {
		n.exports = KN();
	}),
	GN = Mp(YN(), 1),
	{ useSyncExternalStore: i_ } = GN.default,
	r_ = () => () => {};
function Zt(e, n = Db) {
	const r = w.useCallback((s) => (e ? Vh(e, null, s) : r_()), [e]),
		u = () => {
			const s = typeof n == "string" ? n : null,
				o = typeof n == "function" ? n : null,
				f = e?.getState();
			if (o) return o(f);
			if (f && s && Wi(f, s)) return f[s];
		};
	return i_(r, u, u);
}
function a_(e, n) {
	const r = w.useRef({}),
		u = w.useCallback((o) => (e ? Vh(e, null, o) : r_()), [e]),
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
					if (!o || !Wi(o, v)) continue;
					const g = o[v];
					g !== h[m] && ((h[m] = g), (f = !0));
				}
			}
			return (f && (r.current = { ...h }), r.current);
		};
	return i_(u, s, s);
}
function zt(e, n, r, u) {
	const s = Wi(n, r) ? n[r] : void 0,
		o = $b({ value: s, setValue: u ? n[u] : void 0 });
	(Pe(
		() =>
			dn(e, [r], (f, h) => {
				const { value: m, setValue: v } = o.current;
				v && f[r] !== h[r] && f[r] !== m && v(f[r]);
			}),
		[e, r],
	),
		Pe(() => {
			if (s !== void 0)
				return (
					e.setState(r, s),
					Ro(e, [r], () => {
						s !== void 0 && e.setState(r, s);
					})
				);
		}));
}
function Jo(e, n) {
	const [r, u] = w.useState(() => e(n));
	Pe(() => Ih(r), [r]);
	const s = w.useCallback((o) => Zt(r, o), [r]);
	return [
		w.useMemo(() => ({ ...r, useState: s }), [r, s]),
		Ce(() => {
			u((o) => e({ ...n, ...o.getState() }));
		}),
	];
}
var FN = "button";
function XN(e) {
	return Wd(e) ? !0 : e.tagName === "INPUT" && !Nr(e);
}
function JN(e, n = !1) {
	const r = e.clientHeight,
		{ top: u } = e.getBoundingClientRect(),
		s = Math.max(r * 0.875, r - 40) * 1.5,
		o = n ? r - s + u : s + u;
	return e.tagName === "HTML" ? o + e.scrollTop : o;
}
function WN(e, n = !1) {
	const { top: r } = e.getBoundingClientRect();
	return n ? r + e.clientHeight : r;
}
function rp(e, n, r, u = !1) {
	var s;
	if (!n || !r) return;
	const { renderedItems: o } = n.getState(),
		f = Rh(e);
	if (!f) return;
	const h = JN(f, u);
	let m, v;
	for (let g = 0; g < o.length; g += 1) {
		const _ = m;
		if (((m = r(g)), !m)) break;
		if (m === _) continue;
		const b = (s = Rr(n, m)) == null ? void 0 : s.element;
		if (!b) continue;
		const p = WN(b, u) - h,
			E = Math.abs(p);
		if ((u && p <= 0) || (!u && p >= 0)) {
			v !== void 0 && v < E && (m = _);
			break;
		}
		v = E;
	}
	return m;
}
function ek(e, n) {
	return Ln(e) ? !1 : vl(n, e.target);
}
var Qh = Ge(function ({
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
		const g = Dh();
		n = n || g;
		const _ = tr(v.id),
			b = (0, w.useRef)(null),
			p = (0, w.useContext)(FO),
			E = Al(v) && !v.accessibleWhenDisabled,
			{
				rowId: x,
				baseElement: O,
				isActiveItem: z,
				ariaSetSize: D,
				ariaPosInSet: A,
				isTabbable: C,
			} = a_(n, {
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
					const $ = R.renderedItems.filter((P) => P.rowId === x);
					return p.ariaPosInSet + $.findIndex((P) => P.id === _);
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
					const P = {
						...R,
						id: _ || R.id,
						rowId: x,
						disabled: !!E,
						children: ($ = R.element) == null ? void 0 : $.textContent,
					};
					return f ? f(P) : P;
				},
				[_, x, E, f],
			),
			F = v.onFocus,
			Q = (0, w.useRef)(!1),
			j = Ce((R) => {
				if ((F?.(R), R.defaultPrevented || Lb(R) || !_ || !n || ek(R, n))) return;
				const { virtualFocus: $, baseElement: P } = n.getState();
				(n.setActiveId(_),
					Wd(R.currentTarget) && wO(R.currentTarget),
					$ &&
						Ln(R) &&
						(XN(R.currentTarget) ||
							(P?.isConnected &&
								(Vo() &&
									R.currentTarget.hasAttribute("data-autofocus") &&
									R.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" }),
								(Q.current = !0),
								R.relatedTarget === P || vl(n, R.relatedTarget) ? EO(P) : P.focus()))));
			}),
			q = v.onBlurCapture,
			G = Ce((R) => {
				if ((q?.(R), R.defaultPrevented)) return;
				const $ = n?.getState();
				$?.virtualFocus && Q.current && ((Q.current = !1), R.preventDefault(), R.stopPropagation());
			}),
			B = v.onKeyDown,
			se = vt(u),
			ee = vt(s),
			K = Ce((R) => {
				if ((B?.(R), R.defaultPrevented || !Ln(R) || !n)) return;
				const { currentTarget: $ } = R,
					P = n.getState(),
					le = n.item(_),
					me = !!le?.rowId,
					Re = P.orientation !== "horizontal",
					N = P.orientation !== "vertical",
					X = () => !!(me || N || !P.baseElement || !Si(P.baseElement)),
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
						PageUp: () => rp($, n, n?.up, !0),
						PageDown: () => rp($, n, n?.down),
					}[R.key];
				if (re) {
					if (Wd($)) {
						const ge = eh($),
							be = N && R.key === "ArrowLeft",
							Se = N && R.key === "ArrowRight",
							Fe = Re && R.key === "ArrowUp",
							De = Re && R.key === "ArrowDown";
						if (Se || De) {
							const { length: Ke } = gO($);
							if (ge.end !== Ke) return;
						} else if ((be || Fe) && ge.start !== 0) return;
					}
					const fe = re();
					if (se(R) || fe !== void 0) {
						if (!ee(R)) return;
						(R.preventDefault(), n.move(fe));
					}
				}
			}),
			ue = (0, w.useMemo)(() => ({ id: _, baseElement: O }), [_, O]);
		return (
			(v = cn(v, (R) => (0, S.jsx)(GO.Provider, { value: ue, children: R }), [ue])),
			(v = {
				id: _,
				"data-active-item": z || void 0,
				...v,
				ref: Dt(b, v.ref),
				tabIndex: C ? v.tabIndex : -1,
				onFocus: j,
				onBlurCapture: G,
				onKeyDown: K,
			}),
			(v = Hh(v)),
			(v = n_({ store: n, ...v, getItem: k, shouldRegisterItem: _ ? v.shouldRegisterItem : !1 })),
			ya({ ...v, "aria-setsize": D, "aria-posinset": A })
		);
	}),
	Fz = Zo(
		Ie(function (n) {
			return Qe(FN, Qh(n));
		}),
	),
	tk = "div";
function nk(e, n) {
	if (n != null) return e == null ? !1 : Array.isArray(e) ? e.includes(n) : e === n;
}
function ik(e) {
	var n;
	return (n = { menu: "menuitem", listbox: "option", tree: "treeitem" }[e]) != null ? n : "option";
}
var rk = Ge(function ({
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
		const b = Gb();
		((n = n || b), Qt(n, !1));
		const {
				resetValueOnSelectState: p,
				multiSelectable: E,
				selected: x,
			} = a_(n, {
				resetValueOnSelectState: "resetValueOnSelect",
				multiSelectable(G) {
					return Array.isArray(G.selectedValue);
				},
				selected(G) {
					return nk(G.selectedValue, r);
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
			D = vt(s),
			A = vt(o),
			C = vt((_ = f ?? p) != null ? _ : E),
			k = vt(u),
			F = Ce((G) => {
				(z?.(G),
					!G.defaultPrevented &&
						(Ub(G) ||
							qb(G) ||
							(r != null &&
								(A(G) &&
									(C(G) && n?.resetValue(),
									n?.setSelectedValue((B) =>
										Array.isArray(B) ? (B.includes(r) ? B.filter((se) => se !== r) : [...B, r]) : r,
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
							(queueMicrotask(() => B.focus()), Si(B) && n?.setValue(B.value))));
			});
		(E && x != null && (g = { "aria-selected": x, ...g }),
			(g = cn(
				g,
				(G) =>
					(0, S.jsx)(NN.Provider, { value: r, children: (0, S.jsx)(kN.Provider, { value: x ?? !1, children: G }) }),
				[r, x],
			)),
			(g = { role: ik((0, w.useContext)(Yb)), children: r, ...g, onClick: F, onKeyDown: j }));
		const q = vt(m);
		return (
			(g = Qh({
				store: n,
				...g,
				getItem: O,
				moveOnKeyPress: (G) => {
					if (!q(G)) return !1;
					const B = new Event("combobox-item-move");
					return (n?.getState().baseElement?.dispatchEvent(B), !0);
				},
			})),
			(g = Ph({ store: n, focusOnHover: h, ...g })),
			g
		);
	}),
	ak = Zo(
		Ie(function (n) {
			return Qe(tk, rk(n));
		}),
	),
	Oo = Zp(),
	uk = "div";
function ap(e, n) {
	const r = setTimeout(n, e);
	return () => clearTimeout(r);
}
function lk(e) {
	let n = requestAnimationFrame(() => {
		n = requestAnimationFrame(e);
	});
	return () => cancelAnimationFrame(n);
}
function up(...e) {
	return e
		.join(", ")
		.split(", ")
		.reduce((n, r) => {
			const u = r.endsWith("ms") ? 1 : 1e3,
				s = Number.parseFloat(r || "0s") * u;
			return s > n ? s : n;
		}, 0);
}
function Wo(e, n, r) {
	return !r && n !== !1 && (!e || !!n);
}
var Kh = Ge(function ({ store: n, alwaysVisible: r, ...u }) {
		const s = Uh();
		((n = n || s), Qt(n, !1));
		const o = (0, w.useRef)(null),
			f = tr(u.id),
			[h, m] = (0, w.useState)(null),
			v = n.useState("open"),
			g = n.useState("mounted"),
			_ = n.useState("animated"),
			b = n.useState("contentElement"),
			p = Zt(n.disclosure, "contentElement");
		(Pe(() => {
			o.current && n?.setContentElement(o.current);
		}, [n]),
			Pe(() => {
				let z;
				return (
					n?.setState("animated", (D) => ((z = D), !0)),
					() => {
						z !== void 0 && n?.setState("animated", z);
					}
				);
			}, [n]),
			Pe(() => {
				if (_) {
					if (!b?.isConnected) {
						m(null);
						return;
					}
					return lk(() => {
						m(v ? "enter" : g ? "leave" : null);
					});
				}
			}, [_, b, v, g]),
			Pe(() => {
				if (!n || !_ || !h || !b) return;
				const z = () => n?.setState("animating", !1),
					D = () => (0, Oo.flushSync)(z);
				if ((h === "leave" && v) || (h === "enter" && !v)) return;
				if (typeof _ == "number") return ap(_, D);
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
					B = up(k, F, q, G) + up(A, C, Q, j);
				if (!B) {
					(h === "enter" && n.setState("animated", !1), z());
					return;
				}
				return ap(Math.max(B - 1e3 / 60, 0), D);
			}, [n, _, b, p, v, h]),
			(u = cn(u, (z) => (0, S.jsx)($h, { value: n, children: z }), [n])));
		const E = Wo(g, u.hidden, r),
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
	sk = Ie(function (n) {
		return Qe(uk, Kh(n));
	}),
	Xz = Ie(function ({ unmountOnHide: n, ...r }) {
		const u = Uh();
		return Zt(r.store || u, (s) => !n || s?.mounted) === !1 ? null : (0, S.jsx)(sk, { ...r });
	}),
	ok = "div",
	u_ = Ge(function ({ store: n, alwaysVisible: r, ...u }) {
		const s = Gb(!0),
			o = RN();
		n = n || o;
		const f = !!n && n === s;
		Qt(n, !1);
		const h = (0, w.useRef)(null),
			m = tr(u.id),
			v = n.useState("mounted"),
			g = Wo(v, u.hidden, r),
			_ = g ? { ...u.style, display: "none" } : u.style,
			b = n.useState((A) => Array.isArray(A.selectedValue)),
			p = $O(h, "role", u.role),
			E = ((p === "listbox" || p === "tree" || p === "grid") && b) || void 0,
			[x, O] = (0, w.useState)(!1),
			z = n.useState("contentElement");
		(Pe(() => {
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
			(u = cn(u, (A) => (0, S.jsx)(ON, { value: n, children: (0, S.jsx)(Yb.Provider, { value: p, children: A }) }), [
				n,
				p,
			])));
		const D = m && (!s || !f) ? n.setContentElement : null;
		return ((u = { id: m, hidden: g, ...u, ref: Dt(D, h, u.ref), style: _ }), ya(u));
	}),
	Jz = Ie(function (n) {
		return Qe(ok, u_(n));
	}),
	lp = (0, w.createContext)(null),
	ck = "span",
	l_ = Ge(function (n) {
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
	Wz = Ie(function (n) {
		return Qe(ck, l_(n));
	}),
	fk = "span",
	dk = Ge(function (n) {
		return (
			(n = {
				"data-focus-trap": "",
				tabIndex: 0,
				"aria-hidden": !0,
				...n,
				style: { position: "fixed", top: 0, left: 0, ...n.style },
			}),
			(n = l_(n)),
			n
		);
	}),
	so = Ie(function (n) {
		return Qe(fk, dk(n));
	}),
	hk = "div";
function mk(e) {
	return dt(e).body;
}
function vk(e, n) {
	return n ? (typeof n == "function" ? n(e) : n) : dt(e).createElement("div");
}
function gk(e = "id") {
	return `${e ? `${e}-` : ""}${Math.random().toString(36).slice(2, 8)}`;
}
function Ar(e) {
	queueMicrotask(() => {
		e?.focus();
	});
}
var s_ = Ge(function ({
		preserveTabOrder: n,
		preserveTabOrderAnchor: r,
		portalElement: u,
		portalRef: s,
		portal: o = !0,
		...f
	}) {
		const h = (0, w.useRef)(null),
			m = Dt(h, f.ref),
			v = (0, w.useContext)(lp),
			[g, _] = (0, w.useState)(null),
			[b, p] = (0, w.useState)(null),
			E = (0, w.useRef)(null),
			x = (0, w.useRef)(null),
			O = (0, w.useRef)(null),
			z = (0, w.useRef)(null);
		return (
			Pe(() => {
				const D = h.current;
				if (!D || !o) {
					_(null);
					return;
				}
				const A = vk(D, u);
				if (!A) {
					_(null);
					return;
				}
				const C = A.isConnected;
				if ((C || (v || mk(D)).appendChild(A), A.id || (A.id = D.id ? `portal/${D.id}` : gk()), _(A), nh(s, A), !C))
					return () => {
						(A.remove(), nh(s, null));
					};
			}, [o, u, v, s]),
			Pe(() => {
				if (!o || !n || !r) return;
				const D = dt(r).createElement("span");
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
					if ((cancelAnimationFrame(D), k)) return rN(g);
					D = requestAnimationFrame(() => {
						iN(g, !0);
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
			(f = cn(
				f,
				(D) => {
					if (((D = (0, S.jsx)(lp.Provider, { value: g || v, children: D })), !o)) return D;
					if (!g) return (0, S.jsx)("span", { ref: m, id: f.id, style: { position: "fixed" }, hidden: !0 });
					((D = (0, S.jsxs)(S.Fragment, {
						children: [
							n &&
								g &&
								(0, S.jsx)(so, {
									ref: x,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-before",
									onFocus: (C) => {
										ua(C, g) ? Ar(xd()) : Ar(E.current);
									},
								}),
							D,
							n &&
								g &&
								(0, S.jsx)(so, {
									ref: O,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-after",
									onFocus: (C) => {
										ua(C, g) ? Ar(G0()) : Ar(z.current);
									},
								}),
						],
					})),
						g && (D = (0, Oo.createPortal)(D, g)));
					let A = (0, S.jsxs)(S.Fragment, {
						children: [
							n &&
								g &&
								(0, S.jsx)(so, {
									ref: E,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-before",
									onFocus: (C) => {
										C.relatedTarget !== z.current && ua(C, g) ? Ar(x.current) : Ar(G0());
									},
								}),
							n && (0, S.jsx)("span", { "aria-owns": g?.id, style: { position: "fixed" } }),
							n &&
								g &&
								(0, S.jsx)(so, {
									ref: z,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-after",
									onFocus: (C) => {
										if (ua(C, g)) Ar(O.current);
										else {
											const k = xd();
											if (k === x.current) {
												requestAnimationFrame(() => {
													var F;
													return (F = xd()) == null ? void 0 : F.focus();
												});
												return;
											}
											Ar(k);
										}
									},
								}),
						],
					});
					return (b && n && (A = (0, Oo.createPortal)(A, b)), (0, S.jsxs)(S.Fragment, { children: [A, D] }));
				},
				[g, v, o, f.id, n, b],
			)),
			(f = { ...f, ref: m }),
			f
		);
	}),
	eD = Ie(function (n) {
		return Qe(hk, s_(n));
	}),
	sp = (0, w.createContext)(0);
function yk({ level: e, children: n }) {
	const r = (0, w.useContext)(sp),
		u = Math.max(Math.min(e || r + 1, 6), 1);
	return (0, S.jsx)(sp.Provider, { value: u, children: n });
}
var pk = "div",
	o_ = Ge(function ({ autoFocusOnShow: n = !0, ...r }) {
		return ((r = cn(r, (u) => (0, S.jsx)(Zb.Provider, { value: n, children: u }), [n])), r);
	}),
	tD = Ie(function (n) {
		return Qe(pk, o_(n));
	});
function bk(e, n) {
	const r = dt(e).createElement("button");
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
function _k(e) {
	const n = (0, w.useRef)();
	return (
		(0, w.useEffect)(() => {
			if (!e) {
				n.current = null;
				return;
			}
			return on(
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
var Cd = new WeakMap();
function jl(e, n, r) {
	Cd.has(e) || Cd.set(e, new Map());
	const u = Cd.get(e),
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
function Yh(e, n, r) {
	return jl(e, n, () => {
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
	return jl(e, n, () => {
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
function ah(e, n) {
	return e
		? jl(e, "style", () => {
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
function Sk(e, n, r) {
	return e
		? jl(e, n, () => {
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
var wk = ["SCRIPT", "STYLE"];
function uh(e) {
	return `__ariakit-dialog-snapshot-${e}`;
}
function Ek(e, n) {
	const r = dt(n),
		u = uh(e);
	if (!r.body[u]) return !0;
	do {
		if (n === r.body) return !1;
		if (n[u]) return !0;
		if (!n.parentElement) return !1;
		n = n.parentElement;
	} while (!0);
}
function Tk(e, n, r) {
	return wk.includes(n.tagName) || !Ek(e, n) ? !1 : !r.some((u) => u && Pt(n, u));
}
function Gh(e, n, r, u) {
	for (let s of n) {
		if (!s?.isConnected) continue;
		const o = n.some((m) => (!m || m === s ? !1 : m.contains(s))),
			f = dt(s),
			h = s;
		for (; s.parentElement && s !== f.body; ) {
			if ((u?.(s.parentElement, h), !o)) for (const m of s.parentElement.children) Tk(e, m, n) && r(m, h);
			s = s.parentElement;
		}
	}
}
function xk(e, n) {
	const { body: r } = dt(n[0]),
		u = [];
	return (
		Gh(e, n, (o) => {
			u.push(ha(o, uh(e), !0));
		}),
		An(ha(r, uh(e), !0), () => {
			for (const o of u) o();
		})
	);
}
function c_(e, ...n) {
	if (!e) return !1;
	const r = e.getAttribute("data-backdrop");
	return r == null ? !1 : r === "" || r === "true" || !n.length ? !0 : n.some((u) => r === u);
}
function pu(e = "", n = !1) {
	return `__ariakit-dialog-${n ? "ancestor" : "outside"}${e ? `-${e}` : ""}`;
}
function Ak(e, n = "") {
	return An(ha(e, pu(), !0), ha(e, pu(n), !0));
}
function f_(e, n = "") {
	return An(ha(e, pu("", !0), !0), ha(e, pu(n, !0), !0));
}
function Fh(e, n) {
	const r = pu(n, !0);
	if (e[r]) return !0;
	const u = pu(n);
	do {
		if (e[u]) return !0;
		if (!e.parentElement) return !1;
		e = e.parentElement;
	} while (!0);
}
function op(e, n) {
	const r = [],
		u = n.map((o) => o?.id);
	return (
		Gh(
			e,
			n,
			(o) => {
				c_(o, ...u) || r.unshift(Ak(o, e));
			},
			(o, f) => {
				(f.hasAttribute("data-dialog") && f.id !== e) || r.unshift(f_(o, e));
			},
		),
		() => {
			for (const o of r) o();
		}
	);
}
function Ck(e) {
	return e.tagName === "HTML" ? !0 : Pt(dt(e).body, e);
}
function Rk(e, n) {
	if (!e) return !1;
	if (Pt(e, n)) return !0;
	const r = n.getAttribute("aria-activedescendant");
	if (r) {
		const u = dt(e).getElementById(r);
		if (u) return Pt(e, u);
	}
	return !1;
}
function Ok(e, n) {
	if (!("clientY" in e)) return !1;
	const r = n.getBoundingClientRect();
	return r.width === 0 || r.height === 0
		? !1
		: r.top <= e.clientY && e.clientY <= r.top + r.height && r.left <= e.clientX && e.clientX <= r.left + r.width;
}
function Rd({ store: e, type: n, listener: r, capture: u, domReady: s }) {
	const o = Ce(r),
		f = Zt(e, "open"),
		h = (0, w.useRef)(!1);
	(Pe(() => {
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
					? on(
							n,
							(v) => {
								const { contentElement: g, disclosureElement: _ } = e.getState(),
									b = v.target;
								g &&
									b &&
									Ck(b) &&
									(Pt(g, b) ||
										Rk(_, b) ||
										b.hasAttribute("data-focus-trap") ||
										Ok(v, g) ||
										(h.current && !Fh(b, g.id)) ||
										sN(b) ||
										o(v));
							},
							u,
						)
					: void 0,
			[f, u],
		));
}
function Od(e, n) {
	return typeof e == "function" ? e(n) : !!e;
}
function Nk(e, n, r) {
	const u = _k(Zt(e, "open")),
		s = { store: e, domReady: r, capture: !0 };
	(Rd({
		...s,
		type: "click",
		listener: (o) => {
			const { contentElement: f } = e.getState(),
				h = u.current;
			h && Ob(h) && Fh(h, f?.id) && Od(n, o) && e.hide();
		},
	}),
		Rd({
			...s,
			type: "focusin",
			listener: (o) => {
				const { contentElement: f } = e.getState();
				f && o.target !== dt(f) && Od(n, o) && e.hide();
			},
		}),
		Rd({
			...s,
			type: "contextmenu",
			listener: (o) => {
				Od(n, o) && e.hide();
			},
		}));
}
var cp = (0, w.createContext)({});
function kk(e) {
	const n = (0, w.useContext)(cp),
		[r, u] = (0, w.useState)([]),
		s = (0, w.useCallback)(
			(f) => {
				var h;
				return (
					u((m) => [...m, f]),
					An((h = n.add) == null ? void 0 : h.call(n, f), () => {
						u((m) => m.filter((v) => v !== f));
					})
				);
			},
			[n],
		);
	Pe(
		() =>
			dn(e, ["open", "contentElement"], (f) => {
				var h;
				if (f.open && f.contentElement) return (h = n.add) == null ? void 0 : h.call(n, e);
			}),
		[e, n],
	);
	const o = (0, w.useMemo)(() => ({ store: e, add: s }), [e, s]);
	return {
		wrapElement: (0, w.useCallback)((f) => (0, S.jsx)(cp.Provider, { value: o, children: f }), [o]),
		nestedDialogs: r,
	};
}
function Mk({ attribute: e, contentId: n, contentElement: r, enabled: u }) {
	const [s, o] = Ib(),
		f = (0, w.useCallback)(() => {
			if (!u || !r) return !1;
			const { body: h } = dt(r),
				m = h.getAttribute(e);
			return !m || m === n;
		}, [s, u, r, e, n]);
	return (
		(0, w.useEffect)(() => {
			if (!u || !n || !r) return;
			const { body: h } = dt(r);
			if (f()) return (h.setAttribute(e, n), () => h.removeAttribute(e));
			const m = new MutationObserver(() => (0, Oo.flushSync)(o));
			return (m.observe(h, { attributeFilter: [e] }), () => m.disconnect());
		}, [s, u, n, r, f, e]),
		f
	);
}
function zk(e) {
	const n = e.getBoundingClientRect().left;
	return Math.round(n) + e.scrollLeft ? "paddingLeft" : "paddingRight";
}
function Dk(e, n, r) {
	const u = Mk({ attribute: "data-dialog-prevent-body-scroll", contentElement: e, contentId: n, enabled: r });
	(0, w.useEffect)(() => {
		if (!u() || !e) return;
		const s = dt(e),
			o = Rb(e),
			{ documentElement: f, body: h } = s,
			m = f.style.getPropertyValue("--scrollbar-width"),
			v = m ? Number.parseInt(m, 10) : o.innerWidth - f.clientWidth,
			g = () => Sk(f, "--scrollbar-width", `${v}px`),
			_ = zk(f),
			b = () => ah(h, { overflow: "hidden", [_]: `${v}px` }),
			p = () => {
				var x, O;
				const { scrollX: z, scrollY: D, visualViewport: A } = o,
					C = (x = A?.offsetLeft) != null ? x : 0,
					k = (O = A?.offsetTop) != null ? O : 0,
					F = ah(h, {
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
			E = Oh() && !DO();
		return An(g(), E ? p() : b());
	}, [u, e]);
}
function jk(e, ...n) {
	if (!e) return !1;
	const r = e.getAttribute("data-focus-trap");
	return r == null ? !1 : n.length ? (r === "" ? !1 : n.some((u) => r === u)) : !0;
}
function d_() {
	return "inert" in HTMLElement.prototype;
}
function Lk(e) {
	return Yh(e, "aria-hidden", "true");
}
function h_(e, n) {
	return "style" in e
		? d_()
			? ha(e, "inert", !0)
			: An(
					...Qo(e, !0).map((r) => {
						if (n?.some((s) => s && Pt(s, r))) return gl;
						const u = jl(
							r,
							"focus",
							() => (
								(r.focus = gl),
								() => {
									delete r.focus;
								}
							),
						);
						return An(Yh(r, "tabindex", "-1"), u);
					}),
					Lk(e),
					ah(e, { pointerEvents: "none", userSelect: "none", cursor: "default" }),
				)
		: gl;
}
function qk(e, n) {
	const r = [],
		u = n.map((o) => o?.id);
	return (
		Gh(
			e,
			n,
			(o) => {
				c_(o, ...u) || jk(o, ...u) || r.unshift(h_(o, n));
			},
			(o) => {
				o.hasAttribute("role") && (n.some((f) => f && Pt(f, o)) || r.unshift(Yh(o, "role", "none")));
			},
		),
		() => {
			for (const o of r) o();
		}
	);
}
function m_(e = {}) {
	const n = Xo(e.store, Zh(e.disclosure, ["contentElement", "disclosureElement"]));
	const r = n?.getState(),
		u = Ne(e.open, r?.open, e.defaultOpen, !1),
		s = Ne(e.animated, r?.animated, !1),
		o = si(
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
		vn(o, () =>
			dn(o, ["animated", "animating"], (f) => {
				f.animated || o.setState("animating", !1);
			}),
		),
		vn(o, () =>
			Vh(o, ["open"], () => {
				o.getState().animated && o.setState("animating", !0);
			}),
		),
		vn(o, () =>
			dn(o, ["open", "animating"], (f) => {
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
function v_(e, n, r) {
	return (
		Su(n, [r.store, r.disclosure]),
		zt(e, r, "open", "setOpen"),
		zt(e, r, "mounted", "setMounted"),
		zt(e, r, "animated"),
		Object.assign(e, { disclosure: r.disclosure })
	);
}
function Uk(e = {}) {
	const [n, r] = Jo(m_, e);
	return v_(n, r, e);
}
var $k = "div",
	Bk = [
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
	nD = Ge(function (n) {
		return n;
	}),
	No = Ie(function (n) {
		return Qe($k, n);
	});
Object.assign(
	No,
	Bk.reduce(
		(e, n) => (
			(e[n] = Ie(function (u) {
				return Qe(n, u);
			})),
			e
		),
		{},
	),
);
function Ik({ store: e, backdrop: n, alwaysVisible: r, hidden: u }) {
	const s = (0, w.useRef)(null),
		o = Uk({ disclosure: e }),
		f = Zt(e, "contentElement");
	((0, w.useEffect)(() => {
		const v = s.current,
			g = f;
		v && g && (v.style.zIndex = getComputedStyle(g).zIndex);
	}, [f]),
		Pe(() => {
			const v = f?.id;
			if (!v) return;
			const g = s.current;
			if (g) return f_(g, v);
		}, [f]));
	const h = Kh({
		ref: s,
		store: o,
		role: "presentation",
		"data-backdrop": f?.id || "",
		alwaysVisible: r,
		hidden: u ?? void 0,
		style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 },
	});
	if (!n) return null;
	if ((0, w.isValidElement)(n)) return (0, S.jsx)(No, { ...h, render: n });
	const m = typeof n != "boolean" ? n : "div";
	return (0, S.jsx)(No, { ...h, render: (0, S.jsx)(m, {}) });
}
function g_(e = {}) {
	return m_(e);
}
function y_(e, n, r) {
	return v_(e, n, r);
}
function Vk(e = {}) {
	const [n, r] = Jo(g_, e);
	return y_(n, r, e);
}
var Zk = "div",
	fp = Vo();
function Hk(e) {
	const n = er();
	return !n || (e && Pt(e, n)) ? !1 : !!li(n);
}
function dp(e, n = !1) {
	if (!e) return null;
	const r = "current" in e ? e.current : e;
	return r ? (n ? (li(r) ? r : null) : r) : null;
}
var p_ = Ge(function ({
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
	const A = Ko(),
		C = (0, w.useRef)(null),
		k = Vk({
			store: n || A,
			open: r,
			setOpen(ce) {
				if (ce) return;
				const Ee = C.current;
				if (!Ee) return;
				const Ye = new Event("close", { bubbles: !1, cancelable: !0 });
				(u && Ee.addEventListener("close", u, { once: !0 }),
					Ee.dispatchEvent(Ye),
					Ye.defaultPrevented && k.setOpen(!0));
			},
		}),
		{ portalRef: F, domReady: Q } = kh(f, D.portalRef),
		j = D.preserveTabOrder,
		q = Zt(k, (ce) => j && !o && ce.mounted),
		G = tr(D.id),
		B = Zt(k, "open"),
		se = Zt(k, "mounted"),
		ee = Zt(k, "contentElement"),
		K = Wo(se, D.hidden, D.alwaysVisible);
	(Dk(ee, G, _ && !K), Nk(k, v, Q));
	const { wrapElement: ue, nestedDialogs: R } = kk(k);
	((D = cn(D, ue, [ue])),
		Pe(() => {
			if (!B) return;
			const ce = C.current,
				Ee = er(ce, !0);
			Ee && Ee.tagName !== "BODY" && ((ce && Pt(ce, Ee)) || k.setDisclosureElement(Ee));
		}, [k, B]),
		fp &&
			(0, w.useEffect)(() => {
				if (!se) return;
				const { disclosureElement: ce } = k.getState();
				if (!ce || !Nr(ce)) return;
				const Ee = () => {
					let Ye = !1;
					const ze = () => {
						Ye = !0;
					};
					(ce.addEventListener("focusin", ze, { capture: !0, once: !0 }),
						cu(ce, "mouseup", () => {
							(ce.removeEventListener("focusin", ze, !0), !Ye && Hb(ce));
						}));
				};
				return (
					ce.addEventListener("mousedown", Ee),
					() => {
						ce.removeEventListener("mousedown", Ee);
					}
				);
			}, [k, se]),
		(0, w.useEffect)(() => {
			if (!se || !Q) return;
			const ce = C.current;
			if (!ce) return;
			const Ee = Rb(ce),
				Ye = Ee.visualViewport || Ee,
				ze = () => {
					var yt, rt;
					const ae = (rt = (yt = Ee.visualViewport) == null ? void 0 : yt.height) != null ? rt : Ee.innerHeight;
					ce.style.setProperty("--dialog-viewport-height", `${ae}px`);
				};
			return (
				ze(),
				Ye.addEventListener("resize", ze),
				() => {
					Ye.removeEventListener("resize", ze);
				}
			);
		}, [se, Q]),
		(0, w.useEffect)(() => {
			if (!o || !se || !Q) return;
			const ce = C.current;
			if (ce && !ce.querySelector("[data-dialog-dismiss]")) return bk(ce, k.hide);
		}, [k, o, se, Q]),
		Pe(() => {
			if (!d_() || B || !se || !Q) return;
			const ce = C.current;
			if (ce) return h_(ce);
		}, [B, se, Q]));
	const $ = B && Q;
	Pe(() => {
		if (!G || !$) return;
		const ce = C.current;
		return xk(G, [ce]);
	}, [G, $, z]);
	const P = Ce(g);
	Pe(() => {
		if (!G || !$) return;
		const { disclosureElement: ce } = k.getState(),
			Ee = [C.current, ...(P() || []), ...R.map((Ye) => Ye.getState().contentElement)];
		return o ? An(op(G, Ee), qk(G, Ee)) : op(G, [ce, ...Ee]);
	}, [G, k, $, P, R, o, z]);
	const le = !!b,
		me = vt(b),
		[Re, N] = (0, w.useState)(!1);
	(0, w.useEffect)(() => {
		if (!B || !le || !Q || !ee?.isConnected) return;
		const ce = dp(E, !0) || ee.querySelector("[data-autofocus=true],[autofocus]") || JO(ee, !0, f && q) || ee,
			Ee = li(ce);
		me(Ee ? ce : null) &&
			(N(!0),
			queueMicrotask(() => {
				(ce.focus(), fp && Ee && ce.scrollIntoView({ block: "nearest", inline: "nearest" }));
			}));
	}, [B, le, Q, ee, E, f, q, me]);
	const X = !!p,
		re = vt(p),
		[fe, ge] = (0, w.useState)(!1);
	(0, w.useEffect)(() => {
		if (B) return (ge(!0), () => ge(!1));
	}, [B]);
	const be = (0, w.useCallback)(
			(ce, Ee = !0) => {
				const { disclosureElement: Ye } = k.getState();
				if (Hk(ce)) return;
				let ze = dp(x) || Ye;
				if (ze?.id) {
					const rt = dt(ze),
						ae = `[aria-activedescendant="${ze.id}"]`,
						Ae = rt.querySelector(ae);
					Ae && (ze = Ae);
				}
				if (ze && !li(ze)) {
					const rt = ze.closest("[data-dialog]");
					if (rt?.id) {
						const ae = dt(rt),
							Ae = `[aria-controls~="${rt.id}"]`,
							lt = ae.querySelector(Ae);
						lt && (ze = lt);
					}
				}
				const yt = ze && li(ze);
				if (!yt && Ee) {
					requestAnimationFrame(() => be(ce, !1));
					return;
				}
				re(yt ? ze : null) && yt && ze?.focus({ preventScroll: !0 });
			},
			[k, x, re],
		),
		Se = (0, w.useRef)(!1);
	(Pe(() => {
		if (B || !fe || !X) return;
		const ce = C.current;
		((Se.current = !0), be(ce));
	}, [B, fe, Q, X, be]),
		(0, w.useEffect)(() => {
			if (!fe || !X) return;
			const ce = C.current;
			return () => {
				if (Se.current) {
					Se.current = !1;
					return;
				}
				be(ce);
			};
		}, [fe, X, be]));
	const Fe = vt(m);
	((0, w.useEffect)(
		() =>
			!Q || !se
				? void 0
				: on(
						"keydown",
						(Ee) => {
							if (Ee.key !== "Escape" || Ee.defaultPrevented) return;
							const Ye = C.current;
							if (!Ye || Fh(Ye)) return;
							const ze = Ee.target;
							if (!ze) return;
							const { disclosureElement: yt } = k.getState();
							!!(ze.tagName === "BODY" || Pt(Ye, ze) || !yt || Pt(yt, ze)) && Fe(Ee) && k.hide();
						},
						!0,
					),
		[k, Q, se, Fe],
	),
		(D = cn(D, (ce) => (0, S.jsx)(yk, { level: o ? 1 : void 0, children: ce }), [o])));
	const De = D.hidden,
		Ke = D.alwaysVisible;
	D = cn(
		D,
		(ce) =>
			h
				? (0, S.jsxs)(S.Fragment, {
						children: [(0, S.jsx)(Ik, { store: k, backdrop: h, hidden: De, alwaysVisible: Ke }), ce],
					})
				: ce,
		[k, h, De, Ke],
	);
	const [Et, Tt] = (0, w.useState)(),
		[Kt, Be] = (0, w.useState)();
	return (
		(D = cn(
			D,
			(ce) =>
				(0, S.jsx)($h, {
					value: k,
					children: (0, S.jsx)(xN.Provider, {
						value: Tt,
						children: (0, S.jsx)(AN.Provider, { value: Be, children: ce }),
					}),
				}),
			[k],
		)),
		(D = {
			id: G,
			"data-dialog": "",
			role: "dialog",
			tabIndex: s ? -1 : void 0,
			"aria-labelledby": Et,
			"aria-describedby": Kt,
			...D,
			ref: Dt(C, D.ref),
		}),
		(D = o_({ ...D, autoFocusOnShow: Re })),
		(D = Kh({ store: k, ...D })),
		(D = Nl({ ...D, focusable: s })),
		(D = s_({ portal: f, ...D, portalRef: F, preserveTabOrder: q })),
		D
	);
});
function Ll(e, n = Ko) {
	return Ie(function (u) {
		const s = n();
		return Zt(u.store || s, (o) => !u.unmountOnHide || o?.mounted || !!u.open) ? (0, S.jsx)(e, { ...u }) : null;
	});
}
var iD = Ll(
		Ie(function (n) {
			return Qe(Zk, p_(n));
		}),
		Ko,
	),
	kr = Math.min,
	Gi = Math.max,
	ko = Math.round,
	oo = Math.floor,
	Fi = (e) => ({ x: e, y: e }),
	Pk = { left: "right", right: "left", bottom: "top", top: "bottom" };
function b_(e, n, r) {
	return Gi(e, kr(n, r));
}
function Mr(e, n) {
	return typeof e == "function" ? e(n) : e;
}
function zr(e) {
	return e.split("-")[0];
}
function wu(e) {
	return e.split("-")[1];
}
function Xh(e) {
	return e === "x" ? "y" : "x";
}
function Jh(e) {
	return e === "y" ? "height" : "width";
}
function pi(e) {
	const n = e[0];
	return n === "t" || n === "b" ? "y" : "x";
}
function Wh(e) {
	return Xh(pi(e));
}
function Qk(e, n, r) {
	r === void 0 && (r = !1);
	const u = wu(e),
		s = Wh(e),
		o = Jh(s);
	let f = s === "x" ? (u === (r ? "end" : "start") ? "right" : "left") : u === "start" ? "bottom" : "top";
	return (n.reference[o] > n.floating[o] && (f = Mo(f)), [f, Mo(f)]);
}
function Kk(e) {
	const n = Mo(e);
	return [lh(e), n, lh(n)];
}
function lh(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var hp = ["left", "right"],
	mp = ["right", "left"],
	Yk = ["top", "bottom"],
	Gk = ["bottom", "top"];
function Fk(e, n, r) {
	switch (e) {
		case "top":
		case "bottom":
			return r ? (n ? mp : hp) : n ? hp : mp;
		case "left":
		case "right":
			return n ? Yk : Gk;
		default:
			return [];
	}
}
function Xk(e, n, r, u) {
	const s = wu(e);
	let o = Fk(zr(e), r === "start", u);
	return (s && ((o = o.map((f) => f + "-" + s)), n && (o = o.concat(o.map(lh)))), o);
}
function Mo(e) {
	const n = zr(e);
	return Pk[n] + e.slice(n.length);
}
function Jk(e) {
	var n, r, u, s;
	return {
		top: (n = e.top) != null ? n : 0,
		right: (r = e.right) != null ? r : 0,
		bottom: (u = e.bottom) != null ? u : 0,
		left: (s = e.left) != null ? s : 0,
	};
}
function __(e) {
	return typeof e != "number" ? Jk(e) : { top: e, right: e, bottom: e, left: e };
}
function zo(e) {
	const { x: n, y: r, width: u, height: s } = e;
	return { width: u, height: s, top: r, left: n, right: n + u, bottom: r + s, x: n, y: r };
}
function vp(e, n, r) {
	let { reference: u, floating: s } = e;
	const o = pi(n),
		f = Wh(n),
		h = Jh(f),
		m = zr(n),
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
	const E = wu(n);
	return (E && (p[f] += b * (E === "end" ? 1 : -1) * (r && v ? -1 : 1)), p);
}
async function Wk(e, n) {
	var r;
	n === void 0 && (n = {});
	const { x: u, y: s, platform: o, rects: f, elements: h, strategy: m } = e,
		{
			boundary: v = "clippingAncestors",
			rootBoundary: g = "viewport",
			elementContext: _ = "floating",
			altBoundary: b = !1,
			padding: p = 0,
		} = Mr(n, e),
		E = __(p),
		x = h[b ? (_ === "floating" ? "reference" : "floating") : _],
		O = zo(
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
		C = zo(
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
var e2 = 50,
	t2 = async (e, n, r) => {
		const { placement: u = "bottom", strategy: s = "absolute", middleware: o = [], platform: f } = r,
			h = f.detectOverflow ? f : { ...f, detectOverflow: Wk },
			m = await (f.isRTL == null ? void 0 : f.isRTL(n));
		let v = await f.getElementRects({ reference: e, floating: n, strategy: s }),
			{ x: g, y: _ } = vp(v, u, m),
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
					p < e2 &&
					(p++,
					typeof F == "object" &&
						(F.placement && (b = F.placement),
						F.rects &&
							(v = F.rects === !0 ? await f.getElementRects({ reference: e, floating: n, strategy: s }) : F.rects),
						({ x: g, y: _ } = vp(v, b, m))),
					(x = -1)));
		}
		return { x: g, y: _, placement: b, strategy: s, middlewareData: E };
	},
	n2 = (e) => ({
		name: "arrow",
		options: e,
		async fn(n) {
			const { x: r, y: u, placement: s, rects: o, platform: f, elements: h, middlewareData: m } = n,
				{ element: v, padding: g = 0 } = Mr(e, n) || {};
			if (v == null) return {};
			const _ = __(g),
				b = { x: r, y: u },
				p = Wh(s),
				E = Jh(p),
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
				G = kr(_[z], q),
				B = kr(_[D], q),
				se = Q - x[E] - B,
				ee = Q / 2 - x[E] / 2 + j,
				K = b_(G, ee, se),
				ue = !m.arrow && wu(s) != null && ee !== K && o.reference[E] / 2 - (ee < G ? G : B) - x[E] / 2 < 0,
				R = ue ? (ee < G ? ee - G : ee - se) : 0;
			return {
				[p]: b[p] + R,
				data: { [p]: K, centerOffset: ee - K - R, ...(ue && { alignmentOffset: R }) },
				reset: ue,
			};
		},
	}),
	i2 = function (e) {
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
						} = Mr(e, n);
					if ((r = o.arrow) != null && r.alignmentOffset) return {};
					const z = zr(s),
						D = pi(h),
						A = zr(h) === h,
						C = await (m.isRTL == null ? void 0 : m.isRTL(v.floating)),
						k = b || (A || !x ? [Mo(h)] : Kk(h)),
						F = E !== "none";
					!b && F && k.push(...Xk(h, x, E, C));
					const Q = [h, ...k],
						j = await m.detectOverflow(n, O),
						q = [];
					let G = ((u = o.flip) == null ? void 0 : u.overflows) || [];
					if ((g && q.push(j[z]), _)) {
						const K = Qk(s, f, C);
						q.push(j[K[0]], j[K[1]]);
					}
					if (((G = [...G, { placement: s, overflows: q }]), !q.every((K) => K <= 0))) {
						var B, se;
						const K = (((B = o.flip) == null ? void 0 : B.index) || 0) + 1,
							ue = Q[K];
						if (
							ue &&
							(!(_ === "alignment" && D !== pi(ue)) ||
								G.every(($) => (pi($.placement) === D ? $.overflows[0] > 0 : !0)))
						)
							return { data: { index: K, overflows: G }, reset: { placement: ue } };
						let R =
							(se = G.filter(($) => $.overflows[0] <= 0).sort(($, P) => $.overflows[1] - P.overflows[1])[0]) == null
								? void 0
								: se.placement;
						if (!R)
							switch (p) {
								case "bestFit": {
									var ee;
									const $ =
										(ee = G.filter((P) => {
											if (F) {
												const le = pi(P.placement);
												return le === D || le === "y";
											}
											return !0;
										})
											.map((P) => [P.placement, P.overflows.filter((le) => le > 0).reduce((le, me) => le + me, 0)])
											.sort((P, le) => P[1] - le[1])[0]) == null
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
	S_ = new Set(["left", "top"]);
async function r2(e, n) {
	const { placement: r, platform: u, elements: s } = e,
		o = await (u.isRTL == null ? void 0 : u.isRTL(s.floating)),
		f = zr(r),
		h = wu(r),
		m = pi(r) === "y",
		v = S_.has(f) ? -1 : 1,
		g = o && m ? -1 : 1,
		_ = Mr(n, e);
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
var a2 = function (e) {
		return (
			e === void 0 && (e = 0),
			{
				name: "offset",
				options: e,
				async fn(n) {
					var r, u;
					const { x: s, y: o, placement: f, middlewareData: h } = n,
						m = await r2(n, e);
					return f === ((r = h.offset) == null ? void 0 : r.placement) && (u = h.arrow) != null && u.alignmentOffset
						? {}
						: { x: s + m.x, y: o + m.y, data: { ...m, placement: f } };
				},
			}
		);
	},
	u2 = function (e) {
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
						} = Mr(e, n),
						g = { x: r, y: u },
						_ = await o.detectOverflow(n, v),
						b = pi(s),
						p = Xh(b);
					let E = g[p],
						x = g[b];
					const O = (D, A) => b_(A + _[D === "y" ? "top" : "left"], A, A - _[D === "y" ? "bottom" : "right"]);
					(f && (E = O(p, E)), h && (x = O(b, x)));
					const z = m.fn({ ...n, [p]: E, [b]: x });
					return { ...z, data: { x: z.x - r, y: z.y - u, enabled: { [p]: f, [b]: h } } };
				},
			}
		);
	},
	l2 = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				options: e,
				fn(n) {
					var r, u;
					const { x: s, y: o, placement: f, rects: h, middlewareData: m } = n,
						{ offset: v = 0, mainAxis: g = !0, crossAxis: _ = !0 } = Mr(e, n),
						b = { x: s, y: o },
						p = pi(f),
						E = Xh(p);
					let x = b[E],
						O = b[p];
					const z = Mr(v, n),
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
							F = S_.has(zr(f)),
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
	s2 = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "size",
				options: e,
				async fn(n) {
					const { placement: r, rects: u, platform: s, elements: o } = n,
						{ apply: f = () => {}, ...h } = Mr(e, n),
						m = await s.detectOverflow(n, h),
						v = zr(r),
						g = wu(r),
						_ = pi(r) === "y",
						{ width: b, height: p } = u.floating;
					let E, x;
					v === "top" || v === "bottom"
						? ((E = v),
							(x =
								g === ((await (s.isRTL == null ? void 0 : s.isRTL(o.floating))) ? "start" : "end") ? "left" : "right"))
						: ((x = v), (E = g === "end" ? "top" : "bottom"));
					const O = p - m.top - m.bottom,
						z = b - m.left - m.right,
						D = kr(p - m[E], O),
						A = kr(b - m[x], z),
						C = n.middlewareData.shift,
						k = !C;
					let F = D,
						Q = A;
					(C != null && C.enabled.x && (Q = z),
						C != null && C.enabled.y && (F = O),
						k && !g && (_ ? (Q = b - 2 * Gi(m.left, m.right)) : (F = p - 2 * Gi(m.top, m.bottom))),
						await f({ ...n, availableWidth: Q, availableHeight: F }));
					const j = await s.getDimensions(o.floating);
					return b !== j.width || p !== j.height ? { reset: { rects: !0 } } : {};
				},
			}
		);
	};
function ec() {
	return typeof window < "u";
}
function Eu(e) {
	return w_(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function xn(e) {
	var n;
	return (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) || window;
}
function nr(e) {
	var n;
	return (n = (w_(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : n.documentElement;
}
function w_(e) {
	return ec() ? e instanceof Node || e instanceof xn(e).Node : !1;
}
function bi(e) {
	return ec() ? e instanceof Element || e instanceof xn(e).Element : !1;
}
function Lr(e) {
	return ec() ? e instanceof HTMLElement || e instanceof xn(e).HTMLElement : !1;
}
function gp(e) {
	return !ec() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof xn(e).ShadowRoot;
}
function tc(e) {
	const { overflow: n, overflowX: r, overflowY: u, display: s } = _i(e);
	return /auto|scroll|overlay|hidden|clip/.test(n + u + r) && s !== "inline" && s !== "contents";
}
function o2(e) {
	return /^(table|td|th)$/.test(Eu(e));
}
function nc(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var c2 = /transform|translate|scale|rotate|perspective|filter/,
	f2 = /paint|layout|strict|content/,
	aa = (e) => !!e && e !== "none",
	Nd;
function em(e) {
	const n = bi(e) ? _i(e) : e;
	return (
		aa(n.transform) ||
		aa(n.translate) ||
		aa(n.scale) ||
		aa(n.rotate) ||
		aa(n.perspective) ||
		(!tm() && (aa(n.backdropFilter) || aa(n.filter))) ||
		c2.test(n.willChange || "") ||
		f2.test(n.contain || "")
	);
}
function d2(e) {
	let n = ma(e);
	for (; Lr(n) && !Sl(n); ) {
		if (em(n)) return n;
		if (nc(n)) return null;
		n = ma(n);
	}
	return null;
}
function tm() {
	return (Nd == null && (Nd = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Nd);
}
function Sl(e) {
	return /^(html|body|#document)$/.test(Eu(e));
}
function _i(e) {
	return xn(e).getComputedStyle(e);
}
function ic(e) {
	return bi(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function ma(e) {
	if (Eu(e) === "html") return e;
	const n = e.assignedSlot || e.parentNode || (gp(e) && e.host) || nr(e);
	return gp(n) ? n.host : n;
}
function E_(e) {
	const n = ma(e);
	return Sl(n) ? (e.ownerDocument || e).body : Lr(n) && tc(n) ? n : E_(n);
}
function wl(e, n, r) {
	var u;
	(n === void 0 && (n = []), r === void 0 && (r = !0));
	const s = E_(e),
		o = s === ((u = e.ownerDocument) == null ? void 0 : u.body),
		f = xn(s);
	if (o) {
		const h = sh(f);
		return n.concat(f, f.visualViewport || [], tc(s) ? s : [], h && r ? wl(h) : []);
	} else return n.concat(s, wl(s, [], r));
}
function sh(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function T_(e) {
	const n = _i(e);
	let r = parseFloat(n.width) || 0,
		u = parseFloat(n.height) || 0;
	const s = Lr(e),
		o = s ? e.offsetWidth : r,
		f = s ? e.offsetHeight : u,
		h = ko(r) !== o || ko(u) !== f;
	return (h && ((r = o), (u = f)), { width: r, height: u, $: h });
}
function nm(e) {
	return bi(e) ? e : e.contextElement;
}
function fu(e) {
	const n = nm(e);
	if (!Lr(n)) return Fi(1);
	const r = n.getBoundingClientRect(),
		{ width: u, height: s, $: o } = T_(n);
	let f = (o ? ko(r.width) : r.width) / u,
		h = (o ? ko(r.height) : r.height) / s;
	return ((!f || !Number.isFinite(f)) && (f = 1), (!h || !Number.isFinite(h)) && (h = 1), { x: f, y: h });
}
var h2 = Fi(0);
function x_(e) {
	const n = xn(e);
	return !tm() || !n.visualViewport ? h2 : { x: n.visualViewport.offsetLeft, y: n.visualViewport.offsetTop };
}
function m2(e, n, r) {
	return (n === void 0 && (n = !1), !!r && n && r === xn(e));
}
function va(e, n, r, u) {
	(n === void 0 && (n = !1), r === void 0 && (r = !1));
	const s = e.getBoundingClientRect(),
		o = nm(e);
	let f = Fi(1);
	n && (u ? bi(u) && (f = fu(u)) : (f = fu(e)));
	const h = m2(o, r, u) ? x_(o) : Fi(0);
	let m = (s.left + h.x) / f.x,
		v = (s.top + h.y) / f.y,
		g = s.width / f.x,
		_ = s.height / f.y;
	if (o && u) {
		const b = xn(o),
			p = bi(u) ? xn(u) : u;
		let E = b,
			x = sh(E);
		for (; x && p !== E; ) {
			const O = fu(x),
				z = x.getBoundingClientRect(),
				D = _i(x),
				A = z.left + (x.clientLeft + parseFloat(D.paddingLeft)) * O.x,
				C = z.top + (x.clientTop + parseFloat(D.paddingTop)) * O.y;
			((m *= O.x), (v *= O.y), (g *= O.x), (_ *= O.y), (m += A), (v += C), (E = xn(x)), (x = sh(E)));
		}
	}
	return zo({ width: g, height: _, x: m, y: v });
}
function rc(e, n) {
	const r = ic(e).scrollLeft;
	return n ? n.left + r : va(nr(e)).left + r;
}
function A_(e, n) {
	const r = e.getBoundingClientRect();
	return { x: r.left + n.scrollLeft - rc(e, r), y: r.top + n.scrollTop };
}
function v2(e) {
	let { elements: n, rect: r, offsetParent: u, strategy: s } = e;
	const o = s === "fixed",
		f = nr(u),
		h = n ? nc(n.floating) : !1;
	if (u === f || (h && o)) return r;
	let m = { scrollLeft: 0, scrollTop: 0 },
		v = Fi(1);
	const g = Fi(0),
		_ = Lr(u);
	if ((_ || !o) && ((Eu(u) !== "body" || tc(f)) && (m = ic(u)), _)) {
		const p = va(u);
		((v = fu(u)), (g.x = p.x + u.clientLeft), (g.y = p.y + u.clientTop));
	}
	const b = f && !_ && !o ? A_(f, m) : Fi(0);
	return {
		width: r.width * v.x,
		height: r.height * v.y,
		x: r.x * v.x - m.scrollLeft * v.x + g.x + b.x,
		y: r.y * v.y - m.scrollTop * v.y + g.y + b.y,
	};
}
function g2(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function y2(e) {
	const n = ic(e),
		r = e.ownerDocument.body,
		u = Gi(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth),
		s = Gi(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
	let o = -n.scrollLeft + rc(e);
	const f = -n.scrollTop;
	return (
		_i(r).direction === "rtl" && (o += Gi(e.clientWidth, r.clientWidth) - u),
		{ width: u, height: s, x: o, y: f }
	);
}
var p2 = 25;
function b2(e, n, r) {
	r === void 0 && (r = "viewport");
	const u = r === "layoutViewport",
		s = xn(e),
		o = nr(e),
		f = s.visualViewport;
	let h = o.clientWidth,
		m = o.clientHeight,
		v = 0,
		g = 0;
	if (f) {
		const _ = !tm() || n === "fixed";
		u
			? _ || ((v = -f.offsetLeft), (g = -f.offsetTop))
			: ((h = f.width), (m = f.height), _ && ((v = f.offsetLeft), (g = f.offsetTop)));
	}
	if (rc(o) <= 0) {
		const _ = o.ownerDocument,
			b = _.body,
			p = getComputedStyle(b),
			E = (_.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight)) || 0,
			x = Math.abs(o.clientWidth - b.clientWidth - E),
			O = getComputedStyle(o).scrollbarGutter === "stable both-edges" ? x / 2 : x;
		O <= p2 && (h -= O);
	}
	return { width: h, height: m, x: v, y: g };
}
function _2(e, n) {
	const r = va(e, !0, n === "fixed"),
		u = r.top + e.clientTop,
		s = r.left + e.clientLeft,
		o = fu(e);
	return { width: e.clientWidth * o.x, height: e.clientHeight * o.y, x: s * o.x, y: u * o.y };
}
function yp(e, n, r) {
	let u;
	if (n === "viewport" || n === "layoutViewport") u = b2(e, r, n);
	else if (n === "document") u = y2(nr(e));
	else if (bi(n)) u = _2(n, r);
	else {
		const s = x_(e);
		u = { x: n.x - s.x, y: n.y - s.y, width: n.width, height: n.height };
	}
	return zo(u);
}
function S2(e, n) {
	const r = n.get(e);
	if (r) return r;
	let u = wl(e, [], !1).filter((h) => bi(h) && Eu(h) !== "body"),
		s = null;
	const o = _i(e).position === "fixed";
	let f = o ? ma(e) : e;
	for (; bi(f) && !Sl(f); ) {
		const h = _i(f),
			m = em(f),
			v = s ? s.position : o ? "fixed" : "";
		(!m && (v === "fixed" || (v === "absolute" && h.position === "static")) ? (u = u.filter((g) => g !== f)) : (s = h),
			(f = ma(f)));
	}
	return (n.set(e, u), u);
}
function w2(e) {
	let { element: n, boundary: r, rootBoundary: u, strategy: s } = e;
	const o = [...(r === "clippingAncestors" ? (nc(n) ? [] : S2(n, this._c)) : [].concat(r)), u],
		f = yp(n, o[0], s);
	let h = f.top,
		m = f.right,
		v = f.bottom,
		g = f.left;
	for (let _ = 1; _ < o.length; _++) {
		const b = yp(n, o[_], s);
		((h = Gi(b.top, h)), (m = kr(b.right, m)), (v = kr(b.bottom, v)), (g = Gi(b.left, g)));
	}
	return { width: m - g, height: v - h, x: g, y: h };
}
function E2(e) {
	const { width: n, height: r } = T_(e);
	return { width: n, height: r };
}
function T2(e, n, r) {
	const u = Lr(n),
		s = nr(n),
		o = r === "fixed",
		f = va(e, !0, o, n);
	let h = { scrollLeft: 0, scrollTop: 0 };
	const m = Fi(0);
	if ((u || !o) && ((Eu(n) !== "body" || tc(s)) && (h = ic(n)), u)) {
		const g = va(n, !0, o, n);
		((m.x = g.x + n.clientLeft), (m.y = g.y + n.clientTop));
	}
	!u && s && (m.x = rc(s));
	const v = s && !u && !o ? A_(s, h) : Fi(0);
	return { x: f.left + h.scrollLeft - m.x - v.x, y: f.top + h.scrollTop - m.y - v.y, width: f.width, height: f.height };
}
function kd(e) {
	return _i(e).position === "static";
}
function pp(e, n) {
	if (!Lr(e) || _i(e).position === "fixed") return null;
	if (n) return n(e);
	let r = e.offsetParent;
	return (nr(e) === r && (r = r.ownerDocument.body), r);
}
function C_(e, n) {
	const r = xn(e);
	if (nc(e)) return r;
	if (!Lr(e)) {
		let s = ma(e);
		for (; s && !Sl(s); ) {
			if (bi(s) && !kd(s)) return s;
			s = ma(s);
		}
		return r;
	}
	let u = pp(e, n);
	for (; u && o2(u) && kd(u); ) u = pp(u, n);
	return u && Sl(u) && kd(u) && !em(u) ? r : u || d2(e) || r;
}
var x2 = async function (e) {
	const n = this.getOffsetParent || C_,
		r = this.getDimensions,
		u = await r(e.floating);
	return {
		reference: T2(e.reference, await n(e.floating), e.strategy),
		floating: { x: 0, y: 0, width: u.width, height: u.height },
	};
};
function A2(e) {
	return _i(e).direction === "rtl";
}
var C2 = {
	convertOffsetParentRelativeRectToViewportRelativeRect: v2,
	getDocumentElement: nr,
	getClippingRect: w2,
	getOffsetParent: C_,
	getElementRects: x2,
	getClientRects: g2,
	getDimensions: E2,
	getScale: fu,
	isElement: bi,
	isRTL: A2,
};
function R_(e, n) {
	return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height;
}
function R2(e, n, r) {
	let u = null,
		s;
	const o = nr(e);
	function f() {
		var g;
		(clearTimeout(s), (g = u) == null || g.disconnect(), (u = null));
	}
	function h(g, _) {
		(g === void 0 && (g = !1), _ === void 0 && (_ = 1), f());
		const b = e.getBoundingClientRect(),
			{ left: p, top: E, width: x, height: O } = b;
		if ((g || n(), !x || !O)) return;
		const z = oo(E),
			D = oo(o.clientWidth - (p + x)),
			A = oo(o.clientHeight - (E + O)),
			C = oo(p),
			k = { rootMargin: -z + "px " + -D + "px " + -A + "px " + -C + "px", threshold: Gi(0, kr(1, _)) || 1 };
		let F = !0;
		function Q(j) {
			const q = j[0].intersectionRatio;
			if (!R_(b, e.getBoundingClientRect())) return h();
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
	const m = xn(e),
		v = () => h(r);
	return (
		m.addEventListener("resize", v),
		h(!0),
		() => {
			(m.removeEventListener("resize", v), f());
		}
	);
}
function O2(e, n, r, u) {
	u === void 0 && (u = {});
	const {
			ancestorScroll: s = !0,
			ancestorResize: o = !0,
			elementResize: f = typeof ResizeObserver == "function",
			layoutShift: h = typeof IntersectionObserver == "function",
			animationFrame: m = !1,
		} = u,
		v = nm(e),
		g = s || o ? [...(v ? wl(v) : []), ...(n ? wl(n) : [])] : [];
	g.forEach((z) => {
		(s && z.addEventListener("scroll", r), o && z.addEventListener("resize", r));
	});
	const _ = v && h ? R2(v, r, o) : null;
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
		(x && !R_(x, z) && r(), (x = z), (E = requestAnimationFrame(O)));
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
var N2 = a2,
	k2 = u2,
	M2 = i2,
	z2 = s2,
	D2 = n2,
	j2 = l2,
	L2 = (e, n, r) => {
		const u = new Map(),
			s = r ?? {},
			o = { ...C2, ...s.platform, _c: u };
		return t2(e, n, { ...s, platform: o });
	},
	q2 = "div";
function bp(e = 0, n = 0, r = 0, u = 0) {
	if (typeof DOMRect == "function") return new DOMRect(e, n, r, u);
	const s = { x: e, y: n, width: r, height: u, top: n, right: e + r, bottom: n + u, left: e };
	return { ...s, toJSON: () => s };
}
function U2(e) {
	if (!e) return bp();
	const { x: n, y: r, width: u, height: s } = e;
	return bp(n, r, u, s);
}
function $2(e, n) {
	return {
		contextElement: e || void 0,
		getBoundingClientRect: () => {
			const r = e,
				u = n?.(r);
			return u || !r ? U2(u) : r.getBoundingClientRect();
		},
	};
}
function B2(e) {
	return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e);
}
function _p(e) {
	const n = window.devicePixelRatio || 1;
	return Math.round(e * n) / n;
}
function I2(e, n) {
	return N2(({ placement: r }) => {
		var u;
		const s = (e?.clientHeight || 0) / 2,
			o = typeof n.gutter == "number" ? n.gutter + s : (u = n.gutter) != null ? u : s;
		return { crossAxis: r.split("-")[1] ? void 0 : n.shift, mainAxis: o, alignmentAxis: n.shift };
	});
}
function V2(e) {
	if (e.flip === !1) return;
	const n = typeof e.flip == "string" ? e.flip.split(" ") : void 0;
	return (Qt(!n || n.every(B2), !1), M2({ padding: e.overflowPadding, fallbackPlacements: n }));
}
function Z2(e) {
	if (!(!e.slide && !e.overlap))
		return k2({ mainAxis: e.slide, crossAxis: e.overlap, padding: e.overflowPadding, limiter: j2() });
}
function H2(e) {
	return z2({
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
function P2(e, n) {
	if (e) return D2({ element: e, padding: n.arrowPadding });
}
var im = Ge(function ({
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
		const C = Yo();
		((n = n || C), Qt(n, !1));
		const k = n.useState("arrowElement"),
			F = n.useState("anchorElement"),
			Q = n.useState("disclosureElement"),
			j = n.useState("popoverElement"),
			q = n.useState("contentElement"),
			G = n.useState("placement"),
			B = n.useState("mounted"),
			se = n.useState("rendered"),
			ee = (0, w.useRef)(null),
			[K, ue] = (0, w.useState)(!1),
			{ portalRef: R, domReady: $ } = kh(u, A.portalRef),
			P = Ce(z),
			le = Ce(D),
			me = !!D;
		(Pe(() => {
			if (!j?.isConnected) return;
			j.style.setProperty("--popover-overflow-padding", `${O}px`);
			const N = $2(F, P),
				X = async () => {
					if (!B) return;
					k || (ee.current = ee.current || document.createElement("div"));
					const ge = k || ee.current,
						be = [
							I2(ge, { gutter: E, shift: v }),
							V2({ flip: m, overflowPadding: O }),
							Z2({ slide: g, shift: v, overlap: _, overflowPadding: O }),
							P2(ge, { arrowPadding: x }),
							H2({ sameWidth: b, fitViewport: p, overflowPadding: O }),
						],
						Se = await L2(N, j, { placement: G, strategy: h ? "fixed" : "absolute", middleware: be });
					(n?.setState("currentPlacement", Se.placement), ue(!0));
					const Fe = _p(Se.x),
						De = _p(Se.y);
					if (
						(Object.assign(j.style, { top: "0", left: "0", transform: `translate3d(${Fe}px,${De}px,0)` }),
						ge && Se.middlewareData.arrow)
					) {
						const { x: Ke, y: Et } = Se.middlewareData.arrow,
							Tt = Se.placement.split("-")[0],
							Kt = ge.clientWidth / 2,
							Be = ge.clientHeight / 2,
							ce = Ke != null ? Ke + Kt : -Kt,
							Ee = Et != null ? Et + Be : -Be;
						(j.style.setProperty(
							"--popover-transform-origin",
							{
								top: `${ce}px calc(100% + ${Be}px)`,
								bottom: `${ce}px ${-Be}px`,
								left: `calc(100% + ${Kt}px) ${Ee}px`,
								right: `${-Kt}px ${Ee}px`,
							}[Tt],
						),
							Object.assign(ge.style, {
								left: Ke != null ? `${Ke}px` : "",
								top: Et != null ? `${Et}px` : "",
								[Tt]: "100%",
							}));
					}
				},
				fe = O2(
					N,
					j,
					async () => {
						me ? (await le({ updatePosition: X }), ue(!0)) : await X();
					},
					{ elementResize: typeof ResizeObserver == "function" },
				);
			return () => {
				(ue(!1), fe());
			};
		}, [n, se, j, k, F, j, G, B, $, h, m, v, g, _, b, p, E, x, O, P, me, le]),
			Pe(() => {
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
			(A = cn(
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
			(A = cn(A, (N) => (0, S.jsx)(Go, { value: n, children: N }), [n])),
			(A = { "data-placing": !K || void 0, ...A, style: { position: "relative", ...A.style } }),
			(A = p_({
				store: n,
				modal: r,
				portal: u,
				preserveTabOrder: s,
				preserveTabOrderAnchor: Q || F,
				autoFocusOnShow: K && o,
				...A,
				portalRef: R,
			})),
			A
		);
	}),
	rD = Ll(
		Ie(function (n) {
			return Qe(q2, im(n));
		}),
		Yo,
	),
	Q2 = "div";
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
var Y2 = Ge(function ({
		store: n,
		modal: r,
		tabIndex: u,
		alwaysVisible: s,
		autoFocusOnHide: o = !0,
		hideOnInteractOutside: f = !0,
		...h
	}) {
		const m = Fo();
		((n = n || m), Qt(n, !1));
		const v = n.useState("baseElement"),
			g = (0, w.useRef)(!1),
			_ = Zt(n.tag, (b) => b?.renderedItems.length);
		return (
			(h = u_({ store: n, alwaysVisible: s, ...h })),
			(h = im({
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
					const O = dt(x),
						z = [];
					if ((E?.id && z.push(`[aria-controls~="${E.id}"]`), x?.id && z.push(`[aria-controls~="${x.id}"]`), !z.length))
						return [...p, x];
					const D = z.join(","),
						A = O.querySelectorAll(D);
					return [...p, ...A];
				},
				autoFocusOnHide(b) {
					return Io(o, b) ? !1 : g.current ? ((g.current = !1), !1) : !0;
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
	G2 = Ll(
		Ie(function (n) {
			return Qe(Q2, Y2(n));
		}),
		Fo,
	),
	aD = (0, w.createContext)(null),
	uD = (0, w.createContext)(null),
	ql = wi([Ol], [Ho]),
	F2 = ql.useContext,
	lD = ql.useScopedContext,
	sD = ql.useProviderContext,
	oD = ql.ContextProvider,
	cD = ql.ScopedContextProvider;
function O_({ popover: e, ...n } = {}) {
	const r = Xo(
		n.store,
		Zh(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
	);
	const u = r?.getState(),
		s = g_({ ...n, store: r }),
		o = Ne(n.placement, u?.placement, "bottom"),
		f = si(
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
function N_(e, n, r) {
	return (Su(n, [r.popover]), zt(e, r, "placement"), y_(e, n, r));
}
function X2(e) {
	var n;
	const r = e.find((o) => !!o.element),
		u = [...e].reverse().find((o) => !!o.element);
	let s = (n = r?.element) == null ? void 0 : n.parentElement;
	for (; s && u?.element; ) {
		if (u && s.contains(u.element)) return s;
		s = s.parentElement;
	}
	return dt(s).body;
}
function J2(e) {
	return e?.__unstablePrivateStore;
}
function W2(e = {}) {
	var n;
	e.store;
	const r = (n = e.store) == null ? void 0 : n.getState(),
		u = Ne(e.items, r?.items, e.defaultItems, []),
		s = new Map(u.map((b) => [b.id, b])),
		o = { items: u, renderedItems: Ne(r?.renderedItems, []) },
		f = J2(e.store),
		h = si({ items: u, renderedItems: o.renderedItems }, f),
		m = si(o, e.store),
		v = (b) => {
			const p = kb(b, (E) => E.element);
			(h.setState("renderedItems", p), m.setState("renderedItems", p));
		};
	(vn(m, () => Ih(h)),
		vn(h, () =>
			Ro(h, ["items"], (b) => {
				m.setState("items", b.items);
			}),
		),
		vn(h, () =>
			Ro(h, ["renderedItems"], (b) => {
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
					O = X2(b.renderedItems),
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
			An(
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
function eM(e, n, r) {
	return (Su(n, [r.store]), zt(e, r, "items", "setItems"), e);
}
var tM = { id: null };
function Qi(e, n) {
	return e.find((r) => (n ? !r.disabled && r.id !== n : !r.disabled));
}
function nM(e, n) {
	return e.filter((r) => (n ? !r.disabled && r.id !== n : !r.disabled));
}
function Sp(e, n) {
	return e.filter((r) => r.rowId === n);
}
function iM(e, n, r = !1) {
	const u = e.findIndex((s) => s.id === n);
	return [...e.slice(u + 1), ...(r ? [tM] : []), ...e.slice(0, u)];
}
function k_(e) {
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
function M_(e) {
	let n = 0;
	for (const { length: r } of e) r > n && (n = r);
	return n;
}
function rM(e) {
	return { id: "__EMPTY_ITEM__", disabled: !0, rowId: e };
}
function aM(e, n, r) {
	const u = M_(e);
	for (const s of e)
		for (let o = 0; o < u; o += 1) {
			const f = s[o];
			if (!f || (r && f.disabled)) {
				const h = o === 0 && r ? Qi(s) : s[o - 1];
				s[o] = h && n !== h.id && r ? h : rM(h?.rowId);
			}
		}
	return e;
}
function uM(e) {
	const n = k_(e),
		r = M_(n),
		u = [];
	for (let s = 0; s < r; s += 1)
		for (const o of n) {
			const f = o[s];
			f && u.push({ ...f, rowId: f.rowId ? `${s}` : void 0 });
		}
	return u;
}
function z_(e = {}) {
	var n;
	const r = (n = e.store) == null ? void 0 : n.getState(),
		u = W2(e),
		s = Ne(e.activeId, r?.activeId, e.defaultActiveId),
		o = si(
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
	vn(o, () =>
		dn(o, ["renderedItems", "activeId"], (h) => {
			o.setState("activeId", (m) => {
				var v;
				return m !== void 0 ? m : (v = Qi(h.renderedItems)) == null ? void 0 : v.id;
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
		let j = C ? Qb(aM(k_(D), p, Q)) : D;
		if (((j = F ? ih(j) : j), (j = C ? uM(j) : j), p == null)) return (v = Qi(j)) == null ? void 0 : v.id;
		const q = j.find((P) => P.id === p);
		if (!q) return (g = Qi(j)) == null ? void 0 : g.id;
		const G = j.some((P) => P.rowId),
			B = j.indexOf(q),
			se = j.slice(B + 1),
			ee = Sp(se, q.rowId);
		if (b) {
			const P = nM(ee, p),
				le = P.slice(b)[0] || P[P.length - 1];
			return le?.id;
		}
		const K = x && (C ? x !== "horizontal" : x !== "vertical"),
			ue = G && O && (C ? O !== "horizontal" : O !== "vertical"),
			R = k ? (!G || C) && K && z : C ? z : !1;
		if (K) {
			const P = Qi(iM(ue && !R ? j : Sp(j, q.rowId), p, R), p);
			return P?.id;
		}
		if (ue) {
			const P = Qi(R ? ee : se, p);
			return R ? P?.id || null : P?.id;
		}
		const $ = Qi(ee, p);
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
			return (h = Qi(o.getState().renderedItems)) == null ? void 0 : h.id;
		},
		last: () => {
			var h;
			return (h = Qi(ih(o.getState().renderedItems))) == null ? void 0 : h.id;
		},
		next: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("next", h)),
		previous: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("previous", h)),
		down: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("down", h)),
		up: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("up", h)),
	};
}
function lM(e) {
	return { id: tr(e.id), ...e };
}
function D_(e, n, r) {
	return (
		(e = eM(e, n, r)),
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
var sM = Vo() && jb();
function oM({ tag: e, ...n } = {}) {
	const r = Xo(n.store, Fb(e, ["value", "rtl"]));
	const u = e?.getState(),
		s = r?.getState(),
		o = Ne(n.activeId, s?.activeId, n.defaultActiveId, null),
		f = z_({
			...n,
			activeId: o,
			includesBaseElement: Ne(n.includesBaseElement, s?.includesBaseElement, !0),
			orientation: Ne(n.orientation, s?.orientation, "vertical"),
			focusLoop: Ne(n.focusLoop, s?.focusLoop, !0),
			focusWrap: Ne(n.focusWrap, s?.focusWrap, !0),
			virtualFocus: Ne(n.virtualFocus, s?.virtualFocus, !0),
		}),
		h = O_({ ...n, placement: Ne(n.placement, s?.placement, "bottom-start") }),
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
		b = si(_, f, h, r);
	return (
		sM &&
			vn(b, () =>
				dn(b, ["virtualFocus"], () => {
					b.setState("virtualFocus", !1);
				}),
			),
		vn(b, () => {
			if (e)
				return An(
					dn(b, ["selectedValue"], (p) => {
						Array.isArray(p.selectedValue) && e.setValues(p.selectedValue);
					}),
					dn(e, ["values"], (p) => {
						b.setState("selectedValue", p.values);
					}),
				);
		}),
		vn(b, () =>
			dn(b, ["resetValueOnHide", "mounted"], (p) => {
				p.resetValueOnHide && (p.mounted || b.setState("value", m));
			}),
		),
		vn(b, () =>
			dn(b, ["open"], (p) => {
				p.open || (b.setState("activeId", o), b.setState("moves", 0));
			}),
		),
		vn(b, () =>
			dn(b, ["moves", "activeId"], (p, E) => {
				p.moves === E.moves && b.setState("activeValue", void 0);
			}),
		),
		vn(b, () =>
			Ro(b, ["moves", "renderedItems"], (p, E) => {
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
function cM(e) {
	const n = F2();
	return ((e = { ...e, tag: e.tag !== void 0 ? e.tag : n }), lM(e));
}
function fM(e, n, r) {
	return (
		Su(n, [r.tag]),
		zt(e, r, "value", "setValue"),
		zt(e, r, "selectedValue", "setSelectedValue"),
		zt(e, r, "resetValueOnHide"),
		zt(e, r, "resetValueOnSelect"),
		Object.assign(D_(N_(e, n, r), n, r), { tag: r.tag })
	);
}
function dM(e = {}) {
	e = cM(e);
	const [n, r] = Jo(oM, e);
	return fM(n, r, e);
}
var Md =
	'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Ul(e) {
	const n = (0, w.useRef)(null);
	((0, w.useEffect)(() => {
		const u = document.activeElement instanceof HTMLElement ? document.activeElement : null,
			s = n.current;
		return (
			(s?.querySelector("[data-dialog-initial]") ?? s?.querySelector(Md))?.focus(),
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
						(u.querySelector("[data-dialog-initial]") ?? u.querySelector(Md))?.focus();
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
		const o = [...s.querySelectorAll(Md)];
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
function j_(e) {
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
						g = gu(v) ?? Date.now();
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
var hM = ["image/", "video/", "audio/", "application/", "text/"],
	wp = 20;
function mM(e) {
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
				for (let b = 0; b < e.attachments.length; b += wp) {
					const p = e.attachments.slice(b, b + wp),
						E = await e.client.fetchJson("/api/v1/files/download-urls", {
							body: { fileNodeIds: p.map((O) => O.fileNodeId) },
						}),
						x = WR.safeParse(E);
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
function vM(e) {
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
							contentTypePrefixes: hM,
							cursor: s,
						},
					})
					.then((x) => {
						v(!1);
						const O = JR.safeParse(x);
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
		(0, S.jsxs)(Ul, {
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
var gM = 8,
	yM = 100,
	pM = 10,
	oh = new WeakMap(),
	zd = new WeakMap();
function bM(e) {
	const n = oh.get(e);
	if (n !== void 0) return Promise.resolve(n);
	const r = zd.get(e);
	if (r !== void 0) return r;
	const u = _M(e).then((s) => (s.status === "ready" && oh.set(e, s), zd.delete(e), s));
	return (zd.set(e, u), u);
}
async function _M(e) {
	const n = [];
	let r;
	for (let u = 0; u < pM; u += 1) {
		const s = await e.members.list({ limit: yM, ...(r === void 0 ? {} : { cursor: r }) });
		if ("_nay" in s) return n.length > 0 ? { status: "ready", members: n } : { status: "refused", name: s._nay.name };
		if ((n.push(...s._yay.members), s._yay.cursor === null)) return { status: "ready", members: n };
		r = s._yay.cursor;
	}
	return { status: "ready", members: n };
}
function Ep(e) {
	return `mention:${e}`;
}
function L_(e) {
	const n = (0, w.useId)(),
		[r, u] = (0, w.useState)(""),
		[s, o] = (0, w.useState)([]),
		[f, h] = (0, w.useState)(!1),
		[m, v] = (0, w.useState)(null),
		[g, _] = (0, w.useState)(null),
		b = (0, w.useRef)(new Map()),
		p = (0, w.useRef)(null),
		E = (0, w.useRef)(null),
		x = dM({
			placement: "top-start",
			resetValueOnHide: !1,
			setOpen: (j) => {
				j || _(null);
			},
		}),
		O = e.client.context.userId,
		z =
			g !== null && m !== null && m !== "loading" && m.status === "ready" ? BR(m.members, g.query, O).slice(0, gM) : [],
		D = g !== null && (m === "loading" || (m !== null && m.status === "refused") || z.length > 0),
		A = () => {
			if (m !== null) return;
			const j = oh.get(e.client);
			if (j !== void 0) {
				v(j);
				return;
			}
			(v("loading"), bM(e.client).then(v));
		},
		C = (j) => {
			if (g === null) return;
			const q = p.current?.selectionStart ?? r.length,
				G = IR(r, g.start, q, j.label);
			(b.current.set(j.userId, j.label), u(G.text), _(null), (E.current = G.caret), x.hide(), x.setValue(""));
		},
		k = () => {
			if (e.busy || e.disabled) return;
			const j = r.trim();
			if (j === "" && s.length === 0) return;
			const q = VR(b.current, j);
			(e.onSend(j, s, q), u(""), o([]), _(null), b.current.clear(), x.hide());
		},
		F = (j) => {
			const q = j.currentTarget.value,
				G = j.currentTarget.selectionStart ?? q.length;
			u(q);
			const B = $R(q, G);
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
						G = z.find((B) => Ep(B.userId) === q) ?? z[0];
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
						(0, S.jsx)(qN, {
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
							children: (0, S.jsx)(hO, { size: 18, "aria-hidden": "true" }),
						}),
						(0, S.jsx)("button", {
							type: "button",
							className: "composer-action composer-send",
							"aria-label": e.busy ? "Sending…" : "Send",
							disabled: e.busy || e.disabled,
							onClick: k,
							children: (0, S.jsx)(oO, { size: 18, "aria-hidden": "true" }),
						}),
					],
				}),
				(0, S.jsxs)(G2, {
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
							? (0, S.jsx)("div", { className: "mention-menu-status", role: "status", children: xb(m.name) })
							: null,
						z.map((j) =>
							(0, S.jsx)(
								ak,
								{
									id: Ep(j.userId),
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
					? (0, S.jsx)(vM, {
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
function SM(e) {
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
					? (h.preventDefault(), s.current[(m + 1) % lu.length]?.focus())
					: (h.key === "ArrowLeft" || h.key === "ArrowUp") &&
						(h.preventDefault(), s.current[(m + lu.length - 1) % lu.length]?.focus());
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
						children: lu.map((h, m) => {
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
									"aria-label": Sb[h],
									onKeyDown: (g) => f(g, m),
									onClick: () => {
										(e.onPick(h, v), o());
									},
									children: (0, S.jsx)("span", { "aria-hidden": "true", children: _b[h] }),
								},
								h,
							);
						}),
					})
				: null,
		],
	});
}
var q_ = 1440 * 60 * 1e3,
	wM = 300 * 1e3;
function EM(e) {
	return new Date(e).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" });
}
function ch(e) {
	return new Date(e).toLocaleDateString(void 0, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}
function TM(e, n) {
	const r = new Date(e).toDateString();
	return r === new Date(n).toDateString() ? "Today" : r === new Date(n - q_).toDateString() ? "Yesterday" : ch(e);
}
function xM(e) {
	if (e == null) return "•";
	const n = e.split(/\s+/u).filter((u) => u !== "");
	if (n.length === 0) return "•";
	const r = n.length > 1 ? n[n.length - 1][0] : "";
	return `${n[0][0]}${r}`.toUpperCase();
}
function U_(e, n, r = null) {
	const u = [];
	let s = null,
		o = !1;
	for (const f of e) {
		const h = s !== null && new Date(s.timestamp).toDateString() !== new Date(f.timestamp).toDateString();
		h && u.push({ kind: "divider", key: `divider:${f.key}`, label: TM(f.timestamp, n) });
		const m =
			!o && r !== null && f.timestamp > r.lastReadAt && f.createdBy !== r.selfUserId && f.value.deletedAt === null;
		m && ((o = !0), u.push({ kind: "new", key: `new:${f.key}` }));
		const v = s !== null && !h && !m && s.createdBy === f.createdBy && f.timestamp - s.timestamp <= wM;
		(u.push({ kind: "message", doc: f, isContinuation: v }), (s = f));
	}
	return u;
}
function AM(e, n, r) {
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
function fh(e) {
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
	const D = (B, se) => {
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
						(e.onApplyLocal({ ...u, value: B, revision: ee._yay.revision, updatedAt: Date.now() }), se());
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
		F = (B, se) => {
			if ((p(null), e.reactionGroups === "unknown" && se)) {
				p("Reactions on this message could not be loaded, so they can't be removed right now.");
				return;
			}
			const ee = se;
			n.data
				.putOwned({ collection: "reactions", key: MR(u.key, B), value: ee ? { removed: !0 } : {} })
				.then((K) => {
					if ("_nay" in K) {
						if (K._nay.name === "storage_full") {
							e.onStorageFull(K._nay.message);
							return;
						}
						p(K._nay.message);
						return;
					}
					e.onApplyReaction({
						key: K._yay.key,
						targetKey: u.key,
						token: B,
						createdBy: e.selfUserId,
						revision: K._yay.revision,
						updatedAt: Date.now(),
						removed: ee,
					});
				})
				.catch((K) => {
					p(Xn(K));
				});
		},
		Q = u.value.deletedAt !== null,
		j = e.authorName === null ? "Former member" : (e.authorName ?? "…"),
		q = Date.now() - u.timestamp < 7 * q_,
		G = e.onOpenThread !== null && typeof e.replyCount == "number" && e.replyCount > 0;
	return (0, S.jsxs)("li", {
		className: e.isContinuation ? "message is-continuation" : "message is-leader",
		"data-key": u.key,
		children: [
			(0, S.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: xM(e.authorName) }),
			(0, S.jsxs)("div", {
				className: e.isContinuation ? "message-head visually-hidden" : "message-head",
				children: [
					(0, S.jsx)("span", { className: "message-author", children: j }),
					(0, S.jsxs)("time", {
						className: "message-time",
						dateTime: new Date(u.timestamp).toISOString(),
						children: [
							q ? (0, S.jsxs)("span", { className: "visually-hidden", children: [ch(u.timestamp), " "] }) : null,
							(0, S.jsx)("span", { className: "message-clock", children: q ? EM(u.timestamp) : ch(u.timestamp) }),
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
										AM(u.value, e.memberNames, e.selfUserId),
										u.value.editedAt !== null
											? (0, S.jsx)("span", { className: "message-edited", children: " (edited)" })
											: null,
									],
								}),
								u.value.attachments.length > 0 ? (0, S.jsx)(mM, { client: n, attachments: u.value.attachments }) : null,
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
															"aria-label": `${Sb[B.token]}, ${B.count} ${B.count === 1 ? "reaction" : "reactions"}`,
															onClick: () => F(B.token, B.reactedByMe),
															children: [
																(0, S.jsx)("span", { "aria-hidden": "true", children: _b[B.token] }),
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
													children: `${nO(e.replyCount, e.repliesHasMore)} ${e.replyCount === 1 ? "reply" : "replies"}`,
												}),
												e.replyLatestAt !== null
													? (0, S.jsx)("span", {
															className: "message-thread-summary-recency",
															children: `Last reply ${$o(e.replyLatestAt, Date.now())}`,
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
							(0, S.jsx)(SM, { groups: e.reactionGroups === "unknown" ? [] : e.reactionGroups, onPick: F }),
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
				? (0, S.jsxs)(Ul, {
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
function $_(e) {
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
function Dd(e, n) {
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
function CM(e) {
	const { client: n, userId: r, root: u, memberNames: s, replies: o, repliesLoaded: f } = e,
		h = (0, w.useRef)(null);
	(0, w.useEffect)(() => {
		h.current?.focus();
	}, []);
	const m = j_({
		client: n,
		collection: "replies",
		keyPrefix: Eb(u.key),
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
		g = U_([...o].reverse(), Date.now());
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
				children: (0, S.jsx)(fh, {
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
													fh,
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
								m.pending.map((_) => (0, S.jsx)($_, { pending: _, onRetry: () => m.retry(_) }, _.clientRequestId)),
							],
						})
				: (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading replies…" }),
			e.storageFull !== null
				? (0, S.jsx)("div", { className: "channel-status is-error", role: "alert", children: e.storageFull })
				: null,
			(0, S.jsx)(L_, {
				client: n,
				label: "Reply in thread",
				busy: m.busy,
				disabled: e.storageFull !== null || e.repliesError !== null,
				onSend: m.send,
			}),
		],
	});
}
var RM = 15e3;
function B_(e, n) {
	return e.incomplete || e.death !== null ? !1 : !e.hasMore || (e.deepestRoot !== null && n < e.deepestRoot);
}
var Do = 55,
	co = 100;
function OM(e) {
	let n = null;
	for (const r of e) (n === null || r.updatedAt > n) && (n = r.updatedAt);
	return n;
}
function NM(e) {
	if (typeof e != "object" || e === null) return null;
	const n = e.key;
	return typeof n == "string" ? n : null;
}
function jd(e) {
	let n = null;
	for (const r of e) {
		if (typeof r != "object" || r === null) continue;
		const u = r.updatedAt;
		typeof u == "number" && Number.isFinite(u) && (n === null || u > n) && (n = u);
	}
	return n;
}
function Ld(e) {
	return e.newest === null
		? null
		: e.truncated && e.newest === e.current
			? e.newest + 1
			: e.newest > e.current
				? e.newest
				: null;
}
function qd(e, n) {
	return e.filter((r) => {
		const u = NM(r);
		return u !== null && u.startsWith(n);
	});
}
function Ud(e, n) {
	return e.fetchJson("/api/v1/plugin-data/list", { body: n }).then((r) => {
		const u = Ab.safeParse(r);
		if (!u.success) throw new Error("Unexpected response from the document list");
		return u.data;
	});
}
function kM(e, n, r) {
	if (e.incomplete || e.death !== null) return "unknown";
	const u = n.get(r);
	return u !== void 0 && u.length > 0 ? u : B_(e, r.slice(0, Do)) ? (u ?? []) : "unknown";
}
function MM(e, n, r) {
	if (e.incomplete || e.death !== null) return "unknown";
	const u = n.get(r);
	return u !== void 0 && u.count > 0 ? u.count : B_(e, r.slice(0, Do)) ? (u?.count ?? 0) : "unknown";
}
var Tp = 420,
	fo = 244,
	$d = 340,
	xp = 16;
function zM(e) {
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
function DM(e) {
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
		[B, se] = (0, w.useState)(null),
		[ee, K] = (0, w.useState)({ kind: "idle" }),
		[ue, R] = (0, w.useState)($d),
		[$, P] = (0, w.useState)(0),
		[le, me] = (0, w.useState)(null),
		[Re, N] = (0, w.useState)(null),
		[X, re] = (0, w.useState)(null),
		[fe, ge] = (0, w.useState)(!1),
		[be, Se] = (0, w.useState)(!1),
		[Fe, De] = (0, w.useState)(null),
		Ke = (0, w.useRef)(null),
		Et = (0, w.useRef)(null),
		Tt = (0, w.useRef)(null),
		Kt = (0, w.useRef)(null),
		Be = (0, w.useRef)(null),
		ce = (0, w.useRef)(null),
		Ee = (0, w.useRef)(null),
		Ye = (0, w.useRef)(null),
		ze = (0, w.useRef)(null),
		yt = (0, w.useRef)({ reactions: null, replies: null }),
		rt = (0, w.useRef)({ reactions: !1, replies: !1 }),
		ae = (0, w.useRef)({ reactions: !1, replies: !1 }),
		Ae = (0, w.useRef)(!1),
		lt = (0, w.useRef)(null),
		Oe = (0, w.useRef)(u.value.name),
		pt = (0, w.useRef)(null),
		Ft = (0, w.useRef)(new Map()),
		st = (0, w.useRef)(null),
		Xt = (0, w.useRef)(null),
		ba = (0, w.useRef)(0),
		fn = uo(u.key),
		Ei = ai(u.key) ? u.key : void 0;
	(0, w.useEffect)(() => {
		Oe.current = u.value.name;
	}, [u.value.name]);
	const Tu = (Z) => {
			const oe = Et.current;
			oe !== null && (oe.apply_window(Z), F(oe.get_sorted()));
		},
		gn = (Z) => {
			const oe = Ke.current;
			if (oe === null) return [];
			const we = oe.apply_window(Z);
			return (b(oe.get_sorted()), we);
		},
		Yt = (Z, oe, we, ot) => {
			const Nt = oe.length > 0 ? oe[oe.length - 1].key.slice(0, Do) : null;
			oe.length > 0 && (yt.current[Z] = oe[oe.length - 1].key);
			const ht = {
				hasMore: oe.length === 0 ? !1 : !we,
				deepestRoot: Nt ?? (Z === "reactions" ? Be.current?.deepestRoot : ce.current?.deepestRoot) ?? null,
				incomplete: ot,
				death: (Z === "reactions" ? Be.current?.death : ce.current?.death) ?? null,
			};
			Z === "reactions"
				? ((Be.current = ht), j(ht), ot || (ae.current.reactions = !1))
				: ((ce.current = ht), G(ht), ot || (ae.current.replies = !1));
		},
		en = (Z) => {
			if (rt.current[Z] || (Z === "reactions" ? Be.current : ce.current)?.death != null) return;
			rt.current[Z] = !0;
			const oe = yt.current[Z];
			Ud(n, { collection: Z, keyPrefix: fn, ...(oe === null ? {} : { keyStartExclusive: oe }), limit: co })
				.then((we) => {
					if (((rt.current[Z] = !1), Z === "reactions")) {
						const ot = Tt.current;
						if (ot === null) return;
						const Nt = ot.apply_window(we.documents);
						(C(ot.get_sorted()), Yt("reactions", Nt, we.isDone, !1));
					} else {
						const ot = Et.current;
						if (ot === null) return;
						const Nt = ot.apply_window(we.documents);
						(F(ot.get_sorted()), Yt("replies", Nt, we.isDone, !1));
					}
					qr();
				})
				.catch(() => {
					((rt.current[Z] = !1),
						Yt(Z, [], !0, !0),
						ae.current[Z] ||
							((ae.current[Z] = !0),
							queueMicrotask(() => {
								en(Z);
							})));
				});
		},
		jt = (Z) => {
			const oe = Z === "reactions" ? Be.current : ce.current;
			oe === null || !oe.incomplete || oe.death !== null || en(Z);
		},
		qr = () => {
			const Z = Ee.current;
			if (Z !== null)
				for (const oe of ["reactions", "replies"]) {
					const we = oe === "reactions" ? Be.current : ce.current;
					we === null ||
						!we.hasMore ||
						we.incomplete ||
						we.death !== null ||
						((we.deepestRoot === null || we.deepestRoot < Z) && en(oe));
				}
		},
		oi = (Z) => {
			if (Ae.current) return;
			const oe = OM(Z);
			oe !== null && ((Ae.current = !0), me(oe), N(oe), re(oe));
		};
	(0, w.useEffect)(() => {
		const Z = Ed(Co);
		((Ke.current = Z),
			(Et.current = Ed(Co)),
			(Tt.current = Ed(KR)),
			(Ae.current = !1),
			(yt.current = { reactions: null, replies: null }),
			(rt.current = { reactions: !1, replies: !1 }),
			(ae.current = { reactions: !1, replies: !1 }),
			(Be.current = null),
			(ce.current = null),
			me(null),
			N(null),
			re(null));
		const oe = n.data.watchWindow({ collection: "messages", keyPrefix: uo(u.key), pageSize: 100 }, (we, ot) => {
			if (we === null) {
				O({ reason: ot?.reason });
				return;
			}
			const Nt = Z.apply_window(we.docs);
			(b(Z.get_sorted()), E(!0), D({ hasMore: we.hasMore, atCapacity: we.atCapacity, incomplete: we.incomplete }));
			const ht = Nt.reduce((Ct, ti) => (Ct === null || ti.key > Ct ? ti.key : Ct), null);
			((Ye.current = ht),
				(Ee.current = ht === null ? null : ht.slice(0, Do)),
				oi(Nt),
				Be.current === null && !rt.current.reactions && en("reactions"),
				ce.current === null && !rt.current.replies && en("replies"),
				qr());
			const rn = pt.current;
			if (rn === null) {
				pt.current = new Set(Nt.map((Ct) => Ct.key));
				return;
			}
			const ir = Nt.filter((Ct) => !rn.has(Ct.key) && Ct.createdBy !== r && Ct.value.deletedAt === null);
			for (const Ct of Nt) rn.add(Ct.key);
			if (ir.length === 1) {
				const Ct = ir[0];
				s.resolve([Ct.createdBy])
					.then(() => {
						const ti = s.get(Ct.createdBy) ?? null,
							xi = Ct.value.text,
							rr = xi.length > 80 ? `${xi.slice(0, 80)}…` : xi;
						o(`${ti ?? "Former member"}: ${rr}`);
					})
					.catch(() => {
						o(`New message in #${Oe.current}`);
					});
			} else ir.length > 1 && o(`${ir.length} new messages in #${Oe.current}`);
		});
		return (
			(Kt.current = oe),
			() => {
				((Kt.current = null), oe.unsubscribe());
			}
		);
	}, [n, u.key, r, s, o]);
	const Ur = Ei === void 0 ? {} : { scopeId: Ei };
	((0, w.useEffect)(() => {
		if (le !== null)
			return n.data.watchChanges({ collection: "messages", limit: 100, updatedSince: le, ...Ur }, (Z, oe) => {
				if (Z === null) {
					O({ reason: oe?.reason });
					return;
				}
				const we = Ke.current;
				if (we === null) return;
				const ot = qd(Z.docs, fn);
				(we.apply_window(ot),
					b(we.get_sorted()),
					Z.truncated &&
						Ye.current !== null &&
						Ud(n, { collection: "messages", keyPrefix: fn, keyStartExclusive: Ye.current, limit: co })
							.then((rn) => {
								gn(rn.documents);
							})
							.catch(() => {}));
				const Nt = jd(Z.docs),
					ht = Ld({ current: le, newest: Nt, truncated: Z.truncated });
				ht !== null && me(ht);
			});
	}, [n, u.key, le, Ei, fn]),
		(0, w.useEffect)(() => {
			if (Re !== null)
				return n.data.watchChanges({ collection: "replies", limit: 100, updatedSince: Re, ...Ur }, (Z, oe) => {
					if (Z === null) {
						const rn = {
							...(ce.current ?? { hasMore: !1, deepestRoot: null, incomplete: !1, death: null }),
							incomplete: !1,
							death: { reason: oe?.reason },
						};
						((ce.current = rn), G(rn));
						return;
					}
					const we = Et.current;
					if (we === null) return;
					const ot = qd(Z.docs, fn);
					(we.apply_window(ot), F(we.get_sorted()), jt("replies"));
					const Nt = jd(Z.docs),
						ht = Ld({ current: Re, newest: Nt, truncated: Z.truncated });
					ht !== null && N(ht);
				});
		}, [n, u.key, Re, Ei, fn]),
		(0, w.useEffect)(() => {
			if (X !== null)
				return n.data.watchChanges({ collection: "reactions", limit: 100, updatedSince: X, ...Ur }, (Z, oe) => {
					if (Z === null) {
						const rn = {
							...(Be.current ?? { hasMore: !1, deepestRoot: null, incomplete: !1, death: null }),
							incomplete: !1,
							death: { reason: oe?.reason },
						};
						((Be.current = rn), j(rn));
						return;
					}
					const we = Tt.current;
					if (we === null) return;
					const ot = qd(Z.docs, fn);
					(we.apply_window(ot), C(we.get_sorted()), jt("reactions"));
					const Nt = jd(Z.docs),
						ht = Ld({ current: X, newest: Nt, truncated: Z.truncated });
					ht !== null && re(ht);
				});
		}, [n, u.key, X, Ei, fn]),
		(0, w.useEffect)(() => {
			const Z = () => {
				document.visibilityState === "visible" && (jt("reactions"), jt("replies"));
			};
			return (
				document.addEventListener("visibilitychange", Z),
				() => document.removeEventListener("visibilitychange", Z)
			);
		}, [n, u.key]),
		(0, w.useEffect)(() => {
			if (f === null) {
				(ge(!0), Se(!1), De(null));
				return;
			}
			let Z = !1;
			return (
				ge(!1),
				Se(!1),
				De(null),
				Ud(n, { collection: "replies", keyPrefix: Eb(f), limit: co })
					.then((oe) => {
						Z || (Tu(oe.documents), Se(!oe.isDone), ge(!0));
					})
					.catch((oe) => {
						Z || (De(Xn(oe)), ge(!0));
					}),
				() => {
					Z = !0;
				}
			);
		}, [n, f]));
	const yn = (0, w.useRef)(null),
		ci = (Z, oe) => {
			n.data
				.put({
					collection: "channels",
					key: Z.key,
					value: { ...Z.value, lastMessageAt: oe },
					expectedRevision: Z.revision,
				})
				.then((we) => {
					"_nay" in we && we._nay.name === "conflict" && yn.current === null && (yn.current = oe);
				})
				.catch(() => {});
		};
	(0, w.useEffect)(() => {
		const Z = yn.current;
		Z !== null && ((yn.current = null), (u.value.lastMessageAt ?? 0) < Z && ci(u, Z));
	}, [u]);
	const tn = j_({
		client: n,
		collection: "messages",
		keyPrefix: uo(u.key),
		userId: r,
		onDelivered: (Z) => {
			(Ke.current?.apply_local(Z),
				pt.current?.add(Z.key),
				b(Ke.current?.get_sorted() ?? []),
				ai(u.key) && Z.timestamp - (u.value.lastMessageAt ?? 0) >= RM && ci(u, Z.timestamp));
		},
		onStorageFull: se,
	});
	((0, w.useEffect)(() => {
		const Z = new Set();
		for (const oe of _) {
			Z.add(oe.createdBy);
			for (const we of oe.value.mentions ?? []) Z.add(we);
		}
		for (const oe of k) {
			Z.add(oe.createdBy);
			for (const we of oe.value.mentions ?? []) Z.add(we);
		}
		Z.size > 0 && s.resolve([...Z]);
	}, [_, k, s]),
		(0, w.useEffect)(() => {
			_.length > 0 && v(_[0].timestamp);
		}, [_, v]),
		(0, w.useEffect)(() => {
			const Z = _.length > 0 ? _[0].key : null,
				oe = Z !== null && Z !== Xt.current,
				we = tn.pending.length > ba.current;
			((Xt.current = Z),
				(ba.current = tn.pending.length),
				(oe || we) && st.current && (st.current.scrollTop = st.current.scrollHeight));
		}, [_, tn.pending.length]));
	const Rn = () => {
			Kt.current?.loadOlder();
		},
		Ti = () => {
			const Z = ze.current ?? Ye.current;
			Z !== null &&
				(K({ kind: "loading" }),
				n
					.fetchJson("/api/v1/plugin-data/list", {
						body: { collection: "messages", keyPrefix: uo(u.key), keyStartExclusive: Z, limit: co },
					})
					.then((oe) => {
						const we = Ab.safeParse(oe);
						if (!we.success) {
							K({ kind: "failed", message: "Unexpected response for older messages.", retryAt: null });
							return;
						}
						const ot = Ke.current;
						if (ot === null) return;
						const Nt = ot.apply_window(we.data.documents);
						b(ot.get_sorted());
						for (const ht of Nt)
							(pt.current?.add(ht.key), (ze.current === null || ht.key > ze.current) && (ze.current = ht.key));
						K(we.data.isDone ? { kind: "exhausted" } : { kind: "idle" });
					})
					.catch((oe) => {
						if (oe.status !== 429) {
							K({ kind: "failed", message: Xn(oe), retryAt: null });
							return;
						}
						const we = zM(oe.responseText) ?? 1e3;
						K({
							kind: "failed",
							message: "Older messages are being loaded too quickly. Waiting a moment before you can try again.",
							retryAt: Date.now() + we,
						});
					}));
		};
	((0, w.useEffect)(() => {
		if (ee.kind !== "failed" || ee.retryAt === null) return;
		const Z = setTimeout(
			() => {
				K({ kind: "idle" });
			},
			Math.max(0, ee.retryAt - Date.now()),
		);
		return () => {
			clearTimeout(Z);
		};
	}, [ee]),
		(0, w.useEffect)(() => {
			const Z = lt.current;
			if (f === null || Z === null) return;
			P(Z.clientWidth);
			const oe = new ResizeObserver(() => P(Z.clientWidth));
			return (oe.observe(Z), () => oe.disconnect());
		}, [f]));
	const J = (Z) => {
			const oe = Math.max(fo, $ - Tp);
			return Math.min(oe, Math.max(fo, Z));
		},
		de = (Z) => {
			Z.key === "ArrowLeft"
				? (Z.preventDefault(), R(J(ue + xp)))
				: Z.key === "ArrowRight"
					? (Z.preventDefault(), R(J(ue - xp)))
					: Z.key === "Home" && (Z.preventDefault(), R(J($d)));
		},
		xe = (Z) => {
			(Z.preventDefault(), Z.currentTarget.setPointerCapture(Z.pointerId));
		},
		_e = (Z) => {
			if (!Z.currentTarget.hasPointerCapture(Z.pointerId)) return;
			const oe = lt.current?.getBoundingClientRect();
			oe !== void 0 && R(J(oe.right - Z.clientX));
		},
		at = (0, w.useMemo)(() => eO(A, r), [A, r]),
		ut = (0, w.useMemo)(() => tO(k), [k]),
		nn = (Z) => {
			(Ke.current?.apply_local(Z), b(Ke.current?.get_sorted() ?? []));
		},
		xt = (Z) => {
			(Et.current?.apply_local(Z), F(Et.current?.get_sorted() ?? []));
		},
		ei = (Z) => {
			(Tt.current?.apply_local(Z), C(Tt.current?.get_sorted() ?? []));
		},
		Un = f === null ? [] : k.filter((Z) => xh(Z.key) === f),
		At = () => {
			const Z = f;
			(h(null), Z !== null && Ft.current.get(Z)?.focus());
		},
		fi = f === null ? null : (_.find((Z) => Z.key === f) ?? null),
		$r = U_([..._].reverse(), Date.now(), g === null ? null : { lastReadAt: g, selfUserId: r }),
		di = Math.max(fo, $ - Tp),
		Lt = J(ue);
	return x !== null
		? (0, S.jsx)("div", {
				className: "channel",
				children: (0, S.jsx)("div", {
					className: "channel-dead",
					role: "alert",
					children: Dd(x.reason, `messages in #${u.value.name}`),
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
									ai(u.key) ? (0, S.jsx)("p", { className: "channel-privacy", children: Eh }) : null,
								],
							}),
							u.value.archivedAt !== null
								? (0, S.jsx)("span", { className: "channel-archived-badge", children: "Archived" })
								: null,
						],
					}),
					(0, S.jsxs)("div", {
						ref: lt,
						className: "channel-body",
						style: { "--thread-width": `${Lt}px` },
						children: [
							(0, S.jsxs)("div", {
								ref: st,
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
													onClick: Rn,
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
																onClick: Ti,
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
												children: Dd(Q.death.reason, "reactions in this channel"),
											})
										: null,
									q.death !== null
										? (0, S.jsx)("div", {
												className: "channel-status is-error",
												role: "alert",
												children: Dd(q.death.reason, "reply counts in this channel"),
											})
										: null,
									p
										? _.length === 0 && tn.pending.length === 0
											? (0, S.jsx)("div", { className: "channel-status", children: "No messages yet" })
											: (0, S.jsxs)("ul", {
													className: "message-list",
													children: [
														$r.map((Z) =>
															Z.kind === "divider"
																? (0, S.jsx)("li", { className: "day-divider", children: Z.label }, Z.key)
																: Z.kind === "new"
																	? (0, S.jsx)(
																			"li",
																			{
																				className: "new-divider",
																				children: (0, S.jsx)("span", {
																					className: "new-divider-label",
																					children: "New messages",
																				}),
																			},
																			Z.key,
																		)
																	: (0, S.jsx)(
																			fh,
																			{
																				client: n,
																				collection: "messages",
																				doc: Z.doc,
																				isOwn: Z.doc.createdBy === r,
																				selfUserId: r,
																				memberNames: s,
																				isContinuation: Z.isContinuation,
																				authorName: s.get(Z.doc.createdBy),
																				reactionGroups: kM(Q, at, Z.doc.key),
																				replyCount: MM(q, ut, Z.doc.key),
																				replyLatestAt: ut.get(Z.doc.key)?.latestAt ?? null,
																				repliesHasMore: q.hasMore,
																				onOpenThread: (oe) => h(oe.key),
																				replyTriggerRef: (oe) => {
																					oe === null ? Ft.current.delete(Z.doc.key) : Ft.current.set(Z.doc.key, oe);
																				},
																				onApplyLocal: nn,
																				onApplyReaction: ei,
																				onStorageFull: se,
																			},
																			Z.doc.key,
																		),
														),
														tn.pending.map((Z) =>
															(0, S.jsx)($_, { pending: Z, onRetry: () => tn.retry(Z) }, Z.clientRequestId),
														),
													],
												})
										: (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading messages…" }),
								],
							}),
							fi !== null
								? (0, S.jsx)("div", {
										className: "thread-resize",
										role: "separator",
										tabIndex: 0,
										"aria-orientation": "vertical",
										"aria-label": "Resize thread panel",
										"aria-valuenow": Lt,
										"aria-valuemin": fo,
										"aria-valuemax": di,
										onKeyDown: de,
										onPointerDown: xe,
										onPointerMove: _e,
										onDoubleClick: () => R(J($d)),
									})
								: null,
							fi !== null
								? (0, S.jsx)(
										CM,
										{
											client: n,
											userId: r,
											root: fi,
											replies: Un,
											repliesLoaded: fe,
											repliesTruncated: be,
											repliesError: Fe,
											reactionGroupsByTarget: at,
											memberNames: s,
											isNarrow: m,
											storageFull: B,
											onStorageFull: se,
											onApplyLocalRoot: nn,
											onApplyLocalReply: xt,
											onApplyReaction: ei,
											onClose: At,
										},
										fi.key,
									)
								: null,
						],
					}),
					B !== null ? (0, S.jsx)("div", { className: "channel-status is-error", role: "alert", children: B }) : null,
					(0, S.jsx)(L_, {
						client: n,
						label: `Message #${u.value.name}`,
						busy: tn.busy,
						disabled: B !== null,
						onSend: tn.send,
					}),
				],
			});
}
var $l = wi([Ol], [Ho]),
	jM = $l.useContext,
	LM = $l.useScopedContext,
	fD = $l.useProviderContext,
	dD = $l.ContextProvider,
	hD = $l.ScopedContextProvider,
	mD = (0, w.createContext)(void 0),
	Bl = wi([Kb], [Go]),
	vD = Bl.useContext,
	gD = Bl.useScopedContext,
	rm = Bl.useProviderContext,
	qM = Bl.ContextProvider,
	I_ = Bl.ScopedContextProvider,
	Il = wi([Ol, qM], [Ho, I_]),
	UM = Il.useContext,
	$M = Il.useScopedContext,
	ac = Il.useProviderContext,
	V_ = Il.ContextProvider,
	BM = Il.ScopedContextProvider,
	yD = (0, w.createContext)(void 0),
	IM = "div",
	Yi = "";
function Bd() {
	Yi = "";
}
function VM(e) {
	const n = e.target;
	return n && Si(n)
		? !1
		: e.key === " " && Yi.length
			? !0
			: e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey && /^[\p{Letter}\p{Number}]$/u.test(e.key);
}
function ZM(e, n) {
	if (Ln(e)) return !0;
	const r = e.target;
	return r ? n.some((u) => u.element === r) : !1;
}
function HM(e) {
	return e.filter((n) => !n.disabled);
}
function go(e, n) {
	var r;
	const u = ((r = e.element) == null ? void 0 : r.textContent) || e.children || ("value" in e && e.value);
	return u ? zb(u).trim().toLowerCase().startsWith(n.toLowerCase()) : !1;
}
function PM(e, n, r) {
	if (!r) return e;
	const u = e.find((s) => s.id === r);
	return !u || !go(u, n) || (Yi !== n && go(u, Yi))
		? e
		: ((Yi = n),
			bO(
				e.filter((s) => go(s, Yi)),
				r,
			).filter((s) => s.id !== r));
}
var am = Ge(function ({ store: n, typeahead: r = !0, ...u }) {
		const s = Dh();
		((n = n || s), Qt(n, !1));
		const o = u.onKeyDownCapture,
			f = (0, w.useRef)(0),
			h = Ce((m) => {
				if ((o?.(m), m.defaultPrevented || !r || !n)) return;
				if (!VM(m)) return Bd();
				const { renderedItems: v, items: g, activeId: _, id: b } = n.getState();
				let p = HM(g.length > v.length ? g : v);
				const E = dt(m.currentTarget),
					x = `[data-offscreen-id="${b}"]`,
					O = E.querySelectorAll(x);
				for (const A of O) {
					const C = A.ariaDisabled === "true" || ("disabled" in A && !!A.disabled);
					p.push({ id: A.id, element: A, disabled: C });
				}
				if ((O.length && (p = kb(p, (A) => A.element)), !ZM(m, p))) return Bd();
				(m.preventDefault(),
					window.clearTimeout(f.current),
					(f.current = window.setTimeout(() => {
						Yi = "";
					}, 500)));
				const z = m.key.toLowerCase();
				((Yi += z), (p = PM(p, z, _)));
				const D = p.find((A) => go(A, Yi));
				D ? n.move(D.id) : Bd();
			});
		return ((u = { ...u, onKeyDownCapture: h }), ya(u));
	}),
	pD = Ie(function (n) {
		return Qe(IM, am(n));
	}),
	QM = "div";
function KM({ store: e, ...n }) {
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
var Z_ = Ge(function ({ store: n, alwaysVisible: r, composite: u, ...s }) {
		const o = ac();
		((n = n || o), Qt(n, !1));
		const f = n.parent,
			h = n.menubar,
			m = !!f,
			v = tr(s.id),
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
		s = cn(s, (C) => (0, S.jsx)(BM, { value: n, children: C }), [n]);
		const O = KM({ store: n, ...s }),
			z = Wo(n.useState("mounted"), s.hidden, r),
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
			(s = qh({ store: n, composite: u, ...s })),
			(s = am({ store: n, typeahead: !A, ...s })),
			s
		);
	}),
	bD = Ie(function (n) {
		return Qe(QM, Z_(n));
	});
function Id(e) {
	return [e.clientX, e.clientY];
}
function Ap(e, n) {
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
function YM(e, n) {
	const { top: r, right: u, bottom: s, left: o } = n,
		[f, h] = e;
	return [f < o ? "left" : f > u ? "right" : null, h < r ? "top" : h > s ? "bottom" : null];
}
function Cp(e, n) {
	const r = e.getBoundingClientRect(),
		{ top: u, right: s, bottom: o, left: f } = r,
		[h, m] = YM(n, r),
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
var GM = "div";
function H_(e, n, r, u) {
	return Or(n) ? !0 : e ? !!(Pt(n, e) || (r && Pt(r, e)) || u?.some((s) => H_(e, s, r))) : !1;
}
function FM({ store: e, ...n }) {
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
				dn(e, ["anchorElement"], (m) => {
					h.current = m.anchorElement;
				}),
			[],
		),
		(n = { autoFocusOnHide: r, finalFocus: h, ...n, onFocus: f }),
		n
	);
}
var Rp = (0, w.createContext)(null),
	P_ = Ge(function ({
		store: n,
		modal: r = !1,
		portal: u = !!r,
		hideOnEscape: s = !0,
		hideOnHoverOutside: o = !0,
		disablePointerEventsOnApproach: f = !!o,
		...h
	}) {
		const m = rm();
		((n = n || m), Qt(n, !1));
		const v = (0, w.useRef)(null),
			[g, _] = (0, w.useState)([]),
			b = (0, w.useRef)(0),
			p = (0, w.useRef)(null),
			{ portalRef: E, domReady: x } = kh(u, h.portalRef),
			O = Mh(),
			z = !!o,
			D = vt(o),
			A = !!f,
			C = vt(f),
			k = n.useState("open"),
			F = n.useState("mounted");
		((0, w.useEffect)(() => {
			if (!x || !F || (!z && !A)) return;
			const B = v.current;
			return B
				? An(
						on(
							"mousemove",
							(ee) => {
								if (!n || !O()) return;
								const { anchorElement: K, hideTimeout: ue, timeout: R } = n.getState(),
									$ = p.current,
									[P] = ee.composedPath(),
									le = K;
								if (H_(P, B, le, g)) {
									((p.current = P && le && Pt(le, P) ? Id(ee) : null), window.clearTimeout(b.current), (b.current = 0));
									return;
								}
								if (!b.current) {
									if ($) {
										const me = Id(ee);
										if (Ap(me, Cp(B, $))) {
											if (((p.current = me), !C(ee))) return;
											(ee.preventDefault(), ee.stopPropagation());
											return;
										}
									}
									D(ee) &&
										(b.current = window.setTimeout(() => {
											((b.current = 0), n?.hide());
										}, ue ?? R));
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
				const B = (se) => {
					const ee = v.current;
					if (!ee) return;
					const K = p.current;
					if (!K) return;
					const ue = Cp(ee, K);
					if (Ap(Id(se), ue)) {
						if (!C(se)) return;
						(se.preventDefault(), se.stopPropagation());
					}
				};
				return An(on("mouseenter", B, !0), on("mouseover", B, !0), on("mouseout", B, !0), on("mouseleave", B, !0));
			}, [x, F, A, C]),
			(0, w.useEffect)(() => {
				x && (k || n?.setAutoFocusOnShow(!1));
			}, [n, x, k]));
		const Q = $b(k);
		(0, w.useEffect)(() => {
			if (x)
				return () => {
					Q.current || n?.setAutoFocusOnShow(!1);
				};
		}, [n, x]);
		const j = (0, w.useContext)(Rp);
		Pe(() => {
			if (r || !u || !F || !x) return;
			const B = v.current;
			if (B) return j?.(B);
		}, [r, u, F, x]);
		const q = (0, w.useCallback)(
			(B) => {
				_((ee) => [...ee, B]);
				const se = j?.(B);
				return () => {
					(_((ee) => ee.filter((K) => K !== B)), se?.());
				};
			},
			[j],
		);
		((h = cn(h, (B) => (0, S.jsx)(I_, { value: n, children: (0, S.jsx)(Rp.Provider, { value: q, children: B }) }), [
			n,
			q,
		])),
			(h = { ...h, ref: Dt(v, h.ref) }),
			(h = FM({ store: n, ...h })));
		const G = n.useState((B) => r || B.autoFocusOnShow);
		return (
			(h = im({
				store: n,
				modal: r,
				portal: u,
				autoFocusOnShow: G,
				...h,
				portalRef: E,
				hideOnEscape(B) {
					return Io(s, B)
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
	_D = Ll(
		Ie(function (n) {
			return Qe(GM, P_(n));
		}),
		rm,
	),
	XM = "div",
	JM = Ge(function ({
		store: n,
		modal: r = !1,
		portal: u = !!r,
		hideOnEscape: s = !0,
		autoFocusOnShow: o = !0,
		hideOnHoverOutside: f,
		alwaysVisible: h,
		...m
	}) {
		const v = ac();
		((n = n || v), Qt(n, !1));
		const g = (0, w.useRef)(null),
			_ = n.parent,
			b = n.menubar,
			p = !!_,
			E = !!b && !p;
		m = { ...m, ref: Dt(g, m.ref) };
		const { "aria-labelledby": x, ...O } = Z_({ store: n, alwaysVisible: h, ...m });
		m = O;
		const [z, D] = (0, w.useState)(),
			A = n.useState("autoFocusOnShow"),
			C = n.useState("initialFocus"),
			k = n.useState("baseElement"),
			F = n.useState("renderedItems");
		(0, w.useEffect)(() => {
			let ee = !1;
			return (
				D((K) => {
					var ue, R, $;
					if (ee || !A) return;
					if ((ue = K?.current) != null && ue.isConnected) return K;
					const P = (0, w.createRef)();
					switch (C) {
						case "first":
							P.current = ((R = F.find((le) => !le.disabled && le.element)) == null ? void 0 : R.element) || null;
							break;
						case "last":
							P.current =
								(($ = [...F].reverse().find((le) => !le.disabled && le.element)) == null ? void 0 : $.element) || null;
							break;
						default:
							P.current = k;
					}
					return P;
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
			se = (0, w.useMemo)(() => {
				if (!B || !G) return;
				const ee = G.getAttribute("role"),
					K = B.getAttribute("role");
				if (!((K === "menu" || K === "menubar") && ee === "menu")) return B;
			}, [G, B]);
		return (
			se !== void 0 && (m = { preserveTabOrderAnchor: se, ...m }),
			(m = P_({
				store: n,
				alwaysVisible: h,
				initialFocus: z,
				autoFocusOnShow: j ? q && o : A || !!Q,
				...m,
				hideOnEscape(ee) {
					return Io(s, ee) ? !1 : (n?.hideAll(), !0);
				},
				hideOnHoverOutside(ee) {
					const K = n?.getState().disclosureElement;
					return (typeof f == "function" ? f(ee) : (f ?? (p ? !0 : E ? (K ? !Or(K) : !0) : !1)))
						? ee.defaultPrevented || !p || !K || (jO(K, "mouseout", ee), !Or(K))
							? !0
							: (requestAnimationFrame(() => {
									Or(K) || n?.hide();
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
	WM = Ll(
		Ie(function (n) {
			return Qe(XM, JM(n));
		}),
		ac,
	),
	ez = "a",
	Q_ = Ge(function ({ store: n, showOnHover: r = !0, ...u }) {
		const s = rm();
		((n = n || s), Qt(n, !1));
		const o = Al(u),
			f = (0, w.useRef)(0);
		((0, w.useEffect)(() => () => window.clearTimeout(f.current), []),
			(0, w.useEffect)(
				() =>
					on(
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
			m = vt(r),
			v = Mh(),
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
		return ((u = { ...u, ref: Dt(p, u.ref), onMouseMove: g, onClick: b }), (u = Nl(u)), u);
	}),
	SD = Ie(function (n) {
		return Qe(ez, Q_(n));
	}),
	tz = "button",
	K_ = Ge(function ({ store: n, ...r }) {
		const u = Yo();
		((n = n || u), Qt(n, !1));
		const s = r.onClick,
			o = Ce((f) => {
				(n?.setAnchorElement(f.currentTarget), s?.(f));
			});
		return (
			(r = cn(r, (f) => (0, S.jsx)(Go, { value: n, children: f }), [n])),
			(r = { ...r, onClick: o }),
			(r = Bh({ store: n, ...r })),
			(r = e_({ store: n, ...r })),
			r
		);
	}),
	wD = Ie(function (n) {
		return Qe(tz, K_(n));
	}),
	nz = "button";
function iz(e, n) {
	return {
		ArrowDown: n === "bottom" || n === "top" ? "first" : !1,
		ArrowUp: n === "bottom" || n === "top" ? "last" : !1,
		ArrowRight: n === "right" ? "first" : !1,
		ArrowLeft: n === "left" ? "first" : !1,
	}[e.key];
}
function Op(e, n) {
	return !!e?.some((r) => (!r.element || r.element === n ? !1 : r.element.getAttribute("aria-expanded") === "true"));
}
var rz = Ge(function ({ store: n, focusable: r, accessibleWhenDisabled: u, showOnHover: s, ...o }) {
		const f = ac();
		((n = n || f), Qt(n, !1));
		const h = (0, w.useRef)(null),
			m = n.parent,
			v = n.menubar,
			g = !!m,
			_ = !!v && !g,
			b = Al(o),
			p = () => {
				const Q = h.current;
				Q && (n?.setDisclosureElement(Q), n?.setAnchorElement(Q), n?.show());
			},
			E = o.onFocus,
			x = Ce((Q) => {
				if ((E?.(Q), b || Q.defaultPrevented || (n?.setAutoFocusOnShow(!1), n?.setActiveId(null), !v) || !_)) return;
				const { items: j } = v.getState();
				Op(j, Q.currentTarget) && p();
			}),
			O = Zt(n, (Q) => Q.placement.split("-")[0]),
			z = o.onKeyDown,
			D = Ce((Q) => {
				if ((z?.(Q), b || Q.defaultPrevented)) return;
				const j = iz(Q, O);
				j && (Q.preventDefault(), p(), n?.setAutoFocusOnShow(!0), n?.setInitialFocus(j));
			}),
			A = o.onClick,
			C = Ce((Q) => {
				if ((A?.(Q), Q.defaultPrevented || !n)) return;
				const j = !Q.detail,
					{ open: q } = n.getState();
				((!q || j) && ((!g || j) && n.setAutoFocusOnShow(!0), n.setInitialFocus(j ? "first" : "container")), g && p());
			});
		((o = cn(o, (Q) => (0, S.jsx)(V_, { value: n, children: Q }), [n])),
			g && (o = { ...o, render: (0, S.jsx)(No.div, { render: o.render }) }));
		const k = tr(o.id),
			F = Zt(m?.combobox || m, "contentElement");
		return (
			(o = {
				id: k,
				role: g || _ ? Nb(F, "menuitem") : void 0,
				"aria-haspopup": Bo(n.useState("contentElement"), "menu"),
				...o,
				ref: Dt(h, o.ref),
				onFocus: x,
				onKeyDown: D,
				onClick: C,
			}),
			(o = Q_({
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
							return _ && Op(G);
						})()
					)
						return !1;
					const q = _ ? v : m;
					return (q && q.setActiveId(Q.currentTarget.id), !0);
				},
			})),
			(o = K_({ store: n, toggleOnClick: !g, focusable: r, accessibleWhenDisabled: u, ...o })),
			(o = am({ store: n, typeahead: _, ...o })),
			o
		);
	}),
	az = Ie(function (n) {
		return Qe(nz, rz(n));
	}),
	uz = "div";
function lz(e, n, r) {
	var u;
	if (!e) return !1;
	if (Or(e)) return !0;
	const s = n?.find((h) => {
			var m;
			return h.element === r ? !1 : ((m = h.element) == null ? void 0 : m.getAttribute("aria-expanded")) === "true";
		}),
		o = (u = s?.element) == null ? void 0 : u.getAttribute("aria-controls");
	if (!o) return !1;
	const f = dt(e).getElementById(o);
	return f ? (Or(f) ? !0 : !!f.querySelector("[role=menuitem][aria-expanded=true]")) : !1;
}
var sz = Ge(function ({
		store: n,
		hideOnClick: r = !0,
		preventScrollOnKeyDown: u = !0,
		focusOnHover: s,
		blurOnHoverEnd: o,
		...f
	}) {
		const h = $M(!0),
			m = LM();
		((n = n || h || m), Qt(n, !1));
		const v = f.onClick,
			g = vt(r),
			_ = "hideAll" in n ? n.hideAll : void 0,
			b = !!_,
			p = Ce((E) => {
				(v?.(E),
					!E.defaultPrevented &&
						(Ub(E) || qb(E) || (_ && E.currentTarget.getAttribute("aria-haspopup") !== "menu" && g(E) && _())));
			});
		return (
			(f = {
				role: Nb(
					Zt(n, (E) => ("contentElement" in E ? E.contentElement : null)),
					"menuitem",
				),
				...f,
				onClick: p,
			}),
			(f = Qh({ store: n, preventScrollOnKeyDown: u, ...f })),
			(f = Ph({
				store: n,
				...f,
				focusOnHover(E) {
					const x = () => (typeof s == "function" ? s(E) : (s ?? !0));
					if (!n || !x()) return !1;
					const { baseElement: O, items: z } = n.getState();
					return b
						? (E.currentTarget.hasAttribute("aria-expanded") && E.currentTarget.focus(), !0)
						: lz(O, z, E.currentTarget)
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
	oz = Zo(
		Ie(function (n) {
			return Qe(uz, sz(n));
		}),
	);
function cz(e = {}) {
	var n;
	const r = (n = e.store) == null ? void 0 : n.getState(),
		u = O_({ ...e, placement: Ne(e.placement, r?.placement, "bottom") }),
		s = Ne(e.timeout, r?.timeout, 500),
		o = si(
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
function fz(e, n, r) {
	return (zt(e, r, "timeout"), zt(e, r, "showTimeout"), zt(e, r, "hideTimeout"), N_(e, n, r));
}
function dz({ combobox: e, parent: n, menubar: r, ...u } = {}) {
	const s = !!r && !n,
		o = Xo(
			u.store,
			Fb(n, ["values"]),
			Zh(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
		);
	const f = o.getState(),
		h = z_({ ...u, store: o, orientation: Ne(u.orientation, f.orientation, "vertical") }),
		m = cz({
			...u,
			store: o,
			placement: Ne(u.placement, f.placement, "bottom-start"),
			timeout: Ne(u.timeout, f.timeout, s ? 0 : 150),
			hideTimeout: Ne(u.hideTimeout, f.hideTimeout, 0),
		}),
		v = si(
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
		vn(v, () =>
			dn(v, ["mounted"], (g) => {
				g.mounted || v.setState("activeId", null);
			}),
		),
		vn(v, () =>
			dn(n, ["orientation"], (g) => {
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
								E = Mb(_, p);
							return E === p ? b : { ...b, [g]: E !== void 0 && E };
						}));
			},
		}
	);
}
function hz(e, n, r) {
	return (
		Su(n, [r.combobox, r.parent, r.menubar]),
		zt(e, r, "values", "setValues"),
		Object.assign(fz(D_(e, n, r), n, r), { combobox: r.combobox, parent: r.parent, menubar: r.menubar })
	);
}
function mz(e = {}) {
	const n = UM(),
		r = jM(),
		u = Fo();
	e = {
		...e,
		parent: e.parent !== void 0 ? e.parent : n,
		menubar: e.menubar !== void 0 ? e.menubar : r,
		combobox: e.combobox !== void 0 ? e.combobox : u,
	};
	const [s, o] = Jo(dz, e);
	return hz(s, o, e);
}
function vz(e = {}) {
	return (0, S.jsx)(V_, { value: mz(e), children: e.children });
}
var gz = (0, w.memo)(function (n) {
		const { channelName: r, items: u } = n;
		return (0, S.jsxs)(vz, {
			placement: "bottom-end",
			children: [
				(0, S.jsx)(az, {
					className: "ChannelRowMenu-trigger",
					"aria-label": `Actions for #${r}`,
					children: (0, S.jsx)(fO, { size: 16, "aria-hidden": "true" }),
				}),
				(0, S.jsx)(WM, {
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					className: "ChannelRowMenu-popover",
					"aria-label": `Actions for #${r}`,
					children: u.map((s) =>
						(0, S.jsx)(oz, { className: "ChannelRowMenu-item", onClick: s.onSelect, children: s.label }, s.id),
					),
				}),
			],
		});
	}),
	yz = 300 * 1e3;
function pz(e) {
	const n = (0, w.useRef)(new Map()),
		r = (0, w.useRef)(new Map()),
		[, u] = (0, w.useState)(0),
		s = (0, w.useCallback)((f) => (n.current.has(f) ? n.current.get(f) : void 0), []),
		o = (0, w.useCallback)(
			async (f) => {
				const h = Date.now(),
					m = [...new Set(f)].filter((v) => {
						const g = r.current.get(v);
						return g === void 0 || h - g >= yz;
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
function bz(e) {
	const [n, r] = (0, w.useState)(null);
	return (
		(0, w.useEffect)(() => {
			let u = !1;
			return (
				e.members.list({ limit: 100 }).then((s) => {
					if (!u) {
						if ("_nay" in s) {
							r({ members: [], error: xb(s._nay.name), truncated: !1 });
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
function Y_(e) {
	const n = bz(e.client);
	if (n === null) return (0, S.jsx)("p", { className: "channel-status", role: "status", children: "Loading people…" });
	if (n.error !== null) return (0, S.jsx)("p", { className: "form-error", role: "alert", children: n.error });
	const r = n.members
		.filter((u) => u.userId !== e.selfUserId)
		.sort((u, s) => mo(u.displayName).localeCompare(mo(s.displayName)));
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
											mo(u.displayName),
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
function Np(e) {
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
	return (0, S.jsxs)(Ul, {
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
											(0, S.jsx)("p", { className: "field-note", children: Eh }),
											(0, S.jsx)("p", {
												className: "field-note",
												children: "Tick one person for a direct message, or several for a group.",
											}),
											(0, S.jsx)(Y_, {
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
function _z(e) {
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
	return (0, S.jsxs)(Ul, {
		labelledBy: n,
		onClose: e.onClose,
		children: [
			(0, S.jsxs)("h2", { id: n, className: "dialog-title", children: ["People in #", e.channel.value.name] }),
			(0, S.jsx)("p", { className: "field-note", children: Eh }),
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
							(0, S.jsx)(Y_, {
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
function Sz(e) {
	const n = (0, w.useId)();
	return (0, S.jsxs)(Ul, {
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
var wz = [
	{ key: "view:unreads", name: "Unreads" },
	{ key: "view:threads", name: "Threads" },
	{ key: "view:activity", name: "Activity" },
];
function um(e) {
	return e === null ? "Former member" : (e ?? "…");
}
function lm(e) {
	return e.length > 80 ? `${e.slice(0, 80)}…` : e;
}
function Ez(e) {
	const n = [];
	for (const s of e.channels) {
		if (ai(s.key)) {
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
											(0, S.jsx)("span", { className: "view-row-time", children: $o(s.at, u) }),
											s.preview !== null
												? (0, S.jsx)("span", {
														className: "view-row-preview",
														children: `${um(r.get(s.preview.createdBy))}: ${lm(s.preview.value.text)}`,
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
function Tz(e) {
	const n = new Map(e.channels.map((o) => [o.key, o])),
		r = [];
	for (const o of e.feed) {
		if (o.value.deletedAt !== null) continue;
		const f = Th(o.key),
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
															(0, S.jsx)("span", { className: "view-row-title", children: um(u.get(h.createdBy)) }),
															(0, S.jsx)("span", { className: "view-row-time", children: $o(h.timestamp, s) }),
															(0, S.jsx)("span", { className: "view-row-preview", children: lm(h.value.text) }),
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
function xz(e) {
	const [n, r] = (0, w.useState)([]),
		[u, s] = (0, w.useState)(!1),
		[o, f] = (0, w.useState)(!1);
	(0, w.useEffect)(() => {
		const _ = vo(Co);
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
		const b = xh(_.key),
			p = b === null ? null : Th(b),
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
												(0, S.jsx)("span", { className: "view-row-time", children: $o(b.newest.timestamp, g) }),
												(0, S.jsx)("span", {
													className: "view-row-preview",
													children: `${b.count} ${b.count === 1 ? "reply" : "replies"} · ${um(v.get(b.newest.createdBy))}: ${lm(b.newest.value.text)}`,
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
function Az(e) {
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
function Cz(e) {
	return `--bonobo-${e.replace(/[A-Z]/gu, (n) => `-${n.toLowerCase()}`)}`;
}
var Vd = 8,
	Rz = 2e3;
function Oz(e) {
	const { client: n } = e,
		r = n.context.userId,
		u = pz(n),
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
		[se, ee] = (0, w.useState)(null),
		[K, ue] = (0, w.useState)(!1),
		[R, $] = (0, w.useState)(null),
		[P, le] = (0, w.useState)(!1),
		[me, Re] = (0, w.useState)(null),
		[N, X] = (0, w.useState)(!1),
		[re, fe] = (0, w.useState)({ sequence: 0, text: "" }),
		[ge, be] = (0, w.useState)(""),
		[Se, Fe] = (0, w.useState)(!1),
		De = (0, w.useRef)(null),
		Ke = (0, w.useRef)(null),
		Et = (0, w.useRef)(null),
		Tt = (0, w.useRef)(null),
		Kt = (0, w.useRef)(null),
		Be = (0, w.useRef)(null),
		ce = (0, w.useRef)(null),
		Ee = [...s, ...Object.values(m).flat()].sort((J, de) => J.value.name.localeCompare(de.value.name)),
		Ye = new Map(
			Object.values(F)
				.flat()
				.map((J) => [J.channelKey, J]),
		),
		ze = (0, w.useMemo)(() => FR({ docs: D, cursorChannels: O?.value.channels ?? {}, selfUserId: r }), [D, O, r]),
		yt = (J) => {
			if (J.key === j || J.value.archivedAt !== null) return !1;
			if (ai(J.key)) {
				const de = J.value.lastMessageAt;
				return de !== void 0 && de > (Ye.get(J.key)?.at ?? 0);
			}
			return ze.has(J.key);
		},
		rt = (J) => (ai(J.key) ? (Ye.get(J.key)?.at ?? 0) : (O?.value.channels[J.key] ?? 0)),
		ae = (J) => (J.key === j || J.value.archivedAt !== null ? 0 : (ze.get(J.key)?.mentionCount ?? 0)),
		Ae = (0, w.useId)(),
		lt = (0, w.useId)(),
		Oe = (0, w.useCallback)((J) => {
			fe((de) => ({ sequence: de.sequence + 1, text: J }));
		}, []);
	((0, w.useEffect)(() => {
		if (re.text === "") return;
		be("");
		const J = requestAnimationFrame(() => be(re.text));
		return () => cancelAnimationFrame(J);
	}, [re]),
		(0, w.useEffect)(() => {
			const J = window.matchMedia("(max-width: 719px)");
			Fe(J.matches);
			const de = (xe) => Fe(xe.matches);
			return (J.addEventListener("change", de), () => J.removeEventListener("change", de));
		}, []),
		(0, w.useEffect)(() => {
			const J = (xe) => {
					const _e = document.documentElement;
					_e.classList.toggle("theme-light", xe.mode === "light");
					for (const [at, ut] of Object.entries(xe.tokens)) _e.style.setProperty(Cz(at), ut);
				},
				de = n.theme.current();
			return (de !== null && J(de), n.theme.subscribe(J));
		}, [n]),
		(0, w.useEffect)(() => {
			const J = vo(B0);
			return n.data.watch({ collection: "channels", limit: 100 }, (de, xe) => {
				if (de === null) {
					p({ ...(xe?.reason === void 0 ? {} : { reason: xe.reason }) });
					return;
				}
				(o(J.apply_window(de.docs)), _(!0), x(de.truncated));
			});
		}, [n]),
		(0, w.useEffect)(
			() =>
				n.scopes.watchMine((J) => {
					h(J ?? []);
				}),
			[n],
		),
		(0, w.useEffect)(() => {
			const J = f.slice(0, Vd).map((de) => {
				const xe = vo(B0);
				return n.data.watch({ collection: "channels", keyPrefix: de.keyPrefix, limit: 100 }, (_e) => {
					const at =
						_e === null
							? []
							: _e.docs.filter((ut) => {
									const nn = ut.key;
									return !(typeof nn == "string" && Tb(nn) !== null);
								});
					(v((ut) => {
						if (_e === null) {
							const { [de.scopeId]: nn, ...xt } = ut;
							return xt;
						}
						return { ...ut, [de.scopeId]: xe.apply_window(at) };
					}),
						Q((ut) => {
							if (_e === null) {
								const { [de.scopeId]: xt, ...ei } = ut;
								return ei;
							}
							const nn = _e.docs.map(GR).filter((xt) => xt !== null && xt.createdBy === r);
							return { ...ut, [de.scopeId]: nn };
						}));
				});
			});
			return () => {
				for (const de of J) de();
			};
		}, [n, f, r]),
		(0, w.useEffect)(
			() =>
				n.data.watch({ collection: "cursors", keyPrefix: $0(r), limit: 1 }, (J) => {
					if (J === null) {
						(z(null), (Tt.current = null));
						return;
					}
					const de = J.docs.map(YR).find((xe) => xe !== null) ?? null;
					(z(de), (Tt.current = de));
				}),
			[n, r],
		),
		(0, w.useEffect)(() => {
			const J = vo(Co);
			return n.data.watchRecent({ collection: "messages", limit: 100, order: "desc" }, (de) => {
				if (de === null) {
					(k(!0), A([]));
					return;
				}
				(k(!1), A(J.apply_window(de.docs)));
			});
		}, [n]),
		(0, w.useEffect)(() => {
			if (j === null) {
				const J = Ee.find((de) => de.value.archivedAt === null);
				J !== void 0 && q((de) => de ?? J.key);
			}
		}, [Ee, j]),
		(0, w.useEffect)(() => {
			N && De.current?.focus();
		}, [N]));
	const pt = () => window.matchMedia("(max-width: 719px)").matches,
		Ft = (J, de) => {
			const xe = Tt.current,
				_e = xe?.value.channels ?? {};
			if ((_e[J] ?? 0) >= de) return;
			const at = { channels: { ..._e, [J]: de } },
				ut = xe?.revision ?? 0,
				nn = (xt, ei) => {
					const Un = Date.now(),
						At = {
							key: $0(r),
							value: ei,
							revision: xt,
							createdBy: r,
							updatedBy: r,
							createdAt: xe?.createdAt ?? Un,
							updatedAt: Un,
							timestamp: xe?.timestamp ?? Un,
						};
					((Tt.current = At), z(At));
				};
			n.data
				.putOwned({ collection: "cursors", key: "me", value: at, expectedRevision: ut })
				.then((xt) => {
					if ("_yay" in xt) {
						nn(xt._yay.revision, at);
						return;
					}
					if (xt._nay.name === "conflict") {
						const At = Tt.current;
						if (At !== null && At.revision !== ut) {
							const fi = I0(At.value, at);
							n.data
								.putOwned({ collection: "cursors", key: "me", value: fi, expectedRevision: At.revision })
								.then(($r) => {
									"_yay" in $r && nn($r._yay.revision, fi);
								})
								.catch(() => {});
							return;
						}
						Kt.current = { channels: at.channels, attemptedRevision: ut };
						return;
					}
					const ei = new Set(Ee.map((At) => At.key)),
						Un = Object.fromEntries(Object.entries(at.channels).filter(([At]) => At === J || ei.has(At)));
					if (Object.keys(Un).length === Object.keys(at.channels).length) {
						console.warn("[chitchat] A read-cursor write was refused", { message: xt._nay.message });
						return;
					}
					n.data
						.putOwned({ collection: "cursors", key: "me", value: { channels: Un }, expectedRevision: ut })
						.then((At) => {
							"_yay" in At
								? nn(At._yay.revision, { channels: Un })
								: console.warn("[chitchat] A read-cursor write was refused", { message: At._nay.message });
						})
						.catch(() => {});
				})
				.catch((xt) => {
					console.warn("[chitchat] A read-cursor write failed", { message: Xn(xt) });
				});
		},
		st = (J, de) => {
			const xe = Ye.get(J.key);
			(xe?.at ?? 0) >= de ||
				n.data
					.putOwned({ collection: "channels", key: DR(J.key), value: { at: de }, expectedRevision: xe?.revision ?? 0 })
					.then((_e) => {
						"_nay" in _e &&
							_e._nay.name !== "conflict" &&
							console.warn("[chitchat] A private read-cursor write was refused", { message: _e._nay.message });
					})
					.catch((_e) => {
						console.warn("[chitchat] A private read-cursor write failed", { message: Xn(_e) });
					});
		},
		Xt = (J, de) => {
			ai(J.key) ? st(J, de) : Ft(J.key, de);
		},
		ba = (J, de) => {
			const xe = ce.current;
			((ce.current =
				xe !== null && xe.channel.key === J.key ? { channel: J, at: Math.max(xe.at, de) } : { channel: J, at: de }),
				Be.current === null &&
					(Be.current = setTimeout(() => {
						Be.current = null;
						const _e = ce.current;
						((ce.current = null), _e !== null && Xt(_e.channel, _e.at));
					}, Rz)));
		},
		fn = (J) => {
			(q(J.key),
				ee(null),
				yt(J) || ae(J) > 0 ? (B(rt(J)), Xt(J, Date.now())) : B(null),
				Oe(`#${J.value.name}`),
				N && pt() && (X(!1), Ke.current?.focus()));
		},
		Ei = (J) => {
			(q(J.key), ee(null), Oe(J.name), N && pt() && (X(!1), Ke.current?.focus()));
		},
		Tu = (J, de) => {
			(fn(J), ee(de));
		};
	((0, w.useEffect)(() => {
		const J = Kt.current;
		if (J === null || O === null || O.revision === J.attemptedRevision) return;
		Kt.current = null;
		const de = I0(O.value, { channels: J.channels });
		n.data
			.putOwned({ collection: "cursors", key: "me", value: de, expectedRevision: O.revision })
			.then((xe) => {
				"_nay" in xe &&
					xe._nay.name !== "conflict" &&
					console.warn("[chitchat] The read-cursor retry was refused", { message: xe._nay.message });
			})
			.catch(() => {});
	}, [O, n]),
		(0, w.useEffect)(
			() => () => {
				Be.current !== null && clearTimeout(Be.current);
			},
			[],
		));
	const gn = () => {
			($(null), le(!1), Re(null));
		},
		Yt = (J, de, xe) => {
			(le(!0), Re(null));
			const _e = kR(xe.isPrivate ? "private" : "public");
			(async () => {
				if (xe.isPrivate) {
					const ut = await n.scopes.create({ scopeId: _e, collections: NR, keyPrefix: _e });
					if ("_nay" in ut) {
						(le(!1), Re(ut._nay.message));
						return;
					}
					for (const nn of xe.userIds) {
						const xt = await n.scopes.setPrincipal({ scopeId: _e, userId: nn, level: "member" });
						if ("_nay" in xt) {
							(le(!1), Re(xt._nay.message));
							return;
						}
					}
				}
				const at = await n.data.put({
					collection: "channels",
					key: _e,
					value: { name: J, archivedAt: null, ...(de === "" ? {} : { topic: de }) },
				});
				if ("_nay" in at) {
					(le(!1), Re(at._nay.message));
					return;
				}
				(q(_e), B(null), gn());
			})().catch((at) => {
				(le(!1), Re(Xn(at)));
			});
		},
		en = (J, de) => {
			(le(!0),
				Re(null),
				n.data
					.put({ collection: "channels", key: J.key, value: de, expectedRevision: J.revision })
					.then((xe) => {
						if ("_nay" in xe) {
							(le(!1),
								Re(
									xe._nay.name === "conflict"
										? "Someone else changed this channel while the dialog was open. Close it and try again."
										: xe._nay.message,
								));
							return;
						}
						gn();
					})
					.catch((xe) => {
						(le(!1), Re(Xn(xe)));
					}));
		},
		jt = (J) => {
			n.data
				.put({
					collection: "channels",
					key: J.key,
					value: { ...J.value, archivedAt: null },
					expectedRevision: J.revision,
				})
				.then((de) => {
					"_nay" in de && Oe(de._nay.message);
				})
				.catch((de) => {
					Oe(Xn(de));
				});
		};
	if (b !== null)
		return (0, S.jsx)("div", {
			className: "chitchat",
			children: (0, S.jsxs)("div", {
				className: "page-dead",
				role: "alert",
				children: [(0, S.jsx)("h1", { children: "Chitchat" }), (0, S.jsx)("p", { children: Az(b.reason) })],
			}),
		});
	const qr = (J, de) => J.value.name.localeCompare(de.value.name),
		oi = Ee.filter((J) => J.value.archivedAt === null).sort(qr),
		Ur = Ee.filter((J) => J.value.archivedAt !== null).sort(qr),
		yn = Ee.find((J) => J.key === j) ?? null,
		ci = oi.filter(yt).length,
		tn = oi.reduce((J, de) => J + ae(de), 0),
		Rn = Math.max(0, f.length - Vd),
		Ti = (J, de, xe) =>
			de.length === 0
				? null
				: (0, S.jsxs)("div", {
						className: "channel-section",
						children: [
							(0, S.jsx)("h2", { id: xe, className: "channel-section-title", children: J }),
							(0, S.jsx)("ul", {
								className: "channel-list",
								"aria-labelledby": xe,
								children: de.map((_e) => {
									const at = yt(_e),
										ut = ae(_e);
									return (0, S.jsxs)(
										"li",
										{
											className: "channel-item",
											children: [
												(0, S.jsxs)("button", {
													type: "button",
													className: at || ut > 0 ? "channel-link is-unread" : "channel-link",
													"aria-current": _e.key === j ? "page" : void 0,
													onClick: () => fn(_e),
													children: [
														(0, S.jsx)("span", {
															className: "channel-initial",
															"aria-hidden": "true",
															children: _e.value.name.slice(0, 1).toUpperCase(),
														}),
														(0, S.jsxs)("span", {
															className: "channel-name",
															children: [
																"#",
																_e.value.name,
																ai(_e.key) ? " (private)" : "",
																_e.value.archivedAt !== null ? " (archived)" : "",
															],
														}),
														ut > 0
															? (0, S.jsxs)("span", {
																	className: "mention-badge",
																	children: [
																		ut,
																		(0, S.jsx)("span", { className: "visually-hidden", children: " unread mentions" }),
																	],
																})
															: at
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
													children: (0, S.jsx)(gz, {
														channelName: _e.value.name,
														items: [
															...(ai(_e.key)
																? [
																		{
																			id: "people",
																			label: `People in #${_e.value.name}`,
																			onSelect: () => $({ kind: "people", channel: _e }),
																		},
																	]
																: []),
															{
																id: "rename",
																label: `Rename #${_e.value.name}`,
																onSelect: () => $({ kind: "rename", channel: _e }),
															},
															_e.value.archivedAt === null
																? {
																		id: "archive",
																		label: `Archive #${_e.value.name}`,
																		onSelect: () => $({ kind: "archive", channel: _e }),
																	}
																: { id: "unarchive", label: `Unarchive #${_e.value.name}`, onSelect: () => jt(_e) },
														],
													}),
												}),
											],
										},
										_e.key,
									);
								}),
							}),
						],
					});
	return (0, S.jsxs)("div", {
		className: se === null ? "chitchat" : "chitchat has-thread",
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
						onClick: () => X((J) => !J),
						children: "Channels",
					}),
				],
			}),
			(0, S.jsx)("nav", {
				ref: De,
				className: `sidebar${N ? " is-open" : ""}${K ? " is-expanded" : ""}`,
				"aria-label": "Channels",
				tabIndex: -1,
				children: (0, S.jsxs)("div", {
					className: "sidebar-inner",
					inert: Se && !N ? !0 : void 0,
					children: [
						(0, S.jsxs)("div", {
							className: "sidebar-head",
							children: [
								(0, S.jsx)("p", { className: "sidebar-title", children: "Chitchat" }),
								(0, S.jsx)("button", {
									ref: Et,
									type: "button",
									className: "button sidebar-expand",
									"aria-expanded": K,
									"aria-label": K ? "Collapse channel rail" : "Expand channel rail",
									onClick: () => ue((J) => !J),
									children: K ? "«" : "»",
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
						Rn > 0
							? (0, S.jsx)("div", {
									className: "channel-status",
									role: "status",
									children: `This page can watch ${Vd} private channels at a time; ${Rn} more ${Rn === 1 ? "is" : "are"} hidden.`,
								})
							: null,
						(0, S.jsx)("ul", {
							className: "view-list",
							"aria-label": "Views",
							children: wz.map((J) =>
								(0, S.jsx)(
									"li",
									{
										className: "view-item",
										children: (0, S.jsxs)("button", {
											type: "button",
											className:
												J.key === "view:unreads" && (ci > 0 || tn > 0)
													? "channel-link view-link is-unread"
													: "channel-link view-link",
											"aria-current": j === J.key ? "page" : void 0,
											onClick: () => Ei(J),
											children: [
												(0, S.jsx)("span", {
													className: "channel-initial",
													"aria-hidden": "true",
													children: J.name.slice(0, 1),
												}),
												(0, S.jsx)("span", { className: "channel-name", children: J.name }),
												J.key === "view:unreads" && tn > 0
													? (0, S.jsxs)("span", {
															className: "mention-badge",
															children: [
																tn,
																(0, S.jsx)("span", { className: "visually-hidden", children: " mentions of you" }),
															],
														})
													: J.key === "view:unreads" && ci > 0
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
									J.key,
								),
							),
						}),
						g
							? Ee.length === 0
								? (0, S.jsx)("div", { className: "channel-status", children: "No channels yet" })
								: (0, S.jsxs)(S.Fragment, { children: [Ti("Channels", oi, Ae), Ti("Archived", Ur, lt)] })
							: (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading channels…" }),
					],
				}),
			}),
			(0, S.jsx)("main", {
				className: "main",
				children:
					j === "view:unreads"
						? (0, S.jsx)(Ez, {
								channels: oi,
								publicUnreads: ze,
								privateCursors: Ye,
								recentDead: C,
								memberNames: u,
								onSelectChannel: fn,
							})
						: j === "view:threads"
							? (0, S.jsx)(xz, { client: n, channels: oi, memberNames: u, onOpenThread: Tu })
							: j === "view:activity"
								? (0, S.jsx)(Tz, {
										feed: D,
										channels: oi,
										selfUserId: r,
										recentDead: C,
										memberNames: u,
										onSelectChannel: fn,
									})
								: yn !== null
									? (0, S.jsx)(
											DM,
											{
												client: n,
												userId: r,
												channel: yn,
												memberNames: u,
												announce: Oe,
												threadRootKey: se,
												setThreadRootKey: ee,
												isNarrow: Se,
												onNewestVisible: (J) => ba(yn, J),
												openedAtLastReadAt: G,
											},
											yn.key,
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
				? (0, S.jsx)(Np, {
						title: "Create channel",
						submitLabel: "Create",
						initialName: "",
						initialTopic: "",
						privacy: { client: n, selfUserId: r },
						busy: P,
						error: me,
						onSubmit: Yt,
						onClose: gn,
					})
				: null,
			R !== null && R.kind === "people"
				? (0, S.jsx)(_z, { client: n, channel: R.channel, selfUserId: r, memberNames: u, onClose: gn })
				: null,
			R !== null && R.kind === "rename"
				? (0, S.jsx)(Np, {
						title: `Rename #${R.channel.value.name}`,
						submitLabel: "Rename",
						initialName: R.channel.value.name,
						initialTopic: R.channel.value.topic ?? "",
						privacy: null,
						busy: P,
						error: me,
						onSubmit: (J, de) =>
							en(R.channel, { ...R.channel.value, name: J, ...(de === "" ? { topic: void 0 } : { topic: de }) }),
						onClose: gn,
					})
				: null,
			R !== null && R.kind === "archive"
				? (0, S.jsx)(Sz, {
						channelName: R.channel.value.name,
						busy: P,
						error: me,
						onConfirm: () => en(R.channel, { ...R.channel.value, archivedAt: Date.now() }),
						onClose: gn,
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
function G_(e) {
	return (0, S.jsx)("div", {
		className: e.isError ? "boot-screen is-error" : "boot-screen",
		role: e.isError ? "alert" : "status",
		"aria-live": e.isError ? void 0 : "polite",
		children: e.message,
	});
}
var F_ = document.getElementById("root");
if (!F_) throw new Error("index.html is missing the #root element");
var dh = (0, CR.createRoot)(F_);
dh.render((0, S.jsx)(G_, { message: "Connecting…" }));
qE().then(
	(e) => {
		(e.context.kind === "page" && (document.title = e.context.pageTitle), dh.render((0, S.jsx)(Oz, { client: e })));
	},
	(e) => {
		dh.render((0, S.jsx)(G_, { message: e instanceof Error ? e.message : String(e), isError: !0 }));
	},
);
