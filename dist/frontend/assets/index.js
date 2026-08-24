var Ew = Object.create,
	s0 = Object.defineProperty,
	Tw = Object.getOwnPropertyDescriptor,
	xw = Object.getOwnPropertyNames,
	Aw = Object.getPrototypeOf,
	Cw = Object.prototype.hasOwnProperty,
	$n = (e, n) => () => (n || (e((n = { exports: {} }).exports, n), (e = null)), n.exports),
	Rw = (e, n, a, u) => {
		if ((n && typeof n == "object") || typeof n == "function")
			for (var s = xw(n), o = 0, f = s.length, h; o < f; o++)
				((h = s[o]),
					!Cw.call(e, h) &&
						h !== a &&
						s0(e, h, { get: ((m) => n[m]).bind(null, h), enumerable: !(u = Tw(n, h)) || u.enumerable }));
		return e;
	},
	o0 = (e, n, a) => (
		(a = e != null ? Ew(Aw(e)) : {}),
		Rw(n || !e || !e.__esModule ? s0(a, "default", { value: e, enumerable: !0 }) : a, e)
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
	function a(s) {
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
		const o = a(s);
		fetch(s.href, o);
	}
})();
var Ey = "1.44.0",
	Wn = [],
	qn = [],
	Nw = Uint8Array,
	Jf = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Br = 0, Ow = Jf.length; Br < Ow; ++Br) ((Wn[Br] = Jf[Br]), (qn[Jf.charCodeAt(Br)] = Br));
qn[45] = 62;
qn[95] = 63;
function kw(e) {
	var n = e.length;
	if (n % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
	var a = e.indexOf("=");
	a === -1 && (a = n);
	var u = a === n ? 0 : 4 - (a % 4);
	return [a, u];
}
function Mw(e, n, a) {
	return ((n + a) * 3) / 4 - a;
}
function dl(e) {
	var n,
		a = kw(e),
		u = a[0],
		s = a[1],
		o = new Nw(Mw(e, u, s)),
		f = 0,
		h = s > 0 ? u - 4 : u,
		m;
	for (m = 0; m < h; m += 4)
		((n =
			(qn[e.charCodeAt(m)] << 18) |
			(qn[e.charCodeAt(m + 1)] << 12) |
			(qn[e.charCodeAt(m + 2)] << 6) |
			qn[e.charCodeAt(m + 3)]),
			(o[f++] = (n >> 16) & 255),
			(o[f++] = (n >> 8) & 255),
			(o[f++] = n & 255));
	return (
		s === 2 && ((n = (qn[e.charCodeAt(m)] << 2) | (qn[e.charCodeAt(m + 1)] >> 4)), (o[f++] = n & 255)),
		s === 1 &&
			((n = (qn[e.charCodeAt(m)] << 10) | (qn[e.charCodeAt(m + 1)] << 4) | (qn[e.charCodeAt(m + 2)] >> 2)),
			(o[f++] = (n >> 8) & 255),
			(o[f++] = n & 255)),
		o
	);
}
function zw(e) {
	return Wn[(e >> 18) & 63] + Wn[(e >> 12) & 63] + Wn[(e >> 6) & 63] + Wn[e & 63];
}
function Dw(e, n, a) {
	for (var u, s = [], o = n; o < a; o += 3)
		((u = ((e[o] << 16) & 16711680) + ((e[o + 1] << 8) & 65280) + (e[o + 2] & 255)), s.push(zw(u)));
	return s.join("");
}
function hl(e) {
	for (var n, a = e.length, u = a % 3, s = [], o = 16383, f = 0, h = a - u; f < h; f += o)
		s.push(Dw(e, f, f + o > h ? h : f + o));
	return (
		u === 1
			? ((n = e[a - 1]), s.push(Wn[n >> 2] + Wn[(n << 4) & 63] + "=="))
			: u === 2 &&
				((n = (e[a - 2] << 8) + e[a - 1]), s.push(Wn[n >> 10] + Wn[(n >> 4) & 63] + Wn[(n << 2) & 63] + "=")),
		s.join("")
	);
}
function da(e) {
	if (e === void 0) return {};
	if (!f0(e)) throw new Error(`The arguments to a Convex function must be an object. Received: ${e}`);
	return e;
}
function c0(e) {
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
function f0(e) {
	const n = typeof e == "object",
		a = Object.getPrototypeOf(e),
		u = a === null || a === Object.prototype || a?.constructor?.name === "Object";
	return n && u;
}
var d0 = !0,
	Wr = BigInt("-9223372036854775808"),
	Hd = BigInt("9223372036854775807"),
	_d = BigInt("0"),
	jw = BigInt("8"),
	Lw = BigInt("256"),
	Wf =
		"This commit timestamp is unresolved: its value is assigned when the mutation commits. Read the document after the mutation completes to get its value.",
	h0 = class {
		[Symbol.toPrimitive](e) {
			if (e === "string") return this.toString();
			throw new Error(Wf);
		}
		valueOf() {
			throw new Error(Wf);
		}
		toJSON() {
			throw new Error(Wf);
		}
		toString() {
			return "[unresolved commit timestamp]";
		}
	},
	qw = new h0();
function m0(e) {
	return Number.isNaN(e) || !Number.isFinite(e) || Object.is(e, -0);
}
function Uw(e) {
	e < _d && (e -= Wr + Wr);
	let n = e.toString(16);
	n.length % 2 === 1 && (n = "0" + n);
	const a = new Uint8Array(new ArrayBuffer(8));
	let u = 0;
	for (const s of n.match(/.{2}/g).reverse()) (a.set([parseInt(s, 16)], u++), (e >>= jw));
	return hl(a);
}
function $w(e) {
	const n = dl(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	let a = _d,
		u = _d;
	for (const s of n) ((a += BigInt(s) * Lw ** u), u++);
	return (a > Hd && (a += Wr + Wr), a);
}
function Bw(e) {
	if (e < Wr || Hd < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
	const n = new ArrayBuffer(8);
	return (new DataView(n).setBigInt64(0, e, !0), hl(new Uint8Array(n)));
}
function Iw(e) {
	const n = dl(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	return new DataView(n.buffer).getBigInt64(0, !0);
}
var Zw = DataView.prototype.setBigInt64 ? Bw : Uw,
	Hw = DataView.prototype.getBigInt64 ? Iw : $w,
	Ty = 1024;
function Sd(e) {
	if (e.length > Ty) throw new Error(`Field name ${e} exceeds maximum field name length ${Ty}.`);
	if (e.startsWith("$")) throw new Error(`Field name ${e} starts with a '$', which is reserved.`);
	for (let n = 0; n < e.length; n += 1) {
		const a = e.charCodeAt(n);
		if (a < 32 || a >= 127)
			throw new Error(
				`Field name ${e} has invalid character '${e[n]}': Field names can only contain non-control ASCII characters`,
			);
	}
}
function eu(e) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return e;
	if (Array.isArray(e)) return e.map((u) => eu(u));
	if (typeof e != "object") throw new Error(`Unexpected type of ${e}`);
	const n = Object.entries(e);
	if (n.length === 1) {
		const u = n[0][0];
		if (u === "$bytes") {
			if (typeof e.$bytes != "string") throw new Error(`Malformed $bytes field on ${e}`);
			return dl(e.$bytes).buffer;
		}
		if (u === "$integer") {
			if (typeof e.$integer != "string") throw new Error(`Malformed $integer field on ${e}`);
			return Hw(e.$integer);
		}
		if (u === "$float") {
			if (typeof e.$float != "string") throw new Error(`Malformed $float field on ${e}`);
			const s = dl(e.$float);
			if (s.byteLength !== 8) throw new Error(`Received ${s.byteLength} bytes, expected 8 for $float`);
			const o = new DataView(s.buffer).getFloat64(0, d0);
			if (!m0(o)) throw new Error(`Float ${o} should be encoded as a number`);
			return o;
		}
		if (u === "$commitTs") {
			if (e.$commitTs !== null) throw new Error(`Malformed $commitTs field on ${e}`);
			return qw;
		}
		if (u === "$set") throw new Error("Received a Set which is no longer supported as a Convex type.");
		if (u === "$map") throw new Error("Received a Map which is no longer supported as a Convex type.");
	}
	const a = {};
	for (const [u, s] of Object.entries(e)) (Sd(u), (a[u] = eu(s)));
	return a;
}
var xy = 16384;
function Kr(e) {
	const n = JSON.stringify(e, (a, u) => (u === void 0 ? "undefined" : typeof u == "bigint" ? `${u.toString()}n` : u));
	if (n.length > xy) {
		const a = "[...truncated]";
		let u = xy - 14;
		const s = n.codePointAt(u - 1);
		return (s !== void 0 && s > 65535 && (u -= 1), n.substring(0, u) + a);
	}
	return n;
}
function ro(e, n, a, u) {
	if (e === void 0) {
		const f = a && ` (present at path ${a} in original object ${Kr(n)})`;
		throw new Error(
			`undefined is not a valid Convex value${f}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`,
		);
	}
	if (e === null) return e;
	if (typeof e == "bigint") {
		if (e < Wr || Hd < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
		return { $integer: Zw(e) };
	}
	if (typeof e == "number")
		if (m0(e)) {
			const f = new ArrayBuffer(8);
			return (new DataView(f).setFloat64(0, e, d0), { $float: hl(new Uint8Array(f)) });
		} else return e;
	if (typeof e == "boolean" || typeof e == "string") return e;
	if (e instanceof ArrayBuffer) return { $bytes: hl(new Uint8Array(e)) };
	if (e instanceof h0) return { $commitTs: null };
	if (Array.isArray(e)) return e.map((f, h) => ro(f, n, a + `[${h}]`, !1));
	if (e instanceof Set) throw new Error(ed(a, "Set", [...e], n));
	if (e instanceof Map) throw new Error(ed(a, "Map", [...e], n));
	if (!f0(e)) {
		const f = e?.constructor?.name,
			h = f ? `${f} ` : "";
		throw new Error(ed(a, h, e, n));
	}
	const s = {},
		o = Object.entries(e);
	o.sort(([f, h], [m, g]) => (f === m ? 0 : f < m ? -1 : 1));
	for (const [f, h] of o)
		h !== void 0 ? (Sd(f), (s[f] = ro(h, n, a + `.${f}`, !1))) : u && (Sd(f), (s[f] = Vw(h, n, a + `.${f}`)));
	return s;
}
function ed(e, n, a, u) {
	return e
		? `${n}${Kr(a)} is not a supported Convex type (present at path ${e} in original object ${Kr(u)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
		: `${n}${Kr(a)} is not a supported Convex type.`;
}
function Vw(e, n, a) {
	if (e === void 0) return { $undefined: null };
	if (n === void 0) throw new Error(`Programming error. Current value is ${Kr(e)} but original value is undefined`);
	return ro(e, n, a, !1);
}
function Ya(e) {
	return ro(e, e, "", !1);
}
var Qw = Object.defineProperty,
	Pw = (e, n, a) => (n in e ? Qw(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	td = (e, n, a) => Pw(e, typeof n != "symbol" ? n + "" : n, a),
	Ay,
	Cy,
	Yw = Symbol.for("ConvexError"),
	wd = class extends ((Cy = Error), (Ay = Yw), Cy) {
		constructor(e) {
			(super(typeof e == "string" ? e : Kr(e)),
				td(this, "name", "ConvexError"),
				td(this, "data"),
				td(this, Ay, !0),
				(this.data = e));
		}
	},
	Gw = Object.defineProperty,
	Kw = (e, n, a) => (n in e ? Gw(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Ry = (e, n, a) => Kw(e, typeof n != "symbol" ? n + "" : n, a),
	Xw = "color:rgb(0, 145, 255)";
function v0(e) {
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
var g0 = class {
	constructor(e) {
		(Ry(this, "_onLogLineFuncs"), Ry(this, "_verbose"), (this._onLogLineFuncs = {}), (this._verbose = e.verbose));
	}
	addLogLineListener(e) {
		let n = Math.random().toString(36).substring(2, 15);
		for (let a = 0; a < 10 && this._onLogLineFuncs[n] !== void 0; a++) n = Math.random().toString(36).substring(2, 15);
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
function Fw(e) {
	const n = new g0(e);
	return (
		n.addLogLineListener((a, ...u) => {
			switch (a) {
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
function Jw(e) {
	return new g0(e);
}
function uo(e, n, a, u, s) {
	const o = v0(a);
	if ((typeof s == "object" && (s = `ConvexError ${JSON.stringify(s.errorData, null, 2)}`), n === "info")) {
		const f = s.match(/^\[.*?\] /);
		if (f === null) {
			e.error(`[CONVEX ${o}(${u})] Could not parse console.log`);
			return;
		}
		const h = s.slice(1, f[0].length - 2),
			m = s.slice(f[0].length);
		e.log(`%c[CONVEX ${o}(${u})] [${h}]`, Xw, m);
	} else e.error(`[CONVEX ${o}(${u})] ${s}`);
}
function Ww(e, n) {
	const a = `[CONVEX FATAL ERROR] ${n}`;
	return (e.error(a), new Error(a));
}
function Qr(e, n, a) {
	return `[CONVEX ${v0(e)}(${n})] ${a.errorMessage}
  Called by client`;
}
function Ed(e, n) {
	return ((n.data = e.errorData), n);
}
function Ga(e) {
	const n = e.split(":");
	let a, u;
	return (
		n.length === 1 ? ((a = n[0]), (u = "default")) : ((a = n.slice(0, n.length - 1).join(":")), (u = n[n.length - 1])),
		a.endsWith(".js") && (a = a.slice(0, -3)),
		`${a}:${u}`
	);
}
function Pa(e, n) {
	return JSON.stringify({ udfPath: Ga(e), args: Ya(n) });
}
function Ny(e, n, a) {
	const { initialNumItems: u, id: s } = a;
	return JSON.stringify({ type: "paginated", udfPath: Ga(e), args: Ya(n), options: Ya({ initialNumItems: u, id: s }) });
}
function e1(e) {
	return JSON.parse(e).type === "paginated";
}
var t1 = Object.defineProperty,
	n1 = (e, n, a) => (n in e ? t1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Jn = (e, n, a) => n1(e, typeof n != "symbol" ? n + "" : n, a),
	i1 = class {
		constructor() {
			(Jn(this, "nextQueryId"),
				Jn(this, "querySetVersion"),
				Jn(this, "querySet"),
				Jn(this, "queryIdToToken"),
				Jn(this, "identityVersion"),
				Jn(this, "auth"),
				Jn(this, "outstandingQueriesOlderThanRestart"),
				Jn(this, "outstandingAuthOlderThanRestart"),
				Jn(this, "paused"),
				Jn(this, "pendingQuerySetModifications"),
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
		subscribe(e, n, a, u) {
			const s = Ga(e),
				o = Pa(s, n),
				f = this.querySet.get(o);
			if (f !== void 0)
				return (
					(f.numSubscribers += 1),
					{ queryToken: o, modification: null, unsubscribe: () => this.removeSubscriber(o) }
				);
			{
				const h = this.nextQueryId++,
					m = { id: h, canonicalizedUdfPath: s, args: n, numSubscribers: 1, journal: a, componentPath: u };
				(this.querySet.set(o, m), this.queryIdToToken.set(h, o));
				const g = this.querySetVersion,
					y = this.querySetVersion + 1,
					S = { type: "Add", queryId: h, udfPath: s, args: [Ya(n)], journal: a, componentPath: u };
				return (
					this.paused ? this.pendingQuerySetModifications.set(h, S) : (this.querySetVersion = y),
					{
						queryToken: o,
						modification: { type: "ModifyQuerySet", baseVersion: g, newVersion: y, modifications: [S] },
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
						const a = n.journal;
						if (a !== void 0) {
							const u = this.queryIdToToken.get(n.queryId);
							u !== void 0 && (this.querySet.get(u).journal = a);
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
			const a = Pa(Ga(e), n),
				u = this.querySet.get(a);
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
			const a = { tokenType: "Admin", value: e, impersonating: n };
			this.auth = a;
			const u = this.identityVersion;
			return (this.paused || (this.identityVersion = u + 1), { type: "Authenticate", baseVersion: u, ...a });
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
					args: [Ya(u.args)],
					journal: u.journal,
					componentPath: u.componentPath,
				};
				(e.push(s), this.outstandingQueriesOlderThanRestart.add(u.id));
			}
			this.querySetVersion = 1;
			const n = { type: "ModifyQuerySet", baseVersion: 0, newVersion: 1, modifications: e };
			if (!this.auth) return ((this.identityVersion = 0), [n, void 0]);
			this.outstandingAuthOlderThanRestart = !0;
			const a = { type: "Authenticate", baseVersion: 0, ...this.auth };
			return ((this.identityVersion = 1), [n, a]);
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
				const a = this.querySetVersion,
					u = this.querySetVersion + 1,
					s = { type: "Remove", queryId: n.id };
				return (
					this.paused
						? this.pendingQuerySetModifications.has(n.id)
							? this.pendingQuerySetModifications.delete(n.id)
							: this.pendingQuerySetModifications.set(n.id, s)
						: (this.querySetVersion = u),
					{ type: "ModifyQuerySet", baseVersion: a, newVersion: u, modifications: [s] }
				);
			}
		}
	},
	a1 = Object.defineProperty,
	r1 = (e, n, a) => (n in e ? a1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Qs = (e, n, a) => r1(e, typeof n != "symbol" ? n + "" : n, a),
	u1 = class {
		constructor(e, n) {
			((this.logger = e),
				(this.markConnectionStateDirty = n),
				Qs(this, "inflightRequests"),
				Qs(this, "requestsOlderThanRestart"),
				Qs(this, "inflightMutationsCount", 0),
				Qs(this, "inflightActionsCount", 0),
				(this.inflightRequests = new Map()),
				(this.requestsOlderThanRestart = new Set()));
		}
		request(e, n) {
			const a = new Promise((u) => {
				const s = n ? "Requested" : "NotSent";
				(this.inflightRequests.set(e.requestId, {
					message: e,
					status: { status: s, requestedAt: new Date(), onResult: u },
				}),
					e.type === "Mutation" ? this.inflightMutationsCount++ : e.type === "Action" && this.inflightActionsCount++);
			});
			return (this.markConnectionStateDirty(), a);
		}
		onResponse(e) {
			const n = this.inflightRequests.get(e.requestId);
			if (n === void 0 || n.status.status === "Completed") return null;
			const a = n.message.type === "Mutation" ? "mutation" : "action",
				u = n.message.udfPath;
			for (const h of e.logLines) uo(this.logger, "info", a, u, h);
			const s = n.status;
			let o, f;
			if (e.success) ((o = { success: !0, logLines: e.logLines, value: eu(e.result) }), (f = () => s.onResult(o)));
			else {
				const h = e.result,
					{ errorData: m } = e;
				(uo(this.logger, "error", a, u, h),
					(o = { success: !1, errorMessage: h, errorData: m !== void 0 ? eu(m) : void 0, logLines: e.logLines }),
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
			for (const [a, u] of this.inflightRequests.entries()) {
				const s = u.status;
				s.status === "Completed" &&
					s.ts.lessThanOrEqual(e) &&
					(s.onResolve(),
					n.set(a, s.result),
					u.message.type === "Mutation"
						? this.inflightMutationsCount--
						: u.message.type === "Action" && this.inflightActionsCount--,
					this.inflightRequests.delete(a),
					this.requestsOlderThanRestart.delete(a));
			}
			return (n.size > 0 && this.markConnectionStateDirty(), n);
		}
		restart() {
			this.requestsOlderThanRestart = new Set(this.inflightRequests.keys());
			const e = [];
			for (const [n, a] of this.inflightRequests) {
				if (a.status.status === "NotSent") {
					((a.status.status = "Requested"), e.push(a.message));
					continue;
				}
				if (a.message.type === "Mutation") e.push(a.message);
				else if (a.message.type === "Action") {
					if (
						(this.inflightRequests.delete(n),
						this.requestsOlderThanRestart.delete(n),
						this.inflightActionsCount--,
						a.status.status === "Completed")
					)
						throw new Error("Action should never be in 'Completed' state");
					a.status.onResult({ success: !1, errorMessage: "Connection lost while action was in flight", logLines: [] });
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
	lo = Symbol.for("functionName"),
	l1 = Symbol.for("toReferencePath");
function s1(e) {
	return e[l1] ?? null;
}
function o1(e) {
	return e.startsWith("function://");
}
function c1(e) {
	let n;
	if (typeof e == "string") o1(e) ? (n = { functionHandle: e }) : (n = { name: e });
	else if (e[lo]) n = { name: e[lo] };
	else {
		const a = s1(e);
		if (!a) throw new Error(`${e} is not a functionReference`);
		n = { reference: a };
	}
	return n;
}
function Ci(e) {
	const n = c1(e);
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
	const a = e[lo];
	if (!a) throw new Error(`${e} is not a functionReference`);
	return a;
}
function y0(e = []) {
	return new Proxy(
		{},
		{
			get(n, a) {
				if (typeof a == "string") return y0([...e, a]);
				if (a === lo) {
					if (e.length < 2) {
						const o = ["api", ...e].join(".");
						throw new Error(`API path is expected to be of the form \`api.moduleName.functionName\`. Found: \`${o}\``);
					}
					const u = e.slice(0, -1).join("/"),
						s = e[e.length - 1];
					return s === "default" ? u : u + ":" + s;
				} else return a === Symbol.toStringTag ? "FunctionReference" : void 0;
			},
		},
	);
}
var Ln = y0(),
	f1 = Object.defineProperty,
	d1 = (e, n, a) => (n in e ? f1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	so = (e, n, a) => d1(e, typeof n != "symbol" ? n + "" : n, a),
	Oy = class Td {
		constructor(n) {
			(so(this, "queryResults"), so(this, "modifiedQueries"), (this.queryResults = n), (this.modifiedQueries = []));
		}
		getQuery(n, ...a) {
			const u = da(a[0]),
				s = Ci(n),
				o = this.queryResults.get(Pa(s, u));
			if (o !== void 0) return Td.queryValue(o.result);
		}
		getAllQueries(n) {
			const a = [],
				u = Ci(n);
			for (const s of this.queryResults.values())
				s.udfPath === Ga(u) && a.push({ args: s.args, value: Td.queryValue(s.result) });
			return a;
		}
		setQuery(n, a, u) {
			const s = da(a),
				o = Ci(n),
				f = Pa(o, s);
			let h;
			u === void 0 ? (h = void 0) : (h = { success: !0, value: u, logLines: [] });
			const m = { udfPath: o, args: s, result: h };
			(this.queryResults.set(f, m), this.modifiedQueries.push(f));
		}
		static queryValue(n) {
			if (n !== void 0) return n.success ? n.value : void 0;
		}
	},
	h1 = class {
		constructor() {
			(so(this, "queryResults"),
				so(this, "optimisticUpdates"),
				(this.queryResults = new Map()),
				(this.optimisticUpdates = []));
		}
		ingestQueryResultsFromServer(e, n) {
			this.optimisticUpdates = this.optimisticUpdates.filter((o) => !n.has(o.mutationId));
			const a = this.queryResults;
			this.queryResults = new Map(e);
			const u = new Oy(this.queryResults);
			for (const o of this.optimisticUpdates) o.update(u);
			const s = [];
			for (const [o, f] of this.queryResults) {
				const h = a.get(o);
				(h === void 0 || h.result !== f.result) && s.push(o);
			}
			return s;
		}
		applyOptimisticUpdate(e, n) {
			this.optimisticUpdates.push({ update: e, mutationId: n });
			const a = new Oy(this.queryResults);
			return (e(a), a.modifiedQueries);
		}
		rawQueryResult(e) {
			const n = this.queryResults.get(e);
			if (n !== void 0) return n.result;
		}
		queryResult(e) {
			const n = this.queryResults.get(e);
			if (n === void 0) return;
			const a = n.result;
			if (a !== void 0) {
				if (a.success) return a.value;
				throw a.errorData !== void 0 ? Ed(a, new wd(Qr("query", n.udfPath, a))) : new Error(Qr("query", n.udfPath, a));
			}
		}
		hasQueryResult(e) {
			return this.queryResults.get(e) !== void 0;
		}
		queryLogs(e) {
			return this.queryResults.get(e)?.result?.logLines;
		}
	},
	m1 = Object.defineProperty,
	v1 = (e, n, a) => (n in e ? m1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	nd = (e, n, a) => v1(e, typeof n != "symbol" ? n + "" : n, a),
	pl = class xi {
		constructor(n, a) {
			(nd(this, "low"),
				nd(this, "high"),
				nd(this, "__isUnsignedLong__"),
				(this.low = n | 0),
				(this.high = a | 0),
				(this.__isUnsignedLong__ = !0));
		}
		static isLong(n) {
			return (n && n.__isUnsignedLong__) === !0;
		}
		static fromBytesLE(n) {
			return new xi(n[0] | (n[1] << 8) | (n[2] << 16) | (n[3] << 24), n[4] | (n[5] << 8) | (n[6] << 16) | (n[7] << 24));
		}
		toBytesLE() {
			const n = this.high,
				a = this.low;
			return [
				a & 255,
				(a >>> 8) & 255,
				(a >>> 16) & 255,
				a >>> 24,
				n & 255,
				(n >>> 8) & 255,
				(n >>> 16) & 255,
				n >>> 24,
			];
		}
		static fromNumber(n) {
			return isNaN(n) || n < 0 ? ky : n >= g1 ? y1 : new xi((n % ol) | 0, (n / ol) | 0);
		}
		toString() {
			return (BigInt(this.high) * BigInt(ol) + BigInt(this.low)).toString();
		}
		equals(n) {
			return (
				xi.isLong(n) || (n = xi.fromValue(n)),
				this.high >>> 31 === 1 && n.high >>> 31 === 1 ? !1 : this.high === n.high && this.low === n.low
			);
		}
		notEquals(n) {
			return !this.equals(n);
		}
		comp(n) {
			return (
				xi.isLong(n) || (n = xi.fromValue(n)),
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
			return typeof n == "number" ? xi.fromNumber(n) : new xi(n.low, n.high);
		}
	},
	ky = new pl(0, 0),
	My = 65536,
	ol = My * My,
	g1 = ol * ol,
	y1 = new pl(-1, -1),
	p1 = Object.defineProperty,
	b1 = (e, n, a) => (n in e ? p1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Ps = (e, n, a) => b1(e, typeof n != "symbol" ? n + "" : n, a),
	zy = class {
		constructor(e, n) {
			(Ps(this, "version"),
				Ps(this, "remoteQuerySet"),
				Ps(this, "queryPath"),
				Ps(this, "logger"),
				(this.version = { querySet: 0, ts: pl.fromNumber(0), identity: 0 }),
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
			for (const a of e.modifications)
				switch (a.type) {
					case "QueryUpdated": {
						const u = this.queryPath(a.queryId);
						if (u) for (const o of a.logLines) uo(this.logger, "info", "query", u, o);
						const s = eu(a.value ?? null);
						this.remoteQuerySet.set(a.queryId, { success: !0, value: s, logLines: a.logLines });
						break;
					}
					case "QueryFailed": {
						const u = this.queryPath(a.queryId);
						if (u) for (const o of a.logLines) uo(this.logger, "info", "query", u, o);
						const { errorData: s } = a;
						this.remoteQuerySet.set(a.queryId, {
							success: !1,
							errorMessage: a.errorMessage,
							errorData: s !== void 0 ? eu(s) : void 0,
							logLines: a.logLines,
						});
						break;
					}
					case "QueryRemoved":
						this.remoteQuerySet.delete(a.queryId);
						break;
					default:
						throw new Error(`Invalid modification ${a.type}`);
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
function id(e) {
	const n = dl(e);
	return pl.fromBytesLE(Array.from(n));
}
function _1(e) {
	const n = new Uint8Array(e.toBytesLE());
	return hl(n);
}
function Dy(e) {
	switch (e.type) {
		case "FatalError":
		case "AuthError":
		case "ActionResponse":
		case "TransitionChunk":
		case "Ping":
			return { ...e };
		case "MutationResponse":
			return e.success ? { ...e, ts: id(e.ts) } : { ...e };
		case "Transition":
			return {
				...e,
				startVersion: { ...e.startVersion, ts: id(e.startVersion.ts) },
				endVersion: { ...e.endVersion, ts: id(e.endVersion.ts) },
			};
		default:
	}
}
function S1(e) {
	switch (e.type) {
		case "Authenticate":
		case "ModifyQuerySet":
		case "Mutation":
		case "Action":
		case "Event":
			return { ...e };
		case "Connect":
			return e.maxObservedTimestamp !== void 0
				? { ...e, maxObservedTimestamp: _1(e.maxObservedTimestamp) }
				: { ...e, maxObservedTimestamp: void 0 };
		default:
	}
}
var w1 = Object.defineProperty,
	E1 = (e, n, a) => (n in e ? w1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Ct = (e, n, a) => E1(e, typeof n != "symbol" ? n + "" : n, a),
	T1 = 1e3,
	x1 = 1001,
	A1 = 1005,
	C1 = 4040,
	to;
function Hr() {
	return (
		to === void 0 && (to = Date.now()),
		typeof performance > "u" || !performance.now ? Date.now() : Math.round(to + performance.now())
	);
}
function jy() {
	return `t=${Math.round((Hr() - to) / 100) / 10}s`;
}
var p0 = {
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
function R1(e) {
	if (e === void 0) return "Unknown";
	for (const n of Object.keys(p0)) if (e.startsWith(n)) return n;
	return "Unknown";
}
var N1 = class {
	constructor(e, n, a, u, s, o) {
		((this.markConnectionStateDirty = s),
			(this.debug = o),
			Ct(this, "socket"),
			Ct(this, "connectionCount"),
			Ct(this, "_hasEverConnected", !1),
			Ct(this, "lastCloseReason"),
			Ct(this, "transitionChunkBuffer", null),
			Ct(this, "defaultInitialBackoff"),
			Ct(this, "maxBackoff"),
			Ct(this, "retries"),
			Ct(this, "serverInactivityThreshold"),
			Ct(this, "reconnectDueToServerInactivityTimeout"),
			Ct(this, "scheduledReconnect", null),
			Ct(this, "networkOnlineHandler", null),
			Ct(this, "pendingNetworkRecoveryInfo", null),
			Ct(this, "uri"),
			Ct(this, "onOpen"),
			Ct(this, "onResume"),
			Ct(this, "onMessage"),
			Ct(this, "webSocketConstructor"),
			Ct(this, "logger"),
			Ct(this, "onServerDisconnectError"),
			(this.webSocketConstructor = a),
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
			const a = Dy(JSON.parse(n));
			if (a.type !== "Transition") throw new Error(`Expected Transition, got ${a.type} after assembling chunks`);
			return a;
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
							clientTs: Hr(),
						})),
					this.lastCloseReason !== "InitialConnect" &&
						(this.lastCloseReason
							? this.logger.log("WebSocket reconnected at", jy(), "after disconnect due to", this.lastCloseReason)
							: this.logger.log("WebSocket reconnected at", jy())),
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
				const a = n.message;
				a && this.logger.log(`WebSocket error message: ${a}`);
			}),
			(e.onmessage = (n) => {
				this.resetServerInactivityTimeout();
				const a = n.data.length;
				let u = Dy(JSON.parse(n.data));
				if ((this._logVerbose(`received ws message with type ${u.type}`), u.type !== "Ping")) {
					if (u.type === "TransitionChunk") {
						const s = this.assembleTransition(u);
						if (!s) return;
						((u = s), this._logVerbose(`assembled full ws message of type ${u.type}`));
					}
					(this.transitionChunkBuffer !== null &&
						((this.transitionChunkBuffer = null),
						this.logger.log(`Received unexpected ${u.type} while buffering TransitionChunks`)),
						u.type === "Transition" && this.reportLargeTransition({ messageLength: a, transition: u }),
						this.onMessage(u).hasSyncedPastLastReconnect && ((this.retries = 0), this.markConnectionStateDirty()));
				}
			}),
			(e.onclose = (n) => {
				if (
					(this._logVerbose("begin ws.onclose"),
					(this.transitionChunkBuffer = null),
					this.lastCloseReason === null && (this.lastCloseReason = n.reason || `closed with code ${n.code}`),
					n.code !== T1 && n.code !== x1 && n.code !== A1 && n.code !== C1)
				) {
					let u = `WebSocket closed with code ${n.code}`;
					(n.reason && (u += `: ${n.reason}`),
						this.logger.log(u),
						this.onServerDisconnectError && n.reason && this.onServerDisconnectError(u));
				}
				const a = R1(n.reason);
				this.scheduleReconnect(a);
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
			const a = S1(e),
				u = JSON.stringify(a);
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
		const a = Hr(),
			u = setTimeout(() => {
				this.scheduledReconnect?.timeout === u && ((this.scheduledReconnect = null), this.connect());
			}, n);
		this.scheduledReconnect = { timeout: u, scheduledAt: a, backoffMs: n };
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
				e.onmessage = (a) => {
					this._logVerbose("Ignoring message received after close");
				};
				const n = new Promise((a) => {
					e.onclose = () => {
						a();
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
			const n = Hr() - this.scheduledReconnect.scheduledAt;
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
							clientTs: Hr(),
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
			(e === "client" ? 100 : e === "Unknown" ? this.defaultInitialBackoff : p0[e].timeout) * Math.pow(2, this.retries);
		this.retries += 1;
		const a = Math.min(n, this.maxBackoff);
		return a + a * (Math.random() - 0.5);
	}
	reportLargeTransition({ transition: e, messageLength: n }) {
		if (e.clientClockSkew === void 0 || e.serverTs === void 0) return;
		const a = Hr() - e.clientClockSkew - e.serverTs / 1e6,
			u = `${Math.round(a)}ms`,
			s = `${Math.round(n / 1e4) / 100}MB`,
			o = n / (a / 1e3),
			f = `${Math.round(o / 1e4) / 100}MB per second`;
		(this._logVerbose(`received ${s} transition in ${u} at ${f}`),
			n > 2e7
				? this.logger.log(
						`received query results totaling more that 20MB (${s}) which will take a long time to download on slower connections`,
					)
				: a > 2e4 && this.logger.log(`received query results totaling ${s} which took more than 20s to arrive (${u})`),
			this.debug &&
				this.sendMessage({
					type: "Event",
					eventType: "ClientReceivedTransition",
					event: { transitionTransitTime: a, messageLength: n },
				}));
	}
};
function O1() {
	return k1();
}
function k1() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
		const n = (Math.random() * 16) | 0;
		return (e === "x" ? n : (n & 3) | 8).toString(16);
	});
}
var ll = class extends Error {};
ll.prototype.name = "InvalidTokenError";
function M1(e) {
	return decodeURIComponent(
		atob(e).replace(/(.)/g, (n, a) => {
			let u = a.charCodeAt(0).toString(16).toUpperCase();
			return (u.length < 2 && (u = "0" + u), "%" + u);
		}),
	);
}
function z1(e) {
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
		return M1(n);
	} catch {
		return atob(n);
	}
}
function b0(e, n) {
	if (typeof e != "string") throw new ll("Invalid token specified: must be a string");
	n || (n = {});
	const a = n.header === !0 ? 0 : 1,
		u = e.split(".")[a];
	if (typeof u != "string") throw new ll(`Invalid token specified: missing part #${a + 1}`);
	let s;
	try {
		s = z1(u);
	} catch (o) {
		throw new ll(`Invalid token specified: invalid base64 for part #${a + 1} (${o.message})`);
	}
	try {
		return JSON.parse(s);
	} catch (o) {
		throw new ll(`Invalid token specified: invalid json for part #${a + 1} (${o.message})`);
	}
}
var D1 = Object.defineProperty,
	j1 = (e, n, a) => (n in e ? D1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	on = (e, n, a) => j1(e, typeof n != "symbol" ? n + "" : n, a),
	L1 = 480 * 60 * 60 * 1e3,
	Ly = 2,
	q1 = class {
		constructor(e, n, a) {
			(on(this, "authState", { state: "noAuth" }),
				on(this, "configVersion", 0),
				on(this, "syncState"),
				on(this, "authenticate"),
				on(this, "stopSocket"),
				on(this, "tryRestartSocket"),
				on(this, "pauseSocket"),
				on(this, "resumeSocket"),
				on(this, "clearAuth"),
				on(this, "logger"),
				on(this, "refreshTokenLeewaySeconds"),
				on(this, "initialAuthTokenReuse"),
				on(this, "lastRefreshChange"),
				on(this, "tokenConfirmationAttempts", 0),
				(this.syncState = e),
				(this.authenticate = n.authenticate),
				(this.stopSocket = n.stopSocket),
				(this.tryRestartSocket = n.tryRestartSocket),
				(this.pauseSocket = n.pauseSocket),
				(this.resumeSocket = n.resumeSocket),
				(this.clearAuth = n.clearAuth),
				(this.logger = a.logger),
				(this.refreshTokenLeewaySeconds = a.refreshTokenLeewaySeconds),
				(this.initialAuthTokenReuse = a.initialAuthTokenReuse),
				(this.lastRefreshChange = !1));
		}
		notifyRefreshChange(e) {
			this.authState.state !== "noAuth" &&
				this.authState.state !== "initialRefetch" &&
				this.authState.config.onRefreshChange &&
				this.lastRefreshChange !== e &&
				((this.lastRefreshChange = e), this.authState.config.onRefreshChange(e));
		}
		async setConfig(e, n, a) {
			(this.resetAuthState(), this._logVerbose("pausing WS for auth token fetch"), this.pauseSocket());
			const u = await this.fetchTokenAndGuardAgainstRace(e, { forceRefreshToken: !1 });
			if (u.isFromOutdatedConfig) return;
			const s = { fetchToken: e, onAuthChange: n, onRefreshChange: a };
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
					(this.authState.state === "waitingForServerConfirmationOfFreshToken" && this.tokenConfirmationAttempts >= Ly))
			) {
				(this.logger.error(`Failed to authenticate: "${e.error}", check your server auth config`),
					this.syncState.hasAuth() && this.syncState.clearAuth(),
					this.authState.state !== "noAuth" && this.setAndReportAuthFailed(this.authState.config.onAuthChange));
				return;
			}
			if (
				(this.authState.state === "waitingForServerConfirmationOfFreshToken" &&
					(this.tokenConfirmationAttempts++,
					this._logVerbose(`retrying reauthentication, ${Ly - this.tokenConfirmationAttempts} attempts remaining`)),
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
			const a = this.decodeToken(e);
			if (!a) {
				this.logger.error("Auth token is not a valid JWT, cannot refetch the token");
				return;
			}
			const { iat: u, exp: s } = a;
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
			let h = Math.min(L1, (f - this.refreshTokenLeewaySeconds) * 1e3);
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
			const a = ++this.configVersion;
			this._logVerbose(`fetching token with config version ${a}`);
			const u = await e(n);
			return this.configVersion !== a
				? (this._logVerbose(`stale config version, expected ${a}, got ${this.configVersion}`),
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
				return b0(e);
			} catch (n) {
				return (this._logVerbose(`Error decoding token: ${n instanceof Error ? n.message : "Unknown error"}`), null);
			}
		}
		_logVerbose(e) {
			this.logger.logVerbose(`${e} [v${this.configVersion}]`);
		}
	},
	U1 = ["convexClientConstructed", "convexWebSocketOpen", "convexFirstMessageReceived"];
function $1(e, n) {
	const a = { sessionId: n };
	typeof performance > "u" || !performance.mark || performance.mark(e, { detail: a });
}
function B1(e) {
	let n = e.name.slice(6);
	return ((n = n.charAt(0).toLowerCase() + n.slice(1)), { name: n, startTime: e.startTime });
}
function I1(e) {
	if (typeof performance > "u" || !performance.getEntriesByName) return [];
	const n = [];
	for (const a of U1) {
		const u = performance
			.getEntriesByName(a)
			.filter((s) => s.entryType === "mark")
			.filter((s) => s.detail.sessionId === e);
		n.push(...u);
	}
	return n.map(B1);
}
var Z1 = Object.defineProperty,
	H1 = (e, n, a) => (n in e ? Z1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Rt = (e, n, a) => H1(e, typeof n != "symbol" ? n + "" : n, a),
	V1 = class {
		constructor(e, n, a) {
			if (
				(Rt(this, "address"),
				Rt(this, "state"),
				Rt(this, "requestManager"),
				Rt(this, "webSocketManager"),
				Rt(this, "authenticationManager"),
				Rt(this, "remoteQuerySet"),
				Rt(this, "optimisticQueryResults"),
				Rt(this, "_transitionHandlerCounter", 0),
				Rt(this, "_nextRequestId"),
				Rt(this, "_onTransitionFns", new Map()),
				Rt(this, "_sessionId"),
				Rt(this, "firstMessageReceived", !1),
				Rt(this, "debug"),
				Rt(this, "logger"),
				Rt(this, "maxObservedTimestamp"),
				Rt(this, "connectionStateSubscribers", new Map()),
				Rt(this, "nextConnectionStateSubscriberId", 0),
				Rt(this, "_lastPublishedConnectionState"),
				Rt(this, "markConnectionStateDirty", () => {
					Promise.resolve().then(() => {
						const b = this.connectionState();
						if (JSON.stringify(b) !== JSON.stringify(this._lastPublishedConnectionState)) {
							this._lastPublishedConnectionState = b;
							for (const p of this.connectionStateSubscribers.values()) p(b);
						}
					});
				}),
				Rt(this, "mark", (b) => {
					this.debug && $1(b, this.sessionId);
				}),
				typeof e == "object")
			)
				throw new Error(
					"Passing a ClientConfig object is no longer supported. Pass the URL of the Convex deployment as a string directly.",
				);
			(a?.skipConvexDeploymentUrlCheck !== !0 && c0(e), (a = { ...a }));
			const u = a.authRefreshTokenLeewaySeconds ?? 10;
			let s = a.webSocketConstructor;
			if (!s && typeof WebSocket > "u")
				throw new Error(
					"No WebSocket global variable defined! To use Convex in an environment without WebSocket try the HTTP client: https://docs.convex.dev/api/classes/browser.ConvexHttpClient",
				);
			((s = s || WebSocket),
				(this.debug = a.reportDebugInfoToConvex ?? !1),
				(this.address = e),
				(this.logger =
					a.logger === !1
						? Jw({ verbose: a.verbose ?? !1 })
						: a.logger !== !0 && a.logger
							? a.logger
							: Fw({ verbose: a.verbose ?? !1 })));
			const o = e.search("://");
			if (o === -1) throw new Error("Provided address was not an absolute URL.");
			const f = e.substring(o + 3),
				h = e.substring(0, o);
			let m;
			if (h === "http") m = "ws";
			else if (h === "https") m = "wss";
			else throw new Error(`Unknown parent protocol ${h}`);
			const g = `${m}://${f}/api/${Ey}/sync`;
			((this.state = new i1()),
				(this.remoteQuerySet = new zy((b) => this.state.queryPath(b), this.logger)),
				(this.requestManager = new u1(this.logger, this.markConnectionStateDirty)));
			const y = () => {
				(this.webSocketManager.pause(), this.state.pause());
			};
			((this.authenticationManager = new q1(
				this.state,
				{
					authenticate: (b) => {
						const p = this.state.setAuth(b);
						return (this.webSocketManager.sendMessage(p), p.baseVersion);
					},
					stopSocket: () => this.webSocketManager.stop(),
					tryRestartSocket: () => this.webSocketManager.tryRestart(),
					pauseSocket: y,
					resumeSocket: () => this.webSocketManager.resume(),
					clearAuth: () => {
						this.clearAuth();
					},
				},
				{ logger: this.logger, refreshTokenLeewaySeconds: u, initialAuthTokenReuse: a.initialAuthTokenReuse ?? !1 },
			)),
				(this.optimisticQueryResults = new h1()),
				this.addOnTransitionHandler((b) => {
					n(b.queries.map((p) => p.token));
				}),
				(this._nextRequestId = 0),
				(this._sessionId = O1()));
			const { unsavedChangesWarning: S } = a;
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
			((this.webSocketManager = new N1(
				g,
				{
					onOpen: (b) => {
						(this.mark("convexWebSocketOpen"),
							this.webSocketManager.sendMessage({
								...b,
								type: "Connect",
								sessionId: this._sessionId,
								maxObservedTimestamp: this.maxObservedTimestamp,
							}),
							(this.remoteQuerySet = new zy((x) => this.state.queryPath(x), this.logger)));
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
								const p = Ww(this.logger, b.error);
								throw (this.webSocketManager.terminate(), p);
							}
							default:
						}
						return { hasSyncedPastLastReconnect: this.hasSyncedPastLastReconnect() };
					},
					onServerDisconnectError: a.onServerDisconnectError,
				},
				s,
				this.logger,
				this.markConnectionStateDirty,
				this.debug,
			)),
				this.mark("convexClientConstructed"),
				a.expectAuth && y());
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
				a = new Map();
			for (const [s, o] of n) {
				const f = this.state.queryToken(s);
				if (f !== null) {
					const h = { result: o, udfPath: this.state.queryPath(s), args: this.state.queryArgs(s) };
					a.set(f, h);
				}
			}
			const u = this.optimisticQueryResults.ingestQueryResultsFromServer(a, new Set(e.keys()));
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
					n = e ? b0(e.value) : {};
				} catch {
					n = {};
				}
			else return;
			return { token: e.value, decoded: n };
		}
		setAuth(e, n, a) {
			this.authenticationManager.setConfig(e, n, a);
		}
		hasAuth() {
			return this.state.hasAuth();
		}
		setAdminAuth(e, n) {
			const a = this.state.setAdminAuth(e, n);
			this.webSocketManager.sendMessage(a);
		}
		clearAuth() {
			const e = this.state.clearAuth();
			this.webSocketManager.sendMessage(e);
		}
		subscribe(e, n, a) {
			const u = da(n),
				{ modification: s, queryToken: o, unsubscribe: f } = this.state.subscribe(e, u, a?.journal, a?.componentPath);
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
			const a = Pa(e, da(n));
			return this.optimisticQueryResults.queryResult(a);
		}
		localQueryResultByToken(e) {
			return this.optimisticQueryResults.queryResult(e);
		}
		hasLocalQueryResultByToken(e) {
			return this.optimisticQueryResults.hasQueryResult(e);
		}
		localQueryLogs(e, n) {
			const a = Pa(e, da(n));
			return this.optimisticQueryResults.queryLogs(a);
		}
		queryJournal(e, n) {
			const a = Pa(e, da(n));
			return this.state.queryJournal(a);
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
		async mutation(e, n, a) {
			const u = await this.mutationInternal(e, n, a);
			if (!u.success)
				throw u.errorData !== void 0 ? Ed(u, new wd(Qr("mutation", e, u))) : new Error(Qr("mutation", e, u));
			return u.value;
		}
		async mutationInternal(e, n, a, u) {
			const { mutationPromise: s } = this.enqueueMutation(e, n, a, u);
			return s;
		}
		enqueueMutation(e, n, a, u) {
			const s = da(n);
			this.tryReportLongDisconnect();
			const o = this.nextRequestId;
			if ((this._nextRequestId++, a !== void 0)) {
				const m = a.optimisticUpdate;
				if (m !== void 0) {
					const g = (S) => {
							m(S, s) instanceof Promise &&
								this.logger.warn(
									"Optimistic update handler returned a Promise. Optimistic updates should be synchronous.",
								);
						},
						y = this.optimisticQueryResults.applyOptimisticUpdate(g, o).map((S) => {
							const b = this.localQueryResultByToken(S);
							return {
								token: S,
								modification: {
									kind: "Updated",
									result: b === void 0 ? void 0 : { success: !0, value: b, logLines: [] },
								},
							};
						});
					this.handleTransition({ queries: y, reflectedMutations: [], timestamp: this.remoteQuerySet.timestamp() });
				}
			}
			const f = { type: "Mutation", requestId: o, udfPath: e, componentPath: u, args: [Ya(s)] },
				h = this.webSocketManager.sendMessage(f);
			return { requestId: o, mutationPromise: this.requestManager.request(f, h) };
		}
		async action(e, n) {
			const a = await this.actionInternal(e, n);
			if (!a.success) throw a.errorData !== void 0 ? Ed(a, new wd(Qr("action", e, a))) : new Error(Qr("action", e, a));
			return a.value;
		}
		async actionInternal(e, n, a) {
			const u = da(n),
				s = this.nextRequestId;
			(this._nextRequestId++, this.tryReportLongDisconnect());
			const o = { type: "Action", requestId: s, udfPath: e, componentPath: a, args: [Ya(u)] },
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
				const e = I1(this.sessionId);
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
				headers: { "Content-Type": "application/json", "Convex-Client": `npm-${Ey}` },
				body: JSON.stringify({ event: "LongWebsocketDisconnect" }),
			})
				.then((a) => {
					a.ok || this.logger.warn("Analytics request failed with response:", a.body);
				})
				.catch((a) => {
					this.logger.warn("Analytics response failed with error:", a);
				});
		}
	};
function ad(e) {
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
var Q1 = Object.defineProperty,
	P1 = (e, n, a) => (n in e ? Q1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	qy = (e, n, a) => P1(e, typeof n != "symbol" ? n + "" : n, a),
	Y1 = class {
		constructor(e, n) {
			((this.client = e),
				(this.onTransition = n),
				qy(this, "paginatedQuerySet", new Map()),
				qy(this, "lastTransitionTs"),
				(this.lastTransitionTs = pl.fromNumber(0)),
				this.client.addOnTransitionHandler((a) => this.onBaseTransition(a)));
		}
		subscribe(e, n, a) {
			const u = Ga(e),
				s = Ny(u, n, a),
				o = () => this.removePaginatedQuerySubscriber(s),
				f = this.paginatedQuerySet.get(s);
			return f
				? ((f.numSubscribers += 1), { paginatedQueryToken: s, unsubscribe: o })
				: (this.paginatedQuerySet.set(s, {
						token: s,
						canonicalizedUdfPath: u,
						args: n,
						numSubscribers: 1,
						options: { initialNumItems: a.initialNumItems },
						nextPageKey: 0,
						pageKeys: [],
						pageKeyToQuery: new Map(),
						ongoingSplits: new Map(),
						skip: !1,
						id: a.id,
					}),
					this.addPageToPaginatedQuery(s, null, a.initialNumItems),
					{ paginatedQueryToken: s, unsubscribe: o });
		}
		localQueryResult(e, n, a) {
			const u = Ny(Ga(e), n, a);
			return this.localQueryResultByToken(u);
		}
		localQueryResultByToken(e) {
			const n = this.paginatedQuerySet.get(e);
			if (!n) return;
			const a = this.activePageQueryTokens(n);
			if (a.length === 0)
				return { results: [], status: "LoadingFirstPage", loadMore: (h) => this.loadMoreOfPaginatedQuery(e, h) };
			let u = [],
				s = !1,
				o = !1;
			for (const h of a) {
				const m = this.client.localQueryResultByToken(h);
				if (m === void 0) {
					((s = !0), (o = !1));
					continue;
				}
				const g = ad(m);
				((u = u.concat(g.page)), (o = !!g.isDone));
			}
			let f;
			return (
				s ? (f = u.length === 0 ? "LoadingFirstPage" : "LoadingMore") : o ? (f = "Exhausted") : (f = "CanLoadMore"),
				{ results: u, status: f, loadMore: (h) => this.loadMoreOfPaginatedQuery(e, h) }
			);
		}
		onBaseTransition(e) {
			const n = e.queries.map((o) => o.token),
				a = this.queriesContainingTokens(n);
			let u = [];
			a.length > 0 &&
				(this.processPaginatedQuerySplits(a, (o) => this.client.localQueryResultByToken(o)),
				(u = a.map((o) => ({ token: o, modification: { kind: "Updated", result: this.localQueryResultByToken(o) } }))));
			const s = { ...e, paginatedQueries: u };
			this.onTransition(s);
		}
		loadMoreOfPaginatedQuery(e, n) {
			this.mustGetPaginatedQuery(e);
			const a = this.queryTokenForLastPageOfPaginatedQuery(e),
				u = this.client.localQueryResultByToken(a);
			if (!u) return !1;
			const s = ad(u);
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
				a = new Set(e);
			for (const [u, s] of this.paginatedQuerySet)
				for (const o of this.allQueryTokens(s))
					if (a.has(o)) {
						n.push(u);
						break;
					}
			return n;
		}
		processPaginatedQuerySplits(e, n) {
			for (const a of e) {
				const u = this.mustGetPaginatedQuery(a),
					{ ongoingSplits: s, pageKeyToQuery: o, pageKeys: f } = u;
				for (const [h, [m, g]] of s)
					n(o.get(m).queryToken) !== void 0 &&
						n(o.get(g).queryToken) !== void 0 &&
						this.completePaginatedQuerySplit(u, h, m, g);
				for (const h of f) {
					if (s.has(h)) continue;
					const m = o.get(h);
					if (!m) throw new Error(`No page query for active pageKey ${h}`);
					const g = n(m.queryToken);
					if (!g) continue;
					const y = ad(g);
					y.splitCursor &&
						(y.pageStatus === "SplitRecommended" ||
							y.pageStatus === "SplitRequired" ||
							y.page.length > u.options.initialNumItems * 2) &&
						this.splitPaginatedQueryPage(u, h, m.cursor, y.splitCursor, y.continueCursor);
				}
			}
		}
		splitPaginatedQueryPage(e, n, a, u, s) {
			const o = e.nextPageKey++,
				f = e.nextPageKey++,
				h = { numItems: e.options.initialNumItems, id: e.id },
				m = this.client.subscribe(e.canonicalizedUdfPath, {
					...e.args,
					paginationOpts: { ...h, cursor: a, endCursor: u },
				});
			e.pageKeyToQuery.set(o, { ...m, cursor: a });
			const g = this.client.subscribe(e.canonicalizedUdfPath, {
				...e.args,
				paginationOpts: { ...h, cursor: u, endCursor: s },
			});
			(e.pageKeyToQuery.set(f, { ...g, cursor: u }), e.ongoingSplits.set(n, [o, f]));
		}
		addPageToPaginatedQuery(e, n, a) {
			const u = this.mustGetPaginatedQuery(e),
				s = u.nextPageKey++,
				o = { cursor: n, numItems: a, id: u.id },
				f = { ...u.args, paginationOpts: o },
				h = this.client.subscribe(u.canonicalizedUdfPath, f);
			return (u.pageKeys.push(s), u.pageKeyToQuery.set(s, { ...h, cursor: n }), h);
		}
		removePaginatedQuerySubscriber(e) {
			const n = this.paginatedQuerySet.get(e);
			if (n && ((n.numSubscribers -= 1), !(n.numSubscribers > 0))) {
				for (const a of n.pageKeyToQuery.values()) a.unsubscribe();
				this.paginatedQuerySet.delete(e);
			}
		}
		completePaginatedQuerySplit(e, n, a, u) {
			const s = e.pageKeyToQuery.get(n);
			e.pageKeyToQuery.delete(n);
			const o = e.pageKeys.indexOf(n);
			(e.pageKeys.splice(o, 1, a, u), e.ongoingSplits.delete(n), s.unsubscribe());
		}
		activePageQueryTokens(e) {
			return e.pageKeys.map((n) => e.pageKeyToQuery.get(n).queryToken);
		}
		allQueryTokens(e) {
			return Array.from(e.pageKeyToQuery.values()).map((n) => n.queryToken);
		}
		queryTokenForLastPageOfPaginatedQuery(e) {
			const n = this.mustGetPaginatedQuery(e),
				a = n.pageKeys[n.pageKeys.length - 1];
			if (a === void 0) throw new Error(`No pages for paginated query ${e}`);
			return n.pageKeyToQuery.get(a).queryToken;
		}
		mustGetPaginatedQuery(e) {
			const n = this.paginatedQuerySet.get(e);
			if (!n) throw new Error("paginated query no longer exists for token " + e);
			return n;
		}
	},
	G1 = Object.defineProperty,
	K1 = (e, n, a) => (n in e ? G1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Ir = (e, n, a) => K1(e, typeof n != "symbol" ? n + "" : n, a),
	Uy,
	X1 = class {
		constructor(e, n = {}) {
			(Ir(this, "listeners"),
				Ir(this, "_client"),
				Ir(this, "_paginatedClient"),
				Ir(this, "callNewListenersWithCurrentValuesTimer"),
				Ir(this, "_closed"),
				Ir(this, "_disabled"),
				n.skipConvexDeploymentUrlCheck !== !0 && c0(e));
			const { disabled: a, ...u } = n;
			((this._closed = !1),
				(this._disabled = !!a),
				Uy && !("webSocketConstructor" in u) && typeof WebSocket > "u" && (u.webSocketConstructor = Uy),
				typeof window > "u" && !("unsavedChangesWarning" in u) && (u.unsavedChangesWarning = !1),
				this.disabled ||
					((this._client = new V1(e, () => {}, u)),
					(this._paginatedClient = new Y1(this._client, (s) => this._transition(s)))),
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
		onUpdate(e, n, a, u) {
			if (this.disabled) return this.createDisabledUnsubscribe();
			const { queryToken: s, unsubscribe: o } = this.client.subscribe(Ci(e), n),
				f = {
					queryToken: s,
					callback: a,
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
		onPaginatedUpdate_experimental(e, n, a, u, s) {
			if (this.disabled) return this.createDisabledUnsubscribe();
			const o = { initialNumItems: a.initialNumItems, id: -1 },
				{ paginatedQueryToken: f, unsubscribe: h } = this.paginatedClient.subscribe(Ci(e), n, o),
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
			const g = {
					unsubscribe: () => {
						this.closed || (this.listeners.delete(m), h());
					},
					getCurrentValue: () => this.paginatedClient.localQueryResult(Ci(e), n, o),
					getQueryLogs: () => [],
				},
				y = g.unsubscribe;
			return (Object.assign(y, g), y);
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
		_transition({ queries: e, paginatedQueries: n }, a = !1) {
			const u = [...e.map((s) => s.token), ...n.map((s) => s.token)];
			for (const s of this.listeners) {
				const { callback: o, queryToken: f, onError: h, hasEverRun: m } = s,
					g = e1(f),
					y = g ? !!this.paginatedClient.localQueryResultByToken(f) : this.client.hasLocalQueryResultByToken(f);
				if (u.includes(f) || (a && !m && y)) {
					s.hasEverRun = !0;
					let S;
					try {
						g ? (S = this.paginatedClient.localQueryResultByToken(f)) : (S = this.client.localQueryResultByToken(f));
					} catch (b) {
						if (!(b instanceof Error)) throw b;
						h ? h(b, "Second argument to onUpdate onError is reserved for later use") : Promise.reject(b);
						continue;
					}
					o(S, "Second argument to onUpdate callback is reserved for later use");
				}
			}
		}
		async mutation(e, n, a) {
			if (this.disabled) throw new Error("ConvexClient is disabled");
			return await this.client.mutation(Ci(e), n, a);
		}
		async action(e, n) {
			if (this.disabled) throw new Error("ConvexClient is disabled");
			return await this.client.action(Ci(e), n);
		}
		async query(e, n) {
			if (this.disabled) throw new Error("ConvexClient is disabled");
			const a = this.client.localQueryResult(Ci(e), n);
			return a !== void 0
				? Promise.resolve(a)
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
	F1 = 6e4,
	J1 = 500,
	W1 = 1e4,
	eE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
	$y = 128,
	By = 109,
	Iy = 100,
	tE = /^[\x21-\x7e]+$/,
	Zy = 100,
	Hy = 16,
	Ys = 6,
	Vy = 24;
function Qy(e) {
	if (typeof e != "object" || e === null) return null;
	const n = e;
	if ((n.mode !== "light" && n.mode !== "dark") || typeof n.tokens != "object" || n.tokens === null) return null;
	const a = {};
	for (const [u, s] of Object.entries(n.tokens)) {
		if (typeof s != "string") return null;
		a[u] = s;
	}
	return { mode: n.mode, tokens: a };
}
var xd = { reason: "denied", message: "This plugin no longer has access to its data" },
	Ad = { reason: "session_expired", message: "This plugin session expired" },
	Qa = { reason: "unavailable", message: "The plugin data connection is unavailable" };
function nE(e) {
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
		const a = n.file;
		return (
			typeof a.fileNodeId == "string" &&
			typeof a.name == "string" &&
			typeof a.path == "string" &&
			typeof a.contentType == "string"
		);
	}
	return !1;
}
function iE() {
	const e = window.location.hash.slice(1);
	if (!e) throw new Error("Missing host bridge fragment — this plugin frame must be embedded by the Bonobo host app");
	const n = new URLSearchParams(e),
		a = n.getAll("parentOrigin"),
		u = n.getAll("bridgeNonce");
	if (n.size !== 2 || a.length !== 1 || u.length !== 1) throw new Error("Invalid host bridge fragment");
	const s = a[0],
		o = u[0];
	let f;
	try {
		f = new URL(s);
	} catch {
		throw new Error("Invalid host bridge parent origin");
	}
	if ((f.protocol !== "http:" && f.protocol !== "https:") || f.origin !== s)
		throw new Error("Invalid host bridge parent origin");
	if (!eE.test(o)) throw new Error("Invalid host bridge nonce");
	return { parentOrigin: s, bridgeNonce: o };
}
function rd(e) {
	return e.collection.length === 0 || e.collection.length > $y
		? `Collection names must be 1 to ${$y} characters`
		: e.keyPrefix !== void 0 && (e.keyPrefix.length > By || !tE.test(e.keyPrefix))
			? `Key prefixes must be 1 to ${By} printable ASCII characters`
			: !Number.isInteger(e.limit) || e.limit < 1 || e.limit > Iy
				? `Watch limits must be integers from 1 to ${Iy}`
				: null;
}
function aE(e) {
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
		a = () => {
			n.dead = !0;
			for (const A of n.intervals) A.stop();
			for (const A of n.pending?.replacements ?? []) A.stop();
			n.pending = null;
		},
		u = (A) => {
			n.dead || (a(), e.on_dead(A));
		},
		s = (A) => {
			if (n.dead || !e.acquire_server_slot()) return !1;
			let C = !1;
			const M = e.start_watch(
				e.queryArgs,
				{
					...(A.start === null ? {} : { keyStartExclusive: A.start }),
					...(A.end === null ? {} : { keyEndInclusive: A.end }),
				},
				(G) => {
					C || z(A, G);
				},
			);
			return M
				? ((A.stop = () => {
						C || ((C = !0), M.dispose(), e.release_server_slot());
					}),
					!0)
				: (e.release_server_slot(), !1);
		},
		o = (A) => {
			if (A.docs === null || A.docs.length === 0) return null;
			const C = A.previousFirstKey ?? A.docs[A.docs.length - 1].key;
			return C === A.start || C === A.end || new Set(A.docs.map((M) => M.key)).size < 2 ? null : C;
		},
		f = () => n.intervals.length + (n.pending?.replacements.length ?? 0),
		h = () => n.intervals.length + (n.pending ? n.pending.replacements.length - n.pending.removeCount : 0),
		m = (A) => (A.truncated ? (A.previousDocs ?? A.docs) : A.docs),
		g = (A) => {
			if (!n.pending) return;
			const C = A - n.pending.from;
			if (!(C < 0 || C >= n.pending.removeCount)) return n.pending.suppressedDocs[C];
		},
		y = () => {
			const A = n.intervals.flatMap((M, G) => {
					const $ = g(G);
					return ($ === void 0 ? M.docs : $) ?? [];
				}),
				C = n.intervals[n.intervals.length - 1];
			return {
				docs: A,
				hasMore: n.bottomOpen && !(C !== void 0 && C.end === null && C.docs !== null && !C.truncated),
				atCapacity: n.forceAtCapacity || n.intervals.length >= Ys || e.page_at_ceiling(),
				incomplete: n.intervals.some((M, G) =>
					M.end === null ||
					!M.truncated ||
					M.docs === null ||
					(n.pending && G >= n.pending.from && G < n.pending.from + n.pending.removeCount)
						? !1
						: o(M) === null || h() + 1 > Ys || e.page_at_ceiling(2),
				),
			};
		},
		S = () => {
			n.flushScheduled ||
				n.dead ||
				((n.flushScheduled = !0),
				queueMicrotask(() => {
					if (((n.flushScheduled = !1), n.dead)) return;
					const A = y();
					n.forceAtCapacity = !1;
					const C = JSON.stringify(A);
					C !== n.lastPayloadJson && ((n.lastPayloadJson = C), e.post_update(A));
				}));
		},
		b = () => {
			n.dead || ((n.forceAtCapacity = !0), S());
		},
		p = (A) => {
			const C = A.docs,
				M = C[C.length - 1].key;
			(A.stop(), (A.end = M), (A.truncated = !1), (n.bottomOpen = !0), s(A) || u(Qa));
		},
		E = () => {
			if (n.dead || n.loadingOlder || n.pending || !y().hasMore) return;
			const A = n.intervals[n.intervals.length - 1];
			if (!A || A.end === null) return;
			if (f() + 1 > Ys || e.page_at_ceiling()) {
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
				for (const [C, M] of n.intervals.entries()) {
					if (M.end === null || !M.truncated || M.docs === null) continue;
					const G = o(M);
					if (G === null) continue;
					if (f() + 1 > Ys) break;
					const $ = {
							start: M.start,
							end: G,
							docs: null,
							truncated: !1,
							previousFirstKey: void 0,
							previousDocs: null,
							stop: () => {},
						},
						q = {
							start: G,
							end: M.end,
							docs: null,
							truncated: !1,
							previousFirstKey: void 0,
							previousDocs: null,
							stop: () => {},
						};
					if (!s($)) break;
					if (!s(q)) {
						$.stop();
						break;
					}
					n.pending = { from: C, removeCount: 1, replacements: [$, q], suppressedDocs: [m(M)] };
					return;
				}
				for (let C = 0; C + 1 < n.intervals.length; C += 1) {
					const M = n.intervals[C],
						G = n.intervals[C + 1];
					if (M.docs === null || G.docs === null || M.docs.length + G.docs.length >= e.queryArgs.limit) continue;
					const $ = {
						start: M.start,
						end: G.end,
						docs: null,
						truncated: !1,
						previousFirstKey: void 0,
						previousDocs: null,
						stop: () => {},
					};
					if (!s($)) break;
					n.pending = { from: C, removeCount: 2, replacements: [$], suppressedDocs: [m(M), m(G)] };
					return;
				}
			}
		},
		D = () => {
			const A = n.pending;
			n.pending = null;
			const C = n.intervals.splice(A.from, A.removeCount, ...A.replacements);
			for (const M of C) M.stop();
			(S(), x());
		},
		z = (A, C) => {
			if (!n.dead) {
				if ("queryError" in C) {
					const M = e.session_expired() ? Ad : Qa;
					(M === Qa && console.error("[bonobo-plugin-sdk] Plugin data window interval failed:", C.queryError), u(M));
					return;
				}
				if (C.value === null) {
					u(xd);
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
					n.pending.replacements.every((M) => M.docs !== null) && D();
					return;
				}
				(S(), x());
			}
		},
		R = {
			start: null,
			end: null,
			docs: null,
			truncated: !1,
			previousFirstKey: void 0,
			previousDocs: null,
			stop: () => {},
		};
	return s(R)
		? (n.intervals.push(R),
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
					n.dead || a();
				},
			})
		: null;
}
function rE(e) {
	const n = new Set();
	let a = 0;
	const u = () => (a >= Vy ? !1 : ((a += 1), !0)),
		s = () => {
			a -= 1;
		},
		o = (p = 1) => a + p > Vy,
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
			if (n.size >= Hy || o()) return (h(p.onUpdate), () => {});
			if (!u()) return (h(p.onUpdate), () => {});
			const E = {};
			n.add(E);
			let x = null;
			const D = () => {
				n.delete(E) && (x?.dispose(), s());
			};
			return (
				(x = p.start((z) => {
					if (n.has(E)) {
						if ("queryError" in z) {
							const R = e.session_expired() ? Ad : Qa;
							(R === Qa && console.error(`[bonobo-plugin-sdk] Plugin ${p.failureLabel} failed:`, z.queryError),
								D(),
								p.onUpdate(null, R));
							return;
						}
						if (z.value === null) {
							(D(), p.onUpdate(null, xd));
							return;
						}
						p.onUpdate(p.deliver(z.value));
					}
				})),
				x
					? function () {
							D();
						}
					: (D(),
						console.error(`[bonobo-plugin-sdk] Plugin ${p.failureLabel} could not start`),
						f(p.onUpdate),
						() => {})
			);
		},
		g = {
			watch(p, E) {
				const x = rd({
					collection: p.collection,
					...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
					limit: p.limit,
				});
				return x
					? (f(E, { reason: "invalid", message: x }), () => {})
					: m({
							start: (D) =>
								e.start_watch(
									{
										collection: p.collection,
										...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
										limit: p.limit,
									},
									null,
									D,
								),
							onUpdate: E,
							deliver: (D) => ({ docs: D.docs, truncated: D.truncated }),
							failureLabel: "data watch",
						});
			},
			watchRecent(p, E) {
				const x = rd({ collection: p.collection, limit: p.limit });
				return x
					? (f(E, { reason: "invalid", message: x }), () => {})
					: m({
							start: (D) =>
								e.start_recent_watch(
									{
										collection: p.collection,
										limit: p.limit,
										...(p.order === void 0 ? {} : { order: p.order }),
										...(p.since === void 0 ? {} : { since: p.since }),
										...(p.before === void 0 ? {} : { before: p.before }),
										...(p.scopeId === void 0 ? {} : { scopeId: p.scopeId }),
									},
									D,
								),
							onUpdate: E,
							deliver: (D) => ({ docs: D.docs, truncated: D.truncated }),
							failureLabel: "recent watch",
						});
			},
			watchWindow(p, E) {
				const x = { loadOlder() {}, unsubscribe() {} },
					D = rd({
						collection: p.collection,
						...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
						limit: p.pageSize,
					});
				if (D) return (f(E, { reason: "invalid", message: D }), x);
				if (n.size >= Hy || o()) return (h(E), x);
				const z = {};
				n.add(z);
				const R = aE({
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
				return R
					? {
							loadOlder() {
								n.has(z) && R.load_older();
							},
							unsubscribe() {
								n.delete(z) && R.dispose();
							},
						}
					: (n.delete(z), console.error("[bonobo-plugin-sdk] Plugin data window could not start"), f(E), x);
			},
			append(p) {
				return y("append", {
					collection: p.collection,
					...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
					value: p.value,
					...(p.clientRequestId === void 0 ? {} : { clientRequestId: p.clientRequestId }),
				});
			},
			put(p) {
				return y("put", {
					collection: p.collection,
					key: p.key,
					value: p.value,
					...(p.expectedRevision === void 0 ? {} : { expectedRevision: p.expectedRevision }),
				});
			},
			remove(p) {
				return y("remove", {
					collection: p.collection,
					key: p.key,
					...(p.expectedRevision === void 0 ? {} : { expectedRevision: p.expectedRevision }),
				});
			},
			putOwned(p) {
				return y("putOwned", {
					collection: p.collection,
					key: p.key,
					value: p.value,
					...(p.expectedRevision === void 0 ? {} : { expectedRevision: p.expectedRevision }),
				});
			},
			removeOwned(p) {
				return y("removeOwned", {
					collection: p.collection,
					key: p.key,
					...(p.expectedRevision === void 0 ? {} : { expectedRevision: p.expectedRevision }),
				});
			},
		};
	function y(p, E) {
		return Promise.resolve()
			.then(() => e.run_user_write(p, E))
			.catch(
				(x) => (
					console.error("[bonobo-plugin-sdk] Plugin data write failed:", x),
					{ _nay: { message: "Failed to write plugin data" } }
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
			return !Number.isInteger(p.limit) || p.limit < 1 || p.limit > Zy
				? Promise.resolve({ _nay: { name: "invalid", message: `Member list limits must be integers from 1 to ${Zy}` } })
				: Promise.resolve()
						.then(() => e.list_members(p.limit, p.cursor ?? null))
						.then((E) =>
							E === null
								? { _nay: { name: xd.reason, message: "This plugin no longer has access to this workspace" } }
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
							const x = e.session_expired() ? Ad : Qa;
							return (
								x === Qa && console.error("[bonobo-plugin-sdk] Failed to list plugin workspace members:", E),
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
		data: g,
		members: S,
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
function uE(e) {
	return {
		start_watch: (a, u, s) => {
			try {
				const o = e.onUpdate(
					Ln.plugins_data.watch_documents,
					{
						...a,
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
		start_recent_watch: (a, u) => {
			try {
				const s = e.onUpdate(
					Ln.plugins_data.watch_recent,
					a,
					(o) => u({ value: o }),
					(o) => u({ queryError: o }),
				);
				return { dispose: () => void s() };
			} catch {
				return null;
			}
		},
		run_user_write: (a, u) => {
			switch (a) {
				case "append":
					return e.mutation(Ln.plugins_data.user_append_document, u);
				case "put":
					return e.mutation(Ln.plugins_data.user_put_document, u);
				case "remove":
					return e.mutation(Ln.plugins_data.user_remove_document, u);
				case "putOwned":
					return e.mutation(Ln.plugins_data.user_put_owned_document, u);
				case "removeOwned":
					return e.mutation(Ln.plugins_data.user_remove_owned_document, u);
			}
		},
		resolve_member_display: (a) => e.query(Ln.plugins_data.resolve_member_display, { userIds: a }),
		list_members: (a, u) => e.query(Ln.plugins_data.list_members, { limit: a, cursor: u }),
		run_manage_scope: (a) => e.mutation(Ln.plugins_data.user_manage_scope, { action: a }),
		list_scope_principals: (a) => e.query(Ln.plugins_data.watch_scope_principals, { scopeId: a }),
		start_my_scopes_watch: (a) => {
			try {
				const u = e.onUpdate(
					Ln.plugins_data.watch_my_scopes,
					{},
					(s) => a({ value: s }),
					(s) => a({ queryError: s }),
				);
				return { dispose: () => void u() };
			} catch {
				return null;
			}
		},
	};
}
async function lE() {
	const { parentOrigin: e, bridgeNonce: n } = iE();
	let a = "",
		u = "",
		s = 0,
		o = null;
	const f = new Set(),
		h = new Map();
	let m = null;
	async function g() {
		return Date.now() >= s - F1 ? y() : u;
	}
	function y() {
		if (m) return m;
		const E = crypto.randomUUID();
		return (
			(m = new Promise((x, D) => {
				const z = setTimeout(() => {
					(h.delete(E), D(new Error("Plugin frame token refresh timed out")));
				}, W1);
				h.set(E, { resolve: x, reject: D, timeout: z });
				try {
					window.parent.postMessage({ type: "bonobo:token-refresh-request", bridgeNonce: n, requestId: E }, e);
				} catch (R) {
					(clearTimeout(z), h.delete(E), D(R));
				}
			}).finally(() => {
				m = null;
			})),
			m
		);
	}
	async function S(E, x) {
		const D = x?.body !== void 0,
			z = (C) => {
				const M = new Headers(x?.headers);
				return (
					M.set("Authorization", `Bearer ${C}`),
					D && M.set("Content-Type", "application/json"),
					fetch(a + E, {
						method: x?.method ?? (D ? "POST" : "GET"),
						headers: M,
						body: D ? JSON.stringify(x.body) : void 0,
					})
				);
			},
			R = await g();
		let A = await z(R);
		if ((A.status === 401 && (A = await z(u !== R ? u : await y())), !A.ok)) {
			const C = await A.text();
			throw Object.assign(new Error(`${E} responded ${A.status}: ${C}`), { status: A.status, responseText: C });
		}
		return A.json();
	}
	const b = (E) =>
		fetch(a + "/plugins-ui/session-jwt", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token: E }),
		});
	async function p() {
		for (let E = 0; ; E += 1) {
			let x = null;
			try {
				((x = await b(await g())), x.status === 401 && (x = await b(await y())));
			} catch {
				x = null;
			}
			if (x?.ok) {
				const D = await x.json().catch(() => null),
					z = D?._yay?.jwt,
					R = D?._yay?.sessionExpiresAt;
				return typeof z != "string" || typeof R != "number" ? null : ((s = R), z);
			}
			if (!(x === null || x.status === 429 || x.status >= 500) || E >= 2) return null;
			await new Promise((D) => setTimeout(D, 1e3 * (E + 1)));
		}
	}
	return new Promise((E) => {
		let x = !1,
			D;
		const z = () => {
				window.parent.postMessage({ type: "bonobo:ready", bridgeNonce: n }, e);
			},
			R = () => {
				clearInterval(D);
			},
			A = (C) => {
				if (C.source !== window.parent || C.origin !== e) return;
				const M = C.data;
				if (!(typeof M != "object" || M === null)) {
					if (
						M.type === "bonobo:init" &&
						!x &&
						M.bridgeNonce === n &&
						typeof M.apiOrigin == "string" &&
						typeof M.convexUrl == "string" &&
						typeof M.token == "string" &&
						typeof M.tokenExpiresAt == "number" &&
						Number.isFinite(M.tokenExpiresAt) &&
						nE(M.context)
					) {
						((x = !0),
							R(),
							window.removeEventListener("pagehide", R),
							(a = M.apiOrigin),
							(u = M.token),
							(s = M.tokenExpiresAt));
						const G = new X1(M.convexUrl, { expectAuth: !0, unsavedChangesWarning: !1 });
						(G.setAuth(p), window.addEventListener("pagehide", () => void G.close(), { once: !0 }), (o = Qy(M.theme)));
						const { data: $, members: q, scopes: B } = rE({ ...uE(G), session_expired: () => Date.now() >= s });
						E({
							context: M.context,
							apiOrigin: a,
							getToken: g,
							refreshToken: y,
							fetchJson: S,
							data: $,
							members: q,
							scopes: B,
							theme: {
								current: () => o,
								subscribe(ne) {
									return (
										f.add(ne),
										() => {
											f.delete(ne);
										}
									);
								},
							},
						});
					} else if (
						x &&
						M.bridgeNonce === n &&
						M.type === "bonobo:token" &&
						typeof M.requestId == "string" &&
						typeof M.token == "string" &&
						typeof M.tokenExpiresAt == "number" &&
						Number.isFinite(M.tokenExpiresAt)
					) {
						const G = h.get(M.requestId);
						G &&
							(h.delete(M.requestId),
							clearTimeout(G.timeout),
							(u = M.token),
							(s = M.tokenExpiresAt),
							G.resolve(M.token));
					} else if (x && M.bridgeNonce === n && M.type === "bonobo:theme") {
						const G = Qy(M.theme);
						if (G) {
							o = G;
							for (const $ of f) $(G);
						}
					} else if (
						x &&
						M.bridgeNonce === n &&
						M.type === "bonobo:token-error" &&
						typeof M.requestId == "string" &&
						typeof M.message == "string"
					) {
						const G = h.get(M.requestId);
						G && (h.delete(M.requestId), clearTimeout(G.timeout), G.reject(new Error(M.message)));
					}
				}
			};
		(window.addEventListener("message", A),
			window.addEventListener("pagehide", R, { once: !0 }),
			z(),
			(D = setInterval(z, J1)));
	});
}
var sE = $n((e) => {
		function n(O, U) {
			var V = O.length;
			O.push(U);
			e: for (; 0 < V; ) {
				var re = (V - 1) >>> 1,
					de = O[re];
				if (0 < s(de, U)) ((O[re] = U), (O[V] = de), (V = re));
				else break e;
			}
		}
		function a(O) {
			return O.length === 0 ? null : O[0];
		}
		function u(O) {
			if (O.length === 0) return null;
			var U = O[0],
				V = O.pop();
			if (V !== U) {
				O[0] = V;
				e: for (var re = 0, de = O.length, Ce = de >>> 1; re < Ce; ) {
					var N = 2 * (re + 1) - 1,
						Y = O[N],
						ie = N + 1,
						se = O[ie];
					if (0 > s(Y, V))
						ie < de && 0 > s(se, Y) ? ((O[re] = se), (O[ie] = V), (re = ie)) : ((O[re] = Y), (O[N] = V), (re = N));
					else if (ie < de && 0 > s(se, V)) ((O[re] = se), (O[ie] = V), (re = ie));
					else break e;
				}
			}
			return U;
		}
		function s(O, U) {
			var V = O.sortIndex - U.sortIndex;
			return V !== 0 ? V : O.id - U.id;
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
			g = [],
			y = 1,
			S = null,
			b = 3,
			p = !1,
			E = !1,
			x = !1,
			D = !1,
			z = typeof setTimeout == "function" ? setTimeout : null,
			R = typeof clearTimeout == "function" ? clearTimeout : null,
			A = typeof setImmediate < "u" ? setImmediate : null;
		function C(O) {
			for (var U = a(g); U !== null; ) {
				if (U.callback === null) u(g);
				else if (U.startTime <= O) (u(g), (U.sortIndex = U.expirationTime), n(m, U));
				else break;
				U = a(g);
			}
		}
		function M(O) {
			if (((x = !1), C(O), !E))
				if (a(m) !== null) ((E = !0), G || ((G = !0), le()));
				else {
					var U = a(g);
					U !== null && ue(M, U.startTime - O);
				}
		}
		var G = !1,
			$ = -1,
			q = 5,
			B = -1;
		function ne() {
			return D ? !0 : !(e.unstable_now() - B < q);
		}
		function P() {
			if (((D = !1), G)) {
				var O = e.unstable_now();
				B = O;
				var U = !0;
				try {
					e: {
						((E = !1), x && ((x = !1), R($), ($ = -1)), (p = !0));
						var V = b;
						try {
							t: {
								for (C(O), S = a(m); S !== null && !(S.expirationTime > O && ne()); ) {
									var re = S.callback;
									if (typeof re == "function") {
										((S.callback = null), (b = S.priorityLevel));
										var de = re(S.expirationTime <= O);
										if (((O = e.unstable_now()), typeof de == "function")) {
											((S.callback = de), C(O), (U = !0));
											break t;
										}
										(S === a(m) && u(m), C(O));
									} else u(m);
									S = a(m);
								}
								if (S !== null) U = !0;
								else {
									var Ce = a(g);
									(Ce !== null && ue(M, Ce.startTime - O), (U = !1));
								}
							}
							break e;
						} finally {
							((S = null), (b = V), (p = !1));
						}
						U = void 0;
					}
				} finally {
					U ? le() : (G = !1);
				}
			}
		}
		var le;
		if (typeof A == "function")
			le = function () {
				A(P);
			};
		else if (typeof MessageChannel < "u") {
			var te = new MessageChannel(),
				X = te.port2;
			((te.port1.onmessage = P),
				(le = function () {
					X.postMessage(null);
				}));
		} else
			le = function () {
				z(P, 0);
			};
		function ue(O, U) {
			$ = z(function () {
				O(e.unstable_now());
			}, U);
		}
		((e.unstable_IdlePriority = 5),
			(e.unstable_ImmediatePriority = 1),
			(e.unstable_LowPriority = 4),
			(e.unstable_NormalPriority = 3),
			(e.unstable_Profiling = null),
			(e.unstable_UserBlockingPriority = 2),
			(e.unstable_cancelCallback = function (O) {
				O.callback = null;
			}),
			(e.unstable_forceFrameRate = function (O) {
				0 > O || 125 < O
					? console.error(
							"forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
						)
					: (q = 0 < O ? Math.floor(1e3 / O) : 5);
			}),
			(e.unstable_getCurrentPriorityLevel = function () {
				return b;
			}),
			(e.unstable_next = function (O) {
				switch (b) {
					case 1:
					case 2:
					case 3:
						var U = 3;
						break;
					default:
						U = b;
				}
				var V = b;
				b = U;
				try {
					return O();
				} finally {
					b = V;
				}
			}),
			(e.unstable_requestPaint = function () {
				D = !0;
			}),
			(e.unstable_runWithPriority = function (O, U) {
				switch (O) {
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						break;
					default:
						O = 3;
				}
				var V = b;
				b = O;
				try {
					return U();
				} finally {
					b = V;
				}
			}),
			(e.unstable_scheduleCallback = function (O, U, V) {
				var re = e.unstable_now();
				switch (
					(typeof V == "object" && V !== null
						? ((V = V.delay), (V = typeof V == "number" && 0 < V ? re + V : re))
						: (V = re),
					O)
				) {
					case 1:
						var de = -1;
						break;
					case 2:
						de = 250;
						break;
					case 5:
						de = 1073741823;
						break;
					case 4:
						de = 1e4;
						break;
					default:
						de = 5e3;
				}
				return (
					(de = V + de),
					(O = { id: y++, callback: U, priorityLevel: O, startTime: V, expirationTime: de, sortIndex: -1 }),
					V > re
						? ((O.sortIndex = V),
							n(g, O),
							a(m) === null && O === a(g) && (x ? (R($), ($ = -1)) : (x = !0), ue(M, V - re)))
						: ((O.sortIndex = de), n(m, O), E || p || ((E = !0), G || ((G = !0), le()))),
					O
				);
			}),
			(e.unstable_shouldYield = ne),
			(e.unstable_wrapCallback = function (O) {
				var U = b;
				return function () {
					var V = b;
					b = U;
					try {
						return O.apply(this, arguments);
					} finally {
						b = V;
					}
				};
			}));
	}),
	oE = $n((e, n) => {
		n.exports = sE();
	}),
	cE = $n((e) => {
		var n = Symbol.for("react.transitional.element"),
			a = Symbol.for("react.portal"),
			u = Symbol.for("react.fragment"),
			s = Symbol.for("react.strict_mode"),
			o = Symbol.for("react.profiler"),
			f = Symbol.for("react.consumer"),
			h = Symbol.for("react.context"),
			m = Symbol.for("react.forward_ref"),
			g = Symbol.for("react.suspense"),
			y = Symbol.for("react.memo"),
			S = Symbol.for("react.lazy"),
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
			D = Object.assign,
			z = {};
		function R(N, Y, ie) {
			((this.props = N), (this.context = Y), (this.refs = z), (this.updater = ie || x));
		}
		((R.prototype.isReactComponent = {}),
			(R.prototype.setState = function (N, Y) {
				if (typeof N != "object" && typeof N != "function" && N != null)
					throw Error(
						"takes an object of state variables to update or a function which returns an object of state variables.",
					);
				this.updater.enqueueSetState(this, N, Y, "setState");
			}),
			(R.prototype.forceUpdate = function (N) {
				this.updater.enqueueForceUpdate(this, N, "forceUpdate");
			}));
		function A() {}
		A.prototype = R.prototype;
		function C(N, Y, ie) {
			((this.props = N), (this.context = Y), (this.refs = z), (this.updater = ie || x));
		}
		var M = (C.prototype = new A());
		((M.constructor = C), D(M, R.prototype), (M.isPureReactComponent = !0));
		var G = Array.isArray;
		function $() {}
		var q = { H: null, A: null, T: null, S: null },
			B = Object.prototype.hasOwnProperty;
		function ne(N, Y, ie) {
			var se = ie.ref;
			return { $$typeof: n, type: N, key: Y, ref: se !== void 0 ? se : null, props: ie };
		}
		function P(N, Y) {
			return ne(N.type, Y, N.props);
		}
		function le(N) {
			return typeof N == "object" && N !== null && N.$$typeof === n;
		}
		function te(N) {
			var Y = { "=": "=0", ":": "=2" };
			return (
				"$" +
				N.replace(/[=:]/g, function (ie) {
					return Y[ie];
				})
			);
		}
		var X = /\/+/g;
		function ue(N, Y) {
			return typeof N == "object" && N !== null && N.key != null ? te("" + N.key) : Y.toString(36);
		}
		function O(N) {
			switch (N.status) {
				case "fulfilled":
					return N.value;
				case "rejected":
					throw N.reason;
				default:
					switch (
						(typeof N.status == "string"
							? N.then($, $)
							: ((N.status = "pending"),
								N.then(
									function (Y) {
										N.status === "pending" && ((N.status = "fulfilled"), (N.value = Y));
									},
									function (Y) {
										N.status === "pending" && ((N.status = "rejected"), (N.reason = Y));
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
		function U(N, Y, ie, se, ge) {
			var ye = typeof N;
			(ye === "undefined" || ye === "boolean") && (N = null);
			var we = !1;
			if (N === null) we = !0;
			else
				switch (ye) {
					case "bigint":
					case "string":
					case "number":
						we = !0;
						break;
					case "object":
						switch (N.$$typeof) {
							case n:
							case a:
								we = !0;
								break;
							case S:
								return ((we = N._init), U(we(N._payload), Y, ie, se, ge));
						}
				}
			if (we)
				return (
					(ge = ge(N)),
					(we = se === "" ? "." + ue(N, 0) : se),
					G(ge)
						? ((ie = ""),
							we != null && (ie = we.replace(X, "$&/") + "/"),
							U(ge, Y, ie, "", function (lt) {
								return lt;
							}))
						: ge != null &&
							(le(ge) &&
								(ge = P(
									ge,
									ie + (ge.key == null || (N && N.key === ge.key) ? "" : ("" + ge.key).replace(X, "$&/") + "/") + we,
								)),
							Y.push(ge)),
					1
				);
			we = 0;
			var Ze = se === "" ? "." : se + ":";
			if (G(N))
				for (var Oe = 0; Oe < N.length; Oe++) ((se = N[Oe]), (ye = Ze + ue(se, Oe)), (we += U(se, Y, ie, ye, ge)));
			else if (((Oe = E(N)), typeof Oe == "function"))
				for (N = Oe.call(N), Oe = 0; !(se = N.next()).done; )
					((se = se.value), (ye = Ze + ue(se, Oe++)), (we += U(se, Y, ie, ye, ge)));
			else if (ye === "object") {
				if (typeof N.then == "function") return U(O(N), Y, ie, se, ge);
				throw (
					(Y = String(N)),
					Error(
						"Objects are not valid as a React child (found: " +
							(Y === "[object Object]" ? "object with keys {" + Object.keys(N).join(", ") + "}" : Y) +
							"). If you meant to render a collection of children, use an array instead.",
					)
				);
			}
			return we;
		}
		function V(N, Y, ie) {
			if (N == null) return N;
			var se = [],
				ge = 0;
			return (
				U(N, se, "", "", function (ye) {
					return Y.call(ie, ye, ge++);
				}),
				se
			);
		}
		function re(N) {
			if (N._status === -1) {
				var Y = N._result;
				((Y = Y()),
					Y.then(
						function (ie) {
							(N._status === 0 || N._status === -1) && ((N._status = 1), (N._result = ie));
						},
						function (ie) {
							(N._status === 0 || N._status === -1) && ((N._status = 2), (N._result = ie));
						},
					),
					N._status === -1 && ((N._status = 0), (N._result = Y)));
			}
			if (N._status === 1) return N._result.default;
			throw N._result;
		}
		var de =
				typeof reportError == "function"
					? reportError
					: function (N) {
							if (typeof window == "object" && typeof window.ErrorEvent == "function") {
								var Y = new window.ErrorEvent("error", {
									bubbles: !0,
									cancelable: !0,
									message:
										typeof N == "object" && N !== null && typeof N.message == "string" ? String(N.message) : String(N),
									error: N,
								});
								if (!window.dispatchEvent(Y)) return;
							} else if (typeof process == "object" && typeof process.emit == "function") {
								process.emit("uncaughtException", N);
								return;
							}
							console.error(N);
						},
			Ce = {
				map: V,
				forEach: function (N, Y, ie) {
					V(
						N,
						function () {
							Y.apply(this, arguments);
						},
						ie,
					);
				},
				count: function (N) {
					var Y = 0;
					return (
						V(N, function () {
							Y++;
						}),
						Y
					);
				},
				toArray: function (N) {
					return (
						V(N, function (Y) {
							return Y;
						}) || []
					);
				},
				only: function (N) {
					if (!le(N)) throw Error("React.Children.only expected to receive a single React element child.");
					return N;
				},
			};
		((e.Activity = b),
			(e.Children = Ce),
			(e.Component = R),
			(e.Fragment = u),
			(e.Profiler = o),
			(e.PureComponent = C),
			(e.StrictMode = s),
			(e.Suspense = g),
			(e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = q),
			(e.__COMPILER_RUNTIME = {
				__proto__: null,
				c: function (N) {
					return q.H.useMemoCache(N);
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
			(e.cloneElement = function (N, Y, ie) {
				if (N == null) throw Error("The argument must be a React element, but you passed " + N + ".");
				var se = D({}, N.props),
					ge = N.key;
				if (Y != null)
					for (ye in (Y.key !== void 0 && (ge = "" + Y.key), Y))
						!B.call(Y, ye) ||
							ye === "key" ||
							ye === "__self" ||
							ye === "__source" ||
							(ye === "ref" && Y.ref === void 0) ||
							(se[ye] = Y[ye]);
				var ye = arguments.length - 2;
				if (ye === 1) se.children = ie;
				else if (1 < ye) {
					for (var we = Array(ye), Ze = 0; Ze < ye; Ze++) we[Ze] = arguments[Ze + 2];
					se.children = we;
				}
				return ne(N.type, ge, se);
			}),
			(e.createContext = function (N) {
				return (
					(N = { $$typeof: h, _currentValue: N, _currentValue2: N, _threadCount: 0, Provider: null, Consumer: null }),
					(N.Provider = N),
					(N.Consumer = { $$typeof: f, _context: N }),
					N
				);
			}),
			(e.createElement = function (N, Y, ie) {
				var se,
					ge = {},
					ye = null;
				if (Y != null)
					for (se in (Y.key !== void 0 && (ye = "" + Y.key), Y))
						B.call(Y, se) && se !== "key" && se !== "__self" && se !== "__source" && (ge[se] = Y[se]);
				var we = arguments.length - 2;
				if (we === 1) ge.children = ie;
				else if (1 < we) {
					for (var Ze = Array(we), Oe = 0; Oe < we; Oe++) Ze[Oe] = arguments[Oe + 2];
					ge.children = Ze;
				}
				if (N && N.defaultProps) for (se in ((we = N.defaultProps), we)) ge[se] === void 0 && (ge[se] = we[se]);
				return ne(N, ye, ge);
			}),
			(e.createRef = function () {
				return { current: null };
			}),
			(e.forwardRef = function (N) {
				return { $$typeof: m, render: N };
			}),
			(e.isValidElement = le),
			(e.lazy = function (N) {
				return { $$typeof: S, _payload: { _status: -1, _result: N }, _init: re };
			}),
			(e.memo = function (N, Y) {
				return { $$typeof: y, type: N, compare: Y === void 0 ? null : Y };
			}),
			(e.startTransition = function (N) {
				var Y = q.T,
					ie = {};
				q.T = ie;
				try {
					var se = N(),
						ge = q.S;
					(ge !== null && ge(ie, se),
						typeof se == "object" && se !== null && typeof se.then == "function" && se.then($, de));
				} catch (ye) {
					de(ye);
				} finally {
					(Y !== null && ie.types !== null && (Y.types = ie.types), (q.T = Y));
				}
			}),
			(e.unstable_useCacheRefresh = function () {
				return q.H.useCacheRefresh();
			}),
			(e.use = function (N) {
				return q.H.use(N);
			}),
			(e.useActionState = function (N, Y, ie) {
				return q.H.useActionState(N, Y, ie);
			}),
			(e.useCallback = function (N, Y) {
				return q.H.useCallback(N, Y);
			}),
			(e.useContext = function (N) {
				return q.H.useContext(N);
			}),
			(e.useDebugValue = function () {}),
			(e.useDeferredValue = function (N, Y) {
				return q.H.useDeferredValue(N, Y);
			}),
			(e.useEffect = function (N, Y) {
				return q.H.useEffect(N, Y);
			}),
			(e.useEffectEvent = function (N) {
				return q.H.useEffectEvent(N);
			}),
			(e.useId = function () {
				return q.H.useId();
			}),
			(e.useImperativeHandle = function (N, Y, ie) {
				return q.H.useImperativeHandle(N, Y, ie);
			}),
			(e.useInsertionEffect = function (N, Y) {
				return q.H.useInsertionEffect(N, Y);
			}),
			(e.useLayoutEffect = function (N, Y) {
				return q.H.useLayoutEffect(N, Y);
			}),
			(e.useMemo = function (N, Y) {
				return q.H.useMemo(N, Y);
			}),
			(e.useOptimistic = function (N, Y) {
				return q.H.useOptimistic(N, Y);
			}),
			(e.useReducer = function (N, Y, ie) {
				return q.H.useReducer(N, Y, ie);
			}),
			(e.useRef = function (N) {
				return q.H.useRef(N);
			}),
			(e.useState = function (N) {
				return q.H.useState(N);
			}),
			(e.useSyncExternalStore = function (N, Y, ie) {
				return q.H.useSyncExternalStore(N, Y, ie);
			}),
			(e.useTransition = function () {
				return q.H.useTransition();
			}),
			(e.version = "19.2.8"));
	}),
	Eo = $n((e, n) => {
		n.exports = cE();
	}),
	fE = $n((e) => {
		var n = Eo();
		function a(g) {
			var y = "https://react.dev/errors/" + g;
			if (1 < arguments.length) {
				y += "?args[]=" + encodeURIComponent(arguments[1]);
				for (var S = 2; S < arguments.length; S++) y += "&args[]=" + encodeURIComponent(arguments[S]);
			}
			return (
				"Minified React error #" +
				g +
				"; visit " +
				y +
				" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
			);
		}
		function u() {}
		var s = {
				d: {
					f: u,
					r: function () {
						throw Error(a(522));
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
		function f(g, y, S) {
			var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
			return { $$typeof: o, key: b == null ? null : "" + b, children: g, containerInfo: y, implementation: S };
		}
		var h = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		function m(g, y) {
			if (g === "font") return "";
			if (typeof y == "string") return y === "use-credentials" ? y : "";
		}
		((e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
			(e.createPortal = function (g, y) {
				var S = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
				if (!y || (y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)) throw Error(a(299));
				return f(g, y, null, S);
			}),
			(e.flushSync = function (g) {
				var y = h.T,
					S = s.p;
				try {
					if (((h.T = null), (s.p = 2), g)) return g();
				} finally {
					((h.T = y), (s.p = S), s.d.f());
				}
			}),
			(e.preconnect = function (g, y) {
				typeof g == "string" &&
					(y
						? ((y = y.crossOrigin), (y = typeof y == "string" ? (y === "use-credentials" ? y : "") : void 0))
						: (y = null),
					s.d.C(g, y));
			}),
			(e.prefetchDNS = function (g) {
				typeof g == "string" && s.d.D(g);
			}),
			(e.preinit = function (g, y) {
				if (typeof g == "string" && y && typeof y.as == "string") {
					var S = y.as,
						b = m(S, y.crossOrigin),
						p = typeof y.integrity == "string" ? y.integrity : void 0,
						E = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
					S === "style"
						? s.d.S(g, typeof y.precedence == "string" ? y.precedence : void 0, {
								crossOrigin: b,
								integrity: p,
								fetchPriority: E,
							})
						: S === "script" &&
							s.d.X(g, {
								crossOrigin: b,
								integrity: p,
								fetchPriority: E,
								nonce: typeof y.nonce == "string" ? y.nonce : void 0,
							});
				}
			}),
			(e.preinitModule = function (g, y) {
				if (typeof g == "string")
					if (typeof y == "object" && y !== null) {
						if (y.as == null || y.as === "script") {
							var S = m(y.as, y.crossOrigin);
							s.d.M(g, {
								crossOrigin: S,
								integrity: typeof y.integrity == "string" ? y.integrity : void 0,
								nonce: typeof y.nonce == "string" ? y.nonce : void 0,
							});
						}
					} else y ?? s.d.M(g);
			}),
			(e.preload = function (g, y) {
				if (typeof g == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
					var S = y.as,
						b = m(S, y.crossOrigin);
					s.d.L(g, S, {
						crossOrigin: b,
						integrity: typeof y.integrity == "string" ? y.integrity : void 0,
						nonce: typeof y.nonce == "string" ? y.nonce : void 0,
						type: typeof y.type == "string" ? y.type : void 0,
						fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
						referrerPolicy: typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0,
						imageSrcSet: typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0,
						imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0,
						media: typeof y.media == "string" ? y.media : void 0,
					});
				}
			}),
			(e.preloadModule = function (g, y) {
				if (typeof g == "string")
					if (y) {
						var S = m(y.as, y.crossOrigin);
						s.d.m(g, {
							as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
							crossOrigin: S,
							integrity: typeof y.integrity == "string" ? y.integrity : void 0,
						});
					} else s.d.m(g);
			}),
			(e.requestFormReset = function (g) {
				s.d.r(g);
			}),
			(e.unstable_batchedUpdates = function (g, y) {
				return g(y);
			}),
			(e.useFormState = function (g, y, S) {
				return h.H.useFormState(g, y, S);
			}),
			(e.useFormStatus = function () {
				return h.H.useHostTransitionStatus();
			}),
			(e.version = "19.2.8"));
	}),
	_0 = $n((e, n) => {
		function a() {
			if (
				!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")
			)
				try {
					__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
				} catch (u) {
					console.error(u);
				}
		}
		(a(), (n.exports = fE()));
	}),
	dE = $n((e) => {
		var n = oE(),
			a = Eo(),
			u = _0();
		function s(t) {
			var i = "https://react.dev/errors/" + t;
			if (1 < arguments.length) {
				i += "?args[]=" + encodeURIComponent(arguments[1]);
				for (var r = 2; r < arguments.length; r++) i += "&args[]=" + encodeURIComponent(arguments[r]);
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
				r = t;
			if (t.alternate) for (; i.return; ) i = i.return;
			else {
				t = i;
				do ((i = t), (i.flags & 4098) !== 0 && (r = i.return), (t = i.return));
				while (t);
			}
			return i.tag === 3 ? r : null;
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
		function g(t) {
			if (f(t) !== t) throw Error(s(188));
		}
		function y(t) {
			var i = t.alternate;
			if (!i) {
				if (((i = f(t)), i === null)) throw Error(s(188));
				return i !== t ? null : t;
			}
			for (var r = t, l = i; ; ) {
				var c = r.return;
				if (c === null) break;
				var d = c.alternate;
				if (d === null) {
					if (((l = c.return), l !== null)) {
						r = l;
						continue;
					}
					break;
				}
				if (c.child === d.child) {
					for (d = c.child; d; ) {
						if (d === r) return (g(c), t);
						if (d === l) return (g(c), i);
						d = d.sibling;
					}
					throw Error(s(188));
				}
				if (r.return !== l.return) ((r = c), (l = d));
				else {
					for (var v = !1, w = c.child; w; ) {
						if (w === r) {
							((v = !0), (r = c), (l = d));
							break;
						}
						if (w === l) {
							((v = !0), (l = c), (r = d));
							break;
						}
						w = w.sibling;
					}
					if (!v) {
						for (w = d.child; w; ) {
							if (w === r) {
								((v = !0), (r = d), (l = c));
								break;
							}
							if (w === l) {
								((v = !0), (l = d), (r = c));
								break;
							}
							w = w.sibling;
						}
						if (!v) throw Error(s(189));
					}
				}
				if (r.alternate !== l) throw Error(s(190));
			}
			if (r.tag !== 3) throw Error(s(188));
			return r.stateNode.current === r ? t : i;
		}
		function S(t) {
			var i = t.tag;
			if (i === 5 || i === 26 || i === 27 || i === 6) return t;
			for (t = t.child; t !== null; ) {
				if (((i = S(t)), i !== null)) return i;
				t = t.sibling;
			}
			return null;
		}
		var b = Object.assign,
			p = Symbol.for("react.element"),
			E = Symbol.for("react.transitional.element"),
			x = Symbol.for("react.portal"),
			D = Symbol.for("react.fragment"),
			z = Symbol.for("react.strict_mode"),
			R = Symbol.for("react.profiler"),
			A = Symbol.for("react.consumer"),
			C = Symbol.for("react.context"),
			M = Symbol.for("react.forward_ref"),
			G = Symbol.for("react.suspense"),
			$ = Symbol.for("react.suspense_list"),
			q = Symbol.for("react.memo"),
			B = Symbol.for("react.lazy"),
			ne = Symbol.for("react.activity"),
			P = Symbol.for("react.memo_cache_sentinel"),
			le = Symbol.iterator;
		function te(t) {
			return t === null || typeof t != "object"
				? null
				: ((t = (le && t[le]) || t["@@iterator"]), typeof t == "function" ? t : null);
		}
		var X = Symbol.for("react.client.reference");
		function ue(t) {
			if (t == null) return null;
			if (typeof t == "function") return t.$$typeof === X ? null : t.displayName || t.name || null;
			if (typeof t == "string") return t;
			switch (t) {
				case D:
					return "Fragment";
				case R:
					return "Profiler";
				case z:
					return "StrictMode";
				case G:
					return "Suspense";
				case $:
					return "SuspenseList";
				case ne:
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
					case M:
						var i = t.render;
						return (
							(t = t.displayName),
							t || ((t = i.displayName || i.name || ""), (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
							t
						);
					case q:
						return ((i = t.displayName || null), i !== null ? i : ue(t.type) || "Memo");
					case B:
						((i = t._payload), (t = t._init));
						try {
							return ue(t(i));
						} catch {}
				}
			return null;
		}
		var O = Array.isArray,
			U = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			V = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			re = { pending: !1, data: null, method: null, action: null },
			de = [],
			Ce = -1;
		function N(t) {
			return { current: t };
		}
		function Y(t) {
			0 > Ce || ((t.current = de[Ce]), (de[Ce] = null), Ce--);
		}
		function ie(t, i) {
			(Ce++, (de[Ce] = t.current), (t.current = i));
		}
		var se = N(null),
			ge = N(null),
			ye = N(null),
			we = N(null);
		function Ze(t, i) {
			switch ((ie(ye, i), ie(ge, t), ie(se, null), i.nodeType)) {
				case 9:
				case 11:
					t = (t = i.documentElement) && (t = t.namespaceURI) ? Kg(t) : 0;
					break;
				default:
					if (((t = i.tagName), (i = i.namespaceURI))) ((i = Kg(i)), (t = Xg(i, t)));
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
			(Y(se), ie(se, t));
		}
		function Oe() {
			(Y(se), Y(ge), Y(ye));
		}
		function lt(t) {
			t.memoizedState !== null && ie(we, t);
			var i = se.current,
				r = Xg(i, t.type);
			i !== r && (ie(ge, t), ie(se, r));
		}
		function jt(t) {
			(ge.current === t && (Y(se), Y(ge)), we.current === t && (Y(we), (tl._currentValue = re)));
		}
		var $t, Yt;
		function it(t) {
			if ($t === void 0)
				try {
					throw Error();
				} catch (r) {
					var i = r.stack.trim().match(/\n( *(at )?)/);
					(($t = (i && i[1]) || ""),
						(Yt =
							-1 <
							r.stack.indexOf(`
    at`)
								? " (<anonymous>)"
								: -1 < r.stack.indexOf("@")
									? "@unknown:0:0"
									: ""));
				}
			return (
				`
` +
				$t +
				t +
				Yt
			);
		}
		var ce = !1;
		function Ee(t, i) {
			if (!t || ce) return "";
			ce = !0;
			var r = Error.prepareStackTrace;
			Error.prepareStackTrace = void 0;
			try {
				var l = {
					DetermineComponentFrameRoot: function () {
						try {
							if (i) {
								var ee = function () {
									throw Error();
								};
								if (
									(Object.defineProperty(ee.prototype, "props", {
										set: function () {
											throw Error();
										},
									}),
									typeof Reflect == "object" && Reflect.construct)
								) {
									try {
										Reflect.construct(ee, []);
									} catch (Q) {
										var H = Q;
									}
									Reflect.construct(t, [], ee);
								} else {
									try {
										ee.call();
									} catch (Q) {
										H = Q;
									}
									t.call(ee.prototype);
								}
							} else {
								try {
									throw Error();
								} catch (Q) {
									H = Q;
								}
								(ee = t()) && typeof ee.catch == "function" && ee.catch(function () {});
							}
						} catch (Q) {
							if (Q && H && typeof Q.stack == "string") return [Q.stack, H.stack];
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
					v = d[0],
					w = d[1];
				if (v && w) {
					var k = v.split(`
`),
						Z = w.split(`
`);
					for (c = l = 0; l < k.length && !k[l].includes("DetermineComponentFrameRoot"); ) l++;
					for (; c < Z.length && !Z[c].includes("DetermineComponentFrameRoot"); ) c++;
					if (l === k.length || c === Z.length)
						for (l = k.length - 1, c = Z.length - 1; 1 <= l && 0 <= c && k[l] !== Z[c]; ) c--;
					for (; 1 <= l && 0 <= c; l--, c--)
						if (k[l] !== Z[c]) {
							if (l !== 1 || c !== 1)
								do
									if ((l--, c--, 0 > c || k[l] !== Z[c])) {
										var K =
											`
` + k[l].replace(" at new ", " at ");
										return (
											t.displayName && K.includes("<anonymous>") && (K = K.replace("<anonymous>", t.displayName)),
											K
										);
									}
								while (1 <= l && 0 <= c);
							break;
						}
				}
			} finally {
				((ce = !1), (Error.prepareStackTrace = r));
			}
			return (r = t ? t.displayName || t.name : "") ? it(r) : "";
		}
		function Le(t, i) {
			switch (t.tag) {
				case 26:
				case 27:
				case 5:
					return it(t.type);
				case 16:
					return it("Lazy");
				case 13:
					return t.child !== i && i !== null ? it("Suspense Fallback") : it("Suspense");
				case 19:
					return it("SuspenseList");
				case 0:
				case 15:
					return Ee(t.type, !1);
				case 11:
					return Ee(t.type.render, !1);
				case 1:
					return Ee(t.type, !0);
				case 31:
					return it("Activity");
				default:
					return "";
			}
		}
		function je(t) {
			try {
				var i = "",
					r = null;
				do ((i += Le(t, r)), (r = t), (t = t.return));
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
		var kt = Object.prototype.hasOwnProperty,
			st = n.unstable_scheduleCallback,
			Xt = n.unstable_cancelCallback,
			Yn = n.unstable_shouldYield,
			Bi = n.unstable_requestPaint,
			vt = n.unstable_now,
			wa = n.unstable_getCurrentPriorityLevel,
			Ea = n.unstable_ImmediatePriority,
			tr = n.unstable_UserBlockingPriority,
			wn = n.unstable_NormalPriority,
			du = n.unstable_LowPriority,
			ri = n.unstable_IdlePriority,
			nr = n.log,
			ae = n.unstable_setDisableYieldValue,
			me = null,
			be = null;
		function pt(t) {
			if ((typeof nr == "function" && ae(t), be && typeof be.setStrictMode == "function"))
				try {
					be.setStrictMode(me, t);
				} catch {}
		}
		var qe = Math.clz32 ? Math.clz32 : Ii,
			Lt = Math.log,
			Gt = Math.LN2;
		function Ii(t) {
			return ((t >>>= 0), t === 0 ? 32 : (31 - ((Lt(t) / Gt) | 0)) | 0);
		}
		var et = 256,
			En = 262144,
			Tn = 4194304;
		function dn(t) {
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
		function Ta(t, i, r) {
			var l = t.pendingLanes;
			if (l === 0) return 0;
			var c = 0,
				d = t.suspendedLanes,
				v = t.pingedLanes;
			t = t.warmLanes;
			var w = l & 134217727;
			return (
				w !== 0
					? ((l = w & ~d),
						l !== 0 ? (c = dn(l)) : ((v &= w), v !== 0 ? (c = dn(v)) : r || ((r = w & ~t), r !== 0 && (c = dn(r)))))
					: ((w = l & ~d), w !== 0 ? (c = dn(w)) : v !== 0 ? (c = dn(v)) : r || ((r = l & ~t), r !== 0 && (c = dn(r)))),
				c === 0
					? 0
					: i !== 0 &&
						  i !== c &&
						  (i & d) === 0 &&
						  ((d = c & -c), (r = i & -i), d >= r || (d === 32 && (r & 4194048) !== 0))
						? i
						: c
			);
		}
		function F(t, i) {
			return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & i) === 0;
		}
		function oe(t, i) {
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
		function Te() {
			var t = Tn;
			return ((Tn <<= 1), (Tn & 62914560) === 0 && (Tn = 4194304), t);
		}
		function _e(t) {
			for (var i = [], r = 0; 31 > r; r++) i.push(t);
			return i;
		}
		function ot(t, i) {
			((t.pendingLanes |= i), i !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
		}
		function ct(t, i, r, l, c, d) {
			var v = t.pendingLanes;
			((t.pendingLanes = r),
				(t.suspendedLanes = 0),
				(t.pingedLanes = 0),
				(t.warmLanes = 0),
				(t.expiredLanes &= r),
				(t.entangledLanes &= r),
				(t.errorRecoveryDisabledLanes &= r),
				(t.shellSuspendCounter = 0));
			var w = t.entanglements,
				k = t.expirationTimes,
				Z = t.hiddenUpdates;
			for (r = v & ~r; 0 < r; ) {
				var K = 31 - qe(r),
					ee = 1 << K;
				((w[K] = 0), (k[K] = -1));
				var H = Z[K];
				if (H !== null)
					for (Z[K] = null, K = 0; K < H.length; K++) {
						var Q = H[K];
						Q !== null && (Q.lane &= -536870913);
					}
				r &= ~ee;
			}
			(l !== 0 && en(t, l, 0), d !== 0 && c === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(v & ~i)));
		}
		function en(t, i, r) {
			((t.pendingLanes |= i), (t.suspendedLanes &= ~i));
			var l = 31 - qe(i);
			((t.entangledLanes |= i), (t.entanglements[l] = t.entanglements[l] | 1073741824 | (r & 261930)));
		}
		function St(t, i) {
			var r = (t.entangledLanes |= i);
			for (t = t.entanglements; r; ) {
				var l = 31 - qe(r),
					c = 1 << l;
				((c & i) | (t[l] & i) && (t[l] |= i), (r &= ~c));
			}
		}
		function Zi(t, i) {
			var r = i & -i;
			return ((r = (r & 42) !== 0 ? 1 : Gn(r)), (r & (t.suspendedLanes | i)) !== 0 ? 0 : r);
		}
		function Gn(t) {
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
		function wt(t) {
			return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
		}
		function hu() {
			var t = V.p;
			return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : yy(t.type));
		}
		function mu(t, i) {
			var r = V.p;
			try {
				return ((V.p = t), i());
			} finally {
				V.p = r;
			}
		}
		var Hi = Math.random().toString(36).slice(2),
			Bt = "__reactFiber$" + Hi,
			tn = "__reactProps$" + Hi,
			vu = "__reactContainer$" + Hi,
			Zo = "__reactEvents$" + Hi,
			b_ = "__reactListeners$" + Hi,
			__ = "__reactHandles$" + Hi,
			Uh = "__reactResources$" + Hi,
			gu = "__reactMarker$" + Hi;
		function Ho(t) {
			(delete t[Bt], delete t[tn], delete t[Zo], delete t[b_], delete t[__]);
		}
		function ir(t) {
			var i = t[Bt];
			if (i) return i;
			for (var r = t.parentNode; r; ) {
				if ((i = r[vu] || r[Bt])) {
					if (((r = i.alternate), i.child !== null || (r !== null && r.child !== null)))
						for (t = iy(t); t !== null; ) {
							if ((r = t[Bt])) return r;
							t = iy(t);
						}
					return i;
				}
				((t = r), (r = t.parentNode));
			}
			return null;
		}
		function ar(t) {
			if ((t = t[Bt] || t[vu])) {
				var i = t.tag;
				if (i === 5 || i === 6 || i === 13 || i === 31 || i === 26 || i === 27 || i === 3) return t;
			}
			return null;
		}
		function yu(t) {
			var i = t.tag;
			if (i === 5 || i === 26 || i === 27 || i === 6) return t.stateNode;
			throw Error(s(33));
		}
		function rr(t) {
			var i = t[Uh];
			return (i || (i = t[Uh] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), i);
		}
		function qt(t) {
			t[gu] = !0;
		}
		var $h = new Set(),
			Bh = {};
		function xa(t, i) {
			(ur(t, i), ur(t + "Capture", i));
		}
		function ur(t, i) {
			for (Bh[t] = i, t = 0; t < i.length; t++) $h.add(i[t]);
		}
		var S_ = RegExp(
				"^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
			),
			Ih = {},
			Zh = {};
		function w_(t) {
			return kt.call(Zh, t) ? !0 : kt.call(Ih, t) ? !1 : S_.test(t) ? (Zh[t] = !0) : ((Ih[t] = !0), !1);
		}
		function Dl(t, i, r) {
			if (w_(i))
				if (r === null) t.removeAttribute(i);
				else {
					switch (typeof r) {
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
					t.setAttribute(i, "" + r);
				}
		}
		function jl(t, i, r) {
			if (r === null) t.removeAttribute(i);
			else {
				switch (typeof r) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						t.removeAttribute(i);
						return;
				}
				t.setAttribute(i, "" + r);
			}
		}
		function ui(t, i, r, l) {
			if (l === null) t.removeAttribute(r);
			else {
				switch (typeof l) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						t.removeAttribute(r);
						return;
				}
				t.setAttributeNS(i, r, "" + l);
			}
		}
		function xn(t) {
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
		function Hh(t) {
			var i = t.type;
			return (t = t.nodeName) && t.toLowerCase() === "input" && (i === "checkbox" || i === "radio");
		}
		function E_(t, i, r) {
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
						set: function (v) {
							((r = "" + v), d.call(this, v));
						},
					}),
					Object.defineProperty(t, i, { enumerable: l.enumerable }),
					{
						getValue: function () {
							return r;
						},
						setValue: function (v) {
							r = "" + v;
						},
						stopTracking: function () {
							((t._valueTracker = null), delete t[i]);
						},
					}
				);
			}
		}
		function Vo(t) {
			if (!t._valueTracker) {
				var i = Hh(t) ? "checked" : "value";
				t._valueTracker = E_(t, i, "" + t[i]);
			}
		}
		function Vh(t) {
			if (!t) return !1;
			var i = t._valueTracker;
			if (!i) return !0;
			var r = i.getValue(),
				l = "";
			return (t && (l = Hh(t) ? (t.checked ? "true" : "false") : t.value), (t = l), t !== r ? (i.setValue(t), !0) : !1);
		}
		function Ll(t) {
			if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")) return null;
			try {
				return t.activeElement || t.body;
			} catch {
				return t.body;
			}
		}
		var T_ = /[\n"\\]/g;
		function An(t) {
			return t.replace(T_, function (i) {
				return "\\" + i.charCodeAt(0).toString(16) + " ";
			});
		}
		function Qo(t, i, r, l, c, d, v, w) {
			((t.name = ""),
				v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean"
					? (t.type = v)
					: t.removeAttribute("type"),
				i != null
					? v === "number"
						? ((i === 0 && t.value === "") || t.value != i) && (t.value = "" + xn(i))
						: t.value !== "" + xn(i) && (t.value = "" + xn(i))
					: (v !== "submit" && v !== "reset") || t.removeAttribute("value"),
				i != null ? Po(t, v, xn(i)) : r != null ? Po(t, v, xn(r)) : l != null && t.removeAttribute("value"),
				c == null && d != null && (t.defaultChecked = !!d),
				c != null && (t.checked = c && typeof c != "function" && typeof c != "symbol"),
				w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean"
					? (t.name = "" + xn(w))
					: t.removeAttribute("name"));
		}
		function Qh(t, i, r, l, c, d, v, w) {
			if (
				(d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (t.type = d),
				i != null || r != null)
			) {
				if (!((d !== "submit" && d !== "reset") || i != null)) {
					Vo(t);
					return;
				}
				((r = r != null ? "" + xn(r) : ""),
					(i = i != null ? "" + xn(i) : r),
					w || i === t.value || (t.value = i),
					(t.defaultValue = i));
			}
			((l = l ?? c),
				(l = typeof l != "function" && typeof l != "symbol" && !!l),
				(t.checked = w ? t.checked : !!l),
				(t.defaultChecked = !!l),
				v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" && (t.name = v),
				Vo(t));
		}
		function Po(t, i, r) {
			(i === "number" && Ll(t.ownerDocument) === t) || t.defaultValue === "" + r || (t.defaultValue = "" + r);
		}
		function lr(t, i, r, l) {
			if (((t = t.options), i)) {
				i = {};
				for (var c = 0; c < r.length; c++) i["$" + r[c]] = !0;
				for (r = 0; r < t.length; r++)
					((c = i.hasOwnProperty("$" + t[r].value)),
						t[r].selected !== c && (t[r].selected = c),
						c && l && (t[r].defaultSelected = !0));
			} else {
				for (r = "" + xn(r), i = null, c = 0; c < t.length; c++) {
					if (t[c].value === r) {
						((t[c].selected = !0), l && (t[c].defaultSelected = !0));
						return;
					}
					i !== null || t[c].disabled || (i = t[c]);
				}
				i !== null && (i.selected = !0);
			}
		}
		function Ph(t, i, r) {
			if (i != null && ((i = "" + xn(i)), i !== t.value && (t.value = i), r == null)) {
				t.defaultValue !== i && (t.defaultValue = i);
				return;
			}
			t.defaultValue = r != null ? "" + xn(r) : "";
		}
		function Yh(t, i, r, l) {
			if (i == null) {
				if (l != null) {
					if (r != null) throw Error(s(92));
					if (O(l)) {
						if (1 < l.length) throw Error(s(93));
						l = l[0];
					}
					r = l;
				}
				((r ??= ""), (i = r));
			}
			((r = xn(i)),
				(t.defaultValue = r),
				(l = t.textContent),
				l === r && l !== "" && l !== null && (t.value = l),
				Vo(t));
		}
		function sr(t, i) {
			if (i) {
				var r = t.firstChild;
				if (r && r === t.lastChild && r.nodeType === 3) {
					r.nodeValue = i;
					return;
				}
			}
			t.textContent = i;
		}
		var x_ = new Set(
			"animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
				" ",
			),
		);
		function Gh(t, i, r) {
			var l = i.indexOf("--") === 0;
			r == null || typeof r == "boolean" || r === ""
				? l
					? t.setProperty(i, "")
					: i === "float"
						? (t.cssFloat = "")
						: (t[i] = "")
				: l
					? t.setProperty(i, r)
					: typeof r != "number" || r === 0 || x_.has(i)
						? i === "float"
							? (t.cssFloat = r)
							: (t[i] = ("" + r).trim())
						: (t[i] = r + "px");
		}
		function Kh(t, i, r) {
			if (i != null && typeof i != "object") throw Error(s(62));
			if (((t = t.style), r != null)) {
				for (var l in r)
					!r.hasOwnProperty(l) ||
						(i != null && i.hasOwnProperty(l)) ||
						(l.indexOf("--") === 0 ? t.setProperty(l, "") : l === "float" ? (t.cssFloat = "") : (t[l] = ""));
				for (var c in i) ((l = i[c]), i.hasOwnProperty(c) && r[c] !== l && Gh(t, c, l));
			} else for (var d in i) i.hasOwnProperty(d) && Gh(t, d, i[d]);
		}
		function Yo(t) {
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
		var A_ = new Map([
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
			C_ =
				/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
		function ql(t) {
			return C_.test("" + t)
				? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
				: t;
		}
		function li() {}
		var Go = null;
		function Ko(t) {
			return (
				(t = t.target || t.srcElement || window),
				t.correspondingUseElement && (t = t.correspondingUseElement),
				t.nodeType === 3 ? t.parentNode : t
			);
		}
		var or = null,
			cr = null;
		function Xh(t) {
			var i = ar(t);
			if (i && (t = i.stateNode)) {
				var r = t[tn] || null;
				e: switch (((t = i.stateNode), i.type)) {
					case "input":
						if (
							(Qo(t, r.value, r.defaultValue, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name),
							(i = r.name),
							r.type === "radio" && i != null)
						) {
							for (r = t; r.parentNode; ) r = r.parentNode;
							for (r = r.querySelectorAll('input[name="' + An("" + i) + '"][type="radio"]'), i = 0; i < r.length; i++) {
								var l = r[i];
								if (l !== t && l.form === t.form) {
									var c = l[tn] || null;
									if (!c) throw Error(s(90));
									Qo(l, c.value, c.defaultValue, c.defaultValue, c.checked, c.defaultChecked, c.type, c.name);
								}
							}
							for (i = 0; i < r.length; i++) ((l = r[i]), l.form === t.form && Vh(l));
						}
						break e;
					case "textarea":
						Ph(t, r.value, r.defaultValue);
						break e;
					case "select":
						((i = r.value), i != null && lr(t, !!r.multiple, i, !1));
				}
			}
		}
		var Xo = !1;
		function Fh(t, i, r) {
			if (Xo) return t(i, r);
			Xo = !0;
			try {
				return t(i);
			} finally {
				if (((Xo = !1), (or !== null || cr !== null) && (Ts(), or && ((i = or), (t = cr), (cr = or = null), Xh(i), t))))
					for (i = 0; i < t.length; i++) Xh(t[i]);
			}
		}
		function pu(t, i) {
			var r = t.stateNode;
			if (r === null) return null;
			var l = r[tn] || null;
			if (l === null) return null;
			r = l[i];
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
			if (r && typeof r != "function") throw Error(s(231, i, typeof r));
			return r;
		}
		var si = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
			Fo = !1;
		if (si)
			try {
				var bu = {};
				(Object.defineProperty(bu, "passive", {
					get: function () {
						Fo = !0;
					},
				}),
					window.addEventListener("test", bu, bu),
					window.removeEventListener("test", bu, bu));
			} catch {
				Fo = !1;
			}
		var Vi = null,
			Jo = null,
			Ul = null;
		function Jh() {
			if (Ul) return Ul;
			var t,
				i = Jo,
				r = i.length,
				l,
				c = "value" in Vi ? Vi.value : Vi.textContent,
				d = c.length;
			for (t = 0; t < r && i[t] === c[t]; t++);
			var v = r - t;
			for (l = 1; l <= v && i[r - l] === c[d - l]; l++);
			return (Ul = c.slice(t, 1 < l ? 1 - l : void 0));
		}
		function $l(t) {
			var i = t.keyCode;
			return (
				"charCode" in t ? ((t = t.charCode), t === 0 && i === 13 && (t = 13)) : (t = i),
				t === 10 && (t = 13),
				32 <= t || t === 13 ? t : 0
			);
		}
		function Bl() {
			return !0;
		}
		function Wh() {
			return !1;
		}
		function nn(t) {
			function i(r, l, c, d, v) {
				((this._reactName = r),
					(this._targetInst = c),
					(this.type = l),
					(this.nativeEvent = d),
					(this.target = v),
					(this.currentTarget = null));
				for (var w in t) t.hasOwnProperty(w) && ((r = t[w]), (this[w] = r ? r(d) : d[w]));
				return (
					(this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1)
						? Bl
						: Wh),
					(this.isPropagationStopped = Wh),
					this
				);
			}
			return (
				b(i.prototype, {
					preventDefault: function () {
						this.defaultPrevented = !0;
						var r = this.nativeEvent;
						r &&
							(r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1),
							(this.isDefaultPrevented = Bl));
					},
					stopPropagation: function () {
						var r = this.nativeEvent;
						r &&
							(r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0),
							(this.isPropagationStopped = Bl));
					},
					persist: function () {},
					isPersistent: Bl,
				}),
				i
			);
		}
		var Aa = {
				eventPhase: 0,
				bubbles: 0,
				cancelable: 0,
				timeStamp: function (t) {
					return t.timeStamp || Date.now();
				},
				defaultPrevented: 0,
				isTrusted: 0,
			},
			Il = nn(Aa),
			_u = b({}, Aa, { view: 0, detail: 0 }),
			R_ = nn(_u),
			Wo,
			ec,
			Su,
			Zl = b({}, _u, {
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
				getModifierState: nc,
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
						: (t !== Su &&
								(Su && t.type === "mousemove"
									? ((Wo = t.screenX - Su.screenX), (ec = t.screenY - Su.screenY))
									: (ec = Wo = 0),
								(Su = t)),
							Wo);
				},
				movementY: function (t) {
					return "movementY" in t ? t.movementY : ec;
				},
			}),
			em = nn(Zl),
			N_ = nn(b({}, Zl, { dataTransfer: 0 })),
			tc = nn(b({}, _u, { relatedTarget: 0 })),
			O_ = nn(b({}, Aa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
			k_ = nn(
				b({}, Aa, {
					clipboardData: function (t) {
						return "clipboardData" in t ? t.clipboardData : window.clipboardData;
					},
				}),
			),
			tm = nn(b({}, Aa, { data: 0 })),
			M_ = {
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
			z_ = {
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
			D_ = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
		function j_(t) {
			var i = this.nativeEvent;
			return i.getModifierState ? i.getModifierState(t) : (t = D_[t]) ? !!i[t] : !1;
		}
		function nc() {
			return j_;
		}
		var L_ = nn(
				b({}, _u, {
					key: function (t) {
						if (t.key) {
							var i = M_[t.key] || t.key;
							if (i !== "Unidentified") return i;
						}
						return t.type === "keypress"
							? ((t = $l(t)), t === 13 ? "Enter" : String.fromCharCode(t))
							: t.type === "keydown" || t.type === "keyup"
								? z_[t.keyCode] || "Unidentified"
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
					getModifierState: nc,
					charCode: function (t) {
						return t.type === "keypress" ? $l(t) : 0;
					},
					keyCode: function (t) {
						return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
					which: function (t) {
						return t.type === "keypress" ? $l(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
				}),
			),
			nm = nn(
				b({}, Zl, {
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
			q_ = nn(
				b({}, _u, {
					touches: 0,
					targetTouches: 0,
					changedTouches: 0,
					altKey: 0,
					metaKey: 0,
					ctrlKey: 0,
					shiftKey: 0,
					getModifierState: nc,
				}),
			),
			U_ = nn(b({}, Aa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
			$_ = nn(
				b({}, Zl, {
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
			B_ = nn(b({}, Aa, { newState: 0, oldState: 0 })),
			I_ = [9, 13, 27, 32],
			ic = si && "CompositionEvent" in window,
			wu = null;
		si && "documentMode" in document && (wu = document.documentMode);
		var Z_ = si && "TextEvent" in window && !wu,
			im = si && (!ic || (wu && 8 < wu && 11 >= wu)),
			am = " ",
			rm = !1;
		function um(t, i) {
			switch (t) {
				case "keyup":
					return I_.indexOf(i.keyCode) !== -1;
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
		function lm(t) {
			return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
		}
		var fr = !1;
		function H_(t, i) {
			switch (t) {
				case "compositionend":
					return lm(i);
				case "keypress":
					return i.which !== 32 ? null : ((rm = !0), am);
				case "textInput":
					return ((t = i.data), t === am && rm ? null : t);
				default:
					return null;
			}
		}
		function V_(t, i) {
			if (fr)
				return t === "compositionend" || (!ic && um(t, i)) ? ((t = Jh()), (Ul = Jo = Vi = null), (fr = !1), t) : null;
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
					return im && i.locale !== "ko" ? null : i.data;
				default:
					return null;
			}
		}
		var Q_ = {
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
		function sm(t) {
			var i = t && t.nodeName && t.nodeName.toLowerCase();
			return i === "input" ? !!Q_[t.type] : i === "textarea";
		}
		function om(t, i, r, l) {
			(or ? (cr ? cr.push(l) : (cr = [l])) : (or = l),
				(i = ks(i, "onChange")),
				0 < i.length && ((r = new Il("onChange", "change", null, r, l)), t.push({ event: r, listeners: i })));
		}
		var Eu = null,
			Tu = null;
		function P_(t) {
			Zg(t, 0);
		}
		function Hl(t) {
			if (Vh(yu(t))) return t;
		}
		function cm(t, i) {
			if (t === "change") return i;
		}
		var fm = !1;
		if (si) {
			var ac;
			if (si) {
				var rc = "oninput" in document;
				if (!rc) {
					var dm = document.createElement("div");
					(dm.setAttribute("oninput", "return;"), (rc = typeof dm.oninput == "function"));
				}
				ac = rc;
			} else ac = !1;
			fm = ac && (!document.documentMode || 9 < document.documentMode);
		}
		function hm() {
			Eu && (Eu.detachEvent("onpropertychange", mm), (Tu = Eu = null));
		}
		function mm(t) {
			if (t.propertyName === "value" && Hl(Tu)) {
				var i = [];
				(om(i, Tu, t, Ko(t)), Fh(P_, i));
			}
		}
		function Y_(t, i, r) {
			t === "focusin" ? (hm(), (Eu = i), (Tu = r), Eu.attachEvent("onpropertychange", mm)) : t === "focusout" && hm();
		}
		function G_(t) {
			if (t === "selectionchange" || t === "keyup" || t === "keydown") return Hl(Tu);
		}
		function K_(t, i) {
			if (t === "click") return Hl(i);
		}
		function X_(t, i) {
			if (t === "input" || t === "change") return Hl(i);
		}
		function F_(t, i) {
			return (t === i && (t !== 0 || 1 / t === 1 / i)) || (t !== t && i !== i);
		}
		var hn = typeof Object.is == "function" ? Object.is : F_;
		function xu(t, i) {
			if (hn(t, i)) return !0;
			if (typeof t != "object" || t === null || typeof i != "object" || i === null) return !1;
			var r = Object.keys(t),
				l = Object.keys(i);
			if (r.length !== l.length) return !1;
			for (l = 0; l < r.length; l++) {
				var c = r[l];
				if (!kt.call(i, c) || !hn(t[c], i[c])) return !1;
			}
			return !0;
		}
		function vm(t) {
			for (; t && t.firstChild; ) t = t.firstChild;
			return t;
		}
		function gm(t, i) {
			var r = vm(t);
			t = 0;
			for (var l; r; ) {
				if (r.nodeType === 3) {
					if (((l = t + r.textContent.length), t <= i && l >= i)) return { node: r, offset: i - t };
					t = l;
				}
				e: {
					for (; r; ) {
						if (r.nextSibling) {
							r = r.nextSibling;
							break e;
						}
						r = r.parentNode;
					}
					r = void 0;
				}
				r = vm(r);
			}
		}
		function ym(t, i) {
			return t && i
				? t === i
					? !0
					: t && t.nodeType === 3
						? !1
						: i && i.nodeType === 3
							? ym(t, i.parentNode)
							: "contains" in t
								? t.contains(i)
								: t.compareDocumentPosition
									? !!(t.compareDocumentPosition(i) & 16)
									: !1
				: !1;
		}
		function pm(t) {
			t =
				t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
					? t.ownerDocument.defaultView
					: window;
			for (var i = Ll(t.document); i instanceof t.HTMLIFrameElement; ) {
				try {
					var r = typeof i.contentWindow.location.href == "string";
				} catch {
					r = !1;
				}
				if (r) t = i.contentWindow;
				else break;
				i = Ll(t.document);
			}
			return i;
		}
		function uc(t) {
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
		var J_ = si && "documentMode" in document && 11 >= document.documentMode,
			dr = null,
			lc = null,
			Au = null,
			sc = !1;
		function bm(t, i, r) {
			var l = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
			sc ||
				dr == null ||
				dr !== Ll(l) ||
				((l = dr),
				"selectionStart" in l && uc(l)
					? (l = { start: l.selectionStart, end: l.selectionEnd })
					: ((l = ((l.ownerDocument && l.ownerDocument.defaultView) || window).getSelection()),
						(l = {
							anchorNode: l.anchorNode,
							anchorOffset: l.anchorOffset,
							focusNode: l.focusNode,
							focusOffset: l.focusOffset,
						})),
				(Au && xu(Au, l)) ||
					((Au = l),
					(l = ks(lc, "onSelect")),
					0 < l.length &&
						((i = new Il("onSelect", "select", null, i, r)), t.push({ event: i, listeners: l }), (i.target = dr))));
		}
		function Ca(t, i) {
			var r = {};
			return ((r[t.toLowerCase()] = i.toLowerCase()), (r["Webkit" + t] = "webkit" + i), (r["Moz" + t] = "moz" + i), r);
		}
		var hr = {
				animationend: Ca("Animation", "AnimationEnd"),
				animationiteration: Ca("Animation", "AnimationIteration"),
				animationstart: Ca("Animation", "AnimationStart"),
				transitionrun: Ca("Transition", "TransitionRun"),
				transitionstart: Ca("Transition", "TransitionStart"),
				transitioncancel: Ca("Transition", "TransitionCancel"),
				transitionend: Ca("Transition", "TransitionEnd"),
			},
			oc = {},
			_m = {};
		si &&
			((_m = document.createElement("div").style),
			"AnimationEvent" in window ||
				(delete hr.animationend.animation, delete hr.animationiteration.animation, delete hr.animationstart.animation),
			"TransitionEvent" in window || delete hr.transitionend.transition);
		function Ra(t) {
			if (oc[t]) return oc[t];
			if (!hr[t]) return t;
			var i = hr[t],
				r;
			for (r in i) if (i.hasOwnProperty(r) && r in _m) return (oc[t] = i[r]);
			return t;
		}
		var Sm = Ra("animationend"),
			wm = Ra("animationiteration"),
			Em = Ra("animationstart"),
			W_ = Ra("transitionrun"),
			eS = Ra("transitionstart"),
			tS = Ra("transitioncancel"),
			Tm = Ra("transitionend"),
			xm = new Map(),
			cc =
				"abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
					" ",
				);
		cc.push("scrollEnd");
		function In(t, i) {
			(xm.set(t, i), xa(i, [t]));
		}
		var Vl =
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
			Cn = [],
			mr = 0,
			fc = 0;
		function Ql() {
			for (var t = mr, i = (fc = mr = 0); i < t; ) {
				var r = Cn[i];
				Cn[i++] = null;
				var l = Cn[i];
				Cn[i++] = null;
				var c = Cn[i];
				Cn[i++] = null;
				var d = Cn[i];
				if (((Cn[i++] = null), l !== null && c !== null)) {
					var v = l.pending;
					(v === null ? (c.next = c) : ((c.next = v.next), (v.next = c)), (l.pending = c));
				}
				d !== 0 && Am(r, c, d);
			}
		}
		function Pl(t, i, r, l) {
			((Cn[mr++] = t),
				(Cn[mr++] = i),
				(Cn[mr++] = r),
				(Cn[mr++] = l),
				(fc |= l),
				(t.lanes |= l),
				(t = t.alternate),
				t !== null && (t.lanes |= l));
		}
		function dc(t, i, r, l) {
			return (Pl(t, i, r, l), Yl(t));
		}
		function Na(t, i) {
			return (Pl(t, null, null, i), Yl(t));
		}
		function Am(t, i, r) {
			t.lanes |= r;
			var l = t.alternate;
			l !== null && (l.lanes |= r);
			for (var c = !1, d = t.return; d !== null; )
				((d.childLanes |= r),
					(l = d.alternate),
					l !== null && (l.childLanes |= r),
					d.tag === 22 && ((t = d.stateNode), t === null || t._visibility & 1 || (c = !0)),
					(t = d),
					(d = d.return));
			return t.tag === 3
				? ((d = t.stateNode),
					c &&
						i !== null &&
						((c = 31 - qe(r)),
						(t = d.hiddenUpdates),
						(l = t[c]),
						l === null ? (t[c] = [i]) : l.push(i),
						(i.lane = r | 536870912)),
					d)
				: null;
		}
		function Yl(t) {
			if (50 < Gu) throw ((Gu = 0), (wf = null), Error(s(185)));
			for (var i = t.return; i !== null; ) ((t = i), (i = t.return));
			return t.tag === 3 ? t.stateNode : null;
		}
		var vr = {};
		function nS(t, i, r, l) {
			((this.tag = t),
				(this.key = r),
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
		function mn(t, i, r, l) {
			return new nS(t, i, r, l);
		}
		function hc(t) {
			return ((t = t.prototype), !(!t || !t.isReactComponent));
		}
		function oi(t, i) {
			var r = t.alternate;
			return (
				r === null
					? ((r = mn(t.tag, i, t.key, t.mode)),
						(r.elementType = t.elementType),
						(r.type = t.type),
						(r.stateNode = t.stateNode),
						(r.alternate = t),
						(t.alternate = r))
					: ((r.pendingProps = i), (r.type = t.type), (r.flags = 0), (r.subtreeFlags = 0), (r.deletions = null)),
				(r.flags = t.flags & 65011712),
				(r.childLanes = t.childLanes),
				(r.lanes = t.lanes),
				(r.child = t.child),
				(r.memoizedProps = t.memoizedProps),
				(r.memoizedState = t.memoizedState),
				(r.updateQueue = t.updateQueue),
				(i = t.dependencies),
				(r.dependencies = i === null ? null : { lanes: i.lanes, firstContext: i.firstContext }),
				(r.sibling = t.sibling),
				(r.index = t.index),
				(r.ref = t.ref),
				(r.refCleanup = t.refCleanup),
				r
			);
		}
		function Cm(t, i) {
			t.flags &= 65011714;
			var r = t.alternate;
			return (
				r === null
					? ((t.childLanes = 0),
						(t.lanes = i),
						(t.child = null),
						(t.subtreeFlags = 0),
						(t.memoizedProps = null),
						(t.memoizedState = null),
						(t.updateQueue = null),
						(t.dependencies = null),
						(t.stateNode = null))
					: ((t.childLanes = r.childLanes),
						(t.lanes = r.lanes),
						(t.child = r.child),
						(t.subtreeFlags = 0),
						(t.deletions = null),
						(t.memoizedProps = r.memoizedProps),
						(t.memoizedState = r.memoizedState),
						(t.updateQueue = r.updateQueue),
						(t.type = r.type),
						(i = r.dependencies),
						(t.dependencies = i === null ? null : { lanes: i.lanes, firstContext: i.firstContext })),
				t
			);
		}
		function Gl(t, i, r, l, c, d) {
			var v = 0;
			if (((l = t), typeof t == "function")) hc(t) && (v = 1);
			else if (typeof t == "string")
				v = sw(t, r, se.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
			else
				e: switch (t) {
					case ne:
						return ((t = mn(31, r, i, c)), (t.elementType = ne), (t.lanes = d), t);
					case D:
						return Oa(r.children, c, d, i);
					case z:
						((v = 8), (c |= 24));
						break;
					case R:
						return ((t = mn(12, r, i, c | 2)), (t.elementType = R), (t.lanes = d), t);
					case G:
						return ((t = mn(13, r, i, c)), (t.elementType = G), (t.lanes = d), t);
					case $:
						return ((t = mn(19, r, i, c)), (t.elementType = $), (t.lanes = d), t);
					default:
						if (typeof t == "object" && t !== null)
							switch (t.$$typeof) {
								case C:
									v = 10;
									break e;
								case A:
									v = 9;
									break e;
								case M:
									v = 11;
									break e;
								case q:
									v = 14;
									break e;
								case B:
									((v = 16), (l = null));
									break e;
							}
						((v = 29), (r = Error(s(130, t === null ? "null" : typeof t, ""))), (l = null));
				}
			return ((i = mn(v, r, i, c)), (i.elementType = t), (i.type = l), (i.lanes = d), i);
		}
		function Oa(t, i, r, l) {
			return ((t = mn(7, t, l, i)), (t.lanes = r), t);
		}
		function mc(t, i, r) {
			return ((t = mn(6, t, null, i)), (t.lanes = r), t);
		}
		function Rm(t) {
			var i = mn(18, null, null, 0);
			return ((i.stateNode = t), i);
		}
		function vc(t, i, r) {
			return (
				(i = mn(4, t.children !== null ? t.children : [], t.key, i)),
				(i.lanes = r),
				(i.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }),
				i
			);
		}
		var Nm = new WeakMap();
		function Rn(t, i) {
			if (typeof t == "object" && t !== null) {
				var r = Nm.get(t);
				return r !== void 0 ? r : ((i = { value: t, source: i, stack: je(i) }), Nm.set(t, i), i);
			}
			return { value: t, source: i, stack: je(i) };
		}
		var gr = [],
			yr = 0,
			Kl = null,
			Cu = 0,
			Nn = [],
			On = 0,
			Qi = null,
			Kn = 1,
			Xn = "";
		function ci(t, i) {
			((gr[yr++] = Cu), (gr[yr++] = Kl), (Kl = t), (Cu = i));
		}
		function Om(t, i, r) {
			((Nn[On++] = Kn), (Nn[On++] = Xn), (Nn[On++] = Qi), (Qi = t));
			var l = Kn;
			t = Xn;
			var c = 32 - qe(l) - 1;
			((l &= ~(1 << c)), (r += 1));
			var d = 32 - qe(i) + c;
			if (30 < d) {
				var v = c - (c % 5);
				((d = (l & ((1 << v) - 1)).toString(32)),
					(l >>= v),
					(c -= v),
					(Kn = (1 << (32 - qe(i) + c)) | (r << c) | l),
					(Xn = d + t));
			} else ((Kn = (1 << d) | (r << c) | l), (Xn = t));
		}
		function gc(t) {
			t.return !== null && (ci(t, 1), Om(t, 1, 0));
		}
		function yc(t) {
			for (; t === Kl; ) ((Kl = gr[--yr]), (gr[yr] = null), (Cu = gr[--yr]), (gr[yr] = null));
			for (; t === Qi; )
				((Qi = Nn[--On]), (Nn[On] = null), (Xn = Nn[--On]), (Nn[On] = null), (Kn = Nn[--On]), (Nn[On] = null));
		}
		function km(t, i) {
			((Nn[On++] = Kn), (Nn[On++] = Xn), (Nn[On++] = Qi), (Kn = i.id), (Xn = i.overflow), (Qi = t));
		}
		var It = null,
			tt = null,
			De = !1,
			Pi = null,
			kn = !1,
			pc = Error(s(519));
		function Yi(t) {
			throw (
				Ru(Rn(Error(s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), t)),
				pc
			);
		}
		function Mm(t) {
			var i = t.stateNode,
				r = t.type,
				l = t.memoizedProps;
			switch (((i[Bt] = t), (i[tn] = l), r)) {
				case "dialog":
					(Ne("cancel", i), Ne("close", i));
					break;
				case "iframe":
				case "object":
				case "embed":
					Ne("load", i);
					break;
				case "video":
				case "audio":
					for (r = 0; r < Xu.length; r++) Ne(Xu[r], i);
					break;
				case "source":
					Ne("error", i);
					break;
				case "img":
				case "image":
				case "link":
					(Ne("error", i), Ne("load", i));
					break;
				case "details":
					Ne("toggle", i);
					break;
				case "input":
					(Ne("invalid", i), Qh(i, l.value, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name, !0));
					break;
				case "select":
					Ne("invalid", i);
					break;
				case "textarea":
					(Ne("invalid", i), Yh(i, l.value, l.defaultValue, l.children));
			}
			((r = l.children),
				(typeof r != "string" && typeof r != "number" && typeof r != "bigint") ||
				i.textContent === "" + r ||
				l.suppressHydrationWarning === !0 ||
				Yg(i.textContent, r)
					? (l.popover != null && (Ne("beforetoggle", i), Ne("toggle", i)),
						l.onScroll != null && Ne("scroll", i),
						l.onScrollEnd != null && Ne("scrollend", i),
						l.onClick != null && (i.onclick = li),
						(i = !0))
					: (i = !1),
				i || Yi(t, !0));
		}
		function zm(t) {
			for (It = t.return; It; )
				switch (It.tag) {
					case 5:
					case 31:
					case 13:
						kn = !1;
						return;
					case 27:
					case 3:
						kn = !0;
						return;
					default:
						It = It.return;
				}
		}
		function pr(t) {
			if (t !== It) return !1;
			if (!De) return (zm(t), (De = !0), !1);
			var i = t.tag,
				r;
			if (
				((r = i !== 3 && i !== 27) &&
					((r = i === 5) && ((r = t.type), (r = !(r !== "form" && r !== "button") || Lf(t.type, t.memoizedProps))),
					(r = !r)),
				r && tt && Yi(t),
				zm(t),
				i === 13)
			) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
				tt = ny(t);
			} else if (i === 31) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
				tt = ny(t);
			} else
				i === 27
					? ((i = tt), ra(t.type) ? ((t = If), (If = null), (tt = t)) : (tt = i))
					: (tt = It ? Dn(t.stateNode.nextSibling) : null);
			return !0;
		}
		function ka() {
			((tt = It = null), (De = !1));
		}
		function bc() {
			var t = Pi;
			return (t !== null && (ln === null ? (ln = t) : ln.push.apply(ln, t), (Pi = null)), t);
		}
		function Ru(t) {
			Pi === null ? (Pi = [t]) : Pi.push(t);
		}
		var _c = N(null),
			Ma = null,
			fi = null;
		function Gi(t, i, r) {
			(ie(_c, i._currentValue), (i._currentValue = r));
		}
		function di(t) {
			((t._currentValue = _c.current), Y(_c));
		}
		function Sc(t, i, r) {
			for (; t !== null; ) {
				var l = t.alternate;
				if (
					((t.childLanes & i) !== i
						? ((t.childLanes |= i), l !== null && (l.childLanes |= i))
						: l !== null && (l.childLanes & i) !== i && (l.childLanes |= i),
					t === r)
				)
					break;
				t = t.return;
			}
		}
		function wc(t, i, r, l) {
			var c = t.child;
			for (c !== null && (c.return = t); c !== null; ) {
				var d = c.dependencies;
				if (d !== null) {
					var v = c.child;
					d = d.firstContext;
					e: for (; d !== null; ) {
						var w = d;
						d = c;
						for (var k = 0; k < i.length; k++)
							if (w.context === i[k]) {
								((d.lanes |= r), (w = d.alternate), w !== null && (w.lanes |= r), Sc(d.return, r, t), l || (v = null));
								break e;
							}
						d = w.next;
					}
				} else if (c.tag === 18) {
					if (((v = c.return), v === null)) throw Error(s(341));
					((v.lanes |= r), (d = v.alternate), d !== null && (d.lanes |= r), Sc(v, r, t), (v = null));
				} else v = c.child;
				if (v !== null) v.return = c;
				else
					for (v = c; v !== null; ) {
						if (v === t) {
							v = null;
							break;
						}
						if (((c = v.sibling), c !== null)) {
							((c.return = v.return), (v = c));
							break;
						}
						v = v.return;
					}
				c = v;
			}
		}
		function br(t, i, r, l) {
			t = null;
			for (var c = i, d = !1; c !== null; ) {
				if (!d) {
					if ((c.flags & 524288) !== 0) d = !0;
					else if ((c.flags & 262144) !== 0) break;
				}
				if (c.tag === 10) {
					var v = c.alternate;
					if (v === null) throw Error(s(387));
					if (((v = v.memoizedProps), v !== null)) {
						var w = c.type;
						hn(c.pendingProps.value, v.value) || (t !== null ? t.push(w) : (t = [w]));
					}
				} else if (c === we.current) {
					if (((v = c.alternate), v === null)) throw Error(s(387));
					v.memoizedState.memoizedState !== c.memoizedState.memoizedState && (t !== null ? t.push(tl) : (t = [tl]));
				}
				c = c.return;
			}
			(t !== null && wc(i, t, r, l), (i.flags |= 262144));
		}
		function Xl(t) {
			for (t = t.firstContext; t !== null; ) {
				if (!hn(t.context._currentValue, t.memoizedValue)) return !0;
				t = t.next;
			}
			return !1;
		}
		function za(t) {
			((Ma = t), (fi = null), (t = t.dependencies), t !== null && (t.firstContext = null));
		}
		function Zt(t) {
			return Dm(Ma, t);
		}
		function Fl(t, i) {
			return (Ma === null && za(t), Dm(t, i));
		}
		function Dm(t, i) {
			var r = i._currentValue;
			if (((i = { context: i, memoizedValue: r, next: null }), fi === null)) {
				if (t === null) throw Error(s(308));
				((fi = i), (t.dependencies = { lanes: 0, firstContext: i }), (t.flags |= 524288));
			} else fi = fi.next = i;
			return r;
		}
		var iS =
				typeof AbortController < "u"
					? AbortController
					: function () {
							var t = [],
								i = (this.signal = {
									aborted: !1,
									addEventListener: function (r, l) {
										t.push(l);
									},
								});
							this.abort = function () {
								((i.aborted = !0),
									t.forEach(function (r) {
										return r();
									}));
							};
						},
			aS = n.unstable_scheduleCallback,
			rS = n.unstable_NormalPriority,
			Et = { $$typeof: C, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
		function Ec() {
			return { controller: new iS(), data: new Map(), refCount: 0 };
		}
		function Nu(t) {
			(t.refCount--,
				t.refCount === 0 &&
					aS(rS, function () {
						t.controller.abort();
					}));
		}
		var Ou = null,
			Tc = 0,
			_r = 0,
			Sr = null;
		function uS(t, i) {
			if (Ou === null) {
				var r = (Ou = []);
				((Tc = 0),
					(_r = Rf()),
					(Sr = {
						status: "pending",
						value: void 0,
						then: function (l) {
							r.push(l);
						},
					}));
			}
			return (Tc++, i.then(jm, jm), i);
		}
		function jm() {
			if (--Tc === 0 && Ou !== null) {
				Sr !== null && (Sr.status = "fulfilled");
				var t = Ou;
				((Ou = null), (_r = 0), (Sr = null));
				for (var i = 0; i < t.length; i++) (0, t[i])();
			}
		}
		function lS(t, i) {
			var r = [],
				l = {
					status: "pending",
					value: null,
					reason: null,
					then: function (c) {
						r.push(c);
					},
				};
			return (
				t.then(
					function () {
						((l.status = "fulfilled"), (l.value = i));
						for (var c = 0; c < r.length; c++) (0, r[c])(i);
					},
					function (c) {
						for (l.status = "rejected", l.reason = c, c = 0; c < r.length; c++) (0, r[c])(void 0);
					},
				),
				l
			);
		}
		var Lm = U.S;
		U.S = function (t, i) {
			((gg = vt()),
				typeof i == "object" && i !== null && typeof i.then == "function" && uS(t, i),
				Lm !== null && Lm(t, i));
		};
		var Da = N(null);
		function xc() {
			var t = Da.current;
			return t !== null ? t : Xe.pooledCache;
		}
		function Jl(t, i) {
			i === null ? ie(Da, Da.current) : ie(Da, i.pool);
		}
		function qm() {
			var t = xc();
			return t === null ? null : { parent: Et._currentValue, pool: t };
		}
		var wr = Error(s(460)),
			Ac = Error(s(474)),
			Wl = Error(s(542)),
			es = { then: function () {} };
		function Um(t) {
			return ((t = t.status), t === "fulfilled" || t === "rejected");
		}
		function $m(t, i, r) {
			switch (((r = t[r]), r === void 0 ? t.push(i) : r !== i && (i.then(li, li), (i = r)), i.status)) {
				case "fulfilled":
					return i.value;
				case "rejected":
					throw ((t = i.reason), Im(t), t);
				default:
					if (typeof i.status == "string") i.then(li, li);
					else {
						if (((t = Xe), t !== null && 100 < t.shellSuspendCounter)) throw Error(s(482));
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
							throw ((t = i.reason), Im(t), t);
					}
					throw ((La = i), wr);
			}
		}
		function ja(t) {
			try {
				var i = t._init;
				return i(t._payload);
			} catch (r) {
				throw r !== null && typeof r == "object" && typeof r.then == "function" ? ((La = r), wr) : r;
			}
		}
		var La = null;
		function Bm() {
			if (La === null) throw Error(s(459));
			var t = La;
			return ((La = null), t);
		}
		function Im(t) {
			if (t === wr || t === Wl) throw Error(s(483));
		}
		var Er = null,
			ku = 0;
		function ts(t) {
			var i = ku;
			return ((ku += 1), Er === null && (Er = []), $m(Er, t, i));
		}
		function Mu(t, i) {
			((i = i.props.ref), (t.ref = i !== void 0 ? i : null));
		}
		function ns(t, i) {
			throw i.$$typeof === p
				? Error(s(525))
				: ((t = Object.prototype.toString.call(i)),
					Error(s(31, t === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : t)));
		}
		function Zm(t) {
			function i(L, j) {
				if (t) {
					var I = L.deletions;
					I === null ? ((L.deletions = [j]), (L.flags |= 16)) : I.push(j);
				}
			}
			function r(L, j) {
				if (!t) return null;
				for (; j !== null; ) (i(L, j), (j = j.sibling));
				return null;
			}
			function l(L) {
				for (var j = new Map(); L !== null; ) (L.key !== null ? j.set(L.key, L) : j.set(L.index, L), (L = L.sibling));
				return j;
			}
			function c(L, j) {
				return ((L = oi(L, j)), (L.index = 0), (L.sibling = null), L);
			}
			function d(L, j, I) {
				return (
					(L.index = I),
					t
						? ((I = L.alternate),
							I !== null ? ((I = I.index), I < j ? ((L.flags |= 67108866), j) : I) : ((L.flags |= 67108866), j))
						: ((L.flags |= 1048576), j)
				);
			}
			function v(L) {
				return (t && L.alternate === null && (L.flags |= 67108866), L);
			}
			function w(L, j, I, J) {
				return j === null || j.tag !== 6
					? ((j = mc(I, L.mode, J)), (j.return = L), j)
					: ((j = c(j, I)), (j.return = L), j);
			}
			function k(L, j, I, J) {
				var pe = I.type;
				return pe === D
					? K(L, j, I.props.children, J, I.key)
					: j !== null &&
						  (j.elementType === pe || (typeof pe == "object" && pe !== null && pe.$$typeof === B && ja(pe) === j.type))
						? ((j = c(j, I.props)), Mu(j, I), (j.return = L), j)
						: ((j = Gl(I.type, I.key, I.props, null, L.mode, J)), Mu(j, I), (j.return = L), j);
			}
			function Z(L, j, I, J) {
				return j === null ||
					j.tag !== 4 ||
					j.stateNode.containerInfo !== I.containerInfo ||
					j.stateNode.implementation !== I.implementation
					? ((j = vc(I, L.mode, J)), (j.return = L), j)
					: ((j = c(j, I.children || [])), (j.return = L), j);
			}
			function K(L, j, I, J, pe) {
				return j === null || j.tag !== 7
					? ((j = Oa(I, L.mode, J, pe)), (j.return = L), j)
					: ((j = c(j, I)), (j.return = L), j);
			}
			function ee(L, j, I) {
				if ((typeof j == "string" && j !== "") || typeof j == "number" || typeof j == "bigint")
					return ((j = mc("" + j, L.mode, I)), (j.return = L), j);
				if (typeof j == "object" && j !== null) {
					switch (j.$$typeof) {
						case E:
							return ((I = Gl(j.type, j.key, j.props, null, L.mode, I)), Mu(I, j), (I.return = L), I);
						case x:
							return ((j = vc(j, L.mode, I)), (j.return = L), j);
						case B:
							return ((j = ja(j)), ee(L, j, I));
					}
					if (O(j) || te(j)) return ((j = Oa(j, L.mode, I, null)), (j.return = L), j);
					if (typeof j.then == "function") return ee(L, ts(j), I);
					if (j.$$typeof === C) return ee(L, Fl(L, j), I);
					ns(L, j);
				}
				return null;
			}
			function H(L, j, I, J) {
				var pe = j !== null ? j.key : null;
				if ((typeof I == "string" && I !== "") || typeof I == "number" || typeof I == "bigint")
					return pe !== null ? null : w(L, j, "" + I, J);
				if (typeof I == "object" && I !== null) {
					switch (I.$$typeof) {
						case E:
							return I.key === pe ? k(L, j, I, J) : null;
						case x:
							return I.key === pe ? Z(L, j, I, J) : null;
						case B:
							return ((I = ja(I)), H(L, j, I, J));
					}
					if (O(I) || te(I)) return pe !== null ? null : K(L, j, I, J, null);
					if (typeof I.then == "function") return H(L, j, ts(I), J);
					if (I.$$typeof === C) return H(L, j, Fl(L, I), J);
					ns(L, I);
				}
				return null;
			}
			function Q(L, j, I, J, pe) {
				if ((typeof J == "string" && J !== "") || typeof J == "number" || typeof J == "bigint")
					return ((L = L.get(I) || null), w(j, L, "" + J, pe));
				if (typeof J == "object" && J !== null) {
					switch (J.$$typeof) {
						case E:
							return ((L = L.get(J.key === null ? I : J.key) || null), k(j, L, J, pe));
						case x:
							return ((L = L.get(J.key === null ? I : J.key) || null), Z(j, L, J, pe));
						case B:
							return ((J = ja(J)), Q(L, j, I, J, pe));
					}
					if (O(J) || te(J)) return ((L = L.get(I) || null), K(j, L, J, pe, null));
					if (typeof J.then == "function") return Q(L, j, I, ts(J), pe);
					if (J.$$typeof === C) return Q(L, j, I, Fl(j, J), pe);
					ns(j, J);
				}
				return null;
			}
			function fe(L, j, I, J) {
				for (var pe = null, Ue = null, he = j, Ae = (j = 0), Me = null; he !== null && Ae < I.length; Ae++) {
					he.index > Ae ? ((Me = he), (he = null)) : (Me = he.sibling);
					var $e = H(L, he, I[Ae], J);
					if ($e === null) {
						he === null && (he = Me);
						break;
					}
					(t && he && $e.alternate === null && i(L, he),
						(j = d($e, j, Ae)),
						Ue === null ? (pe = $e) : (Ue.sibling = $e),
						(Ue = $e),
						(he = Me));
				}
				if (Ae === I.length) return (r(L, he), De && ci(L, Ae), pe);
				if (he === null) {
					for (; Ae < I.length; Ae++)
						((he = ee(L, I[Ae], J)),
							he !== null && ((j = d(he, j, Ae)), Ue === null ? (pe = he) : (Ue.sibling = he), (Ue = he)));
					return (De && ci(L, Ae), pe);
				}
				for (he = l(he); Ae < I.length; Ae++)
					((Me = Q(he, L, Ae, I[Ae], J)),
						Me !== null &&
							(t && Me.alternate !== null && he.delete(Me.key === null ? Ae : Me.key),
							(j = d(Me, j, Ae)),
							Ue === null ? (pe = Me) : (Ue.sibling = Me),
							(Ue = Me)));
				return (
					t &&
						he.forEach(function (ca) {
							return i(L, ca);
						}),
					De && ci(L, Ae),
					pe
				);
			}
			function Se(L, j, I, J) {
				if (I == null) throw Error(s(151));
				for (
					var pe = null, Ue = null, he = j, Ae = (j = 0), Me = null, $e = I.next();
					he !== null && !$e.done;
					Ae++, $e = I.next()
				) {
					he.index > Ae ? ((Me = he), (he = null)) : (Me = he.sibling);
					var ca = H(L, he, $e.value, J);
					if (ca === null) {
						he === null && (he = Me);
						break;
					}
					(t && he && ca.alternate === null && i(L, he),
						(j = d(ca, j, Ae)),
						Ue === null ? (pe = ca) : (Ue.sibling = ca),
						(Ue = ca),
						(he = Me));
				}
				if ($e.done) return (r(L, he), De && ci(L, Ae), pe);
				if (he === null) {
					for (; !$e.done; Ae++, $e = I.next())
						(($e = ee(L, $e.value, J)),
							$e !== null && ((j = d($e, j, Ae)), Ue === null ? (pe = $e) : (Ue.sibling = $e), (Ue = $e)));
					return (De && ci(L, Ae), pe);
				}
				for (he = l(he); !$e.done; Ae++, $e = I.next())
					(($e = Q(he, L, Ae, $e.value, J)),
						$e !== null &&
							(t && $e.alternate !== null && he.delete($e.key === null ? Ae : $e.key),
							(j = d($e, j, Ae)),
							Ue === null ? (pe = $e) : (Ue.sibling = $e),
							(Ue = $e)));
				return (
					t &&
						he.forEach(function (ww) {
							return i(L, ww);
						}),
					De && ci(L, Ae),
					pe
				);
			}
			function Ge(L, j, I, J) {
				if (
					(typeof I == "object" && I !== null && I.type === D && I.key === null && (I = I.props.children),
					typeof I == "object" && I !== null)
				) {
					switch (I.$$typeof) {
						case E:
							e: {
								for (var pe = I.key; j !== null; ) {
									if (j.key === pe) {
										if (((pe = I.type), pe === D)) {
											if (j.tag === 7) {
												(r(L, j.sibling), (J = c(j, I.props.children)), (J.return = L), (L = J));
												break e;
											}
										} else if (
											j.elementType === pe ||
											(typeof pe == "object" && pe !== null && pe.$$typeof === B && ja(pe) === j.type)
										) {
											(r(L, j.sibling), (J = c(j, I.props)), Mu(J, I), (J.return = L), (L = J));
											break e;
										}
										r(L, j);
										break;
									} else i(L, j);
									j = j.sibling;
								}
								I.type === D
									? ((J = Oa(I.props.children, L.mode, J, I.key)), (J.return = L), (L = J))
									: ((J = Gl(I.type, I.key, I.props, null, L.mode, J)), Mu(J, I), (J.return = L), (L = J));
							}
							return v(L);
						case x:
							e: {
								for (pe = I.key; j !== null; ) {
									if (j.key === pe)
										if (
											j.tag === 4 &&
											j.stateNode.containerInfo === I.containerInfo &&
											j.stateNode.implementation === I.implementation
										) {
											(r(L, j.sibling), (J = c(j, I.children || [])), (J.return = L), (L = J));
											break e;
										} else {
											r(L, j);
											break;
										}
									else i(L, j);
									j = j.sibling;
								}
								((J = vc(I, L.mode, J)), (J.return = L), (L = J));
							}
							return v(L);
						case B:
							return ((I = ja(I)), Ge(L, j, I, J));
					}
					if (O(I)) return fe(L, j, I, J);
					if (te(I)) {
						if (((pe = te(I)), typeof pe != "function")) throw Error(s(150));
						return ((I = pe.call(I)), Se(L, j, I, J));
					}
					if (typeof I.then == "function") return Ge(L, j, ts(I), J);
					if (I.$$typeof === C) return Ge(L, j, Fl(L, I), J);
					ns(L, I);
				}
				return (typeof I == "string" && I !== "") || typeof I == "number" || typeof I == "bigint"
					? ((I = "" + I),
						j !== null && j.tag === 6
							? (r(L, j.sibling), (J = c(j, I)), (J.return = L), (L = J))
							: (r(L, j), (J = mc(I, L.mode, J)), (J.return = L), (L = J)),
						v(L))
					: r(L, j);
			}
			return function (L, j, I, J) {
				try {
					ku = 0;
					var pe = Ge(L, j, I, J);
					return ((Er = null), pe);
				} catch (he) {
					if (he === wr || he === Wl) throw he;
					var Ue = mn(29, he, null, L.mode);
					return ((Ue.lanes = J), (Ue.return = L), Ue);
				}
			};
		}
		var qa = Zm(!0),
			Hm = Zm(!1),
			Ki = !1;
		function Cc(t) {
			t.updateQueue = {
				baseState: t.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: { pending: null, lanes: 0, hiddenCallbacks: null },
				callbacks: null,
			};
		}
		function Rc(t, i) {
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
		function Ua(t) {
			return { lane: t, tag: 0, payload: null, callback: null, next: null };
		}
		function $a(t, i, r) {
			var l = t.updateQueue;
			if (l === null) return null;
			if (((l = l.shared), (Ie & 2) !== 0)) {
				var c = l.pending;
				return (
					c === null ? (i.next = i) : ((i.next = c.next), (c.next = i)),
					(l.pending = i),
					(i = Yl(t)),
					Am(t, null, r),
					i
				);
			}
			return (Pl(t, l, i, r), Yl(t));
		}
		function zu(t, i, r) {
			if (((i = i.updateQueue), i !== null && ((i = i.shared), (r & 4194048) !== 0))) {
				var l = i.lanes;
				((l &= t.pendingLanes), (r |= l), (i.lanes = r), St(t, r));
			}
		}
		function Nc(t, i) {
			var r = t.updateQueue,
				l = t.alternate;
			if (l !== null && ((l = l.updateQueue), r === l)) {
				var c = null,
					d = null;
				if (((r = r.firstBaseUpdate), r !== null)) {
					do {
						var v = { lane: r.lane, tag: r.tag, payload: r.payload, callback: null, next: null };
						(d === null ? (c = d = v) : (d = d.next = v), (r = r.next));
					} while (r !== null);
					d === null ? (c = d = i) : (d = d.next = i);
				} else c = d = i;
				((r = {
					baseState: l.baseState,
					firstBaseUpdate: c,
					lastBaseUpdate: d,
					shared: l.shared,
					callbacks: l.callbacks,
				}),
					(t.updateQueue = r));
				return;
			}
			((t = r.lastBaseUpdate), t === null ? (r.firstBaseUpdate = i) : (t.next = i), (r.lastBaseUpdate = i));
		}
		var Oc = !1;
		function Du() {
			if (Oc) {
				var t = Sr;
				if (t !== null) throw t;
			}
		}
		function ju(t, i, r, l) {
			Oc = !1;
			var c = t.updateQueue;
			Ki = !1;
			var d = c.firstBaseUpdate,
				v = c.lastBaseUpdate,
				w = c.shared.pending;
			if (w !== null) {
				c.shared.pending = null;
				var k = w,
					Z = k.next;
				((k.next = null), v === null ? (d = Z) : (v.next = Z), (v = k));
				var K = t.alternate;
				K !== null &&
					((K = K.updateQueue),
					(w = K.lastBaseUpdate),
					w !== v && (w === null ? (K.firstBaseUpdate = Z) : (w.next = Z), (K.lastBaseUpdate = k)));
			}
			if (d !== null) {
				var ee = c.baseState;
				((v = 0), (K = Z = k = null), (w = d));
				do {
					var H = w.lane & -536870913,
						Q = H !== w.lane;
					if (Q ? (ke & H) === H : (l & H) === H) {
						(H !== 0 && H === _r && (Oc = !0),
							K !== null && (K = K.next = { lane: 0, tag: w.tag, payload: w.payload, callback: null, next: null }));
						e: {
							var fe = t,
								Se = w;
							H = i;
							var Ge = r;
							switch (Se.tag) {
								case 1:
									if (((fe = Se.payload), typeof fe == "function")) {
										ee = fe.call(Ge, ee, H);
										break e;
									}
									ee = fe;
									break e;
								case 3:
									fe.flags = (fe.flags & -65537) | 128;
								case 0:
									if (((fe = Se.payload), (H = typeof fe == "function" ? fe.call(Ge, ee, H) : fe), H == null)) break e;
									ee = b({}, ee, H);
									break e;
								case 2:
									Ki = !0;
							}
						}
						((H = w.callback),
							H !== null &&
								((t.flags |= 64),
								Q && (t.flags |= 8192),
								(Q = c.callbacks),
								Q === null ? (c.callbacks = [H]) : Q.push(H)));
					} else
						((Q = { lane: H, tag: w.tag, payload: w.payload, callback: w.callback, next: null }),
							K === null ? ((Z = K = Q), (k = ee)) : (K = K.next = Q),
							(v |= H));
					if (((w = w.next), w === null)) {
						if (((w = c.shared.pending), w === null)) break;
						((Q = w), (w = Q.next), (Q.next = null), (c.lastBaseUpdate = Q), (c.shared.pending = null));
					}
				} while (!0);
				(K === null && (k = ee),
					(c.baseState = k),
					(c.firstBaseUpdate = Z),
					(c.lastBaseUpdate = K),
					d === null && (c.shared.lanes = 0),
					(ea |= v),
					(t.lanes = v),
					(t.memoizedState = ee));
			}
		}
		function Vm(t, i) {
			if (typeof t != "function") throw Error(s(191, t));
			t.call(i);
		}
		function Qm(t, i) {
			var r = t.callbacks;
			if (r !== null) for (t.callbacks = null, t = 0; t < r.length; t++) Vm(r[t], i);
		}
		var Tr = N(null),
			is = N(0);
		function Pm(t, i) {
			((t = Si), ie(is, t), ie(Tr, i), (Si = t | i.baseLanes));
		}
		function kc() {
			(ie(is, Si), ie(Tr, Tr.current));
		}
		function Mc() {
			((Si = is.current), Y(Tr), Y(is));
		}
		var vn = N(null),
			Mn = null;
		function Xi(t) {
			var i = t.alternate;
			(ie(bt, bt.current & 1),
				ie(vn, t),
				Mn === null && (i === null || Tr.current !== null || i.memoizedState !== null) && (Mn = t));
		}
		function zc(t) {
			(ie(bt, bt.current), ie(vn, t), Mn === null && (Mn = t));
		}
		function Ym(t) {
			t.tag === 22 ? (ie(bt, bt.current), ie(vn, t), Mn === null && (Mn = t)) : Fi(t);
		}
		function Fi() {
			(ie(bt, bt.current), ie(vn, vn.current));
		}
		function gn(t) {
			(Y(vn), Mn === t && (Mn = null), Y(bt));
		}
		var bt = N(0);
		function as(t) {
			for (var i = t; i !== null; ) {
				if (i.tag === 13) {
					var r = i.memoizedState;
					if (r !== null && ((r = r.dehydrated), r === null || $f(r) || Bf(r))) return i;
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
		var hi = 0,
			xe = null,
			Pe = null,
			Tt = null,
			rs = !1,
			xr = !1,
			Ba = !1,
			us = 0,
			Lu = 0,
			Ar = null,
			sS = 0;
		function gt() {
			throw Error(s(321));
		}
		function Dc(t, i) {
			if (i === null) return !1;
			for (var r = 0; r < i.length && r < t.length; r++) if (!hn(t[r], i[r])) return !1;
			return !0;
		}
		function jc(t, i, r, l, c, d) {
			return (
				(hi = d),
				(xe = i),
				(i.memoizedState = null),
				(i.updateQueue = null),
				(i.lanes = 0),
				(U.H = t === null || t.memoizedState === null ? Ov : Xc),
				(Ba = !1),
				(d = r(l, c)),
				(Ba = !1),
				xr && (d = Km(i, r, l, c)),
				Gm(t),
				d
			);
		}
		function Gm(t) {
			U.H = $u;
			var i = Pe !== null && Pe.next !== null;
			if (((hi = 0), (Tt = Pe = xe = null), (rs = !1), (Lu = 0), (Ar = null), i)) throw Error(s(300));
			t === null || xt || ((t = t.dependencies), t !== null && Xl(t) && (xt = !0));
		}
		function Km(t, i, r, l) {
			xe = t;
			var c = 0;
			do {
				if ((xr && (Ar = null), (Lu = 0), (xr = !1), 25 <= c)) throw Error(s(301));
				if (((c += 1), (Tt = Pe = null), t.updateQueue != null)) {
					var d = t.updateQueue;
					((d.lastEffect = null), (d.events = null), (d.stores = null), d.memoCache != null && (d.memoCache.index = 0));
				}
				((U.H = kv), (d = i(r, l)));
			} while (xr);
			return d;
		}
		function oS() {
			var t = U.H,
				i = t.useState()[0];
			return (
				(i = typeof i.then == "function" ? qu(i) : i),
				(t = t.useState()[0]),
				(Pe !== null ? Pe.memoizedState : null) !== t && (xe.flags |= 1024),
				i
			);
		}
		function Lc() {
			var t = us !== 0;
			return ((us = 0), t);
		}
		function qc(t, i, r) {
			((i.updateQueue = t.updateQueue), (i.flags &= -2053), (t.lanes &= ~r));
		}
		function Uc(t) {
			if (rs) {
				for (t = t.memoizedState; t !== null; ) {
					var i = t.queue;
					(i !== null && (i.pending = null), (t = t.next));
				}
				rs = !1;
			}
			((hi = 0), (Tt = Pe = xe = null), (xr = !1), (Lu = us = 0), (Ar = null));
		}
		function Ft() {
			var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
			return (Tt === null ? (xe.memoizedState = Tt = t) : (Tt = Tt.next = t), Tt);
		}
		function _t() {
			if (Pe === null) {
				var t = xe.alternate;
				t = t !== null ? t.memoizedState : null;
			} else t = Pe.next;
			var i = Tt === null ? xe.memoizedState : Tt.next;
			if (i !== null) ((Tt = i), (Pe = t));
			else {
				if (t === null) throw xe.alternate === null ? Error(s(467)) : Error(s(310));
				((Pe = t),
					(t = {
						memoizedState: Pe.memoizedState,
						baseState: Pe.baseState,
						baseQueue: Pe.baseQueue,
						queue: Pe.queue,
						next: null,
					}),
					Tt === null ? (xe.memoizedState = Tt = t) : (Tt = Tt.next = t));
			}
			return Tt;
		}
		function ls() {
			return { lastEffect: null, events: null, stores: null, memoCache: null };
		}
		function qu(t) {
			var i = Lu;
			return (
				(Lu += 1),
				Ar === null && (Ar = []),
				(t = $m(Ar, t, i)),
				(i = xe),
				(Tt === null ? i.memoizedState : Tt.next) === null &&
					((i = i.alternate), (U.H = i === null || i.memoizedState === null ? Ov : Xc)),
				t
			);
		}
		function ss(t) {
			if (t !== null && typeof t == "object") {
				if (typeof t.then == "function") return qu(t);
				if (t.$$typeof === C) return Zt(t);
			}
			throw Error(s(438, String(t)));
		}
		function $c(t) {
			var i = null,
				r = xe.updateQueue;
			if ((r !== null && (i = r.memoCache), i == null)) {
				var l = xe.alternate;
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
				r === null && ((r = ls()), (xe.updateQueue = r)),
				(r.memoCache = i),
				(r = i.data[i.index]),
				r === void 0)
			)
				for (r = i.data[i.index] = Array(t), l = 0; l < t; l++) r[l] = P;
			return (i.index++, r);
		}
		function mi(t, i) {
			return typeof i == "function" ? i(t) : i;
		}
		function os(t) {
			return Bc(_t(), Pe, t);
		}
		function Bc(t, i, r) {
			var l = t.queue;
			if (l === null) throw Error(s(311));
			l.lastRenderedReducer = r;
			var c = t.baseQueue,
				d = l.pending;
			if (d !== null) {
				if (c !== null) {
					var v = c.next;
					((c.next = d.next), (d.next = v));
				}
				((i.baseQueue = c = d), (l.pending = null));
			}
			if (((d = t.baseState), c === null)) t.memoizedState = d;
			else {
				i = c.next;
				var w = (v = null),
					k = null,
					Z = i,
					K = !1;
				do {
					var ee = Z.lane & -536870913;
					if (ee !== Z.lane ? (ke & ee) === ee : (hi & ee) === ee) {
						var H = Z.revertLane;
						if (H === 0)
							(k !== null &&
								(k = k.next =
									{
										lane: 0,
										revertLane: 0,
										gesture: null,
										action: Z.action,
										hasEagerState: Z.hasEagerState,
										eagerState: Z.eagerState,
										next: null,
									}),
								ee === _r && (K = !0));
						else if ((hi & H) === H) {
							((Z = Z.next), H === _r && (K = !0));
							continue;
						} else
							((ee = {
								lane: 0,
								revertLane: Z.revertLane,
								gesture: null,
								action: Z.action,
								hasEagerState: Z.hasEagerState,
								eagerState: Z.eagerState,
								next: null,
							}),
								k === null ? ((w = k = ee), (v = d)) : (k = k.next = ee),
								(xe.lanes |= H),
								(ea |= H));
						((ee = Z.action), Ba && r(d, ee), (d = Z.hasEagerState ? Z.eagerState : r(d, ee)));
					} else
						((H = {
							lane: ee,
							revertLane: Z.revertLane,
							gesture: Z.gesture,
							action: Z.action,
							hasEagerState: Z.hasEagerState,
							eagerState: Z.eagerState,
							next: null,
						}),
							k === null ? ((w = k = H), (v = d)) : (k = k.next = H),
							(xe.lanes |= ee),
							(ea |= ee));
					Z = Z.next;
				} while (Z !== null && Z !== i);
				if ((k === null ? (v = d) : (k.next = w), !hn(d, t.memoizedState) && ((xt = !0), K && ((r = Sr), r !== null))))
					throw r;
				((t.memoizedState = d), (t.baseState = v), (t.baseQueue = k), (l.lastRenderedState = d));
			}
			return (c === null && (l.lanes = 0), [t.memoizedState, l.dispatch]);
		}
		function Ic(t) {
			var i = _t(),
				r = i.queue;
			if (r === null) throw Error(s(311));
			r.lastRenderedReducer = t;
			var l = r.dispatch,
				c = r.pending,
				d = i.memoizedState;
			if (c !== null) {
				r.pending = null;
				var v = (c = c.next);
				do ((d = t(d, v.action)), (v = v.next));
				while (v !== c);
				(hn(d, i.memoizedState) || (xt = !0),
					(i.memoizedState = d),
					i.baseQueue === null && (i.baseState = d),
					(r.lastRenderedState = d));
			}
			return [d, l];
		}
		function Xm(t, i, r) {
			var l = xe,
				c = _t(),
				d = De;
			if (d) {
				if (r === void 0) throw Error(s(407));
				r = r();
			} else r = i();
			var v = !hn((Pe || c).memoizedState, r);
			if (
				(v && ((c.memoizedState = r), (xt = !0)),
				(c = c.queue),
				Vc(Wm.bind(null, l, c, t), [t]),
				c.getSnapshot !== i || v || (Tt !== null && Tt.memoizedState.tag & 1))
			) {
				if (((l.flags |= 2048), Cr(9, { destroy: void 0 }, Jm.bind(null, l, c, r, i), null), Xe === null))
					throw Error(s(349));
				d || (hi & 127) !== 0 || Fm(l, i, r);
			}
			return r;
		}
		function Fm(t, i, r) {
			((t.flags |= 16384),
				(t = { getSnapshot: i, value: r }),
				(i = xe.updateQueue),
				i === null
					? ((i = ls()), (xe.updateQueue = i), (i.stores = [t]))
					: ((r = i.stores), r === null ? (i.stores = [t]) : r.push(t)));
		}
		function Jm(t, i, r, l) {
			((i.value = r), (i.getSnapshot = l), ev(i) && tv(t));
		}
		function Wm(t, i, r) {
			return r(function () {
				ev(i) && tv(t);
			});
		}
		function ev(t) {
			var i = t.getSnapshot;
			t = t.value;
			try {
				var r = i();
				return !hn(t, r);
			} catch {
				return !0;
			}
		}
		function tv(t) {
			var i = Na(t, 2);
			i !== null && sn(i, t, 2);
		}
		function Zc(t) {
			var i = Ft();
			if (typeof t == "function") {
				var r = t;
				if (((t = r()), Ba)) {
					pt(!0);
					try {
						r();
					} finally {
						pt(!1);
					}
				}
			}
			return (
				(i.memoizedState = i.baseState = t),
				(i.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: mi, lastRenderedState: t }),
				i
			);
		}
		function nv(t, i, r, l) {
			return ((t.baseState = r), Bc(t, Pe, typeof l == "function" ? l : mi));
		}
		function cS(t, i, r, l, c) {
			if (ds(t)) throw Error(s(485));
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
					then: function (v) {
						d.listeners.push(v);
					},
				};
				(U.T !== null ? r(!0) : (d.isTransition = !1),
					l(d),
					(r = i.pending),
					r === null ? ((d.next = i.pending = d), iv(i, d)) : ((d.next = r.next), (i.pending = r.next = d)));
			}
		}
		function iv(t, i) {
			var r = i.action,
				l = i.payload,
				c = t.state;
			if (i.isTransition) {
				var d = U.T,
					v = {};
				U.T = v;
				try {
					var w = r(c, l),
						k = U.S;
					(k !== null && k(v, w), av(t, i, w));
				} catch (Z) {
					Hc(t, i, Z);
				} finally {
					(d !== null && v.types !== null && (d.types = v.types), (U.T = d));
				}
			} else
				try {
					((d = r(c, l)), av(t, i, d));
				} catch (Z) {
					Hc(t, i, Z);
				}
		}
		function av(t, i, r) {
			r !== null && typeof r == "object" && typeof r.then == "function"
				? r.then(
						function (l) {
							rv(t, i, l);
						},
						function (l) {
							return Hc(t, i, l);
						},
					)
				: rv(t, i, r);
		}
		function rv(t, i, r) {
			((i.status = "fulfilled"),
				(i.value = r),
				uv(i),
				(t.state = r),
				(i = t.pending),
				i !== null && ((r = i.next), r === i ? (t.pending = null) : ((r = r.next), (i.next = r), iv(t, r))));
		}
		function Hc(t, i, r) {
			var l = t.pending;
			if (((t.pending = null), l !== null)) {
				l = l.next;
				do ((i.status = "rejected"), (i.reason = r), uv(i), (i = i.next));
				while (i !== l);
			}
			t.action = null;
		}
		function uv(t) {
			t = t.listeners;
			for (var i = 0; i < t.length; i++) (0, t[i])();
		}
		function lv(t, i) {
			return i;
		}
		function sv(t, i) {
			if (De) {
				var r = Xe.formState;
				if (r !== null) {
					e: {
						var l = xe;
						if (De) {
							if (tt) {
								t: {
									for (var c = tt, d = kn; c.nodeType !== 8; ) {
										if (!d) {
											c = null;
											break t;
										}
										if (((c = Dn(c.nextSibling)), c === null)) {
											c = null;
											break t;
										}
									}
									((d = c.data), (c = d === "F!" || d === "F" ? c : null));
								}
								if (c) {
									((tt = Dn(c.nextSibling)), (l = c.data === "F!"));
									break e;
								}
							}
							Yi(l);
						}
						l = !1;
					}
					l && (i = r[0]);
				}
			}
			return (
				(r = Ft()),
				(r.memoizedState = r.baseState = i),
				(l = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: lv, lastRenderedState: i }),
				(r.queue = l),
				(r = Cv.bind(null, xe, l)),
				(l.dispatch = r),
				(l = Zc(!1)),
				(d = Kc.bind(null, xe, !1, l.queue)),
				(l = Ft()),
				(c = { state: i, dispatch: null, action: t, pending: null }),
				(l.queue = c),
				(r = cS.bind(null, xe, c, d, r)),
				(c.dispatch = r),
				(l.memoizedState = t),
				[i, r, !1]
			);
		}
		function ov(t) {
			return cv(_t(), Pe, t);
		}
		function cv(t, i, r) {
			if (((i = Bc(t, i, lv)[0]), (t = os(mi)[0]), typeof i == "object" && i !== null && typeof i.then == "function"))
				try {
					var l = qu(i);
				} catch (v) {
					throw v === wr ? Wl : v;
				}
			else l = i;
			i = _t();
			var c = i.queue,
				d = c.dispatch;
			return (
				r !== i.memoizedState && ((xe.flags |= 2048), Cr(9, { destroy: void 0 }, fS.bind(null, c, r), null)),
				[l, d, t]
			);
		}
		function fS(t, i) {
			t.action = i;
		}
		function fv(t) {
			var i = _t(),
				r = Pe;
			if (r !== null) return cv(i, r, t);
			(_t(), (i = i.memoizedState), (r = _t()));
			var l = r.queue.dispatch;
			return ((r.memoizedState = t), [i, l, !1]);
		}
		function Cr(t, i, r, l) {
			return (
				(t = { tag: t, create: r, deps: l, inst: i, next: null }),
				(i = xe.updateQueue),
				i === null && ((i = ls()), (xe.updateQueue = i)),
				(r = i.lastEffect),
				r === null ? (i.lastEffect = t.next = t) : ((l = r.next), (r.next = t), (t.next = l), (i.lastEffect = t)),
				t
			);
		}
		function dv() {
			return _t().memoizedState;
		}
		function cs(t, i, r, l) {
			var c = Ft();
			((xe.flags |= t), (c.memoizedState = Cr(1 | i, { destroy: void 0 }, r, l === void 0 ? null : l)));
		}
		function fs(t, i, r, l) {
			var c = _t();
			l = l === void 0 ? null : l;
			var d = c.memoizedState.inst;
			Pe !== null && l !== null && Dc(l, Pe.memoizedState.deps)
				? (c.memoizedState = Cr(i, d, r, l))
				: ((xe.flags |= t), (c.memoizedState = Cr(1 | i, d, r, l)));
		}
		function hv(t, i) {
			cs(8390656, 8, t, i);
		}
		function Vc(t, i) {
			fs(2048, 8, t, i);
		}
		function dS(t) {
			xe.flags |= 4;
			var i = xe.updateQueue;
			if (i === null) ((i = ls()), (xe.updateQueue = i), (i.events = [t]));
			else {
				var r = i.events;
				r === null ? (i.events = [t]) : r.push(t);
			}
		}
		function mv(t) {
			var i = _t().memoizedState;
			return (
				dS({ ref: i, nextImpl: t }),
				function () {
					if ((Ie & 2) !== 0) throw Error(s(440));
					return i.impl.apply(void 0, arguments);
				}
			);
		}
		function vv(t, i) {
			return fs(4, 2, t, i);
		}
		function gv(t, i) {
			return fs(4, 4, t, i);
		}
		function yv(t, i) {
			if (typeof i == "function") {
				t = t();
				var r = i(t);
				return function () {
					typeof r == "function" ? r() : i(null);
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
		function pv(t, i, r) {
			((r = r != null ? r.concat([t]) : null), fs(4, 4, yv.bind(null, i, t), r));
		}
		function Qc() {}
		function bv(t, i) {
			var r = _t();
			i = i === void 0 ? null : i;
			var l = r.memoizedState;
			return i !== null && Dc(i, l[1]) ? l[0] : ((r.memoizedState = [t, i]), t);
		}
		function _v(t, i) {
			var r = _t();
			i = i === void 0 ? null : i;
			var l = r.memoizedState;
			if (i !== null && Dc(i, l[1])) return l[0];
			if (((l = t()), Ba)) {
				pt(!0);
				try {
					t();
				} finally {
					pt(!1);
				}
			}
			return ((r.memoizedState = [l, i]), l);
		}
		function Pc(t, i, r) {
			return r === void 0 || ((hi & 1073741824) !== 0 && (ke & 261930) === 0)
				? (t.memoizedState = i)
				: ((t.memoizedState = r), (t = pg()), (xe.lanes |= t), (ea |= t), r);
		}
		function Sv(t, i, r, l) {
			return hn(r, i)
				? r
				: Tr.current !== null
					? ((t = Pc(t, r, l)), hn(t, i) || (xt = !0), t)
					: (hi & 42) === 0 || ((hi & 1073741824) !== 0 && (ke & 261930) === 0)
						? ((xt = !0), (t.memoizedState = r))
						: ((t = pg()), (xe.lanes |= t), (ea |= t), i);
		}
		function wv(t, i, r, l, c) {
			var d = V.p;
			V.p = d !== 0 && 8 > d ? d : 8;
			var v = U.T,
				w = {};
			((U.T = w), Kc(t, !1, i, r));
			try {
				var k = c(),
					Z = U.S;
				(Z !== null && Z(w, k),
					k !== null && typeof k == "object" && typeof k.then == "function"
						? Uu(t, i, lS(k, l), zn(t))
						: Uu(t, i, l, zn(t)));
			} catch (K) {
				Uu(t, i, { then: function () {}, status: "rejected", reason: K }, zn());
			} finally {
				((V.p = d), v !== null && w.types !== null && (v.types = w.types), (U.T = v));
			}
		}
		function hS() {}
		function Yc(t, i, r, l) {
			if (t.tag !== 5) throw Error(s(476));
			var c = Ev(t).queue;
			wv(
				t,
				c,
				i,
				re,
				r === null
					? hS
					: function () {
							return (Tv(t), r(l));
						},
			);
		}
		function Ev(t) {
			var i = t.memoizedState;
			if (i !== null) return i;
			i = {
				memoizedState: re,
				baseState: re,
				baseQueue: null,
				queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: mi, lastRenderedState: re },
				next: null,
			};
			var r = {};
			return (
				(i.next = {
					memoizedState: r,
					baseState: r,
					baseQueue: null,
					queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: mi, lastRenderedState: r },
					next: null,
				}),
				(t.memoizedState = i),
				(t = t.alternate),
				t !== null && (t.memoizedState = i),
				i
			);
		}
		function Tv(t) {
			var i = Ev(t);
			(i.next === null && (i = t.alternate.memoizedState), Uu(t, i.next.queue, {}, zn()));
		}
		function Gc() {
			return Zt(tl);
		}
		function xv() {
			return _t().memoizedState;
		}
		function Av() {
			return _t().memoizedState;
		}
		function mS(t) {
			for (var i = t.return; i !== null; ) {
				switch (i.tag) {
					case 24:
					case 3:
						var r = zn();
						t = Ua(r);
						var l = $a(i, t, r);
						(l !== null && (sn(l, i, r), zu(l, i, r)), (i = { cache: Ec() }), (t.payload = i));
						return;
				}
				i = i.return;
			}
		}
		function vS(t, i, r) {
			var l = zn();
			((r = { lane: l, revertLane: 0, gesture: null, action: r, hasEagerState: !1, eagerState: null, next: null }),
				ds(t) ? Rv(i, r) : ((r = dc(t, i, r, l)), r !== null && (sn(r, t, l), Nv(r, i, l))));
		}
		function Cv(t, i, r) {
			Uu(t, i, r, zn());
		}
		function Uu(t, i, r, l) {
			var c = { lane: l, revertLane: 0, gesture: null, action: r, hasEagerState: !1, eagerState: null, next: null };
			if (ds(t)) Rv(i, c);
			else {
				var d = t.alternate;
				if (t.lanes === 0 && (d === null || d.lanes === 0) && ((d = i.lastRenderedReducer), d !== null))
					try {
						var v = i.lastRenderedState,
							w = d(v, r);
						if (((c.hasEagerState = !0), (c.eagerState = w), hn(w, v)))
							return (Pl(t, i, c, 0), Xe === null && Ql(), !1);
					} catch {}
				if (((r = dc(t, i, c, l)), r !== null)) return (sn(r, t, l), Nv(r, i, l), !0);
			}
			return !1;
		}
		function Kc(t, i, r, l) {
			if (
				((l = { lane: 2, revertLane: Rf(), gesture: null, action: l, hasEagerState: !1, eagerState: null, next: null }),
				ds(t))
			) {
				if (i) throw Error(s(479));
			} else ((i = dc(t, r, l, 2)), i !== null && sn(i, t, 2));
		}
		function ds(t) {
			var i = t.alternate;
			return t === xe || (i !== null && i === xe);
		}
		function Rv(t, i) {
			xr = rs = !0;
			var r = t.pending;
			(r === null ? (i.next = i) : ((i.next = r.next), (r.next = i)), (t.pending = i));
		}
		function Nv(t, i, r) {
			if ((r & 4194048) !== 0) {
				var l = i.lanes;
				((l &= t.pendingLanes), (r |= l), (i.lanes = r), St(t, r));
			}
		}
		var $u = {
			readContext: Zt,
			use: ss,
			useCallback: gt,
			useContext: gt,
			useEffect: gt,
			useImperativeHandle: gt,
			useLayoutEffect: gt,
			useInsertionEffect: gt,
			useMemo: gt,
			useReducer: gt,
			useRef: gt,
			useState: gt,
			useDebugValue: gt,
			useDeferredValue: gt,
			useTransition: gt,
			useSyncExternalStore: gt,
			useId: gt,
			useHostTransitionStatus: gt,
			useFormState: gt,
			useActionState: gt,
			useOptimistic: gt,
			useMemoCache: gt,
			useCacheRefresh: gt,
		};
		$u.useEffectEvent = gt;
		var Ov = {
				readContext: Zt,
				use: ss,
				useCallback: function (t, i) {
					return ((Ft().memoizedState = [t, i === void 0 ? null : i]), t);
				},
				useContext: Zt,
				useEffect: hv,
				useImperativeHandle: function (t, i, r) {
					((r = r != null ? r.concat([t]) : null), cs(4194308, 4, yv.bind(null, i, t), r));
				},
				useLayoutEffect: function (t, i) {
					return cs(4194308, 4, t, i);
				},
				useInsertionEffect: function (t, i) {
					cs(4, 2, t, i);
				},
				useMemo: function (t, i) {
					var r = Ft();
					i = i === void 0 ? null : i;
					var l = t();
					if (Ba) {
						pt(!0);
						try {
							t();
						} finally {
							pt(!1);
						}
					}
					return ((r.memoizedState = [l, i]), l);
				},
				useReducer: function (t, i, r) {
					var l = Ft();
					if (r !== void 0) {
						var c = r(i);
						if (Ba) {
							pt(!0);
							try {
								r(i);
							} finally {
								pt(!1);
							}
						}
					} else c = i;
					return (
						(l.memoizedState = l.baseState = c),
						(t = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: c }),
						(l.queue = t),
						(t = t.dispatch = vS.bind(null, xe, t)),
						[l.memoizedState, t]
					);
				},
				useRef: function (t) {
					var i = Ft();
					return ((t = { current: t }), (i.memoizedState = t));
				},
				useState: function (t) {
					t = Zc(t);
					var i = t.queue,
						r = Cv.bind(null, xe, i);
					return ((i.dispatch = r), [t.memoizedState, r]);
				},
				useDebugValue: Qc,
				useDeferredValue: function (t, i) {
					return Pc(Ft(), t, i);
				},
				useTransition: function () {
					var t = Zc(!1);
					return ((t = wv.bind(null, xe, t.queue, !0, !1)), (Ft().memoizedState = t), [!1, t]);
				},
				useSyncExternalStore: function (t, i, r) {
					var l = xe,
						c = Ft();
					if (De) {
						if (r === void 0) throw Error(s(407));
						r = r();
					} else {
						if (((r = i()), Xe === null)) throw Error(s(349));
						(ke & 127) !== 0 || Fm(l, i, r);
					}
					c.memoizedState = r;
					var d = { value: r, getSnapshot: i };
					return (
						(c.queue = d),
						hv(Wm.bind(null, l, d, t), [t]),
						(l.flags |= 2048),
						Cr(9, { destroy: void 0 }, Jm.bind(null, l, d, r, i), null),
						r
					);
				},
				useId: function () {
					var t = Ft(),
						i = Xe.identifierPrefix;
					if (De) {
						var r = Xn,
							l = Kn;
						((r = (l & ~(1 << (32 - qe(l) - 1))).toString(32) + r),
							(i = "_" + i + "R_" + r),
							(r = us++),
							0 < r && (i += "H" + r.toString(32)),
							(i += "_"));
					} else ((r = sS++), (i = "_" + i + "r_" + r.toString(32) + "_"));
					return (t.memoizedState = i);
				},
				useHostTransitionStatus: Gc,
				useFormState: sv,
				useActionState: sv,
				useOptimistic: function (t) {
					var i = Ft();
					i.memoizedState = i.baseState = t;
					var r = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
					return ((i.queue = r), (i = Kc.bind(null, xe, !0, r)), (r.dispatch = i), [t, i]);
				},
				useMemoCache: $c,
				useCacheRefresh: function () {
					return (Ft().memoizedState = mS.bind(null, xe));
				},
				useEffectEvent: function (t) {
					var i = Ft(),
						r = { impl: t };
					return (
						(i.memoizedState = r),
						function () {
							if ((Ie & 2) !== 0) throw Error(s(440));
							return r.impl.apply(void 0, arguments);
						}
					);
				},
			},
			Xc = {
				readContext: Zt,
				use: ss,
				useCallback: bv,
				useContext: Zt,
				useEffect: Vc,
				useImperativeHandle: pv,
				useInsertionEffect: vv,
				useLayoutEffect: gv,
				useMemo: _v,
				useReducer: os,
				useRef: dv,
				useState: function () {
					return os(mi);
				},
				useDebugValue: Qc,
				useDeferredValue: function (t, i) {
					return Sv(_t(), Pe.memoizedState, t, i);
				},
				useTransition: function () {
					var t = os(mi)[0],
						i = _t().memoizedState;
					return [typeof t == "boolean" ? t : qu(t), i];
				},
				useSyncExternalStore: Xm,
				useId: xv,
				useHostTransitionStatus: Gc,
				useFormState: ov,
				useActionState: ov,
				useOptimistic: function (t, i) {
					return nv(_t(), Pe, t, i);
				},
				useMemoCache: $c,
				useCacheRefresh: Av,
			};
		Xc.useEffectEvent = mv;
		var kv = {
			readContext: Zt,
			use: ss,
			useCallback: bv,
			useContext: Zt,
			useEffect: Vc,
			useImperativeHandle: pv,
			useInsertionEffect: vv,
			useLayoutEffect: gv,
			useMemo: _v,
			useReducer: Ic,
			useRef: dv,
			useState: function () {
				return Ic(mi);
			},
			useDebugValue: Qc,
			useDeferredValue: function (t, i) {
				var r = _t();
				return Pe === null ? Pc(r, t, i) : Sv(r, Pe.memoizedState, t, i);
			},
			useTransition: function () {
				var t = Ic(mi)[0],
					i = _t().memoizedState;
				return [typeof t == "boolean" ? t : qu(t), i];
			},
			useSyncExternalStore: Xm,
			useId: xv,
			useHostTransitionStatus: Gc,
			useFormState: fv,
			useActionState: fv,
			useOptimistic: function (t, i) {
				var r = _t();
				return Pe !== null ? nv(r, Pe, t, i) : ((r.baseState = t), [t, r.queue.dispatch]);
			},
			useMemoCache: $c,
			useCacheRefresh: Av,
		};
		kv.useEffectEvent = mv;
		function Fc(t, i, r, l) {
			((i = t.memoizedState),
				(r = r(l, i)),
				(r = r == null ? i : b({}, i, r)),
				(t.memoizedState = r),
				t.lanes === 0 && (t.updateQueue.baseState = r));
		}
		var Jc = {
			enqueueSetState: function (t, i, r) {
				t = t._reactInternals;
				var l = zn(),
					c = Ua(l);
				((c.payload = i), r != null && (c.callback = r), (i = $a(t, c, l)), i !== null && (sn(i, t, l), zu(i, t, l)));
			},
			enqueueReplaceState: function (t, i, r) {
				t = t._reactInternals;
				var l = zn(),
					c = Ua(l);
				((c.tag = 1),
					(c.payload = i),
					r != null && (c.callback = r),
					(i = $a(t, c, l)),
					i !== null && (sn(i, t, l), zu(i, t, l)));
			},
			enqueueForceUpdate: function (t, i) {
				t = t._reactInternals;
				var r = zn(),
					l = Ua(r);
				((l.tag = 2), i != null && (l.callback = i), (i = $a(t, l, r)), i !== null && (sn(i, t, r), zu(i, t, r)));
			},
		};
		function Mv(t, i, r, l, c, d, v) {
			return (
				(t = t.stateNode),
				typeof t.shouldComponentUpdate == "function"
					? t.shouldComponentUpdate(l, d, v)
					: i.prototype && i.prototype.isPureReactComponent
						? !xu(r, l) || !xu(c, d)
						: !0
			);
		}
		function zv(t, i, r, l) {
			((t = i.state),
				typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(r, l),
				typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(r, l),
				i.state !== t && Jc.enqueueReplaceState(i, i.state, null));
		}
		function Ia(t, i) {
			var r = i;
			if ("ref" in i) {
				r = {};
				for (var l in i) l !== "ref" && (r[l] = i[l]);
			}
			if ((t = t.defaultProps)) {
				r === i && (r = b({}, r));
				for (var c in t) r[c] === void 0 && (r[c] = t[c]);
			}
			return r;
		}
		function gS(t) {
			Vl(t);
		}
		function yS(t) {
			console.error(t);
		}
		function pS(t) {
			Vl(t);
		}
		function hs(t, i) {
			try {
				var r = t.onUncaughtError;
				r(i.value, { componentStack: i.stack });
			} catch (l) {
				setTimeout(function () {
					throw l;
				});
			}
		}
		function Dv(t, i, r) {
			try {
				var l = t.onCaughtError;
				l(r.value, { componentStack: r.stack, errorBoundary: i.tag === 1 ? i.stateNode : null });
			} catch (c) {
				setTimeout(function () {
					throw c;
				});
			}
		}
		function Wc(t, i, r) {
			return (
				(r = Ua(r)),
				(r.tag = 3),
				(r.payload = { element: null }),
				(r.callback = function () {
					hs(t, i);
				}),
				r
			);
		}
		function jv(t) {
			return ((t = Ua(t)), (t.tag = 3), t);
		}
		function Lv(t, i, r, l) {
			var c = r.type.getDerivedStateFromError;
			if (typeof c == "function") {
				var d = l.value;
				((t.payload = function () {
					return c(d);
				}),
					(t.callback = function () {
						Dv(i, r, l);
					}));
			}
			var v = r.stateNode;
			v !== null &&
				typeof v.componentDidCatch == "function" &&
				(t.callback = function () {
					(Dv(i, r, l), typeof c != "function" && (ta === null ? (ta = new Set([this])) : ta.add(this)));
					var w = l.stack;
					this.componentDidCatch(l.value, { componentStack: w !== null ? w : "" });
				});
		}
		function bS(t, i, r, l, c) {
			if (((r.flags |= 32768), l !== null && typeof l == "object" && typeof l.then == "function")) {
				if (((i = r.alternate), i !== null && br(i, r, c, !0), (r = vn.current), r !== null)) {
					switch (r.tag) {
						case 31:
						case 13:
							return (
								Mn === null ? xs() : r.alternate === null && yt === 0 && (yt = 3),
								(r.flags &= -257),
								(r.flags |= 65536),
								(r.lanes = c),
								l === es
									? (r.flags |= 16384)
									: ((i = r.updateQueue), i === null ? (r.updateQueue = new Set([l])) : i.add(l), xf(t, l, c)),
								!1
							);
						case 22:
							return (
								(r.flags |= 65536),
								l === es
									? (r.flags |= 16384)
									: ((i = r.updateQueue),
										i === null
											? ((i = { transitions: null, markerInstances: null, retryQueue: new Set([l]) }),
												(r.updateQueue = i))
											: ((r = i.retryQueue), r === null ? (i.retryQueue = new Set([l])) : r.add(l)),
										xf(t, l, c)),
								!1
							);
					}
					throw Error(s(435, r.tag));
				}
				return (xf(t, l, c), xs(), !1);
			}
			if (De)
				return (
					(i = vn.current),
					i !== null
						? ((i.flags & 65536) === 0 && (i.flags |= 256),
							(i.flags |= 65536),
							(i.lanes = c),
							l !== pc && ((t = Error(s(422), { cause: l })), Ru(Rn(t, r))))
						: (l !== pc && ((i = Error(s(423), { cause: l })), Ru(Rn(i, r))),
							(t = t.current.alternate),
							(t.flags |= 65536),
							(c &= -c),
							(t.lanes |= c),
							(l = Rn(l, r)),
							(c = Wc(t.stateNode, l, c)),
							Nc(t, c),
							yt !== 4 && (yt = 2)),
					!1
				);
			var d = Error(s(520), { cause: l });
			if (((d = Rn(d, r)), Yu === null ? (Yu = [d]) : Yu.push(d), yt !== 4 && (yt = 2), i === null)) return !0;
			((l = Rn(l, r)), (r = i));
			do {
				switch (r.tag) {
					case 3:
						return ((r.flags |= 65536), (t = c & -c), (r.lanes |= t), (t = Wc(r.stateNode, l, t)), Nc(r, t), !1);
					case 1:
						if (
							((i = r.type),
							(d = r.stateNode),
							(r.flags & 128) === 0 &&
								(typeof i.getDerivedStateFromError == "function" ||
									(d !== null && typeof d.componentDidCatch == "function" && (ta === null || !ta.has(d)))))
						)
							return ((r.flags |= 65536), (c &= -c), (r.lanes |= c), (c = jv(c)), Lv(c, t, r, l), Nc(r, c), !1);
				}
				r = r.return;
			} while (r !== null);
			return !1;
		}
		var ef = Error(s(461)),
			xt = !1;
		function Ht(t, i, r, l) {
			i.child = t === null ? Hm(i, null, r, l) : qa(i, t.child, r, l);
		}
		function qv(t, i, r, l, c) {
			r = r.render;
			var d = i.ref;
			if ("ref" in l) {
				var v = {};
				for (var w in l) w !== "ref" && (v[w] = l[w]);
			} else v = l;
			return (
				za(i),
				(l = jc(t, i, r, v, d, c)),
				(w = Lc()),
				t !== null && !xt ? (qc(t, i, c), vi(t, i, c)) : (De && w && gc(i), (i.flags |= 1), Ht(t, i, l, c), i.child)
			);
		}
		function Uv(t, i, r, l, c) {
			if (t === null) {
				var d = r.type;
				return typeof d == "function" && !hc(d) && d.defaultProps === void 0 && r.compare === null
					? ((i.tag = 15), (i.type = d), $v(t, i, d, l, c))
					: ((t = Gl(r.type, null, l, i, i.mode, c)), (t.ref = i.ref), (t.return = i), (i.child = t));
			}
			if (((d = t.child), !of(t, c))) {
				var v = d.memoizedProps;
				if (((r = r.compare), (r = r !== null ? r : xu), r(v, l) && t.ref === i.ref)) return vi(t, i, c);
			}
			return ((i.flags |= 1), (t = oi(d, l)), (t.ref = i.ref), (t.return = i), (i.child = t));
		}
		function $v(t, i, r, l, c) {
			if (t !== null) {
				var d = t.memoizedProps;
				if (xu(d, l) && t.ref === i.ref)
					if (((xt = !1), (i.pendingProps = l = d), of(t, c))) (t.flags & 131072) !== 0 && (xt = !0);
					else return ((i.lanes = t.lanes), vi(t, i, c));
			}
			return tf(t, i, r, l, c);
		}
		function Bv(t, i, r, l) {
			var c = l.children,
				d = t !== null ? t.memoizedState : null;
			if (
				(t === null &&
					i.stateNode === null &&
					(i.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				l.mode === "hidden")
			) {
				if ((i.flags & 128) !== 0) {
					if (((d = d !== null ? d.baseLanes | r : r), t !== null)) {
						for (l = i.child = t.child, c = 0; l !== null; ) ((c = c | l.lanes | l.childLanes), (l = l.sibling));
						l = c & ~d;
					} else ((l = 0), (i.child = null));
					return Iv(t, i, d, r, l);
				}
				if ((r & 536870912) !== 0)
					((i.memoizedState = { baseLanes: 0, cachePool: null }),
						t !== null && Jl(i, d !== null ? d.cachePool : null),
						d !== null ? Pm(i, d) : kc(),
						Ym(i));
				else return ((l = i.lanes = 536870912), Iv(t, i, d !== null ? d.baseLanes | r : r, r, l));
			} else
				d !== null
					? (Jl(i, d.cachePool), Pm(i, d), Fi(i), (i.memoizedState = null))
					: (t !== null && Jl(i, null), kc(), Fi(i));
			return (Ht(t, i, c, r), i.child);
		}
		function Bu(t, i) {
			return (
				(t !== null && t.tag === 22) ||
					i.stateNode !== null ||
					(i.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				i.sibling
			);
		}
		function Iv(t, i, r, l, c) {
			var d = xc();
			return (
				(d = d === null ? null : { parent: Et._currentValue, pool: d }),
				(i.memoizedState = { baseLanes: r, cachePool: d }),
				t !== null && Jl(i, null),
				kc(),
				Ym(i),
				t !== null && br(t, i, l, !0),
				(i.childLanes = c),
				null
			);
		}
		function ms(t, i) {
			return (
				(i = gs({ mode: i.mode, children: i.children }, t.mode)),
				(i.ref = t.ref),
				(t.child = i),
				(i.return = t),
				i
			);
		}
		function Zv(t, i, r) {
			return (qa(i, t.child, null, r), (t = ms(i, i.pendingProps)), (t.flags |= 2), gn(i), (i.memoizedState = null), t);
		}
		function _S(t, i, r) {
			var l = i.pendingProps,
				c = (i.flags & 128) !== 0;
			if (((i.flags &= -129), t === null)) {
				if (De) {
					if (l.mode === "hidden") return ((t = ms(i, l)), (i.lanes = 536870912), Bu(null, t));
					if (
						(zc(i),
						(t = tt)
							? ((t = ty(t, kn)),
								(t = t !== null && t.data === "&" ? t : null),
								t !== null &&
									((i.memoizedState = {
										dehydrated: t,
										treeContext: Qi !== null ? { id: Kn, overflow: Xn } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(r = Rm(t)),
									(r.return = i),
									(i.child = r),
									(It = i),
									(tt = null)))
							: (t = null),
						t === null)
					)
						throw Yi(i);
					return ((i.lanes = 536870912), null);
				}
				return ms(i, l);
			}
			var d = t.memoizedState;
			if (d !== null) {
				var v = d.dehydrated;
				if ((zc(i), c))
					if (i.flags & 256) ((i.flags &= -257), (i = Zv(t, i, r)));
					else if (i.memoizedState !== null) ((i.child = t.child), (i.flags |= 128), (i = null));
					else throw Error(s(558));
				else if ((xt || br(t, i, r, !1), (c = (r & t.childLanes) !== 0), xt || c)) {
					if (((l = Xe), l !== null && ((v = Zi(l, r)), v !== 0 && v !== d.retryLane)))
						throw ((d.retryLane = v), Na(t, v), sn(l, t, v), ef);
					(xs(), (i = Zv(t, i, r)));
				} else
					((t = d.treeContext),
						(tt = Dn(v.nextSibling)),
						(It = i),
						(De = !0),
						(Pi = null),
						(kn = !1),
						t !== null && km(i, t),
						(i = ms(i, l)),
						(i.flags |= 4096));
				return i;
			}
			return (
				(t = oi(t.child, { mode: l.mode, children: l.children })),
				(t.ref = i.ref),
				(i.child = t),
				(t.return = i),
				t
			);
		}
		function vs(t, i) {
			var r = i.ref;
			if (r === null) t !== null && t.ref !== null && (i.flags |= 4194816);
			else {
				if (typeof r != "function" && typeof r != "object") throw Error(s(284));
				(t === null || t.ref !== r) && (i.flags |= 4194816);
			}
		}
		function tf(t, i, r, l, c) {
			return (
				za(i),
				(r = jc(t, i, r, l, void 0, c)),
				(l = Lc()),
				t !== null && !xt ? (qc(t, i, c), vi(t, i, c)) : (De && l && gc(i), (i.flags |= 1), Ht(t, i, r, c), i.child)
			);
		}
		function Hv(t, i, r, l, c, d) {
			return (
				za(i),
				(i.updateQueue = null),
				(r = Km(i, l, r, c)),
				Gm(t),
				(l = Lc()),
				t !== null && !xt ? (qc(t, i, d), vi(t, i, d)) : (De && l && gc(i), (i.flags |= 1), Ht(t, i, r, d), i.child)
			);
		}
		function Vv(t, i, r, l, c) {
			if ((za(i), i.stateNode === null)) {
				var d = vr,
					v = r.contextType;
				(typeof v == "object" && v !== null && (d = Zt(v)),
					(d = new r(l, d)),
					(i.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null),
					(d.updater = Jc),
					(i.stateNode = d),
					(d._reactInternals = i),
					(d = i.stateNode),
					(d.props = l),
					(d.state = i.memoizedState),
					(d.refs = {}),
					Cc(i),
					(v = r.contextType),
					(d.context = typeof v == "object" && v !== null ? Zt(v) : vr),
					(d.state = i.memoizedState),
					(v = r.getDerivedStateFromProps),
					typeof v == "function" && (Fc(i, r, v, l), (d.state = i.memoizedState)),
					typeof r.getDerivedStateFromProps == "function" ||
						typeof d.getSnapshotBeforeUpdate == "function" ||
						(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
						((v = d.state),
						typeof d.componentWillMount == "function" && d.componentWillMount(),
						typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(),
						v !== d.state && Jc.enqueueReplaceState(d, d.state, null),
						ju(i, l, d, c),
						Du(),
						(d.state = i.memoizedState)),
					typeof d.componentDidMount == "function" && (i.flags |= 4194308),
					(l = !0));
			} else if (t === null) {
				d = i.stateNode;
				var w = i.memoizedProps,
					k = Ia(r, w);
				d.props = k;
				var Z = d.context,
					K = r.contextType;
				((v = vr), typeof K == "object" && K !== null && (v = Zt(K)));
				var ee = r.getDerivedStateFromProps;
				((K = typeof ee == "function" || typeof d.getSnapshotBeforeUpdate == "function"),
					(w = i.pendingProps !== w),
					K ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((w || Z !== v) && zv(i, d, l, v)),
					(Ki = !1));
				var H = i.memoizedState;
				((d.state = H),
					ju(i, l, d, c),
					Du(),
					(Z = i.memoizedState),
					w || H !== Z || Ki
						? (typeof ee == "function" && (Fc(i, r, ee, l), (Z = i.memoizedState)),
							(k = Ki || Mv(i, r, k, l, H, Z, v))
								? (K ||
										(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
										(typeof d.componentWillMount == "function" && d.componentWillMount(),
										typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()),
									typeof d.componentDidMount == "function" && (i.flags |= 4194308))
								: (typeof d.componentDidMount == "function" && (i.flags |= 4194308),
									(i.memoizedProps = l),
									(i.memoizedState = Z)),
							(d.props = l),
							(d.state = Z),
							(d.context = v),
							(l = k))
						: (typeof d.componentDidMount == "function" && (i.flags |= 4194308), (l = !1)));
			} else {
				((d = i.stateNode),
					Rc(t, i),
					(v = i.memoizedProps),
					(K = Ia(r, v)),
					(d.props = K),
					(ee = i.pendingProps),
					(H = d.context),
					(Z = r.contextType),
					(k = vr),
					typeof Z == "object" && Z !== null && (k = Zt(Z)),
					(w = r.getDerivedStateFromProps),
					(Z = typeof w == "function" || typeof d.getSnapshotBeforeUpdate == "function") ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((v !== ee || H !== k) && zv(i, d, l, k)),
					(Ki = !1),
					(H = i.memoizedState),
					(d.state = H),
					ju(i, l, d, c),
					Du());
				var Q = i.memoizedState;
				v !== ee || H !== Q || Ki || (t !== null && t.dependencies !== null && Xl(t.dependencies))
					? (typeof w == "function" && (Fc(i, r, w, l), (Q = i.memoizedState)),
						(K = Ki || Mv(i, r, K, l, H, Q, k) || (t !== null && t.dependencies !== null && Xl(t.dependencies)))
							? (Z ||
									(typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function") ||
									(typeof d.componentWillUpdate == "function" && d.componentWillUpdate(l, Q, k),
									typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(l, Q, k)),
								typeof d.componentDidUpdate == "function" && (i.flags |= 4),
								typeof d.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024))
							: (typeof d.componentDidUpdate != "function" ||
									(v === t.memoizedProps && H === t.memoizedState) ||
									(i.flags |= 4),
								typeof d.getSnapshotBeforeUpdate != "function" ||
									(v === t.memoizedProps && H === t.memoizedState) ||
									(i.flags |= 1024),
								(i.memoizedProps = l),
								(i.memoizedState = Q)),
						(d.props = l),
						(d.state = Q),
						(d.context = k),
						(l = K))
					: (typeof d.componentDidUpdate != "function" ||
							(v === t.memoizedProps && H === t.memoizedState) ||
							(i.flags |= 4),
						typeof d.getSnapshotBeforeUpdate != "function" ||
							(v === t.memoizedProps && H === t.memoizedState) ||
							(i.flags |= 1024),
						(l = !1));
			}
			return (
				(d = l),
				vs(t, i),
				(l = (i.flags & 128) !== 0),
				d || l
					? ((d = i.stateNode),
						(r = l && typeof r.getDerivedStateFromError != "function" ? null : d.render()),
						(i.flags |= 1),
						t !== null && l ? ((i.child = qa(i, t.child, null, c)), (i.child = qa(i, null, r, c))) : Ht(t, i, r, c),
						(i.memoizedState = d.state),
						(t = i.child))
					: (t = vi(t, i, c)),
				t
			);
		}
		function Qv(t, i, r, l) {
			return (ka(), (i.flags |= 256), Ht(t, i, r, l), i.child);
		}
		var nf = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
		function af(t) {
			return { baseLanes: t, cachePool: qm() };
		}
		function rf(t, i, r) {
			return ((t = t !== null ? t.childLanes & ~r : 0), i && (t |= pn), t);
		}
		function Pv(t, i, r) {
			var l = i.pendingProps,
				c = !1,
				d = (i.flags & 128) !== 0,
				v;
			if (
				((v = d) || (v = t !== null && t.memoizedState === null ? !1 : (bt.current & 2) !== 0),
				v && ((c = !0), (i.flags &= -129)),
				(v = (i.flags & 32) !== 0),
				(i.flags &= -33),
				t === null)
			) {
				if (De) {
					if (
						(c ? Xi(i) : Fi(i),
						(t = tt)
							? ((t = ty(t, kn)),
								(t = t !== null && t.data !== "&" ? t : null),
								t !== null &&
									((i.memoizedState = {
										dehydrated: t,
										treeContext: Qi !== null ? { id: Kn, overflow: Xn } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(r = Rm(t)),
									(r.return = i),
									(i.child = r),
									(It = i),
									(tt = null)))
							: (t = null),
						t === null)
					)
						throw Yi(i);
					return (Bf(t) ? (i.lanes = 32) : (i.lanes = 536870912), null);
				}
				var w = l.children;
				return (
					(l = l.fallback),
					c
						? (Fi(i),
							(c = i.mode),
							(w = gs({ mode: "hidden", children: w }, c)),
							(l = Oa(l, c, r, null)),
							(w.return = i),
							(l.return = i),
							(w.sibling = l),
							(i.child = w),
							(l = i.child),
							(l.memoizedState = af(r)),
							(l.childLanes = rf(t, v, r)),
							(i.memoizedState = nf),
							Bu(null, l))
						: (Xi(i), uf(i, w))
				);
			}
			var k = t.memoizedState;
			if (k !== null && ((w = k.dehydrated), w !== null)) {
				if (d)
					i.flags & 256
						? (Xi(i), (i.flags &= -257), (i = lf(t, i, r)))
						: i.memoizedState !== null
							? (Fi(i), (i.child = t.child), (i.flags |= 128), (i = null))
							: (Fi(i),
								(w = l.fallback),
								(c = i.mode),
								(l = gs({ mode: "visible", children: l.children }, c)),
								(w = Oa(w, c, r, null)),
								(w.flags |= 2),
								(l.return = i),
								(w.return = i),
								(l.sibling = w),
								(i.child = l),
								qa(i, t.child, null, r),
								(l = i.child),
								(l.memoizedState = af(r)),
								(l.childLanes = rf(t, v, r)),
								(i.memoizedState = nf),
								(i = Bu(null, l)));
				else if ((Xi(i), Bf(w))) {
					if (((v = w.nextSibling && w.nextSibling.dataset), v)) var Z = v.dgst;
					((v = Z),
						(l = Error(s(419))),
						(l.stack = ""),
						(l.digest = v),
						Ru({ value: l, source: null, stack: null }),
						(i = lf(t, i, r)));
				} else if ((xt || br(t, i, r, !1), (v = (r & t.childLanes) !== 0), xt || v)) {
					if (((v = Xe), v !== null && ((l = Zi(v, r)), l !== 0 && l !== k.retryLane)))
						throw ((k.retryLane = l), Na(t, l), sn(v, t, l), ef);
					($f(w) || xs(), (i = lf(t, i, r)));
				} else
					$f(w)
						? ((i.flags |= 192), (i.child = t.child), (i = null))
						: ((t = k.treeContext),
							(tt = Dn(w.nextSibling)),
							(It = i),
							(De = !0),
							(Pi = null),
							(kn = !1),
							t !== null && km(i, t),
							(i = uf(i, l.children)),
							(i.flags |= 4096));
				return i;
			}
			return c
				? (Fi(i),
					(w = l.fallback),
					(c = i.mode),
					(k = t.child),
					(Z = k.sibling),
					(l = oi(k, { mode: "hidden", children: l.children })),
					(l.subtreeFlags = k.subtreeFlags & 65011712),
					Z !== null ? (w = oi(Z, w)) : ((w = Oa(w, c, r, null)), (w.flags |= 2)),
					(w.return = i),
					(l.return = i),
					(l.sibling = w),
					(i.child = l),
					Bu(null, l),
					(l = i.child),
					(w = t.child.memoizedState),
					w === null
						? (w = af(r))
						: ((c = w.cachePool),
							c !== null ? ((k = Et._currentValue), (c = c.parent !== k ? { parent: k, pool: k } : c)) : (c = qm()),
							(w = { baseLanes: w.baseLanes | r, cachePool: c })),
					(l.memoizedState = w),
					(l.childLanes = rf(t, v, r)),
					(i.memoizedState = nf),
					Bu(t.child, l))
				: (Xi(i),
					(r = t.child),
					(t = r.sibling),
					(r = oi(r, { mode: "visible", children: l.children })),
					(r.return = i),
					(r.sibling = null),
					t !== null && ((v = i.deletions), v === null ? ((i.deletions = [t]), (i.flags |= 16)) : v.push(t)),
					(i.child = r),
					(i.memoizedState = null),
					r);
		}
		function uf(t, i) {
			return ((i = gs({ mode: "visible", children: i }, t.mode)), (i.return = t), (t.child = i));
		}
		function gs(t, i) {
			return ((t = mn(22, t, null, i)), (t.lanes = 0), t);
		}
		function lf(t, i, r) {
			return (
				qa(i, t.child, null, r),
				(t = uf(i, i.pendingProps.children)),
				(t.flags |= 2),
				(i.memoizedState = null),
				t
			);
		}
		function Yv(t, i, r) {
			t.lanes |= i;
			var l = t.alternate;
			(l !== null && (l.lanes |= i), Sc(t.return, i, r));
		}
		function sf(t, i, r, l, c, d) {
			var v = t.memoizedState;
			v === null
				? (t.memoizedState = {
						isBackwards: i,
						rendering: null,
						renderingStartTime: 0,
						last: l,
						tail: r,
						tailMode: c,
						treeForkCount: d,
					})
				: ((v.isBackwards = i),
					(v.rendering = null),
					(v.renderingStartTime = 0),
					(v.last = l),
					(v.tail = r),
					(v.tailMode = c),
					(v.treeForkCount = d));
		}
		function Gv(t, i, r) {
			var l = i.pendingProps,
				c = l.revealOrder,
				d = l.tail;
			l = l.children;
			var v = bt.current,
				w = (v & 2) !== 0;
			if (
				(w ? ((v = (v & 1) | 2), (i.flags |= 128)) : (v &= 1),
				ie(bt, v),
				Ht(t, i, l, r),
				(l = De ? Cu : 0),
				!w && t !== null && (t.flags & 128) !== 0)
			)
				e: for (t = i.child; t !== null; ) {
					if (t.tag === 13) t.memoizedState !== null && Yv(t, r, i);
					else if (t.tag === 19) Yv(t, r, i);
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
					for (r = i.child, c = null; r !== null; )
						((t = r.alternate), t !== null && as(t) === null && (c = r), (r = r.sibling));
					((r = c),
						r === null ? ((c = i.child), (i.child = null)) : ((c = r.sibling), (r.sibling = null)),
						sf(i, !1, c, r, d, l));
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (r = null, c = i.child, i.child = null; c !== null; ) {
						if (((t = c.alternate), t !== null && as(t) === null)) {
							i.child = c;
							break;
						}
						((t = c.sibling), (c.sibling = r), (r = c), (c = t));
					}
					sf(i, !0, r, null, d, l);
					break;
				case "together":
					sf(i, !1, null, null, void 0, l);
					break;
				default:
					i.memoizedState = null;
			}
			return i.child;
		}
		function vi(t, i, r) {
			if ((t !== null && (i.dependencies = t.dependencies), (ea |= i.lanes), (r & i.childLanes) === 0))
				if (t !== null) {
					if ((br(t, i, r, !1), (r & i.childLanes) === 0)) return null;
				} else return null;
			if (t !== null && i.child !== t.child) throw Error(s(153));
			if (i.child !== null) {
				for (t = i.child, r = oi(t, t.pendingProps), i.child = r, r.return = i; t.sibling !== null; )
					((t = t.sibling), (r = r.sibling = oi(t, t.pendingProps)), (r.return = i));
				r.sibling = null;
			}
			return i.child;
		}
		function of(t, i) {
			return (t.lanes & i) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && Xl(t)));
		}
		function SS(t, i, r) {
			switch (i.tag) {
				case 3:
					(Ze(i, i.stateNode.containerInfo), Gi(i, Et, t.memoizedState.cache), ka());
					break;
				case 27:
				case 5:
					lt(i);
					break;
				case 4:
					Ze(i, i.stateNode.containerInfo);
					break;
				case 10:
					Gi(i, i.type, i.memoizedProps.value);
					break;
				case 31:
					if (i.memoizedState !== null) return ((i.flags |= 128), zc(i), null);
					break;
				case 13:
					var l = i.memoizedState;
					if (l !== null)
						return l.dehydrated !== null
							? (Xi(i), (i.flags |= 128), null)
							: (r & i.child.childLanes) !== 0
								? Pv(t, i, r)
								: (Xi(i), (t = vi(t, i, r)), t !== null ? t.sibling : null);
					Xi(i);
					break;
				case 19:
					var c = (t.flags & 128) !== 0;
					if (((l = (r & i.childLanes) !== 0), l || (br(t, i, r, !1), (l = (r & i.childLanes) !== 0)), c)) {
						if (l) return Gv(t, i, r);
						i.flags |= 128;
					}
					if (
						((c = i.memoizedState),
						c !== null && ((c.rendering = null), (c.tail = null), (c.lastEffect = null)),
						ie(bt, bt.current),
						l)
					)
						break;
					return null;
				case 22:
					return ((i.lanes = 0), Bv(t, i, r, i.pendingProps));
				case 24:
					Gi(i, Et, t.memoizedState.cache);
			}
			return vi(t, i, r);
		}
		function Kv(t, i, r) {
			if (t !== null)
				if (t.memoizedProps !== i.pendingProps) xt = !0;
				else {
					if (!of(t, r) && (i.flags & 128) === 0) return ((xt = !1), SS(t, i, r));
					xt = (t.flags & 131072) !== 0;
				}
			else ((xt = !1), De && (i.flags & 1048576) !== 0 && Om(i, Cu, i.index));
			switch (((i.lanes = 0), i.tag)) {
				case 16:
					e: {
						var l = i.pendingProps;
						if (((t = ja(i.elementType)), (i.type = t), typeof t == "function"))
							hc(t)
								? ((l = Ia(t, l)), (i.tag = 1), (i = Vv(null, i, t, l, r)))
								: ((i.tag = 0), (i = tf(null, i, t, l, r)));
						else {
							if (t != null) {
								var c = t.$$typeof;
								if (c === M) {
									((i.tag = 11), (i = qv(null, i, t, l, r)));
									break e;
								} else if (c === q) {
									((i.tag = 14), (i = Uv(null, i, t, l, r)));
									break e;
								}
							}
							throw ((i = ue(t) || t), Error(s(306, i, "")));
						}
					}
					return i;
				case 0:
					return tf(t, i, i.type, i.pendingProps, r);
				case 1:
					return ((l = i.type), (c = Ia(l, i.pendingProps)), Vv(t, i, l, c, r));
				case 3:
					e: {
						if ((Ze(i, i.stateNode.containerInfo), t === null)) throw Error(s(387));
						l = i.pendingProps;
						var d = i.memoizedState;
						((c = d.element), Rc(t, i), ju(i, l, null, r));
						var v = i.memoizedState;
						if (
							((l = v.cache), Gi(i, Et, l), l !== d.cache && wc(i, [Et], r, !0), Du(), (l = v.element), d.isDehydrated)
						)
							if (
								((d = { element: l, isDehydrated: !1, cache: v.cache }),
								(i.updateQueue.baseState = d),
								(i.memoizedState = d),
								i.flags & 256)
							) {
								i = Qv(t, i, l, r);
								break e;
							} else if (l !== c) {
								((c = Rn(Error(s(424)), i)), Ru(c), (i = Qv(t, i, l, r)));
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
									tt = Dn(t.firstChild), It = i, De = !0, Pi = null, kn = !0, r = Hm(i, null, l, r), i.child = r;
									r;
								)
									((r.flags = (r.flags & -3) | 4096), (r = r.sibling));
							}
						else {
							if ((ka(), l === c)) {
								i = vi(t, i, r);
								break e;
							}
							Ht(t, i, l, r);
						}
						i = i.child;
					}
					return i;
				case 26:
					return (
						vs(t, i),
						t === null
							? (r = ly(i.type, null, i.pendingProps, null))
								? (i.memoizedState = r)
								: De ||
									((r = i.type),
									(t = i.pendingProps),
									(l = Ms(ye.current).createElement(r)),
									(l[Bt] = i),
									(l[tn] = t),
									Vt(l, r, t),
									qt(l),
									(i.stateNode = l))
							: (i.memoizedState = ly(i.type, t.memoizedProps, i.pendingProps, t.memoizedState)),
						null
					);
				case 27:
					return (
						lt(i),
						t === null &&
							De &&
							((l = i.stateNode = ay(i.type, i.pendingProps, ye.current)),
							(It = i),
							(kn = !0),
							(c = tt),
							ra(i.type) ? ((If = c), (tt = Dn(l.firstChild))) : (tt = c)),
						Ht(t, i, i.pendingProps.children, r),
						vs(t, i),
						t === null && (i.flags |= 4194304),
						i.child
					);
				case 5:
					return (
						t === null &&
							De &&
							((c = l = tt) &&
								((l = KS(l, i.type, i.pendingProps, kn)),
								l !== null ? ((i.stateNode = l), (It = i), (tt = Dn(l.firstChild)), (kn = !1), (c = !0)) : (c = !1)),
							c || Yi(i)),
						lt(i),
						(c = i.type),
						(d = i.pendingProps),
						(v = t !== null ? t.memoizedProps : null),
						(l = d.children),
						Lf(c, d) ? (l = null) : v !== null && Lf(c, v) && (i.flags |= 32),
						i.memoizedState !== null && ((c = jc(t, i, oS, null, null, r)), (tl._currentValue = c)),
						vs(t, i),
						Ht(t, i, l, r),
						i.child
					);
				case 6:
					return (
						t === null &&
							De &&
							((t = r = tt) &&
								((r = XS(r, i.pendingProps, kn)),
								r !== null ? ((i.stateNode = r), (It = i), (tt = null), (t = !0)) : (t = !1)),
							t || Yi(i)),
						null
					);
				case 13:
					return Pv(t, i, r);
				case 4:
					return (
						Ze(i, i.stateNode.containerInfo),
						(l = i.pendingProps),
						t === null ? (i.child = qa(i, null, l, r)) : Ht(t, i, l, r),
						i.child
					);
				case 11:
					return qv(t, i, i.type, i.pendingProps, r);
				case 7:
					return (Ht(t, i, i.pendingProps, r), i.child);
				case 8:
					return (Ht(t, i, i.pendingProps.children, r), i.child);
				case 12:
					return (Ht(t, i, i.pendingProps.children, r), i.child);
				case 10:
					return ((l = i.pendingProps), Gi(i, i.type, l.value), Ht(t, i, l.children, r), i.child);
				case 9:
					return (
						(c = i.type._context),
						(l = i.pendingProps.children),
						za(i),
						(c = Zt(c)),
						(l = l(c)),
						(i.flags |= 1),
						Ht(t, i, l, r),
						i.child
					);
				case 14:
					return Uv(t, i, i.type, i.pendingProps, r);
				case 15:
					return $v(t, i, i.type, i.pendingProps, r);
				case 19:
					return Gv(t, i, r);
				case 31:
					return _S(t, i, r);
				case 22:
					return Bv(t, i, r, i.pendingProps);
				case 24:
					return (
						za(i),
						(l = Zt(Et)),
						t === null
							? ((c = xc()),
								c === null &&
									((c = Xe),
									(d = Ec()),
									(c.pooledCache = d),
									d.refCount++,
									d !== null && (c.pooledCacheLanes |= r),
									(c = d)),
								(i.memoizedState = { parent: l, cache: c }),
								Cc(i),
								Gi(i, Et, c))
							: ((t.lanes & r) !== 0 && (Rc(t, i), ju(i, null, null, r), Du()),
								(c = t.memoizedState),
								(d = i.memoizedState),
								c.parent !== l
									? ((c = { parent: l, cache: l }),
										(i.memoizedState = c),
										i.lanes === 0 && (i.memoizedState = i.updateQueue.baseState = c),
										Gi(i, Et, l))
									: ((l = d.cache), Gi(i, Et, l), l !== c.cache && wc(i, [Et], r, !0))),
						Ht(t, i, i.pendingProps.children, r),
						i.child
					);
				case 29:
					throw i.pendingProps;
			}
			throw Error(s(156, i.tag));
		}
		function gi(t) {
			t.flags |= 4;
		}
		function cf(t, i, r, l, c) {
			if (((i = (t.mode & 32) !== 0) && (i = !1), i)) {
				if (((t.flags |= 16777216), (c & 335544128) === c))
					if (t.stateNode.complete) t.flags |= 8192;
					else if (wg()) t.flags |= 8192;
					else throw ((La = es), Ac);
			} else t.flags &= -16777217;
		}
		function Xv(t, i) {
			if (i.type !== "stylesheet" || (i.state.loading & 4) !== 0) t.flags &= -16777217;
			else if (((t.flags |= 16777216), !dy(i)))
				if (wg()) t.flags |= 8192;
				else throw ((La = es), Ac);
		}
		function ys(t, i) {
			(i !== null && (t.flags |= 4),
				t.flags & 16384 && ((i = t.tag !== 22 ? Te() : 536870912), (t.lanes |= i), (kr |= i)));
		}
		function Iu(t, i) {
			if (!De)
				switch (t.tailMode) {
					case "hidden":
						i = t.tail;
						for (var r = null; i !== null; ) (i.alternate !== null && (r = i), (i = i.sibling));
						r === null ? (t.tail = null) : (r.sibling = null);
						break;
					case "collapsed":
						r = t.tail;
						for (var l = null; r !== null; ) (r.alternate !== null && (l = r), (r = r.sibling));
						l === null ? (i || t.tail === null ? (t.tail = null) : (t.tail.sibling = null)) : (l.sibling = null);
				}
		}
		function nt(t) {
			var i = t.alternate !== null && t.alternate.child === t.child,
				r = 0,
				l = 0;
			if (i)
				for (var c = t.child; c !== null; )
					((r |= c.lanes | c.childLanes),
						(l |= c.subtreeFlags & 65011712),
						(l |= c.flags & 65011712),
						(c.return = t),
						(c = c.sibling));
			else
				for (c = t.child; c !== null; )
					((r |= c.lanes | c.childLanes), (l |= c.subtreeFlags), (l |= c.flags), (c.return = t), (c = c.sibling));
			return ((t.subtreeFlags |= l), (t.childLanes = r), i);
		}
		function wS(t, i, r) {
			var l = i.pendingProps;
			switch ((yc(i), i.tag)) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14:
					return (nt(i), null);
				case 1:
					return (nt(i), null);
				case 3:
					return (
						(r = i.stateNode),
						(l = null),
						t !== null && (l = t.memoizedState.cache),
						i.memoizedState.cache !== l && (i.flags |= 2048),
						di(Et),
						Oe(),
						r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
						(t === null || t.child === null) &&
							(pr(i)
								? gi(i)
								: t === null || (t.memoizedState.isDehydrated && (i.flags & 256) === 0) || ((i.flags |= 1024), bc())),
						nt(i),
						null
					);
				case 26:
					var c = i.type,
						d = i.memoizedState;
					return (
						t === null
							? (gi(i), d !== null ? (nt(i), Xv(i, d)) : (nt(i), cf(i, c, null, l, r)))
							: d
								? d !== t.memoizedState
									? (gi(i), nt(i), Xv(i, d))
									: (nt(i), (i.flags &= -16777217))
								: ((t = t.memoizedProps), t !== l && gi(i), nt(i), cf(i, c, t, l, r)),
						null
					);
				case 27:
					if ((jt(i), (r = ye.current), (c = i.type), t !== null && i.stateNode != null))
						t.memoizedProps !== l && gi(i);
					else {
						if (!l) {
							if (i.stateNode === null) throw Error(s(166));
							return (nt(i), null);
						}
						((t = se.current), pr(i) ? Mm(i, t) : ((t = ay(c, l, r)), (i.stateNode = t), gi(i)));
					}
					return (nt(i), null);
				case 5:
					if ((jt(i), (c = i.type), t !== null && i.stateNode != null)) t.memoizedProps !== l && gi(i);
					else {
						if (!l) {
							if (i.stateNode === null) throw Error(s(166));
							return (nt(i), null);
						}
						if (((d = se.current), pr(i))) Mm(i, d);
						else {
							var v = Ms(ye.current);
							switch (d) {
								case 1:
									d = v.createElementNS("http://www.w3.org/2000/svg", c);
									break;
								case 2:
									d = v.createElementNS("http://www.w3.org/1998/Math/MathML", c);
									break;
								default:
									switch (c) {
										case "svg":
											d = v.createElementNS("http://www.w3.org/2000/svg", c);
											break;
										case "math":
											d = v.createElementNS("http://www.w3.org/1998/Math/MathML", c);
											break;
										case "script":
											((d = v.createElement("div")),
												(d.innerHTML = "<script><\/script>"),
												(d = d.removeChild(d.firstChild)));
											break;
										case "select":
											((d =
												typeof l.is == "string" ? v.createElement("select", { is: l.is }) : v.createElement("select")),
												l.multiple ? (d.multiple = !0) : l.size && (d.size = l.size));
											break;
										default:
											d = typeof l.is == "string" ? v.createElement(c, { is: l.is }) : v.createElement(c);
									}
							}
							((d[Bt] = i), (d[tn] = l));
							e: for (v = i.child; v !== null; ) {
								if (v.tag === 5 || v.tag === 6) d.appendChild(v.stateNode);
								else if (v.tag !== 4 && v.tag !== 27 && v.child !== null) {
									((v.child.return = v), (v = v.child));
									continue;
								}
								if (v === i) break e;
								for (; v.sibling === null; ) {
									if (v.return === null || v.return === i) break e;
									v = v.return;
								}
								((v.sibling.return = v.return), (v = v.sibling));
							}
							i.stateNode = d;
							e: switch ((Vt(d, c, l), c)) {
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
							l && gi(i);
						}
					}
					return (nt(i), cf(i, i.type, t === null ? null : t.memoizedProps, i.pendingProps, r), null);
				case 6:
					if (t && i.stateNode != null) t.memoizedProps !== l && gi(i);
					else {
						if (typeof l != "string" && i.stateNode === null) throw Error(s(166));
						if (((t = ye.current), pr(i))) {
							if (((t = i.stateNode), (r = i.memoizedProps), (l = null), (c = It), c !== null))
								switch (c.tag) {
									case 27:
									case 5:
										l = c.memoizedProps;
								}
							((t[Bt] = i),
								(t = !!(t.nodeValue === r || (l !== null && l.suppressHydrationWarning === !0) || Yg(t.nodeValue, r))),
								t || Yi(i, !0));
						} else ((t = Ms(t).createTextNode(l)), (t[Bt] = i), (i.stateNode = t));
					}
					return (nt(i), null);
				case 31:
					if (((r = i.memoizedState), t === null || t.memoizedState !== null)) {
						if (((l = pr(i)), r !== null)) {
							if (t === null) {
								if (!l) throw Error(s(318));
								if (((t = i.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(557));
								t[Bt] = i;
							} else (ka(), (i.flags & 128) === 0 && (i.memoizedState = null), (i.flags |= 4));
							(nt(i), (t = !1));
						} else
							((r = bc()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = r), (t = !0));
						if (!t) return i.flags & 256 ? (gn(i), i) : (gn(i), null);
						if ((i.flags & 128) !== 0) throw Error(s(558));
					}
					return (nt(i), null);
				case 13:
					if (
						((l = i.memoizedState), t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
					) {
						if (((c = pr(i)), l !== null && l.dehydrated !== null)) {
							if (t === null) {
								if (!c) throw Error(s(318));
								if (((c = i.memoizedState), (c = c !== null ? c.dehydrated : null), !c)) throw Error(s(317));
								c[Bt] = i;
							} else (ka(), (i.flags & 128) === 0 && (i.memoizedState = null), (i.flags |= 4));
							(nt(i), (c = !1));
						} else
							((c = bc()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = c), (c = !0));
						if (!c) return i.flags & 256 ? (gn(i), i) : (gn(i), null);
					}
					return (
						gn(i),
						(i.flags & 128) !== 0
							? ((i.lanes = r), i)
							: ((r = l !== null),
								(t = t !== null && t.memoizedState !== null),
								r &&
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
								r !== t && r && (i.child.flags |= 8192),
								ys(i, i.updateQueue),
								nt(i),
								null)
					);
				case 4:
					return (Oe(), t === null && Hg(i.stateNode.containerInfo), nt(i), null);
				case 10:
					return (di(i.type), nt(i), null);
				case 19:
					if ((Y(bt), (l = i.memoizedState), l === null)) return (nt(i), null);
					if (((c = (i.flags & 128) !== 0), (d = l.rendering), d === null))
						if (c) Iu(l, !1);
						else {
							if (yt !== 0 || (t !== null && (t.flags & 128) !== 0))
								for (t = i.child; t !== null; ) {
									if (((d = as(t)), d !== null)) {
										for (
											i.flags |= 128,
												Iu(l, !1),
												t = d.updateQueue,
												i.updateQueue = t,
												ys(i, t),
												i.subtreeFlags = 0,
												t = r,
												r = i.child;
											r !== null;
										)
											(Cm(r, t), (r = r.sibling));
										return (ie(bt, (bt.current & 1) | 2), De && ci(i, l.treeForkCount), i.child);
									}
									t = t.sibling;
								}
							l.tail !== null && vt() > ws && ((i.flags |= 128), (c = !0), Iu(l, !1), (i.lanes = 4194304));
						}
					else {
						if (!c)
							if (((t = as(d)), t !== null)) {
								if (
									((i.flags |= 128),
									(c = !0),
									(t = t.updateQueue),
									(i.updateQueue = t),
									ys(i, t),
									Iu(l, !0),
									l.tail === null && l.tailMode === "hidden" && !d.alternate && !De)
								)
									return (nt(i), null);
							} else
								2 * vt() - l.renderingStartTime > ws &&
									r !== 536870912 &&
									((i.flags |= 128), (c = !0), Iu(l, !1), (i.lanes = 4194304));
						l.isBackwards
							? ((d.sibling = i.child), (i.child = d))
							: ((t = l.last), t !== null ? (t.sibling = d) : (i.child = d), (l.last = d));
					}
					return l.tail !== null
						? ((t = l.tail),
							(l.rendering = t),
							(l.tail = t.sibling),
							(l.renderingStartTime = vt()),
							(t.sibling = null),
							(r = bt.current),
							ie(bt, c ? (r & 1) | 2 : r & 1),
							De && ci(i, l.treeForkCount),
							t)
						: (nt(i), null);
				case 22:
				case 23:
					return (
						gn(i),
						Mc(),
						(l = i.memoizedState !== null),
						t !== null ? (t.memoizedState !== null) !== l && (i.flags |= 8192) : l && (i.flags |= 8192),
						l
							? (r & 536870912) !== 0 && (i.flags & 128) === 0 && (nt(i), i.subtreeFlags & 6 && (i.flags |= 8192))
							: nt(i),
						(r = i.updateQueue),
						r !== null && ys(i, r.retryQueue),
						(r = null),
						t !== null &&
							t.memoizedState !== null &&
							t.memoizedState.cachePool !== null &&
							(r = t.memoizedState.cachePool.pool),
						(l = null),
						i.memoizedState !== null && i.memoizedState.cachePool !== null && (l = i.memoizedState.cachePool.pool),
						l !== r && (i.flags |= 2048),
						t !== null && Y(Da),
						null
					);
				case 24:
					return (
						(r = null),
						t !== null && (r = t.memoizedState.cache),
						i.memoizedState.cache !== r && (i.flags |= 2048),
						di(Et),
						nt(i),
						null
					);
				case 25:
					return null;
				case 30:
					return null;
			}
			throw Error(s(156, i.tag));
		}
		function ES(t, i) {
			switch ((yc(i), i.tag)) {
				case 1:
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 3:
					return (
						di(Et),
						Oe(),
						(t = i.flags),
						(t & 65536) !== 0 && (t & 128) === 0 ? ((i.flags = (t & -65537) | 128), i) : null
					);
				case 26:
				case 27:
				case 5:
					return (jt(i), null);
				case 31:
					if (i.memoizedState !== null) {
						if ((gn(i), i.alternate === null)) throw Error(s(340));
						ka();
					}
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 13:
					if ((gn(i), (t = i.memoizedState), t !== null && t.dehydrated !== null)) {
						if (i.alternate === null) throw Error(s(340));
						ka();
					}
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 19:
					return (Y(bt), null);
				case 4:
					return (Oe(), null);
				case 10:
					return (di(i.type), null);
				case 22:
				case 23:
					return (
						gn(i),
						Mc(),
						t !== null && Y(Da),
						(t = i.flags),
						t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null
					);
				case 24:
					return (di(Et), null);
				case 25:
					return null;
				default:
					return null;
			}
		}
		function Fv(t, i) {
			switch ((yc(i), i.tag)) {
				case 3:
					(di(Et), Oe());
					break;
				case 26:
				case 27:
				case 5:
					jt(i);
					break;
				case 4:
					Oe();
					break;
				case 31:
					i.memoizedState !== null && gn(i);
					break;
				case 13:
					gn(i);
					break;
				case 19:
					Y(bt);
					break;
				case 10:
					di(i.type);
					break;
				case 22:
				case 23:
					(gn(i), Mc(), t !== null && Y(Da));
					break;
				case 24:
					di(Et);
			}
		}
		function Zu(t, i) {
			try {
				var r = i.updateQueue,
					l = r !== null ? r.lastEffect : null;
				if (l !== null) {
					var c = l.next;
					r = c;
					do {
						if ((r.tag & t) === t) {
							l = void 0;
							var d = r.create,
								v = r.inst;
							((l = d()), (v.destroy = l));
						}
						r = r.next;
					} while (r !== c);
				}
			} catch (w) {
				Ve(i, i.return, w);
			}
		}
		function Ji(t, i, r) {
			try {
				var l = i.updateQueue,
					c = l !== null ? l.lastEffect : null;
				if (c !== null) {
					var d = c.next;
					l = d;
					do {
						if ((l.tag & t) === t) {
							var v = l.inst,
								w = v.destroy;
							if (w !== void 0) {
								((v.destroy = void 0), (c = i));
								var k = r,
									Z = w;
								try {
									Z();
								} catch (K) {
									Ve(c, k, K);
								}
							}
						}
						l = l.next;
					} while (l !== d);
				}
			} catch (K) {
				Ve(i, i.return, K);
			}
		}
		function Jv(t) {
			var i = t.updateQueue;
			if (i !== null) {
				var r = t.stateNode;
				try {
					Qm(i, r);
				} catch (l) {
					Ve(t, t.return, l);
				}
			}
		}
		function Wv(t, i, r) {
			((r.props = Ia(t.type, t.memoizedProps)), (r.state = t.memoizedState));
			try {
				r.componentWillUnmount();
			} catch (l) {
				Ve(t, i, l);
			}
		}
		function Hu(t, i) {
			try {
				var r = t.ref;
				if (r !== null) {
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
					typeof r == "function" ? (t.refCleanup = r(l)) : (r.current = l);
				}
			} catch (c) {
				Ve(t, i, c);
			}
		}
		function Fn(t, i) {
			var r = t.ref,
				l = t.refCleanup;
			if (r !== null)
				if (typeof l == "function")
					try {
						l();
					} catch (c) {
						Ve(t, i, c);
					} finally {
						((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
					}
				else if (typeof r == "function")
					try {
						r(null);
					} catch (c) {
						Ve(t, i, c);
					}
				else r.current = null;
		}
		function eg(t) {
			var i = t.type,
				r = t.memoizedProps,
				l = t.stateNode;
			try {
				e: switch (i) {
					case "button":
					case "input":
					case "select":
					case "textarea":
						r.autoFocus && l.focus();
						break e;
					case "img":
						r.src ? (l.src = r.src) : r.srcSet && (l.srcset = r.srcSet);
				}
			} catch (c) {
				Ve(t, t.return, c);
			}
		}
		function ff(t, i, r) {
			try {
				var l = t.stateNode;
				(HS(l, t.type, r, i), (l[tn] = i));
			} catch (c) {
				Ve(t, t.return, c);
			}
		}
		function tg(t) {
			return t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && ra(t.type)) || t.tag === 4;
		}
		function df(t) {
			e: for (;;) {
				for (; t.sibling === null; ) {
					if (t.return === null || tg(t.return)) return null;
					t = t.return;
				}
				for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
					if ((t.tag === 27 && ra(t.type)) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
					((t.child.return = t), (t = t.child));
				}
				if (!(t.flags & 2)) return t.stateNode;
			}
		}
		function hf(t, i, r) {
			var l = t.tag;
			if (l === 5 || l === 6)
				((t = t.stateNode),
					i
						? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(t, i)
						: ((i = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r),
							i.appendChild(t),
							(r = r._reactRootContainer),
							r != null || i.onclick !== null || (i.onclick = li)));
			else if (l !== 4 && (l === 27 && ra(t.type) && ((r = t.stateNode), (i = null)), (t = t.child), t !== null))
				for (hf(t, i, r), t = t.sibling; t !== null; ) (hf(t, i, r), (t = t.sibling));
		}
		function ps(t, i, r) {
			var l = t.tag;
			if (l === 5 || l === 6) ((t = t.stateNode), i ? r.insertBefore(t, i) : r.appendChild(t));
			else if (l !== 4 && (l === 27 && ra(t.type) && (r = t.stateNode), (t = t.child), t !== null))
				for (ps(t, i, r), t = t.sibling; t !== null; ) (ps(t, i, r), (t = t.sibling));
		}
		function ng(t) {
			var i = t.stateNode,
				r = t.memoizedProps;
			try {
				for (var l = t.type, c = i.attributes; c.length; ) i.removeAttributeNode(c[0]);
				(Vt(i, l, r), (i[Bt] = t), (i[tn] = r));
			} catch (d) {
				Ve(t, t.return, d);
			}
		}
		var yi = !1,
			At = !1,
			mf = !1,
			ig = typeof WeakSet == "function" ? WeakSet : Set,
			Ut = null;
		function TS(t, i) {
			if (((t = t.containerInfo), (Df = $s), (t = pm(t)), uc(t))) {
				if ("selectionStart" in t) var r = { start: t.selectionStart, end: t.selectionEnd };
				else
					e: {
						r = ((r = t.ownerDocument) && r.defaultView) || window;
						var l = r.getSelection && r.getSelection();
						if (l && l.rangeCount !== 0) {
							r = l.anchorNode;
							var c = l.anchorOffset,
								d = l.focusNode;
							l = l.focusOffset;
							try {
								(r.nodeType, d.nodeType);
							} catch {
								r = null;
								break e;
							}
							var v = 0,
								w = -1,
								k = -1,
								Z = 0,
								K = 0,
								ee = t,
								H = null;
							t: for (;;) {
								for (
									var Q;
									ee !== r || (c !== 0 && ee.nodeType !== 3) || (w = v + c),
										ee !== d || (l !== 0 && ee.nodeType !== 3) || (k = v + l),
										ee.nodeType === 3 && (v += ee.nodeValue.length),
										(Q = ee.firstChild) !== null;
								)
									((H = ee), (ee = Q));
								for (;;) {
									if (ee === t) break t;
									if ((H === r && ++Z === c && (w = v), H === d && ++K === l && (k = v), (Q = ee.nextSibling) !== null))
										break;
									((ee = H), (H = ee.parentNode));
								}
								ee = Q;
							}
							r = w === -1 || k === -1 ? null : { start: w, end: k };
						} else r = null;
					}
				r = r || { start: 0, end: 0 };
			} else r = null;
			for (jf = { focusedElem: t, selectionRange: r }, $s = !1, Ut = i; Ut !== null; )
				if (((i = Ut), (t = i.child), (i.subtreeFlags & 1028) !== 0 && t !== null)) ((t.return = i), (Ut = t));
				else
					for (; Ut !== null; ) {
						switch (((i = Ut), (d = i.alternate), (t = i.flags), i.tag)) {
							case 0:
								if ((t & 4) !== 0 && ((t = i.updateQueue), (t = t !== null ? t.events : null), t !== null))
									for (r = 0; r < t.length; r++) ((c = t[r]), (c.ref.impl = c.nextImpl));
								break;
							case 11:
							case 15:
								break;
							case 1:
								if ((t & 1024) !== 0 && d !== null) {
									((t = void 0), (r = i), (c = d.memoizedProps), (d = d.memoizedState), (l = r.stateNode));
									try {
										var fe = Ia(r.type, c);
										((t = l.getSnapshotBeforeUpdate(fe, d)), (l.__reactInternalSnapshotBeforeUpdate = t));
									} catch (Se) {
										Ve(r, r.return, Se);
									}
								}
								break;
							case 3:
								if ((t & 1024) !== 0) {
									if (((t = i.stateNode.containerInfo), (r = t.nodeType), r === 9)) Uf(t);
									else if (r === 1)
										switch (t.nodeName) {
											case "HEAD":
											case "HTML":
											case "BODY":
												Uf(t);
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
							((t.return = i.return), (Ut = t));
							break;
						}
						Ut = i.return;
					}
		}
		function ag(t, i, r) {
			var l = r.flags;
			switch (r.tag) {
				case 0:
				case 11:
				case 15:
					(bi(t, r), l & 4 && Zu(5, r));
					break;
				case 1:
					if ((bi(t, r), l & 4))
						if (((t = r.stateNode), i === null))
							try {
								t.componentDidMount();
							} catch (v) {
								Ve(r, r.return, v);
							}
						else {
							var c = Ia(r.type, i.memoizedProps);
							i = i.memoizedState;
							try {
								t.componentDidUpdate(c, i, t.__reactInternalSnapshotBeforeUpdate);
							} catch (v) {
								Ve(r, r.return, v);
							}
						}
					(l & 64 && Jv(r), l & 512 && Hu(r, r.return));
					break;
				case 3:
					if ((bi(t, r), l & 64 && ((t = r.updateQueue), t !== null))) {
						if (((i = null), r.child !== null))
							switch (r.child.tag) {
								case 27:
								case 5:
									i = r.child.stateNode;
									break;
								case 1:
									i = r.child.stateNode;
							}
						try {
							Qm(t, i);
						} catch (v) {
							Ve(r, r.return, v);
						}
					}
					break;
				case 27:
					i === null && l & 4 && ng(r);
				case 26:
				case 5:
					(bi(t, r), i === null && l & 4 && eg(r), l & 512 && Hu(r, r.return));
					break;
				case 12:
					bi(t, r);
					break;
				case 31:
					(bi(t, r), l & 4 && lg(t, r));
					break;
				case 13:
					(bi(t, r),
						l & 4 && sg(t, r),
						l & 64 &&
							((t = r.memoizedState),
							t !== null && ((t = t.dehydrated), t !== null && ((r = zS.bind(null, r)), FS(t, r)))));
					break;
				case 22:
					if (((l = r.memoizedState !== null || yi), !l)) {
						((i = (i !== null && i.memoizedState !== null) || At), (c = yi));
						var d = At;
						((yi = l), (At = i) && !d ? _i(t, r, (r.subtreeFlags & 8772) !== 0) : bi(t, r), (yi = c), (At = d));
					}
					break;
				case 30:
					break;
				default:
					bi(t, r);
			}
		}
		function rg(t) {
			var i = t.alternate;
			(i !== null && ((t.alternate = null), rg(i)),
				(t.child = null),
				(t.deletions = null),
				(t.sibling = null),
				t.tag === 5 && ((i = t.stateNode), i !== null && Ho(i)),
				(t.stateNode = null),
				(t.return = null),
				(t.dependencies = null),
				(t.memoizedProps = null),
				(t.memoizedState = null),
				(t.pendingProps = null),
				(t.stateNode = null),
				(t.updateQueue = null));
		}
		var at = null,
			an = !1;
		function pi(t, i, r) {
			for (r = r.child; r !== null; ) (ug(t, i, r), (r = r.sibling));
		}
		function ug(t, i, r) {
			if (be && typeof be.onCommitFiberUnmount == "function")
				try {
					be.onCommitFiberUnmount(me, r);
				} catch {}
			switch (r.tag) {
				case 26:
					(At || Fn(r, i),
						pi(t, i, r),
						r.memoizedState
							? r.memoizedState.count--
							: r.stateNode && ((r = r.stateNode), r.parentNode.removeChild(r)));
					break;
				case 27:
					At || Fn(r, i);
					var l = at,
						c = an;
					(ra(r.type) && ((at = r.stateNode), (an = !1)), pi(t, i, r), Ju(r.stateNode), (at = l), (an = c));
					break;
				case 5:
					At || Fn(r, i);
				case 6:
					if (((l = at), (c = an), (at = null), pi(t, i, r), (at = l), (an = c), at !== null))
						if (an)
							try {
								(at.nodeType === 9 ? at.body : at.nodeName === "HTML" ? at.ownerDocument.body : at).removeChild(
									r.stateNode,
								);
							} catch (d) {
								Ve(r, i, d);
							}
						else
							try {
								at.removeChild(r.stateNode);
							} catch (d) {
								Ve(r, i, d);
							}
					break;
				case 18:
					at !== null &&
						(an
							? ((t = at),
								Wg(t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, r.stateNode),
								$r(t))
							: Wg(at, r.stateNode));
					break;
				case 4:
					((l = at), (c = an), (at = r.stateNode.containerInfo), (an = !0), pi(t, i, r), (at = l), (an = c));
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					(Ji(2, r, i), At || Ji(4, r, i), pi(t, i, r));
					break;
				case 1:
					(At || (Fn(r, i), (l = r.stateNode), typeof l.componentWillUnmount == "function" && Wv(r, i, l)),
						pi(t, i, r));
					break;
				case 21:
					pi(t, i, r);
					break;
				case 22:
					((At = (l = At) || r.memoizedState !== null), pi(t, i, r), (At = l));
					break;
				default:
					pi(t, i, r);
			}
		}
		function lg(t, i) {
			if (i.memoizedState === null && ((t = i.alternate), t !== null && ((t = t.memoizedState), t !== null))) {
				t = t.dehydrated;
				try {
					$r(t);
				} catch (r) {
					Ve(i, i.return, r);
				}
			}
		}
		function sg(t, i) {
			if (
				i.memoizedState === null &&
				((t = i.alternate), t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
			)
				try {
					$r(t);
				} catch (r) {
					Ve(i, i.return, r);
				}
		}
		function xS(t) {
			switch (t.tag) {
				case 31:
				case 13:
				case 19:
					var i = t.stateNode;
					return (i === null && (i = t.stateNode = new ig()), i);
				case 22:
					return ((t = t.stateNode), (i = t._retryCache), i === null && (i = t._retryCache = new ig()), i);
				default:
					throw Error(s(435, t.tag));
			}
		}
		function bs(t, i) {
			var r = xS(t);
			i.forEach(function (l) {
				if (!r.has(l)) {
					r.add(l);
					var c = DS.bind(null, t, l);
					l.then(c, c);
				}
			});
		}
		function rn(t, i) {
			var r = i.deletions;
			if (r !== null)
				for (var l = 0; l < r.length; l++) {
					var c = r[l],
						d = t,
						v = i,
						w = v;
					e: for (; w !== null; ) {
						switch (w.tag) {
							case 27:
								if (ra(w.type)) {
									((at = w.stateNode), (an = !1));
									break e;
								}
								break;
							case 5:
								((at = w.stateNode), (an = !1));
								break e;
							case 3:
							case 4:
								((at = w.stateNode.containerInfo), (an = !0));
								break e;
						}
						w = w.return;
					}
					if (at === null) throw Error(s(160));
					(ug(d, v, c), (at = null), (an = !1), (d = c.alternate), d !== null && (d.return = null), (c.return = null));
				}
			if (i.subtreeFlags & 13886) for (i = i.child; i !== null; ) (og(i, t), (i = i.sibling));
		}
		var Zn = null;
		function og(t, i) {
			var r = t.alternate,
				l = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					(rn(i, t), un(t), l & 4 && (Ji(3, t, t.return), Zu(3, t), Ji(5, t, t.return)));
					break;
				case 1:
					(rn(i, t),
						un(t),
						l & 512 && (At || r === null || Fn(r, r.return)),
						l & 64 &&
							yi &&
							((t = t.updateQueue),
							t !== null &&
								((l = t.callbacks),
								l !== null &&
									((r = t.shared.hiddenCallbacks), (t.shared.hiddenCallbacks = r === null ? l : r.concat(l))))));
					break;
				case 26:
					var c = Zn;
					if ((rn(i, t), un(t), l & 512 && (At || r === null || Fn(r, r.return)), l & 4)) {
						var d = r !== null ? r.memoizedState : null;
						if (((l = t.memoizedState), r === null))
							if (l === null)
								if (t.stateNode === null) {
									e: {
										((l = t.type), (r = t.memoizedProps), (c = c.ownerDocument || c));
										t: switch (l) {
											case "title":
												((d = c.getElementsByTagName("title")[0]),
													(!d ||
														d[gu] ||
														d[Bt] ||
														d.namespaceURI === "http://www.w3.org/2000/svg" ||
														d.hasAttribute("itemprop")) &&
														((d = c.createElement(l)), c.head.insertBefore(d, c.querySelector("head > title"))),
													Vt(d, l, r),
													(d[Bt] = t),
													qt(d),
													(l = d));
												break e;
											case "link":
												var v = cy("link", "href", c).get(l + (r.href || ""));
												if (v) {
													for (var w = 0; w < v.length; w++)
														if (
															((d = v[w]),
															d.getAttribute("href") === (r.href == null || r.href === "" ? null : r.href) &&
																d.getAttribute("rel") === (r.rel == null ? null : r.rel) &&
																d.getAttribute("title") === (r.title == null ? null : r.title) &&
																d.getAttribute("crossorigin") === (r.crossOrigin == null ? null : r.crossOrigin))
														) {
															v.splice(w, 1);
															break t;
														}
												}
												((d = c.createElement(l)), Vt(d, l, r), c.head.appendChild(d));
												break;
											case "meta":
												if ((v = cy("meta", "content", c).get(l + (r.content || "")))) {
													for (w = 0; w < v.length; w++)
														if (
															((d = v[w]),
															d.getAttribute("content") === (r.content == null ? null : "" + r.content) &&
																d.getAttribute("name") === (r.name == null ? null : r.name) &&
																d.getAttribute("property") === (r.property == null ? null : r.property) &&
																d.getAttribute("http-equiv") === (r.httpEquiv == null ? null : r.httpEquiv) &&
																d.getAttribute("charset") === (r.charSet == null ? null : r.charSet))
														) {
															v.splice(w, 1);
															break t;
														}
												}
												((d = c.createElement(l)), Vt(d, l, r), c.head.appendChild(d));
												break;
											default:
												throw Error(s(468, l));
										}
										((d[Bt] = t), qt(d), (l = d));
									}
									t.stateNode = l;
								} else fy(c, t.type, t.stateNode);
							else t.stateNode = oy(c, l, t.memoizedProps);
						else
							d !== l
								? (d === null ? r.stateNode !== null && ((r = r.stateNode), r.parentNode.removeChild(r)) : d.count--,
									l === null ? fy(c, t.type, t.stateNode) : oy(c, l, t.memoizedProps))
								: l === null && t.stateNode !== null && ff(t, t.memoizedProps, r.memoizedProps);
					}
					break;
				case 27:
					(rn(i, t),
						un(t),
						l & 512 && (At || r === null || Fn(r, r.return)),
						r !== null && l & 4 && ff(t, t.memoizedProps, r.memoizedProps));
					break;
				case 5:
					if ((rn(i, t), un(t), l & 512 && (At || r === null || Fn(r, r.return)), t.flags & 32)) {
						c = t.stateNode;
						try {
							sr(c, "");
						} catch (fe) {
							Ve(t, t.return, fe);
						}
					}
					(l & 4 && t.stateNode != null && ((c = t.memoizedProps), ff(t, c, r !== null ? r.memoizedProps : c)),
						l & 1024 && (mf = !0));
					break;
				case 6:
					if ((rn(i, t), un(t), l & 4)) {
						if (t.stateNode === null) throw Error(s(162));
						((l = t.memoizedProps), (r = t.stateNode));
						try {
							r.nodeValue = l;
						} catch (fe) {
							Ve(t, t.return, fe);
						}
					}
					break;
				case 3:
					if (
						((js = null),
						(c = Zn),
						(Zn = zs(i.containerInfo)),
						rn(i, t),
						(Zn = c),
						un(t),
						l & 4 && r !== null && r.memoizedState.isDehydrated)
					)
						try {
							$r(i.containerInfo);
						} catch (fe) {
							Ve(t, t.return, fe);
						}
					mf && ((mf = !1), cg(t));
					break;
				case 4:
					((l = Zn), (Zn = zs(t.stateNode.containerInfo)), rn(i, t), un(t), (Zn = l));
					break;
				case 12:
					(rn(i, t), un(t));
					break;
				case 31:
					(rn(i, t), un(t), l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), bs(t, l))));
					break;
				case 13:
					(rn(i, t),
						un(t),
						t.child.flags & 8192 &&
							(t.memoizedState !== null) != (r !== null && r.memoizedState !== null) &&
							(Ss = vt()),
						l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), bs(t, l))));
					break;
				case 22:
					c = t.memoizedState !== null;
					var k = r !== null && r.memoizedState !== null,
						Z = yi,
						K = At;
					if (((yi = Z || c), (At = K || k), rn(i, t), (At = K), (yi = Z), un(t), l & 8192))
						e: for (
							i = t.stateNode,
								i._visibility = c ? i._visibility & -2 : i._visibility | 1,
								c && (r === null || k || yi || At || Za(t)),
								r = null,
								i = t;
							;
						) {
							if (i.tag === 5 || i.tag === 26) {
								if (r === null) {
									k = r = i;
									try {
										if (((d = k.stateNode), c))
											((v = d.style),
												typeof v.setProperty == "function"
													? v.setProperty("display", "none", "important")
													: (v.display = "none"));
										else {
											w = k.stateNode;
											var ee = k.memoizedProps.style,
												H = ee != null && ee.hasOwnProperty("display") ? ee.display : null;
											w.style.display = H == null || typeof H == "boolean" ? "" : ("" + H).trim();
										}
									} catch (fe) {
										Ve(k, k.return, fe);
									}
								}
							} else if (i.tag === 6) {
								if (r === null) {
									k = i;
									try {
										k.stateNode.nodeValue = c ? "" : k.memoizedProps;
									} catch (fe) {
										Ve(k, k.return, fe);
									}
								}
							} else if (i.tag === 18) {
								if (r === null) {
									k = i;
									try {
										var Q = k.stateNode;
										c ? ey(Q, !0) : ey(k.stateNode, !1);
									} catch (fe) {
										Ve(k, k.return, fe);
									}
								}
							} else if (((i.tag !== 22 && i.tag !== 23) || i.memoizedState === null || i === t) && i.child !== null) {
								((i.child.return = i), (i = i.child));
								continue;
							}
							if (i === t) break e;
							for (; i.sibling === null; ) {
								if (i.return === null || i.return === t) break e;
								(r === i && (r = null), (i = i.return));
							}
							(r === i && (r = null), (i.sibling.return = i.return), (i = i.sibling));
						}
					l & 4 &&
						((l = t.updateQueue), l !== null && ((r = l.retryQueue), r !== null && ((l.retryQueue = null), bs(t, r))));
					break;
				case 19:
					(rn(i, t), un(t), l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), bs(t, l))));
					break;
				case 30:
					break;
				case 21:
					break;
				default:
					(rn(i, t), un(t));
			}
		}
		function un(t) {
			var i = t.flags;
			if (i & 2) {
				try {
					for (var r, l = t.return; l !== null; ) {
						if (tg(l)) {
							r = l;
							break;
						}
						l = l.return;
					}
					if (r == null) throw Error(s(160));
					switch (r.tag) {
						case 27:
							var c = r.stateNode;
							ps(t, df(t), c);
							break;
						case 5:
							var d = r.stateNode;
							(r.flags & 32 && (sr(d, ""), (r.flags &= -33)), ps(t, df(t), d));
							break;
						case 3:
						case 4:
							var v = r.stateNode.containerInfo;
							hf(t, df(t), v);
							break;
						default:
							throw Error(s(161));
					}
				} catch (w) {
					Ve(t, t.return, w);
				}
				t.flags &= -3;
			}
			i & 4096 && (t.flags &= -4097);
		}
		function cg(t) {
			if (t.subtreeFlags & 1024)
				for (t = t.child; t !== null; ) {
					var i = t;
					(cg(i), i.tag === 5 && i.flags & 1024 && i.stateNode.reset(), (t = t.sibling));
				}
		}
		function bi(t, i) {
			if (i.subtreeFlags & 8772) for (i = i.child; i !== null; ) (ag(t, i.alternate, i), (i = i.sibling));
		}
		function Za(t) {
			for (t = t.child; t !== null; ) {
				var i = t;
				switch (i.tag) {
					case 0:
					case 11:
					case 14:
					case 15:
						(Ji(4, i, i.return), Za(i));
						break;
					case 1:
						Fn(i, i.return);
						var r = i.stateNode;
						(typeof r.componentWillUnmount == "function" && Wv(i, i.return, r), Za(i));
						break;
					case 27:
						Ju(i.stateNode);
					case 26:
					case 5:
						(Fn(i, i.return), Za(i));
						break;
					case 22:
						i.memoizedState === null && Za(i);
						break;
					case 30:
						Za(i);
						break;
					default:
						Za(i);
				}
				t = t.sibling;
			}
		}
		function _i(t, i, r) {
			for (r = r && (i.subtreeFlags & 8772) !== 0, i = i.child; i !== null; ) {
				var l = i.alternate,
					c = t,
					d = i,
					v = d.flags;
				switch (d.tag) {
					case 0:
					case 11:
					case 15:
						(_i(c, d, r), Zu(4, d));
						break;
					case 1:
						if ((_i(c, d, r), (l = d), (c = l.stateNode), typeof c.componentDidMount == "function"))
							try {
								c.componentDidMount();
							} catch (Z) {
								Ve(l, l.return, Z);
							}
						if (((l = d), (c = l.updateQueue), c !== null)) {
							var w = l.stateNode;
							try {
								var k = c.shared.hiddenCallbacks;
								if (k !== null) for (c.shared.hiddenCallbacks = null, c = 0; c < k.length; c++) Vm(k[c], w);
							} catch (Z) {
								Ve(l, l.return, Z);
							}
						}
						(r && v & 64 && Jv(d), Hu(d, d.return));
						break;
					case 27:
						ng(d);
					case 26:
					case 5:
						(_i(c, d, r), r && l === null && v & 4 && eg(d), Hu(d, d.return));
						break;
					case 12:
						_i(c, d, r);
						break;
					case 31:
						(_i(c, d, r), r && v & 4 && lg(c, d));
						break;
					case 13:
						(_i(c, d, r), r && v & 4 && sg(c, d));
						break;
					case 22:
						(d.memoizedState === null && _i(c, d, r), Hu(d, d.return));
						break;
					case 30:
						break;
					default:
						_i(c, d, r);
				}
				i = i.sibling;
			}
		}
		function vf(t, i) {
			var r = null;
			(t !== null &&
				t.memoizedState !== null &&
				t.memoizedState.cachePool !== null &&
				(r = t.memoizedState.cachePool.pool),
				(t = null),
				i.memoizedState !== null && i.memoizedState.cachePool !== null && (t = i.memoizedState.cachePool.pool),
				t !== r && (t != null && t.refCount++, r != null && Nu(r)));
		}
		function gf(t, i) {
			((t = null),
				i.alternate !== null && (t = i.alternate.memoizedState.cache),
				(i = i.memoizedState.cache),
				i !== t && (i.refCount++, t != null && Nu(t)));
		}
		function Hn(t, i, r, l) {
			if (i.subtreeFlags & 10256) for (i = i.child; i !== null; ) (fg(t, i, r, l), (i = i.sibling));
		}
		function fg(t, i, r, l) {
			var c = i.flags;
			switch (i.tag) {
				case 0:
				case 11:
				case 15:
					(Hn(t, i, r, l), c & 2048 && Zu(9, i));
					break;
				case 1:
					Hn(t, i, r, l);
					break;
				case 3:
					(Hn(t, i, r, l),
						c & 2048 &&
							((t = null),
							i.alternate !== null && (t = i.alternate.memoizedState.cache),
							(i = i.memoizedState.cache),
							i !== t && (i.refCount++, t != null && Nu(t))));
					break;
				case 12:
					if (c & 2048) {
						(Hn(t, i, r, l), (t = i.stateNode));
						try {
							var d = i.memoizedProps,
								v = d.id,
								w = d.onPostCommit;
							typeof w == "function" && w(v, i.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
						} catch (k) {
							Ve(i, i.return, k);
						}
					} else Hn(t, i, r, l);
					break;
				case 31:
					Hn(t, i, r, l);
					break;
				case 13:
					Hn(t, i, r, l);
					break;
				case 23:
					break;
				case 22:
					((d = i.stateNode),
						(v = i.alternate),
						i.memoizedState !== null
							? d._visibility & 2
								? Hn(t, i, r, l)
								: Vu(t, i)
							: d._visibility & 2
								? Hn(t, i, r, l)
								: ((d._visibility |= 2), Rr(t, i, r, l, (i.subtreeFlags & 10256) !== 0 || !1)),
						c & 2048 && vf(v, i));
					break;
				case 24:
					(Hn(t, i, r, l), c & 2048 && gf(i.alternate, i));
					break;
				default:
					Hn(t, i, r, l);
			}
		}
		function Rr(t, i, r, l, c) {
			for (c = c && ((i.subtreeFlags & 10256) !== 0 || !1), i = i.child; i !== null; ) {
				var d = t,
					v = i,
					w = r,
					k = l,
					Z = v.flags;
				switch (v.tag) {
					case 0:
					case 11:
					case 15:
						(Rr(d, v, w, k, c), Zu(8, v));
						break;
					case 23:
						break;
					case 22:
						var K = v.stateNode;
						(v.memoizedState !== null
							? K._visibility & 2
								? Rr(d, v, w, k, c)
								: Vu(d, v)
							: ((K._visibility |= 2), Rr(d, v, w, k, c)),
							c && Z & 2048 && vf(v.alternate, v));
						break;
					case 24:
						(Rr(d, v, w, k, c), c && Z & 2048 && gf(v.alternate, v));
						break;
					default:
						Rr(d, v, w, k, c);
				}
				i = i.sibling;
			}
		}
		function Vu(t, i) {
			if (i.subtreeFlags & 10256)
				for (i = i.child; i !== null; ) {
					var r = t,
						l = i,
						c = l.flags;
					switch (l.tag) {
						case 22:
							(Vu(r, l), c & 2048 && vf(l.alternate, l));
							break;
						case 24:
							(Vu(r, l), c & 2048 && gf(l.alternate, l));
							break;
						default:
							Vu(r, l);
					}
					i = i.sibling;
				}
		}
		var Qu = 8192;
		function Nr(t, i, r) {
			if (t.subtreeFlags & Qu) for (t = t.child; t !== null; ) (dg(t, i, r), (t = t.sibling));
		}
		function dg(t, i, r) {
			switch (t.tag) {
				case 26:
					(Nr(t, i, r), t.flags & Qu && t.memoizedState !== null && ow(r, Zn, t.memoizedState, t.memoizedProps));
					break;
				case 5:
					Nr(t, i, r);
					break;
				case 3:
				case 4:
					var l = Zn;
					((Zn = zs(t.stateNode.containerInfo)), Nr(t, i, r), (Zn = l));
					break;
				case 22:
					t.memoizedState === null &&
						((l = t.alternate),
						l !== null && l.memoizedState !== null ? ((l = Qu), (Qu = 16777216), Nr(t, i, r), (Qu = l)) : Nr(t, i, r));
					break;
				default:
					Nr(t, i, r);
			}
		}
		function hg(t) {
			var i = t.alternate;
			if (i !== null && ((t = i.child), t !== null)) {
				i.child = null;
				do ((i = t.sibling), (t.sibling = null), (t = i));
				while (t !== null);
			}
		}
		function Pu(t) {
			var i = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (i !== null)
					for (var r = 0; r < i.length; r++) {
						var l = i[r];
						((Ut = l), vg(l, t));
					}
				hg(t);
			}
			if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (mg(t), (t = t.sibling));
		}
		function mg(t) {
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(Pu(t), t.flags & 2048 && Ji(9, t, t.return));
					break;
				case 3:
					Pu(t);
					break;
				case 12:
					Pu(t);
					break;
				case 22:
					var i = t.stateNode;
					t.memoizedState !== null && i._visibility & 2 && (t.return === null || t.return.tag !== 13)
						? ((i._visibility &= -3), _s(t))
						: Pu(t);
					break;
				default:
					Pu(t);
			}
		}
		function _s(t) {
			var i = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (i !== null)
					for (var r = 0; r < i.length; r++) {
						var l = i[r];
						((Ut = l), vg(l, t));
					}
				hg(t);
			}
			for (t = t.child; t !== null; ) {
				switch (((i = t), i.tag)) {
					case 0:
					case 11:
					case 15:
						(Ji(8, i, i.return), _s(i));
						break;
					case 22:
						((r = i.stateNode), r._visibility & 2 && ((r._visibility &= -3), _s(i)));
						break;
					default:
						_s(i);
				}
				t = t.sibling;
			}
		}
		function vg(t, i) {
			for (; Ut !== null; ) {
				var r = Ut;
				switch (r.tag) {
					case 0:
					case 11:
					case 15:
						Ji(8, r, i);
						break;
					case 23:
					case 22:
						if (r.memoizedState !== null && r.memoizedState.cachePool !== null) {
							var l = r.memoizedState.cachePool.pool;
							l != null && l.refCount++;
						}
						break;
					case 24:
						Nu(r.memoizedState.cache);
				}
				if (((l = r.child), l !== null)) ((l.return = r), (Ut = l));
				else
					e: for (r = t; Ut !== null; ) {
						l = Ut;
						var c = l.sibling,
							d = l.return;
						if ((rg(l), l === r)) {
							Ut = null;
							break e;
						}
						if (c !== null) {
							((c.return = d), (Ut = c));
							break e;
						}
						Ut = d;
					}
			}
		}
		var AS = {
				getCacheForType: function (t) {
					var i = Zt(Et),
						r = i.data.get(t);
					return (r === void 0 && ((r = t()), i.data.set(t, r)), r);
				},
				cacheSignal: function () {
					return Zt(Et).controller.signal;
				},
			},
			CS = typeof WeakMap == "function" ? WeakMap : Map,
			Ie = 0,
			Xe = null,
			Re = null,
			ke = 0,
			He = 0,
			yn = null,
			Wi = !1,
			Or = !1,
			yf = !1,
			Si = 0,
			yt = 0,
			ea = 0,
			Ha = 0,
			pf = 0,
			pn = 0,
			kr = 0,
			Yu = null,
			ln = null,
			bf = !1,
			Ss = 0,
			gg = 0,
			ws = 1 / 0,
			Es = null,
			ta = null,
			Mt = 0,
			na = null,
			Mr = null,
			wi = 0,
			_f = 0,
			Sf = null,
			yg = null,
			Gu = 0,
			wf = null;
		function zn() {
			return (Ie & 2) !== 0 && ke !== 0 ? ke & -ke : U.T !== null ? Rf() : hu();
		}
		function pg() {
			if (pn === 0)
				if ((ke & 536870912) === 0 || De) {
					var t = En;
					((En <<= 1), (En & 3932160) === 0 && (En = 262144), (pn = t));
				} else pn = 536870912;
			return ((t = vn.current), t !== null && (t.flags |= 32), pn);
		}
		function sn(t, i, r) {
			(((t === Xe && (He === 2 || He === 9)) || t.cancelPendingCommit !== null) && (zr(t, 0), ia(t, ke, pn, !1)),
				ot(t, r),
				((Ie & 2) === 0 || t !== Xe) &&
					(t === Xe && ((Ie & 2) === 0 && (Ha |= r), yt === 4 && ia(t, ke, pn, !1)), Ei(t)));
		}
		function bg(t, i, r) {
			if ((Ie & 6) !== 0) throw Error(s(327));
			var l = (!r && (i & 127) === 0 && (i & t.expiredLanes) === 0) || F(t, i),
				c = l ? OS(t, i) : Tf(t, i, !0),
				d = l;
			do {
				if (c === 0) {
					Or && !l && ia(t, i, 0, !1);
					break;
				} else {
					if (((r = t.current.alternate), d && !RS(r))) {
						((c = Tf(t, i, !1)), (d = !1));
						continue;
					}
					if (c === 2) {
						if (((d = i), t.errorRecoveryDisabledLanes & d)) var v = 0;
						else ((v = t.pendingLanes & -536870913), (v = v !== 0 ? v : v & 536870912 ? 536870912 : 0));
						if (v !== 0) {
							i = v;
							e: {
								var w = t;
								c = Yu;
								var k = w.current.memoizedState.isDehydrated;
								if ((k && (zr(w, v).flags |= 256), (v = Tf(w, v, !1)), v !== 2)) {
									if (yf && !k) {
										((w.errorRecoveryDisabledLanes |= d), (Ha |= d), (c = 4));
										break e;
									}
									((d = ln), (ln = c), d !== null && (ln === null ? (ln = d) : ln.push.apply(ln, d)));
								}
								c = v;
							}
							if (((d = !1), c !== 2)) continue;
						}
					}
					if (c === 1) {
						(zr(t, 0), ia(t, i, 0, !0));
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
								ia(l, i, pn, !Wi);
								break e;
							case 2:
								ln = null;
								break;
							case 3:
							case 5:
								break;
							default:
								throw Error(s(329));
						}
						if ((i & 62914560) === i && ((c = Ss + 300 - vt()), 10 < c)) {
							if ((ia(l, i, pn, !Wi), Ta(l, 0, !0) !== 0)) break e;
							((wi = i),
								(l.timeoutHandle = Fg(_g.bind(null, l, r, ln, Es, bf, i, pn, Ha, kr, Wi, d, "Throttled", -0, 0), c)));
							break e;
						}
						_g(l, r, ln, Es, bf, i, pn, Ha, kr, Wi, d, null, -0, 0);
					}
				}
				break;
			} while (!0);
			Ei(t);
		}
		function _g(t, i, r, l, c, d, v, w, k, Z, K, ee, H, Q) {
			if (((t.timeoutHandle = -1), (ee = i.subtreeFlags), ee & 8192 || (ee & 16785408) === 16785408)) {
				((ee = {
					stylesheets: null,
					count: 0,
					imgCount: 0,
					imgBytes: 0,
					suspenseyImages: [],
					waitingForImages: !0,
					waitingForViewTransition: !1,
					unsuspend: li,
				}),
					dg(i, d, ee));
				var fe = (d & 62914560) === d ? Ss - vt() : (d & 4194048) === d ? gg - vt() : 0;
				if (((fe = cw(ee, fe)), fe !== null)) {
					((wi = d),
						(t.cancelPendingCommit = fe(Rg.bind(null, t, i, d, r, l, c, v, w, k, K, ee, null, H, Q))),
						ia(t, d, v, !Z));
					return;
				}
			}
			Rg(t, i, d, r, l, c, v, w, k);
		}
		function RS(t) {
			for (var i = t; ; ) {
				var r = i.tag;
				if (
					(r === 0 || r === 11 || r === 15) &&
					i.flags & 16384 &&
					((r = i.updateQueue), r !== null && ((r = r.stores), r !== null))
				)
					for (var l = 0; l < r.length; l++) {
						var c = r[l],
							d = c.getSnapshot;
						c = c.value;
						try {
							if (!hn(d(), c)) return !1;
						} catch {
							return !1;
						}
					}
				if (((r = i.child), i.subtreeFlags & 16384 && r !== null)) ((r.return = i), (i = r));
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
		function ia(t, i, r, l) {
			((i &= ~pf),
				(i &= ~Ha),
				(t.suspendedLanes |= i),
				(t.pingedLanes &= ~i),
				l && (t.warmLanes |= i),
				(l = t.expirationTimes));
			for (var c = i; 0 < c; ) {
				var d = 31 - qe(c),
					v = 1 << d;
				((l[d] = -1), (c &= ~v));
			}
			r !== 0 && en(t, r, i);
		}
		function Ts() {
			return (Ie & 6) === 0 ? (Ku(0, !1), !1) : !0;
		}
		function Ef() {
			if (Re !== null) {
				if (He === 0) var t = Re.return;
				else ((t = Re), (fi = Ma = null), Uc(t), (Er = null), (ku = 0), (t = Re));
				for (; t !== null; ) (Fv(t.alternate, t), (t = t.return));
				Re = null;
			}
		}
		function zr(t, i) {
			var r = t.timeoutHandle;
			(r !== -1 && ((t.timeoutHandle = -1), PS(r)),
				(r = t.cancelPendingCommit),
				r !== null && ((t.cancelPendingCommit = null), r()),
				(wi = 0),
				Ef(),
				(Xe = t),
				(Re = r = oi(t.current, null)),
				(ke = i),
				(He = 0),
				(yn = null),
				(Wi = !1),
				(Or = F(t, i)),
				(yf = !1),
				(kr = pn = pf = Ha = ea = yt = 0),
				(ln = Yu = null),
				(bf = !1),
				(i & 8) !== 0 && (i |= i & 32));
			var l = t.entangledLanes;
			if (l !== 0)
				for (t = t.entanglements, l &= i; 0 < l; ) {
					var c = 31 - qe(l),
						d = 1 << c;
					((i |= t[c]), (l &= ~d));
				}
			return ((Si = i), Ql(), r);
		}
		function Sg(t, i) {
			((xe = null),
				(U.H = $u),
				i === wr || i === Wl
					? ((i = Bm()), (He = 3))
					: i === Ac
						? ((i = Bm()), (He = 4))
						: (He = i === ef ? 8 : i !== null && typeof i == "object" && typeof i.then == "function" ? 6 : 1),
				(yn = i),
				Re === null && ((yt = 1), hs(t, Rn(i, t.current))));
		}
		function wg() {
			var t = vn.current;
			return t === null
				? !0
				: (ke & 4194048) === ke
					? Mn === null
					: (ke & 62914560) === ke || (ke & 536870912) !== 0
						? t === Mn
						: !1;
		}
		function Eg() {
			var t = U.H;
			return ((U.H = $u), t === null ? $u : t);
		}
		function Tg() {
			var t = U.A;
			return ((U.A = AS), t);
		}
		function xs() {
			((yt = 4),
				Wi || ((ke & 4194048) !== ke && vn.current !== null) || (Or = !0),
				((ea & 134217727) === 0 && (Ha & 134217727) === 0) || Xe === null || ia(Xe, ke, pn, !1));
		}
		function Tf(t, i, r) {
			var l = Ie;
			Ie |= 2;
			var c = Eg(),
				d = Tg();
			((Xe !== t || ke !== i) && ((Es = null), zr(t, i)), (i = !1));
			var v = yt;
			e: do
				try {
					if (He !== 0 && Re !== null) {
						var w = Re,
							k = yn;
						switch (He) {
							case 8:
								(Ef(), (v = 6));
								break e;
							case 3:
							case 2:
							case 9:
							case 6:
								vn.current === null && (i = !0);
								var Z = He;
								if (((He = 0), (yn = null), Dr(t, w, k, Z), r && Or)) {
									v = 0;
									break e;
								}
								break;
							default:
								((Z = He), (He = 0), (yn = null), Dr(t, w, k, Z));
						}
					}
					(NS(), (v = yt));
					break;
				} catch (K) {
					Sg(t, K);
				}
			while (!0);
			return (
				i && t.shellSuspendCounter++,
				(fi = Ma = null),
				(Ie = l),
				(U.H = c),
				(U.A = d),
				Re === null && ((Xe = null), (ke = 0), Ql()),
				v
			);
		}
		function NS() {
			for (; Re !== null; ) xg(Re);
		}
		function OS(t, i) {
			var r = Ie;
			Ie |= 2;
			var l = Eg(),
				c = Tg();
			Xe !== t || ke !== i ? ((Es = null), (ws = vt() + 500), zr(t, i)) : (Or = F(t, i));
			e: do
				try {
					if (He !== 0 && Re !== null) {
						i = Re;
						var d = yn;
						t: switch (He) {
							case 1:
								((He = 0), (yn = null), Dr(t, i, d, 1));
								break;
							case 2:
							case 9:
								if (Um(d)) {
									((He = 0), (yn = null), Ag(i));
									break;
								}
								((i = function () {
									((He !== 2 && He !== 9) || Xe !== t || (He = 7), Ei(t));
								}),
									d.then(i, i));
								break e;
							case 3:
								He = 7;
								break e;
							case 4:
								He = 5;
								break e;
							case 7:
								Um(d) ? ((He = 0), (yn = null), Ag(i)) : ((He = 0), (yn = null), Dr(t, i, d, 7));
								break;
							case 5:
								var v = null;
								switch (Re.tag) {
									case 26:
										v = Re.memoizedState;
									case 5:
									case 27:
										var w = Re;
										if (v ? dy(v) : w.stateNode.complete) {
											((He = 0), (yn = null));
											var k = w.sibling;
											if (k !== null) Re = k;
											else {
												var Z = w.return;
												Z !== null ? ((Re = Z), As(Z)) : (Re = null);
											}
											break t;
										}
								}
								((He = 0), (yn = null), Dr(t, i, d, 5));
								break;
							case 6:
								((He = 0), (yn = null), Dr(t, i, d, 6));
								break;
							case 8:
								(Ef(), (yt = 6));
								break e;
							default:
								throw Error(s(462));
						}
					}
					kS();
					break;
				} catch (K) {
					Sg(t, K);
				}
			while (!0);
			return ((fi = Ma = null), (U.H = l), (U.A = c), (Ie = r), Re !== null ? 0 : ((Xe = null), (ke = 0), Ql(), yt));
		}
		function kS() {
			for (; Re !== null && !Yn(); ) xg(Re);
		}
		function xg(t) {
			var i = Kv(t.alternate, t, Si);
			((t.memoizedProps = t.pendingProps), i === null ? As(t) : (Re = i));
		}
		function Ag(t) {
			var i = t,
				r = i.alternate;
			switch (i.tag) {
				case 15:
				case 0:
					i = Hv(r, i, i.pendingProps, i.type, void 0, ke);
					break;
				case 11:
					i = Hv(r, i, i.pendingProps, i.type.render, i.ref, ke);
					break;
				case 5:
					Uc(i);
				default:
					(Fv(r, i), (i = Re = Cm(i, Si)), (i = Kv(r, i, Si)));
			}
			((t.memoizedProps = t.pendingProps), i === null ? As(t) : (Re = i));
		}
		function Dr(t, i, r, l) {
			((fi = Ma = null), Uc(i), (Er = null), (ku = 0));
			var c = i.return;
			try {
				if (bS(t, c, i, r, ke)) {
					((yt = 1), hs(t, Rn(r, t.current)), (Re = null));
					return;
				}
			} catch (d) {
				if (c !== null) throw ((Re = c), d);
				((yt = 1), hs(t, Rn(r, t.current)), (Re = null));
				return;
			}
			i.flags & 32768
				? (De || l === 1
						? (t = !0)
						: Or || (ke & 536870912) !== 0
							? (t = !1)
							: ((Wi = t = !0),
								(l === 2 || l === 9 || l === 3 || l === 6) &&
									((l = vn.current), l !== null && l.tag === 13 && (l.flags |= 16384))),
					Cg(i, t))
				: As(i);
		}
		function As(t) {
			var i = t;
			do {
				if ((i.flags & 32768) !== 0) {
					Cg(i, Wi);
					return;
				}
				t = i.return;
				var r = wS(i.alternate, i, Si);
				if (r !== null) {
					Re = r;
					return;
				}
				if (((i = i.sibling), i !== null)) {
					Re = i;
					return;
				}
				Re = i = t;
			} while (i !== null);
			yt === 0 && (yt = 5);
		}
		function Cg(t, i) {
			do {
				var r = ES(t.alternate, t);
				if (r !== null) {
					((r.flags &= 32767), (Re = r));
					return;
				}
				if (
					((r = t.return),
					r !== null && ((r.flags |= 32768), (r.subtreeFlags = 0), (r.deletions = null)),
					!i && ((t = t.sibling), t !== null))
				) {
					Re = t;
					return;
				}
				Re = t = r;
			} while (t !== null);
			((yt = 6), (Re = null));
		}
		function Rg(t, i, r, l, c, d, v, w, k) {
			t.cancelPendingCommit = null;
			do Cs();
			while (Mt !== 0);
			if ((Ie & 6) !== 0) throw Error(s(327));
			if (i !== null) {
				if (i === t.current) throw Error(s(177));
				if (
					((d = i.lanes | i.childLanes),
					(d |= fc),
					ct(t, r, d, v, w, k),
					t === Xe && ((Re = Xe = null), (ke = 0)),
					(Mr = i),
					(na = t),
					(wi = r),
					(_f = d),
					(Sf = c),
					(yg = l),
					(i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0
						? ((t.callbackNode = null),
							(t.callbackPriority = 0),
							jS(wn, function () {
								return (zg(), null);
							}))
						: ((t.callbackNode = null), (t.callbackPriority = 0)),
					(l = (i.flags & 13878) !== 0),
					(i.subtreeFlags & 13878) !== 0 || l)
				) {
					((l = U.T), (U.T = null), (c = V.p), (V.p = 2), (v = Ie), (Ie |= 4));
					try {
						TS(t, i, r);
					} finally {
						((Ie = v), (V.p = c), (U.T = l));
					}
				}
				((Mt = 1), Ng(), Og(), kg());
			}
		}
		function Ng() {
			if (Mt === 1) {
				Mt = 0;
				var t = na,
					i = Mr,
					r = (i.flags & 13878) !== 0;
				if ((i.subtreeFlags & 13878) !== 0 || r) {
					((r = U.T), (U.T = null));
					var l = V.p;
					V.p = 2;
					var c = Ie;
					Ie |= 4;
					try {
						og(i, t);
						var d = jf,
							v = pm(t.containerInfo),
							w = d.focusedElem,
							k = d.selectionRange;
						if (v !== w && w && w.ownerDocument && ym(w.ownerDocument.documentElement, w)) {
							if (k !== null && uc(w)) {
								var Z = k.start,
									K = k.end;
								if ((K === void 0 && (K = Z), "selectionStart" in w))
									((w.selectionStart = Z), (w.selectionEnd = Math.min(K, w.value.length)));
								else {
									var ee = w.ownerDocument || document,
										H = (ee && ee.defaultView) || window;
									if (H.getSelection) {
										var Q = H.getSelection(),
											fe = w.textContent.length,
											Se = Math.min(k.start, fe),
											Ge = k.end === void 0 ? Se : Math.min(k.end, fe);
										!Q.extend && Se > Ge && ((v = Ge), (Ge = Se), (Se = v));
										var L = gm(w, Se),
											j = gm(w, Ge);
										if (
											L &&
											j &&
											(Q.rangeCount !== 1 ||
												Q.anchorNode !== L.node ||
												Q.anchorOffset !== L.offset ||
												Q.focusNode !== j.node ||
												Q.focusOffset !== j.offset)
										) {
											var I = ee.createRange();
											(I.setStart(L.node, L.offset),
												Q.removeAllRanges(),
												Se > Ge
													? (Q.addRange(I), Q.extend(j.node, j.offset))
													: (I.setEnd(j.node, j.offset), Q.addRange(I)));
										}
									}
								}
							}
							for (ee = [], Q = w; (Q = Q.parentNode); )
								Q.nodeType === 1 && ee.push({ element: Q, left: Q.scrollLeft, top: Q.scrollTop });
							for (typeof w.focus == "function" && w.focus(), w = 0; w < ee.length; w++) {
								var J = ee[w];
								((J.element.scrollLeft = J.left), (J.element.scrollTop = J.top));
							}
						}
						(($s = !!Df), (jf = Df = null));
					} finally {
						((Ie = c), (V.p = l), (U.T = r));
					}
				}
				((t.current = i), (Mt = 2));
			}
		}
		function Og() {
			if (Mt === 2) {
				Mt = 0;
				var t = na,
					i = Mr,
					r = (i.flags & 8772) !== 0;
				if ((i.subtreeFlags & 8772) !== 0 || r) {
					((r = U.T), (U.T = null));
					var l = V.p;
					V.p = 2;
					var c = Ie;
					Ie |= 4;
					try {
						ag(t, i.alternate, i);
					} finally {
						((Ie = c), (V.p = l), (U.T = r));
					}
				}
				Mt = 3;
			}
		}
		function kg() {
			if (Mt === 4 || Mt === 3) {
				((Mt = 0), Bi());
				var t = na,
					i = Mr,
					r = wi,
					l = yg;
				(i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0
					? (Mt = 5)
					: ((Mt = 0), (Mr = na = null), Mg(t, t.pendingLanes));
				var c = t.pendingLanes;
				if ((c === 0 && (ta = null), wt(r), (i = i.stateNode), be && typeof be.onCommitFiberRoot == "function"))
					try {
						be.onCommitFiberRoot(me, i, void 0, (i.current.flags & 128) === 128);
					} catch {}
				if (l !== null) {
					((i = U.T), (c = V.p), (V.p = 2), (U.T = null));
					try {
						for (var d = t.onRecoverableError, v = 0; v < l.length; v++) {
							var w = l[v];
							d(w.value, { componentStack: w.stack });
						}
					} finally {
						((U.T = i), (V.p = c));
					}
				}
				((wi & 3) !== 0 && Cs(),
					Ei(t),
					(c = t.pendingLanes),
					(r & 261930) !== 0 && (c & 42) !== 0 ? (t === wf ? Gu++ : ((Gu = 0), (wf = t))) : (Gu = 0),
					Ku(0, !1));
			}
		}
		function Mg(t, i) {
			(t.pooledCacheLanes &= i) === 0 && ((i = t.pooledCache), i != null && ((t.pooledCache = null), Nu(i)));
		}
		function Cs() {
			return (Ng(), Og(), kg(), zg());
		}
		function zg() {
			if (Mt !== 5) return !1;
			var t = na,
				i = _f;
			_f = 0;
			var r = wt(wi),
				l = U.T,
				c = V.p;
			try {
				((V.p = 32 > r ? 32 : r), (U.T = null), (r = Sf), (Sf = null));
				var d = na,
					v = wi;
				if (((Mt = 0), (Mr = na = null), (wi = 0), (Ie & 6) !== 0)) throw Error(s(331));
				var w = Ie;
				if (
					((Ie |= 4),
					mg(d.current),
					fg(d, d.current, v, r),
					(Ie = w),
					Ku(0, !1),
					be && typeof be.onPostCommitFiberRoot == "function")
				)
					try {
						be.onPostCommitFiberRoot(me, d);
					} catch {}
				return !0;
			} finally {
				((V.p = c), (U.T = l), Mg(t, i));
			}
		}
		function Dg(t, i, r) {
			((i = Rn(r, i)), (i = Wc(t.stateNode, i, 2)), (t = $a(t, i, 2)), t !== null && (ot(t, 2), Ei(t)));
		}
		function Ve(t, i, r) {
			if (t.tag === 3) Dg(t, t, r);
			else
				for (; i !== null; ) {
					if (i.tag === 3) {
						Dg(i, t, r);
						break;
					} else if (i.tag === 1) {
						var l = i.stateNode;
						if (
							typeof i.type.getDerivedStateFromError == "function" ||
							(typeof l.componentDidCatch == "function" && (ta === null || !ta.has(l)))
						) {
							((t = Rn(r, t)), (r = jv(2)), (l = $a(i, r, 2)), l !== null && (Lv(r, l, i, t), ot(l, 2), Ei(l)));
							break;
						}
					}
					i = i.return;
				}
		}
		function xf(t, i, r) {
			var l = t.pingCache;
			if (l === null) {
				l = t.pingCache = new CS();
				var c = new Set();
				l.set(i, c);
			} else ((c = l.get(i)), c === void 0 && ((c = new Set()), l.set(i, c)));
			c.has(r) || ((yf = !0), c.add(r), (t = MS.bind(null, t, i, r)), i.then(t, t));
		}
		function MS(t, i, r) {
			var l = t.pingCache;
			(l !== null && l.delete(i),
				(t.pingedLanes |= t.suspendedLanes & r),
				(t.warmLanes &= ~r),
				Xe === t &&
					(ke & r) === r &&
					(yt === 4 || (yt === 3 && (ke & 62914560) === ke && 300 > vt() - Ss) ? (Ie & 2) === 0 && zr(t, 0) : (pf |= r),
					kr === ke && (kr = 0)),
				Ei(t));
		}
		function jg(t, i) {
			(i === 0 && (i = Te()), (t = Na(t, i)), t !== null && (ot(t, i), Ei(t)));
		}
		function zS(t) {
			var i = t.memoizedState,
				r = 0;
			(i !== null && (r = i.retryLane), jg(t, r));
		}
		function DS(t, i) {
			var r = 0;
			switch (t.tag) {
				case 31:
				case 13:
					var l = t.stateNode,
						c = t.memoizedState;
					c !== null && (r = c.retryLane);
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
			(l !== null && l.delete(i), jg(t, r));
		}
		function jS(t, i) {
			return st(t, i);
		}
		var Rs = null,
			jr = null,
			Af = !1,
			Ns = !1,
			Cf = !1,
			aa = 0;
		function Ei(t) {
			(t !== jr && t.next === null && (jr === null ? (Rs = jr = t) : (jr = jr.next = t)),
				(Ns = !0),
				Af || ((Af = !0), qS()));
		}
		function Ku(t, i) {
			if (!Cf && Ns) {
				Cf = !0;
				do
					for (var r = !1, l = Rs; l !== null; ) {
						if (!i)
							if (t !== 0) {
								var c = l.pendingLanes;
								if (c === 0) var d = 0;
								else {
									var v = l.suspendedLanes,
										w = l.pingedLanes;
									((d = (1 << (31 - qe(42 | t) + 1)) - 1),
										(d &= c & ~(v & ~w)),
										(d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0));
								}
								d !== 0 && ((r = !0), $g(l, d));
							} else
								((d = ke),
									(d = Ta(l, l === Xe ? d : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1)),
									(d & 3) === 0 || F(l, d) || ((r = !0), $g(l, d)));
						l = l.next;
					}
				while (r);
				Cf = !1;
			}
		}
		function LS() {
			Lg();
		}
		function Lg() {
			Ns = Af = !1;
			var t = 0;
			aa !== 0 && QS() && (t = aa);
			for (var i = vt(), r = null, l = Rs; l !== null; ) {
				var c = l.next,
					d = qg(l, i);
				(d === 0
					? ((l.next = null), r === null ? (Rs = c) : (r.next = c), c === null && (jr = r))
					: ((r = l), (t !== 0 || (d & 3) !== 0) && (Ns = !0)),
					(l = c));
			}
			((Mt !== 0 && Mt !== 5) || Ku(t, !1), aa !== 0 && (aa = 0));
		}
		function qg(t, i) {
			for (
				var r = t.suspendedLanes, l = t.pingedLanes, c = t.expirationTimes, d = t.pendingLanes & -62914561;
				0 < d;
			) {
				var v = 31 - qe(d),
					w = 1 << v,
					k = c[v];
				(k === -1 ? ((w & r) === 0 || (w & l) !== 0) && (c[v] = oe(w, i)) : k <= i && (t.expiredLanes |= w), (d &= ~w));
			}
			if (
				((i = Xe),
				(r = ke),
				(r = Ta(t, t === i ? r : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				(l = t.callbackNode),
				r === 0 || (t === i && (He === 2 || He === 9)) || t.cancelPendingCommit !== null)
			)
				return (l !== null && l !== null && Xt(l), (t.callbackNode = null), (t.callbackPriority = 0));
			if ((r & 3) === 0 || F(t, r)) {
				if (((i = r & -r), i === t.callbackPriority)) return i;
				switch ((l !== null && Xt(l), wt(r))) {
					case 2:
					case 8:
						r = tr;
						break;
					case 32:
						r = wn;
						break;
					case 268435456:
						r = ri;
						break;
					default:
						r = wn;
				}
				return ((l = Ug.bind(null, t)), (r = st(r, l)), (t.callbackPriority = i), (t.callbackNode = r), i);
			}
			return (l !== null && l !== null && Xt(l), (t.callbackPriority = 2), (t.callbackNode = null), 2);
		}
		function Ug(t, i) {
			if (Mt !== 0 && Mt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
			var r = t.callbackNode;
			if (Cs() && t.callbackNode !== r) return null;
			var l = ke;
			return (
				(l = Ta(t, t === Xe ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				l === 0
					? null
					: (bg(t, l, i), qg(t, vt()), t.callbackNode != null && t.callbackNode === r ? Ug.bind(null, t) : null)
			);
		}
		function $g(t, i) {
			if (Cs()) return null;
			bg(t, i, !0);
		}
		function qS() {
			YS(function () {
				(Ie & 6) !== 0 ? st(Ea, LS) : Lg();
			});
		}
		function Rf() {
			if (aa === 0) {
				var t = _r;
				(t === 0 && ((t = et), (et <<= 1), (et & 261888) === 0 && (et = 256)), (aa = t));
			}
			return aa;
		}
		function Bg(t) {
			return t == null || typeof t == "symbol" || typeof t == "boolean"
				? null
				: typeof t == "function"
					? t
					: ql("" + t);
		}
		function Ig(t, i) {
			var r = i.ownerDocument.createElement("input");
			return (
				(r.name = i.name),
				(r.value = i.value),
				t.id && r.setAttribute("form", t.id),
				i.parentNode.insertBefore(r, i),
				(t = new FormData(t)),
				r.parentNode.removeChild(r),
				t
			);
		}
		function US(t, i, r, l, c) {
			if (i === "submit" && r && r.stateNode === c) {
				var d = Bg((c[tn] || null).action),
					v = l.submitter;
				v &&
					((i = (i = v[tn] || null) ? Bg(i.formAction) : v.getAttribute("formAction")),
					i !== null && ((d = i), (v = null)));
				var w = new Il("action", "action", null, l, c);
				t.push({
					event: w,
					listeners: [
						{
							instance: null,
							listener: function () {
								if (l.defaultPrevented) {
									if (aa !== 0) {
										var k = v ? Ig(c, v) : new FormData(c);
										Yc(r, { pending: !0, data: k, method: c.method, action: d }, null, k);
									}
								} else
									typeof d == "function" &&
										(w.preventDefault(),
										(k = v ? Ig(c, v) : new FormData(c)),
										Yc(r, { pending: !0, data: k, method: c.method, action: d }, d, k));
							},
							currentTarget: c,
						},
					],
				});
			}
		}
		for (var Nf = 0; Nf < cc.length; Nf++) {
			var Of = cc[Nf];
			In(Of.toLowerCase(), "on" + (Of[0].toUpperCase() + Of.slice(1)));
		}
		(In(Sm, "onAnimationEnd"),
			In(wm, "onAnimationIteration"),
			In(Em, "onAnimationStart"),
			In("dblclick", "onDoubleClick"),
			In("focusin", "onFocus"),
			In("focusout", "onBlur"),
			In(W_, "onTransitionRun"),
			In(eS, "onTransitionStart"),
			In(tS, "onTransitionCancel"),
			In(Tm, "onTransitionEnd"),
			ur("onMouseEnter", ["mouseout", "mouseover"]),
			ur("onMouseLeave", ["mouseout", "mouseover"]),
			ur("onPointerEnter", ["pointerout", "pointerover"]),
			ur("onPointerLeave", ["pointerout", "pointerover"]),
			xa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
			xa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
			xa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
			xa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
			xa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
			xa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" ")));
		var Xu =
				"abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
					" ",
				),
			$S = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Xu));
		function Zg(t, i) {
			i = (i & 4) !== 0;
			for (var r = 0; r < t.length; r++) {
				var l = t[r],
					c = l.event;
				l = l.listeners;
				e: {
					var d = void 0;
					if (i)
						for (var v = l.length - 1; 0 <= v; v--) {
							var w = l[v],
								k = w.instance,
								Z = w.currentTarget;
							if (((w = w.listener), k !== d && c.isPropagationStopped())) break e;
							((d = w), (c.currentTarget = Z));
							try {
								d(c);
							} catch (K) {
								Vl(K);
							}
							((c.currentTarget = null), (d = k));
						}
					else
						for (v = 0; v < l.length; v++) {
							if (
								((w = l[v]),
								(k = w.instance),
								(Z = w.currentTarget),
								(w = w.listener),
								k !== d && c.isPropagationStopped())
							)
								break e;
							((d = w), (c.currentTarget = Z));
							try {
								d(c);
							} catch (K) {
								Vl(K);
							}
							((c.currentTarget = null), (d = k));
						}
				}
			}
		}
		function Ne(t, i) {
			var r = i[Zo];
			r === void 0 && (r = i[Zo] = new Set());
			var l = t + "__bubble";
			r.has(l) || (Vg(i, t, 2, !1), r.add(l));
		}
		function kf(t, i, r) {
			var l = 0;
			(i && (l |= 4), Vg(r, t, l, i));
		}
		var Os = "_reactListening" + Math.random().toString(36).slice(2);
		function Hg(t) {
			if (!t[Os]) {
				((t[Os] = !0),
					$h.forEach(function (r) {
						r !== "selectionchange" && ($S.has(r) || kf(r, !1, t), kf(r, !0, t));
					}));
				var i = t.nodeType === 9 ? t : t.ownerDocument;
				i === null || i[Os] || ((i[Os] = !0), kf("selectionchange", !1, i));
			}
		}
		function Vg(t, i, r, l) {
			switch (yy(i)) {
				case 2:
					var c = vw;
					break;
				case 8:
					c = gw;
					break;
				default:
					c = Pf;
			}
			((r = c.bind(null, i, r, t)),
				(c = void 0),
				!Fo || (i !== "touchstart" && i !== "touchmove" && i !== "wheel") || (c = !0),
				l
					? c !== void 0
						? t.addEventListener(i, r, { capture: !0, passive: c })
						: t.addEventListener(i, r, !0)
					: c !== void 0
						? t.addEventListener(i, r, { passive: c })
						: t.addEventListener(i, r, !1));
		}
		function Mf(t, i, r, l, c) {
			var d = l;
			if ((i & 1) === 0 && (i & 2) === 0 && l !== null)
				e: for (;;) {
					if (l === null) return;
					var v = l.tag;
					if (v === 3 || v === 4) {
						var w = l.stateNode.containerInfo;
						if (w === c) break;
						if (v === 4)
							for (v = l.return; v !== null; ) {
								var k = v.tag;
								if ((k === 3 || k === 4) && v.stateNode.containerInfo === c) return;
								v = v.return;
							}
						for (; w !== null; ) {
							if (((v = ir(w)), v === null)) return;
							if (((k = v.tag), k === 5 || k === 6 || k === 26 || k === 27)) {
								l = d = v;
								continue e;
							}
							w = w.parentNode;
						}
					}
					l = l.return;
				}
			Fh(function () {
				var Z = d,
					K = Ko(r),
					ee = [];
				e: {
					var H = xm.get(t);
					if (H !== void 0) {
						var Q = Il,
							fe = t;
						switch (t) {
							case "keypress":
								if ($l(r) === 0) break e;
							case "keydown":
							case "keyup":
								Q = L_;
								break;
							case "focusin":
								((fe = "focus"), (Q = tc));
								break;
							case "focusout":
								((fe = "blur"), (Q = tc));
								break;
							case "beforeblur":
							case "afterblur":
								Q = tc;
								break;
							case "click":
								if (r.button === 2) break e;
							case "auxclick":
							case "dblclick":
							case "mousedown":
							case "mousemove":
							case "mouseup":
							case "mouseout":
							case "mouseover":
							case "contextmenu":
								Q = em;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								Q = N_;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								Q = q_;
								break;
							case Sm:
							case wm:
							case Em:
								Q = O_;
								break;
							case Tm:
								Q = U_;
								break;
							case "scroll":
							case "scrollend":
								Q = R_;
								break;
							case "wheel":
								Q = $_;
								break;
							case "copy":
							case "cut":
							case "paste":
								Q = k_;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								Q = nm;
								break;
							case "toggle":
							case "beforetoggle":
								Q = B_;
						}
						var Se = (i & 4) !== 0,
							Ge = !Se && (t === "scroll" || t === "scrollend"),
							L = Se ? (H !== null ? H + "Capture" : null) : H;
						Se = [];
						for (var j = Z, I; j !== null; ) {
							var J = j;
							if (
								((I = J.stateNode),
								(J = J.tag),
								(J !== 5 && J !== 26 && J !== 27) ||
									I === null ||
									L === null ||
									((J = pu(j, L)), J != null && Se.push(Fu(j, J, I))),
								Ge)
							)
								break;
							j = j.return;
						}
						0 < Se.length && ((H = new Q(H, fe, null, r, K)), ee.push({ event: H, listeners: Se }));
					}
				}
				if ((i & 7) === 0) {
					e: {
						if (
							((H = t === "mouseover" || t === "pointerover"),
							(Q = t === "mouseout" || t === "pointerout"),
							H && r !== Go && (fe = r.relatedTarget || r.fromElement) && (ir(fe) || fe[vu]))
						)
							break e;
						if (
							(Q || H) &&
							((H = K.window === K ? K : (H = K.ownerDocument) ? H.defaultView || H.parentWindow : window),
							Q
								? ((fe = r.relatedTarget || r.toElement),
									(Q = Z),
									(fe = fe ? ir(fe) : null),
									fe !== null &&
										((Ge = f(fe)), (Se = fe.tag), fe !== Ge || (Se !== 5 && Se !== 27 && Se !== 6)) &&
										(fe = null))
								: ((Q = null), (fe = Z)),
							Q !== fe)
						) {
							if (
								((Se = em),
								(J = "onMouseLeave"),
								(L = "onMouseEnter"),
								(j = "mouse"),
								(t === "pointerout" || t === "pointerover") &&
									((Se = nm), (J = "onPointerLeave"), (L = "onPointerEnter"), (j = "pointer")),
								(Ge = Q == null ? H : yu(Q)),
								(I = fe == null ? H : yu(fe)),
								(H = new Se(J, j + "leave", Q, r, K)),
								(H.target = Ge),
								(H.relatedTarget = I),
								(J = null),
								ir(K) === Z &&
									((Se = new Se(L, j + "enter", fe, r, K)), (Se.target = I), (Se.relatedTarget = Ge), (J = Se)),
								(Ge = J),
								Q && fe)
							)
								t: {
									for (Se = BS, L = Q, j = fe, I = 0, J = L; J; J = Se(J)) I++;
									J = 0;
									for (var pe = j; pe; pe = Se(pe)) J++;
									for (; 0 < I - J; ) ((L = Se(L)), I--);
									for (; 0 < J - I; ) ((j = Se(j)), J--);
									for (; I--; ) {
										if (L === j || (j !== null && L === j.alternate)) {
											Se = L;
											break t;
										}
										((L = Se(L)), (j = Se(j)));
									}
									Se = null;
								}
							else Se = null;
							(Q !== null && Qg(ee, H, Q, Se, !1), fe !== null && Ge !== null && Qg(ee, Ge, fe, Se, !0));
						}
					}
					e: {
						if (
							((H = Z ? yu(Z) : window),
							(Q = H.nodeName && H.nodeName.toLowerCase()),
							Q === "select" || (Q === "input" && H.type === "file"))
						)
							var Ue = cm;
						else if (sm(H))
							if (fm) Ue = X_;
							else {
								Ue = G_;
								var he = Y_;
							}
						else
							((Q = H.nodeName),
								!Q || Q.toLowerCase() !== "input" || (H.type !== "checkbox" && H.type !== "radio")
									? Z && Yo(Z.elementType) && (Ue = cm)
									: (Ue = K_));
						if (Ue && (Ue = Ue(t, Z))) {
							om(ee, Ue, r, K);
							break e;
						}
						(he && he(t, H, Z),
							t === "focusout" &&
								Z &&
								H.type === "number" &&
								Z.memoizedProps.value != null &&
								Po(H, "number", H.value));
					}
					switch (((he = Z ? yu(Z) : window), t)) {
						case "focusin":
							(sm(he) || he.contentEditable === "true") && ((dr = he), (lc = Z), (Au = null));
							break;
						case "focusout":
							Au = lc = dr = null;
							break;
						case "mousedown":
							sc = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							((sc = !1), bm(ee, r, K));
							break;
						case "selectionchange":
							if (J_) break;
						case "keydown":
						case "keyup":
							bm(ee, r, K);
					}
					var Ae;
					if (ic)
						e: {
							switch (t) {
								case "compositionstart":
									var Me = "onCompositionStart";
									break e;
								case "compositionend":
									Me = "onCompositionEnd";
									break e;
								case "compositionupdate":
									Me = "onCompositionUpdate";
									break e;
							}
							Me = void 0;
						}
					else
						fr
							? um(t, r) && (Me = "onCompositionEnd")
							: t === "keydown" && r.keyCode === 229 && (Me = "onCompositionStart");
					(Me &&
						(im &&
							r.locale !== "ko" &&
							(fr || Me !== "onCompositionStart"
								? Me === "onCompositionEnd" && fr && (Ae = Jh())
								: ((Vi = K), (Jo = "value" in Vi ? Vi.value : Vi.textContent), (fr = !0))),
						(he = ks(Z, Me)),
						0 < he.length &&
							((Me = new tm(Me, t, null, r, K)),
							ee.push({ event: Me, listeners: he }),
							Ae ? (Me.data = Ae) : ((Ae = lm(r)), Ae !== null && (Me.data = Ae)))),
						(Ae = Z_ ? H_(t, r) : V_(t, r)) &&
							((Me = ks(Z, "onBeforeInput")),
							0 < Me.length &&
								((he = new tm("onBeforeInput", "beforeinput", null, r, K)),
								ee.push({ event: he, listeners: Me }),
								(he.data = Ae))),
						US(ee, t, Z, r, K));
				}
				Zg(ee, i);
			});
		}
		function Fu(t, i, r) {
			return { instance: t, listener: i, currentTarget: r };
		}
		function ks(t, i) {
			for (var r = i + "Capture", l = []; t !== null; ) {
				var c = t,
					d = c.stateNode;
				if (
					((c = c.tag),
					(c !== 5 && c !== 26 && c !== 27) ||
						d === null ||
						((c = pu(t, r)), c != null && l.unshift(Fu(t, c, d)), (c = pu(t, i)), c != null && l.push(Fu(t, c, d))),
					t.tag === 3)
				)
					return l;
				t = t.return;
			}
			return [];
		}
		function BS(t) {
			if (t === null) return null;
			do t = t.return;
			while (t && t.tag !== 5 && t.tag !== 27);
			return t || null;
		}
		function Qg(t, i, r, l, c) {
			for (var d = i._reactName, v = []; r !== null && r !== l; ) {
				var w = r,
					k = w.alternate,
					Z = w.stateNode;
				if (((w = w.tag), k !== null && k === l)) break;
				((w !== 5 && w !== 26 && w !== 27) ||
					Z === null ||
					((k = Z),
					c
						? ((Z = pu(r, d)), Z != null && v.unshift(Fu(r, Z, k)))
						: c || ((Z = pu(r, d)), Z != null && v.push(Fu(r, Z, k)))),
					(r = r.return));
			}
			v.length !== 0 && t.push({ event: i, listeners: v });
		}
		var IS = /\r\n?/g,
			ZS = /\u0000|\uFFFD/g;
		function Pg(t) {
			return (typeof t == "string" ? t : "" + t)
				.replace(
					IS,
					`
`,
				)
				.replace(ZS, "");
		}
		function Yg(t, i) {
			return ((i = Pg(i)), Pg(t) === i);
		}
		function Ye(t, i, r, l, c, d) {
			switch (r) {
				case "children":
					typeof l == "string"
						? i === "body" || (i === "textarea" && l === "") || sr(t, l)
						: (typeof l == "number" || typeof l == "bigint") && i !== "body" && sr(t, "" + l);
					break;
				case "className":
					jl(t, "class", l);
					break;
				case "tabIndex":
					jl(t, "tabindex", l);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					jl(t, r, l);
					break;
				case "style":
					Kh(t, l, d);
					break;
				case "data":
					if (i !== "object") {
						jl(t, "data", l);
						break;
					}
				case "src":
				case "href":
					if (l === "" && (i !== "a" || r !== "href")) {
						t.removeAttribute(r);
						break;
					}
					if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
						t.removeAttribute(r);
						break;
					}
					((l = ql("" + l)), t.setAttribute(r, l));
					break;
				case "action":
				case "formAction":
					if (typeof l == "function") {
						t.setAttribute(
							r,
							"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
						);
						break;
					} else
						typeof d == "function" &&
							(r === "formAction"
								? (i !== "input" && Ye(t, i, "name", c.name, c, null),
									Ye(t, i, "formEncType", c.formEncType, c, null),
									Ye(t, i, "formMethod", c.formMethod, c, null),
									Ye(t, i, "formTarget", c.formTarget, c, null))
								: (Ye(t, i, "encType", c.encType, c, null),
									Ye(t, i, "method", c.method, c, null),
									Ye(t, i, "target", c.target, c, null)));
					if (l == null || typeof l == "symbol" || typeof l == "boolean") {
						t.removeAttribute(r);
						break;
					}
					((l = ql("" + l)), t.setAttribute(r, l));
					break;
				case "onClick":
					l != null && (t.onclick = li);
					break;
				case "onScroll":
					l != null && Ne("scroll", t);
					break;
				case "onScrollEnd":
					l != null && Ne("scrollend", t);
					break;
				case "dangerouslySetInnerHTML":
					if (l != null) {
						if (typeof l != "object" || !("__html" in l)) throw Error(s(61));
						if (((r = l.__html), r != null)) {
							if (c.children != null) throw Error(s(60));
							t.innerHTML = r;
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
					((r = ql("" + l)), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", r));
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
						? t.setAttribute(r, "" + l)
						: t.removeAttribute(r);
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
					l && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(r, "") : t.removeAttribute(r);
					break;
				case "capture":
				case "download":
					l === !0
						? t.setAttribute(r, "")
						: l !== !1 && l != null && typeof l != "function" && typeof l != "symbol"
							? t.setAttribute(r, l)
							: t.removeAttribute(r);
					break;
				case "cols":
				case "rows":
				case "size":
				case "span":
					l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l
						? t.setAttribute(r, l)
						: t.removeAttribute(r);
					break;
				case "rowSpan":
				case "start":
					l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l)
						? t.removeAttribute(r)
						: t.setAttribute(r, l);
					break;
				case "popover":
					(Ne("beforetoggle", t), Ne("toggle", t), Dl(t, "popover", l));
					break;
				case "xlinkActuate":
					ui(t, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
					break;
				case "xlinkArcrole":
					ui(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
					break;
				case "xlinkRole":
					ui(t, "http://www.w3.org/1999/xlink", "xlink:role", l);
					break;
				case "xlinkShow":
					ui(t, "http://www.w3.org/1999/xlink", "xlink:show", l);
					break;
				case "xlinkTitle":
					ui(t, "http://www.w3.org/1999/xlink", "xlink:title", l);
					break;
				case "xlinkType":
					ui(t, "http://www.w3.org/1999/xlink", "xlink:type", l);
					break;
				case "xmlBase":
					ui(t, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
					break;
				case "xmlLang":
					ui(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
					break;
				case "xmlSpace":
					ui(t, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
					break;
				case "is":
					Dl(t, "is", l);
					break;
				case "innerText":
				case "textContent":
					break;
				default:
					(!(2 < r.length) || (r[0] !== "o" && r[0] !== "O") || (r[1] !== "n" && r[1] !== "N")) &&
						((r = A_.get(r) || r), Dl(t, r, l));
			}
		}
		function zf(t, i, r, l, c, d) {
			switch (r) {
				case "style":
					Kh(t, l, d);
					break;
				case "dangerouslySetInnerHTML":
					if (l != null) {
						if (typeof l != "object" || !("__html" in l)) throw Error(s(61));
						if (((r = l.__html), r != null)) {
							if (c.children != null) throw Error(s(60));
							t.innerHTML = r;
						}
					}
					break;
				case "children":
					typeof l == "string" ? sr(t, l) : (typeof l == "number" || typeof l == "bigint") && sr(t, "" + l);
					break;
				case "onScroll":
					l != null && Ne("scroll", t);
					break;
				case "onScrollEnd":
					l != null && Ne("scrollend", t);
					break;
				case "onClick":
					l != null && (t.onclick = li);
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
					if (!Bh.hasOwnProperty(r))
						e: {
							if (
								r[0] === "o" &&
								r[1] === "n" &&
								((c = r.endsWith("Capture")),
								(i = r.slice(2, c ? r.length - 7 : void 0)),
								(d = t[tn] || null),
								(d = d != null ? d[r] : null),
								typeof d == "function" && t.removeEventListener(i, d, c),
								typeof l == "function")
							) {
								(typeof d != "function" &&
									d !== null &&
									(r in t ? (t[r] = null) : t.hasAttribute(r) && t.removeAttribute(r)),
									t.addEventListener(i, l, c));
								break e;
							}
							r in t ? (t[r] = l) : l === !0 ? t.setAttribute(r, "") : Dl(t, r, l);
						}
			}
		}
		function Vt(t, i, r) {
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
					(Ne("error", t), Ne("load", t));
					var l = !1,
						c = !1,
						d;
					for (d in r)
						if (r.hasOwnProperty(d)) {
							var v = r[d];
							if (v != null)
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
										Ye(t, i, d, v, r, null);
								}
						}
					(c && Ye(t, i, "srcSet", r.srcSet, r, null), l && Ye(t, i, "src", r.src, r, null));
					return;
				case "input":
					Ne("invalid", t);
					var w = (d = v = c = null),
						k = null,
						Z = null;
					for (l in r)
						if (r.hasOwnProperty(l)) {
							var K = r[l];
							if (K != null)
								switch (l) {
									case "name":
										c = K;
										break;
									case "type":
										v = K;
										break;
									case "checked":
										k = K;
										break;
									case "defaultChecked":
										Z = K;
										break;
									case "value":
										d = K;
										break;
									case "defaultValue":
										w = K;
										break;
									case "children":
									case "dangerouslySetInnerHTML":
										if (K != null) throw Error(s(137, i));
										break;
									default:
										Ye(t, i, l, K, r, null);
								}
						}
					Qh(t, d, w, k, Z, v, c, !1);
					return;
				case "select":
					(Ne("invalid", t), (l = v = d = null));
					for (c in r)
						if (r.hasOwnProperty(c) && ((w = r[c]), w != null))
							switch (c) {
								case "value":
									d = w;
									break;
								case "defaultValue":
									v = w;
									break;
								case "multiple":
									l = w;
								default:
									Ye(t, i, c, w, r, null);
							}
					((i = d), (r = v), (t.multiple = !!l), i != null ? lr(t, !!l, i, !1) : r != null && lr(t, !!l, r, !0));
					return;
				case "textarea":
					(Ne("invalid", t), (d = c = l = null));
					for (v in r)
						if (r.hasOwnProperty(v) && ((w = r[v]), w != null))
							switch (v) {
								case "value":
									l = w;
									break;
								case "defaultValue":
									c = w;
									break;
								case "children":
									d = w;
									break;
								case "dangerouslySetInnerHTML":
									if (w != null) throw Error(s(91));
									break;
								default:
									Ye(t, i, v, w, r, null);
							}
					Yh(t, l, c, d);
					return;
				case "option":
					for (k in r)
						if (r.hasOwnProperty(k) && ((l = r[k]), l != null))
							switch (k) {
								case "selected":
									t.selected = l && typeof l != "function" && typeof l != "symbol";
									break;
								default:
									Ye(t, i, k, l, r, null);
							}
					return;
				case "dialog":
					(Ne("beforetoggle", t), Ne("toggle", t), Ne("cancel", t), Ne("close", t));
					break;
				case "iframe":
				case "object":
					Ne("load", t);
					break;
				case "video":
				case "audio":
					for (l = 0; l < Xu.length; l++) Ne(Xu[l], t);
					break;
				case "image":
					(Ne("error", t), Ne("load", t));
					break;
				case "details":
					Ne("toggle", t);
					break;
				case "embed":
				case "source":
				case "link":
					(Ne("error", t), Ne("load", t));
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
					for (Z in r)
						if (r.hasOwnProperty(Z) && ((l = r[Z]), l != null))
							switch (Z) {
								case "children":
								case "dangerouslySetInnerHTML":
									throw Error(s(137, i));
								default:
									Ye(t, i, Z, l, r, null);
							}
					return;
				default:
					if (Yo(i)) {
						for (K in r) r.hasOwnProperty(K) && ((l = r[K]), l !== void 0 && zf(t, i, K, l, r, void 0));
						return;
					}
			}
			for (w in r) r.hasOwnProperty(w) && ((l = r[w]), l != null && Ye(t, i, w, l, r, null));
		}
		function HS(t, i, r, l) {
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
						v = null,
						w = null,
						k = null,
						Z = null,
						K = null;
					for (Q in r) {
						var ee = r[Q];
						if (r.hasOwnProperty(Q) && ee != null)
							switch (Q) {
								case "checked":
									break;
								case "value":
									break;
								case "defaultValue":
									k = ee;
								default:
									l.hasOwnProperty(Q) || Ye(t, i, Q, null, l, ee);
							}
					}
					for (var H in l) {
						var Q = l[H];
						if (((ee = r[H]), l.hasOwnProperty(H) && (Q != null || ee != null)))
							switch (H) {
								case "type":
									d = Q;
									break;
								case "name":
									c = Q;
									break;
								case "checked":
									Z = Q;
									break;
								case "defaultChecked":
									K = Q;
									break;
								case "value":
									v = Q;
									break;
								case "defaultValue":
									w = Q;
									break;
								case "children":
								case "dangerouslySetInnerHTML":
									if (Q != null) throw Error(s(137, i));
									break;
								default:
									Q !== ee && Ye(t, i, H, Q, l, ee);
							}
					}
					Qo(t, v, w, k, Z, K, d, c);
					return;
				case "select":
					Q = v = w = H = null;
					for (d in r)
						if (((k = r[d]), r.hasOwnProperty(d) && k != null))
							switch (d) {
								case "value":
									break;
								case "multiple":
									Q = k;
								default:
									l.hasOwnProperty(d) || Ye(t, i, d, null, l, k);
							}
					for (c in l)
						if (((d = l[c]), (k = r[c]), l.hasOwnProperty(c) && (d != null || k != null)))
							switch (c) {
								case "value":
									H = d;
									break;
								case "defaultValue":
									w = d;
									break;
								case "multiple":
									v = d;
								default:
									d !== k && Ye(t, i, c, d, l, k);
							}
					((i = w),
						(r = v),
						(l = Q),
						H != null
							? lr(t, !!r, H, !1)
							: !!l != !!r && (i != null ? lr(t, !!r, i, !0) : lr(t, !!r, r ? [] : "", !1)));
					return;
				case "textarea":
					Q = H = null;
					for (w in r)
						if (((c = r[w]), r.hasOwnProperty(w) && c != null && !l.hasOwnProperty(w)))
							switch (w) {
								case "value":
									break;
								case "children":
									break;
								default:
									Ye(t, i, w, null, l, c);
							}
					for (v in l)
						if (((c = l[v]), (d = r[v]), l.hasOwnProperty(v) && (c != null || d != null)))
							switch (v) {
								case "value":
									H = c;
									break;
								case "defaultValue":
									Q = c;
									break;
								case "children":
									break;
								case "dangerouslySetInnerHTML":
									if (c != null) throw Error(s(91));
									break;
								default:
									c !== d && Ye(t, i, v, c, l, d);
							}
					Ph(t, H, Q);
					return;
				case "option":
					for (var fe in r)
						if (((H = r[fe]), r.hasOwnProperty(fe) && H != null && !l.hasOwnProperty(fe)))
							switch (fe) {
								case "selected":
									t.selected = !1;
									break;
								default:
									Ye(t, i, fe, null, l, H);
							}
					for (k in l)
						if (((H = l[k]), (Q = r[k]), l.hasOwnProperty(k) && H !== Q && (H != null || Q != null)))
							switch (k) {
								case "selected":
									t.selected = H && typeof H != "function" && typeof H != "symbol";
									break;
								default:
									Ye(t, i, k, H, l, Q);
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
					for (var Se in r)
						((H = r[Se]), r.hasOwnProperty(Se) && H != null && !l.hasOwnProperty(Se) && Ye(t, i, Se, null, l, H));
					for (Z in l)
						if (((H = l[Z]), (Q = r[Z]), l.hasOwnProperty(Z) && H !== Q && (H != null || Q != null)))
							switch (Z) {
								case "children":
								case "dangerouslySetInnerHTML":
									if (H != null) throw Error(s(137, i));
									break;
								default:
									Ye(t, i, Z, H, l, Q);
							}
					return;
				default:
					if (Yo(i)) {
						for (var Ge in r)
							((H = r[Ge]),
								r.hasOwnProperty(Ge) && H !== void 0 && !l.hasOwnProperty(Ge) && zf(t, i, Ge, void 0, l, H));
						for (K in l)
							((H = l[K]),
								(Q = r[K]),
								!l.hasOwnProperty(K) || H === Q || (H === void 0 && Q === void 0) || zf(t, i, K, H, l, Q));
						return;
					}
			}
			for (var L in r)
				((H = r[L]), r.hasOwnProperty(L) && H != null && !l.hasOwnProperty(L) && Ye(t, i, L, null, l, H));
			for (ee in l)
				((H = l[ee]),
					(Q = r[ee]),
					!l.hasOwnProperty(ee) || H === Q || (H == null && Q == null) || Ye(t, i, ee, H, l, Q));
		}
		function Gg(t) {
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
		function VS() {
			if (typeof performance.getEntriesByType == "function") {
				for (var t = 0, i = 0, r = performance.getEntriesByType("resource"), l = 0; l < r.length; l++) {
					var c = r[l],
						d = c.transferSize,
						v = c.initiatorType,
						w = c.duration;
					if (d && w && Gg(v)) {
						for (v = 0, w = c.responseEnd, l += 1; l < r.length; l++) {
							var k = r[l],
								Z = k.startTime;
							if (Z > w) break;
							var K = k.transferSize,
								ee = k.initiatorType;
							K && Gg(ee) && ((k = k.responseEnd), (v += K * (k < w ? 1 : (w - Z) / (k - Z))));
						}
						if ((--l, (i += (8 * (d + v)) / (c.duration / 1e3)), t++, 10 < t)) break;
					}
				}
				if (0 < t) return i / t / 1e6;
			}
			return navigator.connection && ((t = navigator.connection.downlink), typeof t == "number") ? t : 5;
		}
		var Df = null,
			jf = null;
		function Ms(t) {
			return t.nodeType === 9 ? t : t.ownerDocument;
		}
		function Kg(t) {
			switch (t) {
				case "http://www.w3.org/2000/svg":
					return 1;
				case "http://www.w3.org/1998/Math/MathML":
					return 2;
				default:
					return 0;
			}
		}
		function Xg(t, i) {
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
		function Lf(t, i) {
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
		var qf = null;
		function QS() {
			var t = window.event;
			return t && t.type === "popstate" ? (t === qf ? !1 : ((qf = t), !0)) : ((qf = null), !1);
		}
		var Fg = typeof setTimeout == "function" ? setTimeout : void 0,
			PS = typeof clearTimeout == "function" ? clearTimeout : void 0,
			Jg = typeof Promise == "function" ? Promise : void 0,
			YS =
				typeof queueMicrotask == "function"
					? queueMicrotask
					: typeof Jg < "u"
						? function (t) {
								return Jg.resolve(null).then(t).catch(GS);
							}
						: Fg;
		function GS(t) {
			setTimeout(function () {
				throw t;
			});
		}
		function ra(t) {
			return t === "head";
		}
		function Wg(t, i) {
			var r = i,
				l = 0;
			do {
				var c = r.nextSibling;
				if ((t.removeChild(r), c && c.nodeType === 8))
					if (((r = c.data), r === "/$" || r === "/&")) {
						if (l === 0) {
							(t.removeChild(c), $r(i));
							return;
						}
						l--;
					} else if (r === "$" || r === "$?" || r === "$~" || r === "$!" || r === "&") l++;
					else if (r === "html") Ju(t.ownerDocument.documentElement);
					else if (r === "head") {
						((r = t.ownerDocument.head), Ju(r));
						for (var d = r.firstChild; d; ) {
							var v = d.nextSibling,
								w = d.nodeName;
							(d[gu] ||
								w === "SCRIPT" ||
								w === "STYLE" ||
								(w === "LINK" && d.rel.toLowerCase() === "stylesheet") ||
								r.removeChild(d),
								(d = v));
						}
					} else r === "body" && Ju(t.ownerDocument.body);
				r = c;
			} while (r);
			$r(i);
		}
		function ey(t, i) {
			var r = t;
			t = 0;
			do {
				var l = r.nextSibling;
				if (
					(r.nodeType === 1
						? i
							? ((r._stashedDisplay = r.style.display), (r.style.display = "none"))
							: ((r.style.display = r._stashedDisplay || ""),
								r.getAttribute("style") === "" && r.removeAttribute("style"))
						: r.nodeType === 3 &&
							(i ? ((r._stashedText = r.nodeValue), (r.nodeValue = "")) : (r.nodeValue = r._stashedText || "")),
					l && l.nodeType === 8)
				)
					if (((r = l.data), r === "/$")) {
						if (t === 0) break;
						t--;
					} else (r !== "$" && r !== "$?" && r !== "$~" && r !== "$!") || t++;
				r = l;
			} while (r);
		}
		function Uf(t) {
			var i = t.firstChild;
			for (i && i.nodeType === 10 && (i = i.nextSibling); i; ) {
				var r = i;
				switch (((i = i.nextSibling), r.nodeName)) {
					case "HTML":
					case "HEAD":
					case "BODY":
						(Uf(r), Ho(r));
						continue;
					case "SCRIPT":
					case "STYLE":
						continue;
					case "LINK":
						if (r.rel.toLowerCase() === "stylesheet") continue;
				}
				t.removeChild(r);
			}
		}
		function KS(t, i, r, l) {
			for (; t.nodeType === 1; ) {
				var c = r;
				if (t.nodeName.toLowerCase() !== i.toLowerCase()) {
					if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
				} else if (l) {
					if (!t[gu])
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
				if (((t = Dn(t.nextSibling)), t === null)) break;
			}
			return null;
		}
		function XS(t, i, r) {
			if (i === "") return null;
			for (; t.nodeType !== 3; )
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !r) ||
					((t = Dn(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function ty(t, i) {
			for (; t.nodeType !== 8; )
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i) ||
					((t = Dn(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function $f(t) {
			return t.data === "$?" || t.data === "$~";
		}
		function Bf(t) {
			return t.data === "$!" || (t.data === "$?" && t.ownerDocument.readyState !== "loading");
		}
		function FS(t, i) {
			var r = t.ownerDocument;
			if (t.data === "$~") t._reactRetry = i;
			else if (t.data !== "$?" || r.readyState !== "loading") i();
			else {
				var l = function () {
					(i(), r.removeEventListener("DOMContentLoaded", l));
				};
				(r.addEventListener("DOMContentLoaded", l), (t._reactRetry = l));
			}
		}
		function Dn(t) {
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
		var If = null;
		function ny(t) {
			t = t.nextSibling;
			for (var i = 0; t; ) {
				if (t.nodeType === 8) {
					var r = t.data;
					if (r === "/$" || r === "/&") {
						if (i === 0) return Dn(t.nextSibling);
						i--;
					} else (r !== "$" && r !== "$!" && r !== "$?" && r !== "$~" && r !== "&") || i++;
				}
				t = t.nextSibling;
			}
			return null;
		}
		function iy(t) {
			t = t.previousSibling;
			for (var i = 0; t; ) {
				if (t.nodeType === 8) {
					var r = t.data;
					if (r === "$" || r === "$!" || r === "$?" || r === "$~" || r === "&") {
						if (i === 0) return t;
						i--;
					} else (r !== "/$" && r !== "/&") || i++;
				}
				t = t.previousSibling;
			}
			return null;
		}
		function ay(t, i, r) {
			switch (((i = Ms(r)), t)) {
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
		function Ju(t) {
			for (var i = t.attributes; i.length; ) t.removeAttributeNode(i[0]);
			Ho(t);
		}
		var jn = new Map(),
			ry = new Set();
		function zs(t) {
			return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
		}
		var Ti = V.d;
		V.d = { f: JS, r: WS, D: ew, C: tw, L: nw, m: iw, X: rw, S: aw, M: uw };
		function JS() {
			var t = Ti.f(),
				i = Ts();
			return t || i;
		}
		function WS(t) {
			var i = ar(t);
			i !== null && i.tag === 5 && i.type === "form" ? Tv(i) : Ti.r(t);
		}
		var Lr = typeof document > "u" ? null : document;
		function uy(t, i, r) {
			var l = Lr;
			if (l && typeof i == "string" && i) {
				var c = An(i);
				((c = 'link[rel="' + t + '"][href="' + c + '"]'),
					typeof r == "string" && (c += '[crossorigin="' + r + '"]'),
					ry.has(c) ||
						(ry.add(c),
						(t = { rel: t, crossOrigin: r, href: i }),
						l.querySelector(c) === null &&
							((i = l.createElement("link")), Vt(i, "link", t), qt(i), l.head.appendChild(i))));
			}
		}
		function ew(t) {
			(Ti.D(t), uy("dns-prefetch", t, null));
		}
		function tw(t, i) {
			(Ti.C(t, i), uy("preconnect", t, i));
		}
		function nw(t, i, r) {
			Ti.L(t, i, r);
			var l = Lr;
			if (l && t && i) {
				var c = 'link[rel="preload"][as="' + An(i) + '"]';
				i === "image" && r && r.imageSrcSet
					? ((c += '[imagesrcset="' + An(r.imageSrcSet) + '"]'),
						typeof r.imageSizes == "string" && (c += '[imagesizes="' + An(r.imageSizes) + '"]'))
					: (c += '[href="' + An(t) + '"]');
				var d = c;
				switch (i) {
					case "style":
						d = qr(t);
						break;
					case "script":
						d = Ur(t);
				}
				jn.has(d) ||
					((t = b({ rel: "preload", href: i === "image" && r && r.imageSrcSet ? void 0 : t, as: i }, r)),
					jn.set(d, t),
					l.querySelector(c) !== null ||
						(i === "style" && l.querySelector(Wu(d))) ||
						(i === "script" && l.querySelector(el(d))) ||
						((i = l.createElement("link")), Vt(i, "link", t), qt(i), l.head.appendChild(i)));
			}
		}
		function iw(t, i) {
			Ti.m(t, i);
			var r = Lr;
			if (r && t) {
				var l = i && typeof i.as == "string" ? i.as : "script",
					c = 'link[rel="modulepreload"][as="' + An(l) + '"][href="' + An(t) + '"]',
					d = c;
				switch (l) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script":
						d = Ur(t);
				}
				if (!jn.has(d) && ((t = b({ rel: "modulepreload", href: t }, i)), jn.set(d, t), r.querySelector(c) === null)) {
					switch (l) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script":
							if (r.querySelector(el(d))) return;
					}
					((l = r.createElement("link")), Vt(l, "link", t), qt(l), r.head.appendChild(l));
				}
			}
		}
		function aw(t, i, r) {
			Ti.S(t, i, r);
			var l = Lr;
			if (l && t) {
				var c = rr(l).hoistableStyles,
					d = qr(t);
				i = i || "default";
				var v = c.get(d);
				if (!v) {
					var w = { loading: 0, preload: null };
					if ((v = l.querySelector(Wu(d)))) w.loading = 5;
					else {
						((t = b({ rel: "stylesheet", href: t, "data-precedence": i }, r)), (r = jn.get(d)) && Zf(t, r));
						var k = (v = l.createElement("link"));
						(qt(k),
							Vt(k, "link", t),
							(k._p = new Promise(function (Z, K) {
								((k.onload = Z), (k.onerror = K));
							})),
							k.addEventListener("load", function () {
								w.loading |= 1;
							}),
							k.addEventListener("error", function () {
								w.loading |= 2;
							}),
							(w.loading |= 4),
							Ds(v, i, l));
					}
					((v = { type: "stylesheet", instance: v, count: 1, state: w }), c.set(d, v));
				}
			}
		}
		function rw(t, i) {
			Ti.X(t, i);
			var r = Lr;
			if (r && t) {
				var l = rr(r).hoistableScripts,
					c = Ur(t),
					d = l.get(c);
				d ||
					((d = r.querySelector(el(c))),
					d ||
						((t = b({ src: t, async: !0 }, i)),
						(i = jn.get(c)) && Hf(t, i),
						(d = r.createElement("script")),
						qt(d),
						Vt(d, "link", t),
						r.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					l.set(c, d));
			}
		}
		function uw(t, i) {
			Ti.M(t, i);
			var r = Lr;
			if (r && t) {
				var l = rr(r).hoistableScripts,
					c = Ur(t),
					d = l.get(c);
				d ||
					((d = r.querySelector(el(c))),
					d ||
						((t = b({ src: t, async: !0, type: "module" }, i)),
						(i = jn.get(c)) && Hf(t, i),
						(d = r.createElement("script")),
						qt(d),
						Vt(d, "link", t),
						r.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					l.set(c, d));
			}
		}
		function ly(t, i, r, l) {
			var c = (c = ye.current) ? zs(c) : null;
			if (!c) throw Error(s(446));
			switch (t) {
				case "meta":
				case "title":
					return null;
				case "style":
					return typeof r.precedence == "string" && typeof r.href == "string"
						? ((i = qr(r.href)),
							(r = rr(c).hoistableStyles),
							(l = r.get(i)),
							l || ((l = { type: "style", instance: null, count: 0, state: null }), r.set(i, l)),
							l)
						: { type: "void", instance: null, count: 0, state: null };
				case "link":
					if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
						t = qr(r.href);
						var d = rr(c).hoistableStyles,
							v = d.get(t);
						if (
							(v ||
								((c = c.ownerDocument || c),
								(v = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }),
								d.set(t, v),
								(d = c.querySelector(Wu(t))) && !d._p && ((v.instance = d), (v.state.loading = 5)),
								jn.has(t) ||
									((r = {
										rel: "preload",
										as: "style",
										href: r.href,
										crossOrigin: r.crossOrigin,
										integrity: r.integrity,
										media: r.media,
										hrefLang: r.hrefLang,
										referrerPolicy: r.referrerPolicy,
									}),
									jn.set(t, r),
									d || lw(c, t, r, v.state))),
							i && l === null)
						)
							throw Error(s(528, ""));
						return v;
					}
					if (i && l !== null) throw Error(s(529, ""));
					return null;
				case "script":
					return (
						(i = r.async),
						(r = r.src),
						typeof r == "string" && i && typeof i != "function" && typeof i != "symbol"
							? ((i = Ur(r)),
								(r = rr(c).hoistableScripts),
								(l = r.get(i)),
								l || ((l = { type: "script", instance: null, count: 0, state: null }), r.set(i, l)),
								l)
							: { type: "void", instance: null, count: 0, state: null }
					);
				default:
					throw Error(s(444, t));
			}
		}
		function qr(t) {
			return 'href="' + An(t) + '"';
		}
		function Wu(t) {
			return 'link[rel="stylesheet"][' + t + "]";
		}
		function sy(t) {
			return b({}, t, { "data-precedence": t.precedence, precedence: null });
		}
		function lw(t, i, r, l) {
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
					Vt(i, "link", r),
					qt(i),
					t.head.appendChild(i));
		}
		function Ur(t) {
			return '[src="' + An(t) + '"]';
		}
		function el(t) {
			return "script[async]" + t;
		}
		function oy(t, i, r) {
			if ((i.count++, i.instance === null))
				switch (i.type) {
					case "style":
						var l = t.querySelector('style[data-href~="' + An(r.href) + '"]');
						if (l) return ((i.instance = l), qt(l), l);
						var c = b({}, r, { "data-href": r.href, "data-precedence": r.precedence, href: null, precedence: null });
						return (
							(l = (t.ownerDocument || t).createElement("style")),
							qt(l),
							Vt(l, "style", c),
							Ds(l, r.precedence, t),
							(i.instance = l)
						);
					case "stylesheet":
						c = qr(r.href);
						var d = t.querySelector(Wu(c));
						if (d) return ((i.state.loading |= 4), (i.instance = d), qt(d), d);
						((l = sy(r)), (c = jn.get(c)) && Zf(l, c), (d = (t.ownerDocument || t).createElement("link")), qt(d));
						var v = d;
						return (
							(v._p = new Promise(function (w, k) {
								((v.onload = w), (v.onerror = k));
							})),
							Vt(d, "link", l),
							(i.state.loading |= 4),
							Ds(d, r.precedence, t),
							(i.instance = d)
						);
					case "script":
						return (
							(d = Ur(r.src)),
							(c = t.querySelector(el(d)))
								? ((i.instance = c), qt(c), c)
								: ((l = r),
									(c = jn.get(d)) && ((l = b({}, r)), Hf(l, c)),
									(t = t.ownerDocument || t),
									(c = t.createElement("script")),
									qt(c),
									Vt(c, "link", l),
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
					((l = i.instance), (i.state.loading |= 4), Ds(l, r.precedence, t));
			return i.instance;
		}
		function Ds(t, i, r) {
			for (
				var l = r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
					c = l.length ? l[l.length - 1] : null,
					d = c,
					v = 0;
				v < l.length;
				v++
			) {
				var w = l[v];
				if (w.dataset.precedence === i) d = w;
				else if (d !== c) break;
			}
			d
				? d.parentNode.insertBefore(t, d.nextSibling)
				: ((i = r.nodeType === 9 ? r.head : r), i.insertBefore(t, i.firstChild));
		}
		function Zf(t, i) {
			((t.crossOrigin ??= i.crossOrigin), (t.referrerPolicy ??= i.referrerPolicy), (t.title ??= i.title));
		}
		function Hf(t, i) {
			((t.crossOrigin ??= i.crossOrigin), (t.referrerPolicy ??= i.referrerPolicy), (t.integrity ??= i.integrity));
		}
		var js = null;
		function cy(t, i, r) {
			if (js === null) {
				var l = new Map(),
					c = (js = new Map());
				c.set(r, l);
			} else ((c = js), (l = c.get(r)), l || ((l = new Map()), c.set(r, l)));
			if (l.has(t)) return l;
			for (l.set(t, null), r = r.getElementsByTagName(t), c = 0; c < r.length; c++) {
				var d = r[c];
				if (
					!(d[gu] || d[Bt] || (t === "link" && d.getAttribute("rel") === "stylesheet")) &&
					d.namespaceURI !== "http://www.w3.org/2000/svg"
				) {
					var v = d.getAttribute(i) || "";
					v = t + v;
					var w = l.get(v);
					w ? w.push(d) : l.set(v, [d]);
				}
			}
			return l;
		}
		function fy(t, i, r) {
			((t = t.ownerDocument || t), t.head.insertBefore(r, i === "title" ? t.querySelector("head > title") : null));
		}
		function sw(t, i, r) {
			if (r === 1 || i.itemProp != null) return !1;
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
		function dy(t) {
			return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
		}
		function ow(t, i, r, l) {
			if (
				r.type === "stylesheet" &&
				(typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
				(r.state.loading & 4) === 0
			) {
				if (r.instance === null) {
					var c = qr(l.href),
						d = i.querySelector(Wu(c));
					if (d) {
						((i = d._p),
							i !== null &&
								typeof i == "object" &&
								typeof i.then == "function" &&
								(t.count++, (t = Ls.bind(t)), i.then(t, t)),
							(r.state.loading |= 4),
							(r.instance = d),
							qt(d));
						return;
					}
					((d = i.ownerDocument || i), (l = sy(l)), (c = jn.get(c)) && Zf(l, c), (d = d.createElement("link")), qt(d));
					var v = d;
					((v._p = new Promise(function (w, k) {
						((v.onload = w), (v.onerror = k));
					})),
						Vt(d, "link", l),
						(r.instance = d));
				}
				(t.stylesheets === null && (t.stylesheets = new Map()),
					t.stylesheets.set(r, i),
					(i = r.state.preload) &&
						(r.state.loading & 3) === 0 &&
						(t.count++, (r = Ls.bind(t)), i.addEventListener("load", r), i.addEventListener("error", r)));
			}
		}
		var Vf = 0;
		function cw(t, i) {
			return (
				t.stylesheets && t.count === 0 && Us(t, t.stylesheets),
				0 < t.count || 0 < t.imgCount
					? function (r) {
							var l = setTimeout(function () {
								if ((t.stylesheets && Us(t, t.stylesheets), t.unsuspend)) {
									var d = t.unsuspend;
									((t.unsuspend = null), d());
								}
							}, 6e4 + i);
							0 < t.imgBytes && Vf === 0 && (Vf = 62500 * VS());
							var c = setTimeout(
								function () {
									if (
										((t.waitingForImages = !1), t.count === 0 && (t.stylesheets && Us(t, t.stylesheets), t.unsuspend))
									) {
										var d = t.unsuspend;
										((t.unsuspend = null), d());
									}
								},
								(t.imgBytes > Vf ? 50 : 800) + i,
							);
							return (
								(t.unsuspend = r),
								function () {
									((t.unsuspend = null), clearTimeout(l), clearTimeout(c));
								}
							);
						}
					: null
			);
		}
		function Ls() {
			if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
				if (this.stylesheets) Us(this, this.stylesheets);
				else if (this.unsuspend) {
					var t = this.unsuspend;
					((this.unsuspend = null), t());
				}
			}
		}
		var qs = null;
		function Us(t, i) {
			((t.stylesheets = null),
				t.unsuspend !== null && (t.count++, (qs = new Map()), i.forEach(fw, t), (qs = null), Ls.call(t)));
		}
		function fw(t, i) {
			if (!(i.state.loading & 4)) {
				var r = qs.get(t);
				if (r) var l = r.get(null);
				else {
					((r = new Map()), qs.set(t, r));
					for (var c = t.querySelectorAll("link[data-precedence],style[data-precedence]"), d = 0; d < c.length; d++) {
						var v = c[d];
						(v.nodeName === "LINK" || v.getAttribute("media") !== "not all") &&
							(r.set(v.dataset.precedence, v), (l = v));
					}
					l && r.set(null, l);
				}
				((c = i.instance),
					(v = c.getAttribute("data-precedence")),
					(d = r.get(v) || l),
					d === l && r.set(null, c),
					r.set(v, c),
					this.count++,
					(l = Ls.bind(this)),
					c.addEventListener("load", l),
					c.addEventListener("error", l),
					d
						? d.parentNode.insertBefore(c, d.nextSibling)
						: ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(c, t.firstChild)),
					(i.state.loading |= 4));
			}
		}
		var tl = { $$typeof: C, Provider: null, Consumer: null, _currentValue: re, _currentValue2: re, _threadCount: 0 };
		function dw(t, i, r, l, c, d, v, w, k) {
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
				(this.onRecoverableError = v),
				(this.pooledCache = null),
				(this.pooledCacheLanes = 0),
				(this.formState = k),
				(this.incompleteTransitions = new Map()));
		}
		function hw(t, i, r, l, c, d, v, w, k, Z, K, ee) {
			return (
				(t = new dw(t, i, r, v, k, Z, K, ee, w)),
				(i = 1),
				d === !0 && (i |= 24),
				(d = mn(3, null, null, i)),
				(t.current = d),
				(d.stateNode = t),
				(i = Ec()),
				i.refCount++,
				(t.pooledCache = i),
				i.refCount++,
				(d.memoizedState = { element: l, isDehydrated: r, cache: i }),
				Cc(d),
				t
			);
		}
		function mw(t) {
			return t ? ((t = vr), t) : vr;
		}
		function hy(t, i, r, l, c, d) {
			((c = mw(c)),
				l.context === null ? (l.context = c) : (l.pendingContext = c),
				(l = Ua(i)),
				(l.payload = { element: r }),
				(d = d === void 0 ? null : d),
				d !== null && (l.callback = d),
				(r = $a(t, l, i)),
				r !== null && (sn(r, t, i), zu(r, t, i)));
		}
		function my(t, i) {
			if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
				var r = t.retryLane;
				t.retryLane = r !== 0 && r < i ? r : i;
			}
		}
		function Qf(t, i) {
			(my(t, i), (t = t.alternate) && my(t, i));
		}
		function vy(t) {
			if (t.tag === 13 || t.tag === 31) {
				var i = Na(t, 67108864);
				(i !== null && sn(i, t, 67108864), Qf(t, 67108864));
			}
		}
		function gy(t) {
			if (t.tag === 13 || t.tag === 31) {
				var i = zn();
				i = Gn(i);
				var r = Na(t, i);
				(r !== null && sn(r, t, i), Qf(t, i));
			}
		}
		var $s = !0;
		function vw(t, i, r, l) {
			var c = U.T;
			U.T = null;
			var d = V.p;
			try {
				((V.p = 2), Pf(t, i, r, l));
			} finally {
				((V.p = d), (U.T = c));
			}
		}
		function gw(t, i, r, l) {
			var c = U.T;
			U.T = null;
			var d = V.p;
			try {
				((V.p = 8), Pf(t, i, r, l));
			} finally {
				((V.p = d), (U.T = c));
			}
		}
		function Pf(t, i, r, l) {
			if ($s) {
				var c = Yf(l);
				if (c === null) (Mf(t, i, l, Bs, r), py(t, l));
				else if (pw(c, t, i, r, l)) l.stopPropagation();
				else if ((py(t, l), i & 4 && -1 < yw.indexOf(t))) {
					for (; c !== null; ) {
						var d = ar(c);
						if (d !== null)
							switch (d.tag) {
								case 3:
									if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
										var v = dn(d.pendingLanes);
										if (v !== 0) {
											var w = d;
											for (w.pendingLanes |= 2, w.entangledLanes |= 2; v; ) {
												var k = 1 << (31 - qe(v));
												((w.entanglements[1] |= k), (v &= ~k));
											}
											(Ei(d), (Ie & 6) === 0 && ((ws = vt() + 500), Ku(0, !1)));
										}
									}
									break;
								case 31:
								case 13:
									((w = Na(d, 2)), w !== null && sn(w, d, 2), Ts(), Qf(d, 2));
							}
						if (((d = Yf(l)), d === null && Mf(t, i, l, Bs, r), d === c)) break;
						c = d;
					}
					c !== null && l.stopPropagation();
				} else Mf(t, i, l, null, r);
			}
		}
		function Yf(t) {
			return ((t = Ko(t)), Gf(t));
		}
		var Bs = null;
		function Gf(t) {
			if (((Bs = null), (t = ir(t)), t !== null)) {
				var i = f(t);
				if (i === null) t = null;
				else {
					var r = i.tag;
					if (r === 13) {
						if (((t = h(i)), t !== null)) return t;
						t = null;
					} else if (r === 31) {
						if (((t = m(i)), t !== null)) return t;
						t = null;
					} else if (r === 3) {
						if (i.stateNode.current.memoizedState.isDehydrated) return i.tag === 3 ? i.stateNode.containerInfo : null;
						t = null;
					} else i !== t && (t = null);
				}
			}
			return ((Bs = t), null);
		}
		function yy(t) {
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
					switch (wa()) {
						case Ea:
							return 2;
						case tr:
							return 8;
						case wn:
						case du:
							return 32;
						case ri:
							return 268435456;
						default:
							return 32;
					}
				default:
					return 32;
			}
		}
		var Kf = !1,
			ua = null,
			la = null,
			sa = null,
			nl = new Map(),
			il = new Map(),
			oa = [],
			yw =
				"mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
					" ",
				);
		function py(t, i) {
			switch (t) {
				case "focusin":
				case "focusout":
					ua = null;
					break;
				case "dragenter":
				case "dragleave":
					la = null;
					break;
				case "mouseover":
				case "mouseout":
					sa = null;
					break;
				case "pointerover":
				case "pointerout":
					nl.delete(i.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture":
					il.delete(i.pointerId);
			}
		}
		function al(t, i, r, l, c, d) {
			return t === null || t.nativeEvent !== d
				? ((t = { blockedOn: i, domEventName: r, eventSystemFlags: l, nativeEvent: d, targetContainers: [c] }),
					i !== null && ((i = ar(i)), i !== null && vy(i)),
					t)
				: ((t.eventSystemFlags |= l), (i = t.targetContainers), c !== null && i.indexOf(c) === -1 && i.push(c), t);
		}
		function pw(t, i, r, l, c) {
			switch (i) {
				case "focusin":
					return ((ua = al(ua, t, i, r, l, c)), !0);
				case "dragenter":
					return ((la = al(la, t, i, r, l, c)), !0);
				case "mouseover":
					return ((sa = al(sa, t, i, r, l, c)), !0);
				case "pointerover":
					var d = c.pointerId;
					return (nl.set(d, al(nl.get(d) || null, t, i, r, l, c)), !0);
				case "gotpointercapture":
					return ((d = c.pointerId), il.set(d, al(il.get(d) || null, t, i, r, l, c)), !0);
			}
			return !1;
		}
		function by(t) {
			var i = ir(t.target);
			if (i !== null) {
				var r = f(i);
				if (r !== null) {
					if (((i = r.tag), i === 13)) {
						if (((i = h(r)), i !== null)) {
							((t.blockedOn = i),
								mu(t.priority, function () {
									gy(r);
								}));
							return;
						}
					} else if (i === 31) {
						if (((i = m(r)), i !== null)) {
							((t.blockedOn = i),
								mu(t.priority, function () {
									gy(r);
								}));
							return;
						}
					} else if (i === 3 && r.stateNode.current.memoizedState.isDehydrated) {
						t.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
						return;
					}
				}
			}
			t.blockedOn = null;
		}
		function Is(t) {
			if (t.blockedOn !== null) return !1;
			for (var i = t.targetContainers; 0 < i.length; ) {
				var r = Yf(t.nativeEvent);
				if (r === null) {
					r = t.nativeEvent;
					var l = new r.constructor(r.type, r);
					((Go = l), r.target.dispatchEvent(l), (Go = null));
				} else return ((i = ar(r)), i !== null && vy(i), (t.blockedOn = r), !1);
				i.shift();
			}
			return !0;
		}
		function _y(t, i, r) {
			Is(t) && r.delete(i);
		}
		function bw() {
			((Kf = !1),
				ua !== null && Is(ua) && (ua = null),
				la !== null && Is(la) && (la = null),
				sa !== null && Is(sa) && (sa = null),
				nl.forEach(_y),
				il.forEach(_y));
		}
		function Zs(t, i) {
			t.blockedOn === i &&
				((t.blockedOn = null), Kf || ((Kf = !0), n.unstable_scheduleCallback(n.unstable_NormalPriority, bw)));
		}
		var Hs = null;
		function Sy(t) {
			Hs !== t &&
				((Hs = t),
				n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
					Hs === t && (Hs = null);
					for (var i = 0; i < t.length; i += 3) {
						var r = t[i],
							l = t[i + 1],
							c = t[i + 2];
						if (typeof l != "function") {
							if (Gf(l || r) === null) continue;
							break;
						}
						var d = ar(r);
						d !== null &&
							(t.splice(i, 3), (i -= 3), Yc(d, { pending: !0, data: c, method: r.method, action: l }, l, c));
					}
				}));
		}
		function $r(t) {
			function i(k) {
				return Zs(k, t);
			}
			(ua !== null && Zs(ua, t), la !== null && Zs(la, t), sa !== null && Zs(sa, t), nl.forEach(i), il.forEach(i));
			for (var r = 0; r < oa.length; r++) {
				var l = oa[r];
				l.blockedOn === t && (l.blockedOn = null);
			}
			for (; 0 < oa.length && ((r = oa[0]), r.blockedOn === null); ) (by(r), r.blockedOn === null && oa.shift());
			if (((r = (t.ownerDocument || t).$$reactFormReplay), r != null))
				for (l = 0; l < r.length; l += 3) {
					var c = r[l],
						d = r[l + 1],
						v = c[tn] || null;
					if (typeof d == "function") v || Sy(r);
					else if (v) {
						var w = null;
						if (d && d.hasAttribute("formAction")) {
							if (((c = d), (v = d[tn] || null))) w = v.formAction;
							else if (Gf(c) !== null) continue;
						} else w = v.action;
						(typeof w == "function" ? (r[l + 1] = w) : (r.splice(l, 3), (l -= 3)), Sy(r));
					}
				}
		}
		function _w() {
			function t(d) {
				d.canIntercept &&
					d.info === "react-transition" &&
					d.intercept({
						handler: function () {
							return new Promise(function (v) {
								return (c = v);
							});
						},
						focusReset: "manual",
						scroll: "manual",
					});
			}
			function i() {
				(c !== null && (c(), (c = null)), l || setTimeout(r, 20));
			}
			function r() {
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
					setTimeout(r, 100),
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
		function Xf(t) {
			this._internalRoot = t;
		}
		((Ff.prototype.render = Xf.prototype.render =
			function (t) {
				var i = this._internalRoot;
				if (i === null) throw Error(s(409));
				var r = i.current;
				hy(r, zn(), t, i, null, null);
			}),
			(Ff.prototype.unmount = Xf.prototype.unmount =
				function () {
					var t = this._internalRoot;
					if (t !== null) {
						this._internalRoot = null;
						var i = t.containerInfo;
						(hy(t.current, 2, null, t, null, null), Ts(), (i[vu] = null));
					}
				}));
		function Ff(t) {
			this._internalRoot = t;
		}
		Ff.prototype.unstable_scheduleHydration = function (t) {
			if (t) {
				var i = hu();
				t = { blockedOn: null, target: t, priority: i };
				for (var r = 0; r < oa.length && i !== 0 && i < oa[r].priority; r++);
				(oa.splice(r, 0, t), r === 0 && by(t));
			}
		};
		var wy = a.version;
		if (wy !== "19.2.8") throw Error(s(527, wy, "19.2.8"));
		V.findDOMNode = function (t) {
			var i = t._reactInternals;
			if (i === void 0)
				throw typeof t.render == "function" ? Error(s(188)) : ((t = Object.keys(t).join(",")), Error(s(268, t)));
			return ((t = y(i)), (t = t !== null ? S(t) : null), (t = t === null ? null : t.stateNode), t);
		};
		var Sw = {
			bundleType: 0,
			version: "19.2.8",
			rendererPackageName: "react-dom",
			currentDispatcherRef: U,
			reconcilerVersion: "19.2.8",
		};
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
			var Vs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (!Vs.isDisabled && Vs.supportsFiber)
				try {
					((me = Vs.inject(Sw)), (be = Vs));
				} catch {}
		}
		e.createRoot = function (t, i) {
			if (!o(t)) throw Error(s(299));
			var r = !1,
				l = "",
				c = gS,
				d = yS,
				v = pS;
			return (
				i != null &&
					(i.unstable_strictMode === !0 && (r = !0),
					i.identifierPrefix !== void 0 && (l = i.identifierPrefix),
					i.onUncaughtError !== void 0 && (c = i.onUncaughtError),
					i.onCaughtError !== void 0 && (d = i.onCaughtError),
					i.onRecoverableError !== void 0 && (v = i.onRecoverableError)),
				(i = hw(t, 1, !1, null, null, r, l, null, c, d, v, _w)),
				(t[vu] = i.current),
				Hg(t),
				new Xf(i)
			);
		};
	}),
	hE = $n((e, n) => {
		function a() {
			if (
				!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")
			)
				try {
					__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
				} catch (u) {
					console.error(u);
				}
		}
		(a(), (n.exports = dE()));
	}),
	Py;
function W(e, n, a) {
	function u(h, m) {
		if (
			(h._zod || Object.defineProperty(h, "_zod", { value: { def: m, constr: f, traits: new Set() }, enumerable: !1 }),
			h._zod.traits.has(e))
		)
			return;
		(h._zod.traits.add(e), n(h, m));
		const g = f.prototype,
			y = Object.keys(g);
		for (let S = 0; S < y.length; S++) {
			const b = y[S];
			b in h || (h[b] = g[b].bind(h));
		}
	}
	const s = a?.Parent ?? Object;
	class o extends s {}
	Object.defineProperty(o, "name", { value: e });
	function f(h) {
		var m;
		const g = a?.Parent ? new o() : this;
		(u(g, h), (m = g._zod).deferred ?? (m.deferred = []));
		for (const y of g._zod.deferred) y();
		return g;
	}
	return (
		Object.defineProperty(f, "init", { value: u }),
		Object.defineProperty(f, Symbol.hasInstance, {
			value: (h) => (a?.Parent && h instanceof a.Parent ? !0 : h?._zod?.traits?.has(e)),
		}),
		Object.defineProperty(f, "name", { value: e }),
		f
	);
}
var Xr = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	},
	S0 = class extends Error {
		constructor(e) {
			(super(`Encountered unidirectional transform during encode: ${e}`), (this.name = "ZodEncodeError"));
		}
	};
(Py = globalThis).__zod_globalConfig ?? (Py.__zod_globalConfig = {});
var oo = globalThis.__zod_globalConfig;
function Mi(e) {
	return (e && Object.assign(oo, e), oo);
}
function w0(e) {
	const n = Object.values(e).filter((a) => typeof a == "number");
	return Object.entries(e)
		.filter(([a, u]) => n.indexOf(+a) === -1)
		.map(([a, u]) => u);
}
function Cd(e, n) {
	return typeof n == "bigint" ? n.toString() : n;
}
function Vd(e) {
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
function Qd(e) {
	return e == null;
}
function Pd(e) {
	const n = e.startsWith("^") ? 1 : 0,
		a = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(n, a);
}
function mE(e, n) {
	const a = e / n,
		u = Math.round(a),
		s = Number.EPSILON * Math.max(Math.abs(a), 1);
	return Math.abs(a - u) < s ? 0 : a - u;
}
var Yy = Symbol("evaluating");
function Ke(e, n, a) {
	let u;
	Object.defineProperty(e, n, {
		get() {
			if (u !== Yy) return (u === void 0 && ((u = Yy), (u = a())), u);
		},
		set(s) {
			Object.defineProperty(e, n, { value: s });
		},
		configurable: !0,
	});
}
function Wa(e, n, a) {
	Object.defineProperty(e, n, { value: a, writable: !0, enumerable: !0, configurable: !0 });
}
function ba(...e) {
	const n = {};
	for (const a of e) {
		const u = Object.getOwnPropertyDescriptors(a);
		Object.assign(n, u);
	}
	return Object.defineProperties({}, n);
}
function Gy(e) {
	return JSON.stringify(e);
}
function vE(e) {
	return e
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}
var E0 = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function co(e) {
	return typeof e == "object" && e !== null && !Array.isArray(e);
}
var gE = Vd(() => {
	if (oo.jitless || (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))) return !1;
	try {
		return !1;
	} catch {
		return !1;
	}
});
function tu(e) {
	if (co(e) === !1) return !1;
	const n = e.constructor;
	if (n === void 0 || typeof n != "function") return !0;
	const a = n.prototype;
	return !(co(a) === !1 || Object.prototype.hasOwnProperty.call(a, "isPrototypeOf") === !1);
}
function T0(e) {
	return tu(e)
		? { ...e }
		: Array.isArray(e)
			? [...e]
			: e instanceof Map
				? new Map(e)
				: e instanceof Set
					? new Set(e)
					: e;
}
var yE = new Set(["string", "number", "symbol"]);
function nu(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function _a(e, n, a) {
	const u = new e._zod.constr(n ?? e._zod.def);
	return ((!n || a?.parent) && (u._zod.parent = e), u);
}
function ve(e) {
	const n = e;
	if (!n) return {};
	if (typeof n == "string") return { error: () => n };
	if (n?.message !== void 0) {
		if (n?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
		n.error = n.message;
	}
	return (delete n.message, typeof n.error == "string" ? { ...n, error: () => n.error } : n);
}
function pE(e) {
	return Object.keys(e).filter((n) => e[n]._zod.optin === "optional" && e[n]._zod.optout === "optional");
}
var bE = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
function _E(e, n) {
	const a = e._zod.def,
		u = a.checks;
	if (u && u.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	return _a(
		e,
		ba(e._zod.def, {
			get shape() {
				const s = {};
				for (const o in n) {
					if (!(o in a.shape)) throw new Error(`Unrecognized key: "${o}"`);
					n[o] && (s[o] = a.shape[o]);
				}
				return (Wa(this, "shape", s), s);
			},
			checks: [],
		}),
	);
}
function SE(e, n) {
	const a = e._zod.def,
		u = a.checks;
	if (u && u.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	return _a(
		e,
		ba(e._zod.def, {
			get shape() {
				const s = { ...e._zod.def.shape };
				for (const o in n) {
					if (!(o in a.shape)) throw new Error(`Unrecognized key: "${o}"`);
					n[o] && delete s[o];
				}
				return (Wa(this, "shape", s), s);
			},
			checks: [],
		}),
	);
}
function wE(e, n) {
	if (!tu(n)) throw new Error("Invalid input to extend: expected a plain object");
	const a = e._zod.def.checks;
	if (a && a.length > 0) {
		const u = e._zod.def.shape;
		for (const s in n)
			if (Object.getOwnPropertyDescriptor(u, s) !== void 0)
				throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return _a(
		e,
		ba(e._zod.def, {
			get shape() {
				const u = { ...e._zod.def.shape, ...n };
				return (Wa(this, "shape", u), u);
			},
		}),
	);
}
function EE(e, n) {
	if (!tu(n)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return _a(
		e,
		ba(e._zod.def, {
			get shape() {
				const a = { ...e._zod.def.shape, ...n };
				return (Wa(this, "shape", a), a);
			},
		}),
	);
}
function TE(e, n) {
	if (e._zod.def.checks?.length)
		throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return _a(
		e,
		ba(e._zod.def, {
			get shape() {
				const a = { ...e._zod.def.shape, ...n._zod.def.shape };
				return (Wa(this, "shape", a), a);
			},
			get catchall() {
				return n._zod.def.catchall;
			},
			checks: n._zod.def.checks ?? [],
		}),
	);
}
function xE(e, n, a) {
	const u = n._zod.def.checks;
	if (u && u.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
	return _a(
		n,
		ba(n._zod.def, {
			get shape() {
				const s = n._zod.def.shape,
					o = { ...s };
				if (a)
					for (const f in a) {
						if (!(f in s)) throw new Error(`Unrecognized key: "${f}"`);
						a[f] && (o[f] = e ? new e({ type: "optional", innerType: s[f] }) : s[f]);
					}
				else for (const f in s) o[f] = e ? new e({ type: "optional", innerType: s[f] }) : s[f];
				return (Wa(this, "shape", o), o);
			},
			checks: [],
		}),
	);
}
function AE(e, n, a) {
	return _a(
		n,
		ba(n._zod.def, {
			get shape() {
				const u = n._zod.def.shape,
					s = { ...u };
				if (a)
					for (const o in a) {
						if (!(o in s)) throw new Error(`Unrecognized key: "${o}"`);
						a[o] && (s[o] = new e({ type: "nonoptional", innerType: u[o] }));
					}
				else for (const o in u) s[o] = new e({ type: "nonoptional", innerType: u[o] });
				return (Wa(this, "shape", s), s);
			},
		}),
	);
}
function Pr(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let a = n; a < e.issues.length; a++) if (e.issues[a]?.continue !== !0) return !0;
	return !1;
}
function CE(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let a = n; a < e.issues.length; a++) if (e.issues[a]?.continue === !1) return !0;
	return !1;
}
function Yr(e, n) {
	return n.map((a) => {
		var u;
		return ((u = a).path ?? (u.path = []), a.path.unshift(e), a);
	});
}
function Gs(e) {
	return typeof e == "string" ? e : e?.message;
}
function zi(e, n, a) {
	const u = e.message
			? e.message
			: (Gs(e.inst?._zod.def?.error?.(e)) ??
				Gs(n?.error?.(e)) ??
				Gs(a.customError?.(e)) ??
				Gs(a.localeError?.(e)) ??
				"Invalid input"),
		{ inst: s, continue: o, input: f, ...h } = e;
	return (h.path ?? (h.path = []), (h.message = u), n?.reportInput && (h.input = f), h);
}
function Yd(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function ml(...e) {
	const [n, a, u] = e;
	return typeof n == "string" ? { message: n, code: "custom", input: a, inst: u } : { ...n };
}
var x0 = (e, n) => {
		((e.name = "$ZodError"),
			Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
			Object.defineProperty(e, "issues", { value: n, enumerable: !1 }),
			(e.message = JSON.stringify(n, Cd, 2)),
			Object.defineProperty(e, "toString", { value: () => e.message, enumerable: !1 }));
	},
	A0 = W("$ZodError", x0),
	C0 = W("$ZodError", x0, { Parent: Error });
function RE(e, n = (a) => a.message) {
	const a = {},
		u = [];
	for (const s of e.issues)
		s.path.length > 0 ? ((a[s.path[0]] = a[s.path[0]] || []), a[s.path[0]].push(n(s))) : u.push(n(s));
	return { formErrors: u, fieldErrors: a };
}
function NE(e, n = (a) => a.message) {
	const a = { _errors: [] },
		u = (s, o = []) => {
			for (const f of s.issues)
				if (f.code === "invalid_union" && f.errors.length) f.errors.map((h) => u({ issues: h }, [...o, ...f.path]));
				else if (f.code === "invalid_key") u({ issues: f.issues }, [...o, ...f.path]);
				else if (f.code === "invalid_element") u({ issues: f.issues }, [...o, ...f.path]);
				else {
					const h = [...o, ...f.path];
					if (h.length === 0) a._errors.push(n(f));
					else {
						let m = a,
							g = 0;
						for (; g < h.length; ) {
							const y = h[g];
							(g !== h.length - 1
								? (m[y] = m[y] || { _errors: [] })
								: ((m[y] = m[y] || { _errors: [] }), m[y]._errors.push(n(f))),
								(m = m[y]),
								g++);
						}
					}
				}
		};
	return (u(e), a);
}
var Gd = (e) => (n, a, u, s) => {
		const o = u ? { ...u, async: !1 } : { async: !1 },
			f = n._zod.run({ value: a, issues: [] }, o);
		if (f instanceof Promise) throw new Xr();
		if (f.issues.length) {
			const h = new (s?.Err ?? e)(f.issues.map((m) => zi(m, o, Mi())));
			throw (E0(h, s?.callee), h);
		}
		return f.value;
	},
	Kd = (e) => async (n, a, u, s) => {
		const o = u ? { ...u, async: !0 } : { async: !0 };
		let f = n._zod.run({ value: a, issues: [] }, o);
		if ((f instanceof Promise && (f = await f), f.issues.length)) {
			const h = new (s?.Err ?? e)(f.issues.map((m) => zi(m, o, Mi())));
			throw (E0(h, s?.callee), h);
		}
		return f.value;
	},
	To = (e) => (n, a, u) => {
		const s = u ? { ...u, async: !1 } : { async: !1 },
			o = n._zod.run({ value: a, issues: [] }, s);
		if (o instanceof Promise) throw new Xr();
		return o.issues.length
			? { success: !1, error: new (e ?? A0)(o.issues.map((f) => zi(f, s, Mi()))) }
			: { success: !0, data: o.value };
	},
	OE = To(C0),
	xo = (e) => async (n, a, u) => {
		const s = u ? { ...u, async: !0 } : { async: !0 };
		let o = n._zod.run({ value: a, issues: [] }, s);
		return (
			o instanceof Promise && (o = await o),
			o.issues.length
				? { success: !1, error: new e(o.issues.map((f) => zi(f, s, Mi()))) }
				: { success: !0, data: o.value }
		);
	},
	kE = xo(C0),
	ME = (e) => (n, a, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Gd(e)(n, a, s);
	},
	zE = (e) => (n, a, u) => Gd(e)(n, a, u),
	DE = (e) => async (n, a, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Kd(e)(n, a, s);
	},
	jE = (e) => async (n, a, u) => Kd(e)(n, a, u),
	LE = (e) => (n, a, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return To(e)(n, a, s);
	},
	qE = (e) => (n, a, u) => To(e)(n, a, u),
	UE = (e) => async (n, a, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return xo(e)(n, a, s);
	},
	$E = (e) => async (n, a, u) => xo(e)(n, a, u),
	BE = /^[cC][0-9a-z]{6,}$/,
	IE = /^[0-9a-z]+$/,
	ZE = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
	HE = /^[0-9a-vA-V]{20}$/,
	VE = /^[A-Za-z0-9]{27}$/,
	QE = /^[a-zA-Z0-9_-]{21}$/,
	PE = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
	YE = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
	Ky = (e) =>
		e
			? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`)
			: /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
	GE = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
	KE = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function XE() {
	return new RegExp(KE, "u");
}
var FE =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	JE =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
	WE =
		/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
	eT =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	tT = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
	R0 = /^[A-Za-z0-9_-]*$/,
	nT = /^https?$/,
	iT = /^\+[1-9]\d{6,14}$/,
	N0 =
		"(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
	aT = new RegExp(`^${N0}$`);
function O0(e) {
	const n = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number"
		? e.precision === -1
			? `${n}`
			: e.precision === 0
				? `${n}:[0-5]\\d`
				: `${n}:[0-5]\\d\\.\\d{${e.precision}}`
		: `${n}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function rT(e) {
	return new RegExp(`^${O0(e)}$`);
}
function uT(e) {
	const n = O0({ precision: e.precision }),
		a = ["Z"];
	(e.local && a.push(""), e.offset && a.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)"));
	const u = `${n}(?:${a.join("|")})`;
	return new RegExp(`^${N0}T(?:${u})$`);
}
var lT = (e) => {
		const n = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
		return new RegExp(`^${n}$`);
	},
	sT = /^-?\d+$/,
	k0 = /^-?\d+(?:\.\d+)?$/,
	oT = /^(?:true|false)$/i,
	cT = /^[^A-Z]*$/,
	fT = /^[^a-z]*$/,
	fn = W("$ZodCheck", (e, n) => {
		var a;
		(e._zod ?? (e._zod = {}), (e._zod.def = n), (a = e._zod).onattach ?? (a.onattach = []));
	}),
	M0 = { number: "number", bigint: "bigint", object: "date" },
	z0 = W("$ZodCheckLessThan", (e, n) => {
		fn.init(e, n);
		const a = M0[typeof n.value];
		(e._zod.onattach.push((u) => {
			const s = u._zod.bag,
				o = (n.inclusive ? s.maximum : s.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
			n.value < o && (n.inclusive ? (s.maximum = n.value) : (s.exclusiveMaximum = n.value));
		}),
			(e._zod.check = (u) => {
				(n.inclusive ? u.value <= n.value : u.value < n.value) ||
					u.issues.push({
						origin: a,
						code: "too_big",
						maximum: typeof n.value == "object" ? n.value.getTime() : n.value,
						input: u.value,
						inclusive: n.inclusive,
						inst: e,
						continue: !n.abort,
					});
			}));
	}),
	D0 = W("$ZodCheckGreaterThan", (e, n) => {
		fn.init(e, n);
		const a = M0[typeof n.value];
		(e._zod.onattach.push((u) => {
			const s = u._zod.bag,
				o = (n.inclusive ? s.minimum : s.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
			n.value > o && (n.inclusive ? (s.minimum = n.value) : (s.exclusiveMinimum = n.value));
		}),
			(e._zod.check = (u) => {
				(n.inclusive ? u.value >= n.value : u.value > n.value) ||
					u.issues.push({
						origin: a,
						code: "too_small",
						minimum: typeof n.value == "object" ? n.value.getTime() : n.value,
						input: u.value,
						inclusive: n.inclusive,
						inst: e,
						continue: !n.abort,
					});
			}));
	}),
	dT = W("$ZodCheckMultipleOf", (e, n) => {
		(fn.init(e, n),
			e._zod.onattach.push((a) => {
				var u;
				(u = a._zod.bag).multipleOf ?? (u.multipleOf = n.value);
			}),
			(e._zod.check = (a) => {
				if (typeof a.value != typeof n.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				(typeof a.value == "bigint" ? a.value % n.value === BigInt(0) : mE(a.value, n.value) === 0) ||
					a.issues.push({
						origin: typeof a.value,
						code: "not_multiple_of",
						divisor: n.value,
						input: a.value,
						inst: e,
						continue: !n.abort,
					});
			}));
	}),
	hT = W("$ZodCheckNumberFormat", (e, n) => {
		(fn.init(e, n), (n.format = n.format || "float64"));
		const a = n.format?.includes("int"),
			u = a ? "int" : "number",
			[s, o] = bE[n.format];
		(e._zod.onattach.push((f) => {
			const h = f._zod.bag;
			((h.format = n.format), (h.minimum = s), (h.maximum = o), a && (h.pattern = sT));
		}),
			(e._zod.check = (f) => {
				const h = f.value;
				if (a) {
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
	mT = W("$ZodCheckMaxLength", (e, n) => {
		var a;
		(fn.init(e, n),
			(a = e._zod.def).when ??
				(a.when = (u) => {
					const s = u.value;
					return !Qd(s) && s.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
				n.maximum < s && (u._zod.bag.maximum = n.maximum);
			}),
			(e._zod.check = (u) => {
				const s = u.value;
				if (s.length <= n.maximum) return;
				const o = Yd(s);
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
	vT = W("$ZodCheckMinLength", (e, n) => {
		var a;
		(fn.init(e, n),
			(a = e._zod.def).when ??
				(a.when = (u) => {
					const s = u.value;
					return !Qd(s) && s.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
				n.minimum > s && (u._zod.bag.minimum = n.minimum);
			}),
			(e._zod.check = (u) => {
				const s = u.value;
				if (s.length >= n.minimum) return;
				const o = Yd(s);
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
	gT = W("$ZodCheckLengthEquals", (e, n) => {
		var a;
		(fn.init(e, n),
			(a = e._zod.def).when ??
				(a.when = (u) => {
					const s = u.value;
					return !Qd(s) && s.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag;
				((s.minimum = n.length), (s.maximum = n.length), (s.length = n.length));
			}),
			(e._zod.check = (u) => {
				const s = u.value,
					o = s.length;
				if (o === n.length) return;
				const f = Yd(s),
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
	Ao = W("$ZodCheckStringFormat", (e, n) => {
		var a, u;
		(fn.init(e, n),
			e._zod.onattach.push((s) => {
				const o = s._zod.bag;
				((o.format = n.format), n.pattern && (o.patterns ?? (o.patterns = new Set()), o.patterns.add(n.pattern)));
			}),
			n.pattern
				? ((a = e._zod).check ??
					(a.check = (s) => {
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
	yT = W("$ZodCheckRegex", (e, n) => {
		(Ao.init(e, n),
			(e._zod.check = (a) => {
				((n.pattern.lastIndex = 0),
					!n.pattern.test(a.value) &&
						a.issues.push({
							origin: "string",
							code: "invalid_format",
							format: "regex",
							input: a.value,
							pattern: n.pattern.toString(),
							inst: e,
							continue: !n.abort,
						}));
			}));
	}),
	pT = W("$ZodCheckLowerCase", (e, n) => {
		(n.pattern ?? (n.pattern = cT), Ao.init(e, n));
	}),
	bT = W("$ZodCheckUpperCase", (e, n) => {
		(n.pattern ?? (n.pattern = fT), Ao.init(e, n));
	}),
	_T = W("$ZodCheckIncludes", (e, n) => {
		fn.init(e, n);
		const a = nu(n.includes),
			u = new RegExp(typeof n.position == "number" ? `^.{${n.position}}${a}` : a);
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
	ST = W("$ZodCheckStartsWith", (e, n) => {
		fn.init(e, n);
		const a = new RegExp(`^${nu(n.prefix)}.*`);
		(n.pattern ?? (n.pattern = a),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag;
				(s.patterns ?? (s.patterns = new Set()), s.patterns.add(a));
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
	wT = W("$ZodCheckEndsWith", (e, n) => {
		fn.init(e, n);
		const a = new RegExp(`.*${nu(n.suffix)}$`);
		(n.pattern ?? (n.pattern = a),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag;
				(s.patterns ?? (s.patterns = new Set()), s.patterns.add(a));
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
	ET = W("$ZodCheckOverwrite", (e, n) => {
		(fn.init(e, n),
			(e._zod.check = (a) => {
				a.value = n.tx(a.value);
			}));
	}),
	TT = class {
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
				a = Math.min(...n.map((s) => s.length - s.trimStart().length)),
				u = n.map((s) => s.slice(a)).map((s) => " ".repeat(this.indent * 2) + s);
			for (const s of u) this.content.push(s);
		}
		compile() {
			const e = Function,
				n = this?.args,
				a = [...(this?.content ?? [""]).map((u) => `  ${u}`)];
			return new e(
				...n,
				a.join(`
`),
			);
		}
	},
	xT = { major: 4, minor: 4, patch: 3 },
	dt = W("$ZodType", (e, n) => {
		var a;
		(e ?? (e = {}), (e._zod.def = n), (e._zod.bag = e._zod.bag || {}), (e._zod.version = xT));
		const u = [...(e._zod.def.checks ?? [])];
		e._zod.traits.has("$ZodCheck") && u.unshift(e);
		for (const s of u) for (const o of s._zod.onattach) o(e);
		if (u.length === 0)
			((a = e._zod).deferred ?? (a.deferred = []),
				e._zod.deferred?.push(() => {
					e._zod.run = e._zod.parse;
				}));
		else {
			const s = (f, h, m) => {
					let g = Pr(f),
						y;
					for (const S of h) {
						if (S._zod.def.when) {
							if (CE(f) || !S._zod.def.when(f)) continue;
						} else if (g) continue;
						const b = f.issues.length,
							p = S._zod.check(f);
						if (p instanceof Promise && m?.async === !1) throw new Xr();
						if (y || p instanceof Promise)
							y = (y ?? Promise.resolve()).then(async () => {
								(await p, f.issues.length !== b && (g || (g = Pr(f, b))));
							});
						else {
							if (f.issues.length === b) continue;
							g || (g = Pr(f, b));
						}
					}
					return y ? y.then(() => f) : f;
				},
				o = (f, h, m) => {
					if (Pr(f)) return ((f.aborted = !0), f);
					const g = s(h, u, m);
					if (g instanceof Promise) {
						if (m.async === !1) throw new Xr();
						return g.then((y) => e._zod.parse(y, m));
					}
					return e._zod.parse(g, m);
				};
			e._zod.run = (f, h) => {
				if (h.skipChecks) return e._zod.parse(f, h);
				if (h.direction === "backward") {
					const g = e._zod.parse({ value: f.value, issues: [] }, { ...h, skipChecks: !0 });
					return g instanceof Promise ? g.then((y) => o(y, f, h)) : o(g, f, h);
				}
				const m = e._zod.parse(f, h);
				if (m instanceof Promise) {
					if (h.async === !1) throw new Xr();
					return m.then((g) => s(g, u, h));
				}
				return s(m, u, h);
			};
		}
		Ke(e, "~standard", () => ({
			validate: (s) => {
				try {
					const o = OE(e, s);
					return o.success ? { value: o.data } : { issues: o.error?.issues };
				} catch {
					return kE(e, s).then((f) => (f.success ? { value: f.data } : { issues: f.error?.issues }));
				}
			},
			vendor: "zod",
			version: 1,
		}));
	}),
	Xd = W("$ZodString", (e, n) => {
		(dt.init(e, n),
			(e._zod.pattern = [...(e?._zod.bag?.patterns ?? [])].pop() ?? lT(e._zod.bag)),
			(e._zod.parse = (a, u) => {
				if (n.coerce)
					try {
						a.value = String(a.value);
					} catch {}
				return (
					typeof a.value == "string" ||
						a.issues.push({ expected: "string", code: "invalid_type", input: a.value, inst: e }),
					a
				);
			}));
	}),
	ut = W("$ZodStringFormat", (e, n) => {
		(Ao.init(e, n), Xd.init(e, n));
	}),
	AT = W("$ZodGUID", (e, n) => {
		(n.pattern ?? (n.pattern = YE), ut.init(e, n));
	}),
	CT = W("$ZodUUID", (e, n) => {
		if (n.version) {
			const a = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[n.version];
			if (a === void 0) throw new Error(`Invalid UUID version: "${n.version}"`);
			n.pattern ?? (n.pattern = Ky(a));
		} else n.pattern ?? (n.pattern = Ky());
		ut.init(e, n);
	}),
	RT = W("$ZodEmail", (e, n) => {
		(n.pattern ?? (n.pattern = GE), ut.init(e, n));
	}),
	NT = W("$ZodURL", (e, n) => {
		(ut.init(e, n),
			(e._zod.check = (a) => {
				try {
					const u = a.value.trim();
					if (!n.normalize && n.protocol?.source === nT.source && !/^https?:\/\//i.test(u)) {
						a.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid URL format",
							input: a.value,
							inst: e,
							continue: !n.abort,
						});
						return;
					}
					const s = new URL(u);
					(n.hostname &&
						((n.hostname.lastIndex = 0),
						n.hostname.test(s.hostname) ||
							a.issues.push({
								code: "invalid_format",
								format: "url",
								note: "Invalid hostname",
								pattern: n.hostname.source,
								input: a.value,
								inst: e,
								continue: !n.abort,
							})),
						n.protocol &&
							((n.protocol.lastIndex = 0),
							n.protocol.test(s.protocol.endsWith(":") ? s.protocol.slice(0, -1) : s.protocol) ||
								a.issues.push({
									code: "invalid_format",
									format: "url",
									note: "Invalid protocol",
									pattern: n.protocol.source,
									input: a.value,
									inst: e,
									continue: !n.abort,
								})),
						n.normalize ? (a.value = s.href) : (a.value = u));
					return;
				} catch {
					a.issues.push({ code: "invalid_format", format: "url", input: a.value, inst: e, continue: !n.abort });
				}
			}));
	}),
	OT = W("$ZodEmoji", (e, n) => {
		(n.pattern ?? (n.pattern = XE()), ut.init(e, n));
	}),
	kT = W("$ZodNanoID", (e, n) => {
		(n.pattern ?? (n.pattern = QE), ut.init(e, n));
	}),
	MT = W("$ZodCUID", (e, n) => {
		(n.pattern ?? (n.pattern = BE), ut.init(e, n));
	}),
	zT = W("$ZodCUID2", (e, n) => {
		(n.pattern ?? (n.pattern = IE), ut.init(e, n));
	}),
	DT = W("$ZodULID", (e, n) => {
		(n.pattern ?? (n.pattern = ZE), ut.init(e, n));
	}),
	jT = W("$ZodXID", (e, n) => {
		(n.pattern ?? (n.pattern = HE), ut.init(e, n));
	}),
	LT = W("$ZodKSUID", (e, n) => {
		(n.pattern ?? (n.pattern = VE), ut.init(e, n));
	}),
	qT = W("$ZodISODateTime", (e, n) => {
		(n.pattern ?? (n.pattern = uT(n)), ut.init(e, n));
	}),
	UT = W("$ZodISODate", (e, n) => {
		(n.pattern ?? (n.pattern = aT), ut.init(e, n));
	}),
	$T = W("$ZodISOTime", (e, n) => {
		(n.pattern ?? (n.pattern = rT(n)), ut.init(e, n));
	}),
	BT = W("$ZodISODuration", (e, n) => {
		(n.pattern ?? (n.pattern = PE), ut.init(e, n));
	}),
	IT = W("$ZodIPv4", (e, n) => {
		(n.pattern ?? (n.pattern = FE), ut.init(e, n), (e._zod.bag.format = "ipv4"));
	}),
	ZT = W("$ZodIPv6", (e, n) => {
		(n.pattern ?? (n.pattern = JE),
			ut.init(e, n),
			(e._zod.bag.format = "ipv6"),
			(e._zod.check = (a) => {
				try {
					new URL(`http://[${a.value}]`);
				} catch {
					a.issues.push({ code: "invalid_format", format: "ipv6", input: a.value, inst: e, continue: !n.abort });
				}
			}));
	}),
	HT = W("$ZodCIDRv4", (e, n) => {
		(n.pattern ?? (n.pattern = WE), ut.init(e, n));
	}),
	VT = W("$ZodCIDRv6", (e, n) => {
		(n.pattern ?? (n.pattern = eT),
			ut.init(e, n),
			(e._zod.check = (a) => {
				const u = a.value.split("/");
				try {
					if (u.length !== 2) throw new Error();
					const [s, o] = u;
					if (!o) throw new Error();
					const f = Number(o);
					if (`${f}` !== o) throw new Error();
					if (f < 0 || f > 128) throw new Error();
					new URL(`http://[${s}]`);
				} catch {
					a.issues.push({ code: "invalid_format", format: "cidrv6", input: a.value, inst: e, continue: !n.abort });
				}
			}));
	});
function j0(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 !== 0) return !1;
	try {
		return (atob(e), !0);
	} catch {
		return !1;
	}
}
var QT = W("$ZodBase64", (e, n) => {
	(n.pattern ?? (n.pattern = tT),
		ut.init(e, n),
		(e._zod.bag.contentEncoding = "base64"),
		(e._zod.check = (a) => {
			j0(a.value) ||
				a.issues.push({ code: "invalid_format", format: "base64", input: a.value, inst: e, continue: !n.abort });
		}));
});
function PT(e) {
	if (!R0.test(e)) return !1;
	const n = e.replace(/[-_]/g, (a) => (a === "-" ? "+" : "/"));
	return j0(n.padEnd(Math.ceil(n.length / 4) * 4, "="));
}
var YT = W("$ZodBase64URL", (e, n) => {
		(n.pattern ?? (n.pattern = R0),
			ut.init(e, n),
			(e._zod.bag.contentEncoding = "base64url"),
			(e._zod.check = (a) => {
				PT(a.value) ||
					a.issues.push({ code: "invalid_format", format: "base64url", input: a.value, inst: e, continue: !n.abort });
			}));
	}),
	GT = W("$ZodE164", (e, n) => {
		(n.pattern ?? (n.pattern = iT), ut.init(e, n));
	});
function KT(e, n = null) {
	try {
		const a = e.split(".");
		if (a.length !== 3) return !1;
		const [u] = a;
		if (!u) return !1;
		const s = JSON.parse(atob(u));
		return !(("typ" in s && s?.typ !== "JWT") || !s.alg || (n && (!("alg" in s) || s.alg !== n)));
	} catch {
		return !1;
	}
}
var XT = W("$ZodJWT", (e, n) => {
		(ut.init(e, n),
			(e._zod.check = (a) => {
				KT(a.value, n.alg) ||
					a.issues.push({ code: "invalid_format", format: "jwt", input: a.value, inst: e, continue: !n.abort });
			}));
	}),
	L0 = W("$ZodNumber", (e, n) => {
		(dt.init(e, n),
			(e._zod.pattern = e._zod.bag.pattern ?? k0),
			(e._zod.parse = (a, u) => {
				if (n.coerce)
					try {
						a.value = Number(a.value);
					} catch {}
				const s = a.value;
				if (typeof s == "number" && !Number.isNaN(s) && Number.isFinite(s)) return a;
				const o = typeof s == "number" ? (Number.isNaN(s) ? "NaN" : Number.isFinite(s) ? void 0 : "Infinity") : void 0;
				return (
					a.issues.push({ expected: "number", code: "invalid_type", input: s, inst: e, ...(o ? { received: o } : {}) }),
					a
				);
			}));
	}),
	FT = W("$ZodNumberFormat", (e, n) => {
		(hT.init(e, n), L0.init(e, n));
	}),
	JT = W("$ZodBoolean", (e, n) => {
		(dt.init(e, n),
			(e._zod.pattern = oT),
			(e._zod.parse = (a, u) => {
				if (n.coerce)
					try {
						a.value = !!a.value;
					} catch {}
				const s = a.value;
				return (
					typeof s == "boolean" || a.issues.push({ expected: "boolean", code: "invalid_type", input: s, inst: e }),
					a
				);
			}));
	}),
	WT = W("$ZodUnknown", (e, n) => {
		(dt.init(e, n), (e._zod.parse = (a) => a));
	}),
	ex = W("$ZodNever", (e, n) => {
		(dt.init(e, n),
			(e._zod.parse = (a, u) => (
				a.issues.push({ expected: "never", code: "invalid_type", input: a.value, inst: e }),
				a
			)));
	});
function Xy(e, n, a) {
	(e.issues.length && n.issues.push(...Yr(a, e.issues)), (n.value[a] = e.value));
}
var tx = W("$ZodArray", (e, n) => {
	(dt.init(e, n),
		(e._zod.parse = (a, u) => {
			const s = a.value;
			if (!Array.isArray(s)) return (a.issues.push({ expected: "array", code: "invalid_type", input: s, inst: e }), a);
			a.value = Array(s.length);
			const o = [];
			for (let f = 0; f < s.length; f++) {
				const h = s[f],
					m = n.element._zod.run({ value: h, issues: [] }, u);
				m instanceof Promise ? o.push(m.then((g) => Xy(g, a, f))) : Xy(m, a, f);
			}
			return o.length ? Promise.all(o).then(() => a) : a;
		}));
});
function fo(e, n, a, u, s, o) {
	const f = a in u;
	if (e.issues.length) {
		if (s && o && !f) return;
		n.issues.push(...Yr(a, e.issues));
	}
	if (!f && !s) {
		e.issues.length || n.issues.push({ code: "invalid_type", expected: "nonoptional", input: void 0, path: [a] });
		return;
	}
	e.value === void 0 ? f && (n.value[a] = void 0) : (n.value[a] = e.value);
}
function q0(e) {
	const n = Object.keys(e.shape);
	for (const u of n)
		if (!e.shape?.[u]?._zod?.traits?.has("$ZodType"))
			throw new Error(`Invalid element at key "${u}": expected a Zod schema`);
	const a = pE(e.shape);
	return { ...e, keys: n, keySet: new Set(n), numKeys: n.length, optionalKeys: new Set(a) };
}
function U0(e, n, a, u, s, o) {
	const f = [],
		h = s.keySet,
		m = s.catchall._zod,
		g = m.def.type,
		y = m.optin === "optional",
		S = m.optout === "optional";
	for (const b in n) {
		if (b === "__proto__" || h.has(b)) continue;
		if (g === "never") {
			f.push(b);
			continue;
		}
		const p = m.run({ value: n[b], issues: [] }, u);
		p instanceof Promise ? e.push(p.then((E) => fo(E, a, b, n, y, S))) : fo(p, a, b, n, y, S);
	}
	return (
		f.length && a.issues.push({ code: "unrecognized_keys", keys: f, input: n, inst: o }),
		e.length ? Promise.all(e).then(() => a) : a
	);
}
var nx = W("$ZodObject", (e, n) => {
		if ((dt.init(e, n), !Object.getOwnPropertyDescriptor(n, "shape")?.get)) {
			const f = n.shape;
			Object.defineProperty(n, "shape", {
				get: () => {
					const h = { ...f };
					return (Object.defineProperty(n, "shape", { value: h }), h);
				},
			});
		}
		const a = Vd(() => q0(n));
		Ke(e._zod, "propValues", () => {
			const f = n.shape,
				h = {};
			for (const m in f) {
				const g = f[m]._zod;
				if (g.values) {
					h[m] ?? (h[m] = new Set());
					for (const y of g.values) h[m].add(y);
				}
			}
			return h;
		});
		const u = co,
			s = n.catchall;
		let o;
		e._zod.parse = (f, h) => {
			o ?? (o = a.value);
			const m = f.value;
			if (!u(m)) return (f.issues.push({ expected: "object", code: "invalid_type", input: m, inst: e }), f);
			f.value = {};
			const g = [],
				y = o.shape;
			for (const S of o.keys) {
				const b = y[S],
					p = b._zod.optin === "optional",
					E = b._zod.optout === "optional",
					x = b._zod.run({ value: m[S], issues: [] }, h);
				x instanceof Promise ? g.push(x.then((D) => fo(D, f, S, m, p, E))) : fo(x, f, S, m, p, E);
			}
			return s ? U0(g, m, f, h, a.value, e) : g.length ? Promise.all(g).then(() => f) : f;
		};
	}),
	ix = W("$ZodObjectJIT", (e, n) => {
		nx.init(e, n);
		const a = e._zod.parse,
			u = Vd(() => q0(n)),
			s = (b) => {
				const p = new TT(["shape", "payload", "ctx"]),
					E = u.value,
					x = (A) => {
						const C = Gy(A);
						return `shape[${C}]._zod.run({ value: input[${C}], issues: [] }, ctx)`;
					};
				p.write("const input = payload.value;");
				const D = Object.create(null);
				let z = 0;
				for (const A of E.keys) D[A] = `key_${z++}`;
				p.write("const newResult = {};");
				for (const A of E.keys) {
					const C = D[A],
						M = Gy(A),
						G = b[A],
						$ = G?._zod?.optin === "optional",
						q = G?._zod?.optout === "optional";
					(p.write(`const ${C} = ${x(A)};`),
						$ && q
							? p.write(`
        if (${C}.issues.length) {
          if (${M} in input) {
            payload.issues = payload.issues.concat(${C}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${M}, ...iss.path] : [${M}]
            })));
          }
        }
        
        if (${C}.value === undefined) {
          if (${M} in input) {
            newResult[${M}] = undefined;
          }
        } else {
          newResult[${M}] = ${C}.value;
        }
        
      `)
							: $
								? p.write(`
        if (${C}.issues.length) {
          payload.issues = payload.issues.concat(${C}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${M}, ...iss.path] : [${M}]
          })));
        }
        
        if (${C}.value === undefined) {
          if (${M} in input) {
            newResult[${M}] = undefined;
          }
        } else {
          newResult[${M}] = ${C}.value;
        }
        
      `)
								: p.write(`
        const ${C}_present = ${M} in input;
        if (${C}.issues.length) {
          payload.issues = payload.issues.concat(${C}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${M}, ...iss.path] : [${M}]
          })));
        }
        if (!${C}_present && !${C}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${M}]
          });
        }

        if (${C}_present) {
          if (${C}.value === undefined) {
            newResult[${M}] = undefined;
          } else {
            newResult[${M}] = ${C}.value;
          }
        }

      `));
				}
				(p.write("payload.value = newResult;"), p.write("return payload;"));
				const R = p.compile();
				return (A, C) => R(b, A, C);
			};
		let o;
		const f = co,
			h = !oo.jitless,
			g = h && gE.value,
			y = n.catchall;
		let S;
		e._zod.parse = (b, p) => {
			S ?? (S = u.value);
			const E = b.value;
			return f(E)
				? h && g && p?.async === !1 && p.jitless !== !0
					? (o || (o = s(n.shape)), (b = o(b, p)), y ? U0([], E, b, p, S, e) : b)
					: a(b, p)
				: (b.issues.push({ expected: "object", code: "invalid_type", input: E, inst: e }), b);
		};
	});
function Fy(e, n, a, u) {
	for (const o of e) if (o.issues.length === 0) return ((n.value = o.value), n);
	const s = e.filter((o) => !Pr(o));
	return s.length === 1
		? ((n.value = s[0].value), s[0])
		: (n.issues.push({
				code: "invalid_union",
				input: n.value,
				inst: a,
				errors: e.map((o) => o.issues.map((f) => zi(f, u, Mi()))),
			}),
			n);
}
var ax = W("$ZodUnion", (e, n) => {
		(dt.init(e, n),
			Ke(e._zod, "optin", () => (n.options.some((u) => u._zod.optin === "optional") ? "optional" : void 0)),
			Ke(e._zod, "optout", () => (n.options.some((u) => u._zod.optout === "optional") ? "optional" : void 0)),
			Ke(e._zod, "values", () => {
				if (n.options.every((u) => u._zod.values)) return new Set(n.options.flatMap((u) => Array.from(u._zod.values)));
			}),
			Ke(e._zod, "pattern", () => {
				if (n.options.every((u) => u._zod.pattern)) {
					const u = n.options.map((s) => s._zod.pattern);
					return new RegExp(`^(${u.map((s) => Pd(s.source)).join("|")})$`);
				}
			}));
		const a = n.options.length === 1 ? n.options[0]._zod.run : null;
		e._zod.parse = (u, s) => {
			if (a) return a(u, s);
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
			return o ? Promise.all(f).then((h) => Fy(h, u, e, s)) : Fy(f, u, e, s);
		};
	}),
	rx = W("$ZodIntersection", (e, n) => {
		(dt.init(e, n),
			(e._zod.parse = (a, u) => {
				const s = a.value,
					o = n.left._zod.run({ value: s, issues: [] }, u),
					f = n.right._zod.run({ value: s, issues: [] }, u);
				return o instanceof Promise || f instanceof Promise
					? Promise.all([o, f]).then(([h, m]) => Jy(a, h, m))
					: Jy(a, o, f);
			}));
	});
function Rd(e, n) {
	if (e === n) return { valid: !0, data: e };
	if (e instanceof Date && n instanceof Date && +e == +n) return { valid: !0, data: e };
	if (tu(e) && tu(n)) {
		const a = Object.keys(n),
			u = Object.keys(e).filter((o) => a.indexOf(o) !== -1),
			s = { ...e, ...n };
		for (const o of u) {
			const f = Rd(e[o], n[o]);
			if (!f.valid) return { valid: !1, mergeErrorPath: [o, ...f.mergeErrorPath] };
			s[o] = f.data;
		}
		return { valid: !0, data: s };
	}
	if (Array.isArray(e) && Array.isArray(n)) {
		if (e.length !== n.length) return { valid: !1, mergeErrorPath: [] };
		const a = [];
		for (let u = 0; u < e.length; u++) {
			const s = e[u],
				o = n[u],
				f = Rd(s, o);
			if (!f.valid) return { valid: !1, mergeErrorPath: [u, ...f.mergeErrorPath] };
			a.push(f.data);
		}
		return { valid: !0, data: a };
	}
	return { valid: !1, mergeErrorPath: [] };
}
function Jy(e, n, a) {
	const u = new Map();
	let s;
	for (const h of n.issues)
		if (h.code === "unrecognized_keys") {
			s ?? (s = h);
			for (const m of h.keys) (u.has(m) || u.set(m, {}), (u.get(m).l = !0));
		} else e.issues.push(h);
	for (const h of a.issues)
		if (h.code === "unrecognized_keys") for (const m of h.keys) (u.has(m) || u.set(m, {}), (u.get(m).r = !0));
		else e.issues.push(h);
	const o = [...u].filter(([, h]) => h.l && h.r).map(([h]) => h);
	if ((o.length && s && e.issues.push({ ...s, keys: o }), Pr(e))) return e;
	const f = Rd(n.value, a.value);
	if (!f.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(f.mergeErrorPath)}`);
	return ((e.value = f.data), e);
}
var ux = W("$ZodRecord", (e, n) => {
		(dt.init(e, n),
			(e._zod.parse = (a, u) => {
				const s = a.value;
				if (!tu(s)) return (a.issues.push({ expected: "record", code: "invalid_type", input: s, inst: e }), a);
				const o = [],
					f = n.keyType._zod.values;
				if (f) {
					a.value = {};
					const h = new Set();
					for (const g of f)
						if (typeof g == "string" || typeof g == "number" || typeof g == "symbol") {
							h.add(typeof g == "number" ? g.toString() : g);
							const y = n.keyType._zod.run({ value: g, issues: [] }, u);
							if (y instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
							if (y.issues.length) {
								a.issues.push({
									code: "invalid_key",
									origin: "record",
									issues: y.issues.map((p) => zi(p, u, Mi())),
									input: g,
									path: [g],
									inst: e,
								});
								continue;
							}
							const S = y.value,
								b = n.valueType._zod.run({ value: s[g], issues: [] }, u);
							b instanceof Promise
								? o.push(
										b.then((p) => {
											(p.issues.length && a.issues.push(...Yr(g, p.issues)), (a.value[S] = p.value));
										}),
									)
								: (b.issues.length && a.issues.push(...Yr(g, b.issues)), (a.value[S] = b.value));
						}
					let m;
					for (const g in s) h.has(g) || ((m = m ?? []), m.push(g));
					m && m.length > 0 && a.issues.push({ code: "unrecognized_keys", input: s, inst: e, keys: m });
				} else {
					a.value = {};
					for (const h of Reflect.ownKeys(s)) {
						if (h === "__proto__" || !Object.prototype.propertyIsEnumerable.call(s, h)) continue;
						let m = n.keyType._zod.run({ value: h, issues: [] }, u);
						if (m instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
						if (typeof h == "string" && k0.test(h) && m.issues.length) {
							const y = n.keyType._zod.run({ value: Number(h), issues: [] }, u);
							if (y instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
							y.issues.length === 0 && (m = y);
						}
						if (m.issues.length) {
							n.mode === "loose"
								? (a.value[h] = s[h])
								: a.issues.push({
										code: "invalid_key",
										origin: "record",
										issues: m.issues.map((y) => zi(y, u, Mi())),
										input: h,
										path: [h],
										inst: e,
									});
							continue;
						}
						const g = n.valueType._zod.run({ value: s[h], issues: [] }, u);
						g instanceof Promise
							? o.push(
									g.then((y) => {
										(y.issues.length && a.issues.push(...Yr(h, y.issues)), (a.value[m.value] = y.value));
									}),
								)
							: (g.issues.length && a.issues.push(...Yr(h, g.issues)), (a.value[m.value] = g.value));
					}
				}
				return o.length ? Promise.all(o).then(() => a) : a;
			}));
	}),
	lx = W("$ZodEnum", (e, n) => {
		dt.init(e, n);
		const a = w0(n.entries),
			u = new Set(a);
		((e._zod.values = u),
			(e._zod.pattern = new RegExp(
				`^(${a
					.filter((s) => yE.has(typeof s))
					.map((s) => (typeof s == "string" ? nu(s) : s.toString()))
					.join("|")})$`,
			)),
			(e._zod.parse = (s, o) => {
				const f = s.value;
				return (u.has(f) || s.issues.push({ code: "invalid_value", values: a, input: f, inst: e }), s);
			}));
	}),
	sx = W("$ZodLiteral", (e, n) => {
		if ((dt.init(e, n), n.values.length === 0)) throw new Error("Cannot create literal schema with no valid values");
		const a = new Set(n.values);
		((e._zod.values = a),
			(e._zod.pattern = new RegExp(
				`^(${n.values.map((u) => (typeof u == "string" ? nu(u) : u ? nu(u.toString()) : String(u))).join("|")})$`,
			)),
			(e._zod.parse = (u, s) => {
				const o = u.value;
				return (a.has(o) || u.issues.push({ code: "invalid_value", values: n.values, input: o, inst: e }), u);
			}));
	}),
	ox = W("$ZodTransform", (e, n) => {
		(dt.init(e, n),
			(e._zod.optin = "optional"),
			(e._zod.parse = (a, u) => {
				if (u.direction === "backward") throw new S0(e.constructor.name);
				const s = n.transform(a.value, a);
				if (u.async)
					return (s instanceof Promise ? s : Promise.resolve(s)).then((o) => ((a.value = o), (a.fallback = !0), a));
				if (s instanceof Promise) throw new Xr();
				return ((a.value = s), (a.fallback = !0), a);
			}));
	});
function Wy(e, n) {
	return n === void 0 && (e.issues.length || e.fallback) ? { issues: [], value: void 0 } : e;
}
var $0 = W("$ZodOptional", (e, n) => {
		(dt.init(e, n),
			(e._zod.optin = "optional"),
			(e._zod.optout = "optional"),
			Ke(e._zod, "values", () => (n.innerType._zod.values ? new Set([...n.innerType._zod.values, void 0]) : void 0)),
			Ke(e._zod, "pattern", () => {
				const a = n.innerType._zod.pattern;
				return a ? new RegExp(`^(${Pd(a.source)})?$`) : void 0;
			}),
			(e._zod.parse = (a, u) => {
				if (n.innerType._zod.optin === "optional") {
					const s = a.value,
						o = n.innerType._zod.run(a, u);
					return o instanceof Promise ? o.then((f) => Wy(f, s)) : Wy(o, s);
				}
				return a.value === void 0 ? a : n.innerType._zod.run(a, u);
			}));
	}),
	cx = W("$ZodExactOptional", (e, n) => {
		($0.init(e, n),
			Ke(e._zod, "values", () => n.innerType._zod.values),
			Ke(e._zod, "pattern", () => n.innerType._zod.pattern),
			(e._zod.parse = (a, u) => n.innerType._zod.run(a, u)));
	}),
	fx = W("$ZodNullable", (e, n) => {
		(dt.init(e, n),
			Ke(e._zod, "optin", () => n.innerType._zod.optin),
			Ke(e._zod, "optout", () => n.innerType._zod.optout),
			Ke(e._zod, "pattern", () => {
				const a = n.innerType._zod.pattern;
				return a ? new RegExp(`^(${Pd(a.source)}|null)$`) : void 0;
			}),
			Ke(e._zod, "values", () => (n.innerType._zod.values ? new Set([...n.innerType._zod.values, null]) : void 0)),
			(e._zod.parse = (a, u) => (a.value === null ? a : n.innerType._zod.run(a, u))));
	}),
	dx = W("$ZodDefault", (e, n) => {
		(dt.init(e, n),
			(e._zod.optin = "optional"),
			Ke(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (a, u) => {
				if (u.direction === "backward") return n.innerType._zod.run(a, u);
				if (a.value === void 0) return ((a.value = n.defaultValue), a);
				const s = n.innerType._zod.run(a, u);
				return s instanceof Promise ? s.then((o) => ep(o, n)) : ep(s, n);
			}));
	});
function ep(e, n) {
	return (e.value === void 0 && (e.value = n.defaultValue), e);
}
var hx = W("$ZodPrefault", (e, n) => {
		(dt.init(e, n),
			(e._zod.optin = "optional"),
			Ke(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (a, u) => (
				u.direction === "backward" || (a.value === void 0 && (a.value = n.defaultValue)),
				n.innerType._zod.run(a, u)
			)));
	}),
	mx = W("$ZodNonOptional", (e, n) => {
		(dt.init(e, n),
			Ke(e._zod, "values", () => {
				const a = n.innerType._zod.values;
				return a ? new Set([...a].filter((u) => u !== void 0)) : void 0;
			}),
			(e._zod.parse = (a, u) => {
				const s = n.innerType._zod.run(a, u);
				return s instanceof Promise ? s.then((o) => tp(o, e)) : tp(s, e);
			}));
	});
function tp(e, n) {
	return (
		!e.issues.length &&
			e.value === void 0 &&
			e.issues.push({ code: "invalid_type", expected: "nonoptional", input: e.value, inst: n }),
		e
	);
}
var vx = W("$ZodCatch", (e, n) => {
		(dt.init(e, n),
			(e._zod.optin = "optional"),
			Ke(e._zod, "optout", () => n.innerType._zod.optout),
			Ke(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (a, u) => {
				if (u.direction === "backward") return n.innerType._zod.run(a, u);
				const s = n.innerType._zod.run(a, u);
				return s instanceof Promise
					? s.then(
							(o) => (
								(a.value = o.value),
								o.issues.length &&
									((a.value = n.catchValue({
										...a,
										error: { issues: o.issues.map((f) => zi(f, u, Mi())) },
										input: a.value,
									})),
									(a.issues = []),
									(a.fallback = !0)),
								a
							),
						)
					: ((a.value = s.value),
						s.issues.length &&
							((a.value = n.catchValue({
								...a,
								error: { issues: s.issues.map((o) => zi(o, u, Mi())) },
								input: a.value,
							})),
							(a.issues = []),
							(a.fallback = !0)),
						a);
			}));
	}),
	gx = W("$ZodPipe", (e, n) => {
		(dt.init(e, n),
			Ke(e._zod, "values", () => n.in._zod.values),
			Ke(e._zod, "optin", () => n.in._zod.optin),
			Ke(e._zod, "optout", () => n.out._zod.optout),
			Ke(e._zod, "propValues", () => n.in._zod.propValues),
			(e._zod.parse = (a, u) => {
				if (u.direction === "backward") {
					const o = n.out._zod.run(a, u);
					return o instanceof Promise ? o.then((f) => Ks(f, n.in, u)) : Ks(o, n.in, u);
				}
				const s = n.in._zod.run(a, u);
				return s instanceof Promise ? s.then((o) => Ks(o, n.out, u)) : Ks(s, n.out, u);
			}));
	});
function Ks(e, n, a) {
	return e.issues.length
		? ((e.aborted = !0), e)
		: n._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, a);
}
var yx = W("$ZodReadonly", (e, n) => {
	(dt.init(e, n),
		Ke(e._zod, "propValues", () => n.innerType._zod.propValues),
		Ke(e._zod, "values", () => n.innerType._zod.values),
		Ke(e._zod, "optin", () => n.innerType?._zod?.optin),
		Ke(e._zod, "optout", () => n.innerType?._zod?.optout),
		(e._zod.parse = (a, u) => {
			if (u.direction === "backward") return n.innerType._zod.run(a, u);
			const s = n.innerType._zod.run(a, u);
			return s instanceof Promise ? s.then(np) : np(s);
		}));
});
function np(e) {
	return ((e.value = Object.freeze(e.value)), e);
}
var px = W("$ZodCustom", (e, n) => {
	(fn.init(e, n),
		dt.init(e, n),
		(e._zod.parse = (a, u) => a),
		(e._zod.check = (a) => {
			const u = a.value,
				s = n.fn(u);
			if (s instanceof Promise) return s.then((o) => ip(o, a, u, e));
			ip(s, a, u, e);
		}));
});
function ip(e, n, a, u) {
	if (!e) {
		const s = { code: "custom", input: a, inst: u, path: [...(u._zod.def.path ?? [])], continue: !u._zod.def.abort };
		(u._zod.def.params && (s.params = u._zod.def.params), n.issues.push(ml(s)));
	}
}
var ap,
	bx = class {
		constructor() {
			((this._map = new WeakMap()), (this._idmap = new Map()));
		}
		add(e, ...n) {
			const a = n[0];
			return (this._map.set(e, a), a && typeof a == "object" && "id" in a && this._idmap.set(a.id, e), this);
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
				const a = { ...(this.get(n) ?? {}) };
				delete a.id;
				const u = { ...a, ...this._map.get(e) };
				return Object.keys(u).length ? u : void 0;
			}
			return this._map.get(e);
		}
		has(e) {
			return this._map.has(e);
		}
	};
function _x() {
	return new bx();
}
(ap = globalThis).__zod_globalRegistry ?? (ap.__zod_globalRegistry = _x());
var sl = globalThis.__zod_globalRegistry;
function Sx(e, n) {
	return new e({ type: "string", ...ve(n) });
}
function wx(e, n) {
	return new e({ type: "string", format: "email", check: "string_format", abort: !1, ...ve(n) });
}
function rp(e, n) {
	return new e({ type: "string", format: "guid", check: "string_format", abort: !1, ...ve(n) });
}
function Ex(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, ...ve(n) });
}
function Tx(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v4", ...ve(n) });
}
function xx(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v6", ...ve(n) });
}
function Ax(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v7", ...ve(n) });
}
function Cx(e, n) {
	return new e({ type: "string", format: "url", check: "string_format", abort: !1, ...ve(n) });
}
function Rx(e, n) {
	return new e({ type: "string", format: "emoji", check: "string_format", abort: !1, ...ve(n) });
}
function Nx(e, n) {
	return new e({ type: "string", format: "nanoid", check: "string_format", abort: !1, ...ve(n) });
}
function Ox(e, n) {
	return new e({ type: "string", format: "cuid", check: "string_format", abort: !1, ...ve(n) });
}
function kx(e, n) {
	return new e({ type: "string", format: "cuid2", check: "string_format", abort: !1, ...ve(n) });
}
function Mx(e, n) {
	return new e({ type: "string", format: "ulid", check: "string_format", abort: !1, ...ve(n) });
}
function zx(e, n) {
	return new e({ type: "string", format: "xid", check: "string_format", abort: !1, ...ve(n) });
}
function Dx(e, n) {
	return new e({ type: "string", format: "ksuid", check: "string_format", abort: !1, ...ve(n) });
}
function jx(e, n) {
	return new e({ type: "string", format: "ipv4", check: "string_format", abort: !1, ...ve(n) });
}
function Lx(e, n) {
	return new e({ type: "string", format: "ipv6", check: "string_format", abort: !1, ...ve(n) });
}
function qx(e, n) {
	return new e({ type: "string", format: "cidrv4", check: "string_format", abort: !1, ...ve(n) });
}
function Ux(e, n) {
	return new e({ type: "string", format: "cidrv6", check: "string_format", abort: !1, ...ve(n) });
}
function $x(e, n) {
	return new e({ type: "string", format: "base64", check: "string_format", abort: !1, ...ve(n) });
}
function Bx(e, n) {
	return new e({ type: "string", format: "base64url", check: "string_format", abort: !1, ...ve(n) });
}
function Ix(e, n) {
	return new e({ type: "string", format: "e164", check: "string_format", abort: !1, ...ve(n) });
}
function Zx(e, n) {
	return new e({ type: "string", format: "jwt", check: "string_format", abort: !1, ...ve(n) });
}
function Hx(e, n) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...ve(n),
	});
}
function Vx(e, n) {
	return new e({ type: "string", format: "date", check: "string_format", ...ve(n) });
}
function Qx(e, n) {
	return new e({ type: "string", format: "time", check: "string_format", precision: null, ...ve(n) });
}
function Px(e, n) {
	return new e({ type: "string", format: "duration", check: "string_format", ...ve(n) });
}
function Yx(e, n) {
	return new e({ type: "number", checks: [], ...ve(n) });
}
function Gx(e, n) {
	return new e({ type: "number", check: "number_format", abort: !1, format: "safeint", ...ve(n) });
}
function Kx(e, n) {
	return new e({ type: "boolean", ...ve(n) });
}
function Xx(e) {
	return new e({ type: "unknown" });
}
function Fx(e, n) {
	return new e({ type: "never", ...ve(n) });
}
function up(e, n) {
	return new z0({ check: "less_than", ...ve(n), value: e, inclusive: !1 });
}
function ud(e, n) {
	return new z0({ check: "less_than", ...ve(n), value: e, inclusive: !0 });
}
function lp(e, n) {
	return new D0({ check: "greater_than", ...ve(n), value: e, inclusive: !1 });
}
function ld(e, n) {
	return new D0({ check: "greater_than", ...ve(n), value: e, inclusive: !0 });
}
function sp(e, n) {
	return new dT({ check: "multiple_of", ...ve(n), value: e });
}
function B0(e, n) {
	return new mT({ check: "max_length", ...ve(n), maximum: e });
}
function ho(e, n) {
	return new vT({ check: "min_length", ...ve(n), minimum: e });
}
function I0(e, n) {
	return new gT({ check: "length_equals", ...ve(n), length: e });
}
function Jx(e, n) {
	return new yT({ check: "string_format", format: "regex", ...ve(n), pattern: e });
}
function Wx(e) {
	return new pT({ check: "string_format", format: "lowercase", ...ve(e) });
}
function eA(e) {
	return new bT({ check: "string_format", format: "uppercase", ...ve(e) });
}
function tA(e, n) {
	return new _T({ check: "string_format", format: "includes", ...ve(n), includes: e });
}
function nA(e, n) {
	return new ST({ check: "string_format", format: "starts_with", ...ve(n), prefix: e });
}
function iA(e, n) {
	return new wT({ check: "string_format", format: "ends_with", ...ve(n), suffix: e });
}
function uu(e) {
	return new ET({ check: "overwrite", tx: e });
}
function aA(e) {
	return uu((n) => n.normalize(e));
}
function rA() {
	return uu((e) => e.trim());
}
function uA() {
	return uu((e) => e.toLowerCase());
}
function lA() {
	return uu((e) => e.toUpperCase());
}
function sA() {
	return uu((e) => vE(e));
}
function oA(e, n, a) {
	return new e({ type: "array", element: n, ...ve(a) });
}
function cA(e, n, a) {
	return new e({ type: "custom", check: "custom", fn: n, ...ve(a) });
}
function fA(e, n) {
	const a = dA(
		(u) => (
			(u.addIssue = (s) => {
				if (typeof s == "string") u.issues.push(ml(s, u.value, a._zod.def));
				else {
					const o = s;
					(o.fatal && (o.continue = !1),
						o.code ?? (o.code = "custom"),
						o.input ?? (o.input = u.value),
						o.inst ?? (o.inst = a),
						o.continue ?? (o.continue = !a._zod.def.abort),
						u.issues.push(ml(o)));
				}
			}),
			e(u.value, u)
		),
		n,
	);
	return a;
}
function dA(e, n) {
	const a = new fn({ check: "custom", ...ve(n) });
	return ((a._zod.check = e), a);
}
function Z0(e) {
	let n = e?.target ?? "draft-2020-12";
	return (
		n === "draft-4" && (n = "draft-04"),
		n === "draft-7" && (n = "draft-07"),
		{
			processors: e.processors ?? {},
			metadataRegistry: e?.metadata ?? sl,
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
function Nt(e, n, a = { path: [], schemaPath: [] }) {
	var u;
	const s = e._zod.def,
		o = n.seen.get(e);
	if (o) return (o.count++, a.schemaPath.includes(e) && (o.cycle = a.path), o.schema);
	const f = { schema: {}, count: 1, cycle: void 0, path: a.path };
	n.seen.set(e, f);
	const h = e._zod.toJSONSchema?.();
	if (h) f.schema = h;
	else {
		const g = { ...a, schemaPath: [...a.schemaPath, e], path: a.path };
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(n, f.schema, g);
		else {
			const S = f.schema,
				b = n.processors[s.type];
			if (!b) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${s.type}`);
			b(e, n, S, g);
		}
		const y = e._zod.parent;
		y && (f.ref || (f.ref = y), Nt(y, n, g), (n.seen.get(y).isParent = !0));
	}
	const m = n.metadataRegistry.get(e);
	return (
		m && Object.assign(f.schema, m),
		n.io === "input" && Jt(e) && (delete f.schema.examples, delete f.schema.default),
		n.io === "input" && "_prefault" in f.schema && ((u = f.schema).default ?? (u.default = f.schema._prefault)),
		delete f.schema._prefault,
		n.seen.get(e).schema
	);
}
function H0(e, n) {
	const a = e.seen.get(n);
	if (!a) throw new Error("Unprocessed schema. This is a bug in Zod.");
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
				const y = e.external.registry.get(f[0])?.id,
					S = e.external.uri ?? ((p) => p);
				if (y) return { ref: S(y) };
				const b = f[1].defId ?? f[1].schema.id ?? `schema${e.counter++}`;
				return ((f[1].defId = b), { defId: b, ref: `${S("__shared")}#/${h}/${b}` });
			}
			if (f[1] === a) return { ref: "#" };
			const m = `#/${h}/`,
				g = f[1].schema.id ?? `__schema${e.counter++}`;
			return { defId: g, ref: m + g };
		},
		o = (f) => {
			if (f[1].schema.$ref) return;
			const h = f[1],
				{ ref: m, defId: g } = s(f);
			((h.def = { ...h.schema }), g && (h.defId = g));
			const y = h.schema;
			for (const S in y) delete y[S];
			y.$ref = m;
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
function V0(e, n) {
	const a = e.seen.get(n);
	if (!a) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const u = (h) => {
		const m = e.seen.get(h);
		if (m.ref === null) return;
		const g = m.def ?? m.schema,
			y = { ...g },
			S = m.ref;
		if (((m.ref = null), S)) {
			u(S);
			const p = e.seen.get(S),
				E = p.schema;
			if (
				(E.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0")
					? ((g.allOf = g.allOf ?? []), g.allOf.push(E))
					: Object.assign(g, E),
				Object.assign(g, y),
				h._zod.parent === S)
			)
				for (const x in g) x === "$ref" || x === "allOf" || x in y || delete g[x];
			if (E.$ref && p.def)
				for (const x in g)
					x === "$ref" ||
						x === "allOf" ||
						(x in p.def && JSON.stringify(g[x]) === JSON.stringify(p.def[x]) && delete g[x]);
		}
		const b = h._zod.parent;
		if (b && b !== S) {
			u(b);
			const p = e.seen.get(b);
			if (p?.schema.$ref && ((g.$ref = p.schema.$ref), p.def))
				for (const E in g)
					E === "$ref" ||
						E === "allOf" ||
						(E in p.def && JSON.stringify(g[E]) === JSON.stringify(p.def[E]) && delete g[E]);
		}
		e.override({ zodSchema: h, jsonSchema: g, path: m.path ?? [] });
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
	Object.assign(s, a.def ?? a.schema);
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
					jsonSchema: { input: mo(n, "input", e.processors), output: mo(n, "output", e.processors) },
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
function Jt(e, n) {
	const a = n ?? { seen: new Set() };
	if (a.seen.has(e)) return !1;
	a.seen.add(e);
	const u = e._zod.def;
	if (u.type === "transform") return !0;
	if (u.type === "array") return Jt(u.element, a);
	if (u.type === "set") return Jt(u.valueType, a);
	if (u.type === "lazy") return Jt(u.getter(), a);
	if (
		u.type === "promise" ||
		u.type === "optional" ||
		u.type === "nonoptional" ||
		u.type === "nullable" ||
		u.type === "readonly" ||
		u.type === "default" ||
		u.type === "prefault"
	)
		return Jt(u.innerType, a);
	if (u.type === "intersection") return Jt(u.left, a) || Jt(u.right, a);
	if (u.type === "record" || u.type === "map") return Jt(u.keyType, a) || Jt(u.valueType, a);
	if (u.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : Jt(u.in, a) || Jt(u.out, a);
	if (u.type === "object") {
		for (const s in u.shape) if (Jt(u.shape[s], a)) return !0;
		return !1;
	}
	if (u.type === "union") {
		for (const s of u.options) if (Jt(s, a)) return !0;
		return !1;
	}
	if (u.type === "tuple") {
		for (const s of u.items) if (Jt(s, a)) return !0;
		return !!(u.rest && Jt(u.rest, a));
	}
	return !1;
}
var hA =
		(e, n = {}) =>
		(a) => {
			const u = Z0({ ...a, processors: n });
			return (Nt(e, u), H0(u, e), V0(u, e));
		},
	mo =
		(e, n, a = {}) =>
		(u) => {
			const { libraryOptions: s, target: o } = u ?? {},
				f = Z0({ ...(s ?? {}), target: o, io: n, processors: a });
			return (Nt(e, f), H0(f, e), V0(f, e));
		},
	mA = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" },
	vA = (e, n, a, u) => {
		const s = a;
		s.type = "string";
		const { minimum: o, maximum: f, format: h, patterns: m, contentEncoding: g } = e._zod.bag;
		if (
			(typeof o == "number" && (s.minLength = o),
			typeof f == "number" && (s.maxLength = f),
			h && ((s.format = mA[h] ?? h), s.format === "" && delete s.format, h === "time" && delete s.format),
			g && (s.contentEncoding = g),
			m && m.size > 0)
		) {
			const y = [...m];
			y.length === 1
				? (s.pattern = y[0].source)
				: y.length > 1 &&
					(s.allOf = [
						...y.map((S) => ({
							...(n.target === "draft-07" || n.target === "draft-04" || n.target === "openapi-3.0"
								? { type: "string" }
								: {}),
							pattern: S.source,
						})),
					]);
		}
	},
	gA = (e, n, a, u) => {
		const s = a,
			{ minimum: o, maximum: f, format: h, multipleOf: m, exclusiveMaximum: g, exclusiveMinimum: y } = e._zod.bag;
		typeof h == "string" && h.includes("int") ? (s.type = "integer") : (s.type = "number");
		const S = typeof y == "number" && y >= (o ?? Number.NEGATIVE_INFINITY),
			b = typeof g == "number" && g <= (f ?? Number.POSITIVE_INFINITY),
			p = n.target === "draft-04" || n.target === "openapi-3.0";
		(S
			? p
				? ((s.minimum = y), (s.exclusiveMinimum = !0))
				: (s.exclusiveMinimum = y)
			: typeof o == "number" && (s.minimum = o),
			b
				? p
					? ((s.maximum = g), (s.exclusiveMaximum = !0))
					: (s.exclusiveMaximum = g)
				: typeof f == "number" && (s.maximum = f),
			typeof m == "number" && (s.multipleOf = m));
	},
	yA = (e, n, a, u) => {
		a.type = "boolean";
	},
	pA = (e, n, a, u) => {
		a.not = {};
	},
	bA = (e, n, a, u) => {},
	_A = (e, n, a, u) => {
		const s = e._zod.def,
			o = w0(s.entries);
		(o.every((f) => typeof f == "number") && (a.type = "number"),
			o.every((f) => typeof f == "string") && (a.type = "string"),
			(a.enum = o));
	},
	SA = (e, n, a, u) => {
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
				((a.type = f === null ? "null" : typeof f),
					n.target === "draft-04" || n.target === "openapi-3.0" ? (a.enum = [f]) : (a.const = f));
			} else
				(o.every((f) => typeof f == "number") && (a.type = "number"),
					o.every((f) => typeof f == "string") && (a.type = "string"),
					o.every((f) => typeof f == "boolean") && (a.type = "boolean"),
					o.every((f) => f === null) && (a.type = "null"),
					(a.enum = o));
	},
	wA = (e, n, a, u) => {
		if (n.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
	},
	EA = (e, n, a, u) => {
		if (n.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
	},
	TA = (e, n, a, u) => {
		const s = a,
			o = e._zod.def,
			{ minimum: f, maximum: h } = e._zod.bag;
		(typeof f == "number" && (s.minItems = f),
			typeof h == "number" && (s.maxItems = h),
			(s.type = "array"),
			(s.items = Nt(o.element, n, { ...u, path: [...u.path, "items"] })));
	},
	xA = (e, n, a, u) => {
		const s = a,
			o = e._zod.def;
		((s.type = "object"), (s.properties = {}));
		const f = o.shape;
		for (const g in f) s.properties[g] = Nt(f[g], n, { ...u, path: [...u.path, "properties", g] });
		const h = new Set(Object.keys(f)),
			m = new Set(
				[...h].filter((g) => {
					const y = o.shape[g]._zod;
					return n.io === "input" ? y.optin === void 0 : y.optout === void 0;
				}),
			);
		(m.size > 0 && (s.required = Array.from(m)),
			o.catchall?._zod.def.type === "never"
				? (s.additionalProperties = !1)
				: o.catchall
					? o.catchall &&
						(s.additionalProperties = Nt(o.catchall, n, { ...u, path: [...u.path, "additionalProperties"] }))
					: n.io === "output" && (s.additionalProperties = !1));
	},
	AA = (e, n, a, u) => {
		const s = e._zod.def,
			o = s.inclusive === !1,
			f = s.options.map((h, m) => Nt(h, n, { ...u, path: [...u.path, o ? "oneOf" : "anyOf", m] }));
		o ? (a.oneOf = f) : (a.anyOf = f);
	},
	CA = (e, n, a, u) => {
		const s = e._zod.def,
			o = Nt(s.left, n, { ...u, path: [...u.path, "allOf", 0] }),
			f = Nt(s.right, n, { ...u, path: [...u.path, "allOf", 1] }),
			h = (m) => "allOf" in m && Object.keys(m).length === 1;
		a.allOf = [...(h(o) ? o.allOf : [o]), ...(h(f) ? f.allOf : [f])];
	},
	RA = (e, n, a, u) => {
		const s = a,
			o = e._zod.def;
		s.type = "object";
		const f = o.keyType,
			h = f._zod.bag?.patterns;
		if (o.mode === "loose" && h && h.size > 0) {
			const g = Nt(o.valueType, n, { ...u, path: [...u.path, "patternProperties", "*"] });
			s.patternProperties = {};
			for (const y of h) s.patternProperties[y.source] = g;
		} else
			((n.target === "draft-07" || n.target === "draft-2020-12") &&
				(s.propertyNames = Nt(o.keyType, n, { ...u, path: [...u.path, "propertyNames"] })),
				(s.additionalProperties = Nt(o.valueType, n, { ...u, path: [...u.path, "additionalProperties"] })));
		const m = f._zod.values;
		if (m) {
			const g = [...m].filter((y) => typeof y == "string" || typeof y == "number");
			g.length > 0 && (s.required = g);
		}
	},
	NA = (e, n, a, u) => {
		const s = e._zod.def,
			o = Nt(s.innerType, n, u),
			f = n.seen.get(e);
		n.target === "openapi-3.0" ? ((f.ref = s.innerType), (a.nullable = !0)) : (a.anyOf = [o, { type: "null" }]);
	},
	OA = (e, n, a, u) => {
		const s = e._zod.def;
		Nt(s.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = s.innerType;
	},
	kA = (e, n, a, u) => {
		const s = e._zod.def;
		Nt(s.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = s.innerType), (a.default = JSON.parse(JSON.stringify(s.defaultValue))));
	},
	MA = (e, n, a, u) => {
		const s = e._zod.def;
		Nt(s.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = s.innerType), n.io === "input" && (a._prefault = JSON.parse(JSON.stringify(s.defaultValue))));
	},
	zA = (e, n, a, u) => {
		const s = e._zod.def;
		Nt(s.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = s.innerType;
		let f;
		try {
			f = s.catchValue(void 0);
		} catch {
			throw new Error("Dynamic catch values are not supported in JSON Schema");
		}
		a.default = f;
	},
	DA = (e, n, a, u) => {
		const s = e._zod.def,
			o = s.in._zod.traits.has("$ZodTransform"),
			f = n.io === "input" ? (o ? s.out : s.in) : s.out;
		Nt(f, n, u);
		const h = n.seen.get(e);
		h.ref = f;
	},
	jA = (e, n, a, u) => {
		const s = e._zod.def;
		Nt(s.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = s.innerType), (a.readOnly = !0));
	},
	Q0 = (e, n, a, u) => {
		const s = e._zod.def;
		Nt(s.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = s.innerType;
	},
	LA = W("ZodISODateTime", (e, n) => {
		(qT.init(e, n), mt.init(e, n));
	});
function qA(e) {
	return Hx(LA, e);
}
var UA = W("ZodISODate", (e, n) => {
	(UT.init(e, n), mt.init(e, n));
});
function $A(e) {
	return Vx(UA, e);
}
var BA = W("ZodISOTime", (e, n) => {
	($T.init(e, n), mt.init(e, n));
});
function IA(e) {
	return Qx(BA, e);
}
var ZA = W("ZodISODuration", (e, n) => {
	(BT.init(e, n), mt.init(e, n));
});
function HA(e) {
	return Px(ZA, e);
}
var VA = (e, n) => {
		(A0.init(e, n),
			(e.name = "ZodError"),
			Object.defineProperties(e, {
				format: { value: (a) => NE(e, a) },
				flatten: { value: (a) => RE(e, a) },
				addIssue: {
					value: (a) => {
						(e.issues.push(a), (e.message = JSON.stringify(e.issues, Cd, 2)));
					},
				},
				addIssues: {
					value: (a) => {
						(e.issues.push(...a), (e.message = JSON.stringify(e.issues, Cd, 2)));
					},
				},
				isEmpty: {
					get() {
						return e.issues.length === 0;
					},
				},
			}));
	},
	Bn = W("ZodError", VA, { Parent: Error }),
	QA = Gd(Bn),
	PA = Kd(Bn),
	YA = To(Bn),
	GA = xo(Bn),
	KA = ME(Bn),
	XA = zE(Bn),
	FA = DE(Bn),
	JA = jE(Bn),
	WA = LE(Bn),
	eC = qE(Bn),
	tC = UE(Bn),
	nC = $E(Bn),
	op = new WeakMap();
function bl(e, n, a) {
	const u = Object.getPrototypeOf(e);
	let s = op.get(u);
	if ((s || ((s = new Set()), op.set(u, s)), !s.has(n))) {
		s.add(n);
		for (const o in a) {
			const f = a[o];
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
var ht = W(
		"ZodType",
		(e, n) => (
			dt.init(e, n),
			Object.assign(e["~standard"], { jsonSchema: { input: mo(e, "input"), output: mo(e, "output") } }),
			(e.toJSONSchema = hA(e, {})),
			(e.def = n),
			(e.type = n.type),
			Object.defineProperty(e, "_def", { value: n }),
			(e.parse = (a, u) => QA(e, a, u, { callee: e.parse })),
			(e.safeParse = (a, u) => YA(e, a, u)),
			(e.parseAsync = async (a, u) => PA(e, a, u, { callee: e.parseAsync })),
			(e.safeParseAsync = async (a, u) => GA(e, a, u)),
			(e.spa = e.safeParseAsync),
			(e.encode = (a, u) => KA(e, a, u)),
			(e.decode = (a, u) => XA(e, a, u)),
			(e.encodeAsync = async (a, u) => FA(e, a, u)),
			(e.decodeAsync = async (a, u) => JA(e, a, u)),
			(e.safeEncode = (a, u) => WA(e, a, u)),
			(e.safeDecode = (a, u) => eC(e, a, u)),
			(e.safeEncodeAsync = async (a, u) => tC(e, a, u)),
			(e.safeDecodeAsync = async (a, u) => nC(e, a, u)),
			bl(e, "ZodType", {
				check(...a) {
					const u = this.def;
					return this.clone(
						ba(u, {
							checks: [
								...(u.checks ?? []),
								...a.map((s) =>
									typeof s == "function" ? { _zod: { check: s, def: { check: "custom" }, onattach: [] } } : s,
								),
							],
						}),
						{ parent: !0 },
					);
				},
				with(...a) {
					return this.check(...a);
				},
				clone(a, u) {
					return _a(this, a, u);
				},
				brand() {
					return this;
				},
				register(a, u) {
					return (a.add(this, u), this);
				},
				refine(a, u) {
					return this.check(KC(a, u));
				},
				superRefine(a, u) {
					return this.check(XC(a, u));
				},
				overwrite(a) {
					return this.check(uu(a));
				},
				optional() {
					return hp(this);
				},
				exactOptional() {
					return LC(this);
				},
				nullable() {
					return mp(this);
				},
				nullish() {
					return hp(mp(this));
				},
				nonoptional(a) {
					return ZC(this, a);
				},
				array() {
					return Ka(this);
				},
				or(a) {
					return Jd([this, a]);
				},
				and(a) {
					return OC(this, a);
				},
				transform(a) {
					return vp(this, DC(a));
				},
				default(a) {
					return $C(this, a);
				},
				prefault(a) {
					return IC(this, a);
				},
				catch(a) {
					return VC(this, a);
				},
				pipe(a) {
					return vp(this, a);
				},
				readonly() {
					return YC(this);
				},
				describe(a) {
					const u = this.clone();
					return (sl.add(u, { description: a }), u);
				},
				meta(...a) {
					if (a.length === 0) return sl.get(this);
					const u = this.clone();
					return (sl.add(u, a[0]), u);
				},
				isOptional() {
					return this.safeParse(void 0).success;
				},
				isNullable() {
					return this.safeParse(null).success;
				},
				apply(a) {
					return a(this);
				},
			}),
			Object.defineProperty(e, "description", {
				get() {
					return sl.get(e)?.description;
				},
				configurable: !0,
			}),
			e
		),
	),
	P0 = W("_ZodString", (e, n) => {
		(Xd.init(e, n), ht.init(e, n), (e._zod.processJSONSchema = (u, s, o) => vA(e, u, s, o)));
		const a = e._zod.bag;
		((e.format = a.format ?? null),
			(e.minLength = a.minimum ?? null),
			(e.maxLength = a.maximum ?? null),
			bl(e, "_ZodString", {
				regex(...u) {
					return this.check(Jx(...u));
				},
				includes(...u) {
					return this.check(tA(...u));
				},
				startsWith(...u) {
					return this.check(nA(...u));
				},
				endsWith(...u) {
					return this.check(iA(...u));
				},
				min(...u) {
					return this.check(ho(...u));
				},
				max(...u) {
					return this.check(B0(...u));
				},
				length(...u) {
					return this.check(I0(...u));
				},
				nonempty(...u) {
					return this.check(ho(1, ...u));
				},
				lowercase(u) {
					return this.check(Wx(u));
				},
				uppercase(u) {
					return this.check(eA(u));
				},
				trim() {
					return this.check(rA());
				},
				normalize(...u) {
					return this.check(aA(...u));
				},
				toLowerCase() {
					return this.check(uA());
				},
				toUpperCase() {
					return this.check(lA());
				},
				slugify() {
					return this.check(sA());
				},
			}));
	}),
	iC = W("ZodString", (e, n) => {
		(Xd.init(e, n),
			P0.init(e, n),
			(e.email = (a) => e.check(wx(aC, a))),
			(e.url = (a) => e.check(Cx(rC, a))),
			(e.jwt = (a) => e.check(Zx(_C, a))),
			(e.emoji = (a) => e.check(Rx(uC, a))),
			(e.guid = (a) => e.check(rp(cp, a))),
			(e.uuid = (a) => e.check(Ex(Xs, a))),
			(e.uuidv4 = (a) => e.check(Tx(Xs, a))),
			(e.uuidv6 = (a) => e.check(xx(Xs, a))),
			(e.uuidv7 = (a) => e.check(Ax(Xs, a))),
			(e.nanoid = (a) => e.check(Nx(lC, a))),
			(e.guid = (a) => e.check(rp(cp, a))),
			(e.cuid = (a) => e.check(Ox(sC, a))),
			(e.cuid2 = (a) => e.check(kx(oC, a))),
			(e.ulid = (a) => e.check(Mx(cC, a))),
			(e.base64 = (a) => e.check($x(yC, a))),
			(e.base64url = (a) => e.check(Bx(pC, a))),
			(e.xid = (a) => e.check(zx(fC, a))),
			(e.ksuid = (a) => e.check(Dx(dC, a))),
			(e.ipv4 = (a) => e.check(jx(hC, a))),
			(e.ipv6 = (a) => e.check(Lx(mC, a))),
			(e.cidrv4 = (a) => e.check(qx(vC, a))),
			(e.cidrv6 = (a) => e.check(Ux(gC, a))),
			(e.e164 = (a) => e.check(Ix(bC, a))),
			(e.datetime = (a) => e.check(qA(a))),
			(e.date = (a) => e.check($A(a))),
			(e.time = (a) => e.check(IA(a))),
			(e.duration = (a) => e.check(HA(a))));
	});
function ft(e) {
	return Sx(iC, e);
}
var mt = W("ZodStringFormat", (e, n) => {
		(ut.init(e, n), P0.init(e, n));
	}),
	aC = W("ZodEmail", (e, n) => {
		(RT.init(e, n), mt.init(e, n));
	}),
	cp = W("ZodGUID", (e, n) => {
		(AT.init(e, n), mt.init(e, n));
	}),
	Xs = W("ZodUUID", (e, n) => {
		(CT.init(e, n), mt.init(e, n));
	}),
	rC = W("ZodURL", (e, n) => {
		(NT.init(e, n), mt.init(e, n));
	}),
	uC = W("ZodEmoji", (e, n) => {
		(OT.init(e, n), mt.init(e, n));
	}),
	lC = W("ZodNanoID", (e, n) => {
		(kT.init(e, n), mt.init(e, n));
	}),
	sC = W("ZodCUID", (e, n) => {
		(MT.init(e, n), mt.init(e, n));
	}),
	oC = W("ZodCUID2", (e, n) => {
		(zT.init(e, n), mt.init(e, n));
	}),
	cC = W("ZodULID", (e, n) => {
		(DT.init(e, n), mt.init(e, n));
	}),
	fC = W("ZodXID", (e, n) => {
		(jT.init(e, n), mt.init(e, n));
	}),
	dC = W("ZodKSUID", (e, n) => {
		(LT.init(e, n), mt.init(e, n));
	}),
	hC = W("ZodIPv4", (e, n) => {
		(IT.init(e, n), mt.init(e, n));
	}),
	mC = W("ZodIPv6", (e, n) => {
		(ZT.init(e, n), mt.init(e, n));
	}),
	vC = W("ZodCIDRv4", (e, n) => {
		(HT.init(e, n), mt.init(e, n));
	}),
	gC = W("ZodCIDRv6", (e, n) => {
		(VT.init(e, n), mt.init(e, n));
	}),
	yC = W("ZodBase64", (e, n) => {
		(QT.init(e, n), mt.init(e, n));
	}),
	pC = W("ZodBase64URL", (e, n) => {
		(YT.init(e, n), mt.init(e, n));
	}),
	bC = W("ZodE164", (e, n) => {
		(GT.init(e, n), mt.init(e, n));
	}),
	_C = W("ZodJWT", (e, n) => {
		(XT.init(e, n), mt.init(e, n));
	}),
	Y0 = W("ZodNumber", (e, n) => {
		(L0.init(e, n),
			ht.init(e, n),
			(e._zod.processJSONSchema = (u, s, o) => gA(e, u, s, o)),
			bl(e, "ZodNumber", {
				gt(u, s) {
					return this.check(lp(u, s));
				},
				gte(u, s) {
					return this.check(ld(u, s));
				},
				min(u, s) {
					return this.check(ld(u, s));
				},
				lt(u, s) {
					return this.check(up(u, s));
				},
				lte(u, s) {
					return this.check(ud(u, s));
				},
				max(u, s) {
					return this.check(ud(u, s));
				},
				int(u) {
					return this.check(fp(u));
				},
				safe(u) {
					return this.check(fp(u));
				},
				positive(u) {
					return this.check(lp(0, u));
				},
				nonnegative(u) {
					return this.check(ld(0, u));
				},
				negative(u) {
					return this.check(up(0, u));
				},
				nonpositive(u) {
					return this.check(ud(0, u));
				},
				multipleOf(u, s) {
					return this.check(sp(u, s));
				},
				step(u, s) {
					return this.check(sp(u, s));
				},
				finite() {
					return this;
				},
			}));
		const a = e._zod.bag;
		((e.minValue =
			Math.max(a.minimum ?? Number.NEGATIVE_INFINITY, a.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null),
			(e.maxValue =
				Math.min(a.maximum ?? Number.POSITIVE_INFINITY, a.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null),
			(e.isInt = (a.format ?? "").includes("int") || Number.isSafeInteger(a.multipleOf ?? 0.5)),
			(e.isFinite = !0),
			(e.format = a.format ?? null));
	});
function Qn(e) {
	return Yx(Y0, e);
}
var SC = W("ZodNumberFormat", (e, n) => {
	(FT.init(e, n), Y0.init(e, n));
});
function fp(e) {
	return Gx(SC, e);
}
var wC = W("ZodBoolean", (e, n) => {
	(JT.init(e, n), ht.init(e, n), (e._zod.processJSONSchema = (a, u, s) => yA(e, a, u, s)));
});
function Fd(e) {
	return Kx(wC, e);
}
var EC = W("ZodUnknown", (e, n) => {
	(WT.init(e, n), ht.init(e, n), (e._zod.processJSONSchema = (a, u, s) => bA(e, a, u, s)));
});
function vo() {
	return Xx(EC);
}
var TC = W("ZodNever", (e, n) => {
	(ex.init(e, n), ht.init(e, n), (e._zod.processJSONSchema = (a, u, s) => pA(e, a, u, s)));
});
function xC(e) {
	return Fx(TC, e);
}
var AC = W("ZodArray", (e, n) => {
	(tx.init(e, n),
		ht.init(e, n),
		(e._zod.processJSONSchema = (a, u, s) => TA(e, a, u, s)),
		(e.element = n.element),
		bl(e, "ZodArray", {
			min(a, u) {
				return this.check(ho(a, u));
			},
			nonempty(a) {
				return this.check(ho(1, a));
			},
			max(a, u) {
				return this.check(B0(a, u));
			},
			length(a, u) {
				return this.check(I0(a, u));
			},
			unwrap() {
				return this.element;
			},
		}));
});
function Ka(e, n) {
	return oA(AC, e, n);
}
var CC = W("ZodObject", (e, n) => {
	(ix.init(e, n),
		ht.init(e, n),
		(e._zod.processJSONSchema = (a, u, s) => xA(e, a, u, s)),
		Ke(e, "shape", () => n.shape),
		bl(e, "ZodObject", {
			keyof() {
				return kC(Object.keys(this._zod.def.shape));
			},
			catchall(a) {
				return this.clone({ ...this._zod.def, catchall: a });
			},
			passthrough() {
				return this.clone({ ...this._zod.def, catchall: vo() });
			},
			loose() {
				return this.clone({ ...this._zod.def, catchall: vo() });
			},
			strict() {
				return this.clone({ ...this._zod.def, catchall: xC() });
			},
			strip() {
				return this.clone({ ...this._zod.def, catchall: void 0 });
			},
			extend(a) {
				return wE(this, a);
			},
			safeExtend(a) {
				return EE(this, a);
			},
			merge(a) {
				return TE(this, a);
			},
			pick(a) {
				return _E(this, a);
			},
			omit(a) {
				return SE(this, a);
			},
			partial(...a) {
				return xE(K0, this, a[0]);
			},
			required(...a) {
				return AE(X0, this, a[0]);
			},
		}));
});
function Un(e, n) {
	const a = { type: "object", shape: e ?? {}, ...ve(n) };
	return new CC(a);
}
var RC = W("ZodUnion", (e, n) => {
	(ax.init(e, n), ht.init(e, n), (e._zod.processJSONSchema = (a, u, s) => AA(e, a, u, s)), (e.options = n.options));
});
function Jd(e, n) {
	return new RC({ type: "union", options: e, ...ve(n) });
}
var NC = W("ZodIntersection", (e, n) => {
	(rx.init(e, n), ht.init(e, n), (e._zod.processJSONSchema = (a, u, s) => CA(e, a, u, s)));
});
function OC(e, n) {
	return new NC({ type: "intersection", left: e, right: n });
}
var dp = W("ZodRecord", (e, n) => {
	(ux.init(e, n),
		ht.init(e, n),
		(e._zod.processJSONSchema = (a, u, s) => RA(e, a, u, s)),
		(e.keyType = n.keyType),
		(e.valueType = n.valueType));
});
function G0(e, n, a) {
	return !n || !n._zod
		? new dp({ type: "record", keyType: ft(), valueType: e, ...ve(n) })
		: new dp({ type: "record", keyType: e, valueType: n, ...ve(a) });
}
var Nd = W("ZodEnum", (e, n) => {
	(lx.init(e, n),
		ht.init(e, n),
		(e._zod.processJSONSchema = (u, s, o) => _A(e, u, s, o)),
		(e.enum = n.entries),
		(e.options = Object.values(n.entries)));
	const a = new Set(Object.keys(n.entries));
	((e.extract = (u, s) => {
		const o = {};
		for (const f of u)
			if (a.has(f)) o[f] = n.entries[f];
			else throw new Error(`Key ${f} not found in enum`);
		return new Nd({ ...n, checks: [], ...ve(s), entries: o });
	}),
		(e.exclude = (u, s) => {
			const o = { ...n.entries };
			for (const f of u)
				if (a.has(f)) delete o[f];
				else throw new Error(`Key ${f} not found in enum`);
			return new Nd({ ...n, checks: [], ...ve(s), entries: o });
		}));
});
function kC(e, n) {
	const a = Array.isArray(e) ? Object.fromEntries(e.map((u) => [u, u])) : e;
	return new Nd({ type: "enum", entries: a, ...ve(n) });
}
var MC = W("ZodLiteral", (e, n) => {
	(sx.init(e, n),
		ht.init(e, n),
		(e._zod.processJSONSchema = (a, u, s) => SA(e, a, u, s)),
		(e.values = new Set(n.values)),
		Object.defineProperty(e, "value", {
			get() {
				if (n.values.length > 1)
					throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
				return n.values[0];
			},
		}));
});
function go(e, n) {
	return new MC({ type: "literal", values: Array.isArray(e) ? e : [e], ...ve(n) });
}
var zC = W("ZodTransform", (e, n) => {
	(ox.init(e, n),
		ht.init(e, n),
		(e._zod.processJSONSchema = (a, u, s) => EA(e, a, u, s)),
		(e._zod.parse = (a, u) => {
			if (u.direction === "backward") throw new S0(e.constructor.name);
			a.addIssue = (o) => {
				if (typeof o == "string") a.issues.push(ml(o, a.value, n));
				else {
					const f = o;
					(f.fatal && (f.continue = !1),
						f.code ?? (f.code = "custom"),
						f.input ?? (f.input = a.value),
						f.inst ?? (f.inst = e),
						a.issues.push(ml(f)));
				}
			};
			const s = n.transform(a.value, a);
			return s instanceof Promise
				? s.then((o) => ((a.value = o), (a.fallback = !0), a))
				: ((a.value = s), (a.fallback = !0), a);
		}));
});
function DC(e) {
	return new zC({ type: "transform", transform: e });
}
var K0 = W("ZodOptional", (e, n) => {
	($0.init(e, n),
		ht.init(e, n),
		(e._zod.processJSONSchema = (a, u, s) => Q0(e, a, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function hp(e) {
	return new K0({ type: "optional", innerType: e });
}
var jC = W("ZodExactOptional", (e, n) => {
	(cx.init(e, n),
		ht.init(e, n),
		(e._zod.processJSONSchema = (a, u, s) => Q0(e, a, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function LC(e) {
	return new jC({ type: "optional", innerType: e });
}
var qC = W("ZodNullable", (e, n) => {
	(fx.init(e, n),
		ht.init(e, n),
		(e._zod.processJSONSchema = (a, u, s) => NA(e, a, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function mp(e) {
	return new qC({ type: "nullable", innerType: e });
}
var UC = W("ZodDefault", (e, n) => {
	(dx.init(e, n),
		ht.init(e, n),
		(e._zod.processJSONSchema = (a, u, s) => kA(e, a, u, s)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeDefault = e.unwrap));
});
function $C(e, n) {
	return new UC({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : T0(n);
		},
	});
}
var BC = W("ZodPrefault", (e, n) => {
	(hx.init(e, n),
		ht.init(e, n),
		(e._zod.processJSONSchema = (a, u, s) => MA(e, a, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function IC(e, n) {
	return new BC({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : T0(n);
		},
	});
}
var X0 = W("ZodNonOptional", (e, n) => {
	(mx.init(e, n),
		ht.init(e, n),
		(e._zod.processJSONSchema = (a, u, s) => OA(e, a, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function ZC(e, n) {
	return new X0({ type: "nonoptional", innerType: e, ...ve(n) });
}
var HC = W("ZodCatch", (e, n) => {
	(vx.init(e, n),
		ht.init(e, n),
		(e._zod.processJSONSchema = (a, u, s) => zA(e, a, u, s)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeCatch = e.unwrap));
});
function VC(e, n) {
	return new HC({ type: "catch", innerType: e, catchValue: typeof n == "function" ? n : () => n });
}
var QC = W("ZodPipe", (e, n) => {
	(gx.init(e, n),
		ht.init(e, n),
		(e._zod.processJSONSchema = (a, u, s) => DA(e, a, u, s)),
		(e.in = n.in),
		(e.out = n.out));
});
function vp(e, n) {
	return new QC({ type: "pipe", in: e, out: n });
}
var PC = W("ZodReadonly", (e, n) => {
	(yx.init(e, n),
		ht.init(e, n),
		(e._zod.processJSONSchema = (a, u, s) => jA(e, a, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function YC(e) {
	return new PC({ type: "readonly", innerType: e });
}
var GC = W("ZodCustom", (e, n) => {
	(px.init(e, n), ht.init(e, n), (e._zod.processJSONSchema = (a, u, s) => wA(e, a, u, s)));
});
function KC(e, n = {}) {
	return cA(GC, e, n);
}
function XC(e, n) {
	return fA(e, n);
}
var T = o0(Eo()),
	FC = hE(),
	Gr = ["thumbs_up", "heart", "laugh", "wow", "sad", "party", "rocket", "eyes"],
	F0 = { thumbs_up: "👍", heart: "❤️", laugh: "😂", wow: "😮", sad: "😢", party: "🎉", rocket: "🚀", eyes: "👀" },
	J0 = {
		thumbs_up: "Thumbs up",
		heart: "Heart",
		laugh: "Laugh",
		wow: "Wow",
		sad: "Sad",
		party: "Party",
		rocket: "Rocket",
		eyes: "Eyes",
	},
	JC = 9999999999999,
	WC = /(?:^|:)(\d{13}):([^:]{1,16})$/;
function iu(e) {
	const n = WC.exec(e);
	return n ? JC - Number(n[1]) : null;
}
var W0 = "p/",
	eR = ["channels", "messages", "replies", "reactions"],
	Wd =
		"Only the people added here can read it — and the organization owner, who can read everything in this workspace.";
function tR(e) {
	const n = crypto.randomUUID();
	return e === "private" ? `${W0}${n}` : n;
}
function ei(e) {
	return e.startsWith(W0);
}
function rl(e) {
	return `${e}:`;
}
function eh(e) {
	const n = e.split(":");
	return n.length < 3 || iu(e) === null ? null : n.slice(0, -2).join(":");
}
function gp(e) {
	return `${e}:`;
}
function yp(e, n) {
	return `${e}:${n}`;
}
function nR(e) {
	const n = e.split(":");
	if (n.length < 4) return null;
	const a = n[n.length - 2];
	if (!Gr.includes(a)) return null;
	const u = n.slice(0, -2).join(":");
	return iu(u) === null ? null : { targetKey: u, token: a, keyTailUserId: n[n.length - 1] };
}
function eb(e) {
	const n = e.split(":");
	if (n.length < 5) return null;
	const a = n.slice(0, -2).join(":");
	return iu(a) === null || iu(e) === null ? null : a;
}
function pp(e) {
	return `me:${e}`;
}
function iR(e) {
	return `${e}:read`;
}
function tb(e) {
	const n = e.split(":");
	return n.length !== 3 || n[1] !== "read" || !ei(n[0]) ? null : { channelKey: n[0], keyTailUserId: n[2] };
}
var aR = Un({
		name: ft().min(1).max(64),
		archivedAt: Qn().nullable(),
		topic: ft().max(250).optional(),
		lastMessageAt: Qn().optional(),
	}),
	rR = Un({ fileNodeId: ft().min(1), name: ft().min(1) }),
	uR = Un({
		text: ft(),
		attachments: Ka(rR),
		editedAt: Qn().nullable(),
		deletedAt: Qn().nullable(),
		mentions: Ka(ft()).optional(),
	}),
	lR = Un({ channels: G0(ft(), Qn()) }),
	sR = Un({ at: Qn() }),
	_l = Un({
		collection: ft(),
		key: ft().min(1).max(128),
		value: G0(ft(), vo()),
		revision: Qn(),
		createdBy: ft().min(1),
		updatedBy: ft(),
		ownership: Jd([go("shared"), go("owned")]),
		createdAt: Qn(),
		updatedAt: Qn(),
	});
function oR(e, n) {
	const a = _l.safeParse(e);
	if (!a.success) return null;
	const u = iu(a.data.key);
	if (u === null) return null;
	const s = n.safeParse(a.data.value);
	return s.success
		? {
				key: a.data.key,
				value: s.data,
				revision: a.data.revision,
				createdBy: a.data.createdBy,
				updatedBy: a.data.updatedBy,
				createdAt: a.data.createdAt,
				updatedAt: a.data.updatedAt,
				timestamp: u,
			}
		: null;
}
function bp(e) {
	const n = _l.safeParse(e);
	if (!n.success) return null;
	const a = aR.safeParse(n.data.value);
	return a.success
		? {
				key: n.data.key,
				value: a.data,
				revision: n.data.revision,
				createdBy: n.data.createdBy,
				updatedBy: n.data.updatedBy,
				createdAt: n.data.createdAt,
				updatedAt: n.data.updatedAt,
				timestamp: n.data.createdAt,
			}
		: null;
}
function vl(e) {
	return oR(e, uR);
}
function cR(e) {
	const n = _l.safeParse(e);
	if (!n.success) return null;
	const a = nR(n.data.key);
	return a === null
		? null
		: {
				key: n.data.key,
				targetKey: a.targetKey,
				token: a.token,
				createdBy: n.data.createdBy,
				revision: n.data.revision,
			};
}
function fR(e) {
	const n = _l.safeParse(e);
	if (!n.success) return null;
	const a = lR.safeParse(n.data.value);
	return a.success
		? {
				key: n.data.key,
				value: a.data,
				revision: n.data.revision,
				createdBy: n.data.createdBy,
				updatedBy: n.data.updatedBy,
				createdAt: n.data.createdAt,
				updatedAt: n.data.updatedAt,
				timestamp: n.data.createdAt,
			}
		: null;
}
function dR(e) {
	const n = _l.safeParse(e);
	if (!n.success) return null;
	const a = tb(n.data.key);
	if (a === null) return null;
	const u = sR.safeParse(n.data.value);
	return u.success
		? {
				key: n.data.key,
				channelKey: a.channelKey,
				createdBy: n.data.createdBy,
				at: u.data.at,
				revision: n.data.revision,
			}
		: null;
}
function _p(e, n) {
	const a = { ...e.channels };
	for (const [u, s] of Object.entries(n.channels)) {
		const o = a[u];
		a[u] = o === void 0 ? s : Math.max(o, s);
	}
	return { channels: a };
}
function hR(e) {
	const n = new Map();
	for (const a of e.docs) {
		const u = eh(a.key);
		if (u === null || ei(u) || a.value.deletedAt !== null || a.createdBy === e.selfUserId) continue;
		const s = e.cursorChannels[u];
		if (s !== void 0 && a.timestamp <= s) continue;
		const o = a.value.mentions?.includes(e.selfUserId) ? 1 : 0,
			f = n.get(u);
		f === void 0
			? n.set(u, { unreadCount: 1, mentionCount: o, latest: a })
			: ((f.unreadCount += 1), (f.mentionCount += o), a.timestamp > f.latest.timestamp && (f.latest = a));
	}
	return n;
}
function Co(e, n) {
	const a = n - e;
	return a < 6e4
		? "just now"
		: a < 60 * 6e4
			? `${Math.floor(a / 6e4)}m ago`
			: a < 1440 * 6e4
				? `${Math.floor(a / (60 * 6e4))}h ago`
				: a < 10080 * 6e4
					? new Date(e).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" })
					: new Date(e).toLocaleDateString(void 0, { year: "numeric", month: "short", day: "numeric" });
}
var mR = Un({
		path: ft(),
		name: ft(),
		kind: Jd([go("file"), go("folder")]),
		nodeId: ft(),
		contentType: ft().nullable(),
		updatedAt: Qn(),
	}),
	vR = Un({ items: Ka(mR), cursor: ft().nullable(), isDone: Fd() }),
	gR = Un({ documents: Ka(vo()), cursor: ft().nullable(), isDone: Fd() }),
	yR = Un({
		items: Ka(Un({ fileNodeId: ft(), url: ft(), expiresAt: Qn() })),
		errors: Ka(Un({ fileNodeId: ft(), message: ft() })),
		truncated: Fd(),
	});
function Vn(e) {
	return e instanceof Error ? e.message : String(e);
}
function nb(e) {
	const n = new Map();
	let a = 0;
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
					a += 1;
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
		dropped_count: () => a,
	};
}
function Fr(e) {
	let n = [],
		a = 0;
	return {
		apply_window(u) {
			const s = [];
			for (const o of u) {
				const f = e(o);
				if (f === null) {
					a += 1;
					continue;
				}
				s.push(f);
			}
			return ((n = s), s);
		},
		get_all: () => n,
		dropped_count: () => a,
	};
}
function pR(e, n) {
	const a = new Map();
	for (const s of e) {
		let o = a.get(s.targetKey);
		o === void 0 && ((o = new Map()), a.set(s.targetKey, o));
		let f = o.get(s.token);
		(f === void 0 && ((f = new Set()), o.set(s.token, f)), f.add(s.createdBy));
	}
	const u = new Map();
	for (const [s, o] of a) {
		const f = [];
		for (const h of Gr) {
			const m = o.get(h);
			m === void 0 || m.size === 0 || f.push({ token: h, count: m.size, reactedByMe: m.has(n) });
		}
		u.set(s, f);
	}
	return u;
}
function bR(e) {
	const n = new Map();
	for (const a of e) {
		const u = eb(a.key);
		if (u === null) continue;
		const s = n.get(u);
		s === void 0
			? n.set(u, { count: 1, latestAt: a.timestamp })
			: ((s.count += 1), (s.latestAt = Math.max(s.latestAt, a.timestamp)));
	}
	return n;
}
function _R(e, n) {
	return e > 99 && n ? "99+" : String(e);
}
var SR = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
	wR = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (n, a, u) => (u ? u.toUpperCase() : a.toLowerCase())),
	Sp = (e) => {
		const n = wR(e);
		return n.charAt(0).toUpperCase() + n.slice(1);
	},
	ib = (...e) =>
		e
			.filter((n, a, u) => !!n && n.trim() !== "" && u.indexOf(n) === a)
			.join(" ")
			.trim(),
	ER = (e) => {
		for (const n in e) if (n.startsWith("aria-") || n === "role" || n === "title") return !0;
	},
	TR = {
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
	xR = (0, T.forwardRef)(
		(
			{
				color: e = "currentColor",
				size: n = 24,
				strokeWidth: a = 2,
				absoluteStrokeWidth: u,
				className: s = "",
				children: o,
				iconNode: f,
				...h
			},
			m,
		) =>
			(0, T.createElement)(
				"svg",
				{
					ref: m,
					...TR,
					width: n,
					height: n,
					stroke: e,
					strokeWidth: u ? (Number(a) * 24) / Number(n) : a,
					className: ib("lucide", s),
					...(!o && !ER(h) && { "aria-hidden": "true" }),
					...h,
				},
				[...f.map(([g, y]) => (0, T.createElement)(g, y)), ...(Array.isArray(o) ? o : [o])],
			),
	),
	th = (e, n) => {
		const a = (0, T.forwardRef)(({ className: u, ...s }, o) =>
			(0, T.createElement)(xR, { ref: o, iconNode: n, className: ib(`lucide-${SR(Sp(e))}`, `lucide-${e}`, u), ...s }),
		);
		return ((a.displayName = Sp(e)), a);
	},
	AR = [
		["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
		["path", { d: "M12 19V5", key: "x0mq9r" }],
	],
	CR = th("arrow-up", AR),
	RR = [
		["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
		["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
		["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
	],
	NR = th("ellipsis", RR),
	OR = [
		[
			"path",
			{
				d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
				key: "1miecu",
			},
		],
	],
	kR = th("paperclip", OR),
	MR = $n((e) => {
		var n = Symbol.for("react.transitional.element"),
			a = Symbol.for("react.fragment");
		function u(s, o, f) {
			var h = null;
			if ((f !== void 0 && (h = "" + f), o.key !== void 0 && (h = "" + o.key), "key" in o)) {
				f = {};
				for (var m in o) m !== "key" && (f[m] = o[m]);
			} else f = o;
			return ((o = f.ref), { $$typeof: n, type: s, key: h, ref: o !== void 0 ? o : null, props: f });
		}
		((e.Fragment = a), (e.jsx = u), (e.jsxs = u));
	}),
	zR = $n((e, n) => {
		n.exports = MR();
	}),
	_ = zR(),
	sd =
		'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Sl(e) {
	const n = (0, T.useRef)(null);
	((0, T.useEffect)(() => {
		const u = document.activeElement instanceof HTMLElement ? document.activeElement : null,
			s = n.current;
		return (
			(s?.querySelector("[data-dialog-initial]") ?? s?.querySelector(sd))?.focus(),
			() => {
				u?.focus();
			}
		);
	}, []),
		(0, T.useEffect)(() => {
			const u = n.current;
			if (!u) return;
			const s = () => {
					!u.isConnected ||
						document.activeElement !== document.body ||
						(u.querySelector("[data-dialog-initial]") ?? u.querySelector(sd))?.focus();
				},
				o = () => queueMicrotask(s);
			return (u.addEventListener("focusout", o), () => u.removeEventListener("focusout", o));
		}, []));
	const a = (u) => {
		if (u.key === "Escape") {
			(u.stopPropagation(), e.onClose());
			return;
		}
		if (u.key !== "Tab") return;
		const s = n.current;
		if (!s) return;
		const o = [...s.querySelectorAll(sd)];
		if (o.length === 0) return;
		const f = o[0],
			h = o[o.length - 1];
		u.shiftKey && document.activeElement === f
			? (u.preventDefault(), h.focus())
			: !u.shiftKey && document.activeElement === h && (u.preventDefault(), f.focus());
	};
	return (0, _.jsx)("div", {
		className: "dialog-overlay",
		children: (0, _.jsx)("div", {
			ref: n,
			className: "dialog",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": e.labelledBy,
			onKeyDown: a,
			children: e.children,
		}),
	});
}
function ab(e) {
	const [n, a] = (0, T.useState)([]),
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
						const S = m._nay.name === "storage_full";
						(S && e.onStorageFull(m._nay.message),
							a((b) =>
								b.map((p) =>
									p.clientRequestId === f.clientRequestId
										? { ...p, status: "failed", errorMessage: S ? null : m._nay.message }
										: p,
								),
							));
						return;
					}
					a((S) => S.filter((b) => b.clientRequestId !== f.clientRequestId));
					const g = m._yay.key,
						y = iu(g) ?? Date.now();
					e.onDelivered({
						key: g,
						value: h,
						revision: 0,
						createdBy: e.userId,
						updatedBy: e.userId,
						createdAt: y,
						updatedAt: y,
						timestamp: y,
					});
				})
				.catch((m) => {
					a((g) =>
						g.map((y) =>
							y.clientRequestId === f.clientRequestId ? { ...y, status: "failed", errorMessage: Vn(m) } : y,
						),
					);
				});
		};
	return {
		pending: n,
		send: (f, h, m) => {
			const g = crypto.randomUUID();
			(a((y) => [
				...y,
				{ clientRequestId: g, text: f, attachments: h, mentions: m, status: "sending", errorMessage: null },
			]),
				u({ clientRequestId: g, text: f, attachments: h, mentions: m }));
		},
		retry: (f) => {
			(a((h) =>
				h.map((m) => (m.clientRequestId === f.clientRequestId ? { ...m, status: "sending", errorMessage: null } : m)),
			),
				u(f));
		},
		busy: n.some((f) => f.status === "sending"),
	};
}
var DR = ["image/", "video/", "audio/", "application/", "text/"],
	wp = 20;
function jR(e) {
	const [n, a] = (0, T.useState)(new Map()),
		[u, s] = (0, T.useState)(!1),
		[o, f] = (0, T.useState)(null),
		h = (0, T.useRef)(new Map()),
		m = (0, T.useRef)(null);
	(0, T.useEffect)(() => {
		const y = m.current;
		if (y === null) return;
		const S = h.current.get(y);
		S && ((m.current = null), S.focus());
	}, [n]);
	const g = (y) => {
		((m.current = y),
			s(!0),
			f(null),
			(async () => {
				const S = new Map(n);
				for (let b = 0; b < e.attachments.length; b += wp) {
					const p = e.attachments.slice(b, b + wp),
						E = await e.client.fetchJson("/api/v1/files/download-urls", {
							body: { fileNodeIds: p.map((D) => D.fileNodeId) },
						}),
						x = yR.safeParse(E);
					if (!x.success) throw new Error("Unexpected response for the download links");
					for (const D of x.data.items) S.set(D.fileNodeId, { kind: "ready", url: D.url });
					for (const D of x.data.errors) S.set(D.fileNodeId, { kind: "error", message: D.message });
				}
				return S;
			})()
				.then((S) => {
					(s(!1), a(S));
				})
				.catch((S) => {
					(s(!1), (m.current = null), f(Vn(S)));
				}));
	};
	return (0, _.jsxs)("div", {
		className: "message-attachments",
		children: [
			e.attachments.map((y) => {
				const S = n.get(y.fileNodeId);
				return S?.kind === "ready"
					? (0, _.jsxs)(
							"span",
							{
								className: "attachment",
								children: [
									(0, _.jsx)("a", {
										ref: (b) => {
											b === null ? h.current.delete(y.fileNodeId) : h.current.set(y.fileNodeId, b);
										},
										className: "attachment-link",
										href: S.url,
										target: "_blank",
										rel: "noopener noreferrer",
										children: y.name,
									}),
									(0, _.jsx)("span", {
										className: "attachment-hint",
										children: "Link ready — it expires after a few minutes.",
									}),
								],
							},
							y.fileNodeId,
						)
					: (0, _.jsxs)(
							"span",
							{
								className: "attachment",
								children: [
									(0, _.jsx)("button", {
										type: "button",
										className: "attachment-button",
										disabled: u,
										onClick: () => g(y.fileNodeId),
										children: u ? `Getting link for ${y.name}…` : y.name,
									}),
									S?.kind === "error"
										? (0, _.jsx)("span", { className: "attachment-error", role: "alert", children: S.message })
										: null,
								],
							},
							y.fileNodeId,
						);
			}),
			o !== null ? (0, _.jsx)("span", { className: "attachment-error", role: "alert", children: o }) : null,
		],
	});
}
function LR(e) {
	const n = (0, T.useId)(),
		[a, u] = (0, T.useState)([]),
		[s, o] = (0, T.useState)(null),
		[f, h] = (0, T.useState)(!1),
		[m, g] = (0, T.useState)(!1),
		[y, S] = (0, T.useState)(null),
		b = (0, T.useRef)(new Set()),
		p = (0, T.useRef)(!1),
		E = () => {
			(g(!0),
				S(null),
				e.client
					.fetchJson("/api/v1/files/list", {
						body: {
							path: "/",
							recursive: !0,
							kind: "file",
							limit: 100,
							scanLimit: 1e4,
							contentTypePrefixes: DR,
							cursor: s,
						},
					})
					.then((x) => {
						g(!1);
						const D = vR.safeParse(x);
						if (!D.success) {
							S("Unexpected response from the file list");
							return;
						}
						const z = D.data.items.filter((R) => !b.current.has(R.nodeId));
						for (const R of z) b.current.add(R.nodeId);
						(u((R) => [...R, ...z]), o(D.data.cursor), h(D.data.isDone));
					})
					.catch((x) => {
						(g(!1), S(Vn(x)));
					}));
		};
	return (
		(0, T.useEffect)(() => {
			p.current || ((p.current = !0), E());
		}, []),
		(0, _.jsxs)(Sl, {
			labelledBy: n,
			onClose: e.onClose,
			children: [
				(0, _.jsx)("h2", { id: n, className: "dialog-title", children: "Attach a file" }),
				(0, _.jsx)("button", {
					type: "button",
					className: "button",
					"data-dialog-initial": !0,
					onClick: e.onClose,
					children: "Cancel",
				}),
				a.length > 0
					? (0, _.jsx)("ul", {
							className: "picker-list",
							children: a.map((x) =>
								(0, _.jsx)(
									"li",
									{
										children: (0, _.jsxs)("button", {
											type: "button",
											className: "picker-item",
											onClick: () => e.onPick({ fileNodeId: x.nodeId, name: x.name }),
											children: [
												(0, _.jsx)("span", { className: "picker-item-name", children: x.name }),
												(0, _.jsx)("span", { className: "picker-item-path", children: x.path }),
											],
										}),
									},
									x.nodeId,
								),
							),
						})
					: null,
				m ? (0, _.jsx)("div", { className: "channel-status", role: "status", children: "Loading files…" }) : null,
				y !== null
					? (0, _.jsxs)("div", {
							className: "channel-status is-error",
							role: "alert",
							children: [
								(0, _.jsx)("span", { children: y }),
								(0, _.jsx)("button", { type: "button", className: "button", onClick: E, children: "Retry" }),
							],
						})
					: null,
				!m && y === null && a.length === 0 && f
					? (0, _.jsx)("div", { className: "channel-status", children: "No files found." })
					: null,
				!f && !m && y === null
					? (0, _.jsx)("button", { type: "button", className: "button", onClick: E, children: "Load more" })
					: null,
			],
		})
	);
}
var qR = 8;
function rb(e) {
	const n = (0, T.useId)(),
		[a, u] = (0, T.useState)(""),
		[s, o] = (0, T.useState)([]),
		[f, h] = (0, T.useState)(!1),
		[m, g] = (0, T.useState)(null),
		[y, S] = (0, T.useState)(null),
		[b, p] = (0, T.useState)(0),
		E = (0, T.useRef)(new Map()),
		x = (0, T.useRef)(null),
		D = (0, T.useRef)(!1),
		z = ($, q) => {
			const B = /(?:^|\s)@([^\s@]*)$/.exec($.slice(0, q));
			if (B === null) {
				S(null);
				return;
			}
			(S({ start: q - B[1].length - 1, query: B[1] }),
				p(0),
				D.current ||
					((D.current = !0),
					e.client.members.list({ limit: 100 }).then((ne) => {
						g("_nay" in ne ? "failed" : ne._yay.members);
					})));
		},
		R = e.client.context.userId,
		A =
			y !== null && Array.isArray(m)
				? m
						.filter(
							($) =>
								typeof $.displayName == "string" &&
								$.displayName !== "" &&
								$.userId !== R &&
								$.displayName.toLowerCase().startsWith(y.query.toLowerCase()),
						)
						.slice(0, qR)
				: [],
		C = ($) => {
			if (y === null) return;
			const q = x.current?.selectionStart ?? a.length,
				B = `${a.slice(0, y.start)}@${$.displayName} ${a.slice(q)}`;
			(E.current.set($.userId, $.displayName), u(B), S(null));
			const ne = y.start + $.displayName.length + 2;
			queueMicrotask(() => {
				const P = x.current;
				P !== null && (P.focus(), P.setSelectionRange(ne, ne));
			});
		},
		M = () => {
			if (e.busy || e.disabled) return;
			const $ = a.trim();
			if ($ === "" && s.length === 0) return;
			const q = [...E.current.entries()].filter(([, B]) => $.includes(`@${B}`)).map(([B]) => B);
			(e.onSend($, s, q), u(""), o([]), S(null), E.current.clear());
		},
		G = ($) => {
			if (y !== null && A.length > 0) {
				if ($.key === "ArrowDown") {
					($.preventDefault(), p((q) => (q + 1) % A.length));
					return;
				}
				if ($.key === "ArrowUp") {
					($.preventDefault(), p((q) => (q - 1 + A.length) % A.length));
					return;
				}
				if ($.key === "Enter" || $.key === "Tab") {
					($.preventDefault(), C(A[b]));
					return;
				}
				if ($.key === "Escape") {
					($.preventDefault(), $.stopPropagation(), S(null));
					return;
				}
			}
			$.key === "Enter" && !$.shiftKey && ($.preventDefault(), M());
		};
	return (0, _.jsxs)("div", {
		className: "composer",
		children: [
			s.length > 0
				? (0, _.jsx)("ul", {
						className: "composer-attachments",
						children: s.map(($) =>
							(0, _.jsxs)(
								"li",
								{
									className: "composer-attachment",
									children: [
										(0, _.jsx)("span", { children: $.name }),
										(0, _.jsx)("button", {
											type: "button",
											className: "composer-attachment-remove",
											"aria-label": `Remove attachment ${$.name}`,
											onClick: () => o((q) => q.filter((B) => B.fileNodeId !== $.fileNodeId)),
											children: "×",
										}),
									],
								},
								$.fileNodeId,
							),
						),
					})
				: null,
			(0, _.jsxs)("div", {
				className: "composer-bar",
				children: [
					(0, _.jsx)("textarea", {
						ref: x,
						className: "composer-input",
						"aria-label": e.label,
						"aria-describedby": n,
						placeholder: e.label,
						rows: 1,
						value: a,
						onInput: ($) => {
							const q = $.currentTarget.value;
							(u(q), z(q, $.currentTarget.selectionStart ?? q.length));
						},
						onKeyDown: G,
					}),
					(0, _.jsx)("button", {
						type: "button",
						className: "composer-action",
						"aria-label": "Attach file",
						disabled: e.disabled,
						onClick: () => h(!0),
						children: (0, _.jsx)(kR, { size: 18, "aria-hidden": "true" }),
					}),
					(0, _.jsx)("button", {
						type: "button",
						className: "composer-action composer-send",
						"aria-label": e.busy ? "Sending…" : "Send",
						disabled: e.busy || e.disabled,
						onClick: M,
						children: (0, _.jsx)(CR, { size: 18, "aria-hidden": "true" }),
					}),
				],
			}),
			y !== null && A.length > 0
				? (0, _.jsxs)(_.Fragment, {
						children: [
							(0, _.jsx)("ul", {
								className: "mention-menu",
								role: "listbox",
								"aria-label": "Mention somebody",
								children: A.map(($, q) =>
									(0, _.jsx)(
										"li",
										{
											role: "option",
											"aria-selected": q === b,
											className: q === b ? "mention-option is-active" : "mention-option",
											onMouseDown: (B) => {
												(B.preventDefault(), C($));
											},
											children: $.displayName,
										},
										$.userId,
									),
								),
							}),
							(0, _.jsx)("span", {
								className: "visually-hidden",
								role: "status",
								children: `${A[b]?.displayName ?? ""}, ${b + 1} of ${A.length}`,
							}),
						],
					})
				: null,
			(0, _.jsx)("span", { id: n, className: "composer-hint", children: "Enter sends · Shift+Enter for a new line" }),
			f
				? (0, _.jsx)(LR, {
						client: e.client,
						onPick: ($) => {
							(o((q) => (q.some((B) => B.fileNodeId === $.fileNodeId) ? q : [...q, $])), h(!1));
						},
						onClose: () => h(!1),
					})
				: null,
		],
	});
}
function UR(e) {
	const [n, a] = (0, T.useState)(!1),
		u = (0, T.useRef)(null),
		s = (0, T.useRef)([]);
	(0, T.useEffect)(() => {
		n && s.current[0]?.focus();
	}, [n]);
	const o = () => {
			(a(!1), u.current?.focus());
		},
		f = (h, m) => {
			h.key === "Escape"
				? (h.preventDefault(), o())
				: h.key === "ArrowRight" || h.key === "ArrowDown"
					? (h.preventDefault(), s.current[(m + 1) % Gr.length]?.focus())
					: (h.key === "ArrowLeft" || h.key === "ArrowUp") &&
						(h.preventDefault(), s.current[(m + Gr.length - 1) % Gr.length]?.focus());
		};
	return (0, _.jsxs)("span", {
		className: "add-reaction",
		children: [
			(0, _.jsx)("button", {
				ref: u,
				type: "button",
				className: "button message-action",
				"aria-expanded": n,
				onClick: () => (n ? o() : a(!0)),
				children: "Add reaction",
			}),
			n
				? (0, _.jsx)("span", {
						className: "reaction-palette",
						role: "group",
						"aria-label": "Choose a reaction",
						children: Gr.map((h, m) => {
							const g = e.groups.find((y) => y.token === h)?.reactedByMe ?? !1;
							return (0, _.jsx)(
								"button",
								{
									ref: (y) => {
										s.current[m] = y;
									},
									type: "button",
									className: "reaction-palette-item",
									"aria-pressed": g,
									"aria-label": J0[h],
									onKeyDown: (y) => f(y, m),
									onClick: () => {
										(e.onPick(h, g), o());
									},
									children: (0, _.jsx)("span", { "aria-hidden": "true", children: F0[h] }),
								},
								h,
							);
						}),
					})
				: null,
		],
	});
}
var ub = 1440 * 60 * 1e3,
	$R = 300 * 1e3;
function BR(e) {
	return new Date(e).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" });
}
function Od(e) {
	return new Date(e).toLocaleDateString(void 0, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}
function IR(e, n) {
	const a = new Date(e).toDateString();
	return a === new Date(n).toDateString() ? "Today" : a === new Date(n - ub).toDateString() ? "Yesterday" : Od(e);
}
function ZR(e) {
	if (e == null) return "•";
	const n = e.split(/\s+/u).filter((u) => u !== "");
	if (n.length === 0) return "•";
	const a = n.length > 1 ? n[n.length - 1][0] : "";
	return `${n[0][0]}${a}`.toUpperCase();
}
function lb(e, n, a = null) {
	const u = [];
	let s = null,
		o = !1;
	for (const f of e) {
		const h = s !== null && new Date(s.timestamp).toDateString() !== new Date(f.timestamp).toDateString();
		h && u.push({ kind: "divider", key: `divider:${f.key}`, label: IR(f.timestamp, n) });
		const m =
			!o && a !== null && f.timestamp > a.lastReadAt && f.createdBy !== a.selfUserId && f.value.deletedAt === null;
		m && ((o = !0), u.push({ kind: "new", key: `new:${f.key}` }));
		const g = s !== null && !h && !m && s.createdBy === f.createdBy && f.timestamp - s.timestamp <= $R;
		(u.push({ kind: "message", doc: f, isContinuation: g }), (s = f));
	}
	return u;
}
function HR(e, n, a) {
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
			const g = f.indexOf(`@${m.name}`);
			g !== -1 && (h === null || g < h.index) && (h = { index: g, id: m.id, name: m.name });
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
			: (0, _.jsxs)("span", { className: h.id === a ? "mention mention-self" : "mention", children: ["@", h.name] }, m),
	);
}
function kd(e) {
	const { client: n, collection: a, doc: u, isOwn: s } = e,
		o = (0, T.useId)(),
		[f, h] = (0, T.useState)(!1),
		[m, g] = (0, T.useState)(""),
		[y, S] = (0, T.useState)(!1),
		[b, p] = (0, T.useState)(null),
		[E, x] = (0, T.useState)(!1),
		D = (0, T.useRef)(null),
		z = (0, T.useRef)(null);
	(0, T.useEffect)(() => {
		f && D.current?.focus();
	}, [f]);
	const R = (P, le) => {
			(S(!0),
				p(null),
				n.data
					.put({ collection: a, key: u.key, value: P, expectedRevision: u.revision })
					.then((te) => {
						if ((S(!1), "_nay" in te)) {
							if (te._nay.name === "storage_full") {
								e.onStorageFull(te._nay.message);
								return;
							}
							p(te._nay.message);
							return;
						}
						(e.onApplyLocal({ ...u, value: P, revision: te._yay.revision, updatedAt: Date.now() }), le());
					})
					.catch((te) => {
						(S(!1), p(Vn(te)));
					}));
		},
		A = () => {
			if (y) return;
			const P = m.trim();
			P !== "" &&
				R({ ...u.value, text: P, editedAt: Date.now() }, () => {
					(h(!1), z.current?.focus());
				});
		},
		C = () => {
			(h(!1), z.current?.focus());
		},
		M = () => {
			R({ ...u.value, deletedAt: Date.now() }, () => {
				x(!1);
			});
		},
		G = (P, le) => {
			if ((p(null), e.reactionGroups === "unknown" && le)) {
				p("Reactions on this message could not be loaded, so they can't be removed right now.");
				return;
			}
			(le
				? n.data.removeOwned({ collection: "reactions", key: yp(u.key, P) })
				: n.data.putOwned({ collection: "reactions", key: yp(u.key, P), value: {} })
			)
				.then((te) => {
					if ("_nay" in te) {
						if (te._nay.name === "storage_full") {
							e.onStorageFull(te._nay.message);
							return;
						}
						p(te._nay.message);
					}
				})
				.catch((te) => {
					p(Vn(te));
				});
		},
		$ = u.value.deletedAt !== null,
		q = e.authorName === null ? "Former member" : (e.authorName ?? "…"),
		B = Date.now() - u.timestamp < 7 * ub,
		ne = e.onOpenThread !== null && typeof e.replyCount == "number" && e.replyCount > 0;
	return (0, _.jsxs)("li", {
		className: e.isContinuation ? "message is-continuation" : "message is-leader",
		"data-key": u.key,
		children: [
			(0, _.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: ZR(e.authorName) }),
			(0, _.jsxs)("div", {
				className: e.isContinuation ? "message-head visually-hidden" : "message-head",
				children: [
					(0, _.jsx)("span", { className: "message-author", children: q }),
					(0, _.jsxs)("time", {
						className: "message-time",
						dateTime: new Date(u.timestamp).toISOString(),
						children: [
							B ? (0, _.jsxs)("span", { className: "visually-hidden", children: [Od(u.timestamp), " "] }) : null,
							(0, _.jsx)("span", { className: "message-clock", children: B ? BR(u.timestamp) : Od(u.timestamp) }),
						],
					}),
				],
			}),
			$
				? (0, _.jsx)("p", { className: "message-text is-deleted", children: "Message deleted" })
				: f
					? (0, _.jsxs)("div", {
							className: "message-edit",
							children: [
								(0, _.jsx)("textarea", {
									ref: D,
									className: "composer-input",
									"aria-label": "Edit message",
									rows: 2,
									value: m,
									onInput: (P) => g(P.currentTarget.value),
									onKeyDown: (P) => {
										P.key === "Escape"
											? (P.preventDefault(), C())
											: P.key === "Enter" && !P.shiftKey && (P.preventDefault(), A());
									},
								}),
								(0, _.jsxs)("div", {
									className: "message-edit-actions",
									children: [
										(0, _.jsx)("button", {
											type: "button",
											className: "button",
											disabled: y,
											onClick: C,
											children: "Cancel",
										}),
										(0, _.jsx)("button", {
											type: "button",
											className: "button button-primary",
											disabled: y,
											onClick: A,
											children: y ? "Saving…" : "Save",
										}),
									],
								}),
							],
						})
					: (0, _.jsxs)(_.Fragment, {
							children: [
								(0, _.jsxs)("p", {
									className: "message-text",
									children: [
										HR(u.value, e.memberNames, e.selfUserId),
										u.value.editedAt !== null
											? (0, _.jsx)("span", { className: "message-edited", children: " (edited)" })
											: null,
									],
								}),
								u.value.attachments.length > 0 ? (0, _.jsx)(jR, { client: n, attachments: u.value.attachments }) : null,
								e.reactionGroups === "unknown"
									? (0, _.jsx)("div", { className: "message-reactions-unknown", children: "Reactions unavailable" })
									: e.reactionGroups.length > 0
										? (0, _.jsx)("div", {
												className: "message-reactions",
												children: e.reactionGroups.map((P) =>
													(0, _.jsxs)(
														"button",
														{
															type: "button",
															className: P.reactedByMe ? "reaction-chip is-mine" : "reaction-chip",
															"aria-pressed": P.reactedByMe,
															"aria-label": `${J0[P.token]}, ${P.count} ${P.count === 1 ? "reaction" : "reactions"}`,
															onClick: () => G(P.token, P.reactedByMe),
															children: [
																(0, _.jsx)("span", { "aria-hidden": "true", children: F0[P.token] }),
																(0, _.jsx)("span", { className: "reaction-chip-count", children: P.count }),
															],
														},
														P.token,
													),
												),
											})
										: null,
								ne && typeof e.replyCount == "number"
									? (0, _.jsxs)("button", {
											ref: e.replyTriggerRef ?? void 0,
											type: "button",
											className: "message-thread-summary",
											onClick: () => e.onOpenThread?.(u),
											children: [
												(0, _.jsx)("span", {
													className: "message-thread-summary-icon",
													"aria-hidden": "true",
													children: "↳",
												}),
												(0, _.jsx)("span", {
													className: "message-thread-summary-count",
													children: `${_R(e.replyCount, e.repliesHasMore)} ${e.replyCount === 1 ? "reply" : "replies"}`,
												}),
												e.replyLatestAt !== null
													? (0, _.jsx)("span", {
															className: "message-thread-summary-recency",
															children: `Last reply ${Co(e.replyLatestAt, Date.now())}`,
														})
													: null,
											],
										})
									: null,
							],
						}),
			!$ && !f
				? (0, _.jsxs)("div", {
						className: "message-actions",
						children: [
							e.onOpenThread !== null && e.replyCount !== null && !ne
								? (0, _.jsx)("button", {
										ref: e.replyTriggerRef ?? void 0,
										type: "button",
										className: "button message-action",
										onClick: () => e.onOpenThread?.(u),
										children: e.replyCount === "unknown" ? "View thread" : "Reply in thread",
									})
								: null,
							(0, _.jsx)(UR, { groups: e.reactionGroups === "unknown" ? [] : e.reactionGroups, onPick: G }),
							s
								? (0, _.jsxs)(_.Fragment, {
										children: [
											(0, _.jsx)("button", {
												ref: z,
												type: "button",
												className: "button message-action",
												onClick: () => {
													(g(u.value.text), h(!0));
												},
												children: "Edit",
											}),
											(0, _.jsx)("button", {
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
			b !== null ? (0, _.jsx)("p", { className: "form-error", role: "alert", children: b }) : null,
			E
				? (0, _.jsxs)(Sl, {
						labelledBy: o,
						onClose: () => x(!1),
						children: [
							(0, _.jsx)("h2", { id: o, className: "dialog-title", children: "Delete message?" }),
							(0, _.jsx)("p", { children: 'The message is replaced by a "Message deleted" placeholder for everyone.' }),
							(0, _.jsxs)("div", {
								className: "dialog-actions",
								children: [
									(0, _.jsx)("button", {
										type: "button",
										className: "button",
										"data-dialog-initial": !0,
										disabled: y,
										onClick: () => x(!1),
										children: "Cancel",
									}),
									(0, _.jsx)("button", {
										type: "button",
										className: "button button-danger",
										disabled: y,
										onClick: M,
										children: y ? "Deleting…" : "Delete message",
									}),
								],
							}),
						],
					})
				: null,
		],
	});
}
function sb(e) {
	return (0, _.jsxs)("li", {
		className:
			e.pending.status === "failed" ? "message is-leader is-pending is-failed" : "message is-leader is-pending",
		children: [
			(0, _.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: "•" }),
			(0, _.jsxs)("div", {
				className: "message-head",
				children: [
					(0, _.jsx)("span", { className: "message-author", children: "You" }),
					(0, _.jsx)("span", {
						className: "message-time",
						children: e.pending.status === "sending" ? "Sending…" : "Not sent",
					}),
				],
			}),
			(0, _.jsx)("p", { className: "message-text", children: e.pending.text }),
			e.pending.attachments.length > 0
				? (0, _.jsx)("p", { className: "message-text", children: e.pending.attachments.map((n) => n.name).join(", ") })
				: null,
			e.pending.status === "failed"
				? (0, _.jsxs)("div", {
						className: "message-send-error",
						role: "alert",
						children: [
							(0, _.jsx)("span", { children: e.pending.errorMessage ?? "Failed to send message" }),
							(0, _.jsx)("button", {
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
function no(e, n) {
	return e === "denied"
		? `Chitchat can no longer read ${n}. Reload the page to try again.`
		: e === "session_expired"
			? `This Chitchat session expired, so ${n} stopped updating. Reload the page to continue.`
			: e === "unavailable"
				? `Chitchat cannot reach ${n} right now. Nothing here will update until the connection returns.`
				: e === "capacity"
					? `Chitchat has too many live views open, so ${n} stopped updating. Close a thread, or reload the page.`
					: `Chitchat stopped reading ${n}. Reload the page to try again.`;
}
function VR(e) {
	const { client: n, userId: a, root: u, memberNames: s } = e,
		[o, f] = (0, T.useState)([]),
		[h, m] = (0, T.useState)(!1),
		[g, y] = (0, T.useState)(!1),
		[S, b] = (0, T.useState)(null),
		p = (0, T.useRef)(null),
		E = (0, T.useRef)(null);
	((0, T.useEffect)(() => {
		E.current?.focus();
	}, []),
		(0, T.useEffect)(() => {
			const R = nb(vl);
			return (
				(p.current = R),
				n.data.watch({ collection: "replies", keyPrefix: gp(u.key), limit: 100 }, (A, C) => {
					if (A === null) {
						(b({ reason: C?.reason }), m(!0));
						return;
					}
					(b(null), R.apply_window(A.docs), f(R.get_sorted()), m(!0), y(A.truncated));
				})
			);
		}, [n, u.key]));
	const x = ab({
		client: n,
		collection: "replies",
		keyPrefix: gp(u.key),
		userId: a,
		onDelivered: (R) => {
			(p.current?.apply_local(R), f(p.current?.get_sorted() ?? []));
		},
		onStorageFull: e.onStorageFull,
	});
	(0, T.useEffect)(() => {
		const R = new Set();
		for (const A of o) {
			R.add(A.createdBy);
			for (const C of A.value.mentions ?? []) R.add(C);
		}
		R.size > 0 && s.resolve([...R]);
	}, [o, s]);
	const D = (R) => {
			R.key === "Escape" && (R.stopPropagation(), e.onClose());
		},
		z = lb([...o].reverse(), Date.now());
	return (0, _.jsxs)("section", {
		className: "thread",
		"aria-label": "Thread",
		onKeyDown: D,
		children: [
			(0, _.jsxs)("div", {
				className: "thread-head",
				children: [
					(0, _.jsx)("h3", { className: "thread-title", children: "Thread" }),
					(0, _.jsx)("button", {
						ref: E,
						type: "button",
						className: "button",
						onClick: e.onClose,
						children: e.isNarrow ? "Back to messages" : "Close thread",
					}),
				],
			}),
			(0, _.jsx)("ul", {
				className: "message-list thread-root",
				children: (0, _.jsx)(kd, {
					client: n,
					collection: "messages",
					doc: u,
					isOwn: u.createdBy === a,
					selfUserId: a,
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
					onStorageFull: e.onStorageFull,
				}),
			}),
			S !== null
				? (0, _.jsx)("div", {
						className: "channel-status is-error",
						role: "alert",
						children: no(S.reason, "the replies in this thread"),
					})
				: null,
			g
				? (0, _.jsx)("div", {
						className: "channel-status",
						role: "status",
						children: "Only the newest 100 replies are shown.",
					})
				: null,
			h
				? o.length === 0 && x.pending.length === 0
					? (0, _.jsx)("div", { className: "channel-status", children: "No replies yet" })
					: (0, _.jsxs)("ul", {
							className: "message-list thread-replies",
							children: [
								z.map((R) =>
									R.kind === "divider"
										? (0, _.jsx)("li", { className: "day-divider", children: R.label }, R.key)
										: R.kind === "new"
											? null
											: (0, _.jsx)(
													kd,
													{
														client: n,
														collection: "replies",
														doc: R.doc,
														isOwn: R.doc.createdBy === a,
														selfUserId: a,
														memberNames: s,
														isContinuation: R.isContinuation,
														authorName: s.get(R.doc.createdBy),
														reactionGroups: e.reactionGroupsByTarget.get(R.doc.key) ?? [],
														replyCount: null,
														replyLatestAt: null,
														repliesHasMore: !1,
														onOpenThread: null,
														replyTriggerRef: null,
														onApplyLocal: (A) => {
															(p.current?.apply_local(A), f(p.current?.get_sorted() ?? []));
														},
														onStorageFull: e.onStorageFull,
													},
													R.doc.key,
												),
								),
								x.pending.map((R) => (0, _.jsx)(sb, { pending: R, onRetry: () => x.retry(R) }, R.clientRequestId)),
							],
						})
				: (0, _.jsx)("div", { className: "channel-status", role: "status", children: "Loading replies…" }),
			e.storageFull !== null
				? (0, _.jsx)("div", { className: "channel-status is-error", role: "alert", children: e.storageFull })
				: null,
			(0, _.jsx)(rb, {
				client: n,
				label: "Reply in thread",
				busy: x.busy,
				disabled: e.storageFull !== null || S !== null,
				onSend: x.send,
			}),
		],
	});
}
var QR = 15e3;
function Ep(e, n) {
	return e.incomplete || e.death !== null ? !1 : !e.hasMore || (e.deepestRoot !== null && n < e.deepestRoot);
}
var ul = 55,
	PR = 100,
	Tp = 420,
	Fs = 244,
	od = 340,
	xp = 16;
function YR(e) {
	if (typeof e != "string") return null;
	let n;
	try {
		n = JSON.parse(e);
	} catch {
		return null;
	}
	if (typeof n != "object" || n === null) return null;
	const a = n.retryAfterMs;
	return typeof a == "number" && Number.isFinite(a) && a > 0 ? a : null;
}
function GR(e) {
	const {
			client: n,
			userId: a,
			channel: u,
			memberNames: s,
			announce: o,
			threadRootKey: f,
			setThreadRootKey: h,
			isNarrow: m,
			onNewestVisible: g,
			openedAtLastReadAt: y,
		} = e,
		[S, b] = (0, T.useState)([]),
		[p, E] = (0, T.useState)(!1),
		[x, D] = (0, T.useState)(null),
		[z, R] = (0, T.useState)({ hasMore: !1, atCapacity: !1, incomplete: !1 }),
		[A, C] = (0, T.useState)([]),
		[M, G] = (0, T.useState)([]),
		[$, q] = (0, T.useState)({ hasMore: !1, deepestRoot: null, incomplete: !1, death: null }),
		[B, ne] = (0, T.useState)({ hasMore: !1, deepestRoot: null, incomplete: !1, death: null }),
		[P, le] = (0, T.useState)(null),
		[te, X] = (0, T.useState)({ kind: "idle" }),
		[ue, O] = (0, T.useState)(od),
		[U, V] = (0, T.useState)(0),
		re = (0, T.useRef)(null),
		de = (0, T.useRef)(null),
		Ce = (0, T.useRef)(null),
		N = (0, T.useRef)(null),
		Y = (0, T.useRef)(null),
		ie = (0, T.useRef)(null),
		se = (0, T.useRef)(null),
		ge = (0, T.useRef)(null),
		ye = (0, T.useRef)(null),
		we = (0, T.useRef)(null),
		Ze = (0, T.useRef)(u.value.name),
		Oe = (0, T.useRef)(null),
		lt = (0, T.useRef)(new Map()),
		jt = (0, T.useRef)(null),
		$t = (0, T.useRef)(null),
		Yt = (0, T.useRef)(0);
	(0, T.useEffect)(() => {
		Ze.current = u.value.name;
	}, [u.value.name]);
	const it = () => {
		const ae = se.current;
		if (ae !== null)
			for (const me of [
				{ coverage: Y.current, windowHandle: Ce.current },
				{ coverage: ie.current, windowHandle: N.current },
			])
				me.coverage === null ||
					!me.coverage.hasMore ||
					me.coverage.atCapacity ||
					((me.coverage.deepestRoot === null || me.coverage.deepestRoot < ae) && me.windowHandle?.loadOlder());
	};
	((0, T.useEffect)(() => {
		const ae = nb(vl);
		re.current = ae;
		const me = n.data.watchWindow({ collection: "messages", keyPrefix: rl(u.key), pageSize: 100 }, (be, pt) => {
			if (be === null) {
				D({ reason: pt?.reason });
				return;
			}
			const qe = ae.apply_window(be.docs);
			(b(ae.get_sorted()), E(!0), R({ hasMore: be.hasMore, atCapacity: be.atCapacity, incomplete: be.incomplete }));
			const Lt = qe.reduce((et, En) => (et === null || En.key > et ? En.key : et), null);
			((ge.current = Lt), (se.current = Lt === null ? null : Lt.slice(0, ul)), it());
			const Gt = Oe.current;
			if (Gt === null) {
				Oe.current = new Set(qe.map((et) => et.key));
				return;
			}
			const Ii = qe.filter((et) => !Gt.has(et.key) && et.createdBy !== a && et.value.deletedAt === null);
			for (const et of qe) Gt.add(et.key);
			if (Ii.length === 1) {
				const et = Ii[0];
				s.resolve([et.createdBy])
					.then(() => {
						const En = s.get(et.createdBy) ?? null,
							Tn = et.value.text,
							dn = Tn.length > 80 ? `${Tn.slice(0, 80)}…` : Tn;
						o(`${En ?? "Former member"}: ${dn}`);
					})
					.catch(() => {
						o(`New message in #${Ze.current}`);
					});
			} else Ii.length > 1 && o(`${Ii.length} new messages in #${Ze.current}`);
		});
		return (
			(de.current = me),
			() => {
				((de.current = null), me.unsubscribe());
			}
		);
	}, [n, u.key, a, s, o]),
		(0, T.useEffect)(() => {
			const ae = Fr(cR),
				me = n.data.watchWindow({ collection: "reactions", keyPrefix: rl(u.key), pageSize: 100 }, (be, pt) => {
					if (be === null) {
						((Y.current = null), q((Gt) => ({ ...Gt, death: { reason: pt?.reason } })));
						return;
					}
					const qe = ae.apply_window(be.docs);
					C(qe);
					const Lt = qe.length > 0 ? qe[qe.length - 1].key.slice(0, ul) : null;
					((Y.current = { hasMore: be.hasMore, atCapacity: be.atCapacity, deepestRoot: Lt, incomplete: be.incomplete }),
						q({ hasMore: be.hasMore, deepestRoot: Lt, incomplete: be.incomplete, death: null }),
						it());
				});
			return (
				(Ce.current = me),
				() => {
					((Ce.current = null), (Y.current = null), me.unsubscribe());
				}
			);
		}, [n, u.key]),
		(0, T.useEffect)(() => {
			const ae = Fr(vl),
				me = n.data.watchWindow({ collection: "replies", keyPrefix: rl(u.key), pageSize: 100 }, (be, pt) => {
					if (be === null) {
						((ie.current = null), ne((Gt) => ({ ...Gt, death: { reason: pt?.reason } })));
						return;
					}
					const qe = ae.apply_window(be.docs);
					G(qe);
					const Lt = qe.length > 0 ? qe[qe.length - 1].key.slice(0, ul) : null;
					((ie.current = {
						hasMore: be.hasMore,
						atCapacity: be.atCapacity,
						deepestRoot: Lt,
						incomplete: be.incomplete,
					}),
						ne({ hasMore: be.hasMore, deepestRoot: Lt, incomplete: be.incomplete, death: null }),
						it());
				});
			return (
				(N.current = me),
				() => {
					((N.current = null), (ie.current = null), me.unsubscribe());
				}
			);
		}, [n, u.key]));
	const ce = (0, T.useRef)(null),
		Ee = (ae, me) => {
			n.data
				.put({
					collection: "channels",
					key: ae.key,
					value: { ...ae.value, lastMessageAt: me },
					expectedRevision: ae.revision,
				})
				.then((be) => {
					"_nay" in be && be._nay.name === "conflict" && ce.current === null && (ce.current = me);
				})
				.catch(() => {});
		};
	(0, T.useEffect)(() => {
		const ae = ce.current;
		ae !== null && ((ce.current = null), (u.value.lastMessageAt ?? 0) < ae && Ee(u, ae));
	}, [u]);
	const Le = ab({
		client: n,
		collection: "messages",
		keyPrefix: rl(u.key),
		userId: a,
		onDelivered: (ae) => {
			(re.current?.apply_local(ae),
				Oe.current?.add(ae.key),
				b(re.current?.get_sorted() ?? []),
				ei(u.key) && ae.timestamp - (u.value.lastMessageAt ?? 0) >= QR && Ee(u, ae.timestamp));
		},
		onStorageFull: le,
	});
	((0, T.useEffect)(() => {
		const ae = new Set();
		for (const me of S) {
			ae.add(me.createdBy);
			for (const be of me.value.mentions ?? []) ae.add(be);
		}
		for (const me of M) {
			ae.add(me.createdBy);
			for (const be of me.value.mentions ?? []) ae.add(be);
		}
		ae.size > 0 && s.resolve([...ae]);
	}, [S, M, s]),
		(0, T.useEffect)(() => {
			S.length > 0 && g(S[0].timestamp);
		}, [S, g]),
		(0, T.useEffect)(() => {
			const ae = S.length > 0 ? S[0].key : null,
				me = ae !== null && ae !== $t.current,
				be = Le.pending.length > Yt.current;
			(($t.current = ae),
				(Yt.current = Le.pending.length),
				(me || be) && jt.current && (jt.current.scrollTop = jt.current.scrollHeight));
		}, [S, Le.pending.length]));
	const je = () => {
			de.current?.loadOlder();
		},
		kt = () => {
			const ae = ye.current ?? ge.current;
			ae !== null &&
				(X({ kind: "loading" }),
				n
					.fetchJson("/api/v1/plugin-data/list", {
						body: { collection: "messages", keyPrefix: rl(u.key), keyStartExclusive: ae, limit: PR },
					})
					.then((me) => {
						const be = gR.safeParse(me);
						if (!be.success) {
							X({ kind: "failed", message: "Unexpected response for older messages.", retryAt: null });
							return;
						}
						const pt = re.current;
						if (pt === null) return;
						const qe = pt.apply_window(be.data.documents);
						b(pt.get_sorted());
						for (const Lt of qe)
							(Oe.current?.add(Lt.key), (ye.current === null || Lt.key > ye.current) && (ye.current = Lt.key));
						X(be.data.isDone ? { kind: "exhausted" } : { kind: "idle" });
					})
					.catch((me) => {
						if (me.status !== 429) {
							X({ kind: "failed", message: Vn(me), retryAt: null });
							return;
						}
						const be = YR(me.responseText) ?? 1e3;
						X({
							kind: "failed",
							message: "Older messages are being loaded too quickly. Waiting a moment before you can try again.",
							retryAt: Date.now() + be,
						});
					}));
		};
	((0, T.useEffect)(() => {
		if (te.kind !== "failed" || te.retryAt === null) return;
		const ae = setTimeout(
			() => {
				X({ kind: "idle" });
			},
			Math.max(0, te.retryAt - Date.now()),
		);
		return () => {
			clearTimeout(ae);
		};
	}, [te]),
		(0, T.useEffect)(() => {
			const ae = we.current;
			if (f === null || ae === null) return;
			V(ae.clientWidth);
			const me = new ResizeObserver(() => V(ae.clientWidth));
			return (me.observe(ae), () => me.disconnect());
		}, [f]));
	const st = (ae) => {
			const me = Math.max(Fs, U - Tp);
			return Math.min(me, Math.max(Fs, ae));
		},
		Xt = (ae) => {
			ae.key === "ArrowLeft"
				? (ae.preventDefault(), O(st(ue + xp)))
				: ae.key === "ArrowRight"
					? (ae.preventDefault(), O(st(ue - xp)))
					: ae.key === "Home" && (ae.preventDefault(), O(st(od)));
		},
		Yn = (ae) => {
			(ae.preventDefault(), ae.currentTarget.setPointerCapture(ae.pointerId));
		},
		Bi = (ae) => {
			if (!ae.currentTarget.hasPointerCapture(ae.pointerId)) return;
			const me = we.current?.getBoundingClientRect();
			me !== void 0 && O(st(me.right - ae.clientX));
		},
		vt = (0, T.useMemo)(() => pR(A, a), [A, a]),
		wa = (0, T.useMemo)(() => bR(M), [M]),
		Ea = (ae) => {
			(re.current?.apply_local(ae), b(re.current?.get_sorted() ?? []));
		},
		tr = () => {
			const ae = f;
			(h(null), ae !== null && lt.current.get(ae)?.focus());
		},
		wn = f === null ? null : (S.find((ae) => ae.key === f) ?? null),
		du = lb([...S].reverse(), Date.now(), y === null ? null : { lastReadAt: y, selfUserId: a }),
		ri = Math.max(Fs, U - Tp),
		nr = st(ue);
	return x !== null
		? (0, _.jsx)("div", {
				className: "channel",
				children: (0, _.jsx)("div", {
					className: "channel-dead",
					role: "alert",
					children: no(x.reason, `messages in #${u.value.name}`),
				}),
			})
		: (0, _.jsxs)("div", {
				className: "channel",
				children: [
					(0, _.jsxs)("header", {
						className: "channel-head",
						children: [
							(0, _.jsxs)("div", {
								className: "channel-head-main",
								children: [
									(0, _.jsxs)("h2", { className: "channel-title", children: ["#", u.value.name] }),
									u.value.topic !== void 0 && u.value.topic !== ""
										? (0, _.jsx)("p", { className: "channel-topic", children: u.value.topic })
										: null,
									ei(u.key) ? (0, _.jsx)("p", { className: "channel-privacy", children: Wd }) : null,
								],
							}),
							u.value.archivedAt !== null
								? (0, _.jsx)("span", { className: "channel-archived-badge", children: "Archived" })
								: null,
						],
					}),
					(0, _.jsxs)("div", {
						ref: we,
						className: "channel-body",
						style: { "--thread-width": `${nr}px` },
						children: [
							(0, _.jsxs)("div", {
								ref: jt,
								className: "message-log",
								role: "log",
								"aria-live": "off",
								"aria-label": `Messages in #${u.value.name}`,
								children: [
									p && z.hasMore && !z.atCapacity
										? (0, _.jsx)("div", {
												className: "log-older",
												children: (0, _.jsx)("button", {
													type: "button",
													className: "button",
													onClick: je,
													children: "Load older",
												}),
											})
										: null,
									p && z.hasMore && z.atCapacity
										? (0, _.jsxs)("div", {
												className: "log-older",
												children: [
													(0, _.jsx)("span", {
														className: "channel-status",
														role: "status",
														children:
															te.kind === "loading"
																? "Loading older messages…"
																: te.kind === "exhausted"
																	? `You have reached the start of #${u.value.name}.`
																	: "The live view stopped growing. Older messages load on request.",
													}),
													te.kind === "exhausted"
														? null
														: (0, _.jsx)("button", {
																type: "button",
																className: "button",
																disabled: te.kind === "loading" || (te.kind === "failed" && te.retryAt !== null),
																onClick: kt,
																children: "Load older messages",
															}),
													te.kind === "failed"
														? (0, _.jsx)("span", {
																className: "channel-status is-error",
																role: "alert",
																children: te.message,
															})
														: null,
												],
											})
										: null,
									z.incomplete
										? (0, _.jsx)("div", {
												className: "channel-status",
												role: "alert",
												children: "Older messages in view may be out of date.",
											})
										: null,
									$.incomplete || B.incomplete
										? (0, _.jsx)("div", {
												className: "channel-status",
												role: "alert",
												children: "Some reactions and replies in this range could not be loaded.",
											})
										: null,
									$.death !== null
										? (0, _.jsx)("div", {
												className: "channel-status is-error",
												role: "alert",
												children: no($.death.reason, "reactions in this channel"),
											})
										: null,
									B.death !== null
										? (0, _.jsx)("div", {
												className: "channel-status is-error",
												role: "alert",
												children: no(B.death.reason, "reply counts in this channel"),
											})
										: null,
									p
										? S.length === 0 && Le.pending.length === 0
											? (0, _.jsx)("div", { className: "channel-status", children: "No messages yet" })
											: (0, _.jsxs)("ul", {
													className: "message-list",
													children: [
														du.map((ae) =>
															ae.kind === "divider"
																? (0, _.jsx)("li", { className: "day-divider", children: ae.label }, ae.key)
																: ae.kind === "new"
																	? (0, _.jsx)(
																			"li",
																			{
																				className: "new-divider",
																				children: (0, _.jsx)("span", {
																					className: "new-divider-label",
																					children: "New messages",
																				}),
																			},
																			ae.key,
																		)
																	: (0, _.jsx)(
																			kd,
																			{
																				client: n,
																				collection: "messages",
																				doc: ae.doc,
																				isOwn: ae.doc.createdBy === a,
																				selfUserId: a,
																				memberNames: s,
																				isContinuation: ae.isContinuation,
																				authorName: s.get(ae.doc.createdBy),
																				reactionGroups: Ep($, ae.doc.key.slice(0, ul))
																					? (vt.get(ae.doc.key) ?? [])
																					: "unknown",
																				replyCount: Ep(B, ae.doc.key.slice(0, ul))
																					? (wa.get(ae.doc.key)?.count ?? 0)
																					: "unknown",
																				replyLatestAt: wa.get(ae.doc.key)?.latestAt ?? null,
																				repliesHasMore: B.hasMore,
																				onOpenThread: (me) => h(me.key),
																				replyTriggerRef: (me) => {
																					me === null ? lt.current.delete(ae.doc.key) : lt.current.set(ae.doc.key, me);
																				},
																				onApplyLocal: Ea,
																				onStorageFull: le,
																			},
																			ae.doc.key,
																		),
														),
														Le.pending.map((ae) =>
															(0, _.jsx)(sb, { pending: ae, onRetry: () => Le.retry(ae) }, ae.clientRequestId),
														),
													],
												})
										: (0, _.jsx)("div", { className: "channel-status", role: "status", children: "Loading messages…" }),
								],
							}),
							wn !== null
								? (0, _.jsx)("div", {
										className: "thread-resize",
										role: "separator",
										tabIndex: 0,
										"aria-orientation": "vertical",
										"aria-label": "Resize thread panel",
										"aria-valuenow": nr,
										"aria-valuemin": Fs,
										"aria-valuemax": ri,
										onKeyDown: Xt,
										onPointerDown: Yn,
										onPointerMove: Bi,
										onDoubleClick: () => O(st(od)),
									})
								: null,
							wn !== null
								? (0, _.jsx)(
										VR,
										{
											client: n,
											userId: a,
											root: wn,
											reactionGroupsByTarget: vt,
											memberNames: s,
											isNarrow: m,
											storageFull: P,
											onStorageFull: le,
											onApplyLocalRoot: Ea,
											onClose: tr,
										},
										wn.key,
									)
								: null,
						],
					}),
					P !== null ? (0, _.jsx)("div", { className: "channel-status is-error", role: "alert", children: P }) : null,
					(0, _.jsx)(rb, {
						client: n,
						label: `Message #${u.value.name}`,
						busy: Le.busy,
						disabled: P !== null,
						onSend: Le.send,
					}),
				],
			});
}
function io(...e) {}
function ob(e, n) {
	return KR(e) ? e(XR(n) ? n() : n) : e;
}
function KR(e) {
	return typeof e == "function";
}
function XR(e) {
	return typeof e == "function";
}
function Di(e, n) {
	return typeof Object.hasOwn == "function" ? Object.hasOwn(e, n) : Object.prototype.hasOwnProperty.call(e, n);
}
function Sn(...e) {
	return (...n) => {
		for (const a of e) typeof a == "function" && a(...n);
	};
}
function FR(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function JR(e, n) {
	const a = { ...e };
	for (const u of n) Di(a, u) && delete a[u];
	return a;
}
function WR(e, n) {
	const a = {};
	for (const u of n) Di(e, u) && (a[u] = e[u]);
	return a;
}
function cb(e) {
	return e;
}
function Kt(e, n) {
	if (!e) throw typeof n != "string" ? new Error("Invariant failed") : new Error(n);
}
function eN(e) {
	return Object.keys(e);
}
function fb(e, ...n) {
	const a = typeof e == "function" ? e(...n) : e;
	return a == null ? !1 : !a;
}
function wl(e) {
	return e.disabled || e["aria-disabled"] === !0 || e["aria-disabled"] === "true";
}
function lu(e) {
	const n = {};
	for (const a in e) e[a] !== void 0 && (n[a] = e[a]);
	return n;
}
function Be(...e) {
	for (const n of e) if (n !== void 0) return n;
}
function Md(e, n) {
	typeof e == "function" ? e(n) : e && (e.current = n);
}
function tN(e) {
	return !e || !(0, T.isValidElement)(e) ? !1 : "ref" in e.props || "ref" in e;
}
function nN(e) {
	return tN(e) ? { ...e.props }.ref || e.ref : null;
}
function iN(e, n) {
	const a = { ...e };
	for (const u in n) {
		if (!Di(n, u)) continue;
		if (u === "className") {
			const o = "className";
			a[o] = e[o] ? `${e[o]} ${n[o]}` : n[o];
			continue;
		}
		if (u === "style") {
			const o = "style";
			a[o] = e[o] ? { ...e[o], ...n[o] } : n[o];
			continue;
		}
		const s = n[u];
		if (typeof s == "function" && u.startsWith("on")) {
			const o = e[u];
			if (typeof o == "function") {
				a[u] = (...f) => {
					(s(...f), o(...f));
				};
				continue;
			}
		}
		a[u] = s;
	}
	return a;
}
var su = aN();
function aN() {
	var e;
	return typeof window < "u" && !!((e = window.document) != null && e.createElement);
}
function rt(e) {
	return e ? ("self" in e ? e.document : e.ownerDocument || document) : document;
}
function db(e) {
	return e ? ("self" in e ? e.self : rt(e).defaultView || window) : self;
}
function Li(e, n = !1) {
	const { activeElement: a } = rt(e);
	if (!a?.nodeName) return null;
	if (nh(a) && a.contentDocument) return Li(a.contentDocument.body, n);
	if (n) {
		const u = a.getAttribute("aria-activedescendant");
		if (u) {
			const s = rt(a).getElementById(u);
			if (s) return s;
		}
	}
	return a;
}
function Ot(e, n) {
	return e === n || e.contains(n);
}
function nh(e) {
	return e.tagName === "IFRAME";
}
function va(e) {
	const n = e.tagName.toLowerCase();
	return n === "button" ? !0 : n === "input" && e.type ? rN.indexOf(e.type) !== -1 : !1;
}
var rN = ["button", "color", "file", "image", "reset", "submit"];
function hb(e) {
	if (typeof e.checkVisibility == "function") return e.checkVisibility();
	const n = e;
	return n.offsetWidth > 0 || n.offsetHeight > 0 || e.getClientRects().length > 0;
}
function qi(e) {
	try {
		const n = e instanceof HTMLInputElement && e.selectionStart !== null,
			a = e.tagName === "TEXTAREA";
		return n || a || !1;
	} catch {
		return !1;
	}
}
function zd(e) {
	return e.isContentEditable || qi(e);
}
function uN(e) {
	if (qi(e)) return e.value;
	if (e.isContentEditable) {
		const n = rt(e).createRange();
		return (n.selectNodeContents(e), n.toString());
	}
	return "";
}
function lN(e) {
	let n = 0,
		a = 0;
	if (qi(e)) ((n = e.selectionStart || 0), (a = e.selectionEnd || 0));
	else if (e.isContentEditable) {
		const u = rt(e).getSelection();
		if (u?.rangeCount && u.anchorNode && Ot(e, u.anchorNode) && u.focusNode && Ot(e, u.focusNode)) {
			const s = u.getRangeAt(0),
				o = s.cloneRange();
			(o.selectNodeContents(e),
				o.setEnd(s.startContainer, s.startOffset),
				(n = o.toString().length),
				o.setEnd(s.endContainer, s.endOffset),
				(a = o.toString().length));
		}
	}
	return { start: n, end: a };
}
function ih(e, n) {
	const a = ["dialog", "menu", "listbox", "tree", "grid"],
		u = e?.getAttribute("role");
	return u && a.indexOf(u) !== -1 ? u : n;
}
function mb(e, n) {
	var a;
	const u = { menu: "menuitem", listbox: "option", tree: "treeitem" },
		s = ih(e);
	return s && (a = u[s]) != null ? a : n;
}
function vb(e) {
	if (!e) return null;
	const n = (a) => a === "auto" || a === "scroll";
	if (e.clientHeight && e.scrollHeight > e.clientHeight) {
		const { overflowY: a } = getComputedStyle(e);
		if (n(a)) return e;
	} else if (e.clientWidth && e.scrollWidth > e.clientWidth) {
		const { overflowX: a } = getComputedStyle(e);
		if (n(a)) return e;
	}
	return vb(e.parentElement) || document.scrollingElement || document.body;
}
function gb(e, n) {
	const a = e.map((s, o) => [o, s]);
	let u = !1;
	return (
		a.sort(([s, o], [f, h]) => {
			const m = n(o),
				g = n(h);
			return m === g || !m || !g ? 0 : sN(m, g) ? (s > f && (u = !0), -1) : (s < f && (u = !0), 1);
		}),
		u ? a.map(([s, o]) => o) : e
	);
}
function sN(e, n) {
	return !!(n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
function oN() {
	return su && !!navigator.maxTouchPoints;
}
function ah() {
	return su ? /mac|iphone|ipad|ipod/i.test(navigator.platform) : !1;
}
function rh() {
	return su && ah() && /apple/i.test(navigator.vendor);
}
function cN() {
	return su && /firefox\//i.test(navigator.userAgent);
}
function fN() {
	return su && navigator.platform.startsWith("Mac") && !oN();
}
function yb(e) {
	return !!(e.currentTarget && !Ot(e.currentTarget, e.target));
}
function bn(e) {
	return e.target === e.currentTarget;
}
function dN(e) {
	const n = e.currentTarget;
	if (!n) return !1;
	const a = ah();
	if ((a && !e.metaKey) || (!a && !e.ctrlKey)) return !1;
	const u = n.tagName.toLowerCase();
	return u === "a" || (u === "button" && n.type === "submit") || (u === "input" && n.type === "submit");
}
function hN(e) {
	const n = e.currentTarget;
	if (!n) return !1;
	const a = n.tagName.toLowerCase();
	return e.altKey ? a === "a" || (a === "button" && n.type === "submit") || (a === "input" && n.type === "submit") : !1;
}
function mN(e, n, a) {
	const u = new Event(n, a);
	return e.dispatchEvent(u);
}
function Zr(e, n) {
	const a = new FocusEvent("blur", n),
		u = e.dispatchEvent(a),
		s = { ...n, bubbles: !0 };
	return (e.dispatchEvent(new FocusEvent("focusout", s)), u);
}
function vN(e, n, a) {
	const u = new KeyboardEvent(n, a);
	return e.dispatchEvent(u);
}
function Ap(e, n) {
	const a = new MouseEvent("click", n);
	return e.dispatchEvent(a);
}
function Vr(e, n) {
	const a = n || e.currentTarget,
		u = e.relatedTarget;
	return !u || !Ot(a, u);
}
function cl(e, n, a, u) {
	const o = ((h) => {
			if (u) {
				const g = setTimeout(h, u);
				return () => clearTimeout(g);
			}
			const m = requestAnimationFrame(h);
			return () => cancelAnimationFrame(m);
		})(() => {
			(e.removeEventListener(n, f, !0), a());
		}),
		f = () => {
			(o(), a());
		};
	return (e.addEventListener(n, f, { once: !0, capture: !0 }), o);
}
function Pt(e, n, a, u = window) {
	const s = [];
	try {
		u.document.addEventListener(e, n, a);
		for (const f of Array.from(u.frames)) s.push(Pt(e, n, a, f));
	} catch {}
	return () => {
		try {
			u.document.removeEventListener(e, n, a);
		} catch {}
		for (const f of s) f();
	};
}
var uh = { ...T },
	Cp = uh.useId,
	TM = uh.useDeferredValue,
	Rp = uh.useInsertionEffect,
	Je = su ? T.useLayoutEffect : T.useEffect;
function pb(e) {
	const n = (0, T.useRef)(e);
	return (
		Je(() => {
			n.current = e;
		}),
		n
	);
}
function ze(e) {
	const n = (0, T.useRef)(() => {
		throw new Error("Cannot call an event handler while rendering.");
	});
	return (
		Rp
			? Rp(() => {
					n.current = e;
				})
			: (n.current = e),
		(0, T.useCallback)((...a) => {
			var u;
			return (u = n.current) == null ? void 0 : u.call(n, ...a);
		}, [])
	);
}
function gN(e) {
	const [n, a] = (0, T.useState)(null);
	return (
		Je(() => {
			if (n == null || !e) return;
			let u = null;
			return (
				e((s) => ((u = s), n)),
				() => {
					e(u);
				}
			);
		}, [n, e]),
		[n, a]
	);
}
function Dt(...e) {
	return (0, T.useMemo)(() => {
		if (e.some(Boolean))
			return (n) => {
				for (const a of e) Md(a, n);
			};
	}, e);
}
function ou(e) {
	if (Cp) {
		const u = Cp();
		return e || u;
	}
	const [n, a] = (0, T.useState)(e);
	return (
		Je(() => {
			if (e || n) return;
			const u = Math.random().toString(36).slice(2, 8);
			a(`id-${u}`);
		}, [e, n]),
		e || n
	);
}
function bb(e, n) {
	const a = (o) => {
			if (typeof o == "string") return o;
		},
		[u, s] = (0, T.useState)(() => a(n));
	return (
		Je(() => {
			const o = e && "current" in e ? e.current : e;
			s(o?.tagName.toLowerCase() || a(n));
		}, [e, n]),
		u
	);
}
function Ro(e, n) {
	const a = (0, T.useRef)(!1);
	((0, T.useEffect)(() => {
		if (a.current) return e();
		a.current = !0;
	}, n),
		(0, T.useEffect)(
			() => () => {
				a.current = !1;
			},
			[],
		));
}
function yN() {
	return (0, T.useReducer)(() => [], []);
}
function _n(e) {
	return ze(typeof e == "function" ? e : () => e);
}
function Wt(e, n, a = []) {
	const u = (0, T.useCallback)((s) => (e.wrapElement && (s = e.wrapElement(s)), n(s)), [...a, e.wrapElement]);
	return { ...e, wrapElement: u };
}
function lh(e = !1, n) {
	const [a, u] = (0, T.useState)(null);
	return { portalRef: Dt(u, n), portalNode: a, domReady: !e || a };
}
function _b(e, n, a) {
	const u = e.onLoadedMetadataCapture,
		s = (0, T.useMemo)(() => Object.assign(() => {}, { ...u, [n]: a }), [u, n, a]);
	return [u?.[n], { onLoadedMetadataCapture: s }];
}
var Np = !1;
function sh() {
	return (
		(0, T.useEffect)(() => {
			Np ||
				(Pt("mousemove", bN, !0),
				Pt("mousedown", Js, !0),
				Pt("mouseup", Js, !0),
				Pt("keydown", Js, !0),
				Pt("scroll", Js, !0),
				(Np = !0));
		}, []),
		ze(() => oh)
	);
}
var oh = !1,
	Op = 0,
	kp = 0;
function pN(e) {
	const n = e.movementX || e.screenX - Op,
		a = e.movementY || e.screenY - kp;
	return ((Op = e.screenX), (kp = e.screenY), n || a || !1);
}
function bN(e) {
	pN(e) && (oh = !0);
}
function Js() {
	oh = !1;
}
function Qe(e) {
	const n = T.forwardRef((a, u) => e({ ...a, ref: u }));
	return ((n.displayName = e.displayName || e.name), n);
}
function ch(e, n) {
	return T.memo(e, n);
}
function Fe(e, n) {
	const { wrapElement: a, render: u, ...s } = n,
		o = Dt(n.ref, nN(u));
	let f;
	if (T.isValidElement(u)) {
		const h = { ...u.props, ref: o };
		f = T.cloneElement(u, iN(s, h));
	} else u ? (f = u(s)) : (f = (0, _.jsx)(e, { ...s }));
	return a ? a(f) : f;
}
function We(e) {
	const n = (a = {}) => e(a);
	return ((n.displayName = e.name), n);
}
function Ui(e = [], n = []) {
	const a = T.createContext(void 0),
		u = T.createContext(void 0),
		s = () => T.useContext(a),
		o = (g = !1) => {
			const y = T.useContext(u),
				S = s();
			return g ? y : y || S;
		},
		f = () => {
			const g = T.useContext(u),
				y = s();
			if (!(g && g === y)) return y;
		},
		h = (g) => e.reduceRight((y, S) => (0, _.jsx)(S, { ...g, children: y }), (0, _.jsx)(a.Provider, { ...g }));
	return {
		context: a,
		scopedContext: u,
		useContext: s,
		useScopedContext: o,
		useProviderContext: f,
		ContextProvider: h,
		ScopedContextProvider: (g) =>
			(0, _.jsx)(h, {
				...g,
				children: n.reduceRight((y, S) => (0, _.jsx)(S, { ...g, children: y }), (0, _.jsx)(u.Provider, { ...g })),
			}),
	};
}
var El = Ui(),
	_N = El.useContext,
	xM = El.useScopedContext,
	AM = El.useProviderContext,
	SN = El.ContextProvider,
	wN = El.ScopedContextProvider,
	Tl = Ui([SN], [wN]),
	fh = Tl.useContext,
	CM = Tl.useScopedContext,
	EN = Tl.useProviderContext,
	No = Tl.ContextProvider,
	dh = Tl.ScopedContextProvider,
	TN = (0, T.createContext)(void 0),
	xN = (0, T.createContext)(void 0),
	xl = Ui([No], [dh]),
	AN = xl.useContext,
	CN = xl.useScopedContext,
	RM = xl.useProviderContext,
	NM = xl.ContextProvider,
	OM = xl.ScopedContextProvider,
	kM = (0, T.createContext)(void 0),
	Al = Ui(),
	MM = Al.useContext,
	zM = Al.useScopedContext,
	hh = Al.useProviderContext,
	RN = Al.ContextProvider,
	NN = Al.ScopedContextProvider,
	Cl = Ui([RN], [NN]),
	DM = Cl.useContext,
	jM = Cl.useScopedContext,
	Oo = Cl.useProviderContext,
	ON = Cl.ContextProvider,
	mh = Cl.ScopedContextProvider,
	kN = (0, T.createContext)(void 0),
	MN = (0, T.createContext)(void 0),
	Rl = Ui([ON], [mh]),
	LM = Rl.useContext,
	qM = Rl.useScopedContext,
	ko = Rl.useProviderContext,
	Sb = Rl.ContextProvider,
	Mo = Rl.ScopedContextProvider,
	Nl = Ui([Sb], [Mo]),
	UM = Nl.useContext,
	$M = Nl.useScopedContext,
	vh = Nl.useProviderContext,
	zN = Nl.ContextProvider,
	wb = Nl.ScopedContextProvider,
	Ol = Ui([No, zN], [dh, wb]),
	DN = Ol.useContext,
	jN = Ol.useScopedContext,
	zo = Ol.useProviderContext,
	Eb = Ol.ContextProvider,
	LN = Ol.ScopedContextProvider,
	BM = (0, T.createContext)(void 0),
	qN = { id: null };
function UN(e, n, a = !1) {
	const u = e.findIndex((s) => s.id === n);
	return [...e.slice(u + 1), ...(a ? [qN] : []), ...e.slice(0, u)];
}
function $N(e, n) {
	return e.find((a) => (n ? !a.disabled && a.id !== n : !a.disabled));
}
function ha(e, n) {
	return (n && e.item(n)) || null;
}
function BN(e) {
	const n = [];
	for (const a of e) {
		const u = n.find((s) => {
			var o;
			return ((o = s[0]) == null ? void 0 : o.rowId) === a.rowId;
		});
		u ? u.push(a) : n.push([a]);
	}
	return n;
}
function IN(e, n = !1) {
	if (qi(e)) e.setSelectionRange(n ? e.value.length : 0, e.value.length);
	else if (e.isContentEditable) {
		const a = rt(e).getSelection();
		(a?.selectAllChildren(e), n && a?.collapseToEnd());
	}
}
var Dd = Symbol("FOCUS_SILENTLY");
function ZN(e) {
	((e[Dd] = !0), e.focus({ preventScroll: !0 }));
}
function HN(e) {
	const n = e[Dd];
	return (delete e[Dd], n);
}
function fl(e, n, a) {
	if (!n || n === a) return !1;
	const u = e.item(n.id);
	return !(!u || (a && u.element === a));
}
var VN = "div",
	Ri = "";
function cd() {
	Ri = "";
}
function QN(e) {
	const n = e.target;
	return n && qi(n)
		? !1
		: e.key === " " && Ri.length
			? !0
			: e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey && /^[\p{Letter}\p{Number}]$/u.test(e.key);
}
function PN(e, n) {
	if (bn(e)) return !0;
	const a = e.target;
	return a ? n.some((u) => u.element === a) : !1;
}
function YN(e) {
	return e.filter((n) => !n.disabled);
}
function ao(e, n) {
	var a;
	const u = ((a = e.element) == null ? void 0 : a.textContent) || e.children || ("value" in e && e.value);
	return u ? FR(u).trim().toLowerCase().startsWith(n.toLowerCase()) : !1;
}
function GN(e, n, a) {
	if (!a) return e;
	const u = e.find((s) => s.id === a);
	return !u || !ao(u, n) || (Ri !== n && ao(u, Ri))
		? e
		: ((Ri = n),
			UN(
				e.filter((s) => ao(s, Ri)),
				a,
			).filter((s) => s.id !== a));
}
var gh = We(function ({ store: n, typeahead: a = !0, ...u }) {
		const s = fh();
		((n = n || s), Kt(n, !1));
		const o = u.onKeyDownCapture,
			f = (0, T.useRef)(0),
			h = ze((m) => {
				if ((o?.(m), m.defaultPrevented || !a || !n)) return;
				if (!QN(m)) return cd();
				const { renderedItems: g, items: y, activeId: S, id: b } = n.getState();
				let p = YN(y.length > g.length ? y : g);
				const E = rt(m.currentTarget),
					x = `[data-offscreen-id="${b}"]`,
					D = E.querySelectorAll(x);
				for (const A of D) {
					const C = A.ariaDisabled === "true" || ("disabled" in A && !!A.disabled);
					p.push({ id: A.id, element: A, disabled: C });
				}
				if ((D.length && (p = gb(p, (A) => A.element)), !PN(m, p))) return cd();
				(m.preventDefault(),
					window.clearTimeout(f.current),
					(f.current = window.setTimeout(() => {
						Ri = "";
					}, 500)));
				const z = m.key.toLowerCase();
				((Ri += z), (p = GN(p, z, S)));
				const R = p.find((A) => ao(A, Ri));
				R ? n.move(R.id) : cd();
			});
		return ((u = { ...u, onKeyDownCapture: h }), lu(u));
	}),
	IM = Qe(function (n) {
		return Fe(VN, gh(n));
	});
function er(e, n) {
	const a = e.__unstableInternals;
	return (Kt(a, "Invalid store"), a[n]);
}
function ni(e, ...n) {
	let a = e,
		u = a,
		s = Symbol(),
		o = io;
	const f = new Set(),
		h = new Set(),
		m = new Set(),
		g = new Set(),
		y = new Set(),
		S = new WeakMap(),
		b = new WeakMap(),
		p = (q) => (m.add(q), () => m.delete(q)),
		E = () => {
			const q = f.size,
				B = Symbol();
			f.add(B);
			const ne = () => {
				(f.delete(B), !f.size && o());
			};
			if (q) return ne;
			const P = eN(a).map((X) =>
					Sn(
						...n.map((ue) => {
							var O;
							const U = (O = ue?.getState) == null ? void 0 : O.call(ue);
							if (U && Di(U, X))
								return ji(ue, [X], (V) => {
									G(X, V[X], !0);
								});
						}),
					),
				),
				le = [];
			for (const X of m) le.push(X());
			const te = n.map(yh);
			return ((o = Sn(...P, ...le, ...te)), ne);
		},
		x = (q, B, ne = g) => (
			ne.add(B),
			b.set(B, q),
			() => {
				var P;
				((P = S.get(B)) == null || P(), S.delete(B), b.delete(B), ne.delete(B));
			}
		),
		D = (q, B) => x(q, B),
		z = (q, B) => (S.set(B, B(a, a)), x(q, B)),
		R = (q, B) => (S.set(B, B(a, u)), x(q, B, y)),
		A = (q) => ni(WR(a, q), $),
		C = (q) => ni(JR(a, q), $),
		M = () => a,
		G = (q, B, ne = !1) => {
			var P;
			if (!Di(a, q)) return;
			const le = ob(B, a[q]);
			if (le === a[q]) return;
			if (!ne) for (const O of n) (P = O?.setState) == null || P.call(O, q, le);
			const te = a;
			a = { ...a, [q]: le };
			const X = Symbol();
			((s = X), h.add(q));
			const ue = (O, U, V) => {
				var re;
				const de = b.get(O),
					Ce = (N) => (V ? V.has(N) : N === q);
				(!de || de.some(Ce)) && ((re = S.get(O)) == null || re(), S.set(O, O(a, U)));
			};
			for (const O of g) ue(O, te);
			queueMicrotask(() => {
				if (s !== X) return;
				const O = a;
				for (const U of y) ue(U, u, h);
				((u = O), h.clear());
			});
		},
		$ = {
			getState: M,
			setState: G,
			__unstableInternals: { setup: p, init: E, subscribe: D, sync: z, batch: R, pick: A, omit: C },
		};
	return $;
}
function Ni(e, ...n) {
	if (e) return er(e, "setup")(...n);
}
function yh(e, ...n) {
	if (e) return er(e, "init")(...n);
}
function ph(e, ...n) {
	if (e) return er(e, "subscribe")(...n);
}
function ji(e, ...n) {
	if (e) return er(e, "sync")(...n);
}
function jd(e, ...n) {
	if (e) return er(e, "batch")(...n);
}
function bh(e, ...n) {
	if (e) return er(e, "omit")(...n);
}
function KN(e, ...n) {
	if (e) return er(e, "pick")(...n);
}
function _h(...e) {
	var n;
	const a = {};
	for (const s of e) {
		const o = (n = s?.getState) == null ? void 0 : n.call(s);
		o && Object.assign(a, o);
	}
	const u = ni(a, ...e);
	return Object.assign({}, ...e, u);
}
var XN = $n((e) => {
		var n = Eo();
		function a(b, p) {
			return (b === p && (b !== 0 || 1 / b === 1 / p)) || (b !== b && p !== p);
		}
		var u = typeof Object.is == "function" ? Object.is : a,
			s = n.useState,
			o = n.useEffect,
			f = n.useLayoutEffect,
			h = n.useDebugValue;
		function m(b, p) {
			var E = p(),
				x = s({ inst: { value: E, getSnapshot: p } }),
				D = x[0].inst,
				z = x[1];
			return (
				f(
					function () {
						((D.value = E), (D.getSnapshot = p), g(D) && z({ inst: D }));
					},
					[b, E, p],
				),
				o(
					function () {
						return (
							g(D) && z({ inst: D }),
							b(function () {
								g(D) && z({ inst: D });
							})
						);
					},
					[b],
				),
				h(E),
				E
			);
		}
		function g(b) {
			var p = b.getSnapshot;
			b = b.value;
			try {
				var E = p();
				return !u(b, E);
			} catch {
				return !0;
			}
		}
		function y(b, p) {
			return p();
		}
		var S = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? y : m;
		e.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : S;
	}),
	FN = $n((e, n) => {
		n.exports = XN();
	}),
	JN = o0(FN(), 1),
	{ useSyncExternalStore: Tb } = JN.default,
	xb = () => () => {};
function zt(e, n = cb) {
	const a = T.useCallback((s) => (e ? ph(e, null, s) : xb()), [e]),
		u = () => {
			const s = typeof n == "string" ? n : null,
				o = typeof n == "function" ? n : null,
				f = e?.getState();
			if (o) return o(f);
			if (f && s && Di(f, s)) return f[s];
		};
	return Tb(a, u, u);
}
function WN(e, n) {
	const a = T.useRef({}),
		u = T.useCallback((o) => (e ? ph(e, null, o) : xb()), [e]),
		s = () => {
			const o = e?.getState();
			let f = !1;
			const h = a.current;
			for (const m in n) {
				const g = n[m];
				if (typeof g == "function") {
					const y = g(o);
					y !== h[m] && ((h[m] = y), (f = !0));
				}
				if (typeof g == "string") {
					if (!o || !Di(o, g)) continue;
					const y = o[g];
					y !== h[m] && ((h[m] = y), (f = !0));
				}
			}
			return (f && (a.current = { ...h }), a.current);
		};
	return Tb(u, s, s);
}
function Qt(e, n, a, u) {
	const s = Di(n, a) ? n[a] : void 0,
		o = pb({ value: s, setValue: u ? n[u] : void 0 });
	(Je(
		() =>
			ji(e, [a], (f, h) => {
				const { value: m, setValue: g } = o.current;
				g && f[a] !== h[a] && f[a] !== m && g(f[a]);
			}),
		[e, a],
	),
		Je(() => {
			if (s !== void 0)
				return (
					e.setState(a, s),
					jd(e, [a], () => {
						s !== void 0 && e.setState(a, s);
					})
				);
		}));
}
function Sh(e, n) {
	const [a, u] = T.useState(() => e(n));
	Je(() => yh(a), [a]);
	const s = T.useCallback((o) => zt(a, o), [a]);
	return [
		T.useMemo(() => ({ ...a, useState: s }), [a, s]),
		ze(() => {
			u((o) => e({ ...n, ...o.getState() }));
		}),
	];
}
var yo = _0(),
	eO = "div";
function Mp(e, n) {
	const a = setTimeout(n, e);
	return () => clearTimeout(a);
}
function tO(e) {
	let n = requestAnimationFrame(() => {
		n = requestAnimationFrame(e);
	});
	return () => cancelAnimationFrame(n);
}
function zp(...e) {
	return e
		.join(", ")
		.split(", ")
		.reduce((n, a) => {
			const u = a.endsWith("ms") ? 1 : 1e3,
				s = Number.parseFloat(a || "0s") * u;
			return s > n ? s : n;
		}, 0);
}
function wh(e, n, a) {
	return !a && n !== !1 && (!e || !!n);
}
var Eh = We(function ({ store: n, alwaysVisible: a, ...u }) {
		const s = hh();
		((n = n || s), Kt(n, !1));
		const o = (0, T.useRef)(null),
			f = ou(u.id),
			[h, m] = (0, T.useState)(null),
			g = n.useState("open"),
			y = n.useState("mounted"),
			S = n.useState("animated"),
			b = n.useState("contentElement"),
			p = zt(n.disclosure, "contentElement");
		(Je(() => {
			o.current && n?.setContentElement(o.current);
		}, [n]),
			Je(() => {
				let z;
				return (
					n?.setState("animated", (R) => ((z = R), !0)),
					() => {
						z !== void 0 && n?.setState("animated", z);
					}
				);
			}, [n]),
			Je(() => {
				if (S) {
					if (!b?.isConnected) {
						m(null);
						return;
					}
					return tO(() => {
						m(g ? "enter" : y ? "leave" : null);
					});
				}
			}, [S, b, g, y]),
			Je(() => {
				if (!n || !S || !h || !b) return;
				const z = () => n?.setState("animating", !1),
					R = () => (0, yo.flushSync)(z);
				if ((h === "leave" && g) || (h === "enter" && !g)) return;
				if (typeof S == "number") return Mp(S, R);
				const {
						transitionDuration: A,
						animationDuration: C,
						transitionDelay: M,
						animationDelay: G,
					} = getComputedStyle(b),
					{
						transitionDuration: $ = "0",
						animationDuration: q = "0",
						transitionDelay: B = "0",
						animationDelay: ne = "0",
					} = p ? getComputedStyle(p) : {},
					P = zp(M, G, B, ne) + zp(A, C, $, q);
				if (!P) {
					(h === "enter" && n.setState("animated", !1), z());
					return;
				}
				return Mp(Math.max(P - 1e3 / 60, 0), R);
			}, [n, S, b, p, g, h]),
			(u = Wt(u, (z) => (0, _.jsx)(mh, { value: n, children: z }), [n])));
		const E = wh(y, u.hidden, a),
			x = u.style,
			D = (0, T.useMemo)(() => (E ? { ...x, display: "none" } : x), [E, x]);
		return (
			(u = {
				id: f,
				"data-open": g || void 0,
				"data-enter": h === "enter" || void 0,
				"data-leave": h === "leave" || void 0,
				hidden: E,
				...u,
				ref: Dt(f ? n.setContentElement : null, o, u.ref),
				style: D,
			}),
			lu(u)
		);
	}),
	nO = Qe(function (n) {
		return Fe(eO, Eh(n));
	}),
	ZM = Qe(function ({ unmountOnHide: n, ...a }) {
		const u = hh();
		return zt(a.store || u, (s) => !n || s?.mounted) === !1 ? null : (0, _.jsx)(nO, { ...a });
	}),
	Ab = (0, T.createContext)(!0),
	Do =
		"input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], summary, iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])";
function iO(e) {
	return Number.parseInt(e.getAttribute("tabindex") || "0", 10) < 0;
}
function Pn(e) {
	return !(!e.matches(Do) || !hb(e) || e.closest("[inert]"));
}
function au(e) {
	if (!Pn(e) || iO(e)) return !1;
	if (!("form" in e) || !e.form || e.checked || e.type !== "radio") return !0;
	const n = e.form.elements.namedItem(e.name);
	if (!n || !("length" in n)) return !0;
	const a = Li(e);
	return !a || a === e || !("form" in a) || a.form !== e.form || a.name !== e.name;
}
function Th(e, n) {
	const a = Array.from(e.querySelectorAll(Do));
	n && a.unshift(e);
	const u = a.filter(Pn);
	return (
		u.forEach((s, o) => {
			if (nh(s) && s.contentDocument) {
				const f = s.contentDocument.body;
				u.splice(o, 1, ...Th(f));
			}
		}),
		u
	);
}
function jo(e, n, a) {
	const u = Array.from(e.querySelectorAll(Do)),
		s = u.filter(au);
	return (
		n && au(e) && s.unshift(e),
		s.forEach((o, f) => {
			if (nh(o) && o.contentDocument) {
				const h = o.contentDocument.body,
					m = jo(h, !1, a);
				s.splice(f, 1, ...m);
			}
		}),
		!s.length && a ? u : s
	);
}
function aO(e, n, a) {
	const [u] = jo(e, n, a);
	return u || null;
}
function rO(e, n, a, u) {
	const s = Li(e),
		o = Th(e, n),
		f = o.indexOf(s),
		h = o.slice(f + 1);
	return h.find(au) || (a ? o.find(au) : null) || (u ? h[0] : null) || null;
}
function fd(e, n) {
	return rO(document.body, !1, e, n);
}
function uO(e, n, a, u) {
	const s = Li(e),
		o = Th(e, n).reverse(),
		f = o.indexOf(s),
		h = o.slice(f + 1);
	return h.find(au) || (a ? o.find(au) : null) || (u ? h[0] : null) || null;
}
function Dp(e, n) {
	return uO(document.body, !1, e, n);
}
function lO(e) {
	for (; e && !Pn(e); ) e = e.closest(Do);
	return e || null;
}
function po(e) {
	const n = Li(e);
	if (!n) return !1;
	if (n === e) return !0;
	const a = n.getAttribute("aria-activedescendant");
	return a ? a === e.id : !1;
}
function ma(e) {
	const n = Li(e);
	if (!n) return !1;
	if (Ot(e, n)) return !0;
	const a = n.getAttribute("aria-activedescendant");
	return !a || !("id" in e) ? !1 : a === e.id ? !0 : !!e.querySelector(`#${CSS.escape(a)}`);
}
function Cb(e) {
	!ma(e) && Pn(e) && e.focus();
}
function sO(e) {
	var n;
	const a = (n = e.getAttribute("tabindex")) != null ? n : "";
	(e.setAttribute("data-tabindex", a), e.setAttribute("tabindex", "-1"));
}
function oO(e, n) {
	const a = jo(e, n);
	for (const u of a) sO(u);
}
function cO(e) {
	const n = e.querySelectorAll("[data-tabindex]"),
		a = (u) => {
			const s = u.getAttribute("data-tabindex");
			(u.removeAttribute("data-tabindex"), s ? u.setAttribute("tabindex", s) : u.removeAttribute("tabindex"));
		};
	e.hasAttribute("data-tabindex") && a(e);
	for (const u of n) a(u);
}
function fO(e, n) {
	"scrollIntoView" in e
		? (e.focus({ preventScroll: !0 }), e.scrollIntoView({ block: "nearest", inline: "nearest", ...n }))
		: e.focus();
}
var dO = "div",
	jp = rh(),
	hO = [
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
	Rb = Symbol("safariFocusAncestor");
function mO(e) {
	return e ? !!e[Rb] : !1;
}
function Lp(e, n) {
	e && (e[Rb] = n);
}
function vO(e) {
	const { tagName: n, readOnly: a, type: u } = e;
	return (n === "TEXTAREA" && !a) || (n === "SELECT" && !a)
		? !0
		: n === "INPUT" && !a
			? hO.includes(u)
			: !!(e.isContentEditable || (e.getAttribute("role") === "combobox" && e.dataset.name));
}
function gO(e) {
	return "labels" in e ? e.labels : null;
}
function qp(e) {
	return e.tagName.toLowerCase() === "input" && e.type ? e.type === "radio" || e.type === "checkbox" : !1;
}
function yO(e) {
	return e ? e === "button" || e === "summary" || e === "input" || e === "select" || e === "textarea" || e === "a" : !0;
}
function pO(e) {
	return e ? e === "button" || e === "input" || e === "select" || e === "textarea" : !0;
}
function bO(e, n, a, u, s) {
	return e ? (n ? (a && !u ? -1 : void 0) : a ? s : s || 0) : s;
}
function dd(e, n) {
	return ze((a) => {
		(e?.(a), !a.defaultPrevented && n && (a.stopPropagation(), a.preventDefault()));
	});
}
var Up = !1,
	xh = !0;
function _O(e) {
	const n = e.target;
	n && "hasAttribute" in n && (n.hasAttribute("data-focus-visible") || (xh = !1));
}
function SO(e) {
	e.metaKey || e.ctrlKey || e.altKey || (xh = !0);
}
var kl = We(function ({ focusable: n = !0, accessibleWhenDisabled: a, autoFocus: u, onFocusVisible: s, ...o }) {
		const f = (0, T.useRef)(null);
		((0, T.useEffect)(() => {
			n && (Up || (Pt("mousedown", _O, !0), Pt("keydown", SO, !0), (Up = !0)));
		}, [n]),
			jp &&
				(0, T.useEffect)(() => {
					if (!n) return;
					const X = f.current;
					if (!X || !qp(X)) return;
					const ue = gO(X);
					if (!ue) return;
					const O = () => queueMicrotask(() => X.focus());
					for (const U of ue) U.addEventListener("mouseup", O);
					return () => {
						for (const U of ue) U.removeEventListener("mouseup", O);
					};
				}, [n]));
		const h = n && wl(o),
			m = !!h && !a,
			[g, y] = (0, T.useState)(!1);
		((0, T.useEffect)(() => {
			n && m && g && y(!1);
		}, [n, m, g]),
			(0, T.useEffect)(() => {
				if (!n || !g) return;
				const X = f.current;
				if (!X || typeof IntersectionObserver > "u") return;
				const ue = new IntersectionObserver(() => {
					Pn(X) || y(!1);
				});
				return (ue.observe(X), () => ue.disconnect());
			}, [n, g]));
		const S = dd(o.onKeyPressCapture, h),
			b = dd(o.onMouseDownCapture, h),
			p = dd(o.onClickCapture, h),
			E = o.onMouseDown,
			x = ze((X) => {
				if ((E?.(X), X.defaultPrevented || !n)) return;
				const ue = X.currentTarget;
				if (!jp || yb(X) || (!va(ue) && !qp(ue))) return;
				let O = !1;
				const U = () => {
					O = !0;
				};
				ue.addEventListener("focusin", U, { capture: !0, once: !0 });
				const V = lO(ue.parentElement);
				(Lp(V, !0),
					cl(ue, "mouseup", () => {
						(ue.removeEventListener("focusin", U, !0), Lp(V, !1), !O && Cb(ue));
					}));
			}),
			D = (X, ue) => {
				if ((ue && (X.currentTarget = ue), !n)) return;
				const O = X.currentTarget;
				O && po(O) && (s?.(X), !X.defaultPrevented && ((O.dataset.focusVisible = "true"), y(!0)));
			},
			z = o.onKeyDownCapture,
			R = ze((X) => {
				if ((z?.(X), X.defaultPrevented || !n || g || X.metaKey || X.altKey || X.ctrlKey || !bn(X))) return;
				const ue = X.currentTarget;
				cl(ue, "focusout", () => D(X, ue));
			}),
			A = o.onFocusCapture,
			C = ze((X) => {
				if ((A?.(X), X.defaultPrevented || !n)) return;
				if (!bn(X)) {
					y(!1);
					return;
				}
				const ue = X.currentTarget,
					O = () => D(X, ue);
				xh || vO(X.target) ? cl(X.target, "focusout", O) : y(!1);
			}),
			M = o.onBlur,
			G = ze((X) => {
				(M?.(X), n && Vr(X) && (X.currentTarget.removeAttribute("data-focus-visible"), y(!1)));
			}),
			$ = (0, T.useContext)(Ab),
			q = ze((X) => {
				n &&
					u &&
					X &&
					$ &&
					queueMicrotask(() => {
						po(X) || (Pn(X) && X.focus());
					});
			}),
			B = bb(f),
			ne = n && yO(B),
			P = n && pO(B),
			le = o.style,
			te = (0, T.useMemo)(() => (m ? { pointerEvents: "none", ...le } : le), [m, le]);
		return (
			(o = {
				"data-focus-visible": (n && g) || void 0,
				"data-autofocus": u || void 0,
				"aria-disabled": h || void 0,
				...o,
				ref: Dt(f, q, o.ref),
				style: te,
				tabIndex: bO(n, m, ne, P, o.tabIndex),
				disabled: P && m ? !0 : void 0,
				contentEditable: h ? void 0 : o.contentEditable,
				onKeyPressCapture: S,
				onClickCapture: p,
				onMouseDownCapture: b,
				onMouseDown: x,
				onKeyDownCapture: R,
				onFocusCapture: C,
				onBlur: G,
			}),
			lu(o)
		);
	}),
	HM = Qe(function (n) {
		return Fe(dO, kl(n));
	});
function Nb(e) {
	const n = [];
	for (const a of e) n.push(...a);
	return n;
}
function Ld(e) {
	return e.slice().reverse();
}
var wO = "div";
function EO(e) {
	return e.some((n) => !!n.rowId);
}
function TO(e) {
	const n = e.target;
	return n && !qi(n) ? !1 : e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
function xO(e) {
	return e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta";
}
function $p(e, n, a) {
	return ze((u) => {
		var s;
		if ((n?.(u), u.defaultPrevented || u.isPropagationStopped() || !bn(u) || xO(u) || TO(u))) return;
		const o = (s = ha(e, e.getState().activeId)) == null ? void 0 : s.element;
		if (!o) return;
		const { view: f, ...h } = u;
		(o !== a?.current && o.focus(),
			vN(o, u.type, h) || u.preventDefault(),
			u.currentTarget.contains(o) && u.stopPropagation());
	});
}
function AO(e) {
	return $N(Nb(Ld(BN(e))));
}
function CO(e) {
	const [n, a] = (0, T.useState)(!1),
		u = (0, T.useCallback)(() => a(!0), []),
		s = e.useState((o) => ha(e, o.activeId));
	return (
		(0, T.useEffect)(() => {
			const o = s?.element;
			n && o && (a(!1), o.focus({ preventScroll: !0 }));
		}, [s, n]),
		u
	);
}
var Ob = We(function ({ store: n, composite: a = !0, focusOnMove: u = a, moveOnKeyPress: s = !0, ...o }) {
		const f = EN();
		((n = n || f), Kt(n, !1));
		const h = (0, T.useRef)(null),
			m = (0, T.useRef)(null),
			g = CO(n),
			y = n.useState("moves"),
			[, S] = gN(a ? n.setBaseElement : null);
		((0, T.useEffect)(() => {
			var B;
			if (!n || !y || !a || !u) return;
			const { activeId: ne } = n.getState(),
				P = (B = ha(n, ne)) == null ? void 0 : B.element;
			P && fO(P);
		}, [n, y, a, u]),
			Je(() => {
				if (!n || !y || !a) return;
				const { baseElement: B, activeId: ne } = n.getState();
				if (ne !== null || !B) return;
				const P = m.current;
				((m.current = null), P && Zr(P, { relatedTarget: B }), po(B) || B.focus());
			}, [n, y, a]));
		const b = n.useState("activeId"),
			p = n.useState("virtualFocus");
		Je(() => {
			var B;
			if (!n || !a || !p) return;
			const ne = m.current;
			if (((m.current = null), !ne)) return;
			const P = ((B = ha(n, b)) == null ? void 0 : B.element) || Li(ne);
			P !== ne && Zr(ne, { relatedTarget: P });
		}, [n, b, p, a]);
		const E = $p(n, o.onKeyDownCapture, m),
			x = $p(n, o.onKeyUpCapture, m),
			D = o.onFocusCapture,
			z = ze((B) => {
				if ((D?.(B), B.defaultPrevented || !n)) return;
				const { virtualFocus: ne } = n.getState();
				if (!ne) return;
				const P = B.relatedTarget,
					le = HN(B.currentTarget);
				bn(B) && le && (B.stopPropagation(), (m.current = P));
			}),
			R = o.onFocus,
			A = ze((B) => {
				if ((R?.(B), B.defaultPrevented || !a || !n)) return;
				const { relatedTarget: ne } = B,
					{ virtualFocus: P } = n.getState();
				P ? bn(B) && !fl(n, ne) && queueMicrotask(g) : bn(B) && n.setActiveId(null);
			}),
			C = o.onBlurCapture,
			M = ze((B) => {
				var ne;
				if ((C?.(B), B.defaultPrevented || !n)) return;
				const { virtualFocus: P, activeId: le } = n.getState();
				if (!P) return;
				const te = (ne = ha(n, le)) == null ? void 0 : ne.element,
					X = B.relatedTarget,
					ue = fl(n, X),
					O = m.current;
				((m.current = null),
					bn(B) && ue
						? (X === te ? O && O !== X && Zr(O, B) : te ? Zr(te, B) : O && Zr(O, B), B.stopPropagation())
						: !fl(n, B.target) && te && Zr(te, B));
			}),
			G = o.onKeyDown,
			$ = _n(s),
			q = ze((B) => {
				var ne;
				if ((G?.(B), B.nativeEvent.isComposing || B.defaultPrevented || !n || !bn(B))) return;
				const { orientation: P, renderedItems: le, activeId: te } = n.getState(),
					X = ha(n, te);
				if ((ne = X?.element) != null && ne.isConnected) return;
				const ue = P !== "horizontal",
					O = P !== "vertical",
					U = EO(le);
				if (
					(B.key === "ArrowLeft" || B.key === "ArrowRight" || B.key === "Home" || B.key === "End") &&
					qi(B.currentTarget)
				)
					return;
				const re = {
					ArrowUp:
						(U || ue) &&
						(() => {
							if (U) {
								const de = AO(le);
								return de?.id;
							}
							return n?.last();
						}),
					ArrowRight: (U || O) && n.first,
					ArrowDown: (U || ue) && n.first,
					ArrowLeft: (U || O) && n.last,
					Home: n.first,
					End: n.last,
					PageUp: n.first,
					PageDown: n.last,
				}[B.key];
				if (re) {
					const de = re();
					if (de !== void 0) {
						if (!$(B)) return;
						(B.preventDefault(), n.move(de));
					}
				}
			});
		return (
			(o = Wt(o, (B) => (0, _.jsx)(No, { value: n, children: B }), [n])),
			(o = {
				"aria-activedescendant": n.useState((B) => {
					var ne;
					if (n && a && B.virtualFocus) return (ne = ha(n, B.activeId)) == null ? void 0 : ne.id;
				}),
				...o,
				ref: Dt(h, S, o.ref),
				onKeyDownCapture: E,
				onKeyUpCapture: x,
				onFocusCapture: z,
				onFocus: A,
				onBlurCapture: M,
				onKeyDown: q,
			}),
			(o = kl({ focusable: n.useState((B) => a && (B.virtualFocus || B.activeId === null)), ...o })),
			o
		);
	}),
	VM = Qe(function (n) {
		return Fe(wO, Ob(n));
	}),
	RO = "div";
function NO({ store: e, ...n }) {
	const [a, u] = (0, T.useState)(void 0),
		s = n["aria-label"],
		o = zt(e, "disclosureElement"),
		f = zt(e, "contentElement");
	return (
		(0, T.useEffect)(() => {
			const h = o;
			if (!h) return;
			const m = f;
			m && (s || m.hasAttribute("aria-label") ? u(void 0) : h.id && u(h.id));
		}, [s, o, f]),
		a
	);
}
var kb = We(function ({ store: n, alwaysVisible: a, composite: u, ...s }) {
		const o = zo();
		((n = n || o), Kt(n, !1));
		const f = n.parent,
			h = n.menubar,
			m = !!f,
			g = ou(s.id),
			y = s.onKeyDown,
			S = n.useState((C) => C.placement.split("-")[0]),
			b = n.useState((C) => (C.orientation === "both" ? void 0 : C.orientation)),
			p = b !== "vertical",
			E = zt(h, (C) => !!C && C.orientation !== "vertical"),
			x = ze((C) => {
				if ((y?.(C), !C.defaultPrevented)) {
					if (m || (h && !p)) {
						const M = {
							ArrowRight: () => S === "left" && !p,
							ArrowLeft: () => S === "right" && !p,
							ArrowUp: () => S === "bottom" && p,
							ArrowDown: () => S === "top" && p,
						}[C.key];
						if (M?.()) return (C.stopPropagation(), C.preventDefault(), n?.hide());
					}
					if (h) {
						const M = {
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
							G = M?.();
						G !== void 0 && (C.stopPropagation(), C.preventDefault(), h.move(G));
					}
				}
			});
		s = Wt(s, (C) => (0, _.jsx)(LN, { value: n, children: C }), [n]);
		const D = NO({ store: n, ...s }),
			z = wh(n.useState("mounted"), s.hidden, a),
			R = z ? { ...s.style, display: "none" } : s.style;
		s = {
			id: g,
			"aria-labelledby": D,
			hidden: z,
			...s,
			ref: Dt(g ? n.setContentElement : null, s.ref),
			style: R,
			onKeyDown: x,
		};
		const A = !!n.combobox;
		return (
			(u = u ?? !A),
			u && (s = { role: "menu", "aria-orientation": b, ...s }),
			(s = Ob({ store: n, composite: u, ...s })),
			(s = gh({ store: n, typeahead: !A, ...s })),
			s
		);
	}),
	QM = Qe(function (n) {
		return Fe(RO, kb(n));
	});
function hd(e) {
	return [e.clientX, e.clientY];
}
function Bp(e, n) {
	const [a, u] = e;
	let s = !1;
	const o = n.length;
	for (let f = o, h = 0, m = f - 1; h < f; m = h++) {
		const [g, y] = n[h],
			[S, b] = n[m],
			[, p] = n[m === 0 ? f - 1 : m - 1] || [0, 0],
			E = (y - b) * (a - g) - (g - S) * (u - y);
		if (b < y) {
			if (u >= b && u < y) {
				if (E === 0) return !0;
				E > 0 && (u === b ? u > p && (s = !s) : (s = !s));
			}
		} else if (y < b) {
			if (u > y && u <= b) {
				if (E === 0) return !0;
				E < 0 && (u === b ? u < p && (s = !s) : (s = !s));
			}
		} else if (u === y && ((a >= S && a <= g) || (a >= g && a <= S))) return !0;
	}
	return s;
}
function OO(e, n) {
	const { top: a, right: u, bottom: s, left: o } = n,
		[f, h] = e;
	return [f < o ? "left" : f > u ? "right" : null, h < a ? "top" : h > s ? "bottom" : null];
}
function Ip(e, n) {
	const a = e.getBoundingClientRect(),
		{ top: u, right: s, bottom: o, left: f } = a,
		[h, m] = OO(n, a),
		g = [n];
	return (
		h
			? (m !== "top" && g.push([h === "left" ? f : s, u]),
				g.push([h === "left" ? s : f, u]),
				g.push([h === "left" ? s : f, o]),
				m !== "bottom" && g.push([h === "left" ? f : s, o]))
			: m === "top"
				? (g.push([f, u]), g.push([f, o]), g.push([s, o]), g.push([s, u]))
				: (g.push([f, o]), g.push([f, u]), g.push([s, u]), g.push([s, o])),
		g
	);
}
var Zp = (0, T.createContext)(null),
	kO = "span",
	Mb = We(function (n) {
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
	PM = Qe(function (n) {
		return Fe(kO, Mb(n));
	}),
	MO = "span",
	zO = We(function (n) {
		return (
			(n = {
				"data-focus-trap": "",
				tabIndex: 0,
				"aria-hidden": !0,
				...n,
				style: { position: "fixed", top: 0, left: 0, ...n.style },
			}),
			(n = Mb(n)),
			n
		);
	}),
	Ws = Qe(function (n) {
		return Fe(MO, zO(n));
	}),
	DO = "div";
function jO(e) {
	return rt(e).body;
}
function LO(e, n) {
	return n ? (typeof n == "function" ? n(e) : n) : rt(e).createElement("div");
}
function qO(e = "id") {
	return `${e ? `${e}-` : ""}${Math.random().toString(36).slice(2, 8)}`;
}
function fa(e) {
	queueMicrotask(() => {
		e?.focus();
	});
}
var zb = We(function ({
		preserveTabOrder: n,
		preserveTabOrderAnchor: a,
		portalElement: u,
		portalRef: s,
		portal: o = !0,
		...f
	}) {
		const h = (0, T.useRef)(null),
			m = Dt(h, f.ref),
			g = (0, T.useContext)(Zp),
			[y, S] = (0, T.useState)(null),
			[b, p] = (0, T.useState)(null),
			E = (0, T.useRef)(null),
			x = (0, T.useRef)(null),
			D = (0, T.useRef)(null),
			z = (0, T.useRef)(null);
		return (
			Je(() => {
				const R = h.current;
				if (!R || !o) {
					S(null);
					return;
				}
				const A = LO(R, u);
				if (!A) {
					S(null);
					return;
				}
				const C = A.isConnected;
				if ((C || (g || jO(R)).appendChild(A), A.id || (A.id = R.id ? `portal/${R.id}` : qO()), S(A), Md(s, A), !C))
					return () => {
						(A.remove(), Md(s, null));
					};
			}, [o, u, g, s]),
			Je(() => {
				if (!o || !n || !a) return;
				const R = rt(a).createElement("span");
				return (
					(R.style.position = "fixed"),
					a.insertAdjacentElement("afterend", R),
					p(R),
					() => {
						(R.remove(), p(null));
					}
				);
			}, [o, n, a]),
			(0, T.useEffect)(() => {
				if (!y || !n) return;
				let R = 0;
				const A = (C) => {
					if (!Vr(C)) return;
					const M = C.type === "focusin";
					if ((cancelAnimationFrame(R), M)) return cO(y);
					R = requestAnimationFrame(() => {
						oO(y, !0);
					});
				};
				return (
					y.addEventListener("focusin", A, !0),
					y.addEventListener("focusout", A, !0),
					() => {
						(cancelAnimationFrame(R),
							y.removeEventListener("focusin", A, !0),
							y.removeEventListener("focusout", A, !0));
					}
				);
			}, [y, n]),
			(f = Wt(
				f,
				(R) => {
					if (((R = (0, _.jsx)(Zp.Provider, { value: y || g, children: R })), !o)) return R;
					if (!y) return (0, _.jsx)("span", { ref: m, id: f.id, style: { position: "fixed" }, hidden: !0 });
					((R = (0, _.jsxs)(_.Fragment, {
						children: [
							n &&
								y &&
								(0, _.jsx)(Ws, {
									ref: x,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-before",
									onFocus: (C) => {
										Vr(C, y) ? fa(fd()) : fa(E.current);
									},
								}),
							R,
							n &&
								y &&
								(0, _.jsx)(Ws, {
									ref: D,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-after",
									onFocus: (C) => {
										Vr(C, y) ? fa(Dp()) : fa(z.current);
									},
								}),
						],
					})),
						y && (R = (0, yo.createPortal)(R, y)));
					let A = (0, _.jsxs)(_.Fragment, {
						children: [
							n &&
								y &&
								(0, _.jsx)(Ws, {
									ref: E,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-before",
									onFocus: (C) => {
										C.relatedTarget !== z.current && Vr(C, y) ? fa(x.current) : fa(Dp());
									},
								}),
							n && (0, _.jsx)("span", { "aria-owns": y?.id, style: { position: "fixed" } }),
							n &&
								y &&
								(0, _.jsx)(Ws, {
									ref: z,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-after",
									onFocus: (C) => {
										if (Vr(C, y)) fa(D.current);
										else {
											const M = fd();
											if (M === x.current) {
												requestAnimationFrame(() => {
													var G;
													return (G = fd()) == null ? void 0 : G.focus();
												});
												return;
											}
											fa(M);
										}
									},
								}),
						],
					});
					return (b && n && (A = (0, yo.createPortal)(A, b)), (0, _.jsxs)(_.Fragment, { children: [A, R] }));
				},
				[y, g, o, f.id, n, b],
			)),
			(f = { ...f, ref: m }),
			f
		);
	}),
	YM = Qe(function (n) {
		return Fe(DO, zb(n));
	}),
	Hp = (0, T.createContext)(0);
function UO({ level: e, children: n }) {
	const a = (0, T.useContext)(Hp),
		u = Math.max(Math.min(e || a + 1, 6), 1);
	return (0, _.jsx)(Hp.Provider, { value: u, children: n });
}
var $O = "div",
	Db = We(function ({ autoFocusOnShow: n = !0, ...a }) {
		return ((a = Wt(a, (u) => (0, _.jsx)(Ab.Provider, { value: n, children: u }), [n])), a);
	}),
	GM = Qe(function (n) {
		return Fe($O, Db(n));
	});
function BO(e, n) {
	const a = rt(e).createElement("button");
	return (
		(a.type = "button"),
		(a.tabIndex = -1),
		(a.textContent = "Dismiss popup"),
		Object.assign(a.style, {
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
		a.addEventListener("click", n),
		e.prepend(a),
		() => {
			(a.removeEventListener("click", n), a.remove());
		}
	);
}
function IO(e) {
	const n = (0, T.useRef)();
	return (
		(0, T.useEffect)(() => {
			if (!e) {
				n.current = null;
				return;
			}
			return Pt(
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
var md = new WeakMap();
function Ml(e, n, a) {
	md.has(e) || md.set(e, new Map());
	const u = md.get(e),
		s = u.get(n);
	if (!s)
		return (
			u.set(n, a()),
			() => {
				var h;
				((h = u.get(n)) == null || h(), u.delete(n));
			}
		);
	const o = a(),
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
function Ah(e, n, a) {
	return Ml(e, n, () => {
		const s = e.getAttribute(n);
		return (
			e.setAttribute(n, a),
			() => {
				s == null ? e.removeAttribute(n) : e.setAttribute(n, s);
			}
		);
	});
}
function Xa(e, n, a) {
	return Ml(e, n, () => {
		const s = n in e,
			o = e[n];
		return (
			(e[n] = a),
			() => {
				s ? (e[n] = o) : delete e[n];
			}
		);
	});
}
function qd(e, n) {
	return e
		? Ml(e, "style", () => {
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
function ZO(e, n, a) {
	return e
		? Ml(e, n, () => {
				const s = e.style.getPropertyValue(n);
				return (
					e.style.setProperty(n, a),
					() => {
						s ? e.style.setProperty(n, s) : e.style.removeProperty(n);
					}
				);
			})
		: () => {};
}
var HO = ["SCRIPT", "STYLE"];
function Ud(e) {
	return `__ariakit-dialog-snapshot-${e}`;
}
function VO(e, n) {
	const a = rt(n),
		u = Ud(e);
	if (!a.body[u]) return !0;
	do {
		if (n === a.body) return !1;
		if (n[u]) return !0;
		if (!n.parentElement) return !1;
		n = n.parentElement;
	} while (!0);
}
function QO(e, n, a) {
	return HO.includes(n.tagName) || !VO(e, n) ? !1 : !a.some((u) => u && Ot(n, u));
}
function Ch(e, n, a, u) {
	for (let s of n) {
		if (!s?.isConnected) continue;
		const o = n.some((m) => (!m || m === s ? !1 : m.contains(s))),
			f = rt(s),
			h = s;
		for (; s.parentElement && s !== f.body; ) {
			if ((u?.(s.parentElement, h), !o)) for (const m of s.parentElement.children) QO(e, m, n) && a(m, h);
			s = s.parentElement;
		}
	}
}
function PO(e, n) {
	const { body: a } = rt(n[0]),
		u = [];
	return (
		Ch(e, n, (o) => {
			u.push(Xa(o, Ud(e), !0));
		}),
		Sn(Xa(a, Ud(e), !0), () => {
			for (const o of u) o();
		})
	);
}
function jb(e, ...n) {
	if (!e) return !1;
	const a = e.getAttribute("data-backdrop");
	return a == null ? !1 : a === "" || a === "true" || !n.length ? !0 : n.some((u) => a === u);
}
function ru(e = "", n = !1) {
	return `__ariakit-dialog-${n ? "ancestor" : "outside"}${e ? `-${e}` : ""}`;
}
function YO(e, n = "") {
	return Sn(Xa(e, ru(), !0), Xa(e, ru(n), !0));
}
function Lb(e, n = "") {
	return Sn(Xa(e, ru("", !0), !0), Xa(e, ru(n, !0), !0));
}
function Rh(e, n) {
	const a = ru(n, !0);
	if (e[a]) return !0;
	const u = ru(n);
	do {
		if (e[u]) return !0;
		if (!e.parentElement) return !1;
		e = e.parentElement;
	} while (!0);
}
function Vp(e, n) {
	const a = [],
		u = n.map((o) => o?.id);
	return (
		Ch(
			e,
			n,
			(o) => {
				jb(o, ...u) || a.unshift(YO(o, e));
			},
			(o, f) => {
				(f.hasAttribute("data-dialog") && f.id !== e) || a.unshift(Lb(o, e));
			},
		),
		() => {
			for (const o of a) o();
		}
	);
}
function GO(e) {
	return e.tagName === "HTML" ? !0 : Ot(rt(e).body, e);
}
function KO(e, n) {
	if (!e) return !1;
	if (Ot(e, n)) return !0;
	const a = n.getAttribute("aria-activedescendant");
	if (a) {
		const u = rt(e).getElementById(a);
		if (u) return Ot(e, u);
	}
	return !1;
}
function XO(e, n) {
	if (!("clientY" in e)) return !1;
	const a = n.getBoundingClientRect();
	return a.width === 0 || a.height === 0
		? !1
		: a.top <= e.clientY && e.clientY <= a.top + a.height && a.left <= e.clientX && e.clientX <= a.left + a.width;
}
function vd({ store: e, type: n, listener: a, capture: u, domReady: s }) {
	const o = ze(a),
		f = zt(e, "open"),
		h = (0, T.useRef)(!1);
	(Je(() => {
		if (!f || !s) return;
		const { contentElement: m } = e.getState();
		if (!m) return;
		const g = () => {
			h.current = !0;
		};
		return (m.addEventListener("focusin", g, !0), () => m.removeEventListener("focusin", g, !0));
	}, [e, f, s]),
		(0, T.useEffect)(
			() =>
				f
					? Pt(
							n,
							(g) => {
								const { contentElement: y, disclosureElement: S } = e.getState(),
									b = g.target;
								y &&
									b &&
									GO(b) &&
									(Ot(y, b) ||
										KO(S, b) ||
										b.hasAttribute("data-focus-trap") ||
										XO(g, y) ||
										(h.current && !Rh(b, y.id)) ||
										mO(b) ||
										o(g));
							},
							u,
						)
					: void 0,
			[f, u],
		));
}
function gd(e, n) {
	return typeof e == "function" ? e(n) : !!e;
}
function FO(e, n, a) {
	const u = IO(zt(e, "open")),
		s = { store: e, domReady: a, capture: !0 };
	(vd({
		...s,
		type: "click",
		listener: (o) => {
			const { contentElement: f } = e.getState(),
				h = u.current;
			h && hb(h) && Rh(h, f?.id) && gd(n, o) && e.hide();
		},
	}),
		vd({
			...s,
			type: "focusin",
			listener: (o) => {
				const { contentElement: f } = e.getState();
				f && o.target !== rt(f) && gd(n, o) && e.hide();
			},
		}),
		vd({
			...s,
			type: "contextmenu",
			listener: (o) => {
				gd(n, o) && e.hide();
			},
		}));
}
var Qp = (0, T.createContext)({});
function JO(e) {
	const n = (0, T.useContext)(Qp),
		[a, u] = (0, T.useState)([]),
		s = (0, T.useCallback)(
			(f) => {
				var h;
				return (
					u((m) => [...m, f]),
					Sn((h = n.add) == null ? void 0 : h.call(n, f), () => {
						u((m) => m.filter((g) => g !== f));
					})
				);
			},
			[n],
		);
	Je(
		() =>
			ji(e, ["open", "contentElement"], (f) => {
				var h;
				if (f.open && f.contentElement) return (h = n.add) == null ? void 0 : h.call(n, e);
			}),
		[e, n],
	);
	const o = (0, T.useMemo)(() => ({ store: e, add: s }), [e, s]);
	return {
		wrapElement: (0, T.useCallback)((f) => (0, _.jsx)(Qp.Provider, { value: o, children: f }), [o]),
		nestedDialogs: a,
	};
}
function WO({ attribute: e, contentId: n, contentElement: a, enabled: u }) {
	const [s, o] = yN(),
		f = (0, T.useCallback)(() => {
			if (!u || !a) return !1;
			const { body: h } = rt(a),
				m = h.getAttribute(e);
			return !m || m === n;
		}, [s, u, a, e, n]);
	return (
		(0, T.useEffect)(() => {
			if (!u || !n || !a) return;
			const { body: h } = rt(a);
			if (f()) return (h.setAttribute(e, n), () => h.removeAttribute(e));
			const m = new MutationObserver(() => (0, yo.flushSync)(o));
			return (m.observe(h, { attributeFilter: [e] }), () => m.disconnect());
		}, [s, u, n, a, f, e]),
		f
	);
}
function ek(e) {
	const n = e.getBoundingClientRect().left;
	return Math.round(n) + e.scrollLeft ? "paddingLeft" : "paddingRight";
}
function tk(e, n, a) {
	const u = WO({ attribute: "data-dialog-prevent-body-scroll", contentElement: e, contentId: n, enabled: a });
	(0, T.useEffect)(() => {
		if (!u() || !e) return;
		const s = rt(e),
			o = db(e),
			{ documentElement: f, body: h } = s,
			m = f.style.getPropertyValue("--scrollbar-width"),
			g = m ? Number.parseInt(m, 10) : o.innerWidth - f.clientWidth,
			y = () => ZO(f, "--scrollbar-width", `${g}px`),
			S = ek(f),
			b = () => qd(h, { overflow: "hidden", [S]: `${g}px` }),
			p = () => {
				var x, D;
				const { scrollX: z, scrollY: R, visualViewport: A } = o,
					C = (x = A?.offsetLeft) != null ? x : 0,
					M = (D = A?.offsetTop) != null ? D : 0,
					G = qd(h, {
						position: "fixed",
						overflow: "hidden",
						top: `${-(R - Math.floor(M))}px`,
						left: `${-(z - Math.floor(C))}px`,
						right: "0",
						[S]: `${g}px`,
					});
				return () => {
					(G(), o.scrollTo({ left: z, top: R, behavior: "instant" }));
				};
			},
			E = ah() && !fN();
		return Sn(y(), E ? p() : b());
	}, [u, e]);
}
function nk(e, ...n) {
	if (!e) return !1;
	const a = e.getAttribute("data-focus-trap");
	return a == null ? !1 : n.length ? (a === "" ? !1 : n.some((u) => a === u)) : !0;
}
function qb() {
	return "inert" in HTMLElement.prototype;
}
function ik(e) {
	return Ah(e, "aria-hidden", "true");
}
function Ub(e, n) {
	return "style" in e
		? qb()
			? Xa(e, "inert", !0)
			: Sn(
					...jo(e, !0).map((a) => {
						if (n?.some((s) => s && Ot(s, a))) return io;
						const u = Ml(
							a,
							"focus",
							() => (
								(a.focus = io),
								() => {
									delete a.focus;
								}
							),
						);
						return Sn(Ah(a, "tabindex", "-1"), u);
					}),
					ik(e),
					qd(e, { pointerEvents: "none", userSelect: "none", cursor: "default" }),
				)
		: io;
}
function ak(e, n) {
	const a = [],
		u = n.map((o) => o?.id);
	return (
		Ch(
			e,
			n,
			(o) => {
				jb(o, ...u) || nk(o, ...u) || a.unshift(Ub(o, n));
			},
			(o) => {
				o.hasAttribute("role") && (n.some((f) => f && Ot(f, o)) || a.unshift(Ah(o, "role", "none")));
			},
		),
		() => {
			for (const o of a) o();
		}
	);
}
function $b(e = {}) {
	const n = _h(e.store, bh(e.disclosure, ["contentElement", "disclosureElement"]));
	const a = n?.getState(),
		u = Be(e.open, a?.open, e.defaultOpen, !1),
		s = Be(e.animated, a?.animated, !1),
		o = ni(
			{
				open: u,
				animated: s,
				animating: !!s && u,
				mounted: u,
				contentElement: Be(a?.contentElement, null),
				disclosureElement: Be(a?.disclosureElement, null),
			},
			n,
		);
	return (
		Ni(o, () =>
			ji(o, ["animated", "animating"], (f) => {
				f.animated || o.setState("animating", !1);
			}),
		),
		Ni(o, () =>
			ph(o, ["open"], () => {
				o.getState().animated && o.setState("animating", !0);
			}),
		),
		Ni(o, () =>
			ji(o, ["open", "animating"], (f) => {
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
function Bb(e, n, a) {
	return (
		Ro(n, [a.store, a.disclosure]),
		Qt(e, a, "open", "setOpen"),
		Qt(e, a, "mounted", "setMounted"),
		Qt(e, a, "animated"),
		Object.assign(e, { disclosure: a.disclosure })
	);
}
function rk(e = {}) {
	const [n, a] = Sh($b, e);
	return Bb(n, a, e);
}
var uk = "div",
	lk = [
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
	KM = We(function (n) {
		return n;
	}),
	bo = Qe(function (n) {
		return Fe(uk, n);
	});
Object.assign(
	bo,
	lk.reduce(
		(e, n) => (
			(e[n] = Qe(function (u) {
				return Fe(n, u);
			})),
			e
		),
		{},
	),
);
function sk({ store: e, backdrop: n, alwaysVisible: a, hidden: u }) {
	const s = (0, T.useRef)(null),
		o = rk({ disclosure: e }),
		f = zt(e, "contentElement");
	((0, T.useEffect)(() => {
		const g = s.current,
			y = f;
		g && y && (g.style.zIndex = getComputedStyle(y).zIndex);
	}, [f]),
		Je(() => {
			const g = f?.id;
			if (!g) return;
			const y = s.current;
			if (y) return Lb(y, g);
		}, [f]));
	const h = Eh({
		ref: s,
		store: o,
		role: "presentation",
		"data-backdrop": f?.id || "",
		alwaysVisible: a,
		hidden: u ?? void 0,
		style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 },
	});
	if (!n) return null;
	if ((0, T.isValidElement)(n)) return (0, _.jsx)(bo, { ...h, render: n });
	const m = typeof n != "boolean" ? n : "div";
	return (0, _.jsx)(bo, { ...h, render: (0, _.jsx)(m, {}) });
}
function Ib(e = {}) {
	return $b(e);
}
function Zb(e, n, a) {
	return Bb(e, n, a);
}
function ok(e = {}) {
	const [n, a] = Sh(Ib, e);
	return Zb(n, a, e);
}
var ck = "div",
	Pp = rh();
function fk(e) {
	const n = Li();
	return !n || (e && Ot(e, n)) ? !1 : !!Pn(n);
}
function Yp(e, n = !1) {
	if (!e) return null;
	const a = "current" in e ? e.current : e;
	return a ? (n ? (Pn(a) ? a : null) : a) : null;
}
var Hb = We(function ({
	store: n,
	open: a,
	onClose: u,
	focusable: s = !0,
	modal: o = !0,
	portal: f = !!o,
	backdrop: h = !!o,
	hideOnEscape: m = !0,
	hideOnInteractOutside: g = !0,
	getPersistentElements: y,
	preventBodyScroll: S = !!o,
	autoFocusOnShow: b = !0,
	autoFocusOnHide: p = !0,
	initialFocus: E,
	finalFocus: x,
	unmountOnHide: D,
	unstable_treeSnapshotKey: z,
	...R
}) {
	const A = Oo(),
		C = (0, T.useRef)(null),
		M = ok({
			store: n || A,
			open: a,
			setOpen(ce) {
				if (ce) return;
				const Ee = C.current;
				if (!Ee) return;
				const Le = new Event("close", { bubbles: !1, cancelable: !0 });
				(u && Ee.addEventListener("close", u, { once: !0 }),
					Ee.dispatchEvent(Le),
					Le.defaultPrevented && M.setOpen(!0));
			},
		}),
		{ portalRef: G, domReady: $ } = lh(f, R.portalRef),
		q = R.preserveTabOrder,
		B = zt(M, (ce) => q && !o && ce.mounted),
		ne = ou(R.id),
		P = zt(M, "open"),
		le = zt(M, "mounted"),
		te = zt(M, "contentElement"),
		X = wh(le, R.hidden, R.alwaysVisible);
	(tk(te, ne, S && !X), FO(M, g, $));
	const { wrapElement: ue, nestedDialogs: O } = JO(M);
	((R = Wt(R, ue, [ue])),
		Je(() => {
			if (!P) return;
			const ce = C.current,
				Ee = Li(ce, !0);
			Ee && Ee.tagName !== "BODY" && ((ce && Ot(ce, Ee)) || M.setDisclosureElement(Ee));
		}, [M, P]),
		Pp &&
			(0, T.useEffect)(() => {
				if (!le) return;
				const { disclosureElement: ce } = M.getState();
				if (!ce || !va(ce)) return;
				const Ee = () => {
					let Le = !1;
					const je = () => {
						Le = !0;
					};
					(ce.addEventListener("focusin", je, { capture: !0, once: !0 }),
						cl(ce, "mouseup", () => {
							(ce.removeEventListener("focusin", je, !0), !Le && Cb(ce));
						}));
				};
				return (
					ce.addEventListener("mousedown", Ee),
					() => {
						ce.removeEventListener("mousedown", Ee);
					}
				);
			}, [M, le]),
		(0, T.useEffect)(() => {
			if (!le || !$) return;
			const ce = C.current;
			if (!ce) return;
			const Ee = db(ce),
				Le = Ee.visualViewport || Ee,
				je = () => {
					var kt, st;
					const Xt = (st = (kt = Ee.visualViewport) == null ? void 0 : kt.height) != null ? st : Ee.innerHeight;
					ce.style.setProperty("--dialog-viewport-height", `${Xt}px`);
				};
			return (
				je(),
				Le.addEventListener("resize", je),
				() => {
					Le.removeEventListener("resize", je);
				}
			);
		}, [le, $]),
		(0, T.useEffect)(() => {
			if (!o || !le || !$) return;
			const ce = C.current;
			if (ce && !ce.querySelector("[data-dialog-dismiss]")) return BO(ce, M.hide);
		}, [M, o, le, $]),
		Je(() => {
			if (!qb() || P || !le || !$) return;
			const ce = C.current;
			if (ce) return Ub(ce);
		}, [P, le, $]));
	const U = P && $;
	Je(() => {
		if (!ne || !U) return;
		const ce = C.current;
		return PO(ne, [ce]);
	}, [ne, U, z]);
	const V = ze(y);
	Je(() => {
		if (!ne || !U) return;
		const { disclosureElement: ce } = M.getState(),
			Ee = [C.current, ...(V() || []), ...O.map((Le) => Le.getState().contentElement)];
		return o ? Sn(Vp(ne, Ee), ak(ne, Ee)) : Vp(ne, [ce, ...Ee]);
	}, [ne, M, U, V, O, o, z]);
	const re = !!b,
		de = _n(b),
		[Ce, N] = (0, T.useState)(!1);
	(0, T.useEffect)(() => {
		if (!P || !re || !$ || !te?.isConnected) return;
		const ce = Yp(E, !0) || te.querySelector("[data-autofocus=true],[autofocus]") || aO(te, !0, f && B) || te,
			Ee = Pn(ce);
		de(Ee ? ce : null) &&
			(N(!0),
			queueMicrotask(() => {
				(ce.focus(), Pp && Ee && ce.scrollIntoView({ block: "nearest", inline: "nearest" }));
			}));
	}, [P, re, $, te, E, f, B, de]);
	const Y = !!p,
		ie = _n(p),
		[se, ge] = (0, T.useState)(!1);
	(0, T.useEffect)(() => {
		if (P) return (ge(!0), () => ge(!1));
	}, [P]);
	const ye = (0, T.useCallback)(
			(ce, Ee = !0) => {
				const { disclosureElement: Le } = M.getState();
				if (fk(ce)) return;
				let je = Yp(x) || Le;
				if (je?.id) {
					const st = rt(je),
						Xt = `[aria-activedescendant="${je.id}"]`,
						Yn = st.querySelector(Xt);
					Yn && (je = Yn);
				}
				if (je && !Pn(je)) {
					const st = je.closest("[data-dialog]");
					if (st?.id) {
						const Xt = rt(st),
							Yn = `[aria-controls~="${st.id}"]`,
							Bi = Xt.querySelector(Yn);
						Bi && (je = Bi);
					}
				}
				const kt = je && Pn(je);
				if (!kt && Ee) {
					requestAnimationFrame(() => ye(ce, !1));
					return;
				}
				ie(kt ? je : null) && kt && je?.focus({ preventScroll: !0 });
			},
			[M, x, ie],
		),
		we = (0, T.useRef)(!1);
	(Je(() => {
		if (P || !se || !Y) return;
		const ce = C.current;
		((we.current = !0), ye(ce));
	}, [P, se, $, Y, ye]),
		(0, T.useEffect)(() => {
			if (!se || !Y) return;
			const ce = C.current;
			return () => {
				if (we.current) {
					we.current = !1;
					return;
				}
				ye(ce);
			};
		}, [se, Y, ye]));
	const Ze = _n(m);
	((0, T.useEffect)(
		() =>
			!$ || !le
				? void 0
				: Pt(
						"keydown",
						(Ee) => {
							if (Ee.key !== "Escape" || Ee.defaultPrevented) return;
							const Le = C.current;
							if (!Le || Rh(Le)) return;
							const je = Ee.target;
							if (!je) return;
							const { disclosureElement: kt } = M.getState();
							!!(je.tagName === "BODY" || Ot(Le, je) || !kt || Ot(kt, je)) && Ze(Ee) && M.hide();
						},
						!0,
					),
		[M, $, le, Ze],
	),
		(R = Wt(R, (ce) => (0, _.jsx)(UO, { level: o ? 1 : void 0, children: ce }), [o])));
	const Oe = R.hidden,
		lt = R.alwaysVisible;
	R = Wt(
		R,
		(ce) =>
			h
				? (0, _.jsxs)(_.Fragment, {
						children: [(0, _.jsx)(sk, { store: M, backdrop: h, hidden: Oe, alwaysVisible: lt }), ce],
					})
				: ce,
		[M, h, Oe, lt],
	);
	const [jt, $t] = (0, T.useState)(),
		[Yt, it] = (0, T.useState)();
	return (
		(R = Wt(
			R,
			(ce) =>
				(0, _.jsx)(mh, {
					value: M,
					children: (0, _.jsx)(kN.Provider, {
						value: $t,
						children: (0, _.jsx)(MN.Provider, { value: it, children: ce }),
					}),
				}),
			[M],
		)),
		(R = {
			id: ne,
			"data-dialog": "",
			role: "dialog",
			tabIndex: s ? -1 : void 0,
			"aria-labelledby": jt,
			"aria-describedby": Yt,
			...R,
			ref: Dt(C, R.ref),
		}),
		(R = Db({ ...R, autoFocusOnShow: Ce })),
		(R = Eh({ store: M, ...R })),
		(R = kl({ ...R, focusable: s })),
		(R = zb({ portal: f, ...R, portalRef: G, preserveTabOrder: B })),
		R
	);
});
function Lo(e, n = Oo) {
	return Qe(function (u) {
		const s = n();
		return zt(u.store || s, (o) => !u.unmountOnHide || o?.mounted || !!u.open) ? (0, _.jsx)(e, { ...u }) : null;
	});
}
var XM = Lo(
		Qe(function (n) {
			return Fe(ck, Hb(n));
		}),
		Oo,
	),
	ga = Math.min,
	Oi = Math.max,
	_o = Math.round,
	eo = Math.floor,
	ki = (e) => ({ x: e, y: e }),
	dk = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Vb(e, n, a) {
	return Oi(e, ga(n, a));
}
function ya(e, n) {
	return typeof e == "function" ? e(n) : e;
}
function pa(e) {
	return e.split("-")[0];
}
function cu(e) {
	return e.split("-")[1];
}
function Nh(e) {
	return e === "x" ? "y" : "x";
}
function Oh(e) {
	return e === "y" ? "height" : "width";
}
function ti(e) {
	const n = e[0];
	return n === "t" || n === "b" ? "y" : "x";
}
function kh(e) {
	return Nh(ti(e));
}
function hk(e, n, a) {
	a === void 0 && (a = !1);
	const u = cu(e),
		s = kh(e),
		o = Oh(s);
	let f = s === "x" ? (u === (a ? "end" : "start") ? "right" : "left") : u === "start" ? "bottom" : "top";
	return (n.reference[o] > n.floating[o] && (f = So(f)), [f, So(f)]);
}
function mk(e) {
	const n = So(e);
	return [$d(e), n, $d(n)];
}
function $d(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Gp = ["left", "right"],
	Kp = ["right", "left"],
	vk = ["top", "bottom"],
	gk = ["bottom", "top"];
function yk(e, n, a) {
	switch (e) {
		case "top":
		case "bottom":
			return a ? (n ? Kp : Gp) : n ? Gp : Kp;
		case "left":
		case "right":
			return n ? vk : gk;
		default:
			return [];
	}
}
function pk(e, n, a, u) {
	const s = cu(e);
	let o = yk(pa(e), a === "start", u);
	return (s && ((o = o.map((f) => f + "-" + s)), n && (o = o.concat(o.map($d)))), o);
}
function So(e) {
	const n = pa(e);
	return dk[n] + e.slice(n.length);
}
function bk(e) {
	var n, a, u, s;
	return {
		top: (n = e.top) != null ? n : 0,
		right: (a = e.right) != null ? a : 0,
		bottom: (u = e.bottom) != null ? u : 0,
		left: (s = e.left) != null ? s : 0,
	};
}
function Qb(e) {
	return typeof e != "number" ? bk(e) : { top: e, right: e, bottom: e, left: e };
}
function wo(e) {
	const { x: n, y: a, width: u, height: s } = e;
	return { width: u, height: s, top: a, left: n, right: n + u, bottom: a + s, x: n, y: a };
}
function Xp(e, n, a) {
	let { reference: u, floating: s } = e;
	const o = ti(n),
		f = kh(n),
		h = Oh(f),
		m = pa(n),
		g = o === "y",
		y = u.x + u.width / 2 - s.width / 2,
		S = u.y + u.height / 2 - s.height / 2,
		b = u[h] / 2 - s[h] / 2;
	let p;
	switch (m) {
		case "top":
			p = { x: y, y: u.y - s.height };
			break;
		case "bottom":
			p = { x: y, y: u.y + u.height };
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
	const E = cu(n);
	return (E && (p[f] += b * (E === "end" ? 1 : -1) * (a && g ? -1 : 1)), p);
}
async function _k(e, n) {
	var a;
	n === void 0 && (n = {});
	const { x: u, y: s, platform: o, rects: f, elements: h, strategy: m } = e,
		{
			boundary: g = "clippingAncestors",
			rootBoundary: y = "viewport",
			elementContext: S = "floating",
			altBoundary: b = !1,
			padding: p = 0,
		} = ya(n, e),
		E = Qb(p),
		x = h[b ? (S === "floating" ? "reference" : "floating") : S],
		D = wo(
			await o.getClippingRect({
				element:
					(a = await (o.isElement == null ? void 0 : o.isElement(x))) == null || a
						? x
						: x.contextElement || (await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(h.floating))),
				boundary: g,
				rootBoundary: y,
				strategy: m,
			}),
		),
		z = S === "floating" ? { x: u, y: s, width: f.floating.width, height: f.floating.height } : f.reference,
		R = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(h.floating)),
		A = ((await (o.isElement == null ? void 0 : o.isElement(R))) &&
			(await (o.getScale == null ? void 0 : o.getScale(R)))) || { x: 1, y: 1 },
		C = wo(
			o.convertOffsetParentRelativeRectToViewportRelativeRect
				? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
						elements: h,
						rect: z,
						offsetParent: R,
						strategy: m,
					})
				: z,
		);
	return {
		top: (D.top - C.top + E.top) / A.y,
		bottom: (C.bottom - D.bottom + E.bottom) / A.y,
		left: (D.left - C.left + E.left) / A.x,
		right: (C.right - D.right + E.right) / A.x,
	};
}
var Sk = 50,
	wk = async (e, n, a) => {
		const { placement: u = "bottom", strategy: s = "absolute", middleware: o = [], platform: f } = a,
			h = f.detectOverflow ? f : { ...f, detectOverflow: _k },
			m = await (f.isRTL == null ? void 0 : f.isRTL(n));
		let g = await f.getElementRects({ reference: e, floating: n, strategy: s }),
			{ x: y, y: S } = Xp(g, u, m),
			b = u,
			p = 0;
		const E = {};
		for (let x = 0; x < o.length; x++) {
			const D = o[x];
			if (!D) continue;
			const { name: z, fn: R } = D,
				{
					x: A,
					y: C,
					data: M,
					reset: G,
				} = await R({
					x: y,
					y: S,
					initialPlacement: u,
					placement: b,
					strategy: s,
					middlewareData: E,
					rects: g,
					platform: h,
					elements: { reference: e, floating: n },
				});
			((y = A ?? y),
				(S = C ?? S),
				(E[z] = { ...E[z], ...M }),
				G &&
					p < Sk &&
					(p++,
					typeof G == "object" &&
						(G.placement && (b = G.placement),
						G.rects &&
							(g = G.rects === !0 ? await f.getElementRects({ reference: e, floating: n, strategy: s }) : G.rects),
						({ x: y, y: S } = Xp(g, b, m))),
					(x = -1)));
		}
		return { x: y, y: S, placement: b, strategy: s, middlewareData: E };
	},
	Ek = (e) => ({
		name: "arrow",
		options: e,
		async fn(n) {
			const { x: a, y: u, placement: s, rects: o, platform: f, elements: h, middlewareData: m } = n,
				{ element: g, padding: y = 0 } = ya(e, n) || {};
			if (g == null) return {};
			const S = Qb(y),
				b = { x: a, y: u },
				p = kh(s),
				E = Oh(p),
				x = await f.getDimensions(g),
				D = p === "y",
				z = D ? "top" : "left",
				R = D ? "bottom" : "right",
				A = D ? "clientHeight" : "clientWidth",
				C = o.reference[E] + o.reference[p] - b[p] - o.floating[E],
				M = b[p] - o.reference[p],
				G = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(g));
			let $ = G ? G[A] : 0;
			(!$ || !(await (f.isElement == null ? void 0 : f.isElement(G)))) && ($ = h.floating[A] || o.floating[E]);
			const q = C / 2 - M / 2,
				B = $ / 2 - x[E] / 2 - 1,
				ne = ga(S[z], B),
				P = ga(S[R], B),
				le = $ - x[E] - P,
				te = $ / 2 - x[E] / 2 + q,
				X = Vb(ne, te, le),
				ue = !m.arrow && cu(s) != null && te !== X && o.reference[E] / 2 - (te < ne ? ne : P) - x[E] / 2 < 0,
				O = ue ? (te < ne ? te - ne : te - le) : 0;
			return {
				[p]: b[p] + O,
				data: { [p]: X, centerOffset: te - X - O, ...(ue && { alignmentOffset: O }) },
				reset: ue,
			};
		},
	}),
	Tk = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "flip",
				options: e,
				async fn(n) {
					var a, u;
					const { placement: s, middlewareData: o, rects: f, initialPlacement: h, platform: m, elements: g } = n,
						{
							mainAxis: y = !0,
							crossAxis: S = !0,
							fallbackPlacements: b,
							fallbackStrategy: p = "bestFit",
							fallbackAxisSideDirection: E = "none",
							flipAlignment: x = !0,
							...D
						} = ya(e, n);
					if ((a = o.arrow) != null && a.alignmentOffset) return {};
					const z = pa(s),
						R = ti(h),
						A = pa(h) === h,
						C = await (m.isRTL == null ? void 0 : m.isRTL(g.floating)),
						M = b || (A || !x ? [So(h)] : mk(h)),
						G = E !== "none";
					!b && G && M.push(...pk(h, x, E, C));
					const $ = [h, ...M],
						q = await m.detectOverflow(n, D),
						B = [];
					let ne = ((u = o.flip) == null ? void 0 : u.overflows) || [];
					if ((y && B.push(q[z]), S)) {
						const X = hk(s, f, C);
						B.push(q[X[0]], q[X[1]]);
					}
					if (((ne = [...ne, { placement: s, overflows: B }]), !B.every((X) => X <= 0))) {
						var P, le;
						const X = (((P = o.flip) == null ? void 0 : P.index) || 0) + 1,
							ue = $[X];
						if (
							ue &&
							(!(S === "alignment" && R !== ti(ue)) ||
								ne.every((U) => (ti(U.placement) === R ? U.overflows[0] > 0 : !0)))
						)
							return { data: { index: X, overflows: ne }, reset: { placement: ue } };
						let O =
							(le = ne.filter((U) => U.overflows[0] <= 0).sort((U, V) => U.overflows[1] - V.overflows[1])[0]) == null
								? void 0
								: le.placement;
						if (!O)
							switch (p) {
								case "bestFit": {
									var te;
									const U =
										(te = ne
											.filter((V) => {
												if (G) {
													const re = ti(V.placement);
													return re === R || re === "y";
												}
												return !0;
											})
											.map((V) => [V.placement, V.overflows.filter((re) => re > 0).reduce((re, de) => re + de, 0)])
											.sort((V, re) => V[1] - re[1])[0]) == null
											? void 0
											: te[0];
									U && (O = U);
									break;
								}
								case "initialPlacement":
									O = h;
									break;
							}
						if (s !== O) return { reset: { placement: O } };
					}
					return {};
				},
			}
		);
	},
	Pb = new Set(["left", "top"]);
async function xk(e, n) {
	const { placement: a, platform: u, elements: s } = e,
		o = await (u.isRTL == null ? void 0 : u.isRTL(s.floating)),
		f = pa(a),
		h = cu(a),
		m = ti(a) === "y",
		g = Pb.has(f) ? -1 : 1,
		y = o && m ? -1 : 1,
		S = ya(n, e);
	let {
		mainAxis: b,
		crossAxis: p,
		alignmentAxis: E,
	} = typeof S == "number"
		? { mainAxis: S, crossAxis: 0, alignmentAxis: null }
		: { mainAxis: S.mainAxis || 0, crossAxis: S.crossAxis || 0, alignmentAxis: S.alignmentAxis };
	return (
		h && typeof E == "number" && (p = h === "end" ? E * -1 : E),
		m ? { x: p * y, y: b * g } : { x: b * g, y: p * y }
	);
}
var Ak = function (e) {
		return (
			e === void 0 && (e = 0),
			{
				name: "offset",
				options: e,
				async fn(n) {
					var a, u;
					const { x: s, y: o, placement: f, middlewareData: h } = n,
						m = await xk(n, e);
					return f === ((a = h.offset) == null ? void 0 : a.placement) && (u = h.arrow) != null && u.alignmentOffset
						? {}
						: { x: s + m.x, y: o + m.y, data: { ...m, placement: f } };
				},
			}
		);
	},
	Ck = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "shift",
				options: e,
				async fn(n) {
					const { x: a, y: u, placement: s, platform: o } = n,
						{
							mainAxis: f = !0,
							crossAxis: h = !1,
							limiter: m = {
								fn: (R) => {
									let { x: A, y: C } = R;
									return { x: A, y: C };
								},
							},
							...g
						} = ya(e, n),
						y = { x: a, y: u },
						S = await o.detectOverflow(n, g),
						b = ti(s),
						p = Nh(b);
					let E = y[p],
						x = y[b];
					const D = (R, A) => Vb(A + S[R === "y" ? "top" : "left"], A, A - S[R === "y" ? "bottom" : "right"]);
					(f && (E = D(p, E)), h && (x = D(b, x)));
					const z = m.fn({ ...n, [p]: E, [b]: x });
					return { ...z, data: { x: z.x - a, y: z.y - u, enabled: { [p]: f, [b]: h } } };
				},
			}
		);
	},
	Rk = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				options: e,
				fn(n) {
					var a, u;
					const { x: s, y: o, placement: f, rects: h, middlewareData: m } = n,
						{ offset: g = 0, mainAxis: y = !0, crossAxis: S = !0 } = ya(e, n),
						b = { x: s, y: o },
						p = ti(f),
						E = Nh(p);
					let x = b[E],
						D = b[p];
					const z = ya(g, n),
						R =
							typeof z == "number"
								? { mainAxis: z, crossAxis: 0 }
								: { mainAxis: (a = z.mainAxis) != null ? a : 0, crossAxis: (u = z.crossAxis) != null ? u : 0 };
					if (y) {
						const M = E === "y" ? "height" : "width",
							G = h.reference[E] - h.floating[M] + R.mainAxis,
							$ = h.reference[E] + h.reference[M] - R.mainAxis;
						x < G ? (x = G) : x > $ && (x = $);
					}
					if (S) {
						var A, C;
						const M = E === "y" ? "width" : "height",
							G = Pb.has(pa(f)),
							$ =
								h.reference[p] -
								h.floating[M] +
								((G && ((A = m.offset) == null ? void 0 : A[p])) || 0) +
								(G ? 0 : R.crossAxis),
							q =
								h.reference[p] +
								h.reference[M] +
								(G ? 0 : ((C = m.offset) == null ? void 0 : C[p]) || 0) -
								(G ? R.crossAxis : 0);
						D < $ ? (D = $) : D > q && (D = q);
					}
					return { [E]: x, [p]: D };
				},
			}
		);
	},
	Nk = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "size",
				options: e,
				async fn(n) {
					const { placement: a, rects: u, platform: s, elements: o } = n,
						{ apply: f = () => {}, ...h } = ya(e, n),
						m = await s.detectOverflow(n, h),
						g = pa(a),
						y = cu(a),
						S = ti(a) === "y",
						{ width: b, height: p } = u.floating;
					let E, x;
					g === "top" || g === "bottom"
						? ((E = g),
							(x =
								y === ((await (s.isRTL == null ? void 0 : s.isRTL(o.floating))) ? "start" : "end") ? "left" : "right"))
						: ((x = g), (E = y === "end" ? "top" : "bottom"));
					const D = p - m.top - m.bottom,
						z = b - m.left - m.right,
						R = ga(p - m[E], D),
						A = ga(b - m[x], z),
						C = n.middlewareData.shift,
						M = !C;
					let G = R,
						$ = A;
					(C != null && C.enabled.x && ($ = z),
						C != null && C.enabled.y && (G = D),
						M && !y && (S ? ($ = b - 2 * Oi(m.left, m.right)) : (G = p - 2 * Oi(m.top, m.bottom))),
						await f({ ...n, availableWidth: $, availableHeight: G }));
					const q = await s.getDimensions(o.floating);
					return b !== q.width || p !== q.height ? { reset: { rects: !0 } } : {};
				},
			}
		);
	};
function qo() {
	return typeof window < "u";
}
function fu(e) {
	return Yb(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function cn(e) {
	var n;
	return (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) || window;
}
function $i(e) {
	var n;
	return (n = (Yb(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : n.documentElement;
}
function Yb(e) {
	return qo() ? e instanceof Node || e instanceof cn(e).Node : !1;
}
function ii(e) {
	return qo() ? e instanceof Element || e instanceof cn(e).Element : !1;
}
function Sa(e) {
	return qo() ? e instanceof HTMLElement || e instanceof cn(e).HTMLElement : !1;
}
function Fp(e) {
	return !qo() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof cn(e).ShadowRoot;
}
function Uo(e) {
	const { overflow: n, overflowX: a, overflowY: u, display: s } = ai(e);
	return /auto|scroll|overlay|hidden|clip/.test(n + u + a) && s !== "inline" && s !== "contents";
}
function Ok(e) {
	return /^(table|td|th)$/.test(fu(e));
}
function $o(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var kk = /transform|translate|scale|rotate|perspective|filter/,
	Mk = /paint|layout|strict|content/,
	Va = (e) => !!e && e !== "none",
	yd;
function Mh(e) {
	const n = ii(e) ? ai(e) : e;
	return (
		Va(n.transform) ||
		Va(n.translate) ||
		Va(n.scale) ||
		Va(n.rotate) ||
		Va(n.perspective) ||
		(!zh() && (Va(n.backdropFilter) || Va(n.filter))) ||
		kk.test(n.willChange || "") ||
		Mk.test(n.contain || "")
	);
}
function zk(e) {
	let n = Fa(e);
	for (; Sa(n) && !gl(n); ) {
		if (Mh(n)) return n;
		if ($o(n)) return null;
		n = Fa(n);
	}
	return null;
}
function zh() {
	return (yd == null && (yd = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), yd);
}
function gl(e) {
	return /^(html|body|#document)$/.test(fu(e));
}
function ai(e) {
	return cn(e).getComputedStyle(e);
}
function Bo(e) {
	return ii(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Fa(e) {
	if (fu(e) === "html") return e;
	const n = e.assignedSlot || e.parentNode || (Fp(e) && e.host) || $i(e);
	return Fp(n) ? n.host : n;
}
function Gb(e) {
	const n = Fa(e);
	return gl(n) ? (e.ownerDocument || e).body : Sa(n) && Uo(n) ? n : Gb(n);
}
function yl(e, n, a) {
	var u;
	(n === void 0 && (n = []), a === void 0 && (a = !0));
	const s = Gb(e),
		o = s === ((u = e.ownerDocument) == null ? void 0 : u.body),
		f = cn(s);
	if (o) {
		const h = Bd(f);
		return n.concat(f, f.visualViewport || [], Uo(s) ? s : [], h && a ? yl(h) : []);
	} else return n.concat(s, yl(s, [], a));
}
function Bd(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Kb(e) {
	const n = ai(e);
	let a = parseFloat(n.width) || 0,
		u = parseFloat(n.height) || 0;
	const s = Sa(e),
		o = s ? e.offsetWidth : a,
		f = s ? e.offsetHeight : u,
		h = _o(a) !== o || _o(u) !== f;
	return (h && ((a = o), (u = f)), { width: a, height: u, $: h });
}
function Dh(e) {
	return ii(e) ? e : e.contextElement;
}
function Jr(e) {
	const n = Dh(e);
	if (!Sa(n)) return ki(1);
	const a = n.getBoundingClientRect(),
		{ width: u, height: s, $: o } = Kb(n);
	let f = (o ? _o(a.width) : a.width) / u,
		h = (o ? _o(a.height) : a.height) / s;
	return ((!f || !Number.isFinite(f)) && (f = 1), (!h || !Number.isFinite(h)) && (h = 1), { x: f, y: h });
}
var Dk = ki(0);
function Xb(e) {
	const n = cn(e);
	return !zh() || !n.visualViewport ? Dk : { x: n.visualViewport.offsetLeft, y: n.visualViewport.offsetTop };
}
function jk(e, n, a) {
	return (n === void 0 && (n = !1), !!a && n && a === cn(e));
}
function Ja(e, n, a, u) {
	(n === void 0 && (n = !1), a === void 0 && (a = !1));
	const s = e.getBoundingClientRect(),
		o = Dh(e);
	let f = ki(1);
	n && (u ? ii(u) && (f = Jr(u)) : (f = Jr(e)));
	const h = jk(o, a, u) ? Xb(o) : ki(0);
	let m = (s.left + h.x) / f.x,
		g = (s.top + h.y) / f.y,
		y = s.width / f.x,
		S = s.height / f.y;
	if (o && u) {
		const b = cn(o),
			p = ii(u) ? cn(u) : u;
		let E = b,
			x = Bd(E);
		for (; x && p !== E; ) {
			const D = Jr(x),
				z = x.getBoundingClientRect(),
				R = ai(x),
				A = z.left + (x.clientLeft + parseFloat(R.paddingLeft)) * D.x,
				C = z.top + (x.clientTop + parseFloat(R.paddingTop)) * D.y;
			((m *= D.x), (g *= D.y), (y *= D.x), (S *= D.y), (m += A), (g += C), (E = cn(x)), (x = Bd(E)));
		}
	}
	return wo({ width: y, height: S, x: m, y: g });
}
function Io(e, n) {
	const a = Bo(e).scrollLeft;
	return n ? n.left + a : Ja($i(e)).left + a;
}
function Fb(e, n) {
	const a = e.getBoundingClientRect();
	return { x: a.left + n.scrollLeft - Io(e, a), y: a.top + n.scrollTop };
}
function Lk(e) {
	let { elements: n, rect: a, offsetParent: u, strategy: s } = e;
	const o = s === "fixed",
		f = $i(u),
		h = n ? $o(n.floating) : !1;
	if (u === f || (h && o)) return a;
	let m = { scrollLeft: 0, scrollTop: 0 },
		g = ki(1);
	const y = ki(0),
		S = Sa(u);
	if ((S || !o) && ((fu(u) !== "body" || Uo(f)) && (m = Bo(u)), S)) {
		const p = Ja(u);
		((g = Jr(u)), (y.x = p.x + u.clientLeft), (y.y = p.y + u.clientTop));
	}
	const b = f && !S && !o ? Fb(f, m) : ki(0);
	return {
		width: a.width * g.x,
		height: a.height * g.y,
		x: a.x * g.x - m.scrollLeft * g.x + y.x + b.x,
		y: a.y * g.y - m.scrollTop * g.y + y.y + b.y,
	};
}
function qk(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Uk(e) {
	const n = Bo(e),
		a = e.ownerDocument.body,
		u = Oi(e.scrollWidth, e.clientWidth, a.scrollWidth, a.clientWidth),
		s = Oi(e.scrollHeight, e.clientHeight, a.scrollHeight, a.clientHeight);
	let o = -n.scrollLeft + Io(e);
	const f = -n.scrollTop;
	return (
		ai(a).direction === "rtl" && (o += Oi(e.clientWidth, a.clientWidth) - u),
		{ width: u, height: s, x: o, y: f }
	);
}
var $k = 25;
function Bk(e, n, a) {
	a === void 0 && (a = "viewport");
	const u = a === "layoutViewport",
		s = cn(e),
		o = $i(e),
		f = s.visualViewport;
	let h = o.clientWidth,
		m = o.clientHeight,
		g = 0,
		y = 0;
	if (f) {
		const S = !zh() || n === "fixed";
		u
			? S || ((g = -f.offsetLeft), (y = -f.offsetTop))
			: ((h = f.width), (m = f.height), S && ((g = f.offsetLeft), (y = f.offsetTop)));
	}
	if (Io(o) <= 0) {
		const S = o.ownerDocument,
			b = S.body,
			p = getComputedStyle(b),
			E = (S.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight)) || 0,
			x = Math.abs(o.clientWidth - b.clientWidth - E),
			D = getComputedStyle(o).scrollbarGutter === "stable both-edges" ? x / 2 : x;
		D <= $k && (h -= D);
	}
	return { width: h, height: m, x: g, y };
}
function Ik(e, n) {
	const a = Ja(e, !0, n === "fixed"),
		u = a.top + e.clientTop,
		s = a.left + e.clientLeft,
		o = Jr(e);
	return { width: e.clientWidth * o.x, height: e.clientHeight * o.y, x: s * o.x, y: u * o.y };
}
function Jp(e, n, a) {
	let u;
	if (n === "viewport" || n === "layoutViewport") u = Bk(e, a, n);
	else if (n === "document") u = Uk($i(e));
	else if (ii(n)) u = Ik(n, a);
	else {
		const s = Xb(e);
		u = { x: n.x - s.x, y: n.y - s.y, width: n.width, height: n.height };
	}
	return wo(u);
}
function Zk(e, n) {
	const a = n.get(e);
	if (a) return a;
	let u = yl(e, [], !1).filter((h) => ii(h) && fu(h) !== "body"),
		s = null;
	const o = ai(e).position === "fixed";
	let f = o ? Fa(e) : e;
	for (; ii(f) && !gl(f); ) {
		const h = ai(f),
			m = Mh(f),
			g = s ? s.position : o ? "fixed" : "";
		(!m && (g === "fixed" || (g === "absolute" && h.position === "static")) ? (u = u.filter((y) => y !== f)) : (s = h),
			(f = Fa(f)));
	}
	return (n.set(e, u), u);
}
function Hk(e) {
	let { element: n, boundary: a, rootBoundary: u, strategy: s } = e;
	const o = [...(a === "clippingAncestors" ? ($o(n) ? [] : Zk(n, this._c)) : [].concat(a)), u],
		f = Jp(n, o[0], s);
	let h = f.top,
		m = f.right,
		g = f.bottom,
		y = f.left;
	for (let S = 1; S < o.length; S++) {
		const b = Jp(n, o[S], s);
		((h = Oi(b.top, h)), (m = ga(b.right, m)), (g = ga(b.bottom, g)), (y = Oi(b.left, y)));
	}
	return { width: m - y, height: g - h, x: y, y: h };
}
function Vk(e) {
	const { width: n, height: a } = Kb(e);
	return { width: n, height: a };
}
function Qk(e, n, a) {
	const u = Sa(n),
		s = $i(n),
		o = a === "fixed",
		f = Ja(e, !0, o, n);
	let h = { scrollLeft: 0, scrollTop: 0 };
	const m = ki(0);
	if ((u || !o) && ((fu(n) !== "body" || Uo(s)) && (h = Bo(n)), u)) {
		const y = Ja(n, !0, o, n);
		((m.x = y.x + n.clientLeft), (m.y = y.y + n.clientTop));
	}
	!u && s && (m.x = Io(s));
	const g = s && !u && !o ? Fb(s, h) : ki(0);
	return { x: f.left + h.scrollLeft - m.x - g.x, y: f.top + h.scrollTop - m.y - g.y, width: f.width, height: f.height };
}
function pd(e) {
	return ai(e).position === "static";
}
function Wp(e, n) {
	if (!Sa(e) || ai(e).position === "fixed") return null;
	if (n) return n(e);
	let a = e.offsetParent;
	return ($i(e) === a && (a = a.ownerDocument.body), a);
}
function Jb(e, n) {
	const a = cn(e);
	if ($o(e)) return a;
	if (!Sa(e)) {
		let s = Fa(e);
		for (; s && !gl(s); ) {
			if (ii(s) && !pd(s)) return s;
			s = Fa(s);
		}
		return a;
	}
	let u = Wp(e, n);
	for (; u && Ok(u) && pd(u); ) u = Wp(u, n);
	return u && gl(u) && pd(u) && !Mh(u) ? a : u || zk(e) || a;
}
var Pk = async function (e) {
	const n = this.getOffsetParent || Jb,
		a = this.getDimensions,
		u = await a(e.floating);
	return {
		reference: Qk(e.reference, await n(e.floating), e.strategy),
		floating: { x: 0, y: 0, width: u.width, height: u.height },
	};
};
function Yk(e) {
	return ai(e).direction === "rtl";
}
var Gk = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Lk,
	getDocumentElement: $i,
	getClippingRect: Hk,
	getOffsetParent: Jb,
	getElementRects: Pk,
	getClientRects: qk,
	getDimensions: Vk,
	getScale: Jr,
	isElement: ii,
	isRTL: Yk,
};
function Wb(e, n) {
	return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height;
}
function Kk(e, n, a) {
	let u = null,
		s;
	const o = $i(e);
	function f() {
		var y;
		(clearTimeout(s), (y = u) == null || y.disconnect(), (u = null));
	}
	function h(y, S) {
		(y === void 0 && (y = !1), S === void 0 && (S = 1), f());
		const b = e.getBoundingClientRect(),
			{ left: p, top: E, width: x, height: D } = b;
		if ((y || n(), !x || !D)) return;
		const z = eo(E),
			R = eo(o.clientWidth - (p + x)),
			A = eo(o.clientHeight - (E + D)),
			C = eo(p),
			M = { rootMargin: -z + "px " + -R + "px " + -A + "px " + -C + "px", threshold: Oi(0, ga(1, S)) || 1 };
		let G = !0;
		function $(q) {
			const B = q[0].intersectionRatio;
			if (!Wb(b, e.getBoundingClientRect())) return h();
			if (B !== S) {
				if (!G) return h();
				B
					? h(!1, B)
					: (s = setTimeout(() => {
							h(!1, 1e-7);
						}, 1e3));
			}
			G = !1;
		}
		try {
			u = new IntersectionObserver($, { ...M, root: o.ownerDocument });
		} catch {
			u = new IntersectionObserver($, M);
		}
		u.observe(e);
	}
	const m = cn(e),
		g = () => h(a);
	return (
		m.addEventListener("resize", g),
		h(!0),
		() => {
			(m.removeEventListener("resize", g), f());
		}
	);
}
function Xk(e, n, a, u) {
	u === void 0 && (u = {});
	const {
			ancestorScroll: s = !0,
			ancestorResize: o = !0,
			elementResize: f = typeof ResizeObserver == "function",
			layoutShift: h = typeof IntersectionObserver == "function",
			animationFrame: m = !1,
		} = u,
		g = Dh(e),
		y = s || o ? [...(g ? yl(g) : []), ...(n ? yl(n) : [])] : [];
	y.forEach((z) => {
		(s && z.addEventListener("scroll", a), o && z.addEventListener("resize", a));
	});
	const S = g && h ? Kk(g, a, o) : null;
	let b = -1,
		p = null;
	f &&
		((p = new ResizeObserver((z) => {
			let [R] = z;
			(R &&
				R.target === g &&
				p &&
				n &&
				(p.unobserve(n),
				cancelAnimationFrame(b),
				(b = requestAnimationFrame(() => {
					var A;
					(A = p) == null || A.observe(n);
				}))),
				a());
		})),
		g && !m && p.observe(g),
		n && p.observe(n));
	let E,
		x = m ? Ja(e) : null;
	m && D();
	function D() {
		const z = Ja(e);
		(x && !Wb(x, z) && a(), (x = z), (E = requestAnimationFrame(D)));
	}
	return (
		a(),
		() => {
			var z;
			(y.forEach((R) => {
				(s && R.removeEventListener("scroll", a), o && R.removeEventListener("resize", a));
			}),
				S?.(),
				(z = p) == null || z.disconnect(),
				(p = null),
				m && cancelAnimationFrame(E));
		}
	);
}
var Fk = Ak,
	Jk = Ck,
	Wk = Tk,
	e2 = Nk,
	t2 = Ek,
	n2 = Rk,
	i2 = (e, n, a) => {
		const u = new Map(),
			s = a ?? {},
			o = { ...Gk, ...s.platform, _c: u };
		return wk(e, n, { ...s, platform: o });
	},
	a2 = "div";
function e0(e = 0, n = 0, a = 0, u = 0) {
	if (typeof DOMRect == "function") return new DOMRect(e, n, a, u);
	const s = { x: e, y: n, width: a, height: u, top: n, right: e + a, bottom: n + u, left: e };
	return { ...s, toJSON: () => s };
}
function r2(e) {
	if (!e) return e0();
	const { x: n, y: a, width: u, height: s } = e;
	return e0(n, a, u, s);
}
function u2(e, n) {
	return {
		contextElement: e || void 0,
		getBoundingClientRect: () => {
			const a = e,
				u = n?.(a);
			return u || !a ? r2(u) : a.getBoundingClientRect();
		},
	};
}
function l2(e) {
	return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e);
}
function t0(e) {
	const n = window.devicePixelRatio || 1;
	return Math.round(e * n) / n;
}
function s2(e, n) {
	return Fk(({ placement: a }) => {
		var u;
		const s = (e?.clientHeight || 0) / 2,
			o = typeof n.gutter == "number" ? n.gutter + s : (u = n.gutter) != null ? u : s;
		return { crossAxis: a.split("-")[1] ? void 0 : n.shift, mainAxis: o, alignmentAxis: n.shift };
	});
}
function o2(e) {
	if (e.flip === !1) return;
	const n = typeof e.flip == "string" ? e.flip.split(" ") : void 0;
	return (Kt(!n || n.every(l2), !1), Wk({ padding: e.overflowPadding, fallbackPlacements: n }));
}
function c2(e) {
	if (!(!e.slide && !e.overlap))
		return Jk({ mainAxis: e.slide, crossAxis: e.overlap, padding: e.overflowPadding, limiter: n2() });
}
function f2(e) {
	return e2({
		padding: e.overflowPadding,
		apply({ elements: n, availableWidth: a, availableHeight: u, rects: s }) {
			const o = n.floating,
				f = Math.round(s.reference.width);
			((a = Math.floor(a)),
				(u = Math.floor(u)),
				o.style.setProperty("--popover-anchor-width", `${f}px`),
				o.style.setProperty("--popover-available-width", `${a}px`),
				o.style.setProperty("--popover-available-height", `${u}px`),
				e.sameWidth && (o.style.width = `${f}px`),
				e.fitViewport && ((o.style.maxWidth = `${a}px`), (o.style.maxHeight = `${u}px`)));
		},
	});
}
function d2(e, n) {
	if (e) return t2({ element: e, padding: n.arrowPadding });
}
var e_ = We(function ({
		store: n,
		modal: a = !1,
		portal: u = !!a,
		preserveTabOrder: s = !0,
		autoFocusOnShow: o = !0,
		wrapperProps: f,
		fixed: h = !1,
		flip: m = !0,
		shift: g = 0,
		slide: y = !0,
		overlap: S = !1,
		sameWidth: b = !1,
		fitViewport: p = !1,
		gutter: E,
		arrowPadding: x = 4,
		overflowPadding: D = 8,
		getAnchorRect: z,
		updatePosition: R,
		...A
	}) {
		const C = ko();
		((n = n || C), Kt(n, !1));
		const M = n.useState("arrowElement"),
			G = n.useState("anchorElement"),
			$ = n.useState("disclosureElement"),
			q = n.useState("popoverElement"),
			B = n.useState("contentElement"),
			ne = n.useState("placement"),
			P = n.useState("mounted"),
			le = n.useState("rendered"),
			te = (0, T.useRef)(null),
			[X, ue] = (0, T.useState)(!1),
			{ portalRef: O, domReady: U } = lh(u, A.portalRef),
			V = ze(z),
			re = ze(R),
			de = !!R;
		(Je(() => {
			if (!q?.isConnected) return;
			q.style.setProperty("--popover-overflow-padding", `${D}px`);
			const N = u2(G, V),
				Y = async () => {
					if (!P) return;
					M || (te.current = te.current || document.createElement("div"));
					const ge = M || te.current,
						ye = [
							s2(ge, { gutter: E, shift: g }),
							o2({ flip: m, overflowPadding: D }),
							c2({ slide: y, shift: g, overlap: S, overflowPadding: D }),
							d2(ge, { arrowPadding: x }),
							f2({ sameWidth: b, fitViewport: p, overflowPadding: D }),
						],
						we = await i2(N, q, { placement: ne, strategy: h ? "fixed" : "absolute", middleware: ye });
					(n?.setState("currentPlacement", we.placement), ue(!0));
					const Ze = t0(we.x),
						Oe = t0(we.y);
					if (
						(Object.assign(q.style, { top: "0", left: "0", transform: `translate3d(${Ze}px,${Oe}px,0)` }),
						ge && we.middlewareData.arrow)
					) {
						const { x: lt, y: jt } = we.middlewareData.arrow,
							$t = we.placement.split("-")[0],
							Yt = ge.clientWidth / 2,
							it = ge.clientHeight / 2,
							ce = lt != null ? lt + Yt : -Yt,
							Ee = jt != null ? jt + it : -it;
						(q.style.setProperty(
							"--popover-transform-origin",
							{
								top: `${ce}px calc(100% + ${it}px)`,
								bottom: `${ce}px ${-it}px`,
								left: `calc(100% + ${Yt}px) ${Ee}px`,
								right: `${-Yt}px ${Ee}px`,
							}[$t],
						),
							Object.assign(ge.style, {
								left: lt != null ? `${lt}px` : "",
								top: jt != null ? `${jt}px` : "",
								[$t]: "100%",
							}));
					}
				},
				se = Xk(
					N,
					q,
					async () => {
						de ? (await re({ updatePosition: Y }), ue(!0)) : await Y();
					},
					{ elementResize: typeof ResizeObserver == "function" },
				);
			return () => {
				(ue(!1), se());
			};
		}, [n, le, q, M, G, q, ne, P, U, h, m, g, y, S, b, p, E, x, D, V, de, re]),
			Je(() => {
				if (!P || !U || !q?.isConnected || !B?.isConnected) return;
				const N = () => {
					q.style.zIndex = getComputedStyle(B).zIndex;
				};
				N();
				let Y = requestAnimationFrame(() => {
					Y = requestAnimationFrame(N);
				});
				return () => cancelAnimationFrame(Y);
			}, [P, U, q, B]));
		const Ce = h ? "fixed" : "absolute";
		return (
			(A = Wt(
				A,
				(N) =>
					(0, _.jsx)("div", {
						...f,
						style: { position: Ce, top: 0, left: 0, width: "max-content", ...f?.style },
						ref: n?.setPopoverElement,
						children: N,
					}),
				[n, Ce, f],
			)),
			(A = Wt(A, (N) => (0, _.jsx)(Mo, { value: n, children: N }), [n])),
			(A = { "data-placing": !X || void 0, ...A, style: { position: "relative", ...A.style } }),
			(A = Hb({
				store: n,
				modal: a,
				portal: u,
				preserveTabOrder: s,
				preserveTabOrderAnchor: $ || G,
				autoFocusOnShow: X && o,
				...A,
				portalRef: O,
			})),
			A
		);
	}),
	FM = Lo(
		Qe(function (n) {
			return Fe(a2, e_(n));
		}),
		ko,
	),
	h2 = "div";
function t_(e, n, a, u) {
	return ma(n) ? !0 : e ? !!(Ot(n, e) || (a && Ot(a, e)) || u?.some((s) => t_(e, s, a))) : !1;
}
function m2({ store: e, ...n }) {
	const [a, u] = (0, T.useState)(!1),
		s = e.useState("mounted");
	(0, T.useEffect)(() => {
		s || u(!1);
	}, [s]);
	const o = n.onFocus,
		f = ze((m) => {
			(o?.(m), !m.defaultPrevented && u(!0));
		}),
		h = (0, T.useRef)(null);
	return (
		(0, T.useEffect)(
			() =>
				ji(e, ["anchorElement"], (m) => {
					h.current = m.anchorElement;
				}),
			[],
		),
		(n = { autoFocusOnHide: a, finalFocus: h, ...n, onFocus: f }),
		n
	);
}
var n0 = (0, T.createContext)(null),
	n_ = We(function ({
		store: n,
		modal: a = !1,
		portal: u = !!a,
		hideOnEscape: s = !0,
		hideOnHoverOutside: o = !0,
		disablePointerEventsOnApproach: f = !!o,
		...h
	}) {
		const m = vh();
		((n = n || m), Kt(n, !1));
		const g = (0, T.useRef)(null),
			[y, S] = (0, T.useState)([]),
			b = (0, T.useRef)(0),
			p = (0, T.useRef)(null),
			{ portalRef: E, domReady: x } = lh(u, h.portalRef),
			D = sh(),
			z = !!o,
			R = _n(o),
			A = !!f,
			C = _n(f),
			M = n.useState("open"),
			G = n.useState("mounted");
		((0, T.useEffect)(() => {
			if (!x || !G || (!z && !A)) return;
			const P = g.current;
			return P
				? Sn(
						Pt(
							"mousemove",
							(te) => {
								if (!n || !D()) return;
								const { anchorElement: X, hideTimeout: ue, timeout: O } = n.getState(),
									U = p.current,
									[V] = te.composedPath(),
									re = X;
								if (t_(V, P, re, y)) {
									((p.current = V && re && Ot(re, V) ? hd(te) : null), window.clearTimeout(b.current), (b.current = 0));
									return;
								}
								if (!b.current) {
									if (U) {
										const de = hd(te);
										if (Bp(de, Ip(P, U))) {
											if (((p.current = de), !C(te))) return;
											(te.preventDefault(), te.stopPropagation());
											return;
										}
									}
									R(te) &&
										(b.current = window.setTimeout(() => {
											((b.current = 0), n?.hide());
										}, ue ?? O));
								}
							},
							!0,
						),
						() => clearTimeout(b.current),
					)
				: void 0;
		}, [n, D, x, G, z, A, y, C, R]),
			(0, T.useEffect)(() => {
				if (!x || !G || !A) return;
				const P = (le) => {
					const te = g.current;
					if (!te) return;
					const X = p.current;
					if (!X) return;
					const ue = Ip(te, X);
					if (Bp(hd(le), ue)) {
						if (!C(le)) return;
						(le.preventDefault(), le.stopPropagation());
					}
				};
				return Sn(Pt("mouseenter", P, !0), Pt("mouseover", P, !0), Pt("mouseout", P, !0), Pt("mouseleave", P, !0));
			}, [x, G, A, C]),
			(0, T.useEffect)(() => {
				x && (M || n?.setAutoFocusOnShow(!1));
			}, [n, x, M]));
		const $ = pb(M);
		(0, T.useEffect)(() => {
			if (x)
				return () => {
					$.current || n?.setAutoFocusOnShow(!1);
				};
		}, [n, x]);
		const q = (0, T.useContext)(n0);
		Je(() => {
			if (a || !u || !G || !x) return;
			const P = g.current;
			if (P) return q?.(P);
		}, [a, u, G, x]);
		const B = (0, T.useCallback)(
			(P) => {
				S((te) => [...te, P]);
				const le = q?.(P);
				return () => {
					(S((te) => te.filter((X) => X !== P)), le?.());
				};
			},
			[q],
		);
		((h = Wt(h, (P) => (0, _.jsx)(wb, { value: n, children: (0, _.jsx)(n0.Provider, { value: B, children: P }) }), [
			n,
			B,
		])),
			(h = { ...h, ref: Dt(g, h.ref) }),
			(h = m2({ store: n, ...h })));
		const ne = n.useState((P) => a || P.autoFocusOnShow);
		return (
			(h = e_({
				store: n,
				modal: a,
				portal: u,
				autoFocusOnShow: ne,
				...h,
				portalRef: E,
				hideOnEscape(P) {
					return fb(s, P)
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
	JM = Lo(
		Qe(function (n) {
			return Fe(h2, n_(n));
		}),
		vh,
	),
	v2 = "div",
	g2 = We(function ({
		store: n,
		modal: a = !1,
		portal: u = !!a,
		hideOnEscape: s = !0,
		autoFocusOnShow: o = !0,
		hideOnHoverOutside: f,
		alwaysVisible: h,
		...m
	}) {
		const g = zo();
		((n = n || g), Kt(n, !1));
		const y = (0, T.useRef)(null),
			S = n.parent,
			b = n.menubar,
			p = !!S,
			E = !!b && !p;
		m = { ...m, ref: Dt(y, m.ref) };
		const { "aria-labelledby": x, ...D } = kb({ store: n, alwaysVisible: h, ...m });
		m = D;
		const [z, R] = (0, T.useState)(),
			A = n.useState("autoFocusOnShow"),
			C = n.useState("initialFocus"),
			M = n.useState("baseElement"),
			G = n.useState("renderedItems");
		(0, T.useEffect)(() => {
			let te = !1;
			return (
				R((X) => {
					var ue, O, U;
					if (te || !A) return;
					if ((ue = X?.current) != null && ue.isConnected) return X;
					const V = (0, T.createRef)();
					switch (C) {
						case "first":
							V.current = ((O = G.find((re) => !re.disabled && re.element)) == null ? void 0 : O.element) || null;
							break;
						case "last":
							V.current =
								((U = [...G].reverse().find((re) => !re.disabled && re.element)) == null ? void 0 : U.element) || null;
							break;
						default:
							V.current = M;
					}
					return V;
				}),
				() => {
					te = !0;
				}
			);
		}, [n, A, C, G, M]);
		const $ = p ? !1 : a,
			q = !!o,
			B = !!z || !!m.initialFocus || !!$,
			ne = zt(n.combobox || n, "contentElement"),
			P = zt(S?.combobox || S, "contentElement"),
			le = (0, T.useMemo)(() => {
				if (!P || !ne) return;
				const te = ne.getAttribute("role"),
					X = P.getAttribute("role");
				if (!((X === "menu" || X === "menubar") && te === "menu")) return P;
			}, [ne, P]);
		return (
			le !== void 0 && (m = { preserveTabOrderAnchor: le, ...m }),
			(m = n_({
				store: n,
				alwaysVisible: h,
				initialFocus: z,
				autoFocusOnShow: q ? B && o : A || !!$,
				...m,
				hideOnEscape(te) {
					return fb(s, te) ? !1 : (n?.hideAll(), !0);
				},
				hideOnHoverOutside(te) {
					const X = n?.getState().disclosureElement;
					return (typeof f == "function" ? f(te) : (f ?? (p ? !0 : E ? (X ? !ma(X) : !0) : !1)))
						? te.defaultPrevented || !p || !X || (mN(X, "mouseout", te), !ma(X))
							? !0
							: (requestAnimationFrame(() => {
									ma(X) || n?.hide();
								}),
								!1)
						: !1;
				},
				modal: $,
				portal: u,
				backdrop: p ? !1 : m.backdrop,
			})),
			(m = { "aria-labelledby": x, ...m }),
			m
		);
	}),
	y2 = Lo(
		Qe(function (n) {
			return Fe(v2, g2(n));
		}),
		zo,
	);
function p2(e) {
	var n;
	const a = e.find((o) => !!o.element),
		u = [...e].reverse().find((o) => !!o.element);
	let s = (n = a?.element) == null ? void 0 : n.parentElement;
	for (; s && u?.element; ) {
		if (u && s.contains(u.element)) return s;
		s = s.parentElement;
	}
	return rt(s).body;
}
function b2(e) {
	return e?.__unstablePrivateStore;
}
function _2(e = {}) {
	var n;
	e.store;
	const a = (n = e.store) == null ? void 0 : n.getState(),
		u = Be(e.items, a?.items, e.defaultItems, []),
		s = new Map(u.map((b) => [b.id, b])),
		o = { items: u, renderedItems: Be(a?.renderedItems, []) },
		f = b2(e.store),
		h = ni({ items: u, renderedItems: o.renderedItems }, f),
		m = ni(o, e.store),
		g = (b) => {
			const p = gb(b, (E) => E.element);
			(h.setState("renderedItems", p), m.setState("renderedItems", p));
		};
	(Ni(m, () => yh(h)),
		Ni(h, () =>
			jd(h, ["items"], (b) => {
				m.setState("items", b.items);
			}),
		),
		Ni(h, () =>
			jd(h, ["renderedItems"], (b) => {
				let p = !0,
					E = requestAnimationFrame(() => {
						const { renderedItems: R } = m.getState();
						b.renderedItems !== R && g(b.renderedItems);
					});
				if (typeof IntersectionObserver != "function") return () => cancelAnimationFrame(E);
				const x = () => {
						if (p) {
							p = !1;
							return;
						}
						(cancelAnimationFrame(E), (E = requestAnimationFrame(() => g(b.renderedItems))));
					},
					D = p2(b.renderedItems),
					z = new IntersectionObserver(x, { root: D });
				for (const R of b.renderedItems) R.element && z.observe(R.element);
				return () => {
					(cancelAnimationFrame(E), z.disconnect());
				};
			}),
		));
	const y = (b, p, E = !1) => {
			let x;
			return (
				p((z) => {
					const R = z.findIndex(({ id: C }) => C === b.id),
						A = z.slice();
					if (R !== -1) {
						x = z[R];
						const C = { ...x, ...b };
						((A[R] = C), s.set(b.id, C));
					} else (A.push(b), s.set(b.id, b));
					return A;
				}),
				() => {
					p((z) => {
						if (!x) return (E && s.delete(b.id), z.filter(({ id: C }) => C !== b.id));
						const R = z.findIndex(({ id: C }) => C === b.id);
						if (R === -1) return z;
						const A = z.slice();
						return ((A[R] = x), s.set(b.id, x), A);
					});
				}
			);
		},
		S = (b) => y(b, (p) => h.setState("items", p), !0);
	return {
		...m,
		registerItem: S,
		renderItem: (b) =>
			Sn(
				S(b),
				y(b, (p) => h.setState("renderedItems", p)),
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
function S2(e, n, a) {
	return (Ro(n, [a.store]), Qt(e, a, "items", "setItems"), e);
}
var w2 = { id: null };
function Ai(e, n) {
	return e.find((a) => (n ? !a.disabled && a.id !== n : !a.disabled));
}
function E2(e, n) {
	return e.filter((a) => (n ? !a.disabled && a.id !== n : !a.disabled));
}
function i0(e, n) {
	return e.filter((a) => a.rowId === n);
}
function T2(e, n, a = !1) {
	const u = e.findIndex((s) => s.id === n);
	return [...e.slice(u + 1), ...(a ? [w2] : []), ...e.slice(0, u)];
}
function i_(e) {
	const n = [];
	for (const a of e) {
		const u = n.find((s) => {
			var o;
			return ((o = s[0]) == null ? void 0 : o.rowId) === a.rowId;
		});
		u ? u.push(a) : n.push([a]);
	}
	return n;
}
function a_(e) {
	let n = 0;
	for (const { length: a } of e) a > n && (n = a);
	return n;
}
function x2(e) {
	return { id: "__EMPTY_ITEM__", disabled: !0, rowId: e };
}
function A2(e, n, a) {
	const u = a_(e);
	for (const s of e)
		for (let o = 0; o < u; o += 1) {
			const f = s[o];
			if (!f || (a && f.disabled)) {
				const h = o === 0 && a ? Ai(s) : s[o - 1];
				s[o] = h && n !== h.id && a ? h : x2(h?.rowId);
			}
		}
	return e;
}
function C2(e) {
	const n = i_(e),
		a = a_(n),
		u = [];
	for (let s = 0; s < a; s += 1)
		for (const o of n) {
			const f = o[s];
			f && u.push({ ...f, rowId: f.rowId ? `${s}` : void 0 });
		}
	return u;
}
function R2(e = {}) {
	var n;
	const a = (n = e.store) == null ? void 0 : n.getState(),
		u = _2(e),
		s = Be(e.activeId, a?.activeId, e.defaultActiveId),
		o = ni(
			{
				...u.getState(),
				id: Be(e.id, a?.id, `id-${Math.random().toString(36).slice(2, 8)}`),
				activeId: s,
				baseElement: Be(a?.baseElement, null),
				includesBaseElement: Be(e.includesBaseElement, a?.includesBaseElement, s === null),
				moves: Be(a?.moves, 0),
				orientation: Be(e.orientation, a?.orientation, "both"),
				rtl: Be(e.rtl, a?.rtl, !1),
				virtualFocus: Be(e.virtualFocus, a?.virtualFocus, !1),
				focusLoop: Be(e.focusLoop, a?.focusLoop, !1),
				focusWrap: Be(e.focusWrap, a?.focusWrap, !1),
				focusShift: Be(e.focusShift, a?.focusShift, !1),
			},
			u,
			e.store,
		);
	Ni(o, () =>
		ji(o, ["renderedItems", "activeId"], (h) => {
			o.setState("activeId", (m) => {
				var g;
				return m !== void 0 ? m : (g = Ai(h.renderedItems)) == null ? void 0 : g.id;
			});
		}),
	);
	const f = (h = "next", m = {}) => {
		var g, y;
		const S = o.getState(),
			{
				skip: b = 0,
				activeId: p = S.activeId,
				focusShift: E = S.focusShift,
				focusLoop: x = S.focusLoop,
				focusWrap: D = S.focusWrap,
				includesBaseElement: z = S.includesBaseElement,
				renderedItems: R = S.renderedItems,
				rtl: A = S.rtl,
			} = m,
			C = h === "up" || h === "down",
			M = h === "next" || h === "down",
			G = M ? A && !C : !A || C,
			$ = E && !b;
		let q = C ? Nb(A2(i_(R), p, $)) : R;
		if (((q = G ? Ld(q) : q), (q = C ? C2(q) : q), p == null)) return (g = Ai(q)) == null ? void 0 : g.id;
		const B = q.find((V) => V.id === p);
		if (!B) return (y = Ai(q)) == null ? void 0 : y.id;
		const ne = q.some((V) => V.rowId),
			P = q.indexOf(B),
			le = q.slice(P + 1),
			te = i0(le, B.rowId);
		if (b) {
			const V = E2(te, p),
				re = V.slice(b)[0] || V[V.length - 1];
			return re?.id;
		}
		const X = x && (C ? x !== "horizontal" : x !== "vertical"),
			ue = ne && D && (C ? D !== "horizontal" : D !== "vertical"),
			O = M ? (!ne || C) && X && z : C ? z : !1;
		if (X) {
			const V = Ai(T2(ue && !O ? q : i0(q, B.rowId), p, O), p);
			return V?.id;
		}
		if (ue) {
			const V = Ai(O ? te : le, p);
			return O ? V?.id || null : V?.id;
		}
		const U = Ai(te, p);
		return !U && O ? null : U?.id;
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
			return (h = Ai(o.getState().renderedItems)) == null ? void 0 : h.id;
		},
		last: () => {
			var h;
			return (h = Ai(Ld(o.getState().renderedItems))) == null ? void 0 : h.id;
		},
		next: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("next", h)),
		previous: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("previous", h)),
		down: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("down", h)),
		up: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("up", h)),
	};
}
function N2(e, n, a) {
	return (
		(e = S2(e, n, a)),
		Qt(e, a, "activeId", "setActiveId"),
		Qt(e, a, "includesBaseElement"),
		Qt(e, a, "virtualFocus"),
		Qt(e, a, "orientation"),
		Qt(e, a, "rtl"),
		Qt(e, a, "focusLoop"),
		Qt(e, a, "focusWrap"),
		Qt(e, a, "focusShift"),
		e
	);
}
var O2 = "a",
	r_ = We(function ({ store: n, showOnHover: a = !0, ...u }) {
		const s = vh();
		((n = n || s), Kt(n, !1));
		const o = wl(u),
			f = (0, T.useRef)(0);
		((0, T.useEffect)(() => () => window.clearTimeout(f.current), []),
			(0, T.useEffect)(
				() =>
					Pt(
						"mouseleave",
						(x) => {
							if (!n) return;
							const { anchorElement: D } = n.getState();
							D && x.target === D && (window.clearTimeout(f.current), (f.current = 0));
						},
						!0,
					),
				[n],
			));
		const h = u.onMouseMove,
			m = _n(a),
			g = sh(),
			y = ze((E) => {
				if ((h?.(E), o || !n || E.defaultPrevented || f.current || !g() || !m(E))) return;
				const x = E.currentTarget;
				(n.setAnchorElement(x), n.setDisclosureElement(x));
				const { showTimeout: D, timeout: z } = n.getState(),
					R = () => {
						((f.current = 0),
							g() &&
								(n?.setAnchorElement(x),
								n?.show(),
								queueMicrotask(() => {
									n?.setDisclosureElement(x);
								})));
					},
					A = D ?? z;
				A === 0 ? R() : (f.current = window.setTimeout(R, A));
			}),
			S = u.onClick,
			b = ze((E) => {
				(S?.(E), n && (window.clearTimeout(f.current), (f.current = 0)));
			}),
			p = (0, T.useCallback)(
				(E) => {
					if (!n) return;
					const { anchorElement: x } = n.getState();
					x?.isConnected || n.setAnchorElement(E);
				},
				[n],
			);
		return ((u = { ...u, ref: Dt(p, u.ref), onMouseMove: y, onClick: b }), (u = kl(u)), u);
	}),
	WM = Qe(function (n) {
		return Fe(O2, r_(n));
	}),
	k2 = "div",
	u_ = We(function ({ store: n, ...a }) {
		const u = ko();
		return ((n = n || u), (a = { ...a, ref: Dt(n?.setAnchorElement, a.ref) }), a);
	}),
	ez = Qe(function (n) {
		return Fe(k2, u_(n));
	}),
	M2 = "button";
function a0(e) {
	if (!e.isTrusted) return !1;
	const n = e.currentTarget;
	return e.key === "Enter"
		? va(n) || n.tagName === "SUMMARY" || n.tagName === "A"
		: e.key === " "
			? va(n) || n.tagName === "SUMMARY" || n.tagName === "INPUT" || n.tagName === "SELECT"
			: !1;
}
var z2 = Symbol("command"),
	jh = We(function ({ clickOnEnter: n = !0, clickOnSpace: a = !0, ...u }) {
		const s = (0, T.useRef)(null),
			[o, f] = (0, T.useState)(!1);
		(0, T.useEffect)(() => {
			s.current && f(va(s.current));
		}, []);
		const [h, m] = (0, T.useState)(!1),
			g = (0, T.useRef)(!1),
			y = wl(u),
			[S, b] = _b(u, z2, !0),
			p = u.onKeyDown,
			E = ze((z) => {
				p?.(z);
				const R = z.currentTarget;
				if (z.defaultPrevented || S || y || !bn(z) || qi(R) || R.isContentEditable) return;
				const A = n && z.key === "Enter",
					C = a && z.key === " ",
					M = z.key === "Enter" && !n,
					G = z.key === " " && !a;
				if (M || G) {
					z.preventDefault();
					return;
				}
				if (A || C) {
					const $ = a0(z);
					if (A) {
						if (!$) {
							z.preventDefault();
							const { view: q, ...B } = z,
								ne = () => Ap(R, B);
							cN() ? cl(R, "keyup", ne) : queueMicrotask(ne);
						}
					} else C && ((g.current = !0), $ || (z.preventDefault(), m(!0)));
				}
			}),
			x = u.onKeyUp,
			D = ze((z) => {
				if ((x?.(z), z.defaultPrevented || S || y || z.metaKey)) return;
				const R = a && z.key === " ";
				if (g.current && R && ((g.current = !1), !a0(z))) {
					(z.preventDefault(), m(!1));
					const A = z.currentTarget,
						{ view: C, ...M } = z;
					queueMicrotask(() => Ap(A, M));
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
				onKeyUp: D,
			}),
			(u = kl(u)),
			u
		);
	}),
	tz = Qe(function (n) {
		return Fe(M2, jh(n));
	}),
	l_ = "button",
	s_ = We(function (n) {
		const a = (0, T.useRef)(null),
			u = bb(a, l_),
			[s, o] = (0, T.useState)(() => !!u && va({ tagName: u, type: n.type }));
		return (
			(0, T.useEffect)(() => {
				a.current && o(va(a.current));
			}, []),
			(n = { role: !s && u !== "a" ? "button" : void 0, ...n, ref: Dt(a, n.ref) }),
			(n = jh(n)),
			n
		);
	}),
	nz = Qe(function (n) {
		return Fe(l_, s_(n));
	}),
	D2 = "button",
	j2 = Symbol("disclosure"),
	o_ = We(function ({ store: n, toggleOnClick: a = !0, ...u }) {
		const s = hh();
		((n = n || s), Kt(n, !1));
		const o = (0, T.useRef)(null),
			[f, h] = (0, T.useState)(!1),
			m = n.useState("disclosureElement"),
			g = n.useState("open");
		(0, T.useEffect)(() => {
			let D = m === o.current;
			(m?.isConnected || (n?.setDisclosureElement(o.current), (D = !0)), h(g && D));
		}, [m, n, g]);
		const y = u.onClick,
			S = _n(a),
			[b, p] = _b(u, j2, !0),
			E = ze((D) => {
				(y?.(D), !D.defaultPrevented && (b || (S(D) && (n?.setDisclosureElement(D.currentTarget), n?.toggle()))));
			}),
			x = n.useState("contentElement");
		return (
			(u = { "aria-expanded": f, "aria-controls": x?.id, ...p, ...u, ref: Dt(o, u.ref), onClick: E }),
			(u = s_(u)),
			u
		);
	}),
	iz = Qe(function (n) {
		return Fe(D2, o_(n));
	}),
	L2 = "button",
	c_ = We(function ({ store: n, ...a }) {
		const u = Oo();
		return (
			(n = n || u),
			Kt(n, !1),
			(a = { "aria-haspopup": ih(n.useState("contentElement"), "dialog"), ...a }),
			(a = o_({ store: n, ...a })),
			a
		);
	}),
	az = Qe(function (n) {
		return Fe(L2, c_(n));
	}),
	q2 = "button",
	f_ = We(function ({ store: n, ...a }) {
		const u = ko();
		((n = n || u), Kt(n, !1));
		const s = a.onClick,
			o = ze((f) => {
				(n?.setAnchorElement(f.currentTarget), s?.(f));
			});
		return (
			(a = Wt(a, (f) => (0, _.jsx)(Mo, { value: n, children: f }), [n])),
			(a = { ...a, onClick: o }),
			(a = u_({ store: n, ...a })),
			(a = c_({ store: n, ...a })),
			a
		);
	}),
	rz = Qe(function (n) {
		return Fe(q2, f_(n));
	}),
	U2 = "button";
function $2(e, n) {
	return {
		ArrowDown: n === "bottom" || n === "top" ? "first" : !1,
		ArrowUp: n === "bottom" || n === "top" ? "last" : !1,
		ArrowRight: n === "right" ? "first" : !1,
		ArrowLeft: n === "left" ? "first" : !1,
	}[e.key];
}
function r0(e, n) {
	return !!e?.some((a) => (!a.element || a.element === n ? !1 : a.element.getAttribute("aria-expanded") === "true"));
}
var B2 = We(function ({ store: n, focusable: a, accessibleWhenDisabled: u, showOnHover: s, ...o }) {
		const f = zo();
		((n = n || f), Kt(n, !1));
		const h = (0, T.useRef)(null),
			m = n.parent,
			g = n.menubar,
			y = !!m,
			S = !!g && !y,
			b = wl(o),
			p = () => {
				const $ = h.current;
				$ && (n?.setDisclosureElement($), n?.setAnchorElement($), n?.show());
			},
			E = o.onFocus,
			x = ze(($) => {
				if ((E?.($), b || $.defaultPrevented || (n?.setAutoFocusOnShow(!1), n?.setActiveId(null), !g) || !S)) return;
				const { items: q } = g.getState();
				r0(q, $.currentTarget) && p();
			}),
			D = zt(n, ($) => $.placement.split("-")[0]),
			z = o.onKeyDown,
			R = ze(($) => {
				if ((z?.($), b || $.defaultPrevented)) return;
				const q = $2($, D);
				q && ($.preventDefault(), p(), n?.setAutoFocusOnShow(!0), n?.setInitialFocus(q));
			}),
			A = o.onClick,
			C = ze(($) => {
				if ((A?.($), $.defaultPrevented || !n)) return;
				const q = !$.detail,
					{ open: B } = n.getState();
				((!B || q) && ((!y || q) && n.setAutoFocusOnShow(!0), n.setInitialFocus(q ? "first" : "container")), y && p());
			});
		((o = Wt(o, ($) => (0, _.jsx)(Eb, { value: n, children: $ }), [n])),
			y && (o = { ...o, render: (0, _.jsx)(bo.div, { render: o.render }) }));
		const M = ou(o.id),
			G = zt(m?.combobox || m, "contentElement");
		return (
			(o = {
				id: M,
				role: y || S ? mb(G, "menuitem") : void 0,
				"aria-haspopup": ih(n.useState("contentElement"), "menu"),
				...o,
				ref: Dt(h, o.ref),
				onFocus: x,
				onKeyDown: R,
				onClick: C,
			}),
			(o = r_({
				store: n,
				focusable: a,
				accessibleWhenDisabled: u,
				...o,
				showOnHover: ($) => {
					if (
						!(() => {
							if (typeof s == "function") return s($);
							if (s != null) return s;
							if (y) return !0;
							if (!g) return !1;
							const { items: ne } = g.getState();
							return S && r0(ne);
						})()
					)
						return !1;
					const B = S ? g : m;
					return (B && B.setActiveId($.currentTarget.id), !0);
				},
			})),
			(o = f_({ store: n, toggleOnClick: !y, focusable: a, accessibleWhenDisabled: u, ...o })),
			(o = gh({ store: n, typeahead: S, ...o })),
			o
		);
	}),
	I2 = Qe(function (n) {
		return Fe(U2, B2(n));
	}),
	Z2 = "div";
function d_(e) {
	const n = e.relatedTarget;
	return n?.nodeType === Node.ELEMENT_NODE ? n : null;
}
function H2(e) {
	const n = d_(e);
	return n ? Ot(e.currentTarget, n) : !1;
}
var Id = Symbol("composite-hover");
function V2(e) {
	let n = d_(e);
	if (!n) return !1;
	do {
		if (Di(n, Id) && n[Id]) return !0;
		n = n.parentElement;
	} while (n);
	return !1;
}
var h_ = We(function ({ store: n, focusOnHover: a = !0, blurOnHoverEnd: u = !!a, ...s }) {
		const o = fh();
		((n = n || o), Kt(n, !1));
		const f = sh(),
			h = s.onMouseMove,
			m = _n(a),
			g = ze((E) => {
				if ((h?.(E), !E.defaultPrevented && f() && m(E))) {
					if (!ma(E.currentTarget)) {
						const x = n?.getState().baseElement;
						x && !po(x) && x.focus();
					}
					n?.setActiveId(E.currentTarget.id);
				}
			}),
			y = s.onMouseLeave,
			S = _n(u),
			b = ze((E) => {
				var x;
				(y?.(E),
					!E.defaultPrevented &&
						f() &&
						(H2(E) ||
							V2(E) ||
							(m(E) && S(E) && (n?.setActiveId(null), (x = n?.getState().baseElement) == null || x.focus()))));
			}),
			p = (0, T.useCallback)((E) => {
				E && (E[Id] = !0);
			}, []);
		return ((s = { ...s, ref: Dt(p, s.ref), onMouseMove: g, onMouseLeave: b }), lu(s));
	}),
	uz = ch(
		Qe(function (n) {
			return Fe(Z2, h_(n));
		}),
	),
	Q2 = "div",
	m_ = We(function ({ store: n, shouldRegisterItem: a = !0, getItem: u = cb, element: s, ...o }) {
		const f = _N();
		n = n || f;
		const h = ou(o.id),
			m = (0, T.useRef)(s);
		return (
			(0, T.useEffect)(() => {
				const g = m.current;
				if (!h || !g || !a) return;
				const y = u({ id: h, element: g });
				return n?.renderItem(y);
			}, [h, a, u, n]),
			(o = { ...o, ref: Dt(m, o.ref) }),
			lu(o)
		);
	}),
	lz = Qe(function (n) {
		return Fe(Q2, m_(n));
	}),
	P2 = "button";
function Y2(e) {
	return zd(e) ? !0 : e.tagName === "INPUT" && !va(e);
}
function G2(e, n = !1) {
	const a = e.clientHeight,
		{ top: u } = e.getBoundingClientRect(),
		s = Math.max(a * 0.875, a - 40) * 1.5,
		o = n ? a - s + u : s + u;
	return e.tagName === "HTML" ? o + e.scrollTop : o;
}
function K2(e, n = !1) {
	const { top: a } = e.getBoundingClientRect();
	return n ? a + e.clientHeight : a;
}
function u0(e, n, a, u = !1) {
	var s;
	if (!n || !a) return;
	const { renderedItems: o } = n.getState(),
		f = vb(e);
	if (!f) return;
	const h = G2(f, u);
	let m, g;
	for (let y = 0; y < o.length; y += 1) {
		const S = m;
		if (((m = a(y)), !m)) break;
		if (m === S) continue;
		const b = (s = ha(n, m)) == null ? void 0 : s.element;
		if (!b) continue;
		const p = K2(b, u) - h,
			E = Math.abs(p);
		if ((u && p <= 0) || (!u && p >= 0)) {
			g !== void 0 && g < E && (m = S);
			break;
		}
		g = E;
	}
	return m;
}
function X2(e, n) {
	return bn(e) ? !1 : fl(n, e.target);
}
var v_ = We(function ({
		store: n,
		rowId: a,
		preventScrollOnKeyDown: u = !1,
		moveOnKeyPress: s = !0,
		tabbable: o = !1,
		getItem: f,
		"aria-setsize": h,
		"aria-posinset": m,
		...g
	}) {
		const y = fh();
		n = n || y;
		const S = ou(g.id),
			b = (0, T.useRef)(null),
			p = (0, T.useContext)(xN),
			E = wl(g) && !g.accessibleWhenDisabled,
			{
				rowId: x,
				baseElement: D,
				isActiveItem: z,
				ariaSetSize: R,
				ariaPosInSet: A,
				isTabbable: C,
			} = WN(n, {
				rowId(O) {
					if (a) return a;
					if (O && p?.baseElement && p.baseElement === O.baseElement) return p.id;
				},
				baseElement(O) {
					return O?.baseElement || void 0;
				},
				isActiveItem(O) {
					return !!O && O.activeId === S;
				},
				ariaSetSize(O) {
					if (h != null) return h;
					if (O && p?.ariaSetSize && p.baseElement === O.baseElement) return p.ariaSetSize;
				},
				ariaPosInSet(O) {
					if (m != null) return m;
					if (!O || !p?.ariaPosInSet || p.baseElement !== O.baseElement) return;
					const U = O.renderedItems.filter((V) => V.rowId === x);
					return p.ariaPosInSet + U.findIndex((V) => V.id === S);
				},
				isTabbable(O) {
					if (!O?.renderedItems.length) return !0;
					if (O.virtualFocus) return !1;
					if (o) return !0;
					if (O.activeId === null) return !1;
					const U = n?.item(O.activeId);
					return U?.disabled || !U?.element ? !0 : O.activeId === S;
				},
			}),
			M = (0, T.useCallback)(
				(O) => {
					var U;
					const V = {
						...O,
						id: S || O.id,
						rowId: x,
						disabled: !!E,
						children: (U = O.element) == null ? void 0 : U.textContent,
					};
					return f ? f(V) : V;
				},
				[S, x, E, f],
			),
			G = g.onFocus,
			$ = (0, T.useRef)(!1),
			q = ze((O) => {
				if ((G?.(O), O.defaultPrevented || yb(O) || !S || !n || X2(O, n))) return;
				const { virtualFocus: U, baseElement: V } = n.getState();
				(n.setActiveId(S),
					zd(O.currentTarget) && IN(O.currentTarget),
					U &&
						bn(O) &&
						(Y2(O.currentTarget) ||
							(V?.isConnected &&
								(rh() &&
									O.currentTarget.hasAttribute("data-autofocus") &&
									O.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" }),
								($.current = !0),
								O.relatedTarget === V || fl(n, O.relatedTarget) ? ZN(V) : V.focus()))));
			}),
			B = g.onBlurCapture,
			ne = ze((O) => {
				if ((B?.(O), O.defaultPrevented)) return;
				const U = n?.getState();
				U?.virtualFocus && $.current && (($.current = !1), O.preventDefault(), O.stopPropagation());
			}),
			P = g.onKeyDown,
			le = _n(u),
			te = _n(s),
			X = ze((O) => {
				if ((P?.(O), O.defaultPrevented || !bn(O) || !n)) return;
				const { currentTarget: U } = O,
					V = n.getState(),
					re = n.item(S),
					de = !!re?.rowId,
					Ce = V.orientation !== "horizontal",
					N = V.orientation !== "vertical",
					Y = () => !!(de || N || !V.baseElement || !qi(V.baseElement)),
					ie = {
						ArrowUp: (de || Ce) && n.up,
						ArrowRight: (de || N) && n.next,
						ArrowDown: (de || Ce) && n.down,
						ArrowLeft: (de || N) && n.previous,
						Home: () => {
							if (Y()) return !de || O.ctrlKey ? n?.first() : n?.previous(-1);
						},
						End: () => {
							if (Y()) return !de || O.ctrlKey ? n?.last() : n?.next(-1);
						},
						PageUp: () => u0(U, n, n?.up, !0),
						PageDown: () => u0(U, n, n?.down),
					}[O.key];
				if (ie) {
					if (zd(U)) {
						const ge = lN(U),
							ye = N && O.key === "ArrowLeft",
							we = N && O.key === "ArrowRight",
							Ze = Ce && O.key === "ArrowUp",
							Oe = Ce && O.key === "ArrowDown";
						if (we || Oe) {
							const { length: lt } = uN(U);
							if (ge.end !== lt) return;
						} else if ((ye || Ze) && ge.start !== 0) return;
					}
					const se = ie();
					if (le(O) || se !== void 0) {
						if (!te(O)) return;
						(O.preventDefault(), n.move(se));
					}
				}
			}),
			ue = (0, T.useMemo)(() => ({ id: S, baseElement: D }), [S, D]);
		return (
			(g = Wt(g, (O) => (0, _.jsx)(TN.Provider, { value: ue, children: O }), [ue])),
			(g = {
				id: S,
				"data-active-item": z || void 0,
				...g,
				ref: Dt(b, g.ref),
				tabIndex: C ? g.tabIndex : -1,
				onFocus: q,
				onBlurCapture: ne,
				onKeyDown: X,
			}),
			(g = jh(g)),
			(g = m_({ store: n, ...g, getItem: M, shouldRegisterItem: S ? g.shouldRegisterItem : !1 })),
			lu({ ...g, "aria-setsize": R, "aria-posinset": A })
		);
	}),
	sz = ch(
		Qe(function (n) {
			return Fe(P2, v_(n));
		}),
	),
	F2 = "div";
function J2(e, n, a) {
	var u;
	if (!e) return !1;
	if (ma(e)) return !0;
	const s = n?.find((h) => {
			var m;
			return h.element === a ? !1 : ((m = h.element) == null ? void 0 : m.getAttribute("aria-expanded")) === "true";
		}),
		o = (u = s?.element) == null ? void 0 : u.getAttribute("aria-controls");
	if (!o) return !1;
	const f = rt(e).getElementById(o);
	return f ? (ma(f) ? !0 : !!f.querySelector("[role=menuitem][aria-expanded=true]")) : !1;
}
var W2 = We(function ({
		store: n,
		hideOnClick: a = !0,
		preventScrollOnKeyDown: u = !0,
		focusOnHover: s,
		blurOnHoverEnd: o,
		...f
	}) {
		const h = jN(!0),
			m = CN();
		((n = n || h || m), Kt(n, !1));
		const g = f.onClick,
			y = _n(a),
			S = "hideAll" in n ? n.hideAll : void 0,
			b = !!S,
			p = ze((E) => {
				(g?.(E),
					!E.defaultPrevented &&
						(hN(E) || dN(E) || (S && E.currentTarget.getAttribute("aria-haspopup") !== "menu" && y(E) && S())));
			});
		return (
			(f = {
				role: mb(
					zt(n, (E) => ("contentElement" in E ? E.contentElement : null)),
					"menuitem",
				),
				...f,
				onClick: p,
			}),
			(f = v_({ store: n, preventScrollOnKeyDown: u, ...f })),
			(f = h_({
				store: n,
				...f,
				focusOnHover(E) {
					const x = () => (typeof s == "function" ? s(E) : (s ?? !0));
					if (!n || !x()) return !1;
					const { baseElement: D, items: z } = n.getState();
					return b
						? (E.currentTarget.hasAttribute("aria-expanded") && E.currentTarget.focus(), !0)
						: J2(D, z, E.currentTarget)
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
	eM = ch(
		Qe(function (n) {
			return Fe(F2, W2(n));
		}),
	);
function tM({ popover: e, ...n } = {}) {
	const a = _h(
		n.store,
		bh(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
	);
	const u = a?.getState(),
		s = Ib({ ...n, store: a }),
		o = Be(n.placement, u?.placement, "bottom"),
		f = ni(
			{
				...s.getState(),
				placement: o,
				currentPlacement: o,
				anchorElement: Be(u?.anchorElement, null),
				popoverElement: Be(u?.popoverElement, null),
				arrowElement: Be(u?.arrowElement, null),
				rendered: Symbol("rendered"),
			},
			s,
			a,
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
function nM(e, n, a) {
	return (Ro(n, [a.popover]), Qt(e, a, "placement"), Zb(e, n, a));
}
function iM(e = {}) {
	var n;
	const a = (n = e.store) == null ? void 0 : n.getState(),
		u = tM({ ...e, placement: Be(e.placement, a?.placement, "bottom") }),
		s = Be(e.timeout, a?.timeout, 500),
		o = ni(
			{
				...u.getState(),
				timeout: s,
				showTimeout: Be(e.showTimeout, a?.showTimeout),
				hideTimeout: Be(e.hideTimeout, a?.hideTimeout),
				autoFocusOnShow: Be(a?.autoFocusOnShow, !1),
			},
			u,
			e.store,
		);
	return { ...u, ...o, setAutoFocusOnShow: (f) => o.setState("autoFocusOnShow", f) };
}
function aM(e, n, a) {
	return (Qt(e, a, "timeout"), Qt(e, a, "showTimeout"), Qt(e, a, "hideTimeout"), nM(e, n, a));
}
var oz = (0, T.createContext)(void 0),
	zl = Ui([Sb, No], [Mo, dh]),
	cz = zl.useContext,
	fz = zl.useScopedContext,
	rM = zl.useProviderContext,
	dz = zl.ContextProvider,
	hz = zl.ScopedContextProvider,
	mz = (0, T.createContext)(void 0),
	vz = (0, T.createContext)(!1);
function uM({ combobox: e, parent: n, menubar: a, ...u } = {}) {
	const s = !!a && !n,
		o = _h(
			u.store,
			KN(n, ["values"]),
			bh(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
		);
	const f = o.getState(),
		h = R2({ ...u, store: o, orientation: Be(u.orientation, f.orientation, "vertical") }),
		m = iM({
			...u,
			store: o,
			placement: Be(u.placement, f.placement, "bottom-start"),
			timeout: Be(u.timeout, f.timeout, s ? 0 : 150),
			hideTimeout: Be(u.hideTimeout, f.hideTimeout, 0),
		}),
		g = ni(
			{
				...h.getState(),
				...m.getState(),
				initialFocus: Be(f.initialFocus, "container"),
				values: Be(u.values, f.values, u.defaultValues, {}),
			},
			h,
			m,
			o,
		);
	return (
		Ni(g, () =>
			ji(g, ["mounted"], (y) => {
				y.mounted || g.setState("activeId", null);
			}),
		),
		Ni(g, () =>
			ji(n, ["orientation"], (y) => {
				g.setState("placement", y.orientation === "vertical" ? "right-start" : "bottom-start");
			}),
		),
		{
			...h,
			...m,
			...g,
			combobox: e,
			parent: n,
			menubar: a,
			hideAll: () => {
				(m.hide(), n?.hideAll());
			},
			setInitialFocus: (y) => g.setState("initialFocus", y),
			setValues: (y) => g.setState("values", y),
			setValue: (y, S) => {
				y !== "__proto__" &&
					y !== "constructor" &&
					(Array.isArray(y) ||
						g.setState("values", (b) => {
							const p = b[y],
								E = ob(S, p);
							return E === p ? b : { ...b, [y]: E !== void 0 && E };
						}));
			},
		}
	);
}
function lM(e, n, a) {
	return (
		Ro(n, [a.combobox, a.parent, a.menubar]),
		Qt(e, a, "values", "setValues"),
		Object.assign(aM(N2(e, n, a), n, a), { combobox: a.combobox, parent: a.parent, menubar: a.menubar })
	);
}
function sM(e = {}) {
	const n = DN(),
		a = AN(),
		u = rM();
	e = {
		...e,
		parent: e.parent !== void 0 ? e.parent : n,
		menubar: e.menubar !== void 0 ? e.menubar : a,
		combobox: e.combobox !== void 0 ? e.combobox : u,
	};
	const [s, o] = Sh(uM, e);
	return lM(s, o, e);
}
function oM(e = {}) {
	return (0, _.jsx)(Eb, { value: sM(e), children: e.children });
}
var cM = (0, T.memo)(function (n) {
		const { channelName: a, items: u } = n;
		return (0, _.jsxs)(oM, {
			placement: "bottom-end",
			children: [
				(0, _.jsx)(I2, {
					className: "ChannelRowMenu-trigger",
					"aria-label": `Actions for #${a}`,
					children: (0, _.jsx)(NR, { size: 16, "aria-hidden": "true" }),
				}),
				(0, _.jsx)(y2, {
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					className: "ChannelRowMenu-popover",
					"aria-label": `Actions for #${a}`,
					children: u.map((s) =>
						(0, _.jsx)(eM, { className: "ChannelRowMenu-item", onClick: s.onSelect, children: s.label }, s.id),
					),
				}),
			],
		});
	}),
	fM = 300 * 1e3;
function dM(e) {
	const n = (0, T.useRef)(new Map()),
		a = (0, T.useRef)(new Map()),
		[, u] = (0, T.useState)(0),
		s = (0, T.useCallback)((f) => (n.current.has(f) ? n.current.get(f) : void 0), []),
		o = (0, T.useCallback)(
			async (f) => {
				const h = Date.now(),
					m = [...new Set(f)].filter((g) => {
						const y = a.current.get(g);
						return y === void 0 || h - y >= fM;
					});
				if (m.length !== 0) {
					for (const g of m) a.current.set(g, h);
					for (let g = 0; g < m.length; g += 50) {
						const y = m.slice(g, g + 50);
						try {
							const S = await e.members.resolve(y);
							for (const b of y) n.current.set(b, S[b] ?? null);
						} catch {
							for (const S of y) a.current.delete(S);
						}
					}
					u((g) => g + 1);
				}
			},
			[e],
		);
	return (0, T.useMemo)(() => ({ get: s, resolve: o }), [s, o]);
}
function hM(e) {
	const [n, a] = (0, T.useState)(null);
	return (
		(0, T.useEffect)(() => {
			let u = !1;
			return (
				e.members.list({ limit: 100 }).then((s) => {
					if (!u) {
						if ("_nay" in s) {
							a({ members: [], error: s._nay.message, truncated: !1 });
							return;
						}
						a({ members: s._yay.members, error: null, truncated: s._yay.cursor !== null });
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
function g_(e) {
	const n = hM(e.client);
	if (n === null) return (0, _.jsx)("p", { className: "channel-status", role: "status", children: "Loading people…" });
	if (n.error !== null) return (0, _.jsx)("p", { className: "form-error", role: "alert", children: n.error });
	const a = n.members
		.filter((u) => u.userId !== e.selfUserId)
		.sort((u, s) => (u.displayName ?? "").localeCompare(s.displayName ?? ""));
	return a.length === 0
		? (0, _.jsx)("p", { className: "channel-status", children: "Nobody else is in this workspace yet." })
		: (0, _.jsxs)(_.Fragment, {
				children: [
					(0, _.jsx)("ul", {
						className: "people-list",
						children: a.map((u) =>
							(0, _.jsx)(
								"li",
								{
									className: "people-item",
									children: (0, _.jsxs)("label", {
										children: [
											(0, _.jsx)("input", {
												type: "checkbox",
												checked: e.selected.includes(u.userId),
												onChange: (s) => e.onToggle(u.userId, s.currentTarget.checked),
											}),
											u.displayName ?? "Someone with no name yet",
										],
									}),
								},
								u.userId,
							),
						),
					}),
					n.truncated
						? (0, _.jsx)("p", {
								className: "channel-status",
								children: "Showing the first 100 people in this workspace.",
							})
						: null,
				],
			});
}
function l0(e) {
	const n = (0, T.useId)(),
		a = (0, T.useId)(),
		u = (0, T.useId)(),
		s = (0, T.useId)(),
		[o, f] = (0, T.useState)(e.initialName),
		[h, m] = (0, T.useState)(e.initialTopic),
		[g, y] = (0, T.useState)(!1),
		[S, b] = (0, T.useState)([]),
		[p, E] = (0, T.useState)(null),
		x = () => {
			if (e.busy) return;
			const z = o.trim();
			if (z.length < 1 || z.length > 64) {
				E("Enter a name between 1 and 64 characters.");
				return;
			}
			const R = h.trim();
			if (R.length > 250) {
				E("Keep the topic under 250 characters.");
				return;
			}
			(E(null), e.onSubmit(z, R, { isPrivate: g, userIds: S }));
		},
		D = p ?? e.error;
	return (0, _.jsxs)(Sl, {
		labelledBy: n,
		onClose: e.onClose,
		children: [
			(0, _.jsx)("h2", { id: n, className: "dialog-title", children: e.title }),
			(0, _.jsxs)("div", {
				className: "field",
				children: [
					(0, _.jsx)("label", { htmlFor: a, children: "Channel name" }),
					(0, _.jsx)("input", {
						id: a,
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
			(0, _.jsxs)("div", {
				className: "field",
				children: [
					(0, _.jsx)("label", { htmlFor: u, children: "Topic (optional)" }),
					(0, _.jsx)("input", {
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
				? (0, _.jsxs)("div", {
						className: "field",
						children: [
							(0, _.jsxs)("label", {
								className: "checkbox-label",
								htmlFor: s,
								children: [
									(0, _.jsx)("input", {
										id: s,
										type: "checkbox",
										checked: g,
										onChange: (z) => y(z.currentTarget.checked),
									}),
									"Private channel",
								],
							}),
							g
								? (0, _.jsxs)(_.Fragment, {
										children: [
											(0, _.jsx)("p", { className: "field-note", children: Wd }),
											(0, _.jsx)("p", {
												className: "field-note",
												children: "Tick one person for a direct message, or several for a group.",
											}),
											(0, _.jsx)(g_, {
												client: e.privacy.client,
												selfUserId: e.privacy.selfUserId,
												selected: S,
												onToggle: (z, R) => b((A) => (R ? [...A, z] : A.filter((C) => C !== z))),
											}),
										],
									})
								: null,
						],
					})
				: null,
			D !== null ? (0, _.jsx)("p", { className: "form-error", role: "alert", children: D }) : null,
			(0, _.jsxs)("div", {
				className: "dialog-actions",
				children: [
					(0, _.jsx)("button", {
						type: "button",
						className: "button",
						disabled: e.busy,
						onClick: e.onClose,
						children: "Cancel",
					}),
					(0, _.jsx)("button", {
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
function mM(e) {
	const n = (0, T.useId)(),
		[a, u] = (0, T.useState)(null),
		[s, o] = (0, T.useState)(!1),
		[f, h] = (0, T.useState)(!1),
		[m, g] = (0, T.useState)(null),
		y = (0, T.useCallback)(
			() =>
				e.client.scopes
					.listPrincipals({ scopeId: e.channel.key })
					.then((E) => (u(E), o(!0), E !== null && e.memberNames.resolve(E.map((x) => x.userId)), E)),
			[e.client, e.channel.key, e.memberNames],
		);
	(0, T.useEffect)(() => {
		y();
	}, [y]);
	const S = (E) => {
			(h(!0),
				g(null),
				E.then((x) => {
					if ("_nay" in x) {
						g(x._nay.message);
						return;
					}
					return y().then(() => {});
				}).finally(() => h(!1)));
		},
		b = new Set((a ?? []).map((E) => E.userId)),
		p = (a ?? []).some((E) => E.userId === e.selfUserId && E.level === "manage");
	return (0, _.jsxs)(Sl, {
		labelledBy: n,
		onClose: e.onClose,
		children: [
			(0, _.jsxs)("h2", { id: n, className: "dialog-title", children: ["People in #", e.channel.value.name] }),
			(0, _.jsx)("p", { className: "field-note", children: Wd }),
			s
				? a === null
					? (0, _.jsx)("p", {
							className: "form-error",
							role: "alert",
							children: "This channel's people list is no longer readable. Reload the page.",
						})
					: (0, _.jsx)("ul", {
							className: "people-list current-people",
							"aria-label": "People in this channel",
							children: a.map((E) =>
								(0, _.jsxs)(
									"li",
									{
										className: "people-item",
										children: [
											(0, _.jsxs)("span", {
												children: [
													e.memberNames.get(E.userId) ?? E.userId,
													E.level === "manage" ? " (can add people)" : "",
												],
											}),
											p && E.userId !== e.selfUserId
												? (0, _.jsx)("button", {
														type: "button",
														className: "button channel-item-action",
														disabled: f,
														onClick: () =>
															S(e.client.scopes.removePrincipal({ scopeId: e.channel.key, userId: E.userId })),
														children: "Remove",
													})
												: null,
										],
									},
									E.userId,
								),
							),
						})
				: (0, _.jsx)("p", { className: "channel-status", role: "status", children: "Loading people…" }),
			s && a !== null && p
				? (0, _.jsxs)("div", {
						className: "field",
						children: [
							(0, _.jsx)("p", { className: "field-label", children: "Add people" }),
							(0, _.jsx)(g_, {
								client: e.client,
								selfUserId: e.selfUserId,
								selected: [...b],
								onToggle: (E, x) =>
									S(
										x
											? e.client.scopes.setPrincipal({ scopeId: e.channel.key, userId: E, level: "member" })
											: e.client.scopes.removePrincipal({ scopeId: e.channel.key, userId: E }),
									),
							}),
						],
					})
				: null,
			m !== null ? (0, _.jsx)("p", { className: "form-error", role: "alert", children: m }) : null,
			(0, _.jsx)("div", {
				className: "dialog-actions",
				children: (0, _.jsx)("button", {
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
function vM(e) {
	const n = (0, T.useId)();
	return (0, _.jsxs)(Sl, {
		labelledBy: n,
		onClose: e.onClose,
		children: [
			(0, _.jsxs)("h2", { id: n, className: "dialog-title", children: ["Archive #", e.channelName, "?"] }),
			(0, _.jsx)("p", {
				children: "The channel is hidden from the list. Its messages stay stored and it can be unarchived any time.",
			}),
			e.error !== null ? (0, _.jsx)("p", { className: "form-error", role: "alert", children: e.error }) : null,
			(0, _.jsxs)("div", {
				className: "dialog-actions",
				children: [
					(0, _.jsx)("button", {
						type: "button",
						className: "button",
						"data-dialog-initial": !0,
						disabled: e.busy,
						onClick: e.onClose,
						children: "Cancel",
					}),
					(0, _.jsx)("button", {
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
var gM = [
	{ key: "view:unreads", name: "Unreads" },
	{ key: "view:threads", name: "Threads" },
	{ key: "view:activity", name: "Activity" },
];
function Lh(e) {
	return e === null ? "Former member" : (e ?? "…");
}
function qh(e) {
	return e.length > 80 ? `${e.slice(0, 80)}…` : e;
}
function yM(e) {
	const n = [];
	for (const s of e.channels) {
		if (ei(s.key)) {
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
	const a = e.memberNames;
	(0, T.useEffect)(() => {
		const s = [...e.publicUnreads.values()].map((o) => o.latest.createdBy);
		s.length > 0 && a.resolve(s);
	}, [e.publicUnreads, a]);
	const u = Date.now();
	return (0, _.jsxs)("section", {
		className: "view",
		"aria-label": "Unreads",
		children: [
			(0, _.jsx)("header", {
				className: "view-head",
				children: (0, _.jsx)("h2", { className: "view-title", children: "Unreads" }),
			}),
			(0, _.jsx)("p", {
				className: "view-note",
				children:
					"Only the newest 100 public messages are checked, so an older unread channel can be missing here. Private channels show their name only.",
			}),
			e.recentDead
				? (0, _.jsx)("div", {
						className: "channel-status is-error",
						role: "alert",
						children: "The recent-messages feed stopped, so unread state for public channels is not updating.",
					})
				: null,
			n.length === 0
				? (0, _.jsx)("div", { className: "channel-status", children: "You are all caught up." })
				: (0, _.jsx)("ul", {
						className: "view-rows",
						children: n.map((s) =>
							(0, _.jsx)(
								"li",
								{
									className: "view-row",
									children: (0, _.jsxs)("button", {
										type: "button",
										className: "view-row-button",
										onClick: () => e.onSelectChannel(s.channel),
										children: [
											(0, _.jsxs)("span", {
												className: "view-row-title",
												children: [
													"#",
													s.channel.value.name,
													s.mentionCount > 0
														? (0, _.jsxs)("span", {
																className: "mention-badge",
																children: [
																	s.mentionCount,
																	(0, _.jsx)("span", { className: "visually-hidden", children: " mentions of you" }),
																],
															})
														: null,
												],
											}),
											(0, _.jsx)("span", { className: "view-row-time", children: Co(s.at, u) }),
											s.preview !== null
												? (0, _.jsx)("span", {
														className: "view-row-preview",
														children: `${Lh(a.get(s.preview.createdBy))}: ${qh(s.preview.value.text)}`,
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
function pM(e) {
	const n = new Map(e.channels.map((o) => [o.key, o])),
		a = [];
	for (const o of e.feed) {
		if (o.value.deletedAt !== null) continue;
		const f = eh(o.key),
			h = f === null ? void 0 : n.get(f);
		if (h === void 0) continue;
		const m = a[a.length - 1];
		m !== void 0 && m.channel.key === h.key ? m.messages.push(o) : a.push({ channel: h, messages: [o] });
	}
	const u = e.memberNames;
	(0, T.useEffect)(() => {
		const o = [...new Set(e.feed.map((f) => f.createdBy))];
		o.length > 0 && u.resolve(o);
	}, [e.feed, u]);
	const s = Date.now();
	return (0, _.jsxs)("section", {
		className: "view",
		"aria-label": "Activity",
		children: [
			(0, _.jsx)("header", {
				className: "view-head",
				children: (0, _.jsx)("h2", { className: "view-title", children: "Activity" }),
			}),
			(0, _.jsx)("p", {
				className: "view-note",
				children: "The newest public messages. Private channels are not shown here.",
			}),
			e.recentDead
				? (0, _.jsx)("div", {
						className: "channel-status is-error",
						role: "alert",
						children: "The recent-messages feed stopped, so this view is not updating.",
					})
				: null,
			a.length === 0
				? (0, _.jsx)("div", { className: "channel-status", children: "No public messages yet." })
				: (0, _.jsx)("div", {
						className: "view-groups",
						children: a.map((o, f) =>
							(0, _.jsxs)(
								"section",
								{
									className: "view-group",
									children: [
										(0, _.jsx)("h3", {
											className: "view-group-title",
											children: (0, _.jsxs)("button", {
												type: "button",
												className: "view-group-link",
												onClick: () => e.onSelectChannel(o.channel),
												children: ["#", o.channel.value.name],
											}),
										}),
										(0, _.jsx)("ul", {
											className: "view-rows",
											children: o.messages.map((h) =>
												(0, _.jsxs)(
													"li",
													{
														className: h.value.mentions?.includes(e.selfUserId) ? "view-row mention-self" : "view-row",
														children: [
															(0, _.jsx)("span", { className: "view-row-title", children: Lh(u.get(h.createdBy)) }),
															(0, _.jsx)("span", { className: "view-row-time", children: Co(h.timestamp, s) }),
															(0, _.jsx)("span", { className: "view-row-preview", children: qh(h.value.text) }),
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
function bM(e) {
	const [n, a] = (0, T.useState)([]),
		[u, s] = (0, T.useState)(!1),
		[o, f] = (0, T.useState)(!1);
	(0, T.useEffect)(() => {
		const S = Fr(vl);
		return e.client.data.watchRecent({ collection: "replies", limit: 100, order: "desc" }, (b) => {
			if (b === null) {
				(f(!0), s(!0));
				return;
			}
			(a(S.apply_window(b.docs)), s(!0));
		});
	}, [e.client]);
	const h = new Map(e.channels.map((S) => [S.key, S])),
		m = new Map();
	for (const S of n) {
		if (S.value.deletedAt !== null) continue;
		const b = eb(S.key),
			p = b === null ? null : eh(b),
			E = p === null ? void 0 : h.get(p);
		if (b === null || E === void 0) continue;
		const x = m.get(b);
		x === void 0 ? m.set(b, { channel: E, newest: S, count: 1 }) : (x.count += 1);
	}
	const g = e.memberNames;
	(0, T.useEffect)(() => {
		const S = [...new Set(n.map((b) => b.createdBy))];
		S.length > 0 && g.resolve(S);
	}, [n, g]);
	const y = Date.now();
	return (0, _.jsxs)("section", {
		className: "view",
		"aria-label": "Threads",
		children: [
			(0, _.jsx)("header", {
				className: "view-head",
				children: (0, _.jsx)("h2", { className: "view-title", children: "Threads" }),
			}),
			(0, _.jsx)("p", {
				className: "view-note",
				children:
					"The newest public reply activity; counts read the newest 100 replies. Private channels are not shown here.",
			}),
			o
				? (0, _.jsx)("div", {
						className: "channel-status is-error",
						role: "alert",
						children: "The replies feed stopped, so this view is not updating.",
					})
				: null,
			u
				? m.size === 0
					? (0, _.jsx)("div", { className: "channel-status", children: "No recent thread activity." })
					: (0, _.jsx)("ul", {
							className: "view-rows",
							children: [...m.entries()].map(([S, b]) =>
								(0, _.jsx)(
									"li",
									{
										className: "view-row",
										children: (0, _.jsxs)("button", {
											type: "button",
											className: "view-row-button",
											onClick: () => e.onOpenThread(b.channel, S),
											children: [
												(0, _.jsxs)("span", { className: "view-row-title", children: ["#", b.channel.value.name] }),
												(0, _.jsx)("span", { className: "view-row-time", children: Co(b.newest.timestamp, y) }),
												(0, _.jsx)("span", {
													className: "view-row-preview",
													children: `${b.count} ${b.count === 1 ? "reply" : "replies"} · ${Lh(g.get(b.newest.createdBy))}: ${qh(b.newest.value.text)}`,
												}),
											],
										}),
									},
									S,
								),
							),
						})
				: (0, _.jsx)("div", { className: "channel-status", role: "status", children: "Loading threads…" }),
		],
	});
}
function _M(e) {
	return e === "denied"
		? "Chitchat can no longer read its data. Reload the page to try again."
		: e === "session_expired"
			? "This Chitchat session expired. Reload the page to continue."
			: e === "unavailable"
				? "Chitchat cannot reach its data right now. Nothing will update until the connection returns."
				: e === "capacity"
					? "Chitchat has too many live views open. Close a thread, or reload the page."
					: "Chitchat stopped reading its data. Reload the page to try again.";
}
function SM(e) {
	return `--bonobo-${e.replace(/[A-Z]/gu, (n) => `-${n.toLowerCase()}`)}`;
}
var bd = 8,
	wM = 2e3;
function EM(e) {
	const { client: n } = e,
		a = n.context.userId,
		u = dM(n),
		[s, o] = (0, T.useState)([]),
		[f, h] = (0, T.useState)([]),
		[m, g] = (0, T.useState)({}),
		[y, S] = (0, T.useState)(!1),
		[b, p] = (0, T.useState)(null),
		[E, x] = (0, T.useState)(!1),
		[D, z] = (0, T.useState)(null),
		[R, A] = (0, T.useState)([]),
		[C, M] = (0, T.useState)(!1),
		[G, $] = (0, T.useState)({}),
		[q, B] = (0, T.useState)(null),
		[ne, P] = (0, T.useState)(null),
		[le, te] = (0, T.useState)(null),
		[X, ue] = (0, T.useState)(!1),
		[O, U] = (0, T.useState)(null),
		[V, re] = (0, T.useState)(!1),
		[de, Ce] = (0, T.useState)(null),
		[N, Y] = (0, T.useState)(!1),
		[ie, se] = (0, T.useState)({ sequence: 0, text: "" }),
		[ge, ye] = (0, T.useState)(""),
		[we, Ze] = (0, T.useState)(!1),
		Oe = (0, T.useRef)(null),
		lt = (0, T.useRef)(null),
		jt = (0, T.useRef)(null),
		$t = (0, T.useRef)(null),
		Yt = (0, T.useRef)(null),
		it = (0, T.useRef)(null),
		ce = (0, T.useRef)(null),
		Ee = [...s, ...Object.values(m).flat()].sort((F, oe) => F.value.name.localeCompare(oe.value.name)),
		Le = new Map(
			Object.values(G)
				.flat()
				.map((F) => [F.channelKey, F]),
		),
		je = (0, T.useMemo)(() => hR({ docs: R, cursorChannels: D?.value.channels ?? {}, selfUserId: a }), [R, D, a]),
		kt = (F) => {
			if (F.key === q || F.value.archivedAt !== null) return !1;
			if (ei(F.key)) {
				const oe = F.value.lastMessageAt;
				return oe !== void 0 && oe > (Le.get(F.key)?.at ?? 0);
			}
			return je.has(F.key);
		},
		st = (F) => (ei(F.key) ? (Le.get(F.key)?.at ?? 0) : (D?.value.channels[F.key] ?? 0)),
		Xt = (F) => (F.key === q || F.value.archivedAt !== null ? 0 : (je.get(F.key)?.mentionCount ?? 0)),
		Yn = (0, T.useId)(),
		Bi = (0, T.useId)(),
		vt = (0, T.useCallback)((F) => {
			se((oe) => ({ sequence: oe.sequence + 1, text: F }));
		}, []);
	((0, T.useEffect)(() => {
		if (ie.text === "") return;
		ye("");
		const F = requestAnimationFrame(() => ye(ie.text));
		return () => cancelAnimationFrame(F);
	}, [ie]),
		(0, T.useEffect)(() => {
			const F = window.matchMedia("(max-width: 719px)");
			Ze(F.matches);
			const oe = (Te) => Ze(Te.matches);
			return (F.addEventListener("change", oe), () => F.removeEventListener("change", oe));
		}, []),
		(0, T.useEffect)(() => {
			const F = (Te) => {
					const _e = document.documentElement;
					_e.classList.toggle("theme-light", Te.mode === "light");
					for (const [ot, ct] of Object.entries(Te.tokens)) _e.style.setProperty(SM(ot), ct);
				},
				oe = n.theme.current();
			return (oe !== null && F(oe), n.theme.subscribe(F));
		}, [n]),
		(0, T.useEffect)(() => {
			const F = Fr(bp);
			return n.data.watch({ collection: "channels", limit: 100 }, (oe, Te) => {
				if (oe === null) {
					p({ ...(Te?.reason === void 0 ? {} : { reason: Te.reason }) });
					return;
				}
				(o(F.apply_window(oe.docs)), S(!0), x(oe.truncated));
			});
		}, [n]),
		(0, T.useEffect)(
			() =>
				n.scopes.watchMine((F) => {
					h(F ?? []);
				}),
			[n],
		),
		(0, T.useEffect)(() => {
			const F = f.slice(0, bd).map((oe) => {
				const Te = Fr(bp);
				return n.data.watch({ collection: "channels", keyPrefix: oe.keyPrefix, limit: 100 }, (_e) => {
					const ot =
						_e === null
							? []
							: _e.docs.filter((ct) => {
									const en = ct.key;
									return !(typeof en == "string" && tb(en) !== null);
								});
					(g((ct) => {
						if (_e === null) {
							const { [oe.scopeId]: en, ...St } = ct;
							return St;
						}
						return { ...ct, [oe.scopeId]: Te.apply_window(ot) };
					}),
						$((ct) => {
							if (_e === null) {
								const { [oe.scopeId]: St, ...Zi } = ct;
								return Zi;
							}
							const en = _e.docs.map(dR).filter((St) => St !== null && St.createdBy === a);
							return { ...ct, [oe.scopeId]: en };
						}));
				});
			});
			return () => {
				for (const oe of F) oe();
			};
		}, [n, f, a]),
		(0, T.useEffect)(
			() =>
				n.data.watch({ collection: "cursors", keyPrefix: pp(a), limit: 1 }, (F) => {
					if (F === null) {
						(z(null), ($t.current = null));
						return;
					}
					const oe = F.docs.map(fR).find((Te) => Te !== null) ?? null;
					(z(oe), ($t.current = oe));
				}),
			[n, a],
		),
		(0, T.useEffect)(() => {
			const F = Fr(vl);
			return n.data.watchRecent({ collection: "messages", limit: 100, order: "desc" }, (oe) => {
				if (oe === null) {
					(M(!0), A([]));
					return;
				}
				(M(!1), A(F.apply_window(oe.docs)));
			});
		}, [n]),
		(0, T.useEffect)(() => {
			if (q === null) {
				const F = Ee.find((oe) => oe.value.archivedAt === null);
				F !== void 0 && B((oe) => oe ?? F.key);
			}
		}, [Ee, q]),
		(0, T.useEffect)(() => {
			N && Oe.current?.focus();
		}, [N]));
	const wa = () => window.matchMedia("(max-width: 719px)").matches,
		Ea = (F, oe) => {
			const Te = $t.current,
				_e = Te?.value.channels ?? {};
			if ((_e[F] ?? 0) >= oe) return;
			const ot = { channels: { ..._e, [F]: oe } },
				ct = Te?.revision ?? 0,
				en = (St, Zi) => {
					const Gn = Date.now(),
						wt = {
							key: pp(a),
							value: Zi,
							revision: St,
							createdBy: a,
							updatedBy: a,
							createdAt: Te?.createdAt ?? Gn,
							updatedAt: Gn,
							timestamp: Te?.timestamp ?? Gn,
						};
					(($t.current = wt), z(wt));
				};
			n.data
				.putOwned({ collection: "cursors", key: "me", value: ot, expectedRevision: ct })
				.then((St) => {
					if ("_yay" in St) {
						en(St._yay.revision, ot);
						return;
					}
					if (St._nay.name === "conflict") {
						const wt = $t.current;
						if (wt !== null && wt.revision !== ct) {
							const hu = _p(wt.value, ot);
							n.data
								.putOwned({ collection: "cursors", key: "me", value: hu, expectedRevision: wt.revision })
								.then((mu) => {
									"_yay" in mu && en(mu._yay.revision, hu);
								})
								.catch(() => {});
							return;
						}
						Yt.current = { channels: ot.channels, attemptedRevision: ct };
						return;
					}
					const Zi = new Set(Ee.map((wt) => wt.key)),
						Gn = Object.fromEntries(Object.entries(ot.channels).filter(([wt]) => wt === F || Zi.has(wt)));
					if (Object.keys(Gn).length === Object.keys(ot.channels).length) {
						console.warn("[chitchat] A read-cursor write was refused", { message: St._nay.message });
						return;
					}
					n.data
						.putOwned({ collection: "cursors", key: "me", value: { channels: Gn }, expectedRevision: ct })
						.then((wt) => {
							"_yay" in wt
								? en(wt._yay.revision, { channels: Gn })
								: console.warn("[chitchat] A read-cursor write was refused", { message: wt._nay.message });
						})
						.catch(() => {});
				})
				.catch((St) => {
					console.warn("[chitchat] A read-cursor write failed", { message: Vn(St) });
				});
		},
		tr = (F, oe) => {
			const Te = Le.get(F.key);
			(Te?.at ?? 0) >= oe ||
				n.data
					.putOwned({ collection: "channels", key: iR(F.key), value: { at: oe }, expectedRevision: Te?.revision ?? 0 })
					.then((_e) => {
						"_nay" in _e &&
							_e._nay.name !== "conflict" &&
							console.warn("[chitchat] A private read-cursor write was refused", { message: _e._nay.message });
					})
					.catch((_e) => {
						console.warn("[chitchat] A private read-cursor write failed", { message: Vn(_e) });
					});
		},
		wn = (F, oe) => {
			ei(F.key) ? tr(F, oe) : Ea(F.key, oe);
		},
		du = (F, oe) => {
			const Te = ce.current;
			((ce.current =
				Te !== null && Te.channel.key === F.key ? { channel: F, at: Math.max(Te.at, oe) } : { channel: F, at: oe }),
				it.current === null &&
					(it.current = setTimeout(() => {
						it.current = null;
						const _e = ce.current;
						((ce.current = null), _e !== null && wn(_e.channel, _e.at));
					}, wM)));
		},
		ri = (F) => {
			(B(F.key),
				te(null),
				kt(F) || Xt(F) > 0 ? (P(st(F)), wn(F, Date.now())) : P(null),
				vt(`#${F.value.name}`),
				N && wa() && (Y(!1), lt.current?.focus()));
		},
		nr = (F) => {
			(B(F.key), te(null), vt(F.name), N && wa() && (Y(!1), lt.current?.focus()));
		},
		ae = (F, oe) => {
			(ri(F), te(oe));
		};
	((0, T.useEffect)(() => {
		const F = Yt.current;
		if (F === null || D === null || D.revision === F.attemptedRevision) return;
		Yt.current = null;
		const oe = _p(D.value, { channels: F.channels });
		n.data
			.putOwned({ collection: "cursors", key: "me", value: oe, expectedRevision: D.revision })
			.then((Te) => {
				"_nay" in Te &&
					Te._nay.name !== "conflict" &&
					console.warn("[chitchat] The read-cursor retry was refused", { message: Te._nay.message });
			})
			.catch(() => {});
	}, [D, n]),
		(0, T.useEffect)(
			() => () => {
				it.current !== null && clearTimeout(it.current);
			},
			[],
		));
	const me = () => {
			(U(null), re(!1), Ce(null));
		},
		be = (F, oe, Te) => {
			(re(!0), Ce(null));
			const _e = tR(Te.isPrivate ? "private" : "public");
			(async () => {
				if (Te.isPrivate) {
					const ct = await n.scopes.create({ scopeId: _e, collections: eR, keyPrefix: _e });
					if ("_nay" in ct) {
						(re(!1), Ce(ct._nay.message));
						return;
					}
					for (const en of Te.userIds) {
						const St = await n.scopes.setPrincipal({ scopeId: _e, userId: en, level: "member" });
						if ("_nay" in St) {
							(re(!1), Ce(St._nay.message));
							return;
						}
					}
				}
				const ot = await n.data.put({
					collection: "channels",
					key: _e,
					value: { name: F, archivedAt: null, ...(oe === "" ? {} : { topic: oe }) },
				});
				if ("_nay" in ot) {
					(re(!1), Ce(ot._nay.message));
					return;
				}
				(B(_e), P(null), me());
			})().catch((ot) => {
				(re(!1), Ce(Vn(ot)));
			});
		},
		pt = (F, oe) => {
			(re(!0),
				Ce(null),
				n.data
					.put({ collection: "channels", key: F.key, value: oe, expectedRevision: F.revision })
					.then((Te) => {
						if ("_nay" in Te) {
							(re(!1),
								Ce(
									Te._nay.name === "conflict"
										? "Someone else changed this channel while the dialog was open. Close it and try again."
										: Te._nay.message,
								));
							return;
						}
						me();
					})
					.catch((Te) => {
						(re(!1), Ce(Vn(Te)));
					}));
		},
		qe = (F) => {
			n.data
				.put({
					collection: "channels",
					key: F.key,
					value: { ...F.value, archivedAt: null },
					expectedRevision: F.revision,
				})
				.then((oe) => {
					"_nay" in oe && vt(oe._nay.message);
				})
				.catch((oe) => {
					vt(Vn(oe));
				});
		};
	if (b !== null)
		return (0, _.jsx)("div", {
			className: "chitchat",
			children: (0, _.jsxs)("div", {
				className: "page-dead",
				role: "alert",
				children: [(0, _.jsx)("h1", { children: "Chitchat" }), (0, _.jsx)("p", { children: _M(b.reason) })],
			}),
		});
	const Lt = (F, oe) => F.value.name.localeCompare(oe.value.name),
		Gt = Ee.filter((F) => F.value.archivedAt === null).sort(Lt),
		Ii = Ee.filter((F) => F.value.archivedAt !== null).sort(Lt),
		et = Ee.find((F) => F.key === q) ?? null,
		En = Gt.filter(kt).length,
		Tn = Gt.reduce((F, oe) => F + Xt(oe), 0),
		dn = Math.max(0, f.length - bd),
		Ta = (F, oe, Te) =>
			oe.length === 0
				? null
				: (0, _.jsxs)("div", {
						className: "channel-section",
						children: [
							(0, _.jsx)("h2", { id: Te, className: "channel-section-title", children: F }),
							(0, _.jsx)("ul", {
								className: "channel-list",
								"aria-labelledby": Te,
								children: oe.map((_e) => {
									const ot = kt(_e),
										ct = Xt(_e);
									return (0, _.jsxs)(
										"li",
										{
											className: "channel-item",
											children: [
												(0, _.jsxs)("button", {
													type: "button",
													className: ot || ct > 0 ? "channel-link is-unread" : "channel-link",
													"aria-current": _e.key === q ? "page" : void 0,
													onClick: () => ri(_e),
													children: [
														(0, _.jsx)("span", {
															className: "channel-initial",
															"aria-hidden": "true",
															children: _e.value.name.slice(0, 1).toUpperCase(),
														}),
														(0, _.jsxs)("span", {
															className: "channel-name",
															children: [
																"#",
																_e.value.name,
																ei(_e.key) ? " (private)" : "",
																_e.value.archivedAt !== null ? " (archived)" : "",
															],
														}),
														ct > 0
															? (0, _.jsxs)("span", {
																	className: "mention-badge",
																	children: [
																		ct,
																		(0, _.jsx)("span", { className: "visually-hidden", children: " unread mentions" }),
																	],
																})
															: ot
																? (0, _.jsxs)(_.Fragment, {
																		children: [
																			(0, _.jsx)("span", { className: "unread-dot", "aria-hidden": "true" }),
																			(0, _.jsx)("span", { className: "visually-hidden", children: "unread" }),
																		],
																	})
																: null,
													],
												}),
												(0, _.jsx)("span", {
													className: "channel-item-actions",
													children: (0, _.jsx)(cM, {
														channelName: _e.value.name,
														items: [
															...(ei(_e.key)
																? [
																		{
																			id: "people",
																			label: `People in #${_e.value.name}`,
																			onSelect: () => U({ kind: "people", channel: _e }),
																		},
																	]
																: []),
															{
																id: "rename",
																label: `Rename #${_e.value.name}`,
																onSelect: () => U({ kind: "rename", channel: _e }),
															},
															_e.value.archivedAt === null
																? {
																		id: "archive",
																		label: `Archive #${_e.value.name}`,
																		onSelect: () => U({ kind: "archive", channel: _e }),
																	}
																: { id: "unarchive", label: `Unarchive #${_e.value.name}`, onSelect: () => qe(_e) },
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
	return (0, _.jsxs)("div", {
		className: le === null ? "chitchat" : "chitchat has-thread",
		children: [
			(0, _.jsxs)("header", {
				className: "app-bar",
				children: [
					(0, _.jsx)("h1", { className: "visually-hidden", children: "Chitchat" }),
					(0, _.jsx)("button", {
						ref: lt,
						type: "button",
						className: "button drawer-toggle",
						"aria-expanded": N,
						onClick: () => Y((F) => !F),
						children: "Channels",
					}),
				],
			}),
			(0, _.jsx)("nav", {
				ref: Oe,
				className: `sidebar${N ? " is-open" : ""}${X ? " is-expanded" : ""}`,
				"aria-label": "Channels",
				tabIndex: -1,
				children: (0, _.jsxs)("div", {
					className: "sidebar-inner",
					inert: we && !N ? !0 : void 0,
					children: [
						(0, _.jsxs)("div", {
							className: "sidebar-head",
							children: [
								(0, _.jsx)("p", { className: "sidebar-title", children: "Chitchat" }),
								(0, _.jsx)("button", {
									ref: jt,
									type: "button",
									className: "button sidebar-expand",
									"aria-expanded": X,
									"aria-label": X ? "Collapse channel rail" : "Expand channel rail",
									onClick: () => ue((F) => !F),
									children: X ? "«" : "»",
								}),
								(0, _.jsx)("button", {
									type: "button",
									className: "button sidebar-create",
									onClick: () => U({ kind: "create" }),
									children: "Create channel",
								}),
							],
						}),
						E
							? (0, _.jsx)("div", {
									className: "channel-status",
									role: "status",
									children: "Only the first 100 channels are shown.",
								})
							: null,
						dn > 0
							? (0, _.jsx)("div", {
									className: "channel-status",
									role: "status",
									children: `This page can watch ${bd} private channels at a time; ${dn} more ${dn === 1 ? "is" : "are"} hidden.`,
								})
							: null,
						(0, _.jsx)("ul", {
							className: "view-list",
							"aria-label": "Views",
							children: gM.map((F) =>
								(0, _.jsx)(
									"li",
									{
										className: "view-item",
										children: (0, _.jsxs)("button", {
											type: "button",
											className:
												F.key === "view:unreads" && (En > 0 || Tn > 0)
													? "channel-link view-link is-unread"
													: "channel-link view-link",
											"aria-current": q === F.key ? "page" : void 0,
											onClick: () => nr(F),
											children: [
												(0, _.jsx)("span", {
													className: "channel-initial",
													"aria-hidden": "true",
													children: F.name.slice(0, 1),
												}),
												(0, _.jsx)("span", { className: "channel-name", children: F.name }),
												F.key === "view:unreads" && Tn > 0
													? (0, _.jsxs)("span", {
															className: "mention-badge",
															children: [
																Tn,
																(0, _.jsx)("span", { className: "visually-hidden", children: " mentions of you" }),
															],
														})
													: F.key === "view:unreads" && En > 0
														? (0, _.jsxs)(_.Fragment, {
																children: [
																	(0, _.jsx)("span", { className: "unread-dot", "aria-hidden": "true" }),
																	(0, _.jsx)("span", { className: "visually-hidden", children: "unread" }),
																],
															})
														: null,
											],
										}),
									},
									F.key,
								),
							),
						}),
						y
							? Ee.length === 0
								? (0, _.jsx)("div", { className: "channel-status", children: "No channels yet" })
								: (0, _.jsxs)(_.Fragment, { children: [Ta("Channels", Gt, Yn), Ta("Archived", Ii, Bi)] })
							: (0, _.jsx)("div", { className: "channel-status", role: "status", children: "Loading channels…" }),
					],
				}),
			}),
			(0, _.jsx)("main", {
				className: "main",
				children:
					q === "view:unreads"
						? (0, _.jsx)(yM, {
								channels: Gt,
								publicUnreads: je,
								privateCursors: Le,
								recentDead: C,
								memberNames: u,
								onSelectChannel: ri,
							})
						: q === "view:threads"
							? (0, _.jsx)(bM, { client: n, channels: Gt, memberNames: u, onOpenThread: ae })
							: q === "view:activity"
								? (0, _.jsx)(pM, {
										feed: R,
										channels: Gt,
										selfUserId: a,
										recentDead: C,
										memberNames: u,
										onSelectChannel: ri,
									})
								: et !== null
									? (0, _.jsx)(
											GR,
											{
												client: n,
												userId: a,
												channel: et,
												memberNames: u,
												announce: vt,
												threadRootKey: le,
												setThreadRootKey: te,
												isNarrow: we,
												onNewestVisible: (F) => du(et, F),
												openedAtLastReadAt: ne,
											},
											et.key,
										)
									: y
										? Ee.length === 0
											? (0, _.jsx)("div", {
													className: "channel-status",
													children: (0, _.jsx)("span", { children: "No channels yet — create the first one." }),
												})
											: (0, _.jsx)("div", { className: "channel-status", children: "Select a channel." })
										: (0, _.jsx)("div", { className: "channel-status", role: "status", children: "Loading channels…" }),
			}),
			O !== null && O.kind === "create"
				? (0, _.jsx)(l0, {
						title: "Create channel",
						submitLabel: "Create",
						initialName: "",
						initialTopic: "",
						privacy: { client: n, selfUserId: a },
						busy: V,
						error: de,
						onSubmit: be,
						onClose: me,
					})
				: null,
			O !== null && O.kind === "people"
				? (0, _.jsx)(mM, { client: n, channel: O.channel, selfUserId: a, memberNames: u, onClose: me })
				: null,
			O !== null && O.kind === "rename"
				? (0, _.jsx)(l0, {
						title: `Rename #${O.channel.value.name}`,
						submitLabel: "Rename",
						initialName: O.channel.value.name,
						initialTopic: O.channel.value.topic ?? "",
						privacy: null,
						busy: V,
						error: de,
						onSubmit: (F, oe) =>
							pt(O.channel, { ...O.channel.value, name: F, ...(oe === "" ? { topic: void 0 } : { topic: oe }) }),
						onClose: me,
					})
				: null,
			O !== null && O.kind === "archive"
				? (0, _.jsx)(vM, {
						channelName: O.channel.value.name,
						busy: V,
						error: de,
						onConfirm: () => pt(O.channel, { ...O.channel.value, archivedAt: Date.now() }),
						onClose: me,
					})
				: null,
			(0, _.jsxs)("div", {
				className: "chitchat-announcer visually-hidden",
				role: "status",
				"aria-live": "polite",
				children: [(0, _.jsx)("span", { "data-announcement-sequence": String(ie.sequence) }), ge],
			}),
		],
	});
}
function y_(e) {
	return (0, _.jsx)("div", {
		className: e.isError ? "boot-screen is-error" : "boot-screen",
		role: e.isError ? "alert" : "status",
		"aria-live": e.isError ? void 0 : "polite",
		children: e.message,
	});
}
var p_ = document.getElementById("root");
if (!p_) throw new Error("index.html is missing the #root element");
var Zd = (0, FC.createRoot)(p_);
Zd.render((0, _.jsx)(y_, { message: "Connecting…" }));
lE().then(
	(e) => {
		(e.context.kind === "page" && (document.title = e.context.pageTitle), Zd.render((0, _.jsx)(EM, { client: e })));
	},
	(e) => {
		Zd.render((0, _.jsx)(y_, { message: e instanceof Error ? e.message : String(e), isError: !0 }));
	},
);
