var K_ = Object.create,
	G0 = Object.defineProperty,
	G_ = Object.getOwnPropertyDescriptor,
	X_ = Object.getOwnPropertyNames,
	J_ = Object.getPrototypeOf,
	W_ = Object.prototype.hasOwnProperty,
	Dn = (e, n) => () => (n || (e((n = { exports: {} }).exports, n), (e = null)), n.exports),
	e1 = (e, n, a, u) => {
		if ((n && typeof n == "object") || typeof n == "function")
			for (var l = X_(n), o = 0, f = l.length, h; o < f; o++)
				((h = l[o]),
					!W_.call(e, h) &&
						h !== a &&
						G0(e, h, { get: ((m) => n[m]).bind(null, h), enumerable: !(u = G_(n, h)) || u.enumerable }));
		return e;
	},
	X0 = (e, n, a) => (
		(a = e != null ? K_(J_(e)) : {}),
		e1(n || !e || !e.__esModule ? G0(a, "default", { value: e, enumerable: !0 }) : a, e)
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
	function a(l) {
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
		const o = a(l);
		fetch(l.href, o);
	}
})();
var t1 = Dn((e) => {
		var n = Symbol.for("react.transitional.element"),
			a = Symbol.for("react.portal"),
			u = Symbol.for("react.fragment"),
			l = Symbol.for("react.strict_mode"),
			o = Symbol.for("react.profiler"),
			f = Symbol.for("react.consumer"),
			h = Symbol.for("react.context"),
			m = Symbol.for("react.forward_ref"),
			v = Symbol.for("react.suspense"),
			y = Symbol.for("react.memo"),
			_ = Symbol.for("react.lazy"),
			p = Symbol.for("react.activity"),
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
		function A(O, G, ae) {
			((this.props = O), (this.context = G), (this.refs = D), (this.updater = ae || C));
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
		function M() {}
		M.prototype = A.prototype;
		function R(O, G, ae) {
			((this.props = O), (this.context = G), (this.refs = D), (this.updater = ae || C));
		}
		var N = (R.prototype = new M());
		((N.constructor = R), T(N, A.prototype), (N.isPureReactComponent = !0));
		var Z = Array.isArray;
		function U() {}
		var j = { H: null, A: null, T: null, S: null },
			I = Object.prototype.hasOwnProperty;
		function L(O, G, ae) {
			var se = ae.ref;
			return { $$typeof: n, type: O, key: G, ref: se !== void 0 ? se : null, props: ae };
		}
		function $(O, G) {
			return L(O.type, G, O.props);
		}
		function te(O) {
			return typeof O == "object" && O !== null && O.$$typeof === n;
		}
		function ne(O) {
			var G = { "=": "=0", ":": "=2" };
			return (
				"$" +
				O.replace(/[=:]/g, function (ae) {
					return G[ae];
				})
			);
		}
		var K = /\/+/g;
		function ie(O, G) {
			return typeof O == "object" && O !== null && O.key != null ? ne("" + O.key) : G.toString(36);
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
							? O.then(U, U)
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
		function H(O, G, ae, se, ve) {
			var ge = typeof O;
			(ge === "undefined" || ge === "boolean") && (O = null);
			var pe = !1;
			if (O === null) pe = !0;
			else
				switch (ge) {
					case "bigint":
					case "string":
					case "number":
						pe = !0;
						break;
					case "object":
						switch (O.$$typeof) {
							case n:
							case a:
								pe = !0;
								break;
							case _:
								return ((pe = O._init), H(pe(O._payload), G, ae, se, ve));
						}
				}
			if (pe)
				return (
					(ve = ve(O)),
					(pe = se === "" ? "." + ie(O, 0) : se),
					Z(ve)
						? ((ae = ""),
							pe != null && (ae = pe.replace(K, "$&/") + "/"),
							H(ve, G, ae, "", function (st) {
								return st;
							}))
						: ve != null &&
							(te(ve) &&
								(ve = $(
									ve,
									ae + (ve.key == null || (O && O.key === ve.key) ? "" : ("" + ve.key).replace(K, "$&/") + "/") + pe,
								)),
							G.push(ve)),
					1
				);
			pe = 0;
			var Ze = se === "" ? "." : se + ":";
			if (Z(O))
				for (var Oe = 0; Oe < O.length; Oe++) ((se = O[Oe]), (ge = Ze + ie(se, Oe)), (pe += H(se, G, ae, ge, ve)));
			else if (((Oe = E(O)), typeof Oe == "function"))
				for (O = Oe.call(O), Oe = 0; !(se = O.next()).done; )
					((se = se.value), (ge = Ze + ie(se, Oe++)), (pe += H(se, G, ae, ge, ve)));
			else if (ge === "object") {
				if (typeof O.then == "function") return H(k(O), G, ae, se, ve);
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
		function B(O, G, ae) {
			if (O == null) return O;
			var se = [],
				ve = 0;
			return (
				H(O, se, "", "", function (ge) {
					return G.call(ae, ge, ve++);
				}),
				se
			);
		}
		function ue(O) {
			if (O._status === -1) {
				var G = O._result;
				((G = G()),
					G.then(
						function (ae) {
							(O._status === 0 || O._status === -1) && ((O._status = 1), (O._result = ae));
						},
						function (ae) {
							(O._status === 0 || O._status === -1) && ((O._status = 2), (O._result = ae));
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
			we = {
				map: B,
				forEach: function (O, G, ae) {
					B(
						O,
						function () {
							G.apply(this, arguments);
						},
						ae,
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
					if (!te(O)) throw Error("React.Children.only expected to receive a single React element child.");
					return O;
				},
			};
		((e.Activity = p),
			(e.Children = we),
			(e.Component = A),
			(e.Fragment = u),
			(e.Profiler = o),
			(e.PureComponent = R),
			(e.StrictMode = l),
			(e.Suspense = v),
			(e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = j),
			(e.__COMPILER_RUNTIME = {
				__proto__: null,
				c: function (O) {
					return j.H.useMemoCache(O);
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
			(e.cloneElement = function (O, G, ae) {
				if (O == null) throw Error("The argument must be a React element, but you passed " + O + ".");
				var se = T({}, O.props),
					ve = O.key;
				if (G != null)
					for (ge in (G.key !== void 0 && (ve = "" + G.key), G))
						!I.call(G, ge) ||
							ge === "key" ||
							ge === "__self" ||
							ge === "__source" ||
							(ge === "ref" && G.ref === void 0) ||
							(se[ge] = G[ge]);
				var ge = arguments.length - 2;
				if (ge === 1) se.children = ae;
				else if (1 < ge) {
					for (var pe = Array(ge), Ze = 0; Ze < ge; Ze++) pe[Ze] = arguments[Ze + 2];
					se.children = pe;
				}
				return L(O.type, ve, se);
			}),
			(e.createContext = function (O) {
				return (
					(O = { $$typeof: h, _currentValue: O, _currentValue2: O, _threadCount: 0, Provider: null, Consumer: null }),
					(O.Provider = O),
					(O.Consumer = { $$typeof: f, _context: O }),
					O
				);
			}),
			(e.createElement = function (O, G, ae) {
				var se,
					ve = {},
					ge = null;
				if (G != null)
					for (se in (G.key !== void 0 && (ge = "" + G.key), G))
						I.call(G, se) && se !== "key" && se !== "__self" && se !== "__source" && (ve[se] = G[se]);
				var pe = arguments.length - 2;
				if (pe === 1) ve.children = ae;
				else if (1 < pe) {
					for (var Ze = Array(pe), Oe = 0; Oe < pe; Oe++) Ze[Oe] = arguments[Oe + 2];
					ve.children = Ze;
				}
				if (O && O.defaultProps) for (se in ((pe = O.defaultProps), pe)) ve[se] === void 0 && (ve[se] = pe[se]);
				return L(O, ge, ve);
			}),
			(e.createRef = function () {
				return { current: null };
			}),
			(e.forwardRef = function (O) {
				return { $$typeof: m, render: O };
			}),
			(e.isValidElement = te),
			(e.lazy = function (O) {
				return { $$typeof: _, _payload: { _status: -1, _result: O }, _init: ue };
			}),
			(e.memo = function (O, G) {
				return { $$typeof: y, type: O, compare: G === void 0 ? null : G };
			}),
			(e.startTransition = function (O) {
				var G = j.T,
					ae = {};
				j.T = ae;
				try {
					var se = O(),
						ve = j.S;
					(ve !== null && ve(ae, se),
						typeof se == "object" && se !== null && typeof se.then == "function" && se.then(U, fe));
				} catch (ge) {
					fe(ge);
				} finally {
					(G !== null && ae.types !== null && (G.types = ae.types), (j.T = G));
				}
			}),
			(e.unstable_useCacheRefresh = function () {
				return j.H.useCacheRefresh();
			}),
			(e.use = function (O) {
				return j.H.use(O);
			}),
			(e.useActionState = function (O, G, ae) {
				return j.H.useActionState(O, G, ae);
			}),
			(e.useCallback = function (O, G) {
				return j.H.useCallback(O, G);
			}),
			(e.useContext = function (O) {
				return j.H.useContext(O);
			}),
			(e.useDebugValue = function () {}),
			(e.useDeferredValue = function (O, G) {
				return j.H.useDeferredValue(O, G);
			}),
			(e.useEffect = function (O, G) {
				return j.H.useEffect(O, G);
			}),
			(e.useEffectEvent = function (O) {
				return j.H.useEffectEvent(O);
			}),
			(e.useId = function () {
				return j.H.useId();
			}),
			(e.useImperativeHandle = function (O, G, ae) {
				return j.H.useImperativeHandle(O, G, ae);
			}),
			(e.useInsertionEffect = function (O, G) {
				return j.H.useInsertionEffect(O, G);
			}),
			(e.useLayoutEffect = function (O, G) {
				return j.H.useLayoutEffect(O, G);
			}),
			(e.useMemo = function (O, G) {
				return j.H.useMemo(O, G);
			}),
			(e.useOptimistic = function (O, G) {
				return j.H.useOptimistic(O, G);
			}),
			(e.useReducer = function (O, G, ae) {
				return j.H.useReducer(O, G, ae);
			}),
			(e.useRef = function (O) {
				return j.H.useRef(O);
			}),
			(e.useState = function (O) {
				return j.H.useState(O);
			}),
			(e.useSyncExternalStore = function (O, G, ae) {
				return j.H.useSyncExternalStore(O, G, ae);
			}),
			(e.useTransition = function () {
				return j.H.useTransition();
			}),
			(e.version = "19.2.8"));
	}),
	ro = Dn((e, n) => {
		n.exports = t1();
	}),
	Fn = [],
	kn = [],
	n1 = Uint8Array,
	Pf = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Or = 0, i1 = Pf.length; Or < i1; ++Or) ((Fn[Or] = Pf[Or]), (kn[Pf.charCodeAt(Or)] = Or));
kn[45] = 62;
kn[95] = 63;
function a1(e) {
	var n = e.length;
	if (n % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
	var a = e.indexOf("=");
	a === -1 && (a = n);
	var u = a === n ? 0 : 4 - (a % 4);
	return [a, u];
}
function r1(e, n, a) {
	return ((n + a) * 3) / 4 - a;
}
function Yu(e) {
	var n,
		a = a1(e),
		u = a[0],
		l = a[1],
		o = new n1(r1(e, u, l)),
		f = 0,
		h = l > 0 ? u - 4 : u,
		m;
	for (m = 0; m < h; m += 4)
		((n =
			(kn[e.charCodeAt(m)] << 18) |
			(kn[e.charCodeAt(m + 1)] << 12) |
			(kn[e.charCodeAt(m + 2)] << 6) |
			kn[e.charCodeAt(m + 3)]),
			(o[f++] = (n >> 16) & 255),
			(o[f++] = (n >> 8) & 255),
			(o[f++] = n & 255));
	return (
		l === 2 && ((n = (kn[e.charCodeAt(m)] << 2) | (kn[e.charCodeAt(m + 1)] >> 4)), (o[f++] = n & 255)),
		l === 1 &&
			((n = (kn[e.charCodeAt(m)] << 10) | (kn[e.charCodeAt(m + 1)] << 4) | (kn[e.charCodeAt(m + 2)] >> 2)),
			(o[f++] = (n >> 8) & 255),
			(o[f++] = n & 255)),
		o
	);
}
function u1(e) {
	return Fn[(e >> 18) & 63] + Fn[(e >> 12) & 63] + Fn[(e >> 6) & 63] + Fn[e & 63];
}
function s1(e, n, a) {
	for (var u, l = [], o = n; o < a; o += 3)
		((u = ((e[o] << 16) & 16711680) + ((e[o + 1] << 8) & 65280) + (e[o + 2] & 255)), l.push(u1(u)));
	return l.join("");
}
function Fu(e) {
	for (var n, a = e.length, u = a % 3, l = [], o = 16383, f = 0, h = a - u; f < h; f += o)
		l.push(s1(e, f, f + o > h ? h : f + o));
	return (
		u === 1
			? ((n = e[a - 1]), l.push(Fn[n >> 2] + Fn[(n << 4) & 63] + "=="))
			: u === 2 &&
				((n = (e[a - 2] << 8) + e[a - 1]), l.push(Fn[n >> 10] + Fn[(n >> 4) & 63] + Fn[(n << 2) & 63] + "=")),
		l.join("")
	);
}
function xi(e) {
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
		a = Object.getPrototypeOf(e),
		u = a === null || a === Object.prototype || a?.constructor?.name === "Object";
	return n && u;
}
var W0 = !0,
	Lr = BigInt("-9223372036854775808"),
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
	e < hd && (e -= Lr + Lr);
	let n = e.toString(16);
	n.length % 2 === 1 && (n = "0" + n);
	const a = new Uint8Array(new ArrayBuffer(8));
	let u = 0;
	for (const l of n.match(/.{2}/g).reverse()) (a.set([parseInt(l, 16)], u++), (e >>= o1));
	return Fu(a);
}
function h1(e) {
	const n = Yu(e);
	if (n.byteLength !== 8) throw new Error(`Received ${n.byteLength} bytes, expected 8 for $integer`);
	let a = hd,
		u = hd;
	for (const l of n) ((a += BigInt(l) * c1 ** u), u++);
	return (a > Dd && (a += Lr + Lr), a);
}
function m1(e) {
	if (e < Lr || Dd < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
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
		const a = e.charCodeAt(n);
		if (a < 32 || a >= 127)
			throw new Error(
				`Field name ${e} has invalid character '${e[n]}': Field names can only contain non-control ASCII characters`,
			);
	}
}
function $r(e) {
	if (e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string") return e;
	if (Array.isArray(e)) return e.map((u) => $r(u));
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
	const a = {};
	for (const [u, l] of Object.entries(e)) (md(u), (a[u] = $r(l)));
	return a;
}
var by = 16384;
function jr(e) {
	const n = JSON.stringify(e, (a, u) => (u === void 0 ? "undefined" : typeof u == "bigint" ? `${u.toString()}n` : u));
	if (n.length > by) {
		const a = "[...truncated]";
		let u = by - 14;
		const l = n.codePointAt(u - 1);
		return (l !== void 0 && l > 65535 && (u -= 1), n.substring(0, u) + a);
	}
	return n;
}
function Ql(e, n, a, u) {
	if (e === void 0) {
		const f = a && ` (present at path ${a} in original object ${jr(n)})`;
		throw new Error(
			`undefined is not a valid Convex value${f}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`,
		);
	}
	if (e === null) return e;
	if (typeof e == "bigint") {
		if (e < Lr || Dd < e) throw new Error(`BigInt ${e} does not fit into a 64-bit signed integer.`);
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
	if (Array.isArray(e)) return e.map((f, h) => Ql(f, n, a + `[${h}]`, !1));
	if (e instanceof Set) throw new Error(Ff(a, "Set", [...e], n));
	if (e instanceof Map) throw new Error(Ff(a, "Map", [...e], n));
	if (!J0(e)) {
		const f = e?.constructor?.name,
			h = f ? `${f} ` : "";
		throw new Error(Ff(a, h, e, n));
	}
	const l = {},
		o = Object.entries(e);
	o.sort(([f, h], [m, v]) => (f === m ? 0 : f < m ? -1 : 1));
	for (const [f, h] of o)
		h !== void 0 ? (md(f), (l[f] = Ql(h, n, a + `.${f}`, !1))) : u && (md(f), (l[f] = b1(h, n, a + `.${f}`)));
	return l;
}
function Ff(e, n, a, u) {
	return e
		? `${n}${jr(a)} is not a supported Convex type (present at path ${e} in original object ${jr(u)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
		: `${n}${jr(a)} is not a supported Convex type.`;
}
function b1(e, n, a) {
	if (e === void 0) return { $undefined: null };
	if (n === void 0) throw new Error(`Programming error. Current value is ${jr(e)} but original value is undefined`);
	return Ql(e, n, a, !1);
}
function Bn(e) {
	return Ql(e, e, "", !1);
}
var p1 = Object.defineProperty,
	S1 = (e, n, a) => (n in e ? p1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	nt = (e, n, a) => S1(e, typeof n != "symbol" ? n + "" : n, a),
	w1 = "https://docs.convex.dev/error#undefined-validator";
function Ku(e, n) {
	const a = n !== void 0 ? ` for field "${n}"` : "";
	throw new Error(
		`A validator is undefined${a} in ${e}. This is often caused by circular imports. See ${w1} for details.`,
	);
}
var cn = class {
		constructor({ isOptional: e }) {
			(nt(this, "type"),
				nt(this, "fieldPaths"),
				nt(this, "isOptional"),
				nt(this, "isConvexValidator"),
				(this.isOptional = e),
				(this.isConvexValidator = !0));
		}
	},
	_1 = class nb extends cn {
		constructor({ isOptional: n, tableName: a }) {
			if ((super({ isOptional: n }), nt(this, "tableName"), nt(this, "kind", "id"), typeof a != "string"))
				throw new Error("v.id(tableName) requires a string");
			this.tableName = a;
		}
		get json() {
			return { type: "id", tableName: this.tableName };
		}
		asOptional() {
			return new nb({ isOptional: "optional", tableName: this.tableName });
		}
	},
	py = class ib extends cn {
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
	Sy = class ab extends cn {
		constructor() {
			(super(...arguments), nt(this, "kind", "int64"));
		}
		get json() {
			return { type: "bigint" };
		}
		asOptional() {
			return new ab({ isOptional: "optional" });
		}
	},
	x1 = class rb extends cn {
		constructor() {
			(super(...arguments), nt(this, "kind", "commitTs"));
		}
		get json() {
			return { type: this.kind };
		}
		asOptional() {
			return new rb({ isOptional: "optional" });
		}
	},
	E1 = class ub extends cn {
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
	C1 = class sb extends cn {
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
	T1 = class lb extends cn {
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
	A1 = class ob extends cn {
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
	R1 = class cb extends cn {
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
	O1 = class Mr extends cn {
		constructor({ isOptional: n, fields: a }) {
			(super({ isOptional: n }),
				nt(this, "fields"),
				nt(this, "kind", "object"),
				globalThis.Object.entries(a).forEach(([u, l]) => {
					if ((l === void 0 && Ku("v.object()", u), !l.isConvexValidator))
						throw new Error("v.object() entries must be validators");
				}),
				(this.fields = a));
		}
		get json() {
			return {
				type: this.kind,
				value: globalThis.Object.fromEntries(
					globalThis.Object.entries(this.fields).map(([n, a]) => [
						n,
						{ fieldType: a.json, optional: a.isOptional === "optional" },
					]),
				),
			};
		}
		asOptional() {
			return new Mr({ isOptional: "optional", fields: this.fields });
		}
		omit(...n) {
			const a = { ...this.fields };
			for (const u of n) delete a[u];
			return new Mr({ isOptional: this.isOptional, fields: a });
		}
		pick(...n) {
			const a = {};
			for (const u of n) a[u] = this.fields[u];
			return new Mr({ isOptional: this.isOptional, fields: a });
		}
		partial() {
			const n = {};
			for (const [a, u] of globalThis.Object.entries(this.fields)) n[a] = u.asOptional();
			return new Mr({ isOptional: this.isOptional, fields: n });
		}
		extend(n) {
			return new Mr({ isOptional: this.isOptional, fields: { ...this.fields, ...n } });
		}
	},
	N1 = class fb extends cn {
		constructor({ isOptional: n, value: a }) {
			if (
				(super({ isOptional: n }),
				nt(this, "value"),
				nt(this, "kind", "literal"),
				typeof a != "string" && typeof a != "boolean" && typeof a != "number" && typeof a != "bigint")
			)
				throw new Error("v.literal(value) must be a string, number, or boolean");
			this.value = a;
		}
		get json() {
			return { type: this.kind, value: Bn(this.value) };
		}
		asOptional() {
			return new fb({ isOptional: "optional", value: this.value });
		}
	},
	M1 = class db extends cn {
		constructor({ isOptional: n, element: a }) {
			(super({ isOptional: n }),
				nt(this, "element"),
				nt(this, "kind", "array"),
				a === void 0 && Ku("v.array()"),
				(this.element = a));
		}
		get json() {
			return { type: this.kind, value: this.element.json };
		}
		asOptional() {
			return new db({ isOptional: "optional", element: this.element });
		}
	},
	z1 = class hb extends cn {
		constructor({ isOptional: n, key: a, value: u }) {
			if (
				(super({ isOptional: n }),
				nt(this, "key"),
				nt(this, "value"),
				nt(this, "kind", "record"),
				a === void 0 && Ku("v.record()", "key"),
				u === void 0 && Ku("v.record()", "value"),
				a.isOptional === "optional")
			)
				throw new Error("Record validator cannot have optional keys");
			if (u.isOptional === "optional") throw new Error("Record validator cannot have optional values");
			if (!a.isConvexValidator || !u.isConvexValidator)
				throw new Error("Key and value of v.record() but be validators");
			((this.key = a), (this.value = u));
		}
		get json() {
			return { type: this.kind, keys: this.key.json, values: { fieldType: this.value.json, optional: !1 } };
		}
		asOptional() {
			return new hb({ isOptional: "optional", key: this.key, value: this.value });
		}
	},
	k1 = class mb extends cn {
		constructor({ isOptional: n, members: a }) {
			(super({ isOptional: n }),
				nt(this, "members"),
				nt(this, "kind", "union"),
				a.forEach((u, l) => {
					if ((u === void 0 && Ku("v.union()", `member at index ${l}`), !u.isConvexValidator))
						throw new Error("All members of v.union() must be validators");
				}),
				(this.members = a));
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
	j1 = (e, n, a) => (n in e ? D1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Kf = (e, n, a) => j1(e, typeof n != "symbol" ? n + "" : n, a),
	wy,
	_y,
	q1 = Symbol.for("ConvexError"),
	vd = class extends ((_y = Error), (wy = q1), _y) {
		constructor(e) {
			(super(typeof e == "string" ? e : jr(e)),
				Kf(this, "name", "ConvexError"),
				Kf(this, "data"),
				Kf(this, wy, !0),
				(this.data = e));
		}
	},
	xy = "1.44.0",
	U1 = Object.defineProperty,
	I1 = (e, n, a) => (n in e ? U1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Ey = (e, n, a) => I1(e, typeof n != "symbol" ? n + "" : n, a),
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
function yb(e) {
	const n = new gb(e);
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
function bb(e) {
	return new gb(e);
}
function Pl(e, n, a, u, l) {
	const o = vb(a);
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
	const a = `[CONVEX FATAL ERROR] ${n}`;
	return (e.error(a), new Error(a));
}
function kr(e, n, a) {
	return `[CONVEX ${vb(e)}(${n})] ${a.errorMessage}
  Called by client`;
}
function gd(e, n) {
	return ((n.data = e.errorData), n);
}
function qa(e) {
	const n = e.split(":");
	let a, u;
	return (
		n.length === 1 ? ((a = n[0]), (u = "default")) : ((a = n.slice(0, n.length - 1).join(":")), (u = n[n.length - 1])),
		a.endsWith(".js") && (a = a.slice(0, -3)),
		`${a}:${u}`
	);
}
function Da(e, n) {
	return JSON.stringify({ udfPath: qa(e), args: Bn(n) });
}
function Cy(e, n, a) {
	const { initialNumItems: u, id: l } = a;
	return JSON.stringify({ type: "paginated", udfPath: qa(e), args: Bn(n), options: Bn({ initialNumItems: u, id: l }) });
}
var B1 = Object.defineProperty,
	V1 = (e, n, a) => (n in e ? B1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Yn = (e, n, a) => V1(e, typeof n != "symbol" ? n + "" : n, a),
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
		subscribe(e, n, a, u) {
			const l = qa(e),
				o = Da(l, n),
				f = this.querySet.get(o);
			if (f !== void 0)
				return (
					(f.numSubscribers += 1),
					{ queryToken: o, modification: null, unsubscribe: () => this.removeSubscriber(o) }
				);
			{
				const h = this.nextQueryId++,
					m = { id: h, canonicalizedUdfPath: l, args: n, numSubscribers: 1, journal: a, componentPath: u };
				(this.querySet.set(o, m), this.queryIdToToken.set(h, o));
				const v = this.querySetVersion,
					y = this.querySetVersion + 1,
					_ = { type: "Add", queryId: h, udfPath: l, args: [Bn(n)], journal: a, componentPath: u };
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
			const a = Da(qa(e), n),
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
					l = { type: "Remove", queryId: n.id };
				return (
					this.paused
						? this.pendingQuerySetModifications.has(n.id)
							? this.pendingQuerySetModifications.delete(n.id)
							: this.pendingQuerySetModifications.set(n.id, l)
						: (this.querySetVersion = u),
					{ type: "ModifyQuerySet", baseVersion: a, newVersion: u, modifications: [l] }
				);
			}
		}
	},
	Z1 = Object.defineProperty,
	Q1 = (e, n, a) => (n in e ? Z1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	jl = (e, n, a) => Q1(e, typeof n != "symbol" ? n + "" : n, a),
	P1 = class {
		constructor(e, n) {
			((this.logger = e),
				(this.markConnectionStateDirty = n),
				jl(this, "inflightRequests"),
				jl(this, "requestsOlderThanRestart"),
				jl(this, "inflightMutationsCount", 0),
				jl(this, "inflightActionsCount", 0),
				(this.inflightRequests = new Map()),
				(this.requestsOlderThanRestart = new Set()));
		}
		request(e, n) {
			const a = new Promise((u) => {
				const l = n ? "Requested" : "NotSent";
				(this.inflightRequests.set(e.requestId, {
					message: e,
					status: { status: l, requestedAt: new Date(), onResult: u },
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
			for (const h of e.logLines) Pl(this.logger, "info", a, u, h);
			const l = n.status;
			let o, f;
			if (e.success) ((o = { success: !0, logLines: e.logLines, value: $r(e.result) }), (f = () => l.onResult(o)));
			else {
				const h = e.result,
					{ errorData: m } = e;
				(Pl(this.logger, "error", a, u, h),
					(o = { success: !1, errorMessage: h, errorData: m !== void 0 ? $r(m) : void 0, logLines: e.logLines }),
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
			for (const [a, u] of this.inflightRequests.entries()) {
				const l = u.status;
				l.status === "Completed" &&
					l.ts.lessThanOrEqual(e) &&
					(l.onResolve(),
					n.set(a, l.result),
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
		const a = Y1(e);
		if (!a) throw new Error(`${e} is not a functionReference`);
		n = { reference: a };
	}
	return n;
}
function Jt(e) {
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
	const a = e[Gu];
	if (!a) throw new Error(`${e} is not a functionReference`);
	return a;
}
function jd(e) {
	return { [Gu]: e };
}
function Sb(e = []) {
	return new Proxy(
		{},
		{
			get(n, a) {
				if (typeof a == "string") return Sb([...e, a]);
				if (a === Gu) {
					if (e.length < 2) {
						const o = ["api", ...e].join(".");
						throw new Error(`API path is expected to be of the form \`api.moduleName.functionName\`. Found: \`${o}\``);
					}
					const u = e.slice(0, -1).join("/"),
						l = e[e.length - 1];
					return l === "default" ? u : u + ":" + l;
				} else return a === Symbol.toStringTag ? "FunctionReference" : void 0;
			},
		},
	);
}
var wb = Sb(),
	G1 = Object.defineProperty,
	X1 = (e, n, a) => (n in e ? G1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Yl = (e, n, a) => X1(e, typeof n != "symbol" ? n + "" : n, a),
	Ty = class yd {
		constructor(n) {
			(Yl(this, "queryResults"), Yl(this, "modifiedQueries"), (this.queryResults = n), (this.modifiedQueries = []));
		}
		getQuery(n, ...a) {
			const u = xi(a[0]),
				l = Jt(n),
				o = this.queryResults.get(Da(l, u));
			if (o !== void 0) return yd.queryValue(o.result);
		}
		getAllQueries(n) {
			const a = [],
				u = Jt(n);
			for (const l of this.queryResults.values())
				l.udfPath === qa(u) && a.push({ args: l.args, value: yd.queryValue(l.result) });
			return a;
		}
		setQuery(n, a, u) {
			const l = xi(a),
				o = Jt(n),
				f = Da(o, l);
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
			(Yl(this, "queryResults"),
				Yl(this, "optimisticUpdates"),
				(this.queryResults = new Map()),
				(this.optimisticUpdates = []));
		}
		ingestQueryResultsFromServer(e, n) {
			this.optimisticUpdates = this.optimisticUpdates.filter((o) => !n.has(o.mutationId));
			const a = this.queryResults;
			this.queryResults = new Map(e);
			const u = new Ty(this.queryResults);
			for (const o of this.optimisticUpdates) o.update(u);
			const l = [];
			for (const [o, f] of this.queryResults) {
				const h = a.get(o);
				(h === void 0 || h.result !== f.result) && l.push(o);
			}
			return l;
		}
		applyOptimisticUpdate(e, n) {
			this.optimisticUpdates.push({ update: e, mutationId: n });
			const a = new Ty(this.queryResults);
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
				throw a.errorData !== void 0 ? gd(a, new vd(kr("query", n.udfPath, a))) : new Error(kr("query", n.udfPath, a));
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
	ex = (e, n, a) => (n in e ? W1(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Gf = (e, n, a) => ex(e, typeof n != "symbol" ? n + "" : n, a),
	ts = class wi {
		constructor(n, a) {
			(Gf(this, "low"),
				Gf(this, "high"),
				Gf(this, "__isUnsignedLong__"),
				(this.low = n | 0),
				(this.high = a | 0),
				(this.__isUnsignedLong__ = !0));
		}
		static isLong(n) {
			return (n && n.__isUnsignedLong__) === !0;
		}
		static fromBytesLE(n) {
			return new wi(n[0] | (n[1] << 8) | (n[2] << 16) | (n[3] << 24), n[4] | (n[5] << 8) | (n[6] << 16) | (n[7] << 24));
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
			return isNaN(n) || n < 0 ? Ay : n >= tx ? nx : new wi((n % Zu) | 0, (n / Zu) | 0);
		}
		toString() {
			return (BigInt(this.high) * BigInt(Zu) + BigInt(this.low)).toString();
		}
		equals(n) {
			return (
				wi.isLong(n) || (n = wi.fromValue(n)),
				this.high >>> 31 === 1 && n.high >>> 31 === 1 ? !1 : this.high === n.high && this.low === n.low
			);
		}
		notEquals(n) {
			return !this.equals(n);
		}
		comp(n) {
			return (
				wi.isLong(n) || (n = wi.fromValue(n)),
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
			return typeof n == "number" ? wi.fromNumber(n) : new wi(n.low, n.high);
		}
	},
	Ay = new ts(0, 0),
	Ry = 65536,
	Zu = Ry * Ry,
	tx = Zu * Zu,
	nx = new ts(-1, -1),
	ix = Object.defineProperty,
	ax = (e, n, a) => (n in e ? ix(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	ql = (e, n, a) => ax(e, typeof n != "symbol" ? n + "" : n, a),
	Oy = class {
		constructor(e, n) {
			(ql(this, "version"),
				ql(this, "remoteQuerySet"),
				ql(this, "queryPath"),
				ql(this, "logger"),
				(this.version = { querySet: 0, ts: ts.fromNumber(0), identity: 0 }),
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
						if (u) for (const o of a.logLines) Pl(this.logger, "info", "query", u, o);
						const l = $r(a.value ?? null);
						this.remoteQuerySet.set(a.queryId, { success: !0, value: l, logLines: a.logLines });
						break;
					}
					case "QueryFailed": {
						const u = this.queryPath(a.queryId);
						if (u) for (const o of a.logLines) Pl(this.logger, "info", "query", u, o);
						const { errorData: l } = a;
						this.remoteQuerySet.set(a.queryId, {
							success: !1,
							errorMessage: a.errorMessage,
							errorData: l !== void 0 ? $r(l) : void 0,
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
function Xf(e) {
	const n = Yu(e);
	return ts.fromBytesLE(Array.from(n));
}
function rx(e) {
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
				? { ...e, maxObservedTimestamp: rx(e.maxObservedTimestamp) }
				: { ...e, maxObservedTimestamp: void 0 };
		default:
	}
}
var sx = Object.defineProperty,
	lx = (e, n, a) => (n in e ? sx(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	xt = (e, n, a) => lx(e, typeof n != "symbol" ? n + "" : n, a),
	ox = 1e3,
	cx = 1001,
	fx = 1005,
	dx = 4040,
	Hl;
function zr() {
	return (
		Hl === void 0 && (Hl = Date.now()),
		typeof performance > "u" || !performance.now ? Date.now() : Math.round(Hl + performance.now())
	);
}
function My() {
	return `t=${Math.round((zr() - Hl) / 100) / 10}s`;
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
	constructor(e, n, a, u, l, o) {
		((this.markConnectionStateDirty = l),
			(this.debug = o),
			xt(this, "socket"),
			xt(this, "connectionCount"),
			xt(this, "_hasEverConnected", !1),
			xt(this, "lastCloseReason"),
			xt(this, "transitionChunkBuffer", null),
			xt(this, "defaultInitialBackoff"),
			xt(this, "maxBackoff"),
			xt(this, "retries"),
			xt(this, "serverInactivityThreshold"),
			xt(this, "reconnectDueToServerInactivityTimeout"),
			xt(this, "scheduledReconnect", null),
			xt(this, "networkOnlineHandler", null),
			xt(this, "pendingNetworkRecoveryInfo", null),
			xt(this, "uri"),
			xt(this, "onOpen"),
			xt(this, "onResume"),
			xt(this, "onMessage"),
			xt(this, "webSocketConstructor"),
			xt(this, "logger"),
			xt(this, "onServerDisconnectError"),
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
			const a = Ny(JSON.parse(n));
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
							clientTs: zr(),
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
				const a = n.message;
				a && this.logger.log(`WebSocket error message: ${a}`);
			}),
			(e.onmessage = (n) => {
				this.resetServerInactivityTimeout();
				const a = n.data.length;
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
						u.type === "Transition" && this.reportLargeTransition({ messageLength: a, transition: u }),
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
				const a = hx(n.reason);
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
			const a = ux(e),
				u = JSON.stringify(a);
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
		const a = zr(),
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
			const n = zr() - this.scheduledReconnect.scheduledAt;
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
							clientTs: zr(),
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
		const a = Math.min(n, this.maxBackoff);
		return a + a * (Math.random() - 0.5);
	}
	reportLargeTransition({ transition: e, messageLength: n }) {
		if (e.clientClockSkew === void 0 || e.serverTs === void 0) return;
		const a = zr() - e.clientClockSkew - e.serverTs / 1e6,
			u = `${Math.round(a)}ms`,
			l = `${Math.round(n / 1e4) / 100}MB`,
			o = n / (a / 1e3),
			f = `${Math.round(o / 1e4) / 100}MB per second`;
		(this._logVerbose(`received ${l} transition in ${u} at ${f}`),
			n > 2e7
				? this.logger.log(
						`received query results totaling more that 20MB (${l}) which will take a long time to download on slower connections`,
					)
				: a > 2e4 && this.logger.log(`received query results totaling ${l} which took more than 20s to arrive (${u})`),
			this.debug &&
				this.sendMessage({
					type: "Event",
					eventType: "ClientReceivedTransition",
					event: { transitionTransitTime: a, messageLength: n },
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
		atob(e).replace(/(.)/g, (n, a) => {
			let u = a.charCodeAt(0).toString(16).toUpperCase();
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
	const a = n.header === !0 ? 0 : 1,
		u = e.split(".")[a];
	if (typeof u != "string") throw new Vu(`Invalid token specified: missing part #${a + 1}`);
	let l;
	try {
		l = bx(u);
	} catch (o) {
		throw new Vu(`Invalid token specified: invalid base64 for part #${a + 1} (${o.message})`);
	}
	try {
		return JSON.parse(l);
	} catch (o) {
		throw new Vu(`Invalid token specified: invalid json for part #${a + 1} (${o.message})`);
	}
}
var px = Object.defineProperty,
	Sx = (e, n, a) => (n in e ? px(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	sn = (e, n, a) => Sx(e, typeof n != "symbol" ? n + "" : n, a),
	wx = 480 * 60 * 60 * 1e3,
	zy = 2,
	_x = class {
		constructor(e, n, a) {
			(sn(this, "authState", { state: "noAuth" }),
				sn(this, "configVersion", 0),
				sn(this, "syncState"),
				sn(this, "authenticate"),
				sn(this, "stopSocket"),
				sn(this, "tryRestartSocket"),
				sn(this, "pauseSocket"),
				sn(this, "resumeSocket"),
				sn(this, "clearAuth"),
				sn(this, "logger"),
				sn(this, "refreshTokenLeewaySeconds"),
				sn(this, "initialAuthTokenReuse"),
				sn(this, "lastRefreshChange"),
				sn(this, "tokenConfirmationAttempts", 0),
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
			const l = { fetchToken: e, onAuthChange: n, onRefreshChange: a };
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
			const a = this.decodeToken(e);
			if (!a) {
				this.logger.error("Auth token is not a valid JWT, cannot refetch the token");
				return;
			}
			const { iat: u, exp: l } = a;
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
	const a = { sessionId: n };
	typeof performance > "u" || !performance.mark || performance.mark(e, { detail: a });
}
function Cx(e) {
	let n = e.name.slice(6);
	return ((n = n.charAt(0).toLowerCase() + n.slice(1)), { name: n, startTime: e.startTime });
}
function Tx(e) {
	if (typeof performance > "u" || !performance.getEntriesByName) return [];
	const n = [];
	for (const a of xx) {
		const u = performance
			.getEntriesByName(a)
			.filter((l) => l.entryType === "mark")
			.filter((l) => l.detail.sessionId === e);
		n.push(...u);
	}
	return n.map(Cx);
}
var Ax = Object.defineProperty,
	Rx = (e, n, a) => (n in e ? Ax(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Et = (e, n, a) => Rx(e, typeof n != "symbol" ? n + "" : n, a),
	Ox = class {
		constructor(e, n, a) {
			if (
				(Et(this, "address"),
				Et(this, "state"),
				Et(this, "requestManager"),
				Et(this, "webSocketManager"),
				Et(this, "authenticationManager"),
				Et(this, "remoteQuerySet"),
				Et(this, "optimisticQueryResults"),
				Et(this, "_transitionHandlerCounter", 0),
				Et(this, "_nextRequestId"),
				Et(this, "_onTransitionFns", new Map()),
				Et(this, "_sessionId"),
				Et(this, "firstMessageReceived", !1),
				Et(this, "debug"),
				Et(this, "logger"),
				Et(this, "maxObservedTimestamp"),
				Et(this, "connectionStateSubscribers", new Map()),
				Et(this, "nextConnectionStateSubscriberId", 0),
				Et(this, "_lastPublishedConnectionState"),
				Et(this, "markConnectionStateDirty", () => {
					Promise.resolve().then(() => {
						const p = this.connectionState();
						if (JSON.stringify(p) !== JSON.stringify(this._lastPublishedConnectionState)) {
							this._lastPublishedConnectionState = p;
							for (const S of this.connectionStateSubscribers.values()) S(p);
						}
					});
				}),
				Et(this, "mark", (p) => {
					this.debug && Ex(p, this.sessionId);
				}),
				typeof e == "object")
			)
				throw new Error(
					"Passing a ClientConfig object is no longer supported. Pass the URL of the Convex deployment as a string directly.",
				);
			(a?.skipConvexDeploymentUrlCheck !== !0 && l1(e), (a = { ...a }));
			const u = a.authRefreshTokenLeewaySeconds ?? 10;
			let l = a.webSocketConstructor;
			if (!l && typeof WebSocket > "u")
				throw new Error(
					"No WebSocket global variable defined! To use Convex in an environment without WebSocket try the HTTP client: https://docs.convex.dev/api/classes/browser.ConvexHttpClient",
				);
			((l = l || WebSocket),
				(this.debug = a.reportDebugInfoToConvex ?? !1),
				(this.address = e),
				(this.logger =
					a.logger === !1
						? bb({ verbose: a.verbose ?? !1 })
						: a.logger !== !0 && a.logger
							? a.logger
							: yb({ verbose: a.verbose ?? !1 })));
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
				(this.remoteQuerySet = new Oy((p) => this.state.queryPath(p), this.logger)),
				(this.requestManager = new P1(this.logger, this.markConnectionStateDirty)));
			const y = () => {
				(this.webSocketManager.pause(), this.state.pause());
			};
			((this.authenticationManager = new _x(
				this.state,
				{
					authenticate: (p) => {
						const S = this.state.setAuth(p);
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
				{ logger: this.logger, refreshTokenLeewaySeconds: u, initialAuthTokenReuse: a.initialAuthTokenReuse ?? !1 },
			)),
				(this.optimisticQueryResults = new J1()),
				this.addOnTransitionHandler((p) => {
					n(p.queries.map((S) => S.token));
				}),
				(this._nextRequestId = 0),
				(this._sessionId = vx()));
			const { unsavedChangesWarning: _ } = a;
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
							const S = "Are you sure you want to leave? Your changes may not be saved.";
							return (((p || window.event).returnValue = S), S);
						}
					});
			((this.webSocketManager = new mx(
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
							(this.remoteQuerySet = new Oy((C) => this.state.queryPath(C), this.logger)));
						const [S, E] = this.state.restart();
						(E && this.webSocketManager.sendMessage(E), this.webSocketManager.sendMessage(S));
						for (const C of this.requestManager.restart()) this.webSocketManager.sendMessage(C);
					},
					onResume: () => {
						const [p, S] = this.state.resume();
						(S && this.webSocketManager.sendMessage(S), p && this.webSocketManager.sendMessage(p));
						for (const E of this.requestManager.resume()) this.webSocketManager.sendMessage(E);
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
								const S = this.requestManager.removeCompleted(this.remoteQuerySet.timestamp());
								this.notifyOnQueryResultChanges(S);
								break;
							}
							case "MutationResponse": {
								p.success && this.observedTimestamp(p.ts);
								const S = this.requestManager.onResponse(p);
								S !== null && this.notifyOnQueryResultChanges(new Map([[S.requestId, S.result]]));
								break;
							}
							case "ActionResponse":
								this.requestManager.onResponse(p);
								break;
							case "AuthError":
								this.authenticationManager.onAuthError(p);
								break;
							case "FatalError": {
								const S = $1(this.logger, p.error);
								throw (this.webSocketManager.terminate(), S);
							}
							default:
						}
						return { hasSyncedPastLastReconnect: this.hasSyncedPastLastReconnect() };
					},
					onServerDisconnectError: a.onServerDisconnectError,
				},
				l,
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
			for (const [l, o] of n) {
				const f = this.state.queryToken(l);
				if (f !== null) {
					const h = { result: o, udfPath: this.state.queryPath(l), args: this.state.queryArgs(l) };
					a.set(f, h);
				}
			}
			const u = this.optimisticQueryResults.ingestQueryResultsFromServer(a, new Set(e.keys()));
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
			const u = xi(n),
				{ modification: l, queryToken: o, unsubscribe: f } = this.state.subscribe(e, u, a?.journal, a?.componentPath);
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
			const a = Da(e, xi(n));
			return this.optimisticQueryResults.queryResult(a);
		}
		localQueryResultByToken(e) {
			return this.optimisticQueryResults.queryResult(e);
		}
		hasLocalQueryResultByToken(e) {
			return this.optimisticQueryResults.hasQueryResult(e);
		}
		localQueryLogs(e, n) {
			const a = Da(e, xi(n));
			return this.optimisticQueryResults.queryLogs(a);
		}
		queryJournal(e, n) {
			const a = Da(e, xi(n));
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
				throw u.errorData !== void 0 ? gd(u, new vd(kr("mutation", e, u))) : new Error(kr("mutation", e, u));
			return u.value;
		}
		async mutationInternal(e, n, a, u) {
			const { mutationPromise: l } = this.enqueueMutation(e, n, a, u);
			return l;
		}
		enqueueMutation(e, n, a, u) {
			const l = xi(n);
			this.tryReportLongDisconnect();
			const o = this.nextRequestId;
			if ((this._nextRequestId++, a !== void 0)) {
				const m = a.optimisticUpdate;
				if (m !== void 0) {
					const v = (_) => {
							m(_, l) instanceof Promise &&
								this.logger.warn(
									"Optimistic update handler returned a Promise. Optimistic updates should be synchronous.",
								);
						},
						y = this.optimisticQueryResults.applyOptimisticUpdate(v, o).map((_) => {
							const p = this.localQueryResultByToken(_);
							return {
								token: _,
								modification: {
									kind: "Updated",
									result: p === void 0 ? void 0 : { success: !0, value: p, logLines: [] },
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
			const a = await this.actionInternal(e, n);
			if (!a.success) throw a.errorData !== void 0 ? gd(a, new vd(kr("action", e, a))) : new Error(kr("action", e, a));
			return a.value;
		}
		async actionInternal(e, n, a) {
			const u = xi(n),
				l = this.nextRequestId;
			(this._nextRequestId++, this.tryReportLongDisconnect());
			const o = { type: "Action", requestId: l, udfPath: e, componentPath: a, args: [Bn(u)] },
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
				.then((a) => {
					a.ok || this.logger.warn("Analytics request failed with response:", a.body);
				})
				.catch((a) => {
					this.logger.warn("Analytics response failed with error:", a);
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
	Mx = (e, n, a) => (n in e ? Nx(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	ky = (e, n, a) => Mx(e, typeof n != "symbol" ? n + "" : n, a),
	zx = class {
		constructor(e, n) {
			((this.client = e),
				(this.onTransition = n),
				ky(this, "paginatedQuerySet", new Map()),
				ky(this, "lastTransitionTs"),
				(this.lastTransitionTs = ts.fromNumber(0)),
				this.client.addOnTransitionHandler((a) => this.onBaseTransition(a)));
		}
		subscribe(e, n, a) {
			const u = qa(e),
				l = Cy(u, n, a),
				o = () => this.removePaginatedQuerySubscriber(l),
				f = this.paginatedQuerySet.get(l);
			return f
				? ((f.numSubscribers += 1), { paginatedQueryToken: l, unsubscribe: o })
				: (this.paginatedQuerySet.set(l, {
						token: l,
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
					this.addPageToPaginatedQuery(l, null, a.initialNumItems),
					{ paginatedQueryToken: l, unsubscribe: o });
		}
		localQueryResult(e, n, a) {
			const u = Cy(qa(e), n, a);
			return this.localQueryResultByToken(u);
		}
		localQueryResultByToken(e) {
			const n = this.paginatedQuerySet.get(e);
			if (!n) return;
			const a = this.activePageQueryTokens(n);
			if (a.length === 0)
				return { results: [], status: "LoadingFirstPage", loadMore: (h) => this.loadMoreOfPaginatedQuery(e, h) };
			let u = [],
				l = !1,
				o = !1;
			for (const h of a) {
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
				a = this.queriesContainingTokens(n);
			let u = [];
			a.length > 0 &&
				(this.processPaginatedQuerySplits(a, (o) => this.client.localQueryResultByToken(o)),
				(u = a.map((o) => ({ token: o, modification: { kind: "Updated", result: this.localQueryResultByToken(o) } }))));
			const l = { ...e, paginatedQueries: u };
			this.onTransition(l);
		}
		loadMoreOfPaginatedQuery(e, n) {
			this.mustGetPaginatedQuery(e);
			const a = this.queryTokenForLastPageOfPaginatedQuery(e),
				u = this.client.localQueryResultByToken(a);
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
				a = new Set(e);
			for (const [u, l] of this.paginatedQuerySet)
				for (const o of this.allQueryTokens(l))
					if (a.has(o)) {
						n.push(u);
						break;
					}
			return n;
		}
		processPaginatedQuerySplits(e, n) {
			for (const a of e) {
				const u = this.mustGetPaginatedQuery(a),
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
		splitPaginatedQueryPage(e, n, a, u, l) {
			const o = e.nextPageKey++,
				f = e.nextPageKey++,
				h = { numItems: e.options.initialNumItems, id: e.id },
				m = this.client.subscribe(e.canonicalizedUdfPath, {
					...e.args,
					paginationOpts: { ...h, cursor: a, endCursor: u },
				});
			e.pageKeyToQuery.set(o, { ...m, cursor: a });
			const v = this.client.subscribe(e.canonicalizedUdfPath, {
				...e.args,
				paginationOpts: { ...h, cursor: u, endCursor: l },
			});
			(e.pageKeyToQuery.set(f, { ...v, cursor: u }), e.ongoingSplits.set(n, [o, f]));
		}
		addPageToPaginatedQuery(e, n, a) {
			const u = this.mustGetPaginatedQuery(e),
				l = u.nextPageKey++,
				o = { cursor: n, numItems: a, id: u.id },
				f = { ...u.args, paginationOpts: o },
				h = this.client.subscribe(u.canonicalizedUdfPath, f);
			return (u.pageKeys.push(l), u.pageKeyToQuery.set(l, { ...h, cursor: n }), h);
		}
		removePaginatedQuerySubscriber(e) {
			const n = this.paginatedQuerySet.get(e);
			if (n && ((n.numSubscribers -= 1), !(n.numSubscribers > 0))) {
				for (const a of n.pageKeyToQuery.values()) a.unsubscribe();
				this.paginatedQuerySet.delete(e);
			}
		}
		completePaginatedQuerySplit(e, n, a, u) {
			const l = e.pageKeyToQuery.get(n);
			e.pageKeyToQuery.delete(n);
			const o = e.pageKeys.indexOf(n);
			(e.pageKeys.splice(o, 1, a, u), e.ongoingSplits.delete(n), l.unsubscribe());
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
	w = X0(ro(), 1);
function Eb({ getCurrentValue: e, subscribe: n }) {
	const [a, u] = (0, w.useState)(() => ({ getCurrentValue: e, subscribe: n, value: e() }));
	let l = a.value;
	return (
		(a.getCurrentValue !== e || a.subscribe !== n) && ((l = e()), u({ getCurrentValue: e, subscribe: n, value: l })),
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
	Dx = (e, n, a) => (n in e ? kx(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Si = (e, n, a) => Dx(e, typeof n != "symbol" ? n + "" : n, a),
	jx = 5e3;
if (typeof w.default > "u") throw new Error("Required dependency 'react' not found");
function Cb(e, n, a) {
	function u(l) {
		return (Lx(l), n.mutation(e, l, { optimisticUpdate: a }));
	}
	return (
		(u.withOptimisticUpdate = function (o) {
			if (a !== void 0) throw new Error(`Already specified optimistic update for mutation ${Jt(e)}`);
			return Cb(e, n, o);
		}),
		u
	);
}
function qx(e, n) {
	return function (a) {
		return n.action(e, a);
	};
}
var Tb = class {
		constructor(e, n) {
			if (
				(Si(this, "address"),
				Si(this, "cachedSync"),
				Si(this, "cachedPaginatedQueryClient"),
				Si(this, "listeners"),
				Si(this, "options"),
				Si(this, "closed", !1),
				Si(this, "_logger"),
				Si(this, "adminAuth"),
				Si(this, "fakeUserIdentity"),
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
		setAuth(e, n, a) {
			if (typeof e == "string")
				throw new Error(
					"Passing a string to ConvexReactClient.setAuth is no longer supported, please upgrade to passing in an async function to handle reauthentication.",
				);
			this.sync.setAuth(e, n ?? (() => {}), a);
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
			const [a, u] = n,
				l = Jt(e);
			return {
				onUpdate: (o) => {
					const { queryToken: f, unsubscribe: h } = this.sync.subscribe(l, a, u),
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
					if (this.cachedSync) return this.cachedSync.localQueryResult(l, a);
				},
				localQueryLogs: () => {
					if (this.cachedSync) return this.cachedSync.localQueryLogs(l, a);
				},
				journal: () => {
					if (this.cachedSync) return this.cachedSync.queryJournal(l, a);
				},
			};
		}
		prewarmQuery(e) {
			const n = e.extendSubscriptionFor ?? jx,
				a = this.watchQuery(e.query, e.args || {}).onUpdate(() => {});
			setTimeout(a, n);
		}
		watchPaginatedQuery(e, n, a) {
			const u = Jt(e);
			return {
				onUpdate: (l) => {
					const { paginatedQueryToken: o, unsubscribe: f } = this.paginatedQueryClient.subscribe(u, n || {}, a),
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
				localQueryResult: () => this.paginatedQueryClient.localQueryResult(u, n, a),
			};
		}
		mutation(e, ...n) {
			const [a, u] = n,
				l = Jt(e);
			return this.sync.mutation(l, a, u);
		}
		action(e, ...n) {
			const a = Jt(e);
			return this.sync.action(a, ...n);
		}
		query(e, ...n) {
			const a = this.watchQuery(e, ...n),
				u = a.localQueryResult();
			return u !== void 0
				? Promise.resolve(u)
				: new Promise((l, o) => {
						const f = a.onUpdate(() => {
							f();
							try {
								l(a.localQueryResult());
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
				a = e.paginatedQueries.map((u) => u.token);
			this.transition([...n, ...a]);
		}
		transition(e) {
			for (const n of e) {
				const a = this.listeners.get(n);
				if (a) for (const u of a) u();
			}
		}
	},
	ns = w.createContext(void 0);
function Hr() {
	return (0, w.useContext)(ns);
}
var Ux = ({ client: e, children: n }) => w.createElement(ns.Provider, { value: e }, n);
function Ye(e, ...n) {
	const a = n[0] === "skip",
		u = n[0] === "skip" ? {} : xi(n[0]),
		l = typeof e == "string" ? jd(e) : e,
		o = Jt(l),
		f = qd((0, w.useMemo)(() => (a ? {} : { query: { query: l, args: u } }), [JSON.stringify(Bn(u)), o, a])).query;
	if (f instanceof Error) throw f;
	return f;
}
function ja(e) {
	const n = typeof e == "string" ? jd(e) : e,
		a = (0, w.useContext)(ns);
	if (a === void 0)
		throw new Error(
			"Could not find Convex client! `useMutation` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return (0, w.useMemo)(() => Cb(n, a), [a, Jt(n)]);
}
function Ab(e) {
	const n = (0, w.useContext)(ns),
		a = typeof e == "string" ? jd(e) : e;
	if (n === void 0)
		throw new Error(
			"Could not find Convex client! `useAction` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return (0, w.useMemo)(() => qx(a, n), [n, Jt(a)]);
}
function Ix() {
	const e = (0, w.useContext)(ns);
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
	Bx = (e, n, a) => (n in e ? $x(e, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[n] = a)),
	Wf = (e, n, a) => Bx(e, typeof n != "symbol" ? n + "" : n, a),
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
				const { query: a, args: u, paginationOptions: l } = e[n];
				if ((Jt(a), this.queries[n] === void 0)) this.addQuery(n, a, u, l ? { paginationOptions: l } : {});
				else {
					const o = this.queries[n];
					(Jt(a) !== Jt(o.query) ||
						JSON.stringify(Bn(u)) !== JSON.stringify(Bn(o.args)) ||
						JSON.stringify(l) !== JSON.stringify(o.paginationOptions)) &&
						(this.removeQuery(n), this.addQuery(n, a, u, l ? { paginationOptions: l } : {}));
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
			for (const a of Object.keys(e)) {
				const { query: u, args: l } = e[a],
					o = e[a].paginationOptions;
				Jt(u);
				const f = this.createWatch(u, l, o ? { paginationOptions: o } : {});
				let h;
				try {
					h = f.localQueryResult();
				} catch (m) {
					if (m instanceof Error) h = m;
					else throw m;
				}
				n[a] = h;
			}
			return n;
		}
		setCreateWatch(e) {
			this.createWatch = e;
			for (const n of Object.keys(this.queries)) {
				const { query: a, args: u, watch: l, paginationOptions: o } = this.queries[n],
					f = "journal" in l ? l.journal() : void 0;
				(this.removeQuery(n),
					this.addQuery(n, a, u, { ...(f ? { journal: f } : []), ...(o ? { paginationOptions: o } : {}) }));
			}
		}
		destroy() {
			for (const e of Object.keys(this.queries)) this.removeQuery(e);
			this.listeners = new Set();
		}
		addQuery(e, n, a, { paginationOptions: u, journal: l }) {
			if (this.queries[e] !== void 0)
				throw new Error(`Tried to add a new query with identifier ${e} when it already exists.`);
			const o = this.createWatch(n, a, { ...(l ? { journal: l } : []), ...(u ? { paginationOptions: u } : {}) }),
				f = o.onUpdate(() => this.notifyListeners());
			this.queries[e] = { query: n, args: a, watch: o, unsubscribe: f, ...(u ? { paginationOptions: u } : {}) };
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
	const n = Hr();
	if (n === void 0)
		throw new Error(
			"Could not find Convex client! `useQuery` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app",
		);
	return Hx(
		e,
		(0, w.useMemo)(
			() =>
				(a, u, { journal: l, paginationOptions: o }) =>
					o ? n.watchPaginatedQuery(a, u, o) : n.watchQuery(a, u, l ? { journal: l } : {}),
			[n],
		),
	);
}
function Hx(e, n) {
	const [a] = (0, w.useState)(() => new Vx(n));
	return (
		a.createWatch !== n && a.setCreateWatch(n),
		(0, w.useEffect)(() => () => a.destroy(), [a]),
		Eb(
			(0, w.useMemo)(
				() => ({ getCurrentValue: () => a.getLocalResults(e), subscribe: (u) => (a.setQueries(e), a.subscribe(u)) }),
				[a, e],
			),
		)
	);
}
function Rb(e, n) {
	return new Proxy(
		{},
		{
			get(a, u) {
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
	const a = {};
	for (const [u, l] of Object.entries(n.tokens)) {
		if (typeof l != "string") return null;
		a[u] = l;
	}
	return { mode: n.mode, tokens: a };
}
function qy(e) {
	const n = document.documentElement;
	for (const [a, u] of Object.entries(e.tokens)) n.style.setProperty(a, u);
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
function Jx() {
	const e = window.location.hash.slice(1);
	if (!e) throw new Error("Missing host bridge fragment — this plugin frame must be embedded by the Bonobo host app");
	const n = new URLSearchParams(e),
		a = n.getAll("parentOrigin"),
		u = n.getAll("nonce");
	if (n.size !== 2 || a.length !== 1 || u.length !== 1) throw new Error("Invalid host bridge fragment");
	const l = a[0],
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
	let a = "",
		u = "",
		l = 0,
		o = "",
		f = 0,
		h = null;
	const m = new Set(),
		v = new Map();
	let y = null;
	async function _() {
		return Date.now() >= l - Dy ? p() : u;
	}
	function p() {
		if (y) return y;
		const M = crypto.randomUUID();
		return (
			(y = new Promise((R, N) => {
				const Z = setTimeout(() => {
					(v.delete(M), N(new Error("Plugin frame token refresh timed out")));
				}, Yx);
				v.set(M, { resolve: R, reject: N, timeout: Z });
				try {
					window.parent.postMessage({ type: "bonobo:token-refresh-request", nonce: n, requestId: M }, e);
				} catch (U) {
					(clearTimeout(Z), v.delete(M), N(U));
				}
			}).finally(() => {
				y = null;
			})),
			y
		);
	}
	const S = () => o !== "" && Date.now() < f - Dy,
		E = (M) => {
			typeof M.jwt == "string" && typeof M.jwtExpiresAt == "number" && Number.isFinite(M.jwtExpiresAt)
				? ((o = M.jwt), (f = M.jwtExpiresAt))
				: ((o = ""), (f = 0));
		};
	async function C(M, R, N) {
		const Z = JSON.stringify(R),
			U = (te) => {
				const ne = new Headers(N?.headers);
				return (
					ne.set("Authorization", `Bearer ${te}`),
					ne.set("Content-Type", "application/json"),
					ne.set("Accept", "application/json"),
					fetch(a + M, { ...N, method: "POST", body: Z, headers: ne, redirect: "error" })
				);
			},
			j = await _();
		let I = await U(j);
		I.status === 401 && (I = await U(u !== j ? u : await p()));
		const L = await I.text();
		let $ = null;
		try {
			$ = JSON.parse(L);
		} catch {}
		return { status: I.status, body: $ };
	}
	async function T(M) {
		const R = new Headers(M);
		return (R.set("Authorization", `Bearer ${await _()}`), R);
	}
	const D = (M) =>
		fetch(a + "/plugins-ui/session-jwt", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token: M }),
		});
	async function A(M) {
		const R = M?.forceRefreshToken === !0;
		for (let N = 0; ; N += 1) {
			if (S() && !R) return o;
			let Z = null;
			try {
				if (o !== "" && (await p(), S())) return o;
				((Z = await D(await _())), Z.status === 401 && (Z = await D(await p())));
			} catch {
				Z = null;
			}
			if (Z?.ok) {
				const U = await Z.json().catch(() => null),
					j = U?._yay?.jwt,
					I = U?._yay?.sessionExpiresAt;
				return typeof j != "string" || typeof I != "number" ? null : ((l = I), (o = j), (f = I), j);
			}
			if (!(Z === null || Z.status === 429 || Z.status >= 500) || N >= 2) return null;
			await new Promise((U) => setTimeout(U, 1e3 * (N + 1)));
		}
	}
	return new Promise((M) => {
		let R = !1,
			N;
		const Z = () => {
				window.parent.postMessage({ type: "bonobo:ready", nonce: n }, e);
			},
			U = () => {
				clearInterval(N);
			},
			j = (I) => {
				if (I.source !== window.parent || I.origin !== e) return;
				const L = I.data;
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
							U(),
							window.removeEventListener("pagehide", U),
							(a = L.apiOrigin),
							(u = L.token),
							(l = L.tokenExpiresAt),
							E(L));
						const $ = new Tb(L.convexUrl, { expectAuth: !0, unsavedChangesWarning: !1, initialAuthTokenReuse: !0 });
						let te = Date.now();
						const ne = setInterval(() => {
							const K = Date.now();
							(K - te >= Kx && $.setAuth(A), (te = K));
						}, Fx);
						($.setAuth(A),
							window.addEventListener(
								"pagehide",
								() => {
									(clearInterval(ne), $.close());
								},
								{ once: !0 },
							),
							(h = jy(L.theme)),
							h && qy(h),
							M({
								context: L.context,
								apiOrigin: a,
								getToken: _,
								refreshToken: p,
								fetchJson: C,
								authorize: T,
								convex: $,
								api: Qx,
								session: { expiresAt: () => l, fetchJwt: A },
								theme: {
									current: () => h,
									subscribe(K) {
										return (
											m.add(K),
											() => {
												m.delete(K);
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
						const $ = v.get(L.requestId);
						$ &&
							(v.delete(L.requestId),
							clearTimeout($.timeout),
							(u = L.token),
							(l = L.tokenExpiresAt),
							E(L),
							$.resolve(L.token));
					} else if (R && L.nonce === n && L.type === "bonobo:theme") {
						const $ = jy(L.theme);
						if ($) {
							((h = $), qy($));
							for (const te of m) te($);
						}
					} else if (
						R &&
						L.nonce === n &&
						L.type === "bonobo:token-error" &&
						typeof L.requestId == "string" &&
						typeof L.message == "string"
					) {
						const $ = v.get(L.requestId);
						$ && (v.delete(L.requestId), clearTimeout($.timeout), $.reject(new Error(L.message)));
					}
				}
			};
		(window.addEventListener("message", j),
			window.addEventListener("pagehide", U, { once: !0 }),
			Z(),
			(N = setInterval(Z, Px)));
	});
}
var eE = Dn((e) => {
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
		function a(k) {
			return k.length === 0 ? null : k[0];
		}
		function u(k) {
			if (k.length === 0) return null;
			var H = k[0],
				B = k.pop();
			if (B !== H) {
				k[0] = B;
				e: for (var ue = 0, fe = k.length, we = fe >>> 1; ue < we; ) {
					var O = 2 * (ue + 1) - 1,
						G = k[O],
						ae = O + 1,
						se = k[ae];
					if (0 > l(G, B))
						ae < fe && 0 > l(se, G) ? ((k[ue] = se), (k[ae] = B), (ue = ae)) : ((k[ue] = G), (k[O] = B), (ue = O));
					else if (ae < fe && 0 > l(se, B)) ((k[ue] = se), (k[ae] = B), (ue = ae));
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
			p = 3,
			S = !1,
			E = !1,
			C = !1,
			T = !1,
			D = typeof setTimeout == "function" ? setTimeout : null,
			A = typeof clearTimeout == "function" ? clearTimeout : null,
			M = typeof setImmediate < "u" ? setImmediate : null;
		function R(k) {
			for (var H = a(v); H !== null; ) {
				if (H.callback === null) u(v);
				else if (H.startTime <= k) (u(v), (H.sortIndex = H.expirationTime), n(m, H));
				else break;
				H = a(v);
			}
		}
		function N(k) {
			if (((C = !1), R(k), !E))
				if (a(m) !== null) ((E = !0), Z || ((Z = !0), te()));
				else {
					var H = a(v);
					H !== null && ie(N, H.startTime - k);
				}
		}
		var Z = !1,
			U = -1,
			j = 5,
			I = -1;
		function L() {
			return T ? !0 : !(e.unstable_now() - I < j);
		}
		function $() {
			if (((T = !1), Z)) {
				var k = e.unstable_now();
				I = k;
				var H = !0;
				try {
					e: {
						((E = !1), C && ((C = !1), A(U), (U = -1)), (S = !0));
						var B = p;
						try {
							t: {
								for (R(k), _ = a(m); _ !== null && !(_.expirationTime > k && L()); ) {
									var ue = _.callback;
									if (typeof ue == "function") {
										((_.callback = null), (p = _.priorityLevel));
										var fe = ue(_.expirationTime <= k);
										if (((k = e.unstable_now()), typeof fe == "function")) {
											((_.callback = fe), R(k), (H = !0));
											break t;
										}
										(_ === a(m) && u(m), R(k));
									} else u(m);
									_ = a(m);
								}
								if (_ !== null) H = !0;
								else {
									var we = a(v);
									(we !== null && ie(N, we.startTime - k), (H = !1));
								}
							}
							break e;
						} finally {
							((_ = null), (p = B), (S = !1));
						}
						H = void 0;
					}
				} finally {
					H ? te() : (Z = !1);
				}
			}
		}
		var te;
		if (typeof M == "function")
			te = function () {
				M($);
			};
		else if (typeof MessageChannel < "u") {
			var ne = new MessageChannel(),
				K = ne.port2;
			((ne.port1.onmessage = $),
				(te = function () {
					K.postMessage(null);
				}));
		} else
			te = function () {
				D($, 0);
			};
		function ie(k, H) {
			U = D(function () {
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
					: (j = 0 < k ? Math.floor(1e3 / k) : 5);
			}),
			(e.unstable_getCurrentPriorityLevel = function () {
				return p;
			}),
			(e.unstable_next = function (k) {
				switch (p) {
					case 1:
					case 2:
					case 3:
						var H = 3;
						break;
					default:
						H = p;
				}
				var B = p;
				p = H;
				try {
					return k();
				} finally {
					p = B;
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
				var B = p;
				p = k;
				try {
					return H();
				} finally {
					p = B;
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
							a(m) === null && k === a(v) && (C ? (A(U), (U = -1)) : (C = !0), ie(N, B - ue)))
						: ((k.sortIndex = fe), n(m, k), E || S || ((E = !0), Z || ((Z = !0), te()))),
					k
				);
			}),
			(e.unstable_shouldYield = L),
			(e.unstable_wrapCallback = function (k) {
				var H = p;
				return function () {
					var B = p;
					p = H;
					try {
						return k.apply(this, arguments);
					} finally {
						p = B;
					}
				};
			}));
	}),
	tE = Dn((e, n) => {
		n.exports = eE();
	}),
	nE = Dn((e) => {
		var n = ro();
		function a(v) {
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
		function f(v, y, _) {
			var p = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
			return { $$typeof: o, key: p == null ? null : "" + p, children: v, containerInfo: y, implementation: _ };
		}
		var h = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		function m(v, y) {
			if (v === "font") return "";
			if (typeof y == "string") return y === "use-credentials" ? y : "";
		}
		((e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l),
			(e.createPortal = function (v, y) {
				var _ = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
				if (!y || (y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)) throw Error(a(299));
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
						p = m(_, y.crossOrigin),
						S = typeof y.integrity == "string" ? y.integrity : void 0,
						E = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
					_ === "style"
						? l.d.S(v, typeof y.precedence == "string" ? y.precedence : void 0, {
								crossOrigin: p,
								integrity: S,
								fetchPriority: E,
							})
						: _ === "script" &&
							l.d.X(v, {
								crossOrigin: p,
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
						p = m(_, y.crossOrigin);
					l.d.L(v, _, {
						crossOrigin: p,
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
	Ob = Dn((e, n) => {
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
		(a(), (n.exports = nE()));
	}),
	iE = Dn((e) => {
		var n = tE(),
			a = ro(),
			u = Ob();
		function l(t) {
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
		function v(t) {
			if (f(t) !== t) throw Error(l(188));
		}
		function y(t) {
			var i = t.alternate;
			if (!i) {
				if (((i = f(t)), i === null)) throw Error(l(188));
				return i !== t ? null : t;
			}
			for (var r = t, s = i; ; ) {
				var c = r.return;
				if (c === null) break;
				var d = c.alternate;
				if (d === null) {
					if (((s = c.return), s !== null)) {
						r = s;
						continue;
					}
					break;
				}
				if (c.child === d.child) {
					for (d = c.child; d; ) {
						if (d === r) return (v(c), t);
						if (d === s) return (v(c), i);
						d = d.sibling;
					}
					throw Error(l(188));
				}
				if (r.return !== s.return) ((r = c), (s = d));
				else {
					for (var g = !1, x = c.child; x; ) {
						if (x === r) {
							((g = !0), (r = c), (s = d));
							break;
						}
						if (x === s) {
							((g = !0), (s = c), (r = d));
							break;
						}
						x = x.sibling;
					}
					if (!g) {
						for (x = d.child; x; ) {
							if (x === r) {
								((g = !0), (r = d), (s = c));
								break;
							}
							if (x === s) {
								((g = !0), (s = d), (r = c));
								break;
							}
							x = x.sibling;
						}
						if (!g) throw Error(l(189));
					}
				}
				if (r.alternate !== s) throw Error(l(190));
			}
			if (r.tag !== 3) throw Error(l(188));
			return r.stateNode.current === r ? t : i;
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
		var p = Object.assign,
			S = Symbol.for("react.element"),
			E = Symbol.for("react.transitional.element"),
			C = Symbol.for("react.portal"),
			T = Symbol.for("react.fragment"),
			D = Symbol.for("react.strict_mode"),
			A = Symbol.for("react.profiler"),
			M = Symbol.for("react.consumer"),
			R = Symbol.for("react.context"),
			N = Symbol.for("react.forward_ref"),
			Z = Symbol.for("react.suspense"),
			U = Symbol.for("react.suspense_list"),
			j = Symbol.for("react.memo"),
			I = Symbol.for("react.lazy"),
			L = Symbol.for("react.activity"),
			$ = Symbol.for("react.memo_cache_sentinel"),
			te = Symbol.iterator;
		function ne(t) {
			return t === null || typeof t != "object"
				? null
				: ((t = (te && t[te]) || t["@@iterator"]), typeof t == "function" ? t : null);
		}
		var K = Symbol.for("react.client.reference");
		function ie(t) {
			if (t == null) return null;
			if (typeof t == "function") return t.$$typeof === K ? null : t.displayName || t.name || null;
			if (typeof t == "string") return t;
			switch (t) {
				case T:
					return "Fragment";
				case A:
					return "Profiler";
				case D:
					return "StrictMode";
				case Z:
					return "Suspense";
				case U:
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
					case M:
						return (t._context.displayName || "Context") + ".Consumer";
					case N:
						var i = t.render;
						return (
							(t = t.displayName),
							t || ((t = i.displayName || i.name || ""), (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
							t
						);
					case j:
						return ((i = t.displayName || null), i !== null ? i : ie(t.type) || "Memo");
					case I:
						((i = t._payload), (t = t._init));
						try {
							return ie(t(i));
						} catch {}
				}
			return null;
		}
		var k = Array.isArray,
			H = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			B = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			ue = { pending: !1, data: null, method: null, action: null },
			fe = [],
			we = -1;
		function O(t) {
			return { current: t };
		}
		function G(t) {
			0 > we || ((t.current = fe[we]), (fe[we] = null), we--);
		}
		function ae(t, i) {
			(we++, (fe[we] = t.current), (t.current = i));
		}
		var se = O(null),
			ve = O(null),
			ge = O(null),
			pe = O(null);
		function Ze(t, i) {
			switch ((ae(ge, i), ae(ve, t), ae(se, null), i.nodeType)) {
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
			(G(se), ae(se, t));
		}
		function Oe() {
			(G(se), G(ve), G(ge));
		}
		function st(t) {
			t.memoizedState !== null && ae(pe, t);
			var i = se.current,
				r = Zg(i, t.type);
			i !== r && (ae(ve, t), ae(se, r));
		}
		function Dt(t) {
			(ve.current === t && (G(se), G(ve)), pe.current === t && (G(pe), (Uu._currentValue = ue)));
		}
		var It, dn;
		function jt(t) {
			if (It === void 0)
				try {
					throw Error();
				} catch (r) {
					var i = r.stack.trim().match(/\n( *(at )?)/);
					((It = (i && i[1]) || ""),
						(dn =
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
				It +
				t +
				dn
			);
		}
		var de = !1;
		function Te(t, i) {
			if (!t || de) return "";
			de = !0;
			var r = Error.prepareStackTrace;
			Error.prepareStackTrace = void 0;
			try {
				var s = {
					DetermineComponentFrameRoot: function () {
						try {
							if (i) {
								var W = function () {
									throw Error();
								};
								if (
									(Object.defineProperty(W.prototype, "props", {
										set: function () {
											throw Error();
										},
									}),
									typeof Reflect == "object" && Reflect.construct)
								) {
									try {
										Reflect.construct(W, []);
									} catch (F) {
										var Y = F;
									}
									Reflect.construct(t, [], W);
								} else {
									try {
										W.call();
									} catch (F) {
										Y = F;
									}
									t.call(W.prototype);
								}
							} else {
								try {
									throw Error();
								} catch (F) {
									Y = F;
								}
								(W = t()) && typeof W.catch == "function" && W.catch(function () {});
							}
						} catch (F) {
							if (F && Y && typeof F.stack == "string") return [F.stack, Y.stack];
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
					var z = g.split(`
`),
						P = x.split(`
`);
					for (c = s = 0; s < z.length && !z[s].includes("DetermineComponentFrameRoot"); ) s++;
					for (; c < P.length && !P[c].includes("DetermineComponentFrameRoot"); ) c++;
					if (s === z.length || c === P.length)
						for (s = z.length - 1, c = P.length - 1; 1 <= s && 0 <= c && z[s] !== P[c]; ) c--;
					for (; 1 <= s && 0 <= c; s--, c--)
						if (z[s] !== P[c]) {
							if (s !== 1 || c !== 1)
								do
									if ((s--, c--, 0 > c || z[s] !== P[c])) {
										var X =
											`
` + z[s].replace(" at new ", " at ");
										return (
											t.displayName && X.includes("<anonymous>") && (X = X.replace("<anonymous>", t.displayName)),
											X
										);
									}
								while (1 <= s && 0 <= c);
							break;
						}
				}
			} finally {
				((de = !1), (Error.prepareStackTrace = r));
			}
			return (r = t ? t.displayName || t.name : "") ? jt(r) : "";
		}
		function We(t, i) {
			switch (t.tag) {
				case 26:
				case 27:
				case 5:
					return jt(t.type);
				case 16:
					return jt("Lazy");
				case 13:
					return t.child !== i && i !== null ? jt("Suspense Fallback") : jt("Suspense");
				case 19:
					return jt("SuspenseList");
				case 0:
				case 15:
					return Te(t.type, !1);
				case 11:
					return Te(t.type.render, !1);
				case 1:
					return Te(t.type, !0);
				case 31:
					return jt("Activity");
				default:
					return "";
			}
		}
		function Ie(t) {
			try {
				var i = "",
					r = null;
				do ((i += We(t, r)), (r = t), (t = t.return));
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
		var Ot = Object.prototype.hasOwnProperty,
			Nt = n.unstable_scheduleCallback,
			re = n.unstable_cancelCallback,
			Re = n.unstable_shouldYield,
			ft = n.unstable_requestPaint,
			je = n.unstable_now,
			yt = n.unstable_getCurrentPriorityLevel,
			Mt = n.unstable_ImmediatePriority,
			bt = n.unstable_UserBlockingPriority,
			Lt = n.unstable_NormalPriority,
			ce = n.unstable_LowPriority,
			Ee = n.unstable_IdlePriority,
			zt = n.log,
			qn = n.unstable_setDisableYieldValue,
			ei = null,
			hn = null;
		function zi(t) {
			if ((typeof zt == "function" && qn(t), hn && typeof hn.setStrictMode == "function"))
				try {
					hn.setStrictMode(ei, t);
				} catch {}
		}
		var mn = Math.clz32 ? Math.clz32 : VS,
			$S = Math.log,
			BS = Math.LN2;
		function VS(t) {
			return ((t >>>= 0), t === 0 ? 32 : (31 - (($S(t) / BS) | 0)) | 0);
		}
		var ps = 256,
			Ss = 262144,
			ws = 4194304;
		function da(t) {
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
		function _s(t, i, r) {
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
						s !== 0 ? (c = da(s)) : ((g &= x), g !== 0 ? (c = da(g)) : r || ((r = x & ~t), r !== 0 && (c = da(r)))))
					: ((x = s & ~d), x !== 0 ? (c = da(x)) : g !== 0 ? (c = da(g)) : r || ((r = s & ~t), r !== 0 && (c = da(r)))),
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
		function Gr(t, i) {
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
			var t = ws;
			return ((ws <<= 1), (ws & 62914560) === 0 && (ws = 4194304), t);
		}
		function Do(t) {
			for (var i = [], r = 0; 31 > r; r++) i.push(t);
			return i;
		}
		function xs(t, i) {
			((t.pendingLanes |= i), i !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
		}
		function ZS(t, i, r, s, c, d) {
			var g = t.pendingLanes;
			((t.pendingLanes = r),
				(t.suspendedLanes = 0),
				(t.pingedLanes = 0),
				(t.warmLanes = 0),
				(t.expiredLanes &= r),
				(t.entangledLanes &= r),
				(t.errorRecoveryDisabledLanes &= r),
				(t.shellSuspendCounter = 0));
			var x = t.entanglements,
				z = t.expirationTimes,
				P = t.hiddenUpdates;
			for (r = g & ~r; 0 < r; ) {
				var X = 31 - mn(r),
					W = 1 << X;
				((x[X] = 0), (z[X] = -1));
				var Y = P[X];
				if (Y !== null)
					for (P[X] = null, X = 0; X < Y.length; X++) {
						var F = Y[X];
						F !== null && (F.lane &= -536870913);
					}
				r &= ~W;
			}
			(s !== 0 && Th(t, s, 0), d !== 0 && c === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(g & ~i)));
		}
		function Th(t, i, r) {
			((t.pendingLanes |= i), (t.suspendedLanes &= ~i));
			var s = 31 - mn(i);
			((t.entangledLanes |= i), (t.entanglements[s] = t.entanglements[s] | 1073741824 | (r & 261930)));
		}
		function Ah(t, i) {
			var r = (t.entangledLanes |= i);
			for (t = t.entanglements; r; ) {
				var s = 31 - mn(r),
					c = 1 << s;
				((c & i) | (t[s] & i) && (t[s] |= i), (r &= ~c));
			}
		}
		function Rh(t, i) {
			var r = i & -i;
			return ((r = (r & 42) !== 0 ? 1 : Oh(r)), (r & (t.suspendedLanes | i)) !== 0 ? 0 : r);
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
			var r = B.p;
			try {
				return ((B.p = t), i());
			} finally {
				B.p = r;
			}
		}
		var ki = Math.random().toString(36).slice(2),
			$t = "__reactFiber$" + ki,
			Wt = "__reactProps$" + ki,
			Xr = "__reactContainer$" + ki,
			qo = "__reactEvents$" + ki,
			QS = "__reactListeners$" + ki,
			PS = "__reactHandles$" + ki,
			zh = "__reactResources$" + ki,
			Jr = "__reactMarker$" + ki;
		function Uo(t) {
			(delete t[$t], delete t[Wt], delete t[qo], delete t[QS], delete t[PS]);
		}
		function Pa(t) {
			var i = t[$t];
			if (i) return i;
			for (var r = t.parentNode; r; ) {
				if ((i = r[Xr] || r[$t])) {
					if (((r = i.alternate), i.child !== null || (r !== null && r.child !== null)))
						for (t = Xg(t); t !== null; ) {
							if ((r = t[$t])) return r;
							t = Xg(t);
						}
					return i;
				}
				((t = r), (r = t.parentNode));
			}
			return null;
		}
		function Ya(t) {
			if ((t = t[$t] || t[Xr])) {
				var i = t.tag;
				if (i === 5 || i === 6 || i === 13 || i === 31 || i === 26 || i === 27 || i === 3) return t;
			}
			return null;
		}
		function Wr(t) {
			var i = t.tag;
			if (i === 5 || i === 26 || i === 27 || i === 6) return t.stateNode;
			throw Error(l(33));
		}
		function Fa(t) {
			var i = t[zh];
			return (i || (i = t[zh] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), i);
		}
		function qt(t) {
			t[Jr] = !0;
		}
		var kh = new Set(),
			Dh = {};
		function ha(t, i) {
			(Ka(t, i), Ka(t + "Capture", i));
		}
		function Ka(t, i) {
			for (Dh[t] = i, t = 0; t < i.length; t++) kh.add(i[t]);
		}
		var YS = RegExp(
				"^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
			),
			jh = {},
			qh = {};
		function FS(t) {
			return Ot.call(qh, t) ? !0 : Ot.call(jh, t) ? !1 : YS.test(t) ? (qh[t] = !0) : ((jh[t] = !0), !1);
		}
		function Es(t, i, r) {
			if (FS(i))
				if (r === null) t.removeAttribute(i);
				else {
					switch (typeof r) {
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
					t.setAttribute(i, "" + r);
				}
		}
		function Cs(t, i, r) {
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
		function ti(t, i, r, s) {
			if (s === null) t.removeAttribute(r);
			else {
				switch (typeof s) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						t.removeAttribute(r);
						return;
				}
				t.setAttributeNS(i, r, "" + s);
			}
		}
		function _n(t) {
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
		function Uh(t) {
			var i = t.type;
			return (t = t.nodeName) && t.toLowerCase() === "input" && (i === "checkbox" || i === "radio");
		}
		function KS(t, i, r) {
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
							((r = "" + g), d.call(this, g));
						},
					}),
					Object.defineProperty(t, i, { enumerable: s.enumerable }),
					{
						getValue: function () {
							return r;
						},
						setValue: function (g) {
							r = "" + g;
						},
						stopTracking: function () {
							((t._valueTracker = null), delete t[i]);
						},
					}
				);
			}
		}
		function Io(t) {
			if (!t._valueTracker) {
				var i = Uh(t) ? "checked" : "value";
				t._valueTracker = KS(t, i, "" + t[i]);
			}
		}
		function Ih(t) {
			if (!t) return !1;
			var i = t._valueTracker;
			if (!i) return !0;
			var r = i.getValue(),
				s = "";
			return (t && (s = Uh(t) ? (t.checked ? "true" : "false") : t.value), (t = s), t !== r ? (i.setValue(t), !0) : !1);
		}
		function Ts(t) {
			if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")) return null;
			try {
				return t.activeElement || t.body;
			} catch {
				return t.body;
			}
		}
		var GS = /[\n"\\]/g;
		function xn(t) {
			return t.replace(GS, function (i) {
				return "\\" + i.charCodeAt(0).toString(16) + " ";
			});
		}
		function Lo(t, i, r, s, c, d, g, x) {
			((t.name = ""),
				g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean"
					? (t.type = g)
					: t.removeAttribute("type"),
				i != null
					? g === "number"
						? ((i === 0 && t.value === "") || t.value != i) && (t.value = "" + _n(i))
						: t.value !== "" + _n(i) && (t.value = "" + _n(i))
					: (g !== "submit" && g !== "reset") || t.removeAttribute("value"),
				i != null ? $o(t, g, _n(i)) : r != null ? $o(t, g, _n(r)) : s != null && t.removeAttribute("value"),
				c == null && d != null && (t.defaultChecked = !!d),
				c != null && (t.checked = c && typeof c != "function" && typeof c != "symbol"),
				x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean"
					? (t.name = "" + _n(x))
					: t.removeAttribute("name"));
		}
		function Lh(t, i, r, s, c, d, g, x) {
			if (
				(d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (t.type = d),
				i != null || r != null)
			) {
				if (!((d !== "submit" && d !== "reset") || i != null)) {
					Io(t);
					return;
				}
				((r = r != null ? "" + _n(r) : ""),
					(i = i != null ? "" + _n(i) : r),
					x || i === t.value || (t.value = i),
					(t.defaultValue = i));
			}
			((s = s ?? c),
				(s = typeof s != "function" && typeof s != "symbol" && !!s),
				(t.checked = x ? t.checked : !!s),
				(t.defaultChecked = !!s),
				g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" && (t.name = g),
				Io(t));
		}
		function $o(t, i, r) {
			(i === "number" && Ts(t.ownerDocument) === t) || t.defaultValue === "" + r || (t.defaultValue = "" + r);
		}
		function Ga(t, i, r, s) {
			if (((t = t.options), i)) {
				i = {};
				for (var c = 0; c < r.length; c++) i["$" + r[c]] = !0;
				for (r = 0; r < t.length; r++)
					((c = i.hasOwnProperty("$" + t[r].value)),
						t[r].selected !== c && (t[r].selected = c),
						c && s && (t[r].defaultSelected = !0));
			} else {
				for (r = "" + _n(r), i = null, c = 0; c < t.length; c++) {
					if (t[c].value === r) {
						((t[c].selected = !0), s && (t[c].defaultSelected = !0));
						return;
					}
					i !== null || t[c].disabled || (i = t[c]);
				}
				i !== null && (i.selected = !0);
			}
		}
		function $h(t, i, r) {
			if (i != null && ((i = "" + _n(i)), i !== t.value && (t.value = i), r == null)) {
				t.defaultValue !== i && (t.defaultValue = i);
				return;
			}
			t.defaultValue = r != null ? "" + _n(r) : "";
		}
		function Bh(t, i, r, s) {
			if (i == null) {
				if (s != null) {
					if (r != null) throw Error(l(92));
					if (k(s)) {
						if (1 < s.length) throw Error(l(93));
						s = s[0];
					}
					r = s;
				}
				((r ??= ""), (i = r));
			}
			((r = _n(i)),
				(t.defaultValue = r),
				(s = t.textContent),
				s === r && s !== "" && s !== null && (t.value = s),
				Io(t));
		}
		function Xa(t, i) {
			if (i) {
				var r = t.firstChild;
				if (r && r === t.lastChild && r.nodeType === 3) {
					r.nodeValue = i;
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
		function Vh(t, i, r) {
			var s = i.indexOf("--") === 0;
			r == null || typeof r == "boolean" || r === ""
				? s
					? t.setProperty(i, "")
					: i === "float"
						? (t.cssFloat = "")
						: (t[i] = "")
				: s
					? t.setProperty(i, r)
					: typeof r != "number" || r === 0 || XS.has(i)
						? i === "float"
							? (t.cssFloat = r)
							: (t[i] = ("" + r).trim())
						: (t[i] = r + "px");
		}
		function Hh(t, i, r) {
			if (i != null && typeof i != "object") throw Error(l(62));
			if (((t = t.style), r != null)) {
				for (var s in r)
					!r.hasOwnProperty(s) ||
						(i != null && i.hasOwnProperty(s)) ||
						(s.indexOf("--") === 0 ? t.setProperty(s, "") : s === "float" ? (t.cssFloat = "") : (t[s] = ""));
				for (var c in i) ((s = i[c]), i.hasOwnProperty(c) && r[c] !== s && Vh(t, c, s));
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
		function As(t) {
			return WS.test("" + t)
				? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
				: t;
		}
		function ni() {}
		var Vo = null;
		function Ho(t) {
			return (
				(t = t.target || t.srcElement || window),
				t.correspondingUseElement && (t = t.correspondingUseElement),
				t.nodeType === 3 ? t.parentNode : t
			);
		}
		var Ja = null,
			Wa = null;
		function Zh(t) {
			var i = Ya(t);
			if (i && (t = i.stateNode)) {
				var r = t[Wt] || null;
				e: switch (((t = i.stateNode), i.type)) {
					case "input":
						if (
							(Lo(t, r.value, r.defaultValue, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name),
							(i = r.name),
							r.type === "radio" && i != null)
						) {
							for (r = t; r.parentNode; ) r = r.parentNode;
							for (r = r.querySelectorAll('input[name="' + xn("" + i) + '"][type="radio"]'), i = 0; i < r.length; i++) {
								var s = r[i];
								if (s !== t && s.form === t.form) {
									var c = s[Wt] || null;
									if (!c) throw Error(l(90));
									Lo(s, c.value, c.defaultValue, c.defaultValue, c.checked, c.defaultChecked, c.type, c.name);
								}
							}
							for (i = 0; i < r.length; i++) ((s = r[i]), s.form === t.form && Ih(s));
						}
						break e;
					case "textarea":
						$h(t, r.value, r.defaultValue);
						break e;
					case "select":
						((i = r.value), i != null && Ga(t, !!r.multiple, i, !1));
				}
			}
		}
		var Zo = !1;
		function Qh(t, i, r) {
			if (Zo) return t(i, r);
			Zo = !0;
			try {
				return t(i);
			} finally {
				if (((Zo = !1), (Ja !== null || Wa !== null) && (ml(), Ja && ((i = Ja), (t = Wa), (Wa = Ja = null), Zh(i), t))))
					for (i = 0; i < t.length; i++) Zh(t[i]);
			}
		}
		function eu(t, i) {
			var r = t.stateNode;
			if (r === null) return null;
			var s = r[Wt] || null;
			if (s === null) return null;
			r = s[i];
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
			if (r && typeof r != "function") throw Error(l(231, i, typeof r));
			return r;
		}
		var ii = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
			Qo = !1;
		if (ii)
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
		var Di = null,
			Po = null,
			Rs = null;
		function Ph() {
			if (Rs) return Rs;
			var t,
				i = Po,
				r = i.length,
				s,
				c = "value" in Di ? Di.value : Di.textContent,
				d = c.length;
			for (t = 0; t < r && i[t] === c[t]; t++);
			var g = r - t;
			for (s = 1; s <= g && i[r - s] === c[d - s]; s++);
			return (Rs = c.slice(t, 1 < s ? 1 - s : void 0));
		}
		function Os(t) {
			var i = t.keyCode;
			return (
				"charCode" in t ? ((t = t.charCode), t === 0 && i === 13 && (t = 13)) : (t = i),
				t === 10 && (t = 13),
				32 <= t || t === 13 ? t : 0
			);
		}
		function Ns() {
			return !0;
		}
		function Yh() {
			return !1;
		}
		function en(t) {
			function i(r, s, c, d, g) {
				((this._reactName = r),
					(this._targetInst = c),
					(this.type = s),
					(this.nativeEvent = d),
					(this.target = g),
					(this.currentTarget = null));
				for (var x in t) t.hasOwnProperty(x) && ((r = t[x]), (this[x] = r ? r(d) : d[x]));
				return (
					(this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1)
						? Ns
						: Yh),
					(this.isPropagationStopped = Yh),
					this
				);
			}
			return (
				p(i.prototype, {
					preventDefault: function () {
						this.defaultPrevented = !0;
						var r = this.nativeEvent;
						r &&
							(r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1),
							(this.isDefaultPrevented = Ns));
					},
					stopPropagation: function () {
						var r = this.nativeEvent;
						r &&
							(r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0),
							(this.isPropagationStopped = Ns));
					},
					persist: function () {},
					isPersistent: Ns,
				}),
				i
			);
		}
		var ma = {
				eventPhase: 0,
				bubbles: 0,
				cancelable: 0,
				timeStamp: function (t) {
					return t.timeStamp || Date.now();
				},
				defaultPrevented: 0,
				isTrusted: 0,
			},
			Ms = en(ma),
			nu = p({}, ma, { view: 0, detail: 0 }),
			ew = en(nu),
			Yo,
			Fo,
			iu,
			zs = p({}, nu, {
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
			Fh = en(zs),
			tw = en(p({}, zs, { dataTransfer: 0 })),
			Ko = en(p({}, nu, { relatedTarget: 0 })),
			nw = en(p({}, ma, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
			iw = en(
				p({}, ma, {
					clipboardData: function (t) {
						return "clipboardData" in t ? t.clipboardData : window.clipboardData;
					},
				}),
			),
			Kh = en(p({}, ma, { data: 0 })),
			aw = {
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
			rw = {
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
		var lw = en(
				p({}, nu, {
					key: function (t) {
						if (t.key) {
							var i = aw[t.key] || t.key;
							if (i !== "Unidentified") return i;
						}
						return t.type === "keypress"
							? ((t = Os(t)), t === 13 ? "Enter" : String.fromCharCode(t))
							: t.type === "keydown" || t.type === "keyup"
								? rw[t.keyCode] || "Unidentified"
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
						return t.type === "keypress" ? Os(t) : 0;
					},
					keyCode: function (t) {
						return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
					which: function (t) {
						return t.type === "keypress" ? Os(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
					},
				}),
			),
			Gh = en(
				p({}, zs, {
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
			ow = en(
				p({}, nu, {
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
			cw = en(p({}, ma, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
			fw = en(
				p({}, zs, {
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
			dw = en(p({}, ma, { newState: 0, oldState: 0 })),
			hw = [9, 13, 27, 32],
			Xo = ii && "CompositionEvent" in window,
			au = null;
		ii && "documentMode" in document && (au = document.documentMode);
		var mw = ii && "TextEvent" in window && !au,
			Xh = ii && (!Xo || (au && 8 < au && 11 >= au)),
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
		var er = !1;
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
			if (er)
				return t === "compositionend" || (!Xo && em(t, i)) ? ((t = Ph()), (Rs = Po = Di = null), (er = !1), t) : null;
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
		function im(t, i, r, s) {
			(Ja ? (Wa ? Wa.push(s) : (Wa = [s])) : (Ja = s),
				(i = wl(i, "onChange")),
				0 < i.length && ((r = new Ms("onChange", "change", null, r, s)), t.push({ event: r, listeners: i })));
		}
		var ru = null,
			uu = null;
		function bw(t) {
			qg(t, 0);
		}
		function ks(t) {
			if (Ih(Wr(t))) return t;
		}
		function am(t, i) {
			if (t === "change") return i;
		}
		var rm = !1;
		if (ii) {
			var Jo;
			if (ii) {
				var Wo = "oninput" in document;
				if (!Wo) {
					var um = document.createElement("div");
					(um.setAttribute("oninput", "return;"), (Wo = typeof um.oninput == "function"));
				}
				Jo = Wo;
			} else Jo = !1;
			rm = Jo && (!document.documentMode || 9 < document.documentMode);
		}
		function sm() {
			ru && (ru.detachEvent("onpropertychange", lm), (uu = ru = null));
		}
		function lm(t) {
			if (t.propertyName === "value" && ks(uu)) {
				var i = [];
				(im(i, uu, t, Ho(t)), Qh(bw, i));
			}
		}
		function pw(t, i, r) {
			t === "focusin" ? (sm(), (ru = i), (uu = r), ru.attachEvent("onpropertychange", lm)) : t === "focusout" && sm();
		}
		function Sw(t) {
			if (t === "selectionchange" || t === "keyup" || t === "keydown") return ks(uu);
		}
		function ww(t, i) {
			if (t === "click") return ks(i);
		}
		function _w(t, i) {
			if (t === "input" || t === "change") return ks(i);
		}
		function xw(t, i) {
			return (t === i && (t !== 0 || 1 / t === 1 / i)) || (t !== t && i !== i);
		}
		var vn = typeof Object.is == "function" ? Object.is : xw;
		function su(t, i) {
			if (vn(t, i)) return !0;
			if (typeof t != "object" || t === null || typeof i != "object" || i === null) return !1;
			var r = Object.keys(t),
				s = Object.keys(i);
			if (r.length !== s.length) return !1;
			for (s = 0; s < r.length; s++) {
				var c = r[s];
				if (!Ot.call(i, c) || !vn(t[c], i[c])) return !1;
			}
			return !0;
		}
		function om(t) {
			for (; t && t.firstChild; ) t = t.firstChild;
			return t;
		}
		function cm(t, i) {
			var r = om(t);
			t = 0;
			for (var s; r; ) {
				if (r.nodeType === 3) {
					if (((s = t + r.textContent.length), t <= i && s >= i)) return { node: r, offset: i - t };
					t = s;
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
				r = om(r);
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
			for (var i = Ts(t.document); i instanceof t.HTMLIFrameElement; ) {
				try {
					var r = typeof i.contentWindow.location.href == "string";
				} catch {
					r = !1;
				}
				if (r) t = i.contentWindow;
				else break;
				i = Ts(t.document);
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
		var Ew = ii && "documentMode" in document && 11 >= document.documentMode,
			tr = null,
			tc = null,
			lu = null,
			nc = !1;
		function hm(t, i, r) {
			var s = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
			nc ||
				tr == null ||
				tr !== Ts(s) ||
				((s = tr),
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
					(s = wl(tc, "onSelect")),
					0 < s.length &&
						((i = new Ms("onSelect", "select", null, i, r)), t.push({ event: i, listeners: s }), (i.target = tr))));
		}
		function va(t, i) {
			var r = {};
			return ((r[t.toLowerCase()] = i.toLowerCase()), (r["Webkit" + t] = "webkit" + i), (r["Moz" + t] = "moz" + i), r);
		}
		var nr = {
				animationend: va("Animation", "AnimationEnd"),
				animationiteration: va("Animation", "AnimationIteration"),
				animationstart: va("Animation", "AnimationStart"),
				transitionrun: va("Transition", "TransitionRun"),
				transitionstart: va("Transition", "TransitionStart"),
				transitioncancel: va("Transition", "TransitionCancel"),
				transitionend: va("Transition", "TransitionEnd"),
			},
			ic = {},
			mm = {};
		ii &&
			((mm = document.createElement("div").style),
			"AnimationEvent" in window ||
				(delete nr.animationend.animation, delete nr.animationiteration.animation, delete nr.animationstart.animation),
			"TransitionEvent" in window || delete nr.transitionend.transition);
		function ga(t) {
			if (ic[t]) return ic[t];
			if (!nr[t]) return t;
			var i = nr[t],
				r;
			for (r in i) if (i.hasOwnProperty(r) && r in mm) return (ic[t] = i[r]);
			return t;
		}
		var vm = ga("animationend"),
			gm = ga("animationiteration"),
			ym = ga("animationstart"),
			Cw = ga("transitionrun"),
			Tw = ga("transitionstart"),
			Aw = ga("transitioncancel"),
			bm = ga("transitionend"),
			pm = new Map(),
			ac =
				"abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
					" ",
				);
		ac.push("scrollEnd");
		function Un(t, i) {
			(pm.set(t, i), ha(i, [t]));
		}
		var Ds =
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
			En = [],
			ir = 0,
			rc = 0;
		function js() {
			for (var t = ir, i = (rc = ir = 0); i < t; ) {
				var r = En[i];
				En[i++] = null;
				var s = En[i];
				En[i++] = null;
				var c = En[i];
				En[i++] = null;
				var d = En[i];
				if (((En[i++] = null), s !== null && c !== null)) {
					var g = s.pending;
					(g === null ? (c.next = c) : ((c.next = g.next), (g.next = c)), (s.pending = c));
				}
				d !== 0 && Sm(r, c, d);
			}
		}
		function qs(t, i, r, s) {
			((En[ir++] = t),
				(En[ir++] = i),
				(En[ir++] = r),
				(En[ir++] = s),
				(rc |= s),
				(t.lanes |= s),
				(t = t.alternate),
				t !== null && (t.lanes |= s));
		}
		function uc(t, i, r, s) {
			return (qs(t, i, r, s), Us(t));
		}
		function ya(t, i) {
			return (qs(t, null, null, i), Us(t));
		}
		function Sm(t, i, r) {
			t.lanes |= r;
			var s = t.alternate;
			s !== null && (s.lanes |= r);
			for (var c = !1, d = t.return; d !== null; )
				((d.childLanes |= r),
					(s = d.alternate),
					s !== null && (s.childLanes |= r),
					d.tag === 22 && ((t = d.stateNode), t === null || t._visibility & 1 || (c = !0)),
					(t = d),
					(d = d.return));
			return t.tag === 3
				? ((d = t.stateNode),
					c &&
						i !== null &&
						((c = 31 - mn(r)),
						(t = d.hiddenUpdates),
						(s = t[c]),
						s === null ? (t[c] = [i]) : s.push(i),
						(i.lane = r | 536870912)),
					d)
				: null;
		}
		function Us(t) {
			if (50 < Nu) throw ((Nu = 0), (gf = null), Error(l(185)));
			for (var i = t.return; i !== null; ) ((t = i), (i = t.return));
			return t.tag === 3 ? t.stateNode : null;
		}
		var ar = {};
		function Rw(t, i, r, s) {
			((this.tag = t),
				(this.key = r),
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
		function gn(t, i, r, s) {
			return new Rw(t, i, r, s);
		}
		function sc(t) {
			return ((t = t.prototype), !(!t || !t.isReactComponent));
		}
		function ai(t, i) {
			var r = t.alternate;
			return (
				r === null
					? ((r = gn(t.tag, i, t.key, t.mode)),
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
		function wm(t, i) {
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
		function Is(t, i, r, s, c, d) {
			var g = 0;
			if (((s = t), typeof t == "function")) sc(t) && (g = 1);
			else if (typeof t == "string")
				g = D_(t, r, se.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
			else
				e: switch (t) {
					case L:
						return ((t = gn(31, r, i, c)), (t.elementType = L), (t.lanes = d), t);
					case T:
						return ba(r.children, c, d, i);
					case D:
						((g = 8), (c |= 24));
						break;
					case A:
						return ((t = gn(12, r, i, c | 2)), (t.elementType = A), (t.lanes = d), t);
					case Z:
						return ((t = gn(13, r, i, c)), (t.elementType = Z), (t.lanes = d), t);
					case U:
						return ((t = gn(19, r, i, c)), (t.elementType = U), (t.lanes = d), t);
					default:
						if (typeof t == "object" && t !== null)
							switch (t.$$typeof) {
								case R:
									g = 10;
									break e;
								case M:
									g = 9;
									break e;
								case N:
									g = 11;
									break e;
								case j:
									g = 14;
									break e;
								case I:
									((g = 16), (s = null));
									break e;
							}
						((g = 29), (r = Error(l(130, t === null ? "null" : typeof t, ""))), (s = null));
				}
			return ((i = gn(g, r, i, c)), (i.elementType = t), (i.type = s), (i.lanes = d), i);
		}
		function ba(t, i, r, s) {
			return ((t = gn(7, t, s, i)), (t.lanes = r), t);
		}
		function lc(t, i, r) {
			return ((t = gn(6, t, null, i)), (t.lanes = r), t);
		}
		function _m(t) {
			var i = gn(18, null, null, 0);
			return ((i.stateNode = t), i);
		}
		function oc(t, i, r) {
			return (
				(i = gn(4, t.children !== null ? t.children : [], t.key, i)),
				(i.lanes = r),
				(i.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }),
				i
			);
		}
		var xm = new WeakMap();
		function Cn(t, i) {
			if (typeof t == "object" && t !== null) {
				var r = xm.get(t);
				return r !== void 0 ? r : ((i = { value: t, source: i, stack: Ie(i) }), xm.set(t, i), i);
			}
			return { value: t, source: i, stack: Ie(i) };
		}
		var rr = [],
			ur = 0,
			Ls = null,
			ou = 0,
			Tn = [],
			An = 0,
			ji = null,
			Zn = 1,
			Qn = "";
		function ri(t, i) {
			((rr[ur++] = ou), (rr[ur++] = Ls), (Ls = t), (ou = i));
		}
		function Em(t, i, r) {
			((Tn[An++] = Zn), (Tn[An++] = Qn), (Tn[An++] = ji), (ji = t));
			var s = Zn;
			t = Qn;
			var c = 32 - mn(s) - 1;
			((s &= ~(1 << c)), (r += 1));
			var d = 32 - mn(i) + c;
			if (30 < d) {
				var g = c - (c % 5);
				((d = (s & ((1 << g) - 1)).toString(32)),
					(s >>= g),
					(c -= g),
					(Zn = (1 << (32 - mn(i) + c)) | (r << c) | s),
					(Qn = d + t));
			} else ((Zn = (1 << d) | (r << c) | s), (Qn = t));
		}
		function cc(t) {
			t.return !== null && (ri(t, 1), Em(t, 1, 0));
		}
		function fc(t) {
			for (; t === Ls; ) ((Ls = rr[--ur]), (rr[ur] = null), (ou = rr[--ur]), (rr[ur] = null));
			for (; t === ji; )
				((ji = Tn[--An]), (Tn[An] = null), (Qn = Tn[--An]), (Tn[An] = null), (Zn = Tn[--An]), (Tn[An] = null));
		}
		function Cm(t, i) {
			((Tn[An++] = Zn), (Tn[An++] = Qn), (Tn[An++] = ji), (Zn = i.id), (Qn = i.overflow), (ji = t));
		}
		var Bt = null,
			et = null,
			qe = !1,
			qi = null,
			Rn = !1,
			dc = Error(l(519));
		function Ui(t) {
			throw (
				cu(Cn(Error(l(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), t)),
				dc
			);
		}
		function Tm(t) {
			var i = t.stateNode,
				r = t.type,
				s = t.memoizedProps;
			switch (((i[$t] = t), (i[Wt] = s), r)) {
				case "dialog":
					(Me("cancel", i), Me("close", i));
					break;
				case "iframe":
				case "object":
				case "embed":
					Me("load", i);
					break;
				case "video":
				case "audio":
					for (r = 0; r < zu.length; r++) Me(zu[r], i);
					break;
				case "source":
					Me("error", i);
					break;
				case "img":
				case "image":
				case "link":
					(Me("error", i), Me("load", i));
					break;
				case "details":
					Me("toggle", i);
					break;
				case "input":
					(Me("invalid", i), Lh(i, s.value, s.defaultValue, s.checked, s.defaultChecked, s.type, s.name, !0));
					break;
				case "select":
					Me("invalid", i);
					break;
				case "textarea":
					(Me("invalid", i), Bh(i, s.value, s.defaultValue, s.children));
			}
			((r = s.children),
				(typeof r != "string" && typeof r != "number" && typeof r != "bigint") ||
				i.textContent === "" + r ||
				s.suppressHydrationWarning === !0 ||
				Bg(i.textContent, r)
					? (s.popover != null && (Me("beforetoggle", i), Me("toggle", i)),
						s.onScroll != null && Me("scroll", i),
						s.onScrollEnd != null && Me("scrollend", i),
						s.onClick != null && (i.onclick = ni),
						(i = !0))
					: (i = !1),
				i || Ui(t, !0));
		}
		function Am(t) {
			for (Bt = t.return; Bt; )
				switch (Bt.tag) {
					case 5:
					case 31:
					case 13:
						Rn = !1;
						return;
					case 27:
					case 3:
						Rn = !0;
						return;
					default:
						Bt = Bt.return;
				}
		}
		function sr(t) {
			if (t !== Bt) return !1;
			if (!qe) return (Am(t), (qe = !0), !1);
			var i = t.tag,
				r;
			if (
				((r = i !== 3 && i !== 27) &&
					((r = i === 5) && ((r = t.type), (r = !(r !== "form" && r !== "button") || Nf(t.type, t.memoizedProps))),
					(r = !r)),
				r && et && Ui(t),
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
					? ((i = et), Ki(t.type) ? ((t = jf), (jf = null), (et = t)) : (et = i))
					: (et = Bt ? Mn(t.stateNode.nextSibling) : null);
			return !0;
		}
		function pa() {
			((et = Bt = null), (qe = !1));
		}
		function hc() {
			var t = qi;
			return (t !== null && (rn === null ? (rn = t) : rn.push.apply(rn, t), (qi = null)), t);
		}
		function cu(t) {
			qi === null ? (qi = [t]) : qi.push(t);
		}
		var mc = O(null),
			Sa = null,
			ui = null;
		function Ii(t, i, r) {
			(ae(mc, i._currentValue), (i._currentValue = r));
		}
		function si(t) {
			((t._currentValue = mc.current), G(mc));
		}
		function vc(t, i, r) {
			for (; t !== null; ) {
				var s = t.alternate;
				if (
					((t.childLanes & i) !== i
						? ((t.childLanes |= i), s !== null && (s.childLanes |= i))
						: s !== null && (s.childLanes & i) !== i && (s.childLanes |= i),
					t === r)
				)
					break;
				t = t.return;
			}
		}
		function gc(t, i, r, s) {
			var c = t.child;
			for (c !== null && (c.return = t); c !== null; ) {
				var d = c.dependencies;
				if (d !== null) {
					var g = c.child;
					d = d.firstContext;
					e: for (; d !== null; ) {
						var x = d;
						d = c;
						for (var z = 0; z < i.length; z++)
							if (x.context === i[z]) {
								((d.lanes |= r), (x = d.alternate), x !== null && (x.lanes |= r), vc(d.return, r, t), s || (g = null));
								break e;
							}
						d = x.next;
					}
				} else if (c.tag === 18) {
					if (((g = c.return), g === null)) throw Error(l(341));
					((g.lanes |= r), (d = g.alternate), d !== null && (d.lanes |= r), vc(g, r, t), (g = null));
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
		function lr(t, i, r, s) {
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
						vn(c.pendingProps.value, g.value) || (t !== null ? t.push(x) : (t = [x]));
					}
				} else if (c === pe.current) {
					if (((g = c.alternate), g === null)) throw Error(l(387));
					g.memoizedState.memoizedState !== c.memoizedState.memoizedState && (t !== null ? t.push(Uu) : (t = [Uu]));
				}
				c = c.return;
			}
			(t !== null && gc(i, t, r, s), (i.flags |= 262144));
		}
		function $s(t) {
			for (t = t.firstContext; t !== null; ) {
				if (!vn(t.context._currentValue, t.memoizedValue)) return !0;
				t = t.next;
			}
			return !1;
		}
		function wa(t) {
			((Sa = t), (ui = null), (t = t.dependencies), t !== null && (t.firstContext = null));
		}
		function Vt(t) {
			return Rm(Sa, t);
		}
		function Bs(t, i) {
			return (Sa === null && wa(t), Rm(t, i));
		}
		function Rm(t, i) {
			var r = i._currentValue;
			if (((i = { context: i, memoizedValue: r, next: null }), ui === null)) {
				if (t === null) throw Error(l(308));
				((ui = i), (t.dependencies = { lanes: 0, firstContext: i }), (t.flags |= 524288));
			} else ui = ui.next = i;
			return r;
		}
		var Ow =
				typeof AbortController < "u"
					? AbortController
					: function () {
							var t = [],
								i = (this.signal = {
									aborted: !1,
									addEventListener: function (r, s) {
										t.push(s);
									},
								});
							this.abort = function () {
								((i.aborted = !0),
									t.forEach(function (r) {
										return r();
									}));
							};
						},
			Nw = n.unstable_scheduleCallback,
			Mw = n.unstable_NormalPriority,
			pt = { $$typeof: R, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
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
			or = 0,
			cr = null;
		function zw(t, i) {
			if (du === null) {
				var r = (du = []);
				((bc = 0),
					(or = _f()),
					(cr = {
						status: "pending",
						value: void 0,
						then: function (s) {
							r.push(s);
						},
					}));
			}
			return (bc++, i.then(Om, Om), i);
		}
		function Om() {
			if (--bc === 0 && du !== null) {
				cr !== null && (cr.status = "fulfilled");
				var t = du;
				((du = null), (or = 0), (cr = null));
				for (var i = 0; i < t.length; i++) (0, t[i])();
			}
		}
		function kw(t, i) {
			var r = [],
				s = {
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
						((s.status = "fulfilled"), (s.value = i));
						for (var c = 0; c < r.length; c++) (0, r[c])(i);
					},
					function (c) {
						for (s.status = "rejected", s.reason = c, c = 0; c < r.length; c++) (0, r[c])(void 0);
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
		var _a = O(null);
		function pc() {
			var t = _a.current;
			return t !== null ? t : Je.pooledCache;
		}
		function Vs(t, i) {
			i === null ? ae(_a, _a.current) : ae(_a, i.pool);
		}
		function Mm() {
			var t = pc();
			return t === null ? null : { parent: pt._currentValue, pool: t };
		}
		var fr = Error(l(460)),
			Sc = Error(l(474)),
			Hs = Error(l(542)),
			Zs = { then: function () {} };
		function zm(t) {
			return ((t = t.status), t === "fulfilled" || t === "rejected");
		}
		function km(t, i, r) {
			switch (((r = t[r]), r === void 0 ? t.push(i) : r !== i && (i.then(ni, ni), (i = r)), i.status)) {
				case "fulfilled":
					return i.value;
				case "rejected":
					throw ((t = i.reason), jm(t), t);
				default:
					if (typeof i.status == "string") i.then(ni, ni);
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
					throw ((Ea = i), fr);
			}
		}
		function xa(t) {
			try {
				var i = t._init;
				return i(t._payload);
			} catch (r) {
				throw r !== null && typeof r == "object" && typeof r.then == "function" ? ((Ea = r), fr) : r;
			}
		}
		var Ea = null;
		function Dm() {
			if (Ea === null) throw Error(l(459));
			var t = Ea;
			return ((Ea = null), t);
		}
		function jm(t) {
			if (t === fr || t === Hs) throw Error(l(483));
		}
		var dr = null,
			hu = 0;
		function Qs(t) {
			var i = hu;
			return ((hu += 1), dr === null && (dr = []), km(dr, t, i));
		}
		function mu(t, i) {
			((i = i.props.ref), (t.ref = i !== void 0 ? i : null));
		}
		function Ps(t, i) {
			throw i.$$typeof === S
				? Error(l(525))
				: ((t = Object.prototype.toString.call(i)),
					Error(l(31, t === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : t)));
		}
		function qm(t) {
			function i(V, q) {
				if (t) {
					var Q = V.deletions;
					Q === null ? ((V.deletions = [q]), (V.flags |= 16)) : Q.push(q);
				}
			}
			function r(V, q) {
				if (!t) return null;
				for (; q !== null; ) (i(V, q), (q = q.sibling));
				return null;
			}
			function s(V) {
				for (var q = new Map(); V !== null; ) (V.key !== null ? q.set(V.key, V) : q.set(V.index, V), (V = V.sibling));
				return q;
			}
			function c(V, q) {
				return ((V = ai(V, q)), (V.index = 0), (V.sibling = null), V);
			}
			function d(V, q, Q) {
				return (
					(V.index = Q),
					t
						? ((Q = V.alternate),
							Q !== null ? ((Q = Q.index), Q < q ? ((V.flags |= 67108866), q) : Q) : ((V.flags |= 67108866), q))
						: ((V.flags |= 1048576), q)
				);
			}
			function g(V) {
				return (t && V.alternate === null && (V.flags |= 67108866), V);
			}
			function x(V, q, Q, J) {
				return q === null || q.tag !== 6
					? ((q = lc(Q, V.mode, J)), (q.return = V), q)
					: ((q = c(q, Q)), (q.return = V), q);
			}
			function z(V, q, Q, J) {
				var me = Q.type;
				return me === T
					? X(V, q, Q.props.children, J, Q.key)
					: q !== null &&
						  (q.elementType === me || (typeof me == "object" && me !== null && me.$$typeof === I && xa(me) === q.type))
						? ((q = c(q, Q.props)), mu(q, Q), (q.return = V), q)
						: ((q = Is(Q.type, Q.key, Q.props, null, V.mode, J)), mu(q, Q), (q.return = V), q);
			}
			function P(V, q, Q, J) {
				return q === null ||
					q.tag !== 4 ||
					q.stateNode.containerInfo !== Q.containerInfo ||
					q.stateNode.implementation !== Q.implementation
					? ((q = oc(Q, V.mode, J)), (q.return = V), q)
					: ((q = c(q, Q.children || [])), (q.return = V), q);
			}
			function X(V, q, Q, J, me) {
				return q === null || q.tag !== 7
					? ((q = ba(Q, V.mode, J, me)), (q.return = V), q)
					: ((q = c(q, Q)), (q.return = V), q);
			}
			function W(V, q, Q) {
				if ((typeof q == "string" && q !== "") || typeof q == "number" || typeof q == "bigint")
					return ((q = lc("" + q, V.mode, Q)), (q.return = V), q);
				if (typeof q == "object" && q !== null) {
					switch (q.$$typeof) {
						case E:
							return ((Q = Is(q.type, q.key, q.props, null, V.mode, Q)), mu(Q, q), (Q.return = V), Q);
						case C:
							return ((q = oc(q, V.mode, Q)), (q.return = V), q);
						case I:
							return ((q = xa(q)), W(V, q, Q));
					}
					if (k(q) || ne(q)) return ((q = ba(q, V.mode, Q, null)), (q.return = V), q);
					if (typeof q.then == "function") return W(V, Qs(q), Q);
					if (q.$$typeof === R) return W(V, Bs(V, q), Q);
					Ps(V, q);
				}
				return null;
			}
			function Y(V, q, Q, J) {
				var me = q !== null ? q.key : null;
				if ((typeof Q == "string" && Q !== "") || typeof Q == "number" || typeof Q == "bigint")
					return me !== null ? null : x(V, q, "" + Q, J);
				if (typeof Q == "object" && Q !== null) {
					switch (Q.$$typeof) {
						case E:
							return Q.key === me ? z(V, q, Q, J) : null;
						case C:
							return Q.key === me ? P(V, q, Q, J) : null;
						case I:
							return ((Q = xa(Q)), Y(V, q, Q, J));
					}
					if (k(Q) || ne(Q)) return me !== null ? null : X(V, q, Q, J, null);
					if (typeof Q.then == "function") return Y(V, q, Qs(Q), J);
					if (Q.$$typeof === R) return Y(V, q, Bs(V, Q), J);
					Ps(V, Q);
				}
				return null;
			}
			function F(V, q, Q, J, me) {
				if ((typeof J == "string" && J !== "") || typeof J == "number" || typeof J == "bigint")
					return ((V = V.get(Q) || null), x(q, V, "" + J, me));
				if (typeof J == "object" && J !== null) {
					switch (J.$$typeof) {
						case E:
							return ((V = V.get(J.key === null ? Q : J.key) || null), z(q, V, J, me));
						case C:
							return ((V = V.get(J.key === null ? Q : J.key) || null), P(q, V, J, me));
						case I:
							return ((J = xa(J)), F(V, q, Q, J, me));
					}
					if (k(J) || ne(J)) return ((V = V.get(Q) || null), X(q, V, J, me, null));
					if (typeof J.then == "function") return F(V, q, Q, Qs(J), me);
					if (J.$$typeof === R) return F(V, q, Q, Bs(q, J), me);
					Ps(q, J);
				}
				return null;
			}
			function oe(V, q, Q, J) {
				for (var me = null, $e = null, he = q, Ae = (q = 0), ke = null; he !== null && Ae < Q.length; Ae++) {
					he.index > Ae ? ((ke = he), (he = null)) : (ke = he.sibling);
					var Be = Y(V, he, Q[Ae], J);
					if (Be === null) {
						he === null && (he = ke);
						break;
					}
					(t && he && Be.alternate === null && i(V, he),
						(q = d(Be, q, Ae)),
						$e === null ? (me = Be) : ($e.sibling = Be),
						($e = Be),
						(he = ke));
				}
				if (Ae === Q.length) return (r(V, he), qe && ri(V, Ae), me);
				if (he === null) {
					for (; Ae < Q.length; Ae++)
						((he = W(V, Q[Ae], J)),
							he !== null && ((q = d(he, q, Ae)), $e === null ? (me = he) : ($e.sibling = he), ($e = he)));
					return (qe && ri(V, Ae), me);
				}
				for (he = s(he); Ae < Q.length; Ae++)
					((ke = F(he, V, Ae, Q[Ae], J)),
						ke !== null &&
							(t && ke.alternate !== null && he.delete(ke.key === null ? Ae : ke.key),
							(q = d(ke, q, Ae)),
							$e === null ? (me = ke) : ($e.sibling = ke),
							($e = ke)));
				return (
					t &&
						he.forEach(function (ea) {
							return i(V, ea);
						}),
					qe && ri(V, Ae),
					me
				);
			}
			function be(V, q, Q, J) {
				if (Q == null) throw Error(l(151));
				for (
					var me = null, $e = null, he = q, Ae = (q = 0), ke = null, Be = Q.next();
					he !== null && !Be.done;
					Ae++, Be = Q.next()
				) {
					he.index > Ae ? ((ke = he), (he = null)) : (ke = he.sibling);
					var ea = Y(V, he, Be.value, J);
					if (ea === null) {
						he === null && (he = ke);
						break;
					}
					(t && he && ea.alternate === null && i(V, he),
						(q = d(ea, q, Ae)),
						$e === null ? (me = ea) : ($e.sibling = ea),
						($e = ea),
						(he = ke));
				}
				if (Be.done) return (r(V, he), qe && ri(V, Ae), me);
				if (he === null) {
					for (; !Be.done; Ae++, Be = Q.next())
						((Be = W(V, Be.value, J)),
							Be !== null && ((q = d(Be, q, Ae)), $e === null ? (me = Be) : ($e.sibling = Be), ($e = Be)));
					return (qe && ri(V, Ae), me);
				}
				for (he = s(he); !Be.done; Ae++, Be = Q.next())
					((Be = F(he, V, Ae, Be.value, J)),
						Be !== null &&
							(t && Be.alternate !== null && he.delete(Be.key === null ? Ae : Be.key),
							(q = d(Be, q, Ae)),
							$e === null ? (me = Be) : ($e.sibling = Be),
							($e = Be)));
				return (
					t &&
						he.forEach(function (F_) {
							return i(V, F_);
						}),
					qe && ri(V, Ae),
					me
				);
			}
			function Ge(V, q, Q, J) {
				if (
					(typeof Q == "object" && Q !== null && Q.type === T && Q.key === null && (Q = Q.props.children),
					typeof Q == "object" && Q !== null)
				) {
					switch (Q.$$typeof) {
						case E:
							e: {
								for (var me = Q.key; q !== null; ) {
									if (q.key === me) {
										if (((me = Q.type), me === T)) {
											if (q.tag === 7) {
												(r(V, q.sibling), (J = c(q, Q.props.children)), (J.return = V), (V = J));
												break e;
											}
										} else if (
											q.elementType === me ||
											(typeof me == "object" && me !== null && me.$$typeof === I && xa(me) === q.type)
										) {
											(r(V, q.sibling), (J = c(q, Q.props)), mu(J, Q), (J.return = V), (V = J));
											break e;
										}
										r(V, q);
										break;
									} else i(V, q);
									q = q.sibling;
								}
								Q.type === T
									? ((J = ba(Q.props.children, V.mode, J, Q.key)), (J.return = V), (V = J))
									: ((J = Is(Q.type, Q.key, Q.props, null, V.mode, J)), mu(J, Q), (J.return = V), (V = J));
							}
							return g(V);
						case C:
							e: {
								for (me = Q.key; q !== null; ) {
									if (q.key === me)
										if (
											q.tag === 4 &&
											q.stateNode.containerInfo === Q.containerInfo &&
											q.stateNode.implementation === Q.implementation
										) {
											(r(V, q.sibling), (J = c(q, Q.children || [])), (J.return = V), (V = J));
											break e;
										} else {
											r(V, q);
											break;
										}
									else i(V, q);
									q = q.sibling;
								}
								((J = oc(Q, V.mode, J)), (J.return = V), (V = J));
							}
							return g(V);
						case I:
							return ((Q = xa(Q)), Ge(V, q, Q, J));
					}
					if (k(Q)) return oe(V, q, Q, J);
					if (ne(Q)) {
						if (((me = ne(Q)), typeof me != "function")) throw Error(l(150));
						return ((Q = me.call(Q)), be(V, q, Q, J));
					}
					if (typeof Q.then == "function") return Ge(V, q, Qs(Q), J);
					if (Q.$$typeof === R) return Ge(V, q, Bs(V, Q), J);
					Ps(V, Q);
				}
				return (typeof Q == "string" && Q !== "") || typeof Q == "number" || typeof Q == "bigint"
					? ((Q = "" + Q),
						q !== null && q.tag === 6
							? (r(V, q.sibling), (J = c(q, Q)), (J.return = V), (V = J))
							: (r(V, q), (J = lc(Q, V.mode, J)), (J.return = V), (V = J)),
						g(V))
					: r(V, q);
			}
			return function (V, q, Q, J) {
				try {
					hu = 0;
					var me = Ge(V, q, Q, J);
					return ((dr = null), me);
				} catch (he) {
					if (he === fr || he === Hs) throw he;
					var $e = gn(29, he, null, V.mode);
					return (($e.lanes = J), ($e.return = V), $e);
				}
			};
		}
		var Ca = qm(!0),
			Um = qm(!1),
			Li = !1;
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
		function Ta(t) {
			return { lane: t, tag: 0, payload: null, callback: null, next: null };
		}
		function Aa(t, i, r) {
			var s = t.updateQueue;
			if (s === null) return null;
			if (((s = s.shared), (Ve & 2) !== 0)) {
				var c = s.pending;
				return (
					c === null ? (i.next = i) : ((i.next = c.next), (c.next = i)),
					(s.pending = i),
					(i = Us(t)),
					Sm(t, null, r),
					i
				);
			}
			return (qs(t, s, i, r), Us(t));
		}
		function vu(t, i, r) {
			if (((i = i.updateQueue), i !== null && ((i = i.shared), (r & 4194048) !== 0))) {
				var s = i.lanes;
				((s &= t.pendingLanes), (r |= s), (i.lanes = r), Ah(t, r));
			}
		}
		function xc(t, i) {
			var r = t.updateQueue,
				s = t.alternate;
			if (s !== null && ((s = s.updateQueue), r === s)) {
				var c = null,
					d = null;
				if (((r = r.firstBaseUpdate), r !== null)) {
					do {
						var g = { lane: r.lane, tag: r.tag, payload: r.payload, callback: null, next: null };
						(d === null ? (c = d = g) : (d = d.next = g), (r = r.next));
					} while (r !== null);
					d === null ? (c = d = i) : (d = d.next = i);
				} else c = d = i;
				((r = {
					baseState: s.baseState,
					firstBaseUpdate: c,
					lastBaseUpdate: d,
					shared: s.shared,
					callbacks: s.callbacks,
				}),
					(t.updateQueue = r));
				return;
			}
			((t = r.lastBaseUpdate), t === null ? (r.firstBaseUpdate = i) : (t.next = i), (r.lastBaseUpdate = i));
		}
		var Ec = !1;
		function gu() {
			if (Ec) {
				var t = cr;
				if (t !== null) throw t;
			}
		}
		function yu(t, i, r, s) {
			Ec = !1;
			var c = t.updateQueue;
			Li = !1;
			var d = c.firstBaseUpdate,
				g = c.lastBaseUpdate,
				x = c.shared.pending;
			if (x !== null) {
				c.shared.pending = null;
				var z = x,
					P = z.next;
				((z.next = null), g === null ? (d = P) : (g.next = P), (g = z));
				var X = t.alternate;
				X !== null &&
					((X = X.updateQueue),
					(x = X.lastBaseUpdate),
					x !== g && (x === null ? (X.firstBaseUpdate = P) : (x.next = P), (X.lastBaseUpdate = z)));
			}
			if (d !== null) {
				var W = c.baseState;
				((g = 0), (X = P = z = null), (x = d));
				do {
					var Y = x.lane & -536870913,
						F = Y !== x.lane;
					if (F ? (ze & Y) === Y : (s & Y) === Y) {
						(Y !== 0 && Y === or && (Ec = !0),
							X !== null && (X = X.next = { lane: 0, tag: x.tag, payload: x.payload, callback: null, next: null }));
						e: {
							var oe = t,
								be = x;
							Y = i;
							var Ge = r;
							switch (be.tag) {
								case 1:
									if (((oe = be.payload), typeof oe == "function")) {
										W = oe.call(Ge, W, Y);
										break e;
									}
									W = oe;
									break e;
								case 3:
									oe.flags = (oe.flags & -65537) | 128;
								case 0:
									if (((oe = be.payload), (Y = typeof oe == "function" ? oe.call(Ge, W, Y) : oe), Y == null)) break e;
									W = p({}, W, Y);
									break e;
								case 2:
									Li = !0;
							}
						}
						((Y = x.callback),
							Y !== null &&
								((t.flags |= 64),
								F && (t.flags |= 8192),
								(F = c.callbacks),
								F === null ? (c.callbacks = [Y]) : F.push(Y)));
					} else
						((F = { lane: Y, tag: x.tag, payload: x.payload, callback: x.callback, next: null }),
							X === null ? ((P = X = F), (z = W)) : (X = X.next = F),
							(g |= Y));
					if (((x = x.next), x === null)) {
						if (((x = c.shared.pending), x === null)) break;
						((F = x), (x = F.next), (F.next = null), (c.lastBaseUpdate = F), (c.shared.pending = null));
					}
				} while (!0);
				(X === null && (z = W),
					(c.baseState = z),
					(c.firstBaseUpdate = P),
					(c.lastBaseUpdate = X),
					d === null && (c.shared.lanes = 0),
					(Zi |= g),
					(t.lanes = g),
					(t.memoizedState = W));
			}
		}
		function Im(t, i) {
			if (typeof t != "function") throw Error(l(191, t));
			t.call(i);
		}
		function Lm(t, i) {
			var r = t.callbacks;
			if (r !== null) for (t.callbacks = null, t = 0; t < r.length; t++) Im(r[t], i);
		}
		var hr = O(null),
			Ys = O(0);
		function $m(t, i) {
			((t = gi), ae(Ys, t), ae(hr, i), (gi = t | i.baseLanes));
		}
		function Cc() {
			(ae(Ys, gi), ae(hr, hr.current));
		}
		function Tc() {
			((gi = Ys.current), G(hr), G(Ys));
		}
		var yn = O(null),
			On = null;
		function $i(t) {
			var i = t.alternate;
			(ae(dt, dt.current & 1),
				ae(yn, t),
				On === null && (i === null || hr.current !== null || i.memoizedState !== null) && (On = t));
		}
		function Ac(t) {
			(ae(dt, dt.current), ae(yn, t), On === null && (On = t));
		}
		function Bm(t) {
			t.tag === 22 ? (ae(dt, dt.current), ae(yn, t), On === null && (On = t)) : Bi(t);
		}
		function Bi() {
			(ae(dt, dt.current), ae(yn, yn.current));
		}
		function bn(t) {
			(G(yn), On === t && (On = null), G(dt));
		}
		var dt = O(0);
		function Fs(t) {
			for (var i = t; i !== null; ) {
				if (i.tag === 13) {
					var r = i.memoizedState;
					if (r !== null && ((r = r.dehydrated), r === null || kf(r) || Df(r))) return i;
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
		var li = 0,
			Ce = null,
			Fe = null,
			St = null,
			Ks = !1,
			mr = !1,
			Ra = !1,
			Gs = 0,
			bu = 0,
			vr = null,
			Dw = 0;
		function ot() {
			throw Error(l(321));
		}
		function Rc(t, i) {
			if (i === null) return !1;
			for (var r = 0; r < i.length && r < t.length; r++) if (!vn(t[r], i[r])) return !1;
			return !0;
		}
		function Oc(t, i, r, s, c, d) {
			return (
				(li = d),
				(Ce = i),
				(i.memoizedState = null),
				(i.updateQueue = null),
				(i.lanes = 0),
				(H.H = t === null || t.memoizedState === null ? Ev : Zc),
				(Ra = !1),
				(d = r(s, c)),
				(Ra = !1),
				mr && (d = Hm(i, r, s, c)),
				Vm(t),
				d
			);
		}
		function Vm(t) {
			H.H = wu;
			var i = Fe !== null && Fe.next !== null;
			if (((li = 0), (St = Fe = Ce = null), (Ks = !1), (bu = 0), (vr = null), i)) throw Error(l(300));
			t === null || wt || ((t = t.dependencies), t !== null && $s(t) && (wt = !0));
		}
		function Hm(t, i, r, s) {
			Ce = t;
			var c = 0;
			do {
				if ((mr && (vr = null), (bu = 0), (mr = !1), 25 <= c)) throw Error(l(301));
				if (((c += 1), (St = Fe = null), t.updateQueue != null)) {
					var d = t.updateQueue;
					((d.lastEffect = null), (d.events = null), (d.stores = null), d.memoCache != null && (d.memoCache.index = 0));
				}
				((H.H = Cv), (d = i(r, s)));
			} while (mr);
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
			var t = Gs !== 0;
			return ((Gs = 0), t);
		}
		function Mc(t, i, r) {
			((i.updateQueue = t.updateQueue), (i.flags &= -2053), (t.lanes &= ~r));
		}
		function zc(t) {
			if (Ks) {
				for (t = t.memoizedState; t !== null; ) {
					var i = t.queue;
					(i !== null && (i.pending = null), (t = t.next));
				}
				Ks = !1;
			}
			((li = 0), (St = Fe = Ce = null), (mr = !1), (bu = Gs = 0), (vr = null));
		}
		function Kt() {
			var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
			return (St === null ? (Ce.memoizedState = St = t) : (St = St.next = t), St);
		}
		function ht() {
			if (Fe === null) {
				var t = Ce.alternate;
				t = t !== null ? t.memoizedState : null;
			} else t = Fe.next;
			var i = St === null ? Ce.memoizedState : St.next;
			if (i !== null) ((St = i), (Fe = t));
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
					St === null ? (Ce.memoizedState = St = t) : (St = St.next = t));
			}
			return St;
		}
		function Xs() {
			return { lastEffect: null, events: null, stores: null, memoCache: null };
		}
		function pu(t) {
			var i = bu;
			return (
				(bu += 1),
				vr === null && (vr = []),
				(t = km(vr, t, i)),
				(i = Ce),
				(St === null ? i.memoizedState : St.next) === null &&
					((i = i.alternate), (H.H = i === null || i.memoizedState === null ? Ev : Zc)),
				t
			);
		}
		function Js(t) {
			if (t !== null && typeof t == "object") {
				if (typeof t.then == "function") return pu(t);
				if (t.$$typeof === R) return Vt(t);
			}
			throw Error(l(438, String(t)));
		}
		function kc(t) {
			var i = null,
				r = Ce.updateQueue;
			if ((r !== null && (i = r.memoCache), i == null)) {
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
				r === null && ((r = Xs()), (Ce.updateQueue = r)),
				(r.memoCache = i),
				(r = i.data[i.index]),
				r === void 0)
			)
				for (r = i.data[i.index] = Array(t), s = 0; s < t; s++) r[s] = $;
			return (i.index++, r);
		}
		function oi(t, i) {
			return typeof i == "function" ? i(t) : i;
		}
		function Ws(t) {
			return Dc(ht(), Fe, t);
		}
		function Dc(t, i, r) {
			var s = t.queue;
			if (s === null) throw Error(l(311));
			s.lastRenderedReducer = r;
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
					z = null,
					P = i,
					X = !1;
				do {
					var W = P.lane & -536870913;
					if (W !== P.lane ? (ze & W) === W : (li & W) === W) {
						var Y = P.revertLane;
						if (Y === 0)
							(z !== null &&
								(z = z.next =
									{
										lane: 0,
										revertLane: 0,
										gesture: null,
										action: P.action,
										hasEagerState: P.hasEagerState,
										eagerState: P.eagerState,
										next: null,
									}),
								W === or && (X = !0));
						else if ((li & Y) === Y) {
							((P = P.next), Y === or && (X = !0));
							continue;
						} else
							((W = {
								lane: 0,
								revertLane: P.revertLane,
								gesture: null,
								action: P.action,
								hasEagerState: P.hasEagerState,
								eagerState: P.eagerState,
								next: null,
							}),
								z === null ? ((x = z = W), (g = d)) : (z = z.next = W),
								(Ce.lanes |= Y),
								(Zi |= Y));
						((W = P.action), Ra && r(d, W), (d = P.hasEagerState ? P.eagerState : r(d, W)));
					} else
						((Y = {
							lane: W,
							revertLane: P.revertLane,
							gesture: P.gesture,
							action: P.action,
							hasEagerState: P.hasEagerState,
							eagerState: P.eagerState,
							next: null,
						}),
							z === null ? ((x = z = Y), (g = d)) : (z = z.next = Y),
							(Ce.lanes |= W),
							(Zi |= W));
					P = P.next;
				} while (P !== null && P !== i);
				if ((z === null ? (g = d) : (z.next = x), !vn(d, t.memoizedState) && ((wt = !0), X && ((r = cr), r !== null))))
					throw r;
				((t.memoizedState = d), (t.baseState = g), (t.baseQueue = z), (s.lastRenderedState = d));
			}
			return (c === null && (s.lanes = 0), [t.memoizedState, s.dispatch]);
		}
		function jc(t) {
			var i = ht(),
				r = i.queue;
			if (r === null) throw Error(l(311));
			r.lastRenderedReducer = t;
			var s = r.dispatch,
				c = r.pending,
				d = i.memoizedState;
			if (c !== null) {
				r.pending = null;
				var g = (c = c.next);
				do ((d = t(d, g.action)), (g = g.next));
				while (g !== c);
				(vn(d, i.memoizedState) || (wt = !0),
					(i.memoizedState = d),
					i.baseQueue === null && (i.baseState = d),
					(r.lastRenderedState = d));
			}
			return [d, s];
		}
		function Zm(t, i, r) {
			var s = Ce,
				c = ht(),
				d = qe;
			if (d) {
				if (r === void 0) throw Error(l(407));
				r = r();
			} else r = i();
			var g = !vn((Fe || c).memoizedState, r);
			if (
				(g && ((c.memoizedState = r), (wt = !0)),
				(c = c.queue),
				Ic(Ym.bind(null, s, c, t), [t]),
				c.getSnapshot !== i || g || (St !== null && St.memoizedState.tag & 1))
			) {
				if (((s.flags |= 2048), gr(9, { destroy: void 0 }, Pm.bind(null, s, c, r, i), null), Je === null))
					throw Error(l(349));
				d || (li & 127) !== 0 || Qm(s, i, r);
			}
			return r;
		}
		function Qm(t, i, r) {
			((t.flags |= 16384),
				(t = { getSnapshot: i, value: r }),
				(i = Ce.updateQueue),
				i === null
					? ((i = Xs()), (Ce.updateQueue = i), (i.stores = [t]))
					: ((r = i.stores), r === null ? (i.stores = [t]) : r.push(t)));
		}
		function Pm(t, i, r, s) {
			((i.value = r), (i.getSnapshot = s), Fm(i) && Km(t));
		}
		function Ym(t, i, r) {
			return r(function () {
				Fm(i) && Km(t);
			});
		}
		function Fm(t) {
			var i = t.getSnapshot;
			t = t.value;
			try {
				var r = i();
				return !vn(t, r);
			} catch {
				return !0;
			}
		}
		function Km(t) {
			var i = ya(t, 2);
			i !== null && un(i, t, 2);
		}
		function qc(t) {
			var i = Kt();
			if (typeof t == "function") {
				var r = t;
				if (((t = r()), Ra)) {
					zi(!0);
					try {
						r();
					} finally {
						zi(!1);
					}
				}
			}
			return (
				(i.memoizedState = i.baseState = t),
				(i.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: oi, lastRenderedState: t }),
				i
			);
		}
		function Gm(t, i, r, s) {
			return ((t.baseState = r), Dc(t, Fe, typeof s == "function" ? s : oi));
		}
		function qw(t, i, r, s, c) {
			if (nl(t)) throw Error(l(485));
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
				(H.T !== null ? r(!0) : (d.isTransition = !1),
					s(d),
					(r = i.pending),
					r === null ? ((d.next = i.pending = d), Xm(i, d)) : ((d.next = r.next), (i.pending = r.next = d)));
			}
		}
		function Xm(t, i) {
			var r = i.action,
				s = i.payload,
				c = t.state;
			if (i.isTransition) {
				var d = H.T,
					g = {};
				H.T = g;
				try {
					var x = r(c, s),
						z = H.S;
					(z !== null && z(g, x), Jm(t, i, x));
				} catch (P) {
					Uc(t, i, P);
				} finally {
					(d !== null && g.types !== null && (d.types = g.types), (H.T = d));
				}
			} else
				try {
					((d = r(c, s)), Jm(t, i, d));
				} catch (P) {
					Uc(t, i, P);
				}
		}
		function Jm(t, i, r) {
			r !== null && typeof r == "object" && typeof r.then == "function"
				? r.then(
						function (s) {
							Wm(t, i, s);
						},
						function (s) {
							return Uc(t, i, s);
						},
					)
				: Wm(t, i, r);
		}
		function Wm(t, i, r) {
			((i.status = "fulfilled"),
				(i.value = r),
				ev(i),
				(t.state = r),
				(i = t.pending),
				i !== null && ((r = i.next), r === i ? (t.pending = null) : ((r = r.next), (i.next = r), Xm(t, r))));
		}
		function Uc(t, i, r) {
			var s = t.pending;
			if (((t.pending = null), s !== null)) {
				s = s.next;
				do ((i.status = "rejected"), (i.reason = r), ev(i), (i = i.next));
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
				var r = Je.formState;
				if (r !== null) {
					e: {
						var s = Ce;
						if (qe) {
							if (et) {
								t: {
									for (var c = et, d = Rn; c.nodeType !== 8; ) {
										if (!d) {
											c = null;
											break t;
										}
										if (((c = Mn(c.nextSibling)), c === null)) {
											c = null;
											break t;
										}
									}
									((d = c.data), (c = d === "F!" || d === "F" ? c : null));
								}
								if (c) {
									((et = Mn(c.nextSibling)), (s = c.data === "F!"));
									break e;
								}
							}
							Ui(s);
						}
						s = !1;
					}
					s && (i = r[0]);
				}
			}
			return (
				(r = Kt()),
				(r.memoizedState = r.baseState = i),
				(s = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: tv, lastRenderedState: i }),
				(r.queue = s),
				(r = wv.bind(null, Ce, s)),
				(s.dispatch = r),
				(s = qc(!1)),
				(d = Hc.bind(null, Ce, !1, s.queue)),
				(s = Kt()),
				(c = { state: i, dispatch: null, action: t, pending: null }),
				(s.queue = c),
				(r = qw.bind(null, Ce, c, d, r)),
				(c.dispatch = r),
				(s.memoizedState = t),
				[i, r, !1]
			);
		}
		function iv(t) {
			return av(ht(), Fe, t);
		}
		function av(t, i, r) {
			if (((i = Dc(t, i, tv)[0]), (t = Ws(oi)[0]), typeof i == "object" && i !== null && typeof i.then == "function"))
				try {
					var s = pu(i);
				} catch (g) {
					throw g === fr ? Hs : g;
				}
			else s = i;
			i = ht();
			var c = i.queue,
				d = c.dispatch;
			return (
				r !== i.memoizedState && ((Ce.flags |= 2048), gr(9, { destroy: void 0 }, Uw.bind(null, c, r), null)),
				[s, d, t]
			);
		}
		function Uw(t, i) {
			t.action = i;
		}
		function rv(t) {
			var i = ht(),
				r = Fe;
			if (r !== null) return av(i, r, t);
			(ht(), (i = i.memoizedState), (r = ht()));
			var s = r.queue.dispatch;
			return ((r.memoizedState = t), [i, s, !1]);
		}
		function gr(t, i, r, s) {
			return (
				(t = { tag: t, create: r, deps: s, inst: i, next: null }),
				(i = Ce.updateQueue),
				i === null && ((i = Xs()), (Ce.updateQueue = i)),
				(r = i.lastEffect),
				r === null ? (i.lastEffect = t.next = t) : ((s = r.next), (r.next = t), (t.next = s), (i.lastEffect = t)),
				t
			);
		}
		function uv() {
			return ht().memoizedState;
		}
		function el(t, i, r, s) {
			var c = Kt();
			((Ce.flags |= t), (c.memoizedState = gr(1 | i, { destroy: void 0 }, r, s === void 0 ? null : s)));
		}
		function tl(t, i, r, s) {
			var c = ht();
			s = s === void 0 ? null : s;
			var d = c.memoizedState.inst;
			Fe !== null && s !== null && Rc(s, Fe.memoizedState.deps)
				? (c.memoizedState = gr(i, d, r, s))
				: ((Ce.flags |= t), (c.memoizedState = gr(1 | i, d, r, s)));
		}
		function sv(t, i) {
			el(8390656, 8, t, i);
		}
		function Ic(t, i) {
			tl(2048, 8, t, i);
		}
		function Iw(t) {
			Ce.flags |= 4;
			var i = Ce.updateQueue;
			if (i === null) ((i = Xs()), (Ce.updateQueue = i), (i.events = [t]));
			else {
				var r = i.events;
				r === null ? (i.events = [t]) : r.push(t);
			}
		}
		function lv(t) {
			var i = ht().memoizedState;
			return (
				Iw({ ref: i, nextImpl: t }),
				function () {
					if ((Ve & 2) !== 0) throw Error(l(440));
					return i.impl.apply(void 0, arguments);
				}
			);
		}
		function ov(t, i) {
			return tl(4, 2, t, i);
		}
		function cv(t, i) {
			return tl(4, 4, t, i);
		}
		function fv(t, i) {
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
		function dv(t, i, r) {
			((r = r != null ? r.concat([t]) : null), tl(4, 4, fv.bind(null, i, t), r));
		}
		function Lc() {}
		function hv(t, i) {
			var r = ht();
			i = i === void 0 ? null : i;
			var s = r.memoizedState;
			return i !== null && Rc(i, s[1]) ? s[0] : ((r.memoizedState = [t, i]), t);
		}
		function mv(t, i) {
			var r = ht();
			i = i === void 0 ? null : i;
			var s = r.memoizedState;
			if (i !== null && Rc(i, s[1])) return s[0];
			if (((s = t()), Ra)) {
				zi(!0);
				try {
					t();
				} finally {
					zi(!1);
				}
			}
			return ((r.memoizedState = [s, i]), s);
		}
		function $c(t, i, r) {
			return r === void 0 || ((li & 1073741824) !== 0 && (ze & 261930) === 0)
				? (t.memoizedState = i)
				: ((t.memoizedState = r), (t = dg()), (Ce.lanes |= t), (Zi |= t), r);
		}
		function vv(t, i, r, s) {
			return vn(r, i)
				? r
				: hr.current !== null
					? ((t = $c(t, r, s)), vn(t, i) || (wt = !0), t)
					: (li & 42) === 0 || ((li & 1073741824) !== 0 && (ze & 261930) === 0)
						? ((wt = !0), (t.memoizedState = r))
						: ((t = dg()), (Ce.lanes |= t), (Zi |= t), i);
		}
		function gv(t, i, r, s, c) {
			var d = B.p;
			B.p = d !== 0 && 8 > d ? d : 8;
			var g = H.T,
				x = {};
			((H.T = x), Hc(t, !1, i, r));
			try {
				var z = c(),
					P = H.S;
				(P !== null && P(x, z),
					z !== null && typeof z == "object" && typeof z.then == "function"
						? Su(t, i, kw(z, s), Nn(t))
						: Su(t, i, s, Nn(t)));
			} catch (X) {
				Su(t, i, { then: function () {}, status: "rejected", reason: X }, Nn());
			} finally {
				((B.p = d), g !== null && x.types !== null && (g.types = x.types), (H.T = g));
			}
		}
		function Lw() {}
		function Bc(t, i, r, s) {
			if (t.tag !== 5) throw Error(l(476));
			var c = yv(t).queue;
			gv(
				t,
				c,
				i,
				ue,
				r === null
					? Lw
					: function () {
							return (bv(t), r(s));
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
				queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: oi, lastRenderedState: ue },
				next: null,
			};
			var r = {};
			return (
				(i.next = {
					memoizedState: r,
					baseState: r,
					baseQueue: null,
					queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: oi, lastRenderedState: r },
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
			(i.next === null && (i = t.alternate.memoizedState), Su(t, i.next.queue, {}, Nn()));
		}
		function Vc() {
			return Vt(Uu);
		}
		function pv() {
			return ht().memoizedState;
		}
		function Sv() {
			return ht().memoizedState;
		}
		function $w(t) {
			for (var i = t.return; i !== null; ) {
				switch (i.tag) {
					case 24:
					case 3:
						var r = Nn();
						t = Ta(r);
						var s = Aa(i, t, r);
						(s !== null && (un(s, i, r), vu(s, i, r)), (i = { cache: yc() }), (t.payload = i));
						return;
				}
				i = i.return;
			}
		}
		function Bw(t, i, r) {
			var s = Nn();
			((r = { lane: s, revertLane: 0, gesture: null, action: r, hasEagerState: !1, eagerState: null, next: null }),
				nl(t) ? _v(i, r) : ((r = uc(t, i, r, s)), r !== null && (un(r, t, s), xv(r, i, s))));
		}
		function wv(t, i, r) {
			Su(t, i, r, Nn());
		}
		function Su(t, i, r, s) {
			var c = { lane: s, revertLane: 0, gesture: null, action: r, hasEagerState: !1, eagerState: null, next: null };
			if (nl(t)) _v(i, c);
			else {
				var d = t.alternate;
				if (t.lanes === 0 && (d === null || d.lanes === 0) && ((d = i.lastRenderedReducer), d !== null))
					try {
						var g = i.lastRenderedState,
							x = d(g, r);
						if (((c.hasEagerState = !0), (c.eagerState = x), vn(x, g)))
							return (qs(t, i, c, 0), Je === null && js(), !1);
					} catch {}
				if (((r = uc(t, i, c, s)), r !== null)) return (un(r, t, s), xv(r, i, s), !0);
			}
			return !1;
		}
		function Hc(t, i, r, s) {
			if (
				((s = { lane: 2, revertLane: _f(), gesture: null, action: s, hasEagerState: !1, eagerState: null, next: null }),
				nl(t))
			) {
				if (i) throw Error(l(479));
			} else ((i = uc(t, r, s, 2)), i !== null && un(i, t, 2));
		}
		function nl(t) {
			var i = t.alternate;
			return t === Ce || (i !== null && i === Ce);
		}
		function _v(t, i) {
			mr = Ks = !0;
			var r = t.pending;
			(r === null ? (i.next = i) : ((i.next = r.next), (r.next = i)), (t.pending = i));
		}
		function xv(t, i, r) {
			if ((r & 4194048) !== 0) {
				var s = i.lanes;
				((s &= t.pendingLanes), (r |= s), (i.lanes = r), Ah(t, r));
			}
		}
		var wu = {
			readContext: Vt,
			use: Js,
			useCallback: ot,
			useContext: ot,
			useEffect: ot,
			useImperativeHandle: ot,
			useLayoutEffect: ot,
			useInsertionEffect: ot,
			useMemo: ot,
			useReducer: ot,
			useRef: ot,
			useState: ot,
			useDebugValue: ot,
			useDeferredValue: ot,
			useTransition: ot,
			useSyncExternalStore: ot,
			useId: ot,
			useHostTransitionStatus: ot,
			useFormState: ot,
			useActionState: ot,
			useOptimistic: ot,
			useMemoCache: ot,
			useCacheRefresh: ot,
		};
		wu.useEffectEvent = ot;
		var Ev = {
				readContext: Vt,
				use: Js,
				useCallback: function (t, i) {
					return ((Kt().memoizedState = [t, i === void 0 ? null : i]), t);
				},
				useContext: Vt,
				useEffect: sv,
				useImperativeHandle: function (t, i, r) {
					((r = r != null ? r.concat([t]) : null), el(4194308, 4, fv.bind(null, i, t), r));
				},
				useLayoutEffect: function (t, i) {
					return el(4194308, 4, t, i);
				},
				useInsertionEffect: function (t, i) {
					el(4, 2, t, i);
				},
				useMemo: function (t, i) {
					var r = Kt();
					i = i === void 0 ? null : i;
					var s = t();
					if (Ra) {
						zi(!0);
						try {
							t();
						} finally {
							zi(!1);
						}
					}
					return ((r.memoizedState = [s, i]), s);
				},
				useReducer: function (t, i, r) {
					var s = Kt();
					if (r !== void 0) {
						var c = r(i);
						if (Ra) {
							zi(!0);
							try {
								r(i);
							} finally {
								zi(!1);
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
					var i = Kt();
					return ((t = { current: t }), (i.memoizedState = t));
				},
				useState: function (t) {
					t = qc(t);
					var i = t.queue,
						r = wv.bind(null, Ce, i);
					return ((i.dispatch = r), [t.memoizedState, r]);
				},
				useDebugValue: Lc,
				useDeferredValue: function (t, i) {
					return $c(Kt(), t, i);
				},
				useTransition: function () {
					var t = qc(!1);
					return ((t = gv.bind(null, Ce, t.queue, !0, !1)), (Kt().memoizedState = t), [!1, t]);
				},
				useSyncExternalStore: function (t, i, r) {
					var s = Ce,
						c = Kt();
					if (qe) {
						if (r === void 0) throw Error(l(407));
						r = r();
					} else {
						if (((r = i()), Je === null)) throw Error(l(349));
						(ze & 127) !== 0 || Qm(s, i, r);
					}
					c.memoizedState = r;
					var d = { value: r, getSnapshot: i };
					return (
						(c.queue = d),
						sv(Ym.bind(null, s, d, t), [t]),
						(s.flags |= 2048),
						gr(9, { destroy: void 0 }, Pm.bind(null, s, d, r, i), null),
						r
					);
				},
				useId: function () {
					var t = Kt(),
						i = Je.identifierPrefix;
					if (qe) {
						var r = Qn,
							s = Zn;
						((r = (s & ~(1 << (32 - mn(s) - 1))).toString(32) + r),
							(i = "_" + i + "R_" + r),
							(r = Gs++),
							0 < r && (i += "H" + r.toString(32)),
							(i += "_"));
					} else ((r = Dw++), (i = "_" + i + "r_" + r.toString(32) + "_"));
					return (t.memoizedState = i);
				},
				useHostTransitionStatus: Vc,
				useFormState: nv,
				useActionState: nv,
				useOptimistic: function (t) {
					var i = Kt();
					i.memoizedState = i.baseState = t;
					var r = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
					return ((i.queue = r), (i = Hc.bind(null, Ce, !0, r)), (r.dispatch = i), [t, i]);
				},
				useMemoCache: kc,
				useCacheRefresh: function () {
					return (Kt().memoizedState = $w.bind(null, Ce));
				},
				useEffectEvent: function (t) {
					var i = Kt(),
						r = { impl: t };
					return (
						(i.memoizedState = r),
						function () {
							if ((Ve & 2) !== 0) throw Error(l(440));
							return r.impl.apply(void 0, arguments);
						}
					);
				},
			},
			Zc = {
				readContext: Vt,
				use: Js,
				useCallback: hv,
				useContext: Vt,
				useEffect: Ic,
				useImperativeHandle: dv,
				useInsertionEffect: ov,
				useLayoutEffect: cv,
				useMemo: mv,
				useReducer: Ws,
				useRef: uv,
				useState: function () {
					return Ws(oi);
				},
				useDebugValue: Lc,
				useDeferredValue: function (t, i) {
					return vv(ht(), Fe.memoizedState, t, i);
				},
				useTransition: function () {
					var t = Ws(oi)[0],
						i = ht().memoizedState;
					return [typeof t == "boolean" ? t : pu(t), i];
				},
				useSyncExternalStore: Zm,
				useId: pv,
				useHostTransitionStatus: Vc,
				useFormState: iv,
				useActionState: iv,
				useOptimistic: function (t, i) {
					return Gm(ht(), Fe, t, i);
				},
				useMemoCache: kc,
				useCacheRefresh: Sv,
			};
		Zc.useEffectEvent = lv;
		var Cv = {
			readContext: Vt,
			use: Js,
			useCallback: hv,
			useContext: Vt,
			useEffect: Ic,
			useImperativeHandle: dv,
			useInsertionEffect: ov,
			useLayoutEffect: cv,
			useMemo: mv,
			useReducer: jc,
			useRef: uv,
			useState: function () {
				return jc(oi);
			},
			useDebugValue: Lc,
			useDeferredValue: function (t, i) {
				var r = ht();
				return Fe === null ? $c(r, t, i) : vv(r, Fe.memoizedState, t, i);
			},
			useTransition: function () {
				var t = jc(oi)[0],
					i = ht().memoizedState;
				return [typeof t == "boolean" ? t : pu(t), i];
			},
			useSyncExternalStore: Zm,
			useId: pv,
			useHostTransitionStatus: Vc,
			useFormState: rv,
			useActionState: rv,
			useOptimistic: function (t, i) {
				var r = ht();
				return Fe !== null ? Gm(r, Fe, t, i) : ((r.baseState = t), [t, r.queue.dispatch]);
			},
			useMemoCache: kc,
			useCacheRefresh: Sv,
		};
		Cv.useEffectEvent = lv;
		function Qc(t, i, r, s) {
			((i = t.memoizedState),
				(r = r(s, i)),
				(r = r == null ? i : p({}, i, r)),
				(t.memoizedState = r),
				t.lanes === 0 && (t.updateQueue.baseState = r));
		}
		var Pc = {
			enqueueSetState: function (t, i, r) {
				t = t._reactInternals;
				var s = Nn(),
					c = Ta(s);
				((c.payload = i), r != null && (c.callback = r), (i = Aa(t, c, s)), i !== null && (un(i, t, s), vu(i, t, s)));
			},
			enqueueReplaceState: function (t, i, r) {
				t = t._reactInternals;
				var s = Nn(),
					c = Ta(s);
				((c.tag = 1),
					(c.payload = i),
					r != null && (c.callback = r),
					(i = Aa(t, c, s)),
					i !== null && (un(i, t, s), vu(i, t, s)));
			},
			enqueueForceUpdate: function (t, i) {
				t = t._reactInternals;
				var r = Nn(),
					s = Ta(r);
				((s.tag = 2), i != null && (s.callback = i), (i = Aa(t, s, r)), i !== null && (un(i, t, r), vu(i, t, r)));
			},
		};
		function Tv(t, i, r, s, c, d, g) {
			return (
				(t = t.stateNode),
				typeof t.shouldComponentUpdate == "function"
					? t.shouldComponentUpdate(s, d, g)
					: i.prototype && i.prototype.isPureReactComponent
						? !su(r, s) || !su(c, d)
						: !0
			);
		}
		function Av(t, i, r, s) {
			((t = i.state),
				typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(r, s),
				typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(r, s),
				i.state !== t && Pc.enqueueReplaceState(i, i.state, null));
		}
		function Oa(t, i) {
			var r = i;
			if ("ref" in i) {
				r = {};
				for (var s in i) s !== "ref" && (r[s] = i[s]);
			}
			if ((t = t.defaultProps)) {
				r === i && (r = p({}, r));
				for (var c in t) r[c] === void 0 && (r[c] = t[c]);
			}
			return r;
		}
		function Vw(t) {
			Ds(t);
		}
		function Hw(t) {
			console.error(t);
		}
		function Zw(t) {
			Ds(t);
		}
		function il(t, i) {
			try {
				var r = t.onUncaughtError;
				r(i.value, { componentStack: i.stack });
			} catch (s) {
				setTimeout(function () {
					throw s;
				});
			}
		}
		function Rv(t, i, r) {
			try {
				var s = t.onCaughtError;
				s(r.value, { componentStack: r.stack, errorBoundary: i.tag === 1 ? i.stateNode : null });
			} catch (c) {
				setTimeout(function () {
					throw c;
				});
			}
		}
		function Yc(t, i, r) {
			return (
				(r = Ta(r)),
				(r.tag = 3),
				(r.payload = { element: null }),
				(r.callback = function () {
					il(t, i);
				}),
				r
			);
		}
		function Ov(t) {
			return ((t = Ta(t)), (t.tag = 3), t);
		}
		function Nv(t, i, r, s) {
			var c = r.type.getDerivedStateFromError;
			if (typeof c == "function") {
				var d = s.value;
				((t.payload = function () {
					return c(d);
				}),
					(t.callback = function () {
						Rv(i, r, s);
					}));
			}
			var g = r.stateNode;
			g !== null &&
				typeof g.componentDidCatch == "function" &&
				(t.callback = function () {
					(Rv(i, r, s), typeof c != "function" && (Qi === null ? (Qi = new Set([this])) : Qi.add(this)));
					var x = s.stack;
					this.componentDidCatch(s.value, { componentStack: x !== null ? x : "" });
				});
		}
		function Qw(t, i, r, s, c) {
			if (((r.flags |= 32768), s !== null && typeof s == "object" && typeof s.then == "function")) {
				if (((i = r.alternate), i !== null && lr(i, r, c, !0), (r = yn.current), r !== null)) {
					switch (r.tag) {
						case 31:
						case 13:
							return (
								On === null ? vl() : r.alternate === null && ct === 0 && (ct = 3),
								(r.flags &= -257),
								(r.flags |= 65536),
								(r.lanes = c),
								s === Zs
									? (r.flags |= 16384)
									: ((i = r.updateQueue), i === null ? (r.updateQueue = new Set([s])) : i.add(s), pf(t, s, c)),
								!1
							);
						case 22:
							return (
								(r.flags |= 65536),
								s === Zs
									? (r.flags |= 16384)
									: ((i = r.updateQueue),
										i === null
											? ((i = { transitions: null, markerInstances: null, retryQueue: new Set([s]) }),
												(r.updateQueue = i))
											: ((r = i.retryQueue), r === null ? (i.retryQueue = new Set([s])) : r.add(s)),
										pf(t, s, c)),
								!1
							);
					}
					throw Error(l(435, r.tag));
				}
				return (pf(t, s, c), vl(), !1);
			}
			if (qe)
				return (
					(i = yn.current),
					i !== null
						? ((i.flags & 65536) === 0 && (i.flags |= 256),
							(i.flags |= 65536),
							(i.lanes = c),
							s !== dc && ((t = Error(l(422), { cause: s })), cu(Cn(t, r))))
						: (s !== dc && ((i = Error(l(423), { cause: s })), cu(Cn(i, r))),
							(t = t.current.alternate),
							(t.flags |= 65536),
							(c &= -c),
							(t.lanes |= c),
							(s = Cn(s, r)),
							(c = Yc(t.stateNode, s, c)),
							xc(t, c),
							ct !== 4 && (ct = 2)),
					!1
				);
			var d = Error(l(520), { cause: s });
			if (((d = Cn(d, r)), Ou === null ? (Ou = [d]) : Ou.push(d), ct !== 4 && (ct = 2), i === null)) return !0;
			((s = Cn(s, r)), (r = i));
			do {
				switch (r.tag) {
					case 3:
						return ((r.flags |= 65536), (t = c & -c), (r.lanes |= t), (t = Yc(r.stateNode, s, t)), xc(r, t), !1);
					case 1:
						if (
							((i = r.type),
							(d = r.stateNode),
							(r.flags & 128) === 0 &&
								(typeof i.getDerivedStateFromError == "function" ||
									(d !== null && typeof d.componentDidCatch == "function" && (Qi === null || !Qi.has(d)))))
						)
							return ((r.flags |= 65536), (c &= -c), (r.lanes |= c), (c = Ov(c)), Nv(c, t, r, s), xc(r, c), !1);
				}
				r = r.return;
			} while (r !== null);
			return !1;
		}
		var Fc = Error(l(461)),
			wt = !1;
		function Ht(t, i, r, s) {
			i.child = t === null ? Um(i, null, r, s) : Ca(i, t.child, r, s);
		}
		function Mv(t, i, r, s, c) {
			r = r.render;
			var d = i.ref;
			if ("ref" in s) {
				var g = {};
				for (var x in s) x !== "ref" && (g[x] = s[x]);
			} else g = s;
			return (
				wa(i),
				(s = Oc(t, i, r, g, d, c)),
				(x = Nc()),
				t !== null && !wt ? (Mc(t, i, c), ci(t, i, c)) : (qe && x && cc(i), (i.flags |= 1), Ht(t, i, s, c), i.child)
			);
		}
		function zv(t, i, r, s, c) {
			if (t === null) {
				var d = r.type;
				return typeof d == "function" && !sc(d) && d.defaultProps === void 0 && r.compare === null
					? ((i.tag = 15), (i.type = d), kv(t, i, d, s, c))
					: ((t = Is(r.type, null, s, i, i.mode, c)), (t.ref = i.ref), (t.return = i), (i.child = t));
			}
			if (((d = t.child), !nf(t, c))) {
				var g = d.memoizedProps;
				if (((r = r.compare), (r = r !== null ? r : su), r(g, s) && t.ref === i.ref)) return ci(t, i, c);
			}
			return ((i.flags |= 1), (t = ai(d, s)), (t.ref = i.ref), (t.return = i), (i.child = t));
		}
		function kv(t, i, r, s, c) {
			if (t !== null) {
				var d = t.memoizedProps;
				if (su(d, s) && t.ref === i.ref)
					if (((wt = !1), (i.pendingProps = s = d), nf(t, c))) (t.flags & 131072) !== 0 && (wt = !0);
					else return ((i.lanes = t.lanes), ci(t, i, c));
			}
			return Kc(t, i, r, s, c);
		}
		function Dv(t, i, r, s) {
			var c = s.children,
				d = t !== null ? t.memoizedState : null;
			if (
				(t === null &&
					i.stateNode === null &&
					(i.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				s.mode === "hidden")
			) {
				if ((i.flags & 128) !== 0) {
					if (((d = d !== null ? d.baseLanes | r : r), t !== null)) {
						for (s = i.child = t.child, c = 0; s !== null; ) ((c = c | s.lanes | s.childLanes), (s = s.sibling));
						s = c & ~d;
					} else ((s = 0), (i.child = null));
					return jv(t, i, d, r, s);
				}
				if ((r & 536870912) !== 0)
					((i.memoizedState = { baseLanes: 0, cachePool: null }),
						t !== null && Vs(i, d !== null ? d.cachePool : null),
						d !== null ? $m(i, d) : Cc(),
						Bm(i));
				else return ((s = i.lanes = 536870912), jv(t, i, d !== null ? d.baseLanes | r : r, r, s));
			} else
				d !== null
					? (Vs(i, d.cachePool), $m(i, d), Bi(i), (i.memoizedState = null))
					: (t !== null && Vs(i, null), Cc(), Bi(i));
			return (Ht(t, i, c, r), i.child);
		}
		function _u(t, i) {
			return (
				(t !== null && t.tag === 22) ||
					i.stateNode !== null ||
					(i.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
				i.sibling
			);
		}
		function jv(t, i, r, s, c) {
			var d = pc();
			return (
				(d = d === null ? null : { parent: pt._currentValue, pool: d }),
				(i.memoizedState = { baseLanes: r, cachePool: d }),
				t !== null && Vs(i, null),
				Cc(),
				Bm(i),
				t !== null && lr(t, i, s, !0),
				(i.childLanes = c),
				null
			);
		}
		function al(t, i) {
			return (
				(i = ul({ mode: i.mode, children: i.children }, t.mode)),
				(i.ref = t.ref),
				(t.child = i),
				(i.return = t),
				i
			);
		}
		function qv(t, i, r) {
			return (Ca(i, t.child, null, r), (t = al(i, i.pendingProps)), (t.flags |= 2), bn(i), (i.memoizedState = null), t);
		}
		function Pw(t, i, r) {
			var s = i.pendingProps,
				c = (i.flags & 128) !== 0;
			if (((i.flags &= -129), t === null)) {
				if (qe) {
					if (s.mode === "hidden") return ((t = al(i, s)), (i.lanes = 536870912), _u(null, t));
					if (
						(Ac(i),
						(t = et)
							? ((t = Kg(t, Rn)),
								(t = t !== null && t.data === "&" ? t : null),
								t !== null &&
									((i.memoizedState = {
										dehydrated: t,
										treeContext: ji !== null ? { id: Zn, overflow: Qn } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(r = _m(t)),
									(r.return = i),
									(i.child = r),
									(Bt = i),
									(et = null)))
							: (t = null),
						t === null)
					)
						throw Ui(i);
					return ((i.lanes = 536870912), null);
				}
				return al(i, s);
			}
			var d = t.memoizedState;
			if (d !== null) {
				var g = d.dehydrated;
				if ((Ac(i), c))
					if (i.flags & 256) ((i.flags &= -257), (i = qv(t, i, r)));
					else if (i.memoizedState !== null) ((i.child = t.child), (i.flags |= 128), (i = null));
					else throw Error(l(558));
				else if ((wt || lr(t, i, r, !1), (c = (r & t.childLanes) !== 0), wt || c)) {
					if (((s = Je), s !== null && ((g = Rh(s, r)), g !== 0 && g !== d.retryLane)))
						throw ((d.retryLane = g), ya(t, g), un(s, t, g), Fc);
					(vl(), (i = qv(t, i, r)));
				} else
					((t = d.treeContext),
						(et = Mn(g.nextSibling)),
						(Bt = i),
						(qe = !0),
						(qi = null),
						(Rn = !1),
						t !== null && Cm(i, t),
						(i = al(i, s)),
						(i.flags |= 4096));
				return i;
			}
			return (
				(t = ai(t.child, { mode: s.mode, children: s.children })),
				(t.ref = i.ref),
				(i.child = t),
				(t.return = i),
				t
			);
		}
		function rl(t, i) {
			var r = i.ref;
			if (r === null) t !== null && t.ref !== null && (i.flags |= 4194816);
			else {
				if (typeof r != "function" && typeof r != "object") throw Error(l(284));
				(t === null || t.ref !== r) && (i.flags |= 4194816);
			}
		}
		function Kc(t, i, r, s, c) {
			return (
				wa(i),
				(r = Oc(t, i, r, s, void 0, c)),
				(s = Nc()),
				t !== null && !wt ? (Mc(t, i, c), ci(t, i, c)) : (qe && s && cc(i), (i.flags |= 1), Ht(t, i, r, c), i.child)
			);
		}
		function Uv(t, i, r, s, c, d) {
			return (
				wa(i),
				(i.updateQueue = null),
				(r = Hm(i, s, r, c)),
				Vm(t),
				(s = Nc()),
				t !== null && !wt ? (Mc(t, i, d), ci(t, i, d)) : (qe && s && cc(i), (i.flags |= 1), Ht(t, i, r, d), i.child)
			);
		}
		function Iv(t, i, r, s, c) {
			if ((wa(i), i.stateNode === null)) {
				var d = ar,
					g = r.contextType;
				(typeof g == "object" && g !== null && (d = Vt(g)),
					(d = new r(s, d)),
					(i.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null),
					(d.updater = Pc),
					(i.stateNode = d),
					(d._reactInternals = i),
					(d = i.stateNode),
					(d.props = s),
					(d.state = i.memoizedState),
					(d.refs = {}),
					wc(i),
					(g = r.contextType),
					(d.context = typeof g == "object" && g !== null ? Vt(g) : ar),
					(d.state = i.memoizedState),
					(g = r.getDerivedStateFromProps),
					typeof g == "function" && (Qc(i, r, g, s), (d.state = i.memoizedState)),
					typeof r.getDerivedStateFromProps == "function" ||
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
					z = Oa(r, x);
				d.props = z;
				var P = d.context,
					X = r.contextType;
				((g = ar), typeof X == "object" && X !== null && (g = Vt(X)));
				var W = r.getDerivedStateFromProps;
				((X = typeof W == "function" || typeof d.getSnapshotBeforeUpdate == "function"),
					(x = i.pendingProps !== x),
					X ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((x || P !== g) && Av(i, d, s, g)),
					(Li = !1));
				var Y = i.memoizedState;
				((d.state = Y),
					yu(i, s, d, c),
					gu(),
					(P = i.memoizedState),
					x || Y !== P || Li
						? (typeof W == "function" && (Qc(i, r, W, s), (P = i.memoizedState)),
							(z = Li || Tv(i, r, z, s, Y, P, g))
								? (X ||
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
							(s = z))
						: (typeof d.componentDidMount == "function" && (i.flags |= 4194308), (s = !1)));
			} else {
				((d = i.stateNode),
					_c(t, i),
					(g = i.memoizedProps),
					(X = Oa(r, g)),
					(d.props = X),
					(W = i.pendingProps),
					(Y = d.context),
					(P = r.contextType),
					(z = ar),
					typeof P == "object" && P !== null && (z = Vt(P)),
					(x = r.getDerivedStateFromProps),
					(P = typeof x == "function" || typeof d.getSnapshotBeforeUpdate == "function") ||
						(typeof d.UNSAFE_componentWillReceiveProps != "function" &&
							typeof d.componentWillReceiveProps != "function") ||
						((g !== W || Y !== z) && Av(i, d, s, z)),
					(Li = !1),
					(Y = i.memoizedState),
					(d.state = Y),
					yu(i, s, d, c),
					gu());
				var F = i.memoizedState;
				g !== W || Y !== F || Li || (t !== null && t.dependencies !== null && $s(t.dependencies))
					? (typeof x == "function" && (Qc(i, r, x, s), (F = i.memoizedState)),
						(X = Li || Tv(i, r, X, s, Y, F, z) || (t !== null && t.dependencies !== null && $s(t.dependencies)))
							? (P ||
									(typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function") ||
									(typeof d.componentWillUpdate == "function" && d.componentWillUpdate(s, F, z),
									typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(s, F, z)),
								typeof d.componentDidUpdate == "function" && (i.flags |= 4),
								typeof d.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024))
							: (typeof d.componentDidUpdate != "function" ||
									(g === t.memoizedProps && Y === t.memoizedState) ||
									(i.flags |= 4),
								typeof d.getSnapshotBeforeUpdate != "function" ||
									(g === t.memoizedProps && Y === t.memoizedState) ||
									(i.flags |= 1024),
								(i.memoizedProps = s),
								(i.memoizedState = F)),
						(d.props = s),
						(d.state = F),
						(d.context = z),
						(s = X))
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
				rl(t, i),
				(s = (i.flags & 128) !== 0),
				d || s
					? ((d = i.stateNode),
						(r = s && typeof r.getDerivedStateFromError != "function" ? null : d.render()),
						(i.flags |= 1),
						t !== null && s ? ((i.child = Ca(i, t.child, null, c)), (i.child = Ca(i, null, r, c))) : Ht(t, i, r, c),
						(i.memoizedState = d.state),
						(t = i.child))
					: (t = ci(t, i, c)),
				t
			);
		}
		function Lv(t, i, r, s) {
			return (pa(), (i.flags |= 256), Ht(t, i, r, s), i.child);
		}
		var Gc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
		function Xc(t) {
			return { baseLanes: t, cachePool: Mm() };
		}
		function Jc(t, i, r) {
			return ((t = t !== null ? t.childLanes & ~r : 0), i && (t |= Sn), t);
		}
		function $v(t, i, r) {
			var s = i.pendingProps,
				c = !1,
				d = (i.flags & 128) !== 0,
				g;
			if (
				((g = d) || (g = t !== null && t.memoizedState === null ? !1 : (dt.current & 2) !== 0),
				g && ((c = !0), (i.flags &= -129)),
				(g = (i.flags & 32) !== 0),
				(i.flags &= -33),
				t === null)
			) {
				if (qe) {
					if (
						(c ? $i(i) : Bi(i),
						(t = et)
							? ((t = Kg(t, Rn)),
								(t = t !== null && t.data !== "&" ? t : null),
								t !== null &&
									((i.memoizedState = {
										dehydrated: t,
										treeContext: ji !== null ? { id: Zn, overflow: Qn } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(r = _m(t)),
									(r.return = i),
									(i.child = r),
									(Bt = i),
									(et = null)))
							: (t = null),
						t === null)
					)
						throw Ui(i);
					return (Df(t) ? (i.lanes = 32) : (i.lanes = 536870912), null);
				}
				var x = s.children;
				return (
					(s = s.fallback),
					c
						? (Bi(i),
							(c = i.mode),
							(x = ul({ mode: "hidden", children: x }, c)),
							(s = ba(s, c, r, null)),
							(x.return = i),
							(s.return = i),
							(x.sibling = s),
							(i.child = x),
							(s = i.child),
							(s.memoizedState = Xc(r)),
							(s.childLanes = Jc(t, g, r)),
							(i.memoizedState = Gc),
							_u(null, s))
						: ($i(i), Wc(i, x))
				);
			}
			var z = t.memoizedState;
			if (z !== null && ((x = z.dehydrated), x !== null)) {
				if (d)
					i.flags & 256
						? ($i(i), (i.flags &= -257), (i = ef(t, i, r)))
						: i.memoizedState !== null
							? (Bi(i), (i.child = t.child), (i.flags |= 128), (i = null))
							: (Bi(i),
								(x = s.fallback),
								(c = i.mode),
								(s = ul({ mode: "visible", children: s.children }, c)),
								(x = ba(x, c, r, null)),
								(x.flags |= 2),
								(s.return = i),
								(x.return = i),
								(s.sibling = x),
								(i.child = s),
								Ca(i, t.child, null, r),
								(s = i.child),
								(s.memoizedState = Xc(r)),
								(s.childLanes = Jc(t, g, r)),
								(i.memoizedState = Gc),
								(i = _u(null, s)));
				else if (($i(i), Df(x))) {
					if (((g = x.nextSibling && x.nextSibling.dataset), g)) var P = g.dgst;
					((g = P),
						(s = Error(l(419))),
						(s.stack = ""),
						(s.digest = g),
						cu({ value: s, source: null, stack: null }),
						(i = ef(t, i, r)));
				} else if ((wt || lr(t, i, r, !1), (g = (r & t.childLanes) !== 0), wt || g)) {
					if (((g = Je), g !== null && ((s = Rh(g, r)), s !== 0 && s !== z.retryLane)))
						throw ((z.retryLane = s), ya(t, s), un(g, t, s), Fc);
					(kf(x) || vl(), (i = ef(t, i, r)));
				} else
					kf(x)
						? ((i.flags |= 192), (i.child = t.child), (i = null))
						: ((t = z.treeContext),
							(et = Mn(x.nextSibling)),
							(Bt = i),
							(qe = !0),
							(qi = null),
							(Rn = !1),
							t !== null && Cm(i, t),
							(i = Wc(i, s.children)),
							(i.flags |= 4096));
				return i;
			}
			return c
				? (Bi(i),
					(x = s.fallback),
					(c = i.mode),
					(z = t.child),
					(P = z.sibling),
					(s = ai(z, { mode: "hidden", children: s.children })),
					(s.subtreeFlags = z.subtreeFlags & 65011712),
					P !== null ? (x = ai(P, x)) : ((x = ba(x, c, r, null)), (x.flags |= 2)),
					(x.return = i),
					(s.return = i),
					(s.sibling = x),
					(i.child = s),
					_u(null, s),
					(s = i.child),
					(x = t.child.memoizedState),
					x === null
						? (x = Xc(r))
						: ((c = x.cachePool),
							c !== null ? ((z = pt._currentValue), (c = c.parent !== z ? { parent: z, pool: z } : c)) : (c = Mm()),
							(x = { baseLanes: x.baseLanes | r, cachePool: c })),
					(s.memoizedState = x),
					(s.childLanes = Jc(t, g, r)),
					(i.memoizedState = Gc),
					_u(t.child, s))
				: ($i(i),
					(r = t.child),
					(t = r.sibling),
					(r = ai(r, { mode: "visible", children: s.children })),
					(r.return = i),
					(r.sibling = null),
					t !== null && ((g = i.deletions), g === null ? ((i.deletions = [t]), (i.flags |= 16)) : g.push(t)),
					(i.child = r),
					(i.memoizedState = null),
					r);
		}
		function Wc(t, i) {
			return ((i = ul({ mode: "visible", children: i }, t.mode)), (i.return = t), (t.child = i));
		}
		function ul(t, i) {
			return ((t = gn(22, t, null, i)), (t.lanes = 0), t);
		}
		function ef(t, i, r) {
			return (
				Ca(i, t.child, null, r),
				(t = Wc(i, i.pendingProps.children)),
				(t.flags |= 2),
				(i.memoizedState = null),
				t
			);
		}
		function Bv(t, i, r) {
			t.lanes |= i;
			var s = t.alternate;
			(s !== null && (s.lanes |= i), vc(t.return, i, r));
		}
		function tf(t, i, r, s, c, d) {
			var g = t.memoizedState;
			g === null
				? (t.memoizedState = {
						isBackwards: i,
						rendering: null,
						renderingStartTime: 0,
						last: s,
						tail: r,
						tailMode: c,
						treeForkCount: d,
					})
				: ((g.isBackwards = i),
					(g.rendering = null),
					(g.renderingStartTime = 0),
					(g.last = s),
					(g.tail = r),
					(g.tailMode = c),
					(g.treeForkCount = d));
		}
		function Vv(t, i, r) {
			var s = i.pendingProps,
				c = s.revealOrder,
				d = s.tail;
			s = s.children;
			var g = dt.current,
				x = (g & 2) !== 0;
			if (
				(x ? ((g = (g & 1) | 2), (i.flags |= 128)) : (g &= 1),
				ae(dt, g),
				Ht(t, i, s, r),
				(s = qe ? ou : 0),
				!x && t !== null && (t.flags & 128) !== 0)
			)
				e: for (t = i.child; t !== null; ) {
					if (t.tag === 13) t.memoizedState !== null && Bv(t, r, i);
					else if (t.tag === 19) Bv(t, r, i);
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
						((t = r.alternate), t !== null && Fs(t) === null && (c = r), (r = r.sibling));
					((r = c),
						r === null ? ((c = i.child), (i.child = null)) : ((c = r.sibling), (r.sibling = null)),
						tf(i, !1, c, r, d, s));
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (r = null, c = i.child, i.child = null; c !== null; ) {
						if (((t = c.alternate), t !== null && Fs(t) === null)) {
							i.child = c;
							break;
						}
						((t = c.sibling), (c.sibling = r), (r = c), (c = t));
					}
					tf(i, !0, r, null, d, s);
					break;
				case "together":
					tf(i, !1, null, null, void 0, s);
					break;
				default:
					i.memoizedState = null;
			}
			return i.child;
		}
		function ci(t, i, r) {
			if ((t !== null && (i.dependencies = t.dependencies), (Zi |= i.lanes), (r & i.childLanes) === 0))
				if (t !== null) {
					if ((lr(t, i, r, !1), (r & i.childLanes) === 0)) return null;
				} else return null;
			if (t !== null && i.child !== t.child) throw Error(l(153));
			if (i.child !== null) {
				for (t = i.child, r = ai(t, t.pendingProps), i.child = r, r.return = i; t.sibling !== null; )
					((t = t.sibling), (r = r.sibling = ai(t, t.pendingProps)), (r.return = i));
				r.sibling = null;
			}
			return i.child;
		}
		function nf(t, i) {
			return (t.lanes & i) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && $s(t)));
		}
		function Yw(t, i, r) {
			switch (i.tag) {
				case 3:
					(Ze(i, i.stateNode.containerInfo), Ii(i, pt, t.memoizedState.cache), pa());
					break;
				case 27:
				case 5:
					st(i);
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
							? ($i(i), (i.flags |= 128), null)
							: (r & i.child.childLanes) !== 0
								? $v(t, i, r)
								: ($i(i), (t = ci(t, i, r)), t !== null ? t.sibling : null);
					$i(i);
					break;
				case 19:
					var c = (t.flags & 128) !== 0;
					if (((s = (r & i.childLanes) !== 0), s || (lr(t, i, r, !1), (s = (r & i.childLanes) !== 0)), c)) {
						if (s) return Vv(t, i, r);
						i.flags |= 128;
					}
					if (
						((c = i.memoizedState),
						c !== null && ((c.rendering = null), (c.tail = null), (c.lastEffect = null)),
						ae(dt, dt.current),
						s)
					)
						break;
					return null;
				case 22:
					return ((i.lanes = 0), Dv(t, i, r, i.pendingProps));
				case 24:
					Ii(i, pt, t.memoizedState.cache);
			}
			return ci(t, i, r);
		}
		function Hv(t, i, r) {
			if (t !== null)
				if (t.memoizedProps !== i.pendingProps) wt = !0;
				else {
					if (!nf(t, r) && (i.flags & 128) === 0) return ((wt = !1), Yw(t, i, r));
					wt = (t.flags & 131072) !== 0;
				}
			else ((wt = !1), qe && (i.flags & 1048576) !== 0 && Em(i, ou, i.index));
			switch (((i.lanes = 0), i.tag)) {
				case 16:
					e: {
						var s = i.pendingProps;
						if (((t = xa(i.elementType)), (i.type = t), typeof t == "function"))
							sc(t)
								? ((s = Oa(t, s)), (i.tag = 1), (i = Iv(null, i, t, s, r)))
								: ((i.tag = 0), (i = Kc(null, i, t, s, r)));
						else {
							if (t != null) {
								var c = t.$$typeof;
								if (c === N) {
									((i.tag = 11), (i = Mv(null, i, t, s, r)));
									break e;
								} else if (c === j) {
									((i.tag = 14), (i = zv(null, i, t, s, r)));
									break e;
								}
							}
							throw ((i = ie(t) || t), Error(l(306, i, "")));
						}
					}
					return i;
				case 0:
					return Kc(t, i, i.type, i.pendingProps, r);
				case 1:
					return ((s = i.type), (c = Oa(s, i.pendingProps)), Iv(t, i, s, c, r));
				case 3:
					e: {
						if ((Ze(i, i.stateNode.containerInfo), t === null)) throw Error(l(387));
						s = i.pendingProps;
						var d = i.memoizedState;
						((c = d.element), _c(t, i), yu(i, s, null, r));
						var g = i.memoizedState;
						if (
							((s = g.cache), Ii(i, pt, s), s !== d.cache && gc(i, [pt], r, !0), gu(), (s = g.element), d.isDehydrated)
						)
							if (
								((d = { element: s, isDehydrated: !1, cache: g.cache }),
								(i.updateQueue.baseState = d),
								(i.memoizedState = d),
								i.flags & 256)
							) {
								i = Lv(t, i, s, r);
								break e;
							} else if (s !== c) {
								((c = Cn(Error(l(424)), i)), cu(c), (i = Lv(t, i, s, r)));
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
									et = Mn(t.firstChild), Bt = i, qe = !0, qi = null, Rn = !0, r = Um(i, null, s, r), i.child = r;
									r;
								)
									((r.flags = (r.flags & -3) | 4096), (r = r.sibling));
							}
						else {
							if ((pa(), s === c)) {
								i = ci(t, i, r);
								break e;
							}
							Ht(t, i, s, r);
						}
						i = i.child;
					}
					return i;
				case 26:
					return (
						rl(t, i),
						t === null
							? (r = ty(i.type, null, i.pendingProps, null))
								? (i.memoizedState = r)
								: qe ||
									((r = i.type),
									(t = i.pendingProps),
									(s = _l(ge.current).createElement(r)),
									(s[$t] = i),
									(s[Wt] = t),
									Zt(s, r, t),
									qt(s),
									(i.stateNode = s))
							: (i.memoizedState = ty(i.type, t.memoizedProps, i.pendingProps, t.memoizedState)),
						null
					);
				case 27:
					return (
						st(i),
						t === null &&
							qe &&
							((s = i.stateNode = Jg(i.type, i.pendingProps, ge.current)),
							(Bt = i),
							(Rn = !0),
							(c = et),
							Ki(i.type) ? ((jf = c), (et = Mn(s.firstChild))) : (et = c)),
						Ht(t, i, i.pendingProps.children, r),
						rl(t, i),
						t === null && (i.flags |= 4194304),
						i.child
					);
				case 5:
					return (
						t === null &&
							qe &&
							((c = s = et) &&
								((s = w_(s, i.type, i.pendingProps, Rn)),
								s !== null ? ((i.stateNode = s), (Bt = i), (et = Mn(s.firstChild)), (Rn = !1), (c = !0)) : (c = !1)),
							c || Ui(i)),
						st(i),
						(c = i.type),
						(d = i.pendingProps),
						(g = t !== null ? t.memoizedProps : null),
						(s = d.children),
						Nf(c, d) ? (s = null) : g !== null && Nf(c, g) && (i.flags |= 32),
						i.memoizedState !== null && ((c = Oc(t, i, jw, null, null, r)), (Uu._currentValue = c)),
						rl(t, i),
						Ht(t, i, s, r),
						i.child
					);
				case 6:
					return (
						t === null &&
							qe &&
							((t = r = et) &&
								((r = __(r, i.pendingProps, Rn)),
								r !== null ? ((i.stateNode = r), (Bt = i), (et = null), (t = !0)) : (t = !1)),
							t || Ui(i)),
						null
					);
				case 13:
					return $v(t, i, r);
				case 4:
					return (
						Ze(i, i.stateNode.containerInfo),
						(s = i.pendingProps),
						t === null ? (i.child = Ca(i, null, s, r)) : Ht(t, i, s, r),
						i.child
					);
				case 11:
					return Mv(t, i, i.type, i.pendingProps, r);
				case 7:
					return (Ht(t, i, i.pendingProps, r), i.child);
				case 8:
					return (Ht(t, i, i.pendingProps.children, r), i.child);
				case 12:
					return (Ht(t, i, i.pendingProps.children, r), i.child);
				case 10:
					return ((s = i.pendingProps), Ii(i, i.type, s.value), Ht(t, i, s.children, r), i.child);
				case 9:
					return (
						(c = i.type._context),
						(s = i.pendingProps.children),
						wa(i),
						(c = Vt(c)),
						(s = s(c)),
						(i.flags |= 1),
						Ht(t, i, s, r),
						i.child
					);
				case 14:
					return zv(t, i, i.type, i.pendingProps, r);
				case 15:
					return kv(t, i, i.type, i.pendingProps, r);
				case 19:
					return Vv(t, i, r);
				case 31:
					return Pw(t, i, r);
				case 22:
					return Dv(t, i, r, i.pendingProps);
				case 24:
					return (
						wa(i),
						(s = Vt(pt)),
						t === null
							? ((c = pc()),
								c === null &&
									((c = Je),
									(d = yc()),
									(c.pooledCache = d),
									d.refCount++,
									d !== null && (c.pooledCacheLanes |= r),
									(c = d)),
								(i.memoizedState = { parent: s, cache: c }),
								wc(i),
								Ii(i, pt, c))
							: ((t.lanes & r) !== 0 && (_c(t, i), yu(i, null, null, r), gu()),
								(c = t.memoizedState),
								(d = i.memoizedState),
								c.parent !== s
									? ((c = { parent: s, cache: s }),
										(i.memoizedState = c),
										i.lanes === 0 && (i.memoizedState = i.updateQueue.baseState = c),
										Ii(i, pt, s))
									: ((s = d.cache), Ii(i, pt, s), s !== c.cache && gc(i, [pt], r, !0))),
						Ht(t, i, i.pendingProps.children, r),
						i.child
					);
				case 29:
					throw i.pendingProps;
			}
			throw Error(l(156, i.tag));
		}
		function fi(t) {
			t.flags |= 4;
		}
		function af(t, i, r, s, c) {
			if (((i = (t.mode & 32) !== 0) && (i = !1), i)) {
				if (((t.flags |= 16777216), (c & 335544128) === c))
					if (t.stateNode.complete) t.flags |= 8192;
					else if (gg()) t.flags |= 8192;
					else throw ((Ea = Zs), Sc);
			} else t.flags &= -16777217;
		}
		function Zv(t, i) {
			if (i.type !== "stylesheet" || (i.state.loading & 4) !== 0) t.flags &= -16777217;
			else if (((t.flags |= 16777216), !uy(i)))
				if (gg()) t.flags |= 8192;
				else throw ((Ea = Zs), Sc);
		}
		function sl(t, i) {
			(i !== null && (t.flags |= 4),
				t.flags & 16384 && ((i = t.tag !== 22 ? Ch() : 536870912), (t.lanes |= i), (Sr |= i)));
		}
		function xu(t, i) {
			if (!qe)
				switch (t.tailMode) {
					case "hidden":
						i = t.tail;
						for (var r = null; i !== null; ) (i.alternate !== null && (r = i), (i = i.sibling));
						r === null ? (t.tail = null) : (r.sibling = null);
						break;
					case "collapsed":
						r = t.tail;
						for (var s = null; r !== null; ) (r.alternate !== null && (s = r), (r = r.sibling));
						s === null ? (i || t.tail === null ? (t.tail = null) : (t.tail.sibling = null)) : (s.sibling = null);
				}
		}
		function tt(t) {
			var i = t.alternate !== null && t.alternate.child === t.child,
				r = 0,
				s = 0;
			if (i)
				for (var c = t.child; c !== null; )
					((r |= c.lanes | c.childLanes),
						(s |= c.subtreeFlags & 65011712),
						(s |= c.flags & 65011712),
						(c.return = t),
						(c = c.sibling));
			else
				for (c = t.child; c !== null; )
					((r |= c.lanes | c.childLanes), (s |= c.subtreeFlags), (s |= c.flags), (c.return = t), (c = c.sibling));
			return ((t.subtreeFlags |= s), (t.childLanes = r), i);
		}
		function Fw(t, i, r) {
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
						(r = i.stateNode),
						(s = null),
						t !== null && (s = t.memoizedState.cache),
						i.memoizedState.cache !== s && (i.flags |= 2048),
						si(pt),
						Oe(),
						r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
						(t === null || t.child === null) &&
							(sr(i)
								? fi(i)
								: t === null || (t.memoizedState.isDehydrated && (i.flags & 256) === 0) || ((i.flags |= 1024), hc())),
						tt(i),
						null
					);
				case 26:
					var c = i.type,
						d = i.memoizedState;
					return (
						t === null
							? (fi(i), d !== null ? (tt(i), Zv(i, d)) : (tt(i), af(i, c, null, s, r)))
							: d
								? d !== t.memoizedState
									? (fi(i), tt(i), Zv(i, d))
									: (tt(i), (i.flags &= -16777217))
								: ((t = t.memoizedProps), t !== s && fi(i), tt(i), af(i, c, t, s, r)),
						null
					);
				case 27:
					if ((Dt(i), (r = ge.current), (c = i.type), t !== null && i.stateNode != null))
						t.memoizedProps !== s && fi(i);
					else {
						if (!s) {
							if (i.stateNode === null) throw Error(l(166));
							return (tt(i), null);
						}
						((t = se.current), sr(i) ? Tm(i, t) : ((t = Jg(c, s, r)), (i.stateNode = t), fi(i)));
					}
					return (tt(i), null);
				case 5:
					if ((Dt(i), (c = i.type), t !== null && i.stateNode != null)) t.memoizedProps !== s && fi(i);
					else {
						if (!s) {
							if (i.stateNode === null) throw Error(l(166));
							return (tt(i), null);
						}
						if (((d = se.current), sr(i))) Tm(i, d);
						else {
							var g = _l(ge.current);
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
							((d[$t] = i), (d[Wt] = s));
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
							s && fi(i);
						}
					}
					return (tt(i), af(i, i.type, t === null ? null : t.memoizedProps, i.pendingProps, r), null);
				case 6:
					if (t && i.stateNode != null) t.memoizedProps !== s && fi(i);
					else {
						if (typeof s != "string" && i.stateNode === null) throw Error(l(166));
						if (((t = ge.current), sr(i))) {
							if (((t = i.stateNode), (r = i.memoizedProps), (s = null), (c = Bt), c !== null))
								switch (c.tag) {
									case 27:
									case 5:
										s = c.memoizedProps;
								}
							((t[$t] = i),
								(t = !!(t.nodeValue === r || (s !== null && s.suppressHydrationWarning === !0) || Bg(t.nodeValue, r))),
								t || Ui(i, !0));
						} else ((t = _l(t).createTextNode(s)), (t[$t] = i), (i.stateNode = t));
					}
					return (tt(i), null);
				case 31:
					if (((r = i.memoizedState), t === null || t.memoizedState !== null)) {
						if (((s = sr(i)), r !== null)) {
							if (t === null) {
								if (!s) throw Error(l(318));
								if (((t = i.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(l(557));
								t[$t] = i;
							} else (pa(), (i.flags & 128) === 0 && (i.memoizedState = null), (i.flags |= 4));
							(tt(i), (t = !1));
						} else
							((r = hc()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = r), (t = !0));
						if (!t) return i.flags & 256 ? (bn(i), i) : (bn(i), null);
						if ((i.flags & 128) !== 0) throw Error(l(558));
					}
					return (tt(i), null);
				case 13:
					if (
						((s = i.memoizedState), t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
					) {
						if (((c = sr(i)), s !== null && s.dehydrated !== null)) {
							if (t === null) {
								if (!c) throw Error(l(318));
								if (((c = i.memoizedState), (c = c !== null ? c.dehydrated : null), !c)) throw Error(l(317));
								c[$t] = i;
							} else (pa(), (i.flags & 128) === 0 && (i.memoizedState = null), (i.flags |= 4));
							(tt(i), (c = !1));
						} else
							((c = hc()), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = c), (c = !0));
						if (!c) return i.flags & 256 ? (bn(i), i) : (bn(i), null);
					}
					return (
						bn(i),
						(i.flags & 128) !== 0
							? ((i.lanes = r), i)
							: ((r = s !== null),
								(t = t !== null && t.memoizedState !== null),
								r &&
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
								r !== t && r && (i.child.flags |= 8192),
								sl(i, i.updateQueue),
								tt(i),
								null)
					);
				case 4:
					return (Oe(), t === null && Ug(i.stateNode.containerInfo), tt(i), null);
				case 10:
					return (si(i.type), tt(i), null);
				case 19:
					if ((G(dt), (s = i.memoizedState), s === null)) return (tt(i), null);
					if (((c = (i.flags & 128) !== 0), (d = s.rendering), d === null))
						if (c) xu(s, !1);
						else {
							if (ct !== 0 || (t !== null && (t.flags & 128) !== 0))
								for (t = i.child; t !== null; ) {
									if (((d = Fs(t)), d !== null)) {
										for (
											i.flags |= 128,
												xu(s, !1),
												t = d.updateQueue,
												i.updateQueue = t,
												sl(i, t),
												i.subtreeFlags = 0,
												t = r,
												r = i.child;
											r !== null;
										)
											(wm(r, t), (r = r.sibling));
										return (ae(dt, (dt.current & 1) | 2), qe && ri(i, s.treeForkCount), i.child);
									}
									t = t.sibling;
								}
							s.tail !== null && je() > dl && ((i.flags |= 128), (c = !0), xu(s, !1), (i.lanes = 4194304));
						}
					else {
						if (!c)
							if (((t = Fs(d)), t !== null)) {
								if (
									((i.flags |= 128),
									(c = !0),
									(t = t.updateQueue),
									(i.updateQueue = t),
									sl(i, t),
									xu(s, !0),
									s.tail === null && s.tailMode === "hidden" && !d.alternate && !qe)
								)
									return (tt(i), null);
							} else
								2 * je() - s.renderingStartTime > dl &&
									r !== 536870912 &&
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
							(r = dt.current),
							ae(dt, c ? (r & 1) | 2 : r & 1),
							qe && ri(i, s.treeForkCount),
							t)
						: (tt(i), null);
				case 22:
				case 23:
					return (
						bn(i),
						Tc(),
						(s = i.memoizedState !== null),
						t !== null ? (t.memoizedState !== null) !== s && (i.flags |= 8192) : s && (i.flags |= 8192),
						s
							? (r & 536870912) !== 0 && (i.flags & 128) === 0 && (tt(i), i.subtreeFlags & 6 && (i.flags |= 8192))
							: tt(i),
						(r = i.updateQueue),
						r !== null && sl(i, r.retryQueue),
						(r = null),
						t !== null &&
							t.memoizedState !== null &&
							t.memoizedState.cachePool !== null &&
							(r = t.memoizedState.cachePool.pool),
						(s = null),
						i.memoizedState !== null && i.memoizedState.cachePool !== null && (s = i.memoizedState.cachePool.pool),
						s !== r && (i.flags |= 2048),
						t !== null && G(_a),
						null
					);
				case 24:
					return (
						(r = null),
						t !== null && (r = t.memoizedState.cache),
						i.memoizedState.cache !== r && (i.flags |= 2048),
						si(pt),
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
						si(pt),
						Oe(),
						(t = i.flags),
						(t & 65536) !== 0 && (t & 128) === 0 ? ((i.flags = (t & -65537) | 128), i) : null
					);
				case 26:
				case 27:
				case 5:
					return (Dt(i), null);
				case 31:
					if (i.memoizedState !== null) {
						if ((bn(i), i.alternate === null)) throw Error(l(340));
						pa();
					}
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 13:
					if ((bn(i), (t = i.memoizedState), t !== null && t.dehydrated !== null)) {
						if (i.alternate === null) throw Error(l(340));
						pa();
					}
					return ((t = i.flags), t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null);
				case 19:
					return (G(dt), null);
				case 4:
					return (Oe(), null);
				case 10:
					return (si(i.type), null);
				case 22:
				case 23:
					return (
						bn(i),
						Tc(),
						t !== null && G(_a),
						(t = i.flags),
						t & 65536 ? ((i.flags = (t & -65537) | 128), i) : null
					);
				case 24:
					return (si(pt), null);
				case 25:
					return null;
				default:
					return null;
			}
		}
		function Qv(t, i) {
			switch ((fc(i), i.tag)) {
				case 3:
					(si(pt), Oe());
					break;
				case 26:
				case 27:
				case 5:
					Dt(i);
					break;
				case 4:
					Oe();
					break;
				case 31:
					i.memoizedState !== null && bn(i);
					break;
				case 13:
					bn(i);
					break;
				case 19:
					G(dt);
					break;
				case 10:
					si(i.type);
					break;
				case 22:
				case 23:
					(bn(i), Tc(), t !== null && G(_a));
					break;
				case 24:
					si(pt);
			}
		}
		function Eu(t, i) {
			try {
				var r = i.updateQueue,
					s = r !== null ? r.lastEffect : null;
				if (s !== null) {
					var c = s.next;
					r = c;
					do {
						if ((r.tag & t) === t) {
							s = void 0;
							var d = r.create,
								g = r.inst;
							((s = d()), (g.destroy = s));
						}
						r = r.next;
					} while (r !== c);
				}
			} catch (x) {
				Pe(i, i.return, x);
			}
		}
		function Vi(t, i, r) {
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
								var z = r,
									P = x;
								try {
									P();
								} catch (X) {
									Pe(c, z, X);
								}
							}
						}
						s = s.next;
					} while (s !== d);
				}
			} catch (X) {
				Pe(i, i.return, X);
			}
		}
		function Pv(t) {
			var i = t.updateQueue;
			if (i !== null) {
				var r = t.stateNode;
				try {
					Lm(i, r);
				} catch (s) {
					Pe(t, t.return, s);
				}
			}
		}
		function Yv(t, i, r) {
			((r.props = Oa(t.type, t.memoizedProps)), (r.state = t.memoizedState));
			try {
				r.componentWillUnmount();
			} catch (s) {
				Pe(t, i, s);
			}
		}
		function Cu(t, i) {
			try {
				var r = t.ref;
				if (r !== null) {
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
					typeof r == "function" ? (t.refCleanup = r(s)) : (r.current = s);
				}
			} catch (c) {
				Pe(t, i, c);
			}
		}
		function Pn(t, i) {
			var r = t.ref,
				s = t.refCleanup;
			if (r !== null)
				if (typeof s == "function")
					try {
						s();
					} catch (c) {
						Pe(t, i, c);
					} finally {
						((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
					}
				else if (typeof r == "function")
					try {
						r(null);
					} catch (c) {
						Pe(t, i, c);
					}
				else r.current = null;
		}
		function Fv(t) {
			var i = t.type,
				r = t.memoizedProps,
				s = t.stateNode;
			try {
				e: switch (i) {
					case "button":
					case "input":
					case "select":
					case "textarea":
						r.autoFocus && s.focus();
						break e;
					case "img":
						r.src ? (s.src = r.src) : r.srcSet && (s.srcset = r.srcSet);
				}
			} catch (c) {
				Pe(t, t.return, c);
			}
		}
		function rf(t, i, r) {
			try {
				var s = t.stateNode;
				(v_(s, t.type, r, i), (s[Wt] = i));
			} catch (c) {
				Pe(t, t.return, c);
			}
		}
		function Kv(t) {
			return t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && Ki(t.type)) || t.tag === 4;
		}
		function uf(t) {
			e: for (;;) {
				for (; t.sibling === null; ) {
					if (t.return === null || Kv(t.return)) return null;
					t = t.return;
				}
				for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
					if ((t.tag === 27 && Ki(t.type)) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
					((t.child.return = t), (t = t.child));
				}
				if (!(t.flags & 2)) return t.stateNode;
			}
		}
		function sf(t, i, r) {
			var s = t.tag;
			if (s === 5 || s === 6)
				((t = t.stateNode),
					i
						? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(t, i)
						: ((i = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r),
							i.appendChild(t),
							(r = r._reactRootContainer),
							r != null || i.onclick !== null || (i.onclick = ni)));
			else if (s !== 4 && (s === 27 && Ki(t.type) && ((r = t.stateNode), (i = null)), (t = t.child), t !== null))
				for (sf(t, i, r), t = t.sibling; t !== null; ) (sf(t, i, r), (t = t.sibling));
		}
		function ll(t, i, r) {
			var s = t.tag;
			if (s === 5 || s === 6) ((t = t.stateNode), i ? r.insertBefore(t, i) : r.appendChild(t));
			else if (s !== 4 && (s === 27 && Ki(t.type) && (r = t.stateNode), (t = t.child), t !== null))
				for (ll(t, i, r), t = t.sibling; t !== null; ) (ll(t, i, r), (t = t.sibling));
		}
		function Gv(t) {
			var i = t.stateNode,
				r = t.memoizedProps;
			try {
				for (var s = t.type, c = i.attributes; c.length; ) i.removeAttributeNode(c[0]);
				(Zt(i, s, r), (i[$t] = t), (i[Wt] = r));
			} catch (d) {
				Pe(t, t.return, d);
			}
		}
		var di = !1,
			_t = !1,
			lf = !1,
			Xv = typeof WeakSet == "function" ? WeakSet : Set,
			Ut = null;
		function Gw(t, i) {
			if (((t = t.containerInfo), (Rf = Ol), (t = dm(t)), ec(t))) {
				if ("selectionStart" in t) var r = { start: t.selectionStart, end: t.selectionEnd };
				else
					e: {
						r = ((r = t.ownerDocument) && r.defaultView) || window;
						var s = r.getSelection && r.getSelection();
						if (s && s.rangeCount !== 0) {
							r = s.anchorNode;
							var c = s.anchorOffset,
								d = s.focusNode;
							s = s.focusOffset;
							try {
								(r.nodeType, d.nodeType);
							} catch {
								r = null;
								break e;
							}
							var g = 0,
								x = -1,
								z = -1,
								P = 0,
								X = 0,
								W = t,
								Y = null;
							t: for (;;) {
								for (
									var F;
									W !== r || (c !== 0 && W.nodeType !== 3) || (x = g + c),
										W !== d || (s !== 0 && W.nodeType !== 3) || (z = g + s),
										W.nodeType === 3 && (g += W.nodeValue.length),
										(F = W.firstChild) !== null;
								)
									((Y = W), (W = F));
								for (;;) {
									if (W === t) break t;
									if ((Y === r && ++P === c && (x = g), Y === d && ++X === s && (z = g), (F = W.nextSibling) !== null))
										break;
									((W = Y), (Y = W.parentNode));
								}
								W = F;
							}
							r = x === -1 || z === -1 ? null : { start: x, end: z };
						} else r = null;
					}
				r = r || { start: 0, end: 0 };
			} else r = null;
			for (Of = { focusedElem: t, selectionRange: r }, Ol = !1, Ut = i; Ut !== null; )
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
									((t = void 0), (r = i), (c = d.memoizedProps), (d = d.memoizedState), (s = r.stateNode));
									try {
										var oe = Oa(r.type, c);
										((t = s.getSnapshotBeforeUpdate(oe, d)), (s.__reactInternalSnapshotBeforeUpdate = t));
									} catch (be) {
										Pe(r, r.return, be);
									}
								}
								break;
							case 3:
								if ((t & 1024) !== 0) {
									if (((t = i.stateNode.containerInfo), (r = t.nodeType), r === 9)) zf(t);
									else if (r === 1)
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
							((t.return = i.return), (Ut = t));
							break;
						}
						Ut = i.return;
					}
		}
		function Jv(t, i, r) {
			var s = r.flags;
			switch (r.tag) {
				case 0:
				case 11:
				case 15:
					(mi(t, r), s & 4 && Eu(5, r));
					break;
				case 1:
					if ((mi(t, r), s & 4))
						if (((t = r.stateNode), i === null))
							try {
								t.componentDidMount();
							} catch (g) {
								Pe(r, r.return, g);
							}
						else {
							var c = Oa(r.type, i.memoizedProps);
							i = i.memoizedState;
							try {
								t.componentDidUpdate(c, i, t.__reactInternalSnapshotBeforeUpdate);
							} catch (g) {
								Pe(r, r.return, g);
							}
						}
					(s & 64 && Pv(r), s & 512 && Cu(r, r.return));
					break;
				case 3:
					if ((mi(t, r), s & 64 && ((t = r.updateQueue), t !== null))) {
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
							Lm(t, i);
						} catch (g) {
							Pe(r, r.return, g);
						}
					}
					break;
				case 27:
					i === null && s & 4 && Gv(r);
				case 26:
				case 5:
					(mi(t, r), i === null && s & 4 && Fv(r), s & 512 && Cu(r, r.return));
					break;
				case 12:
					mi(t, r);
					break;
				case 31:
					(mi(t, r), s & 4 && tg(t, r));
					break;
				case 13:
					(mi(t, r),
						s & 4 && ng(t, r),
						s & 64 &&
							((t = r.memoizedState),
							t !== null && ((t = t.dehydrated), t !== null && ((r = r_.bind(null, r)), x_(t, r)))));
					break;
				case 22:
					if (((s = r.memoizedState !== null || di), !s)) {
						((i = (i !== null && i.memoizedState !== null) || _t), (c = di));
						var d = _t;
						((di = s), (_t = i) && !d ? vi(t, r, (r.subtreeFlags & 8772) !== 0) : mi(t, r), (di = c), (_t = d));
					}
					break;
				case 30:
					break;
				default:
					mi(t, r);
			}
		}
		function Wv(t) {
			var i = t.alternate;
			(i !== null && ((t.alternate = null), Wv(i)),
				(t.child = null),
				(t.deletions = null),
				(t.sibling = null),
				t.tag === 5 && ((i = t.stateNode), i !== null && Uo(i)),
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
			tn = !1;
		function hi(t, i, r) {
			for (r = r.child; r !== null; ) (eg(t, i, r), (r = r.sibling));
		}
		function eg(t, i, r) {
			if (hn && typeof hn.onCommitFiberUnmount == "function")
				try {
					hn.onCommitFiberUnmount(ei, r);
				} catch {}
			switch (r.tag) {
				case 26:
					(_t || Pn(r, i),
						hi(t, i, r),
						r.memoizedState
							? r.memoizedState.count--
							: r.stateNode && ((r = r.stateNode), r.parentNode.removeChild(r)));
					break;
				case 27:
					_t || Pn(r, i);
					var s = at,
						c = tn;
					(Ki(r.type) && ((at = r.stateNode), (tn = !1)), hi(t, i, r), Du(r.stateNode), (at = s), (tn = c));
					break;
				case 5:
					_t || Pn(r, i);
				case 6:
					if (((s = at), (c = tn), (at = null), hi(t, i, r), (at = s), (tn = c), at !== null))
						if (tn)
							try {
								(at.nodeType === 9 ? at.body : at.nodeName === "HTML" ? at.ownerDocument.body : at).removeChild(
									r.stateNode,
								);
							} catch (d) {
								Pe(r, i, d);
							}
						else
							try {
								at.removeChild(r.stateNode);
							} catch (d) {
								Pe(r, i, d);
							}
					break;
				case 18:
					at !== null &&
						(tn
							? ((t = at),
								Yg(t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, r.stateNode),
								Rr(t))
							: Yg(at, r.stateNode));
					break;
				case 4:
					((s = at), (c = tn), (at = r.stateNode.containerInfo), (tn = !0), hi(t, i, r), (at = s), (tn = c));
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					(Vi(2, r, i), _t || Vi(4, r, i), hi(t, i, r));
					break;
				case 1:
					(_t || (Pn(r, i), (s = r.stateNode), typeof s.componentWillUnmount == "function" && Yv(r, i, s)),
						hi(t, i, r));
					break;
				case 21:
					hi(t, i, r);
					break;
				case 22:
					((_t = (s = _t) || r.memoizedState !== null), hi(t, i, r), (_t = s));
					break;
				default:
					hi(t, i, r);
			}
		}
		function tg(t, i) {
			if (i.memoizedState === null && ((t = i.alternate), t !== null && ((t = t.memoizedState), t !== null))) {
				t = t.dehydrated;
				try {
					Rr(t);
				} catch (r) {
					Pe(i, i.return, r);
				}
			}
		}
		function ng(t, i) {
			if (
				i.memoizedState === null &&
				((t = i.alternate), t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
			)
				try {
					Rr(t);
				} catch (r) {
					Pe(i, i.return, r);
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
		function ol(t, i) {
			var r = Xw(t);
			i.forEach(function (s) {
				if (!r.has(s)) {
					r.add(s);
					var c = u_.bind(null, t, s);
					s.then(c, c);
				}
			});
		}
		function nn(t, i) {
			var r = i.deletions;
			if (r !== null)
				for (var s = 0; s < r.length; s++) {
					var c = r[s],
						d = t,
						g = i,
						x = g;
					e: for (; x !== null; ) {
						switch (x.tag) {
							case 27:
								if (Ki(x.type)) {
									((at = x.stateNode), (tn = !1));
									break e;
								}
								break;
							case 5:
								((at = x.stateNode), (tn = !1));
								break e;
							case 3:
							case 4:
								((at = x.stateNode.containerInfo), (tn = !0));
								break e;
						}
						x = x.return;
					}
					if (at === null) throw Error(l(160));
					(eg(d, g, c), (at = null), (tn = !1), (d = c.alternate), d !== null && (d.return = null), (c.return = null));
				}
			if (i.subtreeFlags & 13886) for (i = i.child; i !== null; ) (ig(i, t), (i = i.sibling));
		}
		var In = null;
		function ig(t, i) {
			var r = t.alternate,
				s = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					(nn(i, t), an(t), s & 4 && (Vi(3, t, t.return), Eu(3, t), Vi(5, t, t.return)));
					break;
				case 1:
					(nn(i, t),
						an(t),
						s & 512 && (_t || r === null || Pn(r, r.return)),
						s & 64 &&
							di &&
							((t = t.updateQueue),
							t !== null &&
								((s = t.callbacks),
								s !== null &&
									((r = t.shared.hiddenCallbacks), (t.shared.hiddenCallbacks = r === null ? s : r.concat(s))))));
					break;
				case 26:
					var c = In;
					if ((nn(i, t), an(t), s & 512 && (_t || r === null || Pn(r, r.return)), s & 4)) {
						var d = r !== null ? r.memoizedState : null;
						if (((s = t.memoizedState), r === null))
							if (s === null)
								if (t.stateNode === null) {
									e: {
										((s = t.type), (r = t.memoizedProps), (c = c.ownerDocument || c));
										t: switch (s) {
											case "title":
												((d = c.getElementsByTagName("title")[0]),
													(!d ||
														d[Jr] ||
														d[$t] ||
														d.namespaceURI === "http://www.w3.org/2000/svg" ||
														d.hasAttribute("itemprop")) &&
														((d = c.createElement(s)), c.head.insertBefore(d, c.querySelector("head > title"))),
													Zt(d, s, r),
													(d[$t] = t),
													qt(d),
													(s = d));
												break e;
											case "link":
												var g = ay("link", "href", c).get(s + (r.href || ""));
												if (g) {
													for (var x = 0; x < g.length; x++)
														if (
															((d = g[x]),
															d.getAttribute("href") === (r.href == null || r.href === "" ? null : r.href) &&
																d.getAttribute("rel") === (r.rel == null ? null : r.rel) &&
																d.getAttribute("title") === (r.title == null ? null : r.title) &&
																d.getAttribute("crossorigin") === (r.crossOrigin == null ? null : r.crossOrigin))
														) {
															g.splice(x, 1);
															break t;
														}
												}
												((d = c.createElement(s)), Zt(d, s, r), c.head.appendChild(d));
												break;
											case "meta":
												if ((g = ay("meta", "content", c).get(s + (r.content || "")))) {
													for (x = 0; x < g.length; x++)
														if (
															((d = g[x]),
															d.getAttribute("content") === (r.content == null ? null : "" + r.content) &&
																d.getAttribute("name") === (r.name == null ? null : r.name) &&
																d.getAttribute("property") === (r.property == null ? null : r.property) &&
																d.getAttribute("http-equiv") === (r.httpEquiv == null ? null : r.httpEquiv) &&
																d.getAttribute("charset") === (r.charSet == null ? null : r.charSet))
														) {
															g.splice(x, 1);
															break t;
														}
												}
												((d = c.createElement(s)), Zt(d, s, r), c.head.appendChild(d));
												break;
											default:
												throw Error(l(468, s));
										}
										((d[$t] = t), qt(d), (s = d));
									}
									t.stateNode = s;
								} else ry(c, t.type, t.stateNode);
							else t.stateNode = iy(c, s, t.memoizedProps);
						else
							d !== s
								? (d === null ? r.stateNode !== null && ((r = r.stateNode), r.parentNode.removeChild(r)) : d.count--,
									s === null ? ry(c, t.type, t.stateNode) : iy(c, s, t.memoizedProps))
								: s === null && t.stateNode !== null && rf(t, t.memoizedProps, r.memoizedProps);
					}
					break;
				case 27:
					(nn(i, t),
						an(t),
						s & 512 && (_t || r === null || Pn(r, r.return)),
						r !== null && s & 4 && rf(t, t.memoizedProps, r.memoizedProps));
					break;
				case 5:
					if ((nn(i, t), an(t), s & 512 && (_t || r === null || Pn(r, r.return)), t.flags & 32)) {
						c = t.stateNode;
						try {
							Xa(c, "");
						} catch (oe) {
							Pe(t, t.return, oe);
						}
					}
					(s & 4 && t.stateNode != null && ((c = t.memoizedProps), rf(t, c, r !== null ? r.memoizedProps : c)),
						s & 1024 && (lf = !0));
					break;
				case 6:
					if ((nn(i, t), an(t), s & 4)) {
						if (t.stateNode === null) throw Error(l(162));
						((s = t.memoizedProps), (r = t.stateNode));
						try {
							r.nodeValue = s;
						} catch (oe) {
							Pe(t, t.return, oe);
						}
					}
					break;
				case 3:
					if (
						((Cl = null),
						(c = In),
						(In = xl(i.containerInfo)),
						nn(i, t),
						(In = c),
						an(t),
						s & 4 && r !== null && r.memoizedState.isDehydrated)
					)
						try {
							Rr(i.containerInfo);
						} catch (oe) {
							Pe(t, t.return, oe);
						}
					lf && ((lf = !1), ag(t));
					break;
				case 4:
					((s = In), (In = xl(t.stateNode.containerInfo)), nn(i, t), an(t), (In = s));
					break;
				case 12:
					(nn(i, t), an(t));
					break;
				case 31:
					(nn(i, t), an(t), s & 4 && ((s = t.updateQueue), s !== null && ((t.updateQueue = null), ol(t, s))));
					break;
				case 13:
					(nn(i, t),
						an(t),
						t.child.flags & 8192 &&
							(t.memoizedState !== null) != (r !== null && r.memoizedState !== null) &&
							(fl = je()),
						s & 4 && ((s = t.updateQueue), s !== null && ((t.updateQueue = null), ol(t, s))));
					break;
				case 22:
					c = t.memoizedState !== null;
					var z = r !== null && r.memoizedState !== null,
						P = di,
						X = _t;
					if (((di = P || c), (_t = X || z), nn(i, t), (_t = X), (di = P), an(t), s & 8192))
						e: for (
							i = t.stateNode,
								i._visibility = c ? i._visibility & -2 : i._visibility | 1,
								c && (r === null || z || di || _t || Na(t)),
								r = null,
								i = t;
							;
						) {
							if (i.tag === 5 || i.tag === 26) {
								if (r === null) {
									z = r = i;
									try {
										if (((d = z.stateNode), c))
											((g = d.style),
												typeof g.setProperty == "function"
													? g.setProperty("display", "none", "important")
													: (g.display = "none"));
										else {
											x = z.stateNode;
											var W = z.memoizedProps.style,
												Y = W != null && W.hasOwnProperty("display") ? W.display : null;
											x.style.display = Y == null || typeof Y == "boolean" ? "" : ("" + Y).trim();
										}
									} catch (oe) {
										Pe(z, z.return, oe);
									}
								}
							} else if (i.tag === 6) {
								if (r === null) {
									z = i;
									try {
										z.stateNode.nodeValue = c ? "" : z.memoizedProps;
									} catch (oe) {
										Pe(z, z.return, oe);
									}
								}
							} else if (i.tag === 18) {
								if (r === null) {
									z = i;
									try {
										var F = z.stateNode;
										c ? Fg(F, !0) : Fg(z.stateNode, !1);
									} catch (oe) {
										Pe(z, z.return, oe);
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
					s & 4 &&
						((s = t.updateQueue), s !== null && ((r = s.retryQueue), r !== null && ((s.retryQueue = null), ol(t, r))));
					break;
				case 19:
					(nn(i, t), an(t), s & 4 && ((s = t.updateQueue), s !== null && ((t.updateQueue = null), ol(t, s))));
					break;
				case 30:
					break;
				case 21:
					break;
				default:
					(nn(i, t), an(t));
			}
		}
		function an(t) {
			var i = t.flags;
			if (i & 2) {
				try {
					for (var r, s = t.return; s !== null; ) {
						if (Kv(s)) {
							r = s;
							break;
						}
						s = s.return;
					}
					if (r == null) throw Error(l(160));
					switch (r.tag) {
						case 27:
							var c = r.stateNode;
							ll(t, uf(t), c);
							break;
						case 5:
							var d = r.stateNode;
							(r.flags & 32 && (Xa(d, ""), (r.flags &= -33)), ll(t, uf(t), d));
							break;
						case 3:
						case 4:
							var g = r.stateNode.containerInfo;
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
		function ag(t) {
			if (t.subtreeFlags & 1024)
				for (t = t.child; t !== null; ) {
					var i = t;
					(ag(i), i.tag === 5 && i.flags & 1024 && i.stateNode.reset(), (t = t.sibling));
				}
		}
		function mi(t, i) {
			if (i.subtreeFlags & 8772) for (i = i.child; i !== null; ) (Jv(t, i.alternate, i), (i = i.sibling));
		}
		function Na(t) {
			for (t = t.child; t !== null; ) {
				var i = t;
				switch (i.tag) {
					case 0:
					case 11:
					case 14:
					case 15:
						(Vi(4, i, i.return), Na(i));
						break;
					case 1:
						Pn(i, i.return);
						var r = i.stateNode;
						(typeof r.componentWillUnmount == "function" && Yv(i, i.return, r), Na(i));
						break;
					case 27:
						Du(i.stateNode);
					case 26:
					case 5:
						(Pn(i, i.return), Na(i));
						break;
					case 22:
						i.memoizedState === null && Na(i);
						break;
					case 30:
						Na(i);
						break;
					default:
						Na(i);
				}
				t = t.sibling;
			}
		}
		function vi(t, i, r) {
			for (r = r && (i.subtreeFlags & 8772) !== 0, i = i.child; i !== null; ) {
				var s = i.alternate,
					c = t,
					d = i,
					g = d.flags;
				switch (d.tag) {
					case 0:
					case 11:
					case 15:
						(vi(c, d, r), Eu(4, d));
						break;
					case 1:
						if ((vi(c, d, r), (s = d), (c = s.stateNode), typeof c.componentDidMount == "function"))
							try {
								c.componentDidMount();
							} catch (P) {
								Pe(s, s.return, P);
							}
						if (((s = d), (c = s.updateQueue), c !== null)) {
							var x = s.stateNode;
							try {
								var z = c.shared.hiddenCallbacks;
								if (z !== null) for (c.shared.hiddenCallbacks = null, c = 0; c < z.length; c++) Im(z[c], x);
							} catch (P) {
								Pe(s, s.return, P);
							}
						}
						(r && g & 64 && Pv(d), Cu(d, d.return));
						break;
					case 27:
						Gv(d);
					case 26:
					case 5:
						(vi(c, d, r), r && s === null && g & 4 && Fv(d), Cu(d, d.return));
						break;
					case 12:
						vi(c, d, r);
						break;
					case 31:
						(vi(c, d, r), r && g & 4 && tg(c, d));
						break;
					case 13:
						(vi(c, d, r), r && g & 4 && ng(c, d));
						break;
					case 22:
						(d.memoizedState === null && vi(c, d, r), Cu(d, d.return));
						break;
					case 30:
						break;
					default:
						vi(c, d, r);
				}
				i = i.sibling;
			}
		}
		function of(t, i) {
			var r = null;
			(t !== null &&
				t.memoizedState !== null &&
				t.memoizedState.cachePool !== null &&
				(r = t.memoizedState.cachePool.pool),
				(t = null),
				i.memoizedState !== null && i.memoizedState.cachePool !== null && (t = i.memoizedState.cachePool.pool),
				t !== r && (t != null && t.refCount++, r != null && fu(r)));
		}
		function cf(t, i) {
			((t = null),
				i.alternate !== null && (t = i.alternate.memoizedState.cache),
				(i = i.memoizedState.cache),
				i !== t && (i.refCount++, t != null && fu(t)));
		}
		function Ln(t, i, r, s) {
			if (i.subtreeFlags & 10256) for (i = i.child; i !== null; ) (rg(t, i, r, s), (i = i.sibling));
		}
		function rg(t, i, r, s) {
			var c = i.flags;
			switch (i.tag) {
				case 0:
				case 11:
				case 15:
					(Ln(t, i, r, s), c & 2048 && Eu(9, i));
					break;
				case 1:
					Ln(t, i, r, s);
					break;
				case 3:
					(Ln(t, i, r, s),
						c & 2048 &&
							((t = null),
							i.alternate !== null && (t = i.alternate.memoizedState.cache),
							(i = i.memoizedState.cache),
							i !== t && (i.refCount++, t != null && fu(t))));
					break;
				case 12:
					if (c & 2048) {
						(Ln(t, i, r, s), (t = i.stateNode));
						try {
							var d = i.memoizedProps,
								g = d.id,
								x = d.onPostCommit;
							typeof x == "function" && x(g, i.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
						} catch (z) {
							Pe(i, i.return, z);
						}
					} else Ln(t, i, r, s);
					break;
				case 31:
					Ln(t, i, r, s);
					break;
				case 13:
					Ln(t, i, r, s);
					break;
				case 23:
					break;
				case 22:
					((d = i.stateNode),
						(g = i.alternate),
						i.memoizedState !== null
							? d._visibility & 2
								? Ln(t, i, r, s)
								: Tu(t, i)
							: d._visibility & 2
								? Ln(t, i, r, s)
								: ((d._visibility |= 2), yr(t, i, r, s, (i.subtreeFlags & 10256) !== 0 || !1)),
						c & 2048 && of(g, i));
					break;
				case 24:
					(Ln(t, i, r, s), c & 2048 && cf(i.alternate, i));
					break;
				default:
					Ln(t, i, r, s);
			}
		}
		function yr(t, i, r, s, c) {
			for (c = c && ((i.subtreeFlags & 10256) !== 0 || !1), i = i.child; i !== null; ) {
				var d = t,
					g = i,
					x = r,
					z = s,
					P = g.flags;
				switch (g.tag) {
					case 0:
					case 11:
					case 15:
						(yr(d, g, x, z, c), Eu(8, g));
						break;
					case 23:
						break;
					case 22:
						var X = g.stateNode;
						(g.memoizedState !== null
							? X._visibility & 2
								? yr(d, g, x, z, c)
								: Tu(d, g)
							: ((X._visibility |= 2), yr(d, g, x, z, c)),
							c && P & 2048 && of(g.alternate, g));
						break;
					case 24:
						(yr(d, g, x, z, c), c && P & 2048 && cf(g.alternate, g));
						break;
					default:
						yr(d, g, x, z, c);
				}
				i = i.sibling;
			}
		}
		function Tu(t, i) {
			if (i.subtreeFlags & 10256)
				for (i = i.child; i !== null; ) {
					var r = t,
						s = i,
						c = s.flags;
					switch (s.tag) {
						case 22:
							(Tu(r, s), c & 2048 && of(s.alternate, s));
							break;
						case 24:
							(Tu(r, s), c & 2048 && cf(s.alternate, s));
							break;
						default:
							Tu(r, s);
					}
					i = i.sibling;
				}
		}
		var Au = 8192;
		function br(t, i, r) {
			if (t.subtreeFlags & Au) for (t = t.child; t !== null; ) (ug(t, i, r), (t = t.sibling));
		}
		function ug(t, i, r) {
			switch (t.tag) {
				case 26:
					(br(t, i, r), t.flags & Au && t.memoizedState !== null && j_(r, In, t.memoizedState, t.memoizedProps));
					break;
				case 5:
					br(t, i, r);
					break;
				case 3:
				case 4:
					var s = In;
					((In = xl(t.stateNode.containerInfo)), br(t, i, r), (In = s));
					break;
				case 22:
					t.memoizedState === null &&
						((s = t.alternate),
						s !== null && s.memoizedState !== null ? ((s = Au), (Au = 16777216), br(t, i, r), (Au = s)) : br(t, i, r));
					break;
				default:
					br(t, i, r);
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
					for (var r = 0; r < i.length; r++) {
						var s = i[r];
						((Ut = s), og(s, t));
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
					(Ru(t), t.flags & 2048 && Vi(9, t, t.return));
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
						? ((i._visibility &= -3), cl(t))
						: Ru(t);
					break;
				default:
					Ru(t);
			}
		}
		function cl(t) {
			var i = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (i !== null)
					for (var r = 0; r < i.length; r++) {
						var s = i[r];
						((Ut = s), og(s, t));
					}
				sg(t);
			}
			for (t = t.child; t !== null; ) {
				switch (((i = t), i.tag)) {
					case 0:
					case 11:
					case 15:
						(Vi(8, i, i.return), cl(i));
						break;
					case 22:
						((r = i.stateNode), r._visibility & 2 && ((r._visibility &= -3), cl(i)));
						break;
					default:
						cl(i);
				}
				t = t.sibling;
			}
		}
		function og(t, i) {
			for (; Ut !== null; ) {
				var r = Ut;
				switch (r.tag) {
					case 0:
					case 11:
					case 15:
						Vi(8, r, i);
						break;
					case 23:
					case 22:
						if (r.memoizedState !== null && r.memoizedState.cachePool !== null) {
							var s = r.memoizedState.cachePool.pool;
							s != null && s.refCount++;
						}
						break;
					case 24:
						fu(r.memoizedState.cache);
				}
				if (((s = r.child), s !== null)) ((s.return = r), (Ut = s));
				else
					e: for (r = t; Ut !== null; ) {
						s = Ut;
						var c = s.sibling,
							d = s.return;
						if ((Wv(s), s === r)) {
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
		var Jw = {
				getCacheForType: function (t) {
					var i = Vt(pt),
						r = i.data.get(t);
					return (r === void 0 && ((r = t()), i.data.set(t, r)), r);
				},
				cacheSignal: function () {
					return Vt(pt).controller.signal;
				},
			},
			Ww = typeof WeakMap == "function" ? WeakMap : Map,
			Ve = 0,
			Je = null,
			Ne = null,
			ze = 0,
			Qe = 0,
			pn = null,
			Hi = !1,
			pr = !1,
			ff = !1,
			gi = 0,
			ct = 0,
			Zi = 0,
			Ma = 0,
			df = 0,
			Sn = 0,
			Sr = 0,
			Ou = null,
			rn = null,
			hf = !1,
			fl = 0,
			cg = 0,
			dl = 1 / 0,
			hl = null,
			Qi = null,
			kt = 0,
			Pi = null,
			wr = null,
			yi = 0,
			mf = 0,
			vf = null,
			fg = null,
			Nu = 0,
			gf = null;
		function Nn() {
			return (Ve & 2) !== 0 && ze !== 0 ? ze & -ze : H.T !== null ? _f() : Nh();
		}
		function dg() {
			if (Sn === 0)
				if ((ze & 536870912) === 0 || qe) {
					var t = Ss;
					((Ss <<= 1), (Ss & 3932160) === 0 && (Ss = 262144), (Sn = t));
				} else Sn = 536870912;
			return ((t = yn.current), t !== null && (t.flags |= 32), Sn);
		}
		function un(t, i, r) {
			(((t === Je && (Qe === 2 || Qe === 9)) || t.cancelPendingCommit !== null) && (_r(t, 0), Yi(t, ze, Sn, !1)),
				xs(t, r),
				((Ve & 2) === 0 || t !== Je) &&
					(t === Je && ((Ve & 2) === 0 && (Ma |= r), ct === 4 && Yi(t, ze, Sn, !1)), bi(t)));
		}
		function hg(t, i, r) {
			if ((Ve & 6) !== 0) throw Error(l(327));
			var s = (!r && (i & 127) === 0 && (i & t.expiredLanes) === 0) || Gr(t, i),
				c = s ? n_(t, i) : bf(t, i, !0),
				d = s;
			do {
				if (c === 0) {
					pr && !s && Yi(t, i, 0, !1);
					break;
				} else {
					if (((r = t.current.alternate), d && !e_(r))) {
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
								var z = x.current.memoizedState.isDehydrated;
								if ((z && (_r(x, g).flags |= 256), (g = bf(x, g, !1)), g !== 2)) {
									if (ff && !z) {
										((x.errorRecoveryDisabledLanes |= d), (Ma |= d), (c = 4));
										break e;
									}
									((d = rn), (rn = c), d !== null && (rn === null ? (rn = d) : rn.push.apply(rn, d)));
								}
								c = g;
							}
							if (((d = !1), c !== 2)) continue;
						}
					}
					if (c === 1) {
						(_r(t, 0), Yi(t, i, 0, !0));
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
								Yi(s, i, Sn, !Hi);
								break e;
							case 2:
								rn = null;
								break;
							case 3:
							case 5:
								break;
							default:
								throw Error(l(329));
						}
						if ((i & 62914560) === i && ((c = fl + 300 - je()), 10 < c)) {
							if ((Yi(s, i, Sn, !Hi), _s(s, 0, !0) !== 0)) break e;
							((yi = i),
								(s.timeoutHandle = Qg(mg.bind(null, s, r, rn, hl, hf, i, Sn, Ma, Sr, Hi, d, "Throttled", -0, 0), c)));
							break e;
						}
						mg(s, r, rn, hl, hf, i, Sn, Ma, Sr, Hi, d, null, -0, 0);
					}
				}
				break;
			} while (!0);
			bi(t);
		}
		function mg(t, i, r, s, c, d, g, x, z, P, X, W, Y, F) {
			if (((t.timeoutHandle = -1), (W = i.subtreeFlags), W & 8192 || (W & 16785408) === 16785408)) {
				((W = {
					stylesheets: null,
					count: 0,
					imgCount: 0,
					imgBytes: 0,
					suspenseyImages: [],
					waitingForImages: !0,
					waitingForViewTransition: !1,
					unsuspend: ni,
				}),
					ug(i, d, W));
				var oe = (d & 62914560) === d ? fl - je() : (d & 4194048) === d ? cg - je() : 0;
				if (((oe = q_(W, oe)), oe !== null)) {
					((yi = d),
						(t.cancelPendingCommit = oe(_g.bind(null, t, i, d, r, s, c, g, x, z, X, W, null, Y, F))),
						Yi(t, d, g, !P));
					return;
				}
			}
			_g(t, i, d, r, s, c, g, x, z);
		}
		function e_(t) {
			for (var i = t; ; ) {
				var r = i.tag;
				if (
					(r === 0 || r === 11 || r === 15) &&
					i.flags & 16384 &&
					((r = i.updateQueue), r !== null && ((r = r.stores), r !== null))
				)
					for (var s = 0; s < r.length; s++) {
						var c = r[s],
							d = c.getSnapshot;
						c = c.value;
						try {
							if (!vn(d(), c)) return !1;
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
		function Yi(t, i, r, s) {
			((i &= ~df),
				(i &= ~Ma),
				(t.suspendedLanes |= i),
				(t.pingedLanes &= ~i),
				s && (t.warmLanes |= i),
				(s = t.expirationTimes));
			for (var c = i; 0 < c; ) {
				var d = 31 - mn(c),
					g = 1 << d;
				((s[d] = -1), (c &= ~g));
			}
			r !== 0 && Th(t, r, i);
		}
		function ml() {
			return (Ve & 6) === 0 ? (Mu(0, !1), !1) : !0;
		}
		function yf() {
			if (Ne !== null) {
				if (Qe === 0) var t = Ne.return;
				else ((t = Ne), (ui = Sa = null), zc(t), (dr = null), (hu = 0), (t = Ne));
				for (; t !== null; ) (Qv(t.alternate, t), (t = t.return));
				Ne = null;
			}
		}
		function _r(t, i) {
			var r = t.timeoutHandle;
			(r !== -1 && ((t.timeoutHandle = -1), b_(r)),
				(r = t.cancelPendingCommit),
				r !== null && ((t.cancelPendingCommit = null), r()),
				(yi = 0),
				yf(),
				(Je = t),
				(Ne = r = ai(t.current, null)),
				(ze = i),
				(Qe = 0),
				(pn = null),
				(Hi = !1),
				(pr = Gr(t, i)),
				(ff = !1),
				(Sr = Sn = df = Ma = Zi = ct = 0),
				(rn = Ou = null),
				(hf = !1),
				(i & 8) !== 0 && (i |= i & 32));
			var s = t.entangledLanes;
			if (s !== 0)
				for (t = t.entanglements, s &= i; 0 < s; ) {
					var c = 31 - mn(s),
						d = 1 << c;
					((i |= t[c]), (s &= ~d));
				}
			return ((gi = i), js(), r);
		}
		function vg(t, i) {
			((Ce = null),
				(H.H = wu),
				i === fr || i === Hs
					? ((i = Dm()), (Qe = 3))
					: i === Sc
						? ((i = Dm()), (Qe = 4))
						: (Qe = i === Fc ? 8 : i !== null && typeof i == "object" && typeof i.then == "function" ? 6 : 1),
				(pn = i),
				Ne === null && ((ct = 1), il(t, Cn(i, t.current))));
		}
		function gg() {
			var t = yn.current;
			return t === null
				? !0
				: (ze & 4194048) === ze
					? On === null
					: (ze & 62914560) === ze || (ze & 536870912) !== 0
						? t === On
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
		function vl() {
			((ct = 4),
				Hi || ((ze & 4194048) !== ze && yn.current !== null) || (pr = !0),
				((Zi & 134217727) === 0 && (Ma & 134217727) === 0) || Je === null || Yi(Je, ze, Sn, !1));
		}
		function bf(t, i, r) {
			var s = Ve;
			Ve |= 2;
			var c = yg(),
				d = bg();
			((Je !== t || ze !== i) && ((hl = null), _r(t, i)), (i = !1));
			var g = ct;
			e: do
				try {
					if (Qe !== 0 && Ne !== null) {
						var x = Ne,
							z = pn;
						switch (Qe) {
							case 8:
								(yf(), (g = 6));
								break e;
							case 3:
							case 2:
							case 9:
							case 6:
								yn.current === null && (i = !0);
								var P = Qe;
								if (((Qe = 0), (pn = null), xr(t, x, z, P), r && pr)) {
									g = 0;
									break e;
								}
								break;
							default:
								((P = Qe), (Qe = 0), (pn = null), xr(t, x, z, P));
						}
					}
					(t_(), (g = ct));
					break;
				} catch (X) {
					vg(t, X);
				}
			while (!0);
			return (
				i && t.shellSuspendCounter++,
				(ui = Sa = null),
				(Ve = s),
				(H.H = c),
				(H.A = d),
				Ne === null && ((Je = null), (ze = 0), js()),
				g
			);
		}
		function t_() {
			for (; Ne !== null; ) pg(Ne);
		}
		function n_(t, i) {
			var r = Ve;
			Ve |= 2;
			var s = yg(),
				c = bg();
			Je !== t || ze !== i ? ((hl = null), (dl = je() + 500), _r(t, i)) : (pr = Gr(t, i));
			e: do
				try {
					if (Qe !== 0 && Ne !== null) {
						i = Ne;
						var d = pn;
						t: switch (Qe) {
							case 1:
								((Qe = 0), (pn = null), xr(t, i, d, 1));
								break;
							case 2:
							case 9:
								if (zm(d)) {
									((Qe = 0), (pn = null), Sg(i));
									break;
								}
								((i = function () {
									((Qe !== 2 && Qe !== 9) || Je !== t || (Qe = 7), bi(t));
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
								zm(d) ? ((Qe = 0), (pn = null), Sg(i)) : ((Qe = 0), (pn = null), xr(t, i, d, 7));
								break;
							case 5:
								var g = null;
								switch (Ne.tag) {
									case 26:
										g = Ne.memoizedState;
									case 5:
									case 27:
										var x = Ne;
										if (g ? uy(g) : x.stateNode.complete) {
											((Qe = 0), (pn = null));
											var z = x.sibling;
											if (z !== null) Ne = z;
											else {
												var P = x.return;
												P !== null ? ((Ne = P), gl(P)) : (Ne = null);
											}
											break t;
										}
								}
								((Qe = 0), (pn = null), xr(t, i, d, 5));
								break;
							case 6:
								((Qe = 0), (pn = null), xr(t, i, d, 6));
								break;
							case 8:
								(yf(), (ct = 6));
								break e;
							default:
								throw Error(l(462));
						}
					}
					i_();
					break;
				} catch (X) {
					vg(t, X);
				}
			while (!0);
			return ((ui = Sa = null), (H.H = s), (H.A = c), (Ve = r), Ne !== null ? 0 : ((Je = null), (ze = 0), js(), ct));
		}
		function i_() {
			for (; Ne !== null && !Re(); ) pg(Ne);
		}
		function pg(t) {
			var i = Hv(t.alternate, t, gi);
			((t.memoizedProps = t.pendingProps), i === null ? gl(t) : (Ne = i));
		}
		function Sg(t) {
			var i = t,
				r = i.alternate;
			switch (i.tag) {
				case 15:
				case 0:
					i = Uv(r, i, i.pendingProps, i.type, void 0, ze);
					break;
				case 11:
					i = Uv(r, i, i.pendingProps, i.type.render, i.ref, ze);
					break;
				case 5:
					zc(i);
				default:
					(Qv(r, i), (i = Ne = wm(i, gi)), (i = Hv(r, i, gi)));
			}
			((t.memoizedProps = t.pendingProps), i === null ? gl(t) : (Ne = i));
		}
		function xr(t, i, r, s) {
			((ui = Sa = null), zc(i), (dr = null), (hu = 0));
			var c = i.return;
			try {
				if (Qw(t, c, i, r, ze)) {
					((ct = 1), il(t, Cn(r, t.current)), (Ne = null));
					return;
				}
			} catch (d) {
				if (c !== null) throw ((Ne = c), d);
				((ct = 1), il(t, Cn(r, t.current)), (Ne = null));
				return;
			}
			i.flags & 32768
				? (qe || s === 1
						? (t = !0)
						: pr || (ze & 536870912) !== 0
							? (t = !1)
							: ((Hi = t = !0),
								(s === 2 || s === 9 || s === 3 || s === 6) &&
									((s = yn.current), s !== null && s.tag === 13 && (s.flags |= 16384))),
					wg(i, t))
				: gl(i);
		}
		function gl(t) {
			var i = t;
			do {
				if ((i.flags & 32768) !== 0) {
					wg(i, Hi);
					return;
				}
				t = i.return;
				var r = Fw(i.alternate, i, gi);
				if (r !== null) {
					Ne = r;
					return;
				}
				if (((i = i.sibling), i !== null)) {
					Ne = i;
					return;
				}
				Ne = i = t;
			} while (i !== null);
			ct === 0 && (ct = 5);
		}
		function wg(t, i) {
			do {
				var r = Kw(t.alternate, t);
				if (r !== null) {
					((r.flags &= 32767), (Ne = r));
					return;
				}
				if (
					((r = t.return),
					r !== null && ((r.flags |= 32768), (r.subtreeFlags = 0), (r.deletions = null)),
					!i && ((t = t.sibling), t !== null))
				) {
					Ne = t;
					return;
				}
				Ne = t = r;
			} while (t !== null);
			((ct = 6), (Ne = null));
		}
		function _g(t, i, r, s, c, d, g, x, z) {
			t.cancelPendingCommit = null;
			do yl();
			while (kt !== 0);
			if ((Ve & 6) !== 0) throw Error(l(327));
			if (i !== null) {
				if (i === t.current) throw Error(l(177));
				if (
					((d = i.lanes | i.childLanes),
					(d |= rc),
					ZS(t, r, d, g, x, z),
					t === Je && ((Ne = Je = null), (ze = 0)),
					(wr = i),
					(Pi = t),
					(yi = r),
					(mf = d),
					(vf = c),
					(fg = s),
					(i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0
						? ((t.callbackNode = null),
							(t.callbackPriority = 0),
							s_(Lt, function () {
								return (Ag(), null);
							}))
						: ((t.callbackNode = null), (t.callbackPriority = 0)),
					(s = (i.flags & 13878) !== 0),
					(i.subtreeFlags & 13878) !== 0 || s)
				) {
					((s = H.T), (H.T = null), (c = B.p), (B.p = 2), (g = Ve), (Ve |= 4));
					try {
						Gw(t, i, r);
					} finally {
						((Ve = g), (B.p = c), (H.T = s));
					}
				}
				((kt = 1), xg(), Eg(), Cg());
			}
		}
		function xg() {
			if (kt === 1) {
				kt = 0;
				var t = Pi,
					i = wr,
					r = (i.flags & 13878) !== 0;
				if ((i.subtreeFlags & 13878) !== 0 || r) {
					((r = H.T), (H.T = null));
					var s = B.p;
					B.p = 2;
					var c = Ve;
					Ve |= 4;
					try {
						ig(i, t);
						var d = Of,
							g = dm(t.containerInfo),
							x = d.focusedElem,
							z = d.selectionRange;
						if (g !== x && x && x.ownerDocument && fm(x.ownerDocument.documentElement, x)) {
							if (z !== null && ec(x)) {
								var P = z.start,
									X = z.end;
								if ((X === void 0 && (X = P), "selectionStart" in x))
									((x.selectionStart = P), (x.selectionEnd = Math.min(X, x.value.length)));
								else {
									var W = x.ownerDocument || document,
										Y = (W && W.defaultView) || window;
									if (Y.getSelection) {
										var F = Y.getSelection(),
											oe = x.textContent.length,
											be = Math.min(z.start, oe),
											Ge = z.end === void 0 ? be : Math.min(z.end, oe);
										!F.extend && be > Ge && ((g = Ge), (Ge = be), (be = g));
										var V = cm(x, be),
											q = cm(x, Ge);
										if (
											V &&
											q &&
											(F.rangeCount !== 1 ||
												F.anchorNode !== V.node ||
												F.anchorOffset !== V.offset ||
												F.focusNode !== q.node ||
												F.focusOffset !== q.offset)
										) {
											var Q = W.createRange();
											(Q.setStart(V.node, V.offset),
												F.removeAllRanges(),
												be > Ge
													? (F.addRange(Q), F.extend(q.node, q.offset))
													: (Q.setEnd(q.node, q.offset), F.addRange(Q)));
										}
									}
								}
							}
							for (W = [], F = x; (F = F.parentNode); )
								F.nodeType === 1 && W.push({ element: F, left: F.scrollLeft, top: F.scrollTop });
							for (typeof x.focus == "function" && x.focus(), x = 0; x < W.length; x++) {
								var J = W[x];
								((J.element.scrollLeft = J.left), (J.element.scrollTop = J.top));
							}
						}
						((Ol = !!Rf), (Of = Rf = null));
					} finally {
						((Ve = c), (B.p = s), (H.T = r));
					}
				}
				((t.current = i), (kt = 2));
			}
		}
		function Eg() {
			if (kt === 2) {
				kt = 0;
				var t = Pi,
					i = wr,
					r = (i.flags & 8772) !== 0;
				if ((i.subtreeFlags & 8772) !== 0 || r) {
					((r = H.T), (H.T = null));
					var s = B.p;
					B.p = 2;
					var c = Ve;
					Ve |= 4;
					try {
						Jv(t, i.alternate, i);
					} finally {
						((Ve = c), (B.p = s), (H.T = r));
					}
				}
				kt = 3;
			}
		}
		function Cg() {
			if (kt === 4 || kt === 3) {
				((kt = 0), ft());
				var t = Pi,
					i = wr,
					r = yi,
					s = fg;
				(i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0
					? (kt = 5)
					: ((kt = 0), (wr = Pi = null), Tg(t, t.pendingLanes));
				var c = t.pendingLanes;
				if ((c === 0 && (Qi = null), jo(r), (i = i.stateNode), hn && typeof hn.onCommitFiberRoot == "function"))
					try {
						hn.onCommitFiberRoot(ei, i, void 0, (i.current.flags & 128) === 128);
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
				((yi & 3) !== 0 && yl(),
					bi(t),
					(c = t.pendingLanes),
					(r & 261930) !== 0 && (c & 42) !== 0 ? (t === gf ? Nu++ : ((Nu = 0), (gf = t))) : (Nu = 0),
					Mu(0, !1));
			}
		}
		function Tg(t, i) {
			(t.pooledCacheLanes &= i) === 0 && ((i = t.pooledCache), i != null && ((t.pooledCache = null), fu(i)));
		}
		function yl() {
			return (xg(), Eg(), Cg(), Ag());
		}
		function Ag() {
			if (kt !== 5) return !1;
			var t = Pi,
				i = mf;
			mf = 0;
			var r = jo(yi),
				s = H.T,
				c = B.p;
			try {
				((B.p = 32 > r ? 32 : r), (H.T = null), (r = vf), (vf = null));
				var d = Pi,
					g = yi;
				if (((kt = 0), (wr = Pi = null), (yi = 0), (Ve & 6) !== 0)) throw Error(l(331));
				var x = Ve;
				if (
					((Ve |= 4),
					lg(d.current),
					rg(d, d.current, g, r),
					(Ve = x),
					Mu(0, !1),
					hn && typeof hn.onPostCommitFiberRoot == "function")
				)
					try {
						hn.onPostCommitFiberRoot(ei, d);
					} catch {}
				return !0;
			} finally {
				((B.p = c), (H.T = s), Tg(t, i));
			}
		}
		function Rg(t, i, r) {
			((i = Cn(r, i)), (i = Yc(t.stateNode, i, 2)), (t = Aa(t, i, 2)), t !== null && (xs(t, 2), bi(t)));
		}
		function Pe(t, i, r) {
			if (t.tag === 3) Rg(t, t, r);
			else
				for (; i !== null; ) {
					if (i.tag === 3) {
						Rg(i, t, r);
						break;
					} else if (i.tag === 1) {
						var s = i.stateNode;
						if (
							typeof i.type.getDerivedStateFromError == "function" ||
							(typeof s.componentDidCatch == "function" && (Qi === null || !Qi.has(s)))
						) {
							((t = Cn(r, t)), (r = Ov(2)), (s = Aa(i, r, 2)), s !== null && (Nv(r, s, i, t), xs(s, 2), bi(s)));
							break;
						}
					}
					i = i.return;
				}
		}
		function pf(t, i, r) {
			var s = t.pingCache;
			if (s === null) {
				s = t.pingCache = new Ww();
				var c = new Set();
				s.set(i, c);
			} else ((c = s.get(i)), c === void 0 && ((c = new Set()), s.set(i, c)));
			c.has(r) || ((ff = !0), c.add(r), (t = a_.bind(null, t, i, r)), i.then(t, t));
		}
		function a_(t, i, r) {
			var s = t.pingCache;
			(s !== null && s.delete(i),
				(t.pingedLanes |= t.suspendedLanes & r),
				(t.warmLanes &= ~r),
				Je === t &&
					(ze & r) === r &&
					(ct === 4 || (ct === 3 && (ze & 62914560) === ze && 300 > je() - fl) ? (Ve & 2) === 0 && _r(t, 0) : (df |= r),
					Sr === ze && (Sr = 0)),
				bi(t));
		}
		function Og(t, i) {
			(i === 0 && (i = Ch()), (t = ya(t, i)), t !== null && (xs(t, i), bi(t)));
		}
		function r_(t) {
			var i = t.memoizedState,
				r = 0;
			(i !== null && (r = i.retryLane), Og(t, r));
		}
		function u_(t, i) {
			var r = 0;
			switch (t.tag) {
				case 31:
				case 13:
					var s = t.stateNode,
						c = t.memoizedState;
					c !== null && (r = c.retryLane);
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
			(s !== null && s.delete(i), Og(t, r));
		}
		function s_(t, i) {
			return Nt(t, i);
		}
		var bl = null,
			Er = null,
			Sf = !1,
			pl = !1,
			wf = !1,
			Fi = 0;
		function bi(t) {
			(t !== Er && t.next === null && (Er === null ? (bl = Er = t) : (Er = Er.next = t)),
				(pl = !0),
				Sf || ((Sf = !0), o_()));
		}
		function Mu(t, i) {
			if (!wf && pl) {
				wf = !0;
				do
					for (var r = !1, s = bl; s !== null; ) {
						if (!i)
							if (t !== 0) {
								var c = s.pendingLanes;
								if (c === 0) var d = 0;
								else {
									var g = s.suspendedLanes,
										x = s.pingedLanes;
									((d = (1 << (31 - mn(42 | t) + 1)) - 1),
										(d &= c & ~(g & ~x)),
										(d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0));
								}
								d !== 0 && ((r = !0), kg(s, d));
							} else
								((d = ze),
									(d = _s(s, s === Je ? d : 0, s.cancelPendingCommit !== null || s.timeoutHandle !== -1)),
									(d & 3) === 0 || Gr(s, d) || ((r = !0), kg(s, d)));
						s = s.next;
					}
				while (r);
				wf = !1;
			}
		}
		function l_() {
			Ng();
		}
		function Ng() {
			pl = Sf = !1;
			var t = 0;
			Fi !== 0 && y_() && (t = Fi);
			for (var i = je(), r = null, s = bl; s !== null; ) {
				var c = s.next,
					d = Mg(s, i);
				(d === 0
					? ((s.next = null), r === null ? (bl = c) : (r.next = c), c === null && (Er = r))
					: ((r = s), (t !== 0 || (d & 3) !== 0) && (pl = !0)),
					(s = c));
			}
			((kt !== 0 && kt !== 5) || Mu(t, !1), Fi !== 0 && (Fi = 0));
		}
		function Mg(t, i) {
			for (
				var r = t.suspendedLanes, s = t.pingedLanes, c = t.expirationTimes, d = t.pendingLanes & -62914561;
				0 < d;
			) {
				var g = 31 - mn(d),
					x = 1 << g,
					z = c[g];
				(z === -1 ? ((x & r) === 0 || (x & s) !== 0) && (c[g] = HS(x, i)) : z <= i && (t.expiredLanes |= x), (d &= ~x));
			}
			if (
				((i = Je),
				(r = ze),
				(r = _s(t, t === i ? r : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				(s = t.callbackNode),
				r === 0 || (t === i && (Qe === 2 || Qe === 9)) || t.cancelPendingCommit !== null)
			)
				return (s !== null && s !== null && re(s), (t.callbackNode = null), (t.callbackPriority = 0));
			if ((r & 3) === 0 || Gr(t, r)) {
				if (((i = r & -r), i === t.callbackPriority)) return i;
				switch ((s !== null && re(s), jo(r))) {
					case 2:
					case 8:
						r = bt;
						break;
					case 32:
						r = Lt;
						break;
					case 268435456:
						r = Ee;
						break;
					default:
						r = Lt;
				}
				return ((s = zg.bind(null, t)), (r = Nt(r, s)), (t.callbackPriority = i), (t.callbackNode = r), i);
			}
			return (s !== null && s !== null && re(s), (t.callbackPriority = 2), (t.callbackNode = null), 2);
		}
		function zg(t, i) {
			if (kt !== 0 && kt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
			var r = t.callbackNode;
			if (yl() && t.callbackNode !== r) return null;
			var s = ze;
			return (
				(s = _s(t, t === Je ? s : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
				s === 0
					? null
					: (hg(t, s, i), Mg(t, je()), t.callbackNode != null && t.callbackNode === r ? zg.bind(null, t) : null)
			);
		}
		function kg(t, i) {
			if (yl()) return null;
			hg(t, i, !0);
		}
		function o_() {
			p_(function () {
				(Ve & 6) !== 0 ? Nt(Mt, l_) : Ng();
			});
		}
		function _f() {
			if (Fi === 0) {
				var t = or;
				(t === 0 && ((t = ps), (ps <<= 1), (ps & 261888) === 0 && (ps = 256)), (Fi = t));
			}
			return Fi;
		}
		function Dg(t) {
			return t == null || typeof t == "symbol" || typeof t == "boolean"
				? null
				: typeof t == "function"
					? t
					: As("" + t);
		}
		function jg(t, i) {
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
		function c_(t, i, r, s, c) {
			if (i === "submit" && r && r.stateNode === c) {
				var d = Dg((c[Wt] || null).action),
					g = s.submitter;
				g &&
					((i = (i = g[Wt] || null) ? Dg(i.formAction) : g.getAttribute("formAction")),
					i !== null && ((d = i), (g = null)));
				var x = new Ms("action", "action", null, s, c);
				t.push({
					event: x,
					listeners: [
						{
							instance: null,
							listener: function () {
								if (s.defaultPrevented) {
									if (Fi !== 0) {
										var z = g ? jg(c, g) : new FormData(c);
										Bc(r, { pending: !0, data: z, method: c.method, action: d }, null, z);
									}
								} else
									typeof d == "function" &&
										(x.preventDefault(),
										(z = g ? jg(c, g) : new FormData(c)),
										Bc(r, { pending: !0, data: z, method: c.method, action: d }, d, z));
							},
							currentTarget: c,
						},
					],
				});
			}
		}
		for (var xf = 0; xf < ac.length; xf++) {
			var Ef = ac[xf];
			Un(Ef.toLowerCase(), "on" + (Ef[0].toUpperCase() + Ef.slice(1)));
		}
		(Un(vm, "onAnimationEnd"),
			Un(gm, "onAnimationIteration"),
			Un(ym, "onAnimationStart"),
			Un("dblclick", "onDoubleClick"),
			Un("focusin", "onFocus"),
			Un("focusout", "onBlur"),
			Un(Cw, "onTransitionRun"),
			Un(Tw, "onTransitionStart"),
			Un(Aw, "onTransitionCancel"),
			Un(bm, "onTransitionEnd"),
			Ka("onMouseEnter", ["mouseout", "mouseover"]),
			Ka("onMouseLeave", ["mouseout", "mouseover"]),
			Ka("onPointerEnter", ["pointerout", "pointerover"]),
			Ka("onPointerLeave", ["pointerout", "pointerover"]),
			ha("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
			ha("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
			ha("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
			ha("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
			ha("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
			ha("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" ")));
		var zu =
				"abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
					" ",
				),
			f_ = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(zu));
		function qg(t, i) {
			i = (i & 4) !== 0;
			for (var r = 0; r < t.length; r++) {
				var s = t[r],
					c = s.event;
				s = s.listeners;
				e: {
					var d = void 0;
					if (i)
						for (var g = s.length - 1; 0 <= g; g--) {
							var x = s[g],
								z = x.instance,
								P = x.currentTarget;
							if (((x = x.listener), z !== d && c.isPropagationStopped())) break e;
							((d = x), (c.currentTarget = P));
							try {
								d(c);
							} catch (X) {
								Ds(X);
							}
							((c.currentTarget = null), (d = z));
						}
					else
						for (g = 0; g < s.length; g++) {
							if (
								((x = s[g]),
								(z = x.instance),
								(P = x.currentTarget),
								(x = x.listener),
								z !== d && c.isPropagationStopped())
							)
								break e;
							((d = x), (c.currentTarget = P));
							try {
								d(c);
							} catch (X) {
								Ds(X);
							}
							((c.currentTarget = null), (d = z));
						}
				}
			}
		}
		function Me(t, i) {
			var r = i[qo];
			r === void 0 && (r = i[qo] = new Set());
			var s = t + "__bubble";
			r.has(s) || (Ig(i, t, 2, !1), r.add(s));
		}
		function Cf(t, i, r) {
			var s = 0;
			(i && (s |= 4), Ig(r, t, s, i));
		}
		var Sl = "_reactListening" + Math.random().toString(36).slice(2);
		function Ug(t) {
			if (!t[Sl]) {
				((t[Sl] = !0),
					kh.forEach(function (r) {
						r !== "selectionchange" && (f_.has(r) || Cf(r, !1, t), Cf(r, !0, t));
					}));
				var i = t.nodeType === 9 ? t : t.ownerDocument;
				i === null || i[Sl] || ((i[Sl] = !0), Cf("selectionchange", !1, i));
			}
		}
		function Ig(t, i, r, s) {
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
			((r = c.bind(null, i, r, t)),
				(c = void 0),
				!Qo || (i !== "touchstart" && i !== "touchmove" && i !== "wheel") || (c = !0),
				s
					? c !== void 0
						? t.addEventListener(i, r, { capture: !0, passive: c })
						: t.addEventListener(i, r, !0)
					: c !== void 0
						? t.addEventListener(i, r, { passive: c })
						: t.addEventListener(i, r, !1));
		}
		function Tf(t, i, r, s, c) {
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
								var z = g.tag;
								if ((z === 3 || z === 4) && g.stateNode.containerInfo === c) return;
								g = g.return;
							}
						for (; x !== null; ) {
							if (((g = Pa(x)), g === null)) return;
							if (((z = g.tag), z === 5 || z === 6 || z === 26 || z === 27)) {
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
					X = Ho(r),
					W = [];
				e: {
					var Y = pm.get(t);
					if (Y !== void 0) {
						var F = Ms,
							oe = t;
						switch (t) {
							case "keypress":
								if (Os(r) === 0) break e;
							case "keydown":
							case "keyup":
								F = lw;
								break;
							case "focusin":
								((oe = "focus"), (F = Ko));
								break;
							case "focusout":
								((oe = "blur"), (F = Ko));
								break;
							case "beforeblur":
							case "afterblur":
								F = Ko;
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
								F = Fh;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								F = tw;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								F = ow;
								break;
							case vm:
							case gm:
							case ym:
								F = nw;
								break;
							case bm:
								F = cw;
								break;
							case "scroll":
							case "scrollend":
								F = ew;
								break;
							case "wheel":
								F = fw;
								break;
							case "copy":
							case "cut":
							case "paste":
								F = iw;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								F = Gh;
								break;
							case "toggle":
							case "beforetoggle":
								F = dw;
						}
						var be = (i & 4) !== 0,
							Ge = !be && (t === "scroll" || t === "scrollend"),
							V = be ? (Y !== null ? Y + "Capture" : null) : Y;
						be = [];
						for (var q = P, Q; q !== null; ) {
							var J = q;
							if (
								((Q = J.stateNode),
								(J = J.tag),
								(J !== 5 && J !== 26 && J !== 27) ||
									Q === null ||
									V === null ||
									((J = eu(q, V)), J != null && be.push(ku(q, J, Q))),
								Ge)
							)
								break;
							q = q.return;
						}
						0 < be.length && ((Y = new F(Y, oe, null, r, X)), W.push({ event: Y, listeners: be }));
					}
				}
				if ((i & 7) === 0) {
					e: {
						if (
							((Y = t === "mouseover" || t === "pointerover"),
							(F = t === "mouseout" || t === "pointerout"),
							Y && r !== Vo && (oe = r.relatedTarget || r.fromElement) && (Pa(oe) || oe[Xr]))
						)
							break e;
						if (
							(F || Y) &&
							((Y = X.window === X ? X : (Y = X.ownerDocument) ? Y.defaultView || Y.parentWindow : window),
							F
								? ((oe = r.relatedTarget || r.toElement),
									(F = P),
									(oe = oe ? Pa(oe) : null),
									oe !== null &&
										((Ge = f(oe)), (be = oe.tag), oe !== Ge || (be !== 5 && be !== 27 && be !== 6)) &&
										(oe = null))
								: ((F = null), (oe = P)),
							F !== oe)
						) {
							if (
								((be = Fh),
								(J = "onMouseLeave"),
								(V = "onMouseEnter"),
								(q = "mouse"),
								(t === "pointerout" || t === "pointerover") &&
									((be = Gh), (J = "onPointerLeave"), (V = "onPointerEnter"), (q = "pointer")),
								(Ge = F == null ? Y : Wr(F)),
								(Q = oe == null ? Y : Wr(oe)),
								(Y = new be(J, q + "leave", F, r, X)),
								(Y.target = Ge),
								(Y.relatedTarget = Q),
								(J = null),
								Pa(X) === P &&
									((be = new be(V, q + "enter", oe, r, X)), (be.target = Q), (be.relatedTarget = Ge), (J = be)),
								(Ge = J),
								F && oe)
							)
								t: {
									for (be = d_, V = F, q = oe, Q = 0, J = V; J; J = be(J)) Q++;
									J = 0;
									for (var me = q; me; me = be(me)) J++;
									for (; 0 < Q - J; ) ((V = be(V)), Q--);
									for (; 0 < J - Q; ) ((q = be(q)), J--);
									for (; Q--; ) {
										if (V === q || (q !== null && V === q.alternate)) {
											be = V;
											break t;
										}
										((V = be(V)), (q = be(q)));
									}
									be = null;
								}
							else be = null;
							(F !== null && Lg(W, Y, F, be, !1), oe !== null && Ge !== null && Lg(W, Ge, oe, be, !0));
						}
					}
					e: {
						if (
							((Y = P ? Wr(P) : window),
							(F = Y.nodeName && Y.nodeName.toLowerCase()),
							F === "select" || (F === "input" && Y.type === "file"))
						)
							var $e = am;
						else if (nm(Y))
							if (rm) $e = _w;
							else {
								$e = Sw;
								var he = pw;
							}
						else
							((F = Y.nodeName),
								!F || F.toLowerCase() !== "input" || (Y.type !== "checkbox" && Y.type !== "radio")
									? P && Bo(P.elementType) && ($e = am)
									: ($e = ww));
						if ($e && ($e = $e(t, P))) {
							im(W, $e, r, X);
							break e;
						}
						(he && he(t, Y, P),
							t === "focusout" &&
								P &&
								Y.type === "number" &&
								P.memoizedProps.value != null &&
								$o(Y, "number", Y.value));
					}
					switch (((he = P ? Wr(P) : window), t)) {
						case "focusin":
							(nm(he) || he.contentEditable === "true") && ((tr = he), (tc = P), (lu = null));
							break;
						case "focusout":
							lu = tc = tr = null;
							break;
						case "mousedown":
							nc = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							((nc = !1), hm(W, r, X));
							break;
						case "selectionchange":
							if (Ew) break;
						case "keydown":
						case "keyup":
							hm(W, r, X);
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
						er
							? em(t, r) && (ke = "onCompositionEnd")
							: t === "keydown" && r.keyCode === 229 && (ke = "onCompositionStart");
					(ke &&
						(Xh &&
							r.locale !== "ko" &&
							(er || ke !== "onCompositionStart"
								? ke === "onCompositionEnd" && er && (Ae = Ph())
								: ((Di = X), (Po = "value" in Di ? Di.value : Di.textContent), (er = !0))),
						(he = wl(P, ke)),
						0 < he.length &&
							((ke = new Kh(ke, t, null, r, X)),
							W.push({ event: ke, listeners: he }),
							Ae ? (ke.data = Ae) : ((Ae = tm(r)), Ae !== null && (ke.data = Ae)))),
						(Ae = mw ? vw(t, r) : gw(t, r)) &&
							((ke = wl(P, "onBeforeInput")),
							0 < ke.length &&
								((he = new Kh("onBeforeInput", "beforeinput", null, r, X)),
								W.push({ event: he, listeners: ke }),
								(he.data = Ae))),
						c_(W, t, P, r, X));
				}
				qg(W, i);
			});
		}
		function ku(t, i, r) {
			return { instance: t, listener: i, currentTarget: r };
		}
		function wl(t, i) {
			for (var r = i + "Capture", s = []; t !== null; ) {
				var c = t,
					d = c.stateNode;
				if (
					((c = c.tag),
					(c !== 5 && c !== 26 && c !== 27) ||
						d === null ||
						((c = eu(t, r)), c != null && s.unshift(ku(t, c, d)), (c = eu(t, i)), c != null && s.push(ku(t, c, d))),
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
		function Lg(t, i, r, s, c) {
			for (var d = i._reactName, g = []; r !== null && r !== s; ) {
				var x = r,
					z = x.alternate,
					P = x.stateNode;
				if (((x = x.tag), z !== null && z === s)) break;
				((x !== 5 && x !== 26 && x !== 27) ||
					P === null ||
					((z = P),
					c
						? ((P = eu(r, d)), P != null && g.unshift(ku(r, P, z)))
						: c || ((P = eu(r, d)), P != null && g.push(ku(r, P, z)))),
					(r = r.return));
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
		function Ke(t, i, r, s, c, d) {
			switch (r) {
				case "children":
					typeof s == "string"
						? i === "body" || (i === "textarea" && s === "") || Xa(t, s)
						: (typeof s == "number" || typeof s == "bigint") && i !== "body" && Xa(t, "" + s);
					break;
				case "className":
					Cs(t, "class", s);
					break;
				case "tabIndex":
					Cs(t, "tabindex", s);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					Cs(t, r, s);
					break;
				case "style":
					Hh(t, s, d);
					break;
				case "data":
					if (i !== "object") {
						Cs(t, "data", s);
						break;
					}
				case "src":
				case "href":
					if (s === "" && (i !== "a" || r !== "href")) {
						t.removeAttribute(r);
						break;
					}
					if (s == null || typeof s == "function" || typeof s == "symbol" || typeof s == "boolean") {
						t.removeAttribute(r);
						break;
					}
					((s = As("" + s)), t.setAttribute(r, s));
					break;
				case "action":
				case "formAction":
					if (typeof s == "function") {
						t.setAttribute(
							r,
							"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
						);
						break;
					} else
						typeof d == "function" &&
							(r === "formAction"
								? (i !== "input" && Ke(t, i, "name", c.name, c, null),
									Ke(t, i, "formEncType", c.formEncType, c, null),
									Ke(t, i, "formMethod", c.formMethod, c, null),
									Ke(t, i, "formTarget", c.formTarget, c, null))
								: (Ke(t, i, "encType", c.encType, c, null),
									Ke(t, i, "method", c.method, c, null),
									Ke(t, i, "target", c.target, c, null)));
					if (s == null || typeof s == "symbol" || typeof s == "boolean") {
						t.removeAttribute(r);
						break;
					}
					((s = As("" + s)), t.setAttribute(r, s));
					break;
				case "onClick":
					s != null && (t.onclick = ni);
					break;
				case "onScroll":
					s != null && Me("scroll", t);
					break;
				case "onScrollEnd":
					s != null && Me("scrollend", t);
					break;
				case "dangerouslySetInnerHTML":
					if (s != null) {
						if (typeof s != "object" || !("__html" in s)) throw Error(l(61));
						if (((r = s.__html), r != null)) {
							if (c.children != null) throw Error(l(60));
							t.innerHTML = r;
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
					((r = As("" + s)), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", r));
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
						? t.setAttribute(r, "" + s)
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
					s && typeof s != "function" && typeof s != "symbol" ? t.setAttribute(r, "") : t.removeAttribute(r);
					break;
				case "capture":
				case "download":
					s === !0
						? t.setAttribute(r, "")
						: s !== !1 && s != null && typeof s != "function" && typeof s != "symbol"
							? t.setAttribute(r, s)
							: t.removeAttribute(r);
					break;
				case "cols":
				case "rows":
				case "size":
				case "span":
					s != null && typeof s != "function" && typeof s != "symbol" && !isNaN(s) && 1 <= s
						? t.setAttribute(r, s)
						: t.removeAttribute(r);
					break;
				case "rowSpan":
				case "start":
					s == null || typeof s == "function" || typeof s == "symbol" || isNaN(s)
						? t.removeAttribute(r)
						: t.setAttribute(r, s);
					break;
				case "popover":
					(Me("beforetoggle", t), Me("toggle", t), Es(t, "popover", s));
					break;
				case "xlinkActuate":
					ti(t, "http://www.w3.org/1999/xlink", "xlink:actuate", s);
					break;
				case "xlinkArcrole":
					ti(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", s);
					break;
				case "xlinkRole":
					ti(t, "http://www.w3.org/1999/xlink", "xlink:role", s);
					break;
				case "xlinkShow":
					ti(t, "http://www.w3.org/1999/xlink", "xlink:show", s);
					break;
				case "xlinkTitle":
					ti(t, "http://www.w3.org/1999/xlink", "xlink:title", s);
					break;
				case "xlinkType":
					ti(t, "http://www.w3.org/1999/xlink", "xlink:type", s);
					break;
				case "xmlBase":
					ti(t, "http://www.w3.org/XML/1998/namespace", "xml:base", s);
					break;
				case "xmlLang":
					ti(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", s);
					break;
				case "xmlSpace":
					ti(t, "http://www.w3.org/XML/1998/namespace", "xml:space", s);
					break;
				case "is":
					Es(t, "is", s);
					break;
				case "innerText":
				case "textContent":
					break;
				default:
					(!(2 < r.length) || (r[0] !== "o" && r[0] !== "O") || (r[1] !== "n" && r[1] !== "N")) &&
						((r = JS.get(r) || r), Es(t, r, s));
			}
		}
		function Af(t, i, r, s, c, d) {
			switch (r) {
				case "style":
					Hh(t, s, d);
					break;
				case "dangerouslySetInnerHTML":
					if (s != null) {
						if (typeof s != "object" || !("__html" in s)) throw Error(l(61));
						if (((r = s.__html), r != null)) {
							if (c.children != null) throw Error(l(60));
							t.innerHTML = r;
						}
					}
					break;
				case "children":
					typeof s == "string" ? Xa(t, s) : (typeof s == "number" || typeof s == "bigint") && Xa(t, "" + s);
					break;
				case "onScroll":
					s != null && Me("scroll", t);
					break;
				case "onScrollEnd":
					s != null && Me("scrollend", t);
					break;
				case "onClick":
					s != null && (t.onclick = ni);
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
					if (!Dh.hasOwnProperty(r))
						e: {
							if (
								r[0] === "o" &&
								r[1] === "n" &&
								((c = r.endsWith("Capture")),
								(i = r.slice(2, c ? r.length - 7 : void 0)),
								(d = t[Wt] || null),
								(d = d != null ? d[r] : null),
								typeof d == "function" && t.removeEventListener(i, d, c),
								typeof s == "function")
							) {
								(typeof d != "function" &&
									d !== null &&
									(r in t ? (t[r] = null) : t.hasAttribute(r) && t.removeAttribute(r)),
									t.addEventListener(i, s, c));
								break e;
							}
							r in t ? (t[r] = s) : s === !0 ? t.setAttribute(r, "") : Es(t, r, s);
						}
			}
		}
		function Zt(t, i, r) {
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
					(Me("error", t), Me("load", t));
					var s = !1,
						c = !1,
						d;
					for (d in r)
						if (r.hasOwnProperty(d)) {
							var g = r[d];
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
										Ke(t, i, d, g, r, null);
								}
						}
					(c && Ke(t, i, "srcSet", r.srcSet, r, null), s && Ke(t, i, "src", r.src, r, null));
					return;
				case "input":
					Me("invalid", t);
					var x = (d = g = c = null),
						z = null,
						P = null;
					for (s in r)
						if (r.hasOwnProperty(s)) {
							var X = r[s];
							if (X != null)
								switch (s) {
									case "name":
										c = X;
										break;
									case "type":
										g = X;
										break;
									case "checked":
										z = X;
										break;
									case "defaultChecked":
										P = X;
										break;
									case "value":
										d = X;
										break;
									case "defaultValue":
										x = X;
										break;
									case "children":
									case "dangerouslySetInnerHTML":
										if (X != null) throw Error(l(137, i));
										break;
									default:
										Ke(t, i, s, X, r, null);
								}
						}
					Lh(t, d, x, z, P, g, c, !1);
					return;
				case "select":
					(Me("invalid", t), (s = g = d = null));
					for (c in r)
						if (r.hasOwnProperty(c) && ((x = r[c]), x != null))
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
									Ke(t, i, c, x, r, null);
							}
					((i = d), (r = g), (t.multiple = !!s), i != null ? Ga(t, !!s, i, !1) : r != null && Ga(t, !!s, r, !0));
					return;
				case "textarea":
					(Me("invalid", t), (d = c = s = null));
					for (g in r)
						if (r.hasOwnProperty(g) && ((x = r[g]), x != null))
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
									Ke(t, i, g, x, r, null);
							}
					Bh(t, s, c, d);
					return;
				case "option":
					for (z in r)
						if (r.hasOwnProperty(z) && ((s = r[z]), s != null))
							switch (z) {
								case "selected":
									t.selected = s && typeof s != "function" && typeof s != "symbol";
									break;
								default:
									Ke(t, i, z, s, r, null);
							}
					return;
				case "dialog":
					(Me("beforetoggle", t), Me("toggle", t), Me("cancel", t), Me("close", t));
					break;
				case "iframe":
				case "object":
					Me("load", t);
					break;
				case "video":
				case "audio":
					for (s = 0; s < zu.length; s++) Me(zu[s], t);
					break;
				case "image":
					(Me("error", t), Me("load", t));
					break;
				case "details":
					Me("toggle", t);
					break;
				case "embed":
				case "source":
				case "link":
					(Me("error", t), Me("load", t));
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
					for (P in r)
						if (r.hasOwnProperty(P) && ((s = r[P]), s != null))
							switch (P) {
								case "children":
								case "dangerouslySetInnerHTML":
									throw Error(l(137, i));
								default:
									Ke(t, i, P, s, r, null);
							}
					return;
				default:
					if (Bo(i)) {
						for (X in r) r.hasOwnProperty(X) && ((s = r[X]), s !== void 0 && Af(t, i, X, s, r, void 0));
						return;
					}
			}
			for (x in r) r.hasOwnProperty(x) && ((s = r[x]), s != null && Ke(t, i, x, s, r, null));
		}
		function v_(t, i, r, s) {
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
						z = null,
						P = null,
						X = null;
					for (F in r) {
						var W = r[F];
						if (r.hasOwnProperty(F) && W != null)
							switch (F) {
								case "checked":
									break;
								case "value":
									break;
								case "defaultValue":
									z = W;
								default:
									s.hasOwnProperty(F) || Ke(t, i, F, null, s, W);
							}
					}
					for (var Y in s) {
						var F = s[Y];
						if (((W = r[Y]), s.hasOwnProperty(Y) && (F != null || W != null)))
							switch (Y) {
								case "type":
									d = F;
									break;
								case "name":
									c = F;
									break;
								case "checked":
									P = F;
									break;
								case "defaultChecked":
									X = F;
									break;
								case "value":
									g = F;
									break;
								case "defaultValue":
									x = F;
									break;
								case "children":
								case "dangerouslySetInnerHTML":
									if (F != null) throw Error(l(137, i));
									break;
								default:
									F !== W && Ke(t, i, Y, F, s, W);
							}
					}
					Lo(t, g, x, z, P, X, d, c);
					return;
				case "select":
					F = g = x = Y = null;
					for (d in r)
						if (((z = r[d]), r.hasOwnProperty(d) && z != null))
							switch (d) {
								case "value":
									break;
								case "multiple":
									F = z;
								default:
									s.hasOwnProperty(d) || Ke(t, i, d, null, s, z);
							}
					for (c in s)
						if (((d = s[c]), (z = r[c]), s.hasOwnProperty(c) && (d != null || z != null)))
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
									d !== z && Ke(t, i, c, d, s, z);
							}
					((i = x),
						(r = g),
						(s = F),
						Y != null
							? Ga(t, !!r, Y, !1)
							: !!s != !!r && (i != null ? Ga(t, !!r, i, !0) : Ga(t, !!r, r ? [] : "", !1)));
					return;
				case "textarea":
					F = Y = null;
					for (x in r)
						if (((c = r[x]), r.hasOwnProperty(x) && c != null && !s.hasOwnProperty(x)))
							switch (x) {
								case "value":
									break;
								case "children":
									break;
								default:
									Ke(t, i, x, null, s, c);
							}
					for (g in s)
						if (((c = s[g]), (d = r[g]), s.hasOwnProperty(g) && (c != null || d != null)))
							switch (g) {
								case "value":
									Y = c;
									break;
								case "defaultValue":
									F = c;
									break;
								case "children":
									break;
								case "dangerouslySetInnerHTML":
									if (c != null) throw Error(l(91));
									break;
								default:
									c !== d && Ke(t, i, g, c, s, d);
							}
					$h(t, Y, F);
					return;
				case "option":
					for (var oe in r)
						if (((Y = r[oe]), r.hasOwnProperty(oe) && Y != null && !s.hasOwnProperty(oe)))
							switch (oe) {
								case "selected":
									t.selected = !1;
									break;
								default:
									Ke(t, i, oe, null, s, Y);
							}
					for (z in s)
						if (((Y = s[z]), (F = r[z]), s.hasOwnProperty(z) && Y !== F && (Y != null || F != null)))
							switch (z) {
								case "selected":
									t.selected = Y && typeof Y != "function" && typeof Y != "symbol";
									break;
								default:
									Ke(t, i, z, Y, s, F);
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
					for (var be in r)
						((Y = r[be]), r.hasOwnProperty(be) && Y != null && !s.hasOwnProperty(be) && Ke(t, i, be, null, s, Y));
					for (P in s)
						if (((Y = s[P]), (F = r[P]), s.hasOwnProperty(P) && Y !== F && (Y != null || F != null)))
							switch (P) {
								case "children":
								case "dangerouslySetInnerHTML":
									if (Y != null) throw Error(l(137, i));
									break;
								default:
									Ke(t, i, P, Y, s, F);
							}
					return;
				default:
					if (Bo(i)) {
						for (var Ge in r)
							((Y = r[Ge]),
								r.hasOwnProperty(Ge) && Y !== void 0 && !s.hasOwnProperty(Ge) && Af(t, i, Ge, void 0, s, Y));
						for (X in s)
							((Y = s[X]),
								(F = r[X]),
								!s.hasOwnProperty(X) || Y === F || (Y === void 0 && F === void 0) || Af(t, i, X, Y, s, F));
						return;
					}
			}
			for (var V in r)
				((Y = r[V]), r.hasOwnProperty(V) && Y != null && !s.hasOwnProperty(V) && Ke(t, i, V, null, s, Y));
			for (W in s)
				((Y = s[W]), (F = r[W]), !s.hasOwnProperty(W) || Y === F || (Y == null && F == null) || Ke(t, i, W, Y, s, F));
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
				for (var t = 0, i = 0, r = performance.getEntriesByType("resource"), s = 0; s < r.length; s++) {
					var c = r[s],
						d = c.transferSize,
						g = c.initiatorType,
						x = c.duration;
					if (d && x && Vg(g)) {
						for (g = 0, x = c.responseEnd, s += 1; s < r.length; s++) {
							var z = r[s],
								P = z.startTime;
							if (P > x) break;
							var X = z.transferSize,
								W = z.initiatorType;
							X && Vg(W) && ((z = z.responseEnd), (g += X * (z < x ? 1 : (x - P) / (z - P))));
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
		function _l(t) {
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
		function Ki(t) {
			return t === "head";
		}
		function Yg(t, i) {
			var r = i,
				s = 0;
			do {
				var c = r.nextSibling;
				if ((t.removeChild(r), c && c.nodeType === 8))
					if (((r = c.data), r === "/$" || r === "/&")) {
						if (s === 0) {
							(t.removeChild(c), Rr(i));
							return;
						}
						s--;
					} else if (r === "$" || r === "$?" || r === "$~" || r === "$!" || r === "&") s++;
					else if (r === "html") Du(t.ownerDocument.documentElement);
					else if (r === "head") {
						((r = t.ownerDocument.head), Du(r));
						for (var d = r.firstChild; d; ) {
							var g = d.nextSibling,
								x = d.nodeName;
							(d[Jr] ||
								x === "SCRIPT" ||
								x === "STYLE" ||
								(x === "LINK" && d.rel.toLowerCase() === "stylesheet") ||
								r.removeChild(d),
								(d = g));
						}
					} else r === "body" && Du(t.ownerDocument.body);
				r = c;
			} while (r);
			Rr(i);
		}
		function Fg(t, i) {
			var r = t;
			t = 0;
			do {
				var s = r.nextSibling;
				if (
					(r.nodeType === 1
						? i
							? ((r._stashedDisplay = r.style.display), (r.style.display = "none"))
							: ((r.style.display = r._stashedDisplay || ""),
								r.getAttribute("style") === "" && r.removeAttribute("style"))
						: r.nodeType === 3 &&
							(i ? ((r._stashedText = r.nodeValue), (r.nodeValue = "")) : (r.nodeValue = r._stashedText || "")),
					s && s.nodeType === 8)
				)
					if (((r = s.data), r === "/$")) {
						if (t === 0) break;
						t--;
					} else (r !== "$" && r !== "$?" && r !== "$~" && r !== "$!") || t++;
				r = s;
			} while (r);
		}
		function zf(t) {
			var i = t.firstChild;
			for (i && i.nodeType === 10 && (i = i.nextSibling); i; ) {
				var r = i;
				switch (((i = i.nextSibling), r.nodeName)) {
					case "HTML":
					case "HEAD":
					case "BODY":
						(zf(r), Uo(r));
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
		function w_(t, i, r, s) {
			for (; t.nodeType === 1; ) {
				var c = r;
				if (t.nodeName.toLowerCase() !== i.toLowerCase()) {
					if (!s && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
				} else if (s) {
					if (!t[Jr])
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
				if (((t = Mn(t.nextSibling)), t === null)) break;
			}
			return null;
		}
		function __(t, i, r) {
			if (i === "") return null;
			for (; t.nodeType !== 3; )
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !r) ||
					((t = Mn(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function Kg(t, i) {
			for (; t.nodeType !== 8; )
				if (
					((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i) ||
					((t = Mn(t.nextSibling)), t === null)
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
			var r = t.ownerDocument;
			if (t.data === "$~") t._reactRetry = i;
			else if (t.data !== "$?" || r.readyState !== "loading") i();
			else {
				var s = function () {
					(i(), r.removeEventListener("DOMContentLoaded", s));
				};
				(r.addEventListener("DOMContentLoaded", s), (t._reactRetry = s));
			}
		}
		function Mn(t) {
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
					var r = t.data;
					if (r === "/$" || r === "/&") {
						if (i === 0) return Mn(t.nextSibling);
						i--;
					} else (r !== "$" && r !== "$!" && r !== "$?" && r !== "$~" && r !== "&") || i++;
				}
				t = t.nextSibling;
			}
			return null;
		}
		function Xg(t) {
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
		function Jg(t, i, r) {
			switch (((i = _l(r)), t)) {
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
			Uo(t);
		}
		var zn = new Map(),
			Wg = new Set();
		function xl(t) {
			return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
		}
		var pi = B.d;
		B.d = { f: E_, r: C_, D: T_, C: A_, L: R_, m: O_, X: M_, S: N_, M: z_ };
		function E_() {
			var t = pi.f(),
				i = ml();
			return t || i;
		}
		function C_(t) {
			var i = Ya(t);
			i !== null && i.tag === 5 && i.type === "form" ? bv(i) : pi.r(t);
		}
		var Cr = typeof document > "u" ? null : document;
		function ey(t, i, r) {
			var s = Cr;
			if (s && typeof i == "string" && i) {
				var c = xn(i);
				((c = 'link[rel="' + t + '"][href="' + c + '"]'),
					typeof r == "string" && (c += '[crossorigin="' + r + '"]'),
					Wg.has(c) ||
						(Wg.add(c),
						(t = { rel: t, crossOrigin: r, href: i }),
						s.querySelector(c) === null &&
							((i = s.createElement("link")), Zt(i, "link", t), qt(i), s.head.appendChild(i))));
			}
		}
		function T_(t) {
			(pi.D(t), ey("dns-prefetch", t, null));
		}
		function A_(t, i) {
			(pi.C(t, i), ey("preconnect", t, i));
		}
		function R_(t, i, r) {
			pi.L(t, i, r);
			var s = Cr;
			if (s && t && i) {
				var c = 'link[rel="preload"][as="' + xn(i) + '"]';
				i === "image" && r && r.imageSrcSet
					? ((c += '[imagesrcset="' + xn(r.imageSrcSet) + '"]'),
						typeof r.imageSizes == "string" && (c += '[imagesizes="' + xn(r.imageSizes) + '"]'))
					: (c += '[href="' + xn(t) + '"]');
				var d = c;
				switch (i) {
					case "style":
						d = Tr(t);
						break;
					case "script":
						d = Ar(t);
				}
				zn.has(d) ||
					((t = p({ rel: "preload", href: i === "image" && r && r.imageSrcSet ? void 0 : t, as: i }, r)),
					zn.set(d, t),
					s.querySelector(c) !== null ||
						(i === "style" && s.querySelector(ju(d))) ||
						(i === "script" && s.querySelector(qu(d))) ||
						((i = s.createElement("link")), Zt(i, "link", t), qt(i), s.head.appendChild(i)));
			}
		}
		function O_(t, i) {
			pi.m(t, i);
			var r = Cr;
			if (r && t) {
				var s = i && typeof i.as == "string" ? i.as : "script",
					c = 'link[rel="modulepreload"][as="' + xn(s) + '"][href="' + xn(t) + '"]',
					d = c;
				switch (s) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script":
						d = Ar(t);
				}
				if (!zn.has(d) && ((t = p({ rel: "modulepreload", href: t }, i)), zn.set(d, t), r.querySelector(c) === null)) {
					switch (s) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script":
							if (r.querySelector(qu(d))) return;
					}
					((s = r.createElement("link")), Zt(s, "link", t), qt(s), r.head.appendChild(s));
				}
			}
		}
		function N_(t, i, r) {
			pi.S(t, i, r);
			var s = Cr;
			if (s && t) {
				var c = Fa(s).hoistableStyles,
					d = Tr(t);
				i = i || "default";
				var g = c.get(d);
				if (!g) {
					var x = { loading: 0, preload: null };
					if ((g = s.querySelector(ju(d)))) x.loading = 5;
					else {
						((t = p({ rel: "stylesheet", href: t, "data-precedence": i }, r)), (r = zn.get(d)) && qf(t, r));
						var z = (g = s.createElement("link"));
						(qt(z),
							Zt(z, "link", t),
							(z._p = new Promise(function (P, X) {
								((z.onload = P), (z.onerror = X));
							})),
							z.addEventListener("load", function () {
								x.loading |= 1;
							}),
							z.addEventListener("error", function () {
								x.loading |= 2;
							}),
							(x.loading |= 4),
							El(g, i, s));
					}
					((g = { type: "stylesheet", instance: g, count: 1, state: x }), c.set(d, g));
				}
			}
		}
		function M_(t, i) {
			pi.X(t, i);
			var r = Cr;
			if (r && t) {
				var s = Fa(r).hoistableScripts,
					c = Ar(t),
					d = s.get(c);
				d ||
					((d = r.querySelector(qu(c))),
					d ||
						((t = p({ src: t, async: !0 }, i)),
						(i = zn.get(c)) && Uf(t, i),
						(d = r.createElement("script")),
						qt(d),
						Zt(d, "link", t),
						r.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					s.set(c, d));
			}
		}
		function z_(t, i) {
			pi.M(t, i);
			var r = Cr;
			if (r && t) {
				var s = Fa(r).hoistableScripts,
					c = Ar(t),
					d = s.get(c);
				d ||
					((d = r.querySelector(qu(c))),
					d ||
						((t = p({ src: t, async: !0, type: "module" }, i)),
						(i = zn.get(c)) && Uf(t, i),
						(d = r.createElement("script")),
						qt(d),
						Zt(d, "link", t),
						r.head.appendChild(d)),
					(d = { type: "script", instance: d, count: 1, state: null }),
					s.set(c, d));
			}
		}
		function ty(t, i, r, s) {
			var c = (c = ge.current) ? xl(c) : null;
			if (!c) throw Error(l(446));
			switch (t) {
				case "meta":
				case "title":
					return null;
				case "style":
					return typeof r.precedence == "string" && typeof r.href == "string"
						? ((i = Tr(r.href)),
							(r = Fa(c).hoistableStyles),
							(s = r.get(i)),
							s || ((s = { type: "style", instance: null, count: 0, state: null }), r.set(i, s)),
							s)
						: { type: "void", instance: null, count: 0, state: null };
				case "link":
					if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
						t = Tr(r.href);
						var d = Fa(c).hoistableStyles,
							g = d.get(t);
						if (
							(g ||
								((c = c.ownerDocument || c),
								(g = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }),
								d.set(t, g),
								(d = c.querySelector(ju(t))) && !d._p && ((g.instance = d), (g.state.loading = 5)),
								zn.has(t) ||
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
									zn.set(t, r),
									d || k_(c, t, r, g.state))),
							i && s === null)
						)
							throw Error(l(528, ""));
						return g;
					}
					if (i && s !== null) throw Error(l(529, ""));
					return null;
				case "script":
					return (
						(i = r.async),
						(r = r.src),
						typeof r == "string" && i && typeof i != "function" && typeof i != "symbol"
							? ((i = Ar(r)),
								(r = Fa(c).hoistableScripts),
								(s = r.get(i)),
								s || ((s = { type: "script", instance: null, count: 0, state: null }), r.set(i, s)),
								s)
							: { type: "void", instance: null, count: 0, state: null }
					);
				default:
					throw Error(l(444, t));
			}
		}
		function Tr(t) {
			return 'href="' + xn(t) + '"';
		}
		function ju(t) {
			return 'link[rel="stylesheet"][' + t + "]";
		}
		function ny(t) {
			return p({}, t, { "data-precedence": t.precedence, precedence: null });
		}
		function k_(t, i, r, s) {
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
					Zt(i, "link", r),
					qt(i),
					t.head.appendChild(i));
		}
		function Ar(t) {
			return '[src="' + xn(t) + '"]';
		}
		function qu(t) {
			return "script[async]" + t;
		}
		function iy(t, i, r) {
			if ((i.count++, i.instance === null))
				switch (i.type) {
					case "style":
						var s = t.querySelector('style[data-href~="' + xn(r.href) + '"]');
						if (s) return ((i.instance = s), qt(s), s);
						var c = p({}, r, { "data-href": r.href, "data-precedence": r.precedence, href: null, precedence: null });
						return (
							(s = (t.ownerDocument || t).createElement("style")),
							qt(s),
							Zt(s, "style", c),
							El(s, r.precedence, t),
							(i.instance = s)
						);
					case "stylesheet":
						c = Tr(r.href);
						var d = t.querySelector(ju(c));
						if (d) return ((i.state.loading |= 4), (i.instance = d), qt(d), d);
						((s = ny(r)), (c = zn.get(c)) && qf(s, c), (d = (t.ownerDocument || t).createElement("link")), qt(d));
						var g = d;
						return (
							(g._p = new Promise(function (x, z) {
								((g.onload = x), (g.onerror = z));
							})),
							Zt(d, "link", s),
							(i.state.loading |= 4),
							El(d, r.precedence, t),
							(i.instance = d)
						);
					case "script":
						return (
							(d = Ar(r.src)),
							(c = t.querySelector(qu(d)))
								? ((i.instance = c), qt(c), c)
								: ((s = r),
									(c = zn.get(d)) && ((s = p({}, r)), Uf(s, c)),
									(t = t.ownerDocument || t),
									(c = t.createElement("script")),
									qt(c),
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
					((s = i.instance), (i.state.loading |= 4), El(s, r.precedence, t));
			return i.instance;
		}
		function El(t, i, r) {
			for (
				var s = r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
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
				: ((i = r.nodeType === 9 ? r.head : r), i.insertBefore(t, i.firstChild));
		}
		function qf(t, i) {
			((t.crossOrigin ??= i.crossOrigin), (t.referrerPolicy ??= i.referrerPolicy), (t.title ??= i.title));
		}
		function Uf(t, i) {
			((t.crossOrigin ??= i.crossOrigin), (t.referrerPolicy ??= i.referrerPolicy), (t.integrity ??= i.integrity));
		}
		var Cl = null;
		function ay(t, i, r) {
			if (Cl === null) {
				var s = new Map(),
					c = (Cl = new Map());
				c.set(r, s);
			} else ((c = Cl), (s = c.get(r)), s || ((s = new Map()), c.set(r, s)));
			if (s.has(t)) return s;
			for (s.set(t, null), r = r.getElementsByTagName(t), c = 0; c < r.length; c++) {
				var d = r[c];
				if (
					!(d[Jr] || d[$t] || (t === "link" && d.getAttribute("rel") === "stylesheet")) &&
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
		function ry(t, i, r) {
			((t = t.ownerDocument || t), t.head.insertBefore(r, i === "title" ? t.querySelector("head > title") : null));
		}
		function D_(t, i, r) {
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
		function uy(t) {
			return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
		}
		function j_(t, i, r, s) {
			if (
				r.type === "stylesheet" &&
				(typeof s.media != "string" || matchMedia(s.media).matches !== !1) &&
				(r.state.loading & 4) === 0
			) {
				if (r.instance === null) {
					var c = Tr(s.href),
						d = i.querySelector(ju(c));
					if (d) {
						((i = d._p),
							i !== null &&
								typeof i == "object" &&
								typeof i.then == "function" &&
								(t.count++, (t = Tl.bind(t)), i.then(t, t)),
							(r.state.loading |= 4),
							(r.instance = d),
							qt(d));
						return;
					}
					((d = i.ownerDocument || i), (s = ny(s)), (c = zn.get(c)) && qf(s, c), (d = d.createElement("link")), qt(d));
					var g = d;
					((g._p = new Promise(function (x, z) {
						((g.onload = x), (g.onerror = z));
					})),
						Zt(d, "link", s),
						(r.instance = d));
				}
				(t.stylesheets === null && (t.stylesheets = new Map()),
					t.stylesheets.set(r, i),
					(i = r.state.preload) &&
						(r.state.loading & 3) === 0 &&
						(t.count++, (r = Tl.bind(t)), i.addEventListener("load", r), i.addEventListener("error", r)));
			}
		}
		var If = 0;
		function q_(t, i) {
			return (
				t.stylesheets && t.count === 0 && Rl(t, t.stylesheets),
				0 < t.count || 0 < t.imgCount
					? function (r) {
							var s = setTimeout(function () {
								if ((t.stylesheets && Rl(t, t.stylesheets), t.unsuspend)) {
									var d = t.unsuspend;
									((t.unsuspend = null), d());
								}
							}, 6e4 + i);
							0 < t.imgBytes && If === 0 && (If = 62500 * g_());
							var c = setTimeout(
								function () {
									if (
										((t.waitingForImages = !1), t.count === 0 && (t.stylesheets && Rl(t, t.stylesheets), t.unsuspend))
									) {
										var d = t.unsuspend;
										((t.unsuspend = null), d());
									}
								},
								(t.imgBytes > If ? 50 : 800) + i,
							);
							return (
								(t.unsuspend = r),
								function () {
									((t.unsuspend = null), clearTimeout(s), clearTimeout(c));
								}
							);
						}
					: null
			);
		}
		function Tl() {
			if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
				if (this.stylesheets) Rl(this, this.stylesheets);
				else if (this.unsuspend) {
					var t = this.unsuspend;
					((this.unsuspend = null), t());
				}
			}
		}
		var Al = null;
		function Rl(t, i) {
			((t.stylesheets = null),
				t.unsuspend !== null && (t.count++, (Al = new Map()), i.forEach(U_, t), (Al = null), Tl.call(t)));
		}
		function U_(t, i) {
			if (!(i.state.loading & 4)) {
				var r = Al.get(t);
				if (r) var s = r.get(null);
				else {
					((r = new Map()), Al.set(t, r));
					for (var c = t.querySelectorAll("link[data-precedence],style[data-precedence]"), d = 0; d < c.length; d++) {
						var g = c[d];
						(g.nodeName === "LINK" || g.getAttribute("media") !== "not all") &&
							(r.set(g.dataset.precedence, g), (s = g));
					}
					s && r.set(null, s);
				}
				((c = i.instance),
					(g = c.getAttribute("data-precedence")),
					(d = r.get(g) || s),
					d === s && r.set(null, c),
					r.set(g, c),
					this.count++,
					(s = Tl.bind(this)),
					c.addEventListener("load", s),
					c.addEventListener("error", s),
					d
						? d.parentNode.insertBefore(c, d.nextSibling)
						: ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(c, t.firstChild)),
					(i.state.loading |= 4));
			}
		}
		var Uu = { $$typeof: R, Provider: null, Consumer: null, _currentValue: ue, _currentValue2: ue, _threadCount: 0 };
		function I_(t, i, r, s, c, d, g, x, z) {
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
				(this.formState = z),
				(this.incompleteTransitions = new Map()));
		}
		function L_(t, i, r, s, c, d, g, x, z, P, X, W) {
			return (
				(t = new I_(t, i, r, g, z, P, X, W, x)),
				(i = 1),
				d === !0 && (i |= 24),
				(d = gn(3, null, null, i)),
				(t.current = d),
				(d.stateNode = t),
				(i = yc()),
				i.refCount++,
				(t.pooledCache = i),
				i.refCount++,
				(d.memoizedState = { element: s, isDehydrated: r, cache: i }),
				wc(d),
				t
			);
		}
		function $_(t) {
			return t ? ((t = ar), t) : ar;
		}
		function sy(t, i, r, s, c, d) {
			((c = $_(c)),
				s.context === null ? (s.context = c) : (s.pendingContext = c),
				(s = Ta(i)),
				(s.payload = { element: r }),
				(d = d === void 0 ? null : d),
				d !== null && (s.callback = d),
				(r = Aa(t, s, i)),
				r !== null && (un(r, t, i), vu(r, t, i)));
		}
		function ly(t, i) {
			if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
				var r = t.retryLane;
				t.retryLane = r !== 0 && r < i ? r : i;
			}
		}
		function Lf(t, i) {
			(ly(t, i), (t = t.alternate) && ly(t, i));
		}
		function oy(t) {
			if (t.tag === 13 || t.tag === 31) {
				var i = ya(t, 67108864);
				(i !== null && un(i, t, 67108864), Lf(t, 67108864));
			}
		}
		function cy(t) {
			if (t.tag === 13 || t.tag === 31) {
				var i = Nn();
				i = Oh(i);
				var r = ya(t, i);
				(r !== null && un(r, t, i), Lf(t, i));
			}
		}
		var Ol = !0;
		function B_(t, i, r, s) {
			var c = H.T;
			H.T = null;
			var d = B.p;
			try {
				((B.p = 2), $f(t, i, r, s));
			} finally {
				((B.p = d), (H.T = c));
			}
		}
		function V_(t, i, r, s) {
			var c = H.T;
			H.T = null;
			var d = B.p;
			try {
				((B.p = 8), $f(t, i, r, s));
			} finally {
				((B.p = d), (H.T = c));
			}
		}
		function $f(t, i, r, s) {
			if (Ol) {
				var c = Bf(s);
				if (c === null) (Tf(t, i, s, Nl, r), dy(t, s));
				else if (Z_(c, t, i, r, s)) s.stopPropagation();
				else if ((dy(t, s), i & 4 && -1 < H_.indexOf(t))) {
					for (; c !== null; ) {
						var d = Ya(c);
						if (d !== null)
							switch (d.tag) {
								case 3:
									if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
										var g = da(d.pendingLanes);
										if (g !== 0) {
											var x = d;
											for (x.pendingLanes |= 2, x.entangledLanes |= 2; g; ) {
												var z = 1 << (31 - mn(g));
												((x.entanglements[1] |= z), (g &= ~z));
											}
											(bi(d), (Ve & 6) === 0 && ((dl = je() + 500), Mu(0, !1)));
										}
									}
									break;
								case 31:
								case 13:
									((x = ya(d, 2)), x !== null && un(x, d, 2), ml(), Lf(d, 2));
							}
						if (((d = Bf(s)), d === null && Tf(t, i, s, Nl, r), d === c)) break;
						c = d;
					}
					c !== null && s.stopPropagation();
				} else Tf(t, i, s, null, r);
			}
		}
		function Bf(t) {
			return ((t = Ho(t)), Vf(t));
		}
		var Nl = null;
		function Vf(t) {
			if (((Nl = null), (t = Pa(t)), t !== null)) {
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
			return ((Nl = t), null);
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
					switch (yt()) {
						case Mt:
							return 2;
						case bt:
							return 8;
						case Lt:
						case ce:
							return 32;
						case Ee:
							return 268435456;
						default:
							return 32;
					}
				default:
					return 32;
			}
		}
		var Hf = !1,
			Gi = null,
			Xi = null,
			Ji = null,
			Iu = new Map(),
			Lu = new Map(),
			Wi = [],
			H_ =
				"mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
					" ",
				);
		function dy(t, i) {
			switch (t) {
				case "focusin":
				case "focusout":
					Gi = null;
					break;
				case "dragenter":
				case "dragleave":
					Xi = null;
					break;
				case "mouseover":
				case "mouseout":
					Ji = null;
					break;
				case "pointerover":
				case "pointerout":
					Iu.delete(i.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture":
					Lu.delete(i.pointerId);
			}
		}
		function $u(t, i, r, s, c, d) {
			return t === null || t.nativeEvent !== d
				? ((t = { blockedOn: i, domEventName: r, eventSystemFlags: s, nativeEvent: d, targetContainers: [c] }),
					i !== null && ((i = Ya(i)), i !== null && oy(i)),
					t)
				: ((t.eventSystemFlags |= s), (i = t.targetContainers), c !== null && i.indexOf(c) === -1 && i.push(c), t);
		}
		function Z_(t, i, r, s, c) {
			switch (i) {
				case "focusin":
					return ((Gi = $u(Gi, t, i, r, s, c)), !0);
				case "dragenter":
					return ((Xi = $u(Xi, t, i, r, s, c)), !0);
				case "mouseover":
					return ((Ji = $u(Ji, t, i, r, s, c)), !0);
				case "pointerover":
					var d = c.pointerId;
					return (Iu.set(d, $u(Iu.get(d) || null, t, i, r, s, c)), !0);
				case "gotpointercapture":
					return ((d = c.pointerId), Lu.set(d, $u(Lu.get(d) || null, t, i, r, s, c)), !0);
			}
			return !1;
		}
		function hy(t) {
			var i = Pa(t.target);
			if (i !== null) {
				var r = f(i);
				if (r !== null) {
					if (((i = r.tag), i === 13)) {
						if (((i = h(r)), i !== null)) {
							((t.blockedOn = i),
								Mh(t.priority, function () {
									cy(r);
								}));
							return;
						}
					} else if (i === 31) {
						if (((i = m(r)), i !== null)) {
							((t.blockedOn = i),
								Mh(t.priority, function () {
									cy(r);
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
		function Ml(t) {
			if (t.blockedOn !== null) return !1;
			for (var i = t.targetContainers; 0 < i.length; ) {
				var r = Bf(t.nativeEvent);
				if (r === null) {
					r = t.nativeEvent;
					var s = new r.constructor(r.type, r);
					((Vo = s), r.target.dispatchEvent(s), (Vo = null));
				} else return ((i = Ya(r)), i !== null && oy(i), (t.blockedOn = r), !1);
				i.shift();
			}
			return !0;
		}
		function my(t, i, r) {
			Ml(t) && r.delete(i);
		}
		function Q_() {
			((Hf = !1),
				Gi !== null && Ml(Gi) && (Gi = null),
				Xi !== null && Ml(Xi) && (Xi = null),
				Ji !== null && Ml(Ji) && (Ji = null),
				Iu.forEach(my),
				Lu.forEach(my));
		}
		function zl(t, i) {
			t.blockedOn === i &&
				((t.blockedOn = null), Hf || ((Hf = !0), n.unstable_scheduleCallback(n.unstable_NormalPriority, Q_)));
		}
		var kl = null;
		function vy(t) {
			kl !== t &&
				((kl = t),
				n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
					kl === t && (kl = null);
					for (var i = 0; i < t.length; i += 3) {
						var r = t[i],
							s = t[i + 1],
							c = t[i + 2];
						if (typeof s != "function") {
							if (Vf(s || r) === null) continue;
							break;
						}
						var d = Ya(r);
						d !== null &&
							(t.splice(i, 3), (i -= 3), Bc(d, { pending: !0, data: c, method: r.method, action: s }, s, c));
					}
				}));
		}
		function Rr(t) {
			function i(z) {
				return zl(z, t);
			}
			(Gi !== null && zl(Gi, t), Xi !== null && zl(Xi, t), Ji !== null && zl(Ji, t), Iu.forEach(i), Lu.forEach(i));
			for (var r = 0; r < Wi.length; r++) {
				var s = Wi[r];
				s.blockedOn === t && (s.blockedOn = null);
			}
			for (; 0 < Wi.length && ((r = Wi[0]), r.blockedOn === null); ) (hy(r), r.blockedOn === null && Wi.shift());
			if (((r = (t.ownerDocument || t).$$reactFormReplay), r != null))
				for (s = 0; s < r.length; s += 3) {
					var c = r[s],
						d = r[s + 1],
						g = c[Wt] || null;
					if (typeof d == "function") g || vy(r);
					else if (g) {
						var x = null;
						if (d && d.hasAttribute("formAction")) {
							if (((c = d), (g = d[Wt] || null))) x = g.formAction;
							else if (Vf(c) !== null) continue;
						} else x = g.action;
						(typeof x == "function" ? (r[s + 1] = x) : (r.splice(s, 3), (s -= 3)), vy(r));
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
				(c !== null && (c(), (c = null)), s || setTimeout(r, 20));
			}
			function r() {
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
					setTimeout(r, 100),
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
				var r = i.current;
				sy(r, Nn(), t, i, null, null);
			}),
			(Qf.prototype.unmount = Zf.prototype.unmount =
				function () {
					var t = this._internalRoot;
					if (t !== null) {
						this._internalRoot = null;
						var i = t.containerInfo;
						(sy(t.current, 2, null, t, null, null), ml(), (i[Xr] = null));
					}
				}));
		function Qf(t) {
			this._internalRoot = t;
		}
		Qf.prototype.unstable_scheduleHydration = function (t) {
			if (t) {
				var i = Nh();
				t = { blockedOn: null, target: t, priority: i };
				for (var r = 0; r < Wi.length && i !== 0 && i < Wi[r].priority; r++);
				(Wi.splice(r, 0, t), r === 0 && hy(t));
			}
		};
		var gy = a.version;
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
			var Dl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (!Dl.isDisabled && Dl.supportsFiber)
				try {
					((ei = Dl.inject(Y_)), (hn = Dl));
				} catch {}
		}
		e.createRoot = function (t, i) {
			if (!o(t)) throw Error(l(299));
			var r = !1,
				s = "",
				c = Vw,
				d = Hw,
				g = Zw;
			return (
				i != null &&
					(i.unstable_strictMode === !0 && (r = !0),
					i.identifierPrefix !== void 0 && (s = i.identifierPrefix),
					i.onUncaughtError !== void 0 && (c = i.onUncaughtError),
					i.onCaughtError !== void 0 && (d = i.onCaughtError),
					i.onRecoverableError !== void 0 && (g = i.onRecoverableError)),
				(i = L_(t, 1, !1, null, null, r, s, null, c, d, g, P_)),
				(t[Xr] = i.current),
				Ug(t),
				new Zf(i)
			);
		};
	}),
	aE = Dn((e, n) => {
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
		(a(), (n.exports = iE()));
	}),
	rE = aE(),
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
	Ud =
		"Only the people added here and the organization owner can read this channel. Its copies in Files have separate sharing settings. File managers can share those copies, including later updates, with other people.",
	sE = "Someone with no name yet";
function zb(e) {
	return e !== null && e !== "" ? e : sE;
}
function lE(e, n) {
	const a = /(?:^|\s)@([^\s@]*)$/.exec(e.slice(0, n));
	if (a === null) return null;
	const u = a[1] ?? "";
	return { start: n - u.length - 1, query: u };
}
function oE(e, n, a) {
	const u = n.toLowerCase();
	return e
		.filter((l) => l.userId !== a)
		.map((l) => ({ ...l, label: zb(l.displayName) }))
		.filter((l) => l.label.toLowerCase().includes(u))
		.sort((l, o) => l.label.localeCompare(o.label));
}
function cE(e, n, a, u) {
	return { text: `${e.slice(0, n)}@${u} ${e.slice(a)}`, caret: n + u.length + 2 };
}
function fE(e, n) {
	const a = [];
	for (const [u, l] of e) n.includes(`@${l}`) && a.push(u);
	return a;
}
function uo(e, n) {
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
function so(e) {
	return e instanceof Error ? e.message : String(e);
}
var dE = Dn((e) => {
		var n = Symbol.for("react.transitional.element"),
			a = Symbol.for("react.fragment");
		function u(l, o, f) {
			var h = null;
			if ((f !== void 0 && (h = "" + f), o.key !== void 0 && (h = "" + o.key), "key" in o)) {
				f = {};
				for (var m in o) m !== "key" && (f[m] = o[m]);
			} else f = o;
			return ((o = f.ref), { $$typeof: n, type: l, key: h, ref: o !== void 0 ? o : null, props: f });
		}
		((e.Fragment = a), (e.jsx = u), (e.jsxs = u));
	}),
	hE = Dn((e, n) => {
		n.exports = dE();
	}),
	b = hE();
function Ei(e) {
	const [n, a] = (0, w.useState)({ key: e, cursor: null, previous: [], number: 1 });
	return (
		n.key !== e && a({ key: e, cursor: null, previous: [], number: 1 }),
		{
			cursor: n.key === e ? n.cursor : null,
			number: n.number,
			canGoBack: n.previous.length > 0,
			next: (u) =>
				a((l) => ({ key: e, cursor: u, previous: [...l.previous, l.cursor].slice(-20), number: l.number + 1 })),
			back: () =>
				a((u) =>
					u.previous.length === 0
						? u
						: {
								...u,
								cursor: u.previous[u.previous.length - 1],
								previous: u.previous.slice(0, -1),
								number: u.number - 1,
							},
				),
			first: () => a({ key: e, cursor: null, previous: [], number: 1 }),
		}
	);
}
function ia(e) {
	return e.page.number === 1 && e.result?.isDone
		? null
		: (0, b.jsxs)("div", {
				className: "page-controls",
				"aria-label": `${e.label} pages`,
				children: [
					e.page.number > 1
						? (0, b.jsx)("button", { type: "button", className: "button", onClick: e.page.first, children: "First" })
						: null,
					(0, b.jsx)("button", {
						type: "button",
						className: "button",
						disabled: !e.page.canGoBack,
						onClick: e.page.back,
						children: "Previous",
					}),
					(0, b.jsxs)("span", { children: ["Page ", e.page.number] }),
					(0, b.jsx)("button", {
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
var bd =
	'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Uy(e) {
	const n = e.querySelector("[data-dialog-initial]");
	return n?.matches(bd) ? n : (e.querySelector(bd) ?? e);
}
function Zr(e) {
	const n = (0, w.useRef)(null);
	((0, w.useEffect)(() => {
		const u = document.activeElement instanceof HTMLElement ? document.activeElement : null,
			l = n.current;
		return (
			(l === null ? null : Uy(l))?.focus(),
			() => {
				u?.focus();
			}
		);
	}, []),
		(0, w.useEffect)(() => {
			const u = n.current;
			if (!u) return;
			const l = () => {
					!u.isConnected || document.activeElement !== document.body || Uy(u).focus();
				},
				o = () => queueMicrotask(l);
			return (u.addEventListener("focusout", o), () => u.removeEventListener("focusout", o));
		}, []));
	const a = (u) => {
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
	return (0, b.jsx)("div", {
		className: "dialog-overlay",
		children: (0, b.jsx)("div", {
			ref: n,
			className: "dialog",
			role: "dialog",
			tabIndex: -1,
			"aria-modal": "true",
			"aria-labelledby": e.accessUnavailable ? void 0 : e.labelledBy,
			"aria-label": e.accessUnavailable ? "Channel access is unavailable" : void 0,
			onKeyDown: a,
			children: e.accessUnavailable
				? (0, b.jsxs)(b.Fragment, {
						children: [
							(0, b.jsx)("h2", { className: "dialog-title", children: "Channel access is unavailable" }),
							(0, b.jsx)("p", { children: "Your changes are kept. Reconnect to continue." }),
							(0, b.jsxs)("div", {
								className: "dialog-actions",
								children: [
									(0, b.jsx)("button", { type: "button", className: "button", onClick: e.onClose, children: "Close" }),
									(0, b.jsx)("button", {
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
	});
}
var Iy;
function ee(e, n, a) {
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
			const p = y[_];
			p in h || (h[p] = v[p].bind(h));
		}
	}
	const l = a?.Parent ?? Object;
	class o extends l {}
	Object.defineProperty(o, "name", { value: e });
	function f(h) {
		var m;
		const v = a?.Parent ? new o() : this;
		(u(v, h), (m = v._zod).deferred ?? (m.deferred = []));
		for (const y of v._zod.deferred) y();
		return v;
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
var qr = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	},
	kb = class extends Error {
		constructor(e) {
			(super(`Encountered unidirectional transform during encode: ${e}`), (this.name = "ZodEncodeError"));
		}
	};
(Iy = globalThis).__zod_globalConfig ?? (Iy.__zod_globalConfig = {});
var Fl = globalThis.__zod_globalConfig;
function Ua(e) {
	return (e && Object.assign(Fl, e), Fl);
}
function Db(e) {
	const n = Object.values(e).filter((a) => typeof a == "number");
	return Object.entries(e)
		.filter(([a, u]) => n.indexOf(+a) === -1)
		.map(([a, u]) => u);
}
function pd(e, n) {
	return typeof n == "bigint" ? n.toString() : n;
}
function Id(e) {
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
		a = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(n, a);
}
function mE(e, n) {
	const a = e / n,
		u = Math.round(a),
		l = Number.EPSILON * Math.max(Math.abs(a), 1);
	return Math.abs(a - u) < l ? 0 : a - u;
}
var Ly = Symbol("evaluating");
function Xe(e, n, a) {
	let u;
	Object.defineProperty(e, n, {
		get() {
			if (u !== Ly) return (u === void 0 && ((u = Ly), (u = a())), u);
		},
		set(l) {
			Object.defineProperty(e, n, { value: l });
		},
		configurable: !0,
	});
}
function Ha(e, n, a) {
	Object.defineProperty(e, n, { value: a, writable: !0, enumerable: !0, configurable: !0 });
}
function oa(...e) {
	const n = {};
	for (const a of e) {
		const u = Object.getOwnPropertyDescriptors(a);
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
function Kl(e) {
	return typeof e == "object" && e !== null && !Array.isArray(e);
}
var gE = Id(() => {
	if (Fl.jitless || (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))) return !1;
	try {
		return !1;
	} catch {
		return !1;
	}
});
function Xu(e) {
	if (Kl(e) === !1) return !1;
	const n = e.constructor;
	if (n === void 0 || typeof n != "function") return !0;
	const a = n.prototype;
	return !(Kl(a) === !1 || Object.prototype.hasOwnProperty.call(a, "isPrototypeOf") === !1);
}
function qb(e) {
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
var yE = new Set(["string", "number", "symbol"]);
function lo(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function ca(e, n, a) {
	const u = new e._zod.constr(n ?? e._zod.def);
	return ((!n || a?.parent) && (u._zod.parent = e), u);
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
	const a = e._zod.def,
		u = a.checks;
	if (u && u.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	return ca(
		e,
		oa(e._zod.def, {
			get shape() {
				const l = {};
				for (const o in n) {
					if (!(o in a.shape)) throw new Error(`Unrecognized key: "${o}"`);
					n[o] && (l[o] = a.shape[o]);
				}
				return (Ha(this, "shape", l), l);
			},
			checks: [],
		}),
	);
}
function wE(e, n) {
	const a = e._zod.def,
		u = a.checks;
	if (u && u.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	return ca(
		e,
		oa(e._zod.def, {
			get shape() {
				const l = { ...e._zod.def.shape };
				for (const o in n) {
					if (!(o in a.shape)) throw new Error(`Unrecognized key: "${o}"`);
					n[o] && delete l[o];
				}
				return (Ha(this, "shape", l), l);
			},
			checks: [],
		}),
	);
}
function _E(e, n) {
	if (!Xu(n)) throw new Error("Invalid input to extend: expected a plain object");
	const a = e._zod.def.checks;
	if (a && a.length > 0) {
		const u = e._zod.def.shape;
		for (const l in n)
			if (Object.getOwnPropertyDescriptor(u, l) !== void 0)
				throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return ca(
		e,
		oa(e._zod.def, {
			get shape() {
				const u = { ...e._zod.def.shape, ...n };
				return (Ha(this, "shape", u), u);
			},
		}),
	);
}
function xE(e, n) {
	if (!Xu(n)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return ca(
		e,
		oa(e._zod.def, {
			get shape() {
				const a = { ...e._zod.def.shape, ...n };
				return (Ha(this, "shape", a), a);
			},
		}),
	);
}
function EE(e, n) {
	if (e._zod.def.checks?.length)
		throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return ca(
		e,
		oa(e._zod.def, {
			get shape() {
				const a = { ...e._zod.def.shape, ...n._zod.def.shape };
				return (Ha(this, "shape", a), a);
			},
			get catchall() {
				return n._zod.def.catchall;
			},
			checks: n._zod.def.checks ?? [],
		}),
	);
}
function CE(e, n, a) {
	const u = n._zod.def.checks;
	if (u && u.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
	return ca(
		n,
		oa(n._zod.def, {
			get shape() {
				const l = n._zod.def.shape,
					o = { ...l };
				if (a)
					for (const f in a) {
						if (!(f in l)) throw new Error(`Unrecognized key: "${f}"`);
						a[f] && (o[f] = e ? new e({ type: "optional", innerType: l[f] }) : l[f]);
					}
				else for (const f in l) o[f] = e ? new e({ type: "optional", innerType: l[f] }) : l[f];
				return (Ha(this, "shape", o), o);
			},
			checks: [],
		}),
	);
}
function TE(e, n, a) {
	return ca(
		n,
		oa(n._zod.def, {
			get shape() {
				const u = n._zod.def.shape,
					l = { ...u };
				if (a)
					for (const o in a) {
						if (!(o in l)) throw new Error(`Unrecognized key: "${o}"`);
						a[o] && (l[o] = new e({ type: "nonoptional", innerType: u[o] }));
					}
				else for (const o in u) l[o] = new e({ type: "nonoptional", innerType: u[o] });
				return (Ha(this, "shape", l), l);
			},
		}),
	);
}
function Dr(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let a = n; a < e.issues.length; a++) if (e.issues[a]?.continue !== !0) return !0;
	return !1;
}
function AE(e, n = 0) {
	if (e.aborted === !0) return !0;
	for (let a = n; a < e.issues.length; a++) if (e.issues[a]?.continue === !1) return !0;
	return !1;
}
function Ub(e, n) {
	return n.map((a) => {
		var u;
		return ((u = a).path ?? (u.path = []), a.path.unshift(e), a);
	});
}
function Ul(e) {
	return typeof e == "string" ? e : e?.message;
}
function Ia(e, n, a) {
	const u = e.message
			? e.message
			: (Ul(e.inst?._zod.def?.error?.(e)) ??
				Ul(n?.error?.(e)) ??
				Ul(a.customError?.(e)) ??
				Ul(a.localeError?.(e)) ??
				"Invalid input"),
		{ inst: l, continue: o, input: f, ...h } = e;
	return (h.path ?? (h.path = []), (h.message = u), n?.reportInput && (h.input = f), h);
}
function Bd(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Ju(...e) {
	const [n, a, u] = e;
	return typeof n == "string" ? { message: n, code: "custom", input: a, inst: u } : { ...n };
}
var Ib = (e, n) => {
		((e.name = "$ZodError"),
			Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
			Object.defineProperty(e, "issues", { value: n, enumerable: !1 }),
			(e.message = JSON.stringify(n, pd, 2)),
			Object.defineProperty(e, "toString", { value: () => e.message, enumerable: !1 }));
	},
	Lb = ee("$ZodError", Ib),
	$b = ee("$ZodError", Ib, { Parent: Error });
function RE(e, n = (a) => a.message) {
	const a = {},
		u = [];
	for (const l of e.issues)
		l.path.length > 0 ? ((a[l.path[0]] = a[l.path[0]] || []), a[l.path[0]].push(n(l))) : u.push(n(l));
	return { formErrors: u, fieldErrors: a };
}
function OE(e, n = (a) => a.message) {
	const a = { _errors: [] },
		u = (l, o = []) => {
			for (const f of l.issues)
				if (f.code === "invalid_union" && f.errors.length) f.errors.map((h) => u({ issues: h }, [...o, ...f.path]));
				else if (f.code === "invalid_key") u({ issues: f.issues }, [...o, ...f.path]);
				else if (f.code === "invalid_element") u({ issues: f.issues }, [...o, ...f.path]);
				else {
					const h = [...o, ...f.path];
					if (h.length === 0) a._errors.push(n(f));
					else {
						let m = a,
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
	return (u(e), a);
}
var Vd = (e) => (n, a, u, l) => {
		const o = u ? { ...u, async: !1 } : { async: !1 },
			f = n._zod.run({ value: a, issues: [] }, o);
		if (f instanceof Promise) throw new qr();
		if (f.issues.length) {
			const h = new (l?.Err ?? e)(f.issues.map((m) => Ia(m, o, Ua())));
			throw (jb(h, l?.callee), h);
		}
		return f.value;
	},
	Hd = (e) => async (n, a, u, l) => {
		const o = u ? { ...u, async: !0 } : { async: !0 };
		let f = n._zod.run({ value: a, issues: [] }, o);
		if ((f instanceof Promise && (f = await f), f.issues.length)) {
			const h = new (l?.Err ?? e)(f.issues.map((m) => Ia(m, o, Ua())));
			throw (jb(h, l?.callee), h);
		}
		return f.value;
	},
	oo = (e) => (n, a, u) => {
		const l = u ? { ...u, async: !1 } : { async: !1 },
			o = n._zod.run({ value: a, issues: [] }, l);
		if (o instanceof Promise) throw new qr();
		return o.issues.length
			? { success: !1, error: new (e ?? Lb)(o.issues.map((f) => Ia(f, l, Ua()))) }
			: { success: !0, data: o.value };
	},
	NE = oo($b),
	co = (e) => async (n, a, u) => {
		const l = u ? { ...u, async: !0 } : { async: !0 };
		let o = n._zod.run({ value: a, issues: [] }, l);
		return (
			o instanceof Promise && (o = await o),
			o.issues.length
				? { success: !1, error: new e(o.issues.map((f) => Ia(f, l, Ua()))) }
				: { success: !0, data: o.value }
		);
	},
	ME = co($b),
	zE = (e) => (n, a, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Vd(e)(n, a, l);
	},
	kE = (e) => (n, a, u) => Vd(e)(n, a, u),
	DE = (e) => async (n, a, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return Hd(e)(n, a, l);
	},
	jE = (e) => async (n, a, u) => Hd(e)(n, a, u),
	qE = (e) => (n, a, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return oo(e)(n, a, l);
	},
	UE = (e) => (n, a, u) => oo(e)(n, a, u),
	IE = (e) => async (n, a, u) => {
		const l = u ? { ...u, direction: "backward" } : { direction: "backward" };
		return co(e)(n, a, l);
	},
	LE = (e) => async (n, a, u) => co(e)(n, a, u),
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
	aC = new RegExp(`^${Vb}$`);
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
function rC(e) {
	return new RegExp(`^${Hb(e)}$`);
}
function uC(e) {
	const n = Hb({ precision: e.precision }),
		a = ["Z"];
	(e.local && a.push(""), e.offset && a.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)"));
	const u = `${n}(?:${a.join("|")})`;
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
	fn = ee("$ZodCheck", (e, n) => {
		var a;
		(e._zod ?? (e._zod = {}), (e._zod.def = n), (a = e._zod).onattach ?? (a.onattach = []));
	}),
	Zb = { number: "number", bigint: "bigint", object: "date" },
	Qb = ee("$ZodCheckLessThan", (e, n) => {
		fn.init(e, n);
		const a = Zb[typeof n.value];
		(e._zod.onattach.push((u) => {
			const l = u._zod.bag,
				o = (n.inclusive ? l.maximum : l.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
			n.value < o && (n.inclusive ? (l.maximum = n.value) : (l.exclusiveMaximum = n.value));
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
	Pb = ee("$ZodCheckGreaterThan", (e, n) => {
		fn.init(e, n);
		const a = Zb[typeof n.value];
		(e._zod.onattach.push((u) => {
			const l = u._zod.bag,
				o = (n.inclusive ? l.minimum : l.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
			n.value > o && (n.inclusive ? (l.minimum = n.value) : (l.exclusiveMinimum = n.value));
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
	dC = ee("$ZodCheckMultipleOf", (e, n) => {
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
	hC = ee("$ZodCheckNumberFormat", (e, n) => {
		(fn.init(e, n), (n.format = n.format || "float64"));
		const a = n.format?.includes("int"),
			u = a ? "int" : "number",
			[l, o] = pE[n.format];
		(e._zod.onattach.push((f) => {
			const h = f._zod.bag;
			((h.format = n.format), (h.minimum = l), (h.maximum = o), a && (h.pattern = lC));
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
	mC = ee("$ZodCheckMaxLength", (e, n) => {
		var a;
		(fn.init(e, n),
			(a = e._zod.def).when ??
				(a.when = (u) => {
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
	vC = ee("$ZodCheckMinLength", (e, n) => {
		var a;
		(fn.init(e, n),
			(a = e._zod.def).when ??
				(a.when = (u) => {
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
	gC = ee("$ZodCheckLengthEquals", (e, n) => {
		var a;
		(fn.init(e, n),
			(a = e._zod.def).when ??
				(a.when = (u) => {
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
	fo = ee("$ZodCheckStringFormat", (e, n) => {
		var a, u;
		(fn.init(e, n),
			e._zod.onattach.push((l) => {
				const o = l._zod.bag;
				((o.format = n.format), n.pattern && (o.patterns ?? (o.patterns = new Set()), o.patterns.add(n.pattern)));
			}),
			n.pattern
				? ((a = e._zod).check ??
					(a.check = (l) => {
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
	yC = ee("$ZodCheckRegex", (e, n) => {
		(fo.init(e, n),
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
	bC = ee("$ZodCheckLowerCase", (e, n) => {
		(n.pattern ?? (n.pattern = cC), fo.init(e, n));
	}),
	pC = ee("$ZodCheckUpperCase", (e, n) => {
		(n.pattern ?? (n.pattern = fC), fo.init(e, n));
	}),
	SC = ee("$ZodCheckIncludes", (e, n) => {
		fn.init(e, n);
		const a = lo(n.includes),
			u = new RegExp(typeof n.position == "number" ? `^.{${n.position}}${a}` : a);
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
	wC = ee("$ZodCheckStartsWith", (e, n) => {
		fn.init(e, n);
		const a = new RegExp(`^${lo(n.prefix)}.*`);
		(n.pattern ?? (n.pattern = a),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag;
				(l.patterns ?? (l.patterns = new Set()), l.patterns.add(a));
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
	_C = ee("$ZodCheckEndsWith", (e, n) => {
		fn.init(e, n);
		const a = new RegExp(`.*${lo(n.suffix)}$`);
		(n.pattern ?? (n.pattern = a),
			e._zod.onattach.push((u) => {
				const l = u._zod.bag;
				(l.patterns ?? (l.patterns = new Set()), l.patterns.add(a));
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
	xC = ee("$ZodCheckOverwrite", (e, n) => {
		(fn.init(e, n),
			(e._zod.check = (a) => {
				a.value = n.tx(a.value);
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
				a = Math.min(...n.map((l) => l.length - l.trimStart().length)),
				u = n.map((l) => l.slice(a)).map((l) => " ".repeat(this.indent * 2) + l);
			for (const l of u) this.content.push(l);
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
	CC = { major: 4, minor: 4, patch: 3 },
	At = ee("$ZodType", (e, n) => {
		var a;
		(e ?? (e = {}), (e._zod.def = n), (e._zod.bag = e._zod.bag || {}), (e._zod.version = CC));
		const u = [...(e._zod.def.checks ?? [])];
		e._zod.traits.has("$ZodCheck") && u.unshift(e);
		for (const l of u) for (const o of l._zod.onattach) o(e);
		if (u.length === 0)
			((a = e._zod).deferred ?? (a.deferred = []),
				e._zod.deferred?.push(() => {
					e._zod.run = e._zod.parse;
				}));
		else {
			const l = (f, h, m) => {
					let v = Dr(f),
						y;
					for (const _ of h) {
						if (_._zod.def.when) {
							if (AE(f) || !_._zod.def.when(f)) continue;
						} else if (v) continue;
						const p = f.issues.length,
							S = _._zod.check(f);
						if (S instanceof Promise && m?.async === !1) throw new qr();
						if (y || S instanceof Promise)
							y = (y ?? Promise.resolve()).then(async () => {
								(await S, f.issues.length !== p && (v || (v = Dr(f, p))));
							});
						else {
							if (f.issues.length === p) continue;
							v || (v = Dr(f, p));
						}
					}
					return y ? y.then(() => f) : f;
				},
				o = (f, h, m) => {
					if (Dr(f)) return ((f.aborted = !0), f);
					const v = l(h, u, m);
					if (v instanceof Promise) {
						if (m.async === !1) throw new qr();
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
					if (h.async === !1) throw new qr();
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
	Zd = ee("$ZodString", (e, n) => {
		(At.init(e, n),
			(e._zod.pattern = [...(e?._zod.bag?.patterns ?? [])].pop() ?? sC(e._zod.bag)),
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
	ut = ee("$ZodStringFormat", (e, n) => {
		(fo.init(e, n), Zd.init(e, n));
	}),
	TC = ee("$ZodGUID", (e, n) => {
		(n.pattern ?? (n.pattern = YE), ut.init(e, n));
	}),
	AC = ee("$ZodUUID", (e, n) => {
		if (n.version) {
			const a = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[n.version];
			if (a === void 0) throw new Error(`Invalid UUID version: "${n.version}"`);
			n.pattern ?? (n.pattern = By(a));
		} else n.pattern ?? (n.pattern = By());
		ut.init(e, n);
	}),
	RC = ee("$ZodEmail", (e, n) => {
		(n.pattern ?? (n.pattern = FE), ut.init(e, n));
	}),
	OC = ee("$ZodURL", (e, n) => {
		(ut.init(e, n),
			(e._zod.check = (a) => {
				try {
					const u = a.value.trim();
					if (!n.normalize && n.protocol?.source === nC.source && !/^https?:\/\//i.test(u)) {
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
					const l = new URL(u);
					(n.hostname &&
						((n.hostname.lastIndex = 0),
						n.hostname.test(l.hostname) ||
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
							n.protocol.test(l.protocol.endsWith(":") ? l.protocol.slice(0, -1) : l.protocol) ||
								a.issues.push({
									code: "invalid_format",
									format: "url",
									note: "Invalid protocol",
									pattern: n.protocol.source,
									input: a.value,
									inst: e,
									continue: !n.abort,
								})),
						n.normalize ? (a.value = l.href) : (a.value = u));
					return;
				} catch {
					a.issues.push({ code: "invalid_format", format: "url", input: a.value, inst: e, continue: !n.abort });
				}
			}));
	}),
	NC = ee("$ZodEmoji", (e, n) => {
		(n.pattern ?? (n.pattern = GE()), ut.init(e, n));
	}),
	MC = ee("$ZodNanoID", (e, n) => {
		(n.pattern ?? (n.pattern = QE), ut.init(e, n));
	}),
	zC = ee("$ZodCUID", (e, n) => {
		(n.pattern ?? (n.pattern = $E), ut.init(e, n));
	}),
	kC = ee("$ZodCUID2", (e, n) => {
		(n.pattern ?? (n.pattern = BE), ut.init(e, n));
	}),
	DC = ee("$ZodULID", (e, n) => {
		(n.pattern ?? (n.pattern = VE), ut.init(e, n));
	}),
	jC = ee("$ZodXID", (e, n) => {
		(n.pattern ?? (n.pattern = HE), ut.init(e, n));
	}),
	qC = ee("$ZodKSUID", (e, n) => {
		(n.pattern ?? (n.pattern = ZE), ut.init(e, n));
	}),
	UC = ee("$ZodISODateTime", (e, n) => {
		(n.pattern ?? (n.pattern = uC(n)), ut.init(e, n));
	}),
	IC = ee("$ZodISODate", (e, n) => {
		(n.pattern ?? (n.pattern = aC), ut.init(e, n));
	}),
	LC = ee("$ZodISOTime", (e, n) => {
		(n.pattern ?? (n.pattern = rC(n)), ut.init(e, n));
	}),
	$C = ee("$ZodISODuration", (e, n) => {
		(n.pattern ?? (n.pattern = PE), ut.init(e, n));
	}),
	BC = ee("$ZodIPv4", (e, n) => {
		(n.pattern ?? (n.pattern = XE), ut.init(e, n), (e._zod.bag.format = "ipv4"));
	}),
	VC = ee("$ZodIPv6", (e, n) => {
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
	HC = ee("$ZodCIDRv4", (e, n) => {
		(n.pattern ?? (n.pattern = WE), ut.init(e, n));
	}),
	ZC = ee("$ZodCIDRv6", (e, n) => {
		(n.pattern ?? (n.pattern = eC),
			ut.init(e, n),
			(e._zod.check = (a) => {
				const u = a.value.split("/");
				try {
					if (u.length !== 2) throw new Error();
					const [l, o] = u;
					if (!o) throw new Error();
					const f = Number(o);
					if (`${f}` !== o) throw new Error();
					if (f < 0 || f > 128) throw new Error();
					new URL(`http://[${l}]`);
				} catch {
					a.issues.push({ code: "invalid_format", format: "cidrv6", input: a.value, inst: e, continue: !n.abort });
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
var QC = ee("$ZodBase64", (e, n) => {
	(n.pattern ?? (n.pattern = tC),
		ut.init(e, n),
		(e._zod.bag.contentEncoding = "base64"),
		(e._zod.check = (a) => {
			Yb(a.value) ||
				a.issues.push({ code: "invalid_format", format: "base64", input: a.value, inst: e, continue: !n.abort });
		}));
});
function PC(e) {
	if (!Bb.test(e)) return !1;
	const n = e.replace(/[-_]/g, (a) => (a === "-" ? "+" : "/"));
	return Yb(n.padEnd(Math.ceil(n.length / 4) * 4, "="));
}
var YC = ee("$ZodBase64URL", (e, n) => {
		(n.pattern ?? (n.pattern = Bb),
			ut.init(e, n),
			(e._zod.bag.contentEncoding = "base64url"),
			(e._zod.check = (a) => {
				PC(a.value) ||
					a.issues.push({ code: "invalid_format", format: "base64url", input: a.value, inst: e, continue: !n.abort });
			}));
	}),
	FC = ee("$ZodE164", (e, n) => {
		(n.pattern ?? (n.pattern = iC), ut.init(e, n));
	});
function KC(e, n = null) {
	try {
		const a = e.split(".");
		if (a.length !== 3) return !1;
		const [u] = a;
		if (!u) return !1;
		const l = JSON.parse(atob(u));
		return !(("typ" in l && l?.typ !== "JWT") || !l.alg || (n && (!("alg" in l) || l.alg !== n)));
	} catch {
		return !1;
	}
}
var GC = ee("$ZodJWT", (e, n) => {
		(ut.init(e, n),
			(e._zod.check = (a) => {
				KC(a.value, n.alg) ||
					a.issues.push({ code: "invalid_format", format: "jwt", input: a.value, inst: e, continue: !n.abort });
			}));
	}),
	Fb = ee("$ZodNumber", (e, n) => {
		(At.init(e, n),
			(e._zod.pattern = e._zod.bag.pattern ?? oC),
			(e._zod.parse = (a, u) => {
				if (n.coerce)
					try {
						a.value = Number(a.value);
					} catch {}
				const l = a.value;
				if (typeof l == "number" && !Number.isNaN(l) && Number.isFinite(l)) return a;
				const o = typeof l == "number" ? (Number.isNaN(l) ? "NaN" : Number.isFinite(l) ? void 0 : "Infinity") : void 0;
				return (
					a.issues.push({ expected: "number", code: "invalid_type", input: l, inst: e, ...(o ? { received: o } : {}) }),
					a
				);
			}));
	}),
	XC = ee("$ZodNumberFormat", (e, n) => {
		(hC.init(e, n), Fb.init(e, n));
	}),
	JC = ee("$ZodUnknown", (e, n) => {
		(At.init(e, n), (e._zod.parse = (a) => a));
	}),
	WC = ee("$ZodNever", (e, n) => {
		(At.init(e, n),
			(e._zod.parse = (a, u) => (
				a.issues.push({ expected: "never", code: "invalid_type", input: a.value, inst: e }),
				a
			)));
	});
function Vy(e, n, a) {
	(e.issues.length && n.issues.push(...Ub(a, e.issues)), (n.value[a] = e.value));
}
var eT = ee("$ZodArray", (e, n) => {
	(At.init(e, n),
		(e._zod.parse = (a, u) => {
			const l = a.value;
			if (!Array.isArray(l)) return (a.issues.push({ expected: "array", code: "invalid_type", input: l, inst: e }), a);
			a.value = Array(l.length);
			const o = [];
			for (let f = 0; f < l.length; f++) {
				const h = l[f],
					m = n.element._zod.run({ value: h, issues: [] }, u);
				m instanceof Promise ? o.push(m.then((v) => Vy(v, a, f))) : Vy(m, a, f);
			}
			return o.length ? Promise.all(o).then(() => a) : a;
		}));
});
function Gl(e, n, a, u, l, o) {
	const f = a in u;
	if (e.issues.length) {
		if (l && o && !f) return;
		n.issues.push(...Ub(a, e.issues));
	}
	if (!f && !l) {
		e.issues.length || n.issues.push({ code: "invalid_type", expected: "nonoptional", input: void 0, path: [a] });
		return;
	}
	e.value === void 0 ? f && (n.value[a] = void 0) : (n.value[a] = e.value);
}
function Kb(e) {
	const n = Object.keys(e.shape);
	for (const u of n)
		if (!e.shape?.[u]?._zod?.traits?.has("$ZodType"))
			throw new Error(`Invalid element at key "${u}": expected a Zod schema`);
	const a = bE(e.shape);
	return { ...e, keys: n, keySet: new Set(n), numKeys: n.length, optionalKeys: new Set(a) };
}
function Gb(e, n, a, u, l, o) {
	const f = [],
		h = l.keySet,
		m = l.catchall._zod,
		v = m.def.type,
		y = m.optin === "optional",
		_ = m.optout === "optional";
	for (const p in n) {
		if (p === "__proto__" || h.has(p)) continue;
		if (v === "never") {
			f.push(p);
			continue;
		}
		const S = m.run({ value: n[p], issues: [] }, u);
		S instanceof Promise ? e.push(S.then((E) => Gl(E, a, p, n, y, _))) : Gl(S, a, p, n, y, _);
	}
	return (
		f.length && a.issues.push({ code: "unrecognized_keys", keys: f, input: n, inst: o }),
		e.length ? Promise.all(e).then(() => a) : a
	);
}
var tT = ee("$ZodObject", (e, n) => {
		if ((At.init(e, n), !Object.getOwnPropertyDescriptor(n, "shape")?.get)) {
			const f = n.shape;
			Object.defineProperty(n, "shape", {
				get: () => {
					const h = { ...f };
					return (Object.defineProperty(n, "shape", { value: h }), h);
				},
			});
		}
		const a = Id(() => Kb(n));
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
		const u = Kl,
			l = n.catchall;
		let o;
		e._zod.parse = (f, h) => {
			o ?? (o = a.value);
			const m = f.value;
			if (!u(m)) return (f.issues.push({ expected: "object", code: "invalid_type", input: m, inst: e }), f);
			f.value = {};
			const v = [],
				y = o.shape;
			for (const _ of o.keys) {
				const p = y[_],
					S = p._zod.optin === "optional",
					E = p._zod.optout === "optional",
					C = p._zod.run({ value: m[_], issues: [] }, h);
				C instanceof Promise ? v.push(C.then((T) => Gl(T, f, _, m, S, E))) : Gl(C, f, _, m, S, E);
			}
			return l ? Gb(v, m, f, h, a.value, e) : v.length ? Promise.all(v).then(() => f) : f;
		};
	}),
	nT = ee("$ZodObjectJIT", (e, n) => {
		tT.init(e, n);
		const a = e._zod.parse,
			u = Id(() => Kb(n)),
			l = (p) => {
				const S = new EC(["shape", "payload", "ctx"]),
					E = u.value,
					C = (M) => {
						const R = $y(M);
						return `shape[${R}]._zod.run({ value: input[${R}], issues: [] }, ctx)`;
					};
				S.write("const input = payload.value;");
				const T = Object.create(null);
				let D = 0;
				for (const M of E.keys) T[M] = `key_${D++}`;
				S.write("const newResult = {};");
				for (const M of E.keys) {
					const R = T[M],
						N = $y(M),
						Z = p[M],
						U = Z?._zod?.optin === "optional",
						j = Z?._zod?.optout === "optional";
					(S.write(`const ${R} = ${C(M)};`),
						U && j
							? S.write(`
        if (${R}.issues.length) {
          if (${N} in input) {
            payload.issues = payload.issues.concat(${R}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${N}, ...iss.path] : [${N}]
            })));
          }
        }
        
        if (${R}.value === undefined) {
          if (${N} in input) {
            newResult[${N}] = undefined;
          }
        } else {
          newResult[${N}] = ${R}.value;
        }
        
      `)
							: U
								? S.write(`
        if (${R}.issues.length) {
          payload.issues = payload.issues.concat(${R}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${N}, ...iss.path] : [${N}]
          })));
        }
        
        if (${R}.value === undefined) {
          if (${N} in input) {
            newResult[${N}] = undefined;
          }
        } else {
          newResult[${N}] = ${R}.value;
        }
        
      `)
								: S.write(`
        const ${R}_present = ${N} in input;
        if (${R}.issues.length) {
          payload.issues = payload.issues.concat(${R}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${N}, ...iss.path] : [${N}]
          })));
        }
        if (!${R}_present && !${R}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${N}]
          });
        }

        if (${R}_present) {
          if (${R}.value === undefined) {
            newResult[${N}] = undefined;
          } else {
            newResult[${N}] = ${R}.value;
          }
        }

      `));
				}
				(S.write("payload.value = newResult;"), S.write("return payload;"));
				const A = S.compile();
				return (M, R) => A(p, M, R);
			};
		let o;
		const f = Kl,
			h = !Fl.jitless,
			v = h && gE.value,
			y = n.catchall;
		let _;
		e._zod.parse = (p, S) => {
			_ ?? (_ = u.value);
			const E = p.value;
			return f(E)
				? h && v && S?.async === !1 && S.jitless !== !0
					? (o || (o = l(n.shape)), (p = o(p, S)), y ? Gb([], E, p, S, _, e) : p)
					: a(p, S)
				: (p.issues.push({ expected: "object", code: "invalid_type", input: E, inst: e }), p);
		};
	});
function Hy(e, n, a, u) {
	for (const o of e) if (o.issues.length === 0) return ((n.value = o.value), n);
	const l = e.filter((o) => !Dr(o));
	return l.length === 1
		? ((n.value = l[0].value), l[0])
		: (n.issues.push({
				code: "invalid_union",
				input: n.value,
				inst: a,
				errors: e.map((o) => o.issues.map((f) => Ia(f, u, Ua()))),
			}),
			n);
}
var iT = ee("$ZodUnion", (e, n) => {
		(At.init(e, n),
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
		const a = n.options.length === 1 ? n.options[0]._zod.run : null;
		e._zod.parse = (u, l) => {
			if (a) return a(u, l);
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
	aT = ee("$ZodIntersection", (e, n) => {
		(At.init(e, n),
			(e._zod.parse = (a, u) => {
				const l = a.value,
					o = n.left._zod.run({ value: l, issues: [] }, u),
					f = n.right._zod.run({ value: l, issues: [] }, u);
				return o instanceof Promise || f instanceof Promise
					? Promise.all([o, f]).then(([h, m]) => Zy(a, h, m))
					: Zy(a, o, f);
			}));
	});
function Sd(e, n) {
	if (e === n) return { valid: !0, data: e };
	if (e instanceof Date && n instanceof Date && +e == +n) return { valid: !0, data: e };
	if (Xu(e) && Xu(n)) {
		const a = Object.keys(n),
			u = Object.keys(e).filter((o) => a.indexOf(o) !== -1),
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
		const a = [];
		for (let u = 0; u < e.length; u++) {
			const l = e[u],
				o = n[u],
				f = Sd(l, o);
			if (!f.valid) return { valid: !1, mergeErrorPath: [u, ...f.mergeErrorPath] };
			a.push(f.data);
		}
		return { valid: !0, data: a };
	}
	return { valid: !1, mergeErrorPath: [] };
}
function Zy(e, n, a) {
	const u = new Map();
	let l;
	for (const h of n.issues)
		if (h.code === "unrecognized_keys") {
			l ?? (l = h);
			for (const m of h.keys) (u.has(m) || u.set(m, {}), (u.get(m).l = !0));
		} else e.issues.push(h);
	for (const h of a.issues)
		if (h.code === "unrecognized_keys") for (const m of h.keys) (u.has(m) || u.set(m, {}), (u.get(m).r = !0));
		else e.issues.push(h);
	const o = [...u].filter(([, h]) => h.l && h.r).map(([h]) => h);
	if ((o.length && l && e.issues.push({ ...l, keys: o }), Dr(e))) return e;
	const f = Sd(n.value, a.value);
	if (!f.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(f.mergeErrorPath)}`);
	return ((e.value = f.data), e);
}
var rT = ee("$ZodEnum", (e, n) => {
		At.init(e, n);
		const a = Db(n.entries),
			u = new Set(a);
		((e._zod.values = u),
			(e._zod.pattern = new RegExp(
				`^(${a
					.filter((l) => yE.has(typeof l))
					.map((l) => (typeof l == "string" ? lo(l) : l.toString()))
					.join("|")})$`,
			)),
			(e._zod.parse = (l, o) => {
				const f = l.value;
				return (u.has(f) || l.issues.push({ code: "invalid_value", values: a, input: f, inst: e }), l);
			}));
	}),
	uT = ee("$ZodTransform", (e, n) => {
		(At.init(e, n),
			(e._zod.optin = "optional"),
			(e._zod.parse = (a, u) => {
				if (u.direction === "backward") throw new kb(e.constructor.name);
				const l = n.transform(a.value, a);
				if (u.async)
					return (l instanceof Promise ? l : Promise.resolve(l)).then((o) => ((a.value = o), (a.fallback = !0), a));
				if (l instanceof Promise) throw new qr();
				return ((a.value = l), (a.fallback = !0), a);
			}));
	});
function Qy(e, n) {
	return n === void 0 && (e.issues.length || e.fallback) ? { issues: [], value: void 0 } : e;
}
var Xb = ee("$ZodOptional", (e, n) => {
		(At.init(e, n),
			(e._zod.optin = "optional"),
			(e._zod.optout = "optional"),
			Xe(e._zod, "values", () => (n.innerType._zod.values ? new Set([...n.innerType._zod.values, void 0]) : void 0)),
			Xe(e._zod, "pattern", () => {
				const a = n.innerType._zod.pattern;
				return a ? new RegExp(`^(${$d(a.source)})?$`) : void 0;
			}),
			(e._zod.parse = (a, u) => {
				if (n.innerType._zod.optin === "optional") {
					const l = a.value,
						o = n.innerType._zod.run(a, u);
					return o instanceof Promise ? o.then((f) => Qy(f, l)) : Qy(o, l);
				}
				return a.value === void 0 ? a : n.innerType._zod.run(a, u);
			}));
	}),
	sT = ee("$ZodExactOptional", (e, n) => {
		(Xb.init(e, n),
			Xe(e._zod, "values", () => n.innerType._zod.values),
			Xe(e._zod, "pattern", () => n.innerType._zod.pattern),
			(e._zod.parse = (a, u) => n.innerType._zod.run(a, u)));
	}),
	lT = ee("$ZodNullable", (e, n) => {
		(At.init(e, n),
			Xe(e._zod, "optin", () => n.innerType._zod.optin),
			Xe(e._zod, "optout", () => n.innerType._zod.optout),
			Xe(e._zod, "pattern", () => {
				const a = n.innerType._zod.pattern;
				return a ? new RegExp(`^(${$d(a.source)}|null)$`) : void 0;
			}),
			Xe(e._zod, "values", () => (n.innerType._zod.values ? new Set([...n.innerType._zod.values, null]) : void 0)),
			(e._zod.parse = (a, u) => (a.value === null ? a : n.innerType._zod.run(a, u))));
	}),
	oT = ee("$ZodDefault", (e, n) => {
		(At.init(e, n),
			(e._zod.optin = "optional"),
			Xe(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (a, u) => {
				if (u.direction === "backward") return n.innerType._zod.run(a, u);
				if (a.value === void 0) return ((a.value = n.defaultValue), a);
				const l = n.innerType._zod.run(a, u);
				return l instanceof Promise ? l.then((o) => Py(o, n)) : Py(l, n);
			}));
	});
function Py(e, n) {
	return (e.value === void 0 && (e.value = n.defaultValue), e);
}
var cT = ee("$ZodPrefault", (e, n) => {
		(At.init(e, n),
			(e._zod.optin = "optional"),
			Xe(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (a, u) => (
				u.direction === "backward" || (a.value === void 0 && (a.value = n.defaultValue)),
				n.innerType._zod.run(a, u)
			)));
	}),
	fT = ee("$ZodNonOptional", (e, n) => {
		(At.init(e, n),
			Xe(e._zod, "values", () => {
				const a = n.innerType._zod.values;
				return a ? new Set([...a].filter((u) => u !== void 0)) : void 0;
			}),
			(e._zod.parse = (a, u) => {
				const l = n.innerType._zod.run(a, u);
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
var dT = ee("$ZodCatch", (e, n) => {
		(At.init(e, n),
			(e._zod.optin = "optional"),
			Xe(e._zod, "optout", () => n.innerType._zod.optout),
			Xe(e._zod, "values", () => n.innerType._zod.values),
			(e._zod.parse = (a, u) => {
				if (u.direction === "backward") return n.innerType._zod.run(a, u);
				const l = n.innerType._zod.run(a, u);
				return l instanceof Promise
					? l.then(
							(o) => (
								(a.value = o.value),
								o.issues.length &&
									((a.value = n.catchValue({
										...a,
										error: { issues: o.issues.map((f) => Ia(f, u, Ua())) },
										input: a.value,
									})),
									(a.issues = []),
									(a.fallback = !0)),
								a
							),
						)
					: ((a.value = l.value),
						l.issues.length &&
							((a.value = n.catchValue({
								...a,
								error: { issues: l.issues.map((o) => Ia(o, u, Ua())) },
								input: a.value,
							})),
							(a.issues = []),
							(a.fallback = !0)),
						a);
			}));
	}),
	hT = ee("$ZodPipe", (e, n) => {
		(At.init(e, n),
			Xe(e._zod, "values", () => n.in._zod.values),
			Xe(e._zod, "optin", () => n.in._zod.optin),
			Xe(e._zod, "optout", () => n.out._zod.optout),
			Xe(e._zod, "propValues", () => n.in._zod.propValues),
			(e._zod.parse = (a, u) => {
				if (u.direction === "backward") {
					const o = n.out._zod.run(a, u);
					return o instanceof Promise ? o.then((f) => Il(f, n.in, u)) : Il(o, n.in, u);
				}
				const l = n.in._zod.run(a, u);
				return l instanceof Promise ? l.then((o) => Il(o, n.out, u)) : Il(l, n.out, u);
			}));
	});
function Il(e, n, a) {
	return e.issues.length
		? ((e.aborted = !0), e)
		: n._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, a);
}
var mT = ee("$ZodReadonly", (e, n) => {
	(At.init(e, n),
		Xe(e._zod, "propValues", () => n.innerType._zod.propValues),
		Xe(e._zod, "values", () => n.innerType._zod.values),
		Xe(e._zod, "optin", () => n.innerType?._zod?.optin),
		Xe(e._zod, "optout", () => n.innerType?._zod?.optout),
		(e._zod.parse = (a, u) => {
			if (u.direction === "backward") return n.innerType._zod.run(a, u);
			const l = n.innerType._zod.run(a, u);
			return l instanceof Promise ? l.then(Fy) : Fy(l);
		}));
});
function Fy(e) {
	return ((e.value = Object.freeze(e.value)), e);
}
var vT = ee("$ZodCustom", (e, n) => {
	(fn.init(e, n),
		At.init(e, n),
		(e._zod.parse = (a, u) => a),
		(e._zod.check = (a) => {
			const u = a.value,
				l = n.fn(u);
			if (l instanceof Promise) return l.then((o) => Ky(o, a, u, e));
			Ky(l, a, u, e);
		}));
});
function Ky(e, n, a, u) {
	if (!e) {
		const l = { code: "custom", input: a, inst: u, path: [...(u._zod.def.path ?? [])], continue: !u._zod.def.abort };
		(u._zod.def.params && (l.params = u._zod.def.params), n.issues.push(Ju(l)));
	}
}
var Gy,
	gT = class {
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
function yT() {
	return new gT();
}
(Gy = globalThis).__zod_globalRegistry ?? (Gy.__zod_globalRegistry = yT());
var Hu = globalThis.__zod_globalRegistry;
function bT(e, n) {
	return new e({ type: "string", ...ye(n) });
}
function pT(e, n) {
	return new e({ type: "string", format: "email", check: "string_format", abort: !1, ...ye(n) });
}
function Xy(e, n) {
	return new e({ type: "string", format: "guid", check: "string_format", abort: !1, ...ye(n) });
}
function ST(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, ...ye(n) });
}
function wT(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v4", ...ye(n) });
}
function _T(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v6", ...ye(n) });
}
function xT(e, n) {
	return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, version: "v7", ...ye(n) });
}
function ET(e, n) {
	return new e({ type: "string", format: "url", check: "string_format", abort: !1, ...ye(n) });
}
function CT(e, n) {
	return new e({ type: "string", format: "emoji", check: "string_format", abort: !1, ...ye(n) });
}
function TT(e, n) {
	return new e({ type: "string", format: "nanoid", check: "string_format", abort: !1, ...ye(n) });
}
function AT(e, n) {
	return new e({ type: "string", format: "cuid", check: "string_format", abort: !1, ...ye(n) });
}
function RT(e, n) {
	return new e({ type: "string", format: "cuid2", check: "string_format", abort: !1, ...ye(n) });
}
function OT(e, n) {
	return new e({ type: "string", format: "ulid", check: "string_format", abort: !1, ...ye(n) });
}
function NT(e, n) {
	return new e({ type: "string", format: "xid", check: "string_format", abort: !1, ...ye(n) });
}
function MT(e, n) {
	return new e({ type: "string", format: "ksuid", check: "string_format", abort: !1, ...ye(n) });
}
function zT(e, n) {
	return new e({ type: "string", format: "ipv4", check: "string_format", abort: !1, ...ye(n) });
}
function kT(e, n) {
	return new e({ type: "string", format: "ipv6", check: "string_format", abort: !1, ...ye(n) });
}
function DT(e, n) {
	return new e({ type: "string", format: "cidrv4", check: "string_format", abort: !1, ...ye(n) });
}
function jT(e, n) {
	return new e({ type: "string", format: "cidrv6", check: "string_format", abort: !1, ...ye(n) });
}
function qT(e, n) {
	return new e({ type: "string", format: "base64", check: "string_format", abort: !1, ...ye(n) });
}
function UT(e, n) {
	return new e({ type: "string", format: "base64url", check: "string_format", abort: !1, ...ye(n) });
}
function IT(e, n) {
	return new e({ type: "string", format: "e164", check: "string_format", abort: !1, ...ye(n) });
}
function LT(e, n) {
	return new e({ type: "string", format: "jwt", check: "string_format", abort: !1, ...ye(n) });
}
function $T(e, n) {
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
function BT(e, n) {
	return new e({ type: "string", format: "date", check: "string_format", ...ye(n) });
}
function VT(e, n) {
	return new e({ type: "string", format: "time", check: "string_format", precision: null, ...ye(n) });
}
function HT(e, n) {
	return new e({ type: "string", format: "duration", check: "string_format", ...ye(n) });
}
function ZT(e, n) {
	return new e({ type: "number", checks: [], ...ye(n) });
}
function QT(e, n) {
	return new e({ type: "number", check: "number_format", abort: !1, format: "safeint", ...ye(n) });
}
function PT(e) {
	return new e({ type: "unknown" });
}
function YT(e, n) {
	return new e({ type: "never", ...ye(n) });
}
function Jy(e, n) {
	return new Qb({ check: "less_than", ...ye(n), value: e, inclusive: !1 });
}
function ed(e, n) {
	return new Qb({ check: "less_than", ...ye(n), value: e, inclusive: !0 });
}
function Wy(e, n) {
	return new Pb({ check: "greater_than", ...ye(n), value: e, inclusive: !1 });
}
function td(e, n) {
	return new Pb({ check: "greater_than", ...ye(n), value: e, inclusive: !0 });
}
function e0(e, n) {
	return new dC({ check: "multiple_of", ...ye(n), value: e });
}
function Jb(e, n) {
	return new mC({ check: "max_length", ...ye(n), maximum: e });
}
function Xl(e, n) {
	return new vC({ check: "min_length", ...ye(n), minimum: e });
}
function Wb(e, n) {
	return new gC({ check: "length_equals", ...ye(n), length: e });
}
function FT(e, n) {
	return new yC({ check: "string_format", format: "regex", ...ye(n), pattern: e });
}
function KT(e) {
	return new bC({ check: "string_format", format: "lowercase", ...ye(e) });
}
function GT(e) {
	return new pC({ check: "string_format", format: "uppercase", ...ye(e) });
}
function XT(e, n) {
	return new SC({ check: "string_format", format: "includes", ...ye(n), includes: e });
}
function JT(e, n) {
	return new wC({ check: "string_format", format: "starts_with", ...ye(n), prefix: e });
}
function WT(e, n) {
	return new _C({ check: "string_format", format: "ends_with", ...ye(n), suffix: e });
}
function Qr(e) {
	return new xC({ check: "overwrite", tx: e });
}
function eA(e) {
	return Qr((n) => n.normalize(e));
}
function tA() {
	return Qr((e) => e.trim());
}
function nA() {
	return Qr((e) => e.toLowerCase());
}
function iA() {
	return Qr((e) => e.toUpperCase());
}
function aA() {
	return Qr((e) => vE(e));
}
function rA(e, n, a) {
	return new e({ type: "array", element: n, ...ye(a) });
}
function uA(e, n, a) {
	return new e({ type: "custom", check: "custom", fn: n, ...ye(a) });
}
function sA(e, n) {
	const a = lA(
		(u) => (
			(u.addIssue = (l) => {
				if (typeof l == "string") u.issues.push(Ju(l, u.value, a._zod.def));
				else {
					const o = l;
					(o.fatal && (o.continue = !1),
						o.code ?? (o.code = "custom"),
						o.input ?? (o.input = u.value),
						o.inst ?? (o.inst = a),
						o.continue ?? (o.continue = !a._zod.def.abort),
						u.issues.push(Ju(o)));
				}
			}),
			e(u.value, u)
		),
		n,
	);
	return a;
}
function lA(e, n) {
	const a = new fn({ check: "custom", ...ye(n) });
	return ((a._zod.check = e), a);
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
function Yt(e, n, a = { path: [], schemaPath: [] }) {
	var u;
	const l = e._zod.def,
		o = n.seen.get(e);
	if (o) return (o.count++, a.schemaPath.includes(e) && (o.cycle = a.path), o.schema);
	const f = { schema: {}, count: 1, cycle: void 0, path: a.path };
	n.seen.set(e, f);
	const h = e._zod.toJSONSchema?.();
	if (h) f.schema = h;
	else {
		const v = { ...a, schemaPath: [...a.schemaPath, e], path: a.path };
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(n, f.schema, v);
		else {
			const _ = f.schema,
				p = n.processors[l.type];
			if (!p) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${l.type}`);
			p(e, n, _, v);
		}
		const y = e._zod.parent;
		y && (f.ref || (f.ref = y), Yt(y, n, v), (n.seen.get(y).isParent = !0));
	}
	const m = n.metadataRegistry.get(e);
	return (
		m && Object.assign(f.schema, m),
		n.io === "input" && Gt(e) && (delete f.schema.examples, delete f.schema.default),
		n.io === "input" && "_prefault" in f.schema && ((u = f.schema).default ?? (u.default = f.schema._prefault)),
		delete f.schema._prefault,
		n.seen.get(e).schema
	);
}
function tp(e, n) {
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
	const l = (f) => {
			const h = e.target === "draft-2020-12" ? "$defs" : "definitions";
			if (e.external) {
				const y = e.external.registry.get(f[0])?.id,
					_ = e.external.uri ?? ((S) => S);
				if (y) return { ref: _(y) };
				const p = f[1].defId ?? f[1].schema.id ?? `schema${e.counter++}`;
				return ((f[1].defId = p), { defId: p, ref: `${_("__shared")}#/${h}/${p}` });
			}
			if (f[1] === a) return { ref: "#" };
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
	const a = e.seen.get(n);
	if (!a) throw new Error("Unprocessed schema. This is a bug in Zod.");
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
		const p = h._zod.parent;
		if (p && p !== _) {
			u(p);
			const S = e.seen.get(p);
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
	Object.assign(l, a.def ?? a.schema);
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
					jsonSchema: { input: Jl(n, "input", e.processors), output: Jl(n, "output", e.processors) },
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
function Gt(e, n) {
	const a = n ?? { seen: new Set() };
	if (a.seen.has(e)) return !1;
	a.seen.add(e);
	const u = e._zod.def;
	if (u.type === "transform") return !0;
	if (u.type === "array") return Gt(u.element, a);
	if (u.type === "set") return Gt(u.valueType, a);
	if (u.type === "lazy") return Gt(u.getter(), a);
	if (
		u.type === "promise" ||
		u.type === "optional" ||
		u.type === "nonoptional" ||
		u.type === "nullable" ||
		u.type === "readonly" ||
		u.type === "default" ||
		u.type === "prefault"
	)
		return Gt(u.innerType, a);
	if (u.type === "intersection") return Gt(u.left, a) || Gt(u.right, a);
	if (u.type === "record" || u.type === "map") return Gt(u.keyType, a) || Gt(u.valueType, a);
	if (u.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : Gt(u.in, a) || Gt(u.out, a);
	if (u.type === "object") {
		for (const l in u.shape) if (Gt(u.shape[l], a)) return !0;
		return !1;
	}
	if (u.type === "union") {
		for (const l of u.options) if (Gt(l, a)) return !0;
		return !1;
	}
	if (u.type === "tuple") {
		for (const l of u.items) if (Gt(l, a)) return !0;
		return !!(u.rest && Gt(u.rest, a));
	}
	return !1;
}
var oA =
		(e, n = {}) =>
		(a) => {
			const u = ep({ ...a, processors: n });
			return (Yt(e, u), tp(u, e), np(u, e));
		},
	Jl =
		(e, n, a = {}) =>
		(u) => {
			const { libraryOptions: l, target: o } = u ?? {},
				f = ep({ ...(l ?? {}), target: o, io: n, processors: a });
			return (Yt(e, f), tp(f, e), np(f, e));
		},
	cA = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" },
	fA = (e, n, a, u) => {
		const l = a;
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
	dA = (e, n, a, u) => {
		const l = a,
			{ minimum: o, maximum: f, format: h, multipleOf: m, exclusiveMaximum: v, exclusiveMinimum: y } = e._zod.bag;
		typeof h == "string" && h.includes("int") ? (l.type = "integer") : (l.type = "number");
		const _ = typeof y == "number" && y >= (o ?? Number.NEGATIVE_INFINITY),
			p = typeof v == "number" && v <= (f ?? Number.POSITIVE_INFINITY),
			S = n.target === "draft-04" || n.target === "openapi-3.0";
		(_
			? S
				? ((l.minimum = y), (l.exclusiveMinimum = !0))
				: (l.exclusiveMinimum = y)
			: typeof o == "number" && (l.minimum = o),
			p
				? S
					? ((l.maximum = v), (l.exclusiveMaximum = !0))
					: (l.exclusiveMaximum = v)
				: typeof f == "number" && (l.maximum = f),
			typeof m == "number" && (l.multipleOf = m));
	},
	hA = (e, n, a, u) => {
		a.not = {};
	},
	mA = (e, n, a, u) => {},
	vA = (e, n, a, u) => {
		const l = e._zod.def,
			o = Db(l.entries);
		(o.every((f) => typeof f == "number") && (a.type = "number"),
			o.every((f) => typeof f == "string") && (a.type = "string"),
			(a.enum = o));
	},
	gA = (e, n, a, u) => {
		if (n.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
	},
	yA = (e, n, a, u) => {
		if (n.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
	},
	bA = (e, n, a, u) => {
		const l = a,
			o = e._zod.def,
			{ minimum: f, maximum: h } = e._zod.bag;
		(typeof f == "number" && (l.minItems = f),
			typeof h == "number" && (l.maxItems = h),
			(l.type = "array"),
			(l.items = Yt(o.element, n, { ...u, path: [...u.path, "items"] })));
	},
	pA = (e, n, a, u) => {
		const l = a,
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
	SA = (e, n, a, u) => {
		const l = e._zod.def,
			o = l.inclusive === !1,
			f = l.options.map((h, m) => Yt(h, n, { ...u, path: [...u.path, o ? "oneOf" : "anyOf", m] }));
		o ? (a.oneOf = f) : (a.anyOf = f);
	},
	wA = (e, n, a, u) => {
		const l = e._zod.def,
			o = Yt(l.left, n, { ...u, path: [...u.path, "allOf", 0] }),
			f = Yt(l.right, n, { ...u, path: [...u.path, "allOf", 1] }),
			h = (m) => "allOf" in m && Object.keys(m).length === 1;
		a.allOf = [...(h(o) ? o.allOf : [o]), ...(h(f) ? f.allOf : [f])];
	},
	_A = (e, n, a, u) => {
		const l = e._zod.def,
			o = Yt(l.innerType, n, u),
			f = n.seen.get(e);
		n.target === "openapi-3.0" ? ((f.ref = l.innerType), (a.nullable = !0)) : (a.anyOf = [o, { type: "null" }]);
	},
	xA = (e, n, a, u) => {
		const l = e._zod.def;
		Yt(l.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = l.innerType;
	},
	EA = (e, n, a, u) => {
		const l = e._zod.def;
		Yt(l.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = l.innerType), (a.default = JSON.parse(JSON.stringify(l.defaultValue))));
	},
	CA = (e, n, a, u) => {
		const l = e._zod.def;
		Yt(l.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = l.innerType), n.io === "input" && (a._prefault = JSON.parse(JSON.stringify(l.defaultValue))));
	},
	TA = (e, n, a, u) => {
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
		a.default = f;
	},
	AA = (e, n, a, u) => {
		const l = e._zod.def,
			o = l.in._zod.traits.has("$ZodTransform"),
			f = n.io === "input" ? (o ? l.out : l.in) : l.out;
		Yt(f, n, u);
		const h = n.seen.get(e);
		h.ref = f;
	},
	RA = (e, n, a, u) => {
		const l = e._zod.def;
		Yt(l.innerType, n, u);
		const o = n.seen.get(e);
		((o.ref = l.innerType), (a.readOnly = !0));
	},
	ip = (e, n, a, u) => {
		const l = e._zod.def;
		Yt(l.innerType, n, u);
		const o = n.seen.get(e);
		o.ref = l.innerType;
	},
	OA = ee("ZodISODateTime", (e, n) => {
		(UC.init(e, n), lt.init(e, n));
	});
function NA(e) {
	return $T(OA, e);
}
var MA = ee("ZodISODate", (e, n) => {
	(IC.init(e, n), lt.init(e, n));
});
function zA(e) {
	return BT(MA, e);
}
var kA = ee("ZodISOTime", (e, n) => {
	(LC.init(e, n), lt.init(e, n));
});
function DA(e) {
	return VT(kA, e);
}
var jA = ee("ZodISODuration", (e, n) => {
	($C.init(e, n), lt.init(e, n));
});
function qA(e) {
	return HT(jA, e);
}
var UA = (e, n) => {
		(Lb.init(e, n),
			(e.name = "ZodError"),
			Object.defineProperties(e, {
				format: { value: (a) => OE(e, a) },
				flatten: { value: (a) => RE(e, a) },
				addIssue: {
					value: (a) => {
						(e.issues.push(a), (e.message = JSON.stringify(e.issues, pd, 2)));
					},
				},
				addIssues: {
					value: (a) => {
						(e.issues.push(...a), (e.message = JSON.stringify(e.issues, pd, 2)));
					},
				},
				isEmpty: {
					get() {
						return e.issues.length === 0;
					},
				},
			}));
	},
	jn = ee("ZodError", UA, { Parent: Error }),
	IA = Vd(jn),
	LA = Hd(jn),
	$A = oo(jn),
	BA = co(jn),
	VA = zE(jn),
	HA = kE(jn),
	ZA = DE(jn),
	QA = jE(jn),
	PA = qE(jn),
	YA = UE(jn),
	FA = IE(jn),
	KA = LE(jn),
	t0 = new WeakMap();
function is(e, n, a) {
	const u = Object.getPrototypeOf(e);
	let l = t0.get(u);
	if ((l || ((l = new Set()), t0.set(u, l)), !l.has(n))) {
		l.add(n);
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
var Rt = ee(
		"ZodType",
		(e, n) => (
			At.init(e, n),
			Object.assign(e["~standard"], { jsonSchema: { input: Jl(e, "input"), output: Jl(e, "output") } }),
			(e.toJSONSchema = oA(e, {})),
			(e.def = n),
			(e.type = n.type),
			Object.defineProperty(e, "_def", { value: n }),
			(e.parse = (a, u) => IA(e, a, u, { callee: e.parse })),
			(e.safeParse = (a, u) => $A(e, a, u)),
			(e.parseAsync = async (a, u) => LA(e, a, u, { callee: e.parseAsync })),
			(e.safeParseAsync = async (a, u) => BA(e, a, u)),
			(e.spa = e.safeParseAsync),
			(e.encode = (a, u) => VA(e, a, u)),
			(e.decode = (a, u) => HA(e, a, u)),
			(e.encodeAsync = async (a, u) => ZA(e, a, u)),
			(e.decodeAsync = async (a, u) => QA(e, a, u)),
			(e.safeEncode = (a, u) => PA(e, a, u)),
			(e.safeDecode = (a, u) => YA(e, a, u)),
			(e.safeEncodeAsync = async (a, u) => FA(e, a, u)),
			(e.safeDecodeAsync = async (a, u) => KA(e, a, u)),
			is(e, "ZodType", {
				check(...a) {
					const u = this.def;
					return this.clone(
						oa(u, {
							checks: [
								...(u.checks ?? []),
								...a.map((l) =>
									typeof l == "function" ? { _zod: { check: l, def: { check: "custom" }, onattach: [] } } : l,
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
					return ca(this, a, u);
				},
				brand() {
					return this;
				},
				register(a, u) {
					return (a.add(this, u), this);
				},
				refine(a, u) {
					return this.check(ZR(a, u));
				},
				superRefine(a, u) {
					return this.check(QR(a, u));
				},
				overwrite(a) {
					return this.check(Qr(a));
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
				nonoptional(a) {
					return UR(this, a);
				},
				array() {
					return SR(this);
				},
				or(a) {
					return ER([this, a]);
				},
				and(a) {
					return TR(this, a);
				},
				transform(a) {
					return l0(this, OR(a));
				},
				default(a) {
					return DR(this, a);
				},
				prefault(a) {
					return qR(this, a);
				},
				catch(a) {
					return LR(this, a);
				},
				pipe(a) {
					return l0(this, a);
				},
				readonly() {
					return VR(this);
				},
				describe(a) {
					const u = this.clone();
					return (Hu.add(u, { description: a }), u);
				},
				meta(...a) {
					if (a.length === 0) return Hu.get(this);
					const u = this.clone();
					return (Hu.add(u, a[0]), u);
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
					return Hu.get(e)?.description;
				},
				configurable: !0,
			}),
			e
		),
	),
	ap = ee("_ZodString", (e, n) => {
		(Zd.init(e, n), Rt.init(e, n), (e._zod.processJSONSchema = (u, l, o) => fA(e, u, l, o)));
		const a = e._zod.bag;
		((e.format = a.format ?? null),
			(e.minLength = a.minimum ?? null),
			(e.maxLength = a.maximum ?? null),
			is(e, "_ZodString", {
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
					return this.check(Xl(...u));
				},
				max(...u) {
					return this.check(Jb(...u));
				},
				length(...u) {
					return this.check(Wb(...u));
				},
				nonempty(...u) {
					return this.check(Xl(1, ...u));
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
					return this.check(aA());
				},
			}));
	}),
	GA = ee("ZodString", (e, n) => {
		(Zd.init(e, n),
			ap.init(e, n),
			(e.email = (a) => e.check(pT(JA, a))),
			(e.url = (a) => e.check(ET(WA, a))),
			(e.jwt = (a) => e.check(LT(mR, a))),
			(e.emoji = (a) => e.check(CT(eR, a))),
			(e.guid = (a) => e.check(Xy(n0, a))),
			(e.uuid = (a) => e.check(ST(Ll, a))),
			(e.uuidv4 = (a) => e.check(wT(Ll, a))),
			(e.uuidv6 = (a) => e.check(_T(Ll, a))),
			(e.uuidv7 = (a) => e.check(xT(Ll, a))),
			(e.nanoid = (a) => e.check(TT(tR, a))),
			(e.guid = (a) => e.check(Xy(n0, a))),
			(e.cuid = (a) => e.check(AT(nR, a))),
			(e.cuid2 = (a) => e.check(RT(iR, a))),
			(e.ulid = (a) => e.check(OT(aR, a))),
			(e.base64 = (a) => e.check(qT(fR, a))),
			(e.base64url = (a) => e.check(UT(dR, a))),
			(e.xid = (a) => e.check(NT(rR, a))),
			(e.ksuid = (a) => e.check(MT(uR, a))),
			(e.ipv4 = (a) => e.check(zT(sR, a))),
			(e.ipv6 = (a) => e.check(kT(lR, a))),
			(e.cidrv4 = (a) => e.check(DT(oR, a))),
			(e.cidrv6 = (a) => e.check(jT(cR, a))),
			(e.e164 = (a) => e.check(IT(hR, a))),
			(e.datetime = (a) => e.check(NA(a))),
			(e.date = (a) => e.check(zA(a))),
			(e.time = (a) => e.check(DA(a))),
			(e.duration = (a) => e.check(qA(a))));
	});
function XA(e) {
	return bT(GA, e);
}
var lt = ee("ZodStringFormat", (e, n) => {
		(ut.init(e, n), ap.init(e, n));
	}),
	JA = ee("ZodEmail", (e, n) => {
		(RC.init(e, n), lt.init(e, n));
	}),
	n0 = ee("ZodGUID", (e, n) => {
		(TC.init(e, n), lt.init(e, n));
	}),
	Ll = ee("ZodUUID", (e, n) => {
		(AC.init(e, n), lt.init(e, n));
	}),
	WA = ee("ZodURL", (e, n) => {
		(OC.init(e, n), lt.init(e, n));
	}),
	eR = ee("ZodEmoji", (e, n) => {
		(NC.init(e, n), lt.init(e, n));
	}),
	tR = ee("ZodNanoID", (e, n) => {
		(MC.init(e, n), lt.init(e, n));
	}),
	nR = ee("ZodCUID", (e, n) => {
		(zC.init(e, n), lt.init(e, n));
	}),
	iR = ee("ZodCUID2", (e, n) => {
		(kC.init(e, n), lt.init(e, n));
	}),
	aR = ee("ZodULID", (e, n) => {
		(DC.init(e, n), lt.init(e, n));
	}),
	rR = ee("ZodXID", (e, n) => {
		(jC.init(e, n), lt.init(e, n));
	}),
	uR = ee("ZodKSUID", (e, n) => {
		(qC.init(e, n), lt.init(e, n));
	}),
	sR = ee("ZodIPv4", (e, n) => {
		(BC.init(e, n), lt.init(e, n));
	}),
	lR = ee("ZodIPv6", (e, n) => {
		(VC.init(e, n), lt.init(e, n));
	}),
	oR = ee("ZodCIDRv4", (e, n) => {
		(HC.init(e, n), lt.init(e, n));
	}),
	cR = ee("ZodCIDRv6", (e, n) => {
		(ZC.init(e, n), lt.init(e, n));
	}),
	fR = ee("ZodBase64", (e, n) => {
		(QC.init(e, n), lt.init(e, n));
	}),
	dR = ee("ZodBase64URL", (e, n) => {
		(YC.init(e, n), lt.init(e, n));
	}),
	hR = ee("ZodE164", (e, n) => {
		(FC.init(e, n), lt.init(e, n));
	}),
	mR = ee("ZodJWT", (e, n) => {
		(GC.init(e, n), lt.init(e, n));
	}),
	rp = ee("ZodNumber", (e, n) => {
		(Fb.init(e, n),
			Rt.init(e, n),
			(e._zod.processJSONSchema = (u, l, o) => dA(e, u, l, o)),
			is(e, "ZodNumber", {
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
					return this.check(a0(u));
				},
				safe(u) {
					return this.check(a0(u));
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
		const a = e._zod.bag;
		((e.minValue =
			Math.max(a.minimum ?? Number.NEGATIVE_INFINITY, a.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null),
			(e.maxValue =
				Math.min(a.maximum ?? Number.POSITIVE_INFINITY, a.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null),
			(e.isInt = (a.format ?? "").includes("int") || Number.isSafeInteger(a.multipleOf ?? 0.5)),
			(e.isFinite = !0),
			(e.format = a.format ?? null));
	});
function i0(e) {
	return ZT(rp, e);
}
var vR = ee("ZodNumberFormat", (e, n) => {
	(XC.init(e, n), rp.init(e, n));
});
function a0(e) {
	return QT(vR, e);
}
var gR = ee("ZodUnknown", (e, n) => {
	(JC.init(e, n), Rt.init(e, n), (e._zod.processJSONSchema = (a, u, l) => mA(e, a, u, l)));
});
function r0() {
	return PT(gR);
}
var yR = ee("ZodNever", (e, n) => {
	(WC.init(e, n), Rt.init(e, n), (e._zod.processJSONSchema = (a, u, l) => hA(e, a, u, l)));
});
function bR(e) {
	return YT(yR, e);
}
var pR = ee("ZodArray", (e, n) => {
	(eT.init(e, n),
		Rt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => bA(e, a, u, l)),
		(e.element = n.element),
		is(e, "ZodArray", {
			min(a, u) {
				return this.check(Xl(a, u));
			},
			nonempty(a) {
				return this.check(Xl(1, a));
			},
			max(a, u) {
				return this.check(Jb(a, u));
			},
			length(a, u) {
				return this.check(Wb(a, u));
			},
			unwrap() {
				return this.element;
			},
		}));
});
function SR(e, n) {
	return rA(pR, e, n);
}
var wR = ee("ZodObject", (e, n) => {
	(nT.init(e, n),
		Rt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => pA(e, a, u, l)),
		Xe(e, "shape", () => n.shape),
		is(e, "ZodObject", {
			keyof() {
				return AR(Object.keys(this._zod.def.shape));
			},
			catchall(a) {
				return this.clone({ ...this._zod.def, catchall: a });
			},
			passthrough() {
				return this.clone({ ...this._zod.def, catchall: r0() });
			},
			loose() {
				return this.clone({ ...this._zod.def, catchall: r0() });
			},
			strict() {
				return this.clone({ ...this._zod.def, catchall: bR() });
			},
			strip() {
				return this.clone({ ...this._zod.def, catchall: void 0 });
			},
			extend(a) {
				return _E(this, a);
			},
			safeExtend(a) {
				return xE(this, a);
			},
			merge(a) {
				return EE(this, a);
			},
			pick(a) {
				return SE(this, a);
			},
			omit(a) {
				return wE(this, a);
			},
			partial(...a) {
				return CE(up, this, a[0]);
			},
			required(...a) {
				return TE(sp, this, a[0]);
			},
		}));
});
function _R(e, n) {
	const a = { type: "object", shape: e ?? {}, ...ye(n) };
	return new wR(a);
}
var xR = ee("ZodUnion", (e, n) => {
	(iT.init(e, n), Rt.init(e, n), (e._zod.processJSONSchema = (a, u, l) => SA(e, a, u, l)), (e.options = n.options));
});
function ER(e, n) {
	return new xR({ type: "union", options: e, ...ye(n) });
}
var CR = ee("ZodIntersection", (e, n) => {
	(aT.init(e, n), Rt.init(e, n), (e._zod.processJSONSchema = (a, u, l) => wA(e, a, u, l)));
});
function TR(e, n) {
	return new CR({ type: "intersection", left: e, right: n });
}
var wd = ee("ZodEnum", (e, n) => {
	(rT.init(e, n),
		Rt.init(e, n),
		(e._zod.processJSONSchema = (u, l, o) => vA(e, u, l, o)),
		(e.enum = n.entries),
		(e.options = Object.values(n.entries)));
	const a = new Set(Object.keys(n.entries));
	((e.extract = (u, l) => {
		const o = {};
		for (const f of u)
			if (a.has(f)) o[f] = n.entries[f];
			else throw new Error(`Key ${f} not found in enum`);
		return new wd({ ...n, checks: [], ...ye(l), entries: o });
	}),
		(e.exclude = (u, l) => {
			const o = { ...n.entries };
			for (const f of u)
				if (a.has(f)) delete o[f];
				else throw new Error(`Key ${f} not found in enum`);
			return new wd({ ...n, checks: [], ...ye(l), entries: o });
		}));
});
function AR(e, n) {
	const a = Array.isArray(e) ? Object.fromEntries(e.map((u) => [u, u])) : e;
	return new wd({ type: "enum", entries: a, ...ye(n) });
}
var RR = ee("ZodTransform", (e, n) => {
	(uT.init(e, n),
		Rt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => yA(e, a, u, l)),
		(e._zod.parse = (a, u) => {
			if (u.direction === "backward") throw new kb(e.constructor.name);
			a.addIssue = (o) => {
				if (typeof o == "string") a.issues.push(Ju(o, a.value, n));
				else {
					const f = o;
					(f.fatal && (f.continue = !1),
						f.code ?? (f.code = "custom"),
						f.input ?? (f.input = a.value),
						f.inst ?? (f.inst = e),
						a.issues.push(Ju(f)));
				}
			};
			const l = n.transform(a.value, a);
			return l instanceof Promise
				? l.then((o) => ((a.value = o), (a.fallback = !0), a))
				: ((a.value = l), (a.fallback = !0), a);
		}));
});
function OR(e) {
	return new RR({ type: "transform", transform: e });
}
var up = ee("ZodOptional", (e, n) => {
	(Xb.init(e, n),
		Rt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => ip(e, a, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function u0(e) {
	return new up({ type: "optional", innerType: e });
}
var NR = ee("ZodExactOptional", (e, n) => {
	(sT.init(e, n),
		Rt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => ip(e, a, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function MR(e) {
	return new NR({ type: "optional", innerType: e });
}
var zR = ee("ZodNullable", (e, n) => {
	(lT.init(e, n),
		Rt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => _A(e, a, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function s0(e) {
	return new zR({ type: "nullable", innerType: e });
}
var kR = ee("ZodDefault", (e, n) => {
	(oT.init(e, n),
		Rt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => EA(e, a, u, l)),
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
var jR = ee("ZodPrefault", (e, n) => {
	(cT.init(e, n),
		Rt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => CA(e, a, u, l)),
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
var sp = ee("ZodNonOptional", (e, n) => {
	(fT.init(e, n),
		Rt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => xA(e, a, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function UR(e, n) {
	return new sp({ type: "nonoptional", innerType: e, ...ye(n) });
}
var IR = ee("ZodCatch", (e, n) => {
	(dT.init(e, n),
		Rt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => TA(e, a, u, l)),
		(e.unwrap = () => e._zod.def.innerType),
		(e.removeCatch = e.unwrap));
});
function LR(e, n) {
	return new IR({ type: "catch", innerType: e, catchValue: typeof n == "function" ? n : () => n });
}
var $R = ee("ZodPipe", (e, n) => {
	(hT.init(e, n),
		Rt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => AA(e, a, u, l)),
		(e.in = n.in),
		(e.out = n.out));
});
function l0(e, n) {
	return new $R({ type: "pipe", in: e, out: n });
}
var BR = ee("ZodReadonly", (e, n) => {
	(mT.init(e, n),
		Rt.init(e, n),
		(e._zod.processJSONSchema = (a, u, l) => RA(e, a, u, l)),
		(e.unwrap = () => e._zod.def.innerType));
});
function VR(e) {
	return new BR({ type: "readonly", innerType: e });
}
var HR = ee("ZodCustom", (e, n) => {
	(vT.init(e, n), Rt.init(e, n), (e._zod.processJSONSchema = (a, u, l) => gA(e, a, u, l)));
});
function ZR(e, n = {}) {
	return uA(HR, e, n);
}
function QR(e, n) {
	return sA(e, n);
}
function PR(e) {
	const n = new Tb("https://exuberant-hippopotamus-790.convex.cloud", { authRefreshTokenLeewaySeconds: 15 });
	let a = { phase: "connecting", message: null, deadline: 0, refreshing: !1 };
	const u = new Set();
	let l = null,
		o = null,
		f = null,
		h = null,
		m = null,
		v = 0,
		y = !1,
		_ = !1;
	function p(T) {
		if (!y) {
			a = { ...a, ...T };
			for (const D of u) D();
		}
	}
	function S(T) {
		((_ = T),
			T && performance.now() < a.deadline
				? p({ phase: "ready", message: null })
				: !o &&
					a.phase !== "denied" &&
					p({ phase: "unavailable", message: "Chitchat is reconnecting. Your draft is kept." }));
	}
	function E() {
		y ||
			o ||
			((l = null), m && clearTimeout(m), (m = null), p({ phase: "connecting", message: null }), n.setAuth(C, S));
	}
	function C(T) {
		return !T.forceRefreshToken && l && performance.now() < a.deadline
			? Promise.resolve(l)
			: o ||
					(p({ refreshing: !0 }),
					(o = (async () => {
						const D = performance.now();
						f = new AbortController();
						const A = setTimeout(() => f?.abort(), 25e3);
						try {
							const M = await e.getToken(),
								R = "https://exuberant-hippopotamus-790.convex.site/auth/lease",
								N = {
									method: "POST",
									redirect: "error",
									headers: { "Content-Type": "application/json" },
									signal: f.signal,
								};
							let Z = await fetch(R, { ...N, body: JSON.stringify({ pressToken: M }) });
							if (Z.status === 401) {
								const L = await e.refreshToken();
								Z = await fetch(R, { ...N, body: JSON.stringify({ pressToken: L }) });
							}
							const U = await Z.json(),
								j = _R({ jwt: XA(), expiresAt: i0(), validForMs: i0().min(0).max(3e4) }).safeParse(U);
							if (!Z.ok || !j.success) {
								const L = Z.status === 401 || Z.status === 403;
								throw (
									p({
										phase: L ? "denied" : "unavailable",
										message: L
											? "Press no longer allows this Chitchat session."
											: "Chitchat is reconnecting. Your draft is kept.",
									}),
									new Error("Chitchat lease was refused")
								);
							}
							const I = D + j.data.validForMs;
							if (I <= performance.now()) throw new Error("Chitchat lease expired in transit");
							return (
								(l = j.data.jwt),
								(v = 0),
								h && clearTimeout(h),
								(h = setTimeout(
									() => {
										((l = null),
											p({ phase: "unavailable", message: "Chitchat is reconnecting. Your draft is kept." }),
											o || ((_ = !1), n.clearAuth(), E()));
									},
									Math.max(0, I - performance.now()),
								)),
								p({ phase: _ ? "ready" : "connecting", deadline: I, message: null }),
								l
							);
						} catch {
							return (
								(l = null),
								a.phase !== "denied" &&
									p({ phase: "unavailable", message: "Chitchat is reconnecting. Your draft is kept." }),
								!y && a.phase !== "denied" && ((v += 1), (m = setTimeout(E, Math.min(3e4, 2e3 * 2 ** Math.min(v, 4))))),
								null
							);
						} finally {
							(clearTimeout(A), (f = null), (o = null), p({ refreshing: !1 }));
						}
					})()),
					o);
	}
	return {
		convex: n,
		start: () => n.setAuth(C, S),
		retry: E,
		getSnapshot: () => a,
		subscribe: (T) => (
			u.add(T),
			() => {
				u.delete(T);
			}
		),
		can_request_now: () =>
			a.phase === "ready" &&
			!a.refreshing &&
			performance.now() < a.deadline &&
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
			const a = () => {
				n.getSnapshot().phase !== "ready" && n.retry();
			};
			return (
				window.addEventListener("online", a),
				window.addEventListener("focus", a),
				() => {
					(window.removeEventListener("online", a), window.removeEventListener("focus", a), n.close());
				}
			);
		}, [n]),
		(0, b.jsx)(lp.Provider, { value: n, children: (0, b.jsx)(Ux, { client: n.convex, children: e.children }) })
	);
}
function Hn() {
	const e = (0, w.useContext)(lp);
	if (!e) throw new Error("Chitchat needs its session provider");
	const n = (0, w.useSyncExternalStore)(e.subscribe, e.getSnapshot),
		a = Ix(),
		u = n.phase === "ready" && performance.now() < n.deadline,
		l = Ye(Se.sessions.current, u ? {} : "skip"),
		o = Ye(Se.sessions.status, u ? {} : "skip"),
		[f, h] = (0, w.useState)(l);
	(l && f !== l && h(l), (o === "denied" || n.phase === "denied") && f !== void 0 && h(void 0));
	const m = u && o === "refresh_required";
	return {
		member: m ? f : l,
		ready: u && o === "ready" && l !== null && l !== void 0,
		connected: u && o === "ready" && a.isWebSocketConnected,
		refreshing: m,
		canSend: u && o === "ready" && !!l?.canWrite && !n.refreshing && a.isWebSocketConnected,
		can_request_now: e.can_request_now,
		message:
			n.message ??
			(o === "denied"
				? "Your Chitchat access changed. Reconnect to continue."
				: u && !a.isWebSocketConnected
					? "Chitchat is disconnected. Your draft is kept."
					: null),
		retry: e.retry,
	};
}
function op(e) {
	const n = Hn(),
		a = Ei(`${n.member?.generation}:${n.member?.membershipLifetime}`),
		u = Ye(Se.members.list, n.ready ? { paginationOpts: { numItems: 100, cursor: a.cursor } } : "skip");
	return (0, b.jsxs)(b.Fragment, {
		children: [
			u
				? (0, b.jsx)("ul", {
						className: "people-list",
						children: u.page
							.filter((l) => l.userId !== e.selfUserId)
							.map((l) =>
								(0, b.jsx)(
									"li",
									{
										className: "people-item",
										children: (0, b.jsxs)("label", {
											children: [
												(0, b.jsx)("input", {
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
				: (0, b.jsx)("p", { className: "channel-status", role: "status", children: "Loading people…" }),
			u?.page.length === 0
				? (0, b.jsx)("p", { className: "channel-status", children: "No people on this page." })
				: null,
			(0, b.jsx)(ia, { page: a, result: u, label: "People" }),
		],
	});
}
function o0(e) {
	const n = Hr(),
		a = Hn(),
		u = (0, w.useId)(),
		l = (0, w.useId)(),
		o = (0, w.useId)(),
		f = (0, w.useId)(),
		h = Ye(Se.channels.permissions, a.ready && e.channel ? { channelId: e.channel._id } : "skip"),
		[m, v] = (0, w.useState)(e.channel?.name ?? ""),
		[y, _] = (0, w.useState)(e.channel?.topic ?? ""),
		[p, S] = (0, w.useState)(!1),
		[E, C] = (0, w.useState)([]),
		[T, D] = (0, w.useState)(null),
		[A, M] = (0, w.useState)(!1),
		[R, N] = (0, w.useState)(null),
		Z = A || T !== null,
		U = async () => {
			if (A) return;
			if (!a.can_request_now()) {
				N("Reconnect before saving. Your changes are kept.");
				return;
			}
			if (m.trim().length === 0 || m.trim().length > 64 || y.trim().length > 250) {
				N("Use a name of 1–64 characters and a topic of at most 250 characters.");
				return;
			}
			const j =
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
								visibility: p ? "private" : "public",
								invitedUserIds: p ? E : [],
							},
						});
			(D(j), M(!0), N(null));
			try {
				const I =
					j.kind === "create"
						? await n.mutation(Se.channels.create, j.args)
						: await n.mutation(Se.channels.update, j.args);
				if (I._nay) {
					(D(null), N(I._nay.message));
					return;
				}
				I._yay.kind === "channel" && e.onSaved(I._yay.channelId);
			} catch {
				N("The save may have reached Chitchat. Retry to check the same request.");
			} finally {
				M(!1);
			}
		};
	return (0, b.jsxs)(Zr, {
		labelledBy: u,
		accessUnavailable: !a.refreshing && (!a.ready || (e.channel !== null && h === null)),
		onReconnect: a.retry,
		onClose: () => {
			A || e.onClose();
		},
		children: [
			(0, b.jsx)("h2", {
				id: u,
				className: "dialog-title",
				children: e.channel ? `Rename #${e.channel.name}` : "Create channel",
			}),
			(0, b.jsxs)("form", {
				onSubmit: (j) => {
					(j.preventDefault(), U());
				},
				onKeyDown: (j) => {
					j.key === "Enter" && j.nativeEvent.isComposing && j.preventDefault();
				},
				children: [
					(0, b.jsxs)("div", {
						className: "field",
						children: [
							(0, b.jsx)("label", { htmlFor: l, children: "Channel name" }),
							(0, b.jsx)("input", {
								id: l,
								"data-dialog-initial": !0,
								value: m,
								required: !0,
								maxLength: 64,
								disabled: Z,
								"aria-describedby": R ? f : void 0,
								onInput: (j) => v(j.currentTarget.value),
							}),
						],
					}),
					(0, b.jsxs)("div", {
						className: "field",
						children: [
							(0, b.jsx)("label", { htmlFor: o, children: "Topic (optional)" }),
							(0, b.jsx)("input", {
								id: o,
								value: y,
								maxLength: 250,
								disabled: Z,
								onInput: (j) => _(j.currentTarget.value),
							}),
						],
					}),
					e.channel
						? null
						: (0, b.jsxs)("div", {
								className: "field",
								children: [
									(0, b.jsxs)("label", {
										className: "checkbox-label",
										children: [
											(0, b.jsx)("input", {
												type: "checkbox",
												checked: p,
												disabled: Z,
												onChange: (j) => S(j.currentTarget.checked),
											}),
											"Private channel",
										],
									}),
									p
										? (0, b.jsxs)(b.Fragment, {
												children: [
													(0, b.jsx)("p", { className: "field-note", children: Ud }),
													(0, b.jsx)("p", {
														className: "field-note",
														children:
															"Tick one person for a direct message, or several for a group. Up to 50 people can join.",
													}),
													(0, b.jsx)(op, {
														selfUserId: e.selfUserId,
														selected: E,
														disabled: Z,
														onToggle: (j, I) => C((L) => (I ? [...L, j] : L.filter(($) => $ !== j))),
													}),
													(0, b.jsxs)("p", {
														className: "field-note",
														children: [E.length + 1, " people selected, including you."],
													}),
												],
											})
										: null,
								],
							}),
					R ? (0, b.jsx)("p", { id: f, className: "form-error", role: "alert", children: R }) : null,
					(0, b.jsxs)("div", {
						className: "dialog-actions",
						children: [
							(0, b.jsx)("button", {
								type: "button",
								className: "button",
								disabled: A,
								onClick: e.onClose,
								children: T ? "Stop checking" : "Cancel",
							}),
							(0, b.jsx)("button", {
								type: "submit",
								className: "button button-primary",
								disabled: A || !(T ? a.connected : a.canSend),
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
	const n = Hr(),
		a = Hn(),
		u = (0, w.useId)(),
		[l, o] = (0, w.useState)(null),
		[f, h] = (0, w.useState)(!1),
		[m, v] = (0, w.useState)(null),
		y = Ye(Se.channels.get, a.ready ? { channelId: e.channelId } : "skip"),
		_ = Ye(
			Se.channels.list_members,
			a.ready ? { channelId: e.channelId, paginationOpts: { numItems: 50, cursor: null } } : "skip",
		),
		p = Ye(Se.channels.permissions, a.ready ? { channelId: e.channelId } : "skip"),
		S = Ye(Se.members.resolve, a.ready && _ ? { userIds: _.page.map((A) => A.hostUserId) } : "skip"),
		E = Ye(
			Se.channel_members.status,
			a.ready && l ? { channelId: e.channelId, clientRequestId: l.clientRequestId } : "skip",
		),
		C = E?.status === "pending";
	(0, w.useEffect)(() => {
		(E?.status === "complete" && (o(null), v(null)),
			E?.status === "cancelled" &&
				(o(null), v("Access changed before this request finished. Check the people list and try again.")));
	}, [E]);
	const T = async (A) => {
			if (!(f || C)) {
				if (!a.can_request_now()) {
					v("Reconnect before changing channel access.");
					return;
				}
				(o(A), h(!0), v(null));
				try {
					const M = await n.mutation(Se.channel_members.change, A);
					M._nay && (o(null), v(M._nay.message));
				} catch {
					v("This change may have reached Chitchat. Retry to check it.");
				} finally {
					h(!1);
				}
			}
		},
		D = (A, M) => {
			_ &&
				T({
					channelId: e.channelId,
					clientRequestId: crypto.randomUUID(),
					expectedMembershipRevision: _.membershipRevision,
					expectedPrincipalCount: _.memberCount,
					hostUserId: A,
					level: M,
				});
		};
	return (0, b.jsxs)(Zr, {
		labelledBy: u,
		accessUnavailable: !a.refreshing && (!a.ready || p === null),
		onReconnect: a.retry,
		onClose: () => {
			f || e.onClose();
		},
		children: [
			(0, b.jsx)("h2", { id: u, className: "dialog-title", children: y ? `People in #${y.name}` : "Channel access" }),
			(0, b.jsx)("p", { className: "field-note", children: Ud }),
			C
				? (0, b.jsx)("p", { role: "status", children: "Updating channel and transcript access…" })
				: _
					? (0, b.jsx)("ul", {
							className: "people-list current-people",
							"aria-label": "People in this channel",
							children: _.page.map((A) =>
								(0, b.jsxs)(
									"li",
									{
										className: "people-item",
										children: [
											(0, b.jsxs)("span", {
												children: [
													S?.[A.hostUserId] ?? "Unnamed member",
													A.level === "manage" ? " (can add people)" : A.level === "read" ? " (can read)" : "",
												],
											}),
											p?.canManage && A.hostUserId !== e.selfUserId
												? (0, b.jsxs)(b.Fragment, {
														children: [
															(0, b.jsxs)("select", {
																"aria-label": `Access for ${S?.[A.hostUserId] ?? "member"}`,
																value: A.level,
																disabled: f || l !== null,
																onChange: (M) => {
																	const R = M.currentTarget.value;
																	(R === "read" || R === "write" || R === "manage") && D(A.hostUserId, R);
																},
																children: [
																	(0, b.jsx)("option", { value: "read", children: "Can read" }),
																	(0, b.jsx)("option", { value: "write", children: "Can write" }),
																	(0, b.jsx)("option", { value: "manage", children: "Can add people" }),
																],
															}),
															(0, b.jsx)("button", {
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
					: (0, b.jsx)("p", {
							className: "channel-status",
							role: "status",
							children: _ === null ? "The people list is not currently available." : "Loading people…",
						}),
			p?.canManage && _
				? (0, b.jsxs)("div", {
						className: "field",
						children: [
							(0, b.jsx)("p", { className: "field-label", children: "Add people" }),
							(0, b.jsx)(op, {
								selfUserId: e.selfUserId,
								selected: _.page.map((A) => A.hostUserId),
								disabled: f || l !== null,
								onToggle: (A, M) => D(A, M ? "write" : null),
							}),
						],
					})
				: null,
			m ? (0, b.jsx)("p", { className: "form-error", role: "alert", children: m }) : null,
			(0, b.jsxs)("div", {
				className: "dialog-actions",
				children: [
					l && !C
						? (0, b.jsx)("button", {
								type: "button",
								className: "button",
								disabled: f || !a.canSend,
								onClick: () => void T(l),
								children: "Retry",
							})
						: null,
					(0, b.jsx)("button", {
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
	const n = Hr(),
		a = Hn(),
		u = (0, w.useId)(),
		[l] = (0, w.useState)(() => crypto.randomUUID()),
		[o, f] = (0, w.useState)(!1),
		[h, m] = (0, w.useState)(!1),
		[v, y] = (0, w.useState)(null),
		_ = e.action === "leave" || e.action === "delete",
		p = Ye(Se.channels.permissions, a.ready ? { channelId: e.channel._id } : "skip"),
		S = Ye(Se.channel_members.status, a.ready && h && _ ? { channelId: e.channel._id, clientRequestId: l } : "skip"),
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
				if (!a.can_request_now()) {
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
	return (0, b.jsxs)(Zr, {
		labelledBy: u,
		accessUnavailable: !a.refreshing && (!a.ready || p === null),
		onReconnect: a.retry,
		onClose: () => {
			o || e.onClose();
		},
		children: [
			(0, b.jsxs)("h2", {
				id: u,
				className: "dialog-title",
				children: [C, " #", e.channel.name, e.action === "delete" ? " for everyone" : "", "?"],
			}),
			(0, b.jsx)("p", {
				children:
					e.action === "archive"
						? "The channel is hidden from the active list. Its messages stay stored and it can be unarchived any time."
						: e.action === "unarchive"
							? "The channel returns to the active list."
							: D
								? `This deletes the channel for all ${e.channel.memberCount} people in it. Nobody can open it again. Copies in Files follow their own sharing settings. This cannot be undone.`
								: "You stop seeing this channel and its messages. Other people keep it. Somebody who can add people has to add you back. Copies in Files follow their own sharing settings.",
			}),
			E ? (0, b.jsx)("p", { role: "status", children: "Updating channel and transcript access…" }) : null,
			v ? (0, b.jsx)("p", { className: "form-error", role: "alert", children: v }) : null,
			(0, b.jsxs)("div", {
				className: "dialog-actions",
				children: [
					(0, b.jsx)("button", {
						type: "button",
						className: "button",
						"data-dialog-initial": !0,
						disabled: o,
						onClick: e.onClose,
						children: E ? "Close" : "Cancel",
					}),
					(0, b.jsx)("button", {
						type: "button",
						className: `button ${D || e.action === "archive" ? "button-danger" : "button-primary"}`,
						disabled: o || E || !(e.action === "leave" || h ? a.connected : a.canSend),
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
function Ri(e, n) {
	return typeof Object.hasOwn == "function" ? Object.hasOwn(e, n) : Object.prototype.hasOwnProperty.call(e, n);
}
function on(...e) {
	return (...n) => {
		for (const a of e) typeof a == "function" && a(...n);
	};
}
function fp(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function JR(e, n) {
	const a = { ...e };
	for (const u of n) Ri(a, u) && delete a[u];
	return a;
}
function WR(e, n) {
	const a = {};
	for (const u of n) Ri(e, u) && (a[u] = e[u]);
	return a;
}
function dp(e) {
	return e;
}
function vt(e, n) {
	if (!e) throw typeof n != "string" ? new Error("Invariant failed") : new Error(n);
}
function eO(e) {
	return Object.keys(e);
}
function ho(e, ...n) {
	const a = typeof e == "function" ? e(...n) : e;
	return a == null ? !1 : !a;
}
function as(e) {
	return e.disabled || e["aria-disabled"] === !0 || e["aria-disabled"] === "true";
}
function Za(e) {
	const n = {};
	for (const a in e) e[a] !== void 0 && (n[a] = e[a]);
	return n;
}
function xe(...e) {
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
	const a = { ...e };
	for (const u in n) {
		if (!Ri(n, u)) continue;
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
		const l = n[u];
		if (typeof l == "function" && u.startsWith("on")) {
			const o = e[u];
			if (typeof o == "function") {
				a[u] = (...f) => {
					(l(...f), o(...f));
				};
				continue;
			}
		}
		a[u] = l;
	}
	return a;
}
var Pr = aO();
function aO() {
	var e;
	return typeof window < "u" && !!((e = window.document) != null && e.createElement);
}
function it(e) {
	return e ? ("self" in e ? e.document : e.ownerDocument || document) : document;
}
function hp(e) {
	return e ? ("self" in e ? e.self : it(e).defaultView || window) : self;
}
function Oi(e, n = !1) {
	const { activeElement: a } = it(e);
	if (!a?.nodeName) return null;
	if (Qd(a) && a.contentDocument) return Oi(a.contentDocument.body, n);
	if (n) {
		const u = a.getAttribute("aria-activedescendant");
		if (u) {
			const l = it(a).getElementById(u);
			if (l) return l;
		}
	}
	return a;
}
function Tt(e, n) {
	return e === n || e.contains(n);
}
function Qd(e) {
	return e.tagName === "IFRAME";
}
function ra(e) {
	const n = e.tagName.toLowerCase();
	return n === "button" ? !0 : n === "input" && e.type ? rO.indexOf(e.type) !== -1 : !1;
}
var rO = ["button", "color", "file", "image", "reset", "submit"];
function mp(e) {
	if (typeof e.checkVisibility == "function") return e.checkVisibility();
	const n = e;
	return n.offsetWidth > 0 || n.offsetHeight > 0 || e.getClientRects().length > 0;
}
function Jn(e) {
	try {
		const n = e instanceof HTMLInputElement && e.selectionStart !== null,
			a = e.tagName === "TEXTAREA";
		return n || a || !1;
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
		a = 0;
	if (Jn(e)) ((n = e.selectionStart || 0), (a = e.selectionEnd || 0));
	else if (e.isContentEditable) {
		const u = it(e).getSelection();
		if (u?.rangeCount && u.anchorNode && Tt(e, u.anchorNode) && u.focusNode && Tt(e, u.focusNode)) {
			const l = u.getRangeAt(0),
				o = l.cloneRange();
			(o.selectNodeContents(e),
				o.setEnd(l.startContainer, l.startOffset),
				(n = o.toString().length),
				o.setEnd(l.endContainer, l.endOffset),
				(a = o.toString().length));
		}
	}
	return { start: n, end: a };
}
function mo(e, n) {
	const a = ["dialog", "menu", "listbox", "tree", "grid"],
		u = e?.getAttribute("role");
	return u && a.indexOf(u) !== -1 ? u : n;
}
function vp(e, n) {
	var a;
	const u = { menu: "menuitem", listbox: "option", tree: "treeitem" },
		l = mo(e);
	return l && (a = u[l]) != null ? a : n;
}
function Pd(e) {
	if (!e) return null;
	const n = (a) => a === "auto" || a === "scroll";
	if (e.clientHeight && e.scrollHeight > e.clientHeight) {
		const { overflowY: a } = getComputedStyle(e);
		if (n(a)) return e;
	} else if (e.clientWidth && e.scrollWidth > e.clientWidth) {
		const { overflowX: a } = getComputedStyle(e);
		if (n(a)) return e;
	}
	return Pd(e.parentElement) || document.scrollingElement || document.body;
}
function nd(e, ...n) {
	/text|search|password|tel|url/i.test(e.type) && e.setSelectionRange(...n);
}
function gp(e, n) {
	const a = e.map((l, o) => [o, l]);
	let u = !1;
	return (
		a.sort(([l, o], [f, h]) => {
			const m = n(o),
				v = n(h);
			return m === v || !m || !v ? 0 : sO(m, v) ? (l > f && (u = !0), -1) : (l < f && (u = !0), 1);
		}),
		u ? a.map(([l, o]) => o) : e
	);
}
function sO(e, n) {
	return !!(n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
function yp() {
	return Pr && !!navigator.maxTouchPoints;
}
function Yd() {
	return Pr ? /mac|iphone|ipad|ipod/i.test(navigator.platform) : !1;
}
function vo() {
	return Pr && Yd() && /apple/i.test(navigator.vendor);
}
function lO() {
	return Pr && /firefox\//i.test(navigator.userAgent);
}
function oO() {
	return Pr && navigator.platform.startsWith("Mac") && !yp();
}
function bp(e) {
	return !!(e.currentTarget && !Tt(e.currentTarget, e.target));
}
function wn(e) {
	return e.target === e.currentTarget;
}
function pp(e) {
	const n = e.currentTarget;
	if (!n) return !1;
	const a = Yd();
	if ((a && !e.metaKey) || (!a && !e.ctrlKey)) return !1;
	const u = n.tagName.toLowerCase();
	return u === "a" || (u === "button" && n.type === "submit") || (u === "input" && n.type === "submit");
}
function Sp(e) {
	const n = e.currentTarget;
	if (!n) return !1;
	const a = n.tagName.toLowerCase();
	return e.altKey ? a === "a" || (a === "button" && n.type === "submit") || (a === "input" && n.type === "submit") : !1;
}
function cO(e, n, a) {
	const u = new Event(n, a);
	return e.dispatchEvent(u);
}
function Nr(e, n) {
	const a = new FocusEvent("blur", n),
		u = e.dispatchEvent(a),
		l = { ...n, bubbles: !0 };
	return (e.dispatchEvent(new FocusEvent("focusout", l)), u);
}
function fO(e, n, a) {
	const u = new KeyboardEvent(n, a);
	return e.dispatchEvent(u);
}
function c0(e, n) {
	const a = new MouseEvent("click", n);
	return e.dispatchEvent(a);
}
function ka(e, n) {
	const a = n || e.currentTarget,
		u = e.relatedTarget;
	return !u || !Tt(a, u);
}
function Ur(e, n, a, u) {
	const o = ((h) => {
			if (u) {
				const v = setTimeout(h, u);
				return () => clearTimeout(v);
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
function Qt(e, n, a, u = window) {
	const l = [];
	try {
		u.document.addEventListener(e, n, a);
		for (const f of Array.from(u.frames)) l.push(Qt(e, n, a, f));
	} catch {}
	return () => {
		try {
			u.document.removeEventListener(e, n, a);
		} catch {}
		for (const f of l) f();
	};
}
var Fd = { ...w },
	f0 = Fd.useId,
	bk = Fd.useDeferredValue,
	d0 = Fd.useInsertionEffect,
	He = Pr ? w.useLayoutEffect : w.useEffect;
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
		(0, w.useCallback)((...a) => {
			var u;
			return (u = n.current) == null ? void 0 : u.call(n, ...a);
		}, [])
	);
}
function hO(e) {
	const [n, a] = (0, w.useState)(null);
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
		[n, a]
	);
}
function gt(...e) {
	return (0, w.useMemo)(() => {
		if (e.some(Boolean))
			return (n) => {
				for (const a of e) _d(a, n);
			};
	}, e);
}
function Ni(e) {
	if (f0) {
		const u = f0();
		return e || u;
	}
	const [n, a] = (0, w.useState)(e);
	return (
		He(() => {
			if (e || n) return;
			const u = Math.random().toString(36).slice(2, 8);
			a(`id-${u}`);
		}, [e, n]),
		e || n
	);
}
function _p(e, n) {
	const a = (o) => {
			if (typeof o == "string") return o;
		},
		[u, l] = (0, w.useState)(() => a(n));
	return (
		He(() => {
			const o = e && "current" in e ? e.current : e;
			l(o?.tagName.toLowerCase() || a(n));
		}, [e, n]),
		u
	);
}
function mO(e, n, a) {
	const u = dO(a),
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
function Yr(e, n) {
	const a = (0, w.useRef)(!1);
	((0, w.useEffect)(() => {
		if (a.current) return e();
		a.current = !0;
	}, n),
		(0, w.useEffect)(
			() => () => {
				a.current = !1;
			},
			[],
		));
}
function vO(e, n) {
	const a = (0, w.useRef)(!1);
	(He(() => {
		if (a.current) return e();
		a.current = !0;
	}, n),
		He(
			() => () => {
				a.current = !1;
			},
			[],
		));
}
function xp() {
	return (0, w.useReducer)(() => [], []);
}
function rt(e) {
	return _e(typeof e == "function" ? e : () => e);
}
function Pt(e, n, a = []) {
	const u = (0, w.useCallback)((l) => (e.wrapElement && (l = e.wrapElement(l)), n(l)), [...a, e.wrapElement]);
	return { ...e, wrapElement: u };
}
function Kd(e = !1, n) {
	const [a, u] = (0, w.useState)(null);
	return { portalRef: gt(u, n), portalNode: a, domReady: !e || a };
}
function Ep(e, n, a) {
	const u = e.onLoadedMetadataCapture,
		l = (0, w.useMemo)(() => Object.assign(() => {}, { ...u, [n]: a }), [u, n, a]);
	return [u?.[n], { onLoadedMetadataCapture: l }];
}
var h0 = !1;
function Gd() {
	return (
		(0, w.useEffect)(() => {
			h0 ||
				(Qt("mousemove", yO, !0),
				Qt("mousedown", $l, !0),
				Qt("mouseup", $l, !0),
				Qt("keydown", $l, !0),
				Qt("scroll", $l, !0),
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
		a = e.movementY || e.screenY - v0;
	return ((m0 = e.screenX), (v0 = e.screenY), n || a || !1);
}
function yO(e) {
	gO(e) && (Xd = !0);
}
function $l() {
	Xd = !1;
}
function De(e) {
	const n = w.forwardRef((a, u) => e({ ...a, ref: u }));
	return ((n.displayName = e.displayName || e.name), n);
}
function go(e, n) {
	return w.memo(e, n);
}
function Ue(e, n) {
	const { wrapElement: a, render: u, ...l } = n,
		o = gt(n.ref, nO(u));
	let f;
	if (w.isValidElement(u)) {
		const h = { ...u.props, ref: o };
		f = w.cloneElement(u, iO(l, h));
	} else u ? (f = u(l)) : (f = (0, b.jsx)(e, { ...l }));
	return a ? a(f) : f;
}
function Le(e) {
	const n = (a = {}) => e(a);
	return ((n.displayName = e.name), n);
}
function Wn(e = [], n = []) {
	const a = w.createContext(void 0),
		u = w.createContext(void 0),
		l = () => w.useContext(a),
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
		h = (v) => e.reduceRight((y, _) => (0, b.jsx)(_, { ...v, children: y }), (0, b.jsx)(a.Provider, { ...v }));
	return {
		context: a,
		scopedContext: u,
		useContext: l,
		useScopedContext: o,
		useProviderContext: f,
		ContextProvider: h,
		ScopedContextProvider: (v) =>
			(0, b.jsx)(h, {
				...v,
				children: n.reduceRight((y, _) => (0, b.jsx)(_, { ...v, children: y }), (0, b.jsx)(u.Provider, { ...v })),
			}),
	};
}
var rs = Wn(),
	bO = rs.useContext,
	pk = rs.useScopedContext,
	Sk = rs.useProviderContext,
	pO = rs.ContextProvider,
	SO = rs.ScopedContextProvider,
	us = Wn([pO], [SO]),
	yo = us.useContext,
	wk = us.useScopedContext,
	wO = us.useProviderContext,
	ss = us.ContextProvider,
	bo = us.ScopedContextProvider,
	_O = (0, w.createContext)(void 0),
	xO = (0, w.createContext)(void 0),
	ls = Wn([ss], [bo]),
	EO = ls.useContext,
	CO = ls.useScopedContext,
	_k = ls.useProviderContext,
	xk = ls.ContextProvider,
	Ek = ls.ScopedContextProvider,
	Ck = (0, w.createContext)(void 0),
	os = Wn(),
	Tk = os.useContext,
	Ak = os.useScopedContext,
	Jd = os.useProviderContext,
	TO = os.ContextProvider,
	AO = os.ScopedContextProvider,
	cs = Wn([TO], [AO]),
	Rk = cs.useContext,
	Ok = cs.useScopedContext,
	po = cs.useProviderContext,
	RO = cs.ContextProvider,
	Wd = cs.ScopedContextProvider,
	OO = (0, w.createContext)(void 0),
	NO = (0, w.createContext)(void 0),
	fs = Wn([RO], [Wd]),
	Nk = fs.useContext,
	Mk = fs.useScopedContext,
	So = fs.useProviderContext,
	Cp = fs.ContextProvider,
	wo = fs.ScopedContextProvider,
	ds = Wn([Cp], [wo]),
	zk = ds.useContext,
	kk = ds.useScopedContext,
	eh = ds.useProviderContext,
	MO = ds.ContextProvider,
	Tp = ds.ScopedContextProvider,
	hs = Wn([ss, MO], [bo, Tp]),
	Ap = hs.useContext,
	zO = hs.useScopedContext,
	_o = hs.useProviderContext,
	Rp = hs.ContextProvider,
	kO = hs.ScopedContextProvider,
	Dk = (0, w.createContext)(void 0),
	DO = { id: null };
function jO(e, n, a = !1) {
	const u = e.findIndex((l) => l.id === n);
	return [...e.slice(u + 1), ...(a ? [DO] : []), ...e.slice(0, u)];
}
function qO(e, n) {
	return e.find((a) => (n ? !a.disabled && a.id !== n : !a.disabled));
}
function na(e, n) {
	return (n && e.item(n)) || null;
}
function UO(e) {
	const n = [];
	for (const a of e) {
		const u = n.find((l) => {
			var o;
			return ((o = l[0]) == null ? void 0 : o.rowId) === a.rowId;
		});
		u ? u.push(a) : n.push([a]);
	}
	return n;
}
function IO(e, n = !1) {
	if (Jn(e)) e.setSelectionRange(n ? e.value.length : 0, e.value.length);
	else if (e.isContentEditable) {
		const a = it(e).getSelection();
		(a?.selectAllChildren(e), n && a?.collapseToEnd());
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
function Pu(e, n, a) {
	if (!n || n === a) return !1;
	const u = e.item(n.id);
	return !(!u || (a && u.element === a));
}
var BO = "div",
	Ci = "";
function id() {
	Ci = "";
}
function VO(e) {
	const n = e.target;
	return n && Jn(n)
		? !1
		: e.key === " " && Ci.length
			? !0
			: e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey && /^[\p{Letter}\p{Number}]$/u.test(e.key);
}
function HO(e, n) {
	if (wn(e)) return !0;
	const a = e.target;
	return a ? n.some((u) => u.element === a) : !1;
}
function ZO(e) {
	return e.filter((n) => !n.disabled);
}
function Zl(e, n) {
	var a;
	const u = ((a = e.element) == null ? void 0 : a.textContent) || e.children || ("value" in e && e.value);
	return u ? fp(u).trim().toLowerCase().startsWith(n.toLowerCase()) : !1;
}
function QO(e, n, a) {
	if (!a) return e;
	const u = e.find((l) => l.id === a);
	return !u || !Zl(u, n) || (Ci !== n && Zl(u, Ci))
		? e
		: ((Ci = n),
			jO(
				e.filter((l) => Zl(l, Ci)),
				a,
			).filter((l) => l.id !== a));
}
var th = Le(function ({ store: n, typeahead: a = !0, ...u }) {
		const l = yo();
		((n = n || l), vt(n, !1));
		const o = u.onKeyDownCapture,
			f = (0, w.useRef)(0),
			h = _e((m) => {
				if ((o?.(m), m.defaultPrevented || !a || !n)) return;
				if (!VO(m)) return id();
				const { renderedItems: v, items: y, activeId: _, id: p } = n.getState();
				let S = ZO(y.length > v.length ? y : v);
				const E = it(m.currentTarget),
					C = `[data-offscreen-id="${p}"]`,
					T = E.querySelectorAll(C);
				for (const M of T) {
					const R = M.ariaDisabled === "true" || ("disabled" in M && !!M.disabled);
					S.push({ id: M.id, element: M, disabled: R });
				}
				if ((T.length && (S = gp(S, (M) => M.element)), !HO(m, S))) return id();
				(m.preventDefault(),
					window.clearTimeout(f.current),
					(f.current = window.setTimeout(() => {
						Ci = "";
					}, 500)));
				const D = m.key.toLowerCase();
				((Ci += D), (S = QO(S, D, _)));
				const A = S.find((M) => Zl(M, Ci));
				A ? n.move(A.id) : id();
			});
		return ((u = { ...u, onKeyDownCapture: h }), Za(u));
	}),
	jk = De(function (n) {
		return Ue(BO, th(n));
	});
function Qa(e, n) {
	const a = e.__unstableInternals;
	return (vt(a, "Invalid store"), a[n]);
}
function Vn(e, ...n) {
	let a = e,
		u = a,
		l = Symbol(),
		o = Qu;
	const f = new Set(),
		h = new Set(),
		m = new Set(),
		v = new Set(),
		y = new Set(),
		_ = new WeakMap(),
		p = new WeakMap(),
		S = (j) => (m.add(j), () => m.delete(j)),
		E = () => {
			const j = f.size,
				I = Symbol();
			f.add(I);
			const L = () => {
				(f.delete(I), !f.size && o());
			};
			if (j) return L;
			const $ = eO(a).map((K) =>
					on(
						...n.map((ie) => {
							var k;
							const H = (k = ie?.getState) == null ? void 0 : k.call(ie);
							if (H && Ri(H, K))
								return Ft(ie, [K], (B) => {
									Z(K, B[K], !0);
								});
						}),
					),
				),
				te = [];
			for (const K of m) te.push(K());
			const ne = n.map(nh);
			return ((o = on(...$, ...te, ...ne)), L);
		},
		C = (j, I, L = v) => (
			L.add(I),
			p.set(I, j),
			() => {
				var $;
				(($ = _.get(I)) == null || $(), _.delete(I), p.delete(I), L.delete(I));
			}
		),
		T = (j, I) => C(j, I),
		D = (j, I) => (_.set(I, I(a, a)), C(j, I)),
		A = (j, I) => (_.set(I, I(a, u)), C(j, I, y)),
		M = (j) => Vn(WR(a, j), U),
		R = (j) => Vn(JR(a, j), U),
		N = () => a,
		Z = (j, I, L = !1) => {
			var $;
			if (!Ri(a, j)) return;
			const te = cp(I, a[j]);
			if (te === a[j]) return;
			if (!L) for (const k of n) ($ = k?.setState) == null || $.call(k, j, te);
			const ne = a;
			a = { ...a, [j]: te };
			const K = Symbol();
			((l = K), h.add(j));
			const ie = (k, H, B) => {
				var ue;
				const fe = p.get(k),
					we = (O) => (B ? B.has(O) : O === j);
				(!fe || fe.some(we)) && ((ue = _.get(k)) == null || ue(), _.set(k, k(a, H)));
			};
			for (const k of v) ie(k, ne);
			queueMicrotask(() => {
				if (l !== K) return;
				const k = a;
				for (const H of y) ie(H, u, h);
				((u = k), h.clear());
			});
		},
		U = {
			getState: N,
			setState: Z,
			__unstableInternals: { setup: S, init: E, subscribe: T, sync: D, batch: A, pick: M, omit: R },
		};
	return U;
}
function Xt(e, ...n) {
	if (e) return Qa(e, "setup")(...n);
}
function nh(e, ...n) {
	if (e) return Qa(e, "init")(...n);
}
function ih(e, ...n) {
	if (e) return Qa(e, "subscribe")(...n);
}
function Ft(e, ...n) {
	if (e) return Qa(e, "sync")(...n);
}
function Wl(e, ...n) {
	if (e) return Qa(e, "batch")(...n);
}
function ah(e, ...n) {
	if (e) return Qa(e, "omit")(...n);
}
function Op(e, ...n) {
	if (e) return Qa(e, "pick")(...n);
}
function xo(...e) {
	var n;
	const a = {};
	for (const l of e) {
		const o = (n = l?.getState) == null ? void 0 : n.call(l);
		o && Object.assign(a, o);
	}
	const u = Vn(a, ...e);
	return Object.assign({}, ...e, u);
}
var PO = Dn((e) => {
		var n = ro();
		function a(p, S) {
			return (p === S && (p !== 0 || 1 / p === 1 / S)) || (p !== p && S !== S);
		}
		var u = typeof Object.is == "function" ? Object.is : a,
			l = n.useState,
			o = n.useEffect,
			f = n.useLayoutEffect,
			h = n.useDebugValue;
		function m(p, S) {
			var E = S(),
				C = l({ inst: { value: E, getSnapshot: S } }),
				T = C[0].inst,
				D = C[1];
			return (
				f(
					function () {
						((T.value = E), (T.getSnapshot = S), v(T) && D({ inst: T }));
					},
					[p, E, S],
				),
				o(
					function () {
						return (
							v(T) && D({ inst: T }),
							p(function () {
								v(T) && D({ inst: T });
							})
						);
					},
					[p],
				),
				h(E),
				E
			);
		}
		function v(p) {
			var S = p.getSnapshot;
			p = p.value;
			try {
				var E = S();
				return !u(p, E);
			} catch {
				return !0;
			}
		}
		function y(p, S) {
			return S();
		}
		var _ = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? y : m;
		e.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : _;
	}),
	YO = Dn((e, n) => {
		n.exports = PO();
	}),
	FO = X0(YO(), 1),
	{ useSyncExternalStore: Np } = FO.default,
	Mp = () => () => {};
function Ct(e, n = dp) {
	const a = w.useCallback((l) => (e ? ih(e, null, l) : Mp()), [e]),
		u = () => {
			const l = typeof n == "string" ? n : null,
				o = typeof n == "function" ? n : null,
				f = e?.getState();
			if (o) return o(f);
			if (f && l && Ri(f, l)) return f[l];
		};
	return Np(a, u, u);
}
function zp(e, n) {
	const a = w.useRef({}),
		u = w.useCallback((o) => (e ? ih(e, null, o) : Mp()), [e]),
		l = () => {
			const o = e?.getState();
			let f = !1;
			const h = a.current;
			for (const m in n) {
				const v = n[m];
				if (typeof v == "function") {
					const y = v(o);
					y !== h[m] && ((h[m] = y), (f = !0));
				}
				if (typeof v == "string") {
					if (!o || !Ri(o, v)) continue;
					const y = o[v];
					y !== h[m] && ((h[m] = y), (f = !0));
				}
			}
			return (f && (a.current = { ...h }), a.current);
		};
	return Np(u, l, l);
}
function mt(e, n, a, u) {
	const l = Ri(n, a) ? n[a] : void 0,
		o = wp({ value: l, setValue: u ? n[u] : void 0 });
	(He(
		() =>
			Ft(e, [a], (f, h) => {
				const { value: m, setValue: v } = o.current;
				v && f[a] !== h[a] && f[a] !== m && v(f[a]);
			}),
		[e, a],
	),
		He(() => {
			if (l !== void 0)
				return (
					e.setState(a, l),
					Wl(e, [a], () => {
						l !== void 0 && e.setState(a, l);
					})
				);
		}));
}
function Eo(e, n) {
	const [a, u] = w.useState(() => e(n));
	He(() => nh(a), [a]);
	const l = w.useCallback((o) => Ct(a, o), [a]);
	return [
		w.useMemo(() => ({ ...a, useState: l }), [a, l]),
		_e(() => {
			u((o) => e({ ...n, ...o.getState() }));
		}),
	];
}
var eo = Ob(),
	KO = "div";
function g0(e, n) {
	const a = setTimeout(n, e);
	return () => clearTimeout(a);
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
		.reduce((n, a) => {
			const u = a.endsWith("ms") ? 1 : 1e3,
				l = Number.parseFloat(a || "0s") * u;
			return l > n ? l : n;
		}, 0);
}
function Co(e, n, a) {
	return !a && n !== !1 && (!e || !!n);
}
var rh = Le(function ({ store: n, alwaysVisible: a, ...u }) {
		const l = Jd();
		((n = n || l), vt(n, !1));
		const o = (0, w.useRef)(null),
			f = Ni(u.id),
			[h, m] = (0, w.useState)(null),
			v = n.useState("open"),
			y = n.useState("mounted"),
			_ = n.useState("animated"),
			p = n.useState("contentElement"),
			S = Ct(n.disclosure, "contentElement");
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
					if (!p?.isConnected) {
						m(null);
						return;
					}
					return GO(() => {
						m(v ? "enter" : y ? "leave" : null);
					});
				}
			}, [_, p, v, y]),
			He(() => {
				if (!n || !_ || !h || !p) return;
				const D = () => n?.setState("animating", !1),
					A = () => (0, eo.flushSync)(D);
				if ((h === "leave" && v) || (h === "enter" && !v)) return;
				if (typeof _ == "number") return g0(_, A);
				const {
						transitionDuration: M,
						animationDuration: R,
						transitionDelay: N,
						animationDelay: Z,
					} = getComputedStyle(p),
					{
						transitionDuration: U = "0",
						animationDuration: j = "0",
						transitionDelay: I = "0",
						animationDelay: L = "0",
					} = S ? getComputedStyle(S) : {},
					$ = y0(N, Z, I, L) + y0(M, R, U, j);
				if (!$) {
					(h === "enter" && n.setState("animated", !1), D());
					return;
				}
				return g0(Math.max($ - 1e3 / 60, 0), A);
			}, [n, _, p, S, v, h]),
			(u = Pt(u, (D) => (0, b.jsx)(Wd, { value: n, children: D }), [n])));
		const E = Co(y, u.hidden, a),
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
				ref: gt(f ? n.setContentElement : null, o, u.ref),
				style: T,
			}),
			Za(u)
		);
	}),
	XO = De(function (n) {
		return Ue(KO, rh(n));
	}),
	qk = De(function ({ unmountOnHide: n, ...a }) {
		const u = Jd();
		return Ct(a.store || u, (l) => !n || l?.mounted) === !1 ? null : (0, b.jsx)(XO, { ...a });
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
function Br(e) {
	if (!$n(e) || JO(e)) return !1;
	if (!("form" in e) || !e.form || e.checked || e.type !== "radio") return !0;
	const n = e.form.elements.namedItem(e.name);
	if (!n || !("length" in n)) return !0;
	const a = Oi(e);
	return !a || a === e || !("form" in a) || a.form !== e.form || a.name !== e.name;
}
function uh(e, n) {
	const a = Array.from(e.querySelectorAll(To));
	n && a.unshift(e);
	const u = a.filter($n);
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
function Ao(e, n, a) {
	const u = Array.from(e.querySelectorAll(To)),
		l = u.filter(Br);
	return (
		n && Br(e) && l.unshift(e),
		l.forEach((o, f) => {
			if (Qd(o) && o.contentDocument) {
				const h = o.contentDocument.body,
					m = Ao(h, !1, a);
				l.splice(f, 1, ...m);
			}
		}),
		!l.length && a ? u : l
	);
}
function WO(e, n, a) {
	const [u] = Ao(e, n, a);
	return u || null;
}
function e2(e, n, a, u) {
	const l = Oi(e),
		o = uh(e, n),
		f = o.indexOf(l),
		h = o.slice(f + 1);
	return h.find(Br) || (a ? o.find(Br) : null) || (u ? h[0] : null) || null;
}
function ad(e, n) {
	return e2(document.body, !1, e, n);
}
function t2(e, n, a, u) {
	const l = Oi(e),
		o = uh(e, n).reverse(),
		f = o.indexOf(l),
		h = o.slice(f + 1);
	return h.find(Br) || (a ? o.find(Br) : null) || (u ? h[0] : null) || null;
}
function b0(e, n) {
	return t2(document.body, !1, e, n);
}
function n2(e) {
	for (; e && !$n(e); ) e = e.closest(To);
	return e || null;
}
function La(e) {
	const n = Oi(e);
	if (!n) return !1;
	if (n === e) return !0;
	const a = n.getAttribute("aria-activedescendant");
	return a ? a === e.id : !1;
}
function aa(e) {
	const n = Oi(e);
	if (!n) return !1;
	if (Tt(e, n)) return !0;
	const a = n.getAttribute("aria-activedescendant");
	return !a || !("id" in e) ? !1 : a === e.id ? !0 : !!e.querySelector(`#${CSS.escape(a)}`);
}
function Dp(e) {
	!aa(e) && $n(e) && e.focus();
}
function i2(e) {
	var n;
	const a = (n = e.getAttribute("tabindex")) != null ? n : "";
	(e.setAttribute("data-tabindex", a), e.setAttribute("tabindex", "-1"));
}
function a2(e, n) {
	const a = Ao(e, n);
	for (const u of a) i2(u);
}
function r2(e) {
	const n = e.querySelectorAll("[data-tabindex]"),
		a = (u) => {
			const l = u.getAttribute("data-tabindex");
			(u.removeAttribute("data-tabindex"), l ? u.setAttribute("tabindex", l) : u.removeAttribute("tabindex"));
		};
	e.hasAttribute("data-tabindex") && a(e);
	for (const u of n) a(u);
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
	const { tagName: n, readOnly: a, type: u } = e;
	return (n === "TEXTAREA" && !a) || (n === "SELECT" && !a)
		? !0
		: n === "INPUT" && !a
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
function m2(e, n, a, u, l) {
	return e ? (n ? (a && !u ? -1 : void 0) : a ? l : l || 0) : l;
}
function rd(e, n) {
	return _e((a) => {
		(e?.(a), !a.defaultPrevented && n && (a.stopPropagation(), a.preventDefault()));
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
var ms = Le(function ({ focusable: n = !0, accessibleWhenDisabled: a, autoFocus: u, onFocusVisible: l, ...o }) {
		const f = (0, w.useRef)(null);
		((0, w.useEffect)(() => {
			n && (_0 || (Qt("mousedown", v2, !0), Qt("keydown", g2, !0), (_0 = !0)));
		}, [n]),
			p0 &&
				(0, w.useEffect)(() => {
					if (!n) return;
					const K = f.current;
					if (!K || !w0(K)) return;
					const ie = f2(K);
					if (!ie) return;
					const k = () => queueMicrotask(() => K.focus());
					for (const H of ie) H.addEventListener("mouseup", k);
					return () => {
						for (const H of ie) H.removeEventListener("mouseup", k);
					};
				}, [n]));
		const h = n && as(o),
			m = !!h && !a,
			[v, y] = (0, w.useState)(!1);
		((0, w.useEffect)(() => {
			n && m && v && y(!1);
		}, [n, m, v]),
			(0, w.useEffect)(() => {
				if (!n || !v) return;
				const K = f.current;
				if (!K || typeof IntersectionObserver > "u") return;
				const ie = new IntersectionObserver(() => {
					$n(K) || y(!1);
				});
				return (ie.observe(K), () => ie.disconnect());
			}, [n, v]));
		const _ = rd(o.onKeyPressCapture, h),
			p = rd(o.onMouseDownCapture, h),
			S = rd(o.onClickCapture, h),
			E = o.onMouseDown,
			C = _e((K) => {
				if ((E?.(K), K.defaultPrevented || !n)) return;
				const ie = K.currentTarget;
				if (!p0 || bp(K) || (!ra(ie) && !w0(ie))) return;
				let k = !1;
				const H = () => {
					k = !0;
				};
				ie.addEventListener("focusin", H, { capture: !0, once: !0 });
				const B = n2(ie.parentElement);
				(S0(B, !0),
					Ur(ie, "mouseup", () => {
						(ie.removeEventListener("focusin", H, !0), S0(B, !1), !k && Dp(ie));
					}));
			}),
			T = (K, ie) => {
				if ((ie && (K.currentTarget = ie), !n)) return;
				const k = K.currentTarget;
				k && La(k) && (l?.(K), !K.defaultPrevented && ((k.dataset.focusVisible = "true"), y(!0)));
			},
			D = o.onKeyDownCapture,
			A = _e((K) => {
				if ((D?.(K), K.defaultPrevented || !n || v || K.metaKey || K.altKey || K.ctrlKey || !wn(K))) return;
				const ie = K.currentTarget;
				Ur(ie, "focusout", () => T(K, ie));
			}),
			M = o.onFocusCapture,
			R = _e((K) => {
				if ((M?.(K), K.defaultPrevented || !n)) return;
				if (!wn(K)) {
					y(!1);
					return;
				}
				const ie = K.currentTarget,
					k = () => T(K, ie);
				sh || c2(K.target) ? Ur(K.target, "focusout", k) : y(!1);
			}),
			N = o.onBlur,
			Z = _e((K) => {
				(N?.(K), n && ka(K) && (K.currentTarget.removeAttribute("data-focus-visible"), y(!1)));
			}),
			U = (0, w.useContext)(kp),
			j = _e((K) => {
				n &&
					u &&
					K &&
					U &&
					queueMicrotask(() => {
						La(K) || ($n(K) && K.focus());
					});
			}),
			I = _p(f),
			L = n && d2(I),
			$ = n && h2(I),
			te = o.style,
			ne = (0, w.useMemo)(() => (m ? { pointerEvents: "none", ...te } : te), [m, te]);
		return (
			(o = {
				"data-focus-visible": (n && v) || void 0,
				"data-autofocus": u || void 0,
				"aria-disabled": h || void 0,
				...o,
				ref: gt(f, j, o.ref),
				style: ne,
				tabIndex: m2(n, m, L, $, o.tabIndex),
				disabled: $ && m ? !0 : void 0,
				contentEditable: h ? void 0 : o.contentEditable,
				onKeyPressCapture: _,
				onClickCapture: S,
				onMouseDownCapture: p,
				onMouseDown: C,
				onKeyDownCapture: A,
				onFocusCapture: R,
				onBlur: Z,
			}),
			Za(o)
		);
	}),
	Uk = De(function (n) {
		return Ue(s2, ms(n));
	});
function qp(e) {
	const n = [];
	for (const a of e) n.push(...a);
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
function x0(e, n, a) {
	return _e((u) => {
		var l;
		if ((n?.(u), u.defaultPrevented || u.isPropagationStopped() || !wn(u) || S2(u) || p2(u))) return;
		const o = (l = na(e, e.getState().activeId)) == null ? void 0 : l.element;
		if (!o) return;
		const { view: f, ...h } = u;
		(o !== a?.current && o.focus(),
			fO(o, u.type, h) || u.preventDefault(),
			u.currentTarget.contains(o) && u.stopPropagation());
	});
}
function w2(e) {
	return qO(qp(Td(UO(e))));
}
function _2(e) {
	const [n, a] = (0, w.useState)(!1),
		u = (0, w.useCallback)(() => a(!0), []),
		l = e.useState((o) => na(e, o.activeId));
	return (
		(0, w.useEffect)(() => {
			const o = l?.element;
			n && o && (a(!1), o.focus({ preventScroll: !0 }));
		}, [l, n]),
		u
	);
}
var lh = Le(function ({ store: n, composite: a = !0, focusOnMove: u = a, moveOnKeyPress: l = !0, ...o }) {
		const f = wO();
		((n = n || f), vt(n, !1));
		const h = (0, w.useRef)(null),
			m = (0, w.useRef)(null),
			v = _2(n),
			y = n.useState("moves"),
			[, _] = hO(a ? n.setBaseElement : null);
		((0, w.useEffect)(() => {
			var I;
			if (!n || !y || !a || !u) return;
			const { activeId: L } = n.getState(),
				$ = (I = na(n, L)) == null ? void 0 : I.element;
			$ && u2($);
		}, [n, y, a, u]),
			He(() => {
				if (!n || !y || !a) return;
				const { baseElement: I, activeId: L } = n.getState();
				if (L !== null || !I) return;
				const $ = m.current;
				((m.current = null), $ && Nr($, { relatedTarget: I }), La(I) || I.focus());
			}, [n, y, a]));
		const p = n.useState("activeId"),
			S = n.useState("virtualFocus");
		He(() => {
			var I;
			if (!n || !a || !S) return;
			const L = m.current;
			if (((m.current = null), !L)) return;
			const $ = ((I = na(n, p)) == null ? void 0 : I.element) || Oi(L);
			$ !== L && Nr(L, { relatedTarget: $ });
		}, [n, p, S, a]);
		const E = x0(n, o.onKeyDownCapture, m),
			C = x0(n, o.onKeyUpCapture, m),
			T = o.onFocusCapture,
			D = _e((I) => {
				if ((T?.(I), I.defaultPrevented || !n)) return;
				const { virtualFocus: L } = n.getState();
				if (!L) return;
				const $ = I.relatedTarget,
					te = $O(I.currentTarget);
				wn(I) && te && (I.stopPropagation(), (m.current = $));
			}),
			A = o.onFocus,
			M = _e((I) => {
				if ((A?.(I), I.defaultPrevented || !a || !n)) return;
				const { relatedTarget: L } = I,
					{ virtualFocus: $ } = n.getState();
				$ ? wn(I) && !Pu(n, L) && queueMicrotask(v) : wn(I) && n.setActiveId(null);
			}),
			R = o.onBlurCapture,
			N = _e((I) => {
				var L;
				if ((R?.(I), I.defaultPrevented || !n)) return;
				const { virtualFocus: $, activeId: te } = n.getState();
				if (!$) return;
				const ne = (L = na(n, te)) == null ? void 0 : L.element,
					K = I.relatedTarget,
					ie = Pu(n, K),
					k = m.current;
				((m.current = null),
					wn(I) && ie
						? (K === ne ? k && k !== K && Nr(k, I) : ne ? Nr(ne, I) : k && Nr(k, I), I.stopPropagation())
						: !Pu(n, I.target) && ne && Nr(ne, I));
			}),
			Z = o.onKeyDown,
			U = rt(l),
			j = _e((I) => {
				var L;
				if ((Z?.(I), I.nativeEvent.isComposing || I.defaultPrevented || !n || !wn(I))) return;
				const { orientation: $, renderedItems: te, activeId: ne } = n.getState(),
					K = na(n, ne);
				if ((L = K?.element) != null && L.isConnected) return;
				const ie = $ !== "horizontal",
					k = $ !== "vertical",
					H = b2(te);
				if (
					(I.key === "ArrowLeft" || I.key === "ArrowRight" || I.key === "Home" || I.key === "End") &&
					Jn(I.currentTarget)
				)
					return;
				const ue = {
					ArrowUp:
						(H || ie) &&
						(() => {
							if (H) {
								const fe = w2(te);
								return fe?.id;
							}
							return n?.last();
						}),
					ArrowRight: (H || k) && n.first,
					ArrowDown: (H || ie) && n.first,
					ArrowLeft: (H || k) && n.last,
					Home: n.first,
					End: n.last,
					PageUp: n.first,
					PageDown: n.last,
				}[I.key];
				if (ue) {
					const fe = ue();
					if (fe !== void 0) {
						if (!U(I)) return;
						(I.preventDefault(), n.move(fe));
					}
				}
			});
		return (
			(o = Pt(o, (I) => (0, b.jsx)(ss, { value: n, children: I }), [n])),
			(o = {
				"aria-activedescendant": n.useState((I) => {
					var L;
					if (n && a && I.virtualFocus) return (L = na(n, I.activeId)) == null ? void 0 : L.id;
				}),
				...o,
				ref: gt(h, _, o.ref),
				onKeyDownCapture: E,
				onKeyUpCapture: C,
				onFocusCapture: D,
				onFocus: M,
				onBlurCapture: N,
				onKeyDown: j,
			}),
			(o = ms({ focusable: n.useState((I) => a && (I.virtualFocus || I.activeId === null)), ...o })),
			o
		);
	}),
	Ik = De(function (n) {
		return Ue(y2, lh(n));
	}),
	x2 = "div";
function E2({ store: e, ...n }) {
	const [a, u] = (0, w.useState)(void 0),
		l = n["aria-label"],
		o = Ct(e, "disclosureElement"),
		f = Ct(e, "contentElement");
	return (
		(0, w.useEffect)(() => {
			const h = o;
			if (!h) return;
			const m = f;
			m && (l || m.hasAttribute("aria-label") ? u(void 0) : h.id && u(h.id));
		}, [l, o, f]),
		a
	);
}
var Up = Le(function ({ store: n, alwaysVisible: a, composite: u, ...l }) {
		const o = _o();
		((n = n || o), vt(n, !1));
		const f = n.parent,
			h = n.menubar,
			m = !!f,
			v = Ni(l.id),
			y = l.onKeyDown,
			_ = n.useState((R) => R.placement.split("-")[0]),
			p = n.useState((R) => (R.orientation === "both" ? void 0 : R.orientation)),
			S = p !== "vertical",
			E = Ct(h, (R) => !!R && R.orientation !== "vertical"),
			C = _e((R) => {
				if ((y?.(R), !R.defaultPrevented)) {
					if (m || (h && !S)) {
						const N = {
							ArrowRight: () => _ === "left" && !S,
							ArrowLeft: () => _ === "right" && !S,
							ArrowUp: () => _ === "bottom" && S,
							ArrowDown: () => _ === "top" && S,
						}[R.key];
						if (N?.()) return (R.stopPropagation(), R.preventDefault(), n?.hide());
					}
					if (h) {
						const N = {
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
							Z = N?.();
						Z !== void 0 && (R.stopPropagation(), R.preventDefault(), h.move(Z));
					}
				}
			});
		l = Pt(l, (R) => (0, b.jsx)(kO, { value: n, children: R }), [n]);
		const T = E2({ store: n, ...l }),
			D = Co(n.useState("mounted"), l.hidden, a),
			A = D ? { ...l.style, display: "none" } : l.style;
		l = {
			id: v,
			"aria-labelledby": T,
			hidden: D,
			...l,
			ref: gt(v ? n.setContentElement : null, l.ref),
			style: A,
			onKeyDown: C,
		};
		const M = !!n.combobox;
		return (
			(u = u ?? !M),
			u && (l = { role: "menu", "aria-orientation": p, ...l }),
			(l = lh({ store: n, composite: u, ...l })),
			(l = th({ store: n, typeahead: !M, ...l })),
			l
		);
	}),
	Lk = De(function (n) {
		return Ue(x2, Up(n));
	});
function ud(e) {
	return [e.clientX, e.clientY];
}
function E0(e, n) {
	const [a, u] = e;
	let l = !1;
	const o = n.length;
	for (let f = o, h = 0, m = f - 1; h < f; m = h++) {
		const [v, y] = n[h],
			[_, p] = n[m],
			[, S] = n[m === 0 ? f - 1 : m - 1] || [0, 0],
			E = (y - p) * (a - v) - (v - _) * (u - y);
		if (p < y) {
			if (u >= p && u < y) {
				if (E === 0) return !0;
				E > 0 && (u === p ? u > S && (l = !l) : (l = !l));
			}
		} else if (y < p) {
			if (u > y && u <= p) {
				if (E === 0) return !0;
				E < 0 && (u === p ? u < S && (l = !l) : (l = !l));
			}
		} else if (u === y && ((a >= _ && a <= v) || (a >= v && a <= _))) return !0;
	}
	return l;
}
function C2(e, n) {
	const { top: a, right: u, bottom: l, left: o } = n,
		[f, h] = e;
	return [f < o ? "left" : f > u ? "right" : null, h < a ? "top" : h > l ? "bottom" : null];
}
function C0(e, n) {
	const a = e.getBoundingClientRect(),
		{ top: u, right: l, bottom: o, left: f } = a,
		[h, m] = C2(n, a),
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
	Ip = Le(function (n) {
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
		return Ue(T2, Ip(n));
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
			(n = Ip(n)),
			n
		);
	}),
	Bl = De(function (n) {
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
function ta(e) {
	queueMicrotask(() => {
		e?.focus();
	});
}
var Lp = Le(function ({
		preserveTabOrder: n,
		preserveTabOrderAnchor: a,
		portalElement: u,
		portalRef: l,
		portal: o = !0,
		...f
	}) {
		const h = (0, w.useRef)(null),
			m = gt(h, f.ref),
			v = (0, w.useContext)(T0),
			[y, _] = (0, w.useState)(null),
			[p, S] = (0, w.useState)(null),
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
				const M = M2(A, u);
				if (!M) {
					_(null);
					return;
				}
				const R = M.isConnected;
				if ((R || (v || N2(A)).appendChild(M), M.id || (M.id = A.id ? `portal/${A.id}` : z2()), _(M), _d(l, M), !R))
					return () => {
						(M.remove(), _d(l, null));
					};
			}, [o, u, v, l]),
			He(() => {
				if (!o || !n || !a) return;
				const A = it(a).createElement("span");
				return (
					(A.style.position = "fixed"),
					a.insertAdjacentElement("afterend", A),
					S(A),
					() => {
						(A.remove(), S(null));
					}
				);
			}, [o, n, a]),
			(0, w.useEffect)(() => {
				if (!y || !n) return;
				let A = 0;
				const M = (R) => {
					if (!ka(R)) return;
					const N = R.type === "focusin";
					if ((cancelAnimationFrame(A), N)) return r2(y);
					A = requestAnimationFrame(() => {
						a2(y, !0);
					});
				};
				return (
					y.addEventListener("focusin", M, !0),
					y.addEventListener("focusout", M, !0),
					() => {
						(cancelAnimationFrame(A),
							y.removeEventListener("focusin", M, !0),
							y.removeEventListener("focusout", M, !0));
					}
				);
			}, [y, n]),
			(f = Pt(
				f,
				(A) => {
					if (((A = (0, b.jsx)(T0.Provider, { value: y || v, children: A })), !o)) return A;
					if (!y) return (0, b.jsx)("span", { ref: m, id: f.id, style: { position: "fixed" }, hidden: !0 });
					((A = (0, b.jsxs)(b.Fragment, {
						children: [
							n &&
								y &&
								(0, b.jsx)(Bl, {
									ref: C,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-before",
									onFocus: (R) => {
										ka(R, y) ? ta(ad()) : ta(E.current);
									},
								}),
							A,
							n &&
								y &&
								(0, b.jsx)(Bl, {
									ref: T,
									"data-focus-trap": f.id,
									className: "__focus-trap-inner-after",
									onFocus: (R) => {
										ka(R, y) ? ta(b0()) : ta(D.current);
									},
								}),
						],
					})),
						y && (A = (0, eo.createPortal)(A, y)));
					let M = (0, b.jsxs)(b.Fragment, {
						children: [
							n &&
								y &&
								(0, b.jsx)(Bl, {
									ref: E,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-before",
									onFocus: (R) => {
										R.relatedTarget !== D.current && ka(R, y) ? ta(C.current) : ta(b0());
									},
								}),
							n && (0, b.jsx)("span", { "aria-owns": y?.id, style: { position: "fixed" } }),
							n &&
								y &&
								(0, b.jsx)(Bl, {
									ref: D,
									"data-focus-trap": f.id,
									className: "__focus-trap-outer-after",
									onFocus: (R) => {
										if (ka(R, y)) ta(T.current);
										else {
											const N = ad();
											if (N === C.current) {
												requestAnimationFrame(() => {
													var Z;
													return (Z = ad()) == null ? void 0 : Z.focus();
												});
												return;
											}
											ta(N);
										}
									},
								}),
						],
					});
					return (p && n && (M = (0, eo.createPortal)(M, p)), (0, b.jsxs)(b.Fragment, { children: [M, A] }));
				},
				[y, v, o, f.id, n, p],
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
	const a = (0, w.useContext)(A0),
		u = Math.max(Math.min(e || a + 1, 6), 1);
	return (0, b.jsx)(A0.Provider, { value: u, children: n });
}
var D2 = "div",
	$p = Le(function ({ autoFocusOnShow: n = !0, ...a }) {
		return ((a = Pt(a, (u) => (0, b.jsx)(kp.Provider, { value: n, children: u }), [n])), a);
	}),
	Vk = De(function (n) {
		return Ue(D2, $p(n));
	});
function j2(e, n) {
	const a = it(e).createElement("button");
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
function vs(e, n, a) {
	sd.has(e) || sd.set(e, new Map());
	const u = sd.get(e),
		l = u.get(n);
	if (!l)
		return (
			u.set(n, a()),
			() => {
				var h;
				((h = u.get(n)) == null || h(), u.delete(n));
			}
		);
	const o = a(),
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
function oh(e, n, a) {
	return vs(e, n, () => {
		const l = e.getAttribute(n);
		return (
			e.setAttribute(n, a),
			() => {
				l == null ? e.removeAttribute(n) : e.setAttribute(n, l);
			}
		);
	});
}
function $a(e, n, a) {
	return vs(e, n, () => {
		const l = n in e,
			o = e[n];
		return (
			(e[n] = a),
			() => {
				l ? (e[n] = o) : delete e[n];
			}
		);
	});
}
function Ad(e, n) {
	return e
		? vs(e, "style", () => {
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
function U2(e, n, a) {
	return e
		? vs(e, n, () => {
				const l = e.style.getPropertyValue(n);
				return (
					e.style.setProperty(n, a),
					() => {
						l ? e.style.setProperty(n, l) : e.style.removeProperty(n);
					}
				);
			})
		: () => {};
}
var I2 = ["SCRIPT", "STYLE"];
function Rd(e) {
	return `__ariakit-dialog-snapshot-${e}`;
}
function L2(e, n) {
	const a = it(n),
		u = Rd(e);
	if (!a.body[u]) return !0;
	do {
		if (n === a.body) return !1;
		if (n[u]) return !0;
		if (!n.parentElement) return !1;
		n = n.parentElement;
	} while (!0);
}
function $2(e, n, a) {
	return I2.includes(n.tagName) || !L2(e, n) ? !1 : !a.some((u) => u && Tt(n, u));
}
function ch(e, n, a, u) {
	for (let l of n) {
		if (!l?.isConnected) continue;
		const o = n.some((m) => (!m || m === l ? !1 : m.contains(l))),
			f = it(l),
			h = l;
		for (; l.parentElement && l !== f.body; ) {
			if ((u?.(l.parentElement, h), !o)) for (const m of l.parentElement.children) $2(e, m, n) && a(m, h);
			l = l.parentElement;
		}
	}
}
function B2(e, n) {
	const { body: a } = it(n[0]),
		u = [];
	return (
		ch(e, n, (o) => {
			u.push($a(o, Rd(e), !0));
		}),
		on($a(a, Rd(e), !0), () => {
			for (const o of u) o();
		})
	);
}
function Bp(e, ...n) {
	if (!e) return !1;
	const a = e.getAttribute("data-backdrop");
	return a == null ? !1 : a === "" || a === "true" || !n.length ? !0 : n.some((u) => a === u);
}
function Vr(e = "", n = !1) {
	return `__ariakit-dialog-${n ? "ancestor" : "outside"}${e ? `-${e}` : ""}`;
}
function V2(e, n = "") {
	return on($a(e, Vr(), !0), $a(e, Vr(n), !0));
}
function Vp(e, n = "") {
	return on($a(e, Vr("", !0), !0), $a(e, Vr(n, !0), !0));
}
function fh(e, n) {
	const a = Vr(n, !0);
	if (e[a]) return !0;
	const u = Vr(n);
	do {
		if (e[u]) return !0;
		if (!e.parentElement) return !1;
		e = e.parentElement;
	} while (!0);
}
function R0(e, n) {
	const a = [],
		u = n.map((o) => o?.id);
	return (
		ch(
			e,
			n,
			(o) => {
				Bp(o, ...u) || a.unshift(V2(o, e));
			},
			(o, f) => {
				(f.hasAttribute("data-dialog") && f.id !== e) || a.unshift(Vp(o, e));
			},
		),
		() => {
			for (const o of a) o();
		}
	);
}
function H2(e) {
	return e.tagName === "HTML" ? !0 : Tt(it(e).body, e);
}
function Z2(e, n) {
	if (!e) return !1;
	if (Tt(e, n)) return !0;
	const a = n.getAttribute("aria-activedescendant");
	if (a) {
		const u = it(e).getElementById(a);
		if (u) return Tt(e, u);
	}
	return !1;
}
function Q2(e, n) {
	if (!("clientY" in e)) return !1;
	const a = n.getBoundingClientRect();
	return a.width === 0 || a.height === 0
		? !1
		: a.top <= e.clientY && e.clientY <= a.top + a.height && a.left <= e.clientX && e.clientX <= a.left + a.width;
}
function ld({ store: e, type: n, listener: a, capture: u, domReady: l }) {
	const o = _e(a),
		f = Ct(e, "open"),
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
									p = v.target;
								y &&
									p &&
									H2(p) &&
									(Tt(y, p) ||
										Z2(_, p) ||
										p.hasAttribute("data-focus-trap") ||
										Q2(v, y) ||
										(h.current && !fh(p, y.id)) ||
										o2(p) ||
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
function P2(e, n, a) {
	const u = q2(Ct(e, "open")),
		l = { store: e, domReady: a, capture: !0 };
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
		[a, u] = (0, w.useState)([]),
		l = (0, w.useCallback)(
			(f) => {
				var h;
				return (
					u((m) => [...m, f]),
					on((h = n.add) == null ? void 0 : h.call(n, f), () => {
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
		wrapElement: (0, w.useCallback)((f) => (0, b.jsx)(O0.Provider, { value: o, children: f }), [o]),
		nestedDialogs: a,
	};
}
function F2({ attribute: e, contentId: n, contentElement: a, enabled: u }) {
	const [l, o] = xp(),
		f = (0, w.useCallback)(() => {
			if (!u || !a) return !1;
			const { body: h } = it(a),
				m = h.getAttribute(e);
			return !m || m === n;
		}, [l, u, a, e, n]);
	return (
		(0, w.useEffect)(() => {
			if (!u || !n || !a) return;
			const { body: h } = it(a);
			if (f()) return (h.setAttribute(e, n), () => h.removeAttribute(e));
			const m = new MutationObserver(() => (0, eo.flushSync)(o));
			return (m.observe(h, { attributeFilter: [e] }), () => m.disconnect());
		}, [l, u, n, a, f, e]),
		f
	);
}
function K2(e) {
	const n = e.getBoundingClientRect().left;
	return Math.round(n) + e.scrollLeft ? "paddingLeft" : "paddingRight";
}
function G2(e, n, a) {
	const u = F2({ attribute: "data-dialog-prevent-body-scroll", contentElement: e, contentId: n, enabled: a });
	(0, w.useEffect)(() => {
		if (!u() || !e) return;
		const l = it(e),
			o = hp(e),
			{ documentElement: f, body: h } = l,
			m = f.style.getPropertyValue("--scrollbar-width"),
			v = m ? Number.parseInt(m, 10) : o.innerWidth - f.clientWidth,
			y = () => U2(f, "--scrollbar-width", `${v}px`),
			_ = K2(f),
			p = () => Ad(h, { overflow: "hidden", [_]: `${v}px` }),
			S = () => {
				var C, T;
				const { scrollX: D, scrollY: A, visualViewport: M } = o,
					R = (C = M?.offsetLeft) != null ? C : 0,
					N = (T = M?.offsetTop) != null ? T : 0,
					Z = Ad(h, {
						position: "fixed",
						overflow: "hidden",
						top: `${-(A - Math.floor(N))}px`,
						left: `${-(D - Math.floor(R))}px`,
						right: "0",
						[_]: `${v}px`,
					});
				return () => {
					(Z(), o.scrollTo({ left: D, top: A, behavior: "instant" }));
				};
			},
			E = Yd() && !oO();
		return on(y(), E ? S() : p());
	}, [u, e]);
}
function X2(e, ...n) {
	if (!e) return !1;
	const a = e.getAttribute("data-focus-trap");
	return a == null ? !1 : n.length ? (a === "" ? !1 : n.some((u) => a === u)) : !0;
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
			? $a(e, "inert", !0)
			: on(
					...Ao(e, !0).map((a) => {
						if (n?.some((l) => l && Tt(l, a))) return Qu;
						const u = vs(
							a,
							"focus",
							() => (
								(a.focus = Qu),
								() => {
									delete a.focus;
								}
							),
						);
						return on(oh(a, "tabindex", "-1"), u);
					}),
					J2(e),
					Ad(e, { pointerEvents: "none", userSelect: "none", cursor: "default" }),
				)
		: Qu;
}
function W2(e, n) {
	const a = [],
		u = n.map((o) => o?.id);
	return (
		ch(
			e,
			n,
			(o) => {
				Bp(o, ...u) || X2(o, ...u) || a.unshift(Zp(o, n));
			},
			(o) => {
				o.hasAttribute("role") && (n.some((f) => f && Tt(f, o)) || a.unshift(oh(o, "role", "none")));
			},
		),
		() => {
			for (const o of a) o();
		}
	);
}
function Qp(e = {}) {
	const n = xo(e.store, ah(e.disclosure, ["contentElement", "disclosureElement"]));
	const a = n?.getState(),
		u = xe(e.open, a?.open, e.defaultOpen, !1),
		l = xe(e.animated, a?.animated, !1),
		o = Vn(
			{
				open: u,
				animated: l,
				animating: !!l && u,
				mounted: u,
				contentElement: xe(a?.contentElement, null),
				disclosureElement: xe(a?.disclosureElement, null),
			},
			n,
		);
	return (
		Xt(o, () =>
			Ft(o, ["animated", "animating"], (f) => {
				f.animated || o.setState("animating", !1);
			}),
		),
		Xt(o, () =>
			ih(o, ["open"], () => {
				o.getState().animated && o.setState("animating", !0);
			}),
		),
		Xt(o, () =>
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
function Pp(e, n, a) {
	return (
		Yr(n, [a.store, a.disclosure]),
		mt(e, a, "open", "setOpen"),
		mt(e, a, "mounted", "setMounted"),
		mt(e, a, "animated"),
		Object.assign(e, { disclosure: a.disclosure })
	);
}
function eN(e = {}) {
	const [n, a] = Eo(Qp, e);
	return Pp(n, a, e);
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
function iN({ store: e, backdrop: n, alwaysVisible: a, hidden: u }) {
	const l = (0, w.useRef)(null),
		o = eN({ disclosure: e }),
		f = Ct(e, "contentElement");
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
	const h = rh({
		ref: l,
		store: o,
		role: "presentation",
		"data-backdrop": f?.id || "",
		alwaysVisible: a,
		hidden: u ?? void 0,
		style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0 },
	});
	if (!n) return null;
	if ((0, w.isValidElement)(n)) return (0, b.jsx)(to, { ...h, render: n });
	const m = typeof n != "boolean" ? n : "div";
	return (0, b.jsx)(to, { ...h, render: (0, b.jsx)(m, {}) });
}
function Yp(e = {}) {
	return Qp(e);
}
function Fp(e, n, a) {
	return Pp(e, n, a);
}
function aN(e = {}) {
	const [n, a] = Eo(Yp, e);
	return Fp(n, a, e);
}
var rN = "div",
	N0 = vo();
function uN(e) {
	const n = Oi();
	return !n || (e && Tt(e, n)) ? !1 : !!$n(n);
}
function M0(e, n = !1) {
	if (!e) return null;
	const a = "current" in e ? e.current : e;
	return a ? (n ? ($n(a) ? a : null) : a) : null;
}
var Kp = Le(function ({
	store: n,
	open: a,
	onClose: u,
	focusable: l = !0,
	modal: o = !0,
	portal: f = !!o,
	backdrop: h = !!o,
	hideOnEscape: m = !0,
	hideOnInteractOutside: v = !0,
	getPersistentElements: y,
	preventBodyScroll: _ = !!o,
	autoFocusOnShow: p = !0,
	autoFocusOnHide: S = !0,
	initialFocus: E,
	finalFocus: C,
	unmountOnHide: T,
	unstable_treeSnapshotKey: D,
	...A
}) {
	const M = po(),
		R = (0, w.useRef)(null),
		N = aN({
			store: n || M,
			open: a,
			setOpen(de) {
				if (de) return;
				const Te = R.current;
				if (!Te) return;
				const We = new Event("close", { bubbles: !1, cancelable: !0 });
				(u && Te.addEventListener("close", u, { once: !0 }),
					Te.dispatchEvent(We),
					We.defaultPrevented && N.setOpen(!0));
			},
		}),
		{ portalRef: Z, domReady: U } = Kd(f, A.portalRef),
		j = A.preserveTabOrder,
		I = Ct(N, (de) => j && !o && de.mounted),
		L = Ni(A.id),
		$ = Ct(N, "open"),
		te = Ct(N, "mounted"),
		ne = Ct(N, "contentElement"),
		K = Co(te, A.hidden, A.alwaysVisible);
	(G2(ne, L, _ && !K), P2(N, v, U));
	const { wrapElement: ie, nestedDialogs: k } = Y2(N);
	((A = Pt(A, ie, [ie])),
		He(() => {
			if (!$) return;
			const de = R.current,
				Te = Oi(de, !0);
			Te && Te.tagName !== "BODY" && ((de && Tt(de, Te)) || N.setDisclosureElement(Te));
		}, [N, $]),
		N0 &&
			(0, w.useEffect)(() => {
				if (!te) return;
				const { disclosureElement: de } = N.getState();
				if (!de || !ra(de)) return;
				const Te = () => {
					let We = !1;
					const Ie = () => {
						We = !0;
					};
					(de.addEventListener("focusin", Ie, { capture: !0, once: !0 }),
						Ur(de, "mouseup", () => {
							(de.removeEventListener("focusin", Ie, !0), !We && Dp(de));
						}));
				};
				return (
					de.addEventListener("mousedown", Te),
					() => {
						de.removeEventListener("mousedown", Te);
					}
				);
			}, [N, te]),
		(0, w.useEffect)(() => {
			if (!te || !U) return;
			const de = R.current;
			if (!de) return;
			const Te = hp(de),
				We = Te.visualViewport || Te,
				Ie = () => {
					var Ot, Nt;
					const re = (Nt = (Ot = Te.visualViewport) == null ? void 0 : Ot.height) != null ? Nt : Te.innerHeight;
					de.style.setProperty("--dialog-viewport-height", `${re}px`);
				};
			return (
				Ie(),
				We.addEventListener("resize", Ie),
				() => {
					We.removeEventListener("resize", Ie);
				}
			);
		}, [te, U]),
		(0, w.useEffect)(() => {
			if (!o || !te || !U) return;
			const de = R.current;
			if (de && !de.querySelector("[data-dialog-dismiss]")) return j2(de, N.hide);
		}, [N, o, te, U]),
		He(() => {
			if (!Hp() || $ || !te || !U) return;
			const de = R.current;
			if (de) return Zp(de);
		}, [$, te, U]));
	const H = $ && U;
	He(() => {
		if (!L || !H) return;
		const de = R.current;
		return B2(L, [de]);
	}, [L, H, D]);
	const B = _e(y);
	He(() => {
		if (!L || !H) return;
		const { disclosureElement: de } = N.getState(),
			Te = [R.current, ...(B() || []), ...k.map((We) => We.getState().contentElement)];
		return o ? on(R0(L, Te), W2(L, Te)) : R0(L, [de, ...Te]);
	}, [L, N, H, B, k, o, D]);
	const ue = !!p,
		fe = rt(p),
		[we, O] = (0, w.useState)(!1);
	(0, w.useEffect)(() => {
		if (!$ || !ue || !U || !ne?.isConnected) return;
		const de = M0(E, !0) || ne.querySelector("[data-autofocus=true],[autofocus]") || WO(ne, !0, f && I) || ne,
			Te = $n(de);
		fe(Te ? de : null) &&
			(O(!0),
			queueMicrotask(() => {
				(de.focus(), N0 && Te && de.scrollIntoView({ block: "nearest", inline: "nearest" }));
			}));
	}, [$, ue, U, ne, E, f, I, fe]);
	const G = !!S,
		ae = rt(S),
		[se, ve] = (0, w.useState)(!1);
	(0, w.useEffect)(() => {
		if ($) return (ve(!0), () => ve(!1));
	}, [$]);
	const ge = (0, w.useCallback)(
			(de, Te = !0) => {
				const { disclosureElement: We } = N.getState();
				if (uN(de)) return;
				let Ie = M0(C) || We;
				if (Ie?.id) {
					const Nt = it(Ie),
						re = `[aria-activedescendant="${Ie.id}"]`,
						Re = Nt.querySelector(re);
					Re && (Ie = Re);
				}
				if (Ie && !$n(Ie)) {
					const Nt = Ie.closest("[data-dialog]");
					if (Nt?.id) {
						const re = it(Nt),
							Re = `[aria-controls~="${Nt.id}"]`,
							ft = re.querySelector(Re);
						ft && (Ie = ft);
					}
				}
				const Ot = Ie && $n(Ie);
				if (!Ot && Te) {
					requestAnimationFrame(() => ge(de, !1));
					return;
				}
				ae(Ot ? Ie : null) && Ot && Ie?.focus({ preventScroll: !0 });
			},
			[N, C, ae],
		),
		pe = (0, w.useRef)(!1);
	(He(() => {
		if ($ || !se || !G) return;
		const de = R.current;
		((pe.current = !0), ge(de));
	}, [$, se, U, G, ge]),
		(0, w.useEffect)(() => {
			if (!se || !G) return;
			const de = R.current;
			return () => {
				if (pe.current) {
					pe.current = !1;
					return;
				}
				ge(de);
			};
		}, [se, G, ge]));
	const Ze = rt(m);
	((0, w.useEffect)(
		() =>
			!U || !te
				? void 0
				: Qt(
						"keydown",
						(Te) => {
							if (Te.key !== "Escape" || Te.defaultPrevented) return;
							const We = R.current;
							if (!We || fh(We)) return;
							const Ie = Te.target;
							if (!Ie) return;
							const { disclosureElement: Ot } = N.getState();
							!!(Ie.tagName === "BODY" || Tt(We, Ie) || !Ot || Tt(Ot, Ie)) && Ze(Te) && N.hide();
						},
						!0,
					),
		[N, U, te, Ze],
	),
		(A = Pt(A, (de) => (0, b.jsx)(k2, { level: o ? 1 : void 0, children: de }), [o])));
	const Oe = A.hidden,
		st = A.alwaysVisible;
	A = Pt(
		A,
		(de) =>
			h
				? (0, b.jsxs)(b.Fragment, {
						children: [(0, b.jsx)(iN, { store: N, backdrop: h, hidden: Oe, alwaysVisible: st }), de],
					})
				: de,
		[N, h, Oe, st],
	);
	const [Dt, It] = (0, w.useState)(),
		[dn, jt] = (0, w.useState)();
	return (
		(A = Pt(
			A,
			(de) =>
				(0, b.jsx)(Wd, {
					value: N,
					children: (0, b.jsx)(OO.Provider, {
						value: It,
						children: (0, b.jsx)(NO.Provider, { value: jt, children: de }),
					}),
				}),
			[N],
		)),
		(A = {
			id: L,
			"data-dialog": "",
			role: "dialog",
			tabIndex: l ? -1 : void 0,
			"aria-labelledby": Dt,
			"aria-describedby": dn,
			...A,
			ref: gt(R, A.ref),
		}),
		(A = $p({ ...A, autoFocusOnShow: we })),
		(A = rh({ store: N, ...A })),
		(A = ms({ ...A, focusable: l })),
		(A = Lp({ portal: f, ...A, portalRef: Z, preserveTabOrder: I })),
		A
	);
});
function gs(e, n = po) {
	return De(function (u) {
		const l = n();
		return Ct(u.store || l, (o) => !u.unmountOnHide || o?.mounted || !!u.open) ? (0, b.jsx)(e, { ...u }) : null;
	});
}
var Zk = gs(
		De(function (n) {
			return Ue(rN, Kp(n));
		}),
		po,
	),
	ua = Math.min,
	Ti = Math.max,
	no = Math.round,
	Vl = Math.floor,
	Ai = (e) => ({ x: e, y: e }),
	sN = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Gp(e, n, a) {
	return Ti(e, ua(n, a));
}
function sa(e, n) {
	return typeof e == "function" ? e(n) : e;
}
function la(e) {
	return e.split("-")[0];
}
function Fr(e) {
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
function lN(e, n, a) {
	a === void 0 && (a = !1);
	const u = Fr(e),
		l = mh(e),
		o = hh(l);
	let f = l === "x" ? (u === (a ? "end" : "start") ? "right" : "left") : u === "start" ? "bottom" : "top";
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
function dN(e, n, a) {
	switch (e) {
		case "top":
		case "bottom":
			return a ? (n ? k0 : z0) : n ? z0 : k0;
		case "left":
		case "right":
			return n ? cN : fN;
		default:
			return [];
	}
}
function hN(e, n, a, u) {
	const l = Fr(e);
	let o = dN(la(e), a === "start", u);
	return (l && ((o = o.map((f) => f + "-" + l)), n && (o = o.concat(o.map(Od)))), o);
}
function io(e) {
	const n = la(e);
	return sN[n] + e.slice(n.length);
}
function mN(e) {
	var n, a, u, l;
	return {
		top: (n = e.top) != null ? n : 0,
		right: (a = e.right) != null ? a : 0,
		bottom: (u = e.bottom) != null ? u : 0,
		left: (l = e.left) != null ? l : 0,
	};
}
function Xp(e) {
	return typeof e != "number" ? mN(e) : { top: e, right: e, bottom: e, left: e };
}
function ao(e) {
	const { x: n, y: a, width: u, height: l } = e;
	return { width: u, height: l, top: a, left: n, right: n + u, bottom: a + l, x: n, y: a };
}
function D0(e, n, a) {
	let { reference: u, floating: l } = e;
	const o = Kn(n),
		f = mh(n),
		h = hh(f),
		m = la(n),
		v = o === "y",
		y = u.x + u.width / 2 - l.width / 2,
		_ = u.y + u.height / 2 - l.height / 2,
		p = u[h] / 2 - l[h] / 2;
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
	const E = Fr(n);
	return (E && (S[f] += p * (E === "end" ? 1 : -1) * (a && v ? -1 : 1)), S);
}
async function vN(e, n) {
	var a;
	n === void 0 && (n = {});
	const { x: u, y: l, platform: o, rects: f, elements: h, strategy: m } = e,
		{
			boundary: v = "clippingAncestors",
			rootBoundary: y = "viewport",
			elementContext: _ = "floating",
			altBoundary: p = !1,
			padding: S = 0,
		} = sa(n, e),
		E = Xp(S),
		C = h[p ? (_ === "floating" ? "reference" : "floating") : _],
		T = ao(
			await o.getClippingRect({
				element:
					(a = await (o.isElement == null ? void 0 : o.isElement(C))) == null || a
						? C
						: C.contextElement || (await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(h.floating))),
				boundary: v,
				rootBoundary: y,
				strategy: m,
			}),
		),
		D = _ === "floating" ? { x: u, y: l, width: f.floating.width, height: f.floating.height } : f.reference,
		A = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(h.floating)),
		M = ((await (o.isElement == null ? void 0 : o.isElement(A))) &&
			(await (o.getScale == null ? void 0 : o.getScale(A)))) || { x: 1, y: 1 },
		R = ao(
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
		top: (T.top - R.top + E.top) / M.y,
		bottom: (R.bottom - T.bottom + E.bottom) / M.y,
		left: (T.left - R.left + E.left) / M.x,
		right: (R.right - T.right + E.right) / M.x,
	};
}
var gN = 50,
	yN = async (e, n, a) => {
		const { placement: u = "bottom", strategy: l = "absolute", middleware: o = [], platform: f } = a,
			h = f.detectOverflow ? f : { ...f, detectOverflow: vN },
			m = await (f.isRTL == null ? void 0 : f.isRTL(n));
		let v = await f.getElementRects({ reference: e, floating: n, strategy: l }),
			{ x: y, y: _ } = D0(v, u, m),
			p = u,
			S = 0;
		const E = {};
		for (let C = 0; C < o.length; C++) {
			const T = o[C];
			if (!T) continue;
			const { name: D, fn: A } = T,
				{
					x: M,
					y: R,
					data: N,
					reset: Z,
				} = await A({
					x: y,
					y: _,
					initialPlacement: u,
					placement: p,
					strategy: l,
					middlewareData: E,
					rects: v,
					platform: h,
					elements: { reference: e, floating: n },
				});
			((y = M ?? y),
				(_ = R ?? _),
				(E[D] = { ...E[D], ...N }),
				Z &&
					S < gN &&
					(S++,
					typeof Z == "object" &&
						(Z.placement && (p = Z.placement),
						Z.rects &&
							(v = Z.rects === !0 ? await f.getElementRects({ reference: e, floating: n, strategy: l }) : Z.rects),
						({ x: y, y: _ } = D0(v, p, m))),
					(C = -1)));
		}
		return { x: y, y: _, placement: p, strategy: l, middlewareData: E };
	},
	bN = (e) => ({
		name: "arrow",
		options: e,
		async fn(n) {
			const { x: a, y: u, placement: l, rects: o, platform: f, elements: h, middlewareData: m } = n,
				{ element: v, padding: y = 0 } = sa(e, n) || {};
			if (v == null) return {};
			const _ = Xp(y),
				p = { x: a, y: u },
				S = mh(l),
				E = hh(S),
				C = await f.getDimensions(v),
				T = S === "y",
				D = T ? "top" : "left",
				A = T ? "bottom" : "right",
				M = T ? "clientHeight" : "clientWidth",
				R = o.reference[E] + o.reference[S] - p[S] - o.floating[E],
				N = p[S] - o.reference[S],
				Z = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(v));
			let U = Z ? Z[M] : 0;
			(!U || !(await (f.isElement == null ? void 0 : f.isElement(Z)))) && (U = h.floating[M] || o.floating[E]);
			const j = R / 2 - N / 2,
				I = U / 2 - C[E] / 2 - 1,
				L = ua(_[D], I),
				$ = ua(_[A], I),
				te = U - C[E] - $,
				ne = U / 2 - C[E] / 2 + j,
				K = Gp(L, ne, te),
				ie = !m.arrow && Fr(l) != null && ne !== K && o.reference[E] / 2 - (ne < L ? L : $) - C[E] / 2 < 0,
				k = ie ? (ne < L ? ne - L : ne - te) : 0;
			return {
				[S]: p[S] + k,
				data: { [S]: K, centerOffset: ne - K - k, ...(ie && { alignmentOffset: k }) },
				reset: ie,
			};
		},
	}),
	pN = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: "flip",
				options: e,
				async fn(n) {
					var a, u;
					const { placement: l, middlewareData: o, rects: f, initialPlacement: h, platform: m, elements: v } = n,
						{
							mainAxis: y = !0,
							crossAxis: _ = !0,
							fallbackPlacements: p,
							fallbackStrategy: S = "bestFit",
							fallbackAxisSideDirection: E = "none",
							flipAlignment: C = !0,
							...T
						} = sa(e, n);
					if ((a = o.arrow) != null && a.alignmentOffset) return {};
					const D = la(l),
						A = Kn(h),
						M = la(h) === h,
						R = await (m.isRTL == null ? void 0 : m.isRTL(v.floating)),
						N = p || (M || !C ? [io(h)] : oN(h)),
						Z = E !== "none";
					!p && Z && N.push(...hN(h, C, E, R));
					const U = [h, ...N],
						j = await m.detectOverflow(n, T),
						I = [];
					let L = ((u = o.flip) == null ? void 0 : u.overflows) || [];
					if ((y && I.push(j[D]), _)) {
						const K = lN(l, f, R);
						I.push(j[K[0]], j[K[1]]);
					}
					if (((L = [...L, { placement: l, overflows: I }]), !I.every((K) => K <= 0))) {
						var $, te;
						const K = ((($ = o.flip) == null ? void 0 : $.index) || 0) + 1,
							ie = U[K];
						if (
							ie &&
							(!(_ === "alignment" && A !== Kn(ie)) ||
								L.every((H) => (Kn(H.placement) === A ? H.overflows[0] > 0 : !0)))
						)
							return { data: { index: K, overflows: L }, reset: { placement: ie } };
						let k =
							(te = L.filter((H) => H.overflows[0] <= 0).sort((H, B) => H.overflows[1] - B.overflows[1])[0]) == null
								? void 0
								: te.placement;
						if (!k)
							switch (S) {
								case "bestFit": {
									var ne;
									const H =
										(ne = L.filter((B) => {
											if (Z) {
												const ue = Kn(B.placement);
												return ue === A || ue === "y";
											}
											return !0;
										})
											.map((B) => [B.placement, B.overflows.filter((ue) => ue > 0).reduce((ue, fe) => ue + fe, 0)])
											.sort((B, ue) => B[1] - ue[1])[0]) == null
											? void 0
											: ne[0];
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
	const { placement: a, platform: u, elements: l } = e,
		o = await (u.isRTL == null ? void 0 : u.isRTL(l.floating)),
		f = la(a),
		h = Fr(a),
		m = Kn(a) === "y",
		v = Jp.has(f) ? -1 : 1,
		y = o && m ? -1 : 1,
		_ = sa(n, e);
	let {
		mainAxis: p,
		crossAxis: S,
		alignmentAxis: E,
	} = typeof _ == "number"
		? { mainAxis: _, crossAxis: 0, alignmentAxis: null }
		: { mainAxis: _.mainAxis || 0, crossAxis: _.crossAxis || 0, alignmentAxis: _.alignmentAxis };
	return (
		h && typeof E == "number" && (S = h === "end" ? E * -1 : E),
		m ? { x: S * y, y: p * v } : { x: p * v, y: S * y }
	);
}
var wN = function (e) {
		return (
			e === void 0 && (e = 0),
			{
				name: "offset",
				options: e,
				async fn(n) {
					var a, u;
					const { x: l, y: o, placement: f, middlewareData: h } = n,
						m = await SN(n, e);
					return f === ((a = h.offset) == null ? void 0 : a.placement) && (u = h.arrow) != null && u.alignmentOffset
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
					const { x: a, y: u, placement: l, platform: o } = n,
						{
							mainAxis: f = !0,
							crossAxis: h = !1,
							limiter: m = {
								fn: (A) => {
									let { x: M, y: R } = A;
									return { x: M, y: R };
								},
							},
							...v
						} = sa(e, n),
						y = { x: a, y: u },
						_ = await o.detectOverflow(n, v),
						p = Kn(l),
						S = dh(p);
					let E = y[S],
						C = y[p];
					const T = (A, M) => Gp(M + _[A === "y" ? "top" : "left"], M, M - _[A === "y" ? "bottom" : "right"]);
					(f && (E = T(S, E)), h && (C = T(p, C)));
					const D = m.fn({ ...n, [S]: E, [p]: C });
					return { ...D, data: { x: D.x - a, y: D.y - u, enabled: { [S]: f, [p]: h } } };
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
					var a, u;
					const { x: l, y: o, placement: f, rects: h, middlewareData: m } = n,
						{ offset: v = 0, mainAxis: y = !0, crossAxis: _ = !0 } = sa(e, n),
						p = { x: l, y: o },
						S = Kn(f),
						E = dh(S);
					let C = p[E],
						T = p[S];
					const D = sa(v, n),
						A =
							typeof D == "number"
								? { mainAxis: D, crossAxis: 0 }
								: { mainAxis: (a = D.mainAxis) != null ? a : 0, crossAxis: (u = D.crossAxis) != null ? u : 0 };
					if (y) {
						const N = E === "y" ? "height" : "width",
							Z = h.reference[E] - h.floating[N] + A.mainAxis,
							U = h.reference[E] + h.reference[N] - A.mainAxis;
						C < Z ? (C = Z) : C > U && (C = U);
					}
					if (_) {
						var M, R;
						const N = E === "y" ? "width" : "height",
							Z = Jp.has(la(f)),
							U =
								h.reference[S] -
								h.floating[N] +
								((Z && ((M = m.offset) == null ? void 0 : M[S])) || 0) +
								(Z ? 0 : A.crossAxis),
							j =
								h.reference[S] +
								h.reference[N] +
								(Z ? 0 : ((R = m.offset) == null ? void 0 : R[S]) || 0) -
								(Z ? A.crossAxis : 0);
						T < U ? (T = U) : T > j && (T = j);
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
					const { placement: a, rects: u, platform: l, elements: o } = n,
						{ apply: f = () => {}, ...h } = sa(e, n),
						m = await l.detectOverflow(n, h),
						v = la(a),
						y = Fr(a),
						_ = Kn(a) === "y",
						{ width: p, height: S } = u.floating;
					let E, C;
					v === "top" || v === "bottom"
						? ((E = v),
							(C =
								y === ((await (l.isRTL == null ? void 0 : l.isRTL(o.floating))) ? "start" : "end") ? "left" : "right"))
						: ((C = v), (E = y === "end" ? "top" : "bottom"));
					const T = S - m.top - m.bottom,
						D = p - m.left - m.right,
						A = ua(S - m[E], T),
						M = ua(p - m[C], D),
						R = n.middlewareData.shift,
						N = !R;
					let Z = A,
						U = M;
					(R != null && R.enabled.x && (U = D),
						R != null && R.enabled.y && (Z = T),
						N && !y && (_ ? (U = p - 2 * Ti(m.left, m.right)) : (Z = S - 2 * Ti(m.top, m.bottom))),
						await f({ ...n, availableWidth: U, availableHeight: Z }));
					const j = await l.getDimensions(o.floating);
					return p !== j.width || S !== j.height ? { reset: { rects: !0 } } : {};
				},
			}
		);
	};
function Ro() {
	return typeof window < "u";
}
function Kr(e) {
	return Wp(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ln(e) {
	var n;
	return (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) || window;
}
function Mi(e) {
	var n;
	return (n = (Wp(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : n.documentElement;
}
function Wp(e) {
	return Ro() ? e instanceof Node || e instanceof ln(e).Node : !1;
}
function Gn(e) {
	return Ro() ? e instanceof Element || e instanceof ln(e).Element : !1;
}
function fa(e) {
	return Ro() ? e instanceof HTMLElement || e instanceof ln(e).HTMLElement : !1;
}
function j0(e) {
	return !Ro() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof ln(e).ShadowRoot;
}
function Oo(e) {
	const { overflow: n, overflowX: a, overflowY: u, display: l } = Xn(e);
	return /auto|scroll|overlay|hidden|clip/.test(n + u + a) && l !== "inline" && l !== "contents";
}
function CN(e) {
	return /^(table|td|th)$/.test(Kr(e));
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
	za = (e) => !!e && e !== "none",
	cd;
function vh(e) {
	const n = Gn(e) ? Xn(e) : e;
	return (
		za(n.transform) ||
		za(n.translate) ||
		za(n.scale) ||
		za(n.rotate) ||
		za(n.perspective) ||
		(!gh() && (za(n.backdropFilter) || za(n.filter))) ||
		TN.test(n.willChange || "") ||
		AN.test(n.contain || "")
	);
}
function RN(e) {
	let n = Ba(e);
	for (; fa(n) && !Wu(n); ) {
		if (vh(n)) return n;
		if (No(n)) return null;
		n = Ba(n);
	}
	return null;
}
function gh() {
	return (cd == null && (cd = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), cd);
}
function Wu(e) {
	return /^(html|body|#document)$/.test(Kr(e));
}
function Xn(e) {
	return ln(e).getComputedStyle(e);
}
function Mo(e) {
	return Gn(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Ba(e) {
	if (Kr(e) === "html") return e;
	const n = e.assignedSlot || e.parentNode || (j0(e) && e.host) || Mi(e);
	return j0(n) ? n.host : n;
}
function eS(e) {
	const n = Ba(e);
	return Wu(n) ? (e.ownerDocument || e).body : fa(n) && Oo(n) ? n : eS(n);
}
function es(e, n, a) {
	var u;
	(n === void 0 && (n = []), a === void 0 && (a = !0));
	const l = eS(e),
		o = l === ((u = e.ownerDocument) == null ? void 0 : u.body),
		f = ln(l);
	if (o) {
		const h = Nd(f);
		return n.concat(f, f.visualViewport || [], Oo(l) ? l : [], h && a ? es(h) : []);
	} else return n.concat(l, es(l, [], a));
}
function Nd(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function tS(e) {
	const n = Xn(e);
	let a = parseFloat(n.width) || 0,
		u = parseFloat(n.height) || 0;
	const l = fa(e),
		o = l ? e.offsetWidth : a,
		f = l ? e.offsetHeight : u,
		h = no(a) !== o || no(u) !== f;
	return (h && ((a = o), (u = f)), { width: a, height: u, $: h });
}
function yh(e) {
	return Gn(e) ? e : e.contextElement;
}
function Ir(e) {
	const n = yh(e);
	if (!fa(n)) return Ai(1);
	const a = n.getBoundingClientRect(),
		{ width: u, height: l, $: o } = tS(n);
	let f = (o ? no(a.width) : a.width) / u,
		h = (o ? no(a.height) : a.height) / l;
	return ((!f || !Number.isFinite(f)) && (f = 1), (!h || !Number.isFinite(h)) && (h = 1), { x: f, y: h });
}
var ON = Ai(0);
function nS(e) {
	const n = ln(e);
	return !gh() || !n.visualViewport ? ON : { x: n.visualViewport.offsetLeft, y: n.visualViewport.offsetTop };
}
function NN(e, n, a) {
	return (n === void 0 && (n = !1), !!a && n && a === ln(e));
}
function Va(e, n, a, u) {
	(n === void 0 && (n = !1), a === void 0 && (a = !1));
	const l = e.getBoundingClientRect(),
		o = yh(e);
	let f = Ai(1);
	n && (u ? Gn(u) && (f = Ir(u)) : (f = Ir(e)));
	const h = NN(o, a, u) ? nS(o) : Ai(0);
	let m = (l.left + h.x) / f.x,
		v = (l.top + h.y) / f.y,
		y = l.width / f.x,
		_ = l.height / f.y;
	if (o && u) {
		const p = ln(o),
			S = Gn(u) ? ln(u) : u;
		let E = p,
			C = Nd(E);
		for (; C && S !== E; ) {
			const T = Ir(C),
				D = C.getBoundingClientRect(),
				A = Xn(C),
				M = D.left + (C.clientLeft + parseFloat(A.paddingLeft)) * T.x,
				R = D.top + (C.clientTop + parseFloat(A.paddingTop)) * T.y;
			((m *= T.x), (v *= T.y), (y *= T.x), (_ *= T.y), (m += M), (v += R), (E = ln(C)), (C = Nd(E)));
		}
	}
	return ao({ width: y, height: _, x: m, y: v });
}
function zo(e, n) {
	const a = Mo(e).scrollLeft;
	return n ? n.left + a : Va(Mi(e)).left + a;
}
function iS(e, n) {
	const a = e.getBoundingClientRect();
	return { x: a.left + n.scrollLeft - zo(e, a), y: a.top + n.scrollTop };
}
function MN(e) {
	let { elements: n, rect: a, offsetParent: u, strategy: l } = e;
	const o = l === "fixed",
		f = Mi(u),
		h = n ? No(n.floating) : !1;
	if (u === f || (h && o)) return a;
	let m = { scrollLeft: 0, scrollTop: 0 },
		v = Ai(1);
	const y = Ai(0),
		_ = fa(u);
	if ((_ || !o) && ((Kr(u) !== "body" || Oo(f)) && (m = Mo(u)), _)) {
		const S = Va(u);
		((v = Ir(u)), (y.x = S.x + u.clientLeft), (y.y = S.y + u.clientTop));
	}
	const p = f && !_ && !o ? iS(f, m) : Ai(0);
	return {
		width: a.width * v.x,
		height: a.height * v.y,
		x: a.x * v.x - m.scrollLeft * v.x + y.x + p.x,
		y: a.y * v.y - m.scrollTop * v.y + y.y + p.y,
	};
}
function zN(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function kN(e) {
	const n = Mo(e),
		a = e.ownerDocument.body,
		u = Ti(e.scrollWidth, e.clientWidth, a.scrollWidth, a.clientWidth),
		l = Ti(e.scrollHeight, e.clientHeight, a.scrollHeight, a.clientHeight);
	let o = -n.scrollLeft + zo(e);
	const f = -n.scrollTop;
	return (
		Xn(a).direction === "rtl" && (o += Ti(e.clientWidth, a.clientWidth) - u),
		{ width: u, height: l, x: o, y: f }
	);
}
var DN = 25;
function jN(e, n, a) {
	a === void 0 && (a = "viewport");
	const u = a === "layoutViewport",
		l = ln(e),
		o = Mi(e),
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
			p = _.body,
			S = getComputedStyle(p),
			E = (_.compatMode === "CSS1Compat" && parseFloat(S.marginLeft) + parseFloat(S.marginRight)) || 0,
			C = Math.abs(o.clientWidth - p.clientWidth - E),
			T = getComputedStyle(o).scrollbarGutter === "stable both-edges" ? C / 2 : C;
		T <= DN && (h -= T);
	}
	return { width: h, height: m, x: v, y };
}
function qN(e, n) {
	const a = Va(e, !0, n === "fixed"),
		u = a.top + e.clientTop,
		l = a.left + e.clientLeft,
		o = Ir(e);
	return { width: e.clientWidth * o.x, height: e.clientHeight * o.y, x: l * o.x, y: u * o.y };
}
function q0(e, n, a) {
	let u;
	if (n === "viewport" || n === "layoutViewport") u = jN(e, a, n);
	else if (n === "document") u = kN(Mi(e));
	else if (Gn(n)) u = qN(n, a);
	else {
		const l = nS(e);
		u = { x: n.x - l.x, y: n.y - l.y, width: n.width, height: n.height };
	}
	return ao(u);
}
function UN(e, n) {
	const a = n.get(e);
	if (a) return a;
	let u = es(e, [], !1).filter((h) => Gn(h) && Kr(h) !== "body"),
		l = null;
	const o = Xn(e).position === "fixed";
	let f = o ? Ba(e) : e;
	for (; Gn(f) && !Wu(f); ) {
		const h = Xn(f),
			m = vh(f),
			v = l ? l.position : o ? "fixed" : "";
		(!m && (v === "fixed" || (v === "absolute" && h.position === "static")) ? (u = u.filter((y) => y !== f)) : (l = h),
			(f = Ba(f)));
	}
	return (n.set(e, u), u);
}
function IN(e) {
	let { element: n, boundary: a, rootBoundary: u, strategy: l } = e;
	const o = [...(a === "clippingAncestors" ? (No(n) ? [] : UN(n, this._c)) : [].concat(a)), u],
		f = q0(n, o[0], l);
	let h = f.top,
		m = f.right,
		v = f.bottom,
		y = f.left;
	for (let _ = 1; _ < o.length; _++) {
		const p = q0(n, o[_], l);
		((h = Ti(p.top, h)), (m = ua(p.right, m)), (v = ua(p.bottom, v)), (y = Ti(p.left, y)));
	}
	return { width: m - y, height: v - h, x: y, y: h };
}
function LN(e) {
	const { width: n, height: a } = tS(e);
	return { width: n, height: a };
}
function $N(e, n, a) {
	const u = fa(n),
		l = Mi(n),
		o = a === "fixed",
		f = Va(e, !0, o, n);
	let h = { scrollLeft: 0, scrollTop: 0 };
	const m = Ai(0);
	if ((u || !o) && ((Kr(n) !== "body" || Oo(l)) && (h = Mo(n)), u)) {
		const y = Va(n, !0, o, n);
		((m.x = y.x + n.clientLeft), (m.y = y.y + n.clientTop));
	}
	!u && l && (m.x = zo(l));
	const v = l && !u && !o ? iS(l, h) : Ai(0);
	return { x: f.left + h.scrollLeft - m.x - v.x, y: f.top + h.scrollTop - m.y - v.y, width: f.width, height: f.height };
}
function fd(e) {
	return Xn(e).position === "static";
}
function U0(e, n) {
	if (!fa(e) || Xn(e).position === "fixed") return null;
	if (n) return n(e);
	let a = e.offsetParent;
	return (Mi(e) === a && (a = a.ownerDocument.body), a);
}
function aS(e, n) {
	const a = ln(e);
	if (No(e)) return a;
	if (!fa(e)) {
		let l = Ba(e);
		for (; l && !Wu(l); ) {
			if (Gn(l) && !fd(l)) return l;
			l = Ba(l);
		}
		return a;
	}
	let u = U0(e, n);
	for (; u && CN(u) && fd(u); ) u = U0(u, n);
	return u && Wu(u) && fd(u) && !vh(u) ? a : u || RN(e) || a;
}
var BN = async function (e) {
	const n = this.getOffsetParent || aS,
		a = this.getDimensions,
		u = await a(e.floating);
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
	getDocumentElement: Mi,
	getClippingRect: IN,
	getOffsetParent: aS,
	getElementRects: BN,
	getClientRects: zN,
	getDimensions: LN,
	getScale: Ir,
	isElement: Gn,
	isRTL: VN,
};
function rS(e, n) {
	return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height;
}
function ZN(e, n, a) {
	let u = null,
		l;
	const o = Mi(e);
	function f() {
		var y;
		(clearTimeout(l), (y = u) == null || y.disconnect(), (u = null));
	}
	function h(y, _) {
		(y === void 0 && (y = !1), _ === void 0 && (_ = 1), f());
		const p = e.getBoundingClientRect(),
			{ left: S, top: E, width: C, height: T } = p;
		if ((y || n(), !C || !T)) return;
		const D = Vl(E),
			A = Vl(o.clientWidth - (S + C)),
			M = Vl(o.clientHeight - (E + T)),
			R = Vl(S),
			N = { rootMargin: -D + "px " + -A + "px " + -M + "px " + -R + "px", threshold: Ti(0, ua(1, _)) || 1 };
		let Z = !0;
		function U(j) {
			const I = j[0].intersectionRatio;
			if (!rS(p, e.getBoundingClientRect())) return h();
			if (I !== _) {
				if (!Z) return h();
				I
					? h(!1, I)
					: (l = setTimeout(() => {
							h(!1, 1e-7);
						}, 1e3));
			}
			Z = !1;
		}
		try {
			u = new IntersectionObserver(U, { ...N, root: o.ownerDocument });
		} catch {
			u = new IntersectionObserver(U, N);
		}
		u.observe(e);
	}
	const m = ln(e),
		v = () => h(a);
	return (
		m.addEventListener("resize", v),
		h(!0),
		() => {
			(m.removeEventListener("resize", v), f());
		}
	);
}
function QN(e, n, a, u) {
	u === void 0 && (u = {});
	const {
			ancestorScroll: l = !0,
			ancestorResize: o = !0,
			elementResize: f = typeof ResizeObserver == "function",
			layoutShift: h = typeof IntersectionObserver == "function",
			animationFrame: m = !1,
		} = u,
		v = yh(e),
		y = l || o ? [...(v ? es(v) : []), ...(n ? es(n) : [])] : [];
	y.forEach((D) => {
		(l && D.addEventListener("scroll", a), o && D.addEventListener("resize", a));
	});
	const _ = v && h ? ZN(v, a, o) : null;
	let p = -1,
		S = null;
	f &&
		((S = new ResizeObserver((D) => {
			let [A] = D;
			(A &&
				A.target === v &&
				S &&
				n &&
				(S.unobserve(n),
				cancelAnimationFrame(p),
				(p = requestAnimationFrame(() => {
					var M;
					(M = S) == null || M.observe(n);
				}))),
				a());
		})),
		v && !m && S.observe(v),
		n && S.observe(n));
	let E,
		C = m ? Va(e) : null;
	m && T();
	function T() {
		const D = Va(e);
		(C && !rS(C, D) && a(), (C = D), (E = requestAnimationFrame(T)));
	}
	return (
		a(),
		() => {
			var D;
			(y.forEach((A) => {
				(l && A.removeEventListener("scroll", a), o && A.removeEventListener("resize", a));
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
	JN = (e, n, a) => {
		const u = new Map(),
			l = a ?? {},
			o = { ...HN, ...l.platform, _c: u };
		return yN(e, n, { ...l, platform: o });
	},
	WN = "div";
function I0(e = 0, n = 0, a = 0, u = 0) {
	if (typeof DOMRect == "function") return new DOMRect(e, n, a, u);
	const l = { x: e, y: n, width: a, height: u, top: n, right: e + a, bottom: n + u, left: e };
	return { ...l, toJSON: () => l };
}
function eM(e) {
	if (!e) return I0();
	const { x: n, y: a, width: u, height: l } = e;
	return I0(n, a, u, l);
}
function tM(e, n) {
	return {
		contextElement: e || void 0,
		getBoundingClientRect: () => {
			const a = e,
				u = n?.(a);
			return u || !a ? eM(u) : a.getBoundingClientRect();
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
	return PN(({ placement: a }) => {
		var u;
		const l = (e?.clientHeight || 0) / 2,
			o = typeof n.gutter == "number" ? n.gutter + l : (u = n.gutter) != null ? u : l;
		return { crossAxis: a.split("-")[1] ? void 0 : n.shift, mainAxis: o, alignmentAxis: n.shift };
	});
}
function aM(e) {
	if (e.flip === !1) return;
	const n = typeof e.flip == "string" ? e.flip.split(" ") : void 0;
	return (vt(!n || n.every(nM), !1), FN({ padding: e.overflowPadding, fallbackPlacements: n }));
}
function rM(e) {
	if (!(!e.slide && !e.overlap))
		return YN({ mainAxis: e.slide, crossAxis: e.overlap, padding: e.overflowPadding, limiter: XN() });
}
function uM(e) {
	return KN({
		padding: e.overflowPadding,
		apply({ elements: n, availableWidth: a, availableHeight: u, rects: l }) {
			const o = n.floating,
				f = Math.round(l.reference.width);
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
function sM(e, n) {
	if (e) return GN({ element: e, padding: n.arrowPadding });
}
var bh = Le(function ({
		store: n,
		modal: a = !1,
		portal: u = !!a,
		preserveTabOrder: l = !0,
		autoFocusOnShow: o = !0,
		wrapperProps: f,
		fixed: h = !1,
		flip: m = !0,
		shift: v = 0,
		slide: y = !0,
		overlap: _ = !1,
		sameWidth: p = !1,
		fitViewport: S = !1,
		gutter: E,
		arrowPadding: C = 4,
		overflowPadding: T = 8,
		getAnchorRect: D,
		updatePosition: A,
		...M
	}) {
		const R = So();
		((n = n || R), vt(n, !1));
		const N = n.useState("arrowElement"),
			Z = n.useState("anchorElement"),
			U = n.useState("disclosureElement"),
			j = n.useState("popoverElement"),
			I = n.useState("contentElement"),
			L = n.useState("placement"),
			$ = n.useState("mounted"),
			te = n.useState("rendered"),
			ne = (0, w.useRef)(null),
			[K, ie] = (0, w.useState)(!1),
			{ portalRef: k, domReady: H } = Kd(u, M.portalRef),
			B = _e(D),
			ue = _e(A),
			fe = !!A;
		(He(() => {
			if (!j?.isConnected) return;
			j.style.setProperty("--popover-overflow-padding", `${T}px`);
			const O = tM(Z, B),
				G = async () => {
					if (!$) return;
					N || (ne.current = ne.current || document.createElement("div"));
					const ve = N || ne.current,
						ge = [
							iM(ve, { gutter: E, shift: v }),
							aM({ flip: m, overflowPadding: T }),
							rM({ slide: y, shift: v, overlap: _, overflowPadding: T }),
							sM(ve, { arrowPadding: C }),
							uM({ sameWidth: p, fitViewport: S, overflowPadding: T }),
						],
						pe = await JN(O, j, { placement: L, strategy: h ? "fixed" : "absolute", middleware: ge });
					(n?.setState("currentPlacement", pe.placement), ie(!0));
					const Ze = L0(pe.x),
						Oe = L0(pe.y);
					if (
						(Object.assign(j.style, { top: "0", left: "0", transform: `translate3d(${Ze}px,${Oe}px,0)` }),
						ve && pe.middlewareData.arrow)
					) {
						const { x: st, y: Dt } = pe.middlewareData.arrow,
							It = pe.placement.split("-")[0],
							dn = ve.clientWidth / 2,
							jt = ve.clientHeight / 2,
							de = st != null ? st + dn : -dn,
							Te = Dt != null ? Dt + jt : -jt;
						(j.style.setProperty(
							"--popover-transform-origin",
							{
								top: `${de}px calc(100% + ${jt}px)`,
								bottom: `${de}px ${-jt}px`,
								left: `calc(100% + ${dn}px) ${Te}px`,
								right: `${-dn}px ${Te}px`,
							}[It],
						),
							Object.assign(ve.style, {
								left: st != null ? `${st}px` : "",
								top: Dt != null ? `${Dt}px` : "",
								[It]: "100%",
							}));
					}
				},
				se = QN(
					O,
					j,
					async () => {
						fe ? (await ue({ updatePosition: G }), ie(!0)) : await G();
					},
					{ elementResize: typeof ResizeObserver == "function" },
				);
			return () => {
				(ie(!1), se());
			};
		}, [n, te, j, N, Z, j, L, $, H, h, m, v, y, _, p, S, E, C, T, B, fe, ue]),
			He(() => {
				if (!$ || !H || !j?.isConnected || !I?.isConnected) return;
				const O = () => {
					j.style.zIndex = getComputedStyle(I).zIndex;
				};
				O();
				let G = requestAnimationFrame(() => {
					G = requestAnimationFrame(O);
				});
				return () => cancelAnimationFrame(G);
			}, [$, H, j, I]));
		const we = h ? "fixed" : "absolute";
		return (
			(M = Pt(
				M,
				(O) =>
					(0, b.jsx)("div", {
						...f,
						style: { position: we, top: 0, left: 0, width: "max-content", ...f?.style },
						ref: n?.setPopoverElement,
						children: O,
					}),
				[n, we, f],
			)),
			(M = Pt(M, (O) => (0, b.jsx)(wo, { value: n, children: O }), [n])),
			(M = { "data-placing": !K || void 0, ...M, style: { position: "relative", ...M.style } }),
			(M = Kp({
				store: n,
				modal: a,
				portal: u,
				preserveTabOrder: l,
				preserveTabOrderAnchor: U || Z,
				autoFocusOnShow: K && o,
				...M,
				portalRef: k,
			})),
			M
		);
	}),
	Qk = gs(
		De(function (n) {
			return Ue(WN, bh(n));
		}),
		So,
	),
	lM = "div";
function uS(e, n, a, u) {
	return aa(n) ? !0 : e ? !!(Tt(n, e) || (a && Tt(a, e)) || u?.some((l) => uS(e, l, a))) : !1;
}
function oM({ store: e, ...n }) {
	const [a, u] = (0, w.useState)(!1),
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
		(n = { autoFocusOnHide: a, finalFocus: h, ...n, onFocus: f }),
		n
	);
}
var $0 = (0, w.createContext)(null),
	sS = Le(function ({
		store: n,
		modal: a = !1,
		portal: u = !!a,
		hideOnEscape: l = !0,
		hideOnHoverOutside: o = !0,
		disablePointerEventsOnApproach: f = !!o,
		...h
	}) {
		const m = eh();
		((n = n || m), vt(n, !1));
		const v = (0, w.useRef)(null),
			[y, _] = (0, w.useState)([]),
			p = (0, w.useRef)(0),
			S = (0, w.useRef)(null),
			{ portalRef: E, domReady: C } = Kd(u, h.portalRef),
			T = Gd(),
			D = !!o,
			A = rt(o),
			M = !!f,
			R = rt(f),
			N = n.useState("open"),
			Z = n.useState("mounted");
		((0, w.useEffect)(() => {
			if (!C || !Z || (!D && !M)) return;
			const $ = v.current;
			return $
				? on(
						Qt(
							"mousemove",
							(ne) => {
								if (!n || !T()) return;
								const { anchorElement: K, hideTimeout: ie, timeout: k } = n.getState(),
									H = S.current,
									[B] = ne.composedPath(),
									ue = K;
								if (uS(B, $, ue, y)) {
									((S.current = B && ue && Tt(ue, B) ? ud(ne) : null), window.clearTimeout(p.current), (p.current = 0));
									return;
								}
								if (!p.current) {
									if (H) {
										const fe = ud(ne);
										if (E0(fe, C0($, H))) {
											if (((S.current = fe), !R(ne))) return;
											(ne.preventDefault(), ne.stopPropagation());
											return;
										}
									}
									A(ne) &&
										(p.current = window.setTimeout(() => {
											((p.current = 0), n?.hide());
										}, ie ?? k));
								}
							},
							!0,
						),
						() => clearTimeout(p.current),
					)
				: void 0;
		}, [n, T, C, Z, D, M, y, R, A]),
			(0, w.useEffect)(() => {
				if (!C || !Z || !M) return;
				const $ = (te) => {
					const ne = v.current;
					if (!ne) return;
					const K = S.current;
					if (!K) return;
					const ie = C0(ne, K);
					if (E0(ud(te), ie)) {
						if (!R(te)) return;
						(te.preventDefault(), te.stopPropagation());
					}
				};
				return on(Qt("mouseenter", $, !0), Qt("mouseover", $, !0), Qt("mouseout", $, !0), Qt("mouseleave", $, !0));
			}, [C, Z, M, R]),
			(0, w.useEffect)(() => {
				C && (N || n?.setAutoFocusOnShow(!1));
			}, [n, C, N]));
		const U = wp(N);
		(0, w.useEffect)(() => {
			if (C)
				return () => {
					U.current || n?.setAutoFocusOnShow(!1);
				};
		}, [n, C]);
		const j = (0, w.useContext)($0);
		He(() => {
			if (a || !u || !Z || !C) return;
			const $ = v.current;
			if ($) return j?.($);
		}, [a, u, Z, C]);
		const I = (0, w.useCallback)(
			($) => {
				_((ne) => [...ne, $]);
				const te = j?.($);
				return () => {
					(_((ne) => ne.filter((K) => K !== $)), te?.());
				};
			},
			[j],
		);
		((h = Pt(h, ($) => (0, b.jsx)(Tp, { value: n, children: (0, b.jsx)($0.Provider, { value: I, children: $ }) }), [
			n,
			I,
		])),
			(h = { ...h, ref: gt(v, h.ref) }),
			(h = oM({ store: n, ...h })));
		const L = n.useState(($) => a || $.autoFocusOnShow);
		return (
			(h = bh({
				store: n,
				modal: a,
				portal: u,
				autoFocusOnShow: L,
				...h,
				portalRef: E,
				hideOnEscape($) {
					return ho(l, $)
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
	Pk = gs(
		De(function (n) {
			return Ue(lM, sS(n));
		}),
		eh,
	),
	cM = "div",
	fM = Le(function ({
		store: n,
		modal: a = !1,
		portal: u = !!a,
		hideOnEscape: l = !0,
		autoFocusOnShow: o = !0,
		hideOnHoverOutside: f,
		alwaysVisible: h,
		...m
	}) {
		const v = _o();
		((n = n || v), vt(n, !1));
		const y = (0, w.useRef)(null),
			_ = n.parent,
			p = n.menubar,
			S = !!_,
			E = !!p && !S;
		m = { ...m, ref: gt(y, m.ref) };
		const { "aria-labelledby": C, ...T } = Up({ store: n, alwaysVisible: h, ...m });
		m = T;
		const [D, A] = (0, w.useState)(),
			M = n.useState("autoFocusOnShow"),
			R = n.useState("initialFocus"),
			N = n.useState("baseElement"),
			Z = n.useState("renderedItems");
		(0, w.useEffect)(() => {
			let ne = !1;
			return (
				A((K) => {
					var ie, k, H;
					if (ne || !M) return;
					if ((ie = K?.current) != null && ie.isConnected) return K;
					const B = (0, w.createRef)();
					switch (R) {
						case "first":
							B.current = ((k = Z.find((ue) => !ue.disabled && ue.element)) == null ? void 0 : k.element) || null;
							break;
						case "last":
							B.current =
								((H = [...Z].reverse().find((ue) => !ue.disabled && ue.element)) == null ? void 0 : H.element) || null;
							break;
						default:
							B.current = N;
					}
					return B;
				}),
				() => {
					ne = !0;
				}
			);
		}, [n, M, R, Z, N]);
		const U = S ? !1 : a,
			j = !!o,
			I = !!D || !!m.initialFocus || !!U,
			L = Ct(n.combobox || n, "contentElement"),
			$ = Ct(_?.combobox || _, "contentElement"),
			te = (0, w.useMemo)(() => {
				if (!$ || !L) return;
				const ne = L.getAttribute("role"),
					K = $.getAttribute("role");
				if (!((K === "menu" || K === "menubar") && ne === "menu")) return $;
			}, [L, $]);
		return (
			te !== void 0 && (m = { preserveTabOrderAnchor: te, ...m }),
			(m = sS({
				store: n,
				alwaysVisible: h,
				initialFocus: D,
				autoFocusOnShow: j ? I && o : M || !!U,
				...m,
				hideOnEscape(ne) {
					return ho(l, ne) ? !1 : (n?.hideAll(), !0);
				},
				hideOnHoverOutside(ne) {
					const K = n?.getState().disclosureElement;
					return (typeof f == "function" ? f(ne) : (f ?? (S ? !0 : E ? (K ? !aa(K) : !0) : !1)))
						? ne.defaultPrevented || !S || !K || (cO(K, "mouseout", ne), !aa(K))
							? !0
							: (requestAnimationFrame(() => {
									aa(K) || n?.hide();
								}),
								!1)
						: !1;
				},
				modal: U,
				portal: u,
				backdrop: S ? !1 : m.backdrop,
			})),
			(m = { "aria-labelledby": C, ...m }),
			m
		);
	}),
	dM = gs(
		De(function (n) {
			return Ue(cM, fM(n));
		}),
		_o,
	);
function hM(e) {
	var n;
	const a = e.find((o) => !!o.element),
		u = [...e].reverse().find((o) => !!o.element);
	let l = (n = a?.element) == null ? void 0 : n.parentElement;
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
	const a = (n = e.store) == null ? void 0 : n.getState(),
		u = xe(e.items, a?.items, e.defaultItems, []),
		l = new Map(u.map((p) => [p.id, p])),
		o = { items: u, renderedItems: xe(a?.renderedItems, []) },
		f = mM(e.store),
		h = Vn({ items: u, renderedItems: o.renderedItems }, f),
		m = Vn(o, e.store),
		v = (p) => {
			const S = gp(p, (E) => E.element);
			(h.setState("renderedItems", S), m.setState("renderedItems", S));
		};
	(Xt(m, () => nh(h)),
		Xt(h, () =>
			Wl(h, ["items"], (p) => {
				m.setState("items", p.items);
			}),
		),
		Xt(h, () =>
			Wl(h, ["renderedItems"], (p) => {
				let S = !0,
					E = requestAnimationFrame(() => {
						const { renderedItems: A } = m.getState();
						p.renderedItems !== A && v(p.renderedItems);
					});
				if (typeof IntersectionObserver != "function") return () => cancelAnimationFrame(E);
				const C = () => {
						if (S) {
							S = !1;
							return;
						}
						(cancelAnimationFrame(E), (E = requestAnimationFrame(() => v(p.renderedItems))));
					},
					T = hM(p.renderedItems),
					D = new IntersectionObserver(C, { root: T });
				for (const A of p.renderedItems) A.element && D.observe(A.element);
				return () => {
					(cancelAnimationFrame(E), D.disconnect());
				};
			}),
		));
	const y = (p, S, E = !1) => {
			let C;
			return (
				S((D) => {
					const A = D.findIndex(({ id: R }) => R === p.id),
						M = D.slice();
					if (A !== -1) {
						C = D[A];
						const R = { ...C, ...p };
						((M[A] = R), l.set(p.id, R));
					} else (M.push(p), l.set(p.id, p));
					return M;
				}),
				() => {
					S((D) => {
						if (!C) return (E && l.delete(p.id), D.filter(({ id: R }) => R !== p.id));
						const A = D.findIndex(({ id: R }) => R === p.id);
						if (A === -1) return D;
						const M = D.slice();
						return ((M[A] = C), l.set(p.id, C), M);
					});
				}
			);
		},
		_ = (p) => y(p, (S) => h.setState("items", S), !0);
	return {
		...m,
		registerItem: _,
		renderItem: (p) =>
			on(
				_(p),
				y(p, (S) => h.setState("renderedItems", S)),
			),
		item: (p) => {
			if (!p) return null;
			let S = l.get(p);
			if (!S) {
				const { items: E } = h.getState();
				((S = E.find((C) => C.id === p)), S && l.set(p, S));
			}
			return S || null;
		},
		__unstablePrivateStore: h,
	};
}
function gM(e, n, a) {
	return (Yr(n, [a.store]), mt(e, a, "items", "setItems"), e);
}
var yM = { id: null };
function _i(e, n) {
	return e.find((a) => (n ? !a.disabled && a.id !== n : !a.disabled));
}
function bM(e, n) {
	return e.filter((a) => (n ? !a.disabled && a.id !== n : !a.disabled));
}
function B0(e, n) {
	return e.filter((a) => a.rowId === n);
}
function pM(e, n, a = !1) {
	const u = e.findIndex((l) => l.id === n);
	return [...e.slice(u + 1), ...(a ? [yM] : []), ...e.slice(0, u)];
}
function lS(e) {
	const n = [];
	for (const a of e) {
		const u = n.find((l) => {
			var o;
			return ((o = l[0]) == null ? void 0 : o.rowId) === a.rowId;
		});
		u ? u.push(a) : n.push([a]);
	}
	return n;
}
function oS(e) {
	let n = 0;
	for (const { length: a } of e) a > n && (n = a);
	return n;
}
function SM(e) {
	return { id: "__EMPTY_ITEM__", disabled: !0, rowId: e };
}
function wM(e, n, a) {
	const u = oS(e);
	for (const l of e)
		for (let o = 0; o < u; o += 1) {
			const f = l[o];
			if (!f || (a && f.disabled)) {
				const h = o === 0 && a ? _i(l) : l[o - 1];
				l[o] = h && n !== h.id && a ? h : SM(h?.rowId);
			}
		}
	return e;
}
function _M(e) {
	const n = lS(e),
		a = oS(n),
		u = [];
	for (let l = 0; l < a; l += 1)
		for (const o of n) {
			const f = o[l];
			f && u.push({ ...f, rowId: f.rowId ? `${l}` : void 0 });
		}
	return u;
}
function cS(e = {}) {
	var n;
	const a = (n = e.store) == null ? void 0 : n.getState(),
		u = vM(e),
		l = xe(e.activeId, a?.activeId, e.defaultActiveId),
		o = Vn(
			{
				...u.getState(),
				id: xe(e.id, a?.id, `id-${Math.random().toString(36).slice(2, 8)}`),
				activeId: l,
				baseElement: xe(a?.baseElement, null),
				includesBaseElement: xe(e.includesBaseElement, a?.includesBaseElement, l === null),
				moves: xe(a?.moves, 0),
				orientation: xe(e.orientation, a?.orientation, "both"),
				rtl: xe(e.rtl, a?.rtl, !1),
				virtualFocus: xe(e.virtualFocus, a?.virtualFocus, !1),
				focusLoop: xe(e.focusLoop, a?.focusLoop, !1),
				focusWrap: xe(e.focusWrap, a?.focusWrap, !1),
				focusShift: xe(e.focusShift, a?.focusShift, !1),
			},
			u,
			e.store,
		);
	Xt(o, () =>
		Ft(o, ["renderedItems", "activeId"], (h) => {
			o.setState("activeId", (m) => {
				var v;
				return m !== void 0 ? m : (v = _i(h.renderedItems)) == null ? void 0 : v.id;
			});
		}),
	);
	const f = (h = "next", m = {}) => {
		var v, y;
		const _ = o.getState(),
			{
				skip: p = 0,
				activeId: S = _.activeId,
				focusShift: E = _.focusShift,
				focusLoop: C = _.focusLoop,
				focusWrap: T = _.focusWrap,
				includesBaseElement: D = _.includesBaseElement,
				renderedItems: A = _.renderedItems,
				rtl: M = _.rtl,
			} = m,
			R = h === "up" || h === "down",
			N = h === "next" || h === "down",
			Z = N ? M && !R : !M || R,
			U = E && !p;
		let j = R ? qp(wM(lS(A), S, U)) : A;
		if (((j = Z ? Td(j) : j), (j = R ? _M(j) : j), S == null)) return (v = _i(j)) == null ? void 0 : v.id;
		const I = j.find((B) => B.id === S);
		if (!I) return (y = _i(j)) == null ? void 0 : y.id;
		const L = j.some((B) => B.rowId),
			$ = j.indexOf(I),
			te = j.slice($ + 1),
			ne = B0(te, I.rowId);
		if (p) {
			const B = bM(ne, S),
				ue = B.slice(p)[0] || B[B.length - 1];
			return ue?.id;
		}
		const K = C && (R ? C !== "horizontal" : C !== "vertical"),
			ie = L && T && (R ? T !== "horizontal" : T !== "vertical"),
			k = N ? (!L || R) && K && D : R ? D : !1;
		if (K) {
			const B = _i(pM(ie && !k ? j : B0(j, I.rowId), S, k), S);
			return B?.id;
		}
		if (ie) {
			const B = _i(k ? ne : te, S);
			return k ? B?.id || null : B?.id;
		}
		const H = _i(ne, S);
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
			return (h = _i(o.getState().renderedItems)) == null ? void 0 : h.id;
		},
		last: () => {
			var h;
			return (h = _i(Td(o.getState().renderedItems))) == null ? void 0 : h.id;
		},
		next: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("next", h)),
		previous: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("previous", h)),
		down: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("down", h)),
		up: (h) => (h !== void 0 && typeof h == "number" && (h = { skip: h }), f("up", h)),
	};
}
function xM(e) {
	return { id: Ni(e.id), ...e };
}
function fS(e, n, a) {
	return (
		(e = gM(e, n, a)),
		mt(e, a, "activeId", "setActiveId"),
		mt(e, a, "includesBaseElement"),
		mt(e, a, "virtualFocus"),
		mt(e, a, "orientation"),
		mt(e, a, "rtl"),
		mt(e, a, "focusLoop"),
		mt(e, a, "focusWrap"),
		mt(e, a, "focusShift"),
		e
	);
}
var EM = "a",
	dS = Le(function ({ store: n, showOnHover: a = !0, ...u }) {
		const l = eh();
		((n = n || l), vt(n, !1));
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
			m = rt(a),
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
					M = T ?? D;
				M === 0 ? A() : (f.current = window.setTimeout(A, M));
			}),
			_ = u.onClick,
			p = _e((E) => {
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
		return ((u = { ...u, ref: gt(S, u.ref), onMouseMove: y, onClick: p }), (u = ms(u)), u);
	}),
	Yk = De(function (n) {
		return Ue(EM, dS(n));
	}),
	CM = "div",
	ph = Le(function ({ store: n, ...a }) {
		const u = So();
		return ((n = n || u), (a = { ...a, ref: gt(n?.setAnchorElement, a.ref) }), a);
	}),
	Fk = De(function (n) {
		return Ue(CM, ph(n));
	}),
	TM = "button";
function V0(e) {
	if (!e.isTrusted) return !1;
	const n = e.currentTarget;
	return e.key === "Enter"
		? ra(n) || n.tagName === "SUMMARY" || n.tagName === "A"
		: e.key === " "
			? ra(n) || n.tagName === "SUMMARY" || n.tagName === "INPUT" || n.tagName === "SELECT"
			: !1;
}
var AM = Symbol("command"),
	Sh = Le(function ({ clickOnEnter: n = !0, clickOnSpace: a = !0, ...u }) {
		const l = (0, w.useRef)(null),
			[o, f] = (0, w.useState)(!1);
		(0, w.useEffect)(() => {
			l.current && f(ra(l.current));
		}, []);
		const [h, m] = (0, w.useState)(!1),
			v = (0, w.useRef)(!1),
			y = as(u),
			[_, p] = Ep(u, AM, !0),
			S = u.onKeyDown,
			E = _e((D) => {
				S?.(D);
				const A = D.currentTarget;
				if (D.defaultPrevented || _ || y || !wn(D) || Jn(A) || A.isContentEditable) return;
				const M = n && D.key === "Enter",
					R = a && D.key === " ",
					N = D.key === "Enter" && !n,
					Z = D.key === " " && !a;
				if (N || Z) {
					D.preventDefault();
					return;
				}
				if (M || R) {
					const U = V0(D);
					if (M) {
						if (!U) {
							D.preventDefault();
							const { view: j, ...I } = D,
								L = () => c0(A, I);
							lO() ? Ur(A, "keyup", L) : queueMicrotask(L);
						}
					} else R && ((v.current = !0), U || (D.preventDefault(), m(!0)));
				}
			}),
			C = u.onKeyUp,
			T = _e((D) => {
				if ((C?.(D), D.defaultPrevented || _ || y || D.metaKey)) return;
				const A = a && D.key === " ";
				if (v.current && A && ((v.current = !1), !V0(D))) {
					(D.preventDefault(), m(!1));
					const M = D.currentTarget,
						{ view: R, ...N } = D;
					queueMicrotask(() => c0(M, N));
				}
			});
		return (
			(u = {
				"data-active": h || void 0,
				type: o ? "button" : void 0,
				...p,
				...u,
				ref: gt(l, u.ref),
				onKeyDown: E,
				onKeyUp: T,
			}),
			(u = ms(u)),
			u
		);
	}),
	Kk = De(function (n) {
		return Ue(TM, Sh(n));
	}),
	hS = "button",
	mS = Le(function (n) {
		const a = (0, w.useRef)(null),
			u = _p(a, hS),
			[l, o] = (0, w.useState)(() => !!u && ra({ tagName: u, type: n.type }));
		return (
			(0, w.useEffect)(() => {
				a.current && o(ra(a.current));
			}, []),
			(n = { role: !l && u !== "a" ? "button" : void 0, ...n, ref: gt(a, n.ref) }),
			(n = Sh(n)),
			n
		);
	}),
	Gk = De(function (n) {
		return Ue(hS, mS(n));
	}),
	RM = "button",
	OM = Symbol("disclosure"),
	vS = Le(function ({ store: n, toggleOnClick: a = !0, ...u }) {
		const l = Jd();
		((n = n || l), vt(n, !1));
		const o = (0, w.useRef)(null),
			[f, h] = (0, w.useState)(!1),
			m = n.useState("disclosureElement"),
			v = n.useState("open");
		(0, w.useEffect)(() => {
			let T = m === o.current;
			(m?.isConnected || (n?.setDisclosureElement(o.current), (T = !0)), h(v && T));
		}, [m, n, v]);
		const y = u.onClick,
			_ = rt(a),
			[p, S] = Ep(u, OM, !0),
			E = _e((T) => {
				(y?.(T), !T.defaultPrevented && (p || (_(T) && (n?.setDisclosureElement(T.currentTarget), n?.toggle()))));
			}),
			C = n.useState("contentElement");
		return (
			(u = { "aria-expanded": f, "aria-controls": C?.id, ...S, ...u, ref: gt(o, u.ref), onClick: E }),
			(u = mS(u)),
			u
		);
	}),
	Xk = De(function (n) {
		return Ue(RM, vS(n));
	}),
	NM = "button",
	gS = Le(function ({ store: n, ...a }) {
		const u = po();
		return (
			(n = n || u),
			vt(n, !1),
			(a = { "aria-haspopup": mo(n.useState("contentElement"), "dialog"), ...a }),
			(a = vS({ store: n, ...a })),
			a
		);
	}),
	Jk = De(function (n) {
		return Ue(NM, gS(n));
	}),
	MM = "button",
	yS = Le(function ({ store: n, ...a }) {
		const u = So();
		((n = n || u), vt(n, !1));
		const l = a.onClick,
			o = _e((f) => {
				(n?.setAnchorElement(f.currentTarget), l?.(f));
			});
		return (
			(a = Pt(a, (f) => (0, b.jsx)(wo, { value: n, children: f }), [n])),
			(a = { ...a, onClick: o }),
			(a = ph({ store: n, ...a })),
			(a = gS({ store: n, ...a })),
			a
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
	return !!e?.some((a) => (!a.element || a.element === n ? !1 : a.element.getAttribute("aria-expanded") === "true"));
}
var DM = Le(function ({ store: n, focusable: a, accessibleWhenDisabled: u, showOnHover: l, ...o }) {
		const f = _o();
		((n = n || f), vt(n, !1));
		const h = (0, w.useRef)(null),
			m = n.parent,
			v = n.menubar,
			y = !!m,
			_ = !!v && !y,
			p = as(o),
			S = () => {
				const U = h.current;
				U && (n?.setDisclosureElement(U), n?.setAnchorElement(U), n?.show());
			},
			E = o.onFocus,
			C = _e((U) => {
				if ((E?.(U), p || U.defaultPrevented || (n?.setAutoFocusOnShow(!1), n?.setActiveId(null), !v) || !_)) return;
				const { items: j } = v.getState();
				H0(j, U.currentTarget) && S();
			}),
			T = Ct(n, (U) => U.placement.split("-")[0]),
			D = o.onKeyDown,
			A = _e((U) => {
				if ((D?.(U), p || U.defaultPrevented)) return;
				const j = kM(U, T);
				j && (U.preventDefault(), S(), n?.setAutoFocusOnShow(!0), n?.setInitialFocus(j));
			}),
			M = o.onClick,
			R = _e((U) => {
				if ((M?.(U), U.defaultPrevented || !n)) return;
				const j = !U.detail,
					{ open: I } = n.getState();
				((!I || j) && ((!y || j) && n.setAutoFocusOnShow(!0), n.setInitialFocus(j ? "first" : "container")), y && S());
			});
		((o = Pt(o, (U) => (0, b.jsx)(Rp, { value: n, children: U }), [n])),
			y && (o = { ...o, render: (0, b.jsx)(to.div, { render: o.render }) }));
		const N = Ni(o.id),
			Z = Ct(m?.combobox || m, "contentElement");
		return (
			(o = {
				id: N,
				role: y || _ ? vp(Z, "menuitem") : void 0,
				"aria-haspopup": mo(n.useState("contentElement"), "menu"),
				...o,
				ref: gt(h, o.ref),
				onFocus: C,
				onKeyDown: A,
				onClick: R,
			}),
			(o = dS({
				store: n,
				focusable: a,
				accessibleWhenDisabled: u,
				...o,
				showOnHover: (U) => {
					if (
						!(() => {
							if (typeof l == "function") return l(U);
							if (l != null) return l;
							if (y) return !0;
							if (!v) return !1;
							const { items: L } = v.getState();
							return _ && H0(L);
						})()
					)
						return !1;
					const I = _ ? v : m;
					return (I && I.setActiveId(U.currentTarget.id), !0);
				},
			})),
			(o = yS({ store: n, toggleOnClick: !y, focusable: a, accessibleWhenDisabled: u, ...o })),
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
function UM(e) {
	const n = bS(e);
	return n ? Tt(e.currentTarget, n) : !1;
}
var Md = Symbol("composite-hover");
function IM(e) {
	let n = bS(e);
	if (!n) return !1;
	do {
		if (Ri(n, Md) && n[Md]) return !0;
		n = n.parentElement;
	} while (n);
	return !1;
}
var wh = Le(function ({ store: n, focusOnHover: a = !0, blurOnHoverEnd: u = !!a, ...l }) {
		const o = yo();
		((n = n || o), vt(n, !1));
		const f = Gd(),
			h = l.onMouseMove,
			m = rt(a),
			v = _e((E) => {
				if ((h?.(E), !E.defaultPrevented && f() && m(E))) {
					if (!aa(E.currentTarget)) {
						const C = n?.getState().baseElement;
						C && !La(C) && C.focus();
					}
					n?.setActiveId(E.currentTarget.id);
				}
			}),
			y = l.onMouseLeave,
			_ = rt(u),
			p = _e((E) => {
				var C;
				(y?.(E),
					!E.defaultPrevented &&
						f() &&
						(UM(E) ||
							IM(E) ||
							(m(E) && _(E) && (n?.setActiveId(null), (C = n?.getState().baseElement) == null || C.focus()))));
			}),
			S = (0, w.useCallback)((E) => {
				E && (E[Md] = !0);
			}, []);
		return ((l = { ...l, ref: gt(S, l.ref), onMouseMove: v, onMouseLeave: p }), Za(l));
	}),
	eD = go(
		De(function (n) {
			return Ue(qM, wh(n));
		}),
	),
	LM = "div",
	pS = Le(function ({ store: n, shouldRegisterItem: a = !0, getItem: u = dp, element: l, ...o }) {
		const f = bO();
		n = n || f;
		const h = Ni(o.id),
			m = (0, w.useRef)(l);
		return (
			(0, w.useEffect)(() => {
				const v = m.current;
				if (!h || !v || !a) return;
				const y = u({ id: h, element: v });
				return n?.renderItem(y);
			}, [h, a, u, n]),
			(o = { ...o, ref: gt(m, o.ref) }),
			Za(o)
		);
	}),
	tD = De(function (n) {
		return Ue(LM, pS(n));
	}),
	$M = "button";
function BM(e) {
	return xd(e) ? !0 : e.tagName === "INPUT" && !ra(e);
}
function VM(e, n = !1) {
	const a = e.clientHeight,
		{ top: u } = e.getBoundingClientRect(),
		l = Math.max(a * 0.875, a - 40) * 1.5,
		o = n ? a - l + u : l + u;
	return e.tagName === "HTML" ? o + e.scrollTop : o;
}
function HM(e, n = !1) {
	const { top: a } = e.getBoundingClientRect();
	return n ? a + e.clientHeight : a;
}
function Z0(e, n, a, u = !1) {
	var l;
	if (!n || !a) return;
	const { renderedItems: o } = n.getState(),
		f = Pd(e);
	if (!f) return;
	const h = VM(f, u);
	let m, v;
	for (let y = 0; y < o.length; y += 1) {
		const _ = m;
		if (((m = a(y)), !m)) break;
		if (m === _) continue;
		const p = (l = na(n, m)) == null ? void 0 : l.element;
		if (!p) continue;
		const S = HM(p, u) - h,
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
	return wn(e) ? !1 : Pu(n, e.target);
}
var _h = Le(function ({
		store: n,
		rowId: a,
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
		const _ = Ni(v.id),
			p = (0, w.useRef)(null),
			S = (0, w.useContext)(xO),
			E = as(v) && !v.accessibleWhenDisabled,
			{
				rowId: C,
				baseElement: T,
				isActiveItem: D,
				ariaSetSize: A,
				ariaPosInSet: M,
				isTabbable: R,
			} = zp(n, {
				rowId(k) {
					if (a) return a;
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
			N = (0, w.useCallback)(
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
			Z = v.onFocus,
			U = (0, w.useRef)(!1),
			j = _e((k) => {
				if ((Z?.(k), k.defaultPrevented || bp(k) || !_ || !n || ZM(k, n))) return;
				const { virtualFocus: H, baseElement: B } = n.getState();
				(n.setActiveId(_),
					xd(k.currentTarget) && IO(k.currentTarget),
					H &&
						wn(k) &&
						(BM(k.currentTarget) ||
							(B?.isConnected &&
								(vo() &&
									k.currentTarget.hasAttribute("data-autofocus") &&
									k.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" }),
								(U.current = !0),
								k.relatedTarget === B || Pu(n, k.relatedTarget) ? LO(B) : B.focus()))));
			}),
			I = v.onBlurCapture,
			L = _e((k) => {
				if ((I?.(k), k.defaultPrevented)) return;
				const H = n?.getState();
				H?.virtualFocus && U.current && ((U.current = !1), k.preventDefault(), k.stopPropagation());
			}),
			$ = v.onKeyDown,
			te = rt(u),
			ne = rt(l),
			K = _e((k) => {
				if (($?.(k), k.defaultPrevented || !wn(k) || !n)) return;
				const { currentTarget: H } = k,
					B = n.getState(),
					ue = n.item(_),
					fe = !!ue?.rowId,
					we = B.orientation !== "horizontal",
					O = B.orientation !== "vertical",
					G = () => !!(fe || O || !B.baseElement || !Jn(B.baseElement)),
					ae = {
						ArrowUp: (fe || we) && n.up,
						ArrowRight: (fe || O) && n.next,
						ArrowDown: (fe || we) && n.down,
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
				if (ae) {
					if (xd(H)) {
						const ve = Ed(H),
							ge = O && k.key === "ArrowLeft",
							pe = O && k.key === "ArrowRight",
							Ze = we && k.key === "ArrowUp",
							Oe = we && k.key === "ArrowDown";
						if (pe || Oe) {
							const { length: st } = uO(H);
							if (ve.end !== st) return;
						} else if ((ge || Ze) && ve.start !== 0) return;
					}
					const se = ae();
					if (te(k) || se !== void 0) {
						if (!ne(k)) return;
						(k.preventDefault(), n.move(se));
					}
				}
			}),
			ie = (0, w.useMemo)(() => ({ id: _, baseElement: T }), [_, T]);
		return (
			(v = Pt(v, (k) => (0, b.jsx)(_O.Provider, { value: ie, children: k }), [ie])),
			(v = {
				id: _,
				"data-active-item": D || void 0,
				...v,
				ref: gt(p, v.ref),
				tabIndex: R ? v.tabIndex : -1,
				onFocus: j,
				onBlurCapture: L,
				onKeyDown: K,
			}),
			(v = Sh(v)),
			(v = pS({ store: n, ...v, getItem: N, shouldRegisterItem: _ ? v.shouldRegisterItem : !1 })),
			Za({ ...v, "aria-setsize": A, "aria-posinset": M })
		);
	}),
	nD = go(
		De(function (n) {
			return Ue($M, _h(n));
		}),
	),
	QM = "div";
function PM(e, n, a) {
	var u;
	if (!e) return !1;
	if (aa(e)) return !0;
	const l = n?.find((h) => {
			var m;
			return h.element === a ? !1 : ((m = h.element) == null ? void 0 : m.getAttribute("aria-expanded")) === "true";
		}),
		o = (u = l?.element) == null ? void 0 : u.getAttribute("aria-controls");
	if (!o) return !1;
	const f = it(e).getElementById(o);
	return f ? (aa(f) ? !0 : !!f.querySelector("[role=menuitem][aria-expanded=true]")) : !1;
}
var YM = Le(function ({
		store: n,
		hideOnClick: a = !0,
		preventScrollOnKeyDown: u = !0,
		focusOnHover: l,
		blurOnHoverEnd: o,
		...f
	}) {
		const h = zO(!0),
			m = CO();
		((n = n || h || m), vt(n, !1));
		const v = f.onClick,
			y = rt(a),
			_ = "hideAll" in n ? n.hideAll : void 0,
			p = !!_,
			S = _e((E) => {
				(v?.(E),
					!E.defaultPrevented &&
						(Sp(E) || pp(E) || (_ && E.currentTarget.getAttribute("aria-haspopup") !== "menu" && y(E) && _())));
			});
		return (
			(f = {
				role: vp(
					Ct(n, (E) => ("contentElement" in E ? E.contentElement : null)),
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
					return p
						? (E.currentTarget.hasAttribute("aria-expanded") && E.currentTarget.focus(), !0)
						: PM(T, D, E.currentTarget)
							? (E.currentTarget.focus(), !0)
							: !1;
				},
				blurOnHoverEnd(E) {
					return typeof o == "function" ? o(E) : (o ?? p);
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
	const a = xo(
		n.store,
		ah(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
	);
	const u = a?.getState(),
		l = Yp({ ...n, store: a }),
		o = xe(n.placement, u?.placement, "bottom"),
		f = Vn(
			{
				...l.getState(),
				placement: o,
				currentPlacement: o,
				anchorElement: xe(u?.anchorElement, null),
				popoverElement: xe(u?.popoverElement, null),
				arrowElement: xe(u?.arrowElement, null),
				rendered: Symbol("rendered"),
			},
			l,
			a,
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
function wS(e, n, a) {
	return (Yr(n, [a.popover]), mt(e, a, "placement"), Fp(e, n, a));
}
function KM(e = {}) {
	var n;
	const a = (n = e.store) == null ? void 0 : n.getState(),
		u = SS({ ...e, placement: xe(e.placement, a?.placement, "bottom") }),
		l = xe(e.timeout, a?.timeout, 500),
		o = Vn(
			{
				...u.getState(),
				timeout: l,
				showTimeout: xe(e.showTimeout, a?.showTimeout),
				hideTimeout: xe(e.hideTimeout, a?.hideTimeout),
				autoFocusOnShow: xe(a?.autoFocusOnShow, !1),
			},
			u,
			e.store,
		);
	return { ...u, ...o, setAutoFocusOnShow: (f) => o.setState("autoFocusOnShow", f) };
}
function GM(e, n, a) {
	return (mt(e, a, "timeout"), mt(e, a, "showTimeout"), mt(e, a, "hideTimeout"), wS(e, n, a));
}
var _S = (0, w.createContext)(void 0),
	ys = Wn([Cp, ss], [wo, bo]),
	XM = ys.useContext,
	xS = ys.useScopedContext,
	ko = ys.useProviderContext,
	iD = ys.ContextProvider,
	JM = ys.ScopedContextProvider,
	WM = (0, w.createContext)(void 0),
	ez = (0, w.createContext)(!1);
function tz({ combobox: e, parent: n, menubar: a, ...u } = {}) {
	const l = !!a && !n,
		o = xo(
			u.store,
			Op(n, ["values"]),
			ah(e, ["arrowElement", "anchorElement", "contentElement", "popoverElement", "disclosureElement"]),
		);
	const f = o.getState(),
		h = cS({ ...u, store: o, orientation: xe(u.orientation, f.orientation, "vertical") }),
		m = KM({
			...u,
			store: o,
			placement: xe(u.placement, f.placement, "bottom-start"),
			timeout: xe(u.timeout, f.timeout, l ? 0 : 150),
			hideTimeout: xe(u.hideTimeout, f.hideTimeout, 0),
		}),
		v = Vn(
			{
				...h.getState(),
				...m.getState(),
				initialFocus: xe(f.initialFocus, "container"),
				values: xe(u.values, f.values, u.defaultValues, {}),
			},
			h,
			m,
			o,
		);
	return (
		Xt(v, () =>
			Ft(v, ["mounted"], (y) => {
				y.mounted || v.setState("activeId", null);
			}),
		),
		Xt(v, () =>
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
			menubar: a,
			hideAll: () => {
				(m.hide(), n?.hideAll());
			},
			setInitialFocus: (y) => v.setState("initialFocus", y),
			setValues: (y) => v.setState("values", y),
			setValue: (y, _) => {
				y !== "__proto__" &&
					y !== "constructor" &&
					(Array.isArray(y) ||
						v.setState("values", (p) => {
							const S = p[y],
								E = cp(_, S);
							return E === S ? p : { ...p, [y]: E !== void 0 && E };
						}));
			},
		}
	);
}
function nz(e, n, a) {
	return (
		Yr(n, [a.combobox, a.parent, a.menubar]),
		mt(e, a, "values", "setValues"),
		Object.assign(GM(fS(e, n, a), n, a), { combobox: a.combobox, parent: a.parent, menubar: a.menubar })
	);
}
function iz(e = {}) {
	const n = Ap(),
		a = EO(),
		u = ko();
	e = {
		...e,
		parent: e.parent !== void 0 ? e.parent : n,
		menubar: e.menubar !== void 0 ? e.menubar : a,
		combobox: e.combobox !== void 0 ? e.combobox : u,
	};
	const [l, o] = Eo(tz, e);
	return nz(l, o, e);
}
function az(e = {}) {
	return (0, b.jsx)(Rp, { value: iz(e), children: e.children });
}
var rz = "hr",
	ES = Le(function ({ orientation: n = "horizontal", ...a }) {
		return ((a = { role: "separator", "aria-orientation": n, ...a }), a);
	}),
	aD = De(function (n) {
		return Ue(rz, ES(n));
	}),
	uz = "hr",
	CS = Le(function ({ store: n, ...a }) {
		const u = yo();
		((n = n || u), vt(n, !1));
		const l = n.useState((o) => (o.orientation === "horizontal" ? "vertical" : "horizontal"));
		return ((a = ES({ ...a, orientation: l })), a);
	}),
	rD = De(function (n) {
		return Ue(uz, CS(n));
	}),
	sz = "hr",
	lz = Le(function ({ store: n, ...a }) {
		const u = Ap();
		return ((n = n || u), (a = CS({ store: n, ...a })), a);
	}),
	oz = De(function (n) {
		return Ue(sz, lz(n));
	}),
	cz = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
	fz = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (n, a, u) => (u ? u.toUpperCase() : a.toLowerCase())),
	Q0 = (e) => {
		const n = fz(e);
		return n.charAt(0).toUpperCase() + n.slice(1);
	},
	TS = (...e) =>
		e
			.filter((n, a, u) => !!n && n.trim() !== "" && u.indexOf(n) === a)
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
				strokeWidth: a = 2,
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
					strokeWidth: u ? (Number(a) * 24) / Number(n) : a,
					className: TS("lucide", l),
					...(!o && !dz(h) && { "aria-hidden": "true" }),
					...h,
				},
				[...f.map(([v, y]) => (0, w.createElement)(v, y)), ...(Array.isArray(o) ? o : [o])],
			),
	),
	xh = (e, n) => {
		const a = (0, w.forwardRef)(({ className: u, ...l }, o) =>
			(0, w.createElement)(mz, { ref: o, iconNode: n, className: TS(`lucide-${cz(Q0(e))}`, `lucide-${e}`, u), ...l }),
		);
		return ((a.displayName = Q0(e)), a);
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
		const { channelName: a, items: u } = n;
		return (0, b.jsxs)(az, {
			placement: "bottom-end",
			children: [
				(0, b.jsx)(jM, {
					className: "ChannelRowMenu-trigger",
					"aria-label": `Actions for #${a}`,
					children: (0, b.jsx)(bz, { size: 16, "aria-hidden": "true" }),
				}),
				(0, b.jsx)(dM, {
					portal: !0,
					unmountOnHide: !0,
					gutter: 4,
					className: "ChannelRowMenu-popover",
					"aria-label": `Actions for #${a}`,
					children: u.map((l) =>
						"separator" in l
							? (0, b.jsx)(oz, { className: "ChannelRowMenu-separator" }, l.id)
							: (0, b.jsx)(
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
function P0(e, n, a) {
	if (!a) return !1;
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
	const n = e.find((a) => {
		var u;
		return a.disabled ? !1 : ((u = a.element) == null ? void 0 : u.getAttribute("role")) !== "tab";
	});
	return n?.id;
}
var Tz = Le(function ({
		store: n,
		focusable: a = !0,
		autoSelect: u = !1,
		getAutoSelectId: l,
		setValueOnChange: o,
		showMinLength: f = 0,
		showOnChange: h,
		showOnMouseDown: m,
		showOnClick: v = m,
		showOnKeyDown: y,
		showOnKeyPress: _ = y,
		blurActiveItemOnClick: p,
		setValueOnClick: S = !0,
		moveOnKeyPress: E = !0,
		autoComplete: C = "list",
		...T
	}) {
		const D = ko();
		((n = n || D), vt(n, !1));
		const A = (0, w.useRef)(null),
			[M, R] = xp(),
			N = (0, w.useRef)(!1),
			Z = (0, w.useRef)(!1),
			U = n.useState((re) => re.virtualFocus && u),
			j = C === "inline" || C === "both",
			[I, L] = (0, w.useState)(j);
		vO(() => {
			j && L(!0);
		}, [j]);
		const $ = n.useState("value"),
			te = (0, w.useRef)();
		(0, w.useEffect)(
			() =>
				Ft(n, ["selectedValue", "activeId"], (re, Re) => {
					te.current = Re.selectedValue;
				}),
			[],
		);
		const ne = n.useState((re) => {
				var Re;
				if (
					j &&
					I &&
					!(
						re.activeValue &&
						Array.isArray(re.selectedValue) &&
						(re.selectedValue.includes(re.activeValue) || ((Re = te.current) != null && Re.includes(re.activeValue)))
					)
				)
					return re.activeValue;
			}),
			K = n.useState("renderedItems"),
			ie = n.useState("open"),
			k = n.useState("contentElement"),
			H = (0, w.useMemo)(() => {
				if (!j || !I) return $;
				if (P0(K, ne, U)) {
					if (Y0($, ne)) {
						const re = ne?.slice($.length) || "";
						return $ + re;
					}
					return $;
				}
				return ne || $;
			}, [j, I, K, ne, U, $]);
		((0, w.useEffect)(() => {
			const re = A.current;
			if (!re) return;
			const Re = () => L(!0);
			return (
				re.addEventListener("combobox-item-move", Re),
				() => {
					re.removeEventListener("combobox-item-move", Re);
				}
			);
		}, []),
			(0, w.useEffect)(() => {
				if (!j || !I || !ne || !P0(K, ne, U) || !Y0($, ne)) return;
				let re = Qu;
				return (
					queueMicrotask(() => {
						const Re = A.current;
						if (!Re) return;
						const { start: ft, end: je } = Ed(Re),
							yt = $.length,
							Mt = ne.length;
						(nd(Re, yt, Mt),
							(re = () => {
								if (!La(Re)) return;
								const { start: bt, end: Lt } = Ed(Re);
								bt === yt && Lt === Mt && nd(Re, ft, je);
							}));
					}),
					() => re()
				);
			}, [M, j, I, ne, K, U, $]));
		const B = (0, w.useRef)(null),
			ue = _e(l),
			fe = (0, w.useRef)(null);
		((0, w.useEffect)(() => {
			if (!ie || !k) return;
			const re = Pd(k);
			if (!re) return;
			B.current = re;
			const Re = () => {
					N.current = !1;
				},
				ft = () => {
					if (!n || !N.current) return;
					const { activeId: yt } = n.getState();
					yt !== null && yt !== fe.current && (N.current = !1);
				},
				je = { passive: !0, capture: !0 };
			return (
				re.addEventListener("wheel", Re, je),
				re.addEventListener("touchmove", Re, je),
				re.addEventListener("scroll", ft, je),
				() => {
					(re.removeEventListener("wheel", Re, !0),
						re.removeEventListener("touchmove", Re, !0),
						re.removeEventListener("scroll", ft, !0));
				}
			);
		}, [ie, k, n]),
			He(() => {
				$ && (Z.current || (N.current = !0));
			}, [$]),
			He(() => {
				(U !== "always" && ie) || (N.current = ie);
			}, [U, ie]));
		const we = n.useState("resetValueOnSelect");
		(Yr(() => {
			var re, Re;
			const ft = N.current;
			if (!n || !ie || (!ft && !we)) return;
			const { baseElement: je, contentElement: yt, activeId: Mt } = n.getState();
			if (!(je && !La(je))) {
				if (yt?.hasAttribute("data-placing")) {
					const bt = new MutationObserver(R);
					return (bt.observe(yt, { attributeFilter: ["data-placing"] }), () => bt.disconnect());
				}
				if (U && ft) {
					const bt = ue(K),
						Lt = bt !== void 0 ? bt : (re = Cz(K)) != null ? re : n.first();
					((fe.current = Lt), n.move(Lt ?? null));
				} else {
					const bt = (Re = n.item(Mt || n.first())) == null ? void 0 : Re.element;
					bt && "scrollIntoView" in bt && bt.scrollIntoView({ block: "nearest", inline: "nearest" });
				}
			}
		}, [n, ie, M, $, U, we, ue, K]),
			(0, w.useEffect)(() => {
				if (!j) return;
				const re = A.current;
				if (!re) return;
				const Re = [re, k].filter((je) => !!je),
					ft = (je) => {
						Re.every((yt) => ka(je, yt)) && n?.setValue(H);
					};
				for (const je of Re) je.addEventListener("focusout", ft);
				return () => {
					for (const je of Re) je.removeEventListener("focusout", ft);
				};
			}, [j, k, n, H]));
		const O = (re) => re.currentTarget.value.length >= f,
			G = T.onChange,
			ae = rt(h ?? O),
			se = rt(o ?? !n.tag),
			ve = _e((re) => {
				if ((G?.(re), re.defaultPrevented || !n)) return;
				const Re = re.currentTarget,
					{ value: ft, selectionStart: je, selectionEnd: yt } = Re,
					Mt = re.nativeEvent;
				if (((N.current = !0), xz(Mt) && (Mt.isComposing && ((N.current = !1), (Z.current = !0)), j))) {
					const bt = Mt.inputType === "insertText" || Mt.inputType === "insertCompositionText",
						Lt = je === ft.length;
					L(bt && Lt);
				}
				if (se(re)) {
					const bt = ft === n.getState().value;
					(n.setValue(ft),
						queueMicrotask(() => {
							nd(Re, je, yt);
						}),
						j && U && bt && R());
				}
				(ae(re) && n.show(), (!U || !N.current) && n.setActiveId(null));
			}),
			ge = T.onCompositionEnd,
			pe = _e((re) => {
				((N.current = !0), (Z.current = !1), ge?.(re), !re.defaultPrevented && U && R());
			}),
			Ze = T.onMouseDown,
			Oe = rt(p ?? (() => !!n?.getState().includesBaseElement)),
			st = rt(S),
			Dt = rt(v ?? O),
			It = _e((re) => {
				(Ze?.(re),
					!re.defaultPrevented &&
						(re.button ||
							re.ctrlKey ||
							(n &&
								(Oe(re) && n.setActiveId(null),
								st(re) && n.setValue(H),
								Dt(re) && Ur(re.currentTarget, "mouseup", n.show)))));
			}),
			dn = T.onKeyDown,
			jt = rt(_ ?? O),
			de = _e((re) => {
				if (
					(dn?.(re),
					re.repeat || (N.current = !1),
					re.defaultPrevented || re.ctrlKey || re.altKey || re.shiftKey || re.metaKey || !n)
				)
					return;
				const { open: Re } = n.getState();
				Re || ((re.key === "ArrowUp" || re.key === "ArrowDown") && jt(re) && (re.preventDefault(), n.show()));
			}),
			Te = T.onBlur,
			We = _e((re) => {
				((N.current = !1), Te?.(re), re.defaultPrevented);
			}),
			Ie = Ni(T.id),
			Ot = Ez(C) ? C : void 0,
			Nt = n.useState((re) => re.activeId === null);
		return (
			(T = {
				id: Ie,
				role: "combobox",
				"aria-autocomplete": Ot,
				"aria-haspopup": mo(k, "listbox"),
				"aria-expanded": ie,
				"aria-controls": k?.id,
				"data-active-item": Nt || void 0,
				value: H,
				...T,
				ref: gt(A, T.ref),
				onChange: ve,
				onCompositionEnd: pe,
				onMouseDown: It,
				onKeyDown: de,
				onBlur: We,
			}),
			(T = lh({ store: n, focusable: a, ...T, moveOnKeyPress: (re) => (ho(E, re) ? !1 : (j && L(!0), !0)) })),
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
		value: a,
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
		const p = xS();
		((n = n || p), vt(n, !1));
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
					return Oz(L.selectedValue, a);
				},
			}),
			T = (0, w.useCallback)(
				(L) => {
					const $ = { ...L, value: a };
					return v ? v($) : $;
				},
				[a, v],
			);
		((l = l ?? !E), (u = u ?? (a != null && !E)));
		const D = y.onClick,
			A = rt(l),
			M = rt(o),
			R = rt((_ = f ?? S) != null ? _ : E),
			N = rt(u),
			Z = _e((L) => {
				(D?.(L),
					!L.defaultPrevented &&
						(Sp(L) ||
							pp(L) ||
							(a != null &&
								(M(L) &&
									(R(L) && n?.resetValue(),
									n?.setSelectedValue(($) =>
										Array.isArray($) ? ($.includes(a) ? $.filter((te) => te !== a) : [...$, a]) : a,
									)),
								A(L) && n?.setValue(a)),
							N(L) && n?.hide())));
			}),
			U = y.onKeyDown,
			j = _e((L) => {
				if ((U?.(L), L.defaultPrevented)) return;
				const $ = n?.getState().baseElement;
				$ &&
					(La($) ||
						((L.key.length === 1 || L.key === "Backspace" || L.key === "Delete") &&
							(queueMicrotask(() => $.focus()), Jn($) && n?.setValue($.value))));
			});
		(E && C != null && (y = { "aria-selected": C, ...y }),
			(y = Pt(
				y,
				(L) =>
					(0, b.jsx)(WM.Provider, { value: a, children: (0, b.jsx)(ez.Provider, { value: C ?? !1, children: L }) }),
				[a, C],
			)),
			(y = { role: Nz((0, w.useContext)(_S)), children: a, ...y, onClick: Z, onKeyDown: j }));
		const I = rt(m);
		return (
			(y = _h({
				store: n,
				...y,
				getItem: T,
				moveOnKeyPress: (L) => {
					if (!I(L)) return !1;
					const $ = new Event("combobox-item-move");
					return (n?.getState().baseElement?.dispatchEvent($), !0);
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
	AS = Le(function ({ store: n, alwaysVisible: a, ...u }) {
		const l = xS(!0),
			o = XM();
		n = n || o;
		const f = !!n && n === l;
		vt(n, !1);
		const h = (0, w.useRef)(null),
			m = Ni(u.id),
			v = n.useState("mounted"),
			y = Co(v, u.hidden, a),
			_ = y ? { ...u.style, display: "none" } : u.style,
			p = n.useState((M) => Array.isArray(M.selectedValue)),
			S = mO(h, "role", u.role),
			E = ((S === "listbox" || S === "tree" || S === "grid") && p) || void 0,
			[C, T] = (0, w.useState)(!1),
			D = n.useState("contentElement");
		(He(() => {
			if (!v) return;
			const M = h.current;
			if (!M || D !== M) return;
			const R = () => {
					T(!!M.querySelector("[role='listbox']"));
				},
				N = new MutationObserver(R);
			return (N.observe(M, { subtree: !0, childList: !0, attributeFilter: ["role"] }), R(), () => N.disconnect());
		}, [v, D]),
			C || (u = { role: "listbox", "aria-multiselectable": E, ...u }),
			(u = Pt(u, (M) => (0, b.jsx)(JM, { value: n, children: (0, b.jsx)(_S.Provider, { value: S, children: M }) }), [
				n,
				S,
			])));
		const A = m && (!l || !f) ? n.setContentElement : null;
		return ((u = { id: m, hidden: y, ...u, ref: gt(A, h, u.ref), style: _ }), Za(u));
	}),
	uD = De(function (n) {
		return Ue(kz, AS(n));
	}),
	Dz = "div";
function jz(e, ...n) {
	if (!e) return !1;
	if ("id" in e) {
		const a = n
			.filter(Boolean)
			.map((u) => `[aria-controls~="${u}"]`)
			.join(", ");
		return a ? e.matches(a) : !1;
	}
	return !1;
}
var qz = Le(function ({
		store: n,
		modal: a,
		tabIndex: u,
		alwaysVisible: l,
		autoFocusOnHide: o = !0,
		hideOnInteractOutside: f = !0,
		...h
	}) {
		const m = ko();
		((n = n || m), vt(n, !1));
		const v = n.useState("baseElement"),
			y = (0, w.useRef)(!1),
			_ = Ct(n.tag, (p) => p?.renderedItems.length);
		return (
			(h = AS({ store: n, alwaysVisible: l, ...h })),
			(h = bh({
				store: n,
				modal: a,
				alwaysVisible: l,
				backdrop: !1,
				autoFocusOnShow: !1,
				finalFocus: v,
				preserveTabOrderAnchor: null,
				unstable_treeSnapshotKey: _,
				...h,
				getPersistentElements() {
					var p;
					const S = ((p = h.getPersistentElements) == null ? void 0 : p.call(h)) || [];
					if (!a || !n) return S;
					const { contentElement: E, baseElement: C } = n.getState();
					if (!C) return S;
					const T = it(C),
						D = [];
					if ((E?.id && D.push(`[aria-controls~="${E.id}"]`), C?.id && D.push(`[aria-controls~="${C.id}"]`), !D.length))
						return [...S, C];
					const A = D.join(","),
						M = T.querySelectorAll(A);
					return [...S, ...M];
				},
				autoFocusOnHide(p) {
					return ho(o, p) ? !1 : y.current ? ((y.current = !1), !1) : !0;
				},
				hideOnInteractOutside(p) {
					var S, E;
					const C = n?.getState(),
						T = (S = C?.contentElement) == null ? void 0 : S.id,
						D = (E = C?.baseElement) == null ? void 0 : E.id;
					if (jz(p.target, T, D)) return !1;
					const A = typeof f == "function" ? f(p) : f;
					return (A && (y.current = p.type === "click"), A);
				},
			})),
			h
		);
	}),
	Uz = gs(
		De(function (n) {
			return Ue(Dz, qz(n));
		}),
		ko,
	),
	sD = (0, w.createContext)(null),
	lD = (0, w.createContext)(null),
	bs = Wn([ss], [bo]),
	Iz = bs.useContext,
	oD = bs.useScopedContext,
	cD = bs.useProviderContext,
	fD = bs.ContextProvider,
	dD = bs.ScopedContextProvider,
	Lz = vo() && yp();
function $z({ tag: e, ...n } = {}) {
	const a = xo(n.store, Op(e, ["value", "rtl"]));
	const u = e?.getState(),
		l = a?.getState(),
		o = xe(n.activeId, l?.activeId, n.defaultActiveId, null),
		f = cS({
			...n,
			activeId: o,
			includesBaseElement: xe(n.includesBaseElement, l?.includesBaseElement, !0),
			orientation: xe(n.orientation, l?.orientation, "vertical"),
			focusLoop: xe(n.focusLoop, l?.focusLoop, !0),
			focusWrap: xe(n.focusWrap, l?.focusWrap, !0),
			virtualFocus: xe(n.virtualFocus, l?.virtualFocus, !0),
		}),
		h = SS({ ...n, placement: xe(n.placement, l?.placement, "bottom-start") }),
		m = xe(n.value, l?.value, n.defaultValue, ""),
		v = xe(n.selectedValue, l?.selectedValue, u?.values, n.defaultSelectedValue, ""),
		y = Array.isArray(v),
		_ = {
			...f.getState(),
			...h.getState(),
			value: m,
			selectedValue: v,
			resetValueOnSelect: xe(n.resetValueOnSelect, l?.resetValueOnSelect, y),
			resetValueOnHide: xe(n.resetValueOnHide, l?.resetValueOnHide, y && !e),
			activeValue: l?.activeValue,
		},
		p = Vn(_, f, h, a);
	return (
		Lz &&
			Xt(p, () =>
				Ft(p, ["virtualFocus"], () => {
					p.setState("virtualFocus", !1);
				}),
			),
		Xt(p, () => {
			if (e)
				return on(
					Ft(p, ["selectedValue"], (S) => {
						Array.isArray(S.selectedValue) && e.setValues(S.selectedValue);
					}),
					Ft(e, ["values"], (S) => {
						p.setState("selectedValue", S.values);
					}),
				);
		}),
		Xt(p, () =>
			Ft(p, ["resetValueOnHide", "mounted"], (S) => {
				S.resetValueOnHide && (S.mounted || p.setState("value", m));
			}),
		),
		Xt(p, () =>
			Ft(p, ["open"], (S) => {
				S.open || (p.setState("activeId", o), p.setState("moves", 0));
			}),
		),
		Xt(p, () =>
			Ft(p, ["moves", "activeId"], (S, E) => {
				S.moves === E.moves && p.setState("activeValue", void 0);
			}),
		),
		Xt(p, () =>
			Wl(p, ["moves", "renderedItems"], (S, E) => {
				if (S.moves === E.moves) return;
				const { activeId: C } = p.getState(),
					T = f.item(C);
				p.setState("activeValue", T?.value);
			}),
		),
		{
			...h,
			...f,
			...p,
			tag: e,
			setValue: (S) => p.setState("value", S),
			resetValue: () => p.setState("value", _.value),
			setSelectedValue: (S) => p.setState("selectedValue", S),
		}
	);
}
function Bz(e) {
	const n = Iz();
	return ((e = { ...e, tag: e.tag !== void 0 ? e.tag : n }), xM(e));
}
function Vz(e, n, a) {
	return (
		Yr(n, [a.tag]),
		mt(e, a, "value", "setValue"),
		mt(e, a, "selectedValue", "setSelectedValue"),
		mt(e, a, "resetValueOnHide"),
		mt(e, a, "resetValueOnSelect"),
		Object.assign(fS(wS(e, n, a), n, a), { tag: a.tag })
	);
}
function Hz(e = {}) {
	e = Bz(e);
	const [n, a] = Eo($z, e);
	return Vz(n, a, e);
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
	if (e.attachments.length > 20 || e.attachments.some((a) => !a.fileNodeId || !a.name))
		return "A message can attach up to 20 named files.";
	if (e.mentions.length > 50 || e.mentions.some((a) => !a)) return "A message can mention up to 50 people.";
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
		get: (a) => e.get(a) ?? Yz,
		subscribe: (a) => (
			n.add(a),
			() => {
				n.delete(a);
			}
		),
		set: (a, u) => {
			if (u.text.length > 16384) return "This draft is too long. Shorten it before adding more text.";
			if (u.mentions.length > 50) return "A message can mention up to 50 people.";
			const l = u.text !== "" || u.attachments.length > 0 || u.pending.length > 0;
			if (l && !e.has(a) && e.size >= 20) return "You have 20 saved drafts. Send or clear one before starting another.";
			if (
				u.pending.length > 5 ||
				[...e.entries()].reduce((o, [f, h]) => o + (f === a ? 0 : h.pending.length), u.pending.length) > 20
			)
				return "Retry or remove an unconfirmed message before sending another.";
			l ? e.set(a, u) : e.delete(a);
			for (const o of n) o();
			return null;
		},
	};
}
function OS(e, n) {
	let a = F0.get(e);
	a || ((a = Fz()), F0.set(e, a));
	const u = a;
	return {
		value: (0, w.useSyncExternalStore)(u.subscribe, () => u.get(n)),
		get: () => u.get(n),
		set: (l) => u.set(n, l),
	};
}
var Kz = 3 * 1024 * 1024;
function NS(e) {
	const n = "rootMessageId" in e.target,
		a = Kz - (n ? 32 * 1024 : 0),
		u = Ye(Se.messages.latest_roots, e.enabled && "channelId" in e.target ? e.target : "skip"),
		l = Ye(Se.messages.latest_replies, e.enabled && "rootMessageId" in e.target ? e.target : "skip"),
		o = n ? l : u,
		[f, h] = (0, w.useState)(null),
		m = (0, w.useRef)(0),
		v = (0, w.useRef)(new Map()),
		y = (0, w.useRef)({ head: null, rows: [] }),
		_ = "rootMessageId" in e.target ? e.target.rootMessageId : e.target.channelId,
		p = e.enabled && o !== null,
		S = qd(
			(0, w.useMemo)(
				() =>
					Object.fromEntries(
						(p ? (f?.pages ?? []) : []).map(($) => [
							String($.id),
							{
								query: n ? Se.messages.list_replies : Se.messages.list_roots,
								args: {
									...(n ? { rootMessageId: _ } : { channelId: _ }),
									anchorSequence: f.anchor,
									paginationOpts: {
										numItems: 50,
										cursor: $.cursor,
										...($.endCursor ? { endCursor: $.endCursor } : {}),
									},
								},
							},
						]),
					),
				[p, f, n, _],
			),
		),
		E = o === void 0 && e.retain ? y.current.head : (o ?? null),
		C = new Set(f?.pages.map(($) => $.id));
	for (const $ of v.current.keys()) (!C.has($) || o === null || (!e.enabled && !e.retain)) && v.current.delete($);
	const T =
			f?.pages.map(($) => {
				const te = S[String($.id)];
				return (
					e.enabled && o !== null && te && !(te instanceof Error) && v.current.set($.id, te),
					{ descriptor: $, result: te ?? v.current.get($.id) }
				);
			}) ?? [],
		D = T.find(($) => $.result instanceof Error)?.result,
		A = T.filter(($) => $.result !== void 0 && !($.result instanceof Error)),
		M = f === null ? (E?.messages ?? []) : A.flatMap(($) => $.result.page),
		R = o === null ? [] : e.enabled ? M : e.retain ? y.current.rows : [],
		N = new TextEncoder().encode(JSON.stringify({ rows: R, head: E })).byteLength,
		Z = A.at(-1),
		U = e.enabled && o !== null && (E === null || T.some(($) => S[String($.descriptor.id)] === void 0));
	((0, w.useEffect)(() => {
		!e.enabled && !e.retain
			? ((y.current = { head: null, rows: [] }), h(null))
			: e.enabled && (y.current = { head: E, rows: R });
	}, [e.enabled, e.retain, E, R]),
		(0, w.useEffect)(() => {
			if (!f || !e.enabled) return;
			const $ = A.some(({ descriptor: te, result: ne }) => !te.endCursor && !ne.isDone);
			if (A.some(({ result: te }) => te.pageStatus === "SplitRequired")) {
				const te = R[0]?.sequence ?? f.anchor;
				h({ anchor: te, pages: [{ id: ++m.current, cursor: null }], newerAnchor: f.newerAnchor, extend: !1 });
			} else
				N > a && f.pages.length > 1
					? h({ ...f, pages: f.pages.slice(1), newerAnchor: R[0]?.sequence ?? f.anchor })
					: f.extend && Z
						? h({
								...f,
								extend: !1,
								pages: Z.result.isDone
									? f.pages
									: [
											...f.pages.map((te) => ({ ...te, endCursor: Z.result.continueCursor })),
											{ id: ++m.current, cursor: Z.result.continueCursor },
										],
							})
						: $ &&
							h({
								...f,
								pages: f.pages.map((te) => {
									const ne = S[String(te.id)];
									return !te.endCursor && ne && !(ne instanceof Error) && !ne.isDone
										? { ...te, endCursor: ne.continueCursor }
										: te;
								}),
							});
		}, [f, e.enabled, S, N]));
	const j = () => h(null),
		I = () => {
			if (!e.enabled || U || !E) return;
			if (!f) {
				(E.messages.at(-1)?.sequence ?? 0) > 1 &&
					h({ anchor: E.sequence, pages: [{ id: ++m.current, cursor: null }], newerAnchor: E.sequence, extend: !0 });
				return;
			}
			if (!Z || Z.result.isDone) return;
			const $ = [...f.pages, { id: ++m.current, cursor: Z.result.continueCursor }],
				te = n ? 2 : 5;
			h({ ...f, pages: $.slice(-te), newerAnchor: $.length > te ? (R[0]?.sequence ?? f.anchor) : f.newerAnchor });
		},
		L = () => {
			!f?.newerAnchor ||
				!e.enabled ||
				U ||
				(f.newerAnchor >= (E?.sequence ?? 0)
					? j()
					: h({
							anchor: f.newerAnchor,
							pages: [{ id: ++m.current, cursor: null }],
							newerAnchor: Math.min(E?.sequence ?? f.newerAnchor, f.newerAnchor + 50),
							extend: !1,
						}));
		};
	return {
		rows: R,
		denied: o === null,
		loading: U,
		error:
			o === null ? "Messages are unavailable. Your access may have changed." : D instanceof Error ? D.message : null,
		sequence: E?.sequence ?? 0,
		atLatest: f === null,
		hasOlder: f === null ? (E?.messages.at(-1)?.sequence ?? 0) > 1 : !!Z && !Z.result.isDone,
		hasNewer: f !== null,
		newCount: f ? Math.max(0, (E?.sequence ?? 0) - f.anchor) : 0,
		older: I,
		newer: L,
		latest: j,
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
	const a = new TextEncoder().encode(n).slice(0, K0);
	return new TextDecoder().decode(a).replace(/�$/, "");
}
function MS(e) {
	const n = Hn(),
		a = ja(Se.messages.send),
		u = ja(Se.messages.reply),
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
			const p = { clientRequestId: _.clientRequestId, text: _.text, attachments: _.attachments, mentions: _.mentions },
				S = () => (e.rootMessageId ? u({ ...p, rootMessageId: e.rootMessageId }) : a({ ...p, channelId: e.channelId }));
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
		enqueue: (_, p, S) => {
			if (!e.canWrite || !n.canSend || !n.can_request_now())
				return (m("Chitchat is reconnecting or read-only. Your draft is kept."), !1);
			const E = RS({ text: _, attachments: p, mentions: S, authorName: Xz(n.member?.displayName ?? null) });
			if (E) return (m(E), !1);
			const C = {
					clientRequestId: crypto.randomUUID(),
					text: _,
					attachments: p,
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
	const [n, a] = (0, w.useState)({}),
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
			a(Object.fromEntries(_.body.items.map((S) => [S.fileNodeId, S.url])));
			const p = _.body.errors.find((S) => S.fileNodeId === y);
			p && f(p.message);
		} catch (_) {
			f(so(_));
		} finally {
			l(!1);
		}
	};
	return (0, b.jsxs)("div", {
		className: "message-attachments",
		children: [
			e.attachments.map((y) =>
				(0, b.jsx)(
					"span",
					{
						className: "attachment",
						children: n[y.fileNodeId]
							? (0, b.jsxs)(b.Fragment, {
									children: [
										(0, b.jsx)("a", {
											ref: (_) => {
												_ ? h.current.set(y.fileNodeId, _) : h.current.delete(y.fileNodeId);
											},
											className: "attachment-link",
											href: n[y.fileNodeId],
											target: "_blank",
											rel: "noopener noreferrer",
											children: y.name,
										}),
										(0, b.jsx)("button", {
											type: "button",
											className: "attachment-button",
											disabled: u,
											onClick: () => void v(y.fileNodeId),
											children: "Refresh link",
										}),
									],
								})
							: (0, b.jsx)("button", {
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
			o ? (0, b.jsx)("span", { className: "attachment-error", role: "alert", children: o }) : null,
		],
	});
}
function Wz(e) {
	const n = (0, w.useId)(),
		[a, u] = (0, w.useState)([]),
		[l, o] = (0, w.useState)(null),
		[f, h] = (0, w.useState)(null),
		[m, v] = (0, w.useState)(!1),
		[y, _] = (0, w.useState)(!0),
		[p, S] = (0, w.useState)(null),
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
		(0, b.jsxs)(Zr, {
			labelledBy: n,
			onClose: e.onClose,
			children: [
				(0, b.jsx)("h2", { id: n, className: "dialog-title", children: "Attach a file" }),
				(0, b.jsx)("button", {
					type: "button",
					className: "button",
					"data-dialog-initial": !0,
					onClick: e.onClose,
					children: "Cancel",
				}),
				(0, b.jsx)("ul", {
					className: "picker-list",
					children: a.map((T) =>
						(0, b.jsx)(
							"li",
							{
								children: (0, b.jsxs)("button", {
									type: "button",
									className: "picker-item",
									onClick: () => e.onPick({ fileNodeId: T.nodeId, name: T.name }),
									children: [
										(0, b.jsx)("span", { className: "picker-item-name", children: T.name }),
										(0, b.jsx)("span", { className: "picker-item-path", children: T.path }),
									],
								}),
							},
							T.nodeId,
						),
					),
				}),
				y ? (0, b.jsx)("p", { role: "status", children: "Loading files…" }) : null,
				p
					? (0, b.jsxs)("p", {
							role: "alert",
							children: [p, " ", (0, b.jsx)("button", { type: "button", onClick: () => C(E + 1), children: "Retry" })],
						})
					: null,
				!y && !p && a.length === 0
					? (0, b.jsx)("p", { children: m ? "No files found." : "No matching files on this page." })
					: null,
				l !== null
					? (0, b.jsx)("button", {
							type: "button",
							className: "button",
							disabled: y,
							onClick: () => o(null),
							children: "First page",
						})
					: null,
				m
					? null
					: (0, b.jsx)("button", {
							type: "button",
							className: "button",
							disabled: y || !!p,
							onClick: () => o(f),
							children: "Next files",
						}),
			],
		})
	);
}
function zS(e) {
	const n = (0, w.useId)(),
		a = (0, w.useId)(),
		u = Hn(),
		[l, o] = (0, w.useState)(!1),
		[f, h] = (0, w.useState)(null),
		[m, v] = (0, w.useState)(null),
		[y, _] = (0, w.useState)(null),
		p = Ye(Se.members.list, m !== null && u.ready ? { paginationOpts: { numItems: 100, cursor: y } } : "skip"),
		S = e.draft.value.text,
		E = (0, w.useRef)(null),
		C = (0, w.useRef)(null),
		T = Hz({
			placement: "top-start",
			resetValueOnHide: !1,
			setOpen: (U) => {
				U || v(null);
			},
		}),
		D = m && p ? oE(p.page, m.query, e.userId).slice(0, 8) : [],
		A = m !== null && u.ready,
		M = (U) => h(e.draft.set({ ...e.draft.get(), ...U })),
		R = (U) => {
			if (!m) return;
			const j = cE(S, m.start, E.current?.selectionStart ?? S.length, U.label),
				I = new Map(e.draft.value.mentions);
			(I.set(U.userId, U.label), M({ text: j.text, mentions: [...I] }), (C.current = j.caret), T.hide());
		},
		N = () => {
			if (e.busy || e.disabled) return;
			const U = S.trim();
			(!U && e.draft.value.attachments.length === 0) ||
				(e.onSend(U, e.draft.value.attachments, fE(e.draft.value.mentions, U)) && T.hide());
		},
		Z = (U) => {
			if (!(U.nativeEvent.isComposing || U.keyCode === 229)) {
				if (A) {
					if (U.key === "ArrowLeft" || U.key === "ArrowRight") {
						T.hide();
						return;
					}
					if (U.key === "Escape") {
						(U.preventDefault(), U.stopPropagation(), T.hide());
						return;
					}
					if ((U.key === "Enter" || U.key === "Tab") && !U.shiftKey && D.length) {
						(U.preventDefault(), R(D.find((j) => `${a}-${j.userId}` === T.getState().activeId) ?? D[0]));
						return;
					}
				}
				U.key === "Enter" && !U.shiftKey && (U.preventDefault(), N());
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
		(0, b.jsxs)("div", {
			className: "composer",
			children: [
				e.draft.value.attachments.length
					? (0, b.jsx)("ul", {
							className: "composer-attachments",
							children: e.draft.value.attachments.map((U) =>
								(0, b.jsxs)(
									"li",
									{
										className: "composer-attachment",
										children: [
											(0, b.jsx)("span", { children: U.name }),
											(0, b.jsx)("button", {
												type: "button",
												className: "composer-attachment-remove",
												"aria-label": `Remove attachment ${U.name}`,
												onClick: () =>
													M({ attachments: e.draft.value.attachments.filter((j) => j.fileNodeId !== U.fileNodeId) }),
												children: "×",
											}),
										],
									},
									U.fileNodeId,
								),
							),
						})
					: null,
				(0, b.jsxs)("div", {
					className: "composer-bar",
					children: [
						(0, b.jsx)(Az, {
							store: T,
							autoSelect: !0,
							value: S,
							showOnClick: !1,
							showOnChange: !1,
							showOnKeyPress: !1,
							setValueOnChange: !1,
							render: (0, b.jsx)("textarea", {
								ref: E,
								className: "composer-input",
								"aria-label": e.label,
								"aria-describedby": n,
								placeholder: e.label,
								rows: 1,
								onChange: (U) => {
									const j = U.currentTarget.value;
									M({ text: j });
									const I = lE(j, U.currentTarget.selectionStart);
									(v(I), T.setValue(I?.query ?? ""));
								},
								onKeyDown: Z,
								onPointerDown: T.hide,
								onScroll: T.render,
							}),
						}),
						(0, b.jsx)("button", {
							type: "button",
							className: "composer-action",
							"aria-label": "Attach file",
							disabled: e.disabled || e.draft.value.attachments.length >= 20,
							onClick: () => o(!0),
							children: (0, b.jsx)(Sz, { size: 18, "aria-hidden": "true" }),
						}),
						(0, b.jsx)("button", {
							type: "button",
							className: "composer-action composer-send",
							"aria-label": e.busy ? "Sending…" : "Send",
							disabled: e.busy || e.disabled,
							onClick: N,
							children: (0, b.jsx)(gz, { size: 18, "aria-hidden": "true" }),
						}),
					],
				}),
				(0, b.jsxs)(Uz, {
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
						p ? null : (0, b.jsx)("div", { role: "status", children: "Loading people…" }),
						p && D.length === 0 ? (0, b.jsx)("div", { role: "status", children: "No match on this page." }) : null,
						D.map((U) =>
							(0, b.jsx)(
								zz,
								{
									id: `${a}-${U.userId}`,
									value: U.label,
									setValueOnClick: !1,
									focusOnHover: !0,
									className: "mention-option",
									onMouseDown: (j) => j.preventDefault(),
									onClick: () => R(U),
									children: U.label,
								},
								U.userId,
							),
						),
						y !== null
							? (0, b.jsx)("button", { type: "button", onClick: () => _(null), children: "First people" })
							: null,
						p && !p.isDone
							? (0, b.jsx)("button", { type: "button", onClick: () => _(p.continueCursor), children: "Next people" })
							: null,
					],
				}),
				(0, b.jsx)("span", { id: n, className: "composer-hint", children: "Enter sends · Shift+Enter for a new line" }),
				f ? (0, b.jsx)("p", { className: "form-error", role: "alert", children: f }) : null,
				l
					? (0, b.jsx)(Wz, {
							client: e.client,
							onClose: () => o(!1),
							onPick: (U) => {
								(e.draft.value.attachments.some((j) => j.fileNodeId === U.fileNodeId) ||
									M({ attachments: [...e.draft.value.attachments, U] }),
									o(!1));
							},
						})
					: null,
			],
		})
	);
}
function ek(e) {
	const [n, a] = (0, w.useState)(!1),
		u = (0, w.useRef)(null),
		l = (0, w.useRef)([]);
	(0, w.useEffect)(() => {
		n && l.current[0]?.focus();
	}, [n]);
	const o = () => {
		(a(!1), u.current?.focus());
	};
	return (0, b.jsxs)("span", {
		className: "add-reaction",
		children: [
			(0, b.jsx)("button", {
				ref: u,
				type: "button",
				className: "button message-action",
				disabled: e.disabled,
				"aria-expanded": n,
				onClick: () => (n ? o() : a(!0)),
				children: "Add reaction",
			}),
			n
				? (0, b.jsx)("span", {
						className: "reaction-palette",
						role: "group",
						"aria-label": "Choose a reaction",
						children: uE.map((f, h) => {
							const m = e.groups.some((v) => v.token === f && v.reactedByMe);
							return (0, b.jsx)(
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
									children: (0, b.jsx)("span", { "aria-hidden": "true", children: Nb[f] }),
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
function ik(e, n, a) {
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
			: (0, b.jsxs)("span", { className: f.id === a ? "mention mention-self" : "mention", children: ["@", f.name] }, h),
	);
}
function DS(e) {
	const { doc: n } = e,
		a = Hn(),
		u = Ye(Se.reactions.get_for_message, a.ready ? { messageId: n._id } : "skip"),
		l = Ye(Se.threads.get_summary, e.onOpenThread && a.ready ? { rootMessageId: n._id } : "skip"),
		o = ja(Se.messages.edit),
		f = ja(Se.messages.remove),
		h = ja(Se.reactions.set),
		[m, v] = (0, w.useState)(!1),
		[y, _] = (0, w.useState)(""),
		[p, S] = (0, w.useState)(!1),
		[E, C] = (0, w.useState)(!1),
		[T, D] = (0, w.useState)(null),
		[A, M] = (0, w.useState)(!1),
		R = (0, w.useRef)(null),
		N = (0, w.useRef)(null),
		Z = (0, w.useRef)(null),
		U = (0, w.useRef)(null),
		j = (0, w.useId)(),
		I = n.deletedAt !== null,
		L = e.canWrite && a.canSend;
	((0, w.useEffect)(() => {
		m && N.current?.focus();
	}, [m]),
		(0, w.useEffect)(() => {
			if (I) {
				const B = Z.current?.contains(document.activeElement);
				(v(!1), S(!1), B && Z.current?.focus());
			}
		}, [I]));
	const $ = async () => {
			if (!(E || !R.current || !a.can_request_now())) {
				(C(!0), D(null), e.onRequestStart());
				try {
					const B = await R.current();
					if (B._nay) {
						(D(B._nay.message), (R.current = null), M(!1));
						return;
					}
					((R.current = null), M(!1), v(!1), S(!1), queueMicrotask(() => (I ? Z.current : U.current)?.focus()));
				} catch (B) {
					(D(so(B)), M(!0));
				} finally {
					(C(!1), e.onRequestSettled());
				}
			}
		},
		te = () => {
			if (!(!L && !R.current)) {
				if (!R.current) {
					const B = n.mentions.filter((we) => {
							const O = e.memberNames.get(we);
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
				$();
			}
		},
		ne = () => {
			if (!(!L && !R.current)) {
				if (!R.current) {
					const B = { messageId: n._id, clientRequestId: crypto.randomUUID(), expectedRevision: n.revision };
					R.current = () => f(B);
				}
				$();
			}
		},
		K = (B, ue) => {
			if (!L || E || R.current || !a.can_request_now()) return;
			const fe = { messageId: n._id, clientRequestId: crypto.randomUUID(), token: B, on: !ue };
			((R.current = () => h(fe)), $());
		},
		ie = () => {
			E || ((R.current = null), M(!1), v(!1), S(!1), D(null), queueMicrotask(() => U.current?.focus()));
		},
		k = e.memberNames.get(n.authorHostUserId),
		H = Date.now() - n.createdAt < 7 * kS;
	return (0, b.jsxs)("li", {
		ref: Z,
		className: e.isContinuation ? "message is-continuation" : "message is-leader",
		"data-key": n._id,
		tabIndex: -1,
		children: [
			(0, b.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: nk(k) }),
			(0, b.jsxs)("div", {
				className: e.isContinuation ? "message-head visually-hidden" : "message-head",
				children: [
					(0, b.jsx)("span", { className: "message-author", children: k === null ? "Former member" : (k ?? "…") }),
					(0, b.jsxs)("time", {
						className: "message-time",
						dateTime: new Date(n.createdAt).toISOString(),
						children: [
							H ? (0, b.jsxs)("span", { className: "visually-hidden", children: [zd(n.createdAt), " "] }) : null,
							(0, b.jsx)("span", {
								className: "message-clock",
								children: H
									? new Date(n.createdAt).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" })
									: zd(n.createdAt),
							}),
						],
					}),
				],
			}),
			I
				? (0, b.jsx)("p", { className: "message-text is-deleted", children: "Message deleted" })
				: m
					? (0, b.jsxs)("div", {
							className: "message-edit",
							children: [
								(0, b.jsx)("textarea", {
									ref: N,
									className: "composer-input",
									"aria-label": "Edit message",
									value: y,
									readOnly: E || A,
									onChange: (B) => _(B.currentTarget.value),
									onKeyDown: (B) => {
										B.nativeEvent.isComposing ||
											B.keyCode === 229 ||
											(B.key === "Escape"
												? (B.preventDefault(), B.stopPropagation(), ie())
												: B.key === "Enter" && !B.shiftKey && (B.preventDefault(), te()));
									},
								}),
								(0, b.jsxs)("div", {
									className: "message-edit-actions",
									children: [
										(0, b.jsx)("button", {
											type: "button",
											className: "button",
											disabled: E,
											onClick: ie,
											children: "Cancel",
										}),
										(0, b.jsx)("button", {
											type: "button",
											className: "button button-primary",
											disabled: E || (!L && !A),
											onClick: te,
											children: E ? "Saving…" : A ? "Retry" : "Save",
										}),
									],
								}),
							],
						})
					: (0, b.jsxs)(b.Fragment, {
							children: [
								(0, b.jsxs)("p", {
									className: "message-text",
									children: [
										ik(n, e.memberNames, e.userId),
										n.editedAt !== null
											? (0, b.jsx)("span", { className: "message-edited", children: " (edited)" })
											: null,
									],
								}),
								n.attachments.length ? (0, b.jsx)(Jz, { client: e.client, attachments: n.attachments }) : null,
								u?.length
									? (0, b.jsx)("div", {
											className: "message-reactions",
											children: u.map((B) =>
												(0, b.jsxs)(
													"button",
													{
														type: "button",
														disabled: !L || E,
														className: B.reactedByMe ? "reaction-chip is-mine" : "reaction-chip",
														"aria-pressed": B.reactedByMe,
														"aria-label": `${Mb[B.token]}, ${B.count} ${B.count === 1 ? "reaction" : "reactions"}`,
														onClick: () => K(B.token, B.reactedByMe),
														children: [
															(0, b.jsx)("span", { "aria-hidden": "true", children: Nb[B.token] }),
															(0, b.jsx)("span", { className: "reaction-chip-count", children: B.count }),
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
				? (0, b.jsxs)("button", {
						ref: e.replyTriggerRef,
						type: "button",
						className: "message-thread-summary",
						disabled: e.threadDisabled,
						onClick: () => e.onOpenThread?.(n._id),
						children: [
							(0, b.jsx)("span", { className: "message-thread-summary-icon", "aria-hidden": "true", children: "↳" }),
							(0, b.jsxs)("span", {
								className: "message-thread-summary-count",
								children: [l.totalReplyCount, " ", l.totalReplyCount === 1 ? "reply" : "replies"],
							}),
							l?.latestReplyAt
								? (0, b.jsxs)("span", {
										className: "message-thread-summary-recency",
										children: ["Last reply ", uo(l.latestReplyAt, Date.now())],
									})
								: null,
						],
					})
				: null,
			!I && !m
				? (0, b.jsxs)("div", {
						className: "message-actions",
						children: [
							e.onOpenThread && !l?.totalReplyCount
								? (0, b.jsx)("button", {
										ref: e.replyTriggerRef,
										type: "button",
										className: "button message-action",
										disabled: e.threadDisabled,
										onClick: () => e.onOpenThread?.(n._id),
										children: l === void 0 ? "View thread" : "Reply in thread",
									})
								: null,
							(0, b.jsx)(ek, { groups: u ?? [], disabled: !L || E, onPick: K }),
							n.authorHostUserId === e.userId && e.canWrite
								? (0, b.jsxs)(b.Fragment, {
										children: [
											(0, b.jsx)("button", {
												ref: U,
												type: "button",
												className: "button message-action",
												disabled: E || A,
												onClick: () => {
													(_(n.text), v(!0), D(null));
												},
												children: "Edit",
											}),
											(0, b.jsx)("button", {
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
			T && !p
				? (0, b.jsxs)("p", {
						className: "form-error",
						role: "alert",
						children: [
							T,
							A && !m
								? (0, b.jsxs)(b.Fragment, {
										children: [
											(0, b.jsx)("button", {
												type: "button",
												className: "button",
												disabled: E || !a.ready,
												onClick: () => void $(),
												children: "Retry change",
											}),
											(0, b.jsx)("button", {
												type: "button",
												className: "button",
												disabled: E,
												onClick: ie,
												children: "Dismiss",
											}),
										],
									})
								: null,
						],
					})
				: null,
			p
				? (0, b.jsxs)(Zr, {
						labelledBy: j,
						onClose: ie,
						children: [
							(0, b.jsx)("h2", { id: j, className: "dialog-title", children: "Delete message?" }),
							(0, b.jsx)("p", { children: "The message is replaced by a “Message deleted” placeholder for everyone." }),
							T ? (0, b.jsx)("p", { className: "form-error", role: "alert", children: T }) : null,
							(0, b.jsxs)("div", {
								className: "dialog-actions",
								children: [
									(0, b.jsx)("button", {
										type: "button",
										className: "button",
										"data-dialog-initial": !0,
										disabled: E,
										onClick: ie,
										children: "Cancel",
									}),
									(0, b.jsx)("button", {
										type: "button",
										className: "button button-danger",
										disabled: E || (!L && !A),
										onClick: ne,
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
	return (0, b.jsx)(b.Fragment, {
		children: e.draft.value.pending.map((n) =>
			(0, b.jsxs)(
				"li",
				{
					className: n.status === "failed" ? "message is-leader is-pending is-failed" : "message is-leader is-pending",
					children: [
						(0, b.jsx)("span", { className: "message-avatar", "aria-hidden": "true", children: "•" }),
						(0, b.jsxs)("div", {
							className: "message-head",
							children: [
								(0, b.jsx)("span", { className: "message-author", children: "You" }),
								(0, b.jsx)("span", {
									className: "message-time",
									children: n.status === "sending" ? "Sending…" : "Not confirmed",
								}),
							],
						}),
						(0, b.jsx)("p", { className: "message-text", children: n.text }),
						n.attachments.length
							? (0, b.jsx)("p", { className: "message-text", children: n.attachments.map((a) => a.name).join(", ") })
							: null,
						n.status === "failed"
							? (0, b.jsxs)("div", {
									className: "message-send-error",
									role: "alert",
									children: [
										(0, b.jsx)("span", { children: n.error }),
										(0, b.jsx)("button", {
											type: "button",
											className: "button",
											disabled: e.disabled || e.queue.busy,
											onClick: () => e.queue.retry(n),
											children: "Retry sending message",
										}),
										(0, b.jsx)("button", {
											type: "button",
											className: "button",
											onClick: () =>
												e.draft.set({
													...e.draft.get(),
													pending: e.draft.get().pending.filter((a) => a.clientRequestId !== n.clientRequestId),
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
	return (0, b.jsxs)("div", {
		className: "log-older",
		children: [
			e.window.hasOlder
				? (0, b.jsx)("button", {
						type: "button",
						className: "button",
						disabled: e.disabled || e.window.loading,
						onClick: e.window.older,
						children: "Load older",
					})
				: null,
			e.window.hasNewer
				? (0, b.jsxs)(b.Fragment, {
						children: [
							(0, b.jsx)("button", {
								type: "button",
								className: "button",
								disabled: e.disabled || e.window.loading,
								onClick: e.window.newer,
								children: "Newer messages",
							}),
							(0, b.jsxs)("button", {
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
				? (0, b.jsxs)("p", {
						className: "form-error",
						role: "alert",
						children: [
							e.window.error,
							(0, b.jsx)("button", { type: "button", onClick: e.window.latest, children: "Reload messages" }),
						],
					})
				: null,
		],
	});
}
function US(e) {
	const n = [...e.rows].reverse();
	let a = !1;
	return (0, b.jsx)(b.Fragment, {
		children: n.map((u, l) => {
			const o = n[l - 1],
				f = o && new Date(o.createdAt).toDateString() !== new Date(u.createdAt).toDateString(),
				h =
					!a &&
					e.readSequence !== void 0 &&
					u.sequence > e.readSequence &&
					u.authorHostUserId !== e.userId &&
					u.deletedAt === null;
			h && (a = !0);
			const m = !!o && !f && !h && o.authorHostUserId === u.authorHostUserId && u.createdAt - o.createdAt <= 3e5;
			return (0, b.jsx)(
				ak,
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
function ak(e) {
	return (0, b.jsxs)(b.Fragment, {
		children: [
			e.newDay ? (0, b.jsx)("li", { className: "day-divider", children: e.newDay }) : null,
			e.newMark
				? (0, b.jsx)("li", {
						className: "new-divider",
						children: (0, b.jsx)("span", { className: "new-divider-label", children: "New messages" }),
					})
				: null,
			(0, b.jsx)(DS, { ...e }),
		],
	});
}
function rk(e) {
	const n = Hn(),
		a = n.ready && e.channel !== null,
		u = Ye(Se.messages.get, a ? { messageId: e.rootMessageId } : "skip"),
		l = (0, w.useRef)(u);
	(u && (l.current = u), !a && !n.refreshing && (l.current = null));
	const o = u ?? (n.refreshing ? l.current : null),
		f = NS({ target: { rootMessageId: e.rootMessageId }, enabled: a && u !== null, retain: n.refreshing }),
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
		p = (0, w.useRef)(null);
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
				else if (p.current) {
					const S = [...y.current.querySelectorAll("[data-key]")].find((E) => E.dataset.key === p.current.id);
					S && (y.current.scrollTop += S.getBoundingClientRect().top - p.current.top);
				}
			}
		}, [f.rows, f.atLatest]),
		(0, b.jsxs)("section", {
			className: "thread",
			"aria-label": "Thread",
			onKeyDown: (S) => {
				S.key === "Escape" &&
					(S.stopPropagation(),
					e.sendInFlight
						? e.announce("Wait for pending message changes to finish before closing the thread.")
						: e.onClose());
			},
			children: [
				(0, b.jsxs)("div", {
					className: "thread-head",
					children: [
						(0, b.jsx)("h3", { className: "thread-title", children: "Thread" }),
						(0, b.jsx)("button", {
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
					? (0, b.jsx)("ul", {
							className: "message-list thread-root",
							children: (0, b.jsx)(DS, { ...e, doc: o, isContinuation: !1 }),
						})
					: (0, b.jsx)("p", {
							className: "channel-status",
							children: a && u === void 0 ? "Loading thread…" : "This thread is unavailable.",
						}),
				(0, b.jsxs)("div", {
					ref: y,
					className: "thread-replies",
					onScroll: () => {
						const S = y.current;
						if (!S) return;
						_.current = S.scrollHeight - S.scrollTop - S.clientHeight < 80;
						const E = [...S.querySelectorAll("[data-key]")].find(
							(C) => C.getBoundingClientRect().bottom >= S.getBoundingClientRect().top,
						);
						p.current = E ? { id: E.dataset.key, top: E.getBoundingClientRect().top } : null;
					},
					children: [
						(0, b.jsx)(qS, { window: f, disabled: e.sendInFlight || !a }),
						f.loading
							? (0, b.jsx)("p", { className: "channel-status", role: "status", children: "Loading replies…" })
							: null,
						a && !f.denied && !f.loading && !f.rows.length
							? (0, b.jsx)("p", { className: "channel-status", children: "No replies yet" })
							: null,
						(0, b.jsxs)("ul", {
							className: "message-list",
							children: [
								(0, b.jsx)(US, { ...e, rows: f.rows }),
								(0, b.jsx)(jS, { draft: h, queue: m, disabled: !n.ready || !n.can_request_now() }),
							],
						}),
					],
				}),
				m.error ? (0, b.jsx)("p", { className: "form-error", role: "alert", children: m.error }) : null,
				(0, b.jsx)(zS, {
					client: e.client,
					userId: e.userId,
					draft: h,
					label: "Reply in thread",
					busy: m.busy,
					disabled: !a || !o || f.denied || !e.canWrite || !n.canSend || e.channel?.archivedAt !== null,
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
	return (0, b.jsx)(lk, { ...e }, `${e.userId}:${e.channelId}`);
}
function lk(e) {
	const n = Hn(),
		a = n.ready && e.channel !== null,
		u = NS({ target: { channelId: e.channelId }, enabled: a, retain: n.refreshing }),
		l = OS(e.client, `${e.userId}:${e.channelId}`),
		o = MS({
			...e,
			rootMessageId: null,
			draft: l,
			canWrite: e.canWrite && !u.denied && e.channel?.archivedAt === null,
		}),
		f = (0, w.useRef)(null),
		h = (0, w.useRef)(null),
		m = (0, w.useRef)(new Map()),
		v = (0, w.useRef)(!0),
		y = (0, w.useRef)(null),
		_ = (0, w.useRef)(null),
		[p, S] = (0, w.useState)(0),
		[E, C] = (0, w.useState)(dd),
		[T, D] = (0, w.useState)(0),
		A = Math.max(Bu, p - uk),
		M = Math.min(A, Math.max(Bu, E));
	((0, w.useEffect)(() => {
		if (!e.threadRootId || !f.current) return;
		const N = f.current;
		S(N.clientWidth);
		const Z = new ResizeObserver(() => S(N.clientWidth));
		return (Z.observe(N), () => Z.disconnect());
	}, [e.threadRootId]),
		(0, w.useEffect)(() => {
			const N = [...new Set(u.rows.map((U) => U.authorHostUserId))],
				Z = [...new Set([...N, ...u.rows.flatMap((U) => U.mentions)])];
			Z.length && e.memberNames.resolve(Z, N);
		}, [u.rows, e.memberNames]),
		(0, w.useLayoutEffect)(() => {
			if (h.current) {
				if (v.current && u.atLatest) ((h.current.scrollTop = h.current.scrollHeight), D(u.sequence));
				else if (y.current) {
					const N = [...h.current.querySelectorAll("[data-key]")].find((Z) => Z.dataset.key === y.current.id);
					N && (h.current.scrollTop += N.getBoundingClientRect().top - y.current.top);
				}
			}
		}, [u.rows, u.atLatest, u.sequence]),
		(0, w.useEffect)(() => {
			(_.current !== null && u.sequence > _.current && u.atLatest && e.announce("New messages in this channel."),
				(_.current = u.sequence));
		}, [u.sequence, u.atLatest, e.announce]),
		(0, w.useEffect)(() => {
			const N = () => {
				a &&
					u.atLatest &&
					v.current &&
					document.visibilityState === "visible" &&
					T === u.sequence &&
					e.onObservedRead({ rootSequence: T, replySequence: e.channel?.lastReplySequence ?? 0 });
			};
			return (
				N(),
				document.addEventListener("visibilitychange", N),
				() => document.removeEventListener("visibilitychange", N)
			);
		}, [a, u.atLatest, T, u.sequence, e.channel?.lastReplySequence, e.onObservedRead]));
	const R = () => {
		if (e.sendInFlight) return;
		const N = e.threadRootId;
		(e.setThreadRootId(null), N && queueMicrotask(() => (m.current.get(N) ?? h.current)?.focus()));
	};
	return (0, b.jsxs)("div", {
		className: "channel",
		children: [
			(0, b.jsxs)("header", {
				className: "channel-head",
				children: [
					(0, b.jsxs)("div", {
						className: "channel-head-main",
						children: [
							(0, b.jsx)("h2", {
								className: "channel-title",
								children: e.channel ? `#${e.channel.name}` : "Channel unavailable",
							}),
							e.channel?.topic ? (0, b.jsx)("p", { className: "channel-topic", children: e.channel.topic }) : null,
							e.channel?.visibility === "private"
								? (0, b.jsx)("p", { className: "channel-privacy", children: Ud })
								: null,
						],
					}),
					e.channel?.archivedAt
						? (0, b.jsx)("span", { className: "channel-archived-badge", children: "Archived" })
						: null,
				],
			}),
			(0, b.jsxs)("div", {
				ref: f,
				className: "channel-body",
				style: { "--thread-width": `${M}px` },
				children: [
					(0, b.jsxs)("div", {
						ref: h,
						className: "message-log",
						role: "log",
						tabIndex: 0,
						"aria-live": "off",
						"aria-label": e.channel ? `Messages in #${e.channel.name}` : "Messages",
						onScroll: () => {
							const N = h.current;
							if (!N) return;
							((v.current = N.scrollHeight - N.scrollTop - N.clientHeight < 80),
								v.current && u.atLatest && D(u.sequence));
							const Z = [...N.querySelectorAll("[data-key]")].find(
								(U) => U.getBoundingClientRect().bottom >= N.getBoundingClientRect().top,
							);
							y.current = Z ? { id: Z.dataset.key, top: Z.getBoundingClientRect().top } : null;
						},
						children: [
							!a && !n.refreshing
								? (0, b.jsx)("p", {
										className: "channel-status",
										role: "status",
										children: "Messages are hidden until Chitchat can confirm your access. Your draft is kept.",
									})
								: null,
							(0, b.jsx)(qS, { window: u, disabled: e.sendInFlight || !a }),
							u.loading
								? (0, b.jsx)("p", { className: "channel-status", role: "status", children: "Loading messages…" })
								: null,
							a && !u.denied && !u.loading && !u.rows.length && !l.value.pending.length
								? (0, b.jsx)("p", { className: "channel-status", children: "No messages yet" })
								: null,
							(0, b.jsxs)("ul", {
								className: "message-list",
								children: [
									(0, b.jsx)(US, {
										...e,
										rows: u.rows,
										readSequence: e.openedAtReadSequence,
										onOpenThread: (N) => {
											e.sendInFlight || e.setThreadRootId(N);
										},
										threadDisabled: e.sendInFlight,
										setReplyTrigger: (N, Z) => {
											Z ? m.current.set(N, Z) : m.current.delete(N);
										},
									}),
									(0, b.jsx)(jS, { draft: l, queue: o, disabled: !n.ready || !n.can_request_now() }),
								],
							}),
						],
					}),
					e.threadRootId
						? (0, b.jsxs)(b.Fragment, {
								children: [
									(0, b.jsx)("div", {
										className: "thread-resize",
										role: "separator",
										tabIndex: 0,
										"aria-orientation": "vertical",
										"aria-label": "Resize thread panel",
										"aria-valuenow": M,
										"aria-valuemin": Bu,
										"aria-valuemax": A,
										onKeyDown: (N) => {
											["ArrowLeft", "ArrowRight", "Home"].includes(N.key) &&
												(N.preventDefault(),
												C(Math.min(A, Math.max(Bu, N.key === "Home" ? dd : M + (N.key === "ArrowLeft" ? 16 : -16)))));
										},
										onPointerDown: (N) => {
											(N.preventDefault(), N.currentTarget.setPointerCapture(N.pointerId));
										},
										onPointerMove: (N) => {
											N.currentTarget.hasPointerCapture(N.pointerId) &&
												f.current &&
												C(Math.min(A, Math.max(Bu, f.current.getBoundingClientRect().right - N.clientX)));
										},
										onDoubleClick: () => C(dd),
									}),
									(0, b.jsx)(rk, { ...e, rootMessageId: e.threadRootId, onClose: R }, e.threadRootId),
								],
							})
						: null,
				],
			}),
			e.sendInFlight
				? (0, b.jsx)("p", {
						className: "channel-status",
						role: "status",
						children: "Wait for pending message changes to finish before leaving this channel or thread.",
					})
				: null,
			o.error ? (0, b.jsx)("p", { className: "form-error", role: "alert", children: o.error }) : null,
			(0, b.jsx)(zS, {
				client: e.client,
				userId: e.userId,
				draft: l,
				label: e.channel ? `Message #${e.channel.name}` : "Message draft",
				busy: o.busy,
				disabled: !a || u.denied || !e.canWrite || !n.canSend || !e.online || e.channel?.archivedAt !== null,
				onSend: o.enqueue,
			}),
		],
	});
}
function ok(e) {
	const n = Hn(),
		a = Ye(Se.transcripts.status, n.ready ? { channelId: e.channelId } : "skip"),
		u = Ab(Se.transcripts.connect),
		l = ja(Se.transcripts.retry),
		o = ja(Se.transcripts.reconcile),
		[f, h] = (0, w.useState)(!1),
		[m, v] = (0, w.useState)(null),
		[y, _] = (0, w.useState)(!1),
		[p, S] = (0, w.useState)(!1),
		E = (0, w.useRef)(null),
		C = (0, w.useRef)(null),
		T = (0, w.useId)(),
		D = (0, w.useId)(),
		A = async () => {
			if (!(f || !n.can_request_now())) {
				((E.current ??= crypto.randomUUID()), h(!0), v(null));
				try {
					const N = await e.client.getToken();
					if (!n.can_request_now()) return;
					const Z = await u({ channelId: e.channelId, pluginToken: N, clientRequestId: E.current });
					Z._nay ? v(Z._nay.message) : (E.current = null);
				} catch {
					v("Could not confirm the Files connection. Retry to check it.");
				} finally {
					h(!1);
				}
			}
		},
		M = async () => {
			if (!(f || !n.can_request_now())) {
				(h(!0), v(null));
				try {
					const N = await l({ channelId: e.channelId });
					N._nay && v(N._nay.message);
				} catch {
					v("Could not restart transcript sync. Try again.");
				} finally {
					h(!1);
				}
			}
		},
		R = async () => {
			if (!(f || !p || !a?.canReconcile || !n.canSend || !n.can_request_now())) {
				((C.current ??= crypto.randomUUID()), h(!0), v(null));
				try {
					const N = await o({ channelId: e.channelId, clientRequestId: C.current });
					N._nay ? v(N._nay.message) : ((C.current = null), _(!1), S(!1));
				} catch {
					v("Could not confirm the rebuild request. Retry to check it.");
				} finally {
					h(!1);
				}
			}
		};
	return (0, b.jsxs)(b.Fragment, {
		children: [
			(0, b.jsxs)("div", {
				className: "transcript-status",
				children: [
					(0, b.jsx)("span", {
						role: "status",
						children: a
							? a.status === "ready"
								? a.indexStatus === "blocked"
									? "Chat is saved. The channel index needs attention."
									: a.indexStatus === "ready"
										? "Saved in Files"
										: "Channel saved. Updating the channel index…"
								: a.status === "not_connected"
									? "Chat is saved. Connect Files to keep Markdown copies."
									: a.status === "blocked"
										? "Chat is saved. Transcript sync needs attention."
										: "Chat is saved. Updating Files…"
							: "Checking transcript access…",
					}),
					a?.canConnect
						? (0, b.jsx)("button", {
								type: "button",
								className: "button",
								disabled: f || !n.connected,
								onClick: () => void A(),
								children: f ? "Connecting…" : a.status === "not_connected" ? "Connect Files" : "Reconnect Files",
							})
						: null,
					(a?.status === "blocked" || a?.indexStatus === "blocked") && a.canConnect
						? (0, b.jsx)("button", {
								type: "button",
								className: "button",
								disabled: f || !n.connected,
								onClick: () => void M(),
								children: "Retry sync",
							})
						: null,
					a
						? (0, b.jsxs)("details", {
								children: [
									(0, b.jsx)("summary", { children: "Transcript details" }),
									a.folderPath
										? (0, b.jsxs)("p", {
												children: ["Folder in Press Files: ", (0, b.jsx)("code", { children: a.folderPath })],
											})
										: null,
									a.readerMode === "manual"
										? (0, b.jsx)("p", { children: "Files sharing is managed in Press." })
										: null,
									a.error ? (0, b.jsx)("p", { role: "alert", children: a.error }) : null,
									(0, b.jsxs)("p", {
										children: [
											"Channel index:",
											" ",
											a.indexStatus === "ready"
												? "saved"
												: a.indexStatus === "blocked"
													? "needs attention"
													: "updating",
											".",
										],
									}),
									a.indexError ? (0, b.jsx)("p", { role: "alert", children: a.indexError }) : null,
									a.status === "blocked" && a.folderPath
										? (0, b.jsx)("p", {
												children:
													"If folder access is missing, open it in Press Files and allow the Chitchat service account to write there. Then reconnect.",
											})
										: null,
									a.canReconcile
										? (0, b.jsx)("button", {
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
					m && !y ? (0, b.jsx)("span", { role: "alert", children: m }) : null,
				],
			}),
			y
				? (0, b.jsxs)(Zr, {
						labelledBy: T,
						accessUnavailable: !n.refreshing && (!n.ready || a === null),
						onReconnect: n.retry,
						onClose: () => {
							f || _(!1);
						},
						children: [
							(0, b.jsx)("h2", { id: T, className: "dialog-title", children: "Rebuild transcript copies?" }),
							(0, b.jsx)("p", {
								children:
									"This replaces the generated Markdown copies from saved chat. Edits made directly to those copies will be replaced. File sharing and write permissions still apply.",
							}),
							(0, b.jsxs)("label", {
								htmlFor: D,
								children: [
									(0, b.jsx)("input", {
										id: D,
										type: "checkbox",
										checked: p,
										disabled: f,
										onChange: (N) => S(N.currentTarget.checked),
									}),
									"Replace edits in the generated transcripts",
								],
							}),
							m ? (0, b.jsx)("p", { className: "form-error", role: "alert", children: m }) : null,
							(0, b.jsxs)("div", {
								className: "dialog-actions",
								children: [
									(0, b.jsx)("button", {
										type: "button",
										className: "button",
										"data-dialog-initial": !0,
										disabled: f,
										onClick: () => _(!1),
										children: "Cancel",
									}),
									(0, b.jsx)("button", {
										type: "button",
										className: "button button-danger",
										disabled: f || !p || !n.connected,
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
	const a = Hr(),
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
			const p = [...new Set(m)]
					.slice(0, 1e3)
					.filter((C) => !u.current.has(C) || Date.now() - u.current.get(C).at >= 3e5),
				S = new Set(),
				E = [];
			for (const C of p) {
				const T = l.current.get(C);
				T ? (_.has(C) && (T.author = !0), S.add(T.promise)) : E.push(C);
			}
			for (let C = 0; C < E.length; C += 50) {
				const T = E.slice(C, C + 50),
					D = a
						.query(Se.members.resolve, { userIds: T })
						.then((A) => {
							if (!(o.current !== y || !A)) {
								for (const M of T) {
									const R = l.current.get(M)?.author === !0 || u.current.get(M)?.author === !0;
									(u.current.delete(M), u.current.set(M, { name: A[M] ?? null, at: Date.now(), author: R }));
								}
								for (; u.current.size > 1e3; ) {
									const M = [...u.current].find(([, R]) => !R.author)?.[0] ?? u.current.keys().next().value;
									M !== void 0 && u.current.delete(M);
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
		[a, n],
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
	const a = e.get(n);
	return a === void 0 ? "…" : (a ?? "Former member");
}
function fk(e) {
	const n = Ei(`${e.scopeKey}:public`),
		a = Ei(`${e.scopeKey}:private`),
		u = Ye(
			Se.views.unreads,
			e.enabled ? { visibility: "public", paginationOpts: { numItems: 50, cursor: n.cursor } } : "skip",
		),
		l = Ye(
			Se.views.unreads,
			e.enabled ? { visibility: "private", paginationOpts: { numItems: 50, cursor: a.cursor } } : "skip",
		);
	(0, w.useEffect)(() => {
		e.memberNames.resolve((u?.page ?? []).flatMap((f) => (f.latest ? [f.latest.authorHostUserId] : [])));
	}, [u, e.memberNames]);
	const o = n.number === 1 && a.number === 1 && u?.isDone && l?.isDone && u.page.length === 0 && l.page.length === 0;
	return (0, b.jsxs)("section", {
		className: "view",
		"aria-label": "Unreads",
		children: [
			(0, b.jsx)("header", {
				className: "view-head",
				children: (0, b.jsx)("h2", { className: "view-title", children: "Unreads" }),
			}),
			(0, b.jsx)("p", {
				className: "view-note",
				children: "Unread channels across this workspace. Private channels show their name only.",
			}),
			o
				? (0, b.jsx)("p", { className: "channel-status", children: "You are all caught up." })
				: (0, b.jsx)(b.Fragment, {
						children: [
							{ label: "Public channels", page: n, result: u },
							{ label: "Private channels", page: a, result: l },
						].map(({ label: f, page: h, result: m }) =>
							(0, b.jsxs)(
								"section",
								{
									className: "view-group",
									children: [
										(0, b.jsx)("h3", { className: "view-group-title", children: f }),
										m
											? m.page.length === 0
												? (0, b.jsx)("p", { className: "channel-status", children: "No unread channels on this page." })
												: (0, b.jsx)("ul", {
														className: "view-rows",
														children: m.page.map((v) =>
															(0, b.jsx)(
																"li",
																{
																	className: "view-row",
																	children: (0, b.jsxs)("button", {
																		type: "button",
																		className: "view-row-button",
																		onClick: () => e.onOpen(v.channel),
																		children: [
																			(0, b.jsxs)("span", {
																				className: "view-row-title",
																				children: [
																					"#",
																					v.channel.name,
																					v.mentionCount > 0
																						? (0, b.jsxs)("span", {
																								className: "mention-badge",
																								children: [
																									v.mentionCount >= 100 ? "99+" : v.mentionCount,
																									(0, b.jsx)("span", {
																										className: "visually-hidden",
																										children: " mentions of you",
																									}),
																								],
																							})
																						: null,
																				],
																			}),
																			(0, b.jsx)("span", {
																				className: "view-row-time",
																				children: uo(v.lastActivityAt, Date.now()),
																			}),
																			v.latest
																				? (0, b.jsxs)("span", {
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
											: (0, b.jsx)("p", { className: "channel-status", role: "status", children: "Loading unreads…" }),
										(0, b.jsx)(ia, { page: h, result: m, label: f }),
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
	const n = Ei(e.scopeKey),
		a = Ye(Se.views.activity, e.enabled ? { paginationOpts: { numItems: 50, cursor: n.cursor } } : "skip");
	(0, w.useEffect)(() => {
		e.memberNames.resolve((a?.page ?? []).map((l) => l.message.authorHostUserId));
	}, [a, e.memberNames]);
	const u = [];
	for (const l of a?.page ?? []) {
		const o = u[u.length - 1];
		o?.channel._id === l.channel._id
			? o.messages.push(l.message)
			: u.push({ channel: l.channel, messages: [l.message] });
	}
	return (0, b.jsxs)("section", {
		className: "view",
		"aria-label": "Activity",
		children: [
			(0, b.jsx)("header", {
				className: "view-head",
				children: (0, b.jsx)("h2", { className: "view-title", children: "Activity" }),
			}),
			(0, b.jsx)("p", {
				className: "view-note",
				children: "Public messages, newest first. Private channels are not shown here.",
			}),
			a
				? u.length === 0
					? (0, b.jsx)("p", { className: "channel-status", children: "No public messages on this page." })
					: (0, b.jsx)("div", {
							className: "view-groups",
							children: u.map((l, o) =>
								(0, b.jsxs)(
									"section",
									{
										className: "view-group",
										children: [
											(0, b.jsx)("h3", {
												className: "view-group-title",
												children: (0, b.jsxs)("button", {
													type: "button",
													className: "view-group-link",
													onClick: () => e.onOpen(l.channel),
													children: ["#", l.channel.name],
												}),
											}),
											(0, b.jsx)("ul", {
												className: "view-rows",
												children: l.messages.map((f) =>
													(0, b.jsxs)(
														"li",
														{
															className: f.mentions.includes(e.userId) ? "view-row mention-self" : "view-row",
															children: [
																(0, b.jsx)("span", {
																	className: "view-row-title",
																	children: Eh(e.memberNames, f.authorHostUserId),
																}),
																(0, b.jsx)("span", {
																	className: "view-row-time",
																	children: uo(f.createdAt, Date.now()),
																}),
																(0, b.jsx)("span", { className: "view-row-preview", children: f.text.slice(0, 160) }),
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
				: (0, b.jsx)("p", { className: "channel-status", role: "status", children: "Loading activity…" }),
			(0, b.jsx)(ia, { page: n, result: a, label: "Activity" }),
		],
	});
}
function hk(e) {
	const n = Ei(e.scopeKey),
		a = Ye(Se.views.threads, e.enabled ? { paginationOpts: { numItems: 50, cursor: n.cursor } } : "skip");
	return (
		(0, w.useEffect)(() => {
			e.memberNames.resolve((a?.page ?? []).map((u) => u.latest.authorHostUserId));
		}, [a, e.memberNames]),
		(0, b.jsxs)("section", {
			className: "view",
			"aria-label": "Threads",
			children: [
				(0, b.jsx)("header", {
					className: "view-head",
					children: (0, b.jsx)("h2", { className: "view-title", children: "Threads" }),
				}),
				(0, b.jsx)("p", {
					className: "view-note",
					children: "Public threads with replies. Private channels are not shown here.",
				}),
				a
					? a.page.length === 0
						? (0, b.jsx)("p", { className: "channel-status", children: "No thread activity on this page." })
						: (0, b.jsx)("ul", {
								className: "view-rows",
								children: a.page.map((u) =>
									(0, b.jsx)(
										"li",
										{
											className: "view-row",
											children: (0, b.jsxs)("button", {
												type: "button",
												className: "view-row-button",
												onClick: () => e.onOpen(u.channel, u.summary.rootMessageId),
												children: [
													(0, b.jsxs)("span", { className: "view-row-title", children: ["#", u.channel.name] }),
													(0, b.jsx)("span", {
														className: "view-row-time",
														children: uo(u.latest.createdAt, Date.now()),
													}),
													(0, b.jsxs)("span", {
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
					: (0, b.jsx)("p", { className: "channel-status", role: "status", children: "Loading threads…" }),
				(0, b.jsx)(ia, { page: n, result: a, label: "Threads" }),
			],
		})
	);
}
function mk(e) {
	const n = Ye(Se.channels.permissions, e.enabled ? { channelId: e.channel._id } : "skip"),
		a = e.unread instanceof Error ? null : e.unread,
		u = e.channel;
	return (0, b.jsxs)("li", {
		className: "channel-item",
		"data-channel-key": u._id,
		children: [
			(0, b.jsxs)("button", {
				type: "button",
				className: a?.hasUnread || a?.mentionCount ? "channel-link is-unread" : "channel-link",
				"aria-current": e.selected ? "page" : void 0,
				disabled: e.blocked,
				onClick: () => e.onOpen(u),
				children: [
					(0, b.jsx)("span", {
						className: "channel-initial",
						"aria-hidden": "true",
						children: u.name.slice(0, 1).toUpperCase(),
					}),
					(0, b.jsxs)("span", {
						className: "channel-name",
						children: [
							"#",
							u.name,
							u.visibility === "private" ? " (private)" : "",
							u.archivedAt !== null ? " (archived)" : "",
						],
					}),
					a && a.mentionCount > 0
						? (0, b.jsxs)("span", {
								className: "mention-badge",
								children: [
									a.mentionCount >= 100 ? "99+" : a.mentionCount,
									(0, b.jsx)("span", { className: "visually-hidden", children: " unread mentions" }),
								],
							})
						: a?.hasUnread
							? (0, b.jsxs)(b.Fragment, {
									children: [
										(0, b.jsx)("span", { className: "unread-dot", "aria-hidden": "true" }),
										(0, b.jsx)("span", { className: "visually-hidden", children: "unread" }),
									],
								})
							: null,
				],
			}),
			(0, b.jsx)("span", {
				className: "channel-item-actions",
				children: (0, b.jsx)(wz, {
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
			? (0, b.jsxs)("main", {
					className: "page-dead",
					role: "alert",
					children: [
						(0, b.jsx)("h1", { children: "Chitchat" }),
						(0, b.jsx)("p", { children: "Chitchat could not load this view. Press is still available." }),
						(0, b.jsx)("button", {
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
	const n = Hr(),
		a = Hn(),
		u = e.client.context.userId,
		l = `${a.member?.generation ?? "loading"}:${a.member?.membershipLifetime ?? 0}`,
		o = ck(l, a.ready || a.refreshing),
		f = Ei(`${l}:public`),
		h = Ei(`${l}:private`),
		m = Ei(`${l}:archived`),
		v = Ei(`${l}:archived-private`),
		[y, _] = (0, w.useState)(!1),
		p = Ye(
			Se.channels.list_public,
			a.ready ? { archived: !1, paginationOpts: { numItems: 50, cursor: f.cursor } } : "skip",
		),
		S = Ye(
			Se.channels.list_mine,
			a.ready ? { archived: !1, paginationOpts: { numItems: 50, cursor: h.cursor } } : "skip",
		),
		E = Ye(
			Se.channels.list_mine,
			a.ready && y ? { archived: !0, paginationOpts: { numItems: 50, cursor: v.cursor } } : "skip",
		),
		C = Ye(
			Se.channels.list_public,
			a.ready && y ? { archived: !0, paginationOpts: { numItems: 50, cursor: m.cursor } } : "skip",
		),
		[T, D] = (0, w.useState)(null),
		[A, M] = (0, w.useState)(null),
		[R, N] = (0, w.useState)(null),
		[Z, U] = (0, w.useState)(!1),
		[j, I] = (0, w.useState)(!1),
		[L, $] = (0, w.useState)(() => window.matchMedia("(max-width: 719px)").matches),
		[te, ne] = (0, w.useState)(0),
		[K, ie] = (0, w.useState)(0),
		k = (0, w.useRef)(0),
		[H, B] = (0, w.useState)({ sequence: 0, text: "" }),
		[ue, fe] = (0, w.useState)(null),
		we = T?.kind === "channel" ? T.id : null,
		O = Ye(Se.channels.get, a.ready && we ? { channelId: we } : "skip"),
		G = Ye(Se.channels.permissions, a.ready && we ? { channelId: we } : "skip"),
		[ae, se] = (0, w.useState)(null);
	(O && O !== ae && se(O), ((!a.ready && !a.refreshing) || O === null) && ae !== null && !a.refreshing && se(null));
	const ve = a.refreshing && ae?._id === we ? ae : (O ?? null),
		ge = (0, w.useRef)(null),
		pe = (0, w.useRef)(null),
		Ze = (0, w.useRef)(null),
		Oe = (0, w.useRef)(null),
		st = (0, w.useRef)(null),
		Dt = (0, w.useRef)(0),
		It = (0, w.useRef)(null);
	(0, w.useEffect)(() => {
		Dt.current += 1;
	}, [a.ready, l]);
	const dn = (0, w.useId)(),
		jt = (0, w.useId)(),
		de = (0, w.useId)(),
		Te = (0, w.useId)(),
		We = (0, w.useMemo)(
			() => [...(p?.page ?? []), ...(S?.page ?? []), ...(C?.page ?? []), ...(E?.page ?? [])],
			[p, S, C, E],
		),
		Ie = qd(
			(0, w.useMemo)(
				() =>
					Object.fromEntries(
						We.map((ce) => [ce._id, { query: Se.read_states.get_for_channel, args: { channelId: ce._id } }]),
					),
				[We],
			),
		),
		Ot = We.filter((ce) => {
			const Ee = Ie[ce._id];
			return ce.archivedAt === null && !(Ee instanceof Error) && Ee?.hasUnread;
		}).length,
		Nt = !p?.isDone || !S?.isDone || f.number > 1 || h.number > 1,
		re = (0, w.useCallback)((ce) => B((Ee) => ({ sequence: Ee.sequence + 1, text: ce })), []),
		Re = (0, w.useCallback)(() => ne((ce) => ce + 1), []),
		ft = (0, w.useCallback)(() => ne((ce) => Math.max(0, ce - 1)), []),
		je = (0, w.useCallback)(
			(ce) => {
				we &&
					fe((Ee) =>
						Ee?.channelId === we && Ee.rootSequence >= ce.rootSequence && Ee.replySequence >= ce.replySequence
							? Ee
							: {
									channelId: we,
									rootSequence: Math.max(Ee?.channelId === we ? Ee.rootSequence : 0, ce.rootSequence),
									replySequence: Math.max(Ee?.channelId === we ? Ee.replySequence : 0, ce.replySequence),
								},
					);
			},
			[we],
		);
	(0, w.useEffect)(() => {
		if (!ue || ue.channelId !== O?._id || !a.connected || !a.can_request_now()) return;
		const ce = JSON.stringify(ue);
		if (It.current === ce) return;
		It.current = ce;
		let Ee = !1,
			zt;
		const qn = () => {
			Ee ||
				It.current !== ce ||
				((It.current = null),
				(k.current += 1),
				(zt = setTimeout(() => ie((ei) => ei + 1), Math.min(3e4, 1e3 * 2 ** Math.min(k.current - 1, 5)))));
		};
		return (
			n
				.mutation(Se.read_states.mark_read, ue)
				.then((ei) => {
					"_nay" in ei ? qn() : (k.current = 0);
				})
				.catch(qn),
			() => {
				((Ee = !0), zt && clearTimeout(zt), It.current === ce && (It.current = null));
			}
		);
	}, [n, ue, O?._id, a.connected, a.can_request_now, K]);
	const yt = (0, w.useCallback)(
			async (ce, Ee) => {
				if (te > 0 || !a.ready) return;
				const zt = ++Dt.current;
				try {
					const qn = await n.query(Se.read_states.get_for_channel, { channelId: ce._id });
					if (zt !== Dt.current) return;
					(D({ kind: "channel", id: ce._id, openedAtReadSequence: qn?.state?.rootSequence ?? 0 }),
						M(Ee ?? null),
						U(!1),
						I(!1),
						re(`Opened #${ce.name}`));
				} catch {
					re("Could not open this channel. Try again.");
				}
			},
			[n, te, a.ready, re],
		),
		Mt = (0, w.useCallback)(() => {
			(N(null), (st.current = "selected"));
		}, []),
		bt = (0, w.useCallback)(() => {
			(N(null), _(!0), (st.current = "selected"));
		}, []);
	((0, w.useEffect)(() => {
		const ce = (zt) => {
				zt.target instanceof Node && !ge.current?.contains(zt.target) && (Oe.current = null);
			},
			Ee = () => {
				Oe.current = null;
			};
		return (
			document.addEventListener("focusin", ce),
			window.addEventListener("blur", Ee),
			() => {
				(document.removeEventListener("focusin", ce), window.removeEventListener("blur", Ee));
			}
		);
	}, []),
		(0, w.useEffect)(() => {
			const ce = window.matchMedia("(max-width: 719px)"),
				Ee = (zt) => {
					((st.current = zt.matches
						? A && (Oe.current === "sidebar" || Oe.current === "separator")
							? "thread"
							: Oe.current === "sidebar" && !Z
								? "drawer"
								: null
						: Oe.current === "drawer"
							? "selected"
							: null),
						$(zt.matches));
				};
			return (ce.addEventListener("change", Ee), () => ce.removeEventListener("change", Ee));
		}, [Z, A]),
		(0, w.useLayoutEffect)(() => {
			if (R !== null) return;
			const ce = st.current;
			if (((st.current = null), ce === "thread" || (ce === "drawer" && A))) {
				const Ee = ge.current?.querySelector(".thread"),
					zt = Ee?.querySelector(".thread-head button:not([disabled])");
				zt ? zt.focus() : Ee ? Ee.focus() : Ze.current?.focus();
			} else if (ce === "drawer" || (ce === "selected" && L && !Z)) Ze.current?.focus();
			else if (ce === "selected") {
				const Ee = pe.current?.querySelector('[aria-current="page"]');
				Ee && !Ee.disabled ? Ee.focus() : pe.current?.focus();
			}
		}, [R, L, A, Z]));
	const Lt = (ce, Ee, zt) =>
		zt.length === 0
			? null
			: (0, b.jsxs)("div", {
					className: "channel-section",
					children: [
						(0, b.jsx)("h2", { id: Ee, className: "channel-section-title", children: ce }),
						(0, b.jsx)("ul", {
							className: "channel-list",
							"aria-labelledby": Ee,
							children: zt.map((qn) =>
								(0, b.jsx)(
									mk,
									{
										channel: qn,
										selected: we === qn._id,
										blocked: te > 0,
										enabled: a.ready,
										unread: Ie[qn._id],
										onOpen: yt,
										onDialog: N,
									},
									qn._id,
								),
							),
						}),
					],
				});
	return (0, b.jsxs)("div", {
		ref: ge,
		className: "chitchat",
		onFocusCapture: (ce) => {
			const Ee = ce.target;
			Oe.current =
				Ee === Ze.current
					? "drawer"
					: pe.current?.contains(Ee)
						? "sidebar"
						: Ee.classList.contains("thread-resize")
							? "separator"
							: null;
		},
		children: [
			(0, b.jsxs)("header", {
				className: "app-bar",
				children: [
					(0, b.jsx)("h1", { className: "visually-hidden", children: "Chitchat" }),
					(0, b.jsx)("button", {
						ref: Ze,
						type: "button",
						className: "button drawer-toggle",
						"aria-expanded": Z,
						onClick: () => U((ce) => !ce),
						children: "Channels",
					}),
				],
			}),
			(0, b.jsx)("nav", {
				ref: pe,
				className: ["sidebar", Z && "is-open", j && "is-expanded"].filter(Boolean).join(" "),
				"aria-label": "Channels",
				tabIndex: -1,
				onKeyDown: (ce) => {
					ce.key === "Escape" && L && Z && (U(!1), Ze.current?.focus());
				},
				children: (0, b.jsxs)("div", {
					className: "sidebar-inner",
					inert: L && !Z ? !0 : void 0,
					children: [
						(0, b.jsxs)("div", {
							className: "sidebar-head",
							children: [
								(0, b.jsx)("p", { className: "sidebar-title", children: "Chitchat" }),
								(0, b.jsx)("button", {
									type: "button",
									className: "button sidebar-expand",
									"aria-expanded": j,
									"aria-label": j ? "Collapse channel rail" : "Expand channel rail",
									onClick: () => I((ce) => !ce),
									children: j ? "«" : "»",
								}),
								(0, b.jsx)("button", {
									type: "button",
									className: "button sidebar-create",
									disabled: te > 0 || !a.canSend,
									onClick: () => N({ kind: "create" }),
									children: "Create channel",
								}),
							],
						}),
						(0, b.jsx)("ul", {
							className: "view-list",
							"aria-label": "Views",
							children: ["unreads", "threads", "activity"].map((ce) =>
								(0, b.jsx)(
									"li",
									{
										className: "view-item",
										children: (0, b.jsxs)("button", {
											type: "button",
											className:
												ce === "unreads" && Ot > 0 ? "channel-link view-link is-unread" : "channel-link view-link",
											"aria-current": T?.kind === ce ? "page" : void 0,
											disabled: te > 0,
											onClick: () => {
												((Dt.current += 1), D({ kind: ce }), M(null), U(!1), re(`Opened ${ce}`));
											},
											children: [
												(0, b.jsx)("span", {
													className: "channel-initial",
													"aria-hidden": "true",
													children: ce[0].toUpperCase(),
												}),
												(0, b.jsx)("span", { className: "channel-name", children: ce[0].toUpperCase() + ce.slice(1) }),
												ce === "unreads" && Ot > 0
													? (0, b.jsxs)("span", {
															className: "mention-badge",
															children: [
																Ot,
																Nt ? "+" : "",
																(0, b.jsx)("span", {
																	className: "visually-hidden",
																	children: " unread channels shown",
																}),
															],
														})
													: null,
											],
										}),
									},
									ce,
								),
							),
						}),
						a.ready && p && S
							? (0, b.jsxs)(b.Fragment, {
									children: [
										Lt("Channels", dn, p.page),
										(0, b.jsx)(ia, { page: f, result: p, label: "Public channels" }),
										Lt("Private channels", jt, S.page),
										(0, b.jsx)(ia, { page: h, result: S, label: "Private channels" }),
										We.length === 0
											? (0, b.jsx)("p", { className: "channel-status", children: "No channels on this page" })
											: null,
										(0, b.jsx)("button", {
											type: "button",
											className: "button sidebar-archive-toggle",
											"aria-expanded": y,
											onClick: () => _((ce) => !ce),
											children: y ? "Hide archived channels" : "Show archived channels",
										}),
										y
											? (0, b.jsxs)(b.Fragment, {
													children: [
														Lt("Archived", de, C?.page ?? []),
														(0, b.jsx)(ia, { page: m, result: C, label: "Archived channels" }),
														Lt("Archived private channels", Te, E?.page ?? []),
														(0, b.jsx)(ia, { page: v, result: E, label: "Archived private channels" }),
													],
												})
											: null,
									],
								})
							: (0, b.jsx)("p", {
									className: "channel-status",
									role: "status",
									children: a.message ? "Channel access is unavailable." : "Loading channels…",
								}),
					],
				}),
			}),
			(0, b.jsxs)("main", {
				className: "main",
				tabIndex: -1,
				children: [
					we ? (0, b.jsx)(ok, { client: e.client, channelId: we }, `transcript:${we}`) : null,
					a.message
						? (0, b.jsxs)("div", {
								className: "connection-status",
								role: "alert",
								children: [
									a.message,
									(0, b.jsx)("button", {
										type: "button",
										className: "button",
										onClick: a.retry,
										children: "Reconnect",
									}),
								],
							})
						: null,
					T?.kind === "unreads"
						? (0, b.jsx)(fk, { scopeKey: l, enabled: a.ready, memberNames: o, onOpen: yt })
						: T?.kind === "activity"
							? (0, b.jsx)(dk, { scopeKey: l, enabled: a.ready, userId: u, memberNames: o, onOpen: yt })
							: T?.kind === "threads"
								? (0, b.jsx)(hk, { scopeKey: l, enabled: a.ready, memberNames: o, onOpen: yt })
								: T?.kind === "channel"
									? (0, b.jsx)(
											sk,
											{
												client: e.client,
												channelId: T.id,
												channel: ve,
												userId: u,
												memberNames: o,
												announce: re,
												threadRootId: A,
												setThreadRootId: M,
												isNarrow: L,
												canWrite: G?.canWrite ?? !1,
												online: a.connected,
												openedAtReadSequence: T.openedAtReadSequence,
												onObservedRead: je,
												onRequestStart: Re,
												onRequestSettled: ft,
												sendInFlight: te > 0,
											},
											`channel:${T.id}`,
										)
									: (0, b.jsx)("p", {
											className: "channel-status",
											children: a.ready
												? We.length === 0
													? Nt
														? "No channels on this page. Use the page controls to continue."
														: "No channels yet — create the first one."
													: "Select a channel."
												: "Connecting to Chitchat…",
										}),
				],
			}),
			R?.kind === "create"
				? (0, b.jsx)(o0, {
						channel: null,
						selfUserId: u,
						onClose: Mt,
						onSaved: (ce) => {
							(Mt(), D({ kind: "channel", id: ce, openedAtReadSequence: 0 }), M(null));
						},
					})
				: null,
			R?.kind === "rename" ? (0, b.jsx)(o0, { channel: R.channel, selfUserId: u, onClose: Mt, onSaved: Mt }) : null,
			R?.kind === "people" ? (0, b.jsx)(FR, { channelId: R.channel._id, selfUserId: u, onClose: Mt }) : null,
			R && R.kind !== "create" && R.kind !== "rename" && R.kind !== "people"
				? (0, b.jsx)(KR, { channel: R.channel, action: R.kind, onClose: Mt, onDone: bt })
				: null,
			(0, b.jsxs)("div", {
				className: "chitchat-announcer visually-hidden",
				role: "status",
				"aria-live": "polite",
				children: [(0, b.jsx)("span", { "data-announcement-sequence": H.sequence }), H.text],
			}),
		],
	});
}
function IS(e) {
	return (0, b.jsx)("div", {
		className: e.isError ? "boot-screen is-error" : "boot-screen",
		role: e.isError ? "alert" : "status",
		"aria-live": e.isError ? void 0 : "polite",
		children: e.message,
	});
}
var LS = document.getElementById("root");
if (!LS) throw new Error("index.html is missing the #root element");
var kd = (0, rE.createRoot)(LS);
kd.render((0, b.jsx)(IS, { message: "Connecting…" }));
Wx().then(
	(e) => {
		(e.context.kind === "page" && (document.title = e.context.pageTitle),
			kd.render(
				(0, b.jsx)(vk, { client: e, children: (0, b.jsx)(YR, { client: e, children: (0, b.jsx)(gk, { client: e }) }) }),
			));
	},
	(e) => {
		kd.render((0, b.jsx)(IS, { message: e instanceof Error ? e.message : String(e), isError: !0 }));
	},
);
