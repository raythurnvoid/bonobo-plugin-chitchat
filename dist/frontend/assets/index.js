var K_ = Object.create,
	G0 = Object.defineProperty,
	G_ = Object.getOwnPropertyDescriptor,
	X_ = Object.getOwnPropertyNames,
	J_ = Object.getPrototypeOf,
	W_ = Object.prototype.hasOwnProperty,
	jn = (e, n) => () => (n || (e((n = { exports: {} }).exports, n), (e = null)), n.exports),
	e1 = (e, n, r, u) => {
		if ((n && typeof n == "object") || typeof n == "function")
			for (var l = X_(n), o = 0, f = l.length, h; o < f; o++)
				((h = l[o]),
					!W_.call(e, h) &&
						h !== r &&
						G0(e, h, { get: ((m) => n[m]).bind(null, h), enumerable: !(u = G_(n, h)) || u.enumerable }));
		return e;
	},
	X0 = (e, n, r) => (
		(r = e != null ? K_(J_(e)) : {}),
		e1(n || !e || !e.__esModule ? G0(r, "default", { value: e, enumerable: !0 }) : r, e)
	);
(function () {
	const n = document.createElement("link").relList;
	if (n && n.supports && n.supports("modulepreload")) return;
	for (const l of document.querySelectorAll('link[rel="modulepreload"]')) u(l);
	new MutationObserver((l) => {
		for (const o of l)
			if (o.type === "childList")
				for (const f of o.addedNodes) f.tagName === "LINK" && f.rel === "modulepreload" && u(f);
	}).observe(document, { childList: !0, subtree: !0 });
	function r(l) {
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
		const o = r(l);
		fetch(l.href, o);
	}
})();
var t1 = jn((e) => {
		var n = Symbol.for("react.transitional.element"),
			r = Symbol.for("react.portal"),
			u = Symbol.for("react.fragment"),
			l = Symbol.for("react.strict_mode"),
			o = Symbol.for("react.profiler"),
			f = Symbol.for("react.consumer"),
			h = Symbol.for("react.context"),
			m = Symbol.for("react.forward_ref"),
			v = Symbol.for("react.suspense"),
			y = Symbol.for("react.memo"),
			_ = Symbol.for("react.lazy"),
			b = Symbol.for("react.activity"),
			S = Symbol.iterator;
		function E(O) {
			return O === null || typeof O != "object"
				? null
				: ((O = (S && O[S]) || O["@@iterator"]), typeof O == "function" ? O : null);
		}
		var C = {
				isMounted: function () {
					return !1;
				},
				enqueueForceUpdate: function () {},
				enqueueReplaceState: function () {},
				enqueueSetState: function () {},
			},
			T = Object.assign,
			D = {};
		function A(O, G, re) {
			((this.props = O), (this.context = G), (this.refs = D), (this.updater = re || C));
		}
		((A.prototype.isReactComponent = {}),
			(A.prototype.setState = function (O, G) {
				if (typeof O != "object" && typeof O != "function" && O != null)
					throw Error(
						"takes an object of state variables to update or a function which returns an object of state variables.",
					);
				this.updater.enqueueSetState(this, O, G, "setState");
			}),
			(A.prototype.forceUpdate = function (O) {
				this.updater.enqueueForceUpdate(this, O, "forceUpdate");
			}));
		function N() {}
		N.prototype = A.prototype;
		function R(O, G, re) {
			((this.props = O), (this.context = G), (this.refs = D), (this.updater = re || C));
		}
		var $ = (R.prototype = new N());
		(($.constructor = R), T($, A.prototype), ($.isPureReactComponent = !0));
		var I = Array.isArray;
		function j() {}
		var z = { H: null, A: null, T: null, S: null },
			U = Object.prototype.hasOwnProperty;
		function L(O, G, re) {
			var se = re.ref;
			return { $$typeof: n, type: O, key: G, ref: se !== void 0 ? se : null, props: re };
		}
		function Q(O, G) {
			return L(O.type, G, O.props);
		}
		function ie(O) {
			return typeof O == "object" && O !== null && O.$$typeof === n;
		}
		function X(O) {
			var G = { "=": "=0", ":": "=2" };
			return (
				"$" +
				O.replace(/[=:]/g, function (re) {
					return G[re];
				})
			);
		}
		var F = /\/+/g;
		function ne(O, G) {
			return typeof O == "object" && O !== null && O.key != null ? X("" + O.key) : G.toString(36);
		}
		function k(O) {
			switch (O.status) {
				case "fulfilled":
					return O.value;
				case "rejected":
					throw O.reason;
				default:
					switch (
						(typeof O.status == "string"
							? O.then(j, j)
							: ((O.status = "pending"),
								O.then(
									function (G) {
										O.status === "pending" && ((O.status = "fulfilled"), (O.value = G));
									},
									function (G) {
										O.status === "pending" && ((O.status = "rejected"), (O.reason = G));
									},
								)),
						O.status)
					) {
						case "fulfilled":
							return O.value;
						case "rejected":
							throw O.reason;
					}
			}
			throw O;
		}
		function H(O, G, re, se, me) {
			var ye = typeof O;
			(ye === "undefined" || ye === "boolean") && (O = null);
			var pe = !1;
			if (O === null) pe = !0;
			else
				switch (ye) {
					case "bigint":
					case "string":
					case "number":
						pe = !0;
						break;
					case "object":
						switch (O.$$typeof) {
							case n:
							case r:
								pe = !0;
								break;
							case _:
								return ((pe = O._init), H(pe(O._payload), G, re, se, me));
						}
				}
			if (pe)
				return (
					(me = me(O)),
					(pe = se === "" ? "." + ne(O, 0) : se),
					I(me)
						? ((re = ""),
							pe != null && (re = pe.replace(F, "$&/") + "/"),
							H(me, G, re, "", function (rt) {
								return rt;
							}))
						: me != null &&
							(ie(me) &&
								(me = Q(
									me,
									re + (me.key == null || (O && O.key === me.key) ? "" : ("" + me.key).replace(F, "$&/") + "/") + pe,
								)),
							G.push(me)),
					1
				);
			pe = 0;
			var Ze = se === "" ? "." : se + ":";
			if (I(O))
				for (var Ne = 0; Ne < O.length; Ne++) ((se = O[Ne]), (ye = Ze + ne(se, Ne)), (pe += H(se, G, re, ye, me)));
			else if (((Ne = E(O)), typeof Ne == "function"))
				for (O = Ne.call(O), Ne = 0; !(se = O.next()).done; )
					((se = se.value), (ye = Ze + ne(se, Ne++)), (pe += H(se, G, re, ye, me)));
			else if (ye === "object") {
				if (typeof O.then == "function") return H(k(O), G, re, se, me);
				throw (
					(G = String(O)),
					Error(
						"Objects are not valid as a React child (found: " +
							(G === "[object Object]" ? "object with keys {" + Object.keys(O).join(", ") + "}" : G) +
							"). If you meant to render a collection of children, use an array instead.",
					)
				);
			}
			return pe;
		}
		function B(O, G, re) {
			if (O == null) return O;
			var se = [],
				me = 0;
			return (
				H(O, se, "", "", function (ye) {
					return G.call(re, ye, me++);
				}),
				se
			);
		}
		function ue(O) {
			if (O._status === -1) {
				var G = O._result;
				((G = G()),
					G.then(
						function (re) {
							(O._status === 0 || O._status === -1) && ((O._status = 1), (O._result = re));
						},
						function (re) {
							(O._status === 0 || O._status === -1) && ((O._status = 2), (O._result = re));
						},
					),
					O._status === -1 && ((O._status = 0), (O._result = G)));
			}
			if (O._status === 1) return O._result.default;
			throw O._result;
		}
		var fe =
				typeof reportError == "function"
					? reportError
					: function (O) {
							if (typeof window == "object" && typeof window.ErrorEvent == "function") {
								var G = new window.ErrorEvent("error", {
									bubbles: !0,
									cancelable: !0,
									message:
										typeof O == "object" && O !== null && typeof O.message == "string" ? String(O.message) : String(O),
									error: O,
								});
								if (!window.dispatchEvent(G)) return;
							} else if (typeof process == "object" && typeof process.emit == "function") {
								process.emit("uncaughtException", O);
								return;
							}
							console.error(O);
						},
			Ie = {
				map: B,
				forEach: function (O, G, re) {
					B(
						O,
						function () {
							G.apply(this, arguments);
						},
						re,
					);
				},
				count: function (O) {
					var G = 0;
					return (
						B(O, function () {
							G++;
						}),
						G
					);
				},
				toArray: function (O) {
					return (
						B(O, function (G) {
							return G;
						}) || []
					);
				},
				only: function (O) {
					if (!ie(O)) throw Error("React.Children.only expected to receive a single React element child.");
					return O;
				},
			};
		((e.Activity = b),
			(e.Children = Ie),
			(e.Component = A),
			(e.Fragment = u),
			(e.Profiler = o),
			(e.PureComponent = R),
			(e.StrictMode = l),
			(e.Suspense = v),
			(e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = z),
			(e.__COMPILER_RUNTIME = {
				__proto__: null,
				c: function (O) {
					return z.H.useMemoCache(O);
				},
			}),
			(e.cache = function (O) {
				return function () {
					return O.apply(null, arguments);
				};
			}),
			(e.cacheSignal = function () {
				return null;
			}),
			(e.cloneElement = function (O, G, re) {
				if (O == null) throw Error("The argument must be a React element, but you passed " + O + ".");
				var se = T({}, O.props),
					me = O.key;
				if (G != null)
					for (ye in (G.key !== void 0 && (me = "" + G.key), G))
						!U.call(G, ye) ||
							ye === "key" ||
							ye === "__self" ||
							ye === "__source" ||
							(ye === "ref" && G.ref === void 0) ||
							(se[ye] = G[ye]);
				var ye = arguments.length - 2;
				if (ye === 1) se.children = re;
				else if (1 < ye) {
					for (var pe = Array(ye), Ze = 0; Ze < ye; Ze++) pe[Ze] = arguments[Ze + 2];
					se.children = pe;
				}
				return L(O.type, me, se);
			}),
			(e.createContext = function (O) {
				return (
					(O = { $$typeof: h, _currentValue: O, _currentValue2: O, _threadCount: 0, Provider: null, Consumer: null }),
					(O.Provider = O),
					(O.Consumer = { $$typeof: f, _context: O }),
					O
				);
			}),
			(e.createElement = function (O, G, re) {
				var se,
					me = {},
					ye = null;
				if (G != null)
					for (se in (G.key !== void 0 && (ye = "" + G.key), G))
						U.call(G, se) && se !== "key" && se !== "__self" && se !== "__source" && (me[se] = G[se]);
				var pe = arguments.length - 2;
				if (pe === 1) me.children = re;
				else if (1 < pe) {
					for (var Ze = Array(pe), Ne = 0; Ne < pe; Ne++) Ze[Ne] = arguments[Ne + 2];
					me.children = Ze;
				}
				if (O && O.defaultProps) for (se in ((pe = O.defaultProps), pe)) me[se] === void 0 && (me[se] = pe[se]);
				return L(O, ye, me);
			}),
			(e.createRef = function () {
				return { current: null };
			}),
			(e.forwardRef = function (O) {
				return { $$typeof: m, render: O };
			}),
			(e.isValidElement = ie),
			(e.lazy = function (O) {
				return { $$typeof: _, _payload: { _status: -1, _result: O }, _init: ue };
			}),
			(e.memo = function (O, G) {
				return { $$typeof: y, type: O, compare: G === void 0 ? null : G };
			}),
			(e.startTransition = function (O) {
				var G = z.T,
					re = {};
				z.T = re;
				try {
					var se = O(),
						me = z.S;
					(me !== null && me(re, se),
						typeof se == "object" && se !== null && typeof se.then == "function" && se.then(j, fe));
				} catch (ye) {
					fe(ye);
				} finally {
					(G !== null && re.types !== null && (G.types = re.types), (z.T = G));
				}
			}),
			(e.unstable_useCacheRefresh = function () {
				return z.H.useCacheRefresh();
			}),
			(e.use = function (O) {
				return z.H.use(O);
			}),
			(e.useActionState = function (O, G, re) {
				return z.H.useActionState(O, G, re);
			}),
			(e.useCallback = function (O, G) {
				return z.H.useCallback(O, G);
			}),
			(e.useContext = function (O) {
				return z.H.useContext(O);
			}),
			(e.useDebugValue = function () {}),
			(e.useDeferredValue = function (O, G) {
				return z.H.useDeferredValue(O, G);
			}),
			(e.useEffect = function (O, G) {
				return z.H.useEffect(O, G);
			}),
			(e.useEffectEvent = function (O) {
				return z.H.useEffectEvent(O);
			}),
			(e.useId = function () {
				return z.H.useId();
			}),
			(e.useImperativeHandle = function (O, G, re) {
				return z.H.useImperativeHandle(O, G, re);
			}),
			(e.useInsertionEffect = function (O, G) {
				return z.H.useInsertionEffect(O, G);
			}),
			(e.useLayoutEffect = function (O, G) {
				return z.H.useLayoutEffect(O, G);
			}),
			(e.useMemo = function (O, G) {
				return z.H.useMemo(O, G);
			}),
			(e.useOptimistic = function (O, G) {
				return z.H.useOptimistic(O, G);
			}),
			(e.useReducer = function (O, G, re) {
				return z.H.useReducer(O, G, re);
			}),
			(e.useRef = function (O) {
				return z.H.useRef(O);
			}),
			(e.useState = function (O) {
				return z.H.useState(O);
			}),
			(e.useSyncExternalStore = function (O, G, re) {
				return z.H.useSyncExternalStore(O, G, re);
			}),
			(e.useTransition = function () {
				return z.H.useTransition();
			}),
			(e.version = "19.2.8"));
	}),
	ao = jn((e, n) => {
		n.exports = t1();
	}),
	Fn = [],
	Dn = [],
	n1 = Uint8Array,
	Pf = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Oa = 0, i1 = Pf.length; Oa < i1; ++Oa) ((Fn[Oa] = Pf[Oa]), (Dn[Pf.charCodeAt(Oa)] = Oa));
Dn[45] = 62;
Dn[95] = 63;
function r1(e) {
	var n = e.length;
	if (n % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
	var r = e.indexOf("=");
	r === -1 && (r = n);
	var u = r === n ? 0 : 4 - (r % 4);
	return [r, u];
}
function a1(e, n, r) {
	return ((n + r) * 3) / 4 - r;
}
function Yu(e) {
	var n,
		r = r1(e),
		u = r[0],
		l = r[1],
		o = new n1(a1(e, u, l)),
		f = 0,
		h = l > 0 ? u - 4 : u,
		m;
	for (m = 0; m < h; m += 4)
		((n =
			(Dn[e.charCodeAt(m)] << 18) |
			(Dn[e.charCodeAt(m + 1)] << 12) |
			(Dn[e.charCodeAt(m + 2)] << 6) |
			Dn[e.charCodeAt(m + 3)]),
			(o[f++] = (n >> 16) & 255),
			(o[f++] = (n >> 8) & 255),
			(o[f++] = n & 255));
	return (
		l === 2 && ((n = (Dn[e.charCodeAt(m)] << 2) | (Dn[e.charCodeAt(m + 1)] >> 4)), (o[f++] = n & 255)),
		l === 1 &&
			((n = (Dn[e.charCodeAt(m)] << 10) | (Dn[e.charCodeAt(m + 1)] << 4) | (Dn[e.charCodeAt(m + 2)] >> 2)),
			(o[f++] = (n >> 8) & 255),
			(o[f++] = n & 255)),
		o
	);
}
function u1(e) {
	return Fn[(e >> 18) & 63] + Fn[(e >> 12) & 63] + Fn[(e >> 6) & 63] + Fn[e & 63];
}
function s1(e, n, r) {
	for (var u, l = [], o = n; o < r; o += 3)
		((u = ((e[o] << 16) & 16711680) + ((e[o + 1] << 8) & 65280) + (e[o + 2] & 255)), l.push(u1(u)));
	return l.join("");
}
function Fu(e) {
	for (var n, r = e.length, u = r % 3, l = [], o = 16383, f = 0, h = r - u; f < h; f += o)
		l.push(s1(e, f, f + o > h ? h : f + o));
	return (
		u === 1
			? ((n = e[r - 1]), l.push(Fn[n >> 2] + Fn[(n << 4) & 63] + "=="))
			: u === 2 &&
				((n = (e[r - 2] << 8) + e[r - 1]), l.push(Fn[n >> 10] + Fn[(n >> 4) & 63] + Fn[(n << 2) & 63] + "=")),
		l.join("")
	);
}
function _i(e) {
	if (e === void 0) return {};
	if (!J0(e)) throw new Error(`The arguments to a Convex function must be an object. Received: ${e}`);
	return e;
}
function l1(e) {
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
function J0(e) {
	const n = typeof e == "object",
		r = Object.getPrototypeOf(e),
		u = r === null || r === Object.prototype || r?.constructor?.name === "Object";
	return n && u;
}
var W0 = !0,
	La = BigInt("-9223372036854775808"),
	Dd = BigInt("9223372036854775807"),
	hd = BigInt("0"),
	o1 = BigInt("8"),
	c1 = BigInt("256"),
	Yf =
		"This commit timestamp is unresolved: its value is assigned when the mutation commits. Read the document after the mutation completes to get its value.",
	eb = class {
		[Symbol.toPrimitive](e) {
			if (e === "string") return this.toString();
			throw new Error(Yf);
		}
		valueOf() {
			throw new Error(Yf);
		}
		toJSON() {
			throw new Error(Yf);
		}
		toString() {
			return "[unresolved commit timestamp]";
		}
	},
	f1 = new eb();
function tb(e) {
	return Number.isNaN(e) || !Number.isFinite(e) || Object.is(e, -0);
}
function d1(e) {
	e < hd && (e -= La + La);
	let n = e.toString(16);
	n.length % 2 === 1 && (n = "0" + n);
	const r = new Uint8Array(new ArrayBuffer(8));
	let u = 0;
	for (const l of n.match(/.{2}/g).reverse()) (r.set([parseInt(l, 16)], u++), (e >>= o1));
	return Fu(r);
}
function h1(e) {
	const n = Yu(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	let r = hd,
		u = hd;
	for (const l of n) ((r += BigInt(l) * c1 ** u), u++);
	return (r > Dd && (r += La + La), r);
}
function m1(e) {
	if (e < La || Dd < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
	const n = new ArrayBuffer(8);
	return (new DataView(n).setBigInt64(0, e, !0), Fu(new Uint8Array(n)));
}
function v1(e) {
	const n = Yu(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	return new DataView(n.buffer).getBigInt64(0, !0);
}
var g1 = DataView.prototype.setBigInt64 ? m1 : d1,
	y1 = DataView.prototype.getBigInt64 ? v1 : h1,
	yy = 1024;
function md(e) {
	if (e.length > yy) throw new Error(`Field name ${e} exceeds maximum field name length ${yy}.`);
	if (e.startsWith("$")) throw new Error(`Field name ${e} starts with a '$', which is reserved.`);
	for (let n = 0; n < e.length; n += 1) {
		const r = e.charCodeAt(n);
		if (r < 32 || r >= 127)
			throw new Error(
				`Field name ${e} has invalid character '${e[n]}': Field names can only contain non-control ASCII characters`,
			);
	}
}
function $a(e) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return e;
	if (Array.isArray(e)) return e.map((u) => $a(u));
	if (typeof e != "object") throw new Error(`Unexpected type of ${e}`);
	const n = Object.entries(e);
	if (n.length === 1) {
		const u = n[0][0];
		if (u === "$bytes") {
			if (typeof e.$bytes != "string") throw new Error(`Malformed $bytes field on ${e}`);
			return Yu(e.$bytes).buffer;
		}
		if (u === "$integer") {
			if (typeof e.$integer != "string") throw new Error(`Malformed $integer field on ${e}`);
			return y1(e.$integer);
		}
		if (u === "$float") {
			if (typeof e.$float != "string") throw new Error(`Malformed $float field on ${e}`);
			const l = Yu(e.$float);
			if (l.byteLength !== 8) throw new Error(`Received ${l.byteLength} bytes, expected 8 for $float`);
			const o = new DataView(l.buffer).getFloat64(0, W0);
			if (!tb(o)) throw new Error(`Float ${o} should be encoded as a number`);
			return o;
		}
		if (u === "$commitTs") {
			if (e.$commitTs !== null) throw new Error(`Malformed $commitTs field on ${e}`);
			return f1;
		}
		if (u === "$set") throw new Error("Received a Set which is no longer supported as a Convex type.");
		if (u === "$map") throw new Error("Received a Map which is no longer supported as a Convex type.");
	}
	const r = {};
	for (const [u, l] of Object.entries(e)) (md(u), (r[u] = $a(l)));
	return r;
}
var by = 16384;
function ja(e) {
	const n = JSON.stringify(e, (r, u) => (u === void 0 ? "undefined" : typeof u == "bigint" ? `${u.toString()}n` : u));
	if (n.length > by) {
		const r = "[...truncated]";
		let u = by - 14;
		const l = n.codePointAt(u - 1);
		return (l !== void 0 && l > 65535 && (u -= 1), n.substring(0, u) + r);
	}
	return n;
}
function Pl(e, n, r, u) {
	if (e === void 0) {
		const f = r && ` (present at path ${r} in original object ${ja(n)})`;
		throw new Error(
			`undefined is not a valid Convex value${f}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`,
		);
	}
	if (e === null) return e;
	if (typeof e == "bigint") {
		if (e < La || Dd < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
		return { $integer: g1(e) };
	}
	if (typeof e == "number")
		if (tb(e)) {
			const f = new ArrayBuffer(8);
			return (new DataView(f).setFloat64(0, e, W0), { $float: Fu(new Uint8Array(f)) });
		} else return e;
	if (typeof e == "boolean" || typeof e == "string") return e;
	if (e instanceof ArrayBuffer) return { $bytes: Fu(new Uint8Array(e)) };
	if (e instanceof eb) return { $commitTs: null };
	if (Array.isArray(e)) return e.map((f, h) => Pl(f, n, r + `[${h}]`, !1));
	if (e instanceof Set) throw new Error(Ff(r, "Set", [...e], n));
	if (e instanceof Map) throw new Error(Ff(r, "Map", [...e], n));
	if (!J0(e)) {
		const f = e?.constructor?.name,
			h = f ? `${f} ` : "";
		throw new Error(Ff(r, h, e, n));
	}
	const l = {},
		o = Object.entries(e);
	o.sort(([f, h], [m, v]) => (f === m ? 0 : f < m ? -1 : 1));
	for (const [f, h] of o)
		h !== void 0 ? (md(f), (l[f] = Pl(h, n, r + `.${f}`, !1))) : u && (md(f), (l[f] = b1(h, n, r + `.${f}`)));
	return l;
}
function Ff(e, n, r, u) {
	return e
		? `${n}${ja(r)} is not a supported Convex type (present at path ${e} in original object ${ja(u)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
		: `${n}${ja(r)} is not a supported Convex type.`;
}
function b1(e, n, r) {
	if (e === void 0) return { $undefined: null };
	if (n === void 0) throw new Error(`Programming error. Current value is ${ja(e)} but original value is undefined`);
	return Pl(e, n, r, !1);
}
function Bn(e) {
	return Pl(e, e, "", !1);
}
var p1 = Object.defineProperty,
	S1 = (e, n, r) => (n in e ? p1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	nt = (e, n, r) => S1(e, typeof n != "symbol" ? n + "" : n, r),
	w1 = "https://docs.convex.dev/error#undefined-validator";
function Ku(e, n) {
	const r = n !== void 0 ? ` for field "${n}"` : "";
	throw new Error(
		`A validator is undefined${r} in ${e}. This is often caused by circular imports. See ${w1} for details.`,
	);
}
var hn = class {
		constructor({ isOptional: e }) {
			(nt(this, "type"),
				nt(this, "fieldPaths"),
				nt(this, "isOptional"),
				nt(this, "isConvexValidator"),
				(this.isOptional = e),
				(this.isConvexValidator = !0));
		}
	},
	_1 = class nb extends hn {
		constructor({ isOptional: n, tableName: r }) {
			if ((super({ isOptional: n }), nt(this, "tableName"), nt(this, "kind", "id"), typeof r != "string"))
				throw new Error("v.id(tableName) requires a string");
			this.tableName = r;
		}
		get json() {
			return { type: "id", tableName: this.tableName };
		}
		asOptional() {
			return new nb({ isOptional: "optional", tableName: this.tableName });
		}
	},
	py = class ib extends hn {
		constructor() {
			(super(...arguments), nt(this, "kind", "float64"));
		}
		get json() {
			return { type: "number" };
		}
		asOptional() {
			return new ib({ isOptional: "optional" });
		}
	},
	Sy = class rb extends hn {
		constructor() {
			(super(...arguments), nt(this, "kind", "int64"));
		}
		get json() {
			return { type: "bigint" };
		}
		asOptional() {
			return new rb({ isOptional: "optional" });
		}
	},
	x1 = class ab extends hn {
		constructor() {
			(super(...arguments), nt(this, "kind", "commitTs"));
		}
		get json() {
			return { type: this.kind };
		}
		asOptional() {
			return new ab({ isOptional: "optional" });
		}
	},
	E1 = class ub extends hn {
		constructor() {
			(super(...arguments), nt(this, "kind", "boolean"));
		}
		get json() {
			return { type: this.kind };
		}
		asOptional() {
			return new ub({ isOptional: "optional" });
		}
	},
	C1 = class sb extends hn {
		constructor() {
			(super(...arguments), nt(this, "kind", "bytes"));
		}
		get json() {
			return { type: this.kind };
		}
		asOptional() {
			return new sb({ isOptional: "optional" });
		}
	},
	T1 = class lb extends hn {
		constructor() {
			(super(...arguments), nt(this, "kind", "string"));
		}
		get json() {
			return { type: this.kind };
		}
		asOptional() {
			return new lb({ isOptional: "optional" });
		}
	},
	A1 = class ob extends hn {
		constructor() {
			(super(...arguments), nt(this, "kind", "null"));
		}
		get json() {
			return { type: this.kind };
		}
		asOptional() {
			return new ob({ isOptional: "optional" });
		}
	},
	R1 = class cb extends hn {
		constructor() {
			(super(...arguments), nt(this, "kind", "any"));
		}
		get json() {
			return { type: this.kind };
		}
		asOptional() {
			return new cb({ isOptional: "optional" });
		}
	},
	O1 = class Ma extends hn {
		constructor({ isOptional: n, fields: r }) {
			(super({ isOptional: n }),
				nt(this, "fields"),
				nt(this, "kind", "object"),
				globalThis.Object.entries(r).forEach(([u, l]) => {
					if ((l === void 0 && Ku("v.object()", u), !l.isConvexValidator))
						throw new Error("v.object() entries must be validators");
				}),
				(this.fields = r));
		}
		get json() {
			return {
				type: this.kind,
				value: globalThis.Object.fromEntries(
					globalThis.Object.entries(this.fields).map(([n, r]) => [
						n,
						{ fieldType: r.json, optional: r.isOptional === "optional" },
					]),
				),
			};
		}
		asOptional() {
			return new Ma({ isOptional: "optional", fields: this.fields });
		}
		omit(...n) {
			const r = { ...this.fields };
			for (const u of n) delete r[u];
			return new Ma({ isOptional: this.isOptional, fields: r });
		}
		pick(...n) {
			const r = {};
			for (const u of n) r[u] = this.fields[u];
			return new Ma({ isOptional: this.isOptional, fields: r });
		}
		partial() {
			const n = {};
			for (const [r, u] of globalThis.Object.entries(this.fields)) n[r] = u.asOptional();
			return new Ma({ isOptional: this.isOptional, fields: n });
		}
		extend(n) {
			return new Ma({ isOptional: this.isOptional, fields: { ...this.fields, ...n } });
		}
	},
	N1 = class fb extends hn {
		constructor({ isOptional: n, value: r }) {
			if (
				(super({ isOptional: n }),
				nt(this, "value"),
				nt(this, "kind", "literal"),
				typeof r != "string" && typeof r != "boolean" && typeof r != "number" && typeof r != "bigint")
			)
				throw new Error("v.literal(value) must be a string, number, or boolean");
			this.value = r;
		}
		get json() {
			return { type: this.kind, value: Bn(this.value) };
		}
		asOptional() {
			return new fb({ isOptional: "optional", value: this.value });
		}
	},
	M1 = class db extends hn {
		constructor({ isOptional: n, element: r }) {
			(super({ isOptional: n }),
				nt(this, "element"),
				nt(this, "kind", "array"),
				r === void 0 && Ku("v.array()"),
				(this.element = r));
		}
		get json() {
			return { type: this.kind, value: this.element.json };
		}
		asOptional() {
			return new db({ isOptional: "optional", element: this.element });
		}
	},
	z1 = class hb extends hn {
		constructor({ isOptional: n, key: r, value: u }) {
			if (
				(super({ isOptional: n }),
				nt(this, "key"),
				nt(this, "value"),
				nt(this, "kind", "record"),
				r === void 0 && Ku("v.record()", "key"),
				u === void 0 && Ku("v.record()", "value"),
				r.isOptional === "optional")
			)
				throw new Error("Record validator cannot have optional keys");
			if (u.isOptional === "optional") throw new Error("Record validator cannot have optional values");
			if (!r.isConvexValidator || !u.isConvexValidator)
				throw new Error("Key and value of v.record() but be validators");
			((this.key = r), (this.value = u));
		}
		get json() {
			return { type: this.kind, keys: this.key.json, values: { fieldType: this.value.json, optional: !1 } };
		}
		asOptional() {
			return new hb({ isOptional: "optional", key: this.key, value: this.value });
		}
	},
	k1 = class mb extends hn {
		constructor({ isOptional: n, members: r }) {
			(super({ isOptional: n }),
				nt(this, "members"),
				nt(this, "kind", "union"),
				r.forEach((u, l) => {
					if ((u === void 0 && Ku("v.union()", `member at index ${l}`), !u.isConvexValidator))
						throw new Error("All members of v.union() must be validators");
				}),
				(this.members = r));
		}
		get json() {
			return { type: this.kind, value: this.members.map((n) => n.json) };
		}
		asOptional() {
			return new mb({ isOptional: "optional", members: this.members });
		}
	},
	le = {
		id: (e) => new _1({ isOptional: "required", tableName: e }),
		null: () => new A1({ isOptional: "required" }),
		number: () => new py({ isOptional: "required" }),
		float64: () => new py({ isOptional: "required" }),
		bigint: () => new Sy({ isOptional: "required" }),
		int64: () => new Sy({ isOptional: "required" }),
		commitTs: () => new x1({ isOptional: "required" }),
		boolean: () => new E1({ isOptional: "required" }),
		string: () => new T1({ isOptional: "required" }),
		bytes: () => new C1({ isOptional: "required" }),
		literal: (e) => new N1({ isOptional: "required", value: e }),
		array: (e) => new M1({ isOptional: "required", element: e }),
		object: (e) => new O1({ isOptional: "required", fields: e }),
		record: (e, n) => new z1({ isOptional: "required", key: e, value: n }),
		union: (...e) => new k1({ isOptional: "required", members: e }),
		any: () => new R1({ isOptional: "required" }),
		optional: (e) => e.asOptional(),
		nullable: (e) => le.union(e, le.null()),
	},
	D1 = Object.defineProperty,
	j1 = (e, n, r) => (n in e ? D1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Kf = (e, n, r) => j1(e, typeof n != "symbol" ? n + "" : n, r),
	wy,
	_y,
	q1 = Symbol.for("ConvexError"),
	vd = class extends ((_y = Error), (wy = q1), _y) {
		constructor(e) {
			(super(typeof e == "string" ? e : ja(e)),
				Kf(this, "name", "ConvexError"),
				Kf(this, "data"),
				Kf(this, wy, !0),
				(this.data = e));
		}
	},
	xy = "1.44.0",
	I1 = Object.defineProperty,
	U1 = (e, n, r) => (n in e ? I1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Ey = (e, n, r) => U1(e, typeof n != "symbol" ? n + "" : n, r),
	L1 = "color:rgb(0, 145, 255)";
function vb(e) {
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
var gb = class {
	constructor(e) {
		(Ey(this, "_onLogLineFuncs"), Ey(this, "_verbose"), (this._onLogLineFuncs = {}), (this._verbose = e.verbose));
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
function yb(e) {
	const n = new gb(e);
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
function bb(e) {
	return new gb(e);
}
function Yl(e, n, r, u, l) {
	const o = vb(r);
	if ((typeof l == "object" && (l = `ConvexError ${JSON.stringify(l.errorData, null, 2)}`), n === "info")) {
		const f = l.match(/^\[.*?\] /);
		if (f === null) {
			e.error(`[CONVEX ${o}(${u})] Could not parse console.log`);
			return;
		}
		const h = l.slice(1, f[0].length - 2),
			m = l.slice(f[0].length);
		e.log(`%c[CONVEX ${o}(${u})] [${h}]`, L1, m);
	} else e.error(`[CONVEX ${o}(${u})] ${l}`);
}
function $1(e, n) {
	const r = `[CONVEX FATAL ERROR] ${n}`;
	return (e.error(r), new Error(r));
}
function ka(e, n, r) {
	return `[CONVEX ${vb(e)}(${n})] ${r.errorMessage}
  Called by client`;
}
function gd(e, n) {
	return ((n.data = e.errorData), n);
}
function jr(e) {
	const n = e.split(":");
	let r, u;
	return (
		n.length === 1 ? ((r = n[0]), (u = "default")) : ((r = n.slice(0, n.length - 1).join(":")), (u = n[n.length - 1])),
		r.endsWith(".js") && (r = r.slice(0, -3)),
		`${r}:${u}`
	);
}
function kr(e, n) {
	return JSON.stringify({ udfPath: jr(e), args: Bn(n) });
}
function Cy(e, n, r) {
	const { initialNumItems: u, id: l } = r;
	return JSON.stringify({ type: "paginated", udfPath: jr(e), args: Bn(n), options: Bn({ initialNumItems: u, id: l }) });
}
var B1 = Object.defineProperty,
	V1 = (e, n, r) => (n in e ? B1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Yn = (e, n, r) => V1(e, typeof n != "symbol" ? n + "" : n, r),
	H1 = class {
		constructor() {
			(Yn(this, "nextQueryId"),
				Yn(this, "querySetVersion"),
				Yn(this, "querySet"),
				Yn(this, "queryIdToToken"),
				Yn(this, "identityVersion"),
				Yn(this, "auth"),
				Yn(this, "outstandingQueriesOlderThanRestart"),
				Yn(this, "outstandingAuthOlderThanRestart"),
				Yn(this, "paused"),
				Yn(this, "pendingQuerySetModifications"),
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
			const l = jr(e),
				o = kr(l, n),
				f = this.querySet.get(o);
			if (f !== void 0)
				return (
					(f.numSubscribers += 1),
					{ queryToken: o, modification: null, unsubscribe: () => this.removeSubscriber(o) }
				);
			{
				const h = this.nextQueryId++,
					m = { id: h, canonicalizedUdfPath: l, args: n, numSubscribers: 1, journal: r, componentPath: u };
				(this.querySet.set(o, m), this.queryIdToToken.set(h, o));
				const v = this.querySetVersion,
					y = this.querySetVersion + 1,
					_ = { type: "Add", queryId: h, udfPath: l, args: [Bn(n)], journal: r, componentPath: u };
				return (
					this.paused ? this.pendingQuerySetModifications.set(h, _) : (this.querySetVersion = y),
					{
						queryToken: o,
						modification: { type: "ModifyQuerySet", baseVersion: v, newVersion: y, modifications: [_] },
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
			const r = kr(jr(e), n),
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
				const l = {
					type: "Add",
					queryId: u.id,
					udfPath: u.canonicalizedUdfPath,
					args: [Bn(u.args)],
					journal: u.journal,
					componentPath: u.componentPath,
				};
				(e.push(l), this.outstandingQueriesOlderThanRestart.add(u.id));
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
					l = { type: "Remove", queryId: n.id };
				return (
					this.paused
						? this.pendingQuerySetModifications.has(n.id)
							? this.pendingQuerySetModifications.delete(n.id)
							: this.pendingQuerySetModifications.set(n.id, l)
						: (this.querySetVersion = u),
					{ type: "ModifyQuerySet", baseVersion: r, newVersion: u, modifications: [l] }
				);
			}
		}
	},
	Z1 = Object.defineProperty,
	Q1 = (e, n, r) => (n in e ? Z1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	ql = (e, n, r) => Q1(e, typeof n != "symbol" ? n + "" : n, r),
	P1 = class {
		constructor(e, n) {
			((this.logger = e),
				(this.markConnectionStateDirty = n),
				ql(this, "inflightRequests"),
				ql(this, "requestsOlderThanRestart"),
				ql(this, "inflightMutationsCount", 0),
				ql(this, "inflightActionsCount", 0),
				(this.inflightRequests = new Map()),
				(this.requestsOlderThanRestart = new Set()));
		}
		request(e, n) {
			const r = new Promise((u) => {
				const l = n ? "Requested" : "NotSent";
				(this.inflightRequests.set(e.requestId, {
					message: e,
					status: { status: l, requestedAt: new Date(), onResult: u },
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
			for (const h of e.logLines) Yl(this.logger, "info", r, u, h);
			const l = n.status;
			let o, f;
			if (e.success) ((o = { success: !0, logLines: e.logLines, value: $a(e.result) }), (f = () => l.onResult(o)));
			else {
				const h = e.result,
					{ errorData: m } = e;
				(Yl(this.logger, "error", r, u, h),
					(o = { success: !1, errorMessage: h, errorData: m !== void 0 ? $a(m) : void 0, logLines: e.logLines }),
					(f = () => l.onResult(o)));
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
				const l = u.status;
				l.status === "Completed" &&
					l.ts.lessThanOrEqual(e) &&
					(l.onResolve(),
					n.set(r, l.result),
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
	Gu = Symbol.for("functionName"),
	pb = Symbol.for("toReferencePath");
function Y1(e) {
	return e[pb] ?? null;
}
function F1(e) {
	return e.startsWith("function://");
}
function K1(e) {
	let n;
	if (typeof e == "string") F1(e) ? (n = { functionHandle: e }) : (n = { name: e });
	else if (e[Gu]) n = { name: e[Gu] };
	else {
		const r = Y1(e);
		if (!r) throw new Error(`${e} is not a functionReference`);
		n = { reference: r };
	}
	return n;
}
function en(e) {
	const n = K1(e);
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
	const r = e[Gu];
	if (!r) throw new Error(`${e} is not a functionReference`);
	return r;
}
function jd(e) {
	return { [Gu]: e };
}
function Sb(e = []) {
	return new Proxy(
		{},
		{
			get(n, r) {
				if (typeof r == "string") return Sb([...e, r]);
				if (r === Gu) {
					if (e.length < 2) {
						const o = ["api", ...e].join(".");
						throw new Error(`API path is expected to be of the form \`api.moduleName.functionName\`. Found: \`${o}\``);
					}
					const u = e.slice(0, -1).join("/"),
						l = e[e.length - 1];
					return l === "default" ? u : u + ":" + l;
				} else return r === Symbol.toStringTag ? "FunctionReference" : void 0;
			},
		},
	);
}
var wb = Sb(),
	G1 = Object.defineProperty,
	X1 = (e, n, r) => (n in e ? G1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Fl = (e, n, r) => X1(e, typeof n != "symbol" ? n + "" : n, r),
	Ty = class yd {
		constructor(n) {
			(Fl(this, "queryResults"), Fl(this, "modifiedQueries"), (this.queryResults = n), (this.modifiedQueries = []));
		}
		getQuery(n, ...r) {
			const u = _i(r[0]),
				l = en(n),
				o = this.queryResults.get(kr(l, u));
			if (o !== void 0) return yd.queryValue(o.result);
		}
		getAllQueries(n) {
			const r = [],
				u = en(n);
			for (const l of this.queryResults.values())
				l.udfPath === jr(u) && r.push({ args: l.args, value: yd.queryValue(l.result) });
			return r;
		}
		setQuery(n, r, u) {
			const l = _i(r),
				o = en(n),
				f = kr(o, l);
			let h;
			u === void 0 ? (h = void 0) : (h = { success: !0, value: u, logLines: [] });
			const m = { udfPath: o, args: l, result: h };
			(this.queryResults.set(f, m), this.modifiedQueries.push(f));
		}
		static queryValue(n) {
			if (n !== void 0) return n.success ? n.value : void 0;
		}
	},
	J1 = class {
		constructor() {
			(Fl(this, "queryResults"),
				Fl(this, "optimisticUpdates"),
				(this.queryResults = new Map()),
				(this.optimisticUpdates = []));
		}
		ingestQueryResultsFromServer(e, n) {
			this.optimisticUpdates = this.optimisticUpdates.filter((o) => !n.has(o.mutationId));
			const r = this.queryResults;
			this.queryResults = new Map(e);
			const u = new Ty(this.queryResults);
			for (const o of this.optimisticUpdates) o.update(u);
			const l = [];
			for (const [o, f] of this.queryResults) {
				const h = r.get(o);
				(h === void 0 || h.result !== f.result) && l.push(o);
			}
			return l;
		}
		applyOptimisticUpdate(e, n) {
			this.optimisticUpdates.push({ update: e, mutationId: n });
			const r = new Ty(this.queryResults);
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
				throw r.errorData !== void 0 ? gd(r, new vd(ka("query", n.udfPath, r))) : new Error(ka("query", n.udfPath, r));
			}
		}
		hasQueryResult(e) {
			return this.queryResults.get(e) !== void 0;
		}
		queryLogs(e) {
			return this.queryResults.get(e)?.result?.logLines;
		}
	},
	W1 = Object.defineProperty,
	ex = (e, n, r) => (n in e ? W1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Gf = (e, n, r) => ex(e, typeof n != "symbol" ? n + "" : n, r),
	ns = class Si {
		constructor(n, r) {
			(Gf(this, "low"),
				Gf(this, "high"),
				Gf(this, "__isUnsignedLong__"),
				(this.low = n | 0),
				(this.high = r | 0),
				(this.__isUnsignedLong__ = !0));
		}
		static isLong(n) {
			return (n && n.__isUnsignedLong__) === !0;
		}
		static fromBytesLE(n) {
			return new Si(n[0] | (n[1] << 8) | (n[2] << 16) | (n[3] << 24), n[4] | (n[5] << 8) | (n[6] << 16) | (n[7] << 24));
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
			return isNaN(n) || n < 0 ? Ay : n >= tx ? nx : new Si((n % Zu) | 0, (n / Zu) | 0);
		}
		toString() {
			return (BigInt(this.high) * BigInt(Zu) + BigInt(this.low)).toString();
		}
		equals(n) {
			return (
				Si.isLong(n) || (n = Si.fromValue(n)),
				this.high >>> 31 === 1 && n.high >>> 31 === 1 ? !1 : this.high === n.high && this.low === n.low
			);
		}
		notEquals(n) {
			return !this.equals(n);
		}
		comp(n) {
			return (
				Si.isLong(n) || (n = Si.fromValue(n)),
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
			return typeof n == "number" ? Si.fromNumber(n) : new Si(n.low, n.high);
		}
	},
	Ay = new ns(0, 0),
	Ry = 65536,
	Zu = Ry * Ry,
	tx = Zu * Zu,
	nx = new ns(-1, -1),
	ix = Object.defineProperty,
	rx = (e, n, r) => (n in e ? ix(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Il = (e, n, r) => rx(e, typeof n != "symbol" ? n + "" : n, r),
	Oy = class {
		constructor(e, n) {
			(Il(this, "version"),
				Il(this, "remoteQuerySet"),
				Il(this, "queryPath"),
				Il(this, "logger"),
				(this.version = { querySet: 0, ts: ns.fromNumber(0), identity: 0 }),
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
						if (u) for (const o of r.logLines) Yl(this.logger, "info", "query", u, o);
						const l = $a(r.value ?? null);
						this.remoteQuerySet.set(r.queryId, { success: !0, value: l, logLines: r.logLines });
						break;
					}
					case "QueryFailed": {
						const u = this.queryPath(r.queryId);
						if (u) for (const o of r.logLines) Yl(this.logger, "info", "query", u, o);
						const { errorData: l } = r;
						this.remoteQuerySet.set(r.queryId, {
							success: !1,
							errorMessage: r.errorMessage,
							errorData: l !== void 0 ? $a(l) : void 0,
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
function Xf(e) {
	const n = Yu(e);
	return ns.fromBytesLE(Array.from(n));
}
function ax(e) {
	const n = new Uint8Array(e.toBytesLE());
	return Fu(n);
}
function Ny(e) {
	switch (e.type) {
		case "FatalError":
		case "AuthError":
		case "ActionResponse":
		case "TransitionChunk":
		case "Ping":
			return { ...e };
		case "MutationResponse":
			return e.success ? { ...e, ts: Xf(e.ts) } : { ...e };
		case "Transition":
			return {
				...e,
				startVersion: { ...e.startVersion, ts: Xf(e.startVersion.ts) },
				endVersion: { ...e.endVersion, ts: Xf(e.endVersion.ts) },
			};
		default:
	}
}
function ux(e) {
	switch (e.type) {
		case "Authenticate":
		case "ModifyQuerySet":
		case "Mutation":
		case "Action":
		case "Event":
			return { ...e };
		case "Connect":
			return e.maxObservedTimestamp !== void 0
				? { ...e, maxObservedTimestamp: ax(e.maxObservedTimestamp) }
				: { ...e, maxObservedTimestamp: void 0 };
		default:
	}
}
var sx = Object.defineProperty,
	lx = (e, n, r) => (n in e ? sx(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Et = (e, n, r) => lx(e, typeof n != "symbol" ? n + "" : n, r),
	ox = 1e3,
	cx = 1001,
	fx = 1005,
	dx = 4040,
	Zl;
function za() {
	return (
		Zl === void 0 && (Zl = Date.now()),
		typeof performance > "u" || !performance.now ? Date.now() : Math.round(Zl + performance.now())
	);
}
function My() {
	return `t=${Math.round((za() - Zl) / 100) / 10}s`;
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
function hx(e) {
	if (e === void 0) return "Unknown";
	for (const n of Object.keys(_b)) if (e.startsWith(n)) return n;
	return "Unknown";
}
var mx = class {
	constructor(e, n, r, u, l, o) {
		((this.markConnectionStateDirty = l),
			(this.debug = o),
			Et(this, "socket"),
			Et(this, "connectionCount"),
			Et(this, "_hasEverConnected", !1),
			Et(this, "lastCloseReason"),
			Et(this, "transitionChunkBuffer", null),
			Et(this, "defaultInitialBackoff"),
			Et(this, "maxBackoff"),
			Et(this, "retries"),
			Et(this, "serverInactivityThreshold"),
			Et(this, "reconnectDueToServerInactivityTimeout"),
			Et(this, "scheduledReconnect", null),
			Et(this, "networkOnlineHandler", null),
			Et(this, "pendingNetworkRecoveryInfo", null),
			Et(this, "uri"),
			Et(this, "onOpen"),
			Et(this, "onResume"),
			Et(this, "onMessage"),
			Et(this, "webSocketConstructor"),
			Et(this, "logger"),
			Et(this, "onServerDisconnectError"),
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
			const r = Ny(JSON.parse(n));
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
							clientTs: za(),
						})),
					this.lastCloseReason !== "InitialConnect" &&
						(this.lastCloseReason
							? this.logger.log("WebSocket reconnected at", My(), "after disconnect due to", this.lastCloseReason)
							: this.logger.log("WebSocket reconnected at", My())),
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
				let u = Ny(JSON.parse(n.data));
				if ((this._logVerbose(`received ws message with type ${u.type}`), u.type !== "Ping")) {
					if (u.type === "TransitionChunk") {
						const l = this.assembleTransition(u);
						if (!l) return;
						((u = l), this._logVerbose(`assembled full ws message of type ${u.type}`));
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
					n.code !== ox && n.code !== cx && n.code !== fx && n.code !== dx)
				) {
					let u = `WebSocket closed with code ${n.code}`;
					(n.reason && (u += `: ${n.reason}`),
						this.logger.log(u),
						this.onServerDisconnectError && n.reason && this.onServerDisconnectError(u));
				}
				const r = hx(n.reason);
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
			const r = ux(e),
				u = JSON.stringify(r);
			let l = !1;
			try {
				(this.socket.ws.send(u), (l = !0));
			} catch (o) {
				(this.logger.log(`Failed to send message on WebSocket, reconnecting: ${o}`),
					this.closeAndReconnect("FailedToSendMessage"));
			}
			return (
				this._logVerbose(`${l ? "sent" : "failed to send"} message with type ${e.type}: ${JSON.stringify(n)}`),
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
		const r = za(),
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
			const n = za() - this.scheduledReconnect.scheduledAt;
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
							clientTs: za(),
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
			(e === "client" ? 100 : e === "Unknown" ? this.defaultInitialBackoff : _b[e].timeout) * Math.pow(2, this.retries);
		this.retries += 1;
		const r = Math.min(n, this.maxBackoff);
		return r + r * (Math.random() - 0.5);
	}
	reportLargeTransition({ transition: e, messageLength: n }) {
		if (e.clientClockSkew === void 0 || e.serverTs === void 0) return;
		const r = za() - e.clientClockSkew - e.serverTs / 1e6,
			u = `${Math.round(r)}ms`,
			l = `${Math.round(n / 1e4) / 100}MB`,
			o = n / (r / 1e3),
			f = `${Math.round(o / 1e4) / 100}MB per second`;
		(this._logVerbose(`received ${l} transition in ${u} at ${f}`),
			n > 2e7
				? this.logger.log(
						`received query results totaling more that 20MB (${l}) which will take a long time to download on slower connections`,
					)
				: r > 2e4 && this.logger.log(`received query results totaling ${l} which took more than 20s to arrive (${u})`),
			this.debug &&
				this.sendMessage({
					type: "Event",
					eventType: "ClientReceivedTransition",
					event: { transitionTransitTime: r, messageLength: n },
				}));
	}
};
function vx() {
	return gx();
}
function gx() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
		const n = (Math.random() * 16) | 0;
		return (e === "x" ? n : (n & 3) | 8).toString(16);
	});
}
var Vu = class extends Error {};
Vu.prototype.name = "InvalidTokenError";
function yx(e) {
	return decodeURIComponent(
		atob(e).replace(/(.)/g, (n, r) => {
			let u = r.charCodeAt(0).toString(16).toUpperCase();
			return (u.length < 2 && (u = "0" + u), "%" + u);
		}),
	);
}
function bx(e) {
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
		return yx(n);
	} catch {
		return atob(n);
	}
}
function xb(e, n) {
	if (typeof e != "string") throw new Vu("Invalid token specified: must be a string");
	n || (n = {});
	const r = n.header === !0 ? 0 : 1,
		u = e.split(".")[r];
	if (typeof u != "string") throw new Vu(`Invalid token specified: missing part #${r + 1}`);
	let l;
	try {
		l = bx(u);
	} catch (o) {
		throw new Vu(`Invalid token specified: invalid base64 for part #${r + 1} (${o.message})`);
	}
	try {
		return JSON.parse(l);
	} catch (o) {
		throw new Vu(`Invalid token specified: invalid json for part #${r + 1} (${o.message})`);
	}
}
var px = Object.defineProperty,
	Sx = (e, n, r) => (n in e ? px(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	cn = (e, n, r) => Sx(e, typeof n != "symbol" ? n + "" : n, r),
	wx = 480 * 60 * 60 * 1e3,
	zy = 2,
	_x = class {
		constructor(e, n, r) {
			(cn(this, "authState", { state: "noAuth" }),
				cn(this, "configVersion", 0),
				cn(this, "syncState"),
				cn(this, "authenticate"),
				cn(this, "stopSocket"),
				cn(this, "tryRestartSocket"),
				cn(this, "pauseSocket"),
				cn(this, "resumeSocket"),
				cn(this, "clearAuth"),
				cn(this, "logger"),
				cn(this, "refreshTokenLeewaySeconds"),
				cn(this, "initialAuthTokenReuse"),
				cn(this, "lastRefreshChange"),
				cn(this, "tokenConfirmationAttempts", 0),
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
			const l = { fetchToken: e, onAuthChange: n, onRefreshChange: r };
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
					(this.authState.state === "waitingForServerConfirmationOfFreshToken" && this.tokenConfirmationAttempts >= zy))
			) {
				(this.logger.error(`Failed to authenticate: "${e.error}", check your server auth config`),
					this.syncState.hasAuth() && this.syncState.clearAuth(),
					this.authState.state !== "noAuth" && this.setAndReportAuthFailed(this.authState.config.onAuthChange));
				return;
			}
			if (
				(this.authState.state === "waitingForServerConfirmationOfFreshToken" &&
					(this.tokenConfirmationAttempts++,
					this._logVerbose(`retrying reauthentication, ${zy - this.tokenConfirmationAttempts} attempts remaining`)),
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
			const { iat: u, exp: l } = r;
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
			n !== void 0 ? ((f = l - (Date.now() - n) / 1e3), f <= 0 && (f = 0)) : (f = o);
			let h = Math.min(wx, (f - this.refreshTokenLeewaySeconds) * 1e3);
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
				return xb(e);
			} catch (n) {
				return (this._logVerbose(`Error decoding token: ${n instanceof Error ? n.message : "Unknown error"}`), null);
			}
		}
		_logVerbose(e) {
			this.logger.logVerbose(`${e} [v${this.configVersion}]`);
		}
	},
	xx = ["convexClientConstructed", "convexWebSocketOpen", "convexFirstMessageReceived"];
function Ex(e, n) {
	const r = { sessionId: n };
	typeof performance > "u" || !performance.mark || performance.mark(e, { detail: r });
}
function Cx(e) {
	let n = e.name.slice(6);
	return ((n = n.charAt(0).toLowerCase() + n.slice(1)), { name: n, startTime: e.startTime });
}
function Tx(e) {
	if (typeof performance > "u" || !performance.getEntriesByName) return [];
	const n = [];
	for (const r of xx) {
		const u = performance
			.getEntriesByName(r)
			.filter((l) => l.entryType === "mark")
			.filter((l) => l.detail.sessionId === e);
		n.push(...u);
	}
	return n.map(Cx);
}
var Ax = Object.defineProperty,
	Rx = (e, n, r) => (n in e ? Ax(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Ct = (e, n, r) => Rx(e, typeof n != "symbol" ? n + "" : n, r),
	Ox = class {
		constructor(e, n, r) {
			if (
				(Ct(this, "address"),
				Ct(this, "state"),
				Ct(this, "requestManager"),
				Ct(this, "webSocketManager"),
				Ct(this, "authenticationManager"),
				Ct(this, "remoteQuerySet"),
				Ct(this, "optimisticQueryResults"),
				Ct(this, "_transitionHandlerCounter", 0),
				Ct(this, "_nextRequestId"),
				Ct(this, "_onTransitionFns", new Map()),
				Ct(this, "_sessionId"),
				Ct(this, "firstMessageReceived", !1),
				Ct(this, "debug"),
				Ct(this, "logger"),
				Ct(this, "maxObservedTimestamp"),
				Ct(this, "connectionStateSubscribers", new Map()),
				Ct(this, "nextConnectionStateSubscriberId", 0),
				Ct(this, "_lastPublishedConnectionState"),
				Ct(this, "markConnectionStateDirty", () => {
					Promise.resolve().then(() => {
						const b = this.connectionState();
						if (JSON.stringify(b) !== JSON.stringify(this._lastPublishedConnectionState)) {
							this._lastPublishedConnectionState = b;
							for (const S of this.connectionStateSubscribers.values()) S(b);
						}
					});
				}),
				Ct(this, "mark", (b) => {
					this.debug && Ex(b, this.sessionId);
				}),
				typeof e == "object")
			)
				throw new Error(
					"Passing a ClientConfig object is no longer supported. Pass the URL of the Convex deployment as a string directly.",
				);
			(r?.skipConvexDeploymentUrlCheck !== !0 && l1(e), (r = { ...r }));
			const u = r.authRefreshTokenLeewaySeconds ?? 10;
			let l = r.webSocketConstructor;
			if (!l && typeof WebSocket > "u")
				throw new Error(
					"No WebSocket global variable defined! To use Convex in an environment without WebSocket try the HTTP client: https://docs.convex.dev/api/classes/browser.ConvexHttpClient",
				);
			((l = l || WebSocket),
				(this.debug = r.reportDebugInfoToConvex ?? !1),
				(this.address = e),
				(this.logger =
					r.logger === !1
						? bb({ verbose: r.verbose ?? !1 })
						: r.logger !== !0 && r.logger
							? r.logger
							: yb({ verbose: r.verbose ?? !1 })));
			const o = e.search("://");
			if (o === -1) throw new Error("Provided address was not an absolute URL.");
			const f = e.substring(o + 3),
				h = e.substring(0, o);
			let m;
			if (h === "http") m = "ws";
			else if (h === "https") m = "wss";
			else throw new Error(`Unknown parent protocol ${h}`);
			const v = `${m}://${f}/api/${xy}/sync`;
			((this.state = new H1()),
				(this.remoteQuerySet = new Oy((b) => this.state.queryPath(b), this.logger)),
				(this.requestManager = new P1(this.logger, this.markConnectionStateDirty)));
			const y = () => {
				(this.webSocketManager.pause(), this.state.pause());
			};
			((this.authenticationManager = new _x(
				this.state,
				{
					authenticate: (b) => {
						const S = this.state.setAuth(b);
						return (this.webSocketManager.sendMessage(S), S.baseVersion);
					},
					stopSocket: () => this.webSocketManager.stop(),
					tryRestartSocket: () => this.webSocketManager.tryRestart(),
					pauseSocket: y,
					resumeSocket: () => this.webSocketManager.resume(),
					clearAuth: () => {
						this.clearAuth();
					},
				},
				{ logger: this.logger, refreshTokenLeewaySeconds: u, initialAuthTokenReuse: r.initialAuthTokenReuse ?? !1 },
			)),
				(this.optimisticQueryResults = new J1()),
				this.addOnTransitionHandler((b) => {
					n(b.queries.map((S) => S.token));
				}),
				(this._nextRequestId = 0),
				(this._sessionId = vx()));
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
							const S = "Are you sure you want to leave? Your changes may not be saved.";
							return (((b || window.event).returnValue = S), S);
						}
					});
			((this.webSocketManager = new mx(
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
							(this.remoteQuerySet = new Oy((C) => this.state.queryPath(C), this.logger)));
						const [S, E] = this.state.restart();
						(E && this.webSocketManager.sendMessage(E), this.webSocketManager.sendMessage(S));
						for (const C of this.requestManager.restart()) this.webSocketManager.sendMessage(C);
					},
					onResume: () => {
						const [b, S] = this.state.resume();
						(S && this.webSocketManager.sendMessage(S), b && this.webSocketManager.sendMessage(b));
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
								const S = this.requestManager.removeCompleted(this.remoteQuerySet.timestamp());
								this.notifyOnQueryResultChanges(S);
								break;
							}
							case "MutationResponse": {
								b.success && this.observedTimestamp(b.ts);
								const S = this.requestManager.onResponse(b);
								S !== null && this.notifyOnQueryResultChanges(new Map([[S.requestId, S.result]]));
								break;
							}
							case "ActionResponse":
								this.requestManager.onResponse(b);
								break;
							case "AuthError":
								this.authenticationManager.onAuthError(b);
								break;
							case "FatalError": {
								const S = $1(this.logger, b.error);
								throw (this.webSocketManager.terminate(), S);
							}
							default:
						}
						return { hasSyncedPastLastReconnect: this.hasSyncedPastLastReconnect() };
					},
					onServerDisconnectError: r.onServerDisconnectError,
				},
				l,
				this.logger,
				this.markConnectionStateDirty,
				this.debug,
			)),
				this.mark("convexClientConstructed"),
				r.expectAuth && y());
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
			for (const [l, o] of n) {
				const f = this.state.queryToken(l);
				if (f !== null) {
					const h = { result: o, udfPath: this.state.queryPath(l), args: this.state.queryArgs(l) };
					r.set(f, h);
				}
			}
			const u = this.optimisticQueryResults.ingestQueryResultsFromServer(r, new Set(e.keys()));
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
					n = e ? xb(e.value) : {};
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
			const u = _i(n),
				{ modification: l, queryToken: o, unsubscribe: f } = this.state.subscribe(e, u, r?.journal, r?.componentPath);
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
		localQueryResult(e, n) {
			const r = kr(e, _i(n));
			return this.optimisticQueryResults.queryResult(r);
		}
		localQueryResultByToken(e) {
			return this.optimisticQueryResults.queryResult(e);
		}
		hasLocalQueryResultByToken(e) {
			return this.optimisticQueryResults.hasQueryResult(e);
		}
		localQueryLogs(e, n) {
			const r = kr(e, _i(n));
			return this.optimisticQueryResults.queryLogs(r);
		}
		queryJournal(e, n) {
			const r = kr(e, _i(n));
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
				throw u.errorData !== void 0 ? gd(u, new vd(ka("mutation", e, u))) : new Error(ka("mutation", e, u));
			return u.value;
		}
		async mutationInternal(e, n, r, u) {
			const { mutationPromise: l } = this.enqueueMutation(e, n, r, u);
			return l;
		}
		enqueueMutation(e, n, r, u) {
			const l = _i(n);
			this.tryReportLongDisconnect();
			const o = this.nextRequestId;
			if ((this._nextRequestId++, r !== void 0)) {
				const m = r.optimisticUpdate;
				if (m !== void 0) {
					const v = (_) => {
							m(_, l) instanceof Promise &&
								this.logger.warn(
									"Optimistic update handler returned a Promise. Optimistic updates should be synchronous.",
								);
						},
						y = this.optimisticQueryResults.applyOptimisticUpdate(v, o).map((_) => {
							const b = this.localQueryResultByToken(_);
							return {
								token: _,
								modification: {
									kind: "Updated",
									result: b === void 0 ? void 0 : { success: !0, value: b, logLines: [] },
								},
							};
						});
					this.handleTransition({ queries: y, reflectedMutations: [], timestamp: this.remoteQuerySet.timestamp() });
				}
			}
			const f = { type: "Mutation", requestId: o, udfPath: e, componentPath: u, args: [Bn(l)] },
				h = this.webSocketManager.sendMessage(f);
			return { requestId: o, mutationPromise: this.requestManager.request(f, h) };
		}
		async action(e, n) {
			const r = await this.actionInternal(e, n);
			if (!r.success) throw r.errorData !== void 0 ? gd(r, new vd(ka("action", e, r))) : new Error(ka("action", e, r));
			return r.value;
		}
		async actionInternal(e, n, r) {
			const u = _i(n),
				l = this.nextRequestId;
			(this._nextRequestId++, this.tryReportLongDisconnect());
			const o = { type: "Action", requestId: l, udfPath: e, componentPath: r, args: [Bn(u)] },
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
				const e = Tx(this.sessionId);
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
				headers: { "Content-Type": "application/json", "Convex-Client": `npm-${xy}` },
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
function Jf(e) {
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
var Nx = Object.defineProperty,
	Mx = (e, n, r) => (n in e ? Nx(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	ky = (e, n, r) => Mx(e, typeof n != "symbol" ? n + "" : n, r),
	zx = class {
		constructor(e, n) {
			((this.client = e),
				(this.onTransition = n),
				ky(this, "paginatedQuerySet", new Map()),
				ky(this, "lastTransitionTs"),
				(this.lastTransitionTs = ns.fromNumber(0)),
				this.client.addOnTransitionHandler((r) => this.onBaseTransition(r)));
		}
		subscribe(e, n, r) {
			const u = jr(e),
				l = Cy(u, n, r),
				o = () => this.removePaginatedQuerySubscriber(l),
				f = this.paginatedQuerySet.get(l);
			return f
				? ((f.numSubscribers += 1), { paginatedQueryToken: l, unsubscribe: o })
				: (this.paginatedQuerySet.set(l, {
						token: l,
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
					this.addPageToPaginatedQuery(l, null, r.initialNumItems),
					{ paginatedQueryToken: l, unsubscribe: o });
		}
		localQueryResult(e, n, r) {
			const u = Cy(jr(e), n, r);
			return this.localQueryResultByToken(u);
		}
		localQueryResultByToken(e) {
			const n = this.paginatedQuerySet.get(e);
			if (!n) return;
			const r = this.activePageQueryTokens(n);
			if (r.length === 0)
				return { results: [], status: "LoadingFirstPage", loadMore: (h) => this.loadMoreOfPaginatedQuery(e, h) };
			let u = [],
				l = !1,
				o = !1;
			for (const h of r) {
				const m = this.client.localQueryResultByToken(h);
				if (m === void 0) {
					((l = !0), (o = !1));
					continue;
				}
				const v = Jf(m);
				((u = u.concat(v.page)), (o = !!v.isDone));
			}
			let f;
			return (
				l ? (f = u.length === 0 ? "LoadingFirstPage" : "LoadingMore") : o ? (f = "Exhausted") : (f = "CanLoadMore"),
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
			const l = { ...e, paginatedQueries: u };
			this.onTransition(l);
		}
		loadMoreOfPaginatedQuery(e, n) {
			this.mustGetPaginatedQuery(e);
			const r = this.queryTokenForLastPageOfPaginatedQuery(e),
				u = this.client.localQueryResultByToken(r);
			if (!u) return !1;
			const l = Jf(u);
			if (l.isDone) return !1;
			this.addPageToPaginatedQuery(e, l.continueCursor, n);
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
			for (const [u, l] of this.paginatedQuerySet)
				for (const o of this.allQueryTokens(l))
					if (r.has(o)) {
						n.push(u);
						break;
					}
			return n;
		}
		processPaginatedQuerySplits(e, n) {
			for (const r of e) {
				const u = this.mustGetPaginatedQuery(r),
					{ ongoingSplits: l, pageKeyToQuery: o, pageKeys: f } = u;
				for (const [h, [m, v]] of l)
					n(o.get(m).queryToken) !== void 0 &&
						n(o.get(v).queryToken) !== void 0 &&
						this.completePaginatedQuerySplit(u, h, m, v);
				for (const h of f) {
					if (l.has(h)) continue;
					const m = o.get(h);
					if (!m) throw new Error(`No page query for active pageKey ${h}`);
					const v = n(m.queryToken);
					if (!v) continue;
					const y = Jf(v);
					y.splitCursor &&
						(y.pageStatus === "SplitRecommended" ||
							y.pageStatus === "SplitRequired" ||
							y.page.length > u.options.initialNumItems * 2) &&
						this.splitPaginatedQueryPage(u, h, m.cursor, y.splitCursor, y.continueCursor);
				}
			}
		}
		splitPaginatedQueryPage(e, n, r, u, l) {
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
				paginationOpts: { ...h, cursor: u, endCursor: l },
			});
			(e.pageKeyToQuery.set(f, { ...v, cursor: u }), e.ongoingSplits.set(n, [o, f]));
		}
		addPageToPaginatedQuery(e, n, r) {
			const u = this.mustGetPaginatedQuery(e),
				l = u.nextPageKey++,
				o = { cursor: n, numItems: r, id: u.id },
				f = { ...u.args, paginationOpts: o },
				h = this.client.subscribe(u.canonicalizedUdfPath, f);
			return (u.pageKeys.push(l), u.pageKeyToQuery.set(l, { ...h, cursor: n }), h);
		}
		removePaginatedQuerySubscriber(e) {
			const n = this.paginatedQuerySet.get(e);
			if (n && ((n.numSubscribers -= 1), !(n.numSubscribers > 0))) {
				for (const r of n.pageKeyToQuery.values()) r.unsubscribe();
				this.paginatedQuerySet.delete(e);
			}
		}
		completePaginatedQuerySplit(e, n, r, u) {
			const l = e.pageKeyToQuery.get(n);
			e.pageKeyToQuery.delete(n);
			const o = e.pageKeys.indexOf(n);
			(e.pageKeys.splice(o, 1, r, u), e.ongoingSplits.delete(n), l.unsubscribe());
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
	w = X0(ao(), 1);
function Eb({ getCurrentValue: e, subscribe: n }) {
	const [r, u] = (0, w.useState)(() => ({ getCurrentValue: e, subscribe: n, value: e() }));
	let l = r.value;
	return (
		(r.getCurrentValue !== e || r.subscribe !== n) && ((l = e()), u({ getCurrentValue: e, subscribe: n, value: l })),
		(0, w.useEffect)(() => {
			let o = !1;
			const f = () => {
					o ||
						u((m) => {
							if (m.getCurrentValue !== e || m.subscribe !== n) return m;
							const v = e();
							return m.value === v ? m : { ...m, value: v };
						});
				},
				h = n(f);
			return (
				f(),
				() => {
					((o = !0), h());
				}
			);
		}, [e, n]),
		l
	);
}
var kx = Object.defineProperty,
	Dx = (e, n, r) => (n in e ? kx(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	pi = (e, n, r) => Dx(e, typeof n != "symbol" ? n + "" : n, r),
	jx = 5e3;
if (typeof w.default > "u") throw new Error("Required dependency 'react' not found");
function Cb(e, n, r) {
	function u(l) {
		return (Lx(l), n.mutation(e, l, { optimisticUpdate: r }));
	}
	return (
		(u.withOptimisticUpdate = function (o) {
			if (r !== void 0) throw new Error(`Already specified optimistic update for mutation ${en(e)}`);
			return Cb(e, n, o);
		}),
		u
	);
}
function qx(e, n) {
	return function (r) {
		return n.action(e, r);
	};
}
var Tb = class {
		constructor(e, n) {
			if (
				(pi(this, "address"),
				pi(this, "cachedSync"),
				pi(this, "cachedPaginatedQueryClient"),
				pi(this, "listeners"),
				pi(this, "options"),
				pi(this, "closed", !1),
				pi(this, "_logger"),
				pi(this, "adminAuth"),
				pi(this, "fakeUserIdentity"),
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
					n?.logger === !1
						? bb({ verbose: n?.verbose ?? !1 })
						: n?.logger !== !0 && n?.logger
							? n.logger
							: yb({ verbose: n?.verbose ?? !1 })),
				(this.options = { ...n, logger: this._logger }));
		}
		get url() {
			return this.address;
		}
		get sync() {
			if (this.closed) throw new Error("ConvexReactClient has already been closed.");
			return this.cachedSync
				? this.cachedSync
				: ((this.cachedSync = this.options.baseClient ?? new Ox(this.address, () => {}, this.options)),
					this.adminAuth && this.cachedSync.setAdminAuth(this.adminAuth, this.fakeUserIdentity),
					(this.cachedPaginatedQueryClient = new zx(this.cachedSync, (e) => this.handleTransition(e))),
					this.cachedSync);
		}
		get paginatedQueryClient() {
			if ((this.sync, this.cachedPaginatedQueryClient)) return this.cachedPaginatedQueryClient;
			throw new Error("Should already be instantiated");
		}
		setAuth(e, n, r) {
			if (typeof e == "string")
				throw new Error(
					"Passing a string to ConvexReactClient.setAuth is no longer supported, please upgrade to passing in an async function to handle reauthentication.",
				);
			this.sync.setAuth(e, n ?? (() => {}), r);
		}
		clearAuth() {
			this.sync.clearAuth();
		}
		setAdminAuth(e, n) {
			if (((this.adminAuth = e), (this.fakeUserIdentity = n), this.closed))
				throw new Error("ConvexReactClient has already been closed.");
			this.cachedSync && this.sync.setAdminAuth(e, n);
		}
		watchQuery(e, ...n) {
			const [r, u] = n,
				l = en(e);
			return {
				onUpdate: (o) => {
					const { queryToken: f, unsubscribe: h } = this.sync.subscribe(l, r, u),
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
					if (this.cachedSync) return this.cachedSync.localQueryResult(l, r);
				},
				localQueryLogs: () => {
					if (this.cachedSync) return this.cachedSync.localQueryLogs(l, r);
				},
				journal: () => {
					if (this.cachedSync) return this.cachedSync.queryJournal(l, r);
				},
			};
		}
		prewarmQuery(e) {
			const n = e.extendSubscriptionFor ?? jx,
				r = this.watchQuery(e.query, e.args || {}).onUpdate(() => {});
			setTimeout(r, n);
		}
		watchPaginatedQuery(e, n, r) {
			const u = en(e);
			return {
				onUpdate: (l) => {
					const { paginatedQueryToken: o, unsubscribe: f } = this.paginatedQueryClient.subscribe(u, n || {}, r),
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
				localQueryResult: () => this.paginatedQueryClient.localQueryResult(u, n, r),
			};
		}
		mutation(e, ...n) {
			const [r, u] = n,
				l = en(e);
			return this.sync.mutation(l, r, u);
		}
		action(e, ...n) {
			const r = en(e);
			return this.sync.action(r, ...n);
		}
		query(e, ...n) {
			const r = this.watchQuery(e, ...n),
				u = r.localQueryResult();
			return u !== void 0
				? Promise.resolve(u)
				: new Promise((l, o) => {
						const f = r.onUpdate(() => {
							f();
							try {
								l(r.localQueryResult());
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
			const n = e.queries.map((u) => u.token),
				r = e.paginatedQueries.map((u) => u.token);
			this.transition([...n, ...r]);
		}
		transition(e) {
			for (const n of e) {
				const r = this.listeners.get(n);
				if (r) for (const u of r) u();
			}
		}
	},
	is = w.createContext(void 0);
function Ha() {
	return (0, w.useContext)(is);
}
var Ix = ({ client: e, children: n }) => w.createElement(is.Provider, { value: e }, n);
function Ye(e, ...n) {
	const r = n[0] === "skip",
		u = n[0] === "skip" ? {} : _i(n[0]),
		l = typeof e == "string" ? jd(e) : e,
		o = en(l),
		f = qd((0, w.useMemo)(() => (r ? {} : { query: { query: l, args: u } }), [JSON.stringify(Bn(u)), o, r])).query;
	if (f instanceof Error) throw f;
	return f;
}
function Dr(e) {
	const n = typeof e == "string" ? jd(e) : e,
		r = (0, w.useContext)(is);
	if (r === void 0)
		throw new Error(
			"Could not find Convex client! `useMutation` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return (0, w.useMemo)(() => Cb(n, r), [r, en(n)]);
}
function Ab(e) {
	const n = (0, w.useContext)(is),
		r = typeof e == "string" ? jd(e) : e;
	if (n === void 0)
		throw new Error(
			"Could not find Convex client! `useAction` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return (0, w.useMemo)(() => qx(r, n), [n, en(r)]);
}
function Ux() {
	const e = (0, w.useContext)(is);
	if (e === void 0)
		throw new Error(
			"Could not find Convex client! `useConvexConnectionState` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return Eb({
		getCurrentValue: (0, w.useCallback)(() => e.connectionState(), [e]),
		subscribe: (0, w.useCallback)(
			(n) =>
				e.subscribeToConnectionState(() => {
					n();
				}),
			[e],
		),
	});
}
function Lx(e) {
	if (typeof e == "object" && e !== null && "bubbles" in e && "persist" in e && "isDefaultPrevented" in e)
		throw new Error(
			"Convex function called with SyntheticEvent object. Did you use a Convex function as an event handler directly? Event handlers like onClick receive an event object as their first argument. These SyntheticEvent objects are not valid Convex values. Try wrapping the function like `const handler = () => myMutation();` and using `handler` in the event handler.",
		);
}
var $x = Object.defineProperty,
	Bx = (e, n, r) => (n in e ? $x(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r)),
	Wf = (e, n, r) => Bx(e, typeof n != "symbol" ? n + "" : n, r),
	Vx = class {
		constructor(e) {
			(Wf(this, "createWatch"),
				Wf(this, "queries"),
				Wf(this, "listeners"),
				(this.createWatch = e),
				(this.queries = {}),
				(this.listeners = new Set()));
		}
		setQueries(e) {
			for (const n of Object.keys(e)) {
				const { query: r, args: u, paginationOptions: l } = e[n];
				if ((en(r), this.queries[n] === void 0)) this.addQuery(n, r, u, l ? { paginationOptions: l } : {});
				else {
					const o = this.queries[n];
					(en(r) !== en(o.query) ||
						JSON.stringify(Bn(u)) !== JSON.stringify(Bn(o.args)) ||
						JSON.stringify(l) !== JSON.stringify(o.paginationOptions)) &&
						(this.removeQuery(n), this.addQuery(n, r, u, l ? { paginationOptions: l } : {}));
				}
			}
			for (const n of Object.keys(this.queries)) e[n] === void 0 && this.removeQuery(n);
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
			const n = {};
			for (const r of Object.keys(e)) {
				const { query: u, args: l } = e[r],
					o = e[r].paginationOptions;
				en(u);
				const f = this.createWatch(u, l, o ? { paginationOptions: o } : {});
				let h;
				try {
					h = f.localQueryResult();
				} catch (m) {
					if (m instanceof Error) h = m;
					else throw m;
				}
				n[r] = h;
			}
			return n;
		}
		setCreateWatch(e) {
			this.createWatch = e;
			for (const n of Object.keys(this.queries)) {
				const { query: r, args: u, watch: l, paginationOptions: o } = this.queries[n],
					f = "journal" in l ? l.journal() : void 0;
				(this.removeQuery(n),
					this.addQuery(n, r, u, { ...(f ? { journal: f } : []), ...(o ? { paginationOptions: o } : {}) }));
			}
		}
		destroy() {
			for (const e of Object.keys(this.queries)) this.removeQuery(e);
			this.listeners = new Set();
		}
		addQuery(e, n, r, { paginationOptions: u, journal: l }) {
			if (this.queries[e] !== void 0)
				throw new Error(`Tried to add a new query with identifier ${e} when it already exists.`);
			const o = this.createWatch(n, r, { ...(l ? { journal: l } : []), ...(u ? { paginationOptions: u } : {}) }),
				f = o.onUpdate(() => this.notifyListeners());
			this.queries[e] = { query: n, args: r, watch: o, unsubscribe: f, ...(u ? { paginationOptions: u } : {}) };
		}
		removeQuery(e) {
			const n = this.queries[e];
			if (n === void 0) throw new Error(`No query found with identifier ${e}.`);
			(n.unsubscribe(), delete this.queries[e]);
		}
		notifyListeners() {
			for (const e of this.listeners) e();
		}
	};
function qd(e) {
	const n = Ha();
	if (n === void 0)
		throw new Error(
			"Could not find Convex client! `useQuery` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return Hx(
		e,
		(0, w.useMemo)(
			() =>
				(r, u, { journal: l, paginationOptions: o }) =>
					o ? n.watchPaginatedQuery(r, u, o) : n.watchQuery(r, u, l ? { journal: l } : {}),
			[n],
		),
	);
}
function Hx(e, n) {
	const [r] = (0, w.useState)(() => new Vx(n));
	return (
		r.createWatch !== n && r.setCreateWatch(n),
		(0, w.useEffect)(() => () => r.destroy(), [r]),
		Eb(
			(0, w.useMemo)(
				() => ({ getCurrentValue: () => r.getLocalResults(e), subscribe: (u) => (r.setQueries(e), r.subscribe(u)) }),
				[r, e],
			),
		)
	);
}
function Rb(e, n) {
	return new Proxy(
		{},
		{
			get(r, u) {
				if (typeof u == "string") return Rb(e, [...n, u]);
				if (u === pb) {
					if (n.length < 1) {
						const l = [e, ...n].join(".");
						throw new Error(
							`API path is expected to be of the form \`${e}.childComponent.functionName\`. Found: \`${l}\``,
						);
					}
					return "_reference/childComponent/" + n.join("/");
				} else return;
			},
		},
	);
}
var Zx = () => Rb("components", []),
	Qx = wb,
	Dy = 6e4,
	Px = 500,
	Yx = 1e4,
	Fx = 1e3,
	Kx = 3e4,
	Gx = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function jy(e) {
	if (typeof e != "object" || e === null) return null;
	const n = e;
	if ((n.mode !== "light" && n.mode !== "dark") || typeof n.tokens != "object" || n.tokens === null) return null;
	const r = {};
	for (const [u, l] of Object.entries(n.tokens)) {
		if (typeof l != "string") return null;
		r[u] = l;
	}
	return { mode: n.mode, tokens: r };
}
function qy(e) {
	const n = document.documentElement;
	for (const [r, u] of Object.entries(e.tokens)) n.style.setProperty(r, u);
	(n.classList.toggle("light", e.mode === "light"), n.classList.toggle("dark", e.mode === "dark"));
}
function Xx(e) {
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
function Jx() {
	const e = window.location.hash.slice(1);
	if (!e) throw new Error("Missing host bridge fragment — this plugin frame must be embedded by the Bonobo host app");
	const n = new URLSearchParams(e),
		r = n.getAll("parentOrigin"),
		u = n.getAll("nonce");
	if (n.size !== 2 || r.length !== 1 || u.length !== 1) throw new Error("Invalid host bridge fragment");
	const l = r[0],
		o = u[0];
	let f;
	try {
		f = new URL(l);
	} catch {
		throw new Error("Invalid host bridge parent origin");
	}
	if ((f.protocol !== "http:" && f.protocol !== "https:") || f.origin !== l)
		throw new Error("Invalid host bridge parent origin");
	if (!Gx.test(o)) throw new Error("Invalid host bridge nonce");
	return { parentOrigin: l, nonce: o };
}
async function Wx() {
	const { parentOrigin: e, nonce: n } = Jx();
	let r = "",
		u = "",
		l = 0,
		o = "",
		f = 0,
		h = null;
	const m = new Set(),
		v = new Map();
	let y = null;
	async function _() {
		return Date.now() >= l - Dy ? b() : u;
	}
	function b() {
		if (y) return y;
		const N = crypto.randomUUID();
		return (
			(y = new Promise((R, $) => {
				const I = setTimeout(() => {
					(v.delete(N), $(new Error("Plugin frame token refresh timed out")));
				}, Yx);
				v.set(N, { resolve: R, reject: $, timeout: I });
				try {
					window.parent.postMessage({ type: "bonobo:token-refresh-request", nonce: n, requestId: N }, e);
				} catch (j) {
					(clearTimeout(I), v.delete(N), $(j));
				}
			}).finally(() => {
				y = null;
			})),
			y
		);
	}
	const S = () => o !== "" && Date.now() < f - Dy,
		E = (N) => {
			typeof N.jwt == "string" && typeof N.jwtExpiresAt == "number" && Number.isFinite(N.jwtExpiresAt)
				? ((o = N.jwt), (f = N.jwtExpiresAt))
				: ((o = ""), (f = 0));
		};
	async function C(N, R, $) {
		const I = JSON.stringify(R),
			j = (ie) => {
				const X = new Headers($?.headers);
				return (
					X.set("Authorization", `Bearer ${ie}`),
					X.set("Content-Type", "application/json"),
					X.set("Accept", "application/json"),
					fetch(r + N, { ...$, method: "POST", body: I, headers: X, redirect: "error" })
				);
			},
			z = await _();
		let U = await j(z);
		U.status === 401 && (U = await j(u !== z ? u : await b()));
		const L = await U.text();
		let Q = null;
		try {
			Q = JSON.parse(L);
		} catch {}
		return { status: U.status, body: Q };
	}
	async function T(N) {
		const R = new Headers(N);
		return (R.set("Authorization", `Bearer ${await _()}`), R);
	}
	const D = (N) =>
		fetch(r + "/plugins-ui/session-jwt", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token: N }),
		});
	async function A(N) {
		const R = N?.forceRefreshToken === !0;
		for (let $ = 0; ; $ += 1) {
			if (S() && !R) return o;
			let I = null;
			try {
				if (o !== "" && (await b(), S())) return o;
				((I = await D(await _())), I.status === 401 && (I = await D(await b())));
			} catch {
				I = null;
			}
			if (I?.ok) {
				const j = await I.json().catch(() => null),
					z = j?._yay?.jwt,
					U = j?._yay?.sessionExpiresAt;
				return typeof z != "string" || typeof U != "number" ? null : ((l = U), (o = z), (f = U), z);
			}
			if (!(I === null || I.status === 429 || I.status >= 500) || $ >= 2) return null;
			await new Promise((j) => setTimeout(j, 1e3 * ($ + 1)));
		}
	}
	return new Promise((N) => {
		let R = !1,
			$;
		const I = () => {
				window.parent.postMessage({ type: "bonobo:ready", nonce: n }, e);
			},
			j = () => {
				clearInterval($);
			},
			z = (U) => {
				if (U.source !== window.parent || U.origin !== e) return;
				const L = U.data;
				if (!(typeof L != "object" || L === null)) {
					if (
						L.type === "bonobo:init" &&
						!R &&
						L.nonce === n &&
						typeof L.apiOrigin == "string" &&
						typeof L.convexUrl == "string" &&
						typeof L.token == "string" &&
						typeof L.tokenExpiresAt == "number" &&
						Number.isFinite(L.tokenExpiresAt) &&
						Xx(L.context)
					) {
						((R = !0),
							j(),
							window.removeEventListener("pagehide", j),
							(r = L.apiOrigin),
							(u = L.token),
							(l = L.tokenExpiresAt),
							E(L));
						const Q = new Tb(L.convexUrl, { expectAuth: !0, unsavedChangesWarning: !1, initialAuthTokenReuse: !0 });
						let ie = Date.now();
						const X = setInterval(() => {
							const F = Date.now();
							(F - ie >= Kx && Q.setAuth(A), (ie = F));
						}, Fx);
						(Q.setAuth(A),
							window.addEventListener(
								"pagehide",
								() => {
									(clearInterval(X), Q.close());
								},
								{ once: !0 },
							),
							(h = jy(L.theme)),
							h && qy(h),
							N({
								context: L.context,
								apiOrigin: r,
								getToken: _,
								refreshToken: b,
								fetchJson: C,
								authorize: T,
								convex: Q,
								api: Qx,
								session: { expiresAt: () => l, fetchJwt: A },
								theme: {
									current: () => h,
									subscribe(F) {
										return (
											m.add(F),
											() => {
												m.delete(F);
											}
										);
									},
								},
							}));
					} else if (
						R &&
						L.nonce === n &&
						L.type === "bonobo:token" &&
						typeof L.requestId == "string" &&
						typeof L.token == "string" &&
						typeof L.tokenExpiresAt == "number" &&
						Number.isFinite(L.tokenExpiresAt)
					) {
						const Q = v.get(L.requestId);
						Q &&
							(v.delete(L.requestId),
							clearTimeout(Q.timeout),
							(u = L.token),
							(l = L.tokenExpiresAt),
							E(L),
							Q.resolve(L.token));
					} else if (R && L.nonce === n && L.type === "bonobo:theme") {
						const Q = jy(L.theme);
						if (Q) {
							((h = Q), qy(Q));
							for (const ie of m) ie(Q);
						}
					} else if (
						R &&
						L.nonce === n &&
						L.type === "bonobo:token-error" &&
						typeof L.requestId == "string" &&
						typeof L.message == "string"
					) {
						const Q = v.get(L.requestId);
						Q && (v.delete(L.requestId), clearTimeout(Q.timeout), Q.reject(new Error(L.message)));
					}
				}
			};
		(window.addEventListener("message", z),
			window.addEventListener("pagehide", j, { once: !0 }),
			I(),
			($ = setInterval(I, Px)));
	});
}
var eE = jn((e) => {
		function n(k, H) {
			var B = k.length;
			k.push(H);
			e: for (; 0 < B; ) {
				var ue = (B - 1) >>> 1,
					fe = k[ue];
				if (0 < l(fe, H)) ((k[ue] = H), (k[B] = fe), (B = ue));
				else break e;
			}
		}
		function r(k) {
			return k.length === 0 ? null : k[0];
		}
		function u(k) {
			if (k.length === 0) return null;
			var H = k[0],
				B = k.pop();
			if (B !== H) {
				k[0] = B;
				e: for (var ue = 0, fe = k.length, Ie = fe >>> 1; ue < Ie; ) {
					var O = 2 * (ue + 1) - 1,
						G = k[O],
						re = O + 1,
						se = k[re];
					if (0 > l(G, B))
						re < fe && 0 > l(se, G) ? ((k[ue] = se), (k[re] = B), (ue = re)) : ((k[ue] = G), (k[O] = B), (ue = O));
					else if (re < fe && 0 > l(se, B)) ((k[ue] = se), (k[re] = B), (ue = re));
					else break e;
				}
			}
			return H;
		}
		function l(k, H) {
			var B = k.sortIndex - H.sortIndex;
			return B !== 0 ? B : k.id - H.id;
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
			y = 1,
			_ = null,
			b = 3,
			S = !1,
			E = !1,
			C = !1,
			T = !1,
			D = typeof setTimeout == "function" ? setTimeout : null,
			A = typeof clearTimeout == "function" ? clearTimeout : null,
			N = typeof setImmediate < "u" ? setImmediate : null;
		function R(k) {
			for (var H = r(v); H !== null; ) {
				if (H.callback === null) u(v);
				else if (H.startTime <= k) (u(v), (H.sortIndex = H.expirationTime), n(m, H));
				else break;
				H = r(v);
			}
		}
		function $(k) {
			if (((C = !1), R(k), !E))
				if (r(m) !== null) ((E = !0), I || ((I = !0), ie()));
				else {
					var H = r(v);
					H !== null && ne($, H.startTime - k);
				}
		}
		var I = !1,
			j = -1,
			z = 5,
			U = -1;
		function L() {
			return T ? !0 : !(e.unstable_now() - U < z);
		}
		function Q() {
			if (((T = !1), I)) {
				var k = e.unstable_now();
				U = k;
				var H = !0;
				try {
					e: {
						((E = !1), C && ((C = !1), A(j), (j = -1)), (S = !0));
						var B = b;
						try {
							t: {
								for (R(k), _ = r(m); _ !== null && !(_.expirationTime > k && L()); ) {
									var ue = _.callback;
									if (typeof ue == "function") {
										((_.callback = null), (b = _.priorityLevel));
										var fe = ue(_.expirationTime <= k);
										if (((k = e.unstable_now()), typeof fe == "function")) {
											((_.callback = fe), R(k), (H = !0));
											break t;
										}
										(_ === r(m) && u(m), R(k));
									} else u(m);
									_ = r(m);
								}
								if (_ !== null) H = !0;
								else {
									var Ie = r(v);
									(Ie !== null && ne($, Ie.startTime - k), (H = !1));
								}
							}
							break e;
						} finally {
							((_ = null), (b = B), (S = !1));
						}
						H = void 0;
					}
				} finally {
					H ? ie() : (I = !1);
				}
			}
		}
		var ie;
		if (typeof N == "function")
			ie = function () {
				N(Q);
			};
		else if (typeof MessageChannel < "u") {
			var X = new MessageChannel(),
				F = X.port2;
			((X.port1.onmessage = Q),
				(ie = function () {
					F.postMessage(null);
				}));
		} else
			ie = function () {
				D(Q, 0);
			};
		function ne(k, H) {
			j = D(function () {
				k(e.unstable_now());
			}, H);
		}
		((e.unstable_IdlePriority = 5),
			(e.unstable_ImmediatePriority = 1),
			(e.unstable_LowPriority = 4),
			(e.unstable_NormalPriority = 3),
			(e.unstable_Profiling = null),
			(e.unstable_UserBlockingPriority = 2),
			(e.unstable_cancelCallback = function (k) {
				k.callback = null;
			}),
			(e.unstable_forceFrameRate = function (k) {
				0 > k || 125 < k
					? console.error(
							"forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
						)
					: (z = 0 < k ? Math.floor(1e3 / k) : 5);
			}),
			(e.unstable_getCurrentPriorityLevel = function () {
				return b;
			}),
			(e.unstable_next = function (k) {
				switch (b) {
					case 1:
					case 2:
					case 3:
						var H = 3;
						break;
					default:
						H = b;
				}
				var B = b;
				b = H;
				try {
					return k();
				} finally {
					b = B;
				}
			}),
			(e.unstable_requestPaint = function () {
				T = !0;
			}),
			(e.unstable_runWithPriority = function (k, H) {
				switch (k) {
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						break;
					default:
						k = 3;
				}
				var B = b;
				b = k;
				try {
					return H();
				} finally {
					b = B;
				}
			}),
			(e.unstable_scheduleCallback = function (k, H, B) {
				var ue = e.unstable_now();
				switch (
					(typeof B == "object" && B !== null
						? ((B = B.delay), (B = typeof B == "number" && 0 < B ? ue + B : ue))
						: (B = ue),
					k)
				) {
					case 1:
						var fe = -1;
						break;
					case 2:
						fe = 250;
						break;
					case 5:
						fe = 1073741823;
						break;
					case 4:
						fe = 1e4;
						break;
					default:
						fe = 5e3;
				}
				return (
					(fe = B + fe),
					(k = { id: y++, callback: H, priorityLevel: k, startTime: B, expirationTime: fe, sortIndex: -1 }),
					B > ue
						? ((k.sortIndex = B),
							n(v, k),
							r(m) === null && k === r(v) && (C ? (A(j), (j = -1)) : (C = !0), ne($, B - ue)))
						: ((k.sortIndex = fe), n(m, k), E || S || ((E = !0), I || ((I = !0), ie()))),
					k
				);
			}),
			(e.unstable_shouldYield = L),
			(e.unstable_wrapCallback = function (k) {
				var H = b;
				return function () {
					var B = b;
					b = H;
					try {
						return k.apply(this, arguments);
					} finally {
						b = B;
					}
				};
			}));
	}),
	tE = jn((e, n) => {
		n.exports = eE();
	}),
	nE = jn((e) => {
		var n = ao();
		function r(v) {
			var y = "https://react.dev/errors/" + v;
			if (1 < arguments.length) {
				y += "?args[]=" + encodeURIComponent(arguments[1]);
				for (var _ = 2; _ < arguments.length; _++) y += "&args[]=" + encodeURIComponent(arguments[_]);
			}
			return (
				"Minified React error #" +
				v +
				"; visit " +
				y +
				" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
			);
		}
		function u() {}
		var l = {
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
		function f(v, y, _) {
			var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
			return { $$typeof: o, key: b == null ? null : "" + b, children: v, containerInfo: y, implementation: _ };
		}
		var h = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		function m(v, y) {
			if (v === "font") return "";
			if (typeof y == "string") return y === "use-credentials" ? y : "";
		}
		((e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l),
			(e.createPortal = function (v, y) {
				var _ = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
				if (!y || (y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)) throw Error(r(299));
				return f(v, y, null, _);
			}),
			(e.flushSync = function (v) {
				var y = h.T,
					_ = l.p;
				try {
					if (((h.T = null), (l.p = 2), v)) return v();
				} finally {
					((h.T = y), (l.p = _), l.d.f());
				}
			}),
			(e.preconnect = function (v, y) {
				typeof v == "string" &&
					(y
						? ((y = y.crossOrigin), (y = typeof y == "string" ? (y === "use-credentials" ? y : "") : void 0))
						: (y = null),
					l.d.C(v, y));
			}),
			(e.prefetchDNS = function (v) {
				typeof v == "string" && l.d.D(v);
			}),
			(e.preinit = function (v, y) {
				if (typeof v == "string" && y && typeof y.as == "string") {
					var _ = y.as,
						b = m(_, y.crossOrigin),
						S = typeof y.integrity == "string" ? y.integrity : void 0,
						E = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
					_ === "style"
						? l.d.S(v, typeof y.precedence == "string" ? y.precedence : void 0, {
								crossOrigin: b,
								integrity: S,
								fetchPriority: E,
							})
						: _ === "script" &&
							l.d.X(v, {
								crossOrigin: b,
								integrity: S,
								fetchPriority: E,
								nonce: typeof y.nonce == "string" ? y.nonce : void 0,
							});
				}
			}),
			(e.preinitModule = function (v, y) {
				if (typeof v == "string")
					if (typeof y == "object" && y !== null) {
						if (y.as == null || y.as === "script") {
							var _ = m(y.as, y.crossOrigin);
							l.d.M(v, {
								crossOrigin: _,
								integrity: typeof y.integrity == "string" ? y.integrity : void 0,
								nonce: typeof y.nonce == "string" ? y.nonce : void 0,
							});
						}
					} else y ?? l.d.M(v);
			}),
			(e.preload = function (v, y) {
				if (typeof v == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
					var _ = y.as,
						b = m(_, y.crossOrigin);
					l.d.L(v, _, {
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
			(e.preloadModule = function (v, y) {
				if (typeof v == "string")
					if (y) {
						var _ = m(y.as, y.crossOrigin);
						l.d.m(v, {
							as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
							crossOrigin: _,
							integrity: typeof y.integrity == "string" ? y.integrity : void 0,
						});
					} else l.d.m(v);
			}),
			(e.requestFormReset = function (v) {
				l.d.r(v);
			}),
			(e.unstable_batchedUpdates = function (v, y) {
				return v(y);
			}),
			(e.useFormState = function (v, y, _) {
				return h.H.useFormState(v, y, _);
			}),
			(e.useFormStatus = function () {
				return h.H.useHostTransitionStatus();
			}),
			(e.version = "19.2.8"));
	}),
	Ob = jn((e, n) => {
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
		(r(), (n.exports = nE()));
	}),
	iE = jn((e) => {
		var n = tE(),
			r = ao(),
			u = Ob();
		function l(t) {
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
			if (f(t) !== t) throw Error(l(188));
		}
		function y(t) {
			var i = t.alternate;
			if (!i) {
				if (((i = f(t)), i === null)) throw Error(l(188));
				return i !== t ? null : t;
			}
			for (var a = t, s = i; ; ) {
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
						if (d === a) return (v(c), t);
						if (d === s) return (v(c), i);
						d = d.sibling;
					}
					throw Error(l(188));
				}
				if (a.return !== s.return) ((a = c), (s = d));
				else {
					for (var g = !1, x = c.child; x; ) {
						if (x === a) {
							((g = !0), (a = c), (s = d));
							break;
						}
						if (x === s) {
							((g = !0), (s = c), (a = d));
							break;
						}
						x = x.sibling;
					}
					if (!g) {
						for (x = d.child; x; ) {
							if (x === a) {
								((g = !0), (a = d), (s = c));
								break;
							}
							if (x === s) {
								((g = !0), (s = d), (a = c));
								break;
							}
							x = x.sibling;
						}
						if (!g) throw Error(l(189));
					}
				}
				if (a.alternate !== s) throw Error(l(190));
			}
			if (a.tag !== 3) throw Error(l(188));
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
			S = Symbol.for("react.element"),
			E = Symbol.for("react.transitional.element"),
			C = Symbol.for("react.portal"),
			T = Symbol.for("react.fragment"),
			D = Symbol.for("react.strict_mode"),
			A = Symbol.for("react.profiler"),
			N = Symbol.for("react.consumer"),
			R = Symbol.for("react.context"),
			$ = Symbol.for("react.forward_ref"),
			I = Symbol.for("react.suspense"),
			j = Symbol.for("react.suspense_list"),
			z = Symbol.for("react.memo"),
			U = Symbol.for("react.lazy"),
			L = Symbol.for("react.activity"),
			Q = Symbol.for("react.memo_cache_sentinel"),
			ie = Symbol.iterator;
		function X(t) {
			return t === null || typeof t != "object"
				? null
				: ((t = (ie && t[ie]) || t["@@iterator"]), typeof t == "function" ? t : null);
		}
		var F = Symbol.for("react.client.reference");
		function ne(t) {
			if (t == null) return null;
			if (typeof t == "function") return t.$$typeof === F ? null : t.displayName || t.name || null;
			if (typeof t == "string") return t;
			switch (t) {
				case T:
					return "Fragment";
				case A:
					return "Profiler";
				case D:
					return "StrictMode";
				case I:
					return "Suspense";
				case j:
					return "SuspenseList";
				case L:
					return "Activity";
			}
			if (typeof t == "object")
				switch (t.$$typeof) {
					case C:
						return "Portal";
					case R:
						return t.displayName || "Context";
					case N:
						return (t._context.displayName || "Context") + ".Consumer";
					case $:
						var i = t.render;
						return (
							(t = t.displayName),
							t || ((t = i.displayName || i.name || ""), (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
							t
						);
					case z:
						return ((i = t.displayName || null), i !== null ? i : ne(t.type) || "Memo");
					case U:
						((i = t._payload), (t = t._init));
						try {
							return ne(t(i));
						} catch {}
				}
			return null;
		}
		var k = Array.isArray,
			H = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			B = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			ue = { pending: !1, data: null, method: null, action: null },
			fe = [],
			Ie = -1;
		function O(t) {
			return { current: t };
		}
		function G(t) {
			0 > Ie || ((t.current = fe[Ie]), (fe[Ie] = null), Ie--);
		}
		function re(t, i) {
			(Ie++, (fe[Ie] = t.current), (t.current = i));
		}
		var se = O(null),
			me = O(null),
			ye = O(null),
			pe = O(null);
		function Ze(t, i) {
			switch ((re(ye, i), re(me, t), re(se, null), i.nodeType)) {
				case 9:
				case 11:
					t = (t = i.documentElement) && (t = t.namespaceURI) ? Hg(t) : 0;
					break;
				default:
					if (((t = i.tagName), (i = i.namespaceURI))) ((i = Hg(i)), (t = Zg(i, t)));
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
			(G(se), re(se, t));
		}
		function Ne() {
			(G(se), G(me), G(ye));
		}
		function rt(t) {
			t.memoizedState !== null && re(pe, t);
			var i = se.current,
				a = Zg(i, t.type);
			i !== a && (re(me, t), re(se, a));
		}
		function Nt(t) {
			(me.current === t && (G(se), G(me)), pe.current === t && (G(pe), (Iu._currentValue = ue)));
		}
		var Kt, zt;
		function kt(t) {
			if (Kt === void 0)
				try {
					throw Error();
				} catch (a) {
					var i = a.stack.trim().match(/\n( *(at )?)/);
					((Kt = (i && i[1]) || ""),
						(zt =
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
				Kt +
				t +
				zt
			);
		}
		var de = !1;
		function Te(t, i) {
			if (!t || de) return "";
			de = !0;
			var a = Error.prepareStackTrace;
			Error.prepareStackTrace = void 0;
			try {
				var s = {
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
									} catch (K) {
										var Y = K;
									}
									Reflect.construct(t, [], ee);
								} else {
									try {
										ee.call();
									} catch (K) {
										Y = K;
									}
									t.call(ee.prototype);
								}
							} else {
								try {
									throw Error();
								} catch (K) {
									Y = K;
								}
								(ee = t()) && typeof ee.catch == "function" && ee.catch(function () {});
							}
						} catch (K) {
							if (K && Y && typeof K.stack == "string") return [K.stack, Y.stack];
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
					g = d[0],
					x = d[1];
				if (g && x) {
					var M = g.split(`
`),
						P = x.split(`
`);
					for (c = s = 0; s < M.length && !M[s].includes("DetermineComponentFrameRoot"); ) s++;
					for (; c < P.length && !P[c].includes("DetermineComponentFrameRoot"); ) c++;
					if (s === M.length || c === P.length)
						for (s = M.length - 1, c = P.length - 1; 1 <= s && 0 <= c && M[s] !== P[c]; ) c--;
					for (; 1 <= s && 0 <= c; s--, c--)
						if (M[s] !== P[c]) {
							if (s !== 1 || c !== 1)
								do
									if ((s--, c--, 0 > c || M[s] !== P[c])) {
										var J =
											`
` + M[s].replace(" at new ", " at ");
										return (
											t.displayName && J.includes("<anonymous>") && (J = J.replace("<anonymous>", t.displayName)),
											J
										);
									}
								while (1 <= s && 0 <= c);
							break;
						}
				}
			} finally {
				((de = !1), (Error.prepareStackTrace = a));
			}
			return (a = t ? t.displayName || t.name : "") ? kt(a) : "";
		}
		function ot(t, i) {
			switch (t.tag) {
				case 26:
				case 27:
				case 5:
					return kt(t.type);
				case 16:
					return kt("Lazy");
				case 13:
					return t.child !== i && i !== null ? kt("Suspense Fallback") : kt("Suspense");
				case 19:
					return kt("SuspenseList");
				case 0:
				case 15:
					return Te(t.type, !1);
				case 11:
					return Te(t.type.render, !1);
				case 1:
					return Te(t.type, !0);
				case 31:
					return kt("Activity");
				default:
					return "";
			}
		}
		function Me(t) {
			try {
				var i = "",
					a = null;
				do ((i += ot(t, a)), (a = t), (t = t.return));
				while (t);
				return i;
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
		var Dt = Object.prototype.hasOwnProperty,
			bt = n.unstable_scheduleCallback,
			ae = n.unstable_cancelCallback,
			we = n.unstable_shouldYield,
			dt = n.unstable_requestPaint,
			je = n.unstable_now,
			It = n.unstable_getCurrentPriorityLevel,
			Ut = n.unstable_ImmediatePriority,
			We = n.unstable_UserBlockingPriority,
			tn = n.unstable_NormalPriority,
			Qr = n.unstable_LowPriority,
			oe = n.unstable_IdlePriority,
			xe = n.log,
			pt = n.unstable_setDisableYieldValue,
			Gt = null,
			Lt = null;
		function Mi(t) {
			if ((typeof xe == "function" && pt(t), Lt && typeof Lt.setStrictMode == "function"))
				try {
					Lt.setStrictMode(Gt, t);
				} catch {}
		}
		var vn = Math.clz32 ? Math.clz32 : VS,
			$S = Math.log,
			BS = Math.LN2;
		function VS(t) {
			return ((t >>>= 0), t === 0 ? 32 : (31 - (($S(t) / BS) | 0)) | 0);
		}
		var Ss = 256,
			ws = 262144,
			_s = 4194304;
		function fr(t) {
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
		function xs(t, i, a) {
			var s = t.pendingLanes;
			if (s === 0) return 0;
			var c = 0,
				d = t.suspendedLanes,
				g = t.pingedLanes;
			t = t.warmLanes;
			var x = s & 134217727;
			return (
				x !== 0
					? ((s = x & ~d),
						s !== 0 ? (c = fr(s)) : ((g &= x), g !== 0 ? (c = fr(g)) : a || ((a = x & ~t), a !== 0 && (c = fr(a)))))
					: ((x = s & ~d), x !== 0 ? (c = fr(x)) : g !== 0 ? (c = fr(g)) : a || ((a = s & ~t), a !== 0 && (c = fr(a)))),
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
		function Ga(t, i) {
			return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & i) === 0;
		}
		function HS(t, i) {
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
		function Ch() {
			var t = _s;
			return ((_s <<= 1), (_s & 62914560) === 0 && (_s = 4194304), t);
		}
		function Do(t) {
			for (var i = [], a = 0; 31 > a; a++) i.push(t);
			return i;
		}
		function Es(t, i) {
			((t.pendingLanes |= i), i !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
		}
		function ZS(t, i, a, s, c, d) {
			var g = t.pendingLanes;
			((t.pendingLanes = a),
				(t.suspendedLanes = 0),
				(t.pingedLanes = 0),
				(t.warmLanes = 0),
				(t.expiredLanes &= a),
				(t.entangledLanes &= a),
				(t.errorRecoveryDisabledLanes &= a),
				(t.shellSuspendCounter = 0));
			var x = t.entanglements,
				M = t.expirationTimes,
				P = t.hiddenUpdates;
			for (a = g & ~a; 0 < a; ) {
				var J = 31 - vn(a),
					ee = 1 << J;
				((x[J] = 0), (M[J] = -1));
				var Y = P[J];
				if (Y !== null)
					for (P[J] = null, J = 0; J < Y.length; J++) {
						var K = Y[J];
						K !== null && (K.lane &= -536870913);
					}
				a &= ~ee;
			}
			(s !== 0 && Th(t, s, 0), d !== 0 && c === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(g & ~i)));
		}
		function Th(t, i, a) {
			((t.pendingLanes |= i), (t.suspendedLanes &= ~i));
			var s = 31 - vn(i);
			((t.entangledLanes |= i), (t.entanglements[s] = t.entanglements[s] | 1073741824 | (a & 261930)));
		}
		function Ah(t, i) {
			var a = (t.entangledLanes |= i);
			for (t = t.entanglements; a; ) {
				var s = 31 - vn(a),
					c = 1 << s;
				((c & i) | (t[s] & i) && (t[s] |= i), (a &= ~c));
			}
		}
		function Rh(t, i) {
			var a = i & -i;
			return ((a = (a & 42) !== 0 ? 1 : Oh(a)), (a & (t.suspendedLanes | i)) !== 0 ? 0 : a);
		}
		function Oh(t) {
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
		function jo(t) {
			return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
		}
		function Nh() {
			var t = B.p;
			return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : fy(t.type));
		}
		function Mh(t, i) {
			var a = B.p;
			try {
				return ((B.p = t), i());
			} finally {
				B.p = a;
			}
		}
		var zi = Math.random().toString(36).slice(2),
			$t = "__reactFiber$" + zi,
			nn = "__reactProps$" + zi,
			Xa = "__reactContainer$" + zi,
			qo = "__reactEvents$" + zi,
			QS = "__reactListeners$" + zi,
			PS = "__reactHandles$" + zi,
			zh = "__reactResources$" + zi,
			Ja = "__reactMarker$" + zi;
		function Io(t) {
			(delete t[$t], delete t[nn], delete t[qo], delete t[QS], delete t[PS]);
		}
		function Pr(t) {
			var i = t[$t];
			if (i) return i;
			for (var a = t.parentNode; a; ) {
				if ((i = a[Xa] || a[$t])) {
					if (((a = i.alternate), i.child !== null || (a !== null && a.child !== null)))
						for (t = Xg(t); t !== null; ) {
							if ((a = t[$t])) return a;
							t = Xg(t);
						}
					return i;
				}
				((t = a), (a = t.parentNode));
			}
			return null;
		}
		function Yr(t) {
			if ((t = t[$t] || t[Xa])) {
				var i = t.tag;
				if (i === 5 || i === 6 || i === 13 || i === 31 || i === 26 || i === 27 || i === 3) return t;
			}
			return null;
		}
		function Wa(t) {
			var i = t.tag;
			if (i === 5 || i === 26 || i === 27 || i === 6) return t.stateNode;
			throw Error(l(33));
		}
		function Fr(t) {
			var i = t[zh];
			return (i || (i = t[zh] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), i);
		}
		function jt(t) {
			t[Ja] = !0;
		}
		var kh = new Set(),
			Dh = {};
		function dr(t, i) {
			(Kr(t, i), Kr(t + "Capture", i));
		}
		function Kr(t, i) {
			for (Dh[t] = i, t = 0; t < i.length; t++) kh.add(i[t]);
		}
		var YS = RegExp(
				"^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
			),
			jh = {},
			qh = {};
		function FS(t) {
			return Dt.call(qh, t) ? !0 : Dt.call(jh, t) ? !1 : YS.test(t) ? (qh[t] = !0) : ((jh[t] = !0), !1);
		}
		function Cs(t, i, a) {
			if (FS(i))
				if (a === null) t.removeAttribute(i);
				else {
					switch (typeof a) {
						case "undefined":
						case "function":
						case "symbol":
							t.removeAttribute(i);
							return;
						case "boolean":
							var s = i.toLowerCase().slice(0, 5);
							if (s !== "data-" && s !== "aria-") {
								t.removeAttribute(i);
								return;
							}
					}
					t.setAttribute(i, "" + a);
				}
		}
		function Ts(t, i, a) {
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
		function ei(t, i, a, s) {
			if (s === null) t.removeAttribute(a);
			else {
				switch (typeof s) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						t.removeAttribute(a);
						return;
				}
				t.setAttributeNS(i, a, "" + s);
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
		function Ih(t) {
			var i = t.type;
			return (t = t.nodeName) && t.toLowerCase() === "input" && (i === "checkbox" || i === "radio");
		}
		function KS(t, i, a) {
			var s = Object.getOwnPropertyDescriptor(t.constructor.prototype, i);
			if (!t.hasOwnProperty(i) && typeof s < "u" && typeof s.get == "function" && typeof s.set == "function") {
				var c = s.get,
					d = s.set;
				return (
					Object.defineProperty(t, i, {
						configurable: !0,
						get: function () {
							return c.call(this);
						},
						set: function (g) {
							((a = "" + g), d.call(this, g));
						},
					}),
					Object.defineProperty(t, i, { enumerable: s.enumerable }),
					{
						getValue: function () {
							return a;
						},
						setValue: function (g) {
							a = "" + g;
						},
						stopTracking: function () {
							((t._valueTracker = null), delete t[i]);
						},
					}
				);
			}
		}
		function Uo(t) {
			if (!t._valueTracker) {
				var i = Ih(t) ? "checked" : "value";
				t._valueTracker = KS(t, i, "" + t[i]);
			}
		}
		function Uh(t) {
			if (!t) return !1;
			var i = t._valueTracker;
			if (!i) return !0;
			var a = i.getValue(),
				s = "";
			return (t && (s = Ih(t) ? (t.checked ? "true" : "false") : t.value), (t = s), t !== a ? (i.setValue(t), !0) : !1);
		}
		function As(t) {
			if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")) return null;
			try {
				return t.activeElement || t.body;
			} catch {
				return t.body;
			}
		}
		var GS = /[\n"\\]/g;
		function En(t) {
			return t.replace(GS, function (i) {
				return "\\" + i.charCodeAt(0).toString(16) + " ";
			});
		}
		function Lo(t, i, a, s, c, d, g, x) {
			((t.name = ""),
				g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean"
					? (t.type = g)
					: t.removeAttribute("type"),
				i != null
					? g === "number"
						? ((i === 0 && t.value === "") || t.value != i) && (t.value = "" + xn(i))
						: t.value !== "" + xn(i) && (t.value = "" + xn(i))
					: (g !== "submit" && g !== "reset") || t.removeAttribute("value"),
				i != null ? $o(t, g, xn(i)) : a != null ? $o(t, g, xn(a)) : s != null && t.removeAttribute("value"),
				c == null && d != null && (t.defaultChecked = !!d),
				c != null && (t.checked = c && typeof c != "function" && typeof c != "symbol"),
				x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean"
					? (t.name = "" + xn(x))
					: t.removeAttribute("name"));
		}
		function Lh(t, i, a, s, c, d, g, x) {
			if (
				(d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (t.type = d),
				i != null || a != null)
			) {
				if (!((d !== "submit" && d !== "reset") || i != null)) {
					Uo(t);
					return;
				}
				((a = a != null ? "" + xn(a) : ""),
					(i = i != null ? "" + xn(i) : a),
					x || i === t.value || (t.value = i),
					(t.defaultValue = i));
			}
			((s = s ?? c),
				(s = typeof s != "function" && typeof s != "symbol" && !!s),
				(t.checked = x ? t.checked : !!s),
				(t.defaultChecked = !!s),
				g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" && (t.name = g),
				Uo(t));
		}
		function $o(t, i, a) {
			(i === "number" && As(t.ownerDocument) === t) || t.defaultValue === "" + a || (t.defaultValue = "" + a);
		}
		function Gr(t, i, a, s) {
			if (((t = t.options), i)) {
				i = {};
				for (var c = 0; c < a.length; c++) i["$" + a[c]] = !0;
				for (a = 0; a < t.length; a++)
					((c = i.hasOwnProperty("$" + t[a].value)),
						t[a].selected !== c && (t[a].selected = c),
						c && s && (t[a].defaultSelected = !0));
			} else {
				for (a = "" + xn(a), i = null, c = 0; c < t.length; c++) {
					if (t[c].value === a) {
						((t[c].selected = !0), s && (t[c].defaultSelected = !0));
						return;
					}
					i !== null || t[c].disabled || (i = t[c]);
				}
				i !== null && (i.selected = !0);
			}
		}
		function $h(t, i, a) {
			if (i != null && ((i = "" + xn(i)), i !== t.value && (t.value = i), a == null)) {
				t.defaultValue !== i && (t.defaultValue = i);
				return;
			}
			t.defaultValue = a != null ? "" + xn(a) : "";
		}
		function Bh(t, i, a, s) {
			if (i == null) {
				if (s != null) {
					if (a != null) throw Error(l(92));
					if (k(s)) {
						if (1 < s.length) throw Error(l(93));
						s = s[0];
					}
					a = s;
				}
				((a ??= ""), (i = a));
			}
			((a = xn(i)),
				(t.defaultValue = a),
				(s = t.textContent),
				s === a && s !== "" && s !== null && (t.value = s),
				Uo(t));
		}
		function Xr(t, i) {
			if (i) {
				var a = t.firstChild;
				if (a && a === t.lastChild && a.nodeType === 3) {
					a.nodeValue = i;
					return;
				}
			}
			t.textContent = i;
		}
		var XS = new Set(
			"animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
				" ",
			),
		);
		function Vh(t, i, a) {
			var s = i.indexOf("--") === 0;
			a == null || typeof a == "boolean" || a === ""
				? s
					? t.setProperty(i, "")
					: i === "float"
						? (t.cssFloat = "")
						: (t[i] = "")
				: s
					? t.setProperty(i, a)
					: typeof a != "number" || a === 0 || XS.has(i)
						? i === "float"
							? (t.cssFloat = a)
							: (t[i] = ("" + a).trim())
						: (t[i] = a + "px");
		}
		function Hh(t, i, a) {
			if (i != null && typeof i != "object") throw Error(l(62));
			if (((t = t.style), a != null)) {
				for (var s in a)
					!a.hasOwnProperty(s) ||
						(i != null && i.hasOwnProperty(s)) ||
						(s.indexOf("--") === 0 ? t.setProperty(s, "") : s === "float" ? (t.cssFloat = "") : (t[s] = ""));
				for (var c in i) ((s = i[c]), i.hasOwnProperty(c) && a[c] !== s && Vh(t, c, s));
			} else for (var d in i) i.hasOwnProperty(d) && Vh(t, d, i[d]);
		}
		function Bo(t) {
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
		var JS = new Map([
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
			WS =
				/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
		function Rs(t) {
			return WS.test("" + t)
				? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
				: t;
		}
		function ti() {}
		var Vo = null;
		function Ho(t) {
			return (
				(t = t.target || t.srcElement || window),
				t.correspondingUseElement && (t = t.correspondingUseElement),
				t.nodeType === 3 ? t.parentNode : t
			);
		}
		var Jr = null,
			Wr = null;
		function Zh(t) {
			var i = Yr(t);
			if (i && (t = i.stateNode)) {
				var a = t[nn] || null;
				e: switch (((t = i.stateNode), i.type)) {
					case "input":
						if (
							(Lo(t, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name),
							(i = a.name),
							a.type === "radio" && i != null)
						) {
							for (a = t; a.parentNode; ) a = a.parentNode;
							for (a = a.querySelectorAll('input[name="' + En("" + i) + '"][type="radio"]'), i = 0; i < a.length; i++) {
								var s = a[i];
								if (s !== t && s.form === t.form) {
									var c = s[nn] || null;
									if (!c) throw Error(l(90));
									Lo(s, c.value, c.defaultValue, c.defaultValue, c.checked, c.defaultChecked, c.type, c.name);
								}
							}
							for (i = 0; i < a.length; i++) ((s = a[i]), s.form === t.form && Uh(s));
						}
						break e;
					case "textarea":
						$h(t, a.value, a.defaultValue);
						break e;
					case "select":
						((i = a.value), i != null && Gr(t, !!a.multiple, i, !1));
				}
			}
		}
		var Zo = !1;
		function Qh(t, i, a) {
			if (Zo) return t(i, a);
			Zo = !0;
			try {
				return t(i);
			} finally {
				if (((Zo = !1), (Jr !== null || Wr !== null) && (vl(), Jr && ((i = Jr), (t = Wr), (Wr = Jr = null), Zh(i), t))))
					for (i = 0; i < t.length; i++) Zh(t[i]);
			}
		}
		function eu(t, i) {
			var a = t.stateNode;
			if (a === null) return null;
			var s = a[nn] || null;
			if (s === null) return null;
			a = s[i];
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
					((s = !s.disabled) ||
						((t = t.type), (s = !(t === "button" || t === "input" || t === "select" || t === "textarea"))),
						(t = !s));
					break e;
				default:
					t = !1;
			}
			if (t) return null;
			if (a && typeof a != "function") throw Error(l(231, i, typeof a));
			return a;
		}
		var ni = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
			Qo = !1;
		if (ni)
			try {
				var tu = {};
				(Object.defineProperty(tu, "passive", {
					get: function () {
						Qo = !0;
					},
				}),
					window.addEventListener("test", tu, tu),
					window.removeEventListener("test", tu, tu));
			} catch {
				Qo = !1;
			}
		var ki = null,
			Po = null,
			Os = null;
		function Ph() {
			if (Os) return Os;
			var t,
				i = Po,
				a = i.length,
				s,
				c = "value" in ki ? ki.value : ki.textContent,
				d = c.length;
			for (t = 0; t < a && i[t] === c[t]; t++);
			var g = a - t;
			for (s = 1; s <= g && i[a - s] === c[d - s]; s++);
			return (Os = c.slice(t, 1 < s ? 1 - s : void 0));
		}
		function Ns(t) {
			var i = t.keyCode;
			return (
				"charCode" in t ? ((t = t.charCode), t === 0 && i === 13 && (t = 13)) : (t = i),
				t === 10 && (t = 13),
				32 <= t || t === 13 ? t : 0
			);
		}
		function Ms() {
			return !0;
		}
		function Yh() {
			return !1;
		}
		function rn(t) {
			function i(a, s, c, d, g) {
				((this._reactName = a),
					(this._targetInst = c),
					(this.type = s),
					(this.nativeEvent = d),
					(this.target = g),
					(this.currentTarget = null));
				for (var x in t) t.hasOwnProperty(x) && ((a = t[x]), (this[x] = a ? a(d) : d[x]));
				return (
					(this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1)
						? Ms
						: Yh),
					(this.isPropagationStopped = Yh),
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
							(this.isDefaultPrevented = Ms));
					},
					stopPropagation: function () {
						var a = this.nativeEvent;
						a &&
							(a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
							(this.isPropagationStopped = Ms));
					},
					persist: function () {},
					isPersistent: Ms,
				}),
				i
			);
		}
		var hr = {
				eventPhase: 0,
				bubbles: 0,
				cancelable: 0,
				timeStamp: function (t) {
					return t.timeStamp || Date.now();
				},
				defaultPrevented: 0,
				isTrusted: 0,
			},
			zs = rn(hr),
			nu = b({}, hr, { view: 0, detail: 0 }),
			ew = rn(nu),
			Yo,
			Fo,
			iu,
			ks = b({}, nu, {
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
				getModifierState: Go,
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
						: (t !== iu &&
								(iu && t.type === "mousemove"
									? ((Yo = t.screenX - iu.screenX), (Fo = t.screenY - iu.screenY))
									: (Fo = Yo = 0),
								(iu = t)),
							Yo);
				},
				movementY: function (t) {
					return "movementY" in t ? t.movementY : Fo;
				},
			}),
			Fh = rn(ks),
			tw = rn(b({}, ks, { dataTransfer: 0 })),
			Ko = rn(b({}, nu, { relatedTarget: 0 })),
			nw = rn(b({}, hr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
			iw = rn(
				b({}, hr, {
					clipboardData: function (t) {
						return "clipboardData" in t ? t.clipboardData : window.clipboardData;
					},
				}),
			),
			Kh = rn(b({}, hr, { data: 0 })),
			rw = {
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
			aw = {
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
			uw = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
		function sw(t) {
			var i = this.nativeEvent;
			return i.getModifierState ? i.getModifierState(t) : (t = uw[t]) ? !!i[t] : !1;
		}
		function Go() {
			return sw;
		}
		var lw = rn(
				b({}, nu, {
					key: function (t) {
						if (t.key) {
							var i = rw[t.key] || t.key;
							if (i !== "Unidentified") return i;
						}
						return t.type === "keypress"
							? ((t = Ns(t)), t === 13 ? "Enter" : String.fromCharCode(t))
							: t.type === "keydown" || t.type === "keyup"
								? aw[t.keyCode] || "Unidentified"
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
					getModifierState: Go,
					charCode: function (t) {
						return t.type === "keypress" ? Ns(t) : 0;
					},
					keyCode: function (t) {
						return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
					which: function (t) {
						return t.type === "keypress" ? Ns(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
				}),
			),
			Gh = rn(
				b({}, ks, {
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
			ow = rn(
				b({}, nu, {
					touches: 0,
					targetTouches: 0,
					changedTouches: 0,
					altKey: 0,
					metaKey: 0,
					ctrlKey: 0,
					shiftKey: 0,
					getModifierState: Go,
				}),
			),
			cw = rn(b({}, hr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
			fw = rn(
				b({}, ks, {
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
			dw = rn(b({}, hr, { newState: 0, oldState: 0 })),
			hw = [9, 13, 27, 32],
			Xo = ni && "CompositionEvent" in window,
			ru = null;
		ni && "documentMode" in document && (ru = document.documentMode);
		var mw = ni && "TextEvent" in window && !ru,
			Xh = ni && (!Xo || (ru && 8 < ru && 11 >= ru)),
			Jh = " ",
			Wh = !1;
		function em(t, i) {
			switch (t) {
				case "keyup":
					return hw.indexOf(i.keyCode) !== -1;
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
		function tm(t) {
			return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
		}
		var ea = !1;
		function vw(t, i) {
			switch (t) {
				case "compositionend":
					return tm(i);
				case "keypress":
					return i.which !== 32 ? null : ((Wh = !0), Jh);
				case "textInput":
					return ((t = i.data), t === Jh && Wh ? null : t);
				default:
					return null;
			}
		}
		function gw(t, i) {
			if (ea)
				return t === "compositionend" || (!Xo && em(t, i)) ? ((t = Ph()), (Os = Po = ki = null), (ea = !1), t) : null;
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
					return Xh && i.locale !== "ko" ? null : i.data;
				default:
					return null;
			}
		}
		var yw = {
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
		function nm(t) {
			var i = t && t.nodeName && t.nodeName.toLowerCase();
			return i === "input" ? !!yw[t.type] : i === "textarea";
		}
		function im(t, i, a, s) {
			(Jr ? (Wr ? Wr.push(s) : (Wr = [s])) : (Jr = s),
				(i = _l(i, "onChange")),
				0 < i.length && ((a = new zs("onChange", "change", null, a, s)), t.push({ event: a, listeners: i })));
		}
		var au = null,
			uu = null;
		function bw(t) {
			qg(t, 0);
		}
		function Ds(t) {
			if (Uh(Wa(t))) return t;
		}
		function rm(t, i) {
			if (t === "change") return i;
		}
		var am = !1;
		if (ni) {
			var Jo;
			if (ni) {
				var Wo = "oninput" in document;
				if (!Wo) {
					var um = document.createElement("div");
					(um.setAttribute("oninput", "return;"), (Wo = typeof um.oninput == "function"));
				}
				Jo = Wo;
			} else Jo = !1;
			am = Jo && (!document.documentMode || 9 < document.documentMode);
		}
		function sm() {
			au && (au.detachEvent("onpropertychange", lm), (uu = au = null));
		}
		function lm(t) {
			if (t.propertyName === "value" && Ds(uu)) {
				var i = [];
				(im(i, uu, t, Ho(t)), Qh(bw, i));
			}
		}
		function pw(t, i, a) {
			t === "focusin" ? (sm(), (au = i), (uu = a), au.attachEvent("onpropertychange", lm)) : t === "focusout" && sm();
		}
		function Sw(t) {
			if (t === "selectionchange" || t === "keyup" || t === "keydown") return Ds(uu);
		}
		function ww(t, i) {
			if (t === "click") return Ds(i);
		}
		function _w(t, i) {
			if (t === "input" || t === "change") return Ds(i);
		}
		function xw(t, i) {
			return (t === i && (t !== 0 || 1 / t === 1 / i)) || (t !== t && i !== i);
		}
		var gn = typeof Object.is == "function" ? Object.is : xw;
		function su(t, i) {
			if (gn(t, i)) return !0;
			if (typeof t != "object" || t === null || typeof i != "object" || i === null) return !1;
			var a = Object.keys(t),
				s = Object.keys(i);
			if (a.length !== s.length) return !1;
			for (s = 0; s < a.length; s++) {
				var c = a[s];
				if (!Dt.call(i, c) || !gn(t[c], i[c])) return !1;
			}
			return !0;
		}
		function om(t) {
			for (; t && t.firstChild; ) t = t.firstChild;
			return t;
		}
		function cm(t, i) {
			var a = om(t);
			t = 0;
			for (var s; a; ) {
				if (a.nodeType === 3) {
					if (((s = t + a.textContent.length), t <= i && s >= i)) return { node: a, offset: i - t };
					t = s;
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
				a = om(a);
			}
		}
		function fm(t, i) {
			return t && i
				? t === i
					? !0
					: t && t.nodeType === 3
						? !1
						: i && i.nodeType === 3
							? fm(t, i.parentNode)
							: "contains" in t
								? t.contains(i)
								: t.compareDocumentPosition
									? !!(t.compareDocumentPosition(i) & 16)
									: !1
				: !1;
		}
		function dm(t) {
			t =
				t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
					? t.ownerDocument.defaultView
					: window;
			for (var i = As(t.document); i instanceof t.HTMLIFrameElement; ) {
				try {
					var a = typeof i.contentWindow.location.href == "string";
				} catch {
					a = !1;
				}
				if (a) t = i.contentWindow;
				else break;
				i = As(t.document);
			}
			return i;
		}
		function ec(t) {
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
		var Ew = ni && "documentMode" in document && 11 >= document.documentMode,
			ta = null,
			tc = null,
			lu = null,
			nc = !1;
		function hm(t, i, a) {
			var s = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
			nc ||
				ta == null ||
				ta !== As(s) ||
				((s = ta),
				"selectionStart" in s && ec(s)
					? (s = { start: s.selectionStart, end: s.selectionEnd })
					: ((s = ((s.ownerDocument && s.ownerDocument.defaultView) || window).getSelection()),
						(s = {
							anchorNode: s.anchorNode,
							anchorOffset: s.anchorOffset,
							focusNode: s.focusNode,
							focusOffset: s.focusOffset,
						})),
				(lu && su(lu, s)) ||
					((lu = s),
					(s = _l(tc, "onSelect")),
					0 < s.length &&
						((i = new zs("onSelect", "select", null, i, a)), t.push({ event: i, listeners: s }), (i.target = ta))));
		}
		function mr(t, i) {
			var a = {};
			return ((a[t.toLowerCase()] = i.toLowerCase()), (a["Webkit" + t] = "webkit" + i), (a["Moz" + t] = "moz" + i), a);
		}
		var na = {
				animationend: mr("Animation", "AnimationEnd"),
				animationiteration: mr("Animation", "AnimationIteration"),
				animationstart: mr("Animation", "AnimationStart"),
				transitionrun: mr("Transition", "TransitionRun"),
				transitionstart: mr("Transition", "TransitionStart"),
				transitioncancel: mr("Transition", "TransitionCancel"),
				transitionend: mr("Transition", "TransitionEnd"),
			},
			ic = {},
			mm = {};
		ni &&
			((mm = document.createElement("div").style),
			"AnimationEvent" in window ||
				(delete na.animationend.animation, delete na.animationiteration.animation, delete na.animationstart.animation),
			"TransitionEvent" in window || delete na.transitionend.transition);
		function vr(t) {
			if (ic[t]) return ic[t];
			if (!na[t]) return t;
			var i = na[t],
				a;
			for (a in i) if (i.hasOwnProperty(a) && a in mm) return (ic[t] = i[a]);
			return t;
		}
		var vm = vr("animationend"),
			gm = vr("animationiteration"),
			ym = vr("animationstart"),
			Cw = vr("transitionrun"),
			Tw = vr("transitionstart"),
			Aw = vr("transitioncancel"),
			bm = vr("transitionend"),
			pm = new Map(),
			rc =
				"abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
					" ",
				);
		rc.push("scrollEnd");
		function In(t, i) {
			(pm.set(t, i), dr(i, [t]));
		}
		var js =
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
			ia = 0,
			ac = 0;
		function qs() {
			for (var t = ia, i = (ac = ia = 0); i < t; ) {
				var a = Cn[i];
				Cn[i++] = null;
				var s = Cn[i];
				Cn[i++] = null;
				var c = Cn[i];
				Cn[i++] = null;
				var d = Cn[i];
				if (((Cn[i++] = null), s !== null && c !== null)) {
					var g = s.pending;
					(g === null ? (c.next = c) : ((c.next = g.next), (g.next = c)), (s.pending = c));
				}
				d !== 0 && Sm(a, c, d);
			}
		}
		function Is(t, i, a, s) {
			((Cn[ia++] = t),
				(Cn[ia++] = i),
				(Cn[ia++] = a),
				(Cn[ia++] = s),
				(ac |= s),
				(t.lanes |= s),
				(t = t.alternate),
				t !== null && (t.lanes |= s));
		}
		function uc(t, i, a, s) {
			return (Is(t, i, a, s), Us(t));
		}
		function gr(t, i) {
			return (Is(t, null, null, i), Us(t));
		}
		function Sm(t, i, a) {
			t.lanes |= a;
			var s = t.alternate;
			s !== null && (s.lanes |= a);
			for (var c = !1, d = t.return; d !== null; )
				((d.childLanes |= a),
					(s = d.alternate),
					s !== null && (s.childLanes |= a),
					d.tag === 22 && ((t = d.stateNode), t === null || t._visibility & 1 || (c = !0)),
					(t = d),
					(d = d.return));
			return t.tag === 3
				? ((d = t.stateNode),
					c &&
						i !== null &&
						((c = 31 - vn(a)),
						(t = d.hiddenUpdates),
						(s = t[c]),
						s === null ? (t[c] = [i]) : s.push(i),
						(i.lane = a | 536870912)),
					d)
				: null;
		}
		function Us(t) {
			if (50 < Nu) throw ((Nu = 0), (gf = null), Error(l(185)));
			for (var i = t.return; i !== null; ) ((t = i), (i = t.return));
			return t.tag === 3 ? t.stateNode : null;
		}
		var ra = {};
		function Rw(t, i, a, s) {
			((this.tag = t),
				(this.key = a),
				(this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
				(this.index = 0),
				(this.refCleanup = this.ref = null),
				(this.pendingProps = i),
				(this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
				(this.mode = s),
				(this.subtreeFlags = this.flags = 0),
				(this.deletions = null),
				(this.childLanes = this.lanes = 0),
				(this.alternate = null));
		}
		function yn(t, i, a, s) {
			return new Rw(t, i, a, s);
		}
		function sc(t) {
			return ((t = t.prototype), !(!t || !t.isReactComponent));
		}
		function ii(t, i) {
			var a = t.alternate;
			return (
				a === null
					? ((a = yn(t.tag, i, t.key, t.mode)),
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
		function wm(t, i) {
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
		function Ls(t, i, a, s, c, d) {
			var g = 0;
			if (((s = t), typeof t == "function")) sc(t) && (g = 1);
			else if (typeof t == "string")
				g = D_(t, a, se.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
			else
				e: switch (t) {
					case L:
						return ((t = yn(31, a, i, c)), (t.elementType = L), (t.lanes = d), t);
					case T:
						return yr(a.children, c, d, i);
					case D:
						((g = 8), (c |= 24));
						break;
					case A:
						return ((t = yn(12, a, i, c | 2)), (t.elementType = A), (t.lanes = d), t);
					case I:
						return ((t = yn(13, a, i, c)), (t.elementType = I), (t.lanes = d), t);
					case j:
						return ((t = yn(19, a, i, c)), (t.elementType = j), (t.lanes = d), t);
					default:
						if (typeof t == "object" && t !== null)
							switch (t.$$typeof) {
								case R:
									g = 10;
									break e;
								case N:
									g = 9;
									break e;
								case $:
									g = 11;
									break e;
								case z:
									g = 14;
									break e;
								case U:
									((g = 16), (s = null));
									break e;
							}
						((g = 29), (a = Error(l(130, t === null ? "null" : typeof t, ""))), (s = null));
				}
			return ((i = yn(g, a, i, c)), (i.elementType = t), (i.type = s), (i.lanes = d), i);
		}
		function yr(t, i, a, s) {
			return ((t = yn(7, t, s, i)), (t.lanes = a), t);
		}
		function lc(t, i, a) {
			return ((t = yn(6, t, null, i)), (t.lanes = a), t);
		}
		function _m(t) {
			var i = yn(18, null, null, 0);
			return ((i.stateNode = t), i);
		}
		function oc(t, i, a) {
			return (
				(i = yn(4, t.children !== null ? t.children : [], t.key, i)),
				(i.lanes = a),
				(i.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }),
				i
			);
		}
		var xm = new WeakMap();
		function Tn(t, i) {
			if (typeof t == "object" && t !== null) {
				var a = xm.get(t);
				return a !== void 0 ? a : ((i = { value: t, source: i, stack: Me(i) }), xm.set(t, i), i);
			}
			return { value: t, source: i, stack: Me(i) };
		}
		var aa = [],
			ua = 0,
			$s = null,
			ou = 0,
			An = [],
			Rn = 0,
			Di = null,
			Zn = 1,
			Qn = "";
		function ri(t, i) {
			((aa[ua++] = ou), (aa[ua++] = $s), ($s = t), (ou = i));
		}
		function Em(t, i, a) {
			((An[Rn++] = Zn), (An[Rn++] = Qn), (An[Rn++] = Di), (Di = t));
			var s = Zn;
			t = Qn;
			var c = 32 - vn(s) - 1;
			((s &= ~(1 << c)), (a += 1));
			var d = 32 - vn(i) + c;
			if (30 < d) {
				var g = c - (c % 5);
				((d = (s & ((1 << g) - 1)).toString(32)),
					(s >>= g),
					(c -= g),
					(Zn = (1 << (32 - vn(i) + c)) | (a << c) | s),
					(Qn = d + t));
			} else ((Zn = (1 << d) | (a << c) | s), (Qn = t));
		}
		function cc(t) {
			t.return !== null && (ri(t, 1), Em(t, 1, 0));
		}
		function fc(t) {
			for (; t === $s; ) (($s = aa[--ua]), (aa[ua] = null), (ou = aa[--ua]), (aa[ua] = null));
			for (; t === Di; )
				((Di = An[--Rn]), (An[Rn] = null), (Qn = An[--Rn]), (An[Rn] = null), (Zn = An[--Rn]), (An[Rn] = null));
		}
		function Cm(t, i) {
			((An[Rn++] = Zn), (An[Rn++] = Qn), (An[Rn++] = Di), (Zn = i.id), (Qn = i.overflow), (Di = t));
		}
		var Bt = null,
			et = null,
			qe = !1,
			ji = null,
			On = !1,
			dc = Error(l(519));
		function qi(t) {
			throw (
				cu(Tn(Error(l(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), t)),
				dc
			);
		}
		function Tm(t) {
			var i = t.stateNode,
				a = t.type,
				s = t.memoizedProps;
			switch (((i[$t] = t), (i[nn] = s), a)) {
				case "dialog":
					(Oe("cancel", i), Oe("close", i));
					break;
				case "iframe":
				case "object":
				case "embed":
					Oe("load", i);
					break;
				case "video":
				case "audio":
					for (a = 0; a < zu.length; a++) Oe(zu[a], i);
					break;
				case "source":
					Oe("error", i);
					break;
				case "img":
				case "image":
				case "link":
					(Oe("error", i), Oe("load", i));
					break;
				case "details":
					Oe("toggle", i);
					break;
				case "input":
					(Oe("invalid", i), Lh(i, s.value, s.defaultValue, s.checked, s.defaultChecked, s.type, s.name, !0));
					break;
				case "select":
					Oe("invalid", i);
					break;
				case "textarea":
					(Oe("invalid", i), Bh(i, s.value, s.defaultValue, s.children));
			}
			((a = s.children),
				(typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
				i.textContent === "" + a ||
				s.suppressHydrationWarning === !0 ||
				Bg(i.textContent, a)
					? (s.popover != null && (Oe("beforetoggle", i), Oe("toggle", i)),
						s.onScroll != null && Oe("scroll", i),
						s.onScrollEnd != null && Oe("scrollend", i),
						s.onClick != null && (i.onclick = ti),
						(i = !0))
					: (i = !1),
				i || qi(t, !0));
		}
		function Am(t) {
			for (Bt = t.return; Bt; )
				switch (Bt.tag) {
					case 5:
					case 31:
					case 13:
						On = !1;
						return;
					case 27:
					case 3:
						On = !0;
						return;
					default:
						Bt = Bt.return;
				}
		}
		function sa(t) {
			if (t !== Bt) return !1;
			if (!qe) return (Am(t), (qe = !0), !1);
			var i = t.tag,
				a;
			if (
				((a = i !== 3 && i !== 27) &&
					((a = i === 5) && ((a = t.type), (a = !(a !== "form" && a !== "button") || Nf(t.type, t.memoizedProps))),
					(a = !a)),
				a && et && qi(t),
				Am(t),
				i === 13)
			) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(l(317));
				et = Gg(t);
			} else if (i === 31) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(l(317));
				et = Gg(t);
			} else
				i === 27
					? ((i = et), Fi(t.type) ? ((t = jf), (jf = null), (et = t)) : (et = i))
					: (et = Bt ? zn(t.stateNode.nextSibling) : null);
			return !0;
		}
		function br() {
			((et = Bt = null), (qe = !1));
		}
		function hc() {
			var t = ji;
			return (t !== null && (ln === null ? (ln = t) : ln.push.apply(ln, t), (ji = null)), t);
		}
		function cu(t) {
			ji === null ? (ji = [t]) : ji.push(t);
		}
		var mc = O(null),
			pr = null,
			ai = null;
		function Ii(t, i, a) {
			(re(mc, i._currentValue), (i._currentValue = a));
		}
		function ui(t) {
			((t._currentValue = mc.current), G(mc));
		}
		function vc(t, i, a) {
			for (; t !== null; ) {
				var s = t.alternate;
				if (
					((t.childLanes & i) !== i
						? ((t.childLanes |= i), s !== null && (s.childLanes |= i))
						: s !== null && (s.childLanes & i) !== i && (s.childLanes |= i),
					t === a)
				)
					break;
				t = t.return;
			}
		}
		function gc(t, i, a, s) {
			var c = t.child;
			for (c !== null && (c.return = t); c !== null; ) {
				var d = c.dependencies;
				if (d !== null) {
					var g = c.child;
					d = d.firstContext;
					e: for (; d !== null; ) {
						var x = d;
						d = c;
						for (var M = 0; M < i.length; M++)
							if (x.context === i[M]) {
								((d.lanes |= a), (x = d.alternate), x !== null && (x.lanes |= a), vc(d.return, a, t), s || (g = null));
								break e;
							}
						d = x.next;
					}
				} else if (c.tag === 18) {
					if (((g = c.return), g === null)) throw Error(l(341));
					((g.lanes |= a), (d = g.alternate), d !== null && (d.lanes |= a), vc(g, a, t), (g = null));
				} else g = c.child;
				if (g !== null) g.return = c;
				else
					for (g = c; g !== null; ) {
						if (g === t) {
							g = null;
							break;
						}
						if (((c = g.sibling), c !== null)) {
							((c.return = g.return), (g = c));
							break;
						}
						g = g.return;
					}
				c = g;
			}
		}
		function la(t, i, a, s) {
			t = null;
			for (var c = i, d = !1; c !== null; ) {
				if (!d) {
					if ((c.flags & 524288) !== 0) d = !0;
					else if ((c.flags & 262144) !== 0) break;
				}
				if (c.tag === 10) {
					var g = c.alternate;
					if (g === null) throw Error(l(387));
					if (((g = g.memoizedProps), g !== null)) {
						var x = c.type;
						gn(c.pendingProps.value, g.value) || (t !== null ? t.push(x) : (t = [x]));
					}
				} else if (c === pe.current) {
					if (((g = c.alternate), g === null)) throw Error(l(387));
					g.memoizedState.memoizedState !== c.memoizedState.memoizedState && (t !== null ? t.push(Iu) : (t = [Iu]));
				}
				c = c.return;
			}
			(t !== null && gc(i, t, a, s), (i.flags |= 262144));
		}
		function Bs(t) {
			for (t = t.firstContext; t !== null; ) {
				if (!gn(t.context._currentValue, t.memoizedValue)) return !0;
				t = t.next;
			}
			return !1;
		}
		function Sr(t) {
			((pr = t), (ai = null), (t = t.dependencies), t !== null && (t.firstContext = null));
		}
		function Vt(t) {
			return Rm(pr, t);
		}
		function Vs(t, i) {
			return (pr === null && Sr(t), Rm(t, i));
		}
		function Rm(t, i) {
			var a = i._currentValue;
			if (((i = { context: i, memoizedValue: a, next: null }), ai === null)) {
				if (t === null) throw Error(l(308));
				((ai = i), (t.dependencies = { lanes: 0, firstContext: i }), (t.flags |= 524288));
			} else ai = ai.next = i;
			return a;
		}
		var Ow =
				typeof AbortController < "u"
					? AbortController
					: function () {
							var t = [],
								i = (this.signal = {
									aborted: !1,
									addEventListener: function (a, s) {
										t.push(s);
									},
								});
							this.abort = function () {
								((i.aborted = !0),
									t.forEach(function (a) {
										return a();
									}));
							};
						},
			Nw = n.unstable_scheduleCallback,
			Mw = n.unstable_NormalPriority,
			St = { $$typeof: R, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
		function yc() {
			return { controller: new Ow(), data: new Map(), refCount: 0 };
		}
		function fu(t) {
			(t.refCount--,
				t.refCount === 0 &&
					Nw(Mw, function () {
						t.controller.abort();
					}));
		}
		var du = null,
			bc = 0,
			oa = 0,
			ca = null;
		function zw(t, i) {
			if (du === null) {
				var a = (du = []);
				((bc = 0),
					(oa = _f()),
					(ca = {
						status: "pending",
						value: void 0,
						then: function (s) {
							a.push(s);
						},
					}));
			}
			return (bc++, i.then(Om, Om), i);
		}
		function Om() {
			if (--bc === 0 && du !== null) {
				ca !== null && (ca.status = "fulfilled");
				var t = du;
				((du = null), (oa = 0), (ca = null));
				for (var i = 0; i < t.length; i++) (0, t[i])();
			}
		}
		function kw(t, i) {
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
				t.then(
					function () {
						((s.status = "fulfilled"), (s.value = i));
						for (var c = 0; c < a.length; c++) (0, a[c])(i);
					},
					function (c) {
						for (s.status = "rejected", s.reason = c, c = 0; c < a.length; c++) (0, a[c])(void 0);
					},
				),
				s
			);
		}
		var Nm = H.S;
		H.S = function (t, i) {
			((cg = je()),
				typeof i == "object" && i !== null && typeof i.then == "function" && zw(t, i),
				Nm !== null && Nm(t, i));
		};
		var wr = O(null);
		function pc() {
			var t = wr.current;
			return t !== null ? t : Je.pooledCache;
		}
		function Hs(t, i) {
			i === null ? re(wr, wr.current) : re(wr, i.pool);
		}
		function Mm() {
			var t = pc();
			return t === null ? null : { parent: St._currentValue, pool: t };
		}
		var fa = Error(l(460)),
			Sc = Error(l(474)),
			Zs = Error(l(542)),
			Qs = { then: function () {} };
		function zm(t) {
			return ((t = t.status), t === "fulfilled" || t === "rejected");
		}
		function km(t, i, a) {
			switch (((a = t[a]), a === void 0 ? t.push(i) : a !== i && (i.then(ti, ti), (i = a)), i.status)) {
				case "fulfilled":
					return i.value;
				case "rejected":
					throw ((t = i.reason), jm(t), t);
				default:
					if (typeof i.status == "string") i.then(ti, ti);
					else {
						if (((t = Je), t !== null && 100 < t.shellSuspendCounter)) throw Error(l(482));
						((t = i),
							(t.status = "pending"),
							t.then(
								function (s) {
									if (i.status === "pending") {
										var c = i;
										((c.status = "fulfilled"), (c.value = s));
									}
								},
								function (s) {
									if (i.status === "pending") {
										var c = i;
										((c.status = "rejected"), (c.reason = s));
									}
								},
							));
					}
					switch (i.status) {
						case "fulfilled":
							return i.value;
						case "rejected":
							throw ((t = i.reason), jm(t), t);
					}
					throw ((xr = i), fa);
			}
		}
		function _r(t) {
			try {
				var i = t._init;
				return i(t._payload);
			} catch (a) {
				throw a !== null && typeof a == "object" && typeof a.then == "function" ? ((xr = a), fa) : a;
			}
		}
		var xr = null;
		function Dm() {
			if (xr === null) throw Error(l(459));
			var t = xr;
			return ((xr = null), t);
		}
		function jm(t) {
			if (t === fa || t === Zs) throw Error(l(483));
		}
		var da = null,
			hu = 0;
		function Ps(t) {
			var i = hu;
			return ((hu += 1), da === null && (da = []), km(da, t, i));
		}
		function mu(t, i) {
			((i = i.props.ref), (t.ref = i !== void 0 ? i : null));
		}
		function Ys(t, i) {
			throw i.$$typeof === S
				? Error(l(525))
				: ((t = Object.prototype.toString.call(i)),
					Error(l(31, t === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : t)));
		}
		function qm(t) {
			function i(V, q) {
				if (t) {
					var Z = V.deletions;
					Z === null ? ((V.deletions = [q]), (V.flags |= 16)) : Z.push(q);
				}
			}
			function a(V, q) {
				if (!t) return null;
				for (; q !== null; ) (i(V, q), (q = q.sibling));
				return null;
			}
			function s(V) {
				for (var q = new Map(); V !== null; ) (V.key !== null ? q.set(V.key, V) : q.set(V.index, V), (V = V.sibling));
				return q;
			}
			function c(V, q) {
				return ((V = ii(V, q)), (V.index = 0), (V.sibling = null), V);
			}
			function d(V, q, Z) {
				return (
					(V.index = Z),
					t
						? ((Z = V.alternate),
							Z !== null ? ((Z = Z.index), Z < q ? ((V.flags |= 67108866), q) : Z) : ((V.flags |= 67108866), q))
						: ((V.flags |= 1048576), q)
				);
			}
			function g(V) {
				return (t && V.alternate === null && (V.flags |= 67108866), V);
			}
			function x(V, q, Z, W) {
				return q === null || q.tag !== 6
					? ((q = lc(Z, V.mode, W)), (q.return = V), q)
					: ((q = c(q, Z)), (q.return = V), q);
			}
			function M(V, q, Z, W) {
				var ve = Z.type;
				return ve === T
					? J(V, q, Z.props.children, W, Z.key)
					: q !== null &&
						  (q.elementType === ve || (typeof ve == "object" && ve !== null && ve.$$typeof === U && _r(ve) === q.type))
						? ((q = c(q, Z.props)), mu(q, Z), (q.return = V), q)
						: ((q = Ls(Z.type, Z.key, Z.props, null, V.mode, W)), mu(q, Z), (q.return = V), q);
			}
			function P(V, q, Z, W) {
				return q === null ||
					q.tag !== 4 ||
					q.stateNode.containerInfo !== Z.containerInfo ||
					q.stateNode.implementation !== Z.implementation
					? ((q = oc(Z, V.mode, W)), (q.return = V), q)
					: ((q = c(q, Z.children || [])), (q.return = V), q);
			}
			function J(V, q, Z, W, ve) {
				return q === null || q.tag !== 7
					? ((q = yr(Z, V.mode, W, ve)), (q.return = V), q)
					: ((q = c(q, Z)), (q.return = V), q);
			}
			function ee(V, q, Z) {
				if ((typeof q == "string" && q !== "") || typeof q == "number" || typeof q == "bigint")
					return ((q = lc("" + q, V.mode, Z)), (q.return = V), q);
				if (typeof q == "object" && q !== null) {
					switch (q.$$typeof) {
						case E:
							return ((Z = Ls(q.type, q.key, q.props, null, V.mode, Z)), mu(Z, q), (Z.return = V), Z);
						case C:
							return ((q = oc(q, V.mode, Z)), (q.return = V), q);
						case U:
							return ((q = _r(q)), ee(V, q, Z));
					}
					if (k(q) || X(q)) return ((q = yr(q, V.mode, Z, null)), (q.return = V), q);
					if (typeof q.then == "function") return ee(V, Ps(q), Z);
					if (q.$$typeof === R) return ee(V, Vs(V, q), Z);
					Ys(V, q);
				}
				return null;
			}
			function Y(V, q, Z, W) {
				var ve = q !== null ? q.key : null;
				if ((typeof Z == "string" && Z !== "") || typeof Z == "number" || typeof Z == "bigint")
					return ve !== null ? null : x(V, q, "" + Z, W);
				if (typeof Z == "object" && Z !== null) {
					switch (Z.$$typeof) {
						case E:
							return Z.key === ve ? M(V, q, Z, W) : null;
						case C:
							return Z.key === ve ? P(V, q, Z, W) : null;
						case U:
							return ((Z = _r(Z)), Y(V, q, Z, W));
					}
					if (k(Z) || X(Z)) return ve !== null ? null : J(V, q, Z, W, null);
					if (typeof Z.then == "function") return Y(V, q, Ps(Z), W);
					if (Z.$$typeof === R) return Y(V, q, Vs(V, Z), W);
					Ys(V, Z);
				}
				return null;
			}
			function K(V, q, Z, W, ve) {
				if ((typeof W == "string" && W !== "") || typeof W == "number" || typeof W == "bigint")
					return ((V = V.get(Z) || null), x(q, V, "" + W, ve));
				if (typeof W == "object" && W !== null) {
					switch (W.$$typeof) {
						case E:
							return ((V = V.get(W.key === null ? Z : W.key) || null), M(q, V, W, ve));
						case C:
							return ((V = V.get(W.key === null ? Z : W.key) || null), P(q, V, W, ve));
						case U:
							return ((W = _r(W)), K(V, q, Z, W, ve));
					}
					if (k(W) || X(W)) return ((V = V.get(Z) || null), J(q, V, W, ve, null));
					if (typeof W.then == "function") return K(V, q, Z, Ps(W), ve);
					if (W.$$typeof === R) return K(V, q, Z, Vs(q, W), ve);
					Ys(q, W);
				}
				return null;
			}
			function ce(V, q, Z, W) {
				for (var ve = null, $e = null, he = q, Ae = (q = 0), ke = null; he !== null && Ae < Z.length; Ae++) {
					he.index > Ae ? ((ke = he), (he = null)) : (ke = he.sibling);
					var Be = Y(V, he, Z[Ae], W);
					if (Be === null) {
						he === null && (he = ke);
						break;
					}
					(t && he && Be.alternate === null && i(V, he),
						(q = d(Be, q, Ae)),
						$e === null ? (ve = Be) : ($e.sibling = Be),
						($e = Be),
						(he = ke));
				}
				if (Ae === Z.length) return (a(V, he), qe && ri(V, Ae), ve);
				if (he === null) {
					for (; Ae < Z.length; Ae++)
						((he = ee(V, Z[Ae], W)),
							he !== null && ((q = d(he, q, Ae)), $e === null ? (ve = he) : ($e.sibling = he), ($e = he)));
					return (qe && ri(V, Ae), ve);
				}
				for (he = s(he); Ae < Z.length; Ae++)
					((ke = K(he, V, Ae, Z[Ae], W)),
						ke !== null &&
							(t && ke.alternate !== null && he.delete(ke.key === null ? Ae : ke.key),
							(q = d(ke, q, Ae)),
							$e === null ? (ve = ke) : ($e.sibling = ke),
							($e = ke)));
				return (
					t &&
						he.forEach(function (Wi) {
							return i(V, Wi);
						}),
					qe && ri(V, Ae),
					ve
				);
			}
			function be(V, q, Z, W) {
				if (Z == null) throw Error(l(151));
				for (
					var ve = null, $e = null, he = q, Ae = (q = 0), ke = null, Be = Z.next();
					he !== null && !Be.done;
					Ae++, Be = Z.next()
				) {
					he.index > Ae ? ((ke = he), (he = null)) : (ke = he.sibling);
					var Wi = Y(V, he, Be.value, W);
					if (Wi === null) {
						he === null && (he = ke);
						break;
					}
					(t && he && Wi.alternate === null && i(V, he),
						(q = d(Wi, q, Ae)),
						$e === null ? (ve = Wi) : ($e.sibling = Wi),
						($e = Wi),
						(he = ke));
				}
				if (Be.done) return (a(V, he), qe && ri(V, Ae), ve);
				if (he === null) {
					for (; !Be.done; Ae++, Be = Z.next())
						((Be = ee(V, Be.value, W)),
							Be !== null && ((q = d(Be, q, Ae)), $e === null ? (ve = Be) : ($e.sibling = Be), ($e = Be)));
					return (qe && ri(V, Ae), ve);
				}
				for (he = s(he); !Be.done; Ae++, Be = Z.next())
					((Be = K(he, V, Ae, Be.value, W)),
						Be !== null &&
							(t && Be.alternate !== null && he.delete(Be.key === null ? Ae : Be.key),
							(q = d(Be, q, Ae)),
							$e === null ? (ve = Be) : ($e.sibling = Be),
							($e = Be)));
				return (
					t &&
						he.forEach(function (F_) {
							return i(V, F_);
						}),
					qe && ri(V, Ae),
					ve
				);
			}
			function Ge(V, q, Z, W) {
				if (
					(typeof Z == "object" && Z !== null && Z.type === T && Z.key === null && (Z = Z.props.children),
					typeof Z == "object" && Z !== null)
				) {
					switch (Z.$$typeof) {
						case E:
							e: {
								for (var ve = Z.key; q !== null; ) {
									if (q.key === ve) {
										if (((ve = Z.type), ve === T)) {
											if (q.tag === 7) {
												(a(V, q.sibling), (W = c(q, Z.props.children)), (W.return = V), (V = W));
												break e;
											}
										} else if (
											q.elementType === ve ||
											(typeof ve == "object" && ve !== null && ve.$$typeof === U && _r(ve) === q.type)
										) {
											(a(V, q.sibling), (W = c(q, Z.props)), mu(W, Z), (W.return = V), (V = W));
											break e;
										}
										a(V, q);
										break;
									} else i(V, q);
									q = q.sibling;
								}
								Z.type === T
									? ((W = yr(Z.props.children, V.mode, W, Z.key)), (W.return = V), (V = W))
									: ((W = Ls(Z.type, Z.key, Z.props, null, V.mode, W)), mu(W, Z), (W.return = V), (V = W));
							}
							return g(V);
						case C:
							e: {
								for (ve = Z.key; q !== null; ) {
									if (q.key === ve)
										if (
											q.tag === 4 &&
											q.stateNode.containerInfo === Z.containerInfo &&
											q.stateNode.implementation === Z.implementation
										) {
											(a(V, q.sibling), (W = c(q, Z.children || [])), (W.return = V), (V = W));
											break e;
										} else {
											a(V, q);
											break;
										}
									else i(V, q);
									q = q.sibling;
								}
								((W = oc(Z, V.mode, W)), (W.return = V), (V = W));
							}
							return g(V);
						case U:
							return ((Z = _r(Z)), Ge(V, q, Z, W));
					}
					if (k(Z)) return ce(V, q, Z, W);
					if (X(Z)) {
						if (((ve = X(Z)), typeof ve != "function")) throw Error(l(150));
						return ((Z = ve.call(Z)), be(V, q, Z, W));
					}
					if (typeof Z.then == "function") return Ge(V, q, Ps(Z), W);
					if (Z.$$typeof === R) return Ge(V, q, Vs(V, Z), W);
					Ys(V, Z);
				}
				return (typeof Z == "string" && Z !== "") || typeof Z == "number" || typeof Z == "bigint"
					? ((Z = "" + Z),
						q !== null && q.tag === 6
							? (a(V, q.sibling), (W = c(q, Z)), (W.return = V), (V = W))
							: (a(V, q), (W = lc(Z, V.mode, W)), (W.return = V), (V = W)),
						g(V))
					: a(V, q);
			}
			return function (V, q, Z, W) {
				try {
					hu = 0;
					var ve = Ge(V, q, Z, W);
					return ((da = null), ve);
				} catch (he) {
					if (he === fa || he === Zs) throw he;
					var $e = yn(29, he, null, V.mode);
					return (($e.lanes = W), ($e.return = V), $e);
				}
			};
		}
		var Er = qm(!0),
			Im = qm(!1),
			Ui = !1;
		function wc(t) {
			t.updateQueue = {
				baseState: t.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: { pending: null, lanes: 0, hiddenCallbacks: null },
				callbacks: null,
			};
		}
		function _c(t, i) {
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
		function Cr(t) {
			return { lane: t, tag: 0, payload: null, callback: null, next: null };
		}
		function Tr(t, i, a) {
			var s = t.updateQueue;
			if (s === null) return null;
			if (((s = s.shared), (Ve & 2) !== 0)) {
				var c = s.pending;
				return (
					c === null ? (i.next = i) : ((i.next = c.next), (c.next = i)),
					(s.pending = i),
					(i = Us(t)),
					Sm(t, null, a),
					i
				);
			}
			return (Is(t, s, i, a), Us(t));
		}
		function vu(t, i, a) {
			if (((i = i.updateQueue), i !== null && ((i = i.shared), (a & 4194048) !== 0))) {
				var s = i.lanes;
				((s &= t.pendingLanes), (a |= s), (i.lanes = a), Ah(t, a));
			}
		}
		function xc(t, i) {
			var a = t.updateQueue,
				s = t.alternate;
			if (s !== null && ((s = s.updateQueue), a === s)) {
				var c = null,
					d = null;
				if (((a = a.firstBaseUpdate), a !== null)) {
					do {
						var g = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
						(d === null ? (c = d = g) : (d = d.next = g), (a = a.next));
					} while (a !== null);
					d === null ? (c = d = i) : (d = d.next = i);
				} else c = d = i;
				((a = {
					baseState: s.baseState,
					firstBaseUpdate: c,
					lastBaseUpdate: d,
					shared: s.shared,
					callbacks: s.callbacks,
				}),
					(t.updateQueue = a));
				return;
			}
			((t = a.lastBaseUpdate), t === null ? (a.firstBaseUpdate = i) : (t.next = i), (a.lastBaseUpdate = i));
		}
		var Ec = !1;
		function gu() {
			if (Ec) {
				var t = ca;
				if (t !== null) throw t;
			}
		}
		function yu(t, i, a, s) {
			Ec = !1;
			var c = t.updateQueue;
			Ui = !1;
			var d = c.firstBaseUpdate,
				g = c.lastBaseUpdate,
				x = c.shared.pending;
			if (x !== null) {
				c.shared.pending = null;
				var M = x,
					P = M.next;
				((M.next = null), g === null ? (d = P) : (g.next = P), (g = M));
				var J = t.alternate;
				J !== null &&
					((J = J.updateQueue),
					(x = J.lastBaseUpdate),
					x !== g && (x === null ? (J.firstBaseUpdate = P) : (x.next = P), (J.lastBaseUpdate = M)));
			}
			if (d !== null) {
				var ee = c.baseState;
				((g = 0), (J = P = M = null), (x = d));
				do {
					var Y = x.lane & -536870913,
						K = Y !== x.lane;
					if (K ? (ze & Y) === Y : (s & Y) === Y) {
						(Y !== 0 && Y === oa && (Ec = !0),
							J !== null && (J = J.next = { lane: 0, tag: x.tag, payload: x.payload, callback: null, next: null }));
						e: {
							var ce = t,
								be = x;
							Y = i;
							var Ge = a;
							switch (be.tag) {
								case 1:
									if (((ce = be.payload), typeof ce == "function")) {
										ee = ce.call(Ge, ee, Y);
										break e;
									}
									ee = ce;
									break e;
								case 3:
									ce.flags = (ce.flags & -65537) | 128;
								case 0:
									if (((ce = be.payload), (Y = typeof ce == "function" ? ce.call(Ge, ee, Y) : ce), Y == null)) break e;
									ee = b({}, ee, Y);
									break e;
								case 2:
									Ui = !0;
							}
						}
						((Y = x.callback),
							Y !== null &&
								((t.flags |= 64),
								K && (t.flags |= 8192),
								(K = c.callbacks),
								K === null ? (c.callbacks = [Y]) : K.push(Y)));
					} else
						((K = { lane: Y, tag: x.tag, payload: x.payload, callback: x.callback, next: null }),
							J === null ? ((P = J = K), (M = ee)) : (J = J.next = K),
							(g |= Y));
					if (((x = x.next), x === null)) {
						if (((x = c.shared.pending), x === null)) break;
						((K = x), (x = K.next), (K.next = null), (c.lastBaseUpdate = K), (c.shared.pending = null));
					}
				} while (!0);
				(J === null && (M = ee),
					(c.baseState = M),
					(c.firstBaseUpdate = P),
					(c.lastBaseUpdate = J),
					d === null && (c.shared.lanes = 0),
					(Hi |= g),
					(t.lanes = g),
					(t.memoizedState = ee));
			}
		}
		function Um(t, i) {
			if (typeof t != "function") throw Error(l(191, t));
			t.call(i);
		}
		function Lm(t, i) {
			var a = t.callbacks;
			if (a !== null) for (t.callbacks = null, t = 0; t < a.length; t++) Um(a[t], i);
		}
		var ha = O(null),
			Fs = O(0);
		function $m(t, i) {
			((t = vi), re(Fs, t), re(ha, i), (vi = t | i.baseLanes));
		}
		function Cc() {
			(re(Fs, vi), re(ha, ha.current));
		}
		function Tc() {
			((vi = Fs.current), G(ha), G(Fs));
		}
		var bn = O(null),
			Nn = null;
		function Li(t) {
			var i = t.alternate;
			(re(ht, ht.current & 1),
				re(bn, t),
				Nn === null && (i === null || ha.current !== null || i.memoizedState !== null) && (Nn = t));
		}
		function Ac(t) {
			(re(ht, ht.current), re(bn, t), Nn === null && (Nn = t));
		}
		function Bm(t) {
			t.tag === 22 ? (re(ht, ht.current), re(bn, t), Nn === null && (Nn = t)) : $i(t);
		}
		function $i() {
			(re(ht, ht.current), re(bn, bn.current));
		}
		function pn(t) {
			(G(bn), Nn === t && (Nn = null), G(ht));
		}
		var ht = O(0);
		function Ks(t) {
			for (var i = t; i !== null; ) {
				if (i.tag === 13) {
					var a = i.memoizedState;
					if (a !== null && ((a = a.dehydrated), a === null || kf(a) || Df(a))) return i;
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
		var si = 0,
			Ce = null,
			Fe = null,
			wt = null,
			Gs = !1,
			ma = !1,
			Ar = !1,
			Xs = 0,
			bu = 0,
			va = null,
			Dw = 0;
		function ct() {
			throw Error(l(321));
		}
		function Rc(t, i) {
			if (i === null) return !1;
			for (var a = 0; a < i.length && a < t.length; a++) if (!gn(t[a], i[a])) return !1;
			return !0;
		}
		function Oc(t, i, a, s, c, d) {
			return (
				(si = d),
				(Ce = i),
				(i.memoizedState = null),
				(i.updateQueue = null),
				(i.lanes = 0),
				(H.H = t === null || t.memoizedState === null ? Ev : Zc),
				(Ar = !1),
				(d = a(s, c)),
				(Ar = !1),
				ma && (d = Hm(i, a, s, c)),
				Vm(t),
				d
			);
		}
		function Vm(t) {
			H.H = wu;
			var i = Fe !== null && Fe.next !== null;
			if (((si = 0), (wt = Fe = Ce = null), (Gs = !1), (bu = 0), (va = null), i)) throw Error(l(300));
			t === null || _t || ((t = t.dependencies), t !== null && Bs(t) && (_t = !0));
		}
		function Hm(t, i, a, s) {
			Ce = t;
			var c = 0;
			do {
				if ((ma && (va = null), (bu = 0), (ma = !1), 25 <= c)) throw Error(l(301));
				if (((c += 1), (wt = Fe = null), t.updateQueue != null)) {
					var d = t.updateQueue;
					((d.lastEffect = null), (d.events = null), (d.stores = null), d.memoCache != null && (d.memoCache.index = 0));
				}
				((H.H = Cv), (d = i(a, s)));
			} while (ma);
			return d;
		}
		function jw() {
			var t = H.H,
				i = t.useState()[0];
			return (
				(i = typeof i.then == "function" ? pu(i) : i),
				(t = t.useState()[0]),
				(Fe !== null ? Fe.memoizedState : null) !== t && (Ce.flags |= 1024),
				i
			);
		}
		function Nc() {
			var t = Xs !== 0;
			return ((Xs = 0), t);
		}
		function Mc(t, i, a) {
			((i.updateQueue = t.updateQueue), (i.flags &= -2053), (t.lanes &= ~a));
		}
		function zc(t) {
			if (Gs) {
				for (t = t.memoizedState; t !== null; ) {
					var i = t.queue;
					(i !== null && (i.pending = null), (t = t.next));
				}
				Gs = !1;
			}
			((si = 0), (wt = Fe = Ce = null), (ma = !1), (bu = Xs = 0), (va = null));
		}
		function Xt() {
			var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
			return (wt === null ? (Ce.memoizedState = wt = t) : (wt = wt.next = t), wt);
		}
		function mt() {
			if (Fe === null) {
				var t = Ce.alternate;
				t = t !== null ? t.memoizedState : null;
			} else t = Fe.next;
			var i = wt === null ? Ce.memoizedState : wt.next;
			if (i !== null) ((wt = i), (Fe = t));
			else {
				if (t === null) throw Ce.alternate === null ? Error(l(467)) : Error(l(310));
				((Fe = t),
					(t = {
						memoizedState: Fe.memoizedState,
						baseState: Fe.baseState,
						baseQueue: Fe.baseQueue,
						queue: Fe.queue,
						next: null,
					}),
					wt === null ? (Ce.memoizedState = wt = t) : (wt = wt.next = t));
			}
			return wt;
		}
		function Js() {
			return { lastEffect: null, events: null, stores: null, memoCache: null };
		}
		function pu(t) {
			var i = bu;
			return (
				(bu += 1),
				va === null && (va = []),
				(t = km(va, t, i)),
				(i = Ce),
				(wt === null ? i.memoizedState : wt.next) === null &&
					((i = i.alternate), (H.H = i === null || i.memoizedState === null ? Ev : Zc)),
				t
			);
		}
		function Ws(t) {
			if (t !== null && typeof t == "object") {
				if (typeof t.then == "function") return pu(t);
				if (t.$$typeof === R) return Vt(t);
			}
			throw Error(l(438, String(t)));
		}
		function kc(t) {
			var i = null,
				a = Ce.updateQueue;
			if ((a !== null && (i = a.memoCache), i == null)) {
				var s = Ce.alternate;
				s !== null &&
					((s = s.updateQueue),
					s !== null &&
						((s = s.memoCache),
						s != null &&
							(i = {
								data: s.data.map(function (c) {
									return c.slice();
								}),
								index: 0,
							})));
			}
			if (
				((i ??= { data: [], index: 0 }),
				a === null && ((a = Js()), (Ce.updateQueue = a)),
				(a.memoCache = i),
				(a = i.data[i.index]),
				a === void 0)
			)
				for (a = i.data[i.index] = Array(t), s = 0; s < t; s++) a[s] = Q;
			return (i.index++, a);
		}
		function li(t, i) {
			return typeof i == "function" ? i(t) : i;
		}
		function el(t) {
			return Dc(mt(), Fe, t);
		}
		function Dc(t, i, a) {
			var s = t.queue;
			if (s === null) throw Error(l(311));
			s.lastRenderedReducer = a;
			var c = t.baseQueue,
				d = s.pending;
			if (d !== null) {
				if (c !== null) {
					var g = c.next;
					((c.next = d.next), (d.next = g));
				}
				((i.baseQueue = c = d), (s.pending = null));
			}
			if (((d = t.baseState), c === null)) t.memoizedState = d;
			else {
				i = c.next;
				var x = (g = null),
					M = null,
					P = i,
					J = !1;
				do {
					var ee = P.lane & -536870913;
					if (ee !== P.lane ? (ze & ee) === ee : (si & ee) === ee) {
						var Y = P.revertLane;
						if (Y === 0)
							(M !== null &&
								(M = M.next =
									{
										lane: 0,
										revertLane: 0,
										gesture: null,
										action: P.action,
										hasEagerState: P.hasEagerState,
										eagerState: P.eagerState,
										next: null,
									}),
								ee === oa && (J = !0));
						else if ((si & Y) === Y) {
							((P = P.next), Y === oa && (J = !0));
							continue;
						} else
							((ee = {
								lane: 0,
								revertLane: P.revertLane,
								gesture: null,
								action: P.action,
								hasEagerState: P.hasEagerState,
								eagerState: P.eagerState,
								next: null,
							}),
								M === null ? ((x = M = ee), (g = d)) : (M = M.next = ee),
								(Ce.lanes |= Y),
								(Hi |= Y));
						((ee = P.action), Ar && a(d, ee), (d = P.hasEagerState ? P.eagerState : a(d, ee)));
					} else
						((Y = {
							lane: ee,
							revertLane: P.revertLane,
							gesture: P.gesture,
							action: P.action,
							hasEagerState: P.hasEagerState,
							eagerState: P.eagerState,
							next: null,
						}),
							M === null ? ((x = M = Y), (g = d)) : (M = M.next = Y),
							(Ce.lanes |= ee),
							(Hi |= ee));
					P = P.next;
				} while (P !== null && P !== i);
				if ((M === null ? (g = d) : (M.next = x), !gn(d, t.memoizedState) && ((_t = !0), J && ((a = ca), a !== null))))
					throw a;
				((t.memoizedState = d), (t.baseState = g), (t.baseQueue = M), (s.lastRenderedState = d));
			}
			return (c === null && (s.lanes = 0), [t.memoizedState, s.dispatch]);
		}
		function jc(t) {
			var i = mt(),
				a = i.queue;
			if (a === null) throw Error(l(311));
			a.lastRenderedReducer = t;
			var s = a.dispatch,
				c = a.pending,
				d = i.memoizedState;
			if (c !== null) {
				a.pending = null;
				var g = (c = c.next);
				do ((d = t(d, g.action)), (g = g.next));
				while (g !== c);
				(gn(d, i.memoizedState) || (_t = !0),
					(i.memoizedState = d),
					i.baseQueue === null && (i.baseState = d),
					(a.lastRenderedState = d));
			}
			return [d, s];
		}
		function Zm(t, i, a) {
			var s = Ce,
				c = mt(),
				d = qe;
			if (d) {
				if (a === void 0) throw Error(l(407));
				a = a();
			} else a = i();
			var g = !gn((Fe || c).memoizedState, a);
			if (
				(g && ((c.memoizedState = a), (_t = !0)),
				(c = c.queue),
				Uc(Ym.bind(null, s, c, t), [t]),
				c.getSnapshot !== i || g || (wt !== null && wt.memoizedState.tag & 1))
			) {
				if (((s.flags |= 2048), ga(9, { destroy: void 0 }, Pm.bind(null, s, c, a, i), null), Je === null))
					throw Error(l(349));
				d || (si & 127) !== 0 || Qm(s, i, a);
			}
			return a;
		}
		function Qm(t, i, a) {
			((t.flags |= 16384),
				(t = { getSnapshot: i, value: a }),
				(i = Ce.updateQueue),
				i === null
					? ((i = Js()), (Ce.updateQueue = i), (i.stores = [t]))
					: ((a = i.stores), a === null ? (i.stores = [t]) : a.push(t)));
		}
		function Pm(t, i, a, s) {
			((i.value = a), (i.getSnapshot = s), Fm(i) && Km(t));
		}
		function Ym(t, i, a) {
			return a(function () {
				Fm(i) && Km(t);
			});
		}
		function Fm(t) {
			var i = t.getSnapshot;
			t = t.value;
			try {
				var a = i();
				return !gn(t, a);
			} catch {
				return !0;
			}
		}
		function Km(t) {
			var i = gr(t, 2);
			i !== null && on(i, t, 2);
		}
		function qc(t) {
			var i = Xt();
			if (typeof t == "function") {
				var a = t;
				if (((t = a()), Ar)) {
					Mi(!0);
					try {
						a();
					} finally {
						Mi(!1);
					}
				}
			}
			return (
				(i.memoizedState = i.baseState = t),
				(i.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: li, lastRenderedState: t }),
				i
			);
		}
		function Gm(t, i, a, s) {
			return ((t.baseState = a), Dc(t, Fe, typeof s == "function" ? s : li));
		}
		function qw(t, i, a, s, c) {
			if (il(t)) throw Error(l(485));
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
					then: function (g) {
						d.listeners.push(g);
					},
				};
				(H.T !== null ? a(!0) : (d.isTransition = !1),
					s(d),
					(a = i.pending),
					a === null ? ((d.next = i.pending = d), Xm(i, d)) : ((d.next = a.next), (i.pending = a.next = d)));
			}
		}
		function Xm(t, i) {
			var a = i.action,
				s = i.payload,
				c = t.state;
			if (i.isTransition) {
				var d = H.T,
					g = {};
				H.T = g;
				try {
					var x = a(c, s),
						M = H.S;
					(M !== null && M(g, x), Jm(t, i, x));
				} catch (P) {
					Ic(t, i, P);
				} finally {
					(d !== null && g.types !== null && (d.types = g.types), (H.T = d));
				}
			} else
				try {
					((d = a(c, s)), Jm(t, i, d));
				} catch (P) {
					Ic(t, i, P);
				}
		}
		function Jm(t, i, a) {
			a !== null && typeof a == "object" && typeof a.then == "function"
				? a.then(
						function (s) {
							Wm(t, i, s);
						},
						function (s) {
							return Ic(t, i, s);
						},
					)
				: Wm(t, i, a);
		}
		function Wm(t, i, a) {
			((i.status = "fulfilled"),
				(i.value = a),
				ev(i),
				(t.state = a),
				(i = t.pending),
				i !== null && ((a = i.next), a === i ? (t.pending = null) : ((a = a.next), (i.next = a), Xm(t, a))));
		}
		function Ic(t, i, a) {
			var s = t.pending;
			if (((t.pending = null), s !== null)) {
				s = s.next;
				do ((i.status = "rejected"), (i.reason = a), ev(i), (i = i.next));
				while (i !== s);
			}
			t.action = null;
		}
		function ev(t) {
			t = t.listeners;
			for (var i = 0; i < t.length; i++) (0, t[i])();
		}
		function tv(t, i) {
			return i;
		}
		function nv(t, i) {
			if (qe) {
				var a = Je.formState;
				if (a !== null) {
					e: {
						var s = Ce;
						if (qe) {
							if (et) {
								t: {
									for (var c = et, d = On; c.nodeType !== 8; ) {
										if (!d) {
											c = null;
											break t;
										}
										if (((c = zn(c.nextSibling)), c === null)) {
											c = null;
											break t;
										}
									}
									((d = c.data), (c = d === "F!" || d === "F" ? c : null));
								}
								if (c) {
									((et = zn(c.nextSibling)), (s = c.data === "F!"));
									break e;
								}
							}
							qi(s);
						}
						s = !1;
					}
					s && (i = a[0]);
				}
			}
			return (
				(a = Xt()),
				(a.memoizedState = a.baseState = i),
				(s = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: tv, lastRenderedState: i }),
				(a.queue = s),
				(a = wv.bind(null, Ce, s)),
				(s.dispatch = a),
				(s = qc(!1)),
				(d = Hc.bind(null, Ce, !1, s.queue)),
				(s = Xt()),
				(c = { state: i, dispatch: null, action: t, pending: null }),
				(s.queue = c),
				(a = qw.bind(null, Ce, c, d, a)),
				(c.dispatch = a),
				(s.memoizedState = t),
				[i, a, !1]
			);
		}
		function iv(t) {
			return rv(mt(), Fe, t);
		}
		function rv(t, i, a) {
			if (((i = Dc(t, i, tv)[0]), (t = el(li)[0]), typeof i == "object" && i !== null && typeof i.then == "function"))
				try {
					var s = pu(i);
				} catch (g) {
					throw g === fa ? Zs : g;
				}
			else s = i;
			i = mt();
			var c = i.queue,
				d = c.dispatch;
			return (
				a !== i.memoizedState && ((Ce.flags |= 2048), ga(9, { destroy: void 0 }, Iw.bind(null, c, a), null)),
				[s, d, t]
			);
		}
		function Iw(t, i) {
			t.action = i;
		}
		function av(t) {
			var i = mt(),
				a = Fe;
			if (a !== null) return rv(i, a, t);
			(mt(), (i = i.memoizedState), (a = mt()));
			var s = a.queue.dispatch;
			return ((a.memoizedState = t), [i, s, !1]);
		}
		function ga(t, i, a, s) {
			return (
				(t = { tag: t, create: a, deps: s, inst: i, next: null }),
				(i = Ce.updateQueue),
				i === null && ((i = Js()), (Ce.updateQueue = i)),
				(a = i.lastEffect),
				a === null ? (i.lastEffect = t.next = t) : ((s = a.next), (a.next = t), (t.next = s), (i.lastEffect = t)),
				t
			);
		}
		function uv() {
			return mt().memoizedState;
		}
		function tl(t, i, a, s) {
			var c = Xt();
			((Ce.flags |= t), (c.memoizedState = ga(1 | i, { destroy: void 0 }, a, s === void 0 ? null : s)));
		}
		function nl(t, i, a, s) {
			var c = mt();
			s = s === void 0 ? null : s;
			var d = c.memoizedState.inst;
			Fe !== null && s !== null && Rc(s, Fe.memoizedState.deps)
				? (c.memoizedState = ga(i, d, a, s))
				: ((Ce.flags |= t), (c.memoizedState = ga(1 | i, d, a, s)));
		}
		function sv(t, i) {
			tl(8390656, 8, t, i);
		}
		function Uc(t, i) {
			nl(2048, 8, t, i);
		}
		function Uw(t) {
			Ce.flags |= 4;
			var i = Ce.updateQueue;
			if (i === null) ((i = Js()), (Ce.updateQueue = i), (i.events = [t]));
			else {
				var a = i.events;
				a === null ? (i.events = [t]) : a.push(t);
			}
		}
		function lv(t) {
			var i = mt().memoizedState;
			return (
				Uw({ ref: i, nextImpl: t }),
				function () {
					if ((Ve & 2) !== 0) throw Error(l(440));
					return i.impl.apply(void 0, arguments);
				}
			);
		}
		function ov(t, i) {
			return nl(4, 2, t, i);
		}
		function cv(t, i) {
			return nl(4, 4, t, i);
		}
		function fv(t, i) {
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
		function dv(t, i, a) {
			((a = a != null ? a.concat([t]) : null), nl(4, 4, fv.bind(null, i, t), a));
		}
		function Lc() {}
		function hv(t, i) {
			var a = mt();
			i = i === void 0 ? null : i;
			var s = a.memoizedState;
			return i !== null && Rc(i, s[1]) ? s[0] : ((a.memoizedState = [t, i]), t);
		}
		function mv(t, i) {
			var a = mt();
			i = i === void 0 ? null : i;
			var s = a.memoizedState;
			if (i !== null && Rc(i, s[1])) return s[0];
			if (((s = t()), Ar)) {
				Mi(!0);
				try {
					t();
				} finally {
					Mi(!1);
				}
			}
			return ((a.memoizedState = [s, i]), s);
		}
		function $c(t, i, a) {
			return a === void 0 || ((si & 1073741824) !== 0 && (ze & 261930) === 0)
				? (t.memoizedState = i)
				: ((t.memoizedState = a), (t = dg()), (Ce.lanes |= t), (Hi |= t), a);
		}
		function vv(t, i, a, s) {
			return gn(a, i)
				? a
				: ha.current !== null
					? ((t = $c(t, a, s)), gn(t, i) || (_t = !0), t)
					: (si & 42) === 0 || ((si & 1073741824) !== 0 && (ze & 261930) === 0)
						? ((_t = !0), (t.memoizedState = a))
						: ((t = dg()), (Ce.lanes |= t), (Hi |= t), i);
		}
		function gv(t, i, a, s, c) {
			var d = B.p;
			B.p = d !== 0 && 8 > d ? d : 8;
			var g = H.T,
				x = {};
			((H.T = x), Hc(t, !1, i, a));
			try {
				var M = c(),
					P = H.S;
				(P !== null && P(x, M),
					M !== null && typeof M == "object" && typeof M.then == "function"
						? Su(t, i, kw(M, s), Mn(t))
						: Su(t, i, s, Mn(t)));
			} catch (J) {
				Su(t, i, { then: function () {}, status: "rejected", reason: J }, Mn());
			} finally {
				((B.p = d), g !== null && x.types !== null && (g.types = x.types), (H.T = g));
			}
		}
		function Lw() {}
		function Bc(t, i, a, s) {
			if (t.tag !== 5) throw Error(l(476));
			var c = yv(t).queue;
			gv(
				t,
				c,
				i,
				ue,
				a === null
					? Lw
					: function () {
							return (bv(t), a(s));
						},
			);
		}
		function yv(t) {
			var i = t.memoizedState;
			if (i !== null) return i;
			i = {
				memoizedState: ue,
				baseState: ue,
				baseQueue: null,
				queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: li, lastRenderedState: ue },
				next: null,
			};
			var a = {};
			return (
				(i.next = {
					memoizedState: a,
					baseState: a,
					baseQueue: null,
					queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: li, lastRenderedState: a },
					next: null,
				}),
				(t.memoizedState = i),
				(t = t.alternate),
				t !== null && (t.memoizedState = i),
				i
			);
		}
		function bv(t) {
			var i = yv(t);
			(i.next === null && (i = t.alternate.memoizedState), Su(t, i.next.queue, {}, Mn()));
		}
		function Vc() {
			return Vt(Iu);
		}
		function pv() {
			return mt().memoizedState;
		}
		function Sv() {
			return mt().memoizedState;
		}
		function $w(t) {
			for (var i = t.return; i !== null; ) {
				switch (i.tag) {
					case 24:
					case 3:
						var a = Mn();
						t = Cr(a);
						var s = Tr(i, t, a);
						(s !== null && (on(s, i, a), vu(s, i, a)), (i = { cache: yc() }), (t.payload = i));
						return;
				}
				i = i.return;
			}
		}
		function Bw(t, i, a) {
			var s = Mn();
			((a = { lane: s, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null }),
				il(t) ? _v(i, a) : ((a = uc(t, i, a, s)), a !== null && (on(a, t, s), xv(a, i, s))));
		}
		function wv(t, i, a) {
			Su(t, i, a, Mn());
		}
		function Su(t, i, a, s) {
			var c = { lane: s, revertLane: 0, gesture: null, action: a, hasEagerState: !1, eagerState: null, next: null };
			if (il(t)) _v(i, c);
			else {
				var d = t.alternate;
				if (t.lanes === 0 && (d === null || d.lanes === 0) && ((d = i.lastRenderedReducer), d !== null))
					try {
						var g = i.lastRenderedState,
							x = d(g, a);
						if (((c.hasEagerState = !0), (c.eagerState = x), gn(x, g)))
							return (Is(t, i, c, 0), Je === null && qs(), !1);
					} catch {}
				if (((a = uc(t, i, c, s)), a !== null)) return (on(a, t, s), xv(a, i, s), !0);
			}
			return !1;
		}
		function Hc(t, i, a, s) {
			if (
				((s = { lane: 2, revertLane: _f(), gesture: null, action: s, hasEagerState: !1, eagerState: null, next: null }),
				il(t))
			) {
				if (i) throw Error(l(479));
			} else ((i = uc(t, a, s, 2)), i !== null && on(i, t, 2));
		}
		function il(t) {
			var i = t.alternate;
			return t === Ce || (i !== null && i === Ce);
		}
		function _v(t, i) {
			ma = Gs = !0;
			var a = t.pending;
			(a === null ? (i.next = i) : ((i.next = a.next), (a.next = i)), (t.pending = i));
		}
		function xv(t, i, a) {
			if ((a & 4194048) !== 0) {
				var s = i.lanes;
				((s &= t.pendingLanes), (a |= s), (i.lanes = a), Ah(t, a));
			}
		}
		var wu = {
			readContext: Vt,
			use: Ws,
			useCallback: ct,
			useContext: ct,
			useEffect: ct,
			useImperativeHandle: ct,
			useLayoutEffect: ct,
			useInsertionEffect: ct,
			useMemo: ct,
			useReducer: ct,
			useRef: ct,
			useState: ct,
			useDebugValue: ct,
			useDeferredValue: ct,
			useTransition: ct,
			useSyncExternalStore: ct,
			useId: ct,
			useHostTransitionStatus: ct,
			useFormState: ct,
			useActionState: ct,
			useOptimistic: ct,
			useMemoCache: ct,
			useCacheRefresh: ct,
		};
		wu.useEffectEvent = ct;
		var Ev = {
				readContext: Vt,
				use: Ws,
				useCallback: function (t, i) {
					return ((Xt().memoizedState = [t, i === void 0 ? null : i]), t);
				},
				useContext: Vt,
				useEffect: sv,
				useImperativeHandle: function (t, i, a) {
					((a = a != null ? a.concat([t]) : null), tl(4194308, 4, fv.bind(null, i, t), a));
				},
				useLayoutEffect: function (t, i) {
					return tl(4194308, 4, t, i);
				},
				useInsertionEffect: function (t, i) {
					tl(4, 2, t, i);
				},
				useMemo: function (t, i) {
					var a = Xt();
					i = i === void 0 ? null : i;
					var s = t();
					if (Ar) {
						Mi(!0);
						try {
							t();
						} finally {
							Mi(!1);
						}
					}
					return ((a.memoizedState = [s, i]), s);
				},
				useReducer: function (t, i, a) {
					var s = Xt();
					if (a !== void 0) {
						var c = a(i);
						if (Ar) {
							Mi(!0);
							try {
								a(i);
							} finally {
								Mi(!1);
							}
						}
					} else c = i;
					return (
						(s.memoizedState = s.baseState = c),
						(t = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: c }),
						(s.queue = t),
						(t = t.dispatch = Bw.bind(null, Ce, t)),
						[s.memoizedState, t]
					);
				},
				useRef: function (t) {
					var i = Xt();
					return ((t = { current: t }), (i.memoizedState = t));
				},
				useState: function (t) {
					t = qc(t);
					var i = t.queue,
						a = wv.bind(null, Ce, i);
					return ((i.dispatch = a), [t.memoizedState, a]);
				},
				useDebugValue: Lc,
				useDeferredValue: function (t, i) {
					return $c(Xt(), t, i);
				},
				useTransition: function () {
					var t = qc(!1);
					return ((t = gv.bind(null, Ce, t.queue, !0, !1)), (Xt().memoizedState = t), [!1, t]);
				},
				useSyncExternalStore: function (t, i, a) {
					var s = Ce,
						c = Xt();
					if (qe) {
						if (a === void 0) throw Error(l(407));
						a = a();
					} else {
						if (((a = i()), Je === null)) throw Error(l(349));
						(ze & 127) !== 0 || Qm(s, i, a);
					}
					c.memoizedState = a;
					var d = { value: a, getSnapshot: i };
					return (
						(c.queue = d),
						sv(Ym.bind(null, s, d, t), [t]),
						(s.flags |= 2048),
						ga(9, { destroy: void 0 }, Pm.bind(null, s, d, a, i), null),
						a
					);
				},
				useId: function () {
					var t = Xt(),
						i = Je.identifierPrefix;
					if (qe) {
						var a = Qn,
							s = Zn;
						((a = (s & ~(1 << (32 - vn(s) - 1))).toString(32) + a),
							(i = "_" + i + "R_" + a),
							(a = Xs++),
							0 < a && (i += "H" + a.toString(32)),
							(i += "_"));
					} else ((a = Dw++), (i = "_" + i + "r_" + a.toString(32) + "_"));
					return (t.memoizedState = i);
				},
				useHostTransitionStatus: Vc,
				useFormState: nv,
				useActionState: nv,
				useOptimistic: function (t) {
					var i = Xt();
					i.memoizedState = i.baseState = t;
					var a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
					return ((i.queue = a), (i = Hc.bind(null, Ce, !0, a)), (a.dispatch = i), [t, i]);
				},
				useMemoCache: kc,
				useCacheRefresh: function () {
					return (Xt().memoizedState = $w.bind(null, Ce));
				},
				useEffectEvent: function (t) {
					var i = Xt(),
						a = { impl: t };
					return (
						(i.memoizedState = a),
						function () {
							if ((Ve & 2) !== 0) throw Error(l(440));
							return a.impl.apply(void 0, arguments);
						}
					);
				},
			},
			Zc = {
				readContext: Vt,
				use: Ws,
				useCallback: hv,
				useContext: Vt,
				useEffect: Uc,
				useImperativeHandle: dv,
				useInsertionEffect: ov,
				useLayoutEffect: cv,
				useMemo: mv,
				useReducer: el,
				useRef: uv,
				useState: function () {
					return el(li);
				},
				useDebugValue: Lc,
				useDeferredValue: function (t, i) {
					return vv(mt(), Fe.memoizedState, t, i);
				},
				useTransition: function () {
					var t = el(li)[0],
						i = mt().memoizedState;
					return [typeof t == "boolean" ? t : pu(t), i];
				},
				useSyncExternalStore: Zm,
				useId: pv,
				useHostTransitionStatus: Vc,
				useFormState: iv,
				useActionState: iv,
				useOptimistic: function (t, i) {
					return Gm(mt(), Fe, t, i);
				},
				useMemoCache: kc,
				useCacheRefresh: Sv,
			};
		Zc.useEffectEvent = lv;
		var Cv = {
			readContext: Vt,
			use: Ws,
			useCallback: hv,
			useContext: Vt,
			useEffect: Uc,
			useImperativeHandle: dv,
			useInsertionEffect: ov,
			useLayoutEffect: cv,
			useMemo: mv,
			useReducer: jc,
			useRef: uv,
			useState: function () {
				return jc(li);
			},
			useDebugValue: Lc,
			useDeferredValue: function (t, i) {
				var a = mt();
				return Fe === null ? $c(a, t, i) : vv(a, Fe.memoizedState, t, i);
			},
			useTransition: function () {
				var t = jc(li)[0],
					i = mt().memoizedState;
				return [typeof t == "boolean" ? t : pu(t), i];
			},
			useSyncExternalStore: Zm,
			useId: pv,
			useHostTransitionStatus: Vc,
			useFormState: av,
			useActionState: av,
			useOptimistic: function (t, i) {
				var a = mt();
				return Fe !== null ? Gm(a, Fe, t, i) : ((a.baseState = t), [t, a.queue.dispatch]);
			},
			useMemoCache: kc,
			useCacheRefresh: Sv,
		};
		Cv.useEffectEvent = lv;
		function Qc(t, i, a, s) {
			((i = t.memoizedState),
				(a = a(s, i)),
				(a = a == null ? i : b({}, i, a)),
				(t.memoizedState = a),
				t.lanes === 0 && (t.updateQueue.baseState = a));
		}
		var Pc = {
			enqueueSetState: function (t, i, a) {
				t = t._reactInternals;
				var s = Mn(),
					c = Cr(s);
				((c.payload = i), a != null && (c.callback = a), (i = Tr(t, c, s)), i !== null && (on(i, t, s), vu(i, t, s)));
			},
			enqueueReplaceState: function (t, i, a) {
				t = t._reactInternals;
				var s = Mn(),
					c = Cr(s);
				((c.tag = 1),
					(c.payload = i),
					a != null && (c.callback = a),
					(i = Tr(t, c, s)),
					i !== null && (on(i, t, s), vu(i, t, s)));
			},
			enqueueForceUpdate: function (t, i) {
				t = t._reactInternals;
				var a = Mn(),
					s = Cr(a);
				((s.tag = 2), i != null && (s.callback = i), (i = Tr(t, s, a)), i !== null && (on(i, t, a), vu(i, t, a)));
			},
		};
		function Tv(t, i, a, s, c, d, g) {
			return (
				(t = t.stateNode),
				typeof t.shouldComponentUpdate == "function"
					? t.shouldComponentUpdate(s, d, g)
					: i.prototype && i.prototype.isPureReactComponent
						? !su(a, s) || !su(c, d)
						: !0
			);
		}
		function Av(t, i, a, s) {
			((t = i.state),
				typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(a, s),
				typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(a, s),
				i.state !== t && Pc.enqueueReplaceState(i, i.state, null));
		}
		function Rr(t, i) {
			var a = i;
			if ("ref" in i) {
				a = {};
				for (var s in i) s !== "ref" && (a[s] = i[s]);
			}
			if ((t = t.defaultProps)) {
				a === i && (a = b({}, a));
				for (var c in t) a[c] === void 0 && (a[c] = t[c]);
			}
			return a;
		}
		function Vw(t) {
			js(t);
		}
		function Hw(t) {
			console.error(t);
		}
		function Zw(t) {
			js(t);
		}
		function rl(t, i) {
			try {
				var a = t.onUncaughtError;
				a(i.value, { componentStack: i.stack });
			} catch (s) {
				setTimeout(function () {
					throw s;
				});
			}
		}
		function Rv(t, i, a) {
			try {
				var s = t.onCaughtError;
				s(a.value, { componentStack: a.stack, errorBoundary: i.tag === 1 ? i.stateNode : null });
			} catch (c) {
				setTimeout(function () {
					throw c;
				});
			}
		}
		function Yc(t, i, a) {
			return (
				(a = Cr(a)),
				(a.tag = 3),
				(a.payload = { element: null }),
				(a.callback = function () {
					rl(t, i);
				}),
				a
			);
		}
		function Ov(t) {
			return ((t = Cr(t)), (t.tag = 3), t);
		}
		function Nv(t, i, a, s) {
			var c = a.type.getDerivedStateFromError;
			if (typeof c == "function") {
				var d = s.value;
				((t.payload = function () {
					return c(d);
				}),
					(t.callback = function () {
						Rv(i, a, s);
					}));
			}
			var g = a.stateNode;
			g !== null &&
				typeof g.componentDidCatch == "function" &&
				(t.callback = function () {
					(Rv(i, a, s), typeof c != "function" && (Zi === null ? (Zi = new Set([this])) : Zi.add(this)));
					var x = s.stack;
					this.componentDidCatch(s.value, { componentStack: x !== null ? x : "" });
				});
		}
		function Qw(t, i, a, s, c) {
			if (((a.flags |= 32768), s !== null && typeof s == "object" && typeof s.then == "function")) {
				if (((i = a.alternate), i !== null && la(i, a, c, !0), (a = bn.current), a !== null)) {
					switch (a.tag) {
						case 31:
						case 13:
							return (
								Nn === null ? gl() : a.alternate === null && ft === 0 && (ft = 3),
								(a.flags &= -257),
								(a.flags |= 65536),
								(a.lanes = c),
								s === Qs
									? (a.flags |= 16384)
									: ((i = a.updateQueue), i === null ? (a.updateQueue = new Set([s])) : i.add(s), pf(t, s, c)),
								!1
							);
						case 22:
							return (
								(a.flags |= 65536),
								s === Qs
									? (a.flags |= 16384)
									: ((i = a.updateQueue),
										i === null
											? ((i = { transitions: null, markerInstances: null, retryQueue: new Set([s]) }),
												(a.updateQueue = i))
											: ((a = i.retryQueue), a === null ? (i.retryQueue = new Set([s])) : a.add(s)),
										pf(t, s, c)),
								!1
							);
					}
					throw Error(l(435, a.tag));
				}
				return (pf(t, s, c), gl(), !1);
			}
			if (qe)
				return (
					(i = bn.current),
					i !== null
						? ((i.flags & 65536) === 0 && (i.flags |= 256),
							(i.flags |= 65536),
							(i.lanes = c),
							s !== dc && ((t = Error(l(422), { cause: s })), cu(Tn(t, a))))
						: (s !== dc && ((i = Error(l(423), { cause: s })), cu(Tn(i, a))),
							(t = t.current.alternate),
							(t.flags |= 65536),
							(c &= -c),
							(t.lanes |= c),
							(s = Tn(s, a)),
							(c = Yc(t.stateNode, s, c)),
							xc(t, c),
							ft !== 4 && (ft = 2)),
					!1
				);
			var d = Error(l(520), { cause: s });
			if (((d = Tn(d, a)), Ou === null ? (Ou = [d]) : Ou.push(d), ft !== 4 && (ft = 2), i === null)) return !0;
			((s = Tn(s, a)), (a = i));
			do {
				switch (a.tag) {
					case 3:
						return ((a.flags |= 65536), (t = c & -c), (a.lanes |= t), (t = Yc(a.stateNode, s, t)), xc(a, t), !1);
					case 1:
						if (
							((i = a.type),
							(d = a.stateNode),
							(a.flags & 128) === 0 &&
								(typeof i.getDerivedStateFromError == "function" ||
									(d !== null && typeof d.componentDidCatch == "function" && (Zi === null || !Zi.has(d)))))
						)
							return ((a.flags |= 65536), (c &= -c), (a.lanes |= c), (c = Ov(c)), Nv(c, t, a, s), xc(a, c), !1);
				}
				a = a.return;
			} while (a !== null);
			return !1;
		}
		var Fc = Error(l(461)),
			_t = !1;
		function Ht(t, i, a, s) {
			i.child = t === null ? Im(i, null, a, s) : Er(i, t.child, a, s);
		}
		function Mv(t, i, a, s, c) {
			a = a.render;
			var d = i.ref;
			if ("ref" in s) {
				var g = {};
				for (var x in s) x !== "ref" && (g[x] = s[x]);
			} else g = s;
			return (
				Sr(i),
				(s = Oc(t, i, a, g, d, c)),
				(x = Nc()),
				t !== null && !_t ? (Mc(t, i, c), oi(t, i, c)) : (qe && x && cc(i), (i.flags |= 1), Ht(t, i, s, c), i.child)
			);
		}
		function zv(t, i, a, s, c) {
			if (t === null) {
				var d = a.type;
				return typeof d == "function" && !sc(d) && d.defaultProps === void 0 && a.compare === null
					? ((i.tag = 15), (i.type = d), kv(t, i, d, s, c))
					: ((t = Ls(a.type, null, s, i, i.mode, c)), (t.ref = i.ref), (t.return = i), (i.child = t));
			}
			if (((d = t.child), !nf(t, c))) {
				var g = d.memoizedProps;
				if (((a = a.compare), (a = a !== null ? a : su), a(g, s) && t.ref === i.ref)) return oi(t, i, c);
			}
			return ((i.flags |= 1), (t = ii(d, s)), (t.ref = i.ref), (t.return = i), (i.child = t));
		}
		function kv(t, i, a, s, c) {
			if (t !== null) {
				var d = t.memoizedProps;
				if (su(d, s) && t.ref === i.ref)
					if (((_t = !1), (i.pendingProps = s = d), nf(t, c))) (t.flags & 131072) !== 0 && (_t = !0);
					else return ((i.lanes = t.lanes), oi(t, i, c));
			}
			return Kc(t, i, a, s, c);
		}
		function Dv(t, i, a, s) {
			var c = s.children,
				d = t !== null ? t.memoizedState : null;
			if (
				(t === null &&
					i.stateNode === null &&
					(i.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				s.mode === "hidden")
			) {
				if ((i.flags & 128) !== 0) {
					if (((d = d !== null ? d.baseLanes | a : a), t !== null)) {
						for (s = i.child = t.child, c = 0; s !== null; ) ((c = c | s.lanes | s.childLanes), (s = s.sibling));
						s = c & ~d;
					} else ((s = 0), (i.child = null));
					return jv(t, i, d, a, s);
				}
				if ((a & 536870912) !== 0)
					((i.memoizedState = { baseLanes: 0, cachePool: null }),
						t !== null && Hs(i, d !== null ? d.cachePool : null),
						d !== null ? $m(i, d) : Cc(),
						Bm(i));
				else return ((s = i.lanes = 536870912), jv(t, i, d !== null ? d.baseLanes | a : a, a, s));
			} else
				d !== null
					? (Hs(i, d.cachePool), $m(i, d), $i(i), (i.memoizedState = null))
					: (t !== null && Hs(i, null), Cc(), $i(i));
			return (Ht(t, i, c, a), i.child);
		}
		function _u(t, i) {
			return (
				(t !== null && t.tag === 22) ||
					i.stateNode !== null ||
					(i.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				i.sibling
			);
		}
		function jv(t, i, a, s, c) {
			var d = pc();
			return (
				(d = d === null ? null : { parent: St._currentValue, pool: d }),
				(i.memoizedState = { baseLanes: a, cachePool: d }),
				t !== null && Hs(i, null),
				Cc(),
				Bm(i),
				t !== null && la(t, i, s, !0),
				(i.childLanes = c),
				null
			);
		}
		function al(t, i) {
			return (
				(i = sl({ mode: i.mode, children: i.children }, t.mode)),
				(i.ref = t.ref),
				(t.child = i),
				(i.return = t),
				i
			);
		}
		function qv(t, i, a) {
			return (Er(i, t.child, null, a), (t = al(i, i.pendingProps)), (t.flags |= 2), pn(i), (i.memoizedState = null), t);
		}
		function Pw(t, i, a) {
			var s = i.pendingProps,
				c = (i.flags & 128) !== 0;
			if (((i.flags &= -129), t === null)) {
				if (qe) {
					if (s.mode === "hidden") return ((t = al(i, s)), (i.lanes = 536870912), _u(null, t));
					if (
						(Ac(i),
						(t = et)
							? ((t = Kg(t, On)),
								(t = t !== null && t.data === "&" ? t : null),
								t !== null &&
									((i.memoizedState = {
										dehydrated: t,
										treeContext: Di !== null ? { id: Zn, overflow: Qn } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = _m(t)),
									(a.return = i),
									(i.child = a),
									(Bt = i),
									(et = null)))
							: (t = null),
						t === null)
					)
						throw qi(i);
					return ((i.lanes = 536870912), null);
				}
				return al(i, s);
			}
			var d = t.memoizedState;
			if (d !== null) {
				var g = d.dehydrated;
				if ((Ac(i), c))
					if (i.flags & 256) ((i.flags &= -257), (i = qv(t, i, a)));
					else if (i.memoizedState !== null) ((i.child = t.child), (i.flags |= 128), (i = null));
					else throw Error(l(558));
				else if ((_t || la(t, i, a, !1), (c = (a & t.childLanes) !== 0), _t || c)) {
					if (((s = Je), s !== null && ((g = Rh(s, a)), g !== 0 && g !== d.retryLane)))
						throw ((d.retryLane = g), gr(t, g), on(s, t, g), Fc);
					(gl(), (i = qv(t, i, a)));
				} else
					((t = d.treeContext),
						(et = zn(g.nextSibling)),
						(Bt = i),
						(qe = !0),
						(ji = null),
						(On = !1),
						t !== null && Cm(i, t),
						(i = al(i, s)),
						(i.flags |= 4096));
				return i;
			}
			return (
				(t = ii(t.child, { mode: s.mode, children: s.children })),
				(t.ref = i.ref),
				(i.child = t),
				(t.return = i),
				t
			);
		}
		function ul(t, i) {
			var a = i.ref;
			if (a === null) t !== null && t.ref !== null && (i.flags |= 4194816);
			else {
				if (typeof a != "function" && typeof a != "object") throw Error(l(284));
				(t === null || t.ref !== a) && (i.flags |= 4194816);
			}
		}
		function Kc(t, i, a, s, c) {
			return (
				Sr(i),
				(a = Oc(t, i, a, s, void 0, c)),
				(s = Nc()),
				t !== null && !_t ? (Mc(t, i, c), oi(t, i, c)) : (qe && s && cc(i), (i.flags |= 1), Ht(t, i, a, c), i.child)
			);
		}
		function Iv(t, i, a, s, c, d) {
			return (
				Sr(i),
				(i.updateQueue = null),
				(a = Hm(i, s, a, c)),
				Vm(t),
				(s = Nc()),
				t !== null && !_t ? (Mc(t, i, d), oi(t, i, d)) : (qe && s && cc(i), (i.flags |= 1), Ht(t, i, a, d), i.child)
			);
		}
		function Uv(t, i, a, s, c) {
			if ((Sr(i), i.stateNode === null)) {
				var d = ra,
					g = a.contextType;
				(typeof g == "object" && g !== null && (d = Vt(g)),
					(d = new a(s, d)),
					(i.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null),
					(d.updater = Pc),
					(i.stateNode = d),
					(d._reactInternals = i),
					(d = i.stateNode),
					(d.props = s),
					(d.state = i.memoizedState),
					(d.refs = {}),
					wc(i),
					(g = a.contextType),
					(d.context = typeof g == "object" && g !== null ? Vt(g) : ra),
					(d.state = i.memoizedState),
					(g = a.getDerivedStateFromProps),
					typeof g == "function" && (Qc(i, a, g, s), (d.state = i.memoizedState)),
					typeof a.getDerivedStateFromProps == "function" ||
						typeof d.getSnapshotBeforeUpdate == "function" ||
						(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
						((g = d.state),
						typeof d.componentWillMount == "function" && d.componentWillMount(),
						typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(),
						g !== d.state && Pc.enqueueReplaceState(d, d.state, null),
						yu(i, s, d, c),
						gu(),
						(d.state = i.memoizedState)),
					typeof d.componentDidMount == "function" && (i.flags |= 4194308),
					(s = !0));
			} else if (t === null) {
				d = i.stateNode;
				var x = i.memoizedProps,
					M = Rr(a, x);
				d.props = M;
				var P = d.context,
					J = a.contextType;
				((g = ra), typeof J == "object" && J !== null && (g = Vt(J)));
				var ee = a.getDerivedStateFromProps;
				((J = typeof ee == "function" || typeof d.getSnapshotBeforeUpdate == "function"),
					(x = i.pendingProps !== x),
					J ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((x || P !== g) && Av(i, d, s, g)),
					(Ui = !1));
				var Y = i.memoizedState;
				((d.state = Y),
					yu(i, s, d, c),
					gu(),
					(P = i.memoizedState),
					x || Y !== P || Ui
						? (typeof ee == "function" && (Qc(i, a, ee, s), (P = i.memoizedState)),
							(M = Ui || Tv(i, a, M, s, Y, P, g))
								? (J ||
										(typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function") ||
										(typeof d.componentWillMount == "function" && d.componentWillMount(),
										typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()),
									typeof d.componentDidMount == "function" && (i.flags |= 4194308))
								: (typeof d.componentDidMount == "function" && (i.flags |= 4194308),
									(i.memoizedProps = s),
									(i.memoizedState = P)),
							(d.props = s),
							(d.state = P),
							(d.context = g),
							(s = M))
						: (typeof d.componentDidMount == "function" && (i.flags |= 4194308), (s = !1)));
			} else {
				((d = i.stateNode),
					_c(t, i),
					(g = i.memoizedProps),
					(J = Rr(a, g)),
					(d.props = J),
					(ee = i.pendingProps),
					(Y = d.context),
					(P = a.contextType),
					(M = ra),
					typeof P == "object" && P !== null && (M = Vt(P)),
					(x = a.getDerivedStateFromProps),
					(P = typeof x == "function" || typeof d.getSnapshotBeforeUpdate == "function") ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((g !== ee || Y !== M) && Av(i, d, s, M)),
					(Ui = !1),
					(Y = i.memoizedState),
					(d.state = Y),
					yu(i, s, d, c),
					gu());
				var K = i.memoizedState;
				g !== ee || Y !== K || Ui || (t !== null && t.dependencies !== null && Bs(t.dependencies))
					? (typeof x == "function" && (Qc(i, a, x, s), (K = i.memoizedState)),
						(J = Ui || Tv(i, a, J, s, Y, K, M) || (t !== null && t.dependencies !== null && Bs(t.dependencies)))
							? (P ||
									(typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function") ||
									(typeof d.componentWillUpdate == "function" && d.componentWillUpdate(s, K, M),
									typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(s, K, M)),
								typeof d.componentDidUpdate == "function" && (i.flags |= 4),
								typeof d.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024))
							: (typeof d.componentDidUpdate != "function" ||
									(g === t.memoizedProps && Y === t.memoizedState) ||
									(i.flags |= 4),
								typeof d.getSnapshotBeforeUpdate != "function" ||
									(g === t.memoizedProps && Y === t.memoizedState) ||
									(i.flags |= 1024),
								(i.memoizedProps = s),
								(i.memoizedState = K)),
						(d.props = s),
						(d.state = K),
						(d.context = M),
						(s = J))
					: (typeof d.componentDidUpdate != "function" ||
							(g === t.memoizedProps && Y === t.memoizedState) ||
							(i.flags |= 4),
						typeof d.getSnapshotBeforeUpdate != "function" ||
							(g === t.memoizedProps && Y === t.memoizedState) ||
							(i.flags |= 1024),
						(s = !1));
			}
			return (
				(d = s),
				ul(t, i),
				(s = (i.flags & 128) !== 0),
				d || s
					? ((d = i.stateNode),
						(a = s && typeof a.getDerivedStateFromError != "function" ? null : d.render()),
						(i.flags |= 1),
						t !== null && s ? ((i.child = Er(i, t.child, null, c)), (i.child = Er(i, null, a, c))) : Ht(t, i, a, c),
						(i.memoizedState = d.state),
						(t = i.child))
					: (t = oi(t, i, c)),
				t
			);
		}
		function Lv(t, i, a, s) {
			return (br(), (i.flags |= 256), Ht(t, i, a, s), i.child);
		}
		var Gc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
		function Xc(t) {
			return { baseLanes: t, cachePool: Mm() };
		}
		function Jc(t, i, a) {
			return ((t = t !== null ? t.childLanes & ~a : 0), i && (t |= wn), t);
		}
		function $v(t, i, a) {
			var s = i.pendingProps,
				c = !1,
				d = (i.flags & 128) !== 0,
				g;
			if (
				((g = d) || (g = t !== null && t.memoizedState === null ? !1 : (ht.current & 2) !== 0),
				g && ((c = !0), (i.flags &= -129)),
				(g = (i.flags & 32) !== 0),
				(i.flags &= -33),
				t === null)
			) {
				if (qe) {
					if (
						(c ? Li(i) : $i(i),
						(t = et)
							? ((t = Kg(t, On)),
								(t = t !== null && t.data !== "&" ? t : null),
								t !== null &&
									((i.memoizedState = {
										dehydrated: t,
										treeContext: Di !== null ? { id: Zn, overflow: Qn } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(a = _m(t)),
									(a.return = i),
									(i.child = a),
									(Bt = i),
									(et = null)))
							: (t = null),
						t === null)
					)
						throw qi(i);
					return (Df(t) ? (i.lanes = 32) : (i.lanes = 536870912), null);
				}
				var x = s.children;
				return (
					(s = s.fallback),
					c
						? ($i(i),
							(c = i.mode),
							(x = sl({ mode: "hidden", children: x }, c)),
							(s = yr(s, c, a, null)),
							(x.return = i),
							(s.return = i),
							(x.sibling = s),
							(i.child = x),
							(s = i.child),
							(s.memoizedState = Xc(a)),
							(s.childLanes = Jc(t, g, a)),
							(i.memoizedState = Gc),
							_u(null, s))
						: (Li(i), Wc(i, x))
				);
			}
			var M = t.memoizedState;
			if (M !== null && ((x = M.dehydrated), x !== null)) {
				if (d)
					i.flags & 256
						? (Li(i), (i.flags &= -257), (i = ef(t, i, a)))
						: i.memoizedState !== null
							? ($i(i), (i.child = t.child), (i.flags |= 128), (i = null))
							: ($i(i),
								(x = s.fallback),
								(c = i.mode),
								(s = sl({ mode: "visible", children: s.children }, c)),
								(x = yr(x, c, a, null)),
								(x.flags |= 2),
								(s.return = i),
								(x.return = i),
								(s.sibling = x),
								(i.child = s),
								Er(i, t.child, null, a),
								(s = i.child),
								(s.memoizedState = Xc(a)),
								(s.childLanes = Jc(t, g, a)),
								(i.memoizedState = Gc),
								(i = _u(null, s)));
				else if ((Li(i), Df(x))) {
					if (((g = x.nextSibling && x.nextSibling.dataset), g)) var P = g.dgst;
					((g = P),
						(s = Error(l(419))),
						(s.stack = ""),
						(s.digest = g),
						cu({ value: s, source: null, stack: null }),
						(i = ef(t, i, a)));
				} else if ((_t || la(t, i, a, !1), (g = (a & t.childLanes) !== 0), _t || g)) {
					if (((g = Je), g !== null && ((s = Rh(g, a)), s !== 0 && s !== M.retryLane)))
						throw ((M.retryLane = s), gr(t, s), on(g, t, s), Fc);
					(kf(x) || gl(), (i = ef(t, i, a)));
				} else
					kf(x)
						? ((i.flags |= 192), (i.child = t.child), (i = null))
						: ((t = M.treeContext),
							(et = zn(x.nextSibling)),
							(Bt = i),
							(qe = !0),
							(ji = null),
							(On = !1),
							t !== null && Cm(i, t),
							(i = Wc(i, s.children)),
							(i.flags |= 4096));
				return i;
			}
			return c
				? ($i(i),
					(x = s.fallback),
					(c = i.mode),
					(M = t.child),
					(P = M.sibling),
					(s = ii(M, { mode: "hidden", children: s.children })),
					(s.subtreeFlags = M.subtreeFlags & 65011712),
					P !== null ? (x = ii(P, x)) : ((x = yr(x, c, a, null)), (x.flags |= 2)),
					(x.return = i),
					(s.return = i),
					(s.sibling = x),
					(i.child = s),
					_u(null, s),
					(s = i.child),
					(x = t.child.memoizedState),
					x === null
						? (x = Xc(a))
						: ((c = x.cachePool),
							c !== null ? ((M = St._currentValue), (c = c.parent !== M ? { parent: M, pool: M } : c)) : (c = Mm()),
							(x = { baseLanes: x.baseLanes | a, cachePool: c })),
					(s.memoizedState = x),
					(s.childLanes = Jc(t, g, a)),
					(i.memoizedState = Gc),
					_u(t.child, s))
				: (Li(i),
					(a = t.child),
					(t = a.sibling),
					(a = ii(a, { mode: "visible", children: s.children })),
					(a.return = i),
					(a.sibling = null),
					t !== null && ((g = i.deletions), g === null ? ((i.deletions = [t]), (i.flags |= 16)) : g.push(t)),
					(i.child = a),
					(i.memoizedState = null),
					a);
		}
		function Wc(t, i) {
			return ((i = sl({ mode: "visible", children: i }, t.mode)), (i.return = t), (t.child = i));
		}
		function sl(t, i) {
			return ((t = yn(22, t, null, i)), (t.lanes = 0), t);
		}
		function ef(t, i, a) {
			return (
				Er(i, t.child, null, a),
				(t = Wc(i, i.pendingProps.children)),
				(t.flags |= 2),
				(i.memoizedState = null),
				t
			);
		}
		function Bv(t, i, a) {
			t.lanes |= i;
			var s = t.alternate;
			(s !== null && (s.lanes |= i), vc(t.return, i, a));
		}
		function tf(t, i, a, s, c, d) {
			var g = t.memoizedState;
			g === null
				? (t.memoizedState = {
						isBackwards: i,
						rendering: null,
						renderingStartTime: 0,
						last: s,
						tail: a,
						tailMode: c,
						treeForkCount: d,
					})
				: ((g.isBackwards = i),
					(g.rendering = null),
					(g.renderingStartTime = 0),
					(g.last = s),
					(g.tail = a),
					(g.tailMode = c),
					(g.treeForkCount = d));
		}
		function Vv(t, i, a) {
			var s = i.pendingProps,
				c = s.revealOrder,
				d = s.tail;
			s = s.children;
			var g = ht.current,
				x = (g & 2) !== 0;
			if (
				(x ? ((g = (g & 1) | 2), (i.flags |= 128)) : (g &= 1),
				re(ht, g),
				Ht(t, i, s, a),
				(s = qe ? ou : 0),
				!x && t !== null && (t.flags & 128) !== 0)
			)
				e: for (t = i.child; t !== null; ) {
					if (t.tag === 13) t.memoizedState !== null && Bv(t, a, i);
					else if (t.tag === 19) Bv(t, a, i);
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
						((t = a.alternate), t !== null && Ks(t) === null && (c = a), (a = a.sibling));
					((a = c),
						a === null ? ((c = i.child), (i.child = null)) : ((c = a.sibling), (a.sibling = null)),
						tf(i, !1, c, a, d, s));
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (a = null, c = i.child, i.child = null; c !== null; ) {
						if (((t = c.alternate), t !== null && Ks(t) === null)) {
							i.child = c;
							break;
						}
						((t = c.sibling), (c.sibling = a), (a = c), (c = t));
					}
					tf(i, !0, a, null, d, s);
					break;
				case "together":
					tf(i, !1, null, null, void 0, s);
					break;
				default:
					i.memoizedState = null;
			}
			return i.child;
		}
		function oi(t, i, a) {
			if ((t !== null && (i.dependencies = t.dependencies), (Hi |= i.lanes), (a & i.childLanes) === 0))
				if (t !== null) {
					if ((la(t, i, a, !1), (a & i.childLanes) === 0)) return null;
				} else return null;
			if (t !== null && i.child !== t.child) throw Error(l(153));
			if (i.child !== null) {
				for (t = i.child, a = ii(t, t.pendingProps), i.child = a, a.return = i; t.sibling !== null; )
					((t = t.sibling), (a = a.sibling = ii(t, t.pendingProps)), (a.return = i));
				a.sibling = null;
			}
			return i.child;
		}
		function nf(t, i) {
			return (t.lanes & i) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && Bs(t)));
		}
		function Yw(t, i, a) {
			switch (i.tag) {
				case 3:
					(Ze(i, i.stateNode.containerInfo), Ii(i, St, t.memoizedState.cache), br());
					break;
				case 27:
				case 5:
					rt(i);
					break;
				case 4:
					Ze(i, i.stateNode.containerInfo);
					break;
				case 10:
					Ii(i, i.type, i.memoizedProps.value);
					break;
				case 31:
					if (i.memoizedState !== null) return ((i.flags |= 128), Ac(i), null);
					break;
				case 13:
					var s = i.memoizedState;
					if (s !== null)
						return s.dehydrated !== null
							? (Li(i), (i.flags |= 128), null)
							: (a & i.child.childLanes) !== 0
								? $v(t, i, a)
								: (Li(i), (t = oi(t, i, a)), t !== null ? t.sibling : null);
					Li(i);
					break;
				case 19:
					var c = (t.flags & 128) !== 0;
					if (((s = (a & i.childLanes) !== 0), s || (la(t, i, a, !1), (s = (a & i.childLanes) !== 0)), c)) {
						if (s) return Vv(t, i, a);
						i.flags |= 128;
					}
					if (
						((c = i.memoizedState),
						c !== null && ((c.rendering = null), (c.tail = null), (c.lastEffect = null)),
						re(ht, ht.current),
						s)
					)
						break;
					return null;
				case 22:
					return ((i.lanes = 0), Dv(t, i, a, i.pendingProps));
				case 24:
					Ii(i, St, t.memoizedState.cache);
			}
			return oi(t, i, a);
		}
		function Hv(t, i, a) {
			if (t !== null)
				if (t.memoizedProps !== i.pendingProps) _t = !0;
				else {
					if (!nf(t, a) && (i.flags & 128) === 0) return ((_t = !1), Yw(t, i, a));
					_t = (t.flags & 131072) !== 0;
				}
			else ((_t = !1), qe && (i.flags & 1048576) !== 0 && Em(i, ou, i.index));
			switch (((i.lanes = 0), i.tag)) {
				case 16:
					e: {
						var s = i.pendingProps;
						if (((t = _r(i.elementType)), (i.type = t), typeof t == "function"))
							sc(t)
								? ((s = Rr(t, s)), (i.tag = 1), (i = Uv(null, i, t, s, a)))
								: ((i.tag = 0), (i = Kc(null, i, t, s, a)));
						else {
							if (t != null) {
								var c = t.$$typeof;
								if (c === $) {
									((i.tag = 11), (i = Mv(null, i, t, s, a)));
									break e;
								} else if (c === z) {
									((i.tag = 14), (i = zv(null, i, t, s, a)));
									break e;
								}
							}
							throw ((i = ne(t) || t), Error(l(306, i, "")));
						}
					}
					return i;
				case 0:
					return Kc(t, i, i.type, i.pendingProps, a);
				case 1:
					return ((s = i.type), (c = Rr(s, i.pendingProps)), Uv(t, i, s, c, a));
				case 3:
					e: {
						if ((Ze(i, i.stateNode.containerInfo), t === null)) throw Error(l(387));
						s = i.pendingProps;
						var d = i.memoizedState;
						((c = d.element), _c(t, i), yu(i, s, null, a));
						var g = i.memoizedState;
						if (
							((s = g.cache), Ii(i, St, s), s !== d.cache && gc(i, [St], a, !0), gu(), (s = g.element), d.isDehydrated)
						)
							if (
								((d = { element: s, isDehydrated: !1, cache: g.cache }),
								(i.updateQueue.baseState = d),
								(i.memoizedState = d),
								i.flags & 256)
							) {
								i = Lv(t, i, s, a);
								break e;
							} else if (s !== c) {
								((c = Tn(Error(l(424)), i)), cu(c), (i = Lv(t, i, s, a)));
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
									et = zn(t.firstChild), Bt = i, qe = !0, ji = null, On = !0, a = Im(i, null, s, a), i.child = a;
									a;
								)
									((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
							}
						else {
							if ((br(), s === c)) {
								i = oi(t, i, a);
								break e;
							}
							Ht(t, i, s, a);
						}
						i = i.child;
					}
					return i;
				case 26:
					return (
						ul(t, i),
						t === null
							? (a = ty(i.type, null, i.pendingProps, null))
								? (i.memoizedState = a)
								: qe ||
									((a = i.type),
									(t = i.pendingProps),
									(s = xl(ye.current).createElement(a)),
									(s[$t] = i),
									(s[nn] = t),
									Zt(s, a, t),
									jt(s),
									(i.stateNode = s))
							: (i.memoizedState = ty(i.type, t.memoizedProps, i.pendingProps, t.memoizedState)),
						null
					);
				case 27:
					return (
						rt(i),
						t === null &&
							qe &&
							((s = i.stateNode = Jg(i.type, i.pendingProps, ye.current)),
							(Bt = i),
							(On = !0),
							(c = et),
							Fi(i.type) ? ((jf = c), (et = zn(s.firstChild))) : (et = c)),
						Ht(t, i, i.pendingProps.children, a),
						ul(t, i),
						t === null && (i.flags |= 4194304),
						i.child
					);
				case 5:
					return (
						t === null &&
							qe &&
							((c = s = et) &&
								((s = w_(s, i.type, i.pendingProps, On)),
								s !== null ? ((i.stateNode = s), (Bt = i), (et = zn(s.firstChild)), (On = !1), (c = !0)) : (c = !1)),
							c || qi(i)),
						rt(i),
						(c = i.type),
						(d = i.pendingProps),
						(g = t !== null ? t.memoizedProps : null),
						(s = d.children),
						Nf(c, d) ? (s = null) : g !== null && Nf(c, g) && (i.flags |= 32),
						i.memoizedState !== null && ((c = Oc(t, i, jw, null, null, a)), (Iu._currentValue = c)),
						ul(t, i),
						Ht(t, i, s, a),
						i.child
					);
				case 6:
					return (
						t === null &&
							qe &&
							((t = a = et) &&
								((a = __(a, i.pendingProps, On)),
								a !== null ? ((i.stateNode = a), (Bt = i), (et = null), (t = !0)) : (t = !1)),
							t || qi(i)),
						null
					);
				case 13:
					return $v(t, i, a);
				case 4:
					return (
						Ze(i, i.stateNode.containerInfo),
						(s = i.pendingProps),
						t === null ? (i.child = Er(i, null, s, a)) : Ht(t, i, s, a),
						i.child
					);
				case 11:
					return Mv(t, i, i.type, i.pendingProps, a);
				case 7:
					return (Ht(t, i, i.pendingProps, a), i.child);
				case 8:
					return (Ht(t, i, i.pendingProps.children, a), i.child);
				case 12:
					return (Ht(t, i, i.pendingProps.children, a), i.child);
				case 10:
					return ((s = i.pendingProps), Ii(i, i.type, s.value), Ht(t, i, s.children, a), i.child);
				case 9:
					return (
						(c = i.type._context),
						(s = i.pendingProps.children),
						Sr(i),
						(c = Vt(c)),
						(s = s(c)),
						(i.flags |= 1),
						Ht(t, i, s, a),
						i.child
					);
				case 14:
					return zv(t, i, i.type, i.pendingProps, a);
				case 15:
					return kv(t, i, i.type, i.pendingProps, a);
				case 19:
					return Vv(t, i, a);
				case 31:
					return Pw(t, i, a);
				case 22:
					return Dv(t, i, a, i.pendingProps);
				case 24:
					return (
						Sr(i),
						(s = Vt(St)),
						t === null
							? ((c = pc()),
								c === null &&
									((c = Je),
									(d = yc()),
									(c.pooledCache = d),
									d.refCount++,
									d !== null && (c.pooledCacheLanes |= a),
									(c = d)),
								(i.memoizedState = { parent: s, cache: c }),
								wc(i),
								Ii(i, St, c))
							: ((t.lanes & a) !== 0 && (_c(t, i), yu(i, null, null, a), gu()),
								(c = t.memoizedState),
								(d = i.memoizedState),
								c.parent !== s
									? ((c = { parent: s, cache: s }),
										(i.memoizedState = c),
										i.lanes === 0 && (i.memoizedState = i.updateQueue.baseState = c),
										Ii(i, St, s))
									: ((s = d.cache), Ii(i, St, s), s !== c.cache && gc(i, [St], a, !0))),
						Ht(t, i, i.pendingProps.children, a),
						i.child
					);
				case 29:
					throw i.pendingProps;
			}
			throw Error(l(156, i.tag));
		}
		function ci(t) {
			t.flags |= 4;
		}
		function rf(t, i, a, s, c) {
			if (((i = (t.mode & 32) !== 0) && (i = !1), i)) {
				if (((t.flags |= 16777216), (c & 335544128) === c))
					if (t.stateNode.complete) t.flags |= 8192;
					else if (gg()) t.flags |= 8192;
					else throw ((xr = Qs), Sc);
			} else t.flags &= -16777217;
		}
		function Zv(t, i) {
			if (i.type !== "stylesheet" || (i.state.loading & 4) !== 0) t.flags &= -16777217;
			else if (((t.flags |= 16777216), !uy(i)))
				if (gg()) t.flags |= 8192;
				else throw ((xr = Qs), Sc);
		}
		function ll(t, i) {
			(i !== null && (t.flags |= 4),
				t.flags & 16384 && ((i = t.tag !== 22 ? Ch() : 536870912), (t.lanes |= i), (Sa |= i)));
		}
		function xu(t, i) {
			if (!qe)
				switch (t.tailMode) {
					case "hidden":
						i = t.tail;
						for (var a = null; i !== null; ) (i.alternate !== null && (a = i), (i = i.sibling));
						a === null ? (t.tail = null) : (a.sibling = null);
						break;
					case "collapsed":
						a = t.tail;
						for (var s = null; a !== null; ) (a.alternate !== null && (s = a), (a = a.sibling));
						s === null ? (i || t.tail === null ? (t.tail = null) : (t.tail.sibling = null)) : (s.sibling = null);
				}
		}
		function tt(t) {
			var i = t.alternate !== null && t.alternate.child === t.child,
				a = 0,
				s = 0;
			if (i)
				for (var c = t.child; c !== null; )
					((a |= c.lanes | c.childLanes),
						(s |= c.subtreeFlags & 65011712),
						(s |= c.flags & 65011712),
						(c.return = t),
						(c = c.sibling));
			else
				for (c = t.child; c !== null; )
					((a |= c.lanes | c.childLanes), (s |= c.subtreeFlags), (s |= c.flags), (c.return = t), (c = c.sibling));
			return ((t.subtreeFlags |= s), (t.childLanes = a), i);
		}
		function Fw(t, i, a) {
			var s = i.pendingProps;
			switch ((fc(i), i.tag)) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14:
					return (tt(i), null);
				case 1:
					return (tt(i), null);
				case 3:
					return (
						(a = i.stateNode),
						(s = null),
						t !== null && (s = t.memoizedState.cache),
						i.memoizedState.cache !== s && (i.flags |= 2048),
						ui(St),
						Ne(),
						a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
						(t === null || t.child === null) &&
							(sa(i)
								? ci(i)
								: t === null || (t.memoizedState.isDehydrated && (i.flags & 256) === 0) || ((i.flags |= 1024), hc())),
						tt(i),
						null
					);
				case 26:
					var c = i.type,
						d = i.memoizedState;
					return (
						t === null
							? (ci(i), d !== null ? (tt(i), Zv(i, d)) : (tt(i), rf(i, c, null, s, a)))
							: d
								? d !== t.memoizedState
									? (ci(i), tt(i), Zv(i, d))
									: (tt(i), (i.flags &= -16777217))
								: ((t = t.memoizedProps), t !== s && ci(i), tt(i), rf(i, c, t, s, a)),
						null
					);
				case 27:
					if ((Nt(i), (a = ye.current), (c = i.type), t !== null && i.stateNode != null))
						t.memoizedProps !== s && ci(i);
					else {
						if (!s) {
							if (i.stateNode === null) throw Error(l(166));
							return (tt(i), null);
						}
						((t = se.current), sa(i) ? Tm(i, t) : ((t = Jg(c, s, a)), (i.stateNode = t), ci(i)));
					}
					return (tt(i), null);
				case 5:
					if ((Nt(i), (c = i.type), t !== null && i.stateNode != null)) t.memoizedProps !== s && ci(i);
					else {
						if (!s) {
							if (i.stateNode === null) throw Error(l(166));
							return (tt(i), null);
						}
						if (((d = se.current), sa(i))) Tm(i, d);
						else {
							var g = xl(ye.current);
							switch (d) {
								case 1:
									d = g.createElementNS("http://www.w3.org/2000/svg", c);
									break;
								case 2:
									d = g.createElementNS("http://www.w3.org/1998/Math/MathML", c);
									break;
								default:
									switch (c) {
										case "svg":
											d = g.createElementNS("http://www.w3.org/2000/svg", c);
											break;
										case "math":
											d = g.createElementNS("http://www.w3.org/1998/Math/MathML", c);
											break;
										case "script":
											((d = g.createElement("div")),
												(d.innerHTML = "<script><\/script>"),
												(d = d.removeChild(d.firstChild)));
											break;
										case "select":
											((d =
												typeof s.is == "string" ? g.createElement("select", { is: s.is }) : g.createElement("select")),
												s.multiple ? (d.multiple = !0) : s.size && (d.size = s.size));
											break;
										default:
											d = typeof s.is == "string" ? g.createElement(c, { is: s.is }) : g.createElement(c);
									}
							}
							((d[$t] = i), (d[nn] = s));
							e: for (g = i.child; g !== null; ) {
								if (g.tag === 5 || g.tag === 6) d.appendChild(g.stateNode);
								else if (g.tag !== 4 && g.tag !== 27 && g.child !== null) {
									((g.child.return = g), (g = g.child));
									continue;
								}
								if (g === i) break e;
								for (; g.sibling === null; ) {
									if (g.return === null || g.return === i) break e;
									g = g.return;
								}
								((g.sibling.return = g.return), (g = g.sibling));
							}
							i.stateNode = d;
							e: switch ((Zt(d, c, s), c)) {
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
							s && ci(i);
						}
					}
					return (tt(i), rf(i, i.type, t === null ? null : t.memoizedProps, i.pendingProps, a), null);
				case 6:
					if (t && i.stateNode != null) t.memoizedProps !== s && ci(i);
					else {
						if (typeof s != "string" && i.stateNode === null) throw Error(l(166));
						if (((t = ye.current), sa(i))) {
							if (((t = i.stateNode), (a = i.memoizedProps), (s = null), (c = Bt), c !== null))
								switch (c.tag) {
									case 27:
									case 5:
										s = c.memoizedProps;
								}
							((t[$t] = i),
								(t = !!(t.nodeValue === a || (s !== null && s.suppressHydrationWarning === !0) || Bg(t.nodeValue, a))),
								t || qi(i, !0));
						} else ((t = xl(t).createTextNode(s)), (t[$t] = i), (i.stateNode = t));
					}
					return (tt(i), null);
				case 31:
					if (((a = i.memoizedState), t === null || t.memoizedState !== null)) {
						if (((s = sa(i)), a !== null)) {
							if (t === null) {
								if (!s) throw Error(l(318));
								if (((t = i.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(l(557));
								t[$t] = i;
							} else (br(), (i.flags & 128) === 0 && (i.memoizedState = null), (i.flags |= 4));
							(tt(i), (t = !1));
						} else
							((a = hc()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), (t = !0));
						if (!t) return i.flags & 256 ? (pn(i), i) : (pn(i), null);
						if ((i.flags & 128) !== 0) throw Error(l(558));
					}
					return (tt(i), null);
				case 13:
					if (
						((s = i.memoizedState), t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
					) {
						if (((c = sa(i)), s !== null && s.dehydrated !== null)) {
							if (t === null) {
								if (!c) throw Error(l(318));
								if (((c = i.memoizedState), (c = c !== null ? c.dehydrated : null), !c)) throw Error(l(317));
								c[$t] = i;
							} else (br(), (i.flags & 128) === 0 && (i.memoizedState = null), (i.flags |= 4));
							(tt(i), (c = !1));
						} else
							((c = hc()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = c), (c = !0));
						if (!c) return i.flags & 256 ? (pn(i), i) : (pn(i), null);
					}
					return (
						pn(i),
						(i.flags & 128) !== 0
							? ((i.lanes = a), i)
							: ((a = s !== null),
								(t = t !== null && t.memoizedState !== null),
								a &&
									((s = i.child),
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
								a !== t && a && (i.child.flags |= 8192),
								ll(i, i.updateQueue),
								tt(i),
								null)
					);
				case 4:
					return (Ne(), t === null && Ig(i.stateNode.containerInfo), tt(i), null);
				case 10:
					return (ui(i.type), tt(i), null);
				case 19:
					if ((G(ht), (s = i.memoizedState), s === null)) return (tt(i), null);
					if (((c = (i.flags & 128) !== 0), (d = s.rendering), d === null))
						if (c) xu(s, !1);
						else {
							if (ft !== 0 || (t !== null && (t.flags & 128) !== 0))
								for (t = i.child; t !== null; ) {
									if (((d = Ks(t)), d !== null)) {
										for (
											i.flags |= 128,
												xu(s, !1),
												t = d.updateQueue,
												i.updateQueue = t,
												ll(i, t),
												i.subtreeFlags = 0,
												t = a,
												a = i.child;
											a !== null;
										)
											(wm(a, t), (a = a.sibling));
										return (re(ht, (ht.current & 1) | 2), qe && ri(i, s.treeForkCount), i.child);
									}
									t = t.sibling;
								}
							s.tail !== null && je() > hl && ((i.flags |= 128), (c = !0), xu(s, !1), (i.lanes = 4194304));
						}
					else {
						if (!c)
							if (((t = Ks(d)), t !== null)) {
								if (
									((i.flags |= 128),
									(c = !0),
									(t = t.updateQueue),
									(i.updateQueue = t),
									ll(i, t),
									xu(s, !0),
									s.tail === null && s.tailMode === "hidden" && !d.alternate && !qe)
								)
									return (tt(i), null);
							} else
								2 * je() - s.renderingStartTime > hl &&
									a !== 536870912 &&
									((i.flags |= 128), (c = !0), xu(s, !1), (i.lanes = 4194304));
						s.isBackwards
							? ((d.sibling = i.child), (i.child = d))
							: ((t = s.last), t !== null ? (t.sibling = d) : (i.child = d), (s.last = d));
					}
					return s.tail !== null
						? ((t = s.tail),
							(s.rendering = t),
							(s.tail = t.sibling),
							(s.renderingStartTime = je()),
							(t.sibling = null),
							(a = ht.current),
							re(ht, c ? (a & 1) | 2 : a & 1),
							qe && ri(i, s.treeForkCount),
							t)
						: (tt(i), null);
				case 22:
				case 23:
					return (
						pn(i),
						Tc(),
						(s = i.memoizedState !== null),
						t !== null ? (t.memoizedState !== null) !== s && (i.flags |= 8192) : s && (i.flags |= 8192),
						s
							? (a & 536870912) !== 0 && (i.flags & 128) === 0 && (tt(i), i.subtreeFlags & 6 && (i.flags |= 8192))
							: tt(i),
						(a = i.updateQueue),
						a !== null && ll(i, a.retryQueue),
						(a = null),
						t !== null &&
							t.memoizedState !== null &&
							t.memoizedState.cachePool !== null &&
							(a = t.memoizedState.cachePool.pool),
						(s = null),
						i.memoizedState !== null && i.memoizedState.cachePool !== null && (s = i.memoizedState.cachePool.pool),
						s !== a && (i.flags |= 2048),
						t !== null && G(wr),
						null
					);
				case 24:
					return (
						(a = null),
						t !== null && (a = t.memoizedState.cache),
						i.memoizedState.cache !== a && (i.flags |= 2048),
						ui(St),
						tt(i),
						null
					);
				case 25:
					return null;
				case 30:
					return null;
			}
			throw Error(l(156, i.tag));
		}
		function Kw(t, i) {
			switch ((fc(i), i.tag)) {
				case 1:
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 3:
					return (
						ui(St),
						Ne(),
						(t = i.flags),
						(t & 65536) !== 0 && (t & 128) === 0 ? ((i.flags = (t & -65537) | 128), i) : null
					);
				case 26:
				case 27:
				case 5:
					return (Nt(i), null);
				case 31:
					if (i.memoizedState !== null) {
						if ((pn(i), i.alternate === null)) throw Error(l(340));
						br();
					}
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 13:
					if ((pn(i), (t = i.memoizedState), t !== null && t.dehydrated !== null)) {
						if (i.alternate === null) throw Error(l(340));
						br();
					}
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 19:
					return (G(ht), null);
				case 4:
					return (Ne(), null);
				case 10:
					return (ui(i.type), null);
				case 22:
				case 23:
					return (
						pn(i),
						Tc(),
						t !== null && G(wr),
						(t = i.flags),
						t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null
					);
				case 24:
					return (ui(St), null);
				case 25:
					return null;
				default:
					return null;
			}
		}
		function Qv(t, i) {
			switch ((fc(i), i.tag)) {
				case 3:
					(ui(St), Ne());
					break;
				case 26:
				case 27:
				case 5:
					Nt(i);
					break;
				case 4:
					Ne();
					break;
				case 31:
					i.memoizedState !== null && pn(i);
					break;
				case 13:
					pn(i);
					break;
				case 19:
					G(ht);
					break;
				case 10:
					ui(i.type);
					break;
				case 22:
				case 23:
					(pn(i), Tc(), t !== null && G(wr));
					break;
				case 24:
					ui(St);
			}
		}
		function Eu(t, i) {
			try {
				var a = i.updateQueue,
					s = a !== null ? a.lastEffect : null;
				if (s !== null) {
					var c = s.next;
					a = c;
					do {
						if ((a.tag & t) === t) {
							s = void 0;
							var d = a.create,
								g = a.inst;
							((s = d()), (g.destroy = s));
						}
						a = a.next;
					} while (a !== c);
				}
			} catch (x) {
				Pe(i, i.return, x);
			}
		}
		function Bi(t, i, a) {
			try {
				var s = i.updateQueue,
					c = s !== null ? s.lastEffect : null;
				if (c !== null) {
					var d = c.next;
					s = d;
					do {
						if ((s.tag & t) === t) {
							var g = s.inst,
								x = g.destroy;
							if (x !== void 0) {
								((g.destroy = void 0), (c = i));
								var M = a,
									P = x;
								try {
									P();
								} catch (J) {
									Pe(c, M, J);
								}
							}
						}
						s = s.next;
					} while (s !== d);
				}
			} catch (J) {
				Pe(i, i.return, J);
			}
		}
		function Pv(t) {
			var i = t.updateQueue;
			if (i !== null) {
				var a = t.stateNode;
				try {
					Lm(i, a);
				} catch (s) {
					Pe(t, t.return, s);
				}
			}
		}
		function Yv(t, i, a) {
			((a.props = Rr(t.type, t.memoizedProps)), (a.state = t.memoizedState));
			try {
				a.componentWillUnmount();
			} catch (s) {
				Pe(t, i, s);
			}
		}
		function Cu(t, i) {
			try {
				var a = t.ref;
				if (a !== null) {
					switch (t.tag) {
						case 26:
						case 27:
						case 5:
							var s = t.stateNode;
							break;
						case 30:
							s = t.stateNode;
							break;
						default:
							s = t.stateNode;
					}
					typeof a == "function" ? (t.refCleanup = a(s)) : (a.current = s);
				}
			} catch (c) {
				Pe(t, i, c);
			}
		}
		function Pn(t, i) {
			var a = t.ref,
				s = t.refCleanup;
			if (a !== null)
				if (typeof s == "function")
					try {
						s();
					} catch (c) {
						Pe(t, i, c);
					} finally {
						((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
					}
				else if (typeof a == "function")
					try {
						a(null);
					} catch (c) {
						Pe(t, i, c);
					}
				else a.current = null;
		}
		function Fv(t) {
			var i = t.type,
				a = t.memoizedProps,
				s = t.stateNode;
			try {
				e: switch (i) {
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
				Pe(t, t.return, c);
			}
		}
		function af(t, i, a) {
			try {
				var s = t.stateNode;
				(v_(s, t.type, a, i), (s[nn] = i));
			} catch (c) {
				Pe(t, t.return, c);
			}
		}
		function Kv(t) {
			return t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && Fi(t.type)) || t.tag === 4;
		}
		function uf(t) {
			e: for (;;) {
				for (; t.sibling === null; ) {
					if (t.return === null || Kv(t.return)) return null;
					t = t.return;
				}
				for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
					if ((t.tag === 27 && Fi(t.type)) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
					((t.child.return = t), (t = t.child));
				}
				if (!(t.flags & 2)) return t.stateNode;
			}
		}
		function sf(t, i, a) {
			var s = t.tag;
			if (s === 5 || s === 6)
				((t = t.stateNode),
					i
						? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(t, i)
						: ((i = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a),
							i.appendChild(t),
							(a = a._reactRootContainer),
							a != null || i.onclick !== null || (i.onclick = ti)));
			else if (s !== 4 && (s === 27 && Fi(t.type) && ((a = t.stateNode), (i = null)), (t = t.child), t !== null))
				for (sf(t, i, a), t = t.sibling; t !== null; ) (sf(t, i, a), (t = t.sibling));
		}
		function ol(t, i, a) {
			var s = t.tag;
			if (s === 5 || s === 6) ((t = t.stateNode), i ? a.insertBefore(t, i) : a.appendChild(t));
			else if (s !== 4 && (s === 27 && Fi(t.type) && (a = t.stateNode), (t = t.child), t !== null))
				for (ol(t, i, a), t = t.sibling; t !== null; ) (ol(t, i, a), (t = t.sibling));
		}
		function Gv(t) {
			var i = t.stateNode,
				a = t.memoizedProps;
			try {
				for (var s = t.type, c = i.attributes; c.length; ) i.removeAttributeNode(c[0]);
				(Zt(i, s, a), (i[$t] = t), (i[nn] = a));
			} catch (d) {
				Pe(t, t.return, d);
			}
		}
		var fi = !1,
			xt = !1,
			lf = !1,
			Xv = typeof WeakSet == "function" ? WeakSet : Set,
			qt = null;
		function Gw(t, i) {
			if (((t = t.containerInfo), (Rf = Nl), (t = dm(t)), ec(t))) {
				if ("selectionStart" in t) var a = { start: t.selectionStart, end: t.selectionEnd };
				else
					e: {
						a = ((a = t.ownerDocument) && a.defaultView) || window;
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
							var g = 0,
								x = -1,
								M = -1,
								P = 0,
								J = 0,
								ee = t,
								Y = null;
							t: for (;;) {
								for (
									var K;
									ee !== a || (c !== 0 && ee.nodeType !== 3) || (x = g + c),
										ee !== d || (s !== 0 && ee.nodeType !== 3) || (M = g + s),
										ee.nodeType === 3 && (g += ee.nodeValue.length),
										(K = ee.firstChild) !== null;
								)
									((Y = ee), (ee = K));
								for (;;) {
									if (ee === t) break t;
									if ((Y === a && ++P === c && (x = g), Y === d && ++J === s && (M = g), (K = ee.nextSibling) !== null))
										break;
									((ee = Y), (Y = ee.parentNode));
								}
								ee = K;
							}
							a = x === -1 || M === -1 ? null : { start: x, end: M };
						} else a = null;
					}
				a = a || { start: 0, end: 0 };
			} else a = null;
			for (Of = { focusedElem: t, selectionRange: a }, Nl = !1, qt = i; qt !== null; )
				if (((i = qt), (t = i.child), (i.subtreeFlags & 1028) !== 0 && t !== null)) ((t.return = i), (qt = t));
				else
					for (; qt !== null; ) {
						switch (((i = qt), (d = i.alternate), (t = i.flags), i.tag)) {
							case 0:
								if ((t & 4) !== 0 && ((t = i.updateQueue), (t = t !== null ? t.events : null), t !== null))
									for (a = 0; a < t.length; a++) ((c = t[a]), (c.ref.impl = c.nextImpl));
								break;
							case 11:
							case 15:
								break;
							case 1:
								if ((t & 1024) !== 0 && d !== null) {
									((t = void 0), (a = i), (c = d.memoizedProps), (d = d.memoizedState), (s = a.stateNode));
									try {
										var ce = Rr(a.type, c);
										((t = s.getSnapshotBeforeUpdate(ce, d)), (s.__reactInternalSnapshotBeforeUpdate = t));
									} catch (be) {
										Pe(a, a.return, be);
									}
								}
								break;
							case 3:
								if ((t & 1024) !== 0) {
									if (((t = i.stateNode.containerInfo), (a = t.nodeType), a === 9)) zf(t);
									else if (a === 1)
										switch (t.nodeName) {
											case "HEAD":
											case "HTML":
											case "BODY":
												zf(t);
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
								if ((t & 1024) !== 0) throw Error(l(163));
						}
						if (((t = i.sibling), t !== null)) {
							((t.return = i.return), (qt = t));
							break;
						}
						qt = i.return;
					}
		}
		function Jv(t, i, a) {
			var s = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					(hi(t, a), s & 4 && Eu(5, a));
					break;
				case 1:
					if ((hi(t, a), s & 4))
						if (((t = a.stateNode), i === null))
							try {
								t.componentDidMount();
							} catch (g) {
								Pe(a, a.return, g);
							}
						else {
							var c = Rr(a.type, i.memoizedProps);
							i = i.memoizedState;
							try {
								t.componentDidUpdate(c, i, t.__reactInternalSnapshotBeforeUpdate);
							} catch (g) {
								Pe(a, a.return, g);
							}
						}
					(s & 64 && Pv(a), s & 512 && Cu(a, a.return));
					break;
				case 3:
					if ((hi(t, a), s & 64 && ((t = a.updateQueue), t !== null))) {
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
							Lm(t, i);
						} catch (g) {
							Pe(a, a.return, g);
						}
					}
					break;
				case 27:
					i === null && s & 4 && Gv(a);
				case 26:
				case 5:
					(hi(t, a), i === null && s & 4 && Fv(a), s & 512 && Cu(a, a.return));
					break;
				case 12:
					hi(t, a);
					break;
				case 31:
					(hi(t, a), s & 4 && tg(t, a));
					break;
				case 13:
					(hi(t, a),
						s & 4 && ng(t, a),
						s & 64 &&
							((t = a.memoizedState),
							t !== null && ((t = t.dehydrated), t !== null && ((a = a_.bind(null, a)), x_(t, a)))));
					break;
				case 22:
					if (((s = a.memoizedState !== null || fi), !s)) {
						((i = (i !== null && i.memoizedState !== null) || xt), (c = fi));
						var d = xt;
						((fi = s), (xt = i) && !d ? mi(t, a, (a.subtreeFlags & 8772) !== 0) : hi(t, a), (fi = c), (xt = d));
					}
					break;
				case 30:
					break;
				default:
					hi(t, a);
			}
		}
		function Wv(t) {
			var i = t.alternate;
			(i !== null && ((t.alternate = null), Wv(i)),
				(t.child = null),
				(t.deletions = null),
				(t.sibling = null),
				t.tag === 5 && ((i = t.stateNode), i !== null && Io(i)),
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
		function di(t, i, a) {
			for (a = a.child; a !== null; ) (eg(t, i, a), (a = a.sibling));
		}
		function eg(t, i, a) {
			if (Lt && typeof Lt.onCommitFiberUnmount == "function")
				try {
					Lt.onCommitFiberUnmount(Gt, a);
				} catch {}
			switch (a.tag) {
				case 26:
					(xt || Pn(a, i),
						di(t, i, a),
						a.memoizedState
							? a.memoizedState.count--
							: a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
					break;
				case 27:
					xt || Pn(a, i);
					var s = at,
						c = an;
					(Fi(a.type) && ((at = a.stateNode), (an = !1)), di(t, i, a), Du(a.stateNode), (at = s), (an = c));
					break;
				case 5:
					xt || Pn(a, i);
				case 6:
					if (((s = at), (c = an), (at = null), di(t, i, a), (at = s), (an = c), at !== null))
						if (an)
							try {
								(at.nodeType === 9 ? at.body : at.nodeName === "HTML" ? at.ownerDocument.body : at).removeChild(
									a.stateNode,
								);
							} catch (d) {
								Pe(a, i, d);
							}
						else
							try {
								at.removeChild(a.stateNode);
							} catch (d) {
								Pe(a, i, d);
							}
					break;
				case 18:
					at !== null &&
						(an
							? ((t = at),
								Yg(t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, a.stateNode),
								Ra(t))
							: Yg(at, a.stateNode));
					break;
				case 4:
					((s = at), (c = an), (at = a.stateNode.containerInfo), (an = !0), di(t, i, a), (at = s), (an = c));
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					(Bi(2, a, i), xt || Bi(4, a, i), di(t, i, a));
					break;
				case 1:
					(xt || (Pn(a, i), (s = a.stateNode), typeof s.componentWillUnmount == "function" && Yv(a, i, s)),
						di(t, i, a));
					break;
				case 21:
					di(t, i, a);
					break;
				case 22:
					((xt = (s = xt) || a.memoizedState !== null), di(t, i, a), (xt = s));
					break;
				default:
					di(t, i, a);
			}
		}
		function tg(t, i) {
			if (i.memoizedState === null && ((t = i.alternate), t !== null && ((t = t.memoizedState), t !== null))) {
				t = t.dehydrated;
				try {
					Ra(t);
				} catch (a) {
					Pe(i, i.return, a);
				}
			}
		}
		function ng(t, i) {
			if (
				i.memoizedState === null &&
				((t = i.alternate), t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
			)
				try {
					Ra(t);
				} catch (a) {
					Pe(i, i.return, a);
				}
		}
		function Xw(t) {
			switch (t.tag) {
				case 31:
				case 13:
				case 19:
					var i = t.stateNode;
					return (i === null && (i = t.stateNode = new Xv()), i);
				case 22:
					return ((t = t.stateNode), (i = t._retryCache), i === null && (i = t._retryCache = new Xv()), i);
				default:
					throw Error(l(435, t.tag));
			}
		}
		function cl(t, i) {
			var a = Xw(t);
			i.forEach(function (s) {
				if (!a.has(s)) {
					a.add(s);
					var c = u_.bind(null, t, s);
					s.then(c, c);
				}
			});
		}
		function un(t, i) {
			var a = i.deletions;
			if (a !== null)
				for (var s = 0; s < a.length; s++) {
					var c = a[s],
						d = t,
						g = i,
						x = g;
					e: for (; x !== null; ) {
						switch (x.tag) {
							case 27:
								if (Fi(x.type)) {
									((at = x.stateNode), (an = !1));
									break e;
								}
								break;
							case 5:
								((at = x.stateNode), (an = !1));
								break e;
							case 3:
							case 4:
								((at = x.stateNode.containerInfo), (an = !0));
								break e;
						}
						x = x.return;
					}
					if (at === null) throw Error(l(160));
					(eg(d, g, c), (at = null), (an = !1), (d = c.alternate), d !== null && (d.return = null), (c.return = null));
				}
			if (i.subtreeFlags & 13886) for (i = i.child; i !== null; ) (ig(i, t), (i = i.sibling));
		}
		var Un = null;
		function ig(t, i) {
			var a = t.alternate,
				s = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					(un(i, t), sn(t), s & 4 && (Bi(3, t, t.return), Eu(3, t), Bi(5, t, t.return)));
					break;
				case 1:
					(un(i, t),
						sn(t),
						s & 512 && (xt || a === null || Pn(a, a.return)),
						s & 64 &&
							fi &&
							((t = t.updateQueue),
							t !== null &&
								((s = t.callbacks),
								s !== null &&
									((a = t.shared.hiddenCallbacks), (t.shared.hiddenCallbacks = a === null ? s : a.concat(s))))));
					break;
				case 26:
					var c = Un;
					if ((un(i, t), sn(t), s & 512 && (xt || a === null || Pn(a, a.return)), s & 4)) {
						var d = a !== null ? a.memoizedState : null;
						if (((s = t.memoizedState), a === null))
							if (s === null)
								if (t.stateNode === null) {
									e: {
										((s = t.type), (a = t.memoizedProps), (c = c.ownerDocument || c));
										t: switch (s) {
											case "title":
												((d = c.getElementsByTagName("title")[0]),
													(!d ||
														d[Ja] ||
														d[$t] ||
														d.namespaceURI === "http://www.w3.org/2000/svg" ||
														d.hasAttribute("itemprop")) &&
														((d = c.createElement(s)), c.head.insertBefore(d, c.querySelector("head > title"))),
													Zt(d, s, a),
													(d[$t] = t),
													jt(d),
													(s = d));
												break e;
											case "link":
												var g = ry("link", "href", c).get(s + (a.href || ""));
												if (g) {
													for (var x = 0; x < g.length; x++)
														if (
															((d = g[x]),
															d.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) &&
																d.getAttribute("rel") === (a.rel == null ? null : a.rel) &&
																d.getAttribute("title") === (a.title == null ? null : a.title) &&
																d.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin))
														) {
															g.splice(x, 1);
															break t;
														}
												}
												((d = c.createElement(s)), Zt(d, s, a), c.head.appendChild(d));
												break;
											case "meta":
												if ((g = ry("meta", "content", c).get(s + (a.content || "")))) {
													for (x = 0; x < g.length; x++)
														if (
															((d = g[x]),
															d.getAttribute("content") === (a.content == null ? null : "" + a.content) &&
																d.getAttribute("name") === (a.name == null ? null : a.name) &&
																d.getAttribute("property") === (a.property == null ? null : a.property) &&
																d.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) &&
																d.getAttribute("charset") === (a.charSet == null ? null : a.charSet))
														) {
															g.splice(x, 1);
															break t;
														}
												}
												((d = c.createElement(s)), Zt(d, s, a), c.head.appendChild(d));
												break;
											default:
												throw Error(l(468, s));
										}
										((d[$t] = t), jt(d), (s = d));
									}
									t.stateNode = s;
								} else ay(c, t.type, t.stateNode);
							else t.stateNode = iy(c, s, t.memoizedProps);
						else
							d !== s
								? (d === null ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a)) : d.count--,
									s === null ? ay(c, t.type, t.stateNode) : iy(c, s, t.memoizedProps))
								: s === null && t.stateNode !== null && af(t, t.memoizedProps, a.memoizedProps);
					}
					break;
				case 27:
					(un(i, t),
						sn(t),
						s & 512 && (xt || a === null || Pn(a, a.return)),
						a !== null && s & 4 && af(t, t.memoizedProps, a.memoizedProps));
					break;
				case 5:
					if ((un(i, t), sn(t), s & 512 && (xt || a === null || Pn(a, a.return)), t.flags & 32)) {
						c = t.stateNode;
						try {
							Xr(c, "");
						} catch (ce) {
							Pe(t, t.return, ce);
						}
					}
					(s & 4 && t.stateNode != null && ((c = t.memoizedProps), af(t, c, a !== null ? a.memoizedProps : c)),
						s & 1024 && (lf = !0));
					break;
				case 6:
					if ((un(i, t), sn(t), s & 4)) {
						if (t.stateNode === null) throw Error(l(162));
						((s = t.memoizedProps), (a = t.stateNode));
						try {
							a.nodeValue = s;
						} catch (ce) {
							Pe(t, t.return, ce);
						}
					}
					break;
				case 3:
					if (
						((Tl = null),
						(c = Un),
						(Un = El(i.containerInfo)),
						un(i, t),
						(Un = c),
						sn(t),
						s & 4 && a !== null && a.memoizedState.isDehydrated)
					)
						try {
							Ra(i.containerInfo);
						} catch (ce) {
							Pe(t, t.return, ce);
						}
					lf && ((lf = !1), rg(t));
					break;
				case 4:
					((s = Un), (Un = El(t.stateNode.containerInfo)), un(i, t), sn(t), (Un = s));
					break;
				case 12:
					(un(i, t), sn(t));
					break;
				case 31:
					(un(i, t), sn(t), s & 4 && ((s = t.updateQueue), s !== null && ((t.updateQueue = null), cl(t, s))));
					break;
				case 13:
					(un(i, t),
						sn(t),
						t.child.flags & 8192 &&
							(t.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
							(dl = je()),
						s & 4 && ((s = t.updateQueue), s !== null && ((t.updateQueue = null), cl(t, s))));
					break;
				case 22:
					c = t.memoizedState !== null;
					var M = a !== null && a.memoizedState !== null,
						P = fi,
						J = xt;
					if (((fi = P || c), (xt = J || M), un(i, t), (xt = J), (fi = P), sn(t), s & 8192))
						e: for (
							i = t.stateNode,
								i._visibility = c ? i._visibility & -2 : i._visibility | 1,
								c && (a === null || M || fi || xt || Or(t)),
								a = null,
								i = t;
							;
						) {
							if (i.tag === 5 || i.tag === 26) {
								if (a === null) {
									M = a = i;
									try {
										if (((d = M.stateNode), c))
											((g = d.style),
												typeof g.setProperty == "function"
													? g.setProperty("display", "none", "important")
													: (g.display = "none"));
										else {
											x = M.stateNode;
											var ee = M.memoizedProps.style,
												Y = ee != null && ee.hasOwnProperty("display") ? ee.display : null;
											x.style.display = Y == null || typeof Y == "boolean" ? "" : ("" + Y).trim();
										}
									} catch (ce) {
										Pe(M, M.return, ce);
									}
								}
							} else if (i.tag === 6) {
								if (a === null) {
									M = i;
									try {
										M.stateNode.nodeValue = c ? "" : M.memoizedProps;
									} catch (ce) {
										Pe(M, M.return, ce);
									}
								}
							} else if (i.tag === 18) {
								if (a === null) {
									M = i;
									try {
										var K = M.stateNode;
										c ? Fg(K, !0) : Fg(M.stateNode, !1);
									} catch (ce) {
										Pe(M, M.return, ce);
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
					s & 4 &&
						((s = t.updateQueue), s !== null && ((a = s.retryQueue), a !== null && ((s.retryQueue = null), cl(t, a))));
					break;
				case 19:
					(un(i, t), sn(t), s & 4 && ((s = t.updateQueue), s !== null && ((t.updateQueue = null), cl(t, s))));
					break;
				case 30:
					break;
				case 21:
					break;
				default:
					(un(i, t), sn(t));
			}
		}
		function sn(t) {
			var i = t.flags;
			if (i & 2) {
				try {
					for (var a, s = t.return; s !== null; ) {
						if (Kv(s)) {
							a = s;
							break;
						}
						s = s.return;
					}
					if (a == null) throw Error(l(160));
					switch (a.tag) {
						case 27:
							var c = a.stateNode;
							ol(t, uf(t), c);
							break;
						case 5:
							var d = a.stateNode;
							(a.flags & 32 && (Xr(d, ""), (a.flags &= -33)), ol(t, uf(t), d));
							break;
						case 3:
						case 4:
							var g = a.stateNode.containerInfo;
							sf(t, uf(t), g);
							break;
						default:
							throw Error(l(161));
					}
				} catch (x) {
					Pe(t, t.return, x);
				}
				t.flags &= -3;
			}
			i & 4096 && (t.flags &= -4097);
		}
		function rg(t) {
			if (t.subtreeFlags & 1024)
				for (t = t.child; t !== null; ) {
					var i = t;
					(rg(i), i.tag === 5 && i.flags & 1024 && i.stateNode.reset(), (t = t.sibling));
				}
		}
		function hi(t, i) {
			if (i.subtreeFlags & 8772) for (i = i.child; i !== null; ) (Jv(t, i.alternate, i), (i = i.sibling));
		}
		function Or(t) {
			for (t = t.child; t !== null; ) {
				var i = t;
				switch (i.tag) {
					case 0:
					case 11:
					case 14:
					case 15:
						(Bi(4, i, i.return), Or(i));
						break;
					case 1:
						Pn(i, i.return);
						var a = i.stateNode;
						(typeof a.componentWillUnmount == "function" && Yv(i, i.return, a), Or(i));
						break;
					case 27:
						Du(i.stateNode);
					case 26:
					case 5:
						(Pn(i, i.return), Or(i));
						break;
					case 22:
						i.memoizedState === null && Or(i);
						break;
					case 30:
						Or(i);
						break;
					default:
						Or(i);
				}
				t = t.sibling;
			}
		}
		function mi(t, i, a) {
			for (a = a && (i.subtreeFlags & 8772) !== 0, i = i.child; i !== null; ) {
				var s = i.alternate,
					c = t,
					d = i,
					g = d.flags;
				switch (d.tag) {
					case 0:
					case 11:
					case 15:
						(mi(c, d, a), Eu(4, d));
						break;
					case 1:
						if ((mi(c, d, a), (s = d), (c = s.stateNode), typeof c.componentDidMount == "function"))
							try {
								c.componentDidMount();
							} catch (P) {
								Pe(s, s.return, P);
							}
						if (((s = d), (c = s.updateQueue), c !== null)) {
							var x = s.stateNode;
							try {
								var M = c.shared.hiddenCallbacks;
								if (M !== null) for (c.shared.hiddenCallbacks = null, c = 0; c < M.length; c++) Um(M[c], x);
							} catch (P) {
								Pe(s, s.return, P);
							}
						}
						(a && g & 64 && Pv(d), Cu(d, d.return));
						break;
					case 27:
						Gv(d);
					case 26:
					case 5:
						(mi(c, d, a), a && s === null && g & 4 && Fv(d), Cu(d, d.return));
						break;
					case 12:
						mi(c, d, a);
						break;
					case 31:
						(mi(c, d, a), a && g & 4 && tg(c, d));
						break;
					case 13:
						(mi(c, d, a), a && g & 4 && ng(c, d));
						break;
					case 22:
						(d.memoizedState === null && mi(c, d, a), Cu(d, d.return));
						break;
					case 30:
						break;
					default:
						mi(c, d, a);
				}
				i = i.sibling;
			}
		}
		function of(t, i) {
			var a = null;
			(t !== null &&
				t.memoizedState !== null &&
				t.memoizedState.cachePool !== null &&
				(a = t.memoizedState.cachePool.pool),
				(t = null),
				i.memoizedState !== null && i.memoizedState.cachePool !== null && (t = i.memoizedState.cachePool.pool),
				t !== a && (t != null && t.refCount++, a != null && fu(a)));
		}
		function cf(t, i) {
			((t = null),
				i.alternate !== null && (t = i.alternate.memoizedState.cache),
				(i = i.memoizedState.cache),
				i !== t && (i.refCount++, t != null && fu(t)));
		}
		function Ln(t, i, a, s) {
			if (i.subtreeFlags & 10256) for (i = i.child; i !== null; ) (ag(t, i, a, s), (i = i.sibling));
		}
		function ag(t, i, a, s) {
			var c = i.flags;
			switch (i.tag) {
				case 0:
				case 11:
				case 15:
					(Ln(t, i, a, s), c & 2048 && Eu(9, i));
					break;
				case 1:
					Ln(t, i, a, s);
					break;
				case 3:
					(Ln(t, i, a, s),
						c & 2048 &&
							((t = null),
							i.alternate !== null && (t = i.alternate.memoizedState.cache),
							(i = i.memoizedState.cache),
							i !== t && (i.refCount++, t != null && fu(t))));
					break;
				case 12:
					if (c & 2048) {
						(Ln(t, i, a, s), (t = i.stateNode));
						try {
							var d = i.memoizedProps,
								g = d.id,
								x = d.onPostCommit;
							typeof x == "function" && x(g, i.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
						} catch (M) {
							Pe(i, i.return, M);
						}
					} else Ln(t, i, a, s);
					break;
				case 31:
					Ln(t, i, a, s);
					break;
				case 13:
					Ln(t, i, a, s);
					break;
				case 23:
					break;
				case 22:
					((d = i.stateNode),
						(g = i.alternate),
						i.memoizedState !== null
							? d._visibility & 2
								? Ln(t, i, a, s)
								: Tu(t, i)
							: d._visibility & 2
								? Ln(t, i, a, s)
								: ((d._visibility |= 2), ya(t, i, a, s, (i.subtreeFlags & 10256) !== 0 || !1)),
						c & 2048 && of(g, i));
					break;
				case 24:
					(Ln(t, i, a, s), c & 2048 && cf(i.alternate, i));
					break;
				default:
					Ln(t, i, a, s);
			}
		}
		function ya(t, i, a, s, c) {
			for (c = c && ((i.subtreeFlags & 10256) !== 0 || !1), i = i.child; i !== null; ) {
				var d = t,
					g = i,
					x = a,
					M = s,
					P = g.flags;
				switch (g.tag) {
					case 0:
					case 11:
					case 15:
						(ya(d, g, x, M, c), Eu(8, g));
						break;
					case 23:
						break;
					case 22:
						var J = g.stateNode;
						(g.memoizedState !== null
							? J._visibility & 2
								? ya(d, g, x, M, c)
								: Tu(d, g)
							: ((J._visibility |= 2), ya(d, g, x, M, c)),
							c && P & 2048 && of(g.alternate, g));
						break;
					case 24:
						(ya(d, g, x, M, c), c && P & 2048 && cf(g.alternate, g));
						break;
					default:
						ya(d, g, x, M, c);
				}
				i = i.sibling;
			}
		}
		function Tu(t, i) {
			if (i.subtreeFlags & 10256)
				for (i = i.child; i !== null; ) {
					var a = t,
						s = i,
						c = s.flags;
					switch (s.tag) {
						case 22:
							(Tu(a, s), c & 2048 && of(s.alternate, s));
							break;
						case 24:
							(Tu(a, s), c & 2048 && cf(s.alternate, s));
							break;
						default:
							Tu(a, s);
					}
					i = i.sibling;
				}
		}
		var Au = 8192;
		function ba(t, i, a) {
			if (t.subtreeFlags & Au) for (t = t.child; t !== null; ) (ug(t, i, a), (t = t.sibling));
		}
		function ug(t, i, a) {
			switch (t.tag) {
				case 26:
					(ba(t, i, a), t.flags & Au && t.memoizedState !== null && j_(a, Un, t.memoizedState, t.memoizedProps));
					break;
				case 5:
					ba(t, i, a);
					break;
				case 3:
				case 4:
					var s = Un;
					((Un = El(t.stateNode.containerInfo)), ba(t, i, a), (Un = s));
					break;
				case 22:
					t.memoizedState === null &&
						((s = t.alternate),
						s !== null && s.memoizedState !== null ? ((s = Au), (Au = 16777216), ba(t, i, a), (Au = s)) : ba(t, i, a));
					break;
				default:
					ba(t, i, a);
			}
		}
		function sg(t) {
			var i = t.alternate;
			if (i !== null && ((t = i.child), t !== null)) {
				i.child = null;
				do ((i = t.sibling), (t.sibling = null), (t = i));
				while (t !== null);
			}
		}
		function Ru(t) {
			var i = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (i !== null)
					for (var a = 0; a < i.length; a++) {
						var s = i[a];
						((qt = s), og(s, t));
					}
				sg(t);
			}
			if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (lg(t), (t = t.sibling));
		}
		function lg(t) {
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(Ru(t), t.flags & 2048 && Bi(9, t, t.return));
					break;
				case 3:
					Ru(t);
					break;
				case 12:
					Ru(t);
					break;
				case 22:
					var i = t.stateNode;
					t.memoizedState !== null && i._visibility & 2 && (t.return === null || t.return.tag !== 13)
						? ((i._visibility &= -3), fl(t))
						: Ru(t);
					break;
				default:
					Ru(t);
			}
		}
		function fl(t) {
			var i = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (i !== null)
					for (var a = 0; a < i.length; a++) {
						var s = i[a];
						((qt = s), og(s, t));
					}
				sg(t);
			}
			for (t = t.child; t !== null; ) {
				switch (((i = t), i.tag)) {
					case 0:
					case 11:
					case 15:
						(Bi(8, i, i.return), fl(i));
						break;
					case 22:
						((a = i.stateNode), a._visibility & 2 && ((a._visibility &= -3), fl(i)));
						break;
					default:
						fl(i);
				}
				t = t.sibling;
			}
		}
		function og(t, i) {
			for (; qt !== null; ) {
				var a = qt;
				switch (a.tag) {
					case 0:
					case 11:
					case 15:
						Bi(8, a, i);
						break;
					case 23:
					case 22:
						if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
							var s = a.memoizedState.cachePool.pool;
							s != null && s.refCount++;
						}
						break;
					case 24:
						fu(a.memoizedState.cache);
				}
				if (((s = a.child), s !== null)) ((s.return = a), (qt = s));
				else
					e: for (a = t; qt !== null; ) {
						s = qt;
						var c = s.sibling,
							d = s.return;
						if ((Wv(s), s === a)) {
							qt = null;
							break e;
						}
						if (c !== null) {
							((c.return = d), (qt = c));
							break e;
						}
						qt = d;
					}
			}
		}
		var Jw = {
				getCacheForType: function (t) {
					var i = Vt(St),
						a = i.data.get(t);
					return (a === void 0 && ((a = t()), i.data.set(t, a)), a);
				},
				cacheSignal: function () {
					return Vt(St).controller.signal;
				},
			},
			Ww = typeof WeakMap == "function" ? WeakMap : Map,
			Ve = 0,
			Je = null,
			Re = null,
			ze = 0,
			Qe = 0,
			Sn = null,
			Vi = !1,
			pa = !1,
			ff = !1,
			vi = 0,
			ft = 0,
			Hi = 0,
			Nr = 0,
			df = 0,
			wn = 0,
			Sa = 0,
			Ou = null,
			ln = null,
			hf = !1,
			dl = 0,
			cg = 0,
			hl = 1 / 0,
			ml = null,
			Zi = null,
			Mt = 0,
			Qi = null,
			wa = null,
			gi = 0,
			mf = 0,
			vf = null,
			fg = null,
			Nu = 0,
			gf = null;
		function Mn() {
			return (Ve & 2) !== 0 && ze !== 0 ? ze & -ze : H.T !== null ? _f() : Nh();
		}
		function dg() {
			if (wn === 0)
				if ((ze & 536870912) === 0 || qe) {
					var t = ws;
					((ws <<= 1), (ws & 3932160) === 0 && (ws = 262144), (wn = t));
				} else wn = 536870912;
			return ((t = bn.current), t !== null && (t.flags |= 32), wn);
		}
		function on(t, i, a) {
			(((t === Je && (Qe === 2 || Qe === 9)) || t.cancelPendingCommit !== null) && (_a(t, 0), Pi(t, ze, wn, !1)),
				Es(t, a),
				((Ve & 2) === 0 || t !== Je) &&
					(t === Je && ((Ve & 2) === 0 && (Nr |= a), ft === 4 && Pi(t, ze, wn, !1)), yi(t)));
		}
		function hg(t, i, a) {
			if ((Ve & 6) !== 0) throw Error(l(327));
			var s = (!a && (i & 127) === 0 && (i & t.expiredLanes) === 0) || Ga(t, i),
				c = s ? n_(t, i) : bf(t, i, !0),
				d = s;
			do {
				if (c === 0) {
					pa && !s && Pi(t, i, 0, !1);
					break;
				} else {
					if (((a = t.current.alternate), d && !e_(a))) {
						((c = bf(t, i, !1)), (d = !1));
						continue;
					}
					if (c === 2) {
						if (((d = i), t.errorRecoveryDisabledLanes & d)) var g = 0;
						else ((g = t.pendingLanes & -536870913), (g = g !== 0 ? g : g & 536870912 ? 536870912 : 0));
						if (g !== 0) {
							i = g;
							e: {
								var x = t;
								c = Ou;
								var M = x.current.memoizedState.isDehydrated;
								if ((M && (_a(x, g).flags |= 256), (g = bf(x, g, !1)), g !== 2)) {
									if (ff && !M) {
										((x.errorRecoveryDisabledLanes |= d), (Nr |= d), (c = 4));
										break e;
									}
									((d = ln), (ln = c), d !== null && (ln === null ? (ln = d) : ln.push.apply(ln, d)));
								}
								c = g;
							}
							if (((d = !1), c !== 2)) continue;
						}
					}
					if (c === 1) {
						(_a(t, 0), Pi(t, i, 0, !0));
						break;
					}
					e: {
						switch (((s = t), (d = c), d)) {
							case 0:
							case 1:
								throw Error(l(345));
							case 4:
								if ((i & 4194048) !== i) break;
							case 6:
								Pi(s, i, wn, !Vi);
								break e;
							case 2:
								ln = null;
								break;
							case 3:
							case 5:
								break;
							default:
								throw Error(l(329));
						}
						if ((i & 62914560) === i && ((c = dl + 300 - je()), 10 < c)) {
							if ((Pi(s, i, wn, !Vi), xs(s, 0, !0) !== 0)) break e;
							((gi = i),
								(s.timeoutHandle = Qg(mg.bind(null, s, a, ln, ml, hf, i, wn, Nr, Sa, Vi, d, "Throttled", -0, 0), c)));
							break e;
						}
						mg(s, a, ln, ml, hf, i, wn, Nr, Sa, Vi, d, null, -0, 0);
					}
				}
				break;
			} while (!0);
			yi(t);
		}
		function mg(t, i, a, s, c, d, g, x, M, P, J, ee, Y, K) {
			if (((t.timeoutHandle = -1), (ee = i.subtreeFlags), ee & 8192 || (ee & 16785408) === 16785408)) {
				((ee = {
					stylesheets: null,
					count: 0,
					imgCount: 0,
					imgBytes: 0,
					suspenseyImages: [],
					waitingForImages: !0,
					waitingForViewTransition: !1,
					unsuspend: ti,
				}),
					ug(i, d, ee));
				var ce = (d & 62914560) === d ? dl - je() : (d & 4194048) === d ? cg - je() : 0;
				if (((ce = q_(ee, ce)), ce !== null)) {
					((gi = d),
						(t.cancelPendingCommit = ce(_g.bind(null, t, i, d, a, s, c, g, x, M, J, ee, null, Y, K))),
						Pi(t, d, g, !P));
					return;
				}
			}
			_g(t, i, d, a, s, c, g, x, M);
		}
		function e_(t) {
			for (var i = t; ; ) {
				var a = i.tag;
				if (
					(a === 0 || a === 11 || a === 15) &&
					i.flags & 16384 &&
					((a = i.updateQueue), a !== null && ((a = a.stores), a !== null))
				)
					for (var s = 0; s < a.length; s++) {
						var c = a[s],
							d = c.getSnapshot;
						c = c.value;
						try {
							if (!gn(d(), c)) return !1;
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
		function Pi(t, i, a, s) {
			((i &= ~df),
				(i &= ~Nr),
				(t.suspendedLanes |= i),
				(t.pingedLanes &= ~i),
				s && (t.warmLanes |= i),
				(s = t.expirationTimes));
			for (var c = i; 0 < c; ) {
				var d = 31 - vn(c),
					g = 1 << d;
				((s[d] = -1), (c &= ~g));
			}
			a !== 0 && Th(t, a, i);
		}
		function vl() {
			return (Ve & 6) === 0 ? (Mu(0, !1), !1) : !0;
		}
		function yf() {
			if (Re !== null) {
				if (Qe === 0) var t = Re.return;
				else ((t = Re), (ai = pr = null), zc(t), (da = null), (hu = 0), (t = Re));
				for (; t !== null; ) (Qv(t.alternate, t), (t = t.return));
				Re = null;
			}
		}
		function _a(t, i) {
			var a = t.timeoutHandle;
			(a !== -1 && ((t.timeoutHandle = -1), b_(a)),
				(a = t.cancelPendingCommit),
				a !== null && ((t.cancelPendingCommit = null), a()),
				(gi = 0),
				yf(),
				(Je = t),
				(Re = a = ii(t.current, null)),
				(ze = i),
				(Qe = 0),
				(Sn = null),
				(Vi = !1),
				(pa = Ga(t, i)),
				(ff = !1),
				(Sa = wn = df = Nr = Hi = ft = 0),
				(ln = Ou = null),
				(hf = !1),
				(i & 8) !== 0 && (i |= i & 32));
			var s = t.entangledLanes;
			if (s !== 0)
				for (t = t.entanglements, s &= i; 0 < s; ) {
					var c = 31 - vn(s),
						d = 1 << c;
					((i |= t[c]), (s &= ~d));
				}
			return ((vi = i), qs(), a);
		}
		function vg(t, i) {
			((Ce = null),
				(H.H = wu),
				i === fa || i === Zs
					? ((i = Dm()), (Qe = 3))
					: i === Sc
						? ((i = Dm()), (Qe = 4))
						: (Qe = i === Fc ? 8 : i !== null && typeof i == "object" && typeof i.then == "function" ? 6 : 1),
				(Sn = i),
				Re === null && ((ft = 1), rl(t, Tn(i, t.current))));
		}
		function gg() {
			var t = bn.current;
			return t === null
				? !0
				: (ze & 4194048) === ze
					? Nn === null
					: (ze & 62914560) === ze || (ze & 536870912) !== 0
						? t === Nn
						: !1;
		}
		function yg() {
			var t = H.H;
			return ((H.H = wu), t === null ? wu : t);
		}
		function bg() {
			var t = H.A;
			return ((H.A = Jw), t);
		}
		function gl() {
			((ft = 4),
				Vi || ((ze & 4194048) !== ze && bn.current !== null) || (pa = !0),
				((Hi & 134217727) === 0 && (Nr & 134217727) === 0) || Je === null || Pi(Je, ze, wn, !1));
		}
		function bf(t, i, a) {
			var s = Ve;
			Ve |= 2;
			var c = yg(),
				d = bg();
			((Je !== t || ze !== i) && ((ml = null), _a(t, i)), (i = !1));
			var g = ft;
			e: do
				try {
					if (Qe !== 0 && Re !== null) {
						var x = Re,
							M = Sn;
						switch (Qe) {
							case 8:
								(yf(), (g = 6));
								break e;
							case 3:
							case 2:
							case 9:
							case 6:
								bn.current === null && (i = !0);
								var P = Qe;
								if (((Qe = 0), (Sn = null), xa(t, x, M, P), a && pa)) {
									g = 0;
									break e;
								}
								break;
							default:
								((P = Qe), (Qe = 0), (Sn = null), xa(t, x, M, P));
						}
					}
					(t_(), (g = ft));
					break;
				} catch (J) {
					vg(t, J);
				}
			while (!0);
			return (
				i && t.shellSuspendCounter++,
				(ai = pr = null),
				(Ve = s),
				(H.H = c),
				(H.A = d),
				Re === null && ((Je = null), (ze = 0), qs()),
				g
			);
		}
		function t_() {
			for (; Re !== null; ) pg(Re);
		}
		function n_(t, i) {
			var a = Ve;
			Ve |= 2;
			var s = yg(),
				c = bg();
			Je !== t || ze !== i ? ((ml = null), (hl = je() + 500), _a(t, i)) : (pa = Ga(t, i));
			e: do
				try {
					if (Qe !== 0 && Re !== null) {
						i = Re;
						var d = Sn;
						t: switch (Qe) {
							case 1:
								((Qe = 0), (Sn = null), xa(t, i, d, 1));
								break;
							case 2:
							case 9:
								if (zm(d)) {
									((Qe = 0), (Sn = null), Sg(i));
									break;
								}
								((i = function () {
									((Qe !== 2 && Qe !== 9) || Je !== t || (Qe = 7), yi(t));
								}),
									d.then(i, i));
								break e;
							case 3:
								Qe = 7;
								break e;
							case 4:
								Qe = 5;
								break e;
							case 7:
								zm(d) ? ((Qe = 0), (Sn = null), Sg(i)) : ((Qe = 0), (Sn = null), xa(t, i, d, 7));
								break;
							case 5:
								var g = null;
								switch (Re.tag) {
									case 26:
										g = Re.memoizedState;
									case 5:
									case 27:
										var x = Re;
										if (g ? uy(g) : x.stateNode.complete) {
											((Qe = 0), (Sn = null));
											var M = x.sibling;
											if (M !== null) Re = M;
											else {
												var P = x.return;
												P !== null ? ((Re = P), yl(P)) : (Re = null);
											}
											break t;
										}
								}
								((Qe = 0), (Sn = null), xa(t, i, d, 5));
								break;
							case 6:
								((Qe = 0), (Sn = null), xa(t, i, d, 6));
								break;
							case 8:
								(yf(), (ft = 6));
								break e;
							default:
								throw Error(l(462));
						}
					}
					i_();
					break;
				} catch (J) {
					vg(t, J);
				}
			while (!0);
			return ((ai = pr = null), (H.H = s), (H.A = c), (Ve = a), Re !== null ? 0 : ((Je = null), (ze = 0), qs(), ft));
		}
		function i_() {
			for (; Re !== null && !we(); ) pg(Re);
		}
		function pg(t) {
			var i = Hv(t.alternate, t, vi);
			((t.memoizedProps = t.pendingProps), i === null ? yl(t) : (Re = i));
		}
		function Sg(t) {
			var i = t,
				a = i.alternate;
			switch (i.tag) {
				case 15:
				case 0:
					i = Iv(a, i, i.pendingProps, i.type, void 0, ze);
					break;
				case 11:
					i = Iv(a, i, i.pendingProps, i.type.render, i.ref, ze);
					break;
				case 5:
					zc(i);
				default:
					(Qv(a, i), (i = Re = wm(i, vi)), (i = Hv(a, i, vi)));
			}
			((t.memoizedProps = t.pendingProps), i === null ? yl(t) : (Re = i));
		}
		function xa(t, i, a, s) {
			((ai = pr = null), zc(i), (da = null), (hu = 0));
			var c = i.return;
			try {
				if (Qw(t, c, i, a, ze)) {
					((ft = 1), rl(t, Tn(a, t.current)), (Re = null));
					return;
				}
			} catch (d) {
				if (c !== null) throw ((Re = c), d);
				((ft = 1), rl(t, Tn(a, t.current)), (Re = null));
				return;
			}
			i.flags & 32768
				? (qe || s === 1
						? (t = !0)
						: pa || (ze & 536870912) !== 0
							? (t = !1)
							: ((Vi = t = !0),
								(s === 2 || s === 9 || s === 3 || s === 6) &&
									((s = bn.current), s !== null && s.tag === 13 && (s.flags |= 16384))),
					wg(i, t))
				: yl(i);
		}
		function yl(t) {
			var i = t;
			do {
				if ((i.flags & 32768) !== 0) {
					wg(i, Vi);
					return;
				}
				t = i.return;
				var a = Fw(i.alternate, i, vi);
				if (a !== null) {
					Re = a;
					return;
				}
				if (((i = i.sibling), i !== null)) {
					Re = i;
					return;
				}
				Re = i = t;
			} while (i !== null);
			ft === 0 && (ft = 5);
		}
		function wg(t, i) {
			do {
				var a = Kw(t.alternate, t);
				if (a !== null) {
					((a.flags &= 32767), (Re = a));
					return;
				}
				if (
					((a = t.return),
					a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
					!i && ((t = t.sibling), t !== null))
				) {
					Re = t;
					return;
				}
				Re = t = a;
			} while (t !== null);
			((ft = 6), (Re = null));
		}
		function _g(t, i, a, s, c, d, g, x, M) {
			t.cancelPendingCommit = null;
			do bl();
			while (Mt !== 0);
			if ((Ve & 6) !== 0) throw Error(l(327));
			if (i !== null) {
				if (i === t.current) throw Error(l(177));
				if (
					((d = i.lanes | i.childLanes),
					(d |= ac),
					ZS(t, a, d, g, x, M),
					t === Je && ((Re = Je = null), (ze = 0)),
					(wa = i),
					(Qi = t),
					(gi = a),
					(mf = d),
					(vf = c),
					(fg = s),
					(i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0
						? ((t.callbackNode = null),
							(t.callbackPriority = 0),
							s_(tn, function () {
								return (Ag(), null);
							}))
						: ((t.callbackNode = null), (t.callbackPriority = 0)),
					(s = (i.flags & 13878) !== 0),
					(i.subtreeFlags & 13878) !== 0 || s)
				) {
					((s = H.T), (H.T = null), (c = B.p), (B.p = 2), (g = Ve), (Ve |= 4));
					try {
						Gw(t, i, a);
					} finally {
						((Ve = g), (B.p = c), (H.T = s));
					}
				}
				((Mt = 1), xg(), Eg(), Cg());
			}
		}
		function xg() {
			if (Mt === 1) {
				Mt = 0;
				var t = Qi,
					i = wa,
					a = (i.flags & 13878) !== 0;
				if ((i.subtreeFlags & 13878) !== 0 || a) {
					((a = H.T), (H.T = null));
					var s = B.p;
					B.p = 2;
					var c = Ve;
					Ve |= 4;
					try {
						ig(i, t);
						var d = Of,
							g = dm(t.containerInfo),
							x = d.focusedElem,
							M = d.selectionRange;
						if (g !== x && x && x.ownerDocument && fm(x.ownerDocument.documentElement, x)) {
							if (M !== null && ec(x)) {
								var P = M.start,
									J = M.end;
								if ((J === void 0 && (J = P), "selectionStart" in x))
									((x.selectionStart = P), (x.selectionEnd = Math.min(J, x.value.length)));
								else {
									var ee = x.ownerDocument || document,
										Y = (ee && ee.defaultView) || window;
									if (Y.getSelection) {
										var K = Y.getSelection(),
											ce = x.textContent.length,
											be = Math.min(M.start, ce),
											Ge = M.end === void 0 ? be : Math.min(M.end, ce);
										!K.extend && be > Ge && ((g = Ge), (Ge = be), (be = g));
										var V = cm(x, be),
											q = cm(x, Ge);
										if (
											V &&
											q &&
											(K.rangeCount !== 1 ||
												K.anchorNode !== V.node ||
												K.anchorOffset !== V.offset ||
												K.focusNode !== q.node ||
												K.focusOffset !== q.offset)
										) {
											var Z = ee.createRange();
											(Z.setStart(V.node, V.offset),
												K.removeAllRanges(),
												be > Ge
													? (K.addRange(Z), K.extend(q.node, q.offset))
													: (Z.setEnd(q.node, q.offset), K.addRange(Z)));
										}
									}
								}
							}
							for (ee = [], K = x; (K = K.parentNode); )
								K.nodeType === 1 && ee.push({ element: K, left: K.scrollLeft, top: K.scrollTop });
							for (typeof x.focus == "function" && x.focus(), x = 0; x < ee.length; x++) {
								var W = ee[x];
								((W.element.scrollLeft = W.left), (W.element.scrollTop = W.top));
							}
						}
						((Nl = !!Rf), (Of = Rf = null));
					} finally {
						((Ve = c), (B.p = s), (H.T = a));
					}
				}
				((t.current = i), (Mt = 2));
			}
		}
		function Eg() {
			if (Mt === 2) {
				Mt = 0;
				var t = Qi,
					i = wa,
					a = (i.flags & 8772) !== 0;
				if ((i.subtreeFlags & 8772) !== 0 || a) {
					((a = H.T), (H.T = null));
					var s = B.p;
					B.p = 2;
					var c = Ve;
					Ve |= 4;
					try {
						Jv(t, i.alternate, i);
					} finally {
						((Ve = c), (B.p = s), (H.T = a));
					}
				}
				Mt = 3;
			}
		}
		function Cg() {
			if (Mt === 4 || Mt === 3) {
				((Mt = 0), dt());
				var t = Qi,
					i = wa,
					a = gi,
					s = fg;
				(i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0
					? (Mt = 5)
					: ((Mt = 0), (wa = Qi = null), Tg(t, t.pendingLanes));
				var c = t.pendingLanes;
				if ((c === 0 && (Zi = null), jo(a), (i = i.stateNode), Lt && typeof Lt.onCommitFiberRoot == "function"))
					try {
						Lt.onCommitFiberRoot(Gt, i, void 0, (i.current.flags & 128) === 128);
					} catch {}
				if (s !== null) {
					((i = H.T), (c = B.p), (B.p = 2), (H.T = null));
					try {
						for (var d = t.onRecoverableError, g = 0; g < s.length; g++) {
							var x = s[g];
							d(x.value, { componentStack: x.stack });
						}
					} finally {
						((H.T = i), (B.p = c));
					}
				}
				((gi & 3) !== 0 && bl(),
					yi(t),
					(c = t.pendingLanes),
					(a & 261930) !== 0 && (c & 42) !== 0 ? (t === gf ? Nu++ : ((Nu = 0), (gf = t))) : (Nu = 0),
					Mu(0, !1));
			}
		}
		function Tg(t, i) {
			(t.pooledCacheLanes &= i) === 0 && ((i = t.pooledCache), i != null && ((t.pooledCache = null), fu(i)));
		}
		function bl() {
			return (xg(), Eg(), Cg(), Ag());
		}
		function Ag() {
			if (Mt !== 5) return !1;
			var t = Qi,
				i = mf;
			mf = 0;
			var a = jo(gi),
				s = H.T,
				c = B.p;
			try {
				((B.p = 32 > a ? 32 : a), (H.T = null), (a = vf), (vf = null));
				var d = Qi,
					g = gi;
				if (((Mt = 0), (wa = Qi = null), (gi = 0), (Ve & 6) !== 0)) throw Error(l(331));
				var x = Ve;
				if (
					((Ve |= 4),
					lg(d.current),
					ag(d, d.current, g, a),
					(Ve = x),
					Mu(0, !1),
					Lt && typeof Lt.onPostCommitFiberRoot == "function")
				)
					try {
						Lt.onPostCommitFiberRoot(Gt, d);
					} catch {}
				return !0;
			} finally {
				((B.p = c), (H.T = s), Tg(t, i));
			}
		}
		function Rg(t, i, a) {
			((i = Tn(a, i)), (i = Yc(t.stateNode, i, 2)), (t = Tr(t, i, 2)), t !== null && (Es(t, 2), yi(t)));
		}
		function Pe(t, i, a) {
			if (t.tag === 3) Rg(t, t, a);
			else
				for (; i !== null; ) {
					if (i.tag === 3) {
						Rg(i, t, a);
						break;
					} else if (i.tag === 1) {
						var s = i.stateNode;
						if (
							typeof i.type.getDerivedStateFromError == "function" ||
							(typeof s.componentDidCatch == "function" && (Zi === null || !Zi.has(s)))
						) {
							((t = Tn(a, t)), (a = Ov(2)), (s = Tr(i, a, 2)), s !== null && (Nv(a, s, i, t), Es(s, 2), yi(s)));
							break;
						}
					}
					i = i.return;
				}
		}
		function pf(t, i, a) {
			var s = t.pingCache;
			if (s === null) {
				s = t.pingCache = new Ww();
				var c = new Set();
				s.set(i, c);
			} else ((c = s.get(i)), c === void 0 && ((c = new Set()), s.set(i, c)));
			c.has(a) || ((ff = !0), c.add(a), (t = r_.bind(null, t, i, a)), i.then(t, t));
		}
		function r_(t, i, a) {
			var s = t.pingCache;
			(s !== null && s.delete(i),
				(t.pingedLanes |= t.suspendedLanes & a),
				(t.warmLanes &= ~a),
				Je === t &&
					(ze & a) === a &&
					(ft === 4 || (ft === 3 && (ze & 62914560) === ze && 300 > je() - dl) ? (Ve & 2) === 0 && _a(t, 0) : (df |= a),
					Sa === ze && (Sa = 0)),
				yi(t));
		}
		function Og(t, i) {
			(i === 0 && (i = Ch()), (t = gr(t, i)), t !== null && (Es(t, i), yi(t)));
		}
		function a_(t) {
			var i = t.memoizedState,
				a = 0;
			(i !== null && (a = i.retryLane), Og(t, a));
		}
		function u_(t, i) {
			var a = 0;
			switch (t.tag) {
				case 31:
				case 13:
					var s = t.stateNode,
						c = t.memoizedState;
					c !== null && (a = c.retryLane);
					break;
				case 19:
					s = t.stateNode;
					break;
				case 22:
					s = t.stateNode._retryCache;
					break;
				default:
					throw Error(l(314));
			}
			(s !== null && s.delete(i), Og(t, a));
		}
		function s_(t, i) {
			return bt(t, i);
		}
		var pl = null,
			Ea = null,
			Sf = !1,
			Sl = !1,
			wf = !1,
			Yi = 0;
		function yi(t) {
			(t !== Ea && t.next === null && (Ea === null ? (pl = Ea = t) : (Ea = Ea.next = t)),
				(Sl = !0),
				Sf || ((Sf = !0), o_()));
		}
		function Mu(t, i) {
			if (!wf && Sl) {
				wf = !0;
				do
					for (var a = !1, s = pl; s !== null; ) {
						if (!i)
							if (t !== 0) {
								var c = s.pendingLanes;
								if (c === 0) var d = 0;
								else {
									var g = s.suspendedLanes,
										x = s.pingedLanes;
									((d = (1 << (31 - vn(42 | t) + 1)) - 1),
										(d &= c & ~(g & ~x)),
										(d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0));
								}
								d !== 0 && ((a = !0), kg(s, d));
							} else
								((d = ze),
									(d = xs(s, s === Je ? d : 0, s.cancelPendingCommit !== null || s.timeoutHandle !== -1)),
									(d & 3) === 0 || Ga(s, d) || ((a = !0), kg(s, d)));
						s = s.next;
					}
				while (a);
				wf = !1;
			}
		}
		function l_() {
			Ng();
		}
		function Ng() {
			Sl = Sf = !1;
			var t = 0;
			Yi !== 0 && y_() && (t = Yi);
			for (var i = je(), a = null, s = pl; s !== null; ) {
				var c = s.next,
					d = Mg(s, i);
				(d === 0
					? ((s.next = null), a === null ? (pl = c) : (a.next = c), c === null && (Ea = a))
					: ((a = s), (t !== 0 || (d & 3) !== 0) && (Sl = !0)),
					(s = c));
			}
			((Mt !== 0 && Mt !== 5) || Mu(t, !1), Yi !== 0 && (Yi = 0));
		}
		function Mg(t, i) {
			for (
				var a = t.suspendedLanes, s = t.pingedLanes, c = t.expirationTimes, d = t.pendingLanes & -62914561;
				0 < d;
			) {
				var g = 31 - vn(d),
					x = 1 << g,
					M = c[g];
				(M === -1 ? ((x & a) === 0 || (x & s) !== 0) && (c[g] = HS(x, i)) : M <= i && (t.expiredLanes |= x), (d &= ~x));
			}
			if (
				((i = Je),
				(a = ze),
				(a = xs(t, t === i ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				(s = t.callbackNode),
				a === 0 || (t === i && (Qe === 2 || Qe === 9)) || t.cancelPendingCommit !== null)
			)
				return (s !== null && s !== null && ae(s), (t.callbackNode = null), (t.callbackPriority = 0));
			if ((a & 3) === 0 || Ga(t, a)) {
				if (((i = a & -a), i === t.callbackPriority)) return i;
				switch ((s !== null && ae(s), jo(a))) {
					case 2:
					case 8:
						a = We;
						break;
					case 32:
						a = tn;
						break;
					case 268435456:
						a = oe;
						break;
					default:
						a = tn;
				}
				return ((s = zg.bind(null, t)), (a = bt(a, s)), (t.callbackPriority = i), (t.callbackNode = a), i);
			}
			return (s !== null && s !== null && ae(s), (t.callbackPriority = 2), (t.callbackNode = null), 2);
		}
		function zg(t, i) {
			if (Mt !== 0 && Mt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
			var a = t.callbackNode;
			if (bl() && t.callbackNode !== a) return null;
			var s = ze;
			return (
				(s = xs(t, t === Je ? s : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				s === 0
					? null
					: (hg(t, s, i), Mg(t, je()), t.callbackNode != null && t.callbackNode === a ? zg.bind(null, t) : null)
			);
		}
		function kg(t, i) {
			if (bl()) return null;
			hg(t, i, !0);
		}
		function o_() {
			p_(function () {
				(Ve & 6) !== 0 ? bt(Ut, l_) : Ng();
			});
		}
		function _f() {
			if (Yi === 0) {
				var t = oa;
				(t === 0 && ((t = Ss), (Ss <<= 1), (Ss & 261888) === 0 && (Ss = 256)), (Yi = t));
			}
			return Yi;
		}
		function Dg(t) {
			return t == null || typeof t == "symbol" || typeof t == "boolean"
				? null
				: typeof t == "function"
					? t
					: Rs("" + t);
		}
		function jg(t, i) {
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
		function c_(t, i, a, s, c) {
			if (i === "submit" && a && a.stateNode === c) {
				var d = Dg((c[nn] || null).action),
					g = s.submitter;
				g &&
					((i = (i = g[nn] || null) ? Dg(i.formAction) : g.getAttribute("formAction")),
					i !== null && ((d = i), (g = null)));
				var x = new zs("action", "action", null, s, c);
				t.push({
					event: x,
					listeners: [
						{
							instance: null,
							listener: function () {
								if (s.defaultPrevented) {
									if (Yi !== 0) {
										var M = g ? jg(c, g) : new FormData(c);
										Bc(a, { pending: !0, data: M, method: c.method, action: d }, null, M);
									}
								} else
									typeof d == "function" &&
										(x.preventDefault(),
										(M = g ? jg(c, g) : new FormData(c)),
										Bc(a, { pending: !0, data: M, method: c.method, action: d }, d, M));
							},
							currentTarget: c,
						},
					],
				});
			}
		}
		for (var xf = 0; xf < rc.length; xf++) {
			var Ef = rc[xf];
			In(Ef.toLowerCase(), "on" + (Ef[0].toUpperCase() + Ef.slice(1)));
		}
		(In(vm, "onAnimationEnd"),
			In(gm, "onAnimationIteration"),
			In(ym, "onAnimationStart"),
			In("dblclick", "onDoubleClick"),
			In("focusin", "onFocus"),
			In("focusout", "onBlur"),
			In(Cw, "onTransitionRun"),
			In(Tw, "onTransitionStart"),
			In(Aw, "onTransitionCancel"),
			In(bm, "onTransitionEnd"),
			Kr("onMouseEnter", ["mouseout", "mouseover"]),
			Kr("onMouseLeave", ["mouseout", "mouseover"]),
			Kr("onPointerEnter", ["pointerout", "pointerover"]),
			Kr("onPointerLeave", ["pointerout", "pointerover"]),
			dr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
			dr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
			dr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
			dr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
			dr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
			dr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" ")));
		var zu =
				"abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
					" ",
				),
			f_ = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(zu));
		function qg(t, i) {
			i = (i & 4) !== 0;
			for (var a = 0; a < t.length; a++) {
				var s = t[a],
					c = s.event;
				s = s.listeners;
				e: {
					var d = void 0;
					if (i)
						for (var g = s.length - 1; 0 <= g; g--) {
							var x = s[g],
								M = x.instance,
								P = x.currentTarget;
							if (((x = x.listener), M !== d && c.isPropagationStopped())) break e;
							((d = x), (c.currentTarget = P));
							try {
								d(c);
							} catch (J) {
								js(J);
							}
							((c.currentTarget = null), (d = M));
						}
					else
						for (g = 0; g < s.length; g++) {
							if (
								((x = s[g]),
								(M = x.instance),
								(P = x.currentTarget),
								(x = x.listener),
								M !== d && c.isPropagationStopped())
							)
								break e;
							((d = x), (c.currentTarget = P));
							try {
								d(c);
							} catch (J) {
								js(J);
							}
							((c.currentTarget = null), (d = M));
						}
				}
			}
		}
		function Oe(t, i) {
			var a = i[qo];
			a === void 0 && (a = i[qo] = new Set());
			var s = t + "__bubble";
			a.has(s) || (Ug(i, t, 2, !1), a.add(s));
		}
		function Cf(t, i, a) {
			var s = 0;
			(i && (s |= 4), Ug(a, t, s, i));
		}
		var wl = "_reactListening" + Math.random().toString(36).slice(2);
		function Ig(t) {
			if (!t[wl]) {
				((t[wl] = !0),
					kh.forEach(function (a) {
						a !== "selectionchange" && (f_.has(a) || Cf(a, !1, t), Cf(a, !0, t));
					}));
				var i = t.nodeType === 9 ? t : t.ownerDocument;
				i === null || i[wl] || ((i[wl] = !0), Cf("selectionchange", !1, i));
			}
		}
		function Ug(t, i, a, s) {
			switch (fy(i)) {
				case 2:
					var c = B_;
					break;
				case 8:
					c = V_;
					break;
				default:
					c = $f;
			}
			((a = c.bind(null, i, a, t)),
				(c = void 0),
				!Qo || (i !== "touchstart" && i !== "touchmove" && i !== "wheel") || (c = !0),
				s
					? c !== void 0
						? t.addEventListener(i, a, { capture: !0, passive: c })
						: t.addEventListener(i, a, !0)
					: c !== void 0
						? t.addEventListener(i, a, { passive: c })
						: t.addEventListener(i, a, !1));
		}
		function Tf(t, i, a, s, c) {
			var d = s;
			if ((i & 1) === 0 && (i & 2) === 0 && s !== null)
				e: for (;;) {
					if (s === null) return;
					var g = s.tag;
					if (g === 3 || g === 4) {
						var x = s.stateNode.containerInfo;
						if (x === c) break;
						if (g === 4)
							for (g = s.return; g !== null; ) {
								var M = g.tag;
								if ((M === 3 || M === 4) && g.stateNode.containerInfo === c) return;
								g = g.return;
							}
						for (; x !== null; ) {
							if (((g = Pr(x)), g === null)) return;
							if (((M = g.tag), M === 5 || M === 6 || M === 26 || M === 27)) {
								s = d = g;
								continue e;
							}
							x = x.parentNode;
						}
					}
					s = s.return;
				}
			Qh(function () {
				var P = d,
					J = Ho(a),
					ee = [];
				e: {
					var Y = pm.get(t);
					if (Y !== void 0) {
						var K = zs,
							ce = t;
						switch (t) {
							case "keypress":
								if (Ns(a) === 0) break e;
							case "keydown":
							case "keyup":
								K = lw;
								break;
							case "focusin":
								((ce = "focus"), (K = Ko));
								break;
							case "focusout":
								((ce = "blur"), (K = Ko));
								break;
							case "beforeblur":
							case "afterblur":
								K = Ko;
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
								K = Fh;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								K = tw;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								K = ow;
								break;
							case vm:
							case gm:
							case ym:
								K = nw;
								break;
							case bm:
								K = cw;
								break;
							case "scroll":
							case "scrollend":
								K = ew;
								break;
							case "wheel":
								K = fw;
								break;
							case "copy":
							case "cut":
							case "paste":
								K = iw;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								K = Gh;
								break;
							case "toggle":
							case "beforetoggle":
								K = dw;
						}
						var be = (i & 4) !== 0,
							Ge = !be && (t === "scroll" || t === "scrollend"),
							V = be ? (Y !== null ? Y + "Capture" : null) : Y;
						be = [];
						for (var q = P, Z; q !== null; ) {
							var W = q;
							if (
								((Z = W.stateNode),
								(W = W.tag),
								(W !== 5 && W !== 26 && W !== 27) ||
									Z === null ||
									V === null ||
									((W = eu(q, V)), W != null && be.push(ku(q, W, Z))),
								Ge)
							)
								break;
							q = q.return;
						}
						0 < be.length && ((Y = new K(Y, ce, null, a, J)), ee.push({ event: Y, listeners: be }));
					}
				}
				if ((i & 7) === 0) {
					e: {
						if (
							((Y = t === "mouseover" || t === "pointerover"),
							(K = t === "mouseout" || t === "pointerout"),
							Y && a !== Vo && (ce = a.relatedTarget || a.fromElement) && (Pr(ce) || ce[Xa]))
						)
							break e;
						if (
							(K || Y) &&
							((Y = J.window === J ? J : (Y = J.ownerDocument) ? Y.defaultView || Y.parentWindow : window),
							K
								? ((ce = a.relatedTarget || a.toElement),
									(K = P),
									(ce = ce ? Pr(ce) : null),
									ce !== null &&
										((Ge = f(ce)), (be = ce.tag), ce !== Ge || (be !== 5 && be !== 27 && be !== 6)) &&
										(ce = null))
								: ((K = null), (ce = P)),
							K !== ce)
						) {
							if (
								((be = Fh),
								(W = "onMouseLeave"),
								(V = "onMouseEnter"),
								(q = "mouse"),
								(t === "pointerout" || t === "pointerover") &&
									((be = Gh), (W = "onPointerLeave"), (V = "onPointerEnter"), (q = "pointer")),
								(Ge = K == null ? Y : Wa(K)),
								(Z = ce == null ? Y : Wa(ce)),
								(Y = new be(W, q + "leave", K, a, J)),
								(Y.target = Ge),
								(Y.relatedTarget = Z),
								(W = null),
								Pr(J) === P &&
									((be = new be(V, q + "enter", ce, a, J)), (be.target = Z), (be.relatedTarget = Ge), (W = be)),
								(Ge = W),
								K && ce)
							)
								t: {
									for (be = d_, V = K, q = ce, Z = 0, W = V; W; W = be(W)) Z++;
									W = 0;
									for (var ve = q; ve; ve = be(ve)) W++;
									for (; 0 < Z - W; ) ((V = be(V)), Z--);
									for (; 0 < W - Z; ) ((q = be(q)), W--);
									for (; Z--; ) {
										if (V === q || (q !== null && V === q.alternate)) {
											be = V;
											break t;
										}
										((V = be(V)), (q = be(q)));
									}
									be = null;
								}
							else be = null;
							(K !== null && Lg(ee, Y, K, be, !1), ce !== null && Ge !== null && Lg(ee, Ge, ce, be, !0));
						}
					}
					e: {
						if (
							((Y = P ? Wa(P) : window),
							(K = Y.nodeName && Y.nodeName.toLowerCase()),
							K === "select" || (K === "input" && Y.type === "file"))
						)
							var $e = rm;
						else if (nm(Y))
							if (am) $e = _w;
							else {
								$e = Sw;
								var he = pw;
							}
						else
							((K = Y.nodeName),
								!K || K.toLowerCase() !== "input" || (Y.type !== "checkbox" && Y.type !== "radio")
									? P && Bo(P.elementType) && ($e = rm)
									: ($e = ww));
						if ($e && ($e = $e(t, P))) {
							im(ee, $e, a, J);
							break e;
						}
						(he && he(t, Y, P),
							t === "focusout" &&
								P &&
								Y.type === "number" &&
								P.memoizedProps.value != null &&
								$o(Y, "number", Y.value));
					}
					switch (((he = P ? Wa(P) : window), t)) {
						case "focusin":
							(nm(he) || he.contentEditable === "true") && ((ta = he), (tc = P), (lu = null));
							break;
						case "focusout":
							lu = tc = ta = null;
							break;
						case "mousedown":
							nc = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							((nc = !1), hm(ee, a, J));
							break;
						case "selectionchange":
							if (Ew) break;
						case "keydown":
						case "keyup":
							hm(ee, a, J);
					}
					var Ae;
					if (Xo)
						e: {
							switch (t) {
								case "compositionstart":
									var ke = "onCompositionStart";
									break e;
								case "compositionend":
									ke = "onCompositionEnd";
									break e;
								case "compositionupdate":
									ke = "onCompositionUpdate";
									break e;
							}
							ke = void 0;
						}
					else
						ea
							? em(t, a) && (ke = "onCompositionEnd")
							: t === "keydown" && a.keyCode === 229 && (ke = "onCompositionStart");
					(ke &&
						(Xh &&
							a.locale !== "ko" &&
							(ea || ke !== "onCompositionStart"
								? ke === "onCompositionEnd" && ea && (Ae = Ph())
								: ((ki = J), (Po = "value" in ki ? ki.value : ki.textContent), (ea = !0))),
						(he = _l(P, ke)),
						0 < he.length &&
							((ke = new Kh(ke, t, null, a, J)),
							ee.push({ event: ke, listeners: he }),
							Ae ? (ke.data = Ae) : ((Ae = tm(a)), Ae !== null && (ke.data = Ae)))),
						(Ae = mw ? vw(t, a) : gw(t, a)) &&
							((ke = _l(P, "onBeforeInput")),
							0 < ke.length &&
								((he = new Kh("onBeforeInput", "beforeinput", null, a, J)),
								ee.push({ event: he, listeners: ke }),
								(he.data = Ae))),
						c_(ee, t, P, a, J));
				}
				qg(ee, i);
			});
		}
		function ku(t, i, a) {
			return { instance: t, listener: i, currentTarget: a };
		}
		function _l(t, i) {
			for (var a = i + "Capture", s = []; t !== null; ) {
				var c = t,
					d = c.stateNode;
				if (
					((c = c.tag),
					(c !== 5 && c !== 26 && c !== 27) ||
						d === null ||
						((c = eu(t, a)), c != null && s.unshift(ku(t, c, d)), (c = eu(t, i)), c != null && s.push(ku(t, c, d))),
					t.tag === 3)
				)
					return s;
				t = t.return;
			}
			return [];
		}
		function d_(t) {
			if (t === null) return null;
			do t = t.return;
			while (t && t.tag !== 5 && t.tag !== 27);
			return t || null;
		}
		function Lg(t, i, a, s, c) {
			for (var d = i._reactName, g = []; a !== null && a !== s; ) {
				var x = a,
					M = x.alternate,
					P = x.stateNode;
				if (((x = x.tag), M !== null && M === s)) break;
				((x !== 5 && x !== 26 && x !== 27) ||
					P === null ||
					((M = P),
					c
						? ((P = eu(a, d)), P != null && g.unshift(ku(a, P, M)))
						: c || ((P = eu(a, d)), P != null && g.push(ku(a, P, M)))),
					(a = a.return));
			}
			g.length !== 0 && t.push({ event: i, listeners: g });
		}
		var h_ = /\r\n?/g,
			m_ = /\u0000|\uFFFD/g;
		function $g(t) {
			return (typeof t == "string" ? t : "" + t)
				.replace(
					h_,
					`
`,
				)
				.replace(m_, "");
		}
		function Bg(t, i) {
			return ((i = $g(i)), $g(t) === i);
		}
		function Ke(t, i, a, s, c, d) {
			switch (a) {
				case "children":
					typeof s == "string"
						? i === "body" || (i === "textarea" && s === "") || Xr(t, s)
						: (typeof s == "number" || typeof s == "bigint") && i !== "body" && Xr(t, "" + s);
					break;
				case "className":
					Ts(t, "class", s);
					break;
				case "tabIndex":
					Ts(t, "tabindex", s);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					Ts(t, a, s);
					break;
				case "style":
					Hh(t, s, d);
					break;
				case "data":
					if (i !== "object") {
						Ts(t, "data", s);
						break;
					}
				case "src":
				case "href":
					if (s === "" && (i !== "a" || a !== "href")) {
						t.removeAttribute(a);
						break;
					}
					if (s == null || typeof s == "function" || typeof s == "symbol" || typeof s == "boolean") {
						t.removeAttribute(a);
						break;
					}
					((s = Rs("" + s)), t.setAttribute(a, s));
					break;
				case "action":
				case "formAction":
					if (typeof s == "function") {
						t.setAttribute(
							a,
							"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
						);
						break;
					} else
						typeof d == "function" &&
							(a === "formAction"
								? (i !== "input" && Ke(t, i, "name", c.name, c, null),
									Ke(t, i, "formEncType", c.formEncType, c, null),
									Ke(t, i, "formMethod", c.formMethod, c, null),
									Ke(t, i, "formTarget", c.formTarget, c, null))
								: (Ke(t, i, "encType", c.encType, c, null),
									Ke(t, i, "method", c.method, c, null),
									Ke(t, i, "target", c.target, c, null)));
					if (s == null || typeof s == "symbol" || typeof s == "boolean") {
						t.removeAttribute(a);
						break;
					}
					((s = Rs("" + s)), t.setAttribute(a, s));
					break;
				case "onClick":
					s != null && (t.onclick = ti);
					break;
				case "onScroll":
					s != null && Oe("scroll", t);
					break;
				case "onScrollEnd":
					s != null && Oe("scrollend", t);
					break;
				case "dangerouslySetInnerHTML":
					if (s != null) {
						if (typeof s != "object" || !("__html" in s)) throw Error(l(61));
						if (((a = s.__html), a != null)) {
							if (c.children != null) throw Error(l(60));
							t.innerHTML = a;
						}
					}
					break;
				case "multiple":
					t.multiple = s && typeof s != "function" && typeof s != "symbol";
					break;
				case "muted":
					t.muted = s && typeof s != "function" && typeof s != "symbol";
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
						t.removeAttribute("xlink:href");
						break;
					}
					((a = Rs("" + s)), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a));
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
						? t.setAttribute(a, "" + s)
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
					s && typeof s != "function" && typeof s != "symbol" ? t.setAttribute(a, "") : t.removeAttribute(a);
					break;
				case "capture":
				case "download":
					s === !0
						? t.setAttribute(a, "")
						: s !== !1 && s != null && typeof s != "function" && typeof s != "symbol"
							? t.setAttribute(a, s)
							: t.removeAttribute(a);
					break;
				case "cols":
				case "rows":
				case "size":
				case "span":
					s != null && typeof s != "function" && typeof s != "symbol" && !isNaN(s) && 1 <= s
						? t.setAttribute(a, s)
						: t.removeAttribute(a);
					break;
				case "rowSpan":
				case "start":
					s == null || typeof s == "function" || typeof s == "symbol" || isNaN(s)
						? t.removeAttribute(a)
						: t.setAttribute(a, s);
					break;
				case "popover":
					(Oe("beforetoggle", t), Oe("toggle", t), Cs(t, "popover", s));
					break;
				case "xlinkActuate":
					ei(t, "http://www.w3.org/1999/xlink", "xlink:actuate", s);
					break;
				case "xlinkArcrole":
					ei(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", s);
					break;
				case "xlinkRole":
					ei(t, "http://www.w3.org/1999/xlink", "xlink:role", s);
					break;
				case "xlinkShow":
					ei(t, "http://www.w3.org/1999/xlink", "xlink:show", s);
					break;
				case "xlinkTitle":
					ei(t, "http://www.w3.org/1999/xlink", "xlink:title", s);
					break;
				case "xlinkType":
					ei(t, "http://www.w3.org/1999/xlink", "xlink:type", s);
					break;
				case "xmlBase":
					ei(t, "http://www.w3.org/XML/1998/namespace", "xml:base", s);
					break;
				case "xmlLang":
					ei(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", s);
					break;
				case "xmlSpace":
					ei(t, "http://www.w3.org/XML/1998/namespace", "xml:space", s);
					break;
				case "is":
					Cs(t, "is", s);
					break;
				case "innerText":
				case "textContent":
					break;
				default:
					(!(2 < a.length) || (a[0] !== "o" && a[0] !== "O") || (a[1] !== "n" && a[1] !== "N")) &&
						((a = JS.get(a) || a), Cs(t, a, s));
			}
		}
		function Af(t, i, a, s, c, d) {
			switch (a) {
				case "style":
					Hh(t, s, d);
					break;
				case "dangerouslySetInnerHTML":
					if (s != null) {
						if (typeof s != "object" || !("__html" in s)) throw Error(l(61));
						if (((a = s.__html), a != null)) {
							if (c.children != null) throw Error(l(60));
							t.innerHTML = a;
						}
					}
					break;
				case "children":
					typeof s == "string" ? Xr(t, s) : (typeof s == "number" || typeof s == "bigint") && Xr(t, "" + s);
					break;
				case "onScroll":
					s != null && Oe("scroll", t);
					break;
				case "onScrollEnd":
					s != null && Oe("scrollend", t);
					break;
				case "onClick":
					s != null && (t.onclick = ti);
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
					if (!Dh.hasOwnProperty(a))
						e: {
							if (
								a[0] === "o" &&
								a[1] === "n" &&
								((c = a.endsWith("Capture")),
								(i = a.slice(2, c ? a.length - 7 : void 0)),
								(d = t[nn] || null),
								(d = d != null ? d[a] : null),
								typeof d == "function" && t.removeEventListener(i, d, c),
								typeof s == "function")
							) {
								(typeof d != "function" &&
									d !== null &&
									(a in t ? (t[a] = null) : t.hasAttribute(a) && t.removeAttribute(a)),
									t.addEventListener(i, s, c));
								break e;
							}
							a in t ? (t[a] = s) : s === !0 ? t.setAttribute(a, "") : Cs(t, a, s);
						}
			}
		}
		function Zt(t, i, a) {
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
					(Oe("error", t), Oe("load", t));
					var s = !1,
						c = !1,
						d;
					for (d in a)
						if (a.hasOwnProperty(d)) {
							var g = a[d];
							if (g != null)
								switch (d) {
									case "src":
										s = !0;
										break;
									case "srcSet":
										c = !0;
										break;
									case "children":
									case "dangerouslySetInnerHTML":
										throw Error(l(137, i));
									default:
										Ke(t, i, d, g, a, null);
								}
						}
					(c && Ke(t, i, "srcSet", a.srcSet, a, null), s && Ke(t, i, "src", a.src, a, null));
					return;
				case "input":
					Oe("invalid", t);
					var x = (d = g = c = null),
						M = null,
						P = null;
					for (s in a)
						if (a.hasOwnProperty(s)) {
							var J = a[s];
							if (J != null)
								switch (s) {
									case "name":
										c = J;
										break;
									case "type":
										g = J;
										break;
									case "checked":
										M = J;
										break;
									case "defaultChecked":
										P = J;
										break;
									case "value":
										d = J;
										break;
									case "defaultValue":
										x = J;
										break;
									case "children":
									case "dangerouslySetInnerHTML":
										if (J != null) throw Error(l(137, i));
										break;
									default:
										Ke(t, i, s, J, a, null);
								}
						}
					Lh(t, d, x, M, P, g, c, !1);
					return;
				case "select":
					(Oe("invalid", t), (s = g = d = null));
					for (c in a)
						if (a.hasOwnProperty(c) && ((x = a[c]), x != null))
							switch (c) {
								case "value":
									d = x;
									break;
								case "defaultValue":
									g = x;
									break;
								case "multiple":
									s = x;
								default:
									Ke(t, i, c, x, a, null);
							}
					((i = d), (a = g), (t.multiple = !!s), i != null ? Gr(t, !!s, i, !1) : a != null && Gr(t, !!s, a, !0));
					return;
				case "textarea":
					(Oe("invalid", t), (d = c = s = null));
					for (g in a)
						if (a.hasOwnProperty(g) && ((x = a[g]), x != null))
							switch (g) {
								case "value":
									s = x;
									break;
								case "defaultValue":
									c = x;
									break;
								case "children":
									d = x;
									break;
								case "dangerouslySetInnerHTML":
									if (x != null) throw Error(l(91));
									break;
								default:
									Ke(t, i, g, x, a, null);
							}
					Bh(t, s, c, d);
					return;
				case "option":
					for (M in a)
						if (a.hasOwnProperty(M) && ((s = a[M]), s != null))
							switch (M) {
								case "selected":
									t.selected = s && typeof s != "function" && typeof s != "symbol";
									break;
								default:
									Ke(t, i, M, s, a, null);
							}
					return;
				case "dialog":
					(Oe("beforetoggle", t), Oe("toggle", t), Oe("cancel", t), Oe("close", t));
					break;
				case "iframe":
				case "object":
					Oe("load", t);
					break;
				case "video":
				case "audio":
					for (s = 0; s < zu.length; s++) Oe(zu[s], t);
					break;
				case "image":
					(Oe("error", t), Oe("load", t));
					break;
				case "details":
					Oe("toggle", t);
					break;
				case "embed":
				case "source":
				case "link":
					(Oe("error", t), Oe("load", t));
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
					for (P in a)
						if (a.hasOwnProperty(P) && ((s = a[P]), s != null))
							switch (P) {
								case "children":
								case "dangerouslySetInnerHTML":
									throw Error(l(137, i));
								default:
									Ke(t, i, P, s, a, null);
							}
					return;
				default:
					if (Bo(i)) {
						for (J in a) a.hasOwnProperty(J) && ((s = a[J]), s !== void 0 && Af(t, i, J, s, a, void 0));
						return;
					}
			}
			for (x in a) a.hasOwnProperty(x) && ((s = a[x]), s != null && Ke(t, i, x, s, a, null));
		}
		function v_(t, i, a, s) {
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
						g = null,
						x = null,
						M = null,
						P = null,
						J = null;
					for (K in a) {
						var ee = a[K];
						if (a.hasOwnProperty(K) && ee != null)
							switch (K) {
								case "checked":
									break;
								case "value":
									break;
								case "defaultValue":
									M = ee;
								default:
									s.hasOwnProperty(K) || Ke(t, i, K, null, s, ee);
							}
					}
					for (var Y in s) {
						var K = s[Y];
						if (((ee = a[Y]), s.hasOwnProperty(Y) && (K != null || ee != null)))
							switch (Y) {
								case "type":
									d = K;
									break;
								case "name":
									c = K;
									break;
								case "checked":
									P = K;
									break;
								case "defaultChecked":
									J = K;
									break;
								case "value":
									g = K;
									break;
								case "defaultValue":
									x = K;
									break;
								case "children":
								case "dangerouslySetInnerHTML":
									if (K != null) throw Error(l(137, i));
									break;
								default:
									K !== ee && Ke(t, i, Y, K, s, ee);
							}
					}
					Lo(t, g, x, M, P, J, d, c);
					return;
				case "select":
					K = g = x = Y = null;
					for (d in a)
						if (((M = a[d]), a.hasOwnProperty(d) && M != null))
							switch (d) {
								case "value":
									break;
								case "multiple":
									K = M;
								default:
									s.hasOwnProperty(d) || Ke(t, i, d, null, s, M);
							}
					for (c in s)
						if (((d = s[c]), (M = a[c]), s.hasOwnProperty(c) && (d != null || M != null)))
							switch (c) {
								case "value":
									Y = d;
									break;
								case "defaultValue":
									x = d;
									break;
								case "multiple":
									g = d;
								default:
									d !== M && Ke(t, i, c, d, s, M);
							}
					((i = x),
						(a = g),
						(s = K),
						Y != null
							? Gr(t, !!a, Y, !1)
							: !!s != !!a && (i != null ? Gr(t, !!a, i, !0) : Gr(t, !!a, a ? [] : "", !1)));
					return;
				case "textarea":
					K = Y = null;
					for (x in a)
						if (((c = a[x]), a.hasOwnProperty(x) && c != null && !s.hasOwnProperty(x)))
							switch (x) {
								case "value":
									break;
								case "children":
									break;
								default:
									Ke(t, i, x, null, s, c);
							}
					for (g in s)
						if (((c = s[g]), (d = a[g]), s.hasOwnProperty(g) && (c != null || d != null)))
							switch (g) {
								case "value":
									Y = c;
									break;
								case "defaultValue":
									K = c;
									break;
								case "children":
									break;
								case "dangerouslySetInnerHTML":
									if (c != null) throw Error(l(91));
									break;
								default:
									c !== d && Ke(t, i, g, c, s, d);
							}
					$h(t, Y, K);
					return;
				case "option":
					for (var ce in a)
						if (((Y = a[ce]), a.hasOwnProperty(ce) && Y != null && !s.hasOwnProperty(ce)))
							switch (ce) {
								case "selected":
									t.selected = !1;
									break;
								default:
									Ke(t, i, ce, null, s, Y);
							}
					for (M in s)
						if (((Y = s[M]), (K = a[M]), s.hasOwnProperty(M) && Y !== K && (Y != null || K != null)))
							switch (M) {
								case "selected":
									t.selected = Y && typeof Y != "function" && typeof Y != "symbol";
									break;
								default:
									Ke(t, i, M, Y, s, K);
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
					for (var be in a)
						((Y = a[be]), a.hasOwnProperty(be) && Y != null && !s.hasOwnProperty(be) && Ke(t, i, be, null, s, Y));
					for (P in s)
						if (((Y = s[P]), (K = a[P]), s.hasOwnProperty(P) && Y !== K && (Y != null || K != null)))
							switch (P) {
								case "children":
								case "dangerouslySetInnerHTML":
									if (Y != null) throw Error(l(137, i));
									break;
								default:
									Ke(t, i, P, Y, s, K);
							}
					return;
				default:
					if (Bo(i)) {
						for (var Ge in a)
							((Y = a[Ge]),
								a.hasOwnProperty(Ge) && Y !== void 0 && !s.hasOwnProperty(Ge) && Af(t, i, Ge, void 0, s, Y));
						for (J in s)
							((Y = s[J]),
								(K = a[J]),
								!s.hasOwnProperty(J) || Y === K || (Y === void 0 && K === void 0) || Af(t, i, J, Y, s, K));
						return;
					}
			}
			for (var V in a)
				((Y = a[V]), a.hasOwnProperty(V) && Y != null && !s.hasOwnProperty(V) && Ke(t, i, V, null, s, Y));
			for (ee in s)
				((Y = s[ee]),
					(K = a[ee]),
					!s.hasOwnProperty(ee) || Y === K || (Y == null && K == null) || Ke(t, i, ee, Y, s, K));
		}
		function Vg(t) {
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
		function g_() {
			if (typeof performance.getEntriesByType == "function") {
				for (var t = 0, i = 0, a = performance.getEntriesByType("resource"), s = 0; s < a.length; s++) {
					var c = a[s],
						d = c.transferSize,
						g = c.initiatorType,
						x = c.duration;
					if (d && x && Vg(g)) {
						for (g = 0, x = c.responseEnd, s += 1; s < a.length; s++) {
							var M = a[s],
								P = M.startTime;
							if (P > x) break;
							var J = M.transferSize,
								ee = M.initiatorType;
							J && Vg(ee) && ((M = M.responseEnd), (g += J * (M < x ? 1 : (x - P) / (M - P))));
						}
						if ((--s, (i += (8 * (d + g)) / (c.duration / 1e3)), t++, 10 < t)) break;
					}
				}
				if (0 < t) return i / t / 1e6;
			}
			return navigator.connection && ((t = navigator.connection.downlink), typeof t == "number") ? t : 5;
		}
		var Rf = null,
			Of = null;
		function xl(t) {
			return t.nodeType === 9 ? t : t.ownerDocument;
		}
		function Hg(t) {
			switch (t) {
				case "http://www.w3.org/2000/svg":
					return 1;
				case "http://www.w3.org/1998/Math/MathML":
					return 2;
				default:
					return 0;
			}
		}
		function Zg(t, i) {
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
		function Nf(t, i) {
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
		var Mf = null;
		function y_() {
			var t = window.event;
			return t && t.type === "popstate" ? (t === Mf ? !1 : ((Mf = t), !0)) : ((Mf = null), !1);
		}
		var Qg = typeof setTimeout == "function" ? setTimeout : void 0,
			b_ = typeof clearTimeout == "function" ? clearTimeout : void 0,
			Pg = typeof Promise == "function" ? Promise : void 0,
			p_ =
				typeof queueMicrotask == "function"
					? queueMicrotask
					: typeof Pg < "u"
						? function (t) {
								return Pg.resolve(null).then(t).catch(S_);
							}
						: Qg;
		function S_(t) {
			setTimeout(function () {
				throw t;
			});
		}
		function Fi(t) {
			return t === "head";
		}
		function Yg(t, i) {
			var a = i,
				s = 0;
			do {
				var c = a.nextSibling;
				if ((t.removeChild(a), c && c.nodeType === 8))
					if (((a = c.data), a === "/$" || a === "/&")) {
						if (s === 0) {
							(t.removeChild(c), Ra(i));
							return;
						}
						s--;
					} else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&") s++;
					else if (a === "html") Du(t.ownerDocument.documentElement);
					else if (a === "head") {
						((a = t.ownerDocument.head), Du(a));
						for (var d = a.firstChild; d; ) {
							var g = d.nextSibling,
								x = d.nodeName;
							(d[Ja] ||
								x === "SCRIPT" ||
								x === "STYLE" ||
								(x === "LINK" && d.rel.toLowerCase() === "stylesheet") ||
								a.removeChild(d),
								(d = g));
						}
					} else a === "body" && Du(t.ownerDocument.body);
				a = c;
			} while (a);
			Ra(i);
		}
		function Fg(t, i) {
			var a = t;
			t = 0;
			do {
				var s = a.nextSibling;
				if (
					(a.nodeType === 1
						? i
							? ((a._stashedDisplay = a.style.display), (a.style.display = "none"))
							: ((a.style.display = a._stashedDisplay || ""),
								a.getAttribute("style") === "" && a.removeAttribute("style"))
						: a.nodeType === 3 &&
							(i ? ((a._stashedText = a.nodeValue), (a.nodeValue = "")) : (a.nodeValue = a._stashedText || "")),
					s && s.nodeType === 8)
				)
					if (((a = s.data), a === "/$")) {
						if (t === 0) break;
						t--;
					} else (a !== "$" && a !== "$?" && a !== "$~" && a !== "$!") || t++;
				a = s;
			} while (a);
		}
		function zf(t) {
			var i = t.firstChild;
			for (i && i.nodeType === 10 && (i = i.nextSibling); i; ) {
				var a = i;
				switch (((i = i.nextSibling), a.nodeName)) {
					case "HTML":
					case "HEAD":
					case "BODY":
						(zf(a), Io(a));
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
		function w_(t, i, a, s) {
			for (; t.nodeType === 1; ) {
				var c = a;
				if (t.nodeName.toLowerCase() !== i.toLowerCase()) {
					if (!s && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
				} else if (s) {
					if (!t[Ja])
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
				if (((t = zn(t.nextSibling)), t === null)) break;
			}
			return null;
		}
		function __(t, i, a) {
			if (i === "") return null;
			for (; t.nodeType !== 3; )
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !a) ||
					((t = zn(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function Kg(t, i) {
			for (; t.nodeType !== 8; )
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i) ||
					((t = zn(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function kf(t) {
			return t.data === "$?" || t.data === "$~";
		}
		function Df(t) {
			return t.data === "$!" || (t.data === "$?" && t.ownerDocument.readyState !== "loading");
		}
		function x_(t, i) {
			var a = t.ownerDocument;
			if (t.data === "$~") t._reactRetry = i;
			else if (t.data !== "$?" || a.readyState !== "loading") i();
			else {
				var s = function () {
					(i(), a.removeEventListener("DOMContentLoaded", s));
				};
				(a.addEventListener("DOMContentLoaded", s), (t._reactRetry = s));
			}
		}
		function zn(t) {
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
		var jf = null;
		function Gg(t) {
			t = t.nextSibling;
			for (var i = 0; t; ) {
				if (t.nodeType === 8) {
					var a = t.data;
					if (a === "/$" || a === "/&") {
						if (i === 0) return zn(t.nextSibling);
						i--;
					} else (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") || i++;
				}
				t = t.nextSibling;
			}
			return null;
		}
		function Xg(t) {
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
		function Jg(t, i, a) {
			switch (((i = xl(a)), t)) {
				case "html":
					if (((t = i.documentElement), !t)) throw Error(l(452));
					return t;
				case "head":
					if (((t = i.head), !t)) throw Error(l(453));
					return t;
				case "body":
					if (((t = i.body), !t)) throw Error(l(454));
					return t;
				default:
					throw Error(l(451));
			}
		}
		function Du(t) {
			for (var i = t.attributes; i.length; ) t.removeAttributeNode(i[0]);
			Io(t);
		}
		var kn = new Map(),
			Wg = new Set();
		function El(t) {
			return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
		}
		var bi = B.d;
		B.d = { f: E_, r: C_, D: T_, C: A_, L: R_, m: O_, X: M_, S: N_, M: z_ };
		function E_() {
			var t = bi.f(),
				i = vl();
			return t || i;
		}
		function C_(t) {
			var i = Yr(t);
			i !== null && i.tag === 5 && i.type === "form" ? bv(i) : bi.r(t);
		}
		var Ca = typeof document > "u" ? null : document;
		function ey(t, i, a) {
			var s = Ca;
			if (s && typeof i == "string" && i) {
				var c = En(i);
				((c = 'link[rel="' + t + '"][href="' + c + '"]'),
					typeof a == "string" && (c += '[crossorigin="' + a + '"]'),
					Wg.has(c) ||
						(Wg.add(c),
						(t = { rel: t, crossOrigin: a, href: i }),
						s.querySelector(c) === null &&
							((i = s.createElement("link")), Zt(i, "link", t), jt(i), s.head.appendChild(i))));
			}
		}
		function T_(t) {
			(bi.D(t), ey("dns-prefetch", t, null));
		}
		function A_(t, i) {
			(bi.C(t, i), ey("preconnect", t, i));
		}
		function R_(t, i, a) {
			bi.L(t, i, a);
			var s = Ca;
			if (s && t && i) {
				var c = 'link[rel="preload"][as="' + En(i) + '"]';
				i === "image" && a && a.imageSrcSet
					? ((c += '[imagesrcset="' + En(a.imageSrcSet) + '"]'),
						typeof a.imageSizes == "string" && (c += '[imagesizes="' + En(a.imageSizes) + '"]'))
					: (c += '[href="' + En(t) + '"]');
				var d = c;
				switch (i) {
					case "style":
						d = Ta(t);
						break;
					case "script":
						d = Aa(t);
				}
				kn.has(d) ||
					((t = b({ rel: "preload", href: i === "image" && a && a.imageSrcSet ? void 0 : t, as: i }, a)),
					kn.set(d, t),
					s.querySelector(c) !== null ||
						(i === "style" && s.querySelector(ju(d))) ||
						(i === "script" && s.querySelector(qu(d))) ||
						((i = s.createElement("link")), Zt(i, "link", t), jt(i), s.head.appendChild(i)));
			}
		}
		function O_(t, i) {
			bi.m(t, i);
			var a = Ca;
			if (a && t) {
				var s = i && typeof i.as == "string" ? i.as : "script",
					c = 'link[rel="modulepreload"][as="' + En(s) + '"][href="' + En(t) + '"]',
					d = c;
				switch (s) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script":
						d = Aa(t);
				}
				if (!kn.has(d) && ((t = b({ rel: "modulepreload", href: t }, i)), kn.set(d, t), a.querySelector(c) === null)) {
					switch (s) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script":
							if (a.querySelector(qu(d))) return;
					}
					((s = a.createElement("link")), Zt(s, "link", t), jt(s), a.head.appendChild(s));
				}
			}
		}
		function N_(t, i, a) {
			bi.S(t, i, a);
			var s = Ca;
			if (s && t) {
				var c = Fr(s).hoistableStyles,
					d = Ta(t);
				i = i || "default";
				var g = c.get(d);
				if (!g) {
					var x = { loading: 0, preload: null };
					if ((g = s.querySelector(ju(d)))) x.loading = 5;
					else {
						((t = b({ rel: "stylesheet", href: t, "data-precedence": i }, a)), (a = kn.get(d)) && qf(t, a));
						var M = (g = s.createElement("link"));
						(jt(M),
							Zt(M, "link", t),
							(M._p = new Promise(function (P, J) {
								((M.onload = P), (M.onerror = J));
							})),
							M.addEventListener("load", function () {
								x.loading |= 1;
							}),
							M.addEventListener("error", function () {
								x.loading |= 2;
							}),
							(x.loading |= 4),
							Cl(g, i, s));
					}
					((g = { type: "stylesheet", instance: g, count: 1, state: x }), c.set(d, g));
				}
			}
		}
		function M_(t, i) {
			bi.X(t, i);
			var a = Ca;
			if (a && t) {
				var s = Fr(a).hoistableScripts,
					c = Aa(t),
					d = s.get(c);
				d ||
					((d = a.querySelector(qu(c))),
					d ||
						((t = b({ src: t, async: !0 }, i)),
						(i = kn.get(c)) && If(t, i),
						(d = a.createElement("script")),
						jt(d),
						Zt(d, "link", t),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					s.set(c, d));
			}
		}
		function z_(t, i) {
			bi.M(t, i);
			var a = Ca;
			if (a && t) {
				var s = Fr(a).hoistableScripts,
					c = Aa(t),
					d = s.get(c);
				d ||
					((d = a.querySelector(qu(c))),
					d ||
						((t = b({ src: t, async: !0, type: "module" }, i)),
						(i = kn.get(c)) && If(t, i),
						(d = a.createElement("script")),
						jt(d),
						Zt(d, "link", t),
						a.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					s.set(c, d));
			}
		}
		function ty(t, i, a, s) {
			var c = (c = ye.current) ? El(c) : null;
			if (!c) throw Error(l(446));
			switch (t) {
				case "meta":
				case "title":
					return null;
				case "style":
					return typeof a.precedence == "string" && typeof a.href == "string"
						? ((i = Ta(a.href)),
							(a = Fr(c).hoistableStyles),
							(s = a.get(i)),
							s || ((s = { type: "style", instance: null, count: 0, state: null }), a.set(i, s)),
							s)
						: { type: "void", instance: null, count: 0, state: null };
				case "link":
					if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
						t = Ta(a.href);
						var d = Fr(c).hoistableStyles,
							g = d.get(t);
						if (
							(g ||
								((c = c.ownerDocument || c),
								(g = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }),
								d.set(t, g),
								(d = c.querySelector(ju(t))) && !d._p && ((g.instance = d), (g.state.loading = 5)),
								kn.has(t) ||
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
									kn.set(t, a),
									d || k_(c, t, a, g.state))),
							i && s === null)
						)
							throw Error(l(528, ""));
						return g;
					}
					if (i && s !== null) throw Error(l(529, ""));
					return null;
				case "script":
					return (
						(i = a.async),
						(a = a.src),
						typeof a == "string" && i && typeof i != "function" && typeof i != "symbol"
							? ((i = Aa(a)),
								(a = Fr(c).hoistableScripts),
								(s = a.get(i)),
								s || ((s = { type: "script", instance: null, count: 0, state: null }), a.set(i, s)),
								s)
							: { type: "void", instance: null, count: 0, state: null }
					);
				default:
					throw Error(l(444, t));
			}
		}
		function Ta(t) {
			return 'href="' + En(t) + '"';
		}
		function ju(t) {
			return 'link[rel="stylesheet"][' + t + "]";
		}
		function ny(t) {
			return b({}, t, { "data-precedence": t.precedence, precedence: null });
		}
		function k_(t, i, a, s) {
			t.querySelector('link[rel="preload"][as="style"][' + i + "]")
				? (s.loading = 1)
				: ((i = t.createElement("link")),
					(s.preload = i),
					i.addEventListener("load", function () {
						return (s.loading |= 1);
					}),
					i.addEventListener("error", function () {
						return (s.loading |= 2);
					}),
					Zt(i, "link", a),
					jt(i),
					t.head.appendChild(i));
		}
		function Aa(t) {
			return '[src="' + En(t) + '"]';
		}
		function qu(t) {
			return "script[async]" + t;
		}
		function iy(t, i, a) {
			if ((i.count++, i.instance === null))
				switch (i.type) {
					case "style":
						var s = t.querySelector('style[data-href~="' + En(a.href) + '"]');
						if (s) return ((i.instance = s), jt(s), s);
						var c = b({}, a, { "data-href": a.href, "data-precedence": a.precedence, href: null, precedence: null });
						return (
							(s = (t.ownerDocument || t).createElement("style")),
							jt(s),
							Zt(s, "style", c),
							Cl(s, a.precedence, t),
							(i.instance = s)
						);
					case "stylesheet":
						c = Ta(a.href);
						var d = t.querySelector(ju(c));
						if (d) return ((i.state.loading |= 4), (i.instance = d), jt(d), d);
						((s = ny(a)), (c = kn.get(c)) && qf(s, c), (d = (t.ownerDocument || t).createElement("link")), jt(d));
						var g = d;
						return (
							(g._p = new Promise(function (x, M) {
								((g.onload = x), (g.onerror = M));
							})),
							Zt(d, "link", s),
							(i.state.loading |= 4),
							Cl(d, a.precedence, t),
							(i.instance = d)
						);
					case "script":
						return (
							(d = Aa(a.src)),
							(c = t.querySelector(qu(d)))
								? ((i.instance = c), jt(c), c)
								: ((s = a),
									(c = kn.get(d)) && ((s = b({}, a)), If(s, c)),
									(t = t.ownerDocument || t),
									(c = t.createElement("script")),
									jt(c),
									Zt(c, "link", s),
									t.head.appendChild(c),
									(i.instance = c))
						);
					case "void":
						return null;
					default:
						throw Error(l(443, i.type));
				}
			else
				i.type === "stylesheet" &&
					(i.state.loading & 4) === 0 &&
					((s = i.instance), (i.state.loading |= 4), Cl(s, a.precedence, t));
			return i.instance;
		}
		function Cl(t, i, a) {
			for (
				var s = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
					c = s.length ? s[s.length - 1] : null,
					d = c,
					g = 0;
				g < s.length;
				g++
			) {
				var x = s[g];
				if (x.dataset.precedence === i) d = x;
				else if (d !== c) break;
			}
			d
				? d.parentNode.insertBefore(t, d.nextSibling)
				: ((i = a.nodeType === 9 ? a.head : a), i.insertBefore(t, i.firstChild));
		}
		function qf(t, i) {
			((t.crossOrigin ??= i.crossOrigin), (t.referrerPolicy ??= i.referrerPolicy), (t.title ??= i.title));
		}
		function If(t, i) {
			((t.crossOrigin ??= i.crossOrigin), (t.referrerPolicy ??= i.referrerPolicy), (t.integrity ??= i.integrity));
		}
		var Tl = null;
		function ry(t, i, a) {
			if (Tl === null) {
				var s = new Map(),
					c = (Tl = new Map());
				c.set(a, s);
			} else ((c = Tl), (s = c.get(a)), s || ((s = new Map()), c.set(a, s)));
			if (s.has(t)) return s;
			for (s.set(t, null), a = a.getElementsByTagName(t), c = 0; c < a.length; c++) {
				var d = a[c];
				if (
					!(d[Ja] || d[$t] || (t === "link" && d.getAttribute("rel") === "stylesheet")) &&
					d.namespaceURI !== "http://www.w3.org/2000/svg"
				) {
					var g = d.getAttribute(i) || "";
					g = t + g;
					var x = s.get(g);
					x ? x.push(d) : s.set(g, [d]);
				}
			}
			return s;
		}
		function ay(t, i, a) {
			((t = t.ownerDocument || t), t.head.insertBefore(a, i === "title" ? t.querySelector("head > title") : null));
		}
		function D_(t, i, a) {
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
		function uy(t) {
			return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
		}
		function j_(t, i, a, s) {
			if (
				a.type === "stylesheet" &&
				(typeof s.media != "string" || matchMedia(s.media).matches !== !1) &&
				(a.state.loading & 4) === 0
			) {
				if (a.instance === null) {
					var c = Ta(s.href),
						d = i.querySelector(ju(c));
					if (d) {
						((i = d._p),
							i !== null &&
								typeof i == "object" &&
								typeof i.then == "function" &&
								(t.count++, (t = Al.bind(t)), i.then(t, t)),
							(a.state.loading |= 4),
							(a.instance = d),
							jt(d));
						return;
					}
					((d = i.ownerDocument || i), (s = ny(s)), (c = kn.get(c)) && qf(s, c), (d = d.createElement("link")), jt(d));
					var g = d;
					((g._p = new Promise(function (x, M) {
						((g.onload = x), (g.onerror = M));
					})),
						Zt(d, "link", s),
						(a.instance = d));
				}
				(t.stylesheets === null && (t.stylesheets = new Map()),
					t.stylesheets.set(a, i),
					(i = a.state.preload) &&
						(a.state.loading & 3) === 0 &&
						(t.count++, (a = Al.bind(t)), i.addEventListener("load", a), i.addEventListener("error", a)));
			}
		}
		var Uf = 0;
		function q_(t, i) {
			return (
				t.stylesheets && t.count === 0 && Ol(t, t.stylesheets),
				0 < t.count || 0 < t.imgCount
					? function (a) {
							var s = setTimeout(function () {
								if ((t.stylesheets && Ol(t, t.stylesheets), t.unsuspend)) {
									var d = t.unsuspend;
									((t.unsuspend = null), d());
								}
							}, 6e4 + i);
							0 < t.imgBytes && Uf === 0 && (Uf = 62500 * g_());
							var c = setTimeout(
								function () {
									if (
										((t.waitingForImages = !1), t.count === 0 && (t.stylesheets && Ol(t, t.stylesheets), t.unsuspend))
									) {
										var d = t.unsuspend;
										((t.unsuspend = null), d());
									}
								},
								(t.imgBytes > Uf ? 50 : 800) + i,
							);
							return (
								(t.unsuspend = a),
								function () {
									((t.unsuspend = null), clearTimeout(s), clearTimeout(c));
								}
							);
						}
					: null
			);
		}
		function Al() {
			if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
				if (this.stylesheets) Ol(this, this.stylesheets);
				else if (this.unsuspend) {
					var t = this.unsuspend;
					((this.unsuspend = null), t());
				}
			}
		}
		var Rl = null;
		function Ol(t, i) {
			((t.stylesheets = null),
				t.unsuspend !== null && (t.count++, (Rl = new Map()), i.forEach(I_, t), (Rl = null), Al.call(t)));
		}
		function I_(t, i) {
			if (!(i.state.loading & 4)) {
				var a = Rl.get(t);
				if (a) var s = a.get(null);
				else {
					((a = new Map()), Rl.set(t, a));
					for (var c = t.querySelectorAll("link[data-precedence],style[data-precedence]"), d = 0; d < c.length; d++) {
						var g = c[d];
						(g.nodeName === "LINK" || g.getAttribute("media") !== "not all") &&
							(a.set(g.dataset.precedence, g), (s = g));
					}
					s && a.set(null, s);
				}
				((c = i.instance),
					(g = c.getAttribute("data-precedence")),
					(d = a.get(g) || s),
					d === s && a.set(null, c),
					a.set(g, c),
					this.count++,
					(s = Al.bind(this)),
					c.addEventListener("load", s),
					c.addEventListener("error", s),
					d
						? d.parentNode.insertBefore(c, d.nextSibling)
						: ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(c, t.firstChild)),
					(i.state.loading |= 4));
			}
		}
		var Iu = { $$typeof: R, Provider: null, Consumer: null, _currentValue: ue, _currentValue2: ue, _threadCount: 0 };
		function U_(t, i, a, s, c, d, g, x, M) {
			((this.tag = 1),
				(this.containerInfo = t),
				(this.pingCache = this.current = this.pendingChildren = null),
				(this.timeoutHandle = -1),
				(this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null),
				(this.callbackPriority = 0),
				(this.expirationTimes = Do(-1)),
				(this.entangledLanes =
					this.shellSuspendCounter =
					this.errorRecoveryDisabledLanes =
					this.expiredLanes =
					this.warmLanes =
					this.pingedLanes =
					this.suspendedLanes =
					this.pendingLanes =
						0),
				(this.entanglements = Do(0)),
				(this.hiddenUpdates = Do(null)),
				(this.identifierPrefix = s),
				(this.onUncaughtError = c),
				(this.onCaughtError = d),
				(this.onRecoverableError = g),
				(this.pooledCache = null),
				(this.pooledCacheLanes = 0),
				(this.formState = M),
				(this.incompleteTransitions = new Map()));
		}
		function L_(t, i, a, s, c, d, g, x, M, P, J, ee) {
			return (
				(t = new U_(t, i, a, g, M, P, J, ee, x)),
				(i = 1),
				d === !0 && (i |= 24),
				(d = yn(3, null, null, i)),
				(t.current = d),
				(d.stateNode = t),
				(i = yc()),
				i.refCount++,
				(t.pooledCache = i),
				i.refCount++,
				(d.memoizedState = { element: s, isDehydrated: a, cache: i }),
				wc(d),
				t
			);
		}
		function $_(t) {
			return t ? ((t = ra), t) : ra;
		}
		function sy(t, i, a, s, c, d) {
			((c = $_(c)),
				s.context === null ? (s.context = c) : (s.pendingContext = c),
				(s = Cr(i)),
				(s.payload = { element: a }),
				(d = d === void 0 ? null : d),
				d !== null && (s.callback = d),
				(a = Tr(t, s, i)),
				a !== null && (on(a, t, i), vu(a, t, i)));
		}
		function ly(t, i) {
			if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
				var a = t.retryLane;
				t.retryLane = a !== 0 && a < i ? a : i;
			}
		}
		function Lf(t, i) {
			(ly(t, i), (t = t.alternate) && ly(t, i));
		}
		function oy(t) {
			if (t.tag === 13 || t.tag === 31) {
				var i = gr(t, 67108864);
				(i !== null && on(i, t, 67108864), Lf(t, 67108864));
			}
		}
		function cy(t) {
			if (t.tag === 13 || t.tag === 31) {
				var i = Mn();
				i = Oh(i);
				var a = gr(t, i);
				(a !== null && on(a, t, i), Lf(t, i));
			}
		}
		var Nl = !0;
		function B_(t, i, a, s) {
			var c = H.T;
			H.T = null;
			var d = B.p;
			try {
				((B.p = 2), $f(t, i, a, s));
			} finally {
				((B.p = d), (H.T = c));
			}
		}
		function V_(t, i, a, s) {
			var c = H.T;
			H.T = null;
			var d = B.p;
			try {
				((B.p = 8), $f(t, i, a, s));
			} finally {
				((B.p = d), (H.T = c));
			}
		}
		function $f(t, i, a, s) {
			if (Nl) {
				var c = Bf(s);
				if (c === null) (Tf(t, i, s, Ml, a), dy(t, s));
				else if (Z_(c, t, i, a, s)) s.stopPropagation();
				else if ((dy(t, s), i & 4 && -1 < H_.indexOf(t))) {
					for (; c !== null; ) {
						var d = Yr(c);
						if (d !== null)
							switch (d.tag) {
								case 3:
									if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
										var g = fr(d.pendingLanes);
										if (g !== 0) {
											var x = d;
											for (x.pendingLanes |= 2, x.entangledLanes |= 2; g; ) {
												var M = 1 << (31 - vn(g));
												((x.entanglements[1] |= M), (g &= ~M));
											}
											(yi(d), (Ve & 6) === 0 && ((hl = je() + 500), Mu(0, !1)));
										}
									}
									break;
								case 31:
								case 13:
									((x = gr(d, 2)), x !== null && on(x, d, 2), vl(), Lf(d, 2));
							}
						if (((d = Bf(s)), d === null && Tf(t, i, s, Ml, a), d === c)) break;
						c = d;
					}
					c !== null && s.stopPropagation();
				} else Tf(t, i, s, null, a);
			}
		}
		function Bf(t) {
			return ((t = Ho(t)), Vf(t));
		}
		var Ml = null;
		function Vf(t) {
			if (((Ml = null), (t = Pr(t)), t !== null)) {
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
			return ((Ml = t), null);
		}
		function fy(t) {
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
					switch (It()) {
						case Ut:
							return 2;
						case We:
							return 8;
						case tn:
						case Qr:
							return 32;
						case oe:
							return 268435456;
						default:
							return 32;
					}
				default:
					return 32;
			}
		}
		var Hf = !1,
			Ki = null,
			Gi = null,
			Xi = null,
			Uu = new Map(),
			Lu = new Map(),
			Ji = [],
			H_ =
				"mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
					" ",
				);
		function dy(t, i) {
			switch (t) {
				case "focusin":
				case "focusout":
					Ki = null;
					break;
				case "dragenter":
				case "dragleave":
					Gi = null;
					break;
				case "mouseover":
				case "mouseout":
					Xi = null;
					break;
				case "pointerover":
				case "pointerout":
					Uu.delete(i.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture":
					Lu.delete(i.pointerId);
			}
		}
		function $u(t, i, a, s, c, d) {
			return t === null || t.nativeEvent !== d
				? ((t = { blockedOn: i, domEventName: a, eventSystemFlags: s, nativeEvent: d, targetContainers: [c] }),
					i !== null && ((i = Yr(i)), i !== null && oy(i)),
					t)
				: ((t.eventSystemFlags |= s), (i = t.targetContainers), c !== null && i.indexOf(c) === -1 && i.push(c), t);
		}
		function Z_(t, i, a, s, c) {
			switch (i) {
				case "focusin":
					return ((Ki = $u(Ki, t, i, a, s, c)), !0);
				case "dragenter":
					return ((Gi = $u(Gi, t, i, a, s, c)), !0);
				case "mouseover":
					return ((Xi = $u(Xi, t, i, a, s, c)), !0);
				case "pointerover":
					var d = c.pointerId;
					return (Uu.set(d, $u(Uu.get(d) || null, t, i, a, s, c)), !0);
				case "gotpointercapture":
					return ((d = c.pointerId), Lu.set(d, $u(Lu.get(d) || null, t, i, a, s, c)), !0);
			}
			return !1;
		}
		function hy(t) {
			var i = Pr(t.target);
			if (i !== null) {
				var a = f(i);
				if (a !== null) {
					if (((i = a.tag), i === 13)) {
						if (((i = h(a)), i !== null)) {
							((t.blockedOn = i),
								Mh(t.priority, function () {
									cy(a);
								}));
							return;
						}
					} else if (i === 31) {
						if (((i = m(a)), i !== null)) {
							((t.blockedOn = i),
								Mh(t.priority, function () {
									cy(a);
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
		function zl(t) {
			if (t.blockedOn !== null) return !1;
			for (var i = t.targetContainers; 0 < i.length; ) {
				var a = Bf(t.nativeEvent);
				if (a === null) {
					a = t.nativeEvent;
					var s = new a.constructor(a.type, a);
					((Vo = s), a.target.dispatchEvent(s), (Vo = null));
				} else return ((i = Yr(a)), i !== null && oy(i), (t.blockedOn = a), !1);
				i.shift();
			}
			return !0;
		}
		function my(t, i, a) {
			zl(t) && a.delete(i);
		}
		function Q_() {
			((Hf = !1),
				Ki !== null && zl(Ki) && (Ki = null),
				Gi !== null && zl(Gi) && (Gi = null),
				Xi !== null && zl(Xi) && (Xi = null),
				Uu.forEach(my),
				Lu.forEach(my));
		}
		function kl(t, i) {
			t.blockedOn === i &&
				((t.blockedOn = null), Hf || ((Hf = !0), n.unstable_scheduleCallback(n.unstable_NormalPriority, Q_)));
		}
		var Dl = null;
		function vy(t) {
			Dl !== t &&
				((Dl = t),
				n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
					Dl === t && (Dl = null);
					for (var i = 0; i < t.length; i += 3) {
						var a = t[i],
							s = t[i + 1],
							c = t[i + 2];
						if (typeof s != "function") {
							if (Vf(s || a) === null) continue;
							break;
						}
						var d = Yr(a);
						d !== null &&
							(t.splice(i, 3), (i -= 3), Bc(d, { pending: !0, data: c, method: a.method, action: s }, s, c));
					}
				}));
		}
		function Ra(t) {
			function i(M) {
				return kl(M, t);
			}
			(Ki !== null && kl(Ki, t), Gi !== null && kl(Gi, t), Xi !== null && kl(Xi, t), Uu.forEach(i), Lu.forEach(i));
			for (var a = 0; a < Ji.length; a++) {
				var s = Ji[a];
				s.blockedOn === t && (s.blockedOn = null);
			}
			for (; 0 < Ji.length && ((a = Ji[0]), a.blockedOn === null); ) (hy(a), a.blockedOn === null && Ji.shift());
			if (((a = (t.ownerDocument || t).$$reactFormReplay), a != null))
				for (s = 0; s < a.length; s += 3) {
					var c = a[s],
						d = a[s + 1],
						g = c[nn] || null;
					if (typeof d == "function") g || vy(a);
					else if (g) {
						var x = null;
						if (d && d.hasAttribute("formAction")) {
							if (((c = d), (g = d[nn] || null))) x = g.formAction;
							else if (Vf(c) !== null) continue;
						} else x = g.action;
						(typeof x == "function" ? (a[s + 1] = x) : (a.splice(s, 3), (s -= 3)), vy(a));
					}
				}
		}
		function P_() {
			function t(d) {
				d.canIntercept &&
					d.info === "react-transition" &&
					d.intercept({
						handler: function () {
							return new Promise(function (g) {
								return (c = g);
							});
						},
						focusReset: "manual",
						scroll: "manual",
					});
			}
			function i() {
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
					navigation.addEventListener("navigate", t),
					navigation.addEventListener("navigatesuccess", i),
					navigation.addEventListener("navigateerror", i),
					setTimeout(a, 100),
					function () {
						((s = !0),
							navigation.removeEventListener("navigate", t),
							navigation.removeEventListener("navigatesuccess", i),
							navigation.removeEventListener("navigateerror", i),
							c !== null && (c(), (c = null)));
					}
				);
			}
		}
		function Zf(t) {
			this._internalRoot = t;
		}
		((Qf.prototype.render = Zf.prototype.render =
			function (t) {
				var i = this._internalRoot;
				if (i === null) throw Error(l(409));
				var a = i.current;
				sy(a, Mn(), t, i, null, null);
			}),
			(Qf.prototype.unmount = Zf.prototype.unmount =
				function () {
					var t = this._internalRoot;
					if (t !== null) {
						this._internalRoot = null;
						var i = t.containerInfo;
						(sy(t.current, 2, null, t, null, null), vl(), (i[Xa] = null));
					}
				}));
		function Qf(t) {
			this._internalRoot = t;
		}
		Qf.prototype.unstable_scheduleHydration = function (t) {
			if (t) {
				var i = Nh();
				t = { blockedOn: null, target: t, priority: i };
				for (var a = 0; a < Ji.length && i !== 0 && i < Ji[a].priority; a++);
				(Ji.splice(a, 0, t), a === 0 && hy(t));
			}
		};
		var gy = r.version;
		if (gy !== "19.2.8") throw Error(l(527, gy, "19.2.8"));
		B.findDOMNode = function (t) {
			var i = t._reactInternals;
			if (i === void 0)
				throw typeof t.render == "function" ? Error(l(188)) : ((t = Object.keys(t).join(",")), Error(l(268, t)));
			return ((t = y(i)), (t = t !== null ? _(t) : null), (t = t === null ? null : t.stateNode), t);
		};
		var Y_ = {
			bundleType: 0,
			version: "19.2.8",
			rendererPackageName: "react-dom",
			currentDispatcherRef: H,
			reconcilerVersion: "19.2.8",
		};
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
			var jl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (!jl.isDisabled && jl.supportsFiber)
				try {
					((Gt = jl.inject(Y_)), (Lt = jl));
				} catch {}
		}
		e.createRoot = function (t, i) {
			if (!o(t)) throw Error(l(299));
			var a = !1,
				s = "",
				c = Vw,
				d = Hw,
				g = Zw;
			return (
				i != null &&
					(i.unstable_strictMode === !0 && (a = !0),
					i.identifierPrefix !== void 0 && (s = i.identifierPrefix),
					i.onUncaughtError !== void 0 && (c = i.onUncaughtError),
					i.onCaughtError !== void 0 && (d = i.onCaughtError),
					i.onRecoverableError !== void 0 && (g = i.onRecoverableError)),
				(i = L_(t, 1, !1, null, null, a, s, null, c, d, g, P_)),
				(t[Xa] = i.current),
				Ig(t),
				new Zf(i)
			);
		};
	}),
	rE = jn((e, n) => {
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
		(r(), (n.exports = iE()));
	}),
	aE = rE(),
	Se = wb,
	yk = Zx(),
	uE = ["thumbs_up", "heart", "laugh", "wow", "sad", "party", "rocket", "eyes"],
	Nb = { thumbs_up: "👍", heart: "❤️", laugh: "😂", wow: "😮", sad: "😢", party: "🎉", rocket: "🚀", eyes: "👀" },
	Mb = {
		thumbs_up: "Thumbs up",
		heart: "Heart",
		laugh: "Laugh",
		wow: "Wow",
		sad: "Sad",
		party: "Party",
		rocket: "Rocket",
		eyes: "Eyes",
	},
	Id =
		"Only the people added here and the organization owner can read this channel. Its copies in Files have separate sharing settings. File managers can share those copies, including later updates, with other people.",
	sE = "Someone with no name yet";
function zb(e) {
	return e !== null && e !== "" ? e : sE;
}
function lE(e, n) {
	const r = /(?:^|\s)@([^\s@]*)$/.exec(e.slice(0, n));
	if (r === null) return null;
	const u = r[1] ?? "";
	return { start: n - u.length - 1, query: u };
}
function oE(e, n, r) {
	const u = n.toLowerCase();
	return e
		.filter((l) => l.userId !== r)
		.map((l) => ({ ...l, label: zb(l.displayName) }))
		.filter((l) => l.label.toLowerCase().includes(u))
		.sort((l, o) => l.label.localeCompare(o.label));
}
function cE(e, n, r, u) {
	return { text: `${e.slice(0, n)}@${u} ${e.slice(r)}`, caret: n + u.length + 2 };
}
function fE(e, n) {
	const r = [];
	for (const [u, l] of e) n.includes(`@${l}`) && r.push(u);
	return r;
}
function uo(e, n) {
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
function so(e) {
	return e instanceof Error ? e.message : String(e);
}
var dE = jn((e) => {
		var n = Symbol.for("react.transitional.element"),
			r = Symbol.for("react.fragment");
		function u(l, o, f) {
			var h = null;
			if ((f !== void 0 && (h = "" + f), o.key !== void 0 && (h = "" + o.key), "key" in o)) {
				f = {};
				for (var m in o) m !== "key" && (f[m] = o[m]);
			} else f = o;
			return ((o = f.ref), { $$typeof: n, type: l, key: h, ref: o !== void 0 ? o : null, props: f });
		}
		((e.Fragment = r), (e.jsx = u), (e.jsxs = u));
	}),
	hE = jn((e, n) => {
		n.exports = dE();
	}),
	p = hE();
function xi(e) {
	const [n, r] = (0, w.useState)({ key: e, cursor: null, previous: [], number: 1 });
	return (
		n.key !== e && r({ key: e, cursor: null, previous: [], number: 1 }),
		{
			cursor: n.key === e ? n.cursor : null,
			number: n.number,
			canGoBack: n.previous.length > 0,
			next: (u) =>
				r((l) => ({ key: e, cursor: u, previous: [...l.previous, l.cursor].slice(-20), number: l.number + 1 })),
			back: () =>
				r((u) =>
					u.previous.length === 0
						? u
						: {
								...u,
								cursor: u.previous[u.previous.length - 1],
								previous: u.previous.slice(0, -1),
								number: u.number - 1,
							},
				),
			first: () => r({ key: e, cursor: null, previous: [], number: 1 }),
		}
	);
}
function nr(e) {
	return e.page.number === 1 && e.result?.isDone
		? null
		: (0, p.jsxs)("div", {
				className: "page-controls",
				"aria-label": `${e.label} pages`,
				children: [
					e.page.number > 1
						? (0, p.jsx)("button", { type: "button", className: "button", onClick: e.page.first, children: "First" })
						: null,
					(0, p.jsx)("button", {
						type: "button",
						className: "button",
						disabled: !e.page.canGoBack,
						onClick: e.page.back,
						children: "Previous",
					}),
					(0, p.jsxs)("span", { children: ["Page ", e.page.number] }),
					(0, p.jsx)("button", {
						type: "button",
						className: "button",
						disabled: !e.result || e.result.isDone,
						onClick: () => {
							e.result && e.page.next(e.result.continueCursor);
						},
						children: "Next",
					}),
				],
			});
}
var Xu = Ob(),
	bd =
		'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Iy(e) {
	const n = e.querySelector("[data-dialog-initial]");
	return n?.matches(bd) ? n : (e.querySelector(bd) ?? e);
}
function Za(e) {
	const n = (0, w.useRef)(null);
	((0, w.useEffect)(() => {
		const u = document.activeElement instanceof HTMLElement ? document.activeElement : null,
			l = n.current;
		return (
			(l === null ? null : Iy(l))?.focus(),
			() => {
				queueMicrotask(() => {
					if (
						u?.isConnected &&
						u !== document.body &&
						!u.closest("[inert]") &&
						(u.focus(), document.activeElement === u)
					)
						return;
					const o = document.querySelector(".thread");
					(o?.querySelector(".thread-head button:not([disabled])") ?? o)?.focus();
				});
			}
		);
	}, []),
		(0, w.useEffect)(() => {
			const u = n.current;
			if (!u) return;
			const l = () => {
					!u.isConnected || document.activeElement !== document.body || Iy(u).focus();
				},
				o = (f) => {
					f.relatedTarget === null && queueMicrotask(l);
				};
			return (u.addEventListener("focusout", o), () => u.removeEventListener("focusout", o));
		}, []));
	const r = (u) => {
		if (u.key === "Escape") {
			(u.stopPropagation(), e.onClose());
			return;
		}
		if (u.key !== "Tab") return;
		const l = n.current;
		if (!l) return;
		const o = [...l.querySelectorAll(bd)];
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
	return (0, Xu.createPortal)(
		(0, p.jsx)("div", {
			className: "dialog-overlay",
			children: (0, p.jsx)("div", {
				ref: n,
				className: "dialog",
				role: "dialog",
				tabIndex: -1,
				"aria-modal": "true",
				"aria-labelledby": e.accessUnavailable ? void 0 : e.labelledBy,
				"aria-label": e.accessUnavailable ? "Channel access is unavailable" : void 0,
				onKeyDown: r,
				children: e.accessUnavailable
					? (0, p.jsxs)(p.Fragment, {
							children: [
								(0, p.jsx)("h2", { className: "dialog-title", children: "Channel access is unavailable" }),
								(0, p.jsx)("p", { children: "Your changes are kept. Reconnect to continue." }),
								(0, p.jsxs)("div", {
									className: "dialog-actions",
									children: [
										(0, p.jsx)("button", {
											type: "button",
											className: "button",
											onClick: e.onClose,
											children: "Close",
										}),
										(0, p.jsx)("button", {
											type: "button",
											className: "button",
											onClick: e.onReconnect,
											children: "Reconnect",
										}),
									],
								}),
							],
						})
					: e.children,
			}),
		}),
		document.body,
	);
}
var Uy;
function te(e, n, r) {
	function u(h, m) {
		if (
			(h._zod || Object.defineProperty(h, "_zod", { value: { def: m, constr: f, traits: new Set() }, enumerable: !1 }),
			h._zod.traits.has(e))
		)
			return;
		(h._zod.traits.add(e), n(h, m));
		const v = f.prototype,
			y = Object.keys(v);
		for (let _ = 0; _ < y.length; _++) {
			const b = y[_];
			b in h || (h[b] = v[b].bind(h));
		}
	}
	const l = r?.Parent ?? Object;
	class o extends l {}
	Object.defineProperty(o, "name", { value: e });
	function f(h) {
		var m;
		const v = r?.Parent ? new o() : this;
		(u(v, h), (m = v._zod).deferred ?? (m.deferred = []));
		for (const y of v._zod.deferred) y();
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
var qa = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	},
	kb = class extends Error {
		constructor(e) {
			(super(`Encountered unidirectional transform during encode: ${e}`), (this.name = "ZodEncodeError"));
		}
	};
(Uy = globalThis).__zod_globalConfig ?? (Uy.__zod_globalConfig = {});
var Kl = globalThis.__zod_globalConfig;
function qr(e) {
	return (e && Object.assign(Kl, e), Kl);
}
function Db(e) {
	const n = Object.values(e).filter((r) => typeof r == "number");
	return Object.entries(e)
		.filter(([r, u]) => n.indexOf(+r) === -1)
		.map(([r, u]) => u);
}
function pd(e, n) {
	return typeof n == "bigint" ? n.toString() : n;
}
function Ud(e) {
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
function Ld(e) {
	return e == null;
}
function $d(e) {
	const n = e.startsWith("^") ? 1 : 0,
		r = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(n, r);
}
function mE(e, n) {
	const r = e / n,
		u = Math.round(r),
		l = Number.EPSILON * Math.max(Math.abs(r), 1);
	return Math.abs(r - u) < l ? 0 : r - u;
}
var Ly = Symbol("evaluating");
function Xe(e, n, r) {
	let u;
	Object.defineProperty(e, n, {
		get() {
			if (u !== Ly) return (u === void 0 && ((u = Ly), (u = r())), u);
		},
		set(l) {
			Object.defineProperty(e, n, { value: l });
		},
		configurable: !0,
	});
}
function Vr(e, n, r) {
	Object.defineProperty(e, n, { value: r, writable: !0, enumerable: !0, configurable: !0 });
}
function lr(...e) {
	const n = {};
	for (const r of e) {
		const u = Object.getOwnPropertyDescriptors(r);
		Object.assign(n, u);
	}
	return Object.defineProperties({}, n);
}
function $y(e) {
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
var jb = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function Gl(e) {
	return typeof e == "object" && e !== null && !Array.isArray(e);
}
var gE = Ud(() => {
	if (Kl.jitless || (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))) return !1;
	try {
		return !1;
	} catch {
		return !1;
	}
});
function Ju(e) {
	if (Gl(e) === !1) return !1;
	const n = e.constructor;
	if (n === void 0 || typeof n != "function") return !0;
	const r = n.prototype;
	return !(Gl(r) === !1 || Object.prototype.hasOwnProperty.call(r, "isPrototypeOf") === !1);
}
function qb(e) {
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
var yE = new Set(["string", "number", "symbol"]);
function lo(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function or(e, n, r) {
	const u = new e._zod.constr(n ?? e._zod.def);
	return ((!n || r?.parent) && (u._zod.parent = e), u);
}
function ge(e) {
	const n = e;
	if (!n) return {};
	if (typeof n == "string") return { error: () => n };
	if (n?.message !== void 0) {
		if (n?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
		n.error = n.message;
	}
	return (delete n.message, typeof n.error == "string" ? { ...n, error: () => n.error } : n);
}
function bE(e) {
	return Object.keys(e).filter((n) => e[n]._zod.optin === "optional" && e[n]._zod.optout === "optional");
}
var pE = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
function SE(e, n) {
	const r = e._zod.def,
		u = r.checks;
	if (u && u.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	return or(
		e,
		lr(e._zod.def, {
			get shape() {
				const l = {};
				for (const o in n) {
					if (!(o in r.shape)) throw new Error(`Unrecognized key: "${o}"`);
					n[o] && (l[o] = r.shape[o]);
				}
				return (Vr(this, "shape", l), l);
			},
			checks: [],
		}),
	);
}
function wE(e, n) {
	const r = e._zod.def,
		u = r.checks;
	if (u && u.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	return or(
		e,
		lr(e._zod.def, {
			get shape() {
				const l = { ...e._zod.def.shape };
				for (const o in n) {
					if (!(o in r.shape)) throw new Error(`Unrecognized key: "${o}"`);
					n[o] && delete l[o];
				}
				return (Vr(this, "shape", l), l);
			},
			checks: [],
		}),
	);
}
function _E(e, n) {
	if (!Ju(n)) throw new Error("Invalid input to extend: expected a plain object");
	const r = e._zod.def.checks;
	if (r && r.length > 0) {
		const u = e._zod.def.shape;
		for (const l in n)
			if (Object.getOwnPropertyDescriptor(u, l) !== void 0)
				throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return or(
		e,
		lr(e._zod.def, {
			get shape() {
				const u = { ...e._zod.def.shape, ...n };
				return (Vr(this, "shape", u), u);
			},
		}),
	);
}
function xE(e, n) {
	if (!Ju(n)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return or(
		e,
		lr(e._zod.def, {
			get shape() {
				const r = { ...e._zod.def.shape, ...n };
				return (Vr(this, "shape", r), r);
			},
		}),
	);
}
function EE(e, n) {
	if (e._zod.def.checks?.length)
		throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return or(
		e,
		lr(e._zod.def, {
			get shape() {
				const r = { ...e._zod.def.shape, ...n._zod.def.shape };
				return (Vr(this, "shape", r), r);
			},
			get catchall() {
				return n._zod.def.catchall;
			},
			checks: n._zod.def.checks ?? [],
		}),
	);
}
function CE(e, n, r) {
	const u = n._zod.def.checks;
	if (u && u.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
	return or(
		n,
		lr(n._zod.def, {
			get shape() {
				const l = n._zod.def.shape,
					o = { ...l };
				if (r)
					for (const f in r) {
						if (!(f in l)) throw new Error(`Unrecognized key: "${f}"`);
						r[f] && (o[f] = e ? new e({ type: "optional", innerType: l[f] }) : l[f]);
					}
				else for (const f in l) o[f] = e ? new e({ type: "optional", innerType: l[f] }) : l[f];
				return (Vr(this, "shape", o), o);
			},
			checks: [],
		}),
	);
}
function TE(e, n, r) {
	return or(
		n,
		lr(n._zod.def, {
			get shape() {
				const u = n._zod.def.shape,
					l = { ...u };
				if (r)
					for (const o in r) {
						if (!(o in l)) throw new Error(`Unrecognized key: "${o}"`);
						r[o] && (l[o] = new e({ type: "nonoptional", innerType: u[o] }));
					}
				else for (const o in u) l[o] = new e({ type: "nonoptional", innerType: u[o] });
				return (Vr(this, "shape", l), l);
			},
		}),
	);
}
function Da(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let r = n; r < e.issues.length; r++) if (e.issues[r]?.continue !== !0) return !0;
	return !1;
}
function AE(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let r = n; r < e.issues.length; r++) if (e.issues[r]?.continue === !1) return !0;
	return !1;
}
function Ib(e, n) {
	return n.map((r) => {
		var u;
		return ((u = r).path ?? (u.path = []), r.path.unshift(e), r);
	});
}
function Ul(e) {
	return typeof e == "string" ? e : e?.message;
}
function Ir(e, n, r) {
	const u = e.message
			? e.message
			: (Ul(e.inst?._zod.def?.error?.(e)) ??
				Ul(n?.error?.(e)) ??
				Ul(r.customError?.(e)) ??
				Ul(r.localeError?.(e)) ??
				"Invalid input"),
		{ inst: l, continue: o, input: f, ...h } = e;
	return (h.path ?? (h.path = []), (h.message = u), n?.reportInput && (h.input = f), h);
}
function Bd(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Wu(...e) {
	const [n, r, u] = e;
	return typeof n == "string" ? { message: n, code: "custom", input: r, inst: u } : { ...n };
}
var Ub = (e, n) => {
		((e.name = "$ZodError"),
			Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
			Object.defineProperty(e, "issues", { value: n, enumerable: !1 }),
			(e.message = JSON.stringify(n, pd, 2)),
			Object.defineProperty(e, "toString", { value: () => e.message, enumerable: !1 }));
	},
	Lb = te("$ZodError", Ub),
	$b = te("$ZodError", Ub, { Parent: Error });
function RE(e, n = (r) => r.message) {
	const r = {},
		u = [];
	for (const l of e.issues)
		l.path.length > 0 ? ((r[l.path[0]] = r[l.path[0]] || []), r[l.path[0]].push(n(l))) : u.push(n(l));
	return { formErrors: u, fieldErrors: r };
}
function OE(e, n = (r) => r.message) {
	const r = { _errors: [] },
		u = (l, o = []) => {
			for (const f of l.issues)
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
							const y = h[v];
							(v !== h.length - 1
								? (m[y] = m[y] || { _errors: [] })
								: ((m[y] = m[y] || { _errors: [] }), m[y]._errors.push(n(f))),
								(m = m[y]),
								v++);
						}
					}
				}
		};
	return (u(e), r);
}
var Vd = (e) => (n, r, u, l) => {
		const o = u ? { ...u, async: !1 } : { async: !1 },
			f = n._zod.run({ value: r, issues: [] }, o);
		if (f instanceof Promise) throw new qa();
		if (f.issues.length) {
			const h = new (l?.Err ?? e)(f.issues.map((m) => Ir(m, o, qr())));
			throw (jb(h, l?.callee), h);
		}
		return f.value;
	},
	Hd = (e) => async (n, r, u, l) => {
		const o = u ? { ...u, async: !0 } : { async: !0 };
		let f = n._zod.run({ value: r, issues: [] }, o);
		if ((f instanceof Promise && (f = await f), f.issues.length)) {
			const h = new (l?.Err ?? e)(f.issues.map((m) => Ir(m, o, qr())));
			throw (jb(h, l?.callee), h);
		}
		return f.value;
	},
	oo = (e) => (n, r, u) => {
		const l = u ? { ...u, async: !1 } : { async: !1 },
			o = n._zod.run({ value: r, issues: [] }, l);
		if (o instanceof Promise) throw new qa();
		return o.issues.length
			? { success: !1, error: new (e ?? Lb)(o.issues.map((f) => Ir(f, l, qr()))) }
			: { success: !0, data: o.value };
	},
	NE = oo($b),
	co = (e) => async (n, r, u) => {
		const l = u ? { ...u, async: !0 } : { async: !0 };
		let o = n._zod.run({ value: r, issues: [] }, l);
		return (
			o instanceof Promise && (o = await o),
			o.issues.length
				? { success: !1, error: new e(o.issues.map((f) => Ir(f, l, qr()))) }
				: { success: !0, data: o.value }
		);
	},
	ME = co($b),
	zE = (e) => (n, r, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Vd(e)(n, r, l);
	},
	kE = (e) => (n, r, u) => Vd(e)(n, r, u),
	DE = (e) => async (n, r, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Hd(e)(n, r, l);
	},
	jE = (e) => async (n, r, u) => Hd(e)(n, r, u),
	qE = (e) => (n, r, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return oo(e)(n, r, l);
	},
	IE = (e) => (n, r, u) => oo(e)(n, r, u),
	UE = (e) => async (n, r, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return co(e)(n, r, l);
	},
	LE = (e) => async (n, r, u) => co(e)(n, r, u),
	$E = /^[cC][0-9a-z]{6,}$/,
	BE = /^[0-9a-z]+$/,
	VE = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
	HE = /^[0-9a-vA-V]{20}$/,
	ZE = /^[A-Za-z0-9]{27}$/,
	QE = /^[a-zA-Z0-9_-]{21}$/,
	PE = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
	YE = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
	By = (e) =>
		e
			? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`)
			: /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
	FE = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
	KE = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function GE() {
	return new RegExp(KE, "u");
}
var XE =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	JE =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
	WE =
		/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
	eC =
		/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	tC = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
	Bb = /^[A-Za-z0-9_-]*$/,
	nC = /^https?$/,
	iC = /^\+[1-9]\d{6,14}$/,
	Vb =
		"(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
	rC = new RegExp(`^${Vb}$`);
function Hb(e) {
	const n = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number"
		? e.precision === -1
			? `${n}`
			: e.precision === 0
				? `${n}:[0-5]\\d`
				: `${n}:[0-5]\\d\\.\\d{${e.precision}}`
		: `${n}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function aC(e) {
	return new RegExp(`^${Hb(e)}$`);
}
function uC(e) {
	const n = Hb({ precision: e.precision }),
		r = ["Z"];
	(e.local && r.push(""), e.offset && r.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)"));
	const u = `${n}(?:${r.join("|")})`;
	return new RegExp(`^${Vb}T(?:${u})$`);
}
var sC = (e) => {
		const n = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
		return new RegExp(`^${n}$`);
	},
	lC = /^-?\d+$/,
	oC = /^-?\d+(?:\.\d+)?$/,
	cC = /^[^A-Z]*$/,
	fC = /^[^a-z]*$/,
	mn = te("$ZodCheck", (e, n) => {
		var r;
		(e._zod ?? (e._zod = {}), (e._zod.def = n), (r = e._zod).onattach ?? (r.onattach = []));
	}),
	Zb = { number: "number", bigint: "bigint", object: "date" },
	Qb = te("$ZodCheckLessThan", (e, n) => {
		mn.init(e, n);
		const r = Zb[typeof n.value];
		(e._zod.onattach.push((u) => {
			const l = u._zod.bag,
				o = (n.inclusive ? l.maximum : l.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
			n.value < o && (n.inclusive ? (l.maximum = n.value) : (l.exclusiveMaximum = n.value));
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
	Pb = te("$ZodCheckGreaterThan", (e, n) => {
		mn.init(e, n);
		const r = Zb[typeof n.value];
		(e._zod.onattach.push((u) => {
			const l = u._zod.bag,
				o = (n.inclusive ? l.minimum : l.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
			n.value > o && (n.inclusive ? (l.minimum = n.value) : (l.exclusiveMinimum = n.value));
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
	dC = te("$ZodCheckMultipleOf", (e, n) => {
		(mn.init(e, n),
			e._zod.onattach.push((r) => {
				var u;
				(u = r._zod.bag).multipleOf ?? (u.multipleOf = n.value);
			}),
			(e._zod.check = (r) => {
				if (typeof r.value != typeof n.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				(typeof r.value == "bigint" ? r.value % n.value === BigInt(0) : mE(r.value, n.value) === 0) ||
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
	hC = te("$ZodCheckNumberFormat", (e, n) => {
		(mn.init(e, n), (n.format = n.format || "float64"));
		const r = n.format?.includes("int"),
			u = r ? "int" : "number",
			[l, o] = pE[n.format];
		(e._zod.onattach.push((f) => {
			const h = f._zod.bag;
			((h.format = n.format), (h.minimum = l), (h.maximum = o), r && (h.pattern = lC));
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
				(h < l &&
					f.issues.push({
						origin: "number",
						input: h,
						code: "too_small",
						minimum: l,
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
	mC = te("$ZodCheckMaxLength", (e, n) => {
		var r;
		(mn.init(e, n),
			(r = e._zod.def).when ??
				(r.when = (u) => {
					const l = u.value;
					return !Ld(l) && l.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
				n.maximum < l && (u._zod.bag.maximum = n.maximum);
			}),
			(e._zod.check = (u) => {
				const l = u.value;
				if (l.length <= n.maximum) return;
				const o = Bd(l);
				u.issues.push({
					origin: o,
					code: "too_big",
					maximum: n.maximum,
					inclusive: !0,
					input: l,
					inst: e,
					continue: !n.abort,
				});
			}));
	}),
	vC = te("$ZodCheckMinLength", (e, n) => {
		var r;
		(mn.init(e, n),
			(r = e._zod.def).when ??
				(r.when = (u) => {
					const l = u.value;
					return !Ld(l) && l.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
				n.minimum > l && (u._zod.bag.minimum = n.minimum);
			}),
			(e._zod.check = (u) => {
				const l = u.value;
				if (l.length >= n.minimum) return;
				const o = Bd(l);
				u.issues.push({
					origin: o,
					code: "too_small",
					minimum: n.minimum,
					inclusive: !0,
					input: l,
					inst: e,
					continue: !n.abort,
				});
			}));
	}),
	gC = te("$ZodCheckLengthEquals", (e, n) => {
		var r;
		(mn.init(e, n),
			(r = e._zod.def).when ??
				(r.when = (u) => {
					const l = u.value;
					return !Ld(l) && l.length !== void 0;
				}),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag;
				((l.minimum = n.length), (l.maximum = n.length), (l.length = n.length));
			}),
			(e._zod.check = (u) => {
				const l = u.value,
					o = l.length;
				if (o === n.length) return;
				const f = Bd(l),
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
	fo = te("$ZodCheckStringFormat", (e, n) => {
		var r, u;
		(mn.init(e, n),
			e._zod.onattach.push((l) => {
				const o = l._zod.bag;
				((o.format = n.format), n.pattern && (o.patterns ?? (o.patterns = new Set()), o.patterns.add(n.pattern)));
			}),
			n.pattern
				? ((r = e._zod).check ??
					(r.check = (l) => {
						((n.pattern.lastIndex = 0),
							!n.pattern.test(l.value) &&
								l.issues.push({
									origin: "string",
									code: "invalid_format",
									format: n.format,
									input: l.value,
									...(n.pattern ? { pattern: n.pattern.toString() } : {}),
									inst: e,
									continue: !n.abort,
								}));
					}))
				: ((u = e._zod).check ?? (u.check = () => {})));
	}),
	yC = te("$ZodCheckRegex", (e, n) => {
		(fo.init(e, n),
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
	bC = te("$ZodCheckLowerCase", (e, n) => {
		(n.pattern ?? (n.pattern = cC), fo.init(e, n));
	}),
	pC = te("$ZodCheckUpperCase", (e, n) => {
		(n.pattern ?? (n.pattern = fC), fo.init(e, n));
	}),
	SC = te("$ZodCheckIncludes", (e, n) => {
		mn.init(e, n);
		const r = lo(n.includes),
			u = new RegExp(typeof n.position == "number" ? `^.{${n.position}}${r}` : r);
		((n.pattern = u),
			e._zod.onattach.push((l) => {
				const o = l._zod.bag;
				(o.patterns ?? (o.patterns = new Set()), o.patterns.add(u));
			}),
			(e._zod.check = (l) => {
				l.value.includes(n.includes, n.position) ||
					l.issues.push({
						origin: "string",
						code: "invalid_format",
						format: "includes",
						includes: n.includes,
						input: l.value,
						inst: e,
						continue: !n.abort,
					});
			}));
	}),
	wC = te("$ZodCheckStartsWith", (e, n) => {
		mn.init(e, n);
		const r = new RegExp(`^${lo(n.prefix)}.*`);
		(n.pattern ?? (n.pattern = r),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag;
				(l.patterns ?? (l.patterns = new Set()), l.patterns.add(r));
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
	_C = te("$ZodCheckEndsWith", (e, n) => {
		mn.init(e, n);
		const r = new RegExp(`.*${lo(n.suffix)}$`);
		(n.pattern ?? (n.pattern = r),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag;
				(l.patterns ?? (l.patterns = new Set()), l.patterns.add(r));
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
	xC = te("$ZodCheckOverwrite", (e, n) => {
		(mn.init(e, n),
			(e._zod.check = (r) => {
				r.value = n.tx(r.value);
			}));
	}),
	EC = class {
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
					.filter((l) => l),
				r = Math.min(...n.map((l) => l.length - l.trimStart().length)),
				u = n.map((l) => l.slice(r)).map((l) => " ".repeat(this.indent * 2) + l);
			for (const l of u) this.content.push(l);
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
	CC = { major: 4, minor: 4, patch: 3 },
	Rt = te("$ZodType", (e, n) => {
		var r;
		(e ?? (e = {}), (e._zod.def = n), (e._zod.bag = e._zod.bag || {}), (e._zod.version = CC));
		const u = [...(e._zod.def.checks ?? [])];
		e._zod.traits.has("$ZodCheck") && u.unshift(e);
		for (const l of u) for (const o of l._zod.onattach) o(e);
		if (u.length === 0)
			((r = e._zod).deferred ?? (r.deferred = []),
				e._zod.deferred?.push(() => {
					e._zod.run = e._zod.parse;
				}));
		else {
			const l = (f, h, m) => {
					let v = Da(f),
						y;
					for (const _ of h) {
						if (_._zod.def.when) {
							if (AE(f) || !_._zod.def.when(f)) continue;
						} else if (v) continue;
						const b = f.issues.length,
							S = _._zod.check(f);
						if (S instanceof Promise && m?.async === !1) throw new qa();
						if (y || S instanceof Promise)
							y = (y ?? Promise.resolve()).then(async () => {
								(await S, f.issues.length !== b && (v || (v = Da(f, b))));
							});
						else {
							if (f.issues.length === b) continue;
							v || (v = Da(f, b));
						}
					}
					return y ? y.then(() => f) : f;
				},
				o = (f, h, m) => {
					if (Da(f)) return ((f.aborted = !0), f);
					const v = l(h, u, m);
					if (v instanceof Promise) {
						if (m.async === !1) throw new qa();
						return v.then((y) => e._zod.parse(y, m));
					}
					return e._zod.parse(v, m);
				};
			e._zod.run = (f, h) => {
				if (h.skipChecks) return e._zod.parse(f, h);
				if (h.direction === "backward") {
					const v = e._zod.parse({ value: f.value, issues: [] }, { ...h, skipChecks: !0 });
					return v instanceof Promise ? v.then((y) => o(y, f, h)) : o(v, f, h);
				}
				const m = e._zod.parse(f, h);
				if (m instanceof Promise) {
					if (h.async === !1) throw new qa();
					return m.then((v) => l(v, u, h));
				}
				return l(m, u, h);
			};
		}
		Xe(e, "~standard", () => ({
			validate: (l) => {
				try {
					const o = NE(e, l);
					return o.success ? { value: o.data } : { issues: o.error?.issues };
				} catch {
					return ME(e, l).then((f) => (f.success ? { value: f.data } : { issues: f.error?.issues }));
				}
			},
			vendor: "zod",
			version: 1,
		}));
	}),
	Zd = te("$ZodString", (e, n) => {
		(Rt.init(e, n),
			(e._zod.pattern = [...(e?._zod.bag?.patterns ?? [])].pop() ?? sC(e._zod.bag)),
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
	st = te("$ZodStringFormat", (e, n) => {
		(fo.init(e, n), Zd.init(e, n));
	}),
	TC = te("$ZodGUID", (e, n) => {
		(n.pattern ?? (n.pattern = YE), st.init(e, n));
	}),
	AC = te("$ZodUUID", (e, n) => {
		if (n.version) {
			const r = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[n.version];
			if (r === void 0) throw new Error(`Invalid UUID version: "${n.version}"`);
			n.pattern ?? (n.pattern = By(r));
		} else n.pattern ?? (n.pattern = By());
		st.init(e, n);
	}),
	RC = te("$ZodEmail", (e, n) => {
		(n.pattern ?? (n.pattern = FE), st.init(e, n));
	}),
	OC = te("$ZodURL", (e, n) => {
		(st.init(e, n),
			(e._zod.check = (r) => {
				try {
					const u = r.value.trim();
					if (!n.normalize && n.protocol?.source === nC.source && !/^https?:\/\//i.test(u)) {
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
					const l = new URL(u);
					(n.hostname &&
						((n.hostname.lastIndex = 0),
						n.hostname.test(l.hostname) ||
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
							n.protocol.test(l.protocol.endsWith(":") ? l.protocol.slice(0, -1) : l.protocol) ||
								r.issues.push({
									code: "invalid_format",
									format: "url",
									note: "Invalid protocol",
									pattern: n.protocol.source,
									input: r.value,
									inst: e,
									continue: !n.abort,
								})),
						n.normalize ? (r.value = l.href) : (r.value = u));
					return;
				} catch {
					r.issues.push({ code: "invalid_format", format: "url", input: r.value, inst: e, continue: !n.abort });
				}
			}));
	}),
	NC = te("$ZodEmoji", (e, n) => {
		(n.pattern ?? (n.pattern = GE()), st.init(e, n));
	}),
	MC = te("$ZodNanoID", (e, n) => {
		(n.pattern ?? (n.pattern = QE), st.init(e, n));
	}),
	zC = te("$ZodCUID", (e, n) => {
		(n.pattern ?? (n.pattern = $E), st.init(e, n));
	}),
	kC = te("$ZodCUID2", (e, n) => {
		(n.pattern ?? (n.pattern = BE), st.init(e, n));
	}),
	DC = te("$ZodULID", (e, n) => {
		(n.pattern ?? (n.pattern = VE), st.init(e, n));
	}),
	jC = te("$ZodXID", (e, n) => {
		(n.pattern ?? (n.pattern = HE), st.init(e, n));
	}),
	qC = te("$ZodKSUID", (e, n) => {
		(n.pattern ?? (n.pattern = ZE), st.init(e, n));
	}),
	IC = te("$ZodISODateTime", (e, n) => {
		(n.pattern ?? (n.pattern = uC(n)), st.init(e, n));
	}),
	UC = te("$ZodISODate", (e, n) => {
		(n.pattern ?? (n.pattern = rC), st.init(e, n));
	}),
	LC = te("$ZodISOTime", (e, n) => {
		(n.pattern ?? (n.pattern = aC(n)), st.init(e, n));
	}),
	$C = te("$ZodISODuration", (e, n) => {
		(n.pattern ?? (n.pattern = PE), st.init(e, n));
	}),
	BC = te("$ZodIPv4", (e, n) => {
		(n.pattern ?? (n.pattern = XE), st.init(e, n), (e._zod.bag.format = "ipv4"));
	}),
	VC = te("$ZodIPv6", (e, n) => {
		(n.pattern ?? (n.pattern = JE),
			st.init(e, n),
			(e._zod.bag.format = "ipv6"),
			(e._zod.check = (r) => {
				try {
					new URL(`http://[${r.value}]`);
				} catch {
					r.issues.push({ code: "invalid_format", format: "ipv6", input: r.value, inst: e, continue: !n.abort });
				}
			}));
	}),
	HC = te("$ZodCIDRv4", (e, n) => {
		(n.pattern ?? (n.pattern = WE), st.init(e, n));
	}),
	ZC = te("$ZodCIDRv6", (e, n) => {
		(n.pattern ?? (n.pattern = eC),
			st.init(e, n),
			(e._zod.check = (r) => {
				const u = r.value.split("/");
				try {
					if (u.length !== 2) throw new Error();
					const [l, o] = u;
					if (!o) throw new Error();
					const f = Number(o);
					if (`${f}` !== o) throw new Error();
					if (f < 0 || f > 128) throw new Error();
					new URL(`http://[${l}]`);
				} catch {
					r.issues.push({ code: "invalid_format", format: "cidrv6", input: r.value, inst: e, continue: !n.abort });
				}
			}));
	});
function Yb(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 !== 0) return !1;
	try {
		return (atob(e), !0);
	} catch {
		return !1;
	}
}
var QC = te("$ZodBase64", (e, n) => {
	(n.pattern ?? (n.pattern = tC),
		st.init(e, n),
		(e._zod.bag.contentEncoding = "base64"),
		(e._zod.check = (r) => {
			Yb(r.value) ||
				r.issues.push({ code: "invalid_format", format: "base64", input: r.value, inst: e, continue: !n.abort });
		}));
});
function PC(e) {
	if (!Bb.test(e)) return !1;
	const n = e.replace(/[-_]/g, (r) => (r === "-" ? "+" : "/"));
	return Yb(n.padEnd(Math.ceil(n.length / 4) * 4, "="));
}
var YC = te("$ZodBase64URL", (e, n) => {
		(n.pattern ?? (n.pattern = Bb),
			st.init(e, n),
			(e._zod.bag.contentEncoding = "base64url"),
			(e._zod.check = (r) => {
				PC(r.value) ||
					r.issues.push({ code: "invalid_format", format: "base64url", input: r.value, inst: e, continue: !n.abort });
			}));
	}),
	FC = te("$ZodE164", (e, n) => {
		(n.pattern ?? (n.pattern = iC), st.init(e, n));
	});
function KC(e, n = null) {
	try {
		const r = e.split(".");
		if (r.length !== 3) return !1;
		const [u] = r;
		if (!u) return !1;
		const l = JSON.parse(atob(u));
		return !(("typ" in l && l?.typ !== "JWT") || !l.alg || (n && (!("alg" in l) || l.alg !== n)));
	} catch {
		return !1;
	}
}
var GC = te("$ZodJWT", (e, n) => {
		(st.init(e, n),
			(e._zod.check = (r) => {
				KC(r.value, n.alg) ||
					r.issues.push({ code: "invalid_format", format: "jwt", input: r.value, inst: e, continue: !n.abort });
			}));
	}),
	Fb = te("$ZodNumber", (e, n) => {
		(Rt.init(e, n),
			(e._zod.pattern = e._zod.bag.pattern ?? oC),
			(e._zod.parse = (r, u) => {
				if (n.coerce)
					try {
						r.value = Number(r.value);
					} catch {}
				const l = r.value;
				if (typeof l == "number" && !Number.isNaN(l) && Number.isFinite(l)) return r;
				const o = typeof l == "number" ? (Number.isNaN(l) ? "NaN" : Number.isFinite(l) ? void 0 : "Infinity") : void 0;
				return (
					r.issues.push({ expected: "number", code: "invalid_type", input: l, inst: e, ...(o ? { received: o } : {}) }),
					r
				);
			}));
	}),
	XC = te("$ZodNumberFormat", (e, n) => {
		(hC.init(e, n), Fb.init(e, n));
	}),
	JC = te("$ZodUnknown", (e, n) => {
		(Rt.init(e, n), (e._zod.parse = (r) => r));
	}),
	WC = te("$ZodNever", (e, n) => {
		(Rt.init(e, n),
			(e._zod.parse = (r, u) => (
				r.issues.push({ expected: "never", code: "invalid_type", input: r.value, inst: e }),
				r
			)));
	});
function Vy(e, n, r) {
	(e.issues.length && n.issues.push(...Ib(r, e.issues)), (n.value[r] = e.value));
}
var eT = te("$ZodArray", (e, n) => {
	(Rt.init(e, n),
		(e._zod.parse = (r, u) => {
			const l = r.value;
			if (!Array.isArray(l)) return (r.issues.push({ expected: "array", code: "invalid_type", input: l, inst: e }), r);
			r.value = Array(l.length);
			const o = [];
			for (let f = 0; f < l.length; f++) {
				const h = l[f],
					m = n.element._zod.run({ value: h, issues: [] }, u);
				m instanceof Promise ? o.push(m.then((v) => Vy(v, r, f))) : Vy(m, r, f);
			}
			return o.length ? Promise.all(o).then(() => r) : r;
		}));
});
function Xl(e, n, r, u, l, o) {
	const f = r in u;
	if (e.issues.length) {
		if (l && o && !f) return;
		n.issues.push(...Ib(r, e.issues));
	}
	if (!f && !l) {
		e.issues.length || n.issues.push({ code: "invalid_type", expected: "nonoptional", input: void 0, path: [r] });
		return;
	}
	e.value === void 0 ? f && (n.value[r] = void 0) : (n.value[r] = e.value);
}
function Kb(e) {
	const n = Object.keys(e.shape);
	for (const u of n)
		if (!e.shape?.[u]?._zod?.traits?.has("$ZodType"))
			throw new Error(`Invalid element at key "${u}": expected a Zod schema`);
	const r = bE(e.shape);
	return { ...e, keys: n, keySet: new Set(n), numKeys: n.length, optionalKeys: new Set(r) };
}
function Gb(e, n, r, u, l, o) {
	const f = [],
		h = l.keySet,
		m = l.catchall._zod,
		v = m.def.type,
		y = m.optin === "optional",
		_ = m.optout === "optional";
	for (const b in n) {
		if (b === "__proto__" || h.has(b)) continue;
		if (v === "never") {
			f.push(b);
			continue;
		}
		const S = m.run({ value: n[b], issues: [] }, u);
		S instanceof Promise ? e.push(S.then((E) => Xl(E, r, b, n, y, _))) : Xl(S, r, b, n, y, _);
	}
	return (
		f.length && r.issues.push({ code: "unrecognized_keys", keys: f, input: n, inst: o }),
		e.length ? Promise.all(e).then(() => r) : r
	);
}
var tT = te("$ZodObject", (e, n) => {
		if ((Rt.init(e, n), !Object.getOwnPropertyDescriptor(n, "shape")?.get)) {
			const f = n.shape;
			Object.defineProperty(n, "shape", {
				get: () => {
					const h = { ...f };
					return (Object.defineProperty(n, "shape", { value: h }), h);
				},
			});
		}
		const r = Ud(() => Kb(n));
		Xe(e._zod, "propValues", () => {
			const f = n.shape,
				h = {};
			for (const m in f) {
				const v = f[m]._zod;
				if (v.values) {
					h[m] ?? (h[m] = new Set());
					for (const y of v.values) h[m].add(y);
				}
			}
			return h;
		});
		const u = Gl,
			l = n.catchall;
		let o;
		e._zod.parse = (f, h) => {
			o ?? (o = r.value);
			const m = f.value;
			if (!u(m)) return (f.issues.push({ expected: "object", code: "invalid_type", input: m, inst: e }), f);
			f.value = {};
			const v = [],
				y = o.shape;
			for (const _ of o.keys) {
				const b = y[_],
					S = b._zod.optin === "optional",
					E = b._zod.optout === "optional",
					C = b._zod.run({ value: m[_], issues: [] }, h);
				C instanceof Promise ? v.push(C.then((T) => Xl(T, f, _, m, S, E))) : Xl(C, f, _, m, S, E);
			}
			return l ? Gb(v, m, f, h, r.value, e) : v.length ? Promise.all(v).then(() => f) : f;
		};
	}),
	nT = te("$ZodObjectJIT", (e, n) => {
		tT.init(e, n);
		const r = e._zod.parse,
			u = Ud(() => Kb(n)),
			l = (b) => {
				const S = new EC(["shape", "payload", "ctx"]),
					E = u.value,
					C = (N) => {
						const R = $y(N);
						return `shape[${R}]._zod.run({ value: input[${R}], issues: [] }, ctx)`;
					};
				S.write("const input = payload.value;");
				const T = Object.create(null);
				let D = 0;
				for (const N of E.keys) T[N] = `key_${D++}`;
				S.write("const newResult = {};");
				for (const N of E.keys) {
					const R = T[N],
						$ = $y(N),
						I = b[N],
						j = I?._zod?.optin === "optional",
						z = I?._zod?.optout === "optional";
					(S.write(`const ${R} = ${C(N)};`),
						j && z
							? S.write(`
        if (${R}.issues.length) {
          if (${$} in input) {
            payload.issues = payload.issues.concat(${R}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${$}, ...iss.path] : [${$}]
            })));
          }
        }
        
        if (${R}.value === undefined) {
          if (${$} in input) {
            newResult[${$}] = undefined;
          }
        } else {
          newResult[${$}] = ${R}.value;
        }
        
      `)
							: j
								? S.write(`
        if (${R}.issues.length) {
          payload.issues = payload.issues.concat(${R}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${$}, ...iss.path] : [${$}]
          })));
        }
        
        if (${R}.value === undefined) {
          if (${$} in input) {
            newResult[${$}] = undefined;
          }
        } else {
          newResult[${$}] = ${R}.value;
        }
        
      `)
								: S.write(`
        const ${R}_present = ${$} in input;
        if (${R}.issues.length) {
          payload.issues = payload.issues.concat(${R}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${$}, ...iss.path] : [${$}]
          })));
        }
        if (!${R}_present && !${R}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${$}]
          });
        }

        if (${R}_present) {
          if (${R}.value === undefined) {
            newResult[${$}] = undefined;
          } else {
            newResult[${$}] = ${R}.value;
          }
        }

      `));
				}
				(S.write("payload.value = newResult;"), S.write("return payload;"));
				const A = S.compile();
				return (N, R) => A(b, N, R);
			};
		let o;
		const f = Gl,
			h = !Kl.jitless,
			v = h && gE.value,
			y = n.catchall;
		let _;
		e._zod.parse = (b, S) => {
			_ ?? (_ = u.value);
			const E = b.value;
			return f(E)
				? h && v && S?.async === !1 && S.jitless !== !0
					? (o || (o = l(n.shape)), (b = o(b, S)), y ? Gb([], E, b, S, _, e) : b)
					: r(b, S)
				: (b.issues.push({ expected: "object", code: "invalid_type", input: E, inst: e }), b);
		};
	});
function Hy(e, n, r, u) {
	for (const o of e) if (o.issues.length === 0) return ((n.value = o.value), n);
	const l = e.filter((o) => !Da(o));
	return l.length === 1
		? ((n.value = l[0].value), l[0])
		: (n.issues.push({
				code: "invalid_union",
				input: n.value,
				inst: r,
				errors: e.map((o) => o.issues.map((f) => Ir(f, u, qr()))),
			}),
			n);
}
var iT = te("$ZodUnion", (e, n) => {
		(Rt.init(e, n),
			Xe(e._zod, "optin", () => (n.options.some((u) => u._zod.optin === "optional") ? "optional" : void 0)),
			Xe(e._zod, "optout", () => (n.options.some((u) => u._zod.optout === "optional") ? "optional" : void 0)),
			Xe(e._zod, "values", () => {
				if (n.options.every((u) => u._zod.values)) return new Set(n.options.flatMap((u) => Array.from(u._zod.values)));
			}),
			Xe(e._zod, "pattern", () => {
				if (n.options.every((u) => u._zod.pattern)) {
					const u = n.options.map((l) => l._zod.pattern);
					return new RegExp(`^(${u.map((l) => $d(l.source)).join("|")})$`);
				}
			}));
		const r = n.options.length === 1 ? n.options[0]._zod.run : null;
		e._zod.parse = (u, l) => {
			if (r) return r(u, l);
			let o = !1;
			const f = [];
			for (const h of n.options) {
				const m = h._zod.run({ value: u.value, issues: [] }, l);
				if (m instanceof Promise) (f.push(m), (o = !0));
				else {
					if (m.issues.length === 0) return m;
					f.push(m);
				}
			}
			return o ? Promise.all(f).then((h) => Hy(h, u, e, l)) : Hy(f, u, e, l);
		};
	}),
	rT = te("$ZodIntersection", (e, n) => {
		(Rt.init(e, n),
			(e._zod.parse = (r, u) => {
				const l = r.value,
					o = n.left._zod.run({ value: l, issues: [] }, u),
					f = n.right._zod.run({ value: l, issues: [] }, u);
				return o instanceof Promise || f instanceof Promise
					? Promise.all([o, f]).then(([h, m]) => Zy(r, h, m))
					: Zy(r, o, f);
			}));
	});
function Sd(e, n) {
	if (e === n) return { valid: !0, data: e };
	if (e instanceof Date && n instanceof Date && +e == +n) return { valid: !0, data: e };
	if (Ju(e) && Ju(n)) {
		const r = Object.keys(n),
			u = Object.keys(e).filter((o) => r.indexOf(o) !== -1),
			l = { ...e, ...n };
		for (const o of u) {
			const f = Sd(e[o], n[o]);
			if (!f.valid) return { valid: !1, mergeErrorPath: [o, ...f.mergeErrorPath] };
			l[o] = f.data;
		}
		return { valid: !0, data: l };
	}
	if (Array.isArray(e) && Array.isArray(n)) {
		if (e.length !== n.length) return { valid: !1, mergeErrorPath: [] };
		const r = [];
		for (let u = 0; u < e.length; u++) {
			const l = e[u],
				o = n[u],
				f = Sd(l, o);
			if (!f.valid) return { valid: !1, mergeErrorPath: [u, ...f.mergeErrorPath] };
			r.push(f.data);
		}
		return { valid: !0, data: r };
	}
	return { valid: !1, mergeErrorPath: [] };
}
function Zy(e, n, r) {
	const u = new Map();
	let l;
	for (const h of n.issues)
		if (h.code === "unrecognized_keys") {
			l ?? (l = h);
			for (const m of h.keys) (u.has(m) || u.set(m, {}), (u.get(m).l = !0));
		} else e.issues.push(h);
	for (const h of r.issues)
		if (h.code === "unrecognized_keys") for (const m of h.keys) (u.has(m) || u.set(m, {}), (u.get(m).r = !0));
		else e.issues.push(h);
	const o = [...u].filter(([, h]) => h.l && h.r).map(([h]) => h);
	if ((o.length && l && e.issues.push({ ...l, keys: o }), Da(e))) return e;
	const f = Sd(n.value, r.value);
	if (!f.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(f.mergeErrorPath)}`);
	return ((e.value = f.data), e);
}
var aT = te("$ZodEnum", (e, n) => {
		Rt.init(e, n);
		const r = Db(n.entries),
			u = new Set(r);
		((e._zod.values = u),
			(e._zod.pattern = new RegExp(
				`^(${r
					.filter((l) => yE.has(typeof l))
					.map((l) => (typeof l == "string" ? lo(l) : l.toString()))
					.join("|")})$`,
			)),
			(e._zod.parse = (l, o) => {
				const f = l.value;
				return (u.has(f) || l.issues.push({ code: "invalid_value", values: r, input: f, inst: e }), l);
			}));
	}),
	uT = te("$ZodTransform", (e, n) => {
		(Rt.init(e, n),
			(e._zod.optin = "optional"),
			(e._zod.parse = (r, u) => {
				if (u.direction === "backward") throw new kb(e.constructor.name);
				const l = n.transform(r.value, r);
				if (u.async)
					return (l instanceof Promise ? l : Promise.resolve(l)).then((o) => ((r.value = o), (r.fallback = !0), r));
				if (l instanceof Promise) throw new qa();
				return ((r.value = l), (r.fallback = !0), r);
			}));
	});
function Qy(e, n) {
	return n === void 0 && (e.issues.length || e.fallback) ? { issues: [], value: void 0 } : e;
}
var Xb = te("$ZodOptional", (e, n) => {
		(Rt.init(e, n),
			(e._zod.optin = "optional"),
			(e._zod.optout = "optional"),
			Xe(e._zod, "values", () => (n.innerType._zod.values ? new Set([...n.innerType._zod.values, void 0]) : void 0)),
			Xe(e._zod, "pattern", () => {
				const r = n.innerType._zod.pattern;
				return r ? new RegExp(`^(${$d(r.source)})?$`) : void 0;
			}),
			(e._zod.parse = (r, u) => {
				if (n.innerType._zod.optin === "optional") {
					const l = r.value,
						o = n.innerType._zod.run(r, u);
					return o instanceof Promise ? o.then((f) => Qy(f, l)) : Qy(o, l);
				}
				return r.value === void 0 ? r : n.innerType._zod.run(r, u);
			}));
	}),
	sT = te("$ZodExactOptional", (e, n) => {
		(Xb.init(e, n),
			Xe(e._zod, "values", () => n.innerType._zod.values),
			Xe(e._zod, "pattern", () => n.innerType._zod.pattern),
			(e._zod.parse = (r, u) => n.innerType._zod.run(r, u)));
	}),
	lT = te("$ZodNullable", (e, n) => {
		(Rt.init(e, n),
			Xe(e._zod, "optin", () => n.innerType._zod.optin),
			Xe(e._zod, "optout", () => n.innerType._zod.optout),
			Xe(e._zod, "pattern", () => {
				const r = n.innerType._zod.pattern;
				return r ? new RegExp(`^(${$d(r.source)}|null)$`) : void 0;
			}),
			Xe(e._zod, "values", () => (n.innerType._zod.values ? new Set([...n.innerType._zod.values, null]) : void 0)),
			(e._zod.parse = (r, u) => (r.value === null ? r : n.innerType._zod.run(r, u))));
	}),
	oT = te("$ZodDefault", (e, n) => {
		(Rt.init(e, n),
			(e._zod.optin = "optional"),
			Xe(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (r, u) => {
				if (u.direction === "backward") return n.innerType._zod.run(r, u);
				if (r.value === void 0) return ((r.value = n.defaultValue), r);
				const l = n.innerType._zod.run(r, u);
				return l instanceof Promise ? l.then((o) => Py(o, n)) : Py(l, n);
			}));
	});
function Py(e, n) {
	return (e.value === void 0 && (e.value = n.defaultValue), e);
}
var cT = te("$ZodPrefault", (e, n) => {
		(Rt.init(e, n),
			(e._zod.optin = "optional"),
			Xe(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (r, u) => (
				u.direction === "backward" || (r.value === void 0 && (r.value = n.defaultValue)),
				n.innerType._zod.run(r, u)
			)));
	}),
	fT = te("$ZodNonOptional", (e, n) => {
		(Rt.init(e, n),
			Xe(e._zod, "values", () => {
				const r = n.innerType._zod.values;
				return r ? new Set([...r].filter((u) => u !== void 0)) : void 0;
			}),
			(e._zod.parse = (r, u) => {
				const l = n.innerType._zod.run(r, u);
				return l instanceof Promise ? l.then((o) => Yy(o, e)) : Yy(l, e);
			}));
	});
function Yy(e, n) {
	return (
		!e.issues.length &&
			e.value === void 0 &&
			e.issues.push({ code: "invalid_type", expected: "nonoptional", input: e.value, inst: n }),
		e
	);
}
var dT = te("$ZodCatch", (e, n) => {
		(Rt.init(e, n),
			(e._zod.optin = "optional"),
			Xe(e._zod, "optout", () => n.innerType._zod.optout),
			Xe(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (r, u) => {
				if (u.direction === "backward") return n.innerType._zod.run(r, u);
				const l = n.innerType._zod.run(r, u);
				return l instanceof Promise
					? l.then(
							(o) => (
								(r.value = o.value),
								o.issues.length &&
									((r.value = n.catchValue({
										...r,
										error: { issues: o.issues.map((f) => Ir(f, u, qr())) },
										input: r.value,
									})),
									(r.issues = []),
									(r.fallback = !0)),
								r
							),
						)
					: ((r.value = l.value),
						l.issues.length &&
							((r.value = n.catchValue({
								...r,
								error: { issues: l.issues.map((o) => Ir(o, u, qr())) },
								input: r.value,
							})),
							(r.issues = []),
							(r.fallback = !0)),
						r);
			}));
	}),
	hT = te("$ZodPipe", (e, n) => {
		(Rt.init(e, n),
			Xe(e._zod, "values", () => n.in._zod.values),
			Xe(e._zod, "optin", () => n.in._zod.optin),
			Xe(e._zod, "optout", () => n.out._zod.optout),
			Xe(e._zod, "propValues", () => n.in._zod.propValues),
			(e._zod.parse = (r, u) => {
				if (u.direction === "backward") {
					const o = n.out._zod.run(r, u);
					return o instanceof Promise ? o.then((f) => Ll(f, n.in, u)) : Ll(o, n.in, u);
				}
				const l = n.in._zod.run(r, u);
				return l instanceof Promise ? l.then((o) => Ll(o, n.out, u)) : Ll(l, n.out, u);
			}));
	});
function Ll(e, n, r) {
	return e.issues.length
		? ((e.aborted = !0), e)
		: n._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, r);
}
var mT = te("$ZodReadonly", (e, n) => {
	(Rt.init(e, n),
		Xe(e._zod, "propValues", () => n.innerType._zod.propValues),
		Xe(e._zod, "values", () => n.innerType._zod.values),
		Xe(e._zod, "optin", () => n.innerType?._zod?.optin),
		Xe(e._zod, "optout", () => n.innerType?._zod?.optout),
		(e._zod.parse = (r, u) => {
			if (u.direction === "backward") return n.innerType._zod.run(r, u);
			const l = n.innerType._zod.run(r, u);
			return l instanceof Promise ? l.then(Fy) : Fy(l);
		}));
});
function Fy(e) {
	return ((e.value = Object.freeze(e.value)), e);
}
var vT = te("$ZodCustom", (e, n) => {
	(mn.init(e, n),
		Rt.init(e, n),
		(e._zod.parse = (r, u) => r),
		(e._zod.check = (r) => {
			const u = r.value,
				l = n.fn(u);
			if (l instanceof Promise) return l.then((o) => Ky(o, r, u, e));
			Ky(l, r, u, e);
		}));
});
function Ky(e, n, r, u) {
	if (!e) {
		const l = { code: "custom", input: r, inst: u, path: [...(u._zod.def.path ?? [])], continue: !u._zod.def.abort };
		(u._zod.def.params && (l.params = u._zod.def.params), n.issues.push(Wu(l)));
	}
}
var Gy,
	gT = class {
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
function yT() {
	return new gT();
}
(Gy = globalThis).__zod_globalRegistry ?? (Gy.__zod_globalRegistry = yT());
var Hu = globalThis.__zod_globalRegistry;
function bT(e, n) {
	return new e({ type: "string", ...ge(n) });
}
function pT(e, n) {
	return new e({ type: "string", format: "email", check: "string_format", abort: !1, ...ge(n) });
}
function Xy(e, n) {
	return new e({ type: "string", format: "guid", check: "string_format", abort: !1, ...ge(n) });
}
function ST(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, ...ge(n) });
}
function wT(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v4", ...ge(n) });
}
function _T(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v6", ...ge(n) });
}
function xT(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v7", ...ge(n) });
}
function ET(e, n) {
	return new e({ type: "string", format: "url", check: "string_format", abort: !1, ...ge(n) });
}
function CT(e, n) {
	return new e({ type: "string", format: "emoji", check: "string_format", abort: !1, ...ge(n) });
}
function TT(e, n) {
	return new e({ type: "string", format: "nanoid", check: "string_format", abort: !1, ...ge(n) });
}
function AT(e, n) {
	return new e({ type: "string", format: "cuid", check: "string_format", abort: !1, ...ge(n) });
}
function RT(e, n) {
	return new e({ type: "string", format: "cuid2", check: "string_format", abort: !1, ...ge(n) });
}
function OT(e, n) {
	return new e({ type: "string", format: "ulid", check: "string_format", abort: !1, ...ge(n) });
}
function NT(e, n) {
	return new e({ type: "string", format: "xid", check: "string_format", abort: !1, ...ge(n) });
}
function MT(e, n) {
	return new e({ type: "string", format: "ksuid", check: "string_format", abort: !1, ...ge(n) });
}
function zT(e, n) {
	return new e({ type: "string", format: "ipv4", check: "string_format", abort: !1, ...ge(n) });
}
function kT(e, n) {
	return new e({ type: "string", format: "ipv6", check: "string_format", abort: !1, ...ge(n) });
}
function DT(e, n) {
	return new e({ type: "string", format: "cidrv4", check: "string_format", abort: !1, ...ge(n) });
}
function jT(e, n) {
	return new e({ type: "string", format: "cidrv6", check: "string_format", abort: !1, ...ge(n) });
}
function qT(e, n) {
	return new e({ type: "string", format: "base64", check: "string_format", abort: !1, ...ge(n) });
}
function IT(e, n) {
	return new e({ type: "string", format: "base64url", check: "string_format", abort: !1, ...ge(n) });
}
function UT(e, n) {
	return new e({ type: "string", format: "e164", check: "string_format", abort: !1, ...ge(n) });
}
function LT(e, n) {
	return new e({ type: "string", format: "jwt", check: "string_format", abort: !1, ...ge(n) });
}
function $T(e, n) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...ge(n),
	});
}
function BT(e, n) {
	return new e({ type: "string", format: "date", check: "string_format", ...ge(n) });
}
function VT(e, n) {
	return new e({ type: "string", format: "time", check: "string_format", precision: null, ...ge(n) });
}
function HT(e, n) {
	return new e({ type: "string", format: "duration", check: "string_format", ...ge(n) });
}
function ZT(e, n) {
	return new e({ type: "number", checks: [], ...ge(n) });
}
function QT(e, n) {
	return new e({ type: "number", check: "number_format", abort: !1, format: "safeint", ...ge(n) });
}
function PT(e) {
	return new e({ type: "unknown" });
}
function YT(e, n) {
	return new e({ type: "never", ...ge(n) });
}
function Jy(e, n) {
	return new Qb({ check: "less_than", ...ge(n), value: e, inclusive: !1 });
}
function ed(e, n) {
	return new Qb({ check: "less_than", ...ge(n), value: e, inclusive: !0 });
}
function Wy(e, n) {
	return new Pb({ check: "greater_than", ...ge(n), value: e, inclusive: !1 });
}
function td(e, n) {
	return new Pb({ check: "greater_than", ...ge(n), value: e, inclusive: !0 });
}
function e0(e, n) {
	return new dC({ check: "multiple_of", ...ge(n), value: e });
}
function Jb(e, n) {
	return new mC({ check: "max_length", ...ge(n), maximum: e });
}
function Jl(e, n) {
	return new vC({ check: "min_length", ...ge(n), minimum: e });
}
function Wb(e, n) {
	return new gC({ check: "length_equals", ...ge(n), length: e });
}
function FT(e, n) {
	return new yC({ check: "string_format", format: "regex", ...ge(n), pattern: e });
}
function KT(e) {
	return new bC({ check: "string_format", format: "lowercase", ...ge(e) });
}
function GT(e) {
	return new pC({ check: "string_format", format: "uppercase", ...ge(e) });
}
function XT(e, n) {
	return new SC({ check: "string_format", format: "includes", ...ge(n), includes: e });
}
function JT(e, n) {
	return new wC({ check: "string_format", format: "starts_with", ...ge(n), prefix: e });
}
function WT(e, n) {
	return new _C({ check: "string_format", format: "ends_with", ...ge(n), suffix: e });
}
function Qa(e) {
	return new xC({ check: "overwrite", tx: e });
}
function eA(e) {
	return Qa((n) => n.normalize(e));
}
function tA() {
	return Qa((e) => e.trim());
}
function nA() {
	return Qa((e) => e.toLowerCase());
}
function iA() {
	return Qa((e) => e.toUpperCase());
}
function rA() {
	return Qa((e) => vE(e));
}
function aA(e, n, r) {
	return new e({ type: "array", element: n, ...ge(r) });
}
function uA(e, n, r) {
	return new e({ type: "custom", check: "custom", fn: n, ...ge(r) });
}
function sA(e, n) {
	const r = lA(
		(u) => (
			(u.addIssue = (l) => {
				if (typeof l == "string") u.issues.push(Wu(l, u.value, r._zod.def));
				else {
					const o = l;
					(o.fatal && (o.continue = !1),
						o.code ?? (o.code = "custom"),
						o.input ?? (o.input = u.value),
						o.inst ?? (o.inst = r),
						o.continue ?? (o.continue = !r._zod.def.abort),
						u.issues.push(Wu(o)));
				}
			}),
			e(u.value, u)
		),
		n,
	);
	return r;
}
function lA(e, n) {
	const r = new mn({ check: "custom", ...ge(n) });
	return ((r._zod.check = e), r);
}
function ep(e) {
	let n = e?.target ?? "draft-2020-12";
	return (
		n === "draft-4" && (n = "draft-04"),
		n === "draft-7" && (n = "draft-07"),
		{
			processors: e.processors ?? {},
			metadataRegistry: e?.metadata ?? Hu,
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
function Yt(e, n, r = { path: [], schemaPath: [] }) {
	var u;
	const l = e._zod.def,
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
				b = n.processors[l.type];
			if (!b) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${l.type}`);
			b(e, n, _, v);
		}
		const y = e._zod.parent;
		y && (f.ref || (f.ref = y), Yt(y, n, v), (n.seen.get(y).isParent = !0));
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
function tp(e, n) {
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
	const l = (f) => {
			const h = e.target === "draft-2020-12" ? "$defs" : "definitions";
			if (e.external) {
				const y = e.external.registry.get(f[0])?.id,
					_ = e.external.uri ?? ((S) => S);
				if (y) return { ref: _(y) };
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
				{ ref: m, defId: v } = l(f);
			((h.def = { ...h.schema }), v && (h.defId = v));
			const y = h.schema;
			for (const _ in y) delete y[_];
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
function np(e, n) {
	const r = e.seen.get(n);
	if (!r) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const u = (h) => {
		const m = e.seen.get(h);
		if (m.ref === null) return;
		const v = m.def ?? m.schema,
			y = { ...v },
			_ = m.ref;
		if (((m.ref = null), _)) {
			u(_);
			const S = e.seen.get(_),
				E = S.schema;
			if (
				(E.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0")
					? ((v.allOf = v.allOf ?? []), v.allOf.push(E))
					: Object.assign(v, E),
				Object.assign(v, y),
				h._zod.parent === _)
			)
				for (const C in v) C === "$ref" || C === "allOf" || C in y || delete v[C];
			if (E.$ref && S.def)
				for (const C in v)
					C === "$ref" ||
						C === "allOf" ||
						(C in S.def && JSON.stringify(v[C]) === JSON.stringify(S.def[C]) && delete v[C]);
		}
		const b = h._zod.parent;
		if (b && b !== _) {
			u(b);
			const S = e.seen.get(b);
			if (S?.schema.$ref && ((v.$ref = S.schema.$ref), S.def))
				for (const E in v)
					E === "$ref" ||
						E === "allOf" ||
						(E in S.def && JSON.stringify(v[E]) === JSON.stringify(S.def[E]) && delete v[E]);
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
		const h = e.external.registry.get(n)?.id;
		if (!h) throw new Error("Schema is missing an `id` property");
		l.$id = e.external.uri(h);
	}
	Object.assign(l, r.def ?? r.schema);
	const o = e.metadataRegistry.get(n)?.id;
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
					...n["~standard"],
					jsonSchema: { input: Wl(n, "input", e.processors), output: Wl(n, "output", e.processors) },
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
	const r = n ?? { seen: new Set() };
	if (r.seen.has(e)) return !1;
	r.seen.add(e);
	const u = e._zod.def;
	if (u.type === "transform") return !0;
	if (u.type === "array") return Jt(u.element, r);
	if (u.type === "set") return Jt(u.valueType, r);
	if (u.type === "lazy") return Jt(u.getter(), r);
	if (
		u.type === "promise" ||
		u.type === "optional" ||
		u.type === "nonoptional" ||
		u.type === "nullable" ||
		u.type === "readonly" ||
		u.type === "default" ||
		u.type === "prefault"
	)
		return Jt(u.innerType, r);
	if (u.type === "intersection") return Jt(u.left, r) || Jt(u.right, r);
	if (u.type === "record" || u.type === "map") return Jt(u.keyType, r) || Jt(u.valueType, r);
	if (u.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : Jt(u.in, r) || Jt(u.out, r);
	if (u.type === "object") {
		for (const l in u.shape) if (Jt(u.shape[l], r)) return !0;
		return !1;
	}
	if (u.type === "union") {
		for (const l of u.options) if (Jt(l, r)) return !0;
		return !1;
	}
	if (u.type === "tuple") {
		for (const l of u.items) if (Jt(l, r)) return !0;
		return !!(u.rest && Jt(u.rest, r));
	}
	return !1;
}
var oA =
		(e, n = {}) =>
		(r) => {
			const u = ep({ ...r, processors: n });
			return (Yt(e, u), tp(u, e), np(u, e));
		},
	Wl =
		(e, n, r = {}) =>
		(u) => {
			const { libraryOptions: l, target: o } = u ?? {},
				f = ep({ ...(l ?? {}), target: o, io: n, processors: r });
			return (Yt(e, f), tp(f, e), np(f, e));
		},
	cA = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" },
	fA = (e, n, r, u) => {
		const l = r;
		l.type = "string";
		const { minimum: o, maximum: f, format: h, patterns: m, contentEncoding: v } = e._zod.bag;
		if (
			(typeof o == "number" && (l.minLength = o),
			typeof f == "number" && (l.maxLength = f),
			h && ((l.format = cA[h] ?? h), l.format === "" && delete l.format, h === "time" && delete l.format),
			v && (l.contentEncoding = v),
			m && m.size > 0)
		) {
			const y = [...m];
			y.length === 1
				? (l.pattern = y[0].source)
				: y.length > 1 &&
					(l.allOf = [
						...y.map((_) => ({
							...(n.target === "draft-07" || n.target === "draft-04" || n.target === "openapi-3.0"
								? { type: "string" }
								: {}),
							pattern: _.source,
						})),
					]);
		}
	},
	dA = (e, n, r, u) => {
		const l = r,
			{ minimum: o, maximum: f, format: h, multipleOf: m, exclusiveMaximum: v, exclusiveMinimum: y } = e._zod.bag;
		typeof h == "string" && h.includes("int") ? (l.type = "integer") : (l.type = "number");
		const _ = typeof y == "number" && y >= (o ?? Number.NEGATIVE_INFINITY),
			b = typeof v == "number" && v <= (f ?? Number.POSITIVE_INFINITY),
			S = n.target === "draft-04" || n.target === "openapi-3.0";
		(_
			? S
				? ((l.minimum = y), (l.exclusiveMinimum = !0))
				: (l.exclusiveMinimum = y)
			: typeof o == "number" && (l.minimum = o),
			b
				? S
					? ((l.maximum = v), (l.exclusiveMaximum = !0))
					: (l.exclusiveMaximum = v)
				: typeof f == "number" && (l.maximum = f),
			typeof m == "number" && (l.multipleOf = m));
	},
	hA = (e, n, r, u) => {
		r.not = {};
	},
	mA = (e, n, r, u) => {},
	vA = (e, n, r, u) => {
		const l = e._zod.def,
			o = Db(l.entries);
		(o.every((f) => typeof f == "number") && (r.type = "number"),
			o.every((f) => typeof f == "string") && (r.type = "string"),
			(r.enum = o));
	},
	gA = (e, n, r, u) => {
		if (n.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
	},
	yA = (e, n, r, u) => {
		if (n.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
	},
	bA = (e, n, r, u) => {
		const l = r,
			o = e._zod.def,
			{ minimum: f, maximum: h } = e._zod.bag;
		(typeof f == "number" && (l.minItems = f),
			typeof h == "number" && (l.maxItems = h),
			(l.type = "array"),
			(l.items = Yt(o.element, n, { ...u, path: [...u.path, "items"] })));
	},
	pA = (e, n, r, u) => {
		const l = r,
			o = e._zod.def;
		((l.type = "object"), (l.properties = {}));
		const f = o.shape;
		for (const v in f) l.properties[v] = Yt(f[v], n, { ...u, path: [...u.path, "properties", v] });
		const h = new Set(Object.keys(f)),
			m = new Set(
				[...h].filter((v) => {
					const y = o.shape[v]._zod;
					return n.io === "input" ? y.optin === void 0 : y.optout === void 0;
				}),
			);
		(m.size > 0 && (l.required = Array.from(m)),
			o.catchall?._zod.def.type === "never"
				? (l.additionalProperties = !1)
				: o.catchall
					? o.catchall &&
						(l.additionalProperties = Yt(o.catchall, n, { ...u, path: [...u.path, "additionalProperties"] }))
					: n.io === "output" && (l.additionalProperties = !1));
	},
	SA = (e, n, r, u) => {
		const l = e._zod.def,
			o = l.inclusive === !1,
			f = l.options.map((h, m) => Yt(h, n, { ...u, path: [...u.path, o ? "oneOf" : "anyOf", m] }));
		o ? (r.oneOf = f) : (r.anyOf = f);
	},
	wA = (e, n, r, u) => {
		const l = e._zod.def,
			o = Yt(l.left, n, { ...u, path: [...u.path, "allOf", 0] }),
			f = Yt(l.right, n, { ...u, path: [...u.path, "allOf", 1] }),
			h = (m) => "allOf" in m && Object.keys(m).length === 1;
		r.allOf = [...(h(o) ? o.allOf : [o]), ...(h(f) ? f.allOf : [f])];
	},
	_A = (e, n, r, u) => {
		const l = e._zod.def,
			o = Yt(l.innerType, n, u),
			f = n.seen.get(e);
		n.target === "openapi-3.0" ? ((f.ref = l.innerType), (r.nullable = !0)) : (r.anyOf = [o, { type: "null" }]);
	},
	xA = (e, n, r, u) => {
		const l = e._zod.def;
		Yt(l.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = l.innerType;
	},
	EA = (e, n, r, u) => {
		const l = e._zod.def;
		Yt(l.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = l.innerType), (r.default = JSON.parse(JSON.stringify(l.defaultValue))));
	},
	CA = (e, n, r, u) => {
		const l = e._zod.def;
		Yt(l.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = l.innerType), n.io === "input" && (r._prefault = JSON.parse(JSON.stringify(l.defaultValue))));
	},
	TA = (e, n, r, u) => {
		const l = e._zod.def;
		Yt(l.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = l.innerType;
		let f;
		try {
			f = l.catchValue(void 0);
		} catch {
			throw new Error("Dynamic catch values are not supported in JSON Schema");
		}
		r.default = f;
	},
	AA = (e, n, r, u) => {
		const l = e._zod.def,
			o = l.in._zod.traits.has("$ZodTransform"),
			f = n.io === "input" ? (o ? l.out : l.in) : l.out;
		Yt(f, n, u);
		const h = n.seen.get(e);
		h.ref = f;
	},
	RA = (e, n, r, u) => {
		const l = e._zod.def;
		Yt(l.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = l.innerType), (r.readOnly = !0));
	},
	ip = (e, n, r, u) => {
		const l = e._zod.def;
		Yt(l.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = l.innerType;
	},
	OA = te("ZodISODateTime", (e, n) => {
		(IC.init(e, n), lt.init(e, n));
	});
function NA(e) {
	return $T(OA, e);
}
var MA = te("ZodISODate", (e, n) => {
	(UC.init(e, n), lt.init(e, n));
});
function zA(e) {
	return BT(MA, e);
}
var kA = te("ZodISOTime", (e, n) => {
	(LC.init(e, n), lt.init(e, n));
});
function DA(e) {
	return VT(kA, e);
}
var jA = te("ZodISODuration", (e, n) => {
	($C.init(e, n), lt.init(e, n));
});
function qA(e) {
	return HT(jA, e);
}
var IA = (e, n) => {
		(Lb.init(e, n),
			(e.name = "ZodError"),
			Object.defineProperties(e, {
				format: { value: (r) => OE(e, r) },
				flatten: { value: (r) => RE(e, r) },
				addIssue: {
					value: (r) => {
						(e.issues.push(r), (e.message = JSON.stringify(e.issues, pd, 2)));
					},
				},
				addIssues: {
					value: (r) => {
						(e.issues.push(...r), (e.message = JSON.stringify(e.issues, pd, 2)));
					},
				},
				isEmpty: {
					get() {
						return e.issues.length === 0;
					},
				},
			}));
	},
	qn = te("ZodError", IA, { Parent: Error }),
	UA = Vd(qn),
	LA = Hd(qn),
	$A = oo(qn),
	BA = co(qn),
	VA = zE(qn),
	HA = kE(qn),
	ZA = DE(qn),
	QA = jE(qn),
	PA = qE(qn),
	YA = IE(qn),
	FA = UE(qn),
	KA = LE(qn),
	t0 = new WeakMap();
function rs(e, n, r) {
	const u = Object.getPrototypeOf(e);
	let l = t0.get(u);
	if ((l || ((l = new Set()), t0.set(u, l)), !l.has(n))) {
		l.add(n);
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
var Ot = te(
		"ZodType",
		(e, n) => (
			Rt.init(e, n),
			Object.assign(e["~standard"], { jsonSchema: { input: Wl(e, "input"), output: Wl(e, "output") } }),
			(e.toJSONSchema = oA(e, {})),
			(e.def = n),
			(e.type = n.type),
			Object.defineProperty(e, "_def", { value: n }),
			(e.parse = (r, u) => UA(e, r, u, { callee: e.parse })),
			(e.safeParse = (r, u) => $A(e, r, u)),
			(e.parseAsync = async (r, u) => LA(e, r, u, { callee: e.parseAsync })),
			(e.safeParseAsync = async (r, u) => BA(e, r, u)),
			(e.spa = e.safeParseAsync),
			(e.encode = (r, u) => VA(e, r, u)),
			(e.decode = (r, u) => HA(e, r, u)),
			(e.encodeAsync = async (r, u) => ZA(e, r, u)),
			(e.decodeAsync = async (r, u) => QA(e, r, u)),
			(e.safeEncode = (r, u) => PA(e, r, u)),
			(e.safeDecode = (r, u) => YA(e, r, u)),
			(e.safeEncodeAsync = async (r, u) => FA(e, r, u)),
			(e.safeDecodeAsync = async (r, u) => KA(e, r, u)),
			rs(e, "ZodType", {
				check(...r) {
					const u = this.def;
					return this.clone(
						lr(u, {
							checks: [
								...(u.checks ?? []),
								...r.map((l) =>
									typeof l == "function" ? { _zod: { check: l, def: { check: "custom" }, onattach: [] } } : l,
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
					return or(this, r, u);
				},
				brand() {
					return this;
				},
				register(r, u) {
					return (r.add(this, u), this);
				},
				refine(r, u) {
					return this.check(ZR(r, u));
				},
				superRefine(r, u) {
					return this.check(QR(r, u));
				},
				overwrite(r) {
					return this.check(Qa(r));
				},
				optional() {
					return u0(this);
				},
				exactOptional() {
					return MR(this);
				},
				nullable() {
					return s0(this);
				},
				nullish() {
					return u0(s0(this));
				},
				nonoptional(r) {
					return IR(this, r);
				},
				array() {
					return SR(this);
				},
				or(r) {
					return ER([this, r]);
				},
				and(r) {
					return TR(this, r);
				},
				transform(r) {
					return l0(this, OR(r));
				},
				default(r) {
					return DR(this, r);
				},
				prefault(r) {
					return qR(this, r);
				},
				catch(r) {
					return LR(this, r);
				},
				pipe(r) {
					return l0(this, r);
				},
				readonly() {
					return VR(this);
				},
				describe(r) {
					const u = this.clone();
					return (Hu.add(u, { description: r }), u);
				},
				meta(...r) {
					if (r.length === 0) return Hu.get(this);
					const u = this.clone();
					return (Hu.add(u, r[0]), u);
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
					return Hu.get(e)?.description;
				},
				configurable: !0,
			}),
			e
		),
	),
	rp = te("_ZodString", (e, n) => {
		(Zd.init(e, n), Ot.init(e, n), (e._zod.processJSONSchema = (u, l, o) => fA(e, u, l, o)));
		const r = e._zod.bag;
		((e.format = r.format ?? null),
			(e.minLength = r.minimum ?? null),
			(e.maxLength = r.maximum ?? null),
			rs(e, "_ZodString", {
				regex(...u) {
					return this.check(FT(...u));
				},
				includes(...u) {
					return this.check(XT(...u));
				},
				startsWith(...u) {
					return this.check(JT(...u));
				},
				endsWith(...u) {
					return this.check(WT(...u));
				},
				min(...u) {
					return this.check(Jl(...u));
				},
				max(...u) {
					return this.check(Jb(...u));
				},
				length(...u) {
					return this.check(Wb(...u));
				},
				nonempty(...u) {
					return this.check(Jl(1, ...u));
				},
				lowercase(u) {
					return this.check(KT(u));
				},
				uppercase(u) {
					return this.check(GT(u));
				},
				trim() {
					return this.check(tA());
				},
				normalize(...u) {
					return this.check(eA(...u));
				},
				toLowerCase() {
					return this.check(nA());
				},
				toUpperCase() {
					return this.check(iA());
				},
				slugify() {
					return this.check(rA());
				},
			}));
	}),
	GA = te("ZodString", (e, n) => {
		(Zd.init(e, n),
			rp.init(e, n),
			(e.email = (r) => e.check(pT(JA, r))),
			(e.url = (r) => e.check(ET(WA, r))),
			(e.jwt = (r) => e.check(LT(mR, r))),
			(e.emoji = (r) => e.check(CT(eR, r))),
			(e.guid = (r) => e.check(Xy(n0, r))),
			(e.uuid = (r) => e.check(ST($l, r))),
			(e.uuidv4 = (r) => e.check(wT($l, r))),
			(e.uuidv6 = (r) => e.check(_T($l, r))),
			(e.uuidv7 = (r) => e.check(xT($l, r))),
			(e.nanoid = (r) => e.check(TT(tR, r))),
			(e.guid = (r) => e.check(Xy(n0, r))),
			(e.cuid = (r) => e.check(AT(nR, r))),
			(e.cuid2 = (r) => e.check(RT(iR, r))),
			(e.ulid = (r) => e.check(OT(rR, r))),
			(e.base64 = (r) => e.check(qT(fR, r))),
			(e.base64url = (r) => e.check(IT(dR, r))),
			(e.xid = (r) => e.check(NT(aR, r))),
			(e.ksuid = (r) => e.check(MT(uR, r))),
			(e.ipv4 = (r) => e.check(zT(sR, r))),
			(e.ipv6 = (r) => e.check(kT(lR, r))),
			(e.cidrv4 = (r) => e.check(DT(oR, r))),
			(e.cidrv6 = (r) => e.check(jT(cR, r))),
			(e.e164 = (r) => e.check(UT(hR, r))),
			(e.datetime = (r) => e.check(NA(r))),
			(e.date = (r) => e.check(zA(r))),
			(e.time = (r) => e.check(DA(r))),
			(e.duration = (r) => e.check(qA(r))));
	});
function XA(e) {
	return bT(GA, e);
}
var lt = te("ZodStringFormat", (e, n) => {
		(st.init(e, n), rp.init(e, n));
	}),
	JA = te("ZodEmail", (e, n) => {
		(RC.init(e, n), lt.init(e, n));
	}),
	n0 = te("ZodGUID", (e, n) => {
		(TC.init(e, n), lt.init(e, n));
	}),
	$l = te("ZodUUID", (e, n) => {
		(AC.init(e, n), lt.init(e, n));
	}),
	WA = te("ZodURL", (e, n) => {
		(OC.init(e, n), lt.init(e, n));
	}),
	eR = te("ZodEmoji", (e, n) => {
		(NC.init(e, n), lt.init(e, n));
	}),
	tR = te("ZodNanoID", (e, n) => {
		(MC.init(e, n), lt.init(e, n));
	}),
	nR = te("ZodCUID", (e, n) => {
		(zC.init(e, n), lt.init(e, n));
	}),
	iR = te("ZodCUID2", (e, n) => {
		(kC.init(e, n), lt.init(e, n));
	}),
	rR = te("ZodULID", (e, n) => {
		(DC.init(e, n), lt.init(e, n));
	}),
	aR = te("ZodXID", (e, n) => {
		(jC.init(e, n), lt.init(e, n));
	}),
	uR = te("ZodKSUID", (e, n) => {
		(qC.init(e, n), lt.init(e, n));
	}),
	sR = te("ZodIPv4", (e, n) => {
		(BC.init(e, n), lt.init(e, n));
	}),
	lR = te("ZodIPv6", (e, n) => {
		(VC.init(e, n), lt.init(e, n));
	}),
	oR = te("ZodCIDRv4", (e, n) => {
		(HC.init(e, n), lt.init(e, n));
	}),
	cR = te("ZodCIDRv6", (e, n) => {
		(ZC.init(e, n), lt.init(e, n));
	}),
	fR = te("ZodBase64", (e, n) => {
		(QC.init(e, n), lt.init(e, n));
	}),
	dR = te("ZodBase64URL", (e, n) => {
		(YC.init(e, n), lt.init(e, n));
	}),
	hR = te("ZodE164", (e, n) => {
		(FC.init(e, n), lt.init(e, n));
	}),
	mR = te("ZodJWT", (e, n) => {
		(GC.init(e, n), lt.init(e, n));
	}),
	ap = te("ZodNumber", (e, n) => {
		(Fb.init(e, n),
			Ot.init(e, n),
			(e._zod.processJSONSchema = (u, l, o) => dA(e, u, l, o)),
			rs(e, "ZodNumber", {
				gt(u, l) {
					return this.check(Wy(u, l));
				},
				gte(u, l) {
					return this.check(td(u, l));
				},
				min(u, l) {
					return this.check(td(u, l));
				},
				lt(u, l) {
					return this.check(Jy(u, l));
				},
				lte(u, l) {
					return this.check(ed(u, l));
				},
				max(u, l) {
					return this.check(ed(u, l));
				},
				int(u) {
					return this.check(r0(u));
				},
				safe(u) {
					return this.check(r0(u));
				},
				positive(u) {
					return this.check(Wy(0, u));
				},
				nonnegative(u) {
					return this.check(td(0, u));
				},
				negative(u) {
					return this.check(Jy(0, u));
				},
				nonpositive(u) {
					return this.check(ed(0, u));
				},
				multipleOf(u, l) {
					return this.check(e0(u, l));
				},
				step(u, l) {
					return this.check(e0(u, l));
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
function i0(e) {
	return ZT(ap, e);
}
var vR = te("ZodNumberFormat", (e, n) => {
	(XC.init(e, n), ap.init(e, n));
});
function r0(e) {
	return QT(vR, e);
}
var gR = te("ZodUnknown", (e, n) => {
	(JC.init(e, n), Ot.init(e, n), (e._zod.processJSONSchema = (r, u, l) => mA(e, r, u, l)));
});
function a0() {
	return PT(gR);
}
var yR = te("ZodNever", (e, n) => {
	(WC.init(e, n), Ot.init(e, n), (e._zod.processJSONSchema = (r, u, l) => hA(e, r, u, l)));
});
function bR(e) {
	return YT(yR, e);
}
var pR = te("ZodArray", (e, n) => {
	(eT.init(e, n),
		Ot.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => bA(e, r, u, l)),
		(e.element = n.element),
		rs(e, "ZodArray", {
			min(r, u) {
				return this.check(Jl(r, u));
			},
			nonempty(r) {
				return this.check(Jl(1, r));
			},
			max(r, u) {
				return this.check(Jb(r, u));
			},
			length(r, u) {
				return this.check(Wb(r, u));
			},
			unwrap() {
				return this.element;
			},
		}));
});
function SR(e, n) {
	return aA(pR, e, n);
}
var wR = te("ZodObject", (e, n) => {
	(nT.init(e, n),
		Ot.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => pA(e, r, u, l)),
		Xe(e, "shape", () => n.shape),
		rs(e, "ZodObject", {
			keyof() {
				return AR(Object.keys(this._zod.def.shape));
			},
			catchall(r) {
				return this.clone({ ...this._zod.def, catchall: r });
			},
			passthrough() {
				return this.clone({ ...this._zod.def, catchall: a0() });
			},
			loose() {
				return this.clone({ ...this._zod.def, catchall: a0() });
			},
			strict() {
				return this.clone({ ...this._zod.def, catchall: bR() });
			},
			strip() {
				return this.clone({ ...this._zod.def, catchall: void 0 });
			},
			extend(r) {
				return _E(this, r);
			},
			safeExtend(r) {
				return xE(this, r);
			},
			merge(r) {
				return EE(this, r);
			},
			pick(r) {
				return SE(this, r);
			},
			omit(r) {
				return wE(this, r);
			},
			partial(...r) {
				return CE(up, this, r[0]);
			},
			required(...r) {
				return TE(sp, this, r[0]);
			},
		}));
});
function _R(e, n) {
	const r = { type: "object", shape: e ?? {}, ...ge(n) };
	return new wR(r);
}
var xR = te("ZodUnion", (e, n) => {
	(iT.init(e, n), Ot.init(e, n), (e._zod.processJSONSchema = (r, u, l) => SA(e, r, u, l)), (e.options = n.options));
});
function ER(e, n) {
	return new xR({ type: "union", options: e, ...ge(n) });
}
var CR = te("ZodIntersection", (e, n) => {
	(rT.init(e, n), Ot.init(e, n), (e._zod.processJSONSchema = (r, u, l) => wA(e, r, u, l)));
});
function TR(e, n) {
	return new CR({ type: "intersection", left: e, right: n });
}
var wd = te("ZodEnum", (e, n) => {
	(aT.init(e, n),
		Ot.init(e, n),
		(e._zod.processJSONSchema = (u, l, o) => vA(e, u, l, o)),
		(e.enum = n.entries),
		(e.options = Object.values(n.entries)));
	const r = new Set(Object.keys(n.entries));
	((e.extract = (u, l) => {
		const o = {};
		for (const f of u)
			if (r.has(f)) o[f] = n.entries[f];
			else throw new Error(`Key ${f} not found in enum`);
		return new wd({ ...n, checks: [], ...ge(l), entries: o });
	}),
		(e.exclude = (u, l) => {
			const o = { ...n.entries };
			for (const f of u)
				if (r.has(f)) delete o[f];
				else throw new Error(`Key ${f} not found in enum`);
			return new wd({ ...n, checks: [], ...ge(l), entries: o });
		}));
});
function AR(e, n) {
	const r = Array.isArray(e) ? Object.fromEntries(e.map((u) => [u, u])) : e;
	return new wd({ type: "enum", entries: r, ...ge(n) });
}
var RR = te("ZodTransform", (e, n) => {
	(uT.init(e, n),
		Ot.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => yA(e, r, u, l)),
		(e._zod.parse = (r, u) => {
			if (u.direction === "backward") throw new kb(e.constructor.name);
			r.addIssue = (o) => {
				if (typeof o == "string") r.issues.push(Wu(o, r.value, n));
				else {
					const f = o;
					(f.fatal && (f.continue = !1),
						f.code ?? (f.code = "custom"),
						f.input ?? (f.input = r.value),
						f.inst ?? (f.inst = e),
						r.issues.push(Wu(f)));
				}
			};
			const l = n.transform(r.value, r);
			return l instanceof Promise
				? l.then((o) => ((r.value = o), (r.fallback = !0), r))
				: ((r.value = l), (r.fallback = !0), r);
		}));
});
function OR(e) {
	return new RR({ type: "transform", transform: e });
}
var up = te("ZodOptional", (e, n) => {
	(Xb.init(e, n),
		Ot.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => ip(e, r, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function u0(e) {
	return new up({ type: "optional", innerType: e });
}
var NR = te("ZodExactOptional", (e, n) => {
	(sT.init(e, n),
		Ot.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => ip(e, r, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function MR(e) {
	return new NR({ type: "optional", innerType: e });
}
var zR = te("ZodNullable", (e, n) => {
	(lT.init(e, n),
		Ot.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => _A(e, r, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function s0(e) {
	return new zR({ type: "nullable", innerType: e });
}
var kR = te("ZodDefault", (e, n) => {
	(oT.init(e, n),
		Ot.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => EA(e, r, u, l)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeDefault = e.unwrap));
});
function DR(e, n) {
	return new kR({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : qb(n);
		},
	});
}
var jR = te("ZodPrefault", (e, n) => {
	(cT.init(e, n),
		Ot.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => CA(e, r, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function qR(e, n) {
	return new jR({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof n == "function" ? n() : qb(n);
		},
	});
}
var sp = te("ZodNonOptional", (e, n) => {
	(fT.init(e, n),
		Ot.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => xA(e, r, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function IR(e, n) {
	return new sp({ type: "nonoptional", innerType: e, ...ge(n) });
}
var UR = te("ZodCatch", (e, n) => {
	(dT.init(e, n),
		Ot.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => TA(e, r, u, l)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeCatch = e.unwrap));
});
function LR(e, n) {
	return new UR({ type: "catch", innerType: e, catchValue: typeof n == "function" ? n : () => n });
}
var $R = te("ZodPipe", (e, n) => {
	(hT.init(e, n),
		Ot.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => AA(e, r, u, l)),
		(e.in = n.in),
		(e.out = n.out));
});
function l0(e, n) {
	return new $R({ type: "pipe", in: e, out: n });
}
var BR = te("ZodReadonly", (e, n) => {
	(mT.init(e, n),
		Ot.init(e, n),
		(e._zod.processJSONSchema = (r, u, l) => RA(e, r, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function VR(e) {
	return new BR({ type: "readonly", innerType: e });
}
var HR = te("ZodCustom", (e, n) => {
	(vT.init(e, n), Ot.init(e, n), (e._zod.processJSONSchema = (r, u, l) => gA(e, r, u, l)));
});
function ZR(e, n = {}) {
	return uA(HR, e, n);
}
function QR(e, n) {
	return sA(e, n);
}
function PR(e) {
	const n = new Tb("https://exuberant-hippopotamus-790.convex.cloud", { authRefreshTokenLeewaySeconds: 15 });
	let r = { phase: "connecting", message: null, deadline: 0, refreshing: !1 };
	const u = new Set();
	let l = null,
		o = null,
		f = null,
		h = null,
		m = null,
		v = 0,
		y = !1,
		_ = !1;
	function b(T) {
		if (!y) {
			r = { ...r, ...T };
			for (const D of u) D();
		}
	}
	function S(T) {
		((_ = T),
			T && performance.now() < r.deadline
				? b({ phase: "ready", message: null })
				: !o &&
					r.phase !== "denied" &&
					b({ phase: "unavailable", message: "Chitchat is reconnecting. Your draft is kept." }));
	}
	function E() {
		y ||
			o ||
			((l = null), m && clearTimeout(m), (m = null), b({ phase: "connecting", message: null }), n.setAuth(C, S));
	}
	function C(T) {
		return !T.forceRefreshToken && l && performance.now() < r.deadline
			? Promise.resolve(l)
			: o ||
					(b({ refreshing: !0 }),
					(o = (async () => {
						const D = performance.now();
						f = new AbortController();
						const A = setTimeout(() => f?.abort(), 25e3);
						try {
							const N = await e.getToken(),
								R = "https://exuberant-hippopotamus-790.convex.site/auth/lease",
								$ = {
									method: "POST",
									redirect: "error",
									headers: { "Content-Type": "application/json" },
									signal: f.signal,
								};
							let I = await fetch(R, { ...$, body: JSON.stringify({ pressToken: N }) });
							if (I.status === 401) {
								const L = await e.refreshToken();
								I = await fetch(R, { ...$, body: JSON.stringify({ pressToken: L }) });
							}
							const j = await I.json(),
								z = _R({ jwt: XA(), expiresAt: i0(), validForMs: i0().min(0).max(3e4) }).safeParse(j);
							if (!I.ok || !z.success) {
								const L = I.status === 401 || I.status === 403;
								throw (
									b({
										phase: L ? "denied" : "unavailable",
										message: L
											? "Press no longer allows this Chitchat session."
											: "Chitchat is reconnecting. Your draft is kept.",
									}),
									new Error("Chitchat lease was refused")
								);
							}
							const U = D + z.data.validForMs;
							if (U <= performance.now()) throw new Error("Chitchat lease expired in transit");
							return (
								(l = z.data.jwt),
								(v = 0),
								h && clearTimeout(h),
								(h = setTimeout(
									() => {
										((l = null),
											b({ phase: "unavailable", message: "Chitchat is reconnecting. Your draft is kept." }),
											o || ((_ = !1), n.clearAuth(), E()));
									},
									Math.max(0, U - performance.now()),
								)),
								b({ phase: _ ? "ready" : "connecting", deadline: U, message: null }),
								l
							);
						} catch {
							return (
								(l = null),
								r.phase !== "denied" &&
									b({ phase: "unavailable", message: "Chitchat is reconnecting. Your draft is kept." }),
								!y && r.phase !== "denied" && ((v += 1), (m = setTimeout(E, Math.min(3e4, 2e3 * 2 ** Math.min(v, 4))))),
								null
							);
						} finally {
							(clearTimeout(A), (f = null), (o = null), b({ refreshing: !1 }));
						}
					})()),
					o);
	}
	return {
		convex: n,
		start: () => n.setAuth(C, S),
		retry: E,
		getSnapshot: () => r,
		subscribe: (T) => (
			u.add(T),
			() => {
				u.delete(T);
			}
		),
		can_request_now: () =>
			r.phase === "ready" &&
			!r.refreshing &&
			performance.now() < r.deadline &&
			n.connectionState().isWebSocketConnected,
		close: () => {
			((y = !0), f?.abort(), h && clearTimeout(h), m && clearTimeout(m), u.clear(), n.close());
		},
	};
}
var lp = (0, w.createContext)(null);
function YR(e) {
	const [n] = (0, w.useState)(() => PR(e.client));
	return (
		(0, w.useEffect)(() => {
			n.start();
			const r = () => {
				n.getSnapshot().phase !== "ready" && n.retry();
			};
			return (
				window.addEventListener("online", r),
				window.addEventListener("focus", r),
				() => {
					(window.removeEventListener("online", r), window.removeEventListener("focus", r), n.close());
				}
			);
		}, [n]),
		(0, p.jsx)(lp.Provider, { value: n, children: (0, p.jsx)(Ix, { client: n.convex, children: e.children }) })
	);
}
function Hn() {
	const e = (0, w.useContext)(lp);
	if (!e) throw new Error("Chitchat needs its session provider");
	const n = (0, w.useSyncExternalStore)(e.subscribe, e.getSnapshot),
		r = Ux(),
		u = n.phase === "ready" && performance.now() < n.deadline,
		l = Ye(Se.sessions.current, u ? {} : "skip"),
		o = Ye(Se.sessions.status, u ? {} : "skip"),
		[f, h] = (0, w.useState)(l);
	(l && f !== l && h(l), (o === "denied" || n.phase === "denied") && f !== void 0 && h(void 0));
	const m = u && o === "refresh_required";
	return {
		member: m ? f : l,
		ready: u && o === "ready" && l !== null && l !== void 0,
		connected: u && o === "ready" && r.isWebSocketConnected,
		refreshing: m,
		canSend: u && o === "ready" && !!l?.canWrite && !n.refreshing && r.isWebSocketConnected,
		can_request_now: e.can_request_now,
		message:
			n.message ??
			(o === "denied"
				? "Your Chitchat access changed. Reconnect to continue."
				: u && !r.isWebSocketConnected
					? "Chitchat is disconnected. Your draft is kept."
					: null),
		retry: e.retry,
	};
}
function op(e) {
	const n = Hn(),
		r = xi(`${n.member?.generation}:${n.member?.membershipLifetime}`),
		u = Ye(Se.members.list, n.ready ? { paginationOpts: { numItems: 100, cursor: r.cursor } } : "skip");
	return (0, p.jsxs)(p.Fragment, {
		children: [
			u
				? (0, p.jsx)("ul", {
						className: "people-list",
						children: u.page
							.filter((l) => l.userId !== e.selfUserId)
							.map((l) =>
								(0, p.jsx)(
									"li",
									{
										className: "people-item",
										children: (0, p.jsxs)("label", {
											children: [
												(0, p.jsx)("input", {
													type: "checkbox",
													checked: e.selected.includes(l.userId),
													disabled: e.disabled,
													onChange: (o) => e.onToggle(l.userId, o.currentTarget.checked),
												}),
												zb(l.displayName),
											],
										}),
									},
									l.userId,
								),
							),
					})
				: (0, p.jsx)("p", { className: "channel-status", role: "status", children: "Loading people…" }),
			u?.page.length === 0
				? (0, p.jsx)("p", { className: "channel-status", children: "No people on this page." })
				: null,
			(0, p.jsx)(nr, { page: r, result: u, label: "People" }),
		],
	});
}
function o0(e) {
	const n = Ha(),
		r = Hn(),
		u = (0, w.useId)(),
		l = (0, w.useId)(),
		o = (0, w.useId)(),
		f = (0, w.useId)(),
		h = Ye(Se.channels.permissions, r.ready && e.channel ? { channelId: e.channel._id } : "skip"),
		[m, v] = (0, w.useState)(e.channel?.name ?? ""),
		[y, _] = (0, w.useState)(e.channel?.topic ?? ""),
		[b, S] = (0, w.useState)(!1),
		[E, C] = (0, w.useState)([]),
		[T, D] = (0, w.useState)(null),
		[A, N] = (0, w.useState)(!1),
		[R, $] = (0, w.useState)(null),
		I = A || T !== null,
		j = async () => {
			if (A) return;
			if (!r.can_request_now()) {
				$("Reconnect before saving. Your changes are kept.");
				return;
			}
			if (m.trim().length === 0 || m.trim().length > 64 || y.trim().length > 250) {
				$("Use a name of 1–64 characters and a topic of at most 250 characters.");
				return;
			}
			const z =
				T ??
				(e.channel
					? {
							kind: "rename",
							args: {
								channelId: e.channel._id,
								expectedRevision: e.channel.revision,
								clientRequestId: crypto.randomUUID(),
								name: m.trim(),
								topic: y.trim(),
							},
						}
					: {
							kind: "create",
							args: {
								clientRequestId: crypto.randomUUID(),
								name: m.trim(),
								topic: y.trim(),
								visibility: b ? "private" : "public",
								invitedUserIds: b ? E : [],
							},
						});
			(D(z), N(!0), $(null));
			try {
				const U =
					z.kind === "create"
						? await n.mutation(Se.channels.create, z.args)
						: await n.mutation(Se.channels.update, z.args);
				if (U._nay) {
					(D(null), $(U._nay.message));
					return;
				}
				U._yay.kind === "channel" && e.onSaved(U._yay.channelId);
			} catch {
				$("The save may have reached Chitchat. Retry to check the same request.");
			} finally {
				N(!1);
			}
		};
	return (0, p.jsxs)(Za, {
		labelledBy: u,
		accessUnavailable: !r.refreshing && (!r.ready || (e.channel !== null && h === null)),
		onReconnect: r.retry,
		onClose: () => {
			A || e.onClose();
		},
		children: [
			(0, p.jsx)("h2", {
				id: u,
				className: "dialog-title",
				children: e.channel ? `Rename #${e.channel.name}` : "Create channel",
			}),
			(0, p.jsxs)("form", {
				onSubmit: (z) => {
					(z.preventDefault(), j());
				},
				onKeyDown: (z) => {
					z.key === "Enter" && z.nativeEvent.isComposing && z.preventDefault();
				},
				children: [
					(0, p.jsxs)("div", {
						className: "field",
						children: [
							(0, p.jsx)("label", { htmlFor: l, children: "Channel name" }),
							(0, p.jsx)("input", {
								id: l,
								"data-dialog-initial": !0,
								value: m,
								required: !0,
								maxLength: 64,
								disabled: I,
								"aria-describedby": R ? f : void 0,
								onInput: (z) => v(z.currentTarget.value),
							}),
						],
					}),
					(0, p.jsxs)("div", {
						className: "field",
						children: [
							(0, p.jsx)("label", { htmlFor: o, children: "Topic (optional)" }),
							(0, p.jsx)("input", {
								id: o,
								value: y,
								maxLength: 250,
								disabled: I,
								onInput: (z) => _(z.currentTarget.value),
							}),
						],
					}),
					e.channel
						? null
						: (0, p.jsxs)("div", {
								className: "field",
								children: [
									(0, p.jsxs)("label", {
										className: "checkbox-label",
										children: [
											(0, p.jsx)("input", {
												type: "checkbox",
												checked: b,
												disabled: I,
												onChange: (z) => S(z.currentTarget.checked),
											}),
											"Private channel",
										],
									}),
									b
										? (0, p.jsxs)(p.Fragment, {
												children: [
													(0, p.jsx)("p", { className: "field-note", children: Id }),
													(0, p.jsx)("p", {
														className: "field-note",
														children:
															"Tick one person for a direct message, or several for a group. Up to 50 people can join.",
													}),
													(0, p.jsx)(op, {
														selfUserId: e.selfUserId,
														selected: E,
														disabled: I,
														onToggle: (z, U) => C((L) => (U ? [...L, z] : L.filter((Q) => Q !== z))),
													}),
													(0, p.jsxs)("p", {
														className: "field-note",
														children: [E.length + 1, " people selected, including you."],
													}),
												],
											})
										: null,
								],
							}),
					R ? (0, p.jsx)("p", { id: f, className: "form-error", role: "alert", children: R }) : null,
					(0, p.jsxs)("div", {
						className: "dialog-actions",
						children: [
							(0, p.jsx)("button", {
								type: "button",
								className: "button",
								disabled: A,
								onClick: e.onClose,
								children: T ? "Stop checking" : "Cancel",
							}),
							(0, p.jsx)("button", {
								type: "submit",
								className: "button button-primary",
								disabled: A || !(T ? r.connected : r.canSend),
								children: A ? "Saving…" : T ? "Retry" : e.channel ? "Rename" : "Create",
							}),
						],
					}),
				],
			}),
		],
	});
}
function FR(e) {
	const n = Ha(),
		r = Hn(),
		u = (0, w.useId)(),
		[l, o] = (0, w.useState)(null),
		[f, h] = (0, w.useState)(!1),
		[m, v] = (0, w.useState)(null),
		y = Ye(Se.channels.get, r.ready ? { channelId: e.channelId } : "skip"),
		_ = Ye(
			Se.channels.list_members,
			r.ready ? { channelId: e.channelId, paginationOpts: { numItems: 50, cursor: null } } : "skip",
		),
		b = Ye(Se.channels.permissions, r.ready ? { channelId: e.channelId } : "skip"),
		S = Ye(Se.members.resolve, r.ready && _ ? { userIds: _.page.map((A) => A.hostUserId) } : "skip"),
		E = Ye(
			Se.channel_members.status,
			r.ready && l ? { channelId: e.channelId, clientRequestId: l.clientRequestId } : "skip",
		),
		C = E?.status === "pending";
	(0, w.useEffect)(() => {
		(E?.status === "complete" && (o(null), v(null)),
			E?.status === "cancelled" &&
				(o(null), v("Access changed before this request finished. Check the people list and try again.")));
	}, [E]);
	const T = async (A) => {
			if (!(f || C)) {
				if (!r.can_request_now()) {
					v("Reconnect before changing channel access.");
					return;
				}
				(o(A), h(!0), v(null));
				try {
					const N = await n.mutation(Se.channel_members.change, A);
					N._nay && (o(null), v(N._nay.message));
				} catch {
					v("This change may have reached Chitchat. Retry to check it.");
				} finally {
					h(!1);
				}
			}
		},
		D = (A, N) => {
			_ &&
				T({
					channelId: e.channelId,
					clientRequestId: crypto.randomUUID(),
					expectedMembershipRevision: _.membershipRevision,
					expectedPrincipalCount: _.memberCount,
					hostUserId: A,
					level: N,
				});
		};
	return (0, p.jsxs)(Za, {
		labelledBy: u,
		accessUnavailable: !r.refreshing && (!r.ready || b === null),
		onReconnect: r.retry,
		onClose: () => {
			f || e.onClose();
		},
		children: [
			(0, p.jsx)("h2", { id: u, className: "dialog-title", children: y ? `People in #${y.name}` : "Channel access" }),
			(0, p.jsx)("p", { className: "field-note", children: Id }),
			C
				? (0, p.jsx)("p", { role: "status", children: "Updating channel and transcript access…" })
				: _
					? (0, p.jsx)("ul", {
							className: "people-list current-people",
							"aria-label": "People in this channel",
							children: _.page.map((A) =>
								(0, p.jsxs)(
									"li",
									{
										className: "people-item",
										children: [
											(0, p.jsxs)("span", {
												children: [
													S?.[A.hostUserId] ?? "Unnamed member",
													A.level === "manage" ? " (can add people)" : A.level === "read" ? " (can read)" : "",
												],
											}),
											b?.canManage && A.hostUserId !== e.selfUserId
												? (0, p.jsxs)(p.Fragment, {
														children: [
															(0, p.jsxs)("select", {
																"aria-label": `Access for ${S?.[A.hostUserId] ?? "member"}`,
																value: A.level,
																disabled: f || l !== null,
																onChange: (N) => {
																	const R = N.currentTarget.value;
																	(R === "read" || R === "write" || R === "manage") && D(A.hostUserId, R);
																},
																children: [
																	(0, p.jsx)("option", { value: "read", children: "Can read" }),
																	(0, p.jsx)("option", { value: "write", children: "Can write" }),
																	(0, p.jsx)("option", { value: "manage", children: "Can add people" }),
																],
															}),
															(0, p.jsx)("button", {
																type: "button",
																className: "button",
																disabled: f || l !== null,
																onClick: () => D(A.hostUserId, null),
																children: "Remove",
															}),
														],
													})
												: null,
										],
									},
									A.hostUserId,
								),
							),
						})
					: (0, p.jsx)("p", {
							className: "channel-status",
							role: "status",
							children: _ === null ? "The people list is not currently available." : "Loading people…",
						}),
			b?.canManage && _
				? (0, p.jsxs)("div", {
						className: "field",
						children: [
							(0, p.jsx)("p", { className: "field-label", children: "Add people" }),
							(0, p.jsx)(op, {
								selfUserId: e.selfUserId,
								selected: _.page.map((A) => A.hostUserId),
								disabled: f || l !== null,
								onToggle: (A, N) => D(A, N ? "write" : null),
							}),
						],
					})
				: null,
			m ? (0, p.jsx)("p", { className: "form-error", role: "alert", children: m }) : null,
			(0, p.jsxs)("div", {
				className: "dialog-actions",
				children: [
					l && !C
						? (0, p.jsx)("button", {
								type: "button",
								className: "button",
								disabled: f || !r.canSend,
								onClick: () => void T(l),
								children: "Retry",
							})
						: null,
					(0, p.jsx)("button", {
						type: "button",
						className: "button",
						"data-dialog-initial": !0,
						disabled: f,
						onClick: e.onClose,
						children: "Close",
					}),
				],
			}),
		],
	});
}
function KR(e) {
	const n = Ha(),
		r = Hn(),
		u = (0, w.useId)(),
		[l] = (0, w.useState)(() => crypto.randomUUID()),
		[o, f] = (0, w.useState)(!1),
		[h, m] = (0, w.useState)(!1),
		[v, y] = (0, w.useState)(null),
		_ = e.action === "leave" || e.action === "delete",
		b = Ye(Se.channels.permissions, r.ready ? { channelId: e.channel._id } : "skip"),
		S = Ye(Se.channel_members.status, r.ready && h && _ ? { channelId: e.channel._id, clientRequestId: l } : "skip"),
		E = S?.status === "pending";
	(0, w.useEffect)(() => {
		(S?.status === "complete" && e.onDone(),
			S?.status === "cancelled" && y("Access changed before this request finished. Close this dialog and try again."));
	}, [S, e.onDone]);
	const C =
			e.action === "archive"
				? "Archive"
				: e.action === "unarchive"
					? "Unarchive"
					: e.action === "leave"
						? "Leave"
						: "Delete",
		T = async () => {
			if (!(o || E)) {
				if (!r.can_request_now()) {
					y("Reconnect before changing this channel.");
					return;
				}
				(f(!0), m(!0), y(null));
				try {
					const A =
						e.action === "archive" || e.action === "unarchive"
							? await n.mutation(Se.channels.archive, {
									channelId: e.channel._id,
									clientRequestId: l,
									expectedRevision: e.channel.revision,
									archived: e.action === "archive",
								})
							: e.action === "leave"
								? await n.mutation(Se.channel_members.leave, {
										channelId: e.channel._id,
										clientRequestId: l,
										expectedMembershipRevision: e.channel.membershipRevision,
										expectedPrincipalCount: e.channel.memberCount,
									})
								: await n.mutation(Se.channel_members.delete_channel, {
										channelId: e.channel._id,
										clientRequestId: l,
										expectedMembershipRevision: e.channel.membershipRevision,
										expectedPrincipalCount: e.channel.memberCount,
									});
					if (A._nay) {
						(m(!1), y(A._nay.message));
						return;
					}
					(A._yay.kind !== "membership" || !A._yay.pending) && e.onDone();
				} catch {
					y("This change may have reached Chitchat. Retry to check the same request.");
				} finally {
					f(!1);
				}
			}
		},
		D = e.action === "delete" || (e.action === "leave" && e.channel.memberCount === 1);
	return (0, p.jsxs)(Za, {
		labelledBy: u,
		accessUnavailable: !r.refreshing && (!r.ready || b === null),
		onReconnect: r.retry,
		onClose: () => {
			o || e.onClose();
		},
		children: [
			(0, p.jsxs)("h2", {
				id: u,
				className: "dialog-title",
				children: [C, " #", e.channel.name, e.action === "delete" ? " for everyone" : "", "?"],
			}),
			(0, p.jsx)("p", {
				children:
					e.action === "archive"
						? "The channel is hidden from the active list. Its messages stay stored and it can be unarchived any time."
						: e.action === "unarchive"
							? "The channel returns to the active list."
							: D
								? `This deletes the channel for all ${e.channel.memberCount} people in it. Nobody can open it again. Copies in Files follow their own sharing settings. This cannot be undone.`
								: "You stop seeing this channel and its messages. Other people keep it. Somebody who can add people has to add you back. Copies in Files follow their own sharing settings.",
			}),
			E ? (0, p.jsx)("p", { role: "status", children: "Updating channel and transcript access…" }) : null,
			v ? (0, p.jsx)("p", { className: "form-error", role: "alert", children: v }) : null,
			(0, p.jsxs)("div", {
				className: "dialog-actions",
				children: [
					(0, p.jsx)("button", {
						type: "button",
						className: "button",
						"data-dialog-initial": !0,
						disabled: o,
						onClick: e.onClose,
						children: E ? "Close" : "Cancel",
					}),
					(0, p.jsx)("button", {
						type: "button",
						className: `button ${D || e.action === "archive" ? "button-danger" : "button-primary"}`,
						disabled: o || E || !(e.action === "leave" || h ? r.connected : r.canSend),
						onClick: () => void T(),
						children: o ? "Saving…" : h ? "Retry" : `${C} channel`,
					}),
				],
			}),
		],
	});
}
function Qu(...e) {}
function cp(e, n) {
	return GR(e) ? e(XR(n) ? n() : n) : e;
}
function GR(e) {
	return typeof e == "function";
}
function XR(e) {
	return typeof e == "function";
}
function Ai(e, n) {
	return typeof Object.hasOwn == "function" ? Object.hasOwn(e, n) : Object.prototype.hasOwnProperty.call(e, n);
}
function dn(...e) {
	return (...n) => {
		for (const r of e) typeof r == "function" && r(...n);
	};
}
function fp(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function JR(e, n) {
	const r = { ...e };
	for (const u of n) Ai(r, u) && delete r[u];
	return r;
}
function WR(e, n) {
	const r = {};
	for (const u of n) Ai(e, u) && (r[u] = e[u]);
	return r;
}
function dp(e) {
	return e;
}
function gt(e, n) {
	if (!e) throw typeof n != "string" ? new Error("Invariant failed") : new Error(n);
}
function eO(e) {
	return Object.keys(e);
}
function ho(e, ...n) {
	const r = typeof e == "function" ? e(...n) : e;
	return r == null ? !1 : !r;
}
function as(e) {
	return e.disabled || e["aria-disabled"] === !0 || e["aria-disabled"] === "true";
}
function Hr(e) {
	const n = {};
	for (const r in e) e[r] !== void 0 && (n[r] = e[r]);
	return n;
}
function Ee(...e) {
	for (const n of e) if (n !== void 0) return n;
}
function _d(e, n) {
	typeof e == "function" ? e(n) : e && (e.current = n);
}
function tO(e) {
	return !e || !(0, w.isValidElement)(e) ? !1 : "ref" in e.props || "ref" in e;
}
function nO(e) {
	return tO(e) ? { ...e.props }.ref || e.ref : null;
}
function iO(e, n) {
	const r = { ...e };
	for (const u in n) {
		if (!Ai(n, u)) continue;
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
		const l = n[u];
		if (typeof l == "function" && u.startsWith("on")) {
			const o = e[u];
			if (typeof o == "function") {
				r[u] = (...f) => {
					(l(...f), o(...f));
				};
				continue;
			}
		}
		r[u] = l;
	}
	return r;
}
var Pa = rO();
function rO() {
	var e;
	return typeof window < "u" && !!((e = window.document) != null && e.createElement);
}
function it(e) {
	return e ? ("self" in e ? e.document : e.ownerDocument || document) : document;
}
function hp(e) {
	return e ? ("self" in e ? e.self : it(e).defaultView || window) : self;
}
function Ri(e, n = !1) {
	const { activeElement: r } = it(e);
	if (!r?.nodeName) return null;
	if (Qd(r) && r.contentDocument) return Ri(r.contentDocument.body, n);
	if (n) {
		const u = r.getAttribute("aria-activedescendant");
		if (u) {
			const l = it(r).getElementById(u);
			if (l) return l;
		}
	}
	return r;
}
function At(e, n) {
	return e === n || e.contains(n);
}
function Qd(e) {
	return e.tagName === "IFRAME";
}
function rr(e) {
	const n = e.tagName.toLowerCase();
	return n === "button" ? !0 : n === "input" && e.type ? aO.indexOf(e.type) !== -1 : !1;
}
var aO = ["button", "color", "file", "image", "reset", "submit"];
function mp(e) {
	if (typeof e.checkVisibility == "function") return e.checkVisibility();
	const n = e;
	return n.offsetWidth > 0 || n.offsetHeight > 0 || e.getClientRects().length > 0;
}
function Jn(e) {
	try {
		const n = e instanceof HTMLInputElement && e.selectionStart !== null,
			r = e.tagName === "TEXTAREA";
		return n || r || !1;
	} catch {
		return !1;
	}
}
function xd(e) {
	return e.isContentEditable || Jn(e);
}
function uO(e) {
	if (Jn(e)) return e.value;
	if (e.isContentEditable) {
		const n = it(e).createRange();
		return (n.selectNodeContents(e), n.toString());
	}
	return "";
}
function Ed(e) {
	let n = 0,
		r = 0;
	if (Jn(e)) ((n = e.selectionStart || 0), (r = e.selectionEnd || 0));
	else if (e.isContentEditable) {
		const u = it(e).getSelection();
		if (u?.rangeCount && u.anchorNode && At(e, u.anchorNode) && u.focusNode && At(e, u.focusNode)) {
			const l = u.getRangeAt(0),
				o = l.cloneRange();
			(o.selectNodeContents(e),
				o.setEnd(l.startContainer, l.startOffset),
				(n = o.toString().length),
				o.setEnd(l.endContainer, l.endOffset),
				(r = o.toString().length));
		}
	}
	return { start: n, end: r };
}
function mo(e, n) {
	const r = ["dialog", "menu", "listbox", "tree", "grid"],
		u = e?.getAttribute("role");
	return u && r.indexOf(u) !== -1 ? u : n;
}
function vp(e, n) {
	var r;
	const u = { menu: "menuitem", listbox: "option", tree: "treeitem" },
		l = mo(e);
	return l && (r = u[l]) != null ? r : n;
}
function Pd(e) {
	if (!e) return null;
	const n = (r) => r === "auto" || r === "scroll";
	if (e.clientHeight && e.scrollHeight > e.clientHeight) {
		const { overflowY: r } = getComputedStyle(e);
		if (n(r)) return e;
	} else if (e.clientWidth && e.scrollWidth > e.clientWidth) {
		const { overflowX: r } = getComputedStyle(e);
		if (n(r)) return e;
	}
	return Pd(e.parentElement) || document.scrollingElement || document.body;
}
function nd(e, ...n) {
	/text|search|password|tel|url/i.test(e.type) && e.setSelectionRange(...n);
}
function gp(e, n) {
	const r = e.map((l, o) => [o, l]);
	let u = !1;
	return (
		r.sort(([l, o], [f, h]) => {
			const m = n(o),
				v = n(h);
			return m === v || !m || !v ? 0 : sO(m, v) ? (l > f && (u = !0), -1) : (l < f && (u = !0), 1);
		}),
		u ? r.map(([l, o]) => o) : e
	);
}
function sO(e, n) {
	return !!(n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
function yp() {
	return Pa && !!navigator.maxTouchPoints;
}
function Yd() {
	return Pa ? /mac|iphone|ipad|ipod/i.test(navigator.platform) : !1;
}
function vo() {
	return Pa && Yd() && /apple/i.test(navigator.vendor);
}
function lO() {
	return Pa && /firefox\//i.test(navigator.userAgent);
}
function oO() {
	return Pa && navigator.platform.startsWith("Mac") && !yp();
}
function bp(e) {
	return !!(e.currentTarget && !At(e.currentTarget, e.target));
}
function _n(e) {
	return e.target === e.currentTarget;
}
function pp(e) {
	const n = e.currentTarget;
	if (!n) return !1;
	const r = Yd();
	if ((r && !e.metaKey) || (!r && !e.ctrlKey)) return !1;
	const u = n.tagName.toLowerCase();
	return u === "a" || (u === "button" && n.type === "submit") || (u === "input" && n.type === "submit");
}
function Sp(e) {
	const n = e.currentTarget;
	if (!n) return !1;
	const r = n.tagName.toLowerCase();
	return e.altKey ? r === "a" || (r === "button" && n.type === "submit") || (r === "input" && n.type === "submit") : !1;
}
function cO(e, n, r) {
	const u = new Event(n, r);
	return e.dispatchEvent(u);
}
function Na(e, n) {
	const r = new FocusEvent("blur", n),
		u = e.dispatchEvent(r),
		l = { ...n, bubbles: !0 };
	return (e.dispatchEvent(new FocusEvent("focusout", l)), u);
}
function fO(e, n, r) {
	const u = new KeyboardEvent(n, r);
	return e.dispatchEvent(u);
}
function c0(e, n) {
	const r = new MouseEvent("click", n);
	return e.dispatchEvent(r);
}
function zr(e, n) {
	const r = n || e.currentTarget,
		u = e.relatedTarget;
	return !u || !At(r, u);
}
function Ia(e, n, r, u) {
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
function Qt(e, n, r, u = window) {
	const l = [];
	try {
		u.document.addEventListener(e, n, r);
		for (const f of Array.from(u.frames)) l.push(Qt(e, n, r, f));
	} catch {}
	return () => {
		try {
			u.document.removeEventListener(e, n, r);
		} catch {}
		for (const f of l) f();
	};
}
var Fd = { ...w },
	f0 = Fd.useId,
	bk = Fd.useDeferredValue,
	d0 = Fd.useInsertionEffect,
	He = Pa ? w.useLayoutEffect : w.useEffect;
function dO(e) {
	const [n] = (0, w.useState)(e);
	return n;
}
function wp(e) {
	const n = (0, w.useRef)(e);
	return (
		He(() => {
			n.current = e;
		}),
		n
	);
}
function _e(e) {
	const n = (0, w.useRef)(() => {
		throw new Error("Cannot call an event handler while rendering.");
	});
	return (
		d0
			? d0(() => {
					n.current = e;
				})
			: (n.current = e),
		(0, w.useCallback)((...r) => {
			var u;
			return (u = n.current) == null ? void 0 : u.call(n, ...r);
		}, [])
	);
}
function hO(e) {
	const [n, r] = (0, w.useState)(null);
	return (
		He(() => {
			if (n == null || !e) return;
			let u = null;
			return (
				e((l) => ((u = l), n)),
				() => {
					e(u);
				}
			);
		}, [n, e]),
		[n, r]
	);
}
function yt(...e) {
	return (0, w.useMemo)(() => {
		if (e.some(Boolean))
			return (n) => {
				for (const r of e) _d(r, n);
			};
	}, e);
}
function Oi(e) {
	if (f0) {
		const u = f0();
		return e || u;
	}
	const [n, r] = (0, w.useState)(e);
	return (
		He(() => {
			if (e || n) return;
			const u = Math.random().toString(36).slice(2, 8);
			r(`id-${u}`);
		}, [e, n]),
		e || n
	);
}
function _p(e, n) {
	const r = (o) => {
			if (typeof o == "string") return o;
		},
		[u, l] = (0, w.useState)(() => r(n));
	return (
		He(() => {
			const o = e && "current" in e ? e.current : e;
			l(o?.tagName.toLowerCase() || r(n));
		}, [e, n]),
		u
	);
}
function mO(e, n, r) {
	const u = dO(r),
		[l, o] = (0, w.useState)(u);
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
		l
	);
}
function Ya(e, n) {
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
function vO(e, n) {
	const r = (0, w.useRef)(!1);
	(He(() => {
		if (r.current) return e();
		r.current = !0;
	}, n),
		He(
			() => () => {
				r.current = !1;
			},
			[],
		));
}
function xp() {
	return (0, w.useReducer)(() => [], []);
}
function ut(e) {
	return _e(typeof e == "function" ? e : () => e);
}
function Pt(e, n, r = []) {
	const u = (0, w.useCallback)((l) => (e.wrapElement && (l = e.wrapElement(l)), n(l)), [...r, e.wrapElement]);
	return { ...e, wrapElement: u };
}
function Kd(e = !1, n) {
	const [r, u] = (0, w.useState)(null);
	return { portalRef: yt(u, n), portalNode: r, domReady: !e || r };
}
function Ep(e, n, r) {
	const u = e.onLoadedMetadataCapture,
		l = (0, w.useMemo)(() => Object.assign(() => {}, { ...u, [n]: r }), [u, n, r]);
	return [u?.[n], { onLoadedMetadataCapture: l }];
}
var h0 = !1;
function Gd() {
	return (
		(0, w.useEffect)(() => {
			h0 ||
				(Qt("mousemove", yO, !0),
				Qt("mousedown", Bl, !0),
				Qt("mouseup", Bl, !0),
				Qt("keydown", Bl, !0),
				Qt("scroll", Bl, !0),
				(h0 = !0));
		}, []),
		_e(() => Xd)
	);
}
var Xd = !1,
	m0 = 0,
	v0 = 0;
function gO(e) {
	const n = e.movementX || e.screenX - m0,
		r = e.movementY || e.screenY - v0;
	return ((m0 = e.screenX), (v0 = e.screenY), n || r || !1);
}
function yO(e) {
	gO(e) && (Xd = !0);
}
function Bl() {
	Xd = !1;
}
function De(e) {
	const n = w.forwardRef((r, u) => e({ ...r, ref: u }));
	return ((n.displayName = e.displayName || e.name), n);
}
function go(e, n) {
	return w.memo(e, n);
}
function Ue(e, n) {
	const { wrapElement: r, render: u, ...l } = n,
		o = yt(n.ref, nO(u));
	let f;
	if (w.isValidElement(u)) {
		const h = { ...u.props, ref: o };
		f = w.cloneElement(u, iO(l, h));
	} else u ? (f = u(l)) : (f = (0, p.jsx)(e, { ...l }));
	return r ? r(f) : f;
}
function Le(e) {
	const n = (r = {}) => e(r);
	return ((n.displayName = e.name), n);
}
function Wn(e = [], n = []) {
	const r = w.createContext(void 0),
		u = w.createContext(void 0),
		l = () => w.useContext(r),
		o = (v = !1) => {
			const y = w.useContext(u),
				_ = l();
			return v ? y : y || _;
		},
		f = () => {
			const v = w.useContext(u),
				y = l();
			if (!(v && v === y)) return y;
		},
		h = (v) => e.reduceRight((y, _) => (0, p.jsx)(_, { ...v, children: y }), (0, p.jsx)(r.Provider, { ...v }));
	return {
		context: r,
		scopedContext: u,
		useContext: l,
		useScopedContext: o,
		useProviderContext: f,
		ContextProvider: h,
		ScopedContextProvider: (v) =>
			(0, p.jsx)(h, {
				...v,
				children: n.reduceRight((y, _) => (0, p.jsx)(_, { ...v, children: y }), (0, p.jsx)(u.Provider, { ...v })),
			}),
	};
}
var us = Wn(),
	bO = us.useContext,
	pk = us.useScopedContext,
	Sk = us.useProviderContext,
	pO = us.ContextProvider,
	SO = us.ScopedContextProvider,
	ss = Wn([pO], [SO]),
	yo = ss.useContext,
	wk = ss.useScopedContext,
	wO = ss.useProviderContext,
	ls = ss.ContextProvider,
	bo = ss.ScopedContextProvider,
	_O = (0, w.createContext)(void 0),
	xO = (0, w.createContext)(void 0),
	os = Wn([ls], [bo]),
	EO = os.useContext,
	CO = os.useScopedContext,
	_k = os.useProviderContext,
	xk = os.ContextProvider,
	Ek = os.ScopedContextProvider,
	Ck = (0, w.createContext)(void 0),
	cs = Wn(),
	Tk = cs.useContext,
	Ak = cs.useScopedContext,
	Jd = cs.useProviderContext,
	TO = cs.ContextProvider,
	AO = cs.ScopedContextProvider,
	fs = Wn([TO], [AO]),
	Rk = fs.useContext,
	Ok = fs.useScopedContext,
	po = fs.useProviderContext,
	RO = fs.ContextProvider,
	Wd = fs.ScopedContextProvider,
	OO = (0, w.createContext)(void 0),
	NO = (0, w.createContext)(void 0),
	ds = Wn([RO], [Wd]),
	Nk = ds.useContext,
	Mk = ds.useScopedContext,
	So = ds.useProviderContext,
	Cp = ds.ContextProvider,
	wo = ds.ScopedContextProvider,
	hs = Wn([Cp], [wo]),
	zk = hs.useContext,
	kk = hs.useScopedContext,
	eh = hs.useProviderContext,
	MO = hs.ContextProvider,
	Tp = hs.ScopedContextProvider,
	ms = Wn([ls, MO], [bo, Tp]),
	Ap = ms.useContext,
	zO = ms.useScopedContext,
	_o = ms.useProviderContext,
	Rp = ms.ContextProvider,
	kO = ms.ScopedContextProvider,
	Dk = (0, w.createContext)(void 0),
	DO = { id: null };
function jO(e, n, r = !1) {
	const u = e.findIndex((l) => l.id === n);
	return [...e.slice(u + 1), ...(r ? [DO] : []), ...e.slice(0, u)];
}
function qO(e, n) {
	return e.find((r) => (n ? !r.disabled && r.id !== n : !r.disabled));
}
function tr(e, n) {
	return (n && e.item(n)) || null;
}
function IO(e) {
	const n = [];
	for (const r of e) {
		const u = n.find((l) => {
			var o;
			return ((o = l[0]) == null ? void 0 : o.rowId) === r.rowId;
		});
		u ? u.push(r) : n.push([r]);
	}
	return n;
}
function UO(e, n = !1) {
	if (Jn(e)) e.setSelectionRange(n ? e.value.length : 0, e.value.length);
	else if (e.isContentEditable) {
		const r = it(e).getSelection();
		(r?.selectAllChildren(e), n && r?.collapseToEnd());
	}
}
var Cd = Symbol("FOCUS_SILENTLY");
function LO(e) {
	((e[Cd] = !0), e.focus({ preventScroll: !0 }));
}
function $O(e) {
	const n = e[Cd];
	return (delete e[Cd], n);
}
function Pu(e, n, r) {
	if (!n || n === r) return !1;
	const u = e.item(n.id);
	return !(!u || (r && u.element === r));
}
var BO = "div",
	Ei = "";
function id() {
	Ei = "";
}
function VO(e) {
	const n = e.target;
	return n && Jn(n)
		? !1
		: e.key === " " && Ei.length
			? !0
			: e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey && /^[\p{Letter}\p{Number}]$/u.test(e.key);
}
function HO(e, n) {
	if (_n(e)) return !0;
	const r = e.target;
	return r ? n.some((u) => u.element === r) : !1;
}
function ZO(e) {
	return e.filter((n) => !n.disabled);
}
function Ql(e, n) {
	var r;
	const u = ((r = e.element) == null ? void 0 : r.textContent) || e.children || ("value" in e && e.value);
	return u ? fp(u).trim().toLowerCase().startsWith(n.toLowerCase()) : !1;
}
function QO(e, n, r) {
	if (!r) return e;
	const u = e.find((l) => l.id === r);
	return !u || !Ql(u, n) || (Ei !== n && Ql(u, Ei))
		? e
		: ((Ei = n),
			jO(
				e.filter((l) => Ql(l, Ei)),
				r,
			).filter((l) => l.id !== r));
}
var th = Le(function ({ store: n, typeahead: r = !0, ...u }) {
		const l = yo();
		((n = n || l), gt(n, !1));
		const o = u.onKeyDownCapture,
			f = (0, w.useRef)(0),
			h = _e((m) => {
				if ((o?.(m), m.defaultPrevented || !r || !n)) return;
				if (!VO(m)) return id();
				const { renderedItems: v, items: y, activeId: _, id: b } = n.getState();
				let S = ZO(y.length > v.length ? y : v);
				const E = it(m.currentTarget),
					C = `[data-offscreen-id="${b}"]`,
					T = E.querySelectorAll(C);
				for (const N of T) {
					const R = N.ariaDisabled === "true" || ("disabled" in N && !!N.disabled);
					S.push({ id: N.id, element: N, disabled: R });
				}
				if ((T.length && (S = gp(S, (N) => N.element)), !HO(m, S))) return id();
				(m.preventDefault(),
					window.clearTimeout(f.current),
					(f.current = window.setTimeout(() => {
						Ei = "";
					}, 500)));
				const D = m.key.toLowerCase();
				((Ei += D), (S = QO(S, D, _)));
				const A = S.find((N) => Ql(N, Ei));
				A ? n.move(A.id) : id();
			});
		return ((u = { ...u, onKeyDownCapture: h }), Hr(u));
	}),
	jk = De(function (n) {
		return Ue(BO, th(n));
	});
function Zr(e, n) {
	const r = e.__unstableInternals;
	return (gt(r, "Invalid store"), r[n]);
}
function Vn(e, ...n) {
	let r = e,
		u = r,
		l = Symbol(),
		o = Qu;
	const f = new Set(),
		h = new Set(),
		m = new Set(),
		v = new Set(),
		y = new Set(),
		_ = new WeakMap(),
		b = new WeakMap(),
		S = (z) => (m.add(z), () => m.delete(z)),
		E = () => {
			const z = f.size,
				U = Symbol();
			f.add(U);
			const L = () => {
				(f.delete(U), !f.size && o());
			};
			if (z) return L;
			const Q = eO(r).map((F) =>
					dn(
						...n.map((ne) => {
							var k;
							const H = (k = ne?.getState) == null ? void 0 : k.call(ne);
							if (H && Ai(H, F))
								return Ft(ne, [F], (B) => {
									I(F, B[F], !0);
								});
						}),
					),
				),
				ie = [];
			for (const F of m) ie.push(F());
			const X = n.map(nh);
			return ((o = dn(...Q, ...ie, ...X)), L);
		},
		C = (z, U, L = v) => (
			L.add(U),
			b.set(U, z),
			() => {
				var Q;
				((Q = _.get(U)) == null || Q(), _.delete(U), b.delete(U), L.delete(U));
			}
		),
		T = (z, U) => C(z, U),
		D = (z, U) => (_.set(U, U(r, r)), C(z, U)),
		A = (z, U) => (_.set(U, U(r, u)), C(z, U, y)),
		N = (z) => Vn(WR(r, z), j),
		R = (z) => Vn(JR(r, z), j),
		$ = () => r,
		I = (z, U, L = !1) => {
			var Q;
			if (!Ai(r, z)) return;
			const ie = cp(U, r[z]);
			if (ie === r[z]) return;
			if (!L) for (const k of n) (Q = k?.setState) == null || Q.call(k, z, ie);
			const X = r;
			r = { ...r, [z]: ie };
			const F = Symbol();
			((l = F), h.add(z));
			const ne = (k, H, B) => {
				var ue;
				const fe = b.get(k),
					Ie = (O) => (B ? B.has(O) : O === z);
				(!fe || fe.some(Ie)) && ((ue = _.get(k)) == null || ue(), _.set(k, k(r, H)));
			};
			for (const k of v) ne(k, X);
			queueMicrotask(() => {
				if (l !== F) return;
				const k = r;
				for (const H of y) ne(H, u, h);
				((u = k), h.clear());
			});
		},
		j = {
			getState: $,
			setState: I,
			__unstableInternals: { setup: S, init: E, subscribe: T, sync: D, batch: A, pick: N, omit: R },
		};
	return j;
}
function Wt(e, ...n) {
	if (e) return Zr(e, "setup")(...n);
}
function nh(e, ...n) {
	if (e) return Zr(e, "init")(...n);
}
function ih(e, ...n) {
	if (e) return Zr(e, "subscribe")(...n);
}
function Ft(e, ...n) {
	if (e) return Zr(e, "sync")(...n);
}
function eo(e, ...n) {
	if (e) return Zr(e, "batch")(...n);
}
function rh(e, ...n) {
	if (e) return Zr(e, "omit")(...n);
}
function Op(e, ...n) {
	if (e) return Zr(e, "pick")(...n);
}
function xo(...e) {
	var n;
	const r = {};
	for (const l of e) {
		const o = (n = l?.getState) == null ? void 0 : n.call(l);
		o && Object.assign(r, o);
	}
	const u = Vn(r, ...e);
	return Object.assign({}, ...e, u);
}
var PO = jn((e) => {
		var n = ao();
		function r(b, S) {
			return (b === S && (b !== 0 || 1 / b === 1 / S)) || (b !== b && S !== S);
		}
		var u = typeof Object.is == "function" ? Object.is : r,
			l = n.useState,
			o = n.useEffect,
			f = n.useLayoutEffect,
			h = n.useDebugValue;
		function m(b, S) {
			var E = S(),
				C = l({ inst: { value: E, getSnapshot: S } }),
				T = C[0].inst,
				D = C[1];
			return (
				f(
					function () {
						((T.value = E), (T.getSnapshot = S), v(T) && D({ inst: T }));
					},
					[b, E, S],
				),
				o(
					function () {
						return (
							v(T) && D({ inst: T }),
							b(function () {
								v(T) && D({ inst: T });
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
			var S = b.getSnapshot;
			b = b.value;
			try {
				var E = S();
				return !u(b, E);
			} catch {
				return !0;
			}
		}
		function y(b, S) {
			return S();
		}
		var _ = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? y : m;
		e.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : _;
	}),
	YO = jn((e, n) => {
		n.exports = PO();
	}),
	FO = X0(YO(), 1),
	{ useSyncExternalStore: Np } = FO.default,
	Mp = () => () => {};
function Tt(e, n = dp) {
	const r = w.useCallback((l) => (e ? ih(e, null, l) : Mp()), [e]),
		u = () => {
			const l = typeof n == "string" ? n : null,
				o = typeof n == "function" ? n : null,
				f = e?.getState();
			if (o) return o(f);
			if (f && l && Ai(f, l)) return f[l];
		};
	return Np(r, u, u);
}
function zp(e, n) {
	const r = w.useRef({}),
		u = w.useCallback((o) => (e ? ih(e, null, o) : Mp()), [e]),
		l = () => {
			const o = e?.getState();
			let f = !1;
			const h = r.current;
			for (const m in n) {
				const v = n[m];
				if (typeof v == "function") {
					const y = v(o);
					y !== h[m] && ((h[m] = y), (f = !0));
				}
				if (typeof v == "string") {
					if (!o || !Ai(o, v)) continue;
					const y = o[v];
					y !== h[m] && ((h[m] = y), (f = !0));
				}
			}
			return (f && (r.current = { ...h }), r.current);
		};
	return Np(u, l, l);
}
function vt(e, n, r, u) {
	const l = Ai(n, r) ? n[r] : void 0,
		o = wp({ value: l, setValue: u ? n[u] : void 0 });
	(He(
		() =>
			Ft(e, [r], (f, h) => {
				const { value: m, setValue: v } = o.current;
				v && f[r] !== h[r] && f[r] !== m && v(f[r]);
			}),
		[e, r],
	),
		He(() => {
			if (l !== void 0)
				return (
					e.setState(r, l),
					eo(e, [r], () => {
						l !== void 0 && e.setState(r, l);
					})
				);
		}));
}
function Eo(e, n) {
	const [r, u] = w.useState(() => e(n));
	He(() => nh(r), [r]);
	const l = w.useCallback((o) => Tt(r, o), [r]);
	return [
		w.useMemo(() => ({ ...r, useState: l }), [r, l]),
		_e(() => {
			u((o) => e({ ...n, ...o.getState() }));
		}),
	];
}
var KO = "div";
function g0(e, n) {
	const r = setTimeout(n, e);
	return () => clearTimeout(r);
}
function GO(e) {
	let n = requestAnimationFrame(() => {
		n = requestAnimationFrame(e);
	});
	return () => cancelAnimationFrame(n);
}
function y0(...e) {
	return e
		.join(", ")
		.split(", ")
		.reduce((n, r) => {
			const u = r.endsWith("ms") ? 1 : 1e3,
				l = Number.parseFloat(r || "0s") * u;
			return l > n ? l : n;
		}, 0);
}
function Co(e, n, r) {
	return !r && n !== !1 && (!e || !!n);
}
var ah = Le(function ({ store: n, alwaysVisible: r, ...u }) {
		const l = Jd();
		((n = n || l), gt(n, !1));
		const o = (0, w.useRef)(null),
			f = Oi(u.id),
			[h, m] = (0, w.useState)(null),
			v = n.useState("open"),
			y = n.useState("mounted"),
			_ = n.useState("animated"),
			b = n.useState("contentElement"),
			S = Tt(n.disclosure, "contentElement");
		(He(() => {
			o.current && n?.setContentElement(o.current);
		}, [n]),
			He(() => {
				let D;
				return (
					n?.setState("animated", (A) => ((D = A), !0)),
					() => {
						D !== void 0 && n?.setState("animated", D);
					}
				);
			}, [n]),
			He(() => {
				if (_) {
					if (!b?.isConnected) {
						m(null);
						return;
					}
					return GO(() => {
						m(v ? "enter" : y ? "leave" : null);
					});
				}
			}, [_, b, v, y]),
			He(() => {
				if (!n || !_ || !h || !b) return;
				const D = () => n?.setState("animating", !1),
					A = () => (0, Xu.flushSync)(D);
				if ((h === "leave" && v) || (h === "enter" && !v)) return;
				if (typeof _ == "number") return g0(_, A);
				const {
						transitionDuration: N,
						animationDuration: R,
						transitionDelay: $,
						animationDelay: I,
					} = getComputedStyle(b),
					{
						transitionDuration: j = "0",
						animationDuration: z = "0",
						transitionDelay: U = "0",
						animationDelay: L = "0",
					} = S ? getComputedStyle(S) : {},
					Q = y0($, I, U, L) + y0(N, R, j, z);
				if (!Q) {
					(h === "enter" && n.setState("animated", !1), D());
					return;
				}
				return g0(Math.max(Q - 1e3 / 60, 0), A);
			}, [n, _, b, S, v, h]),
			(u = Pt(u, (D) => (0, p.jsx)(Wd, { value: n, children: D }), [n])));
		const E = Co(y, u.hidden, r),
			C = u.style,
			T = (0, w.useMemo)(() => (E ? { ...C, display: "none" } : C), [E, C]);
		return (
			(u = {
				id: f,
				"data-open": v || void 0,
				"data-enter": h === "enter" || void 0,
				"data-leave": h === "leave" || void 0,
				hidden: E,
				...u,
				ref: yt(f ? n.setContentElement : null, o, u.ref),
				style: T,
			}),
			Hr(u)
		);
	}),
	XO = De(function (n) {
		return Ue(KO, ah(n));
	}),
	qk = De(function ({ unmountOnHide: n, ...r }) {
		const u = Jd();
		return Tt(r.store || u, (l) => !n || l?.mounted) === !1 ? null : (0, p.jsx)(XO, { ...r });
	}),
	kp = (0, w.createContext)(!0),
	To =
		"input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], summary, iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])";
function JO(e) {
	return Number.parseInt(e.getAttribute("tabindex") || "0", 10) < 0;
}
function $n(e) {
	return !(!e.matches(To) || !mp(e) || e.closest("[inert]"));
}
function Ba(e) {
	if (!$n(e) || JO(e)) return !1;
	if (!("form" in e) || !e.form || e.checked || e.type !== "radio") return !0;
	const n = e.form.elements.namedItem(e.name);
	if (!n || !("length" in n)) return !0;
	const r = Ri(e);
	return !r || r === e || !("form" in r) || r.form !== e.form || r.name !== e.name;
}
function uh(e, n) {
	const r = Array.from(e.querySelectorAll(To));
	n && r.unshift(e);
	const u = r.filter($n);
	return (
		u.forEach((l, o) => {
			if (Qd(l) && l.contentDocument) {
				const f = l.contentDocument.body;
				u.splice(o, 1, ...uh(f));
			}
		}),
		u
	);
}
function Ao(e, n, r) {
	const u = Array.from(e.querySelectorAll(To)),
		l = u.filter(Ba);
	return (
		n && Ba(e) && l.unshift(e),
		l.forEach((o, f) => {
			if (Qd(o) && o.contentDocument) {
				const h = o.contentDocument.body,
					m = Ao(h, !1, r);
				l.splice(f, 1, ...m);
			}
		}),
		!l.length && r ? u : l
	);
}
function WO(e, n, r) {
	const [u] = Ao(e, n, r);
	return u || null;
}
function e2(e, n, r, u) {
	const l = Ri(e),
		o = uh(e, n),
		f = o.indexOf(l),
		h = o.slice(f + 1);
	return h.find(Ba) || (r ? o.find(Ba) : null) || (u ? h[0] : null) || null;
}
function rd(e, n) {
	return e2(document.body, !1, e, n);
}
function t2(e, n, r, u) {
	const l = Ri(e),
		o = uh(e, n).reverse(),
		f = o.indexOf(l),
		h = o.slice(f + 1);
	return h.find(Ba) || (r ? o.find(Ba) : null) || (u ? h[0] : null) || null;
}
function b0(e, n) {
	return t2(document.body, !1, e, n);
}
function n2(e) {
	for (; e && !$n(e); ) e = e.closest(To);
	return e || null;
}
function Ur(e) {
	const n = Ri(e);
	if (!n) return !1;
	if (n === e) return !0;
	const r = n.getAttribute("aria-activedescendant");
	return r ? r === e.id : !1;
}
function ir(e) {
	const n = Ri(e);
	if (!n) return !1;
	if (At(e, n)) return !0;
	const r = n.getAttribute("aria-activedescendant");
	return !r || !("id" in e) ? !1 : r === e.id ? !0 : !!e.querySelector(`#${CSS.escape(r)}`);
}
function Dp(e) {
	!ir(e) && $n(e) && e.focus();
}
function i2(e) {
	var n;
	const r = (n = e.getAttribute("tabindex")) != null ? n : "";
	(e.setAttribute("data-tabindex", r), e.setAttribute("tabindex", "-1"));
}
function r2(e, n) {
	const r = Ao(e, n);
	for (const u of r) i2(u);
}
function a2(e) {
	const n = e.querySelectorAll("[data-tabindex]"),
		r = (u) => {
			const l = u.getAttribute("data-tabindex");
			(u.removeAttribute("data-tabindex"), l ? u.setAttribute("tabindex", l) : u.removeAttribute("tabindex"));
		};
	e.hasAttribute("data-tabindex") && r(e);
	for (const u of n) r(u);
}
function u2(e, n) {
	"scrollIntoView" in e
		? (e.focus({ preventScroll: !0 }), e.scrollIntoView({ block: "nearest", inline: "nearest", ...n }))
		: e.focus();
}
var s2 = "div",
	p0 = vo(),
	l2 = [
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
	jp = Symbol("safariFocusAncestor");
function o2(e) {
	return e ? !!e[jp] : !1;
}
function S0(e, n) {
	e && (e[jp] = n);
}
function c2(e) {
	const { tagName: n, readOnly: r, type: u } = e;
	return (n === "TEXTAREA" && !r) || (n === "SELECT" && !r)
		? !0
		: n === "INPUT" && !r
			? l2.includes(u)
			: !!(e.isContentEditable || (e.getAttribute("role") === "combobox" && e.dataset.name));
}
function f2(e) {
	return "labels" in e ? e.labels : null;
}
function w0(e) {
	return e.tagName.toLowerCase() === "input" && e.type ? e.type === "radio" || e.type === "checkbox" : !1;
}
function d2(e) {
	return e ? e === "button" || e === "summary" || e === "input" || e === "select" || e === "textarea" || e === "a" : !0;
}
function h2(e) {
	return e ? e === "button" || e === "input" || e === "select" || e === "textarea" : !0;
}
function m2(e, n, r, u, l) {
	return e ? (n ? (r && !u ? -1 : void 0) : r ? l : l || 0) : l;
}
function ad(e, n) {
	return _e((r) => {
		(e?.(r), !r.defaultPrevented && n && (r.stopPropagation(), r.preventDefault()));
	});
}
var _0 = !1,
	sh = !0;
function v2(e) {
	const n = e.target;
	n && "hasAttribute" in n && (n.hasAttribute("data-focus-visible") || (sh = !1));
}
function g2(e) {
	e.metaKey || e.ctrlKey || e.altKey || (sh = !0);
}
var vs = Le(function ({ focusable: n = !0, accessibleWhenDisabled: r, autoFocus: u, onFocusVisible: l, ...o }) {
		const f = (0, w.useRef)(null);
		((0, w.useEffect)(() => {
			n && (_0 || (Qt("mousedown", v2, !0), Qt("keydown", g2, !0), (_0 = !0)));
		}, [n]),
			p0 &&
				(0, w.useEffect)(() => {
					if (!n) return;
					const F = f.current;
					if (!F || !w0(F)) return;
					const ne = f2(F);
					if (!ne) return;
					const k = () => queueMicrotask(() => F.focus());
					for (const H of ne) H.addEventListener("mouseup", k);
					return () => {
						for (const H of ne) H.removeEventListener("mouseup", k);
					};
				}, [n]));
		const h = n && as(o),
			m = !!h && !r,
			[v, y] = (0, w.useState)(!1);
		((0, w.useEffect)(() => {
			n && m && v && y(!1);
		}, [n, m, v]),
			(0, w.useEffect)(() => {
				if (!n || !v) return;
				const F = f.current;
				if (!F || typeof IntersectionObserver > "u") return;
				const ne = new IntersectionObserver(() => {
					$n(F) || y(!1);
				});
				return (ne.observe(F), () => ne.disconnect());
			}, [n, v]));
		const _ = ad(o.onKeyPressCapture, h),
			b = ad(o.onMouseDownCapture, h),
			S = ad(o.onClickCapture, h),
			E = o.onMouseDown,
			C = _e((F) => {
				if ((E?.(F), F.defaultPrevented || !n)) return;
				const ne = F.currentTarget;
				if (!p0 || bp(F) || (!rr(ne) && !w0(ne))) return;
				let k = !1;
				const H = () => {
					k = !0;
				};
				ne.addEventListener("focusin", H, { capture: !0, once: !0 });
				const B = n2(ne.parentElement);
				(S0(B, !0),
					Ia(ne, "mouseup", () => {
						(ne.removeEventListener("focusin", H, !0), S0(B, !1), !k && Dp(ne));
					}));
			}),
			T = (F, ne) => {
				if ((ne && (F.currentTarget = ne), !n)) return;
				const k = F.currentTarget;
				k && Ur(k) && (l?.(F), !F.defaultPrevented && ((k.dataset.focusVisible = "true"), y(!0)));
			},
			D = o.onKeyDownCapture,
			A = _e((F) => {
				if ((D?.(F), F.defaultPrevented || !n || v || F.metaKey || F.altKey || F.ctrlKey || !_n(F))) return;
				const ne = F.currentTarget;
				Ia(ne, "focusout", () => T(F, ne));
			}),
			N = o.onFocusCapture,
			R = _e((F) => {
				if ((N?.(F), F.defaultPrevented || !n)) return;
				if (!_n(F)) {
					y(!1);
					return;
				}
				const ne = F.currentTarget,
					k = () => T(F, ne);
				sh || c2(F.target) ? Ia(F.target, "focusout", k) : y(!1);
			}),
			$ = o.onBlur,
			I = _e((F) => {
				($?.(F), n && zr(F) && (F.currentTarget.removeAttribute("data-focus-visible"), y(!1)));
			}),
			j = (0, w.useContext)(kp),
			z = _e((F) => {
				n &&
					u &&
					F &&
					j &&
					queueMicrotask(() => {
						Ur(F) || ($n(F) && F.focus());
					});
			}),
			U = _p(f),
			L = n && d2(U),
			Q = n && h2(U),
			ie = o.style,
			X = (0, w.useMemo)(() => (m ? { pointerEvents: "none", ...ie } : ie), [m, ie]);
		return (
			(o = {
				"data-focus-visible": (n && v) || void 0,
				"data-autofocus": u || void 0,
				"aria-disabled": h || void 0,
				...o,
				ref: yt(f, z, o.ref),
				style: X,
				tabIndex: m2(n, m, L, Q, o.tabIndex),
				disabled: Q && m ? !0 : void 0,
				contentEditable: h ? void 0 : o.contentEditable,
				onKeyPressCapture: _,
				onClickCapture: S,
				onMouseDownCapture: b,
				onMouseDown: C,
				onKeyDownCapture: A,
				onFocusCapture: R,
				onBlur: I,
			}),
			Hr(o)
		);
	}),
	Ik = De(function (n) {
		return Ue(s2, vs(n));
	});
function qp(e) {
	const n = [];
	for (const r of e) n.push(...r);
	return n;
}
function Td(e) {
	return e.slice().reverse();
}
var y2 = "div";
function b2(e) {
	return e.some((n) => !!n.rowId);
}
function p2(e) {
	const n = e.target;
	return n && !Jn(n) ? !1 : e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
function S2(e) {
	return e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta";
}
function x0(e, n, r) {
	return _e((u) => {
		var l;
		if ((n?.(u), u.defaultPrevented || u.isPropagationStopped() || !_n(u) || S2(u) || p2(u))) return;
		const o = (l = tr(e, e.getState().activeId)) == null ? void 0 : l.element;
		if (!o) return;
		const { view: f, ...h } = u;
		(o !== r?.current && o.focus(),
			fO(o, u.type, h) || u.preventDefault(),
			u.currentTarget.contains(o) && u.stopPropagation());
	});
}
function w2(e) {
	return qO(qp(Td(IO(e))));
}
function _2(e) {
	const [n, r] = (0, w.useState)(!1),
		u = (0, w.useCallback)(() => r(!0), []),
		l = e.useState((o) => tr(e, o.activeId));
	return (
		(0, w.useEffect)(() => {
			const o = l?.element;
			n && o && (r(!1), o.focus({ preventScroll: !0 }));
		}, [l, n]),
		u
	);
}
var lh = Le(function ({ store: n, composite: r = !0, focusOnMove: u = r, moveOnKeyPress: l = !0, ...o }) {
		const f = wO();
		((n = n || f), gt(n, !1));
		const h = (0, w.useRef)(null),
			m = (0, w.useRef)(null),
			v = _2(n),
			y = n.useState("moves"),
			[, _] = hO(r ? n.setBaseElement : null);
		((0, w.useEffect)(() => {
			var U;
			if (!n || !y || !r || !u) return;
			const { activeId: L } = n.getState(),
				Q = (U = tr(n, L)) == null ? void 0 : U.element;
			Q && u2(Q);
		}, [n, y, r, u]),
			He(() => {
				if (!n || !y || !r) return;
				const { baseElement: U, activeId: L } = n.getState();
				if (L !== null || !U) return;
				const Q = m.current;
				((m.current = null), Q && Na(Q, { relatedTarget: U }), Ur(U) || U.focus());
			}, [n, y, r]));
		const b = n.useState("activeId"),
			S = n.useState("virtualFocus");
		He(() => {
			var U;
			if (!n || !r || !S) return;
			const L = m.current;
			if (((m.current = null), !L)) return;
			const Q = ((U = tr(n, b)) == null ? void 0 : U.element) || Ri(L);
			Q !== L && Na(L, { relatedTarget: Q });
		}, [n, b, S, r]);
		const E = x0(n, o.onKeyDownCapture, m),
			C = x0(n, o.onKeyUpCapture, m),
			T = o.onFocusCapture,
			D = _e((U) => {
				if ((T?.(U), U.defaultPrevented || !n)) return;
				const { virtualFocus: L } = n.getState();
				if (!L) return;
				const Q = U.relatedTarget,
					ie = $O(U.currentTarget);
				_n(U) && ie && (U.stopPropagation(), (m.current = Q));
			}),
			A = o.onFocus,
			N = _e((U) => {
				if ((A?.(U), U.defaultPrevented || !r || !n)) return;
				const { relatedTarget: L } = U,
					{ virtualFocus: Q } = n.getState();
				Q ? _n(U) && !Pu(n, L) && queueMicrotask(v) : _n(U) && n.setActiveId(null);
			}),
			R = o.onBlurCapture,
			$ = _e((U) => {
				var L;
				if ((R?.(U), U.defaultPrevented || !n)) return;
				const { virtualFocus: Q, activeId: ie } = n.getState();
				if (!Q) return;
				const X = (L = tr(n, ie)) == null ? void 0 : L.element,
					F = U.relatedTarget,
					ne = Pu(n, F),
					k = m.current;
				((m.current = null),
					_n(U) && ne
						? (F === X ? k && k !== F && Na(k, U) : X ? Na(X, U) : k && Na(k, U), U.stopPropagation())
						: !Pu(n, U.target) && X && Na(X, U));
			}),
			I = o.onKeyDown,
			j = ut(l),
			z = _e((U) => {
				var L;
				if ((I?.(U), U.nativeEvent.isComposing || U.defaultPrevented || !n || !_n(U))) return;
				const { orientation: Q, renderedItems: ie, activeId: X } = n.getState(),
					F = tr(n, X);
				if ((L = F?.element) != null && L.isConnected) return;
				const ne = Q !== "horizontal",
					k = Q !== "vertical",
					H = b2(ie);
				if (
					(U.key === "ArrowLeft" || U.key === "ArrowRight" || U.key === "Home" || U.key === "End") &&
					Jn(U.currentTarget)
				)
					return;
				const ue = {
					ArrowUp:
						(H || ne) &&
						(() => {
							if (H) {
								const fe = w2(ie);
								return fe?.id;
							}
							return n?.last();
						}),
					ArrowRight: (H || k) && n.first,
					ArrowDown: (H || ne) && n.first,
					ArrowLeft: (H || k) && n.last,
					Home: n.first,
					End: n.last,
					PageUp: n.first,
					PageDown: n.last,
				}[U.key];
				if (ue) {
					const fe = ue();
					if (fe !== void 0) {
						if (!j(U)) return;
						(U.preventDefault(), n.move(fe));
					}
				}
			});
		return (
			(o = Pt(o, (U) => (0, p.jsx)(ls, { value: n, children: U }), [n])),
			(o = {
				"aria-activedescendant": n.useState((U) => {
					var L;
					if (n && r && U.virtualFocus) return (L = tr(n, U.activeId)) == null ? void 0 : L.id;
				}),
				...o,
				ref: yt(h, _, o.ref),
				onKeyDownCapture: E,
				onKeyUpCapture: C,
				onFocusCapture: D,
				onFocus: N,
				onBlurCapture: $,
				onKeyDown: z,
			}),
			(o = vs({ focusable: n.useState((U) => r && (U.virtualFocus || U.activeId === null)), ...o })),
			o
		);
	}),
	Uk = De(function (n) {
		return Ue(y2, lh(n));
	}),
	x2 = "div";
function E2({ store: e, ...n }) {
	const [r, u] = (0, w.useState)(void 0),
		l = n["aria-label"],
		o = Tt(e, "disclosureElement"),
		f = Tt(e, "contentElement");
	return (
		(0, w.useEffect)(() => {
			const h = o;
			if (!h) return;
			const m = f;
			m && (l || m.hasAttribute("aria-label") ? u(void 0) : h.id && u(h.id));
		}, [l, o, f]),
		r
	);
}
var Ip = Le(function ({ store: n, alwaysVisible: r, composite: u, ...l }) {
		const o = _o();
		((n = n || o), gt(n, !1));
		const f = n.parent,
			h = n.menubar,
			m = !!f,
			v = Oi(l.id),
			y = l.onKeyDown,
			_ = n.useState((R) => R.placement.split("-")[0]),
			b = n.useState((R) => (R.orientation === "both" ? void 0 : R.orientation)),
			S = b !== "vertical",
			E = Tt(h, (R) => !!R && R.orientation !== "vertical"),
			C = _e((R) => {
				if ((y?.(R), !R.defaultPrevented)) {
					if (m || (h && !S)) {
						const $ = {
							ArrowRight: () => _ === "left" && !S,
							ArrowLeft: () => _ === "right" && !S,
							ArrowUp: () => _ === "bottom" && S,
							ArrowDown: () => _ === "top" && S,
						}[R.key];
						if ($?.()) return (R.stopPropagation(), R.preventDefault(), n?.hide());
					}
					if (h) {
						const $ = {
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
							I = $?.();
						I !== void 0 && (R.stopPropagation(), R.preventDefault(), h.move(I));
					}
				}
			});
		l = Pt(l, (R) => (0, p.jsx)(kO, { value: n, children: R }), [n]);
		const T = E2({ store: n, ...l }),
			D = Co(n.useState("mounted"), l.hidden, r),
			A = D ? { ...l.style, display: "none" } : l.style;
		l = {
			id: v,
			"aria-labelledby": T,
			hidden: D,
			...l,
			ref: yt(v ? n.setContentElement : null, l.ref),
			style: A,
			onKeyDown: C,
		};
		const N = !!n.combobox;
		return (
			(u = u ?? !N),
			u && (l = { role: "menu", "aria-orientation": b, ...l }),
			(l = lh({ store: n, composite: u, ...l })),
			(l = th({ store: n, typeahead: !N, ...l })),
			l
		);
	}),
	Lk = De(function (n) {
		return Ue(x2, Ip(n));
	});
function ud(e) {
	return [e.clientX, e.clientY];
}
function E0(e, n) {
	const [r, u] = e;
	let l = !1;
	const o = n.length;
	for (let f = o, h = 0, m = f - 1; h < f; m = h++) {
		const [v, y] = n[h],
			[_, b] = n[m],
			[, S] = n[m === 0 ? f - 1 : m - 1] || [0, 0],
			E = (y - b) * (r - v) - (v - _) * (u - y);
		if (b < y) {
			if (u >= b && u < y) {
				if (E === 0) return !0;
				E > 0 && (u === b ? u > S && (l = !l) : (l = !l));
			}
		} else if (y < b) {
			if (u > y && u <= b) {
				if (E === 0) return !0;
				E < 0 && (u === b ? u < S && (l = !l) : (l = !l));
			}
		} else if (u === y && ((r >= _ && r <= v) || (r >= v && r <= _))) return !0;
	}
	return l;
}
function C2(e, n) {
	const { top: r, right: u, bottom: l, left: o } = n,
		[f, h] = e;
	return [f < o ? "left" : f > u ? "right" : null, h < r ? "top" : h > l ? "bottom" : null];
}
function C0(e, n) {
	const r = e.getBoundingClientRect(),
		{ top: u, right: l, bottom: o, left: f } = r,
		[h, m] = C2(n, r),
		v = [n];
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
var T0 = (0, w.createContext)(null),
	T2 = "span",
	Up = Le(function (n) {
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
	$k = De(function (n) {
		return Ue(T2, Up(n));
	}),
	A2 = "span",
	R2 = Le(function (n) {
		return (
			(n = {
				"data-focus-trap": "",
				tabIndex: 0,
				"aria-hidden": !0,
				...n,
				style: { position: "fixed", top: 0, left: 0, ...n.style },
			}),
			(n = Up(n)),
			n
		);
	}),
	Vl = De(function (n) {
		return Ue(A2, R2(n));
	}),
	O2 = "div";
function N2(e) {
	return it(e).body;
}
function M2(e, n) {
	return n ? (typeof n == "function" ? n(e) : n) : it(e).createElement("div");
}
function z2(e = "id") {
	return `${e ? `${e}-` : ""}${Math.random().toString(36).slice(2, 8)}`;
}
function er(e) {
	queueMicrotask(() => {
		e?.focus();
	});
}
var Lp = Le(function ({
		preserveTabOrder: n,
		preserveTabOrderAnchor: r,
		portalElement: u,
		portalRef: l,
		portal: o = !0,
		...f
	}) {
		const h = (0, w.useRef)(null),
			m = yt(h, f.ref),
			v = (0, w.useContext)(T0),
			[y, _] = (0, w.useState)(null),
			[b, S] = (0, w.useState)(null),
			E = (0, w.useRef)(null),
			C = (0, w.useRef)(null),
			T = (0, w.useRef)(null),
			D = (0, w.useRef)(null);
		return (
			He(() => {
				const A = h.current;
				if (!A || !o) {
					_(null);
					return;
				}
				const N = M2(A, u);
				if (!N) {
					_(null);
					return;
				}
				const R = N.isConnected;
				if ((R || (v || N2(A)).appendChild(N), N.id || (N.id = A.id ? `portal/${A.id}` : z2()), _(N), _d(l, N), !R))
					return () => {
						(N.remove(), _d(l, null));
					};
			}, [o, u, v, l]),
			He(() => {
				if (!o || !n || !r) return;
				const A = it(r).createElement("span");
				return (
					(A.style.position = "fixed"),
					r.insertAdjacentElement("afterend", A),
					S(A),
					() => {
						(A.remove(), S(null));
					}
				);
			}, [o, n, r]),
			(0, w.useEffect)(() => {
				if (!y || !n) return;
				let A = 0;
				const N = (R) => {
					if (!zr(R)) return;
					const $ = R.type === "focusin";
					if ((cancelAnimationFrame(A), $)) return a2(y);
					A = requestAnimationFrame(() => {
						r2(y, !0);
					});
				};
				return (
					y.addEventListener("focusin", N, !0),
					y.addEventListener("focusout", N, !0),
					() => {
						(cancelAnimationFrame(A),
							y.removeEventListener("focusin", N, !0),
							y.removeEventListener("focusout", N, !0));
					}
				);
			}, [y, n]),
			(f = Pt(
				f,
				(A) => {
					if (((A = (0, p.jsx)(T0.Provider, { value: y || v, children: A })), !o)) return A;
					if (!y) return (0, p.jsx)("span", { ref: m, id: f.id, style: { position: "fixed" }, hidden: !0 });
					((A = (0, p.jsxs)(p.Fragment, {
						children: [
							n &&
								y &&
								(0, p.jsx)(Vl, {
									ref: C,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-before",
									onFocus: (R) => {
										zr(R, y) ? er(rd()) : er(E.current);
									},
								}),
							A,
							n &&
								y &&
								(0, p.jsx)(Vl, {
									ref: T,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-after",
									onFocus: (R) => {
										zr(R, y) ? er(b0()) : er(D.current);
									},
								}),
						],
					})),
						y && (A = (0, Xu.createPortal)(A, y)));
					let N = (0, p.jsxs)(p.Fragment, {
						children: [
							n &&
								y &&
								(0, p.jsx)(Vl, {
									ref: E,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-before",
									onFocus: (R) => {
										R.relatedTarget !== D.current && zr(R, y) ? er(C.current) : er(b0());
									},
								}),
							n && (0, p.jsx)("span", { "aria-owns": y?.id, style: { position: "fixed" } }),
							n &&
								y &&
								(0, p.jsx)(Vl, {
									ref: D,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-after",
									onFocus: (R) => {
										if (zr(R, y)) er(T.current);
										else {
											const $ = rd();
											if ($ === C.current) {
												requestAnimationFrame(() => {
													var I;
													return (I = rd()) == null ? void 0 : I.focus();
												});
												return;
											}
											er($);
										}
									},
								}),
						],
					});
					return (b && n && (N = (0, Xu.createPortal)(N, b)), (0, p.jsxs)(p.Fragment, { children: [N, A] }));
				},
				[y, v, o, f.id, n, b],
			)),
			(f = { ...f, ref: m }),
			f
		);
	}),
	Bk = De(function (n) {
		return Ue(O2, Lp(n));
	}),
	A0 = (0, w.createContext)(0);
function k2({ level: e, children: n }) {
	const r = (0, w.useContext)(A0),
		u = Math.max(Math.min(e || r + 1, 6), 1);
	return (0, p.jsx)(A0.Provider, { value: u, children: n });
}
var D2 = "div",
	$p = Le(function ({ autoFocusOnShow: n = !0, ...r }) {
		return ((r = Pt(r, (u) => (0, p.jsx)(kp.Provider, { value: n, children: u }), [n])), r);
	}),
	Vk = De(function (n) {
		return Ue(D2, $p(n));
	});
function j2(e, n) {
	const r = it(e).createElement("button");
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
function q2(e) {
	const n = (0, w.useRef)();
	return (
		(0, w.useEffect)(() => {
			if (!e) {
				n.current = null;
				return;
			}
			return Qt(
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
var sd = new WeakMap();
function gs(e, n, r) {
	sd.has(e) || sd.set(e, new Map());
	const u = sd.get(e),
		l = u.get(n);
	if (!l)
		return (
			u.set(n, r()),
			() => {
				var h;
				((h = u.get(n)) == null || h(), u.delete(n));
			}
		);
	const o = r(),
		f = () => {
			(o(), l(), u.delete(n));
		};
	return (
		u.set(n, f),
		() => {
			u.get(n) === f && (o(), u.set(n, l));
		}
	);
}
function oh(e, n, r) {
	return gs(e, n, () => {
		const l = e.getAttribute(n);
		return (
			e.setAttribute(n, r),
			() => {
				l == null ? e.removeAttribute(n) : e.setAttribute(n, l);
			}
		);
	});
}
function Lr(e, n, r) {
	return gs(e, n, () => {
		const l = n in e,
			o = e[n];
		return (
			(e[n] = r),
			() => {
				l ? (e[n] = o) : delete e[n];
			}
		);
	});
}
function Ad(e, n) {
	return e
		? gs(e, "style", () => {
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
function I2(e, n, r) {
	return e
		? gs(e, n, () => {
				const l = e.style.getPropertyValue(n);
				return (
					e.style.setProperty(n, r),
					() => {
						l ? e.style.setProperty(n, l) : e.style.removeProperty(n);
					}
				);
			})
		: () => {};
}
var U2 = ["SCRIPT", "STYLE"];
function Rd(e) {
	return `__ariakit-dialog-snapshot-${e}`;
}
function L2(e, n) {
	const r = it(n),
		u = Rd(e);
	if (!r.body[u]) return !0;
	do {
		if (n === r.body) return !1;
		if (n[u]) return !0;
		if (!n.parentElement) return !1;
		n = n.parentElement;
	} while (!0);
}
function $2(e, n, r) {
	return U2.includes(n.tagName) || !L2(e, n) ? !1 : !r.some((u) => u && At(n, u));
}
function ch(e, n, r, u) {
	for (let l of n) {
		if (!l?.isConnected) continue;
		const o = n.some((m) => (!m || m === l ? !1 : m.contains(l))),
			f = it(l),
			h = l;
		for (; l.parentElement && l !== f.body; ) {
			if ((u?.(l.parentElement, h), !o)) for (const m of l.parentElement.children) $2(e, m, n) && r(m, h);
			l = l.parentElement;
		}
	}
}
function B2(e, n) {
	const { body: r } = it(n[0]),
		u = [];
	return (
		ch(e, n, (o) => {
			u.push(Lr(o, Rd(e), !0));
		}),
		dn(Lr(r, Rd(e), !0), () => {
			for (const o of u) o();
		})
	);
}
function Bp(e, ...n) {
	if (!e) return !1;
	const r = e.getAttribute("data-backdrop");
	return r == null ? !1 : r === "" || r === "true" || !n.length ? !0 : n.some((u) => r === u);
}
function Va(e = "", n = !1) {
	return `__ariakit-dialog-${n ? "ancestor" : "outside"}${e ? `-${e}` : ""}`;
}
function V2(e, n = "") {
	return dn(Lr(e, Va(), !0), Lr(e, Va(n), !0));
}
function Vp(e, n = "") {
	return dn(Lr(e, Va("", !0), !0), Lr(e, Va(n, !0), !0));
}
function fh(e, n) {
	const r = Va(n, !0);
	if (e[r]) return !0;
	const u = Va(n);
	do {
		if (e[u]) return !0;
		if (!e.parentElement) return !1;
		e = e.parentElement;
	} while (!0);
}
function R0(e, n) {
	const r = [],
		u = n.map((o) => o?.id);
	return (
		ch(
			e,
			n,
			(o) => {
				Bp(o, ...u) || r.unshift(V2(o, e));
			},
			(o, f) => {
				(f.hasAttribute("data-dialog") && f.id !== e) || r.unshift(Vp(o, e));
			},
		),
		() => {
			for (const o of r) o();
		}
	);
}
function H2(e) {
	return e.tagName === "HTML" ? !0 : At(it(e).body, e);
}
function Z2(e, n) {
	if (!e) return !1;
	if (At(e, n)) return !0;
	const r = n.getAttribute("aria-activedescendant");
	if (r) {
		const u = it(e).getElementById(r);
		if (u) return At(e, u);
	}
	return !1;
}
function Q2(e, n) {
	if (!("clientY" in e)) return !1;
	const r = n.getBoundingClientRect();
	return r.width === 0 || r.height === 0
		? !1
		: r.top <= e.clientY && e.clientY <= r.top + r.height && r.left <= e.clientX && e.clientX <= r.left + r.width;
}
function ld({ store: e, type: n, listener: r, capture: u, domReady: l }) {
	const o = _e(r),
		f = Tt(e, "open"),
		h = (0, w.useRef)(!1);
	(He(() => {
		if (!f || !l) return;
		const { contentElement: m } = e.getState();
		if (!m) return;
		const v = () => {
			h.current = !0;
		};
		return (m.addEventListener("focusin", v, !0), () => m.removeEventListener("focusin", v, !0));
	}, [e, f, l]),
		(0, w.useEffect)(
			() =>
				f
					? Qt(
							n,
							(v) => {
								const { contentElement: y, disclosureElement: _ } = e.getState(),
									b = v.target;
								y &&
									b &&
									H2(b) &&
									(At(y, b) ||
										Z2(_, b) ||
										b.hasAttribute("data-focus-trap") ||
										Q2(v, y) ||
										(h.current && !fh(b, y.id)) ||
										o2(b) ||
										o(v));
							},
							u,
						)
					: void 0,
			[f, u],
		));
}
function od(e, n) {
	return typeof e == "function" ? e(n) : !!e;
}
function P2(e, n, r) {
	const u = q2(Tt(e, "open")),
		l = { store: e, domReady: r, capture: !0 };
	(ld({
		...l,
		type: "click",
		listener: (o) => {
			const { contentElement: f } = e.getState(),
				h = u.current;
			h && mp(h) && fh(h, f?.id) && od(n, o) && e.hide();
		},
	}),
		ld({
			...l,
			type: "focusin",
			listener: (o) => {
				const { contentElement: f } = e.getState();
				f && o.target !== it(f) && od(n, o) && e.hide();
			},
		}),
		ld({
			...l,
			type: "contextmenu",
			listener: (o) => {
				od(n, o) && e.hide();
			},
		}));
}
var O0 = (0, w.createContext)({});
function Y2(e) {
	const n = (0, w.useContext)(O0),
		[r, u] = (0, w.useState)([]),
		l = (0, w.useCallback)(
			(f) => {
				var h;
				return (
					u((m) => [...m, f]),
					dn((h = n.add) == null ? void 0 : h.call(n, f), () => {
						u((m) => m.filter((v) => v !== f));
					})
				);
			},
			[n],
		);
	He(
		() =>
			Ft(e, ["open", "contentElement"], (f) => {
				var h;
				if (f.open && f.contentElement) return (h = n.add) == null ? void 0 : h.call(n, e);
			}),
		[e, n],
	);
	const o = (0, w.useMemo)(() => ({ store: e, add: l }), [e, l]);
	return {
		wrapElement: (0, w.useCallback)((f) => (0, p.jsx)(O0.Provider, { value: o, children: f }), [o]),
		nestedDialogs: r,
	};
}
function F2({ attribute: e, contentId: n, contentElement: r, enabled: u }) {
	const [l, o] = xp(),
		f = (0, w.useCallback)(() => {
			if (!u || !r) return !1;
			const { body: h } = it(r),
				m = h.getAttribute(e);
			return !m || m === n;
		}, [l, u, r, e, n]);
	return (
		(0, w.useEffect)(() => {
			if (!u || !n || !r) return;
			const { body: h } = it(r);
			if (f()) return (h.setAttribute(e, n), () => h.removeAttribute(e));
			const m = new MutationObserver(() => (0, Xu.flushSync)(o));
			return (m.observe(h, { attributeFilter: [e] }), () => m.disconnect());
		}, [l, u, n, r, f, e]),
		f
	);
}
function K2(e) {
	const n = e.getBoundingClientRect().left;
	return Math.round(n) + e.scrollLeft ? "paddingLeft" : "paddingRight";
}
function G2(e, n, r) {
	const u = F2({ attribute: "data-dialog-prevent-body-scroll", contentElement: e, contentId: n, enabled: r });
	(0, w.useEffect)(() => {
		if (!u() || !e) return;
		const l = it(e),
			o = hp(e),
			{ documentElement: f, body: h } = l,
			m = f.style.getPropertyValue("--scrollbar-width"),
			v = m ? Number.parseInt(m, 10) : o.innerWidth - f.clientWidth,
			y = () => I2(f, "--scrollbar-width", `${v}px`),
			_ = K2(f),
			b = () => Ad(h, { overflow: "hidden", [_]: `${v}px` }),
			S = () => {
				var C, T;
				const { scrollX: D, scrollY: A, visualViewport: N } = o,
					R = (C = N?.offsetLeft) != null ? C : 0,
					$ = (T = N?.offsetTop) != null ? T : 0,
					I = Ad(h, {
						position: "fixed",
						overflow: "hidden",
						top: `${-(A - Math.floor($))}px`,
						left: `${-(D - Math.floor(R))}px`,
						right: "0",
						[_]: `${v}px`,
					});
				return () => {
					(I(), o.scrollTo({ left: D, top: A, behavior: "instant" }));
				};
			},
			E = Yd() && !oO();
		return dn(y(), E ? S() : b());
	}, [u, e]);
}
function X2(e, ...n) {
	if (!e) return !1;
	const r = e.getAttribute("data-focus-trap");
	return r == null ? !1 : n.length ? (r === "" ? !1 : n.some((u) => r === u)) : !0;
}
function Hp() {
	return "inert" in HTMLElement.prototype;
}
function J2(e) {
	return oh(e, "aria-hidden", "true");
}
function Zp(e, n) {
	return "style" in e
		? Hp()
			? Lr(e, "inert", !0)
			: dn(
					...Ao(e, !0).map((r) => {
						if (n?.some((l) => l && At(l, r))) return Qu;
						const u = gs(
							r,
							"focus",
							() => (
								(r.focus = Qu),
								() => {
									delete r.focus;
								}
							),
						);
						return dn(oh(r, "tabindex", "-1"), u);
					}),
					J2(e),
					Ad(e, { pointerEvents: "none", userSelect: "none", cursor: "default" }),
				)
		: Qu;
}
function W2(e, n) {
	const r = [],
		u = n.map((o) => o?.id);
	return (
		ch(
			e,
			n,
			(o) => {
				Bp(o, ...u) || X2(o, ...u) || r.unshift(Zp(o, n));
			},
			(o) => {
				o.hasAttribute("role") && (n.some((f) => f && At(f, o)) || r.unshift(oh(o, "role", "none")));
			},
		),
		() => {
			for (const o of r) o();
		}
	);
}
function Qp(e = {}) {
	const n = xo(e.store, rh(e.disclosure, ["contentElement", "disclosureElement"]));
	const r = n?.getState(),
		u = Ee(e.open, r?.open, e.defaultOpen, !1),
		l = Ee(e.animated, r?.animated, !1),
		o = Vn(
			{
				open: u,
				animated: l,
				animating: !!l && u,
				mounted: u,
				contentElement: Ee(r?.contentElement, null),
				disclosureElement: Ee(r?.disclosureElement, null),
			},
			n,
		);
	return (
		Wt(o, () =>
			Ft(o, ["animated", "animating"], (f) => {
				f.animated || o.setState("animating", !1);
			}),
		),
		Wt(o, () =>
			ih(o, ["open"], () => {
				o.getState().animated && o.setState("animating", !0);
			}),
		),
		Wt(o, () =>
			Ft(o, ["open", "animating"], (f) => {
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
function Pp(e, n, r) {
	return (
		Ya(n, [r.store, r.disclosure]),
		vt(e, r, "open", "setOpen"),
		vt(e, r, "mounted", "setMounted"),
		vt(e, r, "animated"),
		Object.assign(e, { disclosure: r.disclosure })
	);
}
function eN(e = {}) {
	const [n, r] = Eo(Qp, e);
	return Pp(n, r, e);
}
var tN = "div",
	nN = [
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
	Hk = Le(function (n) {
		return n;
	}),
	to = De(function (n) {
		return Ue(tN, n);
	});
Object.assign(
	to,
	nN.reduce(
		(e, n) => (
			(e[n] = De(function (u) {
				return Ue(n, u);
			})),
			e
		),
		{},
	),
);
function iN({ store: e, backdrop: n, alwaysVisible: r, hidden: u }) {
	const l = (0, w.useRef)(null),
		o = eN({ disclosure: e }),
		f = Tt(e, "contentElement");
	((0, w.useEffect)(() => {
		const v = l.current,
			y = f;
		v && y && (v.style.zIndex = getComputedStyle(y).zIndex);
	}, [f]),
		He(() => {
			const v = f?.id;
			if (!v) return;
			const y = l.current;
			if (y) return Vp(y, v);
		}, [f]));
	const h = ah({
		ref: l,
		store: o,
		role: "presentation",
		"data-backdrop": f?.id || "",
		alwaysVisible: r,
		hidden: u ?? void 0,
		style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 },
	});
	if (!n) return null;
	if ((0, w.isValidElement)(n)) return (0, p.jsx)(to, { ...h, render: n });
	const m = typeof n != "boolean" ? n : "div";
	return (0, p.jsx)(to, { ...h, render: (0, p.jsx)(m, {}) });
}
function Yp(e = {}) {
	return Qp(e);
}
function Fp(e, n, r) {
	return Pp(e, n, r);
}
function rN(e = {}) {
	const [n, r] = Eo(Yp, e);
	return Fp(n, r, e);
}
var aN = "div",
	N0 = vo();
function uN(e) {
	const n = Ri();
	return !n || (e && At(e, n)) ? !1 : !!$n(n);
}
function M0(e, n = !1) {
	if (!e) return null;
	const r = "current" in e ? e.current : e;
	return r ? (n ? ($n(r) ? r : null) : r) : null;
}
var Kp = Le(function ({
	store: n,
	open: r,
	onClose: u,
	focusable: l = !0,
	modal: o = !0,
	portal: f = !!o,
	backdrop: h = !!o,
	hideOnEscape: m = !0,
	hideOnInteractOutside: v = !0,
	getPersistentElements: y,
	preventBodyScroll: _ = !!o,
	autoFocusOnShow: b = !0,
	autoFocusOnHide: S = !0,
	initialFocus: E,
	finalFocus: C,
	unmountOnHide: T,
	unstable_treeSnapshotKey: D,
	...A
}) {
	const N = po(),
		R = (0, w.useRef)(null),
		$ = rN({
			store: n || N,
			open: r,
			setOpen(de) {
				if (de) return;
				const Te = R.current;
				if (!Te) return;
				const ot = new Event("close", { bubbles: !1, cancelable: !0 });
				(u && Te.addEventListener("close", u, { once: !0 }),
					Te.dispatchEvent(ot),
					ot.defaultPrevented && $.setOpen(!0));
			},
		}),
		{ portalRef: I, domReady: j } = Kd(f, A.portalRef),
		z = A.preserveTabOrder,
		U = Tt($, (de) => z && !o && de.mounted),
		L = Oi(A.id),
		Q = Tt($, "open"),
		ie = Tt($, "mounted"),
		X = Tt($, "contentElement"),
		F = Co(ie, A.hidden, A.alwaysVisible);
	(G2(X, L, _ && !F), P2($, v, j));
	const { wrapElement: ne, nestedDialogs: k } = Y2($);
	((A = Pt(A, ne, [ne])),
		He(() => {
			if (!Q) return;
			const de = R.current,
				Te = Ri(de, !0);
			Te && Te.tagName !== "BODY" && ((de && At(de, Te)) || $.setDisclosureElement(Te));
		}, [$, Q]),
		N0 &&
			(0, w.useEffect)(() => {
				if (!ie) return;
				const { disclosureElement: de } = $.getState();
				if (!de || !rr(de)) return;
				const Te = () => {
					let ot = !1;
					const Me = () => {
						ot = !0;
					};
					(de.addEventListener("focusin", Me, { capture: !0, once: !0 }),
						Ia(de, "mouseup", () => {
							(de.removeEventListener("focusin", Me, !0), !ot && Dp(de));
						}));
				};
				return (
					de.addEventListener("mousedown", Te),
					() => {
						de.removeEventListener("mousedown", Te);
					}
				);
			}, [$, ie]),
		(0, w.useEffect)(() => {
			if (!ie || !j) return;
			const de = R.current;
			if (!de) return;
			const Te = hp(de),
				ot = Te.visualViewport || Te,
				Me = () => {
					var Dt, bt;
					const ae = (bt = (Dt = Te.visualViewport) == null ? void 0 : Dt.height) != null ? bt : Te.innerHeight;
					de.style.setProperty("--dialog-viewport-height", `${ae}px`);
				};
			return (
				Me(),
				ot.addEventListener("resize", Me),
				() => {
					ot.removeEventListener("resize", Me);
				}
			);
		}, [ie, j]),
		(0, w.useEffect)(() => {
			if (!o || !ie || !j) return;
			const de = R.current;
			if (de && !de.querySelector("[data-dialog-dismiss]")) return j2(de, $.hide);
		}, [$, o, ie, j]),
		He(() => {
			if (!Hp() || Q || !ie || !j) return;
			const de = R.current;
			if (de) return Zp(de);
		}, [Q, ie, j]));
	const H = Q && j;
	He(() => {
		if (!L || !H) return;
		const de = R.current;
		return B2(L, [de]);
	}, [L, H, D]);
	const B = _e(y);
	He(() => {
		if (!L || !H) return;
		const { disclosureElement: de } = $.getState(),
			Te = [R.current, ...(B() || []), ...k.map((ot) => ot.getState().contentElement)];
		return o ? dn(R0(L, Te), W2(L, Te)) : R0(L, [de, ...Te]);
	}, [L, $, H, B, k, o, D]);
	const ue = !!b,
		fe = ut(b),
		[Ie, O] = (0, w.useState)(!1);
	(0, w.useEffect)(() => {
		if (!Q || !ue || !j || !X?.isConnected) return;
		const de = M0(E, !0) || X.querySelector("[data-autofocus=true],[autofocus]") || WO(X, !0, f && U) || X,
			Te = $n(de);
		fe(Te ? de : null) &&
			(O(!0),
			queueMicrotask(() => {
				(de.focus(), N0 && Te && de.scrollIntoView({ block: "nearest", inline: "nearest" }));
			}));
	}, [Q, ue, j, X, E, f, U, fe]);
	const G = !!S,
		re = ut(S),
		[se, me] = (0, w.useState)(!1);
	(0, w.useEffect)(() => {
		if (Q) return (me(!0), () => me(!1));
	}, [Q]);
	const ye = (0, w.useCallback)(
			(de, Te = !0) => {
				const { disclosureElement: ot } = $.getState();
				if (uN(de)) return;
				let Me = M0(C) || ot;
				if (Me?.id) {
					const bt = it(Me),
						ae = `[aria-activedescendant="${Me.id}"]`,
						we = bt.querySelector(ae);
					we && (Me = we);
				}
				if (Me && !$n(Me)) {
					const bt = Me.closest("[data-dialog]");
					if (bt?.id) {
						const ae = it(bt),
							we = `[aria-controls~="${bt.id}"]`,
							dt = ae.querySelector(we);
						dt && (Me = dt);
					}
				}
				const Dt = Me && $n(Me);
				if (!Dt && Te) {
					requestAnimationFrame(() => ye(de, !1));
					return;
				}
				re(Dt ? Me : null) && Dt && Me?.focus({ preventScroll: !0 });
			},
			[$, C, re],
		),
		pe = (0, w.useRef)(!1);
	(He(() => {
		if (Q || !se || !G) return;
		const de = R.current;
		((pe.current = !0), ye(de));
	}, [Q, se, j, G, ye]),
		(0, w.useEffect)(() => {
			if (!se || !G) return;
			const de = R.current;
			return () => {
				if (pe.current) {
					pe.current = !1;
					return;
				}
				ye(de);
			};
		}, [se, G, ye]));
	const Ze = ut(m);
	((0, w.useEffect)(
		() =>
			!j || !ie
				? void 0
				: Qt(
						"keydown",
						(Te) => {
							if (Te.key !== "Escape" || Te.defaultPrevented) return;
							const ot = R.current;
							if (!ot || fh(ot)) return;
							const Me = Te.target;
							if (!Me) return;
							const { disclosureElement: Dt } = $.getState();
							!!(Me.tagName === "BODY" || At(ot, Me) || !Dt || At(Dt, Me)) && Ze(Te) && $.hide();
						},
						!0,
					),
		[$, j, ie, Ze],
	),
		(A = Pt(A, (de) => (0, p.jsx)(k2, { level: o ? 1 : void 0, children: de }), [o])));
	const Ne = A.hidden,
		rt = A.alwaysVisible;
	A = Pt(
		A,
		(de) =>
			h
				? (0, p.jsxs)(p.Fragment, {
						children: [(0, p.jsx)(iN, { store: $, backdrop: h, hidden: Ne, alwaysVisible: rt }), de],
					})
				: de,
		[$, h, Ne, rt],
	);
	const [Nt, Kt] = (0, w.useState)(),
		[zt, kt] = (0, w.useState)();
	return (
		(A = Pt(
			A,
			(de) =>
				(0, p.jsx)(Wd, {
					value: $,
					children: (0, p.jsx)(OO.Provider, {
						value: Kt,
						children: (0, p.jsx)(NO.Provider, { value: kt, children: de }),
					}),
				}),
			[$],
		)),
		(A = {
			id: L,
			"data-dialog": "",
			role: "dialog",
			tabIndex: l ? -1 : void 0,
			"aria-labelledby": Nt,
			"aria-describedby": zt,
			...A,
			ref: yt(R, A.ref),
		}),
		(A = $p({ ...A, autoFocusOnShow: Ie })),
		(A = ah({ store: $, ...A })),
		(A = vs({ ...A, focusable: l })),
		(A = Lp({ portal: f, ...A, portalRef: I, preserveTabOrder: U })),
		A
	);
});
function ys(e, n = po) {
	return De(function (u) {
		const l = n();
		return Tt(u.store || l, (o) => !u.unmountOnHide || o?.mounted || !!u.open) ? (0, p.jsx)(e, { ...u }) : null;
	});
}
var Zk = ys(
		De(function (n) {
			return Ue(aN, Kp(n));
		}),
		po,
	),
	ar = Math.min,
	Ci = Math.max,
	no = Math.round,
	Hl = Math.floor,
	Ti = (e) => ({ x: e, y: e }),
	sN = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Gp(e, n, r) {
	return Ci(e, ar(n, r));
}
function ur(e, n) {
	return typeof e == "function" ? e(n) : e;
}
function sr(e) {
	return e.split("-")[0];
}
function Fa(e) {
	return e.split("-")[1];
}
function dh(e) {
	return e === "x" ? "y" : "x";
}
function hh(e) {
	return e === "y" ? "height" : "width";
}
function Kn(e) {
	const n = e[0];
	return n === "t" || n === "b" ? "y" : "x";
}
function mh(e) {
	return dh(Kn(e));
}
function lN(e, n, r) {
	r === void 0 && (r = !1);
	const u = Fa(e),
		l = mh(e),
		o = hh(l);
	let f = l === "x" ? (u === (r ? "end" : "start") ? "right" : "left") : u === "start" ? "bottom" : "top";
	return (n.reference[o] > n.floating[o] && (f = io(f)), [f, io(f)]);
}
function oN(e) {
	const n = io(e);
	return [Od(e), n, Od(n)];
}
function Od(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var z0 = ["left", "right"],
	k0 = ["right", "left"],
	cN = ["top", "bottom"],
	fN = ["bottom", "top"];
function dN(e, n, r) {
	switch (e) {
		case "top":
		case "bottom":
			return r ? (n ? k0 : z0) : n ? z0 : k0;
		case "left":
		case "right":
			return n ? cN : fN;
		default:
			return [];
	}
}
function hN(e, n, r, u) {
	const l = Fa(e);
	let o = dN(sr(e), r === "start", u);
	return (l && ((o = o.map((f) => f + "-" + l)), n && (o = o.concat(o.map(Od)))), o);
}
function io(e) {
	const n = sr(e);
	return sN[n] + e.slice(n.length);
}
function mN(e) {
	var n, r, u, l;
	return {
		top: (n = e.top) != null ? n : 0,
		right: (r = e.right) != null ? r : 0,
		bottom: (u = e.bottom) != null ? u : 0,
		left: (l = e.left) != null ? l : 0,
	};
}
function Xp(e) {
	return typeof e != "number" ? mN(e) : { top: e, right: e, bottom: e, left: e };
}
function ro(e) {
	const { x: n, y: r, width: u, height: l } = e;
	return { width: u, height: l, top: r, left: n, right: n + u, bottom: r + l, x: n, y: r };
}
function D0(e, n, r) {
	let { reference: u, floating: l } = e;
	const o = Kn(n),
		f = mh(n),
		h = hh(f),
		m = sr(n),
		v = o === "y",
		y = u.x + u.width / 2 - l.width / 2,
		_ = u.y + u.height / 2 - l.height / 2,
		b = u[h] / 2 - l[h] / 2;
	let S;
	switch (m) {
		case "top":
			S = { x: y, y: u.y - l.height };
			break;
		case "bottom":
			S = { x: y, y: u.y + u.height };
			break;
		case "right":
			S = { x: u.x + u.width, y: _ };
			break;
		case "left":
			S = { x: u.x - l.width, y: _ };
			break;
		default:
			S = { x: u.x, y: u.y };
	}
	const E = Fa(n);
	return (E && (S[f] += b * (E === "end" ? 1 : -1) * (r && v ? -1 : 1)), S);
}
async function vN(e, n) {
	var r;
	n === void 0 && (n = {});
	const { x: u, y: l, platform: o, rects: f, elements: h, strategy: m } = e,
		{
			boundary: v = "clippingAncestors",
			rootBoundary: y = "viewport",
			elementContext: _ = "floating",
			altBoundary: b = !1,
			padding: S = 0,
		} = ur(n, e),
		E = Xp(S),
		C = h[b ? (_ === "floating" ? "reference" : "floating") : _],
		T = ro(
			await o.getClippingRect({
				element:
					(r = await (o.isElement == null ? void 0 : o.isElement(C))) == null || r
						? C
						: C.contextElement || (await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(h.floating))),
				boundary: v,
				rootBoundary: y,
				strategy: m,
			}),
		),
		D = _ === "floating" ? { x: u, y: l, width: f.floating.width, height: f.floating.height } : f.reference,
		A = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(h.floating)),
		N = ((await (o.isElement == null ? void 0 : o.isElement(A))) &&
			(await (o.getScale == null ? void 0 : o.getScale(A)))) || { x: 1, y: 1 },
		R = ro(
			o.convertOffsetParentRelativeRectToViewportRelativeRect
				? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
						elements: h,
						rect: D,
						offsetParent: A,
						strategy: m,
					})
				: D,
		);
	return {
		top: (T.top - R.top + E.top) / N.y,
		bottom: (R.bottom - T.bottom + E.bottom) / N.y,
		left: (T.left - R.left + E.left) / N.x,
		right: (R.right - T.right + E.right) / N.x,
	};
}
var gN = 50,
	yN = async (e, n, r) => {
		const { placement: u = "bottom", strategy: l = "absolute", middleware: o = [], platform: f } = r,
			h = f.detectOverflow ? f : { ...f, detectOverflow: vN },
			m = await (f.isRTL == null ? void 0 : f.isRTL(n));
		let v = await f.getElementRects({ reference: e, floating: n, strategy: l }),
			{ x: y, y: _ } = D0(v, u, m),
			b = u,
			S = 0;
		const E = {};
		for (let C = 0; C < o.length; C++) {
			const T = o[C];
			if (!T) continue;
			const { name: D, fn: A } = T,
				{
					x: N,
					y: R,
					data: $,
					reset: I,
				} = await A({
					x: y,
					y: _,
					initialPlacement: u,
					placement: b,
					strategy: l,
					middlewareData: E,
					rects: v,
					platform: h,
					elements: { reference: e, floating: n },
				});
			((y = N ?? y),
				(_ = R ?? _),
				(E[D] = { ...E[D], ...$ }),
				I &&
					S < gN &&
					(S++,
					typeof I == "object" &&
						(I.placement && (b = I.placement),
						I.rects &&
							(v = I.rects === !0 ? await f.getElementRects({ reference: e, floating: n, strategy: l }) : I.rects),
						({ x: y, y: _ } = D0(v, b, m))),
					(C = -1)));
		}
		return { x: y, y: _, placement: b, strategy: l, middlewareData: E };
	},
	bN = (e) => ({
		name: "arrow",
		options: e,
		async fn(n) {
			const { x: r, y: u, placement: l, rects: o, platform: f, elements: h, middlewareData: m } = n,
				{ element: v, padding: y = 0 } = ur(e, n) || {};
			if (v == null) return {};
			const _ = Xp(y),
				b = { x: r, y: u },
				S = mh(l),
				E = hh(S),
				C = await f.getDimensions(v),
				T = S === "y",
				D = T ? "top" : "left",
				A = T ? "bottom" : "right",
				N = T ? "clientHeight" : "clientWidth",
				R = o.reference[E] + o.reference[S] - b[S] - o.floating[E],
				$ = b[S] - o.reference[S],
				I = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(v));
			let j = I ? I[N] : 0;
			(!j || !(await (f.isElement == null ? void 0 : f.isElement(I)))) && (j = h.floating[N] || o.floating[E]);
			const z = R / 2 - $ / 2,
				U = j / 2 - C[E] / 2 - 1,
				L = ar(_[D], U),
				Q = ar(_[A], U),
				ie = j - C[E] - Q,
				X = j / 2 - C[E] / 2 + z,
				F = Gp(L, X, ie),
				ne = !m.arrow && Fa(l) != null && X !== F && o.reference[E] / 2 - (X < L ? L : Q) - C[E] / 2 < 0,
				k = ne ? (X < L ? X - L : X - ie) : 0;
			return { [S]: b[S] + k, data: { [S]: F, centerOffset: X - F - k, ...(ne && { alignmentOffset: k }) }, reset: ne };
		},
	}),
	pN = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "flip",
				options: e,
				async fn(n) {
					var r, u;
					const { placement: l, middlewareData: o, rects: f, initialPlacement: h, platform: m, elements: v } = n,
						{
							mainAxis: y = !0,
							crossAxis: _ = !0,
							fallbackPlacements: b,
							fallbackStrategy: S = "bestFit",
							fallbackAxisSideDirection: E = "none",
							flipAlignment: C = !0,
							...T
						} = ur(e, n);
					if ((r = o.arrow) != null && r.alignmentOffset) return {};
					const D = sr(l),
						A = Kn(h),
						N = sr(h) === h,
						R = await (m.isRTL == null ? void 0 : m.isRTL(v.floating)),
						$ = b || (N || !C ? [io(h)] : oN(h)),
						I = E !== "none";
					!b && I && $.push(...hN(h, C, E, R));
					const j = [h, ...$],
						z = await m.detectOverflow(n, T),
						U = [];
					let L = ((u = o.flip) == null ? void 0 : u.overflows) || [];
					if ((y && U.push(z[D]), _)) {
						const F = lN(l, f, R);
						U.push(z[F[0]], z[F[1]]);
					}
					if (((L = [...L, { placement: l, overflows: U }]), !U.every((F) => F <= 0))) {
						var Q, ie;
						const F = (((Q = o.flip) == null ? void 0 : Q.index) || 0) + 1,
							ne = j[F];
						if (
							ne &&
							(!(_ === "alignment" && A !== Kn(ne)) ||
								L.every((H) => (Kn(H.placement) === A ? H.overflows[0] > 0 : !0)))
						)
							return { data: { index: F, overflows: L }, reset: { placement: ne } };
						let k =
							(ie = L.filter((H) => H.overflows[0] <= 0).sort((H, B) => H.overflows[1] - B.overflows[1])[0]) == null
								? void 0
								: ie.placement;
						if (!k)
							switch (S) {
								case "bestFit": {
									var X;
									const H =
										(X = L.filter((B) => {
											if (I) {
												const ue = Kn(B.placement);
												return ue === A || ue === "y";
											}
											return !0;
										})
											.map((B) => [B.placement, B.overflows.filter((ue) => ue > 0).reduce((ue, fe) => ue + fe, 0)])
											.sort((B, ue) => B[1] - ue[1])[0]) == null
											? void 0
											: X[0];
									H && (k = H);
									break;
								}
								case "initialPlacement":
									k = h;
									break;
							}
						if (l !== k) return { reset: { placement: k } };
					}
					return {};
				},
			}
		);
	},
	Jp = new Set(["left", "top"]);
async function SN(e, n) {
	const { placement: r, platform: u, elements: l } = e,
		o = await (u.isRTL == null ? void 0 : u.isRTL(l.floating)),
		f = sr(r),
		h = Fa(r),
		m = Kn(r) === "y",
		v = Jp.has(f) ? -1 : 1,
		y = o && m ? -1 : 1,
		_ = ur(n, e);
	let {
		mainAxis: b,
		crossAxis: S,
		alignmentAxis: E,
	} = typeof _ == "number"
		? { mainAxis: _, crossAxis: 0, alignmentAxis: null }
		: { mainAxis: _.mainAxis || 0, crossAxis: _.crossAxis || 0, alignmentAxis: _.alignmentAxis };
	return (
		h && typeof E == "number" && (S = h === "end" ? E * -1 : E),
		m ? { x: S * y, y: b * v } : { x: b * v, y: S * y }
	);
}
var wN = function (e) {
		return (
			e === void 0 && (e = 0),
			{
				name: "offset",
				options: e,
				async fn(n) {
					var r, u;
					const { x: l, y: o, placement: f, middlewareData: h } = n,
						m = await SN(n, e);
					return f === ((r = h.offset) == null ? void 0 : r.placement) && (u = h.arrow) != null && u.alignmentOffset
						? {}
						: { x: l + m.x, y: o + m.y, data: { ...m, placement: f } };
				},
			}
		);
	},
	_N = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "shift",
				options: e,
				async fn(n) {
					const { x: r, y: u, placement: l, platform: o } = n,
						{
							mainAxis: f = !0,
							crossAxis: h = !1,
							limiter: m = {
								fn: (A) => {
									let { x: N, y: R } = A;
									return { x: N, y: R };
								},
							},
							...v
						} = ur(e, n),
						y = { x: r, y: u },
						_ = await o.detectOverflow(n, v),
						b = Kn(l),
						S = dh(b);
					let E = y[S],
						C = y[b];
					const T = (A, N) => Gp(N + _[A === "y" ? "top" : "left"], N, N - _[A === "y" ? "bottom" : "right"]);
					(f && (E = T(S, E)), h && (C = T(b, C)));
					const D = m.fn({ ...n, [S]: E, [b]: C });
					return { ...D, data: { x: D.x - r, y: D.y - u, enabled: { [S]: f, [b]: h } } };
				},
			}
		);
	},
	xN = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				options: e,
				fn(n) {
					var r, u;
					const { x: l, y: o, placement: f, rects: h, middlewareData: m } = n,
						{ offset: v = 0, mainAxis: y = !0, crossAxis: _ = !0 } = ur(e, n),
						b = { x: l, y: o },
						S = Kn(f),
						E = dh(S);
					let C = b[E],
						T = b[S];
					const D = ur(v, n),
						A =
							typeof D == "number"
								? { mainAxis: D, crossAxis: 0 }
								: { mainAxis: (r = D.mainAxis) != null ? r : 0, crossAxis: (u = D.crossAxis) != null ? u : 0 };
					if (y) {
						const $ = E === "y" ? "height" : "width",
							I = h.reference[E] - h.floating[$] + A.mainAxis,
							j = h.reference[E] + h.reference[$] - A.mainAxis;
						C < I ? (C = I) : C > j && (C = j);
					}
					if (_) {
						var N, R;
						const $ = E === "y" ? "width" : "height",
							I = Jp.has(sr(f)),
							j =
								h.reference[S] -
								h.floating[$] +
								((I && ((N = m.offset) == null ? void 0 : N[S])) || 0) +
								(I ? 0 : A.crossAxis),
							z =
								h.reference[S] +
								h.reference[$] +
								(I ? 0 : ((R = m.offset) == null ? void 0 : R[S]) || 0) -
								(I ? A.crossAxis : 0);
						T < j ? (T = j) : T > z && (T = z);
					}
					return { [E]: C, [S]: T };
				},
			}
		);
	},
	EN = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "size",
				options: e,
				async fn(n) {
					const { placement: r, rects: u, platform: l, elements: o } = n,
						{ apply: f = () => {}, ...h } = ur(e, n),
						m = await l.detectOverflow(n, h),
						v = sr(r),
						y = Fa(r),
						_ = Kn(r) === "y",
						{ width: b, height: S } = u.floating;
					let E, C;
					v === "top" || v === "bottom"
						? ((E = v),
							(C =
								y === ((await (l.isRTL == null ? void 0 : l.isRTL(o.floating))) ? "start" : "end") ? "left" : "right"))
						: ((C = v), (E = y === "end" ? "top" : "bottom"));
					const T = S - m.top - m.bottom,
						D = b - m.left - m.right,
						A = ar(S - m[E], T),
						N = ar(b - m[C], D),
						R = n.middlewareData.shift,
						$ = !R;
					let I = A,
						j = N;
					(R != null && R.enabled.x && (j = D),
						R != null && R.enabled.y && (I = T),
						$ && !y && (_ ? (j = b - 2 * Ci(m.left, m.right)) : (I = S - 2 * Ci(m.top, m.bottom))),
						await f({ ...n, availableWidth: j, availableHeight: I }));
					const z = await l.getDimensions(o.floating);
					return b !== z.width || S !== z.height ? { reset: { rects: !0 } } : {};
				},
			}
		);
	};
function Ro() {
	return typeof window < "u";
}
function Ka(e) {
	return Wp(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function fn(e) {
	var n;
	return (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) || window;
}
function Ni(e) {
	var n;
	return (n = (Wp(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : n.documentElement;
}
function Wp(e) {
	return Ro() ? e instanceof Node || e instanceof fn(e).Node : !1;
}
function Gn(e) {
	return Ro() ? e instanceof Element || e instanceof fn(e).Element : !1;
}
function cr(e) {
	return Ro() ? e instanceof HTMLElement || e instanceof fn(e).HTMLElement : !1;
}
function j0(e) {
	return !Ro() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof fn(e).ShadowRoot;
}
function Oo(e) {
	const { overflow: n, overflowX: r, overflowY: u, display: l } = Xn(e);
	return /auto|scroll|overlay|hidden|clip/.test(n + u + r) && l !== "inline" && l !== "contents";
}
function CN(e) {
	return /^(table|td|th)$/.test(Ka(e));
}
function No(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var TN = /transform|translate|scale|rotate|perspective|filter/,
	AN = /paint|layout|strict|content/,
	Mr = (e) => !!e && e !== "none",
	cd;
function vh(e) {
	const n = Gn(e) ? Xn(e) : e;
	return (
		Mr(n.transform) ||
		Mr(n.translate) ||
		Mr(n.scale) ||
		Mr(n.rotate) ||
		Mr(n.perspective) ||
		(!gh() && (Mr(n.backdropFilter) || Mr(n.filter))) ||
		TN.test(n.willChange || "") ||
		AN.test(n.contain || "")
	);
}
function RN(e) {
	let n = $r(e);
	for (; cr(n) && !es(n); ) {
		if (vh(n)) return n;
		if (No(n)) return null;
		n = $r(n);
	}
	return null;
}
function gh() {
	return (cd == null && (cd = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), cd);
}
function es(e) {
	return /^(html|body|#document)$/.test(Ka(e));
}
function Xn(e) {
	return fn(e).getComputedStyle(e);
}
function Mo(e) {
	return Gn(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function $r(e) {
	if (Ka(e) === "html") return e;
	const n = e.assignedSlot || e.parentNode || (j0(e) && e.host) || Ni(e);
	return j0(n) ? n.host : n;
}
function eS(e) {
	const n = $r(e);
	return es(n) ? (e.ownerDocument || e).body : cr(n) && Oo(n) ? n : eS(n);
}
function ts(e, n, r) {
	var u;
	(n === void 0 && (n = []), r === void 0 && (r = !0));
	const l = eS(e),
		o = l === ((u = e.ownerDocument) == null ? void 0 : u.body),
		f = fn(l);
	if (o) {
		const h = Nd(f);
		return n.concat(f, f.visualViewport || [], Oo(l) ? l : [], h && r ? ts(h) : []);
	} else return n.concat(l, ts(l, [], r));
}
function Nd(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function tS(e) {
	const n = Xn(e);
	let r = parseFloat(n.width) || 0,
		u = parseFloat(n.height) || 0;
	const l = cr(e),
		o = l ? e.offsetWidth : r,
		f = l ? e.offsetHeight : u,
		h = no(r) !== o || no(u) !== f;
	return (h && ((r = o), (u = f)), { width: r, height: u, $: h });
}
function yh(e) {
	return Gn(e) ? e : e.contextElement;
}
function Ua(e) {
	const n = yh(e);
	if (!cr(n)) return Ti(1);
	const r = n.getBoundingClientRect(),
		{ width: u, height: l, $: o } = tS(n);
	let f = (o ? no(r.width) : r.width) / u,
		h = (o ? no(r.height) : r.height) / l;
	return ((!f || !Number.isFinite(f)) && (f = 1), (!h || !Number.isFinite(h)) && (h = 1), { x: f, y: h });
}
var ON = Ti(0);
function nS(e) {
	const n = fn(e);
	return !gh() || !n.visualViewport ? ON : { x: n.visualViewport.offsetLeft, y: n.visualViewport.offsetTop };
}
function NN(e, n, r) {
	return (n === void 0 && (n = !1), !!r && n && r === fn(e));
}
function Br(e, n, r, u) {
	(n === void 0 && (n = !1), r === void 0 && (r = !1));
	const l = e.getBoundingClientRect(),
		o = yh(e);
	let f = Ti(1);
	n && (u ? Gn(u) && (f = Ua(u)) : (f = Ua(e)));
	const h = NN(o, r, u) ? nS(o) : Ti(0);
	let m = (l.left + h.x) / f.x,
		v = (l.top + h.y) / f.y,
		y = l.width / f.x,
		_ = l.height / f.y;
	if (o && u) {
		const b = fn(o),
			S = Gn(u) ? fn(u) : u;
		let E = b,
			C = Nd(E);
		for (; C && S !== E; ) {
			const T = Ua(C),
				D = C.getBoundingClientRect(),
				A = Xn(C),
				N = D.left + (C.clientLeft + parseFloat(A.paddingLeft)) * T.x,
				R = D.top + (C.clientTop + parseFloat(A.paddingTop)) * T.y;
			((m *= T.x), (v *= T.y), (y *= T.x), (_ *= T.y), (m += N), (v += R), (E = fn(C)), (C = Nd(E)));
		}
	}
	return ro({ width: y, height: _, x: m, y: v });
}
function zo(e, n) {
	const r = Mo(e).scrollLeft;
	return n ? n.left + r : Br(Ni(e)).left + r;
}
function iS(e, n) {
	const r = e.getBoundingClientRect();
	return { x: r.left + n.scrollLeft - zo(e, r), y: r.top + n.scrollTop };
}
function MN(e) {
	let { elements: n, rect: r, offsetParent: u, strategy: l } = e;
	const o = l === "fixed",
		f = Ni(u),
		h = n ? No(n.floating) : !1;
	if (u === f || (h && o)) return r;
	let m = { scrollLeft: 0, scrollTop: 0 },
		v = Ti(1);
	const y = Ti(0),
		_ = cr(u);
	if ((_ || !o) && ((Ka(u) !== "body" || Oo(f)) && (m = Mo(u)), _)) {
		const S = Br(u);
		((v = Ua(u)), (y.x = S.x + u.clientLeft), (y.y = S.y + u.clientTop));
	}
	const b = f && !_ && !o ? iS(f, m) : Ti(0);
	return {
		width: r.width * v.x,
		height: r.height * v.y,
		x: r.x * v.x - m.scrollLeft * v.x + y.x + b.x,
		y: r.y * v.y - m.scrollTop * v.y + y.y + b.y,
	};
}
function zN(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function kN(e) {
	const n = Mo(e),
		r = e.ownerDocument.body,
		u = Ci(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth),
		l = Ci(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
	let o = -n.scrollLeft + zo(e);
	const f = -n.scrollTop;
	return (
		Xn(r).direction === "rtl" && (o += Ci(e.clientWidth, r.clientWidth) - u),
		{ width: u, height: l, x: o, y: f }
	);
}
var DN = 25;
function jN(e, n, r) {
	r === void 0 && (r = "viewport");
	const u = r === "layoutViewport",
		l = fn(e),
		o = Ni(e),
		f = l.visualViewport;
	let h = o.clientWidth,
		m = o.clientHeight,
		v = 0,
		y = 0;
	if (f) {
		const _ = !gh() || n === "fixed";
		u
			? _ || ((v = -f.offsetLeft), (y = -f.offsetTop))
			: ((h = f.width), (m = f.height), _ && ((v = f.offsetLeft), (y = f.offsetTop)));
	}
	if (zo(o) <= 0) {
		const _ = o.ownerDocument,
			b = _.body,
			S = getComputedStyle(b),
			E = (_.compatMode === "CSS1Compat" && parseFloat(S.marginLeft) + parseFloat(S.marginRight)) || 0,
			C = Math.abs(o.clientWidth - b.clientWidth - E),
			T = getComputedStyle(o).scrollbarGutter === "stable both-edges" ? C / 2 : C;
		T <= DN && (h -= T);
	}
	return { width: h, height: m, x: v, y };
}
function qN(e, n) {
	const r = Br(e, !0, n === "fixed"),
		u = r.top + e.clientTop,
		l = r.left + e.clientLeft,
		o = Ua(e);
	return { width: e.clientWidth * o.x, height: e.clientHeight * o.y, x: l * o.x, y: u * o.y };
}
function q0(e, n, r) {
	let u;
	if (n === "viewport" || n === "layoutViewport") u = jN(e, r, n);
	else if (n === "document") u = kN(Ni(e));
	else if (Gn(n)) u = qN(n, r);
	else {
		const l = nS(e);
		u = { x: n.x - l.x, y: n.y - l.y, width: n.width, height: n.height };
	}
	return ro(u);
}
function IN(e, n) {
	const r = n.get(e);
	if (r) return r;
	let u = ts(e, [], !1).filter((h) => Gn(h) && Ka(h) !== "body"),
		l = null;
	const o = Xn(e).position === "fixed";
	let f = o ? $r(e) : e;
	for (; Gn(f) && !es(f); ) {
		const h = Xn(f),
			m = vh(f),
			v = l ? l.position : o ? "fixed" : "";
		(!m && (v === "fixed" || (v === "absolute" && h.position === "static")) ? (u = u.filter((y) => y !== f)) : (l = h),
			(f = $r(f)));
	}
	return (n.set(e, u), u);
}
function UN(e) {
	let { element: n, boundary: r, rootBoundary: u, strategy: l } = e;
	const o = [...(r === "clippingAncestors" ? (No(n) ? [] : IN(n, this._c)) : [].concat(r)), u],
		f = q0(n, o[0], l);
	let h = f.top,
		m = f.right,
		v = f.bottom,
		y = f.left;
	for (let _ = 1; _ < o.length; _++) {
		const b = q0(n, o[_], l);
		((h = Ci(b.top, h)), (m = ar(b.right, m)), (v = ar(b.bottom, v)), (y = Ci(b.left, y)));
	}
	return { width: m - y, height: v - h, x: y, y: h };
}
function LN(e) {
	const { width: n, height: r } = tS(e);
	return { width: n, height: r };
}
function $N(e, n, r) {
	const u = cr(n),
		l = Ni(n),
		o = r === "fixed",
		f = Br(e, !0, o, n);
	let h = { scrollLeft: 0, scrollTop: 0 };
	const m = Ti(0);
	if ((u || !o) && ((Ka(n) !== "body" || Oo(l)) && (h = Mo(n)), u)) {
		const y = Br(n, !0, o, n);
		((m.x = y.x + n.clientLeft), (m.y = y.y + n.clientTop));
	}
	!u && l && (m.x = zo(l));
	const v = l && !u && !o ? iS(l, h) : Ti(0);
	return { x: f.left + h.scrollLeft - m.x - v.x, y: f.top + h.scrollTop - m.y - v.y, width: f.width, height: f.height };
}
function fd(e) {
	return Xn(e).position === "static";
}
function I0(e, n) {
	if (!cr(e) || Xn(e).position === "fixed") return null;
	if (n) return n(e);
	let r = e.offsetParent;
	return (Ni(e) === r && (r = r.ownerDocument.body), r);
}
function rS(e, n) {
	const r = fn(e);
	if (No(e)) return r;
	if (!cr(e)) {
		let l = $r(e);
		for (; l && !es(l); ) {
			if (Gn(l) && !fd(l)) return l;
			l = $r(l);
		}
		return r;
	}
	let u = I0(e, n);
	for (; u && CN(u) && fd(u); ) u = I0(u, n);
	return u && es(u) && fd(u) && !vh(u) ? r : u || RN(e) || r;
}
var BN = async function (e) {
	const n = this.getOffsetParent || rS,
		r = this.getDimensions,
		u = await r(e.floating);
	return {
		reference: $N(e.reference, await n(e.floating), e.strategy),
		floating: { x: 0, y: 0, width: u.width, height: u.height },
	};
};
function VN(e) {
	return Xn(e).direction === "rtl";
}
var HN = {
	convertOffsetParentRelativeRectToViewportRelativeRect: MN,
	getDocumentElement: Ni,
	getClippingRect: UN,
	getOffsetParent: rS,
	getElementRects: BN,
	getClientRects: zN,
	getDimensions: LN,
	getScale: Ua,
	isElement: Gn,
	isRTL: VN,
};
function aS(e, n) {
	return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height;
}
function ZN(e, n, r) {
	let u = null,
		l;
	const o = Ni(e);
	function f() {
		var y;
		(clearTimeout(l), (y = u) == null || y.disconnect(), (u = null));
	}
	function h(y, _) {
		(y === void 0 && (y = !1), _ === void 0 && (_ = 1), f());
		const b = e.getBoundingClientRect(),
			{ left: S, top: E, width: C, height: T } = b;
		if ((y || n(), !C || !T)) return;
		const D = Hl(E),
			A = Hl(o.clientWidth - (S + C)),
			N = Hl(o.clientHeight - (E + T)),
			R = Hl(S),
			$ = { rootMargin: -D + "px " + -A + "px " + -N + "px " + -R + "px", threshold: Ci(0, ar(1, _)) || 1 };
		let I = !0;
		function j(z) {
			const U = z[0].intersectionRatio;
			if (!aS(b, e.getBoundingClientRect())) return h();
			if (U !== _) {
				if (!I) return h();
				U
					? h(!1, U)
					: (l = setTimeout(() => {
							h(!1, 1e-7);
						}, 1e3));
			}
			I = !1;
		}
		try {
			u = new IntersectionObserver(j, { ...$, root: o.ownerDocument });
		} catch {
			u = new IntersectionObserver(j, $);
		}
		u.observe(e);
	}
	const m = fn(e),
		v = () => h(r);
	return (
		m.addEventListener("resize", v),
		h(!0),
		() => {
			(m.removeEventListener("resize", v), f());
		}
	);
}
function QN(e, n, r, u) {
	u === void 0 && (u = {});
	const {
			ancestorScroll: l = !0,
			ancestorResize: o = !0,
			elementResize: f = typeof ResizeObserver == "function",
			layoutShift: h = typeof IntersectionObserver == "function",
			animationFrame: m = !1,
		} = u,
		v = yh(e),
		y = l || o ? [...(v ? ts(v) : []), ...(n ? ts(n) : [])] : [];
	y.forEach((D) => {
		(l && D.addEventListener("scroll", r), o && D.addEventListener("resize", r));
	});
	const _ = v && h ? ZN(v, r, o) : null;
	let b = -1,
		S = null;
	f &&
		((S = new ResizeObserver((D) => {
			let [A] = D;
			(A &&
				A.target === v &&
				S &&
				n &&
				(S.unobserve(n),
				cancelAnimationFrame(b),
				(b = requestAnimationFrame(() => {
					var N;
					(N = S) == null || N.observe(n);
				}))),
				r());
		})),
		v && !m && S.observe(v),
		n && S.observe(n));
	let E,
		C = m ? Br(e) : null;
	m && T();
	function T() {
		const D = Br(e);
		(C && !aS(C, D) && r(), (C = D), (E = requestAnimationFrame(T)));
	}
	return (
		r(),
		() => {
			var D;
			(y.forEach((A) => {
				(l && A.removeEventListener("scroll", r), o && A.removeEventListener("resize", r));
			}),
				_?.(),
				(D = S) == null || D.disconnect(),
				(S = null),
				m && cancelAnimationFrame(E));
		}
	);
}
var PN = wN,
	YN = _N,
	FN = pN,
	KN = EN,
	GN = bN,
	XN = xN,
	JN = (e, n, r) => {
		const u = new Map(),
			l = r ?? {},
			o = { ...HN, ...l.platform, _c: u };
		return yN(e, n, { ...l, platform: o });
	},
	WN = "div";
function U0(e = 0, n = 0, r = 0, u = 0) {
	if (typeof DOMRect == "function") return new DOMRect(e, n, r, u);
	const l = { x: e, y: n, width: r, height: u, top: n, right: e + r, bottom: n + u, left: e };
	return { ...l, toJSON: () => l };
}
function eM(e) {
	if (!e) return U0();
	const { x: n, y: r, width: u, height: l } = e;
	return U0(n, r, u, l);
}
function tM(e, n) {
	return {
		contextElement: e || void 0,
		getBoundingClientRect: () => {
			const r = e,
				u = n?.(r);
			return u || !r ? eM(u) : r.getBoundingClientRect();
		},
	};
}
function nM(e) {
	return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e);
}
function L0(e) {
	const n = window.devicePixelRatio || 1;
	return Math.round(e * n) / n;
}
function iM(e, n) {
	return PN(({ placement: r }) => {
		var u;
		const l = (e?.clientHeight || 0) / 2,
			o = typeof n.gutter == "number" ? n.gutter + l : (u = n.gutter) != null ? u : l;
		return { crossAxis: r.split("-")[1] ? void 0 : n.shift, mainAxis: o, alignmentAxis: n.shift };
	});
}
function rM(e) {
	if (e.flip === !1) return;
	const n = typeof e.flip == "string" ? e.flip.split(" ") : void 0;
	return (gt(!n || n.every(nM), !1), FN({ padding: e.overflowPadding, fallbackPlacements: n }));
}
function aM(e) {
	if (!(!e.slide && !e.overlap))
		return YN({ mainAxis: e.slide, crossAxis: e.overlap, padding: e.overflowPadding, limiter: XN() });
}
function uM(e) {
	return KN({
		padding: e.overflowPadding,
		apply({ elements: n, availableWidth: r, availableHeight: u, rects: l }) {
			const o = n.floating,
				f = Math.round(l.reference.width);
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
function sM(e, n) {
	if (e) return GN({ element: e, padding: n.arrowPadding });
}
var bh = Le(function ({
		store: n,
		modal: r = !1,
		portal: u = !!r,
		preserveTabOrder: l = !0,
		autoFocusOnShow: o = !0,
		wrapperProps: f,
		fixed: h = !1,
		flip: m = !0,
		shift: v = 0,
		slide: y = !0,
		overlap: _ = !1,
		sameWidth: b = !1,
		fitViewport: S = !1,
		gutter: E,
		arrowPadding: C = 4,
		overflowPadding: T = 8,
		getAnchorRect: D,
		updatePosition: A,
		...N
	}) {
		const R = So();
		((n = n || R), gt(n, !1));
		const $ = n.useState("arrowElement"),
			I = n.useState("anchorElement"),
			j = n.useState("disclosureElement"),
			z = n.useState("popoverElement"),
			U = n.useState("contentElement"),
			L = n.useState("placement"),
			Q = n.useState("mounted"),
			ie = n.useState("rendered"),
			X = (0, w.useRef)(null),
			[F, ne] = (0, w.useState)(!1),
			{ portalRef: k, domReady: H } = Kd(u, N.portalRef),
			B = _e(D),
			ue = _e(A),
			fe = !!A;
		(He(() => {
			if (!z?.isConnected) return;
			z.style.setProperty("--popover-overflow-padding", `${T}px`);
			const O = tM(I, B),
				G = async () => {
					if (!Q) return;
					$ || (X.current = X.current || document.createElement("div"));
					const me = $ || X.current,
						ye = [
							iM(me, { gutter: E, shift: v }),
							rM({ flip: m, overflowPadding: T }),
							aM({ slide: y, shift: v, overlap: _, overflowPadding: T }),
							sM(me, { arrowPadding: C }),
							uM({ sameWidth: b, fitViewport: S, overflowPadding: T }),
						],
						pe = await JN(O, z, { placement: L, strategy: h ? "fixed" : "absolute", middleware: ye });
					(n?.setState("currentPlacement", pe.placement), ne(!0));
					const Ze = L0(pe.x),
						Ne = L0(pe.y);
					if (
						(Object.assign(z.style, { top: "0", left: "0", transform: `translate3d(${Ze}px,${Ne}px,0)` }),
						me && pe.middlewareData.arrow)
					) {
						const { x: rt, y: Nt } = pe.middlewareData.arrow,
							Kt = pe.placement.split("-")[0],
							zt = me.clientWidth / 2,
							kt = me.clientHeight / 2,
							de = rt != null ? rt + zt : -zt,
							Te = Nt != null ? Nt + kt : -kt;
						(z.style.setProperty(
							"--popover-transform-origin",
							{
								top: `${de}px calc(100% + ${kt}px)`,
								bottom: `${de}px ${-kt}px`,
								left: `calc(100% + ${zt}px) ${Te}px`,
								right: `${-zt}px ${Te}px`,
							}[Kt],
						),
							Object.assign(me.style, {
								left: rt != null ? `${rt}px` : "",
								top: Nt != null ? `${Nt}px` : "",
								[Kt]: "100%",
							}));
					}
				},
				se = QN(
					O,
					z,
					async () => {
						fe ? (await ue({ updatePosition: G }), ne(!0)) : await G();
					},
					{ elementResize: typeof ResizeObserver == "function" },
				);
			return () => {
				(ne(!1), se());
			};
		}, [n, ie, z, $, I, z, L, Q, H, h, m, v, y, _, b, S, E, C, T, B, fe, ue]),
			He(() => {
				if (!Q || !H || !z?.isConnected || !U?.isConnected) return;
				const O = () => {
					z.style.zIndex = getComputedStyle(U).zIndex;
				};
				O();
				let G = requestAnimationFrame(() => {
					G = requestAnimationFrame(O);
				});
				return () => cancelAnimationFrame(G);
			}, [Q, H, z, U]));
		const Ie = h ? "fixed" : "absolute";
		return (
			(N = Pt(
				N,
				(O) =>
					(0, p.jsx)("div", {
						...f,
						style: { position: Ie, top: 0, left: 0, width: "max-content", ...f?.style },
						ref: n?.setPopoverElement,
						children: O,
					}),
				[n, Ie, f],
			)),
			(N = Pt(N, (O) => (0, p.jsx)(wo, { value: n, children: O }), [n])),
			(N = { "data-placing": !F || void 0, ...N, style: { position: "relative", ...N.style } }),
			(N = Kp({
				store: n,
				modal: r,
				portal: u,
				preserveTabOrder: l,
				preserveTabOrderAnchor: j || I,
				autoFocusOnShow: F && o,
				...N,
				portalRef: k,
			})),
			N
		);
	}),
	Qk = ys(
		De(function (n) {
			return Ue(WN, bh(n));
		}),
		So,
	),
	lM = "div";
function uS(e, n, r, u) {
	return ir(n) ? !0 : e ? !!(At(n, e) || (r && At(r, e)) || u?.some((l) => uS(e, l, r))) : !1;
}
function oM({ store: e, ...n }) {
	const [r, u] = (0, w.useState)(!1),
		l = e.useState("mounted");
	(0, w.useEffect)(() => {
		l || u(!1);
	}, [l]);
	const o = n.onFocus,
		f = _e((m) => {
			(o?.(m), !m.defaultPrevented && u(!0));
		}),
		h = (0, w.useRef)(null);
	return (
		(0, w.useEffect)(
			() =>
				Ft(e, ["anchorElement"], (m) => {
					h.current = m.anchorElement;
				}),
			[],
		),
		(n = { autoFocusOnHide: r, finalFocus: h, ...n, onFocus: f }),
		n
	);
}
var $0 = (0, w.createContext)(null),
	sS = Le(function ({
		store: n,
		modal: r = !1,
		portal: u = !!r,
		hideOnEscape: l = !0,
		hideOnHoverOutside: o = !0,
		disablePointerEventsOnApproach: f = !!o,
		...h
	}) {
		const m = eh();
		((n = n || m), gt(n, !1));
		const v = (0, w.useRef)(null),
			[y, _] = (0, w.useState)([]),
			b = (0, w.useRef)(0),
			S = (0, w.useRef)(null),
			{ portalRef: E, domReady: C } = Kd(u, h.portalRef),
			T = Gd(),
			D = !!o,
			A = ut(o),
			N = !!f,
			R = ut(f),
			$ = n.useState("open"),
			I = n.useState("mounted");
		((0, w.useEffect)(() => {
			if (!C || !I || (!D && !N)) return;
			const Q = v.current;
			return Q
				? dn(
						Qt(
							"mousemove",
							(X) => {
								if (!n || !T()) return;
								const { anchorElement: F, hideTimeout: ne, timeout: k } = n.getState(),
									H = S.current,
									[B] = X.composedPath(),
									ue = F;
								if (uS(B, Q, ue, y)) {
									((S.current = B && ue && At(ue, B) ? ud(X) : null), window.clearTimeout(b.current), (b.current = 0));
									return;
								}
								if (!b.current) {
									if (H) {
										const fe = ud(X);
										if (E0(fe, C0(Q, H))) {
											if (((S.current = fe), !R(X))) return;
											(X.preventDefault(), X.stopPropagation());
											return;
										}
									}
									A(X) &&
										(b.current = window.setTimeout(() => {
											((b.current = 0), n?.hide());
										}, ne ?? k));
								}
							},
							!0,
						),
						() => clearTimeout(b.current),
					)
				: void 0;
		}, [n, T, C, I, D, N, y, R, A]),
			(0, w.useEffect)(() => {
				if (!C || !I || !N) return;
				const Q = (ie) => {
					const X = v.current;
					if (!X) return;
					const F = S.current;
					if (!F) return;
					const ne = C0(X, F);
					if (E0(ud(ie), ne)) {
						if (!R(ie)) return;
						(ie.preventDefault(), ie.stopPropagation());
					}
				};
				return dn(Qt("mouseenter", Q, !0), Qt("mouseover", Q, !0), Qt("mouseout", Q, !0), Qt("mouseleave", Q, !0));
			}, [C, I, N, R]),
			(0, w.useEffect)(() => {
				C && ($ || n?.setAutoFocusOnShow(!1));
			}, [n, C, $]));
		const j = wp($);
		(0, w.useEffect)(() => {
			if (C)
				return () => {
					j.current || n?.setAutoFocusOnShow(!1);
				};
		}, [n, C]);
		const z = (0, w.useContext)($0);
		He(() => {
			if (r || !u || !I || !C) return;
			const Q = v.current;
			if (Q) return z?.(Q);
		}, [r, u, I, C]);
		const U = (0, w.useCallback)(
			(Q) => {
				_((X) => [...X, Q]);
				const ie = z?.(Q);
				return () => {
					(_((X) => X.filter((F) => F !== Q)), ie?.());
				};
			},
			[z],
		);
		((h = Pt(h, (Q) => (0, p.jsx)(Tp, { value: n, children: (0, p.jsx)($0.Provider, { value: U, children: Q }) }), [
			n,
			U,
		])),
			(h = { ...h, ref: yt(v, h.ref) }),
			(h = oM({ store: n, ...h })));
		const L = n.useState((Q) => r || Q.autoFocusOnShow);
		return (
			(h = bh({
				store: n,
				modal: r,
				portal: u,
				autoFocusOnShow: L,
				...h,
				portalRef: E,
				hideOnEscape(Q) {
					return ho(l, Q)
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
	Pk = ys(
		De(function (n) {
			return Ue(lM, sS(n));
		}),
		eh,
	),
	cM = "div",
	fM = Le(function ({
		store: n,
		modal: r = !1,
		portal: u = !!r,
		hideOnEscape: l = !0,
		autoFocusOnShow: o = !0,
		hideOnHoverOutside: f,
		alwaysVisible: h,
		...m
	}) {
		const v = _o();
		((n = n || v), gt(n, !1));
		const y = (0, w.useRef)(null),
			_ = n.parent,
			b = n.menubar,
			S = !!_,
			E = !!b && !S;
		m = { ...m, ref: yt(y, m.ref) };
		const { "aria-labelledby": C, ...T } = Ip({ store: n, alwaysVisible: h, ...m });
		m = T;
		const [D, A] = (0, w.useState)(),
			N = n.useState("autoFocusOnShow"),
			R = n.useState("initialFocus"),
			$ = n.useState("baseElement"),
			I = n.useState("renderedItems");
		(0, w.useEffect)(() => {
			let X = !1;
			return (
				A((F) => {
					var ne, k, H;
					if (X || !N) return;
					if ((ne = F?.current) != null && ne.isConnected) return F;
					const B = (0, w.createRef)();
					switch (R) {
						case "first":
							B.current = ((k = I.find((ue) => !ue.disabled && ue.element)) == null ? void 0 : k.element) || null;
							break;
						case "last":
							B.current =
								((H = [...I].reverse().find((ue) => !ue.disabled && ue.element)) == null ? void 0 : H.element) || null;
							break;
						default:
							B.current = $;
					}
					return B;
				}),
				() => {
					X = !0;
				}
			);
		}, [n, N, R, I, $]);
		const j = S ? !1 : r,
			z = !!o,
			U = !!D || !!m.initialFocus || !!j,
			L = Tt(n.combobox || n, "contentElement"),
			Q = Tt(_?.combobox || _, "contentElement"),
			ie = (0, w.useMemo)(() => {
				if (!Q || !L) return;
				const X = L.getAttribute("role"),
					F = Q.getAttribute("role");
				if (!((F === "menu" || F === "menubar") && X === "menu")) return Q;
			}, [L, Q]);
		return (
			ie !== void 0 && (m = { preserveTabOrderAnchor: ie, ...m }),
			(m = sS({
				store: n,
				alwaysVisible: h,
				initialFocus: D,
				autoFocusOnShow: z ? U && o : N || !!j,
				...m,
				hideOnEscape(X) {
					return ho(l, X) ? !1 : (n?.hideAll(), !0);
				},
				hideOnHoverOutside(X) {
					const F = n?.getState().disclosureElement;
					return (typeof f == "function" ? f(X) : (f ?? (S ? !0 : E ? (F ? !ir(F) : !0) : !1)))
						? X.defaultPrevented || !S || !F || (cO(F, "mouseout", X), !ir(F))
							? !0
							: (requestAnimationFrame(() => {
									ir(F) || n?.hide();
								}),
								!1)
						: !1;
				},
				modal: j,
				portal: u,
				backdrop: S ? !1 : m.backdrop,
			})),
			(m = { "aria-labelledby": C, ...m }),
			m
		);
	}),
	dM = ys(
		De(function (n) {
			return Ue(cM, fM(n));
		}),
		_o,
	);
function hM(e) {
	var n;
	const r = e.find((o) => !!o.element),
		u = [...e].reverse().find((o) => !!o.element);
	let l = (n = r?.element) == null ? void 0 : n.parentElement;
	for (; l && u?.element; ) {
		if (u && l.contains(u.element)) return l;
		l = l.parentElement;
	}
	return it(l).body;
}
function mM(e) {
	return e?.__unstablePrivateStore;
}
function vM(e = {}) {
	var n;
	e.store;
	const r = (n = e.store) == null ? void 0 : n.getState(),
		u = Ee(e.items, r?.items, e.defaultItems, []),
		l = new Map(u.map((b) => [b.id, b])),
		o = { items: u, renderedItems: Ee(r?.renderedItems, []) },
		f = mM(e.store),
		h = Vn({ items: u, renderedItems: o.renderedItems }, f),
		m = Vn(o, e.store),
		v = (b) => {
			const S = gp(b, (E) => E.element);
			(h.setState("renderedItems", S), m.setState("renderedItems", S));
		};
	(Wt(m, () => nh(h)),
		Wt(h, () =>
			eo(h, ["items"], (b) => {
				m.setState("items", b.items);
			}),
		),
		Wt(h, () =>
			eo(h, ["renderedItems"], (b) => {
				let S = !0,
					E = requestAnimationFrame(() => {
						const { renderedItems: A } = m.getState();
						b.renderedItems !== A && v(b.renderedItems);
					});
				if (typeof IntersectionObserver != "function") return () => cancelAnimationFrame(E);
				const C = () => {
						if (S) {
							S = !1;
							return;
						}
						(cancelAnimationFrame(E), (E = requestAnimationFrame(() => v(b.renderedItems))));
					},
					T = hM(b.renderedItems),
					D = new IntersectionObserver(C, { root: T });
				for (const A of b.renderedItems) A.element && D.observe(A.element);
				return () => {
					(cancelAnimationFrame(E), D.disconnect());
				};
			}),
		));
	const y = (b, S, E = !1) => {
			let C;
			return (
				S((D) => {
					const A = D.findIndex(({ id: R }) => R === b.id),
						N = D.slice();
					if (A !== -1) {
						C = D[A];
						const R = { ...C, ...b };
						((N[A] = R), l.set(b.id, R));
					} else (N.push(b), l.set(b.id, b));
					return N;
				}),
				() => {
					S((D) => {
						if (!C) return (E && l.delete(b.id), D.filter(({ id: R }) => R !== b.id));
						const A = D.findIndex(({ id: R }) => R === b.id);
						if (A === -1) return D;
						const N = D.slice();
						return ((N[A] = C), l.set(b.id, C), N);
					});
				}
			);
		},
		_ = (b) => y(b, (S) => h.setState("items", S), !0);
	return {
		...m,
		registerItem: _,
		renderItem: (b) =>
			dn(
				_(b),
				y(b, (S) => h.setState("renderedItems", S)),
			),
		item: (b) => {
			if (!b) return null;
			let S = l.get(b);
			if (!S) {
				const { items: E } = h.getState();
				((S = E.find((C) => C.id === b)), S && l.set(b, S));
			}
			return S || null;
		},
		__unstablePrivateStore: h,
	};
}
function gM(e, n, r) {
	return (Ya(n, [r.store]), vt(e, r, "items", "setItems"), e);
}
var yM = { id: null };
function wi(e, n) {
	return e.find((r) => (n ? !r.disabled && r.id !== n : !r.disabled));
}
function bM(e, n) {
	return e.filter((r) => (n ? !r.disabled && r.id !== n : !r.disabled));
}
function B0(e, n) {
	return e.filter((r) => r.rowId === n);
}
function pM(e, n, r = !1) {
	const u = e.findIndex((l) => l.id === n);
	return [...e.slice(u + 1), ...(r ? [yM] : []), ...e.slice(0, u)];
}
function lS(e) {
	const n = [];
	for (const r of e) {
		const u = n.find((l) => {
			var o;
			return ((o = l[0]) == null ? void 0 : o.rowId) === r.rowId;
		});
		u ? u.push(r) : n.push([r]);
	}
	return n;
}
function oS(e) {
	let n = 0;
	for (const { length: r } of e) r > n && (n = r);
	return n;
}
function SM(e) {
	return { id: "__EMPTY_ITEM__", disabled: !0, rowId: e };
}
function wM(e, n, r) {
	const u = oS(e);
	for (const l of e)
		for (let o = 0; o < u; o += 1) {
			const f = l[o];
			if (!f || (r && f.disabled)) {
				const h = o === 0 && r ? wi(l) : l[o - 1];
				l[o] = h && n !== h.id && r ? h : SM(h?.rowId);
			}
		}
	return e;
}
function _M(e) {
	const n = lS(e),
		r = oS(n),
		u = [];
	for (let l = 0; l < r; l += 1)
		for (const o of n) {
			const f = o[l];
			f && u.push({ ...f, rowId: f.rowId ? `${l}` : void 0 });
		}
	return u;
}
function cS(e = {}) {
	var n;
	const r = (n = e.store) == null ? void 0 : n.getState(),
		u = vM(e),
		l = Ee(e.activeId, r?.activeId, e.defaultActiveId),
		o = Vn(
			{
				...u.getState(),
				id: Ee(e.id, r?.id, `id-${Math.random().toString(36).slice(2, 8)}`),
				activeId: l,
				baseElement: Ee(r?.baseElement, null),
				includesBaseElement: Ee(e.includesBaseElement, r?.includesBaseElement, l === null),
				moves: Ee(r?.moves, 0),
				orientation: Ee(e.orientation, r?.orientation, "both"),
				rtl: Ee(e.rtl, r?.rtl, !1),
				virtualFocus: Ee(e.virtualFocus, r?.virtualFocus, !1),
				focusLoop: Ee(e.focusLoop, r?.focusLoop, !1),
				focusWrap: Ee(e.focusWrap, r?.focusWrap, !1),
				focusShift: Ee(e.focusShift, r?.focusShift, !1),
			},
			u,
			e.store,
		);
	Wt(o, () =>
		Ft(o, ["renderedItems", "activeId"], (h) => {
			o.setState("activeId", (m) => {
				var v;
				return m !== void 0 ? m : (v = wi(h.renderedItems)) == null ? void 0 : v.id;
			});
		}),
	);
	const f = (h = "next", m = {}) => {
		var v, y;
		const _ = o.getState(),
			{
				skip: b = 0,
				activeId: S = _.activeId,
				focusShift: E = _.focusShift,
				focusLoop: C = _.focusLoop,
				focusWrap: T = _.focusWrap,
				includesBaseElement: D = _.includesBaseElement,
				renderedItems: A = _.renderedItems,
				rtl: N = _.rtl,
			} = m,
			R = h === "up" || h === "down",
			$ = h === "next" || h === "down",
			I = $ ? N && !R : !N || R,
			j = E && !b;
		let z = R ? qp(wM(lS(A), S, j)) : A;
		if (((z = I ? Td(z) : z), (z = R ? _M(z) : z), S == null)) return (v = wi(z)) == null ? void 0 : v.id;
		const U = z.find((B) => B.id === S);
		if (!U) return (y = wi(z)) == null ? void 0 : y.id;
		const L = z.some((B) => B.rowId),
			Q = z.indexOf(U),
			ie = z.slice(Q + 1),
			X = B0(ie, U.rowId);
		if (b) {
			const B = bM(X, S),
				ue = B.slice(b)[0] || B[B.length - 1];
			return ue?.id;
		}
		const F = C && (R ? C !== "horizontal" : C !== "vertical"),
			ne = L && T && (R ? T !== "horizontal" : T !== "vertical"),
			k = $ ? (!L || R) && F && D : R ? D : !1;
		if (F) {
			const B = wi(pM(ne && !k ? z : B0(z, U.rowId), S, k), S);
			return B?.id;
		}
		if (ne) {
			const B = wi(k ? X : ie, S);
			return k ? B?.id || null : B?.id;
		}
		const H = wi(X, S);
		return !H && k ? null : H?.id;
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
			return (h = wi(Td(o.getState().renderedItems))) == null ? void 0 : h.id;
		},
		next: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("next", h)),
		previous: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("previous", h)),
		down: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("down", h)),
		up: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("up", h)),
	};
}
function xM(e) {
	return { id: Oi(e.id), ...e };
}
function fS(e, n, r) {
	return (
		(e = gM(e, n, r)),
		vt(e, r, "activeId", "setActiveId"),
		vt(e, r, "includesBaseElement"),
		vt(e, r, "virtualFocus"),
		vt(e, r, "orientation"),
		vt(e, r, "rtl"),
		vt(e, r, "focusLoop"),
		vt(e, r, "focusWrap"),
		vt(e, r, "focusShift"),
		e
	);
}
var EM = "a",
	dS = Le(function ({ store: n, showOnHover: r = !0, ...u }) {
		const l = eh();
		((n = n || l), gt(n, !1));
		const o = as(u),
			f = (0, w.useRef)(0);
		((0, w.useEffect)(() => () => window.clearTimeout(f.current), []),
			(0, w.useEffect)(
				() =>
					Qt(
						"mouseleave",
						(C) => {
							if (!n) return;
							const { anchorElement: T } = n.getState();
							T && C.target === T && (window.clearTimeout(f.current), (f.current = 0));
						},
						!0,
					),
				[n],
			));
		const h = u.onMouseMove,
			m = ut(r),
			v = Gd(),
			y = _e((E) => {
				if ((h?.(E), o || !n || E.defaultPrevented || f.current || !v() || !m(E))) return;
				const C = E.currentTarget;
				(n.setAnchorElement(C), n.setDisclosureElement(C));
				const { showTimeout: T, timeout: D } = n.getState(),
					A = () => {
						((f.current = 0),
							v() &&
								(n?.setAnchorElement(C),
								n?.show(),
								queueMicrotask(() => {
									n?.setDisclosureElement(C);
								})));
					},
					N = T ?? D;
				N === 0 ? A() : (f.current = window.setTimeout(A, N));
			}),
			_ = u.onClick,
			b = _e((E) => {
				(_?.(E), n && (window.clearTimeout(f.current), (f.current = 0)));
			}),
			S = (0, w.useCallback)(
				(E) => {
					if (!n) return;
					const { anchorElement: C } = n.getState();
					C?.isConnected || n.setAnchorElement(E);
				},
				[n],
			);
		return ((u = { ...u, ref: yt(S, u.ref), onMouseMove: y, onClick: b }), (u = vs(u)), u);
	}),
	Yk = De(function (n) {
		return Ue(EM, dS(n));
	}),
	CM = "div",
	ph = Le(function ({ store: n, ...r }) {
		const u = So();
		return ((n = n || u), (r = { ...r, ref: yt(n?.setAnchorElement, r.ref) }), r);
	}),
	Fk = De(function (n) {
		return Ue(CM, ph(n));
	}),
	TM = "button";
function V0(e) {
	if (!e.isTrusted) return !1;
	const n = e.currentTarget;
	return e.key === "Enter"
		? rr(n) || n.tagName === "SUMMARY" || n.tagName === "A"
		: e.key === " "
			? rr(n) || n.tagName === "SUMMARY" || n.tagName === "INPUT" || n.tagName === "SELECT"
			: !1;
}
var AM = Symbol("command"),
	Sh = Le(function ({ clickOnEnter: n = !0, clickOnSpace: r = !0, ...u }) {
		const l = (0, w.useRef)(null),
			[o, f] = (0, w.useState)(!1);
		(0, w.useEffect)(() => {
			l.current && f(rr(l.current));
		}, []);
		const [h, m] = (0, w.useState)(!1),
			v = (0, w.useRef)(!1),
			y = as(u),
			[_, b] = Ep(u, AM, !0),
			S = u.onKeyDown,
			E = _e((D) => {
				S?.(D);
				const A = D.currentTarget;
				if (D.defaultPrevented || _ || y || !_n(D) || Jn(A) || A.isContentEditable) return;
				const N = n && D.key === "Enter",
					R = r && D.key === " ",
					$ = D.key === "Enter" && !n,
					I = D.key === " " && !r;
				if ($ || I) {
					D.preventDefault();
					return;
				}
				if (N || R) {
					const j = V0(D);
					if (N) {
						if (!j) {
							D.preventDefault();
							const { view: z, ...U } = D,
								L = () => c0(A, U);
							lO() ? Ia(A, "keyup", L) : queueMicrotask(L);
						}
					} else R && ((v.current = !0), j || (D.preventDefault(), m(!0)));
				}
			}),
			C = u.onKeyUp,
			T = _e((D) => {
				if ((C?.(D), D.defaultPrevented || _ || y || D.metaKey)) return;
				const A = r && D.key === " ";
				if (v.current && A && ((v.current = !1), !V0(D))) {
					(D.preventDefault(), m(!1));
					const N = D.currentTarget,
						{ view: R, ...$ } = D;
					queueMicrotask(() => c0(N, $));
				}
			});
		return (
			(u = {
				"data-active": h || void 0,
				type: o ? "button" : void 0,
				...b,
				...u,
				ref: yt(l, u.ref),
				onKeyDown: E,
				onKeyUp: T,
			}),
			(u = vs(u)),
			u
		);
	}),
	Kk = De(function (n) {
		return Ue(TM, Sh(n));
	}),
	hS = "button",
	mS = Le(function (n) {
		const r = (0, w.useRef)(null),
			u = _p(r, hS),
			[l, o] = (0, w.useState)(() => !!u && rr({ tagName: u, type: n.type }));
		return (
			(0, w.useEffect)(() => {
				r.current && o(rr(r.current));
			}, []),
			(n = { role: !l && u !== "a" ? "button" : void 0, ...n, ref: yt(r, n.ref) }),
			(n = Sh(n)),
			n
		);
	}),
	Gk = De(function (n) {
		return Ue(hS, mS(n));
	}),
	RM = "button",
	OM = Symbol("disclosure"),
	vS = Le(function ({ store: n, toggleOnClick: r = !0, ...u }) {
		const l = Jd();
		((n = n || l), gt(n, !1));
		const o = (0, w.useRef)(null),
			[f, h] = (0, w.useState)(!1),
			m = n.useState("disclosureElement"),
			v = n.useState("open");
		(0, w.useEffect)(() => {
			let T = m === o.current;
			(m?.isConnected || (n?.setDisclosureElement(o.current), (T = !0)), h(v && T));
		}, [m, n, v]);
		const y = u.onClick,
			_ = ut(r),
			[b, S] = Ep(u, OM, !0),
			E = _e((T) => {
				(y?.(T), !T.defaultPrevented && (b || (_(T) && (n?.setDisclosureElement(T.currentTarget), n?.toggle()))));
			}),
			C = n.useState("contentElement");
		return (
			(u = { "aria-expanded": f, "aria-controls": C?.id, ...S, ...u, ref: yt(o, u.ref), onClick: E }),
			(u = mS(u)),
			u
		);
	}),
	Xk = De(function (n) {
		return Ue(RM, vS(n));
	}),
	NM = "button",
	gS = Le(function ({ store: n, ...r }) {
		const u = po();
		return (
			(n = n || u),
			gt(n, !1),
			(r = { "aria-haspopup": mo(n.useState("contentElement"), "dialog"), ...r }),
			(r = vS({ store: n, ...r })),
			r
		);
	}),
	Jk = De(function (n) {
		return Ue(NM, gS(n));
	}),
	MM = "button",
	yS = Le(function ({ store: n, ...r }) {
		const u = So();
		((n = n || u), gt(n, !1));
		const l = r.onClick,
			o = _e((f) => {
				(n?.setAnchorElement(f.currentTarget), l?.(f));
			});
		return (
			(r = Pt(r, (f) => (0, p.jsx)(wo, { value: n, children: f }), [n])),
			(r = { ...r, onClick: o }),
			(r = ph({ store: n, ...r })),
			(r = gS({ store: n, ...r })),
			r
		);
	}),
	Wk = De(function (n) {
		return Ue(MM, yS(n));
	}),
	zM = "button";
function kM(e, n) {
	return {
		ArrowDown: n === "bottom" || n === "top" ? "first" : !1,
		ArrowUp: n === "bottom" || n === "top" ? "last" : !1,
		ArrowRight: n === "right" ? "first" : !1,
		ArrowLeft: n === "left" ? "first" : !1,
	}[e.key];
}
function H0(e, n) {
	return !!e?.some((r) => (!r.element || r.element === n ? !1 : r.element.getAttribute("aria-expanded") === "true"));
}
var DM = Le(function ({ store: n, focusable: r, accessibleWhenDisabled: u, showOnHover: l, ...o }) {
		const f = _o();
		((n = n || f), gt(n, !1));
		const h = (0, w.useRef)(null),
			m = n.parent,
			v = n.menubar,
			y = !!m,
			_ = !!v && !y,
			b = as(o),
			S = () => {
				const j = h.current;
				j && (n?.setDisclosureElement(j), n?.setAnchorElement(j), n?.show());
			},
			E = o.onFocus,
			C = _e((j) => {
				if ((E?.(j), b || j.defaultPrevented || (n?.setAutoFocusOnShow(!1), n?.setActiveId(null), !v) || !_)) return;
				const { items: z } = v.getState();
				H0(z, j.currentTarget) && S();
			}),
			T = Tt(n, (j) => j.placement.split("-")[0]),
			D = o.onKeyDown,
			A = _e((j) => {
				if ((D?.(j), b || j.defaultPrevented)) return;
				const z = kM(j, T);
				z && (j.preventDefault(), S(), n?.setAutoFocusOnShow(!0), n?.setInitialFocus(z));
			}),
			N = o.onClick,
			R = _e((j) => {
				if ((N?.(j), j.defaultPrevented || !n)) return;
				const z = !j.detail,
					{ open: U } = n.getState();
				((!U || z) && ((!y || z) && n.setAutoFocusOnShow(!0), n.setInitialFocus(z ? "first" : "container")), y && S());
			});
		((o = Pt(o, (j) => (0, p.jsx)(Rp, { value: n, children: j }), [n])),
			y && (o = { ...o, render: (0, p.jsx)(to.div, { render: o.render }) }));
		const $ = Oi(o.id),
			I = Tt(m?.combobox || m, "contentElement");
		return (
			(o = {
				id: $,
				role: y || _ ? vp(I, "menuitem") : void 0,
				"aria-haspopup": mo(n.useState("contentElement"), "menu"),
				...o,
				ref: yt(h, o.ref),
				onFocus: C,
				onKeyDown: A,
				onClick: R,
			}),
			(o = dS({
				store: n,
				focusable: r,
				accessibleWhenDisabled: u,
				...o,
				showOnHover: (j) => {
					if (
						!(() => {
							if (typeof l == "function") return l(j);
							if (l != null) return l;
							if (y) return !0;
							if (!v) return !1;
							const { items: L } = v.getState();
							return _ && H0(L);
						})()
					)
						return !1;
					const U = _ ? v : m;
					return (U && U.setActiveId(j.currentTarget.id), !0);
				},
			})),
			(o = yS({ store: n, toggleOnClick: !y, focusable: r, accessibleWhenDisabled: u, ...o })),
			(o = th({ store: n, typeahead: _, ...o })),
			o
		);
	}),
	jM = De(function (n) {
		return Ue(zM, DM(n));
	}),
	qM = "div";
function bS(e) {
	const n = e.relatedTarget;
	return n?.nodeType === Node.ELEMENT_NODE ? n : null;
}
function IM(e) {
	const n = bS(e);
	return n ? At(e.currentTarget, n) : !1;
}
var Md = Symbol("composite-hover");
function UM(e) {
	let n = bS(e);
	if (!n) return !1;
	do {
		if (Ai(n, Md) && n[Md]) return !0;
		n = n.parentElement;
	} while (n);
	return !1;
}
var wh = Le(function ({ store: n, focusOnHover: r = !0, blurOnHoverEnd: u = !!r, ...l }) {
		const o = yo();
		((n = n || o), gt(n, !1));
		const f = Gd(),
			h = l.onMouseMove,
			m = ut(r),
			v = _e((E) => {
				if ((h?.(E), !E.defaultPrevented && f() && m(E))) {
					if (!ir(E.currentTarget)) {
						const C = n?.getState().baseElement;
						C && !Ur(C) && C.focus();
					}
					n?.setActiveId(E.currentTarget.id);
				}
			}),
			y = l.onMouseLeave,
			_ = ut(u),
			b = _e((E) => {
				var C;
				(y?.(E),
					!E.defaultPrevented &&
						f() &&
						(IM(E) ||
							UM(E) ||
							(m(E) && _(E) && (n?.setActiveId(null), (C = n?.getState().baseElement) == null || C.focus()))));
			}),
			S = (0, w.useCallback)((E) => {
				E && (E[Md] = !0);
			}, []);
		return ((l = { ...l, ref: yt(S, l.ref), onMouseMove: v, onMouseLeave: b }), Hr(l));
	}),
	eD = go(
		De(function (n) {
			return Ue(qM, wh(n));
		}),
	),
	LM = "div",
	pS = Le(function ({ store: n, shouldRegisterItem: r = !0, getItem: u = dp, element: l, ...o }) {
		const f = bO();
		n = n || f;
		const h = Oi(o.id),
			m = (0, w.useRef)(l);
		return (
			(0, w.useEffect)(() => {
				const v = m.current;
				if (!h || !v || !r) return;
				const y = u({ id: h, element: v });
				return n?.renderItem(y);
			}, [h, r, u, n]),
			(o = { ...o, ref: yt(m, o.ref) }),
			Hr(o)
		);
	}),
	tD = De(function (n) {
		return Ue(LM, pS(n));
	}),
	$M = "button";
function BM(e) {
	return xd(e) ? !0 : e.tagName === "INPUT" && !rr(e);
}
function VM(e, n = !1) {
	const r = e.clientHeight,
		{ top: u } = e.getBoundingClientRect(),
		l = Math.max(r * 0.875, r - 40) * 1.5,
		o = n ? r - l + u : l + u;
	return e.tagName === "HTML" ? o + e.scrollTop : o;
}
function HM(e, n = !1) {
	const { top: r } = e.getBoundingClientRect();
	return n ? r + e.clientHeight : r;
}
function Z0(e, n, r, u = !1) {
	var l;
	if (!n || !r) return;
	const { renderedItems: o } = n.getState(),
		f = Pd(e);
	if (!f) return;
	const h = VM(f, u);
	let m, v;
	for (let y = 0; y < o.length; y += 1) {
		const _ = m;
		if (((m = r(y)), !m)) break;
		if (m === _) continue;
		const b = (l = tr(n, m)) == null ? void 0 : l.element;
		if (!b) continue;
		const S = HM(b, u) - h,
			E = Math.abs(S);
		if ((u && S <= 0) || (!u && S >= 0)) {
			v !== void 0 && v < E && (m = _);
			break;
		}
		v = E;
	}
	return m;
}
function ZM(e, n) {
	return _n(e) ? !1 : Pu(n, e.target);
}
var _h = Le(function ({
		store: n,
		rowId: r,
		preventScrollOnKeyDown: u = !1,
		moveOnKeyPress: l = !0,
		tabbable: o = !1,
		getItem: f,
		"aria-setsize": h,
		"aria-posinset": m,
		...v
	}) {
		const y = yo();
		n = n || y;
		const _ = Oi(v.id),
			b = (0, w.useRef)(null),
			S = (0, w.useContext)(xO),
			E = as(v) && !v.accessibleWhenDisabled,
			{
				rowId: C,
				baseElement: T,
				isActiveItem: D,
				ariaSetSize: A,
				ariaPosInSet: N,
				isTabbable: R,
			} = zp(n, {
				rowId(k) {
					if (r) return r;
					if (k && S?.baseElement && S.baseElement === k.baseElement) return S.id;
				},
				baseElement(k) {
					return k?.baseElement || void 0;
				},
				isActiveItem(k) {
					return !!k && k.activeId === _;
				},
				ariaSetSize(k) {
					if (h != null) return h;
					if (k && S?.ariaSetSize && S.baseElement === k.baseElement) return S.ariaSetSize;
				},
				ariaPosInSet(k) {
					if (m != null) return m;
					if (!k || !S?.ariaPosInSet || S.baseElement !== k.baseElement) return;
					const H = k.renderedItems.filter((B) => B.rowId === C);
					return S.ariaPosInSet + H.findIndex((B) => B.id === _);
				},
				isTabbable(k) {
					if (!k?.renderedItems.length) return !0;
					if (k.virtualFocus) return !1;
					if (o) return !0;
					if (k.activeId === null) return !1;
					const H = n?.item(k.activeId);
					return H?.disabled || !H?.element ? !0 : k.activeId === _;
				},
			}),
			$ = (0, w.useCallback)(
				(k) => {
					var H;
					const B = {
						...k,
						id: _ || k.id,
						rowId: C,
						disabled: !!E,
						children: (H = k.element) == null ? void 0 : H.textContent,
					};
					return f ? f(B) : B;
				},
				[_, C, E, f],
			),
			I = v.onFocus,
			j = (0, w.useRef)(!1),
			z = _e((k) => {
				if ((I?.(k), k.defaultPrevented || bp(k) || !_ || !n || ZM(k, n))) return;
				const { virtualFocus: H, baseElement: B } = n.getState();
				(n.setActiveId(_),
					xd(k.currentTarget) && UO(k.currentTarget),
					H &&
						_n(k) &&
						(BM(k.currentTarget) ||
							(B?.isConnected &&
								(vo() &&
									k.currentTarget.hasAttribute("data-autofocus") &&
									k.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" }),
								(j.current = !0),
								k.relatedTarget === B || Pu(n, k.relatedTarget) ? LO(B) : B.focus()))));
			}),
			U = v.onBlurCapture,
			L = _e((k) => {
				if ((U?.(k), k.defaultPrevented)) return;
				const H = n?.getState();
				H?.virtualFocus && j.current && ((j.current = !1), k.preventDefault(), k.stopPropagation());
			}),
			Q = v.onKeyDown,
			ie = ut(u),
			X = ut(l),
			F = _e((k) => {
				if ((Q?.(k), k.defaultPrevented || !_n(k) || !n)) return;
				const { currentTarget: H } = k,
					B = n.getState(),
					ue = n.item(_),
					fe = !!ue?.rowId,
					Ie = B.orientation !== "horizontal",
					O = B.orientation !== "vertical",
					G = () => !!(fe || O || !B.baseElement || !Jn(B.baseElement)),
					re = {
						ArrowUp: (fe || Ie) && n.up,
						ArrowRight: (fe || O) && n.next,
						ArrowDown: (fe || Ie) && n.down,
						ArrowLeft: (fe || O) && n.previous,
						Home: () => {
							if (G()) return !fe || k.ctrlKey ? n?.first() : n?.previous(-1);
						},
						End: () => {
							if (G()) return !fe || k.ctrlKey ? n?.last() : n?.next(-1);
						},
						PageUp: () => Z0(H, n, n?.up, !0),
						PageDown: () => Z0(H, n, n?.down),
					}[k.key];
				if (re) {
					if (xd(H)) {
						const me = Ed(H),
							ye = O && k.key === "ArrowLeft",
							pe = O && k.key === "ArrowRight",
							Ze = Ie && k.key === "ArrowUp",
							Ne = Ie && k.key === "ArrowDown";
						if (pe || Ne) {
							const { length: rt } = uO(H);
							if (me.end !== rt) return;
						} else if ((ye || Ze) && me.start !== 0) return;
					}
					const se = re();
					if (ie(k) || se !== void 0) {
						if (!X(k)) return;
						(k.preventDefault(), n.move(se));
					}
				}
			}),
			ne = (0, w.useMemo)(() => ({ id: _, baseElement: T }), [_, T]);
		return (
			(v = Pt(v, (k) => (0, p.jsx)(_O.Provider, { value: ne, children: k }), [ne])),
			(v = {
				id: _,
				"data-active-item": D || void 0,
				...v,
				ref: yt(b, v.ref),
				tabIndex: R ? v.tabIndex : -1,
				onFocus: z,
				onBlurCapture: L,
				onKeyDown: F,
			}),
			(v = Sh(v)),
			(v = pS({ store: n, ...v, getItem: $, shouldRegisterItem: _ ? v.shouldRegisterItem : !1 })),
			Hr({ ...v, "aria-setsize": A, "aria-posinset": N })
		);
	}),
	nD = go(
		De(function (n) {
			return Ue($M, _h(n));
		}),
	),
	QM = "div";
function PM(e, n, r) {
	var u;
	if (!e) return !1;
	if (ir(e)) return !0;
	const l = n?.find((h) => {
			var m;
			return h.element === r ? !1 : ((m = h.element) == null ? void 0 : m.getAttribute("aria-expanded")) === "true";
		}),
		o = (u = l?.element) == null ? void 0 : u.getAttribute("aria-controls");
	if (!o) return !1;
	const f = it(e).getElementById(o);
	return f ? (ir(f) ? !0 : !!f.querySelector("[role=menuitem][aria-expanded=true]")) : !1;
}
var YM = Le(function ({
		store: n,
		hideOnClick: r = !0,
		preventScrollOnKeyDown: u = !0,
		focusOnHover: l,
		blurOnHoverEnd: o,
		...f
	}) {
		const h = zO(!0),
			m = CO();
		((n = n || h || m), gt(n, !1));
		const v = f.onClick,
			y = ut(r),
			_ = "hideAll" in n ? n.hideAll : void 0,
			b = !!_,
			S = _e((E) => {
				(v?.(E),
					!E.defaultPrevented &&
						(Sp(E) || pp(E) || (_ && E.currentTarget.getAttribute("aria-haspopup") !== "menu" && y(E) && _())));
			});
		return (
			(f = {
				role: vp(
					Tt(n, (E) => ("contentElement" in E ? E.contentElement : null)),
					"menuitem",
				),
				...f,
				onClick: S,
			}),
			(f = _h({ store: n, preventScrollOnKeyDown: u, ...f })),
			(f = wh({
				store: n,
				...f,
				focusOnHover(E) {
					const C = () => (typeof l == "function" ? l(E) : (l ?? !0));
					if (!n || !C()) return !1;
					const { baseElement: T, items: D } = n.getState();
					return b
						? (E.currentTarget.hasAttribute("aria-expanded") && E.currentTarget.focus(), !0)
						: PM(T, D, E.currentTarget)
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
	FM = go(
		De(function (n) {
			return Ue(QM, YM(n));
		}),
	);
function SS({ popover: e, ...n } = {}) {
	const r = xo(
		n.store,
		rh(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
	);
	const u = r?.getState(),
		l = Yp({ ...n, store: r }),
		o = Ee(n.placement, u?.placement, "bottom"),
		f = Vn(
			{
				...l.getState(),
				placement: o,
				currentPlacement: o,
				anchorElement: Ee(u?.anchorElement, null),
				popoverElement: Ee(u?.popoverElement, null),
				arrowElement: Ee(u?.arrowElement, null),
				rendered: Symbol("rendered"),
			},
			l,
			r,
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
function wS(e, n, r) {
	return (Ya(n, [r.popover]), vt(e, r, "placement"), Fp(e, n, r));
}
function KM(e = {}) {
	var n;
	const r = (n = e.store) == null ? void 0 : n.getState(),
		u = SS({ ...e, placement: Ee(e.placement, r?.placement, "bottom") }),
		l = Ee(e.timeout, r?.timeout, 500),
		o = Vn(
			{
				...u.getState(),
				timeout: l,
				showTimeout: Ee(e.showTimeout, r?.showTimeout),
				hideTimeout: Ee(e.hideTimeout, r?.hideTimeout),
				autoFocusOnShow: Ee(r?.autoFocusOnShow, !1),
			},
			u,
			e.store,
		);
	return { ...u, ...o, setAutoFocusOnShow: (f) => o.setState("autoFocusOnShow", f) };
}
function GM(e, n, r) {
	return (vt(e, r, "timeout"), vt(e, r, "showTimeout"), vt(e, r, "hideTimeout"), wS(e, n, r));
}
var _S = (0, w.createContext)(void 0),
	bs = Wn([Cp, ls], [wo, bo]),
	XM = bs.useContext,
	xS = bs.useScopedContext,
	ko = bs.useProviderContext,
	iD = bs.ContextProvider,
	JM = bs.ScopedContextProvider,
	WM = (0, w.createContext)(void 0),
	ez = (0, w.createContext)(!1);
function tz({ combobox: e, parent: n, menubar: r, ...u } = {}) {
	const l = !!r && !n,
		o = xo(
			u.store,
			Op(n, ["values"]),
			rh(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
		);
	const f = o.getState(),
		h = cS({ ...u, store: o, orientation: Ee(u.orientation, f.orientation, "vertical") }),
		m = KM({
			...u,
			store: o,
			placement: Ee(u.placement, f.placement, "bottom-start"),
			timeout: Ee(u.timeout, f.timeout, l ? 0 : 150),
			hideTimeout: Ee(u.hideTimeout, f.hideTimeout, 0),
		}),
		v = Vn(
			{
				...h.getState(),
				...m.getState(),
				initialFocus: Ee(f.initialFocus, "container"),
				values: Ee(u.values, f.values, u.defaultValues, {}),
			},
			h,
			m,
			o,
		);
	return (
		Wt(v, () =>
			Ft(v, ["mounted"], (y) => {
				y.mounted || v.setState("activeId", null);
			}),
		),
		Wt(v, () =>
			Ft(n, ["orientation"], (y) => {
				v.setState("placement", y.orientation === "vertical" ? "right-start" : "bottom-start");
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
			setInitialFocus: (y) => v.setState("initialFocus", y),
			setValues: (y) => v.setState("values", y),
			setValue: (y, _) => {
				y !== "__proto__" &&
					y !== "constructor" &&
					(Array.isArray(y) ||
						v.setState("values", (b) => {
							const S = b[y],
								E = cp(_, S);
							return E === S ? b : { ...b, [y]: E !== void 0 && E };
						}));
			},
		}
	);
}
function nz(e, n, r) {
	return (
		Ya(n, [r.combobox, r.parent, r.menubar]),
		vt(e, r, "values", "setValues"),
		Object.assign(GM(fS(e, n, r), n, r), { combobox: r.combobox, parent: r.parent, menubar: r.menubar })
	);
}
function iz(e = {}) {
	const n = Ap(),
		r = EO(),
		u = ko();
	e = {
		...e,
		parent: e.parent !== void 0 ? e.parent : n,
		menubar: e.menubar !== void 0 ? e.menubar : r,
		combobox: e.combobox !== void 0 ? e.combobox : u,
	};
	const [l, o] = Eo(tz, e);
	return nz(l, o, e);
}
function rz(e = {}) {
	return (0, p.jsx)(Rp, { value: iz(e), children: e.children });
}
var az = "hr",
	ES = Le(function ({ orientation: n = "horizontal", ...r }) {
		return ((r = { role: "separator", "aria-orientation": n, ...r }), r);
	}),
	rD = De(function (n) {
		return Ue(az, ES(n));
	}),
	uz = "hr",
	CS = Le(function ({ store: n, ...r }) {
		const u = yo();
		((n = n || u), gt(n, !1));
		const l = n.useState((o) => (o.orientation === "horizontal" ? "vertical" : "horizontal"));
		return ((r = ES({ ...r, orientation: l })), r);
	}),
	aD = De(function (n) {
		return Ue(uz, CS(n));
	}),
	sz = "hr",
	lz = Le(function ({ store: n, ...r }) {
		const u = Ap();
		return ((n = n || u), (r = CS({ store: n, ...r })), r);
	}),
	oz = De(function (n) {
		return Ue(sz, lz(n));
	}),
	cz = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
	fz = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (n, r, u) => (u ? u.toUpperCase() : r.toLowerCase())),
	Q0 = (e) => {
		const n = fz(e);
		return n.charAt(0).toUpperCase() + n.slice(1);
	},
	TS = (...e) =>
		e
			.filter((n, r, u) => !!n && n.trim() !== "" && u.indexOf(n) === r)
			.join(" ")
			.trim(),
	dz = (e) => {
		for (const n in e) if (n.startsWith("aria-") || n === "role" || n === "title") return !0;
	},
	hz = {
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
	mz = (0, w.forwardRef)(
		(
			{
				color: e = "currentColor",
				size: n = 24,
				strokeWidth: r = 2,
				absoluteStrokeWidth: u,
				className: l = "",
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
					...hz,
					width: n,
					height: n,
					stroke: e,
					strokeWidth: u ? (Number(r) * 24) / Number(n) : r,
					className: TS("lucide", l),
					...(!o && !dz(h) && { "aria-hidden": "true" }),
					...h,
				},
				[...f.map(([v, y]) => (0, w.createElement)(v, y)), ...(Array.isArray(o) ? o : [o])],
			),
	),
	xh = (e, n) => {
		const r = (0, w.forwardRef)(({ className: u, ...l }, o) =>
			(0, w.createElement)(mz, { ref: o, iconNode: n, className: TS(`lucide-${cz(Q0(e))}`, `lucide-${e}`, u), ...l }),
		);
		return ((r.displayName = Q0(e)), r);
	},
	vz = [
		["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
		["path", { d: "M12 19V5", key: "x0mq9r" }],
	],
	gz = xh("arrow-up", vz),
	yz = [
		["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
		["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
		["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
	],
	bz = xh("ellipsis", yz),
	pz = [
		[
			"path",
			{
				d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
				key: "1miecu",
			},
		],
	],
	Sz = xh("paperclip", pz),
	wz = (0, w.memo)(function (n) {
		const { channelName: r, items: u } = n;
		return (0, p.jsxs)(rz, {
			placement: "bottom-end",
			children: [
				(0, p.jsx)(jM, {
					className: "ChannelRowMenu-trigger",
					"aria-label": `Actions for #${r}`,
					children: (0, p.jsx)(bz, { size: 16, "aria-hidden": "true" }),
				}),
				(0, p.jsx)(dM, {
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					className: "ChannelRowMenu-popover",
					"aria-label": `Actions for #${r}`,
					children: u.map((l) =>
						"separator" in l
							? (0, p.jsx)(oz, { className: "ChannelRowMenu-separator" }, l.id)
							: (0, p.jsx)(
									FM,
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
	_z = "input";
function P0(e, n, r) {
	if (!r) return !1;
	const u = e.find((l) => !l.disabled && l.value);
	return u?.value === n;
}
function Y0(e, n) {
	return !n || e == null ? !1 : ((e = fp(e)), n.length > e.length && n.toLowerCase().indexOf(e.toLowerCase()) === 0);
}
function xz(e) {
	return e.type === "input";
}
function Ez(e) {
	return e === "inline" || e === "list" || e === "both" || e === "none";
}
function Cz(e) {
	const n = e.find((r) => {
		var u;
		return r.disabled ? !1 : ((u = r.element) == null ? void 0 : u.getAttribute("role")) !== "tab";
	});
	return n?.id;
}
var Tz = Le(function ({
		store: n,
		focusable: r = !0,
		autoSelect: u = !1,
		getAutoSelectId: l,
		setValueOnChange: o,
		showMinLength: f = 0,
		showOnChange: h,
		showOnMouseDown: m,
		showOnClick: v = m,
		showOnKeyDown: y,
		showOnKeyPress: _ = y,
		blurActiveItemOnClick: b,
		setValueOnClick: S = !0,
		moveOnKeyPress: E = !0,
		autoComplete: C = "list",
		...T
	}) {
		const D = ko();
		((n = n || D), gt(n, !1));
		const A = (0, w.useRef)(null),
			[N, R] = xp(),
			$ = (0, w.useRef)(!1),
			I = (0, w.useRef)(!1),
			j = n.useState((ae) => ae.virtualFocus && u),
			z = C === "inline" || C === "both",
			[U, L] = (0, w.useState)(z);
		vO(() => {
			z && L(!0);
		}, [z]);
		const Q = n.useState("value"),
			ie = (0, w.useRef)();
		(0, w.useEffect)(
			() =>
				Ft(n, ["selectedValue", "activeId"], (ae, we) => {
					ie.current = we.selectedValue;
				}),
			[],
		);
		const X = n.useState((ae) => {
				var we;
				if (
					z &&
					U &&
					!(
						ae.activeValue &&
						Array.isArray(ae.selectedValue) &&
						(ae.selectedValue.includes(ae.activeValue) || ((we = ie.current) != null && we.includes(ae.activeValue)))
					)
				)
					return ae.activeValue;
			}),
			F = n.useState("renderedItems"),
			ne = n.useState("open"),
			k = n.useState("contentElement"),
			H = (0, w.useMemo)(() => {
				if (!z || !U) return Q;
				if (P0(F, X, j)) {
					if (Y0(Q, X)) {
						const ae = X?.slice(Q.length) || "";
						return Q + ae;
					}
					return Q;
				}
				return X || Q;
			}, [z, U, F, X, j, Q]);
		((0, w.useEffect)(() => {
			const ae = A.current;
			if (!ae) return;
			const we = () => L(!0);
			return (
				ae.addEventListener("combobox-item-move", we),
				() => {
					ae.removeEventListener("combobox-item-move", we);
				}
			);
		}, []),
			(0, w.useEffect)(() => {
				if (!z || !U || !X || !P0(F, X, j) || !Y0(Q, X)) return;
				let ae = Qu;
				return (
					queueMicrotask(() => {
						const we = A.current;
						if (!we) return;
						const { start: dt, end: je } = Ed(we),
							It = Q.length,
							Ut = X.length;
						(nd(we, It, Ut),
							(ae = () => {
								if (!Ur(we)) return;
								const { start: We, end: tn } = Ed(we);
								We === It && tn === Ut && nd(we, dt, je);
							}));
					}),
					() => ae()
				);
			}, [N, z, U, X, F, j, Q]));
		const B = (0, w.useRef)(null),
			ue = _e(l),
			fe = (0, w.useRef)(null);
		((0, w.useEffect)(() => {
			if (!ne || !k) return;
			const ae = Pd(k);
			if (!ae) return;
			B.current = ae;
			const we = () => {
					$.current = !1;
				},
				dt = () => {
					if (!n || !$.current) return;
					const { activeId: It } = n.getState();
					It !== null && It !== fe.current && ($.current = !1);
				},
				je = { passive: !0, capture: !0 };
			return (
				ae.addEventListener("wheel", we, je),
				ae.addEventListener("touchmove", we, je),
				ae.addEventListener("scroll", dt, je),
				() => {
					(ae.removeEventListener("wheel", we, !0),
						ae.removeEventListener("touchmove", we, !0),
						ae.removeEventListener("scroll", dt, !0));
				}
			);
		}, [ne, k, n]),
			He(() => {
				Q && (I.current || ($.current = !0));
			}, [Q]),
			He(() => {
				(j !== "always" && ne) || ($.current = ne);
			}, [j, ne]));
		const Ie = n.useState("resetValueOnSelect");
		(Ya(() => {
			var ae, we;
			const dt = $.current;
			if (!n || !ne || (!dt && !Ie)) return;
			const { baseElement: je, contentElement: It, activeId: Ut } = n.getState();
			if (!(je && !Ur(je))) {
				if (It?.hasAttribute("data-placing")) {
					const We = new MutationObserver(R);
					return (We.observe(It, { attributeFilter: ["data-placing"] }), () => We.disconnect());
				}
				if (j && dt) {
					const We = ue(F),
						tn = We !== void 0 ? We : (ae = Cz(F)) != null ? ae : n.first();
					((fe.current = tn), n.move(tn ?? null));
				} else {
					const We = (we = n.item(Ut || n.first())) == null ? void 0 : we.element;
					We && "scrollIntoView" in We && We.scrollIntoView({ block: "nearest", inline: "nearest" });
				}
			}
		}, [n, ne, N, Q, j, Ie, ue, F]),
			(0, w.useEffect)(() => {
				if (!z) return;
				const ae = A.current;
				if (!ae) return;
				const we = [ae, k].filter((je) => !!je),
					dt = (je) => {
						we.every((It) => zr(je, It)) && n?.setValue(H);
					};
				for (const je of we) je.addEventListener("focusout", dt);
				return () => {
					for (const je of we) je.removeEventListener("focusout", dt);
				};
			}, [z, k, n, H]));
		const O = (ae) => ae.currentTarget.value.length >= f,
			G = T.onChange,
			re = ut(h ?? O),
			se = ut(o ?? !n.tag),
			me = _e((ae) => {
				if ((G?.(ae), ae.defaultPrevented || !n)) return;
				const we = ae.currentTarget,
					{ value: dt, selectionStart: je, selectionEnd: It } = we,
					Ut = ae.nativeEvent;
				if ((($.current = !0), xz(Ut) && (Ut.isComposing && (($.current = !1), (I.current = !0)), z))) {
					const We = Ut.inputType === "insertText" || Ut.inputType === "insertCompositionText",
						tn = je === dt.length;
					L(We && tn);
				}
				if (se(ae)) {
					const We = dt === n.getState().value;
					(n.setValue(dt),
						queueMicrotask(() => {
							nd(we, je, It);
						}),
						z && j && We && R());
				}
				(re(ae) && n.show(), (!j || !$.current) && n.setActiveId(null));
			}),
			ye = T.onCompositionEnd,
			pe = _e((ae) => {
				(($.current = !0), (I.current = !1), ye?.(ae), !ae.defaultPrevented && j && R());
			}),
			Ze = T.onMouseDown,
			Ne = ut(b ?? (() => !!n?.getState().includesBaseElement)),
			rt = ut(S),
			Nt = ut(v ?? O),
			Kt = _e((ae) => {
				(Ze?.(ae),
					!ae.defaultPrevented &&
						(ae.button ||
							ae.ctrlKey ||
							(n &&
								(Ne(ae) && n.setActiveId(null),
								rt(ae) && n.setValue(H),
								Nt(ae) && Ia(ae.currentTarget, "mouseup", n.show)))));
			}),
			zt = T.onKeyDown,
			kt = ut(_ ?? O),
			de = _e((ae) => {
				if (
					(zt?.(ae),
					ae.repeat || ($.current = !1),
					ae.defaultPrevented || ae.ctrlKey || ae.altKey || ae.shiftKey || ae.metaKey || !n)
				)
					return;
				const { open: we } = n.getState();
				we || ((ae.key === "ArrowUp" || ae.key === "ArrowDown") && kt(ae) && (ae.preventDefault(), n.show()));
			}),
			Te = T.onBlur,
			ot = _e((ae) => {
				(($.current = !1), Te?.(ae), ae.defaultPrevented);
			}),
			Me = Oi(T.id),
			Dt = Ez(C) ? C : void 0,
			bt = n.useState((ae) => ae.activeId === null);
		return (
			(T = {
				id: Me,
				role: "combobox",
				"aria-autocomplete": Dt,
				"aria-haspopup": mo(k, "listbox"),
				"aria-expanded": ne,
				"aria-controls": k?.id,
				"data-active-item": bt || void 0,
				value: H,
				...T,
				ref: yt(A, T.ref),
				onChange: me,
				onCompositionEnd: pe,
				onMouseDown: Kt,
				onKeyDown: de,
				onBlur: ot,
			}),
			(T = lh({ store: n, focusable: r, ...T, moveOnKeyPress: (ae) => (ho(E, ae) ? !1 : (z && L(!0), !0)) })),
			(T = ph({ store: n, ...T })),
			{ autoComplete: "off", ...T }
		);
	}),
	Az = De(function (n) {
		return Ue(_z, Tz(n));
	}),
	Rz = "div";
function Oz(e, n) {
	if (n != null) return e == null ? !1 : Array.isArray(e) ? e.includes(n) : e === n;
}
function Nz(e) {
	var n;
	return (n = { menu: "menuitem", listbox: "option", tree: "treeitem" }[e]) != null ? n : "option";
}
var Mz = Le(function ({
		store: n,
		value: r,
		hideOnClick: u,
		setValueOnClick: l,
		selectValueOnClick: o = !0,
		resetValueOnSelect: f,
		focusOnHover: h = !1,
		moveOnKeyPress: m = !0,
		getItem: v,
		...y
	}) {
		var _;
		const b = xS();
		((n = n || b), gt(n, !1));
		const {
				resetValueOnSelectState: S,
				multiSelectable: E,
				selected: C,
			} = zp(n, {
				resetValueOnSelectState: "resetValueOnSelect",
				multiSelectable(L) {
					return Array.isArray(L.selectedValue);
				},
				selected(L) {
					return Oz(L.selectedValue, r);
				},
			}),
			T = (0, w.useCallback)(
				(L) => {
					const Q = { ...L, value: r };
					return v ? v(Q) : Q;
				},
				[r, v],
			);
		((l = l ?? !E), (u = u ?? (r != null && !E)));
		const D = y.onClick,
			A = ut(l),
			N = ut(o),
			R = ut((_ = f ?? S) != null ? _ : E),
			$ = ut(u),
			I = _e((L) => {
				(D?.(L),
					!L.defaultPrevented &&
						(Sp(L) ||
							pp(L) ||
							(r != null &&
								(N(L) &&
									(R(L) && n?.resetValue(),
									n?.setSelectedValue((Q) =>
										Array.isArray(Q) ? (Q.includes(r) ? Q.filter((ie) => ie !== r) : [...Q, r]) : r,
									)),
								A(L) && n?.setValue(r)),
							$(L) && n?.hide())));
			}),
			j = y.onKeyDown,
			z = _e((L) => {
				if ((j?.(L), L.defaultPrevented)) return;
				const Q = n?.getState().baseElement;
				Q &&
					(Ur(Q) ||
						((L.key.length === 1 || L.key === "Backspace" || L.key === "Delete") &&
							(queueMicrotask(() => Q.focus()), Jn(Q) && n?.setValue(Q.value))));
			});
		(E && C != null && (y = { "aria-selected": C, ...y }),
			(y = Pt(
				y,
				(L) =>
					(0, p.jsx)(WM.Provider, { value: r, children: (0, p.jsx)(ez.Provider, { value: C ?? !1, children: L }) }),
				[r, C],
			)),
			(y = { role: Nz((0, w.useContext)(_S)), children: r, ...y, onClick: I, onKeyDown: z }));
		const U = ut(m);
		return (
			(y = _h({
				store: n,
				...y,
				getItem: T,
				moveOnKeyPress: (L) => {
					if (!U(L)) return !1;
					const Q = new Event("combobox-item-move");
					return (n?.getState().baseElement?.dispatchEvent(Q), !0);
				},
			})),
			(y = wh({ store: n, focusOnHover: h, ...y })),
			y
		);
	}),
	zz = go(
		De(function (n) {
			return Ue(Rz, Mz(n));
		}),
	),
	kz = "div",
	AS = Le(function ({ store: n, alwaysVisible: r, ...u }) {
		const l = xS(!0),
			o = XM();
		n = n || o;
		const f = !!n && n === l;
		gt(n, !1);
		const h = (0, w.useRef)(null),
			m = Oi(u.id),
			v = n.useState("mounted"),
			y = Co(v, u.hidden, r),
			_ = y ? { ...u.style, display: "none" } : u.style,
			b = n.useState((N) => Array.isArray(N.selectedValue)),
			S = mO(h, "role", u.role),
			E = ((S === "listbox" || S === "tree" || S === "grid") && b) || void 0,
			[C, T] = (0, w.useState)(!1),
			D = n.useState("contentElement");
		(He(() => {
			if (!v) return;
			const N = h.current;
			if (!N || D !== N) return;
			const R = () => {
					T(!!N.querySelector("[role='listbox']"));
				},
				$ = new MutationObserver(R);
			return ($.observe(N, { subtree: !0, childList: !0, attributeFilter: ["role"] }), R(), () => $.disconnect());
		}, [v, D]),
			C || (u = { role: "listbox", "aria-multiselectable": E, ...u }),
			(u = Pt(u, (N) => (0, p.jsx)(JM, { value: n, children: (0, p.jsx)(_S.Provider, { value: S, children: N }) }), [
				n,
				S,
			])));
		const A = m && (!l || !f) ? n.setContentElement : null;
		return ((u = { id: m, hidden: y, ...u, ref: yt(A, h, u.ref), style: _ }), Hr(u));
	}),
	uD = De(function (n) {
		return Ue(kz, AS(n));
	}),
	Dz = "div";
function jz(e, ...n) {
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
var qz = Le(function ({
		store: n,
		modal: r,
		tabIndex: u,
		alwaysVisible: l,
		autoFocusOnHide: o = !0,
		hideOnInteractOutside: f = !0,
		...h
	}) {
		const m = ko();
		((n = n || m), gt(n, !1));
		const v = n.useState("baseElement"),
			y = (0, w.useRef)(!1),
			_ = Tt(n.tag, (b) => b?.renderedItems.length);
		return (
			(h = AS({ store: n, alwaysVisible: l, ...h })),
			(h = bh({
				store: n,
				modal: r,
				alwaysVisible: l,
				backdrop: !1,
				autoFocusOnShow: !1,
				finalFocus: v,
				preserveTabOrderAnchor: null,
				unstable_treeSnapshotKey: _,
				...h,
				getPersistentElements() {
					var b;
					const S = ((b = h.getPersistentElements) == null ? void 0 : b.call(h)) || [];
					if (!r || !n) return S;
					const { contentElement: E, baseElement: C } = n.getState();
					if (!C) return S;
					const T = it(C),
						D = [];
					if ((E?.id && D.push(`[aria-controls~="${E.id}"]`), C?.id && D.push(`[aria-controls~="${C.id}"]`), !D.length))
						return [...S, C];
					const A = D.join(","),
						N = T.querySelectorAll(A);
					return [...S, ...N];
				},
				autoFocusOnHide(b) {
					return ho(o, b) ? !1 : y.current ? ((y.current = !1), !1) : !0;
				},
				hideOnInteractOutside(b) {
					var S, E;
					const C = n?.getState(),
						T = (S = C?.contentElement) == null ? void 0 : S.id,
						D = (E = C?.baseElement) == null ? void 0 : E.id;
					if (jz(b.target, T, D)) return !1;
					const A = typeof f == "function" ? f(b) : f;
					return (A && (y.current = b.type === "click"), A);
				},
			})),
			h
		);
	}),
	Iz = ys(
		De(function (n) {
			return Ue(Dz, qz(n));
		}),
		ko,
	),
	sD = (0, w.createContext)(null),
	lD = (0, w.createContext)(null),
	ps = Wn([ls], [bo]),
	Uz = ps.useContext,
	oD = ps.useScopedContext,
	cD = ps.useProviderContext,
	fD = ps.ContextProvider,
	dD = ps.ScopedContextProvider,
	Lz = vo() && yp();
function $z({ tag: e, ...n } = {}) {
	const r = xo(n.store, Op(e, ["value", "rtl"]));
	const u = e?.getState(),
		l = r?.getState(),
		o = Ee(n.activeId, l?.activeId, n.defaultActiveId, null),
		f = cS({
			...n,
			activeId: o,
			includesBaseElement: Ee(n.includesBaseElement, l?.includesBaseElement, !0),
			orientation: Ee(n.orientation, l?.orientation, "vertical"),
			focusLoop: Ee(n.focusLoop, l?.focusLoop, !0),
			focusWrap: Ee(n.focusWrap, l?.focusWrap, !0),
			virtualFocus: Ee(n.virtualFocus, l?.virtualFocus, !0),
		}),
		h = SS({ ...n, placement: Ee(n.placement, l?.placement, "bottom-start") }),
		m = Ee(n.value, l?.value, n.defaultValue, ""),
		v = Ee(n.selectedValue, l?.selectedValue, u?.values, n.defaultSelectedValue, ""),
		y = Array.isArray(v),
		_ = {
			...f.getState(),
			...h.getState(),
			value: m,
			selectedValue: v,
			resetValueOnSelect: Ee(n.resetValueOnSelect, l?.resetValueOnSelect, y),
			resetValueOnHide: Ee(n.resetValueOnHide, l?.resetValueOnHide, y && !e),
			activeValue: l?.activeValue,
		},
		b = Vn(_, f, h, r);
	return (
		Lz &&
			Wt(b, () =>
				Ft(b, ["virtualFocus"], () => {
					b.setState("virtualFocus", !1);
				}),
			),
		Wt(b, () => {
			if (e)
				return dn(
					Ft(b, ["selectedValue"], (S) => {
						Array.isArray(S.selectedValue) && e.setValues(S.selectedValue);
					}),
					Ft(e, ["values"], (S) => {
						b.setState("selectedValue", S.values);
					}),
				);
		}),
		Wt(b, () =>
			Ft(b, ["resetValueOnHide", "mounted"], (S) => {
				S.resetValueOnHide && (S.mounted || b.setState("value", m));
			}),
		),
		Wt(b, () =>
			Ft(b, ["open"], (S) => {
				S.open || (b.setState("activeId", o), b.setState("moves", 0));
			}),
		),
		Wt(b, () =>
			Ft(b, ["moves", "activeId"], (S, E) => {
				S.moves === E.moves && b.setState("activeValue", void 0);
			}),
		),
		Wt(b, () =>
			eo(b, ["moves", "renderedItems"], (S, E) => {
				if (S.moves === E.moves) return;
				const { activeId: C } = b.getState(),
					T = f.item(C);
				b.setState("activeValue", T?.value);
			}),
		),
		{
			...h,
			...f,
			...b,
			tag: e,
			setValue: (S) => b.setState("value", S),
			resetValue: () => b.setState("value", _.value),
			setSelectedValue: (S) => b.setState("selectedValue", S),
		}
	);
}
function Bz(e) {
	const n = Uz();
	return ((e = { ...e, tag: e.tag !== void 0 ? e.tag : n }), xM(e));
}
function Vz(e, n, r) {
	return (
		Ya(n, [r.tag]),
		vt(e, r, "value", "setValue"),
		vt(e, r, "selectedValue", "setSelectedValue"),
		vt(e, r, "resetValueOnHide"),
		vt(e, r, "resetValueOnSelect"),
		Object.assign(fS(wS(e, n, r), n, r), { tag: r.tag })
	);
}
function Hz(e = {}) {
	e = Bz(e);
	const [n, r] = Eo($z, e);
	return Vz(n, r, e);
}
var Zz = le.union(
		le.literal("thumbs_up"),
		le.literal("heart"),
		le.literal("laugh"),
		le.literal("wow"),
		le.literal("sad"),
		le.literal("party"),
		le.literal("rocket"),
		le.literal("eyes"),
	),
	hD = le.object({ fileNodeId: le.string(), name: le.string() }),
	mD = le.union(le.literal("read"), le.literal("write"), le.literal("manage")),
	Qz = le.object({ message: le.string(), name: le.optional(le.string()) }),
	Pz = le.union(
		le.object({
			kind: le.literal("message"),
			messageId: le.id("messages"),
			revision: le.number(),
			sequence: le.number(),
		}),
		le.object({ kind: le.literal("channel"), channelId: le.id("channels"), revision: le.number() }),
		le.object({ kind: le.literal("reaction"), messageId: le.id("messages"), token: Zz, on: le.boolean() }),
		le.object({
			kind: le.literal("membership"),
			channelId: le.id("channels"),
			membershipRevision: le.number(),
			left: le.boolean(),
			deleted: le.boolean(),
			pending: le.boolean(),
		}),
	),
	vD = le.union(le.object({ _yay: Pz }), le.object({ _nay: Qz })),
	gD = le.union(
		le.object({
			kind: le.literal("block"),
			messageId: le.id("messages"),
			rootSequence: le.number(),
			replySequence: le.number(),
			renderedBlock: le.string(),
			sourceRevision: le.number(),
		}),
		le.object({ kind: le.literal("header"), name: le.string(), topic: le.string(), isPrivate: le.boolean() }),
		le.object({ kind: le.literal("archive"), archived: le.boolean() }),
		le.object({
			kind: le.literal("readers"),
			readerRevision: le.number(),
			readers: le.array(le.object({ userId: le.string(), membershipLifetime: le.number() })),
			deleted: le.boolean(),
		}),
	);
function RS(e) {
	if (e.text.trim() === "" && e.attachments.length === 0) return "Enter a message or attach a file.";
	if (e.attachments.length > 20 || e.attachments.some((r) => !r.fileNodeId || !r.name))
		return "A message can attach up to 20 named files.";
	if (e.mentions.length > 50 || e.mentions.some((r) => !r)) return "A message can mention up to 50 people.";
	const n = {
		text: e.text,
		attachments: e.attachments,
		editedAt: null,
		deletedAt: null,
		...(e.mentions.length > 0 ? { mentions: e.mentions } : {}),
		...(e.authorName !== null ? { authorName: e.authorName } : {}),
	};
	return new TextEncoder().encode(JSON.stringify(n)).byteLength > 16384
		? "This message is too long to store. Shorten it and send again."
		: null;
}
var Yz = { text: "", attachments: [], mentions: [], pending: [] },
	F0 = new WeakMap();
function Fz() {
	const e = new Map(),
		n = new Set();
	return {
		get: (r) => e.get(r) ?? Yz,
		subscribe: (r) => (
			n.add(r),
			() => {
				n.delete(r);
			}
		),
		set: (r, u) => {
			if (u.text.length > 16384) return "This draft is too long. Shorten it before adding more text.";
			if (u.mentions.length > 50) return "A message can mention up to 50 people.";
			const l = u.text !== "" || u.attachments.length > 0 || u.pending.length > 0;
			if (l && !e.has(r) && e.size >= 20) return "You have 20 saved drafts. Send or clear one before starting another.";
			if (
				u.pending.length > 5 ||
				[...e.entries()].reduce((o, [f, h]) => o + (f === r ? 0 : h.pending.length), u.pending.length) > 20
			)
				return "Retry or remove an unconfirmed message before sending another.";
			l ? e.set(r, u) : e.delete(r);
			for (const o of n) o();
			return null;
		},
	};
}
function OS(e, n) {
	let r = F0.get(e);
	r || ((r = Fz()), F0.set(e, r));
	const u = r;
	return {
		value: (0, w.useSyncExternalStore)(u.subscribe, () => u.get(n)),
		get: () => u.get(n),
		set: (l) => u.set(n, l),
	};
}
var Kz = 3 * 1024 * 1024;
function NS(e) {
	const n = "rootMessageId" in e.target,
		r = Kz - (n ? 32 * 1024 : 0),
		u = e.enabled || e.retain,
		l = Ye(Se.messages.latest_roots, u && "channelId" in e.target ? e.target : "skip"),
		o = Ye(Se.messages.latest_replies, u && "rootMessageId" in e.target ? e.target : "skip"),
		f = n ? o : l,
		[h, m] = (0, w.useState)(null),
		v = (0, w.useRef)(0),
		y = (0, w.useRef)(new Map()),
		_ = (0, w.useRef)({ head: null, rows: [] }),
		b = "rootMessageId" in e.target ? e.target.rootMessageId : e.target.channelId,
		S = u && (f !== null || e.retain),
		E = qd(
			(0, w.useMemo)(
				() =>
					Object.fromEntries(
						(S ? (h?.pages ?? []) : []).map((X) => [
							String(X.id),
							{
								query: n ? Se.messages.list_replies : Se.messages.list_roots,
								args: {
									...(n ? { rootMessageId: b } : { channelId: b }),
									anchorSequence: h.anchor,
									paginationOpts: {
										numItems: 50,
										cursor: X.cursor,
										...(X.endCursor ? { endCursor: X.endCursor } : {}),
									},
								},
							},
						]),
					),
				[S, h, n, b],
			),
		),
		C = e.retain ? _.current.head : (f ?? null),
		T = f === null && !e.retain,
		D = new Set(h?.pages.map((X) => X.id));
	for (const X of y.current.keys()) (!D.has(X) || T || !u) && y.current.delete(X);
	const A =
			h?.pages.map((X) => {
				const F = E[String(X.id)];
				return (
					e.enabled && f !== null && F && !(F instanceof Error) && y.current.set(X.id, F),
					{ descriptor: X, result: F ?? y.current.get(X.id) }
				);
			}) ?? [],
		N = A.find((X) => X.result instanceof Error)?.result,
		R = A.filter((X) => X.result !== void 0 && !(X.result instanceof Error)),
		$ = h === null ? (C?.messages ?? []) : R.flatMap((X) => X.result.page),
		I = e.retain ? _.current.rows : T ? [] : e.enabled ? $ : [],
		j = new TextEncoder().encode(JSON.stringify({ rows: I, head: C })).byteLength,
		z = R.at(-1),
		U = e.enabled && f !== null && (C === null || A.some((X) => E[String(X.descriptor.id)] === void 0));
	((0, w.useEffect)(() => {
		!e.enabled && !e.retain
			? ((_.current = { head: null, rows: [] }), m(null))
			: e.enabled && (_.current = { head: C, rows: I });
	}, [e.enabled, e.retain, C, I]),
		(0, w.useEffect)(() => {
			if (!h || !e.enabled) return;
			const X = R.some(({ descriptor: F, result: ne }) => !F.endCursor && !ne.isDone);
			if (R.some(({ result: F }) => F.pageStatus === "SplitRequired")) {
				const F = I[0]?.sequence ?? h.anchor;
				m({ anchor: F, pages: [{ id: ++v.current, cursor: null }], newerAnchor: h.newerAnchor, extend: !1 });
			} else
				j > r && h.pages.length > 1
					? m({ ...h, pages: h.pages.slice(1), newerAnchor: I[0]?.sequence ?? h.anchor })
					: h.extend && z
						? m({
								...h,
								extend: !1,
								pages: z.result.isDone
									? h.pages
									: [
											...h.pages.map((F) => ({ ...F, endCursor: z.result.continueCursor })),
											{ id: ++v.current, cursor: z.result.continueCursor },
										],
							})
						: X &&
							m({
								...h,
								pages: h.pages.map((F) => {
									const ne = E[String(F.id)];
									return !F.endCursor && ne && !(ne instanceof Error) && !ne.isDone
										? { ...F, endCursor: ne.continueCursor }
										: F;
								}),
							});
		}, [h, e.enabled, E, j]));
	const L = () => m(null),
		Q = () => {
			if (!e.enabled || U || !C) return;
			if (!h) {
				(C.messages.at(-1)?.sequence ?? 0) > 1 &&
					m({ anchor: C.sequence, pages: [{ id: ++v.current, cursor: null }], newerAnchor: C.sequence, extend: !0 });
				return;
			}
			if (!z || z.result.isDone) return;
			const X = [...h.pages, { id: ++v.current, cursor: z.result.continueCursor }],
				F = n ? 2 : 5;
			m({ ...h, pages: X.slice(-F), newerAnchor: X.length > F ? (I[0]?.sequence ?? h.anchor) : h.newerAnchor });
		},
		ie = () => {
			!h?.newerAnchor ||
				!e.enabled ||
				U ||
				(h.newerAnchor >= (C?.sequence ?? 0)
					? L()
					: m({
							anchor: h.newerAnchor,
							pages: [{ id: ++v.current, cursor: null }],
							newerAnchor: Math.min(C?.sequence ?? h.newerAnchor, h.newerAnchor + 50),
							extend: !1,
						}));
		};
	return {
		rows: I,
		denied: T,
		loading: U,
		error: T ? "Messages are unavailable. Your access may have changed." : N instanceof Error ? N.message : null,
		sequence: C?.sequence ?? 0,
		atLatest: h === null,
		hasOlder: h === null ? (C?.messages.at(-1)?.sequence ?? 0) > 1 : !!z && !z.result.isDone,
		hasNewer: h !== null,
		newCount: h ? Math.max(0, (C?.sequence ?? 0) - h.anchor) : 0,
		older: Q,
		newer: ie,
		latest: L,
	};
}
var K0 = 128;
function Gz(e) {
	return new TextEncoder().encode(e).byteLength;
}
function Xz(e) {
	if (e === null) return null;
	const n = e
		.replace(/[\p{Cc}\p{Cf}]+/gu, " ")
		.replace(/\\/g, "\\\\")
		.replace(/\*/g, "\\*")
		.trim();
	if (n === "") return null;
	if (Gz(n) <= K0) return n;
	const r = new TextEncoder().encode(n).slice(0, K0);
	return new TextDecoder().decode(r).replace(/�$/, "");
}
function MS(e) {
	const n = Hn(),
		r = Dr(Se.messages.send),
		u = Dr(Se.messages.reply),
		l = Ab(Se.files.authorize_selection),
		o = (0, w.useRef)(new Set()),
		f = (0, w.useRef)(e.onRequestSettled);
	f.current = e.onRequestSettled;
	const [h, m] = (0, w.useState)(null),
		v = async (_) => {
			if (o.current.has(_.clientRequestId)) return;
			if (!n.ready || !n.can_request_now()) {
				e.draft.set({
					...e.draft.get(),
					pending: e.draft
						.get()
						.pending.map((E) =>
							E.clientRequestId === _.clientRequestId
								? { ...E, status: "failed", error: "Chitchat is reconnecting. Retry when it is ready." }
								: E,
						),
				});
				return;
			}
			(o.current.add(_.clientRequestId),
				e.onRequestStart(),
				e.draft.set({
					...e.draft.get(),
					pending: e.draft
						.get()
						.pending.map((E) =>
							E.clientRequestId === _.clientRequestId ? { ...E, status: "sending", error: null } : E,
						),
				}));
			const b = { clientRequestId: _.clientRequestId, text: _.text, attachments: _.attachments, mentions: _.mentions },
				S = () => (e.rootMessageId ? u({ ...b, rootMessageId: e.rootMessageId }) : r({ ...b, channelId: e.channelId }));
			try {
				let E = await S();
				if (E._nay?.message === "Check attachment access again before sending.") {
					const C = await l({
						pressToken: await e.client.getToken(),
						fileNodeIds: _.attachments.map((T) => T.fileNodeId),
					});
					if (C._nay) throw new Error(C._nay.message);
					if (_.attachments.some((T) => !C._yay.some((D) => D.fileNodeId === T.fileNodeId && D.name === T.name)))
						throw new Error("An attachment was renamed. Remove this pending send and select the file again.");
					if (!n.can_request_now()) throw new Error("Chitchat is reconnecting. Retry when it is ready.");
					E = await S();
				}
				if (E._nay) throw new Error(E._nay.message);
				e.draft.set({
					...e.draft.get(),
					pending: e.draft.get().pending.filter((C) => C.clientRequestId !== _.clientRequestId),
				});
			} catch (E) {
				e.draft.set({
					...e.draft.get(),
					pending: e.draft
						.get()
						.pending.map((C) =>
							C.clientRequestId === _.clientRequestId ? { ...C, status: "failed", error: so(E) } : C,
						),
				});
			} finally {
				(o.current.delete(_.clientRequestId), f.current());
			}
		};
	return {
		enqueue: (_, b, S) => {
			if (!e.canWrite || !n.canSend || !n.can_request_now())
				return (m("Chitchat is reconnecting or read-only. Your draft is kept."), !1);
			const E = RS({ text: _, attachments: b, mentions: S, authorName: Xz(n.member?.displayName ?? null) });
			if (E) return (m(E), !1);
			const C = {
					clientRequestId: crypto.randomUUID(),
					text: _,
					attachments: b,
					mentions: S,
					status: "sending",
					error: null,
				},
				T = e.draft.set({
					...e.draft.get(),
					text: "",
					attachments: [],
					mentions: [],
					pending: [...e.draft.get().pending, C],
				});
			return T ? (m(T), !1) : (m(null), v(C), !0);
		},
		retry: (_) => void v(_),
		error: h,
		busy: e.draft.value.pending.some((_) => _.status === "sending"),
	};
}
function Jz(e) {
	const [n, r] = (0, w.useState)({}),
		[u, l] = (0, w.useState)(!1),
		[o, f] = (0, w.useState)(null),
		h = (0, w.useRef)(new Map()),
		m = (0, w.useRef)(null);
	(0, w.useEffect)(() => {
		m.current && (h.current.get(m.current)?.focus(), (m.current = null));
	}, [n]);
	const v = async (y) => {
		(l(!0), f(null), (m.current = y));
		try {
			const _ = await e.client.fetchJson("/api/v1/files/download-urls", {
				fileNodeIds: e.attachments.map((S) => S.fileNodeId),
			});
			if (_.status !== 200 || !_.body) throw new Error(_.body?.message ?? "The file links are unavailable.");
			r(Object.fromEntries(_.body.items.map((S) => [S.fileNodeId, S.url])));
			const b = _.body.errors.find((S) => S.fileNodeId === y);
			b && f(b.message);
		} catch (_) {
			f(so(_));
		} finally {
			l(!1);
		}
	};
	return (0, p.jsxs)("div", {
		className: "message-attachments",
		children: [
			e.attachments.map((y) =>
				(0, p.jsx)(
					"span",
					{
						className: "attachment",
						children: n[y.fileNodeId]
							? (0, p.jsxs)(p.Fragment, {
									children: [
										(0, p.jsx)("a", {
											ref: (_) => {
												_ ? h.current.set(y.fileNodeId, _) : h.current.delete(y.fileNodeId);
											},
											className: "attachment-link",
											href: n[y.fileNodeId],
											target: "_blank",
											rel: "noopener noreferrer",
											children: y.name,
										}),
										(0, p.jsx)("button", {
											type: "button",
											className: "attachment-button",
											disabled: u,
											onClick: () => void v(y.fileNodeId),
											children: "Refresh link",
										}),
									],
								})
							: (0, p.jsx)("button", {
									type: "button",
									className: "attachment-button",
									disabled: u,
									onClick: () => void v(y.fileNodeId),
									children: u ? `Getting link for ${y.name}…` : y.name,
								}),
					},
					y.fileNodeId,
				),
			),
			o ? (0, p.jsx)("span", { className: "attachment-error", role: "alert", children: o }) : null,
		],
	});
}
function Wz(e) {
	const n = (0, w.useId)(),
		[r, u] = (0, w.useState)([]),
		[l, o] = (0, w.useState)(null),
		[f, h] = (0, w.useState)(null),
		[m, v] = (0, w.useState)(!1),
		[y, _] = (0, w.useState)(!0),
		[b, S] = (0, w.useState)(null),
		[E, C] = (0, w.useState)(0);
	return (
		(0, w.useEffect)(() => {
			let T = !1;
			return (
				_(!0),
				S(null),
				u([]),
				e.client
					.fetchJson("/api/v1/files/list", {
						path: "/",
						recursive: !0,
						kind: "file",
						limit: 100,
						scanLimit: 1e4,
						contentTypePrefixes: ["image/", "video/", "audio/", "application/", "text/"],
						cursor: l,
					})
					.then((D) => {
						if (!T) {
							if (D.status !== 200) {
								S(D.body?.message ?? "Files could not be loaded.");
								return;
							}
							if (!D.body) {
								S("Files could not be loaded.");
								return;
							}
							(u(D.body.items), h(D.body.cursor), v(D.body.isDone));
						}
					})
					.catch((D) => {
						T || S(so(D));
					})
					.finally(() => {
						T || _(!1);
					}),
				() => {
					T = !0;
				}
			);
		}, [e.client, l, E]),
		(0, p.jsxs)(Za, {
			labelledBy: n,
			onClose: e.onClose,
			children: [
				(0, p.jsx)("h2", { id: n, className: "dialog-title", children: "Attach a file" }),
				(0, p.jsx)("button", {
					type: "button",
					className: "button",
					"data-dialog-initial": !0,
					onClick: e.onClose,
					children: "Cancel",
				}),
				(0, p.jsx)("ul", {
					className: "picker-list",
					children: r.map((T) =>
						(0, p.jsx)(
							"li",
							{
								children: (0, p.jsxs)("button", {
									type: "button",
									className: "picker-item",
									onClick: () => e.onPick({ fileNodeId: T.nodeId, name: T.name }),
									children: [
										(0, p.jsx)("span", { className: "picker-item-name", children: T.name }),
										(0, p.jsx)("span", { className: "picker-item-path", children: T.path }),
									],
								}),
							},
							T.nodeId,
						),
					),
				}),
				y ? (0, p.jsx)("p", { role: "status", children: "Loading files…" }) : null,
				b
					? (0, p.jsxs)("p", {
							role: "alert",
							children: [b, " ", (0, p.jsx)("button", { type: "button", onClick: () => C(E + 1), children: "Retry" })],
						})
					: null,
				!y && !b && r.length === 0
					? (0, p.jsx)("p", { children: m ? "No files found." : "No matching files on this page." })
					: null,
				l !== null
					? (0, p.jsx)("button", {
							type: "button",
							className: "button",
							disabled: y,
							onClick: () => o(null),
							children: "First page",
						})
					: null,
				m
					? null
					: (0, p.jsx)("button", {
							type: "button",
							className: "button",
							disabled: y || !!b,
							onClick: () => o(f),
							children: "Next files",
						}),
			],
		})
	);
}
function zS(e) {
	const n = (0, w.useId)(),
		r = (0, w.useId)(),
		u = Hn(),
		[l, o] = (0, w.useState)(!1),
		[f, h] = (0, w.useState)(null),
		[m, v] = (0, w.useState)(null),
		[y, _] = (0, w.useState)(null),
		b = Ye(Se.members.list, m !== null && u.ready ? { paginationOpts: { numItems: 100, cursor: y } } : "skip"),
		S = e.draft.value.text,
		E = (0, w.useRef)(null),
		C = (0, w.useRef)(null),
		T = Hz({
			placement: "top-start",
			resetValueOnHide: !1,
			setOpen: (j) => {
				j || v(null);
			},
		}),
		D = m && b ? oE(b.page, m.query, e.userId).slice(0, 8) : [],
		A = m !== null && u.ready,
		N = (j) => h(e.draft.set({ ...e.draft.get(), ...j })),
		R = (j) => {
			if (!m) return;
			const z = cE(S, m.start, E.current?.selectionStart ?? S.length, j.label),
				U = new Map(e.draft.value.mentions);
			(U.set(j.userId, j.label), N({ text: z.text, mentions: [...U] }), (C.current = z.caret), T.hide());
		},
		$ = () => {
			if (e.busy || e.disabled) return;
			const j = S.trim();
			(!j && e.draft.value.attachments.length === 0) ||
				(e.onSend(j, e.draft.value.attachments, fE(e.draft.value.mentions, j)) && T.hide());
		},
		I = (j) => {
			if (!(j.nativeEvent.isComposing || j.keyCode === 229)) {
				if (A) {
					if (j.key === "ArrowLeft" || j.key === "ArrowRight") {
						T.hide();
						return;
					}
					if (j.key === "Escape") {
						(j.preventDefault(), j.stopPropagation(), T.hide());
						return;
					}
					if ((j.key === "Enter" || j.key === "Tab") && !j.shiftKey && D.length) {
						(j.preventDefault(), R(D.find((z) => `${r}-${z.userId}` === T.getState().activeId) ?? D[0]));
						return;
					}
				}
				j.key === "Enter" && !j.shiftKey && (j.preventDefault(), $());
			}
		};
	return (
		(0, w.useLayoutEffect)(() => {
			T.setOpen(A);
		}, [T, A]),
		(0, w.useLayoutEffect)(() => {
			C.current !== null &&
				E.current &&
				(E.current.focus(), E.current.setSelectionRange(C.current, C.current), (C.current = null));
		}, [S]),
		(0, p.jsxs)("div", {
			className: "composer",
			inert: e.inert || void 0,
			children: [
				e.draft.value.attachments.length
					? (0, p.jsx)("ul", {
							className: "composer-attachments",
							children: e.draft.value.attachments.map((j) =>
								(0, p.jsxs)(
									"li",
									{
										className: "composer-attachment",
										children: [
											(0, p.jsx)("span", { children: j.name }),
											(0, p.jsx)("button", {
												type: "button",
												className: "composer-attachment-remove",
												"aria-label": `Remove attachment ${j.name}`,
												onClick: () =>
													N({ attachments: e.draft.value.attachments.filter((z) => z.fileNodeId !== j.fileNodeId) }),
												children: "×",
											}),
										],
									},
									j.fileNodeId,
								),
							),
						})
					: null,
				(0, p.jsxs)("div", {
					className: "composer-bar",
					children: [
						(0, p.jsx)(Az, {
							store: T,
							autoSelect: !0,
							value: S,
							showOnClick: !1,
							showOnChange: !1,
							showOnKeyPress: !1,
							setValueOnChange: !1,
							render: (0, p.jsx)("textarea", {
								ref: E,
								className: "composer-input",
								"aria-label": e.label,
								"aria-describedby": n,
								placeholder: e.label,
								rows: 1,
								onChange: (j) => {
									const z = j.currentTarget.value;
									N({ text: z });
									const U = lE(z, j.currentTarget.selectionStart);
									(v(U), T.setValue(U?.query ?? ""));
								},
								onKeyDown: I,
								onPointerDown: T.hide,
								onScroll: T.render,
							}),
						}),
						(0, p.jsx)("button", {
							type: "button",
							className: "composer-action",
							"aria-label": "Attach file",
							disabled: e.disabled || e.draft.value.attachments.length >= 20,
							onClick: () => o(!0),
							children: (0, p.jsx)(Sz, { size: 18, "aria-hidden": "true" }),
						}),
						(0, p.jsx)("button", {
							type: "button",
							className: "composer-action composer-send",
							"aria-label": e.busy ? "Sending…" : "Send",
							disabled: e.busy || e.disabled,
							onClick: $,
							children: (0, p.jsx)(gz, { size: 18, "aria-hidden": "true" }),
						}),
					],
				}),
				(0, p.jsxs)(Iz, {
					store: T,
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					fitViewport: !0,
					hidden: !A,
					getAnchorRect: () => E.current?.getBoundingClientRect() ?? null,
					className: "mention-menu",
					"aria-label": "Mention somebody",
					children: [
						b ? null : (0, p.jsx)("div", { role: "status", children: "Loading people…" }),
						b && D.length === 0 ? (0, p.jsx)("div", { role: "status", children: "No match on this page." }) : null,
						D.map((j) =>
							(0, p.jsx)(
								zz,
								{
									id: `${r}-${j.userId}`,
									value: j.label,
									setValueOnClick: !1,
									focusOnHover: !0,
									className: "mention-option",
									onMouseDown: (z) => z.preventDefault(),
									onClick: () => R(j),
									children: j.label,
								},
								j.userId,
							),
						),
						y !== null
							? (0, p.jsx)("button", { type: "button", onClick: () => _(null), children: "First people" })
							: null,
						b && !b.isDone
							? (0, p.jsx)("button", { type: "button", onClick: () => _(b.continueCursor), children: "Next people" })
							: null,
					],
				}),
				(0, p.jsx)("span", { id: n, className: "composer-hint", children: "Enter sends · Shift+Enter for a new line" }),
				f ? (0, p.jsx)("p", { className: "form-error", role: "alert", children: f }) : null,
				l
					? (0, p.jsx)(Wz, {
							client: e.client,
							onClose: () => o(!1),
							onPick: (j) => {
								(e.draft.value.attachments.some((z) => z.fileNodeId === j.fileNodeId) ||
									N({ attachments: [...e.draft.value.attachments, j] }),
									o(!1));
							},
						})
					: null,
			],
		})
	);
}
function ek(e) {
	const [n, r] = (0, w.useState)(!1),
		u = (0, w.useRef)(null),
		l = (0, w.useRef)([]);
	(0, w.useEffect)(() => {
		n && l.current[0]?.focus();
	}, [n]);
	const o = () => {
		(r(!1), u.current?.focus());
	};
	return (0, p.jsxs)("span", {
		className: "add-reaction",
		children: [
			(0, p.jsx)("button", {
				ref: u,
				type: "button",
				className: "button message-action",
				disabled: e.disabled,
				"aria-expanded": n,
				onClick: () => (n ? o() : r(!0)),
				children: "Add reaction",
			}),
			n
				? (0, p.jsx)("span", {
						className: "reaction-palette",
						role: "group",
						"aria-label": "Choose a reaction",
						children: uE.map((f, h) => {
							const m = e.groups.some((v) => v.token === f && v.reactedByMe);
							return (0, p.jsx)(
								"button",
								{
									ref: (v) => {
										l.current[h] = v;
									},
									type: "button",
									className: "reaction-palette-item",
									"aria-pressed": m,
									"aria-label": Mb[f],
									onKeyDown: (v) => {
										v.key === "Escape"
											? (v.preventDefault(), v.stopPropagation(), o())
											: ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(v.key) &&
												(v.preventDefault(),
												l.current[(h + (["ArrowRight", "ArrowDown"].includes(v.key) ? 1 : 7)) % 8]?.focus());
									},
									onClick: () => {
										(e.onPick(f, m), o());
									},
									children: (0, p.jsx)("span", { "aria-hidden": "true", children: Nb[f] }),
								},
								f,
							);
						}),
					})
				: null,
		],
	});
}
var kS = 864e5;
function zd(e) {
	return new Date(e).toLocaleDateString(void 0, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}
function tk(e) {
	const n = new Date(e).toDateString();
	return n === new Date().toDateString()
		? "Today"
		: n === new Date(Date.now() - kS).toDateString()
			? "Yesterday"
			: zd(e);
}
function nk(e) {
	const n = e?.trim().split(/\s+/u);
	return n?.[0] ? `${n[0][0]}${n.length > 1 ? n.at(-1)[0] : ""}`.toUpperCase() : "•";
}
function ik(e, n, r) {
	const u = e.mentions
			.map((f) => ({ id: f, name: n.get(f) }))
			.filter((f) => typeof f.name == "string" && f.name !== "")
			.sort((f, h) => h.name.length - f.name.length),
		l = [];
	let o = e.text;
	for (; o; ) {
		const f = u
			.map((h) => ({ ...h, at: o.indexOf(`@${h.name}`) }))
			.filter((h) => h.at >= 0)
			.sort((h, m) => h.at - m.at)[0];
		if (!f) {
			l.push(o);
			break;
		}
		(f.at && l.push(o.slice(0, f.at)), l.push(f), (o = o.slice(f.at + f.name.length + 1)));
	}
	return l.map((f, h) =>
		typeof f == "string"
			? f
			: (0, p.jsxs)("span", { className: f.id === r ? "mention mention-self" : "mention", children: ["@", f.name] }, h),
	);
}
function DS(e) {
	const { doc: n } = e,
		r = Hn(),
		u = Ye(Se.reactions.get_for_message, r.ready ? { messageId: n._id } : "skip"),
		l = Ye(Se.threads.get_summary, e.onOpenThread && r.ready ? { rootMessageId: n._id } : "skip"),
		o = Dr(Se.messages.edit),
		f = Dr(Se.messages.remove),
		h = Dr(Se.reactions.set),
		[m, v] = (0, w.useState)(!1),
		[y, _] = (0, w.useState)(""),
		[b, S] = (0, w.useState)(!1),
		[E, C] = (0, w.useState)(!1),
		[T, D] = (0, w.useState)(null),
		[A, N] = (0, w.useState)(!1),
		R = (0, w.useRef)(null),
		$ = (0, w.useRef)(null),
		I = (0, w.useRef)(null),
		j = (0, w.useRef)(null),
		z = (0, w.useId)(),
		U = n.deletedAt !== null,
		L = e.canWrite && r.canSend;
	((0, w.useEffect)(() => {
		m && $.current?.focus();
	}, [m]),
		(0, w.useEffect)(() => {
			if (U) {
				const B = I.current?.contains(document.activeElement);
				(v(!1), S(!1), B && I.current?.focus());
			}
		}, [U]));
	const Q = async () => {
			if (!(E || !R.current || !r.can_request_now())) {
				(C(!0), D(null), e.onRequestStart());
				try {
					const B = await R.current();
					if (B._nay) {
						(D(B._nay.message), (R.current = null), N(!1));
						return;
					}
					((R.current = null), N(!1), v(!1), S(!1), queueMicrotask(() => (U ? I.current : j.current)?.focus()));
				} catch (B) {
					(D(so(B)), N(!0));
				} finally {
					(C(!1), e.onRequestSettled());
				}
			}
		},
		ie = () => {
			if (!(!L && !R.current)) {
				if (!R.current) {
					const B = n.mentions.filter((Ie) => {
							const O = e.memberNames.get(Ie);
							return !!O && y.includes(`@${O}`);
						}),
						ue = RS({ ...n, text: y.trim(), mentions: B });
					if (ue) {
						D(ue);
						return;
					}
					const fe = {
						messageId: n._id,
						clientRequestId: crypto.randomUUID(),
						expectedRevision: n.revision,
						text: y.trim(),
						mentions: B,
					};
					R.current = () => o(fe);
				}
				Q();
			}
		},
		X = () => {
			if (!(!L && !R.current)) {
				if (!R.current) {
					const B = { messageId: n._id, clientRequestId: crypto.randomUUID(), expectedRevision: n.revision };
					R.current = () => f(B);
				}
				Q();
			}
		},
		F = (B, ue) => {
			if (!L || E || R.current || !r.can_request_now()) return;
			const fe = { messageId: n._id, clientRequestId: crypto.randomUUID(), token: B, on: !ue };
			((R.current = () => h(fe)), Q());
		},
		ne = () => {
			E || ((R.current = null), N(!1), v(!1), S(!1), D(null), queueMicrotask(() => j.current?.focus()));
		},
		k = e.memberNames.get(n.authorHostUserId),
		H = Date.now() - n.createdAt < 7 * kS;
	return (0, p.jsxs)("li", {
		ref: I,
		className: e.isContinuation ? "message is-continuation" : "message is-leader",
		"data-key": n._id,
		tabIndex: -1,
		children: [
			(0, p.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: nk(k) }),
			(0, p.jsxs)("div", {
				className: e.isContinuation ? "message-head visually-hidden" : "message-head",
				children: [
					(0, p.jsx)("span", { className: "message-author", children: k === null ? "Former member" : (k ?? "…") }),
					(0, p.jsxs)("time", {
						className: "message-time",
						dateTime: new Date(n.createdAt).toISOString(),
						children: [
							H ? (0, p.jsxs)("span", { className: "visually-hidden", children: [zd(n.createdAt), " "] }) : null,
							(0, p.jsx)("span", {
								className: "message-clock",
								children: H
									? new Date(n.createdAt).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" })
									: zd(n.createdAt),
							}),
						],
					}),
				],
			}),
			U
				? (0, p.jsx)("p", { className: "message-text is-deleted", children: "Message deleted" })
				: m
					? (0, p.jsxs)("div", {
							className: "message-edit",
							children: [
								(0, p.jsx)("textarea", {
									ref: $,
									className: "composer-input",
									"aria-label": "Edit message",
									value: y,
									readOnly: E || A,
									onChange: (B) => _(B.currentTarget.value),
									onKeyDown: (B) => {
										B.nativeEvent.isComposing ||
											B.keyCode === 229 ||
											(B.key === "Escape"
												? (B.preventDefault(), B.stopPropagation(), ne())
												: B.key === "Enter" && !B.shiftKey && (B.preventDefault(), ie()));
									},
								}),
								(0, p.jsxs)("div", {
									className: "message-edit-actions",
									children: [
										(0, p.jsx)("button", {
											type: "button",
											className: "button",
											disabled: E,
											onClick: ne,
											children: "Cancel",
										}),
										(0, p.jsx)("button", {
											type: "button",
											className: "button button-primary",
											disabled: E || (!L && !A),
											onClick: ie,
											children: E ? "Saving…" : A ? "Retry" : "Save",
										}),
									],
								}),
							],
						})
					: (0, p.jsxs)(p.Fragment, {
							children: [
								(0, p.jsxs)("p", {
									className: "message-text",
									children: [
										ik(n, e.memberNames, e.userId),
										n.editedAt !== null
											? (0, p.jsx)("span", { className: "message-edited", children: " (edited)" })
											: null,
									],
								}),
								n.attachments.length ? (0, p.jsx)(Jz, { client: e.client, attachments: n.attachments }) : null,
								u?.length
									? (0, p.jsx)("div", {
											className: "message-reactions",
											children: u.map((B) =>
												(0, p.jsxs)(
													"button",
													{
														type: "button",
														disabled: !L || E,
														className: B.reactedByMe ? "reaction-chip is-mine" : "reaction-chip",
														"aria-pressed": B.reactedByMe,
														"aria-label": `${Mb[B.token]}, ${B.count} ${B.count === 1 ? "reaction" : "reactions"}`,
														onClick: () => F(B.token, B.reactedByMe),
														children: [
															(0, p.jsx)("span", { "aria-hidden": "true", children: Nb[B.token] }),
															(0, p.jsx)("span", { className: "reaction-chip-count", children: B.count }),
														],
													},
													B.token,
												),
											),
										})
									: null,
							],
						}),
			e.onOpenThread && (l?.totalReplyCount ?? 0) > 0
				? (0, p.jsxs)("button", {
						ref: e.replyTriggerRef,
						type: "button",
						className: "message-thread-summary",
						disabled: e.threadDisabled,
						onClick: () => e.onOpenThread?.(n._id),
						children: [
							(0, p.jsx)("span", { className: "message-thread-summary-icon", "aria-hidden": "true", children: "↳" }),
							(0, p.jsxs)("span", {
								className: "message-thread-summary-count",
								children: [l.totalReplyCount, " ", l.totalReplyCount === 1 ? "reply" : "replies"],
							}),
							l?.latestReplyAt
								? (0, p.jsxs)("span", {
										className: "message-thread-summary-recency",
										children: ["Last reply ", uo(l.latestReplyAt, Date.now())],
									})
								: null,
						],
					})
				: null,
			!U && !m
				? (0, p.jsxs)("div", {
						className: "message-actions",
						children: [
							e.onOpenThread && !l?.totalReplyCount
								? (0, p.jsx)("button", {
										ref: e.replyTriggerRef,
										type: "button",
										className: "button message-action",
										disabled: e.threadDisabled,
										onClick: () => e.onOpenThread?.(n._id),
										children: l === void 0 ? "View thread" : "Reply in thread",
									})
								: null,
							(0, p.jsx)(ek, { groups: u ?? [], disabled: !L || E, onPick: F }),
							n.authorHostUserId === e.userId && e.canWrite
								? (0, p.jsxs)(p.Fragment, {
										children: [
											(0, p.jsx)("button", {
												ref: j,
												type: "button",
												className: "button message-action",
												disabled: E || A,
												onClick: () => {
													(_(n.text), v(!0), D(null));
												},
												children: "Edit",
											}),
											(0, p.jsx)("button", {
												type: "button",
												className: "button message-action button-danger",
												disabled: E || A,
												onClick: () => S(!0),
												children: "Delete",
											}),
										],
									})
								: null,
						],
					})
				: null,
			T && !b
				? (0, p.jsxs)("p", {
						className: "form-error",
						role: "alert",
						children: [
							T,
							A && !m
								? (0, p.jsxs)(p.Fragment, {
										children: [
											(0, p.jsx)("button", {
												type: "button",
												className: "button",
												disabled: E || !r.ready,
												onClick: () => void Q(),
												children: "Retry change",
											}),
											(0, p.jsx)("button", {
												type: "button",
												className: "button",
												disabled: E,
												onClick: ne,
												children: "Dismiss",
											}),
										],
									})
								: null,
						],
					})
				: null,
			b
				? (0, p.jsxs)(Za, {
						labelledBy: z,
						onClose: ne,
						children: [
							(0, p.jsx)("h2", { id: z, className: "dialog-title", children: "Delete message?" }),
							(0, p.jsx)("p", { children: "The message is replaced by a “Message deleted” placeholder for everyone." }),
							T ? (0, p.jsx)("p", { className: "form-error", role: "alert", children: T }) : null,
							(0, p.jsxs)("div", {
								className: "dialog-actions",
								children: [
									(0, p.jsx)("button", {
										type: "button",
										className: "button",
										"data-dialog-initial": !0,
										disabled: E,
										onClick: ne,
										children: "Cancel",
									}),
									(0, p.jsx)("button", {
										type: "button",
										className: "button button-danger",
										disabled: E || (!L && !A),
										onClick: X,
										children: E ? "Deleting…" : A ? "Retry delete" : "Delete message",
									}),
								],
							}),
						],
					})
				: null,
		],
	});
}
function jS(e) {
	return (0, p.jsx)(p.Fragment, {
		children: e.draft.value.pending.map((n) =>
			(0, p.jsxs)(
				"li",
				{
					className: n.status === "failed" ? "message is-leader is-pending is-failed" : "message is-leader is-pending",
					children: [
						(0, p.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: "•" }),
						(0, p.jsxs)("div", {
							className: "message-head",
							children: [
								(0, p.jsx)("span", { className: "message-author", children: "You" }),
								(0, p.jsx)("span", {
									className: "message-time",
									children: n.status === "sending" ? "Sending…" : "Not confirmed",
								}),
							],
						}),
						(0, p.jsx)("p", { className: "message-text", children: n.text }),
						n.attachments.length
							? (0, p.jsx)("p", { className: "message-text", children: n.attachments.map((r) => r.name).join(", ") })
							: null,
						n.status === "failed"
							? (0, p.jsxs)("div", {
									className: "message-send-error",
									role: "alert",
									children: [
										(0, p.jsx)("span", { children: n.error }),
										(0, p.jsx)("button", {
											type: "button",
											className: "button",
											disabled: e.disabled || e.queue.busy,
											onClick: () => e.queue.retry(n),
											children: "Retry sending message",
										}),
										(0, p.jsx)("button", {
											type: "button",
											className: "button",
											onClick: () =>
												e.draft.set({
													...e.draft.get(),
													pending: e.draft.get().pending.filter((r) => r.clientRequestId !== n.clientRequestId),
												}),
											children: "Remove pending message",
										}),
									],
								})
							: null,
					],
				},
				n.clientRequestId,
			),
		),
	});
}
function qS(e) {
	return (0, p.jsxs)("div", {
		className: "log-older",
		children: [
			e.window.hasOlder
				? (0, p.jsx)("button", {
						type: "button",
						className: "button",
						disabled: e.disabled || e.window.loading,
						onClick: e.window.older,
						children: "Load older",
					})
				: null,
			e.window.hasNewer
				? (0, p.jsxs)(p.Fragment, {
						children: [
							(0, p.jsx)("button", {
								type: "button",
								className: "button",
								disabled: e.disabled || e.window.loading,
								onClick: e.window.newer,
								children: "Newer messages",
							}),
							(0, p.jsxs)("button", {
								type: "button",
								className: "button",
								disabled: e.disabled,
								onClick: e.window.latest,
								children: ["Latest messages", e.window.newCount ? ` (${e.window.newCount} newer)` : ""],
							}),
						],
					})
				: null,
			e.window.error
				? (0, p.jsxs)("p", {
						className: "form-error",
						role: "alert",
						children: [
							e.window.error,
							(0, p.jsx)("button", { type: "button", onClick: e.window.latest, children: "Reload messages" }),
						],
					})
				: null,
		],
	});
}
function IS(e) {
	const n = [...e.rows].reverse();
	let r = !1;
	return (0, p.jsx)(p.Fragment, {
		children: n.map((u, l) => {
			const o = n[l - 1],
				f = o && new Date(o.createdAt).toDateString() !== new Date(u.createdAt).toDateString(),
				h =
					!r &&
					e.readSequence !== void 0 &&
					u.sequence > e.readSequence &&
					u.authorHostUserId !== e.userId &&
					u.deletedAt === null;
			h && (r = !0);
			const m = !!o && !f && !h && o.authorHostUserId === u.authorHostUserId && u.createdAt - o.createdAt <= 3e5;
			return (0, p.jsx)(
				rk,
				{
					...e,
					doc: u,
					isContinuation: m,
					newDay: f ? tk(u.createdAt) : null,
					newMark: h,
					replyTriggerRef: e.setReplyTrigger ? (v) => e.setReplyTrigger?.(u._id, v) : void 0,
				},
				u._id,
			);
		}),
	});
}
function rk(e) {
	return (0, p.jsxs)(p.Fragment, {
		children: [
			e.newDay ? (0, p.jsx)("li", { className: "day-divider", children: e.newDay }) : null,
			e.newMark
				? (0, p.jsx)("li", {
						className: "new-divider",
						children: (0, p.jsx)("span", { className: "new-divider-label", children: "New messages" }),
					})
				: null,
			(0, p.jsx)(DS, { ...e }),
		],
	});
}
function ak(e) {
	const n = Hn(),
		r = n.ready && e.channel !== null,
		u = Ye(Se.messages.get, r || n.refreshing ? { messageId: e.rootMessageId } : "skip"),
		l = (0, w.useRef)(u);
	(u && (l.current = u), !r && !n.refreshing && (l.current = null));
	const o = n.refreshing ? l.current : u,
		f = NS({ target: { rootMessageId: e.rootMessageId }, enabled: r && u !== null, retain: n.refreshing }),
		h = OS(e.client, `${e.userId}:${e.channelId}:${e.rootMessageId}`),
		m = MS({
			...e,
			rootMessageId: e.rootMessageId,
			draft: h,
			canWrite: e.canWrite && !f.denied && e.channel?.archivedAt === null,
		}),
		v = (0, w.useRef)(null),
		y = (0, w.useRef)(null),
		_ = (0, w.useRef)(!0),
		b = (0, w.useRef)(null);
	return (
		(0, w.useEffect)(() => {
			v.current?.focus();
		}, []),
		(0, w.useEffect)(() => {
			const S = o ? [o, ...f.rows] : f.rows,
				E = [...new Set(S.map((T) => T.authorHostUserId))],
				C = [...new Set([...E, ...S.flatMap((T) => T.mentions)])];
			C.length && e.memberNames.resolve(C, E);
		}, [f.rows, o, e.memberNames]),
		(0, w.useLayoutEffect)(() => {
			if (y.current) {
				if (_.current && f.atLatest) y.current.scrollTop = y.current.scrollHeight;
				else if (b.current) {
					const S = [...y.current.querySelectorAll("[data-key]")].find((E) => E.dataset.key === b.current.id);
					S && (y.current.scrollTop += S.getBoundingClientRect().top - b.current.top);
				}
			}
		}, [f.rows, f.atLatest]),
		(0, p.jsxs)("section", {
			className: "thread",
			"aria-label": "Thread",
			tabIndex: -1,
			onKeyDown: (S) => {
				S.key === "Escape" &&
					(S.stopPropagation(),
					e.sendInFlight
						? e.announce("Wait for pending message changes to finish before closing the thread.")
						: e.onClose());
			},
			children: [
				(0, p.jsxs)("div", {
					className: "thread-head",
					children: [
						(0, p.jsx)("h3", { className: "thread-title", children: "Thread" }),
						(0, p.jsx)("button", {
							ref: v,
							type: "button",
							className: "button",
							disabled: e.sendInFlight,
							onClick: e.onClose,
							children: e.isNarrow ? "Back to messages" : "Close thread",
						}),
					],
				}),
				o
					? (0, p.jsx)("ul", {
							className: "message-list thread-root",
							children: (0, p.jsx)(DS, { ...e, doc: o, isContinuation: !1 }),
						})
					: (0, p.jsx)("p", {
							className: "channel-status",
							children: r && u === void 0 ? "Loading thread…" : "This thread is unavailable.",
						}),
				(0, p.jsxs)("div", {
					ref: y,
					className: "thread-replies",
					onScroll: () => {
						const S = y.current;
						if (!S) return;
						_.current = S.scrollHeight - S.scrollTop - S.clientHeight < 80;
						const E = [...S.querySelectorAll("[data-key]")].find(
							(C) => C.getBoundingClientRect().bottom >= S.getBoundingClientRect().top,
						);
						b.current = E ? { id: E.dataset.key, top: E.getBoundingClientRect().top } : null;
					},
					children: [
						(0, p.jsx)(qS, { window: f, disabled: e.sendInFlight || !r }),
						f.loading
							? (0, p.jsx)("p", { className: "channel-status", role: "status", children: "Loading replies…" })
							: null,
						r && !f.denied && !f.loading && !f.rows.length
							? (0, p.jsx)("p", { className: "channel-status", children: "No replies yet" })
							: null,
						(0, p.jsxs)("ul", {
							className: "message-list",
							children: [
								(0, p.jsx)(IS, { ...e, rows: f.rows }),
								(0, p.jsx)(jS, { draft: h, queue: m, disabled: !n.ready || !n.can_request_now() }),
							],
						}),
					],
				}),
				m.error ? (0, p.jsx)("p", { className: "form-error", role: "alert", children: m.error }) : null,
				(0, p.jsx)(zS, {
					client: e.client,
					userId: e.userId,
					draft: h,
					label: "Reply in thread",
					busy: m.busy,
					disabled: !r || !o || f.denied || !e.canWrite || !n.canSend || e.channel?.archivedAt !== null,
					onSend: m.enqueue,
				}),
			],
		})
	);
}
var uk = 420,
	Bu = 244,
	dd = 340;
function sk(e) {
	return (0, p.jsx)(lk, { ...e }, `${e.userId}:${e.channelId}`);
}
function lk(e) {
	const n = Hn(),
		r = n.ready && e.channel !== null,
		u = e.isNarrow && e.threadRootId !== null,
		l = NS({ target: { channelId: e.channelId }, enabled: r, retain: n.refreshing }),
		o = OS(e.client, `${e.userId}:${e.channelId}`),
		f = MS({
			...e,
			rootMessageId: null,
			draft: o,
			canWrite: e.canWrite && !l.denied && e.channel?.archivedAt === null,
		}),
		h = (0, w.useRef)(null),
		m = (0, w.useRef)(null),
		v = (0, w.useRef)(new Map()),
		y = (0, w.useRef)(!0),
		_ = (0, w.useRef)(null),
		b = (0, w.useRef)(null),
		[S, E] = (0, w.useState)(0),
		[C, T] = (0, w.useState)(dd),
		[D, A] = (0, w.useState)(0),
		N = Math.max(Bu, S - uk),
		R = Math.min(N, Math.max(Bu, C));
	((0, w.useEffect)(() => {
		if (!e.threadRootId || !h.current) return;
		const I = h.current;
		E(I.clientWidth);
		const j = new ResizeObserver(() => E(I.clientWidth));
		return (j.observe(I), () => j.disconnect());
	}, [e.threadRootId]),
		(0, w.useEffect)(() => {
			const I = [...new Set(l.rows.map((z) => z.authorHostUserId))],
				j = [...new Set([...I, ...l.rows.flatMap((z) => z.mentions)])];
			j.length && e.memberNames.resolve(j, I);
		}, [l.rows, e.memberNames]),
		(0, w.useLayoutEffect)(() => {
			if (m.current) {
				if (y.current && l.atLatest) ((m.current.scrollTop = m.current.scrollHeight), A(l.sequence));
				else if (_.current) {
					const I = [...m.current.querySelectorAll("[data-key]")].find((j) => j.dataset.key === _.current.id);
					I && (m.current.scrollTop += I.getBoundingClientRect().top - _.current.top);
				}
			}
		}, [l.rows, l.atLatest, l.sequence]),
		(0, w.useEffect)(() => {
			(b.current !== null && l.sequence > b.current && l.atLatest && e.announce("New messages in this channel."),
				(b.current = l.sequence));
		}, [l.sequence, l.atLatest, e.announce]),
		(0, w.useEffect)(() => {
			const I = () => {
				r &&
					l.atLatest &&
					y.current &&
					document.visibilityState === "visible" &&
					D === l.sequence &&
					e.onObservedRead({ rootSequence: D, replySequence: e.channel?.lastReplySequence ?? 0 });
			};
			return (
				I(),
				document.addEventListener("visibilitychange", I),
				() => document.removeEventListener("visibilitychange", I)
			);
		}, [r, l.atLatest, D, l.sequence, e.channel?.lastReplySequence, e.onObservedRead]));
	const $ = () => {
		if (e.sendInFlight) return;
		const I = e.threadRootId;
		(e.setThreadRootId(null), I && queueMicrotask(() => (v.current.get(I) ?? m.current)?.focus()));
	};
	return (0, p.jsxs)("div", {
		className: "channel",
		children: [
			(0, p.jsxs)("header", {
				className: "channel-head",
				inert: u || void 0,
				children: [
					(0, p.jsxs)("div", {
						className: "channel-head-main",
						children: [
							(0, p.jsx)("h2", {
								className: "channel-title",
								children: e.channel ? `#${e.channel.name}` : "Channel unavailable",
							}),
							e.channel?.topic ? (0, p.jsx)("p", { className: "channel-topic", children: e.channel.topic }) : null,
							e.channel?.visibility === "private"
								? (0, p.jsx)("p", { className: "channel-privacy", children: Id })
								: null,
						],
					}),
					e.channel?.archivedAt
						? (0, p.jsx)("span", { className: "channel-archived-badge", children: "Archived" })
						: null,
				],
			}),
			(0, p.jsxs)("div", {
				ref: h,
				className: "channel-body",
				style: { "--thread-width": `${R}px` },
				children: [
					(0, p.jsxs)("div", {
						ref: m,
						className: "message-log",
						inert: u || void 0,
						role: "log",
						tabIndex: 0,
						"aria-live": "off",
						"aria-label": e.channel ? `Messages in #${e.channel.name}` : "Messages",
						onScroll: () => {
							const I = m.current;
							if (!I) return;
							((y.current = I.scrollHeight - I.scrollTop - I.clientHeight < 80),
								y.current && l.atLatest && A(l.sequence));
							const j = [...I.querySelectorAll("[data-key]")].find(
								(z) => z.getBoundingClientRect().bottom >= I.getBoundingClientRect().top,
							);
							_.current = j ? { id: j.dataset.key, top: j.getBoundingClientRect().top } : null;
						},
						children: [
							!r && !n.refreshing
								? (0, p.jsx)("p", {
										className: "channel-status",
										role: "status",
										children: "Messages are hidden until Chitchat can confirm your access. Your draft is kept.",
									})
								: null,
							(0, p.jsx)(qS, { window: l, disabled: e.sendInFlight || !r }),
							l.loading
								? (0, p.jsx)("p", { className: "channel-status", role: "status", children: "Loading messages…" })
								: null,
							r && !l.denied && !l.loading && !l.rows.length && !o.value.pending.length
								? (0, p.jsx)("p", { className: "channel-status", children: "No messages yet" })
								: null,
							(0, p.jsxs)("ul", {
								className: "message-list",
								children: [
									(0, p.jsx)(IS, {
										...e,
										rows: l.rows,
										readSequence: e.openedAtReadSequence,
										onOpenThread: (I) => {
											e.sendInFlight || e.setThreadRootId(I);
										},
										threadDisabled: e.sendInFlight,
										setReplyTrigger: (I, j) => {
											j ? v.current.set(I, j) : v.current.delete(I);
										},
									}),
									(0, p.jsx)(jS, { draft: o, queue: f, disabled: !n.ready || !n.can_request_now() }),
								],
							}),
						],
					}),
					e.threadRootId
						? (0, p.jsxs)(p.Fragment, {
								children: [
									(0, p.jsx)("div", {
										className: "thread-resize",
										inert: u || void 0,
										role: "separator",
										tabIndex: 0,
										"aria-orientation": "vertical",
										"aria-label": "Resize thread panel",
										"aria-valuenow": R,
										"aria-valuemin": Bu,
										"aria-valuemax": N,
										onKeyDown: (I) => {
											["ArrowLeft", "ArrowRight", "Home"].includes(I.key) &&
												(I.preventDefault(),
												T(Math.min(N, Math.max(Bu, I.key === "Home" ? dd : R + (I.key === "ArrowLeft" ? 16 : -16)))));
										},
										onPointerDown: (I) => {
											(I.preventDefault(), I.currentTarget.setPointerCapture(I.pointerId));
										},
										onPointerMove: (I) => {
											I.currentTarget.hasPointerCapture(I.pointerId) &&
												h.current &&
												T(Math.min(N, Math.max(Bu, h.current.getBoundingClientRect().right - I.clientX)));
										},
										onDoubleClick: () => T(dd),
									}),
									(0, p.jsx)(ak, { ...e, rootMessageId: e.threadRootId, onClose: $ }, e.threadRootId),
								],
							})
						: null,
				],
			}),
			e.sendInFlight
				? (0, p.jsx)("p", {
						className: "channel-status",
						role: "status",
						children: "Wait for pending message changes to finish before leaving this channel or thread.",
					})
				: null,
			f.error ? (0, p.jsx)("p", { className: "form-error", role: "alert", children: f.error }) : null,
			(0, p.jsx)(zS, {
				client: e.client,
				userId: e.userId,
				draft: o,
				label: e.channel ? `Message #${e.channel.name}` : "Message draft",
				busy: f.busy,
				disabled: !r || l.denied || !e.canWrite || !n.canSend || !e.online || e.channel?.archivedAt !== null,
				inert: u,
				onSend: f.enqueue,
			}),
		],
	});
}
function ok(e) {
	const n = Hn(),
		r = Ye(Se.transcripts.status, n.ready ? { channelId: e.channelId } : "skip"),
		u = Ab(Se.transcripts.connect),
		l = Dr(Se.transcripts.retry),
		o = Dr(Se.transcripts.reconcile),
		[f, h] = (0, w.useState)(!1),
		[m, v] = (0, w.useState)(null),
		[y, _] = (0, w.useState)(!1),
		[b, S] = (0, w.useState)(!1),
		E = (0, w.useRef)(null),
		C = (0, w.useRef)(null),
		T = (0, w.useId)(),
		D = (0, w.useId)(),
		A = async () => {
			if (!(f || !n.can_request_now())) {
				((E.current ??= crypto.randomUUID()), h(!0), v(null));
				try {
					const $ = await e.client.getToken();
					if (!n.can_request_now()) return;
					const I = await u({ channelId: e.channelId, pluginToken: $, clientRequestId: E.current });
					I._nay ? v(I._nay.message) : (E.current = null);
				} catch {
					v("Could not confirm the Files connection. Retry to check it.");
				} finally {
					h(!1);
				}
			}
		},
		N = async () => {
			if (!(f || !n.can_request_now())) {
				(h(!0), v(null));
				try {
					const $ = await l({ channelId: e.channelId });
					$._nay && v($._nay.message);
				} catch {
					v("Could not restart transcript sync. Try again.");
				} finally {
					h(!1);
				}
			}
		},
		R = async () => {
			if (!(f || !b || !r?.canReconcile || !n.canSend || !n.can_request_now())) {
				((C.current ??= crypto.randomUUID()), h(!0), v(null));
				try {
					const $ = await o({ channelId: e.channelId, clientRequestId: C.current });
					$._nay ? v($._nay.message) : ((C.current = null), _(!1), S(!1));
				} catch {
					v("Could not confirm the rebuild request. Retry to check it.");
				} finally {
					h(!1);
				}
			}
		};
	return (0, p.jsxs)(p.Fragment, {
		children: [
			(0, p.jsxs)("div", {
				className: "transcript-status",
				children: [
					(0, p.jsx)("span", {
						role: "status",
						children: r
							? r.status === "ready"
								? r.indexStatus === "blocked"
									? "Chat is saved. The channel index needs attention."
									: r.indexStatus === "ready"
										? "Saved in Files"
										: "Channel saved. Updating the channel index…"
								: r.status === "not_connected"
									? "Chat is saved. Connect Files to keep Markdown copies."
									: r.status === "blocked"
										? "Chat is saved. Transcript sync needs attention."
										: "Chat is saved. Updating Files…"
							: "Checking transcript access…",
					}),
					r?.canConnect
						? (0, p.jsx)("button", {
								type: "button",
								className: "button",
								disabled: f || !n.connected,
								onClick: () => void A(),
								children: f ? "Connecting…" : r.status === "not_connected" ? "Connect Files" : "Reconnect Files",
							})
						: null,
					(r?.status === "blocked" || r?.indexStatus === "blocked") && r.canConnect
						? (0, p.jsx)("button", {
								type: "button",
								className: "button",
								disabled: f || !n.connected,
								onClick: () => void N(),
								children: "Retry sync",
							})
						: null,
					r
						? (0, p.jsxs)("details", {
								children: [
									(0, p.jsx)("summary", { children: "Transcript details" }),
									r.folderPath
										? (0, p.jsxs)("p", {
												children: [
													r.folderNodeId ? "Folder in Press Files" : "Planned folder in Press Files",
													":",
													" ",
													(0, p.jsx)("code", { children: r.folderPath }),
												],
											})
										: null,
									r.readerMode === "manual"
										? (0, p.jsx)("p", { children: "Files sharing is managed in Press." })
										: null,
									r.error ? (0, p.jsx)("p", { role: "alert", children: r.error }) : null,
									(0, p.jsxs)("p", {
										children: [
											"Channel index:",
											" ",
											r.indexStatus === "ready"
												? "saved"
												: r.indexStatus === "blocked"
													? "needs attention"
													: "updating",
											".",
										],
									}),
									r.indexError ? (0, p.jsx)("p", { role: "alert", children: r.indexError }) : null,
									r.status === "blocked" && r.folderPath
										? (0, p.jsx)("p", {
												children: r.folderNodeId
													? "If folder access is missing, open this folder in Press Files. Give the Chitchat service account Can manage, then reconnect."
													: "If permissions blocked setup, ask a workspace admin to connect. Both the person connecting and the Chitchat service account need Can manage on the parent folder or workspace to create the locked folder.",
											})
										: null,
									r.canReconcile
										? (0, p.jsx)("button", {
												type: "button",
												className: "button",
												disabled: f || !n.connected,
												onClick: () => {
													(_(!0), v(null));
												},
												children: "Rebuild copies",
											})
										: null,
								],
							})
						: null,
					m && !y ? (0, p.jsx)("span", { role: "alert", children: m }) : null,
				],
			}),
			y
				? (0, p.jsxs)(Za, {
						labelledBy: T,
						accessUnavailable: !n.refreshing && (!n.ready || r === null),
						onReconnect: n.retry,
						onClose: () => {
							f || _(!1);
						},
						children: [
							(0, p.jsx)("h2", { id: T, className: "dialog-title", children: "Rebuild transcript copies?" }),
							(0, p.jsx)("p", {
								children:
									"This replaces the generated Markdown copies from saved chat. Edits made directly to those copies will be replaced. File sharing and write permissions still apply.",
							}),
							(0, p.jsxs)("label", {
								htmlFor: D,
								children: [
									(0, p.jsx)("input", {
										id: D,
										type: "checkbox",
										checked: b,
										disabled: f,
										onChange: ($) => S($.currentTarget.checked),
									}),
									"Replace edits in the generated transcripts",
								],
							}),
							m ? (0, p.jsx)("p", { className: "form-error", role: "alert", children: m }) : null,
							(0, p.jsxs)("div", {
								className: "dialog-actions",
								children: [
									(0, p.jsx)("button", {
										type: "button",
										className: "button",
										"data-dialog-initial": !0,
										disabled: f,
										onClick: () => _(!1),
										children: "Cancel",
									}),
									(0, p.jsx)("button", {
										type: "button",
										className: "button button-danger",
										disabled: f || !b || !n.connected,
										onClick: () => void R(),
										children: f ? "Starting…" : "Rebuild copies",
									}),
								],
							}),
						],
					})
				: null,
		],
	});
}
function ck(e, n) {
	const r = Ha(),
		u = (0, w.useRef)(new Map()),
		l = (0, w.useRef)(new Map()),
		o = (0, w.useRef)(0),
		[, f] = (0, w.useState)(0);
	(0, w.useEffect)(() => {
		((o.current += 1), u.current.clear(), l.current.clear());
	}, [e, n]);
	const h = (0, w.useCallback)(
		async (m, v = []) => {
			if (!n) return;
			const y = o.current,
				_ = new Set(v);
			for (const C of v) {
				const T = u.current.get(C);
				T && (u.current.delete(C), u.current.set(C, { ...T, author: !0 }));
			}
			const b = [...new Set(m)]
					.slice(0, 1e3)
					.filter((C) => !u.current.has(C) || Date.now() - u.current.get(C).at >= 3e5),
				S = new Set(),
				E = [];
			for (const C of b) {
				const T = l.current.get(C);
				T ? (_.has(C) && (T.author = !0), S.add(T.promise)) : E.push(C);
			}
			for (let C = 0; C < E.length; C += 50) {
				const T = E.slice(C, C + 50),
					D = r
						.query(Se.members.resolve, { userIds: T })
						.then((A) => {
							if (!(o.current !== y || !A)) {
								for (const N of T) {
									const R = l.current.get(N)?.author === !0 || u.current.get(N)?.author === !0;
									(u.current.delete(N), u.current.set(N, { name: A[N] ?? null, at: Date.now(), author: R }));
								}
								for (; u.current.size > 1e3; ) {
									const N = [...u.current].find(([, R]) => !R.author)?.[0] ?? u.current.keys().next().value;
									N !== void 0 && u.current.delete(N);
								}
							}
						})
						.catch(() => {})
						.finally(() => {
							if (o.current === y) for (const A of T) l.current.delete(A);
						});
				for (const A of T) l.current.set(A, { promise: D, author: _.has(A) });
				S.add(D);
			}
			S.size > 0 && (await Promise.all(S), o.current === y && f((C) => C + 1));
		},
		[r, n],
	);
	return (
		(0, w.useEffect)(() => {
			if (!n) return;
			const m = setInterval(() => {
				h([...u.current.keys()]);
			}, 6e4);
			return () => clearInterval(m);
		}, [h, n]),
		(0, w.useMemo)(() => ({ get: (m) => u.current.get(m)?.name, resolve: h }), [h])
	);
}
function Eh(e, n) {
	const r = e.get(n);
	return r === void 0 ? "…" : (r ?? "Former member");
}
function fk(e) {
	const n = xi(`${e.scopeKey}:public`),
		r = xi(`${e.scopeKey}:private`),
		u = Ye(
			Se.views.unreads,
			e.enabled ? { visibility: "public", paginationOpts: { numItems: 50, cursor: n.cursor } } : "skip",
		),
		l = Ye(
			Se.views.unreads,
			e.enabled ? { visibility: "private", paginationOpts: { numItems: 50, cursor: r.cursor } } : "skip",
		);
	(0, w.useEffect)(() => {
		e.memberNames.resolve((u?.page ?? []).flatMap((f) => (f.latest ? [f.latest.authorHostUserId] : [])));
	}, [u, e.memberNames]);
	const o = n.number === 1 && r.number === 1 && u?.isDone && l?.isDone && u.page.length === 0 && l.page.length === 0;
	return (0, p.jsxs)("section", {
		className: "view",
		"aria-label": "Unreads",
		children: [
			(0, p.jsx)("header", {
				className: "view-head",
				children: (0, p.jsx)("h2", { className: "view-title", children: "Unreads" }),
			}),
			(0, p.jsx)("p", {
				className: "view-note",
				children: "Unread channels across this workspace. Private channels show their name only.",
			}),
			o
				? (0, p.jsx)("p", { className: "channel-status", children: "You are all caught up." })
				: (0, p.jsx)(p.Fragment, {
						children: [
							{ label: "Public channels", page: n, result: u },
							{ label: "Private channels", page: r, result: l },
						].map(({ label: f, page: h, result: m }) =>
							(0, p.jsxs)(
								"section",
								{
									className: "view-group",
									children: [
										(0, p.jsx)("h3", { className: "view-group-title", children: f }),
										m
											? m.page.length === 0
												? (0, p.jsx)("p", { className: "channel-status", children: "No unread channels on this page." })
												: (0, p.jsx)("ul", {
														className: "view-rows",
														children: m.page.map((v) =>
															(0, p.jsx)(
																"li",
																{
																	className: "view-row",
																	children: (0, p.jsxs)("button", {
																		type: "button",
																		className: "view-row-button",
																		onClick: () => e.onOpen(v.channel),
																		children: [
																			(0, p.jsxs)("span", {
																				className: "view-row-title",
																				children: [
																					"#",
																					v.channel.name,
																					v.mentionCount > 0
																						? (0, p.jsxs)("span", {
																								className: "mention-badge",
																								children: [
																									v.mentionCount >= 100 ? "99+" : v.mentionCount,
																									(0, p.jsx)("span", {
																										className: "visually-hidden",
																										children: " mentions of you",
																									}),
																								],
																							})
																						: null,
																				],
																			}),
																			(0, p.jsx)("span", {
																				className: "view-row-time",
																				children: uo(v.lastActivityAt, Date.now()),
																			}),
																			v.latest
																				? (0, p.jsxs)("span", {
																						className: "view-row-preview",
																						children: [
																							Eh(e.memberNames, v.latest.authorHostUserId),
																							":",
																							" ",
																							v.latest.text.slice(0, 160),
																						],
																					})
																				: null,
																		],
																	}),
																},
																v.channel._id,
															),
														),
													})
											: (0, p.jsx)("p", { className: "channel-status", role: "status", children: "Loading unreads…" }),
										(0, p.jsx)(nr, { page: h, result: m, label: f }),
									],
								},
								f,
							),
						),
					}),
		],
	});
}
function dk(e) {
	const n = xi(e.scopeKey),
		r = Ye(Se.views.activity, e.enabled ? { paginationOpts: { numItems: 50, cursor: n.cursor } } : "skip");
	(0, w.useEffect)(() => {
		e.memberNames.resolve((r?.page ?? []).map((l) => l.message.authorHostUserId));
	}, [r, e.memberNames]);
	const u = [];
	for (const l of r?.page ?? []) {
		const o = u[u.length - 1];
		o?.channel._id === l.channel._id
			? o.messages.push(l.message)
			: u.push({ channel: l.channel, messages: [l.message] });
	}
	return (0, p.jsxs)("section", {
		className: "view",
		"aria-label": "Activity",
		children: [
			(0, p.jsx)("header", {
				className: "view-head",
				children: (0, p.jsx)("h2", { className: "view-title", children: "Activity" }),
			}),
			(0, p.jsx)("p", {
				className: "view-note",
				children: "Public messages, newest first. Private channels are not shown here.",
			}),
			r
				? u.length === 0
					? (0, p.jsx)("p", { className: "channel-status", children: "No public messages on this page." })
					: (0, p.jsx)("div", {
							className: "view-groups",
							children: u.map((l, o) =>
								(0, p.jsxs)(
									"section",
									{
										className: "view-group",
										children: [
											(0, p.jsx)("h3", {
												className: "view-group-title",
												children: (0, p.jsxs)("button", {
													type: "button",
													className: "view-group-link",
													onClick: () => e.onOpen(l.channel),
													children: ["#", l.channel.name],
												}),
											}),
											(0, p.jsx)("ul", {
												className: "view-rows",
												children: l.messages.map((f) =>
													(0, p.jsxs)(
														"li",
														{
															className: f.mentions.includes(e.userId) ? "view-row mention-self" : "view-row",
															children: [
																(0, p.jsx)("span", {
																	className: "view-row-title",
																	children: Eh(e.memberNames, f.authorHostUserId),
																}),
																(0, p.jsx)("span", {
																	className: "view-row-time",
																	children: uo(f.createdAt, Date.now()),
																}),
																(0, p.jsx)("span", { className: "view-row-preview", children: f.text.slice(0, 160) }),
															],
														},
														f._id,
													),
												),
											}),
										],
									},
									`${l.channel._id}:${o}`,
								),
							),
						})
				: (0, p.jsx)("p", { className: "channel-status", role: "status", children: "Loading activity…" }),
			(0, p.jsx)(nr, { page: n, result: r, label: "Activity" }),
		],
	});
}
function hk(e) {
	const n = xi(e.scopeKey),
		r = Ye(Se.views.threads, e.enabled ? { paginationOpts: { numItems: 50, cursor: n.cursor } } : "skip");
	return (
		(0, w.useEffect)(() => {
			e.memberNames.resolve((r?.page ?? []).map((u) => u.latest.authorHostUserId));
		}, [r, e.memberNames]),
		(0, p.jsxs)("section", {
			className: "view",
			"aria-label": "Threads",
			children: [
				(0, p.jsx)("header", {
					className: "view-head",
					children: (0, p.jsx)("h2", { className: "view-title", children: "Threads" }),
				}),
				(0, p.jsx)("p", {
					className: "view-note",
					children: "Public threads with replies. Private channels are not shown here.",
				}),
				r
					? r.page.length === 0
						? (0, p.jsx)("p", { className: "channel-status", children: "No thread activity on this page." })
						: (0, p.jsx)("ul", {
								className: "view-rows",
								children: r.page.map((u) =>
									(0, p.jsx)(
										"li",
										{
											className: "view-row",
											children: (0, p.jsxs)("button", {
												type: "button",
												className: "view-row-button",
												onClick: () => e.onOpen(u.channel, u.summary.rootMessageId),
												children: [
													(0, p.jsxs)("span", { className: "view-row-title", children: ["#", u.channel.name] }),
													(0, p.jsx)("span", {
														className: "view-row-time",
														children: uo(u.latest.createdAt, Date.now()),
													}),
													(0, p.jsxs)("span", {
														className: "view-row-preview",
														children: [
															u.summary.activeReplyCount,
															" ",
															u.summary.activeReplyCount === 1 ? "reply" : "replies",
															" ·",
															" ",
															Eh(e.memberNames, u.latest.authorHostUserId),
															": ",
															u.latest.text.slice(0, 160),
														],
													}),
												],
											}),
										},
										u.summary._id,
									),
								),
							})
					: (0, p.jsx)("p", { className: "channel-status", role: "status", children: "Loading threads…" }),
				(0, p.jsx)(nr, { page: n, result: r, label: "Threads" }),
			],
		})
	);
}
function mk(e) {
	const n = Ye(Se.channels.permissions, e.enabled ? { channelId: e.channel._id } : "skip"),
		r = e.unread instanceof Error ? null : e.unread,
		u = e.channel;
	return (0, p.jsxs)("li", {
		className: "channel-item",
		"data-channel-key": u._id,
		children: [
			(0, p.jsxs)("button", {
				type: "button",
				className: r?.hasUnread || r?.mentionCount ? "channel-link is-unread" : "channel-link",
				"aria-current": e.selected ? "page" : void 0,
				disabled: e.blocked,
				onClick: () => e.onOpen(u),
				children: [
					(0, p.jsx)("span", {
						className: "channel-initial",
						"aria-hidden": "true",
						children: u.name.slice(0, 1).toUpperCase(),
					}),
					(0, p.jsxs)("span", {
						className: "channel-name",
						children: [
							"#",
							u.name,
							u.visibility === "private" ? " (private)" : "",
							u.archivedAt !== null ? " (archived)" : "",
						],
					}),
					r && r.mentionCount > 0
						? (0, p.jsxs)("span", {
								className: "mention-badge",
								children: [
									r.mentionCount >= 100 ? "99+" : r.mentionCount,
									(0, p.jsx)("span", { className: "visually-hidden", children: " unread mentions" }),
								],
							})
						: r?.hasUnread
							? (0, p.jsxs)(p.Fragment, {
									children: [
										(0, p.jsx)("span", { className: "unread-dot", "aria-hidden": "true" }),
										(0, p.jsx)("span", { className: "visually-hidden", children: "unread" }),
									],
								})
							: null,
				],
			}),
			(0, p.jsx)("span", {
				className: "channel-item-actions",
				children: (0, p.jsx)(wz, {
					channelName: u.name,
					items: [
						...(u.visibility === "private"
							? [
									{
										id: "people",
										label: `People in #${u.name}`,
										onSelect: () => e.onDialog({ kind: "people", channel: u }),
									},
								]
							: []),
						...(n?.canWrite
							? [
									{
										id: "rename",
										label: `Rename #${u.name}`,
										onSelect: () => e.onDialog({ kind: "rename", channel: u }),
									},
									{
										id: "archive",
										label: `${u.archivedAt === null ? "Archive" : "Unarchive"} #${u.name}`,
										onSelect: () => e.onDialog({ kind: u.archivedAt === null ? "archive" : "unarchive", channel: u }),
									},
								]
							: []),
						...(u.visibility === "private"
							? [
									{
										id: "leave",
										label: `Leave #${u.name}`,
										danger: !0,
										onSelect: () => e.onDialog({ kind: "leave", channel: u }),
									},
								]
							: []),
						...(u.visibility === "private" && n?.canManage
							? [
									{
										id: "delete",
										label: `Delete #${u.name} for everyone`,
										danger: !0,
										onSelect: () => e.onDialog({ kind: "delete", channel: u }),
									},
								]
							: []),
					],
				}),
			}),
		],
	});
}
var vk = class extends w.Component {
	state = { failed: !1 };
	static getDerivedStateFromError() {
		return { failed: !0 };
	}
	componentDidCatch(e, n) {
		console.error("Chitchat could not render", { error: e.message, componentStack: n.componentStack });
	}
	render() {
		return this.state.failed
			? (0, p.jsxs)("main", {
					className: "page-dead",
					role: "alert",
					children: [
						(0, p.jsx)("h1", { children: "Chitchat" }),
						(0, p.jsx)("p", { children: "Chitchat could not load this view. Press is still available." }),
						(0, p.jsx)("button", {
							type: "button",
							className: "button",
							onClick: () => this.setState({ failed: !1 }),
							children: "Retry Chitchat",
						}),
					],
				})
			: this.props.children;
	}
};
function gk(e) {
	const n = Ha(),
		r = Hn(),
		u = e.client.context.userId,
		l = `${r.member?.generation ?? "loading"}:${r.member?.membershipLifetime ?? 0}`,
		o = ck(l, r.ready || r.refreshing),
		f = xi(`${l}:public`),
		h = xi(`${l}:private`),
		m = xi(`${l}:archived`),
		v = xi(`${l}:archived-private`),
		[y, _] = (0, w.useState)(!1),
		b = Ye(
			Se.channels.list_public,
			r.ready ? { archived: !1, paginationOpts: { numItems: 50, cursor: f.cursor } } : "skip",
		),
		S = Ye(
			Se.channels.list_mine,
			r.ready ? { archived: !1, paginationOpts: { numItems: 50, cursor: h.cursor } } : "skip",
		),
		E = Ye(
			Se.channels.list_mine,
			r.ready && y ? { archived: !0, paginationOpts: { numItems: 50, cursor: v.cursor } } : "skip",
		),
		C = Ye(
			Se.channels.list_public,
			r.ready && y ? { archived: !0, paginationOpts: { numItems: 50, cursor: m.cursor } } : "skip",
		),
		[T, D] = (0, w.useState)(null),
		[A, N] = (0, w.useState)(null),
		[R, $] = (0, w.useState)(null),
		[I, j] = (0, w.useState)(!1),
		[z, U] = (0, w.useState)(!1),
		[L, Q] = (0, w.useState)(() => window.matchMedia("(max-width: 719px)").matches),
		[ie, X] = (0, w.useState)(0),
		[F, ne] = (0, w.useState)(0),
		k = (0, w.useRef)(0),
		[H, B] = (0, w.useState)({ sequence: 0, text: "" }),
		[ue, fe] = (0, w.useState)(null),
		Ie = L && A !== null,
		O = T?.kind === "channel" ? T.id : null,
		G = Ye(Se.channels.get, (r.ready || r.refreshing) && O ? { channelId: O } : "skip"),
		re = Ye(Se.channels.permissions, (r.ready || r.refreshing) && O ? { channelId: O } : "skip"),
		[se, me] = (0, w.useState)(null);
	(G && G !== se && me(G), ((!r.ready && !r.refreshing) || G === null) && se !== null && !r.refreshing && me(null));
	const ye = r.refreshing && se?._id === O ? se : (G ?? null),
		pe = (0, w.useRef)(null),
		Ze = (0, w.useRef)(null),
		Ne = (0, w.useRef)(null),
		rt = (0, w.useRef)(null),
		Nt = (0, w.useRef)(null),
		Kt = (0, w.useRef)(0),
		zt = (0, w.useRef)(null);
	(0, w.useEffect)(() => {
		Kt.current += 1;
	}, [r.ready, l]);
	const kt = (0, w.useId)(),
		de = (0, w.useId)(),
		Te = (0, w.useId)(),
		ot = (0, w.useId)(),
		Me = (0, w.useMemo)(
			() => [...(b?.page ?? []), ...(S?.page ?? []), ...(C?.page ?? []), ...(E?.page ?? [])],
			[b, S, C, E],
		),
		Dt = qd(
			(0, w.useMemo)(
				() =>
					Object.fromEntries(
						Me.map((oe) => [oe._id, { query: Se.read_states.get_for_channel, args: { channelId: oe._id } }]),
					),
				[Me],
			),
		),
		bt = Me.filter((oe) => {
			const xe = Dt[oe._id];
			return oe.archivedAt === null && !(xe instanceof Error) && xe?.hasUnread;
		}).length,
		ae = !b?.isDone || !S?.isDone || f.number > 1 || h.number > 1,
		we = (0, w.useCallback)((oe) => B((xe) => ({ sequence: xe.sequence + 1, text: oe })), []),
		dt = (0, w.useCallback)(() => X((oe) => oe + 1), []),
		je = (0, w.useCallback)(() => X((oe) => Math.max(0, oe - 1)), []),
		It = (0, w.useCallback)(
			(oe) => {
				O &&
					fe((xe) =>
						xe?.channelId === O && xe.rootSequence >= oe.rootSequence && xe.replySequence >= oe.replySequence
							? xe
							: {
									channelId: O,
									rootSequence: Math.max(xe?.channelId === O ? xe.rootSequence : 0, oe.rootSequence),
									replySequence: Math.max(xe?.channelId === O ? xe.replySequence : 0, oe.replySequence),
								},
					);
			},
			[O],
		);
	(0, w.useEffect)(() => {
		if (!ue || ue.channelId !== G?._id || !r.connected || !r.can_request_now()) return;
		const oe = JSON.stringify(ue);
		if (zt.current === oe) return;
		zt.current = oe;
		let xe = !1,
			pt;
		const Gt = () => {
			xe ||
				zt.current !== oe ||
				((zt.current = null),
				(k.current += 1),
				(pt = setTimeout(() => ne((Lt) => Lt + 1), Math.min(3e4, 1e3 * 2 ** Math.min(k.current - 1, 5)))));
		};
		return (
			n
				.mutation(Se.read_states.mark_read, ue)
				.then((Lt) => {
					"_nay" in Lt ? Gt() : (k.current = 0);
				})
				.catch(Gt),
			() => {
				((xe = !0), pt && clearTimeout(pt), zt.current === oe && (zt.current = null));
			}
		);
	}, [n, ue, G?._id, r.connected, r.can_request_now, F]);
	const Ut = (0, w.useCallback)(
			async (oe, xe) => {
				if (ie > 0 || !r.ready) return;
				const pt = ++Kt.current;
				try {
					const Gt = await n.query(Se.read_states.get_for_channel, { channelId: oe._id });
					if (pt !== Kt.current) return;
					(D({ kind: "channel", id: oe._id, openedAtReadSequence: Gt?.state?.rootSequence ?? 0 }),
						N(xe ?? null),
						j(!1),
						U(!1),
						we(`Opened #${oe.name}`));
				} catch {
					we("Could not open this channel. Try again.");
				}
			},
			[n, ie, r.ready, we],
		),
		We = (0, w.useCallback)(() => {
			($(null), (Nt.current = "selected"));
		}, []),
		tn = (0, w.useCallback)(() => {
			($(null), _(!0), (Nt.current = "selected"));
		}, []);
	((0, w.useEffect)(() => {
		const oe = (pt) => {
				pt.target instanceof Node && !pe.current?.contains(pt.target) && (rt.current = null);
			},
			xe = () => {
				rt.current = null;
			};
		return (
			document.addEventListener("focusin", oe),
			window.addEventListener("blur", xe),
			() => {
				(document.removeEventListener("focusin", oe), window.removeEventListener("blur", xe));
			}
		);
	}, []),
		(0, w.useEffect)(() => {
			const oe = window.matchMedia("(max-width: 719px)"),
				xe = (pt) => {
					((Nt.current = pt.matches
						? A && rt.current !== null
							? "thread"
							: rt.current === "sidebar" && !I
								? "drawer"
								: null
						: rt.current === "drawer"
							? "selected"
							: null),
						pt.matches && A && j(!1),
						Q(pt.matches));
				};
			return (oe.addEventListener("change", xe), () => oe.removeEventListener("change", xe));
		}, [I, A]),
		(0, w.useLayoutEffect)(() => {
			if (document.querySelector(".dialog-overlay")) return;
			const oe = Nt.current;
			if (((Nt.current = null), oe === "thread" || (oe !== null && L && A))) {
				const xe = pe.current?.querySelector(".thread"),
					pt = xe?.querySelector(".thread-head button:not([disabled])");
				pt ? pt.focus() : xe ? xe.focus() : Ne.current?.focus();
			} else if (oe === "drawer" || (oe === "selected" && L && !I)) Ne.current?.focus();
			else if (oe === "selected") {
				const xe = Ze.current?.querySelector('[aria-current="page"]');
				xe && !xe.disabled ? xe.focus() : Ze.current?.focus();
			}
		}, [R, L, A, I]));
	const Qr = (oe, xe, pt) =>
		pt.length === 0
			? null
			: (0, p.jsxs)("div", {
					className: "channel-section",
					children: [
						(0, p.jsx)("h2", { id: xe, className: "channel-section-title", children: oe }),
						(0, p.jsx)("ul", {
							className: "channel-list",
							"aria-labelledby": xe,
							children: pt.map((Gt) =>
								(0, p.jsx)(
									mk,
									{
										channel: Gt,
										selected: O === Gt._id,
										blocked: ie > 0,
										enabled: r.ready,
										unread: Dt[Gt._id],
										onOpen: Ut,
										onDialog: $,
									},
									Gt._id,
								),
							),
						}),
					],
				});
	return (0, p.jsxs)("div", {
		ref: pe,
		className: "chitchat",
		onFocusCapture: (oe) => {
			const xe = oe.target;
			rt.current =
				xe === Ne.current
					? "drawer"
					: Ze.current?.contains(xe)
						? "sidebar"
						: xe.classList.contains("thread-resize")
							? "separator"
							: pe.current?.contains(xe) && !xe.closest(".thread")
								? "main"
								: null;
		},
		children: [
			(0, p.jsxs)("header", {
				className: "app-bar",
				inert: Ie || void 0,
				children: [
					(0, p.jsx)("h1", { className: "visually-hidden", children: "Chitchat" }),
					(0, p.jsx)("button", {
						ref: Ne,
						type: "button",
						className: "button drawer-toggle",
						"aria-expanded": I,
						onClick: () => j((oe) => !oe),
						children: "Channels",
					}),
				],
			}),
			(0, p.jsx)("nav", {
				ref: Ze,
				inert: Ie || void 0,
				className: ["sidebar", I && "is-open", z && "is-expanded"].filter(Boolean).join(" "),
				"aria-label": "Channels",
				tabIndex: -1,
				onKeyDown: (oe) => {
					oe.key === "Escape" && L && I && (j(!1), Ne.current?.focus());
				},
				children: (0, p.jsxs)("div", {
					className: "sidebar-inner",
					inert: L && !I ? !0 : void 0,
					children: [
						(0, p.jsxs)("div", {
							className: "sidebar-head",
							children: [
								(0, p.jsx)("p", { className: "sidebar-title", children: "Chitchat" }),
								(0, p.jsx)("button", {
									type: "button",
									className: "button sidebar-expand",
									"aria-expanded": z,
									"aria-label": z ? "Collapse channel rail" : "Expand channel rail",
									onClick: () => U((oe) => !oe),
									children: z ? "«" : "»",
								}),
								(0, p.jsx)("button", {
									type: "button",
									className: "button sidebar-create",
									disabled: ie > 0 || !r.canSend,
									onClick: () => $({ kind: "create" }),
									children: "Create channel",
								}),
							],
						}),
						(0, p.jsx)("ul", {
							className: "view-list",
							"aria-label": "Views",
							children: ["unreads", "threads", "activity"].map((oe) =>
								(0, p.jsx)(
									"li",
									{
										className: "view-item",
										children: (0, p.jsxs)("button", {
											type: "button",
											className:
												oe === "unreads" && bt > 0 ? "channel-link view-link is-unread" : "channel-link view-link",
											"aria-current": T?.kind === oe ? "page" : void 0,
											disabled: ie > 0,
											onClick: () => {
												((Kt.current += 1), D({ kind: oe }), N(null), j(!1), we(`Opened ${oe}`));
											},
											children: [
												(0, p.jsx)("span", {
													className: "channel-initial",
													"aria-hidden": "true",
													children: oe[0].toUpperCase(),
												}),
												(0, p.jsx)("span", { className: "channel-name", children: oe[0].toUpperCase() + oe.slice(1) }),
												oe === "unreads" && bt > 0
													? (0, p.jsxs)("span", {
															className: "mention-badge",
															children: [
																bt,
																ae ? "+" : "",
																(0, p.jsx)("span", {
																	className: "visually-hidden",
																	children: " unread channels shown",
																}),
															],
														})
													: null,
											],
										}),
									},
									oe,
								),
							),
						}),
						r.ready && b && S
							? (0, p.jsxs)(p.Fragment, {
									children: [
										Qr("Channels", kt, b.page),
										(0, p.jsx)(nr, { page: f, result: b, label: "Public channels" }),
										Qr("Private channels", de, S.page),
										(0, p.jsx)(nr, { page: h, result: S, label: "Private channels" }),
										Me.length === 0
											? (0, p.jsx)("p", { className: "channel-status", children: "No channels on this page" })
											: null,
										(0, p.jsx)("button", {
											type: "button",
											className: "button sidebar-archive-toggle",
											"aria-expanded": y,
											onClick: () => _((oe) => !oe),
											children: y ? "Hide archived channels" : "Show archived channels",
										}),
										y
											? (0, p.jsxs)(p.Fragment, {
													children: [
														Qr("Archived", Te, C?.page ?? []),
														(0, p.jsx)(nr, { page: m, result: C, label: "Archived channels" }),
														Qr("Archived private channels", ot, E?.page ?? []),
														(0, p.jsx)(nr, { page: v, result: E, label: "Archived private channels" }),
													],
												})
											: null,
									],
								})
							: (0, p.jsx)("p", {
									className: "channel-status",
									role: "status",
									children: r.message ? "Channel access is unavailable." : "Loading channels…",
								}),
					],
				}),
			}),
			(0, p.jsxs)("main", {
				className: "main",
				tabIndex: -1,
				children: [
					(0, p.jsxs)("div", {
						className: "main-notices",
						inert: Ie || void 0,
						children: [
							O ? (0, p.jsx)(ok, { client: e.client, channelId: O }, `transcript:${O}`) : null,
							r.message
								? (0, p.jsxs)("div", {
										className: "connection-status",
										role: "alert",
										children: [
											r.message,
											(0, p.jsx)("button", {
												type: "button",
												className: "button",
												onClick: r.retry,
												children: "Reconnect",
											}),
										],
									})
								: null,
						],
					}),
					T?.kind === "unreads"
						? (0, p.jsx)(fk, { scopeKey: l, enabled: r.ready, memberNames: o, onOpen: Ut })
						: T?.kind === "activity"
							? (0, p.jsx)(dk, { scopeKey: l, enabled: r.ready, userId: u, memberNames: o, onOpen: Ut })
							: T?.kind === "threads"
								? (0, p.jsx)(hk, { scopeKey: l, enabled: r.ready, memberNames: o, onOpen: Ut })
								: T?.kind === "channel"
									? (0, p.jsx)(
											sk,
											{
												client: e.client,
												channelId: T.id,
												channel: ye,
												userId: u,
												memberNames: o,
												announce: we,
												threadRootId: A,
												setThreadRootId: (oe) => {
													(N(oe), oe && j(!1));
												},
												isNarrow: L,
												canWrite: re?.canWrite ?? !1,
												online: r.connected,
												openedAtReadSequence: T.openedAtReadSequence,
												onObservedRead: It,
												onRequestStart: dt,
												onRequestSettled: je,
												sendInFlight: ie > 0,
											},
											`channel:${T.id}`,
										)
									: (0, p.jsx)("p", {
											className: "channel-status",
											children: r.ready
												? Me.length === 0
													? ae
														? "No channels on this page. Use the page controls to continue."
														: "No channels yet — create the first one."
													: "Select a channel."
												: "Connecting to Chitchat…",
										}),
				],
			}),
			R?.kind === "create"
				? (0, p.jsx)(o0, {
						channel: null,
						selfUserId: u,
						onClose: We,
						onSaved: (oe) => {
							(We(), D({ kind: "channel", id: oe, openedAtReadSequence: 0 }), N(null));
						},
					})
				: null,
			R?.kind === "rename" ? (0, p.jsx)(o0, { channel: R.channel, selfUserId: u, onClose: We, onSaved: We }) : null,
			R?.kind === "people" ? (0, p.jsx)(FR, { channelId: R.channel._id, selfUserId: u, onClose: We }) : null,
			R && R.kind !== "create" && R.kind !== "rename" && R.kind !== "people"
				? (0, p.jsx)(KR, { channel: R.channel, action: R.kind, onClose: We, onDone: tn })
				: null,
			(0, p.jsxs)("div", {
				className: "chitchat-announcer visually-hidden",
				role: "status",
				"aria-live": "polite",
				children: [(0, p.jsx)("span", { "data-announcement-sequence": H.sequence }), H.text],
			}),
		],
	});
}
function US(e) {
	return (0, p.jsx)("div", {
		className: e.isError ? "boot-screen is-error" : "boot-screen",
		role: e.isError ? "alert" : "status",
		"aria-live": e.isError ? void 0 : "polite",
		children: e.message,
	});
}
var LS = document.getElementById("root");
if (!LS) throw new Error("index.html is missing the #root element");
var kd = (0, aE.createRoot)(LS);
kd.render((0, p.jsx)(US, { message: "Connecting…" }));
Wx().then(
	(e) => {
		(e.context.kind === "page" && (document.title = e.context.pageTitle),
			kd.render(
				(0, p.jsx)(vk, { client: e, children: (0, p.jsx)(YR, { client: e, children: (0, p.jsx)(gk, { client: e }) }) }),
			));
	},
	(e) => {
		kd.render((0, p.jsx)(US, { message: e instanceof Error ? e.message : String(e), isError: !0 }));
	},
);
