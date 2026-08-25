var Yw = Object.create,
	xp = Object.defineProperty,
	Gw = Object.getOwnPropertyDescriptor,
	Fw = Object.getOwnPropertyNames,
	Xw = Object.getPrototypeOf,
	Jw = Object.prototype.hasOwnProperty,
	Qn = (e, n) => () => (n || (e((n = { exports: {} }).exports, n), (e = null)), n.exports),
	Ww = (e, n, r, u) => {
		if ((n && typeof n == "object") || typeof n == "function")
			for (var s = Fw(n), o = 0, f = s.length, h; o < f; o++)
				((h = s[o]),
					!Jw.call(e, h) &&
						h !== r &&
						xp(e, h, { get: ((m) => n[m]).bind(null, h), enumerable: !(u = Gw(n, h)) || u.enumerable }));
		return e;
	},
	Ap = (e, n, r) => (
		(r = e != null ? Yw(Xw(e)) : {}),
		Ww(n || !e || !e.__esModule ? xp(r, "default", { value: e, enumerable: !0 }) : r, e)
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
var qy = "1.44.0",
	ui = [],
	Hn = [],
	e1 = Uint8Array,
	cd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Ha = 0, t1 = cd.length; Ha < t1; ++Ha) ((ui[Ha] = cd[Ha]), (Hn[cd.charCodeAt(Ha)] = Ha));
Hn[45] = 62;
Hn[95] = 63;
function n1(e) {
	var n = e.length;
	if (n % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
	var r = e.indexOf("=");
	r === -1 && (r = n);
	var u = r === n ? 0 : 4 - (r % 4);
	return [r, u];
}
function i1(e, n, r) {
	return ((n + r) * 3) / 4 - r;
}
function vl(e) {
	var n,
		r = n1(e),
		u = r[0],
		s = r[1],
		o = new e1(i1(e, u, s)),
		f = 0,
		h = s > 0 ? u - 4 : u,
		m;
	for (m = 0; m < h; m += 4)
		((n =
			(Hn[e.charCodeAt(m)] << 18) |
			(Hn[e.charCodeAt(m + 1)] << 12) |
			(Hn[e.charCodeAt(m + 2)] << 6) |
			Hn[e.charCodeAt(m + 3)]),
			(o[f++] = (n >> 16) & 255),
			(o[f++] = (n >> 8) & 255),
			(o[f++] = n & 255));
	return (
		s === 2 && ((n = (Hn[e.charCodeAt(m)] << 2) | (Hn[e.charCodeAt(m + 1)] >> 4)), (o[f++] = n & 255)),
		s === 1 &&
			((n = (Hn[e.charCodeAt(m)] << 10) | (Hn[e.charCodeAt(m + 1)] << 4) | (Hn[e.charCodeAt(m + 2)] >> 2)),
			(o[f++] = (n >> 8) & 255),
			(o[f++] = n & 255)),
		o
	);
}
function r1(e) {
	return ui[(e >> 18) & 63] + ui[(e >> 12) & 63] + ui[(e >> 6) & 63] + ui[e & 63];
}
function a1(e, n, r) {
	for (var u, s = [], o = n; o < r; o += 3)
		((u = ((e[o] << 16) & 16711680) + ((e[o + 1] << 8) & 65280) + (e[o + 2] & 255)), s.push(r1(u)));
	return s.join("");
}
function gl(e) {
	for (var n, r = e.length, u = r % 3, s = [], o = 16383, f = 0, h = r - u; f < h; f += o)
		s.push(a1(e, f, f + o > h ? h : f + o));
	return (
		u === 1
			? ((n = e[r - 1]), s.push(ui[n >> 2] + ui[(n << 4) & 63] + "=="))
			: u === 2 &&
				((n = (e[r - 2] << 8) + e[r - 1]), s.push(ui[n >> 10] + ui[(n >> 4) & 63] + ui[(n << 2) & 63] + "=")),
		s.join("")
	);
}
function gr(e) {
	if (e === void 0) return {};
	if (!Rp(e)) throw new Error(`The arguments to a Convex function must be an object. Received: ${e}`);
	return e;
}
function Cp(e) {
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
function Rp(e) {
	const n = typeof e == "object",
		r = Object.getPrototypeOf(e),
		u = r === null || r === Object.prototype || r?.constructor?.name === "Object";
	return n && u;
}
var Op = !0,
	iu = BigInt("-9223372036854775808"),
	rh = BigInt("9223372036854775807"),
	Dd = BigInt("0"),
	u1 = BigInt("8"),
	l1 = BigInt("256"),
	fd =
		"This commit timestamp is unresolved: its value is assigned when the mutation commits. Read the document after the mutation completes to get its value.",
	Np = class {
		[Symbol.toPrimitive](e) {
			if (e === "string") return this.toString();
			throw new Error(fd);
		}
		valueOf() {
			throw new Error(fd);
		}
		toJSON() {
			throw new Error(fd);
		}
		toString() {
			return "[unresolved commit timestamp]";
		}
	},
	s1 = new Np();
function kp(e) {
	return Number.isNaN(e) || !Number.isFinite(e) || Object.is(e, -0);
}
function o1(e) {
	e < Dd && (e -= iu + iu);
	let n = e.toString(16);
	n.length % 2 === 1 && (n = "0" + n);
	const r = new Uint8Array(new ArrayBuffer(8));
	let u = 0;
	for (const s of n.match(/.{2}/g).reverse()) (r.set([parseInt(s, 16)], u++), (e >>= u1));
	return gl(r);
}
function c1(e) {
	const n = vl(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	let r = Dd,
		u = Dd;
	for (const s of n) ((r += BigInt(s) * l1 ** u), u++);
	return (r > rh && (r += iu + iu), r);
}
function f1(e) {
	if (e < iu || rh < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
	const n = new ArrayBuffer(8);
	return (new DataView(n).setBigInt64(0, e, !0), gl(new Uint8Array(n)));
}
function d1(e) {
	const n = vl(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	return new DataView(n.buffer).getBigInt64(0, !0);
}
var h1 = DataView.prototype.setBigInt64 ? f1 : o1,
	m1 = DataView.prototype.getBigInt64 ? d1 : c1,
	Uy = 1024;
function jd(e) {
	if (e.length > Uy) throw new Error(`Field name ${e} exceeds maximum field name length ${Uy}.`);
	if (e.startsWith("$")) throw new Error(`Field name ${e} starts with a '$', which is reserved.`);
	for (let n = 0; n < e.length; n += 1) {
		const r = e.charCodeAt(n);
		if (r < 32 || r >= 127)
			throw new Error(
				`Field name ${e} has invalid character '${e[n]}': Field names can only contain non-control ASCII characters`,
			);
	}
}
function ru(e) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return e;
	if (Array.isArray(e)) return e.map((u) => ru(u));
	if (typeof e != "object") throw new Error(`Unexpected type of ${e}`);
	const n = Object.entries(e);
	if (n.length === 1) {
		const u = n[0][0];
		if (u === "$bytes") {
			if (typeof e.$bytes != "string") throw new Error(`Malformed $bytes field on ${e}`);
			return vl(e.$bytes).buffer;
		}
		if (u === "$integer") {
			if (typeof e.$integer != "string") throw new Error(`Malformed $integer field on ${e}`);
			return m1(e.$integer);
		}
		if (u === "$float") {
			if (typeof e.$float != "string") throw new Error(`Malformed $float field on ${e}`);
			const s = vl(e.$float);
			if (s.byteLength !== 8) throw new Error(`Received ${s.byteLength} bytes, expected 8 for $float`);
			const o = new DataView(s.buffer).getFloat64(0, Op);
			if (!kp(o)) throw new Error(`Float ${o} should be encoded as a number`);
			return o;
		}
		if (u === "$commitTs") {
			if (e.$commitTs !== null) throw new Error(`Malformed $commitTs field on ${e}`);
			return s1;
		}
		if (u === "$set") throw new Error("Received a Set which is no longer supported as a Convex type.");
		if (u === "$map") throw new Error("Received a Map which is no longer supported as a Convex type.");
	}
	const r = {};
	for (const [u, s] of Object.entries(e)) (jd(u), (r[u] = ru(s)));
	return r;
}
var $y = 16384;
function Ja(e) {
	const n = JSON.stringify(e, (r, u) => (u === void 0 ? "undefined" : typeof u == "bigint" ? `${u.toString()}n` : u));
	if (n.length > $y) {
		const r = "[...truncated]";
		let u = $y - 14;
		const s = n.codePointAt(u - 1);
		return (s !== void 0 && s > 65535 && (u -= 1), n.substring(0, u) + r);
	}
	return n;
}
function fo(e, n, r, u) {
	if (e === void 0) {
		const f = r && ` (present at path ${r} in original object ${Ja(n)})`;
		throw new Error(
			`undefined is not a valid Convex value${f}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`,
		);
	}
	if (e === null) return e;
	if (typeof e == "bigint") {
		if (e < iu || rh < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
		return { $integer: h1(e) };
	}
	if (typeof e == "number")
		if (kp(e)) {
			const f = new ArrayBuffer(8);
			return (new DataView(f).setFloat64(0, e, Op), { $float: gl(new Uint8Array(f)) });
		} else return e;
	if (typeof e == "boolean" || typeof e == "string") return e;
	if (e instanceof ArrayBuffer) return { $bytes: gl(new Uint8Array(e)) };
	if (e instanceof Np) return { $commitTs: null };
	if (Array.isArray(e)) return e.map((f, h) => fo(f, n, r + `[${h}]`, !1));
	if (e instanceof Set) throw new Error(dd(r, "Set", [...e], n));
	if (e instanceof Map) throw new Error(dd(r, "Map", [...e], n));
	if (!Rp(e)) {
		const f = e?.constructor?.name,
			h = f ? `${f} ` : "";
		throw new Error(dd(r, h, e, n));
	}
	const s = {},
		o = Object.entries(e);
	o.sort(([f, h], [m, v]) => (f === m ? 0 : f < m ? -1 : 1));
	for (const [f, h] of o)
		h !== void 0 ? (jd(f), (s[f] = fo(h, n, r + `.${f}`, !1))) : u && (jd(f), (s[f] = v1(h, n, r + `.${f}`)));
	return s;
}
function dd(e, n, r, u) {
	return e
		? `${n}${Ja(r)} is not a supported Convex type (present at path ${e} in original object ${Ja(u)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
		: `${n}${Ja(r)} is not a supported Convex type.`;
}
function v1(e, n, r) {
	if (e === void 0) return { $undefined: null };
	if (n === void 0) throw new Error(`Programming error. Current value is ${Ja(e)} but original value is undefined`);
	return fo(e, n, r, !1);
}
function Fr(e) {
	return fo(e, e, "", !1);
}
var g1 = Object.defineProperty,
	y1 = (e, n, r) => (n in e ? g1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	hd = (e, n, r) => y1(e, typeof n != "symbol" ? n + "" : n, r),
	By,
	Iy,
	p1 = Symbol.for("ConvexError"),
	Ld = class extends ((Iy = Error), (By = p1), Iy) {
		constructor(e) {
			(super(typeof e == "string" ? e : Ja(e)),
				hd(this, "name", "ConvexError"),
				hd(this, "data"),
				hd(this, By, !0),
				(this.data = e));
		}
	},
	b1 = Object.defineProperty,
	S1 = (e, n, r) => (n in e ? b1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Vy = (e, n, r) => S1(e, typeof n != "symbol" ? n + "" : n, r),
	_1 = "color:rgb(0, 145, 255)";
function Mp(e) {
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
var zp = class {
	constructor(e) {
		(Vy(this, "_onLogLineFuncs"), Vy(this, "_verbose"), (this._onLogLineFuncs = {}), (this._verbose = e.verbose));
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
function w1(e) {
	const n = new zp(e);
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
function E1(e) {
	return new zp(e);
}
function ho(e, n, r, u, s) {
	const o = Mp(r);
	if ((typeof s == "object" && (s = `ConvexError ${JSON.stringify(s.errorData, null, 2)}`), n === "info")) {
		const f = s.match(/^\[.*?\] /);
		if (f === null) {
			e.error(`[CONVEX ${o}(${u})] Could not parse console.log`);
			return;
		}
		const h = s.slice(1, f[0].length - 2),
			m = s.slice(f[0].length);
		e.log(`%c[CONVEX ${o}(${u})] [${h}]`, _1, m);
	} else e.error(`[CONVEX ${o}(${u})] ${s}`);
}
function T1(e, n) {
	const r = `[CONVEX FATAL ERROR] ${n}`;
	return (e.error(r), new Error(r));
}
function Ya(e, n, r) {
	return `[CONVEX ${Mp(e)}(${n})] ${r.errorMessage}
  Called by client`;
}
function qd(e, n) {
	return ((n.data = e.errorData), n);
}
function Xr(e) {
	const n = e.split(":");
	let r, u;
	return (
		n.length === 1 ? ((r = n[0]), (u = "default")) : ((r = n.slice(0, n.length - 1).join(":")), (u = n[n.length - 1])),
		r.endsWith(".js") && (r = r.slice(0, -3)),
		`${r}:${u}`
	);
}
function Gr(e, n) {
	return JSON.stringify({ udfPath: Xr(e), args: Fr(n) });
}
function Zy(e, n, r) {
	const { initialNumItems: u, id: s } = r;
	return JSON.stringify({ type: "paginated", udfPath: Xr(e), args: Fr(n), options: Fr({ initialNumItems: u, id: s }) });
}
function x1(e) {
	return JSON.parse(e).type === "paginated";
}
var A1 = Object.defineProperty,
	C1 = (e, n, r) => (n in e ? A1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	ai = (e, n, r) => C1(e, typeof n != "symbol" ? n + "" : n, r),
	R1 = class {
		constructor() {
			(ai(this, "nextQueryId"),
				ai(this, "querySetVersion"),
				ai(this, "querySet"),
				ai(this, "queryIdToToken"),
				ai(this, "identityVersion"),
				ai(this, "auth"),
				ai(this, "outstandingQueriesOlderThanRestart"),
				ai(this, "outstandingAuthOlderThanRestart"),
				ai(this, "paused"),
				ai(this, "pendingQuerySetModifications"),
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
			const s = Xr(e),
				o = Gr(s, n),
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
					_ = { type: "Add", queryId: h, udfPath: s, args: [Fr(n)], journal: r, componentPath: u };
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
			const r = Gr(Xr(e), n),
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
					args: [Fr(u.args)],
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
	O1 = Object.defineProperty,
	N1 = (e, n, r) => (n in e ? O1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Xs = (e, n, r) => N1(e, typeof n != "symbol" ? n + "" : n, r),
	k1 = class {
		constructor(e, n) {
			((this.logger = e),
				(this.markConnectionStateDirty = n),
				Xs(this, "inflightRequests"),
				Xs(this, "requestsOlderThanRestart"),
				Xs(this, "inflightMutationsCount", 0),
				Xs(this, "inflightActionsCount", 0),
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
			for (const h of e.logLines) ho(this.logger, "info", r, u, h);
			const s = n.status;
			let o, f;
			if (e.success) ((o = { success: !0, logLines: e.logLines, value: ru(e.result) }), (f = () => s.onResult(o)));
			else {
				const h = e.result,
					{ errorData: m } = e;
				(ho(this.logger, "error", r, u, h),
					(o = { success: !1, errorMessage: h, errorData: m !== void 0 ? ru(m) : void 0, logLines: e.logLines }),
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
	mo = Symbol.for("functionName"),
	M1 = Symbol.for("toReferencePath");
function z1(e) {
	return e[M1] ?? null;
}
function D1(e) {
	return e.startsWith("function://");
}
function j1(e) {
	let n;
	if (typeof e == "string") D1(e) ? (n = { functionHandle: e }) : (n = { name: e });
	else if (e[mo]) n = { name: e[mo] };
	else {
		const r = z1(e);
		if (!r) throw new Error(`${e} is not a functionReference`);
		n = { reference: r };
	}
	return n;
}
function ji(e) {
	const n = j1(e);
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
	const r = e[mo];
	if (!r) throw new Error(`${e} is not a functionReference`);
	return r;
}
function Dp(e = []) {
	return new Proxy(
		{},
		{
			get(n, r) {
				if (typeof r == "string") return Dp([...e, r]);
				if (r === mo) {
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
var Zn = Dp(),
	L1 = Object.defineProperty,
	q1 = (e, n, r) => (n in e ? L1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	vo = (e, n, r) => q1(e, typeof n != "symbol" ? n + "" : n, r),
	Hy = class Ud {
		constructor(n) {
			(vo(this, "queryResults"), vo(this, "modifiedQueries"), (this.queryResults = n), (this.modifiedQueries = []));
		}
		getQuery(n, ...r) {
			const u = gr(r[0]),
				s = ji(n),
				o = this.queryResults.get(Gr(s, u));
			if (o !== void 0) return Ud.queryValue(o.result);
		}
		getAllQueries(n) {
			const r = [],
				u = ji(n);
			for (const s of this.queryResults.values())
				s.udfPath === Xr(u) && r.push({ args: s.args, value: Ud.queryValue(s.result) });
			return r;
		}
		setQuery(n, r, u) {
			const s = gr(r),
				o = ji(n),
				f = Gr(o, s);
			let h;
			u === void 0 ? (h = void 0) : (h = { success: !0, value: u, logLines: [] });
			const m = { udfPath: o, args: s, result: h };
			(this.queryResults.set(f, m), this.modifiedQueries.push(f));
		}
		static queryValue(n) {
			if (n !== void 0) return n.success ? n.value : void 0;
		}
	},
	U1 = class {
		constructor() {
			(vo(this, "queryResults"),
				vo(this, "optimisticUpdates"),
				(this.queryResults = new Map()),
				(this.optimisticUpdates = []));
		}
		ingestQueryResultsFromServer(e, n) {
			this.optimisticUpdates = this.optimisticUpdates.filter((o) => !n.has(o.mutationId));
			const r = this.queryResults;
			this.queryResults = new Map(e);
			const u = new Hy(this.queryResults);
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
			const r = new Hy(this.queryResults);
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
				throw r.errorData !== void 0 ? qd(r, new Ld(Ya("query", n.udfPath, r))) : new Error(Ya("query", n.udfPath, r));
			}
		}
		hasQueryResult(e) {
			return this.queryResults.get(e) !== void 0;
		}
		queryLogs(e) {
			return this.queryResults.get(e)?.result?.logLines;
		}
	},
	$1 = Object.defineProperty,
	B1 = (e, n, r) => (n in e ? $1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	md = (e, n, r) => B1(e, typeof n != "symbol" ? n + "" : n, r),
	_l = class zi {
		constructor(n, r) {
			(md(this, "low"),
				md(this, "high"),
				md(this, "__isUnsignedLong__"),
				(this.low = n | 0),
				(this.high = r | 0),
				(this.__isUnsignedLong__ = !0));
		}
		static isLong(n) {
			return (n && n.__isUnsignedLong__) === !0;
		}
		static fromBytesLE(n) {
			return new zi(n[0] | (n[1] << 8) | (n[2] << 16) | (n[3] << 24), n[4] | (n[5] << 8) | (n[6] << 16) | (n[7] << 24));
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
			return isNaN(n) || n < 0 ? Py : n >= I1 ? V1 : new zi((n % dl) | 0, (n / dl) | 0);
		}
		toString() {
			return (BigInt(this.high) * BigInt(dl) + BigInt(this.low)).toString();
		}
		equals(n) {
			return (
				zi.isLong(n) || (n = zi.fromValue(n)),
				this.high >>> 31 === 1 && n.high >>> 31 === 1 ? !1 : this.high === n.high && this.low === n.low
			);
		}
		notEquals(n) {
			return !this.equals(n);
		}
		comp(n) {
			return (
				zi.isLong(n) || (n = zi.fromValue(n)),
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
			return typeof n == "number" ? zi.fromNumber(n) : new zi(n.low, n.high);
		}
	},
	Py = new _l(0, 0),
	Qy = 65536,
	dl = Qy * Qy,
	I1 = dl * dl,
	V1 = new _l(-1, -1),
	Z1 = Object.defineProperty,
	H1 = (e, n, r) => (n in e ? Z1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Js = (e, n, r) => H1(e, typeof n != "symbol" ? n + "" : n, r),
	Ky = class {
		constructor(e, n) {
			(Js(this, "version"),
				Js(this, "remoteQuerySet"),
				Js(this, "queryPath"),
				Js(this, "logger"),
				(this.version = { querySet: 0, ts: _l.fromNumber(0), identity: 0 }),
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
						if (u) for (const o of r.logLines) ho(this.logger, "info", "query", u, o);
						const s = ru(r.value ?? null);
						this.remoteQuerySet.set(r.queryId, { success: !0, value: s, logLines: r.logLines });
						break;
					}
					case "QueryFailed": {
						const u = this.queryPath(r.queryId);
						if (u) for (const o of r.logLines) ho(this.logger, "info", "query", u, o);
						const { errorData: s } = r;
						this.remoteQuerySet.set(r.queryId, {
							success: !1,
							errorMessage: r.errorMessage,
							errorData: s !== void 0 ? ru(s) : void 0,
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
function vd(e) {
	const n = vl(e);
	return _l.fromBytesLE(Array.from(n));
}
function P1(e) {
	const n = new Uint8Array(e.toBytesLE());
	return gl(n);
}
function Yy(e) {
	switch (e.type) {
		case "FatalError":
		case "AuthError":
		case "ActionResponse":
		case "TransitionChunk":
		case "Ping":
			return { ...e };
		case "MutationResponse":
			return e.success ? { ...e, ts: vd(e.ts) } : { ...e };
		case "Transition":
			return {
				...e,
				startVersion: { ...e.startVersion, ts: vd(e.startVersion.ts) },
				endVersion: { ...e.endVersion, ts: vd(e.endVersion.ts) },
			};
		default:
	}
}
function Q1(e) {
	switch (e.type) {
		case "Authenticate":
		case "ModifyQuerySet":
		case "Mutation":
		case "Action":
		case "Event":
			return { ...e };
		case "Connect":
			return e.maxObservedTimestamp !== void 0
				? { ...e, maxObservedTimestamp: P1(e.maxObservedTimestamp) }
				: { ...e, maxObservedTimestamp: void 0 };
		default:
	}
}
var K1 = Object.defineProperty,
	Y1 = (e, n, r) => (n in e ? K1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Ut = (e, n, r) => Y1(e, typeof n != "symbol" ? n + "" : n, r),
	G1 = 1e3,
	F1 = 1001,
	X1 = 1005,
	J1 = 4040,
	lo;
function Ka() {
	return (
		lo === void 0 && (lo = Date.now()),
		typeof performance > "u" || !performance.now ? Date.now() : Math.round(lo + performance.now())
	);
}
function Gy() {
	return `t=${Math.round((Ka() - lo) / 100) / 10}s`;
}
var jp = {
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
function W1(e) {
	if (e === void 0) return "Unknown";
	for (const n of Object.keys(jp)) if (e.startsWith(n)) return n;
	return "Unknown";
}
var eE = class {
	constructor(e, n, r, u, s, o) {
		((this.markConnectionStateDirty = s),
			(this.debug = o),
			Ut(this, "socket"),
			Ut(this, "connectionCount"),
			Ut(this, "_hasEverConnected", !1),
			Ut(this, "lastCloseReason"),
			Ut(this, "transitionChunkBuffer", null),
			Ut(this, "defaultInitialBackoff"),
			Ut(this, "maxBackoff"),
			Ut(this, "retries"),
			Ut(this, "serverInactivityThreshold"),
			Ut(this, "reconnectDueToServerInactivityTimeout"),
			Ut(this, "scheduledReconnect", null),
			Ut(this, "networkOnlineHandler", null),
			Ut(this, "pendingNetworkRecoveryInfo", null),
			Ut(this, "uri"),
			Ut(this, "onOpen"),
			Ut(this, "onResume"),
			Ut(this, "onMessage"),
			Ut(this, "webSocketConstructor"),
			Ut(this, "logger"),
			Ut(this, "onServerDisconnectError"),
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
			const r = Yy(JSON.parse(n));
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
							clientTs: Ka(),
						})),
					this.lastCloseReason !== "InitialConnect" &&
						(this.lastCloseReason
							? this.logger.log("WebSocket reconnected at", Gy(), "after disconnect due to", this.lastCloseReason)
							: this.logger.log("WebSocket reconnected at", Gy())),
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
				let u = Yy(JSON.parse(n.data));
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
					n.code !== G1 && n.code !== F1 && n.code !== X1 && n.code !== J1)
				) {
					let u = `WebSocket closed with code ${n.code}`;
					(n.reason && (u += `: ${n.reason}`),
						this.logger.log(u),
						this.onServerDisconnectError && n.reason && this.onServerDisconnectError(u));
				}
				const r = W1(n.reason);
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
			const r = Q1(e),
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
		const r = Ka(),
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
			const n = Ka() - this.scheduledReconnect.scheduledAt;
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
							clientTs: Ka(),
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
			(e === "client" ? 100 : e === "Unknown" ? this.defaultInitialBackoff : jp[e].timeout) * Math.pow(2, this.retries);
		this.retries += 1;
		const r = Math.min(n, this.maxBackoff);
		return r + r * (Math.random() - 0.5);
	}
	reportLargeTransition({ transition: e, messageLength: n }) {
		if (e.clientClockSkew === void 0 || e.serverTs === void 0) return;
		const r = Ka() - e.clientClockSkew - e.serverTs / 1e6,
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
function tE() {
	return nE();
}
function nE() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
		const n = (Math.random() * 16) | 0;
		return (e === "x" ? n : (n & 3) | 8).toString(16);
	});
}
var cl = class extends Error {};
cl.prototype.name = "InvalidTokenError";
function iE(e) {
	return decodeURIComponent(
		atob(e).replace(/(.)/g, (n, r) => {
			let u = r.charCodeAt(0).toString(16).toUpperCase();
			return (u.length < 2 && (u = "0" + u), "%" + u);
		}),
	);
}
function rE(e) {
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
		return iE(n);
	} catch {
		return atob(n);
	}
}
function Lp(e, n) {
	if (typeof e != "string") throw new cl("Invalid token specified: must be a string");
	n || (n = {});
	const r = n.header === !0 ? 0 : 1,
		u = e.split(".")[r];
	if (typeof u != "string") throw new cl(`Invalid token specified: missing part #${r + 1}`);
	let s;
	try {
		s = rE(u);
	} catch (o) {
		throw new cl(`Invalid token specified: invalid base64 for part #${r + 1} (${o.message})`);
	}
	try {
		return JSON.parse(s);
	} catch (o) {
		throw new cl(`Invalid token specified: invalid json for part #${r + 1} (${o.message})`);
	}
}
var aE = Object.defineProperty,
	uE = (e, n, r) => (n in e ? aE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	pn = (e, n, r) => uE(e, typeof n != "symbol" ? n + "" : n, r),
	lE = 480 * 60 * 60 * 1e3,
	Fy = 2,
	sE = class {
		constructor(e, n, r) {
			(pn(this, "authState", { state: "noAuth" }),
				pn(this, "configVersion", 0),
				pn(this, "syncState"),
				pn(this, "authenticate"),
				pn(this, "stopSocket"),
				pn(this, "tryRestartSocket"),
				pn(this, "pauseSocket"),
				pn(this, "resumeSocket"),
				pn(this, "clearAuth"),
				pn(this, "logger"),
				pn(this, "refreshTokenLeewaySeconds"),
				pn(this, "initialAuthTokenReuse"),
				pn(this, "lastRefreshChange"),
				pn(this, "tokenConfirmationAttempts", 0),
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
					(this.authState.state === "waitingForServerConfirmationOfFreshToken" && this.tokenConfirmationAttempts >= Fy))
			) {
				(this.logger.error(`Failed to authenticate: "${e.error}", check your server auth config`),
					this.syncState.hasAuth() && this.syncState.clearAuth(),
					this.authState.state !== "noAuth" && this.setAndReportAuthFailed(this.authState.config.onAuthChange));
				return;
			}
			if (
				(this.authState.state === "waitingForServerConfirmationOfFreshToken" &&
					(this.tokenConfirmationAttempts++,
					this._logVerbose(`retrying reauthentication, ${Fy - this.tokenConfirmationAttempts} attempts remaining`)),
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
			let h = Math.min(lE, (f - this.refreshTokenLeewaySeconds) * 1e3);
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
				return Lp(e);
			} catch (n) {
				return (this._logVerbose(`Error decoding token: ${n instanceof Error ? n.message : "Unknown error"}`), null);
			}
		}
		_logVerbose(e) {
			this.logger.logVerbose(`${e} [v${this.configVersion}]`);
		}
	},
	oE = ["convexClientConstructed", "convexWebSocketOpen", "convexFirstMessageReceived"];
function cE(e, n) {
	const r = { sessionId: n };
	typeof performance > "u" || !performance.mark || performance.mark(e, { detail: r });
}
function fE(e) {
	let n = e.name.slice(6);
	return ((n = n.charAt(0).toLowerCase() + n.slice(1)), { name: n, startTime: e.startTime });
}
function dE(e) {
	if (typeof performance > "u" || !performance.getEntriesByName) return [];
	const n = [];
	for (const r of oE) {
		const u = performance
			.getEntriesByName(r)
			.filter((s) => s.entryType === "mark")
			.filter((s) => s.detail.sessionId === e);
		n.push(...u);
	}
	return n.map(fE);
}
var hE = Object.defineProperty,
	mE = (e, n, r) => (n in e ? hE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	$t = (e, n, r) => mE(e, typeof n != "symbol" ? n + "" : n, r),
	vE = class {
		constructor(e, n, r) {
			if (
				($t(this, "address"),
				$t(this, "state"),
				$t(this, "requestManager"),
				$t(this, "webSocketManager"),
				$t(this, "authenticationManager"),
				$t(this, "remoteQuerySet"),
				$t(this, "optimisticQueryResults"),
				$t(this, "_transitionHandlerCounter", 0),
				$t(this, "_nextRequestId"),
				$t(this, "_onTransitionFns", new Map()),
				$t(this, "_sessionId"),
				$t(this, "firstMessageReceived", !1),
				$t(this, "debug"),
				$t(this, "logger"),
				$t(this, "maxObservedTimestamp"),
				$t(this, "connectionStateSubscribers", new Map()),
				$t(this, "nextConnectionStateSubscriberId", 0),
				$t(this, "_lastPublishedConnectionState"),
				$t(this, "markConnectionStateDirty", () => {
					Promise.resolve().then(() => {
						const b = this.connectionState();
						if (JSON.stringify(b) !== JSON.stringify(this._lastPublishedConnectionState)) {
							this._lastPublishedConnectionState = b;
							for (const p of this.connectionStateSubscribers.values()) p(b);
						}
					});
				}),
				$t(this, "mark", (b) => {
					this.debug && cE(b, this.sessionId);
				}),
				typeof e == "object")
			)
				throw new Error(
					"Passing a ClientConfig object is no longer supported. Pass the URL of the Convex deployment as a string directly.",
				);
			(r?.skipConvexDeploymentUrlCheck !== !0 && Cp(e), (r = { ...r }));
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
						? E1({ verbose: r.verbose ?? !1 })
						: r.logger !== !0 && r.logger
							? r.logger
							: w1({ verbose: r.verbose ?? !1 })));
			const o = e.search("://");
			if (o === -1) throw new Error("Provided address was not an absolute URL.");
			const f = e.substring(o + 3),
				h = e.substring(0, o);
			let m;
			if (h === "http") m = "ws";
			else if (h === "https") m = "wss";
			else throw new Error(`Unknown parent protocol ${h}`);
			const v = `${m}://${f}/api/${qy}/sync`;
			((this.state = new R1()),
				(this.remoteQuerySet = new Ky((b) => this.state.queryPath(b), this.logger)),
				(this.requestManager = new k1(this.logger, this.markConnectionStateDirty)));
			const g = () => {
				(this.webSocketManager.pause(), this.state.pause());
			};
			((this.authenticationManager = new sE(
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
				(this.optimisticQueryResults = new U1()),
				this.addOnTransitionHandler((b) => {
					n(b.queries.map((p) => p.token));
				}),
				(this._nextRequestId = 0),
				(this._sessionId = tE()));
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
			((this.webSocketManager = new eE(
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
							(this.remoteQuerySet = new Ky((x) => this.state.queryPath(x), this.logger)));
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
								const p = T1(this.logger, b.error);
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
					n = e ? Lp(e.value) : {};
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
			const u = gr(n),
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
			const r = Gr(e, gr(n));
			return this.optimisticQueryResults.queryResult(r);
		}
		localQueryResultByToken(e) {
			return this.optimisticQueryResults.queryResult(e);
		}
		hasLocalQueryResultByToken(e) {
			return this.optimisticQueryResults.hasQueryResult(e);
		}
		localQueryLogs(e, n) {
			const r = Gr(e, gr(n));
			return this.optimisticQueryResults.queryLogs(r);
		}
		queryJournal(e, n) {
			const r = Gr(e, gr(n));
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
				throw u.errorData !== void 0 ? qd(u, new Ld(Ya("mutation", e, u))) : new Error(Ya("mutation", e, u));
			return u.value;
		}
		async mutationInternal(e, n, r, u) {
			const { mutationPromise: s } = this.enqueueMutation(e, n, r, u);
			return s;
		}
		enqueueMutation(e, n, r, u) {
			const s = gr(n);
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
			const f = { type: "Mutation", requestId: o, udfPath: e, componentPath: u, args: [Fr(s)] },
				h = this.webSocketManager.sendMessage(f);
			return { requestId: o, mutationPromise: this.requestManager.request(f, h) };
		}
		async action(e, n) {
			const r = await this.actionInternal(e, n);
			if (!r.success) throw r.errorData !== void 0 ? qd(r, new Ld(Ya("action", e, r))) : new Error(Ya("action", e, r));
			return r.value;
		}
		async actionInternal(e, n, r) {
			const u = gr(n),
				s = this.nextRequestId;
			(this._nextRequestId++, this.tryReportLongDisconnect());
			const o = { type: "Action", requestId: s, udfPath: e, componentPath: r, args: [Fr(u)] },
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
				const e = dE(this.sessionId);
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
				headers: { "Content-Type": "application/json", "Convex-Client": `npm-${qy}` },
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
function gd(e) {
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
var gE = Object.defineProperty,
	yE = (e, n, r) => (n in e ? gE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Xy = (e, n, r) => yE(e, typeof n != "symbol" ? n + "" : n, r),
	pE = class {
		constructor(e, n) {
			((this.client = e),
				(this.onTransition = n),
				Xy(this, "paginatedQuerySet", new Map()),
				Xy(this, "lastTransitionTs"),
				(this.lastTransitionTs = _l.fromNumber(0)),
				this.client.addOnTransitionHandler((r) => this.onBaseTransition(r)));
		}
		subscribe(e, n, r) {
			const u = Xr(e),
				s = Zy(u, n, r),
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
			const u = Zy(Xr(e), n, r);
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
				const v = gd(m);
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
			const s = gd(u);
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
					const g = gd(v);
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
	bE = Object.defineProperty,
	SE = (e, n, r) => (n in e ? bE(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Pa = (e, n, r) => SE(e, typeof n != "symbol" ? n + "" : n, r),
	Jy,
	_E = class {
		constructor(e, n = {}) {
			(Pa(this, "listeners"),
				Pa(this, "_client"),
				Pa(this, "_paginatedClient"),
				Pa(this, "callNewListenersWithCurrentValuesTimer"),
				Pa(this, "_closed"),
				Pa(this, "_disabled"),
				n.skipConvexDeploymentUrlCheck !== !0 && Cp(e));
			const { disabled: r, ...u } = n;
			((this._closed = !1),
				(this._disabled = !!r),
				Jy && !("webSocketConstructor" in u) && typeof WebSocket > "u" && (u.webSocketConstructor = Jy),
				typeof window > "u" && !("unsavedChangesWarning" in u) && (u.unsavedChangesWarning = !1),
				this.disabled ||
					((this._client = new vE(e, () => {}, u)),
					(this._paginatedClient = new pE(this._client, (s) => this._transition(s)))),
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
			const { queryToken: s, unsubscribe: o } = this.client.subscribe(ji(e), n),
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
				{ paginatedQueryToken: f, unsubscribe: h } = this.paginatedClient.subscribe(ji(e), n, o),
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
					getCurrentValue: () => this.paginatedClient.localQueryResult(ji(e), n, o),
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
					v = x1(f),
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
			return await this.client.mutation(ji(e), n, r);
		}
		async action(e, n) {
			if (this.disabled) throw new Error("ConvexClient is disabled");
			return await this.client.action(ji(e), n);
		}
		async query(e, n) {
			if (this.disabled) throw new Error("ConvexClient is disabled");
			const r = this.client.localQueryResult(ji(e), n);
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
	wE = 6e4,
	EE = 500,
	TE = 1e4,
	xE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
	Wy = 128,
	e0 = 109,
	t0 = 100,
	AE = /^[\x21-\x7e]+$/,
	n0 = 100,
	i0 = 16,
	Ws = 6,
	r0 = 24;
function a0(e) {
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
var $d = { reason: "denied", message: "This plugin no longer has access to its data" },
	Bd = { reason: "session_expired", message: "This plugin session expired" },
	Yr = { reason: "unavailable", message: "The plugin data connection is unavailable" };
function CE(e) {
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
function RE() {
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
	if (!xE.test(o)) throw new Error("Invalid host bridge nonce");
	return { parentOrigin: s, bridgeNonce: o };
}
function yd(e) {
	return e.collection.length === 0 || e.collection.length > Wy
		? `Collection names must be 1 to ${Wy} characters`
		: e.keyPrefix !== void 0 && (e.keyPrefix.length > e0 || !AE.test(e.keyPrefix))
			? `Key prefixes must be 1 to ${e0} printable ASCII characters`
			: !Number.isInteger(e.limit) || e.limit < 1 || e.limit > t0
				? `Watch limits must be integers from 1 to ${t0}`
				: null;
}
function OE(e) {
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
			let R = !1;
			const M = e.start_watch(
				e.queryArgs,
				{
					...(A.start === null ? {} : { keyStartExclusive: A.start }),
					...(A.end === null ? {} : { keyEndInclusive: A.end }),
				},
				(Y) => {
					R || D(A, Y);
				},
			);
			return M
				? ((A.stop = () => {
						R || ((R = !0), M.dispose(), e.release_server_slot());
					}),
					!0)
				: (e.release_server_slot(), !1);
		},
		o = (A) => {
			if (A.docs === null || A.docs.length === 0) return null;
			const R = A.previousFirstKey ?? A.docs[A.docs.length - 1].key;
			return R === A.start || R === A.end || new Set(A.docs.map((M) => M.key)).size < 2 ? null : R;
		},
		f = () => n.intervals.length + (n.pending?.replacements.length ?? 0),
		h = () => n.intervals.length + (n.pending ? n.pending.replacements.length - n.pending.removeCount : 0),
		m = (A) => (A.truncated ? (A.previousDocs ?? A.docs) : A.docs),
		v = (A) => {
			if (!n.pending) return;
			const R = A - n.pending.from;
			if (!(R < 0 || R >= n.pending.removeCount)) return n.pending.suppressedDocs[R];
		},
		g = () => {
			const A = n.intervals.flatMap((M, Y) => {
					const P = v(Y);
					return (P === void 0 ? M.docs : P) ?? [];
				}),
				R = n.intervals[n.intervals.length - 1];
			return {
				docs: A,
				hasMore: n.bottomOpen && !(R !== void 0 && R.end === null && R.docs !== null && !R.truncated),
				atCapacity: n.forceAtCapacity || n.intervals.length >= Ws || e.page_at_ceiling(),
				incomplete: n.intervals.some((M, Y) =>
					M.end === null ||
					!M.truncated ||
					M.docs === null ||
					(n.pending && Y >= n.pending.from && Y < n.pending.from + n.pending.removeCount)
						? !1
						: o(M) === null || h() + 1 > Ws || e.page_at_ceiling(2),
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
					const R = JSON.stringify(A);
					R !== n.lastPayloadJson && ((n.lastPayloadJson = R), e.post_update(A));
				}));
		},
		b = () => {
			n.dead || ((n.forceAtCapacity = !0), _());
		},
		p = (A) => {
			const R = A.docs,
				M = R[R.length - 1].key;
			(A.stop(), (A.end = M), (A.truncated = !1), (n.bottomOpen = !0), s(A) || u(Yr));
		},
		E = () => {
			if (n.dead || n.loadingOlder || n.pending || !g().hasMore) return;
			const A = n.intervals[n.intervals.length - 1];
			if (!A || A.end === null) return;
			if (f() + 1 > Ws || e.page_at_ceiling()) {
				b();
				return;
			}
			const R = {
				start: A.end,
				end: null,
				docs: null,
				truncated: !1,
				previousFirstKey: void 0,
				previousDocs: null,
				stop: () => {},
			};
			if (!s(R)) {
				b();
				return;
			}
			(n.intervals.push(R), (n.loadingOlder = !0), (n.awaitingTail = R));
		},
		x = () => {
			if (n.dead) return;
			const A = n.intervals[n.intervals.length - 1];
			if (!(A && A.end === null && A.docs !== null && A.truncated && (p(A), n.dead)) && !n.pending) {
				n.queuedLoadOlder && ((n.queuedLoadOlder = !1), E());
				for (const [R, M] of n.intervals.entries()) {
					if (M.end === null || !M.truncated || M.docs === null) continue;
					const Y = o(M);
					if (Y === null) continue;
					if (f() + 1 > Ws) break;
					const P = {
							start: M.start,
							end: Y,
							docs: null,
							truncated: !1,
							previousFirstKey: void 0,
							previousDocs: null,
							stop: () => {},
						},
						j = {
							start: Y,
							end: M.end,
							docs: null,
							truncated: !1,
							previousFirstKey: void 0,
							previousDocs: null,
							stop: () => {},
						};
					if (!s(P)) break;
					if (!s(j)) {
						P.stop();
						break;
					}
					n.pending = { from: R, removeCount: 1, replacements: [P, j], suppressedDocs: [m(M)] };
					return;
				}
				for (let R = 0; R + 1 < n.intervals.length; R += 1) {
					const M = n.intervals[R],
						Y = n.intervals[R + 1];
					if (M.docs === null || Y.docs === null || M.docs.length + Y.docs.length >= e.queryArgs.limit) continue;
					const P = {
						start: M.start,
						end: Y.end,
						docs: null,
						truncated: !1,
						previousFirstKey: void 0,
						previousDocs: null,
						stop: () => {},
					};
					if (!s(P)) break;
					n.pending = { from: R, removeCount: 2, replacements: [P], suppressedDocs: [m(M), m(Y)] };
					return;
				}
			}
		},
		k = () => {
			const A = n.pending;
			n.pending = null;
			const R = n.intervals.splice(A.from, A.removeCount, ...A.replacements);
			for (const M of R) M.stop();
			(_(), x());
		},
		D = (A, R) => {
			if (!n.dead) {
				if ("queryError" in R) {
					const M = e.session_expired() ? Bd : Yr;
					(M === Yr && console.error("[bonobo-plugin-sdk] Plugin data window interval failed:", R.queryError), u(M));
					return;
				}
				if (R.value === null) {
					u($d);
					return;
				}
				if (
					((A.previousFirstKey = A.docs?.[0]?.key),
					(A.previousDocs = A.docs),
					(A.docs = R.value.docs),
					(A.truncated = R.value.truncated),
					n.awaitingTail === A && ((n.awaitingTail = null), (n.loadingOlder = !1)),
					n.pending?.replacements.includes(A))
				) {
					n.pending.replacements.every((M) => M.docs !== null) && k();
					return;
				}
				(_(), x());
			}
		},
		C = {
			start: null,
			end: null,
			docs: null,
			truncated: !1,
			previousFirstKey: void 0,
			previousDocs: null,
			stop: () => {},
		};
	return s(C)
		? (n.intervals.push(C),
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
function NE(e) {
	const n = new Set();
	let r = 0;
	const u = () => (r >= r0 ? !1 : ((r += 1), !0)),
		s = () => {
			r -= 1;
		},
		o = (p = 1) => r + p > r0,
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
			if (n.size >= i0 || o()) return (h(p.onUpdate), () => {});
			if (!u()) return (h(p.onUpdate), () => {});
			const E = {};
			n.add(E);
			let x = null;
			const k = () => {
				n.delete(E) && (x?.dispose(), s());
			};
			return (
				(x = p.start((D) => {
					if (n.has(E)) {
						if ("queryError" in D) {
							const C = e.session_expired() ? Bd : Yr;
							(C === Yr && console.error(`[bonobo-plugin-sdk] Plugin ${p.failureLabel} failed:`, D.queryError),
								k(),
								p.onUpdate(null, C));
							return;
						}
						if (D.value === null) {
							(k(), p.onUpdate(null, $d));
							return;
						}
						p.onUpdate(p.deliver(D.value));
					}
				})),
				x
					? function () {
							k();
						}
					: (k(),
						console.error(`[bonobo-plugin-sdk] Plugin ${p.failureLabel} could not start`),
						f(p.onUpdate),
						() => {})
			);
		},
		v = {
			watch(p, E) {
				const x = yd({
					collection: p.collection,
					...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
					limit: p.limit,
				});
				return x
					? (f(E, { reason: "invalid", message: x }), () => {})
					: m({
							start: (k) =>
								e.start_watch(
									{
										collection: p.collection,
										...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
										limit: p.limit,
									},
									null,
									k,
								),
							onUpdate: E,
							deliver: (k) => ({ docs: k.docs, truncated: k.truncated }),
							failureLabel: "data watch",
						});
			},
			watchRecent(p, E) {
				const x = yd({ collection: p.collection, limit: p.limit });
				return x
					? (f(E, { reason: "invalid", message: x }), () => {})
					: m({
							start: (k) =>
								e.start_recent_watch(
									{
										collection: p.collection,
										limit: p.limit,
										...(p.order === void 0 ? {} : { order: p.order }),
										...(p.since === void 0 ? {} : { since: p.since }),
										...(p.before === void 0 ? {} : { before: p.before }),
										...(p.scopeId === void 0 ? {} : { scopeId: p.scopeId }),
									},
									k,
								),
							onUpdate: E,
							deliver: (k) => ({ docs: k.docs, truncated: k.truncated }),
							failureLabel: "recent watch",
						});
			},
			watchWindow(p, E) {
				const x = { loadOlder() {}, unsubscribe() {} },
					k = yd({
						collection: p.collection,
						...(p.keyPrefix === void 0 ? {} : { keyPrefix: p.keyPrefix }),
						limit: p.pageSize,
					});
				if (k) return (f(E, { reason: "invalid", message: k }), x);
				if (n.size >= i0 || o()) return (h(E), x);
				const D = {};
				n.add(D);
				const C = OE({
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
						(n.delete(D), E(null, A));
					},
					session_expired: e.session_expired,
				});
				return C
					? {
							loadOlder() {
								n.has(D) && C.load_older();
							},
							unsubscribe() {
								n.delete(D) && C.dispose();
							},
						}
					: (n.delete(D), console.error("[bonobo-plugin-sdk] Plugin data window could not start"), f(E), x);
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
			return !Number.isInteger(p.limit) || p.limit < 1 || p.limit > n0
				? Promise.resolve({ _nay: { name: "invalid", message: `Member list limits must be integers from 1 to ${n0}` } })
				: Promise.resolve()
						.then(() => e.list_members(p.limit, p.cursor ?? null))
						.then((E) =>
							E === null
								? { _nay: { name: $d.reason, message: "This plugin no longer has access to this workspace" } }
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
							const x = e.session_expired() ? Bd : Yr;
							return (
								x === Yr && console.error("[bonobo-plugin-sdk] Failed to list plugin workspace members:", E),
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
function kE(e) {
	return {
		start_watch: (r, u, s) => {
			try {
				const o = e.onUpdate(
					Zn.plugins_data.watch_documents,
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
					Zn.plugins_data.watch_recent,
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
					return e.mutation(Zn.plugins_data.user_append_document, u);
				case "put":
					return e.mutation(Zn.plugins_data.user_put_document, u);
				case "remove":
					return e.mutation(Zn.plugins_data.user_remove_document, u);
				case "putOwned":
					return e.mutation(Zn.plugins_data.user_put_owned_document, u);
				case "removeOwned":
					return e.mutation(Zn.plugins_data.user_remove_owned_document, u);
			}
		},
		resolve_member_display: (r) => e.query(Zn.plugins_data.resolve_member_display, { userIds: r }),
		list_members: (r, u) => e.query(Zn.plugins_data.list_members, { limit: r, cursor: u }),
		run_manage_scope: (r) => e.mutation(Zn.plugins_data.user_manage_scope, { action: r }),
		list_scope_principals: (r) => e.query(Zn.plugins_data.watch_scope_principals, { scopeId: r }),
		start_my_scopes_watch: (r) => {
			try {
				const u = e.onUpdate(
					Zn.plugins_data.watch_my_scopes,
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
async function ME() {
	const { parentOrigin: e, bridgeNonce: n } = RE();
	let r = "",
		u = "",
		s = 0,
		o = null;
	const f = new Set(),
		h = new Map();
	let m = null;
	async function v() {
		return Date.now() >= s - wE ? g() : u;
	}
	function g() {
		if (m) return m;
		const E = crypto.randomUUID();
		return (
			(m = new Promise((x, k) => {
				const D = setTimeout(() => {
					(h.delete(E), k(new Error("Plugin frame token refresh timed out")));
				}, TE);
				h.set(E, { resolve: x, reject: k, timeout: D });
				try {
					window.parent.postMessage({ type: "bonobo:token-refresh-request", bridgeNonce: n, requestId: E }, e);
				} catch (C) {
					(clearTimeout(D), h.delete(E), k(C));
				}
			}).finally(() => {
				m = null;
			})),
			m
		);
	}
	async function _(E, x) {
		const k = x?.body !== void 0,
			D = (R) => {
				const M = new Headers(x?.headers);
				return (
					M.set("Authorization", `Bearer ${R}`),
					k && M.set("Content-Type", "application/json"),
					fetch(r + E, {
						method: x?.method ?? (k ? "POST" : "GET"),
						headers: M,
						body: k ? JSON.stringify(x.body) : void 0,
					})
				);
			},
			C = await v();
		let A = await D(C);
		if ((A.status === 401 && (A = await D(u !== C ? u : await g())), !A.ok)) {
			const R = await A.text();
			throw Object.assign(new Error(`${E} responded ${A.status}: ${R}`), { status: A.status, responseText: R });
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
				const k = await x.json().catch(() => null),
					D = k?._yay?.jwt,
					C = k?._yay?.sessionExpiresAt;
				return typeof D != "string" || typeof C != "number" ? null : ((s = C), D);
			}
			if (!(x === null || x.status === 429 || x.status >= 500) || E >= 2) return null;
			await new Promise((k) => setTimeout(k, 1e3 * (E + 1)));
		}
	}
	return new Promise((E) => {
		let x = !1,
			k;
		const D = () => {
				window.parent.postMessage({ type: "bonobo:ready", bridgeNonce: n }, e);
			},
			C = () => {
				clearInterval(k);
			},
			A = (R) => {
				if (R.source !== window.parent || R.origin !== e) return;
				const M = R.data;
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
						CE(M.context)
					) {
						((x = !0),
							C(),
							window.removeEventListener("pagehide", C),
							(r = M.apiOrigin),
							(u = M.token),
							(s = M.tokenExpiresAt));
						const Y = new _E(M.convexUrl, { expectAuth: !0, unsavedChangesWarning: !1 });
						(Y.setAuth(p), window.addEventListener("pagehide", () => void Y.close(), { once: !0 }), (o = a0(M.theme)));
						const { data: P, members: j, scopes: q } = NE({ ...kE(Y), session_expired: () => Date.now() >= s });
						E({
							context: M.context,
							apiOrigin: r,
							getToken: v,
							refreshToken: g,
							fetchJson: _,
							data: P,
							members: j,
							scopes: q,
							theme: {
								current: () => o,
								subscribe(K) {
									return (
										f.add(K),
										() => {
											f.delete(K);
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
						const Y = h.get(M.requestId);
						Y &&
							(h.delete(M.requestId),
							clearTimeout(Y.timeout),
							(u = M.token),
							(s = M.tokenExpiresAt),
							Y.resolve(M.token));
					} else if (x && M.bridgeNonce === n && M.type === "bonobo:theme") {
						const Y = a0(M.theme);
						if (Y) {
							o = Y;
							for (const P of f) P(Y);
						}
					} else if (
						x &&
						M.bridgeNonce === n &&
						M.type === "bonobo:token-error" &&
						typeof M.requestId == "string" &&
						typeof M.message == "string"
					) {
						const Y = h.get(M.requestId);
						Y && (h.delete(M.requestId), clearTimeout(Y.timeout), Y.reject(new Error(M.message)));
					}
				}
			};
		(window.addEventListener("message", A),
			window.addEventListener("pagehide", C, { once: !0 }),
			D(),
			(k = setInterval(D, EE)));
	});
}
var zE = Qn((e) => {
		function n(O, $) {
			var H = O.length;
			O.push($);
			e: for (; 0 < H; ) {
				var le = (H - 1) >>> 1,
					he = O[le];
				if (0 < s(he, $)) ((O[le] = $), (O[H] = he), (H = le));
				else break e;
			}
		}
		function r(O) {
			return O.length === 0 ? null : O[0];
		}
		function u(O) {
			if (O.length === 0) return null;
			var $ = O[0],
				H = O.pop();
			if (H !== $) {
				O[0] = H;
				e: for (var le = 0, he = O.length, Re = he >>> 1; le < Re; ) {
					var N = 2 * (le + 1) - 1,
						G = O[N],
						ie = N + 1,
						oe = O[ie];
					if (0 > s(G, H))
						ie < he && 0 > s(oe, G) ? ((O[le] = oe), (O[ie] = H), (le = ie)) : ((O[le] = G), (O[N] = H), (le = N));
					else if (ie < he && 0 > s(oe, H)) ((O[le] = oe), (O[ie] = H), (le = ie));
					else break e;
				}
			}
			return $;
		}
		function s(O, $) {
			var H = O.sortIndex - $.sortIndex;
			return H !== 0 ? H : O.id - $.id;
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
			k = !1,
			D = typeof setTimeout == "function" ? setTimeout : null,
			C = typeof clearTimeout == "function" ? clearTimeout : null,
			A = typeof setImmediate < "u" ? setImmediate : null;
		function R(O) {
			for (var $ = r(v); $ !== null; ) {
				if ($.callback === null) u(v);
				else if ($.startTime <= O) (u(v), ($.sortIndex = $.expirationTime), n(m, $));
				else break;
				$ = r(v);
			}
		}
		function M(O) {
			if (((x = !1), R(O), !E))
				if (r(m) !== null) ((E = !0), Y || ((Y = !0), se()));
				else {
					var $ = r(v);
					$ !== null && ae(M, $.startTime - O);
				}
		}
		var Y = !1,
			P = -1,
			j = 5,
			q = -1;
		function K() {
			return k ? !0 : !(e.unstable_now() - q < j);
		}
		function B() {
			if (((k = !1), Y)) {
				var O = e.unstable_now();
				q = O;
				var $ = !0;
				try {
					e: {
						((E = !1), x && ((x = !1), C(P), (P = -1)), (p = !0));
						var H = b;
						try {
							t: {
								for (R(O), _ = r(m); _ !== null && !(_.expirationTime > O && K()); ) {
									var le = _.callback;
									if (typeof le == "function") {
										((_.callback = null), (b = _.priorityLevel));
										var he = le(_.expirationTime <= O);
										if (((O = e.unstable_now()), typeof he == "function")) {
											((_.callback = he), R(O), ($ = !0));
											break t;
										}
										(_ === r(m) && u(m), R(O));
									} else u(m);
									_ = r(m);
								}
								if (_ !== null) $ = !0;
								else {
									var Re = r(v);
									(Re !== null && ae(M, Re.startTime - O), ($ = !1));
								}
							}
							break e;
						} finally {
							((_ = null), (b = H), (p = !1));
						}
						$ = void 0;
					}
				} finally {
					$ ? se() : (Y = !1);
				}
			}
		}
		var se;
		if (typeof A == "function")
			se = function () {
				A(B);
			};
		else if (typeof MessageChannel < "u") {
			var X = new MessageChannel(),
				F = X.port2;
			((X.port1.onmessage = B),
				(se = function () {
					F.postMessage(null);
				}));
		} else
			se = function () {
				D(B, 0);
			};
		function ae(O, $) {
			P = D(function () {
				O(e.unstable_now());
			}, $);
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
					: (j = 0 < O ? Math.floor(1e3 / O) : 5);
			}),
			(e.unstable_getCurrentPriorityLevel = function () {
				return b;
			}),
			(e.unstable_next = function (O) {
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
					return O();
				} finally {
					b = H;
				}
			}),
			(e.unstable_requestPaint = function () {
				k = !0;
			}),
			(e.unstable_runWithPriority = function (O, $) {
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
				var H = b;
				b = O;
				try {
					return $();
				} finally {
					b = H;
				}
			}),
			(e.unstable_scheduleCallback = function (O, $, H) {
				var le = e.unstable_now();
				switch (
					(typeof H == "object" && H !== null
						? ((H = H.delay), (H = typeof H == "number" && 0 < H ? le + H : le))
						: (H = le),
					O)
				) {
					case 1:
						var he = -1;
						break;
					case 2:
						he = 250;
						break;
					case 5:
						he = 1073741823;
						break;
					case 4:
						he = 1e4;
						break;
					default:
						he = 5e3;
				}
				return (
					(he = H + he),
					(O = { id: g++, callback: $, priorityLevel: O, startTime: H, expirationTime: he, sortIndex: -1 }),
					H > le
						? ((O.sortIndex = H),
							n(v, O),
							r(m) === null && O === r(v) && (x ? (C(P), (P = -1)) : (x = !0), ae(M, H - le)))
						: ((O.sortIndex = he), n(m, O), E || p || ((E = !0), Y || ((Y = !0), se()))),
					O
				);
			}),
			(e.unstable_shouldYield = K),
			(e.unstable_wrapCallback = function (O) {
				var $ = b;
				return function () {
					var H = b;
					b = $;
					try {
						return O.apply(this, arguments);
					} finally {
						b = H;
					}
				};
			}));
	}),
	DE = Qn((e, n) => {
		n.exports = zE();
	}),
	jE = Qn((e) => {
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
			k = Object.assign,
			D = {};
		function C(N, G, ie) {
			((this.props = N), (this.context = G), (this.refs = D), (this.updater = ie || x));
		}
		((C.prototype.isReactComponent = {}),
			(C.prototype.setState = function (N, G) {
				if (typeof N != "object" && typeof N != "function" && N != null)
					throw Error(
						"takes an object of state variables to update or a function which returns an object of state variables.",
					);
				this.updater.enqueueSetState(this, N, G, "setState");
			}),
			(C.prototype.forceUpdate = function (N) {
				this.updater.enqueueForceUpdate(this, N, "forceUpdate");
			}));
		function A() {}
		A.prototype = C.prototype;
		function R(N, G, ie) {
			((this.props = N), (this.context = G), (this.refs = D), (this.updater = ie || x));
		}
		var M = (R.prototype = new A());
		((M.constructor = R), k(M, C.prototype), (M.isPureReactComponent = !0));
		var Y = Array.isArray;
		function P() {}
		var j = { H: null, A: null, T: null, S: null },
			q = Object.prototype.hasOwnProperty;
		function K(N, G, ie) {
			var oe = ie.ref;
			return { $$typeof: n, type: N, key: G, ref: oe !== void 0 ? oe : null, props: ie };
		}
		function B(N, G) {
			return K(N.type, G, N.props);
		}
		function se(N) {
			return typeof N == "object" && N !== null && N.$$typeof === n;
		}
		function X(N) {
			var G = { "=": "=0", ":": "=2" };
			return (
				"$" +
				N.replace(/[=:]/g, function (ie) {
					return G[ie];
				})
			);
		}
		var F = /\/+/g;
		function ae(N, G) {
			return typeof N == "object" && N !== null && N.key != null ? X("" + N.key) : G.toString(36);
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
							? N.then(P, P)
							: ((N.status = "pending"),
								N.then(
									function (G) {
										N.status === "pending" && ((N.status = "fulfilled"), (N.value = G));
									},
									function (G) {
										N.status === "pending" && ((N.status = "rejected"), (N.reason = G));
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
		function $(N, G, ie, oe, ge) {
			var ye = typeof N;
			(ye === "undefined" || ye === "boolean") && (N = null);
			var Se = !1;
			if (N === null) Se = !0;
			else
				switch (ye) {
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
								return ((Se = N._init), $(Se(N._payload), G, ie, oe, ge));
						}
				}
			if (Se)
				return (
					(ge = ge(N)),
					(Se = oe === "" ? "." + ae(N, 0) : oe),
					Y(ge)
						? ((ie = ""),
							Se != null && (ie = Se.replace(F, "$&/") + "/"),
							$(ge, G, ie, "", function (rt) {
								return rt;
							}))
						: ge != null &&
							(se(ge) &&
								(ge = B(
									ge,
									ie + (ge.key == null || (N && N.key === ge.key) ? "" : ("" + ge.key).replace(F, "$&/") + "/") + Se,
								)),
							G.push(ge)),
					1
				);
			Se = 0;
			var Pe = oe === "" ? "." : oe + ":";
			if (Y(N))
				for (var ze = 0; ze < N.length; ze++) ((oe = N[ze]), (ye = Pe + ae(oe, ze)), (Se += $(oe, G, ie, ye, ge)));
			else if (((ze = E(N)), typeof ze == "function"))
				for (N = ze.call(N), ze = 0; !(oe = N.next()).done; )
					((oe = oe.value), (ye = Pe + ae(oe, ze++)), (Se += $(oe, G, ie, ye, ge)));
			else if (ye === "object") {
				if (typeof N.then == "function") return $(O(N), G, ie, oe, ge);
				throw (
					(G = String(N)),
					Error(
						"Objects are not valid as a React child (found: " +
							(G === "[object Object]" ? "object with keys {" + Object.keys(N).join(", ") + "}" : G) +
							"). If you meant to render a collection of children, use an array instead.",
					)
				);
			}
			return Se;
		}
		function H(N, G, ie) {
			if (N == null) return N;
			var oe = [],
				ge = 0;
			return (
				$(N, oe, "", "", function (ye) {
					return G.call(ie, ye, ge++);
				}),
				oe
			);
		}
		function le(N) {
			if (N._status === -1) {
				var G = N._result;
				((G = G()),
					G.then(
						function (ie) {
							(N._status === 0 || N._status === -1) && ((N._status = 1), (N._result = ie));
						},
						function (ie) {
							(N._status === 0 || N._status === -1) && ((N._status = 2), (N._result = ie));
						},
					),
					N._status === -1 && ((N._status = 0), (N._result = G)));
			}
			if (N._status === 1) return N._result.default;
			throw N._result;
		}
		var he =
				typeof reportError == "function"
					? reportError
					: function (N) {
							if (typeof window == "object" && typeof window.ErrorEvent == "function") {
								var G = new window.ErrorEvent("error", {
									bubbles: !0,
									cancelable: !0,
									message:
										typeof N == "object" && N !== null && typeof N.message == "string" ? String(N.message) : String(N),
									error: N,
								});
								if (!window.dispatchEvent(G)) return;
							} else if (typeof process == "object" && typeof process.emit == "function") {
								process.emit("uncaughtException", N);
								return;
							}
							console.error(N);
						},
			Re = {
				map: H,
				forEach: function (N, G, ie) {
					H(
						N,
						function () {
							G.apply(this, arguments);
						},
						ie,
					);
				},
				count: function (N) {
					var G = 0;
					return (
						H(N, function () {
							G++;
						}),
						G
					);
				},
				toArray: function (N) {
					return (
						H(N, function (G) {
							return G;
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
			(e.Component = C),
			(e.Fragment = u),
			(e.Profiler = o),
			(e.PureComponent = R),
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
			(e.cloneElement = function (N, G, ie) {
				if (N == null) throw Error("The argument must be a React element, but you passed " + N + ".");
				var oe = k({}, N.props),
					ge = N.key;
				if (G != null)
					for (ye in (G.key !== void 0 && (ge = "" + G.key), G))
						!q.call(G, ye) ||
							ye === "key" ||
							ye === "__self" ||
							ye === "__source" ||
							(ye === "ref" && G.ref === void 0) ||
							(oe[ye] = G[ye]);
				var ye = arguments.length - 2;
				if (ye === 1) oe.children = ie;
				else if (1 < ye) {
					for (var Se = Array(ye), Pe = 0; Pe < ye; Pe++) Se[Pe] = arguments[Pe + 2];
					oe.children = Se;
				}
				return K(N.type, ge, oe);
			}),
			(e.createContext = function (N) {
				return (
					(N = { $$typeof: h, _currentValue: N, _currentValue2: N, _threadCount: 0, Provider: null, Consumer: null }),
					(N.Provider = N),
					(N.Consumer = { $$typeof: f, _context: N }),
					N
				);
			}),
			(e.createElement = function (N, G, ie) {
				var oe,
					ge = {},
					ye = null;
				if (G != null)
					for (oe in (G.key !== void 0 && (ye = "" + G.key), G))
						q.call(G, oe) && oe !== "key" && oe !== "__self" && oe !== "__source" && (ge[oe] = G[oe]);
				var Se = arguments.length - 2;
				if (Se === 1) ge.children = ie;
				else if (1 < Se) {
					for (var Pe = Array(Se), ze = 0; ze < Se; ze++) Pe[ze] = arguments[ze + 2];
					ge.children = Pe;
				}
				if (N && N.defaultProps) for (oe in ((Se = N.defaultProps), Se)) ge[oe] === void 0 && (ge[oe] = Se[oe]);
				return K(N, ye, ge);
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
			(e.memo = function (N, G) {
				return { $$typeof: g, type: N, compare: G === void 0 ? null : G };
			}),
			(e.startTransition = function (N) {
				var G = j.T,
					ie = {};
				j.T = ie;
				try {
					var oe = N(),
						ge = j.S;
					(ge !== null && ge(ie, oe),
						typeof oe == "object" && oe !== null && typeof oe.then == "function" && oe.then(P, he));
				} catch (ye) {
					he(ye);
				} finally {
					(G !== null && ie.types !== null && (G.types = ie.types), (j.T = G));
				}
			}),
			(e.unstable_useCacheRefresh = function () {
				return j.H.useCacheRefresh();
			}),
			(e.use = function (N) {
				return j.H.use(N);
			}),
			(e.useActionState = function (N, G, ie) {
				return j.H.useActionState(N, G, ie);
			}),
			(e.useCallback = function (N, G) {
				return j.H.useCallback(N, G);
			}),
			(e.useContext = function (N) {
				return j.H.useContext(N);
			}),
			(e.useDebugValue = function () {}),
			(e.useDeferredValue = function (N, G) {
				return j.H.useDeferredValue(N, G);
			}),
			(e.useEffect = function (N, G) {
				return j.H.useEffect(N, G);
			}),
			(e.useEffectEvent = function (N) {
				return j.H.useEffectEvent(N);
			}),
			(e.useId = function () {
				return j.H.useId();
			}),
			(e.useImperativeHandle = function (N, G, ie) {
				return j.H.useImperativeHandle(N, G, ie);
			}),
			(e.useInsertionEffect = function (N, G) {
				return j.H.useInsertionEffect(N, G);
			}),
			(e.useLayoutEffect = function (N, G) {
				return j.H.useLayoutEffect(N, G);
			}),
			(e.useMemo = function (N, G) {
				return j.H.useMemo(N, G);
			}),
			(e.useOptimistic = function (N, G) {
				return j.H.useOptimistic(N, G);
			}),
			(e.useReducer = function (N, G, ie) {
				return j.H.useReducer(N, G, ie);
			}),
			(e.useRef = function (N) {
				return j.H.useRef(N);
			}),
			(e.useState = function (N) {
				return j.H.useState(N);
			}),
			(e.useSyncExternalStore = function (N, G, ie) {
				return j.H.useSyncExternalStore(N, G, ie);
			}),
			(e.useTransition = function () {
				return j.H.useTransition();
			}),
			(e.version = "19.2.8"));
	}),
	Oo = Qn((e, n) => {
		n.exports = jE();
	}),
	LE = Qn((e) => {
		var n = Oo();
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
	qp = Qn((e, n) => {
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
		(r(), (n.exports = LE()));
	}),
	qE = Qn((e) => {
		var n = DE(),
			r = Oo(),
			u = qp();
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
			k = Symbol.for("react.fragment"),
			D = Symbol.for("react.strict_mode"),
			C = Symbol.for("react.profiler"),
			A = Symbol.for("react.consumer"),
			R = Symbol.for("react.context"),
			M = Symbol.for("react.forward_ref"),
			Y = Symbol.for("react.suspense"),
			P = Symbol.for("react.suspense_list"),
			j = Symbol.for("react.memo"),
			q = Symbol.for("react.lazy"),
			K = Symbol.for("react.activity"),
			B = Symbol.for("react.memo_cache_sentinel"),
			se = Symbol.iterator;
		function X(t) {
			return t === null || typeof t != "object"
				? null
				: ((t = (se && t[se]) || t["@@iterator"]), typeof t == "function" ? t : null);
		}
		var F = Symbol.for("react.client.reference");
		function ae(t) {
			if (t == null) return null;
			if (typeof t == "function") return t.$$typeof === F ? null : t.displayName || t.name || null;
			if (typeof t == "string") return t;
			switch (t) {
				case k:
					return "Fragment";
				case C:
					return "Profiler";
				case D:
					return "StrictMode";
				case Y:
					return "Suspense";
				case P:
					return "SuspenseList";
				case K:
					return "Activity";
			}
			if (typeof t == "object")
				switch (t.$$typeof) {
					case x:
						return "Portal";
					case R:
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
		var O = Array.isArray,
			$ = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			H = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			le = { pending: !1, data: null, method: null, action: null },
			he = [],
			Re = -1;
		function N(t) {
			return { current: t };
		}
		function G(t) {
			0 > Re || ((t.current = he[Re]), (he[Re] = null), Re--);
		}
		function ie(t, i) {
			(Re++, (he[Re] = t.current), (t.current = i));
		}
		var oe = N(null),
			ge = N(null),
			ye = N(null),
			Se = N(null);
		function Pe(t, i) {
			switch ((ie(ye, i), ie(ge, t), ie(oe, null), i.nodeType)) {
				case 9:
				case 11:
					t = (t = i.documentElement) && (t = t.namespaceURI) ? oy(t) : 0;
					break;
				default:
					if (((t = i.tagName), (i = i.namespaceURI))) ((i = oy(i)), (t = cy(i, t)));
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
			(G(oe), ie(oe, t));
		}
		function ze() {
			(G(oe), G(ge), G(ye));
		}
		function rt(t) {
			t.memoizedState !== null && ie(Se, t);
			var i = oe.current,
				a = cy(i, t.type);
			i !== a && (ie(ge, t), ie(oe, a));
		}
		function Nt(t) {
			(ge.current === t && (G(oe), G(ge)), Se.current === t && (G(Se), (rl._currentValue = le)));
		}
		var Ht, Qt;
		function it(t) {
			if (Ht === void 0)
				try {
					throw Error();
				} catch (a) {
					var i = a.stack.trim().match(/\n( *(at )?)/);
					((Ht = (i && i[1]) || ""),
						(Qt =
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
				Ht +
				t +
				Qt
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
								var ne = function () {
									throw Error();
								};
								if (
									(Object.defineProperty(ne.prototype, "props", {
										set: function () {
											throw Error();
										},
									}),
									typeof Reflect == "object" && Reflect.construct)
								) {
									try {
										Reflect.construct(ne, []);
									} catch (Q) {
										var Z = Q;
									}
									Reflect.construct(t, [], ne);
								} else {
									try {
										ne.call();
									} catch (Q) {
										Z = Q;
									}
									t.call(ne.prototype);
								}
							} else {
								try {
									throw Error();
								} catch (Q) {
									Z = Q;
								}
								(ne = t()) && typeof ne.catch == "function" && ne.catch(function () {});
							}
						} catch (Q) {
							if (Q && Z && typeof Q.stack == "string") return [Q.stack, Z.stack];
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
						V = T.split(`
`);
					for (c = l = 0; l < z.length && !z[l].includes("DetermineComponentFrameRoot"); ) l++;
					for (; c < V.length && !V[c].includes("DetermineComponentFrameRoot"); ) c++;
					if (l === z.length || c === V.length)
						for (l = z.length - 1, c = V.length - 1; 1 <= l && 0 <= c && z[l] !== V[c]; ) c--;
					for (; 1 <= l && 0 <= c; l--, c--)
						if (z[l] !== V[c]) {
							if (l !== 1 || c !== 1)
								do
									if ((l--, c--, 0 > c || z[l] !== V[c])) {
										var J =
											`
` + z[l].replace(" at new ", " at ");
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
			return (a = t ? t.displayName || t.name : "") ? it(a) : "";
		}
		function Be(t, i) {
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
		function Le(t) {
			try {
				var i = "",
					a = null;
				do ((i += Be(t, a)), (a = t), (t = t.return));
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
		var Et = Object.prototype.hasOwnProperty,
			at = n.unstable_scheduleCallback,
			ue = n.unstable_cancelCallback,
			Oe = n.unstable_shouldYield,
			ht = n.unstable_requestPaint,
			Ne = n.unstable_now,
			Tt = n.unstable_getCurrentPriorityLevel,
			Ft = n.unstable_ImmediatePriority,
			St = n.unstable_UserBlockingPriority,
			kt = n.unstable_NormalPriority,
			vu = n.unstable_LowPriority,
			hi = n.unstable_IdlePriority,
			ua = n.log,
			re = n.unstable_setDisableYieldValue,
			ve = null,
			_e = null;
		function xt(t) {
			if ((typeof ua == "function" && re(t), _e && typeof _e.setStrictMode == "function"))
				try {
					_e.setStrictMode(ve, t);
				} catch {}
		}
		var Ve = Math.clz32 ? Math.clz32 : Pi,
			Kt = Math.log,
			an = Math.LN2;
		function Pi(t) {
			return ((t >>>= 0), t === 0 ? 32 : (31 - ((Kt(t) / an) | 0)) | 0);
		}
		var ut = 256,
			Nn = 262144,
			kn = 4194304;
		function wn(t) {
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
		function Ar(t, i, a) {
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
						l !== 0 ? (c = wn(l)) : ((y &= T), y !== 0 ? (c = wn(y)) : a || ((a = T & ~t), a !== 0 && (c = wn(a)))))
					: ((T = l & ~d), T !== 0 ? (c = wn(T)) : y !== 0 ? (c = wn(y)) : a || ((a = l & ~t), a !== 0 && (c = wn(a)))),
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
			var t = kn;
			return ((kn <<= 1), (kn & 62914560) === 0 && (kn = 4194304), t);
		}
		function we(t) {
			for (var i = [], a = 0; 31 > a; a++) i.push(t);
			return i;
		}
		function mt(t, i) {
			((t.pendingLanes |= i), i !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
		}
		function vt(t, i, a, l, c, d) {
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
				z = t.expirationTimes,
				V = t.hiddenUpdates;
			for (a = y & ~a; 0 < a; ) {
				var J = 31 - Ve(a),
					ne = 1 << J;
				((T[J] = 0), (z[J] = -1));
				var Z = V[J];
				if (Z !== null)
					for (V[J] = null, J = 0; J < Z.length; J++) {
						var Q = Z[J];
						Q !== null && (Q.lane &= -536870913);
					}
				a &= ~ne;
			}
			(l !== 0 && cn(t, l, 0), d !== 0 && c === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(y & ~i)));
		}
		function cn(t, i, a) {
			((t.pendingLanes |= i), (t.suspendedLanes &= ~i));
			var l = 31 - Ve(i);
			((t.entangledLanes |= i), (t.entanglements[l] = t.entanglements[l] | 1073741824 | (a & 261930)));
		}
		function Mt(t, i) {
			var a = (t.entangledLanes |= i);
			for (t = t.entanglements; a; ) {
				var l = 31 - Ve(a),
					c = 1 << l;
				((c & i) | (t[l] & i) && (t[l] |= i), (a &= ~c));
			}
		}
		function Qi(t, i) {
			var a = i & -i;
			return ((a = (a & 42) !== 0 ? 1 : ti(a)), (a & (t.suspendedLanes | i)) !== 0 ? 0 : a);
		}
		function ti(t) {
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
		function zt(t) {
			return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
		}
		function gu() {
			var t = H.p;
			return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : ky(t.type));
		}
		function yu(t, i) {
			var a = H.p;
			try {
				return ((H.p = t), i());
			} finally {
				H.p = a;
			}
		}
		var Ki = Math.random().toString(36).slice(2),
			Xt = "__reactFiber$" + Ki,
			fn = "__reactProps$" + Ki,
			pu = "__reactContainer$" + Ki,
			ec = "__reactEvents$" + Ki,
			HS = "__reactListeners$" + Ki,
			PS = "__reactHandles$" + Ki,
			Jh = "__reactResources$" + Ki,
			bu = "__reactMarker$" + Ki;
		function tc(t) {
			(delete t[Xt], delete t[fn], delete t[ec], delete t[HS], delete t[PS]);
		}
		function la(t) {
			var i = t[Xt];
			if (i) return i;
			for (var a = t.parentNode; a; ) {
				if ((i = a[pu] || a[Xt])) {
					if (((a = i.alternate), i.child !== null || (a !== null && a.child !== null)))
						for (t = yy(t); t !== null; ) {
							if ((a = t[Xt])) return a;
							t = yy(t);
						}
					return i;
				}
				((t = a), (a = t.parentNode));
			}
			return null;
		}
		function sa(t) {
			if ((t = t[Xt] || t[pu])) {
				var i = t.tag;
				if (i === 5 || i === 6 || i === 13 || i === 31 || i === 26 || i === 27 || i === 3) return t;
			}
			return null;
		}
		function Su(t) {
			var i = t.tag;
			if (i === 5 || i === 26 || i === 27 || i === 6) return t.stateNode;
			throw Error(s(33));
		}
		function oa(t) {
			var i = t[Jh];
			return (i || (i = t[Jh] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), i);
		}
		function Yt(t) {
			t[bu] = !0;
		}
		var Wh = new Set(),
			em = {};
		function Cr(t, i) {
			(ca(t, i), ca(t + "Capture", i));
		}
		function ca(t, i) {
			for (em[t] = i, t = 0; t < i.length; t++) Wh.add(i[t]);
		}
		var QS = RegExp(
				"^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
			),
			tm = {},
			nm = {};
		function KS(t) {
			return Et.call(nm, t) ? !0 : Et.call(tm, t) ? !1 : QS.test(t) ? (nm[t] = !0) : ((tm[t] = !0), !1);
		}
		function Bl(t, i, a) {
			if (KS(i))
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
		function Il(t, i, a) {
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
		function mi(t, i, a, l) {
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
		function Mn(t) {
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
		function im(t) {
			var i = t.type;
			return (t = t.nodeName) && t.toLowerCase() === "input" && (i === "checkbox" || i === "radio");
		}
		function YS(t, i, a) {
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
		function nc(t) {
			if (!t._valueTracker) {
				var i = im(t) ? "checked" : "value";
				t._valueTracker = YS(t, i, "" + t[i]);
			}
		}
		function rm(t) {
			if (!t) return !1;
			var i = t._valueTracker;
			if (!i) return !0;
			var a = i.getValue(),
				l = "";
			return (t && (l = im(t) ? (t.checked ? "true" : "false") : t.value), (t = l), t !== a ? (i.setValue(t), !0) : !1);
		}
		function Vl(t) {
			if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")) return null;
			try {
				return t.activeElement || t.body;
			} catch {
				return t.body;
			}
		}
		var GS = /[\n"\\]/g;
		function zn(t) {
			return t.replace(GS, function (i) {
				return "\\" + i.charCodeAt(0).toString(16) + " ";
			});
		}
		function ic(t, i, a, l, c, d, y, T) {
			((t.name = ""),
				y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean"
					? (t.type = y)
					: t.removeAttribute("type"),
				i != null
					? y === "number"
						? ((i === 0 && t.value === "") || t.value != i) && (t.value = "" + Mn(i))
						: t.value !== "" + Mn(i) && (t.value = "" + Mn(i))
					: (y !== "submit" && y !== "reset") || t.removeAttribute("value"),
				i != null ? rc(t, y, Mn(i)) : a != null ? rc(t, y, Mn(a)) : l != null && t.removeAttribute("value"),
				c == null && d != null && (t.defaultChecked = !!d),
				c != null && (t.checked = c && typeof c != "function" && typeof c != "symbol"),
				T != null && typeof T != "function" && typeof T != "symbol" && typeof T != "boolean"
					? (t.name = "" + Mn(T))
					: t.removeAttribute("name"));
		}
		function am(t, i, a, l, c, d, y, T) {
			if (
				(d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (t.type = d),
				i != null || a != null)
			) {
				if (!((d !== "submit" && d !== "reset") || i != null)) {
					nc(t);
					return;
				}
				((a = a != null ? "" + Mn(a) : ""),
					(i = i != null ? "" + Mn(i) : a),
					T || i === t.value || (t.value = i),
					(t.defaultValue = i));
			}
			((l = l ?? c),
				(l = typeof l != "function" && typeof l != "symbol" && !!l),
				(t.checked = T ? t.checked : !!l),
				(t.defaultChecked = !!l),
				y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (t.name = y),
				nc(t));
		}
		function rc(t, i, a) {
			(i === "number" && Vl(t.ownerDocument) === t) || t.defaultValue === "" + a || (t.defaultValue = "" + a);
		}
		function fa(t, i, a, l) {
			if (((t = t.options), i)) {
				i = {};
				for (var c = 0; c < a.length; c++) i["$" + a[c]] = !0;
				for (a = 0; a < t.length; a++)
					((c = i.hasOwnProperty("$" + t[a].value)),
						t[a].selected !== c && (t[a].selected = c),
						c && l && (t[a].defaultSelected = !0));
			} else {
				for (a = "" + Mn(a), i = null, c = 0; c < t.length; c++) {
					if (t[c].value === a) {
						((t[c].selected = !0), l && (t[c].defaultSelected = !0));
						return;
					}
					i !== null || t[c].disabled || (i = t[c]);
				}
				i !== null && (i.selected = !0);
			}
		}
		function um(t, i, a) {
			if (i != null && ((i = "" + Mn(i)), i !== t.value && (t.value = i), a == null)) {
				t.defaultValue !== i && (t.defaultValue = i);
				return;
			}
			t.defaultValue = a != null ? "" + Mn(a) : "";
		}
		function lm(t, i, a, l) {
			if (i == null) {
				if (l != null) {
					if (a != null) throw Error(s(92));
					if (O(l)) {
						if (1 < l.length) throw Error(s(93));
						l = l[0];
					}
					a = l;
				}
				((a ??= ""), (i = a));
			}
			((a = Mn(i)),
				(t.defaultValue = a),
				(l = t.textContent),
				l === a && l !== "" && l !== null && (t.value = l),
				nc(t));
		}
		function da(t, i) {
			if (i) {
				var a = t.firstChild;
				if (a && a === t.lastChild && a.nodeType === 3) {
					a.nodeValue = i;
					return;
				}
			}
			t.textContent = i;
		}
		var FS = new Set(
			"animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
				" ",
			),
		);
		function sm(t, i, a) {
			var l = i.indexOf("--") === 0;
			a == null || typeof a == "boolean" || a === ""
				? l
					? t.setProperty(i, "")
					: i === "float"
						? (t.cssFloat = "")
						: (t[i] = "")
				: l
					? t.setProperty(i, a)
					: typeof a != "number" || a === 0 || FS.has(i)
						? i === "float"
							? (t.cssFloat = a)
							: (t[i] = ("" + a).trim())
						: (t[i] = a + "px");
		}
		function om(t, i, a) {
			if (i != null && typeof i != "object") throw Error(s(62));
			if (((t = t.style), a != null)) {
				for (var l in a)
					!a.hasOwnProperty(l) ||
						(i != null && i.hasOwnProperty(l)) ||
						(l.indexOf("--") === 0 ? t.setProperty(l, "") : l === "float" ? (t.cssFloat = "") : (t[l] = ""));
				for (var c in i) ((l = i[c]), i.hasOwnProperty(c) && a[c] !== l && sm(t, c, l));
			} else for (var d in i) i.hasOwnProperty(d) && sm(t, d, i[d]);
		}
		function ac(t) {
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
		var XS = new Map([
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
			JS =
				/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
		function Zl(t) {
			return JS.test("" + t)
				? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
				: t;
		}
		function vi() {}
		var uc = null;
		function lc(t) {
			return (
				(t = t.target || t.srcElement || window),
				t.correspondingUseElement && (t = t.correspondingUseElement),
				t.nodeType === 3 ? t.parentNode : t
			);
		}
		var ha = null,
			ma = null;
		function cm(t) {
			var i = sa(t);
			if (i && (t = i.stateNode)) {
				var a = t[fn] || null;
				e: switch (((t = i.stateNode), i.type)) {
					case "input":
						if (
							(ic(t, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name),
							(i = a.name),
							a.type === "radio" && i != null)
						) {
							for (a = t; a.parentNode; ) a = a.parentNode;
							for (a = a.querySelectorAll('input[name="' + zn("" + i) + '"][type="radio"]'), i = 0; i < a.length; i++) {
								var l = a[i];
								if (l !== t && l.form === t.form) {
									var c = l[fn] || null;
									if (!c) throw Error(s(90));
									ic(l, c.value, c.defaultValue, c.defaultValue, c.checked, c.defaultChecked, c.type, c.name);
								}
							}
							for (i = 0; i < a.length; i++) ((l = a[i]), l.form === t.form && rm(l));
						}
						break e;
					case "textarea":
						um(t, a.value, a.defaultValue);
						break e;
					case "select":
						((i = a.value), i != null && fa(t, !!a.multiple, i, !1));
				}
			}
		}
		var sc = !1;
		function fm(t, i, a) {
			if (sc) return t(i, a);
			sc = !0;
			try {
				return t(i);
			} finally {
				if (((sc = !1), (ha !== null || ma !== null) && (Ns(), ha && ((i = ha), (t = ma), (ma = ha = null), cm(i), t))))
					for (i = 0; i < t.length; i++) cm(t[i]);
			}
		}
		function _u(t, i) {
			var a = t.stateNode;
			if (a === null) return null;
			var l = a[fn] || null;
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
		var gi = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
			oc = !1;
		if (gi)
			try {
				var wu = {};
				(Object.defineProperty(wu, "passive", {
					get: function () {
						oc = !0;
					},
				}),
					window.addEventListener("test", wu, wu),
					window.removeEventListener("test", wu, wu));
			} catch {
				oc = !1;
			}
		var Yi = null,
			cc = null,
			Hl = null;
		function dm() {
			if (Hl) return Hl;
			var t,
				i = cc,
				a = i.length,
				l,
				c = "value" in Yi ? Yi.value : Yi.textContent,
				d = c.length;
			for (t = 0; t < a && i[t] === c[t]; t++);
			var y = a - t;
			for (l = 1; l <= y && i[a - l] === c[d - l]; l++);
			return (Hl = c.slice(t, 1 < l ? 1 - l : void 0));
		}
		function Pl(t) {
			var i = t.keyCode;
			return (
				"charCode" in t ? ((t = t.charCode), t === 0 && i === 13 && (t = 13)) : (t = i),
				t === 10 && (t = 13),
				32 <= t || t === 13 ? t : 0
			);
		}
		function Ql() {
			return !0;
		}
		function hm() {
			return !1;
		}
		function dn(t) {
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
						? Ql
						: hm),
					(this.isPropagationStopped = hm),
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
							(this.isDefaultPrevented = Ql));
					},
					stopPropagation: function () {
						var a = this.nativeEvent;
						a &&
							(a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
							(this.isPropagationStopped = Ql));
					},
					persist: function () {},
					isPersistent: Ql,
				}),
				i
			);
		}
		var Rr = {
				eventPhase: 0,
				bubbles: 0,
				cancelable: 0,
				timeStamp: function (t) {
					return t.timeStamp || Date.now();
				},
				defaultPrevented: 0,
				isTrusted: 0,
			},
			Kl = dn(Rr),
			Eu = b({}, Rr, { view: 0, detail: 0 }),
			WS = dn(Eu),
			fc,
			dc,
			Tu,
			Yl = b({}, Eu, {
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
				getModifierState: mc,
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
						: (t !== Tu &&
								(Tu && t.type === "mousemove"
									? ((fc = t.screenX - Tu.screenX), (dc = t.screenY - Tu.screenY))
									: (dc = fc = 0),
								(Tu = t)),
							fc);
				},
				movementY: function (t) {
					return "movementY" in t ? t.movementY : dc;
				},
			}),
			mm = dn(Yl),
			e_ = dn(b({}, Yl, { dataTransfer: 0 })),
			hc = dn(b({}, Eu, { relatedTarget: 0 })),
			t_ = dn(b({}, Rr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
			n_ = dn(
				b({}, Rr, {
					clipboardData: function (t) {
						return "clipboardData" in t ? t.clipboardData : window.clipboardData;
					},
				}),
			),
			vm = dn(b({}, Rr, { data: 0 })),
			i_ = {
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
			r_ = {
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
			a_ = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
		function u_(t) {
			var i = this.nativeEvent;
			return i.getModifierState ? i.getModifierState(t) : (t = a_[t]) ? !!i[t] : !1;
		}
		function mc() {
			return u_;
		}
		var l_ = dn(
				b({}, Eu, {
					key: function (t) {
						if (t.key) {
							var i = i_[t.key] || t.key;
							if (i !== "Unidentified") return i;
						}
						return t.type === "keypress"
							? ((t = Pl(t)), t === 13 ? "Enter" : String.fromCharCode(t))
							: t.type === "keydown" || t.type === "keyup"
								? r_[t.keyCode] || "Unidentified"
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
					getModifierState: mc,
					charCode: function (t) {
						return t.type === "keypress" ? Pl(t) : 0;
					},
					keyCode: function (t) {
						return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
					which: function (t) {
						return t.type === "keypress" ? Pl(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
				}),
			),
			gm = dn(
				b({}, Yl, {
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
			s_ = dn(
				b({}, Eu, {
					touches: 0,
					targetTouches: 0,
					changedTouches: 0,
					altKey: 0,
					metaKey: 0,
					ctrlKey: 0,
					shiftKey: 0,
					getModifierState: mc,
				}),
			),
			o_ = dn(b({}, Rr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
			c_ = dn(
				b({}, Yl, {
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
			f_ = dn(b({}, Rr, { newState: 0, oldState: 0 })),
			d_ = [9, 13, 27, 32],
			vc = gi && "CompositionEvent" in window,
			xu = null;
		gi && "documentMode" in document && (xu = document.documentMode);
		var h_ = gi && "TextEvent" in window && !xu,
			ym = gi && (!vc || (xu && 8 < xu && 11 >= xu)),
			pm = " ",
			bm = !1;
		function Sm(t, i) {
			switch (t) {
				case "keyup":
					return d_.indexOf(i.keyCode) !== -1;
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
		function _m(t) {
			return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
		}
		var va = !1;
		function m_(t, i) {
			switch (t) {
				case "compositionend":
					return _m(i);
				case "keypress":
					return i.which !== 32 ? null : ((bm = !0), pm);
				case "textInput":
					return ((t = i.data), t === pm && bm ? null : t);
				default:
					return null;
			}
		}
		function v_(t, i) {
			if (va)
				return t === "compositionend" || (!vc && Sm(t, i)) ? ((t = dm()), (Hl = cc = Yi = null), (va = !1), t) : null;
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
					return ym && i.locale !== "ko" ? null : i.data;
				default:
					return null;
			}
		}
		var g_ = {
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
		function wm(t) {
			var i = t && t.nodeName && t.nodeName.toLowerCase();
			return i === "input" ? !!g_[t.type] : i === "textarea";
		}
		function Em(t, i, a, l) {
			(ha ? (ma ? ma.push(l) : (ma = [l])) : (ha = l),
				(i = qs(i, "onChange")),
				0 < i.length && ((a = new Kl("onChange", "change", null, a, l)), t.push({ event: a, listeners: i })));
		}
		var Au = null,
			Cu = null;
		function y_(t) {
			ny(t, 0);
		}
		function Gl(t) {
			if (rm(Su(t))) return t;
		}
		function Tm(t, i) {
			if (t === "change") return i;
		}
		var xm = !1;
		if (gi) {
			var gc;
			if (gi) {
				var yc = "oninput" in document;
				if (!yc) {
					var Am = document.createElement("div");
					(Am.setAttribute("oninput", "return;"), (yc = typeof Am.oninput == "function"));
				}
				gc = yc;
			} else gc = !1;
			xm = gc && (!document.documentMode || 9 < document.documentMode);
		}
		function Cm() {
			Au && (Au.detachEvent("onpropertychange", Rm), (Cu = Au = null));
		}
		function Rm(t) {
			if (t.propertyName === "value" && Gl(Cu)) {
				var i = [];
				(Em(i, Cu, t, lc(t)), fm(y_, i));
			}
		}
		function p_(t, i, a) {
			t === "focusin" ? (Cm(), (Au = i), (Cu = a), Au.attachEvent("onpropertychange", Rm)) : t === "focusout" && Cm();
		}
		function b_(t) {
			if (t === "selectionchange" || t === "keyup" || t === "keydown") return Gl(Cu);
		}
		function S_(t, i) {
			if (t === "click") return Gl(i);
		}
		function __(t, i) {
			if (t === "input" || t === "change") return Gl(i);
		}
		function w_(t, i) {
			return (t === i && (t !== 0 || 1 / t === 1 / i)) || (t !== t && i !== i);
		}
		var En = typeof Object.is == "function" ? Object.is : w_;
		function Ru(t, i) {
			if (En(t, i)) return !0;
			if (typeof t != "object" || t === null || typeof i != "object" || i === null) return !1;
			var a = Object.keys(t),
				l = Object.keys(i);
			if (a.length !== l.length) return !1;
			for (l = 0; l < a.length; l++) {
				var c = a[l];
				if (!Et.call(i, c) || !En(t[c], i[c])) return !1;
			}
			return !0;
		}
		function Om(t) {
			for (; t && t.firstChild; ) t = t.firstChild;
			return t;
		}
		function Nm(t, i) {
			var a = Om(t);
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
				a = Om(a);
			}
		}
		function km(t, i) {
			return t && i
				? t === i
					? !0
					: t && t.nodeType === 3
						? !1
						: i && i.nodeType === 3
							? km(t, i.parentNode)
							: "contains" in t
								? t.contains(i)
								: t.compareDocumentPosition
									? !!(t.compareDocumentPosition(i) & 16)
									: !1
				: !1;
		}
		function Mm(t) {
			t =
				t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
					? t.ownerDocument.defaultView
					: window;
			for (var i = Vl(t.document); i instanceof t.HTMLIFrameElement; ) {
				try {
					var a = typeof i.contentWindow.location.href == "string";
				} catch {
					a = !1;
				}
				if (a) t = i.contentWindow;
				else break;
				i = Vl(t.document);
			}
			return i;
		}
		function pc(t) {
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
		var E_ = gi && "documentMode" in document && 11 >= document.documentMode,
			ga = null,
			bc = null,
			Ou = null,
			Sc = !1;
		function zm(t, i, a) {
			var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
			Sc ||
				ga == null ||
				ga !== Vl(l) ||
				((l = ga),
				"selectionStart" in l && pc(l)
					? (l = { start: l.selectionStart, end: l.selectionEnd })
					: ((l = ((l.ownerDocument && l.ownerDocument.defaultView) || window).getSelection()),
						(l = {
							anchorNode: l.anchorNode,
							anchorOffset: l.anchorOffset,
							focusNode: l.focusNode,
							focusOffset: l.focusOffset,
						})),
				(Ou && Ru(Ou, l)) ||
					((Ou = l),
					(l = qs(bc, "onSelect")),
					0 < l.length &&
						((i = new Kl("onSelect", "select", null, i, a)), t.push({ event: i, listeners: l }), (i.target = ga))));
		}
		function Or(t, i) {
			var a = {};
			return ((a[t.toLowerCase()] = i.toLowerCase()), (a["Webkit" + t] = "webkit" + i), (a["Moz" + t] = "moz" + i), a);
		}
		var ya = {
				animationend: Or("Animation", "AnimationEnd"),
				animationiteration: Or("Animation", "AnimationIteration"),
				animationstart: Or("Animation", "AnimationStart"),
				transitionrun: Or("Transition", "TransitionRun"),
				transitionstart: Or("Transition", "TransitionStart"),
				transitioncancel: Or("Transition", "TransitionCancel"),
				transitionend: Or("Transition", "TransitionEnd"),
			},
			_c = {},
			Dm = {};
		gi &&
			((Dm = document.createElement("div").style),
			"AnimationEvent" in window ||
				(delete ya.animationend.animation, delete ya.animationiteration.animation, delete ya.animationstart.animation),
			"TransitionEvent" in window || delete ya.transitionend.transition);
		function Nr(t) {
			if (_c[t]) return _c[t];
			if (!ya[t]) return t;
			var i = ya[t],
				a;
			for (a in i) if (i.hasOwnProperty(a) && a in Dm) return (_c[t] = i[a]);
			return t;
		}
		var jm = Nr("animationend"),
			Lm = Nr("animationiteration"),
			qm = Nr("animationstart"),
			T_ = Nr("transitionrun"),
			x_ = Nr("transitionstart"),
			A_ = Nr("transitioncancel"),
			Um = Nr("transitionend"),
			$m = new Map(),
			wc =
				"abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
					" ",
				);
		wc.push("scrollEnd");
		function Yn(t, i) {
			($m.set(t, i), Cr(i, [t]));
		}
		var Fl =
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
			Dn = [],
			pa = 0,
			Ec = 0;
		function Xl() {
			for (var t = pa, i = (Ec = pa = 0); i < t; ) {
				var a = Dn[i];
				Dn[i++] = null;
				var l = Dn[i];
				Dn[i++] = null;
				var c = Dn[i];
				Dn[i++] = null;
				var d = Dn[i];
				if (((Dn[i++] = null), l !== null && c !== null)) {
					var y = l.pending;
					(y === null ? (c.next = c) : ((c.next = y.next), (y.next = c)), (l.pending = c));
				}
				d !== 0 && Bm(a, c, d);
			}
		}
		function Jl(t, i, a, l) {
			((Dn[pa++] = t),
				(Dn[pa++] = i),
				(Dn[pa++] = a),
				(Dn[pa++] = l),
				(Ec |= l),
				(t.lanes |= l),
				(t = t.alternate),
				t !== null && (t.lanes |= l));
		}
		function Tc(t, i, a, l) {
			return (Jl(t, i, a, l), Wl(t));
		}
		function kr(t, i) {
			return (Jl(t, null, null, i), Wl(t));
		}
		function Bm(t, i, a) {
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
						((c = 31 - Ve(a)),
						(t = d.hiddenUpdates),
						(l = t[c]),
						l === null ? (t[c] = [i]) : l.push(i),
						(i.lane = a | 536870912)),
					d)
				: null;
		}
		function Wl(t) {
			if (50 < Xu) throw ((Xu = 0), (Df = null), Error(s(185)));
			for (var i = t.return; i !== null; ) ((t = i), (i = t.return));
			return t.tag === 3 ? t.stateNode : null;
		}
		var ba = {};
		function C_(t, i, a, l) {
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
		function Tn(t, i, a, l) {
			return new C_(t, i, a, l);
		}
		function xc(t) {
			return ((t = t.prototype), !(!t || !t.isReactComponent));
		}
		function yi(t, i) {
			var a = t.alternate;
			return (
				a === null
					? ((a = Tn(t.tag, i, t.key, t.mode)),
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
		function Im(t, i) {
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
		function es(t, i, a, l, c, d) {
			var y = 0;
			if (((l = t), typeof t == "function")) xc(t) && (y = 1);
			else if (typeof t == "string")
				y = zw(t, a, oe.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
			else
				e: switch (t) {
					case K:
						return ((t = Tn(31, a, i, c)), (t.elementType = K), (t.lanes = d), t);
					case k:
						return Mr(a.children, c, d, i);
					case D:
						((y = 8), (c |= 24));
						break;
					case C:
						return ((t = Tn(12, a, i, c | 2)), (t.elementType = C), (t.lanes = d), t);
					case Y:
						return ((t = Tn(13, a, i, c)), (t.elementType = Y), (t.lanes = d), t);
					case P:
						return ((t = Tn(19, a, i, c)), (t.elementType = P), (t.lanes = d), t);
					default:
						if (typeof t == "object" && t !== null)
							switch (t.$$typeof) {
								case R:
									y = 10;
									break e;
								case A:
									y = 9;
									break e;
								case M:
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
			return ((i = Tn(y, a, i, c)), (i.elementType = t), (i.type = l), (i.lanes = d), i);
		}
		function Mr(t, i, a, l) {
			return ((t = Tn(7, t, l, i)), (t.lanes = a), t);
		}
		function Ac(t, i, a) {
			return ((t = Tn(6, t, null, i)), (t.lanes = a), t);
		}
		function Vm(t) {
			var i = Tn(18, null, null, 0);
			return ((i.stateNode = t), i);
		}
		function Cc(t, i, a) {
			return (
				(i = Tn(4, t.children !== null ? t.children : [], t.key, i)),
				(i.lanes = a),
				(i.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }),
				i
			);
		}
		var Zm = new WeakMap();
		function jn(t, i) {
			if (typeof t == "object" && t !== null) {
				var a = Zm.get(t);
				return a !== void 0 ? a : ((i = { value: t, source: i, stack: Le(i) }), Zm.set(t, i), i);
			}
			return { value: t, source: i, stack: Le(i) };
		}
		var Sa = [],
			_a = 0,
			ts = null,
			Nu = 0,
			Ln = [],
			qn = 0,
			Gi = null,
			ni = 1,
			ii = "";
		function pi(t, i) {
			((Sa[_a++] = Nu), (Sa[_a++] = ts), (ts = t), (Nu = i));
		}
		function Hm(t, i, a) {
			((Ln[qn++] = ni), (Ln[qn++] = ii), (Ln[qn++] = Gi), (Gi = t));
			var l = ni;
			t = ii;
			var c = 32 - Ve(l) - 1;
			((l &= ~(1 << c)), (a += 1));
			var d = 32 - Ve(i) + c;
			if (30 < d) {
				var y = c - (c % 5);
				((d = (l & ((1 << y) - 1)).toString(32)),
					(l >>= y),
					(c -= y),
					(ni = (1 << (32 - Ve(i) + c)) | (a << c) | l),
					(ii = d + t));
			} else ((ni = (1 << d) | (a << c) | l), (ii = t));
		}
		function Rc(t) {
			t.return !== null && (pi(t, 1), Hm(t, 1, 0));
		}
		function Oc(t) {
			for (; t === ts; ) ((ts = Sa[--_a]), (Sa[_a] = null), (Nu = Sa[--_a]), (Sa[_a] = null));
			for (; t === Gi; )
				((Gi = Ln[--qn]), (Ln[qn] = null), (ii = Ln[--qn]), (Ln[qn] = null), (ni = Ln[--qn]), (Ln[qn] = null));
		}
		function Pm(t, i) {
			((Ln[qn++] = ni), (Ln[qn++] = ii), (Ln[qn++] = Gi), (ni = i.id), (ii = i.overflow), (Gi = t));
		}
		var Jt = null,
			lt = null,
			$e = !1,
			Fi = null,
			Un = !1,
			Nc = Error(s(519));
		function Xi(t) {
			throw (
				ku(jn(Error(s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), t)),
				Nc
			);
		}
		function Qm(t) {
			var i = t.stateNode,
				a = t.type,
				l = t.memoizedProps;
			switch (((i[Xt] = t), (i[fn] = l), a)) {
				case "dialog":
					(je("cancel", i), je("close", i));
					break;
				case "iframe":
				case "object":
				case "embed":
					je("load", i);
					break;
				case "video":
				case "audio":
					for (a = 0; a < Wu.length; a++) je(Wu[a], i);
					break;
				case "source":
					je("error", i);
					break;
				case "img":
				case "image":
				case "link":
					(je("error", i), je("load", i));
					break;
				case "details":
					je("toggle", i);
					break;
				case "input":
					(je("invalid", i), am(i, l.value, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name, !0));
					break;
				case "select":
					je("invalid", i);
					break;
				case "textarea":
					(je("invalid", i), lm(i, l.value, l.defaultValue, l.children));
			}
			((a = l.children),
				(typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
				i.textContent === "" + a ||
				l.suppressHydrationWarning === !0 ||
				ly(i.textContent, a)
					? (l.popover != null && (je("beforetoggle", i), je("toggle", i)),
						l.onScroll != null && je("scroll", i),
						l.onScrollEnd != null && je("scrollend", i),
						l.onClick != null && (i.onclick = vi),
						(i = !0))
					: (i = !1),
				i || Xi(t, !0));
		}
		function Km(t) {
			for (Jt = t.return; Jt; )
				switch (Jt.tag) {
					case 5:
					case 31:
					case 13:
						Un = !1;
						return;
					case 27:
					case 3:
						Un = !0;
						return;
					default:
						Jt = Jt.return;
				}
		}
		function wa(t) {
			if (t !== Jt) return !1;
			if (!$e) return (Km(t), ($e = !0), !1);
			var i = t.tag,
				a;
			if (
				((a = i !== 3 && i !== 27) &&
					((a = i === 5) && ((a = t.type), (a = !(a !== "form" && a !== "button") || Yf(t.type, t.memoizedProps))),
					(a = !a)),
				a && lt && Xi(t),
				Km(t),
				i === 13)
			) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
				lt = gy(t);
			} else if (i === 31) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
				lt = gy(t);
			} else
				i === 27
					? ((i = lt), or(t.type) ? ((t = Wf), (Wf = null), (lt = t)) : (lt = i))
					: (lt = Jt ? In(t.stateNode.nextSibling) : null);
			return !0;
		}
		function zr() {
			((lt = Jt = null), ($e = !1));
		}
		function kc() {
			var t = Fi;
			return (t !== null && (gn === null ? (gn = t) : gn.push.apply(gn, t), (Fi = null)), t);
		}
		function ku(t) {
			Fi === null ? (Fi = [t]) : Fi.push(t);
		}
		var Mc = N(null),
			Dr = null,
			bi = null;
		function Ji(t, i, a) {
			(ie(Mc, i._currentValue), (i._currentValue = a));
		}
		function Si(t) {
			((t._currentValue = Mc.current), G(Mc));
		}
		function zc(t, i, a) {
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
		function Dc(t, i, a, l) {
			var c = t.child;
			for (c !== null && (c.return = t); c !== null; ) {
				var d = c.dependencies;
				if (d !== null) {
					var y = c.child;
					d = d.firstContext;
					e: for (; d !== null; ) {
						var T = d;
						d = c;
						for (var z = 0; z < i.length; z++)
							if (T.context === i[z]) {
								((d.lanes |= a), (T = d.alternate), T !== null && (T.lanes |= a), zc(d.return, a, t), l || (y = null));
								break e;
							}
						d = T.next;
					}
				} else if (c.tag === 18) {
					if (((y = c.return), y === null)) throw Error(s(341));
					((y.lanes |= a), (d = y.alternate), d !== null && (d.lanes |= a), zc(y, a, t), (y = null));
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
		function Ea(t, i, a, l) {
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
						En(c.pendingProps.value, y.value) || (t !== null ? t.push(T) : (t = [T]));
					}
				} else if (c === Se.current) {
					if (((y = c.alternate), y === null)) throw Error(s(387));
					y.memoizedState.memoizedState !== c.memoizedState.memoizedState && (t !== null ? t.push(rl) : (t = [rl]));
				}
				c = c.return;
			}
			(t !== null && Dc(i, t, a, l), (i.flags |= 262144));
		}
		function ns(t) {
			for (t = t.firstContext; t !== null; ) {
				if (!En(t.context._currentValue, t.memoizedValue)) return !0;
				t = t.next;
			}
			return !1;
		}
		function jr(t) {
			((Dr = t), (bi = null), (t = t.dependencies), t !== null && (t.firstContext = null));
		}
		function Wt(t) {
			return Ym(Dr, t);
		}
		function is(t, i) {
			return (Dr === null && jr(t), Ym(t, i));
		}
		function Ym(t, i) {
			var a = i._currentValue;
			if (((i = { context: i, memoizedValue: a, next: null }), bi === null)) {
				if (t === null) throw Error(s(308));
				((bi = i), (t.dependencies = { lanes: 0, firstContext: i }), (t.flags |= 524288));
			} else bi = bi.next = i;
			return a;
		}
		var R_ =
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
			O_ = n.unstable_scheduleCallback,
			N_ = n.unstable_NormalPriority,
			Dt = { $$typeof: R, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
		function jc() {
			return { controller: new R_(), data: new Map(), refCount: 0 };
		}
		function Mu(t) {
			(t.refCount--,
				t.refCount === 0 &&
					O_(N_, function () {
						t.controller.abort();
					}));
		}
		var zu = null,
			Lc = 0,
			Ta = 0,
			xa = null;
		function k_(t, i) {
			if (zu === null) {
				var a = (zu = []);
				((Lc = 0),
					(Ta = Bf()),
					(xa = {
						status: "pending",
						value: void 0,
						then: function (l) {
							a.push(l);
						},
					}));
			}
			return (Lc++, i.then(Gm, Gm), i);
		}
		function Gm() {
			if (--Lc === 0 && zu !== null) {
				xa !== null && (xa.status = "fulfilled");
				var t = zu;
				((zu = null), (Ta = 0), (xa = null));
				for (var i = 0; i < t.length; i++) (0, t[i])();
			}
		}
		function M_(t, i) {
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
		var Fm = $.S;
		$.S = function (t, i) {
			((Ng = Ne()),
				typeof i == "object" && i !== null && typeof i.then == "function" && k_(t, i),
				Fm !== null && Fm(t, i));
		};
		var Lr = N(null);
		function qc() {
			var t = Lr.current;
			return t !== null ? t : nt.pooledCache;
		}
		function rs(t, i) {
			i === null ? ie(Lr, Lr.current) : ie(Lr, i.pool);
		}
		function Xm() {
			var t = qc();
			return t === null ? null : { parent: Dt._currentValue, pool: t };
		}
		var Aa = Error(s(460)),
			Uc = Error(s(474)),
			as = Error(s(542)),
			us = { then: function () {} };
		function Jm(t) {
			return ((t = t.status), t === "fulfilled" || t === "rejected");
		}
		function Wm(t, i, a) {
			switch (((a = t[a]), a === void 0 ? t.push(i) : a !== i && (i.then(vi, vi), (i = a)), i.status)) {
				case "fulfilled":
					return i.value;
				case "rejected":
					throw ((t = i.reason), tv(t), t);
				default:
					if (typeof i.status == "string") i.then(vi, vi);
					else {
						if (((t = nt), t !== null && 100 < t.shellSuspendCounter)) throw Error(s(482));
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
							throw ((t = i.reason), tv(t), t);
					}
					throw ((Ur = i), Aa);
			}
		}
		function qr(t) {
			try {
				var i = t._init;
				return i(t._payload);
			} catch (a) {
				throw a !== null && typeof a == "object" && typeof a.then == "function" ? ((Ur = a), Aa) : a;
			}
		}
		var Ur = null;
		function ev() {
			if (Ur === null) throw Error(s(459));
			var t = Ur;
			return ((Ur = null), t);
		}
		function tv(t) {
			if (t === Aa || t === as) throw Error(s(483));
		}
		var Ca = null,
			Du = 0;
		function ls(t) {
			var i = Du;
			return ((Du += 1), Ca === null && (Ca = []), Wm(Ca, t, i));
		}
		function ju(t, i) {
			((i = i.props.ref), (t.ref = i !== void 0 ? i : null));
		}
		function ss(t, i) {
			throw i.$$typeof === p
				? Error(s(525))
				: ((t = Object.prototype.toString.call(i)),
					Error(s(31, t === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : t)));
		}
		function nv(t) {
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
				return ((U = yi(U, L)), (U.index = 0), (U.sibling = null), U);
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
			function T(U, L, I, ee) {
				return L === null || L.tag !== 6
					? ((L = Ac(I, U.mode, ee)), (L.return = U), L)
					: ((L = c(L, I)), (L.return = U), L);
			}
			function z(U, L, I, ee) {
				var be = I.type;
				return be === k
					? J(U, L, I.props.children, ee, I.key)
					: L !== null &&
						  (L.elementType === be || (typeof be == "object" && be !== null && be.$$typeof === q && qr(be) === L.type))
						? ((L = c(L, I.props)), ju(L, I), (L.return = U), L)
						: ((L = es(I.type, I.key, I.props, null, U.mode, ee)), ju(L, I), (L.return = U), L);
			}
			function V(U, L, I, ee) {
				return L === null ||
					L.tag !== 4 ||
					L.stateNode.containerInfo !== I.containerInfo ||
					L.stateNode.implementation !== I.implementation
					? ((L = Cc(I, U.mode, ee)), (L.return = U), L)
					: ((L = c(L, I.children || [])), (L.return = U), L);
			}
			function J(U, L, I, ee, be) {
				return L === null || L.tag !== 7
					? ((L = Mr(I, U.mode, ee, be)), (L.return = U), L)
					: ((L = c(L, I)), (L.return = U), L);
			}
			function ne(U, L, I) {
				if ((typeof L == "string" && L !== "") || typeof L == "number" || typeof L == "bigint")
					return ((L = Ac("" + L, U.mode, I)), (L.return = U), L);
				if (typeof L == "object" && L !== null) {
					switch (L.$$typeof) {
						case E:
							return ((I = es(L.type, L.key, L.props, null, U.mode, I)), ju(I, L), (I.return = U), I);
						case x:
							return ((L = Cc(L, U.mode, I)), (L.return = U), L);
						case q:
							return ((L = qr(L)), ne(U, L, I));
					}
					if (O(L) || X(L)) return ((L = Mr(L, U.mode, I, null)), (L.return = U), L);
					if (typeof L.then == "function") return ne(U, ls(L), I);
					if (L.$$typeof === R) return ne(U, is(U, L), I);
					ss(U, L);
				}
				return null;
			}
			function Z(U, L, I, ee) {
				var be = L !== null ? L.key : null;
				if ((typeof I == "string" && I !== "") || typeof I == "number" || typeof I == "bigint")
					return be !== null ? null : T(U, L, "" + I, ee);
				if (typeof I == "object" && I !== null) {
					switch (I.$$typeof) {
						case E:
							return I.key === be ? z(U, L, I, ee) : null;
						case x:
							return I.key === be ? V(U, L, I, ee) : null;
						case q:
							return ((I = qr(I)), Z(U, L, I, ee));
					}
					if (O(I) || X(I)) return be !== null ? null : J(U, L, I, ee, null);
					if (typeof I.then == "function") return Z(U, L, ls(I), ee);
					if (I.$$typeof === R) return Z(U, L, is(U, I), ee);
					ss(U, I);
				}
				return null;
			}
			function Q(U, L, I, ee, be) {
				if ((typeof ee == "string" && ee !== "") || typeof ee == "number" || typeof ee == "bigint")
					return ((U = U.get(I) || null), T(L, U, "" + ee, be));
				if (typeof ee == "object" && ee !== null) {
					switch (ee.$$typeof) {
						case E:
							return ((U = U.get(ee.key === null ? I : ee.key) || null), z(L, U, ee, be));
						case x:
							return ((U = U.get(ee.key === null ? I : ee.key) || null), V(L, U, ee, be));
						case q:
							return ((ee = qr(ee)), Q(U, L, I, ee, be));
					}
					if (O(ee) || X(ee)) return ((U = U.get(I) || null), J(L, U, ee, be, null));
					if (typeof ee.then == "function") return Q(U, L, I, ls(ee), be);
					if (ee.$$typeof === R) return Q(U, L, I, is(L, ee), be);
					ss(L, ee);
				}
				return null;
			}
			function de(U, L, I, ee) {
				for (var be = null, Ze = null, me = L, Me = (L = 0), Ue = null; me !== null && Me < I.length; Me++) {
					me.index > Me ? ((Ue = me), (me = null)) : (Ue = me.sibling);
					var He = Z(U, me, I[Me], ee);
					if (He === null) {
						me === null && (me = Ue);
						break;
					}
					(t && me && He.alternate === null && i(U, me),
						(L = d(He, L, Me)),
						Ze === null ? (be = He) : (Ze.sibling = He),
						(Ze = He),
						(me = Ue));
				}
				if (Me === I.length) return (a(U, me), $e && pi(U, Me), be);
				if (me === null) {
					for (; Me < I.length; Me++)
						((me = ne(U, I[Me], ee)),
							me !== null && ((L = d(me, L, Me)), Ze === null ? (be = me) : (Ze.sibling = me), (Ze = me)));
					return ($e && pi(U, Me), be);
				}
				for (me = l(me); Me < I.length; Me++)
					((Ue = Q(me, U, Me, I[Me], ee)),
						Ue !== null &&
							(t && Ue.alternate !== null && me.delete(Ue.key === null ? Me : Ue.key),
							(L = d(Ue, L, Me)),
							Ze === null ? (be = Ue) : (Ze.sibling = Ue),
							(Ze = Ue)));
				return (
					t &&
						me.forEach(function (mr) {
							return i(U, mr);
						}),
					$e && pi(U, Me),
					be
				);
			}
			function Te(U, L, I, ee) {
				if (I == null) throw Error(s(151));
				for (
					var be = null, Ze = null, me = L, Me = (L = 0), Ue = null, He = I.next();
					me !== null && !He.done;
					Me++, He = I.next()
				) {
					me.index > Me ? ((Ue = me), (me = null)) : (Ue = me.sibling);
					var mr = Z(U, me, He.value, ee);
					if (mr === null) {
						me === null && (me = Ue);
						break;
					}
					(t && me && mr.alternate === null && i(U, me),
						(L = d(mr, L, Me)),
						Ze === null ? (be = mr) : (Ze.sibling = mr),
						(Ze = mr),
						(me = Ue));
				}
				if (He.done) return (a(U, me), $e && pi(U, Me), be);
				if (me === null) {
					for (; !He.done; Me++, He = I.next())
						((He = ne(U, He.value, ee)),
							He !== null && ((L = d(He, L, Me)), Ze === null ? (be = He) : (Ze.sibling = He), (Ze = He)));
					return ($e && pi(U, Me), be);
				}
				for (me = l(me); !He.done; Me++, He = I.next())
					((He = Q(me, U, Me, He.value, ee)),
						He !== null &&
							(t && He.alternate !== null && me.delete(He.key === null ? Me : He.key),
							(L = d(He, L, Me)),
							Ze === null ? (be = He) : (Ze.sibling = He),
							(Ze = He)));
				return (
					t &&
						me.forEach(function (Kw) {
							return i(U, Kw);
						}),
					$e && pi(U, Me),
					be
				);
			}
			function et(U, L, I, ee) {
				if (
					(typeof I == "object" && I !== null && I.type === k && I.key === null && (I = I.props.children),
					typeof I == "object" && I !== null)
				) {
					switch (I.$$typeof) {
						case E:
							e: {
								for (var be = I.key; L !== null; ) {
									if (L.key === be) {
										if (((be = I.type), be === k)) {
											if (L.tag === 7) {
												(a(U, L.sibling), (ee = c(L, I.props.children)), (ee.return = U), (U = ee));
												break e;
											}
										} else if (
											L.elementType === be ||
											(typeof be == "object" && be !== null && be.$$typeof === q && qr(be) === L.type)
										) {
											(a(U, L.sibling), (ee = c(L, I.props)), ju(ee, I), (ee.return = U), (U = ee));
											break e;
										}
										a(U, L);
										break;
									} else i(U, L);
									L = L.sibling;
								}
								I.type === k
									? ((ee = Mr(I.props.children, U.mode, ee, I.key)), (ee.return = U), (U = ee))
									: ((ee = es(I.type, I.key, I.props, null, U.mode, ee)), ju(ee, I), (ee.return = U), (U = ee));
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
											(a(U, L.sibling), (ee = c(L, I.children || [])), (ee.return = U), (U = ee));
											break e;
										} else {
											a(U, L);
											break;
										}
									else i(U, L);
									L = L.sibling;
								}
								((ee = Cc(I, U.mode, ee)), (ee.return = U), (U = ee));
							}
							return y(U);
						case q:
							return ((I = qr(I)), et(U, L, I, ee));
					}
					if (O(I)) return de(U, L, I, ee);
					if (X(I)) {
						if (((be = X(I)), typeof be != "function")) throw Error(s(150));
						return ((I = be.call(I)), Te(U, L, I, ee));
					}
					if (typeof I.then == "function") return et(U, L, ls(I), ee);
					if (I.$$typeof === R) return et(U, L, is(U, I), ee);
					ss(U, I);
				}
				return (typeof I == "string" && I !== "") || typeof I == "number" || typeof I == "bigint"
					? ((I = "" + I),
						L !== null && L.tag === 6
							? (a(U, L.sibling), (ee = c(L, I)), (ee.return = U), (U = ee))
							: (a(U, L), (ee = Ac(I, U.mode, ee)), (ee.return = U), (U = ee)),
						y(U))
					: a(U, L);
			}
			return function (U, L, I, ee) {
				try {
					Du = 0;
					var be = et(U, L, I, ee);
					return ((Ca = null), be);
				} catch (me) {
					if (me === Aa || me === as) throw me;
					var Ze = Tn(29, me, null, U.mode);
					return ((Ze.lanes = ee), (Ze.return = U), Ze);
				}
			};
		}
		var $r = nv(!0),
			iv = nv(!1),
			Wi = !1;
		function $c(t) {
			t.updateQueue = {
				baseState: t.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: { pending: null, lanes: 0, hiddenCallbacks: null },
				callbacks: null,
			};
		}
		function Bc(t, i) {
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
		function Br(t) {
			return { lane: t, tag: 0, payload: null, callback: null, next: null };
		}
		function Ir(t, i, a) {
			var l = t.updateQueue;
			if (l === null) return null;
			if (((l = l.shared), (Qe & 2) !== 0)) {
				var c = l.pending;
				return (
					c === null ? (i.next = i) : ((i.next = c.next), (c.next = i)),
					(l.pending = i),
					(i = Wl(t)),
					Bm(t, null, a),
					i
				);
			}
			return (Jl(t, l, i, a), Wl(t));
		}
		function Lu(t, i, a) {
			if (((i = i.updateQueue), i !== null && ((i = i.shared), (a & 4194048) !== 0))) {
				var l = i.lanes;
				((l &= t.pendingLanes), (a |= l), (i.lanes = a), Mt(t, a));
			}
		}
		function Ic(t, i) {
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
		var Vc = !1;
		function qu() {
			if (Vc) {
				var t = xa;
				if (t !== null) throw t;
			}
		}
		function Uu(t, i, a, l) {
			Vc = !1;
			var c = t.updateQueue;
			Wi = !1;
			var d = c.firstBaseUpdate,
				y = c.lastBaseUpdate,
				T = c.shared.pending;
			if (T !== null) {
				c.shared.pending = null;
				var z = T,
					V = z.next;
				((z.next = null), y === null ? (d = V) : (y.next = V), (y = z));
				var J = t.alternate;
				J !== null &&
					((J = J.updateQueue),
					(T = J.lastBaseUpdate),
					T !== y && (T === null ? (J.firstBaseUpdate = V) : (T.next = V), (J.lastBaseUpdate = z)));
			}
			if (d !== null) {
				var ne = c.baseState;
				((y = 0), (J = V = z = null), (T = d));
				do {
					var Z = T.lane & -536870913,
						Q = Z !== T.lane;
					if (Q ? (qe & Z) === Z : (l & Z) === Z) {
						(Z !== 0 && Z === Ta && (Vc = !0),
							J !== null && (J = J.next = { lane: 0, tag: T.tag, payload: T.payload, callback: null, next: null }));
						e: {
							var de = t,
								Te = T;
							Z = i;
							var et = a;
							switch (Te.tag) {
								case 1:
									if (((de = Te.payload), typeof de == "function")) {
										ne = de.call(et, ne, Z);
										break e;
									}
									ne = de;
									break e;
								case 3:
									de.flags = (de.flags & -65537) | 128;
								case 0:
									if (((de = Te.payload), (Z = typeof de == "function" ? de.call(et, ne, Z) : de), Z == null)) break e;
									ne = b({}, ne, Z);
									break e;
								case 2:
									Wi = !0;
							}
						}
						((Z = T.callback),
							Z !== null &&
								((t.flags |= 64),
								Q && (t.flags |= 8192),
								(Q = c.callbacks),
								Q === null ? (c.callbacks = [Z]) : Q.push(Z)));
					} else
						((Q = { lane: Z, tag: T.tag, payload: T.payload, callback: T.callback, next: null }),
							J === null ? ((V = J = Q), (z = ne)) : (J = J.next = Q),
							(y |= Z));
					if (((T = T.next), T === null)) {
						if (((T = c.shared.pending), T === null)) break;
						((Q = T), (T = Q.next), (Q.next = null), (c.lastBaseUpdate = Q), (c.shared.pending = null));
					}
				} while (!0);
				(J === null && (z = ne),
					(c.baseState = z),
					(c.firstBaseUpdate = V),
					(c.lastBaseUpdate = J),
					d === null && (c.shared.lanes = 0),
					(rr |= y),
					(t.lanes = y),
					(t.memoizedState = ne));
			}
		}
		function rv(t, i) {
			if (typeof t != "function") throw Error(s(191, t));
			t.call(i);
		}
		function av(t, i) {
			var a = t.callbacks;
			if (a !== null) for (t.callbacks = null, t = 0; t < a.length; t++) rv(a[t], i);
		}
		var Ra = N(null),
			os = N(0);
		function uv(t, i) {
			((t = Oi), ie(os, t), ie(Ra, i), (Oi = t | i.baseLanes));
		}
		function Zc() {
			(ie(os, Oi), ie(Ra, Ra.current));
		}
		function Hc() {
			((Oi = os.current), G(Ra), G(os));
		}
		var xn = N(null),
			$n = null;
		function er(t) {
			var i = t.alternate;
			(ie(At, At.current & 1),
				ie(xn, t),
				$n === null && (i === null || Ra.current !== null || i.memoizedState !== null) && ($n = t));
		}
		function Pc(t) {
			(ie(At, At.current), ie(xn, t), $n === null && ($n = t));
		}
		function lv(t) {
			t.tag === 22 ? (ie(At, At.current), ie(xn, t), $n === null && ($n = t)) : tr(t);
		}
		function tr() {
			(ie(At, At.current), ie(xn, xn.current));
		}
		function An(t) {
			(G(xn), $n === t && ($n = null), G(At));
		}
		var At = N(0);
		function cs(t) {
			for (var i = t; i !== null; ) {
				if (i.tag === 13) {
					var a = i.memoizedState;
					if (a !== null && ((a = a.dehydrated), a === null || Xf(a) || Jf(a))) return i;
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
		var _i = 0,
			ke = null,
			Je = null,
			jt = null,
			fs = !1,
			Oa = !1,
			Vr = !1,
			ds = 0,
			$u = 0,
			Na = null,
			z_ = 0;
		function _t() {
			throw Error(s(321));
		}
		function Qc(t, i) {
			if (i === null) return !1;
			for (var a = 0; a < i.length && a < t.length; a++) if (!En(t[a], i[a])) return !1;
			return !0;
		}
		function Kc(t, i, a, l, c, d) {
			return (
				(_i = d),
				(ke = i),
				(i.memoizedState = null),
				(i.updateQueue = null),
				(i.lanes = 0),
				($.H = t === null || t.memoizedState === null ? Hv : of),
				(Vr = !1),
				(d = a(l, c)),
				(Vr = !1),
				Oa && (d = ov(i, a, l, c)),
				sv(t),
				d
			);
		}
		function sv(t) {
			$.H = Vu;
			var i = Je !== null && Je.next !== null;
			if (((_i = 0), (jt = Je = ke = null), (fs = !1), ($u = 0), (Na = null), i)) throw Error(s(300));
			t === null || Lt || ((t = t.dependencies), t !== null && ns(t) && (Lt = !0));
		}
		function ov(t, i, a, l) {
			ke = t;
			var c = 0;
			do {
				if ((Oa && (Na = null), ($u = 0), (Oa = !1), 25 <= c)) throw Error(s(301));
				if (((c += 1), (jt = Je = null), t.updateQueue != null)) {
					var d = t.updateQueue;
					((d.lastEffect = null), (d.events = null), (d.stores = null), d.memoCache != null && (d.memoCache.index = 0));
				}
				(($.H = Pv), (d = i(a, l)));
			} while (Oa);
			return d;
		}
		function D_() {
			var t = $.H,
				i = t.useState()[0];
			return (
				(i = typeof i.then == "function" ? Bu(i) : i),
				(t = t.useState()[0]),
				(Je !== null ? Je.memoizedState : null) !== t && (ke.flags |= 1024),
				i
			);
		}
		function Yc() {
			var t = ds !== 0;
			return ((ds = 0), t);
		}
		function Gc(t, i, a) {
			((i.updateQueue = t.updateQueue), (i.flags &= -2053), (t.lanes &= ~a));
		}
		function Fc(t) {
			if (fs) {
				for (t = t.memoizedState; t !== null; ) {
					var i = t.queue;
					(i !== null && (i.pending = null), (t = t.next));
				}
				fs = !1;
			}
			((_i = 0), (jt = Je = ke = null), (Oa = !1), ($u = ds = 0), (Na = null));
		}
		function ln() {
			var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
			return (jt === null ? (ke.memoizedState = jt = t) : (jt = jt.next = t), jt);
		}
		function Ct() {
			if (Je === null) {
				var t = ke.alternate;
				t = t !== null ? t.memoizedState : null;
			} else t = Je.next;
			var i = jt === null ? ke.memoizedState : jt.next;
			if (i !== null) ((jt = i), (Je = t));
			else {
				if (t === null) throw ke.alternate === null ? Error(s(467)) : Error(s(310));
				((Je = t),
					(t = {
						memoizedState: Je.memoizedState,
						baseState: Je.baseState,
						baseQueue: Je.baseQueue,
						queue: Je.queue,
						next: null,
					}),
					jt === null ? (ke.memoizedState = jt = t) : (jt = jt.next = t));
			}
			return jt;
		}
		function hs() {
			return { lastEffect: null, events: null, stores: null, memoCache: null };
		}
		function Bu(t) {
			var i = $u;
			return (
				($u += 1),
				Na === null && (Na = []),
				(t = Wm(Na, t, i)),
				(i = ke),
				(jt === null ? i.memoizedState : jt.next) === null &&
					((i = i.alternate), ($.H = i === null || i.memoizedState === null ? Hv : of)),
				t
			);
		}
		function ms(t) {
			if (t !== null && typeof t == "object") {
				if (typeof t.then == "function") return Bu(t);
				if (t.$$typeof === R) return Wt(t);
			}
			throw Error(s(438, String(t)));
		}
		function Xc(t) {
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
				a === null && ((a = hs()), (ke.updateQueue = a)),
				(a.memoCache = i),
				(a = i.data[i.index]),
				a === void 0)
			)
				for (a = i.data[i.index] = Array(t), l = 0; l < t; l++) a[l] = B;
			return (i.index++, a);
		}
		function wi(t, i) {
			return typeof i == "function" ? i(t) : i;
		}
		function vs(t) {
			return Jc(Ct(), Je, t);
		}
		function Jc(t, i, a) {
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
					z = null,
					V = i,
					J = !1;
				do {
					var ne = V.lane & -536870913;
					if (ne !== V.lane ? (qe & ne) === ne : (_i & ne) === ne) {
						var Z = V.revertLane;
						if (Z === 0)
							(z !== null &&
								(z = z.next =
									{
										lane: 0,
										revertLane: 0,
										gesture: null,
										action: V.action,
										hasEagerState: V.hasEagerState,
										eagerState: V.eagerState,
										next: null,
									}),
								ne === Ta && (J = !0));
						else if ((_i & Z) === Z) {
							((V = V.next), Z === Ta && (J = !0));
							continue;
						} else
							((ne = {
								lane: 0,
								revertLane: V.revertLane,
								gesture: null,
								action: V.action,
								hasEagerState: V.hasEagerState,
								eagerState: V.eagerState,
								next: null,
							}),
								z === null ? ((T = z = ne), (y = d)) : (z = z.next = ne),
								(ke.lanes |= Z),
								(rr |= Z));
						((ne = V.action), Vr && a(d, ne), (d = V.hasEagerState ? V.eagerState : a(d, ne)));
					} else
						((Z = {
							lane: ne,
							revertLane: V.revertLane,
							gesture: V.gesture,
							action: V.action,
							hasEagerState: V.hasEagerState,
							eagerState: V.eagerState,
							next: null,
						}),
							z === null ? ((T = z = Z), (y = d)) : (z = z.next = Z),
							(ke.lanes |= ne),
							(rr |= ne));
					V = V.next;
				} while (V !== null && V !== i);
				if ((z === null ? (y = d) : (z.next = T), !En(d, t.memoizedState) && ((Lt = !0), J && ((a = xa), a !== null))))
					throw a;
				((t.memoizedState = d), (t.baseState = y), (t.baseQueue = z), (l.lastRenderedState = d));
			}
			return (c === null && (l.lanes = 0), [t.memoizedState, l.dispatch]);
		}
		function Wc(t) {
			var i = Ct(),
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
				(En(d, i.memoizedState) || (Lt = !0),
					(i.memoizedState = d),
					i.baseQueue === null && (i.baseState = d),
					(a.lastRenderedState = d));
			}
			return [d, l];
		}
		function cv(t, i, a) {
			var l = ke,
				c = Ct(),
				d = $e;
			if (d) {
				if (a === void 0) throw Error(s(407));
				a = a();
			} else a = i();
			var y = !En((Je || c).memoizedState, a);
			if (
				(y && ((c.memoizedState = a), (Lt = !0)),
				(c = c.queue),
				nf(hv.bind(null, l, c, t), [t]),
				c.getSnapshot !== i || y || (jt !== null && jt.memoizedState.tag & 1))
			) {
				if (((l.flags |= 2048), ka(9, { destroy: void 0 }, dv.bind(null, l, c, a, i), null), nt === null))
					throw Error(s(349));
				d || (_i & 127) !== 0 || fv(l, i, a);
			}
			return a;
		}
		function fv(t, i, a) {
			((t.flags |= 16384),
				(t = { getSnapshot: i, value: a }),
				(i = ke.updateQueue),
				i === null
					? ((i = hs()), (ke.updateQueue = i), (i.stores = [t]))
					: ((a = i.stores), a === null ? (i.stores = [t]) : a.push(t)));
		}
		function dv(t, i, a, l) {
			((i.value = a), (i.getSnapshot = l), mv(i) && vv(t));
		}
		function hv(t, i, a) {
			return a(function () {
				mv(i) && vv(t);
			});
		}
		function mv(t) {
			var i = t.getSnapshot;
			t = t.value;
			try {
				var a = i();
				return !En(t, a);
			} catch {
				return !0;
			}
		}
		function vv(t) {
			var i = kr(t, 2);
			i !== null && yn(i, t, 2);
		}
		function ef(t) {
			var i = ln();
			if (typeof t == "function") {
				var a = t;
				if (((t = a()), Vr)) {
					xt(!0);
					try {
						a();
					} finally {
						xt(!1);
					}
				}
			}
			return (
				(i.memoizedState = i.baseState = t),
				(i.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: wi, lastRenderedState: t }),
				i
			);
		}
		function gv(t, i, a, l) {
			return ((t.baseState = a), Jc(t, Je, typeof l == "function" ? l : wi));
		}
		function j_(t, i, a, l, c) {
			if (ps(t)) throw Error(s(485));
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
					a === null ? ((d.next = i.pending = d), yv(i, d)) : ((d.next = a.next), (i.pending = a.next = d)));
			}
		}
		function yv(t, i) {
			var a = i.action,
				l = i.payload,
				c = t.state;
			if (i.isTransition) {
				var d = $.T,
					y = {};
				$.T = y;
				try {
					var T = a(c, l),
						z = $.S;
					(z !== null && z(y, T), pv(t, i, T));
				} catch (V) {
					tf(t, i, V);
				} finally {
					(d !== null && y.types !== null && (d.types = y.types), ($.T = d));
				}
			} else
				try {
					((d = a(c, l)), pv(t, i, d));
				} catch (V) {
					tf(t, i, V);
				}
		}
		function pv(t, i, a) {
			a !== null && typeof a == "object" && typeof a.then == "function"
				? a.then(
						function (l) {
							bv(t, i, l);
						},
						function (l) {
							return tf(t, i, l);
						},
					)
				: bv(t, i, a);
		}
		function bv(t, i, a) {
			((i.status = "fulfilled"),
				(i.value = a),
				Sv(i),
				(t.state = a),
				(i = t.pending),
				i !== null && ((a = i.next), a === i ? (t.pending = null) : ((a = a.next), (i.next = a), yv(t, a))));
		}
		function tf(t, i, a) {
			var l = t.pending;
			if (((t.pending = null), l !== null)) {
				l = l.next;
				do ((i.status = "rejected"), (i.reason = a), Sv(i), (i = i.next));
				while (i !== l);
			}
			t.action = null;
		}
		function Sv(t) {
			t = t.listeners;
			for (var i = 0; i < t.length; i++) (0, t[i])();
		}
		function _v(t, i) {
			return i;
		}
		function wv(t, i) {
			if ($e) {
				var a = nt.formState;
				if (a !== null) {
					e: {
						var l = ke;
						if ($e) {
							if (lt) {
								t: {
									for (var c = lt, d = Un; c.nodeType !== 8; ) {
										if (!d) {
											c = null;
											break t;
										}
										if (((c = In(c.nextSibling)), c === null)) {
											c = null;
											break t;
										}
									}
									((d = c.data), (c = d === "F!" || d === "F" ? c : null));
								}
								if (c) {
									((lt = In(c.nextSibling)), (l = c.data === "F!"));
									break e;
								}
							}
							Xi(l);
						}
						l = !1;
					}
					l && (i = a[0]);
				}
			}
			return (
				(a = ln()),
				(a.memoizedState = a.baseState = i),
				(l = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: _v, lastRenderedState: i }),
				(a.queue = l),
				(a = Iv.bind(null, ke, l)),
				(l.dispatch = a),
				(l = ef(!1)),
				(d = sf.bind(null, ke, !1, l.queue)),
				(l = ln()),
				(c = { state: i, dispatch: null, action: t, pending: null }),
				(l.queue = c),
				(a = j_.bind(null, ke, c, d, a)),
				(c.dispatch = a),
				(l.memoizedState = t),
				[i, a, !1]
			);
		}
		function Ev(t) {
			return Tv(Ct(), Je, t);
		}
		function Tv(t, i, a) {
			if (((i = Jc(t, i, _v)[0]), (t = vs(wi)[0]), typeof i == "object" && i !== null && typeof i.then == "function"))
				try {
					var l = Bu(i);
				} catch (y) {
					throw y === Aa ? as : y;
				}
			else l = i;
			i = Ct();
			var c = i.queue,
				d = c.dispatch;
			return (
				a !== i.memoizedState && ((ke.flags |= 2048), ka(9, { destroy: void 0 }, L_.bind(null, c, a), null)),
				[l, d, t]
			);
		}
		function L_(t, i) {
			t.action = i;
		}
		function xv(t) {
			var i = Ct(),
				a = Je;
			if (a !== null) return Tv(i, a, t);
			(Ct(), (i = i.memoizedState), (a = Ct()));
			var l = a.queue.dispatch;
			return ((a.memoizedState = t), [i, l, !1]);
		}
		function ka(t, i, a, l) {
			return (
				(t = { tag: t, create: a, deps: l, inst: i, next: null }),
				(i = ke.updateQueue),
				i === null && ((i = hs()), (ke.updateQueue = i)),
				(a = i.lastEffect),
				a === null ? (i.lastEffect = t.next = t) : ((l = a.next), (a.next = t), (t.next = l), (i.lastEffect = t)),
				t
			);
		}
		function Av() {
			return Ct().memoizedState;
		}
		function gs(t, i, a, l) {
			var c = ln();
			((ke.flags |= t), (c.memoizedState = ka(1 | i, { destroy: void 0 }, a, l === void 0 ? null : l)));
		}
		function ys(t, i, a, l) {
			var c = Ct();
			l = l === void 0 ? null : l;
			var d = c.memoizedState.inst;
			Je !== null && l !== null && Qc(l, Je.memoizedState.deps)
				? (c.memoizedState = ka(i, d, a, l))
				: ((ke.flags |= t), (c.memoizedState = ka(1 | i, d, a, l)));
		}
		function Cv(t, i) {
			gs(8390656, 8, t, i);
		}
		function nf(t, i) {
			ys(2048, 8, t, i);
		}
		function q_(t) {
			ke.flags |= 4;
			var i = ke.updateQueue;
			if (i === null) ((i = hs()), (ke.updateQueue = i), (i.events = [t]));
			else {
				var a = i.events;
				a === null ? (i.events = [t]) : a.push(t);
			}
		}
		function Rv(t) {
			var i = Ct().memoizedState;
			return (
				q_({ ref: i, nextImpl: t }),
				function () {
					if ((Qe & 2) !== 0) throw Error(s(440));
					return i.impl.apply(void 0, arguments);
				}
			);
		}
		function Ov(t, i) {
			return ys(4, 2, t, i);
		}
		function Nv(t, i) {
			return ys(4, 4, t, i);
		}
		function kv(t, i) {
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
		function Mv(t, i, a) {
			((a = a != null ? a.concat([t]) : null), ys(4, 4, kv.bind(null, i, t), a));
		}
		function rf() {}
		function zv(t, i) {
			var a = Ct();
			i = i === void 0 ? null : i;
			var l = a.memoizedState;
			return i !== null && Qc(i, l[1]) ? l[0] : ((a.memoizedState = [t, i]), t);
		}
		function Dv(t, i) {
			var a = Ct();
			i = i === void 0 ? null : i;
			var l = a.memoizedState;
			if (i !== null && Qc(i, l[1])) return l[0];
			if (((l = t()), Vr)) {
				xt(!0);
				try {
					t();
				} finally {
					xt(!1);
				}
			}
			return ((a.memoizedState = [l, i]), l);
		}
		function af(t, i, a) {
			return a === void 0 || ((_i & 1073741824) !== 0 && (qe & 261930) === 0)
				? (t.memoizedState = i)
				: ((t.memoizedState = a), (t = Mg()), (ke.lanes |= t), (rr |= t), a);
		}
		function jv(t, i, a, l) {
			return En(a, i)
				? a
				: Ra.current !== null
					? ((t = af(t, a, l)), En(t, i) || (Lt = !0), t)
					: (_i & 42) === 0 || ((_i & 1073741824) !== 0 && (qe & 261930) === 0)
						? ((Lt = !0), (t.memoizedState = a))
						: ((t = Mg()), (ke.lanes |= t), (rr |= t), i);
		}
		function Lv(t, i, a, l, c) {
			var d = H.p;
			H.p = d !== 0 && 8 > d ? d : 8;
			var y = $.T,
				T = {};
			(($.T = T), sf(t, !1, i, a));
			try {
				var z = c(),
					V = $.S;
				(V !== null && V(T, z),
					z !== null && typeof z == "object" && typeof z.then == "function"
						? Iu(t, i, M_(z, l), Bn(t))
						: Iu(t, i, l, Bn(t)));
			} catch (J) {
				Iu(t, i, { then: function () {}, status: "rejected", reason: J }, Bn());
			} finally {
				((H.p = d), y !== null && T.types !== null && (y.types = T.types), ($.T = y));
			}
		}
		function U_() {}
		function uf(t, i, a, l) {
			if (t.tag !== 5) throw Error(s(476));
			var c = qv(t).queue;
			Lv(
				t,
				c,
				i,
				le,
				a === null
					? U_
					: function () {
							return (Uv(t), a(l));
						},
			);
		}
		function qv(t) {
			var i = t.memoizedState;
			if (i !== null) return i;
			i = {
				memoizedState: le,
				baseState: le,
				baseQueue: null,
				queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: wi, lastRenderedState: le },
				next: null,
			};
			var a = {};
			return (
				(i.next = {
					memoizedState: a,
					baseState: a,
					baseQueue: null,
					queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: wi, lastRenderedState: a },
					next: null,
				}),
				(t.memoizedState = i),
				(t = t.alternate),
				t !== null && (t.memoizedState = i),
				i
			);
		}
		function Uv(t) {
			var i = qv(t);
			(i.next === null && (i = t.alternate.memoizedState), Iu(t, i.next.queue, {}, Bn()));
		}
		function lf() {
			return Wt(rl);
		}
		function $v() {
			return Ct().memoizedState;
		}
		function Bv() {
			return Ct().memoizedState;
		}
		function $_(t) {
			for (var i = t.return; i !== null; ) {
				switch (i.tag) {
					case 24:
					case 3:
						var a = Bn();
						t = Br(a);
						var l = Ir(i, t, a);
						(l !== null && (yn(l, i, a), Lu(l, i, a)), (i = { cache: jc() }), (t.payload = i));
						return;
				}
				i = i.return;
			}
		}
		function B_(t, i, a) {
			var l = Bn();
			((a = { lane: l, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null }),
				ps(t) ? Vv(i, a) : ((a = Tc(t, i, a, l)), a !== null && (yn(a, t, l), Zv(a, i, l))));
		}
		function Iv(t, i, a) {
			Iu(t, i, a, Bn());
		}
		function Iu(t, i, a, l) {
			var c = { lane: l, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null };
			if (ps(t)) Vv(i, c);
			else {
				var d = t.alternate;
				if (t.lanes === 0 && (d === null || d.lanes === 0) && ((d = i.lastRenderedReducer), d !== null))
					try {
						var y = i.lastRenderedState,
							T = d(y, a);
						if (((c.hasEagerState = !0), (c.eagerState = T), En(T, y)))
							return (Jl(t, i, c, 0), nt === null && Xl(), !1);
					} catch {}
				if (((a = Tc(t, i, c, l)), a !== null)) return (yn(a, t, l), Zv(a, i, l), !0);
			}
			return !1;
		}
		function sf(t, i, a, l) {
			if (
				((l = { lane: 2, revertLane: Bf(), gesture: null, action: l, hasEagerState: !1, eagerState: null, next: null }),
				ps(t))
			) {
				if (i) throw Error(s(479));
			} else ((i = Tc(t, a, l, 2)), i !== null && yn(i, t, 2));
		}
		function ps(t) {
			var i = t.alternate;
			return t === ke || (i !== null && i === ke);
		}
		function Vv(t, i) {
			Oa = fs = !0;
			var a = t.pending;
			(a === null ? (i.next = i) : ((i.next = a.next), (a.next = i)), (t.pending = i));
		}
		function Zv(t, i, a) {
			if ((a & 4194048) !== 0) {
				var l = i.lanes;
				((l &= t.pendingLanes), (a |= l), (i.lanes = a), Mt(t, a));
			}
		}
		var Vu = {
			readContext: Wt,
			use: ms,
			useCallback: _t,
			useContext: _t,
			useEffect: _t,
			useImperativeHandle: _t,
			useLayoutEffect: _t,
			useInsertionEffect: _t,
			useMemo: _t,
			useReducer: _t,
			useRef: _t,
			useState: _t,
			useDebugValue: _t,
			useDeferredValue: _t,
			useTransition: _t,
			useSyncExternalStore: _t,
			useId: _t,
			useHostTransitionStatus: _t,
			useFormState: _t,
			useActionState: _t,
			useOptimistic: _t,
			useMemoCache: _t,
			useCacheRefresh: _t,
		};
		Vu.useEffectEvent = _t;
		var Hv = {
				readContext: Wt,
				use: ms,
				useCallback: function (t, i) {
					return ((ln().memoizedState = [t, i === void 0 ? null : i]), t);
				},
				useContext: Wt,
				useEffect: Cv,
				useImperativeHandle: function (t, i, a) {
					((a = a != null ? a.concat([t]) : null), gs(4194308, 4, kv.bind(null, i, t), a));
				},
				useLayoutEffect: function (t, i) {
					return gs(4194308, 4, t, i);
				},
				useInsertionEffect: function (t, i) {
					gs(4, 2, t, i);
				},
				useMemo: function (t, i) {
					var a = ln();
					i = i === void 0 ? null : i;
					var l = t();
					if (Vr) {
						xt(!0);
						try {
							t();
						} finally {
							xt(!1);
						}
					}
					return ((a.memoizedState = [l, i]), l);
				},
				useReducer: function (t, i, a) {
					var l = ln();
					if (a !== void 0) {
						var c = a(i);
						if (Vr) {
							xt(!0);
							try {
								a(i);
							} finally {
								xt(!1);
							}
						}
					} else c = i;
					return (
						(l.memoizedState = l.baseState = c),
						(t = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: c }),
						(l.queue = t),
						(t = t.dispatch = B_.bind(null, ke, t)),
						[l.memoizedState, t]
					);
				},
				useRef: function (t) {
					var i = ln();
					return ((t = { current: t }), (i.memoizedState = t));
				},
				useState: function (t) {
					t = ef(t);
					var i = t.queue,
						a = Iv.bind(null, ke, i);
					return ((i.dispatch = a), [t.memoizedState, a]);
				},
				useDebugValue: rf,
				useDeferredValue: function (t, i) {
					return af(ln(), t, i);
				},
				useTransition: function () {
					var t = ef(!1);
					return ((t = Lv.bind(null, ke, t.queue, !0, !1)), (ln().memoizedState = t), [!1, t]);
				},
				useSyncExternalStore: function (t, i, a) {
					var l = ke,
						c = ln();
					if ($e) {
						if (a === void 0) throw Error(s(407));
						a = a();
					} else {
						if (((a = i()), nt === null)) throw Error(s(349));
						(qe & 127) !== 0 || fv(l, i, a);
					}
					c.memoizedState = a;
					var d = { value: a, getSnapshot: i };
					return (
						(c.queue = d),
						Cv(hv.bind(null, l, d, t), [t]),
						(l.flags |= 2048),
						ka(9, { destroy: void 0 }, dv.bind(null, l, d, a, i), null),
						a
					);
				},
				useId: function () {
					var t = ln(),
						i = nt.identifierPrefix;
					if ($e) {
						var a = ii,
							l = ni;
						((a = (l & ~(1 << (32 - Ve(l) - 1))).toString(32) + a),
							(i = "_" + i + "R_" + a),
							(a = ds++),
							0 < a && (i += "H" + a.toString(32)),
							(i += "_"));
					} else ((a = z_++), (i = "_" + i + "r_" + a.toString(32) + "_"));
					return (t.memoizedState = i);
				},
				useHostTransitionStatus: lf,
				useFormState: wv,
				useActionState: wv,
				useOptimistic: function (t) {
					var i = ln();
					i.memoizedState = i.baseState = t;
					var a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
					return ((i.queue = a), (i = sf.bind(null, ke, !0, a)), (a.dispatch = i), [t, i]);
				},
				useMemoCache: Xc,
				useCacheRefresh: function () {
					return (ln().memoizedState = $_.bind(null, ke));
				},
				useEffectEvent: function (t) {
					var i = ln(),
						a = { impl: t };
					return (
						(i.memoizedState = a),
						function () {
							if ((Qe & 2) !== 0) throw Error(s(440));
							return a.impl.apply(void 0, arguments);
						}
					);
				},
			},
			of = {
				readContext: Wt,
				use: ms,
				useCallback: zv,
				useContext: Wt,
				useEffect: nf,
				useImperativeHandle: Mv,
				useInsertionEffect: Ov,
				useLayoutEffect: Nv,
				useMemo: Dv,
				useReducer: vs,
				useRef: Av,
				useState: function () {
					return vs(wi);
				},
				useDebugValue: rf,
				useDeferredValue: function (t, i) {
					return jv(Ct(), Je.memoizedState, t, i);
				},
				useTransition: function () {
					var t = vs(wi)[0],
						i = Ct().memoizedState;
					return [typeof t == "boolean" ? t : Bu(t), i];
				},
				useSyncExternalStore: cv,
				useId: $v,
				useHostTransitionStatus: lf,
				useFormState: Ev,
				useActionState: Ev,
				useOptimistic: function (t, i) {
					return gv(Ct(), Je, t, i);
				},
				useMemoCache: Xc,
				useCacheRefresh: Bv,
			};
		of.useEffectEvent = Rv;
		var Pv = {
			readContext: Wt,
			use: ms,
			useCallback: zv,
			useContext: Wt,
			useEffect: nf,
			useImperativeHandle: Mv,
			useInsertionEffect: Ov,
			useLayoutEffect: Nv,
			useMemo: Dv,
			useReducer: Wc,
			useRef: Av,
			useState: function () {
				return Wc(wi);
			},
			useDebugValue: rf,
			useDeferredValue: function (t, i) {
				var a = Ct();
				return Je === null ? af(a, t, i) : jv(a, Je.memoizedState, t, i);
			},
			useTransition: function () {
				var t = Wc(wi)[0],
					i = Ct().memoizedState;
				return [typeof t == "boolean" ? t : Bu(t), i];
			},
			useSyncExternalStore: cv,
			useId: $v,
			useHostTransitionStatus: lf,
			useFormState: xv,
			useActionState: xv,
			useOptimistic: function (t, i) {
				var a = Ct();
				return Je !== null ? gv(a, Je, t, i) : ((a.baseState = t), [t, a.queue.dispatch]);
			},
			useMemoCache: Xc,
			useCacheRefresh: Bv,
		};
		Pv.useEffectEvent = Rv;
		function cf(t, i, a, l) {
			((i = t.memoizedState),
				(a = a(l, i)),
				(a = a == null ? i : b({}, i, a)),
				(t.memoizedState = a),
				t.lanes === 0 && (t.updateQueue.baseState = a));
		}
		var ff = {
			enqueueSetState: function (t, i, a) {
				t = t._reactInternals;
				var l = Bn(),
					c = Br(l);
				((c.payload = i), a != null && (c.callback = a), (i = Ir(t, c, l)), i !== null && (yn(i, t, l), Lu(i, t, l)));
			},
			enqueueReplaceState: function (t, i, a) {
				t = t._reactInternals;
				var l = Bn(),
					c = Br(l);
				((c.tag = 1),
					(c.payload = i),
					a != null && (c.callback = a),
					(i = Ir(t, c, l)),
					i !== null && (yn(i, t, l), Lu(i, t, l)));
			},
			enqueueForceUpdate: function (t, i) {
				t = t._reactInternals;
				var a = Bn(),
					l = Br(a);
				((l.tag = 2), i != null && (l.callback = i), (i = Ir(t, l, a)), i !== null && (yn(i, t, a), Lu(i, t, a)));
			},
		};
		function Qv(t, i, a, l, c, d, y) {
			return (
				(t = t.stateNode),
				typeof t.shouldComponentUpdate == "function"
					? t.shouldComponentUpdate(l, d, y)
					: i.prototype && i.prototype.isPureReactComponent
						? !Ru(a, l) || !Ru(c, d)
						: !0
			);
		}
		function Kv(t, i, a, l) {
			((t = i.state),
				typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(a, l),
				typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(a, l),
				i.state !== t && ff.enqueueReplaceState(i, i.state, null));
		}
		function Zr(t, i) {
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
		function I_(t) {
			Fl(t);
		}
		function V_(t) {
			console.error(t);
		}
		function Z_(t) {
			Fl(t);
		}
		function bs(t, i) {
			try {
				var a = t.onUncaughtError;
				a(i.value, { componentStack: i.stack });
			} catch (l) {
				setTimeout(function () {
					throw l;
				});
			}
		}
		function Yv(t, i, a) {
			try {
				var l = t.onCaughtError;
				l(a.value, { componentStack: a.stack, errorBoundary: i.tag === 1 ? i.stateNode : null });
			} catch (c) {
				setTimeout(function () {
					throw c;
				});
			}
		}
		function df(t, i, a) {
			return (
				(a = Br(a)),
				(a.tag = 3),
				(a.payload = { element: null }),
				(a.callback = function () {
					bs(t, i);
				}),
				a
			);
		}
		function Gv(t) {
			return ((t = Br(t)), (t.tag = 3), t);
		}
		function Fv(t, i, a, l) {
			var c = a.type.getDerivedStateFromError;
			if (typeof c == "function") {
				var d = l.value;
				((t.payload = function () {
					return c(d);
				}),
					(t.callback = function () {
						Yv(i, a, l);
					}));
			}
			var y = a.stateNode;
			y !== null &&
				typeof y.componentDidCatch == "function" &&
				(t.callback = function () {
					(Yv(i, a, l), typeof c != "function" && (ar === null ? (ar = new Set([this])) : ar.add(this)));
					var T = l.stack;
					this.componentDidCatch(l.value, { componentStack: T !== null ? T : "" });
				});
		}
		function H_(t, i, a, l, c) {
			if (((a.flags |= 32768), l !== null && typeof l == "object" && typeof l.then == "function")) {
				if (((i = a.alternate), i !== null && Ea(i, a, c, !0), (a = xn.current), a !== null)) {
					switch (a.tag) {
						case 31:
						case 13:
							return (
								$n === null ? ks() : a.alternate === null && wt === 0 && (wt = 3),
								(a.flags &= -257),
								(a.flags |= 65536),
								(a.lanes = c),
								l === us
									? (a.flags |= 16384)
									: ((i = a.updateQueue), i === null ? (a.updateQueue = new Set([l])) : i.add(l), qf(t, l, c)),
								!1
							);
						case 22:
							return (
								(a.flags |= 65536),
								l === us
									? (a.flags |= 16384)
									: ((i = a.updateQueue),
										i === null
											? ((i = { transitions: null, markerInstances: null, retryQueue: new Set([l]) }),
												(a.updateQueue = i))
											: ((a = i.retryQueue), a === null ? (i.retryQueue = new Set([l])) : a.add(l)),
										qf(t, l, c)),
								!1
							);
					}
					throw Error(s(435, a.tag));
				}
				return (qf(t, l, c), ks(), !1);
			}
			if ($e)
				return (
					(i = xn.current),
					i !== null
						? ((i.flags & 65536) === 0 && (i.flags |= 256),
							(i.flags |= 65536),
							(i.lanes = c),
							l !== Nc && ((t = Error(s(422), { cause: l })), ku(jn(t, a))))
						: (l !== Nc && ((i = Error(s(423), { cause: l })), ku(jn(i, a))),
							(t = t.current.alternate),
							(t.flags |= 65536),
							(c &= -c),
							(t.lanes |= c),
							(l = jn(l, a)),
							(c = df(t.stateNode, l, c)),
							Ic(t, c),
							wt !== 4 && (wt = 2)),
					!1
				);
			var d = Error(s(520), { cause: l });
			if (((d = jn(d, a)), Fu === null ? (Fu = [d]) : Fu.push(d), wt !== 4 && (wt = 2), i === null)) return !0;
			((l = jn(l, a)), (a = i));
			do {
				switch (a.tag) {
					case 3:
						return ((a.flags |= 65536), (t = c & -c), (a.lanes |= t), (t = df(a.stateNode, l, t)), Ic(a, t), !1);
					case 1:
						if (
							((i = a.type),
							(d = a.stateNode),
							(a.flags & 128) === 0 &&
								(typeof i.getDerivedStateFromError == "function" ||
									(d !== null && typeof d.componentDidCatch == "function" && (ar === null || !ar.has(d)))))
						)
							return ((a.flags |= 65536), (c &= -c), (a.lanes |= c), (c = Gv(c)), Fv(c, t, a, l), Ic(a, c), !1);
				}
				a = a.return;
			} while (a !== null);
			return !1;
		}
		var hf = Error(s(461)),
			Lt = !1;
		function en(t, i, a, l) {
			i.child = t === null ? iv(i, null, a, l) : $r(i, t.child, a, l);
		}
		function Xv(t, i, a, l, c) {
			a = a.render;
			var d = i.ref;
			if ("ref" in l) {
				var y = {};
				for (var T in l) T !== "ref" && (y[T] = l[T]);
			} else y = l;
			return (
				jr(i),
				(l = Kc(t, i, a, y, d, c)),
				(T = Yc()),
				t !== null && !Lt ? (Gc(t, i, c), Ei(t, i, c)) : ($e && T && Rc(i), (i.flags |= 1), en(t, i, l, c), i.child)
			);
		}
		function Jv(t, i, a, l, c) {
			if (t === null) {
				var d = a.type;
				return typeof d == "function" && !xc(d) && d.defaultProps === void 0 && a.compare === null
					? ((i.tag = 15), (i.type = d), Wv(t, i, d, l, c))
					: ((t = es(a.type, null, l, i, i.mode, c)), (t.ref = i.ref), (t.return = i), (i.child = t));
			}
			if (((d = t.child), !_f(t, c))) {
				var y = d.memoizedProps;
				if (((a = a.compare), (a = a !== null ? a : Ru), a(y, l) && t.ref === i.ref)) return Ei(t, i, c);
			}
			return ((i.flags |= 1), (t = yi(d, l)), (t.ref = i.ref), (t.return = i), (i.child = t));
		}
		function Wv(t, i, a, l, c) {
			if (t !== null) {
				var d = t.memoizedProps;
				if (Ru(d, l) && t.ref === i.ref)
					if (((Lt = !1), (i.pendingProps = l = d), _f(t, c))) (t.flags & 131072) !== 0 && (Lt = !0);
					else return ((i.lanes = t.lanes), Ei(t, i, c));
			}
			return mf(t, i, a, l, c);
		}
		function eg(t, i, a, l) {
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
					return tg(t, i, d, a, l);
				}
				if ((a & 536870912) !== 0)
					((i.memoizedState = { baseLanes: 0, cachePool: null }),
						t !== null && rs(i, d !== null ? d.cachePool : null),
						d !== null ? uv(i, d) : Zc(),
						lv(i));
				else return ((l = i.lanes = 536870912), tg(t, i, d !== null ? d.baseLanes | a : a, a, l));
			} else
				d !== null
					? (rs(i, d.cachePool), uv(i, d), tr(i), (i.memoizedState = null))
					: (t !== null && rs(i, null), Zc(), tr(i));
			return (en(t, i, c, a), i.child);
		}
		function Zu(t, i) {
			return (
				(t !== null && t.tag === 22) ||
					i.stateNode !== null ||
					(i.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				i.sibling
			);
		}
		function tg(t, i, a, l, c) {
			var d = qc();
			return (
				(d = d === null ? null : { parent: Dt._currentValue, pool: d }),
				(i.memoizedState = { baseLanes: a, cachePool: d }),
				t !== null && rs(i, null),
				Zc(),
				lv(i),
				t !== null && Ea(t, i, l, !0),
				(i.childLanes = c),
				null
			);
		}
		function Ss(t, i) {
			return (
				(i = ws({ mode: i.mode, children: i.children }, t.mode)),
				(i.ref = t.ref),
				(t.child = i),
				(i.return = t),
				i
			);
		}
		function ng(t, i, a) {
			return ($r(i, t.child, null, a), (t = Ss(i, i.pendingProps)), (t.flags |= 2), An(i), (i.memoizedState = null), t);
		}
		function P_(t, i, a) {
			var l = i.pendingProps,
				c = (i.flags & 128) !== 0;
			if (((i.flags &= -129), t === null)) {
				if ($e) {
					if (l.mode === "hidden") return ((t = Ss(i, l)), (i.lanes = 536870912), Zu(null, t));
					if (
						(Pc(i),
						(t = lt)
							? ((t = vy(t, Un)),
								(t = t !== null && t.data === "&" ? t : null),
								t !== null &&
									((i.memoizedState = {
										dehydrated: t,
										treeContext: Gi !== null ? { id: ni, overflow: ii } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = Vm(t)),
									(a.return = i),
									(i.child = a),
									(Jt = i),
									(lt = null)))
							: (t = null),
						t === null)
					)
						throw Xi(i);
					return ((i.lanes = 536870912), null);
				}
				return Ss(i, l);
			}
			var d = t.memoizedState;
			if (d !== null) {
				var y = d.dehydrated;
				if ((Pc(i), c))
					if (i.flags & 256) ((i.flags &= -257), (i = ng(t, i, a)));
					else if (i.memoizedState !== null) ((i.child = t.child), (i.flags |= 128), (i = null));
					else throw Error(s(558));
				else if ((Lt || Ea(t, i, a, !1), (c = (a & t.childLanes) !== 0), Lt || c)) {
					if (((l = nt), l !== null && ((y = Qi(l, a)), y !== 0 && y !== d.retryLane)))
						throw ((d.retryLane = y), kr(t, y), yn(l, t, y), hf);
					(ks(), (i = ng(t, i, a)));
				} else
					((t = d.treeContext),
						(lt = In(y.nextSibling)),
						(Jt = i),
						($e = !0),
						(Fi = null),
						(Un = !1),
						t !== null && Pm(i, t),
						(i = Ss(i, l)),
						(i.flags |= 4096));
				return i;
			}
			return (
				(t = yi(t.child, { mode: l.mode, children: l.children })),
				(t.ref = i.ref),
				(i.child = t),
				(t.return = i),
				t
			);
		}
		function _s(t, i) {
			var a = i.ref;
			if (a === null) t !== null && t.ref !== null && (i.flags |= 4194816);
			else {
				if (typeof a != "function" && typeof a != "object") throw Error(s(284));
				(t === null || t.ref !== a) && (i.flags |= 4194816);
			}
		}
		function mf(t, i, a, l, c) {
			return (
				jr(i),
				(a = Kc(t, i, a, l, void 0, c)),
				(l = Yc()),
				t !== null && !Lt ? (Gc(t, i, c), Ei(t, i, c)) : ($e && l && Rc(i), (i.flags |= 1), en(t, i, a, c), i.child)
			);
		}
		function ig(t, i, a, l, c, d) {
			return (
				jr(i),
				(i.updateQueue = null),
				(a = ov(i, l, a, c)),
				sv(t),
				(l = Yc()),
				t !== null && !Lt ? (Gc(t, i, d), Ei(t, i, d)) : ($e && l && Rc(i), (i.flags |= 1), en(t, i, a, d), i.child)
			);
		}
		function rg(t, i, a, l, c) {
			if ((jr(i), i.stateNode === null)) {
				var d = ba,
					y = a.contextType;
				(typeof y == "object" && y !== null && (d = Wt(y)),
					(d = new a(l, d)),
					(i.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null),
					(d.updater = ff),
					(i.stateNode = d),
					(d._reactInternals = i),
					(d = i.stateNode),
					(d.props = l),
					(d.state = i.memoizedState),
					(d.refs = {}),
					$c(i),
					(y = a.contextType),
					(d.context = typeof y == "object" && y !== null ? Wt(y) : ba),
					(d.state = i.memoizedState),
					(y = a.getDerivedStateFromProps),
					typeof y == "function" && (cf(i, a, y, l), (d.state = i.memoizedState)),
					typeof a.getDerivedStateFromProps == "function" ||
						typeof d.getSnapshotBeforeUpdate == "function" ||
						(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
						((y = d.state),
						typeof d.componentWillMount == "function" && d.componentWillMount(),
						typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(),
						y !== d.state && ff.enqueueReplaceState(d, d.state, null),
						Uu(i, l, d, c),
						qu(),
						(d.state = i.memoizedState)),
					typeof d.componentDidMount == "function" && (i.flags |= 4194308),
					(l = !0));
			} else if (t === null) {
				d = i.stateNode;
				var T = i.memoizedProps,
					z = Zr(a, T);
				d.props = z;
				var V = d.context,
					J = a.contextType;
				((y = ba), typeof J == "object" && J !== null && (y = Wt(J)));
				var ne = a.getDerivedStateFromProps;
				((J = typeof ne == "function" || typeof d.getSnapshotBeforeUpdate == "function"),
					(T = i.pendingProps !== T),
					J ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((T || V !== y) && Kv(i, d, l, y)),
					(Wi = !1));
				var Z = i.memoizedState;
				((d.state = Z),
					Uu(i, l, d, c),
					qu(),
					(V = i.memoizedState),
					T || Z !== V || Wi
						? (typeof ne == "function" && (cf(i, a, ne, l), (V = i.memoizedState)),
							(z = Wi || Qv(i, a, z, l, Z, V, y))
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
							(l = z))
						: (typeof d.componentDidMount == "function" && (i.flags |= 4194308), (l = !1)));
			} else {
				((d = i.stateNode),
					Bc(t, i),
					(y = i.memoizedProps),
					(J = Zr(a, y)),
					(d.props = J),
					(ne = i.pendingProps),
					(Z = d.context),
					(V = a.contextType),
					(z = ba),
					typeof V == "object" && V !== null && (z = Wt(V)),
					(T = a.getDerivedStateFromProps),
					(V = typeof T == "function" || typeof d.getSnapshotBeforeUpdate == "function") ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((y !== ne || Z !== z) && Kv(i, d, l, z)),
					(Wi = !1),
					(Z = i.memoizedState),
					(d.state = Z),
					Uu(i, l, d, c),
					qu());
				var Q = i.memoizedState;
				y !== ne || Z !== Q || Wi || (t !== null && t.dependencies !== null && ns(t.dependencies))
					? (typeof T == "function" && (cf(i, a, T, l), (Q = i.memoizedState)),
						(J = Wi || Qv(i, a, J, l, Z, Q, z) || (t !== null && t.dependencies !== null && ns(t.dependencies)))
							? (V ||
									(typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function") ||
									(typeof d.componentWillUpdate == "function" && d.componentWillUpdate(l, Q, z),
									typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(l, Q, z)),
								typeof d.componentDidUpdate == "function" && (i.flags |= 4),
								typeof d.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024))
							: (typeof d.componentDidUpdate != "function" ||
									(y === t.memoizedProps && Z === t.memoizedState) ||
									(i.flags |= 4),
								typeof d.getSnapshotBeforeUpdate != "function" ||
									(y === t.memoizedProps && Z === t.memoizedState) ||
									(i.flags |= 1024),
								(i.memoizedProps = l),
								(i.memoizedState = Q)),
						(d.props = l),
						(d.state = Q),
						(d.context = z),
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
				_s(t, i),
				(l = (i.flags & 128) !== 0),
				d || l
					? ((d = i.stateNode),
						(a = l && typeof a.getDerivedStateFromError != "function" ? null : d.render()),
						(i.flags |= 1),
						t !== null && l ? ((i.child = $r(i, t.child, null, c)), (i.child = $r(i, null, a, c))) : en(t, i, a, c),
						(i.memoizedState = d.state),
						(t = i.child))
					: (t = Ei(t, i, c)),
				t
			);
		}
		function ag(t, i, a, l) {
			return (zr(), (i.flags |= 256), en(t, i, a, l), i.child);
		}
		var vf = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
		function gf(t) {
			return { baseLanes: t, cachePool: Xm() };
		}
		function yf(t, i, a) {
			return ((t = t !== null ? t.childLanes & ~a : 0), i && (t |= Rn), t);
		}
		function ug(t, i, a) {
			var l = i.pendingProps,
				c = !1,
				d = (i.flags & 128) !== 0,
				y;
			if (
				((y = d) || (y = t !== null && t.memoizedState === null ? !1 : (At.current & 2) !== 0),
				y && ((c = !0), (i.flags &= -129)),
				(y = (i.flags & 32) !== 0),
				(i.flags &= -33),
				t === null)
			) {
				if ($e) {
					if (
						(c ? er(i) : tr(i),
						(t = lt)
							? ((t = vy(t, Un)),
								(t = t !== null && t.data !== "&" ? t : null),
								t !== null &&
									((i.memoizedState = {
										dehydrated: t,
										treeContext: Gi !== null ? { id: ni, overflow: ii } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = Vm(t)),
									(a.return = i),
									(i.child = a),
									(Jt = i),
									(lt = null)))
							: (t = null),
						t === null)
					)
						throw Xi(i);
					return (Jf(t) ? (i.lanes = 32) : (i.lanes = 536870912), null);
				}
				var T = l.children;
				return (
					(l = l.fallback),
					c
						? (tr(i),
							(c = i.mode),
							(T = ws({ mode: "hidden", children: T }, c)),
							(l = Mr(l, c, a, null)),
							(T.return = i),
							(l.return = i),
							(T.sibling = l),
							(i.child = T),
							(l = i.child),
							(l.memoizedState = gf(a)),
							(l.childLanes = yf(t, y, a)),
							(i.memoizedState = vf),
							Zu(null, l))
						: (er(i), pf(i, T))
				);
			}
			var z = t.memoizedState;
			if (z !== null && ((T = z.dehydrated), T !== null)) {
				if (d)
					i.flags & 256
						? (er(i), (i.flags &= -257), (i = bf(t, i, a)))
						: i.memoizedState !== null
							? (tr(i), (i.child = t.child), (i.flags |= 128), (i = null))
							: (tr(i),
								(T = l.fallback),
								(c = i.mode),
								(l = ws({ mode: "visible", children: l.children }, c)),
								(T = Mr(T, c, a, null)),
								(T.flags |= 2),
								(l.return = i),
								(T.return = i),
								(l.sibling = T),
								(i.child = l),
								$r(i, t.child, null, a),
								(l = i.child),
								(l.memoizedState = gf(a)),
								(l.childLanes = yf(t, y, a)),
								(i.memoizedState = vf),
								(i = Zu(null, l)));
				else if ((er(i), Jf(T))) {
					if (((y = T.nextSibling && T.nextSibling.dataset), y)) var V = y.dgst;
					((y = V),
						(l = Error(s(419))),
						(l.stack = ""),
						(l.digest = y),
						ku({ value: l, source: null, stack: null }),
						(i = bf(t, i, a)));
				} else if ((Lt || Ea(t, i, a, !1), (y = (a & t.childLanes) !== 0), Lt || y)) {
					if (((y = nt), y !== null && ((l = Qi(y, a)), l !== 0 && l !== z.retryLane)))
						throw ((z.retryLane = l), kr(t, l), yn(y, t, l), hf);
					(Xf(T) || ks(), (i = bf(t, i, a)));
				} else
					Xf(T)
						? ((i.flags |= 192), (i.child = t.child), (i = null))
						: ((t = z.treeContext),
							(lt = In(T.nextSibling)),
							(Jt = i),
							($e = !0),
							(Fi = null),
							(Un = !1),
							t !== null && Pm(i, t),
							(i = pf(i, l.children)),
							(i.flags |= 4096));
				return i;
			}
			return c
				? (tr(i),
					(T = l.fallback),
					(c = i.mode),
					(z = t.child),
					(V = z.sibling),
					(l = yi(z, { mode: "hidden", children: l.children })),
					(l.subtreeFlags = z.subtreeFlags & 65011712),
					V !== null ? (T = yi(V, T)) : ((T = Mr(T, c, a, null)), (T.flags |= 2)),
					(T.return = i),
					(l.return = i),
					(l.sibling = T),
					(i.child = l),
					Zu(null, l),
					(l = i.child),
					(T = t.child.memoizedState),
					T === null
						? (T = gf(a))
						: ((c = T.cachePool),
							c !== null ? ((z = Dt._currentValue), (c = c.parent !== z ? { parent: z, pool: z } : c)) : (c = Xm()),
							(T = { baseLanes: T.baseLanes | a, cachePool: c })),
					(l.memoizedState = T),
					(l.childLanes = yf(t, y, a)),
					(i.memoizedState = vf),
					Zu(t.child, l))
				: (er(i),
					(a = t.child),
					(t = a.sibling),
					(a = yi(a, { mode: "visible", children: l.children })),
					(a.return = i),
					(a.sibling = null),
					t !== null && ((y = i.deletions), y === null ? ((i.deletions = [t]), (i.flags |= 16)) : y.push(t)),
					(i.child = a),
					(i.memoizedState = null),
					a);
		}
		function pf(t, i) {
			return ((i = ws({ mode: "visible", children: i }, t.mode)), (i.return = t), (t.child = i));
		}
		function ws(t, i) {
			return ((t = Tn(22, t, null, i)), (t.lanes = 0), t);
		}
		function bf(t, i, a) {
			return (
				$r(i, t.child, null, a),
				(t = pf(i, i.pendingProps.children)),
				(t.flags |= 2),
				(i.memoizedState = null),
				t
			);
		}
		function lg(t, i, a) {
			t.lanes |= i;
			var l = t.alternate;
			(l !== null && (l.lanes |= i), zc(t.return, i, a));
		}
		function Sf(t, i, a, l, c, d) {
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
		function sg(t, i, a) {
			var l = i.pendingProps,
				c = l.revealOrder,
				d = l.tail;
			l = l.children;
			var y = At.current,
				T = (y & 2) !== 0;
			if (
				(T ? ((y = (y & 1) | 2), (i.flags |= 128)) : (y &= 1),
				ie(At, y),
				en(t, i, l, a),
				(l = $e ? Nu : 0),
				!T && t !== null && (t.flags & 128) !== 0)
			)
				e: for (t = i.child; t !== null; ) {
					if (t.tag === 13) t.memoizedState !== null && lg(t, a, i);
					else if (t.tag === 19) lg(t, a, i);
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
						((t = a.alternate), t !== null && cs(t) === null && (c = a), (a = a.sibling));
					((a = c),
						a === null ? ((c = i.child), (i.child = null)) : ((c = a.sibling), (a.sibling = null)),
						Sf(i, !1, c, a, d, l));
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (a = null, c = i.child, i.child = null; c !== null; ) {
						if (((t = c.alternate), t !== null && cs(t) === null)) {
							i.child = c;
							break;
						}
						((t = c.sibling), (c.sibling = a), (a = c), (c = t));
					}
					Sf(i, !0, a, null, d, l);
					break;
				case "together":
					Sf(i, !1, null, null, void 0, l);
					break;
				default:
					i.memoizedState = null;
			}
			return i.child;
		}
		function Ei(t, i, a) {
			if ((t !== null && (i.dependencies = t.dependencies), (rr |= i.lanes), (a & i.childLanes) === 0))
				if (t !== null) {
					if ((Ea(t, i, a, !1), (a & i.childLanes) === 0)) return null;
				} else return null;
			if (t !== null && i.child !== t.child) throw Error(s(153));
			if (i.child !== null) {
				for (t = i.child, a = yi(t, t.pendingProps), i.child = a, a.return = i; t.sibling !== null; )
					((t = t.sibling), (a = a.sibling = yi(t, t.pendingProps)), (a.return = i));
				a.sibling = null;
			}
			return i.child;
		}
		function _f(t, i) {
			return (t.lanes & i) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && ns(t)));
		}
		function Q_(t, i, a) {
			switch (i.tag) {
				case 3:
					(Pe(i, i.stateNode.containerInfo), Ji(i, Dt, t.memoizedState.cache), zr());
					break;
				case 27:
				case 5:
					rt(i);
					break;
				case 4:
					Pe(i, i.stateNode.containerInfo);
					break;
				case 10:
					Ji(i, i.type, i.memoizedProps.value);
					break;
				case 31:
					if (i.memoizedState !== null) return ((i.flags |= 128), Pc(i), null);
					break;
				case 13:
					var l = i.memoizedState;
					if (l !== null)
						return l.dehydrated !== null
							? (er(i), (i.flags |= 128), null)
							: (a & i.child.childLanes) !== 0
								? ug(t, i, a)
								: (er(i), (t = Ei(t, i, a)), t !== null ? t.sibling : null);
					er(i);
					break;
				case 19:
					var c = (t.flags & 128) !== 0;
					if (((l = (a & i.childLanes) !== 0), l || (Ea(t, i, a, !1), (l = (a & i.childLanes) !== 0)), c)) {
						if (l) return sg(t, i, a);
						i.flags |= 128;
					}
					if (
						((c = i.memoizedState),
						c !== null && ((c.rendering = null), (c.tail = null), (c.lastEffect = null)),
						ie(At, At.current),
						l)
					)
						break;
					return null;
				case 22:
					return ((i.lanes = 0), eg(t, i, a, i.pendingProps));
				case 24:
					Ji(i, Dt, t.memoizedState.cache);
			}
			return Ei(t, i, a);
		}
		function og(t, i, a) {
			if (t !== null)
				if (t.memoizedProps !== i.pendingProps) Lt = !0;
				else {
					if (!_f(t, a) && (i.flags & 128) === 0) return ((Lt = !1), Q_(t, i, a));
					Lt = (t.flags & 131072) !== 0;
				}
			else ((Lt = !1), $e && (i.flags & 1048576) !== 0 && Hm(i, Nu, i.index));
			switch (((i.lanes = 0), i.tag)) {
				case 16:
					e: {
						var l = i.pendingProps;
						if (((t = qr(i.elementType)), (i.type = t), typeof t == "function"))
							xc(t)
								? ((l = Zr(t, l)), (i.tag = 1), (i = rg(null, i, t, l, a)))
								: ((i.tag = 0), (i = mf(null, i, t, l, a)));
						else {
							if (t != null) {
								var c = t.$$typeof;
								if (c === M) {
									((i.tag = 11), (i = Xv(null, i, t, l, a)));
									break e;
								} else if (c === j) {
									((i.tag = 14), (i = Jv(null, i, t, l, a)));
									break e;
								}
							}
							throw ((i = ae(t) || t), Error(s(306, i, "")));
						}
					}
					return i;
				case 0:
					return mf(t, i, i.type, i.pendingProps, a);
				case 1:
					return ((l = i.type), (c = Zr(l, i.pendingProps)), rg(t, i, l, c, a));
				case 3:
					e: {
						if ((Pe(i, i.stateNode.containerInfo), t === null)) throw Error(s(387));
						l = i.pendingProps;
						var d = i.memoizedState;
						((c = d.element), Bc(t, i), Uu(i, l, null, a));
						var y = i.memoizedState;
						if (
							((l = y.cache), Ji(i, Dt, l), l !== d.cache && Dc(i, [Dt], a, !0), qu(), (l = y.element), d.isDehydrated)
						)
							if (
								((d = { element: l, isDehydrated: !1, cache: y.cache }),
								(i.updateQueue.baseState = d),
								(i.memoizedState = d),
								i.flags & 256)
							) {
								i = ag(t, i, l, a);
								break e;
							} else if (l !== c) {
								((c = jn(Error(s(424)), i)), ku(c), (i = ag(t, i, l, a)));
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
									lt = In(t.firstChild), Jt = i, $e = !0, Fi = null, Un = !0, a = iv(i, null, l, a), i.child = a;
									a;
								)
									((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
							}
						else {
							if ((zr(), l === c)) {
								i = Ei(t, i, a);
								break e;
							}
							en(t, i, l, a);
						}
						i = i.child;
					}
					return i;
				case 26:
					return (
						_s(t, i),
						t === null
							? (a = _y(i.type, null, i.pendingProps, null))
								? (i.memoizedState = a)
								: $e ||
									((a = i.type),
									(t = i.pendingProps),
									(l = Us(ye.current).createElement(a)),
									(l[Xt] = i),
									(l[fn] = t),
									tn(l, a, t),
									Yt(l),
									(i.stateNode = l))
							: (i.memoizedState = _y(i.type, t.memoizedProps, i.pendingProps, t.memoizedState)),
						null
					);
				case 27:
					return (
						rt(i),
						t === null &&
							$e &&
							((l = i.stateNode = py(i.type, i.pendingProps, ye.current)),
							(Jt = i),
							(Un = !0),
							(c = lt),
							or(i.type) ? ((Wf = c), (lt = In(l.firstChild))) : (lt = c)),
						en(t, i, i.pendingProps.children, a),
						_s(t, i),
						t === null && (i.flags |= 4194304),
						i.child
					);
				case 5:
					return (
						t === null &&
							$e &&
							((c = l = lt) &&
								((l = Sw(l, i.type, i.pendingProps, Un)),
								l !== null ? ((i.stateNode = l), (Jt = i), (lt = In(l.firstChild)), (Un = !1), (c = !0)) : (c = !1)),
							c || Xi(i)),
						rt(i),
						(c = i.type),
						(d = i.pendingProps),
						(y = t !== null ? t.memoizedProps : null),
						(l = d.children),
						Yf(c, d) ? (l = null) : y !== null && Yf(c, y) && (i.flags |= 32),
						i.memoizedState !== null && ((c = Kc(t, i, D_, null, null, a)), (rl._currentValue = c)),
						_s(t, i),
						en(t, i, l, a),
						i.child
					);
				case 6:
					return (
						t === null &&
							$e &&
							((t = a = lt) &&
								((a = _w(a, i.pendingProps, Un)),
								a !== null ? ((i.stateNode = a), (Jt = i), (lt = null), (t = !0)) : (t = !1)),
							t || Xi(i)),
						null
					);
				case 13:
					return ug(t, i, a);
				case 4:
					return (
						Pe(i, i.stateNode.containerInfo),
						(l = i.pendingProps),
						t === null ? (i.child = $r(i, null, l, a)) : en(t, i, l, a),
						i.child
					);
				case 11:
					return Xv(t, i, i.type, i.pendingProps, a);
				case 7:
					return (en(t, i, i.pendingProps, a), i.child);
				case 8:
					return (en(t, i, i.pendingProps.children, a), i.child);
				case 12:
					return (en(t, i, i.pendingProps.children, a), i.child);
				case 10:
					return ((l = i.pendingProps), Ji(i, i.type, l.value), en(t, i, l.children, a), i.child);
				case 9:
					return (
						(c = i.type._context),
						(l = i.pendingProps.children),
						jr(i),
						(c = Wt(c)),
						(l = l(c)),
						(i.flags |= 1),
						en(t, i, l, a),
						i.child
					);
				case 14:
					return Jv(t, i, i.type, i.pendingProps, a);
				case 15:
					return Wv(t, i, i.type, i.pendingProps, a);
				case 19:
					return sg(t, i, a);
				case 31:
					return P_(t, i, a);
				case 22:
					return eg(t, i, a, i.pendingProps);
				case 24:
					return (
						jr(i),
						(l = Wt(Dt)),
						t === null
							? ((c = qc()),
								c === null &&
									((c = nt),
									(d = jc()),
									(c.pooledCache = d),
									d.refCount++,
									d !== null && (c.pooledCacheLanes |= a),
									(c = d)),
								(i.memoizedState = { parent: l, cache: c }),
								$c(i),
								Ji(i, Dt, c))
							: ((t.lanes & a) !== 0 && (Bc(t, i), Uu(i, null, null, a), qu()),
								(c = t.memoizedState),
								(d = i.memoizedState),
								c.parent !== l
									? ((c = { parent: l, cache: l }),
										(i.memoizedState = c),
										i.lanes === 0 && (i.memoizedState = i.updateQueue.baseState = c),
										Ji(i, Dt, l))
									: ((l = d.cache), Ji(i, Dt, l), l !== c.cache && Dc(i, [Dt], a, !0))),
						en(t, i, i.pendingProps.children, a),
						i.child
					);
				case 29:
					throw i.pendingProps;
			}
			throw Error(s(156, i.tag));
		}
		function Ti(t) {
			t.flags |= 4;
		}
		function wf(t, i, a, l, c) {
			if (((i = (t.mode & 32) !== 0) && (i = !1), i)) {
				if (((t.flags |= 16777216), (c & 335544128) === c))
					if (t.stateNode.complete) t.flags |= 8192;
					else if (Lg()) t.flags |= 8192;
					else throw ((Ur = us), Uc);
			} else t.flags &= -16777217;
		}
		function cg(t, i) {
			if (i.type !== "stylesheet" || (i.state.loading & 4) !== 0) t.flags &= -16777217;
			else if (((t.flags |= 16777216), !Ay(i)))
				if (Lg()) t.flags |= 8192;
				else throw ((Ur = us), Uc);
		}
		function Es(t, i) {
			(i !== null && (t.flags |= 4),
				t.flags & 16384 && ((i = t.tag !== 22 ? Ae() : 536870912), (t.lanes |= i), (ja |= i)));
		}
		function Hu(t, i) {
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
		function st(t) {
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
		function K_(t, i, a) {
			var l = i.pendingProps;
			switch ((Oc(i), i.tag)) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14:
					return (st(i), null);
				case 1:
					return (st(i), null);
				case 3:
					return (
						(a = i.stateNode),
						(l = null),
						t !== null && (l = t.memoizedState.cache),
						i.memoizedState.cache !== l && (i.flags |= 2048),
						Si(Dt),
						ze(),
						a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
						(t === null || t.child === null) &&
							(wa(i)
								? Ti(i)
								: t === null || (t.memoizedState.isDehydrated && (i.flags & 256) === 0) || ((i.flags |= 1024), kc())),
						st(i),
						null
					);
				case 26:
					var c = i.type,
						d = i.memoizedState;
					return (
						t === null
							? (Ti(i), d !== null ? (st(i), cg(i, d)) : (st(i), wf(i, c, null, l, a)))
							: d
								? d !== t.memoizedState
									? (Ti(i), st(i), cg(i, d))
									: (st(i), (i.flags &= -16777217))
								: ((t = t.memoizedProps), t !== l && Ti(i), st(i), wf(i, c, t, l, a)),
						null
					);
				case 27:
					if ((Nt(i), (a = ye.current), (c = i.type), t !== null && i.stateNode != null))
						t.memoizedProps !== l && Ti(i);
					else {
						if (!l) {
							if (i.stateNode === null) throw Error(s(166));
							return (st(i), null);
						}
						((t = oe.current), wa(i) ? Qm(i, t) : ((t = py(c, l, a)), (i.stateNode = t), Ti(i)));
					}
					return (st(i), null);
				case 5:
					if ((Nt(i), (c = i.type), t !== null && i.stateNode != null)) t.memoizedProps !== l && Ti(i);
					else {
						if (!l) {
							if (i.stateNode === null) throw Error(s(166));
							return (st(i), null);
						}
						if (((d = oe.current), wa(i))) Qm(i, d);
						else {
							var y = Us(ye.current);
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
							((d[Xt] = i), (d[fn] = l));
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
							e: switch ((tn(d, c, l), c)) {
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
							l && Ti(i);
						}
					}
					return (st(i), wf(i, i.type, t === null ? null : t.memoizedProps, i.pendingProps, a), null);
				case 6:
					if (t && i.stateNode != null) t.memoizedProps !== l && Ti(i);
					else {
						if (typeof l != "string" && i.stateNode === null) throw Error(s(166));
						if (((t = ye.current), wa(i))) {
							if (((t = i.stateNode), (a = i.memoizedProps), (l = null), (c = Jt), c !== null))
								switch (c.tag) {
									case 27:
									case 5:
										l = c.memoizedProps;
								}
							((t[Xt] = i),
								(t = !!(t.nodeValue === a || (l !== null && l.suppressHydrationWarning === !0) || ly(t.nodeValue, a))),
								t || Xi(i, !0));
						} else ((t = Us(t).createTextNode(l)), (t[Xt] = i), (i.stateNode = t));
					}
					return (st(i), null);
				case 31:
					if (((a = i.memoizedState), t === null || t.memoizedState !== null)) {
						if (((l = wa(i)), a !== null)) {
							if (t === null) {
								if (!l) throw Error(s(318));
								if (((t = i.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(557));
								t[Xt] = i;
							} else (zr(), (i.flags & 128) === 0 && (i.memoizedState = null), (i.flags |= 4));
							(st(i), (t = !1));
						} else
							((a = kc()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), (t = !0));
						if (!t) return i.flags & 256 ? (An(i), i) : (An(i), null);
						if ((i.flags & 128) !== 0) throw Error(s(558));
					}
					return (st(i), null);
				case 13:
					if (
						((l = i.memoizedState), t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
					) {
						if (((c = wa(i)), l !== null && l.dehydrated !== null)) {
							if (t === null) {
								if (!c) throw Error(s(318));
								if (((c = i.memoizedState), (c = c !== null ? c.dehydrated : null), !c)) throw Error(s(317));
								c[Xt] = i;
							} else (zr(), (i.flags & 128) === 0 && (i.memoizedState = null), (i.flags |= 4));
							(st(i), (c = !1));
						} else
							((c = kc()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = c), (c = !0));
						if (!c) return i.flags & 256 ? (An(i), i) : (An(i), null);
					}
					return (
						An(i),
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
								Es(i, i.updateQueue),
								st(i),
								null)
					);
				case 4:
					return (ze(), t === null && iy(i.stateNode.containerInfo), st(i), null);
				case 10:
					return (Si(i.type), st(i), null);
				case 19:
					if ((G(At), (l = i.memoizedState), l === null)) return (st(i), null);
					if (((c = (i.flags & 128) !== 0), (d = l.rendering), d === null))
						if (c) Hu(l, !1);
						else {
							if (wt !== 0 || (t !== null && (t.flags & 128) !== 0))
								for (t = i.child; t !== null; ) {
									if (((d = cs(t)), d !== null)) {
										for (
											i.flags |= 128,
												Hu(l, !1),
												t = d.updateQueue,
												i.updateQueue = t,
												Es(i, t),
												i.subtreeFlags = 0,
												t = a,
												a = i.child;
											a !== null;
										)
											(Im(a, t), (a = a.sibling));
										return (ie(At, (At.current & 1) | 2), $e && pi(i, l.treeForkCount), i.child);
									}
									t = t.sibling;
								}
							l.tail !== null && Ne() > Rs && ((i.flags |= 128), (c = !0), Hu(l, !1), (i.lanes = 4194304));
						}
					else {
						if (!c)
							if (((t = cs(d)), t !== null)) {
								if (
									((i.flags |= 128),
									(c = !0),
									(t = t.updateQueue),
									(i.updateQueue = t),
									Es(i, t),
									Hu(l, !0),
									l.tail === null && l.tailMode === "hidden" && !d.alternate && !$e)
								)
									return (st(i), null);
							} else
								2 * Ne() - l.renderingStartTime > Rs &&
									a !== 536870912 &&
									((i.flags |= 128), (c = !0), Hu(l, !1), (i.lanes = 4194304));
						l.isBackwards
							? ((d.sibling = i.child), (i.child = d))
							: ((t = l.last), t !== null ? (t.sibling = d) : (i.child = d), (l.last = d));
					}
					return l.tail !== null
						? ((t = l.tail),
							(l.rendering = t),
							(l.tail = t.sibling),
							(l.renderingStartTime = Ne()),
							(t.sibling = null),
							(a = At.current),
							ie(At, c ? (a & 1) | 2 : a & 1),
							$e && pi(i, l.treeForkCount),
							t)
						: (st(i), null);
				case 22:
				case 23:
					return (
						An(i),
						Hc(),
						(l = i.memoizedState !== null),
						t !== null ? (t.memoizedState !== null) !== l && (i.flags |= 8192) : l && (i.flags |= 8192),
						l
							? (a & 536870912) !== 0 && (i.flags & 128) === 0 && (st(i), i.subtreeFlags & 6 && (i.flags |= 8192))
							: st(i),
						(a = i.updateQueue),
						a !== null && Es(i, a.retryQueue),
						(a = null),
						t !== null &&
							t.memoizedState !== null &&
							t.memoizedState.cachePool !== null &&
							(a = t.memoizedState.cachePool.pool),
						(l = null),
						i.memoizedState !== null && i.memoizedState.cachePool !== null && (l = i.memoizedState.cachePool.pool),
						l !== a && (i.flags |= 2048),
						t !== null && G(Lr),
						null
					);
				case 24:
					return (
						(a = null),
						t !== null && (a = t.memoizedState.cache),
						i.memoizedState.cache !== a && (i.flags |= 2048),
						Si(Dt),
						st(i),
						null
					);
				case 25:
					return null;
				case 30:
					return null;
			}
			throw Error(s(156, i.tag));
		}
		function Y_(t, i) {
			switch ((Oc(i), i.tag)) {
				case 1:
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 3:
					return (
						Si(Dt),
						ze(),
						(t = i.flags),
						(t & 65536) !== 0 && (t & 128) === 0 ? ((i.flags = (t & -65537) | 128), i) : null
					);
				case 26:
				case 27:
				case 5:
					return (Nt(i), null);
				case 31:
					if (i.memoizedState !== null) {
						if ((An(i), i.alternate === null)) throw Error(s(340));
						zr();
					}
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 13:
					if ((An(i), (t = i.memoizedState), t !== null && t.dehydrated !== null)) {
						if (i.alternate === null) throw Error(s(340));
						zr();
					}
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 19:
					return (G(At), null);
				case 4:
					return (ze(), null);
				case 10:
					return (Si(i.type), null);
				case 22:
				case 23:
					return (
						An(i),
						Hc(),
						t !== null && G(Lr),
						(t = i.flags),
						t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null
					);
				case 24:
					return (Si(Dt), null);
				case 25:
					return null;
				default:
					return null;
			}
		}
		function fg(t, i) {
			switch ((Oc(i), i.tag)) {
				case 3:
					(Si(Dt), ze());
					break;
				case 26:
				case 27:
				case 5:
					Nt(i);
					break;
				case 4:
					ze();
					break;
				case 31:
					i.memoizedState !== null && An(i);
					break;
				case 13:
					An(i);
					break;
				case 19:
					G(At);
					break;
				case 10:
					Si(i.type);
					break;
				case 22:
				case 23:
					(An(i), Hc(), t !== null && G(Lr));
					break;
				case 24:
					Si(Dt);
			}
		}
		function Pu(t, i) {
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
				Xe(i, i.return, T);
			}
		}
		function nr(t, i, a) {
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
								var z = a,
									V = T;
								try {
									V();
								} catch (J) {
									Xe(c, z, J);
								}
							}
						}
						l = l.next;
					} while (l !== d);
				}
			} catch (J) {
				Xe(i, i.return, J);
			}
		}
		function dg(t) {
			var i = t.updateQueue;
			if (i !== null) {
				var a = t.stateNode;
				try {
					av(i, a);
				} catch (l) {
					Xe(t, t.return, l);
				}
			}
		}
		function hg(t, i, a) {
			((a.props = Zr(t.type, t.memoizedProps)), (a.state = t.memoizedState));
			try {
				a.componentWillUnmount();
			} catch (l) {
				Xe(t, i, l);
			}
		}
		function Qu(t, i) {
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
				Xe(t, i, c);
			}
		}
		function ri(t, i) {
			var a = t.ref,
				l = t.refCleanup;
			if (a !== null)
				if (typeof l == "function")
					try {
						l();
					} catch (c) {
						Xe(t, i, c);
					} finally {
						((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
					}
				else if (typeof a == "function")
					try {
						a(null);
					} catch (c) {
						Xe(t, i, c);
					}
				else a.current = null;
		}
		function mg(t) {
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
				Xe(t, t.return, c);
			}
		}
		function Ef(t, i, a) {
			try {
				var l = t.stateNode;
				(mw(l, t.type, a, i), (l[fn] = i));
			} catch (c) {
				Xe(t, t.return, c);
			}
		}
		function vg(t) {
			return t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && or(t.type)) || t.tag === 4;
		}
		function Tf(t) {
			e: for (;;) {
				for (; t.sibling === null; ) {
					if (t.return === null || vg(t.return)) return null;
					t = t.return;
				}
				for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
					if ((t.tag === 27 && or(t.type)) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
					((t.child.return = t), (t = t.child));
				}
				if (!(t.flags & 2)) return t.stateNode;
			}
		}
		function xf(t, i, a) {
			var l = t.tag;
			if (l === 5 || l === 6)
				((t = t.stateNode),
					i
						? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(t, i)
						: ((i = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a),
							i.appendChild(t),
							(a = a._reactRootContainer),
							a != null || i.onclick !== null || (i.onclick = vi)));
			else if (l !== 4 && (l === 27 && or(t.type) && ((a = t.stateNode), (i = null)), (t = t.child), t !== null))
				for (xf(t, i, a), t = t.sibling; t !== null; ) (xf(t, i, a), (t = t.sibling));
		}
		function Ts(t, i, a) {
			var l = t.tag;
			if (l === 5 || l === 6) ((t = t.stateNode), i ? a.insertBefore(t, i) : a.appendChild(t));
			else if (l !== 4 && (l === 27 && or(t.type) && (a = t.stateNode), (t = t.child), t !== null))
				for (Ts(t, i, a), t = t.sibling; t !== null; ) (Ts(t, i, a), (t = t.sibling));
		}
		function gg(t) {
			var i = t.stateNode,
				a = t.memoizedProps;
			try {
				for (var l = t.type, c = i.attributes; c.length; ) i.removeAttributeNode(c[0]);
				(tn(i, l, a), (i[Xt] = t), (i[fn] = a));
			} catch (d) {
				Xe(t, t.return, d);
			}
		}
		var xi = !1,
			qt = !1,
			Af = !1,
			yg = typeof WeakSet == "function" ? WeakSet : Set,
			Gt = null;
		function G_(t, i) {
			if (((t = t.containerInfo), (Qf = Ps), (t = Mm(t)), pc(t))) {
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
								z = -1,
								V = 0,
								J = 0,
								ne = t,
								Z = null;
							t: for (;;) {
								for (
									var Q;
									ne !== a || (c !== 0 && ne.nodeType !== 3) || (T = y + c),
										ne !== d || (l !== 0 && ne.nodeType !== 3) || (z = y + l),
										ne.nodeType === 3 && (y += ne.nodeValue.length),
										(Q = ne.firstChild) !== null;
								)
									((Z = ne), (ne = Q));
								for (;;) {
									if (ne === t) break t;
									if ((Z === a && ++V === c && (T = y), Z === d && ++J === l && (z = y), (Q = ne.nextSibling) !== null))
										break;
									((ne = Z), (Z = ne.parentNode));
								}
								ne = Q;
							}
							a = T === -1 || z === -1 ? null : { start: T, end: z };
						} else a = null;
					}
				a = a || { start: 0, end: 0 };
			} else a = null;
			for (Kf = { focusedElem: t, selectionRange: a }, Ps = !1, Gt = i; Gt !== null; )
				if (((i = Gt), (t = i.child), (i.subtreeFlags & 1028) !== 0 && t !== null)) ((t.return = i), (Gt = t));
				else
					for (; Gt !== null; ) {
						switch (((i = Gt), (d = i.alternate), (t = i.flags), i.tag)) {
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
										var de = Zr(a.type, c);
										((t = l.getSnapshotBeforeUpdate(de, d)), (l.__reactInternalSnapshotBeforeUpdate = t));
									} catch (Te) {
										Xe(a, a.return, Te);
									}
								}
								break;
							case 3:
								if ((t & 1024) !== 0) {
									if (((t = i.stateNode.containerInfo), (a = t.nodeType), a === 9)) Ff(t);
									else if (a === 1)
										switch (t.nodeName) {
											case "HEAD":
											case "HTML":
											case "BODY":
												Ff(t);
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
							((t.return = i.return), (Gt = t));
							break;
						}
						Gt = i.return;
					}
		}
		function pg(t, i, a) {
			var l = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					(Ci(t, a), l & 4 && Pu(5, a));
					break;
				case 1:
					if ((Ci(t, a), l & 4))
						if (((t = a.stateNode), i === null))
							try {
								t.componentDidMount();
							} catch (y) {
								Xe(a, a.return, y);
							}
						else {
							var c = Zr(a.type, i.memoizedProps);
							i = i.memoizedState;
							try {
								t.componentDidUpdate(c, i, t.__reactInternalSnapshotBeforeUpdate);
							} catch (y) {
								Xe(a, a.return, y);
							}
						}
					(l & 64 && dg(a), l & 512 && Qu(a, a.return));
					break;
				case 3:
					if ((Ci(t, a), l & 64 && ((t = a.updateQueue), t !== null))) {
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
							av(t, i);
						} catch (y) {
							Xe(a, a.return, y);
						}
					}
					break;
				case 27:
					i === null && l & 4 && gg(a);
				case 26:
				case 5:
					(Ci(t, a), i === null && l & 4 && mg(a), l & 512 && Qu(a, a.return));
					break;
				case 12:
					Ci(t, a);
					break;
				case 31:
					(Ci(t, a), l & 4 && _g(t, a));
					break;
				case 13:
					(Ci(t, a),
						l & 4 && wg(t, a),
						l & 64 &&
							((t = a.memoizedState),
							t !== null && ((t = t.dehydrated), t !== null && ((a = rw.bind(null, a)), ww(t, a)))));
					break;
				case 22:
					if (((l = a.memoizedState !== null || xi), !l)) {
						((i = (i !== null && i.memoizedState !== null) || qt), (c = xi));
						var d = qt;
						((xi = l), (qt = i) && !d ? Ri(t, a, (a.subtreeFlags & 8772) !== 0) : Ci(t, a), (xi = c), (qt = d));
					}
					break;
				case 30:
					break;
				default:
					Ci(t, a);
			}
		}
		function bg(t) {
			var i = t.alternate;
			(i !== null && ((t.alternate = null), bg(i)),
				(t.child = null),
				(t.deletions = null),
				(t.sibling = null),
				t.tag === 5 && ((i = t.stateNode), i !== null && tc(i)),
				(t.stateNode = null),
				(t.return = null),
				(t.dependencies = null),
				(t.memoizedProps = null),
				(t.memoizedState = null),
				(t.pendingProps = null),
				(t.stateNode = null),
				(t.updateQueue = null));
		}
		var ct = null,
			hn = !1;
		function Ai(t, i, a) {
			for (a = a.child; a !== null; ) (Sg(t, i, a), (a = a.sibling));
		}
		function Sg(t, i, a) {
			if (_e && typeof _e.onCommitFiberUnmount == "function")
				try {
					_e.onCommitFiberUnmount(ve, a);
				} catch {}
			switch (a.tag) {
				case 26:
					(qt || ri(a, i),
						Ai(t, i, a),
						a.memoizedState
							? a.memoizedState.count--
							: a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
					break;
				case 27:
					qt || ri(a, i);
					var l = ct,
						c = hn;
					(or(a.type) && ((ct = a.stateNode), (hn = !1)), Ai(t, i, a), tl(a.stateNode), (ct = l), (hn = c));
					break;
				case 5:
					qt || ri(a, i);
				case 6:
					if (((l = ct), (c = hn), (ct = null), Ai(t, i, a), (ct = l), (hn = c), ct !== null))
						if (hn)
							try {
								(ct.nodeType === 9 ? ct.body : ct.nodeName === "HTML" ? ct.ownerDocument.body : ct).removeChild(
									a.stateNode,
								);
							} catch (d) {
								Xe(a, i, d);
							}
						else
							try {
								ct.removeChild(a.stateNode);
							} catch (d) {
								Xe(a, i, d);
							}
					break;
				case 18:
					ct !== null &&
						(hn
							? ((t = ct),
								hy(t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, a.stateNode),
								Za(t))
							: hy(ct, a.stateNode));
					break;
				case 4:
					((l = ct), (c = hn), (ct = a.stateNode.containerInfo), (hn = !0), Ai(t, i, a), (ct = l), (hn = c));
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					(nr(2, a, i), qt || nr(4, a, i), Ai(t, i, a));
					break;
				case 1:
					(qt || (ri(a, i), (l = a.stateNode), typeof l.componentWillUnmount == "function" && hg(a, i, l)),
						Ai(t, i, a));
					break;
				case 21:
					Ai(t, i, a);
					break;
				case 22:
					((qt = (l = qt) || a.memoizedState !== null), Ai(t, i, a), (qt = l));
					break;
				default:
					Ai(t, i, a);
			}
		}
		function _g(t, i) {
			if (i.memoizedState === null && ((t = i.alternate), t !== null && ((t = t.memoizedState), t !== null))) {
				t = t.dehydrated;
				try {
					Za(t);
				} catch (a) {
					Xe(i, i.return, a);
				}
			}
		}
		function wg(t, i) {
			if (
				i.memoizedState === null &&
				((t = i.alternate), t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
			)
				try {
					Za(t);
				} catch (a) {
					Xe(i, i.return, a);
				}
		}
		function F_(t) {
			switch (t.tag) {
				case 31:
				case 13:
				case 19:
					var i = t.stateNode;
					return (i === null && (i = t.stateNode = new yg()), i);
				case 22:
					return ((t = t.stateNode), (i = t._retryCache), i === null && (i = t._retryCache = new yg()), i);
				default:
					throw Error(s(435, t.tag));
			}
		}
		function xs(t, i) {
			var a = F_(t);
			i.forEach(function (l) {
				if (!a.has(l)) {
					a.add(l);
					var c = aw.bind(null, t, l);
					l.then(c, c);
				}
			});
		}
		function mn(t, i) {
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
								if (or(T.type)) {
									((ct = T.stateNode), (hn = !1));
									break e;
								}
								break;
							case 5:
								((ct = T.stateNode), (hn = !1));
								break e;
							case 3:
							case 4:
								((ct = T.stateNode.containerInfo), (hn = !0));
								break e;
						}
						T = T.return;
					}
					if (ct === null) throw Error(s(160));
					(Sg(d, y, c), (ct = null), (hn = !1), (d = c.alternate), d !== null && (d.return = null), (c.return = null));
				}
			if (i.subtreeFlags & 13886) for (i = i.child; i !== null; ) (Eg(i, t), (i = i.sibling));
		}
		var Gn = null;
		function Eg(t, i) {
			var a = t.alternate,
				l = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					(mn(i, t), vn(t), l & 4 && (nr(3, t, t.return), Pu(3, t), nr(5, t, t.return)));
					break;
				case 1:
					(mn(i, t),
						vn(t),
						l & 512 && (qt || a === null || ri(a, a.return)),
						l & 64 &&
							xi &&
							((t = t.updateQueue),
							t !== null &&
								((l = t.callbacks),
								l !== null &&
									((a = t.shared.hiddenCallbacks), (t.shared.hiddenCallbacks = a === null ? l : a.concat(l))))));
					break;
				case 26:
					var c = Gn;
					if ((mn(i, t), vn(t), l & 512 && (qt || a === null || ri(a, a.return)), l & 4)) {
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
														d[bu] ||
														d[Xt] ||
														d.namespaceURI === "http://www.w3.org/2000/svg" ||
														d.hasAttribute("itemprop")) &&
														((d = c.createElement(l)), c.head.insertBefore(d, c.querySelector("head > title"))),
													tn(d, l, a),
													(d[Xt] = t),
													Yt(d),
													(l = d));
												break e;
											case "link":
												var y = Ty("link", "href", c).get(l + (a.href || ""));
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
												((d = c.createElement(l)), tn(d, l, a), c.head.appendChild(d));
												break;
											case "meta":
												if ((y = Ty("meta", "content", c).get(l + (a.content || "")))) {
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
												((d = c.createElement(l)), tn(d, l, a), c.head.appendChild(d));
												break;
											default:
												throw Error(s(468, l));
										}
										((d[Xt] = t), Yt(d), (l = d));
									}
									t.stateNode = l;
								} else xy(c, t.type, t.stateNode);
							else t.stateNode = Ey(c, l, t.memoizedProps);
						else
							d !== l
								? (d === null ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a)) : d.count--,
									l === null ? xy(c, t.type, t.stateNode) : Ey(c, l, t.memoizedProps))
								: l === null && t.stateNode !== null && Ef(t, t.memoizedProps, a.memoizedProps);
					}
					break;
				case 27:
					(mn(i, t),
						vn(t),
						l & 512 && (qt || a === null || ri(a, a.return)),
						a !== null && l & 4 && Ef(t, t.memoizedProps, a.memoizedProps));
					break;
				case 5:
					if ((mn(i, t), vn(t), l & 512 && (qt || a === null || ri(a, a.return)), t.flags & 32)) {
						c = t.stateNode;
						try {
							da(c, "");
						} catch (de) {
							Xe(t, t.return, de);
						}
					}
					(l & 4 && t.stateNode != null && ((c = t.memoizedProps), Ef(t, c, a !== null ? a.memoizedProps : c)),
						l & 1024 && (Af = !0));
					break;
				case 6:
					if ((mn(i, t), vn(t), l & 4)) {
						if (t.stateNode === null) throw Error(s(162));
						((l = t.memoizedProps), (a = t.stateNode));
						try {
							a.nodeValue = l;
						} catch (de) {
							Xe(t, t.return, de);
						}
					}
					break;
				case 3:
					if (
						((Is = null),
						(c = Gn),
						(Gn = $s(i.containerInfo)),
						mn(i, t),
						(Gn = c),
						vn(t),
						l & 4 && a !== null && a.memoizedState.isDehydrated)
					)
						try {
							Za(i.containerInfo);
						} catch (de) {
							Xe(t, t.return, de);
						}
					Af && ((Af = !1), Tg(t));
					break;
				case 4:
					((l = Gn), (Gn = $s(t.stateNode.containerInfo)), mn(i, t), vn(t), (Gn = l));
					break;
				case 12:
					(mn(i, t), vn(t));
					break;
				case 31:
					(mn(i, t), vn(t), l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), xs(t, l))));
					break;
				case 13:
					(mn(i, t),
						vn(t),
						t.child.flags & 8192 &&
							(t.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
							(Cs = Ne()),
						l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), xs(t, l))));
					break;
				case 22:
					c = t.memoizedState !== null;
					var z = a !== null && a.memoizedState !== null,
						V = xi,
						J = qt;
					if (((xi = V || c), (qt = J || z), mn(i, t), (qt = J), (xi = V), vn(t), l & 8192))
						e: for (
							i = t.stateNode,
								i._visibility = c ? i._visibility & -2 : i._visibility | 1,
								c && (a === null || z || xi || qt || Hr(t)),
								a = null,
								i = t;
							;
						) {
							if (i.tag === 5 || i.tag === 26) {
								if (a === null) {
									z = a = i;
									try {
										if (((d = z.stateNode), c))
											((y = d.style),
												typeof y.setProperty == "function"
													? y.setProperty("display", "none", "important")
													: (y.display = "none"));
										else {
											T = z.stateNode;
											var ne = z.memoizedProps.style,
												Z = ne != null && ne.hasOwnProperty("display") ? ne.display : null;
											T.style.display = Z == null || typeof Z == "boolean" ? "" : ("" + Z).trim();
										}
									} catch (de) {
										Xe(z, z.return, de);
									}
								}
							} else if (i.tag === 6) {
								if (a === null) {
									z = i;
									try {
										z.stateNode.nodeValue = c ? "" : z.memoizedProps;
									} catch (de) {
										Xe(z, z.return, de);
									}
								}
							} else if (i.tag === 18) {
								if (a === null) {
									z = i;
									try {
										var Q = z.stateNode;
										c ? my(Q, !0) : my(z.stateNode, !1);
									} catch (de) {
										Xe(z, z.return, de);
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
						((l = t.updateQueue), l !== null && ((a = l.retryQueue), a !== null && ((l.retryQueue = null), xs(t, a))));
					break;
				case 19:
					(mn(i, t), vn(t), l & 4 && ((l = t.updateQueue), l !== null && ((t.updateQueue = null), xs(t, l))));
					break;
				case 30:
					break;
				case 21:
					break;
				default:
					(mn(i, t), vn(t));
			}
		}
		function vn(t) {
			var i = t.flags;
			if (i & 2) {
				try {
					for (var a, l = t.return; l !== null; ) {
						if (vg(l)) {
							a = l;
							break;
						}
						l = l.return;
					}
					if (a == null) throw Error(s(160));
					switch (a.tag) {
						case 27:
							var c = a.stateNode;
							Ts(t, Tf(t), c);
							break;
						case 5:
							var d = a.stateNode;
							(a.flags & 32 && (da(d, ""), (a.flags &= -33)), Ts(t, Tf(t), d));
							break;
						case 3:
						case 4:
							var y = a.stateNode.containerInfo;
							xf(t, Tf(t), y);
							break;
						default:
							throw Error(s(161));
					}
				} catch (T) {
					Xe(t, t.return, T);
				}
				t.flags &= -3;
			}
			i & 4096 && (t.flags &= -4097);
		}
		function Tg(t) {
			if (t.subtreeFlags & 1024)
				for (t = t.child; t !== null; ) {
					var i = t;
					(Tg(i), i.tag === 5 && i.flags & 1024 && i.stateNode.reset(), (t = t.sibling));
				}
		}
		function Ci(t, i) {
			if (i.subtreeFlags & 8772) for (i = i.child; i !== null; ) (pg(t, i.alternate, i), (i = i.sibling));
		}
		function Hr(t) {
			for (t = t.child; t !== null; ) {
				var i = t;
				switch (i.tag) {
					case 0:
					case 11:
					case 14:
					case 15:
						(nr(4, i, i.return), Hr(i));
						break;
					case 1:
						ri(i, i.return);
						var a = i.stateNode;
						(typeof a.componentWillUnmount == "function" && hg(i, i.return, a), Hr(i));
						break;
					case 27:
						tl(i.stateNode);
					case 26:
					case 5:
						(ri(i, i.return), Hr(i));
						break;
					case 22:
						i.memoizedState === null && Hr(i);
						break;
					case 30:
						Hr(i);
						break;
					default:
						Hr(i);
				}
				t = t.sibling;
			}
		}
		function Ri(t, i, a) {
			for (a = a && (i.subtreeFlags & 8772) !== 0, i = i.child; i !== null; ) {
				var l = i.alternate,
					c = t,
					d = i,
					y = d.flags;
				switch (d.tag) {
					case 0:
					case 11:
					case 15:
						(Ri(c, d, a), Pu(4, d));
						break;
					case 1:
						if ((Ri(c, d, a), (l = d), (c = l.stateNode), typeof c.componentDidMount == "function"))
							try {
								c.componentDidMount();
							} catch (V) {
								Xe(l, l.return, V);
							}
						if (((l = d), (c = l.updateQueue), c !== null)) {
							var T = l.stateNode;
							try {
								var z = c.shared.hiddenCallbacks;
								if (z !== null) for (c.shared.hiddenCallbacks = null, c = 0; c < z.length; c++) rv(z[c], T);
							} catch (V) {
								Xe(l, l.return, V);
							}
						}
						(a && y & 64 && dg(d), Qu(d, d.return));
						break;
					case 27:
						gg(d);
					case 26:
					case 5:
						(Ri(c, d, a), a && l === null && y & 4 && mg(d), Qu(d, d.return));
						break;
					case 12:
						Ri(c, d, a);
						break;
					case 31:
						(Ri(c, d, a), a && y & 4 && _g(c, d));
						break;
					case 13:
						(Ri(c, d, a), a && y & 4 && wg(c, d));
						break;
					case 22:
						(d.memoizedState === null && Ri(c, d, a), Qu(d, d.return));
						break;
					case 30:
						break;
					default:
						Ri(c, d, a);
				}
				i = i.sibling;
			}
		}
		function Cf(t, i) {
			var a = null;
			(t !== null &&
				t.memoizedState !== null &&
				t.memoizedState.cachePool !== null &&
				(a = t.memoizedState.cachePool.pool),
				(t = null),
				i.memoizedState !== null && i.memoizedState.cachePool !== null && (t = i.memoizedState.cachePool.pool),
				t !== a && (t != null && t.refCount++, a != null && Mu(a)));
		}
		function Rf(t, i) {
			((t = null),
				i.alternate !== null && (t = i.alternate.memoizedState.cache),
				(i = i.memoizedState.cache),
				i !== t && (i.refCount++, t != null && Mu(t)));
		}
		function Fn(t, i, a, l) {
			if (i.subtreeFlags & 10256) for (i = i.child; i !== null; ) (xg(t, i, a, l), (i = i.sibling));
		}
		function xg(t, i, a, l) {
			var c = i.flags;
			switch (i.tag) {
				case 0:
				case 11:
				case 15:
					(Fn(t, i, a, l), c & 2048 && Pu(9, i));
					break;
				case 1:
					Fn(t, i, a, l);
					break;
				case 3:
					(Fn(t, i, a, l),
						c & 2048 &&
							((t = null),
							i.alternate !== null && (t = i.alternate.memoizedState.cache),
							(i = i.memoizedState.cache),
							i !== t && (i.refCount++, t != null && Mu(t))));
					break;
				case 12:
					if (c & 2048) {
						(Fn(t, i, a, l), (t = i.stateNode));
						try {
							var d = i.memoizedProps,
								y = d.id,
								T = d.onPostCommit;
							typeof T == "function" && T(y, i.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
						} catch (z) {
							Xe(i, i.return, z);
						}
					} else Fn(t, i, a, l);
					break;
				case 31:
					Fn(t, i, a, l);
					break;
				case 13:
					Fn(t, i, a, l);
					break;
				case 23:
					break;
				case 22:
					((d = i.stateNode),
						(y = i.alternate),
						i.memoizedState !== null
							? d._visibility & 2
								? Fn(t, i, a, l)
								: Ku(t, i)
							: d._visibility & 2
								? Fn(t, i, a, l)
								: ((d._visibility |= 2), Ma(t, i, a, l, (i.subtreeFlags & 10256) !== 0 || !1)),
						c & 2048 && Cf(y, i));
					break;
				case 24:
					(Fn(t, i, a, l), c & 2048 && Rf(i.alternate, i));
					break;
				default:
					Fn(t, i, a, l);
			}
		}
		function Ma(t, i, a, l, c) {
			for (c = c && ((i.subtreeFlags & 10256) !== 0 || !1), i = i.child; i !== null; ) {
				var d = t,
					y = i,
					T = a,
					z = l,
					V = y.flags;
				switch (y.tag) {
					case 0:
					case 11:
					case 15:
						(Ma(d, y, T, z, c), Pu(8, y));
						break;
					case 23:
						break;
					case 22:
						var J = y.stateNode;
						(y.memoizedState !== null
							? J._visibility & 2
								? Ma(d, y, T, z, c)
								: Ku(d, y)
							: ((J._visibility |= 2), Ma(d, y, T, z, c)),
							c && V & 2048 && Cf(y.alternate, y));
						break;
					case 24:
						(Ma(d, y, T, z, c), c && V & 2048 && Rf(y.alternate, y));
						break;
					default:
						Ma(d, y, T, z, c);
				}
				i = i.sibling;
			}
		}
		function Ku(t, i) {
			if (i.subtreeFlags & 10256)
				for (i = i.child; i !== null; ) {
					var a = t,
						l = i,
						c = l.flags;
					switch (l.tag) {
						case 22:
							(Ku(a, l), c & 2048 && Cf(l.alternate, l));
							break;
						case 24:
							(Ku(a, l), c & 2048 && Rf(l.alternate, l));
							break;
						default:
							Ku(a, l);
					}
					i = i.sibling;
				}
		}
		var Yu = 8192;
		function za(t, i, a) {
			if (t.subtreeFlags & Yu) for (t = t.child; t !== null; ) (Ag(t, i, a), (t = t.sibling));
		}
		function Ag(t, i, a) {
			switch (t.tag) {
				case 26:
					(za(t, i, a), t.flags & Yu && t.memoizedState !== null && Dw(a, Gn, t.memoizedState, t.memoizedProps));
					break;
				case 5:
					za(t, i, a);
					break;
				case 3:
				case 4:
					var l = Gn;
					((Gn = $s(t.stateNode.containerInfo)), za(t, i, a), (Gn = l));
					break;
				case 22:
					t.memoizedState === null &&
						((l = t.alternate),
						l !== null && l.memoizedState !== null ? ((l = Yu), (Yu = 16777216), za(t, i, a), (Yu = l)) : za(t, i, a));
					break;
				default:
					za(t, i, a);
			}
		}
		function Cg(t) {
			var i = t.alternate;
			if (i !== null && ((t = i.child), t !== null)) {
				i.child = null;
				do ((i = t.sibling), (t.sibling = null), (t = i));
				while (t !== null);
			}
		}
		function Gu(t) {
			var i = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (i !== null)
					for (var a = 0; a < i.length; a++) {
						var l = i[a];
						((Gt = l), Og(l, t));
					}
				Cg(t);
			}
			if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (Rg(t), (t = t.sibling));
		}
		function Rg(t) {
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(Gu(t), t.flags & 2048 && nr(9, t, t.return));
					break;
				case 3:
					Gu(t);
					break;
				case 12:
					Gu(t);
					break;
				case 22:
					var i = t.stateNode;
					t.memoizedState !== null && i._visibility & 2 && (t.return === null || t.return.tag !== 13)
						? ((i._visibility &= -3), As(t))
						: Gu(t);
					break;
				default:
					Gu(t);
			}
		}
		function As(t) {
			var i = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (i !== null)
					for (var a = 0; a < i.length; a++) {
						var l = i[a];
						((Gt = l), Og(l, t));
					}
				Cg(t);
			}
			for (t = t.child; t !== null; ) {
				switch (((i = t), i.tag)) {
					case 0:
					case 11:
					case 15:
						(nr(8, i, i.return), As(i));
						break;
					case 22:
						((a = i.stateNode), a._visibility & 2 && ((a._visibility &= -3), As(i)));
						break;
					default:
						As(i);
				}
				t = t.sibling;
			}
		}
		function Og(t, i) {
			for (; Gt !== null; ) {
				var a = Gt;
				switch (a.tag) {
					case 0:
					case 11:
					case 15:
						nr(8, a, i);
						break;
					case 23:
					case 22:
						if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
							var l = a.memoizedState.cachePool.pool;
							l != null && l.refCount++;
						}
						break;
					case 24:
						Mu(a.memoizedState.cache);
				}
				if (((l = a.child), l !== null)) ((l.return = a), (Gt = l));
				else
					e: for (a = t; Gt !== null; ) {
						l = Gt;
						var c = l.sibling,
							d = l.return;
						if ((bg(l), l === a)) {
							Gt = null;
							break e;
						}
						if (c !== null) {
							((c.return = d), (Gt = c));
							break e;
						}
						Gt = d;
					}
			}
		}
		var X_ = {
				getCacheForType: function (t) {
					var i = Wt(Dt),
						a = i.data.get(t);
					return (a === void 0 && ((a = t()), i.data.set(t, a)), a);
				},
				cacheSignal: function () {
					return Wt(Dt).controller.signal;
				},
			},
			J_ = typeof WeakMap == "function" ? WeakMap : Map,
			Qe = 0,
			nt = null,
			De = null,
			qe = 0,
			Fe = 0,
			Cn = null,
			ir = !1,
			Da = !1,
			Of = !1,
			Oi = 0,
			wt = 0,
			rr = 0,
			Pr = 0,
			Nf = 0,
			Rn = 0,
			ja = 0,
			Fu = null,
			gn = null,
			kf = !1,
			Cs = 0,
			Ng = 0,
			Rs = 1 / 0,
			Os = null,
			ar = null,
			Pt = 0,
			ur = null,
			La = null,
			Ni = 0,
			Mf = 0,
			zf = null,
			kg = null,
			Xu = 0,
			Df = null;
		function Bn() {
			return (Qe & 2) !== 0 && qe !== 0 ? qe & -qe : $.T !== null ? Bf() : gu();
		}
		function Mg() {
			if (Rn === 0)
				if ((qe & 536870912) === 0 || $e) {
					var t = Nn;
					((Nn <<= 1), (Nn & 3932160) === 0 && (Nn = 262144), (Rn = t));
				} else Rn = 536870912;
			return ((t = xn.current), t !== null && (t.flags |= 32), Rn);
		}
		function yn(t, i, a) {
			(((t === nt && (Fe === 2 || Fe === 9)) || t.cancelPendingCommit !== null) && (qa(t, 0), lr(t, qe, Rn, !1)),
				mt(t, a),
				((Qe & 2) === 0 || t !== nt) &&
					(t === nt && ((Qe & 2) === 0 && (Pr |= a), wt === 4 && lr(t, qe, Rn, !1)), ki(t)));
		}
		function zg(t, i, a) {
			if ((Qe & 6) !== 0) throw Error(s(327));
			var l = (!a && (i & 127) === 0 && (i & t.expiredLanes) === 0) || W(t, i),
				c = l ? tw(t, i) : Lf(t, i, !0),
				d = l;
			do {
				if (c === 0) {
					Da && !l && lr(t, i, 0, !1);
					break;
				} else {
					if (((a = t.current.alternate), d && !W_(a))) {
						((c = Lf(t, i, !1)), (d = !1));
						continue;
					}
					if (c === 2) {
						if (((d = i), t.errorRecoveryDisabledLanes & d)) var y = 0;
						else ((y = t.pendingLanes & -536870913), (y = y !== 0 ? y : y & 536870912 ? 536870912 : 0));
						if (y !== 0) {
							i = y;
							e: {
								var T = t;
								c = Fu;
								var z = T.current.memoizedState.isDehydrated;
								if ((z && (qa(T, y).flags |= 256), (y = Lf(T, y, !1)), y !== 2)) {
									if (Of && !z) {
										((T.errorRecoveryDisabledLanes |= d), (Pr |= d), (c = 4));
										break e;
									}
									((d = gn), (gn = c), d !== null && (gn === null ? (gn = d) : gn.push.apply(gn, d)));
								}
								c = y;
							}
							if (((d = !1), c !== 2)) continue;
						}
					}
					if (c === 1) {
						(qa(t, 0), lr(t, i, 0, !0));
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
								lr(l, i, Rn, !ir);
								break e;
							case 2:
								gn = null;
								break;
							case 3:
							case 5:
								break;
							default:
								throw Error(s(329));
						}
						if ((i & 62914560) === i && ((c = Cs + 300 - Ne()), 10 < c)) {
							if ((lr(l, i, Rn, !ir), Ar(l, 0, !0) !== 0)) break e;
							((Ni = i),
								(l.timeoutHandle = fy(Dg.bind(null, l, a, gn, Os, kf, i, Rn, Pr, ja, ir, d, "Throttled", -0, 0), c)));
							break e;
						}
						Dg(l, a, gn, Os, kf, i, Rn, Pr, ja, ir, d, null, -0, 0);
					}
				}
				break;
			} while (!0);
			ki(t);
		}
		function Dg(t, i, a, l, c, d, y, T, z, V, J, ne, Z, Q) {
			if (((t.timeoutHandle = -1), (ne = i.subtreeFlags), ne & 8192 || (ne & 16785408) === 16785408)) {
				((ne = {
					stylesheets: null,
					count: 0,
					imgCount: 0,
					imgBytes: 0,
					suspenseyImages: [],
					waitingForImages: !0,
					waitingForViewTransition: !1,
					unsuspend: vi,
				}),
					Ag(i, d, ne));
				var de = (d & 62914560) === d ? Cs - Ne() : (d & 4194048) === d ? Ng - Ne() : 0;
				if (((de = jw(ne, de)), de !== null)) {
					((Ni = d),
						(t.cancelPendingCommit = de(Vg.bind(null, t, i, d, a, l, c, y, T, z, J, ne, null, Z, Q))),
						lr(t, d, y, !V));
					return;
				}
			}
			Vg(t, i, d, a, l, c, y, T, z);
		}
		function W_(t) {
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
							if (!En(d(), c)) return !1;
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
		function lr(t, i, a, l) {
			((i &= ~Nf),
				(i &= ~Pr),
				(t.suspendedLanes |= i),
				(t.pingedLanes &= ~i),
				l && (t.warmLanes |= i),
				(l = t.expirationTimes));
			for (var c = i; 0 < c; ) {
				var d = 31 - Ve(c),
					y = 1 << d;
				((l[d] = -1), (c &= ~y));
			}
			a !== 0 && cn(t, a, i);
		}
		function Ns() {
			return (Qe & 6) === 0 ? (Ju(0, !1), !1) : !0;
		}
		function jf() {
			if (De !== null) {
				if (Fe === 0) var t = De.return;
				else ((t = De), (bi = Dr = null), Fc(t), (Ca = null), (Du = 0), (t = De));
				for (; t !== null; ) (fg(t.alternate, t), (t = t.return));
				De = null;
			}
		}
		function qa(t, i) {
			var a = t.timeoutHandle;
			(a !== -1 && ((t.timeoutHandle = -1), yw(a)),
				(a = t.cancelPendingCommit),
				a !== null && ((t.cancelPendingCommit = null), a()),
				(Ni = 0),
				jf(),
				(nt = t),
				(De = a = yi(t.current, null)),
				(qe = i),
				(Fe = 0),
				(Cn = null),
				(ir = !1),
				(Da = W(t, i)),
				(Of = !1),
				(ja = Rn = Nf = Pr = rr = wt = 0),
				(gn = Fu = null),
				(kf = !1),
				(i & 8) !== 0 && (i |= i & 32));
			var l = t.entangledLanes;
			if (l !== 0)
				for (t = t.entanglements, l &= i; 0 < l; ) {
					var c = 31 - Ve(l),
						d = 1 << c;
					((i |= t[c]), (l &= ~d));
				}
			return ((Oi = i), Xl(), a);
		}
		function jg(t, i) {
			((ke = null),
				($.H = Vu),
				i === Aa || i === as
					? ((i = ev()), (Fe = 3))
					: i === Uc
						? ((i = ev()), (Fe = 4))
						: (Fe = i === hf ? 8 : i !== null && typeof i == "object" && typeof i.then == "function" ? 6 : 1),
				(Cn = i),
				De === null && ((wt = 1), bs(t, jn(i, t.current))));
		}
		function Lg() {
			var t = xn.current;
			return t === null
				? !0
				: (qe & 4194048) === qe
					? $n === null
					: (qe & 62914560) === qe || (qe & 536870912) !== 0
						? t === $n
						: !1;
		}
		function qg() {
			var t = $.H;
			return (($.H = Vu), t === null ? Vu : t);
		}
		function Ug() {
			var t = $.A;
			return (($.A = X_), t);
		}
		function ks() {
			((wt = 4),
				ir || ((qe & 4194048) !== qe && xn.current !== null) || (Da = !0),
				((rr & 134217727) === 0 && (Pr & 134217727) === 0) || nt === null || lr(nt, qe, Rn, !1));
		}
		function Lf(t, i, a) {
			var l = Qe;
			Qe |= 2;
			var c = qg(),
				d = Ug();
			((nt !== t || qe !== i) && ((Os = null), qa(t, i)), (i = !1));
			var y = wt;
			e: do
				try {
					if (Fe !== 0 && De !== null) {
						var T = De,
							z = Cn;
						switch (Fe) {
							case 8:
								(jf(), (y = 6));
								break e;
							case 3:
							case 2:
							case 9:
							case 6:
								xn.current === null && (i = !0);
								var V = Fe;
								if (((Fe = 0), (Cn = null), Ua(t, T, z, V), a && Da)) {
									y = 0;
									break e;
								}
								break;
							default:
								((V = Fe), (Fe = 0), (Cn = null), Ua(t, T, z, V));
						}
					}
					(ew(), (y = wt));
					break;
				} catch (J) {
					jg(t, J);
				}
			while (!0);
			return (
				i && t.shellSuspendCounter++,
				(bi = Dr = null),
				(Qe = l),
				($.H = c),
				($.A = d),
				De === null && ((nt = null), (qe = 0), Xl()),
				y
			);
		}
		function ew() {
			for (; De !== null; ) $g(De);
		}
		function tw(t, i) {
			var a = Qe;
			Qe |= 2;
			var l = qg(),
				c = Ug();
			nt !== t || qe !== i ? ((Os = null), (Rs = Ne() + 500), qa(t, i)) : (Da = W(t, i));
			e: do
				try {
					if (Fe !== 0 && De !== null) {
						i = De;
						var d = Cn;
						t: switch (Fe) {
							case 1:
								((Fe = 0), (Cn = null), Ua(t, i, d, 1));
								break;
							case 2:
							case 9:
								if (Jm(d)) {
									((Fe = 0), (Cn = null), Bg(i));
									break;
								}
								((i = function () {
									((Fe !== 2 && Fe !== 9) || nt !== t || (Fe = 7), ki(t));
								}),
									d.then(i, i));
								break e;
							case 3:
								Fe = 7;
								break e;
							case 4:
								Fe = 5;
								break e;
							case 7:
								Jm(d) ? ((Fe = 0), (Cn = null), Bg(i)) : ((Fe = 0), (Cn = null), Ua(t, i, d, 7));
								break;
							case 5:
								var y = null;
								switch (De.tag) {
									case 26:
										y = De.memoizedState;
									case 5:
									case 27:
										var T = De;
										if (y ? Ay(y) : T.stateNode.complete) {
											((Fe = 0), (Cn = null));
											var z = T.sibling;
											if (z !== null) De = z;
											else {
												var V = T.return;
												V !== null ? ((De = V), Ms(V)) : (De = null);
											}
											break t;
										}
								}
								((Fe = 0), (Cn = null), Ua(t, i, d, 5));
								break;
							case 6:
								((Fe = 0), (Cn = null), Ua(t, i, d, 6));
								break;
							case 8:
								(jf(), (wt = 6));
								break e;
							default:
								throw Error(s(462));
						}
					}
					nw();
					break;
				} catch (J) {
					jg(t, J);
				}
			while (!0);
			return ((bi = Dr = null), ($.H = l), ($.A = c), (Qe = a), De !== null ? 0 : ((nt = null), (qe = 0), Xl(), wt));
		}
		function nw() {
			for (; De !== null && !Oe(); ) $g(De);
		}
		function $g(t) {
			var i = og(t.alternate, t, Oi);
			((t.memoizedProps = t.pendingProps), i === null ? Ms(t) : (De = i));
		}
		function Bg(t) {
			var i = t,
				a = i.alternate;
			switch (i.tag) {
				case 15:
				case 0:
					i = ig(a, i, i.pendingProps, i.type, void 0, qe);
					break;
				case 11:
					i = ig(a, i, i.pendingProps, i.type.render, i.ref, qe);
					break;
				case 5:
					Fc(i);
				default:
					(fg(a, i), (i = De = Im(i, Oi)), (i = og(a, i, Oi)));
			}
			((t.memoizedProps = t.pendingProps), i === null ? Ms(t) : (De = i));
		}
		function Ua(t, i, a, l) {
			((bi = Dr = null), Fc(i), (Ca = null), (Du = 0));
			var c = i.return;
			try {
				if (H_(t, c, i, a, qe)) {
					((wt = 1), bs(t, jn(a, t.current)), (De = null));
					return;
				}
			} catch (d) {
				if (c !== null) throw ((De = c), d);
				((wt = 1), bs(t, jn(a, t.current)), (De = null));
				return;
			}
			i.flags & 32768
				? ($e || l === 1
						? (t = !0)
						: Da || (qe & 536870912) !== 0
							? (t = !1)
							: ((ir = t = !0),
								(l === 2 || l === 9 || l === 3 || l === 6) &&
									((l = xn.current), l !== null && l.tag === 13 && (l.flags |= 16384))),
					Ig(i, t))
				: Ms(i);
		}
		function Ms(t) {
			var i = t;
			do {
				if ((i.flags & 32768) !== 0) {
					Ig(i, ir);
					return;
				}
				t = i.return;
				var a = K_(i.alternate, i, Oi);
				if (a !== null) {
					De = a;
					return;
				}
				if (((i = i.sibling), i !== null)) {
					De = i;
					return;
				}
				De = i = t;
			} while (i !== null);
			wt === 0 && (wt = 5);
		}
		function Ig(t, i) {
			do {
				var a = Y_(t.alternate, t);
				if (a !== null) {
					((a.flags &= 32767), (De = a));
					return;
				}
				if (
					((a = t.return),
					a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
					!i && ((t = t.sibling), t !== null))
				) {
					De = t;
					return;
				}
				De = t = a;
			} while (t !== null);
			((wt = 6), (De = null));
		}
		function Vg(t, i, a, l, c, d, y, T, z) {
			t.cancelPendingCommit = null;
			do zs();
			while (Pt !== 0);
			if ((Qe & 6) !== 0) throw Error(s(327));
			if (i !== null) {
				if (i === t.current) throw Error(s(177));
				if (
					((d = i.lanes | i.childLanes),
					(d |= Ec),
					vt(t, a, d, y, T, z),
					t === nt && ((De = nt = null), (qe = 0)),
					(La = i),
					(ur = t),
					(Ni = a),
					(Mf = d),
					(zf = c),
					(kg = l),
					(i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0
						? ((t.callbackNode = null),
							(t.callbackPriority = 0),
							uw(kt, function () {
								return (Kg(), null);
							}))
						: ((t.callbackNode = null), (t.callbackPriority = 0)),
					(l = (i.flags & 13878) !== 0),
					(i.subtreeFlags & 13878) !== 0 || l)
				) {
					((l = $.T), ($.T = null), (c = H.p), (H.p = 2), (y = Qe), (Qe |= 4));
					try {
						G_(t, i, a);
					} finally {
						((Qe = y), (H.p = c), ($.T = l));
					}
				}
				((Pt = 1), Zg(), Hg(), Pg());
			}
		}
		function Zg() {
			if (Pt === 1) {
				Pt = 0;
				var t = ur,
					i = La,
					a = (i.flags & 13878) !== 0;
				if ((i.subtreeFlags & 13878) !== 0 || a) {
					((a = $.T), ($.T = null));
					var l = H.p;
					H.p = 2;
					var c = Qe;
					Qe |= 4;
					try {
						Eg(i, t);
						var d = Kf,
							y = Mm(t.containerInfo),
							T = d.focusedElem,
							z = d.selectionRange;
						if (y !== T && T && T.ownerDocument && km(T.ownerDocument.documentElement, T)) {
							if (z !== null && pc(T)) {
								var V = z.start,
									J = z.end;
								if ((J === void 0 && (J = V), "selectionStart" in T))
									((T.selectionStart = V), (T.selectionEnd = Math.min(J, T.value.length)));
								else {
									var ne = T.ownerDocument || document,
										Z = (ne && ne.defaultView) || window;
									if (Z.getSelection) {
										var Q = Z.getSelection(),
											de = T.textContent.length,
											Te = Math.min(z.start, de),
											et = z.end === void 0 ? Te : Math.min(z.end, de);
										!Q.extend && Te > et && ((y = et), (et = Te), (Te = y));
										var U = Nm(T, Te),
											L = Nm(T, et);
										if (
											U &&
											L &&
											(Q.rangeCount !== 1 ||
												Q.anchorNode !== U.node ||
												Q.anchorOffset !== U.offset ||
												Q.focusNode !== L.node ||
												Q.focusOffset !== L.offset)
										) {
											var I = ne.createRange();
											(I.setStart(U.node, U.offset),
												Q.removeAllRanges(),
												Te > et
													? (Q.addRange(I), Q.extend(L.node, L.offset))
													: (I.setEnd(L.node, L.offset), Q.addRange(I)));
										}
									}
								}
							}
							for (ne = [], Q = T; (Q = Q.parentNode); )
								Q.nodeType === 1 && ne.push({ element: Q, left: Q.scrollLeft, top: Q.scrollTop });
							for (typeof T.focus == "function" && T.focus(), T = 0; T < ne.length; T++) {
								var ee = ne[T];
								((ee.element.scrollLeft = ee.left), (ee.element.scrollTop = ee.top));
							}
						}
						((Ps = !!Qf), (Kf = Qf = null));
					} finally {
						((Qe = c), (H.p = l), ($.T = a));
					}
				}
				((t.current = i), (Pt = 2));
			}
		}
		function Hg() {
			if (Pt === 2) {
				Pt = 0;
				var t = ur,
					i = La,
					a = (i.flags & 8772) !== 0;
				if ((i.subtreeFlags & 8772) !== 0 || a) {
					((a = $.T), ($.T = null));
					var l = H.p;
					H.p = 2;
					var c = Qe;
					Qe |= 4;
					try {
						pg(t, i.alternate, i);
					} finally {
						((Qe = c), (H.p = l), ($.T = a));
					}
				}
				Pt = 3;
			}
		}
		function Pg() {
			if (Pt === 4 || Pt === 3) {
				((Pt = 0), ht());
				var t = ur,
					i = La,
					a = Ni,
					l = kg;
				(i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0
					? (Pt = 5)
					: ((Pt = 0), (La = ur = null), Qg(t, t.pendingLanes));
				var c = t.pendingLanes;
				if ((c === 0 && (ar = null), zt(a), (i = i.stateNode), _e && typeof _e.onCommitFiberRoot == "function"))
					try {
						_e.onCommitFiberRoot(ve, i, void 0, (i.current.flags & 128) === 128);
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
				((Ni & 3) !== 0 && zs(),
					ki(t),
					(c = t.pendingLanes),
					(a & 261930) !== 0 && (c & 42) !== 0 ? (t === Df ? Xu++ : ((Xu = 0), (Df = t))) : (Xu = 0),
					Ju(0, !1));
			}
		}
		function Qg(t, i) {
			(t.pooledCacheLanes &= i) === 0 && ((i = t.pooledCache), i != null && ((t.pooledCache = null), Mu(i)));
		}
		function zs() {
			return (Zg(), Hg(), Pg(), Kg());
		}
		function Kg() {
			if (Pt !== 5) return !1;
			var t = ur,
				i = Mf;
			Mf = 0;
			var a = zt(Ni),
				l = $.T,
				c = H.p;
			try {
				((H.p = 32 > a ? 32 : a), ($.T = null), (a = zf), (zf = null));
				var d = ur,
					y = Ni;
				if (((Pt = 0), (La = ur = null), (Ni = 0), (Qe & 6) !== 0)) throw Error(s(331));
				var T = Qe;
				if (
					((Qe |= 4),
					Rg(d.current),
					xg(d, d.current, y, a),
					(Qe = T),
					Ju(0, !1),
					_e && typeof _e.onPostCommitFiberRoot == "function")
				)
					try {
						_e.onPostCommitFiberRoot(ve, d);
					} catch {}
				return !0;
			} finally {
				((H.p = c), ($.T = l), Qg(t, i));
			}
		}
		function Yg(t, i, a) {
			((i = jn(a, i)), (i = df(t.stateNode, i, 2)), (t = Ir(t, i, 2)), t !== null && (mt(t, 2), ki(t)));
		}
		function Xe(t, i, a) {
			if (t.tag === 3) Yg(t, t, a);
			else
				for (; i !== null; ) {
					if (i.tag === 3) {
						Yg(i, t, a);
						break;
					} else if (i.tag === 1) {
						var l = i.stateNode;
						if (
							typeof i.type.getDerivedStateFromError == "function" ||
							(typeof l.componentDidCatch == "function" && (ar === null || !ar.has(l)))
						) {
							((t = jn(a, t)), (a = Gv(2)), (l = Ir(i, a, 2)), l !== null && (Fv(a, l, i, t), mt(l, 2), ki(l)));
							break;
						}
					}
					i = i.return;
				}
		}
		function qf(t, i, a) {
			var l = t.pingCache;
			if (l === null) {
				l = t.pingCache = new J_();
				var c = new Set();
				l.set(i, c);
			} else ((c = l.get(i)), c === void 0 && ((c = new Set()), l.set(i, c)));
			c.has(a) || ((Of = !0), c.add(a), (t = iw.bind(null, t, i, a)), i.then(t, t));
		}
		function iw(t, i, a) {
			var l = t.pingCache;
			(l !== null && l.delete(i),
				(t.pingedLanes |= t.suspendedLanes & a),
				(t.warmLanes &= ~a),
				nt === t &&
					(qe & a) === a &&
					(wt === 4 || (wt === 3 && (qe & 62914560) === qe && 300 > Ne() - Cs) ? (Qe & 2) === 0 && qa(t, 0) : (Nf |= a),
					ja === qe && (ja = 0)),
				ki(t));
		}
		function Gg(t, i) {
			(i === 0 && (i = Ae()), (t = kr(t, i)), t !== null && (mt(t, i), ki(t)));
		}
		function rw(t) {
			var i = t.memoizedState,
				a = 0;
			(i !== null && (a = i.retryLane), Gg(t, a));
		}
		function aw(t, i) {
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
			(l !== null && l.delete(i), Gg(t, a));
		}
		function uw(t, i) {
			return at(t, i);
		}
		var Ds = null,
			$a = null,
			Uf = !1,
			js = !1,
			$f = !1,
			sr = 0;
		function ki(t) {
			(t !== $a && t.next === null && ($a === null ? (Ds = $a = t) : ($a = $a.next = t)),
				(js = !0),
				Uf || ((Uf = !0), sw()));
		}
		function Ju(t, i) {
			if (!$f && js) {
				$f = !0;
				do
					for (var a = !1, l = Ds; l !== null; ) {
						if (!i)
							if (t !== 0) {
								var c = l.pendingLanes;
								if (c === 0) var d = 0;
								else {
									var y = l.suspendedLanes,
										T = l.pingedLanes;
									((d = (1 << (31 - Ve(42 | t) + 1)) - 1),
										(d &= c & ~(y & ~T)),
										(d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0));
								}
								d !== 0 && ((a = !0), Wg(l, d));
							} else
								((d = qe),
									(d = Ar(l, l === nt ? d : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1)),
									(d & 3) === 0 || W(l, d) || ((a = !0), Wg(l, d)));
						l = l.next;
					}
				while (a);
				$f = !1;
			}
		}
		function lw() {
			Fg();
		}
		function Fg() {
			js = Uf = !1;
			var t = 0;
			sr !== 0 && gw() && (t = sr);
			for (var i = Ne(), a = null, l = Ds; l !== null; ) {
				var c = l.next,
					d = Xg(l, i);
				(d === 0
					? ((l.next = null), a === null ? (Ds = c) : (a.next = c), c === null && ($a = a))
					: ((a = l), (t !== 0 || (d & 3) !== 0) && (js = !0)),
					(l = c));
			}
			((Pt !== 0 && Pt !== 5) || Ju(t, !1), sr !== 0 && (sr = 0));
		}
		function Xg(t, i) {
			for (
				var a = t.suspendedLanes, l = t.pingedLanes, c = t.expirationTimes, d = t.pendingLanes & -62914561;
				0 < d;
			) {
				var y = 31 - Ve(d),
					T = 1 << y,
					z = c[y];
				(z === -1 ? ((T & a) === 0 || (T & l) !== 0) && (c[y] = ce(T, i)) : z <= i && (t.expiredLanes |= T), (d &= ~T));
			}
			if (
				((i = nt),
				(a = qe),
				(a = Ar(t, t === i ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				(l = t.callbackNode),
				a === 0 || (t === i && (Fe === 2 || Fe === 9)) || t.cancelPendingCommit !== null)
			)
				return (l !== null && l !== null && ue(l), (t.callbackNode = null), (t.callbackPriority = 0));
			if ((a & 3) === 0 || W(t, a)) {
				if (((i = a & -a), i === t.callbackPriority)) return i;
				switch ((l !== null && ue(l), zt(a))) {
					case 2:
					case 8:
						a = St;
						break;
					case 32:
						a = kt;
						break;
					case 268435456:
						a = hi;
						break;
					default:
						a = kt;
				}
				return ((l = Jg.bind(null, t)), (a = at(a, l)), (t.callbackPriority = i), (t.callbackNode = a), i);
			}
			return (l !== null && l !== null && ue(l), (t.callbackPriority = 2), (t.callbackNode = null), 2);
		}
		function Jg(t, i) {
			if (Pt !== 0 && Pt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
			var a = t.callbackNode;
			if (zs() && t.callbackNode !== a) return null;
			var l = qe;
			return (
				(l = Ar(t, t === nt ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				l === 0
					? null
					: (zg(t, l, i), Xg(t, Ne()), t.callbackNode != null && t.callbackNode === a ? Jg.bind(null, t) : null)
			);
		}
		function Wg(t, i) {
			if (zs()) return null;
			zg(t, i, !0);
		}
		function sw() {
			pw(function () {
				(Qe & 6) !== 0 ? at(Ft, lw) : Fg();
			});
		}
		function Bf() {
			if (sr === 0) {
				var t = Ta;
				(t === 0 && ((t = ut), (ut <<= 1), (ut & 261888) === 0 && (ut = 256)), (sr = t));
			}
			return sr;
		}
		function ey(t) {
			return t == null || typeof t == "symbol" || typeof t == "boolean"
				? null
				: typeof t == "function"
					? t
					: Zl("" + t);
		}
		function ty(t, i) {
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
		function ow(t, i, a, l, c) {
			if (i === "submit" && a && a.stateNode === c) {
				var d = ey((c[fn] || null).action),
					y = l.submitter;
				y &&
					((i = (i = y[fn] || null) ? ey(i.formAction) : y.getAttribute("formAction")),
					i !== null && ((d = i), (y = null)));
				var T = new Kl("action", "action", null, l, c);
				t.push({
					event: T,
					listeners: [
						{
							instance: null,
							listener: function () {
								if (l.defaultPrevented) {
									if (sr !== 0) {
										var z = y ? ty(c, y) : new FormData(c);
										uf(a, { pending: !0, data: z, method: c.method, action: d }, null, z);
									}
								} else
									typeof d == "function" &&
										(T.preventDefault(),
										(z = y ? ty(c, y) : new FormData(c)),
										uf(a, { pending: !0, data: z, method: c.method, action: d }, d, z));
							},
							currentTarget: c,
						},
					],
				});
			}
		}
		for (var If = 0; If < wc.length; If++) {
			var Vf = wc[If];
			Yn(Vf.toLowerCase(), "on" + (Vf[0].toUpperCase() + Vf.slice(1)));
		}
		(Yn(jm, "onAnimationEnd"),
			Yn(Lm, "onAnimationIteration"),
			Yn(qm, "onAnimationStart"),
			Yn("dblclick", "onDoubleClick"),
			Yn("focusin", "onFocus"),
			Yn("focusout", "onBlur"),
			Yn(T_, "onTransitionRun"),
			Yn(x_, "onTransitionStart"),
			Yn(A_, "onTransitionCancel"),
			Yn(Um, "onTransitionEnd"),
			ca("onMouseEnter", ["mouseout", "mouseover"]),
			ca("onMouseLeave", ["mouseout", "mouseover"]),
			ca("onPointerEnter", ["pointerout", "pointerover"]),
			ca("onPointerLeave", ["pointerout", "pointerover"]),
			Cr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
			Cr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
			Cr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
			Cr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
			Cr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
			Cr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" ")));
		var Wu =
				"abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
					" ",
				),
			cw = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Wu));
		function ny(t, i) {
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
								z = T.instance,
								V = T.currentTarget;
							if (((T = T.listener), z !== d && c.isPropagationStopped())) break e;
							((d = T), (c.currentTarget = V));
							try {
								d(c);
							} catch (J) {
								Fl(J);
							}
							((c.currentTarget = null), (d = z));
						}
					else
						for (y = 0; y < l.length; y++) {
							if (
								((T = l[y]),
								(z = T.instance),
								(V = T.currentTarget),
								(T = T.listener),
								z !== d && c.isPropagationStopped())
							)
								break e;
							((d = T), (c.currentTarget = V));
							try {
								d(c);
							} catch (J) {
								Fl(J);
							}
							((c.currentTarget = null), (d = z));
						}
				}
			}
		}
		function je(t, i) {
			var a = i[ec];
			a === void 0 && (a = i[ec] = new Set());
			var l = t + "__bubble";
			a.has(l) || (ry(i, t, 2, !1), a.add(l));
		}
		function Zf(t, i, a) {
			var l = 0;
			(i && (l |= 4), ry(a, t, l, i));
		}
		var Ls = "_reactListening" + Math.random().toString(36).slice(2);
		function iy(t) {
			if (!t[Ls]) {
				((t[Ls] = !0),
					Wh.forEach(function (a) {
						a !== "selectionchange" && (cw.has(a) || Zf(a, !1, t), Zf(a, !0, t));
					}));
				var i = t.nodeType === 9 ? t : t.ownerDocument;
				i === null || i[Ls] || ((i[Ls] = !0), Zf("selectionchange", !1, i));
			}
		}
		function ry(t, i, a, l) {
			switch (ky(i)) {
				case 2:
					var c = Bw;
					break;
				case 8:
					c = Iw;
					break;
				default:
					c = rd;
			}
			((a = c.bind(null, i, a, t)),
				(c = void 0),
				!oc || (i !== "touchstart" && i !== "touchmove" && i !== "wheel") || (c = !0),
				l
					? c !== void 0
						? t.addEventListener(i, a, { capture: !0, passive: c })
						: t.addEventListener(i, a, !0)
					: c !== void 0
						? t.addEventListener(i, a, { passive: c })
						: t.addEventListener(i, a, !1));
		}
		function Hf(t, i, a, l, c) {
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
								var z = y.tag;
								if ((z === 3 || z === 4) && y.stateNode.containerInfo === c) return;
								y = y.return;
							}
						for (; T !== null; ) {
							if (((y = la(T)), y === null)) return;
							if (((z = y.tag), z === 5 || z === 6 || z === 26 || z === 27)) {
								l = d = y;
								continue e;
							}
							T = T.parentNode;
						}
					}
					l = l.return;
				}
			fm(function () {
				var V = d,
					J = lc(a),
					ne = [];
				e: {
					var Z = $m.get(t);
					if (Z !== void 0) {
						var Q = Kl,
							de = t;
						switch (t) {
							case "keypress":
								if (Pl(a) === 0) break e;
							case "keydown":
							case "keyup":
								Q = l_;
								break;
							case "focusin":
								((de = "focus"), (Q = hc));
								break;
							case "focusout":
								((de = "blur"), (Q = hc));
								break;
							case "beforeblur":
							case "afterblur":
								Q = hc;
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
								Q = mm;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								Q = e_;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								Q = s_;
								break;
							case jm:
							case Lm:
							case qm:
								Q = t_;
								break;
							case Um:
								Q = o_;
								break;
							case "scroll":
							case "scrollend":
								Q = WS;
								break;
							case "wheel":
								Q = c_;
								break;
							case "copy":
							case "cut":
							case "paste":
								Q = n_;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								Q = gm;
								break;
							case "toggle":
							case "beforetoggle":
								Q = f_;
						}
						var Te = (i & 4) !== 0,
							et = !Te && (t === "scroll" || t === "scrollend"),
							U = Te ? (Z !== null ? Z + "Capture" : null) : Z;
						Te = [];
						for (var L = V, I; L !== null; ) {
							var ee = L;
							if (
								((I = ee.stateNode),
								(ee = ee.tag),
								(ee !== 5 && ee !== 26 && ee !== 27) ||
									I === null ||
									U === null ||
									((ee = _u(L, U)), ee != null && Te.push(el(L, ee, I))),
								et)
							)
								break;
							L = L.return;
						}
						0 < Te.length && ((Z = new Q(Z, de, null, a, J)), ne.push({ event: Z, listeners: Te }));
					}
				}
				if ((i & 7) === 0) {
					e: {
						if (
							((Z = t === "mouseover" || t === "pointerover"),
							(Q = t === "mouseout" || t === "pointerout"),
							Z && a !== uc && (de = a.relatedTarget || a.fromElement) && (la(de) || de[pu]))
						)
							break e;
						if (
							(Q || Z) &&
							((Z = J.window === J ? J : (Z = J.ownerDocument) ? Z.defaultView || Z.parentWindow : window),
							Q
								? ((de = a.relatedTarget || a.toElement),
									(Q = V),
									(de = de ? la(de) : null),
									de !== null &&
										((et = f(de)), (Te = de.tag), de !== et || (Te !== 5 && Te !== 27 && Te !== 6)) &&
										(de = null))
								: ((Q = null), (de = V)),
							Q !== de)
						) {
							if (
								((Te = mm),
								(ee = "onMouseLeave"),
								(U = "onMouseEnter"),
								(L = "mouse"),
								(t === "pointerout" || t === "pointerover") &&
									((Te = gm), (ee = "onPointerLeave"), (U = "onPointerEnter"), (L = "pointer")),
								(et = Q == null ? Z : Su(Q)),
								(I = de == null ? Z : Su(de)),
								(Z = new Te(ee, L + "leave", Q, a, J)),
								(Z.target = et),
								(Z.relatedTarget = I),
								(ee = null),
								la(J) === V &&
									((Te = new Te(U, L + "enter", de, a, J)), (Te.target = I), (Te.relatedTarget = et), (ee = Te)),
								(et = ee),
								Q && de)
							)
								t: {
									for (Te = fw, U = Q, L = de, I = 0, ee = U; ee; ee = Te(ee)) I++;
									ee = 0;
									for (var be = L; be; be = Te(be)) ee++;
									for (; 0 < I - ee; ) ((U = Te(U)), I--);
									for (; 0 < ee - I; ) ((L = Te(L)), ee--);
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
							(Q !== null && ay(ne, Z, Q, Te, !1), de !== null && et !== null && ay(ne, et, de, Te, !0));
						}
					}
					e: {
						if (
							((Z = V ? Su(V) : window),
							(Q = Z.nodeName && Z.nodeName.toLowerCase()),
							Q === "select" || (Q === "input" && Z.type === "file"))
						)
							var Ze = Tm;
						else if (wm(Z))
							if (xm) Ze = __;
							else {
								Ze = b_;
								var me = p_;
							}
						else
							((Q = Z.nodeName),
								!Q || Q.toLowerCase() !== "input" || (Z.type !== "checkbox" && Z.type !== "radio")
									? V && ac(V.elementType) && (Ze = Tm)
									: (Ze = S_));
						if (Ze && (Ze = Ze(t, V))) {
							Em(ne, Ze, a, J);
							break e;
						}
						(me && me(t, Z, V),
							t === "focusout" &&
								V &&
								Z.type === "number" &&
								V.memoizedProps.value != null &&
								rc(Z, "number", Z.value));
					}
					switch (((me = V ? Su(V) : window), t)) {
						case "focusin":
							(wm(me) || me.contentEditable === "true") && ((ga = me), (bc = V), (Ou = null));
							break;
						case "focusout":
							Ou = bc = ga = null;
							break;
						case "mousedown":
							Sc = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							((Sc = !1), zm(ne, a, J));
							break;
						case "selectionchange":
							if (E_) break;
						case "keydown":
						case "keyup":
							zm(ne, a, J);
					}
					var Me;
					if (vc)
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
						va
							? Sm(t, a) && (Ue = "onCompositionEnd")
							: t === "keydown" && a.keyCode === 229 && (Ue = "onCompositionStart");
					(Ue &&
						(ym &&
							a.locale !== "ko" &&
							(va || Ue !== "onCompositionStart"
								? Ue === "onCompositionEnd" && va && (Me = dm())
								: ((Yi = J), (cc = "value" in Yi ? Yi.value : Yi.textContent), (va = !0))),
						(me = qs(V, Ue)),
						0 < me.length &&
							((Ue = new vm(Ue, t, null, a, J)),
							ne.push({ event: Ue, listeners: me }),
							Me ? (Ue.data = Me) : ((Me = _m(a)), Me !== null && (Ue.data = Me)))),
						(Me = h_ ? m_(t, a) : v_(t, a)) &&
							((Ue = qs(V, "onBeforeInput")),
							0 < Ue.length &&
								((me = new vm("onBeforeInput", "beforeinput", null, a, J)),
								ne.push({ event: me, listeners: Ue }),
								(me.data = Me))),
						ow(ne, t, V, a, J));
				}
				ny(ne, i);
			});
		}
		function el(t, i, a) {
			return { instance: t, listener: i, currentTarget: a };
		}
		function qs(t, i) {
			for (var a = i + "Capture", l = []; t !== null; ) {
				var c = t,
					d = c.stateNode;
				if (
					((c = c.tag),
					(c !== 5 && c !== 26 && c !== 27) ||
						d === null ||
						((c = _u(t, a)), c != null && l.unshift(el(t, c, d)), (c = _u(t, i)), c != null && l.push(el(t, c, d))),
					t.tag === 3)
				)
					return l;
				t = t.return;
			}
			return [];
		}
		function fw(t) {
			if (t === null) return null;
			do t = t.return;
			while (t && t.tag !== 5 && t.tag !== 27);
			return t || null;
		}
		function ay(t, i, a, l, c) {
			for (var d = i._reactName, y = []; a !== null && a !== l; ) {
				var T = a,
					z = T.alternate,
					V = T.stateNode;
				if (((T = T.tag), z !== null && z === l)) break;
				((T !== 5 && T !== 26 && T !== 27) ||
					V === null ||
					((z = V),
					c
						? ((V = _u(a, d)), V != null && y.unshift(el(a, V, z)))
						: c || ((V = _u(a, d)), V != null && y.push(el(a, V, z)))),
					(a = a.return));
			}
			y.length !== 0 && t.push({ event: i, listeners: y });
		}
		var dw = /\r\n?/g,
			hw = /\u0000|\uFFFD/g;
		function uy(t) {
			return (typeof t == "string" ? t : "" + t)
				.replace(
					dw,
					`
`,
				)
				.replace(hw, "");
		}
		function ly(t, i) {
			return ((i = uy(i)), uy(t) === i);
		}
		function We(t, i, a, l, c, d) {
			switch (a) {
				case "children":
					typeof l == "string"
						? i === "body" || (i === "textarea" && l === "") || da(t, l)
						: (typeof l == "number" || typeof l == "bigint") && i !== "body" && da(t, "" + l);
					break;
				case "className":
					Il(t, "class", l);
					break;
				case "tabIndex":
					Il(t, "tabindex", l);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					Il(t, a, l);
					break;
				case "style":
					om(t, l, d);
					break;
				case "data":
					if (i !== "object") {
						Il(t, "data", l);
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
					((l = Zl("" + l)), t.setAttribute(a, l));
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
								? (i !== "input" && We(t, i, "name", c.name, c, null),
									We(t, i, "formEncType", c.formEncType, c, null),
									We(t, i, "formMethod", c.formMethod, c, null),
									We(t, i, "formTarget", c.formTarget, c, null))
								: (We(t, i, "encType", c.encType, c, null),
									We(t, i, "method", c.method, c, null),
									We(t, i, "target", c.target, c, null)));
					if (l == null || typeof l == "symbol" || typeof l == "boolean") {
						t.removeAttribute(a);
						break;
					}
					((l = Zl("" + l)), t.setAttribute(a, l));
					break;
				case "onClick":
					l != null && (t.onclick = vi);
					break;
				case "onScroll":
					l != null && je("scroll", t);
					break;
				case "onScrollEnd":
					l != null && je("scrollend", t);
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
					((a = Zl("" + l)), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a));
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
					(je("beforetoggle", t), je("toggle", t), Bl(t, "popover", l));
					break;
				case "xlinkActuate":
					mi(t, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
					break;
				case "xlinkArcrole":
					mi(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
					break;
				case "xlinkRole":
					mi(t, "http://www.w3.org/1999/xlink", "xlink:role", l);
					break;
				case "xlinkShow":
					mi(t, "http://www.w3.org/1999/xlink", "xlink:show", l);
					break;
				case "xlinkTitle":
					mi(t, "http://www.w3.org/1999/xlink", "xlink:title", l);
					break;
				case "xlinkType":
					mi(t, "http://www.w3.org/1999/xlink", "xlink:type", l);
					break;
				case "xmlBase":
					mi(t, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
					break;
				case "xmlLang":
					mi(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
					break;
				case "xmlSpace":
					mi(t, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
					break;
				case "is":
					Bl(t, "is", l);
					break;
				case "innerText":
				case "textContent":
					break;
				default:
					(!(2 < a.length) || (a[0] !== "o" && a[0] !== "O") || (a[1] !== "n" && a[1] !== "N")) &&
						((a = XS.get(a) || a), Bl(t, a, l));
			}
		}
		function Pf(t, i, a, l, c, d) {
			switch (a) {
				case "style":
					om(t, l, d);
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
					typeof l == "string" ? da(t, l) : (typeof l == "number" || typeof l == "bigint") && da(t, "" + l);
					break;
				case "onScroll":
					l != null && je("scroll", t);
					break;
				case "onScrollEnd":
					l != null && je("scrollend", t);
					break;
				case "onClick":
					l != null && (t.onclick = vi);
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
					if (!em.hasOwnProperty(a))
						e: {
							if (
								a[0] === "o" &&
								a[1] === "n" &&
								((c = a.endsWith("Capture")),
								(i = a.slice(2, c ? a.length - 7 : void 0)),
								(d = t[fn] || null),
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
							a in t ? (t[a] = l) : l === !0 ? t.setAttribute(a, "") : Bl(t, a, l);
						}
			}
		}
		function tn(t, i, a) {
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
					(je("error", t), je("load", t));
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
										We(t, i, d, y, a, null);
								}
						}
					(c && We(t, i, "srcSet", a.srcSet, a, null), l && We(t, i, "src", a.src, a, null));
					return;
				case "input":
					je("invalid", t);
					var T = (d = y = c = null),
						z = null,
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
										z = J;
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
										We(t, i, l, J, a, null);
								}
						}
					am(t, d, T, z, V, y, c, !1);
					return;
				case "select":
					(je("invalid", t), (l = y = d = null));
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
									We(t, i, c, T, a, null);
							}
					((i = d), (a = y), (t.multiple = !!l), i != null ? fa(t, !!l, i, !1) : a != null && fa(t, !!l, a, !0));
					return;
				case "textarea":
					(je("invalid", t), (d = c = l = null));
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
									We(t, i, y, T, a, null);
							}
					lm(t, l, c, d);
					return;
				case "option":
					for (z in a)
						if (a.hasOwnProperty(z) && ((l = a[z]), l != null))
							switch (z) {
								case "selected":
									t.selected = l && typeof l != "function" && typeof l != "symbol";
									break;
								default:
									We(t, i, z, l, a, null);
							}
					return;
				case "dialog":
					(je("beforetoggle", t), je("toggle", t), je("cancel", t), je("close", t));
					break;
				case "iframe":
				case "object":
					je("load", t);
					break;
				case "video":
				case "audio":
					for (l = 0; l < Wu.length; l++) je(Wu[l], t);
					break;
				case "image":
					(je("error", t), je("load", t));
					break;
				case "details":
					je("toggle", t);
					break;
				case "embed":
				case "source":
				case "link":
					(je("error", t), je("load", t));
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
									We(t, i, V, l, a, null);
							}
					return;
				default:
					if (ac(i)) {
						for (J in a) a.hasOwnProperty(J) && ((l = a[J]), l !== void 0 && Pf(t, i, J, l, a, void 0));
						return;
					}
			}
			for (T in a) a.hasOwnProperty(T) && ((l = a[T]), l != null && We(t, i, T, l, a, null));
		}
		function mw(t, i, a, l) {
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
						z = null,
						V = null,
						J = null;
					for (Q in a) {
						var ne = a[Q];
						if (a.hasOwnProperty(Q) && ne != null)
							switch (Q) {
								case "checked":
									break;
								case "value":
									break;
								case "defaultValue":
									z = ne;
								default:
									l.hasOwnProperty(Q) || We(t, i, Q, null, l, ne);
							}
					}
					for (var Z in l) {
						var Q = l[Z];
						if (((ne = a[Z]), l.hasOwnProperty(Z) && (Q != null || ne != null)))
							switch (Z) {
								case "type":
									d = Q;
									break;
								case "name":
									c = Q;
									break;
								case "checked":
									V = Q;
									break;
								case "defaultChecked":
									J = Q;
									break;
								case "value":
									y = Q;
									break;
								case "defaultValue":
									T = Q;
									break;
								case "children":
								case "dangerouslySetInnerHTML":
									if (Q != null) throw Error(s(137, i));
									break;
								default:
									Q !== ne && We(t, i, Z, Q, l, ne);
							}
					}
					ic(t, y, T, z, V, J, d, c);
					return;
				case "select":
					Q = y = T = Z = null;
					for (d in a)
						if (((z = a[d]), a.hasOwnProperty(d) && z != null))
							switch (d) {
								case "value":
									break;
								case "multiple":
									Q = z;
								default:
									l.hasOwnProperty(d) || We(t, i, d, null, l, z);
							}
					for (c in l)
						if (((d = l[c]), (z = a[c]), l.hasOwnProperty(c) && (d != null || z != null)))
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
									d !== z && We(t, i, c, d, l, z);
							}
					((i = T),
						(a = y),
						(l = Q),
						Z != null
							? fa(t, !!a, Z, !1)
							: !!l != !!a && (i != null ? fa(t, !!a, i, !0) : fa(t, !!a, a ? [] : "", !1)));
					return;
				case "textarea":
					Q = Z = null;
					for (T in a)
						if (((c = a[T]), a.hasOwnProperty(T) && c != null && !l.hasOwnProperty(T)))
							switch (T) {
								case "value":
									break;
								case "children":
									break;
								default:
									We(t, i, T, null, l, c);
							}
					for (y in l)
						if (((c = l[y]), (d = a[y]), l.hasOwnProperty(y) && (c != null || d != null)))
							switch (y) {
								case "value":
									Z = c;
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
									c !== d && We(t, i, y, c, l, d);
							}
					um(t, Z, Q);
					return;
				case "option":
					for (var de in a)
						if (((Z = a[de]), a.hasOwnProperty(de) && Z != null && !l.hasOwnProperty(de)))
							switch (de) {
								case "selected":
									t.selected = !1;
									break;
								default:
									We(t, i, de, null, l, Z);
							}
					for (z in l)
						if (((Z = l[z]), (Q = a[z]), l.hasOwnProperty(z) && Z !== Q && (Z != null || Q != null)))
							switch (z) {
								case "selected":
									t.selected = Z && typeof Z != "function" && typeof Z != "symbol";
									break;
								default:
									We(t, i, z, Z, l, Q);
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
						((Z = a[Te]), a.hasOwnProperty(Te) && Z != null && !l.hasOwnProperty(Te) && We(t, i, Te, null, l, Z));
					for (V in l)
						if (((Z = l[V]), (Q = a[V]), l.hasOwnProperty(V) && Z !== Q && (Z != null || Q != null)))
							switch (V) {
								case "children":
								case "dangerouslySetInnerHTML":
									if (Z != null) throw Error(s(137, i));
									break;
								default:
									We(t, i, V, Z, l, Q);
							}
					return;
				default:
					if (ac(i)) {
						for (var et in a)
							((Z = a[et]),
								a.hasOwnProperty(et) && Z !== void 0 && !l.hasOwnProperty(et) && Pf(t, i, et, void 0, l, Z));
						for (J in l)
							((Z = l[J]),
								(Q = a[J]),
								!l.hasOwnProperty(J) || Z === Q || (Z === void 0 && Q === void 0) || Pf(t, i, J, Z, l, Q));
						return;
					}
			}
			for (var U in a)
				((Z = a[U]), a.hasOwnProperty(U) && Z != null && !l.hasOwnProperty(U) && We(t, i, U, null, l, Z));
			for (ne in l)
				((Z = l[ne]),
					(Q = a[ne]),
					!l.hasOwnProperty(ne) || Z === Q || (Z == null && Q == null) || We(t, i, ne, Z, l, Q));
		}
		function sy(t) {
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
		function vw() {
			if (typeof performance.getEntriesByType == "function") {
				for (var t = 0, i = 0, a = performance.getEntriesByType("resource"), l = 0; l < a.length; l++) {
					var c = a[l],
						d = c.transferSize,
						y = c.initiatorType,
						T = c.duration;
					if (d && T && sy(y)) {
						for (y = 0, T = c.responseEnd, l += 1; l < a.length; l++) {
							var z = a[l],
								V = z.startTime;
							if (V > T) break;
							var J = z.transferSize,
								ne = z.initiatorType;
							J && sy(ne) && ((z = z.responseEnd), (y += J * (z < T ? 1 : (T - V) / (z - V))));
						}
						if ((--l, (i += (8 * (d + y)) / (c.duration / 1e3)), t++, 10 < t)) break;
					}
				}
				if (0 < t) return i / t / 1e6;
			}
			return navigator.connection && ((t = navigator.connection.downlink), typeof t == "number") ? t : 5;
		}
		var Qf = null,
			Kf = null;
		function Us(t) {
			return t.nodeType === 9 ? t : t.ownerDocument;
		}
		function oy(t) {
			switch (t) {
				case "http://www.w3.org/2000/svg":
					return 1;
				case "http://www.w3.org/1998/Math/MathML":
					return 2;
				default:
					return 0;
			}
		}
		function cy(t, i) {
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
		function Yf(t, i) {
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
		var Gf = null;
		function gw() {
			var t = window.event;
			return t && t.type === "popstate" ? (t === Gf ? !1 : ((Gf = t), !0)) : ((Gf = null), !1);
		}
		var fy = typeof setTimeout == "function" ? setTimeout : void 0,
			yw = typeof clearTimeout == "function" ? clearTimeout : void 0,
			dy = typeof Promise == "function" ? Promise : void 0,
			pw =
				typeof queueMicrotask == "function"
					? queueMicrotask
					: typeof dy < "u"
						? function (t) {
								return dy.resolve(null).then(t).catch(bw);
							}
						: fy;
		function bw(t) {
			setTimeout(function () {
				throw t;
			});
		}
		function or(t) {
			return t === "head";
		}
		function hy(t, i) {
			var a = i,
				l = 0;
			do {
				var c = a.nextSibling;
				if ((t.removeChild(a), c && c.nodeType === 8))
					if (((a = c.data), a === "/$" || a === "/&")) {
						if (l === 0) {
							(t.removeChild(c), Za(i));
							return;
						}
						l--;
					} else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&") l++;
					else if (a === "html") tl(t.ownerDocument.documentElement);
					else if (a === "head") {
						((a = t.ownerDocument.head), tl(a));
						for (var d = a.firstChild; d; ) {
							var y = d.nextSibling,
								T = d.nodeName;
							(d[bu] ||
								T === "SCRIPT" ||
								T === "STYLE" ||
								(T === "LINK" && d.rel.toLowerCase() === "stylesheet") ||
								a.removeChild(d),
								(d = y));
						}
					} else a === "body" && tl(t.ownerDocument.body);
				a = c;
			} while (a);
			Za(i);
		}
		function my(t, i) {
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
		function Ff(t) {
			var i = t.firstChild;
			for (i && i.nodeType === 10 && (i = i.nextSibling); i; ) {
				var a = i;
				switch (((i = i.nextSibling), a.nodeName)) {
					case "HTML":
					case "HEAD":
					case "BODY":
						(Ff(a), tc(a));
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
		function Sw(t, i, a, l) {
			for (; t.nodeType === 1; ) {
				var c = a;
				if (t.nodeName.toLowerCase() !== i.toLowerCase()) {
					if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
				} else if (l) {
					if (!t[bu])
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
				if (((t = In(t.nextSibling)), t === null)) break;
			}
			return null;
		}
		function _w(t, i, a) {
			if (i === "") return null;
			for (; t.nodeType !== 3; )
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !a) ||
					((t = In(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function vy(t, i) {
			for (; t.nodeType !== 8; )
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i) ||
					((t = In(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function Xf(t) {
			return t.data === "$?" || t.data === "$~";
		}
		function Jf(t) {
			return t.data === "$!" || (t.data === "$?" && t.ownerDocument.readyState !== "loading");
		}
		function ww(t, i) {
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
		function In(t) {
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
		var Wf = null;
		function gy(t) {
			t = t.nextSibling;
			for (var i = 0; t; ) {
				if (t.nodeType === 8) {
					var a = t.data;
					if (a === "/$" || a === "/&") {
						if (i === 0) return In(t.nextSibling);
						i--;
					} else (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") || i++;
				}
				t = t.nextSibling;
			}
			return null;
		}
		function yy(t) {
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
		function py(t, i, a) {
			switch (((i = Us(a)), t)) {
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
		function tl(t) {
			for (var i = t.attributes; i.length; ) t.removeAttributeNode(i[0]);
			tc(t);
		}
		var Vn = new Map(),
			by = new Set();
		function $s(t) {
			return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
		}
		var Mi = H.d;
		H.d = { f: Ew, r: Tw, D: xw, C: Aw, L: Cw, m: Rw, X: Nw, S: Ow, M: kw };
		function Ew() {
			var t = Mi.f(),
				i = Ns();
			return t || i;
		}
		function Tw(t) {
			var i = sa(t);
			i !== null && i.tag === 5 && i.type === "form" ? Uv(i) : Mi.r(t);
		}
		var Ba = typeof document > "u" ? null : document;
		function Sy(t, i, a) {
			var l = Ba;
			if (l && typeof i == "string" && i) {
				var c = zn(i);
				((c = 'link[rel="' + t + '"][href="' + c + '"]'),
					typeof a == "string" && (c += '[crossorigin="' + a + '"]'),
					by.has(c) ||
						(by.add(c),
						(t = { rel: t, crossOrigin: a, href: i }),
						l.querySelector(c) === null &&
							((i = l.createElement("link")), tn(i, "link", t), Yt(i), l.head.appendChild(i))));
			}
		}
		function xw(t) {
			(Mi.D(t), Sy("dns-prefetch", t, null));
		}
		function Aw(t, i) {
			(Mi.C(t, i), Sy("preconnect", t, i));
		}
		function Cw(t, i, a) {
			Mi.L(t, i, a);
			var l = Ba;
			if (l && t && i) {
				var c = 'link[rel="preload"][as="' + zn(i) + '"]';
				i === "image" && a && a.imageSrcSet
					? ((c += '[imagesrcset="' + zn(a.imageSrcSet) + '"]'),
						typeof a.imageSizes == "string" && (c += '[imagesizes="' + zn(a.imageSizes) + '"]'))
					: (c += '[href="' + zn(t) + '"]');
				var d = c;
				switch (i) {
					case "style":
						d = Ia(t);
						break;
					case "script":
						d = Va(t);
				}
				Vn.has(d) ||
					((t = b({ rel: "preload", href: i === "image" && a && a.imageSrcSet ? void 0 : t, as: i }, a)),
					Vn.set(d, t),
					l.querySelector(c) !== null ||
						(i === "style" && l.querySelector(nl(d))) ||
						(i === "script" && l.querySelector(il(d))) ||
						((i = l.createElement("link")), tn(i, "link", t), Yt(i), l.head.appendChild(i)));
			}
		}
		function Rw(t, i) {
			Mi.m(t, i);
			var a = Ba;
			if (a && t) {
				var l = i && typeof i.as == "string" ? i.as : "script",
					c = 'link[rel="modulepreload"][as="' + zn(l) + '"][href="' + zn(t) + '"]',
					d = c;
				switch (l) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script":
						d = Va(t);
				}
				if (!Vn.has(d) && ((t = b({ rel: "modulepreload", href: t }, i)), Vn.set(d, t), a.querySelector(c) === null)) {
					switch (l) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script":
							if (a.querySelector(il(d))) return;
					}
					((l = a.createElement("link")), tn(l, "link", t), Yt(l), a.head.appendChild(l));
				}
			}
		}
		function Ow(t, i, a) {
			Mi.S(t, i, a);
			var l = Ba;
			if (l && t) {
				var c = oa(l).hoistableStyles,
					d = Ia(t);
				i = i || "default";
				var y = c.get(d);
				if (!y) {
					var T = { loading: 0, preload: null };
					if ((y = l.querySelector(nl(d)))) T.loading = 5;
					else {
						((t = b({ rel: "stylesheet", href: t, "data-precedence": i }, a)), (a = Vn.get(d)) && ed(t, a));
						var z = (y = l.createElement("link"));
						(Yt(z),
							tn(z, "link", t),
							(z._p = new Promise(function (V, J) {
								((z.onload = V), (z.onerror = J));
							})),
							z.addEventListener("load", function () {
								T.loading |= 1;
							}),
							z.addEventListener("error", function () {
								T.loading |= 2;
							}),
							(T.loading |= 4),
							Bs(y, i, l));
					}
					((y = { type: "stylesheet", instance: y, count: 1, state: T }), c.set(d, y));
				}
			}
		}
		function Nw(t, i) {
			Mi.X(t, i);
			var a = Ba;
			if (a && t) {
				var l = oa(a).hoistableScripts,
					c = Va(t),
					d = l.get(c);
				d ||
					((d = a.querySelector(il(c))),
					d ||
						((t = b({ src: t, async: !0 }, i)),
						(i = Vn.get(c)) && td(t, i),
						(d = a.createElement("script")),
						Yt(d),
						tn(d, "link", t),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					l.set(c, d));
			}
		}
		function kw(t, i) {
			Mi.M(t, i);
			var a = Ba;
			if (a && t) {
				var l = oa(a).hoistableScripts,
					c = Va(t),
					d = l.get(c);
				d ||
					((d = a.querySelector(il(c))),
					d ||
						((t = b({ src: t, async: !0, type: "module" }, i)),
						(i = Vn.get(c)) && td(t, i),
						(d = a.createElement("script")),
						Yt(d),
						tn(d, "link", t),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					l.set(c, d));
			}
		}
		function _y(t, i, a, l) {
			var c = (c = ye.current) ? $s(c) : null;
			if (!c) throw Error(s(446));
			switch (t) {
				case "meta":
				case "title":
					return null;
				case "style":
					return typeof a.precedence == "string" && typeof a.href == "string"
						? ((i = Ia(a.href)),
							(a = oa(c).hoistableStyles),
							(l = a.get(i)),
							l || ((l = { type: "style", instance: null, count: 0, state: null }), a.set(i, l)),
							l)
						: { type: "void", instance: null, count: 0, state: null };
				case "link":
					if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
						t = Ia(a.href);
						var d = oa(c).hoistableStyles,
							y = d.get(t);
						if (
							(y ||
								((c = c.ownerDocument || c),
								(y = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }),
								d.set(t, y),
								(d = c.querySelector(nl(t))) && !d._p && ((y.instance = d), (y.state.loading = 5)),
								Vn.has(t) ||
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
									Vn.set(t, a),
									d || Mw(c, t, a, y.state))),
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
							? ((i = Va(a)),
								(a = oa(c).hoistableScripts),
								(l = a.get(i)),
								l || ((l = { type: "script", instance: null, count: 0, state: null }), a.set(i, l)),
								l)
							: { type: "void", instance: null, count: 0, state: null }
					);
				default:
					throw Error(s(444, t));
			}
		}
		function Ia(t) {
			return 'href="' + zn(t) + '"';
		}
		function nl(t) {
			return 'link[rel="stylesheet"][' + t + "]";
		}
		function wy(t) {
			return b({}, t, { "data-precedence": t.precedence, precedence: null });
		}
		function Mw(t, i, a, l) {
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
					tn(i, "link", a),
					Yt(i),
					t.head.appendChild(i));
		}
		function Va(t) {
			return '[src="' + zn(t) + '"]';
		}
		function il(t) {
			return "script[async]" + t;
		}
		function Ey(t, i, a) {
			if ((i.count++, i.instance === null))
				switch (i.type) {
					case "style":
						var l = t.querySelector('style[data-href~="' + zn(a.href) + '"]');
						if (l) return ((i.instance = l), Yt(l), l);
						var c = b({}, a, { "data-href": a.href, "data-precedence": a.precedence, href: null, precedence: null });
						return (
							(l = (t.ownerDocument || t).createElement("style")),
							Yt(l),
							tn(l, "style", c),
							Bs(l, a.precedence, t),
							(i.instance = l)
						);
					case "stylesheet":
						c = Ia(a.href);
						var d = t.querySelector(nl(c));
						if (d) return ((i.state.loading |= 4), (i.instance = d), Yt(d), d);
						((l = wy(a)), (c = Vn.get(c)) && ed(l, c), (d = (t.ownerDocument || t).createElement("link")), Yt(d));
						var y = d;
						return (
							(y._p = new Promise(function (T, z) {
								((y.onload = T), (y.onerror = z));
							})),
							tn(d, "link", l),
							(i.state.loading |= 4),
							Bs(d, a.precedence, t),
							(i.instance = d)
						);
					case "script":
						return (
							(d = Va(a.src)),
							(c = t.querySelector(il(d)))
								? ((i.instance = c), Yt(c), c)
								: ((l = a),
									(c = Vn.get(d)) && ((l = b({}, a)), td(l, c)),
									(t = t.ownerDocument || t),
									(c = t.createElement("script")),
									Yt(c),
									tn(c, "link", l),
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
					((l = i.instance), (i.state.loading |= 4), Bs(l, a.precedence, t));
			return i.instance;
		}
		function Bs(t, i, a) {
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
		function ed(t, i) {
			((t.crossOrigin ??= i.crossOrigin), (t.referrerPolicy ??= i.referrerPolicy), (t.title ??= i.title));
		}
		function td(t, i) {
			((t.crossOrigin ??= i.crossOrigin), (t.referrerPolicy ??= i.referrerPolicy), (t.integrity ??= i.integrity));
		}
		var Is = null;
		function Ty(t, i, a) {
			if (Is === null) {
				var l = new Map(),
					c = (Is = new Map());
				c.set(a, l);
			} else ((c = Is), (l = c.get(a)), l || ((l = new Map()), c.set(a, l)));
			if (l.has(t)) return l;
			for (l.set(t, null), a = a.getElementsByTagName(t), c = 0; c < a.length; c++) {
				var d = a[c];
				if (
					!(d[bu] || d[Xt] || (t === "link" && d.getAttribute("rel") === "stylesheet")) &&
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
		function xy(t, i, a) {
			((t = t.ownerDocument || t), t.head.insertBefore(a, i === "title" ? t.querySelector("head > title") : null));
		}
		function zw(t, i, a) {
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
		function Ay(t) {
			return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
		}
		function Dw(t, i, a, l) {
			if (
				a.type === "stylesheet" &&
				(typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
				(a.state.loading & 4) === 0
			) {
				if (a.instance === null) {
					var c = Ia(l.href),
						d = i.querySelector(nl(c));
					if (d) {
						((i = d._p),
							i !== null &&
								typeof i == "object" &&
								typeof i.then == "function" &&
								(t.count++, (t = Vs.bind(t)), i.then(t, t)),
							(a.state.loading |= 4),
							(a.instance = d),
							Yt(d));
						return;
					}
					((d = i.ownerDocument || i), (l = wy(l)), (c = Vn.get(c)) && ed(l, c), (d = d.createElement("link")), Yt(d));
					var y = d;
					((y._p = new Promise(function (T, z) {
						((y.onload = T), (y.onerror = z));
					})),
						tn(d, "link", l),
						(a.instance = d));
				}
				(t.stylesheets === null && (t.stylesheets = new Map()),
					t.stylesheets.set(a, i),
					(i = a.state.preload) &&
						(a.state.loading & 3) === 0 &&
						(t.count++, (a = Vs.bind(t)), i.addEventListener("load", a), i.addEventListener("error", a)));
			}
		}
		var nd = 0;
		function jw(t, i) {
			return (
				t.stylesheets && t.count === 0 && Hs(t, t.stylesheets),
				0 < t.count || 0 < t.imgCount
					? function (a) {
							var l = setTimeout(function () {
								if ((t.stylesheets && Hs(t, t.stylesheets), t.unsuspend)) {
									var d = t.unsuspend;
									((t.unsuspend = null), d());
								}
							}, 6e4 + i);
							0 < t.imgBytes && nd === 0 && (nd = 62500 * vw());
							var c = setTimeout(
								function () {
									if (
										((t.waitingForImages = !1), t.count === 0 && (t.stylesheets && Hs(t, t.stylesheets), t.unsuspend))
									) {
										var d = t.unsuspend;
										((t.unsuspend = null), d());
									}
								},
								(t.imgBytes > nd ? 50 : 800) + i,
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
		function Vs() {
			if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
				if (this.stylesheets) Hs(this, this.stylesheets);
				else if (this.unsuspend) {
					var t = this.unsuspend;
					((this.unsuspend = null), t());
				}
			}
		}
		var Zs = null;
		function Hs(t, i) {
			((t.stylesheets = null),
				t.unsuspend !== null && (t.count++, (Zs = new Map()), i.forEach(Lw, t), (Zs = null), Vs.call(t)));
		}
		function Lw(t, i) {
			if (!(i.state.loading & 4)) {
				var a = Zs.get(t);
				if (a) var l = a.get(null);
				else {
					((a = new Map()), Zs.set(t, a));
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
					(l = Vs.bind(this)),
					c.addEventListener("load", l),
					c.addEventListener("error", l),
					d
						? d.parentNode.insertBefore(c, d.nextSibling)
						: ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(c, t.firstChild)),
					(i.state.loading |= 4));
			}
		}
		var rl = { $$typeof: R, Provider: null, Consumer: null, _currentValue: le, _currentValue2: le, _threadCount: 0 };
		function qw(t, i, a, l, c, d, y, T, z) {
			((this.tag = 1),
				(this.containerInfo = t),
				(this.pingCache = this.current = this.pendingChildren = null),
				(this.timeoutHandle = -1),
				(this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null),
				(this.callbackPriority = 0),
				(this.expirationTimes = we(-1)),
				(this.entangledLanes =
					this.shellSuspendCounter =
					this.errorRecoveryDisabledLanes =
					this.expiredLanes =
					this.warmLanes =
					this.pingedLanes =
					this.suspendedLanes =
					this.pendingLanes =
						0),
				(this.entanglements = we(0)),
				(this.hiddenUpdates = we(null)),
				(this.identifierPrefix = l),
				(this.onUncaughtError = c),
				(this.onCaughtError = d),
				(this.onRecoverableError = y),
				(this.pooledCache = null),
				(this.pooledCacheLanes = 0),
				(this.formState = z),
				(this.incompleteTransitions = new Map()));
		}
		function Uw(t, i, a, l, c, d, y, T, z, V, J, ne) {
			return (
				(t = new qw(t, i, a, y, z, V, J, ne, T)),
				(i = 1),
				d === !0 && (i |= 24),
				(d = Tn(3, null, null, i)),
				(t.current = d),
				(d.stateNode = t),
				(i = jc()),
				i.refCount++,
				(t.pooledCache = i),
				i.refCount++,
				(d.memoizedState = { element: l, isDehydrated: a, cache: i }),
				$c(d),
				t
			);
		}
		function $w(t) {
			return t ? ((t = ba), t) : ba;
		}
		function Cy(t, i, a, l, c, d) {
			((c = $w(c)),
				l.context === null ? (l.context = c) : (l.pendingContext = c),
				(l = Br(i)),
				(l.payload = { element: a }),
				(d = d === void 0 ? null : d),
				d !== null && (l.callback = d),
				(a = Ir(t, l, i)),
				a !== null && (yn(a, t, i), Lu(a, t, i)));
		}
		function Ry(t, i) {
			if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
				var a = t.retryLane;
				t.retryLane = a !== 0 && a < i ? a : i;
			}
		}
		function id(t, i) {
			(Ry(t, i), (t = t.alternate) && Ry(t, i));
		}
		function Oy(t) {
			if (t.tag === 13 || t.tag === 31) {
				var i = kr(t, 67108864);
				(i !== null && yn(i, t, 67108864), id(t, 67108864));
			}
		}
		function Ny(t) {
			if (t.tag === 13 || t.tag === 31) {
				var i = Bn();
				i = ti(i);
				var a = kr(t, i);
				(a !== null && yn(a, t, i), id(t, i));
			}
		}
		var Ps = !0;
		function Bw(t, i, a, l) {
			var c = $.T;
			$.T = null;
			var d = H.p;
			try {
				((H.p = 2), rd(t, i, a, l));
			} finally {
				((H.p = d), ($.T = c));
			}
		}
		function Iw(t, i, a, l) {
			var c = $.T;
			$.T = null;
			var d = H.p;
			try {
				((H.p = 8), rd(t, i, a, l));
			} finally {
				((H.p = d), ($.T = c));
			}
		}
		function rd(t, i, a, l) {
			if (Ps) {
				var c = ad(l);
				if (c === null) (Hf(t, i, l, Qs, a), My(t, l));
				else if (Zw(c, t, i, a, l)) l.stopPropagation();
				else if ((My(t, l), i & 4 && -1 < Vw.indexOf(t))) {
					for (; c !== null; ) {
						var d = sa(c);
						if (d !== null)
							switch (d.tag) {
								case 3:
									if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
										var y = wn(d.pendingLanes);
										if (y !== 0) {
											var T = d;
											for (T.pendingLanes |= 2, T.entangledLanes |= 2; y; ) {
												var z = 1 << (31 - Ve(y));
												((T.entanglements[1] |= z), (y &= ~z));
											}
											(ki(d), (Qe & 6) === 0 && ((Rs = Ne() + 500), Ju(0, !1)));
										}
									}
									break;
								case 31:
								case 13:
									((T = kr(d, 2)), T !== null && yn(T, d, 2), Ns(), id(d, 2));
							}
						if (((d = ad(l)), d === null && Hf(t, i, l, Qs, a), d === c)) break;
						c = d;
					}
					c !== null && l.stopPropagation();
				} else Hf(t, i, l, null, a);
			}
		}
		function ad(t) {
			return ((t = lc(t)), ud(t));
		}
		var Qs = null;
		function ud(t) {
			if (((Qs = null), (t = la(t)), t !== null)) {
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
			return ((Qs = t), null);
		}
		function ky(t) {
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
					switch (Tt()) {
						case Ft:
							return 2;
						case St:
							return 8;
						case kt:
						case vu:
							return 32;
						case hi:
							return 268435456;
						default:
							return 32;
					}
				default:
					return 32;
			}
		}
		var ld = !1,
			cr = null,
			fr = null,
			dr = null,
			al = new Map(),
			ul = new Map(),
			hr = [],
			Vw =
				"mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
					" ",
				);
		function My(t, i) {
			switch (t) {
				case "focusin":
				case "focusout":
					cr = null;
					break;
				case "dragenter":
				case "dragleave":
					fr = null;
					break;
				case "mouseover":
				case "mouseout":
					dr = null;
					break;
				case "pointerover":
				case "pointerout":
					al.delete(i.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture":
					ul.delete(i.pointerId);
			}
		}
		function ll(t, i, a, l, c, d) {
			return t === null || t.nativeEvent !== d
				? ((t = { blockedOn: i, domEventName: a, eventSystemFlags: l, nativeEvent: d, targetContainers: [c] }),
					i !== null && ((i = sa(i)), i !== null && Oy(i)),
					t)
				: ((t.eventSystemFlags |= l), (i = t.targetContainers), c !== null && i.indexOf(c) === -1 && i.push(c), t);
		}
		function Zw(t, i, a, l, c) {
			switch (i) {
				case "focusin":
					return ((cr = ll(cr, t, i, a, l, c)), !0);
				case "dragenter":
					return ((fr = ll(fr, t, i, a, l, c)), !0);
				case "mouseover":
					return ((dr = ll(dr, t, i, a, l, c)), !0);
				case "pointerover":
					var d = c.pointerId;
					return (al.set(d, ll(al.get(d) || null, t, i, a, l, c)), !0);
				case "gotpointercapture":
					return ((d = c.pointerId), ul.set(d, ll(ul.get(d) || null, t, i, a, l, c)), !0);
			}
			return !1;
		}
		function zy(t) {
			var i = la(t.target);
			if (i !== null) {
				var a = f(i);
				if (a !== null) {
					if (((i = a.tag), i === 13)) {
						if (((i = h(a)), i !== null)) {
							((t.blockedOn = i),
								yu(t.priority, function () {
									Ny(a);
								}));
							return;
						}
					} else if (i === 31) {
						if (((i = m(a)), i !== null)) {
							((t.blockedOn = i),
								yu(t.priority, function () {
									Ny(a);
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
		function Ks(t) {
			if (t.blockedOn !== null) return !1;
			for (var i = t.targetContainers; 0 < i.length; ) {
				var a = ad(t.nativeEvent);
				if (a === null) {
					a = t.nativeEvent;
					var l = new a.constructor(a.type, a);
					((uc = l), a.target.dispatchEvent(l), (uc = null));
				} else return ((i = sa(a)), i !== null && Oy(i), (t.blockedOn = a), !1);
				i.shift();
			}
			return !0;
		}
		function Dy(t, i, a) {
			Ks(t) && a.delete(i);
		}
		function Hw() {
			((ld = !1),
				cr !== null && Ks(cr) && (cr = null),
				fr !== null && Ks(fr) && (fr = null),
				dr !== null && Ks(dr) && (dr = null),
				al.forEach(Dy),
				ul.forEach(Dy));
		}
		function Ys(t, i) {
			t.blockedOn === i &&
				((t.blockedOn = null), ld || ((ld = !0), n.unstable_scheduleCallback(n.unstable_NormalPriority, Hw)));
		}
		var Gs = null;
		function jy(t) {
			Gs !== t &&
				((Gs = t),
				n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
					Gs === t && (Gs = null);
					for (var i = 0; i < t.length; i += 3) {
						var a = t[i],
							l = t[i + 1],
							c = t[i + 2];
						if (typeof l != "function") {
							if (ud(l || a) === null) continue;
							break;
						}
						var d = sa(a);
						d !== null &&
							(t.splice(i, 3), (i -= 3), uf(d, { pending: !0, data: c, method: a.method, action: l }, l, c));
					}
				}));
		}
		function Za(t) {
			function i(z) {
				return Ys(z, t);
			}
			(cr !== null && Ys(cr, t), fr !== null && Ys(fr, t), dr !== null && Ys(dr, t), al.forEach(i), ul.forEach(i));
			for (var a = 0; a < hr.length; a++) {
				var l = hr[a];
				l.blockedOn === t && (l.blockedOn = null);
			}
			for (; 0 < hr.length && ((a = hr[0]), a.blockedOn === null); ) (zy(a), a.blockedOn === null && hr.shift());
			if (((a = (t.ownerDocument || t).$$reactFormReplay), a != null))
				for (l = 0; l < a.length; l += 3) {
					var c = a[l],
						d = a[l + 1],
						y = c[fn] || null;
					if (typeof d == "function") y || jy(a);
					else if (y) {
						var T = null;
						if (d && d.hasAttribute("formAction")) {
							if (((c = d), (y = d[fn] || null))) T = y.formAction;
							else if (ud(c) !== null) continue;
						} else T = y.action;
						(typeof T == "function" ? (a[l + 1] = T) : (a.splice(l, 3), (l -= 3)), jy(a));
					}
				}
		}
		function Pw() {
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
		function sd(t) {
			this._internalRoot = t;
		}
		((od.prototype.render = sd.prototype.render =
			function (t) {
				var i = this._internalRoot;
				if (i === null) throw Error(s(409));
				var a = i.current;
				Cy(a, Bn(), t, i, null, null);
			}),
			(od.prototype.unmount = sd.prototype.unmount =
				function () {
					var t = this._internalRoot;
					if (t !== null) {
						this._internalRoot = null;
						var i = t.containerInfo;
						(Cy(t.current, 2, null, t, null, null), Ns(), (i[pu] = null));
					}
				}));
		function od(t) {
			this._internalRoot = t;
		}
		od.prototype.unstable_scheduleHydration = function (t) {
			if (t) {
				var i = gu();
				t = { blockedOn: null, target: t, priority: i };
				for (var a = 0; a < hr.length && i !== 0 && i < hr[a].priority; a++);
				(hr.splice(a, 0, t), a === 0 && zy(t));
			}
		};
		var Ly = r.version;
		if (Ly !== "19.2.8") throw Error(s(527, Ly, "19.2.8"));
		H.findDOMNode = function (t) {
			var i = t._reactInternals;
			if (i === void 0)
				throw typeof t.render == "function" ? Error(s(188)) : ((t = Object.keys(t).join(",")), Error(s(268, t)));
			return ((t = g(i)), (t = t !== null ? _(t) : null), (t = t === null ? null : t.stateNode), t);
		};
		var Qw = {
			bundleType: 0,
			version: "19.2.8",
			rendererPackageName: "react-dom",
			currentDispatcherRef: $,
			reconcilerVersion: "19.2.8",
		};
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
			var Fs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (!Fs.isDisabled && Fs.supportsFiber)
				try {
					((ve = Fs.inject(Qw)), (_e = Fs));
				} catch {}
		}
		e.createRoot = function (t, i) {
			if (!o(t)) throw Error(s(299));
			var a = !1,
				l = "",
				c = I_,
				d = V_,
				y = Z_;
			return (
				i != null &&
					(i.unstable_strictMode === !0 && (a = !0),
					i.identifierPrefix !== void 0 && (l = i.identifierPrefix),
					i.onUncaughtError !== void 0 && (c = i.onUncaughtError),
					i.onCaughtError !== void 0 && (d = i.onCaughtError),
					i.onRecoverableError !== void 0 && (y = i.onRecoverableError)),
				(i = Uw(t, 1, !1, null, null, a, l, null, c, d, y, Pw)),
				(t[pu] = i.current),
				iy(t),
				new sd(i)
			);
		};
	}),
	UE = Qn((e, n) => {
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
		(r(), (n.exports = qE()));
	}),
	u0;
function te(e, n, r) {
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
var Wa = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	},
	Up = class extends Error {
		constructor(e) {
			(super(`Encountered unidirectional transform during encode: ${e}`), (this.name = "ZodEncodeError"));
		}
	};
(u0 = globalThis).__zod_globalConfig ?? (u0.__zod_globalConfig = {});
var go = globalThis.__zod_globalConfig;
function $i(e) {
	return (e && Object.assign(go, e), go);
}
function $p(e) {
	const n = Object.values(e).filter((r) => typeof r == "number");
	return Object.entries(e)
		.filter(([r, u]) => n.indexOf(+r) === -1)
		.map(([r, u]) => u);
}
function Id(e, n) {
	return typeof n == "bigint" ? n.toString() : n;
}
function ah(e) {
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
function uh(e) {
	return e == null;
}
function lh(e) {
	const n = e.startsWith("^") ? 1 : 0,
		r = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(n, r);
}
function $E(e, n) {
	const r = e / n,
		u = Math.round(r),
		s = Number.EPSILON * Math.max(Math.abs(r), 1);
	return Math.abs(r - u) < s ? 0 : r - u;
}
var l0 = Symbol("evaluating");
function tt(e, n, r) {
	let u;
	Object.defineProperty(e, n, {
		get() {
			if (u !== l0) return (u === void 0 && ((u = l0), (u = r())), u);
		},
		set(s) {
			Object.defineProperty(e, n, { value: s });
		},
		configurable: !0,
	});
}
function ia(e, n, r) {
	Object.defineProperty(e, n, { value: r, writable: !0, enumerable: !0, configurable: !0 });
}
function Er(...e) {
	const n = {};
	for (const r of e) {
		const u = Object.getOwnPropertyDescriptors(r);
		Object.assign(n, u);
	}
	return Object.defineProperties({}, n);
}
function s0(e) {
	return JSON.stringify(e);
}
function BE(e) {
	return e
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}
var Bp = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function yo(e) {
	return typeof e == "object" && e !== null && !Array.isArray(e);
}
var IE = ah(() => {
	if (go.jitless || (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))) return !1;
	try {
		return !1;
	} catch {
		return !1;
	}
});
function au(e) {
	if (yo(e) === !1) return !1;
	const n = e.constructor;
	if (n === void 0 || typeof n != "function") return !0;
	const r = n.prototype;
	return !(yo(r) === !1 || Object.prototype.hasOwnProperty.call(r, "isPrototypeOf") === !1);
}
function Ip(e) {
	return au(e)
		? { ...e }
		: Array.isArray(e)
			? [...e]
			: e instanceof Map
				? new Map(e)
				: e instanceof Set
					? new Set(e)
					: e;
}
var VE = new Set(["string", "number", "symbol"]);
function uu(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Tr(e, n, r) {
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
function ZE(e) {
	return Object.keys(e).filter((n) => e[n]._zod.optin === "optional" && e[n]._zod.optout === "optional");
}
var HE = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
function PE(e, n) {
	const r = e._zod.def,
		u = r.checks;
	if (u && u.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	return Tr(
		e,
		Er(e._zod.def, {
			get shape() {
				const s = {};
				for (const o in n) {
					if (!(o in r.shape)) throw new Error(`Unrecognized key: "${o}"`);
					n[o] && (s[o] = r.shape[o]);
				}
				return (ia(this, "shape", s), s);
			},
			checks: [],
		}),
	);
}
function QE(e, n) {
	const r = e._zod.def,
		u = r.checks;
	if (u && u.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	return Tr(
		e,
		Er(e._zod.def, {
			get shape() {
				const s = { ...e._zod.def.shape };
				for (const o in n) {
					if (!(o in r.shape)) throw new Error(`Unrecognized key: "${o}"`);
					n[o] && delete s[o];
				}
				return (ia(this, "shape", s), s);
			},
			checks: [],
		}),
	);
}
function KE(e, n) {
	if (!au(n)) throw new Error("Invalid input to extend: expected a plain object");
	const r = e._zod.def.checks;
	if (r && r.length > 0) {
		const u = e._zod.def.shape;
		for (const s in n)
			if (Object.getOwnPropertyDescriptor(u, s) !== void 0)
				throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return Tr(
		e,
		Er(e._zod.def, {
			get shape() {
				const u = { ...e._zod.def.shape, ...n };
				return (ia(this, "shape", u), u);
			},
		}),
	);
}
function YE(e, n) {
	if (!au(n)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return Tr(
		e,
		Er(e._zod.def, {
			get shape() {
				const r = { ...e._zod.def.shape, ...n };
				return (ia(this, "shape", r), r);
			},
		}),
	);
}
function GE(e, n) {
	if (e._zod.def.checks?.length)
		throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return Tr(
		e,
		Er(e._zod.def, {
			get shape() {
				const r = { ...e._zod.def.shape, ...n._zod.def.shape };
				return (ia(this, "shape", r), r);
			},
			get catchall() {
				return n._zod.def.catchall;
			},
			checks: n._zod.def.checks ?? [],
		}),
	);
}
function FE(e, n, r) {
	const u = n._zod.def.checks;
	if (u && u.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
	return Tr(
		n,
		Er(n._zod.def, {
			get shape() {
				const s = n._zod.def.shape,
					o = { ...s };
				if (r)
					for (const f in r) {
						if (!(f in s)) throw new Error(`Unrecognized key: "${f}"`);
						r[f] && (o[f] = e ? new e({ type: "optional", innerType: s[f] }) : s[f]);
					}
				else for (const f in s) o[f] = e ? new e({ type: "optional", innerType: s[f] }) : s[f];
				return (ia(this, "shape", o), o);
			},
			checks: [],
		}),
	);
}
function XE(e, n, r) {
	return Tr(
		n,
		Er(n._zod.def, {
			get shape() {
				const u = n._zod.def.shape,
					s = { ...u };
				if (r)
					for (const o in r) {
						if (!(o in s)) throw new Error(`Unrecognized key: "${o}"`);
						r[o] && (s[o] = new e({ type: "nonoptional", innerType: u[o] }));
					}
				else for (const o in u) s[o] = new e({ type: "nonoptional", innerType: u[o] });
				return (ia(this, "shape", s), s);
			},
		}),
	);
}
function Ga(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let r = n; r < e.issues.length; r++) if (e.issues[r]?.continue !== !0) return !0;
	return !1;
}
function JE(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let r = n; r < e.issues.length; r++) if (e.issues[r]?.continue === !1) return !0;
	return !1;
}
function Fa(e, n) {
	return n.map((r) => {
		var u;
		return ((u = r).path ?? (u.path = []), r.path.unshift(e), r);
	});
}
function eo(e) {
	return typeof e == "string" ? e : e?.message;
}
function Bi(e, n, r) {
	const u = e.message
			? e.message
			: (eo(e.inst?._zod.def?.error?.(e)) ??
				eo(n?.error?.(e)) ??
				eo(r.customError?.(e)) ??
				eo(r.localeError?.(e)) ??
				"Invalid input"),
		{ inst: s, continue: o, input: f, ...h } = e;
	return (h.path ?? (h.path = []), (h.message = u), n?.reportInput && (h.input = f), h);
}
function sh(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function yl(...e) {
	const [n, r, u] = e;
	return typeof n == "string" ? { message: n, code: "custom", input: r, inst: u } : { ...n };
}
var Vp = (e, n) => {
		((e.name = "$ZodError"),
			Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
			Object.defineProperty(e, "issues", { value: n, enumerable: !1 }),
			(e.message = JSON.stringify(n, Id, 2)),
			Object.defineProperty(e, "toString", { value: () => e.message, enumerable: !1 }));
	},
	Zp = te("$ZodError", Vp),
	Hp = te("$ZodError", Vp, { Parent: Error });
function WE(e, n = (r) => r.message) {
	const r = {},
		u = [];
	for (const s of e.issues)
		s.path.length > 0 ? ((r[s.path[0]] = r[s.path[0]] || []), r[s.path[0]].push(n(s))) : u.push(n(s));
	return { formErrors: u, fieldErrors: r };
}
function eT(e, n = (r) => r.message) {
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
var oh = (e) => (n, r, u, s) => {
		const o = u ? { ...u, async: !1 } : { async: !1 },
			f = n._zod.run({ value: r, issues: [] }, o);
		if (f instanceof Promise) throw new Wa();
		if (f.issues.length) {
			const h = new (s?.Err ?? e)(f.issues.map((m) => Bi(m, o, $i())));
			throw (Bp(h, s?.callee), h);
		}
		return f.value;
	},
	ch = (e) => async (n, r, u, s) => {
		const o = u ? { ...u, async: !0 } : { async: !0 };
		let f = n._zod.run({ value: r, issues: [] }, o);
		if ((f instanceof Promise && (f = await f), f.issues.length)) {
			const h = new (s?.Err ?? e)(f.issues.map((m) => Bi(m, o, $i())));
			throw (Bp(h, s?.callee), h);
		}
		return f.value;
	},
	No = (e) => (n, r, u) => {
		const s = u ? { ...u, async: !1 } : { async: !1 },
			o = n._zod.run({ value: r, issues: [] }, s);
		if (o instanceof Promise) throw new Wa();
		return o.issues.length
			? { success: !1, error: new (e ?? Zp)(o.issues.map((f) => Bi(f, s, $i()))) }
			: { success: !0, data: o.value };
	},
	tT = No(Hp),
	ko = (e) => async (n, r, u) => {
		const s = u ? { ...u, async: !0 } : { async: !0 };
		let o = n._zod.run({ value: r, issues: [] }, s);
		return (
			o instanceof Promise && (o = await o),
			o.issues.length
				? { success: !1, error: new e(o.issues.map((f) => Bi(f, s, $i()))) }
				: { success: !0, data: o.value }
		);
	},
	nT = ko(Hp),
	iT = (e) => (n, r, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return oh(e)(n, r, s);
	},
	rT = (e) => (n, r, u) => oh(e)(n, r, u),
	aT = (e) => async (n, r, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return ch(e)(n, r, s);
	},
	uT = (e) => async (n, r, u) => ch(e)(n, r, u),
	lT = (e) => (n, r, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return No(e)(n, r, s);
	},
	sT = (e) => (n, r, u) => No(e)(n, r, u),
	oT = (e) => async (n, r, u) => {
		const s = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return ko(e)(n, r, s);
	},
	cT = (e) => async (n, r, u) => ko(e)(n, r, u),
	fT = /^[cC][0-9a-z]{6,}$/,
	dT = /^[0-9a-z]+$/,
	hT = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
	mT = /^[0-9a-vA-V]{20}$/,
	vT = /^[A-Za-z0-9]{27}$/,
	gT = /^[a-zA-Z0-9_-]{21}$/,
	yT = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
	pT = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
	o0 = (e) =>
		e
			? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`)
			: /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
	bT = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
	ST = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function _T() {
	return new RegExp(ST, "u");
}
var wT =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	ET =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
	TT =
		/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
	xT =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	AT = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
	Pp = /^[A-Za-z0-9_-]*$/,
	CT = /^https?$/,
	RT = /^\+[1-9]\d{6,14}$/,
	Qp =
		"(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
	OT = new RegExp(`^${Qp}$`);
function Kp(e) {
	const n = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number"
		? e.precision === -1
			? `${n}`
			: e.precision === 0
				? `${n}:[0-5]\\d`
				: `${n}:[0-5]\\d\\.\\d{${e.precision}}`
		: `${n}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function NT(e) {
	return new RegExp(`^${Kp(e)}$`);
}
function kT(e) {
	const n = Kp({ precision: e.precision }),
		r = ["Z"];
	(e.local && r.push(""), e.offset && r.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)"));
	const u = `${n}(?:${r.join("|")})`;
	return new RegExp(`^${Qp}T(?:${u})$`);
}
var MT = (e) => {
		const n = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
		return new RegExp(`^${n}$`);
	},
	zT = /^-?\d+$/,
	Yp = /^-?\d+(?:\.\d+)?$/,
	DT = /^(?:true|false)$/i,
	jT = /^[^A-Z]*$/,
	LT = /^[^a-z]*$/,
	_n = te("$ZodCheck", (e, n) => {
		var r;
		(e._zod ?? (e._zod = {}), (e._zod.def = n), (r = e._zod).onattach ?? (r.onattach = []));
	}),
	Gp = { number: "number", bigint: "bigint", object: "date" },
	Fp = te("$ZodCheckLessThan", (e, n) => {
		_n.init(e, n);
		const r = Gp[typeof n.value];
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
	Xp = te("$ZodCheckGreaterThan", (e, n) => {
		_n.init(e, n);
		const r = Gp[typeof n.value];
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
	qT = te("$ZodCheckMultipleOf", (e, n) => {
		(_n.init(e, n),
			e._zod.onattach.push((r) => {
				var u;
				(u = r._zod.bag).multipleOf ?? (u.multipleOf = n.value);
			}),
			(e._zod.check = (r) => {
				if (typeof r.value != typeof n.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				(typeof r.value == "bigint" ? r.value % n.value === BigInt(0) : $E(r.value, n.value) === 0) ||
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
	UT = te("$ZodCheckNumberFormat", (e, n) => {
		(_n.init(e, n), (n.format = n.format || "float64"));
		const r = n.format?.includes("int"),
			u = r ? "int" : "number",
			[s, o] = HE[n.format];
		(e._zod.onattach.push((f) => {
			const h = f._zod.bag;
			((h.format = n.format), (h.minimum = s), (h.maximum = o), r && (h.pattern = zT));
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
	$T = te("$ZodCheckMaxLength", (e, n) => {
		var r;
		(_n.init(e, n),
			(r = e._zod.def).when ??
				(r.when = (u) => {
					const s = u.value;
					return !uh(s) && s.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
				n.maximum < s && (u._zod.bag.maximum = n.maximum);
			}),
			(e._zod.check = (u) => {
				const s = u.value;
				if (s.length <= n.maximum) return;
				const o = sh(s);
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
	BT = te("$ZodCheckMinLength", (e, n) => {
		var r;
		(_n.init(e, n),
			(r = e._zod.def).when ??
				(r.when = (u) => {
					const s = u.value;
					return !uh(s) && s.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
				n.minimum > s && (u._zod.bag.minimum = n.minimum);
			}),
			(e._zod.check = (u) => {
				const s = u.value;
				if (s.length >= n.minimum) return;
				const o = sh(s);
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
	IT = te("$ZodCheckLengthEquals", (e, n) => {
		var r;
		(_n.init(e, n),
			(r = e._zod.def).when ??
				(r.when = (u) => {
					const s = u.value;
					return !uh(s) && s.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const s = u._zod.bag;
				((s.minimum = n.length), (s.maximum = n.length), (s.length = n.length));
			}),
			(e._zod.check = (u) => {
				const s = u.value,
					o = s.length;
				if (o === n.length) return;
				const f = sh(s),
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
	Mo = te("$ZodCheckStringFormat", (e, n) => {
		var r, u;
		(_n.init(e, n),
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
	VT = te("$ZodCheckRegex", (e, n) => {
		(Mo.init(e, n),
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
	ZT = te("$ZodCheckLowerCase", (e, n) => {
		(n.pattern ?? (n.pattern = jT), Mo.init(e, n));
	}),
	HT = te("$ZodCheckUpperCase", (e, n) => {
		(n.pattern ?? (n.pattern = LT), Mo.init(e, n));
	}),
	PT = te("$ZodCheckIncludes", (e, n) => {
		_n.init(e, n);
		const r = uu(n.includes),
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
	QT = te("$ZodCheckStartsWith", (e, n) => {
		_n.init(e, n);
		const r = new RegExp(`^${uu(n.prefix)}.*`);
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
	KT = te("$ZodCheckEndsWith", (e, n) => {
		_n.init(e, n);
		const r = new RegExp(`.*${uu(n.suffix)}$`);
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
	YT = te("$ZodCheckOverwrite", (e, n) => {
		(_n.init(e, n),
			(e._zod.check = (r) => {
				r.value = n.tx(r.value);
			}));
	}),
	GT = class {
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
	FT = { major: 4, minor: 4, patch: 3 },
	yt = te("$ZodType", (e, n) => {
		var r;
		(e ?? (e = {}), (e._zod.def = n), (e._zod.bag = e._zod.bag || {}), (e._zod.version = FT));
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
					let v = Ga(f),
						g;
					for (const _ of h) {
						if (_._zod.def.when) {
							if (JE(f) || !_._zod.def.when(f)) continue;
						} else if (v) continue;
						const b = f.issues.length,
							p = _._zod.check(f);
						if (p instanceof Promise && m?.async === !1) throw new Wa();
						if (g || p instanceof Promise)
							g = (g ?? Promise.resolve()).then(async () => {
								(await p, f.issues.length !== b && (v || (v = Ga(f, b))));
							});
						else {
							if (f.issues.length === b) continue;
							v || (v = Ga(f, b));
						}
					}
					return g ? g.then(() => f) : f;
				},
				o = (f, h, m) => {
					if (Ga(f)) return ((f.aborted = !0), f);
					const v = s(h, u, m);
					if (v instanceof Promise) {
						if (m.async === !1) throw new Wa();
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
					if (h.async === !1) throw new Wa();
					return m.then((v) => s(v, u, h));
				}
				return s(m, u, h);
			};
		}
		tt(e, "~standard", () => ({
			validate: (s) => {
				try {
					const o = tT(e, s);
					return o.success ? { value: o.data } : { issues: o.error?.issues };
				} catch {
					return nT(e, s).then((f) => (f.success ? { value: f.data } : { issues: f.error?.issues }));
				}
			},
			vendor: "zod",
			version: 1,
		}));
	}),
	fh = te("$ZodString", (e, n) => {
		(yt.init(e, n),
			(e._zod.pattern = [...(e?._zod.bag?.patterns ?? [])].pop() ?? MT(e._zod.bag)),
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
	dt = te("$ZodStringFormat", (e, n) => {
		(Mo.init(e, n), fh.init(e, n));
	}),
	XT = te("$ZodGUID", (e, n) => {
		(n.pattern ?? (n.pattern = pT), dt.init(e, n));
	}),
	JT = te("$ZodUUID", (e, n) => {
		if (n.version) {
			const r = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[n.version];
			if (r === void 0) throw new Error(`Invalid UUID version: "${n.version}"`);
			n.pattern ?? (n.pattern = o0(r));
		} else n.pattern ?? (n.pattern = o0());
		dt.init(e, n);
	}),
	WT = te("$ZodEmail", (e, n) => {
		(n.pattern ?? (n.pattern = bT), dt.init(e, n));
	}),
	ex = te("$ZodURL", (e, n) => {
		(dt.init(e, n),
			(e._zod.check = (r) => {
				try {
					const u = r.value.trim();
					if (!n.normalize && n.protocol?.source === CT.source && !/^https?:\/\//i.test(u)) {
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
	tx = te("$ZodEmoji", (e, n) => {
		(n.pattern ?? (n.pattern = _T()), dt.init(e, n));
	}),
	nx = te("$ZodNanoID", (e, n) => {
		(n.pattern ?? (n.pattern = gT), dt.init(e, n));
	}),
	ix = te("$ZodCUID", (e, n) => {
		(n.pattern ?? (n.pattern = fT), dt.init(e, n));
	}),
	rx = te("$ZodCUID2", (e, n) => {
		(n.pattern ?? (n.pattern = dT), dt.init(e, n));
	}),
	ax = te("$ZodULID", (e, n) => {
		(n.pattern ?? (n.pattern = hT), dt.init(e, n));
	}),
	ux = te("$ZodXID", (e, n) => {
		(n.pattern ?? (n.pattern = mT), dt.init(e, n));
	}),
	lx = te("$ZodKSUID", (e, n) => {
		(n.pattern ?? (n.pattern = vT), dt.init(e, n));
	}),
	sx = te("$ZodISODateTime", (e, n) => {
		(n.pattern ?? (n.pattern = kT(n)), dt.init(e, n));
	}),
	ox = te("$ZodISODate", (e, n) => {
		(n.pattern ?? (n.pattern = OT), dt.init(e, n));
	}),
	cx = te("$ZodISOTime", (e, n) => {
		(n.pattern ?? (n.pattern = NT(n)), dt.init(e, n));
	}),
	fx = te("$ZodISODuration", (e, n) => {
		(n.pattern ?? (n.pattern = yT), dt.init(e, n));
	}),
	dx = te("$ZodIPv4", (e, n) => {
		(n.pattern ?? (n.pattern = wT), dt.init(e, n), (e._zod.bag.format = "ipv4"));
	}),
	hx = te("$ZodIPv6", (e, n) => {
		(n.pattern ?? (n.pattern = ET),
			dt.init(e, n),
			(e._zod.bag.format = "ipv6"),
			(e._zod.check = (r) => {
				try {
					new URL(`http://[${r.value}]`);
				} catch {
					r.issues.push({ code: "invalid_format", format: "ipv6", input: r.value, inst: e, continue: !n.abort });
				}
			}));
	}),
	mx = te("$ZodCIDRv4", (e, n) => {
		(n.pattern ?? (n.pattern = TT), dt.init(e, n));
	}),
	vx = te("$ZodCIDRv6", (e, n) => {
		(n.pattern ?? (n.pattern = xT),
			dt.init(e, n),
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
function Jp(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 !== 0) return !1;
	try {
		return (atob(e), !0);
	} catch {
		return !1;
	}
}
var gx = te("$ZodBase64", (e, n) => {
	(n.pattern ?? (n.pattern = AT),
		dt.init(e, n),
		(e._zod.bag.contentEncoding = "base64"),
		(e._zod.check = (r) => {
			Jp(r.value) ||
				r.issues.push({ code: "invalid_format", format: "base64", input: r.value, inst: e, continue: !n.abort });
		}));
});
function yx(e) {
	if (!Pp.test(e)) return !1;
	const n = e.replace(/[-_]/g, (r) => (r === "-" ? "+" : "/"));
	return Jp(n.padEnd(Math.ceil(n.length / 4) * 4, "="));
}
var px = te("$ZodBase64URL", (e, n) => {
		(n.pattern ?? (n.pattern = Pp),
			dt.init(e, n),
			(e._zod.bag.contentEncoding = "base64url"),
			(e._zod.check = (r) => {
				yx(r.value) ||
					r.issues.push({ code: "invalid_format", format: "base64url", input: r.value, inst: e, continue: !n.abort });
			}));
	}),
	bx = te("$ZodE164", (e, n) => {
		(n.pattern ?? (n.pattern = RT), dt.init(e, n));
	});
function Sx(e, n = null) {
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
var _x = te("$ZodJWT", (e, n) => {
		(dt.init(e, n),
			(e._zod.check = (r) => {
				Sx(r.value, n.alg) ||
					r.issues.push({ code: "invalid_format", format: "jwt", input: r.value, inst: e, continue: !n.abort });
			}));
	}),
	Wp = te("$ZodNumber", (e, n) => {
		(yt.init(e, n),
			(e._zod.pattern = e._zod.bag.pattern ?? Yp),
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
	wx = te("$ZodNumberFormat", (e, n) => {
		(UT.init(e, n), Wp.init(e, n));
	}),
	Ex = te("$ZodBoolean", (e, n) => {
		(yt.init(e, n),
			(e._zod.pattern = DT),
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
	Tx = te("$ZodUnknown", (e, n) => {
		(yt.init(e, n), (e._zod.parse = (r) => r));
	}),
	xx = te("$ZodNever", (e, n) => {
		(yt.init(e, n),
			(e._zod.parse = (r, u) => (
				r.issues.push({ expected: "never", code: "invalid_type", input: r.value, inst: e }),
				r
			)));
	});
function c0(e, n, r) {
	(e.issues.length && n.issues.push(...Fa(r, e.issues)), (n.value[r] = e.value));
}
var Ax = te("$ZodArray", (e, n) => {
	(yt.init(e, n),
		(e._zod.parse = (r, u) => {
			const s = r.value;
			if (!Array.isArray(s)) return (r.issues.push({ expected: "array", code: "invalid_type", input: s, inst: e }), r);
			r.value = Array(s.length);
			const o = [];
			for (let f = 0; f < s.length; f++) {
				const h = s[f],
					m = n.element._zod.run({ value: h, issues: [] }, u);
				m instanceof Promise ? o.push(m.then((v) => c0(v, r, f))) : c0(m, r, f);
			}
			return o.length ? Promise.all(o).then(() => r) : r;
		}));
});
function po(e, n, r, u, s, o) {
	const f = r in u;
	if (e.issues.length) {
		if (s && o && !f) return;
		n.issues.push(...Fa(r, e.issues));
	}
	if (!f && !s) {
		e.issues.length || n.issues.push({ code: "invalid_type", expected: "nonoptional", input: void 0, path: [r] });
		return;
	}
	e.value === void 0 ? f && (n.value[r] = void 0) : (n.value[r] = e.value);
}
function eb(e) {
	const n = Object.keys(e.shape);
	for (const u of n)
		if (!e.shape?.[u]?._zod?.traits?.has("$ZodType"))
			throw new Error(`Invalid element at key "${u}": expected a Zod schema`);
	const r = ZE(e.shape);
	return { ...e, keys: n, keySet: new Set(n), numKeys: n.length, optionalKeys: new Set(r) };
}
function tb(e, n, r, u, s, o) {
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
		p instanceof Promise ? e.push(p.then((E) => po(E, r, b, n, g, _))) : po(p, r, b, n, g, _);
	}
	return (
		f.length && r.issues.push({ code: "unrecognized_keys", keys: f, input: n, inst: o }),
		e.length ? Promise.all(e).then(() => r) : r
	);
}
var Cx = te("$ZodObject", (e, n) => {
		if ((yt.init(e, n), !Object.getOwnPropertyDescriptor(n, "shape")?.get)) {
			const f = n.shape;
			Object.defineProperty(n, "shape", {
				get: () => {
					const h = { ...f };
					return (Object.defineProperty(n, "shape", { value: h }), h);
				},
			});
		}
		const r = ah(() => eb(n));
		tt(e._zod, "propValues", () => {
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
		const u = yo,
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
				x instanceof Promise ? v.push(x.then((k) => po(k, f, _, m, p, E))) : po(x, f, _, m, p, E);
			}
			return s ? tb(v, m, f, h, r.value, e) : v.length ? Promise.all(v).then(() => f) : f;
		};
	}),
	Rx = te("$ZodObjectJIT", (e, n) => {
		Cx.init(e, n);
		const r = e._zod.parse,
			u = ah(() => eb(n)),
			s = (b) => {
				const p = new GT(["shape", "payload", "ctx"]),
					E = u.value,
					x = (A) => {
						const R = s0(A);
						return `shape[${R}]._zod.run({ value: input[${R}], issues: [] }, ctx)`;
					};
				p.write("const input = payload.value;");
				const k = Object.create(null);
				let D = 0;
				for (const A of E.keys) k[A] = `key_${D++}`;
				p.write("const newResult = {};");
				for (const A of E.keys) {
					const R = k[A],
						M = s0(A),
						Y = b[A],
						P = Y?._zod?.optin === "optional",
						j = Y?._zod?.optout === "optional";
					(p.write(`const ${R} = ${x(A)};`),
						P && j
							? p.write(`
        if (${R}.issues.length) {
          if (${M} in input) {
            payload.issues = payload.issues.concat(${R}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${M}, ...iss.path] : [${M}]
            })));
          }
        }
        
        if (${R}.value === undefined) {
          if (${M} in input) {
            newResult[${M}] = undefined;
          }
        } else {
          newResult[${M}] = ${R}.value;
        }
        
      `)
							: P
								? p.write(`
        if (${R}.issues.length) {
          payload.issues = payload.issues.concat(${R}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${M}, ...iss.path] : [${M}]
          })));
        }
        
        if (${R}.value === undefined) {
          if (${M} in input) {
            newResult[${M}] = undefined;
          }
        } else {
          newResult[${M}] = ${R}.value;
        }
        
      `)
								: p.write(`
        const ${R}_present = ${M} in input;
        if (${R}.issues.length) {
          payload.issues = payload.issues.concat(${R}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${M}, ...iss.path] : [${M}]
          })));
        }
        if (!${R}_present && !${R}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${M}]
          });
        }

        if (${R}_present) {
          if (${R}.value === undefined) {
            newResult[${M}] = undefined;
          } else {
            newResult[${M}] = ${R}.value;
          }
        }

      `));
				}
				(p.write("payload.value = newResult;"), p.write("return payload;"));
				const C = p.compile();
				return (A, R) => C(b, A, R);
			};
		let o;
		const f = yo,
			h = !go.jitless,
			v = h && IE.value,
			g = n.catchall;
		let _;
		e._zod.parse = (b, p) => {
			_ ?? (_ = u.value);
			const E = b.value;
			return f(E)
				? h && v && p?.async === !1 && p.jitless !== !0
					? (o || (o = s(n.shape)), (b = o(b, p)), g ? tb([], E, b, p, _, e) : b)
					: r(b, p)
				: (b.issues.push({ expected: "object", code: "invalid_type", input: E, inst: e }), b);
		};
	});
function f0(e, n, r, u) {
	for (const o of e) if (o.issues.length === 0) return ((n.value = o.value), n);
	const s = e.filter((o) => !Ga(o));
	return s.length === 1
		? ((n.value = s[0].value), s[0])
		: (n.issues.push({
				code: "invalid_union",
				input: n.value,
				inst: r,
				errors: e.map((o) => o.issues.map((f) => Bi(f, u, $i()))),
			}),
			n);
}
var Ox = te("$ZodUnion", (e, n) => {
		(yt.init(e, n),
			tt(e._zod, "optin", () => (n.options.some((u) => u._zod.optin === "optional") ? "optional" : void 0)),
			tt(e._zod, "optout", () => (n.options.some((u) => u._zod.optout === "optional") ? "optional" : void 0)),
			tt(e._zod, "values", () => {
				if (n.options.every((u) => u._zod.values)) return new Set(n.options.flatMap((u) => Array.from(u._zod.values)));
			}),
			tt(e._zod, "pattern", () => {
				if (n.options.every((u) => u._zod.pattern)) {
					const u = n.options.map((s) => s._zod.pattern);
					return new RegExp(`^(${u.map((s) => lh(s.source)).join("|")})$`);
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
			return o ? Promise.all(f).then((h) => f0(h, u, e, s)) : f0(f, u, e, s);
		};
	}),
	Nx = te("$ZodIntersection", (e, n) => {
		(yt.init(e, n),
			(e._zod.parse = (r, u) => {
				const s = r.value,
					o = n.left._zod.run({ value: s, issues: [] }, u),
					f = n.right._zod.run({ value: s, issues: [] }, u);
				return o instanceof Promise || f instanceof Promise
					? Promise.all([o, f]).then(([h, m]) => d0(r, h, m))
					: d0(r, o, f);
			}));
	});
function Vd(e, n) {
	if (e === n) return { valid: !0, data: e };
	if (e instanceof Date && n instanceof Date && +e == +n) return { valid: !0, data: e };
	if (au(e) && au(n)) {
		const r = Object.keys(n),
			u = Object.keys(e).filter((o) => r.indexOf(o) !== -1),
			s = { ...e, ...n };
		for (const o of u) {
			const f = Vd(e[o], n[o]);
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
				f = Vd(s, o);
			if (!f.valid) return { valid: !1, mergeErrorPath: [u, ...f.mergeErrorPath] };
			r.push(f.data);
		}
		return { valid: !0, data: r };
	}
	return { valid: !1, mergeErrorPath: [] };
}
function d0(e, n, r) {
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
	if ((o.length && s && e.issues.push({ ...s, keys: o }), Ga(e))) return e;
	const f = Vd(n.value, r.value);
	if (!f.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(f.mergeErrorPath)}`);
	return ((e.value = f.data), e);
}
var kx = te("$ZodRecord", (e, n) => {
		(yt.init(e, n),
			(e._zod.parse = (r, u) => {
				const s = r.value;
				if (!au(s)) return (r.issues.push({ expected: "record", code: "invalid_type", input: s, inst: e }), r);
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
									issues: g.issues.map((p) => Bi(p, u, $i())),
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
											(p.issues.length && r.issues.push(...Fa(v, p.issues)), (r.value[_] = p.value));
										}),
									)
								: (b.issues.length && r.issues.push(...Fa(v, b.issues)), (r.value[_] = b.value));
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
						if (typeof h == "string" && Yp.test(h) && m.issues.length) {
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
										issues: m.issues.map((g) => Bi(g, u, $i())),
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
										(g.issues.length && r.issues.push(...Fa(h, g.issues)), (r.value[m.value] = g.value));
									}),
								)
							: (v.issues.length && r.issues.push(...Fa(h, v.issues)), (r.value[m.value] = v.value));
					}
				}
				return o.length ? Promise.all(o).then(() => r) : r;
			}));
	}),
	Mx = te("$ZodEnum", (e, n) => {
		yt.init(e, n);
		const r = $p(n.entries),
			u = new Set(r);
		((e._zod.values = u),
			(e._zod.pattern = new RegExp(
				`^(${r
					.filter((s) => VE.has(typeof s))
					.map((s) => (typeof s == "string" ? uu(s) : s.toString()))
					.join("|")})$`,
			)),
			(e._zod.parse = (s, o) => {
				const f = s.value;
				return (u.has(f) || s.issues.push({ code: "invalid_value", values: r, input: f, inst: e }), s);
			}));
	}),
	zx = te("$ZodLiteral", (e, n) => {
		if ((yt.init(e, n), n.values.length === 0)) throw new Error("Cannot create literal schema with no valid values");
		const r = new Set(n.values);
		((e._zod.values = r),
			(e._zod.pattern = new RegExp(
				`^(${n.values.map((u) => (typeof u == "string" ? uu(u) : u ? uu(u.toString()) : String(u))).join("|")})$`,
			)),
			(e._zod.parse = (u, s) => {
				const o = u.value;
				return (r.has(o) || u.issues.push({ code: "invalid_value", values: n.values, input: o, inst: e }), u);
			}));
	}),
	Dx = te("$ZodTransform", (e, n) => {
		(yt.init(e, n),
			(e._zod.optin = "optional"),
			(e._zod.parse = (r, u) => {
				if (u.direction === "backward") throw new Up(e.constructor.name);
				const s = n.transform(r.value, r);
				if (u.async)
					return (s instanceof Promise ? s : Promise.resolve(s)).then((o) => ((r.value = o), (r.fallback = !0), r));
				if (s instanceof Promise) throw new Wa();
				return ((r.value = s), (r.fallback = !0), r);
			}));
	});
function h0(e, n) {
	return n === void 0 && (e.issues.length || e.fallback) ? { issues: [], value: void 0 } : e;
}
var nb = te("$ZodOptional", (e, n) => {
		(yt.init(e, n),
			(e._zod.optin = "optional"),
			(e._zod.optout = "optional"),
			tt(e._zod, "values", () => (n.innerType._zod.values ? new Set([...n.innerType._zod.values, void 0]) : void 0)),
			tt(e._zod, "pattern", () => {
				const r = n.innerType._zod.pattern;
				return r ? new RegExp(`^(${lh(r.source)})?$`) : void 0;
			}),
			(e._zod.parse = (r, u) => {
				if (n.innerType._zod.optin === "optional") {
					const s = r.value,
						o = n.innerType._zod.run(r, u);
					return o instanceof Promise ? o.then((f) => h0(f, s)) : h0(o, s);
				}
				return r.value === void 0 ? r : n.innerType._zod.run(r, u);
			}));
	}),
	jx = te("$ZodExactOptional", (e, n) => {
		(nb.init(e, n),
			tt(e._zod, "values", () => n.innerType._zod.values),
			tt(e._zod, "pattern", () => n.innerType._zod.pattern),
			(e._zod.parse = (r, u) => n.innerType._zod.run(r, u)));
	}),
	Lx = te("$ZodNullable", (e, n) => {
		(yt.init(e, n),
			tt(e._zod, "optin", () => n.innerType._zod.optin),
			tt(e._zod, "optout", () => n.innerType._zod.optout),
			tt(e._zod, "pattern", () => {
				const r = n.innerType._zod.pattern;
				return r ? new RegExp(`^(${lh(r.source)}|null)$`) : void 0;
			}),
			tt(e._zod, "values", () => (n.innerType._zod.values ? new Set([...n.innerType._zod.values, null]) : void 0)),
			(e._zod.parse = (r, u) => (r.value === null ? r : n.innerType._zod.run(r, u))));
	}),
	qx = te("$ZodDefault", (e, n) => {
		(yt.init(e, n),
			(e._zod.optin = "optional"),
			tt(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (r, u) => {
				if (u.direction === "backward") return n.innerType._zod.run(r, u);
				if (r.value === void 0) return ((r.value = n.defaultValue), r);
				const s = n.innerType._zod.run(r, u);
				return s instanceof Promise ? s.then((o) => m0(o, n)) : m0(s, n);
			}));
	});
function m0(e, n) {
	return (e.value === void 0 && (e.value = n.defaultValue), e);
}
var Ux = te("$ZodPrefault", (e, n) => {
		(yt.init(e, n),
			(e._zod.optin = "optional"),
			tt(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (r, u) => (
				u.direction === "backward" || (r.value === void 0 && (r.value = n.defaultValue)),
				n.innerType._zod.run(r, u)
			)));
	}),
	$x = te("$ZodNonOptional", (e, n) => {
		(yt.init(e, n),
			tt(e._zod, "values", () => {
				const r = n.innerType._zod.values;
				return r ? new Set([...r].filter((u) => u !== void 0)) : void 0;
			}),
			(e._zod.parse = (r, u) => {
				const s = n.innerType._zod.run(r, u);
				return s instanceof Promise ? s.then((o) => v0(o, e)) : v0(s, e);
			}));
	});
function v0(e, n) {
	return (
		!e.issues.length &&
			e.value === void 0 &&
			e.issues.push({ code: "invalid_type", expected: "nonoptional", input: e.value, inst: n }),
		e
	);
}
var Bx = te("$ZodCatch", (e, n) => {
		(yt.init(e, n),
			(e._zod.optin = "optional"),
			tt(e._zod, "optout", () => n.innerType._zod.optout),
			tt(e._zod, "values", () => n.innerType._zod.values),
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
										error: { issues: o.issues.map((f) => Bi(f, u, $i())) },
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
								error: { issues: s.issues.map((o) => Bi(o, u, $i())) },
								input: r.value,
							})),
							(r.issues = []),
							(r.fallback = !0)),
						r);
			}));
	}),
	Ix = te("$ZodPipe", (e, n) => {
		(yt.init(e, n),
			tt(e._zod, "values", () => n.in._zod.values),
			tt(e._zod, "optin", () => n.in._zod.optin),
			tt(e._zod, "optout", () => n.out._zod.optout),
			tt(e._zod, "propValues", () => n.in._zod.propValues),
			(e._zod.parse = (r, u) => {
				if (u.direction === "backward") {
					const o = n.out._zod.run(r, u);
					return o instanceof Promise ? o.then((f) => to(f, n.in, u)) : to(o, n.in, u);
				}
				const s = n.in._zod.run(r, u);
				return s instanceof Promise ? s.then((o) => to(o, n.out, u)) : to(s, n.out, u);
			}));
	});
function to(e, n, r) {
	return e.issues.length
		? ((e.aborted = !0), e)
		: n._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, r);
}
var Vx = te("$ZodReadonly", (e, n) => {
	(yt.init(e, n),
		tt(e._zod, "propValues", () => n.innerType._zod.propValues),
		tt(e._zod, "values", () => n.innerType._zod.values),
		tt(e._zod, "optin", () => n.innerType?._zod?.optin),
		tt(e._zod, "optout", () => n.innerType?._zod?.optout),
		(e._zod.parse = (r, u) => {
			if (u.direction === "backward") return n.innerType._zod.run(r, u);
			const s = n.innerType._zod.run(r, u);
			return s instanceof Promise ? s.then(g0) : g0(s);
		}));
});
function g0(e) {
	return ((e.value = Object.freeze(e.value)), e);
}
var Zx = te("$ZodCustom", (e, n) => {
	(_n.init(e, n),
		yt.init(e, n),
		(e._zod.parse = (r, u) => r),
		(e._zod.check = (r) => {
			const u = r.value,
				s = n.fn(u);
			if (s instanceof Promise) return s.then((o) => y0(o, r, u, e));
			y0(s, r, u, e);
		}));
});
function y0(e, n, r, u) {
	if (!e) {
		const s = { code: "custom", input: r, inst: u, path: [...(u._zod.def.path ?? [])], continue: !u._zod.def.abort };
		(u._zod.def.params && (s.params = u._zod.def.params), n.issues.push(yl(s)));
	}
}
var p0,
	Hx = class {
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
function Px() {
	return new Hx();
}
(p0 = globalThis).__zod_globalRegistry ?? (p0.__zod_globalRegistry = Px());
var fl = globalThis.__zod_globalRegistry;
function Qx(e, n) {
	return new e({ type: "string", ...pe(n) });
}
function Kx(e, n) {
	return new e({ type: "string", format: "email", check: "string_format", abort: !1, ...pe(n) });
}
function b0(e, n) {
	return new e({ type: "string", format: "guid", check: "string_format", abort: !1, ...pe(n) });
}
function Yx(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, ...pe(n) });
}
function Gx(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v4", ...pe(n) });
}
function Fx(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v6", ...pe(n) });
}
function Xx(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v7", ...pe(n) });
}
function Jx(e, n) {
	return new e({ type: "string", format: "url", check: "string_format", abort: !1, ...pe(n) });
}
function Wx(e, n) {
	return new e({ type: "string", format: "emoji", check: "string_format", abort: !1, ...pe(n) });
}
function eA(e, n) {
	return new e({ type: "string", format: "nanoid", check: "string_format", abort: !1, ...pe(n) });
}
function tA(e, n) {
	return new e({ type: "string", format: "cuid", check: "string_format", abort: !1, ...pe(n) });
}
function nA(e, n) {
	return new e({ type: "string", format: "cuid2", check: "string_format", abort: !1, ...pe(n) });
}
function iA(e, n) {
	return new e({ type: "string", format: "ulid", check: "string_format", abort: !1, ...pe(n) });
}
function rA(e, n) {
	return new e({ type: "string", format: "xid", check: "string_format", abort: !1, ...pe(n) });
}
function aA(e, n) {
	return new e({ type: "string", format: "ksuid", check: "string_format", abort: !1, ...pe(n) });
}
function uA(e, n) {
	return new e({ type: "string", format: "ipv4", check: "string_format", abort: !1, ...pe(n) });
}
function lA(e, n) {
	return new e({ type: "string", format: "ipv6", check: "string_format", abort: !1, ...pe(n) });
}
function sA(e, n) {
	return new e({ type: "string", format: "cidrv4", check: "string_format", abort: !1, ...pe(n) });
}
function oA(e, n) {
	return new e({ type: "string", format: "cidrv6", check: "string_format", abort: !1, ...pe(n) });
}
function cA(e, n) {
	return new e({ type: "string", format: "base64", check: "string_format", abort: !1, ...pe(n) });
}
function fA(e, n) {
	return new e({ type: "string", format: "base64url", check: "string_format", abort: !1, ...pe(n) });
}
function dA(e, n) {
	return new e({ type: "string", format: "e164", check: "string_format", abort: !1, ...pe(n) });
}
function hA(e, n) {
	return new e({ type: "string", format: "jwt", check: "string_format", abort: !1, ...pe(n) });
}
function mA(e, n) {
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
function vA(e, n) {
	return new e({ type: "string", format: "date", check: "string_format", ...pe(n) });
}
function gA(e, n) {
	return new e({ type: "string", format: "time", check: "string_format", precision: null, ...pe(n) });
}
function yA(e, n) {
	return new e({ type: "string", format: "duration", check: "string_format", ...pe(n) });
}
function pA(e, n) {
	return new e({ type: "number", checks: [], ...pe(n) });
}
function bA(e, n) {
	return new e({ type: "number", check: "number_format", abort: !1, format: "safeint", ...pe(n) });
}
function SA(e, n) {
	return new e({ type: "boolean", ...pe(n) });
}
function _A(e) {
	return new e({ type: "unknown" });
}
function wA(e, n) {
	return new e({ type: "never", ...pe(n) });
}
function S0(e, n) {
	return new Fp({ check: "less_than", ...pe(n), value: e, inclusive: !1 });
}
function pd(e, n) {
	return new Fp({ check: "less_than", ...pe(n), value: e, inclusive: !0 });
}
function _0(e, n) {
	return new Xp({ check: "greater_than", ...pe(n), value: e, inclusive: !1 });
}
function bd(e, n) {
	return new Xp({ check: "greater_than", ...pe(n), value: e, inclusive: !0 });
}
function w0(e, n) {
	return new qT({ check: "multiple_of", ...pe(n), value: e });
}
function ib(e, n) {
	return new $T({ check: "max_length", ...pe(n), maximum: e });
}
function bo(e, n) {
	return new BT({ check: "min_length", ...pe(n), minimum: e });
}
function rb(e, n) {
	return new IT({ check: "length_equals", ...pe(n), length: e });
}
function EA(e, n) {
	return new VT({ check: "string_format", format: "regex", ...pe(n), pattern: e });
}
function TA(e) {
	return new ZT({ check: "string_format", format: "lowercase", ...pe(e) });
}
function xA(e) {
	return new HT({ check: "string_format", format: "uppercase", ...pe(e) });
}
function AA(e, n) {
	return new PT({ check: "string_format", format: "includes", ...pe(n), includes: e });
}
function CA(e, n) {
	return new QT({ check: "string_format", format: "starts_with", ...pe(n), prefix: e });
}
function RA(e, n) {
	return new KT({ check: "string_format", format: "ends_with", ...pe(n), suffix: e });
}
function cu(e) {
	return new YT({ check: "overwrite", tx: e });
}
function OA(e) {
	return cu((n) => n.normalize(e));
}
function NA() {
	return cu((e) => e.trim());
}
function kA() {
	return cu((e) => e.toLowerCase());
}
function MA() {
	return cu((e) => e.toUpperCase());
}
function zA() {
	return cu((e) => BE(e));
}
function DA(e, n, r) {
	return new e({ type: "array", element: n, ...pe(r) });
}
function jA(e, n, r) {
	return new e({ type: "custom", check: "custom", fn: n, ...pe(r) });
}
function LA(e, n) {
	const r = qA(
		(u) => (
			(u.addIssue = (s) => {
				if (typeof s == "string") u.issues.push(yl(s, u.value, r._zod.def));
				else {
					const o = s;
					(o.fatal && (o.continue = !1),
						o.code ?? (o.code = "custom"),
						o.input ?? (o.input = u.value),
						o.inst ?? (o.inst = r),
						o.continue ?? (o.continue = !r._zod.def.abort),
						u.issues.push(yl(o)));
				}
			}),
			e(u.value, u)
		),
		n,
	);
	return r;
}
function qA(e, n) {
	const r = new _n({ check: "custom", ...pe(n) });
	return ((r._zod.check = e), r);
}
function ab(e) {
	let n = e?.target ?? "draft-2020-12";
	return (
		n === "draft-4" && (n = "draft-04"),
		n === "draft-7" && (n = "draft-07"),
		{
			processors: e.processors ?? {},
			metadataRegistry: e?.metadata ?? fl,
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
function It(e, n, r = { path: [], schemaPath: [] }) {
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
		g && (f.ref || (f.ref = g), It(g, n, v), (n.seen.get(g).isParent = !0));
	}
	const m = n.metadataRegistry.get(e);
	return (
		m && Object.assign(f.schema, m),
		n.io === "input" && sn(e) && (delete f.schema.examples, delete f.schema.default),
		n.io === "input" && "_prefault" in f.schema && ((u = f.schema).default ?? (u.default = f.schema._prefault)),
		delete f.schema._prefault,
		n.seen.get(e).schema
	);
}
function ub(e, n) {
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
function lb(e, n) {
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
					jsonSchema: { input: So(n, "input", e.processors), output: So(n, "output", e.processors) },
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
function sn(e, n) {
	const r = n ?? { seen: new Set() };
	if (r.seen.has(e)) return !1;
	r.seen.add(e);
	const u = e._zod.def;
	if (u.type === "transform") return !0;
	if (u.type === "array") return sn(u.element, r);
	if (u.type === "set") return sn(u.valueType, r);
	if (u.type === "lazy") return sn(u.getter(), r);
	if (
		u.type === "promise" ||
		u.type === "optional" ||
		u.type === "nonoptional" ||
		u.type === "nullable" ||
		u.type === "readonly" ||
		u.type === "default" ||
		u.type === "prefault"
	)
		return sn(u.innerType, r);
	if (u.type === "intersection") return sn(u.left, r) || sn(u.right, r);
	if (u.type === "record" || u.type === "map") return sn(u.keyType, r) || sn(u.valueType, r);
	if (u.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : sn(u.in, r) || sn(u.out, r);
	if (u.type === "object") {
		for (const s in u.shape) if (sn(u.shape[s], r)) return !0;
		return !1;
	}
	if (u.type === "union") {
		for (const s of u.options) if (sn(s, r)) return !0;
		return !1;
	}
	if (u.type === "tuple") {
		for (const s of u.items) if (sn(s, r)) return !0;
		return !!(u.rest && sn(u.rest, r));
	}
	return !1;
}
var UA =
		(e, n = {}) =>
		(r) => {
			const u = ab({ ...r, processors: n });
			return (It(e, u), ub(u, e), lb(u, e));
		},
	So =
		(e, n, r = {}) =>
		(u) => {
			const { libraryOptions: s, target: o } = u ?? {},
				f = ab({ ...(s ?? {}), target: o, io: n, processors: r });
			return (It(e, f), ub(f, e), lb(f, e));
		},
	$A = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" },
	BA = (e, n, r, u) => {
		const s = r;
		s.type = "string";
		const { minimum: o, maximum: f, format: h, patterns: m, contentEncoding: v } = e._zod.bag;
		if (
			(typeof o == "number" && (s.minLength = o),
			typeof f == "number" && (s.maxLength = f),
			h && ((s.format = $A[h] ?? h), s.format === "" && delete s.format, h === "time" && delete s.format),
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
	IA = (e, n, r, u) => {
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
	VA = (e, n, r, u) => {
		r.type = "boolean";
	},
	ZA = (e, n, r, u) => {
		r.not = {};
	},
	HA = (e, n, r, u) => {},
	PA = (e, n, r, u) => {
		const s = e._zod.def,
			o = $p(s.entries);
		(o.every((f) => typeof f == "number") && (r.type = "number"),
			o.every((f) => typeof f == "string") && (r.type = "string"),
			(r.enum = o));
	},
	QA = (e, n, r, u) => {
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
	KA = (e, n, r, u) => {
		if (n.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
	},
	YA = (e, n, r, u) => {
		if (n.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
	},
	GA = (e, n, r, u) => {
		const s = r,
			o = e._zod.def,
			{ minimum: f, maximum: h } = e._zod.bag;
		(typeof f == "number" && (s.minItems = f),
			typeof h == "number" && (s.maxItems = h),
			(s.type = "array"),
			(s.items = It(o.element, n, { ...u, path: [...u.path, "items"] })));
	},
	FA = (e, n, r, u) => {
		const s = r,
			o = e._zod.def;
		((s.type = "object"), (s.properties = {}));
		const f = o.shape;
		for (const v in f) s.properties[v] = It(f[v], n, { ...u, path: [...u.path, "properties", v] });
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
						(s.additionalProperties = It(o.catchall, n, { ...u, path: [...u.path, "additionalProperties"] }))
					: n.io === "output" && (s.additionalProperties = !1));
	},
	XA = (e, n, r, u) => {
		const s = e._zod.def,
			o = s.inclusive === !1,
			f = s.options.map((h, m) => It(h, n, { ...u, path: [...u.path, o ? "oneOf" : "anyOf", m] }));
		o ? (r.oneOf = f) : (r.anyOf = f);
	},
	JA = (e, n, r, u) => {
		const s = e._zod.def,
			o = It(s.left, n, { ...u, path: [...u.path, "allOf", 0] }),
			f = It(s.right, n, { ...u, path: [...u.path, "allOf", 1] }),
			h = (m) => "allOf" in m && Object.keys(m).length === 1;
		r.allOf = [...(h(o) ? o.allOf : [o]), ...(h(f) ? f.allOf : [f])];
	},
	WA = (e, n, r, u) => {
		const s = r,
			o = e._zod.def;
		s.type = "object";
		const f = o.keyType,
			h = f._zod.bag?.patterns;
		if (o.mode === "loose" && h && h.size > 0) {
			const v = It(o.valueType, n, { ...u, path: [...u.path, "patternProperties", "*"] });
			s.patternProperties = {};
			for (const g of h) s.patternProperties[g.source] = v;
		} else
			((n.target === "draft-07" || n.target === "draft-2020-12") &&
				(s.propertyNames = It(o.keyType, n, { ...u, path: [...u.path, "propertyNames"] })),
				(s.additionalProperties = It(o.valueType, n, { ...u, path: [...u.path, "additionalProperties"] })));
		const m = f._zod.values;
		if (m) {
			const v = [...m].filter((g) => typeof g == "string" || typeof g == "number");
			v.length > 0 && (s.required = v);
		}
	},
	eC = (e, n, r, u) => {
		const s = e._zod.def,
			o = It(s.innerType, n, u),
			f = n.seen.get(e);
		n.target === "openapi-3.0" ? ((f.ref = s.innerType), (r.nullable = !0)) : (r.anyOf = [o, { type: "null" }]);
	},
	tC = (e, n, r, u) => {
		const s = e._zod.def;
		It(s.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = s.innerType;
	},
	nC = (e, n, r, u) => {
		const s = e._zod.def;
		It(s.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = s.innerType), (r.default = JSON.parse(JSON.stringify(s.defaultValue))));
	},
	iC = (e, n, r, u) => {
		const s = e._zod.def;
		It(s.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = s.innerType), n.io === "input" && (r._prefault = JSON.parse(JSON.stringify(s.defaultValue))));
	},
	rC = (e, n, r, u) => {
		const s = e._zod.def;
		It(s.innerType, n, u);
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
	aC = (e, n, r, u) => {
		const s = e._zod.def,
			o = s.in._zod.traits.has("$ZodTransform"),
			f = n.io === "input" ? (o ? s.out : s.in) : s.out;
		It(f, n, u);
		const h = n.seen.get(e);
		h.ref = f;
	},
	uC = (e, n, r, u) => {
		const s = e._zod.def;
		It(s.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = s.innerType), (r.readOnly = !0));
	},
	sb = (e, n, r, u) => {
		const s = e._zod.def;
		It(s.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = s.innerType;
	},
	lC = te("ZodISODateTime", (e, n) => {
		(sx.init(e, n), bt.init(e, n));
	});
function sC(e) {
	return mA(lC, e);
}
var oC = te("ZodISODate", (e, n) => {
	(ox.init(e, n), bt.init(e, n));
});
function cC(e) {
	return vA(oC, e);
}
var fC = te("ZodISOTime", (e, n) => {
	(cx.init(e, n), bt.init(e, n));
});
function dC(e) {
	return gA(fC, e);
}
var hC = te("ZodISODuration", (e, n) => {
	(fx.init(e, n), bt.init(e, n));
});
function mC(e) {
	return yA(hC, e);
}
var vC = (e, n) => {
		(Zp.init(e, n),
			(e.name = "ZodError"),
			Object.defineProperties(e, {
				format: { value: (r) => eT(e, r) },
				flatten: { value: (r) => WE(e, r) },
				addIssue: {
					value: (r) => {
						(e.issues.push(r), (e.message = JSON.stringify(e.issues, Id, 2)));
					},
				},
				addIssues: {
					value: (r) => {
						(e.issues.push(...r), (e.message = JSON.stringify(e.issues, Id, 2)));
					},
				},
				isEmpty: {
					get() {
						return e.issues.length === 0;
					},
				},
			}));
	},
	Kn = te("ZodError", vC, { Parent: Error }),
	gC = oh(Kn),
	yC = ch(Kn),
	pC = No(Kn),
	bC = ko(Kn),
	SC = iT(Kn),
	_C = rT(Kn),
	wC = aT(Kn),
	EC = uT(Kn),
	TC = lT(Kn),
	xC = sT(Kn),
	AC = oT(Kn),
	CC = cT(Kn),
	E0 = new WeakMap();
function wl(e, n, r) {
	const u = Object.getPrototypeOf(e);
	let s = E0.get(u);
	if ((s || ((s = new Set()), E0.set(u, s)), !s.has(n))) {
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
var pt = te(
		"ZodType",
		(e, n) => (
			yt.init(e, n),
			Object.assign(e["~standard"], { jsonSchema: { input: So(e, "input"), output: So(e, "output") } }),
			(e.toJSONSchema = UA(e, {})),
			(e.def = n),
			(e.type = n.type),
			Object.defineProperty(e, "_def", { value: n }),
			(e.parse = (r, u) => gC(e, r, u, { callee: e.parse })),
			(e.safeParse = (r, u) => pC(e, r, u)),
			(e.parseAsync = async (r, u) => yC(e, r, u, { callee: e.parseAsync })),
			(e.safeParseAsync = async (r, u) => bC(e, r, u)),
			(e.spa = e.safeParseAsync),
			(e.encode = (r, u) => SC(e, r, u)),
			(e.decode = (r, u) => _C(e, r, u)),
			(e.encodeAsync = async (r, u) => wC(e, r, u)),
			(e.decodeAsync = async (r, u) => EC(e, r, u)),
			(e.safeEncode = (r, u) => TC(e, r, u)),
			(e.safeDecode = (r, u) => xC(e, r, u)),
			(e.safeEncodeAsync = async (r, u) => AC(e, r, u)),
			(e.safeDecodeAsync = async (r, u) => CC(e, r, u)),
			wl(e, "ZodType", {
				check(...r) {
					const u = this.def;
					return this.clone(
						Er(u, {
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
					return Tr(this, r, u);
				},
				brand() {
					return this;
				},
				register(r, u) {
					return (r.add(this, u), this);
				},
				refine(r, u) {
					return this.check(SR(r, u));
				},
				superRefine(r, u) {
					return this.check(_R(r, u));
				},
				overwrite(r) {
					return this.check(cu(r));
				},
				optional() {
					return C0(this);
				},
				exactOptional() {
					return lR(this);
				},
				nullable() {
					return R0(this);
				},
				nullish() {
					return C0(R0(this));
				},
				nonoptional(r) {
					return hR(this, r);
				},
				array() {
					return Jr(this);
				},
				or(r) {
					return hh([this, r]);
				},
				and(r) {
					return tR(this, r);
				},
				transform(r) {
					return O0(this, aR(r));
				},
				default(r) {
					return cR(this, r);
				},
				prefault(r) {
					return dR(this, r);
				},
				catch(r) {
					return vR(this, r);
				},
				pipe(r) {
					return O0(this, r);
				},
				readonly() {
					return pR(this);
				},
				describe(r) {
					const u = this.clone();
					return (fl.add(u, { description: r }), u);
				},
				meta(...r) {
					if (r.length === 0) return fl.get(this);
					const u = this.clone();
					return (fl.add(u, r[0]), u);
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
					return fl.get(e)?.description;
				},
				configurable: !0,
			}),
			e
		),
	),
	ob = te("_ZodString", (e, n) => {
		(fh.init(e, n), pt.init(e, n), (e._zod.processJSONSchema = (u, s, o) => BA(e, u, s, o)));
		const r = e._zod.bag;
		((e.format = r.format ?? null),
			(e.minLength = r.minimum ?? null),
			(e.maxLength = r.maximum ?? null),
			wl(e, "_ZodString", {
				regex(...u) {
					return this.check(EA(...u));
				},
				includes(...u) {
					return this.check(AA(...u));
				},
				startsWith(...u) {
					return this.check(CA(...u));
				},
				endsWith(...u) {
					return this.check(RA(...u));
				},
				min(...u) {
					return this.check(bo(...u));
				},
				max(...u) {
					return this.check(ib(...u));
				},
				length(...u) {
					return this.check(rb(...u));
				},
				nonempty(...u) {
					return this.check(bo(1, ...u));
				},
				lowercase(u) {
					return this.check(TA(u));
				},
				uppercase(u) {
					return this.check(xA(u));
				},
				trim() {
					return this.check(NA());
				},
				normalize(...u) {
					return this.check(OA(...u));
				},
				toLowerCase() {
					return this.check(kA());
				},
				toUpperCase() {
					return this.check(MA());
				},
				slugify() {
					return this.check(zA());
				},
			}));
	}),
	RC = te("ZodString", (e, n) => {
		(fh.init(e, n),
			ob.init(e, n),
			(e.email = (r) => e.check(Kx(OC, r))),
			(e.url = (r) => e.check(Jx(NC, r))),
			(e.jwt = (r) => e.check(hA(PC, r))),
			(e.emoji = (r) => e.check(Wx(kC, r))),
			(e.guid = (r) => e.check(b0(T0, r))),
			(e.uuid = (r) => e.check(Yx(no, r))),
			(e.uuidv4 = (r) => e.check(Gx(no, r))),
			(e.uuidv6 = (r) => e.check(Fx(no, r))),
			(e.uuidv7 = (r) => e.check(Xx(no, r))),
			(e.nanoid = (r) => e.check(eA(MC, r))),
			(e.guid = (r) => e.check(b0(T0, r))),
			(e.cuid = (r) => e.check(tA(zC, r))),
			(e.cuid2 = (r) => e.check(nA(DC, r))),
			(e.ulid = (r) => e.check(iA(jC, r))),
			(e.base64 = (r) => e.check(cA(VC, r))),
			(e.base64url = (r) => e.check(fA(ZC, r))),
			(e.xid = (r) => e.check(rA(LC, r))),
			(e.ksuid = (r) => e.check(aA(qC, r))),
			(e.ipv4 = (r) => e.check(uA(UC, r))),
			(e.ipv6 = (r) => e.check(lA($C, r))),
			(e.cidrv4 = (r) => e.check(sA(BC, r))),
			(e.cidrv6 = (r) => e.check(oA(IC, r))),
			(e.e164 = (r) => e.check(dA(HC, r))),
			(e.datetime = (r) => e.check(sC(r))),
			(e.date = (r) => e.check(cC(r))),
			(e.time = (r) => e.check(dC(r))),
			(e.duration = (r) => e.check(mC(r))));
	});
function gt(e) {
	return Qx(RC, e);
}
var bt = te("ZodStringFormat", (e, n) => {
		(dt.init(e, n), ob.init(e, n));
	}),
	OC = te("ZodEmail", (e, n) => {
		(WT.init(e, n), bt.init(e, n));
	}),
	T0 = te("ZodGUID", (e, n) => {
		(XT.init(e, n), bt.init(e, n));
	}),
	no = te("ZodUUID", (e, n) => {
		(JT.init(e, n), bt.init(e, n));
	}),
	NC = te("ZodURL", (e, n) => {
		(ex.init(e, n), bt.init(e, n));
	}),
	kC = te("ZodEmoji", (e, n) => {
		(tx.init(e, n), bt.init(e, n));
	}),
	MC = te("ZodNanoID", (e, n) => {
		(nx.init(e, n), bt.init(e, n));
	}),
	zC = te("ZodCUID", (e, n) => {
		(ix.init(e, n), bt.init(e, n));
	}),
	DC = te("ZodCUID2", (e, n) => {
		(rx.init(e, n), bt.init(e, n));
	}),
	jC = te("ZodULID", (e, n) => {
		(ax.init(e, n), bt.init(e, n));
	}),
	LC = te("ZodXID", (e, n) => {
		(ux.init(e, n), bt.init(e, n));
	}),
	qC = te("ZodKSUID", (e, n) => {
		(lx.init(e, n), bt.init(e, n));
	}),
	UC = te("ZodIPv4", (e, n) => {
		(dx.init(e, n), bt.init(e, n));
	}),
	$C = te("ZodIPv6", (e, n) => {
		(hx.init(e, n), bt.init(e, n));
	}),
	BC = te("ZodCIDRv4", (e, n) => {
		(mx.init(e, n), bt.init(e, n));
	}),
	IC = te("ZodCIDRv6", (e, n) => {
		(vx.init(e, n), bt.init(e, n));
	}),
	VC = te("ZodBase64", (e, n) => {
		(gx.init(e, n), bt.init(e, n));
	}),
	ZC = te("ZodBase64URL", (e, n) => {
		(px.init(e, n), bt.init(e, n));
	}),
	HC = te("ZodE164", (e, n) => {
		(bx.init(e, n), bt.init(e, n));
	}),
	PC = te("ZodJWT", (e, n) => {
		(_x.init(e, n), bt.init(e, n));
	}),
	cb = te("ZodNumber", (e, n) => {
		(Wp.init(e, n),
			pt.init(e, n),
			(e._zod.processJSONSchema = (u, s, o) => IA(e, u, s, o)),
			wl(e, "ZodNumber", {
				gt(u, s) {
					return this.check(_0(u, s));
				},
				gte(u, s) {
					return this.check(bd(u, s));
				},
				min(u, s) {
					return this.check(bd(u, s));
				},
				lt(u, s) {
					return this.check(S0(u, s));
				},
				lte(u, s) {
					return this.check(pd(u, s));
				},
				max(u, s) {
					return this.check(pd(u, s));
				},
				int(u) {
					return this.check(x0(u));
				},
				safe(u) {
					return this.check(x0(u));
				},
				positive(u) {
					return this.check(_0(0, u));
				},
				nonnegative(u) {
					return this.check(bd(0, u));
				},
				negative(u) {
					return this.check(S0(0, u));
				},
				nonpositive(u) {
					return this.check(pd(0, u));
				},
				multipleOf(u, s) {
					return this.check(w0(u, s));
				},
				step(u, s) {
					return this.check(w0(u, s));
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
function Jn(e) {
	return pA(cb, e);
}
var QC = te("ZodNumberFormat", (e, n) => {
	(wx.init(e, n), cb.init(e, n));
});
function x0(e) {
	return bA(QC, e);
}
var KC = te("ZodBoolean", (e, n) => {
	(Ex.init(e, n), pt.init(e, n), (e._zod.processJSONSchema = (r, u, s) => VA(e, r, u, s)));
});
function dh(e) {
	return SA(KC, e);
}
var YC = te("ZodUnknown", (e, n) => {
	(Tx.init(e, n), pt.init(e, n), (e._zod.processJSONSchema = (r, u, s) => HA(e, r, u, s)));
});
function _o() {
	return _A(YC);
}
var GC = te("ZodNever", (e, n) => {
	(xx.init(e, n), pt.init(e, n), (e._zod.processJSONSchema = (r, u, s) => ZA(e, r, u, s)));
});
function FC(e) {
	return wA(GC, e);
}
var XC = te("ZodArray", (e, n) => {
	(Ax.init(e, n),
		pt.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => GA(e, r, u, s)),
		(e.element = n.element),
		wl(e, "ZodArray", {
			min(r, u) {
				return this.check(bo(r, u));
			},
			nonempty(r) {
				return this.check(bo(1, r));
			},
			max(r, u) {
				return this.check(ib(r, u));
			},
			length(r, u) {
				return this.check(rb(r, u));
			},
			unwrap() {
				return this.element;
			},
		}));
});
function Jr(e, n) {
	return DA(XC, e, n);
}
var JC = te("ZodObject", (e, n) => {
	(Rx.init(e, n),
		pt.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => FA(e, r, u, s)),
		tt(e, "shape", () => n.shape),
		wl(e, "ZodObject", {
			keyof() {
				return nR(Object.keys(this._zod.def.shape));
			},
			catchall(r) {
				return this.clone({ ...this._zod.def, catchall: r });
			},
			passthrough() {
				return this.clone({ ...this._zod.def, catchall: _o() });
			},
			loose() {
				return this.clone({ ...this._zod.def, catchall: _o() });
			},
			strict() {
				return this.clone({ ...this._zod.def, catchall: FC() });
			},
			strip() {
				return this.clone({ ...this._zod.def, catchall: void 0 });
			},
			extend(r) {
				return KE(this, r);
			},
			safeExtend(r) {
				return YE(this, r);
			},
			merge(r) {
				return GE(this, r);
			},
			pick(r) {
				return PE(this, r);
			},
			omit(r) {
				return QE(this, r);
			},
			partial(...r) {
				return FE(db, this, r[0]);
			},
			required(...r) {
				return XE(hb, this, r[0]);
			},
		}));
});
function Pn(e, n) {
	const r = { type: "object", shape: e ?? {}, ...pe(n) };
	return new JC(r);
}
var WC = te("ZodUnion", (e, n) => {
	(Ox.init(e, n), pt.init(e, n), (e._zod.processJSONSchema = (r, u, s) => XA(e, r, u, s)), (e.options = n.options));
});
function hh(e, n) {
	return new WC({ type: "union", options: e, ...pe(n) });
}
var eR = te("ZodIntersection", (e, n) => {
	(Nx.init(e, n), pt.init(e, n), (e._zod.processJSONSchema = (r, u, s) => JA(e, r, u, s)));
});
function tR(e, n) {
	return new eR({ type: "intersection", left: e, right: n });
}
var A0 = te("ZodRecord", (e, n) => {
	(kx.init(e, n),
		pt.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => WA(e, r, u, s)),
		(e.keyType = n.keyType),
		(e.valueType = n.valueType));
});
function fb(e, n, r) {
	return !n || !n._zod
		? new A0({ type: "record", keyType: gt(), valueType: e, ...pe(n) })
		: new A0({ type: "record", keyType: e, valueType: n, ...pe(r) });
}
var Zd = te("ZodEnum", (e, n) => {
	(Mx.init(e, n),
		pt.init(e, n),
		(e._zod.processJSONSchema = (u, s, o) => PA(e, u, s, o)),
		(e.enum = n.entries),
		(e.options = Object.values(n.entries)));
	const r = new Set(Object.keys(n.entries));
	((e.extract = (u, s) => {
		const o = {};
		for (const f of u)
			if (r.has(f)) o[f] = n.entries[f];
			else throw new Error(`Key ${f} not found in enum`);
		return new Zd({ ...n, checks: [], ...pe(s), entries: o });
	}),
		(e.exclude = (u, s) => {
			const o = { ...n.entries };
			for (const f of u)
				if (r.has(f)) delete o[f];
				else throw new Error(`Key ${f} not found in enum`);
			return new Zd({ ...n, checks: [], ...pe(s), entries: o });
		}));
});
function nR(e, n) {
	const r = Array.isArray(e) ? Object.fromEntries(e.map((u) => [u, u])) : e;
	return new Zd({ type: "enum", entries: r, ...pe(n) });
}
var iR = te("ZodLiteral", (e, n) => {
	(zx.init(e, n),
		pt.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => QA(e, r, u, s)),
		(e.values = new Set(n.values)),
		Object.defineProperty(e, "value", {
			get() {
				if (n.values.length > 1)
					throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
				return n.values[0];
			},
		}));
});
function wo(e, n) {
	return new iR({ type: "literal", values: Array.isArray(e) ? e : [e], ...pe(n) });
}
var rR = te("ZodTransform", (e, n) => {
	(Dx.init(e, n),
		pt.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => YA(e, r, u, s)),
		(e._zod.parse = (r, u) => {
			if (u.direction === "backward") throw new Up(e.constructor.name);
			r.addIssue = (o) => {
				if (typeof o == "string") r.issues.push(yl(o, r.value, n));
				else {
					const f = o;
					(f.fatal && (f.continue = !1),
						f.code ?? (f.code = "custom"),
						f.input ?? (f.input = r.value),
						f.inst ?? (f.inst = e),
						r.issues.push(yl(f)));
				}
			};
			const s = n.transform(r.value, r);
			return s instanceof Promise
				? s.then((o) => ((r.value = o), (r.fallback = !0), r))
				: ((r.value = s), (r.fallback = !0), r);
		}));
});
function aR(e) {
	return new rR({ type: "transform", transform: e });
}
var db = te("ZodOptional", (e, n) => {
	(nb.init(e, n),
		pt.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => sb(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function C0(e) {
	return new db({ type: "optional", innerType: e });
}
var uR = te("ZodExactOptional", (e, n) => {
	(jx.init(e, n),
		pt.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => sb(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function lR(e) {
	return new uR({ type: "optional", innerType: e });
}
var sR = te("ZodNullable", (e, n) => {
	(Lx.init(e, n),
		pt.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => eC(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function R0(e) {
	return new sR({ type: "nullable", innerType: e });
}
var oR = te("ZodDefault", (e, n) => {
	(qx.init(e, n),
		pt.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => nC(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeDefault = e.unwrap));
});
function cR(e, n) {
	return new oR({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : Ip(n);
		},
	});
}
var fR = te("ZodPrefault", (e, n) => {
	(Ux.init(e, n),
		pt.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => iC(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function dR(e, n) {
	return new fR({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : Ip(n);
		},
	});
}
var hb = te("ZodNonOptional", (e, n) => {
	($x.init(e, n),
		pt.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => tC(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function hR(e, n) {
	return new hb({ type: "nonoptional", innerType: e, ...pe(n) });
}
var mR = te("ZodCatch", (e, n) => {
	(Bx.init(e, n),
		pt.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => rC(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeCatch = e.unwrap));
});
function vR(e, n) {
	return new mR({ type: "catch", innerType: e, catchValue: typeof n == "function" ? n : () => n });
}
var gR = te("ZodPipe", (e, n) => {
	(Ix.init(e, n),
		pt.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => aC(e, r, u, s)),
		(e.in = n.in),
		(e.out = n.out));
});
function O0(e, n) {
	return new gR({ type: "pipe", in: e, out: n });
}
var yR = te("ZodReadonly", (e, n) => {
	(Vx.init(e, n),
		pt.init(e, n),
		(e._zod.processJSONSchema = (r, u, s) => uC(e, r, u, s)),
		(e.unwrap = () => e._zod.def.innerType));
});
function pR(e) {
	return new yR({ type: "readonly", innerType: e });
}
var bR = te("ZodCustom", (e, n) => {
	(Zx.init(e, n), pt.init(e, n), (e._zod.processJSONSchema = (r, u, s) => KA(e, r, u, s)));
});
function SR(e, n = {}) {
	return jA(bR, e, n);
}
function _R(e, n) {
	return LA(e, n);
}
var w = Ap(Oo()),
	wR = UE(),
	Xa = ["thumbs_up", "heart", "laugh", "wow", "sad", "party", "rocket", "eyes"],
	mb = { thumbs_up: "👍", heart: "❤️", laugh: "😂", wow: "😮", sad: "😢", party: "🎉", rocket: "🚀", eyes: "👀" },
	vb = {
		thumbs_up: "Thumbs up",
		heart: "Heart",
		laugh: "Laugh",
		wow: "Wow",
		sad: "Sad",
		party: "Party",
		rocket: "Rocket",
		eyes: "Eyes",
	},
	ER = 9999999999999,
	TR = /(?:^|:)(\d{13}):([^:]{1,16})$/;
function lu(e) {
	const n = TR.exec(e);
	return n ? ER - Number(n[1]) : null;
}
var gb = "p/",
	xR = ["channels", "messages", "replies", "reactions"],
	mh =
		"Only the people added here can read it — and the organization owner, who can read everything in this workspace.";
function AR(e) {
	const n = crypto.randomUUID();
	return e === "private" ? `${gb}${n}` : n;
}
function li(e) {
	return e.startsWith(gb);
}
function sl(e) {
	return `${e}:`;
}
function vh(e) {
	const n = e.split(":");
	return n.length < 3 || lu(e) === null ? null : n.slice(0, -2).join(":");
}
function N0(e) {
	return `${e}:`;
}
function k0(e, n) {
	return `${e}:${n}`;
}
function CR(e) {
	const n = e.split(":");
	if (n.length < 4) return null;
	const r = n[n.length - 2];
	if (!Xa.includes(r)) return null;
	const u = n.slice(0, -2).join(":");
	return lu(u) === null ? null : { targetKey: u, token: r, keyTailUserId: n[n.length - 1] };
}
function yb(e) {
	const n = e.split(":");
	if (n.length < 5) return null;
	const r = n.slice(0, -2).join(":");
	return lu(r) === null || lu(e) === null ? null : r;
}
function M0(e) {
	return `me:${e}`;
}
function RR(e) {
	return `${e}:read`;
}
function pb(e) {
	const n = e.split(":");
	return n.length !== 3 || n[1] !== "read" || !li(n[0]) ? null : { channelKey: n[0], keyTailUserId: n[2] };
}
var OR = Pn({
		name: gt().min(1).max(64),
		archivedAt: Jn().nullable(),
		topic: gt().max(250).optional(),
		lastMessageAt: Jn().optional(),
	}),
	NR = Pn({ fileNodeId: gt().min(1), name: gt().min(1) }),
	kR = Pn({
		text: gt(),
		attachments: Jr(NR),
		editedAt: Jn().nullable(),
		deletedAt: Jn().nullable(),
		mentions: Jr(gt()).optional(),
	}),
	MR = "Someone with no name yet";
function so(e) {
	return e !== null && e !== "" ? e : MR;
}
function zR(e, n) {
	const r = /(?:^|\s)@([^\s@]*)$/.exec(e.slice(0, n));
	if (r === null) return null;
	const u = r[1] ?? "";
	return { start: n - u.length - 1, query: u };
}
function DR(e, n, r) {
	const u = n.toLowerCase();
	return e
		.filter((s) => s.userId !== r)
		.map((s) => ({ ...s, label: so(s.displayName) }))
		.filter((s) => s.label.toLowerCase().includes(u))
		.sort((s, o) => s.label.localeCompare(o.label));
}
function jR(e, n, r, u) {
	return { text: `${e.slice(0, n)}@${u} ${e.slice(r)}`, caret: n + u.length + 2 };
}
function LR(e, n) {
	const r = [];
	for (const [u, s] of e) n.includes(`@${s}`) && r.push(u);
	return r;
}
function bb(e) {
	return e === "not_consented"
		? "This workspace has not allowed Chitchat to read the member list yet. An admin can accept the plugin's current permissions."
		: "The member list is not available right now. You can keep typing.";
}
var qR = Pn({ channels: fb(gt(), Jn()) }),
	UR = Pn({ at: Jn() }),
	El = Pn({
		collection: gt(),
		key: gt().min(1).max(128),
		value: fb(gt(), _o()),
		revision: Jn(),
		createdBy: gt().min(1),
		updatedBy: gt(),
		ownership: hh([wo("shared"), wo("owned")]),
		createdAt: Jn(),
		updatedAt: Jn(),
	});
function $R(e, n) {
	const r = El.safeParse(e);
	if (!r.success) return null;
	const u = lu(r.data.key);
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
function z0(e) {
	const n = El.safeParse(e);
	if (!n.success) return null;
	const r = OR.safeParse(n.data.value);
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
function pl(e) {
	return $R(e, kR);
}
function BR(e) {
	const n = El.safeParse(e);
	if (!n.success) return null;
	const r = CR(n.data.key);
	return r === null
		? null
		: {
				key: n.data.key,
				targetKey: r.targetKey,
				token: r.token,
				createdBy: n.data.createdBy,
				revision: n.data.revision,
			};
}
function IR(e) {
	const n = El.safeParse(e);
	if (!n.success) return null;
	const r = qR.safeParse(n.data.value);
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
function VR(e) {
	const n = El.safeParse(e);
	if (!n.success) return null;
	const r = pb(n.data.key);
	if (r === null) return null;
	const u = UR.safeParse(n.data.value);
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
function D0(e, n) {
	const r = { ...e.channels };
	for (const [u, s] of Object.entries(n.channels)) {
		const o = r[u];
		r[u] = o === void 0 ? s : Math.max(o, s);
	}
	return { channels: r };
}
function ZR(e) {
	const n = new Map();
	for (const r of e.docs) {
		const u = vh(r.key);
		if (u === null || li(u) || r.value.deletedAt !== null || r.createdBy === e.selfUserId) continue;
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
function zo(e, n) {
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
var HR = Pn({
		path: gt(),
		name: gt(),
		kind: hh([wo("file"), wo("folder")]),
		nodeId: gt(),
		contentType: gt().nullable(),
		updatedAt: Jn(),
	}),
	PR = Pn({ items: Jr(HR), cursor: gt().nullable(), isDone: dh() }),
	QR = Pn({ documents: Jr(_o()), cursor: gt().nullable(), isDone: dh() }),
	KR = Pn({
		items: Jr(Pn({ fileNodeId: gt(), url: gt(), expiresAt: Jn() })),
		errors: Jr(Pn({ fileNodeId: gt(), message: gt() })),
		truncated: dh(),
	});
function Xn(e) {
	return e instanceof Error ? e.message : String(e);
}
function Sb(e) {
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
function eu(e) {
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
function YR(e, n) {
	const r = new Map();
	for (const s of e) {
		let o = r.get(s.targetKey);
		o === void 0 && ((o = new Map()), r.set(s.targetKey, o));
		let f = o.get(s.token);
		(f === void 0 && ((f = new Set()), o.set(s.token, f)), f.add(s.createdBy));
	}
	const u = new Map();
	for (const [s, o] of r) {
		const f = [];
		for (const h of Xa) {
			const m = o.get(h);
			m === void 0 || m.size === 0 || f.push({ token: h, count: m.size, reactedByMe: m.has(n) });
		}
		u.set(s, f);
	}
	return u;
}
function GR(e) {
	const n = new Map();
	for (const r of e) {
		const u = yb(r.key);
		if (u === null) continue;
		const s = n.get(u);
		s === void 0
			? n.set(u, { count: 1, latestAt: r.timestamp })
			: ((s.count += 1), (s.latestAt = Math.max(s.latestAt, r.timestamp)));
	}
	return n;
}
function FR(e, n) {
	return e > 99 && n ? "99+" : String(e);
}
var XR = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
	JR = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (n, r, u) => (u ? u.toUpperCase() : r.toLowerCase())),
	j0 = (e) => {
		const n = JR(e);
		return n.charAt(0).toUpperCase() + n.slice(1);
	},
	_b = (...e) =>
		e
			.filter((n, r, u) => !!n && n.trim() !== "" && u.indexOf(n) === r)
			.join(" ")
			.trim(),
	WR = (e) => {
		for (const n in e) if (n.startsWith("aria-") || n === "role" || n === "title") return !0;
	},
	eO = {
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
	tO = (0, w.forwardRef)(
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
					...eO,
					width: n,
					height: n,
					stroke: e,
					strokeWidth: u ? (Number(r) * 24) / Number(n) : r,
					className: _b("lucide", s),
					...(!o && !WR(h) && { "aria-hidden": "true" }),
					...h,
				},
				[...f.map(([v, g]) => (0, w.createElement)(v, g)), ...(Array.isArray(o) ? o : [o])],
			),
	),
	gh = (e, n) => {
		const r = (0, w.forwardRef)(({ className: u, ...s }, o) =>
			(0, w.createElement)(tO, { ref: o, iconNode: n, className: _b(`lucide-${XR(j0(e))}`, `lucide-${e}`, u), ...s }),
		);
		return ((r.displayName = j0(e)), r);
	},
	nO = [
		["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
		["path", { d: "M12 19V5", key: "x0mq9r" }],
	],
	iO = gh("arrow-up", nO),
	rO = [
		["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
		["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
		["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
	],
	aO = gh("ellipsis", rO),
	uO = [
		[
			"path",
			{
				d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
				key: "1miecu",
			},
		],
	],
	lO = gh("paperclip", uO),
	fu = sO();
function sO() {
	var e;
	return typeof window < "u" && !!((e = window.document) != null && e.createElement);
}
function ot(e) {
	return e ? ("self" in e ? e.document : e.ownerDocument || document) : document;
}
function wb(e) {
	return e ? ("self" in e ? e.self : ot(e).defaultView || window) : self;
}
function Vi(e, n = !1) {
	const { activeElement: r } = ot(e);
	if (!r?.nodeName) return null;
	if (yh(r) && r.contentDocument) return Vi(r.contentDocument.body, n);
	if (n) {
		const u = r.getAttribute("aria-activedescendant");
		if (u) {
			const s = ot(r).getElementById(u);
			if (s) return s;
		}
	}
	return r;
}
function Vt(e, n) {
	return e === n || e.contains(n);
}
function yh(e) {
	return e.tagName === "IFRAME";
}
function br(e) {
	const n = e.tagName.toLowerCase();
	return n === "button" ? !0 : n === "input" && e.type ? oO.indexOf(e.type) !== -1 : !1;
}
var oO = ["button", "color", "file", "image", "reset", "submit"];
function Eb(e) {
	if (typeof e.checkVisibility == "function") return e.checkVisibility();
	const n = e;
	return n.offsetWidth > 0 || n.offsetHeight > 0 || e.getClientRects().length > 0;
}
function fi(e) {
	try {
		const n = e instanceof HTMLInputElement && e.selectionStart !== null,
			r = e.tagName === "TEXTAREA";
		return n || r || !1;
	} catch {
		return !1;
	}
}
function Hd(e) {
	return e.isContentEditable || fi(e);
}
function cO(e) {
	if (fi(e)) return e.value;
	if (e.isContentEditable) {
		const n = ot(e).createRange();
		return (n.selectNodeContents(e), n.toString());
	}
	return "";
}
function Pd(e) {
	let n = 0,
		r = 0;
	if (fi(e)) ((n = e.selectionStart || 0), (r = e.selectionEnd || 0));
	else if (e.isContentEditable) {
		const u = ot(e).getSelection();
		if (u?.rangeCount && u.anchorNode && Vt(e, u.anchorNode) && u.focusNode && Vt(e, u.focusNode)) {
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
function Do(e, n) {
	const r = ["dialog", "menu", "listbox", "tree", "grid"],
		u = e?.getAttribute("role");
	return u && r.indexOf(u) !== -1 ? u : n;
}
function Tb(e, n) {
	var r;
	const u = { menu: "menuitem", listbox: "option", tree: "treeitem" },
		s = Do(e);
	return s && (r = u[s]) != null ? r : n;
}
function ph(e) {
	if (!e) return null;
	const n = (r) => r === "auto" || r === "scroll";
	if (e.clientHeight && e.scrollHeight > e.clientHeight) {
		const { overflowY: r } = getComputedStyle(e);
		if (n(r)) return e;
	} else if (e.clientWidth && e.scrollWidth > e.clientWidth) {
		const { overflowX: r } = getComputedStyle(e);
		if (n(r)) return e;
	}
	return ph(e.parentElement) || document.scrollingElement || document.body;
}
function Sd(e, ...n) {
	/text|search|password|tel|url/i.test(e.type) && e.setSelectionRange(...n);
}
function xb(e, n) {
	const r = e.map((s, o) => [o, s]);
	let u = !1;
	return (
		r.sort(([s, o], [f, h]) => {
			const m = n(o),
				v = n(h);
			return m === v || !m || !v ? 0 : fO(m, v) ? (s > f && (u = !0), -1) : (s < f && (u = !0), 1);
		}),
		u ? r.map(([s, o]) => o) : e
	);
}
function fO(e, n) {
	return !!(n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
var dO = { id: null };
function hO(e, n, r = !1) {
	const u = e.findIndex((s) => s.id === n);
	return [...e.slice(u + 1), ...(r ? [dO] : []), ...e.slice(0, u)];
}
function mO(e, n) {
	return e.find((r) => (n ? !r.disabled && r.id !== n : !r.disabled));
}
function yr(e, n) {
	return (n && e.item(n)) || null;
}
function vO(e) {
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
function gO(e, n = !1) {
	if (fi(e)) e.setSelectionRange(n ? e.value.length : 0, e.value.length);
	else if (e.isContentEditable) {
		const r = ot(e).getSelection();
		(r?.selectAllChildren(e), n && r?.collapseToEnd());
	}
}
var Qd = Symbol("FOCUS_SILENTLY");
function yO(e) {
	((e[Qd] = !0), e.focus({ preventScroll: !0 }));
}
function pO(e) {
	const n = e[Qd];
	return (delete e[Qd], n);
}
function hl(e, n, r) {
	if (!n || n === r) return !1;
	const u = e.item(n.id);
	return !(!u || (r && u.element === r));
}
function ml(...e) {}
function Ab(e, n) {
	return bO(e) ? e(SO(n) ? n() : n) : e;
}
function bO(e) {
	return typeof e == "function";
}
function SO(e) {
	return typeof e == "function";
}
function Ii(e, n) {
	return typeof Object.hasOwn == "function" ? Object.hasOwn(e, n) : Object.prototype.hasOwnProperty.call(e, n);
}
function Sn(...e) {
	return (...n) => {
		for (const r of e) typeof r == "function" && r(...n);
	};
}
function Cb(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function _O(e, n) {
	const r = { ...e };
	for (const u of n) Ii(r, u) && delete r[u];
	return r;
}
function wO(e, n) {
	const r = {};
	for (const u of n) Ii(e, u) && (r[u] = e[u]);
	return r;
}
function Rb(e) {
	return e;
}
function Zt(e, n) {
	if (!e) throw typeof n != "string" ? new Error("Invariant failed") : new Error(n);
}
function EO(e) {
	return Object.keys(e);
}
function jo(e, ...n) {
	const r = typeof e == "function" ? e(...n) : e;
	return r == null ? !1 : !r;
}
function Tl(e) {
	return e.disabled || e["aria-disabled"] === !0 || e["aria-disabled"] === "true";
}
function ra(e) {
	const n = {};
	for (const r in e) e[r] !== void 0 && (n[r] = e[r]);
	return n;
}
function Ce(...e) {
	for (const n of e) if (n !== void 0) return n;
}
function Kd(e, n) {
	typeof e == "function" ? e(n) : e && (e.current = n);
}
function TO(e) {
	return !e || !(0, w.isValidElement)(e) ? !1 : "ref" in e.props || "ref" in e;
}
function xO(e) {
	return TO(e) ? { ...e.props }.ref || e.ref : null;
}
function AO(e, n) {
	const r = { ...e };
	for (const u in n) {
		if (!Ii(n, u)) continue;
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
function Ob() {
	return fu && !!navigator.maxTouchPoints;
}
function bh() {
	return fu ? /mac|iphone|ipad|ipod/i.test(navigator.platform) : !1;
}
function Lo() {
	return fu && bh() && /apple/i.test(navigator.vendor);
}
function CO() {
	return fu && /firefox\//i.test(navigator.userAgent);
}
function RO() {
	return fu && navigator.platform.startsWith("Mac") && !Ob();
}
function Nb(e) {
	return !!(e.currentTarget && !Vt(e.currentTarget, e.target));
}
function On(e) {
	return e.target === e.currentTarget;
}
function kb(e) {
	const n = e.currentTarget;
	if (!n) return !1;
	const r = bh();
	if ((r && !e.metaKey) || (!r && !e.ctrlKey)) return !1;
	const u = n.tagName.toLowerCase();
	return u === "a" || (u === "button" && n.type === "submit") || (u === "input" && n.type === "submit");
}
function Mb(e) {
	const n = e.currentTarget;
	if (!n) return !1;
	const r = n.tagName.toLowerCase();
	return e.altKey ? r === "a" || (r === "button" && n.type === "submit") || (r === "input" && n.type === "submit") : !1;
}
function OO(e, n, r) {
	const u = new Event(n, r);
	return e.dispatchEvent(u);
}
function Qa(e, n) {
	const r = new FocusEvent("blur", n),
		u = e.dispatchEvent(r),
		s = { ...n, bubbles: !0 };
	return (e.dispatchEvent(new FocusEvent("focusout", s)), u);
}
function NO(e, n, r) {
	const u = new KeyboardEvent(n, r);
	return e.dispatchEvent(u);
}
function L0(e, n) {
	const r = new MouseEvent("click", n);
	return e.dispatchEvent(r);
}
function Kr(e, n) {
	const r = n || e.currentTarget,
		u = e.relatedTarget;
	return !u || !Vt(r, u);
}
function tu(e, n, r, u) {
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
function nn(e, n, r, u = window) {
	const s = [];
	try {
		u.document.addEventListener(e, n, r);
		for (const f of Array.from(u.frames)) s.push(nn(e, n, r, f));
	} catch {}
	return () => {
		try {
			u.document.removeEventListener(e, n, r);
		} catch {}
		for (const f of s) f();
	};
}
var Sh = { ...w },
	q0 = Sh.useId,
	_z = Sh.useDeferredValue,
	U0 = Sh.useInsertionEffect,
	Ke = fu ? w.useLayoutEffect : w.useEffect;
function kO(e) {
	const [n] = (0, w.useState)(e);
	return n;
}
function zb(e) {
	const n = (0, w.useRef)(e);
	return (
		Ke(() => {
			n.current = e;
		}),
		n
	);
}
function xe(e) {
	const n = (0, w.useRef)(() => {
		throw new Error("Cannot call an event handler while rendering.");
	});
	return (
		U0
			? U0(() => {
					n.current = e;
				})
			: (n.current = e),
		(0, w.useCallback)((...r) => {
			var u;
			return (u = n.current) == null ? void 0 : u.call(n, ...r);
		}, [])
	);
}
function MO(e) {
	const [n, r] = (0, w.useState)(null);
	return (
		Ke(() => {
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
function Ot(...e) {
	return (0, w.useMemo)(() => {
		if (e.some(Boolean))
			return (n) => {
				for (const r of e) Kd(r, n);
			};
	}, e);
}
function Zi(e) {
	if (q0) {
		const u = q0();
		return e || u;
	}
	const [n, r] = (0, w.useState)(e);
	return (
		Ke(() => {
			if (e || n) return;
			const u = Math.random().toString(36).slice(2, 8);
			r(`id-${u}`);
		}, [e, n]),
		e || n
	);
}
function Db(e, n) {
	const r = (o) => {
			if (typeof o == "string") return o;
		},
		[u, s] = (0, w.useState)(() => r(n));
	return (
		Ke(() => {
			const o = e && "current" in e ? e.current : e;
			s(o?.tagName.toLowerCase() || r(n));
		}, [e, n]),
		u
	);
}
function zO(e, n, r) {
	const u = kO(r),
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
function du(e, n) {
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
function DO(e, n) {
	const r = (0, w.useRef)(!1);
	(Ke(() => {
		if (r.current) return e();
		r.current = !0;
	}, n),
		Ke(
			() => () => {
				r.current = !1;
			},
			[],
		));
}
function jb() {
	return (0, w.useReducer)(() => [], []);
}
function ft(e) {
	return xe(typeof e == "function" ? e : () => e);
}
function rn(e, n, r = []) {
	const u = (0, w.useCallback)((s) => (e.wrapElement && (s = e.wrapElement(s)), n(s)), [...r, e.wrapElement]);
	return { ...e, wrapElement: u };
}
function _h(e = !1, n) {
	const [r, u] = (0, w.useState)(null);
	return { portalRef: Ot(u, n), portalNode: r, domReady: !e || r };
}
function Lb(e, n, r) {
	const u = e.onLoadedMetadataCapture,
		s = (0, w.useMemo)(() => Object.assign(() => {}, { ...u, [n]: r }), [u, n, r]);
	return [u?.[n], { onLoadedMetadataCapture: s }];
}
var $0 = !1;
function wh() {
	return (
		(0, w.useEffect)(() => {
			$0 ||
				(nn("mousemove", LO, !0),
				nn("mousedown", io, !0),
				nn("mouseup", io, !0),
				nn("keydown", io, !0),
				nn("scroll", io, !0),
				($0 = !0));
		}, []),
		xe(() => Eh)
	);
}
var Eh = !1,
	B0 = 0,
	I0 = 0;
function jO(e) {
	const n = e.movementX || e.screenX - B0,
		r = e.movementY || e.screenY - I0;
	return ((B0 = e.screenX), (I0 = e.screenY), n || r || !1);
}
function LO(e) {
	jO(e) && (Eh = !0);
}
function io() {
	Eh = !1;
}
var qO = Qn((e) => {
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
	UO = Qn((e, n) => {
		n.exports = qO();
	}),
	S = UO();
function Ie(e) {
	const n = w.forwardRef((r, u) => e({ ...r, ref: u }));
	return ((n.displayName = e.displayName || e.name), n);
}
function qo(e, n) {
	return w.memo(e, n);
}
function Ye(e, n) {
	const { wrapElement: r, render: u, ...s } = n,
		o = Ot(n.ref, xO(u));
	let f;
	if (w.isValidElement(u)) {
		const h = { ...u.props, ref: o };
		f = w.cloneElement(u, AO(s, h));
	} else u ? (f = u(s)) : (f = (0, S.jsx)(e, { ...s }));
	return r ? r(f) : f;
}
function Ge(e) {
	const n = (r = {}) => e(r);
	return ((n.displayName = e.name), n);
}
function di(e = [], n = []) {
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
var xl = di(),
	$O = xl.useContext,
	wz = xl.useScopedContext,
	Ez = xl.useProviderContext,
	BO = xl.ContextProvider,
	IO = xl.ScopedContextProvider,
	Al = di([BO], [IO]),
	Th = Al.useContext,
	Tz = Al.useScopedContext,
	VO = Al.useProviderContext,
	Cl = Al.ContextProvider,
	Uo = Al.ScopedContextProvider,
	ZO = (0, w.createContext)(void 0),
	HO = (0, w.createContext)(void 0),
	qb = (0, w.createContext)(!0),
	$o =
		"input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], summary, iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])";
function PO(e) {
	return Number.parseInt(e.getAttribute("tabindex") || "0", 10) < 0;
}
function Wn(e) {
	return !(!e.matches($o) || !Eb(e) || e.closest("[inert]"));
}
function su(e) {
	if (!Wn(e) || PO(e)) return !1;
	if (!("form" in e) || !e.form || e.checked || e.type !== "radio") return !0;
	const n = e.form.elements.namedItem(e.name);
	if (!n || !("length" in n)) return !0;
	const r = Vi(e);
	return !r || r === e || !("form" in r) || r.form !== e.form || r.name !== e.name;
}
function xh(e, n) {
	const r = Array.from(e.querySelectorAll($o));
	n && r.unshift(e);
	const u = r.filter(Wn);
	return (
		u.forEach((s, o) => {
			if (yh(s) && s.contentDocument) {
				const f = s.contentDocument.body;
				u.splice(o, 1, ...xh(f));
			}
		}),
		u
	);
}
function Bo(e, n, r) {
	const u = Array.from(e.querySelectorAll($o)),
		s = u.filter(su);
	return (
		n && su(e) && s.unshift(e),
		s.forEach((o, f) => {
			if (yh(o) && o.contentDocument) {
				const h = o.contentDocument.body,
					m = Bo(h, !1, r);
				s.splice(f, 1, ...m);
			}
		}),
		!s.length && r ? u : s
	);
}
function QO(e, n, r) {
	const [u] = Bo(e, n, r);
	return u || null;
}
function KO(e, n, r, u) {
	const s = Vi(e),
		o = xh(e, n),
		f = o.indexOf(s),
		h = o.slice(f + 1);
	return h.find(su) || (r ? o.find(su) : null) || (u ? h[0] : null) || null;
}
function _d(e, n) {
	return KO(document.body, !1, e, n);
}
function YO(e, n, r, u) {
	const s = Vi(e),
		o = xh(e, n).reverse(),
		f = o.indexOf(s),
		h = o.slice(f + 1);
	return h.find(su) || (r ? o.find(su) : null) || (u ? h[0] : null) || null;
}
function V0(e, n) {
	return YO(document.body, !1, e, n);
}
function GO(e) {
	for (; e && !Wn(e); ) e = e.closest($o);
	return e || null;
}
function Wr(e) {
	const n = Vi(e);
	if (!n) return !1;
	if (n === e) return !0;
	const r = n.getAttribute("aria-activedescendant");
	return r ? r === e.id : !1;
}
function pr(e) {
	const n = Vi(e);
	if (!n) return !1;
	if (Vt(e, n)) return !0;
	const r = n.getAttribute("aria-activedescendant");
	return !r || !("id" in e) ? !1 : r === e.id ? !0 : !!e.querySelector(`#${CSS.escape(r)}`);
}
function Ub(e) {
	!pr(e) && Wn(e) && e.focus();
}
function FO(e) {
	var n;
	const r = (n = e.getAttribute("tabindex")) != null ? n : "";
	(e.setAttribute("data-tabindex", r), e.setAttribute("tabindex", "-1"));
}
function XO(e, n) {
	const r = Bo(e, n);
	for (const u of r) FO(u);
}
function JO(e) {
	const n = e.querySelectorAll("[data-tabindex]"),
		r = (u) => {
			const s = u.getAttribute("data-tabindex");
			(u.removeAttribute("data-tabindex"), s ? u.setAttribute("tabindex", s) : u.removeAttribute("tabindex"));
		};
	e.hasAttribute("data-tabindex") && r(e);
	for (const u of n) r(u);
}
function WO(e, n) {
	"scrollIntoView" in e
		? (e.focus({ preventScroll: !0 }), e.scrollIntoView({ block: "nearest", inline: "nearest", ...n }))
		: e.focus();
}
var eN = "div",
	Z0 = Lo(),
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
	$b = Symbol("safariFocusAncestor");
function nN(e) {
	return e ? !!e[$b] : !1;
}
function H0(e, n) {
	e && (e[$b] = n);
}
function iN(e) {
	const { tagName: n, readOnly: r, type: u } = e;
	return (n === "TEXTAREA" && !r) || (n === "SELECT" && !r)
		? !0
		: n === "INPUT" && !r
			? tN.includes(u)
			: !!(e.isContentEditable || (e.getAttribute("role") === "combobox" && e.dataset.name));
}
function rN(e) {
	return "labels" in e ? e.labels : null;
}
function P0(e) {
	return e.tagName.toLowerCase() === "input" && e.type ? e.type === "radio" || e.type === "checkbox" : !1;
}
function aN(e) {
	return e ? e === "button" || e === "summary" || e === "input" || e === "select" || e === "textarea" || e === "a" : !0;
}
function uN(e) {
	return e ? e === "button" || e === "input" || e === "select" || e === "textarea" : !0;
}
function lN(e, n, r, u, s) {
	return e ? (n ? (r && !u ? -1 : void 0) : r ? s : s || 0) : s;
}
function wd(e, n) {
	return xe((r) => {
		(e?.(r), !r.defaultPrevented && n && (r.stopPropagation(), r.preventDefault()));
	});
}
var Q0 = !1,
	Ah = !0;
function sN(e) {
	const n = e.target;
	n && "hasAttribute" in n && (n.hasAttribute("data-focus-visible") || (Ah = !1));
}
function oN(e) {
	e.metaKey || e.ctrlKey || e.altKey || (Ah = !0);
}
var Rl = Ge(function ({ focusable: n = !0, accessibleWhenDisabled: r, autoFocus: u, onFocusVisible: s, ...o }) {
		const f = (0, w.useRef)(null);
		((0, w.useEffect)(() => {
			n && (Q0 || (nn("mousedown", sN, !0), nn("keydown", oN, !0), (Q0 = !0)));
		}, [n]),
			Z0 &&
				(0, w.useEffect)(() => {
					if (!n) return;
					const F = f.current;
					if (!F || !P0(F)) return;
					const ae = rN(F);
					if (!ae) return;
					const O = () => queueMicrotask(() => F.focus());
					for (const $ of ae) $.addEventListener("mouseup", O);
					return () => {
						for (const $ of ae) $.removeEventListener("mouseup", O);
					};
				}, [n]));
		const h = n && Tl(o),
			m = !!h && !r,
			[v, g] = (0, w.useState)(!1);
		((0, w.useEffect)(() => {
			n && m && v && g(!1);
		}, [n, m, v]),
			(0, w.useEffect)(() => {
				if (!n || !v) return;
				const F = f.current;
				if (!F || typeof IntersectionObserver > "u") return;
				const ae = new IntersectionObserver(() => {
					Wn(F) || g(!1);
				});
				return (ae.observe(F), () => ae.disconnect());
			}, [n, v]));
		const _ = wd(o.onKeyPressCapture, h),
			b = wd(o.onMouseDownCapture, h),
			p = wd(o.onClickCapture, h),
			E = o.onMouseDown,
			x = xe((F) => {
				if ((E?.(F), F.defaultPrevented || !n)) return;
				const ae = F.currentTarget;
				if (!Z0 || Nb(F) || (!br(ae) && !P0(ae))) return;
				let O = !1;
				const $ = () => {
					O = !0;
				};
				ae.addEventListener("focusin", $, { capture: !0, once: !0 });
				const H = GO(ae.parentElement);
				(H0(H, !0),
					tu(ae, "mouseup", () => {
						(ae.removeEventListener("focusin", $, !0), H0(H, !1), !O && Ub(ae));
					}));
			}),
			k = (F, ae) => {
				if ((ae && (F.currentTarget = ae), !n)) return;
				const O = F.currentTarget;
				O && Wr(O) && (s?.(F), !F.defaultPrevented && ((O.dataset.focusVisible = "true"), g(!0)));
			},
			D = o.onKeyDownCapture,
			C = xe((F) => {
				if ((D?.(F), F.defaultPrevented || !n || v || F.metaKey || F.altKey || F.ctrlKey || !On(F))) return;
				const ae = F.currentTarget;
				tu(ae, "focusout", () => k(F, ae));
			}),
			A = o.onFocusCapture,
			R = xe((F) => {
				if ((A?.(F), F.defaultPrevented || !n)) return;
				if (!On(F)) {
					g(!1);
					return;
				}
				const ae = F.currentTarget,
					O = () => k(F, ae);
				Ah || iN(F.target) ? tu(F.target, "focusout", O) : g(!1);
			}),
			M = o.onBlur,
			Y = xe((F) => {
				(M?.(F), n && Kr(F) && (F.currentTarget.removeAttribute("data-focus-visible"), g(!1)));
			}),
			P = (0, w.useContext)(qb),
			j = xe((F) => {
				n &&
					u &&
					F &&
					P &&
					queueMicrotask(() => {
						Wr(F) || (Wn(F) && F.focus());
					});
			}),
			q = Db(f),
			K = n && aN(q),
			B = n && uN(q),
			se = o.style,
			X = (0, w.useMemo)(() => (m ? { pointerEvents: "none", ...se } : se), [m, se]);
		return (
			(o = {
				"data-focus-visible": (n && v) || void 0,
				"data-autofocus": u || void 0,
				"aria-disabled": h || void 0,
				...o,
				ref: Ot(f, j, o.ref),
				style: X,
				tabIndex: lN(n, m, K, B, o.tabIndex),
				disabled: B && m ? !0 : void 0,
				contentEditable: h ? void 0 : o.contentEditable,
				onKeyPressCapture: _,
				onClickCapture: p,
				onMouseDownCapture: b,
				onMouseDown: x,
				onKeyDownCapture: C,
				onFocusCapture: R,
				onBlur: Y,
			}),
			ra(o)
		);
	}),
	xz = Ie(function (n) {
		return Ye(eN, Rl(n));
	});
function Bb(e) {
	const n = [];
	for (const r of e) n.push(...r);
	return n;
}
function Yd(e) {
	return e.slice().reverse();
}
var cN = "div";
function fN(e) {
	return e.some((n) => !!n.rowId);
}
function dN(e) {
	const n = e.target;
	return n && !fi(n) ? !1 : e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
function hN(e) {
	return e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta";
}
function K0(e, n, r) {
	return xe((u) => {
		var s;
		if ((n?.(u), u.defaultPrevented || u.isPropagationStopped() || !On(u) || hN(u) || dN(u))) return;
		const o = (s = yr(e, e.getState().activeId)) == null ? void 0 : s.element;
		if (!o) return;
		const { view: f, ...h } = u;
		(o !== r?.current && o.focus(),
			NO(o, u.type, h) || u.preventDefault(),
			u.currentTarget.contains(o) && u.stopPropagation());
	});
}
function mN(e) {
	return mO(Bb(Yd(vO(e))));
}
function vN(e) {
	const [n, r] = (0, w.useState)(!1),
		u = (0, w.useCallback)(() => r(!0), []),
		s = e.useState((o) => yr(e, o.activeId));
	return (
		(0, w.useEffect)(() => {
			const o = s?.element;
			n && o && (r(!1), o.focus({ preventScroll: !0 }));
		}, [s, n]),
		u
	);
}
var Ch = Ge(function ({ store: n, composite: r = !0, focusOnMove: u = r, moveOnKeyPress: s = !0, ...o }) {
		const f = VO();
		((n = n || f), Zt(n, !1));
		const h = (0, w.useRef)(null),
			m = (0, w.useRef)(null),
			v = vN(n),
			g = n.useState("moves"),
			[, _] = MO(r ? n.setBaseElement : null);
		((0, w.useEffect)(() => {
			var q;
			if (!n || !g || !r || !u) return;
			const { activeId: K } = n.getState(),
				B = (q = yr(n, K)) == null ? void 0 : q.element;
			B && WO(B);
		}, [n, g, r, u]),
			Ke(() => {
				if (!n || !g || !r) return;
				const { baseElement: q, activeId: K } = n.getState();
				if (K !== null || !q) return;
				const B = m.current;
				((m.current = null), B && Qa(B, { relatedTarget: q }), Wr(q) || q.focus());
			}, [n, g, r]));
		const b = n.useState("activeId"),
			p = n.useState("virtualFocus");
		Ke(() => {
			var q;
			if (!n || !r || !p) return;
			const K = m.current;
			if (((m.current = null), !K)) return;
			const B = ((q = yr(n, b)) == null ? void 0 : q.element) || Vi(K);
			B !== K && Qa(K, { relatedTarget: B });
		}, [n, b, p, r]);
		const E = K0(n, o.onKeyDownCapture, m),
			x = K0(n, o.onKeyUpCapture, m),
			k = o.onFocusCapture,
			D = xe((q) => {
				if ((k?.(q), q.defaultPrevented || !n)) return;
				const { virtualFocus: K } = n.getState();
				if (!K) return;
				const B = q.relatedTarget,
					se = pO(q.currentTarget);
				On(q) && se && (q.stopPropagation(), (m.current = B));
			}),
			C = o.onFocus,
			A = xe((q) => {
				if ((C?.(q), q.defaultPrevented || !r || !n)) return;
				const { relatedTarget: K } = q,
					{ virtualFocus: B } = n.getState();
				B ? On(q) && !hl(n, K) && queueMicrotask(v) : On(q) && n.setActiveId(null);
			}),
			R = o.onBlurCapture,
			M = xe((q) => {
				var K;
				if ((R?.(q), q.defaultPrevented || !n)) return;
				const { virtualFocus: B, activeId: se } = n.getState();
				if (!B) return;
				const X = (K = yr(n, se)) == null ? void 0 : K.element,
					F = q.relatedTarget,
					ae = hl(n, F),
					O = m.current;
				((m.current = null),
					On(q) && ae
						? (F === X ? O && O !== F && Qa(O, q) : X ? Qa(X, q) : O && Qa(O, q), q.stopPropagation())
						: !hl(n, q.target) && X && Qa(X, q));
			}),
			Y = o.onKeyDown,
			P = ft(s),
			j = xe((q) => {
				var K;
				if ((Y?.(q), q.nativeEvent.isComposing || q.defaultPrevented || !n || !On(q))) return;
				const { orientation: B, renderedItems: se, activeId: X } = n.getState(),
					F = yr(n, X);
				if ((K = F?.element) != null && K.isConnected) return;
				const ae = B !== "horizontal",
					O = B !== "vertical",
					$ = fN(se);
				if (
					(q.key === "ArrowLeft" || q.key === "ArrowRight" || q.key === "Home" || q.key === "End") &&
					fi(q.currentTarget)
				)
					return;
				const le = {
					ArrowUp:
						($ || ae) &&
						(() => {
							if ($) {
								const he = mN(se);
								return he?.id;
							}
							return n?.last();
						}),
					ArrowRight: ($ || O) && n.first,
					ArrowDown: ($ || ae) && n.first,
					ArrowLeft: ($ || O) && n.last,
					Home: n.first,
					End: n.last,
					PageUp: n.first,
					PageDown: n.last,
				}[q.key];
				if (le) {
					const he = le();
					if (he !== void 0) {
						if (!P(q)) return;
						(q.preventDefault(), n.move(he));
					}
				}
			});
		return (
			(o = rn(o, (q) => (0, S.jsx)(Cl, { value: n, children: q }), [n])),
			(o = {
				"aria-activedescendant": n.useState((q) => {
					var K;
					if (n && r && q.virtualFocus) return (K = yr(n, q.activeId)) == null ? void 0 : K.id;
				}),
				...o,
				ref: Ot(h, _, o.ref),
				onKeyDownCapture: E,
				onKeyUpCapture: x,
				onFocusCapture: D,
				onFocus: A,
				onBlurCapture: M,
				onKeyDown: j,
			}),
			(o = Rl({ focusable: n.useState((q) => r && (q.virtualFocus || q.activeId === null)), ...o })),
			o
		);
	}),
	Az = Ie(function (n) {
		return Ye(cN, Ch(n));
	}),
	Ol = di(),
	Cz = Ol.useContext,
	Rz = Ol.useScopedContext,
	Rh = Ol.useProviderContext,
	gN = Ol.ContextProvider,
	yN = Ol.ScopedContextProvider,
	Nl = di([gN], [yN]),
	Oz = Nl.useContext,
	Nz = Nl.useScopedContext,
	Io = Nl.useProviderContext,
	pN = Nl.ContextProvider,
	Oh = Nl.ScopedContextProvider,
	bN = (0, w.createContext)(void 0),
	SN = (0, w.createContext)(void 0),
	kl = di([pN], [Oh]),
	kz = kl.useContext,
	Mz = kl.useScopedContext,
	Vo = kl.useProviderContext,
	Ib = kl.ContextProvider,
	Zo = kl.ScopedContextProvider,
	_N = "div",
	Nh = Ge(function ({ store: n, ...r }) {
		const u = Vo();
		return ((n = n || u), (r = { ...r, ref: Ot(n?.setAnchorElement, r.ref) }), r);
	}),
	zz = Ie(function (n) {
		return Ye(_N, Nh(n));
	}),
	Vb = (0, w.createContext)(void 0),
	Ml = di([Ib, Cl], [Zo, Uo]),
	wN = Ml.useContext,
	Zb = Ml.useScopedContext,
	Ho = Ml.useProviderContext,
	Dz = Ml.ContextProvider,
	EN = Ml.ScopedContextProvider,
	TN = (0, w.createContext)(void 0),
	xN = (0, w.createContext)(!1);
function aa(e, n) {
	const r = e.__unstableInternals;
	return (Zt(r, "Invalid store"), r[n]);
}
function ei(e, ...n) {
	let r = e,
		u = r,
		s = Symbol(),
		o = ml;
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
			const K = () => {
				(f.delete(q), !f.size && o());
			};
			if (j) return K;
			const B = EO(r).map((F) =>
					Sn(
						...n.map((ae) => {
							var O;
							const $ = (O = ae?.getState) == null ? void 0 : O.call(ae);
							if ($ && Ii($, F))
								return un(ae, [F], (H) => {
									Y(F, H[F], !0);
								});
						}),
					),
				),
				se = [];
			for (const F of m) se.push(F());
			const X = n.map(kh);
			return ((o = Sn(...B, ...se, ...X)), K);
		},
		x = (j, q, K = v) => (
			K.add(q),
			b.set(q, j),
			() => {
				var B;
				((B = _.get(q)) == null || B(), _.delete(q), b.delete(q), K.delete(q));
			}
		),
		k = (j, q) => x(j, q),
		D = (j, q) => (_.set(q, q(r, r)), x(j, q)),
		C = (j, q) => (_.set(q, q(r, u)), x(j, q, g)),
		A = (j) => ei(wO(r, j), P),
		R = (j) => ei(_O(r, j), P),
		M = () => r,
		Y = (j, q, K = !1) => {
			var B;
			if (!Ii(r, j)) return;
			const se = Ab(q, r[j]);
			if (se === r[j]) return;
			if (!K) for (const O of n) (B = O?.setState) == null || B.call(O, j, se);
			const X = r;
			r = { ...r, [j]: se };
			const F = Symbol();
			((s = F), h.add(j));
			const ae = (O, $, H) => {
				var le;
				const he = b.get(O),
					Re = (N) => (H ? H.has(N) : N === j);
				(!he || he.some(Re)) && ((le = _.get(O)) == null || le(), _.set(O, O(r, $)));
			};
			for (const O of v) ae(O, X);
			queueMicrotask(() => {
				if (s !== F) return;
				const O = r;
				for (const $ of g) ae($, u, h);
				((u = O), h.clear());
			});
		},
		P = {
			getState: M,
			setState: Y,
			__unstableInternals: { setup: p, init: E, subscribe: k, sync: D, batch: C, pick: A, omit: R },
		};
	return P;
}
function on(e, ...n) {
	if (e) return aa(e, "setup")(...n);
}
function kh(e, ...n) {
	if (e) return aa(e, "init")(...n);
}
function Mh(e, ...n) {
	if (e) return aa(e, "subscribe")(...n);
}
function un(e, ...n) {
	if (e) return aa(e, "sync")(...n);
}
function Eo(e, ...n) {
	if (e) return aa(e, "batch")(...n);
}
function zh(e, ...n) {
	if (e) return aa(e, "omit")(...n);
}
function Hb(e, ...n) {
	if (e) return aa(e, "pick")(...n);
}
function Po(...e) {
	var n;
	const r = {};
	for (const s of e) {
		const o = (n = s?.getState) == null ? void 0 : n.call(s);
		o && Object.assign(r, o);
	}
	const u = ei(r, ...e);
	return Object.assign({}, ...e, u);
}
var AN = "input";
function Y0(e, n, r) {
	if (!r) return !1;
	const u = e.find((s) => !s.disabled && s.value);
	return u?.value === n;
}
function G0(e, n) {
	return !n || e == null ? !1 : ((e = Cb(e)), n.length > e.length && n.toLowerCase().indexOf(e.toLowerCase()) === 0);
}
function CN(e) {
	return e.type === "input";
}
function RN(e) {
	return e === "inline" || e === "list" || e === "both" || e === "none";
}
function ON(e) {
	const n = e.find((r) => {
		var u;
		return r.disabled ? !1 : ((u = r.element) == null ? void 0 : u.getAttribute("role")) !== "tab";
	});
	return n?.id;
}
var NN = Ge(function ({
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
		...k
	}) {
		const D = Ho();
		((n = n || D), Zt(n, !1));
		const C = (0, w.useRef)(null),
			[A, R] = jb(),
			M = (0, w.useRef)(!1),
			Y = (0, w.useRef)(!1),
			P = n.useState((ue) => ue.virtualFocus && u),
			j = x === "inline" || x === "both",
			[q, K] = (0, w.useState)(j);
		DO(() => {
			j && K(!0);
		}, [j]);
		const B = n.useState("value"),
			se = (0, w.useRef)();
		(0, w.useEffect)(
			() =>
				un(n, ["selectedValue", "activeId"], (ue, Oe) => {
					se.current = Oe.selectedValue;
				}),
			[],
		);
		const X = n.useState((ue) => {
				var Oe;
				if (
					j &&
					q &&
					!(
						ue.activeValue &&
						Array.isArray(ue.selectedValue) &&
						(ue.selectedValue.includes(ue.activeValue) || ((Oe = se.current) != null && Oe.includes(ue.activeValue)))
					)
				)
					return ue.activeValue;
			}),
			F = n.useState("renderedItems"),
			ae = n.useState("open"),
			O = n.useState("contentElement"),
			$ = (0, w.useMemo)(() => {
				if (!j || !q) return B;
				if (Y0(F, X, P)) {
					if (G0(B, X)) {
						const ue = X?.slice(B.length) || "";
						return B + ue;
					}
					return B;
				}
				return X || B;
			}, [j, q, F, X, P, B]);
		((0, w.useEffect)(() => {
			const ue = C.current;
			if (!ue) return;
			const Oe = () => K(!0);
			return (
				ue.addEventListener("combobox-item-move", Oe),
				() => {
					ue.removeEventListener("combobox-item-move", Oe);
				}
			);
		}, []),
			(0, w.useEffect)(() => {
				if (!j || !q || !X || !Y0(F, X, P) || !G0(B, X)) return;
				let ue = ml;
				return (
					queueMicrotask(() => {
						const Oe = C.current;
						if (!Oe) return;
						const { start: ht, end: Ne } = Pd(Oe),
							Tt = B.length,
							Ft = X.length;
						(Sd(Oe, Tt, Ft),
							(ue = () => {
								if (!Wr(Oe)) return;
								const { start: St, end: kt } = Pd(Oe);
								St === Tt && kt === Ft && Sd(Oe, ht, Ne);
							}));
					}),
					() => ue()
				);
			}, [A, j, q, X, F, P, B]));
		const H = (0, w.useRef)(null),
			le = xe(s),
			he = (0, w.useRef)(null);
		((0, w.useEffect)(() => {
			if (!ae || !O) return;
			const ue = ph(O);
			if (!ue) return;
			H.current = ue;
			const Oe = () => {
					M.current = !1;
				},
				ht = () => {
					if (!n || !M.current) return;
					const { activeId: Tt } = n.getState();
					Tt !== null && Tt !== he.current && (M.current = !1);
				},
				Ne = { passive: !0, capture: !0 };
			return (
				ue.addEventListener("wheel", Oe, Ne),
				ue.addEventListener("touchmove", Oe, Ne),
				ue.addEventListener("scroll", ht, Ne),
				() => {
					(ue.removeEventListener("wheel", Oe, !0),
						ue.removeEventListener("touchmove", Oe, !0),
						ue.removeEventListener("scroll", ht, !0));
				}
			);
		}, [ae, O, n]),
			Ke(() => {
				B && (Y.current || (M.current = !0));
			}, [B]),
			Ke(() => {
				(P !== "always" && ae) || (M.current = ae);
			}, [P, ae]));
		const Re = n.useState("resetValueOnSelect");
		(du(() => {
			var ue, Oe;
			const ht = M.current;
			if (!n || !ae || (!ht && !Re)) return;
			const { baseElement: Ne, contentElement: Tt, activeId: Ft } = n.getState();
			if (!(Ne && !Wr(Ne))) {
				if (Tt?.hasAttribute("data-placing")) {
					const St = new MutationObserver(R);
					return (St.observe(Tt, { attributeFilter: ["data-placing"] }), () => St.disconnect());
				}
				if (P && ht) {
					const St = le(F),
						kt = St !== void 0 ? St : (ue = ON(F)) != null ? ue : n.first();
					((he.current = kt), n.move(kt ?? null));
				} else {
					const St = (Oe = n.item(Ft || n.first())) == null ? void 0 : Oe.element;
					St && "scrollIntoView" in St && St.scrollIntoView({ block: "nearest", inline: "nearest" });
				}
			}
		}, [n, ae, A, B, P, Re, le, F]),
			(0, w.useEffect)(() => {
				if (!j) return;
				const ue = C.current;
				if (!ue) return;
				const Oe = [ue, O].filter((Ne) => !!Ne),
					ht = (Ne) => {
						Oe.every((Tt) => Kr(Ne, Tt)) && n?.setValue($);
					};
				for (const Ne of Oe) Ne.addEventListener("focusout", ht);
				return () => {
					for (const Ne of Oe) Ne.removeEventListener("focusout", ht);
				};
			}, [j, O, n, $]));
		const N = (ue) => ue.currentTarget.value.length >= f,
			G = k.onChange,
			ie = ft(h ?? N),
			oe = ft(o ?? !n.tag),
			ge = xe((ue) => {
				if ((G?.(ue), ue.defaultPrevented || !n)) return;
				const Oe = ue.currentTarget,
					{ value: ht, selectionStart: Ne, selectionEnd: Tt } = Oe,
					Ft = ue.nativeEvent;
				if (((M.current = !0), CN(Ft) && (Ft.isComposing && ((M.current = !1), (Y.current = !0)), j))) {
					const St = Ft.inputType === "insertText" || Ft.inputType === "insertCompositionText",
						kt = Ne === ht.length;
					K(St && kt);
				}
				if (oe(ue)) {
					const St = ht === n.getState().value;
					(n.setValue(ht),
						queueMicrotask(() => {
							Sd(Oe, Ne, Tt);
						}),
						j && P && St && R());
				}
				(ie(ue) && n.show(), (!P || !M.current) && n.setActiveId(null));
			}),
			ye = k.onCompositionEnd,
			Se = xe((ue) => {
				((M.current = !0), (Y.current = !1), ye?.(ue), !ue.defaultPrevented && P && R());
			}),
			Pe = k.onMouseDown,
			ze = ft(b ?? (() => !!n?.getState().includesBaseElement)),
			rt = ft(p),
			Nt = ft(v ?? N),
			Ht = xe((ue) => {
				(Pe?.(ue),
					!ue.defaultPrevented &&
						(ue.button ||
							ue.ctrlKey ||
							(n &&
								(ze(ue) && n.setActiveId(null),
								rt(ue) && n.setValue($),
								Nt(ue) && tu(ue.currentTarget, "mouseup", n.show)))));
			}),
			Qt = k.onKeyDown,
			it = ft(_ ?? N),
			fe = xe((ue) => {
				if (
					(Qt?.(ue),
					ue.repeat || (M.current = !1),
					ue.defaultPrevented || ue.ctrlKey || ue.altKey || ue.shiftKey || ue.metaKey || !n)
				)
					return;
				const { open: Oe } = n.getState();
				Oe || ((ue.key === "ArrowUp" || ue.key === "ArrowDown") && it(ue) && (ue.preventDefault(), n.show()));
			}),
			Ee = k.onBlur,
			Be = xe((ue) => {
				((M.current = !1), Ee?.(ue), ue.defaultPrevented);
			}),
			Le = Zi(k.id),
			Et = RN(x) ? x : void 0,
			at = n.useState((ue) => ue.activeId === null);
		return (
			(k = {
				id: Le,
				role: "combobox",
				"aria-autocomplete": Et,
				"aria-haspopup": Do(O, "listbox"),
				"aria-expanded": ae,
				"aria-controls": O?.id,
				"data-active-item": at || void 0,
				value: $,
				...k,
				ref: Ot(C, k.ref),
				onChange: ge,
				onCompositionEnd: Se,
				onMouseDown: Ht,
				onKeyDown: fe,
				onBlur: Be,
			}),
			(k = Ch({ store: n, focusable: r, ...k, moveOnKeyPress: (ue) => (jo(E, ue) ? !1 : (j && K(!0), !0)) })),
			(k = Nh({ store: n, ...k })),
			{ autoComplete: "off", ...k }
		);
	}),
	kN = Ie(function (n) {
		return Ye(AN, NN(n));
	}),
	MN = "button";
function F0(e) {
	if (!e.isTrusted) return !1;
	const n = e.currentTarget;
	return e.key === "Enter"
		? br(n) || n.tagName === "SUMMARY" || n.tagName === "A"
		: e.key === " "
			? br(n) || n.tagName === "SUMMARY" || n.tagName === "INPUT" || n.tagName === "SELECT"
			: !1;
}
var zN = Symbol("command"),
	Dh = Ge(function ({ clickOnEnter: n = !0, clickOnSpace: r = !0, ...u }) {
		const s = (0, w.useRef)(null),
			[o, f] = (0, w.useState)(!1);
		(0, w.useEffect)(() => {
			s.current && f(br(s.current));
		}, []);
		const [h, m] = (0, w.useState)(!1),
			v = (0, w.useRef)(!1),
			g = Tl(u),
			[_, b] = Lb(u, zN, !0),
			p = u.onKeyDown,
			E = xe((D) => {
				p?.(D);
				const C = D.currentTarget;
				if (D.defaultPrevented || _ || g || !On(D) || fi(C) || C.isContentEditable) return;
				const A = n && D.key === "Enter",
					R = r && D.key === " ",
					M = D.key === "Enter" && !n,
					Y = D.key === " " && !r;
				if (M || Y) {
					D.preventDefault();
					return;
				}
				if (A || R) {
					const P = F0(D);
					if (A) {
						if (!P) {
							D.preventDefault();
							const { view: j, ...q } = D,
								K = () => L0(C, q);
							CO() ? tu(C, "keyup", K) : queueMicrotask(K);
						}
					} else R && ((v.current = !0), P || (D.preventDefault(), m(!0)));
				}
			}),
			x = u.onKeyUp,
			k = xe((D) => {
				if ((x?.(D), D.defaultPrevented || _ || g || D.metaKey)) return;
				const C = r && D.key === " ";
				if (v.current && C && ((v.current = !1), !F0(D))) {
					(D.preventDefault(), m(!1));
					const A = D.currentTarget,
						{ view: R, ...M } = D;
					queueMicrotask(() => L0(A, M));
				}
			});
		return (
			(u = {
				"data-active": h || void 0,
				type: o ? "button" : void 0,
				...b,
				...u,
				ref: Ot(s, u.ref),
				onKeyDown: E,
				onKeyUp: k,
			}),
			(u = Rl(u)),
			u
		);
	}),
	jz = Ie(function (n) {
		return Ye(MN, Dh(n));
	}),
	Pb = "button",
	Qb = Ge(function (n) {
		const r = (0, w.useRef)(null),
			u = Db(r, Pb),
			[s, o] = (0, w.useState)(() => !!u && br({ tagName: u, type: n.type }));
		return (
			(0, w.useEffect)(() => {
				r.current && o(br(r.current));
			}, []),
			(n = { role: !s && u !== "a" ? "button" : void 0, ...n, ref: Ot(r, n.ref) }),
			(n = Dh(n)),
			n
		);
	}),
	Lz = Ie(function (n) {
		return Ye(Pb, Qb(n));
	}),
	DN = "button",
	jN = Symbol("disclosure"),
	Kb = Ge(function ({ store: n, toggleOnClick: r = !0, ...u }) {
		const s = Rh();
		((n = n || s), Zt(n, !1));
		const o = (0, w.useRef)(null),
			[f, h] = (0, w.useState)(!1),
			m = n.useState("disclosureElement"),
			v = n.useState("open");
		(0, w.useEffect)(() => {
			let k = m === o.current;
			(m?.isConnected || (n?.setDisclosureElement(o.current), (k = !0)), h(v && k));
		}, [m, n, v]);
		const g = u.onClick,
			_ = ft(r),
			[b, p] = Lb(u, jN, !0),
			E = xe((k) => {
				(g?.(k), !k.defaultPrevented && (b || (_(k) && (n?.setDisclosureElement(k.currentTarget), n?.toggle()))));
			}),
			x = n.useState("contentElement");
		return (
			(u = { "aria-expanded": f, "aria-controls": x?.id, ...p, ...u, ref: Ot(o, u.ref), onClick: E }),
			(u = Qb(u)),
			u
		);
	}),
	qz = Ie(function (n) {
		return Ye(DN, Kb(n));
	}),
	LN = "button",
	Yb = Ge(function ({ store: n, ...r }) {
		const u = Io();
		return (
			(n = n || u),
			Zt(n, !1),
			(r = { "aria-haspopup": Do(n.useState("contentElement"), "dialog"), ...r }),
			(r = Kb({ store: n, ...r })),
			r
		);
	}),
	Uz = Ie(function (n) {
		return Ye(LN, Yb(n));
	}),
	qN = "div";
function Gb(e) {
	const n = e.relatedTarget;
	return n?.nodeType === Node.ELEMENT_NODE ? n : null;
}
function UN(e) {
	const n = Gb(e);
	return n ? Vt(e.currentTarget, n) : !1;
}
var Gd = Symbol("composite-hover");
function $N(e) {
	let n = Gb(e);
	if (!n) return !1;
	do {
		if (Ii(n, Gd) && n[Gd]) return !0;
		n = n.parentElement;
	} while (n);
	return !1;
}
var jh = Ge(function ({ store: n, focusOnHover: r = !0, blurOnHoverEnd: u = !!r, ...s }) {
		const o = Th();
		((n = n || o), Zt(n, !1));
		const f = wh(),
			h = s.onMouseMove,
			m = ft(r),
			v = xe((E) => {
				if ((h?.(E), !E.defaultPrevented && f() && m(E))) {
					if (!pr(E.currentTarget)) {
						const x = n?.getState().baseElement;
						x && !Wr(x) && x.focus();
					}
					n?.setActiveId(E.currentTarget.id);
				}
			}),
			g = s.onMouseLeave,
			_ = ft(u),
			b = xe((E) => {
				var x;
				(g?.(E),
					!E.defaultPrevented &&
						f() &&
						(UN(E) ||
							$N(E) ||
							(m(E) && _(E) && (n?.setActiveId(null), (x = n?.getState().baseElement) == null || x.focus()))));
			}),
			p = (0, w.useCallback)((E) => {
				E && (E[Gd] = !0);
			}, []);
		return ((s = { ...s, ref: Ot(p, s.ref), onMouseMove: v, onMouseLeave: b }), ra(s));
	}),
	$z = qo(
		Ie(function (n) {
			return Ye(qN, jh(n));
		}),
	),
	BN = "div",
	Fb = Ge(function ({ store: n, shouldRegisterItem: r = !0, getItem: u = Rb, element: s, ...o }) {
		const f = $O();
		n = n || f;
		const h = Zi(o.id),
			m = (0, w.useRef)(s);
		return (
			(0, w.useEffect)(() => {
				const v = m.current;
				if (!h || !v || !r) return;
				const g = u({ id: h, element: v });
				return n?.renderItem(g);
			}, [h, r, u, n]),
			(o = { ...o, ref: Ot(m, o.ref) }),
			ra(o)
		);
	}),
	Bz = Ie(function (n) {
		return Ye(BN, Fb(n));
	}),
	IN = Qn((e) => {
		var n = Oo();
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
				k = x[0].inst,
				D = x[1];
			return (
				f(
					function () {
						((k.value = E), (k.getSnapshot = p), v(k) && D({ inst: k }));
					},
					[b, E, p],
				),
				o(
					function () {
						return (
							v(k) && D({ inst: k }),
							b(function () {
								v(k) && D({ inst: k });
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
	VN = Qn((e, n) => {
		n.exports = IN();
	}),
	ZN = Ap(VN(), 1),
	{ useSyncExternalStore: Xb } = ZN.default,
	Jb = () => () => {};
function Bt(e, n = Rb) {
	const r = w.useCallback((s) => (e ? Mh(e, null, s) : Jb()), [e]),
		u = () => {
			const s = typeof n == "string" ? n : null,
				o = typeof n == "function" ? n : null,
				f = e?.getState();
			if (o) return o(f);
			if (f && s && Ii(f, s)) return f[s];
		};
	return Xb(r, u, u);
}
function Wb(e, n) {
	const r = w.useRef({}),
		u = w.useCallback((o) => (e ? Mh(e, null, o) : Jb()), [e]),
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
					if (!o || !Ii(o, v)) continue;
					const g = o[v];
					g !== h[m] && ((h[m] = g), (f = !0));
				}
			}
			return (f && (r.current = { ...h }), r.current);
		};
	return Xb(u, s, s);
}
function Rt(e, n, r, u) {
	const s = Ii(n, r) ? n[r] : void 0,
		o = zb({ value: s, setValue: u ? n[u] : void 0 });
	(Ke(
		() =>
			un(e, [r], (f, h) => {
				const { value: m, setValue: v } = o.current;
				v && f[r] !== h[r] && f[r] !== m && v(f[r]);
			}),
		[e, r],
	),
		Ke(() => {
			if (s !== void 0)
				return (
					e.setState(r, s),
					Eo(e, [r], () => {
						s !== void 0 && e.setState(r, s);
					})
				);
		}));
}
function Qo(e, n) {
	const [r, u] = w.useState(() => e(n));
	Ke(() => kh(r), [r]);
	const s = w.useCallback((o) => Bt(r, o), [r]);
	return [
		w.useMemo(() => ({ ...r, useState: s }), [r, s]),
		xe(() => {
			u((o) => e({ ...n, ...o.getState() }));
		}),
	];
}
var HN = "button";
function PN(e) {
	return Hd(e) ? !0 : e.tagName === "INPUT" && !br(e);
}
function QN(e, n = !1) {
	const r = e.clientHeight,
		{ top: u } = e.getBoundingClientRect(),
		s = Math.max(r * 0.875, r - 40) * 1.5,
		o = n ? r - s + u : s + u;
	return e.tagName === "HTML" ? o + e.scrollTop : o;
}
function KN(e, n = !1) {
	const { top: r } = e.getBoundingClientRect();
	return n ? r + e.clientHeight : r;
}
function X0(e, n, r, u = !1) {
	var s;
	if (!n || !r) return;
	const { renderedItems: o } = n.getState(),
		f = ph(e);
	if (!f) return;
	const h = QN(f, u);
	let m, v;
	for (let g = 0; g < o.length; g += 1) {
		const _ = m;
		if (((m = r(g)), !m)) break;
		if (m === _) continue;
		const b = (s = yr(n, m)) == null ? void 0 : s.element;
		if (!b) continue;
		const p = KN(b, u) - h,
			E = Math.abs(p);
		if ((u && p <= 0) || (!u && p >= 0)) {
			v !== void 0 && v < E && (m = _);
			break;
		}
		v = E;
	}
	return m;
}
function YN(e, n) {
	return On(e) ? !1 : hl(n, e.target);
}
var Lh = Ge(function ({
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
		const g = Th();
		n = n || g;
		const _ = Zi(v.id),
			b = (0, w.useRef)(null),
			p = (0, w.useContext)(HO),
			E = Tl(v) && !v.accessibleWhenDisabled,
			{
				rowId: x,
				baseElement: k,
				isActiveItem: D,
				ariaSetSize: C,
				ariaPosInSet: A,
				isTabbable: R,
			} = Wb(n, {
				rowId(O) {
					if (r) return r;
					if (O && p?.baseElement && p.baseElement === O.baseElement) return p.id;
				},
				baseElement(O) {
					return O?.baseElement || void 0;
				},
				isActiveItem(O) {
					return !!O && O.activeId === _;
				},
				ariaSetSize(O) {
					if (h != null) return h;
					if (O && p?.ariaSetSize && p.baseElement === O.baseElement) return p.ariaSetSize;
				},
				ariaPosInSet(O) {
					if (m != null) return m;
					if (!O || !p?.ariaPosInSet || p.baseElement !== O.baseElement) return;
					const $ = O.renderedItems.filter((H) => H.rowId === x);
					return p.ariaPosInSet + $.findIndex((H) => H.id === _);
				},
				isTabbable(O) {
					if (!O?.renderedItems.length) return !0;
					if (O.virtualFocus) return !1;
					if (o) return !0;
					if (O.activeId === null) return !1;
					const $ = n?.item(O.activeId);
					return $?.disabled || !$?.element ? !0 : O.activeId === _;
				},
			}),
			M = (0, w.useCallback)(
				(O) => {
					var $;
					const H = {
						...O,
						id: _ || O.id,
						rowId: x,
						disabled: !!E,
						children: ($ = O.element) == null ? void 0 : $.textContent,
					};
					return f ? f(H) : H;
				},
				[_, x, E, f],
			),
			Y = v.onFocus,
			P = (0, w.useRef)(!1),
			j = xe((O) => {
				if ((Y?.(O), O.defaultPrevented || Nb(O) || !_ || !n || YN(O, n))) return;
				const { virtualFocus: $, baseElement: H } = n.getState();
				(n.setActiveId(_),
					Hd(O.currentTarget) && gO(O.currentTarget),
					$ &&
						On(O) &&
						(PN(O.currentTarget) ||
							(H?.isConnected &&
								(Lo() &&
									O.currentTarget.hasAttribute("data-autofocus") &&
									O.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" }),
								(P.current = !0),
								O.relatedTarget === H || hl(n, O.relatedTarget) ? yO(H) : H.focus()))));
			}),
			q = v.onBlurCapture,
			K = xe((O) => {
				if ((q?.(O), O.defaultPrevented)) return;
				const $ = n?.getState();
				$?.virtualFocus && P.current && ((P.current = !1), O.preventDefault(), O.stopPropagation());
			}),
			B = v.onKeyDown,
			se = ft(u),
			X = ft(s),
			F = xe((O) => {
				if ((B?.(O), O.defaultPrevented || !On(O) || !n)) return;
				const { currentTarget: $ } = O,
					H = n.getState(),
					le = n.item(_),
					he = !!le?.rowId,
					Re = H.orientation !== "horizontal",
					N = H.orientation !== "vertical",
					G = () => !!(he || N || !H.baseElement || !fi(H.baseElement)),
					ie = {
						ArrowUp: (he || Re) && n.up,
						ArrowRight: (he || N) && n.next,
						ArrowDown: (he || Re) && n.down,
						ArrowLeft: (he || N) && n.previous,
						Home: () => {
							if (G()) return !he || O.ctrlKey ? n?.first() : n?.previous(-1);
						},
						End: () => {
							if (G()) return !he || O.ctrlKey ? n?.last() : n?.next(-1);
						},
						PageUp: () => X0($, n, n?.up, !0),
						PageDown: () => X0($, n, n?.down),
					}[O.key];
				if (ie) {
					if (Hd($)) {
						const ge = Pd($),
							ye = N && O.key === "ArrowLeft",
							Se = N && O.key === "ArrowRight",
							Pe = Re && O.key === "ArrowUp",
							ze = Re && O.key === "ArrowDown";
						if (Se || ze) {
							const { length: rt } = cO($);
							if (ge.end !== rt) return;
						} else if ((ye || Pe) && ge.start !== 0) return;
					}
					const oe = ie();
					if (se(O) || oe !== void 0) {
						if (!X(O)) return;
						(O.preventDefault(), n.move(oe));
					}
				}
			}),
			ae = (0, w.useMemo)(() => ({ id: _, baseElement: k }), [_, k]);
		return (
			(v = rn(v, (O) => (0, S.jsx)(ZO.Provider, { value: ae, children: O }), [ae])),
			(v = {
				id: _,
				"data-active-item": D || void 0,
				...v,
				ref: Ot(b, v.ref),
				tabIndex: R ? v.tabIndex : -1,
				onFocus: j,
				onBlurCapture: K,
				onKeyDown: F,
			}),
			(v = Dh(v)),
			(v = Fb({ store: n, ...v, getItem: M, shouldRegisterItem: _ ? v.shouldRegisterItem : !1 })),
			ra({ ...v, "aria-setsize": C, "aria-posinset": A })
		);
	}),
	Iz = qo(
		Ie(function (n) {
			return Ye(HN, Lh(n));
		}),
	),
	GN = "div";
function FN(e, n) {
	if (n != null) return e == null ? !1 : Array.isArray(e) ? e.includes(n) : e === n;
}
function XN(e) {
	var n;
	return (n = { menu: "menuitem", listbox: "option", tree: "treeitem" }[e]) != null ? n : "option";
}
var JN = Ge(function ({
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
		const b = Zb();
		((n = n || b), Zt(n, !1));
		const {
				resetValueOnSelectState: p,
				multiSelectable: E,
				selected: x,
			} = Wb(n, {
				resetValueOnSelectState: "resetValueOnSelect",
				multiSelectable(K) {
					return Array.isArray(K.selectedValue);
				},
				selected(K) {
					return FN(K.selectedValue, r);
				},
			}),
			k = (0, w.useCallback)(
				(K) => {
					const B = { ...K, value: r };
					return v ? v(B) : B;
				},
				[r, v],
			);
		((s = s ?? !E), (u = u ?? (r != null && !E)));
		const D = g.onClick,
			C = ft(s),
			A = ft(o),
			R = ft((_ = f ?? p) != null ? _ : E),
			M = ft(u),
			Y = xe((K) => {
				(D?.(K),
					!K.defaultPrevented &&
						(Mb(K) ||
							kb(K) ||
							(r != null &&
								(A(K) &&
									(R(K) && n?.resetValue(),
									n?.setSelectedValue((B) =>
										Array.isArray(B) ? (B.includes(r) ? B.filter((se) => se !== r) : [...B, r]) : r,
									)),
								C(K) && n?.setValue(r)),
							M(K) && n?.hide())));
			}),
			P = g.onKeyDown,
			j = xe((K) => {
				if ((P?.(K), K.defaultPrevented)) return;
				const B = n?.getState().baseElement;
				B &&
					(Wr(B) ||
						((K.key.length === 1 || K.key === "Backspace" || K.key === "Delete") &&
							(queueMicrotask(() => B.focus()), fi(B) && n?.setValue(B.value))));
			});
		(E && x != null && (g = { "aria-selected": x, ...g }),
			(g = rn(
				g,
				(K) =>
					(0, S.jsx)(TN.Provider, { value: r, children: (0, S.jsx)(xN.Provider, { value: x ?? !1, children: K }) }),
				[r, x],
			)),
			(g = { role: XN((0, w.useContext)(Vb)), children: r, ...g, onClick: Y, onKeyDown: j }));
		const q = ft(m);
		return (
			(g = Lh({
				store: n,
				...g,
				getItem: k,
				moveOnKeyPress: (K) => {
					if (!q(K)) return !1;
					const B = new Event("combobox-item-move");
					return (n?.getState().baseElement?.dispatchEvent(B), !0);
				},
			})),
			(g = jh({ store: n, focusOnHover: h, ...g })),
			g
		);
	}),
	WN = qo(
		Ie(function (n) {
			return Ye(GN, JN(n));
		}),
	),
	To = qp(),
	ek = "div";
function J0(e, n) {
	const r = setTimeout(n, e);
	return () => clearTimeout(r);
}
function tk(e) {
	let n = requestAnimationFrame(() => {
		n = requestAnimationFrame(e);
	});
	return () => cancelAnimationFrame(n);
}
function W0(...e) {
	return e
		.join(", ")
		.split(", ")
		.reduce((n, r) => {
			const u = r.endsWith("ms") ? 1 : 1e3,
				s = Number.parseFloat(r || "0s") * u;
			return s > n ? s : n;
		}, 0);
}
function Ko(e, n, r) {
	return !r && n !== !1 && (!e || !!n);
}
var qh = Ge(function ({ store: n, alwaysVisible: r, ...u }) {
		const s = Rh();
		((n = n || s), Zt(n, !1));
		const o = (0, w.useRef)(null),
			f = Zi(u.id),
			[h, m] = (0, w.useState)(null),
			v = n.useState("open"),
			g = n.useState("mounted"),
			_ = n.useState("animated"),
			b = n.useState("contentElement"),
			p = Bt(n.disclosure, "contentElement");
		(Ke(() => {
			o.current && n?.setContentElement(o.current);
		}, [n]),
			Ke(() => {
				let D;
				return (
					n?.setState("animated", (C) => ((D = C), !0)),
					() => {
						D !== void 0 && n?.setState("animated", D);
					}
				);
			}, [n]),
			Ke(() => {
				if (_) {
					if (!b?.isConnected) {
						m(null);
						return;
					}
					return tk(() => {
						m(v ? "enter" : g ? "leave" : null);
					});
				}
			}, [_, b, v, g]),
			Ke(() => {
				if (!n || !_ || !h || !b) return;
				const D = () => n?.setState("animating", !1),
					C = () => (0, To.flushSync)(D);
				if ((h === "leave" && v) || (h === "enter" && !v)) return;
				if (typeof _ == "number") return J0(_, C);
				const {
						transitionDuration: A,
						animationDuration: R,
						transitionDelay: M,
						animationDelay: Y,
					} = getComputedStyle(b),
					{
						transitionDuration: P = "0",
						animationDuration: j = "0",
						transitionDelay: q = "0",
						animationDelay: K = "0",
					} = p ? getComputedStyle(p) : {},
					B = W0(M, Y, q, K) + W0(A, R, P, j);
				if (!B) {
					(h === "enter" && n.setState("animated", !1), D());
					return;
				}
				return J0(Math.max(B - 1e3 / 60, 0), C);
			}, [n, _, b, p, v, h]),
			(u = rn(u, (D) => (0, S.jsx)(Oh, { value: n, children: D }), [n])));
		const E = Ko(g, u.hidden, r),
			x = u.style,
			k = (0, w.useMemo)(() => (E ? { ...x, display: "none" } : x), [E, x]);
		return (
			(u = {
				id: f,
				"data-open": v || void 0,
				"data-enter": h === "enter" || void 0,
				"data-leave": h === "leave" || void 0,
				hidden: E,
				...u,
				ref: Ot(f ? n.setContentElement : null, o, u.ref),
				style: k,
			}),
			ra(u)
		);
	}),
	nk = Ie(function (n) {
		return Ye(ek, qh(n));
	}),
	Vz = Ie(function ({ unmountOnHide: n, ...r }) {
		const u = Rh();
		return Bt(r.store || u, (s) => !n || s?.mounted) === !1 ? null : (0, S.jsx)(nk, { ...r });
	}),
	ik = "div",
	eS = Ge(function ({ store: n, alwaysVisible: r, ...u }) {
		const s = Zb(!0),
			o = wN();
		n = n || o;
		const f = !!n && n === s;
		Zt(n, !1);
		const h = (0, w.useRef)(null),
			m = Zi(u.id),
			v = n.useState("mounted"),
			g = Ko(v, u.hidden, r),
			_ = g ? { ...u.style, display: "none" } : u.style,
			b = n.useState((A) => Array.isArray(A.selectedValue)),
			p = zO(h, "role", u.role),
			E = ((p === "listbox" || p === "tree" || p === "grid") && b) || void 0,
			[x, k] = (0, w.useState)(!1),
			D = n.useState("contentElement");
		(Ke(() => {
			if (!v) return;
			const A = h.current;
			if (!A || D !== A) return;
			const R = () => {
					k(!!A.querySelector("[role='listbox']"));
				},
				M = new MutationObserver(R);
			return (M.observe(A, { subtree: !0, childList: !0, attributeFilter: ["role"] }), R(), () => M.disconnect());
		}, [v, D]),
			x || (u = { role: "listbox", "aria-multiselectable": E, ...u }),
			(u = rn(u, (A) => (0, S.jsx)(EN, { value: n, children: (0, S.jsx)(Vb.Provider, { value: p, children: A }) }), [
				n,
				p,
			])));
		const C = m && (!s || !f) ? n.setContentElement : null;
		return ((u = { id: m, hidden: g, ...u, ref: Ot(C, h, u.ref), style: _ }), ra(u));
	}),
	Zz = Ie(function (n) {
		return Ye(ik, eS(n));
	}),
	ep = (0, w.createContext)(null),
	rk = "span",
	tS = Ge(function (n) {
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
	Hz = Ie(function (n) {
		return Ye(rk, tS(n));
	}),
	ak = "span",
	uk = Ge(function (n) {
		return (
			(n = {
				"data-focus-trap": "",
				tabIndex: 0,
				"aria-hidden": !0,
				...n,
				style: { position: "fixed", top: 0, left: 0, ...n.style },
			}),
			(n = tS(n)),
			n
		);
	}),
	ro = Ie(function (n) {
		return Ye(ak, uk(n));
	}),
	lk = "div";
function sk(e) {
	return ot(e).body;
}
function ok(e, n) {
	return n ? (typeof n == "function" ? n(e) : n) : ot(e).createElement("div");
}
function ck(e = "id") {
	return `${e ? `${e}-` : ""}${Math.random().toString(36).slice(2, 8)}`;
}
function vr(e) {
	queueMicrotask(() => {
		e?.focus();
	});
}
var nS = Ge(function ({
		preserveTabOrder: n,
		preserveTabOrderAnchor: r,
		portalElement: u,
		portalRef: s,
		portal: o = !0,
		...f
	}) {
		const h = (0, w.useRef)(null),
			m = Ot(h, f.ref),
			v = (0, w.useContext)(ep),
			[g, _] = (0, w.useState)(null),
			[b, p] = (0, w.useState)(null),
			E = (0, w.useRef)(null),
			x = (0, w.useRef)(null),
			k = (0, w.useRef)(null),
			D = (0, w.useRef)(null);
		return (
			Ke(() => {
				const C = h.current;
				if (!C || !o) {
					_(null);
					return;
				}
				const A = ok(C, u);
				if (!A) {
					_(null);
					return;
				}
				const R = A.isConnected;
				if ((R || (v || sk(C)).appendChild(A), A.id || (A.id = C.id ? `portal/${C.id}` : ck()), _(A), Kd(s, A), !R))
					return () => {
						(A.remove(), Kd(s, null));
					};
			}, [o, u, v, s]),
			Ke(() => {
				if (!o || !n || !r) return;
				const C = ot(r).createElement("span");
				return (
					(C.style.position = "fixed"),
					r.insertAdjacentElement("afterend", C),
					p(C),
					() => {
						(C.remove(), p(null));
					}
				);
			}, [o, n, r]),
			(0, w.useEffect)(() => {
				if (!g || !n) return;
				let C = 0;
				const A = (R) => {
					if (!Kr(R)) return;
					const M = R.type === "focusin";
					if ((cancelAnimationFrame(C), M)) return JO(g);
					C = requestAnimationFrame(() => {
						XO(g, !0);
					});
				};
				return (
					g.addEventListener("focusin", A, !0),
					g.addEventListener("focusout", A, !0),
					() => {
						(cancelAnimationFrame(C),
							g.removeEventListener("focusin", A, !0),
							g.removeEventListener("focusout", A, !0));
					}
				);
			}, [g, n]),
			(f = rn(
				f,
				(C) => {
					if (((C = (0, S.jsx)(ep.Provider, { value: g || v, children: C })), !o)) return C;
					if (!g) return (0, S.jsx)("span", { ref: m, id: f.id, style: { position: "fixed" }, hidden: !0 });
					((C = (0, S.jsxs)(S.Fragment, {
						children: [
							n &&
								g &&
								(0, S.jsx)(ro, {
									ref: x,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-before",
									onFocus: (R) => {
										Kr(R, g) ? vr(_d()) : vr(E.current);
									},
								}),
							C,
							n &&
								g &&
								(0, S.jsx)(ro, {
									ref: k,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-after",
									onFocus: (R) => {
										Kr(R, g) ? vr(V0()) : vr(D.current);
									},
								}),
						],
					})),
						g && (C = (0, To.createPortal)(C, g)));
					let A = (0, S.jsxs)(S.Fragment, {
						children: [
							n &&
								g &&
								(0, S.jsx)(ro, {
									ref: E,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-before",
									onFocus: (R) => {
										R.relatedTarget !== D.current && Kr(R, g) ? vr(x.current) : vr(V0());
									},
								}),
							n && (0, S.jsx)("span", { "aria-owns": g?.id, style: { position: "fixed" } }),
							n &&
								g &&
								(0, S.jsx)(ro, {
									ref: D,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-after",
									onFocus: (R) => {
										if (Kr(R, g)) vr(k.current);
										else {
											const M = _d();
											if (M === x.current) {
												requestAnimationFrame(() => {
													var Y;
													return (Y = _d()) == null ? void 0 : Y.focus();
												});
												return;
											}
											vr(M);
										}
									},
								}),
						],
					});
					return (b && n && (A = (0, To.createPortal)(A, b)), (0, S.jsxs)(S.Fragment, { children: [A, C] }));
				},
				[g, v, o, f.id, n, b],
			)),
			(f = { ...f, ref: m }),
			f
		);
	}),
	Pz = Ie(function (n) {
		return Ye(lk, nS(n));
	}),
	tp = (0, w.createContext)(0);
function fk({ level: e, children: n }) {
	const r = (0, w.useContext)(tp),
		u = Math.max(Math.min(e || r + 1, 6), 1);
	return (0, S.jsx)(tp.Provider, { value: u, children: n });
}
var dk = "div",
	iS = Ge(function ({ autoFocusOnShow: n = !0, ...r }) {
		return ((r = rn(r, (u) => (0, S.jsx)(qb.Provider, { value: n, children: u }), [n])), r);
	}),
	Qz = Ie(function (n) {
		return Ye(dk, iS(n));
	});
function hk(e, n) {
	const r = ot(e).createElement("button");
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
function mk(e) {
	const n = (0, w.useRef)();
	return (
		(0, w.useEffect)(() => {
			if (!e) {
				n.current = null;
				return;
			}
			return nn(
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
var Ed = new WeakMap();
function zl(e, n, r) {
	Ed.has(e) || Ed.set(e, new Map());
	const u = Ed.get(e),
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
function Uh(e, n, r) {
	return zl(e, n, () => {
		const s = e.getAttribute(n);
		return (
			e.setAttribute(n, r),
			() => {
				s == null ? e.removeAttribute(n) : e.setAttribute(n, s);
			}
		);
	});
}
function ea(e, n, r) {
	return zl(e, n, () => {
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
function Fd(e, n) {
	return e
		? zl(e, "style", () => {
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
function vk(e, n, r) {
	return e
		? zl(e, n, () => {
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
var gk = ["SCRIPT", "STYLE"];
function Xd(e) {
	return `__ariakit-dialog-snapshot-${e}`;
}
function yk(e, n) {
	const r = ot(n),
		u = Xd(e);
	if (!r.body[u]) return !0;
	do {
		if (n === r.body) return !1;
		if (n[u]) return !0;
		if (!n.parentElement) return !1;
		n = n.parentElement;
	} while (!0);
}
function pk(e, n, r) {
	return gk.includes(n.tagName) || !yk(e, n) ? !1 : !r.some((u) => u && Vt(n, u));
}
function $h(e, n, r, u) {
	for (let s of n) {
		if (!s?.isConnected) continue;
		const o = n.some((m) => (!m || m === s ? !1 : m.contains(s))),
			f = ot(s),
			h = s;
		for (; s.parentElement && s !== f.body; ) {
			if ((u?.(s.parentElement, h), !o)) for (const m of s.parentElement.children) pk(e, m, n) && r(m, h);
			s = s.parentElement;
		}
	}
}
function bk(e, n) {
	const { body: r } = ot(n[0]),
		u = [];
	return (
		$h(e, n, (o) => {
			u.push(ea(o, Xd(e), !0));
		}),
		Sn(ea(r, Xd(e), !0), () => {
			for (const o of u) o();
		})
	);
}
function rS(e, ...n) {
	if (!e) return !1;
	const r = e.getAttribute("data-backdrop");
	return r == null ? !1 : r === "" || r === "true" || !n.length ? !0 : n.some((u) => r === u);
}
function ou(e = "", n = !1) {
	return `__ariakit-dialog-${n ? "ancestor" : "outside"}${e ? `-${e}` : ""}`;
}
function Sk(e, n = "") {
	return Sn(ea(e, ou(), !0), ea(e, ou(n), !0));
}
function aS(e, n = "") {
	return Sn(ea(e, ou("", !0), !0), ea(e, ou(n, !0), !0));
}
function Bh(e, n) {
	const r = ou(n, !0);
	if (e[r]) return !0;
	const u = ou(n);
	do {
		if (e[u]) return !0;
		if (!e.parentElement) return !1;
		e = e.parentElement;
	} while (!0);
}
function np(e, n) {
	const r = [],
		u = n.map((o) => o?.id);
	return (
		$h(
			e,
			n,
			(o) => {
				rS(o, ...u) || r.unshift(Sk(o, e));
			},
			(o, f) => {
				(f.hasAttribute("data-dialog") && f.id !== e) || r.unshift(aS(o, e));
			},
		),
		() => {
			for (const o of r) o();
		}
	);
}
function _k(e) {
	return e.tagName === "HTML" ? !0 : Vt(ot(e).body, e);
}
function wk(e, n) {
	if (!e) return !1;
	if (Vt(e, n)) return !0;
	const r = n.getAttribute("aria-activedescendant");
	if (r) {
		const u = ot(e).getElementById(r);
		if (u) return Vt(e, u);
	}
	return !1;
}
function Ek(e, n) {
	if (!("clientY" in e)) return !1;
	const r = n.getBoundingClientRect();
	return r.width === 0 || r.height === 0
		? !1
		: r.top <= e.clientY && e.clientY <= r.top + r.height && r.left <= e.clientX && e.clientX <= r.left + r.width;
}
function Td({ store: e, type: n, listener: r, capture: u, domReady: s }) {
	const o = xe(r),
		f = Bt(e, "open"),
		h = (0, w.useRef)(!1);
	(Ke(() => {
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
					? nn(
							n,
							(v) => {
								const { contentElement: g, disclosureElement: _ } = e.getState(),
									b = v.target;
								g &&
									b &&
									_k(b) &&
									(Vt(g, b) ||
										wk(_, b) ||
										b.hasAttribute("data-focus-trap") ||
										Ek(v, g) ||
										(h.current && !Bh(b, g.id)) ||
										nN(b) ||
										o(v));
							},
							u,
						)
					: void 0,
			[f, u],
		));
}
function xd(e, n) {
	return typeof e == "function" ? e(n) : !!e;
}
function Tk(e, n, r) {
	const u = mk(Bt(e, "open")),
		s = { store: e, domReady: r, capture: !0 };
	(Td({
		...s,
		type: "click",
		listener: (o) => {
			const { contentElement: f } = e.getState(),
				h = u.current;
			h && Eb(h) && Bh(h, f?.id) && xd(n, o) && e.hide();
		},
	}),
		Td({
			...s,
			type: "focusin",
			listener: (o) => {
				const { contentElement: f } = e.getState();
				f && o.target !== ot(f) && xd(n, o) && e.hide();
			},
		}),
		Td({
			...s,
			type: "contextmenu",
			listener: (o) => {
				xd(n, o) && e.hide();
			},
		}));
}
var ip = (0, w.createContext)({});
function xk(e) {
	const n = (0, w.useContext)(ip),
		[r, u] = (0, w.useState)([]),
		s = (0, w.useCallback)(
			(f) => {
				var h;
				return (
					u((m) => [...m, f]),
					Sn((h = n.add) == null ? void 0 : h.call(n, f), () => {
						u((m) => m.filter((v) => v !== f));
					})
				);
			},
			[n],
		);
	Ke(
		() =>
			un(e, ["open", "contentElement"], (f) => {
				var h;
				if (f.open && f.contentElement) return (h = n.add) == null ? void 0 : h.call(n, e);
			}),
		[e, n],
	);
	const o = (0, w.useMemo)(() => ({ store: e, add: s }), [e, s]);
	return {
		wrapElement: (0, w.useCallback)((f) => (0, S.jsx)(ip.Provider, { value: o, children: f }), [o]),
		nestedDialogs: r,
	};
}
function Ak({ attribute: e, contentId: n, contentElement: r, enabled: u }) {
	const [s, o] = jb(),
		f = (0, w.useCallback)(() => {
			if (!u || !r) return !1;
			const { body: h } = ot(r),
				m = h.getAttribute(e);
			return !m || m === n;
		}, [s, u, r, e, n]);
	return (
		(0, w.useEffect)(() => {
			if (!u || !n || !r) return;
			const { body: h } = ot(r);
			if (f()) return (h.setAttribute(e, n), () => h.removeAttribute(e));
			const m = new MutationObserver(() => (0, To.flushSync)(o));
			return (m.observe(h, { attributeFilter: [e] }), () => m.disconnect());
		}, [s, u, n, r, f, e]),
		f
	);
}
function Ck(e) {
	const n = e.getBoundingClientRect().left;
	return Math.round(n) + e.scrollLeft ? "paddingLeft" : "paddingRight";
}
function Rk(e, n, r) {
	const u = Ak({ attribute: "data-dialog-prevent-body-scroll", contentElement: e, contentId: n, enabled: r });
	(0, w.useEffect)(() => {
		if (!u() || !e) return;
		const s = ot(e),
			o = wb(e),
			{ documentElement: f, body: h } = s,
			m = f.style.getPropertyValue("--scrollbar-width"),
			v = m ? Number.parseInt(m, 10) : o.innerWidth - f.clientWidth,
			g = () => vk(f, "--scrollbar-width", `${v}px`),
			_ = Ck(f),
			b = () => Fd(h, { overflow: "hidden", [_]: `${v}px` }),
			p = () => {
				var x, k;
				const { scrollX: D, scrollY: C, visualViewport: A } = o,
					R = (x = A?.offsetLeft) != null ? x : 0,
					M = (k = A?.offsetTop) != null ? k : 0,
					Y = Fd(h, {
						position: "fixed",
						overflow: "hidden",
						top: `${-(C - Math.floor(M))}px`,
						left: `${-(D - Math.floor(R))}px`,
						right: "0",
						[_]: `${v}px`,
					});
				return () => {
					(Y(), o.scrollTo({ left: D, top: C, behavior: "instant" }));
				};
			},
			E = bh() && !RO();
		return Sn(g(), E ? p() : b());
	}, [u, e]);
}
function Ok(e, ...n) {
	if (!e) return !1;
	const r = e.getAttribute("data-focus-trap");
	return r == null ? !1 : n.length ? (r === "" ? !1 : n.some((u) => r === u)) : !0;
}
function uS() {
	return "inert" in HTMLElement.prototype;
}
function Nk(e) {
	return Uh(e, "aria-hidden", "true");
}
function lS(e, n) {
	return "style" in e
		? uS()
			? ea(e, "inert", !0)
			: Sn(
					...Bo(e, !0).map((r) => {
						if (n?.some((s) => s && Vt(s, r))) return ml;
						const u = zl(
							r,
							"focus",
							() => (
								(r.focus = ml),
								() => {
									delete r.focus;
								}
							),
						);
						return Sn(Uh(r, "tabindex", "-1"), u);
					}),
					Nk(e),
					Fd(e, { pointerEvents: "none", userSelect: "none", cursor: "default" }),
				)
		: ml;
}
function kk(e, n) {
	const r = [],
		u = n.map((o) => o?.id);
	return (
		$h(
			e,
			n,
			(o) => {
				rS(o, ...u) || Ok(o, ...u) || r.unshift(lS(o, n));
			},
			(o) => {
				o.hasAttribute("role") && (n.some((f) => f && Vt(f, o)) || r.unshift(Uh(o, "role", "none")));
			},
		),
		() => {
			for (const o of r) o();
		}
	);
}
function sS(e = {}) {
	const n = Po(e.store, zh(e.disclosure, ["contentElement", "disclosureElement"]));
	const r = n?.getState(),
		u = Ce(e.open, r?.open, e.defaultOpen, !1),
		s = Ce(e.animated, r?.animated, !1),
		o = ei(
			{
				open: u,
				animated: s,
				animating: !!s && u,
				mounted: u,
				contentElement: Ce(r?.contentElement, null),
				disclosureElement: Ce(r?.disclosureElement, null),
			},
			n,
		);
	return (
		on(o, () =>
			un(o, ["animated", "animating"], (f) => {
				f.animated || o.setState("animating", !1);
			}),
		),
		on(o, () =>
			Mh(o, ["open"], () => {
				o.getState().animated && o.setState("animating", !0);
			}),
		),
		on(o, () =>
			un(o, ["open", "animating"], (f) => {
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
function oS(e, n, r) {
	return (
		du(n, [r.store, r.disclosure]),
		Rt(e, r, "open", "setOpen"),
		Rt(e, r, "mounted", "setMounted"),
		Rt(e, r, "animated"),
		Object.assign(e, { disclosure: r.disclosure })
	);
}
function Mk(e = {}) {
	const [n, r] = Qo(sS, e);
	return oS(n, r, e);
}
var zk = "div",
	Dk = [
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
	Kz = Ge(function (n) {
		return n;
	}),
	xo = Ie(function (n) {
		return Ye(zk, n);
	});
Object.assign(
	xo,
	Dk.reduce(
		(e, n) => (
			(e[n] = Ie(function (u) {
				return Ye(n, u);
			})),
			e
		),
		{},
	),
);
function jk({ store: e, backdrop: n, alwaysVisible: r, hidden: u }) {
	const s = (0, w.useRef)(null),
		o = Mk({ disclosure: e }),
		f = Bt(e, "contentElement");
	((0, w.useEffect)(() => {
		const v = s.current,
			g = f;
		v && g && (v.style.zIndex = getComputedStyle(g).zIndex);
	}, [f]),
		Ke(() => {
			const v = f?.id;
			if (!v) return;
			const g = s.current;
			if (g) return aS(g, v);
		}, [f]));
	const h = qh({
		ref: s,
		store: o,
		role: "presentation",
		"data-backdrop": f?.id || "",
		alwaysVisible: r,
		hidden: u ?? void 0,
		style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 },
	});
	if (!n) return null;
	if ((0, w.isValidElement)(n)) return (0, S.jsx)(xo, { ...h, render: n });
	const m = typeof n != "boolean" ? n : "div";
	return (0, S.jsx)(xo, { ...h, render: (0, S.jsx)(m, {}) });
}
function cS(e = {}) {
	return sS(e);
}
function fS(e, n, r) {
	return oS(e, n, r);
}
function Lk(e = {}) {
	const [n, r] = Qo(cS, e);
	return fS(n, r, e);
}
var qk = "div",
	rp = Lo();
function Uk(e) {
	const n = Vi();
	return !n || (e && Vt(e, n)) ? !1 : !!Wn(n);
}
function ap(e, n = !1) {
	if (!e) return null;
	const r = "current" in e ? e.current : e;
	return r ? (n ? (Wn(r) ? r : null) : r) : null;
}
var dS = Ge(function ({
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
	unmountOnHide: k,
	unstable_treeSnapshotKey: D,
	...C
}) {
	const A = Io(),
		R = (0, w.useRef)(null),
		M = Lk({
			store: n || A,
			open: r,
			setOpen(fe) {
				if (fe) return;
				const Ee = R.current;
				if (!Ee) return;
				const Be = new Event("close", { bubbles: !1, cancelable: !0 });
				(u && Ee.addEventListener("close", u, { once: !0 }),
					Ee.dispatchEvent(Be),
					Be.defaultPrevented && M.setOpen(!0));
			},
		}),
		{ portalRef: Y, domReady: P } = _h(f, C.portalRef),
		j = C.preserveTabOrder,
		q = Bt(M, (fe) => j && !o && fe.mounted),
		K = Zi(C.id),
		B = Bt(M, "open"),
		se = Bt(M, "mounted"),
		X = Bt(M, "contentElement"),
		F = Ko(se, C.hidden, C.alwaysVisible);
	(Rk(X, K, _ && !F), Tk(M, v, P));
	const { wrapElement: ae, nestedDialogs: O } = xk(M);
	((C = rn(C, ae, [ae])),
		Ke(() => {
			if (!B) return;
			const fe = R.current,
				Ee = Vi(fe, !0);
			Ee && Ee.tagName !== "BODY" && ((fe && Vt(fe, Ee)) || M.setDisclosureElement(Ee));
		}, [M, B]),
		rp &&
			(0, w.useEffect)(() => {
				if (!se) return;
				const { disclosureElement: fe } = M.getState();
				if (!fe || !br(fe)) return;
				const Ee = () => {
					let Be = !1;
					const Le = () => {
						Be = !0;
					};
					(fe.addEventListener("focusin", Le, { capture: !0, once: !0 }),
						tu(fe, "mouseup", () => {
							(fe.removeEventListener("focusin", Le, !0), !Be && Ub(fe));
						}));
				};
				return (
					fe.addEventListener("mousedown", Ee),
					() => {
						fe.removeEventListener("mousedown", Ee);
					}
				);
			}, [M, se]),
		(0, w.useEffect)(() => {
			if (!se || !P) return;
			const fe = R.current;
			if (!fe) return;
			const Ee = wb(fe),
				Be = Ee.visualViewport || Ee,
				Le = () => {
					var Et, at;
					const ue = (at = (Et = Ee.visualViewport) == null ? void 0 : Et.height) != null ? at : Ee.innerHeight;
					fe.style.setProperty("--dialog-viewport-height", `${ue}px`);
				};
			return (
				Le(),
				Be.addEventListener("resize", Le),
				() => {
					Be.removeEventListener("resize", Le);
				}
			);
		}, [se, P]),
		(0, w.useEffect)(() => {
			if (!o || !se || !P) return;
			const fe = R.current;
			if (fe && !fe.querySelector("[data-dialog-dismiss]")) return hk(fe, M.hide);
		}, [M, o, se, P]),
		Ke(() => {
			if (!uS() || B || !se || !P) return;
			const fe = R.current;
			if (fe) return lS(fe);
		}, [B, se, P]));
	const $ = B && P;
	Ke(() => {
		if (!K || !$) return;
		const fe = R.current;
		return bk(K, [fe]);
	}, [K, $, D]);
	const H = xe(g);
	Ke(() => {
		if (!K || !$) return;
		const { disclosureElement: fe } = M.getState(),
			Ee = [R.current, ...(H() || []), ...O.map((Be) => Be.getState().contentElement)];
		return o ? Sn(np(K, Ee), kk(K, Ee)) : np(K, [fe, ...Ee]);
	}, [K, M, $, H, O, o, D]);
	const le = !!b,
		he = ft(b),
		[Re, N] = (0, w.useState)(!1);
	(0, w.useEffect)(() => {
		if (!B || !le || !P || !X?.isConnected) return;
		const fe = ap(E, !0) || X.querySelector("[data-autofocus=true],[autofocus]") || QO(X, !0, f && q) || X,
			Ee = Wn(fe);
		he(Ee ? fe : null) &&
			(N(!0),
			queueMicrotask(() => {
				(fe.focus(), rp && Ee && fe.scrollIntoView({ block: "nearest", inline: "nearest" }));
			}));
	}, [B, le, P, X, E, f, q, he]);
	const G = !!p,
		ie = ft(p),
		[oe, ge] = (0, w.useState)(!1);
	(0, w.useEffect)(() => {
		if (B) return (ge(!0), () => ge(!1));
	}, [B]);
	const ye = (0, w.useCallback)(
			(fe, Ee = !0) => {
				const { disclosureElement: Be } = M.getState();
				if (Uk(fe)) return;
				let Le = ap(x) || Be;
				if (Le?.id) {
					const at = ot(Le),
						ue = `[aria-activedescendant="${Le.id}"]`,
						Oe = at.querySelector(ue);
					Oe && (Le = Oe);
				}
				if (Le && !Wn(Le)) {
					const at = Le.closest("[data-dialog]");
					if (at?.id) {
						const ue = ot(at),
							Oe = `[aria-controls~="${at.id}"]`,
							ht = ue.querySelector(Oe);
						ht && (Le = ht);
					}
				}
				const Et = Le && Wn(Le);
				if (!Et && Ee) {
					requestAnimationFrame(() => ye(fe, !1));
					return;
				}
				ie(Et ? Le : null) && Et && Le?.focus({ preventScroll: !0 });
			},
			[M, x, ie],
		),
		Se = (0, w.useRef)(!1);
	(Ke(() => {
		if (B || !oe || !G) return;
		const fe = R.current;
		((Se.current = !0), ye(fe));
	}, [B, oe, P, G, ye]),
		(0, w.useEffect)(() => {
			if (!oe || !G) return;
			const fe = R.current;
			return () => {
				if (Se.current) {
					Se.current = !1;
					return;
				}
				ye(fe);
			};
		}, [oe, G, ye]));
	const Pe = ft(m);
	((0, w.useEffect)(
		() =>
			!P || !se
				? void 0
				: nn(
						"keydown",
						(Ee) => {
							if (Ee.key !== "Escape" || Ee.defaultPrevented) return;
							const Be = R.current;
							if (!Be || Bh(Be)) return;
							const Le = Ee.target;
							if (!Le) return;
							const { disclosureElement: Et } = M.getState();
							!!(Le.tagName === "BODY" || Vt(Be, Le) || !Et || Vt(Et, Le)) && Pe(Ee) && M.hide();
						},
						!0,
					),
		[M, P, se, Pe],
	),
		(C = rn(C, (fe) => (0, S.jsx)(fk, { level: o ? 1 : void 0, children: fe }), [o])));
	const ze = C.hidden,
		rt = C.alwaysVisible;
	C = rn(
		C,
		(fe) =>
			h
				? (0, S.jsxs)(S.Fragment, {
						children: [(0, S.jsx)(jk, { store: M, backdrop: h, hidden: ze, alwaysVisible: rt }), fe],
					})
				: fe,
		[M, h, ze, rt],
	);
	const [Nt, Ht] = (0, w.useState)(),
		[Qt, it] = (0, w.useState)();
	return (
		(C = rn(
			C,
			(fe) =>
				(0, S.jsx)(Oh, {
					value: M,
					children: (0, S.jsx)(bN.Provider, {
						value: Ht,
						children: (0, S.jsx)(SN.Provider, { value: it, children: fe }),
					}),
				}),
			[M],
		)),
		(C = {
			id: K,
			"data-dialog": "",
			role: "dialog",
			tabIndex: s ? -1 : void 0,
			"aria-labelledby": Nt,
			"aria-describedby": Qt,
			...C,
			ref: Ot(R, C.ref),
		}),
		(C = iS({ ...C, autoFocusOnShow: Re })),
		(C = qh({ store: M, ...C })),
		(C = Rl({ ...C, focusable: s })),
		(C = nS({ portal: f, ...C, portalRef: Y, preserveTabOrder: q })),
		C
	);
});
function Dl(e, n = Io) {
	return Ie(function (u) {
		const s = n();
		return Bt(u.store || s, (o) => !u.unmountOnHide || o?.mounted || !!u.open) ? (0, S.jsx)(e, { ...u }) : null;
	});
}
var Yz = Dl(
		Ie(function (n) {
			return Ye(qk, dS(n));
		}),
		Io,
	),
	Sr = Math.min,
	qi = Math.max,
	Ao = Math.round,
	ao = Math.floor,
	Ui = (e) => ({ x: e, y: e }),
	$k = { left: "right", right: "left", bottom: "top", top: "bottom" };
function hS(e, n, r) {
	return qi(e, Sr(n, r));
}
function _r(e, n) {
	return typeof e == "function" ? e(n) : e;
}
function wr(e) {
	return e.split("-")[0];
}
function hu(e) {
	return e.split("-")[1];
}
function Ih(e) {
	return e === "x" ? "y" : "x";
}
function Vh(e) {
	return e === "y" ? "height" : "width";
}
function si(e) {
	const n = e[0];
	return n === "t" || n === "b" ? "y" : "x";
}
function Zh(e) {
	return Ih(si(e));
}
function Bk(e, n, r) {
	r === void 0 && (r = !1);
	const u = hu(e),
		s = Zh(e),
		o = Vh(s);
	let f = s === "x" ? (u === (r ? "end" : "start") ? "right" : "left") : u === "start" ? "bottom" : "top";
	return (n.reference[o] > n.floating[o] && (f = Co(f)), [f, Co(f)]);
}
function Ik(e) {
	const n = Co(e);
	return [Jd(e), n, Jd(n)];
}
function Jd(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var up = ["left", "right"],
	lp = ["right", "left"],
	Vk = ["top", "bottom"],
	Zk = ["bottom", "top"];
function Hk(e, n, r) {
	switch (e) {
		case "top":
		case "bottom":
			return r ? (n ? lp : up) : n ? up : lp;
		case "left":
		case "right":
			return n ? Vk : Zk;
		default:
			return [];
	}
}
function Pk(e, n, r, u) {
	const s = hu(e);
	let o = Hk(wr(e), r === "start", u);
	return (s && ((o = o.map((f) => f + "-" + s)), n && (o = o.concat(o.map(Jd)))), o);
}
function Co(e) {
	const n = wr(e);
	return $k[n] + e.slice(n.length);
}
function Qk(e) {
	var n, r, u, s;
	return {
		top: (n = e.top) != null ? n : 0,
		right: (r = e.right) != null ? r : 0,
		bottom: (u = e.bottom) != null ? u : 0,
		left: (s = e.left) != null ? s : 0,
	};
}
function mS(e) {
	return typeof e != "number" ? Qk(e) : { top: e, right: e, bottom: e, left: e };
}
function Ro(e) {
	const { x: n, y: r, width: u, height: s } = e;
	return { width: u, height: s, top: r, left: n, right: n + u, bottom: r + s, x: n, y: r };
}
function sp(e, n, r) {
	let { reference: u, floating: s } = e;
	const o = si(n),
		f = Zh(n),
		h = Vh(f),
		m = wr(n),
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
	const E = hu(n);
	return (E && (p[f] += b * (E === "end" ? 1 : -1) * (r && v ? -1 : 1)), p);
}
async function Kk(e, n) {
	var r;
	n === void 0 && (n = {});
	const { x: u, y: s, platform: o, rects: f, elements: h, strategy: m } = e,
		{
			boundary: v = "clippingAncestors",
			rootBoundary: g = "viewport",
			elementContext: _ = "floating",
			altBoundary: b = !1,
			padding: p = 0,
		} = _r(n, e),
		E = mS(p),
		x = h[b ? (_ === "floating" ? "reference" : "floating") : _],
		k = Ro(
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
		D = _ === "floating" ? { x: u, y: s, width: f.floating.width, height: f.floating.height } : f.reference,
		C = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(h.floating)),
		A = ((await (o.isElement == null ? void 0 : o.isElement(C))) &&
			(await (o.getScale == null ? void 0 : o.getScale(C)))) || { x: 1, y: 1 },
		R = Ro(
			o.convertOffsetParentRelativeRectToViewportRelativeRect
				? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
						elements: h,
						rect: D,
						offsetParent: C,
						strategy: m,
					})
				: D,
		);
	return {
		top: (k.top - R.top + E.top) / A.y,
		bottom: (R.bottom - k.bottom + E.bottom) / A.y,
		left: (k.left - R.left + E.left) / A.x,
		right: (R.right - k.right + E.right) / A.x,
	};
}
var Yk = 50,
	Gk = async (e, n, r) => {
		const { placement: u = "bottom", strategy: s = "absolute", middleware: o = [], platform: f } = r,
			h = f.detectOverflow ? f : { ...f, detectOverflow: Kk },
			m = await (f.isRTL == null ? void 0 : f.isRTL(n));
		let v = await f.getElementRects({ reference: e, floating: n, strategy: s }),
			{ x: g, y: _ } = sp(v, u, m),
			b = u,
			p = 0;
		const E = {};
		for (let x = 0; x < o.length; x++) {
			const k = o[x];
			if (!k) continue;
			const { name: D, fn: C } = k,
				{
					x: A,
					y: R,
					data: M,
					reset: Y,
				} = await C({
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
				(_ = R ?? _),
				(E[D] = { ...E[D], ...M }),
				Y &&
					p < Yk &&
					(p++,
					typeof Y == "object" &&
						(Y.placement && (b = Y.placement),
						Y.rects &&
							(v = Y.rects === !0 ? await f.getElementRects({ reference: e, floating: n, strategy: s }) : Y.rects),
						({ x: g, y: _ } = sp(v, b, m))),
					(x = -1)));
		}
		return { x: g, y: _, placement: b, strategy: s, middlewareData: E };
	},
	Fk = (e) => ({
		name: "arrow",
		options: e,
		async fn(n) {
			const { x: r, y: u, placement: s, rects: o, platform: f, elements: h, middlewareData: m } = n,
				{ element: v, padding: g = 0 } = _r(e, n) || {};
			if (v == null) return {};
			const _ = mS(g),
				b = { x: r, y: u },
				p = Zh(s),
				E = Vh(p),
				x = await f.getDimensions(v),
				k = p === "y",
				D = k ? "top" : "left",
				C = k ? "bottom" : "right",
				A = k ? "clientHeight" : "clientWidth",
				R = o.reference[E] + o.reference[p] - b[p] - o.floating[E],
				M = b[p] - o.reference[p],
				Y = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(v));
			let P = Y ? Y[A] : 0;
			(!P || !(await (f.isElement == null ? void 0 : f.isElement(Y)))) && (P = h.floating[A] || o.floating[E]);
			const j = R / 2 - M / 2,
				q = P / 2 - x[E] / 2 - 1,
				K = Sr(_[D], q),
				B = Sr(_[C], q),
				se = P - x[E] - B,
				X = P / 2 - x[E] / 2 + j,
				F = hS(K, X, se),
				ae = !m.arrow && hu(s) != null && X !== F && o.reference[E] / 2 - (X < K ? K : B) - x[E] / 2 < 0,
				O = ae ? (X < K ? X - K : X - se) : 0;
			return { [p]: b[p] + O, data: { [p]: F, centerOffset: X - F - O, ...(ae && { alignmentOffset: O }) }, reset: ae };
		},
	}),
	Xk = function (e) {
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
							...k
						} = _r(e, n);
					if ((r = o.arrow) != null && r.alignmentOffset) return {};
					const D = wr(s),
						C = si(h),
						A = wr(h) === h,
						R = await (m.isRTL == null ? void 0 : m.isRTL(v.floating)),
						M = b || (A || !x ? [Co(h)] : Ik(h)),
						Y = E !== "none";
					!b && Y && M.push(...Pk(h, x, E, R));
					const P = [h, ...M],
						j = await m.detectOverflow(n, k),
						q = [];
					let K = ((u = o.flip) == null ? void 0 : u.overflows) || [];
					if ((g && q.push(j[D]), _)) {
						const F = Bk(s, f, R);
						q.push(j[F[0]], j[F[1]]);
					}
					if (((K = [...K, { placement: s, overflows: q }]), !q.every((F) => F <= 0))) {
						var B, se;
						const F = (((B = o.flip) == null ? void 0 : B.index) || 0) + 1,
							ae = P[F];
						if (
							ae &&
							(!(_ === "alignment" && C !== si(ae)) ||
								K.every(($) => (si($.placement) === C ? $.overflows[0] > 0 : !0)))
						)
							return { data: { index: F, overflows: K }, reset: { placement: ae } };
						let O =
							(se = K.filter(($) => $.overflows[0] <= 0).sort(($, H) => $.overflows[1] - H.overflows[1])[0]) == null
								? void 0
								: se.placement;
						if (!O)
							switch (p) {
								case "bestFit": {
									var X;
									const $ =
										(X = K.filter((H) => {
											if (Y) {
												const le = si(H.placement);
												return le === C || le === "y";
											}
											return !0;
										})
											.map((H) => [H.placement, H.overflows.filter((le) => le > 0).reduce((le, he) => le + he, 0)])
											.sort((H, le) => H[1] - le[1])[0]) == null
											? void 0
											: X[0];
									$ && (O = $);
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
	vS = new Set(["left", "top"]);
async function Jk(e, n) {
	const { placement: r, platform: u, elements: s } = e,
		o = await (u.isRTL == null ? void 0 : u.isRTL(s.floating)),
		f = wr(r),
		h = hu(r),
		m = si(r) === "y",
		v = vS.has(f) ? -1 : 1,
		g = o && m ? -1 : 1,
		_ = _r(n, e);
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
var Wk = function (e) {
		return (
			e === void 0 && (e = 0),
			{
				name: "offset",
				options: e,
				async fn(n) {
					var r, u;
					const { x: s, y: o, placement: f, middlewareData: h } = n,
						m = await Jk(n, e);
					return f === ((r = h.offset) == null ? void 0 : r.placement) && (u = h.arrow) != null && u.alignmentOffset
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
				async fn(n) {
					const { x: r, y: u, placement: s, platform: o } = n,
						{
							mainAxis: f = !0,
							crossAxis: h = !1,
							limiter: m = {
								fn: (C) => {
									let { x: A, y: R } = C;
									return { x: A, y: R };
								},
							},
							...v
						} = _r(e, n),
						g = { x: r, y: u },
						_ = await o.detectOverflow(n, v),
						b = si(s),
						p = Ih(b);
					let E = g[p],
						x = g[b];
					const k = (C, A) => hS(A + _[C === "y" ? "top" : "left"], A, A - _[C === "y" ? "bottom" : "right"]);
					(f && (E = k(p, E)), h && (x = k(b, x)));
					const D = m.fn({ ...n, [p]: E, [b]: x });
					return { ...D, data: { x: D.x - r, y: D.y - u, enabled: { [p]: f, [b]: h } } };
				},
			}
		);
	},
	t2 = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				options: e,
				fn(n) {
					var r, u;
					const { x: s, y: o, placement: f, rects: h, middlewareData: m } = n,
						{ offset: v = 0, mainAxis: g = !0, crossAxis: _ = !0 } = _r(e, n),
						b = { x: s, y: o },
						p = si(f),
						E = Ih(p);
					let x = b[E],
						k = b[p];
					const D = _r(v, n),
						C =
							typeof D == "number"
								? { mainAxis: D, crossAxis: 0 }
								: { mainAxis: (r = D.mainAxis) != null ? r : 0, crossAxis: (u = D.crossAxis) != null ? u : 0 };
					if (g) {
						const M = E === "y" ? "height" : "width",
							Y = h.reference[E] - h.floating[M] + C.mainAxis,
							P = h.reference[E] + h.reference[M] - C.mainAxis;
						x < Y ? (x = Y) : x > P && (x = P);
					}
					if (_) {
						var A, R;
						const M = E === "y" ? "width" : "height",
							Y = vS.has(wr(f)),
							P =
								h.reference[p] -
								h.floating[M] +
								((Y && ((A = m.offset) == null ? void 0 : A[p])) || 0) +
								(Y ? 0 : C.crossAxis),
							j =
								h.reference[p] +
								h.reference[M] +
								(Y ? 0 : ((R = m.offset) == null ? void 0 : R[p]) || 0) -
								(Y ? C.crossAxis : 0);
						k < P ? (k = P) : k > j && (k = j);
					}
					return { [E]: x, [p]: k };
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
				async fn(n) {
					const { placement: r, rects: u, platform: s, elements: o } = n,
						{ apply: f = () => {}, ...h } = _r(e, n),
						m = await s.detectOverflow(n, h),
						v = wr(r),
						g = hu(r),
						_ = si(r) === "y",
						{ width: b, height: p } = u.floating;
					let E, x;
					v === "top" || v === "bottom"
						? ((E = v),
							(x =
								g === ((await (s.isRTL == null ? void 0 : s.isRTL(o.floating))) ? "start" : "end") ? "left" : "right"))
						: ((x = v), (E = g === "end" ? "top" : "bottom"));
					const k = p - m.top - m.bottom,
						D = b - m.left - m.right,
						C = Sr(p - m[E], k),
						A = Sr(b - m[x], D),
						R = n.middlewareData.shift,
						M = !R;
					let Y = C,
						P = A;
					(R != null && R.enabled.x && (P = D),
						R != null && R.enabled.y && (Y = k),
						M && !g && (_ ? (P = b - 2 * qi(m.left, m.right)) : (Y = p - 2 * qi(m.top, m.bottom))),
						await f({ ...n, availableWidth: P, availableHeight: Y }));
					const j = await s.getDimensions(o.floating);
					return b !== j.width || p !== j.height ? { reset: { rects: !0 } } : {};
				},
			}
		);
	};
function Yo() {
	return typeof window < "u";
}
function mu(e) {
	return gS(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function bn(e) {
	var n;
	return (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) || window;
}
function Hi(e) {
	var n;
	return (n = (gS(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : n.documentElement;
}
function gS(e) {
	return Yo() ? e instanceof Node || e instanceof bn(e).Node : !1;
}
function oi(e) {
	return Yo() ? e instanceof Element || e instanceof bn(e).Element : !1;
}
function xr(e) {
	return Yo() ? e instanceof HTMLElement || e instanceof bn(e).HTMLElement : !1;
}
function op(e) {
	return !Yo() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof bn(e).ShadowRoot;
}
function Go(e) {
	const { overflow: n, overflowX: r, overflowY: u, display: s } = ci(e);
	return /auto|scroll|overlay|hidden|clip/.test(n + u + r) && s !== "inline" && s !== "contents";
}
function i2(e) {
	return /^(table|td|th)$/.test(mu(e));
}
function Fo(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var r2 = /transform|translate|scale|rotate|perspective|filter/,
	a2 = /paint|layout|strict|content/,
	Qr = (e) => !!e && e !== "none",
	Ad;
function Hh(e) {
	const n = oi(e) ? ci(e) : e;
	return (
		Qr(n.transform) ||
		Qr(n.translate) ||
		Qr(n.scale) ||
		Qr(n.rotate) ||
		Qr(n.perspective) ||
		(!Ph() && (Qr(n.backdropFilter) || Qr(n.filter))) ||
		r2.test(n.willChange || "") ||
		a2.test(n.contain || "")
	);
}
function u2(e) {
	let n = ta(e);
	for (; xr(n) && !bl(n); ) {
		if (Hh(n)) return n;
		if (Fo(n)) return null;
		n = ta(n);
	}
	return null;
}
function Ph() {
	return (Ad == null && (Ad = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Ad);
}
function bl(e) {
	return /^(html|body|#document)$/.test(mu(e));
}
function ci(e) {
	return bn(e).getComputedStyle(e);
}
function Xo(e) {
	return oi(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function ta(e) {
	if (mu(e) === "html") return e;
	const n = e.assignedSlot || e.parentNode || (op(e) && e.host) || Hi(e);
	return op(n) ? n.host : n;
}
function yS(e) {
	const n = ta(e);
	return bl(n) ? (e.ownerDocument || e).body : xr(n) && Go(n) ? n : yS(n);
}
function Sl(e, n, r) {
	var u;
	(n === void 0 && (n = []), r === void 0 && (r = !0));
	const s = yS(e),
		o = s === ((u = e.ownerDocument) == null ? void 0 : u.body),
		f = bn(s);
	if (o) {
		const h = Wd(f);
		return n.concat(f, f.visualViewport || [], Go(s) ? s : [], h && r ? Sl(h) : []);
	} else return n.concat(s, Sl(s, [], r));
}
function Wd(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function pS(e) {
	const n = ci(e);
	let r = parseFloat(n.width) || 0,
		u = parseFloat(n.height) || 0;
	const s = xr(e),
		o = s ? e.offsetWidth : r,
		f = s ? e.offsetHeight : u,
		h = Ao(r) !== o || Ao(u) !== f;
	return (h && ((r = o), (u = f)), { width: r, height: u, $: h });
}
function Qh(e) {
	return oi(e) ? e : e.contextElement;
}
function nu(e) {
	const n = Qh(e);
	if (!xr(n)) return Ui(1);
	const r = n.getBoundingClientRect(),
		{ width: u, height: s, $: o } = pS(n);
	let f = (o ? Ao(r.width) : r.width) / u,
		h = (o ? Ao(r.height) : r.height) / s;
	return ((!f || !Number.isFinite(f)) && (f = 1), (!h || !Number.isFinite(h)) && (h = 1), { x: f, y: h });
}
var l2 = Ui(0);
function bS(e) {
	const n = bn(e);
	return !Ph() || !n.visualViewport ? l2 : { x: n.visualViewport.offsetLeft, y: n.visualViewport.offsetTop };
}
function s2(e, n, r) {
	return (n === void 0 && (n = !1), !!r && n && r === bn(e));
}
function na(e, n, r, u) {
	(n === void 0 && (n = !1), r === void 0 && (r = !1));
	const s = e.getBoundingClientRect(),
		o = Qh(e);
	let f = Ui(1);
	n && (u ? oi(u) && (f = nu(u)) : (f = nu(e)));
	const h = s2(o, r, u) ? bS(o) : Ui(0);
	let m = (s.left + h.x) / f.x,
		v = (s.top + h.y) / f.y,
		g = s.width / f.x,
		_ = s.height / f.y;
	if (o && u) {
		const b = bn(o),
			p = oi(u) ? bn(u) : u;
		let E = b,
			x = Wd(E);
		for (; x && p !== E; ) {
			const k = nu(x),
				D = x.getBoundingClientRect(),
				C = ci(x),
				A = D.left + (x.clientLeft + parseFloat(C.paddingLeft)) * k.x,
				R = D.top + (x.clientTop + parseFloat(C.paddingTop)) * k.y;
			((m *= k.x), (v *= k.y), (g *= k.x), (_ *= k.y), (m += A), (v += R), (E = bn(x)), (x = Wd(E)));
		}
	}
	return Ro({ width: g, height: _, x: m, y: v });
}
function Jo(e, n) {
	const r = Xo(e).scrollLeft;
	return n ? n.left + r : na(Hi(e)).left + r;
}
function SS(e, n) {
	const r = e.getBoundingClientRect();
	return { x: r.left + n.scrollLeft - Jo(e, r), y: r.top + n.scrollTop };
}
function o2(e) {
	let { elements: n, rect: r, offsetParent: u, strategy: s } = e;
	const o = s === "fixed",
		f = Hi(u),
		h = n ? Fo(n.floating) : !1;
	if (u === f || (h && o)) return r;
	let m = { scrollLeft: 0, scrollTop: 0 },
		v = Ui(1);
	const g = Ui(0),
		_ = xr(u);
	if ((_ || !o) && ((mu(u) !== "body" || Go(f)) && (m = Xo(u)), _)) {
		const p = na(u);
		((v = nu(u)), (g.x = p.x + u.clientLeft), (g.y = p.y + u.clientTop));
	}
	const b = f && !_ && !o ? SS(f, m) : Ui(0);
	return {
		width: r.width * v.x,
		height: r.height * v.y,
		x: r.x * v.x - m.scrollLeft * v.x + g.x + b.x,
		y: r.y * v.y - m.scrollTop * v.y + g.y + b.y,
	};
}
function c2(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function f2(e) {
	const n = Xo(e),
		r = e.ownerDocument.body,
		u = qi(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth),
		s = qi(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
	let o = -n.scrollLeft + Jo(e);
	const f = -n.scrollTop;
	return (
		ci(r).direction === "rtl" && (o += qi(e.clientWidth, r.clientWidth) - u),
		{ width: u, height: s, x: o, y: f }
	);
}
var d2 = 25;
function h2(e, n, r) {
	r === void 0 && (r = "viewport");
	const u = r === "layoutViewport",
		s = bn(e),
		o = Hi(e),
		f = s.visualViewport;
	let h = o.clientWidth,
		m = o.clientHeight,
		v = 0,
		g = 0;
	if (f) {
		const _ = !Ph() || n === "fixed";
		u
			? _ || ((v = -f.offsetLeft), (g = -f.offsetTop))
			: ((h = f.width), (m = f.height), _ && ((v = f.offsetLeft), (g = f.offsetTop)));
	}
	if (Jo(o) <= 0) {
		const _ = o.ownerDocument,
			b = _.body,
			p = getComputedStyle(b),
			E = (_.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight)) || 0,
			x = Math.abs(o.clientWidth - b.clientWidth - E),
			k = getComputedStyle(o).scrollbarGutter === "stable both-edges" ? x / 2 : x;
		k <= d2 && (h -= k);
	}
	return { width: h, height: m, x: v, y: g };
}
function m2(e, n) {
	const r = na(e, !0, n === "fixed"),
		u = r.top + e.clientTop,
		s = r.left + e.clientLeft,
		o = nu(e);
	return { width: e.clientWidth * o.x, height: e.clientHeight * o.y, x: s * o.x, y: u * o.y };
}
function cp(e, n, r) {
	let u;
	if (n === "viewport" || n === "layoutViewport") u = h2(e, r, n);
	else if (n === "document") u = f2(Hi(e));
	else if (oi(n)) u = m2(n, r);
	else {
		const s = bS(e);
		u = { x: n.x - s.x, y: n.y - s.y, width: n.width, height: n.height };
	}
	return Ro(u);
}
function v2(e, n) {
	const r = n.get(e);
	if (r) return r;
	let u = Sl(e, [], !1).filter((h) => oi(h) && mu(h) !== "body"),
		s = null;
	const o = ci(e).position === "fixed";
	let f = o ? ta(e) : e;
	for (; oi(f) && !bl(f); ) {
		const h = ci(f),
			m = Hh(f),
			v = s ? s.position : o ? "fixed" : "";
		(!m && (v === "fixed" || (v === "absolute" && h.position === "static")) ? (u = u.filter((g) => g !== f)) : (s = h),
			(f = ta(f)));
	}
	return (n.set(e, u), u);
}
function g2(e) {
	let { element: n, boundary: r, rootBoundary: u, strategy: s } = e;
	const o = [...(r === "clippingAncestors" ? (Fo(n) ? [] : v2(n, this._c)) : [].concat(r)), u],
		f = cp(n, o[0], s);
	let h = f.top,
		m = f.right,
		v = f.bottom,
		g = f.left;
	for (let _ = 1; _ < o.length; _++) {
		const b = cp(n, o[_], s);
		((h = qi(b.top, h)), (m = Sr(b.right, m)), (v = Sr(b.bottom, v)), (g = qi(b.left, g)));
	}
	return { width: m - g, height: v - h, x: g, y: h };
}
function y2(e) {
	const { width: n, height: r } = pS(e);
	return { width: n, height: r };
}
function p2(e, n, r) {
	const u = xr(n),
		s = Hi(n),
		o = r === "fixed",
		f = na(e, !0, o, n);
	let h = { scrollLeft: 0, scrollTop: 0 };
	const m = Ui(0);
	if ((u || !o) && ((mu(n) !== "body" || Go(s)) && (h = Xo(n)), u)) {
		const g = na(n, !0, o, n);
		((m.x = g.x + n.clientLeft), (m.y = g.y + n.clientTop));
	}
	!u && s && (m.x = Jo(s));
	const v = s && !u && !o ? SS(s, h) : Ui(0);
	return { x: f.left + h.scrollLeft - m.x - v.x, y: f.top + h.scrollTop - m.y - v.y, width: f.width, height: f.height };
}
function Cd(e) {
	return ci(e).position === "static";
}
function fp(e, n) {
	if (!xr(e) || ci(e).position === "fixed") return null;
	if (n) return n(e);
	let r = e.offsetParent;
	return (Hi(e) === r && (r = r.ownerDocument.body), r);
}
function _S(e, n) {
	const r = bn(e);
	if (Fo(e)) return r;
	if (!xr(e)) {
		let s = ta(e);
		for (; s && !bl(s); ) {
			if (oi(s) && !Cd(s)) return s;
			s = ta(s);
		}
		return r;
	}
	let u = fp(e, n);
	for (; u && i2(u) && Cd(u); ) u = fp(u, n);
	return u && bl(u) && Cd(u) && !Hh(u) ? r : u || u2(e) || r;
}
var b2 = async function (e) {
	const n = this.getOffsetParent || _S,
		r = this.getDimensions,
		u = await r(e.floating);
	return {
		reference: p2(e.reference, await n(e.floating), e.strategy),
		floating: { x: 0, y: 0, width: u.width, height: u.height },
	};
};
function S2(e) {
	return ci(e).direction === "rtl";
}
var _2 = {
	convertOffsetParentRelativeRectToViewportRelativeRect: o2,
	getDocumentElement: Hi,
	getClippingRect: g2,
	getOffsetParent: _S,
	getElementRects: b2,
	getClientRects: c2,
	getDimensions: y2,
	getScale: nu,
	isElement: oi,
	isRTL: S2,
};
function wS(e, n) {
	return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height;
}
function w2(e, n, r) {
	let u = null,
		s;
	const o = Hi(e);
	function f() {
		var g;
		(clearTimeout(s), (g = u) == null || g.disconnect(), (u = null));
	}
	function h(g, _) {
		(g === void 0 && (g = !1), _ === void 0 && (_ = 1), f());
		const b = e.getBoundingClientRect(),
			{ left: p, top: E, width: x, height: k } = b;
		if ((g || n(), !x || !k)) return;
		const D = ao(E),
			C = ao(o.clientWidth - (p + x)),
			A = ao(o.clientHeight - (E + k)),
			R = ao(p),
			M = { rootMargin: -D + "px " + -C + "px " + -A + "px " + -R + "px", threshold: qi(0, Sr(1, _)) || 1 };
		let Y = !0;
		function P(j) {
			const q = j[0].intersectionRatio;
			if (!wS(b, e.getBoundingClientRect())) return h();
			if (q !== _) {
				if (!Y) return h();
				q
					? h(!1, q)
					: (s = setTimeout(() => {
							h(!1, 1e-7);
						}, 1e3));
			}
			Y = !1;
		}
		try {
			u = new IntersectionObserver(P, { ...M, root: o.ownerDocument });
		} catch {
			u = new IntersectionObserver(P, M);
		}
		u.observe(e);
	}
	const m = bn(e),
		v = () => h(r);
	return (
		m.addEventListener("resize", v),
		h(!0),
		() => {
			(m.removeEventListener("resize", v), f());
		}
	);
}
function E2(e, n, r, u) {
	u === void 0 && (u = {});
	const {
			ancestorScroll: s = !0,
			ancestorResize: o = !0,
			elementResize: f = typeof ResizeObserver == "function",
			layoutShift: h = typeof IntersectionObserver == "function",
			animationFrame: m = !1,
		} = u,
		v = Qh(e),
		g = s || o ? [...(v ? Sl(v) : []), ...(n ? Sl(n) : [])] : [];
	g.forEach((D) => {
		(s && D.addEventListener("scroll", r), o && D.addEventListener("resize", r));
	});
	const _ = v && h ? w2(v, r, o) : null;
	let b = -1,
		p = null;
	f &&
		((p = new ResizeObserver((D) => {
			let [C] = D;
			(C &&
				C.target === v &&
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
		x = m ? na(e) : null;
	m && k();
	function k() {
		const D = na(e);
		(x && !wS(x, D) && r(), (x = D), (E = requestAnimationFrame(k)));
	}
	return (
		r(),
		() => {
			var D;
			(g.forEach((C) => {
				(s && C.removeEventListener("scroll", r), o && C.removeEventListener("resize", r));
			}),
				_?.(),
				(D = p) == null || D.disconnect(),
				(p = null),
				m && cancelAnimationFrame(E));
		}
	);
}
var T2 = Wk,
	x2 = e2,
	A2 = Xk,
	C2 = n2,
	R2 = Fk,
	O2 = t2,
	N2 = (e, n, r) => {
		const u = new Map(),
			s = r ?? {},
			o = { ..._2, ...s.platform, _c: u };
		return Gk(e, n, { ...s, platform: o });
	},
	k2 = "div";
function dp(e = 0, n = 0, r = 0, u = 0) {
	if (typeof DOMRect == "function") return new DOMRect(e, n, r, u);
	const s = { x: e, y: n, width: r, height: u, top: n, right: e + r, bottom: n + u, left: e };
	return { ...s, toJSON: () => s };
}
function M2(e) {
	if (!e) return dp();
	const { x: n, y: r, width: u, height: s } = e;
	return dp(n, r, u, s);
}
function z2(e, n) {
	return {
		contextElement: e || void 0,
		getBoundingClientRect: () => {
			const r = e,
				u = n?.(r);
			return u || !r ? M2(u) : r.getBoundingClientRect();
		},
	};
}
function D2(e) {
	return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e);
}
function hp(e) {
	const n = window.devicePixelRatio || 1;
	return Math.round(e * n) / n;
}
function j2(e, n) {
	return T2(({ placement: r }) => {
		var u;
		const s = (e?.clientHeight || 0) / 2,
			o = typeof n.gutter == "number" ? n.gutter + s : (u = n.gutter) != null ? u : s;
		return { crossAxis: r.split("-")[1] ? void 0 : n.shift, mainAxis: o, alignmentAxis: n.shift };
	});
}
function L2(e) {
	if (e.flip === !1) return;
	const n = typeof e.flip == "string" ? e.flip.split(" ") : void 0;
	return (Zt(!n || n.every(D2), !1), A2({ padding: e.overflowPadding, fallbackPlacements: n }));
}
function q2(e) {
	if (!(!e.slide && !e.overlap))
		return x2({ mainAxis: e.slide, crossAxis: e.overlap, padding: e.overflowPadding, limiter: O2() });
}
function U2(e) {
	return C2({
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
function $2(e, n) {
	if (e) return R2({ element: e, padding: n.arrowPadding });
}
var Kh = Ge(function ({
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
		overflowPadding: k = 8,
		getAnchorRect: D,
		updatePosition: C,
		...A
	}) {
		const R = Vo();
		((n = n || R), Zt(n, !1));
		const M = n.useState("arrowElement"),
			Y = n.useState("anchorElement"),
			P = n.useState("disclosureElement"),
			j = n.useState("popoverElement"),
			q = n.useState("contentElement"),
			K = n.useState("placement"),
			B = n.useState("mounted"),
			se = n.useState("rendered"),
			X = (0, w.useRef)(null),
			[F, ae] = (0, w.useState)(!1),
			{ portalRef: O, domReady: $ } = _h(u, A.portalRef),
			H = xe(D),
			le = xe(C),
			he = !!C;
		(Ke(() => {
			if (!j?.isConnected) return;
			j.style.setProperty("--popover-overflow-padding", `${k}px`);
			const N = z2(Y, H),
				G = async () => {
					if (!B) return;
					M || (X.current = X.current || document.createElement("div"));
					const ge = M || X.current,
						ye = [
							j2(ge, { gutter: E, shift: v }),
							L2({ flip: m, overflowPadding: k }),
							q2({ slide: g, shift: v, overlap: _, overflowPadding: k }),
							$2(ge, { arrowPadding: x }),
							U2({ sameWidth: b, fitViewport: p, overflowPadding: k }),
						],
						Se = await N2(N, j, { placement: K, strategy: h ? "fixed" : "absolute", middleware: ye });
					(n?.setState("currentPlacement", Se.placement), ae(!0));
					const Pe = hp(Se.x),
						ze = hp(Se.y);
					if (
						(Object.assign(j.style, { top: "0", left: "0", transform: `translate3d(${Pe}px,${ze}px,0)` }),
						ge && Se.middlewareData.arrow)
					) {
						const { x: rt, y: Nt } = Se.middlewareData.arrow,
							Ht = Se.placement.split("-")[0],
							Qt = ge.clientWidth / 2,
							it = ge.clientHeight / 2,
							fe = rt != null ? rt + Qt : -Qt,
							Ee = Nt != null ? Nt + it : -it;
						(j.style.setProperty(
							"--popover-transform-origin",
							{
								top: `${fe}px calc(100% + ${it}px)`,
								bottom: `${fe}px ${-it}px`,
								left: `calc(100% + ${Qt}px) ${Ee}px`,
								right: `${-Qt}px ${Ee}px`,
							}[Ht],
						),
							Object.assign(ge.style, {
								left: rt != null ? `${rt}px` : "",
								top: Nt != null ? `${Nt}px` : "",
								[Ht]: "100%",
							}));
					}
				},
				oe = E2(
					N,
					j,
					async () => {
						he ? (await le({ updatePosition: G }), ae(!0)) : await G();
					},
					{ elementResize: typeof ResizeObserver == "function" },
				);
			return () => {
				(ae(!1), oe());
			};
		}, [n, se, j, M, Y, j, K, B, $, h, m, v, g, _, b, p, E, x, k, H, he, le]),
			Ke(() => {
				if (!B || !$ || !j?.isConnected || !q?.isConnected) return;
				const N = () => {
					j.style.zIndex = getComputedStyle(q).zIndex;
				};
				N();
				let G = requestAnimationFrame(() => {
					G = requestAnimationFrame(N);
				});
				return () => cancelAnimationFrame(G);
			}, [B, $, j, q]));
		const Re = h ? "fixed" : "absolute";
		return (
			(A = rn(
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
			(A = rn(A, (N) => (0, S.jsx)(Zo, { value: n, children: N }), [n])),
			(A = { "data-placing": !F || void 0, ...A, style: { position: "relative", ...A.style } }),
			(A = dS({
				store: n,
				modal: r,
				portal: u,
				preserveTabOrder: s,
				preserveTabOrderAnchor: P || Y,
				autoFocusOnShow: F && o,
				...A,
				portalRef: O,
			})),
			A
		);
	}),
	Gz = Dl(
		Ie(function (n) {
			return Ye(k2, Kh(n));
		}),
		Vo,
	),
	B2 = "div";
function I2(e, ...n) {
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
var V2 = Ge(function ({
		store: n,
		modal: r,
		tabIndex: u,
		alwaysVisible: s,
		autoFocusOnHide: o = !0,
		hideOnInteractOutside: f = !0,
		...h
	}) {
		const m = Ho();
		((n = n || m), Zt(n, !1));
		const v = n.useState("baseElement"),
			g = (0, w.useRef)(!1),
			_ = Bt(n.tag, (b) => b?.renderedItems.length);
		return (
			(h = eS({ store: n, alwaysVisible: s, ...h })),
			(h = Kh({
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
					const k = ot(x),
						D = [];
					if ((E?.id && D.push(`[aria-controls~="${E.id}"]`), x?.id && D.push(`[aria-controls~="${x.id}"]`), !D.length))
						return [...p, x];
					const C = D.join(","),
						A = k.querySelectorAll(C);
					return [...p, ...A];
				},
				autoFocusOnHide(b) {
					return jo(o, b) ? !1 : g.current ? ((g.current = !1), !1) : !0;
				},
				hideOnInteractOutside(b) {
					var p, E;
					const x = n?.getState(),
						k = (p = x?.contentElement) == null ? void 0 : p.id,
						D = (E = x?.baseElement) == null ? void 0 : E.id;
					if (I2(b.target, k, D)) return !1;
					const C = typeof f == "function" ? f(b) : f;
					return (C && (g.current = b.type === "click"), C);
				},
			})),
			h
		);
	}),
	Z2 = Dl(
		Ie(function (n) {
			return Ye(B2, V2(n));
		}),
		Ho,
	),
	Fz = (0, w.createContext)(null),
	Xz = (0, w.createContext)(null),
	jl = di([Cl], [Uo]),
	H2 = jl.useContext,
	Jz = jl.useScopedContext,
	Wz = jl.useProviderContext,
	eD = jl.ContextProvider,
	tD = jl.ScopedContextProvider;
function ES({ popover: e, ...n } = {}) {
	const r = Po(
		n.store,
		zh(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
	);
	const u = r?.getState(),
		s = cS({ ...n, store: r }),
		o = Ce(n.placement, u?.placement, "bottom"),
		f = ei(
			{
				...s.getState(),
				placement: o,
				currentPlacement: o,
				anchorElement: Ce(u?.anchorElement, null),
				popoverElement: Ce(u?.popoverElement, null),
				arrowElement: Ce(u?.arrowElement, null),
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
function TS(e, n, r) {
	return (du(n, [r.popover]), Rt(e, r, "placement"), fS(e, n, r));
}
function P2(e) {
	var n;
	const r = e.find((o) => !!o.element),
		u = [...e].reverse().find((o) => !!o.element);
	let s = (n = r?.element) == null ? void 0 : n.parentElement;
	for (; s && u?.element; ) {
		if (u && s.contains(u.element)) return s;
		s = s.parentElement;
	}
	return ot(s).body;
}
function Q2(e) {
	return e?.__unstablePrivateStore;
}
function K2(e = {}) {
	var n;
	e.store;
	const r = (n = e.store) == null ? void 0 : n.getState(),
		u = Ce(e.items, r?.items, e.defaultItems, []),
		s = new Map(u.map((b) => [b.id, b])),
		o = { items: u, renderedItems: Ce(r?.renderedItems, []) },
		f = Q2(e.store),
		h = ei({ items: u, renderedItems: o.renderedItems }, f),
		m = ei(o, e.store),
		v = (b) => {
			const p = xb(b, (E) => E.element);
			(h.setState("renderedItems", p), m.setState("renderedItems", p));
		};
	(on(m, () => kh(h)),
		on(h, () =>
			Eo(h, ["items"], (b) => {
				m.setState("items", b.items);
			}),
		),
		on(h, () =>
			Eo(h, ["renderedItems"], (b) => {
				let p = !0,
					E = requestAnimationFrame(() => {
						const { renderedItems: C } = m.getState();
						b.renderedItems !== C && v(b.renderedItems);
					});
				if (typeof IntersectionObserver != "function") return () => cancelAnimationFrame(E);
				const x = () => {
						if (p) {
							p = !1;
							return;
						}
						(cancelAnimationFrame(E), (E = requestAnimationFrame(() => v(b.renderedItems))));
					},
					k = P2(b.renderedItems),
					D = new IntersectionObserver(x, { root: k });
				for (const C of b.renderedItems) C.element && D.observe(C.element);
				return () => {
					(cancelAnimationFrame(E), D.disconnect());
				};
			}),
		));
	const g = (b, p, E = !1) => {
			let x;
			return (
				p((D) => {
					const C = D.findIndex(({ id: R }) => R === b.id),
						A = D.slice();
					if (C !== -1) {
						x = D[C];
						const R = { ...x, ...b };
						((A[C] = R), s.set(b.id, R));
					} else (A.push(b), s.set(b.id, b));
					return A;
				}),
				() => {
					p((D) => {
						if (!x) return (E && s.delete(b.id), D.filter(({ id: R }) => R !== b.id));
						const C = D.findIndex(({ id: R }) => R === b.id);
						if (C === -1) return D;
						const A = D.slice();
						return ((A[C] = x), s.set(b.id, x), A);
					});
				}
			);
		},
		_ = (b) => g(b, (p) => h.setState("items", p), !0);
	return {
		...m,
		registerItem: _,
		renderItem: (b) =>
			Sn(
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
function Y2(e, n, r) {
	return (du(n, [r.store]), Rt(e, r, "items", "setItems"), e);
}
var G2 = { id: null };
function Di(e, n) {
	return e.find((r) => (n ? !r.disabled && r.id !== n : !r.disabled));
}
function F2(e, n) {
	return e.filter((r) => (n ? !r.disabled && r.id !== n : !r.disabled));
}
function mp(e, n) {
	return e.filter((r) => r.rowId === n);
}
function X2(e, n, r = !1) {
	const u = e.findIndex((s) => s.id === n);
	return [...e.slice(u + 1), ...(r ? [G2] : []), ...e.slice(0, u)];
}
function xS(e) {
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
function AS(e) {
	let n = 0;
	for (const { length: r } of e) r > n && (n = r);
	return n;
}
function J2(e) {
	return { id: "__EMPTY_ITEM__", disabled: !0, rowId: e };
}
function W2(e, n, r) {
	const u = AS(e);
	for (const s of e)
		for (let o = 0; o < u; o += 1) {
			const f = s[o];
			if (!f || (r && f.disabled)) {
				const h = o === 0 && r ? Di(s) : s[o - 1];
				s[o] = h && n !== h.id && r ? h : J2(h?.rowId);
			}
		}
	return e;
}
function eM(e) {
	const n = xS(e),
		r = AS(n),
		u = [];
	for (let s = 0; s < r; s += 1)
		for (const o of n) {
			const f = o[s];
			f && u.push({ ...f, rowId: f.rowId ? `${s}` : void 0 });
		}
	return u;
}
function CS(e = {}) {
	var n;
	const r = (n = e.store) == null ? void 0 : n.getState(),
		u = K2(e),
		s = Ce(e.activeId, r?.activeId, e.defaultActiveId),
		o = ei(
			{
				...u.getState(),
				id: Ce(e.id, r?.id, `id-${Math.random().toString(36).slice(2, 8)}`),
				activeId: s,
				baseElement: Ce(r?.baseElement, null),
				includesBaseElement: Ce(e.includesBaseElement, r?.includesBaseElement, s === null),
				moves: Ce(r?.moves, 0),
				orientation: Ce(e.orientation, r?.orientation, "both"),
				rtl: Ce(e.rtl, r?.rtl, !1),
				virtualFocus: Ce(e.virtualFocus, r?.virtualFocus, !1),
				focusLoop: Ce(e.focusLoop, r?.focusLoop, !1),
				focusWrap: Ce(e.focusWrap, r?.focusWrap, !1),
				focusShift: Ce(e.focusShift, r?.focusShift, !1),
			},
			u,
			e.store,
		);
	on(o, () =>
		un(o, ["renderedItems", "activeId"], (h) => {
			o.setState("activeId", (m) => {
				var v;
				return m !== void 0 ? m : (v = Di(h.renderedItems)) == null ? void 0 : v.id;
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
				focusWrap: k = _.focusWrap,
				includesBaseElement: D = _.includesBaseElement,
				renderedItems: C = _.renderedItems,
				rtl: A = _.rtl,
			} = m,
			R = h === "up" || h === "down",
			M = h === "next" || h === "down",
			Y = M ? A && !R : !A || R,
			P = E && !b;
		let j = R ? Bb(W2(xS(C), p, P)) : C;
		if (((j = Y ? Yd(j) : j), (j = R ? eM(j) : j), p == null)) return (v = Di(j)) == null ? void 0 : v.id;
		const q = j.find((H) => H.id === p);
		if (!q) return (g = Di(j)) == null ? void 0 : g.id;
		const K = j.some((H) => H.rowId),
			B = j.indexOf(q),
			se = j.slice(B + 1),
			X = mp(se, q.rowId);
		if (b) {
			const H = F2(X, p),
				le = H.slice(b)[0] || H[H.length - 1];
			return le?.id;
		}
		const F = x && (R ? x !== "horizontal" : x !== "vertical"),
			ae = K && k && (R ? k !== "horizontal" : k !== "vertical"),
			O = M ? (!K || R) && F && D : R ? D : !1;
		if (F) {
			const H = Di(X2(ae && !O ? j : mp(j, q.rowId), p, O), p);
			return H?.id;
		}
		if (ae) {
			const H = Di(O ? X : se, p);
			return O ? H?.id || null : H?.id;
		}
		const $ = Di(X, p);
		return !$ && O ? null : $?.id;
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
			return (h = Di(o.getState().renderedItems)) == null ? void 0 : h.id;
		},
		last: () => {
			var h;
			return (h = Di(Yd(o.getState().renderedItems))) == null ? void 0 : h.id;
		},
		next: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("next", h)),
		previous: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("previous", h)),
		down: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("down", h)),
		up: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("up", h)),
	};
}
function tM(e) {
	return { id: Zi(e.id), ...e };
}
function RS(e, n, r) {
	return (
		(e = Y2(e, n, r)),
		Rt(e, r, "activeId", "setActiveId"),
		Rt(e, r, "includesBaseElement"),
		Rt(e, r, "virtualFocus"),
		Rt(e, r, "orientation"),
		Rt(e, r, "rtl"),
		Rt(e, r, "focusLoop"),
		Rt(e, r, "focusWrap"),
		Rt(e, r, "focusShift"),
		e
	);
}
var nM = Lo() && Ob();
function iM({ tag: e, ...n } = {}) {
	const r = Po(n.store, Hb(e, ["value", "rtl"]));
	const u = e?.getState(),
		s = r?.getState(),
		o = Ce(n.activeId, s?.activeId, n.defaultActiveId, null),
		f = CS({
			...n,
			activeId: o,
			includesBaseElement: Ce(n.includesBaseElement, s?.includesBaseElement, !0),
			orientation: Ce(n.orientation, s?.orientation, "vertical"),
			focusLoop: Ce(n.focusLoop, s?.focusLoop, !0),
			focusWrap: Ce(n.focusWrap, s?.focusWrap, !0),
			virtualFocus: Ce(n.virtualFocus, s?.virtualFocus, !0),
		}),
		h = ES({ ...n, placement: Ce(n.placement, s?.placement, "bottom-start") }),
		m = Ce(n.value, s?.value, n.defaultValue, ""),
		v = Ce(n.selectedValue, s?.selectedValue, u?.values, n.defaultSelectedValue, ""),
		g = Array.isArray(v),
		_ = {
			...f.getState(),
			...h.getState(),
			value: m,
			selectedValue: v,
			resetValueOnSelect: Ce(n.resetValueOnSelect, s?.resetValueOnSelect, g),
			resetValueOnHide: Ce(n.resetValueOnHide, s?.resetValueOnHide, g && !e),
			activeValue: s?.activeValue,
		},
		b = ei(_, f, h, r);
	return (
		nM &&
			on(b, () =>
				un(b, ["virtualFocus"], () => {
					b.setState("virtualFocus", !1);
				}),
			),
		on(b, () => {
			if (e)
				return Sn(
					un(b, ["selectedValue"], (p) => {
						Array.isArray(p.selectedValue) && e.setValues(p.selectedValue);
					}),
					un(e, ["values"], (p) => {
						b.setState("selectedValue", p.values);
					}),
				);
		}),
		on(b, () =>
			un(b, ["resetValueOnHide", "mounted"], (p) => {
				p.resetValueOnHide && (p.mounted || b.setState("value", m));
			}),
		),
		on(b, () =>
			un(b, ["open"], (p) => {
				p.open || (b.setState("activeId", o), b.setState("moves", 0));
			}),
		),
		on(b, () =>
			un(b, ["moves", "activeId"], (p, E) => {
				p.moves === E.moves && b.setState("activeValue", void 0);
			}),
		),
		on(b, () =>
			Eo(b, ["moves", "renderedItems"], (p, E) => {
				if (p.moves === E.moves) return;
				const { activeId: x } = b.getState(),
					k = f.item(x);
				b.setState("activeValue", k?.value);
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
function rM(e) {
	const n = H2();
	return ((e = { ...e, tag: e.tag !== void 0 ? e.tag : n }), tM(e));
}
function aM(e, n, r) {
	return (
		du(n, [r.tag]),
		Rt(e, r, "value", "setValue"),
		Rt(e, r, "selectedValue", "setSelectedValue"),
		Rt(e, r, "resetValueOnHide"),
		Rt(e, r, "resetValueOnSelect"),
		Object.assign(RS(TS(e, n, r), n, r), { tag: r.tag })
	);
}
function uM(e = {}) {
	e = rM(e);
	const [n, r] = Qo(iM, e);
	return aM(n, r, e);
}
var Rd =
	'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Ll(e) {
	const n = (0, w.useRef)(null);
	((0, w.useEffect)(() => {
		const u = document.activeElement instanceof HTMLElement ? document.activeElement : null,
			s = n.current;
		return (
			(s?.querySelector("[data-dialog-initial]") ?? s?.querySelector(Rd))?.focus(),
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
						(u.querySelector("[data-dialog-initial]") ?? u.querySelector(Rd))?.focus();
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
		const o = [...s.querySelectorAll(Rd)];
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
function OS(e) {
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
						g = lu(v) ?? Date.now();
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
var lM = ["image/", "video/", "audio/", "application/", "text/"],
	vp = 20;
function sM(e) {
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
				for (let b = 0; b < e.attachments.length; b += vp) {
					const p = e.attachments.slice(b, b + vp),
						E = await e.client.fetchJson("/api/v1/files/download-urls", {
							body: { fileNodeIds: p.map((k) => k.fileNodeId) },
						}),
						x = KR.safeParse(E);
					if (!x.success) throw new Error("Unexpected response for the download links");
					for (const k of x.data.items) _.set(k.fileNodeId, { kind: "ready", url: k.url });
					for (const k of x.data.errors) _.set(k.fileNodeId, { kind: "error", message: k.message });
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
function oM(e) {
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
							contentTypePrefixes: lM,
							cursor: s,
						},
					})
					.then((x) => {
						v(!1);
						const k = PR.safeParse(x);
						if (!k.success) {
							_("Unexpected response from the file list");
							return;
						}
						const D = k.data.items.filter((C) => !b.current.has(C.nodeId));
						for (const C of D) b.current.add(C.nodeId);
						(u((C) => [...C, ...D]), o(k.data.cursor), h(k.data.isDone));
					})
					.catch((x) => {
						(v(!1), _(Xn(x)));
					}));
		};
	return (
		(0, w.useEffect)(() => {
			p.current || ((p.current = !0), E());
		}, []),
		(0, S.jsxs)(Ll, {
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
var cM = 8,
	fM = 100,
	dM = 10,
	eh = new WeakMap(),
	Od = new WeakMap();
function hM(e) {
	const n = eh.get(e);
	if (n !== void 0) return Promise.resolve(n);
	const r = Od.get(e);
	if (r !== void 0) return r;
	const u = mM(e).then((s) => (s.status === "ready" && eh.set(e, s), Od.delete(e), s));
	return (Od.set(e, u), u);
}
async function mM(e) {
	const n = [];
	let r;
	for (let u = 0; u < dM; u += 1) {
		const s = await e.members.list({ limit: fM, ...(r === void 0 ? {} : { cursor: r }) });
		if ("_nay" in s) return n.length > 0 ? { status: "ready", members: n } : { status: "refused", name: s._nay.name };
		if ((n.push(...s._yay.members), s._yay.cursor === null)) return { status: "ready", members: n };
		r = s._yay.cursor;
	}
	return { status: "ready", members: n };
}
function gp(e) {
	return `mention:${e}`;
}
function NS(e) {
	const n = (0, w.useId)(),
		[r, u] = (0, w.useState)(""),
		[s, o] = (0, w.useState)([]),
		[f, h] = (0, w.useState)(!1),
		[m, v] = (0, w.useState)(null),
		[g, _] = (0, w.useState)(null),
		b = (0, w.useRef)(new Map()),
		p = (0, w.useRef)(null),
		E = (0, w.useRef)(null),
		x = uM({
			placement: "top-start",
			resetValueOnHide: !1,
			setOpen: (j) => {
				j || _(null);
			},
		}),
		k = e.client.context.userId,
		D =
			g !== null && m !== null && m !== "loading" && m.status === "ready" ? DR(m.members, g.query, k).slice(0, cM) : [],
		C = g !== null && (m === "loading" || (m !== null && m.status === "refused") || D.length > 0),
		A = () => {
			if (m !== null) return;
			const j = eh.get(e.client);
			if (j !== void 0) {
				v(j);
				return;
			}
			(v("loading"), hM(e.client).then(v));
		},
		R = (j) => {
			if (g === null) return;
			const q = p.current?.selectionStart ?? r.length,
				K = jR(r, g.start, q, j.label);
			(b.current.set(j.userId, j.label), u(K.text), _(null), (E.current = K.caret), x.hide(), x.setValue(""));
		},
		M = () => {
			if (e.busy || e.disabled) return;
			const j = r.trim();
			if (j === "" && s.length === 0) return;
			const q = LR(b.current, j);
			(e.onSend(j, s, q), u(""), o([]), _(null), b.current.clear(), x.hide());
		},
		Y = (j) => {
			const q = j.currentTarget.value,
				K = j.currentTarget.selectionStart ?? q.length;
			u(q);
			const B = zR(q, K);
			if ((_(B), x.setValue(B?.query ?? ""), B === null)) {
				x.hide();
				return;
			}
			A();
		},
		P = (j) => {
			if (C) {
				if (j.key === "ArrowLeft" || j.key === "ArrowRight") {
					x.hide();
					return;
				}
				if (j.key === "Escape") {
					(j.preventDefault(), j.stopPropagation(), _(null), x.hide());
					return;
				}
				if ((j.key === "Enter" || j.key === "Tab") && !j.shiftKey && D.length > 0) {
					j.preventDefault();
					const q = x.getState().activeId,
						K = D.find((B) => gp(B.userId) === q) ?? D[0];
					R(K);
					return;
				}
			}
			j.key === "Enter" && !j.shiftKey && (j.preventDefault(), M());
		};
	return (
		(0, w.useLayoutEffect)(() => {
			x.setOpen(C);
		}, [x, C]),
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
												onClick: () => o((q) => q.filter((K) => K.fileNodeId !== j.fileNodeId)),
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
						(0, S.jsx)(kN, {
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
								onChange: Y,
								onKeyDown: P,
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
							children: (0, S.jsx)(lO, { size: 18, "aria-hidden": "true" }),
						}),
						(0, S.jsx)("button", {
							type: "button",
							className: "composer-action composer-send",
							"aria-label": e.busy ? "Sending…" : "Send",
							disabled: e.busy || e.disabled,
							onClick: M,
							children: (0, S.jsx)(iO, { size: 18, "aria-hidden": "true" }),
						}),
					],
				}),
				(0, S.jsxs)(Z2, {
					store: x,
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					fitViewport: !0,
					hidden: !C,
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
							? (0, S.jsx)("div", { className: "mention-menu-status", role: "status", children: bb(m.name) })
							: null,
						D.map((j) =>
							(0, S.jsx)(
								WN,
								{
									id: gp(j.userId),
									value: j.label,
									setValueOnClick: !1,
									focusOnHover: !0,
									className: "mention-option",
									onMouseDown: (q) => {
										q.preventDefault();
									},
									onClick: () => R(j),
									children: j.label,
								},
								j.userId,
							),
						),
					],
				}),
				(0, S.jsx)("span", { id: n, className: "composer-hint", children: "Enter sends · Shift+Enter for a new line" }),
				f
					? (0, S.jsx)(oM, {
							client: e.client,
							onPick: (j) => {
								(o((q) => (q.some((K) => K.fileNodeId === j.fileNodeId) ? q : [...q, j])), h(!1));
							},
							onClose: () => h(!1),
						})
					: null,
			],
		})
	);
}
function vM(e) {
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
					? (h.preventDefault(), s.current[(m + 1) % Xa.length]?.focus())
					: (h.key === "ArrowLeft" || h.key === "ArrowUp") &&
						(h.preventDefault(), s.current[(m + Xa.length - 1) % Xa.length]?.focus());
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
						children: Xa.map((h, m) => {
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
									"aria-label": vb[h],
									onKeyDown: (g) => f(g, m),
									onClick: () => {
										(e.onPick(h, v), o());
									},
									children: (0, S.jsx)("span", { "aria-hidden": "true", children: mb[h] }),
								},
								h,
							);
						}),
					})
				: null,
		],
	});
}
var kS = 1440 * 60 * 1e3,
	gM = 300 * 1e3;
function yM(e) {
	return new Date(e).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" });
}
function th(e) {
	return new Date(e).toLocaleDateString(void 0, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}
function pM(e, n) {
	const r = new Date(e).toDateString();
	return r === new Date(n).toDateString() ? "Today" : r === new Date(n - kS).toDateString() ? "Yesterday" : th(e);
}
function bM(e) {
	if (e == null) return "•";
	const n = e.split(/\s+/u).filter((u) => u !== "");
	if (n.length === 0) return "•";
	const r = n.length > 1 ? n[n.length - 1][0] : "";
	return `${n[0][0]}${r}`.toUpperCase();
}
function MS(e, n, r = null) {
	const u = [];
	let s = null,
		o = !1;
	for (const f of e) {
		const h = s !== null && new Date(s.timestamp).toDateString() !== new Date(f.timestamp).toDateString();
		h && u.push({ kind: "divider", key: `divider:${f.key}`, label: pM(f.timestamp, n) });
		const m =
			!o && r !== null && f.timestamp > r.lastReadAt && f.createdBy !== r.selfUserId && f.value.deletedAt === null;
		m && ((o = !0), u.push({ kind: "new", key: `new:${f.key}` }));
		const v = s !== null && !h && !m && s.createdBy === f.createdBy && f.timestamp - s.timestamp <= gM;
		(u.push({ kind: "message", doc: f, isContinuation: v }), (s = f));
	}
	return u;
}
function SM(e, n, r) {
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
function nh(e) {
	const { client: n, collection: r, doc: u, isOwn: s } = e,
		o = (0, w.useId)(),
		[f, h] = (0, w.useState)(!1),
		[m, v] = (0, w.useState)(""),
		[g, _] = (0, w.useState)(!1),
		[b, p] = (0, w.useState)(null),
		[E, x] = (0, w.useState)(!1),
		k = (0, w.useRef)(null),
		D = (0, w.useRef)(null);
	(0, w.useEffect)(() => {
		f && k.current?.focus();
	}, [f]);
	const C = (B, se) => {
			(_(!0),
				p(null),
				n.data
					.put({ collection: r, key: u.key, value: B, expectedRevision: u.revision })
					.then((X) => {
						if ((_(!1), "_nay" in X)) {
							if (X._nay.name === "storage_full") {
								e.onStorageFull(X._nay.message);
								return;
							}
							p(X._nay.message);
							return;
						}
						(e.onApplyLocal({ ...u, value: B, revision: X._yay.revision, updatedAt: Date.now() }), se());
					})
					.catch((X) => {
						(_(!1), p(Xn(X)));
					}));
		},
		A = () => {
			if (g) return;
			const B = m.trim();
			B !== "" &&
				C({ ...u.value, text: B, editedAt: Date.now() }, () => {
					(h(!1), D.current?.focus());
				});
		},
		R = () => {
			(h(!1), D.current?.focus());
		},
		M = () => {
			C({ ...u.value, deletedAt: Date.now() }, () => {
				x(!1);
			});
		},
		Y = (B, se) => {
			if ((p(null), e.reactionGroups === "unknown" && se)) {
				p("Reactions on this message could not be loaded, so they can't be removed right now.");
				return;
			}
			(se
				? n.data.removeOwned({ collection: "reactions", key: k0(u.key, B) })
				: n.data.putOwned({ collection: "reactions", key: k0(u.key, B), value: {} })
			)
				.then((X) => {
					if ("_nay" in X) {
						if (X._nay.name === "storage_full") {
							e.onStorageFull(X._nay.message);
							return;
						}
						p(X._nay.message);
					}
				})
				.catch((X) => {
					p(Xn(X));
				});
		},
		P = u.value.deletedAt !== null,
		j = e.authorName === null ? "Former member" : (e.authorName ?? "…"),
		q = Date.now() - u.timestamp < 7 * kS,
		K = e.onOpenThread !== null && typeof e.replyCount == "number" && e.replyCount > 0;
	return (0, S.jsxs)("li", {
		className: e.isContinuation ? "message is-continuation" : "message is-leader",
		"data-key": u.key,
		children: [
			(0, S.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: bM(e.authorName) }),
			(0, S.jsxs)("div", {
				className: e.isContinuation ? "message-head visually-hidden" : "message-head",
				children: [
					(0, S.jsx)("span", { className: "message-author", children: j }),
					(0, S.jsxs)("time", {
						className: "message-time",
						dateTime: new Date(u.timestamp).toISOString(),
						children: [
							q ? (0, S.jsxs)("span", { className: "visually-hidden", children: [th(u.timestamp), " "] }) : null,
							(0, S.jsx)("span", { className: "message-clock", children: q ? yM(u.timestamp) : th(u.timestamp) }),
						],
					}),
				],
			}),
			P
				? (0, S.jsx)("p", { className: "message-text is-deleted", children: "Message deleted" })
				: f
					? (0, S.jsxs)("div", {
							className: "message-edit",
							children: [
								(0, S.jsx)("textarea", {
									ref: k,
									className: "composer-input",
									"aria-label": "Edit message",
									rows: 2,
									value: m,
									onInput: (B) => v(B.currentTarget.value),
									onKeyDown: (B) => {
										B.key === "Escape"
											? (B.preventDefault(), R())
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
											onClick: R,
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
										SM(u.value, e.memberNames, e.selfUserId),
										u.value.editedAt !== null
											? (0, S.jsx)("span", { className: "message-edited", children: " (edited)" })
											: null,
									],
								}),
								u.value.attachments.length > 0 ? (0, S.jsx)(sM, { client: n, attachments: u.value.attachments }) : null,
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
															"aria-label": `${vb[B.token]}, ${B.count} ${B.count === 1 ? "reaction" : "reactions"}`,
															onClick: () => Y(B.token, B.reactedByMe),
															children: [
																(0, S.jsx)("span", { "aria-hidden": "true", children: mb[B.token] }),
																(0, S.jsx)("span", { className: "reaction-chip-count", children: B.count }),
															],
														},
														B.token,
													),
												),
											})
										: null,
								K && typeof e.replyCount == "number"
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
													children: `${FR(e.replyCount, e.repliesHasMore)} ${e.replyCount === 1 ? "reply" : "replies"}`,
												}),
												e.replyLatestAt !== null
													? (0, S.jsx)("span", {
															className: "message-thread-summary-recency",
															children: `Last reply ${zo(e.replyLatestAt, Date.now())}`,
														})
													: null,
											],
										})
									: null,
							],
						}),
			!P && !f
				? (0, S.jsxs)("div", {
						className: "message-actions",
						children: [
							e.onOpenThread !== null && e.replyCount !== null && !K
								? (0, S.jsx)("button", {
										ref: e.replyTriggerRef ?? void 0,
										type: "button",
										className: "button message-action",
										onClick: () => e.onOpenThread?.(u),
										children: e.replyCount === "unknown" ? "View thread" : "Reply in thread",
									})
								: null,
							(0, S.jsx)(vM, { groups: e.reactionGroups === "unknown" ? [] : e.reactionGroups, onPick: Y }),
							s
								? (0, S.jsxs)(S.Fragment, {
										children: [
											(0, S.jsx)("button", {
												ref: D,
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
				? (0, S.jsxs)(Ll, {
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
										onClick: M,
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
function zS(e) {
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
function oo(e, n) {
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
function _M(e) {
	const { client: n, userId: r, root: u, memberNames: s } = e,
		[o, f] = (0, w.useState)([]),
		[h, m] = (0, w.useState)(!1),
		[v, g] = (0, w.useState)(!1),
		[_, b] = (0, w.useState)(null),
		p = (0, w.useRef)(null),
		E = (0, w.useRef)(null);
	((0, w.useEffect)(() => {
		E.current?.focus();
	}, []),
		(0, w.useEffect)(() => {
			const C = Sb(pl);
			return (
				(p.current = C),
				n.data.watch({ collection: "replies", keyPrefix: N0(u.key), limit: 100 }, (A, R) => {
					if (A === null) {
						(b({ reason: R?.reason }), m(!0));
						return;
					}
					(b(null), C.apply_window(A.docs), f(C.get_sorted()), m(!0), g(A.truncated));
				})
			);
		}, [n, u.key]));
	const x = OS({
		client: n,
		collection: "replies",
		keyPrefix: N0(u.key),
		userId: r,
		onDelivered: (C) => {
			(p.current?.apply_local(C), f(p.current?.get_sorted() ?? []));
		},
		onStorageFull: e.onStorageFull,
	});
	(0, w.useEffect)(() => {
		const C = new Set();
		for (const A of o) {
			C.add(A.createdBy);
			for (const R of A.value.mentions ?? []) C.add(R);
		}
		C.size > 0 && s.resolve([...C]);
	}, [o, s]);
	const k = (C) => {
			C.key === "Escape" && (C.stopPropagation(), e.onClose());
		},
		D = MS([...o].reverse(), Date.now());
	return (0, S.jsxs)("section", {
		className: "thread",
		"aria-label": "Thread",
		onKeyDown: k,
		children: [
			(0, S.jsxs)("div", {
				className: "thread-head",
				children: [
					(0, S.jsx)("h3", { className: "thread-title", children: "Thread" }),
					(0, S.jsx)("button", {
						ref: E,
						type: "button",
						className: "button",
						onClick: e.onClose,
						children: e.isNarrow ? "Back to messages" : "Close thread",
					}),
				],
			}),
			(0, S.jsx)("ul", {
				className: "message-list thread-root",
				children: (0, S.jsx)(nh, {
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
					onStorageFull: e.onStorageFull,
				}),
			}),
			_ !== null
				? (0, S.jsx)("div", {
						className: "channel-status is-error",
						role: "alert",
						children: oo(_.reason, "the replies in this thread"),
					})
				: null,
			v
				? (0, S.jsx)("div", {
						className: "channel-status",
						role: "status",
						children: "Only the newest 100 replies are shown.",
					})
				: null,
			h
				? o.length === 0 && x.pending.length === 0
					? (0, S.jsx)("div", { className: "channel-status", children: "No replies yet" })
					: (0, S.jsxs)("ul", {
							className: "message-list thread-replies",
							children: [
								D.map((C) =>
									C.kind === "divider"
										? (0, S.jsx)("li", { className: "day-divider", children: C.label }, C.key)
										: C.kind === "new"
											? null
											: (0, S.jsx)(
													nh,
													{
														client: n,
														collection: "replies",
														doc: C.doc,
														isOwn: C.doc.createdBy === r,
														selfUserId: r,
														memberNames: s,
														isContinuation: C.isContinuation,
														authorName: s.get(C.doc.createdBy),
														reactionGroups: e.reactionGroupsByTarget.get(C.doc.key) ?? [],
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
													C.doc.key,
												),
								),
								x.pending.map((C) => (0, S.jsx)(zS, { pending: C, onRetry: () => x.retry(C) }, C.clientRequestId)),
							],
						})
				: (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading replies…" }),
			e.storageFull !== null
				? (0, S.jsx)("div", { className: "channel-status is-error", role: "alert", children: e.storageFull })
				: null,
			(0, S.jsx)(NS, {
				client: n,
				label: "Reply in thread",
				busy: x.busy,
				disabled: e.storageFull !== null || _ !== null,
				onSend: x.send,
			}),
		],
	});
}
var wM = 15e3;
function yp(e, n) {
	return e.incomplete || e.death !== null ? !1 : !e.hasMore || (e.deepestRoot !== null && n < e.deepestRoot);
}
var ol = 55,
	EM = 100,
	pp = 420,
	uo = 244,
	Nd = 340,
	bp = 16;
function TM(e) {
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
function xM(e) {
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
		[x, k] = (0, w.useState)(null),
		[D, C] = (0, w.useState)({ hasMore: !1, atCapacity: !1, incomplete: !1 }),
		[A, R] = (0, w.useState)([]),
		[M, Y] = (0, w.useState)([]),
		[P, j] = (0, w.useState)({ hasMore: !1, deepestRoot: null, incomplete: !1, death: null }),
		[q, K] = (0, w.useState)({ hasMore: !1, deepestRoot: null, incomplete: !1, death: null }),
		[B, se] = (0, w.useState)(null),
		[X, F] = (0, w.useState)({ kind: "idle" }),
		[ae, O] = (0, w.useState)(Nd),
		[$, H] = (0, w.useState)(0),
		le = (0, w.useRef)(null),
		he = (0, w.useRef)(null),
		Re = (0, w.useRef)(null),
		N = (0, w.useRef)(null),
		G = (0, w.useRef)(null),
		ie = (0, w.useRef)(null),
		oe = (0, w.useRef)(null),
		ge = (0, w.useRef)(null),
		ye = (0, w.useRef)(null),
		Se = (0, w.useRef)(null),
		Pe = (0, w.useRef)(u.value.name),
		ze = (0, w.useRef)(null),
		rt = (0, w.useRef)(new Map()),
		Nt = (0, w.useRef)(null),
		Ht = (0, w.useRef)(null),
		Qt = (0, w.useRef)(0);
	(0, w.useEffect)(() => {
		Pe.current = u.value.name;
	}, [u.value.name]);
	const it = () => {
		const re = oe.current;
		if (re !== null)
			for (const ve of [
				{ coverage: G.current, windowHandle: Re.current },
				{ coverage: ie.current, windowHandle: N.current },
			])
				ve.coverage === null ||
					!ve.coverage.hasMore ||
					ve.coverage.atCapacity ||
					((ve.coverage.deepestRoot === null || ve.coverage.deepestRoot < re) && ve.windowHandle?.loadOlder());
	};
	((0, w.useEffect)(() => {
		const re = Sb(pl);
		le.current = re;
		const ve = n.data.watchWindow({ collection: "messages", keyPrefix: sl(u.key), pageSize: 100 }, (_e, xt) => {
			if (_e === null) {
				k({ reason: xt?.reason });
				return;
			}
			const Ve = re.apply_window(_e.docs);
			(b(re.get_sorted()), E(!0), C({ hasMore: _e.hasMore, atCapacity: _e.atCapacity, incomplete: _e.incomplete }));
			const Kt = Ve.reduce((ut, Nn) => (ut === null || Nn.key > ut ? Nn.key : ut), null);
			((ge.current = Kt), (oe.current = Kt === null ? null : Kt.slice(0, ol)), it());
			const an = ze.current;
			if (an === null) {
				ze.current = new Set(Ve.map((ut) => ut.key));
				return;
			}
			const Pi = Ve.filter((ut) => !an.has(ut.key) && ut.createdBy !== r && ut.value.deletedAt === null);
			for (const ut of Ve) an.add(ut.key);
			if (Pi.length === 1) {
				const ut = Pi[0];
				s.resolve([ut.createdBy])
					.then(() => {
						const Nn = s.get(ut.createdBy) ?? null,
							kn = ut.value.text,
							wn = kn.length > 80 ? `${kn.slice(0, 80)}…` : kn;
						o(`${Nn ?? "Former member"}: ${wn}`);
					})
					.catch(() => {
						o(`New message in #${Pe.current}`);
					});
			} else Pi.length > 1 && o(`${Pi.length} new messages in #${Pe.current}`);
		});
		return (
			(he.current = ve),
			() => {
				((he.current = null), ve.unsubscribe());
			}
		);
	}, [n, u.key, r, s, o]),
		(0, w.useEffect)(() => {
			const re = eu(BR),
				ve = n.data.watchWindow({ collection: "reactions", keyPrefix: sl(u.key), pageSize: 100 }, (_e, xt) => {
					if (_e === null) {
						((G.current = null), j((an) => ({ ...an, death: { reason: xt?.reason } })));
						return;
					}
					const Ve = re.apply_window(_e.docs);
					R(Ve);
					const Kt = Ve.length > 0 ? Ve[Ve.length - 1].key.slice(0, ol) : null;
					((G.current = { hasMore: _e.hasMore, atCapacity: _e.atCapacity, deepestRoot: Kt, incomplete: _e.incomplete }),
						j({ hasMore: _e.hasMore, deepestRoot: Kt, incomplete: _e.incomplete, death: null }),
						it());
				});
			return (
				(Re.current = ve),
				() => {
					((Re.current = null), (G.current = null), ve.unsubscribe());
				}
			);
		}, [n, u.key]),
		(0, w.useEffect)(() => {
			const re = eu(pl),
				ve = n.data.watchWindow({ collection: "replies", keyPrefix: sl(u.key), pageSize: 100 }, (_e, xt) => {
					if (_e === null) {
						((ie.current = null), K((an) => ({ ...an, death: { reason: xt?.reason } })));
						return;
					}
					const Ve = re.apply_window(_e.docs);
					Y(Ve);
					const Kt = Ve.length > 0 ? Ve[Ve.length - 1].key.slice(0, ol) : null;
					((ie.current = {
						hasMore: _e.hasMore,
						atCapacity: _e.atCapacity,
						deepestRoot: Kt,
						incomplete: _e.incomplete,
					}),
						K({ hasMore: _e.hasMore, deepestRoot: Kt, incomplete: _e.incomplete, death: null }),
						it());
				});
			return (
				(N.current = ve),
				() => {
					((N.current = null), (ie.current = null), ve.unsubscribe());
				}
			);
		}, [n, u.key]));
	const fe = (0, w.useRef)(null),
		Ee = (re, ve) => {
			n.data
				.put({
					collection: "channels",
					key: re.key,
					value: { ...re.value, lastMessageAt: ve },
					expectedRevision: re.revision,
				})
				.then((_e) => {
					"_nay" in _e && _e._nay.name === "conflict" && fe.current === null && (fe.current = ve);
				})
				.catch(() => {});
		};
	(0, w.useEffect)(() => {
		const re = fe.current;
		re !== null && ((fe.current = null), (u.value.lastMessageAt ?? 0) < re && Ee(u, re));
	}, [u]);
	const Be = OS({
		client: n,
		collection: "messages",
		keyPrefix: sl(u.key),
		userId: r,
		onDelivered: (re) => {
			(le.current?.apply_local(re),
				ze.current?.add(re.key),
				b(le.current?.get_sorted() ?? []),
				li(u.key) && re.timestamp - (u.value.lastMessageAt ?? 0) >= wM && Ee(u, re.timestamp));
		},
		onStorageFull: se,
	});
	((0, w.useEffect)(() => {
		const re = new Set();
		for (const ve of _) {
			re.add(ve.createdBy);
			for (const _e of ve.value.mentions ?? []) re.add(_e);
		}
		for (const ve of M) {
			re.add(ve.createdBy);
			for (const _e of ve.value.mentions ?? []) re.add(_e);
		}
		re.size > 0 && s.resolve([...re]);
	}, [_, M, s]),
		(0, w.useEffect)(() => {
			_.length > 0 && v(_[0].timestamp);
		}, [_, v]),
		(0, w.useEffect)(() => {
			const re = _.length > 0 ? _[0].key : null,
				ve = re !== null && re !== Ht.current,
				_e = Be.pending.length > Qt.current;
			((Ht.current = re),
				(Qt.current = Be.pending.length),
				(ve || _e) && Nt.current && (Nt.current.scrollTop = Nt.current.scrollHeight));
		}, [_, Be.pending.length]));
	const Le = () => {
			he.current?.loadOlder();
		},
		Et = () => {
			const re = ye.current ?? ge.current;
			re !== null &&
				(F({ kind: "loading" }),
				n
					.fetchJson("/api/v1/plugin-data/list", {
						body: { collection: "messages", keyPrefix: sl(u.key), keyStartExclusive: re, limit: EM },
					})
					.then((ve) => {
						const _e = QR.safeParse(ve);
						if (!_e.success) {
							F({ kind: "failed", message: "Unexpected response for older messages.", retryAt: null });
							return;
						}
						const xt = le.current;
						if (xt === null) return;
						const Ve = xt.apply_window(_e.data.documents);
						b(xt.get_sorted());
						for (const Kt of Ve)
							(ze.current?.add(Kt.key), (ye.current === null || Kt.key > ye.current) && (ye.current = Kt.key));
						F(_e.data.isDone ? { kind: "exhausted" } : { kind: "idle" });
					})
					.catch((ve) => {
						if (ve.status !== 429) {
							F({ kind: "failed", message: Xn(ve), retryAt: null });
							return;
						}
						const _e = TM(ve.responseText) ?? 1e3;
						F({
							kind: "failed",
							message: "Older messages are being loaded too quickly. Waiting a moment before you can try again.",
							retryAt: Date.now() + _e,
						});
					}));
		};
	((0, w.useEffect)(() => {
		if (X.kind !== "failed" || X.retryAt === null) return;
		const re = setTimeout(
			() => {
				F({ kind: "idle" });
			},
			Math.max(0, X.retryAt - Date.now()),
		);
		return () => {
			clearTimeout(re);
		};
	}, [X]),
		(0, w.useEffect)(() => {
			const re = Se.current;
			if (f === null || re === null) return;
			H(re.clientWidth);
			const ve = new ResizeObserver(() => H(re.clientWidth));
			return (ve.observe(re), () => ve.disconnect());
		}, [f]));
	const at = (re) => {
			const ve = Math.max(uo, $ - pp);
			return Math.min(ve, Math.max(uo, re));
		},
		ue = (re) => {
			re.key === "ArrowLeft"
				? (re.preventDefault(), O(at(ae + bp)))
				: re.key === "ArrowRight"
					? (re.preventDefault(), O(at(ae - bp)))
					: re.key === "Home" && (re.preventDefault(), O(at(Nd)));
		},
		Oe = (re) => {
			(re.preventDefault(), re.currentTarget.setPointerCapture(re.pointerId));
		},
		ht = (re) => {
			if (!re.currentTarget.hasPointerCapture(re.pointerId)) return;
			const ve = Se.current?.getBoundingClientRect();
			ve !== void 0 && O(at(ve.right - re.clientX));
		},
		Ne = (0, w.useMemo)(() => YR(A, r), [A, r]),
		Tt = (0, w.useMemo)(() => GR(M), [M]),
		Ft = (re) => {
			(le.current?.apply_local(re), b(le.current?.get_sorted() ?? []));
		},
		St = () => {
			const re = f;
			(h(null), re !== null && rt.current.get(re)?.focus());
		},
		kt = f === null ? null : (_.find((re) => re.key === f) ?? null),
		vu = MS([..._].reverse(), Date.now(), g === null ? null : { lastReadAt: g, selfUserId: r }),
		hi = Math.max(uo, $ - pp),
		ua = at(ae);
	return x !== null
		? (0, S.jsx)("div", {
				className: "channel",
				children: (0, S.jsx)("div", {
					className: "channel-dead",
					role: "alert",
					children: oo(x.reason, `messages in #${u.value.name}`),
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
									li(u.key) ? (0, S.jsx)("p", { className: "channel-privacy", children: mh }) : null,
								],
							}),
							u.value.archivedAt !== null
								? (0, S.jsx)("span", { className: "channel-archived-badge", children: "Archived" })
								: null,
						],
					}),
					(0, S.jsxs)("div", {
						ref: Se,
						className: "channel-body",
						style: { "--thread-width": `${ua}px` },
						children: [
							(0, S.jsxs)("div", {
								ref: Nt,
								className: "message-log",
								role: "log",
								"aria-live": "off",
								"aria-label": `Messages in #${u.value.name}`,
								children: [
									p && D.hasMore && !D.atCapacity
										? (0, S.jsx)("div", {
												className: "log-older",
												children: (0, S.jsx)("button", {
													type: "button",
													className: "button",
													onClick: Le,
													children: "Load older",
												}),
											})
										: null,
									p && D.hasMore && D.atCapacity
										? (0, S.jsxs)("div", {
												className: "log-older",
												children: [
													(0, S.jsx)("span", {
														className: "channel-status",
														role: "status",
														children:
															X.kind === "loading"
																? "Loading older messages…"
																: X.kind === "exhausted"
																	? `You have reached the start of #${u.value.name}.`
																	: "The live view stopped growing. Older messages load on request.",
													}),
													X.kind === "exhausted"
														? null
														: (0, S.jsx)("button", {
																type: "button",
																className: "button",
																disabled: X.kind === "loading" || (X.kind === "failed" && X.retryAt !== null),
																onClick: Et,
																children: "Load older messages",
															}),
													X.kind === "failed"
														? (0, S.jsx)("span", {
																className: "channel-status is-error",
																role: "alert",
																children: X.message,
															})
														: null,
												],
											})
										: null,
									D.incomplete
										? (0, S.jsx)("div", {
												className: "channel-status",
												role: "alert",
												children: "Older messages in view may be out of date.",
											})
										: null,
									P.incomplete || q.incomplete
										? (0, S.jsx)("div", {
												className: "channel-status",
												role: "alert",
												children: "Some reactions and replies in this range could not be loaded.",
											})
										: null,
									P.death !== null
										? (0, S.jsx)("div", {
												className: "channel-status is-error",
												role: "alert",
												children: oo(P.death.reason, "reactions in this channel"),
											})
										: null,
									q.death !== null
										? (0, S.jsx)("div", {
												className: "channel-status is-error",
												role: "alert",
												children: oo(q.death.reason, "reply counts in this channel"),
											})
										: null,
									p
										? _.length === 0 && Be.pending.length === 0
											? (0, S.jsx)("div", { className: "channel-status", children: "No messages yet" })
											: (0, S.jsxs)("ul", {
													className: "message-list",
													children: [
														vu.map((re) =>
															re.kind === "divider"
																? (0, S.jsx)("li", { className: "day-divider", children: re.label }, re.key)
																: re.kind === "new"
																	? (0, S.jsx)(
																			"li",
																			{
																				className: "new-divider",
																				children: (0, S.jsx)("span", {
																					className: "new-divider-label",
																					children: "New messages",
																				}),
																			},
																			re.key,
																		)
																	: (0, S.jsx)(
																			nh,
																			{
																				client: n,
																				collection: "messages",
																				doc: re.doc,
																				isOwn: re.doc.createdBy === r,
																				selfUserId: r,
																				memberNames: s,
																				isContinuation: re.isContinuation,
																				authorName: s.get(re.doc.createdBy),
																				reactionGroups: yp(P, re.doc.key.slice(0, ol))
																					? (Ne.get(re.doc.key) ?? [])
																					: "unknown",
																				replyCount: yp(q, re.doc.key.slice(0, ol))
																					? (Tt.get(re.doc.key)?.count ?? 0)
																					: "unknown",
																				replyLatestAt: Tt.get(re.doc.key)?.latestAt ?? null,
																				repliesHasMore: q.hasMore,
																				onOpenThread: (ve) => h(ve.key),
																				replyTriggerRef: (ve) => {
																					ve === null ? rt.current.delete(re.doc.key) : rt.current.set(re.doc.key, ve);
																				},
																				onApplyLocal: Ft,
																				onStorageFull: se,
																			},
																			re.doc.key,
																		),
														),
														Be.pending.map((re) =>
															(0, S.jsx)(zS, { pending: re, onRetry: () => Be.retry(re) }, re.clientRequestId),
														),
													],
												})
										: (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading messages…" }),
								],
							}),
							kt !== null
								? (0, S.jsx)("div", {
										className: "thread-resize",
										role: "separator",
										tabIndex: 0,
										"aria-orientation": "vertical",
										"aria-label": "Resize thread panel",
										"aria-valuenow": ua,
										"aria-valuemin": uo,
										"aria-valuemax": hi,
										onKeyDown: ue,
										onPointerDown: Oe,
										onPointerMove: ht,
										onDoubleClick: () => O(at(Nd)),
									})
								: null,
							kt !== null
								? (0, S.jsx)(
										_M,
										{
											client: n,
											userId: r,
											root: kt,
											reactionGroupsByTarget: Ne,
											memberNames: s,
											isNarrow: m,
											storageFull: B,
											onStorageFull: se,
											onApplyLocalRoot: Ft,
											onClose: St,
										},
										kt.key,
									)
								: null,
						],
					}),
					B !== null ? (0, S.jsx)("div", { className: "channel-status is-error", role: "alert", children: B }) : null,
					(0, S.jsx)(NS, {
						client: n,
						label: `Message #${u.value.name}`,
						busy: Be.busy,
						disabled: B !== null,
						onSend: Be.send,
					}),
				],
			});
}
var ql = di([Cl], [Uo]),
	AM = ql.useContext,
	CM = ql.useScopedContext,
	nD = ql.useProviderContext,
	iD = ql.ContextProvider,
	rD = ql.ScopedContextProvider,
	aD = (0, w.createContext)(void 0),
	Ul = di([Ib], [Zo]),
	uD = Ul.useContext,
	lD = Ul.useScopedContext,
	Yh = Ul.useProviderContext,
	RM = Ul.ContextProvider,
	DS = Ul.ScopedContextProvider,
	$l = di([Cl, RM], [Uo, DS]),
	OM = $l.useContext,
	NM = $l.useScopedContext,
	Wo = $l.useProviderContext,
	jS = $l.ContextProvider,
	kM = $l.ScopedContextProvider,
	sD = (0, w.createContext)(void 0),
	MM = "div",
	Li = "";
function kd() {
	Li = "";
}
function zM(e) {
	const n = e.target;
	return n && fi(n)
		? !1
		: e.key === " " && Li.length
			? !0
			: e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey && /^[\p{Letter}\p{Number}]$/u.test(e.key);
}
function DM(e, n) {
	if (On(e)) return !0;
	const r = e.target;
	return r ? n.some((u) => u.element === r) : !1;
}
function jM(e) {
	return e.filter((n) => !n.disabled);
}
function co(e, n) {
	var r;
	const u = ((r = e.element) == null ? void 0 : r.textContent) || e.children || ("value" in e && e.value);
	return u ? Cb(u).trim().toLowerCase().startsWith(n.toLowerCase()) : !1;
}
function LM(e, n, r) {
	if (!r) return e;
	const u = e.find((s) => s.id === r);
	return !u || !co(u, n) || (Li !== n && co(u, Li))
		? e
		: ((Li = n),
			hO(
				e.filter((s) => co(s, Li)),
				r,
			).filter((s) => s.id !== r));
}
var Gh = Ge(function ({ store: n, typeahead: r = !0, ...u }) {
		const s = Th();
		((n = n || s), Zt(n, !1));
		const o = u.onKeyDownCapture,
			f = (0, w.useRef)(0),
			h = xe((m) => {
				if ((o?.(m), m.defaultPrevented || !r || !n)) return;
				if (!zM(m)) return kd();
				const { renderedItems: v, items: g, activeId: _, id: b } = n.getState();
				let p = jM(g.length > v.length ? g : v);
				const E = ot(m.currentTarget),
					x = `[data-offscreen-id="${b}"]`,
					k = E.querySelectorAll(x);
				for (const A of k) {
					const R = A.ariaDisabled === "true" || ("disabled" in A && !!A.disabled);
					p.push({ id: A.id, element: A, disabled: R });
				}
				if ((k.length && (p = xb(p, (A) => A.element)), !DM(m, p))) return kd();
				(m.preventDefault(),
					window.clearTimeout(f.current),
					(f.current = window.setTimeout(() => {
						Li = "";
					}, 500)));
				const D = m.key.toLowerCase();
				((Li += D), (p = LM(p, D, _)));
				const C = p.find((A) => co(A, Li));
				C ? n.move(C.id) : kd();
			});
		return ((u = { ...u, onKeyDownCapture: h }), ra(u));
	}),
	oD = Ie(function (n) {
		return Ye(MM, Gh(n));
	}),
	qM = "div";
function UM({ store: e, ...n }) {
	const [r, u] = (0, w.useState)(void 0),
		s = n["aria-label"],
		o = Bt(e, "disclosureElement"),
		f = Bt(e, "contentElement");
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
var LS = Ge(function ({ store: n, alwaysVisible: r, composite: u, ...s }) {
		const o = Wo();
		((n = n || o), Zt(n, !1));
		const f = n.parent,
			h = n.menubar,
			m = !!f,
			v = Zi(s.id),
			g = s.onKeyDown,
			_ = n.useState((R) => R.placement.split("-")[0]),
			b = n.useState((R) => (R.orientation === "both" ? void 0 : R.orientation)),
			p = b !== "vertical",
			E = Bt(h, (R) => !!R && R.orientation !== "vertical"),
			x = xe((R) => {
				if ((g?.(R), !R.defaultPrevented)) {
					if (m || (h && !p)) {
						const M = {
							ArrowRight: () => _ === "left" && !p,
							ArrowLeft: () => _ === "right" && !p,
							ArrowUp: () => _ === "bottom" && p,
							ArrowDown: () => _ === "top" && p,
						}[R.key];
						if (M?.()) return (R.stopPropagation(), R.preventDefault(), n?.hide());
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
							}[R.key],
							Y = M?.();
						Y !== void 0 && (R.stopPropagation(), R.preventDefault(), h.move(Y));
					}
				}
			});
		s = rn(s, (R) => (0, S.jsx)(kM, { value: n, children: R }), [n]);
		const k = UM({ store: n, ...s }),
			D = Ko(n.useState("mounted"), s.hidden, r),
			C = D ? { ...s.style, display: "none" } : s.style;
		s = {
			id: v,
			"aria-labelledby": k,
			hidden: D,
			...s,
			ref: Ot(v ? n.setContentElement : null, s.ref),
			style: C,
			onKeyDown: x,
		};
		const A = !!n.combobox;
		return (
			(u = u ?? !A),
			u && (s = { role: "menu", "aria-orientation": b, ...s }),
			(s = Ch({ store: n, composite: u, ...s })),
			(s = Gh({ store: n, typeahead: !A, ...s })),
			s
		);
	}),
	cD = Ie(function (n) {
		return Ye(qM, LS(n));
	});
function Md(e) {
	return [e.clientX, e.clientY];
}
function Sp(e, n) {
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
function $M(e, n) {
	const { top: r, right: u, bottom: s, left: o } = n,
		[f, h] = e;
	return [f < o ? "left" : f > u ? "right" : null, h < r ? "top" : h > s ? "bottom" : null];
}
function _p(e, n) {
	const r = e.getBoundingClientRect(),
		{ top: u, right: s, bottom: o, left: f } = r,
		[h, m] = $M(n, r),
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
var BM = "div";
function qS(e, n, r, u) {
	return pr(n) ? !0 : e ? !!(Vt(n, e) || (r && Vt(r, e)) || u?.some((s) => qS(e, s, r))) : !1;
}
function IM({ store: e, ...n }) {
	const [r, u] = (0, w.useState)(!1),
		s = e.useState("mounted");
	(0, w.useEffect)(() => {
		s || u(!1);
	}, [s]);
	const o = n.onFocus,
		f = xe((m) => {
			(o?.(m), !m.defaultPrevented && u(!0));
		}),
		h = (0, w.useRef)(null);
	return (
		(0, w.useEffect)(
			() =>
				un(e, ["anchorElement"], (m) => {
					h.current = m.anchorElement;
				}),
			[],
		),
		(n = { autoFocusOnHide: r, finalFocus: h, ...n, onFocus: f }),
		n
	);
}
var wp = (0, w.createContext)(null),
	US = Ge(function ({
		store: n,
		modal: r = !1,
		portal: u = !!r,
		hideOnEscape: s = !0,
		hideOnHoverOutside: o = !0,
		disablePointerEventsOnApproach: f = !!o,
		...h
	}) {
		const m = Yh();
		((n = n || m), Zt(n, !1));
		const v = (0, w.useRef)(null),
			[g, _] = (0, w.useState)([]),
			b = (0, w.useRef)(0),
			p = (0, w.useRef)(null),
			{ portalRef: E, domReady: x } = _h(u, h.portalRef),
			k = wh(),
			D = !!o,
			C = ft(o),
			A = !!f,
			R = ft(f),
			M = n.useState("open"),
			Y = n.useState("mounted");
		((0, w.useEffect)(() => {
			if (!x || !Y || (!D && !A)) return;
			const B = v.current;
			return B
				? Sn(
						nn(
							"mousemove",
							(X) => {
								if (!n || !k()) return;
								const { anchorElement: F, hideTimeout: ae, timeout: O } = n.getState(),
									$ = p.current,
									[H] = X.composedPath(),
									le = F;
								if (qS(H, B, le, g)) {
									((p.current = H && le && Vt(le, H) ? Md(X) : null), window.clearTimeout(b.current), (b.current = 0));
									return;
								}
								if (!b.current) {
									if ($) {
										const he = Md(X);
										if (Sp(he, _p(B, $))) {
											if (((p.current = he), !R(X))) return;
											(X.preventDefault(), X.stopPropagation());
											return;
										}
									}
									C(X) &&
										(b.current = window.setTimeout(() => {
											((b.current = 0), n?.hide());
										}, ae ?? O));
								}
							},
							!0,
						),
						() => clearTimeout(b.current),
					)
				: void 0;
		}, [n, k, x, Y, D, A, g, R, C]),
			(0, w.useEffect)(() => {
				if (!x || !Y || !A) return;
				const B = (se) => {
					const X = v.current;
					if (!X) return;
					const F = p.current;
					if (!F) return;
					const ae = _p(X, F);
					if (Sp(Md(se), ae)) {
						if (!R(se)) return;
						(se.preventDefault(), se.stopPropagation());
					}
				};
				return Sn(nn("mouseenter", B, !0), nn("mouseover", B, !0), nn("mouseout", B, !0), nn("mouseleave", B, !0));
			}, [x, Y, A, R]),
			(0, w.useEffect)(() => {
				x && (M || n?.setAutoFocusOnShow(!1));
			}, [n, x, M]));
		const P = zb(M);
		(0, w.useEffect)(() => {
			if (x)
				return () => {
					P.current || n?.setAutoFocusOnShow(!1);
				};
		}, [n, x]);
		const j = (0, w.useContext)(wp);
		Ke(() => {
			if (r || !u || !Y || !x) return;
			const B = v.current;
			if (B) return j?.(B);
		}, [r, u, Y, x]);
		const q = (0, w.useCallback)(
			(B) => {
				_((X) => [...X, B]);
				const se = j?.(B);
				return () => {
					(_((X) => X.filter((F) => F !== B)), se?.());
				};
			},
			[j],
		);
		((h = rn(h, (B) => (0, S.jsx)(DS, { value: n, children: (0, S.jsx)(wp.Provider, { value: q, children: B }) }), [
			n,
			q,
		])),
			(h = { ...h, ref: Ot(v, h.ref) }),
			(h = IM({ store: n, ...h })));
		const K = n.useState((B) => r || B.autoFocusOnShow);
		return (
			(h = Kh({
				store: n,
				modal: r,
				portal: u,
				autoFocusOnShow: K,
				...h,
				portalRef: E,
				hideOnEscape(B) {
					return jo(s, B)
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
	fD = Dl(
		Ie(function (n) {
			return Ye(BM, US(n));
		}),
		Yh,
	),
	VM = "div",
	ZM = Ge(function ({
		store: n,
		modal: r = !1,
		portal: u = !!r,
		hideOnEscape: s = !0,
		autoFocusOnShow: o = !0,
		hideOnHoverOutside: f,
		alwaysVisible: h,
		...m
	}) {
		const v = Wo();
		((n = n || v), Zt(n, !1));
		const g = (0, w.useRef)(null),
			_ = n.parent,
			b = n.menubar,
			p = !!_,
			E = !!b && !p;
		m = { ...m, ref: Ot(g, m.ref) };
		const { "aria-labelledby": x, ...k } = LS({ store: n, alwaysVisible: h, ...m });
		m = k;
		const [D, C] = (0, w.useState)(),
			A = n.useState("autoFocusOnShow"),
			R = n.useState("initialFocus"),
			M = n.useState("baseElement"),
			Y = n.useState("renderedItems");
		(0, w.useEffect)(() => {
			let X = !1;
			return (
				C((F) => {
					var ae, O, $;
					if (X || !A) return;
					if ((ae = F?.current) != null && ae.isConnected) return F;
					const H = (0, w.createRef)();
					switch (R) {
						case "first":
							H.current = ((O = Y.find((le) => !le.disabled && le.element)) == null ? void 0 : O.element) || null;
							break;
						case "last":
							H.current =
								(($ = [...Y].reverse().find((le) => !le.disabled && le.element)) == null ? void 0 : $.element) || null;
							break;
						default:
							H.current = M;
					}
					return H;
				}),
				() => {
					X = !0;
				}
			);
		}, [n, A, R, Y, M]);
		const P = p ? !1 : r,
			j = !!o,
			q = !!D || !!m.initialFocus || !!P,
			K = Bt(n.combobox || n, "contentElement"),
			B = Bt(_?.combobox || _, "contentElement"),
			se = (0, w.useMemo)(() => {
				if (!B || !K) return;
				const X = K.getAttribute("role"),
					F = B.getAttribute("role");
				if (!((F === "menu" || F === "menubar") && X === "menu")) return B;
			}, [K, B]);
		return (
			se !== void 0 && (m = { preserveTabOrderAnchor: se, ...m }),
			(m = US({
				store: n,
				alwaysVisible: h,
				initialFocus: D,
				autoFocusOnShow: j ? q && o : A || !!P,
				...m,
				hideOnEscape(X) {
					return jo(s, X) ? !1 : (n?.hideAll(), !0);
				},
				hideOnHoverOutside(X) {
					const F = n?.getState().disclosureElement;
					return (typeof f == "function" ? f(X) : (f ?? (p ? !0 : E ? (F ? !pr(F) : !0) : !1)))
						? X.defaultPrevented || !p || !F || (OO(F, "mouseout", X), !pr(F))
							? !0
							: (requestAnimationFrame(() => {
									pr(F) || n?.hide();
								}),
								!1)
						: !1;
				},
				modal: P,
				portal: u,
				backdrop: p ? !1 : m.backdrop,
			})),
			(m = { "aria-labelledby": x, ...m }),
			m
		);
	}),
	HM = Dl(
		Ie(function (n) {
			return Ye(VM, ZM(n));
		}),
		Wo,
	),
	PM = "a",
	$S = Ge(function ({ store: n, showOnHover: r = !0, ...u }) {
		const s = Yh();
		((n = n || s), Zt(n, !1));
		const o = Tl(u),
			f = (0, w.useRef)(0);
		((0, w.useEffect)(() => () => window.clearTimeout(f.current), []),
			(0, w.useEffect)(
				() =>
					nn(
						"mouseleave",
						(x) => {
							if (!n) return;
							const { anchorElement: k } = n.getState();
							k && x.target === k && (window.clearTimeout(f.current), (f.current = 0));
						},
						!0,
					),
				[n],
			));
		const h = u.onMouseMove,
			m = ft(r),
			v = wh(),
			g = xe((E) => {
				if ((h?.(E), o || !n || E.defaultPrevented || f.current || !v() || !m(E))) return;
				const x = E.currentTarget;
				(n.setAnchorElement(x), n.setDisclosureElement(x));
				const { showTimeout: k, timeout: D } = n.getState(),
					C = () => {
						((f.current = 0),
							v() &&
								(n?.setAnchorElement(x),
								n?.show(),
								queueMicrotask(() => {
									n?.setDisclosureElement(x);
								})));
					},
					A = k ?? D;
				A === 0 ? C() : (f.current = window.setTimeout(C, A));
			}),
			_ = u.onClick,
			b = xe((E) => {
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
		return ((u = { ...u, ref: Ot(p, u.ref), onMouseMove: g, onClick: b }), (u = Rl(u)), u);
	}),
	dD = Ie(function (n) {
		return Ye(PM, $S(n));
	}),
	QM = "button",
	BS = Ge(function ({ store: n, ...r }) {
		const u = Vo();
		((n = n || u), Zt(n, !1));
		const s = r.onClick,
			o = xe((f) => {
				(n?.setAnchorElement(f.currentTarget), s?.(f));
			});
		return (
			(r = rn(r, (f) => (0, S.jsx)(Zo, { value: n, children: f }), [n])),
			(r = { ...r, onClick: o }),
			(r = Nh({ store: n, ...r })),
			(r = Yb({ store: n, ...r })),
			r
		);
	}),
	hD = Ie(function (n) {
		return Ye(QM, BS(n));
	}),
	KM = "button";
function YM(e, n) {
	return {
		ArrowDown: n === "bottom" || n === "top" ? "first" : !1,
		ArrowUp: n === "bottom" || n === "top" ? "last" : !1,
		ArrowRight: n === "right" ? "first" : !1,
		ArrowLeft: n === "left" ? "first" : !1,
	}[e.key];
}
function Ep(e, n) {
	return !!e?.some((r) => (!r.element || r.element === n ? !1 : r.element.getAttribute("aria-expanded") === "true"));
}
var GM = Ge(function ({ store: n, focusable: r, accessibleWhenDisabled: u, showOnHover: s, ...o }) {
		const f = Wo();
		((n = n || f), Zt(n, !1));
		const h = (0, w.useRef)(null),
			m = n.parent,
			v = n.menubar,
			g = !!m,
			_ = !!v && !g,
			b = Tl(o),
			p = () => {
				const P = h.current;
				P && (n?.setDisclosureElement(P), n?.setAnchorElement(P), n?.show());
			},
			E = o.onFocus,
			x = xe((P) => {
				if ((E?.(P), b || P.defaultPrevented || (n?.setAutoFocusOnShow(!1), n?.setActiveId(null), !v) || !_)) return;
				const { items: j } = v.getState();
				Ep(j, P.currentTarget) && p();
			}),
			k = Bt(n, (P) => P.placement.split("-")[0]),
			D = o.onKeyDown,
			C = xe((P) => {
				if ((D?.(P), b || P.defaultPrevented)) return;
				const j = YM(P, k);
				j && (P.preventDefault(), p(), n?.setAutoFocusOnShow(!0), n?.setInitialFocus(j));
			}),
			A = o.onClick,
			R = xe((P) => {
				if ((A?.(P), P.defaultPrevented || !n)) return;
				const j = !P.detail,
					{ open: q } = n.getState();
				((!q || j) && ((!g || j) && n.setAutoFocusOnShow(!0), n.setInitialFocus(j ? "first" : "container")), g && p());
			});
		((o = rn(o, (P) => (0, S.jsx)(jS, { value: n, children: P }), [n])),
			g && (o = { ...o, render: (0, S.jsx)(xo.div, { render: o.render }) }));
		const M = Zi(o.id),
			Y = Bt(m?.combobox || m, "contentElement");
		return (
			(o = {
				id: M,
				role: g || _ ? Tb(Y, "menuitem") : void 0,
				"aria-haspopup": Do(n.useState("contentElement"), "menu"),
				...o,
				ref: Ot(h, o.ref),
				onFocus: x,
				onKeyDown: C,
				onClick: R,
			}),
			(o = $S({
				store: n,
				focusable: r,
				accessibleWhenDisabled: u,
				...o,
				showOnHover: (P) => {
					if (
						!(() => {
							if (typeof s == "function") return s(P);
							if (s != null) return s;
							if (g) return !0;
							if (!v) return !1;
							const { items: K } = v.getState();
							return _ && Ep(K);
						})()
					)
						return !1;
					const q = _ ? v : m;
					return (q && q.setActiveId(P.currentTarget.id), !0);
				},
			})),
			(o = BS({ store: n, toggleOnClick: !g, focusable: r, accessibleWhenDisabled: u, ...o })),
			(o = Gh({ store: n, typeahead: _, ...o })),
			o
		);
	}),
	FM = Ie(function (n) {
		return Ye(KM, GM(n));
	}),
	XM = "div";
function JM(e, n, r) {
	var u;
	if (!e) return !1;
	if (pr(e)) return !0;
	const s = n?.find((h) => {
			var m;
			return h.element === r ? !1 : ((m = h.element) == null ? void 0 : m.getAttribute("aria-expanded")) === "true";
		}),
		o = (u = s?.element) == null ? void 0 : u.getAttribute("aria-controls");
	if (!o) return !1;
	const f = ot(e).getElementById(o);
	return f ? (pr(f) ? !0 : !!f.querySelector("[role=menuitem][aria-expanded=true]")) : !1;
}
var WM = Ge(function ({
		store: n,
		hideOnClick: r = !0,
		preventScrollOnKeyDown: u = !0,
		focusOnHover: s,
		blurOnHoverEnd: o,
		...f
	}) {
		const h = NM(!0),
			m = CM();
		((n = n || h || m), Zt(n, !1));
		const v = f.onClick,
			g = ft(r),
			_ = "hideAll" in n ? n.hideAll : void 0,
			b = !!_,
			p = xe((E) => {
				(v?.(E),
					!E.defaultPrevented &&
						(Mb(E) || kb(E) || (_ && E.currentTarget.getAttribute("aria-haspopup") !== "menu" && g(E) && _())));
			});
		return (
			(f = {
				role: Tb(
					Bt(n, (E) => ("contentElement" in E ? E.contentElement : null)),
					"menuitem",
				),
				...f,
				onClick: p,
			}),
			(f = Lh({ store: n, preventScrollOnKeyDown: u, ...f })),
			(f = jh({
				store: n,
				...f,
				focusOnHover(E) {
					const x = () => (typeof s == "function" ? s(E) : (s ?? !0));
					if (!n || !x()) return !1;
					const { baseElement: k, items: D } = n.getState();
					return b
						? (E.currentTarget.hasAttribute("aria-expanded") && E.currentTarget.focus(), !0)
						: JM(k, D, E.currentTarget)
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
	ez = qo(
		Ie(function (n) {
			return Ye(XM, WM(n));
		}),
	);
function tz(e = {}) {
	var n;
	const r = (n = e.store) == null ? void 0 : n.getState(),
		u = ES({ ...e, placement: Ce(e.placement, r?.placement, "bottom") }),
		s = Ce(e.timeout, r?.timeout, 500),
		o = ei(
			{
				...u.getState(),
				timeout: s,
				showTimeout: Ce(e.showTimeout, r?.showTimeout),
				hideTimeout: Ce(e.hideTimeout, r?.hideTimeout),
				autoFocusOnShow: Ce(r?.autoFocusOnShow, !1),
			},
			u,
			e.store,
		);
	return { ...u, ...o, setAutoFocusOnShow: (f) => o.setState("autoFocusOnShow", f) };
}
function nz(e, n, r) {
	return (Rt(e, r, "timeout"), Rt(e, r, "showTimeout"), Rt(e, r, "hideTimeout"), TS(e, n, r));
}
function iz({ combobox: e, parent: n, menubar: r, ...u } = {}) {
	const s = !!r && !n,
		o = Po(
			u.store,
			Hb(n, ["values"]),
			zh(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
		);
	const f = o.getState(),
		h = CS({ ...u, store: o, orientation: Ce(u.orientation, f.orientation, "vertical") }),
		m = tz({
			...u,
			store: o,
			placement: Ce(u.placement, f.placement, "bottom-start"),
			timeout: Ce(u.timeout, f.timeout, s ? 0 : 150),
			hideTimeout: Ce(u.hideTimeout, f.hideTimeout, 0),
		}),
		v = ei(
			{
				...h.getState(),
				...m.getState(),
				initialFocus: Ce(f.initialFocus, "container"),
				values: Ce(u.values, f.values, u.defaultValues, {}),
			},
			h,
			m,
			o,
		);
	return (
		on(v, () =>
			un(v, ["mounted"], (g) => {
				g.mounted || v.setState("activeId", null);
			}),
		),
		on(v, () =>
			un(n, ["orientation"], (g) => {
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
								E = Ab(_, p);
							return E === p ? b : { ...b, [g]: E !== void 0 && E };
						}));
			},
		}
	);
}
function rz(e, n, r) {
	return (
		du(n, [r.combobox, r.parent, r.menubar]),
		Rt(e, r, "values", "setValues"),
		Object.assign(nz(RS(e, n, r), n, r), { combobox: r.combobox, parent: r.parent, menubar: r.menubar })
	);
}
function az(e = {}) {
	const n = OM(),
		r = AM(),
		u = Ho();
	e = {
		...e,
		parent: e.parent !== void 0 ? e.parent : n,
		menubar: e.menubar !== void 0 ? e.menubar : r,
		combobox: e.combobox !== void 0 ? e.combobox : u,
	};
	const [s, o] = Qo(iz, e);
	return rz(s, o, e);
}
function uz(e = {}) {
	return (0, S.jsx)(jS, { value: az(e), children: e.children });
}
var lz = (0, w.memo)(function (n) {
		const { channelName: r, items: u } = n;
		return (0, S.jsxs)(uz, {
			placement: "bottom-end",
			children: [
				(0, S.jsx)(FM, {
					className: "ChannelRowMenu-trigger",
					"aria-label": `Actions for #${r}`,
					children: (0, S.jsx)(aO, { size: 16, "aria-hidden": "true" }),
				}),
				(0, S.jsx)(HM, {
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					className: "ChannelRowMenu-popover",
					"aria-label": `Actions for #${r}`,
					children: u.map((s) =>
						(0, S.jsx)(ez, { className: "ChannelRowMenu-item", onClick: s.onSelect, children: s.label }, s.id),
					),
				}),
			],
		});
	}),
	sz = 300 * 1e3;
function oz(e) {
	const n = (0, w.useRef)(new Map()),
		r = (0, w.useRef)(new Map()),
		[, u] = (0, w.useState)(0),
		s = (0, w.useCallback)((f) => (n.current.has(f) ? n.current.get(f) : void 0), []),
		o = (0, w.useCallback)(
			async (f) => {
				const h = Date.now(),
					m = [...new Set(f)].filter((v) => {
						const g = r.current.get(v);
						return g === void 0 || h - g >= sz;
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
function cz(e) {
	const [n, r] = (0, w.useState)(null);
	return (
		(0, w.useEffect)(() => {
			let u = !1;
			return (
				e.members.list({ limit: 100 }).then((s) => {
					if (!u) {
						if ("_nay" in s) {
							r({ members: [], error: bb(s._nay.name), truncated: !1 });
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
function IS(e) {
	const n = cz(e.client);
	if (n === null) return (0, S.jsx)("p", { className: "channel-status", role: "status", children: "Loading people…" });
	if (n.error !== null) return (0, S.jsx)("p", { className: "form-error", role: "alert", children: n.error });
	const r = n.members
		.filter((u) => u.userId !== e.selfUserId)
		.sort((u, s) => so(u.displayName).localeCompare(so(s.displayName)));
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
											so(u.displayName),
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
function Tp(e) {
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
			const D = o.trim();
			if (D.length < 1 || D.length > 64) {
				E("Enter a name between 1 and 64 characters.");
				return;
			}
			const C = h.trim();
			if (C.length > 250) {
				E("Keep the topic under 250 characters.");
				return;
			}
			(E(null), e.onSubmit(D, C, { isPrivate: v, userIds: _ }));
		},
		k = p ?? e.error;
	return (0, S.jsxs)(Ll, {
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
						onInput: (D) => f(D.currentTarget.value),
						onKeyDown: (D) => {
							D.key === "Enter" && (D.preventDefault(), x());
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
						onInput: (D) => m(D.currentTarget.value),
						onKeyDown: (D) => {
							D.key === "Enter" && (D.preventDefault(), x());
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
										onChange: (D) => g(D.currentTarget.checked),
									}),
									"Private channel",
								],
							}),
							v
								? (0, S.jsxs)(S.Fragment, {
										children: [
											(0, S.jsx)("p", { className: "field-note", children: mh }),
											(0, S.jsx)("p", {
												className: "field-note",
												children: "Tick one person for a direct message, or several for a group.",
											}),
											(0, S.jsx)(IS, {
												client: e.privacy.client,
												selfUserId: e.privacy.selfUserId,
												selected: _,
												onToggle: (D, C) => b((A) => (C ? [...A, D] : A.filter((R) => R !== D))),
											}),
										],
									})
								: null,
						],
					})
				: null,
			k !== null ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: k }) : null,
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
function fz(e) {
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
	return (0, S.jsxs)(Ll, {
		labelledBy: n,
		onClose: e.onClose,
		children: [
			(0, S.jsxs)("h2", { id: n, className: "dialog-title", children: ["People in #", e.channel.value.name] }),
			(0, S.jsx)("p", { className: "field-note", children: mh }),
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
							(0, S.jsx)(IS, {
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
function dz(e) {
	const n = (0, w.useId)();
	return (0, S.jsxs)(Ll, {
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
var hz = [
	{ key: "view:unreads", name: "Unreads" },
	{ key: "view:threads", name: "Threads" },
	{ key: "view:activity", name: "Activity" },
];
function Fh(e) {
	return e === null ? "Former member" : (e ?? "…");
}
function Xh(e) {
	return e.length > 80 ? `${e.slice(0, 80)}…` : e;
}
function mz(e) {
	const n = [];
	for (const s of e.channels) {
		if (li(s.key)) {
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
											(0, S.jsx)("span", { className: "view-row-time", children: zo(s.at, u) }),
											s.preview !== null
												? (0, S.jsx)("span", {
														className: "view-row-preview",
														children: `${Fh(r.get(s.preview.createdBy))}: ${Xh(s.preview.value.text)}`,
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
function vz(e) {
	const n = new Map(e.channels.map((o) => [o.key, o])),
		r = [];
	for (const o of e.feed) {
		if (o.value.deletedAt !== null) continue;
		const f = vh(o.key),
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
															(0, S.jsx)("span", { className: "view-row-title", children: Fh(u.get(h.createdBy)) }),
															(0, S.jsx)("span", { className: "view-row-time", children: zo(h.timestamp, s) }),
															(0, S.jsx)("span", { className: "view-row-preview", children: Xh(h.value.text) }),
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
function gz(e) {
	const [n, r] = (0, w.useState)([]),
		[u, s] = (0, w.useState)(!1),
		[o, f] = (0, w.useState)(!1);
	(0, w.useEffect)(() => {
		const _ = eu(pl);
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
		const b = yb(_.key),
			p = b === null ? null : vh(b),
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
												(0, S.jsx)("span", { className: "view-row-time", children: zo(b.newest.timestamp, g) }),
												(0, S.jsx)("span", {
													className: "view-row-preview",
													children: `${b.count} ${b.count === 1 ? "reply" : "replies"} · ${Fh(v.get(b.newest.createdBy))}: ${Xh(b.newest.value.text)}`,
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
function yz(e) {
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
function pz(e) {
	return `--bonobo-${e.replace(/[A-Z]/gu, (n) => `-${n.toLowerCase()}`)}`;
}
var zd = 8,
	bz = 2e3;
function Sz(e) {
	const { client: n } = e,
		r = n.context.userId,
		u = oz(n),
		[s, o] = (0, w.useState)([]),
		[f, h] = (0, w.useState)([]),
		[m, v] = (0, w.useState)({}),
		[g, _] = (0, w.useState)(!1),
		[b, p] = (0, w.useState)(null),
		[E, x] = (0, w.useState)(!1),
		[k, D] = (0, w.useState)(null),
		[C, A] = (0, w.useState)([]),
		[R, M] = (0, w.useState)(!1),
		[Y, P] = (0, w.useState)({}),
		[j, q] = (0, w.useState)(null),
		[K, B] = (0, w.useState)(null),
		[se, X] = (0, w.useState)(null),
		[F, ae] = (0, w.useState)(!1),
		[O, $] = (0, w.useState)(null),
		[H, le] = (0, w.useState)(!1),
		[he, Re] = (0, w.useState)(null),
		[N, G] = (0, w.useState)(!1),
		[ie, oe] = (0, w.useState)({ sequence: 0, text: "" }),
		[ge, ye] = (0, w.useState)(""),
		[Se, Pe] = (0, w.useState)(!1),
		ze = (0, w.useRef)(null),
		rt = (0, w.useRef)(null),
		Nt = (0, w.useRef)(null),
		Ht = (0, w.useRef)(null),
		Qt = (0, w.useRef)(null),
		it = (0, w.useRef)(null),
		fe = (0, w.useRef)(null),
		Ee = [...s, ...Object.values(m).flat()].sort((W, ce) => W.value.name.localeCompare(ce.value.name)),
		Be = new Map(
			Object.values(Y)
				.flat()
				.map((W) => [W.channelKey, W]),
		),
		Le = (0, w.useMemo)(() => ZR({ docs: C, cursorChannels: k?.value.channels ?? {}, selfUserId: r }), [C, k, r]),
		Et = (W) => {
			if (W.key === j || W.value.archivedAt !== null) return !1;
			if (li(W.key)) {
				const ce = W.value.lastMessageAt;
				return ce !== void 0 && ce > (Be.get(W.key)?.at ?? 0);
			}
			return Le.has(W.key);
		},
		at = (W) => (li(W.key) ? (Be.get(W.key)?.at ?? 0) : (k?.value.channels[W.key] ?? 0)),
		ue = (W) => (W.key === j || W.value.archivedAt !== null ? 0 : (Le.get(W.key)?.mentionCount ?? 0)),
		Oe = (0, w.useId)(),
		ht = (0, w.useId)(),
		Ne = (0, w.useCallback)((W) => {
			oe((ce) => ({ sequence: ce.sequence + 1, text: W }));
		}, []);
	((0, w.useEffect)(() => {
		if (ie.text === "") return;
		ye("");
		const W = requestAnimationFrame(() => ye(ie.text));
		return () => cancelAnimationFrame(W);
	}, [ie]),
		(0, w.useEffect)(() => {
			const W = window.matchMedia("(max-width: 719px)");
			Pe(W.matches);
			const ce = (Ae) => Pe(Ae.matches);
			return (W.addEventListener("change", ce), () => W.removeEventListener("change", ce));
		}, []),
		(0, w.useEffect)(() => {
			const W = (Ae) => {
					const we = document.documentElement;
					we.classList.toggle("theme-light", Ae.mode === "light");
					for (const [mt, vt] of Object.entries(Ae.tokens)) we.style.setProperty(pz(mt), vt);
				},
				ce = n.theme.current();
			return (ce !== null && W(ce), n.theme.subscribe(W));
		}, [n]),
		(0, w.useEffect)(() => {
			const W = eu(z0);
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
			const W = f.slice(0, zd).map((ce) => {
				const Ae = eu(z0);
				return n.data.watch({ collection: "channels", keyPrefix: ce.keyPrefix, limit: 100 }, (we) => {
					const mt =
						we === null
							? []
							: we.docs.filter((vt) => {
									const cn = vt.key;
									return !(typeof cn == "string" && pb(cn) !== null);
								});
					(v((vt) => {
						if (we === null) {
							const { [ce.scopeId]: cn, ...Mt } = vt;
							return Mt;
						}
						return { ...vt, [ce.scopeId]: Ae.apply_window(mt) };
					}),
						P((vt) => {
							if (we === null) {
								const { [ce.scopeId]: Mt, ...Qi } = vt;
								return Qi;
							}
							const cn = we.docs.map(VR).filter((Mt) => Mt !== null && Mt.createdBy === r);
							return { ...vt, [ce.scopeId]: cn };
						}));
				});
			});
			return () => {
				for (const ce of W) ce();
			};
		}, [n, f, r]),
		(0, w.useEffect)(
			() =>
				n.data.watch({ collection: "cursors", keyPrefix: M0(r), limit: 1 }, (W) => {
					if (W === null) {
						(D(null), (Ht.current = null));
						return;
					}
					const ce = W.docs.map(IR).find((Ae) => Ae !== null) ?? null;
					(D(ce), (Ht.current = ce));
				}),
			[n, r],
		),
		(0, w.useEffect)(() => {
			const W = eu(pl);
			return n.data.watchRecent({ collection: "messages", limit: 100, order: "desc" }, (ce) => {
				if (ce === null) {
					(M(!0), A([]));
					return;
				}
				(M(!1), A(W.apply_window(ce.docs)));
			});
		}, [n]),
		(0, w.useEffect)(() => {
			if (j === null) {
				const W = Ee.find((ce) => ce.value.archivedAt === null);
				W !== void 0 && q((ce) => ce ?? W.key);
			}
		}, [Ee, j]),
		(0, w.useEffect)(() => {
			N && ze.current?.focus();
		}, [N]));
	const Tt = () => window.matchMedia("(max-width: 719px)").matches,
		Ft = (W, ce) => {
			const Ae = Ht.current,
				we = Ae?.value.channels ?? {};
			if ((we[W] ?? 0) >= ce) return;
			const mt = { channels: { ...we, [W]: ce } },
				vt = Ae?.revision ?? 0,
				cn = (Mt, Qi) => {
					const ti = Date.now(),
						zt = {
							key: M0(r),
							value: Qi,
							revision: Mt,
							createdBy: r,
							updatedBy: r,
							createdAt: Ae?.createdAt ?? ti,
							updatedAt: ti,
							timestamp: Ae?.timestamp ?? ti,
						};
					((Ht.current = zt), D(zt));
				};
			n.data
				.putOwned({ collection: "cursors", key: "me", value: mt, expectedRevision: vt })
				.then((Mt) => {
					if ("_yay" in Mt) {
						cn(Mt._yay.revision, mt);
						return;
					}
					if (Mt._nay.name === "conflict") {
						const zt = Ht.current;
						if (zt !== null && zt.revision !== vt) {
							const gu = D0(zt.value, mt);
							n.data
								.putOwned({ collection: "cursors", key: "me", value: gu, expectedRevision: zt.revision })
								.then((yu) => {
									"_yay" in yu && cn(yu._yay.revision, gu);
								})
								.catch(() => {});
							return;
						}
						Qt.current = { channels: mt.channels, attemptedRevision: vt };
						return;
					}
					const Qi = new Set(Ee.map((zt) => zt.key)),
						ti = Object.fromEntries(Object.entries(mt.channels).filter(([zt]) => zt === W || Qi.has(zt)));
					if (Object.keys(ti).length === Object.keys(mt.channels).length) {
						console.warn("[chitchat] A read-cursor write was refused", { message: Mt._nay.message });
						return;
					}
					n.data
						.putOwned({ collection: "cursors", key: "me", value: { channels: ti }, expectedRevision: vt })
						.then((zt) => {
							"_yay" in zt
								? cn(zt._yay.revision, { channels: ti })
								: console.warn("[chitchat] A read-cursor write was refused", { message: zt._nay.message });
						})
						.catch(() => {});
				})
				.catch((Mt) => {
					console.warn("[chitchat] A read-cursor write failed", { message: Xn(Mt) });
				});
		},
		St = (W, ce) => {
			const Ae = Be.get(W.key);
			(Ae?.at ?? 0) >= ce ||
				n.data
					.putOwned({ collection: "channels", key: RR(W.key), value: { at: ce }, expectedRevision: Ae?.revision ?? 0 })
					.then((we) => {
						"_nay" in we &&
							we._nay.name !== "conflict" &&
							console.warn("[chitchat] A private read-cursor write was refused", { message: we._nay.message });
					})
					.catch((we) => {
						console.warn("[chitchat] A private read-cursor write failed", { message: Xn(we) });
					});
		},
		kt = (W, ce) => {
			li(W.key) ? St(W, ce) : Ft(W.key, ce);
		},
		vu = (W, ce) => {
			const Ae = fe.current;
			((fe.current =
				Ae !== null && Ae.channel.key === W.key ? { channel: W, at: Math.max(Ae.at, ce) } : { channel: W, at: ce }),
				it.current === null &&
					(it.current = setTimeout(() => {
						it.current = null;
						const we = fe.current;
						((fe.current = null), we !== null && kt(we.channel, we.at));
					}, bz)));
		},
		hi = (W) => {
			(q(W.key),
				X(null),
				Et(W) || ue(W) > 0 ? (B(at(W)), kt(W, Date.now())) : B(null),
				Ne(`#${W.value.name}`),
				N && Tt() && (G(!1), rt.current?.focus()));
		},
		ua = (W) => {
			(q(W.key), X(null), Ne(W.name), N && Tt() && (G(!1), rt.current?.focus()));
		},
		re = (W, ce) => {
			(hi(W), X(ce));
		};
	((0, w.useEffect)(() => {
		const W = Qt.current;
		if (W === null || k === null || k.revision === W.attemptedRevision) return;
		Qt.current = null;
		const ce = D0(k.value, { channels: W.channels });
		n.data
			.putOwned({ collection: "cursors", key: "me", value: ce, expectedRevision: k.revision })
			.then((Ae) => {
				"_nay" in Ae &&
					Ae._nay.name !== "conflict" &&
					console.warn("[chitchat] The read-cursor retry was refused", { message: Ae._nay.message });
			})
			.catch(() => {});
	}, [k, n]),
		(0, w.useEffect)(
			() => () => {
				it.current !== null && clearTimeout(it.current);
			},
			[],
		));
	const ve = () => {
			($(null), le(!1), Re(null));
		},
		_e = (W, ce, Ae) => {
			(le(!0), Re(null));
			const we = AR(Ae.isPrivate ? "private" : "public");
			(async () => {
				if (Ae.isPrivate) {
					const vt = await n.scopes.create({ scopeId: we, collections: xR, keyPrefix: we });
					if ("_nay" in vt) {
						(le(!1), Re(vt._nay.message));
						return;
					}
					for (const cn of Ae.userIds) {
						const Mt = await n.scopes.setPrincipal({ scopeId: we, userId: cn, level: "member" });
						if ("_nay" in Mt) {
							(le(!1), Re(Mt._nay.message));
							return;
						}
					}
				}
				const mt = await n.data.put({
					collection: "channels",
					key: we,
					value: { name: W, archivedAt: null, ...(ce === "" ? {} : { topic: ce }) },
				});
				if ("_nay" in mt) {
					(le(!1), Re(mt._nay.message));
					return;
				}
				(q(we), B(null), ve());
			})().catch((mt) => {
				(le(!1), Re(Xn(mt)));
			});
		},
		xt = (W, ce) => {
			(le(!0),
				Re(null),
				n.data
					.put({ collection: "channels", key: W.key, value: ce, expectedRevision: W.revision })
					.then((Ae) => {
						if ("_nay" in Ae) {
							(le(!1),
								Re(
									Ae._nay.name === "conflict"
										? "Someone else changed this channel while the dialog was open. Close it and try again."
										: Ae._nay.message,
								));
							return;
						}
						ve();
					})
					.catch((Ae) => {
						(le(!1), Re(Xn(Ae)));
					}));
		},
		Ve = (W) => {
			n.data
				.put({
					collection: "channels",
					key: W.key,
					value: { ...W.value, archivedAt: null },
					expectedRevision: W.revision,
				})
				.then((ce) => {
					"_nay" in ce && Ne(ce._nay.message);
				})
				.catch((ce) => {
					Ne(Xn(ce));
				});
		};
	if (b !== null)
		return (0, S.jsx)("div", {
			className: "chitchat",
			children: (0, S.jsxs)("div", {
				className: "page-dead",
				role: "alert",
				children: [(0, S.jsx)("h1", { children: "Chitchat" }), (0, S.jsx)("p", { children: yz(b.reason) })],
			}),
		});
	const Kt = (W, ce) => W.value.name.localeCompare(ce.value.name),
		an = Ee.filter((W) => W.value.archivedAt === null).sort(Kt),
		Pi = Ee.filter((W) => W.value.archivedAt !== null).sort(Kt),
		ut = Ee.find((W) => W.key === j) ?? null,
		Nn = an.filter(Et).length,
		kn = an.reduce((W, ce) => W + ue(ce), 0),
		wn = Math.max(0, f.length - zd),
		Ar = (W, ce, Ae) =>
			ce.length === 0
				? null
				: (0, S.jsxs)("div", {
						className: "channel-section",
						children: [
							(0, S.jsx)("h2", { id: Ae, className: "channel-section-title", children: W }),
							(0, S.jsx)("ul", {
								className: "channel-list",
								"aria-labelledby": Ae,
								children: ce.map((we) => {
									const mt = Et(we),
										vt = ue(we);
									return (0, S.jsxs)(
										"li",
										{
											className: "channel-item",
											children: [
												(0, S.jsxs)("button", {
													type: "button",
													className: mt || vt > 0 ? "channel-link is-unread" : "channel-link",
													"aria-current": we.key === j ? "page" : void 0,
													onClick: () => hi(we),
													children: [
														(0, S.jsx)("span", {
															className: "channel-initial",
															"aria-hidden": "true",
															children: we.value.name.slice(0, 1).toUpperCase(),
														}),
														(0, S.jsxs)("span", {
															className: "channel-name",
															children: [
																"#",
																we.value.name,
																li(we.key) ? " (private)" : "",
																we.value.archivedAt !== null ? " (archived)" : "",
															],
														}),
														vt > 0
															? (0, S.jsxs)("span", {
																	className: "mention-badge",
																	children: [
																		vt,
																		(0, S.jsx)("span", { className: "visually-hidden", children: " unread mentions" }),
																	],
																})
															: mt
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
													children: (0, S.jsx)(lz, {
														channelName: we.value.name,
														items: [
															...(li(we.key)
																? [
																		{
																			id: "people",
																			label: `People in #${we.value.name}`,
																			onSelect: () => $({ kind: "people", channel: we }),
																		},
																	]
																: []),
															{
																id: "rename",
																label: `Rename #${we.value.name}`,
																onSelect: () => $({ kind: "rename", channel: we }),
															},
															we.value.archivedAt === null
																? {
																		id: "archive",
																		label: `Archive #${we.value.name}`,
																		onSelect: () => $({ kind: "archive", channel: we }),
																	}
																: { id: "unarchive", label: `Unarchive #${we.value.name}`, onSelect: () => Ve(we) },
														],
													}),
												}),
											],
										},
										we.key,
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
						ref: rt,
						type: "button",
						className: "button drawer-toggle",
						"aria-expanded": N,
						onClick: () => G((W) => !W),
						children: "Channels",
					}),
				],
			}),
			(0, S.jsx)("nav", {
				ref: ze,
				className: `sidebar${N ? " is-open" : ""}${F ? " is-expanded" : ""}`,
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
									ref: Nt,
									type: "button",
									className: "button sidebar-expand",
									"aria-expanded": F,
									"aria-label": F ? "Collapse channel rail" : "Expand channel rail",
									onClick: () => ae((W) => !W),
									children: F ? "«" : "»",
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
						wn > 0
							? (0, S.jsx)("div", {
									className: "channel-status",
									role: "status",
									children: `This page can watch ${zd} private channels at a time; ${wn} more ${wn === 1 ? "is" : "are"} hidden.`,
								})
							: null,
						(0, S.jsx)("ul", {
							className: "view-list",
							"aria-label": "Views",
							children: hz.map((W) =>
								(0, S.jsx)(
									"li",
									{
										className: "view-item",
										children: (0, S.jsxs)("button", {
											type: "button",
											className:
												W.key === "view:unreads" && (Nn > 0 || kn > 0)
													? "channel-link view-link is-unread"
													: "channel-link view-link",
											"aria-current": j === W.key ? "page" : void 0,
											onClick: () => ua(W),
											children: [
												(0, S.jsx)("span", {
													className: "channel-initial",
													"aria-hidden": "true",
													children: W.name.slice(0, 1),
												}),
												(0, S.jsx)("span", { className: "channel-name", children: W.name }),
												W.key === "view:unreads" && kn > 0
													? (0, S.jsxs)("span", {
															className: "mention-badge",
															children: [
																kn,
																(0, S.jsx)("span", { className: "visually-hidden", children: " mentions of you" }),
															],
														})
													: W.key === "view:unreads" && Nn > 0
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
								: (0, S.jsxs)(S.Fragment, { children: [Ar("Channels", an, Oe), Ar("Archived", Pi, ht)] })
							: (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading channels…" }),
					],
				}),
			}),
			(0, S.jsx)("main", {
				className: "main",
				children:
					j === "view:unreads"
						? (0, S.jsx)(mz, {
								channels: an,
								publicUnreads: Le,
								privateCursors: Be,
								recentDead: R,
								memberNames: u,
								onSelectChannel: hi,
							})
						: j === "view:threads"
							? (0, S.jsx)(gz, { client: n, channels: an, memberNames: u, onOpenThread: re })
							: j === "view:activity"
								? (0, S.jsx)(vz, {
										feed: C,
										channels: an,
										selfUserId: r,
										recentDead: R,
										memberNames: u,
										onSelectChannel: hi,
									})
								: ut !== null
									? (0, S.jsx)(
											xM,
											{
												client: n,
												userId: r,
												channel: ut,
												memberNames: u,
												announce: Ne,
												threadRootKey: se,
												setThreadRootKey: X,
												isNarrow: Se,
												onNewestVisible: (W) => vu(ut, W),
												openedAtLastReadAt: K,
											},
											ut.key,
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
			O !== null && O.kind === "create"
				? (0, S.jsx)(Tp, {
						title: "Create channel",
						submitLabel: "Create",
						initialName: "",
						initialTopic: "",
						privacy: { client: n, selfUserId: r },
						busy: H,
						error: he,
						onSubmit: _e,
						onClose: ve,
					})
				: null,
			O !== null && O.kind === "people"
				? (0, S.jsx)(fz, { client: n, channel: O.channel, selfUserId: r, memberNames: u, onClose: ve })
				: null,
			O !== null && O.kind === "rename"
				? (0, S.jsx)(Tp, {
						title: `Rename #${O.channel.value.name}`,
						submitLabel: "Rename",
						initialName: O.channel.value.name,
						initialTopic: O.channel.value.topic ?? "",
						privacy: null,
						busy: H,
						error: he,
						onSubmit: (W, ce) =>
							xt(O.channel, { ...O.channel.value, name: W, ...(ce === "" ? { topic: void 0 } : { topic: ce }) }),
						onClose: ve,
					})
				: null,
			O !== null && O.kind === "archive"
				? (0, S.jsx)(dz, {
						channelName: O.channel.value.name,
						busy: H,
						error: he,
						onConfirm: () => xt(O.channel, { ...O.channel.value, archivedAt: Date.now() }),
						onClose: ve,
					})
				: null,
			(0, S.jsxs)("div", {
				className: "chitchat-announcer visually-hidden",
				role: "status",
				"aria-live": "polite",
				children: [(0, S.jsx)("span", { "data-announcement-sequence": String(ie.sequence) }), ge],
			}),
		],
	});
}
function VS(e) {
	return (0, S.jsx)("div", {
		className: e.isError ? "boot-screen is-error" : "boot-screen",
		role: e.isError ? "alert" : "status",
		"aria-live": e.isError ? void 0 : "polite",
		children: e.message,
	});
}
var ZS = document.getElementById("root");
if (!ZS) throw new Error("index.html is missing the #root element");
var ih = (0, wR.createRoot)(ZS);
ih.render((0, S.jsx)(VS, { message: "Connecting…" }));
ME().then(
	(e) => {
		(e.context.kind === "page" && (document.title = e.context.pageTitle), ih.render((0, S.jsx)(Sz, { client: e })));
	},
	(e) => {
		ih.render((0, S.jsx)(VS, { message: e instanceof Error ? e.message : String(e), isError: !0 }));
	},
);
