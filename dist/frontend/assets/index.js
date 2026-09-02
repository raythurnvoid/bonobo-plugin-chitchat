var _1 = Object.create,
	eb = Object.defineProperty,
	S1 = Object.getOwnPropertyDescriptor,
	w1 = Object.getOwnPropertyNames,
	E1 = Object.getPrototypeOf,
	T1 = Object.prototype.hasOwnProperty,
	Er = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), (e = null)), t.exports),
	x1 = (e, t, i, u) => {
		if ((t && typeof t == "object") || typeof t == "function")
			for (var l = w1(t), o = 0, f = l.length, h; o < f; o++)
				((h = l[o]),
					!T1.call(e, h) &&
						h !== i &&
						eb(e, h, { get: ((m) => t[m]).bind(null, h), enumerable: !(u = S1(t, h)) || u.enumerable }));
		return e;
	},
	tb = (e, t, i) => (
		(i = e != null ? _1(E1(e)) : {}),
		x1(t || !e || !e.__esModule ? eb(i, "default", { value: e, enumerable: !0 }) : i, e)
	);
(function () {
	const t = document.createElement("link").relList;
	if (t && t.supports && t.supports("modulepreload")) return;
	for (const l of document.querySelectorAll('link[rel="modulepreload"]')) u(l);
	new MutationObserver((l) => {
		for (const o of l)
			if (o.type === "childList")
				for (const f of o.addedNodes) f.tagName === "LINK" && f.rel === "modulepreload" && u(f);
	}).observe(document, { childList: !0, subtree: !0 });
	function i(l) {
		const o = {};
		return (
			l.integrity && (o.integrity = l.integrity),
			l.referrerPolicy && (o.referrerPolicy = l.referrerPolicy),
			l.crossOrigin === "use-credentials"
				? (o.credentials = "include")
				: l.crossOrigin === "anonymous"
					? (o.credentials = "omit")
					: (o.credentials = "same-origin"),
			o
		);
	}
	function u(l) {
		if (l.ep) return;
		l.ep = !0;
		const o = i(l);
		fetch(l.href, o);
	}
})();
var A1 = Er((e) => {
		var t = Symbol.for("react.transitional.element"),
			i = Symbol.for("react.portal"),
			u = Symbol.for("react.fragment"),
			l = Symbol.for("react.strict_mode"),
			o = Symbol.for("react.profiler"),
			f = Symbol.for("react.consumer"),
			h = Symbol.for("react.context"),
			m = Symbol.for("react.forward_ref"),
			v = Symbol.for("react.suspense"),
			g = Symbol.for("react.memo"),
			_ = Symbol.for("react.lazy"),
			p = Symbol.for("react.activity"),
			w = Symbol.iterator;
		function x(M) {
			return M === null || typeof M != "object"
				? null
				: ((M = (w && M[w]) || M["@@iterator"]), typeof M == "function" ? M : null);
		}
		var R = {
				isMounted: function () {
					return !1;
				},
				enqueueForceUpdate: function () {},
				enqueueReplaceState: function () {},
				enqueueSetState: function () {},
			},
			z = Object.assign,
			I = {};
		function j(M, L, se) {
			((this.props = M), (this.context = L), (this.refs = I), (this.updater = se || R));
		}
		((j.prototype.isReactComponent = {}),
			(j.prototype.setState = function (M, L) {
				if (typeof M != "object" && typeof M != "function" && M != null)
					throw Error(
						"takes an object of state variables to update or a function which returns an object of state variables.",
					);
				this.updater.enqueueSetState(this, M, L, "setState");
			}),
			(j.prototype.forceUpdate = function (M) {
				this.updater.enqueueForceUpdate(this, M, "forceUpdate");
			}));
		function N() {}
		N.prototype = j.prototype;
		function C(M, L, se) {
			((this.props = M), (this.context = L), (this.refs = I), (this.updater = se || R));
		}
		var q = (C.prototype = new N());
		((q.constructor = C), z(q, j.prototype), (q.isPureReactComponent = !0));
		var J = Array.isArray;
		function G() {}
		var k = { H: null, A: null, T: null, S: null },
			$ = Object.prototype.hasOwnProperty;
		function B(M, L, se) {
			var ce = se.ref;
			return { $$typeof: t, type: M, key: L, ref: ce !== void 0 ? ce : null, props: se };
		}
		function Q(M, L) {
			return B(M.type, L, M.props);
		}
		function oe(M) {
			return typeof M == "object" && M !== null && M.$$typeof === t;
		}
		function le(M) {
			var L = { "=": "=0", ":": "=2" };
			return (
				"$" +
				M.replace(/[=:]/g, function (se) {
					return L[se];
				})
			);
		}
		var te = /\/+/g;
		function ne(M, L) {
			return typeof M == "object" && M !== null && M.key != null ? le("" + M.key) : L.toString(36);
		}
		function O(M) {
			switch (M.status) {
				case "fulfilled":
					return M.value;
				case "rejected":
					throw M.reason;
				default:
					switch (
						(typeof M.status == "string"
							? M.then(G, G)
							: ((M.status = "pending"),
								M.then(
									function (L) {
										M.status === "pending" && ((M.status = "fulfilled"), (M.value = L));
									},
									function (L) {
										M.status === "pending" && ((M.status = "rejected"), (M.reason = L));
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
		function V(M, L, se, ce, he) {
			var we = typeof M;
			(we === "undefined" || we === "boolean") && (M = null);
			var pe = !1;
			if (M === null) pe = !0;
			else
				switch (we) {
					case "bigint":
					case "string":
					case "number":
						pe = !0;
						break;
					case "object":
						switch (M.$$typeof) {
							case t:
							case i:
								pe = !0;
								break;
							case _:
								return ((pe = M._init), V(pe(M._payload), L, se, ce, he));
						}
				}
			if (pe)
				return (
					(he = he(M)),
					(pe = ce === "" ? "." + ne(M, 0) : ce),
					J(he)
						? ((se = ""),
							pe != null && (se = pe.replace(te, "$&/") + "/"),
							V(he, L, se, "", function (st) {
								return st;
							}))
						: he != null &&
							(oe(he) &&
								(he = Q(
									he,
									se + (he.key == null || (M && M.key === he.key) ? "" : ("" + he.key).replace(te, "$&/") + "/") + pe,
								)),
							L.push(he)),
					1
				);
			pe = 0;
			var qe = ce === "" ? "." : ce + ":";
			if (J(M))
				for (var Ie = 0; Ie < M.length; Ie++) ((ce = M[Ie]), (we = qe + ne(ce, Ie)), (pe += V(ce, L, se, we, he)));
			else if (((Ie = x(M)), typeof Ie == "function"))
				for (M = Ie.call(M), Ie = 0; !(ce = M.next()).done; )
					((ce = ce.value), (we = qe + ne(ce, Ie++)), (pe += V(ce, L, se, we, he)));
			else if (we === "object") {
				if (typeof M.then == "function") return V(O(M), L, se, ce, he);
				throw (
					(L = String(M)),
					Error(
						"Objects are not valid as a React child (found: " +
							(L === "[object Object]" ? "object with keys {" + Object.keys(M).join(", ") + "}" : L) +
							"). If you meant to render a collection of children, use an array instead.",
					)
				);
			}
			return pe;
		}
		function P(M, L, se) {
			if (M == null) return M;
			var ce = [],
				he = 0;
			return (
				V(M, ce, "", "", function (we) {
					return L.call(se, we, he++);
				}),
				ce
			);
		}
		function ve(M) {
			if (M._status === -1) {
				var L = M._result;
				((L = L()),
					L.then(
						function (se) {
							(M._status === 0 || M._status === -1) && ((M._status = 1), (M._result = se));
						},
						function (se) {
							(M._status === 0 || M._status === -1) && ((M._status = 2), (M._result = se));
						},
					),
					M._status === -1 && ((M._status = 0), (M._result = L)));
			}
			if (M._status === 1) return M._result.default;
			throw M._result;
		}
		var ye =
				typeof reportError == "function"
					? reportError
					: function (M) {
							if (typeof window == "object" && typeof window.ErrorEvent == "function") {
								var L = new window.ErrorEvent("error", {
									bubbles: !0,
									cancelable: !0,
									message:
										typeof M == "object" && M !== null && typeof M.message == "string" ? String(M.message) : String(M),
									error: M,
								});
								if (!window.dispatchEvent(L)) return;
							} else if (typeof process == "object" && typeof process.emit == "function") {
								process.emit("uncaughtException", M);
								return;
							}
							console.error(M);
						},
			Be = {
				map: P,
				forEach: function (M, L, se) {
					P(
						M,
						function () {
							L.apply(this, arguments);
						},
						se,
					);
				},
				count: function (M) {
					var L = 0;
					return (
						P(M, function () {
							L++;
						}),
						L
					);
				},
				toArray: function (M) {
					return (
						P(M, function (L) {
							return L;
						}) || []
					);
				},
				only: function (M) {
					if (!oe(M)) throw Error("React.Children.only expected to receive a single React element child.");
					return M;
				},
			};
		((e.Activity = p),
			(e.Children = Be),
			(e.Component = j),
			(e.Fragment = u),
			(e.Profiler = o),
			(e.PureComponent = C),
			(e.StrictMode = l),
			(e.Suspense = v),
			(e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = k),
			(e.__COMPILER_RUNTIME = {
				__proto__: null,
				c: function (M) {
					return k.H.useMemoCache(M);
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
			(e.cloneElement = function (M, L, se) {
				if (M == null) throw Error("The argument must be a React element, but you passed " + M + ".");
				var ce = z({}, M.props),
					he = M.key;
				if (L != null)
					for (we in (L.key !== void 0 && (he = "" + L.key), L))
						!$.call(L, we) ||
							we === "key" ||
							we === "__self" ||
							we === "__source" ||
							(we === "ref" && L.ref === void 0) ||
							(ce[we] = L[we]);
				var we = arguments.length - 2;
				if (we === 1) ce.children = se;
				else if (1 < we) {
					for (var pe = Array(we), qe = 0; qe < we; qe++) pe[qe] = arguments[qe + 2];
					ce.children = pe;
				}
				return B(M.type, he, ce);
			}),
			(e.createContext = function (M) {
				return (
					(M = { $$typeof: h, _currentValue: M, _currentValue2: M, _threadCount: 0, Provider: null, Consumer: null }),
					(M.Provider = M),
					(M.Consumer = { $$typeof: f, _context: M }),
					M
				);
			}),
			(e.createElement = function (M, L, se) {
				var ce,
					he = {},
					we = null;
				if (L != null)
					for (ce in (L.key !== void 0 && (we = "" + L.key), L))
						$.call(L, ce) && ce !== "key" && ce !== "__self" && ce !== "__source" && (he[ce] = L[ce]);
				var pe = arguments.length - 2;
				if (pe === 1) he.children = se;
				else if (1 < pe) {
					for (var qe = Array(pe), Ie = 0; Ie < pe; Ie++) qe[Ie] = arguments[Ie + 2];
					he.children = qe;
				}
				if (M && M.defaultProps) for (ce in ((pe = M.defaultProps), pe)) he[ce] === void 0 && (he[ce] = pe[ce]);
				return B(M, we, he);
			}),
			(e.createRef = function () {
				return { current: null };
			}),
			(e.forwardRef = function (M) {
				return { $$typeof: m, render: M };
			}),
			(e.isValidElement = oe),
			(e.lazy = function (M) {
				return { $$typeof: _, _payload: { _status: -1, _result: M }, _init: ve };
			}),
			(e.memo = function (M, L) {
				return { $$typeof: g, type: M, compare: L === void 0 ? null : L };
			}),
			(e.startTransition = function (M) {
				var L = k.T,
					se = {};
				k.T = se;
				try {
					var ce = M(),
						he = k.S;
					(he !== null && he(se, ce),
						typeof ce == "object" && ce !== null && typeof ce.then == "function" && ce.then(G, ye));
				} catch (we) {
					ye(we);
				} finally {
					(L !== null && se.types !== null && (L.types = se.types), (k.T = L));
				}
			}),
			(e.unstable_useCacheRefresh = function () {
				return k.H.useCacheRefresh();
			}),
			(e.use = function (M) {
				return k.H.use(M);
			}),
			(e.useActionState = function (M, L, se) {
				return k.H.useActionState(M, L, se);
			}),
			(e.useCallback = function (M, L) {
				return k.H.useCallback(M, L);
			}),
			(e.useContext = function (M) {
				return k.H.useContext(M);
			}),
			(e.useDebugValue = function () {}),
			(e.useDeferredValue = function (M, L) {
				return k.H.useDeferredValue(M, L);
			}),
			(e.useEffect = function (M, L) {
				return k.H.useEffect(M, L);
			}),
			(e.useEffectEvent = function (M) {
				return k.H.useEffectEvent(M);
			}),
			(e.useId = function () {
				return k.H.useId();
			}),
			(e.useImperativeHandle = function (M, L, se) {
				return k.H.useImperativeHandle(M, L, se);
			}),
			(e.useInsertionEffect = function (M, L) {
				return k.H.useInsertionEffect(M, L);
			}),
			(e.useLayoutEffect = function (M, L) {
				return k.H.useLayoutEffect(M, L);
			}),
			(e.useMemo = function (M, L) {
				return k.H.useMemo(M, L);
			}),
			(e.useOptimistic = function (M, L) {
				return k.H.useOptimistic(M, L);
			}),
			(e.useReducer = function (M, L, se) {
				return k.H.useReducer(M, L, se);
			}),
			(e.useRef = function (M) {
				return k.H.useRef(M);
			}),
			(e.useState = function (M) {
				return k.H.useState(M);
			}),
			(e.useSyncExternalStore = function (M, L, se) {
				return k.H.useSyncExternalStore(M, L, se);
			}),
			(e.useTransition = function () {
				return k.H.useTransition();
			}),
			(e.version = "19.2.8"));
	}),
	yc = Er((e, t) => {
		t.exports = A1();
	}),
	Qr = [],
	wr = [],
	R1 = Uint8Array,
	Pd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Du = 0, C1 = Pd.length; Du < C1; ++Du) ((Qr[Du] = Pd[Du]), (wr[Pd.charCodeAt(Du)] = Du));
wr[45] = 62;
wr[95] = 63;
function k1(e) {
	var t = e.length;
	if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
	var i = e.indexOf("=");
	i === -1 && (i = t);
	var u = i === t ? 0 : 4 - (i % 4);
	return [i, u];
}
function M1(e, t, i) {
	return ((t + i) * 3) / 4 - i;
}
function nl(e) {
	var t,
		i = k1(e),
		u = i[0],
		l = i[1],
		o = new R1(M1(e, u, l)),
		f = 0,
		h = l > 0 ? u - 4 : u,
		m;
	for (m = 0; m < h; m += 4)
		((t =
			(wr[e.charCodeAt(m)] << 18) |
			(wr[e.charCodeAt(m + 1)] << 12) |
			(wr[e.charCodeAt(m + 2)] << 6) |
			wr[e.charCodeAt(m + 3)]),
			(o[f++] = (t >> 16) & 255),
			(o[f++] = (t >> 8) & 255),
			(o[f++] = t & 255));
	return (
		l === 2 && ((t = (wr[e.charCodeAt(m)] << 2) | (wr[e.charCodeAt(m + 1)] >> 4)), (o[f++] = t & 255)),
		l === 1 &&
			((t = (wr[e.charCodeAt(m)] << 10) | (wr[e.charCodeAt(m + 1)] << 4) | (wr[e.charCodeAt(m + 2)] >> 2)),
			(o[f++] = (t >> 8) & 255),
			(o[f++] = t & 255)),
		o
	);
}
function N1(e) {
	return Qr[(e >> 18) & 63] + Qr[(e >> 12) & 63] + Qr[(e >> 6) & 63] + Qr[e & 63];
}
function O1(e, t, i) {
	for (var u, l = [], o = t; o < i; o += 3)
		((u = ((e[o] << 16) & 16711680) + ((e[o + 1] << 8) & 65280) + (e[o + 2] & 255)), l.push(N1(u)));
	return l.join("");
}
function rl(e) {
	for (var t, i = e.length, u = i % 3, l = [], o = 16383, f = 0, h = i - u; f < h; f += o)
		l.push(O1(e, f, f + o > h ? h : f + o));
	return (
		u === 1
			? ((t = e[i - 1]), l.push(Qr[t >> 2] + Qr[(t << 4) & 63] + "=="))
			: u === 2 &&
				((t = (e[i - 2] << 8) + e[i - 1]), l.push(Qr[t >> 10] + Qr[(t >> 4) & 63] + Qr[(t << 2) & 63] + "=")),
		l.join("")
	);
}
function Ei(e) {
	if (e === void 0) return {};
	if (!nb(e)) throw new Error(`The arguments to a Convex function must be an object. Received: ${e}`);
	return e;
}
function z1(e) {
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
function nb(e) {
	const t = typeof e == "object",
		i = Object.getPrototypeOf(e),
		u = i === null || i === Object.prototype || i?.constructor?.name === "Object";
	return t && u;
}
var rb = !0,
	Qu = BigInt("-9223372036854775808"),
	Yh = BigInt("9223372036854775807"),
	Eh = BigInt("0"),
	D1 = BigInt("8"),
	j1 = BigInt("256"),
	Qd =
		"This commit timestamp is unresolved: its value is assigned when the mutation commits. Read the document after the mutation completes to get its value.",
	ib = class {
		[Symbol.toPrimitive](e) {
			if (e === "string") return this.toString();
			throw new Error(Qd);
		}
		valueOf() {
			throw new Error(Qd);
		}
		toJSON() {
			throw new Error(Qd);
		}
		toString() {
			return "[unresolved commit timestamp]";
		}
	},
	q1 = new ib();
function ab(e) {
	return Number.isNaN(e) || !Number.isFinite(e) || Object.is(e, -0);
}
function I1(e) {
	e < Eh && (e -= Qu + Qu);
	let t = e.toString(16);
	t.length % 2 === 1 && (t = "0" + t);
	const i = new Uint8Array(new ArrayBuffer(8));
	let u = 0;
	for (const l of t.match(/.{2}/g).reverse()) (i.set([parseInt(l, 16)], u++), (e >>= D1));
	return rl(i);
}
function L1(e) {
	const t = nl(e);
	if (t.byteLength !== 8) throw new Error(`Received ${t.byteLength} bytes, expected 8 for $integer`);
	let i = Eh,
		u = Eh;
	for (const l of t) ((i += BigInt(l) * j1 ** u), u++);
	return (i > Yh && (i += Qu + Qu), i);
}
function U1(e) {
	if (e < Qu || Yh < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
	const t = new ArrayBuffer(8);
	return (new DataView(t).setBigInt64(0, e, !0), rl(new Uint8Array(t)));
}
function $1(e) {
	const t = nl(e);
	if (t.byteLength !== 8) throw new Error(`Received ${t.byteLength} bytes, expected 8 for $integer`);
	return new DataView(t.buffer).getBigInt64(0, !0);
}
var B1 = DataView.prototype.setBigInt64 ? U1 : I1,
	V1 = DataView.prototype.getBigInt64 ? $1 : L1,
	o0 = 1024;
function Th(e) {
	if (e.length > o0) throw new Error(`Field name ${e} exceeds maximum field name length ${o0}.`);
	if (e.startsWith("$")) throw new Error(`Field name ${e} starts with a '$', which is reserved.`);
	for (let t = 0; t < e.length; t += 1) {
		const i = e.charCodeAt(t);
		if (i < 32 || i >= 127)
			throw new Error(
				`Field name ${e} has invalid character '${e[t]}': Field names can only contain non-control ASCII characters`,
			);
	}
}
function Ku(e) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return e;
	if (Array.isArray(e)) return e.map((u) => Ku(u));
	if (typeof e != "object") throw new Error(`Unexpected type of ${e}`);
	const t = Object.entries(e);
	if (t.length === 1) {
		const u = t[0][0];
		if (u === "$bytes") {
			if (typeof e.$bytes != "string") throw new Error(`Malformed $bytes field on ${e}`);
			return nl(e.$bytes).buffer;
		}
		if (u === "$integer") {
			if (typeof e.$integer != "string") throw new Error(`Malformed $integer field on ${e}`);
			return V1(e.$integer);
		}
		if (u === "$float") {
			if (typeof e.$float != "string") throw new Error(`Malformed $float field on ${e}`);
			const l = nl(e.$float);
			if (l.byteLength !== 8) throw new Error(`Received ${l.byteLength} bytes, expected 8 for $float`);
			const o = new DataView(l.buffer).getFloat64(0, rb);
			if (!ab(o)) throw new Error(`Float ${o} should be encoded as a number`);
			return o;
		}
		if (u === "$commitTs") {
			if (e.$commitTs !== null) throw new Error(`Malformed $commitTs field on ${e}`);
			return q1;
		}
		if (u === "$set") throw new Error("Received a Set which is no longer supported as a Convex type.");
		if (u === "$map") throw new Error("Received a Map which is no longer supported as a Convex type.");
	}
	const i = {};
	for (const [u, l] of Object.entries(e)) (Th(u), (i[u] = Ku(l)));
	return i;
}
var c0 = 16384;
function Vu(e) {
	const t = JSON.stringify(e, (i, u) => (u === void 0 ? "undefined" : typeof u == "bigint" ? `${u.toString()}n` : u));
	if (t.length > c0) {
		const i = "[...truncated]";
		let u = c0 - 14;
		const l = t.codePointAt(u - 1);
		return (l !== void 0 && l > 65535 && (u -= 1), t.substring(0, u) + i);
	}
	return t;
}
function Wo(e, t, i, u) {
	if (e === void 0) {
		const f = i && ` (present at path ${i} in original object ${Vu(t)})`;
		throw new Error(
			`undefined is not a valid Convex value${f}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`,
		);
	}
	if (e === null) return e;
	if (typeof e == "bigint") {
		if (e < Qu || Yh < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
		return { $integer: B1(e) };
	}
	if (typeof e == "number")
		if (ab(e)) {
			const f = new ArrayBuffer(8);
			return (new DataView(f).setFloat64(0, e, rb), { $float: rl(new Uint8Array(f)) });
		} else return e;
	if (typeof e == "boolean" || typeof e == "string") return e;
	if (e instanceof ArrayBuffer) return { $bytes: rl(new Uint8Array(e)) };
	if (e instanceof ib) return { $commitTs: null };
	if (Array.isArray(e)) return e.map((f, h) => Wo(f, t, i + `[${h}]`, !1));
	if (e instanceof Set) throw new Error(Kd(i, "Set", [...e], t));
	if (e instanceof Map) throw new Error(Kd(i, "Map", [...e], t));
	if (!nb(e)) {
		const f = e?.constructor?.name,
			h = f ? `${f} ` : "";
		throw new Error(Kd(i, h, e, t));
	}
	const l = {},
		o = Object.entries(e);
	o.sort(([f, h], [m, v]) => (f === m ? 0 : f < m ? -1 : 1));
	for (const [f, h] of o)
		h !== void 0 ? (Th(f), (l[f] = Wo(h, t, i + `.${f}`, !1))) : u && (Th(f), (l[f] = Z1(h, t, i + `.${f}`)));
	return l;
}
function Kd(e, t, i, u) {
	return e
		? `${t}${Vu(i)} is not a supported Convex type (present at path ${e} in original object ${Vu(u)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
		: `${t}${Vu(i)} is not a supported Convex type.`;
}
function Z1(e, t, i) {
	if (e === void 0) return { $undefined: null };
	if (t === void 0) throw new Error(`Programming error. Current value is ${Vu(e)} but original value is undefined`);
	return Wo(e, t, i, !1);
}
function or(e) {
	return Wo(e, e, "", !1);
}
var H1 = Object.defineProperty,
	P1 = (e, t, i) => (t in e ? H1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	Yd = (e, t, i) => P1(e, typeof t != "symbol" ? t + "" : t, i),
	f0,
	d0,
	Q1 = Symbol.for("ConvexError"),
	ec = class extends ((d0 = Error), (f0 = Q1), d0) {
		constructor(e) {
			(super(typeof e == "string" ? e : Vu(e)),
				Yd(this, "name", "ConvexError"),
				Yd(this, "data"),
				Yd(this, f0, !0),
				(this.data = e));
		}
	},
	h0 = "1.44.0",
	K1 = Object.defineProperty,
	Y1 = (e, t, i) => (t in e ? K1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	m0 = (e, t, i) => Y1(e, typeof t != "symbol" ? t + "" : t, i),
	F1 = "color:rgb(0, 145, 255)";
function ub(e) {
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
var sb = class {
	constructor(e) {
		(m0(this, "_onLogLineFuncs"), m0(this, "_verbose"), (this._onLogLineFuncs = {}), (this._verbose = e.verbose));
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
function lb(e) {
	const t = new sb(e);
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
function ob(e) {
	return new sb(e);
}
function tc(e, t, i, u, l) {
	const o = ub(i);
	if ((typeof l == "object" && (l = `ConvexError ${JSON.stringify(l.errorData, null, 2)}`), t === "info")) {
		const f = l.match(/^\[.*?\] /);
		if (f === null) {
			e.error(`[CONVEX ${o}(${u})] Could not parse console.log`);
			return;
		}
		const h = l.slice(1, f[0].length - 2),
			m = l.slice(f[0].length);
		e.log(`%c[CONVEX ${o}(${u})] [${h}]`, F1, m);
	} else e.error(`[CONVEX ${o}(${u})] ${l}`);
}
function G1(e, t) {
	const i = `[CONVEX FATAL ERROR] ${t}`;
	return (e.error(i), new Error(i));
}
function Lu(e, t, i) {
	return `[CONVEX ${ub(e)}(${t})] ${i.errorMessage}
  Called by client`;
}
function xh(e, t) {
	return ((t.data = e.errorData), t);
}
function Ha(e) {
	const t = e.split(":");
	let i, u;
	return (
		t.length === 1 ? ((i = t[0]), (u = "default")) : ((i = t.slice(0, t.length - 1).join(":")), (u = t[t.length - 1])),
		i.endsWith(".js") && (i = i.slice(0, -3)),
		`${i}:${u}`
	);
}
function Ba(e, t) {
	return JSON.stringify({ udfPath: Ha(e), args: or(t) });
}
function v0(e, t, i) {
	const { initialNumItems: u, id: l } = i;
	return JSON.stringify({ type: "paginated", udfPath: Ha(e), args: or(t), options: or({ initialNumItems: u, id: l }) });
}
var X1 = Object.defineProperty,
	J1 = (e, t, i) => (t in e ? X1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	Pr = (e, t, i) => J1(e, typeof t != "symbol" ? t + "" : t, i),
	W1 = class {
		constructor() {
			(Pr(this, "nextQueryId"),
				Pr(this, "querySetVersion"),
				Pr(this, "querySet"),
				Pr(this, "queryIdToToken"),
				Pr(this, "identityVersion"),
				Pr(this, "auth"),
				Pr(this, "outstandingQueriesOlderThanRestart"),
				Pr(this, "outstandingAuthOlderThanRestart"),
				Pr(this, "paused"),
				Pr(this, "pendingQuerySetModifications"),
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
			const l = Ha(e),
				o = Ba(l, t),
				f = this.querySet.get(o);
			if (f !== void 0)
				return (
					(f.numSubscribers += 1),
					{ queryToken: o, modification: null, unsubscribe: () => this.removeSubscriber(o) }
				);
			{
				const h = this.nextQueryId++,
					m = { id: h, canonicalizedUdfPath: l, args: t, numSubscribers: 1, journal: i, componentPath: u };
				(this.querySet.set(o, m), this.queryIdToToken.set(h, o));
				const v = this.querySetVersion,
					g = this.querySetVersion + 1,
					_ = { type: "Add", queryId: h, udfPath: l, args: [or(t)], journal: i, componentPath: u };
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
			const i = Ba(Ha(e), t),
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
				const l = {
					type: "Add",
					queryId: u.id,
					udfPath: u.canonicalizedUdfPath,
					args: [or(u.args)],
					journal: u.journal,
					componentPath: u.componentPath,
				};
				(e.push(l), this.outstandingQueriesOlderThanRestart.add(u.id));
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
					l = { type: "Remove", queryId: t.id };
				return (
					this.paused
						? this.pendingQuerySetModifications.has(t.id)
							? this.pendingQuerySetModifications.delete(t.id)
							: this.pendingQuerySetModifications.set(t.id, l)
						: (this.querySetVersion = u),
					{ type: "ModifyQuerySet", baseVersion: i, newVersion: u, modifications: [l] }
				);
			}
		}
	},
	eE = Object.defineProperty,
	tE = (e, t, i) => (t in e ? eE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	Lo = (e, t, i) => tE(e, typeof t != "symbol" ? t + "" : t, i),
	nE = class {
		constructor(e, t) {
			((this.logger = e),
				(this.markConnectionStateDirty = t),
				Lo(this, "inflightRequests"),
				Lo(this, "requestsOlderThanRestart"),
				Lo(this, "inflightMutationsCount", 0),
				Lo(this, "inflightActionsCount", 0),
				(this.inflightRequests = new Map()),
				(this.requestsOlderThanRestart = new Set()));
		}
		request(e, t) {
			const i = new Promise((u) => {
				const l = t ? "Requested" : "NotSent";
				(this.inflightRequests.set(e.requestId, {
					message: e,
					status: { status: l, requestedAt: new Date(), onResult: u },
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
			for (const h of e.logLines) tc(this.logger, "info", i, u, h);
			const l = t.status;
			let o, f;
			if (e.success) ((o = { success: !0, logLines: e.logLines, value: Ku(e.result) }), (f = () => l.onResult(o)));
			else {
				const h = e.result,
					{ errorData: m } = e;
				(tc(this.logger, "error", i, u, h),
					(o = { success: !1, errorMessage: h, errorData: m !== void 0 ? Ku(m) : void 0, logLines: e.logLines }),
					(f = () => l.onResult(o)));
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
				const l = u.status;
				l.status === "Completed" &&
					l.ts.lessThanOrEqual(e) &&
					(l.onResolve(),
					t.set(i, l.result),
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
	il = Symbol.for("functionName"),
	rE = Symbol.for("toReferencePath");
function iE(e) {
	return e[rE] ?? null;
}
function aE(e) {
	return e.startsWith("function://");
}
function uE(e) {
	let t;
	if (typeof e == "string") aE(e) ? (t = { functionHandle: e }) : (t = { name: e });
	else if (e[il]) t = { name: e[il] };
	else {
		const i = iE(e);
		if (!i) throw new Error(`${e} is not a functionReference`);
		t = { reference: i };
	}
	return t;
}
function Bn(e) {
	const t = uE(e);
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
	const i = e[il];
	if (!i) throw new Error(`${e} is not a functionReference`);
	return i;
}
function sE(e) {
	return { [il]: e };
}
function cb(e = []) {
	return new Proxy(
		{},
		{
			get(t, i) {
				if (typeof i == "string") return cb([...e, i]);
				if (i === il) {
					if (e.length < 2) {
						const o = ["api", ...e].join(".");
						throw new Error(`API path is expected to be of the form \`api.moduleName.functionName\`. Found: \`${o}\``);
					}
					const u = e.slice(0, -1).join("/"),
						l = e[e.length - 1];
					return l === "default" ? u : u + ":" + l;
				} else return i === Symbol.toStringTag ? "FunctionReference" : void 0;
			},
		},
	);
}
var lE = cb(),
	oE = Object.defineProperty,
	cE = (e, t, i) => (t in e ? oE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	nc = (e, t, i) => cE(e, typeof t != "symbol" ? t + "" : t, i),
	g0 = class Ah {
		constructor(t) {
			(nc(this, "queryResults"), nc(this, "modifiedQueries"), (this.queryResults = t), (this.modifiedQueries = []));
		}
		getQuery(t, ...i) {
			const u = Ei(i[0]),
				l = Bn(t),
				o = this.queryResults.get(Ba(l, u));
			if (o !== void 0) return Ah.queryValue(o.result);
		}
		getAllQueries(t) {
			const i = [],
				u = Bn(t);
			for (const l of this.queryResults.values())
				l.udfPath === Ha(u) && i.push({ args: l.args, value: Ah.queryValue(l.result) });
			return i;
		}
		setQuery(t, i, u) {
			const l = Ei(i),
				o = Bn(t),
				f = Ba(o, l);
			let h;
			u === void 0 ? (h = void 0) : (h = { success: !0, value: u, logLines: [] });
			const m = { udfPath: o, args: l, result: h };
			(this.queryResults.set(f, m), this.modifiedQueries.push(f));
		}
		static queryValue(t) {
			if (t !== void 0) return t.success ? t.value : void 0;
		}
	},
	fE = class {
		constructor() {
			(nc(this, "queryResults"),
				nc(this, "optimisticUpdates"),
				(this.queryResults = new Map()),
				(this.optimisticUpdates = []));
		}
		ingestQueryResultsFromServer(e, t) {
			this.optimisticUpdates = this.optimisticUpdates.filter((o) => !t.has(o.mutationId));
			const i = this.queryResults;
			this.queryResults = new Map(e);
			const u = new g0(this.queryResults);
			for (const o of this.optimisticUpdates) o.update(u);
			const l = [];
			for (const [o, f] of this.queryResults) {
				const h = i.get(o);
				(h === void 0 || h.result !== f.result) && l.push(o);
			}
			return l;
		}
		applyOptimisticUpdate(e, t) {
			this.optimisticUpdates.push({ update: e, mutationId: t });
			const i = new g0(this.queryResults);
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
				throw i.errorData !== void 0 ? xh(i, new ec(Lu("query", t.udfPath, i))) : new Error(Lu("query", t.udfPath, i));
			}
		}
		hasQueryResult(e) {
			return this.queryResults.get(e) !== void 0;
		}
		queryLogs(e) {
			return this.queryResults.get(e)?.result?.logLines;
		}
	},
	dE = Object.defineProperty,
	hE = (e, t, i) => (t in e ? dE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	Fd = (e, t, i) => hE(e, typeof t != "symbol" ? t + "" : t, i),
	cl = class Si {
		constructor(t, i) {
			(Fd(this, "low"),
				Fd(this, "high"),
				Fd(this, "__isUnsignedLong__"),
				(this.low = t | 0),
				(this.high = i | 0),
				(this.__isUnsignedLong__ = !0));
		}
		static isLong(t) {
			return (t && t.__isUnsignedLong__) === !0;
		}
		static fromBytesLE(t) {
			return new Si(t[0] | (t[1] << 8) | (t[2] << 16) | (t[3] << 24), t[4] | (t[5] << 8) | (t[6] << 16) | (t[7] << 24));
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
			return isNaN(t) || t < 0 ? y0 : t >= mE ? vE : new Si((t % Js) | 0, (t / Js) | 0);
		}
		toString() {
			return (BigInt(this.high) * BigInt(Js) + BigInt(this.low)).toString();
		}
		equals(t) {
			return (
				Si.isLong(t) || (t = Si.fromValue(t)),
				this.high >>> 31 === 1 && t.high >>> 31 === 1 ? !1 : this.high === t.high && this.low === t.low
			);
		}
		notEquals(t) {
			return !this.equals(t);
		}
		comp(t) {
			return (
				Si.isLong(t) || (t = Si.fromValue(t)),
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
			return typeof t == "number" ? Si.fromNumber(t) : new Si(t.low, t.high);
		}
	},
	y0 = new cl(0, 0),
	p0 = 65536,
	Js = p0 * p0,
	mE = Js * Js,
	vE = new cl(-1, -1),
	gE = Object.defineProperty,
	yE = (e, t, i) => (t in e ? gE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	Uo = (e, t, i) => yE(e, typeof t != "symbol" ? t + "" : t, i),
	b0 = class {
		constructor(e, t) {
			(Uo(this, "version"),
				Uo(this, "remoteQuerySet"),
				Uo(this, "queryPath"),
				Uo(this, "logger"),
				(this.version = { querySet: 0, ts: cl.fromNumber(0), identity: 0 }),
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
						if (u) for (const o of i.logLines) tc(this.logger, "info", "query", u, o);
						const l = Ku(i.value ?? null);
						this.remoteQuerySet.set(i.queryId, { success: !0, value: l, logLines: i.logLines });
						break;
					}
					case "QueryFailed": {
						const u = this.queryPath(i.queryId);
						if (u) for (const o of i.logLines) tc(this.logger, "info", "query", u, o);
						const { errorData: l } = i;
						this.remoteQuerySet.set(i.queryId, {
							success: !1,
							errorMessage: i.errorMessage,
							errorData: l !== void 0 ? Ku(l) : void 0,
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
function Gd(e) {
	const t = nl(e);
	return cl.fromBytesLE(Array.from(t));
}
function pE(e) {
	const t = new Uint8Array(e.toBytesLE());
	return rl(t);
}
function _0(e) {
	switch (e.type) {
		case "FatalError":
		case "AuthError":
		case "ActionResponse":
		case "TransitionChunk":
		case "Ping":
			return { ...e };
		case "MutationResponse":
			return e.success ? { ...e, ts: Gd(e.ts) } : { ...e };
		case "Transition":
			return {
				...e,
				startVersion: { ...e.startVersion, ts: Gd(e.startVersion.ts) },
				endVersion: { ...e.endVersion, ts: Gd(e.endVersion.ts) },
			};
		default:
	}
}
function bE(e) {
	switch (e.type) {
		case "Authenticate":
		case "ModifyQuerySet":
		case "Mutation":
		case "Action":
		case "Event":
			return { ...e };
		case "Connect":
			return e.maxObservedTimestamp !== void 0
				? { ...e, maxObservedTimestamp: pE(e.maxObservedTimestamp) }
				: { ...e, maxObservedTimestamp: void 0 };
		default:
	}
}
var _E = Object.defineProperty,
	SE = (e, t, i) => (t in e ? _E(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	en = (e, t, i) => SE(e, typeof t != "symbol" ? t + "" : t, i),
	wE = 1e3,
	EE = 1001,
	TE = 1005,
	xE = 4040,
	Fo;
function Iu() {
	return (
		Fo === void 0 && (Fo = Date.now()),
		typeof performance > "u" || !performance.now ? Date.now() : Math.round(Fo + performance.now())
	);
}
function S0() {
	return `t=${Math.round((Iu() - Fo) / 100) / 10}s`;
}
var fb = {
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
function AE(e) {
	if (e === void 0) return "Unknown";
	for (const t of Object.keys(fb)) if (e.startsWith(t)) return t;
	return "Unknown";
}
var RE = class {
	constructor(e, t, i, u, l, o) {
		((this.markConnectionStateDirty = l),
			(this.debug = o),
			en(this, "socket"),
			en(this, "connectionCount"),
			en(this, "_hasEverConnected", !1),
			en(this, "lastCloseReason"),
			en(this, "transitionChunkBuffer", null),
			en(this, "defaultInitialBackoff"),
			en(this, "maxBackoff"),
			en(this, "retries"),
			en(this, "serverInactivityThreshold"),
			en(this, "reconnectDueToServerInactivityTimeout"),
			en(this, "scheduledReconnect", null),
			en(this, "networkOnlineHandler", null),
			en(this, "pendingNetworkRecoveryInfo", null),
			en(this, "uri"),
			en(this, "onOpen"),
			en(this, "onResume"),
			en(this, "onMessage"),
			en(this, "webSocketConstructor"),
			en(this, "logger"),
			en(this, "onServerDisconnectError"),
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
			const i = _0(JSON.parse(t));
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
							clientTs: Iu(),
						})),
					this.lastCloseReason !== "InitialConnect" &&
						(this.lastCloseReason
							? this.logger.log("WebSocket reconnected at", S0(), "after disconnect due to", this.lastCloseReason)
							: this.logger.log("WebSocket reconnected at", S0())),
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
				let u = _0(JSON.parse(t.data));
				if ((this._logVerbose(`received ws message with type ${u.type}`), u.type !== "Ping")) {
					if (u.type === "TransitionChunk") {
						const l = this.assembleTransition(u);
						if (!l) return;
						((u = l), this._logVerbose(`assembled full ws message of type ${u.type}`));
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
					t.code !== wE && t.code !== EE && t.code !== TE && t.code !== xE)
				) {
					let u = `WebSocket closed with code ${t.code}`;
					(t.reason && (u += `: ${t.reason}`),
						this.logger.log(u),
						this.onServerDisconnectError && t.reason && this.onServerDisconnectError(u));
				}
				const i = AE(t.reason);
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
			const i = bE(e),
				u = JSON.stringify(i);
			let l = !1;
			try {
				(this.socket.ws.send(u), (l = !0));
			} catch (o) {
				(this.logger.log(`Failed to send message on WebSocket, reconnecting: ${o}`),
					this.closeAndReconnect("FailedToSendMessage"));
			}
			return (
				this._logVerbose(`${l ? "sent" : "failed to send"} message with type ${e.type}: ${JSON.stringify(t)}`),
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
		const i = Iu(),
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
			const t = Iu() - this.scheduledReconnect.scheduledAt;
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
							clientTs: Iu(),
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
			(e === "client" ? 100 : e === "Unknown" ? this.defaultInitialBackoff : fb[e].timeout) * Math.pow(2, this.retries);
		this.retries += 1;
		const i = Math.min(t, this.maxBackoff);
		return i + i * (Math.random() - 0.5);
	}
	reportLargeTransition({ transition: e, messageLength: t }) {
		if (e.clientClockSkew === void 0 || e.serverTs === void 0) return;
		const i = Iu() - e.clientClockSkew - e.serverTs / 1e6,
			u = `${Math.round(i)}ms`,
			l = `${Math.round(t / 1e4) / 100}MB`,
			o = t / (i / 1e3),
			f = `${Math.round(o / 1e4) / 100}MB per second`;
		(this._logVerbose(`received ${l} transition in ${u} at ${f}`),
			t > 2e7
				? this.logger.log(
						`received query results totaling more that 20MB (${l}) which will take a long time to download on slower connections`,
					)
				: i > 2e4 && this.logger.log(`received query results totaling ${l} which took more than 20s to arrive (${u})`),
			this.debug &&
				this.sendMessage({
					type: "Event",
					eventType: "ClientReceivedTransition",
					event: { transitionTransitTime: i, messageLength: t },
				}));
	}
};
function CE() {
	return kE();
}
function kE() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
		const t = (Math.random() * 16) | 0;
		return (e === "x" ? t : (t & 3) | 8).toString(16);
	});
}
var Fs = class extends Error {};
Fs.prototype.name = "InvalidTokenError";
function ME(e) {
	return decodeURIComponent(
		atob(e).replace(/(.)/g, (t, i) => {
			let u = i.charCodeAt(0).toString(16).toUpperCase();
			return (u.length < 2 && (u = "0" + u), "%" + u);
		}),
	);
}
function NE(e) {
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
		return ME(t);
	} catch {
		return atob(t);
	}
}
function db(e, t) {
	if (typeof e != "string") throw new Fs("Invalid token specified: must be a string");
	t || (t = {});
	const i = t.header === !0 ? 0 : 1,
		u = e.split(".")[i];
	if (typeof u != "string") throw new Fs(`Invalid token specified: missing part #${i + 1}`);
	let l;
	try {
		l = NE(u);
	} catch (o) {
		throw new Fs(`Invalid token specified: invalid base64 for part #${i + 1} (${o.message})`);
	}
	try {
		return JSON.parse(l);
	} catch (o) {
		throw new Fs(`Invalid token specified: invalid json for part #${i + 1} (${o.message})`);
	}
}
var OE = Object.defineProperty,
	zE = (e, t, i) => (t in e ? OE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	Kn = (e, t, i) => zE(e, typeof t != "symbol" ? t + "" : t, i),
	DE = 480 * 60 * 60 * 1e3,
	w0 = 2,
	jE = class {
		constructor(e, t, i) {
			(Kn(this, "authState", { state: "noAuth" }),
				Kn(this, "configVersion", 0),
				Kn(this, "syncState"),
				Kn(this, "authenticate"),
				Kn(this, "stopSocket"),
				Kn(this, "tryRestartSocket"),
				Kn(this, "pauseSocket"),
				Kn(this, "resumeSocket"),
				Kn(this, "clearAuth"),
				Kn(this, "logger"),
				Kn(this, "refreshTokenLeewaySeconds"),
				Kn(this, "initialAuthTokenReuse"),
				Kn(this, "lastRefreshChange"),
				Kn(this, "tokenConfirmationAttempts", 0),
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
			const l = { fetchToken: e, onAuthChange: t, onRefreshChange: i };
			(u.value
				? (this.setAuthState({ state: "waitingForServerConfirmationOfCachedToken", config: l, hasRetried: !1 }),
					this.authenticate(u.value))
				: (this.setAuthState({ state: "initialRefetch", config: l }), await this.refetchToken()),
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
					(this.authState.state === "waitingForServerConfirmationOfFreshToken" && this.tokenConfirmationAttempts >= w0))
			) {
				(this.logger.error(`Failed to authenticate: "${e.error}", check your server auth config`),
					this.syncState.hasAuth() && this.syncState.clearAuth(),
					this.authState.state !== "noAuth" && this.setAndReportAuthFailed(this.authState.config.onAuthChange));
				return;
			}
			if (
				(this.authState.state === "waitingForServerConfirmationOfFreshToken" &&
					(this.tokenConfirmationAttempts++,
					this._logVerbose(`retrying reauthentication, ${w0 - this.tokenConfirmationAttempts} attempts remaining`)),
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
			const { iat: u, exp: l } = i;
			if (!u || !l) {
				this.logger.error("Auth token does not have required fields, cannot refetch the token");
				return;
			}
			const o = l - u;
			if (o <= 2) {
				this.logger.error("Auth token does not live long enough, cannot refetch the token");
				return;
			}
			let f;
			t !== void 0 ? ((f = l - (Date.now() - t) / 1e3), f <= 0 && (f = 0)) : (f = o);
			let h = Math.min(DE, (f - this.refreshTokenLeewaySeconds) * 1e3);
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
				return db(e);
			} catch (t) {
				return (this._logVerbose(`Error decoding token: ${t instanceof Error ? t.message : "Unknown error"}`), null);
			}
		}
		_logVerbose(e) {
			this.logger.logVerbose(`${e} [v${this.configVersion}]`);
		}
	},
	qE = ["convexClientConstructed", "convexWebSocketOpen", "convexFirstMessageReceived"];
function IE(e, t) {
	const i = { sessionId: t };
	typeof performance > "u" || !performance.mark || performance.mark(e, { detail: i });
}
function LE(e) {
	let t = e.name.slice(6);
	return ((t = t.charAt(0).toLowerCase() + t.slice(1)), { name: t, startTime: e.startTime });
}
function UE(e) {
	if (typeof performance > "u" || !performance.getEntriesByName) return [];
	const t = [];
	for (const i of qE) {
		const u = performance
			.getEntriesByName(i)
			.filter((l) => l.entryType === "mark")
			.filter((l) => l.detail.sessionId === e);
		t.push(...u);
	}
	return t.map(LE);
}
var $E = Object.defineProperty,
	BE = (e, t, i) => (t in e ? $E(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	tn = (e, t, i) => BE(e, typeof t != "symbol" ? t + "" : t, i),
	VE = class {
		constructor(e, t, i) {
			if (
				(tn(this, "address"),
				tn(this, "state"),
				tn(this, "requestManager"),
				tn(this, "webSocketManager"),
				tn(this, "authenticationManager"),
				tn(this, "remoteQuerySet"),
				tn(this, "optimisticQueryResults"),
				tn(this, "_transitionHandlerCounter", 0),
				tn(this, "_nextRequestId"),
				tn(this, "_onTransitionFns", new Map()),
				tn(this, "_sessionId"),
				tn(this, "firstMessageReceived", !1),
				tn(this, "debug"),
				tn(this, "logger"),
				tn(this, "maxObservedTimestamp"),
				tn(this, "connectionStateSubscribers", new Map()),
				tn(this, "nextConnectionStateSubscriberId", 0),
				tn(this, "_lastPublishedConnectionState"),
				tn(this, "markConnectionStateDirty", () => {
					Promise.resolve().then(() => {
						const p = this.connectionState();
						if (JSON.stringify(p) !== JSON.stringify(this._lastPublishedConnectionState)) {
							this._lastPublishedConnectionState = p;
							for (const w of this.connectionStateSubscribers.values()) w(p);
						}
					});
				}),
				tn(this, "mark", (p) => {
					this.debug && IE(p, this.sessionId);
				}),
				typeof e == "object")
			)
				throw new Error(
					"Passing a ClientConfig object is no longer supported. Pass the URL of the Convex deployment as a string directly.",
				);
			(i?.skipConvexDeploymentUrlCheck !== !0 && z1(e), (i = { ...i }));
			const u = i.authRefreshTokenLeewaySeconds ?? 10;
			let l = i.webSocketConstructor;
			if (!l && typeof WebSocket > "u")
				throw new Error(
					"No WebSocket global variable defined! To use Convex in an environment without WebSocket try the HTTP client: https://docs.convex.dev/api/classes/browser.ConvexHttpClient",
				);
			((l = l || WebSocket),
				(this.debug = i.reportDebugInfoToConvex ?? !1),
				(this.address = e),
				(this.logger =
					i.logger === !1
						? ob({ verbose: i.verbose ?? !1 })
						: i.logger !== !0 && i.logger
							? i.logger
							: lb({ verbose: i.verbose ?? !1 })));
			const o = e.search("://");
			if (o === -1) throw new Error("Provided address was not an absolute URL.");
			const f = e.substring(o + 3),
				h = e.substring(0, o);
			let m;
			if (h === "http") m = "ws";
			else if (h === "https") m = "wss";
			else throw new Error(`Unknown parent protocol ${h}`);
			const v = `${m}://${f}/api/${h0}/sync`;
			((this.state = new W1()),
				(this.remoteQuerySet = new b0((p) => this.state.queryPath(p), this.logger)),
				(this.requestManager = new nE(this.logger, this.markConnectionStateDirty)));
			const g = () => {
				(this.webSocketManager.pause(), this.state.pause());
			};
			((this.authenticationManager = new jE(
				this.state,
				{
					authenticate: (p) => {
						const w = this.state.setAuth(p);
						return (this.webSocketManager.sendMessage(w), w.baseVersion);
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
				(this.optimisticQueryResults = new fE()),
				this.addOnTransitionHandler((p) => {
					t(p.queries.map((w) => w.token));
				}),
				(this._nextRequestId = 0),
				(this._sessionId = CE()));
			const { unsavedChangesWarning: _ } = i;
			if (typeof window > "u" || typeof window.addEventListener > "u") {
				if (_ === !0)
					throw new Error(
						"unsavedChangesWarning requested, but window.addEventListener not found! Remove {unsavedChangesWarning: true} from Convex client options.",
					);
			} else
				_ !== !1 &&
					window.addEventListener("beforeunload", (p) => {
						if (this.requestManager.hasIncompleteRequests()) {
							p.preventDefault();
							const w = "Are you sure you want to leave? Your changes may not be saved.";
							return (((p || window.event).returnValue = w), w);
						}
					});
			((this.webSocketManager = new RE(
				v,
				{
					onOpen: (p) => {
						(this.mark("convexWebSocketOpen"),
							this.webSocketManager.sendMessage({
								...p,
								type: "Connect",
								sessionId: this._sessionId,
								maxObservedTimestamp: this.maxObservedTimestamp,
							}),
							(this.remoteQuerySet = new b0((R) => this.state.queryPath(R), this.logger)));
						const [w, x] = this.state.restart();
						(x && this.webSocketManager.sendMessage(x), this.webSocketManager.sendMessage(w));
						for (const R of this.requestManager.restart()) this.webSocketManager.sendMessage(R);
					},
					onResume: () => {
						const [p, w] = this.state.resume();
						(w && this.webSocketManager.sendMessage(w), p && this.webSocketManager.sendMessage(p));
						for (const x of this.requestManager.resume()) this.webSocketManager.sendMessage(x);
					},
					onMessage: (p) => {
						switch (
							(this.firstMessageReceived ||
								((this.firstMessageReceived = !0), this.mark("convexFirstMessageReceived"), this.reportMarks()),
							p.type)
						) {
							case "Transition": {
								(this.observedTimestamp(p.endVersion.ts),
									this.authenticationManager.onTransition(p),
									this.remoteQuerySet.transition(p),
									this.state.transition(p));
								const w = this.requestManager.removeCompleted(this.remoteQuerySet.timestamp());
								this.notifyOnQueryResultChanges(w);
								break;
							}
							case "MutationResponse": {
								p.success && this.observedTimestamp(p.ts);
								const w = this.requestManager.onResponse(p);
								w !== null && this.notifyOnQueryResultChanges(new Map([[w.requestId, w.result]]));
								break;
							}
							case "ActionResponse":
								this.requestManager.onResponse(p);
								break;
							case "AuthError":
								this.authenticationManager.onAuthError(p);
								break;
							case "FatalError": {
								const w = G1(this.logger, p.error);
								throw (this.webSocketManager.terminate(), w);
							}
							default:
						}
						return { hasSyncedPastLastReconnect: this.hasSyncedPastLastReconnect() };
					},
					onServerDisconnectError: i.onServerDisconnectError,
				},
				l,
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
			for (const [l, o] of t) {
				const f = this.state.queryToken(l);
				if (f !== null) {
					const h = { result: o, udfPath: this.state.queryPath(l), args: this.state.queryArgs(l) };
					i.set(f, h);
				}
			}
			const u = this.optimisticQueryResults.ingestQueryResultsFromServer(i, new Set(e.keys()));
			this.handleTransition({
				queries: u.map((l) => ({
					token: l,
					modification: { kind: "Updated", result: this.optimisticQueryResults.rawQueryResult(l) },
				})),
				reflectedMutations: Array.from(e).map(([l, o]) => ({ requestId: l, result: o })),
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
					t = e ? db(e.value) : {};
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
			const u = Ei(t),
				{ modification: l, queryToken: o, unsubscribe: f } = this.state.subscribe(e, u, i?.journal, i?.componentPath);
			return (
				l !== null && this.webSocketManager.sendMessage(l),
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
			const i = Ba(e, Ei(t));
			return this.optimisticQueryResults.queryResult(i);
		}
		localQueryResultByToken(e) {
			return this.optimisticQueryResults.queryResult(e);
		}
		hasLocalQueryResultByToken(e) {
			return this.optimisticQueryResults.hasQueryResult(e);
		}
		localQueryLogs(e, t) {
			const i = Ba(e, Ei(t));
			return this.optimisticQueryResults.queryLogs(i);
		}
		queryJournal(e, t) {
			const i = Ba(e, Ei(t));
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
				throw u.errorData !== void 0 ? xh(u, new ec(Lu("mutation", e, u))) : new Error(Lu("mutation", e, u));
			return u.value;
		}
		async mutationInternal(e, t, i, u) {
			const { mutationPromise: l } = this.enqueueMutation(e, t, i, u);
			return l;
		}
		enqueueMutation(e, t, i, u) {
			const l = Ei(t);
			this.tryReportLongDisconnect();
			const o = this.nextRequestId;
			if ((this._nextRequestId++, i !== void 0)) {
				const m = i.optimisticUpdate;
				if (m !== void 0) {
					const v = (_) => {
							m(_, l) instanceof Promise &&
								this.logger.warn(
									"Optimistic update handler returned a Promise. Optimistic updates should be synchronous.",
								);
						},
						g = this.optimisticQueryResults.applyOptimisticUpdate(v, o).map((_) => {
							const p = this.localQueryResultByToken(_);
							return {
								token: _,
								modification: {
									kind: "Updated",
									result: p === void 0 ? void 0 : { success: !0, value: p, logLines: [] },
								},
							};
						});
					this.handleTransition({ queries: g, reflectedMutations: [], timestamp: this.remoteQuerySet.timestamp() });
				}
			}
			const f = { type: "Mutation", requestId: o, udfPath: e, componentPath: u, args: [or(l)] },
				h = this.webSocketManager.sendMessage(f);
			return { requestId: o, mutationPromise: this.requestManager.request(f, h) };
		}
		async action(e, t) {
			const i = await this.actionInternal(e, t);
			if (!i.success) throw i.errorData !== void 0 ? xh(i, new ec(Lu("action", e, i))) : new Error(Lu("action", e, i));
			return i.value;
		}
		async actionInternal(e, t, i) {
			const u = Ei(t),
				l = this.nextRequestId;
			(this._nextRequestId++, this.tryReportLongDisconnect());
			const o = { type: "Action", requestId: l, udfPath: e, componentPath: i, args: [or(u)] },
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
				const e = UE(this.sessionId);
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
				headers: { "Content-Type": "application/json", "Convex-Client": `npm-${h0}` },
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
function Xd(e) {
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
var ZE = Object.defineProperty,
	HE = (e, t, i) => (t in e ? ZE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	E0 = (e, t, i) => HE(e, typeof t != "symbol" ? t + "" : t, i),
	PE = class {
		constructor(e, t) {
			((this.client = e),
				(this.onTransition = t),
				E0(this, "paginatedQuerySet", new Map()),
				E0(this, "lastTransitionTs"),
				(this.lastTransitionTs = cl.fromNumber(0)),
				this.client.addOnTransitionHandler((i) => this.onBaseTransition(i)));
		}
		subscribe(e, t, i) {
			const u = Ha(e),
				l = v0(u, t, i),
				o = () => this.removePaginatedQuerySubscriber(l),
				f = this.paginatedQuerySet.get(l);
			return f
				? ((f.numSubscribers += 1), { paginatedQueryToken: l, unsubscribe: o })
				: (this.paginatedQuerySet.set(l, {
						token: l,
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
					this.addPageToPaginatedQuery(l, null, i.initialNumItems),
					{ paginatedQueryToken: l, unsubscribe: o });
		}
		localQueryResult(e, t, i) {
			const u = v0(Ha(e), t, i);
			return this.localQueryResultByToken(u);
		}
		localQueryResultByToken(e) {
			const t = this.paginatedQuerySet.get(e);
			if (!t) return;
			const i = this.activePageQueryTokens(t);
			if (i.length === 0)
				return { results: [], status: "LoadingFirstPage", loadMore: (h) => this.loadMoreOfPaginatedQuery(e, h) };
			let u = [],
				l = !1,
				o = !1;
			for (const h of i) {
				const m = this.client.localQueryResultByToken(h);
				if (m === void 0) {
					((l = !0), (o = !1));
					continue;
				}
				const v = Xd(m);
				((u = u.concat(v.page)), (o = !!v.isDone));
			}
			let f;
			return (
				l ? (f = u.length === 0 ? "LoadingFirstPage" : "LoadingMore") : o ? (f = "Exhausted") : (f = "CanLoadMore"),
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
			const l = { ...e, paginatedQueries: u };
			this.onTransition(l);
		}
		loadMoreOfPaginatedQuery(e, t) {
			this.mustGetPaginatedQuery(e);
			const i = this.queryTokenForLastPageOfPaginatedQuery(e),
				u = this.client.localQueryResultByToken(i);
			if (!u) return !1;
			const l = Xd(u);
			if (l.isDone) return !1;
			this.addPageToPaginatedQuery(e, l.continueCursor, t);
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
			for (const [u, l] of this.paginatedQuerySet)
				for (const o of this.allQueryTokens(l))
					if (i.has(o)) {
						t.push(u);
						break;
					}
			return t;
		}
		processPaginatedQuerySplits(e, t) {
			for (const i of e) {
				const u = this.mustGetPaginatedQuery(i),
					{ ongoingSplits: l, pageKeyToQuery: o, pageKeys: f } = u;
				for (const [h, [m, v]] of l)
					t(o.get(m).queryToken) !== void 0 &&
						t(o.get(v).queryToken) !== void 0 &&
						this.completePaginatedQuerySplit(u, h, m, v);
				for (const h of f) {
					if (l.has(h)) continue;
					const m = o.get(h);
					if (!m) throw new Error(`No page query for active pageKey ${h}`);
					const v = t(m.queryToken);
					if (!v) continue;
					const g = Xd(v);
					g.splitCursor &&
						(g.pageStatus === "SplitRecommended" ||
							g.pageStatus === "SplitRequired" ||
							g.page.length > u.options.initialNumItems * 2) &&
						this.splitPaginatedQueryPage(u, h, m.cursor, g.splitCursor, g.continueCursor);
				}
			}
		}
		splitPaginatedQueryPage(e, t, i, u, l) {
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
				paginationOpts: { ...h, cursor: u, endCursor: l },
			});
			(e.pageKeyToQuery.set(f, { ...v, cursor: u }), e.ongoingSplits.set(t, [o, f]));
		}
		addPageToPaginatedQuery(e, t, i) {
			const u = this.mustGetPaginatedQuery(e),
				l = u.nextPageKey++,
				o = { cursor: t, numItems: i, id: u.id },
				f = { ...u.args, paginationOpts: o },
				h = this.client.subscribe(u.canonicalizedUdfPath, f);
			return (u.pageKeys.push(l), u.pageKeyToQuery.set(l, { ...h, cursor: t }), h);
		}
		removePaginatedQuerySubscriber(e) {
			const t = this.paginatedQuerySet.get(e);
			if (t && ((t.numSubscribers -= 1), !(t.numSubscribers > 0))) {
				for (const i of t.pageKeyToQuery.values()) i.unsubscribe();
				this.paginatedQuerySet.delete(e);
			}
		}
		completePaginatedQuerySplit(e, t, i, u) {
			const l = e.pageKeyToQuery.get(t);
			e.pageKeyToQuery.delete(t);
			const o = e.pageKeys.indexOf(t);
			(e.pageKeys.splice(o, 1, i, u), e.ongoingSplits.delete(t), l.unsubscribe());
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
	b = tb(yc(), 1);
function QE({ getCurrentValue: e, subscribe: t }) {
	const [i, u] = (0, b.useState)(() => ({ getCurrentValue: e, subscribe: t, value: e() }));
	let l = i.value;
	return (
		(i.getCurrentValue !== e || i.subscribe !== t) && ((l = e()), u({ getCurrentValue: e, subscribe: t, value: l })),
		(0, b.useEffect)(() => {
			let o = !1;
			const f = () => {
					o ||
						u((m) => {
							if (m.getCurrentValue !== e || m.subscribe !== t) return m;
							const v = e();
							return m.value === v ? m : { ...m, value: v };
						});
				},
				h = t(f);
			return (
				f(),
				() => {
					((o = !0), h());
				}
			);
		}, [e, t]),
		l
	);
}
var KE = Object.defineProperty,
	YE = (e, t, i) => (t in e ? KE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	_i = (e, t, i) => YE(e, typeof t != "symbol" ? t + "" : t, i),
	FE = 5e3;
if (typeof b.default > "u") throw new Error("Required dependency 'react' not found");
var GE = class {
		constructor(e, t) {
			if (
				(_i(this, "address"),
				_i(this, "cachedSync"),
				_i(this, "cachedPaginatedQueryClient"),
				_i(this, "listeners"),
				_i(this, "options"),
				_i(this, "closed", !1),
				_i(this, "_logger"),
				_i(this, "adminAuth"),
				_i(this, "fakeUserIdentity"),
				e === void 0)
			)
				throw new Error(
					"No address provided to ConvexReactClient.\nIf trying to deploy to production, make sure to follow all the instructions found at https://docs.convex.dev/production/hosting/\nIf running locally, make sure to run `convex dev` and ensure the .env.local file is populated.",
				);
			if (typeof e != "string")
				throw new Error(
					`ConvexReactClient requires a URL like 'https://happy-otter-123.convex.cloud', received something of type ${typeof e} instead.`,
				);
			if (!e.includes("://")) throw new Error("Provided address was not an absolute URL.");
			((this.address = e),
				(this.listeners = new Map()),
				(this._logger =
					t?.logger === !1
						? ob({ verbose: t?.verbose ?? !1 })
						: t?.logger !== !0 && t?.logger
							? t.logger
							: lb({ verbose: t?.verbose ?? !1 })),
				(this.options = { ...t, logger: this._logger }));
		}
		get url() {
			return this.address;
		}
		get sync() {
			if (this.closed) throw new Error("ConvexReactClient has already been closed.");
			return this.cachedSync
				? this.cachedSync
				: ((this.cachedSync = this.options.baseClient ?? new VE(this.address, () => {}, this.options)),
					this.adminAuth && this.cachedSync.setAdminAuth(this.adminAuth, this.fakeUserIdentity),
					(this.cachedPaginatedQueryClient = new PE(this.cachedSync, (e) => this.handleTransition(e))),
					this.cachedSync);
		}
		get paginatedQueryClient() {
			if ((this.sync, this.cachedPaginatedQueryClient)) return this.cachedPaginatedQueryClient;
			throw new Error("Should already be instantiated");
		}
		setAuth(e, t, i) {
			if (typeof e == "string")
				throw new Error(
					"Passing a string to ConvexReactClient.setAuth is no longer supported, please upgrade to passing in an async function to handle reauthentication.",
				);
			this.sync.setAuth(e, t ?? (() => {}), i);
		}
		clearAuth() {
			this.sync.clearAuth();
		}
		setAdminAuth(e, t) {
			if (((this.adminAuth = e), (this.fakeUserIdentity = t), this.closed))
				throw new Error("ConvexReactClient has already been closed.");
			this.cachedSync && this.sync.setAdminAuth(e, t);
		}
		watchQuery(e, ...t) {
			const [i, u] = t,
				l = Bn(e);
			return {
				onUpdate: (o) => {
					const { queryToken: f, unsubscribe: h } = this.sync.subscribe(l, i, u),
						m = this.listeners.get(f);
					return (
						m !== void 0 ? m.add(o) : this.listeners.set(f, new Set([o])),
						() => {
							if (this.closed) return;
							const v = this.listeners.get(f);
							(v.delete(o), v.size === 0 && this.listeners.delete(f), h());
						}
					);
				},
				localQueryResult: () => {
					if (this.cachedSync) return this.cachedSync.localQueryResult(l, i);
				},
				localQueryLogs: () => {
					if (this.cachedSync) return this.cachedSync.localQueryLogs(l, i);
				},
				journal: () => {
					if (this.cachedSync) return this.cachedSync.queryJournal(l, i);
				},
			};
		}
		prewarmQuery(e) {
			const t = e.extendSubscriptionFor ?? FE,
				i = this.watchQuery(e.query, e.args || {}).onUpdate(() => {});
			setTimeout(i, t);
		}
		watchPaginatedQuery(e, t, i) {
			const u = Bn(e);
			return {
				onUpdate: (l) => {
					const { paginatedQueryToken: o, unsubscribe: f } = this.paginatedQueryClient.subscribe(u, t || {}, i),
						h = this.listeners.get(o);
					return (
						h !== void 0 ? h.add(l) : this.listeners.set(o, new Set([l])),
						() => {
							if (this.closed) return;
							const m = this.listeners.get(o);
							(m.delete(l), m.size === 0 && this.listeners.delete(o), f());
						}
					);
				},
				localQueryResult: () => this.paginatedQueryClient.localQueryResult(u, t, i),
			};
		}
		mutation(e, ...t) {
			const [i, u] = t,
				l = Bn(e);
			return this.sync.mutation(l, i, u);
		}
		action(e, ...t) {
			const i = Bn(e);
			return this.sync.action(i, ...t);
		}
		query(e, ...t) {
			const i = this.watchQuery(e, ...t),
				u = i.localQueryResult();
			return u !== void 0
				? Promise.resolve(u)
				: new Promise((l, o) => {
						const f = i.onUpdate(() => {
							f();
							try {
								l(i.localQueryResult());
							} catch (h) {
								o(h);
							}
						});
					});
		}
		connectionState() {
			return this.sync.connectionState();
		}
		subscribeToConnectionState(e) {
			return this.sync.subscribeToConnectionState(e);
		}
		get logger() {
			return this._logger;
		}
		async close() {
			if (
				((this.closed = !0),
				(this.listeners = new Map()),
				this.cachedPaginatedQueryClient && (this.cachedPaginatedQueryClient = void 0),
				this.cachedSync)
			) {
				const e = this.cachedSync;
				((this.cachedSync = void 0), await e.close());
			}
		}
		handleTransition(e) {
			const t = e.queries.map((u) => u.token),
				i = e.paginatedQueries.map((u) => u.token);
			this.transition([...t, ...i]);
		}
		transition(e) {
			for (const t of e) {
				const i = this.listeners.get(t);
				if (i) for (const u of i) u();
			}
		}
	},
	hb = b.createContext(void 0);
function mb() {
	return (0, b.useContext)(hb);
}
var XE = ({ client: e, children: t }) => b.createElement(hb.Provider, { value: e }, t);
function Va(e, ...t) {
	const i = t[0] === "skip",
		u = t[0] === "skip" ? {} : Ei(t[0]),
		l = typeof e == "string" ? sE(e) : e,
		o = Bn(l),
		f = rc((0, b.useMemo)(() => (i ? {} : { query: { query: l, args: u } }), [JSON.stringify(or(u)), o, i])).query;
	if (f instanceof Error) throw f;
	return f;
}
var JE = Object.defineProperty,
	WE = (e, t, i) => (t in e ? JE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (e[t] = i)),
	Jd = (e, t, i) => WE(e, typeof t != "symbol" ? t + "" : t, i),
	eT = class {
		constructor(e) {
			(Jd(this, "createWatch"),
				Jd(this, "queries"),
				Jd(this, "listeners"),
				(this.createWatch = e),
				(this.queries = {}),
				(this.listeners = new Set()));
		}
		setQueries(e) {
			for (const t of Object.keys(e)) {
				const { query: i, args: u, paginationOptions: l } = e[t];
				if ((Bn(i), this.queries[t] === void 0)) this.addQuery(t, i, u, l ? { paginationOptions: l } : {});
				else {
					const o = this.queries[t];
					(Bn(i) !== Bn(o.query) ||
						JSON.stringify(or(u)) !== JSON.stringify(or(o.args)) ||
						JSON.stringify(l) !== JSON.stringify(o.paginationOptions)) &&
						(this.removeQuery(t), this.addQuery(t, i, u, l ? { paginationOptions: l } : {}));
				}
			}
			for (const t of Object.keys(this.queries)) e[t] === void 0 && this.removeQuery(t);
		}
		subscribe(e) {
			return (
				this.listeners.add(e),
				() => {
					this.listeners.delete(e);
				}
			);
		}
		getLocalResults(e) {
			const t = {};
			for (const i of Object.keys(e)) {
				const { query: u, args: l } = e[i],
					o = e[i].paginationOptions;
				Bn(u);
				const f = this.createWatch(u, l, o ? { paginationOptions: o } : {});
				let h;
				try {
					h = f.localQueryResult();
				} catch (m) {
					if (m instanceof Error) h = m;
					else throw m;
				}
				t[i] = h;
			}
			return t;
		}
		setCreateWatch(e) {
			this.createWatch = e;
			for (const t of Object.keys(this.queries)) {
				const { query: i, args: u, watch: l, paginationOptions: o } = this.queries[t],
					f = "journal" in l ? l.journal() : void 0;
				(this.removeQuery(t),
					this.addQuery(t, i, u, { ...(f ? { journal: f } : []), ...(o ? { paginationOptions: o } : {}) }));
			}
		}
		destroy() {
			for (const e of Object.keys(this.queries)) this.removeQuery(e);
			this.listeners = new Set();
		}
		addQuery(e, t, i, { paginationOptions: u, journal: l }) {
			if (this.queries[e] !== void 0)
				throw new Error(`Tried to add a new query with identifier ${e} when it already exists.`);
			const o = this.createWatch(t, i, { ...(l ? { journal: l } : []), ...(u ? { paginationOptions: u } : {}) }),
				f = o.onUpdate(() => this.notifyListeners());
			this.queries[e] = { query: t, args: i, watch: o, unsubscribe: f, ...(u ? { paginationOptions: u } : {}) };
		}
		removeQuery(e) {
			const t = this.queries[e];
			if (t === void 0) throw new Error(`No query found with identifier ${e}.`);
			(t.unsubscribe(), delete this.queries[e]);
		}
		notifyListeners() {
			for (const e of this.listeners) e();
		}
	};
function rc(e) {
	const t = mb();
	if (t === void 0)
		throw new Error(
			"Could not find Convex client! `useQuery` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return tT(
		e,
		(0, b.useMemo)(
			() =>
				(i, u, { journal: l, paginationOptions: o }) =>
					o ? t.watchPaginatedQuery(i, u, o) : t.watchQuery(i, u, l ? { journal: l } : {}),
			[t],
		),
	);
}
function tT(e, t) {
	const [i] = (0, b.useState)(() => new eT(t));
	return (
		i.createWatch !== t && i.setCreateWatch(t),
		(0, b.useEffect)(() => () => i.destroy(), [i]),
		QE(
			(0, b.useMemo)(
				() => ({ getCurrentValue: () => i.getLocalResults(e), subscribe: (u) => (i.setQueries(e), i.subscribe(u)) }),
				[i, e],
			),
		)
	);
}
var nT = (e, t, i) => (u) => {
		const l = { ...u.queries },
			o = u.nextPageKey,
			f = u.nextPageKey + 1,
			h = u.nextPageKey + 2;
		((l[o] = {
			query: u.query,
			args: { ...u.args, paginationOpts: { ...u.queries[e].args.paginationOpts, endCursor: t } },
		}),
			(l[f] = {
				query: u.query,
				args: { ...u.args, paginationOpts: { ...u.queries[e].args.paginationOpts, cursor: t, endCursor: i } },
			}));
		const m = { ...u.ongoingSplits };
		return ((m[e] = [o, f]), { ...u, nextPageKey: h, queries: l, ongoingSplits: m });
	},
	rT = (e) => (t) => {
		const i = t.ongoingSplits[e];
		if (i === void 0) return t;
		const u = { ...t.queries };
		delete u[e];
		const l = { ...t.ongoingSplits };
		delete l[e];
		let o = t.pageKeys.slice();
		const f = t.pageKeys.findIndex((h) => h === e);
		return (
			f >= 0 && (o = [...t.pageKeys.slice(0, f), ...i, ...t.pageKeys.slice(f + 1)]),
			{ ...t, queries: u, pageKeys: o, ongoingSplits: l }
		);
	};
function iT(e, t, i) {
	const { user: u } = sT(e, t, i, !0);
	return u;
}
var aT = Symbol("includePageKeys"),
	uT = Symbol("page");
function sT(e, t, i, u = !0) {
	if (typeof i?.initialNumItems != "number" || i.initialNumItems < 0)
		throw new Error(`\`options.initialNumItems\` must be a positive number. Received \`${i?.initialNumItems}\`.`);
	const l = t === "skip",
		o = l ? {} : t,
		f = Bn(e),
		h = (0, b.useMemo)(
			() => () => {
				const I = lT();
				return {
					query: e,
					args: o,
					id: I,
					nextPageKey: 1,
					pageKeys: l ? [] : [0],
					queries: l
						? {}
						: { 0: { query: e, args: { ...o, paginationOpts: { numItems: i.initialNumItems, cursor: null, id: I } } } },
					ongoingSplits: {},
					skip: l,
				};
			},
			[JSON.stringify(or(o)), f, i.initialNumItems, l],
		),
		[m, v] = (0, b.useState)(h);
	let g = m;
	(Bn(e) !== Bn(m.query) || JSON.stringify(or(o)) !== JSON.stringify(or(m.args)) || l !== m.skip) && ((g = h()), v(g));
	const _ = mb().logger,
		p = rc(g.queries),
		w = i[aT] ?? !1,
		[x, R, z] = (0, b.useMemo)(() => {
			let I;
			const j = [];
			for (const N of g.pageKeys) {
				if (((I = p[N]), I === void 0)) break;
				if (I instanceof Error) {
					if (
						I.message.includes("InvalidCursor") ||
						(I instanceof ec &&
							typeof I.data == "object" &&
							I.data?.isConvexSystemError === !0 &&
							I.data?.paginationError === "InvalidCursor")
					)
						return (
							_.warn("usePaginatedQuery hit error, resetting pagination state: " + I.message),
							v(h),
							[[], void 0, void 0]
						);
					if (u) throw I;
					return [j, void 0, I];
				}
				const C = g.ongoingSplits[N];
				if (
					(C !== void 0
						? p[C[0]] !== void 0 && p[C[1]] !== void 0 && v(rT(N))
						: I.splitCursor &&
							(I.pageStatus === "SplitRecommended" ||
								I.pageStatus === "SplitRequired" ||
								I.page.length > i.initialNumItems * 2) &&
							v(nT(N, I.splitCursor, I.continueCursor)),
					I.pageStatus === "SplitRequired")
				)
					return [j, void 0, void 0];
				j.push(...(w ? I.page.map((q) => ({ ...q, [uT]: N.toString() })) : I.page));
			}
			return [j, I, void 0];
		}, [p, g.pageKeys, g.ongoingSplits, i.initialNumItems, h, _, w, u]);
	return {
		user: {
			results: x,
			...(0, b.useMemo)(() => {
				if (z !== void 0) return { status: "Error", isLoading: !1, error: z, loadMore: () => {} };
				if (R === void 0)
					return g.nextPageKey === 1
						? { status: "LoadingFirstPage", isLoading: !0, loadMore: () => {} }
						: { status: "LoadingMore", isLoading: !0, loadMore: (N) => {} };
				if (R.isDone) return { status: "Exhausted", isLoading: !1, loadMore: (N) => {} };
				const I = R.continueCursor;
				let j = !1;
				return {
					status: "CanLoadMore",
					isLoading: !1,
					loadMore: (N) => {
						j ||
							((j = !0),
							v((C) => {
								const q = [...C.pageKeys, C.nextPageKey],
									J = { ...C.queries };
								return (
									(J[C.nextPageKey] = {
										query: C.query,
										args: { ...C.args, paginationOpts: { numItems: N, cursor: I, id: C.id } },
									}),
									{ ...C, nextPageKey: C.nextPageKey + 1, pageKeys: q, queries: J }
								);
							}));
					},
				};
			}, [z, R, g.nextPageKey]),
		},
		internal: { state: g },
	};
}
var T0 = 0;
function lT() {
	return (T0++, T0);
}
var oT = lE,
	x0 = 6e4,
	cT = 500,
	fT = 1e4,
	dT = 1e3,
	hT = 3e4,
	mT = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function A0(e) {
	if (typeof e != "object" || e === null) return null;
	const t = e;
	if ((t.mode !== "light" && t.mode !== "dark") || typeof t.tokens != "object" || t.tokens === null) return null;
	const i = {};
	for (const [u, l] of Object.entries(t.tokens)) {
		if (typeof l != "string") return null;
		i[u] = l;
	}
	return { mode: t.mode, tokens: i };
}
function R0(e) {
	const t = document.documentElement;
	for (const [i, u] of Object.entries(e.tokens)) t.style.setProperty(i, u);
	(t.classList.toggle("light", e.mode === "light"), t.classList.toggle("dark", e.mode === "dark"));
}
function vT(e) {
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
function gT(e) {
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
function yT() {
	const e = window.location.hash.slice(1);
	if (!e) throw new Error("Missing host bridge fragment — this plugin frame must be embedded by the Bonobo host app");
	const t = new URLSearchParams(e),
		i = t.getAll("parentOrigin"),
		u = t.getAll("nonce");
	if (t.size !== 2 || i.length !== 1 || u.length !== 1) throw new Error("Invalid host bridge fragment");
	const l = i[0],
		o = u[0];
	let f;
	try {
		f = new URL(l);
	} catch {
		throw new Error("Invalid host bridge parent origin");
	}
	if ((f.protocol !== "http:" && f.protocol !== "https:") || f.origin !== l)
		throw new Error("Invalid host bridge parent origin");
	if (!mT.test(o)) throw new Error("Invalid host bridge nonce");
	return { parentOrigin: l, nonce: o };
}
async function pT() {
	const { parentOrigin: e, nonce: t } = yT();
	let i = "",
		u = "",
		l = 0,
		o = "",
		f = 0,
		h = null;
	const m = new Set(),
		v = new Map();
	let g = null;
	async function _() {
		return Date.now() >= l - x0 ? p() : u;
	}
	function p() {
		if (g) return g;
		const N = crypto.randomUUID();
		return (
			(g = new Promise((C, q) => {
				const J = setTimeout(() => {
					(v.delete(N), q(new Error("Plugin frame token refresh timed out")));
				}, fT);
				v.set(N, { resolve: C, reject: q, timeout: J });
				try {
					window.parent.postMessage({ type: "bonobo:token-refresh-request", nonce: t, requestId: N }, e);
				} catch (G) {
					(clearTimeout(J), v.delete(N), q(G));
				}
			}).finally(() => {
				g = null;
			})),
			g
		);
	}
	const w = () => o !== "" && Date.now() < f - x0,
		x = (N) => {
			typeof N.jwt == "string" && typeof N.jwtExpiresAt == "number" && Number.isFinite(N.jwtExpiresAt)
				? ((o = N.jwt), (f = N.jwtExpiresAt))
				: ((o = ""), (f = 0));
		};
	async function R(N, C) {
		const q = C?.body !== void 0,
			J = ($) => {
				const B = new Headers(C?.headers);
				return (
					B.set("Authorization", `Bearer ${$}`),
					q && B.set("Content-Type", "application/json"),
					fetch(i + N, {
						method: C?.method ?? (q ? "POST" : "GET"),
						headers: B,
						body: q ? JSON.stringify(C.body) : void 0,
					})
				);
			},
			G = await _();
		let k = await J(G);
		if ((k.status === 401 && (k = await J(u !== G ? u : await p())), !k.ok)) {
			const $ = await k.text();
			throw Object.assign(new Error(`${N} responded ${k.status}: ${$}`), { status: k.status, responseText: $ });
		}
		return k.json();
	}
	const z = {
			invoke(N) {
				return R("/api/v1/plugin-backend/invoke", {
					body: {
						endpoint: N.endpoint,
						...(N.input === void 0 ? {} : { input: N.input }),
						...(N.serializationKey === void 0 ? {} : { serializationKey: N.serializationKey }),
					},
				})
					.then((C) => {
						const q = vT(C);
						return q === void 0
							? (console.error("[bonobo-plugin-sdk] Plugin backend invoke response was invalid"),
								{ _nay: { name: "unavailable", message: "Failed to run the plugin backend" } })
							: { _yay: q };
					})
					.catch((C) => {
						const q = typeof C == "object" && C !== null ? C : null,
							J = typeof q?.status == "number" ? q.status : null;
						let G = null;
						if (typeof q?.responseText == "string")
							try {
								const $ = JSON.parse(q.responseText);
								G = typeof $ == "object" && $ !== null ? $ : null;
							} catch {
								G = null;
							}
						const k = typeof G?.message == "string" ? G.message : null;
						return J === 409 || J === 429
							? {
									_nay: {
										name: "busy",
										message: k ?? "The plugin backend is busy",
										...(typeof G?.retryAfterMs == "number" ? { retryAfterMs: G.retryAfterMs } : {}),
									},
								}
							: J === 401 || J === 403
								? Date.now() >= l
									? { _nay: { name: "session_expired", message: "This plugin session expired" } }
									: { _nay: { name: "denied", message: k ?? "This plugin may not run its backend here" } }
								: J !== null && J < 500 && k !== null
									? { _nay: { name: "invalid", message: k } }
									: Date.now() >= l
										? { _nay: { name: "session_expired", message: "This plugin session expired" } }
										: (console.error("[bonobo-plugin-sdk] Plugin backend invoke failed:", C),
											{ _nay: { name: "unavailable", message: "Failed to run the plugin backend" } });
					});
			},
		},
		I = (N) =>
			fetch(i + "/plugins-ui/session-jwt", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token: N }),
			});
	async function j(N) {
		const C = N?.forceRefreshToken === !0;
		for (let q = 0; ; q += 1) {
			if (w() && !C) return o;
			let J = null;
			try {
				if (o !== "" && (await p(), w())) return o;
				((J = await I(await _())), J.status === 401 && (J = await I(await p())));
			} catch {
				J = null;
			}
			if (J?.ok) {
				const G = await J.json().catch(() => null),
					k = G?._yay?.jwt,
					$ = G?._yay?.sessionExpiresAt;
				return typeof k != "string" || typeof $ != "number" ? null : ((l = $), (o = k), (f = $), k);
			}
			if (!(J === null || J.status === 429 || J.status >= 500) || q >= 2) return null;
			await new Promise((G) => setTimeout(G, 1e3 * (q + 1)));
		}
	}
	return new Promise((N) => {
		let C = !1,
			q;
		const J = () => {
				window.parent.postMessage({ type: "bonobo:ready", nonce: t }, e);
			},
			G = () => {
				clearInterval(q);
			},
			k = ($) => {
				if ($.source !== window.parent || $.origin !== e) return;
				const B = $.data;
				if (!(typeof B != "object" || B === null)) {
					if (
						B.type === "bonobo:init" &&
						!C &&
						B.nonce === t &&
						typeof B.apiOrigin == "string" &&
						typeof B.convexUrl == "string" &&
						typeof B.token == "string" &&
						typeof B.tokenExpiresAt == "number" &&
						Number.isFinite(B.tokenExpiresAt) &&
						gT(B.context)
					) {
						((C = !0),
							G(),
							window.removeEventListener("pagehide", G),
							(i = B.apiOrigin),
							(u = B.token),
							(l = B.tokenExpiresAt),
							x(B));
						const Q = new GE(B.convexUrl, { expectAuth: !0, unsavedChangesWarning: !1, initialAuthTokenReuse: !0 });
						let oe = Date.now();
						const le = setInterval(() => {
							const te = Date.now();
							(te - oe >= hT && Q.setAuth(j), (oe = te));
						}, dT);
						(Q.setAuth(j),
							window.addEventListener(
								"pagehide",
								() => {
									(clearInterval(le), Q.close());
								},
								{ once: !0 },
							),
							(h = A0(B.theme)),
							h && R0(h),
							N({
								context: B.context,
								apiOrigin: i,
								getToken: _,
								refreshToken: p,
								fetchJson: R,
								backend: z,
								convex: Q,
								api: oT,
								session: { expiresAt: () => l, fetchJwt: j },
								theme: {
									current: () => h,
									subscribe(te) {
										return (
											m.add(te),
											() => {
												m.delete(te);
											}
										);
									},
								},
							}));
					} else if (
						C &&
						B.nonce === t &&
						B.type === "bonobo:token" &&
						typeof B.requestId == "string" &&
						typeof B.token == "string" &&
						typeof B.tokenExpiresAt == "number" &&
						Number.isFinite(B.tokenExpiresAt)
					) {
						const Q = v.get(B.requestId);
						Q &&
							(v.delete(B.requestId),
							clearTimeout(Q.timeout),
							(u = B.token),
							(l = B.tokenExpiresAt),
							x(B),
							Q.resolve(B.token));
					} else if (C && B.nonce === t && B.type === "bonobo:theme") {
						const Q = A0(B.theme);
						if (Q) {
							((h = Q), R0(Q));
							for (const oe of m) oe(Q);
						}
					} else if (
						C &&
						B.nonce === t &&
						B.type === "bonobo:token-error" &&
						typeof B.requestId == "string" &&
						typeof B.message == "string"
					) {
						const Q = v.get(B.requestId);
						Q && (v.delete(B.requestId), clearTimeout(Q.timeout), Q.reject(new Error(B.message)));
					}
				}
			};
		(window.addEventListener("message", k),
			window.addEventListener("pagehide", G, { once: !0 }),
			J(),
			(q = setInterval(J, cT)));
	});
}
var bT = Er((e) => {
		function t(O, V) {
			var P = O.length;
			O.push(V);
			e: for (; 0 < P; ) {
				var ve = (P - 1) >>> 1,
					ye = O[ve];
				if (0 < l(ye, V)) ((O[ve] = V), (O[P] = ye), (P = ve));
				else break e;
			}
		}
		function i(O) {
			return O.length === 0 ? null : O[0];
		}
		function u(O) {
			if (O.length === 0) return null;
			var V = O[0],
				P = O.pop();
			if (P !== V) {
				O[0] = P;
				e: for (var ve = 0, ye = O.length, Be = ye >>> 1; ve < Be; ) {
					var M = 2 * (ve + 1) - 1,
						L = O[M],
						se = M + 1,
						ce = O[se];
					if (0 > l(L, P))
						se < ye && 0 > l(ce, L) ? ((O[ve] = ce), (O[se] = P), (ve = se)) : ((O[ve] = L), (O[M] = P), (ve = M));
					else if (se < ye && 0 > l(ce, P)) ((O[ve] = ce), (O[se] = P), (ve = se));
					else break e;
				}
			}
			return V;
		}
		function l(O, V) {
			var P = O.sortIndex - V.sortIndex;
			return P !== 0 ? P : O.id - V.id;
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
			p = 3,
			w = !1,
			x = !1,
			R = !1,
			z = !1,
			I = typeof setTimeout == "function" ? setTimeout : null,
			j = typeof clearTimeout == "function" ? clearTimeout : null,
			N = typeof setImmediate < "u" ? setImmediate : null;
		function C(O) {
			for (var V = i(v); V !== null; ) {
				if (V.callback === null) u(v);
				else if (V.startTime <= O) (u(v), (V.sortIndex = V.expirationTime), t(m, V));
				else break;
				V = i(v);
			}
		}
		function q(O) {
			if (((R = !1), C(O), !x))
				if (i(m) !== null) ((x = !0), J || ((J = !0), oe()));
				else {
					var V = i(v);
					V !== null && ne(q, V.startTime - O);
				}
		}
		var J = !1,
			G = -1,
			k = 5,
			$ = -1;
		function B() {
			return z ? !0 : !(e.unstable_now() - $ < k);
		}
		function Q() {
			if (((z = !1), J)) {
				var O = e.unstable_now();
				$ = O;
				var V = !0;
				try {
					e: {
						((x = !1), R && ((R = !1), j(G), (G = -1)), (w = !0));
						var P = p;
						try {
							t: {
								for (C(O), _ = i(m); _ !== null && !(_.expirationTime > O && B()); ) {
									var ve = _.callback;
									if (typeof ve == "function") {
										((_.callback = null), (p = _.priorityLevel));
										var ye = ve(_.expirationTime <= O);
										if (((O = e.unstable_now()), typeof ye == "function")) {
											((_.callback = ye), C(O), (V = !0));
											break t;
										}
										(_ === i(m) && u(m), C(O));
									} else u(m);
									_ = i(m);
								}
								if (_ !== null) V = !0;
								else {
									var Be = i(v);
									(Be !== null && ne(q, Be.startTime - O), (V = !1));
								}
							}
							break e;
						} finally {
							((_ = null), (p = P), (w = !1));
						}
						V = void 0;
					}
				} finally {
					V ? oe() : (J = !1);
				}
			}
		}
		var oe;
		if (typeof N == "function")
			oe = function () {
				N(Q);
			};
		else if (typeof MessageChannel < "u") {
			var le = new MessageChannel(),
				te = le.port2;
			((le.port1.onmessage = Q),
				(oe = function () {
					te.postMessage(null);
				}));
		} else
			oe = function () {
				I(Q, 0);
			};
		function ne(O, V) {
			G = I(function () {
				O(e.unstable_now());
			}, V);
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
					: (k = 0 < O ? Math.floor(1e3 / O) : 5);
			}),
			(e.unstable_getCurrentPriorityLevel = function () {
				return p;
			}),
			(e.unstable_next = function (O) {
				switch (p) {
					case 1:
					case 2:
					case 3:
						var V = 3;
						break;
					default:
						V = p;
				}
				var P = p;
				p = V;
				try {
					return O();
				} finally {
					p = P;
				}
			}),
			(e.unstable_requestPaint = function () {
				z = !0;
			}),
			(e.unstable_runWithPriority = function (O, V) {
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
				var P = p;
				p = O;
				try {
					return V();
				} finally {
					p = P;
				}
			}),
			(e.unstable_scheduleCallback = function (O, V, P) {
				var ve = e.unstable_now();
				switch (
					(typeof P == "object" && P !== null
						? ((P = P.delay), (P = typeof P == "number" && 0 < P ? ve + P : ve))
						: (P = ve),
					O)
				) {
					case 1:
						var ye = -1;
						break;
					case 2:
						ye = 250;
						break;
					case 5:
						ye = 1073741823;
						break;
					case 4:
						ye = 1e4;
						break;
					default:
						ye = 5e3;
				}
				return (
					(ye = P + ye),
					(O = { id: g++, callback: V, priorityLevel: O, startTime: P, expirationTime: ye, sortIndex: -1 }),
					P > ve
						? ((O.sortIndex = P),
							t(v, O),
							i(m) === null && O === i(v) && (R ? (j(G), (G = -1)) : (R = !0), ne(q, P - ve)))
						: ((O.sortIndex = ye), t(m, O), x || w || ((x = !0), J || ((J = !0), oe()))),
					O
				);
			}),
			(e.unstable_shouldYield = B),
			(e.unstable_wrapCallback = function (O) {
				var V = p;
				return function () {
					var P = p;
					p = V;
					try {
						return O.apply(this, arguments);
					} finally {
						p = P;
					}
				};
			}));
	}),
	_T = Er((e, t) => {
		t.exports = bT();
	}),
	ST = Er((e) => {
		var t = yc();
		function i(v) {
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
		var l = {
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
		function f(v, g, _) {
			var p = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
			return { $$typeof: o, key: p == null ? null : "" + p, children: v, containerInfo: g, implementation: _ };
		}
		var h = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		function m(v, g) {
			if (v === "font") return "";
			if (typeof g == "string") return g === "use-credentials" ? g : "";
		}
		((e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l),
			(e.createPortal = function (v, g) {
				var _ = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
				if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)) throw Error(i(299));
				return f(v, g, null, _);
			}),
			(e.flushSync = function (v) {
				var g = h.T,
					_ = l.p;
				try {
					if (((h.T = null), (l.p = 2), v)) return v();
				} finally {
					((h.T = g), (l.p = _), l.d.f());
				}
			}),
			(e.preconnect = function (v, g) {
				typeof v == "string" &&
					(g
						? ((g = g.crossOrigin), (g = typeof g == "string" ? (g === "use-credentials" ? g : "") : void 0))
						: (g = null),
					l.d.C(v, g));
			}),
			(e.prefetchDNS = function (v) {
				typeof v == "string" && l.d.D(v);
			}),
			(e.preinit = function (v, g) {
				if (typeof v == "string" && g && typeof g.as == "string") {
					var _ = g.as,
						p = m(_, g.crossOrigin),
						w = typeof g.integrity == "string" ? g.integrity : void 0,
						x = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
					_ === "style"
						? l.d.S(v, typeof g.precedence == "string" ? g.precedence : void 0, {
								crossOrigin: p,
								integrity: w,
								fetchPriority: x,
							})
						: _ === "script" &&
							l.d.X(v, {
								crossOrigin: p,
								integrity: w,
								fetchPriority: x,
								nonce: typeof g.nonce == "string" ? g.nonce : void 0,
							});
				}
			}),
			(e.preinitModule = function (v, g) {
				if (typeof v == "string")
					if (typeof g == "object" && g !== null) {
						if (g.as == null || g.as === "script") {
							var _ = m(g.as, g.crossOrigin);
							l.d.M(v, {
								crossOrigin: _,
								integrity: typeof g.integrity == "string" ? g.integrity : void 0,
								nonce: typeof g.nonce == "string" ? g.nonce : void 0,
							});
						}
					} else g ?? l.d.M(v);
			}),
			(e.preload = function (v, g) {
				if (typeof v == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
					var _ = g.as,
						p = m(_, g.crossOrigin);
					l.d.L(v, _, {
						crossOrigin: p,
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
						l.d.m(v, {
							as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
							crossOrigin: _,
							integrity: typeof g.integrity == "string" ? g.integrity : void 0,
						});
					} else l.d.m(v);
			}),
			(e.requestFormReset = function (v) {
				l.d.r(v);
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
	vb = Er((e, t) => {
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
	wT = Er((e) => {
		var t = _T(),
			i = yc(),
			u = vb();
		function l(n) {
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
			if (f(n) !== n) throw Error(l(188));
		}
		function g(n) {
			var r = n.alternate;
			if (!r) {
				if (((r = f(n)), r === null)) throw Error(l(188));
				return r !== n ? null : n;
			}
			for (var a = n, s = r; ; ) {
				var c = a.return;
				if (c === null) break;
				var d = c.alternate;
				if (d === null) {
					if (((s = c.return), s !== null)) {
						a = s;
						continue;
					}
					break;
				}
				if (c.child === d.child) {
					for (d = c.child; d; ) {
						if (d === a) return (v(c), n);
						if (d === s) return (v(c), r);
						d = d.sibling;
					}
					throw Error(l(188));
				}
				if (a.return !== s.return) ((a = c), (s = d));
				else {
					for (var y = !1, T = c.child; T; ) {
						if (T === a) {
							((y = !0), (a = c), (s = d));
							break;
						}
						if (T === s) {
							((y = !0), (s = c), (a = d));
							break;
						}
						T = T.sibling;
					}
					if (!y) {
						for (T = d.child; T; ) {
							if (T === a) {
								((y = !0), (a = d), (s = c));
								break;
							}
							if (T === s) {
								((y = !0), (s = d), (a = c));
								break;
							}
							T = T.sibling;
						}
						if (!y) throw Error(l(189));
					}
				}
				if (a.alternate !== s) throw Error(l(190));
			}
			if (a.tag !== 3) throw Error(l(188));
			return a.stateNode.current === a ? n : r;
		}
		function _(n) {
			var r = n.tag;
			if (r === 5 || r === 26 || r === 27 || r === 6) return n;
			for (n = n.child; n !== null; ) {
				if (((r = _(n)), r !== null)) return r;
				n = n.sibling;
			}
			return null;
		}
		var p = Object.assign,
			w = Symbol.for("react.element"),
			x = Symbol.for("react.transitional.element"),
			R = Symbol.for("react.portal"),
			z = Symbol.for("react.fragment"),
			I = Symbol.for("react.strict_mode"),
			j = Symbol.for("react.profiler"),
			N = Symbol.for("react.consumer"),
			C = Symbol.for("react.context"),
			q = Symbol.for("react.forward_ref"),
			J = Symbol.for("react.suspense"),
			G = Symbol.for("react.suspense_list"),
			k = Symbol.for("react.memo"),
			$ = Symbol.for("react.lazy"),
			B = Symbol.for("react.activity"),
			Q = Symbol.for("react.memo_cache_sentinel"),
			oe = Symbol.iterator;
		function le(n) {
			return n === null || typeof n != "object"
				? null
				: ((n = (oe && n[oe]) || n["@@iterator"]), typeof n == "function" ? n : null);
		}
		var te = Symbol.for("react.client.reference");
		function ne(n) {
			if (n == null) return null;
			if (typeof n == "function") return n.$$typeof === te ? null : n.displayName || n.name || null;
			if (typeof n == "string") return n;
			switch (n) {
				case z:
					return "Fragment";
				case j:
					return "Profiler";
				case I:
					return "StrictMode";
				case J:
					return "Suspense";
				case G:
					return "SuspenseList";
				case B:
					return "Activity";
			}
			if (typeof n == "object")
				switch (n.$$typeof) {
					case R:
						return "Portal";
					case C:
						return n.displayName || "Context";
					case N:
						return (n._context.displayName || "Context") + ".Consumer";
					case q:
						var r = n.render;
						return (
							(n = n.displayName),
							n || ((n = r.displayName || r.name || ""), (n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef")),
							n
						);
					case k:
						return ((r = n.displayName || null), r !== null ? r : ne(n.type) || "Memo");
					case $:
						((r = n._payload), (n = n._init));
						try {
							return ne(n(r));
						} catch {}
				}
			return null;
		}
		var O = Array.isArray,
			V = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			P = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			ve = { pending: !1, data: null, method: null, action: null },
			ye = [],
			Be = -1;
		function M(n) {
			return { current: n };
		}
		function L(n) {
			0 > Be || ((n.current = ye[Be]), (ye[Be] = null), Be--);
		}
		function se(n, r) {
			(Be++, (ye[Be] = n.current), (n.current = r));
		}
		var ce = M(null),
			he = M(null),
			we = M(null),
			pe = M(null);
		function qe(n, r) {
			switch ((se(we, r), se(he, n), se(ce, null), r.nodeType)) {
				case 9:
				case 11:
					n = (n = r.documentElement) && (n = n.namespaceURI) ? jy(n) : 0;
					break;
				default:
					if (((n = r.tagName), (r = r.namespaceURI))) ((r = jy(r)), (n = qy(r, n)));
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
			(L(ce), se(ce, n));
		}
		function Ie() {
			(L(ce), L(he), L(we));
		}
		function st(n) {
			n.memoizedState !== null && se(pe, n);
			var r = ce.current,
				a = qy(r, n.type);
			r !== a && (se(he, n), se(ce, a));
		}
		function Bt(n) {
			(he.current === n && (L(ce), L(he)), pe.current === n && (L(pe), (Hs._currentValue = ve)));
		}
		var bt, ct;
		function yt(n) {
			if (bt === void 0)
				try {
					throw Error();
				} catch (a) {
					var r = a.stack.trim().match(/\n( *(at )?)/);
					((bt = (r && r[1]) || ""),
						(ct =
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
				bt +
				n +
				ct
			);
		}
		var _e = !1;
		function Ae(n, r) {
			if (!n || _e) return "";
			_e = !0;
			var a = Error.prepareStackTrace;
			Error.prepareStackTrace = void 0;
			try {
				var s = {
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
										var X = ee;
									}
									Reflect.construct(n, [], ue);
								} else {
									try {
										ue.call();
									} catch (ee) {
										X = ee;
									}
									n.call(ue.prototype);
								}
							} else {
								try {
									throw Error();
								} catch (ee) {
									X = ee;
								}
								(ue = n()) && typeof ue.catch == "function" && ue.catch(function () {});
							}
						} catch (ee) {
							if (ee && X && typeof ee.stack == "string") return [ee.stack, X.stack];
						}
						return [null, null];
					},
				};
				s.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
				var c = Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot, "name");
				c &&
					c.configurable &&
					Object.defineProperty(s.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
				var d = s.DetermineComponentFrameRoot(),
					y = d[0],
					T = d[1];
				if (y && T) {
					var D = y.split(`
`),
						F = T.split(`
`);
					for (c = s = 0; s < D.length && !D[s].includes("DetermineComponentFrameRoot"); ) s++;
					for (; c < F.length && !F[c].includes("DetermineComponentFrameRoot"); ) c++;
					if (s === D.length || c === F.length)
						for (s = D.length - 1, c = F.length - 1; 1 <= s && 0 <= c && D[s] !== F[c]; ) c--;
					for (; 1 <= s && 0 <= c; s--, c--)
						if (D[s] !== F[c]) {
							if (s !== 1 || c !== 1)
								do
									if ((s--, c--, 0 > c || D[s] !== F[c])) {
										var re =
											`
` + D[s].replace(" at new ", " at ");
										return (
											n.displayName && re.includes("<anonymous>") && (re = re.replace("<anonymous>", n.displayName)),
											re
										);
									}
								while (1 <= s && 0 <= c);
							break;
						}
				}
			} finally {
				((_e = !1), (Error.prepareStackTrace = a));
			}
			return (a = n ? n.displayName || n.name : "") ? yt(a) : "";
		}
		function Je(n, r) {
			switch (n.tag) {
				case 26:
				case 27:
				case 5:
					return yt(n.type);
				case 16:
					return yt("Lazy");
				case 13:
					return n.child !== r && r !== null ? yt("Suspense Fallback") : yt("Suspense");
				case 19:
					return yt("SuspenseList");
				case 0:
				case 15:
					return Ae(n.type, !1);
				case 11:
					return Ae(n.type.render, !1);
				case 1:
					return Ae(n.type, !0);
				case 31:
					return yt("Activity");
				default:
					return "";
			}
		}
		function De(n) {
			try {
				var r = "",
					a = null;
				do ((r += Je(n, a)), (a = n), (n = n.return));
				while (n);
				return r;
			} catch (s) {
				return (
					`
Error generating stack: ` +
					s.message +
					`
` +
					s.stack
				);
			}
		}
		var wt = Object.prototype.hasOwnProperty,
			_t = t.unstable_scheduleCallback,
			fe = t.unstable_cancelCallback,
			Re = t.unstable_shouldYield,
			St = t.unstable_requestPaint,
			Ne = t.unstable_now,
			ft = t.unstable_getCurrentPriorityLevel,
			Ot = t.unstable_ImmediatePriority,
			rt = t.unstable_UserBlockingPriority,
			Et = t.unstable_NormalPriority,
			On = t.unstable_LowPriority,
			Xn = t.unstable_IdlePriority,
			An = t.log,
			Kt = t.unstable_setDisableYieldValue,
			Rn = null,
			Ve = null;
		function cn(n) {
			if ((typeof An == "function" && Kt(n), Ve && typeof Ve.setStrictMode == "function"))
				try {
					Ve.setStrictMode(Rn, n);
				} catch {}
		}
		var qt = Math.clz32 ? Math.clz32 : Jn,
			jr = Math.log,
			zn = Math.LN2;
		function Jn(n) {
			return ((n >>>= 0), n === 0 ? 32 : (31 - ((jr(n) / zn) | 0)) | 0);
		}
		var gn = 256,
			un = 262144,
			Dn = 4194304;
		function yn(n) {
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
		function It(n, r, a) {
			var s = n.pendingLanes;
			if (s === 0) return 0;
			var c = 0,
				d = n.suspendedLanes,
				y = n.pingedLanes;
			n = n.warmLanes;
			var T = s & 134217727;
			return (
				T !== 0
					? ((s = T & ~d),
						s !== 0 ? (c = yn(s)) : ((y &= T), y !== 0 ? (c = yn(y)) : a || ((a = T & ~n), a !== 0 && (c = yn(a)))))
					: ((T = s & ~d), T !== 0 ? (c = yn(T)) : y !== 0 ? (c = yn(y)) : a || ((a = s & ~n), a !== 0 && (c = yn(a)))),
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
		function zt(n, r) {
			return (n.pendingLanes & ~(n.suspendedLanes & ~n.pingedLanes) & r) === 0;
		}
		function Di(n, r) {
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
		function fn() {
			var n = Dn;
			return ((Dn <<= 1), (Dn & 62914560) === 0 && (Dn = 4194304), n);
		}
		function dn(n) {
			for (var r = [], a = 0; 31 > a; a++) r.push(n);
			return r;
		}
		function jn(n, r) {
			((n.pendingLanes |= r), r !== 268435456 && ((n.suspendedLanes = 0), (n.pingedLanes = 0), (n.warmLanes = 0)));
		}
		function Wn(n, r, a, s, c, d) {
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
				D = n.expirationTimes,
				F = n.hiddenUpdates;
			for (a = y & ~a; 0 < a; ) {
				var re = 31 - qt(a),
					ue = 1 << re;
				((T[re] = 0), (D[re] = -1));
				var X = F[re];
				if (X !== null)
					for (F[re] = null, re = 0; re < X.length; re++) {
						var ee = X[re];
						ee !== null && (ee.lane &= -536870913);
					}
				a &= ~ue;
			}
			(s !== 0 && xr(n, s, 0), d !== 0 && c === 0 && n.tag !== 0 && (n.suspendedLanes |= d & ~(y & ~r)));
		}
		function xr(n, r, a) {
			((n.pendingLanes |= r), (n.suspendedLanes &= ~r));
			var s = 31 - qt(r);
			((n.entangledLanes |= r), (n.entanglements[s] = n.entanglements[s] | 1073741824 | (a & 261930)));
		}
		function er(n, r) {
			var a = (n.entangledLanes |= r);
			for (n = n.entanglements; a; ) {
				var s = 31 - qt(a),
					c = 1 << s;
				((c & r) | (n[s] & r) && (n[s] |= r), (a &= ~c));
			}
		}
		function ji(n, r) {
			var a = r & -r;
			return ((a = (a & 42) !== 0 ? 1 : qi(a)), (a & (n.suspendedLanes | r)) !== 0 ? 0 : a);
		}
		function qi(n) {
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
		function qr(n) {
			return ((n &= -n), 2 < n ? (8 < n ? ((n & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
		}
		function tr() {
			var n = P.p;
			return n !== 0 ? n : ((n = window.event), n === void 0 ? 32 : r0(n.type));
		}
		function Ir(n, r) {
			var a = P.p;
			try {
				return ((P.p = n), r());
			} finally {
				P.p = a;
			}
		}
		var qn = Math.random().toString(36).slice(2),
			dt = "__reactFiber$" + qn,
			Yt = "__reactProps$" + qn,
			Ft = "__reactContainer$" + qn,
			Ar = "__reactEvents$" + qn,
			Jr = "__reactListeners$" + qn,
			Rr = "__reactHandles$" + qn,
			Ii = "__reactResources$" + qn,
			Wr = "__reactMarker$" + qn;
		function Lr(n) {
			(delete n[dt], delete n[Yt], delete n[Ar], delete n[Jr], delete n[Rr]);
		}
		function W(n) {
			var r = n[dt];
			if (r) return r;
			for (var a = n.parentNode; a; ) {
				if ((r = a[Ft] || a[dt])) {
					if (((a = r.alternate), r.child !== null || (a !== null && a.child !== null)))
						for (n = Zy(n); n !== null; ) {
							if ((a = n[dt])) return a;
							n = Zy(n);
						}
					return r;
				}
				((n = a), (a = n.parentNode));
			}
			return null;
		}
		function ge(n) {
			if ((n = n[dt] || n[Ft])) {
				var r = n.tag;
				if (r === 5 || r === 6 || r === 13 || r === 31 || r === 26 || r === 27 || r === 3) return n;
			}
			return null;
		}
		function Me(n) {
			var r = n.tag;
			if (r === 5 || r === 26 || r === 27 || r === 6) return n.stateNode;
			throw Error(l(33));
		}
		function Ye(n) {
			var r = n[Ii];
			return (r || (r = n[Ii] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), r);
		}
		function Ue(n) {
			n[Wr] = !0;
		}
		var We = new Set(),
			hn = {};
		function ut(n, r) {
			(sn(n, r), sn(n + "Capture", r));
		}
		function sn(n, r) {
			for (hn[n] = r, n = 0; n < r.length; n++) We.add(r[n]);
		}
		var Ur = RegExp(
				"^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
			),
			tu = {},
			Rl = {};
		function Cl(n) {
			return wt.call(Rl, n) ? !0 : wt.call(tu, n) ? !1 : Ur.test(n) ? (Rl[n] = !0) : ((tu[n] = !0), !1);
		}
		function ba(n, r, a) {
			if (Cl(r))
				if (a === null) n.removeAttribute(r);
				else {
					switch (typeof a) {
						case "undefined":
						case "function":
						case "symbol":
							n.removeAttribute(r);
							return;
						case "boolean":
							var s = r.toLowerCase().slice(0, 5);
							if (s !== "data-" && s !== "aria-") {
								n.removeAttribute(r);
								return;
							}
					}
					n.setAttribute(r, "" + a);
				}
		}
		function Li(n, r, a) {
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
		function Cr(n, r, a, s) {
			if (s === null) n.removeAttribute(a);
			else {
				switch (typeof s) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						n.removeAttribute(a);
						return;
				}
				n.setAttributeNS(r, a, "" + s);
			}
		}
		function ln(n) {
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
		function nu(n) {
			var r = n.type;
			return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
		}
		function is(n, r, a) {
			var s = Object.getOwnPropertyDescriptor(n.constructor.prototype, r);
			if (!n.hasOwnProperty(r) && typeof s < "u" && typeof s.get == "function" && typeof s.set == "function") {
				var c = s.get,
					d = s.set;
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
					Object.defineProperty(n, r, { enumerable: s.enumerable }),
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
		function Ui(n) {
			if (!n._valueTracker) {
				var r = nu(n) ? "checked" : "value";
				n._valueTracker = is(n, r, "" + n[r]);
			}
		}
		function kl(n) {
			if (!n) return !1;
			var r = n._valueTracker;
			if (!r) return !0;
			var a = r.getValue(),
				s = "";
			return (n && (s = nu(n) ? (n.checked ? "true" : "false") : n.value), (n = s), n !== a ? (r.setValue(n), !0) : !1);
		}
		function ru(n) {
			if (((n = n || (typeof document < "u" ? document : void 0)), typeof n > "u")) return null;
			try {
				return n.activeElement || n.body;
			} catch {
				return n.body;
			}
		}
		var Hc = /[\n"\\]/g;
		function pn(n) {
			return n.replace(Hc, function (r) {
				return "\\" + r.charCodeAt(0).toString(16) + " ";
			});
		}
		function Cn(n, r, a, s, c, d, y, T) {
			((n.name = ""),
				y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean"
					? (n.type = y)
					: n.removeAttribute("type"),
				r != null
					? y === "number"
						? ((r === 0 && n.value === "") || n.value != r) && (n.value = "" + ln(r))
						: n.value !== "" + ln(r) && (n.value = "" + ln(r))
					: (y !== "submit" && y !== "reset") || n.removeAttribute("value"),
				r != null ? $i(n, y, ln(r)) : a != null ? $i(n, y, ln(a)) : s != null && n.removeAttribute("value"),
				c == null && d != null && (n.defaultChecked = !!d),
				c != null && (n.checked = c && typeof c != "function" && typeof c != "symbol"),
				T != null && typeof T != "function" && typeof T != "symbol" && typeof T != "boolean"
					? (n.name = "" + ln(T))
					: n.removeAttribute("name"));
		}
		function as(n, r, a, s, c, d, y, T) {
			if (
				(d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (n.type = d),
				r != null || a != null)
			) {
				if (!((d !== "submit" && d !== "reset") || r != null)) {
					Ui(n);
					return;
				}
				((a = a != null ? "" + ln(a) : ""),
					(r = r != null ? "" + ln(r) : a),
					T || r === n.value || (n.value = r),
					(n.defaultValue = r));
			}
			((s = s ?? c),
				(s = typeof s != "function" && typeof s != "symbol" && !!s),
				(n.checked = T ? n.checked : !!s),
				(n.defaultChecked = !!s),
				y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (n.name = y),
				Ui(n));
		}
		function $i(n, r, a) {
			(r === "number" && ru(n.ownerDocument) === n) || n.defaultValue === "" + a || (n.defaultValue = "" + a);
		}
		function ei(n, r, a, s) {
			if (((n = n.options), r)) {
				r = {};
				for (var c = 0; c < a.length; c++) r["$" + a[c]] = !0;
				for (a = 0; a < n.length; a++)
					((c = r.hasOwnProperty("$" + n[a].value)),
						n[a].selected !== c && (n[a].selected = c),
						c && s && (n[a].defaultSelected = !0));
			} else {
				for (a = "" + ln(a), r = null, c = 0; c < n.length; c++) {
					if (n[c].value === a) {
						((n[c].selected = !0), s && (n[c].defaultSelected = !0));
						return;
					}
					r !== null || n[c].disabled || (r = n[c]);
				}
				r !== null && (r.selected = !0);
			}
		}
		function Ml(n, r, a) {
			if (r != null && ((r = "" + ln(r)), r !== n.value && (n.value = r), a == null)) {
				n.defaultValue !== r && (n.defaultValue = r);
				return;
			}
			n.defaultValue = a != null ? "" + ln(a) : "";
		}
		function us(n, r, a, s) {
			if (r == null) {
				if (s != null) {
					if (a != null) throw Error(l(92));
					if (O(s)) {
						if (1 < s.length) throw Error(l(93));
						s = s[0];
					}
					a = s;
				}
				((a ??= ""), (r = a));
			}
			((a = ln(r)),
				(n.defaultValue = a),
				(s = n.textContent),
				s === a && s !== "" && s !== null && (n.value = s),
				Ui(n));
		}
		function Bi(n, r) {
			if (r) {
				var a = n.firstChild;
				if (a && a === n.lastChild && a.nodeType === 3) {
					a.nodeValue = r;
					return;
				}
			}
			n.textContent = r;
		}
		var Nl = new Set(
			"animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
				" ",
			),
		);
		function Ol(n, r, a) {
			var s = r.indexOf("--") === 0;
			a == null || typeof a == "boolean" || a === ""
				? s
					? n.setProperty(r, "")
					: r === "float"
						? (n.cssFloat = "")
						: (n[r] = "")
				: s
					? n.setProperty(r, a)
					: typeof a != "number" || a === 0 || Nl.has(r)
						? r === "float"
							? (n.cssFloat = a)
							: (n[r] = ("" + a).trim())
						: (n[r] = a + "px");
		}
		function ss(n, r, a) {
			if (r != null && typeof r != "object") throw Error(l(62));
			if (((n = n.style), a != null)) {
				for (var s in a)
					!a.hasOwnProperty(s) ||
						(r != null && r.hasOwnProperty(s)) ||
						(s.indexOf("--") === 0 ? n.setProperty(s, "") : s === "float" ? (n.cssFloat = "") : (n[s] = ""));
				for (var c in r) ((s = r[c]), r.hasOwnProperty(c) && a[c] !== s && Ol(n, c, s));
			} else for (var d in r) r.hasOwnProperty(d) && Ol(n, d, r[d]);
		}
		function $r(n) {
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
		var Pc = new Map([
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
			Br =
				/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
		function ti(n) {
			return Br.test("" + n)
				? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
				: n;
		}
		function fr() {}
		var _a = null;
		function Sa(n) {
			return (
				(n = n.target || n.srcElement || window),
				n.correspondingUseElement && (n = n.correspondingUseElement),
				n.nodeType === 3 ? n.parentNode : n
			);
		}
		var ni = null,
			E = null;
		function A(n) {
			var r = ge(n);
			if (r && (n = r.stateNode)) {
				var a = n[Yt] || null;
				e: switch (((n = r.stateNode), r.type)) {
					case "input":
						if (
							(Cn(n, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name),
							(r = a.name),
							a.type === "radio" && r != null)
						) {
							for (a = n; a.parentNode; ) a = a.parentNode;
							for (a = a.querySelectorAll('input[name="' + pn("" + r) + '"][type="radio"]'), r = 0; r < a.length; r++) {
								var s = a[r];
								if (s !== n && s.form === n.form) {
									var c = s[Yt] || null;
									if (!c) throw Error(l(90));
									Cn(s, c.value, c.defaultValue, c.defaultValue, c.checked, c.defaultChecked, c.type, c.name);
								}
							}
							for (r = 0; r < a.length; r++) ((s = a[r]), s.form === n.form && kl(s));
						}
						break e;
					case "textarea":
						Ml(n, a.value, a.defaultValue);
						break e;
					case "select":
						((r = a.value), r != null && ei(n, !!a.multiple, r, !1));
				}
			}
		}
		var H = !1;
		function Y(n, r, a) {
			if (H) return n(r, a);
			H = !0;
			try {
				return n(r);
			} finally {
				if (((H = !1), (ni !== null || E !== null) && (yo(), ni && ((r = ni), (n = E), (E = ni = null), A(r), n))))
					for (r = 0; r < n.length; r++) A(n[r]);
			}
		}
		function de(n, r) {
			var a = n.stateNode;
			if (a === null) return null;
			var s = a[Yt] || null;
			if (s === null) return null;
			a = s[r];
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
					((s = !s.disabled) ||
						((n = n.type), (s = !(n === "button" || n === "input" || n === "select" || n === "textarea"))),
						(n = !s));
					break e;
				default:
					n = !1;
			}
			if (n) return null;
			if (a && typeof a != "function") throw Error(l(231, r, typeof a));
			return a;
		}
		var me = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
			be = !1;
		if (me)
			try {
				var Oe = {};
				(Object.defineProperty(Oe, "passive", {
					get: function () {
						be = !0;
					},
				}),
					window.addEventListener("test", Oe, Oe),
					window.removeEventListener("test", Oe, Oe));
			} catch {
				be = !1;
			}
		var ke = null,
			Ge = null,
			Lt = null;
		function kn() {
			if (Lt) return Lt;
			var n,
				r = Ge,
				a = r.length,
				s,
				c = "value" in ke ? ke.value : ke.textContent,
				d = c.length;
			for (n = 0; n < a && r[n] === c[n]; n++);
			var y = a - n;
			for (s = 1; s <= y && r[a - s] === c[d - s]; s++);
			return (Lt = c.slice(n, 1 < s ? 1 - s : void 0));
		}
		function kr(n) {
			var r = n.keyCode;
			return (
				"charCode" in n ? ((n = n.charCode), n === 0 && r === 13 && (n = 13)) : (n = r),
				n === 10 && (n = 13),
				32 <= n || n === 13 ? n : 0
			);
		}
		function iu() {
			return !0;
		}
		function ls() {
			return !1;
		}
		function bn(n) {
			function r(a, s, c, d, y) {
				((this._reactName = a),
					(this._targetInst = c),
					(this.type = s),
					(this.nativeEvent = d),
					(this.target = y),
					(this.currentTarget = null));
				for (var T in n) n.hasOwnProperty(T) && ((a = n[T]), (this[T] = a ? a(d) : d[T]));
				return (
					(this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1)
						? iu
						: ls),
					(this.isPropagationStopped = ls),
					this
				);
			}
			return (
				p(r.prototype, {
					preventDefault: function () {
						this.defaultPrevented = !0;
						var a = this.nativeEvent;
						a &&
							(a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1),
							(this.isDefaultPrevented = iu));
					},
					stopPropagation: function () {
						var a = this.nativeEvent;
						a &&
							(a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
							(this.isPropagationStopped = iu));
					},
					persist: function () {},
					isPersistent: iu,
				}),
				r
			);
		}
		var ri = {
				eventPhase: 0,
				bubbles: 0,
				cancelable: 0,
				timeStamp: function (n) {
					return n.timeStamp || Date.now();
				},
				defaultPrevented: 0,
				isTrusted: 0,
			},
			zl = bn(ri),
			os = p({}, ri, { view: 0, detail: 0 }),
			xS = bn(os),
			Qc,
			Kc,
			cs,
			Dl = p({}, os, {
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
				getModifierState: Fc,
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
						: (n !== cs &&
								(cs && n.type === "mousemove"
									? ((Qc = n.screenX - cs.screenX), (Kc = n.screenY - cs.screenY))
									: (Kc = Qc = 0),
								(cs = n)),
							Qc);
				},
				movementY: function (n) {
					return "movementY" in n ? n.movementY : Kc;
				},
			}),
			$m = bn(Dl),
			AS = bn(p({}, Dl, { dataTransfer: 0 })),
			Yc = bn(p({}, os, { relatedTarget: 0 })),
			RS = bn(p({}, ri, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
			CS = bn(
				p({}, ri, {
					clipboardData: function (n) {
						return "clipboardData" in n ? n.clipboardData : window.clipboardData;
					},
				}),
			),
			Bm = bn(p({}, ri, { data: 0 })),
			kS = {
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
			MS = {
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
			NS = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
		function OS(n) {
			var r = this.nativeEvent;
			return r.getModifierState ? r.getModifierState(n) : (n = NS[n]) ? !!r[n] : !1;
		}
		function Fc() {
			return OS;
		}
		var zS = bn(
				p({}, os, {
					key: function (n) {
						if (n.key) {
							var r = kS[n.key] || n.key;
							if (r !== "Unidentified") return r;
						}
						return n.type === "keypress"
							? ((n = kr(n)), n === 13 ? "Enter" : String.fromCharCode(n))
							: n.type === "keydown" || n.type === "keyup"
								? MS[n.keyCode] || "Unidentified"
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
					getModifierState: Fc,
					charCode: function (n) {
						return n.type === "keypress" ? kr(n) : 0;
					},
					keyCode: function (n) {
						return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
					},
					which: function (n) {
						return n.type === "keypress" ? kr(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
					},
				}),
			),
			Vm = bn(
				p({}, Dl, {
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
			DS = bn(
				p({}, os, {
					touches: 0,
					targetTouches: 0,
					changedTouches: 0,
					altKey: 0,
					metaKey: 0,
					ctrlKey: 0,
					shiftKey: 0,
					getModifierState: Fc,
				}),
			),
			jS = bn(p({}, ri, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
			qS = bn(
				p({}, Dl, {
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
			IS = bn(p({}, ri, { newState: 0, oldState: 0 })),
			LS = [9, 13, 27, 32],
			Gc = me && "CompositionEvent" in window,
			fs = null;
		me && "documentMode" in document && (fs = document.documentMode);
		var US = me && "TextEvent" in window && !fs,
			Zm = me && (!Gc || (fs && 8 < fs && 11 >= fs)),
			Hm = " ",
			Pm = !1;
		function Qm(n, r) {
			switch (n) {
				case "keyup":
					return LS.indexOf(r.keyCode) !== -1;
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
		function Km(n) {
			return ((n = n.detail), typeof n == "object" && "data" in n ? n.data : null);
		}
		var au = !1;
		function $S(n, r) {
			switch (n) {
				case "compositionend":
					return Km(r);
				case "keypress":
					return r.which !== 32 ? null : ((Pm = !0), Hm);
				case "textInput":
					return ((n = r.data), n === Hm && Pm ? null : n);
				default:
					return null;
			}
		}
		function BS(n, r) {
			if (au)
				return n === "compositionend" || (!Gc && Qm(n, r)) ? ((n = kn()), (Lt = Ge = ke = null), (au = !1), n) : null;
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
					return Zm && r.locale !== "ko" ? null : r.data;
				default:
					return null;
			}
		}
		var VS = {
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
		function Ym(n) {
			var r = n && n.nodeName && n.nodeName.toLowerCase();
			return r === "input" ? !!VS[n.type] : r === "textarea";
		}
		function Fm(n, r, a, s) {
			(ni ? (E ? E.push(s) : (E = [s])) : (ni = s),
				(r = To(r, "onChange")),
				0 < r.length && ((a = new zl("onChange", "change", null, a, s)), n.push({ event: a, listeners: r })));
		}
		var ds = null,
			hs = null;
		function ZS(n) {
			Cy(n, 0);
		}
		function jl(n) {
			if (kl(Me(n))) return n;
		}
		function Gm(n, r) {
			if (n === "change") return r;
		}
		var Xm = !1;
		if (me) {
			var Xc;
			if (me) {
				var Jc = "oninput" in document;
				if (!Jc) {
					var Jm = document.createElement("div");
					(Jm.setAttribute("oninput", "return;"), (Jc = typeof Jm.oninput == "function"));
				}
				Xc = Jc;
			} else Xc = !1;
			Xm = Xc && (!document.documentMode || 9 < document.documentMode);
		}
		function Wm() {
			ds && (ds.detachEvent("onpropertychange", ev), (hs = ds = null));
		}
		function ev(n) {
			if (n.propertyName === "value" && jl(hs)) {
				var r = [];
				(Fm(r, hs, n, Sa(n)), Y(ZS, r));
			}
		}
		function HS(n, r, a) {
			n === "focusin" ? (Wm(), (ds = r), (hs = a), ds.attachEvent("onpropertychange", ev)) : n === "focusout" && Wm();
		}
		function PS(n) {
			if (n === "selectionchange" || n === "keyup" || n === "keydown") return jl(hs);
		}
		function QS(n, r) {
			if (n === "click") return jl(r);
		}
		function KS(n, r) {
			if (n === "input" || n === "change") return jl(r);
		}
		function YS(n, r) {
			return (n === r && (n !== 0 || 1 / n === 1 / r)) || (n !== n && r !== r);
		}
		var nr = typeof Object.is == "function" ? Object.is : YS;
		function ms(n, r) {
			if (nr(n, r)) return !0;
			if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
			var a = Object.keys(n),
				s = Object.keys(r);
			if (a.length !== s.length) return !1;
			for (s = 0; s < a.length; s++) {
				var c = a[s];
				if (!wt.call(r, c) || !nr(n[c], r[c])) return !1;
			}
			return !0;
		}
		function tv(n) {
			for (; n && n.firstChild; ) n = n.firstChild;
			return n;
		}
		function nv(n, r) {
			var a = tv(n);
			n = 0;
			for (var s; a; ) {
				if (a.nodeType === 3) {
					if (((s = n + a.textContent.length), n <= r && s >= r)) return { node: a, offset: r - n };
					n = s;
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
				a = tv(a);
			}
		}
		function rv(n, r) {
			return n && r
				? n === r
					? !0
					: n && n.nodeType === 3
						? !1
						: r && r.nodeType === 3
							? rv(n, r.parentNode)
							: "contains" in n
								? n.contains(r)
								: n.compareDocumentPosition
									? !!(n.compareDocumentPosition(r) & 16)
									: !1
				: !1;
		}
		function iv(n) {
			n =
				n != null && n.ownerDocument != null && n.ownerDocument.defaultView != null
					? n.ownerDocument.defaultView
					: window;
			for (var r = ru(n.document); r instanceof n.HTMLIFrameElement; ) {
				try {
					var a = typeof r.contentWindow.location.href == "string";
				} catch {
					a = !1;
				}
				if (a) n = r.contentWindow;
				else break;
				r = ru(n.document);
			}
			return r;
		}
		function Wc(n) {
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
		var FS = me && "documentMode" in document && 11 >= document.documentMode,
			uu = null,
			ef = null,
			vs = null,
			tf = !1;
		function av(n, r, a) {
			var s = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
			tf ||
				uu == null ||
				uu !== ru(s) ||
				((s = uu),
				"selectionStart" in s && Wc(s)
					? (s = { start: s.selectionStart, end: s.selectionEnd })
					: ((s = ((s.ownerDocument && s.ownerDocument.defaultView) || window).getSelection()),
						(s = {
							anchorNode: s.anchorNode,
							anchorOffset: s.anchorOffset,
							focusNode: s.focusNode,
							focusOffset: s.focusOffset,
						})),
				(vs && ms(vs, s)) ||
					((vs = s),
					(s = To(ef, "onSelect")),
					0 < s.length &&
						((r = new zl("onSelect", "select", null, r, a)), n.push({ event: r, listeners: s }), (r.target = uu))));
		}
		function wa(n, r) {
			var a = {};
			return ((a[n.toLowerCase()] = r.toLowerCase()), (a["Webkit" + n] = "webkit" + r), (a["Moz" + n] = "moz" + r), a);
		}
		var su = {
				animationend: wa("Animation", "AnimationEnd"),
				animationiteration: wa("Animation", "AnimationIteration"),
				animationstart: wa("Animation", "AnimationStart"),
				transitionrun: wa("Transition", "TransitionRun"),
				transitionstart: wa("Transition", "TransitionStart"),
				transitioncancel: wa("Transition", "TransitionCancel"),
				transitionend: wa("Transition", "TransitionEnd"),
			},
			nf = {},
			uv = {};
		me &&
			((uv = document.createElement("div").style),
			"AnimationEvent" in window ||
				(delete su.animationend.animation, delete su.animationiteration.animation, delete su.animationstart.animation),
			"TransitionEvent" in window || delete su.transitionend.transition);
		function Ea(n) {
			if (nf[n]) return nf[n];
			if (!su[n]) return n;
			var r = su[n],
				a;
			for (a in r) if (r.hasOwnProperty(a) && a in uv) return (nf[n] = r[a]);
			return n;
		}
		var sv = Ea("animationend"),
			lv = Ea("animationiteration"),
			ov = Ea("animationstart"),
			GS = Ea("transitionrun"),
			XS = Ea("transitionstart"),
			JS = Ea("transitioncancel"),
			cv = Ea("transitionend"),
			fv = new Map(),
			rf =
				"abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
					" ",
				);
		rf.push("scrollEnd");
		function Mr(n, r) {
			(fv.set(n, r), ut(r, [n]));
		}
		var ql =
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
			dr = [],
			lu = 0,
			af = 0;
		function Il() {
			for (var n = lu, r = (af = lu = 0); r < n; ) {
				var a = dr[r];
				dr[r++] = null;
				var s = dr[r];
				dr[r++] = null;
				var c = dr[r];
				dr[r++] = null;
				var d = dr[r];
				if (((dr[r++] = null), s !== null && c !== null)) {
					var y = s.pending;
					(y === null ? (c.next = c) : ((c.next = y.next), (y.next = c)), (s.pending = c));
				}
				d !== 0 && dv(a, c, d);
			}
		}
		function Ll(n, r, a, s) {
			((dr[lu++] = n),
				(dr[lu++] = r),
				(dr[lu++] = a),
				(dr[lu++] = s),
				(af |= s),
				(n.lanes |= s),
				(n = n.alternate),
				n !== null && (n.lanes |= s));
		}
		function uf(n, r, a, s) {
			return (Ll(n, r, a, s), Ul(n));
		}
		function Ta(n, r) {
			return (Ll(n, null, null, r), Ul(n));
		}
		function dv(n, r, a) {
			n.lanes |= a;
			var s = n.alternate;
			s !== null && (s.lanes |= a);
			for (var c = !1, d = n.return; d !== null; )
				((d.childLanes |= a),
					(s = d.alternate),
					s !== null && (s.childLanes |= a),
					d.tag === 22 && ((n = d.stateNode), n === null || n._visibility & 1 || (c = !0)),
					(n = d),
					(d = d.return));
			return n.tag === 3
				? ((d = n.stateNode),
					c &&
						r !== null &&
						((c = 31 - qt(a)),
						(n = d.hiddenUpdates),
						(s = n[c]),
						s === null ? (n[c] = [r]) : s.push(r),
						(r.lane = a | 536870912)),
					d)
				: null;
		}
		function Ul(n) {
			if (50 < Is) throw ((Is = 0), (vd = null), Error(l(185)));
			for (var r = n.return; r !== null; ) ((n = r), (r = n.return));
			return n.tag === 3 ? n.stateNode : null;
		}
		var ou = {};
		function WS(n, r, a, s) {
			((this.tag = n),
				(this.key = a),
				(this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
				(this.index = 0),
				(this.refCleanup = this.ref = null),
				(this.pendingProps = r),
				(this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
				(this.mode = s),
				(this.subtreeFlags = this.flags = 0),
				(this.deletions = null),
				(this.childLanes = this.lanes = 0),
				(this.alternate = null));
		}
		function rr(n, r, a, s) {
			return new WS(n, r, a, s);
		}
		function sf(n) {
			return ((n = n.prototype), !(!n || !n.isReactComponent));
		}
		function ii(n, r) {
			var a = n.alternate;
			return (
				a === null
					? ((a = rr(n.tag, r, n.key, n.mode)),
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
		function hv(n, r) {
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
		function $l(n, r, a, s, c, d) {
			var y = 0;
			if (((s = n), typeof n == "function")) sf(n) && (y = 1);
			else if (typeof n == "string")
				y = a1(n, a, ce.current) ? 26 : n === "html" || n === "head" || n === "body" ? 27 : 5;
			else
				e: switch (n) {
					case B:
						return ((n = rr(31, a, r, c)), (n.elementType = B), (n.lanes = d), n);
					case z:
						return xa(a.children, c, d, r);
					case I:
						((y = 8), (c |= 24));
						break;
					case j:
						return ((n = rr(12, a, r, c | 2)), (n.elementType = j), (n.lanes = d), n);
					case J:
						return ((n = rr(13, a, r, c)), (n.elementType = J), (n.lanes = d), n);
					case G:
						return ((n = rr(19, a, r, c)), (n.elementType = G), (n.lanes = d), n);
					default:
						if (typeof n == "object" && n !== null)
							switch (n.$$typeof) {
								case C:
									y = 10;
									break e;
								case N:
									y = 9;
									break e;
								case q:
									y = 11;
									break e;
								case k:
									y = 14;
									break e;
								case $:
									((y = 16), (s = null));
									break e;
							}
						((y = 29), (a = Error(l(130, n === null ? "null" : typeof n, ""))), (s = null));
				}
			return ((r = rr(y, a, r, c)), (r.elementType = n), (r.type = s), (r.lanes = d), r);
		}
		function xa(n, r, a, s) {
			return ((n = rr(7, n, s, r)), (n.lanes = a), n);
		}
		function lf(n, r, a) {
			return ((n = rr(6, n, null, r)), (n.lanes = a), n);
		}
		function mv(n) {
			var r = rr(18, null, null, 0);
			return ((r.stateNode = n), r);
		}
		function of(n, r, a) {
			return (
				(r = rr(4, n.children !== null ? n.children : [], n.key, r)),
				(r.lanes = a),
				(r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }),
				r
			);
		}
		var vv = new WeakMap();
		function hr(n, r) {
			if (typeof n == "object" && n !== null) {
				var a = vv.get(n);
				return a !== void 0 ? a : ((r = { value: n, source: r, stack: De(r) }), vv.set(n, r), r);
			}
			return { value: n, source: r, stack: De(r) };
		}
		var cu = [],
			fu = 0,
			Bl = null,
			gs = 0,
			mr = [],
			vr = 0,
			Vi = null,
			Vr = 1,
			Zr = "";
		function ai(n, r) {
			((cu[fu++] = gs), (cu[fu++] = Bl), (Bl = n), (gs = r));
		}
		function gv(n, r, a) {
			((mr[vr++] = Vr), (mr[vr++] = Zr), (mr[vr++] = Vi), (Vi = n));
			var s = Vr;
			n = Zr;
			var c = 32 - qt(s) - 1;
			((s &= ~(1 << c)), (a += 1));
			var d = 32 - qt(r) + c;
			if (30 < d) {
				var y = c - (c % 5);
				((d = (s & ((1 << y) - 1)).toString(32)),
					(s >>= y),
					(c -= y),
					(Vr = (1 << (32 - qt(r) + c)) | (a << c) | s),
					(Zr = d + n));
			} else ((Vr = (1 << d) | (a << c) | s), (Zr = n));
		}
		function cf(n) {
			n.return !== null && (ai(n, 1), gv(n, 1, 0));
		}
		function ff(n) {
			for (; n === Bl; ) ((Bl = cu[--fu]), (cu[fu] = null), (gs = cu[--fu]), (cu[fu] = null));
			for (; n === Vi; )
				((Vi = mr[--vr]), (mr[vr] = null), (Zr = mr[--vr]), (mr[vr] = null), (Vr = mr[--vr]), (mr[vr] = null));
		}
		function yv(n, r) {
			((mr[vr++] = Vr), (mr[vr++] = Zr), (mr[vr++] = Vi), (Vr = r.id), (Zr = r.overflow), (Vi = n));
		}
		var _n = null,
			Tt = null,
			Fe = !1,
			Zi = null,
			gr = !1,
			df = Error(l(519));
		function Hi(n) {
			throw (
				ys(hr(Error(l(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), n)),
				df
			);
		}
		function pv(n) {
			var r = n.stateNode,
				a = n.type,
				s = n.memoizedProps;
			switch (((r[dt] = n), (r[Yt] = s), a)) {
				case "dialog":
					(He("cancel", r), He("close", r));
					break;
				case "iframe":
				case "object":
				case "embed":
					He("load", r);
					break;
				case "video":
				case "audio":
					for (a = 0; a < Us.length; a++) He(Us[a], r);
					break;
				case "source":
					He("error", r);
					break;
				case "img":
				case "image":
				case "link":
					(He("error", r), He("load", r));
					break;
				case "details":
					He("toggle", r);
					break;
				case "input":
					(He("invalid", r), as(r, s.value, s.defaultValue, s.checked, s.defaultChecked, s.type, s.name, !0));
					break;
				case "select":
					He("invalid", r);
					break;
				case "textarea":
					(He("invalid", r), us(r, s.value, s.defaultValue, s.children));
			}
			((a = s.children),
				(typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
				r.textContent === "" + a ||
				s.suppressHydrationWarning === !0 ||
				zy(r.textContent, a)
					? (s.popover != null && (He("beforetoggle", r), He("toggle", r)),
						s.onScroll != null && He("scroll", r),
						s.onScrollEnd != null && He("scrollend", r),
						s.onClick != null && (r.onclick = fr),
						(r = !0))
					: (r = !1),
				r || Hi(n, !0));
		}
		function bv(n) {
			for (_n = n.return; _n; )
				switch (_n.tag) {
					case 5:
					case 31:
					case 13:
						gr = !1;
						return;
					case 27:
					case 3:
						gr = !0;
						return;
					default:
						_n = _n.return;
				}
		}
		function du(n) {
			if (n !== _n) return !1;
			if (!Fe) return (bv(n), (Fe = !0), !1);
			var r = n.tag,
				a;
			if (
				((a = r !== 3 && r !== 27) &&
					((a = r === 5) && ((a = n.type), (a = !(a !== "form" && a !== "button") || kd(n.type, n.memoizedProps))),
					(a = !a)),
				a && Tt && Hi(n),
				bv(n),
				r === 13)
			) {
				if (((n = n.memoizedState), (n = n !== null ? n.dehydrated : null), !n)) throw Error(l(317));
				Tt = Vy(n);
			} else if (r === 31) {
				if (((n = n.memoizedState), (n = n !== null ? n.dehydrated : null), !n)) throw Error(l(317));
				Tt = Vy(n);
			} else
				r === 27
					? ((r = Tt), na(n.type) ? ((n = Dd), (Dd = null), (Tt = n)) : (Tt = r))
					: (Tt = _n ? br(n.stateNode.nextSibling) : null);
			return !0;
		}
		function Aa() {
			((Tt = _n = null), (Fe = !1));
		}
		function hf() {
			var n = Zi;
			return (n !== null && (Pn === null ? (Pn = n) : Pn.push.apply(Pn, n), (Zi = null)), n);
		}
		function ys(n) {
			Zi === null ? (Zi = [n]) : Zi.push(n);
		}
		var mf = M(null),
			Ra = null,
			ui = null;
		function Pi(n, r, a) {
			(se(mf, r._currentValue), (r._currentValue = a));
		}
		function si(n) {
			((n._currentValue = mf.current), L(mf));
		}
		function vf(n, r, a) {
			for (; n !== null; ) {
				var s = n.alternate;
				if (
					((n.childLanes & r) !== r
						? ((n.childLanes |= r), s !== null && (s.childLanes |= r))
						: s !== null && (s.childLanes & r) !== r && (s.childLanes |= r),
					n === a)
				)
					break;
				n = n.return;
			}
		}
		function gf(n, r, a, s) {
			var c = n.child;
			for (c !== null && (c.return = n); c !== null; ) {
				var d = c.dependencies;
				if (d !== null) {
					var y = c.child;
					d = d.firstContext;
					e: for (; d !== null; ) {
						var T = d;
						d = c;
						for (var D = 0; D < r.length; D++)
							if (T.context === r[D]) {
								((d.lanes |= a), (T = d.alternate), T !== null && (T.lanes |= a), vf(d.return, a, n), s || (y = null));
								break e;
							}
						d = T.next;
					}
				} else if (c.tag === 18) {
					if (((y = c.return), y === null)) throw Error(l(341));
					((y.lanes |= a), (d = y.alternate), d !== null && (d.lanes |= a), vf(y, a, n), (y = null));
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
		function hu(n, r, a, s) {
			n = null;
			for (var c = r, d = !1; c !== null; ) {
				if (!d) {
					if ((c.flags & 524288) !== 0) d = !0;
					else if ((c.flags & 262144) !== 0) break;
				}
				if (c.tag === 10) {
					var y = c.alternate;
					if (y === null) throw Error(l(387));
					if (((y = y.memoizedProps), y !== null)) {
						var T = c.type;
						nr(c.pendingProps.value, y.value) || (n !== null ? n.push(T) : (n = [T]));
					}
				} else if (c === pe.current) {
					if (((y = c.alternate), y === null)) throw Error(l(387));
					y.memoizedState.memoizedState !== c.memoizedState.memoizedState && (n !== null ? n.push(Hs) : (n = [Hs]));
				}
				c = c.return;
			}
			(n !== null && gf(r, n, a, s), (r.flags |= 262144));
		}
		function Vl(n) {
			for (n = n.firstContext; n !== null; ) {
				if (!nr(n.context._currentValue, n.memoizedValue)) return !0;
				n = n.next;
			}
			return !1;
		}
		function Ca(n) {
			((Ra = n), (ui = null), (n = n.dependencies), n !== null && (n.firstContext = null));
		}
		function Sn(n) {
			return _v(Ra, n);
		}
		function Zl(n, r) {
			return (Ra === null && Ca(n), _v(n, r));
		}
		function _v(n, r) {
			var a = r._currentValue;
			if (((r = { context: r, memoizedValue: a, next: null }), ui === null)) {
				if (n === null) throw Error(l(308));
				((ui = r), (n.dependencies = { lanes: 0, firstContext: r }), (n.flags |= 524288));
			} else ui = ui.next = r;
			return a;
		}
		var ew =
				typeof AbortController < "u"
					? AbortController
					: function () {
							var n = [],
								r = (this.signal = {
									aborted: !1,
									addEventListener: function (a, s) {
										n.push(s);
									},
								});
							this.abort = function () {
								((r.aborted = !0),
									n.forEach(function (a) {
										return a();
									}));
							};
						},
			tw = t.unstable_scheduleCallback,
			nw = t.unstable_NormalPriority,
			Gt = { $$typeof: C, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
		function yf() {
			return { controller: new ew(), data: new Map(), refCount: 0 };
		}
		function ps(n) {
			(n.refCount--,
				n.refCount === 0 &&
					tw(nw, function () {
						n.controller.abort();
					}));
		}
		var bs = null,
			pf = 0,
			mu = 0,
			vu = null;
		function rw(n, r) {
			if (bs === null) {
				var a = (bs = []);
				((pf = 0),
					(mu = Sd()),
					(vu = {
						status: "pending",
						value: void 0,
						then: function (s) {
							a.push(s);
						},
					}));
			}
			return (pf++, r.then(Sv, Sv), r);
		}
		function Sv() {
			if (--pf === 0 && bs !== null) {
				vu !== null && (vu.status = "fulfilled");
				var n = bs;
				((bs = null), (mu = 0), (vu = null));
				for (var r = 0; r < n.length; r++) (0, n[r])();
			}
		}
		function iw(n, r) {
			var a = [],
				s = {
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
						((s.status = "fulfilled"), (s.value = r));
						for (var c = 0; c < a.length; c++) (0, a[c])(r);
					},
					function (c) {
						for (s.status = "rejected", s.reason = c, c = 0; c < a.length; c++) (0, a[c])(void 0);
					},
				),
				s
			);
		}
		var wv = V.S;
		V.S = function (n, r) {
			((ny = Ne()),
				typeof r == "object" && r !== null && typeof r.then == "function" && rw(n, r),
				wv !== null && wv(n, r));
		};
		var ka = M(null);
		function bf() {
			var n = ka.current;
			return n !== null ? n : pt.pooledCache;
		}
		function Hl(n, r) {
			r === null ? se(ka, ka.current) : se(ka, r.pool);
		}
		function Ev() {
			var n = bf();
			return n === null ? null : { parent: Gt._currentValue, pool: n };
		}
		var gu = Error(l(460)),
			_f = Error(l(474)),
			Pl = Error(l(542)),
			Ql = { then: function () {} };
		function Tv(n) {
			return ((n = n.status), n === "fulfilled" || n === "rejected");
		}
		function xv(n, r, a) {
			switch (((a = n[a]), a === void 0 ? n.push(r) : a !== r && (r.then(fr, fr), (r = a)), r.status)) {
				case "fulfilled":
					return r.value;
				case "rejected":
					throw ((n = r.reason), Rv(n), n);
				default:
					if (typeof r.status == "string") r.then(fr, fr);
					else {
						if (((n = pt), n !== null && 100 < n.shellSuspendCounter)) throw Error(l(482));
						((n = r),
							(n.status = "pending"),
							n.then(
								function (s) {
									if (r.status === "pending") {
										var c = r;
										((c.status = "fulfilled"), (c.value = s));
									}
								},
								function (s) {
									if (r.status === "pending") {
										var c = r;
										((c.status = "rejected"), (c.reason = s));
									}
								},
							));
					}
					switch (r.status) {
						case "fulfilled":
							return r.value;
						case "rejected":
							throw ((n = r.reason), Rv(n), n);
					}
					throw ((Na = r), gu);
			}
		}
		function Ma(n) {
			try {
				var r = n._init;
				return r(n._payload);
			} catch (a) {
				throw a !== null && typeof a == "object" && typeof a.then == "function" ? ((Na = a), gu) : a;
			}
		}
		var Na = null;
		function Av() {
			if (Na === null) throw Error(l(459));
			var n = Na;
			return ((Na = null), n);
		}
		function Rv(n) {
			if (n === gu || n === Pl) throw Error(l(483));
		}
		var yu = null,
			_s = 0;
		function Kl(n) {
			var r = _s;
			return ((_s += 1), yu === null && (yu = []), xv(yu, n, r));
		}
		function Ss(n, r) {
			((r = r.props.ref), (n.ref = r !== void 0 ? r : null));
		}
		function Yl(n, r) {
			throw r.$$typeof === w
				? Error(l(525))
				: ((n = Object.prototype.toString.call(r)),
					Error(l(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n)));
		}
		function Cv(n) {
			function r(Z, U) {
				if (n) {
					var K = Z.deletions;
					K === null ? ((Z.deletions = [U]), (Z.flags |= 16)) : K.push(U);
				}
			}
			function a(Z, U) {
				if (!n) return null;
				for (; U !== null; ) (r(Z, U), (U = U.sibling));
				return null;
			}
			function s(Z) {
				for (var U = new Map(); Z !== null; ) (Z.key !== null ? U.set(Z.key, Z) : U.set(Z.index, Z), (Z = Z.sibling));
				return U;
			}
			function c(Z, U) {
				return ((Z = ii(Z, U)), (Z.index = 0), (Z.sibling = null), Z);
			}
			function d(Z, U, K) {
				return (
					(Z.index = K),
					n
						? ((K = Z.alternate),
							K !== null ? ((K = K.index), K < U ? ((Z.flags |= 67108866), U) : K) : ((Z.flags |= 67108866), U))
						: ((Z.flags |= 1048576), U)
				);
			}
			function y(Z) {
				return (n && Z.alternate === null && (Z.flags |= 67108866), Z);
			}
			function T(Z, U, K, ae) {
				return U === null || U.tag !== 6
					? ((U = lf(K, Z.mode, ae)), (U.return = Z), U)
					: ((U = c(U, K)), (U.return = Z), U);
			}
			function D(Z, U, K, ae) {
				var xe = K.type;
				return xe === z
					? re(Z, U, K.props.children, ae, K.key)
					: U !== null &&
						  (U.elementType === xe || (typeof xe == "object" && xe !== null && xe.$$typeof === $ && Ma(xe) === U.type))
						? ((U = c(U, K.props)), Ss(U, K), (U.return = Z), U)
						: ((U = $l(K.type, K.key, K.props, null, Z.mode, ae)), Ss(U, K), (U.return = Z), U);
			}
			function F(Z, U, K, ae) {
				return U === null ||
					U.tag !== 4 ||
					U.stateNode.containerInfo !== K.containerInfo ||
					U.stateNode.implementation !== K.implementation
					? ((U = of(K, Z.mode, ae)), (U.return = Z), U)
					: ((U = c(U, K.children || [])), (U.return = Z), U);
			}
			function re(Z, U, K, ae, xe) {
				return U === null || U.tag !== 7
					? ((U = xa(K, Z.mode, ae, xe)), (U.return = Z), U)
					: ((U = c(U, K)), (U.return = Z), U);
			}
			function ue(Z, U, K) {
				if ((typeof U == "string" && U !== "") || typeof U == "number" || typeof U == "bigint")
					return ((U = lf("" + U, Z.mode, K)), (U.return = Z), U);
				if (typeof U == "object" && U !== null) {
					switch (U.$$typeof) {
						case x:
							return ((K = $l(U.type, U.key, U.props, null, Z.mode, K)), Ss(K, U), (K.return = Z), K);
						case R:
							return ((U = of(U, Z.mode, K)), (U.return = Z), U);
						case $:
							return ((U = Ma(U)), ue(Z, U, K));
					}
					if (O(U) || le(U)) return ((U = xa(U, Z.mode, K, null)), (U.return = Z), U);
					if (typeof U.then == "function") return ue(Z, Kl(U), K);
					if (U.$$typeof === C) return ue(Z, Zl(Z, U), K);
					Yl(Z, U);
				}
				return null;
			}
			function X(Z, U, K, ae) {
				var xe = U !== null ? U.key : null;
				if ((typeof K == "string" && K !== "") || typeof K == "number" || typeof K == "bigint")
					return xe !== null ? null : T(Z, U, "" + K, ae);
				if (typeof K == "object" && K !== null) {
					switch (K.$$typeof) {
						case x:
							return K.key === xe ? D(Z, U, K, ae) : null;
						case R:
							return K.key === xe ? F(Z, U, K, ae) : null;
						case $:
							return ((K = Ma(K)), X(Z, U, K, ae));
					}
					if (O(K) || le(K)) return xe !== null ? null : re(Z, U, K, ae, null);
					if (typeof K.then == "function") return X(Z, U, Kl(K), ae);
					if (K.$$typeof === C) return X(Z, U, Zl(Z, K), ae);
					Yl(Z, K);
				}
				return null;
			}
			function ee(Z, U, K, ae, xe) {
				if ((typeof ae == "string" && ae !== "") || typeof ae == "number" || typeof ae == "bigint")
					return ((Z = Z.get(K) || null), T(U, Z, "" + ae, xe));
				if (typeof ae == "object" && ae !== null) {
					switch (ae.$$typeof) {
						case x:
							return ((Z = Z.get(ae.key === null ? K : ae.key) || null), D(U, Z, ae, xe));
						case R:
							return ((Z = Z.get(ae.key === null ? K : ae.key) || null), F(U, Z, ae, xe));
						case $:
							return ((ae = Ma(ae)), ee(Z, U, K, ae, xe));
					}
					if (O(ae) || le(ae)) return ((Z = Z.get(K) || null), re(U, Z, ae, xe, null));
					if (typeof ae.then == "function") return ee(Z, U, K, Kl(ae), xe);
					if (ae.$$typeof === C) return ee(Z, U, K, Zl(U, ae), xe);
					Yl(U, ae);
				}
				return null;
			}
			function Se(Z, U, K, ae) {
				for (var xe = null, tt = null, Ee = U, $e = (U = 0), Qe = null; Ee !== null && $e < K.length; $e++) {
					Ee.index > $e ? ((Qe = Ee), (Ee = null)) : (Qe = Ee.sibling);
					var nt = X(Z, Ee, K[$e], ae);
					if (nt === null) {
						Ee === null && (Ee = Qe);
						break;
					}
					(n && Ee && nt.alternate === null && r(Z, Ee),
						(U = d(nt, U, $e)),
						tt === null ? (xe = nt) : (tt.sibling = nt),
						(tt = nt),
						(Ee = Qe));
				}
				if ($e === K.length) return (a(Z, Ee), Fe && ai(Z, $e), xe);
				if (Ee === null) {
					for (; $e < K.length; $e++)
						((Ee = ue(Z, K[$e], ae)),
							Ee !== null && ((U = d(Ee, U, $e)), tt === null ? (xe = Ee) : (tt.sibling = Ee), (tt = Ee)));
					return (Fe && ai(Z, $e), xe);
				}
				for (Ee = s(Ee); $e < K.length; $e++)
					((Qe = ee(Ee, Z, $e, K[$e], ae)),
						Qe !== null &&
							(n && Qe.alternate !== null && Ee.delete(Qe.key === null ? $e : Qe.key),
							(U = d(Qe, U, $e)),
							tt === null ? (xe = Qe) : (tt.sibling = Qe),
							(tt = Qe)));
				return (
					n &&
						Ee.forEach(function (sa) {
							return r(Z, sa);
						}),
					Fe && ai(Z, $e),
					xe
				);
			}
			function Ce(Z, U, K, ae) {
				if (K == null) throw Error(l(151));
				for (
					var xe = null, tt = null, Ee = U, $e = (U = 0), Qe = null, nt = K.next();
					Ee !== null && !nt.done;
					$e++, nt = K.next()
				) {
					Ee.index > $e ? ((Qe = Ee), (Ee = null)) : (Qe = Ee.sibling);
					var sa = X(Z, Ee, nt.value, ae);
					if (sa === null) {
						Ee === null && (Ee = Qe);
						break;
					}
					(n && Ee && sa.alternate === null && r(Z, Ee),
						(U = d(sa, U, $e)),
						tt === null ? (xe = sa) : (tt.sibling = sa),
						(tt = sa),
						(Ee = Qe));
				}
				if (nt.done) return (a(Z, Ee), Fe && ai(Z, $e), xe);
				if (Ee === null) {
					for (; !nt.done; $e++, nt = K.next())
						((nt = ue(Z, nt.value, ae)),
							nt !== null && ((U = d(nt, U, $e)), tt === null ? (xe = nt) : (tt.sibling = nt), (tt = nt)));
					return (Fe && ai(Z, $e), xe);
				}
				for (Ee = s(Ee); !nt.done; $e++, nt = K.next())
					((nt = ee(Ee, Z, $e, nt.value, ae)),
						nt !== null &&
							(n && nt.alternate !== null && Ee.delete(nt.key === null ? $e : nt.key),
							(U = d(nt, U, $e)),
							tt === null ? (xe = nt) : (tt.sibling = nt),
							(tt = nt)));
				return (
					n &&
						Ee.forEach(function (b1) {
							return r(Z, b1);
						}),
					Fe && ai(Z, $e),
					xe
				);
			}
			function vt(Z, U, K, ae) {
				if (
					(typeof K == "object" && K !== null && K.type === z && K.key === null && (K = K.props.children),
					typeof K == "object" && K !== null)
				) {
					switch (K.$$typeof) {
						case x:
							e: {
								for (var xe = K.key; U !== null; ) {
									if (U.key === xe) {
										if (((xe = K.type), xe === z)) {
											if (U.tag === 7) {
												(a(Z, U.sibling), (ae = c(U, K.props.children)), (ae.return = Z), (Z = ae));
												break e;
											}
										} else if (
											U.elementType === xe ||
											(typeof xe == "object" && xe !== null && xe.$$typeof === $ && Ma(xe) === U.type)
										) {
											(a(Z, U.sibling), (ae = c(U, K.props)), Ss(ae, K), (ae.return = Z), (Z = ae));
											break e;
										}
										a(Z, U);
										break;
									} else r(Z, U);
									U = U.sibling;
								}
								K.type === z
									? ((ae = xa(K.props.children, Z.mode, ae, K.key)), (ae.return = Z), (Z = ae))
									: ((ae = $l(K.type, K.key, K.props, null, Z.mode, ae)), Ss(ae, K), (ae.return = Z), (Z = ae));
							}
							return y(Z);
						case R:
							e: {
								for (xe = K.key; U !== null; ) {
									if (U.key === xe)
										if (
											U.tag === 4 &&
											U.stateNode.containerInfo === K.containerInfo &&
											U.stateNode.implementation === K.implementation
										) {
											(a(Z, U.sibling), (ae = c(U, K.children || [])), (ae.return = Z), (Z = ae));
											break e;
										} else {
											a(Z, U);
											break;
										}
									else r(Z, U);
									U = U.sibling;
								}
								((ae = of(K, Z.mode, ae)), (ae.return = Z), (Z = ae));
							}
							return y(Z);
						case $:
							return ((K = Ma(K)), vt(Z, U, K, ae));
					}
					if (O(K)) return Se(Z, U, K, ae);
					if (le(K)) {
						if (((xe = le(K)), typeof xe != "function")) throw Error(l(150));
						return ((K = xe.call(K)), Ce(Z, U, K, ae));
					}
					if (typeof K.then == "function") return vt(Z, U, Kl(K), ae);
					if (K.$$typeof === C) return vt(Z, U, Zl(Z, K), ae);
					Yl(Z, K);
				}
				return (typeof K == "string" && K !== "") || typeof K == "number" || typeof K == "bigint"
					? ((K = "" + K),
						U !== null && U.tag === 6
							? (a(Z, U.sibling), (ae = c(U, K)), (ae.return = Z), (Z = ae))
							: (a(Z, U), (ae = lf(K, Z.mode, ae)), (ae.return = Z), (Z = ae)),
						y(Z))
					: a(Z, U);
			}
			return function (Z, U, K, ae) {
				try {
					_s = 0;
					var xe = vt(Z, U, K, ae);
					return ((yu = null), xe);
				} catch (Ee) {
					if (Ee === gu || Ee === Pl) throw Ee;
					var tt = rr(29, Ee, null, Z.mode);
					return ((tt.lanes = ae), (tt.return = Z), tt);
				}
			};
		}
		var Oa = Cv(!0),
			kv = Cv(!1),
			Qi = !1;
		function Sf(n) {
			n.updateQueue = {
				baseState: n.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: { pending: null, lanes: 0, hiddenCallbacks: null },
				callbacks: null,
			};
		}
		function wf(n, r) {
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
		function za(n) {
			return { lane: n, tag: 0, payload: null, callback: null, next: null };
		}
		function Da(n, r, a) {
			var s = n.updateQueue;
			if (s === null) return null;
			if (((s = s.shared), (it & 2) !== 0)) {
				var c = s.pending;
				return (
					c === null ? (r.next = r) : ((r.next = c.next), (c.next = r)),
					(s.pending = r),
					(r = Ul(n)),
					dv(n, null, a),
					r
				);
			}
			return (Ll(n, s, r, a), Ul(n));
		}
		function ws(n, r, a) {
			if (((r = r.updateQueue), r !== null && ((r = r.shared), (a & 4194048) !== 0))) {
				var s = r.lanes;
				((s &= n.pendingLanes), (a |= s), (r.lanes = a), er(n, a));
			}
		}
		function Ef(n, r) {
			var a = n.updateQueue,
				s = n.alternate;
			if (s !== null && ((s = s.updateQueue), a === s)) {
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
					baseState: s.baseState,
					firstBaseUpdate: c,
					lastBaseUpdate: d,
					shared: s.shared,
					callbacks: s.callbacks,
				}),
					(n.updateQueue = a));
				return;
			}
			((n = a.lastBaseUpdate), n === null ? (a.firstBaseUpdate = r) : (n.next = r), (a.lastBaseUpdate = r));
		}
		var Tf = !1;
		function Es() {
			if (Tf) {
				var n = vu;
				if (n !== null) throw n;
			}
		}
		function Ts(n, r, a, s) {
			Tf = !1;
			var c = n.updateQueue;
			Qi = !1;
			var d = c.firstBaseUpdate,
				y = c.lastBaseUpdate,
				T = c.shared.pending;
			if (T !== null) {
				c.shared.pending = null;
				var D = T,
					F = D.next;
				((D.next = null), y === null ? (d = F) : (y.next = F), (y = D));
				var re = n.alternate;
				re !== null &&
					((re = re.updateQueue),
					(T = re.lastBaseUpdate),
					T !== y && (T === null ? (re.firstBaseUpdate = F) : (T.next = F), (re.lastBaseUpdate = D)));
			}
			if (d !== null) {
				var ue = c.baseState;
				((y = 0), (re = F = D = null), (T = d));
				do {
					var X = T.lane & -536870913,
						ee = X !== T.lane;
					if (ee ? (Pe & X) === X : (s & X) === X) {
						(X !== 0 && X === mu && (Tf = !0),
							re !== null && (re = re.next = { lane: 0, tag: T.tag, payload: T.payload, callback: null, next: null }));
						e: {
							var Se = n,
								Ce = T;
							X = r;
							var vt = a;
							switch (Ce.tag) {
								case 1:
									if (((Se = Ce.payload), typeof Se == "function")) {
										ue = Se.call(vt, ue, X);
										break e;
									}
									ue = Se;
									break e;
								case 3:
									Se.flags = (Se.flags & -65537) | 128;
								case 0:
									if (((Se = Ce.payload), (X = typeof Se == "function" ? Se.call(vt, ue, X) : Se), X == null)) break e;
									ue = p({}, ue, X);
									break e;
								case 2:
									Qi = !0;
							}
						}
						((X = T.callback),
							X !== null &&
								((n.flags |= 64),
								ee && (n.flags |= 8192),
								(ee = c.callbacks),
								ee === null ? (c.callbacks = [X]) : ee.push(X)));
					} else
						((ee = { lane: X, tag: T.tag, payload: T.payload, callback: T.callback, next: null }),
							re === null ? ((F = re = ee), (D = ue)) : (re = re.next = ee),
							(y |= X));
					if (((T = T.next), T === null)) {
						if (((T = c.shared.pending), T === null)) break;
						((ee = T), (T = ee.next), (ee.next = null), (c.lastBaseUpdate = ee), (c.shared.pending = null));
					}
				} while (!0);
				(re === null && (D = ue),
					(c.baseState = D),
					(c.firstBaseUpdate = F),
					(c.lastBaseUpdate = re),
					d === null && (c.shared.lanes = 0),
					(Xi |= y),
					(n.lanes = y),
					(n.memoizedState = ue));
			}
		}
		function Mv(n, r) {
			if (typeof n != "function") throw Error(l(191, n));
			n.call(r);
		}
		function Nv(n, r) {
			var a = n.callbacks;
			if (a !== null) for (n.callbacks = null, n = 0; n < a.length; n++) Mv(a[n], r);
		}
		var pu = M(null),
			Fl = M(0);
		function Ov(n, r) {
			((n = gi), se(Fl, n), se(pu, r), (gi = n | r.baseLanes));
		}
		function xf() {
			(se(Fl, gi), se(pu, pu.current));
		}
		function Af() {
			((gi = Fl.current), L(pu), L(Fl));
		}
		var ir = M(null),
			yr = null;
		function Ki(n) {
			var r = n.alternate;
			(se(Vt, Vt.current & 1),
				se(ir, n),
				yr === null && (r === null || pu.current !== null || r.memoizedState !== null) && (yr = n));
		}
		function Rf(n) {
			(se(Vt, Vt.current), se(ir, n), yr === null && (yr = n));
		}
		function zv(n) {
			n.tag === 22 ? (se(Vt, Vt.current), se(ir, n), yr === null && (yr = n)) : Yi(n);
		}
		function Yi() {
			(se(Vt, Vt.current), se(ir, ir.current));
		}
		function ar(n) {
			(L(ir), yr === n && (yr = null), L(Vt));
		}
		var Vt = M(0);
		function Gl(n) {
			for (var r = n; r !== null; ) {
				if (r.tag === 13) {
					var a = r.memoizedState;
					if (a !== null && ((a = a.dehydrated), a === null || Od(a) || zd(a))) return r;
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
		var li = 0,
			Le = null,
			ht = null,
			Xt = null,
			Xl = !1,
			bu = !1,
			ja = !1,
			Jl = 0,
			xs = 0,
			_u = null,
			aw = 0;
		function Ut() {
			throw Error(l(321));
		}
		function Cf(n, r) {
			if (r === null) return !1;
			for (var a = 0; a < r.length && a < n.length; a++) if (!nr(n[a], r[a])) return !1;
			return !0;
		}
		function kf(n, r, a, s, c, d) {
			return (
				(li = d),
				(Le = r),
				(r.memoizedState = null),
				(r.updateQueue = null),
				(r.lanes = 0),
				(V.H = n === null || n.memoizedState === null ? gg : Hf),
				(ja = !1),
				(d = a(s, c)),
				(ja = !1),
				bu && (d = jv(r, a, s, c)),
				Dv(n),
				d
			);
		}
		function Dv(n) {
			V.H = Cs;
			var r = ht !== null && ht.next !== null;
			if (((li = 0), (Xt = ht = Le = null), (Xl = !1), (xs = 0), (_u = null), r)) throw Error(l(300));
			n === null || Jt || ((n = n.dependencies), n !== null && Vl(n) && (Jt = !0));
		}
		function jv(n, r, a, s) {
			Le = n;
			var c = 0;
			do {
				if ((bu && (_u = null), (xs = 0), (bu = !1), 25 <= c)) throw Error(l(301));
				if (((c += 1), (Xt = ht = null), n.updateQueue != null)) {
					var d = n.updateQueue;
					((d.lastEffect = null), (d.events = null), (d.stores = null), d.memoCache != null && (d.memoCache.index = 0));
				}
				((V.H = yg), (d = r(a, s)));
			} while (bu);
			return d;
		}
		function uw() {
			var n = V.H,
				r = n.useState()[0];
			return (
				(r = typeof r.then == "function" ? As(r) : r),
				(n = n.useState()[0]),
				(ht !== null ? ht.memoizedState : null) !== n && (Le.flags |= 1024),
				r
			);
		}
		function Mf() {
			var n = Jl !== 0;
			return ((Jl = 0), n);
		}
		function Nf(n, r, a) {
			((r.updateQueue = n.updateQueue), (r.flags &= -2053), (n.lanes &= ~a));
		}
		function Of(n) {
			if (Xl) {
				for (n = n.memoizedState; n !== null; ) {
					var r = n.queue;
					(r !== null && (r.pending = null), (n = n.next));
				}
				Xl = !1;
			}
			((li = 0), (Xt = ht = Le = null), (bu = !1), (xs = Jl = 0), (_u = null));
		}
		function In() {
			var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
			return (Xt === null ? (Le.memoizedState = Xt = n) : (Xt = Xt.next = n), Xt);
		}
		function Zt() {
			if (ht === null) {
				var n = Le.alternate;
				n = n !== null ? n.memoizedState : null;
			} else n = ht.next;
			var r = Xt === null ? Le.memoizedState : Xt.next;
			if (r !== null) ((Xt = r), (ht = n));
			else {
				if (n === null) throw Le.alternate === null ? Error(l(467)) : Error(l(310));
				((ht = n),
					(n = {
						memoizedState: ht.memoizedState,
						baseState: ht.baseState,
						baseQueue: ht.baseQueue,
						queue: ht.queue,
						next: null,
					}),
					Xt === null ? (Le.memoizedState = Xt = n) : (Xt = Xt.next = n));
			}
			return Xt;
		}
		function Wl() {
			return { lastEffect: null, events: null, stores: null, memoCache: null };
		}
		function As(n) {
			var r = xs;
			return (
				(xs += 1),
				_u === null && (_u = []),
				(n = xv(_u, n, r)),
				(r = Le),
				(Xt === null ? r.memoizedState : Xt.next) === null &&
					((r = r.alternate), (V.H = r === null || r.memoizedState === null ? gg : Hf)),
				n
			);
		}
		function eo(n) {
			if (n !== null && typeof n == "object") {
				if (typeof n.then == "function") return As(n);
				if (n.$$typeof === C) return Sn(n);
			}
			throw Error(l(438, String(n)));
		}
		function zf(n) {
			var r = null,
				a = Le.updateQueue;
			if ((a !== null && (r = a.memoCache), r == null)) {
				var s = Le.alternate;
				s !== null &&
					((s = s.updateQueue),
					s !== null &&
						((s = s.memoCache),
						s != null &&
							(r = {
								data: s.data.map(function (c) {
									return c.slice();
								}),
								index: 0,
							})));
			}
			if (
				((r ??= { data: [], index: 0 }),
				a === null && ((a = Wl()), (Le.updateQueue = a)),
				(a.memoCache = r),
				(a = r.data[r.index]),
				a === void 0)
			)
				for (a = r.data[r.index] = Array(n), s = 0; s < n; s++) a[s] = Q;
			return (r.index++, a);
		}
		function oi(n, r) {
			return typeof r == "function" ? r(n) : r;
		}
		function to(n) {
			return Df(Zt(), ht, n);
		}
		function Df(n, r, a) {
			var s = n.queue;
			if (s === null) throw Error(l(311));
			s.lastRenderedReducer = a;
			var c = n.baseQueue,
				d = s.pending;
			if (d !== null) {
				if (c !== null) {
					var y = c.next;
					((c.next = d.next), (d.next = y));
				}
				((r.baseQueue = c = d), (s.pending = null));
			}
			if (((d = n.baseState), c === null)) n.memoizedState = d;
			else {
				r = c.next;
				var T = (y = null),
					D = null,
					F = r,
					re = !1;
				do {
					var ue = F.lane & -536870913;
					if (ue !== F.lane ? (Pe & ue) === ue : (li & ue) === ue) {
						var X = F.revertLane;
						if (X === 0)
							(D !== null &&
								(D = D.next =
									{
										lane: 0,
										revertLane: 0,
										gesture: null,
										action: F.action,
										hasEagerState: F.hasEagerState,
										eagerState: F.eagerState,
										next: null,
									}),
								ue === mu && (re = !0));
						else if ((li & X) === X) {
							((F = F.next), X === mu && (re = !0));
							continue;
						} else
							((ue = {
								lane: 0,
								revertLane: F.revertLane,
								gesture: null,
								action: F.action,
								hasEagerState: F.hasEagerState,
								eagerState: F.eagerState,
								next: null,
							}),
								D === null ? ((T = D = ue), (y = d)) : (D = D.next = ue),
								(Le.lanes |= X),
								(Xi |= X));
						((ue = F.action), ja && a(d, ue), (d = F.hasEagerState ? F.eagerState : a(d, ue)));
					} else
						((X = {
							lane: ue,
							revertLane: F.revertLane,
							gesture: F.gesture,
							action: F.action,
							hasEagerState: F.hasEagerState,
							eagerState: F.eagerState,
							next: null,
						}),
							D === null ? ((T = D = X), (y = d)) : (D = D.next = X),
							(Le.lanes |= ue),
							(Xi |= ue));
					F = F.next;
				} while (F !== null && F !== r);
				if ((D === null ? (y = d) : (D.next = T), !nr(d, n.memoizedState) && ((Jt = !0), re && ((a = vu), a !== null))))
					throw a;
				((n.memoizedState = d), (n.baseState = y), (n.baseQueue = D), (s.lastRenderedState = d));
			}
			return (c === null && (s.lanes = 0), [n.memoizedState, s.dispatch]);
		}
		function jf(n) {
			var r = Zt(),
				a = r.queue;
			if (a === null) throw Error(l(311));
			a.lastRenderedReducer = n;
			var s = a.dispatch,
				c = a.pending,
				d = r.memoizedState;
			if (c !== null) {
				a.pending = null;
				var y = (c = c.next);
				do ((d = n(d, y.action)), (y = y.next));
				while (y !== c);
				(nr(d, r.memoizedState) || (Jt = !0),
					(r.memoizedState = d),
					r.baseQueue === null && (r.baseState = d),
					(a.lastRenderedState = d));
			}
			return [d, s];
		}
		function qv(n, r, a) {
			var s = Le,
				c = Zt(),
				d = Fe;
			if (d) {
				if (a === void 0) throw Error(l(407));
				a = a();
			} else a = r();
			var y = !nr((ht || c).memoizedState, a);
			if (
				(y && ((c.memoizedState = a), (Jt = !0)),
				(c = c.queue),
				Lf(Uv.bind(null, s, c, n), [n]),
				c.getSnapshot !== r || y || (Xt !== null && Xt.memoizedState.tag & 1))
			) {
				if (((s.flags |= 2048), Su(9, { destroy: void 0 }, Lv.bind(null, s, c, a, r), null), pt === null))
					throw Error(l(349));
				d || (li & 127) !== 0 || Iv(s, r, a);
			}
			return a;
		}
		function Iv(n, r, a) {
			((n.flags |= 16384),
				(n = { getSnapshot: r, value: a }),
				(r = Le.updateQueue),
				r === null
					? ((r = Wl()), (Le.updateQueue = r), (r.stores = [n]))
					: ((a = r.stores), a === null ? (r.stores = [n]) : a.push(n)));
		}
		function Lv(n, r, a, s) {
			((r.value = a), (r.getSnapshot = s), $v(r) && Bv(n));
		}
		function Uv(n, r, a) {
			return a(function () {
				$v(r) && Bv(n);
			});
		}
		function $v(n) {
			var r = n.getSnapshot;
			n = n.value;
			try {
				var a = r();
				return !nr(n, a);
			} catch {
				return !0;
			}
		}
		function Bv(n) {
			var r = Ta(n, 2);
			r !== null && Qn(r, n, 2);
		}
		function qf(n) {
			var r = In();
			if (typeof n == "function") {
				var a = n;
				if (((n = a()), ja)) {
					cn(!0);
					try {
						a();
					} finally {
						cn(!1);
					}
				}
			}
			return (
				(r.memoizedState = r.baseState = n),
				(r.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: oi, lastRenderedState: n }),
				r
			);
		}
		function Vv(n, r, a, s) {
			return ((n.baseState = a), Df(n, ht, typeof s == "function" ? s : oi));
		}
		function sw(n, r, a, s, c) {
			if (io(n)) throw Error(l(485));
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
				(V.T !== null ? a(!0) : (d.isTransition = !1),
					s(d),
					(a = r.pending),
					a === null ? ((d.next = r.pending = d), Zv(r, d)) : ((d.next = a.next), (r.pending = a.next = d)));
			}
		}
		function Zv(n, r) {
			var a = r.action,
				s = r.payload,
				c = n.state;
			if (r.isTransition) {
				var d = V.T,
					y = {};
				V.T = y;
				try {
					var T = a(c, s),
						D = V.S;
					(D !== null && D(y, T), Hv(n, r, T));
				} catch (F) {
					If(n, r, F);
				} finally {
					(d !== null && y.types !== null && (d.types = y.types), (V.T = d));
				}
			} else
				try {
					((d = a(c, s)), Hv(n, r, d));
				} catch (F) {
					If(n, r, F);
				}
		}
		function Hv(n, r, a) {
			a !== null && typeof a == "object" && typeof a.then == "function"
				? a.then(
						function (s) {
							Pv(n, r, s);
						},
						function (s) {
							return If(n, r, s);
						},
					)
				: Pv(n, r, a);
		}
		function Pv(n, r, a) {
			((r.status = "fulfilled"),
				(r.value = a),
				Qv(r),
				(n.state = a),
				(r = n.pending),
				r !== null && ((a = r.next), a === r ? (n.pending = null) : ((a = a.next), (r.next = a), Zv(n, a))));
		}
		function If(n, r, a) {
			var s = n.pending;
			if (((n.pending = null), s !== null)) {
				s = s.next;
				do ((r.status = "rejected"), (r.reason = a), Qv(r), (r = r.next));
				while (r !== s);
			}
			n.action = null;
		}
		function Qv(n) {
			n = n.listeners;
			for (var r = 0; r < n.length; r++) (0, n[r])();
		}
		function Kv(n, r) {
			return r;
		}
		function Yv(n, r) {
			if (Fe) {
				var a = pt.formState;
				if (a !== null) {
					e: {
						var s = Le;
						if (Fe) {
							if (Tt) {
								t: {
									for (var c = Tt, d = gr; c.nodeType !== 8; ) {
										if (!d) {
											c = null;
											break t;
										}
										if (((c = br(c.nextSibling)), c === null)) {
											c = null;
											break t;
										}
									}
									((d = c.data), (c = d === "F!" || d === "F" ? c : null));
								}
								if (c) {
									((Tt = br(c.nextSibling)), (s = c.data === "F!"));
									break e;
								}
							}
							Hi(s);
						}
						s = !1;
					}
					s && (r = a[0]);
				}
			}
			return (
				(a = In()),
				(a.memoizedState = a.baseState = r),
				(s = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Kv, lastRenderedState: r }),
				(a.queue = s),
				(a = hg.bind(null, Le, s)),
				(s.dispatch = a),
				(s = qf(!1)),
				(d = Zf.bind(null, Le, !1, s.queue)),
				(s = In()),
				(c = { state: r, dispatch: null, action: n, pending: null }),
				(s.queue = c),
				(a = sw.bind(null, Le, c, d, a)),
				(c.dispatch = a),
				(s.memoizedState = n),
				[r, a, !1]
			);
		}
		function Fv(n) {
			return Gv(Zt(), ht, n);
		}
		function Gv(n, r, a) {
			if (((r = Df(n, r, Kv)[0]), (n = to(oi)[0]), typeof r == "object" && r !== null && typeof r.then == "function"))
				try {
					var s = As(r);
				} catch (y) {
					throw y === gu ? Pl : y;
				}
			else s = r;
			r = Zt();
			var c = r.queue,
				d = c.dispatch;
			return (
				a !== r.memoizedState && ((Le.flags |= 2048), Su(9, { destroy: void 0 }, lw.bind(null, c, a), null)),
				[s, d, n]
			);
		}
		function lw(n, r) {
			n.action = r;
		}
		function Xv(n) {
			var r = Zt(),
				a = ht;
			if (a !== null) return Gv(r, a, n);
			(Zt(), (r = r.memoizedState), (a = Zt()));
			var s = a.queue.dispatch;
			return ((a.memoizedState = n), [r, s, !1]);
		}
		function Su(n, r, a, s) {
			return (
				(n = { tag: n, create: a, deps: s, inst: r, next: null }),
				(r = Le.updateQueue),
				r === null && ((r = Wl()), (Le.updateQueue = r)),
				(a = r.lastEffect),
				a === null ? (r.lastEffect = n.next = n) : ((s = a.next), (a.next = n), (n.next = s), (r.lastEffect = n)),
				n
			);
		}
		function Jv() {
			return Zt().memoizedState;
		}
		function no(n, r, a, s) {
			var c = In();
			((Le.flags |= n), (c.memoizedState = Su(1 | r, { destroy: void 0 }, a, s === void 0 ? null : s)));
		}
		function ro(n, r, a, s) {
			var c = Zt();
			s = s === void 0 ? null : s;
			var d = c.memoizedState.inst;
			ht !== null && s !== null && Cf(s, ht.memoizedState.deps)
				? (c.memoizedState = Su(r, d, a, s))
				: ((Le.flags |= n), (c.memoizedState = Su(1 | r, d, a, s)));
		}
		function Wv(n, r) {
			no(8390656, 8, n, r);
		}
		function Lf(n, r) {
			ro(2048, 8, n, r);
		}
		function ow(n) {
			Le.flags |= 4;
			var r = Le.updateQueue;
			if (r === null) ((r = Wl()), (Le.updateQueue = r), (r.events = [n]));
			else {
				var a = r.events;
				a === null ? (r.events = [n]) : a.push(n);
			}
		}
		function eg(n) {
			var r = Zt().memoizedState;
			return (
				ow({ ref: r, nextImpl: n }),
				function () {
					if ((it & 2) !== 0) throw Error(l(440));
					return r.impl.apply(void 0, arguments);
				}
			);
		}
		function tg(n, r) {
			return ro(4, 2, n, r);
		}
		function ng(n, r) {
			return ro(4, 4, n, r);
		}
		function rg(n, r) {
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
		function ig(n, r, a) {
			((a = a != null ? a.concat([n]) : null), ro(4, 4, rg.bind(null, r, n), a));
		}
		function Uf() {}
		function ag(n, r) {
			var a = Zt();
			r = r === void 0 ? null : r;
			var s = a.memoizedState;
			return r !== null && Cf(r, s[1]) ? s[0] : ((a.memoizedState = [n, r]), n);
		}
		function ug(n, r) {
			var a = Zt();
			r = r === void 0 ? null : r;
			var s = a.memoizedState;
			if (r !== null && Cf(r, s[1])) return s[0];
			if (((s = n()), ja)) {
				cn(!0);
				try {
					n();
				} finally {
					cn(!1);
				}
			}
			return ((a.memoizedState = [s, r]), s);
		}
		function $f(n, r, a) {
			return a === void 0 || ((li & 1073741824) !== 0 && (Pe & 261930) === 0)
				? (n.memoizedState = r)
				: ((n.memoizedState = a), (n = iy()), (Le.lanes |= n), (Xi |= n), a);
		}
		function sg(n, r, a, s) {
			return nr(a, r)
				? a
				: pu.current !== null
					? ((n = $f(n, a, s)), nr(n, r) || (Jt = !0), n)
					: (li & 42) === 0 || ((li & 1073741824) !== 0 && (Pe & 261930) === 0)
						? ((Jt = !0), (n.memoizedState = a))
						: ((n = iy()), (Le.lanes |= n), (Xi |= n), r);
		}
		function lg(n, r, a, s, c) {
			var d = P.p;
			P.p = d !== 0 && 8 > d ? d : 8;
			var y = V.T,
				T = {};
			((V.T = T), Zf(n, !1, r, a));
			try {
				var D = c(),
					F = V.S;
				(F !== null && F(T, D),
					D !== null && typeof D == "object" && typeof D.then == "function"
						? Rs(n, r, iw(D, s), pr(n))
						: Rs(n, r, s, pr(n)));
			} catch (re) {
				Rs(n, r, { then: function () {}, status: "rejected", reason: re }, pr());
			} finally {
				((P.p = d), y !== null && T.types !== null && (y.types = T.types), (V.T = y));
			}
		}
		function cw() {}
		function Bf(n, r, a, s) {
			if (n.tag !== 5) throw Error(l(476));
			var c = og(n).queue;
			lg(
				n,
				c,
				r,
				ve,
				a === null
					? cw
					: function () {
							return (cg(n), a(s));
						},
			);
		}
		function og(n) {
			var r = n.memoizedState;
			if (r !== null) return r;
			r = {
				memoizedState: ve,
				baseState: ve,
				baseQueue: null,
				queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: oi, lastRenderedState: ve },
				next: null,
			};
			var a = {};
			return (
				(r.next = {
					memoizedState: a,
					baseState: a,
					baseQueue: null,
					queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: oi, lastRenderedState: a },
					next: null,
				}),
				(n.memoizedState = r),
				(n = n.alternate),
				n !== null && (n.memoizedState = r),
				r
			);
		}
		function cg(n) {
			var r = og(n);
			(r.next === null && (r = n.alternate.memoizedState), Rs(n, r.next.queue, {}, pr()));
		}
		function Vf() {
			return Sn(Hs);
		}
		function fg() {
			return Zt().memoizedState;
		}
		function dg() {
			return Zt().memoizedState;
		}
		function fw(n) {
			for (var r = n.return; r !== null; ) {
				switch (r.tag) {
					case 24:
					case 3:
						var a = pr();
						n = za(a);
						var s = Da(r, n, a);
						(s !== null && (Qn(s, r, a), ws(s, r, a)), (r = { cache: yf() }), (n.payload = r));
						return;
				}
				r = r.return;
			}
		}
		function dw(n, r, a) {
			var s = pr();
			((a = { lane: s, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null }),
				io(n) ? mg(r, a) : ((a = uf(n, r, a, s)), a !== null && (Qn(a, n, s), vg(a, r, s))));
		}
		function hg(n, r, a) {
			Rs(n, r, a, pr());
		}
		function Rs(n, r, a, s) {
			var c = { lane: s, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null };
			if (io(n)) mg(r, c);
			else {
				var d = n.alternate;
				if (n.lanes === 0 && (d === null || d.lanes === 0) && ((d = r.lastRenderedReducer), d !== null))
					try {
						var y = r.lastRenderedState,
							T = d(y, a);
						if (((c.hasEagerState = !0), (c.eagerState = T), nr(T, y)))
							return (Ll(n, r, c, 0), pt === null && Il(), !1);
					} catch {}
				if (((a = uf(n, r, c, s)), a !== null)) return (Qn(a, n, s), vg(a, r, s), !0);
			}
			return !1;
		}
		function Zf(n, r, a, s) {
			if (
				((s = { lane: 2, revertLane: Sd(), gesture: null, action: s, hasEagerState: !1, eagerState: null, next: null }),
				io(n))
			) {
				if (r) throw Error(l(479));
			} else ((r = uf(n, a, s, 2)), r !== null && Qn(r, n, 2));
		}
		function io(n) {
			var r = n.alternate;
			return n === Le || (r !== null && r === Le);
		}
		function mg(n, r) {
			bu = Xl = !0;
			var a = n.pending;
			(a === null ? (r.next = r) : ((r.next = a.next), (a.next = r)), (n.pending = r));
		}
		function vg(n, r, a) {
			if ((a & 4194048) !== 0) {
				var s = r.lanes;
				((s &= n.pendingLanes), (a |= s), (r.lanes = a), er(n, a));
			}
		}
		var Cs = {
			readContext: Sn,
			use: eo,
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
		Cs.useEffectEvent = Ut;
		var gg = {
				readContext: Sn,
				use: eo,
				useCallback: function (n, r) {
					return ((In().memoizedState = [n, r === void 0 ? null : r]), n);
				},
				useContext: Sn,
				useEffect: Wv,
				useImperativeHandle: function (n, r, a) {
					((a = a != null ? a.concat([n]) : null), no(4194308, 4, rg.bind(null, r, n), a));
				},
				useLayoutEffect: function (n, r) {
					return no(4194308, 4, n, r);
				},
				useInsertionEffect: function (n, r) {
					no(4, 2, n, r);
				},
				useMemo: function (n, r) {
					var a = In();
					r = r === void 0 ? null : r;
					var s = n();
					if (ja) {
						cn(!0);
						try {
							n();
						} finally {
							cn(!1);
						}
					}
					return ((a.memoizedState = [s, r]), s);
				},
				useReducer: function (n, r, a) {
					var s = In();
					if (a !== void 0) {
						var c = a(r);
						if (ja) {
							cn(!0);
							try {
								a(r);
							} finally {
								cn(!1);
							}
						}
					} else c = r;
					return (
						(s.memoizedState = s.baseState = c),
						(n = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: c }),
						(s.queue = n),
						(n = n.dispatch = dw.bind(null, Le, n)),
						[s.memoizedState, n]
					);
				},
				useRef: function (n) {
					var r = In();
					return ((n = { current: n }), (r.memoizedState = n));
				},
				useState: function (n) {
					n = qf(n);
					var r = n.queue,
						a = hg.bind(null, Le, r);
					return ((r.dispatch = a), [n.memoizedState, a]);
				},
				useDebugValue: Uf,
				useDeferredValue: function (n, r) {
					return $f(In(), n, r);
				},
				useTransition: function () {
					var n = qf(!1);
					return ((n = lg.bind(null, Le, n.queue, !0, !1)), (In().memoizedState = n), [!1, n]);
				},
				useSyncExternalStore: function (n, r, a) {
					var s = Le,
						c = In();
					if (Fe) {
						if (a === void 0) throw Error(l(407));
						a = a();
					} else {
						if (((a = r()), pt === null)) throw Error(l(349));
						(Pe & 127) !== 0 || Iv(s, r, a);
					}
					c.memoizedState = a;
					var d = { value: a, getSnapshot: r };
					return (
						(c.queue = d),
						Wv(Uv.bind(null, s, d, n), [n]),
						(s.flags |= 2048),
						Su(9, { destroy: void 0 }, Lv.bind(null, s, d, a, r), null),
						a
					);
				},
				useId: function () {
					var n = In(),
						r = pt.identifierPrefix;
					if (Fe) {
						var a = Zr,
							s = Vr;
						((a = (s & ~(1 << (32 - qt(s) - 1))).toString(32) + a),
							(r = "_" + r + "R_" + a),
							(a = Jl++),
							0 < a && (r += "H" + a.toString(32)),
							(r += "_"));
					} else ((a = aw++), (r = "_" + r + "r_" + a.toString(32) + "_"));
					return (n.memoizedState = r);
				},
				useHostTransitionStatus: Vf,
				useFormState: Yv,
				useActionState: Yv,
				useOptimistic: function (n) {
					var r = In();
					r.memoizedState = r.baseState = n;
					var a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
					return ((r.queue = a), (r = Zf.bind(null, Le, !0, a)), (a.dispatch = r), [n, r]);
				},
				useMemoCache: zf,
				useCacheRefresh: function () {
					return (In().memoizedState = fw.bind(null, Le));
				},
				useEffectEvent: function (n) {
					var r = In(),
						a = { impl: n };
					return (
						(r.memoizedState = a),
						function () {
							if ((it & 2) !== 0) throw Error(l(440));
							return a.impl.apply(void 0, arguments);
						}
					);
				},
			},
			Hf = {
				readContext: Sn,
				use: eo,
				useCallback: ag,
				useContext: Sn,
				useEffect: Lf,
				useImperativeHandle: ig,
				useInsertionEffect: tg,
				useLayoutEffect: ng,
				useMemo: ug,
				useReducer: to,
				useRef: Jv,
				useState: function () {
					return to(oi);
				},
				useDebugValue: Uf,
				useDeferredValue: function (n, r) {
					return sg(Zt(), ht.memoizedState, n, r);
				},
				useTransition: function () {
					var n = to(oi)[0],
						r = Zt().memoizedState;
					return [typeof n == "boolean" ? n : As(n), r];
				},
				useSyncExternalStore: qv,
				useId: fg,
				useHostTransitionStatus: Vf,
				useFormState: Fv,
				useActionState: Fv,
				useOptimistic: function (n, r) {
					return Vv(Zt(), ht, n, r);
				},
				useMemoCache: zf,
				useCacheRefresh: dg,
			};
		Hf.useEffectEvent = eg;
		var yg = {
			readContext: Sn,
			use: eo,
			useCallback: ag,
			useContext: Sn,
			useEffect: Lf,
			useImperativeHandle: ig,
			useInsertionEffect: tg,
			useLayoutEffect: ng,
			useMemo: ug,
			useReducer: jf,
			useRef: Jv,
			useState: function () {
				return jf(oi);
			},
			useDebugValue: Uf,
			useDeferredValue: function (n, r) {
				var a = Zt();
				return ht === null ? $f(a, n, r) : sg(a, ht.memoizedState, n, r);
			},
			useTransition: function () {
				var n = jf(oi)[0],
					r = Zt().memoizedState;
				return [typeof n == "boolean" ? n : As(n), r];
			},
			useSyncExternalStore: qv,
			useId: fg,
			useHostTransitionStatus: Vf,
			useFormState: Xv,
			useActionState: Xv,
			useOptimistic: function (n, r) {
				var a = Zt();
				return ht !== null ? Vv(a, ht, n, r) : ((a.baseState = n), [n, a.queue.dispatch]);
			},
			useMemoCache: zf,
			useCacheRefresh: dg,
		};
		yg.useEffectEvent = eg;
		function Pf(n, r, a, s) {
			((r = n.memoizedState),
				(a = a(s, r)),
				(a = a == null ? r : p({}, r, a)),
				(n.memoizedState = a),
				n.lanes === 0 && (n.updateQueue.baseState = a));
		}
		var Qf = {
			enqueueSetState: function (n, r, a) {
				n = n._reactInternals;
				var s = pr(),
					c = za(s);
				((c.payload = r), a != null && (c.callback = a), (r = Da(n, c, s)), r !== null && (Qn(r, n, s), ws(r, n, s)));
			},
			enqueueReplaceState: function (n, r, a) {
				n = n._reactInternals;
				var s = pr(),
					c = za(s);
				((c.tag = 1),
					(c.payload = r),
					a != null && (c.callback = a),
					(r = Da(n, c, s)),
					r !== null && (Qn(r, n, s), ws(r, n, s)));
			},
			enqueueForceUpdate: function (n, r) {
				n = n._reactInternals;
				var a = pr(),
					s = za(a);
				((s.tag = 2), r != null && (s.callback = r), (r = Da(n, s, a)), r !== null && (Qn(r, n, a), ws(r, n, a)));
			},
		};
		function pg(n, r, a, s, c, d, y) {
			return (
				(n = n.stateNode),
				typeof n.shouldComponentUpdate == "function"
					? n.shouldComponentUpdate(s, d, y)
					: r.prototype && r.prototype.isPureReactComponent
						? !ms(a, s) || !ms(c, d)
						: !0
			);
		}
		function bg(n, r, a, s) {
			((n = r.state),
				typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(a, s),
				typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(a, s),
				r.state !== n && Qf.enqueueReplaceState(r, r.state, null));
		}
		function qa(n, r) {
			var a = r;
			if ("ref" in r) {
				a = {};
				for (var s in r) s !== "ref" && (a[s] = r[s]);
			}
			if ((n = n.defaultProps)) {
				a === r && (a = p({}, a));
				for (var c in n) a[c] === void 0 && (a[c] = n[c]);
			}
			return a;
		}
		function hw(n) {
			ql(n);
		}
		function mw(n) {
			console.error(n);
		}
		function vw(n) {
			ql(n);
		}
		function ao(n, r) {
			try {
				var a = n.onUncaughtError;
				a(r.value, { componentStack: r.stack });
			} catch (s) {
				setTimeout(function () {
					throw s;
				});
			}
		}
		function _g(n, r, a) {
			try {
				var s = n.onCaughtError;
				s(a.value, { componentStack: a.stack, errorBoundary: r.tag === 1 ? r.stateNode : null });
			} catch (c) {
				setTimeout(function () {
					throw c;
				});
			}
		}
		function Kf(n, r, a) {
			return (
				(a = za(a)),
				(a.tag = 3),
				(a.payload = { element: null }),
				(a.callback = function () {
					ao(n, r);
				}),
				a
			);
		}
		function Sg(n) {
			return ((n = za(n)), (n.tag = 3), n);
		}
		function wg(n, r, a, s) {
			var c = a.type.getDerivedStateFromError;
			if (typeof c == "function") {
				var d = s.value;
				((n.payload = function () {
					return c(d);
				}),
					(n.callback = function () {
						_g(r, a, s);
					}));
			}
			var y = a.stateNode;
			y !== null &&
				typeof y.componentDidCatch == "function" &&
				(n.callback = function () {
					(_g(r, a, s), typeof c != "function" && (Ji === null ? (Ji = new Set([this])) : Ji.add(this)));
					var T = s.stack;
					this.componentDidCatch(s.value, { componentStack: T !== null ? T : "" });
				});
		}
		function gw(n, r, a, s, c) {
			if (((a.flags |= 32768), s !== null && typeof s == "object" && typeof s.then == "function")) {
				if (((r = a.alternate), r !== null && hu(r, a, c, !0), (a = ir.current), a !== null)) {
					switch (a.tag) {
						case 31:
						case 13:
							return (
								yr === null ? po() : a.alternate === null && $t === 0 && ($t = 3),
								(a.flags &= -257),
								(a.flags |= 65536),
								(a.lanes = c),
								s === Ql
									? (a.flags |= 16384)
									: ((r = a.updateQueue), r === null ? (a.updateQueue = new Set([s])) : r.add(s), pd(n, s, c)),
								!1
							);
						case 22:
							return (
								(a.flags |= 65536),
								s === Ql
									? (a.flags |= 16384)
									: ((r = a.updateQueue),
										r === null
											? ((r = { transitions: null, markerInstances: null, retryQueue: new Set([s]) }),
												(a.updateQueue = r))
											: ((a = r.retryQueue), a === null ? (r.retryQueue = new Set([s])) : a.add(s)),
										pd(n, s, c)),
								!1
							);
					}
					throw Error(l(435, a.tag));
				}
				return (pd(n, s, c), po(), !1);
			}
			if (Fe)
				return (
					(r = ir.current),
					r !== null
						? ((r.flags & 65536) === 0 && (r.flags |= 256),
							(r.flags |= 65536),
							(r.lanes = c),
							s !== df && ((n = Error(l(422), { cause: s })), ys(hr(n, a))))
						: (s !== df && ((r = Error(l(423), { cause: s })), ys(hr(r, a))),
							(n = n.current.alternate),
							(n.flags |= 65536),
							(c &= -c),
							(n.lanes |= c),
							(s = hr(s, a)),
							(c = Kf(n.stateNode, s, c)),
							Ef(n, c),
							$t !== 4 && ($t = 2)),
					!1
				);
			var d = Error(l(520), { cause: s });
			if (((d = hr(d, a)), qs === null ? (qs = [d]) : qs.push(d), $t !== 4 && ($t = 2), r === null)) return !0;
			((s = hr(s, a)), (a = r));
			do {
				switch (a.tag) {
					case 3:
						return ((a.flags |= 65536), (n = c & -c), (a.lanes |= n), (n = Kf(a.stateNode, s, n)), Ef(a, n), !1);
					case 1:
						if (
							((r = a.type),
							(d = a.stateNode),
							(a.flags & 128) === 0 &&
								(typeof r.getDerivedStateFromError == "function" ||
									(d !== null && typeof d.componentDidCatch == "function" && (Ji === null || !Ji.has(d)))))
						)
							return ((a.flags |= 65536), (c &= -c), (a.lanes |= c), (c = Sg(c)), wg(c, n, a, s), Ef(a, c), !1);
				}
				a = a.return;
			} while (a !== null);
			return !1;
		}
		var Yf = Error(l(461)),
			Jt = !1;
		function wn(n, r, a, s) {
			r.child = n === null ? kv(r, null, a, s) : Oa(r, n.child, a, s);
		}
		function Eg(n, r, a, s, c) {
			a = a.render;
			var d = r.ref;
			if ("ref" in s) {
				var y = {};
				for (var T in s) T !== "ref" && (y[T] = s[T]);
			} else y = s;
			return (
				Ca(r),
				(s = kf(n, r, a, y, d, c)),
				(T = Mf()),
				n !== null && !Jt ? (Nf(n, r, c), ci(n, r, c)) : (Fe && T && cf(r), (r.flags |= 1), wn(n, r, s, c), r.child)
			);
		}
		function Tg(n, r, a, s, c) {
			if (n === null) {
				var d = a.type;
				return typeof d == "function" && !sf(d) && d.defaultProps === void 0 && a.compare === null
					? ((r.tag = 15), (r.type = d), xg(n, r, d, s, c))
					: ((n = $l(a.type, null, s, r, r.mode, c)), (n.ref = r.ref), (n.return = r), (r.child = n));
			}
			if (((d = n.child), !nd(n, c))) {
				var y = d.memoizedProps;
				if (((a = a.compare), (a = a !== null ? a : ms), a(y, s) && n.ref === r.ref)) return ci(n, r, c);
			}
			return ((r.flags |= 1), (n = ii(d, s)), (n.ref = r.ref), (n.return = r), (r.child = n));
		}
		function xg(n, r, a, s, c) {
			if (n !== null) {
				var d = n.memoizedProps;
				if (ms(d, s) && n.ref === r.ref)
					if (((Jt = !1), (r.pendingProps = s = d), nd(n, c))) (n.flags & 131072) !== 0 && (Jt = !0);
					else return ((r.lanes = n.lanes), ci(n, r, c));
			}
			return Ff(n, r, a, s, c);
		}
		function Ag(n, r, a, s) {
			var c = s.children,
				d = n !== null ? n.memoizedState : null;
			if (
				(n === null &&
					r.stateNode === null &&
					(r.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				s.mode === "hidden")
			) {
				if ((r.flags & 128) !== 0) {
					if (((d = d !== null ? d.baseLanes | a : a), n !== null)) {
						for (s = r.child = n.child, c = 0; s !== null; ) ((c = c | s.lanes | s.childLanes), (s = s.sibling));
						s = c & ~d;
					} else ((s = 0), (r.child = null));
					return Rg(n, r, d, a, s);
				}
				if ((a & 536870912) !== 0)
					((r.memoizedState = { baseLanes: 0, cachePool: null }),
						n !== null && Hl(r, d !== null ? d.cachePool : null),
						d !== null ? Ov(r, d) : xf(),
						zv(r));
				else return ((s = r.lanes = 536870912), Rg(n, r, d !== null ? d.baseLanes | a : a, a, s));
			} else
				d !== null
					? (Hl(r, d.cachePool), Ov(r, d), Yi(r), (r.memoizedState = null))
					: (n !== null && Hl(r, null), xf(), Yi(r));
			return (wn(n, r, c, a), r.child);
		}
		function ks(n, r) {
			return (
				(n !== null && n.tag === 22) ||
					r.stateNode !== null ||
					(r.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				r.sibling
			);
		}
		function Rg(n, r, a, s, c) {
			var d = bf();
			return (
				(d = d === null ? null : { parent: Gt._currentValue, pool: d }),
				(r.memoizedState = { baseLanes: a, cachePool: d }),
				n !== null && Hl(r, null),
				xf(),
				zv(r),
				n !== null && hu(n, r, s, !0),
				(r.childLanes = c),
				null
			);
		}
		function uo(n, r) {
			return (
				(r = lo({ mode: r.mode, children: r.children }, n.mode)),
				(r.ref = n.ref),
				(n.child = r),
				(r.return = n),
				r
			);
		}
		function Cg(n, r, a) {
			return (Oa(r, n.child, null, a), (n = uo(r, r.pendingProps)), (n.flags |= 2), ar(r), (r.memoizedState = null), n);
		}
		function yw(n, r, a) {
			var s = r.pendingProps,
				c = (r.flags & 128) !== 0;
			if (((r.flags &= -129), n === null)) {
				if (Fe) {
					if (s.mode === "hidden") return ((n = uo(r, s)), (r.lanes = 536870912), ks(null, n));
					if (
						(Rf(r),
						(n = Tt)
							? ((n = By(n, gr)),
								(n = n !== null && n.data === "&" ? n : null),
								n !== null &&
									((r.memoizedState = {
										dehydrated: n,
										treeContext: Vi !== null ? { id: Vr, overflow: Zr } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = mv(n)),
									(a.return = r),
									(r.child = a),
									(_n = r),
									(Tt = null)))
							: (n = null),
						n === null)
					)
						throw Hi(r);
					return ((r.lanes = 536870912), null);
				}
				return uo(r, s);
			}
			var d = n.memoizedState;
			if (d !== null) {
				var y = d.dehydrated;
				if ((Rf(r), c))
					if (r.flags & 256) ((r.flags &= -257), (r = Cg(n, r, a)));
					else if (r.memoizedState !== null) ((r.child = n.child), (r.flags |= 128), (r = null));
					else throw Error(l(558));
				else if ((Jt || hu(n, r, a, !1), (c = (a & n.childLanes) !== 0), Jt || c)) {
					if (((s = pt), s !== null && ((y = ji(s, a)), y !== 0 && y !== d.retryLane)))
						throw ((d.retryLane = y), Ta(n, y), Qn(s, n, y), Yf);
					(po(), (r = Cg(n, r, a)));
				} else
					((n = d.treeContext),
						(Tt = br(y.nextSibling)),
						(_n = r),
						(Fe = !0),
						(Zi = null),
						(gr = !1),
						n !== null && yv(r, n),
						(r = uo(r, s)),
						(r.flags |= 4096));
				return r;
			}
			return (
				(n = ii(n.child, { mode: s.mode, children: s.children })),
				(n.ref = r.ref),
				(r.child = n),
				(n.return = r),
				n
			);
		}
		function so(n, r) {
			var a = r.ref;
			if (a === null) n !== null && n.ref !== null && (r.flags |= 4194816);
			else {
				if (typeof a != "function" && typeof a != "object") throw Error(l(284));
				(n === null || n.ref !== a) && (r.flags |= 4194816);
			}
		}
		function Ff(n, r, a, s, c) {
			return (
				Ca(r),
				(a = kf(n, r, a, s, void 0, c)),
				(s = Mf()),
				n !== null && !Jt ? (Nf(n, r, c), ci(n, r, c)) : (Fe && s && cf(r), (r.flags |= 1), wn(n, r, a, c), r.child)
			);
		}
		function kg(n, r, a, s, c, d) {
			return (
				Ca(r),
				(r.updateQueue = null),
				(a = jv(r, s, a, c)),
				Dv(n),
				(s = Mf()),
				n !== null && !Jt ? (Nf(n, r, d), ci(n, r, d)) : (Fe && s && cf(r), (r.flags |= 1), wn(n, r, a, d), r.child)
			);
		}
		function Mg(n, r, a, s, c) {
			if ((Ca(r), r.stateNode === null)) {
				var d = ou,
					y = a.contextType;
				(typeof y == "object" && y !== null && (d = Sn(y)),
					(d = new a(s, d)),
					(r.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null),
					(d.updater = Qf),
					(r.stateNode = d),
					(d._reactInternals = r),
					(d = r.stateNode),
					(d.props = s),
					(d.state = r.memoizedState),
					(d.refs = {}),
					Sf(r),
					(y = a.contextType),
					(d.context = typeof y == "object" && y !== null ? Sn(y) : ou),
					(d.state = r.memoizedState),
					(y = a.getDerivedStateFromProps),
					typeof y == "function" && (Pf(r, a, y, s), (d.state = r.memoizedState)),
					typeof a.getDerivedStateFromProps == "function" ||
						typeof d.getSnapshotBeforeUpdate == "function" ||
						(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
						((y = d.state),
						typeof d.componentWillMount == "function" && d.componentWillMount(),
						typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(),
						y !== d.state && Qf.enqueueReplaceState(d, d.state, null),
						Ts(r, s, d, c),
						Es(),
						(d.state = r.memoizedState)),
					typeof d.componentDidMount == "function" && (r.flags |= 4194308),
					(s = !0));
			} else if (n === null) {
				d = r.stateNode;
				var T = r.memoizedProps,
					D = qa(a, T);
				d.props = D;
				var F = d.context,
					re = a.contextType;
				((y = ou), typeof re == "object" && re !== null && (y = Sn(re)));
				var ue = a.getDerivedStateFromProps;
				((re = typeof ue == "function" || typeof d.getSnapshotBeforeUpdate == "function"),
					(T = r.pendingProps !== T),
					re ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((T || F !== y) && bg(r, d, s, y)),
					(Qi = !1));
				var X = r.memoizedState;
				((d.state = X),
					Ts(r, s, d, c),
					Es(),
					(F = r.memoizedState),
					T || X !== F || Qi
						? (typeof ue == "function" && (Pf(r, a, ue, s), (F = r.memoizedState)),
							(D = Qi || pg(r, a, D, s, X, F, y))
								? (re ||
										(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
										(typeof d.componentWillMount == "function" && d.componentWillMount(),
										typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()),
									typeof d.componentDidMount == "function" && (r.flags |= 4194308))
								: (typeof d.componentDidMount == "function" && (r.flags |= 4194308),
									(r.memoizedProps = s),
									(r.memoizedState = F)),
							(d.props = s),
							(d.state = F),
							(d.context = y),
							(s = D))
						: (typeof d.componentDidMount == "function" && (r.flags |= 4194308), (s = !1)));
			} else {
				((d = r.stateNode),
					wf(n, r),
					(y = r.memoizedProps),
					(re = qa(a, y)),
					(d.props = re),
					(ue = r.pendingProps),
					(X = d.context),
					(F = a.contextType),
					(D = ou),
					typeof F == "object" && F !== null && (D = Sn(F)),
					(T = a.getDerivedStateFromProps),
					(F = typeof T == "function" || typeof d.getSnapshotBeforeUpdate == "function") ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((y !== ue || X !== D) && bg(r, d, s, D)),
					(Qi = !1),
					(X = r.memoizedState),
					(d.state = X),
					Ts(r, s, d, c),
					Es());
				var ee = r.memoizedState;
				y !== ue || X !== ee || Qi || (n !== null && n.dependencies !== null && Vl(n.dependencies))
					? (typeof T == "function" && (Pf(r, a, T, s), (ee = r.memoizedState)),
						(re = Qi || pg(r, a, re, s, X, ee, D) || (n !== null && n.dependencies !== null && Vl(n.dependencies)))
							? (F ||
									(typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function") ||
									(typeof d.componentWillUpdate == "function" && d.componentWillUpdate(s, ee, D),
									typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(s, ee, D)),
								typeof d.componentDidUpdate == "function" && (r.flags |= 4),
								typeof d.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024))
							: (typeof d.componentDidUpdate != "function" ||
									(y === n.memoizedProps && X === n.memoizedState) ||
									(r.flags |= 4),
								typeof d.getSnapshotBeforeUpdate != "function" ||
									(y === n.memoizedProps && X === n.memoizedState) ||
									(r.flags |= 1024),
								(r.memoizedProps = s),
								(r.memoizedState = ee)),
						(d.props = s),
						(d.state = ee),
						(d.context = D),
						(s = re))
					: (typeof d.componentDidUpdate != "function" ||
							(y === n.memoizedProps && X === n.memoizedState) ||
							(r.flags |= 4),
						typeof d.getSnapshotBeforeUpdate != "function" ||
							(y === n.memoizedProps && X === n.memoizedState) ||
							(r.flags |= 1024),
						(s = !1));
			}
			return (
				(d = s),
				so(n, r),
				(s = (r.flags & 128) !== 0),
				d || s
					? ((d = r.stateNode),
						(a = s && typeof a.getDerivedStateFromError != "function" ? null : d.render()),
						(r.flags |= 1),
						n !== null && s ? ((r.child = Oa(r, n.child, null, c)), (r.child = Oa(r, null, a, c))) : wn(n, r, a, c),
						(r.memoizedState = d.state),
						(n = r.child))
					: (n = ci(n, r, c)),
				n
			);
		}
		function Ng(n, r, a, s) {
			return (Aa(), (r.flags |= 256), wn(n, r, a, s), r.child);
		}
		var Gf = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
		function Xf(n) {
			return { baseLanes: n, cachePool: Ev() };
		}
		function Jf(n, r, a) {
			return ((n = n !== null ? n.childLanes & ~a : 0), r && (n |= sr), n);
		}
		function Og(n, r, a) {
			var s = r.pendingProps,
				c = !1,
				d = (r.flags & 128) !== 0,
				y;
			if (
				((y = d) || (y = n !== null && n.memoizedState === null ? !1 : (Vt.current & 2) !== 0),
				y && ((c = !0), (r.flags &= -129)),
				(y = (r.flags & 32) !== 0),
				(r.flags &= -33),
				n === null)
			) {
				if (Fe) {
					if (
						(c ? Ki(r) : Yi(r),
						(n = Tt)
							? ((n = By(n, gr)),
								(n = n !== null && n.data !== "&" ? n : null),
								n !== null &&
									((r.memoizedState = {
										dehydrated: n,
										treeContext: Vi !== null ? { id: Vr, overflow: Zr } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = mv(n)),
									(a.return = r),
									(r.child = a),
									(_n = r),
									(Tt = null)))
							: (n = null),
						n === null)
					)
						throw Hi(r);
					return (zd(n) ? (r.lanes = 32) : (r.lanes = 536870912), null);
				}
				var T = s.children;
				return (
					(s = s.fallback),
					c
						? (Yi(r),
							(c = r.mode),
							(T = lo({ mode: "hidden", children: T }, c)),
							(s = xa(s, c, a, null)),
							(T.return = r),
							(s.return = r),
							(T.sibling = s),
							(r.child = T),
							(s = r.child),
							(s.memoizedState = Xf(a)),
							(s.childLanes = Jf(n, y, a)),
							(r.memoizedState = Gf),
							ks(null, s))
						: (Ki(r), Wf(r, T))
				);
			}
			var D = n.memoizedState;
			if (D !== null && ((T = D.dehydrated), T !== null)) {
				if (d)
					r.flags & 256
						? (Ki(r), (r.flags &= -257), (r = ed(n, r, a)))
						: r.memoizedState !== null
							? (Yi(r), (r.child = n.child), (r.flags |= 128), (r = null))
							: (Yi(r),
								(T = s.fallback),
								(c = r.mode),
								(s = lo({ mode: "visible", children: s.children }, c)),
								(T = xa(T, c, a, null)),
								(T.flags |= 2),
								(s.return = r),
								(T.return = r),
								(s.sibling = T),
								(r.child = s),
								Oa(r, n.child, null, a),
								(s = r.child),
								(s.memoizedState = Xf(a)),
								(s.childLanes = Jf(n, y, a)),
								(r.memoizedState = Gf),
								(r = ks(null, s)));
				else if ((Ki(r), zd(T))) {
					if (((y = T.nextSibling && T.nextSibling.dataset), y)) var F = y.dgst;
					((y = F),
						(s = Error(l(419))),
						(s.stack = ""),
						(s.digest = y),
						ys({ value: s, source: null, stack: null }),
						(r = ed(n, r, a)));
				} else if ((Jt || hu(n, r, a, !1), (y = (a & n.childLanes) !== 0), Jt || y)) {
					if (((y = pt), y !== null && ((s = ji(y, a)), s !== 0 && s !== D.retryLane)))
						throw ((D.retryLane = s), Ta(n, s), Qn(y, n, s), Yf);
					(Od(T) || po(), (r = ed(n, r, a)));
				} else
					Od(T)
						? ((r.flags |= 192), (r.child = n.child), (r = null))
						: ((n = D.treeContext),
							(Tt = br(T.nextSibling)),
							(_n = r),
							(Fe = !0),
							(Zi = null),
							(gr = !1),
							n !== null && yv(r, n),
							(r = Wf(r, s.children)),
							(r.flags |= 4096));
				return r;
			}
			return c
				? (Yi(r),
					(T = s.fallback),
					(c = r.mode),
					(D = n.child),
					(F = D.sibling),
					(s = ii(D, { mode: "hidden", children: s.children })),
					(s.subtreeFlags = D.subtreeFlags & 65011712),
					F !== null ? (T = ii(F, T)) : ((T = xa(T, c, a, null)), (T.flags |= 2)),
					(T.return = r),
					(s.return = r),
					(s.sibling = T),
					(r.child = s),
					ks(null, s),
					(s = r.child),
					(T = n.child.memoizedState),
					T === null
						? (T = Xf(a))
						: ((c = T.cachePool),
							c !== null ? ((D = Gt._currentValue), (c = c.parent !== D ? { parent: D, pool: D } : c)) : (c = Ev()),
							(T = { baseLanes: T.baseLanes | a, cachePool: c })),
					(s.memoizedState = T),
					(s.childLanes = Jf(n, y, a)),
					(r.memoizedState = Gf),
					ks(n.child, s))
				: (Ki(r),
					(a = n.child),
					(n = a.sibling),
					(a = ii(a, { mode: "visible", children: s.children })),
					(a.return = r),
					(a.sibling = null),
					n !== null && ((y = r.deletions), y === null ? ((r.deletions = [n]), (r.flags |= 16)) : y.push(n)),
					(r.child = a),
					(r.memoizedState = null),
					a);
		}
		function Wf(n, r) {
			return ((r = lo({ mode: "visible", children: r }, n.mode)), (r.return = n), (n.child = r));
		}
		function lo(n, r) {
			return ((n = rr(22, n, null, r)), (n.lanes = 0), n);
		}
		function ed(n, r, a) {
			return (
				Oa(r, n.child, null, a),
				(n = Wf(r, r.pendingProps.children)),
				(n.flags |= 2),
				(r.memoizedState = null),
				n
			);
		}
		function zg(n, r, a) {
			n.lanes |= r;
			var s = n.alternate;
			(s !== null && (s.lanes |= r), vf(n.return, r, a));
		}
		function td(n, r, a, s, c, d) {
			var y = n.memoizedState;
			y === null
				? (n.memoizedState = {
						isBackwards: r,
						rendering: null,
						renderingStartTime: 0,
						last: s,
						tail: a,
						tailMode: c,
						treeForkCount: d,
					})
				: ((y.isBackwards = r),
					(y.rendering = null),
					(y.renderingStartTime = 0),
					(y.last = s),
					(y.tail = a),
					(y.tailMode = c),
					(y.treeForkCount = d));
		}
		function Dg(n, r, a) {
			var s = r.pendingProps,
				c = s.revealOrder,
				d = s.tail;
			s = s.children;
			var y = Vt.current,
				T = (y & 2) !== 0;
			if (
				(T ? ((y = (y & 1) | 2), (r.flags |= 128)) : (y &= 1),
				se(Vt, y),
				wn(n, r, s, a),
				(s = Fe ? gs : 0),
				!T && n !== null && (n.flags & 128) !== 0)
			)
				e: for (n = r.child; n !== null; ) {
					if (n.tag === 13) n.memoizedState !== null && zg(n, a, r);
					else if (n.tag === 19) zg(n, a, r);
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
						((n = a.alternate), n !== null && Gl(n) === null && (c = a), (a = a.sibling));
					((a = c),
						a === null ? ((c = r.child), (r.child = null)) : ((c = a.sibling), (a.sibling = null)),
						td(r, !1, c, a, d, s));
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (a = null, c = r.child, r.child = null; c !== null; ) {
						if (((n = c.alternate), n !== null && Gl(n) === null)) {
							r.child = c;
							break;
						}
						((n = c.sibling), (c.sibling = a), (a = c), (c = n));
					}
					td(r, !0, a, null, d, s);
					break;
				case "together":
					td(r, !1, null, null, void 0, s);
					break;
				default:
					r.memoizedState = null;
			}
			return r.child;
		}
		function ci(n, r, a) {
			if ((n !== null && (r.dependencies = n.dependencies), (Xi |= r.lanes), (a & r.childLanes) === 0))
				if (n !== null) {
					if ((hu(n, r, a, !1), (a & r.childLanes) === 0)) return null;
				} else return null;
			if (n !== null && r.child !== n.child) throw Error(l(153));
			if (r.child !== null) {
				for (n = r.child, a = ii(n, n.pendingProps), r.child = a, a.return = r; n.sibling !== null; )
					((n = n.sibling), (a = a.sibling = ii(n, n.pendingProps)), (a.return = r));
				a.sibling = null;
			}
			return r.child;
		}
		function nd(n, r) {
			return (n.lanes & r) !== 0 ? !0 : ((n = n.dependencies), !!(n !== null && Vl(n)));
		}
		function pw(n, r, a) {
			switch (r.tag) {
				case 3:
					(qe(r, r.stateNode.containerInfo), Pi(r, Gt, n.memoizedState.cache), Aa());
					break;
				case 27:
				case 5:
					st(r);
					break;
				case 4:
					qe(r, r.stateNode.containerInfo);
					break;
				case 10:
					Pi(r, r.type, r.memoizedProps.value);
					break;
				case 31:
					if (r.memoizedState !== null) return ((r.flags |= 128), Rf(r), null);
					break;
				case 13:
					var s = r.memoizedState;
					if (s !== null)
						return s.dehydrated !== null
							? (Ki(r), (r.flags |= 128), null)
							: (a & r.child.childLanes) !== 0
								? Og(n, r, a)
								: (Ki(r), (n = ci(n, r, a)), n !== null ? n.sibling : null);
					Ki(r);
					break;
				case 19:
					var c = (n.flags & 128) !== 0;
					if (((s = (a & r.childLanes) !== 0), s || (hu(n, r, a, !1), (s = (a & r.childLanes) !== 0)), c)) {
						if (s) return Dg(n, r, a);
						r.flags |= 128;
					}
					if (
						((c = r.memoizedState),
						c !== null && ((c.rendering = null), (c.tail = null), (c.lastEffect = null)),
						se(Vt, Vt.current),
						s)
					)
						break;
					return null;
				case 22:
					return ((r.lanes = 0), Ag(n, r, a, r.pendingProps));
				case 24:
					Pi(r, Gt, n.memoizedState.cache);
			}
			return ci(n, r, a);
		}
		function jg(n, r, a) {
			if (n !== null)
				if (n.memoizedProps !== r.pendingProps) Jt = !0;
				else {
					if (!nd(n, a) && (r.flags & 128) === 0) return ((Jt = !1), pw(n, r, a));
					Jt = (n.flags & 131072) !== 0;
				}
			else ((Jt = !1), Fe && (r.flags & 1048576) !== 0 && gv(r, gs, r.index));
			switch (((r.lanes = 0), r.tag)) {
				case 16:
					e: {
						var s = r.pendingProps;
						if (((n = Ma(r.elementType)), (r.type = n), typeof n == "function"))
							sf(n)
								? ((s = qa(n, s)), (r.tag = 1), (r = Mg(null, r, n, s, a)))
								: ((r.tag = 0), (r = Ff(null, r, n, s, a)));
						else {
							if (n != null) {
								var c = n.$$typeof;
								if (c === q) {
									((r.tag = 11), (r = Eg(null, r, n, s, a)));
									break e;
								} else if (c === k) {
									((r.tag = 14), (r = Tg(null, r, n, s, a)));
									break e;
								}
							}
							throw ((r = ne(n) || n), Error(l(306, r, "")));
						}
					}
					return r;
				case 0:
					return Ff(n, r, r.type, r.pendingProps, a);
				case 1:
					return ((s = r.type), (c = qa(s, r.pendingProps)), Mg(n, r, s, c, a));
				case 3:
					e: {
						if ((qe(r, r.stateNode.containerInfo), n === null)) throw Error(l(387));
						s = r.pendingProps;
						var d = r.memoizedState;
						((c = d.element), wf(n, r), Ts(r, s, null, a));
						var y = r.memoizedState;
						if (
							((s = y.cache), Pi(r, Gt, s), s !== d.cache && gf(r, [Gt], a, !0), Es(), (s = y.element), d.isDehydrated)
						)
							if (
								((d = { element: s, isDehydrated: !1, cache: y.cache }),
								(r.updateQueue.baseState = d),
								(r.memoizedState = d),
								r.flags & 256)
							) {
								r = Ng(n, r, s, a);
								break e;
							} else if (s !== c) {
								((c = hr(Error(l(424)), r)), ys(c), (r = Ng(n, r, s, a)));
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
									Tt = br(n.firstChild), _n = r, Fe = !0, Zi = null, gr = !0, a = kv(r, null, s, a), r.child = a;
									a;
								)
									((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
							}
						else {
							if ((Aa(), s === c)) {
								r = ci(n, r, a);
								break e;
							}
							wn(n, r, s, a);
						}
						r = r.child;
					}
					return r;
				case 26:
					return (
						so(n, r),
						n === null
							? (a = Ky(r.type, null, r.pendingProps, null))
								? (r.memoizedState = a)
								: Fe ||
									((a = r.type),
									(n = r.pendingProps),
									(s = xo(we.current).createElement(a)),
									(s[dt] = r),
									(s[Yt] = n),
									En(s, a, n),
									Ue(s),
									(r.stateNode = s))
							: (r.memoizedState = Ky(r.type, n.memoizedProps, r.pendingProps, n.memoizedState)),
						null
					);
				case 27:
					return (
						st(r),
						n === null &&
							Fe &&
							((s = r.stateNode = Hy(r.type, r.pendingProps, we.current)),
							(_n = r),
							(gr = !0),
							(c = Tt),
							na(r.type) ? ((Dd = c), (Tt = br(s.firstChild))) : (Tt = c)),
						wn(n, r, r.pendingProps.children, a),
						so(n, r),
						n === null && (r.flags |= 4194304),
						r.child
					);
				case 5:
					return (
						n === null &&
							Fe &&
							((c = s = Tt) &&
								((s = Qw(s, r.type, r.pendingProps, gr)),
								s !== null ? ((r.stateNode = s), (_n = r), (Tt = br(s.firstChild)), (gr = !1), (c = !0)) : (c = !1)),
							c || Hi(r)),
						st(r),
						(c = r.type),
						(d = r.pendingProps),
						(y = n !== null ? n.memoizedProps : null),
						(s = d.children),
						kd(c, d) ? (s = null) : y !== null && kd(c, y) && (r.flags |= 32),
						r.memoizedState !== null && ((c = kf(n, r, uw, null, null, a)), (Hs._currentValue = c)),
						so(n, r),
						wn(n, r, s, a),
						r.child
					);
				case 6:
					return (
						n === null &&
							Fe &&
							((n = a = Tt) &&
								((a = Kw(a, r.pendingProps, gr)),
								a !== null ? ((r.stateNode = a), (_n = r), (Tt = null), (n = !0)) : (n = !1)),
							n || Hi(r)),
						null
					);
				case 13:
					return Og(n, r, a);
				case 4:
					return (
						qe(r, r.stateNode.containerInfo),
						(s = r.pendingProps),
						n === null ? (r.child = Oa(r, null, s, a)) : wn(n, r, s, a),
						r.child
					);
				case 11:
					return Eg(n, r, r.type, r.pendingProps, a);
				case 7:
					return (wn(n, r, r.pendingProps, a), r.child);
				case 8:
					return (wn(n, r, r.pendingProps.children, a), r.child);
				case 12:
					return (wn(n, r, r.pendingProps.children, a), r.child);
				case 10:
					return ((s = r.pendingProps), Pi(r, r.type, s.value), wn(n, r, s.children, a), r.child);
				case 9:
					return (
						(c = r.type._context),
						(s = r.pendingProps.children),
						Ca(r),
						(c = Sn(c)),
						(s = s(c)),
						(r.flags |= 1),
						wn(n, r, s, a),
						r.child
					);
				case 14:
					return Tg(n, r, r.type, r.pendingProps, a);
				case 15:
					return xg(n, r, r.type, r.pendingProps, a);
				case 19:
					return Dg(n, r, a);
				case 31:
					return yw(n, r, a);
				case 22:
					return Ag(n, r, a, r.pendingProps);
				case 24:
					return (
						Ca(r),
						(s = Sn(Gt)),
						n === null
							? ((c = bf()),
								c === null &&
									((c = pt),
									(d = yf()),
									(c.pooledCache = d),
									d.refCount++,
									d !== null && (c.pooledCacheLanes |= a),
									(c = d)),
								(r.memoizedState = { parent: s, cache: c }),
								Sf(r),
								Pi(r, Gt, c))
							: ((n.lanes & a) !== 0 && (wf(n, r), Ts(r, null, null, a), Es()),
								(c = n.memoizedState),
								(d = r.memoizedState),
								c.parent !== s
									? ((c = { parent: s, cache: s }),
										(r.memoizedState = c),
										r.lanes === 0 && (r.memoizedState = r.updateQueue.baseState = c),
										Pi(r, Gt, s))
									: ((s = d.cache), Pi(r, Gt, s), s !== c.cache && gf(r, [Gt], a, !0))),
						wn(n, r, r.pendingProps.children, a),
						r.child
					);
				case 29:
					throw r.pendingProps;
			}
			throw Error(l(156, r.tag));
		}
		function fi(n) {
			n.flags |= 4;
		}
		function rd(n, r, a, s, c) {
			if (((r = (n.mode & 32) !== 0) && (r = !1), r)) {
				if (((n.flags |= 16777216), (c & 335544128) === c))
					if (n.stateNode.complete) n.flags |= 8192;
					else if (ly()) n.flags |= 8192;
					else throw ((Na = Ql), _f);
			} else n.flags &= -16777217;
		}
		function qg(n, r) {
			if (r.type !== "stylesheet" || (r.state.loading & 4) !== 0) n.flags &= -16777217;
			else if (((n.flags |= 16777216), !Jy(r)))
				if (ly()) n.flags |= 8192;
				else throw ((Na = Ql), _f);
		}
		function oo(n, r) {
			(r !== null && (n.flags |= 4),
				n.flags & 16384 && ((r = n.tag !== 22 ? fn() : 536870912), (n.lanes |= r), (xu |= r)));
		}
		function Ms(n, r) {
			if (!Fe)
				switch (n.tailMode) {
					case "hidden":
						r = n.tail;
						for (var a = null; r !== null; ) (r.alternate !== null && (a = r), (r = r.sibling));
						a === null ? (n.tail = null) : (a.sibling = null);
						break;
					case "collapsed":
						a = n.tail;
						for (var s = null; a !== null; ) (a.alternate !== null && (s = a), (a = a.sibling));
						s === null ? (r || n.tail === null ? (n.tail = null) : (n.tail.sibling = null)) : (s.sibling = null);
				}
		}
		function xt(n) {
			var r = n.alternate !== null && n.alternate.child === n.child,
				a = 0,
				s = 0;
			if (r)
				for (var c = n.child; c !== null; )
					((a |= c.lanes | c.childLanes),
						(s |= c.subtreeFlags & 65011712),
						(s |= c.flags & 65011712),
						(c.return = n),
						(c = c.sibling));
			else
				for (c = n.child; c !== null; )
					((a |= c.lanes | c.childLanes), (s |= c.subtreeFlags), (s |= c.flags), (c.return = n), (c = c.sibling));
			return ((n.subtreeFlags |= s), (n.childLanes = a), r);
		}
		function bw(n, r, a) {
			var s = r.pendingProps;
			switch ((ff(r), r.tag)) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14:
					return (xt(r), null);
				case 1:
					return (xt(r), null);
				case 3:
					return (
						(a = r.stateNode),
						(s = null),
						n !== null && (s = n.memoizedState.cache),
						r.memoizedState.cache !== s && (r.flags |= 2048),
						si(Gt),
						Ie(),
						a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
						(n === null || n.child === null) &&
							(du(r)
								? fi(r)
								: n === null || (n.memoizedState.isDehydrated && (r.flags & 256) === 0) || ((r.flags |= 1024), hf())),
						xt(r),
						null
					);
				case 26:
					var c = r.type,
						d = r.memoizedState;
					return (
						n === null
							? (fi(r), d !== null ? (xt(r), qg(r, d)) : (xt(r), rd(r, c, null, s, a)))
							: d
								? d !== n.memoizedState
									? (fi(r), xt(r), qg(r, d))
									: (xt(r), (r.flags &= -16777217))
								: ((n = n.memoizedProps), n !== s && fi(r), xt(r), rd(r, c, n, s, a)),
						null
					);
				case 27:
					if ((Bt(r), (a = we.current), (c = r.type), n !== null && r.stateNode != null))
						n.memoizedProps !== s && fi(r);
					else {
						if (!s) {
							if (r.stateNode === null) throw Error(l(166));
							return (xt(r), null);
						}
						((n = ce.current), du(r) ? pv(r, n) : ((n = Hy(c, s, a)), (r.stateNode = n), fi(r)));
					}
					return (xt(r), null);
				case 5:
					if ((Bt(r), (c = r.type), n !== null && r.stateNode != null)) n.memoizedProps !== s && fi(r);
					else {
						if (!s) {
							if (r.stateNode === null) throw Error(l(166));
							return (xt(r), null);
						}
						if (((d = ce.current), du(r))) pv(r, d);
						else {
							var y = xo(we.current);
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
												typeof s.is == "string" ? y.createElement("select", { is: s.is }) : y.createElement("select")),
												s.multiple ? (d.multiple = !0) : s.size && (d.size = s.size));
											break;
										default:
											d = typeof s.is == "string" ? y.createElement(c, { is: s.is }) : y.createElement(c);
									}
							}
							((d[dt] = r), (d[Yt] = s));
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
							e: switch ((En(d, c, s), c)) {
								case "button":
								case "input":
								case "select":
								case "textarea":
									s = !!s.autoFocus;
									break e;
								case "img":
									s = !0;
									break e;
								default:
									s = !1;
							}
							s && fi(r);
						}
					}
					return (xt(r), rd(r, r.type, n === null ? null : n.memoizedProps, r.pendingProps, a), null);
				case 6:
					if (n && r.stateNode != null) n.memoizedProps !== s && fi(r);
					else {
						if (typeof s != "string" && r.stateNode === null) throw Error(l(166));
						if (((n = we.current), du(r))) {
							if (((n = r.stateNode), (a = r.memoizedProps), (s = null), (c = _n), c !== null))
								switch (c.tag) {
									case 27:
									case 5:
										s = c.memoizedProps;
								}
							((n[dt] = r),
								(n = !!(n.nodeValue === a || (s !== null && s.suppressHydrationWarning === !0) || zy(n.nodeValue, a))),
								n || Hi(r, !0));
						} else ((n = xo(n).createTextNode(s)), (n[dt] = r), (r.stateNode = n));
					}
					return (xt(r), null);
				case 31:
					if (((a = r.memoizedState), n === null || n.memoizedState !== null)) {
						if (((s = du(r)), a !== null)) {
							if (n === null) {
								if (!s) throw Error(l(318));
								if (((n = r.memoizedState), (n = n !== null ? n.dehydrated : null), !n)) throw Error(l(557));
								n[dt] = r;
							} else (Aa(), (r.flags & 128) === 0 && (r.memoizedState = null), (r.flags |= 4));
							(xt(r), (n = !1));
						} else
							((a = hf()), n !== null && n.memoizedState !== null && (n.memoizedState.hydrationErrors = a), (n = !0));
						if (!n) return r.flags & 256 ? (ar(r), r) : (ar(r), null);
						if ((r.flags & 128) !== 0) throw Error(l(558));
					}
					return (xt(r), null);
				case 13:
					if (
						((s = r.memoizedState), n === null || (n.memoizedState !== null && n.memoizedState.dehydrated !== null))
					) {
						if (((c = du(r)), s !== null && s.dehydrated !== null)) {
							if (n === null) {
								if (!c) throw Error(l(318));
								if (((c = r.memoizedState), (c = c !== null ? c.dehydrated : null), !c)) throw Error(l(317));
								c[dt] = r;
							} else (Aa(), (r.flags & 128) === 0 && (r.memoizedState = null), (r.flags |= 4));
							(xt(r), (c = !1));
						} else
							((c = hf()), n !== null && n.memoizedState !== null && (n.memoizedState.hydrationErrors = c), (c = !0));
						if (!c) return r.flags & 256 ? (ar(r), r) : (ar(r), null);
					}
					return (
						ar(r),
						(r.flags & 128) !== 0
							? ((r.lanes = a), r)
							: ((a = s !== null),
								(n = n !== null && n.memoizedState !== null),
								a &&
									((s = r.child),
									(c = null),
									s.alternate !== null &&
										s.alternate.memoizedState !== null &&
										s.alternate.memoizedState.cachePool !== null &&
										(c = s.alternate.memoizedState.cachePool.pool),
									(d = null),
									s.memoizedState !== null &&
										s.memoizedState.cachePool !== null &&
										(d = s.memoizedState.cachePool.pool),
									d !== c && (s.flags |= 2048)),
								a !== n && a && (r.child.flags |= 8192),
								oo(r, r.updateQueue),
								xt(r),
								null)
					);
				case 4:
					return (Ie(), n === null && ky(r.stateNode.containerInfo), xt(r), null);
				case 10:
					return (si(r.type), xt(r), null);
				case 19:
					if ((L(Vt), (s = r.memoizedState), s === null)) return (xt(r), null);
					if (((c = (r.flags & 128) !== 0), (d = s.rendering), d === null))
						if (c) Ms(s, !1);
						else {
							if ($t !== 0 || (n !== null && (n.flags & 128) !== 0))
								for (n = r.child; n !== null; ) {
									if (((d = Gl(n)), d !== null)) {
										for (
											r.flags |= 128,
												Ms(s, !1),
												n = d.updateQueue,
												r.updateQueue = n,
												oo(r, n),
												r.subtreeFlags = 0,
												n = a,
												a = r.child;
											a !== null;
										)
											(hv(a, n), (a = a.sibling));
										return (se(Vt, (Vt.current & 1) | 2), Fe && ai(r, s.treeForkCount), r.child);
									}
									n = n.sibling;
								}
							s.tail !== null && Ne() > vo && ((r.flags |= 128), (c = !0), Ms(s, !1), (r.lanes = 4194304));
						}
					else {
						if (!c)
							if (((n = Gl(d)), n !== null)) {
								if (
									((r.flags |= 128),
									(c = !0),
									(n = n.updateQueue),
									(r.updateQueue = n),
									oo(r, n),
									Ms(s, !0),
									s.tail === null && s.tailMode === "hidden" && !d.alternate && !Fe)
								)
									return (xt(r), null);
							} else
								2 * Ne() - s.renderingStartTime > vo &&
									a !== 536870912 &&
									((r.flags |= 128), (c = !0), Ms(s, !1), (r.lanes = 4194304));
						s.isBackwards
							? ((d.sibling = r.child), (r.child = d))
							: ((n = s.last), n !== null ? (n.sibling = d) : (r.child = d), (s.last = d));
					}
					return s.tail !== null
						? ((n = s.tail),
							(s.rendering = n),
							(s.tail = n.sibling),
							(s.renderingStartTime = Ne()),
							(n.sibling = null),
							(a = Vt.current),
							se(Vt, c ? (a & 1) | 2 : a & 1),
							Fe && ai(r, s.treeForkCount),
							n)
						: (xt(r), null);
				case 22:
				case 23:
					return (
						ar(r),
						Af(),
						(s = r.memoizedState !== null),
						n !== null ? (n.memoizedState !== null) !== s && (r.flags |= 8192) : s && (r.flags |= 8192),
						s
							? (a & 536870912) !== 0 && (r.flags & 128) === 0 && (xt(r), r.subtreeFlags & 6 && (r.flags |= 8192))
							: xt(r),
						(a = r.updateQueue),
						a !== null && oo(r, a.retryQueue),
						(a = null),
						n !== null &&
							n.memoizedState !== null &&
							n.memoizedState.cachePool !== null &&
							(a = n.memoizedState.cachePool.pool),
						(s = null),
						r.memoizedState !== null && r.memoizedState.cachePool !== null && (s = r.memoizedState.cachePool.pool),
						s !== a && (r.flags |= 2048),
						n !== null && L(ka),
						null
					);
				case 24:
					return (
						(a = null),
						n !== null && (a = n.memoizedState.cache),
						r.memoizedState.cache !== a && (r.flags |= 2048),
						si(Gt),
						xt(r),
						null
					);
				case 25:
					return null;
				case 30:
					return null;
			}
			throw Error(l(156, r.tag));
		}
		function _w(n, r) {
			switch ((ff(r), r.tag)) {
				case 1:
					return ((n = r.flags), n & 65536 ? ((r.flags = (n & -65537) | 128), r) : null);
				case 3:
					return (
						si(Gt),
						Ie(),
						(n = r.flags),
						(n & 65536) !== 0 && (n & 128) === 0 ? ((r.flags = (n & -65537) | 128), r) : null
					);
				case 26:
				case 27:
				case 5:
					return (Bt(r), null);
				case 31:
					if (r.memoizedState !== null) {
						if ((ar(r), r.alternate === null)) throw Error(l(340));
						Aa();
					}
					return ((n = r.flags), n & 65536 ? ((r.flags = (n & -65537) | 128), r) : null);
				case 13:
					if ((ar(r), (n = r.memoizedState), n !== null && n.dehydrated !== null)) {
						if (r.alternate === null) throw Error(l(340));
						Aa();
					}
					return ((n = r.flags), n & 65536 ? ((r.flags = (n & -65537) | 128), r) : null);
				case 19:
					return (L(Vt), null);
				case 4:
					return (Ie(), null);
				case 10:
					return (si(r.type), null);
				case 22:
				case 23:
					return (
						ar(r),
						Af(),
						n !== null && L(ka),
						(n = r.flags),
						n & 65536 ? ((r.flags = (n & -65537) | 128), r) : null
					);
				case 24:
					return (si(Gt), null);
				case 25:
					return null;
				default:
					return null;
			}
		}
		function Ig(n, r) {
			switch ((ff(r), r.tag)) {
				case 3:
					(si(Gt), Ie());
					break;
				case 26:
				case 27:
				case 5:
					Bt(r);
					break;
				case 4:
					Ie();
					break;
				case 31:
					r.memoizedState !== null && ar(r);
					break;
				case 13:
					ar(r);
					break;
				case 19:
					L(Vt);
					break;
				case 10:
					si(r.type);
					break;
				case 22:
				case 23:
					(ar(r), Af(), n !== null && L(ka));
					break;
				case 24:
					si(Gt);
			}
		}
		function Ns(n, r) {
			try {
				var a = r.updateQueue,
					s = a !== null ? a.lastEffect : null;
				if (s !== null) {
					var c = s.next;
					a = c;
					do {
						if ((a.tag & n) === n) {
							s = void 0;
							var d = a.create,
								y = a.inst;
							((s = d()), (y.destroy = s));
						}
						a = a.next;
					} while (a !== c);
				}
			} catch (T) {
				ot(r, r.return, T);
			}
		}
		function Fi(n, r, a) {
			try {
				var s = r.updateQueue,
					c = s !== null ? s.lastEffect : null;
				if (c !== null) {
					var d = c.next;
					s = d;
					do {
						if ((s.tag & n) === n) {
							var y = s.inst,
								T = y.destroy;
							if (T !== void 0) {
								((y.destroy = void 0), (c = r));
								var D = a,
									F = T;
								try {
									F();
								} catch (re) {
									ot(c, D, re);
								}
							}
						}
						s = s.next;
					} while (s !== d);
				}
			} catch (re) {
				ot(r, r.return, re);
			}
		}
		function Lg(n) {
			var r = n.updateQueue;
			if (r !== null) {
				var a = n.stateNode;
				try {
					Nv(r, a);
				} catch (s) {
					ot(n, n.return, s);
				}
			}
		}
		function Ug(n, r, a) {
			((a.props = qa(n.type, n.memoizedProps)), (a.state = n.memoizedState));
			try {
				a.componentWillUnmount();
			} catch (s) {
				ot(n, r, s);
			}
		}
		function Os(n, r) {
			try {
				var a = n.ref;
				if (a !== null) {
					switch (n.tag) {
						case 26:
						case 27:
						case 5:
							var s = n.stateNode;
							break;
						case 30:
							s = n.stateNode;
							break;
						default:
							s = n.stateNode;
					}
					typeof a == "function" ? (n.refCleanup = a(s)) : (a.current = s);
				}
			} catch (c) {
				ot(n, r, c);
			}
		}
		function Hr(n, r) {
			var a = n.ref,
				s = n.refCleanup;
			if (a !== null)
				if (typeof s == "function")
					try {
						s();
					} catch (c) {
						ot(n, r, c);
					} finally {
						((n.refCleanup = null), (n = n.alternate), n != null && (n.refCleanup = null));
					}
				else if (typeof a == "function")
					try {
						a(null);
					} catch (c) {
						ot(n, r, c);
					}
				else a.current = null;
		}
		function $g(n) {
			var r = n.type,
				a = n.memoizedProps,
				s = n.stateNode;
			try {
				e: switch (r) {
					case "button":
					case "input":
					case "select":
					case "textarea":
						a.autoFocus && s.focus();
						break e;
					case "img":
						a.src ? (s.src = a.src) : a.srcSet && (s.srcset = a.srcSet);
				}
			} catch (c) {
				ot(n, n.return, c);
			}
		}
		function id(n, r, a) {
			try {
				var s = n.stateNode;
				($w(s, n.type, a, r), (s[Yt] = r));
			} catch (c) {
				ot(n, n.return, c);
			}
		}
		function Bg(n) {
			return n.tag === 5 || n.tag === 3 || n.tag === 26 || (n.tag === 27 && na(n.type)) || n.tag === 4;
		}
		function ad(n) {
			e: for (;;) {
				for (; n.sibling === null; ) {
					if (n.return === null || Bg(n.return)) return null;
					n = n.return;
				}
				for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
					if ((n.tag === 27 && na(n.type)) || n.flags & 2 || n.child === null || n.tag === 4) continue e;
					((n.child.return = n), (n = n.child));
				}
				if (!(n.flags & 2)) return n.stateNode;
			}
		}
		function ud(n, r, a) {
			var s = n.tag;
			if (s === 5 || s === 6)
				((n = n.stateNode),
					r
						? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(n, r)
						: ((r = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a),
							r.appendChild(n),
							(a = a._reactRootContainer),
							a != null || r.onclick !== null || (r.onclick = fr)));
			else if (s !== 4 && (s === 27 && na(n.type) && ((a = n.stateNode), (r = null)), (n = n.child), n !== null))
				for (ud(n, r, a), n = n.sibling; n !== null; ) (ud(n, r, a), (n = n.sibling));
		}
		function co(n, r, a) {
			var s = n.tag;
			if (s === 5 || s === 6) ((n = n.stateNode), r ? a.insertBefore(n, r) : a.appendChild(n));
			else if (s !== 4 && (s === 27 && na(n.type) && (a = n.stateNode), (n = n.child), n !== null))
				for (co(n, r, a), n = n.sibling; n !== null; ) (co(n, r, a), (n = n.sibling));
		}
		function Vg(n) {
			var r = n.stateNode,
				a = n.memoizedProps;
			try {
				for (var s = n.type, c = r.attributes; c.length; ) r.removeAttributeNode(c[0]);
				(En(r, s, a), (r[dt] = n), (r[Yt] = a));
			} catch (d) {
				ot(n, n.return, d);
			}
		}
		var di = !1,
			Wt = !1,
			sd = !1,
			Zg = typeof WeakSet == "function" ? WeakSet : Set,
			mn = null;
		function Sw(n, r) {
			if (((n = n.containerInfo), (Rd = Oo), (n = iv(n)), Wc(n))) {
				if ("selectionStart" in n) var a = { start: n.selectionStart, end: n.selectionEnd };
				else
					e: {
						a = ((a = n.ownerDocument) && a.defaultView) || window;
						var s = a.getSelection && a.getSelection();
						if (s && s.rangeCount !== 0) {
							a = s.anchorNode;
							var c = s.anchorOffset,
								d = s.focusNode;
							s = s.focusOffset;
							try {
								(a.nodeType, d.nodeType);
							} catch {
								a = null;
								break e;
							}
							var y = 0,
								T = -1,
								D = -1,
								F = 0,
								re = 0,
								ue = n,
								X = null;
							t: for (;;) {
								for (
									var ee;
									ue !== a || (c !== 0 && ue.nodeType !== 3) || (T = y + c),
										ue !== d || (s !== 0 && ue.nodeType !== 3) || (D = y + s),
										ue.nodeType === 3 && (y += ue.nodeValue.length),
										(ee = ue.firstChild) !== null;
								)
									((X = ue), (ue = ee));
								for (;;) {
									if (ue === n) break t;
									if (
										(X === a && ++F === c && (T = y), X === d && ++re === s && (D = y), (ee = ue.nextSibling) !== null)
									)
										break;
									((ue = X), (X = ue.parentNode));
								}
								ue = ee;
							}
							a = T === -1 || D === -1 ? null : { start: T, end: D };
						} else a = null;
					}
				a = a || { start: 0, end: 0 };
			} else a = null;
			for (Cd = { focusedElem: n, selectionRange: a }, Oo = !1, mn = r; mn !== null; )
				if (((r = mn), (n = r.child), (r.subtreeFlags & 1028) !== 0 && n !== null)) ((n.return = r), (mn = n));
				else
					for (; mn !== null; ) {
						switch (((r = mn), (d = r.alternate), (n = r.flags), r.tag)) {
							case 0:
								if ((n & 4) !== 0 && ((n = r.updateQueue), (n = n !== null ? n.events : null), n !== null))
									for (a = 0; a < n.length; a++) ((c = n[a]), (c.ref.impl = c.nextImpl));
								break;
							case 11:
							case 15:
								break;
							case 1:
								if ((n & 1024) !== 0 && d !== null) {
									((n = void 0), (a = r), (c = d.memoizedProps), (d = d.memoizedState), (s = a.stateNode));
									try {
										var Se = qa(a.type, c);
										((n = s.getSnapshotBeforeUpdate(Se, d)), (s.__reactInternalSnapshotBeforeUpdate = n));
									} catch (Ce) {
										ot(a, a.return, Ce);
									}
								}
								break;
							case 3:
								if ((n & 1024) !== 0) {
									if (((n = r.stateNode.containerInfo), (a = n.nodeType), a === 9)) Nd(n);
									else if (a === 1)
										switch (n.nodeName) {
											case "HEAD":
											case "HTML":
											case "BODY":
												Nd(n);
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
								if ((n & 1024) !== 0) throw Error(l(163));
						}
						if (((n = r.sibling), n !== null)) {
							((n.return = r.return), (mn = n));
							break;
						}
						mn = r.return;
					}
		}
		function Hg(n, r, a) {
			var s = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					(mi(n, a), s & 4 && Ns(5, a));
					break;
				case 1:
					if ((mi(n, a), s & 4))
						if (((n = a.stateNode), r === null))
							try {
								n.componentDidMount();
							} catch (y) {
								ot(a, a.return, y);
							}
						else {
							var c = qa(a.type, r.memoizedProps);
							r = r.memoizedState;
							try {
								n.componentDidUpdate(c, r, n.__reactInternalSnapshotBeforeUpdate);
							} catch (y) {
								ot(a, a.return, y);
							}
						}
					(s & 64 && Lg(a), s & 512 && Os(a, a.return));
					break;
				case 3:
					if ((mi(n, a), s & 64 && ((n = a.updateQueue), n !== null))) {
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
							Nv(n, r);
						} catch (y) {
							ot(a, a.return, y);
						}
					}
					break;
				case 27:
					r === null && s & 4 && Vg(a);
				case 26:
				case 5:
					(mi(n, a), r === null && s & 4 && $g(a), s & 512 && Os(a, a.return));
					break;
				case 12:
					mi(n, a);
					break;
				case 31:
					(mi(n, a), s & 4 && Kg(n, a));
					break;
				case 13:
					(mi(n, a),
						s & 4 && Yg(n, a),
						s & 64 &&
							((n = a.memoizedState),
							n !== null && ((n = n.dehydrated), n !== null && ((a = Mw.bind(null, a)), Yw(n, a)))));
					break;
				case 22:
					if (((s = a.memoizedState !== null || di), !s)) {
						((r = (r !== null && r.memoizedState !== null) || Wt), (c = di));
						var d = Wt;
						((di = s), (Wt = r) && !d ? vi(n, a, (a.subtreeFlags & 8772) !== 0) : mi(n, a), (di = c), (Wt = d));
					}
					break;
				case 30:
					break;
				default:
					mi(n, a);
			}
		}
		function Pg(n) {
			var r = n.alternate;
			(r !== null && ((n.alternate = null), Pg(r)),
				(n.child = null),
				(n.deletions = null),
				(n.sibling = null),
				n.tag === 5 && ((r = n.stateNode), r !== null && Lr(r)),
				(n.stateNode = null),
				(n.return = null),
				(n.dependencies = null),
				(n.memoizedProps = null),
				(n.memoizedState = null),
				(n.pendingProps = null),
				(n.stateNode = null),
				(n.updateQueue = null));
		}
		var Rt = null,
			Vn = !1;
		function hi(n, r, a) {
			for (a = a.child; a !== null; ) (Qg(n, r, a), (a = a.sibling));
		}
		function Qg(n, r, a) {
			if (Ve && typeof Ve.onCommitFiberUnmount == "function")
				try {
					Ve.onCommitFiberUnmount(Rn, a);
				} catch {}
			switch (a.tag) {
				case 26:
					(Wt || Hr(a, r),
						hi(n, r, a),
						a.memoizedState
							? a.memoizedState.count--
							: a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
					break;
				case 27:
					Wt || Hr(a, r);
					var s = Rt,
						c = Vn;
					(na(a.type) && ((Rt = a.stateNode), (Vn = !1)), hi(n, r, a), Bs(a.stateNode), (Rt = s), (Vn = c));
					break;
				case 5:
					Wt || Hr(a, r);
				case 6:
					if (((s = Rt), (c = Vn), (Rt = null), hi(n, r, a), (Rt = s), (Vn = c), Rt !== null))
						if (Vn)
							try {
								(Rt.nodeType === 9 ? Rt.body : Rt.nodeName === "HTML" ? Rt.ownerDocument.body : Rt).removeChild(
									a.stateNode,
								);
							} catch (d) {
								ot(a, r, d);
							}
						else
							try {
								Rt.removeChild(a.stateNode);
							} catch (d) {
								ot(a, r, d);
							}
					break;
				case 18:
					Rt !== null &&
						(Vn
							? ((n = Rt),
								Uy(n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, a.stateNode),
								zu(n))
							: Uy(Rt, a.stateNode));
					break;
				case 4:
					((s = Rt), (c = Vn), (Rt = a.stateNode.containerInfo), (Vn = !0), hi(n, r, a), (Rt = s), (Vn = c));
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					(Fi(2, a, r), Wt || Fi(4, a, r), hi(n, r, a));
					break;
				case 1:
					(Wt || (Hr(a, r), (s = a.stateNode), typeof s.componentWillUnmount == "function" && Ug(a, r, s)),
						hi(n, r, a));
					break;
				case 21:
					hi(n, r, a);
					break;
				case 22:
					((Wt = (s = Wt) || a.memoizedState !== null), hi(n, r, a), (Wt = s));
					break;
				default:
					hi(n, r, a);
			}
		}
		function Kg(n, r) {
			if (r.memoizedState === null && ((n = r.alternate), n !== null && ((n = n.memoizedState), n !== null))) {
				n = n.dehydrated;
				try {
					zu(n);
				} catch (a) {
					ot(r, r.return, a);
				}
			}
		}
		function Yg(n, r) {
			if (
				r.memoizedState === null &&
				((n = r.alternate), n !== null && ((n = n.memoizedState), n !== null && ((n = n.dehydrated), n !== null)))
			)
				try {
					zu(n);
				} catch (a) {
					ot(r, r.return, a);
				}
		}
		function ww(n) {
			switch (n.tag) {
				case 31:
				case 13:
				case 19:
					var r = n.stateNode;
					return (r === null && (r = n.stateNode = new Zg()), r);
				case 22:
					return ((n = n.stateNode), (r = n._retryCache), r === null && (r = n._retryCache = new Zg()), r);
				default:
					throw Error(l(435, n.tag));
			}
		}
		function fo(n, r) {
			var a = ww(n);
			r.forEach(function (s) {
				if (!a.has(s)) {
					a.add(s);
					var c = Nw.bind(null, n, s);
					s.then(c, c);
				}
			});
		}
		function Zn(n, r) {
			var a = r.deletions;
			if (a !== null)
				for (var s = 0; s < a.length; s++) {
					var c = a[s],
						d = n,
						y = r,
						T = y;
					e: for (; T !== null; ) {
						switch (T.tag) {
							case 27:
								if (na(T.type)) {
									((Rt = T.stateNode), (Vn = !1));
									break e;
								}
								break;
							case 5:
								((Rt = T.stateNode), (Vn = !1));
								break e;
							case 3:
							case 4:
								((Rt = T.stateNode.containerInfo), (Vn = !0));
								break e;
						}
						T = T.return;
					}
					if (Rt === null) throw Error(l(160));
					(Qg(d, y, c), (Rt = null), (Vn = !1), (d = c.alternate), d !== null && (d.return = null), (c.return = null));
				}
			if (r.subtreeFlags & 13886) for (r = r.child; r !== null; ) (Fg(r, n), (r = r.sibling));
		}
		var Nr = null;
		function Fg(n, r) {
			var a = n.alternate,
				s = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					(Zn(r, n), Hn(n), s & 4 && (Fi(3, n, n.return), Ns(3, n), Fi(5, n, n.return)));
					break;
				case 1:
					(Zn(r, n),
						Hn(n),
						s & 512 && (Wt || a === null || Hr(a, a.return)),
						s & 64 &&
							di &&
							((n = n.updateQueue),
							n !== null &&
								((s = n.callbacks),
								s !== null &&
									((a = n.shared.hiddenCallbacks), (n.shared.hiddenCallbacks = a === null ? s : a.concat(s))))));
					break;
				case 26:
					var c = Nr;
					if ((Zn(r, n), Hn(n), s & 512 && (Wt || a === null || Hr(a, a.return)), s & 4)) {
						var d = a !== null ? a.memoizedState : null;
						if (((s = n.memoizedState), a === null))
							if (s === null)
								if (n.stateNode === null) {
									e: {
										((s = n.type), (a = n.memoizedProps), (c = c.ownerDocument || c));
										t: switch (s) {
											case "title":
												((d = c.getElementsByTagName("title")[0]),
													(!d ||
														d[Wr] ||
														d[dt] ||
														d.namespaceURI === "http://www.w3.org/2000/svg" ||
														d.hasAttribute("itemprop")) &&
														((d = c.createElement(s)), c.head.insertBefore(d, c.querySelector("head > title"))),
													En(d, s, a),
													(d[dt] = n),
													Ue(d),
													(s = d));
												break e;
											case "link":
												var y = Gy("link", "href", c).get(s + (a.href || ""));
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
												((d = c.createElement(s)), En(d, s, a), c.head.appendChild(d));
												break;
											case "meta":
												if ((y = Gy("meta", "content", c).get(s + (a.content || "")))) {
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
												((d = c.createElement(s)), En(d, s, a), c.head.appendChild(d));
												break;
											default:
												throw Error(l(468, s));
										}
										((d[dt] = n), Ue(d), (s = d));
									}
									n.stateNode = s;
								} else Xy(c, n.type, n.stateNode);
							else n.stateNode = Fy(c, s, n.memoizedProps);
						else
							d !== s
								? (d === null ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a)) : d.count--,
									s === null ? Xy(c, n.type, n.stateNode) : Fy(c, s, n.memoizedProps))
								: s === null && n.stateNode !== null && id(n, n.memoizedProps, a.memoizedProps);
					}
					break;
				case 27:
					(Zn(r, n),
						Hn(n),
						s & 512 && (Wt || a === null || Hr(a, a.return)),
						a !== null && s & 4 && id(n, n.memoizedProps, a.memoizedProps));
					break;
				case 5:
					if ((Zn(r, n), Hn(n), s & 512 && (Wt || a === null || Hr(a, a.return)), n.flags & 32)) {
						c = n.stateNode;
						try {
							Bi(c, "");
						} catch (Se) {
							ot(n, n.return, Se);
						}
					}
					(s & 4 && n.stateNode != null && ((c = n.memoizedProps), id(n, c, a !== null ? a.memoizedProps : c)),
						s & 1024 && (sd = !0));
					break;
				case 6:
					if ((Zn(r, n), Hn(n), s & 4)) {
						if (n.stateNode === null) throw Error(l(162));
						((s = n.memoizedProps), (a = n.stateNode));
						try {
							a.nodeValue = s;
						} catch (Se) {
							ot(n, n.return, Se);
						}
					}
					break;
				case 3:
					if (
						((Co = null),
						(c = Nr),
						(Nr = Ao(r.containerInfo)),
						Zn(r, n),
						(Nr = c),
						Hn(n),
						s & 4 && a !== null && a.memoizedState.isDehydrated)
					)
						try {
							zu(r.containerInfo);
						} catch (Se) {
							ot(n, n.return, Se);
						}
					sd && ((sd = !1), Gg(n));
					break;
				case 4:
					((s = Nr), (Nr = Ao(n.stateNode.containerInfo)), Zn(r, n), Hn(n), (Nr = s));
					break;
				case 12:
					(Zn(r, n), Hn(n));
					break;
				case 31:
					(Zn(r, n), Hn(n), s & 4 && ((s = n.updateQueue), s !== null && ((n.updateQueue = null), fo(n, s))));
					break;
				case 13:
					(Zn(r, n),
						Hn(n),
						n.child.flags & 8192 &&
							(n.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
							(mo = Ne()),
						s & 4 && ((s = n.updateQueue), s !== null && ((n.updateQueue = null), fo(n, s))));
					break;
				case 22:
					c = n.memoizedState !== null;
					var D = a !== null && a.memoizedState !== null,
						F = di,
						re = Wt;
					if (((di = F || c), (Wt = re || D), Zn(r, n), (Wt = re), (di = F), Hn(n), s & 8192))
						e: for (
							r = n.stateNode,
								r._visibility = c ? r._visibility & -2 : r._visibility | 1,
								c && (a === null || D || di || Wt || Ia(n)),
								a = null,
								r = n;
							;
						) {
							if (r.tag === 5 || r.tag === 26) {
								if (a === null) {
									D = a = r;
									try {
										if (((d = D.stateNode), c))
											((y = d.style),
												typeof y.setProperty == "function"
													? y.setProperty("display", "none", "important")
													: (y.display = "none"));
										else {
											T = D.stateNode;
											var ue = D.memoizedProps.style,
												X = ue != null && ue.hasOwnProperty("display") ? ue.display : null;
											T.style.display = X == null || typeof X == "boolean" ? "" : ("" + X).trim();
										}
									} catch (Se) {
										ot(D, D.return, Se);
									}
								}
							} else if (r.tag === 6) {
								if (a === null) {
									D = r;
									try {
										D.stateNode.nodeValue = c ? "" : D.memoizedProps;
									} catch (Se) {
										ot(D, D.return, Se);
									}
								}
							} else if (r.tag === 18) {
								if (a === null) {
									D = r;
									try {
										var ee = D.stateNode;
										c ? $y(ee, !0) : $y(D.stateNode, !1);
									} catch (Se) {
										ot(D, D.return, Se);
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
					s & 4 &&
						((s = n.updateQueue), s !== null && ((a = s.retryQueue), a !== null && ((s.retryQueue = null), fo(n, a))));
					break;
				case 19:
					(Zn(r, n), Hn(n), s & 4 && ((s = n.updateQueue), s !== null && ((n.updateQueue = null), fo(n, s))));
					break;
				case 30:
					break;
				case 21:
					break;
				default:
					(Zn(r, n), Hn(n));
			}
		}
		function Hn(n) {
			var r = n.flags;
			if (r & 2) {
				try {
					for (var a, s = n.return; s !== null; ) {
						if (Bg(s)) {
							a = s;
							break;
						}
						s = s.return;
					}
					if (a == null) throw Error(l(160));
					switch (a.tag) {
						case 27:
							var c = a.stateNode;
							co(n, ad(n), c);
							break;
						case 5:
							var d = a.stateNode;
							(a.flags & 32 && (Bi(d, ""), (a.flags &= -33)), co(n, ad(n), d));
							break;
						case 3:
						case 4:
							var y = a.stateNode.containerInfo;
							ud(n, ad(n), y);
							break;
						default:
							throw Error(l(161));
					}
				} catch (T) {
					ot(n, n.return, T);
				}
				n.flags &= -3;
			}
			r & 4096 && (n.flags &= -4097);
		}
		function Gg(n) {
			if (n.subtreeFlags & 1024)
				for (n = n.child; n !== null; ) {
					var r = n;
					(Gg(r), r.tag === 5 && r.flags & 1024 && r.stateNode.reset(), (n = n.sibling));
				}
		}
		function mi(n, r) {
			if (r.subtreeFlags & 8772) for (r = r.child; r !== null; ) (Hg(n, r.alternate, r), (r = r.sibling));
		}
		function Ia(n) {
			for (n = n.child; n !== null; ) {
				var r = n;
				switch (r.tag) {
					case 0:
					case 11:
					case 14:
					case 15:
						(Fi(4, r, r.return), Ia(r));
						break;
					case 1:
						Hr(r, r.return);
						var a = r.stateNode;
						(typeof a.componentWillUnmount == "function" && Ug(r, r.return, a), Ia(r));
						break;
					case 27:
						Bs(r.stateNode);
					case 26:
					case 5:
						(Hr(r, r.return), Ia(r));
						break;
					case 22:
						r.memoizedState === null && Ia(r);
						break;
					case 30:
						Ia(r);
						break;
					default:
						Ia(r);
				}
				n = n.sibling;
			}
		}
		function vi(n, r, a) {
			for (a = a && (r.subtreeFlags & 8772) !== 0, r = r.child; r !== null; ) {
				var s = r.alternate,
					c = n,
					d = r,
					y = d.flags;
				switch (d.tag) {
					case 0:
					case 11:
					case 15:
						(vi(c, d, a), Ns(4, d));
						break;
					case 1:
						if ((vi(c, d, a), (s = d), (c = s.stateNode), typeof c.componentDidMount == "function"))
							try {
								c.componentDidMount();
							} catch (F) {
								ot(s, s.return, F);
							}
						if (((s = d), (c = s.updateQueue), c !== null)) {
							var T = s.stateNode;
							try {
								var D = c.shared.hiddenCallbacks;
								if (D !== null) for (c.shared.hiddenCallbacks = null, c = 0; c < D.length; c++) Mv(D[c], T);
							} catch (F) {
								ot(s, s.return, F);
							}
						}
						(a && y & 64 && Lg(d), Os(d, d.return));
						break;
					case 27:
						Vg(d);
					case 26:
					case 5:
						(vi(c, d, a), a && s === null && y & 4 && $g(d), Os(d, d.return));
						break;
					case 12:
						vi(c, d, a);
						break;
					case 31:
						(vi(c, d, a), a && y & 4 && Kg(c, d));
						break;
					case 13:
						(vi(c, d, a), a && y & 4 && Yg(c, d));
						break;
					case 22:
						(d.memoizedState === null && vi(c, d, a), Os(d, d.return));
						break;
					case 30:
						break;
					default:
						vi(c, d, a);
				}
				r = r.sibling;
			}
		}
		function ld(n, r) {
			var a = null;
			(n !== null &&
				n.memoizedState !== null &&
				n.memoizedState.cachePool !== null &&
				(a = n.memoizedState.cachePool.pool),
				(n = null),
				r.memoizedState !== null && r.memoizedState.cachePool !== null && (n = r.memoizedState.cachePool.pool),
				n !== a && (n != null && n.refCount++, a != null && ps(a)));
		}
		function od(n, r) {
			((n = null),
				r.alternate !== null && (n = r.alternate.memoizedState.cache),
				(r = r.memoizedState.cache),
				r !== n && (r.refCount++, n != null && ps(n)));
		}
		function Or(n, r, a, s) {
			if (r.subtreeFlags & 10256) for (r = r.child; r !== null; ) (Xg(n, r, a, s), (r = r.sibling));
		}
		function Xg(n, r, a, s) {
			var c = r.flags;
			switch (r.tag) {
				case 0:
				case 11:
				case 15:
					(Or(n, r, a, s), c & 2048 && Ns(9, r));
					break;
				case 1:
					Or(n, r, a, s);
					break;
				case 3:
					(Or(n, r, a, s),
						c & 2048 &&
							((n = null),
							r.alternate !== null && (n = r.alternate.memoizedState.cache),
							(r = r.memoizedState.cache),
							r !== n && (r.refCount++, n != null && ps(n))));
					break;
				case 12:
					if (c & 2048) {
						(Or(n, r, a, s), (n = r.stateNode));
						try {
							var d = r.memoizedProps,
								y = d.id,
								T = d.onPostCommit;
							typeof T == "function" && T(y, r.alternate === null ? "mount" : "update", n.passiveEffectDuration, -0);
						} catch (D) {
							ot(r, r.return, D);
						}
					} else Or(n, r, a, s);
					break;
				case 31:
					Or(n, r, a, s);
					break;
				case 13:
					Or(n, r, a, s);
					break;
				case 23:
					break;
				case 22:
					((d = r.stateNode),
						(y = r.alternate),
						r.memoizedState !== null
							? d._visibility & 2
								? Or(n, r, a, s)
								: zs(n, r)
							: d._visibility & 2
								? Or(n, r, a, s)
								: ((d._visibility |= 2), wu(n, r, a, s, (r.subtreeFlags & 10256) !== 0 || !1)),
						c & 2048 && ld(y, r));
					break;
				case 24:
					(Or(n, r, a, s), c & 2048 && od(r.alternate, r));
					break;
				default:
					Or(n, r, a, s);
			}
		}
		function wu(n, r, a, s, c) {
			for (c = c && ((r.subtreeFlags & 10256) !== 0 || !1), r = r.child; r !== null; ) {
				var d = n,
					y = r,
					T = a,
					D = s,
					F = y.flags;
				switch (y.tag) {
					case 0:
					case 11:
					case 15:
						(wu(d, y, T, D, c), Ns(8, y));
						break;
					case 23:
						break;
					case 22:
						var re = y.stateNode;
						(y.memoizedState !== null
							? re._visibility & 2
								? wu(d, y, T, D, c)
								: zs(d, y)
							: ((re._visibility |= 2), wu(d, y, T, D, c)),
							c && F & 2048 && ld(y.alternate, y));
						break;
					case 24:
						(wu(d, y, T, D, c), c && F & 2048 && od(y.alternate, y));
						break;
					default:
						wu(d, y, T, D, c);
				}
				r = r.sibling;
			}
		}
		function zs(n, r) {
			if (r.subtreeFlags & 10256)
				for (r = r.child; r !== null; ) {
					var a = n,
						s = r,
						c = s.flags;
					switch (s.tag) {
						case 22:
							(zs(a, s), c & 2048 && ld(s.alternate, s));
							break;
						case 24:
							(zs(a, s), c & 2048 && od(s.alternate, s));
							break;
						default:
							zs(a, s);
					}
					r = r.sibling;
				}
		}
		var Ds = 8192;
		function Eu(n, r, a) {
			if (n.subtreeFlags & Ds) for (n = n.child; n !== null; ) (Jg(n, r, a), (n = n.sibling));
		}
		function Jg(n, r, a) {
			switch (n.tag) {
				case 26:
					(Eu(n, r, a), n.flags & Ds && n.memoizedState !== null && u1(a, Nr, n.memoizedState, n.memoizedProps));
					break;
				case 5:
					Eu(n, r, a);
					break;
				case 3:
				case 4:
					var s = Nr;
					((Nr = Ao(n.stateNode.containerInfo)), Eu(n, r, a), (Nr = s));
					break;
				case 22:
					n.memoizedState === null &&
						((s = n.alternate),
						s !== null && s.memoizedState !== null ? ((s = Ds), (Ds = 16777216), Eu(n, r, a), (Ds = s)) : Eu(n, r, a));
					break;
				default:
					Eu(n, r, a);
			}
		}
		function Wg(n) {
			var r = n.alternate;
			if (r !== null && ((n = r.child), n !== null)) {
				r.child = null;
				do ((r = n.sibling), (n.sibling = null), (n = r));
				while (n !== null);
			}
		}
		function js(n) {
			var r = n.deletions;
			if ((n.flags & 16) !== 0) {
				if (r !== null)
					for (var a = 0; a < r.length; a++) {
						var s = r[a];
						((mn = s), ty(s, n));
					}
				Wg(n);
			}
			if (n.subtreeFlags & 10256) for (n = n.child; n !== null; ) (ey(n), (n = n.sibling));
		}
		function ey(n) {
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					(js(n), n.flags & 2048 && Fi(9, n, n.return));
					break;
				case 3:
					js(n);
					break;
				case 12:
					js(n);
					break;
				case 22:
					var r = n.stateNode;
					n.memoizedState !== null && r._visibility & 2 && (n.return === null || n.return.tag !== 13)
						? ((r._visibility &= -3), ho(n))
						: js(n);
					break;
				default:
					js(n);
			}
		}
		function ho(n) {
			var r = n.deletions;
			if ((n.flags & 16) !== 0) {
				if (r !== null)
					for (var a = 0; a < r.length; a++) {
						var s = r[a];
						((mn = s), ty(s, n));
					}
				Wg(n);
			}
			for (n = n.child; n !== null; ) {
				switch (((r = n), r.tag)) {
					case 0:
					case 11:
					case 15:
						(Fi(8, r, r.return), ho(r));
						break;
					case 22:
						((a = r.stateNode), a._visibility & 2 && ((a._visibility &= -3), ho(r)));
						break;
					default:
						ho(r);
				}
				n = n.sibling;
			}
		}
		function ty(n, r) {
			for (; mn !== null; ) {
				var a = mn;
				switch (a.tag) {
					case 0:
					case 11:
					case 15:
						Fi(8, a, r);
						break;
					case 23:
					case 22:
						if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
							var s = a.memoizedState.cachePool.pool;
							s != null && s.refCount++;
						}
						break;
					case 24:
						ps(a.memoizedState.cache);
				}
				if (((s = a.child), s !== null)) ((s.return = a), (mn = s));
				else
					e: for (a = n; mn !== null; ) {
						s = mn;
						var c = s.sibling,
							d = s.return;
						if ((Pg(s), s === a)) {
							mn = null;
							break e;
						}
						if (c !== null) {
							((c.return = d), (mn = c));
							break e;
						}
						mn = d;
					}
			}
		}
		var Ew = {
				getCacheForType: function (n) {
					var r = Sn(Gt),
						a = r.data.get(n);
					return (a === void 0 && ((a = n()), r.data.set(n, a)), a);
				},
				cacheSignal: function () {
					return Sn(Gt).controller.signal;
				},
			},
			Tw = typeof WeakMap == "function" ? WeakMap : Map,
			it = 0,
			pt = null,
			Ze = null,
			Pe = 0,
			lt = 0,
			ur = null,
			Gi = !1,
			Tu = !1,
			cd = !1,
			gi = 0,
			$t = 0,
			Xi = 0,
			La = 0,
			fd = 0,
			sr = 0,
			xu = 0,
			qs = null,
			Pn = null,
			dd = !1,
			mo = 0,
			ny = 0,
			vo = 1 / 0,
			go = null,
			Ji = null,
			on = 0,
			Wi = null,
			Au = null,
			yi = 0,
			hd = 0,
			md = null,
			ry = null,
			Is = 0,
			vd = null;
		function pr() {
			return (it & 2) !== 0 && Pe !== 0 ? Pe & -Pe : V.T !== null ? Sd() : tr();
		}
		function iy() {
			if (sr === 0)
				if ((Pe & 536870912) === 0 || Fe) {
					var n = un;
					((un <<= 1), (un & 3932160) === 0 && (un = 262144), (sr = n));
				} else sr = 536870912;
			return ((n = ir.current), n !== null && (n.flags |= 32), sr);
		}
		function Qn(n, r, a) {
			(((n === pt && (lt === 2 || lt === 9)) || n.cancelPendingCommit !== null) && (Ru(n, 0), ea(n, Pe, sr, !1)),
				jn(n, a),
				((it & 2) === 0 || n !== pt) &&
					(n === pt && ((it & 2) === 0 && (La |= a), $t === 4 && ea(n, Pe, sr, !1)), pi(n)));
		}
		function ay(n, r, a) {
			if ((it & 6) !== 0) throw Error(l(327));
			var s = (!a && (r & 127) === 0 && (r & n.expiredLanes) === 0) || zt(n, r),
				c = s ? Rw(n, r) : yd(n, r, !0),
				d = s;
			do {
				if (c === 0) {
					Tu && !s && ea(n, r, 0, !1);
					break;
				} else {
					if (((a = n.current.alternate), d && !xw(a))) {
						((c = yd(n, r, !1)), (d = !1));
						continue;
					}
					if (c === 2) {
						if (((d = r), n.errorRecoveryDisabledLanes & d)) var y = 0;
						else ((y = n.pendingLanes & -536870913), (y = y !== 0 ? y : y & 536870912 ? 536870912 : 0));
						if (y !== 0) {
							r = y;
							e: {
								var T = n;
								c = qs;
								var D = T.current.memoizedState.isDehydrated;
								if ((D && (Ru(T, y).flags |= 256), (y = yd(T, y, !1)), y !== 2)) {
									if (cd && !D) {
										((T.errorRecoveryDisabledLanes |= d), (La |= d), (c = 4));
										break e;
									}
									((d = Pn), (Pn = c), d !== null && (Pn === null ? (Pn = d) : Pn.push.apply(Pn, d)));
								}
								c = y;
							}
							if (((d = !1), c !== 2)) continue;
						}
					}
					if (c === 1) {
						(Ru(n, 0), ea(n, r, 0, !0));
						break;
					}
					e: {
						switch (((s = n), (d = c), d)) {
							case 0:
							case 1:
								throw Error(l(345));
							case 4:
								if ((r & 4194048) !== r) break;
							case 6:
								ea(s, r, sr, !Gi);
								break e;
							case 2:
								Pn = null;
								break;
							case 3:
							case 5:
								break;
							default:
								throw Error(l(329));
						}
						if ((r & 62914560) === r && ((c = mo + 300 - Ne()), 10 < c)) {
							if ((ea(s, r, sr, !Gi), It(s, 0, !0) !== 0)) break e;
							((yi = r),
								(s.timeoutHandle = Iy(uy.bind(null, s, a, Pn, go, dd, r, sr, La, xu, Gi, d, "Throttled", -0, 0), c)));
							break e;
						}
						uy(s, a, Pn, go, dd, r, sr, La, xu, Gi, d, null, -0, 0);
					}
				}
				break;
			} while (!0);
			pi(n);
		}
		function uy(n, r, a, s, c, d, y, T, D, F, re, ue, X, ee) {
			if (((n.timeoutHandle = -1), (ue = r.subtreeFlags), ue & 8192 || (ue & 16785408) === 16785408)) {
				((ue = {
					stylesheets: null,
					count: 0,
					imgCount: 0,
					imgBytes: 0,
					suspenseyImages: [],
					waitingForImages: !0,
					waitingForViewTransition: !1,
					unsuspend: fr,
				}),
					Jg(r, d, ue));
				var Se = (d & 62914560) === d ? mo - Ne() : (d & 4194048) === d ? ny - Ne() : 0;
				if (((Se = s1(ue, Se)), Se !== null)) {
					((yi = d),
						(n.cancelPendingCommit = Se(my.bind(null, n, r, d, a, s, c, y, T, D, re, ue, null, X, ee))),
						ea(n, d, y, !F));
					return;
				}
			}
			my(n, r, d, a, s, c, y, T, D);
		}
		function xw(n) {
			for (var r = n; ; ) {
				var a = r.tag;
				if (
					(a === 0 || a === 11 || a === 15) &&
					r.flags & 16384 &&
					((a = r.updateQueue), a !== null && ((a = a.stores), a !== null))
				)
					for (var s = 0; s < a.length; s++) {
						var c = a[s],
							d = c.getSnapshot;
						c = c.value;
						try {
							if (!nr(d(), c)) return !1;
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
		function ea(n, r, a, s) {
			((r &= ~fd),
				(r &= ~La),
				(n.suspendedLanes |= r),
				(n.pingedLanes &= ~r),
				s && (n.warmLanes |= r),
				(s = n.expirationTimes));
			for (var c = r; 0 < c; ) {
				var d = 31 - qt(c),
					y = 1 << d;
				((s[d] = -1), (c &= ~y));
			}
			a !== 0 && xr(n, a, r);
		}
		function yo() {
			return (it & 6) === 0 ? (Ls(0, !1), !1) : !0;
		}
		function gd() {
			if (Ze !== null) {
				if (lt === 0) var n = Ze.return;
				else ((n = Ze), (ui = Ra = null), Of(n), (yu = null), (_s = 0), (n = Ze));
				for (; n !== null; ) (Ig(n.alternate, n), (n = n.return));
				Ze = null;
			}
		}
		function Ru(n, r) {
			var a = n.timeoutHandle;
			(a !== -1 && ((n.timeoutHandle = -1), Zw(a)),
				(a = n.cancelPendingCommit),
				a !== null && ((n.cancelPendingCommit = null), a()),
				(yi = 0),
				gd(),
				(pt = n),
				(Ze = a = ii(n.current, null)),
				(Pe = r),
				(lt = 0),
				(ur = null),
				(Gi = !1),
				(Tu = zt(n, r)),
				(cd = !1),
				(xu = sr = fd = La = Xi = $t = 0),
				(Pn = qs = null),
				(dd = !1),
				(r & 8) !== 0 && (r |= r & 32));
			var s = n.entangledLanes;
			if (s !== 0)
				for (n = n.entanglements, s &= r; 0 < s; ) {
					var c = 31 - qt(s),
						d = 1 << c;
					((r |= n[c]), (s &= ~d));
				}
			return ((gi = r), Il(), a);
		}
		function sy(n, r) {
			((Le = null),
				(V.H = Cs),
				r === gu || r === Pl
					? ((r = Av()), (lt = 3))
					: r === _f
						? ((r = Av()), (lt = 4))
						: (lt = r === Yf ? 8 : r !== null && typeof r == "object" && typeof r.then == "function" ? 6 : 1),
				(ur = r),
				Ze === null && (($t = 1), ao(n, hr(r, n.current))));
		}
		function ly() {
			var n = ir.current;
			return n === null
				? !0
				: (Pe & 4194048) === Pe
					? yr === null
					: (Pe & 62914560) === Pe || (Pe & 536870912) !== 0
						? n === yr
						: !1;
		}
		function oy() {
			var n = V.H;
			return ((V.H = Cs), n === null ? Cs : n);
		}
		function cy() {
			var n = V.A;
			return ((V.A = Ew), n);
		}
		function po() {
			(($t = 4),
				Gi || ((Pe & 4194048) !== Pe && ir.current !== null) || (Tu = !0),
				((Xi & 134217727) === 0 && (La & 134217727) === 0) || pt === null || ea(pt, Pe, sr, !1));
		}
		function yd(n, r, a) {
			var s = it;
			it |= 2;
			var c = oy(),
				d = cy();
			((pt !== n || Pe !== r) && ((go = null), Ru(n, r)), (r = !1));
			var y = $t;
			e: do
				try {
					if (lt !== 0 && Ze !== null) {
						var T = Ze,
							D = ur;
						switch (lt) {
							case 8:
								(gd(), (y = 6));
								break e;
							case 3:
							case 2:
							case 9:
							case 6:
								ir.current === null && (r = !0);
								var F = lt;
								if (((lt = 0), (ur = null), Cu(n, T, D, F), a && Tu)) {
									y = 0;
									break e;
								}
								break;
							default:
								((F = lt), (lt = 0), (ur = null), Cu(n, T, D, F));
						}
					}
					(Aw(), (y = $t));
					break;
				} catch (re) {
					sy(n, re);
				}
			while (!0);
			return (
				r && n.shellSuspendCounter++,
				(ui = Ra = null),
				(it = s),
				(V.H = c),
				(V.A = d),
				Ze === null && ((pt = null), (Pe = 0), Il()),
				y
			);
		}
		function Aw() {
			for (; Ze !== null; ) fy(Ze);
		}
		function Rw(n, r) {
			var a = it;
			it |= 2;
			var s = oy(),
				c = cy();
			pt !== n || Pe !== r ? ((go = null), (vo = Ne() + 500), Ru(n, r)) : (Tu = zt(n, r));
			e: do
				try {
					if (lt !== 0 && Ze !== null) {
						r = Ze;
						var d = ur;
						t: switch (lt) {
							case 1:
								((lt = 0), (ur = null), Cu(n, r, d, 1));
								break;
							case 2:
							case 9:
								if (Tv(d)) {
									((lt = 0), (ur = null), dy(r));
									break;
								}
								((r = function () {
									((lt !== 2 && lt !== 9) || pt !== n || (lt = 7), pi(n));
								}),
									d.then(r, r));
								break e;
							case 3:
								lt = 7;
								break e;
							case 4:
								lt = 5;
								break e;
							case 7:
								Tv(d) ? ((lt = 0), (ur = null), dy(r)) : ((lt = 0), (ur = null), Cu(n, r, d, 7));
								break;
							case 5:
								var y = null;
								switch (Ze.tag) {
									case 26:
										y = Ze.memoizedState;
									case 5:
									case 27:
										var T = Ze;
										if (y ? Jy(y) : T.stateNode.complete) {
											((lt = 0), (ur = null));
											var D = T.sibling;
											if (D !== null) Ze = D;
											else {
												var F = T.return;
												F !== null ? ((Ze = F), bo(F)) : (Ze = null);
											}
											break t;
										}
								}
								((lt = 0), (ur = null), Cu(n, r, d, 5));
								break;
							case 6:
								((lt = 0), (ur = null), Cu(n, r, d, 6));
								break;
							case 8:
								(gd(), ($t = 6));
								break e;
							default:
								throw Error(l(462));
						}
					}
					Cw();
					break;
				} catch (re) {
					sy(n, re);
				}
			while (!0);
			return ((ui = Ra = null), (V.H = s), (V.A = c), (it = a), Ze !== null ? 0 : ((pt = null), (Pe = 0), Il(), $t));
		}
		function Cw() {
			for (; Ze !== null && !Re(); ) fy(Ze);
		}
		function fy(n) {
			var r = jg(n.alternate, n, gi);
			((n.memoizedProps = n.pendingProps), r === null ? bo(n) : (Ze = r));
		}
		function dy(n) {
			var r = n,
				a = r.alternate;
			switch (r.tag) {
				case 15:
				case 0:
					r = kg(a, r, r.pendingProps, r.type, void 0, Pe);
					break;
				case 11:
					r = kg(a, r, r.pendingProps, r.type.render, r.ref, Pe);
					break;
				case 5:
					Of(r);
				default:
					(Ig(a, r), (r = Ze = hv(r, gi)), (r = jg(a, r, gi)));
			}
			((n.memoizedProps = n.pendingProps), r === null ? bo(n) : (Ze = r));
		}
		function Cu(n, r, a, s) {
			((ui = Ra = null), Of(r), (yu = null), (_s = 0));
			var c = r.return;
			try {
				if (gw(n, c, r, a, Pe)) {
					(($t = 1), ao(n, hr(a, n.current)), (Ze = null));
					return;
				}
			} catch (d) {
				if (c !== null) throw ((Ze = c), d);
				(($t = 1), ao(n, hr(a, n.current)), (Ze = null));
				return;
			}
			r.flags & 32768
				? (Fe || s === 1
						? (n = !0)
						: Tu || (Pe & 536870912) !== 0
							? (n = !1)
							: ((Gi = n = !0),
								(s === 2 || s === 9 || s === 3 || s === 6) &&
									((s = ir.current), s !== null && s.tag === 13 && (s.flags |= 16384))),
					hy(r, n))
				: bo(r);
		}
		function bo(n) {
			var r = n;
			do {
				if ((r.flags & 32768) !== 0) {
					hy(r, Gi);
					return;
				}
				n = r.return;
				var a = bw(r.alternate, r, gi);
				if (a !== null) {
					Ze = a;
					return;
				}
				if (((r = r.sibling), r !== null)) {
					Ze = r;
					return;
				}
				Ze = r = n;
			} while (r !== null);
			$t === 0 && ($t = 5);
		}
		function hy(n, r) {
			do {
				var a = _w(n.alternate, n);
				if (a !== null) {
					((a.flags &= 32767), (Ze = a));
					return;
				}
				if (
					((a = n.return),
					a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
					!r && ((n = n.sibling), n !== null))
				) {
					Ze = n;
					return;
				}
				Ze = n = a;
			} while (n !== null);
			(($t = 6), (Ze = null));
		}
		function my(n, r, a, s, c, d, y, T, D) {
			n.cancelPendingCommit = null;
			do _o();
			while (on !== 0);
			if ((it & 6) !== 0) throw Error(l(327));
			if (r !== null) {
				if (r === n.current) throw Error(l(177));
				if (
					((d = r.lanes | r.childLanes),
					(d |= af),
					Wn(n, a, d, y, T, D),
					n === pt && ((Ze = pt = null), (Pe = 0)),
					(Au = r),
					(Wi = n),
					(yi = a),
					(hd = d),
					(md = c),
					(ry = s),
					(r.subtreeFlags & 10256) !== 0 || (r.flags & 10256) !== 0
						? ((n.callbackNode = null),
							(n.callbackPriority = 0),
							Ow(Et, function () {
								return (by(), null);
							}))
						: ((n.callbackNode = null), (n.callbackPriority = 0)),
					(s = (r.flags & 13878) !== 0),
					(r.subtreeFlags & 13878) !== 0 || s)
				) {
					((s = V.T), (V.T = null), (c = P.p), (P.p = 2), (y = it), (it |= 4));
					try {
						Sw(n, r, a);
					} finally {
						((it = y), (P.p = c), (V.T = s));
					}
				}
				((on = 1), vy(), gy(), yy());
			}
		}
		function vy() {
			if (on === 1) {
				on = 0;
				var n = Wi,
					r = Au,
					a = (r.flags & 13878) !== 0;
				if ((r.subtreeFlags & 13878) !== 0 || a) {
					((a = V.T), (V.T = null));
					var s = P.p;
					P.p = 2;
					var c = it;
					it |= 4;
					try {
						Fg(r, n);
						var d = Cd,
							y = iv(n.containerInfo),
							T = d.focusedElem,
							D = d.selectionRange;
						if (y !== T && T && T.ownerDocument && rv(T.ownerDocument.documentElement, T)) {
							if (D !== null && Wc(T)) {
								var F = D.start,
									re = D.end;
								if ((re === void 0 && (re = F), "selectionStart" in T))
									((T.selectionStart = F), (T.selectionEnd = Math.min(re, T.value.length)));
								else {
									var ue = T.ownerDocument || document,
										X = (ue && ue.defaultView) || window;
									if (X.getSelection) {
										var ee = X.getSelection(),
											Se = T.textContent.length,
											Ce = Math.min(D.start, Se),
											vt = D.end === void 0 ? Ce : Math.min(D.end, Se);
										!ee.extend && Ce > vt && ((y = vt), (vt = Ce), (Ce = y));
										var Z = nv(T, Ce),
											U = nv(T, vt);
										if (
											Z &&
											U &&
											(ee.rangeCount !== 1 ||
												ee.anchorNode !== Z.node ||
												ee.anchorOffset !== Z.offset ||
												ee.focusNode !== U.node ||
												ee.focusOffset !== U.offset)
										) {
											var K = ue.createRange();
											(K.setStart(Z.node, Z.offset),
												ee.removeAllRanges(),
												Ce > vt
													? (ee.addRange(K), ee.extend(U.node, U.offset))
													: (K.setEnd(U.node, U.offset), ee.addRange(K)));
										}
									}
								}
							}
							for (ue = [], ee = T; (ee = ee.parentNode); )
								ee.nodeType === 1 && ue.push({ element: ee, left: ee.scrollLeft, top: ee.scrollTop });
							for (typeof T.focus == "function" && T.focus(), T = 0; T < ue.length; T++) {
								var ae = ue[T];
								((ae.element.scrollLeft = ae.left), (ae.element.scrollTop = ae.top));
							}
						}
						((Oo = !!Rd), (Cd = Rd = null));
					} finally {
						((it = c), (P.p = s), (V.T = a));
					}
				}
				((n.current = r), (on = 2));
			}
		}
		function gy() {
			if (on === 2) {
				on = 0;
				var n = Wi,
					r = Au,
					a = (r.flags & 8772) !== 0;
				if ((r.subtreeFlags & 8772) !== 0 || a) {
					((a = V.T), (V.T = null));
					var s = P.p;
					P.p = 2;
					var c = it;
					it |= 4;
					try {
						Hg(n, r.alternate, r);
					} finally {
						((it = c), (P.p = s), (V.T = a));
					}
				}
				on = 3;
			}
		}
		function yy() {
			if (on === 4 || on === 3) {
				((on = 0), St());
				var n = Wi,
					r = Au,
					a = yi,
					s = ry;
				(r.subtreeFlags & 10256) !== 0 || (r.flags & 10256) !== 0
					? (on = 5)
					: ((on = 0), (Au = Wi = null), py(n, n.pendingLanes));
				var c = n.pendingLanes;
				if ((c === 0 && (Ji = null), qr(a), (r = r.stateNode), Ve && typeof Ve.onCommitFiberRoot == "function"))
					try {
						Ve.onCommitFiberRoot(Rn, r, void 0, (r.current.flags & 128) === 128);
					} catch {}
				if (s !== null) {
					((r = V.T), (c = P.p), (P.p = 2), (V.T = null));
					try {
						for (var d = n.onRecoverableError, y = 0; y < s.length; y++) {
							var T = s[y];
							d(T.value, { componentStack: T.stack });
						}
					} finally {
						((V.T = r), (P.p = c));
					}
				}
				((yi & 3) !== 0 && _o(),
					pi(n),
					(c = n.pendingLanes),
					(a & 261930) !== 0 && (c & 42) !== 0 ? (n === vd ? Is++ : ((Is = 0), (vd = n))) : (Is = 0),
					Ls(0, !1));
			}
		}
		function py(n, r) {
			(n.pooledCacheLanes &= r) === 0 && ((r = n.pooledCache), r != null && ((n.pooledCache = null), ps(r)));
		}
		function _o() {
			return (vy(), gy(), yy(), by());
		}
		function by() {
			if (on !== 5) return !1;
			var n = Wi,
				r = hd;
			hd = 0;
			var a = qr(yi),
				s = V.T,
				c = P.p;
			try {
				((P.p = 32 > a ? 32 : a), (V.T = null), (a = md), (md = null));
				var d = Wi,
					y = yi;
				if (((on = 0), (Au = Wi = null), (yi = 0), (it & 6) !== 0)) throw Error(l(331));
				var T = it;
				if (
					((it |= 4),
					ey(d.current),
					Xg(d, d.current, y, a),
					(it = T),
					Ls(0, !1),
					Ve && typeof Ve.onPostCommitFiberRoot == "function")
				)
					try {
						Ve.onPostCommitFiberRoot(Rn, d);
					} catch {}
				return !0;
			} finally {
				((P.p = c), (V.T = s), py(n, r));
			}
		}
		function _y(n, r, a) {
			((r = hr(a, r)), (r = Kf(n.stateNode, r, 2)), (n = Da(n, r, 2)), n !== null && (jn(n, 2), pi(n)));
		}
		function ot(n, r, a) {
			if (n.tag === 3) _y(n, n, a);
			else
				for (; r !== null; ) {
					if (r.tag === 3) {
						_y(r, n, a);
						break;
					} else if (r.tag === 1) {
						var s = r.stateNode;
						if (
							typeof r.type.getDerivedStateFromError == "function" ||
							(typeof s.componentDidCatch == "function" && (Ji === null || !Ji.has(s)))
						) {
							((n = hr(a, n)), (a = Sg(2)), (s = Da(r, a, 2)), s !== null && (wg(a, s, r, n), jn(s, 2), pi(s)));
							break;
						}
					}
					r = r.return;
				}
		}
		function pd(n, r, a) {
			var s = n.pingCache;
			if (s === null) {
				s = n.pingCache = new Tw();
				var c = new Set();
				s.set(r, c);
			} else ((c = s.get(r)), c === void 0 && ((c = new Set()), s.set(r, c)));
			c.has(a) || ((cd = !0), c.add(a), (n = kw.bind(null, n, r, a)), r.then(n, n));
		}
		function kw(n, r, a) {
			var s = n.pingCache;
			(s !== null && s.delete(r),
				(n.pingedLanes |= n.suspendedLanes & a),
				(n.warmLanes &= ~a),
				pt === n &&
					(Pe & a) === a &&
					($t === 4 || ($t === 3 && (Pe & 62914560) === Pe && 300 > Ne() - mo) ? (it & 2) === 0 && Ru(n, 0) : (fd |= a),
					xu === Pe && (xu = 0)),
				pi(n));
		}
		function Sy(n, r) {
			(r === 0 && (r = fn()), (n = Ta(n, r)), n !== null && (jn(n, r), pi(n)));
		}
		function Mw(n) {
			var r = n.memoizedState,
				a = 0;
			(r !== null && (a = r.retryLane), Sy(n, a));
		}
		function Nw(n, r) {
			var a = 0;
			switch (n.tag) {
				case 31:
				case 13:
					var s = n.stateNode,
						c = n.memoizedState;
					c !== null && (a = c.retryLane);
					break;
				case 19:
					s = n.stateNode;
					break;
				case 22:
					s = n.stateNode._retryCache;
					break;
				default:
					throw Error(l(314));
			}
			(s !== null && s.delete(r), Sy(n, a));
		}
		function Ow(n, r) {
			return _t(n, r);
		}
		var So = null,
			ku = null,
			bd = !1,
			wo = !1,
			_d = !1,
			ta = 0;
		function pi(n) {
			(n !== ku && n.next === null && (ku === null ? (So = ku = n) : (ku = ku.next = n)),
				(wo = !0),
				bd || ((bd = !0), Dw()));
		}
		function Ls(n, r) {
			if (!_d && wo) {
				_d = !0;
				do
					for (var a = !1, s = So; s !== null; ) {
						if (!r)
							if (n !== 0) {
								var c = s.pendingLanes;
								if (c === 0) var d = 0;
								else {
									var y = s.suspendedLanes,
										T = s.pingedLanes;
									((d = (1 << (31 - qt(42 | n) + 1)) - 1),
										(d &= c & ~(y & ~T)),
										(d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0));
								}
								d !== 0 && ((a = !0), xy(s, d));
							} else
								((d = Pe),
									(d = It(s, s === pt ? d : 0, s.cancelPendingCommit !== null || s.timeoutHandle !== -1)),
									(d & 3) === 0 || zt(s, d) || ((a = !0), xy(s, d)));
						s = s.next;
					}
				while (a);
				_d = !1;
			}
		}
		function zw() {
			wy();
		}
		function wy() {
			wo = bd = !1;
			var n = 0;
			ta !== 0 && Vw() && (n = ta);
			for (var r = Ne(), a = null, s = So; s !== null; ) {
				var c = s.next,
					d = Ey(s, r);
				(d === 0
					? ((s.next = null), a === null ? (So = c) : (a.next = c), c === null && (ku = a))
					: ((a = s), (n !== 0 || (d & 3) !== 0) && (wo = !0)),
					(s = c));
			}
			((on !== 0 && on !== 5) || Ls(n, !1), ta !== 0 && (ta = 0));
		}
		function Ey(n, r) {
			for (
				var a = n.suspendedLanes, s = n.pingedLanes, c = n.expirationTimes, d = n.pendingLanes & -62914561;
				0 < d;
			) {
				var y = 31 - qt(d),
					T = 1 << y,
					D = c[y];
				(D === -1 ? ((T & a) === 0 || (T & s) !== 0) && (c[y] = Di(T, r)) : D <= r && (n.expiredLanes |= T), (d &= ~T));
			}
			if (
				((r = pt),
				(a = Pe),
				(a = It(n, n === r ? a : 0, n.cancelPendingCommit !== null || n.timeoutHandle !== -1)),
				(s = n.callbackNode),
				a === 0 || (n === r && (lt === 2 || lt === 9)) || n.cancelPendingCommit !== null)
			)
				return (s !== null && s !== null && fe(s), (n.callbackNode = null), (n.callbackPriority = 0));
			if ((a & 3) === 0 || zt(n, a)) {
				if (((r = a & -a), r === n.callbackPriority)) return r;
				switch ((s !== null && fe(s), qr(a))) {
					case 2:
					case 8:
						a = rt;
						break;
					case 32:
						a = Et;
						break;
					case 268435456:
						a = Xn;
						break;
					default:
						a = Et;
				}
				return ((s = Ty.bind(null, n)), (a = _t(a, s)), (n.callbackPriority = r), (n.callbackNode = a), r);
			}
			return (s !== null && s !== null && fe(s), (n.callbackPriority = 2), (n.callbackNode = null), 2);
		}
		function Ty(n, r) {
			if (on !== 0 && on !== 5) return ((n.callbackNode = null), (n.callbackPriority = 0), null);
			var a = n.callbackNode;
			if (_o() && n.callbackNode !== a) return null;
			var s = Pe;
			return (
				(s = It(n, n === pt ? s : 0, n.cancelPendingCommit !== null || n.timeoutHandle !== -1)),
				s === 0
					? null
					: (ay(n, s, r), Ey(n, Ne()), n.callbackNode != null && n.callbackNode === a ? Ty.bind(null, n) : null)
			);
		}
		function xy(n, r) {
			if (_o()) return null;
			ay(n, r, !0);
		}
		function Dw() {
			Hw(function () {
				(it & 6) !== 0 ? _t(Ot, zw) : wy();
			});
		}
		function Sd() {
			if (ta === 0) {
				var n = mu;
				(n === 0 && ((n = gn), (gn <<= 1), (gn & 261888) === 0 && (gn = 256)), (ta = n));
			}
			return ta;
		}
		function Ay(n) {
			return n == null || typeof n == "symbol" || typeof n == "boolean"
				? null
				: typeof n == "function"
					? n
					: ti("" + n);
		}
		function Ry(n, r) {
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
		function jw(n, r, a, s, c) {
			if (r === "submit" && a && a.stateNode === c) {
				var d = Ay((c[Yt] || null).action),
					y = s.submitter;
				y &&
					((r = (r = y[Yt] || null) ? Ay(r.formAction) : y.getAttribute("formAction")),
					r !== null && ((d = r), (y = null)));
				var T = new zl("action", "action", null, s, c);
				n.push({
					event: T,
					listeners: [
						{
							instance: null,
							listener: function () {
								if (s.defaultPrevented) {
									if (ta !== 0) {
										var D = y ? Ry(c, y) : new FormData(c);
										Bf(a, { pending: !0, data: D, method: c.method, action: d }, null, D);
									}
								} else
									typeof d == "function" &&
										(T.preventDefault(),
										(D = y ? Ry(c, y) : new FormData(c)),
										Bf(a, { pending: !0, data: D, method: c.method, action: d }, d, D));
							},
							currentTarget: c,
						},
					],
				});
			}
		}
		for (var wd = 0; wd < rf.length; wd++) {
			var Ed = rf[wd];
			Mr(Ed.toLowerCase(), "on" + (Ed[0].toUpperCase() + Ed.slice(1)));
		}
		(Mr(sv, "onAnimationEnd"),
			Mr(lv, "onAnimationIteration"),
			Mr(ov, "onAnimationStart"),
			Mr("dblclick", "onDoubleClick"),
			Mr("focusin", "onFocus"),
			Mr("focusout", "onBlur"),
			Mr(GS, "onTransitionRun"),
			Mr(XS, "onTransitionStart"),
			Mr(JS, "onTransitionCancel"),
			Mr(cv, "onTransitionEnd"),
			sn("onMouseEnter", ["mouseout", "mouseover"]),
			sn("onMouseLeave", ["mouseout", "mouseover"]),
			sn("onPointerEnter", ["pointerout", "pointerover"]),
			sn("onPointerLeave", ["pointerout", "pointerover"]),
			ut("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
			ut("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
			ut("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
			ut("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
			ut("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
			ut("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" ")));
		var Us =
				"abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
					" ",
				),
			qw = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Us));
		function Cy(n, r) {
			r = (r & 4) !== 0;
			for (var a = 0; a < n.length; a++) {
				var s = n[a],
					c = s.event;
				s = s.listeners;
				e: {
					var d = void 0;
					if (r)
						for (var y = s.length - 1; 0 <= y; y--) {
							var T = s[y],
								D = T.instance,
								F = T.currentTarget;
							if (((T = T.listener), D !== d && c.isPropagationStopped())) break e;
							((d = T), (c.currentTarget = F));
							try {
								d(c);
							} catch (re) {
								ql(re);
							}
							((c.currentTarget = null), (d = D));
						}
					else
						for (y = 0; y < s.length; y++) {
							if (
								((T = s[y]),
								(D = T.instance),
								(F = T.currentTarget),
								(T = T.listener),
								D !== d && c.isPropagationStopped())
							)
								break e;
							((d = T), (c.currentTarget = F));
							try {
								d(c);
							} catch (re) {
								ql(re);
							}
							((c.currentTarget = null), (d = D));
						}
				}
			}
		}
		function He(n, r) {
			var a = r[Ar];
			a === void 0 && (a = r[Ar] = new Set());
			var s = n + "__bubble";
			a.has(s) || (My(r, n, 2, !1), a.add(s));
		}
		function Td(n, r, a) {
			var s = 0;
			(r && (s |= 4), My(a, n, s, r));
		}
		var Eo = "_reactListening" + Math.random().toString(36).slice(2);
		function ky(n) {
			if (!n[Eo]) {
				((n[Eo] = !0),
					We.forEach(function (a) {
						a !== "selectionchange" && (qw.has(a) || Td(a, !1, n), Td(a, !0, n));
					}));
				var r = n.nodeType === 9 ? n : n.ownerDocument;
				r === null || r[Eo] || ((r[Eo] = !0), Td("selectionchange", !1, r));
			}
		}
		function My(n, r, a, s) {
			switch (r0(r)) {
				case 2:
					var c = d1;
					break;
				case 8:
					c = h1;
					break;
				default:
					c = Ud;
			}
			((a = c.bind(null, r, a, n)),
				(c = void 0),
				!be || (r !== "touchstart" && r !== "touchmove" && r !== "wheel") || (c = !0),
				s
					? c !== void 0
						? n.addEventListener(r, a, { capture: !0, passive: c })
						: n.addEventListener(r, a, !0)
					: c !== void 0
						? n.addEventListener(r, a, { passive: c })
						: n.addEventListener(r, a, !1));
		}
		function xd(n, r, a, s, c) {
			var d = s;
			if ((r & 1) === 0 && (r & 2) === 0 && s !== null)
				e: for (;;) {
					if (s === null) return;
					var y = s.tag;
					if (y === 3 || y === 4) {
						var T = s.stateNode.containerInfo;
						if (T === c) break;
						if (y === 4)
							for (y = s.return; y !== null; ) {
								var D = y.tag;
								if ((D === 3 || D === 4) && y.stateNode.containerInfo === c) return;
								y = y.return;
							}
						for (; T !== null; ) {
							if (((y = W(T)), y === null)) return;
							if (((D = y.tag), D === 5 || D === 6 || D === 26 || D === 27)) {
								s = d = y;
								continue e;
							}
							T = T.parentNode;
						}
					}
					s = s.return;
				}
			Y(function () {
				var F = d,
					re = Sa(a),
					ue = [];
				e: {
					var X = fv.get(n);
					if (X !== void 0) {
						var ee = zl,
							Se = n;
						switch (n) {
							case "keypress":
								if (kr(a) === 0) break e;
							case "keydown":
							case "keyup":
								ee = zS;
								break;
							case "focusin":
								((Se = "focus"), (ee = Yc));
								break;
							case "focusout":
								((Se = "blur"), (ee = Yc));
								break;
							case "beforeblur":
							case "afterblur":
								ee = Yc;
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
								ee = $m;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								ee = AS;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								ee = DS;
								break;
							case sv:
							case lv:
							case ov:
								ee = RS;
								break;
							case cv:
								ee = jS;
								break;
							case "scroll":
							case "scrollend":
								ee = xS;
								break;
							case "wheel":
								ee = qS;
								break;
							case "copy":
							case "cut":
							case "paste":
								ee = CS;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								ee = Vm;
								break;
							case "toggle":
							case "beforetoggle":
								ee = IS;
						}
						var Ce = (r & 4) !== 0,
							vt = !Ce && (n === "scroll" || n === "scrollend"),
							Z = Ce ? (X !== null ? X + "Capture" : null) : X;
						Ce = [];
						for (var U = F, K; U !== null; ) {
							var ae = U;
							if (
								((K = ae.stateNode),
								(ae = ae.tag),
								(ae !== 5 && ae !== 26 && ae !== 27) ||
									K === null ||
									Z === null ||
									((ae = de(U, Z)), ae != null && Ce.push($s(U, ae, K))),
								vt)
							)
								break;
							U = U.return;
						}
						0 < Ce.length && ((X = new ee(X, Se, null, a, re)), ue.push({ event: X, listeners: Ce }));
					}
				}
				if ((r & 7) === 0) {
					e: {
						if (
							((X = n === "mouseover" || n === "pointerover"),
							(ee = n === "mouseout" || n === "pointerout"),
							X && a !== _a && (Se = a.relatedTarget || a.fromElement) && (W(Se) || Se[Ft]))
						)
							break e;
						if (
							(ee || X) &&
							((X = re.window === re ? re : (X = re.ownerDocument) ? X.defaultView || X.parentWindow : window),
							ee
								? ((Se = a.relatedTarget || a.toElement),
									(ee = F),
									(Se = Se ? W(Se) : null),
									Se !== null &&
										((vt = f(Se)), (Ce = Se.tag), Se !== vt || (Ce !== 5 && Ce !== 27 && Ce !== 6)) &&
										(Se = null))
								: ((ee = null), (Se = F)),
							ee !== Se)
						) {
							if (
								((Ce = $m),
								(ae = "onMouseLeave"),
								(Z = "onMouseEnter"),
								(U = "mouse"),
								(n === "pointerout" || n === "pointerover") &&
									((Ce = Vm), (ae = "onPointerLeave"), (Z = "onPointerEnter"), (U = "pointer")),
								(vt = ee == null ? X : Me(ee)),
								(K = Se == null ? X : Me(Se)),
								(X = new Ce(ae, U + "leave", ee, a, re)),
								(X.target = vt),
								(X.relatedTarget = K),
								(ae = null),
								W(re) === F &&
									((Ce = new Ce(Z, U + "enter", Se, a, re)), (Ce.target = K), (Ce.relatedTarget = vt), (ae = Ce)),
								(vt = ae),
								ee && Se)
							)
								t: {
									for (Ce = Iw, Z = ee, U = Se, K = 0, ae = Z; ae; ae = Ce(ae)) K++;
									ae = 0;
									for (var xe = U; xe; xe = Ce(xe)) ae++;
									for (; 0 < K - ae; ) ((Z = Ce(Z)), K--);
									for (; 0 < ae - K; ) ((U = Ce(U)), ae--);
									for (; K--; ) {
										if (Z === U || (U !== null && Z === U.alternate)) {
											Ce = Z;
											break t;
										}
										((Z = Ce(Z)), (U = Ce(U)));
									}
									Ce = null;
								}
							else Ce = null;
							(ee !== null && Ny(ue, X, ee, Ce, !1), Se !== null && vt !== null && Ny(ue, vt, Se, Ce, !0));
						}
					}
					e: {
						if (
							((X = F ? Me(F) : window),
							(ee = X.nodeName && X.nodeName.toLowerCase()),
							ee === "select" || (ee === "input" && X.type === "file"))
						)
							var tt = Gm;
						else if (Ym(X))
							if (Xm) tt = KS;
							else {
								tt = PS;
								var Ee = HS;
							}
						else
							((ee = X.nodeName),
								!ee || ee.toLowerCase() !== "input" || (X.type !== "checkbox" && X.type !== "radio")
									? F && $r(F.elementType) && (tt = Gm)
									: (tt = QS));
						if (tt && (tt = tt(n, F))) {
							Fm(ue, tt, a, re);
							break e;
						}
						(Ee && Ee(n, X, F),
							n === "focusout" &&
								F &&
								X.type === "number" &&
								F.memoizedProps.value != null &&
								$i(X, "number", X.value));
					}
					switch (((Ee = F ? Me(F) : window), n)) {
						case "focusin":
							(Ym(Ee) || Ee.contentEditable === "true") && ((uu = Ee), (ef = F), (vs = null));
							break;
						case "focusout":
							vs = ef = uu = null;
							break;
						case "mousedown":
							tf = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							((tf = !1), av(ue, a, re));
							break;
						case "selectionchange":
							if (FS) break;
						case "keydown":
						case "keyup":
							av(ue, a, re);
					}
					var $e;
					if (Gc)
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
						au
							? Qm(n, a) && (Qe = "onCompositionEnd")
							: n === "keydown" && a.keyCode === 229 && (Qe = "onCompositionStart");
					(Qe &&
						(Zm &&
							a.locale !== "ko" &&
							(au || Qe !== "onCompositionStart"
								? Qe === "onCompositionEnd" && au && ($e = kn())
								: ((ke = re), (Ge = "value" in ke ? ke.value : ke.textContent), (au = !0))),
						(Ee = To(F, Qe)),
						0 < Ee.length &&
							((Qe = new Bm(Qe, n, null, a, re)),
							ue.push({ event: Qe, listeners: Ee }),
							$e ? (Qe.data = $e) : (($e = Km(a)), $e !== null && (Qe.data = $e)))),
						($e = US ? $S(n, a) : BS(n, a)) &&
							((Qe = To(F, "onBeforeInput")),
							0 < Qe.length &&
								((Ee = new Bm("onBeforeInput", "beforeinput", null, a, re)),
								ue.push({ event: Ee, listeners: Qe }),
								(Ee.data = $e))),
						jw(ue, n, F, a, re));
				}
				Cy(ue, r);
			});
		}
		function $s(n, r, a) {
			return { instance: n, listener: r, currentTarget: a };
		}
		function To(n, r) {
			for (var a = r + "Capture", s = []; n !== null; ) {
				var c = n,
					d = c.stateNode;
				if (
					((c = c.tag),
					(c !== 5 && c !== 26 && c !== 27) ||
						d === null ||
						((c = de(n, a)), c != null && s.unshift($s(n, c, d)), (c = de(n, r)), c != null && s.push($s(n, c, d))),
					n.tag === 3)
				)
					return s;
				n = n.return;
			}
			return [];
		}
		function Iw(n) {
			if (n === null) return null;
			do n = n.return;
			while (n && n.tag !== 5 && n.tag !== 27);
			return n || null;
		}
		function Ny(n, r, a, s, c) {
			for (var d = r._reactName, y = []; a !== null && a !== s; ) {
				var T = a,
					D = T.alternate,
					F = T.stateNode;
				if (((T = T.tag), D !== null && D === s)) break;
				((T !== 5 && T !== 26 && T !== 27) ||
					F === null ||
					((D = F),
					c
						? ((F = de(a, d)), F != null && y.unshift($s(a, F, D)))
						: c || ((F = de(a, d)), F != null && y.push($s(a, F, D)))),
					(a = a.return));
			}
			y.length !== 0 && n.push({ event: r, listeners: y });
		}
		var Lw = /\r\n?/g,
			Uw = /\u0000|\uFFFD/g;
		function Oy(n) {
			return (typeof n == "string" ? n : "" + n)
				.replace(
					Lw,
					`
`,
				)
				.replace(Uw, "");
		}
		function zy(n, r) {
			return ((r = Oy(r)), Oy(n) === r);
		}
		function mt(n, r, a, s, c, d) {
			switch (a) {
				case "children":
					typeof s == "string"
						? r === "body" || (r === "textarea" && s === "") || Bi(n, s)
						: (typeof s == "number" || typeof s == "bigint") && r !== "body" && Bi(n, "" + s);
					break;
				case "className":
					Li(n, "class", s);
					break;
				case "tabIndex":
					Li(n, "tabindex", s);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					Li(n, a, s);
					break;
				case "style":
					ss(n, s, d);
					break;
				case "data":
					if (r !== "object") {
						Li(n, "data", s);
						break;
					}
				case "src":
				case "href":
					if (s === "" && (r !== "a" || a !== "href")) {
						n.removeAttribute(a);
						break;
					}
					if (s == null || typeof s == "function" || typeof s == "symbol" || typeof s == "boolean") {
						n.removeAttribute(a);
						break;
					}
					((s = ti("" + s)), n.setAttribute(a, s));
					break;
				case "action":
				case "formAction":
					if (typeof s == "function") {
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
					if (s == null || typeof s == "symbol" || typeof s == "boolean") {
						n.removeAttribute(a);
						break;
					}
					((s = ti("" + s)), n.setAttribute(a, s));
					break;
				case "onClick":
					s != null && (n.onclick = fr);
					break;
				case "onScroll":
					s != null && He("scroll", n);
					break;
				case "onScrollEnd":
					s != null && He("scrollend", n);
					break;
				case "dangerouslySetInnerHTML":
					if (s != null) {
						if (typeof s != "object" || !("__html" in s)) throw Error(l(61));
						if (((a = s.__html), a != null)) {
							if (c.children != null) throw Error(l(60));
							n.innerHTML = a;
						}
					}
					break;
				case "multiple":
					n.multiple = s && typeof s != "function" && typeof s != "symbol";
					break;
				case "muted":
					n.muted = s && typeof s != "function" && typeof s != "symbol";
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
					if (s == null || typeof s == "function" || typeof s == "boolean" || typeof s == "symbol") {
						n.removeAttribute("xlink:href");
						break;
					}
					((a = ti("" + s)), n.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a));
					break;
				case "contentEditable":
				case "spellCheck":
				case "draggable":
				case "value":
				case "autoReverse":
				case "externalResourcesRequired":
				case "focusable":
				case "preserveAlpha":
					s != null && typeof s != "function" && typeof s != "symbol"
						? n.setAttribute(a, "" + s)
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
					s && typeof s != "function" && typeof s != "symbol" ? n.setAttribute(a, "") : n.removeAttribute(a);
					break;
				case "capture":
				case "download":
					s === !0
						? n.setAttribute(a, "")
						: s !== !1 && s != null && typeof s != "function" && typeof s != "symbol"
							? n.setAttribute(a, s)
							: n.removeAttribute(a);
					break;
				case "cols":
				case "rows":
				case "size":
				case "span":
					s != null && typeof s != "function" && typeof s != "symbol" && !isNaN(s) && 1 <= s
						? n.setAttribute(a, s)
						: n.removeAttribute(a);
					break;
				case "rowSpan":
				case "start":
					s == null || typeof s == "function" || typeof s == "symbol" || isNaN(s)
						? n.removeAttribute(a)
						: n.setAttribute(a, s);
					break;
				case "popover":
					(He("beforetoggle", n), He("toggle", n), ba(n, "popover", s));
					break;
				case "xlinkActuate":
					Cr(n, "http://www.w3.org/1999/xlink", "xlink:actuate", s);
					break;
				case "xlinkArcrole":
					Cr(n, "http://www.w3.org/1999/xlink", "xlink:arcrole", s);
					break;
				case "xlinkRole":
					Cr(n, "http://www.w3.org/1999/xlink", "xlink:role", s);
					break;
				case "xlinkShow":
					Cr(n, "http://www.w3.org/1999/xlink", "xlink:show", s);
					break;
				case "xlinkTitle":
					Cr(n, "http://www.w3.org/1999/xlink", "xlink:title", s);
					break;
				case "xlinkType":
					Cr(n, "http://www.w3.org/1999/xlink", "xlink:type", s);
					break;
				case "xmlBase":
					Cr(n, "http://www.w3.org/XML/1998/namespace", "xml:base", s);
					break;
				case "xmlLang":
					Cr(n, "http://www.w3.org/XML/1998/namespace", "xml:lang", s);
					break;
				case "xmlSpace":
					Cr(n, "http://www.w3.org/XML/1998/namespace", "xml:space", s);
					break;
				case "is":
					ba(n, "is", s);
					break;
				case "innerText":
				case "textContent":
					break;
				default:
					(!(2 < a.length) || (a[0] !== "o" && a[0] !== "O") || (a[1] !== "n" && a[1] !== "N")) &&
						((a = Pc.get(a) || a), ba(n, a, s));
			}
		}
		function Ad(n, r, a, s, c, d) {
			switch (a) {
				case "style":
					ss(n, s, d);
					break;
				case "dangerouslySetInnerHTML":
					if (s != null) {
						if (typeof s != "object" || !("__html" in s)) throw Error(l(61));
						if (((a = s.__html), a != null)) {
							if (c.children != null) throw Error(l(60));
							n.innerHTML = a;
						}
					}
					break;
				case "children":
					typeof s == "string" ? Bi(n, s) : (typeof s == "number" || typeof s == "bigint") && Bi(n, "" + s);
					break;
				case "onScroll":
					s != null && He("scroll", n);
					break;
				case "onScrollEnd":
					s != null && He("scrollend", n);
					break;
				case "onClick":
					s != null && (n.onclick = fr);
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
					if (!hn.hasOwnProperty(a))
						e: {
							if (
								a[0] === "o" &&
								a[1] === "n" &&
								((c = a.endsWith("Capture")),
								(r = a.slice(2, c ? a.length - 7 : void 0)),
								(d = n[Yt] || null),
								(d = d != null ? d[a] : null),
								typeof d == "function" && n.removeEventListener(r, d, c),
								typeof s == "function")
							) {
								(typeof d != "function" &&
									d !== null &&
									(a in n ? (n[a] = null) : n.hasAttribute(a) && n.removeAttribute(a)),
									n.addEventListener(r, s, c));
								break e;
							}
							a in n ? (n[a] = s) : s === !0 ? n.setAttribute(a, "") : ba(n, a, s);
						}
			}
		}
		function En(n, r, a) {
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
					(He("error", n), He("load", n));
					var s = !1,
						c = !1,
						d;
					for (d in a)
						if (a.hasOwnProperty(d)) {
							var y = a[d];
							if (y != null)
								switch (d) {
									case "src":
										s = !0;
										break;
									case "srcSet":
										c = !0;
										break;
									case "children":
									case "dangerouslySetInnerHTML":
										throw Error(l(137, r));
									default:
										mt(n, r, d, y, a, null);
								}
						}
					(c && mt(n, r, "srcSet", a.srcSet, a, null), s && mt(n, r, "src", a.src, a, null));
					return;
				case "input":
					He("invalid", n);
					var T = (d = y = c = null),
						D = null,
						F = null;
					for (s in a)
						if (a.hasOwnProperty(s)) {
							var re = a[s];
							if (re != null)
								switch (s) {
									case "name":
										c = re;
										break;
									case "type":
										y = re;
										break;
									case "checked":
										D = re;
										break;
									case "defaultChecked":
										F = re;
										break;
									case "value":
										d = re;
										break;
									case "defaultValue":
										T = re;
										break;
									case "children":
									case "dangerouslySetInnerHTML":
										if (re != null) throw Error(l(137, r));
										break;
									default:
										mt(n, r, s, re, a, null);
								}
						}
					as(n, d, T, D, F, y, c, !1);
					return;
				case "select":
					(He("invalid", n), (s = y = d = null));
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
									s = T;
								default:
									mt(n, r, c, T, a, null);
							}
					((r = d), (a = y), (n.multiple = !!s), r != null ? ei(n, !!s, r, !1) : a != null && ei(n, !!s, a, !0));
					return;
				case "textarea":
					(He("invalid", n), (d = c = s = null));
					for (y in a)
						if (a.hasOwnProperty(y) && ((T = a[y]), T != null))
							switch (y) {
								case "value":
									s = T;
									break;
								case "defaultValue":
									c = T;
									break;
								case "children":
									d = T;
									break;
								case "dangerouslySetInnerHTML":
									if (T != null) throw Error(l(91));
									break;
								default:
									mt(n, r, y, T, a, null);
							}
					us(n, s, c, d);
					return;
				case "option":
					for (D in a)
						if (a.hasOwnProperty(D) && ((s = a[D]), s != null))
							switch (D) {
								case "selected":
									n.selected = s && typeof s != "function" && typeof s != "symbol";
									break;
								default:
									mt(n, r, D, s, a, null);
							}
					return;
				case "dialog":
					(He("beforetoggle", n), He("toggle", n), He("cancel", n), He("close", n));
					break;
				case "iframe":
				case "object":
					He("load", n);
					break;
				case "video":
				case "audio":
					for (s = 0; s < Us.length; s++) He(Us[s], n);
					break;
				case "image":
					(He("error", n), He("load", n));
					break;
				case "details":
					He("toggle", n);
					break;
				case "embed":
				case "source":
				case "link":
					(He("error", n), He("load", n));
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
					for (F in a)
						if (a.hasOwnProperty(F) && ((s = a[F]), s != null))
							switch (F) {
								case "children":
								case "dangerouslySetInnerHTML":
									throw Error(l(137, r));
								default:
									mt(n, r, F, s, a, null);
							}
					return;
				default:
					if ($r(r)) {
						for (re in a) a.hasOwnProperty(re) && ((s = a[re]), s !== void 0 && Ad(n, r, re, s, a, void 0));
						return;
					}
			}
			for (T in a) a.hasOwnProperty(T) && ((s = a[T]), s != null && mt(n, r, T, s, a, null));
		}
		function $w(n, r, a, s) {
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
						D = null,
						F = null,
						re = null;
					for (ee in a) {
						var ue = a[ee];
						if (a.hasOwnProperty(ee) && ue != null)
							switch (ee) {
								case "checked":
									break;
								case "value":
									break;
								case "defaultValue":
									D = ue;
								default:
									s.hasOwnProperty(ee) || mt(n, r, ee, null, s, ue);
							}
					}
					for (var X in s) {
						var ee = s[X];
						if (((ue = a[X]), s.hasOwnProperty(X) && (ee != null || ue != null)))
							switch (X) {
								case "type":
									d = ee;
									break;
								case "name":
									c = ee;
									break;
								case "checked":
									F = ee;
									break;
								case "defaultChecked":
									re = ee;
									break;
								case "value":
									y = ee;
									break;
								case "defaultValue":
									T = ee;
									break;
								case "children":
								case "dangerouslySetInnerHTML":
									if (ee != null) throw Error(l(137, r));
									break;
								default:
									ee !== ue && mt(n, r, X, ee, s, ue);
							}
					}
					Cn(n, y, T, D, F, re, d, c);
					return;
				case "select":
					ee = y = T = X = null;
					for (d in a)
						if (((D = a[d]), a.hasOwnProperty(d) && D != null))
							switch (d) {
								case "value":
									break;
								case "multiple":
									ee = D;
								default:
									s.hasOwnProperty(d) || mt(n, r, d, null, s, D);
							}
					for (c in s)
						if (((d = s[c]), (D = a[c]), s.hasOwnProperty(c) && (d != null || D != null)))
							switch (c) {
								case "value":
									X = d;
									break;
								case "defaultValue":
									T = d;
									break;
								case "multiple":
									y = d;
								default:
									d !== D && mt(n, r, c, d, s, D);
							}
					((r = T),
						(a = y),
						(s = ee),
						X != null
							? ei(n, !!a, X, !1)
							: !!s != !!a && (r != null ? ei(n, !!a, r, !0) : ei(n, !!a, a ? [] : "", !1)));
					return;
				case "textarea":
					ee = X = null;
					for (T in a)
						if (((c = a[T]), a.hasOwnProperty(T) && c != null && !s.hasOwnProperty(T)))
							switch (T) {
								case "value":
									break;
								case "children":
									break;
								default:
									mt(n, r, T, null, s, c);
							}
					for (y in s)
						if (((c = s[y]), (d = a[y]), s.hasOwnProperty(y) && (c != null || d != null)))
							switch (y) {
								case "value":
									X = c;
									break;
								case "defaultValue":
									ee = c;
									break;
								case "children":
									break;
								case "dangerouslySetInnerHTML":
									if (c != null) throw Error(l(91));
									break;
								default:
									c !== d && mt(n, r, y, c, s, d);
							}
					Ml(n, X, ee);
					return;
				case "option":
					for (var Se in a)
						if (((X = a[Se]), a.hasOwnProperty(Se) && X != null && !s.hasOwnProperty(Se)))
							switch (Se) {
								case "selected":
									n.selected = !1;
									break;
								default:
									mt(n, r, Se, null, s, X);
							}
					for (D in s)
						if (((X = s[D]), (ee = a[D]), s.hasOwnProperty(D) && X !== ee && (X != null || ee != null)))
							switch (D) {
								case "selected":
									n.selected = X && typeof X != "function" && typeof X != "symbol";
									break;
								default:
									mt(n, r, D, X, s, ee);
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
					for (var Ce in a)
						((X = a[Ce]), a.hasOwnProperty(Ce) && X != null && !s.hasOwnProperty(Ce) && mt(n, r, Ce, null, s, X));
					for (F in s)
						if (((X = s[F]), (ee = a[F]), s.hasOwnProperty(F) && X !== ee && (X != null || ee != null)))
							switch (F) {
								case "children":
								case "dangerouslySetInnerHTML":
									if (X != null) throw Error(l(137, r));
									break;
								default:
									mt(n, r, F, X, s, ee);
							}
					return;
				default:
					if ($r(r)) {
						for (var vt in a)
							((X = a[vt]),
								a.hasOwnProperty(vt) && X !== void 0 && !s.hasOwnProperty(vt) && Ad(n, r, vt, void 0, s, X));
						for (re in s)
							((X = s[re]),
								(ee = a[re]),
								!s.hasOwnProperty(re) || X === ee || (X === void 0 && ee === void 0) || Ad(n, r, re, X, s, ee));
						return;
					}
			}
			for (var Z in a)
				((X = a[Z]), a.hasOwnProperty(Z) && X != null && !s.hasOwnProperty(Z) && mt(n, r, Z, null, s, X));
			for (ue in s)
				((X = s[ue]),
					(ee = a[ue]),
					!s.hasOwnProperty(ue) || X === ee || (X == null && ee == null) || mt(n, r, ue, X, s, ee));
		}
		function Dy(n) {
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
		function Bw() {
			if (typeof performance.getEntriesByType == "function") {
				for (var n = 0, r = 0, a = performance.getEntriesByType("resource"), s = 0; s < a.length; s++) {
					var c = a[s],
						d = c.transferSize,
						y = c.initiatorType,
						T = c.duration;
					if (d && T && Dy(y)) {
						for (y = 0, T = c.responseEnd, s += 1; s < a.length; s++) {
							var D = a[s],
								F = D.startTime;
							if (F > T) break;
							var re = D.transferSize,
								ue = D.initiatorType;
							re && Dy(ue) && ((D = D.responseEnd), (y += re * (D < T ? 1 : (T - F) / (D - F))));
						}
						if ((--s, (r += (8 * (d + y)) / (c.duration / 1e3)), n++, 10 < n)) break;
					}
				}
				if (0 < n) return r / n / 1e6;
			}
			return navigator.connection && ((n = navigator.connection.downlink), typeof n == "number") ? n : 5;
		}
		var Rd = null,
			Cd = null;
		function xo(n) {
			return n.nodeType === 9 ? n : n.ownerDocument;
		}
		function jy(n) {
			switch (n) {
				case "http://www.w3.org/2000/svg":
					return 1;
				case "http://www.w3.org/1998/Math/MathML":
					return 2;
				default:
					return 0;
			}
		}
		function qy(n, r) {
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
		function kd(n, r) {
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
		var Md = null;
		function Vw() {
			var n = window.event;
			return n && n.type === "popstate" ? (n === Md ? !1 : ((Md = n), !0)) : ((Md = null), !1);
		}
		var Iy = typeof setTimeout == "function" ? setTimeout : void 0,
			Zw = typeof clearTimeout == "function" ? clearTimeout : void 0,
			Ly = typeof Promise == "function" ? Promise : void 0,
			Hw =
				typeof queueMicrotask == "function"
					? queueMicrotask
					: typeof Ly < "u"
						? function (n) {
								return Ly.resolve(null).then(n).catch(Pw);
							}
						: Iy;
		function Pw(n) {
			setTimeout(function () {
				throw n;
			});
		}
		function na(n) {
			return n === "head";
		}
		function Uy(n, r) {
			var a = r,
				s = 0;
			do {
				var c = a.nextSibling;
				if ((n.removeChild(a), c && c.nodeType === 8))
					if (((a = c.data), a === "/$" || a === "/&")) {
						if (s === 0) {
							(n.removeChild(c), zu(r));
							return;
						}
						s--;
					} else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&") s++;
					else if (a === "html") Bs(n.ownerDocument.documentElement);
					else if (a === "head") {
						((a = n.ownerDocument.head), Bs(a));
						for (var d = a.firstChild; d; ) {
							var y = d.nextSibling,
								T = d.nodeName;
							(d[Wr] ||
								T === "SCRIPT" ||
								T === "STYLE" ||
								(T === "LINK" && d.rel.toLowerCase() === "stylesheet") ||
								a.removeChild(d),
								(d = y));
						}
					} else a === "body" && Bs(n.ownerDocument.body);
				a = c;
			} while (a);
			zu(r);
		}
		function $y(n, r) {
			var a = n;
			n = 0;
			do {
				var s = a.nextSibling;
				if (
					(a.nodeType === 1
						? r
							? ((a._stashedDisplay = a.style.display), (a.style.display = "none"))
							: ((a.style.display = a._stashedDisplay || ""),
								a.getAttribute("style") === "" && a.removeAttribute("style"))
						: a.nodeType === 3 &&
							(r ? ((a._stashedText = a.nodeValue), (a.nodeValue = "")) : (a.nodeValue = a._stashedText || "")),
					s && s.nodeType === 8)
				)
					if (((a = s.data), a === "/$")) {
						if (n === 0) break;
						n--;
					} else (a !== "$" && a !== "$?" && a !== "$~" && a !== "$!") || n++;
				a = s;
			} while (a);
		}
		function Nd(n) {
			var r = n.firstChild;
			for (r && r.nodeType === 10 && (r = r.nextSibling); r; ) {
				var a = r;
				switch (((r = r.nextSibling), a.nodeName)) {
					case "HTML":
					case "HEAD":
					case "BODY":
						(Nd(a), Lr(a));
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
		function Qw(n, r, a, s) {
			for (; n.nodeType === 1; ) {
				var c = a;
				if (n.nodeName.toLowerCase() !== r.toLowerCase()) {
					if (!s && (n.nodeName !== "INPUT" || n.type !== "hidden")) break;
				} else if (s) {
					if (!n[Wr])
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
				if (((n = br(n.nextSibling)), n === null)) break;
			}
			return null;
		}
		function Kw(n, r, a) {
			if (r === "") return null;
			for (; n.nodeType !== 3; )
				if (
					((n.nodeType !== 1 || n.nodeName !== "INPUT" || n.type !== "hidden") && !a) ||
					((n = br(n.nextSibling)), n === null)
				)
					return null;
			return n;
		}
		function By(n, r) {
			for (; n.nodeType !== 8; )
				if (
					((n.nodeType !== 1 || n.nodeName !== "INPUT" || n.type !== "hidden") && !r) ||
					((n = br(n.nextSibling)), n === null)
				)
					return null;
			return n;
		}
		function Od(n) {
			return n.data === "$?" || n.data === "$~";
		}
		function zd(n) {
			return n.data === "$!" || (n.data === "$?" && n.ownerDocument.readyState !== "loading");
		}
		function Yw(n, r) {
			var a = n.ownerDocument;
			if (n.data === "$~") n._reactRetry = r;
			else if (n.data !== "$?" || a.readyState !== "loading") r();
			else {
				var s = function () {
					(r(), a.removeEventListener("DOMContentLoaded", s));
				};
				(a.addEventListener("DOMContentLoaded", s), (n._reactRetry = s));
			}
		}
		function br(n) {
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
		var Dd = null;
		function Vy(n) {
			n = n.nextSibling;
			for (var r = 0; n; ) {
				if (n.nodeType === 8) {
					var a = n.data;
					if (a === "/$" || a === "/&") {
						if (r === 0) return br(n.nextSibling);
						r--;
					} else (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") || r++;
				}
				n = n.nextSibling;
			}
			return null;
		}
		function Zy(n) {
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
		function Hy(n, r, a) {
			switch (((r = xo(a)), n)) {
				case "html":
					if (((n = r.documentElement), !n)) throw Error(l(452));
					return n;
				case "head":
					if (((n = r.head), !n)) throw Error(l(453));
					return n;
				case "body":
					if (((n = r.body), !n)) throw Error(l(454));
					return n;
				default:
					throw Error(l(451));
			}
		}
		function Bs(n) {
			for (var r = n.attributes; r.length; ) n.removeAttributeNode(r[0]);
			Lr(n);
		}
		var _r = new Map(),
			Py = new Set();
		function Ao(n) {
			return typeof n.getRootNode == "function" ? n.getRootNode() : n.nodeType === 9 ? n : n.ownerDocument;
		}
		var bi = P.d;
		P.d = { f: Fw, r: Gw, D: Xw, C: Jw, L: Ww, m: e1, X: n1, S: t1, M: r1 };
		function Fw() {
			var n = bi.f(),
				r = yo();
			return n || r;
		}
		function Gw(n) {
			var r = ge(n);
			r !== null && r.tag === 5 && r.type === "form" ? cg(r) : bi.r(n);
		}
		var Mu = typeof document > "u" ? null : document;
		function Qy(n, r, a) {
			var s = Mu;
			if (s && typeof r == "string" && r) {
				var c = pn(r);
				((c = 'link[rel="' + n + '"][href="' + c + '"]'),
					typeof a == "string" && (c += '[crossorigin="' + a + '"]'),
					Py.has(c) ||
						(Py.add(c),
						(n = { rel: n, crossOrigin: a, href: r }),
						s.querySelector(c) === null &&
							((r = s.createElement("link")), En(r, "link", n), Ue(r), s.head.appendChild(r))));
			}
		}
		function Xw(n) {
			(bi.D(n), Qy("dns-prefetch", n, null));
		}
		function Jw(n, r) {
			(bi.C(n, r), Qy("preconnect", n, r));
		}
		function Ww(n, r, a) {
			bi.L(n, r, a);
			var s = Mu;
			if (s && n && r) {
				var c = 'link[rel="preload"][as="' + pn(r) + '"]';
				r === "image" && a && a.imageSrcSet
					? ((c += '[imagesrcset="' + pn(a.imageSrcSet) + '"]'),
						typeof a.imageSizes == "string" && (c += '[imagesizes="' + pn(a.imageSizes) + '"]'))
					: (c += '[href="' + pn(n) + '"]');
				var d = c;
				switch (r) {
					case "style":
						d = Nu(n);
						break;
					case "script":
						d = Ou(n);
				}
				_r.has(d) ||
					((n = p({ rel: "preload", href: r === "image" && a && a.imageSrcSet ? void 0 : n, as: r }, a)),
					_r.set(d, n),
					s.querySelector(c) !== null ||
						(r === "style" && s.querySelector(Vs(d))) ||
						(r === "script" && s.querySelector(Zs(d))) ||
						((r = s.createElement("link")), En(r, "link", n), Ue(r), s.head.appendChild(r)));
			}
		}
		function e1(n, r) {
			bi.m(n, r);
			var a = Mu;
			if (a && n) {
				var s = r && typeof r.as == "string" ? r.as : "script",
					c = 'link[rel="modulepreload"][as="' + pn(s) + '"][href="' + pn(n) + '"]',
					d = c;
				switch (s) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script":
						d = Ou(n);
				}
				if (!_r.has(d) && ((n = p({ rel: "modulepreload", href: n }, r)), _r.set(d, n), a.querySelector(c) === null)) {
					switch (s) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script":
							if (a.querySelector(Zs(d))) return;
					}
					((s = a.createElement("link")), En(s, "link", n), Ue(s), a.head.appendChild(s));
				}
			}
		}
		function t1(n, r, a) {
			bi.S(n, r, a);
			var s = Mu;
			if (s && n) {
				var c = Ye(s).hoistableStyles,
					d = Nu(n);
				r = r || "default";
				var y = c.get(d);
				if (!y) {
					var T = { loading: 0, preload: null };
					if ((y = s.querySelector(Vs(d)))) T.loading = 5;
					else {
						((n = p({ rel: "stylesheet", href: n, "data-precedence": r }, a)), (a = _r.get(d)) && jd(n, a));
						var D = (y = s.createElement("link"));
						(Ue(D),
							En(D, "link", n),
							(D._p = new Promise(function (F, re) {
								((D.onload = F), (D.onerror = re));
							})),
							D.addEventListener("load", function () {
								T.loading |= 1;
							}),
							D.addEventListener("error", function () {
								T.loading |= 2;
							}),
							(T.loading |= 4),
							Ro(y, r, s));
					}
					((y = { type: "stylesheet", instance: y, count: 1, state: T }), c.set(d, y));
				}
			}
		}
		function n1(n, r) {
			bi.X(n, r);
			var a = Mu;
			if (a && n) {
				var s = Ye(a).hoistableScripts,
					c = Ou(n),
					d = s.get(c);
				d ||
					((d = a.querySelector(Zs(c))),
					d ||
						((n = p({ src: n, async: !0 }, r)),
						(r = _r.get(c)) && qd(n, r),
						(d = a.createElement("script")),
						Ue(d),
						En(d, "link", n),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					s.set(c, d));
			}
		}
		function r1(n, r) {
			bi.M(n, r);
			var a = Mu;
			if (a && n) {
				var s = Ye(a).hoistableScripts,
					c = Ou(n),
					d = s.get(c);
				d ||
					((d = a.querySelector(Zs(c))),
					d ||
						((n = p({ src: n, async: !0, type: "module" }, r)),
						(r = _r.get(c)) && qd(n, r),
						(d = a.createElement("script")),
						Ue(d),
						En(d, "link", n),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					s.set(c, d));
			}
		}
		function Ky(n, r, a, s) {
			var c = (c = we.current) ? Ao(c) : null;
			if (!c) throw Error(l(446));
			switch (n) {
				case "meta":
				case "title":
					return null;
				case "style":
					return typeof a.precedence == "string" && typeof a.href == "string"
						? ((r = Nu(a.href)),
							(a = Ye(c).hoistableStyles),
							(s = a.get(r)),
							s || ((s = { type: "style", instance: null, count: 0, state: null }), a.set(r, s)),
							s)
						: { type: "void", instance: null, count: 0, state: null };
				case "link":
					if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
						n = Nu(a.href);
						var d = Ye(c).hoistableStyles,
							y = d.get(n);
						if (
							(y ||
								((c = c.ownerDocument || c),
								(y = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }),
								d.set(n, y),
								(d = c.querySelector(Vs(n))) && !d._p && ((y.instance = d), (y.state.loading = 5)),
								_r.has(n) ||
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
									_r.set(n, a),
									d || i1(c, n, a, y.state))),
							r && s === null)
						)
							throw Error(l(528, ""));
						return y;
					}
					if (r && s !== null) throw Error(l(529, ""));
					return null;
				case "script":
					return (
						(r = a.async),
						(a = a.src),
						typeof a == "string" && r && typeof r != "function" && typeof r != "symbol"
							? ((r = Ou(a)),
								(a = Ye(c).hoistableScripts),
								(s = a.get(r)),
								s || ((s = { type: "script", instance: null, count: 0, state: null }), a.set(r, s)),
								s)
							: { type: "void", instance: null, count: 0, state: null }
					);
				default:
					throw Error(l(444, n));
			}
		}
		function Nu(n) {
			return 'href="' + pn(n) + '"';
		}
		function Vs(n) {
			return 'link[rel="stylesheet"][' + n + "]";
		}
		function Yy(n) {
			return p({}, n, { "data-precedence": n.precedence, precedence: null });
		}
		function i1(n, r, a, s) {
			n.querySelector('link[rel="preload"][as="style"][' + r + "]")
				? (s.loading = 1)
				: ((r = n.createElement("link")),
					(s.preload = r),
					r.addEventListener("load", function () {
						return (s.loading |= 1);
					}),
					r.addEventListener("error", function () {
						return (s.loading |= 2);
					}),
					En(r, "link", a),
					Ue(r),
					n.head.appendChild(r));
		}
		function Ou(n) {
			return '[src="' + pn(n) + '"]';
		}
		function Zs(n) {
			return "script[async]" + n;
		}
		function Fy(n, r, a) {
			if ((r.count++, r.instance === null))
				switch (r.type) {
					case "style":
						var s = n.querySelector('style[data-href~="' + pn(a.href) + '"]');
						if (s) return ((r.instance = s), Ue(s), s);
						var c = p({}, a, { "data-href": a.href, "data-precedence": a.precedence, href: null, precedence: null });
						return (
							(s = (n.ownerDocument || n).createElement("style")),
							Ue(s),
							En(s, "style", c),
							Ro(s, a.precedence, n),
							(r.instance = s)
						);
					case "stylesheet":
						c = Nu(a.href);
						var d = n.querySelector(Vs(c));
						if (d) return ((r.state.loading |= 4), (r.instance = d), Ue(d), d);
						((s = Yy(a)), (c = _r.get(c)) && jd(s, c), (d = (n.ownerDocument || n).createElement("link")), Ue(d));
						var y = d;
						return (
							(y._p = new Promise(function (T, D) {
								((y.onload = T), (y.onerror = D));
							})),
							En(d, "link", s),
							(r.state.loading |= 4),
							Ro(d, a.precedence, n),
							(r.instance = d)
						);
					case "script":
						return (
							(d = Ou(a.src)),
							(c = n.querySelector(Zs(d)))
								? ((r.instance = c), Ue(c), c)
								: ((s = a),
									(c = _r.get(d)) && ((s = p({}, a)), qd(s, c)),
									(n = n.ownerDocument || n),
									(c = n.createElement("script")),
									Ue(c),
									En(c, "link", s),
									n.head.appendChild(c),
									(r.instance = c))
						);
					case "void":
						return null;
					default:
						throw Error(l(443, r.type));
				}
			else
				r.type === "stylesheet" &&
					(r.state.loading & 4) === 0 &&
					((s = r.instance), (r.state.loading |= 4), Ro(s, a.precedence, n));
			return r.instance;
		}
		function Ro(n, r, a) {
			for (
				var s = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
					c = s.length ? s[s.length - 1] : null,
					d = c,
					y = 0;
				y < s.length;
				y++
			) {
				var T = s[y];
				if (T.dataset.precedence === r) d = T;
				else if (d !== c) break;
			}
			d
				? d.parentNode.insertBefore(n, d.nextSibling)
				: ((r = a.nodeType === 9 ? a.head : a), r.insertBefore(n, r.firstChild));
		}
		function jd(n, r) {
			((n.crossOrigin ??= r.crossOrigin), (n.referrerPolicy ??= r.referrerPolicy), (n.title ??= r.title));
		}
		function qd(n, r) {
			((n.crossOrigin ??= r.crossOrigin), (n.referrerPolicy ??= r.referrerPolicy), (n.integrity ??= r.integrity));
		}
		var Co = null;
		function Gy(n, r, a) {
			if (Co === null) {
				var s = new Map(),
					c = (Co = new Map());
				c.set(a, s);
			} else ((c = Co), (s = c.get(a)), s || ((s = new Map()), c.set(a, s)));
			if (s.has(n)) return s;
			for (s.set(n, null), a = a.getElementsByTagName(n), c = 0; c < a.length; c++) {
				var d = a[c];
				if (
					!(d[Wr] || d[dt] || (n === "link" && d.getAttribute("rel") === "stylesheet")) &&
					d.namespaceURI !== "http://www.w3.org/2000/svg"
				) {
					var y = d.getAttribute(r) || "";
					y = n + y;
					var T = s.get(y);
					T ? T.push(d) : s.set(y, [d]);
				}
			}
			return s;
		}
		function Xy(n, r, a) {
			((n = n.ownerDocument || n), n.head.insertBefore(a, r === "title" ? n.querySelector("head > title") : null));
		}
		function a1(n, r, a) {
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
		function Jy(n) {
			return !(n.type === "stylesheet" && (n.state.loading & 3) === 0);
		}
		function u1(n, r, a, s) {
			if (
				a.type === "stylesheet" &&
				(typeof s.media != "string" || matchMedia(s.media).matches !== !1) &&
				(a.state.loading & 4) === 0
			) {
				if (a.instance === null) {
					var c = Nu(s.href),
						d = r.querySelector(Vs(c));
					if (d) {
						((r = d._p),
							r !== null &&
								typeof r == "object" &&
								typeof r.then == "function" &&
								(n.count++, (n = ko.bind(n)), r.then(n, n)),
							(a.state.loading |= 4),
							(a.instance = d),
							Ue(d));
						return;
					}
					((d = r.ownerDocument || r), (s = Yy(s)), (c = _r.get(c)) && jd(s, c), (d = d.createElement("link")), Ue(d));
					var y = d;
					((y._p = new Promise(function (T, D) {
						((y.onload = T), (y.onerror = D));
					})),
						En(d, "link", s),
						(a.instance = d));
				}
				(n.stylesheets === null && (n.stylesheets = new Map()),
					n.stylesheets.set(a, r),
					(r = a.state.preload) &&
						(a.state.loading & 3) === 0 &&
						(n.count++, (a = ko.bind(n)), r.addEventListener("load", a), r.addEventListener("error", a)));
			}
		}
		var Id = 0;
		function s1(n, r) {
			return (
				n.stylesheets && n.count === 0 && No(n, n.stylesheets),
				0 < n.count || 0 < n.imgCount
					? function (a) {
							var s = setTimeout(function () {
								if ((n.stylesheets && No(n, n.stylesheets), n.unsuspend)) {
									var d = n.unsuspend;
									((n.unsuspend = null), d());
								}
							}, 6e4 + r);
							0 < n.imgBytes && Id === 0 && (Id = 62500 * Bw());
							var c = setTimeout(
								function () {
									if (
										((n.waitingForImages = !1), n.count === 0 && (n.stylesheets && No(n, n.stylesheets), n.unsuspend))
									) {
										var d = n.unsuspend;
										((n.unsuspend = null), d());
									}
								},
								(n.imgBytes > Id ? 50 : 800) + r,
							);
							return (
								(n.unsuspend = a),
								function () {
									((n.unsuspend = null), clearTimeout(s), clearTimeout(c));
								}
							);
						}
					: null
			);
		}
		function ko() {
			if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
				if (this.stylesheets) No(this, this.stylesheets);
				else if (this.unsuspend) {
					var n = this.unsuspend;
					((this.unsuspend = null), n());
				}
			}
		}
		var Mo = null;
		function No(n, r) {
			((n.stylesheets = null),
				n.unsuspend !== null && (n.count++, (Mo = new Map()), r.forEach(l1, n), (Mo = null), ko.call(n)));
		}
		function l1(n, r) {
			if (!(r.state.loading & 4)) {
				var a = Mo.get(n);
				if (a) var s = a.get(null);
				else {
					((a = new Map()), Mo.set(n, a));
					for (var c = n.querySelectorAll("link[data-precedence],style[data-precedence]"), d = 0; d < c.length; d++) {
						var y = c[d];
						(y.nodeName === "LINK" || y.getAttribute("media") !== "not all") &&
							(a.set(y.dataset.precedence, y), (s = y));
					}
					s && a.set(null, s);
				}
				((c = r.instance),
					(y = c.getAttribute("data-precedence")),
					(d = a.get(y) || s),
					d === s && a.set(null, c),
					a.set(y, c),
					this.count++,
					(s = ko.bind(this)),
					c.addEventListener("load", s),
					c.addEventListener("error", s),
					d
						? d.parentNode.insertBefore(c, d.nextSibling)
						: ((n = n.nodeType === 9 ? n.head : n), n.insertBefore(c, n.firstChild)),
					(r.state.loading |= 4));
			}
		}
		var Hs = { $$typeof: C, Provider: null, Consumer: null, _currentValue: ve, _currentValue2: ve, _threadCount: 0 };
		function o1(n, r, a, s, c, d, y, T, D) {
			((this.tag = 1),
				(this.containerInfo = n),
				(this.pingCache = this.current = this.pendingChildren = null),
				(this.timeoutHandle = -1),
				(this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null),
				(this.callbackPriority = 0),
				(this.expirationTimes = dn(-1)),
				(this.entangledLanes =
					this.shellSuspendCounter =
					this.errorRecoveryDisabledLanes =
					this.expiredLanes =
					this.warmLanes =
					this.pingedLanes =
					this.suspendedLanes =
					this.pendingLanes =
						0),
				(this.entanglements = dn(0)),
				(this.hiddenUpdates = dn(null)),
				(this.identifierPrefix = s),
				(this.onUncaughtError = c),
				(this.onCaughtError = d),
				(this.onRecoverableError = y),
				(this.pooledCache = null),
				(this.pooledCacheLanes = 0),
				(this.formState = D),
				(this.incompleteTransitions = new Map()));
		}
		function c1(n, r, a, s, c, d, y, T, D, F, re, ue) {
			return (
				(n = new o1(n, r, a, y, D, F, re, ue, T)),
				(r = 1),
				d === !0 && (r |= 24),
				(d = rr(3, null, null, r)),
				(n.current = d),
				(d.stateNode = n),
				(r = yf()),
				r.refCount++,
				(n.pooledCache = r),
				r.refCount++,
				(d.memoizedState = { element: s, isDehydrated: a, cache: r }),
				Sf(d),
				n
			);
		}
		function f1(n) {
			return n ? ((n = ou), n) : ou;
		}
		function Wy(n, r, a, s, c, d) {
			((c = f1(c)),
				s.context === null ? (s.context = c) : (s.pendingContext = c),
				(s = za(r)),
				(s.payload = { element: a }),
				(d = d === void 0 ? null : d),
				d !== null && (s.callback = d),
				(a = Da(n, s, r)),
				a !== null && (Qn(a, n, r), ws(a, n, r)));
		}
		function e0(n, r) {
			if (((n = n.memoizedState), n !== null && n.dehydrated !== null)) {
				var a = n.retryLane;
				n.retryLane = a !== 0 && a < r ? a : r;
			}
		}
		function Ld(n, r) {
			(e0(n, r), (n = n.alternate) && e0(n, r));
		}
		function t0(n) {
			if (n.tag === 13 || n.tag === 31) {
				var r = Ta(n, 67108864);
				(r !== null && Qn(r, n, 67108864), Ld(n, 67108864));
			}
		}
		function n0(n) {
			if (n.tag === 13 || n.tag === 31) {
				var r = pr();
				r = qi(r);
				var a = Ta(n, r);
				(a !== null && Qn(a, n, r), Ld(n, r));
			}
		}
		var Oo = !0;
		function d1(n, r, a, s) {
			var c = V.T;
			V.T = null;
			var d = P.p;
			try {
				((P.p = 2), Ud(n, r, a, s));
			} finally {
				((P.p = d), (V.T = c));
			}
		}
		function h1(n, r, a, s) {
			var c = V.T;
			V.T = null;
			var d = P.p;
			try {
				((P.p = 8), Ud(n, r, a, s));
			} finally {
				((P.p = d), (V.T = c));
			}
		}
		function Ud(n, r, a, s) {
			if (Oo) {
				var c = $d(s);
				if (c === null) (xd(n, r, s, zo, a), i0(n, s));
				else if (v1(c, n, r, a, s)) s.stopPropagation();
				else if ((i0(n, s), r & 4 && -1 < m1.indexOf(n))) {
					for (; c !== null; ) {
						var d = ge(c);
						if (d !== null)
							switch (d.tag) {
								case 3:
									if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
										var y = yn(d.pendingLanes);
										if (y !== 0) {
											var T = d;
											for (T.pendingLanes |= 2, T.entangledLanes |= 2; y; ) {
												var D = 1 << (31 - qt(y));
												((T.entanglements[1] |= D), (y &= ~D));
											}
											(pi(d), (it & 6) === 0 && ((vo = Ne() + 500), Ls(0, !1)));
										}
									}
									break;
								case 31:
								case 13:
									((T = Ta(d, 2)), T !== null && Qn(T, d, 2), yo(), Ld(d, 2));
							}
						if (((d = $d(s)), d === null && xd(n, r, s, zo, a), d === c)) break;
						c = d;
					}
					c !== null && s.stopPropagation();
				} else xd(n, r, s, null, a);
			}
		}
		function $d(n) {
			return ((n = Sa(n)), Bd(n));
		}
		var zo = null;
		function Bd(n) {
			if (((zo = null), (n = W(n)), n !== null)) {
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
			return ((zo = n), null);
		}
		function r0(n) {
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
					switch (ft()) {
						case Ot:
							return 2;
						case rt:
							return 8;
						case Et:
						case On:
							return 32;
						case Xn:
							return 268435456;
						default:
							return 32;
					}
				default:
					return 32;
			}
		}
		var Vd = !1,
			ra = null,
			ia = null,
			aa = null,
			Ps = new Map(),
			Qs = new Map(),
			ua = [],
			m1 =
				"mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
					" ",
				);
		function i0(n, r) {
			switch (n) {
				case "focusin":
				case "focusout":
					ra = null;
					break;
				case "dragenter":
				case "dragleave":
					ia = null;
					break;
				case "mouseover":
				case "mouseout":
					aa = null;
					break;
				case "pointerover":
				case "pointerout":
					Ps.delete(r.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture":
					Qs.delete(r.pointerId);
			}
		}
		function Ks(n, r, a, s, c, d) {
			return n === null || n.nativeEvent !== d
				? ((n = { blockedOn: r, domEventName: a, eventSystemFlags: s, nativeEvent: d, targetContainers: [c] }),
					r !== null && ((r = ge(r)), r !== null && t0(r)),
					n)
				: ((n.eventSystemFlags |= s), (r = n.targetContainers), c !== null && r.indexOf(c) === -1 && r.push(c), n);
		}
		function v1(n, r, a, s, c) {
			switch (r) {
				case "focusin":
					return ((ra = Ks(ra, n, r, a, s, c)), !0);
				case "dragenter":
					return ((ia = Ks(ia, n, r, a, s, c)), !0);
				case "mouseover":
					return ((aa = Ks(aa, n, r, a, s, c)), !0);
				case "pointerover":
					var d = c.pointerId;
					return (Ps.set(d, Ks(Ps.get(d) || null, n, r, a, s, c)), !0);
				case "gotpointercapture":
					return ((d = c.pointerId), Qs.set(d, Ks(Qs.get(d) || null, n, r, a, s, c)), !0);
			}
			return !1;
		}
		function a0(n) {
			var r = W(n.target);
			if (r !== null) {
				var a = f(r);
				if (a !== null) {
					if (((r = a.tag), r === 13)) {
						if (((r = h(a)), r !== null)) {
							((n.blockedOn = r),
								Ir(n.priority, function () {
									n0(a);
								}));
							return;
						}
					} else if (r === 31) {
						if (((r = m(a)), r !== null)) {
							((n.blockedOn = r),
								Ir(n.priority, function () {
									n0(a);
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
		function Do(n) {
			if (n.blockedOn !== null) return !1;
			for (var r = n.targetContainers; 0 < r.length; ) {
				var a = $d(n.nativeEvent);
				if (a === null) {
					a = n.nativeEvent;
					var s = new a.constructor(a.type, a);
					((_a = s), a.target.dispatchEvent(s), (_a = null));
				} else return ((r = ge(a)), r !== null && t0(r), (n.blockedOn = a), !1);
				r.shift();
			}
			return !0;
		}
		function u0(n, r, a) {
			Do(n) && a.delete(r);
		}
		function g1() {
			((Vd = !1),
				ra !== null && Do(ra) && (ra = null),
				ia !== null && Do(ia) && (ia = null),
				aa !== null && Do(aa) && (aa = null),
				Ps.forEach(u0),
				Qs.forEach(u0));
		}
		function jo(n, r) {
			n.blockedOn === r &&
				((n.blockedOn = null), Vd || ((Vd = !0), t.unstable_scheduleCallback(t.unstable_NormalPriority, g1)));
		}
		var qo = null;
		function s0(n) {
			qo !== n &&
				((qo = n),
				t.unstable_scheduleCallback(t.unstable_NormalPriority, function () {
					qo === n && (qo = null);
					for (var r = 0; r < n.length; r += 3) {
						var a = n[r],
							s = n[r + 1],
							c = n[r + 2];
						if (typeof s != "function") {
							if (Bd(s || a) === null) continue;
							break;
						}
						var d = ge(a);
						d !== null &&
							(n.splice(r, 3), (r -= 3), Bf(d, { pending: !0, data: c, method: a.method, action: s }, s, c));
					}
				}));
		}
		function zu(n) {
			function r(D) {
				return jo(D, n);
			}
			(ra !== null && jo(ra, n), ia !== null && jo(ia, n), aa !== null && jo(aa, n), Ps.forEach(r), Qs.forEach(r));
			for (var a = 0; a < ua.length; a++) {
				var s = ua[a];
				s.blockedOn === n && (s.blockedOn = null);
			}
			for (; 0 < ua.length && ((a = ua[0]), a.blockedOn === null); ) (a0(a), a.blockedOn === null && ua.shift());
			if (((a = (n.ownerDocument || n).$$reactFormReplay), a != null))
				for (s = 0; s < a.length; s += 3) {
					var c = a[s],
						d = a[s + 1],
						y = c[Yt] || null;
					if (typeof d == "function") y || s0(a);
					else if (y) {
						var T = null;
						if (d && d.hasAttribute("formAction")) {
							if (((c = d), (y = d[Yt] || null))) T = y.formAction;
							else if (Bd(c) !== null) continue;
						} else T = y.action;
						(typeof T == "function" ? (a[s + 1] = T) : (a.splice(s, 3), (s -= 3)), s0(a));
					}
				}
		}
		function y1() {
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
				(c !== null && (c(), (c = null)), s || setTimeout(a, 20));
			}
			function a() {
				if (!s && !navigation.transition) {
					var d = navigation.currentEntry;
					d &&
						d.url != null &&
						navigation.navigate(d.url, { state: d.getState(), info: "react-transition", history: "replace" });
				}
			}
			if (typeof navigation == "object") {
				var s = !1,
					c = null;
				return (
					navigation.addEventListener("navigate", n),
					navigation.addEventListener("navigatesuccess", r),
					navigation.addEventListener("navigateerror", r),
					setTimeout(a, 100),
					function () {
						((s = !0),
							navigation.removeEventListener("navigate", n),
							navigation.removeEventListener("navigatesuccess", r),
							navigation.removeEventListener("navigateerror", r),
							c !== null && (c(), (c = null)));
					}
				);
			}
		}
		function Zd(n) {
			this._internalRoot = n;
		}
		((Hd.prototype.render = Zd.prototype.render =
			function (n) {
				var r = this._internalRoot;
				if (r === null) throw Error(l(409));
				var a = r.current;
				Wy(a, pr(), n, r, null, null);
			}),
			(Hd.prototype.unmount = Zd.prototype.unmount =
				function () {
					var n = this._internalRoot;
					if (n !== null) {
						this._internalRoot = null;
						var r = n.containerInfo;
						(Wy(n.current, 2, null, n, null, null), yo(), (r[Ft] = null));
					}
				}));
		function Hd(n) {
			this._internalRoot = n;
		}
		Hd.prototype.unstable_scheduleHydration = function (n) {
			if (n) {
				var r = tr();
				n = { blockedOn: null, target: n, priority: r };
				for (var a = 0; a < ua.length && r !== 0 && r < ua[a].priority; a++);
				(ua.splice(a, 0, n), a === 0 && a0(n));
			}
		};
		var l0 = i.version;
		if (l0 !== "19.2.8") throw Error(l(527, l0, "19.2.8"));
		P.findDOMNode = function (n) {
			var r = n._reactInternals;
			if (r === void 0)
				throw typeof n.render == "function" ? Error(l(188)) : ((n = Object.keys(n).join(",")), Error(l(268, n)));
			return ((n = g(r)), (n = n !== null ? _(n) : null), (n = n === null ? null : n.stateNode), n);
		};
		var p1 = {
			bundleType: 0,
			version: "19.2.8",
			rendererPackageName: "react-dom",
			currentDispatcherRef: V,
			reconcilerVersion: "19.2.8",
		};
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
			var Io = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (!Io.isDisabled && Io.supportsFiber)
				try {
					((Rn = Io.inject(p1)), (Ve = Io));
				} catch {}
		}
		e.createRoot = function (n, r) {
			if (!o(n)) throw Error(l(299));
			var a = !1,
				s = "",
				c = hw,
				d = mw,
				y = vw;
			return (
				r != null &&
					(r.unstable_strictMode === !0 && (a = !0),
					r.identifierPrefix !== void 0 && (s = r.identifierPrefix),
					r.onUncaughtError !== void 0 && (c = r.onUncaughtError),
					r.onCaughtError !== void 0 && (d = r.onCaughtError),
					r.onRecoverableError !== void 0 && (y = r.onRecoverableError)),
				(r = c1(n, 1, !1, null, null, a, s, null, c, d, y, y1)),
				(n[Ft] = r.current),
				ky(n),
				new Zd(r)
			);
		};
	}),
	ET = Er((e, t) => {
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
	C0;
function ie(e, t, i) {
	function u(h, m) {
		if (
			(h._zod || Object.defineProperty(h, "_zod", { value: { def: m, constr: f, traits: new Set() }, enumerable: !1 }),
			h._zod.traits.has(e))
		)
			return;
		(h._zod.traits.add(e), t(h, m));
		const v = f.prototype,
			g = Object.keys(v);
		for (let _ = 0; _ < g.length; _++) {
			const p = g[_];
			p in h || (h[p] = v[p].bind(h));
		}
	}
	const l = i?.Parent ?? Object;
	class o extends l {}
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
var Zu = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	},
	gb = class extends Error {
		constructor(e) {
			(super(`Encountered unidirectional transform during encode: ${e}`), (this.name = "ZodEncodeError"));
		}
	};
(C0 = globalThis).__zod_globalConfig ?? (C0.__zod_globalConfig = {});
var ic = globalThis.__zod_globalConfig;
function Ci(e) {
	return (e && Object.assign(ic, e), ic);
}
function yb(e) {
	const t = Object.values(e).filter((i) => typeof i == "number");
	return Object.entries(e)
		.filter(([i, u]) => t.indexOf(+i) === -1)
		.map(([i, u]) => u);
}
function Rh(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function Fh(e) {
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
function Gh(e) {
	return e == null;
}
function Xh(e) {
	const t = e.startsWith("^") ? 1 : 0,
		i = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, i);
}
function TT(e, t) {
	const i = e / t,
		u = Math.round(i),
		l = Number.EPSILON * Math.max(Math.abs(i), 1);
	return Math.abs(i - u) < l ? 0 : i - u;
}
var k0 = Symbol("evaluating");
function gt(e, t, i) {
	let u;
	Object.defineProperty(e, t, {
		get() {
			if (u !== k0) return (u === void 0 && ((u = k0), (u = i())), u);
		},
		set(l) {
			Object.defineProperty(e, t, { value: l });
		},
		configurable: !0,
	});
}
function Xa(e, t, i) {
	Object.defineProperty(e, t, { value: i, writable: !0, enumerable: !0, configurable: !0 });
}
function ga(...e) {
	const t = {};
	for (const i of e) {
		const u = Object.getOwnPropertyDescriptors(i);
		Object.assign(t, u);
	}
	return Object.defineProperties({}, t);
}
function M0(e) {
	return JSON.stringify(e);
}
function xT(e) {
	return e
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}
var pb = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function ac(e) {
	return typeof e == "object" && e !== null && !Array.isArray(e);
}
var AT = Fh(() => {
	if (ic.jitless || (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))) return !1;
	try {
		return !1;
	} catch {
		return !1;
	}
});
function Yu(e) {
	if (ac(e) === !1) return !1;
	const t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	const i = t.prototype;
	return !(ac(i) === !1 || Object.prototype.hasOwnProperty.call(i, "isPrototypeOf") === !1);
}
function bb(e) {
	return Yu(e)
		? { ...e }
		: Array.isArray(e)
			? [...e]
			: e instanceof Map
				? new Map(e)
				: e instanceof Set
					? new Set(e)
					: e;
}
var RT = new Set(["string", "number", "symbol"]);
function Fu(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function ya(e, t, i) {
	const u = new e._zod.constr(t ?? e._zod.def);
	return ((!t || i?.parent) && (u._zod.parent = e), u);
}
function Te(e) {
	const t = e;
	if (!t) return {};
	if (typeof t == "string") return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return (delete t.message, typeof t.error == "string" ? { ...t, error: () => t.error } : t);
}
function CT(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
var kT = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
function MT(e, t) {
	const i = e._zod.def,
		u = i.checks;
	if (u && u.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	return ya(
		e,
		ga(e._zod.def, {
			get shape() {
				const l = {};
				for (const o in t) {
					if (!(o in i.shape)) throw new Error(`Unrecognized key: "${o}"`);
					t[o] && (l[o] = i.shape[o]);
				}
				return (Xa(this, "shape", l), l);
			},
			checks: [],
		}),
	);
}
function NT(e, t) {
	const i = e._zod.def,
		u = i.checks;
	if (u && u.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	return ya(
		e,
		ga(e._zod.def, {
			get shape() {
				const l = { ...e._zod.def.shape };
				for (const o in t) {
					if (!(o in i.shape)) throw new Error(`Unrecognized key: "${o}"`);
					t[o] && delete l[o];
				}
				return (Xa(this, "shape", l), l);
			},
			checks: [],
		}),
	);
}
function OT(e, t) {
	if (!Yu(t)) throw new Error("Invalid input to extend: expected a plain object");
	const i = e._zod.def.checks;
	if (i && i.length > 0) {
		const u = e._zod.def.shape;
		for (const l in t)
			if (Object.getOwnPropertyDescriptor(u, l) !== void 0)
				throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return ya(
		e,
		ga(e._zod.def, {
			get shape() {
				const u = { ...e._zod.def.shape, ...t };
				return (Xa(this, "shape", u), u);
			},
		}),
	);
}
function zT(e, t) {
	if (!Yu(t)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return ya(
		e,
		ga(e._zod.def, {
			get shape() {
				const i = { ...e._zod.def.shape, ...t };
				return (Xa(this, "shape", i), i);
			},
		}),
	);
}
function DT(e, t) {
	if (e._zod.def.checks?.length)
		throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return ya(
		e,
		ga(e._zod.def, {
			get shape() {
				const i = { ...e._zod.def.shape, ...t._zod.def.shape };
				return (Xa(this, "shape", i), i);
			},
			get catchall() {
				return t._zod.def.catchall;
			},
			checks: t._zod.def.checks ?? [],
		}),
	);
}
function jT(e, t, i) {
	const u = t._zod.def.checks;
	if (u && u.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
	return ya(
		t,
		ga(t._zod.def, {
			get shape() {
				const l = t._zod.def.shape,
					o = { ...l };
				if (i)
					for (const f in i) {
						if (!(f in l)) throw new Error(`Unrecognized key: "${f}"`);
						i[f] && (o[f] = e ? new e({ type: "optional", innerType: l[f] }) : l[f]);
					}
				else for (const f in l) o[f] = e ? new e({ type: "optional", innerType: l[f] }) : l[f];
				return (Xa(this, "shape", o), o);
			},
			checks: [],
		}),
	);
}
function qT(e, t, i) {
	return ya(
		t,
		ga(t._zod.def, {
			get shape() {
				const u = t._zod.def.shape,
					l = { ...u };
				if (i)
					for (const o in i) {
						if (!(o in l)) throw new Error(`Unrecognized key: "${o}"`);
						i[o] && (l[o] = new e({ type: "nonoptional", innerType: u[o] }));
					}
				else for (const o in u) l[o] = new e({ type: "nonoptional", innerType: u[o] });
				return (Xa(this, "shape", l), l);
			},
		}),
	);
}
function Uu(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let i = t; i < e.issues.length; i++) if (e.issues[i]?.continue !== !0) return !0;
	return !1;
}
function IT(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let i = t; i < e.issues.length; i++) if (e.issues[i]?.continue === !1) return !0;
	return !1;
}
function $u(e, t) {
	return t.map((i) => {
		var u;
		return ((u = i).path ?? (u.path = []), i.path.unshift(e), i);
	});
}
function $o(e) {
	return typeof e == "string" ? e : e?.message;
}
function ki(e, t, i) {
	const u = e.message
			? e.message
			: ($o(e.inst?._zod.def?.error?.(e)) ??
				$o(t?.error?.(e)) ??
				$o(i.customError?.(e)) ??
				$o(i.localeError?.(e)) ??
				"Invalid input"),
		{ inst: l, continue: o, input: f, ...h } = e;
	return (h.path ?? (h.path = []), (h.message = u), t?.reportInput && (h.input = f), h);
}
function Jh(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function al(...e) {
	const [t, i, u] = e;
	return typeof t == "string" ? { message: t, code: "custom", input: i, inst: u } : { ...t };
}
var _b = (e, t) => {
		((e.name = "$ZodError"),
			Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
			Object.defineProperty(e, "issues", { value: t, enumerable: !1 }),
			(e.message = JSON.stringify(t, Rh, 2)),
			Object.defineProperty(e, "toString", { value: () => e.message, enumerable: !1 }));
	},
	Sb = ie("$ZodError", _b),
	wb = ie("$ZodError", _b, { Parent: Error });
function LT(e, t = (i) => i.message) {
	const i = {},
		u = [];
	for (const l of e.issues)
		l.path.length > 0 ? ((i[l.path[0]] = i[l.path[0]] || []), i[l.path[0]].push(t(l))) : u.push(t(l));
	return { formErrors: u, fieldErrors: i };
}
function UT(e, t = (i) => i.message) {
	const i = { _errors: [] },
		u = (l, o = []) => {
			for (const f of l.issues)
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
var Wh = (e) => (t, i, u, l) => {
		const o = u ? { ...u, async: !1 } : { async: !1 },
			f = t._zod.run({ value: i, issues: [] }, o);
		if (f instanceof Promise) throw new Zu();
		if (f.issues.length) {
			const h = new (l?.Err ?? e)(f.issues.map((m) => ki(m, o, Ci())));
			throw (pb(h, l?.callee), h);
		}
		return f.value;
	},
	em = (e) => async (t, i, u, l) => {
		const o = u ? { ...u, async: !0 } : { async: !0 };
		let f = t._zod.run({ value: i, issues: [] }, o);
		if ((f instanceof Promise && (f = await f), f.issues.length)) {
			const h = new (l?.Err ?? e)(f.issues.map((m) => ki(m, o, Ci())));
			throw (pb(h, l?.callee), h);
		}
		return f.value;
	},
	pc = (e) => (t, i, u) => {
		const l = u ? { ...u, async: !1 } : { async: !1 },
			o = t._zod.run({ value: i, issues: [] }, l);
		if (o instanceof Promise) throw new Zu();
		return o.issues.length
			? { success: !1, error: new (e ?? Sb)(o.issues.map((f) => ki(f, l, Ci()))) }
			: { success: !0, data: o.value };
	},
	$T = pc(wb),
	bc = (e) => async (t, i, u) => {
		const l = u ? { ...u, async: !0 } : { async: !0 };
		let o = t._zod.run({ value: i, issues: [] }, l);
		return (
			o instanceof Promise && (o = await o),
			o.issues.length
				? { success: !1, error: new e(o.issues.map((f) => ki(f, l, Ci()))) }
				: { success: !0, data: o.value }
		);
	},
	BT = bc(wb),
	VT = (e) => (t, i, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Wh(e)(t, i, l);
	},
	ZT = (e) => (t, i, u) => Wh(e)(t, i, u),
	HT = (e) => async (t, i, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return em(e)(t, i, l);
	},
	PT = (e) => async (t, i, u) => em(e)(t, i, u),
	QT = (e) => (t, i, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return pc(e)(t, i, l);
	},
	KT = (e) => (t, i, u) => pc(e)(t, i, u),
	YT = (e) => async (t, i, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return bc(e)(t, i, l);
	},
	FT = (e) => async (t, i, u) => bc(e)(t, i, u),
	GT = /^[cC][0-9a-z]{6,}$/,
	XT = /^[0-9a-z]+$/,
	JT = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
	WT = /^[0-9a-vA-V]{20}$/,
	ex = /^[A-Za-z0-9]{27}$/,
	tx = /^[a-zA-Z0-9_-]{21}$/,
	nx = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
	rx = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
	N0 = (e) =>
		e
			? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`)
			: /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
	ix = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
	ax = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function ux() {
	return new RegExp(ax, "u");
}
var sx =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	lx =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
	ox =
		/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
	cx =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	fx = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
	Eb = /^[A-Za-z0-9_-]*$/,
	dx = /^https?$/,
	hx = /^\+[1-9]\d{6,14}$/,
	Tb =
		"(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
	mx = new RegExp(`^${Tb}$`);
function xb(e) {
	const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number"
		? e.precision === -1
			? `${t}`
			: e.precision === 0
				? `${t}:[0-5]\\d`
				: `${t}:[0-5]\\d\\.\\d{${e.precision}}`
		: `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function vx(e) {
	return new RegExp(`^${xb(e)}$`);
}
function gx(e) {
	const t = xb({ precision: e.precision }),
		i = ["Z"];
	(e.local && i.push(""), e.offset && i.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)"));
	const u = `${t}(?:${i.join("|")})`;
	return new RegExp(`^${Tb}T(?:${u})$`);
}
var yx = (e) => {
		const t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
		return new RegExp(`^${t}$`);
	},
	px = /^-?\d+$/,
	Ab = /^-?\d+(?:\.\d+)?$/,
	bx = /^(?:true|false)$/i,
	_x = /^undefined$/i,
	Sx = /^[^A-Z]*$/,
	wx = /^[^a-z]*$/,
	Gn = ie("$ZodCheck", (e, t) => {
		var i;
		(e._zod ?? (e._zod = {}), (e._zod.def = t), (i = e._zod).onattach ?? (i.onattach = []));
	}),
	Rb = { number: "number", bigint: "bigint", object: "date" },
	Cb = ie("$ZodCheckLessThan", (e, t) => {
		Gn.init(e, t);
		const i = Rb[typeof t.value];
		(e._zod.onattach.push((u) => {
			const l = u._zod.bag,
				o = (t.inclusive ? l.maximum : l.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
			t.value < o && (t.inclusive ? (l.maximum = t.value) : (l.exclusiveMaximum = t.value));
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
	kb = ie("$ZodCheckGreaterThan", (e, t) => {
		Gn.init(e, t);
		const i = Rb[typeof t.value];
		(e._zod.onattach.push((u) => {
			const l = u._zod.bag,
				o = (t.inclusive ? l.minimum : l.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
			t.value > o && (t.inclusive ? (l.minimum = t.value) : (l.exclusiveMinimum = t.value));
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
	Ex = ie("$ZodCheckMultipleOf", (e, t) => {
		(Gn.init(e, t),
			e._zod.onattach.push((i) => {
				var u;
				(u = i._zod.bag).multipleOf ?? (u.multipleOf = t.value);
			}),
			(e._zod.check = (i) => {
				if (typeof i.value != typeof t.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				(typeof i.value == "bigint" ? i.value % t.value === BigInt(0) : TT(i.value, t.value) === 0) ||
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
	Tx = ie("$ZodCheckNumberFormat", (e, t) => {
		(Gn.init(e, t), (t.format = t.format || "float64"));
		const i = t.format?.includes("int"),
			u = i ? "int" : "number",
			[l, o] = kT[t.format];
		(e._zod.onattach.push((f) => {
			const h = f._zod.bag;
			((h.format = t.format), (h.minimum = l), (h.maximum = o), i && (h.pattern = px));
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
				(h < l &&
					f.issues.push({
						origin: "number",
						input: h,
						code: "too_small",
						minimum: l,
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
	xx = ie("$ZodCheckMaxLength", (e, t) => {
		var i;
		(Gn.init(e, t),
			(i = e._zod.def).when ??
				(i.when = (u) => {
					const l = u.value;
					return !Gh(l) && l.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
				t.maximum < l && (u._zod.bag.maximum = t.maximum);
			}),
			(e._zod.check = (u) => {
				const l = u.value;
				if (l.length <= t.maximum) return;
				const o = Jh(l);
				u.issues.push({
					origin: o,
					code: "too_big",
					maximum: t.maximum,
					inclusive: !0,
					input: l,
					inst: e,
					continue: !t.abort,
				});
			}));
	}),
	Ax = ie("$ZodCheckMinLength", (e, t) => {
		var i;
		(Gn.init(e, t),
			(i = e._zod.def).when ??
				(i.when = (u) => {
					const l = u.value;
					return !Gh(l) && l.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
				t.minimum > l && (u._zod.bag.minimum = t.minimum);
			}),
			(e._zod.check = (u) => {
				const l = u.value;
				if (l.length >= t.minimum) return;
				const o = Jh(l);
				u.issues.push({
					origin: o,
					code: "too_small",
					minimum: t.minimum,
					inclusive: !0,
					input: l,
					inst: e,
					continue: !t.abort,
				});
			}));
	}),
	Rx = ie("$ZodCheckLengthEquals", (e, t) => {
		var i;
		(Gn.init(e, t),
			(i = e._zod.def).when ??
				(i.when = (u) => {
					const l = u.value;
					return !Gh(l) && l.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag;
				((l.minimum = t.length), (l.maximum = t.length), (l.length = t.length));
			}),
			(e._zod.check = (u) => {
				const l = u.value,
					o = l.length;
				if (o === t.length) return;
				const f = Jh(l),
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
	_c = ie("$ZodCheckStringFormat", (e, t) => {
		var i, u;
		(Gn.init(e, t),
			e._zod.onattach.push((l) => {
				const o = l._zod.bag;
				((o.format = t.format), t.pattern && (o.patterns ?? (o.patterns = new Set()), o.patterns.add(t.pattern)));
			}),
			t.pattern
				? ((i = e._zod).check ??
					(i.check = (l) => {
						((t.pattern.lastIndex = 0),
							!t.pattern.test(l.value) &&
								l.issues.push({
									origin: "string",
									code: "invalid_format",
									format: t.format,
									input: l.value,
									...(t.pattern ? { pattern: t.pattern.toString() } : {}),
									inst: e,
									continue: !t.abort,
								}));
					}))
				: ((u = e._zod).check ?? (u.check = () => {})));
	}),
	Cx = ie("$ZodCheckRegex", (e, t) => {
		(_c.init(e, t),
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
	kx = ie("$ZodCheckLowerCase", (e, t) => {
		(t.pattern ?? (t.pattern = Sx), _c.init(e, t));
	}),
	Mx = ie("$ZodCheckUpperCase", (e, t) => {
		(t.pattern ?? (t.pattern = wx), _c.init(e, t));
	}),
	Nx = ie("$ZodCheckIncludes", (e, t) => {
		Gn.init(e, t);
		const i = Fu(t.includes),
			u = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${i}` : i);
		((t.pattern = u),
			e._zod.onattach.push((l) => {
				const o = l._zod.bag;
				(o.patterns ?? (o.patterns = new Set()), o.patterns.add(u));
			}),
			(e._zod.check = (l) => {
				l.value.includes(t.includes, t.position) ||
					l.issues.push({
						origin: "string",
						code: "invalid_format",
						format: "includes",
						includes: t.includes,
						input: l.value,
						inst: e,
						continue: !t.abort,
					});
			}));
	}),
	Ox = ie("$ZodCheckStartsWith", (e, t) => {
		Gn.init(e, t);
		const i = new RegExp(`^${Fu(t.prefix)}.*`);
		(t.pattern ?? (t.pattern = i),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag;
				(l.patterns ?? (l.patterns = new Set()), l.patterns.add(i));
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
	zx = ie("$ZodCheckEndsWith", (e, t) => {
		Gn.init(e, t);
		const i = new RegExp(`.*${Fu(t.suffix)}$`);
		(t.pattern ?? (t.pattern = i),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag;
				(l.patterns ?? (l.patterns = new Set()), l.patterns.add(i));
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
	Dx = ie("$ZodCheckOverwrite", (e, t) => {
		(Gn.init(e, t),
			(e._zod.check = (i) => {
				i.value = t.tx(i.value);
			}));
	}),
	jx = class {
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
					.filter((l) => l),
				i = Math.min(...t.map((l) => l.length - l.trimStart().length)),
				u = t.map((l) => l.slice(i)).map((l) => " ".repeat(this.indent * 2) + l);
			for (const l of u) this.content.push(l);
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
	qx = { major: 4, minor: 4, patch: 3 },
	kt = ie("$ZodType", (e, t) => {
		var i;
		(e ?? (e = {}), (e._zod.def = t), (e._zod.bag = e._zod.bag || {}), (e._zod.version = qx));
		const u = [...(e._zod.def.checks ?? [])];
		e._zod.traits.has("$ZodCheck") && u.unshift(e);
		for (const l of u) for (const o of l._zod.onattach) o(e);
		if (u.length === 0)
			((i = e._zod).deferred ?? (i.deferred = []),
				e._zod.deferred?.push(() => {
					e._zod.run = e._zod.parse;
				}));
		else {
			const l = (f, h, m) => {
					let v = Uu(f),
						g;
					for (const _ of h) {
						if (_._zod.def.when) {
							if (IT(f) || !_._zod.def.when(f)) continue;
						} else if (v) continue;
						const p = f.issues.length,
							w = _._zod.check(f);
						if (w instanceof Promise && m?.async === !1) throw new Zu();
						if (g || w instanceof Promise)
							g = (g ?? Promise.resolve()).then(async () => {
								(await w, f.issues.length !== p && (v || (v = Uu(f, p))));
							});
						else {
							if (f.issues.length === p) continue;
							v || (v = Uu(f, p));
						}
					}
					return g ? g.then(() => f) : f;
				},
				o = (f, h, m) => {
					if (Uu(f)) return ((f.aborted = !0), f);
					const v = l(h, u, m);
					if (v instanceof Promise) {
						if (m.async === !1) throw new Zu();
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
					if (h.async === !1) throw new Zu();
					return m.then((v) => l(v, u, h));
				}
				return l(m, u, h);
			};
		}
		gt(e, "~standard", () => ({
			validate: (l) => {
				try {
					const o = $T(e, l);
					return o.success ? { value: o.data } : { issues: o.error?.issues };
				} catch {
					return BT(e, l).then((f) => (f.success ? { value: f.data } : { issues: f.error?.issues }));
				}
			},
			vendor: "zod",
			version: 1,
		}));
	}),
	tm = ie("$ZodString", (e, t) => {
		(kt.init(e, t),
			(e._zod.pattern = [...(e?._zod.bag?.patterns ?? [])].pop() ?? yx(e._zod.bag)),
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
	Mt = ie("$ZodStringFormat", (e, t) => {
		(_c.init(e, t), tm.init(e, t));
	}),
	Ix = ie("$ZodGUID", (e, t) => {
		(t.pattern ?? (t.pattern = rx), Mt.init(e, t));
	}),
	Lx = ie("$ZodUUID", (e, t) => {
		if (t.version) {
			const i = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[t.version];
			if (i === void 0) throw new Error(`Invalid UUID version: "${t.version}"`);
			t.pattern ?? (t.pattern = N0(i));
		} else t.pattern ?? (t.pattern = N0());
		Mt.init(e, t);
	}),
	Ux = ie("$ZodEmail", (e, t) => {
		(t.pattern ?? (t.pattern = ix), Mt.init(e, t));
	}),
	$x = ie("$ZodURL", (e, t) => {
		(Mt.init(e, t),
			(e._zod.check = (i) => {
				try {
					const u = i.value.trim();
					if (!t.normalize && t.protocol?.source === dx.source && !/^https?:\/\//i.test(u)) {
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
					const l = new URL(u);
					(t.hostname &&
						((t.hostname.lastIndex = 0),
						t.hostname.test(l.hostname) ||
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
							t.protocol.test(l.protocol.endsWith(":") ? l.protocol.slice(0, -1) : l.protocol) ||
								i.issues.push({
									code: "invalid_format",
									format: "url",
									note: "Invalid protocol",
									pattern: t.protocol.source,
									input: i.value,
									inst: e,
									continue: !t.abort,
								})),
						t.normalize ? (i.value = l.href) : (i.value = u));
					return;
				} catch {
					i.issues.push({ code: "invalid_format", format: "url", input: i.value, inst: e, continue: !t.abort });
				}
			}));
	}),
	Bx = ie("$ZodEmoji", (e, t) => {
		(t.pattern ?? (t.pattern = ux()), Mt.init(e, t));
	}),
	Vx = ie("$ZodNanoID", (e, t) => {
		(t.pattern ?? (t.pattern = tx), Mt.init(e, t));
	}),
	Zx = ie("$ZodCUID", (e, t) => {
		(t.pattern ?? (t.pattern = GT), Mt.init(e, t));
	}),
	Hx = ie("$ZodCUID2", (e, t) => {
		(t.pattern ?? (t.pattern = XT), Mt.init(e, t));
	}),
	Px = ie("$ZodULID", (e, t) => {
		(t.pattern ?? (t.pattern = JT), Mt.init(e, t));
	}),
	Qx = ie("$ZodXID", (e, t) => {
		(t.pattern ?? (t.pattern = WT), Mt.init(e, t));
	}),
	Kx = ie("$ZodKSUID", (e, t) => {
		(t.pattern ?? (t.pattern = ex), Mt.init(e, t));
	}),
	Yx = ie("$ZodISODateTime", (e, t) => {
		(t.pattern ?? (t.pattern = gx(t)), Mt.init(e, t));
	}),
	Fx = ie("$ZodISODate", (e, t) => {
		(t.pattern ?? (t.pattern = mx), Mt.init(e, t));
	}),
	Gx = ie("$ZodISOTime", (e, t) => {
		(t.pattern ?? (t.pattern = vx(t)), Mt.init(e, t));
	}),
	Xx = ie("$ZodISODuration", (e, t) => {
		(t.pattern ?? (t.pattern = nx), Mt.init(e, t));
	}),
	Jx = ie("$ZodIPv4", (e, t) => {
		(t.pattern ?? (t.pattern = sx), Mt.init(e, t), (e._zod.bag.format = "ipv4"));
	}),
	Wx = ie("$ZodIPv6", (e, t) => {
		(t.pattern ?? (t.pattern = lx),
			Mt.init(e, t),
			(e._zod.bag.format = "ipv6"),
			(e._zod.check = (i) => {
				try {
					new URL(`http://[${i.value}]`);
				} catch {
					i.issues.push({ code: "invalid_format", format: "ipv6", input: i.value, inst: e, continue: !t.abort });
				}
			}));
	}),
	eA = ie("$ZodCIDRv4", (e, t) => {
		(t.pattern ?? (t.pattern = ox), Mt.init(e, t));
	}),
	tA = ie("$ZodCIDRv6", (e, t) => {
		(t.pattern ?? (t.pattern = cx),
			Mt.init(e, t),
			(e._zod.check = (i) => {
				const u = i.value.split("/");
				try {
					if (u.length !== 2) throw new Error();
					const [l, o] = u;
					if (!o) throw new Error();
					const f = Number(o);
					if (`${f}` !== o) throw new Error();
					if (f < 0 || f > 128) throw new Error();
					new URL(`http://[${l}]`);
				} catch {
					i.issues.push({ code: "invalid_format", format: "cidrv6", input: i.value, inst: e, continue: !t.abort });
				}
			}));
	});
function Mb(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 !== 0) return !1;
	try {
		return (atob(e), !0);
	} catch {
		return !1;
	}
}
var nA = ie("$ZodBase64", (e, t) => {
	(t.pattern ?? (t.pattern = fx),
		Mt.init(e, t),
		(e._zod.bag.contentEncoding = "base64"),
		(e._zod.check = (i) => {
			Mb(i.value) ||
				i.issues.push({ code: "invalid_format", format: "base64", input: i.value, inst: e, continue: !t.abort });
		}));
});
function rA(e) {
	if (!Eb.test(e)) return !1;
	const t = e.replace(/[-_]/g, (i) => (i === "-" ? "+" : "/"));
	return Mb(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
var iA = ie("$ZodBase64URL", (e, t) => {
		(t.pattern ?? (t.pattern = Eb),
			Mt.init(e, t),
			(e._zod.bag.contentEncoding = "base64url"),
			(e._zod.check = (i) => {
				rA(i.value) ||
					i.issues.push({ code: "invalid_format", format: "base64url", input: i.value, inst: e, continue: !t.abort });
			}));
	}),
	aA = ie("$ZodE164", (e, t) => {
		(t.pattern ?? (t.pattern = hx), Mt.init(e, t));
	});
function uA(e, t = null) {
	try {
		const i = e.split(".");
		if (i.length !== 3) return !1;
		const [u] = i;
		if (!u) return !1;
		const l = JSON.parse(atob(u));
		return !(("typ" in l && l?.typ !== "JWT") || !l.alg || (t && (!("alg" in l) || l.alg !== t)));
	} catch {
		return !1;
	}
}
var sA = ie("$ZodJWT", (e, t) => {
		(Mt.init(e, t),
			(e._zod.check = (i) => {
				uA(i.value, t.alg) ||
					i.issues.push({ code: "invalid_format", format: "jwt", input: i.value, inst: e, continue: !t.abort });
			}));
	}),
	Nb = ie("$ZodNumber", (e, t) => {
		(kt.init(e, t),
			(e._zod.pattern = e._zod.bag.pattern ?? Ab),
			(e._zod.parse = (i, u) => {
				if (t.coerce)
					try {
						i.value = Number(i.value);
					} catch {}
				const l = i.value;
				if (typeof l == "number" && !Number.isNaN(l) && Number.isFinite(l)) return i;
				const o = typeof l == "number" ? (Number.isNaN(l) ? "NaN" : Number.isFinite(l) ? void 0 : "Infinity") : void 0;
				return (
					i.issues.push({ expected: "number", code: "invalid_type", input: l, inst: e, ...(o ? { received: o } : {}) }),
					i
				);
			}));
	}),
	lA = ie("$ZodNumberFormat", (e, t) => {
		(Tx.init(e, t), Nb.init(e, t));
	}),
	oA = ie("$ZodBoolean", (e, t) => {
		(kt.init(e, t),
			(e._zod.pattern = bx),
			(e._zod.parse = (i, u) => {
				if (t.coerce)
					try {
						i.value = !!i.value;
					} catch {}
				const l = i.value;
				return (
					typeof l == "boolean" || i.issues.push({ expected: "boolean", code: "invalid_type", input: l, inst: e }),
					i
				);
			}));
	}),
	cA = ie("$ZodUndefined", (e, t) => {
		(kt.init(e, t),
			(e._zod.pattern = _x),
			(e._zod.values = new Set([void 0])),
			(e._zod.parse = (i, u) => {
				const l = i.value;
				return (typeof l > "u" || i.issues.push({ expected: "undefined", code: "invalid_type", input: l, inst: e }), i);
			}));
	}),
	fA = ie("$ZodUnknown", (e, t) => {
		(kt.init(e, t), (e._zod.parse = (i) => i));
	}),
	dA = ie("$ZodNever", (e, t) => {
		(kt.init(e, t),
			(e._zod.parse = (i, u) => (
				i.issues.push({ expected: "never", code: "invalid_type", input: i.value, inst: e }),
				i
			)));
	});
function O0(e, t, i) {
	(e.issues.length && t.issues.push(...$u(i, e.issues)), (t.value[i] = e.value));
}
var hA = ie("$ZodArray", (e, t) => {
	(kt.init(e, t),
		(e._zod.parse = (i, u) => {
			const l = i.value;
			if (!Array.isArray(l)) return (i.issues.push({ expected: "array", code: "invalid_type", input: l, inst: e }), i);
			i.value = Array(l.length);
			const o = [];
			for (let f = 0; f < l.length; f++) {
				const h = l[f],
					m = t.element._zod.run({ value: h, issues: [] }, u);
				m instanceof Promise ? o.push(m.then((v) => O0(v, i, f))) : O0(m, i, f);
			}
			return o.length ? Promise.all(o).then(() => i) : i;
		}));
});
function uc(e, t, i, u, l, o) {
	const f = i in u;
	if (e.issues.length) {
		if (l && o && !f) return;
		t.issues.push(...$u(i, e.issues));
	}
	if (!f && !l) {
		e.issues.length || t.issues.push({ code: "invalid_type", expected: "nonoptional", input: void 0, path: [i] });
		return;
	}
	e.value === void 0 ? f && (t.value[i] = void 0) : (t.value[i] = e.value);
}
function Ob(e) {
	const t = Object.keys(e.shape);
	for (const u of t)
		if (!e.shape?.[u]?._zod?.traits?.has("$ZodType"))
			throw new Error(`Invalid element at key "${u}": expected a Zod schema`);
	const i = CT(e.shape);
	return { ...e, keys: t, keySet: new Set(t), numKeys: t.length, optionalKeys: new Set(i) };
}
function zb(e, t, i, u, l, o) {
	const f = [],
		h = l.keySet,
		m = l.catchall._zod,
		v = m.def.type,
		g = m.optin === "optional",
		_ = m.optout === "optional";
	for (const p in t) {
		if (p === "__proto__" || h.has(p)) continue;
		if (v === "never") {
			f.push(p);
			continue;
		}
		const w = m.run({ value: t[p], issues: [] }, u);
		w instanceof Promise ? e.push(w.then((x) => uc(x, i, p, t, g, _))) : uc(w, i, p, t, g, _);
	}
	return (
		f.length && i.issues.push({ code: "unrecognized_keys", keys: f, input: t, inst: o }),
		e.length ? Promise.all(e).then(() => i) : i
	);
}
var mA = ie("$ZodObject", (e, t) => {
		if ((kt.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get)) {
			const f = t.shape;
			Object.defineProperty(t, "shape", {
				get: () => {
					const h = { ...f };
					return (Object.defineProperty(t, "shape", { value: h }), h);
				},
			});
		}
		const i = Fh(() => Ob(t));
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
		const u = ac,
			l = t.catchall;
		let o;
		e._zod.parse = (f, h) => {
			o ?? (o = i.value);
			const m = f.value;
			if (!u(m)) return (f.issues.push({ expected: "object", code: "invalid_type", input: m, inst: e }), f);
			f.value = {};
			const v = [],
				g = o.shape;
			for (const _ of o.keys) {
				const p = g[_],
					w = p._zod.optin === "optional",
					x = p._zod.optout === "optional",
					R = p._zod.run({ value: m[_], issues: [] }, h);
				R instanceof Promise ? v.push(R.then((z) => uc(z, f, _, m, w, x))) : uc(R, f, _, m, w, x);
			}
			return l ? zb(v, m, f, h, i.value, e) : v.length ? Promise.all(v).then(() => f) : f;
		};
	}),
	vA = ie("$ZodObjectJIT", (e, t) => {
		mA.init(e, t);
		const i = e._zod.parse,
			u = Fh(() => Ob(t)),
			l = (p) => {
				const w = new jx(["shape", "payload", "ctx"]),
					x = u.value,
					R = (N) => {
						const C = M0(N);
						return `shape[${C}]._zod.run({ value: input[${C}], issues: [] }, ctx)`;
					};
				w.write("const input = payload.value;");
				const z = Object.create(null);
				let I = 0;
				for (const N of x.keys) z[N] = `key_${I++}`;
				w.write("const newResult = {};");
				for (const N of x.keys) {
					const C = z[N],
						q = M0(N),
						J = p[N],
						G = J?._zod?.optin === "optional",
						k = J?._zod?.optout === "optional";
					(w.write(`const ${C} = ${R(N)};`),
						G && k
							? w.write(`
        if (${C}.issues.length) {
          if (${q} in input) {
            payload.issues = payload.issues.concat(${C}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${q}, ...iss.path] : [${q}]
            })));
          }
        }
        
        if (${C}.value === undefined) {
          if (${q} in input) {
            newResult[${q}] = undefined;
          }
        } else {
          newResult[${q}] = ${C}.value;
        }
        
      `)
							: G
								? w.write(`
        if (${C}.issues.length) {
          payload.issues = payload.issues.concat(${C}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${q}, ...iss.path] : [${q}]
          })));
        }
        
        if (${C}.value === undefined) {
          if (${q} in input) {
            newResult[${q}] = undefined;
          }
        } else {
          newResult[${q}] = ${C}.value;
        }
        
      `)
								: w.write(`
        const ${C}_present = ${q} in input;
        if (${C}.issues.length) {
          payload.issues = payload.issues.concat(${C}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${q}, ...iss.path] : [${q}]
          })));
        }
        if (!${C}_present && !${C}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${q}]
          });
        }

        if (${C}_present) {
          if (${C}.value === undefined) {
            newResult[${q}] = undefined;
          } else {
            newResult[${q}] = ${C}.value;
          }
        }

      `));
				}
				(w.write("payload.value = newResult;"), w.write("return payload;"));
				const j = w.compile();
				return (N, C) => j(p, N, C);
			};
		let o;
		const f = ac,
			h = !ic.jitless,
			v = h && AT.value,
			g = t.catchall;
		let _;
		e._zod.parse = (p, w) => {
			_ ?? (_ = u.value);
			const x = p.value;
			return f(x)
				? h && v && w?.async === !1 && w.jitless !== !0
					? (o || (o = l(t.shape)), (p = o(p, w)), g ? zb([], x, p, w, _, e) : p)
					: i(p, w)
				: (p.issues.push({ expected: "object", code: "invalid_type", input: x, inst: e }), p);
		};
	});
function z0(e, t, i, u) {
	for (const o of e) if (o.issues.length === 0) return ((t.value = o.value), t);
	const l = e.filter((o) => !Uu(o));
	return l.length === 1
		? ((t.value = l[0].value), l[0])
		: (t.issues.push({
				code: "invalid_union",
				input: t.value,
				inst: i,
				errors: e.map((o) => o.issues.map((f) => ki(f, u, Ci()))),
			}),
			t);
}
var gA = ie("$ZodUnion", (e, t) => {
		(kt.init(e, t),
			gt(e._zod, "optin", () => (t.options.some((u) => u._zod.optin === "optional") ? "optional" : void 0)),
			gt(e._zod, "optout", () => (t.options.some((u) => u._zod.optout === "optional") ? "optional" : void 0)),
			gt(e._zod, "values", () => {
				if (t.options.every((u) => u._zod.values)) return new Set(t.options.flatMap((u) => Array.from(u._zod.values)));
			}),
			gt(e._zod, "pattern", () => {
				if (t.options.every((u) => u._zod.pattern)) {
					const u = t.options.map((l) => l._zod.pattern);
					return new RegExp(`^(${u.map((l) => Xh(l.source)).join("|")})$`);
				}
			}));
		const i = t.options.length === 1 ? t.options[0]._zod.run : null;
		e._zod.parse = (u, l) => {
			if (i) return i(u, l);
			let o = !1;
			const f = [];
			for (const h of t.options) {
				const m = h._zod.run({ value: u.value, issues: [] }, l);
				if (m instanceof Promise) (f.push(m), (o = !0));
				else {
					if (m.issues.length === 0) return m;
					f.push(m);
				}
			}
			return o ? Promise.all(f).then((h) => z0(h, u, e, l)) : z0(f, u, e, l);
		};
	}),
	yA = ie("$ZodIntersection", (e, t) => {
		(kt.init(e, t),
			(e._zod.parse = (i, u) => {
				const l = i.value,
					o = t.left._zod.run({ value: l, issues: [] }, u),
					f = t.right._zod.run({ value: l, issues: [] }, u);
				return o instanceof Promise || f instanceof Promise
					? Promise.all([o, f]).then(([h, m]) => D0(i, h, m))
					: D0(i, o, f);
			}));
	});
function Ch(e, t) {
	if (e === t) return { valid: !0, data: e };
	if (e instanceof Date && t instanceof Date && +e == +t) return { valid: !0, data: e };
	if (Yu(e) && Yu(t)) {
		const i = Object.keys(t),
			u = Object.keys(e).filter((o) => i.indexOf(o) !== -1),
			l = { ...e, ...t };
		for (const o of u) {
			const f = Ch(e[o], t[o]);
			if (!f.valid) return { valid: !1, mergeErrorPath: [o, ...f.mergeErrorPath] };
			l[o] = f.data;
		}
		return { valid: !0, data: l };
	}
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return { valid: !1, mergeErrorPath: [] };
		const i = [];
		for (let u = 0; u < e.length; u++) {
			const l = e[u],
				o = t[u],
				f = Ch(l, o);
			if (!f.valid) return { valid: !1, mergeErrorPath: [u, ...f.mergeErrorPath] };
			i.push(f.data);
		}
		return { valid: !0, data: i };
	}
	return { valid: !1, mergeErrorPath: [] };
}
function D0(e, t, i) {
	const u = new Map();
	let l;
	for (const h of t.issues)
		if (h.code === "unrecognized_keys") {
			l ?? (l = h);
			for (const m of h.keys) (u.has(m) || u.set(m, {}), (u.get(m).l = !0));
		} else e.issues.push(h);
	for (const h of i.issues)
		if (h.code === "unrecognized_keys") for (const m of h.keys) (u.has(m) || u.set(m, {}), (u.get(m).r = !0));
		else e.issues.push(h);
	const o = [...u].filter(([, h]) => h.l && h.r).map(([h]) => h);
	if ((o.length && l && e.issues.push({ ...l, keys: o }), Uu(e))) return e;
	const f = Ch(t.value, i.value);
	if (!f.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(f.mergeErrorPath)}`);
	return ((e.value = f.data), e);
}
var pA = ie("$ZodRecord", (e, t) => {
		(kt.init(e, t),
			(e._zod.parse = (i, u) => {
				const l = i.value;
				if (!Yu(l)) return (i.issues.push({ expected: "record", code: "invalid_type", input: l, inst: e }), i);
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
									issues: g.issues.map((w) => ki(w, u, Ci())),
									input: v,
									path: [v],
									inst: e,
								});
								continue;
							}
							const _ = g.value,
								p = t.valueType._zod.run({ value: l[v], issues: [] }, u);
							p instanceof Promise
								? o.push(
										p.then((w) => {
											(w.issues.length && i.issues.push(...$u(v, w.issues)), (i.value[_] = w.value));
										}),
									)
								: (p.issues.length && i.issues.push(...$u(v, p.issues)), (i.value[_] = p.value));
						}
					let m;
					for (const v in l) h.has(v) || ((m = m ?? []), m.push(v));
					m && m.length > 0 && i.issues.push({ code: "unrecognized_keys", input: l, inst: e, keys: m });
				} else {
					i.value = {};
					for (const h of Reflect.ownKeys(l)) {
						if (h === "__proto__" || !Object.prototype.propertyIsEnumerable.call(l, h)) continue;
						let m = t.keyType._zod.run({ value: h, issues: [] }, u);
						if (m instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
						if (typeof h == "string" && Ab.test(h) && m.issues.length) {
							const g = t.keyType._zod.run({ value: Number(h), issues: [] }, u);
							if (g instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
							g.issues.length === 0 && (m = g);
						}
						if (m.issues.length) {
							t.mode === "loose"
								? (i.value[h] = l[h])
								: i.issues.push({
										code: "invalid_key",
										origin: "record",
										issues: m.issues.map((g) => ki(g, u, Ci())),
										input: h,
										path: [h],
										inst: e,
									});
							continue;
						}
						const v = t.valueType._zod.run({ value: l[h], issues: [] }, u);
						v instanceof Promise
							? o.push(
									v.then((g) => {
										(g.issues.length && i.issues.push(...$u(h, g.issues)), (i.value[m.value] = g.value));
									}),
								)
							: (v.issues.length && i.issues.push(...$u(h, v.issues)), (i.value[m.value] = v.value));
					}
				}
				return o.length ? Promise.all(o).then(() => i) : i;
			}));
	}),
	bA = ie("$ZodEnum", (e, t) => {
		kt.init(e, t);
		const i = yb(t.entries),
			u = new Set(i);
		((e._zod.values = u),
			(e._zod.pattern = new RegExp(
				`^(${i
					.filter((l) => RT.has(typeof l))
					.map((l) => (typeof l == "string" ? Fu(l) : l.toString()))
					.join("|")})$`,
			)),
			(e._zod.parse = (l, o) => {
				const f = l.value;
				return (u.has(f) || l.issues.push({ code: "invalid_value", values: i, input: f, inst: e }), l);
			}));
	}),
	_A = ie("$ZodLiteral", (e, t) => {
		if ((kt.init(e, t), t.values.length === 0)) throw new Error("Cannot create literal schema with no valid values");
		const i = new Set(t.values);
		((e._zod.values = i),
			(e._zod.pattern = new RegExp(
				`^(${t.values.map((u) => (typeof u == "string" ? Fu(u) : u ? Fu(u.toString()) : String(u))).join("|")})$`,
			)),
			(e._zod.parse = (u, l) => {
				const o = u.value;
				return (i.has(o) || u.issues.push({ code: "invalid_value", values: t.values, input: o, inst: e }), u);
			}));
	}),
	SA = ie("$ZodTransform", (e, t) => {
		(kt.init(e, t),
			(e._zod.optin = "optional"),
			(e._zod.parse = (i, u) => {
				if (u.direction === "backward") throw new gb(e.constructor.name);
				const l = t.transform(i.value, i);
				if (u.async)
					return (l instanceof Promise ? l : Promise.resolve(l)).then((o) => ((i.value = o), (i.fallback = !0), i));
				if (l instanceof Promise) throw new Zu();
				return ((i.value = l), (i.fallback = !0), i);
			}));
	});
function j0(e, t) {
	return t === void 0 && (e.issues.length || e.fallback) ? { issues: [], value: void 0 } : e;
}
var Db = ie("$ZodOptional", (e, t) => {
		(kt.init(e, t),
			(e._zod.optin = "optional"),
			(e._zod.optout = "optional"),
			gt(e._zod, "values", () => (t.innerType._zod.values ? new Set([...t.innerType._zod.values, void 0]) : void 0)),
			gt(e._zod, "pattern", () => {
				const i = t.innerType._zod.pattern;
				return i ? new RegExp(`^(${Xh(i.source)})?$`) : void 0;
			}),
			(e._zod.parse = (i, u) => {
				if (t.innerType._zod.optin === "optional") {
					const l = i.value,
						o = t.innerType._zod.run(i, u);
					return o instanceof Promise ? o.then((f) => j0(f, l)) : j0(o, l);
				}
				return i.value === void 0 ? i : t.innerType._zod.run(i, u);
			}));
	}),
	wA = ie("$ZodExactOptional", (e, t) => {
		(Db.init(e, t),
			gt(e._zod, "values", () => t.innerType._zod.values),
			gt(e._zod, "pattern", () => t.innerType._zod.pattern),
			(e._zod.parse = (i, u) => t.innerType._zod.run(i, u)));
	}),
	EA = ie("$ZodNullable", (e, t) => {
		(kt.init(e, t),
			gt(e._zod, "optin", () => t.innerType._zod.optin),
			gt(e._zod, "optout", () => t.innerType._zod.optout),
			gt(e._zod, "pattern", () => {
				const i = t.innerType._zod.pattern;
				return i ? new RegExp(`^(${Xh(i.source)}|null)$`) : void 0;
			}),
			gt(e._zod, "values", () => (t.innerType._zod.values ? new Set([...t.innerType._zod.values, null]) : void 0)),
			(e._zod.parse = (i, u) => (i.value === null ? i : t.innerType._zod.run(i, u))));
	}),
	TA = ie("$ZodDefault", (e, t) => {
		(kt.init(e, t),
			(e._zod.optin = "optional"),
			gt(e._zod, "values", () => t.innerType._zod.values),
			(e._zod.parse = (i, u) => {
				if (u.direction === "backward") return t.innerType._zod.run(i, u);
				if (i.value === void 0) return ((i.value = t.defaultValue), i);
				const l = t.innerType._zod.run(i, u);
				return l instanceof Promise ? l.then((o) => q0(o, t)) : q0(l, t);
			}));
	});
function q0(e, t) {
	return (e.value === void 0 && (e.value = t.defaultValue), e);
}
var xA = ie("$ZodPrefault", (e, t) => {
		(kt.init(e, t),
			(e._zod.optin = "optional"),
			gt(e._zod, "values", () => t.innerType._zod.values),
			(e._zod.parse = (i, u) => (
				u.direction === "backward" || (i.value === void 0 && (i.value = t.defaultValue)),
				t.innerType._zod.run(i, u)
			)));
	}),
	AA = ie("$ZodNonOptional", (e, t) => {
		(kt.init(e, t),
			gt(e._zod, "values", () => {
				const i = t.innerType._zod.values;
				return i ? new Set([...i].filter((u) => u !== void 0)) : void 0;
			}),
			(e._zod.parse = (i, u) => {
				const l = t.innerType._zod.run(i, u);
				return l instanceof Promise ? l.then((o) => I0(o, e)) : I0(l, e);
			}));
	});
function I0(e, t) {
	return (
		!e.issues.length &&
			e.value === void 0 &&
			e.issues.push({ code: "invalid_type", expected: "nonoptional", input: e.value, inst: t }),
		e
	);
}
var RA = ie("$ZodCatch", (e, t) => {
		(kt.init(e, t),
			(e._zod.optin = "optional"),
			gt(e._zod, "optout", () => t.innerType._zod.optout),
			gt(e._zod, "values", () => t.innerType._zod.values),
			(e._zod.parse = (i, u) => {
				if (u.direction === "backward") return t.innerType._zod.run(i, u);
				const l = t.innerType._zod.run(i, u);
				return l instanceof Promise
					? l.then(
							(o) => (
								(i.value = o.value),
								o.issues.length &&
									((i.value = t.catchValue({
										...i,
										error: { issues: o.issues.map((f) => ki(f, u, Ci())) },
										input: i.value,
									})),
									(i.issues = []),
									(i.fallback = !0)),
								i
							),
						)
					: ((i.value = l.value),
						l.issues.length &&
							((i.value = t.catchValue({
								...i,
								error: { issues: l.issues.map((o) => ki(o, u, Ci())) },
								input: i.value,
							})),
							(i.issues = []),
							(i.fallback = !0)),
						i);
			}));
	}),
	CA = ie("$ZodPipe", (e, t) => {
		(kt.init(e, t),
			gt(e._zod, "values", () => t.in._zod.values),
			gt(e._zod, "optin", () => t.in._zod.optin),
			gt(e._zod, "optout", () => t.out._zod.optout),
			gt(e._zod, "propValues", () => t.in._zod.propValues),
			(e._zod.parse = (i, u) => {
				if (u.direction === "backward") {
					const o = t.out._zod.run(i, u);
					return o instanceof Promise ? o.then((f) => Bo(f, t.in, u)) : Bo(o, t.in, u);
				}
				const l = t.in._zod.run(i, u);
				return l instanceof Promise ? l.then((o) => Bo(o, t.out, u)) : Bo(l, t.out, u);
			}));
	});
function Bo(e, t, i) {
	return e.issues.length
		? ((e.aborted = !0), e)
		: t._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, i);
}
var kA = ie("$ZodReadonly", (e, t) => {
	(kt.init(e, t),
		gt(e._zod, "propValues", () => t.innerType._zod.propValues),
		gt(e._zod, "values", () => t.innerType._zod.values),
		gt(e._zod, "optin", () => t.innerType?._zod?.optin),
		gt(e._zod, "optout", () => t.innerType?._zod?.optout),
		(e._zod.parse = (i, u) => {
			if (u.direction === "backward") return t.innerType._zod.run(i, u);
			const l = t.innerType._zod.run(i, u);
			return l instanceof Promise ? l.then(L0) : L0(l);
		}));
});
function L0(e) {
	return ((e.value = Object.freeze(e.value)), e);
}
var MA = ie("$ZodCustom", (e, t) => {
	(Gn.init(e, t),
		kt.init(e, t),
		(e._zod.parse = (i, u) => i),
		(e._zod.check = (i) => {
			const u = i.value,
				l = t.fn(u);
			if (l instanceof Promise) return l.then((o) => U0(o, i, u, e));
			U0(l, i, u, e);
		}));
});
function U0(e, t, i, u) {
	if (!e) {
		const l = { code: "custom", input: i, inst: u, path: [...(u._zod.def.path ?? [])], continue: !u._zod.def.abort };
		(u._zod.def.params && (l.params = u._zod.def.params), t.issues.push(al(l)));
	}
}
var $0,
	NA = class {
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
function OA() {
	return new NA();
}
($0 = globalThis).__zod_globalRegistry ?? ($0.__zod_globalRegistry = OA());
var Gs = globalThis.__zod_globalRegistry;
function zA(e, t) {
	return new e({ type: "string", ...Te(t) });
}
function DA(e, t) {
	return new e({ type: "string", format: "email", check: "string_format", abort: !1, ...Te(t) });
}
function B0(e, t) {
	return new e({ type: "string", format: "guid", check: "string_format", abort: !1, ...Te(t) });
}
function jA(e, t) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, ...Te(t) });
}
function qA(e, t) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v4", ...Te(t) });
}
function IA(e, t) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v6", ...Te(t) });
}
function LA(e, t) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v7", ...Te(t) });
}
function UA(e, t) {
	return new e({ type: "string", format: "url", check: "string_format", abort: !1, ...Te(t) });
}
function $A(e, t) {
	return new e({ type: "string", format: "emoji", check: "string_format", abort: !1, ...Te(t) });
}
function BA(e, t) {
	return new e({ type: "string", format: "nanoid", check: "string_format", abort: !1, ...Te(t) });
}
function VA(e, t) {
	return new e({ type: "string", format: "cuid", check: "string_format", abort: !1, ...Te(t) });
}
function ZA(e, t) {
	return new e({ type: "string", format: "cuid2", check: "string_format", abort: !1, ...Te(t) });
}
function HA(e, t) {
	return new e({ type: "string", format: "ulid", check: "string_format", abort: !1, ...Te(t) });
}
function PA(e, t) {
	return new e({ type: "string", format: "xid", check: "string_format", abort: !1, ...Te(t) });
}
function QA(e, t) {
	return new e({ type: "string", format: "ksuid", check: "string_format", abort: !1, ...Te(t) });
}
function KA(e, t) {
	return new e({ type: "string", format: "ipv4", check: "string_format", abort: !1, ...Te(t) });
}
function YA(e, t) {
	return new e({ type: "string", format: "ipv6", check: "string_format", abort: !1, ...Te(t) });
}
function FA(e, t) {
	return new e({ type: "string", format: "cidrv4", check: "string_format", abort: !1, ...Te(t) });
}
function GA(e, t) {
	return new e({ type: "string", format: "cidrv6", check: "string_format", abort: !1, ...Te(t) });
}
function XA(e, t) {
	return new e({ type: "string", format: "base64", check: "string_format", abort: !1, ...Te(t) });
}
function JA(e, t) {
	return new e({ type: "string", format: "base64url", check: "string_format", abort: !1, ...Te(t) });
}
function WA(e, t) {
	return new e({ type: "string", format: "e164", check: "string_format", abort: !1, ...Te(t) });
}
function eR(e, t) {
	return new e({ type: "string", format: "jwt", check: "string_format", abort: !1, ...Te(t) });
}
function tR(e, t) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...Te(t),
	});
}
function nR(e, t) {
	return new e({ type: "string", format: "date", check: "string_format", ...Te(t) });
}
function rR(e, t) {
	return new e({ type: "string", format: "time", check: "string_format", precision: null, ...Te(t) });
}
function iR(e, t) {
	return new e({ type: "string", format: "duration", check: "string_format", ...Te(t) });
}
function aR(e, t) {
	return new e({ type: "number", checks: [], ...Te(t) });
}
function uR(e, t) {
	return new e({ type: "number", check: "number_format", abort: !1, format: "safeint", ...Te(t) });
}
function sR(e, t) {
	return new e({ type: "boolean", ...Te(t) });
}
function lR(e, t) {
	return new e({ type: "undefined", ...Te(t) });
}
function oR(e) {
	return new e({ type: "unknown" });
}
function cR(e, t) {
	return new e({ type: "never", ...Te(t) });
}
function V0(e, t) {
	return new Cb({ check: "less_than", ...Te(t), value: e, inclusive: !1 });
}
function Wd(e, t) {
	return new Cb({ check: "less_than", ...Te(t), value: e, inclusive: !0 });
}
function Z0(e, t) {
	return new kb({ check: "greater_than", ...Te(t), value: e, inclusive: !1 });
}
function eh(e, t) {
	return new kb({ check: "greater_than", ...Te(t), value: e, inclusive: !0 });
}
function H0(e, t) {
	return new Ex({ check: "multiple_of", ...Te(t), value: e });
}
function jb(e, t) {
	return new xx({ check: "max_length", ...Te(t), maximum: e });
}
function sc(e, t) {
	return new Ax({ check: "min_length", ...Te(t), minimum: e });
}
function qb(e, t) {
	return new Rx({ check: "length_equals", ...Te(t), length: e });
}
function fR(e, t) {
	return new Cx({ check: "string_format", format: "regex", ...Te(t), pattern: e });
}
function dR(e) {
	return new kx({ check: "string_format", format: "lowercase", ...Te(e) });
}
function hR(e) {
	return new Mx({ check: "string_format", format: "uppercase", ...Te(e) });
}
function mR(e, t) {
	return new Nx({ check: "string_format", format: "includes", ...Te(t), includes: e });
}
function vR(e, t) {
	return new Ox({ check: "string_format", format: "starts_with", ...Te(t), prefix: e });
}
function gR(e, t) {
	return new zx({ check: "string_format", format: "ends_with", ...Te(t), suffix: e });
}
function Ju(e) {
	return new Dx({ check: "overwrite", tx: e });
}
function yR(e) {
	return Ju((t) => t.normalize(e));
}
function pR() {
	return Ju((e) => e.trim());
}
function bR() {
	return Ju((e) => e.toLowerCase());
}
function _R() {
	return Ju((e) => e.toUpperCase());
}
function SR() {
	return Ju((e) => xT(e));
}
function wR(e, t, i) {
	return new e({ type: "array", element: t, ...Te(i) });
}
function ER(e, t, i) {
	return new e({ type: "custom", check: "custom", fn: t, ...Te(i) });
}
function TR(e, t) {
	const i = xR(
		(u) => (
			(u.addIssue = (l) => {
				if (typeof l == "string") u.issues.push(al(l, u.value, i._zod.def));
				else {
					const o = l;
					(o.fatal && (o.continue = !1),
						o.code ?? (o.code = "custom"),
						o.input ?? (o.input = u.value),
						o.inst ?? (o.inst = i),
						o.continue ?? (o.continue = !i._zod.def.abort),
						u.issues.push(al(o)));
				}
			}),
			e(u.value, u)
		),
		t,
	);
	return i;
}
function xR(e, t) {
	const i = new Gn({ check: "custom", ...Te(t) });
	return ((i._zod.check = e), i);
}
function Ib(e) {
	let t = e?.target ?? "draft-2020-12";
	return (
		t === "draft-4" && (t = "draft-04"),
		t === "draft-7" && (t = "draft-07"),
		{
			processors: e.processors ?? {},
			metadataRegistry: e?.metadata ?? Gs,
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
function rn(e, t, i = { path: [], schemaPath: [] }) {
	var u;
	const l = e._zod.def,
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
			const _ = f.schema,
				p = t.processors[l.type];
			if (!p) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${l.type}`);
			p(e, t, _, v);
		}
		const g = e._zod.parent;
		g && (f.ref || (f.ref = g), rn(g, t, v), (t.seen.get(g).isParent = !0));
	}
	const m = t.metadataRegistry.get(e);
	return (
		m && Object.assign(f.schema, m),
		t.io === "input" && Ln(e) && (delete f.schema.examples, delete f.schema.default),
		t.io === "input" && "_prefault" in f.schema && ((u = f.schema).default ?? (u.default = f.schema._prefault)),
		delete f.schema._prefault,
		t.seen.get(e).schema
	);
}
function Lb(e, t) {
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
	const l = (f) => {
			const h = e.target === "draft-2020-12" ? "$defs" : "definitions";
			if (e.external) {
				const g = e.external.registry.get(f[0])?.id,
					_ = e.external.uri ?? ((w) => w);
				if (g) return { ref: _(g) };
				const p = f[1].defId ?? f[1].schema.id ?? `schema${e.counter++}`;
				return ((f[1].defId = p), { defId: p, ref: `${_("__shared")}#/${h}/${p}` });
			}
			if (f[1] === i) return { ref: "#" };
			const m = `#/${h}/`,
				v = f[1].schema.id ?? `__schema${e.counter++}`;
			return { defId: v, ref: m + v };
		},
		o = (f) => {
			if (f[1].schema.$ref) return;
			const h = f[1],
				{ ref: m, defId: v } = l(f);
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
function Ub(e, t) {
	const i = e.seen.get(t);
	if (!i) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const u = (h) => {
		const m = e.seen.get(h);
		if (m.ref === null) return;
		const v = m.def ?? m.schema,
			g = { ...v },
			_ = m.ref;
		if (((m.ref = null), _)) {
			u(_);
			const w = e.seen.get(_),
				x = w.schema;
			if (
				(x.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0")
					? ((v.allOf = v.allOf ?? []), v.allOf.push(x))
					: Object.assign(v, x),
				Object.assign(v, g),
				h._zod.parent === _)
			)
				for (const R in v) R === "$ref" || R === "allOf" || R in g || delete v[R];
			if (x.$ref && w.def)
				for (const R in v)
					R === "$ref" ||
						R === "allOf" ||
						(R in w.def && JSON.stringify(v[R]) === JSON.stringify(w.def[R]) && delete v[R]);
		}
		const p = h._zod.parent;
		if (p && p !== _) {
			u(p);
			const w = e.seen.get(p);
			if (w?.schema.$ref && ((v.$ref = w.schema.$ref), w.def))
				for (const x in v)
					x === "$ref" ||
						x === "allOf" ||
						(x in w.def && JSON.stringify(v[x]) === JSON.stringify(w.def[x]) && delete v[x]);
		}
		e.override({ zodSchema: h, jsonSchema: v, path: m.path ?? [] });
	};
	for (const h of [...e.seen.entries()].reverse()) u(h[0]);
	const l = {};
	if (
		(e.target === "draft-2020-12"
			? (l.$schema = "https://json-schema.org/draft/2020-12/schema")
			: e.target === "draft-07"
				? (l.$schema = "http://json-schema.org/draft-07/schema#")
				: e.target === "draft-04"
					? (l.$schema = "http://json-schema.org/draft-04/schema#")
					: e.target,
		e.external?.uri)
	) {
		const h = e.external.registry.get(t)?.id;
		if (!h) throw new Error("Schema is missing an `id` property");
		l.$id = e.external.uri(h);
	}
	Object.assign(l, i.def ?? i.schema);
	const o = e.metadataRegistry.get(t)?.id;
	o !== void 0 && l.id === o && delete l.id;
	const f = e.external?.defs ?? {};
	for (const h of e.seen.entries()) {
		const m = h[1];
		m.def && m.defId && (m.def.id === m.defId && delete m.def.id, (f[m.defId] = m.def));
	}
	e.external || (Object.keys(f).length > 0 && (e.target === "draft-2020-12" ? (l.$defs = f) : (l.definitions = f)));
	try {
		const h = JSON.parse(JSON.stringify(l));
		return (
			Object.defineProperty(h, "~standard", {
				value: {
					...t["~standard"],
					jsonSchema: { input: lc(t, "input", e.processors), output: lc(t, "output", e.processors) },
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
function Ln(e, t) {
	const i = t ?? { seen: new Set() };
	if (i.seen.has(e)) return !1;
	i.seen.add(e);
	const u = e._zod.def;
	if (u.type === "transform") return !0;
	if (u.type === "array") return Ln(u.element, i);
	if (u.type === "set") return Ln(u.valueType, i);
	if (u.type === "lazy") return Ln(u.getter(), i);
	if (
		u.type === "promise" ||
		u.type === "optional" ||
		u.type === "nonoptional" ||
		u.type === "nullable" ||
		u.type === "readonly" ||
		u.type === "default" ||
		u.type === "prefault"
	)
		return Ln(u.innerType, i);
	if (u.type === "intersection") return Ln(u.left, i) || Ln(u.right, i);
	if (u.type === "record" || u.type === "map") return Ln(u.keyType, i) || Ln(u.valueType, i);
	if (u.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : Ln(u.in, i) || Ln(u.out, i);
	if (u.type === "object") {
		for (const l in u.shape) if (Ln(u.shape[l], i)) return !0;
		return !1;
	}
	if (u.type === "union") {
		for (const l of u.options) if (Ln(l, i)) return !0;
		return !1;
	}
	if (u.type === "tuple") {
		for (const l of u.items) if (Ln(l, i)) return !0;
		return !!(u.rest && Ln(u.rest, i));
	}
	return !1;
}
var AR =
		(e, t = {}) =>
		(i) => {
			const u = Ib({ ...i, processors: t });
			return (rn(e, u), Lb(u, e), Ub(u, e));
		},
	lc =
		(e, t, i = {}) =>
		(u) => {
			const { libraryOptions: l, target: o } = u ?? {},
				f = Ib({ ...(l ?? {}), target: o, io: t, processors: i });
			return (rn(e, f), Lb(f, e), Ub(f, e));
		},
	RR = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" },
	CR = (e, t, i, u) => {
		const l = i;
		l.type = "string";
		const { minimum: o, maximum: f, format: h, patterns: m, contentEncoding: v } = e._zod.bag;
		if (
			(typeof o == "number" && (l.minLength = o),
			typeof f == "number" && (l.maxLength = f),
			h && ((l.format = RR[h] ?? h), l.format === "" && delete l.format, h === "time" && delete l.format),
			v && (l.contentEncoding = v),
			m && m.size > 0)
		) {
			const g = [...m];
			g.length === 1
				? (l.pattern = g[0].source)
				: g.length > 1 &&
					(l.allOf = [
						...g.map((_) => ({
							...(t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0"
								? { type: "string" }
								: {}),
							pattern: _.source,
						})),
					]);
		}
	},
	kR = (e, t, i, u) => {
		const l = i,
			{ minimum: o, maximum: f, format: h, multipleOf: m, exclusiveMaximum: v, exclusiveMinimum: g } = e._zod.bag;
		typeof h == "string" && h.includes("int") ? (l.type = "integer") : (l.type = "number");
		const _ = typeof g == "number" && g >= (o ?? Number.NEGATIVE_INFINITY),
			p = typeof v == "number" && v <= (f ?? Number.POSITIVE_INFINITY),
			w = t.target === "draft-04" || t.target === "openapi-3.0";
		(_
			? w
				? ((l.minimum = g), (l.exclusiveMinimum = !0))
				: (l.exclusiveMinimum = g)
			: typeof o == "number" && (l.minimum = o),
			p
				? w
					? ((l.maximum = v), (l.exclusiveMaximum = !0))
					: (l.exclusiveMaximum = v)
				: typeof f == "number" && (l.maximum = f),
			typeof m == "number" && (l.multipleOf = m));
	},
	MR = (e, t, i, u) => {
		i.type = "boolean";
	},
	NR = (e, t, i, u) => {
		if (t.unrepresentable === "throw") throw new Error("Undefined cannot be represented in JSON Schema");
	},
	OR = (e, t, i, u) => {
		i.not = {};
	},
	zR = (e, t, i, u) => {},
	DR = (e, t, i, u) => {
		const l = e._zod.def,
			o = yb(l.entries);
		(o.every((f) => typeof f == "number") && (i.type = "number"),
			o.every((f) => typeof f == "string") && (i.type = "string"),
			(i.enum = o));
	},
	jR = (e, t, i, u) => {
		const l = e._zod.def,
			o = [];
		for (const f of l.values)
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
	qR = (e, t, i, u) => {
		if (t.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
	},
	IR = (e, t, i, u) => {
		if (t.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
	},
	LR = (e, t, i, u) => {
		const l = i,
			o = e._zod.def,
			{ minimum: f, maximum: h } = e._zod.bag;
		(typeof f == "number" && (l.minItems = f),
			typeof h == "number" && (l.maxItems = h),
			(l.type = "array"),
			(l.items = rn(o.element, t, { ...u, path: [...u.path, "items"] })));
	},
	UR = (e, t, i, u) => {
		const l = i,
			o = e._zod.def;
		((l.type = "object"), (l.properties = {}));
		const f = o.shape;
		for (const v in f) l.properties[v] = rn(f[v], t, { ...u, path: [...u.path, "properties", v] });
		const h = new Set(Object.keys(f)),
			m = new Set(
				[...h].filter((v) => {
					const g = o.shape[v]._zod;
					return t.io === "input" ? g.optin === void 0 : g.optout === void 0;
				}),
			);
		(m.size > 0 && (l.required = Array.from(m)),
			o.catchall?._zod.def.type === "never"
				? (l.additionalProperties = !1)
				: o.catchall
					? o.catchall &&
						(l.additionalProperties = rn(o.catchall, t, { ...u, path: [...u.path, "additionalProperties"] }))
					: t.io === "output" && (l.additionalProperties = !1));
	},
	$R = (e, t, i, u) => {
		const l = e._zod.def,
			o = l.inclusive === !1,
			f = l.options.map((h, m) => rn(h, t, { ...u, path: [...u.path, o ? "oneOf" : "anyOf", m] }));
		o ? (i.oneOf = f) : (i.anyOf = f);
	},
	BR = (e, t, i, u) => {
		const l = e._zod.def,
			o = rn(l.left, t, { ...u, path: [...u.path, "allOf", 0] }),
			f = rn(l.right, t, { ...u, path: [...u.path, "allOf", 1] }),
			h = (m) => "allOf" in m && Object.keys(m).length === 1;
		i.allOf = [...(h(o) ? o.allOf : [o]), ...(h(f) ? f.allOf : [f])];
	},
	VR = (e, t, i, u) => {
		const l = i,
			o = e._zod.def;
		l.type = "object";
		const f = o.keyType,
			h = f._zod.bag?.patterns;
		if (o.mode === "loose" && h && h.size > 0) {
			const v = rn(o.valueType, t, { ...u, path: [...u.path, "patternProperties", "*"] });
			l.patternProperties = {};
			for (const g of h) l.patternProperties[g.source] = v;
		} else
			((t.target === "draft-07" || t.target === "draft-2020-12") &&
				(l.propertyNames = rn(o.keyType, t, { ...u, path: [...u.path, "propertyNames"] })),
				(l.additionalProperties = rn(o.valueType, t, { ...u, path: [...u.path, "additionalProperties"] })));
		const m = f._zod.values;
		if (m) {
			const v = [...m].filter((g) => typeof g == "string" || typeof g == "number");
			v.length > 0 && (l.required = v);
		}
	},
	ZR = (e, t, i, u) => {
		const l = e._zod.def,
			o = rn(l.innerType, t, u),
			f = t.seen.get(e);
		t.target === "openapi-3.0" ? ((f.ref = l.innerType), (i.nullable = !0)) : (i.anyOf = [o, { type: "null" }]);
	},
	HR = (e, t, i, u) => {
		const l = e._zod.def;
		rn(l.innerType, t, u);
		const o = t.seen.get(e);
		o.ref = l.innerType;
	},
	PR = (e, t, i, u) => {
		const l = e._zod.def;
		rn(l.innerType, t, u);
		const o = t.seen.get(e);
		((o.ref = l.innerType), (i.default = JSON.parse(JSON.stringify(l.defaultValue))));
	},
	QR = (e, t, i, u) => {
		const l = e._zod.def;
		rn(l.innerType, t, u);
		const o = t.seen.get(e);
		((o.ref = l.innerType), t.io === "input" && (i._prefault = JSON.parse(JSON.stringify(l.defaultValue))));
	},
	KR = (e, t, i, u) => {
		const l = e._zod.def;
		rn(l.innerType, t, u);
		const o = t.seen.get(e);
		o.ref = l.innerType;
		let f;
		try {
			f = l.catchValue(void 0);
		} catch {
			throw new Error("Dynamic catch values are not supported in JSON Schema");
		}
		i.default = f;
	},
	YR = (e, t, i, u) => {
		const l = e._zod.def,
			o = l.in._zod.traits.has("$ZodTransform"),
			f = t.io === "input" ? (o ? l.out : l.in) : l.out;
		rn(f, t, u);
		const h = t.seen.get(e);
		h.ref = f;
	},
	FR = (e, t, i, u) => {
		const l = e._zod.def;
		rn(l.innerType, t, u);
		const o = t.seen.get(e);
		((o.ref = l.innerType), (i.readOnly = !0));
	},
	$b = (e, t, i, u) => {
		const l = e._zod.def;
		rn(l.innerType, t, u);
		const o = t.seen.get(e);
		o.ref = l.innerType;
	},
	GR = ie("ZodISODateTime", (e, t) => {
		(Yx.init(e, t), jt.init(e, t));
	});
function XR(e) {
	return tR(GR, e);
}
var JR = ie("ZodISODate", (e, t) => {
	(Fx.init(e, t), jt.init(e, t));
});
function WR(e) {
	return nR(JR, e);
}
var eC = ie("ZodISOTime", (e, t) => {
	(Gx.init(e, t), jt.init(e, t));
});
function tC(e) {
	return rR(eC, e);
}
var nC = ie("ZodISODuration", (e, t) => {
	(Xx.init(e, t), jt.init(e, t));
});
function rC(e) {
	return iR(nC, e);
}
var iC = (e, t) => {
		(Sb.init(e, t),
			(e.name = "ZodError"),
			Object.defineProperties(e, {
				format: { value: (i) => UT(e, i) },
				flatten: { value: (i) => LT(e, i) },
				addIssue: {
					value: (i) => {
						(e.issues.push(i), (e.message = JSON.stringify(e.issues, Rh, 2)));
					},
				},
				addIssues: {
					value: (i) => {
						(e.issues.push(...i), (e.message = JSON.stringify(e.issues, Rh, 2)));
					},
				},
				isEmpty: {
					get() {
						return e.issues.length === 0;
					},
				},
			}));
	},
	Tr = ie("ZodError", iC, { Parent: Error }),
	aC = Wh(Tr),
	uC = em(Tr),
	sC = pc(Tr),
	lC = bc(Tr),
	oC = VT(Tr),
	cC = ZT(Tr),
	fC = HT(Tr),
	dC = PT(Tr),
	hC = QT(Tr),
	mC = KT(Tr),
	vC = YT(Tr),
	gC = FT(Tr),
	P0 = new WeakMap();
function fl(e, t, i) {
	const u = Object.getPrototypeOf(e);
	let l = P0.get(u);
	if ((l || ((l = new Set()), P0.set(u, l)), !l.has(t))) {
		l.add(t);
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
var Nt = ie(
		"ZodType",
		(e, t) => (
			kt.init(e, t),
			Object.assign(e["~standard"], { jsonSchema: { input: lc(e, "input"), output: lc(e, "output") } }),
			(e.toJSONSchema = AR(e, {})),
			(e.def = t),
			(e.type = t.type),
			Object.defineProperty(e, "_def", { value: t }),
			(e.parse = (i, u) => aC(e, i, u, { callee: e.parse })),
			(e.safeParse = (i, u) => sC(e, i, u)),
			(e.parseAsync = async (i, u) => uC(e, i, u, { callee: e.parseAsync })),
			(e.safeParseAsync = async (i, u) => lC(e, i, u)),
			(e.spa = e.safeParseAsync),
			(e.encode = (i, u) => oC(e, i, u)),
			(e.decode = (i, u) => cC(e, i, u)),
			(e.encodeAsync = async (i, u) => fC(e, i, u)),
			(e.decodeAsync = async (i, u) => dC(e, i, u)),
			(e.safeEncode = (i, u) => hC(e, i, u)),
			(e.safeDecode = (i, u) => mC(e, i, u)),
			(e.safeEncodeAsync = async (i, u) => vC(e, i, u)),
			(e.safeDecodeAsync = async (i, u) => gC(e, i, u)),
			fl(e, "ZodType", {
				check(...i) {
					const u = this.def;
					return this.clone(
						ga(u, {
							checks: [
								...(u.checks ?? []),
								...i.map((l) =>
									typeof l == "function" ? { _zod: { check: l, def: { check: "custom" }, onattach: [] } } : l,
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
					return ya(this, i, u);
				},
				brand() {
					return this;
				},
				register(i, u) {
					return (i.add(this, u), this);
				},
				refine(i, u) {
					return this.check(fk(i, u));
				},
				superRefine(i, u) {
					return this.check(dk(i, u));
				},
				overwrite(i) {
					return this.check(Ju(i));
				},
				optional() {
					return F0(this);
				},
				exactOptional() {
					return JC(this);
				},
				nullable() {
					return G0(this);
				},
				nullish() {
					return F0(G0(this));
				},
				nonoptional(i) {
					return ik(this, i);
				},
				array() {
					return Pa(this);
				},
				or(i) {
					return Sc([this, i]);
				},
				and(i) {
					return QC(this, i);
				},
				transform(i) {
					return X0(this, GC(i));
				},
				default(i) {
					return tk(this, i);
				},
				prefault(i) {
					return rk(this, i);
				},
				catch(i) {
					return uk(this, i);
				},
				pipe(i) {
					return X0(this, i);
				},
				readonly() {
					return ok(this);
				},
				describe(i) {
					const u = this.clone();
					return (Gs.add(u, { description: i }), u);
				},
				meta(...i) {
					if (i.length === 0) return Gs.get(this);
					const u = this.clone();
					return (Gs.add(u, i[0]), u);
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
					return Gs.get(e)?.description;
				},
				configurable: !0,
			}),
			e
		),
	),
	Bb = ie("_ZodString", (e, t) => {
		(tm.init(e, t), Nt.init(e, t), (e._zod.processJSONSchema = (u, l, o) => CR(e, u, l, o)));
		const i = e._zod.bag;
		((e.format = i.format ?? null),
			(e.minLength = i.minimum ?? null),
			(e.maxLength = i.maximum ?? null),
			fl(e, "_ZodString", {
				regex(...u) {
					return this.check(fR(...u));
				},
				includes(...u) {
					return this.check(mR(...u));
				},
				startsWith(...u) {
					return this.check(vR(...u));
				},
				endsWith(...u) {
					return this.check(gR(...u));
				},
				min(...u) {
					return this.check(sc(...u));
				},
				max(...u) {
					return this.check(jb(...u));
				},
				length(...u) {
					return this.check(qb(...u));
				},
				nonempty(...u) {
					return this.check(sc(1, ...u));
				},
				lowercase(u) {
					return this.check(dR(u));
				},
				uppercase(u) {
					return this.check(hR(u));
				},
				trim() {
					return this.check(pR());
				},
				normalize(...u) {
					return this.check(yR(...u));
				},
				toLowerCase() {
					return this.check(bR());
				},
				toUpperCase() {
					return this.check(_R());
				},
				slugify() {
					return this.check(SR());
				},
			}));
	}),
	yC = ie("ZodString", (e, t) => {
		(tm.init(e, t),
			Bb.init(e, t),
			(e.email = (i) => e.check(DA(pC, i))),
			(e.url = (i) => e.check(UA(bC, i))),
			(e.jwt = (i) => e.check(eR(DC, i))),
			(e.emoji = (i) => e.check($A(_C, i))),
			(e.guid = (i) => e.check(B0(Q0, i))),
			(e.uuid = (i) => e.check(jA(Vo, i))),
			(e.uuidv4 = (i) => e.check(qA(Vo, i))),
			(e.uuidv6 = (i) => e.check(IA(Vo, i))),
			(e.uuidv7 = (i) => e.check(LA(Vo, i))),
			(e.nanoid = (i) => e.check(BA(SC, i))),
			(e.guid = (i) => e.check(B0(Q0, i))),
			(e.cuid = (i) => e.check(VA(wC, i))),
			(e.cuid2 = (i) => e.check(ZA(EC, i))),
			(e.ulid = (i) => e.check(HA(TC, i))),
			(e.base64 = (i) => e.check(XA(NC, i))),
			(e.base64url = (i) => e.check(JA(OC, i))),
			(e.xid = (i) => e.check(PA(xC, i))),
			(e.ksuid = (i) => e.check(QA(AC, i))),
			(e.ipv4 = (i) => e.check(KA(RC, i))),
			(e.ipv6 = (i) => e.check(YA(CC, i))),
			(e.cidrv4 = (i) => e.check(FA(kC, i))),
			(e.cidrv6 = (i) => e.check(GA(MC, i))),
			(e.e164 = (i) => e.check(WA(zC, i))),
			(e.datetime = (i) => e.check(XR(i))),
			(e.date = (i) => e.check(WR(i))),
			(e.time = (i) => e.check(tC(i))),
			(e.duration = (i) => e.check(rC(i))));
	});
function Dt(e) {
	return zA(yC, e);
}
var jt = ie("ZodStringFormat", (e, t) => {
		(Mt.init(e, t), Bb.init(e, t));
	}),
	pC = ie("ZodEmail", (e, t) => {
		(Ux.init(e, t), jt.init(e, t));
	}),
	Q0 = ie("ZodGUID", (e, t) => {
		(Ix.init(e, t), jt.init(e, t));
	}),
	Vo = ie("ZodUUID", (e, t) => {
		(Lx.init(e, t), jt.init(e, t));
	}),
	bC = ie("ZodURL", (e, t) => {
		($x.init(e, t), jt.init(e, t));
	}),
	_C = ie("ZodEmoji", (e, t) => {
		(Bx.init(e, t), jt.init(e, t));
	}),
	SC = ie("ZodNanoID", (e, t) => {
		(Vx.init(e, t), jt.init(e, t));
	}),
	wC = ie("ZodCUID", (e, t) => {
		(Zx.init(e, t), jt.init(e, t));
	}),
	EC = ie("ZodCUID2", (e, t) => {
		(Hx.init(e, t), jt.init(e, t));
	}),
	TC = ie("ZodULID", (e, t) => {
		(Px.init(e, t), jt.init(e, t));
	}),
	xC = ie("ZodXID", (e, t) => {
		(Qx.init(e, t), jt.init(e, t));
	}),
	AC = ie("ZodKSUID", (e, t) => {
		(Kx.init(e, t), jt.init(e, t));
	}),
	RC = ie("ZodIPv4", (e, t) => {
		(Jx.init(e, t), jt.init(e, t));
	}),
	CC = ie("ZodIPv6", (e, t) => {
		(Wx.init(e, t), jt.init(e, t));
	}),
	kC = ie("ZodCIDRv4", (e, t) => {
		(eA.init(e, t), jt.init(e, t));
	}),
	MC = ie("ZodCIDRv6", (e, t) => {
		(tA.init(e, t), jt.init(e, t));
	}),
	NC = ie("ZodBase64", (e, t) => {
		(nA.init(e, t), jt.init(e, t));
	}),
	OC = ie("ZodBase64URL", (e, t) => {
		(iA.init(e, t), jt.init(e, t));
	}),
	zC = ie("ZodE164", (e, t) => {
		(aA.init(e, t), jt.init(e, t));
	}),
	DC = ie("ZodJWT", (e, t) => {
		(sA.init(e, t), jt.init(e, t));
	}),
	Vb = ie("ZodNumber", (e, t) => {
		(Nb.init(e, t),
			Nt.init(e, t),
			(e._zod.processJSONSchema = (u, l, o) => kR(e, u, l, o)),
			fl(e, "ZodNumber", {
				gt(u, l) {
					return this.check(Z0(u, l));
				},
				gte(u, l) {
					return this.check(eh(u, l));
				},
				min(u, l) {
					return this.check(eh(u, l));
				},
				lt(u, l) {
					return this.check(V0(u, l));
				},
				lte(u, l) {
					return this.check(Wd(u, l));
				},
				max(u, l) {
					return this.check(Wd(u, l));
				},
				int(u) {
					return this.check(K0(u));
				},
				safe(u) {
					return this.check(K0(u));
				},
				positive(u) {
					return this.check(Z0(0, u));
				},
				nonnegative(u) {
					return this.check(eh(0, u));
				},
				negative(u) {
					return this.check(V0(0, u));
				},
				nonpositive(u) {
					return this.check(Wd(0, u));
				},
				multipleOf(u, l) {
					return this.check(H0(u, l));
				},
				step(u, l) {
					return this.check(H0(u, l));
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
function cr(e) {
	return aR(Vb, e);
}
var jC = ie("ZodNumberFormat", (e, t) => {
	(lA.init(e, t), Vb.init(e, t));
});
function K0(e) {
	return uR(jC, e);
}
var qC = ie("ZodBoolean", (e, t) => {
	(oA.init(e, t), Nt.init(e, t), (e._zod.processJSONSchema = (i, u, l) => MR(e, i, u, l)));
});
function nm(e) {
	return sR(qC, e);
}
var IC = ie("ZodUndefined", (e, t) => {
	(cA.init(e, t), Nt.init(e, t), (e._zod.processJSONSchema = (i, u, l) => NR(e, i, u, l)));
});
function LC(e) {
	return lR(IC, e);
}
var UC = ie("ZodUnknown", (e, t) => {
	(fA.init(e, t), Nt.init(e, t), (e._zod.processJSONSchema = (i, u, l) => zR(e, i, u, l)));
});
function kh() {
	return oR(UC);
}
var $C = ie("ZodNever", (e, t) => {
	(dA.init(e, t), Nt.init(e, t), (e._zod.processJSONSchema = (i, u, l) => OR(e, i, u, l)));
});
function BC(e) {
	return cR($C, e);
}
var VC = ie("ZodArray", (e, t) => {
	(hA.init(e, t),
		Nt.init(e, t),
		(e._zod.processJSONSchema = (i, u, l) => LR(e, i, u, l)),
		(e.element = t.element),
		fl(e, "ZodArray", {
			min(i, u) {
				return this.check(sc(i, u));
			},
			nonempty(i) {
				return this.check(sc(1, i));
			},
			max(i, u) {
				return this.check(jb(i, u));
			},
			length(i, u) {
				return this.check(qb(i, u));
			},
			unwrap() {
				return this.element;
			},
		}));
});
function Pa(e, t) {
	return wR(VC, e, t);
}
var ZC = ie("ZodObject", (e, t) => {
	(vA.init(e, t),
		Nt.init(e, t),
		(e._zod.processJSONSchema = (i, u, l) => UR(e, i, u, l)),
		gt(e, "shape", () => t.shape),
		fl(e, "ZodObject", {
			keyof() {
				return KC(Object.keys(this._zod.def.shape));
			},
			catchall(i) {
				return this.clone({ ...this._zod.def, catchall: i });
			},
			passthrough() {
				return this.clone({ ...this._zod.def, catchall: kh() });
			},
			loose() {
				return this.clone({ ...this._zod.def, catchall: kh() });
			},
			strict() {
				return this.clone({ ...this._zod.def, catchall: BC() });
			},
			strip() {
				return this.clone({ ...this._zod.def, catchall: void 0 });
			},
			extend(i) {
				return OT(this, i);
			},
			safeExtend(i) {
				return zT(this, i);
			},
			merge(i) {
				return DT(this, i);
			},
			pick(i) {
				return MT(this, i);
			},
			omit(i) {
				return NT(this, i);
			},
			partial(...i) {
				return jT(Hb, this, i[0]);
			},
			required(...i) {
				return qT(Pb, this, i[0]);
			},
		}));
});
function Nn(e, t) {
	const i = { type: "object", shape: e ?? {}, ...Te(t) };
	return new ZC(i);
}
var HC = ie("ZodUnion", (e, t) => {
	(gA.init(e, t), Nt.init(e, t), (e._zod.processJSONSchema = (i, u, l) => $R(e, i, u, l)), (e.options = t.options));
});
function Sc(e, t) {
	return new HC({ type: "union", options: e, ...Te(t) });
}
var PC = ie("ZodIntersection", (e, t) => {
	(yA.init(e, t), Nt.init(e, t), (e._zod.processJSONSchema = (i, u, l) => BR(e, i, u, l)));
});
function QC(e, t) {
	return new PC({ type: "intersection", left: e, right: t });
}
var Y0 = ie("ZodRecord", (e, t) => {
	(pA.init(e, t),
		Nt.init(e, t),
		(e._zod.processJSONSchema = (i, u, l) => VR(e, i, u, l)),
		(e.keyType = t.keyType),
		(e.valueType = t.valueType));
});
function Zb(e, t, i) {
	return !t || !t._zod
		? new Y0({ type: "record", keyType: Dt(), valueType: e, ...Te(t) })
		: new Y0({ type: "record", keyType: e, valueType: t, ...Te(i) });
}
var Mh = ie("ZodEnum", (e, t) => {
	(bA.init(e, t),
		Nt.init(e, t),
		(e._zod.processJSONSchema = (u, l, o) => DR(e, u, l, o)),
		(e.enum = t.entries),
		(e.options = Object.values(t.entries)));
	const i = new Set(Object.keys(t.entries));
	((e.extract = (u, l) => {
		const o = {};
		for (const f of u)
			if (i.has(f)) o[f] = t.entries[f];
			else throw new Error(`Key ${f} not found in enum`);
		return new Mh({ ...t, checks: [], ...Te(l), entries: o });
	}),
		(e.exclude = (u, l) => {
			const o = { ...t.entries };
			for (const f of u)
				if (i.has(f)) delete o[f];
				else throw new Error(`Key ${f} not found in enum`);
			return new Mh({ ...t, checks: [], ...Te(l), entries: o });
		}));
});
function KC(e, t) {
	const i = Array.isArray(e) ? Object.fromEntries(e.map((u) => [u, u])) : e;
	return new Mh({ type: "enum", entries: i, ...Te(t) });
}
var YC = ie("ZodLiteral", (e, t) => {
	(_A.init(e, t),
		Nt.init(e, t),
		(e._zod.processJSONSchema = (i, u, l) => jR(e, i, u, l)),
		(e.values = new Set(t.values)),
		Object.defineProperty(e, "value", {
			get() {
				if (t.values.length > 1)
					throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
				return t.values[0];
			},
		}));
});
function ul(e, t) {
	return new YC({ type: "literal", values: Array.isArray(e) ? e : [e], ...Te(t) });
}
var FC = ie("ZodTransform", (e, t) => {
	(SA.init(e, t),
		Nt.init(e, t),
		(e._zod.processJSONSchema = (i, u, l) => IR(e, i, u, l)),
		(e._zod.parse = (i, u) => {
			if (u.direction === "backward") throw new gb(e.constructor.name);
			i.addIssue = (o) => {
				if (typeof o == "string") i.issues.push(al(o, i.value, t));
				else {
					const f = o;
					(f.fatal && (f.continue = !1),
						f.code ?? (f.code = "custom"),
						f.input ?? (f.input = i.value),
						f.inst ?? (f.inst = e),
						i.issues.push(al(f)));
				}
			};
			const l = t.transform(i.value, i);
			return l instanceof Promise
				? l.then((o) => ((i.value = o), (i.fallback = !0), i))
				: ((i.value = l), (i.fallback = !0), i);
		}));
});
function GC(e) {
	return new FC({ type: "transform", transform: e });
}
var Hb = ie("ZodOptional", (e, t) => {
	(Db.init(e, t),
		Nt.init(e, t),
		(e._zod.processJSONSchema = (i, u, l) => $b(e, i, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function F0(e) {
	return new Hb({ type: "optional", innerType: e });
}
var XC = ie("ZodExactOptional", (e, t) => {
	(wA.init(e, t),
		Nt.init(e, t),
		(e._zod.processJSONSchema = (i, u, l) => $b(e, i, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function JC(e) {
	return new XC({ type: "optional", innerType: e });
}
var WC = ie("ZodNullable", (e, t) => {
	(EA.init(e, t),
		Nt.init(e, t),
		(e._zod.processJSONSchema = (i, u, l) => ZR(e, i, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function G0(e) {
	return new WC({ type: "nullable", innerType: e });
}
var ek = ie("ZodDefault", (e, t) => {
	(TA.init(e, t),
		Nt.init(e, t),
		(e._zod.processJSONSchema = (i, u, l) => PR(e, i, u, l)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeDefault = e.unwrap));
});
function tk(e, t) {
	return new ek({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : bb(t);
		},
	});
}
var nk = ie("ZodPrefault", (e, t) => {
	(xA.init(e, t),
		Nt.init(e, t),
		(e._zod.processJSONSchema = (i, u, l) => QR(e, i, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function rk(e, t) {
	return new nk({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : bb(t);
		},
	});
}
var Pb = ie("ZodNonOptional", (e, t) => {
	(AA.init(e, t),
		Nt.init(e, t),
		(e._zod.processJSONSchema = (i, u, l) => HR(e, i, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function ik(e, t) {
	return new Pb({ type: "nonoptional", innerType: e, ...Te(t) });
}
var ak = ie("ZodCatch", (e, t) => {
	(RA.init(e, t),
		Nt.init(e, t),
		(e._zod.processJSONSchema = (i, u, l) => KR(e, i, u, l)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeCatch = e.unwrap));
});
function uk(e, t) {
	return new ak({ type: "catch", innerType: e, catchValue: typeof t == "function" ? t : () => t });
}
var sk = ie("ZodPipe", (e, t) => {
	(CA.init(e, t),
		Nt.init(e, t),
		(e._zod.processJSONSchema = (i, u, l) => YR(e, i, u, l)),
		(e.in = t.in),
		(e.out = t.out));
});
function X0(e, t) {
	return new sk({ type: "pipe", in: e, out: t });
}
var lk = ie("ZodReadonly", (e, t) => {
	(kA.init(e, t),
		Nt.init(e, t),
		(e._zod.processJSONSchema = (i, u, l) => FR(e, i, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function ok(e) {
	return new lk({ type: "readonly", innerType: e });
}
var ck = ie("ZodCustom", (e, t) => {
	(MA.init(e, t), Nt.init(e, t), (e._zod.processJSONSchema = (i, u, l) => qR(e, i, u, l)));
});
function fk(e, t = {}) {
	return ER(ck, e, t);
}
function dk(e, t) {
	return TR(e, t);
}
var hk = ET(),
	Bu = ["thumbs_up", "heart", "laugh", "wow", "sad", "party", "rocket", "eyes"],
	Qb = { thumbs_up: "👍", heart: "❤️", laugh: "😂", wow: "😮", sad: "😢", party: "🎉", rocket: "🚀", eyes: "👀" },
	Kb = {
		thumbs_up: "Thumbs up",
		heart: "Heart",
		laugh: "Laugh",
		wow: "Wow",
		sad: "Sad",
		party: "Party",
		rocket: "Rocket",
		eyes: "Eyes",
	},
	mk = 9999999999999,
	vk = /(?:^|:)(\d{13}):([^:]{1,16})$/;
function Qa(e) {
	const t = vk.exec(e);
	return t ? mk - Number(t[1]) : null;
}
var Yb = "p/",
	gk = /^p\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/u,
	Nh = ["channels", "messages", "replies", "reactions"],
	rm =
		"Only the people added here can read it — and the organization owner, who can read everything in this workspace.";
function yk(e) {
	const t = crypto.randomUUID();
	return e === "private" ? `${Yb}${t}` : t;
}
function vn(e) {
	return e.startsWith(Yb);
}
function pk(e) {
	return gk.test(e);
}
function J0(e) {
	return `${e}:`;
}
function im(e) {
	const t = e.split(":");
	return t.length < 3 || Qa(e) === null ? null : t.slice(0, -2).join(":");
}
function Fb(e) {
	return `${e}:`;
}
function bk(e) {
	const t = e.split(":");
	if (t.length < 4) return null;
	const i = t[t.length - 2];
	if (!Bu.includes(i)) return null;
	const u = t.slice(0, -2).join(":");
	return Qa(u) === null ? null : { targetKey: u, token: i, keyTailUserId: t[t.length - 1] };
}
function sl(e) {
	const t = e.split(":");
	if (t.length < 5) return null;
	const i = t.slice(0, -2).join(":");
	return Qa(i) === null || Qa(e) === null ? null : i;
}
function oc(e) {
	const t = e.split(":");
	return t.length === 3 ? (Qa(e) === null ? null : e) : t.length === 5 ? sl(e) : null;
}
function th(e) {
	return `me:${e}`;
}
function W0(e) {
	return `${e}:read`;
}
function _k(e) {
	const t = e.split(":");
	return t.length !== 3 || t[1] !== "read" || !vn(t[0]) ? null : { channelKey: t[0], keyTailUserId: t[2] };
}
var Sk = Nn({ name: Dt().min(1).max(64), archivedAt: cr().nullable(), topic: Dt().max(250).optional() }),
	wk = Nn({ fileNodeId: Dt().min(1), name: Dt().min(1) }),
	Ek = Nn({
		text: Dt(),
		attachments: Pa(wk),
		editedAt: cr().nullable(),
		deletedAt: cr().nullable(),
		mentions: Pa(Dt()).optional(),
	}),
	Tk = "Someone with no name yet";
function Go(e) {
	return e !== null && e !== "" ? e : Tk;
}
function xk(e, t) {
	const i = /(?:^|\s)@([^\s@]*)$/.exec(e.slice(0, t));
	if (i === null) return null;
	const u = i[1] ?? "";
	return { start: t - u.length - 1, query: u };
}
function Ak(e, t, i) {
	const u = t.toLowerCase();
	return e
		.filter((l) => l.userId !== i)
		.map((l) => ({ ...l, label: Go(l.displayName) }))
		.filter((l) => l.label.toLowerCase().includes(u))
		.sort((l, o) => l.label.localeCompare(o.label));
}
function Rk(e, t, i, u) {
	return { text: `${e.slice(0, t)}@${u} ${e.slice(i)}`, caret: t + u.length + 2 };
}
function Ck(e, t) {
	const i = [];
	for (const [u, l] of e) t.includes(`@${l}`) && i.push(u);
	return i;
}
function Gb(e) {
	return e === "not_consented"
		? "This workspace has not allowed Chitchat to read the member list yet. An admin can accept the plugin's current permissions."
		: "The member list is not available right now. You can keep typing.";
}
var kk = Nn({ channels: Zb(Dt(), cr()) }),
	Mk = Nn({
		messages: cr().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
		replies: cr().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
	}),
	Nk = Sc([
		Nn({ at: cr(), activity: Mk }),
		Nn({ at: cr(), activity: LC().optional() }).transform((e) => ({ at: e.at, activity: { messages: 0, replies: 0 } })),
	]),
	Ja = Nn({
		collection: Dt(),
		key: Dt().min(1).max(128),
		value: Zb(Dt(), kh()),
		revision: cr(),
		createdBy: Dt().min(1),
		updatedBy: Dt(),
		ownership: Sc([ul("shared"), ul("owned")]),
		createdAt: cr(),
		updatedAt: cr(),
	});
function Ok(e, t) {
	const i = Ja.safeParse(e);
	if (!i.success) return null;
	const u = Qa(i.data.key);
	if (u === null) return null;
	const l = t.safeParse(i.data.value);
	return l.success
		? {
				key: i.data.key,
				value: l.data,
				revision: i.data.revision,
				createdBy: i.data.createdBy,
				updatedBy: i.data.updatedBy,
				createdAt: i.data.createdAt,
				updatedAt: i.data.updatedAt,
				timestamp: u,
			}
		: null;
}
function Ys(e) {
	const t = Ja.safeParse(e);
	if (!t.success) return null;
	const i = Sk.safeParse(t.data.value);
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
function cc(e) {
	return Ok(e, Ek);
}
var zk = Nn({ removed: ul(!0).optional() });
function Dk(e) {
	const t = Ja.safeParse(e);
	if (!t.success) return null;
	const i = bk(t.data.key);
	if (i === null) return null;
	const u = zk.safeParse(t.data.value);
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
function jk(e) {
	const t = Ja.safeParse(e);
	if (!t.success) return null;
	const i = kk.safeParse(t.data.value);
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
function ep(e) {
	const t = Ja.safeParse(e);
	if (!t.success || t.data.ownership !== "owned") return null;
	const i = _k(t.data.key);
	if (i === null) return null;
	const u = Nk.safeParse(t.data.value);
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
function ju(e, t) {
	const i = { ...e.channels };
	for (const [u, l] of Object.entries(t.channels)) {
		const o = i[u];
		i[u] = o === void 0 ? l : Math.max(o, l);
	}
	return { channels: i };
}
function qk(e) {
	const t = new Map();
	for (const i of e.docs) {
		const u = im(i.key);
		if (u === null || vn(u) || i.value.deletedAt !== null || i.createdBy === e.selfUserId) continue;
		const l = e.cursorChannels[u];
		if (l !== void 0 && i.timestamp <= l) continue;
		const o = i.value.mentions?.includes(e.selfUserId) ? 1 : 0,
			f = t.get(u);
		f === void 0
			? t.set(u, { unreadCount: 1, mentionCount: o, latest: i })
			: ((f.unreadCount += 1), (f.mentionCount += o), i.timestamp > f.latest.timestamp && (f.latest = i));
	}
	return t;
}
function wc(e, t) {
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
var Zo = Nn({ document: Ja.nullable() }),
	Ik = Nn({
		path: Dt(),
		name: Dt(),
		kind: Sc([ul("file"), ul("folder")]),
		nodeId: Dt(),
		contentType: Dt().nullable(),
		updatedAt: cr(),
	}),
	Lk = Nn({ items: Pa(Ik), cursor: Dt().nullable(), isDone: nm() }),
	Uk = Nn({ documents: Pa(Ja), cursor: Dt().nullable(), isDone: nm() }),
	$k = Nn({
		items: Pa(Nn({ fileNodeId: Dt(), url: Dt(), expiresAt: cr() })),
		errors: Pa(Nn({ fileNodeId: Dt(), message: Dt() })),
		truncated: nm(),
	});
function Un(e) {
	return e instanceof Error ? e.message : String(e);
}
function nh(e) {
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
function Xo(e) {
	let t = [],
		i = 0;
	return {
		apply_window(u) {
			const l = [];
			for (const o of u) {
				const f = e(o);
				if (f === null) {
					i += 1;
					continue;
				}
				l.push(f);
			}
			return ((t = l), l);
		},
		get_all: () => t,
		dropped_count: () => i,
	};
}
function Bk(e, t) {
	const i = new Map();
	for (const l of e) {
		if (l.removed) continue;
		let o = i.get(l.targetKey);
		o === void 0 && ((o = new Map()), i.set(l.targetKey, o));
		let f = o.get(l.token);
		(f === void 0 && ((f = new Set()), o.set(l.token, f)), f.add(l.createdBy));
	}
	const u = new Map();
	for (const [l, o] of i) {
		const f = [];
		for (const h of Bu) {
			const m = o.get(h);
			m === void 0 || m.size === 0 || f.push({ token: h, count: m.size, reactedByMe: m.has(t) });
		}
		u.set(l, f);
	}
	return u;
}
function Vk(e) {
	const t = new Map();
	for (const i of e) {
		const u = sl(i.key);
		if (u === null) continue;
		const l = t.get(u);
		l === void 0
			? t.set(u, { count: 1, latestAt: i.timestamp })
			: ((l.count += 1), (l.latestAt = Math.max(l.latestAt, i.timestamp)));
	}
	return t;
}
function Zk(e, t) {
	return e > 99 && t ? "99+" : String(e);
}
function Xb(e, t) {
	return e.convex.query(e.api.plugins_data.list_members, t).then(
		(i) =>
			i === null
				? { _nay: { name: "denied", message: "Chitchat can no longer read the member list" } }
				: i.refusal !== void 0
					? {
							_nay: {
								name: "not_consented",
								message: "This workspace has not allowed Chitchat to read the member list",
							},
						}
					: { _yay: { members: i.members, cursor: i.cursor } },
		() => ({ _nay: { name: "unavailable", message: "Failed to read the member list" } }),
	);
}
var Hk = 3,
	Pk = 5e3,
	Qk = 3e4,
	Kk = "This message is too long to send. Shorten it and try again.",
	Yk = "Sending too fast — wait a moment and try again.";
function Fk(e) {
	return new TextEncoder().encode(JSON.stringify(e)).byteLength > Qk;
}
function Gk(e) {
	return new Promise((t) => setTimeout(t, e));
}
async function Za(e, t, i) {
	try {
		for (let u = 1; ; u += 1) {
			const l = await e.backend.invoke({ endpoint: t, input: i });
			if ("_nay" in l) {
				if (l._nay.name === "busy" && u < Hk) {
					await Gk(Math.min(l._nay.retryAfterMs ?? 1e3, Pk));
					continue;
				}
				return l._nay.name === "busy"
					? { _nay: { name: "busy", message: Yk } }
					: { _nay: { name: l._nay.name, message: l._nay.message } };
			}
			let o = null;
			try {
				o = JSON.parse(l._yay.output);
			} catch {
				o = null;
			}
			const f = typeof o == "object" && o !== null ? o : {};
			if (l._yay.pluginStatus >= 200 && l._yay.pluginStatus < 300) return { _yay: f };
			const h =
				typeof f.message == "string" && f.message !== ""
					? f.message
					: `The Chitchat backend refused this call (${l._yay.pluginStatus})`;
			return {
				_nay: {
					name: l._yay.pluginStatus === 409 ? "conflict" : l._yay.pluginStatus === 413 ? "too_large" : "refused",
					message: h,
				},
			};
		}
	} catch (u) {
		return { _nay: { name: "unavailable", message: Un(u) } };
	}
}
var Xk = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
	Jk = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (t, i, u) => (u ? u.toUpperCase() : i.toLowerCase())),
	tp = (e) => {
		const t = Jk(e);
		return t.charAt(0).toUpperCase() + t.slice(1);
	},
	Jb = (...e) =>
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
	tM = (0, b.forwardRef)(
		(
			{
				color: e = "currentColor",
				size: t = 24,
				strokeWidth: i = 2,
				absoluteStrokeWidth: u,
				className: l = "",
				children: o,
				iconNode: f,
				...h
			},
			m,
		) =>
			(0, b.createElement)(
				"svg",
				{
					ref: m,
					...eM,
					width: t,
					height: t,
					stroke: e,
					strokeWidth: u ? (Number(i) * 24) / Number(t) : i,
					className: Jb("lucide", l),
					...(!o && !Wk(h) && { "aria-hidden": "true" }),
					...h,
				},
				[...f.map(([v, g]) => (0, b.createElement)(v, g)), ...(Array.isArray(o) ? o : [o])],
			),
	),
	am = (e, t) => {
		const i = (0, b.forwardRef)(({ className: u, ...l }, o) =>
			(0, b.createElement)(tM, { ref: o, iconNode: t, className: Jb(`lucide-${Xk(tp(e))}`, `lucide-${e}`, u), ...l }),
		);
		return ((i.displayName = tp(e)), i);
	},
	nM = [
		["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
		["path", { d: "M12 19V5", key: "x0mq9r" }],
	],
	rM = am("arrow-up", nM),
	iM = [
		["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
		["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
		["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
	],
	aM = am("ellipsis", iM),
	uM = [
		[
			"path",
			{
				d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
				key: "1miecu",
			},
		],
	],
	sM = am("paperclip", uM),
	Wu = lM();
function lM() {
	var e;
	return typeof window < "u" && !!((e = window.document) != null && e.createElement);
}
function At(e) {
	return e ? ("self" in e ? e.document : e.ownerDocument || document) : document;
}
function Wb(e) {
	return e ? ("self" in e ? e.self : At(e).defaultView || window) : self;
}
function Ni(e, t = !1) {
	const { activeElement: i } = At(e);
	if (!i?.nodeName) return null;
	if (um(i) && i.contentDocument) return Ni(i.contentDocument.body, t);
	if (t) {
		const u = i.getAttribute("aria-activedescendant");
		if (u) {
			const l = At(i).getElementById(u);
			if (l) return l;
		}
	}
	return i;
}
function an(e, t) {
	return e === t || e.contains(t);
}
function um(e) {
	return e.tagName === "IFRAME";
}
function da(e) {
	const t = e.tagName.toLowerCase();
	return t === "button" ? !0 : t === "input" && e.type ? oM.indexOf(e.type) !== -1 : !1;
}
var oM = ["button", "color", "file", "image", "reset", "submit"];
function e_(e) {
	if (typeof e.checkVisibility == "function") return e.checkVisibility();
	const t = e;
	return t.offsetWidth > 0 || t.offsetHeight > 0 || e.getClientRects().length > 0;
}
function Gr(e) {
	try {
		const t = e instanceof HTMLInputElement && e.selectionStart !== null,
			i = e.tagName === "TEXTAREA";
		return t || i || !1;
	} catch {
		return !1;
	}
}
function Oh(e) {
	return e.isContentEditable || Gr(e);
}
function cM(e) {
	if (Gr(e)) return e.value;
	if (e.isContentEditable) {
		const t = At(e).createRange();
		return (t.selectNodeContents(e), t.toString());
	}
	return "";
}
function zh(e) {
	let t = 0,
		i = 0;
	if (Gr(e)) ((t = e.selectionStart || 0), (i = e.selectionEnd || 0));
	else if (e.isContentEditable) {
		const u = At(e).getSelection();
		if (u?.rangeCount && u.anchorNode && an(e, u.anchorNode) && u.focusNode && an(e, u.focusNode)) {
			const l = u.getRangeAt(0),
				o = l.cloneRange();
			(o.selectNodeContents(e),
				o.setEnd(l.startContainer, l.startOffset),
				(t = o.toString().length),
				o.setEnd(l.endContainer, l.endOffset),
				(i = o.toString().length));
		}
	}
	return { start: t, end: i };
}
function Ec(e, t) {
	const i = ["dialog", "menu", "listbox", "tree", "grid"],
		u = e?.getAttribute("role");
	return u && i.indexOf(u) !== -1 ? u : t;
}
function t_(e, t) {
	var i;
	const u = { menu: "menuitem", listbox: "option", tree: "treeitem" },
		l = Ec(e);
	return l && (i = u[l]) != null ? i : t;
}
function sm(e) {
	if (!e) return null;
	const t = (i) => i === "auto" || i === "scroll";
	if (e.clientHeight && e.scrollHeight > e.clientHeight) {
		const { overflowY: i } = getComputedStyle(e);
		if (t(i)) return e;
	} else if (e.clientWidth && e.scrollWidth > e.clientWidth) {
		const { overflowX: i } = getComputedStyle(e);
		if (t(i)) return e;
	}
	return sm(e.parentElement) || document.scrollingElement || document.body;
}
function rh(e, ...t) {
	/text|search|password|tel|url/i.test(e.type) && e.setSelectionRange(...t);
}
function n_(e, t) {
	const i = e.map((l, o) => [o, l]);
	let u = !1;
	return (
		i.sort(([l, o], [f, h]) => {
			const m = t(o),
				v = t(h);
			return m === v || !m || !v ? 0 : fM(m, v) ? (l > f && (u = !0), -1) : (l < f && (u = !0), 1);
		}),
		u ? i.map(([l, o]) => o) : e
	);
}
function fM(e, t) {
	return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
var dM = { id: null };
function hM(e, t, i = !1) {
	const u = e.findIndex((l) => l.id === t);
	return [...e.slice(u + 1), ...(i ? [dM] : []), ...e.slice(0, u)];
}
function mM(e, t) {
	return e.find((i) => (t ? !i.disabled && i.id !== t : !i.disabled));
}
function ca(e, t) {
	return (t && e.item(t)) || null;
}
function vM(e) {
	const t = [];
	for (const i of e) {
		const u = t.find((l) => {
			var o;
			return ((o = l[0]) == null ? void 0 : o.rowId) === i.rowId;
		});
		u ? u.push(i) : t.push([i]);
	}
	return t;
}
function gM(e, t = !1) {
	if (Gr(e)) e.setSelectionRange(t ? e.value.length : 0, e.value.length);
	else if (e.isContentEditable) {
		const i = At(e).getSelection();
		(i?.selectAllChildren(e), t && i?.collapseToEnd());
	}
}
var Dh = Symbol("FOCUS_SILENTLY");
function yM(e) {
	((e[Dh] = !0), e.focus({ preventScroll: !0 }));
}
function pM(e) {
	const t = e[Dh];
	return (delete e[Dh], t);
}
function Ws(e, t, i) {
	if (!t || t === i) return !1;
	const u = e.item(t.id);
	return !(!u || (i && u.element === i));
}
function el(...e) {}
function r_(e, t) {
	return bM(e) ? e(_M(t) ? t() : t) : e;
}
function bM(e) {
	return typeof e == "function";
}
function _M(e) {
	return typeof e == "function";
}
function Mi(e, t) {
	return typeof Object.hasOwn == "function" ? Object.hasOwn(e, t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Fn(...e) {
	return (...t) => {
		for (const i of e) typeof i == "function" && i(...t);
	};
}
function i_(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function SM(e, t) {
	const i = { ...e };
	for (const u of t) Mi(i, u) && delete i[u];
	return i;
}
function wM(e, t) {
	const i = {};
	for (const u of t) Mi(e, u) && (i[u] = e[u]);
	return i;
}
function a_(e) {
	return e;
}
function Pt(e, t) {
	if (!e) throw typeof t != "string" ? new Error("Invariant failed") : new Error(t);
}
function EM(e) {
	return Object.keys(e);
}
function Tc(e, ...t) {
	const i = typeof e == "function" ? e(...t) : e;
	return i == null ? !1 : !i;
}
function dl(e) {
	return e.disabled || e["aria-disabled"] === !0 || e["aria-disabled"] === "true";
}
function Wa(e) {
	const t = {};
	for (const i in e) e[i] !== void 0 && (t[i] = e[i]);
	return t;
}
function je(...e) {
	for (const t of e) if (t !== void 0) return t;
}
function jh(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function TM(e) {
	return !e || !(0, b.isValidElement)(e) ? !1 : "ref" in e.props || "ref" in e;
}
function xM(e) {
	return TM(e) ? { ...e.props }.ref || e.ref : null;
}
function AM(e, t) {
	const i = { ...e };
	for (const u in t) {
		if (!Mi(t, u)) continue;
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
		const l = t[u];
		if (typeof l == "function" && u.startsWith("on")) {
			const o = e[u];
			if (typeof o == "function") {
				i[u] = (...f) => {
					(l(...f), o(...f));
				};
				continue;
			}
		}
		i[u] = l;
	}
	return i;
}
function u_() {
	return Wu && !!navigator.maxTouchPoints;
}
function lm() {
	return Wu ? /mac|iphone|ipad|ipod/i.test(navigator.platform) : !1;
}
function xc() {
	return Wu && lm() && /apple/i.test(navigator.vendor);
}
function RM() {
	return Wu && /firefox\//i.test(navigator.userAgent);
}
function CM() {
	return Wu && navigator.platform.startsWith("Mac") && !u_();
}
function s_(e) {
	return !!(e.currentTarget && !an(e.currentTarget, e.target));
}
function lr(e) {
	return e.target === e.currentTarget;
}
function l_(e) {
	const t = e.currentTarget;
	if (!t) return !1;
	const i = lm();
	if ((i && !e.metaKey) || (!i && !e.ctrlKey)) return !1;
	const u = t.tagName.toLowerCase();
	return u === "a" || (u === "button" && t.type === "submit") || (u === "input" && t.type === "submit");
}
function o_(e) {
	const t = e.currentTarget;
	if (!t) return !1;
	const i = t.tagName.toLowerCase();
	return e.altKey ? i === "a" || (i === "button" && t.type === "submit") || (i === "input" && t.type === "submit") : !1;
}
function kM(e, t, i) {
	const u = new Event(t, i);
	return e.dispatchEvent(u);
}
function qu(e, t) {
	const i = new FocusEvent("blur", t),
		u = e.dispatchEvent(i),
		l = { ...t, bubbles: !0 };
	return (e.dispatchEvent(new FocusEvent("focusout", l)), u);
}
function MM(e, t, i) {
	const u = new KeyboardEvent(t, i);
	return e.dispatchEvent(u);
}
function np(e, t) {
	const i = new MouseEvent("click", t);
	return e.dispatchEvent(i);
}
function $a(e, t) {
	const i = t || e.currentTarget,
		u = e.relatedTarget;
	return !u || !an(i, u);
}
function Hu(e, t, i, u) {
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
function Tn(e, t, i, u = window) {
	const l = [];
	try {
		u.document.addEventListener(e, t, i);
		for (const f of Array.from(u.frames)) l.push(Tn(e, t, i, f));
	} catch {}
	return () => {
		try {
			u.document.removeEventListener(e, t, i);
		} catch {}
		for (const f of l) f();
	};
}
var om = { ...b },
	rp = om.useId,
	qD = om.useDeferredValue,
	ip = om.useInsertionEffect,
	at = Wu ? b.useLayoutEffect : b.useEffect;
function NM(e) {
	const [t] = (0, b.useState)(e);
	return t;
}
function c_(e) {
	const t = (0, b.useRef)(e);
	return (
		at(() => {
			t.current = e;
		}),
		t
	);
}
function ze(e) {
	const t = (0, b.useRef)(() => {
		throw new Error("Cannot call an event handler while rendering.");
	});
	return (
		ip
			? ip(() => {
					t.current = e;
				})
			: (t.current = e),
		(0, b.useCallback)((...i) => {
			var u;
			return (u = t.current) == null ? void 0 : u.call(t, ...i);
		}, [])
	);
}
function OM(e) {
	const [t, i] = (0, b.useState)(null);
	return (
		at(() => {
			if (t == null || !e) return;
			let u = null;
			return (
				e((l) => ((u = l), t)),
				() => {
					e(u);
				}
			);
		}, [t, e]),
		[t, i]
	);
}
function Qt(...e) {
	return (0, b.useMemo)(() => {
		if (e.some(Boolean))
			return (t) => {
				for (const i of e) jh(i, t);
			};
	}, e);
}
function Oi(e) {
	if (rp) {
		const u = rp();
		return e || u;
	}
	const [t, i] = (0, b.useState)(e);
	return (
		at(() => {
			if (e || t) return;
			const u = Math.random().toString(36).slice(2, 8);
			i(`id-${u}`);
		}, [e, t]),
		e || t
	);
}
function f_(e, t) {
	const i = (o) => {
			if (typeof o == "string") return o;
		},
		[u, l] = (0, b.useState)(() => i(t));
	return (
		at(() => {
			const o = e && "current" in e ? e.current : e;
			l(o?.tagName.toLowerCase() || i(t));
		}, [e, t]),
		u
	);
}
function zM(e, t, i) {
	const u = NM(i),
		[l, o] = (0, b.useState)(u);
	return (
		(0, b.useEffect)(() => {
			const f = e && "current" in e ? e.current : e;
			if (!f) return;
			const h = () => {
					const v = f.getAttribute(t);
					o(v ?? u);
				},
				m = new MutationObserver(h);
			return (m.observe(f, { attributeFilter: [t] }), h(), () => m.disconnect());
		}, [e, t, u]),
		l
	);
}
function es(e, t) {
	const i = (0, b.useRef)(!1);
	((0, b.useEffect)(() => {
		if (i.current) return e();
		i.current = !0;
	}, t),
		(0, b.useEffect)(
			() => () => {
				i.current = !1;
			},
			[],
		));
}
function DM(e, t) {
	const i = (0, b.useRef)(!1);
	(at(() => {
		if (i.current) return e();
		i.current = !0;
	}, t),
		at(
			() => () => {
				i.current = !1;
			},
			[],
		));
}
function d_() {
	return (0, b.useReducer)(() => [], []);
}
function Ct(e) {
	return ze(typeof e == "function" ? e : () => e);
}
function xn(e, t, i = []) {
	const u = (0, b.useCallback)((l) => (e.wrapElement && (l = e.wrapElement(l)), t(l)), [...i, e.wrapElement]);
	return { ...e, wrapElement: u };
}
function cm(e = !1, t) {
	const [i, u] = (0, b.useState)(null);
	return { portalRef: Qt(u, t), portalNode: i, domReady: !e || i };
}
function h_(e, t, i) {
	const u = e.onLoadedMetadataCapture,
		l = (0, b.useMemo)(() => Object.assign(() => {}, { ...u, [t]: i }), [u, t, i]);
	return [u?.[t], { onLoadedMetadataCapture: l }];
}
var ap = !1;
function fm() {
	return (
		(0, b.useEffect)(() => {
			ap ||
				(Tn("mousemove", qM, !0),
				Tn("mousedown", Ho, !0),
				Tn("mouseup", Ho, !0),
				Tn("keydown", Ho, !0),
				Tn("scroll", Ho, !0),
				(ap = !0));
		}, []),
		ze(() => dm)
	);
}
var dm = !1,
	up = 0,
	sp = 0;
function jM(e) {
	const t = e.movementX || e.screenX - up,
		i = e.movementY || e.screenY - sp;
	return ((up = e.screenX), (sp = e.screenY), t || i || !1);
}
function qM(e) {
	jM(e) && (dm = !0);
}
function Ho() {
	dm = !1;
}
var IM = Er((e) => {
		var t = Symbol.for("react.transitional.element"),
			i = Symbol.for("react.fragment");
		function u(l, o, f) {
			var h = null;
			if ((f !== void 0 && (h = "" + f), o.key !== void 0 && (h = "" + o.key), "key" in o)) {
				f = {};
				for (var m in o) m !== "key" && (f[m] = o[m]);
			} else f = o;
			return ((o = f.ref), { $$typeof: t, type: l, key: h, ref: o !== void 0 ? o : null, props: f });
		}
		((e.Fragment = i), (e.jsx = u), (e.jsxs = u));
	}),
	LM = Er((e, t) => {
		t.exports = IM();
	}),
	S = LM();
function Ke(e) {
	const t = b.forwardRef((i, u) => e({ ...i, ref: u }));
	return ((t.displayName = e.displayName || e.name), t);
}
function Ac(e, t) {
	return b.memo(e, t);
}
function Xe(e, t) {
	const { wrapElement: i, render: u, ...l } = t,
		o = Qt(t.ref, xM(u));
	let f;
	if (b.isValidElement(u)) {
		const h = { ...u.props, ref: o };
		f = b.cloneElement(u, AM(l, h));
	} else u ? (f = u(l)) : (f = (0, S.jsx)(e, { ...l }));
	return i ? i(f) : f;
}
function et(e) {
	const t = (i = {}) => e(i);
	return ((t.displayName = e.name), t);
}
function Xr(e = [], t = []) {
	const i = b.createContext(void 0),
		u = b.createContext(void 0),
		l = () => b.useContext(i),
		o = (v = !1) => {
			const g = b.useContext(u),
				_ = l();
			return v ? g : g || _;
		},
		f = () => {
			const v = b.useContext(u),
				g = l();
			if (!(v && v === g)) return g;
		},
		h = (v) => e.reduceRight((g, _) => (0, S.jsx)(_, { ...v, children: g }), (0, S.jsx)(i.Provider, { ...v }));
	return {
		context: i,
		scopedContext: u,
		useContext: l,
		useScopedContext: o,
		useProviderContext: f,
		ContextProvider: h,
		ScopedContextProvider: (v) =>
			(0, S.jsx)(h, {
				...v,
				children: t.reduceRight((g, _) => (0, S.jsx)(_, { ...v, children: g }), (0, S.jsx)(u.Provider, { ...v })),
			}),
	};
}
var hl = Xr(),
	UM = hl.useContext,
	ID = hl.useScopedContext,
	LD = hl.useProviderContext,
	$M = hl.ContextProvider,
	BM = hl.ScopedContextProvider,
	ml = Xr([$M], [BM]),
	Rc = ml.useContext,
	UD = ml.useScopedContext,
	VM = ml.useProviderContext,
	vl = ml.ContextProvider,
	Cc = ml.ScopedContextProvider,
	ZM = (0, b.createContext)(void 0),
	HM = (0, b.createContext)(void 0),
	m_ = (0, b.createContext)(!0),
	kc =
		"input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], summary, iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])";
function PM(e) {
	return Number.parseInt(e.getAttribute("tabindex") || "0", 10) < 0;
}
function zr(e) {
	return !(!e.matches(kc) || !e_(e) || e.closest("[inert]"));
}
function Gu(e) {
	if (!zr(e) || PM(e)) return !1;
	if (!("form" in e) || !e.form || e.checked || e.type !== "radio") return !0;
	const t = e.form.elements.namedItem(e.name);
	if (!t || !("length" in t)) return !0;
	const i = Ni(e);
	return !i || i === e || !("form" in i) || i.form !== e.form || i.name !== e.name;
}
function hm(e, t) {
	const i = Array.from(e.querySelectorAll(kc));
	t && i.unshift(e);
	const u = i.filter(zr);
	return (
		u.forEach((l, o) => {
			if (um(l) && l.contentDocument) {
				const f = l.contentDocument.body;
				u.splice(o, 1, ...hm(f));
			}
		}),
		u
	);
}
function Mc(e, t, i) {
	const u = Array.from(e.querySelectorAll(kc)),
		l = u.filter(Gu);
	return (
		t && Gu(e) && l.unshift(e),
		l.forEach((o, f) => {
			if (um(o) && o.contentDocument) {
				const h = o.contentDocument.body,
					m = Mc(h, !1, i);
				l.splice(f, 1, ...m);
			}
		}),
		!l.length && i ? u : l
	);
}
function QM(e, t, i) {
	const [u] = Mc(e, t, i);
	return u || null;
}
function KM(e, t, i, u) {
	const l = Ni(e),
		o = hm(e, t),
		f = o.indexOf(l),
		h = o.slice(f + 1);
	return h.find(Gu) || (i ? o.find(Gu) : null) || (u ? h[0] : null) || null;
}
function ih(e, t) {
	return KM(document.body, !1, e, t);
}
function YM(e, t, i, u) {
	const l = Ni(e),
		o = hm(e, t).reverse(),
		f = o.indexOf(l),
		h = o.slice(f + 1);
	return h.find(Gu) || (i ? o.find(Gu) : null) || (u ? h[0] : null) || null;
}
function lp(e, t) {
	return YM(document.body, !1, e, t);
}
function FM(e) {
	for (; e && !zr(e); ) e = e.closest(kc);
	return e || null;
}
function Ka(e) {
	const t = Ni(e);
	if (!t) return !1;
	if (t === e) return !0;
	const i = t.getAttribute("aria-activedescendant");
	return i ? i === e.id : !1;
}
function fa(e) {
	const t = Ni(e);
	if (!t) return !1;
	if (an(e, t)) return !0;
	const i = t.getAttribute("aria-activedescendant");
	return !i || !("id" in e) ? !1 : i === e.id ? !0 : !!e.querySelector(`#${CSS.escape(i)}`);
}
function v_(e) {
	!fa(e) && zr(e) && e.focus();
}
function GM(e) {
	var t;
	const i = (t = e.getAttribute("tabindex")) != null ? t : "";
	(e.setAttribute("data-tabindex", i), e.setAttribute("tabindex", "-1"));
}
function XM(e, t) {
	const i = Mc(e, t);
	for (const u of i) GM(u);
}
function JM(e) {
	const t = e.querySelectorAll("[data-tabindex]"),
		i = (u) => {
			const l = u.getAttribute("data-tabindex");
			(u.removeAttribute("data-tabindex"), l ? u.setAttribute("tabindex", l) : u.removeAttribute("tabindex"));
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
	op = xc(),
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
	g_ = Symbol("safariFocusAncestor");
function nN(e) {
	return e ? !!e[g_] : !1;
}
function cp(e, t) {
	e && (e[g_] = t);
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
function fp(e) {
	return e.tagName.toLowerCase() === "input" && e.type ? e.type === "radio" || e.type === "checkbox" : !1;
}
function aN(e) {
	return e ? e === "button" || e === "summary" || e === "input" || e === "select" || e === "textarea" || e === "a" : !0;
}
function uN(e) {
	return e ? e === "button" || e === "input" || e === "select" || e === "textarea" : !0;
}
function sN(e, t, i, u, l) {
	return e ? (t ? (i && !u ? -1 : void 0) : i ? l : l || 0) : l;
}
function ah(e, t) {
	return ze((i) => {
		(e?.(i), !i.defaultPrevented && t && (i.stopPropagation(), i.preventDefault()));
	});
}
var dp = !1,
	mm = !0;
function lN(e) {
	const t = e.target;
	t && "hasAttribute" in t && (t.hasAttribute("data-focus-visible") || (mm = !1));
}
function oN(e) {
	e.metaKey || e.ctrlKey || e.altKey || (mm = !0);
}
var gl = et(function ({ focusable: t = !0, accessibleWhenDisabled: i, autoFocus: u, onFocusVisible: l, ...o }) {
		const f = (0, b.useRef)(null);
		((0, b.useEffect)(() => {
			t && (dp || (Tn("mousedown", lN, !0), Tn("keydown", oN, !0), (dp = !0)));
		}, [t]),
			op &&
				(0, b.useEffect)(() => {
					if (!t) return;
					const te = f.current;
					if (!te || !fp(te)) return;
					const ne = iN(te);
					if (!ne) return;
					const O = () => queueMicrotask(() => te.focus());
					for (const V of ne) V.addEventListener("mouseup", O);
					return () => {
						for (const V of ne) V.removeEventListener("mouseup", O);
					};
				}, [t]));
		const h = t && dl(o),
			m = !!h && !i,
			[v, g] = (0, b.useState)(!1);
		((0, b.useEffect)(() => {
			t && m && v && g(!1);
		}, [t, m, v]),
			(0, b.useEffect)(() => {
				if (!t || !v) return;
				const te = f.current;
				if (!te || typeof IntersectionObserver > "u") return;
				const ne = new IntersectionObserver(() => {
					zr(te) || g(!1);
				});
				return (ne.observe(te), () => ne.disconnect());
			}, [t, v]));
		const _ = ah(o.onKeyPressCapture, h),
			p = ah(o.onMouseDownCapture, h),
			w = ah(o.onClickCapture, h),
			x = o.onMouseDown,
			R = ze((te) => {
				if ((x?.(te), te.defaultPrevented || !t)) return;
				const ne = te.currentTarget;
				if (!op || s_(te) || (!da(ne) && !fp(ne))) return;
				let O = !1;
				const V = () => {
					O = !0;
				};
				ne.addEventListener("focusin", V, { capture: !0, once: !0 });
				const P = FM(ne.parentElement);
				(cp(P, !0),
					Hu(ne, "mouseup", () => {
						(ne.removeEventListener("focusin", V, !0), cp(P, !1), !O && v_(ne));
					}));
			}),
			z = (te, ne) => {
				if ((ne && (te.currentTarget = ne), !t)) return;
				const O = te.currentTarget;
				O && Ka(O) && (l?.(te), !te.defaultPrevented && ((O.dataset.focusVisible = "true"), g(!0)));
			},
			I = o.onKeyDownCapture,
			j = ze((te) => {
				if ((I?.(te), te.defaultPrevented || !t || v || te.metaKey || te.altKey || te.ctrlKey || !lr(te))) return;
				const ne = te.currentTarget;
				Hu(ne, "focusout", () => z(te, ne));
			}),
			N = o.onFocusCapture,
			C = ze((te) => {
				if ((N?.(te), te.defaultPrevented || !t)) return;
				if (!lr(te)) {
					g(!1);
					return;
				}
				const ne = te.currentTarget,
					O = () => z(te, ne);
				mm || rN(te.target) ? Hu(te.target, "focusout", O) : g(!1);
			}),
			q = o.onBlur,
			J = ze((te) => {
				(q?.(te), t && $a(te) && (te.currentTarget.removeAttribute("data-focus-visible"), g(!1)));
			}),
			G = (0, b.useContext)(m_),
			k = ze((te) => {
				t &&
					u &&
					te &&
					G &&
					queueMicrotask(() => {
						Ka(te) || (zr(te) && te.focus());
					});
			}),
			$ = f_(f),
			B = t && aN($),
			Q = t && uN($),
			oe = o.style,
			le = (0, b.useMemo)(() => (m ? { pointerEvents: "none", ...oe } : oe), [m, oe]);
		return (
			(o = {
				"data-focus-visible": (t && v) || void 0,
				"data-autofocus": u || void 0,
				"aria-disabled": h || void 0,
				...o,
				ref: Qt(f, k, o.ref),
				style: le,
				tabIndex: sN(t, m, B, Q, o.tabIndex),
				disabled: Q && m ? !0 : void 0,
				contentEditable: h ? void 0 : o.contentEditable,
				onKeyPressCapture: _,
				onClickCapture: w,
				onMouseDownCapture: p,
				onMouseDown: R,
				onKeyDownCapture: j,
				onFocusCapture: C,
				onBlur: J,
			}),
			Wa(o)
		);
	}),
	$D = Ke(function (t) {
		return Xe(eN, gl(t));
	});
function y_(e) {
	const t = [];
	for (const i of e) t.push(...i);
	return t;
}
function qh(e) {
	return e.slice().reverse();
}
var cN = "div";
function fN(e) {
	return e.some((t) => !!t.rowId);
}
function dN(e) {
	const t = e.target;
	return t && !Gr(t) ? !1 : e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
function hN(e) {
	return e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta";
}
function hp(e, t, i) {
	return ze((u) => {
		var l;
		if ((t?.(u), u.defaultPrevented || u.isPropagationStopped() || !lr(u) || hN(u) || dN(u))) return;
		const o = (l = ca(e, e.getState().activeId)) == null ? void 0 : l.element;
		if (!o) return;
		const { view: f, ...h } = u;
		(o !== i?.current && o.focus(),
			MM(o, u.type, h) || u.preventDefault(),
			u.currentTarget.contains(o) && u.stopPropagation());
	});
}
function mN(e) {
	return mM(y_(qh(vM(e))));
}
function vN(e) {
	const [t, i] = (0, b.useState)(!1),
		u = (0, b.useCallback)(() => i(!0), []),
		l = e.useState((o) => ca(e, o.activeId));
	return (
		(0, b.useEffect)(() => {
			const o = l?.element;
			t && o && (i(!1), o.focus({ preventScroll: !0 }));
		}, [l, t]),
		u
	);
}
var vm = et(function ({ store: t, composite: i = !0, focusOnMove: u = i, moveOnKeyPress: l = !0, ...o }) {
		const f = VM();
		((t = t || f), Pt(t, !1));
		const h = (0, b.useRef)(null),
			m = (0, b.useRef)(null),
			v = vN(t),
			g = t.useState("moves"),
			[, _] = OM(i ? t.setBaseElement : null);
		((0, b.useEffect)(() => {
			var $;
			if (!t || !g || !i || !u) return;
			const { activeId: B } = t.getState(),
				Q = ($ = ca(t, B)) == null ? void 0 : $.element;
			Q && WM(Q);
		}, [t, g, i, u]),
			at(() => {
				if (!t || !g || !i) return;
				const { baseElement: $, activeId: B } = t.getState();
				if (B !== null || !$) return;
				const Q = m.current;
				((m.current = null), Q && qu(Q, { relatedTarget: $ }), Ka($) || $.focus());
			}, [t, g, i]));
		const p = t.useState("activeId"),
			w = t.useState("virtualFocus");
		at(() => {
			var $;
			if (!t || !i || !w) return;
			const B = m.current;
			if (((m.current = null), !B)) return;
			const Q = (($ = ca(t, p)) == null ? void 0 : $.element) || Ni(B);
			Q !== B && qu(B, { relatedTarget: Q });
		}, [t, p, w, i]);
		const x = hp(t, o.onKeyDownCapture, m),
			R = hp(t, o.onKeyUpCapture, m),
			z = o.onFocusCapture,
			I = ze(($) => {
				if ((z?.($), $.defaultPrevented || !t)) return;
				const { virtualFocus: B } = t.getState();
				if (!B) return;
				const Q = $.relatedTarget,
					oe = pM($.currentTarget);
				lr($) && oe && ($.stopPropagation(), (m.current = Q));
			}),
			j = o.onFocus,
			N = ze(($) => {
				if ((j?.($), $.defaultPrevented || !i || !t)) return;
				const { relatedTarget: B } = $,
					{ virtualFocus: Q } = t.getState();
				Q ? lr($) && !Ws(t, B) && queueMicrotask(v) : lr($) && t.setActiveId(null);
			}),
			C = o.onBlurCapture,
			q = ze(($) => {
				var B;
				if ((C?.($), $.defaultPrevented || !t)) return;
				const { virtualFocus: Q, activeId: oe } = t.getState();
				if (!Q) return;
				const le = (B = ca(t, oe)) == null ? void 0 : B.element,
					te = $.relatedTarget,
					ne = Ws(t, te),
					O = m.current;
				((m.current = null),
					lr($) && ne
						? (te === le ? O && O !== te && qu(O, $) : le ? qu(le, $) : O && qu(O, $), $.stopPropagation())
						: !Ws(t, $.target) && le && qu(le, $));
			}),
			J = o.onKeyDown,
			G = Ct(l),
			k = ze(($) => {
				var B;
				if ((J?.($), $.nativeEvent.isComposing || $.defaultPrevented || !t || !lr($))) return;
				const { orientation: Q, renderedItems: oe, activeId: le } = t.getState(),
					te = ca(t, le);
				if ((B = te?.element) != null && B.isConnected) return;
				const ne = Q !== "horizontal",
					O = Q !== "vertical",
					V = fN(oe);
				if (
					($.key === "ArrowLeft" || $.key === "ArrowRight" || $.key === "Home" || $.key === "End") &&
					Gr($.currentTarget)
				)
					return;
				const ve = {
					ArrowUp:
						(V || ne) &&
						(() => {
							if (V) {
								const ye = mN(oe);
								return ye?.id;
							}
							return t?.last();
						}),
					ArrowRight: (V || O) && t.first,
					ArrowDown: (V || ne) && t.first,
					ArrowLeft: (V || O) && t.last,
					Home: t.first,
					End: t.last,
					PageUp: t.first,
					PageDown: t.last,
				}[$.key];
				if (ve) {
					const ye = ve();
					if (ye !== void 0) {
						if (!G($)) return;
						($.preventDefault(), t.move(ye));
					}
				}
			});
		return (
			(o = xn(o, ($) => (0, S.jsx)(vl, { value: t, children: $ }), [t])),
			(o = {
				"aria-activedescendant": t.useState(($) => {
					var B;
					if (t && i && $.virtualFocus) return (B = ca(t, $.activeId)) == null ? void 0 : B.id;
				}),
				...o,
				ref: Qt(h, _, o.ref),
				onKeyDownCapture: x,
				onKeyUpCapture: R,
				onFocusCapture: I,
				onFocus: N,
				onBlurCapture: q,
				onKeyDown: k,
			}),
			(o = gl({ focusable: t.useState(($) => i && ($.virtualFocus || $.activeId === null)), ...o })),
			o
		);
	}),
	BD = Ke(function (t) {
		return Xe(cN, vm(t));
	}),
	yl = Xr(),
	VD = yl.useContext,
	ZD = yl.useScopedContext,
	gm = yl.useProviderContext,
	gN = yl.ContextProvider,
	yN = yl.ScopedContextProvider,
	pl = Xr([gN], [yN]),
	HD = pl.useContext,
	PD = pl.useScopedContext,
	Nc = pl.useProviderContext,
	pN = pl.ContextProvider,
	ym = pl.ScopedContextProvider,
	bN = (0, b.createContext)(void 0),
	_N = (0, b.createContext)(void 0),
	bl = Xr([pN], [ym]),
	QD = bl.useContext,
	KD = bl.useScopedContext,
	Oc = bl.useProviderContext,
	p_ = bl.ContextProvider,
	zc = bl.ScopedContextProvider,
	SN = "div",
	pm = et(function ({ store: t, ...i }) {
		const u = Oc();
		return ((t = t || u), (i = { ...i, ref: Qt(t?.setAnchorElement, i.ref) }), i);
	}),
	YD = Ke(function (t) {
		return Xe(SN, pm(t));
	}),
	b_ = (0, b.createContext)(void 0),
	_l = Xr([p_, vl], [zc, Cc]),
	wN = _l.useContext,
	__ = _l.useScopedContext,
	Dc = _l.useProviderContext,
	FD = _l.ContextProvider,
	EN = _l.ScopedContextProvider,
	TN = (0, b.createContext)(void 0),
	xN = (0, b.createContext)(!1);
function eu(e, t) {
	const i = e.__unstableInternals;
	return (Pt(i, "Invalid store"), i[t]);
}
function Dr(e, ...t) {
	let i = e,
		u = i,
		l = Symbol(),
		o = el;
	const f = new Set(),
		h = new Set(),
		m = new Set(),
		v = new Set(),
		g = new Set(),
		_ = new WeakMap(),
		p = new WeakMap(),
		w = (k) => (m.add(k), () => m.delete(k)),
		x = () => {
			const k = f.size,
				$ = Symbol();
			f.add($);
			const B = () => {
				(f.delete($), !f.size && o());
			};
			if (k) return B;
			const Q = EM(i).map((te) =>
					Fn(
						...t.map((ne) => {
							var O;
							const V = (O = ne?.getState) == null ? void 0 : O.call(ne);
							if (V && Mi(V, te))
								return Mn(ne, [te], (P) => {
									J(te, P[te], !0);
								});
						}),
					),
				),
				oe = [];
			for (const te of m) oe.push(te());
			const le = t.map(bm);
			return ((o = Fn(...Q, ...oe, ...le)), B);
		},
		R = (k, $, B = v) => (
			B.add($),
			p.set($, k),
			() => {
				var Q;
				((Q = _.get($)) == null || Q(), _.delete($), p.delete($), B.delete($));
			}
		),
		z = (k, $) => R(k, $),
		I = (k, $) => (_.set($, $(i, i)), R(k, $)),
		j = (k, $) => (_.set($, $(i, u)), R(k, $, g)),
		N = (k) => Dr(wM(i, k), G),
		C = (k) => Dr(SM(i, k), G),
		q = () => i,
		J = (k, $, B = !1) => {
			var Q;
			if (!Mi(i, k)) return;
			const oe = r_($, i[k]);
			if (oe === i[k]) return;
			if (!B) for (const O of t) (Q = O?.setState) == null || Q.call(O, k, oe);
			const le = i;
			i = { ...i, [k]: oe };
			const te = Symbol();
			((l = te), h.add(k));
			const ne = (O, V, P) => {
				var ve;
				const ye = p.get(O),
					Be = (M) => (P ? P.has(M) : M === k);
				(!ye || ye.some(Be)) && ((ve = _.get(O)) == null || ve(), _.set(O, O(i, V)));
			};
			for (const O of v) ne(O, le);
			queueMicrotask(() => {
				if (l !== te) return;
				const O = i;
				for (const V of g) ne(V, u, h);
				((u = O), h.clear());
			});
		},
		G = {
			getState: q,
			setState: J,
			__unstableInternals: { setup: w, init: x, subscribe: z, sync: I, batch: j, pick: N, omit: C },
		};
	return G;
}
function $n(e, ...t) {
	if (e) return eu(e, "setup")(...t);
}
function bm(e, ...t) {
	if (e) return eu(e, "init")(...t);
}
function _m(e, ...t) {
	if (e) return eu(e, "subscribe")(...t);
}
function Mn(e, ...t) {
	if (e) return eu(e, "sync")(...t);
}
function fc(e, ...t) {
	if (e) return eu(e, "batch")(...t);
}
function Sm(e, ...t) {
	if (e) return eu(e, "omit")(...t);
}
function S_(e, ...t) {
	if (e) return eu(e, "pick")(...t);
}
function jc(...e) {
	var t;
	const i = {};
	for (const l of e) {
		const o = (t = l?.getState) == null ? void 0 : t.call(l);
		o && Object.assign(i, o);
	}
	const u = Dr(i, ...e);
	return Object.assign({}, ...e, u);
}
var AN = "input";
function mp(e, t, i) {
	if (!i) return !1;
	const u = e.find((l) => !l.disabled && l.value);
	return u?.value === t;
}
function vp(e, t) {
	return !t || e == null ? !1 : ((e = i_(e)), t.length > e.length && t.toLowerCase().indexOf(e.toLowerCase()) === 0);
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
var MN = et(function ({
		store: t,
		focusable: i = !0,
		autoSelect: u = !1,
		getAutoSelectId: l,
		setValueOnChange: o,
		showMinLength: f = 0,
		showOnChange: h,
		showOnMouseDown: m,
		showOnClick: v = m,
		showOnKeyDown: g,
		showOnKeyPress: _ = g,
		blurActiveItemOnClick: p,
		setValueOnClick: w = !0,
		moveOnKeyPress: x = !0,
		autoComplete: R = "list",
		...z
	}) {
		const I = Dc();
		((t = t || I), Pt(t, !1));
		const j = (0, b.useRef)(null),
			[N, C] = d_(),
			q = (0, b.useRef)(!1),
			J = (0, b.useRef)(!1),
			G = t.useState((fe) => fe.virtualFocus && u),
			k = R === "inline" || R === "both",
			[$, B] = (0, b.useState)(k);
		DM(() => {
			k && B(!0);
		}, [k]);
		const Q = t.useState("value"),
			oe = (0, b.useRef)();
		(0, b.useEffect)(
			() =>
				Mn(t, ["selectedValue", "activeId"], (fe, Re) => {
					oe.current = Re.selectedValue;
				}),
			[],
		);
		const le = t.useState((fe) => {
				var Re;
				if (
					k &&
					$ &&
					!(
						fe.activeValue &&
						Array.isArray(fe.selectedValue) &&
						(fe.selectedValue.includes(fe.activeValue) || ((Re = oe.current) != null && Re.includes(fe.activeValue)))
					)
				)
					return fe.activeValue;
			}),
			te = t.useState("renderedItems"),
			ne = t.useState("open"),
			O = t.useState("contentElement"),
			V = (0, b.useMemo)(() => {
				if (!k || !$) return Q;
				if (mp(te, le, G)) {
					if (vp(Q, le)) {
						const fe = le?.slice(Q.length) || "";
						return Q + fe;
					}
					return Q;
				}
				return le || Q;
			}, [k, $, te, le, G, Q]);
		((0, b.useEffect)(() => {
			const fe = j.current;
			if (!fe) return;
			const Re = () => B(!0);
			return (
				fe.addEventListener("combobox-item-move", Re),
				() => {
					fe.removeEventListener("combobox-item-move", Re);
				}
			);
		}, []),
			(0, b.useEffect)(() => {
				if (!k || !$ || !le || !mp(te, le, G) || !vp(Q, le)) return;
				let fe = el;
				return (
					queueMicrotask(() => {
						const Re = j.current;
						if (!Re) return;
						const { start: St, end: Ne } = zh(Re),
							ft = Q.length,
							Ot = le.length;
						(rh(Re, ft, Ot),
							(fe = () => {
								if (!Ka(Re)) return;
								const { start: rt, end: Et } = zh(Re);
								rt === ft && Et === Ot && rh(Re, St, Ne);
							}));
					}),
					() => fe()
				);
			}, [N, k, $, le, te, G, Q]));
		const P = (0, b.useRef)(null),
			ve = ze(l),
			ye = (0, b.useRef)(null);
		((0, b.useEffect)(() => {
			if (!ne || !O) return;
			const fe = sm(O);
			if (!fe) return;
			P.current = fe;
			const Re = () => {
					q.current = !1;
				},
				St = () => {
					if (!t || !q.current) return;
					const { activeId: ft } = t.getState();
					ft !== null && ft !== ye.current && (q.current = !1);
				},
				Ne = { passive: !0, capture: !0 };
			return (
				fe.addEventListener("wheel", Re, Ne),
				fe.addEventListener("touchmove", Re, Ne),
				fe.addEventListener("scroll", St, Ne),
				() => {
					(fe.removeEventListener("wheel", Re, !0),
						fe.removeEventListener("touchmove", Re, !0),
						fe.removeEventListener("scroll", St, !0));
				}
			);
		}, [ne, O, t]),
			at(() => {
				Q && (J.current || (q.current = !0));
			}, [Q]),
			at(() => {
				(G !== "always" && ne) || (q.current = ne);
			}, [G, ne]));
		const Be = t.useState("resetValueOnSelect");
		(es(() => {
			var fe, Re;
			const St = q.current;
			if (!t || !ne || (!St && !Be)) return;
			const { baseElement: Ne, contentElement: ft, activeId: Ot } = t.getState();
			if (!(Ne && !Ka(Ne))) {
				if (ft?.hasAttribute("data-placing")) {
					const rt = new MutationObserver(C);
					return (rt.observe(ft, { attributeFilter: ["data-placing"] }), () => rt.disconnect());
				}
				if (G && St) {
					const rt = ve(te),
						Et = rt !== void 0 ? rt : (fe = kN(te)) != null ? fe : t.first();
					((ye.current = Et), t.move(Et ?? null));
				} else {
					const rt = (Re = t.item(Ot || t.first())) == null ? void 0 : Re.element;
					rt && "scrollIntoView" in rt && rt.scrollIntoView({ block: "nearest", inline: "nearest" });
				}
			}
		}, [t, ne, N, Q, G, Be, ve, te]),
			(0, b.useEffect)(() => {
				if (!k) return;
				const fe = j.current;
				if (!fe) return;
				const Re = [fe, O].filter((Ne) => !!Ne),
					St = (Ne) => {
						Re.every((ft) => $a(Ne, ft)) && t?.setValue(V);
					};
				for (const Ne of Re) Ne.addEventListener("focusout", St);
				return () => {
					for (const Ne of Re) Ne.removeEventListener("focusout", St);
				};
			}, [k, O, t, V]));
		const M = (fe) => fe.currentTarget.value.length >= f,
			L = z.onChange,
			se = Ct(h ?? M),
			ce = Ct(o ?? !t.tag),
			he = ze((fe) => {
				if ((L?.(fe), fe.defaultPrevented || !t)) return;
				const Re = fe.currentTarget,
					{ value: St, selectionStart: Ne, selectionEnd: ft } = Re,
					Ot = fe.nativeEvent;
				if (((q.current = !0), RN(Ot) && (Ot.isComposing && ((q.current = !1), (J.current = !0)), k))) {
					const rt = Ot.inputType === "insertText" || Ot.inputType === "insertCompositionText",
						Et = Ne === St.length;
					B(rt && Et);
				}
				if (ce(fe)) {
					const rt = St === t.getState().value;
					(t.setValue(St),
						queueMicrotask(() => {
							rh(Re, Ne, ft);
						}),
						k && G && rt && C());
				}
				(se(fe) && t.show(), (!G || !q.current) && t.setActiveId(null));
			}),
			we = z.onCompositionEnd,
			pe = ze((fe) => {
				((q.current = !0), (J.current = !1), we?.(fe), !fe.defaultPrevented && G && C());
			}),
			qe = z.onMouseDown,
			Ie = Ct(p ?? (() => !!t?.getState().includesBaseElement)),
			st = Ct(w),
			Bt = Ct(v ?? M),
			bt = ze((fe) => {
				(qe?.(fe),
					!fe.defaultPrevented &&
						(fe.button ||
							fe.ctrlKey ||
							(t &&
								(Ie(fe) && t.setActiveId(null),
								st(fe) && t.setValue(V),
								Bt(fe) && Hu(fe.currentTarget, "mouseup", t.show)))));
			}),
			ct = z.onKeyDown,
			yt = Ct(_ ?? M),
			_e = ze((fe) => {
				if (
					(ct?.(fe),
					fe.repeat || (q.current = !1),
					fe.defaultPrevented || fe.ctrlKey || fe.altKey || fe.shiftKey || fe.metaKey || !t)
				)
					return;
				const { open: Re } = t.getState();
				Re || ((fe.key === "ArrowUp" || fe.key === "ArrowDown") && yt(fe) && (fe.preventDefault(), t.show()));
			}),
			Ae = z.onBlur,
			Je = ze((fe) => {
				((q.current = !1), Ae?.(fe), fe.defaultPrevented);
			}),
			De = Oi(z.id),
			wt = CN(R) ? R : void 0,
			_t = t.useState((fe) => fe.activeId === null);
		return (
			(z = {
				id: De,
				role: "combobox",
				"aria-autocomplete": wt,
				"aria-haspopup": Ec(O, "listbox"),
				"aria-expanded": ne,
				"aria-controls": O?.id,
				"data-active-item": _t || void 0,
				value: V,
				...z,
				ref: Qt(j, z.ref),
				onChange: he,
				onCompositionEnd: pe,
				onMouseDown: bt,
				onKeyDown: _e,
				onBlur: Je,
			}),
			(z = vm({ store: t, focusable: i, ...z, moveOnKeyPress: (fe) => (Tc(x, fe) ? !1 : (k && B(!0), !0)) })),
			(z = pm({ store: t, ...z })),
			{ autoComplete: "off", ...z }
		);
	}),
	NN = Ke(function (t) {
		return Xe(AN, MN(t));
	}),
	ON = "button";
function gp(e) {
	if (!e.isTrusted) return !1;
	const t = e.currentTarget;
	return e.key === "Enter"
		? da(t) || t.tagName === "SUMMARY" || t.tagName === "A"
		: e.key === " "
			? da(t) || t.tagName === "SUMMARY" || t.tagName === "INPUT" || t.tagName === "SELECT"
			: !1;
}
var zN = Symbol("command"),
	wm = et(function ({ clickOnEnter: t = !0, clickOnSpace: i = !0, ...u }) {
		const l = (0, b.useRef)(null),
			[o, f] = (0, b.useState)(!1);
		(0, b.useEffect)(() => {
			l.current && f(da(l.current));
		}, []);
		const [h, m] = (0, b.useState)(!1),
			v = (0, b.useRef)(!1),
			g = dl(u),
			[_, p] = h_(u, zN, !0),
			w = u.onKeyDown,
			x = ze((I) => {
				w?.(I);
				const j = I.currentTarget;
				if (I.defaultPrevented || _ || g || !lr(I) || Gr(j) || j.isContentEditable) return;
				const N = t && I.key === "Enter",
					C = i && I.key === " ",
					q = I.key === "Enter" && !t,
					J = I.key === " " && !i;
				if (q || J) {
					I.preventDefault();
					return;
				}
				if (N || C) {
					const G = gp(I);
					if (N) {
						if (!G) {
							I.preventDefault();
							const { view: k, ...$ } = I,
								B = () => np(j, $);
							RM() ? Hu(j, "keyup", B) : queueMicrotask(B);
						}
					} else C && ((v.current = !0), G || (I.preventDefault(), m(!0)));
				}
			}),
			R = u.onKeyUp,
			z = ze((I) => {
				if ((R?.(I), I.defaultPrevented || _ || g || I.metaKey)) return;
				const j = i && I.key === " ";
				if (v.current && j && ((v.current = !1), !gp(I))) {
					(I.preventDefault(), m(!1));
					const N = I.currentTarget,
						{ view: C, ...q } = I;
					queueMicrotask(() => np(N, q));
				}
			});
		return (
			(u = {
				"data-active": h || void 0,
				type: o ? "button" : void 0,
				...p,
				...u,
				ref: Qt(l, u.ref),
				onKeyDown: x,
				onKeyUp: z,
			}),
			(u = gl(u)),
			u
		);
	}),
	GD = Ke(function (t) {
		return Xe(ON, wm(t));
	}),
	w_ = "button",
	E_ = et(function (t) {
		const i = (0, b.useRef)(null),
			u = f_(i, w_),
			[l, o] = (0, b.useState)(() => !!u && da({ tagName: u, type: t.type }));
		return (
			(0, b.useEffect)(() => {
				i.current && o(da(i.current));
			}, []),
			(t = { role: !l && u !== "a" ? "button" : void 0, ...t, ref: Qt(i, t.ref) }),
			(t = wm(t)),
			t
		);
	}),
	XD = Ke(function (t) {
		return Xe(w_, E_(t));
	}),
	DN = "button",
	jN = Symbol("disclosure"),
	T_ = et(function ({ store: t, toggleOnClick: i = !0, ...u }) {
		const l = gm();
		((t = t || l), Pt(t, !1));
		const o = (0, b.useRef)(null),
			[f, h] = (0, b.useState)(!1),
			m = t.useState("disclosureElement"),
			v = t.useState("open");
		(0, b.useEffect)(() => {
			let z = m === o.current;
			(m?.isConnected || (t?.setDisclosureElement(o.current), (z = !0)), h(v && z));
		}, [m, t, v]);
		const g = u.onClick,
			_ = Ct(i),
			[p, w] = h_(u, jN, !0),
			x = ze((z) => {
				(g?.(z), !z.defaultPrevented && (p || (_(z) && (t?.setDisclosureElement(z.currentTarget), t?.toggle()))));
			}),
			R = t.useState("contentElement");
		return (
			(u = { "aria-expanded": f, "aria-controls": R?.id, ...w, ...u, ref: Qt(o, u.ref), onClick: x }),
			(u = E_(u)),
			u
		);
	}),
	JD = Ke(function (t) {
		return Xe(DN, T_(t));
	}),
	qN = "button",
	x_ = et(function ({ store: t, ...i }) {
		const u = Nc();
		return (
			(t = t || u),
			Pt(t, !1),
			(i = { "aria-haspopup": Ec(t.useState("contentElement"), "dialog"), ...i }),
			(i = T_({ store: t, ...i })),
			i
		);
	}),
	WD = Ke(function (t) {
		return Xe(qN, x_(t));
	}),
	IN = "div";
function A_(e) {
	const t = e.relatedTarget;
	return t?.nodeType === Node.ELEMENT_NODE ? t : null;
}
function LN(e) {
	const t = A_(e);
	return t ? an(e.currentTarget, t) : !1;
}
var Ih = Symbol("composite-hover");
function UN(e) {
	let t = A_(e);
	if (!t) return !1;
	do {
		if (Mi(t, Ih) && t[Ih]) return !0;
		t = t.parentElement;
	} while (t);
	return !1;
}
var Em = et(function ({ store: t, focusOnHover: i = !0, blurOnHoverEnd: u = !!i, ...l }) {
		const o = Rc();
		((t = t || o), Pt(t, !1));
		const f = fm(),
			h = l.onMouseMove,
			m = Ct(i),
			v = ze((x) => {
				if ((h?.(x), !x.defaultPrevented && f() && m(x))) {
					if (!fa(x.currentTarget)) {
						const R = t?.getState().baseElement;
						R && !Ka(R) && R.focus();
					}
					t?.setActiveId(x.currentTarget.id);
				}
			}),
			g = l.onMouseLeave,
			_ = Ct(u),
			p = ze((x) => {
				var R;
				(g?.(x),
					!x.defaultPrevented &&
						f() &&
						(LN(x) ||
							UN(x) ||
							(m(x) && _(x) && (t?.setActiveId(null), (R = t?.getState().baseElement) == null || R.focus()))));
			}),
			w = (0, b.useCallback)((x) => {
				x && (x[Ih] = !0);
			}, []);
		return ((l = { ...l, ref: Qt(w, l.ref), onMouseMove: v, onMouseLeave: p }), Wa(l));
	}),
	ej = Ac(
		Ke(function (t) {
			return Xe(IN, Em(t));
		}),
	),
	$N = "div",
	R_ = et(function ({ store: t, shouldRegisterItem: i = !0, getItem: u = a_, element: l, ...o }) {
		const f = UM();
		t = t || f;
		const h = Oi(o.id),
			m = (0, b.useRef)(l);
		return (
			(0, b.useEffect)(() => {
				const v = m.current;
				if (!h || !v || !i) return;
				const g = u({ id: h, element: v });
				return t?.renderItem(g);
			}, [h, i, u, t]),
			(o = { ...o, ref: Qt(m, o.ref) }),
			Wa(o)
		);
	}),
	tj = Ke(function (t) {
		return Xe($N, R_(t));
	}),
	BN = Er((e) => {
		var t = yc();
		function i(p, w) {
			return (p === w && (p !== 0 || 1 / p === 1 / w)) || (p !== p && w !== w);
		}
		var u = typeof Object.is == "function" ? Object.is : i,
			l = t.useState,
			o = t.useEffect,
			f = t.useLayoutEffect,
			h = t.useDebugValue;
		function m(p, w) {
			var x = w(),
				R = l({ inst: { value: x, getSnapshot: w } }),
				z = R[0].inst,
				I = R[1];
			return (
				f(
					function () {
						((z.value = x), (z.getSnapshot = w), v(z) && I({ inst: z }));
					},
					[p, x, w],
				),
				o(
					function () {
						return (
							v(z) && I({ inst: z }),
							p(function () {
								v(z) && I({ inst: z });
							})
						);
					},
					[p],
				),
				h(x),
				x
			);
		}
		function v(p) {
			var w = p.getSnapshot;
			p = p.value;
			try {
				var x = w();
				return !u(p, x);
			} catch {
				return !0;
			}
		}
		function g(p, w) {
			return w();
		}
		var _ = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? g : m;
		e.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : _;
	}),
	VN = Er((e, t) => {
		t.exports = BN();
	}),
	ZN = tb(VN(), 1),
	{ useSyncExternalStore: C_ } = ZN.default,
	k_ = () => () => {};
function nn(e, t = a_) {
	const i = b.useCallback((l) => (e ? _m(e, null, l) : k_()), [e]),
		u = () => {
			const l = typeof t == "string" ? t : null,
				o = typeof t == "function" ? t : null,
				f = e?.getState();
			if (o) return o(f);
			if (f && l && Mi(f, l)) return f[l];
		};
	return C_(i, u, u);
}
function M_(e, t) {
	const i = b.useRef({}),
		u = b.useCallback((o) => (e ? _m(e, null, o) : k_()), [e]),
		l = () => {
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
					if (!o || !Mi(o, v)) continue;
					const g = o[v];
					g !== h[m] && ((h[m] = g), (f = !0));
				}
			}
			return (f && (i.current = { ...h }), i.current);
		};
	return C_(u, l, l);
}
function Ht(e, t, i, u) {
	const l = Mi(t, i) ? t[i] : void 0,
		o = c_({ value: l, setValue: u ? t[u] : void 0 });
	(at(
		() =>
			Mn(e, [i], (f, h) => {
				const { value: m, setValue: v } = o.current;
				v && f[i] !== h[i] && f[i] !== m && v(f[i]);
			}),
		[e, i],
	),
		at(() => {
			if (l !== void 0)
				return (
					e.setState(i, l),
					fc(e, [i], () => {
						l !== void 0 && e.setState(i, l);
					})
				);
		}));
}
function qc(e, t) {
	const [i, u] = b.useState(() => e(t));
	at(() => bm(i), [i]);
	const l = b.useCallback((o) => nn(i, o), [i]);
	return [
		b.useMemo(() => ({ ...i, useState: l }), [i, l]),
		ze(() => {
			u((o) => e({ ...t, ...o.getState() }));
		}),
	];
}
var HN = "button";
function PN(e) {
	return Oh(e) ? !0 : e.tagName === "INPUT" && !da(e);
}
function QN(e, t = !1) {
	const i = e.clientHeight,
		{ top: u } = e.getBoundingClientRect(),
		l = Math.max(i * 0.875, i - 40) * 1.5,
		o = t ? i - l + u : l + u;
	return e.tagName === "HTML" ? o + e.scrollTop : o;
}
function KN(e, t = !1) {
	const { top: i } = e.getBoundingClientRect();
	return t ? i + e.clientHeight : i;
}
function yp(e, t, i, u = !1) {
	var l;
	if (!t || !i) return;
	const { renderedItems: o } = t.getState(),
		f = sm(e);
	if (!f) return;
	const h = QN(f, u);
	let m, v;
	for (let g = 0; g < o.length; g += 1) {
		const _ = m;
		if (((m = i(g)), !m)) break;
		if (m === _) continue;
		const p = (l = ca(t, m)) == null ? void 0 : l.element;
		if (!p) continue;
		const w = KN(p, u) - h,
			x = Math.abs(w);
		if ((u && w <= 0) || (!u && w >= 0)) {
			v !== void 0 && v < x && (m = _);
			break;
		}
		v = x;
	}
	return m;
}
function YN(e, t) {
	return lr(e) ? !1 : Ws(t, e.target);
}
var Tm = et(function ({
		store: t,
		rowId: i,
		preventScrollOnKeyDown: u = !1,
		moveOnKeyPress: l = !0,
		tabbable: o = !1,
		getItem: f,
		"aria-setsize": h,
		"aria-posinset": m,
		...v
	}) {
		const g = Rc();
		t = t || g;
		const _ = Oi(v.id),
			p = (0, b.useRef)(null),
			w = (0, b.useContext)(HM),
			x = dl(v) && !v.accessibleWhenDisabled,
			{
				rowId: R,
				baseElement: z,
				isActiveItem: I,
				ariaSetSize: j,
				ariaPosInSet: N,
				isTabbable: C,
			} = M_(t, {
				rowId(O) {
					if (i) return i;
					if (O && w?.baseElement && w.baseElement === O.baseElement) return w.id;
				},
				baseElement(O) {
					return O?.baseElement || void 0;
				},
				isActiveItem(O) {
					return !!O && O.activeId === _;
				},
				ariaSetSize(O) {
					if (h != null) return h;
					if (O && w?.ariaSetSize && w.baseElement === O.baseElement) return w.ariaSetSize;
				},
				ariaPosInSet(O) {
					if (m != null) return m;
					if (!O || !w?.ariaPosInSet || w.baseElement !== O.baseElement) return;
					const V = O.renderedItems.filter((P) => P.rowId === R);
					return w.ariaPosInSet + V.findIndex((P) => P.id === _);
				},
				isTabbable(O) {
					if (!O?.renderedItems.length) return !0;
					if (O.virtualFocus) return !1;
					if (o) return !0;
					if (O.activeId === null) return !1;
					const V = t?.item(O.activeId);
					return V?.disabled || !V?.element ? !0 : O.activeId === _;
				},
			}),
			q = (0, b.useCallback)(
				(O) => {
					var V;
					const P = {
						...O,
						id: _ || O.id,
						rowId: R,
						disabled: !!x,
						children: (V = O.element) == null ? void 0 : V.textContent,
					};
					return f ? f(P) : P;
				},
				[_, R, x, f],
			),
			J = v.onFocus,
			G = (0, b.useRef)(!1),
			k = ze((O) => {
				if ((J?.(O), O.defaultPrevented || s_(O) || !_ || !t || YN(O, t))) return;
				const { virtualFocus: V, baseElement: P } = t.getState();
				(t.setActiveId(_),
					Oh(O.currentTarget) && gM(O.currentTarget),
					V &&
						lr(O) &&
						(PN(O.currentTarget) ||
							(P?.isConnected &&
								(xc() &&
									O.currentTarget.hasAttribute("data-autofocus") &&
									O.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" }),
								(G.current = !0),
								O.relatedTarget === P || Ws(t, O.relatedTarget) ? yM(P) : P.focus()))));
			}),
			$ = v.onBlurCapture,
			B = ze((O) => {
				if (($?.(O), O.defaultPrevented)) return;
				const V = t?.getState();
				V?.virtualFocus && G.current && ((G.current = !1), O.preventDefault(), O.stopPropagation());
			}),
			Q = v.onKeyDown,
			oe = Ct(u),
			le = Ct(l),
			te = ze((O) => {
				if ((Q?.(O), O.defaultPrevented || !lr(O) || !t)) return;
				const { currentTarget: V } = O,
					P = t.getState(),
					ve = t.item(_),
					ye = !!ve?.rowId,
					Be = P.orientation !== "horizontal",
					M = P.orientation !== "vertical",
					L = () => !!(ye || M || !P.baseElement || !Gr(P.baseElement)),
					se = {
						ArrowUp: (ye || Be) && t.up,
						ArrowRight: (ye || M) && t.next,
						ArrowDown: (ye || Be) && t.down,
						ArrowLeft: (ye || M) && t.previous,
						Home: () => {
							if (L()) return !ye || O.ctrlKey ? t?.first() : t?.previous(-1);
						},
						End: () => {
							if (L()) return !ye || O.ctrlKey ? t?.last() : t?.next(-1);
						},
						PageUp: () => yp(V, t, t?.up, !0),
						PageDown: () => yp(V, t, t?.down),
					}[O.key];
				if (se) {
					if (Oh(V)) {
						const he = zh(V),
							we = M && O.key === "ArrowLeft",
							pe = M && O.key === "ArrowRight",
							qe = Be && O.key === "ArrowUp",
							Ie = Be && O.key === "ArrowDown";
						if (pe || Ie) {
							const { length: st } = cM(V);
							if (he.end !== st) return;
						} else if ((we || qe) && he.start !== 0) return;
					}
					const ce = se();
					if (oe(O) || ce !== void 0) {
						if (!le(O)) return;
						(O.preventDefault(), t.move(ce));
					}
				}
			}),
			ne = (0, b.useMemo)(() => ({ id: _, baseElement: z }), [_, z]);
		return (
			(v = xn(v, (O) => (0, S.jsx)(ZM.Provider, { value: ne, children: O }), [ne])),
			(v = {
				id: _,
				"data-active-item": I || void 0,
				...v,
				ref: Qt(p, v.ref),
				tabIndex: C ? v.tabIndex : -1,
				onFocus: k,
				onBlurCapture: B,
				onKeyDown: te,
			}),
			(v = wm(v)),
			(v = R_({ store: t, ...v, getItem: q, shouldRegisterItem: _ ? v.shouldRegisterItem : !1 })),
			Wa({ ...v, "aria-setsize": j, "aria-posinset": N })
		);
	}),
	nj = Ac(
		Ke(function (t) {
			return Xe(HN, Tm(t));
		}),
	),
	FN = "div";
function GN(e, t) {
	if (t != null) return e == null ? !1 : Array.isArray(e) ? e.includes(t) : e === t;
}
function XN(e) {
	var t;
	return (t = { menu: "menuitem", listbox: "option", tree: "treeitem" }[e]) != null ? t : "option";
}
var JN = et(function ({
		store: t,
		value: i,
		hideOnClick: u,
		setValueOnClick: l,
		selectValueOnClick: o = !0,
		resetValueOnSelect: f,
		focusOnHover: h = !1,
		moveOnKeyPress: m = !0,
		getItem: v,
		...g
	}) {
		var _;
		const p = __();
		((t = t || p), Pt(t, !1));
		const {
				resetValueOnSelectState: w,
				multiSelectable: x,
				selected: R,
			} = M_(t, {
				resetValueOnSelectState: "resetValueOnSelect",
				multiSelectable(B) {
					return Array.isArray(B.selectedValue);
				},
				selected(B) {
					return GN(B.selectedValue, i);
				},
			}),
			z = (0, b.useCallback)(
				(B) => {
					const Q = { ...B, value: i };
					return v ? v(Q) : Q;
				},
				[i, v],
			);
		((l = l ?? !x), (u = u ?? (i != null && !x)));
		const I = g.onClick,
			j = Ct(l),
			N = Ct(o),
			C = Ct((_ = f ?? w) != null ? _ : x),
			q = Ct(u),
			J = ze((B) => {
				(I?.(B),
					!B.defaultPrevented &&
						(o_(B) ||
							l_(B) ||
							(i != null &&
								(N(B) &&
									(C(B) && t?.resetValue(),
									t?.setSelectedValue((Q) =>
										Array.isArray(Q) ? (Q.includes(i) ? Q.filter((oe) => oe !== i) : [...Q, i]) : i,
									)),
								j(B) && t?.setValue(i)),
							q(B) && t?.hide())));
			}),
			G = g.onKeyDown,
			k = ze((B) => {
				if ((G?.(B), B.defaultPrevented)) return;
				const Q = t?.getState().baseElement;
				Q &&
					(Ka(Q) ||
						((B.key.length === 1 || B.key === "Backspace" || B.key === "Delete") &&
							(queueMicrotask(() => Q.focus()), Gr(Q) && t?.setValue(Q.value))));
			});
		(x && R != null && (g = { "aria-selected": R, ...g }),
			(g = xn(
				g,
				(B) =>
					(0, S.jsx)(TN.Provider, { value: i, children: (0, S.jsx)(xN.Provider, { value: R ?? !1, children: B }) }),
				[i, R],
			)),
			(g = { role: XN((0, b.useContext)(b_)), children: i, ...g, onClick: J, onKeyDown: k }));
		const $ = Ct(m);
		return (
			(g = Tm({
				store: t,
				...g,
				getItem: z,
				moveOnKeyPress: (B) => {
					if (!$(B)) return !1;
					const Q = new Event("combobox-item-move");
					return (t?.getState().baseElement?.dispatchEvent(Q), !0);
				},
			})),
			(g = Em({ store: t, focusOnHover: h, ...g })),
			g
		);
	}),
	WN = Ac(
		Ke(function (t) {
			return Xe(FN, JN(t));
		}),
	),
	dc = vb(),
	eO = "div";
function pp(e, t) {
	const i = setTimeout(t, e);
	return () => clearTimeout(i);
}
function tO(e) {
	let t = requestAnimationFrame(() => {
		t = requestAnimationFrame(e);
	});
	return () => cancelAnimationFrame(t);
}
function bp(...e) {
	return e
		.join(", ")
		.split(", ")
		.reduce((t, i) => {
			const u = i.endsWith("ms") ? 1 : 1e3,
				l = Number.parseFloat(i || "0s") * u;
			return l > t ? l : t;
		}, 0);
}
function Ic(e, t, i) {
	return !i && t !== !1 && (!e || !!t);
}
var xm = et(function ({ store: t, alwaysVisible: i, ...u }) {
		const l = gm();
		((t = t || l), Pt(t, !1));
		const o = (0, b.useRef)(null),
			f = Oi(u.id),
			[h, m] = (0, b.useState)(null),
			v = t.useState("open"),
			g = t.useState("mounted"),
			_ = t.useState("animated"),
			p = t.useState("contentElement"),
			w = nn(t.disclosure, "contentElement");
		(at(() => {
			o.current && t?.setContentElement(o.current);
		}, [t]),
			at(() => {
				let I;
				return (
					t?.setState("animated", (j) => ((I = j), !0)),
					() => {
						I !== void 0 && t?.setState("animated", I);
					}
				);
			}, [t]),
			at(() => {
				if (_) {
					if (!p?.isConnected) {
						m(null);
						return;
					}
					return tO(() => {
						m(v ? "enter" : g ? "leave" : null);
					});
				}
			}, [_, p, v, g]),
			at(() => {
				if (!t || !_ || !h || !p) return;
				const I = () => t?.setState("animating", !1),
					j = () => (0, dc.flushSync)(I);
				if ((h === "leave" && v) || (h === "enter" && !v)) return;
				if (typeof _ == "number") return pp(_, j);
				const {
						transitionDuration: N,
						animationDuration: C,
						transitionDelay: q,
						animationDelay: J,
					} = getComputedStyle(p),
					{
						transitionDuration: G = "0",
						animationDuration: k = "0",
						transitionDelay: $ = "0",
						animationDelay: B = "0",
					} = w ? getComputedStyle(w) : {},
					Q = bp(q, J, $, B) + bp(N, C, G, k);
				if (!Q) {
					(h === "enter" && t.setState("animated", !1), I());
					return;
				}
				return pp(Math.max(Q - 1e3 / 60, 0), j);
			}, [t, _, p, w, v, h]),
			(u = xn(u, (I) => (0, S.jsx)(ym, { value: t, children: I }), [t])));
		const x = Ic(g, u.hidden, i),
			R = u.style,
			z = (0, b.useMemo)(() => (x ? { ...R, display: "none" } : R), [x, R]);
		return (
			(u = {
				id: f,
				"data-open": v || void 0,
				"data-enter": h === "enter" || void 0,
				"data-leave": h === "leave" || void 0,
				hidden: x,
				...u,
				ref: Qt(f ? t.setContentElement : null, o, u.ref),
				style: z,
			}),
			Wa(u)
		);
	}),
	nO = Ke(function (t) {
		return Xe(eO, xm(t));
	}),
	rj = Ke(function ({ unmountOnHide: t, ...i }) {
		const u = gm();
		return nn(i.store || u, (l) => !t || l?.mounted) === !1 ? null : (0, S.jsx)(nO, { ...i });
	}),
	rO = "div",
	N_ = et(function ({ store: t, alwaysVisible: i, ...u }) {
		const l = __(!0),
			o = wN();
		t = t || o;
		const f = !!t && t === l;
		Pt(t, !1);
		const h = (0, b.useRef)(null),
			m = Oi(u.id),
			v = t.useState("mounted"),
			g = Ic(v, u.hidden, i),
			_ = g ? { ...u.style, display: "none" } : u.style,
			p = t.useState((N) => Array.isArray(N.selectedValue)),
			w = zM(h, "role", u.role),
			x = ((w === "listbox" || w === "tree" || w === "grid") && p) || void 0,
			[R, z] = (0, b.useState)(!1),
			I = t.useState("contentElement");
		(at(() => {
			if (!v) return;
			const N = h.current;
			if (!N || I !== N) return;
			const C = () => {
					z(!!N.querySelector("[role='listbox']"));
				},
				q = new MutationObserver(C);
			return (q.observe(N, { subtree: !0, childList: !0, attributeFilter: ["role"] }), C(), () => q.disconnect());
		}, [v, I]),
			R || (u = { role: "listbox", "aria-multiselectable": x, ...u }),
			(u = xn(u, (N) => (0, S.jsx)(EN, { value: t, children: (0, S.jsx)(b_.Provider, { value: w, children: N }) }), [
				t,
				w,
			])));
		const j = m && (!l || !f) ? t.setContentElement : null;
		return ((u = { id: m, hidden: g, ...u, ref: Qt(j, h, u.ref), style: _ }), Wa(u));
	}),
	ij = Ke(function (t) {
		return Xe(rO, N_(t));
	}),
	_p = (0, b.createContext)(null),
	iO = "span",
	O_ = et(function (t) {
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
	aj = Ke(function (t) {
		return Xe(iO, O_(t));
	}),
	aO = "span",
	uO = et(function (t) {
		return (
			(t = {
				"data-focus-trap": "",
				tabIndex: 0,
				"aria-hidden": !0,
				...t,
				style: { position: "fixed", top: 0, left: 0, ...t.style },
			}),
			(t = O_(t)),
			t
		);
	}),
	Po = Ke(function (t) {
		return Xe(aO, uO(t));
	}),
	sO = "div";
function lO(e) {
	return At(e).body;
}
function oO(e, t) {
	return t ? (typeof t == "function" ? t(e) : t) : At(e).createElement("div");
}
function cO(e = "id") {
	return `${e ? `${e}-` : ""}${Math.random().toString(36).slice(2, 8)}`;
}
function la(e) {
	queueMicrotask(() => {
		e?.focus();
	});
}
var z_ = et(function ({
		preserveTabOrder: t,
		preserveTabOrderAnchor: i,
		portalElement: u,
		portalRef: l,
		portal: o = !0,
		...f
	}) {
		const h = (0, b.useRef)(null),
			m = Qt(h, f.ref),
			v = (0, b.useContext)(_p),
			[g, _] = (0, b.useState)(null),
			[p, w] = (0, b.useState)(null),
			x = (0, b.useRef)(null),
			R = (0, b.useRef)(null),
			z = (0, b.useRef)(null),
			I = (0, b.useRef)(null);
		return (
			at(() => {
				const j = h.current;
				if (!j || !o) {
					_(null);
					return;
				}
				const N = oO(j, u);
				if (!N) {
					_(null);
					return;
				}
				const C = N.isConnected;
				if ((C || (v || lO(j)).appendChild(N), N.id || (N.id = j.id ? `portal/${j.id}` : cO()), _(N), jh(l, N), !C))
					return () => {
						(N.remove(), jh(l, null));
					};
			}, [o, u, v, l]),
			at(() => {
				if (!o || !t || !i) return;
				const j = At(i).createElement("span");
				return (
					(j.style.position = "fixed"),
					i.insertAdjacentElement("afterend", j),
					w(j),
					() => {
						(j.remove(), w(null));
					}
				);
			}, [o, t, i]),
			(0, b.useEffect)(() => {
				if (!g || !t) return;
				let j = 0;
				const N = (C) => {
					if (!$a(C)) return;
					const q = C.type === "focusin";
					if ((cancelAnimationFrame(j), q)) return JM(g);
					j = requestAnimationFrame(() => {
						XM(g, !0);
					});
				};
				return (
					g.addEventListener("focusin", N, !0),
					g.addEventListener("focusout", N, !0),
					() => {
						(cancelAnimationFrame(j),
							g.removeEventListener("focusin", N, !0),
							g.removeEventListener("focusout", N, !0));
					}
				);
			}, [g, t]),
			(f = xn(
				f,
				(j) => {
					if (((j = (0, S.jsx)(_p.Provider, { value: g || v, children: j })), !o)) return j;
					if (!g) return (0, S.jsx)("span", { ref: m, id: f.id, style: { position: "fixed" }, hidden: !0 });
					((j = (0, S.jsxs)(S.Fragment, {
						children: [
							t &&
								g &&
								(0, S.jsx)(Po, {
									ref: R,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-before",
									onFocus: (C) => {
										$a(C, g) ? la(ih()) : la(x.current);
									},
								}),
							j,
							t &&
								g &&
								(0, S.jsx)(Po, {
									ref: z,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-after",
									onFocus: (C) => {
										$a(C, g) ? la(lp()) : la(I.current);
									},
								}),
						],
					})),
						g && (j = (0, dc.createPortal)(j, g)));
					let N = (0, S.jsxs)(S.Fragment, {
						children: [
							t &&
								g &&
								(0, S.jsx)(Po, {
									ref: x,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-before",
									onFocus: (C) => {
										C.relatedTarget !== I.current && $a(C, g) ? la(R.current) : la(lp());
									},
								}),
							t && (0, S.jsx)("span", { "aria-owns": g?.id, style: { position: "fixed" } }),
							t &&
								g &&
								(0, S.jsx)(Po, {
									ref: I,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-after",
									onFocus: (C) => {
										if ($a(C, g)) la(z.current);
										else {
											const q = ih();
											if (q === R.current) {
												requestAnimationFrame(() => {
													var J;
													return (J = ih()) == null ? void 0 : J.focus();
												});
												return;
											}
											la(q);
										}
									},
								}),
						],
					});
					return (p && t && (N = (0, dc.createPortal)(N, p)), (0, S.jsxs)(S.Fragment, { children: [N, j] }));
				},
				[g, v, o, f.id, t, p],
			)),
			(f = { ...f, ref: m }),
			f
		);
	}),
	uj = Ke(function (t) {
		return Xe(sO, z_(t));
	}),
	Sp = (0, b.createContext)(0);
function fO({ level: e, children: t }) {
	const i = (0, b.useContext)(Sp),
		u = Math.max(Math.min(e || i + 1, 6), 1);
	return (0, S.jsx)(Sp.Provider, { value: u, children: t });
}
var dO = "div",
	D_ = et(function ({ autoFocusOnShow: t = !0, ...i }) {
		return ((i = xn(i, (u) => (0, S.jsx)(m_.Provider, { value: t, children: u }), [t])), i);
	}),
	sj = Ke(function (t) {
		return Xe(dO, D_(t));
	});
function hO(e, t) {
	const i = At(e).createElement("button");
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
	const t = (0, b.useRef)();
	return (
		(0, b.useEffect)(() => {
			if (!e) {
				t.current = null;
				return;
			}
			return Tn(
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
var uh = new WeakMap();
function Sl(e, t, i) {
	uh.has(e) || uh.set(e, new Map());
	const u = uh.get(e),
		l = u.get(t);
	if (!l)
		return (
			u.set(t, i()),
			() => {
				var h;
				((h = u.get(t)) == null || h(), u.delete(t));
			}
		);
	const o = i(),
		f = () => {
			(o(), l(), u.delete(t));
		};
	return (
		u.set(t, f),
		() => {
			u.get(t) === f && (o(), u.set(t, l));
		}
	);
}
function Am(e, t, i) {
	return Sl(e, t, () => {
		const l = e.getAttribute(t);
		return (
			e.setAttribute(t, i),
			() => {
				l == null ? e.removeAttribute(t) : e.setAttribute(t, l);
			}
		);
	});
}
function Ya(e, t, i) {
	return Sl(e, t, () => {
		const l = t in e,
			o = e[t];
		return (
			(e[t] = i),
			() => {
				l ? (e[t] = o) : delete e[t];
			}
		);
	});
}
function Lh(e, t) {
	return e
		? Sl(e, "style", () => {
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
		? Sl(e, t, () => {
				const l = e.style.getPropertyValue(t);
				return (
					e.style.setProperty(t, i),
					() => {
						l ? e.style.setProperty(t, l) : e.style.removeProperty(t);
					}
				);
			})
		: () => {};
}
var gO = ["SCRIPT", "STYLE"];
function Uh(e) {
	return `__ariakit-dialog-snapshot-${e}`;
}
function yO(e, t) {
	const i = At(t),
		u = Uh(e);
	if (!i.body[u]) return !0;
	do {
		if (t === i.body) return !1;
		if (t[u]) return !0;
		if (!t.parentElement) return !1;
		t = t.parentElement;
	} while (!0);
}
function pO(e, t, i) {
	return gO.includes(t.tagName) || !yO(e, t) ? !1 : !i.some((u) => u && an(t, u));
}
function Rm(e, t, i, u) {
	for (let l of t) {
		if (!l?.isConnected) continue;
		const o = t.some((m) => (!m || m === l ? !1 : m.contains(l))),
			f = At(l),
			h = l;
		for (; l.parentElement && l !== f.body; ) {
			if ((u?.(l.parentElement, h), !o)) for (const m of l.parentElement.children) pO(e, m, t) && i(m, h);
			l = l.parentElement;
		}
	}
}
function bO(e, t) {
	const { body: i } = At(t[0]),
		u = [];
	return (
		Rm(e, t, (o) => {
			u.push(Ya(o, Uh(e), !0));
		}),
		Fn(Ya(i, Uh(e), !0), () => {
			for (const o of u) o();
		})
	);
}
function j_(e, ...t) {
	if (!e) return !1;
	const i = e.getAttribute("data-backdrop");
	return i == null ? !1 : i === "" || i === "true" || !t.length ? !0 : t.some((u) => i === u);
}
function Xu(e = "", t = !1) {
	return `__ariakit-dialog-${t ? "ancestor" : "outside"}${e ? `-${e}` : ""}`;
}
function _O(e, t = "") {
	return Fn(Ya(e, Xu(), !0), Ya(e, Xu(t), !0));
}
function q_(e, t = "") {
	return Fn(Ya(e, Xu("", !0), !0), Ya(e, Xu(t, !0), !0));
}
function Cm(e, t) {
	const i = Xu(t, !0);
	if (e[i]) return !0;
	const u = Xu(t);
	do {
		if (e[u]) return !0;
		if (!e.parentElement) return !1;
		e = e.parentElement;
	} while (!0);
}
function wp(e, t) {
	const i = [],
		u = t.map((o) => o?.id);
	return (
		Rm(
			e,
			t,
			(o) => {
				j_(o, ...u) || i.unshift(_O(o, e));
			},
			(o, f) => {
				(f.hasAttribute("data-dialog") && f.id !== e) || i.unshift(q_(o, e));
			},
		),
		() => {
			for (const o of i) o();
		}
	);
}
function SO(e) {
	return e.tagName === "HTML" ? !0 : an(At(e).body, e);
}
function wO(e, t) {
	if (!e) return !1;
	if (an(e, t)) return !0;
	const i = t.getAttribute("aria-activedescendant");
	if (i) {
		const u = At(e).getElementById(i);
		if (u) return an(e, u);
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
function sh({ store: e, type: t, listener: i, capture: u, domReady: l }) {
	const o = ze(i),
		f = nn(e, "open"),
		h = (0, b.useRef)(!1);
	(at(() => {
		if (!f || !l) return;
		const { contentElement: m } = e.getState();
		if (!m) return;
		const v = () => {
			h.current = !0;
		};
		return (m.addEventListener("focusin", v, !0), () => m.removeEventListener("focusin", v, !0));
	}, [e, f, l]),
		(0, b.useEffect)(
			() =>
				f
					? Tn(
							t,
							(v) => {
								const { contentElement: g, disclosureElement: _ } = e.getState(),
									p = v.target;
								g &&
									p &&
									SO(p) &&
									(an(g, p) ||
										wO(_, p) ||
										p.hasAttribute("data-focus-trap") ||
										EO(v, g) ||
										(h.current && !Cm(p, g.id)) ||
										nN(p) ||
										o(v));
							},
							u,
						)
					: void 0,
			[f, u],
		));
}
function lh(e, t) {
	return typeof e == "function" ? e(t) : !!e;
}
function TO(e, t, i) {
	const u = mO(nn(e, "open")),
		l = { store: e, domReady: i, capture: !0 };
	(sh({
		...l,
		type: "click",
		listener: (o) => {
			const { contentElement: f } = e.getState(),
				h = u.current;
			h && e_(h) && Cm(h, f?.id) && lh(t, o) && e.hide();
		},
	}),
		sh({
			...l,
			type: "focusin",
			listener: (o) => {
				const { contentElement: f } = e.getState();
				f && o.target !== At(f) && lh(t, o) && e.hide();
			},
		}),
		sh({
			...l,
			type: "contextmenu",
			listener: (o) => {
				lh(t, o) && e.hide();
			},
		}));
}
var Ep = (0, b.createContext)({});
function xO(e) {
	const t = (0, b.useContext)(Ep),
		[i, u] = (0, b.useState)([]),
		l = (0, b.useCallback)(
			(f) => {
				var h;
				return (
					u((m) => [...m, f]),
					Fn((h = t.add) == null ? void 0 : h.call(t, f), () => {
						u((m) => m.filter((v) => v !== f));
					})
				);
			},
			[t],
		);
	at(
		() =>
			Mn(e, ["open", "contentElement"], (f) => {
				var h;
				if (f.open && f.contentElement) return (h = t.add) == null ? void 0 : h.call(t, e);
			}),
		[e, t],
	);
	const o = (0, b.useMemo)(() => ({ store: e, add: l }), [e, l]);
	return {
		wrapElement: (0, b.useCallback)((f) => (0, S.jsx)(Ep.Provider, { value: o, children: f }), [o]),
		nestedDialogs: i,
	};
}
function AO({ attribute: e, contentId: t, contentElement: i, enabled: u }) {
	const [l, o] = d_(),
		f = (0, b.useCallback)(() => {
			if (!u || !i) return !1;
			const { body: h } = At(i),
				m = h.getAttribute(e);
			return !m || m === t;
		}, [l, u, i, e, t]);
	return (
		(0, b.useEffect)(() => {
			if (!u || !t || !i) return;
			const { body: h } = At(i);
			if (f()) return (h.setAttribute(e, t), () => h.removeAttribute(e));
			const m = new MutationObserver(() => (0, dc.flushSync)(o));
			return (m.observe(h, { attributeFilter: [e] }), () => m.disconnect());
		}, [l, u, t, i, f, e]),
		f
	);
}
function RO(e) {
	const t = e.getBoundingClientRect().left;
	return Math.round(t) + e.scrollLeft ? "paddingLeft" : "paddingRight";
}
function CO(e, t, i) {
	const u = AO({ attribute: "data-dialog-prevent-body-scroll", contentElement: e, contentId: t, enabled: i });
	(0, b.useEffect)(() => {
		if (!u() || !e) return;
		const l = At(e),
			o = Wb(e),
			{ documentElement: f, body: h } = l,
			m = f.style.getPropertyValue("--scrollbar-width"),
			v = m ? Number.parseInt(m, 10) : o.innerWidth - f.clientWidth,
			g = () => vO(f, "--scrollbar-width", `${v}px`),
			_ = RO(f),
			p = () => Lh(h, { overflow: "hidden", [_]: `${v}px` }),
			w = () => {
				var R, z;
				const { scrollX: I, scrollY: j, visualViewport: N } = o,
					C = (R = N?.offsetLeft) != null ? R : 0,
					q = (z = N?.offsetTop) != null ? z : 0,
					J = Lh(h, {
						position: "fixed",
						overflow: "hidden",
						top: `${-(j - Math.floor(q))}px`,
						left: `${-(I - Math.floor(C))}px`,
						right: "0",
						[_]: `${v}px`,
					});
				return () => {
					(J(), o.scrollTo({ left: I, top: j, behavior: "instant" }));
				};
			},
			x = lm() && !CM();
		return Fn(g(), x ? w() : p());
	}, [u, e]);
}
function kO(e, ...t) {
	if (!e) return !1;
	const i = e.getAttribute("data-focus-trap");
	return i == null ? !1 : t.length ? (i === "" ? !1 : t.some((u) => i === u)) : !0;
}
function I_() {
	return "inert" in HTMLElement.prototype;
}
function MO(e) {
	return Am(e, "aria-hidden", "true");
}
function L_(e, t) {
	return "style" in e
		? I_()
			? Ya(e, "inert", !0)
			: Fn(
					...Mc(e, !0).map((i) => {
						if (t?.some((l) => l && an(l, i))) return el;
						const u = Sl(
							i,
							"focus",
							() => (
								(i.focus = el),
								() => {
									delete i.focus;
								}
							),
						);
						return Fn(Am(i, "tabindex", "-1"), u);
					}),
					MO(e),
					Lh(e, { pointerEvents: "none", userSelect: "none", cursor: "default" }),
				)
		: el;
}
function NO(e, t) {
	const i = [],
		u = t.map((o) => o?.id);
	return (
		Rm(
			e,
			t,
			(o) => {
				j_(o, ...u) || kO(o, ...u) || i.unshift(L_(o, t));
			},
			(o) => {
				o.hasAttribute("role") && (t.some((f) => f && an(f, o)) || i.unshift(Am(o, "role", "none")));
			},
		),
		() => {
			for (const o of i) o();
		}
	);
}
function U_(e = {}) {
	const t = jc(e.store, Sm(e.disclosure, ["contentElement", "disclosureElement"]));
	const i = t?.getState(),
		u = je(e.open, i?.open, e.defaultOpen, !1),
		l = je(e.animated, i?.animated, !1),
		o = Dr(
			{
				open: u,
				animated: l,
				animating: !!l && u,
				mounted: u,
				contentElement: je(i?.contentElement, null),
				disclosureElement: je(i?.disclosureElement, null),
			},
			t,
		);
	return (
		$n(o, () =>
			Mn(o, ["animated", "animating"], (f) => {
				f.animated || o.setState("animating", !1);
			}),
		),
		$n(o, () =>
			_m(o, ["open"], () => {
				o.getState().animated && o.setState("animating", !0);
			}),
		),
		$n(o, () =>
			Mn(o, ["open", "animating"], (f) => {
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
function $_(e, t, i) {
	return (
		es(t, [i.store, i.disclosure]),
		Ht(e, i, "open", "setOpen"),
		Ht(e, i, "mounted", "setMounted"),
		Ht(e, i, "animated"),
		Object.assign(e, { disclosure: i.disclosure })
	);
}
function OO(e = {}) {
	const [t, i] = qc(U_, e);
	return $_(t, i, e);
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
	lj = et(function (t) {
		return t;
	}),
	hc = Ke(function (t) {
		return Xe(zO, t);
	});
Object.assign(
	hc,
	DO.reduce(
		(e, t) => (
			(e[t] = Ke(function (u) {
				return Xe(t, u);
			})),
			e
		),
		{},
	),
);
function jO({ store: e, backdrop: t, alwaysVisible: i, hidden: u }) {
	const l = (0, b.useRef)(null),
		o = OO({ disclosure: e }),
		f = nn(e, "contentElement");
	((0, b.useEffect)(() => {
		const v = l.current,
			g = f;
		v && g && (v.style.zIndex = getComputedStyle(g).zIndex);
	}, [f]),
		at(() => {
			const v = f?.id;
			if (!v) return;
			const g = l.current;
			if (g) return q_(g, v);
		}, [f]));
	const h = xm({
		ref: l,
		store: o,
		role: "presentation",
		"data-backdrop": f?.id || "",
		alwaysVisible: i,
		hidden: u ?? void 0,
		style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 },
	});
	if (!t) return null;
	if ((0, b.isValidElement)(t)) return (0, S.jsx)(hc, { ...h, render: t });
	const m = typeof t != "boolean" ? t : "div";
	return (0, S.jsx)(hc, { ...h, render: (0, S.jsx)(m, {}) });
}
function B_(e = {}) {
	return U_(e);
}
function V_(e, t, i) {
	return $_(e, t, i);
}
function qO(e = {}) {
	const [t, i] = qc(B_, e);
	return V_(t, i, e);
}
var IO = "div",
	Tp = xc();
function LO(e) {
	const t = Ni();
	return !t || (e && an(e, t)) ? !1 : !!zr(t);
}
function xp(e, t = !1) {
	if (!e) return null;
	const i = "current" in e ? e.current : e;
	return i ? (t ? (zr(i) ? i : null) : i) : null;
}
var Z_ = et(function ({
	store: t,
	open: i,
	onClose: u,
	focusable: l = !0,
	modal: o = !0,
	portal: f = !!o,
	backdrop: h = !!o,
	hideOnEscape: m = !0,
	hideOnInteractOutside: v = !0,
	getPersistentElements: g,
	preventBodyScroll: _ = !!o,
	autoFocusOnShow: p = !0,
	autoFocusOnHide: w = !0,
	initialFocus: x,
	finalFocus: R,
	unmountOnHide: z,
	unstable_treeSnapshotKey: I,
	...j
}) {
	const N = Nc(),
		C = (0, b.useRef)(null),
		q = qO({
			store: t || N,
			open: i,
			setOpen(_e) {
				if (_e) return;
				const Ae = C.current;
				if (!Ae) return;
				const Je = new Event("close", { bubbles: !1, cancelable: !0 });
				(u && Ae.addEventListener("close", u, { once: !0 }),
					Ae.dispatchEvent(Je),
					Je.defaultPrevented && q.setOpen(!0));
			},
		}),
		{ portalRef: J, domReady: G } = cm(f, j.portalRef),
		k = j.preserveTabOrder,
		$ = nn(q, (_e) => k && !o && _e.mounted),
		B = Oi(j.id),
		Q = nn(q, "open"),
		oe = nn(q, "mounted"),
		le = nn(q, "contentElement"),
		te = Ic(oe, j.hidden, j.alwaysVisible);
	(CO(le, B, _ && !te), TO(q, v, G));
	const { wrapElement: ne, nestedDialogs: O } = xO(q);
	((j = xn(j, ne, [ne])),
		at(() => {
			if (!Q) return;
			const _e = C.current,
				Ae = Ni(_e, !0);
			Ae && Ae.tagName !== "BODY" && ((_e && an(_e, Ae)) || q.setDisclosureElement(Ae));
		}, [q, Q]),
		Tp &&
			(0, b.useEffect)(() => {
				if (!oe) return;
				const { disclosureElement: _e } = q.getState();
				if (!_e || !da(_e)) return;
				const Ae = () => {
					let Je = !1;
					const De = () => {
						Je = !0;
					};
					(_e.addEventListener("focusin", De, { capture: !0, once: !0 }),
						Hu(_e, "mouseup", () => {
							(_e.removeEventListener("focusin", De, !0), !Je && v_(_e));
						}));
				};
				return (
					_e.addEventListener("mousedown", Ae),
					() => {
						_e.removeEventListener("mousedown", Ae);
					}
				);
			}, [q, oe]),
		(0, b.useEffect)(() => {
			if (!oe || !G) return;
			const _e = C.current;
			if (!_e) return;
			const Ae = Wb(_e),
				Je = Ae.visualViewport || Ae,
				De = () => {
					var wt, _t;
					const fe = (_t = (wt = Ae.visualViewport) == null ? void 0 : wt.height) != null ? _t : Ae.innerHeight;
					_e.style.setProperty("--dialog-viewport-height", `${fe}px`);
				};
			return (
				De(),
				Je.addEventListener("resize", De),
				() => {
					Je.removeEventListener("resize", De);
				}
			);
		}, [oe, G]),
		(0, b.useEffect)(() => {
			if (!o || !oe || !G) return;
			const _e = C.current;
			if (_e && !_e.querySelector("[data-dialog-dismiss]")) return hO(_e, q.hide);
		}, [q, o, oe, G]),
		at(() => {
			if (!I_() || Q || !oe || !G) return;
			const _e = C.current;
			if (_e) return L_(_e);
		}, [Q, oe, G]));
	const V = Q && G;
	at(() => {
		if (!B || !V) return;
		const _e = C.current;
		return bO(B, [_e]);
	}, [B, V, I]);
	const P = ze(g);
	at(() => {
		if (!B || !V) return;
		const { disclosureElement: _e } = q.getState(),
			Ae = [C.current, ...(P() || []), ...O.map((Je) => Je.getState().contentElement)];
		return o ? Fn(wp(B, Ae), NO(B, Ae)) : wp(B, [_e, ...Ae]);
	}, [B, q, V, P, O, o, I]);
	const ve = !!p,
		ye = Ct(p),
		[Be, M] = (0, b.useState)(!1);
	(0, b.useEffect)(() => {
		if (!Q || !ve || !G || !le?.isConnected) return;
		const _e = xp(x, !0) || le.querySelector("[data-autofocus=true],[autofocus]") || QM(le, !0, f && $) || le,
			Ae = zr(_e);
		ye(Ae ? _e : null) &&
			(M(!0),
			queueMicrotask(() => {
				(_e.focus(), Tp && Ae && _e.scrollIntoView({ block: "nearest", inline: "nearest" }));
			}));
	}, [Q, ve, G, le, x, f, $, ye]);
	const L = !!w,
		se = Ct(w),
		[ce, he] = (0, b.useState)(!1);
	(0, b.useEffect)(() => {
		if (Q) return (he(!0), () => he(!1));
	}, [Q]);
	const we = (0, b.useCallback)(
			(_e, Ae = !0) => {
				const { disclosureElement: Je } = q.getState();
				if (LO(_e)) return;
				let De = xp(R) || Je;
				if (De?.id) {
					const _t = At(De),
						fe = `[aria-activedescendant="${De.id}"]`,
						Re = _t.querySelector(fe);
					Re && (De = Re);
				}
				if (De && !zr(De)) {
					const _t = De.closest("[data-dialog]");
					if (_t?.id) {
						const fe = At(_t),
							Re = `[aria-controls~="${_t.id}"]`,
							St = fe.querySelector(Re);
						St && (De = St);
					}
				}
				const wt = De && zr(De);
				if (!wt && Ae) {
					requestAnimationFrame(() => we(_e, !1));
					return;
				}
				se(wt ? De : null) && wt && De?.focus({ preventScroll: !0 });
			},
			[q, R, se],
		),
		pe = (0, b.useRef)(!1);
	(at(() => {
		if (Q || !ce || !L) return;
		const _e = C.current;
		((pe.current = !0), we(_e));
	}, [Q, ce, G, L, we]),
		(0, b.useEffect)(() => {
			if (!ce || !L) return;
			const _e = C.current;
			return () => {
				if (pe.current) {
					pe.current = !1;
					return;
				}
				we(_e);
			};
		}, [ce, L, we]));
	const qe = Ct(m);
	((0, b.useEffect)(
		() =>
			!G || !oe
				? void 0
				: Tn(
						"keydown",
						(Ae) => {
							if (Ae.key !== "Escape" || Ae.defaultPrevented) return;
							const Je = C.current;
							if (!Je || Cm(Je)) return;
							const De = Ae.target;
							if (!De) return;
							const { disclosureElement: wt } = q.getState();
							!!(De.tagName === "BODY" || an(Je, De) || !wt || an(wt, De)) && qe(Ae) && q.hide();
						},
						!0,
					),
		[q, G, oe, qe],
	),
		(j = xn(j, (_e) => (0, S.jsx)(fO, { level: o ? 1 : void 0, children: _e }), [o])));
	const Ie = j.hidden,
		st = j.alwaysVisible;
	j = xn(
		j,
		(_e) =>
			h
				? (0, S.jsxs)(S.Fragment, {
						children: [(0, S.jsx)(jO, { store: q, backdrop: h, hidden: Ie, alwaysVisible: st }), _e],
					})
				: _e,
		[q, h, Ie, st],
	);
	const [Bt, bt] = (0, b.useState)(),
		[ct, yt] = (0, b.useState)();
	return (
		(j = xn(
			j,
			(_e) =>
				(0, S.jsx)(ym, {
					value: q,
					children: (0, S.jsx)(bN.Provider, {
						value: bt,
						children: (0, S.jsx)(_N.Provider, { value: yt, children: _e }),
					}),
				}),
			[q],
		)),
		(j = {
			id: B,
			"data-dialog": "",
			role: "dialog",
			tabIndex: l ? -1 : void 0,
			"aria-labelledby": Bt,
			"aria-describedby": ct,
			...j,
			ref: Qt(C, j.ref),
		}),
		(j = D_({ ...j, autoFocusOnShow: Be })),
		(j = xm({ store: q, ...j })),
		(j = gl({ ...j, focusable: l })),
		(j = z_({ portal: f, ...j, portalRef: J, preserveTabOrder: $ })),
		j
	);
});
function wl(e, t = Nc) {
	return Ke(function (u) {
		const l = t();
		return nn(u.store || l, (o) => !u.unmountOnHide || o?.mounted || !!u.open) ? (0, S.jsx)(e, { ...u }) : null;
	});
}
var oj = wl(
		Ke(function (t) {
			return Xe(IO, Z_(t));
		}),
		Nc,
	),
	ha = Math.min,
	Ai = Math.max,
	mc = Math.round,
	Qo = Math.floor,
	Ri = (e) => ({ x: e, y: e }),
	UO = { left: "right", right: "left", bottom: "top", top: "bottom" };
function H_(e, t, i) {
	return Ai(e, ha(t, i));
}
function ma(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function va(e) {
	return e.split("-")[0];
}
function ts(e) {
	return e.split("-")[1];
}
function km(e) {
	return e === "x" ? "y" : "x";
}
function Mm(e) {
	return e === "y" ? "height" : "width";
}
function Kr(e) {
	const t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Nm(e) {
	return km(Kr(e));
}
function $O(e, t, i) {
	i === void 0 && (i = !1);
	const u = ts(e),
		l = Nm(e),
		o = Mm(l);
	let f = l === "x" ? (u === (i ? "end" : "start") ? "right" : "left") : u === "start" ? "bottom" : "top";
	return (t.reference[o] > t.floating[o] && (f = vc(f)), [f, vc(f)]);
}
function BO(e) {
	const t = vc(e);
	return [$h(e), t, $h(t)];
}
function $h(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Ap = ["left", "right"],
	Rp = ["right", "left"],
	VO = ["top", "bottom"],
	ZO = ["bottom", "top"];
function HO(e, t, i) {
	switch (e) {
		case "top":
		case "bottom":
			return i ? (t ? Rp : Ap) : t ? Ap : Rp;
		case "left":
		case "right":
			return t ? VO : ZO;
		default:
			return [];
	}
}
function PO(e, t, i, u) {
	const l = ts(e);
	let o = HO(va(e), i === "start", u);
	return (l && ((o = o.map((f) => f + "-" + l)), t && (o = o.concat(o.map($h)))), o);
}
function vc(e) {
	const t = va(e);
	return UO[t] + e.slice(t.length);
}
function QO(e) {
	var t, i, u, l;
	return {
		top: (t = e.top) != null ? t : 0,
		right: (i = e.right) != null ? i : 0,
		bottom: (u = e.bottom) != null ? u : 0,
		left: (l = e.left) != null ? l : 0,
	};
}
function P_(e) {
	return typeof e != "number" ? QO(e) : { top: e, right: e, bottom: e, left: e };
}
function gc(e) {
	const { x: t, y: i, width: u, height: l } = e;
	return { width: u, height: l, top: i, left: t, right: t + u, bottom: i + l, x: t, y: i };
}
function Cp(e, t, i) {
	let { reference: u, floating: l } = e;
	const o = Kr(t),
		f = Nm(t),
		h = Mm(f),
		m = va(t),
		v = o === "y",
		g = u.x + u.width / 2 - l.width / 2,
		_ = u.y + u.height / 2 - l.height / 2,
		p = u[h] / 2 - l[h] / 2;
	let w;
	switch (m) {
		case "top":
			w = { x: g, y: u.y - l.height };
			break;
		case "bottom":
			w = { x: g, y: u.y + u.height };
			break;
		case "right":
			w = { x: u.x + u.width, y: _ };
			break;
		case "left":
			w = { x: u.x - l.width, y: _ };
			break;
		default:
			w = { x: u.x, y: u.y };
	}
	const x = ts(t);
	return (x && (w[f] += p * (x === "end" ? 1 : -1) * (i && v ? -1 : 1)), w);
}
async function KO(e, t) {
	var i;
	t === void 0 && (t = {});
	const { x: u, y: l, platform: o, rects: f, elements: h, strategy: m } = e,
		{
			boundary: v = "clippingAncestors",
			rootBoundary: g = "viewport",
			elementContext: _ = "floating",
			altBoundary: p = !1,
			padding: w = 0,
		} = ma(t, e),
		x = P_(w),
		R = h[p ? (_ === "floating" ? "reference" : "floating") : _],
		z = gc(
			await o.getClippingRect({
				element:
					(i = await (o.isElement == null ? void 0 : o.isElement(R))) == null || i
						? R
						: R.contextElement || (await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(h.floating))),
				boundary: v,
				rootBoundary: g,
				strategy: m,
			}),
		),
		I = _ === "floating" ? { x: u, y: l, width: f.floating.width, height: f.floating.height } : f.reference,
		j = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(h.floating)),
		N = ((await (o.isElement == null ? void 0 : o.isElement(j))) &&
			(await (o.getScale == null ? void 0 : o.getScale(j)))) || { x: 1, y: 1 },
		C = gc(
			o.convertOffsetParentRelativeRectToViewportRelativeRect
				? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
						elements: h,
						rect: I,
						offsetParent: j,
						strategy: m,
					})
				: I,
		);
	return {
		top: (z.top - C.top + x.top) / N.y,
		bottom: (C.bottom - z.bottom + x.bottom) / N.y,
		left: (z.left - C.left + x.left) / N.x,
		right: (C.right - z.right + x.right) / N.x,
	};
}
var YO = 50,
	FO = async (e, t, i) => {
		const { placement: u = "bottom", strategy: l = "absolute", middleware: o = [], platform: f } = i,
			h = f.detectOverflow ? f : { ...f, detectOverflow: KO },
			m = await (f.isRTL == null ? void 0 : f.isRTL(t));
		let v = await f.getElementRects({ reference: e, floating: t, strategy: l }),
			{ x: g, y: _ } = Cp(v, u, m),
			p = u,
			w = 0;
		const x = {};
		for (let R = 0; R < o.length; R++) {
			const z = o[R];
			if (!z) continue;
			const { name: I, fn: j } = z,
				{
					x: N,
					y: C,
					data: q,
					reset: J,
				} = await j({
					x: g,
					y: _,
					initialPlacement: u,
					placement: p,
					strategy: l,
					middlewareData: x,
					rects: v,
					platform: h,
					elements: { reference: e, floating: t },
				});
			((g = N ?? g),
				(_ = C ?? _),
				(x[I] = { ...x[I], ...q }),
				J &&
					w < YO &&
					(w++,
					typeof J == "object" &&
						(J.placement && (p = J.placement),
						J.rects &&
							(v = J.rects === !0 ? await f.getElementRects({ reference: e, floating: t, strategy: l }) : J.rects),
						({ x: g, y: _ } = Cp(v, p, m))),
					(R = -1)));
		}
		return { x: g, y: _, placement: p, strategy: l, middlewareData: x };
	},
	GO = (e) => ({
		name: "arrow",
		options: e,
		async fn(t) {
			const { x: i, y: u, placement: l, rects: o, platform: f, elements: h, middlewareData: m } = t,
				{ element: v, padding: g = 0 } = ma(e, t) || {};
			if (v == null) return {};
			const _ = P_(g),
				p = { x: i, y: u },
				w = Nm(l),
				x = Mm(w),
				R = await f.getDimensions(v),
				z = w === "y",
				I = z ? "top" : "left",
				j = z ? "bottom" : "right",
				N = z ? "clientHeight" : "clientWidth",
				C = o.reference[x] + o.reference[w] - p[w] - o.floating[x],
				q = p[w] - o.reference[w],
				J = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(v));
			let G = J ? J[N] : 0;
			(!G || !(await (f.isElement == null ? void 0 : f.isElement(J)))) && (G = h.floating[N] || o.floating[x]);
			const k = C / 2 - q / 2,
				$ = G / 2 - R[x] / 2 - 1,
				B = ha(_[I], $),
				Q = ha(_[j], $),
				oe = G - R[x] - Q,
				le = G / 2 - R[x] / 2 + k,
				te = H_(B, le, oe),
				ne = !m.arrow && ts(l) != null && le !== te && o.reference[x] / 2 - (le < B ? B : Q) - R[x] / 2 < 0,
				O = ne ? (le < B ? le - B : le - oe) : 0;
			return {
				[w]: p[w] + O,
				data: { [w]: te, centerOffset: le - te - O, ...(ne && { alignmentOffset: O }) },
				reset: ne,
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
					const { placement: l, middlewareData: o, rects: f, initialPlacement: h, platform: m, elements: v } = t,
						{
							mainAxis: g = !0,
							crossAxis: _ = !0,
							fallbackPlacements: p,
							fallbackStrategy: w = "bestFit",
							fallbackAxisSideDirection: x = "none",
							flipAlignment: R = !0,
							...z
						} = ma(e, t);
					if ((i = o.arrow) != null && i.alignmentOffset) return {};
					const I = va(l),
						j = Kr(h),
						N = va(h) === h,
						C = await (m.isRTL == null ? void 0 : m.isRTL(v.floating)),
						q = p || (N || !R ? [vc(h)] : BO(h)),
						J = x !== "none";
					!p && J && q.push(...PO(h, R, x, C));
					const G = [h, ...q],
						k = await m.detectOverflow(t, z),
						$ = [];
					let B = ((u = o.flip) == null ? void 0 : u.overflows) || [];
					if ((g && $.push(k[I]), _)) {
						const te = $O(l, f, C);
						$.push(k[te[0]], k[te[1]]);
					}
					if (((B = [...B, { placement: l, overflows: $ }]), !$.every((te) => te <= 0))) {
						var Q, oe;
						const te = (((Q = o.flip) == null ? void 0 : Q.index) || 0) + 1,
							ne = G[te];
						if (
							ne &&
							(!(_ === "alignment" && j !== Kr(ne)) ||
								B.every((V) => (Kr(V.placement) === j ? V.overflows[0] > 0 : !0)))
						)
							return { data: { index: te, overflows: B }, reset: { placement: ne } };
						let O =
							(oe = B.filter((V) => V.overflows[0] <= 0).sort((V, P) => V.overflows[1] - P.overflows[1])[0]) == null
								? void 0
								: oe.placement;
						if (!O)
							switch (w) {
								case "bestFit": {
									var le;
									const V =
										(le = B.filter((P) => {
											if (J) {
												const ve = Kr(P.placement);
												return ve === j || ve === "y";
											}
											return !0;
										})
											.map((P) => [P.placement, P.overflows.filter((ve) => ve > 0).reduce((ve, ye) => ve + ye, 0)])
											.sort((P, ve) => P[1] - ve[1])[0]) == null
											? void 0
											: le[0];
									V && (O = V);
									break;
								}
								case "initialPlacement":
									O = h;
									break;
							}
						if (l !== O) return { reset: { placement: O } };
					}
					return {};
				},
			}
		);
	},
	Q_ = new Set(["left", "top"]);
async function JO(e, t) {
	const { placement: i, platform: u, elements: l } = e,
		o = await (u.isRTL == null ? void 0 : u.isRTL(l.floating)),
		f = va(i),
		h = ts(i),
		m = Kr(i) === "y",
		v = Q_.has(f) ? -1 : 1,
		g = o && m ? -1 : 1,
		_ = ma(t, e);
	let {
		mainAxis: p,
		crossAxis: w,
		alignmentAxis: x,
	} = typeof _ == "number"
		? { mainAxis: _, crossAxis: 0, alignmentAxis: null }
		: { mainAxis: _.mainAxis || 0, crossAxis: _.crossAxis || 0, alignmentAxis: _.alignmentAxis };
	return (
		h && typeof x == "number" && (w = h === "end" ? x * -1 : x),
		m ? { x: w * g, y: p * v } : { x: p * v, y: w * g }
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
					const { x: l, y: o, placement: f, middlewareData: h } = t,
						m = await JO(t, e);
					return f === ((i = h.offset) == null ? void 0 : i.placement) && (u = h.arrow) != null && u.alignmentOffset
						? {}
						: { x: l + m.x, y: o + m.y, data: { ...m, placement: f } };
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
					const { x: i, y: u, placement: l, platform: o } = t,
						{
							mainAxis: f = !0,
							crossAxis: h = !1,
							limiter: m = {
								fn: (j) => {
									let { x: N, y: C } = j;
									return { x: N, y: C };
								},
							},
							...v
						} = ma(e, t),
						g = { x: i, y: u },
						_ = await o.detectOverflow(t, v),
						p = Kr(l),
						w = km(p);
					let x = g[w],
						R = g[p];
					const z = (j, N) => H_(N + _[j === "y" ? "top" : "left"], N, N - _[j === "y" ? "bottom" : "right"]);
					(f && (x = z(w, x)), h && (R = z(p, R)));
					const I = m.fn({ ...t, [w]: x, [p]: R });
					return { ...I, data: { x: I.x - i, y: I.y - u, enabled: { [w]: f, [p]: h } } };
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
					const { x: l, y: o, placement: f, rects: h, middlewareData: m } = t,
						{ offset: v = 0, mainAxis: g = !0, crossAxis: _ = !0 } = ma(e, t),
						p = { x: l, y: o },
						w = Kr(f),
						x = km(w);
					let R = p[x],
						z = p[w];
					const I = ma(v, t),
						j =
							typeof I == "number"
								? { mainAxis: I, crossAxis: 0 }
								: { mainAxis: (i = I.mainAxis) != null ? i : 0, crossAxis: (u = I.crossAxis) != null ? u : 0 };
					if (g) {
						const q = x === "y" ? "height" : "width",
							J = h.reference[x] - h.floating[q] + j.mainAxis,
							G = h.reference[x] + h.reference[q] - j.mainAxis;
						R < J ? (R = J) : R > G && (R = G);
					}
					if (_) {
						var N, C;
						const q = x === "y" ? "width" : "height",
							J = Q_.has(va(f)),
							G =
								h.reference[w] -
								h.floating[q] +
								((J && ((N = m.offset) == null ? void 0 : N[w])) || 0) +
								(J ? 0 : j.crossAxis),
							k =
								h.reference[w] +
								h.reference[q] +
								(J ? 0 : ((C = m.offset) == null ? void 0 : C[w]) || 0) -
								(J ? j.crossAxis : 0);
						z < G ? (z = G) : z > k && (z = k);
					}
					return { [x]: R, [w]: z };
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
					const { placement: i, rects: u, platform: l, elements: o } = t,
						{ apply: f = () => {}, ...h } = ma(e, t),
						m = await l.detectOverflow(t, h),
						v = va(i),
						g = ts(i),
						_ = Kr(i) === "y",
						{ width: p, height: w } = u.floating;
					let x, R;
					v === "top" || v === "bottom"
						? ((x = v),
							(R =
								g === ((await (l.isRTL == null ? void 0 : l.isRTL(o.floating))) ? "start" : "end") ? "left" : "right"))
						: ((R = v), (x = g === "end" ? "top" : "bottom"));
					const z = w - m.top - m.bottom,
						I = p - m.left - m.right,
						j = ha(w - m[x], z),
						N = ha(p - m[R], I),
						C = t.middlewareData.shift,
						q = !C;
					let J = j,
						G = N;
					(C != null && C.enabled.x && (G = I),
						C != null && C.enabled.y && (J = z),
						q && !g && (_ ? (G = p - 2 * Ai(m.left, m.right)) : (J = w - 2 * Ai(m.top, m.bottom))),
						await f({ ...t, availableWidth: G, availableHeight: J }));
					const k = await l.getDimensions(o.floating);
					return p !== k.width || w !== k.height ? { reset: { rects: !0 } } : {};
				},
			}
		);
	};
function Lc() {
	return typeof window < "u";
}
function ns(e) {
	return K_(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Yn(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function zi(e) {
	var t;
	return (t = (K_(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function K_(e) {
	return Lc() ? e instanceof Node || e instanceof Yn(e).Node : !1;
}
function Yr(e) {
	return Lc() ? e instanceof Element || e instanceof Yn(e).Element : !1;
}
function pa(e) {
	return Lc() ? e instanceof HTMLElement || e instanceof Yn(e).HTMLElement : !1;
}
function kp(e) {
	return !Lc() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Yn(e).ShadowRoot;
}
function Uc(e) {
	const { overflow: t, overflowX: i, overflowY: u, display: l } = Fr(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + u + i) && l !== "inline" && l !== "contents";
}
function r2(e) {
	return /^(table|td|th)$/.test(ns(e));
}
function $c(e) {
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
	Ua = (e) => !!e && e !== "none",
	oh;
function Om(e) {
	const t = Yr(e) ? Fr(e) : e;
	return (
		Ua(t.transform) ||
		Ua(t.translate) ||
		Ua(t.scale) ||
		Ua(t.rotate) ||
		Ua(t.perspective) ||
		(!zm() && (Ua(t.backdropFilter) || Ua(t.filter))) ||
		i2.test(t.willChange || "") ||
		a2.test(t.contain || "")
	);
}
function u2(e) {
	let t = Fa(e);
	for (; pa(t) && !ll(t); ) {
		if (Om(t)) return t;
		if ($c(t)) return null;
		t = Fa(t);
	}
	return null;
}
function zm() {
	return (oh == null && (oh = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), oh);
}
function ll(e) {
	return /^(html|body|#document)$/.test(ns(e));
}
function Fr(e) {
	return Yn(e).getComputedStyle(e);
}
function Bc(e) {
	return Yr(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Fa(e) {
	if (ns(e) === "html") return e;
	const t = e.assignedSlot || e.parentNode || (kp(e) && e.host) || zi(e);
	return kp(t) ? t.host : t;
}
function Y_(e) {
	const t = Fa(e);
	return ll(t) ? (e.ownerDocument || e).body : pa(t) && Uc(t) ? t : Y_(t);
}
function ol(e, t, i) {
	var u;
	(t === void 0 && (t = []), i === void 0 && (i = !0));
	const l = Y_(e),
		o = l === ((u = e.ownerDocument) == null ? void 0 : u.body),
		f = Yn(l);
	if (o) {
		const h = Bh(f);
		return t.concat(f, f.visualViewport || [], Uc(l) ? l : [], h && i ? ol(h) : []);
	} else return t.concat(l, ol(l, [], i));
}
function Bh(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function F_(e) {
	const t = Fr(e);
	let i = parseFloat(t.width) || 0,
		u = parseFloat(t.height) || 0;
	const l = pa(e),
		o = l ? e.offsetWidth : i,
		f = l ? e.offsetHeight : u,
		h = mc(i) !== o || mc(u) !== f;
	return (h && ((i = o), (u = f)), { width: i, height: u, $: h });
}
function Dm(e) {
	return Yr(e) ? e : e.contextElement;
}
function Pu(e) {
	const t = Dm(e);
	if (!pa(t)) return Ri(1);
	const i = t.getBoundingClientRect(),
		{ width: u, height: l, $: o } = F_(t);
	let f = (o ? mc(i.width) : i.width) / u,
		h = (o ? mc(i.height) : i.height) / l;
	return ((!f || !Number.isFinite(f)) && (f = 1), (!h || !Number.isFinite(h)) && (h = 1), { x: f, y: h });
}
var s2 = Ri(0);
function G_(e) {
	const t = Yn(e);
	return !zm() || !t.visualViewport ? s2 : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function l2(e, t, i) {
	return (t === void 0 && (t = !1), !!i && t && i === Yn(e));
}
function Ga(e, t, i, u) {
	(t === void 0 && (t = !1), i === void 0 && (i = !1));
	const l = e.getBoundingClientRect(),
		o = Dm(e);
	let f = Ri(1);
	t && (u ? Yr(u) && (f = Pu(u)) : (f = Pu(e)));
	const h = l2(o, i, u) ? G_(o) : Ri(0);
	let m = (l.left + h.x) / f.x,
		v = (l.top + h.y) / f.y,
		g = l.width / f.x,
		_ = l.height / f.y;
	if (o && u) {
		const p = Yn(o),
			w = Yr(u) ? Yn(u) : u;
		let x = p,
			R = Bh(x);
		for (; R && w !== x; ) {
			const z = Pu(R),
				I = R.getBoundingClientRect(),
				j = Fr(R),
				N = I.left + (R.clientLeft + parseFloat(j.paddingLeft)) * z.x,
				C = I.top + (R.clientTop + parseFloat(j.paddingTop)) * z.y;
			((m *= z.x), (v *= z.y), (g *= z.x), (_ *= z.y), (m += N), (v += C), (x = Yn(R)), (R = Bh(x)));
		}
	}
	return gc({ width: g, height: _, x: m, y: v });
}
function Vc(e, t) {
	const i = Bc(e).scrollLeft;
	return t ? t.left + i : Ga(zi(e)).left + i;
}
function X_(e, t) {
	const i = e.getBoundingClientRect();
	return { x: i.left + t.scrollLeft - Vc(e, i), y: i.top + t.scrollTop };
}
function o2(e) {
	let { elements: t, rect: i, offsetParent: u, strategy: l } = e;
	const o = l === "fixed",
		f = zi(u),
		h = t ? $c(t.floating) : !1;
	if (u === f || (h && o)) return i;
	let m = { scrollLeft: 0, scrollTop: 0 },
		v = Ri(1);
	const g = Ri(0),
		_ = pa(u);
	if ((_ || !o) && ((ns(u) !== "body" || Uc(f)) && (m = Bc(u)), _)) {
		const w = Ga(u);
		((v = Pu(u)), (g.x = w.x + u.clientLeft), (g.y = w.y + u.clientTop));
	}
	const p = f && !_ && !o ? X_(f, m) : Ri(0);
	return {
		width: i.width * v.x,
		height: i.height * v.y,
		x: i.x * v.x - m.scrollLeft * v.x + g.x + p.x,
		y: i.y * v.y - m.scrollTop * v.y + g.y + p.y,
	};
}
function c2(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function f2(e) {
	const t = Bc(e),
		i = e.ownerDocument.body,
		u = Ai(e.scrollWidth, e.clientWidth, i.scrollWidth, i.clientWidth),
		l = Ai(e.scrollHeight, e.clientHeight, i.scrollHeight, i.clientHeight);
	let o = -t.scrollLeft + Vc(e);
	const f = -t.scrollTop;
	return (
		Fr(i).direction === "rtl" && (o += Ai(e.clientWidth, i.clientWidth) - u),
		{ width: u, height: l, x: o, y: f }
	);
}
var d2 = 25;
function h2(e, t, i) {
	i === void 0 && (i = "viewport");
	const u = i === "layoutViewport",
		l = Yn(e),
		o = zi(e),
		f = l.visualViewport;
	let h = o.clientWidth,
		m = o.clientHeight,
		v = 0,
		g = 0;
	if (f) {
		const _ = !zm() || t === "fixed";
		u
			? _ || ((v = -f.offsetLeft), (g = -f.offsetTop))
			: ((h = f.width), (m = f.height), _ && ((v = f.offsetLeft), (g = f.offsetTop)));
	}
	if (Vc(o) <= 0) {
		const _ = o.ownerDocument,
			p = _.body,
			w = getComputedStyle(p),
			x = (_.compatMode === "CSS1Compat" && parseFloat(w.marginLeft) + parseFloat(w.marginRight)) || 0,
			R = Math.abs(o.clientWidth - p.clientWidth - x),
			z = getComputedStyle(o).scrollbarGutter === "stable both-edges" ? R / 2 : R;
		z <= d2 && (h -= z);
	}
	return { width: h, height: m, x: v, y: g };
}
function m2(e, t) {
	const i = Ga(e, !0, t === "fixed"),
		u = i.top + e.clientTop,
		l = i.left + e.clientLeft,
		o = Pu(e);
	return { width: e.clientWidth * o.x, height: e.clientHeight * o.y, x: l * o.x, y: u * o.y };
}
function Mp(e, t, i) {
	let u;
	if (t === "viewport" || t === "layoutViewport") u = h2(e, i, t);
	else if (t === "document") u = f2(zi(e));
	else if (Yr(t)) u = m2(t, i);
	else {
		const l = G_(e);
		u = { x: t.x - l.x, y: t.y - l.y, width: t.width, height: t.height };
	}
	return gc(u);
}
function v2(e, t) {
	const i = t.get(e);
	if (i) return i;
	let u = ol(e, [], !1).filter((h) => Yr(h) && ns(h) !== "body"),
		l = null;
	const o = Fr(e).position === "fixed";
	let f = o ? Fa(e) : e;
	for (; Yr(f) && !ll(f); ) {
		const h = Fr(f),
			m = Om(f),
			v = l ? l.position : o ? "fixed" : "";
		(!m && (v === "fixed" || (v === "absolute" && h.position === "static")) ? (u = u.filter((g) => g !== f)) : (l = h),
			(f = Fa(f)));
	}
	return (t.set(e, u), u);
}
function g2(e) {
	let { element: t, boundary: i, rootBoundary: u, strategy: l } = e;
	const o = [...(i === "clippingAncestors" ? ($c(t) ? [] : v2(t, this._c)) : [].concat(i)), u],
		f = Mp(t, o[0], l);
	let h = f.top,
		m = f.right,
		v = f.bottom,
		g = f.left;
	for (let _ = 1; _ < o.length; _++) {
		const p = Mp(t, o[_], l);
		((h = Ai(p.top, h)), (m = ha(p.right, m)), (v = ha(p.bottom, v)), (g = Ai(p.left, g)));
	}
	return { width: m - g, height: v - h, x: g, y: h };
}
function y2(e) {
	const { width: t, height: i } = F_(e);
	return { width: t, height: i };
}
function p2(e, t, i) {
	const u = pa(t),
		l = zi(t),
		o = i === "fixed",
		f = Ga(e, !0, o, t);
	let h = { scrollLeft: 0, scrollTop: 0 };
	const m = Ri(0);
	if ((u || !o) && ((ns(t) !== "body" || Uc(l)) && (h = Bc(t)), u)) {
		const g = Ga(t, !0, o, t);
		((m.x = g.x + t.clientLeft), (m.y = g.y + t.clientTop));
	}
	!u && l && (m.x = Vc(l));
	const v = l && !u && !o ? X_(l, h) : Ri(0);
	return { x: f.left + h.scrollLeft - m.x - v.x, y: f.top + h.scrollTop - m.y - v.y, width: f.width, height: f.height };
}
function ch(e) {
	return Fr(e).position === "static";
}
function Np(e, t) {
	if (!pa(e) || Fr(e).position === "fixed") return null;
	if (t) return t(e);
	let i = e.offsetParent;
	return (zi(e) === i && (i = i.ownerDocument.body), i);
}
function J_(e, t) {
	const i = Yn(e);
	if ($c(e)) return i;
	if (!pa(e)) {
		let l = Fa(e);
		for (; l && !ll(l); ) {
			if (Yr(l) && !ch(l)) return l;
			l = Fa(l);
		}
		return i;
	}
	let u = Np(e, t);
	for (; u && r2(u) && ch(u); ) u = Np(u, t);
	return u && ll(u) && ch(u) && !Om(u) ? i : u || u2(e) || i;
}
var b2 = async function (e) {
	const t = this.getOffsetParent || J_,
		i = this.getDimensions,
		u = await i(e.floating);
	return {
		reference: p2(e.reference, await t(e.floating), e.strategy),
		floating: { x: 0, y: 0, width: u.width, height: u.height },
	};
};
function _2(e) {
	return Fr(e).direction === "rtl";
}
var S2 = {
	convertOffsetParentRelativeRectToViewportRelativeRect: o2,
	getDocumentElement: zi,
	getClippingRect: g2,
	getOffsetParent: J_,
	getElementRects: b2,
	getClientRects: c2,
	getDimensions: y2,
	getScale: Pu,
	isElement: Yr,
	isRTL: _2,
};
function W_(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function w2(e, t, i) {
	let u = null,
		l;
	const o = zi(e);
	function f() {
		var g;
		(clearTimeout(l), (g = u) == null || g.disconnect(), (u = null));
	}
	function h(g, _) {
		(g === void 0 && (g = !1), _ === void 0 && (_ = 1), f());
		const p = e.getBoundingClientRect(),
			{ left: w, top: x, width: R, height: z } = p;
		if ((g || t(), !R || !z)) return;
		const I = Qo(x),
			j = Qo(o.clientWidth - (w + R)),
			N = Qo(o.clientHeight - (x + z)),
			C = Qo(w),
			q = { rootMargin: -I + "px " + -j + "px " + -N + "px " + -C + "px", threshold: Ai(0, ha(1, _)) || 1 };
		let J = !0;
		function G(k) {
			const $ = k[0].intersectionRatio;
			if (!W_(p, e.getBoundingClientRect())) return h();
			if ($ !== _) {
				if (!J) return h();
				$
					? h(!1, $)
					: (l = setTimeout(() => {
							h(!1, 1e-7);
						}, 1e3));
			}
			J = !1;
		}
		try {
			u = new IntersectionObserver(G, { ...q, root: o.ownerDocument });
		} catch {
			u = new IntersectionObserver(G, q);
		}
		u.observe(e);
	}
	const m = Yn(e),
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
			ancestorScroll: l = !0,
			ancestorResize: o = !0,
			elementResize: f = typeof ResizeObserver == "function",
			layoutShift: h = typeof IntersectionObserver == "function",
			animationFrame: m = !1,
		} = u,
		v = Dm(e),
		g = l || o ? [...(v ? ol(v) : []), ...(t ? ol(t) : [])] : [];
	g.forEach((I) => {
		(l && I.addEventListener("scroll", i), o && I.addEventListener("resize", i));
	});
	const _ = v && h ? w2(v, i, o) : null;
	let p = -1,
		w = null;
	f &&
		((w = new ResizeObserver((I) => {
			let [j] = I;
			(j &&
				j.target === v &&
				w &&
				t &&
				(w.unobserve(t),
				cancelAnimationFrame(p),
				(p = requestAnimationFrame(() => {
					var N;
					(N = w) == null || N.observe(t);
				}))),
				i());
		})),
		v && !m && w.observe(v),
		t && w.observe(t));
	let x,
		R = m ? Ga(e) : null;
	m && z();
	function z() {
		const I = Ga(e);
		(R && !W_(R, I) && i(), (R = I), (x = requestAnimationFrame(z)));
	}
	return (
		i(),
		() => {
			var I;
			(g.forEach((j) => {
				(l && j.removeEventListener("scroll", i), o && j.removeEventListener("resize", i));
			}),
				_?.(),
				(I = w) == null || I.disconnect(),
				(w = null),
				m && cancelAnimationFrame(x));
		}
	);
}
var T2 = WO,
	x2 = e2,
	A2 = XO,
	R2 = n2,
	C2 = GO,
	k2 = t2,
	M2 = (e, t, i) => {
		const u = new Map(),
			l = i ?? {},
			o = { ...S2, ...l.platform, _c: u };
		return FO(e, t, { ...l, platform: o });
	},
	N2 = "div";
function Op(e = 0, t = 0, i = 0, u = 0) {
	if (typeof DOMRect == "function") return new DOMRect(e, t, i, u);
	const l = { x: e, y: t, width: i, height: u, top: t, right: e + i, bottom: t + u, left: e };
	return { ...l, toJSON: () => l };
}
function O2(e) {
	if (!e) return Op();
	const { x: t, y: i, width: u, height: l } = e;
	return Op(t, i, u, l);
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
function zp(e) {
	const t = window.devicePixelRatio || 1;
	return Math.round(e * t) / t;
}
function j2(e, t) {
	return T2(({ placement: i }) => {
		var u;
		const l = (e?.clientHeight || 0) / 2,
			o = typeof t.gutter == "number" ? t.gutter + l : (u = t.gutter) != null ? u : l;
		return { crossAxis: i.split("-")[1] ? void 0 : t.shift, mainAxis: o, alignmentAxis: t.shift };
	});
}
function q2(e) {
	if (e.flip === !1) return;
	const t = typeof e.flip == "string" ? e.flip.split(" ") : void 0;
	return (Pt(!t || t.every(D2), !1), A2({ padding: e.overflowPadding, fallbackPlacements: t }));
}
function I2(e) {
	if (!(!e.slide && !e.overlap))
		return x2({ mainAxis: e.slide, crossAxis: e.overlap, padding: e.overflowPadding, limiter: k2() });
}
function L2(e) {
	return R2({
		padding: e.overflowPadding,
		apply({ elements: t, availableWidth: i, availableHeight: u, rects: l }) {
			const o = t.floating,
				f = Math.round(l.reference.width);
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
var jm = et(function ({
		store: t,
		modal: i = !1,
		portal: u = !!i,
		preserveTabOrder: l = !0,
		autoFocusOnShow: o = !0,
		wrapperProps: f,
		fixed: h = !1,
		flip: m = !0,
		shift: v = 0,
		slide: g = !0,
		overlap: _ = !1,
		sameWidth: p = !1,
		fitViewport: w = !1,
		gutter: x,
		arrowPadding: R = 4,
		overflowPadding: z = 8,
		getAnchorRect: I,
		updatePosition: j,
		...N
	}) {
		const C = Oc();
		((t = t || C), Pt(t, !1));
		const q = t.useState("arrowElement"),
			J = t.useState("anchorElement"),
			G = t.useState("disclosureElement"),
			k = t.useState("popoverElement"),
			$ = t.useState("contentElement"),
			B = t.useState("placement"),
			Q = t.useState("mounted"),
			oe = t.useState("rendered"),
			le = (0, b.useRef)(null),
			[te, ne] = (0, b.useState)(!1),
			{ portalRef: O, domReady: V } = cm(u, N.portalRef),
			P = ze(I),
			ve = ze(j),
			ye = !!j;
		(at(() => {
			if (!k?.isConnected) return;
			k.style.setProperty("--popover-overflow-padding", `${z}px`);
			const M = z2(J, P),
				L = async () => {
					if (!Q) return;
					q || (le.current = le.current || document.createElement("div"));
					const he = q || le.current,
						we = [
							j2(he, { gutter: x, shift: v }),
							q2({ flip: m, overflowPadding: z }),
							I2({ slide: g, shift: v, overlap: _, overflowPadding: z }),
							U2(he, { arrowPadding: R }),
							L2({ sameWidth: p, fitViewport: w, overflowPadding: z }),
						],
						pe = await M2(M, k, { placement: B, strategy: h ? "fixed" : "absolute", middleware: we });
					(t?.setState("currentPlacement", pe.placement), ne(!0));
					const qe = zp(pe.x),
						Ie = zp(pe.y);
					if (
						(Object.assign(k.style, { top: "0", left: "0", transform: `translate3d(${qe}px,${Ie}px,0)` }),
						he && pe.middlewareData.arrow)
					) {
						const { x: st, y: Bt } = pe.middlewareData.arrow,
							bt = pe.placement.split("-")[0],
							ct = he.clientWidth / 2,
							yt = he.clientHeight / 2,
							_e = st != null ? st + ct : -ct,
							Ae = Bt != null ? Bt + yt : -yt;
						(k.style.setProperty(
							"--popover-transform-origin",
							{
								top: `${_e}px calc(100% + ${yt}px)`,
								bottom: `${_e}px ${-yt}px`,
								left: `calc(100% + ${ct}px) ${Ae}px`,
								right: `${-ct}px ${Ae}px`,
							}[bt],
						),
							Object.assign(he.style, {
								left: st != null ? `${st}px` : "",
								top: Bt != null ? `${Bt}px` : "",
								[bt]: "100%",
							}));
					}
				},
				ce = E2(
					M,
					k,
					async () => {
						ye ? (await ve({ updatePosition: L }), ne(!0)) : await L();
					},
					{ elementResize: typeof ResizeObserver == "function" },
				);
			return () => {
				(ne(!1), ce());
			};
		}, [t, oe, k, q, J, k, B, Q, V, h, m, v, g, _, p, w, x, R, z, P, ye, ve]),
			at(() => {
				if (!Q || !V || !k?.isConnected || !$?.isConnected) return;
				const M = () => {
					k.style.zIndex = getComputedStyle($).zIndex;
				};
				M();
				let L = requestAnimationFrame(() => {
					L = requestAnimationFrame(M);
				});
				return () => cancelAnimationFrame(L);
			}, [Q, V, k, $]));
		const Be = h ? "fixed" : "absolute";
		return (
			(N = xn(
				N,
				(M) =>
					(0, S.jsx)("div", {
						...f,
						style: { position: Be, top: 0, left: 0, width: "max-content", ...f?.style },
						ref: t?.setPopoverElement,
						children: M,
					}),
				[t, Be, f],
			)),
			(N = xn(N, (M) => (0, S.jsx)(zc, { value: t, children: M }), [t])),
			(N = { "data-placing": !te || void 0, ...N, style: { position: "relative", ...N.style } }),
			(N = Z_({
				store: t,
				modal: i,
				portal: u,
				preserveTabOrder: l,
				preserveTabOrderAnchor: G || J,
				autoFocusOnShow: te && o,
				...N,
				portalRef: O,
			})),
			N
		);
	}),
	cj = wl(
		Ke(function (t) {
			return Xe(N2, jm(t));
		}),
		Oc,
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
var V2 = et(function ({
		store: t,
		modal: i,
		tabIndex: u,
		alwaysVisible: l,
		autoFocusOnHide: o = !0,
		hideOnInteractOutside: f = !0,
		...h
	}) {
		const m = Dc();
		((t = t || m), Pt(t, !1));
		const v = t.useState("baseElement"),
			g = (0, b.useRef)(!1),
			_ = nn(t.tag, (p) => p?.renderedItems.length);
		return (
			(h = N_({ store: t, alwaysVisible: l, ...h })),
			(h = jm({
				store: t,
				modal: i,
				alwaysVisible: l,
				backdrop: !1,
				autoFocusOnShow: !1,
				finalFocus: v,
				preserveTabOrderAnchor: null,
				unstable_treeSnapshotKey: _,
				...h,
				getPersistentElements() {
					var p;
					const w = ((p = h.getPersistentElements) == null ? void 0 : p.call(h)) || [];
					if (!i || !t) return w;
					const { contentElement: x, baseElement: R } = t.getState();
					if (!R) return w;
					const z = At(R),
						I = [];
					if ((x?.id && I.push(`[aria-controls~="${x.id}"]`), R?.id && I.push(`[aria-controls~="${R.id}"]`), !I.length))
						return [...w, R];
					const j = I.join(","),
						N = z.querySelectorAll(j);
					return [...w, ...N];
				},
				autoFocusOnHide(p) {
					return Tc(o, p) ? !1 : g.current ? ((g.current = !1), !1) : !0;
				},
				hideOnInteractOutside(p) {
					var w, x;
					const R = t?.getState(),
						z = (w = R?.contentElement) == null ? void 0 : w.id,
						I = (x = R?.baseElement) == null ? void 0 : x.id;
					if (B2(p.target, z, I)) return !1;
					const j = typeof f == "function" ? f(p) : f;
					return (j && (g.current = p.type === "click"), j);
				},
			})),
			h
		);
	}),
	Z2 = wl(
		Ke(function (t) {
			return Xe($2, V2(t));
		}),
		Dc,
	),
	fj = (0, b.createContext)(null),
	dj = (0, b.createContext)(null),
	El = Xr([vl], [Cc]),
	H2 = El.useContext,
	hj = El.useScopedContext,
	mj = El.useProviderContext,
	vj = El.ContextProvider,
	gj = El.ScopedContextProvider;
function eS({ popover: e, ...t } = {}) {
	const i = jc(
		t.store,
		Sm(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
	);
	const u = i?.getState(),
		l = B_({ ...t, store: i }),
		o = je(t.placement, u?.placement, "bottom"),
		f = Dr(
			{
				...l.getState(),
				placement: o,
				currentPlacement: o,
				anchorElement: je(u?.anchorElement, null),
				popoverElement: je(u?.popoverElement, null),
				arrowElement: je(u?.arrowElement, null),
				rendered: Symbol("rendered"),
			},
			l,
			i,
		);
	return {
		...l,
		...f,
		setAnchorElement: (h) => f.setState("anchorElement", h),
		setPopoverElement: (h) => f.setState("popoverElement", h),
		setArrowElement: (h) => f.setState("arrowElement", h),
		render: () => f.setState("rendered", Symbol("rendered")),
	};
}
function tS(e, t, i) {
	return (es(t, [i.popover]), Ht(e, i, "placement"), V_(e, t, i));
}
function P2(e) {
	var t;
	const i = e.find((o) => !!o.element),
		u = [...e].reverse().find((o) => !!o.element);
	let l = (t = i?.element) == null ? void 0 : t.parentElement;
	for (; l && u?.element; ) {
		if (u && l.contains(u.element)) return l;
		l = l.parentElement;
	}
	return At(l).body;
}
function Q2(e) {
	return e?.__unstablePrivateStore;
}
function K2(e = {}) {
	var t;
	e.store;
	const i = (t = e.store) == null ? void 0 : t.getState(),
		u = je(e.items, i?.items, e.defaultItems, []),
		l = new Map(u.map((p) => [p.id, p])),
		o = { items: u, renderedItems: je(i?.renderedItems, []) },
		f = Q2(e.store),
		h = Dr({ items: u, renderedItems: o.renderedItems }, f),
		m = Dr(o, e.store),
		v = (p) => {
			const w = n_(p, (x) => x.element);
			(h.setState("renderedItems", w), m.setState("renderedItems", w));
		};
	($n(m, () => bm(h)),
		$n(h, () =>
			fc(h, ["items"], (p) => {
				m.setState("items", p.items);
			}),
		),
		$n(h, () =>
			fc(h, ["renderedItems"], (p) => {
				let w = !0,
					x = requestAnimationFrame(() => {
						const { renderedItems: j } = m.getState();
						p.renderedItems !== j && v(p.renderedItems);
					});
				if (typeof IntersectionObserver != "function") return () => cancelAnimationFrame(x);
				const R = () => {
						if (w) {
							w = !1;
							return;
						}
						(cancelAnimationFrame(x), (x = requestAnimationFrame(() => v(p.renderedItems))));
					},
					z = P2(p.renderedItems),
					I = new IntersectionObserver(R, { root: z });
				for (const j of p.renderedItems) j.element && I.observe(j.element);
				return () => {
					(cancelAnimationFrame(x), I.disconnect());
				};
			}),
		));
	const g = (p, w, x = !1) => {
			let R;
			return (
				w((I) => {
					const j = I.findIndex(({ id: C }) => C === p.id),
						N = I.slice();
					if (j !== -1) {
						R = I[j];
						const C = { ...R, ...p };
						((N[j] = C), l.set(p.id, C));
					} else (N.push(p), l.set(p.id, p));
					return N;
				}),
				() => {
					w((I) => {
						if (!R) return (x && l.delete(p.id), I.filter(({ id: C }) => C !== p.id));
						const j = I.findIndex(({ id: C }) => C === p.id);
						if (j === -1) return I;
						const N = I.slice();
						return ((N[j] = R), l.set(p.id, R), N);
					});
				}
			);
		},
		_ = (p) => g(p, (w) => h.setState("items", w), !0);
	return {
		...m,
		registerItem: _,
		renderItem: (p) =>
			Fn(
				_(p),
				g(p, (w) => h.setState("renderedItems", w)),
			),
		item: (p) => {
			if (!p) return null;
			let w = l.get(p);
			if (!w) {
				const { items: x } = h.getState();
				((w = x.find((R) => R.id === p)), w && l.set(p, w));
			}
			return w || null;
		},
		__unstablePrivateStore: h,
	};
}
function Y2(e, t, i) {
	return (es(t, [i.store]), Ht(e, i, "items", "setItems"), e);
}
var F2 = { id: null };
function wi(e, t) {
	return e.find((i) => (t ? !i.disabled && i.id !== t : !i.disabled));
}
function G2(e, t) {
	return e.filter((i) => (t ? !i.disabled && i.id !== t : !i.disabled));
}
function Dp(e, t) {
	return e.filter((i) => i.rowId === t);
}
function X2(e, t, i = !1) {
	const u = e.findIndex((l) => l.id === t);
	return [...e.slice(u + 1), ...(i ? [F2] : []), ...e.slice(0, u)];
}
function nS(e) {
	const t = [];
	for (const i of e) {
		const u = t.find((l) => {
			var o;
			return ((o = l[0]) == null ? void 0 : o.rowId) === i.rowId;
		});
		u ? u.push(i) : t.push([i]);
	}
	return t;
}
function rS(e) {
	let t = 0;
	for (const { length: i } of e) i > t && (t = i);
	return t;
}
function J2(e) {
	return { id: "__EMPTY_ITEM__", disabled: !0, rowId: e };
}
function W2(e, t, i) {
	const u = rS(e);
	for (const l of e)
		for (let o = 0; o < u; o += 1) {
			const f = l[o];
			if (!f || (i && f.disabled)) {
				const h = o === 0 && i ? wi(l) : l[o - 1];
				l[o] = h && t !== h.id && i ? h : J2(h?.rowId);
			}
		}
	return e;
}
function ez(e) {
	const t = nS(e),
		i = rS(t),
		u = [];
	for (let l = 0; l < i; l += 1)
		for (const o of t) {
			const f = o[l];
			f && u.push({ ...f, rowId: f.rowId ? `${l}` : void 0 });
		}
	return u;
}
function iS(e = {}) {
	var t;
	const i = (t = e.store) == null ? void 0 : t.getState(),
		u = K2(e),
		l = je(e.activeId, i?.activeId, e.defaultActiveId),
		o = Dr(
			{
				...u.getState(),
				id: je(e.id, i?.id, `id-${Math.random().toString(36).slice(2, 8)}`),
				activeId: l,
				baseElement: je(i?.baseElement, null),
				includesBaseElement: je(e.includesBaseElement, i?.includesBaseElement, l === null),
				moves: je(i?.moves, 0),
				orientation: je(e.orientation, i?.orientation, "both"),
				rtl: je(e.rtl, i?.rtl, !1),
				virtualFocus: je(e.virtualFocus, i?.virtualFocus, !1),
				focusLoop: je(e.focusLoop, i?.focusLoop, !1),
				focusWrap: je(e.focusWrap, i?.focusWrap, !1),
				focusShift: je(e.focusShift, i?.focusShift, !1),
			},
			u,
			e.store,
		);
	$n(o, () =>
		Mn(o, ["renderedItems", "activeId"], (h) => {
			o.setState("activeId", (m) => {
				var v;
				return m !== void 0 ? m : (v = wi(h.renderedItems)) == null ? void 0 : v.id;
			});
		}),
	);
	const f = (h = "next", m = {}) => {
		var v, g;
		const _ = o.getState(),
			{
				skip: p = 0,
				activeId: w = _.activeId,
				focusShift: x = _.focusShift,
				focusLoop: R = _.focusLoop,
				focusWrap: z = _.focusWrap,
				includesBaseElement: I = _.includesBaseElement,
				renderedItems: j = _.renderedItems,
				rtl: N = _.rtl,
			} = m,
			C = h === "up" || h === "down",
			q = h === "next" || h === "down",
			J = q ? N && !C : !N || C,
			G = x && !p;
		let k = C ? y_(W2(nS(j), w, G)) : j;
		if (((k = J ? qh(k) : k), (k = C ? ez(k) : k), w == null)) return (v = wi(k)) == null ? void 0 : v.id;
		const $ = k.find((P) => P.id === w);
		if (!$) return (g = wi(k)) == null ? void 0 : g.id;
		const B = k.some((P) => P.rowId),
			Q = k.indexOf($),
			oe = k.slice(Q + 1),
			le = Dp(oe, $.rowId);
		if (p) {
			const P = G2(le, w),
				ve = P.slice(p)[0] || P[P.length - 1];
			return ve?.id;
		}
		const te = R && (C ? R !== "horizontal" : R !== "vertical"),
			ne = B && z && (C ? z !== "horizontal" : z !== "vertical"),
			O = q ? (!B || C) && te && I : C ? I : !1;
		if (te) {
			const P = wi(X2(ne && !O ? k : Dp(k, $.rowId), w, O), w);
			return P?.id;
		}
		if (ne) {
			const P = wi(O ? le : oe, w);
			return O ? P?.id || null : P?.id;
		}
		const V = wi(le, w);
		return !V && O ? null : V?.id;
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
			return (h = wi(o.getState().renderedItems)) == null ? void 0 : h.id;
		},
		last: () => {
			var h;
			return (h = wi(qh(o.getState().renderedItems))) == null ? void 0 : h.id;
		},
		next: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("next", h)),
		previous: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("previous", h)),
		down: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("down", h)),
		up: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("up", h)),
	};
}
function tz(e) {
	return { id: Oi(e.id), ...e };
}
function aS(e, t, i) {
	return (
		(e = Y2(e, t, i)),
		Ht(e, i, "activeId", "setActiveId"),
		Ht(e, i, "includesBaseElement"),
		Ht(e, i, "virtualFocus"),
		Ht(e, i, "orientation"),
		Ht(e, i, "rtl"),
		Ht(e, i, "focusLoop"),
		Ht(e, i, "focusWrap"),
		Ht(e, i, "focusShift"),
		e
	);
}
var nz = xc() && u_();
function rz({ tag: e, ...t } = {}) {
	const i = jc(t.store, S_(e, ["value", "rtl"]));
	const u = e?.getState(),
		l = i?.getState(),
		o = je(t.activeId, l?.activeId, t.defaultActiveId, null),
		f = iS({
			...t,
			activeId: o,
			includesBaseElement: je(t.includesBaseElement, l?.includesBaseElement, !0),
			orientation: je(t.orientation, l?.orientation, "vertical"),
			focusLoop: je(t.focusLoop, l?.focusLoop, !0),
			focusWrap: je(t.focusWrap, l?.focusWrap, !0),
			virtualFocus: je(t.virtualFocus, l?.virtualFocus, !0),
		}),
		h = eS({ ...t, placement: je(t.placement, l?.placement, "bottom-start") }),
		m = je(t.value, l?.value, t.defaultValue, ""),
		v = je(t.selectedValue, l?.selectedValue, u?.values, t.defaultSelectedValue, ""),
		g = Array.isArray(v),
		_ = {
			...f.getState(),
			...h.getState(),
			value: m,
			selectedValue: v,
			resetValueOnSelect: je(t.resetValueOnSelect, l?.resetValueOnSelect, g),
			resetValueOnHide: je(t.resetValueOnHide, l?.resetValueOnHide, g && !e),
			activeValue: l?.activeValue,
		},
		p = Dr(_, f, h, i);
	return (
		nz &&
			$n(p, () =>
				Mn(p, ["virtualFocus"], () => {
					p.setState("virtualFocus", !1);
				}),
			),
		$n(p, () => {
			if (e)
				return Fn(
					Mn(p, ["selectedValue"], (w) => {
						Array.isArray(w.selectedValue) && e.setValues(w.selectedValue);
					}),
					Mn(e, ["values"], (w) => {
						p.setState("selectedValue", w.values);
					}),
				);
		}),
		$n(p, () =>
			Mn(p, ["resetValueOnHide", "mounted"], (w) => {
				w.resetValueOnHide && (w.mounted || p.setState("value", m));
			}),
		),
		$n(p, () =>
			Mn(p, ["open"], (w) => {
				w.open || (p.setState("activeId", o), p.setState("moves", 0));
			}),
		),
		$n(p, () =>
			Mn(p, ["moves", "activeId"], (w, x) => {
				w.moves === x.moves && p.setState("activeValue", void 0);
			}),
		),
		$n(p, () =>
			fc(p, ["moves", "renderedItems"], (w, x) => {
				if (w.moves === x.moves) return;
				const { activeId: R } = p.getState(),
					z = f.item(R);
				p.setState("activeValue", z?.value);
			}),
		),
		{
			...h,
			...f,
			...p,
			tag: e,
			setValue: (w) => p.setState("value", w),
			resetValue: () => p.setState("value", _.value),
			setSelectedValue: (w) => p.setState("selectedValue", w),
		}
	);
}
function iz(e) {
	const t = H2();
	return ((e = { ...e, tag: e.tag !== void 0 ? e.tag : t }), tz(e));
}
function az(e, t, i) {
	return (
		es(t, [i.tag]),
		Ht(e, i, "value", "setValue"),
		Ht(e, i, "selectedValue", "setSelectedValue"),
		Ht(e, i, "resetValueOnHide"),
		Ht(e, i, "resetValueOnSelect"),
		Object.assign(aS(tS(e, t, i), t, i), { tag: i.tag })
	);
}
function uz(e = {}) {
	e = iz(e);
	const [t, i] = qc(rz, e);
	return az(t, i, e);
}
var sz = "hr",
	uS = et(function ({ orientation: t = "horizontal", ...i }) {
		return ((i = { role: "separator", "aria-orientation": t, ...i }), i);
	}),
	yj = Ke(function (t) {
		return Xe(sz, uS(t));
	}),
	lz = "hr",
	sS = et(function ({ store: t, ...i }) {
		const u = Rc();
		((t = t || u), Pt(t, !1));
		const l = t.useState((o) => (o.orientation === "horizontal" ? "vertical" : "horizontal"));
		return ((i = uS({ ...i, orientation: l })), i);
	}),
	pj = Ke(function (t) {
		return Xe(lz, sS(t));
	}),
	Vh =
		'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function jp(e) {
	const t = e.querySelector("[data-dialog-initial]");
	return t?.matches(Vh) ? t : (e.querySelector(Vh) ?? e);
}
function rs(e) {
	const t = (0, b.useRef)(null);
	((0, b.useEffect)(() => {
		const u = document.activeElement instanceof HTMLElement ? document.activeElement : null,
			l = t.current;
		return (
			(l === null ? null : jp(l))?.focus(),
			() => {
				u?.focus();
			}
		);
	}, []),
		(0, b.useEffect)(() => {
			const u = t.current;
			if (!u) return;
			const l = () => {
					!u.isConnected || document.activeElement !== document.body || jp(u).focus();
				},
				o = () => queueMicrotask(l);
			return (u.addEventListener("focusout", o), () => u.removeEventListener("focusout", o));
		}, []));
	const i = (u) => {
		if (u.key === "Escape") {
			(u.stopPropagation(), e.onClose());
			return;
		}
		if (u.key !== "Tab") return;
		const l = t.current;
		if (!l) return;
		const o = [...l.querySelectorAll(Vh)];
		if (o.length === 0) {
			(u.preventDefault(), l.focus());
			return;
		}
		const f = o[0],
			h = o[o.length - 1];
		document.activeElement === l
			? (u.preventDefault(), (u.shiftKey ? h : f).focus())
			: u.shiftKey && document.activeElement === f
				? (u.preventDefault(), h.focus())
				: !u.shiftKey && document.activeElement === h && (u.preventDefault(), f.focus());
	};
	return (0, S.jsx)("div", {
		className: "dialog-overlay",
		children: (0, S.jsx)("div", {
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
function lS(e) {
	const [t, i] = (0, b.useState)([]),
		u = (0, b.useRef)(new Map()),
		l = (0, b.useRef)(e.onRequestSettled);
	l.current = e.onRequestSettled;
	const o = (v) => {
		v.settled ||
			v.cancelled ||
			((v.settled = !0),
			v.retryTimer !== null && (clearTimeout(v.retryTimer), (v.retryTimer = null)),
			u.current.get(v.clientRequestId) === v && u.current.delete(v.clientRequestId),
			l.current());
	};
	(0, b.useEffect)(
		() => () => {
			for (const v of u.current.values())
				((v.cancelled = !0),
					v.retryTimer !== null && clearTimeout(v.retryTimer),
					v.settled || ((v.settled = !0), l.current()));
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
			_ = { clientRequestId: v.clientRequestId, retryDelayMs: oz, retryTimer: null, settled: !1, cancelled: !1 };
		(u.current.set(v.clientRequestId, _), e.onRequestStart());
		const p = (z, I = !1) => {
				u.current.get(v.clientRequestId) !== _ ||
					_.cancelled ||
					(I && e.onStorageFull(z),
					i((j) =>
						j.map((N) =>
							N.clientRequestId === v.clientRequestId ? { ...N, status: "failed", errorMessage: I ? null : z } : N,
						),
					),
					o(_));
			},
			w = e.keyPrefix.slice(0, -1),
			x = {
				...(e.collection === "messages" ? { channelKey: w } : { rootMessageKey: w }),
				text: v.text,
				attachments: v.attachments,
				mentions: v.mentions,
				authorName: e.getAuthorName(),
				clientRequestId: v.clientRequestId,
			},
			R = () => {
				if (!(u.current.get(v.clientRequestId) !== _ || _.cancelled)) {
					if (Fk(x)) {
						p(Kk);
						return;
					}
					try {
						Za(e.client, e.collection === "messages" ? "message-send" : "reply-send", x).then(
							(z) => {
								if (u.current.get(v.clientRequestId) !== _ || _.cancelled) return;
								if ("_nay" in z) {
									if (z._nay.name === "unavailable") {
										const N = _.retryDelayMs;
										_.retryTimer = setTimeout(() => {
											((_.retryTimer = null), (_.retryDelayMs = Math.min(N * 2, cz)), R());
										}, N);
										return;
									}
									p(z._nay.message, z._nay.name === "storage_full");
									return;
								}
								const I = z._yay.messageKey;
								if (typeof I != "string") {
									p("The Chitchat backend answered without a message key");
									return;
								}
								i((N) => N.filter((C) => C.clientRequestId !== v.clientRequestId));
								const j = Qa(I) ?? Date.now();
								(e.onDelivered({
									key: I,
									value: g,
									revision: 0,
									createdBy: e.userId,
									updatedBy: e.userId,
									createdAt: j,
									updatedAt: j,
									timestamp: j,
								}),
									o(_));
							},
							(z) => {
								p(Un(z));
							},
						);
					} catch (z) {
						p(Un(z));
					}
				}
			};
		R();
	};
	return {
		pending: t,
		send: (v, g, _) => {
			const p = crypto.randomUUID();
			(i((w) => [
				...w,
				{ clientRequestId: p, text: v, attachments: g, mentions: _, status: "sending", errorMessage: null },
			]),
				f({ clientRequestId: p, text: v, attachments: g, mentions: _ }));
		},
		retry: (v) => {
			(i((g) =>
				g.map((_) => (_.clientRequestId === v.clientRequestId ? { ..._, status: "sending", errorMessage: null } : _)),
			),
				f(v));
		},
		busy: t.some((v) => v.status === "sending"),
	};
}
var fz = ["image/", "video/", "audio/", "application/", "text/"],
	qp = 20;
function dz(e) {
	const [t, i] = (0, b.useState)(new Map()),
		[u, l] = (0, b.useState)(!1),
		[o, f] = (0, b.useState)(null),
		h = (0, b.useRef)(new Map()),
		m = (0, b.useRef)(null);
	(0, b.useEffect)(() => {
		const g = m.current;
		if (g === null) return;
		const _ = h.current.get(g);
		_ && ((m.current = null), _.focus());
	}, [t]);
	const v = (g) => {
		((m.current = g),
			l(!0),
			f(null),
			(async () => {
				const _ = new Map(t);
				for (let p = 0; p < e.attachments.length; p += qp) {
					const w = e.attachments.slice(p, p + qp),
						x = await e.client.fetchJson("/api/v1/files/download-urls", {
							body: { fileNodeIds: w.map((z) => z.fileNodeId) },
						}),
						R = $k.safeParse(x);
					if (!R.success) throw new Error("Unexpected response for the download links");
					for (const z of R.data.items) _.set(z.fileNodeId, { kind: "ready", url: z.url });
					for (const z of R.data.errors) _.set(z.fileNodeId, { kind: "error", message: z.message });
				}
				return _;
			})()
				.then((_) => {
					(l(!1), i(_));
				})
				.catch((_) => {
					(l(!1), (m.current = null), f(Un(_)));
				}));
	};
	return (0, S.jsxs)("div", {
		className: "message-attachments",
		children: [
			e.attachments.map((g) => {
				const _ = t.get(g.fileNodeId);
				return _?.kind === "ready"
					? (0, S.jsxs)(
							"span",
							{
								className: "attachment",
								children: [
									(0, S.jsx)("a", {
										ref: (p) => {
											p === null ? h.current.delete(g.fileNodeId) : h.current.set(g.fileNodeId, p);
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
function hz(e) {
	const t = (0, b.useId)(),
		[i, u] = (0, b.useState)([]),
		[l, o] = (0, b.useState)(null),
		[f, h] = (0, b.useState)(!1),
		[m, v] = (0, b.useState)(!1),
		[g, _] = (0, b.useState)(null),
		p = (0, b.useRef)(new Set()),
		w = (0, b.useRef)(!1),
		x = () => {
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
							contentTypePrefixes: fz,
							cursor: l,
						},
					})
					.then((R) => {
						v(!1);
						const z = Lk.safeParse(R);
						if (!z.success) {
							_("Unexpected response from the file list");
							return;
						}
						const I = z.data.items.filter((j) => !p.current.has(j.nodeId));
						for (const j of I) p.current.add(j.nodeId);
						(u((j) => [...j, ...I]), o(z.data.cursor), h(z.data.isDone));
					})
					.catch((R) => {
						(v(!1), _(Un(R)));
					}));
		};
	return (
		(0, b.useEffect)(() => {
			w.current || ((w.current = !0), x());
		}, []),
		(0, S.jsxs)(rs, {
			labelledBy: t,
			onClose: e.onClose,
			children: [
				(0, S.jsx)("h2", { id: t, className: "dialog-title", children: "Attach a file" }),
				(0, S.jsx)("button", {
					type: "button",
					className: "button",
					"data-dialog-initial": !0,
					onClick: e.onClose,
					children: "Cancel",
				}),
				i.length > 0
					? (0, S.jsx)("ul", {
							className: "picker-list",
							children: i.map((R) =>
								(0, S.jsx)(
									"li",
									{
										children: (0, S.jsxs)("button", {
											type: "button",
											className: "picker-item",
											onClick: () => e.onPick({ fileNodeId: R.nodeId, name: R.name }),
											children: [
												(0, S.jsx)("span", { className: "picker-item-name", children: R.name }),
												(0, S.jsx)("span", { className: "picker-item-path", children: R.path }),
											],
										}),
									},
									R.nodeId,
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
								(0, S.jsx)("button", { type: "button", className: "button", onClick: x, children: "Retry" }),
							],
						})
					: null,
				!m && g === null && i.length === 0 && f
					? (0, S.jsx)("div", { className: "channel-status", children: "No files found." })
					: null,
				!f && !m && g === null
					? (0, S.jsx)("button", { type: "button", className: "button", onClick: x, children: "Load more" })
					: null,
			],
		})
	);
}
var mz = 8,
	vz = 100,
	gz = 10,
	Zh = new WeakMap(),
	fh = new WeakMap();
function yz(e) {
	const t = Zh.get(e);
	if (t !== void 0) return Promise.resolve(t);
	const i = fh.get(e);
	if (i !== void 0) return i;
	const u = pz(e).then((l) => (l.status === "ready" && Zh.set(e, l), fh.delete(e), l));
	return (fh.set(e, u), u);
}
async function pz(e) {
	const t = [];
	let i;
	for (let u = 0; u < gz; u += 1) {
		const l = await Xb(e, { limit: vz, ...(i === void 0 ? {} : { cursor: i }) });
		if ("_nay" in l) return { status: "refused", name: l._nay.name };
		if ((t.push(...l._yay.members), l._yay.cursor === null)) return { status: "ready", members: t };
		i = l._yay.cursor;
	}
	return { status: "ready", members: t };
}
function Ip(e) {
	return `mention:${e}`;
}
function oS(e) {
	const t = (0, b.useId)(),
		[i, u] = (0, b.useState)(""),
		[l, o] = (0, b.useState)([]),
		[f, h] = (0, b.useState)(!1),
		[m, v] = (0, b.useState)(null),
		[g, _] = (0, b.useState)(null),
		p = (0, b.useRef)(new Map()),
		w = (0, b.useRef)(null),
		x = (0, b.useRef)(null),
		R = uz({
			placement: "top-start",
			resetValueOnHide: !1,
			setOpen: (k) => {
				k || _(null);
			},
		}),
		z = e.client.context.userId,
		I =
			g !== null && m !== null && m !== "loading" && m.status === "ready" ? Ak(m.members, g.query, z).slice(0, mz) : [],
		j = g !== null && (m === "loading" || (m !== null && m.status === "refused") || I.length > 0),
		N = () => {
			if (m !== null) return;
			const k = Zh.get(e.client);
			if (k !== void 0) {
				v(k);
				return;
			}
			(v("loading"), yz(e.client).then(v));
		},
		C = (k) => {
			if (g === null) return;
			const $ = w.current?.selectionStart ?? i.length,
				B = Rk(i, g.start, $, k.label);
			(p.current.set(k.userId, k.label), u(B.text), _(null), (x.current = B.caret), R.hide(), R.setValue(""));
		},
		q = () => {
			if (e.busy || e.disabled) return;
			const k = i.trim();
			if (k === "" && l.length === 0) return;
			const $ = Ck(p.current, k);
			(e.onSend(k, l, $), u(""), o([]), _(null), p.current.clear(), R.hide());
		},
		J = (k) => {
			const $ = k.currentTarget.value,
				B = k.currentTarget.selectionStart ?? $.length;
			u($);
			const Q = xk($, B);
			if ((_(Q), R.setValue(Q?.query ?? ""), Q === null)) {
				R.hide();
				return;
			}
			N();
		},
		G = (k) => {
			if (j) {
				if (k.key === "ArrowLeft" || k.key === "ArrowRight") {
					R.hide();
					return;
				}
				if (k.key === "Escape") {
					(k.preventDefault(), k.stopPropagation(), _(null), R.hide());
					return;
				}
				if ((k.key === "Enter" || k.key === "Tab") && !k.shiftKey && I.length > 0) {
					k.preventDefault();
					const $ = R.getState().activeId,
						B = I.find((Q) => Ip(Q.userId) === $) ?? I[0];
					C(B);
					return;
				}
			}
			k.key === "Enter" && !k.shiftKey && (k.preventDefault(), q());
		};
	return (
		(0, b.useLayoutEffect)(() => {
			R.setOpen(j);
		}, [R, j]),
		(0, b.useLayoutEffect)(() => {
			const k = x.current;
			if (k === null) return;
			x.current = null;
			const $ = w.current;
			$ !== null && ($.focus(), $.setSelectionRange(k, k));
		}, [i]),
		(0, b.useEffect)(() => {
			R.render();
		}, [R, i]),
		(0, S.jsxs)("div", {
			className: "composer",
			children: [
				l.length > 0
					? (0, S.jsx)("ul", {
							className: "composer-attachments",
							children: l.map((k) =>
								(0, S.jsxs)(
									"li",
									{
										className: "composer-attachment",
										children: [
											(0, S.jsx)("span", { children: k.name }),
											(0, S.jsx)("button", {
												type: "button",
												className: "composer-attachment-remove",
												"aria-label": `Remove attachment ${k.name}`,
												onClick: () => o(($) => $.filter((B) => B.fileNodeId !== k.fileNodeId)),
												children: "×",
											}),
										],
									},
									k.fileNodeId,
								),
							),
						})
					: null,
				(0, S.jsxs)("div", {
					className: "composer-bar",
					children: [
						(0, S.jsx)(NN, {
							store: R,
							autoSelect: !0,
							value: i,
							showOnClick: !1,
							showOnChange: !1,
							showOnKeyPress: !1,
							setValueOnChange: !1,
							render: (0, S.jsx)("textarea", {
								ref: w,
								className: "composer-input",
								"aria-label": e.label,
								"aria-describedby": t,
								placeholder: e.label,
								rows: 1,
								onChange: J,
								onKeyDown: G,
								onPointerDown: R.hide,
								onScroll: R.render,
							}),
						}),
						(0, S.jsx)("button", {
							type: "button",
							className: "composer-action",
							"aria-label": "Attach file",
							disabled: e.disabled,
							onClick: () => h(!0),
							children: (0, S.jsx)(sM, { size: 18, "aria-hidden": "true" }),
						}),
						(0, S.jsx)("button", {
							type: "button",
							className: "composer-action composer-send",
							"aria-label": e.busy ? "Sending…" : "Send",
							disabled: e.busy || e.disabled,
							onClick: q,
							children: (0, S.jsx)(rM, { size: 18, "aria-hidden": "true" }),
						}),
					],
				}),
				(0, S.jsxs)(Z2, {
					store: R,
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					fitViewport: !0,
					hidden: !j,
					getAnchorRect: () => {
						const k = w.current;
						return k === null ? null : k.getBoundingClientRect();
					},
					className: "mention-menu",
					"aria-label": "Mention somebody",
					children: [
						m === "loading"
							? (0, S.jsx)("div", { className: "mention-menu-status", role: "status", children: "Loading people…" })
							: null,
						m !== null && m !== "loading" && m.status === "refused"
							? (0, S.jsx)("div", { className: "mention-menu-status", role: "status", children: Gb(m.name) })
							: null,
						I.map((k) =>
							(0, S.jsx)(
								WN,
								{
									id: Ip(k.userId),
									value: k.label,
									setValueOnClick: !1,
									focusOnHover: !0,
									className: "mention-option",
									onMouseDown: ($) => {
										$.preventDefault();
									},
									onClick: () => C(k),
									children: k.label,
								},
								k.userId,
							),
						),
					],
				}),
				(0, S.jsx)("span", { id: t, className: "composer-hint", children: "Enter sends · Shift+Enter for a new line" }),
				f
					? (0, S.jsx)(hz, {
							client: e.client,
							onPick: (k) => {
								(o(($) => ($.some((B) => B.fileNodeId === k.fileNodeId) ? $ : [...$, k])), h(!1));
							},
							onClose: () => h(!1),
						})
					: null,
			],
		})
	);
}
function bz(e) {
	const [t, i] = (0, b.useState)(!1),
		u = (0, b.useRef)(null),
		l = (0, b.useRef)([]);
	(0, b.useEffect)(() => {
		t && l.current[0]?.focus();
	}, [t]);
	const o = () => {
			(i(!1), u.current?.focus());
		},
		f = (h, m) => {
			h.key === "Escape"
				? (h.preventDefault(), o())
				: h.key === "ArrowRight" || h.key === "ArrowDown"
					? (h.preventDefault(), l.current[(m + 1) % Bu.length]?.focus())
					: (h.key === "ArrowLeft" || h.key === "ArrowUp") &&
						(h.preventDefault(), l.current[(m + Bu.length - 1) % Bu.length]?.focus());
		};
	return (0, S.jsxs)("span", {
		className: "add-reaction",
		children: [
			(0, S.jsx)("button", {
				ref: u,
				type: "button",
				className: "button message-action",
				"aria-expanded": t,
				onClick: () => (t ? o() : i(!0)),
				children: "Add reaction",
			}),
			t
				? (0, S.jsx)("span", {
						className: "reaction-palette",
						role: "group",
						"aria-label": "Choose a reaction",
						children: Bu.map((h, m) => {
							const v = e.groups.find((g) => g.token === h)?.reactedByMe ?? !1;
							return (0, S.jsx)(
								"button",
								{
									ref: (g) => {
										l.current[m] = g;
									},
									type: "button",
									className: "reaction-palette-item",
									"aria-pressed": v,
									"aria-label": Kb[h],
									onKeyDown: (g) => f(g, m),
									onClick: () => {
										(e.onPick(h, v), o());
									},
									children: (0, S.jsx)("span", { "aria-hidden": "true", children: Qb[h] }),
								},
								h,
							);
						}),
					})
				: null,
		],
	});
}
var cS = 1440 * 60 * 1e3,
	_z = 300 * 1e3;
function Sz(e) {
	return new Date(e).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" });
}
function Hh(e) {
	return new Date(e).toLocaleDateString(void 0, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}
function wz(e, t) {
	const i = new Date(e).toDateString();
	return i === new Date(t).toDateString() ? "Today" : i === new Date(t - cS).toDateString() ? "Yesterday" : Hh(e);
}
function Ez(e) {
	if (e == null) return "•";
	const t = e.split(/\s+/u).filter((u) => u !== "");
	if (t.length === 0) return "•";
	const i = t.length > 1 ? t[t.length - 1][0] : "";
	return `${t[0][0]}${i}`.toUpperCase();
}
function fS(e, t, i = null) {
	const u = [];
	let l = null,
		o = !1;
	for (const f of e) {
		const h = l !== null && new Date(l.timestamp).toDateString() !== new Date(f.timestamp).toDateString();
		h && u.push({ kind: "divider", key: `divider:${f.key}`, label: wz(f.timestamp, t) });
		const m =
			!o && i !== null && f.timestamp > i.lastReadAt && f.createdBy !== i.selfUserId && f.value.deletedAt === null;
		m && ((o = !0), u.push({ kind: "new", key: `new:${f.key}` }));
		const v = l !== null && !h && !m && l.createdBy === f.createdBy && f.timestamp - l.timestamp <= _z;
		(u.push({ kind: "message", doc: f, isContinuation: v }), (l = f));
	}
	return u;
}
function Tz(e, t, i) {
	const u = e.mentions ?? [];
	if (u.length === 0) return e.text;
	const l = u
		.map((h) => ({ id: h, name: t.get(h) }))
		.filter((h) => typeof h.name == "string" && h.name !== "")
		.sort((h, m) => m.name.length - h.name.length);
	if (l.length === 0) return e.text;
	const o = [];
	let f = e.text;
	for (; f !== ""; ) {
		let h = null;
		for (const m of l) {
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
			: (0, S.jsxs)("span", { className: h.id === i ? "mention mention-self" : "mention", children: ["@", h.name] }, m),
	);
}
function Ph(e) {
	const { client: t, collection: i, doc: u, isOwn: l } = e,
		o = u.value.deletedAt !== null,
		f = (0, b.useId)(),
		[h, m] = (0, b.useState)(!1),
		[v, g] = (0, b.useState)(""),
		[_, p] = (0, b.useState)(!1),
		[w, x] = (0, b.useState)(!1),
		[R, z] = (0, b.useState)(null),
		[I, j] = (0, b.useState)(!1),
		N = (0, b.useRef)(null),
		C = (0, b.useRef)(null),
		q = (0, b.useRef)(null),
		J = (0, b.useRef)(!1),
		G = (0, b.useRef)(null),
		k = (0, b.useRef)(null),
		$ = (0, b.useRef)(e.onRequestSettled);
	(($.current = e.onRequestSettled),
		(0, b.useEffect)(() => {
			h && N.current?.focus();
		}, [h]),
		(0, b.useEffect)(() => {
			const L = G.current;
			if (L === null) return;
			const se = L === "edit" ? C.current : q.current;
			se !== null && ((G.current = null), se.focus());
		}, [h, I, o]));
	const B = (L) => {
			L.settled || ((L.settled = !0), (L.cancelled = !0), k.current === L && (k.current = null), $.current());
		},
		Q = (L) => {
			(B(L), p(!1), x(!1), z(null), L.onDone());
		},
		oe = (L) => {
			if (k.current !== L || L.running || L.cancelled) return;
			((L.running = !0), p(!0), x(!1), z(null));
			const se = (he) => {
					k.current !== L || L.cancelled || ((L.running = !1), (L.uncertain = !0), p(!1), x(!0), z(he));
				},
				ce = L.value.deletedAt !== null && u.value.deletedAt === null;
			try {
				Za(
					t,
					ce ? "message-delete" : "message-edit",
					ce ? { messageKey: u.key } : { messageKey: u.key, text: L.value.text, mentions: L.value.mentions ?? [] },
				)
					.then((he) => {
						if (k.current !== L || L.cancelled) return;
						if (((L.running = !1), "_nay" in he)) {
							if (he._nay.name === "unavailable") {
								se(he._nay.message);
								return;
							}
							if (L.uncertain && he._nay.name === "conflict") {
								(p(!1), x(!0), z(he._nay.message));
								return;
							}
							if ((B(L), p(!1), x(!1), he._nay.name === "storage_full")) {
								e.onStorageFull(he._nay.message);
								return;
							}
							z(he._nay.message);
							return;
						}
						const we = typeof he._yay.revision == "number" ? he._yay.revision : u.revision;
						(e.onApplyLocal({ ...u, value: L.value, revision: we, updatedAt: Date.now() }), Q(L));
					})
					.catch((he) => {
						se(Un(he));
					});
			} catch (he) {
				se(Un(he));
			}
		},
		le = (L, se) => {
			if (k.current !== null) return;
			const ce = {
				value: L,
				expectedRevision: u.revision,
				onDone: se,
				running: !1,
				uncertain: !1,
				settled: !1,
				cancelled: !1,
			};
			((k.current = ce), e.onRequestStart(), oe(ce));
		},
		te = () => {
			const L = k.current;
			(L !== null && B(L), p(!1), x(!1), z(null));
		};
	((0, b.useEffect)(() => {
		o &&
			(h || I
				? (J.current && (G.current = "row"), m(!1), g(""), j(!1), p(!1), x(!1), z(null))
				: J.current && q.current?.focus());
	}, [o, h, I]),
		(0, b.useEffect)(() => {
			const L = k.current;
			if (!(L === null || L.cancelled || u.revision <= L.expectedRevision)) {
				if (u.value.deletedAt !== null && L.value.deletedAt === null) {
					(B(L), p(!1), x(!1), z(null));
					return;
				}
				if (
					L.value.deletedAt !== null
						? u.value.deletedAt !== null
						: u.value.text === L.value.text && u.value.editedAt !== null
				) {
					Q(L);
					return;
				}
				(B(L),
					p(!1),
					x(!1),
					z("Someone else changed this message while the request was pending. Review it and try again."));
			}
		}, [u.revision, u.value.deletedAt, u.value.editedAt, u.value.text]),
		(0, b.useEffect)(
			() => () => {
				const L = k.current;
				L !== null && B(L);
			},
			[],
		));
	const ne = () => {
			if (_) return;
			const L = k.current;
			if (L !== null) {
				oe(L);
				return;
			}
			const se = v.trim();
			se !== "" &&
				le({ ...u.value, text: se, editedAt: Date.now() }, () => {
					((G.current = "edit"), m(!1), g(""));
				});
		},
		O = () => {
			_ || (te(), (G.current = "edit"), m(!1), g(""));
		},
		V = () => {
			if (_) return;
			const L = k.current;
			if (L !== null) {
				oe(L);
				return;
			}
			le({ ...u.value, deletedAt: Date.now() }, () => {
				((G.current = "row"), j(!1));
			});
		},
		P = () => {
			_ || (te(), j(!1));
		},
		ve = (L, se) => {
			if ((z(null), !Array.isArray(e.reactionGroups) && se)) {
				z("Reactions on this message could not be loaded, so they can't be removed right now.");
				return;
			}
			const ce = se;
			Za(t, "reaction-toggle", { targetKey: u.key, token: L, on: !ce })
				.then((he) => {
					if ("_nay" in he) {
						if (he._nay.name === "storage_full") {
							e.onStorageFull(he._nay.message);
							return;
						}
						z(he._nay.message);
						return;
					}
					const we = typeof he._yay.key == "string" ? he._yay.key : `${u.key}:${L}:${e.selfUserId}`,
						pe = typeof he._yay.revision == "number" ? he._yay.revision : 0;
					e.onApplyReaction({
						key: we,
						targetKey: u.key,
						token: L,
						createdBy: e.selfUserId,
						revision: pe,
						updatedAt: Date.now(),
						removed: ce,
					});
				})
				.catch((he) => {
					z(Un(he));
				});
		},
		ye = e.authorName === null ? "Former member" : (e.authorName ?? "…"),
		Be = Date.now() - u.timestamp < 7 * cS,
		M = e.onOpenThread !== null && typeof e.replyCount == "number" && e.replyCount > 0;
	return (0, S.jsxs)("li", {
		ref: q,
		className: e.isContinuation ? "message is-continuation" : "message is-leader",
		"data-key": u.key,
		tabIndex: -1,
		onFocusCapture: () => {
			J.current = !0;
		},
		onBlurCapture: (L) => {
			L.relatedTarget instanceof Node && (J.current = L.currentTarget.contains(L.relatedTarget));
		},
		children: [
			(0, S.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: Ez(e.authorName) }),
			(0, S.jsxs)("div", {
				className: e.isContinuation ? "message-head visually-hidden" : "message-head",
				children: [
					(0, S.jsx)("span", { className: "message-author", children: ye }),
					(0, S.jsxs)("time", {
						className: "message-time",
						dateTime: new Date(u.timestamp).toISOString(),
						children: [
							Be ? (0, S.jsxs)("span", { className: "visually-hidden", children: [Hh(u.timestamp), " "] }) : null,
							(0, S.jsx)("span", { className: "message-clock", children: Be ? Sz(u.timestamp) : Hh(u.timestamp) }),
						],
					}),
				],
			}),
			o
				? (0, S.jsx)("p", { className: "message-text is-deleted", children: "Message deleted" })
				: h
					? (0, S.jsxs)("div", {
							className: "message-edit",
							children: [
								(0, S.jsx)("textarea", {
									ref: N,
									className: "composer-input",
									"aria-label": "Edit message",
									rows: 2,
									value: v,
									readOnly: _ || w,
									onInput: (L) => g(L.currentTarget.value),
									onKeyDown: (L) => {
										L.key === "Escape"
											? (L.preventDefault(), O())
											: L.key === "Enter" && !L.shiftKey && (L.preventDefault(), ne());
									},
								}),
								(0, S.jsxs)("div", {
									className: "message-edit-actions",
									children: [
										(0, S.jsx)("button", {
											type: "button",
											className: "button",
											disabled: _,
											onClick: O,
											children: "Cancel",
										}),
										(0, S.jsx)("button", {
											type: "button",
											className: "button button-primary",
											disabled: _,
											onClick: ne,
											children: _ ? "Saving…" : w ? "Retry" : "Save",
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
										Tz(u.value, e.memberNames, e.selfUserId),
										u.value.editedAt !== null
											? (0, S.jsx)("span", { className: "message-edited", children: " (edited)" })
											: null,
									],
								}),
								u.value.attachments.length > 0 ? (0, S.jsx)(dz, { client: t, attachments: u.value.attachments }) : null,
								e.reactionGroups === "unknown"
									? (0, S.jsx)("div", { className: "message-reactions-unknown", children: "Reactions unavailable" })
									: Array.isArray(e.reactionGroups) && e.reactionGroups.length > 0
										? (0, S.jsx)("div", {
												className: "message-reactions",
												children: e.reactionGroups.map((L) =>
													(0, S.jsxs)(
														"button",
														{
															type: "button",
															className: L.reactedByMe ? "reaction-chip is-mine" : "reaction-chip",
															"aria-pressed": L.reactedByMe,
															"aria-label": `${Kb[L.token]}, ${L.count} ${L.count === 1 ? "reaction" : "reactions"}`,
															onClick: () => ve(L.token, L.reactedByMe),
															children: [
																(0, S.jsx)("span", { "aria-hidden": "true", children: Qb[L.token] }),
																(0, S.jsx)("span", { className: "reaction-chip-count", children: L.count }),
															],
														},
														L.token,
													),
												),
											})
										: null,
								M && typeof e.replyCount == "number"
									? (0, S.jsxs)("button", {
											ref: e.replyTriggerRef ?? void 0,
											type: "button",
											className: "message-thread-summary",
											disabled: e.threadDisabled,
											onClick: () => e.onOpenThread?.(u),
											children: [
												(0, S.jsx)("span", {
													className: "message-thread-summary-icon",
													"aria-hidden": "true",
													children: "↳",
												}),
												(0, S.jsx)("span", {
													className: "message-thread-summary-count",
													children: `${Zk(e.replyCount, e.repliesHasMore)} ${e.replyCount === 1 ? "reply" : "replies"}`,
												}),
												e.replyLatestAt !== null
													? (0, S.jsx)("span", {
															className: "message-thread-summary-recency",
															children: `Last reply ${wc(e.replyLatestAt, Date.now())}`,
														})
													: null,
											],
										})
									: null,
							],
						}),
			!o && !h
				? (0, S.jsxs)("div", {
						className: "message-actions",
						children: [
							e.onOpenThread !== null && e.replyCount !== null && !M
								? (0, S.jsx)("button", {
										ref: e.replyTriggerRef ?? void 0,
										type: "button",
										className: "button message-action",
										disabled: e.threadDisabled,
										onClick: () => e.onOpenThread?.(u),
										children: e.replyCount === "unknown" ? "View thread" : "Reply in thread",
									})
								: null,
							(0, S.jsx)(bz, { groups: Array.isArray(e.reactionGroups) ? e.reactionGroups : [], onPick: ve }),
							l
								? (0, S.jsxs)(S.Fragment, {
										children: [
											(0, S.jsx)("button", {
												ref: C,
												type: "button",
												className: "button message-action",
												onClick: () => {
													(g(u.value.text), m(!0));
												},
												children: "Edit",
											}),
											(0, S.jsx)("button", {
												type: "button",
												className: "button message-action button-danger",
												onClick: () => j(!0),
												children: "Delete",
											}),
										],
									})
								: null,
						],
					})
				: null,
			R !== null && !I ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: R }) : null,
			I
				? (0, S.jsxs)(rs, {
						labelledBy: f,
						onClose: P,
						children: [
							(0, S.jsx)("h2", { id: f, className: "dialog-title", children: "Delete message?" }),
							(0, S.jsx)("p", { children: 'The message is replaced by a "Message deleted" placeholder for everyone.' }),
							R !== null ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: R }) : null,
							(0, S.jsxs)("div", {
								className: "dialog-actions",
								children: [
									(0, S.jsx)("button", {
										type: "button",
										className: "button",
										"data-dialog-initial": !0,
										disabled: _,
										onClick: P,
										children: "Cancel",
									}),
									(0, S.jsx)("button", {
										type: "button",
										className: "button button-danger",
										disabled: _,
										onClick: V,
										children: _ ? "Deleting…" : w ? "Retry delete" : "Delete message",
									}),
								],
							}),
						],
					})
				: null,
		],
	});
}
function dS(e) {
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
				? (0, S.jsx)("p", { className: "message-text", children: e.pending.attachments.map((t) => t.name).join(", ") })
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
function dh(e, t) {
	return Date.now() >= e.session.expiresAt()
		? `This Chitchat session expired, so ${t} stopped updating. Reload the page to continue.`
		: `Chitchat can no longer read ${t}. Reload the page to try again.`;
}
function xz(e) {
	const { client: t, userId: i, root: u, memberNames: l, replies: o, repliesLoaded: f } = e,
		h = (0, b.useRef)(null);
	(0, b.useEffect)(() => {
		h.current?.focus();
	}, []);
	const m = lS({
		client: t,
		collection: "replies",
		keyPrefix: Fb(u.key),
		userId: i,
		getAuthorName: () => l.get(i) ?? null,
		onDelivered: (_) => {
			e.onApplyLocalReply(_);
		},
		onRequestStart: e.onRequestStart,
		onRequestSettled: e.onRequestSettled,
		onStorageFull: e.onStorageFull,
	});
	(0, b.useEffect)(() => {
		const _ = new Set();
		for (const p of o) {
			_.add(p.createdBy);
			for (const w of p.value.mentions ?? []) _.add(w);
		}
		_.size > 0 && l.resolve([..._]);
	}, [o, l]);
	const v = (_) => {
			if (_.key === "Escape") {
				if ((_.stopPropagation(), e.sendInFlight)) {
					e.announce("Wait for pending message changes to finish before closing the thread.");
					return;
				}
				e.onClose();
			}
		},
		g = fS([...o].reverse(), Date.now());
	return (0, S.jsxs)("section", {
		className: "thread",
		"aria-label": "Thread",
		tabIndex: -1,
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
						disabled: e.sendInFlight,
						onClick: e.onClose,
						children: e.isNarrow ? "Back to messages" : "Close thread",
					}),
				],
			}),
			(0, S.jsx)("ul", {
				className: "message-list thread-root",
				children: (0, S.jsx)(Ph, {
					client: t,
					collection: "messages",
					doc: u,
					isOwn: u.createdBy === i,
					selfUserId: i,
					memberNames: l,
					isContinuation: !1,
					authorName: l.get(u.createdBy),
					reactionGroups: Qh(e.reactionCoverage, e.reactionGroupsByTarget, u.key),
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
				? (0, S.jsx)("div", { className: "channel-status is-error", role: "alert", children: e.repliesError })
				: null,
			e.repliesTruncated
				? (0, S.jsx)("div", {
						className: "channel-status",
						role: "status",
						children: "Only the newest 100 replies are shown.",
					})
				: null,
			f ? null : (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading replies…" }),
			f && o.length === 0 && m.pending.length === 0
				? (0, S.jsx)("div", { className: "channel-status", children: "No replies yet" })
				: o.length > 0 || m.pending.length > 0
					? (0, S.jsxs)("ul", {
							className: "message-list thread-replies",
							children: [
								g.map((_) =>
									_.kind === "divider"
										? (0, S.jsx)("li", { className: "day-divider", children: _.label }, _.key)
										: _.kind === "new"
											? null
											: (0, S.jsx)(
													Ph,
													{
														client: t,
														collection: "replies",
														doc: _.doc,
														isOwn: _.doc.createdBy === i,
														selfUserId: i,
														memberNames: l,
														isContinuation: _.isContinuation,
														authorName: l.get(_.doc.createdBy),
														reactionGroups: Qh(e.reactionCoverage, e.reactionGroupsByTarget, _.doc.key),
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
													_.doc.key,
												),
								),
								m.pending.map((_) => (0, S.jsx)(dS, { pending: _, onRetry: () => m.retry(_) }, _.clientRequestId)),
							],
						})
					: null,
			e.storageFull !== null
				? (0, S.jsx)("div", { className: "channel-status is-error", role: "alert", children: e.storageFull })
				: null,
			(0, S.jsx)(oS, {
				client: t,
				label: "Reply in thread",
				busy: m.busy,
				disabled: e.storageFull !== null || e.repliesError !== null,
				onSend: m.send,
			}),
		],
	});
}
var Lp = { hasMore: !0, deepestRoot: null, incomplete: !1, dead: !1 };
function hS(e, t) {
	return e.incomplete || e.dead ? !1 : !e.hasMore || (e.deepestRoot !== null && t < e.deepestRoot);
}
var Up = 100,
	hh = 1e3,
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
function mh(e) {
	let t = null;
	for (const i of e) {
		if (typeof i != "object" || i === null) continue;
		const u = i.updatedAt;
		typeof u == "number" && Number.isFinite(u) && (t === null || u > t) && (t = u);
	}
	return t;
}
function vh(e) {
	return e.newest === null
		? null
		: e.truncated && e.newest === e.current
			? e.newest + 1
			: e.newest > e.current
				? e.newest
				: null;
}
function gh(e, t) {
	return e.filter((i) => {
		const u = Cz(i);
		return u !== null && u.startsWith(t);
	});
}
function $p(e, t) {
	return e.fetchJson("/api/v1/plugin-data/list", { body: t }).then((i) => {
		const u = Uk.safeParse(i);
		if (!u.success) throw new Error("Unexpected response from the document list");
		return u.data;
	});
}
function Qh(e, t, i) {
	if (e.incomplete || e.dead) return "unknown";
	const u = t.get(i);
	if (u !== void 0 && u.length > 0) return u;
	const l = oc(i);
	return l !== null && hS(e, l) ? (u ?? []) : "pending";
}
function kz(e, t, i) {
	if (e.incomplete || e.dead) return "unknown";
	const u = t.get(i);
	if (u !== void 0 && u.count > 0) return u.count;
	const l = oc(i);
	return l !== null && hS(e, l) ? (u?.count ?? 0) : "unknown";
}
var Bp = 420,
	Ko = 244,
	yh = 340,
	Vp = 16;
function Mz(e) {
	const {
			client: t,
			userId: i,
			channel: u,
			memberNames: l,
			announce: o,
			threadRootKey: f,
			setThreadRootKey: h,
			isNarrow: m,
			onRequestStart: v,
			onRequestSettled: g,
			sendInFlight: _,
			onNewestVisible: p,
			openedAtLastReadAt: w,
		} = e,
		[x, R] = (0, b.useState)([]),
		[z, I] = (0, b.useState)(!1),
		[j, N] = (0, b.useState)(!1),
		[C, q] = (0, b.useState)([]),
		[J, G] = (0, b.useState)([]),
		[k, $] = (0, b.useState)(Lp),
		[B, Q] = (0, b.useState)(Lp),
		[oe, le] = (0, b.useState)(null),
		[te, ne] = (0, b.useState)(yh),
		[O, V] = (0, b.useState)(0),
		[P, ve] = (0, b.useState)(null),
		[ye, Be] = (0, b.useState)(null),
		[M, L] = (0, b.useState)(null),
		[se, ce] = (0, b.useState)(!1),
		[he, we] = (0, b.useState)(!1),
		[pe, qe] = (0, b.useState)(null),
		Ie = (0, b.useRef)(null),
		st = (0, b.useRef)(null),
		Bt = (0, b.useRef)(null),
		bt = (0, b.useRef)(null),
		ct = (0, b.useRef)(null),
		yt = (0, b.useRef)(null),
		_e = (0, b.useRef)(null),
		Ae = (0, b.useRef)(null),
		Je = (0, b.useRef)(0),
		De = (0, b.useRef)({ reactions: null, replies: null }),
		wt = (0, b.useRef)({ reactions: !1, replies: !1 }),
		_t = (0, b.useRef)(0),
		fe = (0, b.useRef)({ reactions: { delayMs: hh, timer: null }, replies: { delayMs: hh, timer: null } }),
		Re = (0, b.useRef)(!1),
		St = (0, b.useRef)(!1),
		Ne = (0, b.useRef)(null),
		ft = (0, b.useRef)(u.value.name),
		Ot = (0, b.useRef)(null),
		rt = (0, b.useRef)(new Map()),
		Et = (0, b.useRef)(null),
		On = (0, b.useRef)(null),
		Xn = (0, b.useRef)(0),
		An = (0, b.useRef)(0),
		Kt = J0(u.key),
		Rn = vn(u.key) ? u.key : void 0,
		Ve = iT(
			t.api.plugins_data.watch_documents_page,
			{ collection: "messages", keyPrefix: Kt },
			{ initialNumItems: 100 },
		),
		cn = () => {
			((An.current += 1), v());
		},
		qt = () => {
			An.current !== 0 && ((An.current -= 1), g());
		};
	((0, b.useEffect)(() => {
		ft.current = u.value.name;
	}, [u.value.name]),
		(0, b.useEffect)(() => {
			Za(t, "reconcile", { channelKey: u.key }).catch(() => {});
		}, [t, u.key]));
	const jr = (W) => {
			const ge = st.current;
			ge !== null && (ge.apply_window(W), G(ge.get_sorted()));
		},
		zn = (W, ge, Me, Ye, Ue) => {
			const We = ge.at(-1),
				hn =
					We === void 0 ? null : W === "reactions" ? (We.targetKey === void 0 ? null : oc(We.targetKey)) : sl(We.key);
			Me.length > 0 && (De.current[W] = Me[Me.length - 1].key);
			const ut = {
				hasMore: Me.length === 0 ? !1 : !Ye,
				deepestRoot: hn ?? (W === "reactions" ? bt.current?.deepestRoot : ct.current?.deepestRoot) ?? null,
				incomplete: Ue,
				dead: (W === "reactions" ? bt.current?.dead : ct.current?.dead) ?? !1,
			};
			W === "reactions"
				? ((bt.current = ut), $(ut), Ue || gn("reactions"))
				: ((ct.current = ut), Q(ut), Ue || gn("replies"));
		},
		Jn = (W) => {
			const ge = fe.current[W];
			ge.timer !== null && (clearTimeout(ge.timer), (ge.timer = null));
		},
		gn = (W) => {
			(Jn(W), (fe.current[W].delayMs = hh));
		},
		un = (W) => {
			if ((W === "reactions" ? bt.current : ct.current)?.dead) return;
			const ge = fe.current[W];
			if (ge.timer !== null) return;
			const Me = ge.delayMs,
				Ye = Me * (0.5 + Math.random());
			ge.timer = setTimeout(() => {
				((ge.timer = null), (ge.delayMs = Math.min(Me * 2, Az)), Dn(W));
			}, Ye);
		},
		Dn = (W) => {
			if (wt.current[W] || (W === "reactions" ? bt.current : ct.current)?.dead) return;
			wt.current[W] = !0;
			const ge = _t.current,
				Me = De.current[W];
			$p(t, { collection: W, keyPrefix: Kt, ...(Me === null ? {} : { keyStartExclusive: Me }), limit: Up })
				.then((Ye) => {
					if (!(!Re.current || _t.current !== ge)) {
						if (((wt.current[W] = !1), W === "reactions")) {
							const Ue = Bt.current;
							if (Ue === null) return;
							const We = Ue.apply_window(Ye.documents);
							q(Ue.get_sorted());
							const hn = Ye.documents.length === 0 && !Ye.isDone;
							(zn("reactions", We, Ye.documents, Ye.isDone, hn), hn && un("reactions"));
						} else {
							const Ue = st.current;
							if (Ue === null) return;
							const We = Ue.apply_window(Ye.documents);
							G(Ue.get_sorted());
							const hn = Ye.documents.length === 0 && !Ye.isDone;
							(zn("replies", We, Ye.documents, Ye.isDone, hn), hn && un("replies"));
						}
						It();
					}
				})
				.catch(() => {
					!Re.current || _t.current !== ge || ((wt.current[W] = !1), zn(W, [], [], !0, !0), un(W));
				});
		},
		yn = (W) => {
			const ge = W === "reactions" ? bt.current : ct.current;
			ge === null || !ge.incomplete || ge.dead || (Jn(W), Dn(W));
		},
		It = () => {
			const W = yt.current;
			if (W !== null)
				for (const ge of ["reactions", "replies"]) {
					const Me = ge === "reactions" ? bt.current : ct.current;
					Me === null ||
						!Me.hasMore ||
						Me.incomplete ||
						Me.dead ||
						((Me.deepestRoot === null || Me.deepestRoot < W) && Dn(ge));
				}
		},
		zt = (W) => {
			if (St.current) return;
			const ge = Rz(W);
			ge !== null && ((St.current = !0), ve(ge), Be(ge), L(ge));
		};
	((0, b.useEffect)(
		() => (
			(Ie.current ??= nh(cc)),
			(st.current ??= nh(cc)),
			(Bt.current ??= nh(Dk)),
			(_t.current += 1),
			(Re.current = !0),
			(St.current = !1),
			(De.current = { reactions: null, replies: null }),
			(wt.current = { reactions: !1, replies: !1 }),
			gn("reactions"),
			gn("replies"),
			(bt.current = null),
			(ct.current = null),
			() => {
				((Re.current = !1), gn("reactions"), gn("replies"));
			}
		),
		[],
	),
		(0, b.useEffect)(() => {
			const W = Ie.current;
			if (Ve.status === "LoadingFirstPage" || W === null) return;
			const ge = W.apply_window(Ve.results);
			(R(W.get_sorted()), I(!0));
			const Me = Ve.results.at(-1)?.key ?? null;
			((_e.current = Me),
				(yt.current = Me === null ? null : oc(Me)),
				zt(Ve.results),
				bt.current === null && !wt.current.reactions && Dn("reactions"),
				ct.current === null && !wt.current.replies && Dn("replies"),
				It());
			const Ye = Ot.current;
			if (Ye === null) {
				Ot.current = new Set(ge.map((ut) => ut.key));
				return;
			}
			const Ue = Ae.current;
			if (Ue !== null) {
				const ut = Ve.results.findIndex((sn) => sn.key === Ue);
				if (ut < 0) Ae.current = null;
				else {
					const sn = Ve.results.slice(ut + 1);
					for (const Ur of sn) Ye.add(Ur.key);
					(sn.length > 0 || Ve.status !== "LoadingMore") && (Ae.current = null);
				}
			}
			const We = ge.filter((ut) => !Ye.has(ut.key) && ut.createdBy !== i && ut.value.deletedAt === null);
			for (const ut of ge) Ye.add(ut.key);
			const hn = We.length > 0 ? ++Je.current : Je.current;
			if (We.length === 1) {
				const ut = We[0];
				l.resolve([ut.createdBy])
					.then(() => {
						if (!Re.current || hn !== Je.current) return;
						const sn = l.get(ut.createdBy) ?? null,
							Ur = ut.value.text,
							tu = Ur.length > 80 ? `${Ur.slice(0, 80)}…` : Ur;
						o(`${sn ?? "Former member"}: ${tu}`);
					})
					.catch(() => {
						!Re.current || hn !== Je.current || o(`New message in #${ft.current}`);
					});
			} else We.length > 1 && o(`${We.length} new messages in #${ft.current}`);
		}, [Ve.results, Ve.status, i, l, o]));
	const Di = Rn === void 0 ? {} : { scopeId: Rn },
		fn = Va(
			t.api.plugins_data.watch_changes,
			P === null ? "skip" : { collection: "messages", limit: 100, updatedSince: P, ...Di },
		),
		dn = Va(
			t.api.plugins_data.watch_changes,
			ye === null ? "skip" : { collection: "replies", limit: 100, updatedSince: ye, ...Di },
		),
		jn = Va(
			t.api.plugins_data.watch_changes,
			M === null ? "skip" : { collection: "reactions", limit: 100, updatedSince: M, ...Di },
		);
	((0, b.useEffect)(() => {
		if (fn === void 0 || P === null) return;
		if (fn === null) {
			N(!0);
			return;
		}
		N(!1);
		const W = Ie.current;
		if (W === null) return;
		const ge = gh(fn.docs, Kt);
		(W.apply_window(ge), R(W.get_sorted()));
		const Me = mh(fn.docs),
			Ye = vh({ current: P, newest: Me, truncated: fn.truncated });
		Ye !== null && ve(Ye);
	}, [fn, P, Kt]),
		(0, b.useEffect)(() => {
			if (dn === void 0 || ye === null) return;
			if (dn === null) {
				Jn("replies");
				const We = {
					...(ct.current ?? { hasMore: !1, deepestRoot: null, incomplete: !1, dead: !1 }),
					incomplete: !1,
					dead: !0,
				};
				((ct.current = We), Q(We));
				return;
			}
			const W = st.current;
			if (W === null) return;
			const ge = ct.current;
			if (ge !== null && ge.dead) {
				const We = { ...ge, dead: !1 };
				((ct.current = We), Q(We));
			}
			const Me = gh(dn.docs, Kt);
			(W.apply_window(Me), G(W.get_sorted()), yn("replies"));
			const Ye = mh(dn.docs),
				Ue = vh({ current: ye, newest: Ye, truncated: dn.truncated });
			Ue !== null && Be(Ue);
		}, [dn, ye, Kt]),
		(0, b.useEffect)(() => {
			if (jn === void 0 || M === null) return;
			if (jn === null) {
				Jn("reactions");
				const We = {
					...(bt.current ?? { hasMore: !1, deepestRoot: null, incomplete: !1, dead: !1 }),
					incomplete: !1,
					dead: !0,
				};
				((bt.current = We), $(We));
				return;
			}
			const W = Bt.current;
			if (W === null) return;
			const ge = bt.current;
			if (ge !== null && ge.dead) {
				const We = { ...ge, dead: !1 };
				((bt.current = We), $(We));
			}
			const Me = gh(jn.docs, Kt);
			(W.apply_window(Me), q(W.get_sorted()), yn("reactions"));
			const Ye = mh(jn.docs),
				Ue = vh({ current: M, newest: Ye, truncated: jn.truncated });
			Ue !== null && L(Ue);
		}, [jn, M, Kt]),
		(0, b.useEffect)(() => {
			const W = () => {
				document.visibilityState === "visible" && (yn("reactions"), yn("replies"));
			};
			return (
				document.addEventListener("visibilitychange", W),
				() => document.removeEventListener("visibilitychange", W)
			);
		}, [t, u.key]),
		(0, b.useEffect)(() => {
			if (f === null) {
				(ce(!0), we(!1), qe(null));
				return;
			}
			let W = !1;
			return (
				ce(!1),
				we(!1),
				qe(null),
				$p(t, { collection: "replies", keyPrefix: Fb(f), limit: Up })
					.then((ge) => {
						W || (jr(ge.documents), we(!ge.isDone), ce(!0));
					})
					.catch((ge) => {
						W || (qe(Un(ge)), ce(!0));
					}),
				() => {
					W = !0;
				}
			);
		}, [t, f]));
	const Wn = lS({
		client: t,
		collection: "messages",
		keyPrefix: J0(u.key),
		userId: i,
		getAuthorName: () => l.get(i) ?? null,
		onDelivered: (W) => {
			(Ie.current?.apply_local(W), Ot.current?.add(W.key), R(Ie.current?.get_sorted() ?? []));
		},
		onRequestStart: cn,
		onRequestSettled: qt,
		onStorageFull: le,
	});
	((0, b.useEffect)(() => {
		const W = new Set();
		for (const ge of x) {
			W.add(ge.createdBy);
			for (const Me of ge.value.mentions ?? []) W.add(Me);
		}
		for (const ge of J) {
			W.add(ge.createdBy);
			for (const Me of ge.value.mentions ?? []) W.add(Me);
		}
		W.size > 0 && l.resolve([...W]);
	}, [x, J, l]),
		(0, b.useEffect)(() => {
			x.length > 0 && p(x[0].timestamp);
		}, [x, p]),
		(0, b.useEffect)(() => {
			const W = x.length > 0 ? x[0].key : null,
				ge = W !== null && W !== On.current,
				Me = Wn.pending.length > Xn.current;
			((On.current = W),
				(Xn.current = Wn.pending.length),
				(ge || Me) && Et.current && (Et.current.scrollTop = Et.current.scrollHeight));
		}, [x, Wn.pending.length]));
	const xr = () => {
		((Ae.current = _e.current), Ve.loadMore(100));
	};
	(0, b.useEffect)(() => {
		const W = Ne.current;
		if (f === null || W === null) return;
		V(W.clientWidth);
		const ge = new ResizeObserver(() => V(W.clientWidth));
		return (ge.observe(W), () => ge.disconnect());
	}, [f]);
	const er = (W) => {
			const ge = Math.max(Ko, O - Bp);
			return Math.min(ge, Math.max(Ko, W));
		},
		ji = (W) => {
			W.key === "ArrowLeft"
				? (W.preventDefault(), ne(er(te + Vp)))
				: W.key === "ArrowRight"
					? (W.preventDefault(), ne(er(te - Vp)))
					: W.key === "Home" && (W.preventDefault(), ne(er(yh)));
		},
		qi = (W) => {
			(W.preventDefault(), W.currentTarget.setPointerCapture(W.pointerId));
		},
		qr = (W) => {
			if (!W.currentTarget.hasPointerCapture(W.pointerId)) return;
			const ge = Ne.current?.getBoundingClientRect();
			ge !== void 0 && ne(er(ge.right - W.clientX));
		},
		tr = (0, b.useMemo)(() => Bk(C, i), [C, i]),
		Ir = (0, b.useMemo)(() => Vk(J), [J]),
		qn = (W) => {
			(Ie.current?.apply_local(W), R(Ie.current?.get_sorted() ?? []));
		},
		dt = (W) => {
			(st.current?.apply_local(W), G(st.current?.get_sorted() ?? []));
		},
		Yt = (W) => {
			(Bt.current?.apply_local(W), q(Bt.current?.get_sorted() ?? []));
		},
		Ft = f === null ? [] : J.filter((W) => sl(W.key) === f),
		Ar = (W) => {
			if ((_ || An.current > 0) && f !== W.key) {
				o("Wait for pending message changes to finish before switching threads.");
				return;
			}
			h(W.key);
		},
		Jr = () => {
			if (_ || An.current > 0) {
				o("Wait for pending message changes to finish before closing the thread.");
				return;
			}
			const W = f;
			(h(null), W !== null && rt.current.get(W)?.focus());
		},
		Rr = f === null ? null : (x.find((W) => W.key === f) ?? null),
		Ii = fS([...x].reverse(), Date.now(), w === null ? null : { lastReadAt: w, selfUserId: i }),
		Wr = Math.max(Ko, O - Bp),
		Lr = er(te);
	return (0, S.jsxs)("div", {
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
							vn(u.key) ? (0, S.jsx)("p", { className: "channel-privacy", children: rm }) : null,
						],
					}),
					u.value.archivedAt !== null
						? (0, S.jsx)("span", { className: "channel-archived-badge", children: "Archived" })
						: null,
				],
			}),
			(0, S.jsxs)("div", {
				ref: Ne,
				className: "channel-body",
				style: { "--thread-width": `${Lr}px` },
				children: [
					(0, S.jsxs)("div", {
						ref: Et,
						className: "message-log",
						role: "log",
						"aria-live": "off",
						"aria-label": `Messages in #${u.value.name}`,
						children: [
							j
								? (0, S.jsx)("div", {
										className: "channel-status is-error",
										role: "alert",
										children: dh(t, `messages in #${u.value.name}`),
									})
								: null,
							z && (Ve.status === "CanLoadMore" || Ve.status === "LoadingMore")
								? (0, S.jsx)("div", {
										className: "log-older",
										children: (0, S.jsx)("button", {
											type: "button",
											className: "button",
											disabled: Ve.status === "LoadingMore",
											onClick: xr,
											children: "Load older",
										}),
									})
								: null,
							k.incomplete || B.incomplete
								? (0, S.jsx)("div", {
										className: "channel-status",
										role: "alert",
										children: "Some reactions and replies in this range could not be loaded.",
									})
								: null,
							k.dead
								? (0, S.jsx)("div", {
										className: "channel-status is-error",
										role: "alert",
										children: dh(t, "reactions in this channel"),
									})
								: null,
							B.dead
								? (0, S.jsx)("div", {
										className: "channel-status is-error",
										role: "alert",
										children: dh(t, "reply counts in this channel"),
									})
								: null,
							z
								? x.length === 0 && Wn.pending.length === 0
									? (0, S.jsx)("div", { className: "channel-status", children: "No messages yet" })
									: (0, S.jsxs)("ul", {
											className: "message-list",
											children: [
												Ii.map((W) =>
													W.kind === "divider"
														? (0, S.jsx)("li", { className: "day-divider", children: W.label }, W.key)
														: W.kind === "new"
															? (0, S.jsx)(
																	"li",
																	{
																		className: "new-divider",
																		children: (0, S.jsx)("span", {
																			className: "new-divider-label",
																			children: "New messages",
																		}),
																	},
																	W.key,
																)
															: (0, S.jsx)(
																	Ph,
																	{
																		client: t,
																		collection: "messages",
																		doc: W.doc,
																		isOwn: W.doc.createdBy === i,
																		selfUserId: i,
																		memberNames: l,
																		isContinuation: W.isContinuation,
																		authorName: l.get(W.doc.createdBy),
																		reactionGroups: Qh(k, tr, W.doc.key),
																		replyCount: kz(B, Ir, W.doc.key),
																		replyLatestAt: Ir.get(W.doc.key)?.latestAt ?? null,
																		repliesHasMore: B.hasMore,
																		onOpenThread: Ar,
																		threadDisabled: _,
																		replyTriggerRef: (ge) => {
																			ge === null ? rt.current.delete(W.doc.key) : rt.current.set(W.doc.key, ge);
																		},
																		onApplyLocal: qn,
																		onRequestStart: cn,
																		onRequestSettled: qt,
																		onApplyReaction: Yt,
																		onStorageFull: le,
																	},
																	W.doc.key,
																),
												),
												Wn.pending.map((W) =>
													(0, S.jsx)(dS, { pending: W, onRetry: () => Wn.retry(W) }, W.clientRequestId),
												),
											],
										})
								: (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading messages…" }),
						],
					}),
					Rr !== null
						? (0, S.jsx)("div", {
								className: "thread-resize",
								role: "separator",
								tabIndex: 0,
								"aria-orientation": "vertical",
								"aria-label": "Resize thread panel",
								"aria-valuenow": Lr,
								"aria-valuemin": Ko,
								"aria-valuemax": Wr,
								onKeyDown: ji,
								onPointerDown: qi,
								onPointerMove: qr,
								onDoubleClick: () => ne(er(yh)),
							})
						: null,
					Rr !== null
						? (0, S.jsx)(
								xz,
								{
									client: t,
									userId: i,
									root: Rr,
									replies: Ft,
									repliesLoaded: se,
									repliesTruncated: he,
									repliesError: pe,
									reactionCoverage: k,
									reactionGroupsByTarget: tr,
									memberNames: l,
									isNarrow: m,
									storageFull: oe,
									onStorageFull: le,
									onApplyLocalRoot: qn,
									onApplyLocalReply: dt,
									onRequestStart: cn,
									onRequestSettled: qt,
									sendInFlight: _,
									announce: o,
									onApplyReaction: Yt,
									onClose: Jr,
								},
								Rr.key,
							)
						: null,
				],
			}),
			oe !== null ? (0, S.jsx)("div", { className: "channel-status is-error", role: "alert", children: oe }) : null,
			_
				? (0, S.jsx)("div", {
						className: "channel-status",
						role: "status",
						children: "Wait for pending message changes to finish before leaving this channel or thread.",
					})
				: null,
			(0, S.jsx)(oS, {
				client: t,
				label: `Message #${u.value.name}`,
				busy: Wn.busy,
				disabled: oe !== null,
				onSend: Wn.send,
			}),
		],
	});
}
var Tl = Xr([vl], [Cc]),
	Nz = Tl.useContext,
	Oz = Tl.useScopedContext,
	bj = Tl.useProviderContext,
	_j = Tl.ContextProvider,
	Sj = Tl.ScopedContextProvider,
	wj = (0, b.createContext)(void 0),
	xl = Xr([p_], [zc]),
	Ej = xl.useContext,
	Tj = xl.useScopedContext,
	qm = xl.useProviderContext,
	zz = xl.ContextProvider,
	mS = xl.ScopedContextProvider,
	Al = Xr([vl, zz], [Cc, mS]),
	vS = Al.useContext,
	Dz = Al.useScopedContext,
	Zc = Al.useProviderContext,
	gS = Al.ContextProvider,
	jz = Al.ScopedContextProvider,
	xj = (0, b.createContext)(void 0),
	qz = "div",
	xi = "";
function ph() {
	xi = "";
}
function Iz(e) {
	const t = e.target;
	return t && Gr(t)
		? !1
		: e.key === " " && xi.length
			? !0
			: e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey && /^[\p{Letter}\p{Number}]$/u.test(e.key);
}
function Lz(e, t) {
	if (lr(e)) return !0;
	const i = e.target;
	return i ? t.some((u) => u.element === i) : !1;
}
function Uz(e) {
	return e.filter((t) => !t.disabled);
}
function Jo(e, t) {
	var i;
	const u = ((i = e.element) == null ? void 0 : i.textContent) || e.children || ("value" in e && e.value);
	return u ? i_(u).trim().toLowerCase().startsWith(t.toLowerCase()) : !1;
}
function $z(e, t, i) {
	if (!i) return e;
	const u = e.find((l) => l.id === i);
	return !u || !Jo(u, t) || (xi !== t && Jo(u, xi))
		? e
		: ((xi = t),
			hM(
				e.filter((l) => Jo(l, xi)),
				i,
			).filter((l) => l.id !== i));
}
var Im = et(function ({ store: t, typeahead: i = !0, ...u }) {
		const l = Rc();
		((t = t || l), Pt(t, !1));
		const o = u.onKeyDownCapture,
			f = (0, b.useRef)(0),
			h = ze((m) => {
				if ((o?.(m), m.defaultPrevented || !i || !t)) return;
				if (!Iz(m)) return ph();
				const { renderedItems: v, items: g, activeId: _, id: p } = t.getState();
				let w = Uz(g.length > v.length ? g : v);
				const x = At(m.currentTarget),
					R = `[data-offscreen-id="${p}"]`,
					z = x.querySelectorAll(R);
				for (const N of z) {
					const C = N.ariaDisabled === "true" || ("disabled" in N && !!N.disabled);
					w.push({ id: N.id, element: N, disabled: C });
				}
				if ((z.length && (w = n_(w, (N) => N.element)), !Lz(m, w))) return ph();
				(m.preventDefault(),
					window.clearTimeout(f.current),
					(f.current = window.setTimeout(() => {
						xi = "";
					}, 500)));
				const I = m.key.toLowerCase();
				((xi += I), (w = $z(w, I, _)));
				const j = w.find((N) => Jo(N, xi));
				j ? t.move(j.id) : ph();
			});
		return ((u = { ...u, onKeyDownCapture: h }), Wa(u));
	}),
	Aj = Ke(function (t) {
		return Xe(qz, Im(t));
	}),
	Bz = "div";
function Vz({ store: e, ...t }) {
	const [i, u] = (0, b.useState)(void 0),
		l = t["aria-label"],
		o = nn(e, "disclosureElement"),
		f = nn(e, "contentElement");
	return (
		(0, b.useEffect)(() => {
			const h = o;
			if (!h) return;
			const m = f;
			m && (l || m.hasAttribute("aria-label") ? u(void 0) : h.id && u(h.id));
		}, [l, o, f]),
		i
	);
}
var yS = et(function ({ store: t, alwaysVisible: i, composite: u, ...l }) {
		const o = Zc();
		((t = t || o), Pt(t, !1));
		const f = t.parent,
			h = t.menubar,
			m = !!f,
			v = Oi(l.id),
			g = l.onKeyDown,
			_ = t.useState((C) => C.placement.split("-")[0]),
			p = t.useState((C) => (C.orientation === "both" ? void 0 : C.orientation)),
			w = p !== "vertical",
			x = nn(h, (C) => !!C && C.orientation !== "vertical"),
			R = ze((C) => {
				if ((g?.(C), !C.defaultPrevented)) {
					if (m || (h && !w)) {
						const q = {
							ArrowRight: () => _ === "left" && !w,
							ArrowLeft: () => _ === "right" && !w,
							ArrowUp: () => _ === "bottom" && w,
							ArrowDown: () => _ === "top" && w,
						}[C.key];
						if (q?.()) return (C.stopPropagation(), C.preventDefault(), t?.hide());
					}
					if (h) {
						const q = {
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
							}[C.key],
							J = q?.();
						J !== void 0 && (C.stopPropagation(), C.preventDefault(), h.move(J));
					}
				}
			});
		l = xn(l, (C) => (0, S.jsx)(jz, { value: t, children: C }), [t]);
		const z = Vz({ store: t, ...l }),
			I = Ic(t.useState("mounted"), l.hidden, i),
			j = I ? { ...l.style, display: "none" } : l.style;
		l = {
			id: v,
			"aria-labelledby": z,
			hidden: I,
			...l,
			ref: Qt(v ? t.setContentElement : null, l.ref),
			style: j,
			onKeyDown: R,
		};
		const N = !!t.combobox;
		return (
			(u = u ?? !N),
			u && (l = { role: "menu", "aria-orientation": p, ...l }),
			(l = vm({ store: t, composite: u, ...l })),
			(l = Im({ store: t, typeahead: !N, ...l })),
			l
		);
	}),
	Rj = Ke(function (t) {
		return Xe(Bz, yS(t));
	});
function bh(e) {
	return [e.clientX, e.clientY];
}
function Zp(e, t) {
	const [i, u] = e;
	let l = !1;
	const o = t.length;
	for (let f = o, h = 0, m = f - 1; h < f; m = h++) {
		const [v, g] = t[h],
			[_, p] = t[m],
			[, w] = t[m === 0 ? f - 1 : m - 1] || [0, 0],
			x = (g - p) * (i - v) - (v - _) * (u - g);
		if (p < g) {
			if (u >= p && u < g) {
				if (x === 0) return !0;
				x > 0 && (u === p ? u > w && (l = !l) : (l = !l));
			}
		} else if (g < p) {
			if (u > g && u <= p) {
				if (x === 0) return !0;
				x < 0 && (u === p ? u < w && (l = !l) : (l = !l));
			}
		} else if (u === g && ((i >= _ && i <= v) || (i >= v && i <= _))) return !0;
	}
	return l;
}
function Zz(e, t) {
	const { top: i, right: u, bottom: l, left: o } = t,
		[f, h] = e;
	return [f < o ? "left" : f > u ? "right" : null, h < i ? "top" : h > l ? "bottom" : null];
}
function Hp(e, t) {
	const i = e.getBoundingClientRect(),
		{ top: u, right: l, bottom: o, left: f } = i,
		[h, m] = Zz(t, i),
		v = [t];
	return (
		h
			? (m !== "top" && v.push([h === "left" ? f : l, u]),
				v.push([h === "left" ? l : f, u]),
				v.push([h === "left" ? l : f, o]),
				m !== "bottom" && v.push([h === "left" ? f : l, o]))
			: m === "top"
				? (v.push([f, u]), v.push([f, o]), v.push([l, o]), v.push([l, u]))
				: (v.push([f, o]), v.push([f, u]), v.push([l, u]), v.push([l, o])),
		v
	);
}
var Hz = "div";
function pS(e, t, i, u) {
	return fa(t) ? !0 : e ? !!(an(t, e) || (i && an(i, e)) || u?.some((l) => pS(e, l, i))) : !1;
}
function Pz({ store: e, ...t }) {
	const [i, u] = (0, b.useState)(!1),
		l = e.useState("mounted");
	(0, b.useEffect)(() => {
		l || u(!1);
	}, [l]);
	const o = t.onFocus,
		f = ze((m) => {
			(o?.(m), !m.defaultPrevented && u(!0));
		}),
		h = (0, b.useRef)(null);
	return (
		(0, b.useEffect)(
			() =>
				Mn(e, ["anchorElement"], (m) => {
					h.current = m.anchorElement;
				}),
			[],
		),
		(t = { autoFocusOnHide: i, finalFocus: h, ...t, onFocus: f }),
		t
	);
}
var Pp = (0, b.createContext)(null),
	bS = et(function ({
		store: t,
		modal: i = !1,
		portal: u = !!i,
		hideOnEscape: l = !0,
		hideOnHoverOutside: o = !0,
		disablePointerEventsOnApproach: f = !!o,
		...h
	}) {
		const m = qm();
		((t = t || m), Pt(t, !1));
		const v = (0, b.useRef)(null),
			[g, _] = (0, b.useState)([]),
			p = (0, b.useRef)(0),
			w = (0, b.useRef)(null),
			{ portalRef: x, domReady: R } = cm(u, h.portalRef),
			z = fm(),
			I = !!o,
			j = Ct(o),
			N = !!f,
			C = Ct(f),
			q = t.useState("open"),
			J = t.useState("mounted");
		((0, b.useEffect)(() => {
			if (!R || !J || (!I && !N)) return;
			const Q = v.current;
			return Q
				? Fn(
						Tn(
							"mousemove",
							(le) => {
								if (!t || !z()) return;
								const { anchorElement: te, hideTimeout: ne, timeout: O } = t.getState(),
									V = w.current,
									[P] = le.composedPath(),
									ve = te;
								if (pS(P, Q, ve, g)) {
									((w.current = P && ve && an(ve, P) ? bh(le) : null), window.clearTimeout(p.current), (p.current = 0));
									return;
								}
								if (!p.current) {
									if (V) {
										const ye = bh(le);
										if (Zp(ye, Hp(Q, V))) {
											if (((w.current = ye), !C(le))) return;
											(le.preventDefault(), le.stopPropagation());
											return;
										}
									}
									j(le) &&
										(p.current = window.setTimeout(() => {
											((p.current = 0), t?.hide());
										}, ne ?? O));
								}
							},
							!0,
						),
						() => clearTimeout(p.current),
					)
				: void 0;
		}, [t, z, R, J, I, N, g, C, j]),
			(0, b.useEffect)(() => {
				if (!R || !J || !N) return;
				const Q = (oe) => {
					const le = v.current;
					if (!le) return;
					const te = w.current;
					if (!te) return;
					const ne = Hp(le, te);
					if (Zp(bh(oe), ne)) {
						if (!C(oe)) return;
						(oe.preventDefault(), oe.stopPropagation());
					}
				};
				return Fn(Tn("mouseenter", Q, !0), Tn("mouseover", Q, !0), Tn("mouseout", Q, !0), Tn("mouseleave", Q, !0));
			}, [R, J, N, C]),
			(0, b.useEffect)(() => {
				R && (q || t?.setAutoFocusOnShow(!1));
			}, [t, R, q]));
		const G = c_(q);
		(0, b.useEffect)(() => {
			if (R)
				return () => {
					G.current || t?.setAutoFocusOnShow(!1);
				};
		}, [t, R]);
		const k = (0, b.useContext)(Pp);
		at(() => {
			if (i || !u || !J || !R) return;
			const Q = v.current;
			if (Q) return k?.(Q);
		}, [i, u, J, R]);
		const $ = (0, b.useCallback)(
			(Q) => {
				_((le) => [...le, Q]);
				const oe = k?.(Q);
				return () => {
					(_((le) => le.filter((te) => te !== Q)), oe?.());
				};
			},
			[k],
		);
		((h = xn(h, (Q) => (0, S.jsx)(mS, { value: t, children: (0, S.jsx)(Pp.Provider, { value: $, children: Q }) }), [
			t,
			$,
		])),
			(h = { ...h, ref: Qt(v, h.ref) }),
			(h = Pz({ store: t, ...h })));
		const B = t.useState((Q) => i || Q.autoFocusOnShow);
		return (
			(h = jm({
				store: t,
				modal: i,
				portal: u,
				autoFocusOnShow: B,
				...h,
				portalRef: x,
				hideOnEscape(Q) {
					return Tc(l, Q)
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
	Cj = wl(
		Ke(function (t) {
			return Xe(Hz, bS(t));
		}),
		qm,
	),
	Qz = "div",
	Kz = et(function ({
		store: t,
		modal: i = !1,
		portal: u = !!i,
		hideOnEscape: l = !0,
		autoFocusOnShow: o = !0,
		hideOnHoverOutside: f,
		alwaysVisible: h,
		...m
	}) {
		const v = Zc();
		((t = t || v), Pt(t, !1));
		const g = (0, b.useRef)(null),
			_ = t.parent,
			p = t.menubar,
			w = !!_,
			x = !!p && !w;
		m = { ...m, ref: Qt(g, m.ref) };
		const { "aria-labelledby": R, ...z } = yS({ store: t, alwaysVisible: h, ...m });
		m = z;
		const [I, j] = (0, b.useState)(),
			N = t.useState("autoFocusOnShow"),
			C = t.useState("initialFocus"),
			q = t.useState("baseElement"),
			J = t.useState("renderedItems");
		(0, b.useEffect)(() => {
			let le = !1;
			return (
				j((te) => {
					var ne, O, V;
					if (le || !N) return;
					if ((ne = te?.current) != null && ne.isConnected) return te;
					const P = (0, b.createRef)();
					switch (C) {
						case "first":
							P.current = ((O = J.find((ve) => !ve.disabled && ve.element)) == null ? void 0 : O.element) || null;
							break;
						case "last":
							P.current =
								((V = [...J].reverse().find((ve) => !ve.disabled && ve.element)) == null ? void 0 : V.element) || null;
							break;
						default:
							P.current = q;
					}
					return P;
				}),
				() => {
					le = !0;
				}
			);
		}, [t, N, C, J, q]);
		const G = w ? !1 : i,
			k = !!o,
			$ = !!I || !!m.initialFocus || !!G,
			B = nn(t.combobox || t, "contentElement"),
			Q = nn(_?.combobox || _, "contentElement"),
			oe = (0, b.useMemo)(() => {
				if (!Q || !B) return;
				const le = B.getAttribute("role"),
					te = Q.getAttribute("role");
				if (!((te === "menu" || te === "menubar") && le === "menu")) return Q;
			}, [B, Q]);
		return (
			oe !== void 0 && (m = { preserveTabOrderAnchor: oe, ...m }),
			(m = bS({
				store: t,
				alwaysVisible: h,
				initialFocus: I,
				autoFocusOnShow: k ? $ && o : N || !!G,
				...m,
				hideOnEscape(le) {
					return Tc(l, le) ? !1 : (t?.hideAll(), !0);
				},
				hideOnHoverOutside(le) {
					const te = t?.getState().disclosureElement;
					return (typeof f == "function" ? f(le) : (f ?? (w ? !0 : x ? (te ? !fa(te) : !0) : !1)))
						? le.defaultPrevented || !w || !te || (kM(te, "mouseout", le), !fa(te))
							? !0
							: (requestAnimationFrame(() => {
									fa(te) || t?.hide();
								}),
								!1)
						: !1;
				},
				modal: G,
				portal: u,
				backdrop: w ? !1 : m.backdrop,
			})),
			(m = { "aria-labelledby": R, ...m }),
			m
		);
	}),
	Yz = wl(
		Ke(function (t) {
			return Xe(Qz, Kz(t));
		}),
		Zc,
	),
	Fz = "a",
	_S = et(function ({ store: t, showOnHover: i = !0, ...u }) {
		const l = qm();
		((t = t || l), Pt(t, !1));
		const o = dl(u),
			f = (0, b.useRef)(0);
		((0, b.useEffect)(() => () => window.clearTimeout(f.current), []),
			(0, b.useEffect)(
				() =>
					Tn(
						"mouseleave",
						(R) => {
							if (!t) return;
							const { anchorElement: z } = t.getState();
							z && R.target === z && (window.clearTimeout(f.current), (f.current = 0));
						},
						!0,
					),
				[t],
			));
		const h = u.onMouseMove,
			m = Ct(i),
			v = fm(),
			g = ze((x) => {
				if ((h?.(x), o || !t || x.defaultPrevented || f.current || !v() || !m(x))) return;
				const R = x.currentTarget;
				(t.setAnchorElement(R), t.setDisclosureElement(R));
				const { showTimeout: z, timeout: I } = t.getState(),
					j = () => {
						((f.current = 0),
							v() &&
								(t?.setAnchorElement(R),
								t?.show(),
								queueMicrotask(() => {
									t?.setDisclosureElement(R);
								})));
					},
					N = z ?? I;
				N === 0 ? j() : (f.current = window.setTimeout(j, N));
			}),
			_ = u.onClick,
			p = ze((x) => {
				(_?.(x), t && (window.clearTimeout(f.current), (f.current = 0)));
			}),
			w = (0, b.useCallback)(
				(x) => {
					if (!t) return;
					const { anchorElement: R } = t.getState();
					R?.isConnected || t.setAnchorElement(x);
				},
				[t],
			);
		return ((u = { ...u, ref: Qt(w, u.ref), onMouseMove: g, onClick: p }), (u = gl(u)), u);
	}),
	kj = Ke(function (t) {
		return Xe(Fz, _S(t));
	}),
	Gz = "button",
	SS = et(function ({ store: t, ...i }) {
		const u = Oc();
		((t = t || u), Pt(t, !1));
		const l = i.onClick,
			o = ze((f) => {
				(t?.setAnchorElement(f.currentTarget), l?.(f));
			});
		return (
			(i = xn(i, (f) => (0, S.jsx)(zc, { value: t, children: f }), [t])),
			(i = { ...i, onClick: o }),
			(i = pm({ store: t, ...i })),
			(i = x_({ store: t, ...i })),
			i
		);
	}),
	Mj = Ke(function (t) {
		return Xe(Gz, SS(t));
	}),
	Xz = "button";
function Jz(e, t) {
	return {
		ArrowDown: t === "bottom" || t === "top" ? "first" : !1,
		ArrowUp: t === "bottom" || t === "top" ? "last" : !1,
		ArrowRight: t === "right" ? "first" : !1,
		ArrowLeft: t === "left" ? "first" : !1,
	}[e.key];
}
function Qp(e, t) {
	return !!e?.some((i) => (!i.element || i.element === t ? !1 : i.element.getAttribute("aria-expanded") === "true"));
}
var Wz = et(function ({ store: t, focusable: i, accessibleWhenDisabled: u, showOnHover: l, ...o }) {
		const f = Zc();
		((t = t || f), Pt(t, !1));
		const h = (0, b.useRef)(null),
			m = t.parent,
			v = t.menubar,
			g = !!m,
			_ = !!v && !g,
			p = dl(o),
			w = () => {
				const G = h.current;
				G && (t?.setDisclosureElement(G), t?.setAnchorElement(G), t?.show());
			},
			x = o.onFocus,
			R = ze((G) => {
				if ((x?.(G), p || G.defaultPrevented || (t?.setAutoFocusOnShow(!1), t?.setActiveId(null), !v) || !_)) return;
				const { items: k } = v.getState();
				Qp(k, G.currentTarget) && w();
			}),
			z = nn(t, (G) => G.placement.split("-")[0]),
			I = o.onKeyDown,
			j = ze((G) => {
				if ((I?.(G), p || G.defaultPrevented)) return;
				const k = Jz(G, z);
				k && (G.preventDefault(), w(), t?.setAutoFocusOnShow(!0), t?.setInitialFocus(k));
			}),
			N = o.onClick,
			C = ze((G) => {
				if ((N?.(G), G.defaultPrevented || !t)) return;
				const k = !G.detail,
					{ open: $ } = t.getState();
				((!$ || k) && ((!g || k) && t.setAutoFocusOnShow(!0), t.setInitialFocus(k ? "first" : "container")), g && w());
			});
		((o = xn(o, (G) => (0, S.jsx)(gS, { value: t, children: G }), [t])),
			g && (o = { ...o, render: (0, S.jsx)(hc.div, { render: o.render }) }));
		const q = Oi(o.id),
			J = nn(m?.combobox || m, "contentElement");
		return (
			(o = {
				id: q,
				role: g || _ ? t_(J, "menuitem") : void 0,
				"aria-haspopup": Ec(t.useState("contentElement"), "menu"),
				...o,
				ref: Qt(h, o.ref),
				onFocus: R,
				onKeyDown: j,
				onClick: C,
			}),
			(o = _S({
				store: t,
				focusable: i,
				accessibleWhenDisabled: u,
				...o,
				showOnHover: (G) => {
					if (
						!(() => {
							if (typeof l == "function") return l(G);
							if (l != null) return l;
							if (g) return !0;
							if (!v) return !1;
							const { items: B } = v.getState();
							return _ && Qp(B);
						})()
					)
						return !1;
					const $ = _ ? v : m;
					return ($ && $.setActiveId(G.currentTarget.id), !0);
				},
			})),
			(o = SS({ store: t, toggleOnClick: !g, focusable: i, accessibleWhenDisabled: u, ...o })),
			(o = Im({ store: t, typeahead: _, ...o })),
			o
		);
	}),
	eD = Ke(function (t) {
		return Xe(Xz, Wz(t));
	}),
	tD = "div";
function nD(e, t, i) {
	var u;
	if (!e) return !1;
	if (fa(e)) return !0;
	const l = t?.find((h) => {
			var m;
			return h.element === i ? !1 : ((m = h.element) == null ? void 0 : m.getAttribute("aria-expanded")) === "true";
		}),
		o = (u = l?.element) == null ? void 0 : u.getAttribute("aria-controls");
	if (!o) return !1;
	const f = At(e).getElementById(o);
	return f ? (fa(f) ? !0 : !!f.querySelector("[role=menuitem][aria-expanded=true]")) : !1;
}
var rD = et(function ({
		store: t,
		hideOnClick: i = !0,
		preventScrollOnKeyDown: u = !0,
		focusOnHover: l,
		blurOnHoverEnd: o,
		...f
	}) {
		const h = Dz(!0),
			m = Oz();
		((t = t || h || m), Pt(t, !1));
		const v = f.onClick,
			g = Ct(i),
			_ = "hideAll" in t ? t.hideAll : void 0,
			p = !!_,
			w = ze((x) => {
				(v?.(x),
					!x.defaultPrevented &&
						(o_(x) || l_(x) || (_ && x.currentTarget.getAttribute("aria-haspopup") !== "menu" && g(x) && _())));
			});
		return (
			(f = {
				role: t_(
					nn(t, (x) => ("contentElement" in x ? x.contentElement : null)),
					"menuitem",
				),
				...f,
				onClick: w,
			}),
			(f = Tm({ store: t, preventScrollOnKeyDown: u, ...f })),
			(f = Em({
				store: t,
				...f,
				focusOnHover(x) {
					const R = () => (typeof l == "function" ? l(x) : (l ?? !0));
					if (!t || !R()) return !1;
					const { baseElement: z, items: I } = t.getState();
					return p
						? (x.currentTarget.hasAttribute("aria-expanded") && x.currentTarget.focus(), !0)
						: nD(z, I, x.currentTarget)
							? (x.currentTarget.focus(), !0)
							: !1;
				},
				blurOnHoverEnd(x) {
					return typeof o == "function" ? o(x) : (o ?? p);
				},
			})),
			f
		);
	}),
	iD = Ac(
		Ke(function (t) {
			return Xe(tD, rD(t));
		}),
	);
function aD(e = {}) {
	var t;
	const i = (t = e.store) == null ? void 0 : t.getState(),
		u = eS({ ...e, placement: je(e.placement, i?.placement, "bottom") }),
		l = je(e.timeout, i?.timeout, 500),
		o = Dr(
			{
				...u.getState(),
				timeout: l,
				showTimeout: je(e.showTimeout, i?.showTimeout),
				hideTimeout: je(e.hideTimeout, i?.hideTimeout),
				autoFocusOnShow: je(i?.autoFocusOnShow, !1),
			},
			u,
			e.store,
		);
	return { ...u, ...o, setAutoFocusOnShow: (f) => o.setState("autoFocusOnShow", f) };
}
function uD(e, t, i) {
	return (Ht(e, i, "timeout"), Ht(e, i, "showTimeout"), Ht(e, i, "hideTimeout"), tS(e, t, i));
}
function sD({ combobox: e, parent: t, menubar: i, ...u } = {}) {
	const l = !!i && !t,
		o = jc(
			u.store,
			S_(t, ["values"]),
			Sm(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
		);
	const f = o.getState(),
		h = iS({ ...u, store: o, orientation: je(u.orientation, f.orientation, "vertical") }),
		m = aD({
			...u,
			store: o,
			placement: je(u.placement, f.placement, "bottom-start"),
			timeout: je(u.timeout, f.timeout, l ? 0 : 150),
			hideTimeout: je(u.hideTimeout, f.hideTimeout, 0),
		}),
		v = Dr(
			{
				...h.getState(),
				...m.getState(),
				initialFocus: je(f.initialFocus, "container"),
				values: je(u.values, f.values, u.defaultValues, {}),
			},
			h,
			m,
			o,
		);
	return (
		$n(v, () =>
			Mn(v, ["mounted"], (g) => {
				g.mounted || v.setState("activeId", null);
			}),
		),
		$n(v, () =>
			Mn(t, ["orientation"], (g) => {
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
			setValue: (g, _) => {
				g !== "__proto__" &&
					g !== "constructor" &&
					(Array.isArray(g) ||
						v.setState("values", (p) => {
							const w = p[g],
								x = r_(_, w);
							return x === w ? p : { ...p, [g]: x !== void 0 && x };
						}));
			},
		}
	);
}
function lD(e, t, i) {
	return (
		es(t, [i.combobox, i.parent, i.menubar]),
		Ht(e, i, "values", "setValues"),
		Object.assign(uD(aS(e, t, i), t, i), { combobox: i.combobox, parent: i.parent, menubar: i.menubar })
	);
}
function oD(e = {}) {
	const t = vS(),
		i = Nz(),
		u = Dc();
	e = {
		...e,
		parent: e.parent !== void 0 ? e.parent : t,
		menubar: e.menubar !== void 0 ? e.menubar : i,
		combobox: e.combobox !== void 0 ? e.combobox : u,
	};
	const [l, o] = qc(sD, e);
	return lD(l, o, e);
}
function cD(e = {}) {
	return (0, S.jsx)(gS, { value: oD(e), children: e.children });
}
var fD = "hr",
	dD = et(function ({ store: t, ...i }) {
		const u = vS();
		return ((t = t || u), (i = sS({ store: t, ...i })), i);
	}),
	hD = Ke(function (t) {
		return Xe(fD, dD(t));
	}),
	mD = (0, b.memo)(function (t) {
		const { channelName: i, items: u } = t;
		return (0, S.jsxs)(cD, {
			placement: "bottom-end",
			children: [
				(0, S.jsx)(eD, {
					className: "ChannelRowMenu-trigger",
					"aria-label": `Actions for #${i}`,
					children: (0, S.jsx)(aM, { size: 16, "aria-hidden": "true" }),
				}),
				(0, S.jsx)(Yz, {
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					className: "ChannelRowMenu-popover",
					"aria-label": `Actions for #${i}`,
					children: u.map((l) =>
						"separator" in l
							? (0, S.jsx)(hD, { className: "ChannelRowMenu-separator" }, l.id)
							: (0, S.jsx)(
									iD,
									{
										className: l.danger ? "ChannelRowMenu-item ChannelRowMenu-item-danger" : "ChannelRowMenu-item",
										onClick: l.onSelect,
										children: l.label,
									},
									l.id,
								),
					),
				}),
			],
		});
	}),
	vD = 300 * 1e3;
function gD(e) {
	const t = (0, b.useRef)(new Map()),
		i = (0, b.useRef)(new Map()),
		u = (0, b.useRef)(new Map()),
		[, l] = (0, b.useState)(0),
		o = (0, b.useCallback)((h) => (t.current.has(h) ? t.current.get(h) : void 0), []),
		f = (0, b.useCallback)(
			async (h) => {
				const m = Date.now(),
					v = [],
					g = new Set();
				for (const _ of new Set(h)) {
					const p = u.current.get(_);
					if (p !== void 0) {
						g.add(p);
						continue;
					}
					const w = i.current.get(_);
					(w === void 0 || m - w >= vD) && v.push(_);
				}
				for (let _ = 0; _ < v.length; _ += 50) {
					const p = v.slice(_, _ + 50),
						w = e.convex
							.query(e.api.plugins_data.resolve_member_display, { userIds: p })
							.then((x) => {
								const R = new Map(Object.entries(x?.members ?? {}));
								for (const z of p) (t.current.set(z, R.get(z) ?? null), i.current.set(z, Date.now()));
							})
							.catch(() => {
								for (const x of p) i.current.delete(x);
							});
					for (const x of p) u.current.set(x, w);
					(w.then(() => {
						for (const x of p) u.current.get(x) === w && u.current.delete(x);
					}),
						g.add(w));
				}
				g.size !== 0 && (await Promise.all(g), l((_) => _ + 1));
			},
			[e],
		);
	return (0, b.useMemo)(() => ({ get: o, resolve: f }), [o, f]);
}
function yD(e) {
	const [t, i] = (0, b.useState)(null);
	return (
		(0, b.useEffect)(() => {
			let u = !1;
			return (
				Xb(e, { limit: 100 }).then((l) => {
					if (!u) {
						if ("_nay" in l) {
							i({ members: [], error: Gb(l._nay.name), truncated: !1 });
							return;
						}
						i({ members: l._yay.members, error: null, truncated: l._yay.cursor !== null });
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
function wS(e) {
	const t = yD(e.client);
	if (t === null) return (0, S.jsx)("p", { className: "channel-status", role: "status", children: "Loading people…" });
	if (t.error !== null) return (0, S.jsx)("p", { className: "form-error", role: "alert", children: t.error });
	const i = t.members
		.filter((u) => u.userId !== e.selfUserId)
		.sort((u, l) => Go(u.displayName).localeCompare(Go(l.displayName)));
	return i.length === 0
		? (0, S.jsx)("p", { className: "channel-status", children: "Nobody else is in this workspace yet." })
		: (0, S.jsxs)(S.Fragment, {
				children: [
					(0, S.jsx)("ul", {
						className: "people-list",
						children: i.map((u) =>
							(0, S.jsx)(
								"li",
								{
									className: "people-item",
									children: (0, S.jsxs)("label", {
										children: [
											(0, S.jsx)("input", {
												type: "checkbox",
												checked: e.selected.includes(u.userId),
												disabled: e.disabled,
												onChange: (l) => e.onToggle(u.userId, l.currentTarget.checked),
											}),
											Go(u.displayName),
										],
									}),
								},
								u.userId,
							),
						),
					}),
					t.truncated
						? (0, S.jsx)("p", {
								className: "channel-status",
								children: "Showing the first 100 people in this workspace.",
							})
						: null,
				],
			});
}
function Kp(e) {
	const t = (0, b.useId)(),
		i = (0, b.useId)(),
		u = (0, b.useId)(),
		l = (0, b.useId)(),
		[o, f] = (0, b.useState)(e.initialName),
		[h, m] = (0, b.useState)(e.initialTopic),
		[v, g] = (0, b.useState)(!1),
		[_, p] = (0, b.useState)([]),
		[w, x] = (0, b.useState)(null),
		R = e.busy || e.fieldsLocked,
		z = () => {
			if (e.busy || e.waiting) return;
			const N = o.trim();
			if (N.length < 1 || N.length > 64) {
				x("Enter a name between 1 and 64 characters.");
				return;
			}
			const C = h.trim();
			if (C.length > 250) {
				x("Keep the topic under 250 characters.");
				return;
			}
			(x(null), e.onSubmit(N, C, { isPrivate: v, userIds: _ }));
		},
		I = w ?? e.error,
		j = () => {
			e.busy || e.onClose();
		};
	return (0, S.jsxs)(rs, {
		labelledBy: t,
		onClose: j,
		children: [
			(0, S.jsx)("h2", { id: t, className: "dialog-title", children: e.title }),
			(0, S.jsxs)("div", {
				className: "field",
				children: [
					(0, S.jsx)("label", { htmlFor: i, children: "Channel name" }),
					(0, S.jsx)("input", {
						id: i,
						"data-dialog-initial": !0,
						type: "text",
						value: o,
						maxLength: 64,
						disabled: R,
						onInput: (N) => f(N.currentTarget.value),
						onKeyDown: (N) => {
							N.key === "Enter" && (N.preventDefault(), z());
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
						disabled: R,
						onInput: (N) => m(N.currentTarget.value),
						onKeyDown: (N) => {
							N.key === "Enter" && (N.preventDefault(), z());
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
								htmlFor: l,
								children: [
									(0, S.jsx)("input", {
										id: l,
										type: "checkbox",
										checked: v,
										disabled: R,
										onChange: (N) => g(N.currentTarget.checked),
									}),
									"Private channel",
								],
							}),
							v
								? (0, S.jsxs)(S.Fragment, {
										children: [
											(0, S.jsx)("p", { className: "field-note", children: rm }),
											(0, S.jsx)("p", {
												className: "field-note",
												children: "Tick one person for a direct message, or several for a group.",
											}),
											(0, S.jsx)(wS, {
												client: e.privacy.client,
												selfUserId: e.privacy.selfUserId,
												selected: _,
												disabled: R,
												onToggle: (N, C) => p((q) => (C ? [...q, N] : q.filter((J) => J !== N))),
											}),
										],
									})
								: null,
						],
					})
				: null,
			I !== null ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: I }) : null,
			(0, S.jsxs)("div", {
				className: "dialog-actions",
				children: [
					(0, S.jsx)("button", {
						type: "button",
						className: "button",
						disabled: e.busy,
						onClick: j,
						children: "Cancel",
					}),
					(0, S.jsx)("button", {
						type: "button",
						className: "button button-primary",
						disabled: e.busy || e.waiting,
						onClick: z,
						children: e.busy ? "Saving…" : e.waiting ? "Checking…" : e.fieldsLocked ? "Retry" : e.submitLabel,
					}),
				],
			}),
		],
	});
}
function pD(e) {
	const t = (0, b.useId)(),
		[i, u] = (0, b.useState)(void 0),
		[l, o] = (0, b.useState)(!1),
		[f, h] = (0, b.useState)(null),
		[m, v] = (0, b.useState)(!1),
		[g, _] = (0, b.useState)(null),
		p = (0, b.useRef)(!1),
		w = (0, b.useRef)(!0),
		x = (0, b.useRef)(0);
	(0, b.useEffect)(
		() => (
			(w.current = !0),
			() => {
				((w.current = !1), (x.current += 1));
			}
		),
		[],
	);
	const R = (0, b.useCallback)(() => {
		const C = (x.current += 1);
		return (
			o(!1),
			h(null),
			Promise.resolve()
				.then(() => e.client.convex.query(e.client.api.plugins_data.watch_scope_principals, { scopeId: e.channel.key }))
				.then((q) => {
					if (!w.current || x.current !== C) return { kind: "cancelled" };
					const J = tl(q);
					return (
						o(!0),
						J === null
							? (u(void 0), h("The people list response was invalid."), { kind: "unavailable" })
							: (u(J._yay),
								J._yay !== null && e.memberNames.resolve(J._yay.map((G) => G.userId)),
								{ kind: "exact", principals: J._yay })
					);
				})
				.catch(() =>
					!w.current || x.current !== C
						? { kind: "cancelled" }
						: (o(!0), u(void 0), h("Failed to read who can access this"), { kind: "unavailable" }),
				)
		);
	}, [e.client, e.channel.key, e.memberNames]);
	(0, b.useEffect)(() => {
		R();
	}, [R]);
	const z = (C) => {
			p.current ||
				((p.current = !0),
				v(!0),
				_(null),
				e.client.convex
					.mutation(e.client.api.plugins_data.user_manage_scope, { action: C })
					.then((q) => {
						if (q._nay) {
							_(q._nay.message);
							return;
						}
						return R().then(() => {});
					})
					.catch(() =>
						R().then((q) => {
							q.kind !== "cancelled" &&
								_(
									q.kind === "unavailable"
										? "We could not confirm the change, and the current people list could not be loaded."
										: q.principals === null
											? "We could not confirm the change, and this people list is no longer readable."
											: "We could not confirm the change. The current people list is shown.",
								);
						}),
					)
					.finally(() => {
						((p.current = !1), v(!1));
					}));
		},
		I = new Set((i ?? []).map((C) => C.userId)),
		j = (i ?? []).some((C) => C.userId === e.selfUserId && C.level === "manage"),
		N = () => {
			m || e.onClose();
		};
	return (0, S.jsxs)(rs, {
		labelledBy: t,
		onClose: N,
		children: [
			(0, S.jsxs)("h2", { id: t, className: "dialog-title", children: ["People in #", e.channel.value.name] }),
			(0, S.jsx)("p", { className: "field-note", children: rm }),
			l
				? f !== null
					? (0, S.jsx)("p", { className: "form-error", role: "alert", children: f })
					: i === void 0
						? (0, S.jsx)("p", { className: "channel-status", role: "status", children: "Loading people…" })
						: i === null
							? (0, S.jsx)("p", {
									className: "form-error",
									role: "alert",
									children: "This channel's people list is no longer readable. Reload the page.",
								})
							: (0, S.jsx)("ul", {
									className: "people-list current-people",
									"aria-label": "People in this channel",
									children: i.map((C) =>
										(0, S.jsxs)(
											"li",
											{
												className: "people-item",
												children: [
													(0, S.jsxs)("span", {
														children: [
															e.memberNames.get(C.userId) ?? C.userId,
															C.level === "manage" ? " (can add people)" : "",
														],
													}),
													j && C.userId !== e.selfUserId
														? (0, S.jsx)("button", {
																type: "button",
																className: "button channel-item-action",
																disabled: m,
																onClick: () =>
																	z({ kind: "remove_principal", scopeId: e.channel.key, userId: C.userId }),
																children: "Remove",
															})
														: null,
												],
											},
											C.userId,
										),
									),
								})
				: (0, S.jsx)("p", { className: "channel-status", role: "status", children: "Loading people…" }),
			l && i !== void 0 && i !== null && j
				? (0, S.jsxs)("div", {
						className: "field",
						children: [
							(0, S.jsx)("p", { className: "field-label", children: "Add people" }),
							(0, S.jsx)(wS, {
								client: e.client,
								selfUserId: e.selfUserId,
								selected: [...I],
								disabled: m,
								onToggle: (C, q) =>
									z(
										q
											? { kind: "set_principal", scopeId: e.channel.key, userId: C, level: "member" }
											: { kind: "remove_principal", scopeId: e.channel.key, userId: C },
									),
							}),
						],
					})
				: null,
			g !== null ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: g }) : null,
			(0, S.jsxs)("div", {
				className: "dialog-actions",
				children: [
					l && f !== null
						? (0, S.jsx)("button", {
								type: "button",
								className: "button",
								"data-dialog-initial": !0,
								disabled: m,
								onClick: () => void R(),
								children: "Retry",
							})
						: null,
					(0, S.jsx)("button", {
						type: "button",
						className: "button",
						"data-dialog-initial": f === null ? !0 : void 0,
						disabled: m,
						onClick: N,
						children: "Close",
					}),
				],
			}),
		],
	});
}
function bD(e) {
	const t = (0, b.useId)(),
		i = () => {
			e.busy || e.onClose();
		};
	return (0, S.jsxs)(rs, {
		labelledBy: t,
		onClose: i,
		children: [
			(0, S.jsxs)("h2", { id: t, className: "dialog-title", children: ["Archive #", e.channelName, "?"] }),
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
						onClick: i,
						children: "Cancel",
					}),
					(0, S.jsx)("button", {
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
function _D(e) {
	const t = (0, b.useId)(),
		[i, u] = (0, b.useState)(void 0),
		[l, o] = (0, b.useState)(null),
		[f, h] = (0, b.useState)(0);
	(0, b.useEffect)(() => {
		let _ = !1;
		return (
			u(void 0),
			o(null),
			Promise.resolve()
				.then(() => e.client.convex.query(e.client.api.plugins_data.watch_scope_principals, { scopeId: e.channel.key }))
				.then((p) => {
					if (_) return;
					const w = tl(p);
					if (w === null) {
						o("The people list response was invalid.");
						return;
					}
					u(w._yay?.length ?? null);
				})
				.catch(() => {
					_ || o("Failed to read who can access this");
				}),
			() => {
				_ = !0;
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
	return (0, S.jsxs)(rs, {
		labelledBy: t,
		onClose: v,
		children: [
			(0, S.jsx)("h2", {
				id: t,
				className: "dialog-title",
				children:
					e.action === "delete" ? `Delete #${e.channel.value.name} for everyone?` : `Leave #${e.channel.value.name}?`,
			}),
			l !== null
				? (0, S.jsx)("p", { className: "form-error", role: "alert", children: l })
				: i === void 0
					? (0, S.jsx)("p", { role: "status", children: "Reading who is in this channel…" })
					: (0, S.jsx)("p", { children: g }),
			e.error !== null ? (0, S.jsx)("p", { className: "form-error", role: "alert", children: e.error }) : null,
			(0, S.jsxs)("div", {
				className: "dialog-actions",
				children: [
					(0, S.jsx)("button", {
						type: "button",
						className: "button",
						"data-dialog-initial": l === null ? !0 : void 0,
						disabled: e.busy,
						onClick: v,
						children: "Cancel",
					}),
					l !== null
						? (0, S.jsx)("button", {
								type: "button",
								className: "button",
								"data-dialog-initial": !0,
								disabled: e.busy,
								onClick: () => h((_) => _ + 1),
								children: "Retry",
							})
						: null,
					(0, S.jsx)("button", {
						type: "button",
						className: "button button-danger",
						disabled: e.busy || e.waiting || i === void 0 || l !== null,
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
var SD = [
	{ key: "view:unreads", name: "Unreads" },
	{ key: "view:threads", name: "Threads" },
	{ key: "view:activity", name: "Activity" },
];
function Lm(e) {
	return e === null ? "Former member" : (e ?? "…");
}
function Um(e) {
	return e.length > 80 ? `${e.slice(0, 80)}…` : e;
}
function wD(e) {
	const t = [];
	for (const l of e.channels) {
		if (vn(l.key)) {
			const f = e.privateActivity.get(l.key),
				h = e.privateCursors.get(l.key)?.activity ?? Sr;
			f !== void 0 && !Xs(h, f.activity) && t.push({ channel: l, at: f.at, mentionCount: 0, preview: null });
			continue;
		}
		const o = e.publicUnreads.get(l.key);
		o !== void 0 && t.push({ channel: l, at: o.latest.timestamp, mentionCount: o.mentionCount, preview: o.latest });
	}
	t.sort((l, o) => o.at - l.at);
	const i = e.memberNames;
	(0, b.useEffect)(() => {
		const l = [...e.publicUnreads.values()].map((o) => o.latest.createdBy);
		l.length > 0 && i.resolve(l);
	}, [e.publicUnreads, i]);
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
						children:
							"The recent-messages feed stopped, so unread state for public channels is not updating. Reload the page to try again.",
					})
				: null,
			t.length === 0
				? (0, S.jsx)("div", { className: "channel-status", children: "You are all caught up." })
				: (0, S.jsx)("ul", {
						className: "view-rows",
						children: t.map((l) =>
							(0, S.jsx)(
								"li",
								{
									className: "view-row",
									children: (0, S.jsxs)("button", {
										type: "button",
										className: "view-row-button",
										onClick: () => e.onSelectChannel(l.channel),
										children: [
											(0, S.jsxs)("span", {
												className: "view-row-title",
												children: [
													"#",
													l.channel.value.name,
													l.mentionCount > 0
														? (0, S.jsxs)("span", {
																className: "mention-badge",
																children: [
																	l.mentionCount,
																	(0, S.jsx)("span", { className: "visually-hidden", children: " mentions of you" }),
																],
															})
														: null,
												],
											}),
											(0, S.jsx)("span", { className: "view-row-time", children: wc(l.at, u) }),
											l.preview !== null
												? (0, S.jsx)("span", {
														className: "view-row-preview",
														children: `${Lm(i.get(l.preview.createdBy))}: ${Um(l.preview.value.text)}`,
													})
												: null,
										],
									}),
								},
								l.channel.key,
							),
						),
					}),
		],
	});
}
function ED(e) {
	const t = new Map(e.channels.map((o) => [o.key, o])),
		i = [];
	for (const o of e.feed) {
		if (o.value.deletedAt !== null) continue;
		const f = im(o.key),
			h = f === null ? void 0 : t.get(f);
		if (h === void 0) continue;
		const m = i[i.length - 1];
		m !== void 0 && m.channel.key === h.key ? m.messages.push(o) : i.push({ channel: h, messages: [o] });
	}
	const u = e.memberNames;
	(0, b.useEffect)(() => {
		const o = [...new Set(e.feed.map((f) => f.createdBy))];
		o.length > 0 && u.resolve(o);
	}, [e.feed, u]);
	const l = Date.now();
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
						children: "The recent-messages feed stopped, so this view is not updating. Reload the page to try again.",
					})
				: null,
			i.length === 0
				? (0, S.jsx)("div", { className: "channel-status", children: "No public messages yet." })
				: (0, S.jsx)("div", {
						className: "view-groups",
						children: i.map((o, f) =>
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
															(0, S.jsx)("span", { className: "view-row-title", children: Lm(u.get(h.createdBy)) }),
															(0, S.jsx)("span", { className: "view-row-time", children: wc(h.timestamp, l) }),
															(0, S.jsx)("span", { className: "view-row-preview", children: Um(h.value.text) }),
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
function TD(e) {
	const t = Va(e.client.api.plugins_data.watch_recent, { collection: "replies", limit: 100, order: "desc" }),
		i = (0, b.useMemo)(() => (t == null ? [] : Xo(cc).apply_window(t.docs)), [t]),
		u = t !== void 0,
		l = t === null,
		o = new Map(e.channels.map((v) => [v.key, v])),
		f = new Map();
	for (const v of i) {
		if (v.value.deletedAt !== null) continue;
		const g = sl(v.key),
			_ = g === null ? null : im(g),
			p = _ === null ? void 0 : o.get(_);
		if (g === null || p === void 0) continue;
		const w = f.get(g);
		w === void 0 ? f.set(g, { channel: p, newest: v, count: 1 }) : (w.count += 1);
	}
	const h = e.memberNames;
	(0, b.useEffect)(() => {
		const v = [...new Set(i.map((g) => g.createdBy))];
		v.length > 0 && h.resolve(v);
	}, [i, h]);
	const m = Date.now();
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
			l
				? (0, S.jsx)("div", {
						className: "channel-status is-error",
						role: "alert",
						children: "The replies feed stopped, so this view is not updating. Reload the page to try again.",
					})
				: null,
			u
				? f.size === 0
					? (0, S.jsx)("div", { className: "channel-status", children: "No recent thread activity." })
					: (0, S.jsx)("ul", {
							className: "view-rows",
							children: [...f.entries()].map(([v, g]) =>
								(0, S.jsx)(
									"li",
									{
										className: "view-row",
										children: (0, S.jsxs)("button", {
											type: "button",
											className: "view-row-button",
											onClick: () => e.onOpenThread(g.channel, v),
											children: [
												(0, S.jsxs)("span", { className: "view-row-title", children: ["#", g.channel.value.name] }),
												(0, S.jsx)("span", { className: "view-row-time", children: wc(g.newest.timestamp, m) }),
												(0, S.jsx)("span", {
													className: "view-row-preview",
													children: `${g.count} ${g.count === 1 ? "reply" : "replies"} · ${Lm(h.get(g.newest.createdBy))}: ${Um(g.newest.value.text)}`,
												}),
											],
										}),
									},
									v,
								),
							),
						})
				: (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading threads…" }),
		],
	});
}
function xD(e) {
	return Date.now() >= e.session.expiresAt()
		? "This Chitchat session expired. Reload the page to continue."
		: "Chitchat can no longer read its data. Reload the page to try again.";
}
var AD = class extends b.Component {
		state = { failed: !1 };
		static getDerivedStateFromError() {
			return { failed: !0 };
		}
		componentDidCatch(e, t) {
			console.error("[chitchat] A live read failed", { message: e.message, componentStack: t.componentStack });
		}
		render() {
			return this.state.failed
				? (0, S.jsx)("div", {
						className: "chitchat",
						children: (0, S.jsxs)("div", {
							className: "page-dead",
							role: "alert",
							children: [
								(0, S.jsx)("h1", { children: "Chitchat" }),
								(0, S.jsx)("p", {
									children:
										Date.now() >= this.props.client.session.expiresAt()
											? "This Chitchat session expired. Reload the page to continue."
											: "Chitchat could not read its data. Check your connection and reload the page.",
								}),
							],
						}),
					})
				: this.props.children;
		}
	},
	Yp = 8,
	RD = 2e3,
	oa = 250,
	Fp = 4e3,
	CD = 250,
	kD = 4e3,
	MD =
		"Chitchat cannot confirm whether this private channel was created because no channel is readable at its saved key. Retry checks the same key, or Cancel.",
	ND = "This private channel exists, but you are not in its current access list. Retry checks the same key, or Cancel.",
	Gp = 250,
	Xp = 4e3,
	_h = "Wait for pending message changes to finish before leaving this channel or thread.";
function OD(e) {
	return (
		pk(e.scopeId) &&
		e.keyPrefix === e.scopeId &&
		e.collections.length === Nh.length &&
		Nh.every((t) => e.collections.includes(t)) &&
		Number.isSafeInteger(e.membershipRevision) &&
		e.membershipRevision >= 0 &&
		e.appendActivity.every(
			(t) =>
				Number.isSafeInteger(t.at) &&
				t.at >= 0 &&
				Number.isSafeInteger(t.sequence) &&
				t.sequence >= 0 &&
				t.createdByUserId !== "",
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
function tl(e) {
	return e === null || zD(e) ? { _yay: e } : null;
}
var Sr = { messages: 0, replies: 0 };
function Ti(e, t) {
	return { messages: Math.max(e.messages, t.messages), replies: Math.max(e.replies, t.replies) };
}
function Xs(e, t) {
	return e.messages >= t.messages && e.replies >= t.replies;
}
function DD(e) {
	let t = 0,
		i = Sr;
	for (const u of e.appendActivity)
		u.collection === "messages"
			? ((t = Math.max(t, u.at)), (i = Ti(i, { messages: u.sequence, replies: 0 })))
			: u.collection === "replies" && ((t = Math.max(t, u.at)), (i = Ti(i, { messages: 0, replies: u.sequence })));
	return { at: t, activity: i };
}
function Jp(e) {
	((e.cancelled = !0), e.retryTimer !== null && clearTimeout(e.retryTimer));
}
function Wp(e, t) {
	return t.revision <= e.revision
		? !1
		: ((e.revision = t.revision),
			(e.storedAt = Math.max(e.storedAt, t.at)),
			(e.storedActivity = Ti(e.storedActivity, t.activity)),
			(e.waitingForRefresh = !1),
			!0);
}
function Yo(e) {
	((e.cancelled = !0), e.retryTimer !== null && (clearTimeout(e.retryTimer), (e.retryTimer = null)));
}
function Sh(e) {
	((e.cancelled = !0), e.retryTimer !== null && (clearTimeout(e.retryTimer), (e.retryTimer = null)));
}
function wh(e) {
	((e.cancelled = !0), e.retryTimer !== null && (clearTimeout(e.retryTimer), (e.retryTimer = null)));
}
function jD(e) {
	const { client: t } = e,
		i = t.context.userId,
		u = gD(t),
		l = Va(t.api.plugins_data.watch_documents, { collection: "channels", limit: 100 }),
		o = (0, b.useMemo)(() => (l == null ? [] : Xo(Ys).apply_window(l.docs.filter((E) => !vn(E.key)))), [l]),
		f = l !== void 0,
		h = l != null && l.truncated,
		[m, v] = (0, b.useState)([]),
		[g, _] = (0, b.useState)({}),
		[p, w] = (0, b.useState)(null),
		x = Va(t.api.plugins_data.watch_recent, { collection: "messages", limit: 100, order: "desc" }),
		R = (0, b.useMemo)(() => (x == null ? [] : Xo(cc).apply_window(x.docs)), [x]),
		z = x === null,
		[I, j] = (0, b.useState)({}),
		[N, C] = (0, b.useState)(0),
		[q, J] = (0, b.useState)(null),
		[G, k] = (0, b.useState)({}),
		[$, B] = (0, b.useState)(null),
		[Q, oe] = (0, b.useState)(null),
		[le, te] = (0, b.useState)(!1),
		[ne, O] = (0, b.useState)(null),
		[V, P] = (0, b.useState)(!1),
		[ve, ye] = (0, b.useState)(!1),
		[Be, M] = (0, b.useState)(!1),
		[L, se] = (0, b.useState)(!1),
		[ce, he] = (0, b.useState)(!1),
		[we, pe] = (0, b.useState)(null),
		[qe, Ie] = (0, b.useState)(!1),
		[st, Bt] = (0, b.useState)({ sequence: 0, text: "" }),
		[bt, ct] = (0, b.useState)(""),
		[yt, _e] = (0, b.useState)(!1),
		Ae = (0, b.useRef)(null),
		Je = (0, b.useRef)(null),
		De = (0, b.useRef)(null),
		wt = (0, b.useRef)(null),
		_t = (0, b.useRef)(null),
		fe = (0, b.useRef)(null),
		Re = (0, b.useRef)(null),
		St = (0, b.useRef)(new Set());
	St.current = new Set(o.map((E) => E.key));
	const Ne = (0, b.useRef)(null),
		ft = (0, b.useRef)(null),
		Ot = (0, b.useRef)(null),
		rt = (0, b.useRef)(null),
		Et = (0, b.useRef)(new Map()),
		On = (0, b.useRef)(new Map()),
		Xn = (0, b.useRef)(new Map()),
		An = (0, b.useRef)(new Set()),
		Kt = (0, b.useRef)(new Map()),
		Rn = (0, b.useRef)(new Map()),
		Ve = (0, b.useRef)(new Map()),
		cn = (0, b.useRef)(new Set()),
		qt = (0, b.useRef)(new Map()),
		jr = (0, b.useRef)(new Map()),
		zn = (0, b.useRef)(new Map()),
		Jn = (0, b.useRef)(new Map()),
		gn = (0, b.useRef)(new Map()),
		un = (0, b.useRef)(new Set()),
		Dn = (0, b.useRef)(new Map()),
		yn = (0, b.useRef)(0),
		It = (0, b.useRef)(!0),
		zt = (0, b.useRef)(new Map()),
		Di = (0, b.useRef)(new Set()),
		fn = (0, b.useRef)(new Map()),
		dn = (0, b.useRef)(new Map()),
		jn = (0, b.useRef)(null),
		[Wn, xr] = (0, b.useState)(!1),
		er = (0, b.useCallback)(
			(E, A) => {
				const H = Re.current;
				if (H !== null && H.revision > E) return;
				const Y = Date.now(),
					de = {
						key: th(i),
						value: A,
						revision: E,
						createdBy: i,
						updatedBy: i,
						createdAt: H?.createdAt ?? Y,
						updatedAt: Y,
						ownership: "owned",
						timestamp: H?.timestamp ?? Y,
					};
				((Re.current = de), w(de));
			},
			[i],
		),
		ji = (0, b.useCallback)(
			function E() {
				const A = rt.current,
					H = Re.current,
					Y = H?.revision ?? 0;
				if (
					!It.current ||
					A === null ||
					A.running ||
					A.retryTimer !== null ||
					(Y === A.attemptedRevision && !A.retryCurrentRevision)
				)
					return;
				if (A.waitBeforeRetry) {
					const ke = A.retryDelayMs;
					((A.waitBeforeRetry = !1),
						(A.retryTimer = setTimeout(() => {
							((A.retryTimer = null), (A.retryDelayMs = Math.min(ke * 2, Fp)), E());
						}, ke)));
					return;
				}
				const de = { channels: A.channels };
				((A.channels = {}), (A.attemptedRevision = Y), (A.retryCurrentRevision = !1));
				const me = A.needsCompaction;
				A.needsCompaction = !1;
				const be = ju(H?.value ?? { channels: {} }, de),
					Oe = me
						? { channels: Object.fromEntries(Object.entries(be.channels).filter(([ke]) => St.current.has(ke))) }
						: be;
				if (me && Object.keys(Oe.channels).length === Object.keys(be.channels).length) {
					((A.channels = ju({ channels: A.channels }, de).channels),
						(A.needsCompaction = !0),
						console.warn("[chitchat] The read-cursor map is still too large after cleanup"));
					return;
				}
				((A.running = !0),
					t.convex
						.mutation(t.api.plugins_data.user_put_owned_document, {
							collection: "cursors",
							key: "me",
							value: Oe,
							expectedRevision: Y,
						})
						.then((ke) => {
							if (((A.running = !1), !(!It.current || rt.current !== A))) {
								if (ke._yay) ((A.retryDelayMs = oa), er(ke._yay.revision, Oe));
								else if (ke._nay.name === "conflict")
									((A.channels = ju({ channels: A.channels }, de).channels),
										(A.needsCompaction ||= me),
										(A.retryCurrentRevision = A.waitBeforeRetry),
										(A.retryDelayMs = oa));
								else if (ke._nay.name === "storage_full") {
									if (
										((A.channels = ju({ channels: A.channels }, de).channels),
										(A.needsCompaction = !0),
										(A.retryCurrentRevision = !0),
										(A.retryDelayMs = oa),
										me)
									) {
										console.warn("[chitchat] The compacted read-cursor retry was refused", {
											message: ke._nay.message,
										});
										return;
									}
								} else console.warn("[chitchat] A read-cursor retry was refused", { message: ke._nay.message });
								if (Object.keys(A.channels).length === 0) {
									rt.current = null;
									return;
								}
								E();
							}
						})
						.catch(() => {
							((A.running = !1),
								!(!It.current || rt.current !== A) &&
									((A.channels = ju({ channels: A.channels }, de).channels),
									(A.needsCompaction ||= me),
									(A.retryCurrentRevision = !0),
									(A.waitBeforeRetry = !0),
									E()));
						}));
			},
			[er, t],
		),
		qi = (E, A, H) => {
			if (!It.current) return;
			const Y = rt.current ?? {
				channels: {},
				attemptedRevision: A,
				running: !1,
				needsCompaction: !1,
				retryCurrentRevision: !1,
				waitBeforeRetry: !1,
				retryDelayMs: oa,
				retryTimer: null,
			};
			((Y.channels = ju({ channels: Y.channels }, E).channels),
				(Y.attemptedRevision = Math.max(Y.attemptedRevision, A)),
				H === "storage_full"
					? ((Y.needsCompaction = !0), (Y.retryCurrentRevision = !0))
					: H === "unavailable" && ((Y.retryCurrentRevision = !0), Y.retryTimer === null && (Y.waitBeforeRetry = !0)),
				(rt.current = Y),
				ji());
		},
		qr = (0, b.useCallback)(
			function E(A) {
				const H = () => A.storedAt >= A.pendingAt && Xs(A.storedActivity, A.pendingActivity),
					Y = (ke) => {
						if (A.cancelled || !It.current || !un.current.has(A.channelKey) || H() || A.retryTimer !== null) return;
						const Ge = A.retryDelayMs;
						A.retryTimer = setTimeout(() => {
							((A.retryTimer = null), (A.retryDelayMs = Math.min(Ge * 2, Fp)), ke());
						}, Ge);
					},
					de = () => {
						if (
							A.cancelled ||
							!It.current ||
							!un.current.has(A.channelKey) ||
							!A.waitingForRefresh ||
							A.running ||
							A.retryTimer !== null
						)
							return;
						A.running = !0;
						const ke = `${W0(A.channelKey)}:${i}`;
						t.fetchJson("/api/v1/plugin-data/read", { body: { collection: "channels", key: ke } })
							.then((Ge) => {
								if (zt.current.get(A.channelKey) !== A || A.cancelled) return;
								if (((A.running = !1), !A.waitingForRefresh)) {
									E(A);
									return;
								}
								const Lt = Zo.safeParse(Ge),
									kn = Lt.success ? ep(Lt.data.document) : null;
								if (kn !== null && kn.key === ke && kn.channelKey === A.channelKey && kn.createdBy === i && Wp(A, kn)) {
									((A.retryDelayMs = oa), E(A));
									return;
								}
								Y(de);
							})
							.catch(() => {
								if (!(zt.current.get(A.channelKey) !== A || A.cancelled)) {
									if (((A.running = !1), !A.waitingForRefresh)) {
										E(A);
										return;
									}
									Y(de);
								}
							});
					};
				if (A.running || A.retryTimer !== null || A.cancelled || !un.current.has(A.channelKey)) return;
				if (A.waitingForRefresh) {
					de();
					return;
				}
				if (H()) {
					zt.current.delete(A.channelKey);
					return;
				}
				const me = Math.max(A.pendingAt, A.storedAt),
					be = Ti(A.pendingActivity, A.storedActivity),
					Oe = A.revision;
				((A.running = !0),
					t.convex
						.mutation(t.api.plugins_data.user_put_owned_document, {
							collection: "channels",
							key: W0(A.channelKey),
							value: { at: me, activity: be },
							expectedRevision: Oe,
						})
						.then((ke) => {
							if (!(zt.current.get(A.channelKey) !== A || A.cancelled)) {
								if (((A.running = !1), ke._yay)) {
									((A.retryDelayMs = oa),
										(A.revision = Math.max(A.revision, ke._yay.revision)),
										(A.storedAt = Math.max(A.storedAt, me)),
										(A.storedActivity = Ti(A.storedActivity, be)),
										E(A));
									return;
								}
								if (ke._nay.name === "conflict") {
									if (A.revision !== Oe) {
										E(A);
										return;
									}
									((A.waitingForRefresh = !0), de());
									return;
								}
								(console.warn("[chitchat] A private read-cursor write was refused", { message: ke._nay.message }),
									zt.current.delete(A.channelKey));
							}
						})
						.catch((ke) => {
							zt.current.get(A.channelKey) !== A ||
								A.cancelled ||
								((A.running = !1),
								console.warn("[chitchat] A private read-cursor write failed", { message: Un(ke) }),
								Y(() => E(A)));
						}));
			},
			[t, i],
		),
		tr = (0, b.useMemo)(() => new Set(m.map((E) => E.scopeId)), [m]),
		Ir = (0, b.useMemo)(
			() => m.map((E) => ({ scopeId: E.scopeId, keyPrefix: E.keyPrefix, collections: E.collections })),
			[
				JSON.stringify(
					m
						.map((E) => ({ scopeId: E.scopeId, keyPrefix: E.keyPrefix, collections: [...E.collections].sort() }))
						.sort((E, A) => E.scopeId.localeCompare(A.scopeId)),
				),
			],
		),
		qn = (0, b.useMemo)(() => [...Ir].sort((E, A) => E.scopeId.localeCompare(A.scopeId)).slice(0, Yp), [Ir]),
		dt = (0, b.useMemo)(() => {
			const E = [...Ir].sort((H, Y) => H.scopeId.localeCompare(Y.scopeId)),
				A = q !== null && vn(q) ? E.find((H) => H.scopeId === q) : void 0;
			return A === void 0 || qn.some((H) => H.scopeId === A.scopeId)
				? qn
				: [A, ...E.filter((H) => H.scopeId !== A.scopeId).slice(0, 7)].sort((H, Y) =>
						H.scopeId.localeCompare(Y.scopeId),
					);
		}, [qn, Ir, q]),
		Yt = (0, b.useMemo)(() => new Set(dt.map((E) => E.scopeId)), [dt]),
		Ft = [...o, ...Object.entries(g).flatMap(([E, A]) => (tr.has(E) && Yt.has(E) ? A : []))].sort((E, A) =>
			E.value.name.localeCompare(A.value.name),
		),
		Ar = new Map(
			Object.entries(I).flatMap(([E, A]) => (tr.has(E) && Yt.has(E) ? A.map((H) => [H.channelKey, H]) : [])),
		),
		Jr = new Map(m.map((E) => [E.scopeId, DD(E)])),
		Rr = (0, b.useMemo)(() => qk({ docs: R, cursorChannels: p?.value.channels ?? {}, selfUserId: i }), [R, p, i]),
		Ii = (E) => {
			if (E.key === q || E.value.archivedAt !== null) return !1;
			if (vn(E.key)) {
				const A = Jr.get(E.key)?.activity ?? Sr;
				return !Xs(Ar.get(E.key)?.activity ?? Sr, A);
			}
			return Rr.has(E.key);
		},
		Wr = (E) => (vn(E.key) ? (Ar.get(E.key)?.at ?? 0) : (p?.value.channels[E.key] ?? 0)),
		Lr = (E) => (E.key === q || E.value.archivedAt !== null ? 0 : (Rr.get(E.key)?.mentionCount ?? 0)),
		W = (0, b.useId)(),
		ge = (0, b.useId)(),
		Me = (0, b.useCallback)((E) => {
			Bt((A) => ({ sequence: A.sequence + 1, text: E }));
		}, []),
		Ye = (0, b.useCallback)((E) => {
			const A = (On.current.get(E) ?? 0) + 1;
			(On.current.set(E, A), k(Object.fromEntries(On.current)));
		}, []),
		Ue = (0, b.useCallback)((E) => {
			const A = On.current.get(E) ?? 0;
			A !== 0 && (A === 1 ? On.current.delete(E) : On.current.set(E, A - 1), k(Object.fromEntries(On.current)));
		}, []),
		We = (0, b.useCallback)(
			(E) => {
				if (!cn.current.has(E.scopeId) || (jr.current.get(E.scopeId) ?? -1) >= E.membershipRevision) return;
				const A = zn.current.get(E.scopeId);
				if (A !== void 0) {
					A.scope = E;
					return;
				}
				const H = { scope: E, running: !1, retryDelayMs: Gp, retryTimer: null, cancelled: !1 };
				zn.current.set(E.scopeId, H);
				const Y = () => It.current && !H.cancelled && zn.current.get(E.scopeId) === H,
					de = () => {
						(wh(H), zn.current.get(E.scopeId) === H && zn.current.delete(E.scopeId));
					},
					me = () => {
						const Oe = H.scope;
						(de(),
							cn.current.delete(Oe.scopeId),
							jr.current.delete(Oe.scopeId),
							fn.current.delete(Oe.scopeId),
							An.current.delete(Oe.scopeId),
							Kt.current.delete(Oe.scopeId),
							Rn.current.delete(Oe.scopeId));
						const ke = new Set(un.current);
						(ke.add(Oe.scopeId),
							(un.current = ke),
							Jn.current.set(Oe.scopeId, Oe.membershipRevision),
							(yn.current += 1),
							v((Ge) => {
								const Lt = Ge.findIndex((kr) => kr.scopeId === Oe.scopeId);
								if (Lt === -1) return [...Ge, Oe];
								const kn = [...Ge];
								return ((kn[Lt] = Oe), kn);
							}),
							C(yn.current));
					},
					be = () => {
						if (!Y() || H.running || H.retryTimer !== null) return;
						H.running = !0;
						const Oe = H.scope.membershipRevision,
							ke = () => {
								if (!Y() || H.retryTimer !== null) return;
								const Lt = H.retryDelayMs;
								H.retryTimer = setTimeout(() => {
									((H.retryTimer = null), (H.retryDelayMs = Math.min(Lt * 2, Xp)), be());
								}, Lt);
							},
							Ge = () => {
								if (((H.running = !1), H.scope.membershipRevision !== Oe)) {
									be();
									return;
								}
								(jr.current.set(E.scopeId, Oe), de());
							};
						Promise.resolve()
							.then(() => t.fetchJson("/api/v1/plugin-data/read", { body: { collection: "channels", key: E.scopeId } }))
							.then((Lt) => {
								if (!Y()) return;
								const kn = Zo.safeParse(Lt);
								if (!kn.success) {
									((H.running = !1), ke());
									return;
								}
								if (kn.data.document === null) {
									Ge();
									return;
								}
								const kr = Ys(kn.data.document);
								if (kn.data.document.collection !== "channels" || kr === null || kr.key !== E.scopeId || !vn(kr.key)) {
									((H.running = !1), ke());
									return;
								}
								return t.convex.query(t.api.plugins_data.watch_scope_principals, { scopeId: kr.key }).then((iu) => {
									if (!Y()) return;
									H.running = !1;
									const ls = tl(iu);
									if (ls === null) {
										ke();
										return;
									}
									const bn = ls._yay;
									if (bn === null) {
										Ge();
										return;
									}
									if (H.scope.membershipRevision !== Oe) {
										be();
										return;
									}
									if (bn.some((ri) => ri.userId === i)) {
										me();
										return;
									}
									(jr.current.set(E.scopeId, Oe), de());
								});
							})
							.catch(() => {
								Y() && ((H.running = !1), ke());
							});
					};
				be();
			},
			[t, i],
		);
	((0, b.useEffect)(() => {
		if (st.text === "") return;
		ct("");
		const E = requestAnimationFrame(() => ct(st.text));
		return () => cancelAnimationFrame(E);
	}, [st]),
		(0, b.useEffect)(() => {
			const E = (H) => {
					const Y = H.target;
					Y instanceof Node && !Ae.current?.contains(Y) && (_t.current = null);
				},
				A = () => {
					_t.current = null;
				};
			return (
				document.addEventListener("focusin", E),
				window.addEventListener("blur", A),
				() => {
					(document.removeEventListener("focusin", E), window.removeEventListener("blur", A));
				}
			);
		}, []),
		(0, b.useEffect)(() => {
			const E = window.matchMedia("(max-width: 719px)");
			_e(E.matches);
			const A = (H) => {
				const Y = _t.current;
				((fe.current = H.matches
					? Q !== null && (Y === "sidebar" || Y === "separator")
						? "thread"
						: Y === "sidebar" && !qe
							? "drawer"
							: null
					: Y === "drawer"
						? "selected"
						: null),
					_e(H.matches));
			};
			return (E.addEventListener("change", A), () => E.removeEventListener("change", A));
		}, [qe, Q]),
		(0, b.useLayoutEffect)(() => {
			const E = fe.current;
			fe.current = null;
			const A = () => {
				const H = Ae.current?.querySelector(".thread") ?? null;
				if (H === null) return !1;
				const Y = H?.querySelector(".thread-head button") ?? null;
				return (
					Y?.focus(),
					document.activeElement !== Y && H.focus(),
					document.activeElement === Y || document.activeElement === H
				);
			};
			if (E === "drawer") (Q === null || !A()) && De.current?.focus();
			else if (E === "thread") A() || De.current?.focus();
			else if (E === "selected") {
				const H = Je.current?.querySelector('[aria-current="page"]') ?? null;
				(H?.focus(), document.activeElement !== H && Je.current?.focus());
			}
		}, [yt, Q]));
	const hn = Va(t.api.plugins_data.watch_my_scopes, {});
	(0, b.useEffect)(() => {
		if (hn == null) return;
		const E = hn.filter(OD);
		qt.current = new Map(E.map((Y) => [Y.scopeId, Y]));
		for (const [Y, de] of zn.current) qt.current.has(Y) || (wh(de), zn.current.delete(Y));
		const A = E.filter((Y) => (cn.current.has(Y.scopeId) ? (We(Y), !1) : !0)),
			H = new Set(A.map((Y) => Y.scopeId));
		for (const [Y, de] of zt.current) H.has(Y) || (Jp(de), zt.current.delete(Y));
		((Jn.current = new Map(A.map((Y) => [Y.scopeId, Y.membershipRevision]))),
			(yn.current += 1),
			(un.current = H),
			v(A),
			C(yn.current));
	}, [hn, We]);
	const ut = rc(
		(0, b.useMemo)(
			() =>
				Object.fromEntries(
					dt.map((E) => [
						E.scopeId,
						{
							query: t.api.plugins_data.watch_documents,
							args: { collection: "channels", keyPrefix: E.keyPrefix, limit: 100 },
						},
					]),
				),
			[t, dt],
		),
	);
	(0, b.useEffect)(() => {
		for (const E of Dn.current.keys()) dt.some((A) => A.scopeId === E) || Dn.current.delete(E);
		for (const E of dt) {
			const A = ut[E.scopeId];
			if (A == null || A instanceof Error || Dn.current.get(E.scopeId) === A) continue;
			Dn.current.set(E.scopeId, A);
			const H = Xo(Ys).apply_window(A.docs.filter((de) => de.key === E.scopeId));
			_((de) => ({ ...de, [E.scopeId]: H }));
			const Y = A.docs.map(ep).filter((de) => de !== null && de.channelKey === E.scopeId && de.createdBy === i);
			for (const de of Y) {
				const me = zt.current.get(de.channelKey);
				me !== void 0 &&
					Wp(me, de) &&
					(me.retryTimer !== null && (clearTimeout(me.retryTimer), (me.retryTimer = null)),
					(me.retryDelayMs = oa),
					qr(me));
			}
			j((de) => ({ ...de, [E.scopeId]: Y }));
		}
	}, [ut, dt, qr, i]);
	const sn = rc(
		(0, b.useMemo)(
			() => ({
				cursors: {
					query: t.api.plugins_data.watch_documents,
					args: { collection: "cursors", keyPrefix: th(i), limit: 1 },
				},
			}),
			[t, i],
		),
	).cursors;
	((0, b.useEffect)(() => {
		if (sn === void 0) return;
		const E = th(i),
			A =
				sn === null || sn instanceof Error
					? null
					: (sn.docs.map(jk).find((H) => H !== null && H.key === E && H.createdBy === i && H.ownership === "owned") ??
						null);
		(w(A), (Re.current = A));
	}, [sn, i]),
		(0, b.useEffect)(() => {
			if (q === null) {
				const E = Ft.find((A) => A.value.archivedAt === null);
				E !== void 0 && J((A) => A ?? E.key);
			}
		}, [Ft, q]),
		(0, b.useEffect)(() => {
			let E = !1;
			for (const [A, H] of dn.current) {
				const Y = Ft.find((de) => de.key === H.channelKey);
				if (Y === void 0) {
					(dn.current.delete(A), (E = !0));
					continue;
				}
				Y.revision <= H.sourceRevision ||
					(dn.current.delete(A), (Y.value.archivedAt !== null) === H.archived && (E = !0));
			}
			E && xr(!0);
		}, [Ft]),
		(0, b.useEffect)(() => {
			qe && Je.current?.focus();
		}, [qe]));
	const Ur = () => window.matchMedia("(max-width: 719px)").matches,
		tu = (E, A) => {
			const H = Re.current,
				Y = H?.value.channels ?? {};
			if ((Y[E] ?? 0) >= A) return;
			const de = { channels: { ...Y, [E]: A } },
				me = H?.revision ?? 0;
			t.convex
				.mutation(t.api.plugins_data.user_put_owned_document, {
					collection: "cursors",
					key: "me",
					value: de,
					expectedRevision: me,
				})
				.then((be) => {
					if (be._yay) {
						er(be._yay.revision, de);
						return;
					}
					if (be._nay.name === "conflict") {
						qi(de, me, "conflict");
						return;
					}
					if (be._nay.name === "storage_full") {
						qi(de, me, "storage_full");
						return;
					}
					console.warn("[chitchat] A read-cursor write was refused", { message: be._nay.message });
				})
				.catch((be) => {
					(console.warn("[chitchat] A read-cursor write failed", { message: Un(be) }), qi(de, me, "unavailable"));
				});
		},
		Rl = (E, A, H) => {
			if (!un.current.has(E.key)) return;
			const Y = zt.current.get(E.key);
			if (Y !== void 0) {
				((Y.pendingAt = Math.max(Y.pendingAt, A)), (Y.pendingActivity = Ti(Y.pendingActivity, H)), qr(Y));
				return;
			}
			const de = Ar.get(E.key);
			if ((de?.at ?? 0) >= A && Xs(de?.activity ?? Sr, H)) return;
			const me = {
				channelKey: E.key,
				pendingAt: A,
				pendingActivity: H,
				storedAt: de?.at ?? 0,
				storedActivity: de?.activity ?? Sr,
				revision: de?.revision ?? 0,
				running: !1,
				waitingForRefresh: !1,
				retryDelayMs: oa,
				retryTimer: null,
				cancelled: !1,
			};
			(zt.current.set(E.key, me), qr(me));
		},
		Cl = (E, A, H) => {
			vn(E.key) ? Rl(E, A, H ?? Sr) : tu(E.key, A);
		},
		ba = (E, A = !0) => {
			const H = Et.current.get(E);
			if ((H !== void 0 && (clearTimeout(H), Et.current.delete(E)), Xn.current.delete(E), A)) {
				const Y = zt.current.get(E);
				Y !== void 0 && ((Y.cancelled = !0), Y.retryTimer !== null && clearTimeout(Y.retryTimer), zt.current.delete(E));
			}
		},
		Li = (E, A, H) => {
			const Y = Xn.current.get(E.key);
			(Xn.current.set(E.key, {
				channel: E,
				at: Math.max(Y?.at ?? 0, A),
				activity: H === null ? null : Ti(Y?.activity ?? Sr, H),
			}),
				!Et.current.has(E.key) &&
					Et.current.set(
						E.key,
						setTimeout(() => {
							Et.current.delete(E.key);
							const de = Xn.current.get(E.key);
							(Xn.current.delete(E.key), de !== void 0 && !An.current.has(E.key) && Cl(de.channel, de.at, de.activity));
						}, RD),
					));
		},
		Cr = (E, A) => {
			const H = vn(E.key) ? Jr.get(E.key) : void 0,
				Y = { channel: E, at: Math.max(A, H?.at ?? 0), activity: H?.activity ?? (vn(E.key) ? Sr : null) };
			if (An.current.has(E.key)) {
				const de = Kt.current.get(E.key);
				Kt.current.set(E.key, {
					channel: E,
					at: Math.max(de?.at ?? 0, Y.at),
					activity: Y.activity === null ? null : Ti(de?.activity ?? Sr, Y.activity),
				});
				return;
			}
			Li(E, Y.at, Y.activity);
		},
		ln = q === null ? void 0 : Jr.get(q),
		nu = ln?.at ?? 0;
	((0, b.useEffect)(() => {
		if (q === null || ln === void 0 || !vn(q)) return;
		const E = Ft.find((H) => H.key === q),
			A = Ar.get(q);
		E !== void 0 && ((A?.at ?? 0) < nu || !Xs(A?.activity ?? Sr, ln.activity)) && Li(E, nu, ln.activity);
	}, [q, nu, ln?.activity.messages ?? 0, ln?.activity.replies ?? 0]),
		(0, b.useEffect)(() => {
			const E = Di.current;
			for (const A of tr) fn.current.delete(A);
			for (const A of E) {
				if (tr.has(A)) continue;
				const H = g[A]?.find((Y) => Y.key === A);
				(H !== void 0 && fn.current.set(A, H), ba(A));
			}
			Di.current = new Set(tr);
		}, [tr, g]),
		(0, b.useEffect)(() => {
			if (ne !== null) return;
			let E = !1;
			for (const [A, H] of fn.current) {
				const Y = Rn.current.get(A);
				if (Y === "pending") continue;
				const de = Y !== void 0;
				(Me(
					Y === "deleted"
						? `Deleted #${H.value.name}`
						: Y === "left"
							? `Left #${H.value.name}`
							: Y === "delete_unconfirmed"
								? `You no longer have access to #${H.value.name}. The Delete request could not be confirmed.`
								: Y === "leave_unconfirmed"
									? `You no longer have access to #${H.value.name}. The Leave request could not be confirmed.`
									: `You were removed from #${H.value.name}.`,
				),
					q === A && (J(null), oe(null), B(null)),
					(q === A || de) && (E = !0),
					An.current.delete(A),
					Kt.current.delete(A),
					Rn.current.delete(A),
					fn.current.delete(A));
			}
			E && xr(!0);
		}, [Me, ne, tr, q]),
		(0, b.useLayoutEffect)(() => {
			if (!Wn || ne !== null) return;
			const E = document.activeElement;
			if (E instanceof HTMLElement && E !== document.body && E.isConnected) {
				xr(!1);
				return;
			}
			if (yt && !qe) {
				if (Q !== null) {
					const A = Ae.current?.querySelector(".thread-head button") ?? null;
					if (A !== null && (A.focus(), document.activeElement === A)) {
						xr(!1);
						return;
					}
				}
				(xr(!1), De.current?.focus());
			} else (xr(!1), Je.current?.focus());
		}, [ne, qe, yt, Wn, Q]),
		(0, b.useEffect)(() => {
			const E = jn.current;
			if (!(E === null || ne !== null)) {
				if (((jn.current = null), yt && !qe)) {
					if (Q !== null) {
						const A = Ae.current?.querySelector(".thread-head button") ?? null;
						if (A !== null && (A.focus(), document.activeElement === A)) return;
					}
					De.current?.focus();
					return;
				}
				for (const A of Ae.current?.querySelectorAll(".channel-item") ?? [])
					if (A.dataset.channelKey === E) {
						const H = A.querySelector(".ChannelRowMenu-trigger");
						if (H !== null && (H.focus(), document.activeElement === H)) return;
					}
				Je.current?.focus();
			}
		}, [ne, qe, yt, Q]));
	const is = () => (q === null || (On.current.get(q) ?? 0) === 0 ? !1 : (Me(_h), !0)),
		Ui = (E) => {
			if ((E.key !== q || Q !== null) && is()) return !1;
			if ((J(E.key), oe(null), Ii(E) || Lr(E) > 0)) {
				B(Wr(E));
				const A = Jr.get(E.key),
					H = Rr.get(E.key)?.latest.timestamp ?? 0;
				Cl(E, A?.at ?? H, A?.activity ?? null);
			} else B(null);
			return (Me(`#${E.value.name}`), qe && Ur() && (Ie(!1), De.current?.focus()), !0);
		},
		kl = (E) => {
			(E.key !== q && is()) || (J(E.key), oe(null), Me(E.name), qe && Ur() && (Ie(!1), De.current?.focus()));
		},
		ru = (E, A) => {
			Ui(E) && oe(A);
		},
		Hc = () => {
			is() || O({ kind: "create" });
		};
	((0, b.useEffect)(() => {
		ji();
	}, [p, o, ji]),
		(0, b.useEffect)(
			() => (
				(It.current = !0),
				() => {
					It.current = !1;
					const E = rt.current;
					(E !== null && E.retryTimer !== null && clearTimeout(E.retryTimer), (rt.current = null));
					for (const H of Et.current.values()) clearTimeout(H);
					(Et.current.clear(), Xn.current.clear());
					for (const H of zt.current.values()) Jp(H);
					(zt.current.clear(), An.current.clear(), Kt.current.clear(), Rn.current.clear());
					for (const H of Ve.current.values()) Sh(H);
					Ve.current.clear();
					for (const H of zn.current.values()) wh(H);
					(zn.current.clear(),
						cn.current.clear(),
						jr.current.clear(),
						qt.current.clear(),
						Jn.current.clear(),
						gn.current.clear(),
						On.current.clear());
					const A = ft.current;
					A !== null && (Yo(A), (ft.current = null));
				}
			),
			[],
		));
	const pn = (E) => {
			const A = Ve.current.get(E);
			(A !== void 0 && (Sh(A), Ve.current.delete(E)), gn.current.delete(E), An.current.delete(E), Rn.current.delete(E));
			const H = Kt.current.get(E);
			(Kt.current.delete(E), It.current && H !== void 0 && un.current.has(E) && Li(H.channel, H.at, H.activity));
		},
		Cn = () => {
			(ne?.kind === "exit" && Ve.current.has(ne.channel.key) && pn(ne.channel.key), (Ne.current = null));
			const E = ft.current;
			(E !== null && Yo(E),
				(ft.current = null),
				M(!1),
				se(!1),
				(Ot.current = null),
				he(!1),
				ye(!1),
				O(null),
				P(!1),
				pe(null));
		},
		as = (E) => {
			(fn.current.delete(E), pn(E), (jn.current = E), Cn());
		},
		$i = (E, A) => {
			const H = Ve.current.get(E.key);
			(H !== void 0 && (Sh(H), Ve.current.delete(E.key)),
				gn.current.delete(E.key),
				Rn.current.set(E.key, A),
				fn.current.set(E.key, E));
			const Y = new Set(un.current);
			(Y.delete(E.key),
				(un.current = Y),
				Jn.current.delete(E.key),
				v((de) => de.filter((me) => me.scopeId !== E.key)),
				Cn());
		},
		ei = (E) => {
			const A = () => It.current && !E.cancelled && Ve.current.get(E.channel.key) === E,
				H = () => {
					(cn.current.add(E.channel.key),
						jr.current.delete(E.channel.key),
						$i(E.channel, E.action === "leave" ? "left" : "delete_unconfirmed"));
					const de = qt.current.get(E.channel.key);
					de !== void 0 && We(de);
				},
				Y = () => {
					if (!A() || E.retryTimer !== null) return;
					const de = E.retryDelayMs;
					E.retryTimer = setTimeout(() => {
						((E.retryTimer = null), (E.retryDelayMs = Math.min(de * 2, Xp)), ei(E));
					}, de);
				};
			!A() ||
				E.running ||
				E.retryTimer !== null ||
				((E.running = !0),
				Promise.resolve()
					.then(() => t.fetchJson("/api/v1/plugin-data/read", { body: { collection: "channels", key: E.channel.key } }))
					.then((de) => {
						if (!A()) return;
						const me = Zo.safeParse(de);
						if (!me.success) {
							((E.running = !1), Y());
							return;
						}
						if (me.data.document === null) {
							((E.running = !1), H());
							return;
						}
						const be = Ys(me.data.document);
						if (me.data.document.collection !== "channels" || be === null || be.key !== E.channel.key || !vn(be.key)) {
							((E.running = !1), Y());
							return;
						}
						return t.convex.query(t.api.plugins_data.watch_scope_principals, { scopeId: be.key }).then((Oe) => {
							if (!A()) return;
							E.running = !1;
							const ke = tl(Oe);
							if (ke === null) {
								Y();
								return;
							}
							const Ge = ke._yay;
							if (Ge === null) {
								H();
								return;
							}
							if (!Ge.some((Lt) => Lt.userId === i)) {
								H();
								return;
							}
							(fn.current.delete(be.key), pn(be.key), ye(!1), P(!1));
						});
					})
					.catch(() => {
						A() && ((E.running = !1), Y());
					}));
		},
		Ml = (E, A, H) => {
			if (An.current.has(E.key)) return;
			if ((On.current.get(E.key) ?? 0) > 0) {
				(P(!1), pe(_h), Me(_h));
				return;
			}
			const Y = Xn.current.get(E.key);
			if (Y !== void 0) {
				const be = Kt.current.get(E.key);
				Kt.current.set(E.key, {
					channel: Y.channel,
					at: Math.max(be?.at ?? 0, Y.at),
					activity: Y.activity === null ? null : Ti(be?.activity ?? Sr, Y.activity),
				});
			}
			(An.current.add(E.key), Rn.current.set(E.key, "pending"), ba(E.key, !1), P(!0), pe(null));
			const de = t.convex.mutation(t.api.plugins_data.user_manage_scope, {
					action:
						A === "delete"
							? { kind: "delete", scopeId: E.key, ...(H === void 0 ? {} : { expectedPrincipalCount: H }) }
							: {
									kind: "remove_principal",
									scopeId: E.key,
									userId: i,
									...(H === void 0 ? {} : { expectedPrincipalCount: H }),
								},
				}),
				me = (be) => {
					const Oe = { channel: E, action: A, running: !1, retryDelayMs: Gp, retryTimer: null, cancelled: !1 };
					(Ve.current.set(E.key, Oe), P(!1), ye(!0), pe(be), ei(Oe));
				};
			de.then((be) => {
				if (It.current) {
					if (be._nay) {
						(pn(E.key),
							P(!1),
							pe(
								be._nay.name === "conflict"
									? "Who is in this channel changed. Close it and try again."
									: be._nay.message,
							));
						return;
					}
					if (A === "leave" && !be._yay.deleted) {
						const Oe = Jn.current.get(E.key);
						if (Oe === void 0) {
							$i(E, "left");
							return;
						}
						if (Oe > be._yay.membershipRevision) {
							as(E.key);
							return;
						}
						gn.current.set(E.key, { channel: E, membershipRevision: be._yay.membershipRevision });
						return;
					}
					$i(E, be._yay.deleted ? "deleted" : "left");
				}
			}).catch((be) => {
				It.current && me(Un(be));
			});
		};
	(0, b.useEffect)(() => {
		for (const [E, A] of gn.current) {
			const H = Jn.current.get(E);
			if (H === void 0) {
				$i(A.channel, "left");
				continue;
			}
			H > A.membershipRevision && as(E);
		}
	}, [N]);
	const us = (E) => {
		const A = () => It.current && !E.cancelled && ft.current === E,
			H = () => {
				if (!A() || E.retryTimer !== null) return;
				const de = E.retryDelayMs;
				E.retryTimer = setTimeout(() => {
					((E.retryTimer = null), (E.retryDelayMs = Math.min(de * 2, kD)), us(E));
				}, de);
			},
			Y = (de) => {
				(Yo(E), (ft.current = null), M(!0), se(!1), P(!1), pe(de));
			};
		!A() ||
			E.running ||
			E.retryTimer !== null ||
			((E.running = !0),
			Promise.resolve()
				.then(() => t.fetchJson("/api/v1/plugin-data/read", { body: { collection: "channels", key: E.key } }))
				.then((de) => {
					if (!A()) return;
					const me = Zo.safeParse(de);
					if (!me.success) {
						((E.running = !1), H());
						return;
					}
					if (me.data.document === null) {
						((E.running = !1), Y(MD));
						return;
					}
					const be = Ys(me.data.document);
					if (me.data.document.collection !== "channels" || be === null || be.key !== E.key || !vn(be.key)) {
						((E.running = !1), H());
						return;
					}
					return t.convex.query(t.api.plugins_data.watch_scope_principals, { scopeId: be.key }).then((Oe) => {
						if (!A()) return;
						E.running = !1;
						const ke = tl(Oe);
						if (ke === null) {
							H();
							return;
						}
						const Ge = ke._yay;
						if (Ge === null || !Ge.some((Lt) => Lt.userId === i)) {
							Y(ND);
							return;
						}
						(Yo(E), (ft.current = null), J(E.key), B(null), Cn());
					});
				})
				.catch(() => {
					A() && ((E.running = !1), H());
				}));
	};
	(0, b.useEffect)(() => {
		const E = Ot.current;
		if (
			!ce ||
			E === null ||
			ne === null ||
			(ne.kind !== "rename" && ne.kind !== "archive") ||
			ne.channel.key !== E.channelKey
		)
			return;
		const A = Ft.find((H) => H.key === E.channelKey);
		if (A === void 0) {
			Cn();
			return;
		}
		if (!(A.revision <= E.expectedRevision)) {
			if (
				E.sectionMoveRequestId === null
					? A.value.name === E.value.name && (A.value.topic ?? "") === (E.value.topic ?? "")
					: A.value.archivedAt !== null
			) {
				Cn();
				return;
			}
			((Ot.current = null),
				he(!1),
				P(!1),
				O((H) =>
					H !== null && (H.kind === "rename" || H.kind === "archive") && H.channel.key === A.key
						? { ...H, channel: A }
						: H,
				),
				pe("Someone else changed this channel while the request was pending. Review it and try again."));
		}
	}, [ce, Ft, ne]);
	const Bi = (E, A, H) => {
			(P(!0), pe(null));
			const Y = Ne.current,
				de = Be && Y !== null,
				me = de
					? Y
					: {
							key: yk(H.isPrivate ? "private" : "public"),
							name: E,
							topic: A,
							isPrivate: H.isPrivate,
							userIds: [...H.userIds],
							clientRequestId: crypto.randomUUID(),
						};
			((Ne.current = me),
				M(!1),
				se(!1),
				(async () => {
					const be = (Ge) => {
						(J(Ge), B(null), Cn());
					};
					if (!me.isPrivate) {
						const Ge = await Za(t, "channel-manage", {
							action: "create",
							name: me.name,
							topic: me.topic === "" ? null : me.topic,
							clientRequestId: me.clientRequestId,
						});
						if ("_nay" in Ge) {
							if (Ge._nay.name === "unavailable") {
								(M(!0), se(!1), P(!1), pe(Ge._nay.message));
								return;
							}
							((Ne.current = null), M(!1), P(!1), pe(Ge._nay.message));
							return;
						}
						const Lt = Ge._yay.channelKey;
						if (typeof Lt != "string") {
							((Ne.current = null), M(!1), P(!1), pe("The Chitchat backend answered without a channel key"));
							return;
						}
						be(Lt);
						return;
					}
					const Oe = { name: me.name, archivedAt: null, ...(me.topic === "" ? {} : { topic: me.topic }) },
						ke = await t.convex.mutation(t.api.plugins_data.user_manage_scope, {
							action: {
								kind: "create_with_document",
								scopeId: me.key,
								collections: Nh,
								keyPrefix: me.key,
								principals: me.userIds.map((Ge) => ({ userId: Ge, level: "member" })),
								document: { collection: "channels", key: me.key, value: Oe },
							},
						});
					if (ke._nay) {
						if (de && ke._nay.name === "conflict") {
							const Ge = { key: me.key, running: !1, retryDelayMs: CD, retryTimer: null, cancelled: !1 };
							((ft.current = Ge),
								M(!0),
								se(!0),
								P(!1),
								pe("Checking whether this private channel was created."),
								us(Ge));
							return;
						}
						((Ne.current = null), M(!1), P(!1), pe(ke._nay.message));
						return;
					}
					be(me.key);
				})().catch((be) => {
					(M(!0), se(!1), P(!1), pe(Un(be)));
				}));
		},
		Nl = (E, A) => {
			const H = Ot.current,
				Y = ce && H !== null,
				de = (E.value.archivedAt !== null) != (A.archivedAt !== null),
				me = Y
					? H
					: { channelKey: E.key, value: A, expectedRevision: E.revision, sectionMoveRequestId: de ? Symbol() : null };
			((Ot.current = me),
				he(!1),
				!Y &&
					me.sectionMoveRequestId !== null &&
					dn.current.set(me.sectionMoveRequestId, {
						channelKey: me.channelKey,
						sourceRevision: me.expectedRevision,
						archived: me.value.archivedAt !== null,
					}),
				P(!0),
				pe(null),
				Za(t, "channel-manage", {
					action: "update",
					channelKey: me.channelKey,
					name: me.value.name,
					topic: me.value.topic ?? null,
					archived: me.value.archivedAt !== null,
				})
					.then((be) => {
						if ("_nay" in be) {
							if (be._nay.name === "unavailable" || (Y && be._nay.name === "conflict")) {
								(he(!0), P(!1), pe(be._nay.message));
								return;
							}
							((Ot.current = null),
								he(!1),
								me.sectionMoveRequestId !== null &&
									be._nay.name !== "conflict" &&
									dn.current.delete(me.sectionMoveRequestId),
								P(!1),
								pe(
									be._nay.name === "conflict"
										? "Someone else changed this channel while the dialog was open. Close it and try again."
										: be._nay.message,
								));
							return;
						}
						Cn();
					})
					.catch((be) => {
						(he(!0), P(!1), pe(Un(be)));
					}));
		},
		Ol = (E) => {
			const A = Symbol();
			(dn.current.set(A, { channelKey: E.key, sourceRevision: E.revision, archived: !1 }),
				Za(t, "channel-manage", { action: "update", channelKey: E.key, archived: !1 })
					.then((H) => {
						"_nay" in H &&
							(H._nay.name !== "conflict" && H._nay.name !== "unavailable" && dn.current.delete(A), Me(H._nay.message));
					})
					.catch((H) => {
						Me(Un(H));
					}));
		};
	if (l === null)
		return (0, S.jsx)("div", {
			className: "chitchat",
			children: (0, S.jsxs)("div", {
				className: "page-dead",
				role: "alert",
				children: [(0, S.jsx)("h1", { children: "Chitchat" }), (0, S.jsx)("p", { children: xD(t) })],
			}),
		});
	const ss = (E, A) => E.value.name.localeCompare(A.value.name),
		$r = Ft.filter((E) => E.value.archivedAt === null).sort(ss),
		Pc = Ft.filter((E) => E.value.archivedAt !== null).sort(ss),
		Br = Ft.find((E) => E.key === q) ?? null,
		ti = Br !== null && (G[Br.key] ?? 0) > 0,
		fr = $r.filter(Ii).length,
		_a = $r.reduce((E, A) => E + Lr(A), 0),
		Sa = Math.max(0, m.length - dt.length),
		ni = (E, A, H) =>
			A.length === 0
				? null
				: (0, S.jsxs)("div", {
						className: "channel-section",
						children: [
							(0, S.jsx)("h2", { id: H, className: "channel-section-title", children: E }),
							(0, S.jsx)("ul", {
								className: "channel-list",
								"aria-labelledby": H,
								children: A.map((Y) => {
									const de = Ii(Y),
										me = Lr(Y),
										be = m.find((Oe) => Oe.scopeId === Y.key);
									return (0, S.jsxs)(
										"li",
										{
											className: "channel-item",
											"data-channel-key": Y.key,
											children: [
												(0, S.jsxs)("button", {
													type: "button",
													className: de || me > 0 ? "channel-link is-unread" : "channel-link",
													"aria-current": Y.key === q ? "page" : void 0,
													disabled: ti && (Y.key !== q || Q !== null),
													onClick: () => Ui(Y),
													children: [
														(0, S.jsx)("span", {
															className: "channel-initial",
															"aria-hidden": "true",
															children: Y.value.name.slice(0, 1).toUpperCase(),
														}),
														(0, S.jsxs)("span", {
															className: "channel-name",
															children: [
																"#",
																Y.value.name,
																vn(Y.key) ? " (private)" : "",
																Y.value.archivedAt !== null ? " (archived)" : "",
															],
														}),
														me > 0
															? (0, S.jsxs)("span", {
																	className: "mention-badge",
																	children: [
																		me,
																		(0, S.jsx)("span", { className: "visually-hidden", children: " unread mentions" }),
																	],
																})
															: de
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
													children: (0, S.jsx)(mD, {
														channelName: Y.value.name,
														items: [
															...(vn(Y.key)
																? [
																		{
																			id: "people",
																			label: `People in #${Y.value.name}`,
																			onSelect: () => O({ kind: "people", channel: Y }),
																		},
																	]
																: []),
															{
																id: "rename",
																label: `Rename #${Y.value.name}`,
																onSelect: () => O({ kind: "rename", channel: Y }),
															},
															Y.value.archivedAt === null
																? {
																		id: "archive",
																		label: `Archive #${Y.value.name}`,
																		onSelect: () => O({ kind: "archive", channel: Y }),
																	}
																: { id: "unarchive", label: `Unarchive #${Y.value.name}`, onSelect: () => Ol(Y) },
															...(be
																? [
																		{ id: "private-exit-separator", separator: !0 },
																		{
																			id: "leave",
																			label: `Leave #${Y.value.name}`,
																			danger: !0,
																			onSelect: () => O({ kind: "exit", action: "leave", channel: Y }),
																		},
																		...(be.level === "manage"
																			? [
																					{
																						id: "delete",
																						label: `Delete #${Y.value.name} for everyone`,
																						danger: !0,
																						onSelect: () => O({ kind: "exit", action: "delete", channel: Y }),
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
										Y.key,
									);
								}),
							}),
						],
					});
	return (0, S.jsxs)("div", {
		ref: Ae,
		className: "chitchat",
		onFocusCapture: (E) => {
			const A = E.target;
			_t.current =
				A === De.current
					? "drawer"
					: Je.current?.contains(A)
						? "sidebar"
						: A.classList.contains("thread-resize")
							? "separator"
							: null;
		},
		children: [
			(0, S.jsxs)("header", {
				className: "app-bar",
				children: [
					(0, S.jsx)("h1", { className: "visually-hidden", children: "Chitchat" }),
					(0, S.jsx)("button", {
						ref: De,
						type: "button",
						className: "button drawer-toggle",
						"aria-expanded": qe,
						onClick: () => Ie((E) => !E),
						children: "Channels",
					}),
				],
			}),
			(0, S.jsx)("nav", {
				ref: Je,
				className: ["sidebar", qe ? "is-open" : "", le ? "is-expanded" : ""].filter(Boolean).join(" "),
				"aria-label": "Channels",
				tabIndex: -1,
				children: (0, S.jsxs)("div", {
					className: "sidebar-inner",
					inert: yt && !qe ? !0 : void 0,
					children: [
						(0, S.jsxs)("div", {
							className: "sidebar-head",
							children: [
								(0, S.jsx)("p", { className: "sidebar-title", children: "Chitchat" }),
								(0, S.jsx)("button", {
									ref: wt,
									type: "button",
									className: "button sidebar-expand",
									"aria-expanded": le,
									"aria-label": le ? "Collapse channel rail" : "Expand channel rail",
									onClick: () => te((E) => !E),
									children: le ? "«" : "»",
								}),
								(0, S.jsx)("button", {
									type: "button",
									className: "button sidebar-create",
									disabled: ti,
									onClick: Hc,
									children: "Create channel",
								}),
							],
						}),
						h
							? (0, S.jsx)("div", {
									className: "channel-status",
									role: "status",
									children: "Only the first 100 channels are shown.",
								})
							: null,
						Sa > 0
							? (0, S.jsx)("div", {
									className: "channel-status",
									role: "status",
									children: `This page can watch ${Yp} private channels at a time; ${Sa} more ${Sa === 1 ? "is" : "are"} hidden.`,
								})
							: null,
						(0, S.jsx)("ul", {
							className: "view-list",
							"aria-label": "Views",
							children: SD.map((E) =>
								(0, S.jsx)(
									"li",
									{
										className: "view-item",
										children: (0, S.jsxs)("button", {
											type: "button",
											className:
												E.key === "view:unreads" && (fr > 0 || _a > 0)
													? "channel-link view-link is-unread"
													: "channel-link view-link",
											"aria-current": q === E.key ? "page" : void 0,
											disabled: ti,
											onClick: () => kl(E),
											children: [
												(0, S.jsx)("span", {
													className: "channel-initial",
													"aria-hidden": "true",
													children: E.name.slice(0, 1),
												}),
												(0, S.jsx)("span", { className: "channel-name", children: E.name }),
												E.key === "view:unreads" && _a > 0
													? (0, S.jsxs)("span", {
															className: "mention-badge",
															children: [
																_a,
																(0, S.jsx)("span", { className: "visually-hidden", children: " mentions of you" }),
															],
														})
													: E.key === "view:unreads" && fr > 0
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
									E.key,
								),
							),
						}),
						f
							? Ft.length === 0
								? (0, S.jsx)("div", { className: "channel-status", children: "No channels yet" })
								: (0, S.jsxs)(S.Fragment, { children: [ni("Channels", $r, W), ni("Archived", Pc, ge)] })
							: (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading channels…" }),
					],
				}),
			}),
			(0, S.jsx)("main", {
				className: "main",
				children:
					q === "view:unreads"
						? (0, S.jsx)(wD, {
								channels: $r,
								publicUnreads: Rr,
								privateCursors: Ar,
								privateActivity: Jr,
								recentDead: z,
								memberNames: u,
								onSelectChannel: Ui,
							})
						: q === "view:threads"
							? (0, S.jsx)(TD, { client: t, channels: $r, memberNames: u, onOpenThread: ru })
							: q === "view:activity"
								? (0, S.jsx)(ED, {
										feed: R,
										channels: $r,
										selfUserId: i,
										recentDead: z,
										memberNames: u,
										onSelectChannel: Ui,
									})
								: Br !== null
									? (0, S.jsx)(
											Mz,
											{
												client: t,
												userId: i,
												channel: Br,
												memberNames: u,
												announce: Me,
												threadRootKey: Q,
												setThreadRootKey: oe,
												isNarrow: yt,
												onRequestStart: () => Ye(Br.key),
												onRequestSettled: () => Ue(Br.key),
												sendInFlight: ti,
												onNewestVisible: (E) => Cr(Br, E),
												openedAtLastReadAt: $,
											},
											Br.key,
										)
									: f
										? Ft.length === 0
											? (0, S.jsx)("div", {
													className: "channel-status",
													children: (0, S.jsx)("span", { children: "No channels yet — create the first one." }),
												})
											: (0, S.jsx)("div", { className: "channel-status", children: "Select a channel." })
										: (0, S.jsx)("div", { className: "channel-status", role: "status", children: "Loading channels…" }),
			}),
			ne !== null && ne.kind === "create"
				? (0, S.jsx)(Kp, {
						title: "Create channel",
						submitLabel: "Create",
						initialName: "",
						initialTopic: "",
						privacy: { client: t, selfUserId: i },
						busy: V,
						waiting: L,
						fieldsLocked: Be,
						error: we,
						onSubmit: Bi,
						onClose: Cn,
					})
				: null,
			ne !== null && ne.kind === "people"
				? (0, S.jsx)(pD, { client: t, channel: ne.channel, selfUserId: i, memberNames: u, onClose: Cn })
				: null,
			ne !== null && ne.kind === "rename"
				? (0, S.jsx)(Kp, {
						title: `Rename #${ne.channel.value.name}`,
						submitLabel: "Rename",
						initialName: ne.channel.value.name,
						initialTopic: ne.channel.value.topic ?? "",
						privacy: null,
						busy: V,
						waiting: !1,
						fieldsLocked: ce,
						error: we,
						onSubmit: (E, A) =>
							Nl(ne.channel, { ...ne.channel.value, name: E, ...(A === "" ? { topic: void 0 } : { topic: A }) }),
						onClose: Cn,
					})
				: null,
			ne !== null && ne.kind === "archive"
				? (0, S.jsx)(bD, {
						channelName: ne.channel.value.name,
						busy: V,
						retry: ce,
						error: we,
						onConfirm: () => Nl(ne.channel, { ...ne.channel.value, archivedAt: Date.now() }),
						onClose: Cn,
					})
				: null,
			ne !== null && ne.kind === "exit"
				? (0, S.jsx)(_D, {
						client: t,
						channel: ne.channel,
						action: ne.action,
						busy: V,
						waiting: ve,
						error: we,
						onConfirm: (E) => Ml(ne.channel, ne.action, E),
						onClose: Cn,
					})
				: null,
			(0, S.jsxs)("div", {
				className: "chitchat-announcer visually-hidden",
				role: "status",
				"aria-live": "polite",
				children: [(0, S.jsx)("span", { "data-announcement-sequence": String(st.sequence) }), bt],
			}),
		],
	});
}
function ES(e) {
	return (0, S.jsx)("div", {
		className: e.isError ? "boot-screen is-error" : "boot-screen",
		role: e.isError ? "alert" : "status",
		"aria-live": e.isError ? void 0 : "polite",
		children: e.message,
	});
}
var TS = document.getElementById("root");
if (!TS) throw new Error("index.html is missing the #root element");
var Kh = (0, hk.createRoot)(TS);
Kh.render((0, S.jsx)(ES, { message: "Connecting…" }));
pT().then(
	(e) => {
		(e.context.kind === "page" && (document.title = e.context.pageTitle),
			Kh.render(
				(0, S.jsx)(XE, {
					client: e.convex,
					children: (0, S.jsx)(AD, { client: e, children: (0, S.jsx)(jD, { client: e }) }),
				}),
			));
	},
	(e) => {
		Kh.render((0, S.jsx)(ES, { message: e instanceof Error ? e.message : String(e), isError: !0 }));
	},
);
